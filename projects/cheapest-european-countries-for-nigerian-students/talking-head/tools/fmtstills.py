#!/usr/bin/env python3
"""Review stills for the shorts' formats + covers (2026-11-10 rollout): per short the cover (t 0.03) + a talking frame + 2 graphic
frames -> outputs/_review/formats/ (composite.mjs stills, under the render lock), then the sheets
outputs/_review/shorts-formats-v2.jpg and outputs/_review/covers.jpg (full + the 3:4 grid crop).
  python3 tools/fmtstills.py [sh01 ...]      (no ids = all)   python3 tools/fmtstills.py --sheets   (sheets only)"""
import json, os, subprocess, sys, glob
from PIL import Image, ImageDraw, ImageFont
HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__))); ROOT = os.path.abspath(os.path.join(HERE, '..', '..', '..'))
MAN = os.path.join(HERE, 'talking-head.json'); OUT = os.path.join(HERE, '..', 'outputs', '_review', 'formats')
man = json.load(open(MAN)); SH = [m for m in man['moments'] if m.get('kind') == 'short']
def meta(i):
    s = subprocess.run(['node', os.path.join(ROOT, 'studio/tools/composite.mjs'), 'meta', MAN, i, '--aspect', '9x16'], capture_output=True, text=True, cwd=ROOT).stdout
    return json.loads(s[s.index('{'):])
def times(i):
    d = meta(i); sc = d['SCENES']; dur = d['dur']
    talk = [x for x in sc if x['layout'] == 'L1 talk' and x['end'] - x['start'] > 1.2 and x['start'] > 0.5]
    gfx = sorted([x for x in sc if x['layout'] != 'L1 talk'], key=lambda x: -(x['end'] - x['start']))
    ts = [0.03, 1.0 if man_by[i].get('fmt') == 'D' else (talk[0]['start'] + talk[0]['end']) / 2 if talk else 1.2]
    for g in sorted(gfx[:2], key=lambda x: x['start']): ts.append(g['start'] + min(2.5, (g['end'] - g['start']) * 0.6))
    return [round(min(t, dur - 0.1), 2) for t in ts]
man_by = {m['id']: m for m in SH}
def stills(ids):
    os.makedirs(OUT, exist_ok=True)
    for i in ids:
        for f in glob.glob(os.path.join(OUT, i + '_*')): os.replace(f, os.path.join(os.path.expanduser('~/.Trash'), os.path.basename(f) + '.old'))
        ts = times(i); print(i, ts, flush=True)
        subprocess.run(['node', os.path.join(ROOT, 'studio/tools/composite.mjs'), 'stills', MAN, i, '--at', ','.join(map(str, ts)), '--aspect', '9x16', '--captions', '--out', OUT, '--prefix', i + '_'], cwd=ROOT, check=True)
def font(z):
    try: return ImageFont.truetype('/System/Library/Fonts/HelveticaNeue.ttc', z)
    except Exception: return ImageFont.load_default()
def sheets():
    w, h = 270, 480; rows = []
    for m in SH:
        fs = sorted(glob.glob(os.path.join(OUT, m['id'] + '_*.jpg')) + glob.glob(os.path.join(OUT, m['id'] + '_*.png')))
        rows.append((m, fs))
    # formats: 3 stills per short (skip the cover), 3 shorts per row
    cols = 3; S = Image.new('RGB', (cols * (3 * w + 30) + 30, ((len(rows) + cols - 1) // cols) * (h + 70) + 20), '#111114'); d = ImageDraw.Draw(S)
    for k, (m, fs) in enumerate(rows):
        x0 = 30 + (k % cols) * (3 * w + 30); y0 = 20 + (k // cols) * (h + 70)
        d.text((x0, y0), f"{m['id']}  format {m.get('fmt')}  {m.get('topLabel', '')}", fill='#EDE9E2', font=font(22))
        for j, f in enumerate(fs[1:4]): S.paste(Image.open(f).convert('RGB').resize((w - 6, h - 10)), (x0 + j * w, y0 + 40))
    S.save(os.path.join(HERE, '..', 'outputs', '_review', 'shorts-formats-v2.jpg'), quality=85)
    # covers: full + the 3:4 grid crop (y 240-1680)
    cols = 5; cw = 270 + 270 + 20; C = Image.new('RGB', (cols * (cw + 20) + 20, 2 * (h + 70) + 20), '#111114'); d = ImageDraw.Draw(C)
    for k, (m, fs) in enumerate(rows):
        if not fs: continue
        im = Image.open(fs[0]).convert('RGB'); x0 = 20 + (k % cols) * (cw + 20); y0 = 20 + (k // cols) * (h + 70)
        d.text((x0, y0), f"{m['id']} {m.get('cover', {}).get('style')}", fill='#EDE9E2', font=font(22))
        C.paste(im.resize((270, 480)), (x0, y0 + 40)); g = im.crop((0, 240, 1080, 1680)).resize((270, 360)); C.paste(g, (x0 + 290, y0 + 40))
    C.save(os.path.join(HERE, '..', 'outputs', '_review', 'covers.jpg'), quality=85)
if __name__ == '__main__':
    a = sys.argv[1:]
    if a != ['--sheets']: stills(a or [m['id'] for m in SH])
    sheets()
