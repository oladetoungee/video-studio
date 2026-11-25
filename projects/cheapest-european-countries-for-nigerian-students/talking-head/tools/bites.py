#!/usr/bin/env python3
"""teaser bites (raw seconds, clean ends: out before the next word) -> talking-head.json moment 'teaser' (TEASER-PLAYBOOK v2)."""
import json, re, os
TH = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
W = json.load(open(os.path.join(TH, 'data/raw_words.json'))); n = lambda s: re.sub(r"[^a-z0-9']", '', s.lower().replace('’', "'")); N = [n(w['w']) for w in W]
def ph(q, after=0):
    qs = [n(x) for x in q.split() if n(x)]
    for i in range(len(W) - len(qs) + 1):
        if W[i]['t'] < after: continue
        if N[i:i + len(qs)] == qs:
            j = i + len(qs) - 1; nxt = W[j + 1]['t'] if j + 1 < len(W) else W[j]['e'] + 0.3
            return [round(W[i]['t'] - 0.1, 2), round(min(W[j]['e'] + 0.12, nxt - 0.04), 2)]
    raise SystemExit('not found: ' + q)
GAP = lambda d: {'gap': d, 'at': 611.5}
B = [GAP(1.0),   # lead: the topic + a 3-2-1 under it
     ph('probably told you that germany is free'), ph('and for tuition at most public universities it is'), ph('but you also have the whole proof of funds thing'),
     GAP(0.8),   # card THE REAL COST
     ph("is the money you have to show the embassy"), ph('you have to show 992 euros for every month for a year'), ph("that's about 11,904 euros", 150),
     ph('germany is also planning to raise student support rates in 2027'), ph('but from august 2026 france raised it to 47% of the french minimum wage'), ph('so france comes out about 2,500 euros more for the first year'),
     GAP(0.8),   # card THE AGE RULE
     ph("what you pay can depend on your family's income"), ph('that list includes african countries like benin ethiopia senegal togo uganda but nigeria is not on that list'),
     ph('but it also has very strange proof of funds rules'), ph('if you are under 24 you have to show 722.58 euros per month'), ph("if you're 24 and above you have to show 1,308.39 euros per month"),
     ph("i'm paying 6,000 euros a year"), ph('i noticed that it has also increased to 7k'),
     ph('norway started charging to students from outside the eu'), ph('but czech republic is literally free'),
     ph("if you're schooling in a city like paris rent is gonna choke you"),
     GAP(1.0),   # topic card
     ph("if you're under 24 austria is one of the cheapest for english-taught programs", 690)]
mf = os.path.join(TH, 'talking-head.json'); m = json.load(open(mf))
t = {'id': 'teaser', 'kind': 'teaser', 'slug': 'cheapest-countries', 'title': 'Teaser for LinkedIn and X: her best lines (A · Price Check)', 'lead': True, 'bites': B,
     'tail': 6.5, 'captionStyle': 'shorts', 'script': 'teaser/teaser.js', 'music': ['766', 0.0], 'endCard': {'title': 'Cheapest Countries to Study in Europe for Nigerians (2027)'}}
m['moments'] = [x for x in m['moments'] if x['id'] != 'teaser'] + [t]
json.dump(m, open(mf, 'w'), indent=1, ensure_ascii=False)
tot = sum((b[1] - b[0]) if isinstance(b, list) else b['gap'] for b in B); print(len(B), 'bites, about', round(tot, 1), 's + tail')
