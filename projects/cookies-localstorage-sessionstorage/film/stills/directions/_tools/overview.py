# overview.png: "Pick ONE look for the whole video." One row per look: film frames, then how the look sits around her.
import os, sys
from PIL import Image, ImageDraw, ImageFont
D = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
REC = sys.argv[1] if len(sys.argv) > 1 else ''
ROWS = [('A', 'A · CRASH TEST: what survives a refresh, a closed tab, a closed browser', [('A-crashtest', 'a3-board', 'film'), ('A-crashtest', 'a7-cloak', 'film'), ('TH', 'th1-A-half', 'talking-head edit'), ('TH', 'th4-A-behind', 'talking-head edit'), ('TH', 'fix-A-correction', 'a correction in the edit')], [('A-crashtest', 'p1-close', 'film 9:16'), ('TH', 'sh6-A-hook', 'short')]),
        ('B', 'B · CLOSE THE TAB: the browser tab is the stage', [('B-tabs', 'b1-chapters', 'film'), ('B-tabs', 'b2-cart', 'film'), ('B-tabs', 'b3-strings', 'film'), ('TH', 'th2-B-behind', 'talking-head edit'), ('B-tabs', 'b5-readers', 'film')], [('B-tabs', 'p1-chapters', 'film 9:16'), ('TH', 'sh6-B-hook', 'short')]),
        ('C', 'C · THE CLOAKROOM: a cookie is your coat tag', [('C-cloakroom', 'c1-photo', 'film'), ('C-cloakroom', 'c2b-cookie', 'film'), ('C-cloakroom', 'c4-server', 'film'), ('TH', 'th3-C-receipt', 'talking-head edit'), ('TH', 'th5-C-tile', 'talking-head edit')], [('C-cloakroom', 'p2-ticket', 'film 9:16'), ('TH', 'sh6-C-hook', 'short')])]
w, h, g, top, head = 480, 270, 12, 50, 84; pw = int(h * 9 / 16)
W = 5 * (w + g) + 2 * (pw + g) + g; H = head + len(ROWS) * (h + top + 36 + g) + g
S = Image.new('RGB', (W, H), (24, 24, 24)); d = ImageDraw.Draw(S)
big = ImageFont.truetype(os.path.join(D, '_fonts/Onest.ttf'), 38); font = ImageFont.truetype(os.path.join(D, '_fonts/Onest.ttf'), 28); small = ImageFont.truetype(os.path.join(D, '_fonts/ChivoMono.ttf'), 18)
d.text((g + 4, 18), 'Pick ONE look for the whole video. Each row is one look: film frames, then how it sits around you (edit + short).', fill=(255, 255, 255), font=big)
y = head
for key, name, land, port in ROWS:
    d.text((g + 4, y + 12), name + ('   (recommended)' if key == REC else ''), fill=(127, 224, 181) if key == REC else (240, 240, 240), font=font); y += top; x = g
    for X, f, lab in land:
        S.paste(Image.open(os.path.join(D, X, 'frames', f + '.png')).convert('RGB').resize((w, h), Image.LANCZOS), (x, y)); d.text((x, y + h + 6), lab, fill=(170, 170, 170), font=small); x += w + g
    for X, f, lab in port:
        S.paste(Image.open(os.path.join(D, X, 'frames', f + '.png')).convert('RGB').resize((pw, h), Image.LANCZOS), (x, y)); d.text((x, y + h + 6), lab, fill=(170, 170, 170), font=small); x += pw + g
    y += h + 36 + g
S.save(os.path.join(D, 'overview.png'), optimize=True); print(S.size)
