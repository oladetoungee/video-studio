# Review sheet: every thumbnail beside the board item it copies -> outputs/_review/thumbnails-vs-board.jpg
#   python3 tools/vs_board.py [out.jpg]
import json, os, sys
from PIL import Image, ImageDraw, ImageFont
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PROJ = os.path.dirname(os.path.dirname(ROOT)); VID = os.path.dirname(os.path.dirname(PROJ))
B = json.load(open(os.path.join(VID, 'inspiration/boards/thumbnails/board.json')))
img = {i['id']: os.path.join(VID, 'inspiration/boards/thumbnails/img', i['img']) for i in B['items']}
dirs = sorted(d for d in os.listdir(os.path.join(ROOT, 'directions')) if os.path.exists(os.path.join(ROOT, 'directions', d, 'content.json')))
W, H, PAD, LAB = 640, 360, 16, 34
sh = Image.new('RGB', (2 * W + 3 * PAD, len(dirs) * (H + LAB + PAD) + PAD), '#111')
d = ImageDraw.Draw(sh)
try: f = ImageFont.truetype('/System/Library/Fonts/Helvetica.ttc', 24)
except Exception: f = None
for k, n in enumerate(dirs):
    c = json.load(open(os.path.join(ROOT, 'directions', n, 'content.json')))
    y = PAD + k * (H + LAB + PAD)
    ref = Image.open(img[c['board']]).convert('RGB'); ref.thumbnail((W, H))
    sh.paste(ref, (PAD + (W - ref.width) // 2, y + LAB + (H - ref.height) // 2))
    th = Image.open(os.path.join(PROJ, 'outputs/thumbnails', n + '.png')).convert('RGB').resize((W, H), Image.LANCZOS)
    sh.paste(th, (2 * PAD + W, y + LAB))
    d.text((PAD, y + 4), 'board ' + c['board'], fill='#FFD23F', font=f); d.text((2 * PAD + W, y + 4), n, fill='#fff', font=f)
out = sys.argv[1] if len(sys.argv) > 1 else os.path.join(PROJ, 'outputs/_review/thumbnails-vs-board.jpg')
sh.save(out, quality=82); print(out, sh.size)
