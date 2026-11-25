# overview.png: "Pick ONE look for the whole video." One row per look: the film frames, then how that look sits around her
# (talking-head edit 16:9 + a short 9:16). Everything in a row is the same look.
import os
from PIL import Image, ImageDraw, ImageFont
D = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
ROWS = [('A · THE FIELD GUIDE (ochre drawer, pinned specimens)', [('A-guide', 'a1-confirm'), ('A-guide', 'a2-roach'), ('A-guide', 'a4-survey'), ('TH', 'th1-A-window')], [('A-guide', 'p1-confirm'), ('TH', 'sh9-A-hook')]),
        ('B · VERSION A / VERSION B (the split)', [('B-split', 'b1-basket'), ('B-split', 'b3-abtest'), ('B-split', 'b4-law'), ('TH', 'th2-B-half')], [('B-split', 'p1-open'), ('TH', 'sh9-B-hook')]),
        ('C · BLOWN UP (pink, the lens)  — recommended', [('C-zoom', 'c1-lens'), ('C-zoom', 'c6-ftc'), ('TH', 'th3-C-behind'), ('TH', 'fix-C-correction')], [('C-zoom', 'p1-lens'), ('TH', 'sh9-C-hook')])]
w, h, g, top, head = 480, 270, 10, 46, 70; pw = int(h * 9 / 16)
W = 4 * (w + g) + 2 * (pw + g) + g; H = head + len(ROWS) * (h + top + 34 + g) + g
S = Image.new('RGB', (W, H), (24, 24, 24)); d = ImageDraw.Draw(S)
big = ImageFont.truetype(os.path.join(D, '_fonts/Geist.ttf'), 34); font = ImageFont.truetype(os.path.join(D, '_fonts/GeistMono.ttf'), 24); small = ImageFont.truetype(os.path.join(D, '_fonts/GeistMono.ttf'), 18)
d.text((g + 4, 16), 'Pick ONE look for the whole video. Each row is one look: film frames, then how it sits around you.', fill=(255, 255, 255), font=big)
y = head
for name, land, port in ROWS:
    d.text((g + 4, y + 12), name, fill=(240, 240, 240), font=font); y += top; x = g
    for i, (X, f) in enumerate(land):
        S.paste(Image.open(os.path.join(D, X, 'frames', f + '.png')).convert('RGB').resize((w, h), Image.LANCZOS), (x, y))
        d.text((x, y + h + 6), 'talking-head edit' if X == 'TH' and not f.startswith('fix') else ('a correction in the edit' if f.startswith('fix') else 'film'), fill=(170, 170, 170), font=small); x += w + g
    for X, f in port:
        S.paste(Image.open(os.path.join(D, X, 'frames', f + '.png')).convert('RGB').resize((pw, h), Image.LANCZOS), (x, y))
        d.text((x, y + h + 6), 'short' if X == 'TH' else 'film 9:16', fill=(170, 170, 170), font=small); x += pw + g
    y += h + 34 + g
S.save(os.path.join(D, 'overview.png'), optimize=True); print(S.size)
