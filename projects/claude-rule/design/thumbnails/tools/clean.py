#!/usr/bin/env python3
"""Clean the Vision cut-outs (assets/cut/raw/*.png -> assets/cut/*.png).

Vision leaves the chair behind her shoulders at partial opacity (a grey ghost on flat grounds) and soft halos
around moving hands. We re-map alpha so only confident pixels stay (lo..hi -> 0..1), then soften 1.5 px.
Optional per-file polygons in tools/clean.json (in cut pixels): "sub" removes what survives, "add" fills pinholes.
Her image is never flipped or retouched; only the mask changes.

  python3 tools/clean.py            -> every raw cut-out
  python3 tools/clean.py f_68.07    -> one
"""
import os, sys, json, glob, numpy as np
from PIL import Image, ImageDraw, ImageFilter
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RAW, OUT = os.path.join(ROOT, 'assets/cut/raw'), os.path.join(ROOT, 'assets/cut')
cfg = json.load(open(os.path.join(ROOT, 'tools/clean.json'))) if os.path.exists(os.path.join(ROOT, 'tools/clean.json')) else {}
only = sys.argv[1:]
for p in sorted(glob.glob(os.path.join(RAW, 'f_*.png'))):
    name = os.path.basename(p)[:-4]
    if only and name not in only: continue
    c = cfg.get(name, {}); lo, hi = c.get('lo', 0.5), c.get('hi', 0.85)
    im = Image.open(p).convert('RGBA'); a = np.asarray(im.getchannel('A'), np.float32) / 255
    a = np.clip((a - lo) / (hi - lo), 0, 1)
    m = Image.fromarray((a * 255).astype(np.uint8))
    d = ImageDraw.Draw(m)
    for poly in c.get('sub', []): d.polygon([tuple(q) for q in poly], fill=0)
    for poly in c.get('add', []): d.polygon([tuple(q) for q in poly], fill=255)   # pinholes (earring gaps)
    m = m.filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(1.5))
    im.putalpha(m); im.save(os.path.join(OUT, name + '.png'), optimize=True)
    print(name, 'ok')
