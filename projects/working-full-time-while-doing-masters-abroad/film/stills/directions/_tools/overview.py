# overview.png, grouped by look (her rule 2026-11-02: one question, "which look for the whole video?").
# Per look: row 1 = the film's own frames (16:9 + 9:16); row 2 = the same look around HER (talking-head frames + a short).
import os
from PIL import Image, ImageDraw, ImageFont
D = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
TH, SH = 'talking-head/frames/', 'shorts/frames/'
LOOKS = [
 ('A · ONE 24 HOURS  (the day as one dial)',
  [('A-day/frames/a1', 0), ('A-day/frames/a2', 0), ('A-day/frames/a3', 0), ('A-day/frames/a4', 0), ('A-day/frames/p1', 1), ('A-day/frames/p2', 1)],
  [(TH + 'th1-A-behind-her_raw330', 0), (TH + 'th2-A-split-dial_raw241', 0), (SH + 's1-SH7-graphic-over-her', 1), (SH + 's2-SH7-phrase-card', 1)]),
 ('B · CLOCK IN / CLOCK OUT  (her week as a time card)   [recommended]',
  [('B-timecard/frames/b1', 0), ('B-timecard/frames/b2', 0), ('B-timecard/frames/b3', 0), ('B-timecard/frames/b4', 0), ('B-timecard/frames/p1', 1), ('B-timecard/frames/p2', 1)],
  [(TH + 'th3-B-receipt-window-timer_raw47.9', 0), ('B-timecard/frames/b6', 0), (SH + 's3-B-SH8-study-leave', 1)]),
 ('C · DATE STAMP  (montage of her week + her voice)',
  [('C-datestamp/frames/c1', 0), ('C-datestamp/frames/c2', 0), ('C-datestamp/frames/c3', 0), ('C-datestamp/frames/c4', 0), ('C-datestamp/frames/p1', 1), ('C-datestamp/frames/p2', 1)],
  [(TH + 'th4-C-screen-behind-her_raw84', 0), (SH + 's4-C-SH2-letterbox', 1)]),
]
w, h, g = 560, 315, 12; pw = int(h * 9 / 16); top, sub, head = 70, 40, 150
W = 4 * (w + g) + 2 * (pw + g) + g + 40
H = head + len(LOOKS) * (top + 2 * (h + sub + g) + 30)
S = Image.new('RGB', (W, H), (22, 22, 22)); d = ImageDraw.Draw(S)
F = lambda s: ImageFont.truetype(os.path.join(D, '_fonts/JetBrainsMono.ttf'), s)
d.text((g + 8, 24), 'Pick ONE look for the whole video (film, talking-head edit, shorts, teaser).', fill=(255, 255, 255), font=F(44))
d.text((g + 8, 86), 'Row 1 of each look = the motion graphics. Row 2 = the same look around you (your real footage, a short). Combination idea: B with A\'s dial for the calendar part.', fill=(190, 190, 190), font=F(26))
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
