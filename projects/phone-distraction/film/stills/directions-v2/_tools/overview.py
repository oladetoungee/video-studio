# overview.jpg: each direction a row of its 6 16:9 frames + its two 9:16 frames, with a name strip. Also per-direction contact.jpg
import glob, os
from PIL import Image, ImageDraw, ImageFont
D = [('A-house', 'A · THE HOUSE  (your home screen is a casino floor)'), ('B-receipt', 'B · THE RECEIPT  (free apps, paid for with attention)'), ('C-focus', 'C · FOLLOW THE ATTENTION  (photographs + a yellow focus bracket)')]
tw, th = 480, 270; pw = int(th * 1080 / 1920); gap = 10; lab = 54
font = ImageFont.truetype('/Users/gbemi/Desktop/CODE/videos/library/fonts/DMMono-Medium.ttf', 30)
rows = []
for d, name in D:
    l = sorted(glob.glob(f'{d}/frames/*_16x9.png')); p = sorted(glob.glob(f'{d}/frames/*_9x16.png'))
    w = 6 * (tw + gap) + 2 * (pw + gap) + gap
    row = Image.new('RGB', (w, th + lab + gap), (22, 22, 22)); dr = ImageDraw.Draw(row); dr.text((gap + 4, 12), name, font=font, fill=(243, 236, 122))
    x = gap
    for f in l: row.paste(Image.open(f).convert('RGB').resize((tw, th), Image.LANCZOS), (x, lab)); x += tw + gap
    for f in p: row.paste(Image.open(f).convert('RGB').resize((pw, th), Image.LANCZOS), (x, lab)); x += pw + gap
    rows.append(row)
    # contact per direction (bigger)
    c = Image.new('RGB', (3 * 960 + 4 * 12, 2 * 540 + 3 * 12), (22, 22, 22))
    for i, f in enumerate(l): c.paste(Image.open(f).convert('RGB').resize((960, 540), Image.LANCZOS), (12 + (i % 3) * 972, 12 + (i // 3) * 552))
    pp = Image.new('RGB', (2 * 608 + 36, 1080 + 24), (22, 22, 22))
    for i, f in enumerate(p): pp.paste(Image.open(f).convert('RGB').resize((608, 1080), Image.LANCZOS), (12 + i * 620, 12))
    full = Image.new('RGB', (c.width + pp.width, max(c.height, pp.height)), (22, 22, 22)); full.paste(c, (0, 0)); full.paste(pp, (c.width, 0))
    full.save(f'{d}/contact.jpg', quality=86)
H = sum(r.height for r in rows); W = max(r.width for r in rows)
o = Image.new('RGB', (W, H), (22, 22, 22)); y = 0
for r in rows: o.paste(r, (0, y)); y += r.height
o.save('overview.jpg', quality=88); print(o.size)
