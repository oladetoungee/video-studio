import sys; sys.path.insert(0, sys.argv[0].rsplit('/', 1)[0]); from tools import *
slug, k = sys.argv[1], sys.argv[2]
cap = json.load(open(V + slug + '/talking-head/data/raw_words.json')); tw = turbo_words(S + k + '/raw_turbo.json')
json.dump(tw, open(S + k + '/raw_turbo_words.json', 'w'))
r, out = diff(cap, tw)
print('ratio %.3f' % r, len(out), 'diffs')
for i, (t, op, a, b, c, p) in enumerate(out): print(f"{i+1:3d} raw {t:7.2f} ({mmss(t)}) {op:7s} CAP[{a}]  TURBO[{b}]   ..{c} _ {p}")
