# overview.jpg: one row per direction (6 frames 16:9 + 2 frames 9:16)
import os
from PIL import Image, ImageDraw, ImageFont
D = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
ROWS = [('A · THE MONTH', 'A-month', ['a1-open', 'a4-before', 'a5-fix', 'a6-env', 'a7-zeabur', 'a8-four'], ['p1-open', 'p2-zeabur-src']),
        ('B · THE KEY BOARD', 'B-keys', ['b1-open', 'b4-before', 'b5-fix', 'b6-env', 'b7-zeabur', 'b8-four'], ['p1-open', 'p2-zeabur-src']),
        ('C · THE STATUS PAGE', 'C-status', ['c1-open', 'c4-before', 'c5-fix', 'c6-env', 'c7-zeabur', 'c8-four'], ['p1-open', 'p2-zeabur-src'])]
w, h, g, top = 480, 270, 10, 64; pw = int(h * 9 / 16)
W = 6 * (w + g) + 2 * (pw + g) + g; H = len(ROWS) * (h + top + g) + g
S = Image.new('RGB', (W, H), (24, 24, 24)); d = ImageDraw.Draw(S)
try: font = ImageFont.truetype(os.path.join(D, '_fonts/RedHatMono-VF.ttf'), 34)
except Exception: font = None
y = g
for name, X, land, port in ROWS:
    d.text((g + 4, y + 12), name, fill=(240, 240, 240), font=font); y += top; x = g
    for f in land: S.paste(Image.open(os.path.join(D, X, 'frames', f + '.png')).convert('RGB').resize((w, h), Image.LANCZOS), (x, y)); x += w + g
    for f in port: S.paste(Image.open(os.path.join(D, X, 'frames', f + '.png')).convert('RGB').resize((pw, h), Image.LANCZOS), (x, y)); x += pw + g
    y += h + g
S.save(os.path.join(D, 'overview.jpg'), quality=88); print(S.size)
