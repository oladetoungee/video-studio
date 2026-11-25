# overview.png grouped by look: per look, its film stills (4 x 16:9 + 2 x 9:16), then how it sits around her (talking-head / short frames)
import os
from PIL import Image, ImageDraw, ImageFont
D = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
LOOKS = [('A · THE MARGIN: the real paper, highlighter + blue pen   (critic 7.8-8.0, RECOMMENDED)', 'A-margin', ['a1', 'a2', 'a3', 'a4'], ['p1', 'p2'], [('TH', 'th1'), ('TH', 'th4')], [('SH', 's1'), ('SH', 's2')]),
         ('B · TYPESET: the video is laid out like a paper   (critic 7.3)', 'B-typeset', ['b1', 'b2', 'b3', 'b4'], ['p1', 'p2'], [('TH', 'th2')], []),
         ('C · COPY ROOM: photocopier, scan bar, one green   (critic 6.5-6.8)', 'C-copyroom', ['c1', 'c2', 'c3', 'c4'], ['p1', 'p2'], [('TH', 'th3')], [])]
w, h, g = 480, 270, 14; pw = int(h * 9 / 16); top = 56; sub = 40
W = 4 * (w + g) + 2 * (pw + g) + g + 20
f1 = ImageFont.truetype(os.path.join(D, '_fonts/DMMono-Medium.ttf'), 30); f2 = ImageFont.truetype(os.path.join(D, '_fonts/DMMono-Medium.ttf'), 22)
H = 110 + sum(top + h + g + sub + h + g + 20 for _ in LOOKS)
S = Image.new('RGB', (W, H), (22, 22, 24)); d = ImageDraw.Draw(S)
d.text((g + 4, 24), 'how-to-read-research-papers · Pick ONE look for the whole video (film, full edit, shorts, teaser)', fill=(255, 255, 255), font=f1)
d.text((g + 4, 66), 'The frames with her only show how each look sits around her; the look is what you choose.', fill=(170, 170, 170), font=f2)
y = 110
def paste(X, f, x, y, ww, hh): S.paste(Image.open(os.path.join(D, X, 'frames', f + '.png')).convert('RGB').resize((ww, hh), Image.LANCZOS), (x, y))
for name, X, land, port, th, sh in LOOKS:
    d.rectangle([g - 6, y - 4, W - g + 6, y + top + h + g + sub + h + g + 10], outline=(70, 70, 76), width=2)
    d.text((g + 6, y + 12), name, fill=(240, 240, 240), font=f1); y += top; x = g + 4
    for f in land: paste(X, f, x, y, w, h); x += w + g
    for f in port: paste(X, f, x, y, pw, h); x += pw + g
    y += h + g; d.text((g + 6, y + 6), 'around her: talking-head edit' + (' + short SH7' if sh else ''), fill=(170, 170, 170), font=f2); y += sub; x = g + 4
    for XX, f in th: paste(XX, f, x, y, w, h); x += w + g
    for XX, f in sh: paste(XX, f, x, y, pw, h); x += pw + g
    y += h + g + 20
S.save(os.path.join(D, 'overview.png'), optimize=True); print(S.size)
