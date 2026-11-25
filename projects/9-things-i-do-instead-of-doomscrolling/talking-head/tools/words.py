#!/usr/bin/env python3
"""doomscrolling: her words on the RAW timeline from whisper tokens (t_dtw times, centiseconds), with the caption fixes
(kit/transcripts/corrections.json + slips found in this transcript). Writes talking-head/data/raw_words.json
(+ raw_words.whisper.json, the uncorrected words). A replacement with a different word count spreads the span over the new words."""
import json, os, re
HERE = os.path.dirname(os.path.abspath(__file__)); P = os.path.dirname(os.path.dirname(HERE))
toks = json.load(open(os.path.join(P, 'kit/transcripts/transcript.words.json')))['transcription']
raw = []
for seg in toks:
    for k in seg['tokens']:
        s = k['text']
        if s.startswith('[_') or not s.strip(): continue
        t = k['t_dtw'] / 100 if k.get('t_dtw', -1) >= 0 else k['offsets']['from'] / 1000
        if s.startswith(' ') or not raw: raw.append({'w': s.strip(), 't': t, 'oe': k['offsets']['to'] / 1000})
        else: raw[-1]['w'] += s.strip(); raw[-1]['oe'] = k['offsets']['to'] / 1000
words = []
for i, x in enumerate(raw):
    nxt = raw[i + 1]['t'] if i + 1 < len(raw) else x['t'] + 0.6
    e = min(nxt - 0.02, x['t'] + 0.75)
    if e < x['t'] + 0.06: e = x['t'] + 0.08
    words.append({'w': x['w'], 't': round(x['t'], 3), 'e': round(e, 3)})
# whisper wrote 'social media apps.' twice at 1171.04 (zero length); the real words follow at 1171.22
words = [w for w in words if not (abs(w['t'] - 1171.04) < 0.01)]
src = [dict(w) for w in words]
FIX = [tuple(p) for p in json.load(open(os.path.join(P, 'kit/transcripts/corrections.json')))] + [
 ("stop them scrolling", "stop doomscrolling"), ("boom scrolling", "doomscrolling"), ("sub-stock", "Substack"),
 ("on my least is angry now with your friends", "on my list is hanging out with your friends"),
 ("crotchetting", "crocheting"), ("i suck", "I suck"),
 ("chronic drumscroller.", "chronic doomscroller."), ("jump scrolling", "doomscrolling"), ("doing schooling", "doomscrolling"),
 ("I seen no", "I see no"), ("you leave alone", "you live alone"), ("doomscrolling kotoki,", "doomscrolling cold turkey"),
 ("is that to make friends", "it's hard to make friends"), ("but I still knew how to", "but if I still knew how to"),
 ("doomscrolling, Doomscrolling", "doomscrolling, doomscrolling"), ("powers Doomscrolling", "powers doomscrolling"),
    ('with your bottom', 'with your boredom'), ('or medium.', 'or Medium.'),   # 2026-11-07 caption check (embracing boredom; the platform)
]
n = lambda s: re.sub(r"[^a-z0-9%/'\-]", '', s.lower().replace('’', "'"))
hits = []
for old, new in FIX:
    ow = [n(x) for x in old.split()]; k = 0
    while k <= len(words) - len(ow):
        if [n(x['w']) for x in words[k:k + len(ow)]] == ow:
            seg = words[k:k + len(ow)]; t0, t1 = seg[0]['t'], seg[-1]['e']
            punct = re.findall(r'[.,!?"”]+$', seg[-1]['w']); lead = re.findall(r'^["“]', seg[0]['w'])
            cap = seg[0]['w'][:1].isupper()
            nw = new.split(); out = []
            for j, s in enumerate(nw):
                a = t0 + (t1 - t0) * j / len(nw); b = t0 + (t1 - t0) * (j + 1) / len(nw)
                if len(nw) == len(seg): a, b = seg[j]['t'], seg[j]['e']
                out.append({'w': s, 't': round(a, 3), 'e': round(b, 3)})
            if cap and out[0]['w'][:1].islower(): out[0]['w'] = out[0]['w'][0].upper() + out[0]['w'][1:]
            if punct: out[-1]['w'] += punct[0]
            if lead: out[0]['w'] = lead[0] + out[0]['w']
            words[k:k + len(ow)] = out; hits.append((old, round(t0, 2))); k += len(nw)
        else: k += 1
for w in words:   # 2026-11-07 caption check, times read on the waveform: 'number eight' = 907.44-908.47 (cut), the stray 'Yeah.' = 962.95-963.33 (cut)
    if w['w'].lower().startswith('yeah') and 963.7 < w['t'] < 963.9: w['t'], w['e'] = 962.95, 963.33
    if w['w'] == 'number' and abs(w['t'] - 907.68) < 0.05: w['t'], w['e'] = 907.44, 907.9
    if w['w'] == 'eight' and abs(w['t'] - 908.3) < 0.05: w['t'], w['e'] = 907.92, 908.45
    if w['w'] == 'one' and abs(w['t'] - 909.0) < 0.05: w['t'] = 908.6
os.makedirs(os.path.join(P, 'talking-head/data'), exist_ok=True)
json.dump(src, open(os.path.join(P, 'talking-head/data/raw_words.whisper.json'), 'w'))
for w in words: w['w'] = w['w'].replace('..', '.')
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
    ('places. waiting', 380.06, "places. You're waiting", 380.06, 380.85),               # 6:20 raw (turbo + small.en: "So try it in small places. You're waiting for your kettle")
    ('or or would I find', 352.2, 'or without finding', None, None),                     # 5:52 raw (turbo + small.en: "without doing anything or without finding anything")
    ('before for them.', 621.6, 'before then.', None, None),                              # 10:21 raw (both: "I didn't even own a bike before then")
    ('activities done much', 1013.98, 'activities that much', None, None),                # 16:54 raw (both: "physical activities that much")
    ('your library or', 1144.44, 'your life or', None, None),                             # 19:04 raw (both: "journal about your life")
    ('feedback or you post,', 1233.28, 'feedback on your posts,', None, None),            # 20:33 raw (turbo x2 "on your posts"; small.en "or your posts")
]:
    i = _find(words, seq, near)
    if i is not None: _put(words, i, i + len(seq.split()), new, t0, t1)
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

# the FILM (the video now) uses its own cut, film/data/edl-film.json; film/tools/voice.py keeps a word when its start is inside a kept clip
# (orig_start - 0.02 <= t < orig_end): words whose start sits in a pause the film trims ("number eight [one] thing", "learn [now.]",
# "so [as] much as people comment") move onto her voice next to them. Then run film/tools/voice.py.
try:
    FC = json.load(open(os.path.join(P, 'film/data/edl-film.json')))['full']['clips']; fm = 0
    for i in range(len(FC) - 1):
        b, a2 = FC[i][1], FC[i + 1][0]
        if a2 - b > 3: continue
        for w in words:
            if b <= w['t'] < a2 - 0.02 and not any(c[0] <= w['t'] < c[1] for c in manual):
                d = w['e'] - w['t']
                if w['t'] - b < a2 - w['t']: w['t'] = round(b - 0.04 - min(d, 0.25), 3); w['e'] = round(b - 0.04, 3)
                else: w['t'] = round(a2 + 0.01, 3); w['e'] = round(a2 + 0.01 + max(0.08, min(d, 0.3)), 3)
                fm += 1; print('moved onto her voice (film):', w)
    json.dump(words, open(os.path.join(P, 'talking-head/data/raw_words.json'), 'w'), indent=0)
    print(fm, 'words moved for the film cut')
except FileNotFoundError: pass
