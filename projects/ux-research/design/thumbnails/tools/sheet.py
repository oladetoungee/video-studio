"""Contact sheet of rendered thumbnails: python3 tools/sheet.py OUT.jpg [prefixes...] (640x360 cells, names on top)"""
import sys, glob, os
from PIL import Image, ImageDraw, ImageFont
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__))); O = os.path.join(R, '..', '..', 'outputs', 'thumbnails')
out = sys.argv[1]; only = sys.argv[2:]
fs = [f for f in sorted(glob.glob(os.path.join(O, '[0-9]*.png'))) if not only or any(os.path.basename(f).startswith(o) for o in only)]
W, H, c = 640, 360, 3; s = Image.new('RGB', (W * c, (H + 28) * ((len(fs) + c - 1) // c)), (20, 20, 20)); d = ImageDraw.Draw(s)
f = ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial Bold.ttf', 20)
for i, p in enumerate(fs):
    x, y = (i % c) * W, (i // c) * (H + 28); d.text((x + 6, y + 3), os.path.basename(p)[:-4], font=f, fill='white')
    s.paste(Image.open(p).convert('RGB').resize((W - 6, H - 4)), (x, y + 28))
s.save(out, quality=85)
