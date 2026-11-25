# overview.png: one block per look (its 4 frames 16:9 + 2 frames 9:16, then how it sits around her: talking-head and short frames)
import os
from PIL import Image, ImageDraw, ImageFont
D = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
LOOKS = [('A · PRICE CHECK: every country is a supermarket shelf label (recommended, critic 7.5)', 'A-price', ['a1', 'a2', 'a3', 'a4'], ['p1', 'p2'], [('TH', 'th1'), ('TH', 'th4')], [('SH', 's1'), ('SH', 's2')]),
         ('B · DO THE MATH: a desk calculator adds tuition + proof of funds (6.9)', 'B-math', ['b1', 'b2', 'b3', 'b4'], ['p1', 'p2'], [('TH', 'th2')], []),
         ('C · THE HEIGHT CHART: each country measured against a euro scale (5.8)', 'C-lineup', ['c1', 'c2', 'c3', 'c4'], ['p1', 'p2'], [('TH', 'th3')], [])]
w, h, g = 480, 270, 12; pw = int(h * 9 / 16)
W = 4 * (w + g) + 2 * (pw + g) + g
font = ImageFont.truetype(os.path.join(D, '_fonts/DMMono-Medium.ttf'), 28); small = ImageFont.truetype(os.path.join(D, '_fonts/DMMono-Medium.ttf'), 20)
H = 90 + sum(60 + h + g + 34 + h + g + 20 for _ in LOOKS)
S = Image.new('RGB', (W, H), (24, 24, 24)); d = ImageDraw.Draw(S)
d.text((g + 4, 26), 'Pick ONE look for the whole video. The frames over your footage only show how each look sits around you.', fill=(255, 214, 10), font=font)
y = 90
def paste(X, f, x, y, port=False):
    S.paste(Image.open(os.path.join(D, X, 'frames', f + '.png')).convert('RGB').resize(((pw if port else w), h), Image.LANCZOS), (x, y))
for name, X, land, port, th, sh in LOOKS:
    d.text((g + 4, y + 16), name, fill=(240, 240, 240), font=font); y += 60; x = g
    for f in land: paste(X, f, x, y); x += w + g
    for f in port: paste(X, f, x, y, True); x += pw + g
    y += h + g; d.text((g + 4, y + 4), 'around you, in this look: talking-head frames' + (' + one short (SH2 Germany)' if sh else ''), fill=(170, 170, 170), font=small); y += 34; x = g
    for XX, f in th: paste(XX, f, x, y); x += w + g
    for XX, f in sh: paste(XX, f, x, y, True); x += pw + g
    y += h + g + 20
S.save(os.path.join(D, 'overview.png'), optimize=True); print(S.size)
