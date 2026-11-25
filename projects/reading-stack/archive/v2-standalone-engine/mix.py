#!/usr/bin/env python3
"""Final audio mix (v2, SFX re-cued to the new visuals): her edited voice + ducked music medley + SFX cues -> build/mix.wav (48 kHz stereo)

  python3 tools/mix.py            full length (uses data/meta.json from `node tools/render.mjs meta`)
  python3 tools/mix.py 60 120     only a window (for previews), still normalised with the full-mix gain

Stems are also written (build/stem_*.wav) so levels can be measured separately.
"""
import json, os, subprocess, sys, numpy as np

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SR = 48000
SOUNDS = os.path.join(os.path.dirname(ROOT), 'sounds')
SFXD = os.path.join(ROOT, 'audio/sfx')
MUSD = os.path.join(ROOT, 'audio/music')

# Music medley (all Mixkit Stock Music Free License), in playback order
MUSIC = [('135', 'Sleepy Cat - Alejandro Magaña'), ('766', 'Lo-Fi 04 - Lily J'), ('150', 'A Blue Day - Alejandro Magaña'),
         ('175', 'Digital Clouds - Alejandro Magaña'), ('282', 'Sweet September - Arulo'), ('750', 'Relaxation 04 - Lily J'),
         ('443', 'Serene View - Arulo'), ('234', 'Thinking About You - Arulo')]
XFADE = 5.0

# SFX roles -> files (rotated per use). align: 'peak' puts the loudest moment on the cue, 'start' starts on it.
# v2: re-cued to the new visuals (reference spirit): key ticks for type-on text, soft clicks for cards and the
# cursor, a clean short swish on hard cuts between grounds, a pen stroke for hand underlines, one hit on core ideas.
SFX = {
    'cut':    (['S:whoosh-short-sweep', 'mk175', 'mk3115', 'S:whoosh-small-sweep'], 'peak', -10),
    'whoosh': (['mk164', 'S:whoosh-air'], 'peak', -10),
    'click':  (['mk2568', 'S:click-classic', 'mk3124'], 'start', -4),
    'card':   (['S:card-place', 'S:paper-quick-move', 'S:card-flick'], 'start', -6),
    'tick':   (['S:tap-small-hit', 'S:click-box-check'], 'start', -14),
    'mark':   (['S:marker-line', 'S:pencil-short'], 'start', -9, 0.6),
    'hit':    (['mk1143'], 'peak', -9),
    'hitS':   (['S:punch-soft-quick', 'S:hit-weak'], 'start', -7),
    'type':   (['KEYS'], 'start', -10),
}

VOICE_LUFS = -16.0       # voice stem target before the master stage
DUCK_DB = -12.0          # music under speech   (relative to voice loudness)
OPEN_DB = -5.0           # music in pauses
FULL_DB = -2.0           # music alone (title sting, end card)
TARGET = -14.0           # master integrated loudness
CEIL = 0.80              # limiter ceiling (-1.94 dBFS sample peak)


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


def write_wav(path, x):
    x = np.ascontiguousarray(x, dtype=np.float32)
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'f32le', '-ar', str(SR), '-ac', str(x.shape[1] if x.ndim > 1 else 1), '-i', '-', '-c:a', 'pcm_s24le', path],
                   input=x.tobytes(), check=True)


def trim_silence(x, thr_db=-45):
    e = np.abs(x).max(1)
    idx = np.where(e > db(thr_db))[0]
    return x[idx[0]: idx[-1] + 1] if len(idx) else x


def build_music(total):
    parts = []
    for tid, _ in MUSIC:
        x = trim_silence(decode(os.path.join(MUSD, tid + '.mp3')))
        I, _ = lufs(x, 2)
        parts.append(x * db(-16.0 - I))
    out = np.zeros((int(total * SR) + SR, 2), np.float32)
    xf = int(XFADE * SR); pos = 0; k = 0; used = []
    while pos < len(out):
        x = parts[k % len(parts)]
        seg = x.copy()
        if pos > 0:
            fi = np.sin(np.linspace(0, np.pi / 2, xf)) ** 2
            seg[:xf] *= fi[:, None]
            out[pos:pos + xf] *= (1 - fi[:len(out[pos:pos + xf])])[:, None]
        n = min(len(seg), len(out) - pos)
        out[pos:pos + n] += seg[:n]
        used.append((MUSIC[k % len(MUSIC)][1], round(pos / SR, 1)))
        pos += len(seg) - xf; k += 1
    out = out[:int(total * SR)]
    # carve room for the voice: small presence dip, low cut
    out = ffilter(out, 'highpass=f=45,equalizer=f=2800:t=q:w=1.3:g=-4,equalizer=f=250:t=q:w=1.0:g=-1.5', 2)
    fade = int(0.4 * SR); out[:fade] *= np.linspace(0, 1, fade)[:, None]
    fo = int(3.5 * SR); out[-fo:] *= (np.linspace(1, 0, fo) ** 1.5)[:, None]
    return out, used


def envelope(voice, total, intro, voice_end):
    hop = 480  # 10 ms
    n = len(voice) // hop
    r = np.sqrt((voice[:n * hop].reshape(n, hop) ** 2).mean(1) + 1e-12)
    rdb = 20 * np.log10(r)
    act = rdb > -44  # speech frames (voice at -16 LUFS)
    # hold 300 ms after speech, and treat gaps < 350 ms as speech (no pumping inside sentences)
    a = act.copy()
    hold = 20
    last = -10 ** 9
    for i in range(n):
        if act[i]: last = i
        a[i] = (i - last) <= hold
    tgt = np.where(a, DUCK_DB, OPEN_DB).astype(np.float64)
    # intro / outro: music alone
    ti = np.arange(n) / 100
    tgt[ti < intro - 0.3] = FULL_DB
    tgt[ti > voice_end + 0.8] = FULL_DB
    # one-pole smoothing: fast down (70 ms), slow up (600 ms)
    g = np.empty(n); cur = tgt[0]
    ad, au = np.exp(-1 / 6.0), np.exp(-1 / 30.0)
    for i in range(n):
        c = ad if tgt[i] < cur else au
        cur = c * cur + (1 - c) * tgt[i]; g[i] = cur
    gl = np.interp(np.arange(len(voice)) / SR, ti, g)
    return db(gl).astype(np.float32), a


def load_sfx(name):
    p = os.path.join(SOUNDS, name[2:] + '.mp3') if name.startswith('S:') else os.path.join(SFXD, 'keys', name[2:] + '.wav') if name.startswith('K:') else os.path.join(SFXD, name + '.mp3')
    x = decode(p)
    x = x / (np.abs(x).max() + 1e-9) * db(-1)          # peak-normalise
    e = np.abs(x).mean(1); w = int(0.02 * SR)
    sm = np.convolve(e, np.ones(w) / w, mode='same')
    return x, int(np.argmax(sm))


def main():
    meta = json.load(open(os.path.join(ROOT, 'data/meta.json')))
    total, intro = meta['TOTAL'], meta['INTRO']
    N = int(total * SR)
    # ---- voice
    v = np.fromfile(os.path.join(ROOT, 'build/voice_edit.f32'), dtype=np.float32)
    v = ffilter(v, 'highpass=f=75,acompressor=threshold=0.05:ratio=3:attack=6:release=160:knee=3,deesser=i=0.25', 1)
    Iv, _ = lufs(v, 1)
    v *= db(VOICE_LUFS - Iv)
    voice = np.zeros(N, np.float32); o = int(intro * SR); voice[o:o + len(v)] = v[:N - o]
    voice_end = intro + len(v) / SR
    # ---- music + ducking
    music, used = build_music(total)
    env, act = envelope(voice, total, intro, voice_end)
    music *= env[:, None] * db(-(-16.0 - VOICE_LUFS))  # music was levelled to -16 LUFS; offsets are relative to the voice
    # ---- sfx
    sfx = np.zeros((N, 2), np.float32); cache = {}; count = {}; placed = []
    keys = [load_sfx('K:' + f[:-4]) for f in sorted(os.listdir(os.path.join(SFXD, 'keys'))) if f.endswith('.wav')]
    rng = np.random.default_rng(7)
    for c in meta['CUES']:
        if c['name'] == 'type':   # n key clicks spread over d seconds, slightly irregular, varied level
            base = SFX['type'][2]; n = int(c.get('n', 4)); d = float(c.get('d', 0.4))
            ts = c['t'] + np.sort(rng.uniform(0, max(0.05, d), n)); ts[0] = c['t']
            for j, tt in enumerate(ts):
                x, _ = keys[int(rng.integers(len(keys)))]
                g = db(base + c['db'] + rng.uniform(-3, 1.5) + (VOICE_LUFS + 16.0)); start = int(tt * SR)
                a, b = max(0, start), min(N, start + len(x))
                if b > a: sfx[a:b] += x[a - start:b - start] * g
            placed.append({'t': c['t'], 'name': 'type', 'file': f'{n} keys'}); continue

        files, align, base = SFX[c['name']][:3]; maxlen = SFX[c['name']][3] if len(SFX[c['name']]) > 3 else None
        k = count.get(c['name'], 0); count[c['name']] = k + 1
        f = files[k % len(files)]
        if f not in cache: cache[f] = load_sfx(f)
        x, pk = cache[f]
        if maxlen:
            x = x[:int(maxlen * SR)].copy(); fo = int(0.5 * SR); x[-fo:] *= np.linspace(1, 0, fo)[:, None]
        start = int(c['t'] * SR) - (pk if align == 'peak' else 0)
        g = db(base + c['db'] + (VOICE_LUFS + 16.0))
        pan = 0.18 * np.sin(k * 2.1)  # gentle alternating pan
        lr = np.array([np.sqrt(0.5 - pan), np.sqrt(0.5 + pan)], np.float32) * np.sqrt(2)
        a, b = max(0, start), min(N, start + len(x))
        if b <= a: continue
        sfx[a:b] += x[a - start:b - start] * g * lr
        placed.append({'t': c['t'], 'name': c['name'], 'file': f})
    # ---- master
    mix = music + sfx + voice[:, None]
    I, _ = lufs(mix, 2)
    gain = db(TARGET - I)
    mix *= gain
    mix = ffilter(mix, f'aresample=192000,alimiter=limit={CEIL}:attack=3:release=60:level=disabled,aresample=48000', 2)
    I2, tp = lufs(mix, 2)
    if abs(I2 - TARGET) > 0.15:  # the limiter shaved a little: correct once and re-limit
        mix = ffilter(mix * db(TARGET - I2), f'aresample=192000,alimiter=limit={CEIL}:attack=3:release=60:level=disabled,aresample=48000', 2)
        I2, tp = lufs(mix, 2)
    lo, hi = (float(sys.argv[1]), float(sys.argv[2])) if len(sys.argv) > 2 else (0, total)
    sl = slice(int(lo * SR), int(hi * SR))
    write_wav(os.path.join(ROOT, 'build/mix.wav'), mix[sl])
    write_wav(os.path.join(ROOT, 'build/stem_voice.wav'), (voice[:, None] * gain)[sl].repeat(2, 1))
    write_wav(os.path.join(ROOT, 'build/stem_music.wav'), (music * gain)[sl])
    write_wav(os.path.join(ROOT, 'build/stem_sfx.wav'), (sfx * gain)[sl])
    np.save(os.path.join(ROOT, 'build/speech_mask.npy'), act)
    info = {'integrated_lufs': I2, 'true_peak_dbtp': tp, 'master_gain_db': round(20 * np.log10(gain), 2), 'music_segments': used, 'sfx_count': len(placed)}
    json.dump(info, open(os.path.join(ROOT, 'build/mix_info.json'), 'w'), indent=1)
    print(json.dumps({k: v for k, v in info.items() if k != 'music_segments'}), '\nmusic:', used)


if __name__ == '__main__':
    main()
