#!/usr/bin/env python3
"""Sound QA: measure a film's sound instead of trusting ears (nobody can listen on this machine).

  python3 studio/tools/soundqa.py <slug> [--export outputs/video/<file>.mp4] [--json out.json] [--show 15]

Reads projects/<slug>/film/build/stems/{voice,music,sfx}.flac (+ stems.json), film/data/meta.json (the sound cues) and, if
given, an exported video. Changes nothing. Writes film/build/qa/soundqa.json and prints a summary.

What it measures (targets from the Opus Motion Lab notes, inspiration/know-how/opus-motion-lab-florence.md):
  1. stale stems          the stems' cue key against meta.json (stems older than the scenes = every timing below is off)
  2. hit timing           per cue, in the sound-effects stem: onset (10 % of the hit's max), FIRST peak, loudest peak, against the
                          cue time and against the frame+1 target ((round(t*30)+1)/30). Target: first peak within one frame
                          after the visual frame, and the first peak is the largest (a soft attack reads late).
  3. hit over bed         K-weighted level of the first 60 ms of each hit (from 10 ms before its first peak) against voice+music in the same 60 ms. Target 3-6 dB.
  3b. music under voice  voice against music (K-weighted) while she speaks; Mortiflix aims ~18 dB, our mixer ducks ~12 dB.
  4. phone band           integrated loudness of the full mix through 200 Hz-6 kHz against the full band, plus the share of energy
                          under 60 Hz and under 200 Hz (phones play almost nothing there).
  5. DC offset            mean of each stem and of the mix, in dBFS (target below -60 dBFS).
  6. AAC true peak        the master WAV as an export makes it (studio/tools/mixclip.py, whole film), its true peak, the same WAV
                          encoded as the exports do (AAC 256k) and decoded again: how much AAC lifts the peak. Target <= -1 dBTP
                          after AAC. With --export: the true peak, loudness and audio offset of the real exported file.
"""
import json, os, subprocess, sys, tempfile, numpy as np

HERE = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HERE)
from stems import cues_key  # noqa: E402  (same key the editor uses to spot stale stems)

VIDEOS = os.path.dirname(os.path.dirname(HERE))
SR = 48000
FPS = 30


def decode(path, ch=2, sr=SR):
    out = subprocess.run(['ffmpeg', '-v', 'error', '-i', path, '-ar', str(sr), '-ac', str(ch), '-f', 'f32le', '-'], capture_output=True, check=True).stdout
    x = np.frombuffer(out, dtype=np.float32)
    return x.reshape(-1, ch).copy() if ch > 1 else x.copy()


def ffilter(x, af):
    ch = x.shape[1] if x.ndim > 1 else 1
    p = subprocess.run(['ffmpeg', '-v', 'error', '-f', 'f32le', '-ar', str(SR), '-ac', str(ch), '-i', '-', '-af', af, '-f', 'f32le', '-'],
                       input=np.ascontiguousarray(x, dtype=np.float32).tobytes(), capture_output=True, check=True).stdout
    y = np.frombuffer(p, dtype=np.float32)
    return y.reshape(-1, ch).copy() if ch > 1 else y.copy()


def ebur(x=None, path=None, af=None):
    """integrated LUFS and true peak (dBTP) with ffmpeg's ebur128 (4x oversampled peak)"""
    filt = (af + ',' if af else '') + 'ebur128=peak=true'
    if path:
        p = subprocess.run(['ffmpeg', '-hide_banner', '-nostats', '-i', path, '-vn', '-af', filt, '-f', 'null', '-'], capture_output=True).stderr.decode()
    else:
        ch = x.shape[1] if x.ndim > 1 else 1
        p = subprocess.run(['ffmpeg', '-hide_banner', '-nostats', '-f', 'f32le', '-ar', str(SR), '-ac', str(ch), '-i', '-', '-af', filt, '-f', 'null', '-'],
                           input=np.ascontiguousarray(x, dtype=np.float32).tobytes(), capture_output=True).stderr.decode()
    tail = p[p.rfind('Summary:'):]
    I = float(tail.split('I:')[1].split('LUFS')[0])
    tp = float(tail.split('Peak:')[1].split('dBFS')[0]) if 'Peak:' in tail else None
    return I, tp


def kweight_filter():
    """ITU-R BS.1770 K-weighting as two ffmpeg biquads (coefficients for any rate, pyloudnorm's formulas)"""
    G, Q, fc = 3.99984385397, 0.7071752369554193, 1681.9744509555319
    K = np.tan(np.pi * fc / SR); Vh = 10 ** (G / 20); Vb = Vh ** 0.4996667741545416; a0 = 1 + K / Q + K * K
    s1 = dict(b0=(Vh + Vb * K / Q + K * K) / a0, b1=2 * (K * K - Vh) / a0, b2=(Vh - Vb * K / Q + K * K) / a0, a1=2 * (K * K - 1) / a0, a2=(1 - K / Q + K * K) / a0)
    fc2, Q2 = 38.13547087613982, 0.5003270373253953
    K = np.tan(np.pi * fc2 / SR); a0 = 1 + K / Q2 + K * K
    s2 = dict(b0=1.0, b1=-2.0, b2=1.0, a1=2 * (K * K - 1) / a0, a2=(1 - K / Q2 + K * K) / a0)
    bq = lambda s: 'biquad=a0=1:a1=%.12f:a2=%.12f:b0=%.12f:b1=%.12f:b2=%.12f' % (s['a1'], s['a2'], s['b0'], s['b1'], s['b2'])
    return bq(s1) + ',' + bq(s2)


PHONE = 'highpass=f=200:poles=2,highpass=f=200:poles=2,lowpass=f=6000:poles=2,lowpass=f=6000:poles=2'
db = lambda p: 10 * np.log10(max(p, 1e-20))


def band_share(mono):
    """share of energy below 60 Hz and 200 Hz (Welch-style average of 8192-point spectra over the loud parts)"""
    n = 8192; hop = n; win = np.hanning(n).astype(np.float32); acc = np.zeros(n // 2 + 1)
    for i in range(0, len(mono) - n, hop * 4):
        seg = mono[i:i + n]
        if np.abs(seg).max() < 1e-3: continue
        acc += np.abs(np.fft.rfft(seg * win)) ** 2
    f = np.fft.rfftfreq(n, 1 / SR); tot = acc.sum() + 1e-20
    return float(acc[f < 60].sum() / tot), float(acc[f < 200].sum() / tot)


def main():
    a = sys.argv[1:]
    if not a: print(__doc__); sys.exit(1)
    slug = a[0]; opt = lambda k, d=None: a[a.index(k) + 1] if k in a else d
    film = os.path.join(VIDEOS, 'projects', slug, 'film'); sd = os.path.join(film, 'build', 'stems')
    info = json.load(open(os.path.join(sd, 'stems.json'))); meta = json.load(open(os.path.join(film, 'data', 'meta.json')))
    man = json.load(open(os.path.join(film, 'film.json'))); roles = man['audio']['sfx']['roles']
    rep = {'slug': slug, 'stems_created': info.get('created')}
    key = cues_key(meta['CUES']); rep['stale_stems'] = key != info.get('cuesKey')
    print('stems', info.get('created'), '| cue key', key, 'stems', info.get('cuesKey'), '-> STALE: re-mix the sound first' if rep['stale_stems'] else '-> up to date')

    voice = decode(os.path.join(sd, 'voice.flac'), 1); music = decode(os.path.join(sd, 'music.flac')); sfx = decode(os.path.join(sd, 'sfx.flac'))
    N = min(len(voice), len(music), len(sfx)); voice, music, sfx = voice[:N], music[:N], sfx[:N]
    bed = music + voice[:, None]; mix = bed + sfx

    # 2 + 3: per-cue timing and level over the bed
    kf = kweight_filter()
    sfxK = ffilter(sfx, kf); bedK = ffilter(bed, kf); musK = ffilter(music, kf)
    env = np.abs(sfx).max(1); hop = 48; ne = len(env) // hop
    E = env[:ne * hop].reshape(ne, hop).max(1)                 # 1 ms max envelope
    cues = sorted(meta['CUES'], key=lambda c: c['t']); rows = []
    for i, c in enumerate(cues):
        t = c['t']; prev = cues[i - 1]['t'] if i else -1; nxt = cues[i + 1]['t'] if i + 1 < len(cues) else 1e9
        lo = max(t - 0.12, (prev + t) / 2); hi = min(t + 0.35, (t + nxt) / 2)
        a0, a1 = int(lo * 1000), min(ne, int(hi * 1000))
        w = E[a0:a1]
        if len(w) < 5 or w.max() < 1e-4: rows.append({'name': c['name'], 't': t, 'silent': True}); continue
        mx = w.max(); loud = a0 + int(np.argmax(w))
        on = a0 + int(np.argmax(w >= 0.1 * mx))
        k = a0 + int(np.argmax(w >= 0.5 * mx))                 # first time it reaches half the max: climb to that peak
        while k + 1 < a1 and E[k + 1] >= E[k]: k += 1
        first = k
        F = round(t * FPS); target = (F + 1) / FPS
        s0 = int(max(on, first - 10) / 1000 * SR); s1 = s0 + int(0.06 * SR)   # the attack: 60 ms from just before the first peak
        hit = np.mean(sfxK[s0:s1] ** 2); bedp = np.mean(bedK[s0:s1] ** 2); musp = np.mean(musK[s0:s1] ** 2)
        R = roles.get(c['name'], {})
        rows.append({'name': c['name'], 't': t, 'align': R.get('align'), 'onset_ms': round(on - t * 1000, 1), 'first_peak_ms': round(first - t * 1000, 1),
                     'loudest_ms': round(loud - t * 1000, 1), 'first_vs_target_ms': round(first - target * 1000, 1),
                     'first_is_loudest_db': round(20 * np.log10(E[first] / mx + 1e-9), 1),
                     'over_bed_db': round(db(hit) - db(bedp), 1), 'over_music_db': round(db(hit) - db(musp), 1)})
    R_ = [r for r in rows if not r.get('silent')]
    arr = lambda k, f=lambda r: True: np.array([r[k] for r in R_ if f(r)])
    nt = lambda r: r['name'] != 'type'
    fv = arr('first_vs_target_ms', nt)
    ob = arr('over_bed_db', nt)
    rep['cues'] = rows
    rep['timing'] = {'cues': len(R_), 'first_peak_vs_cue_ms_median': float(np.median(arr('first_peak_ms', nt))),
                     'first_peak_vs_frame_plus_1_ms_median': float(np.median(fv)),
                     'within_one_frame_after_visual': int(np.sum((arr('first_peak_ms', nt) >= -5) & (arr('first_peak_ms', nt) <= 1000 / FPS + 5))),
                     'early_more_than_1_frame': int(np.sum(arr('first_peak_ms', nt) < -1000 / FPS)), 'late_more_than_2_frames': int(np.sum(arr('first_peak_ms', nt) > 2000 / FPS)),
                     'first_peak_not_loudest_3db': int(np.sum(arr('first_is_loudest_db', nt) < -3))}
    rep['over_bed'] = {'median_db': float(np.median(ob)), 'below_3db': int(np.sum(ob < 3)), 'in_3_to_6db': int(np.sum((ob >= 3) & (ob <= 6))), 'above_6db': int(np.sum(ob > 6)),
                       'by_role_median_db': {n: float(np.median([r['over_bed_db'] for r in R_ if r['name'] == n])) for n in sorted({r['name'] for r in R_})}}

    # 4 + 5: phone band, DC, low-end share (pre-limiter sum = what the limiter gets)
    I_full, _ = ebur(mix); I_phone, _ = ebur(mix, af=PHONE)
    s60, s200 = band_share(mix.mean(1))
    rep['phone_band'] = {'full_lufs': I_full, 'phone_lufs': I_phone, 'drop_db': round(I_phone - I_full, 2), 'energy_below_60hz': round(s60, 4), 'energy_below_200hz': round(s200, 4)}
    dc = lambda x: round(20 * np.log10(abs(float(np.mean(x))) + 1e-12), 1)
    rep['dc_dbfs'] = {'voice': dc(voice), 'music_L': dc(music[:, 0]), 'music_R': dc(music[:, 1]), 'sfx_L': dc(sfx[:, 0]), 'sfx_R': dc(sfx[:, 1]), 'mix_L': dc(mix[:, 0]), 'mix_R': dc(mix[:, 1])}
    # music under the voice while she speaks (Mortiflix: ~18 dB; our mixer ducks ~12 dB): K-weighted, speech frames only
    vK = ffilter(voice, kf); hop10 = 480; n10 = min(len(vK) // hop10, len(musK) // hop10)
    pv = (vK[:n10 * hop10].reshape(n10, hop10) ** 2).mean(1); pm = (musK[:n10 * hop10].reshape(n10, hop10, 2) ** 2).mean((1, 2)) * 2
    mpath = os.path.join(sd, 'speech_mask.npy'); sp = np.load(mpath)[:n10] if os.path.exists(mpath) else pv > 1e-5
    sp = sp & (pv > 1e-6); ps = (~np.load(mpath)[:n10] if os.path.exists(mpath) else ~sp) & (np.arange(n10) > 100)
    rep['music_under_voice'] = {'voice_over_music_db_while_speaking': round(db(pv[sp].mean()) - db(pm[sp].mean()), 1),
                                'music_in_pauses_vs_speech_db': round(db(pm[ps].mean()) - db(pm[sp].mean()), 1) if ps.any() else None}
    del sfxK, bedK, musK, vK

    # 6: master WAV -> AAC -> decoded, as the exports do it
    with tempfile.TemporaryDirectory() as td:
        wav = os.path.join(td, 'master.wav'); m4a = os.path.join(td, 'master.m4a')
        subprocess.run([sys.executable, os.path.join(HERE, 'mixclip.py'), sd, '0', str(info['total']), '--full', '--out', wav], check=True, capture_output=True)
        Iw, tpw = ebur(path=wav)
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', wav, '-c:a', 'aac', '-b:a', '256k', m4a], check=True)
        Ia, tpa = ebur(path=m4a)
        rep['aac'] = {'wav_lufs': Iw, 'wav_true_peak': tpw, 'aac_lufs': Ia, 'aac_true_peak': tpa, 'aac_lift_db': round(tpa - tpw, 2),
                      'limiter_ceiling_dbfs': round(20 * np.log10(info.get('ceiling', 0.8)), 2)}
        exp = opt('--export')
        if exp:
            exp = exp if os.path.isabs(exp) else os.path.join(VIDEOS, 'projects', slug, exp)
            Ie, tpe = ebur(path=exp)
            # offset of the export's audio against the master WAV (cross-correlation of 1 kHz envelopes over the loudest 20 s)
            x = decode(wav).mean(1); y = decode(exp).mean(1); n = min(len(x), len(y)); nn = n - n % 48
            ex = np.abs(x[:nn]).reshape(-1, 48).max(1); ey = np.abs(y[:nn]).reshape(-1, 48).max(1)
            c0 = int(np.argmax(np.convolve(ex, np.ones(20000), 'valid'))) if len(ex) > 20000 else 0
            seg = ex[c0:c0 + 20000]; lags = range(-200, 201)
            best = max(lags, key=lambda L: float(np.dot(seg, ey[c0 + L:c0 + L + 20000])) if c0 + L >= 0 and c0 + L + 20000 <= len(ey) else -1)
            # fine: sample-level around the coarse lag
            s = c0 * 48 + best * 48; xs = x[c0 * 48:c0 * 48 + SR * 5]; fine = max(range(-96, 97), key=lambda L: float(np.dot(xs, y[s + L:s + L + len(xs)])) if s + L >= 0 and s + L + len(xs) <= len(y) else -1)
            rep['export'] = {'file': exp, 'lufs': Ie, 'true_peak': tpe, 'audio_offset_ms_vs_master': round((best * 48 + fine) / SR * 1000, 2)}

    out = opt('--json', os.path.join(film, 'build', 'qa', 'soundqa.json')); os.makedirs(os.path.dirname(out), exist_ok=True)
    json.dump(rep, open(out, 'w'), indent=1, default=float)
    show = int(opt('--show', '12'))
    print(out)
    for k in ('timing', 'over_bed', 'music_under_voice', 'phone_band', 'dc_dbfs', 'aac', 'export'):
        if k in rep: print(k, json.dumps(rep[k], default=float))
    worst = sorted([r for r in R_ if r['name'] != 'type'], key=lambda r: -abs(r['first_vs_target_ms']))[:show]
    print('worst timing (first peak vs frame+1, ms):', ', '.join(f"{r['name']}@{r['t']:.2f} {r['first_vs_target_ms']:+.0f}" for r in worst))
    quiet = sorted([r for r in R_ if r['name'] != 'type'], key=lambda r: r['over_bed_db'])[:show]
    print('quietest over the bed (dB):', ', '.join(f"{r['name']}@{r['t']:.2f} {r['over_bed_db']:+.1f}" for r in quiet))


if __name__ == '__main__':
    main()
