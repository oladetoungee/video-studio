#!/usr/bin/env python3
"""check that every PC_SENT phrase is found in order in her words (outside the cuts), like the runtime's P()."""
import json, re, os
P = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
W = json.load(open(os.path.join(P, 'talking-head/data/raw_words.json'))); m = json.load(open(os.path.join(P, 'talking-head/talking-head.json')))
cuts = m['moments'][0]['cuts']
W = [w for w in W if not any(a <= w['t'] + 0.05 <= b for a, b in cuts)]
norm = lambda s: re.sub(r"[^a-z0-9']", '', s.lower().replace('’', "'"))
N = [norm(w['w']) for w in W]
src = open(os.path.join(P, 'film/scenes/pcsent.js')).read()
cur = 0
for k, q in re.findall(r"\n  (\w+): [\"'](.+?)[\"'],", src):
    qs = [x for x in map(norm, q.replace("\\'", "'").split()) if x]; hit = None
    for i in range(cur, len(N) - len(qs) + 1):
        if N[i:i + len(qs)] == qs: hit = i; break
    if hit is None:
        best = max(range(cur, len(N)), key=lambda i: sum(1 for j in range(min(len(qs), len(N) - i)) if N[i + j] == qs[j]))
        print('MISSING', k, '|', q, '| near:', ' '.join(N[best:best + len(qs) + 2]), round(W[best]['t'], 1))
    else: cur = hit + len(qs)
