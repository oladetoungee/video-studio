#!/usr/bin/env python3
"""Review sheets: every thumbnail at 640 (half), 320x180 (mobile feed) and 168x94 (sidebar),
with a duration badge drawn where YouTube puts it. Optional competitor folder for side-by-side (scratch only).

  python3 tools/review.py [--competitors DIR] [--out PATH]
"""
import os, sys, glob, json
from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUTS = os.path.normpath(os.path.join(ROOT, '..', '..', 'outputs', 'thumbnails'))
F = lambda s, b=False: ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial Bold.ttf' if b else '/System/Library/Fonts/Supplemental/Arial.ttf', s)


def badge(im, txt='5:12'):
    d = ImageDraw.Draw(im); w, h = im.size
    s = max(9, int(h * 0.13)); f = F(s, True)
    tw = d.textlength(txt, font=f); pad = max(2, s // 4)
    x1, y1 = w - pad * 2, h - pad * 2
    d.rounded_rectangle([x1 - tw - pad * 2, y1 - s - pad, x1, y1], radius=pad, fill=(0, 0, 0, 200))
    d.text((x1 - tw - pad, y1 - s - pad * 0.6), txt, font=f, fill='white')
    return im


def small(p, size):
    im = Image.open(p).convert('RGB').resize(size, Image.LANCZOS)
    return badge(im)


def main():
    comp = None; out = os.path.join(ROOT, 'review', 'review_sheet.png')
    a = sys.argv[1:]
    if '--competitors' in a: comp = a[a.index('--competitors') + 1]
    if '--out' in a: out = a[a.index('--out') + 1]
    items = []
    for d in sorted(glob.glob(os.path.join(ROOT, 'directions', '*', 'content.json'))):
        name = os.path.basename(os.path.dirname(d)); c = json.load(open(d))
        p = os.path.join(OUTS, name + '.png')
        if os.path.exists(p): items.append((name, c.get('title', ''), p))
    if comp:
        for p in sorted(glob.glob(os.path.join(comp, '*.jpg'))):
            items.append(('ref: ' + os.path.basename(p)[:-4], '', p))
    W = 640 + 320 + 168 + 80; rowh = 360 + 40
    sheet = Image.new('RGB', (W, rowh * len(items)), (15, 15, 15)); d = ImageDraw.Draw(sheet)
    for k, (name, title, p) in enumerate(items):
        y = k * rowh
        sheet.paste(Image.open(p).convert('RGB').resize((640, 360), Image.LANCZOS), (20, y + 30))
        sheet.paste(small(p, (320, 180)), (680, y + 30))
        sheet.paste(small(p, (168, 94)), (1020, y + 30))
        d.text((20, y + 6), name, font=F(18, True), fill='white')
        d.text((680, y + 220), title, font=F(15, True), fill=(241, 241, 241))
        d.text((680, y + 242), 'With Gbemi  ·  1.2K views  ·  1 day ago', font=F(13), fill=(170, 170, 170))
    os.makedirs(os.path.dirname(out), exist_ok=True); sheet.save(out); print(out, sheet.size)


if __name__ == '__main__':
    main()
