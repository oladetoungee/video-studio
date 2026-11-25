# overview.png: one row per direction (4 frames 16:9 + 2 frames 9:16), then the talking-head and short frames
import os
from PIL import Image, ImageDraw, ImageFont
D = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
ROWS = [('A · STAMPED (scholarship passport)', 'A-stamped', ['a1', 'a2', 'a3', 'a4'], ['p1', 'p2']),
        ('B · NOW BOARDING (departures board)', 'B-boarding', ['b1', 'b2', 'b3', 'b4'], ['p1', 'p2']),
        ('C · POSTCARDS (photo-led, Pexels cities)', 'C-postcards', ['c1', 'c2', 'c3', 'c4'], ['p1', 'p2']),
        ('Talking-head frames over her footage (A half-and-half · B board behind her · C city behind her · A receipt) + short SH4 (B)', 'TH', ['th1', 'th2', 'th3', 'th4'], [])]
w, h, g, top = 480, 270, 12, 60; pw = int(h * 9 / 16)
W = 4 * (w + g) + 2 * (pw + g) + g; H = len(ROWS) * (h + top + g) + g
S = Image.new('RGB', (W, H), (24, 24, 24)); d = ImageDraw.Draw(S)
font = ImageFont.truetype(os.path.join(D, '_fonts/DMMono-Medium.ttf'), 26)
y = g
for name, X, land, port in ROWS:
    d.text((g + 4, y + 16), name, fill=(240, 240, 240), font=font); y += top; x = g
    for f in land: S.paste(Image.open(os.path.join(D, X, 'frames', f + '.png')).convert('RGB').resize((w, h), Image.LANCZOS), (x, y)); x += w + g
    if X == 'TH': port = [('SH', 's1'), ('SH', 's2')]
    else: port = [(X, p) for p in port]
    for XX, f in port: S.paste(Image.open(os.path.join(D, XX, 'frames', f + '.png')).convert('RGB').resize((pw, h), Image.LANCZOS), (x, y)); x += pw + g
    y += h + g
S.save(os.path.join(D, 'overview.png'), optimize=True); print(S.size)
