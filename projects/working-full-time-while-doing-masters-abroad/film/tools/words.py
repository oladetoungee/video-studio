#!/usr/bin/env python3
"""Her corrected words (talking-head/data/raw_words.json: whisper t_dtw + talking-head/tools/words.py fixes) mapped onto the
EDITED voice through data/cutlist.json segments -> data/words.json; captions -> data/captions.srt (video time = + intro).
Run after tools/edit_voice.py:  python3 tools/words.py"""
import json, os, re
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
INTRO = json.load(open(os.path.join(ROOT, 'film.json')))['intro']
W = json.load(open(os.path.join(ROOT, '..', 'talking-head', 'data', 'raw_words.json')))
segs = json.load(open(os.path.join(ROOT, 'data', 'cutlist.json')))['segments']
out = []
MANUAL = json.load(open(os.path.join(ROOT, 'data', 'cutlist.json')))['manual_cuts']
dropped = 0
for w in W:
    if any(c['start'] <= w['t'] < c['end'] for c in MANUAL): dropped += 1; continue   # a word inside a manual cut is gone
    # a word whose whisper time falls inside a tightened pause (DTW times are a little off) snaps to the nearest kept audio
    s = min(segs, key=lambda s: 0 if s['orig_start'] <= w['t'] < s['orig_end'] else min(abs(w['t'] - s['orig_start']), abs(w['t'] - s['orig_end'])))
    t = min(max(w['t'], s['orig_start']), s['orig_end'] - 0.02); d = s['edit_start'] - s['orig_start']
    out.append({'w': w['w'], 't': round(t + d, 3), 'e': round(max(t + 0.04, min(w['e'], s['orig_end'])) + d, 3)})
print('dropped (in manual cuts):', dropped)
for i in range(1, len(out)):
    if out[i]['t'] < out[i - 1]['t']: out[i]['t'] = out[i - 1]['t']
json.dump(out, open(os.path.join(ROOT, 'data', 'words.json'), 'w'))
# captions: one breath per line (<= 42 characters), lowercase as spoken (names and I kept), no full stops
def ts(x):
    x = max(0, x); h, r = divmod(x, 3600); m, s = divmod(r, 60); return '%02d:%02d:%06.3f' % (h, m, s)
lines, cur = [], []
for i, w in enumerate(out):
    if cur and (len(' '.join(x['w'] for x in cur + [w])) > 42 or w['t'] - cur[-1]['e'] > 0.45): lines.append(cur); cur = []
    cur.append(w)
    if re.search(r'[.?!]$', w['w']) and len(cur) >= 3: lines.append(cur); cur = []
if cur: lines.append(cur)
srt = []
for k, ln in enumerate(lines):
    t0 = ln[0]['t'] + INTRO - 0.05; t1 = (lines[k + 1][0]['t'] + INTRO - 0.06) if k + 1 < len(lines) else ln[-1]['e'] + INTRO + 0.8
    t1 = min(t1, ln[-1]['e'] + INTRO + 0.8)
    txt = ' '.join(x['w'] for x in ln).rstrip('.')
    srt.append(f"{k + 1}\n{ts(t0).replace('.', ',')} --> {ts(t1).replace('.', ',')}\n{txt}\n")
open(os.path.join(ROOT, 'data', 'captions.srt'), 'w').write('\n'.join(srt))
print(len(out), 'words', len(lines), 'captions', 'last', out[-1])
