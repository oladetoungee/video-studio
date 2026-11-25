#!/usr/bin/env python3
"""assets/src/*.json (real page crops) -> assets/src/clips.js (PC_CLIPS) + the image keys in talking-head.json and film/film.json"""
import json, os, glob
HERE = os.path.dirname(os.path.abspath(__file__)); TH = os.path.dirname(HERE); P = os.path.dirname(TH)
clips = {}
for f in sorted(glob.glob(os.path.join(TH, 'assets/src/*.json'))):
    n = os.path.basename(f)[:-5]; j = json.load(open(f)); clips[n] = {'w': j['w'], 'h': j['h'], 'hl': j['hl'], 'src': j['src']}
open(os.path.join(TH, 'assets/src/clips.js'), 'w').write('/* real official pages (talking-head/tools/capture.mjs, captured 2 Nov 2026; cropped only) */\nconst PC_CLIPS = ' + json.dumps(clips) + ';\n')
px = sorted(os.path.basename(x)[:-4] for x in glob.glob(os.path.join(TH, 'assets/px/*.jpg')))
for mf, pre in [(os.path.join(TH, 'talking-head.json'), ''), (os.path.join(P, 'film/film.json'), '../talking-head/')]:
    m = json.load(open(mf)); im = m.get('images', {})
    for n in clips: im['clip_' + n] = pre + 'assets/src/' + n + '.png'
    for n in px: im['px_' + n] = pre + 'assets/px/' + n + '.jpg'
    m['images'] = im; json.dump(m, open(mf, 'w'), indent=1, ensure_ascii=False)
print(len(clips), 'clips', len(px), 'photos')
