#!/usr/bin/env python3
"""print her words with raw times in a range:  python3 tools/words_in.py 0 50"""
import json, os, sys
W = json.load(open(os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'data/raw_words.json')))
a, b = float(sys.argv[1]), float(sys.argv[2]); line = []
for w in W:
    if a <= w['t'] < b: line.append(f"{w['w']}@{w['t']:.2f}")
    if len(line) == 8: print('  '.join(line)); line = []
print('  '.join(line))
