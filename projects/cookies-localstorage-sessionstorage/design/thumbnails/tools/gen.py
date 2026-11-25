#!/usr/bin/env python3
"""Writes the first version of every thumbnail direction (index.html + content.json): set 2 (2026-11-07), look A colours + type set 03.
   python3 tools/gen.py            -> writes index.html for all; content.json only where it does not exist yet
   python3 tools/gen.py --force 03 -> also overwrites content.json of directions starting with 03 (loses studio edits!)
Once Gbemi edits a design in the studio, content.json is hers: never --force it (freeze this file after the first critic round)."""
import json, os, sys, re

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
A = '../../assets'
force = '--force' in sys.argv
only = [a for a in sys.argv[1:] if not a.startswith('--')]

T = {
 1: 'localStorage vs sessionStorage vs Cookies (What Goes Where)',
 2: 'Cookies vs localStorage vs sessionStorage: Which to Use?',
 3: 'Local Storage vs Session Storage vs Cookies (Shop Example)',
 4: 'Session Storage vs Local Storage: Why Your Form Disappeared',
 5: 'What Are Browser Cookies? How Websites Remember You',
 6: 'Why Websites Need Cookies (HTTP Is Stateless)',
 7: 'localStorage vs Cookies: Who Can Read Your Data?',
 8: 'Why Your Cart Stays but Your Checkout Form Disappears',
 9: 'What Survives When You Close a Tab? Cookies vs Storage',
 10: 'Any Script on Your Page Can Read Your localStorage',
 11: "How Does a Website Know It's You? Cookies Explained",
}
# her frames (raw recording seconds), set after looking at the contact sheet; never flipped
F = json.load(open(os.path.join(ROOT, 'tools', 'frames.json'))) if os.path.exists(os.path.join(ROOT, 'tools', 'frames.json')) else {}

def her(name, style, cls=''):
    """her own photo (library/her-photos), cut out, no outline"""
    return f'<img class="cut {cls} z3" data-img="me" data-move="her" src="{A}/cut/{name}-cut.png" style="{style}" alt="">'
def photo(name, style):
    """her own photo as the full background"""
    src = 'headshot.png' if name == 'headshot' else 'seated.jpg'
    return f'<img class="z1" data-img="photo" data-move="photo" src="{A}/photo/{src}" style="position:absolute;{style}" alt="">'

OK = '<svg viewBox="0 0 40 40"><path d="M9 21l7 7 15-16" fill="none" stroke="#fff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></svg>'
NO = '<svg viewBox="0 0 40 40"><path d="M11 11l18 18M29 11L11 29" stroke="#fff" stroke-width="6" stroke-linecap="round"/></svg>'
def dot(v, size): return f'<span class="dotc {v}" style="font-size:{size}px">{OK if v == "ok" else NO}</span>'
def res(k, kind, style):
    return f'<div class="res {kind} {k} z5" data-k="{k}" data-move="{k}" style="{style}"></div>'
def form(p, n, style, empty=False, fs=30, h=62, lb=26, btn=False):
    fields = ''.join(f'<div class="f{" empty" if empty else ""}" data-k="{p}f{i}" style="font-size:{fs}px;height:{h}px"></div>' for i in range(n))
    b = f'<div class="btn" data-k="{p}btn"></div>' if btn else ''
    return f'<div class="form z4" data-move="{p}form" style="{style}"><div class="lb" data-k="{p}lb" style="font-size:{lb}px"></div>{fields}{b}</div>'
def tab(style, fs=34, xon=True, k='tab'):
    return (f'<div class="tab z4" data-move="{k}" style="{style};font-size:{fs}px"><span class="dot"></span><span class="tt" data-k="{k}"></span>'
            f'<span class="x{" on" if xon else ""}">×</span></div>')
CURSOR = ('<svg class="arrow z5" data-move="cursor" style="{st}" viewBox="0 0 40 56"><path d="M3 3 L3 44 L13 34 L20 51 L28 47 L21 31 L35 31 Z" '
          'fill="#fff" stroke="#0E0E0E" stroke-width="2" stroke-linejoin="round"/></svg>')
def cursor(st): return CURSOR.replace('{st}', st)
def arrow(st, d, w=10, color='#0E0E0E', k='arrow'):
    W = re.search(r'width:(\d+)px', st).group(1); H = re.search(r'height:(\d+)px', st).group(1)
    return (f'<svg class="arrow z4" data-move="{k}" style="{st}" viewBox="0 0 {W} {H}"><path d="{d}" fill="none" stroke="{color}" stroke-width="{w}" '
            f'stroke-linecap="round" stroke-linejoin="round"/></svg>')

D = []
def d(name, kind, words, titles, direction, css, body, text, images=None, vars=None, rec=False, cls=''):
    D.append(dict(name=name, kind=kind, words=words, titles=[T[i] for i in titles], direction=direction, css=css, body=body,
                  text=text, images=images or {}, vars=vars or {}, rec=rec, cls=cls))

FORM_FILLED = {'lb': 'Checkout form', 'f0': 'Ada Okafor', 'f1': 'Tartu mnt 12', 'f2': 'Tallinn'}
def ff(p, empty=False, btn=None):
    o = {p + k: v for k, v in FORM_FILLED.items()}
    if btn: o[p + 'btn'] = btn
    return o

exec(open(os.path.join(ROOT, 'tools', 'gen_directions.py')).read())

for x in D:
    if only and not any(x['name'].startswith(o) for o in only): continue
    p = os.path.join(ROOT, 'directions', x['name']); os.makedirs(p, exist_ok=True)
    html = (f'<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../../lib/ct.css"><style>\n{x["css"]}\n</style></head>'
            f'<body><div class="t {x["cls"]}">\n{x["body"]}\n</div><script src="../../lib/bind.js"></script></body></html>\n')
    open(os.path.join(p, 'index.html'), 'w').write(html)
    cj = os.path.join(p, 'content.json')
    if force or not os.path.exists(cj):
        imgs = dict(x['images'])
        for m in re.finditer(r'data-img="([^"]+)" (?:data-move="[^"]+" )?src="([^"]+)"', x['body']):
            imgs.setdefault(m.group(1), m.group(2))
        c = dict(direction=x['direction'], thumbnail_text=x['words'], titles=x['titles'], title=x['titles'][0], kind=x['kind'],
                 text=x['text'], images=imgs, vars=x['vars'])
        if x['rec']: c['recommended'] = True
        json.dump(c, open(cj, 'w'), indent=1, ensure_ascii=False)
print(len(D), 'directions')
