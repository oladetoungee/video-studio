#!/usr/bin/env python3
"""YouTube home-feed cards (thumbnail + bold title under it), for cold critics and review sheets.
   python3 tools/cards.py spec.json out.jpg
spec.json = {"cols": 3, "cards": [{"img": "path.png", "title": "...", "label": "A", "note": "optional line", "side": "optional ref.png"}]}
With "side", each card shows the reference (e.g. the pick it copies) small beside it."""
import json, sys, textwrap
from PIL import Image, ImageDraw, ImageFont
spec = json.load(open(sys.argv[1])); out = sys.argv[2]
cols = spec.get('cols', 3); cards = spec['cards']
TW, TH = 560, 315
side = any('side' in c for c in cards)
SW = 300 if side else 0
CW = TW + (SW + 16 if side else 0)
CH = TH + 132
def font(sz, bold=True):
    for p in ['/System/Library/Fonts/Supplemental/Arial Bold.ttf' if bold else '/System/Library/Fonts/Supplemental/Arial.ttf', '/System/Library/Fonts/Helvetica.ttc']:
        try: return ImageFont.truetype(p, sz)
        except Exception: pass
    return ImageFont.load_default()
fT, fL, fN = font(25), font(22), font(19, False)
rows = (len(cards) + cols - 1) // cols
sh = Image.new('RGB', (cols * (CW + 28) + 28, rows * (CH + 24) + 24), '#FFFFFF')
d = ImageDraw.Draw(sh)
for k, c in enumerate(cards):
    x = 28 + (k % cols) * (CW + 28); y = 24 + (k // cols) * (CH + 24)
    im = Image.open(c['img']).convert('RGB')
    if im.size[0] / im.size[1] > 1.7: im = im.resize((TW, TH), Image.LANCZOS)
    else:  # a board screenshot (thumbnail + its title): keep the thumbnail part only
        w, h = im.size; im = im.crop((0, 0, w, int(w * 9 / 16))).resize((TW, TH), Image.LANCZOS)
    mask = Image.new('L', (TW, TH), 0); ImageDraw.Draw(mask).rounded_rectangle((0, 0, TW, TH), 14, fill=255)
    sh.paste(im, (x, y), mask)
    if c.get('label'):
        d.rounded_rectangle((x + 8, y + TH - 42, x + 8 + 14 * len(c['label']) + 20, y + TH - 10), 6, fill='#000000')
        d.text((x + 18, y + TH - 39), c['label'], fill='#FFFFFF', font=fL)
    ty = y + TH + 12
    for line in textwrap.wrap(c.get('title', ''), 42)[:2]:
        d.text((x + 2, ty), line, fill='#0F0F0F', font=fT); ty += 31
    if c.get('note'): d.text((x + 2, ty + 4), c['note'], fill='#606060', font=fN)
    if side and c.get('side'):
        r = Image.open(c['side']).convert('RGB'); r.thumbnail((SW, 260))
        d.text((x + TW + 16, y), 'copies', fill='#606060', font=fN)
        sh.paste(r, (x + TW + 16, y + 26))
sh.save(out, quality=86); print(out, sh.size)
