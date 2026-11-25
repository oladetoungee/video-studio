#!/usr/bin/env python3
"""Cover stills for the shorts (2026-11-10, her note: "the real cover should be on the video").
Each short's manifest "cover": {"on": true, "dur": 0.1, "at": <source s>, "text": "...", "style": "photo"|"card"} shows a designed
cover over its first frames (moments/common.js FD.coverDraw). This tool cuts the still of her at "at" from the 4K source as a
9:16 frame (full source height, centred on her face = the H / I / K / M full-bleed framing) -> assets/covers/<id>.jpg
(manifest "images": cover_<id>), and for "card" covers also her cut-out -> assets/covers/<id>-cut.png (studio/tools/cutout.swift).
  python3 tools/covers.py                 # every short with a cover (after changing "at": run again, reload the editor)
  python3 tools/covers.py sh04            # one short
  python3 tools/covers.py --candidates sh01 [n]   # n candidate stills across the short -> build/covers/cand/ (for picking "at")
"""
import json, os, subprocess, sys
HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
MAN = os.path.join(HERE, 'talking-head.json')
ROOT = os.path.abspath(os.path.join(HERE, '..', '..', '..'))
man = json.load(open(MAN)); SRC = os.path.normpath(os.path.join(HERE, man['source']))
ft = json.load(open(os.path.join(HERE, man['faces']))); FPS = ft['fps']; SW, SH = ft['src']

def face_cx(t):
    f = ft['faces'][min(len(ft['faces']) - 1, max(0, round((t - ft.get('t0', 0)) * FPS)))]
    return (f[0] + f[2] / 2) * SW if f else SW / 2

def still(t, out, w=1080, h=1920):
    cw = round(SH * 9 / 16); cw -= cw % 2; x = int(min(SW - cw, max(0, face_cx(t) - cw / 2)))
    subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-ss', f'{t:.3f}', '-i', SRC, '-frames:v', '1',
                    '-vf', f'crop={cw}:{SH}:{x}:0,scale={w}:{h}:flags=lanczos', '-q:v', '2', out], check=True)

def shorts(ids):
    return [m for m in man['moments'] if m.get('kind') == 'short' and (not ids or m['id'] in ids)]

if len(sys.argv) > 1 and sys.argv[1] == '--candidates':
    m = shorts([sys.argv[2]])[0]; n = int(sys.argv[3]) if len(sys.argv) > 3 else 10
    d = os.path.join(HERE, 'build', 'covers', 'cand'); os.makedirs(d, exist_ok=True)
    a, b = m['in'] + 0.4, m['out'] - 0.4
    for i in range(n):
        t = a + (b - a) * i / (n - 1)
        if any(c0 - 0.1 <= t <= c1 + 0.1 for c0, c1 in m.get('cuts', [])): t += 0.6
        still(t, os.path.join(d, f"{m['id']}_{i:02d}_{t:.2f}.jpg"), 270, 480)
    sys.exit(0)
for m in shorts(sys.argv[1:]):
    c = m.get('cover')
    if not c or c.get('at') is None: continue
    out = os.path.join(HERE, 'assets', 'covers', m['id'] + '.jpg'); still(float(c['at']), out); print(out)
    if c.get('style') == 'card':
        cut = os.path.join(HERE, 'assets', 'covers', m['id'] + '-cut.png')
        r = subprocess.run(['swift', os.path.join(ROOT, 'studio', 'tools', 'cutout.swift'), out, cut, 'person'], capture_output=True, text=True)
        print(cut, (r.stdout.strip().splitlines() or [''])[-1], r.stderr.strip()[:200])
