"""Review sheets for the 2026-11-13 font-board pass: shorts-sheet.jpg (per short: cover + 3 stills + its 3 board format refs) and
covers-sheet.jpg (all covers in a row, full 9:16 + the 3:4 grid crop). Usage: python3 talking-head/tools/fbsheet.py"""
import json, glob, os
from PIL import Image, ImageDraw, ImageFont
ROOT = os.path.dirname(os.path.abspath(__file__)) + '/../..'
m = json.load(open(f'{ROOT}/talking-head/talking-head.json'))
fmts = json.load(open(f'{ROOT}/../../inspiration/short-formats/formats.json')); items = fmts['items'] if isinstance(fmts, dict) else fmts
FR = f'{ROOT}/../../inspiration/short-formats/frames'
S = f'{ROOT}/outputs/_review/fb/shorts'; OUT = f'{ROOT}/outputs/_review/fb'
f = ImageFont.truetype('/System/Library/Fonts/Helvetica.ttc', 22); fb = ImageFont.truetype('/System/Library/Fonts/Helvetica.ttc', 26)
w, h = 216, 384
shorts = [s for s in m['moments'] if s['kind'] == 'short']
sheet = Image.new('RGB', (8 * (w + 6) + 10, len(shorts) * (h + 46) + 10), (40, 40, 40)); d = ImageDraw.Draw(sheet)
covers = Image.new('RGB', (len(shorts) * (w + 6) + 10, 2 * h + 70), (40, 40, 40)); dc = ImageDraw.Draw(covers)
for r, s in enumerate(shorts):
    fs = sorted(glob.glob(f"{S}/short{s['id'][2:]}-*")); y = 10 + r * (h + 46)
    d.text((10, y), f"{s['id']}  fmt {s.get('fmt')}  fonts {'+'.join(s.get('fonts', []))}  colours {s.get('colours')}  board Formats {s.get('board')}  |  cover: {s['cover']['text'].replace(chr(10), ' / ')}", fill='white', font=fb)
    for k, p in enumerate(fs[:4]):
        im = Image.open(p).convert('RGB').resize((w, h)); sheet.paste(im, (10 + k * (w + 6), y + 34))
        if k == 0:
            covers.paste(im, (10 + r * (w + 6), 40)); g = im.crop((0, int(h * 0.125), w, int(h * 0.875))).resize((w, int(w * 4 / 3)))
            covers.paste(g, (10 + r * (w + 6), 50 + h)); dc.text((10 + r * (w + 6), 10), s['id'], fill='white', font=fb)
    for k, n in enumerate(s.get('board', [])):
        it = items[n - 1]; c = sorted(glob.glob(f"{FR}/{it['id']}-*.jpg"))
        if c:
            im = Image.open(c[len(c) // 2]).convert('RGB'); im.thumbnail((w, h)); x = 10 + (4 + k) * (w + 6); sheet.paste(im, (x, y + 34))
            d.rectangle([x, y + 34, x + 130, y + 60], fill='black'); d.text((x + 4, y + 36), f"Formats {n}", fill='yellow', font=f)
sheet.save(f'{OUT}/shorts-sheet.jpg', quality=86); covers.save(f'{OUT}/covers-sheet.jpg', quality=88); print('ok')
