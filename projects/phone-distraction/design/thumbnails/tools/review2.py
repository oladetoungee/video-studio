"""v2 review sheets: her database-indexes thumbnail next to every option, at 640 and 320 px wide.
  python3 tools/review2.py  -> review/v2_640.jpg, review/v2_320.jpg"""
from PIL import Image, ImageDraw
import glob, os
T = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
P = os.path.dirname(os.path.dirname(T)); V = os.path.dirname(os.path.dirname(P))
her = os.path.join(V, 'inspiration/youtube-thumbnail/her-own/database-indexes_her-thumbnail.png')
fs = [her] + sorted(glob.glob(os.path.join(P, 'outputs/thumbnails/[0-9][0-9]-*.png')))
for w in (640, 320):
    h = w * 9 // 16; cols = 4 if w == 320 else 3; pad = 12
    rows = (len(fs) + cols - 1) // cols
    sh = Image.new('RGB', (cols * (w + pad) + pad, rows * (h + 34) + pad), (40, 40, 44)); d = ImageDraw.Draw(sh)
    for i, f in enumerate(fs):
        x, y = pad + (i % cols) * (w + pad), pad + (i // cols) * (h + 34)
        sh.paste(Image.open(f).convert('RGB').resize((w, h), Image.LANCZOS), (x, y))
        d.text((x, y + h + 6), 'HER BAR' if i == 0 else os.path.basename(f), fill='white')
    os.makedirs(os.path.join(T, 'review'), exist_ok=True)
    sh.save(os.path.join(T, f'review/v2_{w}.jpg'), quality=88)
print('ok')
