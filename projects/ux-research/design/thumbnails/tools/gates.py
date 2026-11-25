"""Review sheets for the three thumbnail gates (written to a folder you pass):
  A_<n>.jpg  image only: each thumbnail at 640x360 + 320x180 + 168x94 with a duration badge, numbered, no titles
  B_<n>.jpg  mocked YouTube feed: thumbnail 400x225 + its main title + channel line, her viral samples mixed in
  C.jpg      taste: all thumbnails small beside her viral samples and collage samples
  python3 tools/gates.py OUTDIR"""
import os, sys, glob, json
from PIL import Image, ImageDraw, ImageFont
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__))); O = os.path.normpath(os.path.join(R, '..', '..', 'outputs', 'thumbnails'))
INS = os.path.normpath(os.path.join(R, '..', '..', '..', '..', 'inspiration', 'viral-samples'))
out = sys.argv[1]; os.makedirs(out, exist_ok=True)
F = lambda s, b=True: ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial Bold.ttf' if b else '/System/Library/Fonts/Supplemental/Arial.ttf', s)
def badge(im, txt='13:02'):
    d = ImageDraw.Draw(im); w, h = im.size; s = max(9, int(h * .075)); f = F(s); tw = d.textlength(txt, font=f); p = max(2, s // 4)
    d.rounded_rectangle([w - tw - 4 * p, h - s - 3 * p, w - 2 * p, h - 2 * p], radius=p, fill=(0, 0, 0)); d.text((w - tw - 3 * p, h - s - 2.6 * p), txt, font=f, fill='white'); return im
items = []
for c in sorted(glob.glob(os.path.join(R, 'directions', '*', 'content.json'))):
    n = os.path.basename(os.path.dirname(c)); p = os.path.join(O, n + '.png')
    if os.path.exists(p): items.append((n, json.load(open(c)), p))
key = {}
for k in range(0, len(items), 6):
    chunk = items[k:k + 6]; sh = Image.new('RGB', (1200, 400 * len(chunk)), (15, 15, 15)); d = ImageDraw.Draw(sh)
    for i, (n, c, p) in enumerate(chunk):
        num = n.split('-')[0]; y = i * 400; im = Image.open(p).convert('RGB')
        d.text((10, y + 6), '#' + num, font=F(22), fill='white')
        sh.paste(badge(im.resize((640, 360), Image.LANCZOS)), (10, y + 36)); sh.paste(badge(im.resize((320, 180), Image.LANCZOS)), (670, y + 36)); sh.paste(badge(im.resize((168, 94), Image.LANCZOS)), (1010, y + 36))
    sh.save(os.path.join(out, f'A_{k // 6 + 1}.jpg'), quality=88)
samples = [os.path.join(INS, f) for f in ('1.jpg', '4.jpg', '5.jpg', '3.jpg')]
feed = []
for i, it in enumerate(items):
    feed.append(it)
    if i % 4 == 3 and samples: feed.append(('sample', None, samples.pop(0)))
for k in range(0, len(feed), 8):
    chunk = feed[k:k + 8]; sh = Image.new('RGB', (2 * 440, 330 * ((len(chunk) + 1) // 2)), (15, 15, 15)); d = ImageDraw.Draw(sh)
    for i, (n, c, p) in enumerate(chunk):
        x, y = (i % 2) * 440 + 20, (i // 2) * 330 + 14; im = Image.open(p).convert('RGB')
        if n == 'sample':
            w, h = im.size; t = min(w / 16, h / 9); im = im.crop(((w - 16 * t) / 2, 0, (w + 16 * t) / 2, 9 * t))
        sh.paste(badge(im.resize((400, 225), Image.LANCZOS)), (x, y))
        title = 'other creator (reference)' if n == 'sample' else '#' + n.split('-')[0] + '  ' + c['title']
        words, line, ly = title.split(), '', y + 233
        for w in words:
            if d.textlength(line + ' ' + w, font=F(17)) > 400: d.text((x, ly), line.strip(), font=F(17), fill=(241, 241, 241)); ly += 22; line = ''
            line += ' ' + w
        d.text((x, ly), line.strip(), font=F(17), fill=(241, 241, 241))
        d.text((x, ly + 24), 'With Gbemi · 1.2K views · 2 days ago' if n != 'sample' else '', font=F(14, False), fill=(170, 170, 170))
    sh.save(os.path.join(out, f'B_{k // 8 + 1}.jpg'), quality=88)
refs = [os.path.join(INS, f) for f in ('1.jpg', '3.jpg', '4.jpg', '5.jpg')] + sorted(glob.glob(os.path.join(INS, 'collage', '*.jpg')))[:5]
allp = [('#' + n.split('-')[0], p) for n, c, p in items] + [('REF ' + os.path.basename(p)[:-4], p) for p in refs]
cols = 5; sh = Image.new('RGB', (cols * 330, 210 * ((len(allp) + cols - 1) // cols)), (15, 15, 15)); d = ImageDraw.Draw(sh)
for i, (lab, p) in enumerate(allp):
    x, y = (i % cols) * 330 + 5, (i // cols) * 210; im = Image.open(p).convert('RGB'); w, h = im.size; t = min(w / 16, h / 9)
    im = im.crop(((w - 16 * t) / 2, 0, (w + 16 * t) / 2, 9 * t)); sh.paste(im.resize((320, 180), Image.LANCZOS), (x, y + 24)); d.text((x, y + 2), lab, font=F(18), fill='white')
sh.save(os.path.join(out, 'C.jpg'), quality=88)
print(os.listdir(out))
