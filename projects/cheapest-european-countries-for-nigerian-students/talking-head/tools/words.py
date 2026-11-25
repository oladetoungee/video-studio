#!/usr/bin/env python3
"""cheapest-countries: her words on the RAW timeline (whisper tokens, t_dtw times; DTW lands ~0.1 s late -> -0.08 s),
with kit/transcripts/corrections.json + the fixes below (her real words, heard on the waveform / in the kit).
Writes talking-head/data/raw_words.json ([{w, t, e}], source seconds). A replacement with a different word count
spreads the old span over the new words."""
import json, os, re
HERE = os.path.dirname(os.path.abspath(__file__)); P = os.path.dirname(os.path.dirname(HERE))
d = json.load(open(os.path.join(P, 'kit/transcripts/transcript.json')))
W = []
for s in d['transcription']:
    for tk in s['tokens']:
        tx = tk['text']
        if tx.strip().startswith('[_') or not tx.strip():
            continue
        dt = tk['t_dtw'] / 100 if tk['t_dtw'] >= 0 else None
        if tx.startswith(' ') or not W:
            W.append({'w': tx.strip(), 'dtw': dt, 'off': tk['offsets']['from'] / 1000, 'offe': tk['offsets']['to'] / 1000})
        else:
            W[-1]['w'] += tx; W[-1]['offe'] = tk['offsets']['to'] / 1000
words = []
for w in W:
    t = (w['dtw'] - 0.08) if w['dtw'] is not None else w['off']
    words.append({'w': w['w'], 't': round(max(0, t), 3)})
for i, w in enumerate(words):
    nxt = words[i + 1]['t'] if i + 1 < len(words) else w['t'] + 0.5
    w['e'] = round(max(w['t'] + 0.06, min(nxt, w['t'] + 0.9)), 3)
FIX = [tuple(x) for x in json.load(open(os.path.join(P, 'kit/transcripts/corrections.json')))] + [
    ('Tokyo,', 'Togo,'), ('August 26th,', 'August 2026,'), ('check-in balances.', 'checks and balances.'), ('14k 480 euros', '14,480 euros'), ('115, 810', '115,810'),
    # corrected captions (FEEDBACK 2026-11-02 "the edit fixes what the recording gets wrong"; kit Q2-Q5)
    ('90 and 60 hours', '964 hours'), ('280 days in a year.', '280 half days in a year.'), ('at least 650 euros', 'at least 615 euros'),
    ('about like one five euros in a year.', 'about 1,506 euros a year.'),
    ('that japanese free', 'that Germany is free.'), ('a disclaimer the start of this video,', 'a disclaimer at the start of this video,'),
    ('embassy of the immigration', 'embassy or the immigration'), ('for Estonian for example', 'in Estonia, for example,'),
    ('Jamming is also', 'Germany is also'), ('so for two showing Germany', 'so for tuition, Germany'), ('for the fees visa and you can take it out', "for the visa, and you can't take it out"),
    ('some some exceptions', 'some exceptions'), ('pages she still shows 615', 'pages still show 615.'), ('than a France student.', 'than a French student.'),
    ('set its own and', 'sets its own,'), ('Beni,', 'Benin,'), ('when Nigeria is not', 'but Nigeria is not'),
    ("if you're trying to find out both", "if you're 24 and above"), ('if you are on the 24', 'if you are under 24'), ("if you're trying to follow older", "if you're 24 or older"),
    ("If you're only trying to fall,", "If you're under 24,"), ('check crowns', 'Czech crowns'), ('check embassy page', 'Czech embassy page'),
    ('prove of fund', 'proof of funds'), ('slot E', 'zloty'), ('2,500 slot', '2,500 zloty'), ('resident permit', 'residence permit'),
    ('paying wheelers like to total vote on paying,', 'paying… so'), ('So your program determines', 'your program determines'),
    ('170,000 corona', '170,000 kroner'), ('this full fund,', 'this proof of funds,'), ('a year or study.', 'a year of study.'),
    ('10k, 500 euros.', '10,500 euros.'), ('the all years money in their account', "the whole year's money in the account"), ('4,000, 5,200', '4,000 and 5,200'), ('10,000, 12,000', '10,000 and 12,000'),
    ('if you even wants', 'if you even want'), ('proof of fun for us right i', '…'), ('the prove of fund', 'the proof of funds'),
    ('a very strange proof of fund rules.', 'very strange proof of funds rules.'), ('the proof of fund for 2026', 'the proof of funds for 2026'),
    ('The proof of fund is', 'The proof of funds is'), ('Italy or, you know, check.', 'Italy or, you know, Czech.'), ('this proof of fund because', 'this proof of funds, because'),
]
n = lambda s: re.sub(r"[^a-z0-9%/'\-,]", '', s.lower().replace('’', "'")).strip(',')
hits = []
for old, new in FIX:
    ow = [n(x) for x in old.split()]; k = 0; hit = 0
    while k <= len(words) - len(ow):
        if [n(x['w']) for x in words[k:k + len(ow)]] == ow:
            seg = words[k:k + len(ow)]; t0, t1 = seg[0]['t'], seg[-1]['e']
            punct = re.findall(r'[.,!?"”]+$', seg[-1]['w']); nw = new.split(); out = []
            for j, s_ in enumerate(nw):
                a = t0 + (t1 - t0) * j / len(nw); b = t0 + (t1 - t0) * (j + 1) / len(nw)
                if len(nw) == len(seg): a, b = seg[j]['t'], seg[j]['e']
                out.append({'w': s_, 't': round(a, 3), 'e': round(b, 3)})
            if punct and not re.search(r'[.,!?]$', out[-1]['w']): out[-1]['w'] += punct[0]
            words[k:k + len(ow)] = out; hit += 1; k += len(nw)
        else: k += 1
    hits.append((old, hit))
for w in words:   # 'stay,' is said 501.64-502.04 (waveform); whisper put it after the Czech cut start
    if w['w'] == 'stay,' and abs(w['t'] - 501.72) < 0.05: w['t'], w['e'] = 501.62, 502.04
for w in words:   # 'Germany is free.' (whisper: 'japanese free'): times read on the waveform
    if w['w'] == 'Germany' and abs(w['t'] - 8.70) < 0.3: w['t'], w['e'] = 8.62, 9.02
    if w['w'] == 'is' and 8.9 < w['t'] < 9.6 and w['e'] < 10.5: w['t'], w['e'] = 9.04, 9.40
    if w['w'] == 'free.' and 9.3 < w['t'] < 10.4: w['t'], w['e'] = 9.42, 9.95
for w in words:   # 2026-11-07 caption check: 'own,' is said before the cut (waveform: speech to 349.35, silence 349.36-349.77); 'which' is said at 502.13-502.23, inside the Czech cut
    if w['w'] == 'own,' and abs(w['t'] - 349.54) < 0.05: w['t'], w['e'] = 349.12, 349.34
    if w['w'] == 'its' and abs(w['t'] - 348.9) < 0.05: w['e'] = 349.1
    if w['w'] == 'which' and abs(w['t'] - 502.0) < 0.05: w['t'], w['e'] = 502.13, 502.23
for w in words:   # 'in a year.' (FIX spread its times into the pause the edit removes, so 'year' fell out of the caption): waveform 190.30-191.05
    if w['w'] == 'in' and abs(w['t'] - 190.54) < 0.02: w['t'], w['e'] = 190.30, 190.45
    if w['w'] == 'a' and abs(w['t'] - 190.887) < 0.02: w['t'], w['e'] = 190.45, 190.55
    if w['w'] == 'year.' and abs(w['t'] - 191.233) < 0.02: w['t'], w['e'] = 190.55, 191.0
CUTS = [[5.36, 7.37], [31.37, 32.40], [137.27, 144.25], [349.48, 352.66], [361.07, 371.42], [502.08, 504.85]]
for w in words:   # a word said before a cut ends before it (whisper stretches the last word into the pause)
    for a, b in CUTS:
        if w['t'] < a < w['e']: w['e'] = round(max(w['t'] + 0.05, a - 0.02), 3)
# 2026-11-07 caption check: a word whose whisper start sits inside a pause the edit removes (data/edl.json, full) fell out of the
# captions ("the feed that never" without "stops"). Snap it to the nearer kept edge (its sound is there; whisper only stretched it).
try:
    _clips = json.load(open(os.path.join(P, 'talking-head/data/edl.json')))['full']['clips']
    _man = json.load(open(os.path.join(P, 'talking-head/talking-head.json'))); _cuts = _man['moments'][0].get('cuts') or []
    for w in words:
        if w['t'] < _clips[0][0] or w['t'] > _clips[-1][1] or any(a <= w['t'] < b for a, b in _cuts): continue
        if any(a - 0.02 <= w['t'] + 0.02 < b for a, b in _clips): continue
        prv = max((c for c in _clips if c[1] <= w['t'] + 0.02), key=lambda c: c[1], default=None); nxt = min((c for c in _clips if c[0] >= w['t']), key=lambda c: c[0], default=None)
        if prv and (not nxt or w['t'] - prv[1] <= nxt[0] - w['t']): w['t'], w['e'] = round(prv[1] - 0.16, 3), round(prv[1] - 0.03, 3)
        elif nxt: w['t'] = round(nxt[0] + 0.02, 3); w['e'] = max(w['e'], w['t'] + 0.1)
except FileNotFoundError: pass
json.dump(words, open(os.path.join(P, 'talking-head/data/raw_words.json'), 'w'), indent=0)
print(len(words), 'words;', 'not found:', [o for o, h in hits if not h])

# ---------- 2026-11-20 caption accuracy pass (CHECKS.md caption-accuracy: whisper large-v3-turbo on the raw sound, every
# moment's rendered voice and short clips around each difference, small.en as a second opinion). Only clear errors change;
# her own wording stays. Diff files: talking-head/build/captioncheck-2026-11-20/.
def _put(words, i0, i1, new, t0=None, t1=None):
    seg = words[i0:i1]; a0 = seg[0]['t'] if t0 is None else t0; b0 = seg[-1]['e'] if t1 is None else t1; nw = new.split()
    if t0 is None and t1 is None and len(nw) == len(seg): words[i0:i1] = [{'w': s, 't': q['t'], 'e': q['e']} for s, q in zip(nw, seg)]; return   # same count: each word keeps its own time
    words[i0:i1] = [{'w': s, 't': round(a0 + (b0 - a0) * j / len(nw), 3), 'e': round(a0 + (b0 - a0) * (j + 1) / len(nw), 3)} for j, s in enumerate(nw)]
def _find(words, seq, near):
    ws = seq.split()
    for i in range(len(words) - len(ws) + 1):
        if [x['w'] for x in words[i:i + len(ws)]] == ws and abs(words[i]['t'] - near) < 1.5: return i
    print('NOT FOUND (11-20):', seq); return None
words = json.load(open(os.path.join(P, 'talking-head/data/raw_words.json')))
for seq, near, new, t0, t1 in [
    ('this cost', 76.94, 'these costs', 76.94, 77.5),                                   # 1:17 (turbo x2: "change these costs tuition fee")
    ('…', 468.1, 'proof of funds for Austria is high.', 468.1, 469.85),                  # 7:47 was "…" (turbo: "maybe yeah, proof of fund for Austria is high")
    ('paying… so,', 596.68, "paying way less, like two-third of what I'm paying. So,", None, None),   # 9:57 was "paying… so," (turbo x2, raw + clip)
    ('charging to', 603.72, 'charging tuition to', 603.30, 604.74),                     # 10:03 "started charging tuition to students" (turbo + small.en clip)
    ('Now starting in', 530.04, 'Now, studying in', None, None),                        # 8:50 (turbo x2: "Now, studying in Estonia")
]:
    i = _find(words, seq, near)
    if i is not None: _put(words, i, i + len(seq.split()), new, t0, t1)
for w in words:   # "a good one." ends before sh06 starts (472.75): whisper stretched it to the next word, so it showed in sh06
    if w['w'] == 'one' and abs(w['t'] - 472.30) < 0.05: w['e'] = 472.6
    if w['w'] == 'think.' and abs(w['t'] - 611.08) < 0.05: w['e'] = 611.4   # the teaser's silent gaps (source 611.5) showed a stray "think"
# words whose start sits in a silence an edit trimmed are DROPPED by the engine ("change these [costs]", "description [box.]"):
# move them onto her voice next to them (every moment's clips in data/edl.json; run footedl before words.py)
EDL = json.load(open(os.path.join(P, 'talking-head/data/edl.json'))); MAN = json.load(open(os.path.join(P, 'talking-head/talking-head.json')))
manual = [c for mo in MAN['moments'] for c in (mo.get('cuts') or [])] + [c for mo in MAN['moments'] for b in (mo.get('bites') or []) if isinstance(b, dict) for c in (b.get('cuts') or [])]
def _kept(w, a, b): return (w['t'] >= a - 0.08 and w['t'] < b - 0.03) or (min(w['e'], b) - max(w['t'], a) >= 0.5 * max(0.05, w['e'] - w['t']))
moved = 0
for k_, v in EDL.items():
    cl = v['clips']
    for i in range(len(cl) - 1):
        b, a2 = cl[i][1], cl[i + 1][0]
        if a2 - b > 3: continue
        mo_ = next((m for m in MAN['moments'] if m['id'] == k_), {})
        if mo_.get('kind') == 'teaser':   # between two bites = cut on purpose; only pauses inside one bite count
            rng = [(x[0], x[1]) if isinstance(x, list) else (x.get('in'), x.get('out')) for x in mo_.get('bites', []) if isinstance(x, list) or 'in' in x]
            if not any(r0 - 0.05 <= b and a2 <= r1 + 0.05 for r0, r1 in rng): continue
        for w in words:
            if b - 0.03 <= w['t'] < a2 - 0.08 and not _kept(w, *cl[i]) and not _kept(w, *cl[i + 1]):
                if any(c[0] <= w['t'] < c[1] for c in manual): continue
                d = w['e'] - w['t']
                if w['t'] - b < a2 - w['t']: w['t'] = round(b - 0.04 - min(d, 0.25), 3); w['e'] = round(b - 0.04, 3)
                else: w['t'] = round(a2 + 0.01, 3); w['e'] = round(a2 + 0.01 + max(0.08, min(d, 0.3)), 3)
                moved += 1; print('moved onto her voice:', k_, w)
json.dump(words, open(os.path.join(P, 'talking-head/data/raw_words.json'), 'w'), indent=0)
print(len(words), 'words after the 2026-11-20 caption pass;', moved, 'moved out of trimmed silences')
