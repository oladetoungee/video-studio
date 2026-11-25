"""Review sheets for the collage directions (C*): python3 tools/collage_review.py
  review/collage/cold_<dir>.png   the thumbnail alone at 1280x720, 320x180 and 168x94 with a duration badge (gate a)
  review/collage/feed_<n>.png     a mocked dark YouTube feed: ours with their titles mixed with her collage samples (gate b)
  review/collage/vs_samples.png   sample | ours, same size (gate c; also copied to Downloads)
Her samples are cropped out of the YouTube screenshots in inspiration/viral-samples/collage/ (review only, never published)."""
import json, os
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PROJ = os.path.dirname(os.path.dirname(ROOT))
OUTT = os.path.join(PROJ, 'outputs', 'thumbnails')
SAMP = os.path.join(os.path.dirname(os.path.dirname(PROJ)), 'inspiration', 'viral-samples', 'collage')
REV = os.path.join(ROOT, 'review', 'collage'); os.makedirs(REV, exist_ok=True)
F = os.path.join(ROOT, 'fonts', 'Archivo.ttf')
def font(sz, w=500):
    f = ImageFont.truetype(F, sz)
    try: f.set_variation_by_axes([100, w])
    except Exception: pass
    return f
SAMPLES = [  # file, crop box, real title, channel, duration
    ('time-to-lock-in.jpg', (10, 18, 713, 413), 'How to glow up & FINALLY become your dream self | New year goals', '', '17:48'),
    ('capsule-wardrobe.jpg', (14, 18, 718, 410), 'How to build a CHIC & NON-BORING capsule wardrobe | underconsumption, minimalism', 'Mirella', '7:11'),
    ('how-to-be-feminine.jpg', (18, 104, 720, 498), 'How to *actually* be feminine | embrace your femininity | romanticizing life', '', '11:06'),
    ('in-defense-of-being-online.jpg', (0, 22, 735, 435), 'in defense of being online', 'mickey galvin', '28:05'),
    ('thought-of-these.jpg', (0, 28, 735, 440), '30 unconventional ways to boost creativity', '', '20:58'),
]
def sample_img(i):
    f, box = SAMPLES[i][0], SAMPLES[i][1]
    return Image.open(os.path.join(SAMP, f)).convert('RGB').crop(box).resize((1280, 720), Image.LANCZOS)

def badge(im, txt='18:12'):
    d = ImageDraw.Draw(im); W, H = im.size; s = W / 1280
    f = font(max(9, int(26 * s)), 600); tw = d.textlength(txt, font=f)
    x1, y1 = W - int(14 * s), H - int(14 * s); x0, y0 = x1 - tw - int(16 * s), y1 - int(40 * s)
    d.rounded_rectangle((x0, y0, x1, y1), radius=max(2, int(6 * s)), fill=(0, 0, 0, 220))
    d.text((x0 + int(8 * s), y0 + int(5 * s)), txt, font=f, fill='white')
    return im

dirs = sorted(d for d in os.listdir(os.path.join(ROOT, 'directions')) if d.startswith('C') and os.path.exists(os.path.join(OUTT, d + '.png')))
meta = {d: json.load(open(os.path.join(ROOT, 'directions', d, 'content.json'))) for d in dirs}
# (a) cold sheets
for d in dirs:
    im = Image.open(os.path.join(OUTT, d + '.png')).convert('RGB')
    sheet = Image.new('RGB', (1280 + 40 + 340, 720), (15, 15, 15))
    sheet.paste(badge(im.copy()), (0, 0))
    sheet.paste(badge(im.resize((320, 180), Image.LANCZOS)), (1320, 0))
    sheet.paste(badge(im.resize((168, 94), Image.LANCZOS)), (1320, 220))
    sheet.save(os.path.join(REV, f'cold_{d}.png'))
# (b) feed mock: 4 columns of 360 px thumbnails, ours mixed with the samples
def cell(img, title, chan, dur, ours=True):
    W = 360; c = Image.new('RGB', (W, 300), (15, 15, 15)); t = img.resize((W, 203), Image.LANCZOS)
    if ours: t = badge(t, dur)
    m = Image.new('L', (W, 203), 0); ImageDraw.Draw(m).rounded_rectangle((0, 0, W, 203), 12, fill=255); c.paste(t, (0, 0), m)
    d = ImageDraw.Draw(c); f = font(17, 600); words = title.split(); lines = ['']
    for w in words:
        if d.textlength((lines[-1] + ' ' + w).strip(), font=f) > W - 50: lines.append(w)
        else: lines[-1] = (lines[-1] + ' ' + w).strip()
    lines = lines[:2]
    d.ellipse((0, 214, 36, 250), fill=(70, 70, 70))
    for i, l in enumerate(lines): d.text((46, 212 + i * 23), l, font=f, fill=(241, 241, 241))
    d.text((46, 216 + len(lines) * 23), chan or 'channel', font=font(14), fill=(170, 170, 170))
    return c
cells = []
for i, d in enumerate(dirs):
    cells.append(cell(Image.open(os.path.join(OUTT, d + '.png')).convert('RGB'), meta[d]['title'], 'With Gbemi', '18:12'))
    if i < len(SAMPLES): s = SAMPLES[i]; cells.append(cell(sample_img(i), s[2], s[3], s[4], False))
per = 8
for n in range(0, len(cells), per):
    grp = cells[n:n + per]; rows = (len(grp) + 3) // 4
    sh = Image.new('RGB', (4 * 360 + 5 * 16, rows * 300 + 32), (15, 15, 15))
    for k, c in enumerate(grp): sh.paste(c, (16 + (k % 4) * 376, 16 + (k // 4) * 300))
    sh.save(os.path.join(REV, f'feed_{n // per + 1}.png'))
# (c) sample | ours
pair = {'C1': 0, 'C2': 1, 'C3': 0, 'C4': 3, 'C5': 4, 'C6': 0, 'C7': 0, 'C8': 2}
W, H = 640, 360; sh = Image.new('RGB', (2 * W + 60, len(dirs) * (H + 54) + 70), (17, 17, 20)); d = ImageDraw.Draw(sh)
d.text((20, 18), 'her collage sample', font=font(26, 700), fill='white'); d.text((W + 40, 18), 'ours (reading-stack)', font=font(26, 700), fill='white')
for r, dd in enumerate(dirs):
    y = 70 + r * (H + 54); si = pair.get(dd[:2], 0)
    sh.paste(sample_img(si).resize((W, H), Image.LANCZOS), (20, y))
    sh.paste(Image.open(os.path.join(OUTT, dd + '.png')).convert('RGB').resize((W, H), Image.LANCZOS), (W + 40, y))
    d.text((20, y + H + 8), SAMPLES[si][0].replace('.jpg', ''), font=font(18), fill=(180, 180, 180))
    d.text((W + 40, y + H + 8), f"{dd}  |  {meta[dd]['title']}", font=font(18), fill=(180, 180, 180))
sh.save(os.path.join(REV, 'vs_samples.png'))
print('review sheets ->', REV, len(dirs), 'directions')
