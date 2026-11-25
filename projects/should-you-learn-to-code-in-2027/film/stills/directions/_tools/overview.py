# overview.png, grouped by look (her rule 2026-11-02: one question, "which look for the whole video?").
# Per look: row 1 = the film's own frames (16:9 + 9:16); row 2 = the same look around HER (talking-head frames + a short).
import os
from PIL import Image, ImageDraw, ImageFont
D = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
TH, SH = 'talking-head/frames/', 'shorts/frames/'
TH = 'talking-head/frames/'
LOOKS = [
 ('B · YOU ARE THE REVIEWER  (AI writes the code, you review it)   [recommended]',
  [('B-review/frames/b5', 0), ('B-review/frames/b6', 0), ('B-review/frames/b2', 0), ('B-review/frames/b7', 0), ('B-review/frames/p1', 1), ('B-review/frames/p2', 1)],
  [(TH + 'th3-B-screen-behind_raw175.3', 0), (TH + 'th5-B-plan-on-wall_raw333.3', 0), ('B-review/frames/b8', 0), (TH + 's4-B-SH1-receipt_raw22.6', 1), (TH + 's3-B-SH4-half_raw181.3', 1)]),
 ('A · THE MISSING RUNG  (the career ladder: junior rung gone, four new rungs)',
  [('A-rungs/frames/a1', 0), ('A-rungs/frames/a2', 0), ('A-rungs/frames/a3', 0), ('A-rungs/frames/a4', 0), ('A-rungs/frames/p1', 1), ('A-rungs/frames/p2', 1)],
  [(TH + 'th1-A-half-ladder_raw29.6', 0), (TH + 'th2-A-receipt-over-her_raw22.6', 0), ('A-rungs/frames/a5', 0), (TH + 's1-A-SH1-hook_raw8.0', 1), (TH + 's2-A-SH1-receipt_raw22.6', 1)]),
 ('C · THE NEW SYLLABUS  (a school exercise book: old way struck out, four skills ticked)',
  [('C-syllabus/frames/c1', 0), ('C-syllabus/frames/c2', 0), ('C-syllabus/frames/c3', 0), ('C-syllabus/frames/c4', 0), ('C-syllabus/frames/p1', 1), ('C-syllabus/frames/p2', 1)],
  [(TH + 'th4-C-words-on-wall_raw333.3', 0)]),
]
w, h, g = 560, 315, 12; pw = int(h * 9 / 16); top, sub, head = 70, 40, 170
W = 4 * (w + g) + 2 * (pw + g) + g + 40
H = head + len(LOOKS) * (top + 2 * (h + sub + g) + 30)
S = Image.new('RGB', (W, H), (22, 22, 22)); d = ImageDraw.Draw(S)
F = lambda s: ImageFont.truetype(os.path.join(D, '_fonts/AzeretMono.ttf'), s)
d.text((g + 8, 24), 'Pick ONE look for the whole video (film, talking-head edit, shorts, teaser).', fill=(255, 255, 255), font=F(44))
d.text((g + 8, 84), 'Row 1 of each look = the motion graphics. Row 2 = the same look around you (your real footage, a short).', fill=(190, 190, 190), font=F(26))
d.text((g + 8, 118), 'Combination idea: B for the whole video, with A\'s missing-rung ladder redrawn in B\'s colours for the 4.5% part only.', fill=(190, 190, 190), font=F(26))
y = head
for name, row1, row2 in LOOKS:
    d.text((g + 8, y + 16), name, fill=(240, 240, 240), font=F(38)); y += top
    for label, row in (('the film', row1), ('around you', row2)):
        d.text((g + 8, y), label, fill=(150, 150, 150), font=F(24)); y += sub; x = g
        for f, port in row:
            im = Image.open(os.path.join(D, f + '.png')).convert('RGB').resize(((pw if port else w), h), Image.LANCZOS); S.paste(im, (x, y)); x += (pw if port else w) + g
        y += h + g
    y += 30
S.save(os.path.join(D, 'overview.png'), optimize=True); print(S.size)
