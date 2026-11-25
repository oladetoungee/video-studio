"""Gate scores per direction (fresh critics each round, see NOTES.md). Writes "scores" + "recommended" into each content.json.
  python3 tools/scores.py
a = image only: topic confidence /5 and click /10 · b = with its main title in a mocked feed: clarity /10 and click /10 · c = taste vs her references /10"""
import json, os
T = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
A = {1: ['4/5', '4/6'], 2: ['4/7', '4/7'], 3: ['2/4', '2/5'], 4: ['3/6', '4/7'], 5: ['2/4', '3/6'], 6: ['5/6', '4/5'], 7: ['4/5', '4/6'], 8: ['3/5', '4/7'],
     10: ['5/7', '4/6'], 11: ['3/5', '3/4'], 12: ['3/6', '2/5'], 13: ['4/6', '4/5'], 14: ['4/6', '4/6'], 15: ['5/7', '4/6'], 16: ['4/7', '4/7'], 18: ['5/8', '4/7'],
     19: ['4/7', '3/6'], 20: ['2/5', '4/7'], 21: ['4/6', '3/5'], 22: ['4/3', '4/5'], 23: ['3/4', '4/7']}
B = {1: ['7/6', '6/6'], 2: ['8/7', '8/7'], 3: ['8/7', '8/8'], 4: ['7/7', '6/6'], 5: ['7/6', '8/7'], 6: ['5/4', '6/4'], 7: ['6/5', '8/6'], 8: ['8/8', '8/7'],
     10: ['6/6', '6/5'], 11: ['8/7', '8/5'], 12: ['8/8', '7/8'], 13: ['9/7', '9/6'], 14: ['7/7', '7/5'], 15: ['8/7', '8/6'], 16: ['7/8', '7/7'], 18: ['8/8', '8/7'],
     19: ['9/8', '9/8'], 20: ['6/6', '7/6'], 21: ['8/7', '8/7'], 22: ['5/4', '4/4'], 23: ['7/5', '8/6']}
C = {1: ['3', '4'], 2: ['5', '5'], 3: ['3', '5'], 4: ['5', '6'], 5: ['4', '7'], 6: ['7', '6'], 7: ['5', '6'], 8: ['4', '6'], 10: ['6', '2'], 11: ['6', '7'],
     12: ['3', '5'], 13: ['2', '6'], 14: ['2', '8'], 15: ['5', '5'], 16: ['6', '5'], 18: ['6', '6'], 19: ['5', '7'], 20: ['6', '8'], 21: ['3', '-'], 22: ['7', '8'], 23: ['5', '8']}
R3 = {}   # filled after round 3: n -> (a, b, c)
REC = set()
if os.path.exists(os.path.join(T, 'tools', 'scores_r3.json')):
    d = json.load(open(os.path.join(T, 'tools', 'scores_r3.json'))); R3 = {int(k): v for k, v in d['r3'].items()}; REC = set(d['recommended'])
for name in sorted(os.listdir(os.path.join(T, 'directions'))):
    p = os.path.join(T, 'directions', name, 'content.json')
    if not os.path.exists(p): continue
    n = int(name[:2]); c = json.load(open(p)); r3 = R3.get(n, ['-', '-', '-'])
    c['scores'] = f"a {' · '.join(A[n] + [r3[0]])} | b {' · '.join(B[n] + [r3[1]])} | c {' · '.join(C[n] + [r3[2]])}"
    c['recommended'] = n in REC
    json.dump(c, open(p, 'w'), indent=2, ensure_ascii=False); print(name, c['scores'], 'REC' if c['recommended'] else '')
