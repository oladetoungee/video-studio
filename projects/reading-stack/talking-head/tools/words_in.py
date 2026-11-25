#!/usr/bin/env python3
"""Print raw word timings in a range: python3 tools/words_in.py 86 128"""
import json, sys, os
W = json.load(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'data', 'raw_words.json')))
a, b = float(sys.argv[1]), float(sys.argv[2]); prev = None
for w in W:
    if a <= w['t'] <= b:
        gap = w['t'] - prev if prev else 0
        print(f"{w['t']:8.2f}-{w['e']:7.2f} {'   <' + format(gap, '.2f') + '>' if gap > 0.35 else ''} {w['w']}")
        prev = w['e']
