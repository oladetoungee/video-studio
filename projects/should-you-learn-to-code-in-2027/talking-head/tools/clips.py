#!/usr/bin/env python3
"""learn-to-code: crops of the real Indeed Hiring Lab pages captured 2026-11-02 (film/stills/directions/_src) -> talking-head/assets/src
+ assets/src/clips.js (RV_CLIPS, highlight boxes in crop px). '-p' = a short crop for 9:16 so the words read big. Nothing altered."""
import json, os
from PIL import Image
P = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
S = os.path.join(P, 'film/stills/directions/_src'); O = os.path.join(P, 'talking-head/assets/src')
S1 = ('Indeed Hiring Lab, 23 Jul 2026', 'https://hiringlab.indeed.com/2026/07/23/the-labor-market-is-tilting-toward-seniority/')
S2 = ('Indeed Hiring Lab, 8 Jul 2026', 'https://hiringlab.indeed.com/?p=20708')
C = {
 'ind-title': ('indeed-seniority.png', (255, 170, 1300, 360), [], S1),
 'ind-head': ('indeed-seniority.png', (255, 170, 1300, 540), [], S1),
 'ind-45': ('indeed-seniority__4-5-in-software-developm.png', (255, 742, 1300, 822), [(794, 779, 474, 36)], S1),
 'ind-45-p': ('indeed-seniority__4-5-in-software-developm.png', (788, 777, 1288, 818), [(794, 779, 474, 36)], S1),
 'ind-ai-head': ('indeed-ai.png', (255, 170, 1300, 540), [], S2),
 'ind-15': ('indeed-ai.png', (300, 591, 1300, 676), [(770, 597, 304, 36)], S2),
 'ind-15-p': ('indeed-ai.png', (762, 593, 1082, 637), [(770, 597, 304, 36)], S2),
 'ind-71': ('indeed-ai.png', (300, 843, 1300, 921), [(331, 848, 919, 36), (331, 884, 322, 36)], S2),
}
out = {}
for k, (f, box, hls, (src, url)) in C.items():
    im = Image.open(os.path.join(S, f)).convert('RGB').crop(box); im.save(os.path.join(O, k + '.png'))
    out[k] = {'file': k + '.png', 'w': im.width, 'h': im.height, 'hl': [[x - box[0], y - box[1], w, h] for x, y, w, h in hls], 'source': src, 'url': url}
open(os.path.join(O, 'clips.js'), 'w').write('/* real page crops (Indeed Hiring Lab, captured 2026-11-02), made by talking-head/tools/clips.py */\nconst RV_CLIPS = ' + json.dumps(out, indent=0) + ';\n')
print({k: (v['w'], v['h']) for k, v in out.items()})
