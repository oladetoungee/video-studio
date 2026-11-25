#!/usr/bin/env python3
"""Write every thumbnail direction (index.html + content.json) for database-indexes.
   python3 tools/gen.py [prefix ...] [--reset]
index.html is always rewritten (layout). content.json is only written when missing, or with --reset, so her studio edits
(texts, photos, colours, nudges) are kept. Then: node render.mjs
Her photos: warm-graded frames from kit/database indexes.mov (tools/frames.sh + tools/warm.py), never flipped;
person cut-outs by macOS Vision (tools/cutout_full.swift), aligned 1:1 with the frame."""
import json, os, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DIRS = os.path.join(ROOT, 'directions')
FACES = {}
for line in open(os.path.join(ROOT, 'tools', 'faces.txt')):
    p = line.split()
    FACES[p[0][2:]] = (int(p[6]), int(p[8]), int(p[10]))  # x, y, w (2560x1440 frame)


def place(fr, cx, cy, fw, cover=True):
    """vars that put frame fr's face centre at (cx, cy) with face width fw (thumbnail px). With cover, the face is made
    bigger (never smaller) and then moved as little as needed so the photo always fills the 1280x720 frame."""
    x, y, w = FACES[fr]
    fx, fy = x + w / 2, y + w / 2
    k = fw / w
    if cover:
        k = max(k, 1280 / 2560, cx / fx, (1280 - cx) / (2560 - fx), cy / fy, (720 - cy) / (1440 - fy))
    px, py = cx - fx * k, cy - fy * k
    if cover:
        px = min(0, max(1280 - 2560 * k, px)); py = min(0, max(720 - 1440 * k, py))
    return {'--pw': f'{round(2560 * k)}px', '--px': f'{round(px)}px', '--py': f'{round(py)}px'}


SCENE = lambda fr: f'../../assets/scene/f_{fr}.jpg'
CUT = lambda fr: f'../../assets/cut/f_{fr}.png'

# ---------- drawn props (flat, an illustration) ----------
def db(fill='#FFFDF6', stroke='#0E1013', sw=7):
    return (f'<svg viewBox="-4 -4 128 158" width="100%" height="100%"><path d="M6 24 v102 a54 18 0 0 0 108 0 v-102" fill="{fill}" stroke="{stroke}" stroke-width="{sw}"/>'
            f'<ellipse cx="60" cy="24" rx="54" ry="18" fill="{fill}" stroke="{stroke}" stroke-width="{sw}"/>'
            f'<path d="M6 58 a54 18 0 0 0 108 0 M6 92 a54 18 0 0 0 108 0" fill="none" stroke="{stroke}" stroke-width="{sw}"/></svg>')

def spinner(c='#F23D2E', bg='rgba(14,16,19,.15)'):
    return (f'<svg viewBox="0 0 100 100" width="100%" height="100%"><circle cx="50" cy="50" r="38" fill="none" stroke="{bg}" stroke-width="11"/>'
            f'<path d="M50 12 a38 38 0 0 1 38 38" fill="none" stroke="{c}" stroke-width="11" stroke-linecap="round"/></svg>')

X = '<svg viewBox="0 0 10 10"><path d="M2.2 2.2L7.8 7.8M7.8 2.2L2.2 7.8" stroke="#fff" stroke-width="1.9" stroke-linecap="round"/></svg>'
OK = '<svg viewBox="0 0 10 10"><path d="M1.8 5.3L4 7.5 8.4 2.7" fill="none" stroke="#fff" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/></svg>'

def mk(kind, x, y, s=84, extra=''):
    return f'<div class="mk {kind}" style="left:{x}px;top:{y}px;--bs:{s}px;{extra}">{X if kind == "x" else OK}</div>'

def rows(n, start, hit=None, cols=('id', 'title', 'author_id'), faded_from=None):
    out = [f'<div class="r h">' + ''.join(f'<span>{c}</span>' for c in cols) + '</div>']
    for i in range(n):
        rid = start + i
        aid = [6, 3, 17, 53, 9, 35, 50, 7, 29, 49, 47, 33, 34, 12, 8, 21, 40, 2][i % 18]
        if hit is not None and i == hit: aid = 42
        cls = ' hit' if hit is not None and i == hit else ''
        out.append(f'<div class="r{cls}"><span>{rid}</span><span>book #{rid}</span><span>{aid}</span></div>')
    return ''.join(out)

def page(head, body, style, fonts=('di',), script=''):
    return ('<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../../lib/di.css"><style>' + style +
            '</style></head><body><div class="t">' + body + '</div>' + script + '<script src="../../lib/bind.js"></script></body></html>')

D = {}

exec(open(os.path.join(ROOT, 'tools', 'dirs.py')).read())


def main():
    args = sys.argv[1:]; reset = '--reset' in args; only = [a for a in args if not a.startswith('--')]
    for name, d in D.items():
        if only and not any(name.startswith(o) for o in only): continue
        p = os.path.join(DIRS, name); os.makedirs(p, exist_ok=True)
        open(os.path.join(p, 'index.html'), 'w').write(page(name, d['body'], '.t{' + ''.join(f'{k}:{v};' for k, v in d['vars'].items()) + '}' + d['style']))
        cj = os.path.join(p, 'content.json')
        if reset or not os.path.exists(cj):
            c = {k: d[k] for k in ('direction', 'concept', 'thumbnail_text', 'title', 'titles', 'text', 'images') if k in d}
            for k in ('sample', 'frame', 'recommended'):
                if k in d: c[k] = d[k]
            c['vars'] = {}
            json.dump(c, open(cj, 'w'), indent=2, ensure_ascii=False)
        print(name)


if __name__ == '__main__':
    main()
