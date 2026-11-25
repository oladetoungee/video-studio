# setedge.py <slug> id.key=value ...   (key: in, out, cutN.a, cutN.b, biteN.in, biteN.out)
import json, sys
f = '/Users/gbemi/Desktop/CODE/videos/projects/' + sys.argv[1] + '/talking-head/talking-head.json'; m = json.load(open(f))
for a in sys.argv[2:]:
    lhs, v = a.split('='); id, key = lhs.split('.', 1); v = round(float(v), 2)
    mo = next(x for x in m['moments'] if x['id'] == id)
    if key in ('in', 'out'): old = mo[key]; mo[key] = v
    elif key.startswith('cut'):
        j, s = key[3:].split('.'); c = mo['cuts'][int(j)]; k = 0 if s == 'a' else 1; old = c[k]; c[k] = v
    elif key.startswith('bite'):
        j, s = key[4:].split('.'); b = mo['bites'][int(j)]; k = 0 if s == 'in' else 1
        if isinstance(b, list): old = b[k]; b[k] = v
        else: old = b[s]; b[s] = v
    print(id, key, old, '->', v)
json.dump(m, open(f, 'w'), indent=1, ensure_ascii=False)
