#!/usr/bin/env python3
"""Words of a moment on its OUTPUT timeline (after the EDL's cuts): python3 tools/outwords.py m01"""
import json, sys, os
H = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
W = json.load(open(os.path.join(H, 'data/raw_words.json'))); E = json.load(open(os.path.join(H, 'data/edl.json')))
for mid in sys.argv[1:]:
    clips = E[mid]['clips']; o = 0; out = []
    for a, b in clips:
        for w in W:
            if a - 0.02 <= w['t'] < b - 0.03: out.append((o + max(0, w['t'] - a), w['w']))
        o += b - a
    print(f"== {mid} {E[mid]['dur']:.2f}s")
    line = ''
    for t, w in out:
        line += f"{w}@{t:.2f} "
        if len(line) > 150 or w.endswith(('.', '?')): print('  ' + line); line = ''
    if line: print('  ' + line)
