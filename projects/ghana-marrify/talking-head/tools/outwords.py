#!/usr/bin/env python3
"""her words on a moment's OUTPUT timeline (after the EDL), for planning beats:  python3 tools/outwords.py m01"""
import json, os, sys
H = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
W = json.load(open(os.path.join(H, 'data/raw_words.json'))); E = json.load(open(os.path.join(H, 'data/edl.json')))
for mid in sys.argv[1:]:
    clips = E[mid]['clips']; o = 0; line = []; print(f'== {mid}  {E[mid]["dur"]:.1f} s  cuts at', end=' ')
    cum = []
    for a, b in clips: cum.append(o); o += b - a
    print(', '.join(f'{c:.2f}' for c in cum[1:]))
    for k, (a, b) in enumerate(clips):
        for w in W:
            if a - 0.08 <= w['t'] < b - 0.03:
                line.append(f"{w['w']}@{cum[k] + max(0, w['t'] - a):.2f}")
                if len(line) == 9: print('  '.join(line)); line = []
    print('  '.join(line))
