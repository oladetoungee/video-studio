import sys; sys.path.insert(0, sys.argv[0].rsplit('/', 1)[0]); from tools import *
slug, k = sys.argv[1], sys.argv[2]; ids = sys.argv[3:]
man = json.load(open(V + slug + '/talking-head/talking-head.json'))
for mo in man['moments']:
    id = mo['id']
    if ids and id not in ids: continue
    m = json.load(open(S + k + f'/meta_{id}.json')); caps = m['captions']['short'] if isinstance(m.get('captions'), dict) else m[[x for x in m if x.startswith('captions')][0]]
    cw = []
    for c in caps:
        ws = c['text'].split()
        for j, x in enumerate(ws): cw.append({'w': x, 't': c['t0'] + (c['t1'] - c['t0']) * j / max(1, len(ws))})
    fs = [f for f in glob.glob(S + k + '/mom/*.turbo.json') if os.path.basename(f).split('.')[0].endswith(m.get('slug', '#')) or os.path.basename(f).split('.')[0] == ('talkinghead-' + id)]
    if not fs: print('== ', id, 'NO TURBO FILE', m.get('slug')); continue
    tw = turbo_words(fs[0]); r, out = diff(cw, tw)
    print('==', id, os.path.basename(fs[0]), len(cw), 'caption words', len(tw), 'heard', 'ratio %.3f' % r, 'dur %.1f' % m.get('TOTAL', 0))
    for (t, op, a, b, c, p) in out: print(f"  {mmss(t)} {op:7s} CAP[{a}] HEARD[{b}]  ..{c} _ {p}")
