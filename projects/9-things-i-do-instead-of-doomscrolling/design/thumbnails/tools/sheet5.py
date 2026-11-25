"""Sheets for set 5 (reads directions/index.json, so other PNGs in outputs/thumbnails are left out).
  python3 tools/sheet5.py big OUT.jpg         -> 640x360 tiles, 2 columns
  python3 tools/sheet5.py small OUT.jpg       -> 320x180 tiles + layout census line (content.json 'census')
  python3 tools/sheet5.py board OUT.jpg       -> each thumbnail beside the board item it copies (content.json 'board')"""
import sys, json, os, re
from PIL import Image, ImageDraw, ImageFont
H = os.path.dirname(os.path.dirname(os.path.abspath(__file__))); V = os.path.abspath(os.path.join(H, '../../../..'))
mode, out = sys.argv[1], sys.argv[2]
dirs = json.load(open(os.path.join(H, 'directions/index.json')))
F = lambda s: ImageFont.truetype('/System/Library/Fonts/Helvetica.ttc', s)
png = lambda d: Image.open(os.path.join(H, '../../outputs/thumbnails', d + '.png')).convert('RGB')
meta = {d: json.load(open(os.path.join(H, 'directions', d, 'content.json'))) for d in dirs}
board = json.load(open(os.path.join(V, 'inspiration/boards/thumbnails/board.json')))['items']
if mode == 'big':
    W, Hh, c = 640, 360, 2; r = (len(dirs) + 1) // 2; sh = Image.new('RGB', (c * (W + 10), r * (Hh + 40)), 'white'); dr = ImageDraw.Draw(sh)
    for i, d in enumerate(dirs):
        x, y = (i % c) * (W + 10), (i // c) * (Hh + 40); sh.paste(png(d).resize((W, Hh), Image.LANCZOS), (x, y)); dr.text((x, y + Hh + 6), d, fill='black', font=F(22))
elif mode == 'small':
    W, Hh, c = 320, 180, 4; r = (len(dirs) + 3) // 4; sh = Image.new('RGB', (c * (W + 12), r * (Hh + 34) + 60), 'white'); dr = ImageDraw.Draw(sh)
    n = 0
    for i, d in enumerate(dirs):
        x, y = (i % c) * (W + 12), (i // c) * (Hh + 34); sh.paste(png(d).resize((W, Hh), Image.LANCZOS), (x, y))
        cen = meta[d].get('census', ''); n += cen == 'words left / her right'
        dr.text((x, y + Hh + 4), f"{d[:2]} {cen}", fill='red' if cen == 'words left / her right' else 'black', font=F(16))
    dr.text((10, r * (Hh + 34) + 14), f"layout census at 320 px: words/card left + her right = {n} of {len(dirs)} (max 2)", fill='black', font=F(24))
else:
    W, Hh = 560, 315; sh = Image.new('RGB', (2 * (W + 10) + 20, len(dirs) * (Hh + 40)), 'white'); dr = ImageDraw.Draw(sh)
    for i, d in enumerate(dirs):
        y = i * (Hh + 40); m = re.search(r'Thumbnails (\d+)', meta[d]['board']); n = int(m.group(1)); it = board[n - 1]
        ref = Image.open(os.path.join(V, 'inspiration/boards/thumbnails/img', it['img'])).convert('RGB'); ref.thumbnail((W, Hh))
        sh.paste(ref, (0, y)); sh.paste(png(d).resize((W, Hh), Image.LANCZOS), (W + 30, y))
        dr.text((0, y + Hh + 6), f"Thumbnails {n} ({it['id']})", fill='black', font=F(20)); dr.text((W + 30, y + Hh + 6), d, fill='black', font=F(20))
sh.save(out, quality=88); print(out)
