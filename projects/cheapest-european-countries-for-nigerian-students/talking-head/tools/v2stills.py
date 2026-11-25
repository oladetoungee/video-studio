#!/usr/bin/env python3
"""Shorts v2 review (2026-11-12 evening): per short the cover + 4 stills (composite.mjs stills, under the render lock) ->
outputs/_review/shorts-v2-2026-11-12/, then per short vs-board-<id>.jpg (left: its board video's 3 frames, right: 3 stills of ours)
and sheet-v2.jpg (all nine: 3 stills each) + covers-v2.jpg.
  python3 tools/v2stills.py [sh01 ...]   (no ids = all)    python3 tools/v2stills.py --sheets"""
import json, os, subprocess, sys, glob
from PIL import Image, ImageDraw, ImageFont
HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__))); ROOT = os.path.abspath(os.path.join(HERE, '..', '..', '..'))
MAN = os.path.join(HERE, 'talking-head.json'); OUT = os.path.join(HERE, '..', 'outputs', '_review', 'shorts-v2-2026-11-12')
FMT = os.path.join(ROOT, 'inspiration', 'short-formats')
man = json.load(open(MAN)); SH = [m for m in man['moments'] if m.get('kind') == 'short']
TIMES = {'sh01': [0.03, 3.0, 7.6, 12.0, 26.0], 'sh02': [0.03, 3.0, 15.5, 33.0, 81.0], 'sh03': [0.03, 25.0, 9.5, 17.0, 77.0],
         'sh04': [0.03, 3.0, 19.5, 37.0, 53.0], 'sh05': [0.03, 3.0, 17.0, 31.0, 50.0], 'sh06': [0.03, 1.2, 8.0, 28.5, 47.0],
         'sh07': [0.03, 5.0, 31.0, 41.5, 58.0], 'sh08': [0.03, 3.0, 26.0, 41.0, 57.0], 'sh09': [0.03, 3.0, 10.5, 20.0, 28.0]}
def stills(ids):
    os.makedirs(OUT, exist_ok=True)
    for i in ids:
        for f in glob.glob(os.path.join(OUT, i + '_*')): os.remove(f)
        ts = TIMES[i]; print(i, ts, flush=True)
        subprocess.run(['node', os.path.join(ROOT, 'studio/tools/composite.mjs'), 'stills', MAN, i, '--at', ','.join(map(str, ts)), '--aspect', '9x16', '--captions', '--out', OUT, '--prefix', i + '_'], cwd=ROOT, check=True)
def font(z):
    try: return ImageFont.truetype('/System/Library/Fonts/HelveticaNeue.ttc', z)
    except Exception: return ImageFont.load_default()
def ours(i):
    fs = sorted(glob.glob(os.path.join(OUT, i + '_*.jpg')) + glob.glob(os.path.join(OUT, i + '_*.png')))
    return fs
def board(n):
    items = json.load(open(os.path.join(FMT, 'formats.json')))['items']; it = items[n - 1]
    return [os.path.join(FMT, 'frames', f) for f in it['frames']], it
def sheets():
    w, h = 300, 533
    for m in SH:
        fs = ours(m['id'])
        if len(fs) < 4: continue
        bf, it = board(m['board'])
        S = Image.new('RGB', (6 * w + 60, h + 80), '#111114'); d = ImageDraw.Draw(S)
        d.text((20, 18), f"Formats {m['board']} ({it['id']}, {it['format']})", fill='#EDE9E2', font=font(24))
        d.text((3 * w + 50, 18), f"{m['id']} v2  {m.get('topLabel', '')}", fill='#EDE9E2', font=font(24))
        for j, f in enumerate(bf[:3]): S.paste(Image.open(f).convert('RGB').resize((w - 8, h)), (20 + j * w, 64))
        for j, f in enumerate(fs[2:5]): S.paste(Image.open(f).convert('RGB').resize((w - 8, h)), (3 * w + 50 + j * w, 64))
        S.save(os.path.join(OUT, f"vs-board-{m['id']}.jpg"), quality=85)
    w, h = 240, 427; cols = 3
    S = Image.new('RGB', (cols * (4 * w + 30) + 30, 3 * (h + 60) + 20), '#111114'); d = ImageDraw.Draw(S)
    for k, m in enumerate(SH):
        fs = ours(m['id'])
        x0 = 30 + (k % cols) * (4 * w + 30); y0 = 20 + (k // cols) * (h + 60)
        d.text((x0, y0), f"{m['id']}  Formats {m.get('board')}  {m.get('topLabel', '')}", fill='#EDE9E2', font=font(20))
        for j, f in enumerate(fs[1:5]): S.paste(Image.open(f).convert('RGB').resize((w - 6, h - 6)), (x0 + j * w, y0 + 34))
    S.save(os.path.join(OUT, 'sheet-v2.jpg'), quality=85)
    cols = 9; C = Image.new('RGB', (cols * 250 + 20, 480 + 70), '#111114'); d = ImageDraw.Draw(C)
    for k, m in enumerate(SH):
        fs = ours(m['id'])
        if not fs: continue
        d.text((20 + k * 250, 14), m['id'], fill='#EDE9E2', font=font(20)); C.paste(Image.open(fs[0]).convert('RGB').resize((240, 427)), (20 + k * 250, 50))
    C.save(os.path.join(OUT, 'covers-v2.jpg'), quality=85)
if __name__ == '__main__':
    a = sys.argv[1:]
    if a != ['--sheets']: stills(a or [m['id'] for m in SH])
    sheets()
