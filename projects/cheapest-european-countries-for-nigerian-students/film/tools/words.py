#!/usr/bin/env python3
"""cheapest-countries film: her corrected words (talking-head/data/raw_words.json, source seconds) mapped onto the EDITED voice
through data/cutlist.json "segments" (tools/edit_voice.py). Words inside a cut are dropped. -> data/words.json, data/captions.srt
Run after tools/edit_voice.py (and after talking-head/tools/words.py when a word fix changes)."""
import json, os, sys
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.join(os.path.dirname(ROOT), '..', 'scholarships-for-african-students-in-europe', 'film', 'tools'))
INTRO = json.load(open(os.path.join(ROOT, 'film.json')))['intro']
segs = json.load(open(os.path.join(ROOT, 'data/cutlist.json')))['segments']
raw = json.load(open(os.path.join(os.path.dirname(ROOT), 'talking-head/data/raw_words.json')))
def m(t):
    for s in segs:
        if s['orig_start'] - 1e-6 <= t <= s['orig_end'] + 1e-6: return s['edit_start'] + (t - s['orig_start']), s
    return None, None
man = [(c['start'], c['end']) for c in json.load(open(os.path.join(ROOT, 'data/cutlist.json')))['manual_cuts']]
def at(t):   # edit time of source time t; inside a tightened pause -> the end of the kept audio before it
    best = None
    for s in segs:
        if s['orig_start'] - 1e-6 <= t <= s['orig_end'] + 1e-6: return s['edit_start'] + (t - s['orig_start'])
        if s['orig_end'] < t: best = s
    return best['edit_start'] + (best['orig_end'] - best['orig_start']) - 0.04 if best else 0
out = []
for w in raw:
    if any(a_ - 0.02 <= w['t'] and w['t'] + 0.05 <= b_ + 0.02 for a_, b_ in man): continue   # said inside a manual cut
    t = at(w['t']); e = at(min(w['e'], w['t'] + 0.9))
    out.append({'w': w['w'], 't': round(t, 3), 'e': round(max(e, t + 0.05), 3)})
for i in range(1, len(out)):
    if out[i]['t'] < out[i - 1]['t'] + 0.02: out[i]['t'] = round(out[i - 1]['t'] + 0.02, 3)
    if out[i - 1]['e'] > out[i]['t']: out[i - 1]['e'] = out[i]['t']
json.dump(out, open(os.path.join(ROOT, 'data/words.json'), 'w'), indent=0)
print(len(out), 'words of', len(raw), '; last at', out[-1]['e'])
import importlib.util
spec = importlib.util.spec_from_file_location('sw', os.path.join(os.path.dirname(ROOT), '..', 'scholarships-for-african-students-in-europe', 'film', 'tools', 'words.py'))
src = open(spec.origin).read(); ns = {'__name__': 'x', 'INTRO': INTRO, 'ROOT': ROOT, 'os': os, 'json': json}
exec(src[src.index('def fmt('):src.index('if __name__')], ns)
ns['INTRO'] = INTRO; ns['write_srt'](out)
