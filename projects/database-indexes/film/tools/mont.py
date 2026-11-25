# montage: python3 mont.py out.jpg cols cellwidth img...  (labels = file names)
import sys, os
from PIL import Image, ImageDraw, ImageFont
out, cols, cw = sys.argv[1], int(sys.argv[2]), int(sys.argv[3]); ims = sys.argv[4:]
f = ImageFont.truetype('/System/Library/Fonts/Menlo.ttc', 18)
first = Image.open(ims[0]); ch = int(cw * first.height / first.width); g = 8; cap = 24
rows = (len(ims) + cols - 1) // cols
sh = Image.new('RGB', (cols * (cw + g) + g, rows * (ch + cap + g) + g), (40, 40, 40)); dr = ImageDraw.Draw(sh)
for i, p in enumerate(ims):
    x = g + (i % cols) * (cw + g); y = g + (i // cols) * (ch + cap + g)
    sh.paste(Image.open(p).convert('RGB').resize((cw, ch)), (x, y)); dr.text((x, y + ch + 3), os.path.basename(p)[:-4], fill=(230, 230, 230), font=f)
sh.save(out, quality=85); print(out, sh.size)
