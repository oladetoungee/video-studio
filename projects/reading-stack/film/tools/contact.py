#!/usr/bin/env python3
"""Tile rendered stills into review contact sheets.
  python3 tools/contact.py build/ends build/ends_sheet [per_sheet=20] [cols=4]
  python3 tools/contact.py ends-times        -> prints a comma list of 'scene end - 0.3 s' times from data/meta.json
"""
import sys, glob, json, os
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

if sys.argv[1] == 'ends-times':
    m = json.load(open(os.path.join(ROOT, 'data/meta.json'))); S = m['SCENES']
    print(','.join(str(round((S[i + 1]['start'] if i + 1 < len(S) else m['TOTAL']) - 0.3, 2)) for i in range(len(S))))
    sys.exit()

src, out = sys.argv[1], sys.argv[2]
per = int(sys.argv[3]) if len(sys.argv) > 3 else 20
cols = int(sys.argv[4]) if len(sys.argv) > 4 else 4
fs = sorted(glob.glob(os.path.join(src, '*.jpg')) + glob.glob(os.path.join(src, '*.png')))
w, h = 480, 270
for k in range(0, len(fs), per):
    part = fs[k:k + per]; rows = (len(part) + cols - 1) // cols
    sh = Image.new('RGB', (cols * w + (cols - 1) * 6, rows * h + (rows - 1) * 6), (80, 80, 80))
    for i, f in enumerate(part):
        sh.paste(Image.open(f).convert('RGB').resize((w, h)), ((i % cols) * (w + 6), (i // cols) * (h + 6)))
    sh.save(f'{out}{k // per}.jpg', quality=88)
print(len(fs), 'stills')
