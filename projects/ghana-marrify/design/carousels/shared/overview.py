"""Contact sheet of a rendered carousel: python3 overview.py <dir> <n>  ->  <dir>/overview.png"""
import sys, os, math
from PIL import Image

d, n = sys.argv[1], int(sys.argv[2])
ims = [Image.open(os.path.join(d, f"{i:02d}.png")).convert("RGB") for i in range(1, n + 1)]
w0, h0 = ims[0].size
cols = 5 if n > 9 else 3
rows = math.ceil(n / cols)
tw = 400 if cols == 3 else 340
th = round(tw * h0 / w0)
gap = 28
sheet = Image.new("RGB", (cols * tw + (cols + 1) * gap, rows * th + (rows + 1) * gap), (42, 42, 46))
for i, im in enumerate(ims):
    r, c = divmod(i, cols)
    sheet.paste(im.resize((tw, th), Image.LANCZOS), (gap + c * (tw + gap), gap + r * (th + gap)))
sheet.save(os.path.join(d, "overview.png"), optimize=True)
