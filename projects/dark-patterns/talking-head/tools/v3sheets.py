#!/usr/bin/env python3
"""shorts v3 review (2026-11-12 night): per short, its 3 board references' frames (left) + 4 stills of ours (right: the cover at
0.05 s, her talking, a graphic, her talking later). -> outputs/_review/shorts-v3-2026-11-12/<id>.jpg + overall.jpg
  python3 tools/v3sheets.py [sh01 ...] [--no-render]"""
import json, os, subprocess, sys, glob
from PIL import Image, ImageDraw, ImageFont
HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
ROOT = os.path.abspath(os.path.join(HERE, '..', '..', '..'))
MAN = os.path.join(HERE, 'talking-head.json'); man = json.load(open(MAN))
OUT = os.path.join(HERE, '..', 'outputs', '_review', 'shorts-v3-2026-11-12'); ST = os.path.join(OUT, 'stills'); os.makedirs(ST, exist_ok=True)
BOARD = json.load(open(os.path.join(ROOT, 'inspiration/short-formats/formats.json')))['items']
FR = os.path.join(ROOT, 'inspiration/short-formats/frames')
FONT = ImageFont.truetype('/System/Library/Fonts/Helvetica.ttc', 30)
args = [a for a in sys.argv[1:] if not a.startswith('--')]; render = '--no-render' not in sys.argv
CT = lambda *a: subprocess.run(['node', os.path.join(ROOT, 'studio/tools/composite.mjs'), *a], capture_output=True, text=True, cwd=ROOT)

def times(m):
    r = CT('meta', MAN, m['id'], '--aspect', '9x16'); d = json.loads(r.stdout[r.stdout.index('{'):])
    dur = d['dur']; sc = [s for s in d['SCENES'] if s['end'] <= dur and s['end'] - s['start'] > 1.0]
    talk = sorted([s for s in sc if s['id'].startswith('talk') and s['start'] > 0.4], key=lambda s: s['start'] - s['end'])
    gfx = sorted([s for s in sc if not s['id'].startswith('talk') and s['id'] != 'hook'], key=lambda s: s['start'] - s['end'])
    mid = lambda s: round(s['start'] + min(2.2, (s['end'] - s['start']) * 0.6), 2)
    picks = [mid(x) for x in (talk[:1] + gfx[:1] + (gfx[1:2] if len(gfx) > 1 else talk[1:2]))]
    while len(picks) < 3: picks.append(round(dur * (0.3 + 0.2 * len(picks)), 2))
    return [0.0] + sorted(picks)

def stills(m, ts):
    out = []
    for t in ts:
        for _ in range(3):
            r = CT('export', MAN, m['id'], '--aspect', '9x16', '--t0', str(t), '--t1', str(round(t + 0.1, 2)))
            try: j = json.loads(r.stdout.strip().splitlines()[-1]); break
            except Exception: j = None
        if not j: raise SystemExit('export failed ' + m['id'] + r.stderr[-600:])
        src = os.path.join(ROOT, j['out']); dst = os.path.join(ST, '%s_t%06.2f.jpg' % (m['id'], t))
        subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-i', src, '-frames:v', '1', '-q:v', '3', dst], check=True)
        os.makedirs(os.path.expanduser('~/.Trash/dp-v3-clips'), exist_ok=True); os.replace(src, os.path.join(os.path.expanduser('~/.Trash/dp-v3-clips'), os.path.basename(src) + '.%s.mp4' % m['id']))
        out.append(dst)
    return out

def sheet(m, fs):
    H_ = 760; refs = []
    for n in m['board']:
        it = BOARD[n - 1]; ims = [Image.open(os.path.join(FR, f)).convert('RGB') for f in it['frames'][:3]]
        refs.append((n, it['creator'], ims))
    ours = [Image.open(f).convert('RGB').resize((round(H_ * 9 / 16), H_)) for f in fs]
    rh = H_ // 3 - 40
    lw = max(sum(round(i.width * rh / i.height) + 8 for i in ims) for _, _, ims in refs) + 20
    W_ = lw + 40 + sum(o.width + 10 for o in ours) + 20
    S = Image.new('RGB', (W_, H_ + 70), (245, 244, 240)); d = ImageDraw.Draw(S)
    d.text((20, 14), f"{m['id']} · board {m['board']} (left)  ->  ours: cover 0.05 s + 3 stills (right) · {m.get('fmt')}", fill=(0, 0, 0), font=FONT)
    y = 60
    for n, cr, ims in refs:
        d.text((20, y), f'Formats {n} {cr}', fill=(60, 60, 60), font=ImageFont.truetype('/System/Library/Fonts/Helvetica.ttc', 22)); x = 20
        for i in ims: i2 = i.resize((round(i.width * rh / i.height), rh)); S.paste(i2, (x, y + 26)); x += i2.width + 8
        y += rh + 40
    x = lw + 40
    for o in ours: S.paste(o, (x, 60)); x += o.width + 10
    p = os.path.join(OUT, m['id'] + '.jpg'); S.save(p, quality=86); return p

shorts = [m for m in man['moments'] if m.get('kind') == 'short' and (not args or m['id'] in args)]
for m in shorts:
    if render:
        ts = times(m); fs = stills(m, ts)
    else:
        fs = sorted(glob.glob(os.path.join(ST, '%s_t*.jpg' % m['id'])))[-4:]
    print(sheet(m, fs), flush=True)
# overall: every short's cover + 1 graphic still in a grid
allm = [m for m in man['moments'] if m.get('kind') == 'short']; cw, chh = 270, 480
S = Image.new('RGB', (cw * 2 * 7 + 20 * 7, (chh + 40) * 2), (20, 20, 22)); d = ImageDraw.Draw(S)
for i, m in enumerate(allm):
    fs = sorted(glob.glob(os.path.join(ST, '%s_t*.jpg' % m['id'])))
    if not fs: continue
    x0 = (i % 7) * (cw * 2 + 20); y0 = (i // 7) * (chh + 40)
    d.text((x0 + 4, y0 + 6), f"{m['id']} {m['board']}", fill=(255, 255, 255), font=ImageFont.truetype('/System/Library/Fonts/Helvetica.ttc', 22))
    for k, f in enumerate([fs[0], fs[min(2, len(fs) - 1)]]): S.paste(Image.open(f).convert('RGB').resize((cw, chh)), (x0 + k * cw, y0 + 36))
S.save(os.path.join(OUT, 'overall.jpg'), quality=86); print(os.path.join(OUT, 'overall.jpg'))
