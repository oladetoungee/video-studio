# python3 sheet.py out.png cols width img1 img2 ...  (quick look sheet)
import sys
from PIL import Image
out, cols, w = sys.argv[1], int(sys.argv[2]), int(sys.argv[3]); ims = [Image.open(f).convert('RGB') for f in sys.argv[4:]]
th = [int(w * i.height / i.width) for i in ims]; rows = (len(ims) + cols - 1) // cols
rh = [max(th[r * cols:(r + 1) * cols]) for r in range(rows)]
S = Image.new('RGB', (cols * (w + 8) + 8, sum(rh) + 8 * (rows + 1)), (60, 60, 60)); y = 8
for r in range(rows):
    for c in range(cols):
        i = r * cols + c
        if i < len(ims): S.paste(ims[i].resize((w, th[i]), Image.LANCZOS), (8 + c * (w + 8), y))
    y += rh[r] + 8
S.save(out)
