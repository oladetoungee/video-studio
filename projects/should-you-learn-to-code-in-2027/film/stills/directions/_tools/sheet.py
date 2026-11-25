# quick look sheet: python3 _tools/sheet.py out.jpg img1 img2 ... (each scaled to 640 high-ish)
import sys
from PIL import Image
out, fs = sys.argv[1], sys.argv[2:]
ims = [Image.open(f).convert('RGB') for f in fs]
h = 540; ims = [i.resize((int(i.width * h / i.height), h)) for i in ims]
cols = 3 if len(ims) > 4 else 2; rows = [ims[i:i + cols] for i in range(0, len(ims), cols)]
W = max(sum(i.width for i in r) + 10 * len(r) for r in rows); S = Image.new('RGB', (W, len(rows) * (h + 10)), (60, 60, 60))
for ri, r in enumerate(rows):
    x = 0
    for i in r: S.paste(i, (x, ri * (h + 10))); x += i.width + 10
S.save(out, quality=88)
