#!/usr/bin/env python3
"""Bring the real-page crops (assets/src/index.json, written by hicap.mjs) into the manifest: every crop becomes an image
key (its name), and assets/src/index.js (const OA_SRC = {...}) is loaded before moments/common.js. Run after hicap."""
import json, os
D = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
idx = json.load(open(os.path.join(D, 'assets/src/index.json')))
open(os.path.join(D, 'assets/src/index.js'), 'w').write('/* written by tools/srcsync.py from assets/src/index.json */\nconst OA_SRC = ' + json.dumps({k: {kk: v[kk] for kk in ('w', 'h', 'lines', 'outlet', 'date', 'url', 'quote')} for k, v in idx.items()}) + ';\n')
m = json.load(open(os.path.join(D, 'talking-head.json')))
imgs = m.get('images', {}); imgs = {k: v for k, v in imgs.items() if not v.startswith('assets/src/')}
for k, v in idx.items(): imgs[k] = v['file']
m['images'] = imgs
m['common'] = ['assets/src/index.js', 'moments/common.js', 'moments/plan.js']
json.dump(m, open(os.path.join(D, 'talking-head.json'), 'w'), indent=1)
print(len(idx), 'crops')
