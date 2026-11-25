#!/usr/bin/env python3
"""Review stills of a moment: one still per layout segment (at its start + 60 %, max +1.4 s), then contact sheets.
  python3 tools/review.py <id> [16x9|9x16] [--late 0.6] [--only a,b] -> build/review/<id>_<aspect>/ + sheet_<id>_<aspect>_N.jpg"""
import json, os, subprocess, sys, glob
from PIL import Image, ImageDraw
H = os.path.dirname(os.path.dirname(os.path.abspath(__file__))); ROOT = os.path.abspath(os.path.join(H, '..', '..', '..'))
mid = sys.argv[1]; asp = sys.argv[2] if len(sys.argv) > 2 and not sys.argv[2].startswith('--') else '16x9'
late = float(sys.argv[sys.argv.index('--late') + 1]) if '--late' in sys.argv else 0.6
man = os.path.join(H, 'talking-head.json')
raw = subprocess.run(['node', 'studio/tools/composite.mjs', 'meta', man, mid, '--aspect', asp], cwd=ROOT, capture_output=True, text=True).stdout
meta = json.loads(raw[raw.index('{'):])
ts = []
for s in meta['SCENES']:
    d = s['end'] - s['start']
    if d < 0.3: continue
    ts.append(round(s['start'] + min(1.4, d * late), 2))
if '--at' in sys.argv: ts = [float(x) for x in sys.argv[sys.argv.index('--at') + 1].split(',')]
out = os.path.join(H, 'build', 'review', f'{mid}_{asp}'); os.makedirs(out, exist_ok=True)
for f in glob.glob(out + '/*.jpg'): os.remove(f)
subprocess.run(['node', 'studio/tools/composite.mjs', 'stills', man, mid, '--at', ','.join(map(str, ts)), '--aspect', asp] + (['--captions'] if '--captions' in sys.argv else []) + ['--out', out], cwd=ROOT, check=True, capture_output=True)
fs = sorted(glob.glob(out + '/*.jpg'))
cols = 4 if asp == '16x9' else 6; tw = 480 if asp == '16x9' else 270; th = 270 if asp == '16x9' else 480
per = cols * 5
for k in range(0, len(fs), per):
    grp = fs[k:k + per]; rows = (len(grp) + cols - 1) // cols
    sheet = Image.new('RGB', (cols * tw, rows * (th + 22)), '#222')
    d = ImageDraw.Draw(sheet)
    for i, f in enumerate(grp):
        im = Image.open(f).convert('RGB').resize((tw, th)); x, y = (i % cols) * tw, (i // cols) * (th + 22)
        sheet.paste(im, (x, y + 22)); d.text((x + 4, y + 4), os.path.basename(f)[:60], fill='#fff')
    sheet.save(os.path.join(H, 'build', 'review', f'sheet_{mid}_{asp}_{k // per + 1}.jpg'), quality=82)
print(len(fs), 'stills', out)
