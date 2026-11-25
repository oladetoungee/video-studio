# quick review sheet of frames: python3 peek.py out.jpg f1.png f2.png ...
import sys
from PIL import Image
out, fs = sys.argv[1], sys.argv[2:]; ims = [Image.open(f).convert('RGB') for f in fs]
H = 540; ims = [im.resize((int(im.width * H / im.height), H)) for im in ims]
rows = []; row = []; w = 0
for im in ims:
    if w + im.width > 2000 and row: rows.append(row); row = []; w = 0
    row.append(im); w += im.width + 10
rows.append(row)
S = Image.new('RGB', (max(sum(i.width + 10 for i in r) for r in rows), len(rows) * (H + 10)), (40, 40, 40))
for j, r in enumerate(rows):
    x = 0
    for im in r: S.paste(im, (x, j * (H + 10))); x += im.width + 10
S.save(out, quality=85)
