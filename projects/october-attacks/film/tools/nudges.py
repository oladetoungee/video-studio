#!/usr/bin/env python3
"""Read the lab audit's sound-sync fails and write scenes/nudges.js ('role@t': seconds), merging with the existing nudges."""
import json, os, re
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
a = json.load(open(os.path.join(R, 'build/qa/audit_16x9.json')))
p = os.path.join(R, 'scenes/nudges.js'); s = open(p).read()
cur = json.loads(re.search(r'Object.assign\(NUDGE, (\{.*\})\);', s, re.S).group(1))
n = 0
for c in a['checks']:
    if c.get('kind') != 'sound sync' or c.get('pass'): continue
    m = re.match(r'(\w+) @ ([\d.]+) s', c['label'])
    if not m or c.get('got') is None: continue
    role, t = m.group(1), float(m.group(2)); off = (c['got'] - c['want']) / 30
    base = None
    for k, v in cur.items():
        r_, t0 = k.split('@')
        if r_ == role and abs(float(t0) + v - t) < 0.006: base = k
    if base: cur[base] = round(cur[base] + off, 3)
    else: cur[f'{role}@{t:.2f}'] = round(off, 3)
    n += 1
open(p, 'w').write('/* cue sync nudges (seconds), written by tools/nudges.py from build/qa/audit_16x9.json: the sound lands where the picture changes */\nObject.assign(NUDGE, ' + json.dumps(cur, indent=0) + ');\n')
print(n, 'nudges;', len(cur), 'in all')
