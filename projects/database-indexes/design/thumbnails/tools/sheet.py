"""Contact sheets of the rendered thumbnails: python3 tools/sheet.py OUTDIR [prefix...]  (6 per sheet at 640x360)"""
import sys, os, glob
from PIL import Image, ImageDraw
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
out = sys.argv[1]; only = sys.argv[2:]
fs = [f for f in sorted(glob.glob(os.path.join(ROOT, '../../outputs/thumbnails/*.png'))) if 'overview' not in f and (not only or any(os.path.basename(f).startswith(o) for o in only))]
for k in range(0, len(fs), 6):
    sh = Image.new('RGB', (1300, 3 * 385), (30, 30, 30)); d = ImageDraw.Draw(sh)
    for i, f in enumerate(fs[k:k + 6]):
        x, y = (i % 2) * 650, (i // 2) * 385
        sh.paste(Image.open(f).convert('RGB').resize((640, 360), Image.LANCZOS), (x, y + 20)); d.text((x + 4, y + 4), os.path.basename(f), fill='yellow')
    sh.save(os.path.join(out, f'th{k // 6}.jpg'), quality=88)
