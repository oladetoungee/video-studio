# contact sheet: python3 sheet.py out.jpg cols width img1 img2 ...
import sys
from PIL import Image
out, cols, cw = sys.argv[1], int(sys.argv[2]), int(sys.argv[3]); ims = [Image.open(p).convert('RGB') for p in sys.argv[4:]]
cells = [im.resize((cw, int(im.height * cw / im.width))) for im in ims]; rows = [cells[i:i + cols] for i in range(0, len(cells), cols)]
H = sum(max(c.height for c in r) + 8 for r in rows); S = Image.new('RGB', (cols * (cw + 8), H), (40, 40, 40)); y = 0
for r in rows:
    x = 0
    for c in r: S.paste(c, (x, y)); x += cw + 8
    y += max(c.height for c in r) + 8
S.save(out, quality=85)
