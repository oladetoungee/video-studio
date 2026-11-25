#!/usr/bin/env python3
"""Mix one export's audio from a film's stems (written by stems.py).

  python3 studio/tools/mixclip.py <stems dir> <t0> <t1> [--voice 0|1] [--music 0|1] [--sfx 0|1] [--full] --out clip.wav
                                  [--voice-db dB] [--music-db dB] [--sfx-db dB]
                                  [--track-voice a.wav] [--track-music b.wav] [--track-sfx c.wav] [--speed 0.5..2]
- --speed s (2026-11-19, as footmix.py): the mix plays s times faster (atempo, pitch kept) BEFORE the loudness step and the limiter,
  so a sped-up export is still mastered to the target; the WAV is n / s samples long. Not with --track-* (sound-only files stay 1x).
  Without it (default 1) nothing changes.

- Voice, music and SFX follow the export's toggles (any combination).
- --voice-db / --music-db / --sfx-db: her volume sliders (edits.json "mix"), applied to each stem BEFORE the loudness step,
  so they change the balance, not the overall loudness. A whole film with any level moved is renormalised to the target
  like a film with a part switched off. All three at 0 (the default) = exactly the mix as before.
- --track-*: also write that track alone (WAV 48 kHz 24-bit, stereo): the same samples that went into the mix (her level,
  the master gain, the music fades, the edge fades and this export's loudness gain), before the limiter and without
  levelling each track on its own, so the files line up sample-exact with the video and add up to the mix.
- Whole film (--full): with her voice in, renormalised to the master target (-14 LUFS integrated) with the same
  true-peak limiter, so a film without music or SFX is as loud as the full mix. Without her voice, music and SFX
  are a bed, not a programme: they go to BED_LUFS (-18) at most, never more than +10 dB of gain (so the ducked
  music is not pumped up to speech loudness), and silence stays silence.
- Clips: the music fades in (0.6 s) and out (0.9 s) so it never starts mid-swell; loudness is pulled toward the
  target (clips of 3 s or more, at most +/-6 dB, since short speech windows read loud or quiet); then the limiter.
Prints a JSON line: {"lufs", "true_peak", "gain_db", "seconds"}.
"""
import json, os, subprocess, sys, numpy as np

SR = 48000
BED_LUFS = -18.0   # loudness for an export without her voice (music and/or SFX only)


def decode(path, t0, dur, ch):
    out = subprocess.run(['ffmpeg', '-v', 'error', '-ss', f'{t0:.6f}', '-t', f'{dur:.6f}', '-i', path, '-ar', str(SR), '-ac', str(ch), '-f', 'f32le', '-'],
                         capture_output=True, check=True).stdout
    x = np.frombuffer(out, dtype=np.float32).reshape(-1, ch)
    n = int(round(dur * SR)); y = np.zeros((n, ch), np.float32); m = min(n, len(x)); y[:m] = x[:m]
    return y


def ff(x, af):
    p = subprocess.run(['ffmpeg', '-v', 'error', '-f', 'f32le', '-ar', str(SR), '-ac', '2', '-i', '-', '-af', af, '-f', 'f32le', '-'],
                       input=np.ascontiguousarray(x, dtype=np.float32).tobytes(), capture_output=True, check=True).stdout
    return np.frombuffer(p, dtype=np.float32).reshape(-1, 2).copy()


def lufs(x):
    p = subprocess.run(['ffmpeg', '-hide_banner', '-f', 'f32le', '-ar', str(SR), '-ac', '2', '-i', '-', '-af', 'ebur128=peak=true', '-f', 'null', '-'],
                       input=np.ascontiguousarray(x, dtype=np.float32).tobytes(), capture_output=True).stderr.decode()
    tail = p[p.rfind('Summary:'):]
    try: I = float(tail.split('I:')[1].split('LUFS')[0])
    except Exception: I = -70.0
    tp = float(tail.split('Peak:')[1].split('dBFS')[0]) if 'Peak:' in tail else None
    return I, tp


def main():
    a = sys.argv[1:]
    stems, t0, t1 = a[0], float(a[1]), float(a[2])
    opt = lambda k, d: a[a.index(k) + 1] if k in a else d
    voice_on, music_on, sfx_on, full, out = opt('--voice', '1') == '1', opt('--music', '1') == '1', opt('--sfx', '1') == '1', '--full' in a, opt('--out', 'clip.wav')
    lv = {k: float(opt('--%s-db' % k, '0')) for k in ('voice', 'music', 'sfx')}   # her volume sliders
    tracks_out = {k: opt('--track-' + k, None) for k in ('voice', 'music', 'sfx')}
    want = lambda k: bool(tracks_out[k])
    lvl = lambda x, k: x * np.float32(10 ** (lv[k] / 20)) if lv[k] else x   # 0 dB: untouched (bit-identical to before)
    info = json.load(open(os.path.join(stems, 'stems.json')))
    target, ceil = info.get('target_lufs', -14.0), info.get('ceiling', 0.8)
    dur = t1 - t0; n = int(round(dur * SR))
    parts = {}   # each track as it goes into the mix (for --track-*)
    if voice_on or want('voice'): parts['voice'] = lvl(decode(os.path.join(stems, 'voice.flac'), t0, dur, 1).repeat(2, 1), 'voice')   # mono voice -> both channels at full level (ffmpeg's own upmix is -3 dB)
    if voice_on: mix = parts['voice'].copy()
    else: mix = np.zeros((n, 2), np.float32)
    if music_on or want('music'):
        m = decode(os.path.join(stems, 'music.flac'), t0, dur, 2)
        if not full:
            fi, fo = min(n, int(0.6 * SR)), min(n, int(0.9 * SR))
            if t0 > 0.05: m[:fi] *= (np.sin(np.linspace(0, np.pi / 2, fi)) ** 2)[:, None]
            if t1 < info['total'] - 0.05: m[n - fo:] *= (np.cos(np.linspace(0, np.pi / 2, fo)) ** 2)[:, None]
        parts['music'] = m = lvl(m, 'music')
        if music_on: mix += m
    if sfx_on or want('sfx'):
        parts['sfx'] = lvl(decode(os.path.join(stems, 'sfx.flac'), t0, dur, 2), 'sfx')
        if sfx_on: mix += parts['sfx']
    e = min(n // 2, int(0.008 * SR))   # 8 ms edge fades: no clicks at the cut points
    def edge(x):
        if e > 0: x[:e] *= np.linspace(0, 1, e)[:, None]; x[n - e:] *= np.linspace(1, 0, e)[:, None]
    edge(mix)
    speed = float(opt('--speed', '1'))
    if not (0.5 <= speed <= 2.0): speed = 1.0
    if speed != 1.0:
        mix = ff(mix, f'atempo={speed}'); n = int(round(n / speed)); mix = mix[:n] if len(mix) >= n else np.vstack([mix, np.zeros((n - len(mix), 2), np.float32)])
    limiter = f'aresample=192000,alimiter=limit={ceil}:attack=3:release=60:level=disabled,aresample=48000'
    gain_db = 0.0
    moved = any(lv[k] for k in lv)
    renorm = (full and voice_on and (not (music_on and sfx_on) or moved)) or (speed != 1.0 and voice_on and dur >= 3.0)   # sped up: re-measured and set to the target   # a voice film without music or SFX, or with a level moved: as loud as the full mix
    if renorm:
        I, _ = lufs(mix); gain_db = target - I
    elif full and not voice_on:                                 # a bed: up to BED_LUFS, at most +10 dB
        I, _ = lufs(mix)
        if I > -60: gain_db = float(min(BED_LUFS - I, 10.0))
    elif dur >= 3.0:
        I, _ = lufs(mix)
        if I > -60: gain_db = float(np.clip((target if voice_on else BED_LUFS) - I, -6.0, 6.0))
    y = ff(mix * 10 ** (gain_db / 20), limiter)
    I2, tp = lufs(y)
    if renorm and abs(I2 - target) > 0.15:
        gain_db += target - I2; y = ff(mix * 10 ** (gain_db / 20), limiter); I2, tp = lufs(y)
    y = y[:n] if len(y) >= n else np.vstack([y, np.zeros((n - len(y), 2), np.float32)])
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'f32le', '-ar', str(SR), '-ac', '2', '-i', '-', '-c:a', 'pcm_s24le', out],
                   input=np.ascontiguousarray(y, dtype=np.float32).tobytes(), check=True)
    for k, path in tracks_out.items():
        if not path or speed != 1.0: continue
        x = parts[k].copy(); edge(x)
        x = x * np.float32(10 ** (gain_db / 20))
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'f32le', '-ar', str(SR), '-ac', '2', '-i', '-', '-c:a', 'pcm_s24le', path],
                       input=np.ascontiguousarray(x, dtype=np.float32).tobytes(), check=True)
    print(json.dumps({'lufs': I2, 'true_peak': tp, 'gain_db': round(gain_db, 2), 'seconds': round(dur / speed, 3), 'levels': lv, **({'speed': speed} if speed != 1.0 else {})}))


if __name__ == '__main__':
    main()
