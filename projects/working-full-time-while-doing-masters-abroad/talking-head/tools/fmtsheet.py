#!/usr/bin/env python3
"""Review sheets for the shorts (2026-11-10): python3 tools/fmtsheet.py
   outputs/_review/shorts-formats-v2.jpg = 3 stills per short (2.5 s / middle / end) with its format letter;
   outputs/_review/covers.jpg = each cover (t 0.05) full 9:16 + its 3:4 grid crop (y 240-1680).
   Stills come from composite.mjs stills ... --at 0.05,2.5,<mid>,<end> --out outputs/_review/v2 --prefix shNN_"""
import glob, json, os
from PIL import Image, ImageDraw, ImageFont
HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__))); R = os.path.join(HERE, '..', 'outputs', '_review')
man = json.load(open(os.path.join(HERE, 'talking-head.json'))); sh = [m for m in man['moments'] if m.get('kind') == 'short']
font = ImageFont.truetype('/System/Library/Fonts/HelveticaNeue.ttc', 34, index=1); small = ImageFont.truetype('/System/Library/Fonts/HelveticaNeue.ttc', 22, index=0)
w, h = 216, 384; cols = 2; cw = 3 * w + 2 * 6 + 70
rows = (len(sh) + cols - 1) // cols
S = Image.new('RGB', (cols * cw + 40, rows * (h + 50) + 30), '#1B1C1F'); d = ImageDraw.Draw(S)
for i, m in enumerate(sh):
    fs = sorted(glob.glob(os.path.join(R, 'v2', m['id'] + '_*.jpg')))[1:4]; x0 = 20 + (i % cols) * cw; y0 = 20 + (i // cols) * (h + 50)
    d.text((x0, y0), m['id'] + '  ' + m.get('fmt', 'E'), font=font, fill='#F3EE2E'); d.text((x0 + 150, y0 + 8), m['slug'], font=small, fill='#FBFAF4')
    for k, f in enumerate(fs): S.paste(Image.open(f).convert('RGB').resize((w, h), Image.LANCZOS), (x0 + k * (w + 6), y0 + 44))
S.save(os.path.join(R, 'shorts-formats-v2.jpg'), quality=86)
cw2 = w + 6 + w; cols2 = 4; rows2 = (len(sh) + cols2 - 1) // cols2
C = Image.new('RGB', (cols2 * (cw2 + 30) + 20, rows2 * (h + 50) + 30), '#1B1C1F'); d = ImageDraw.Draw(C)
for i, m in enumerate(sh):
    f = sorted(glob.glob(os.path.join(R, 'v2', m['id'] + '_*t000.05.jpg')))
    if not f: continue
    im = Image.open(f[0]).convert('RGB'); x0 = 20 + (i % cols2) * (cw2 + 30); y0 = 20 + (i // cols2) * (h + 50)
    d.text((x0, y0), m['id'] + ' ' + m['cover'].get('style', 'photo'), font=small, fill='#F3EE2E')
    C.paste(im.resize((w, h), Image.LANCZOS), (x0, y0 + 32))
    cr = im.crop((0, 240, 1080, 1680)).resize((w, int(w * 1440 / 1080)), Image.LANCZOS); C.paste(cr, (x0 + w + 6, y0 + 32 + (h - cr.size[1]) // 2))
C.save(os.path.join(R, 'covers.jpg'), quality=86)
print('ok')
