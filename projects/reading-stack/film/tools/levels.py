#!/usr/bin/env python3
"""Measure the mix: momentary loudness (EBU R128, 400 ms) of each stem in speech vs pause windows, and SFX vs music.
Reads the stems written by studio/tools/stems.py (build/stems/)."""
import json, os, subprocess, re, numpy as np
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
def momentary(path, win=4):
    """approx. BS.1770 momentary loudness: K-weighting via ffmpeg, 400 ms windows every 100 ms"""
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', path, '-af', 'highpass=f=38:poles=2,treble=g=4:f=1500', '-ar', '48000', '-ac', '2', '-f', 'f32le', '-'], capture_output=True).stdout
    x = np.frombuffer(raw, dtype=np.float32).reshape(-1, 2).astype(np.float64)
    hop = 4800; n = len(x) // hop
    ms = (x[:n * hop] ** 2).reshape(n, hop, 2).mean(1).sum(1)
    c = np.convolve(ms, np.ones(win) / win, mode='full')[:n]
    m = -0.691 + 10 * np.log10(c + 1e-12)
    return np.arange(n) * 0.1 + 0.1, m
off = float(os.environ.get('OFFSET', 0))
meta = json.load(open(os.path.join(ROOT, 'data/meta.json')))
mask = np.load(os.path.join(ROOT, 'build/stems/speech_mask.npy'))
S = {k: momentary(os.path.join(ROOT, f'build/stems/{k}.flac')) for k in ['voice', 'music', 'sfx']}
tm, _ = S['voice']
idx = np.clip(((tm + off) * 100).astype(int), 0, len(mask) - 1)
inside = ((tm + off) > meta['INTRO'] + 0.5) & ((tm + off) < meta['TOTAL'] - meta['OUTRO'] - 0.5)
sp = mask[idx] & inside; pa = (~mask[idx]) & inside
# pauses: only frames well inside a pause (the 400 ms window must not contain speech)
pa2 = pa & np.array([not mask[max(0, i - 25):i + 1].any() for i in idx])
def med(k, sel):
    v = S[k][1][sel]; v = v[np.isfinite(v) & (v > -70)]; return round(float(np.median(v)), 1) if len(v) else None
print('speech windows : voice', med('voice', sp), ' music', med('music', sp))
print('pause windows  : music', med('music', pa2), ' (n=%d)' % pa2.sum())
intro = (tm + off) < meta['INTRO'] - 0.3
print('intro (music only): music', med('music', intro))
# sfx vs music at each cue
rows = []
tS, mS = momentary(os.path.join(ROOT, 'build/stems/sfx.flac'), 1); tM, mM = momentary(os.path.join(ROOT, 'build/stems/music.flac'), 1); tV, mV = momentary(os.path.join(ROOT, 'build/stems/voice.flac'), 1)
v100 = mV[mV > -40]; print('voice 100ms-window loudness in speech: median %.1f, 90th pct %.1f' % (np.median(v100), np.percentile(v100, 90)))
for c in meta['CUES']:
    t = c['t'] - off
    if t < 0 or t > tS[-1]: continue
    w = (tS >= t - 0.1) & (tS <= t + 0.6); wm = (tM >= t - 0.1) & (tM <= t + 0.6)
    if not w.any() or not wm.any(): continue
    rows.append((c['name'], mS[w].max(), mM[wm].max(), 0))
import collections
by = collections.defaultdict(list)
for n, s, m, v in rows: by[n].append((s, m, v))
voice_med = med('voice', sp)
print('sfx 100ms-window peak per role (median over cues)  vs music at the same moment; voice speech median =', voice_med)
for n, L in sorted(by.items()):
    a = np.array(L); print(f'  {n:8s} n={len(L):3d}  sfx {np.median(a[:,0]):6.1f}   music {np.median(a[:,1]):6.1f}   sfx-music {np.median(a[:,0]-a[:,1]):5.1f} dB   sfx-voice {np.median(a[:,0])-voice_med:5.1f} dB')
