# film: film/data/words.json vs turbo of film/audio/voice_edit.flac; + raw words dropped by the film cut (edl-film.json)
import sys; sys.path.insert(0, sys.argv[0].rsplit('/', 1)[0]); from tools import *
slug, k = sys.argv[1], sys.argv[2]; D = V + slug + '/'
cap = json.load(open(D + 'film/data/words.json')); tw = turbo_words(S + k + '/mom/film.json')
r, out = diff(cap, tw)
print('== film', len(cap), 'caption words', len(tw), 'heard', 'ratio %.3f' % r)
for (t, op, a, b, c, p) in out: print(f"  {mmss(t)} {op:7s} CAP[{a}] HEARD[{b}]  ..{c} _ {p}")
W = json.load(open(D + 'talking-head/data/raw_words.json')); cl = json.load(open(D + 'film/data/edl-film.json'))['full']['clips']
man = json.load(open(D + 'talking-head/talking-head.json')); full = man['moments'][0]; cuts = full.get('cuts') or []
o = full['out'] if isinstance(full.get('out'), (int, float)) else 1e9
n_ = 0
for w in W:
    if not (full['in'] <= w['t'] < o) or any(a <= w['t'] < b for a, b in cuts): continue
    if not any(a - 0.02 <= w['t'] < b for a, b in cl): n_ += 1; print('FILMDROP', w)
print('film dropped words:', n_)
