#!/usr/bin/env python3
"""cheapest-countries: writes the moments, pauses, sound roles and look settings into talking-head.json (keeps images).
Raw (source) seconds everywhere. Shorts: kit section 3; in/out snapped to her words (in = first word - 0.1, out < next word - 0.04)."""
import json, os
TH = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
mf = os.path.join(TH, 'talking-head.json'); m = json.load(open(mf)); W = json.load(open(os.path.join(TH, 'data/raw_words.json')))
CUTS = [[5.36, 7.37], [31.37, 32.40], [137.27, 144.25], [349.48, 352.66], [361.07, 371.42], [502.08, 504.85]]
def snap_in(t): w = min(W, key=lambda x: abs(x['t'] - t)); return round(w['t'] - 0.1, 2)
def snap_out(t):
    nxt = [x for x in W if x['t'] > t - 0.02]; return round(min(t, nxt[0]['t'] - 0.04) if nxt else t, 2)
SH = [  # id, slug, label (top title), raw in, raw out, music start
 ('sh01', 'proof-of-funds', 'What is proof of funds for a student visa?', 41.76, 75.5, 4.0),
 ('sh02', 'germany', "Studying in Germany is free. The proof of funds isn't", 112.40, 208.7, 13.0),
 ('sh03', 'france', 'Studying in France: the 2026 changes', 208.80, 301.1, 22.0),
 ('sh04', 'italy', 'Studying in Italy: fees based on family income', 326.08, 398.4, 31.0),
 ('sh05', 'austria', 'Studying in Austria: why your age matters', 398.46, 472.6, 40.0),
 ('sh06', 'czech-poland', 'Czech Republic and Poland: what students pay', 473.28, 529.9, 49.0),
 ('sh07', 'estonia', 'Studying in Estonia: what I pay', 532.14, 600.9, 58.0),
 ('sh08', 'norway-finland', 'Norway and Finland: tuition for non-EU students', 601.12, 675.6, 7.0),
 ('sh09', 'cheapest', 'Cheapest country to study in Europe for Nigerians', 692.22, 734.2, 16.0),
]
moments = [{'id': 'full', 'kind': 'full', 'slug': 'full', 'title': 'The whole video, cleaned, with graphics (A · Price Check)', 'in': 0, 'out': 'end',
            'retakes': False, 'cuts': CUTS, 'script': 'moments/full.js', 'music': ['480', 0.0], 'captionStyle': 'shorts',
            'note': 'cuts = opening trim (kit Q1), CLEANUP 1-4 (cut 4 widened 2026-11-07 to drop the leftover "for a … funds"), Czech "$6,000" (kit Q7). Optional CLEANUP cut 711.97-715.95 NOT applied.'}]
for i, sl, lab, a, b, ms in SH:
    a2, b2 = snap_in(a), snap_out(b)
    moments.append({'id': i, 'kind': 'short', 'slug': sl, 'title': lab, 'label': lab, 'sublabel': '', 'in': a2, 'out': b2,
                    'cuts': [c for c in CUTS if c[0] > a2 and c[1] < b2], 'script': 'shorts/' + i + '.js', 'music': ['175', ms], 'tail': 0.5, 'endCard': False})
old = {x['id']: x for x in m.get('moments', [])}
# 2026-11-10 (rollout): keep the shorts' format, title, cover and ending set by hand / in the studio
for x in moments:
    for k in ('fmt', 'frame9', 'topLabel', 'label', 'cover', 'poster', 'outroCard'):
        if k in old.get(x['id'], {}): x[k] = old[x['id']][k]
    # 2026-11-12 (board formats): the board number, the one punch-in, and the shorts' own speech cuts (sh05 "older than 24 and maybe yeah", sh07 the unclear "friends ... paying", sh09 "how do I say ... checking")
    for k in ('board', 'punch', 'fonts', 'colours'):   # + 2026-11-12 font-board ids
        if k in old.get(x['id'], {}): x[k] = old[x['id']][k]
    for c in old.get(x['id'], {}).get('cuts', []):
        if c not in x['cuts']: x['cuts'].append(c)
if 'teaser' in old: moments.append(old['teaser'])
m['moments'] = moments
m['common'] = ['assets/src/clips.js', '../film/scenes/pckit.js', '../film/scenes/pcsent.js', 'moments/common.js', 'moments/visuals.js', 'moments/plan.js', 'moments/formats.js', 'moments/boards.js']
m['pad'] = '#E4E6E3'; m['frame9'] = m.get('frame9', '3x4'); m['videoTitle'] = 'Cheapest Countries to Study in Europe for Nigerians (2027)'
m['pauses'] = [{'id': 'fix-964', 'at': 305.94, 'd': 4.5, 'text': 'Correction: students in France can work up to 964 hours a year\n(60 % of the legal working year).'}]
m['audio']['sfx'] = {'palette': True, 'gainDb': 8, 'roles': {
  'shutter': {'files': ['library:shutter-hard-click'], 'align': 'peak', 'db': -4},
  'bell': {'files': ['library:bell-service-ding'], 'align': 'peak', 'db': -6},
  'pop': {'files': ['library:pop-dry', 'library:pop-hard-click'], 'align': 'peak', 'db': -5},
  'ast': {'files': ['library:pop-hard-click'], 'align': 'peak', 'db': -4},
  'sticker': {'files': ['library:wood-hard-hit', 'library:punch-soft-quick'], 'align': 'peak', 'db': -2},
  'marker': {'files': ['library:marker-line'], 'align': 'start', 'db': -6, 'maxlen': 0.7},
  'paper': {'files': ['library:card-place', 'library:paper-quick-move'], 'align': 'peak', 'db': -3},
  'tick': {'files': ['library:ui-select-click', 'library:click-classic', 'library:switch-tap'], 'align': 'peak', 'db': -5},
  'coins': {'files': ['library:coins-clinking'], 'align': 'start', 'db': -8, 'maxlen': 0.9},
  'scan': {'files': ['library:ui-device-click', 'library:ui-click-tone'], 'align': 'peak', 'db': -5}}}
json.dump(m, open(mf, 'w'), indent=1, ensure_ascii=False)
for x in moments: print(x['id'], x.get('in'), x.get('out'), x.get('cuts'))
