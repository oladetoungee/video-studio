# overview.png: "Pick ONE look for the whole video." One row per look: the film frames, then how that look sits around her
# (talking-head edit 16:9 + a short 9:16). Everything in a row is the same look.
import os
from PIL import Image, ImageDraw, ImageFont
D = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
ROWS = [('A · LINE DRAWING (the kodekloud way: one bookshop counter in pen lines, codes travel as tags)', [('A-line', 'a1-get'), ('A-line', 'a3-classes'), ('A-line', 'a4-rfc'), ('TH', 'th1-A-half')], [('A-line', 'p1-get'), ('TH', 'sh8-A-hook')]),
        ('B · THE FIRST DIGIT (the screen is the class colour, numbers roll like an odometer)', [('B-odometer', 'b1-request'), ('B-odometer', 'b4-google'), ('TH', 'th2-B-behind'), ('TH', 'fix-B-correction')], [('B-odometer', 'p1-request'), ('TH', 'sh8-B-hook')]),
        ('C · NOW SERVING (take-a-number tickets, the answer on a dot-matrix board)', [('C-serving', 'c1-hide'), ('C-serving', 'c2-github'), ('C-serving', 'c4-keycard'), ('TH', 'th3-C-receipt')], [('C-serving', 'p1-hide'), ('TH', 'sh8-C-hook')])]
w, h, g, top, head = 480, 270, 10, 46, 70; pw = int(h * 9 / 16)
W = 4 * (w + g) + 2 * (pw + g) + g; H = head + len(ROWS) * (h + top + 34 + g) + g
S = Image.new('RGB', (W, H), (24, 24, 24)); d = ImageDraw.Draw(S)
big = ImageFont.truetype(os.path.join(D, '_fonts/FunnelSans.ttf'), 34); font = ImageFont.truetype(os.path.join(D, '_fonts/FragmentMono-Regular.ttf'), 24); small = ImageFont.truetype(os.path.join(D, '_fonts/FragmentMono-Regular.ttf'), 18)
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
