#!/usr/bin/env python3
"""Review sheets for the shorts formats + covers (rollout 2026-11-10).
  python3 tools/fmtsheet.py [sh01 sh02 ...] -> outputs/_review/shorts-formats-v2.jpg (3 stills per short, format letter) + covers.jpg
  (each cover full 9:16 + its 3:4 grid crop). Stills: studio/tools/composite.mjs stills (under the render lock), build/review/fmt/."""
import json, os, subprocess, sys, glob
from PIL import Image, ImageDraw, ImageFont
H = os.path.dirname(os.path.dirname(os.path.abspath(__file__))); ROOT = os.path.abspath(os.path.join(H, '..', '..', '..'))
MAN = os.path.join(H, 'talking-head.json'); man = json.load(open(MAN))
OUT = os.path.join(H, '..', 'outputs', '_review'); os.makedirs(OUT, exist_ok=True)
ids = sys.argv[1:] or [m['id'] for m in man['moments'] if m['kind'] == 'short']
def meta(i):
    r = subprocess.run(['node', 'studio/tools/composite.mjs', 'meta', MAN, i, '--aspect', '9x16'], cwd=ROOT, capture_output=True, text=True).stdout
    return json.loads(r[r.index('{'):])
font = ImageFont.truetype('/System/Library/Fonts/Helvetica.ttc', 26)
rows, covers = [], []
for i in ids:
    m = next(x for x in man['moments'] if x['id'] == i); d = meta(i); dur = d['dur']
    sc = [s for s in d['SCENES'] if s['end'] - s['start'] > 0.6 and s['start'] < dur - 0.3]
    talk = [s for s in sc if s.get('layout') in ('talk', 'Talk') or str(s.get('id', '')).startswith(('hook', 'talk', 'screen'))]
    gfx = [s for s in sc if s not in talk]
    pick = ([talk[0]] if talk else []) + gfx[:1] + gfx[len(gfx) // 2 + 1:len(gfx) // 2 + 2]
    pick = (pick + [s for s in sc if s not in pick])[:3]
    ts = sorted(round(s['start'] + min(3.5, (min(s['end'], dur) - s['start']) * 0.8), 2) for s in pick)
    while len(ts) < 3: ts = sorted(ts + [round(dur * (0.5 + 0.2 * len(ts)), 2)])
    ts = [0.03] + ts
    out = os.path.join(H, 'build', 'review', 'fmt', i); os.makedirs(out, exist_ok=True)
    for f in glob.glob(out + '/*.jpg'): os.remove(f)
    subprocess.run(['node', 'studio/tools/composite.mjs', 'stills', MAN, i, '--at', ','.join(map(str, ts)), '--aspect', '9x16', '--captions', '--out', out], cwd=ROOT, check=True, capture_output=True)
    fs = sorted(glob.glob(out + '/*.jpg'), key=lambda f: float(os.path.basename(f).rsplit('_t', 1)[-1][:-4]))
    rows.append((i, m.get('fmt', '?'), m['label'], fs[1:])); covers.append((i, m['cover']['text'], fs[0]))
    print(i, ts, [os.path.basename(f) for f in fs])
tw, th = 270, 480
sh = Image.new('RGB', (3 * (tw + 10) + 10, len(rows) * (th + 50) + 10), '#1a1a1a'); dr = ImageDraw.Draw(sh)
for r, (i, fm, lab, fs) in enumerate(rows):
    y = r * (th + 50) + 10; dr.text((10, y + 6), f'{i}  format {fm}  ·  {lab}', fill='#fff', font=font)
    for c, f in enumerate(fs[:3]): sh.paste(Image.open(f).convert('RGB').resize((tw, th)), (10 + c * (tw + 10), y + 40))
# two columns of shorts to keep it compact
cols = 3; per = (len(rows) + cols - 1) // cols; cw = 3 * (tw + 10) + 10
big = Image.new('RGB', (cols * cw, per * (th + 50) + 10), '#1a1a1a')
for k in range(len(rows)): big.paste(sh.crop((0, k * (th + 50), cw, (k + 1) * (th + 50) + 10)), ((k // per) * cw, (k % per) * (th + 50)))
big.save(os.path.join(OUT, 'shorts-formats-v2.jpg'), quality=82)
cw2 = 270 + 10 + 270 * 1 + 20
cv = Image.new('RGB', (len(covers) * 0 + 5 * cw2, ((len(covers) + 4) // 5) * (th + 50) + 10), '#1a1a1a'); dr = ImageDraw.Draw(cv)
for k, (i, txt, f) in enumerate(covers):
    x, y = (k % 5) * cw2 + 10, (k // 5) * (th + 50) + 10; im = Image.open(f).convert('RGB')
    dr.text((x, y + 6), f'{i}  {txt.replace("~", "")}'[:44], fill='#fff', font=ImageFont.truetype('/System/Library/Fonts/Helvetica.ttc', 18))
    cv.paste(im.resize((tw, th)), (x, y + 40)); crop = im.crop((0, 240, 1080, 1680)).resize((270, 360)); cv.paste(crop, (x + tw + 10, y + 40 + 60))
cv.save(os.path.join(OUT, 'covers.jpg'), quality=82)
