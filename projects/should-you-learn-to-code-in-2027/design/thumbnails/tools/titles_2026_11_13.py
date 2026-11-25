# Titles per thumbnail (set 3, 2026-11-13): 2-3 each, 40-60 characters, main keyword in the first 40; 2027 main, 2026 variant.
import json, os
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
T = {'A': "Should You Still Learn to Code in 2027? A Developer's Answer", 'B': "Should I Learn to Code in 2027? 4 Skills That Matter Now",
     'C': "Junior Developer Jobs Are Rare. Should You Still Code?", 'D': "Learn to Code With AI: 4 Skills Beginners Need Now",
     'E': "Is Learning to Code Still Worth It in 2027? (Honest Answer)", 'F': "AI Writes the Code Now. These 4 Skills Still Matter",
     'G': "Coding With AI? Learn to Read the Code It Writes", 'H': "Only 4.5% of Developer Job Posts Are Entry Level. Now What?",
     'K': "AI Can Build Apps Now. Should You Still Learn to Code?"}
P = {'01': 'CAH', '02': 'FDB', '03': 'CEA', '04': 'GDB', '05': 'AEC', '06': 'HCB'}
for k, v in T.items(): assert 40 <= len(v) <= 60, (k, len(v))
for d in sorted(os.listdir(os.path.join(ROOT, 'directions'))):
    p = os.path.join(ROOT, 'directions', d, 'content.json')
    if not os.path.exists(p) or d[:2] not in P: continue
    c = json.load(open(p)); ts = [T[x] for x in P[d[:2]]]
    c['titles'] = ts; c['title'] = ts[0]; c['titles_2026'] = [t.replace('2027', '2026') for t in ts if '2027' in t]
    c.setdefault('recommended', False)
    json.dump(c, open(p, 'w'), indent=1, ensure_ascii=False)
print('titles ok')
