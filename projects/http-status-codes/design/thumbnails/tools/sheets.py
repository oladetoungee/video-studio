"""Contact sheets of the rendered thumbnails, 9 per sheet: python3 tools/sheets.py <out-prefix> [prefixes...]"""
import glob, os, sys
from PIL import Image
out = sys.argv[1]; pre = sys.argv[2:]
fs = [f for f in sorted(glob.glob(os.path.join(os.path.dirname(__file__), '../../../outputs/thumbnails/*.png'))) if 'overview' not in f and (not pre or any(os.path.basename(f).startswith(p) for p in pre))]
W, H = 640, 360
for k in range(0, len(fs), 9):
    part = fs[k:k + 9]; rows = (len(part) + 2) // 3
    sh = Image.new('RGB', (3 * W + 20, rows * H + (rows - 1) * 10), 'white')
    for i, f in enumerate(part): sh.paste(Image.open(f).convert('RGB').resize((W, H), Image.LANCZOS), ((i % 3) * (W + 10), (i // 3) * (H + 10)))
    sh.save(f'{out}{k // 9}.jpg', quality=88)
print(len(fs))
