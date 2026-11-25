#!/usr/bin/env python3
"""Shorts v3 review (2026-11-12 night): per short 4 stills (cover at 0.05 s + 3), composite.mjs stills under the render lock ->
outputs/_review/fullkit-2026-11-13/; sheet-<id>.jpg = its 3 board references (3 frames each) on the left, our 4 stills on the
right; sheet-shorts.jpg = all nine (cover + 3 each); covers.jpg = the nine covers.
  python3 tools/v3stills.py [sh01 ...]   (no ids = all)    python3 tools/v3stills.py --sheets"""
import json, os, subprocess, sys, glob
from PIL import Image, ImageDraw, ImageFont
HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__))); ROOT = os.path.abspath(os.path.join(HERE, '..', '..', '..'))
MAN = os.path.join(HERE, 'talking-head.json'); OUT = os.path.join(HERE, '..', 'outputs', '_review', 'fullkit-2026-11-13')
FMT = os.path.join(ROOT, 'inspiration', 'short-formats')
man = json.load(open(MAN)); SH = [m for m in man['moments'] if m.get('kind') == 'short']
FONTS = {'sh01': 'Inter Tight (thumbs-02)', 'sh02': 'Gloock + Switzer (pair-07, combo-12)', 'sh03': 'Inter Tight + DM Mono (shorts-15)', 'sh04': 'Permanent Marker + DM Mono (shorts-03, design-29)', 'sh05': 'Anton (thumbs-16)', 'sh06': 'Newsreader + Bodoni Moda (shorts-11, shorts-10)', 'sh07': 'Satoshi Black Italic (shorts-20)', 'sh08': 'Montserrat (thumbs-18)'}
TIMES = {'sh01': [0.05, 3.0, 9.0, 22.0], 'sh02': [0.05, 3.0, 14.0, 30.0], 'sh03': [0.05, 2.0, 9.0, 17.0], 'sh04': [0.05, 3.0, 20.0, 44.0], 'sh05': [0.05, 3.0, 10.0, 18.0], 'sh06': [0.05, 3.0, 20.0, 36.0], 'sh07': [0.05, 3.0, 20.0, 45.0], 'sh08': [0.05, 1.0, 8.0, 15.0]}
def stills(ids):
    os.makedirs(OUT, exist_ok=True)
    for i in ids:
        for f in glob.glob(os.path.join(OUT, i + '_*')): os.remove(f)
        print(i, TIMES[i], flush=True)
        subprocess.run(['node', os.path.join(ROOT, 'studio/tools/composite.mjs'), 'stills', MAN, i, '--at', ','.join(map(str, TIMES[i])), '--aspect', '9x16', '--captions', '--out', OUT, '--prefix', i + '_'], cwd=ROOT, check=True)
def font(z):
    try: return ImageFont.truetype('/System/Library/Fonts/HelveticaNeue.ttc', z)
    except Exception: return ImageFont.load_default()
def ours(i): return sorted(glob.glob(os.path.join(OUT, i + '_*.jpg')) + glob.glob(os.path.join(OUT, i + '_*.png')))
def board(n):
    it = json.load(open(os.path.join(FMT, 'formats.json')))['items'][n - 1]
    return [os.path.join(FMT, 'frames', f) for f in it['frames']], it
def fitpaste(S, f, x, y, w, h):
    im = Image.open(f).convert('RGB'); im.thumbnail((w, h)); S.paste(im, (x + (w - im.width) // 2, y + (h - im.height) // 2))
def sheets():
    for m in SH:
        fs = ours(m['id'])
        if len(fs) < 4: continue
        bw, bh = 200, 356; ow, oh = 360, 640
        S = Image.new('RGB', (3 * bw + 60 + 4 * (ow + 10) + 30, 80 + 3 * (bh + 40)), '#111114'); d = ImageDraw.Draw(S)
        d.text((20, 16), f"{m['id']}: board references {m['board']}", fill='#EDE9E2', font=font(26))
        for r, n in enumerate(m['board']):
            bf, it = board(n); y0 = 70 + r * (bh + 40)
            d.text((20, y0 - 4), f"Formats {n} {it.get('creator', '')}", fill='#BFBFC4', font=font(20))
            for j, f in enumerate(bf[:3]): fitpaste(S, f, 20 + j * bw, y0 + 22, bw - 6, bh - 10)
        x0 = 3 * bw + 60
        d.text((x0, 16), f"ours ({FONTS[m['id']]}) · cover: {m['cover']['text'].replace('~', '').replace(' | ', ' ')}", fill='#EDE9E2', font=font(24))
        for j, f in enumerate(fs[:4]):
            fitpaste(S, f, x0 + j * (ow + 10), 70, ow, oh); d.text((x0 + j * (ow + 10), 70 + oh + 8), os.path.basename(f).split('_t')[-1].replace('.jpg', ' s'), fill='#BFBFC4', font=font(20))
        S.save(os.path.join(OUT, f"sheet-{m['id']}.jpg"), quality=86)
    w, h = 240, 427; cols = 3
    S = Image.new('RGB', (cols * (4 * w + 30) + 30, 3 * (h + 60) + 20), '#111114'); d = ImageDraw.Draw(S)
    for k, m in enumerate(SH):
        fs = ours(m['id']); x0 = 30 + (k % cols) * (4 * w + 30); y0 = 20 + (k // cols) * (h + 60)
        d.text((x0, y0), f"{m['id']}  Formats {m['board']}  {FONTS[m['id']]}", fill='#EDE9E2', font=font(20))
        for j, f in enumerate(fs[:4]): S.paste(Image.open(f).convert('RGB').resize((w - 6, h - 6)), (x0 + j * w, y0 + 34))
    S.save(os.path.join(OUT, 'sheet-shorts.jpg'), quality=86)
    C = Image.new('RGB', (8 * 250 + 20, 480 + 70), '#111114'); d = ImageDraw.Draw(C)
    for k, m in enumerate(SH):
        fs = ours(m['id'])
        if not fs: continue
        d.text((20 + k * 250, 14), m['id'], fill='#EDE9E2', font=font(20)); C.paste(Image.open(fs[0]).convert('RGB').resize((240, 427)), (20 + k * 250, 50))
    C.save(os.path.join(OUT, 'covers.jpg'), quality=86)
if __name__ == '__main__':
    a = sys.argv[1:]
    if a != ['--sheets']: stills(a or [m['id'] for m in SH])
    sheets()
