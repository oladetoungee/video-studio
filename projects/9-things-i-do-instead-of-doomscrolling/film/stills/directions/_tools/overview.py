# overview.png: one block per look: the film stills (4 x 16:9 + 2 x 9:16), then the same look around her (talking-head + short)
import os
from PIL import Image, ImageDraw, ImageFont
D = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
LOOKS = [('A · OFFLINE BINGO  (a bingo card is the 1-9 counter)', 'A-bingo', ['a1', 'a2', 'a3', 'a4'], ['p1', 'p2'], [('TH', 'th1'), ('TH', 'fix')], [('SH', 's1')]),
         ('B · JUNK JOURNAL  (a scrapbook page per item)', 'B-journal', ['b1', 'b2', 'b3', 'b4'], ['p1', 'p2'], [('TH', 'th3')], [('SH', 's3')]),
         ('C · THE END  (every item gets the stopping cue a feed never has)', 'C-theend', ['c1', 'c2', 'c3', 'c4'], ['p1', 'p2'], [('TH', 'th2'), ('TH', 'th4')], [('SH', 's2')])]
w, h, g = 480, 270, 14; pw = int(h * 9 / 16); top = 64; sub = 44
W = 4 * (w + g) + 2 * (pw + g) + g + 40
rows_h = sum(top + h + g + sub + h + g for _ in LOOKS)
H = 120 + rows_h + g
S = Image.new('RGB', (W, H), (22, 22, 22)); d = ImageDraw.Draw(S)
F = lambda s: ImageFont.truetype(os.path.join(D, '_fonts/RedHatMono.ttf'), s)
d.text((g + 6, 24), 'Pick ONE look for the whole video.', fill=(255, 255, 255), font=F(44))
d.text((g + 8, 80), 'Each block: the film in that look (top row), then how the same look sits around you in the full edit and a short (bottom row).', fill=(170, 170, 170), font=F(22))
y = 120
def put(X, f, x, y, port=False):
    im = Image.open(os.path.join(D, X, 'frames', f + '.png')).convert('RGB').resize((pw if port else w, h), Image.LANCZOS); S.paste(im, (x, y)); return x + (pw if port else w) + g
for name, X, land, port, th, sh in LOOKS:
    d.text((g + 6, y + 20), name, fill=(240, 240, 240), font=F(30)); y += top; x = g
    for f in land: x = put(X, f, x, y)
    for f in port: x = put(X, f, x, y, True)
    y += h + g; d.text((g + 8, y + 8), 'around you: full edit + short', fill=(150, 150, 150), font=F(22)); y += sub; x = g
    for XX, f in th: x = put(XX, f, x, y)
    for XX, f in sh: x = put(XX, f, x, y, True)
    y += h + g
S.save(os.path.join(D, 'overview.png'), optimize=True); print(S.size)
