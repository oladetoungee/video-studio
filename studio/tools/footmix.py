#!/usr/bin/env python3
"""Sound for a footage moment: her voice (cut with the EDL, cleaned), a ducked music bed, SFX cues, mastered.

  python3 studio/tools/footmix.py <talking-head.json> <moment id> <cues.json> <out.wav> [--voice 0] [--music 0] [--sfx 0] [--stems dir]
                                  [--voice-db dB] [--music-db dB] [--sfx-db dB] [--tracks <path prefix>] [--tail s]
  --tail: the ending's length as the moment's page measured it (e.g. her outro clip); wins over the manifest
  --clips <file.json>: the clips as the moment's page built them (composite.mjs passes it only when the moment has a "pause her"
  insert: a clip [at, at + d, {"pause": id}] is d seconds of silence in her voice; the music bed and sound effects go on).
  A cue with "len" (the pause's typing sound) lasts exactly len seconds (the file looped if shorter, a short fade at its end).

cues.json: [{name, t, db, n?, d?}] on the moment's output timeline (from the moment's scenes, via composite.mjs).
Voice: the EDL's clips of the source audio (6 ms fades at every join) -> manifest audio.voiceFilter (high-pass, light
noise reduction, de-ess, gentle compression) -> voiceLufs. Music: manifest moment "music": [track id, start s] from
library/music, levelled, ducked under speech (duckDb) and opened in pauses (openDb), faded in/out. SFX roles as in a
film (audio.sfx.roles; "library:<name>" = library/sounds/<name>.mp3, otherwise <talking-head>/audio/sfx/<name>.mp3).
Master: -14 LUFS integrated, true peak <= -1 dBTP (oversampled limiter). Prints a JSON report.
Without her voice (--voice 0) the music still ducks where she speaks (as in the full mix), and the bed is levelled to
-18 LUFS at most (+10 dB at most), not pushed to -14. --stems dir also writes voice.m4a, music.m4a, sfx.m4a there
(each with the master gain, before the limiter: the studio's moment editor plays them as separate toggles).
--voice-db / --music-db / --sfx-db: her volume sliders (the moment's edits "mix"), applied to each track before the master
gain is measured, so they change the balance and the master stays at -14 LUFS. All three at 0 (default) = the mix as before.
Sound roles: the manifest's audio.sfx.roles first, then studio/tools/sound-palette.json (SOUND-PALETTE roles: shutter,
riser, hit, pop, tick, notify, typeHit, glitch, tape, cash, error, swipe, whoosh, paper, mark, clock) for any role the
manifest does not define. A cue named "film:<role>" (a film scene's own sound, imported by a cutaway) uses the linked film's
role (talking-head.json "film": "<slug>" -> projects/<slug>/film/film.json audio.sfx.roles, its files in film/audio/sfx/).
A short (moment "kind": "short") holds its end card for its "endCard.seconds" (default 6) unless it sets "tail".
--tracks <prefix>: also write <prefix>voice.wav, <prefix>music.wav, <prefix>sound-effects.wav (48 kHz 24-bit stereo): each
track with her level and the master gain, before the limiter, not levelled on its own: they line up with the video and add
up to the mix.
"""
import json, os, sys
import numpy as np
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from stems import decode, ffilter, lufs, db, load_sfx, limit, trim_silence, SR, LIB  # noqa: E402
import subprocess


def decode_range(path, a, b, ch=1):
    out = subprocess.run(['ffmpeg', '-v', 'error', '-ss', f'{a:.4f}', '-t', f'{b - a:.4f}', '-i', path, '-vn', '-ar', str(SR), '-ac', str(ch), '-f', 'f32le', '-'], capture_output=True, check=True).stdout
    x = np.frombuffer(out, dtype=np.float32)
    return x.reshape(-1, ch).copy() if ch > 1 else x.copy()


def fitlen(x, n):
    return x[:n] if len(x) >= n else np.concatenate([x, np.zeros((n - len(x),) + x.shape[1:], x.dtype)])


def main():
    a = sys.argv[1:]; man_path = os.path.abspath(a[0]); mid, cues_path, out = a[1], a[2], a[3]
    flag = lambda k: (a[a.index(k) + 1] != '0') if k in a else True
    voice_on, music_on, sfx_on = flag('--voice'), flag('--music'), flag('--sfx')
    stems_dir = a[a.index('--stems') + 1] if '--stems' in a else None
    tracks = a[a.index('--tracks') + 1] if '--tracks' in a else None
    lvl = {k: float(a[a.index('--%s-db' % k) + 1]) if '--%s-db' % k in a else 0.0 for k in ('voice', 'music', 'sfx')}   # her volume sliders
    base = os.path.dirname(man_path); man = json.load(open(man_path)); au = man['audio']; lv = au.get('levels', {})
    m = next(x for x in man['moments'] if x['id'] == mid)
    clips = json.load(open(os.path.join(base, man['edl'])))[mid]['clips']
    if '--clips' in a: clips = json.load(open(a[a.index('--clips') + 1]))   # the page's clips (with "pause her" inserts: [at, at + d, {"pause": id}])
    isp = lambda c: len(c) > 2 and isinstance(c[2], dict) and 'pause' in c[2]
    cues = json.load(open(cues_path))
    src = os.path.join(base, man['source'])
    VOICE, TARGET, CEIL = lv.get('voiceLufs', -16.0), lv.get('target', -14.0), lv.get('ceiling', 0.80)

    # voice: decode the whole span once, slice by samples (frame-exact clips), short fades at the joins
    src_clips = [c for c in clips if not isp(c)]
    A, B = min(c[0] for c in src_clips), max(c[1] for c in src_clips)   # (a teaser's clips may go back in the source)
    raw = decode_range(src, A, B + 0.05, 1)
    parts = []; fade = int(0.006 * SR)
    for c in clips:
        ca, cb = c[0], c[1]
        if isp(c):   # "pause her": her voice stops for the pause (silence of exactly the clip's length; music and sound effects go on)
            parts.append(np.zeros(int(round((cb - A) * SR)) - int(round((ca - A) * SR)), np.float32)); continue
        s = raw[int(round((ca - A) * SR)): int(round((cb - A) * SR))].copy()
        if len(s) > 2 * fade:
            s[:fade] *= np.linspace(0, 1, fade); s[-fade:] *= np.linspace(1, 0, fade)
        parts.append(s)
    v = np.concatenate(parts)
    tail = float(a[a.index('--tail') + 1]) if '--tail' in a else float(m['tail']) if 'tail' in m else float((m.get('endCard') or {}).get('seconds', 6)) if m.get('kind') == 'short' else float(man.get('tail', 0))
    v = np.concatenate([v, np.zeros(int(round(tail * SR)), np.float32)]); N = len(v); dur = N / SR
    if au.get('voiceFilter'): v = ffilter(v, au['voiceFilter'], 1)[:N]
    if len(v) < N: v = np.pad(v, (0, N - len(v)))
    Iv, _ = lufs(v, 1); v = v * db(VOICE - Iv)

    # speech activity (10 ms) for ducking
    hop = 480; n = N // hop
    r = 20 * np.log10(np.sqrt((v[:n * hop].reshape(n, hop) ** 2).mean(1) + 1e-12))
    act = r > -44; hold = 25; last = -10 ** 9; a2 = act.copy()
    for i in range(n):
        if act[i]: last = i
        a2[i] = (i - last) <= hold

    vox = np.zeros((N, 2), np.float32); vox += v[:, None]
    mtrk = np.zeros((N, 2), np.float32); sfx = np.zeros((N, 2), np.float32)   # tracks: summed (voice per toggle) for the master
    report = {'id': mid, 'dur': round(dur, 3)}
    if music_on and m.get('music'):
        tid, off = m['music'][0], float(m['music'][1])
        mdir = os.path.join(LIB, 'music') if au['music']['dir'] == 'library:music' else os.path.join(base, au['music']['dir'])
        mus = trim_silence(decode(os.path.join(mdir, tid + '.mp3')))
        Im, _ = lufs(mus, 2); mus = mus * db(-16.0 - Im)
        st = int(off * SR); seg = mus[st:st + N]
        while len(seg) < N: seg = np.concatenate([seg, mus[:N - len(seg)]])   # loop the track as often as needed (was once: a track shorter than half the moment crashed)
        seg = ffilter(seg, 'highpass=f=60,equalizer=f=2800:t=q:w=1.3:g=-5,equalizer=f=250:t=q:w=1.0:g=-2', 2)[:N]
        DUCK, OPEN = lv.get('duckDb', -15.0), lv.get('openDb', -9.0)
        tgt = np.where(a2, DUCK, OPEN).astype(np.float64); g = np.empty(n); cur = tgt[0]
        ad, au_ = np.exp(-1 / 6.0), np.exp(-1 / 35.0)
        for i in range(n):
            c = ad if tgt[i] < cur else au_; cur = c * cur + (1 - c) * tgt[i]; g[i] = cur
        gl = db(np.interp(np.arange(N) / SR, np.arange(n) / 100, g)).astype(np.float32)
        fi, fo = int(0.5 * SR), int(1.4 * SR)
        gl[:fi] *= np.linspace(0, 1, fi) ** 1.5; gl[-fo:] *= np.linspace(1, 0, fo) ** 1.5
        # music sections (teasers, runtime/teaser.js TZ.music / TZ.drop): cues named "@mgain" {t, db, d} set the bed's level
        # from t (a d-second ramp; levels build section by section) and "@mdrop" {t, d} cut it to silence for d seconds
        # (a 0.08 s fade out; back at once on the hit). Plain moments have no such cues: nothing changes for them.
        mg = sorted([c for c in cues if c.get('name') == '@mgain'], key=lambda c: c['t'])
        if mg:
            tt = np.arange(N) / SR; lvl_db = np.zeros(N, np.float32); prev = 0.0
            for c in mg:
                t0, d1 = float(c['t']), max(0.0, float(c.get('d') or 0)); tgt_db = float(c.get('db', 0))
                i0 = max(0, int(t0 * SR)); i1 = min(N, int((t0 + d1) * SR))
                if i1 > i0: lvl_db[i0:i1] = prev + (tgt_db - prev) * (tt[i0:i1] - t0) / max(d1, 1e-6)
                lvl_db[i1:] = tgt_db; prev = tgt_db
            gl = gl * db(lvl_db)
        for c in cues:
            if c.get('name') != '@mdrop': continue
            t0, d1 = float(c['t']), float(c.get('d') or 0.5); ff = int(0.08 * SR)
            i0, i1 = max(0, int(t0 * SR)), min(N, int((t0 + d1) * SR))
            a0 = max(0, i0 - ff); gl[a0:i0] *= np.linspace(1, 0, i0 - a0) if i0 > a0 else 1; gl[i0:i1] = 0
        mtrk += seg * gl[:, None] * db(VOICE + 16.0)
        report['music'] = [tid, off]

    if sfx_on and cues:
        roles = dict(au['sfx'].get('roles', {}))
        pal = json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'sound-palette.json')))
        for k, v in pal.items():
            if not k.startswith('_') and k not in roles: roles[k] = v
        fslug = man.get('film')
        if fslug:
            fslug = os.path.basename(os.path.dirname(base)) if fslug is True else fslug
            fdir = os.path.join(os.path.dirname(os.path.dirname(base)), fslug, 'film')
            try: froles = json.load(open(os.path.join(fdir, 'film.json')))['audio']['sfx']['roles']
            except (OSError, KeyError, ValueError): froles = {}
            for k, v in froles.items():   # film roles: their own files live in the film's audio/sfx
                roles['film:' + k] = {**v, 'files': [f if f.startswith('library:') or f == 'KEYS' else 'film:' + os.path.join(fdir, 'audio', 'sfx', f + '.mp3') for f in v['files']]}
        kdir = os.path.join(base, au['sfx'].get('keys', 'audio/sfx/keys'))
        keys = [load_sfx(os.path.join(kdir, f)) for f in sorted(os.listdir(kdir)) if f.endswith('.wav')] if os.path.isdir(kdir) else []
        SG = float(au['sfx'].get('gainDb', 0))   # a project's lift for every sound effect (0 = as before)
        rng = np.random.default_rng(7); cache = {}; count = {}; placed = 0
        fpath = lambda f: os.path.join(LIB, 'sounds', f[8:] + '.mp3') if f.startswith('library:') else f[5:] if f.startswith('film:') else os.path.join(base, 'audio', 'sfx', f + '.mp3')
        for c in cues:
            if c['name'].startswith('@'): continue   # music automation (above), not a sound
            R = roles.get(c['name'])
            if R is None: print('warning: no sound role', c['name'], file=sys.stderr); continue
            if R['files'] == ['KEYS']:
                k = int(c.get('n', 4)); d = float(c.get('d', 0.4)); ts = c['t'] + np.sort(rng.uniform(0, max(0.05, d), k)); ts[0] = c['t']
                for tt in ts:
                    x, _ = keys[int(rng.integers(len(keys)))]; gg = db(R['db'] + c.get('db', 0) + SG + rng.uniform(-3, 1.5) + (VOICE + 16.0)); s0 = int(tt * SR)
                    lo, hi = max(0, s0), min(N, s0 + len(x))
                    if hi > lo: sfx[lo:hi] += x[lo - s0:hi - s0] * gg
                placed += 1; continue
            k = count.get(c['name'], 0); count[c['name']] = k + 1; f = R['files'][k % len(R['files'])]
            if f not in cache: cache[f] = load_sfx(fpath(f))
            x, pk = cache[f]
            if R.get('maxlen'):
                x = x[:int(R['maxlen'] * SR)].copy(); fo2 = min(len(x), int(0.3 * SR)); x[-fo2:] *= np.linspace(1, 0, fo2)[:, None]
            if c.get('len'):   # a cue that lasts exactly len s (the "pause her" typing bed): looped if the file is shorter, faded out at its end
                nl = max(1, int(float(c['len']) * SR)); x = np.concatenate([x] * (nl // max(1, len(x)) + 1))[:nl].copy()
                fo2 = min(len(x), int(0.12 * SR)); x[-fo2:] *= np.linspace(1, 0, fo2)[:, None]; fi2 = min(len(x), int(0.02 * SR)); x[:fi2] *= np.linspace(0, 1, fi2)[:, None]
            s0 = int(c['t'] * SR) - (pk if R.get('align') == 'peak' else 0)
            gg = db(R['db'] + c.get('db', 0) + SG + (VOICE + 16.0)); pan = 0.16 * np.sin(k * 2.1)
            lr = np.array([np.sqrt(0.5 - pan), np.sqrt(0.5 + pan)], np.float32) * np.sqrt(2)
            lo, hi = max(0, s0), min(N, s0 + len(x))
            if hi > lo: sfx[lo:hi] += x[lo - s0:hi - s0] * gg * lr; placed += 1
        report['sfx'] = placed

    for k, x in (('voice', vox), ('music', mtrk), ('sfx', sfx)):
        if lvl[k]: x *= np.float32(db(lvl[k]))   # 0 dB: untouched (bit-identical to before)
    mix = mtrk + sfx + (vox if voice_on else 0)
    speed = float(a[a.index('--speed') + 1]) if '--speed' in a else 1.0   # export speed (1.1-1.3): pitch kept, then mastered as usual
    if speed != 1.0:
        mix = ffilter(mix, f'atempo={speed}', 2); N = int(round(N / speed)); report['speed'] = speed
    I, _ = lufs(mix, 2)
    if voice_on: gain = db(TARGET - I)
    else: gain = db(min(-18.0 - I, 10.0)) if I > -60 else 1.0   # music / SFX only: a bed at -18 LUFS at most
    m2 = fitlen(limit(mix * gain, CEIL), N); I2, tp = lufs(m2, 2)
    if voice_on and abs(I2 - TARGET) > 0.15:
        gain *= db(TARGET - I2); m2 = fitlen(limit(mix * gain, CEIL), N); I2, tp = lufs(m2, 2)
    if stems_dir:
        os.makedirs(stems_dir, exist_ok=True)
        for name, x in (('voice', vox), ('music', mtrk), ('sfx', sfx)):
            subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'f32le', '-ar', str(SR), '-ac', '2', '-i', '-', '-c:a', 'aac', '-b:a', '160k', os.path.join(stems_dir, name + '.m4a')],
                           input=np.ascontiguousarray(x * gain, dtype=np.float32).tobytes(), check=True)
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'f32le', '-ar', str(SR), '-ac', '2', '-i', '-', '-c:a', 'pcm_s24le', out],
                   input=np.ascontiguousarray(m2, dtype=np.float32).tobytes(), check=True)
    if tracks:
        for name, x in (('voice', vox), ('music', mtrk), ('sound-effects', sfx)):
            subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'f32le', '-ar', str(SR), '-ac', '2', '-i', '-', '-c:a', 'pcm_s24le', tracks + name + '.wav'],
                           input=np.ascontiguousarray(fitlen(x * np.float32(gain), N), dtype=np.float32).tobytes(), check=True)
    report.update({'lufs': I2, 'true_peak': tp, 'gain_db': round(20 * np.log10(gain), 2), 'levels': lvl})
    print(json.dumps(report))


if __name__ == '__main__':
    main()
