#!/usr/bin/env python3
"""Word timings on the RAW video timeline.

The motion film's words (film/data/words.json, whisper DTW on the edited voice) are mapped back through the voice
edit's segment list (film/data/cutlist.json: orig_start/orig_end -> edit_start). Those timings are tighter than the
raw whisper token offsets in kit/transcripts/transcript.words.json, and every word the film uses exists here.

    python3 tools/rawwords.py            -> data/raw_words.json  [{w, t, e}] seconds on kit/raw-video.mov
    python3 tools/rawwords.py --print    also prints the transcript with raw times and pauses (for picking moments)
"""
import json, sys, os
HERE = os.path.dirname(os.path.abspath(__file__)); TH = os.path.dirname(HERE); PROJ = os.path.dirname(TH)
cl = json.load(open(os.path.join(PROJ, 'film/data/cutlist.json')))
words = json.load(open(os.path.join(PROJ, 'film/data/words.json')))
segs = sorted(cl['segments'], key=lambda s: s['edit_start'])

def to_raw(te):
    best = segs[0]
    for s in segs:
        if s['edit_start'] <= te + 1e-6: best = s
    return best['orig_start'] + (te - best['edit_start'])

# onset snap: a word that starts after a silence starts where the sound starts (DTW times run ~0.1-0.3 s late there)
import numpy as np
rms_path = os.path.join(TH, 'data/raw_rms_db.npy')   # 10 ms RMS of the raw audio (dB), see README
D = np.load(rms_path) if os.path.exists(rms_path) else None
THR = -44

def snap(t, lo):
    """the sound onset (80 ms of silence, then 30 ms of sound) nearest t, in [max(lo, t - 0.4), t + 0.08]"""
    if D is None: return t
    i0, i1 = int(max(lo, t - 0.4) * 100), int((t + 0.08) * 100); best = None
    for j in range(max(8, i0), min(len(D) - 3, i1 + 1)):
        if (D[j - 8:j] < THR).all() and (D[j:j + 3] > THR).all():
            if best is None or abs(j / 100 - t) < abs(best - t): best = j / 100
    return best if best is not None else t

out = []; snapped = 0; prev = -1
for w in words:
    t, e = to_raw(w['t']), to_raw(w['e'])
    t2 = snap(t, prev + 0.12); snapped += t2 != t; t = t2; prev = t
    if e < t: e = t + 0.05
    out.append({'w': w['w'], 't': round(t, 3), 'e': round(e, 3)})
print(f'{len(out)} words, {snapped} snapped to a sound onset', file=sys.stderr)
json.dump(out, open(os.path.join(TH, 'data/raw_words.json'), 'w'))
if '--print' in sys.argv:
    line, t0, prev = [], None, None
    for w in out:
        gap = w['t'] - prev if prev is not None else 0
        if gap > 0.6 or len(line) > 14:
            print(f"{t0:8.2f}  {' '.join(line)}"); line = []; t0 = None
            if gap > 0.6: print(f"          [pause {gap:.1f}s]")
        if t0 is None: t0 = w['t']
        line.append(w['w']); prev = w['e']
    print(f"{t0:8.2f}  {' '.join(line)}")
