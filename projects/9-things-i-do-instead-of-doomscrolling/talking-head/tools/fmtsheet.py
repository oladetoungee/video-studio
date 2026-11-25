#!/usr/bin/env python3
"""Shorts review sheets (rollout 2026-11-10): per short the cover (t 0.05) + 3 stills (her talking, a graphic, later), with the
format letter -> ../outputs/_review/shorts-formats-v2.jpg + covers.jpg (cover full + its 3:4 grid crop).
  python3 tools/fmtsheet.py [sh01 sh02 ...]   (run under the render lock: python3 tools/locked.py name -- python3 tools/fmtsheet.py)"""
import json, os, subprocess, sys, glob
from PIL import Image, ImageDraw, ImageFont
H = os.path.dirname(os.path.dirname(os.path.abspath(__file__))); ROOT = os.path.abspath(os.path.join(H, '..', '..', '..'))
man = os.path.join(H, 'talking-head.json'); M = json.load(open(man))
SHEET = '--sheet' in sys.argv; ids = [a for a in sys.argv[1:] if not a.startswith('--')] or ([] if SHEET else [m['id'] for m in M['moments'] if m['kind'] == 'short'])
OUT = os.path.join(H, '..', 'outputs', '_review'); FD = os.path.join(OUT, 'fmt'); os.makedirs(FD, exist_ok=True)
font = ImageFont.truetype('/System/Library/Fonts/Helvetica.ttc', 28)
def meta(mid):
    raw = subprocess.run(['node', 'studio/tools/composite.mjs', 'meta', man, mid, '--aspect', '9x16'], cwd=ROOT, capture_output=True, text=True).stdout
    return json.loads(raw[raw.index('{'):])
for mid in ids:
    me = meta(mid); sc = me['SCENES']; dur = me['dur']
    g = [s for s in sc if s['layout'] != 'L1 talk' and s['end'] - s['start'] > 0.6]
    t1 = 2.4
    t2 = round(g[0]['start'] + min(1.6, (g[0]['end'] - g[0]['start']) * 0.6), 2) if g else round(dur * 0.45, 2)
    t3 = round(g[1]['start'] + min(1.6, (g[1]['end'] - g[1]['start']) * 0.6), 2) if len(g) > 1 else round(dur * 0.8, 2)
    if abs(t3 - t2) < 2: t3 = round(dur * 0.8, 2)
    for f in glob.glob(os.path.join(FD, 'short%s-*.jpg' % mid[2:])): os.remove(f)
    subprocess.run(['node', 'studio/tools/composite.mjs', 'stills', man, mid, '--at', ','.join(map(str, [0.05, t1, t2, t3])), '--aspect', '9x16', '--captions', '--out', FD], cwd=ROOT, check=True, capture_output=True)
    print(mid, t1, t2, t3, flush=True)
shorts = [m for m in M['moments'] if m['kind'] == 'short']
tw, th = 270, 480; per = 6; bw = 3 * tw + 24
sheet = Image.new('RGB', (per * bw, 2 * (th + 50)), '#222'); d = ImageDraw.Draw(sheet)
cov = Image.new('RGB', (per * (tw + 220), 2 * (th + 44)), '#222'); dc = ImageDraw.Draw(cov)
for i, m in enumerate(shorts):
    fs = sorted(glob.glob(os.path.join(FD, 'short%s-*.jpg' % m['id'][2:])), key=lambda f: float(f.rsplit('_t', 1)[1][:-4]))
    if len(fs) < 4: continue
    r, col = divmod(i, per); x0 = col * bw; y0 = r * (th + 50)
    for k, f in enumerate(fs[1:4]): sheet.paste(Image.open(f).resize((tw, th)), (x0 + k * tw, y0 + 46))
    d.text((x0 + 6, y0 + 8), f"{m['id']}  format {m.get('fmt', '-')}  {m.get('slug', '')[:24]}", fill='#fff', font=font)
    c = Image.open(fs[0]); xc = col * (tw + 220); yc = r * (th + 44)
    cov.paste(c.resize((tw, th)), (xc, yc + 40))
    cov.paste(c.crop((0, 240, 1080, 1680)).resize((200, 267)), (xc + tw + 8, yc + 40))
    dc.text((xc + 4, yc + 6), f"{m['id']} {m['cover'].get('style', '')}", fill='#fff', font=font)
sheet.save(os.path.join(OUT, 'shorts-formats-v2.jpg'), quality=82); cov.save(os.path.join(OUT, 'covers.jpg'), quality=85)
print('sheets ok')
