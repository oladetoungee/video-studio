"""Contact sheets of the rendered thumbnails (review only): python3 tools/sheet.py OUTPREFIX [prefixes...]"""
import sys, glob, os
from PIL import Image, ImageDraw, ImageFont
out = sys.argv[1]; only = sys.argv[2:]
fs = sorted(p for p in glob.glob(os.path.join(os.path.dirname(__file__), '../../../outputs/thumbnails/[0-9]*.png'))
            if not only or any(os.path.basename(p).startswith(o) for o in only))
W, H = 640, 360; f = ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial Bold.ttf', 18)
for k in range(0, len(fs), 6):
    part = fs[k:k + 6]; sh = Image.new('RGB', (W * 2, H * 3), 'black'); d = ImageDraw.Draw(sh)
    for j, p in enumerate(part):
        x, y = (j % 2) * W, (j // 2) * H
        sh.paste(Image.open(p).convert('RGB').resize((W, H), Image.LANCZOS), (x, y))
        d.rectangle([x, y + H - 22, x + 60, y + H], fill='black'); d.text((x + 4, y + H - 21), os.path.basename(p)[:2], font=f, fill='yellow')
    sh.save(f'{out}_{k // 6}.jpg', quality=88); print(f'{out}_{k // 6}.jpg')
