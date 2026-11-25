# overview.png: "Pick ONE look for the whole video." One row per look: film frames, then how that look sits around her
# (talking-head edit 16:9 + a short 9:16). Everything in a row is the same look.
import os, sys
from PIL import Image, ImageDraw, ImageFont
D = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
REC = sys.argv[1] if len(sys.argv) > 1 else ''
ROWS = [('A', 'A · HERE BE EDGE CASES (the edge of the map)', [('A-map', 'a1-open'), ('A-map', 'a3-null'), ('A-map', 'a4-leap'), ('TH', 'th1-A-half'), ('TH', 'th4-A-window')], [('A-map', 'p1-open'), ('TH', 'sh6-A')]),
        ('B', 'B · THE FIELD (one giant form on lime)', [('B-field', 'b1-click'), ('B-field', 'b3-null'), ('B-field', 'b5-leap'), ('TH', 'th2-B-receipt'), ('B-field', 'fix-B-correction')], [('B-field', 'p1-null'), ('TH', 'sh6-B')]),
        ('C', 'C · THE PLATE PRESS (every edge case stamped into a plate)', [('C-plate', 'c1-null'), ('C-plate', 'c3-leap'), ('C-plate', 'c4-dst'), ('TH', 'th3-C-behind'), ('TH', 'fix-correction')], [('C-plate', 'p1-null'), ('TH', 'sh6-C')])]
w, h, g, top, head = 480, 270, 10, 46, 70; pw = int(h * 9 / 16)
W = 5 * (w + g) + 2 * (pw + g) + g; H = head + len(ROWS) * (h + top + 34 + g) + g
S = Image.new('RGB', (W, H), (24, 24, 24)); d = ImageDraw.Draw(S)
F = os.path.join(D, '_fonts')
big = ImageFont.truetype(os.path.join(F, 'Onest-800.ttf'), 34); font = ImageFont.truetype(os.path.join(F, 'JBMono-800.ttf'), 24); small = ImageFont.truetype(os.path.join(F, 'JBMono-500.ttf'), 18)
d.text((g + 4, 16), 'Pick ONE look for the whole video. Each row is one look: film frames, then how it sits around you.', fill=(255, 255, 255), font=big)
y = head
for key, name, land, port in ROWS:
    d.text((g + 4, y + 12), name + ('   (recommended)' if key == REC else ''), fill=(240, 240, 240), font=font); y += top; x = g
    for X, f in land:
        S.paste(Image.open(os.path.join(D, X, 'frames', f + '.png')).convert('RGB').resize((w, h), Image.LANCZOS), (x, y))
        lab = 'a correction in the edit' if f.startswith('fix') else ('talking-head edit' if X == 'TH' else 'film')
        d.text((x, y + h + 6), lab, fill=(170, 170, 170), font=small); x += w + g
    for X, f in port:
        S.paste(Image.open(os.path.join(D, X, 'frames', f + '.png')).convert('RGB').resize((pw, h), Image.LANCZOS), (x, y))
        d.text((x, y + h + 6), 'short' if X == 'TH' else 'film 9:16', fill=(170, 170, 170), font=small); x += pw + g
    y += h + 34 + g
S.save(os.path.join(D, 'overview.png'), optimize=True); print(S.size)
