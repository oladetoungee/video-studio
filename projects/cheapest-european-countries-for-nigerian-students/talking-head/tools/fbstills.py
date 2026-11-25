#!/usr/bin/env python3
"""Font-board pass review (2026-11-12, her rule: only fonts + colour pairs from the font board): per short the cover at 0.05 s + 2 stills,
teaser 3 stills (composite.mjs stills, render lock) -> outputs/_review/shorts-fontboard-2026-11-12/; sheet-fontboard.jpg = per short its
font-board specimens (talking-head.json "fonts" + "colours", inspiration/boards/fonts/img/) beside its 3 stills; covers-fontboard.jpg = the 9 covers.
  python3 tools/fbstills.py [sh01 ... teaser]   (no ids = all)    python3 tools/fbstills.py --sheets"""
import json, os, subprocess, sys, glob
from PIL import Image, ImageDraw, ImageFont
HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__))); ROOT = os.path.abspath(os.path.join(HERE, '..', '..', '..'))
MAN = os.path.join(HERE, 'talking-head.json'); OUT = os.path.join(HERE, '..', 'outputs', '_review', 'shorts-fontboard-2026-11-12')
FB = os.path.join(ROOT, 'inspiration', 'boards', 'fonts')
man = json.load(open(MAN)); MO = {m['id']: m for m in man['moments']}; SH = [m for m in man['moments'] if m.get('kind') == 'short']
BOARD = {it['id']: it for it in json.load(open(os.path.join(FB, 'board.json')))['items']}
TIMES = {'sh01': [0.05, 3.0, 26.0], 'sh02': [0.05, 3.0, 34.0], 'sh03': [0.05, 3.0, 18.0], 'sh04': [0.05, 3.0, 16.0], 'sh05': [0.05, 3.0, 22.0],
         'sh06': [0.05, 4.0, 28.0], 'sh07': [0.05, 3.0, 16.0], 'sh08': [0.05, 3.0, 22.0], 'sh09': [0.05, 3.0, 10.5], 'teaser': [1.0, 55.6, 76.0]}
def stills(ids):
    os.makedirs(OUT, exist_ok=True)
    for i in ids:
        for f in glob.glob(os.path.join(OUT, i + '_*')): os.remove(f)
        print(i, TIMES[i], flush=True)
        subprocess.run(['node', os.path.join(ROOT, 'studio/tools/composite.mjs'), 'stills', MAN, i, '--at', ','.join(map(str, TIMES[i])), '--aspect', '16x9' if i == 'teaser' else '9x16', '--captions', '--out', OUT, '--prefix', i + '_'], cwd=ROOT, check=True)
def font(z):
    try: return ImageFont.truetype('/System/Library/Fonts/HelveticaNeue.ttc', z)
    except Exception: return ImageFont.load_default()
def ours(i): return sorted(glob.glob(os.path.join(OUT, i + '_*.jpg')) + glob.glob(os.path.join(OUT, i + '_*.png')))
def fitpaste(S, f, x, y, w, h):
    im = Image.open(f).convert('RGB'); im.thumbnail((w, h)); S.paste(im, (x + (w - im.width) // 2, y + (h - im.height) // 2))
def sheets():
    sw, sh_ = 400, 225; ow, oh = 300, 533; rowh = oh + 50
    rows = SH + [MO['teaser']]
    S = Image.new('RGB', (2 * (sw + 10) + 3 * (ow + 10) + 60, len(SH) * rowh + 900), '#111114'); d = ImageDraw.Draw(S)
    y = 20
    for m in rows:
        ids = m.get('fonts', []) + [m.get('colours')]; ids = [x for i, x in enumerate(ids) if x and x not in ids[:i]]
        d.text((20, y), f"{m['id']}  board {m.get('board', '-')}   fonts: {', '.join(BOARD[x]['title'].split(':')[0] + ' [' + x + ']' for x in m.get('fonts', []))}   colours: {m.get('colours')} ({BOARD[m['colours']]['source']})", fill='#EDE9E2', font=font(22))
        for j, x in enumerate(ids[:4]):
            fitpaste(S, os.path.join(FB, 'img', BOARD[x]['img']), 20 + (j % 2) * (sw + 10), y + 34 + (j // 2) * (sh_ + 10), sw, sh_)
        x0 = 2 * (sw + 10) + 40; fs = ours(m['id'])
        if m['id'] == 'teaser':
            tw_, th_ = 560, 315
            for j, f in enumerate(fs[:3]): fitpaste(S, f, 20 + j * (tw_ + 10), y + 34 + 2 * (sh_ + 10), tw_, th_)
            y += 34 + 2 * (sh_ + 10) + th_ + 20
        else:
            for j, f in enumerate(fs[:3]): fitpaste(S, f, x0 + j * (ow + 10), y + 34, ow, oh)
            y += rowh
    S = S.crop((0, 0, S.width, y + 10)); S.save(os.path.join(OUT, 'sheet-fontboard.jpg'), quality=86)
    C = Image.new('RGB', (9 * 330 + 20, 587 + 70), '#111114'); d = ImageDraw.Draw(C)
    for k, m in enumerate(SH):
        fs = ours(m['id'])
        if not fs: continue
        d.text((20 + k * 330, 14), f"{m['id']}  {'+'.join(m.get('fonts', []))} / {m.get('colours')}", fill='#EDE9E2', font=font(18)); C.paste(Image.open(fs[0]).convert('RGB').resize((320, 569)), (20 + k * 330, 50))
    C.save(os.path.join(OUT, 'covers-fontboard.jpg'), quality=88)
if __name__ == '__main__':
    a = sys.argv[1:]
    if a != ['--sheets']: stills(a or [m['id'] for m in SH] + ['teaser'])
    sheets()
