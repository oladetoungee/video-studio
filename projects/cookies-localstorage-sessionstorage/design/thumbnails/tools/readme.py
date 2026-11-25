#!/usr/bin/env python3
"""Rewrites the score table in README.md from every directions/*/content.json (kind, words, scores, titles)."""
import json, os, glob
R = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
rows = []
for p in sorted(glob.glob(os.path.join(R, 'directions', '*', 'content.json'))):
    c = json.load(open(p)); n = os.path.basename(os.path.dirname(p))
    rows.append(f"| {n[:2]} | {c.get('thumbnail_text','')} | {c.get('kind','')}{' · **recommended**' if c.get('recommended') else ''} | {c.get('scores','not scored yet')} | {' / '.join(c.get('titles', []))} |")
head = open(os.path.join(R, 'README.head.md')).read() if os.path.exists(os.path.join(R, 'README.head.md')) else '# thumbnails\n'
tail = open(os.path.join(R, 'README.tail.md')).read() if os.path.exists(os.path.join(R, 'README.tail.md')) else ''
open(os.path.join(R, 'README.md'), 'w').write(head + '\n| # | Words on it | Kind | Scores | Titles (1 = best pair) |\n|---|---|---|---|---|\n' + '\n'.join(rows) + '\n\n' + tail)
print(len(rows), 'rows')
