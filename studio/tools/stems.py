#!/usr/bin/env python3
"""Audio stems for a film: her edited voice + ducked music bed + SFX cues, each mastered with the full-film gain.

  python3 studio/tools/stems.py <slug>

Reads projects/<slug>/film/film.json ("audio") and film/data/meta.json (cues: `node studio/tools/render.mjs meta <slug>`).
Writes projects/<slug>/film/build/stems/:
  voice.flac  music.flac  sfx.flac     48 kHz, already multiplied by the master gain (sum + limiter = the -14 LUFS master)
  voice.m4a   music.m4a   sfx.m4a      small copies the editor plays for the preview
  stems.json                           total, master gain, loudness, music segments, cue key (to spot stale stems)
  speech_mask.npy                      10 ms voice-activity mask (for level checks)
Exports then mix a range with studio/tools/mixclip.py (music / SFX on or off, renormalised).

film.json "audio":
  voice        path of the edited voice (mono), relative to film/
  voiceFilter  ffmpeg filter chain applied to the voice
  music        {dir: "library:music" | "<film path>", xfade: s, tracks: [[file id, title], ...]}  (played in order, looped)
  sfx          {keys: dir of single keystrokes, roles: {role: {files: [...], align: "peak"|"start", db, maxlen}}}
               file names: "library:<name>" = library/sounds/<name>.mp3, otherwise film/audio/sfx/<name>.mp3, "KEYS" = keystroke bank
  levels       {voiceLufs, duckDb (music under speech), openDb (music in pauses), fullDb (music alone), target, ceiling}
"""
import json, os, subprocess, sys, hashlib, numpy as np

STUDIO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
VIDEOS = os.path.dirname(STUDIO)
LIB = os.path.join(VIDEOS, 'library')
SR = 48000


def progress(p, stage):
    print('@progress ' + json.dumps({'p': round(p, 3), 'stage': stage}), flush=True)


def decode(path, ch=2):
    out = subprocess.run(['ffmpeg', '-v', 'error', '-i', path, '-ar', str(SR), '-ac', str(ch), '-f', 'f32le', '-'], capture_output=True, check=True).stdout
    x = np.frombuffer(out, dtype=np.float32)
    return x.reshape(-1, ch).copy() if ch > 1 else x.copy()


def ffilter(x, af, ch):
    p = subprocess.run(['ffmpeg', '-v', 'error', '-f', 'f32le', '-ar', str(SR), '-ac', str(ch), '-i', '-', '-af', af, '-f', 'f32le', '-'],
                       input=np.ascontiguousarray(x, dtype=np.float32).tobytes(), capture_output=True, check=True).stdout
    y = np.frombuffer(p, dtype=np.float32)
    return y.reshape(-1, ch).copy() if ch > 1 else y.copy()


def lufs(x, ch):
    p = subprocess.run(['ffmpeg', '-hide_banner', '-f', 'f32le', '-ar', str(SR), '-ac', str(ch), '-i', '-', '-af', 'ebur128=peak=true', '-f', 'null', '-'],
                       input=np.ascontiguousarray(x, dtype=np.float32).tobytes(), capture_output=True).stderr.decode()
    tail = p[p.rfind('Summary:'):]
    I = float(tail.split('I:')[1].split('LUFS')[0])
    tp = float(tail.split('Peak:')[1].split('dBFS')[0]) if 'Peak:' in tail else None
    return I, tp


def db(g):
    return 10 ** (g / 20)


def write(path, x, codec):
    x = np.ascontiguousarray(x, dtype=np.float32); ch = x.shape[1] if x.ndim > 1 else 1
    args = {'flac': ['-c:a', 'flac', '-sample_fmt', 's32', '-bits_per_raw_sample', '24'],
            'm4a': ['-c:a', 'aac', '-b:a', '128k' if ch > 1 else '96k', '-movflags', '+faststart']}[codec]
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'f32le', '-ar', str(SR), '-ac', str(ch), '-i', '-', *args, path], input=x.tobytes(), check=True)


def trim_silence(x, thr_db=-45):
    e = np.abs(x).max(1)
    idx = np.where(e > db(thr_db))[0]
    return x[idx[0]: idx[-1] + 1] if len(idx) else x


def cues_key(cues):
    """FNV-1a over a canonical cue string; the editor computes the same key to spot stale stems."""
    def num(v):
        if v is None: return ''
        return str(int(v)) if float(v) == int(v) else repr(float(v))
    s = ''.join(f"{c['name']}|{c['t']:.3f}|{num(c.get('db', 0))}|{num(c.get('n'))}|{num(c.get('d'))};" for c in cues)
    h = 2166136261
    for ch in s.encode('utf-16-le')[::2]:  # one byte per char (cue strings are ASCII)
        h ^= ch; h = (h * 16777619) & 0xffffffff
    return format(h, '08x')


class Film:
    def __init__(self, slug):
        self.dir = os.path.join(VIDEOS, 'projects', slug, 'film')
        self.man = json.load(open(os.path.join(self.dir, 'film.json')))
        self.au = self.man['audio']; self.lv = self.au.get('levels', {})

    def path(self, p, ext=''):
        if p.startswith('library:'):
            return os.path.join(LIB, p[8:]) if not ext else os.path.join(LIB, 'sounds', p[8:] + ext)
        return os.path.join(self.dir, p) if not ext else os.path.join(self.dir, 'audio', 'sfx', p + ext)


def build_music(film, total):
    m = film.au['music']; mdir = film.path(m['dir']); xfade = m.get('xfade', 5.0)
    parts = []
    for tid, _ in m['tracks']:
        x = trim_silence(decode(os.path.join(mdir, tid + '.mp3')))
        I, _ = lufs(x, 2)
        parts.append(x * db(-16.0 - I))
    out = np.zeros((int(total * SR) + SR, 2), np.float32)
    xf = int(xfade * SR); pos = 0; k = 0; used = []
    while pos < len(out):
        seg = parts[k % len(parts)].copy()
        if pos > 0:
            fi = np.sin(np.linspace(0, np.pi / 2, xf)) ** 2
            seg[:xf] *= fi[:, None]
            out[pos:pos + xf] *= (1 - fi[:len(out[pos:pos + xf])])[:, None]
        n = min(len(seg), len(out) - pos)
        out[pos:pos + n] += seg[:n]
        used.append((m['tracks'][k % len(m['tracks'])][1], round(pos / SR, 1)))
        pos += len(seg) - xf; k += 1
    out = out[:int(total * SR)]
    # carve room for the voice: small presence dip, low cut
    out = ffilter(out, 'highpass=f=45,equalizer=f=2800:t=q:w=1.3:g=-4,equalizer=f=250:t=q:w=1.0:g=-1.5', 2)
    fade = int(0.4 * SR); out[:fade] *= np.linspace(0, 1, fade)[:, None]
    fo = int(3.5 * SR); out[-fo:] *= (np.linspace(1, 0, fo) ** 1.5)[:, None]
    return out, used


def envelope(film, voice, intro, voice_end):
    lv = film.lv; DUCK, OPEN, FULL = lv.get('duckDb', -12.0), lv.get('openDb', -5.0), lv.get('fullDb', -2.0)
    hop = 480  # 10 ms
    n = len(voice) // hop
    r = np.sqrt((voice[:n * hop].reshape(n, hop) ** 2).mean(1) + 1e-12)
    act = 20 * np.log10(r) > -44  # speech frames (voice at -16 LUFS)
    a = act.copy(); hold = 20; last = -10 ** 9   # hold 200 ms after speech: no pumping inside sentences
    for i in range(n):
        if act[i]: last = i
        a[i] = (i - last) <= hold
    tgt = np.where(a, DUCK, OPEN).astype(np.float64)
    ti = np.arange(n) / 100
    tgt[ti < intro - 0.3] = FULL          # title card / end card: music alone
    tgt[ti > voice_end + 0.8] = FULL
    g = np.empty(n); cur = tgt[0]
    ad, au = np.exp(-1 / 6.0), np.exp(-1 / 30.0)   # one-pole smoothing: fast down (60 ms), slow up (300 ms)
    for i in range(n):
        c = ad if tgt[i] < cur else au
        cur = c * cur + (1 - c) * tgt[i]; g[i] = cur
    gl = np.interp(np.arange(len(voice)) / SR, ti, g)
    return db(gl).astype(np.float32), a


def load_sfx(path):
    x = decode(path)
    x = x / (np.abs(x).max() + 1e-9) * db(-1)          # peak-normalise
    e = np.abs(x).mean(1); w = int(0.02 * SR)
    sm = np.convolve(e, np.ones(w) / w, mode='same')
    return x, int(np.argmax(sm))                        # (samples, index of the measured peak)


def build_sfx(film, cues, N, VOICE_LUFS):
    roles = film.au['sfx']['roles']; kdir = film.path(film.au['sfx'].get('keys', 'audio/sfx/keys'))
    sfx = np.zeros((N, 2), np.float32); cache = {}; count = {}; placed = []
    keys = [load_sfx(os.path.join(kdir, f)) for f in sorted(os.listdir(kdir)) if f.endswith('.wav')] if os.path.isdir(kdir) else []
    rng = np.random.default_rng(7)
    for c in cues:
        R = roles.get(c['name'])
        if R is None:
            print('warning: no sound role for cue', c['name'], file=sys.stderr); continue
        if R['files'] == ['KEYS']:   # n key clicks spread over d seconds, slightly irregular, varied level
            n = int(c.get('n', 4)); d = float(c.get('d', 0.4))
            ts = c['t'] + np.sort(rng.uniform(0, max(0.05, d), n)); ts[0] = c['t']
            for tt in ts:
                x, _ = keys[int(rng.integers(len(keys)))]
                g = db(R['db'] + c['db'] + rng.uniform(-3, 1.5) + (VOICE_LUFS + 16.0)); start = int(tt * SR)
                a, b = max(0, start), min(N, start + len(x))
                if b > a: sfx[a:b] += x[a - start:b - start] * g
            placed.append({'t': c['t'], 'name': 'type', 'file': f'{n} keys'}); continue
        k = count.get(c['name'], 0); count[c['name']] = k + 1
        f = R['files'][k % len(R['files'])]
        if f not in cache: cache[f] = load_sfx(film.path(f, '.mp3'))
        x, pk = cache[f]
        if R.get('maxlen'):
            x = x[:int(R['maxlen'] * SR)].copy(); fo = int(0.5 * SR); x[-fo:] *= np.linspace(1, 0, fo)[:, None]
        start = int(c['t'] * SR) - (pk if R.get('align') == 'peak' else 0)   # 'peak': the loudest moment lands on the cue
        g = db(R['db'] + c['db'] + (VOICE_LUFS + 16.0))
        pan = 0.18 * np.sin(k * 2.1)  # gentle alternating pan
        lr = np.array([np.sqrt(0.5 - pan), np.sqrt(0.5 + pan)], np.float32) * np.sqrt(2)
        a, b = max(0, start), min(N, start + len(x))
        if b <= a: continue
        sfx[a:b] += x[a - start:b - start] * g * lr
        placed.append({'t': c['t'], 'name': c['name'], 'file': f})
    return sfx, placed


def limit(x, ceil):
    return ffilter(x, f'aresample=192000,alimiter=limit={ceil}:attack=3:release=60:level=disabled,aresample=48000', 2)


def main():
    slug = sys.argv[1]
    film = Film(slug); lv = film.lv
    VOICE_LUFS, TARGET, CEIL = lv.get('voiceLufs', -16.0), lv.get('target', -14.0), lv.get('ceiling', 0.80)
    meta = json.load(open(os.path.join(film.dir, 'data/meta.json')))
    total, intro = meta['TOTAL'], meta['INTRO']
    N = int(total * SR)
    progress(0.02, 'voice')
    v = decode(film.path(film.au['voice']), 1)
    if film.au.get('voiceFilter'): v = ffilter(v, film.au['voiceFilter'], 1)
    Iv, _ = lufs(v, 1)
    v *= db(VOICE_LUFS - Iv)
    voice = np.zeros(N, np.float32); o = int(intro * SR); voice[o:o + len(v)] = v[:N - o]
    voice_end = intro + len(v) / SR
    progress(0.15, 'music')
    music, used = build_music(film, total)
    env, act = envelope(film, voice, intro, voice_end)
    music *= env[:, None] * db(-(-16.0 - VOICE_LUFS))  # music was levelled to -16 LUFS; offsets are relative to the voice
    progress(0.45, 'sound effects')
    sfx, placed = build_sfx(film, meta['CUES'], N, VOICE_LUFS)
    progress(0.55, 'master')
    mix = music + sfx + voice[:, None]
    I, _ = lufs(mix, 2)
    gain = db(TARGET - I)
    m2 = limit(mix * gain, CEIL)
    I2, tp = lufs(m2, 2)
    if abs(I2 - TARGET) > 0.15:  # the limiter shaved a little: correct the gain once
        gain *= db(TARGET - I2); m2 = limit(mix * gain, CEIL); I2, tp = lufs(m2, 2)
    del m2
    out = os.path.join(film.dir, 'build', 'stems'); os.makedirs(out, exist_ok=True)
    progress(0.7, 'writing stems')
    write(os.path.join(out, 'voice.flac'), voice * gain, 'flac')
    write(os.path.join(out, 'music.flac'), music * gain, 'flac')
    write(os.path.join(out, 'sfx.flac'), sfx * gain, 'flac')
    progress(0.85, 'preview audio')
    write(os.path.join(out, 'voice.m4a'), voice * gain, 'm4a')
    write(os.path.join(out, 'music.m4a'), music * gain, 'm4a')
    write(os.path.join(out, 'sfx.m4a'), sfx * gain, 'm4a')
    np.save(os.path.join(out, 'speech_mask.npy'), act)
    info = {'total': total, 'sr': SR, 'intro': intro, 'voice_end': round(voice_end, 3), 'master_gain_db': round(20 * np.log10(gain), 3),
            'integrated_lufs': I2, 'true_peak_dbtp': tp, 'ceiling': CEIL, 'target_lufs': TARGET,
            'cues': len(meta['CUES']), 'cuesKey': cues_key(meta['CUES']), 'sfx_placed': len(placed), 'music_segments': used,
            'created': subprocess.run(['date', '-u', '+%Y-%m-%dT%H:%M:%SZ'], capture_output=True, text=True).stdout.strip()}
    json.dump(info, open(os.path.join(out, 'stems.json'), 'w'), indent=1)
    progress(1.0, 'done')
    print(json.dumps({k: v for k, v in info.items() if k != 'music_segments'}))


if __name__ == '__main__':
    main()
