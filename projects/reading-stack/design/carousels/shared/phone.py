"""Phone-size check: python3 phone.py <dir> <n> <outdir> -> sheets of 3 slides at 390 px wide (real phone width)."""
import sys, os
from PIL import Image
d, n, out = sys.argv[1], int(sys.argv[2]), sys.argv[3]
os.makedirs(out, exist_ok=True)
for start in range(1, n + 1, 3):
    ims = [Image.open(os.path.join(d, f"{i:02d}.png")).convert("RGB") for i in range(start, min(start + 3, n + 1))]
    w = 390; h = round(w * ims[0].height / ims[0].width)
    sheet = Image.new("RGB", (len(ims) * (w + 20), h), (255, 255, 255))
    for k, im in enumerate(ims): sheet.paste(im.resize((w, h), Image.LANCZOS), (k * (w + 20), 0))
    sheet.save(os.path.join(out, f"phone_{start:02d}.png"))
