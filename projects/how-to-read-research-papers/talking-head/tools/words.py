#!/usr/bin/env python3
"""how-to-read-research-papers: her words on the RAW timeline (whisper tokens, t_dtw times = centiseconds) with the caption
corrections (kit/transcripts/corrections.json + kit 1g caption fixes). Writes talking-head/data/raw_words.json
(+ raw_words.whisper.json, the uncorrected words). A replacement with a different word count spreads the old span."""
import json, os, re
HERE = os.path.dirname(os.path.abspath(__file__)); P = os.path.dirname(os.path.dirname(HERE))
tr = json.load(open(os.path.join(P, 'kit/transcripts/transcript.json')))['transcription']
raw = []
for seg in tr:
    seg_end = seg['offsets']['to'] / 1000
    cur = None
    for tk in seg['tokens']:
        s = tk['text']
        if s.startswith('[_') or not s.strip(): continue
        t = tk['t_dtw'] / 100 if tk.get('t_dtw', -1) >= 0 else tk['offsets']['from'] / 1000
        if s.startswith(' ') or cur is None:
            cur = {'w': s.strip(), 't': round(t, 3), 'seg_end': seg_end}; raw.append(cur)
        else: cur['w'] += s.strip()
for i, w in enumerate(raw):
    nxt = raw[i + 1]['t'] if i + 1 < len(raw) else w['t'] + 0.5
    e = min(nxt - 0.02, w['t'] + 0.9)
    if nxt - w['t'] > 0.9 or w['w'][-1:] in '.?!': e = min(e, w['t'] + 0.45 + 0.04 * len(w['w']))
    w['e'] = round(max(e, w['t'] + 0.08), 3); del w['seg_end']
src = [dict(x) for x in raw]
FIX = [tuple(x) for x in json.load(open(os.path.join(P, 'kit/transcripts/corrections.json')))] + [
 ("web paper", "survey paper"), ("no-sees", "nurses"), ("cultural review", "Cochrane review"),
 ("the old papers squeezed", "the whole paper squeezed"), ("path that tells", "part that tells"), ("third path is", "third part is"),
 ("to get out with", "together with"), ("Keshev's", "Keshav's"), ("Kesha writes", "Keshav writes"), ("traffic people", "12 people"),
 ("it at these", "or at these"), ("useful parts paper", "useful parts of a paper"),
    ('product, we are more', 'product, were more'),   # 2026-11-07 caption check (whisper split "were")
]
n = lambda s: re.sub(r"[^a-z0-9%/'\-]", '', s.lower().replace('’', "'"))
words = [dict(x) for x in src]
hits = []
for old, new in FIX:
    ow = [n(x) for x in old.split()]; k = 0
    while k <= len(words) - len(ow):
        if [n(x['w']) for x in words[k:k + len(ow)]] == ow:
            seg = words[k:k + len(ow)]; t0, t1 = seg[0]['t'], seg[-1]['e']
            punct = re.findall(r'[.,!?"”]+$', seg[-1]['w']); lead = re.findall(r'^["“]', seg[0]['w'])
            nw = new.split(); out = []
            for j, s in enumerate(nw):
                a = t0 + (t1 - t0) * j / len(nw); b = t0 + (t1 - t0) * (j + 1) / len(nw)
                if len(nw) == len(seg): a, b = seg[j]['t'], seg[j]['e']
                out.append({'w': s, 't': round(a, 3), 'e': round(b, 3)})
            if punct and not re.search(r'[.,!?]$', out[-1]['w']): out[-1]['w'] += punct[0]
            if lead: out[0]['w'] = lead[0] + out[0]['w']
            words[k:k + len(ow)] = out; hits.append((old, round(t0, 2))); k += len(nw)
        else: k += 1
# hand timing fixes (measured on voice16k.wav, 50 ms frames): words whisper placed inside a cleanup cut
HAND = {('In', 134.7): (135.55, 135.7), ('his', 135.8): (135.72, 136.0), ("can't", 439.38): (441.85, 442.02), ('tell', 439.6): (442.04, 442.16), ('you', 441.62): (442.18, 442.3)}
for x in words:
    k = (x['w'], round(x['t'], 2))
    if k in HAND: x['t'], x['e'] = HAND[k]
seq = [x for x in words if 443.0 <= x['t'] <= 445.1]   # "what percentage of all students do something." starts right after
for j, x in enumerate(seq): a = 442.45 + (445.0 - 442.45) * j / len(seq); x['t'], x['e'] = round(a, 3), round(a + (445.0 - 442.45) / len(seq) - 0.02, 3)
json.dump(src, open(os.path.join(P, 'talking-head/data/raw_words.whisper.json'), 'w'))
for w in words:   # 2026-11-07 caption check: the title's closing quote hid its full stop (no caption break), "S." broke the author's name
    if w['w'] == 'Paper."': w['w'] = 'Paper.'
    if w['w'] == '"How': w['w'] = 'How'
    if w['w'] == 'S.' and 130 < w['t'] < 131: w['w'] = 'S.\u00a0Keshav.'
for i in range(len(words) - 1, 0, -1):
    if words[i - 1]['w'] == 'S.\u00a0Keshav.' and words[i]['w'] == 'Keshav.': words[i - 1]['e'] = words[i]['e']; del words[i]
json.dump(words, open(os.path.join(P, 'talking-head/data/raw_words.json'), 'w'), indent=0)
done = {h[0] for h in hits}
for o, _ in FIX:
    if o not in done: print('NOT FOUND:', o)
print(len(hits), 'fixes', len(words), 'words')

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
    ('that is relevant to', 248.2, 'that is not relevant to', 248.2, 249.46),            # 4:08 "reading a research paper that is NOT relevant" (turbo + small.en clips; it said the opposite)
    ('I would say a student,', 383.44, "I would say if you're a student,", None, None),     # 6:23 (turbo raw + clip)
    ('lab? or at', 467.22, 'lab? Was it at', None, None),                                  # 7:47 (turbo + small.en: "Was it in a lab? Was it at these people's offices")
    # 8:18 "found that a study sponsored": left as is (the passes split between "a study" and "the studies")
    ('So survey paper', 580.44, 'A survey paper', None, None),                            # 9:40 (turbo x2: "A/The survey paper", no "So")
]:
    i = _find(words, seq, near)
    if i is not None: _put(words, i, i + len(seq.split()), new, t0, t1)
for w in words:   # sh11 starts at 556.80 on "if you think": whisper put "this," (said before 556.8) over the cut, so sh11 showed a stray "this,"
    if w['w'] == 'this,' and abs(w['t'] - 556.76) < 0.02: w['t'], w['e'] = 556.55, 556.76
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
