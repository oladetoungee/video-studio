#!/usr/bin/env python3
"""dark-patterns: her words on the RAW timeline with the caption corrections (kit Q2, Q3, Q7-Q9 + transcripts/corrections.json).
Source: film/stills/directions/_shared/words.json (whisper tokens, t_dtw times). Writes talking-head/data/raw_words.json
(+ raw_words.whisper.json untouched copy). A replacement with a different word count spreads the old span over the new words."""
import json, os, re
HERE = os.path.dirname(os.path.abspath(__file__)); P = os.path.dirname(os.path.dirname(HERE))
src = json.load(open(os.path.join(P, 'film/stills/directions/_shared/words.json')))
FIX = [
 ("it's even money", "I hate saving money"), ("Ari Brignall", "Harry Brignull"), ("Confirm Shaming", "confirmshaming"),
 ("you ate saving money", "you hate saving money"), ("Now that pattern is add to cancel", "Another pattern is hard to cancel"),
 ("Roach Motel", "roach motel"), ("Not an interesting dark pattern is eating costs", "Another interesting dark pattern is hidden costs"),
 ("hadded", "added"), ("Not a dark pattern in design is even subscription", "Another dark pattern is hidden subscription"),
 ("it acts like a card first", "it asks for your card first"), ("for AES subscription", "for a year's subscription"),
 ("trick warden", "trick wording"), ("it acts again", "it asks again"), ("a box that checks out that say", "a box at checkout that says"),
 ("fake agency", "fake urgency"), ("The PR issue will say", "The page will say"), ("dark matter", "dark patterns"),
 ("sign-offs", "sign-ups"), ("countdowns, timers", "countdown timers"), ("at the sea", "hard to see"),
 ("websites self-subscriptions", "websites that sell subscriptions"),
 ("unfair commercial practices directive", "Unfair Commercial Practices Directive"), ("critique box", "pre-ticked box"),
 ("you have to critique", "they had pre-ticked"), ("FCC", "FTC"), ("need cancelling ads", "made cancelling hard"),
 ("Digital Fianness Act", "Digital Fairness Act"), ("deal with that pattern", "deal with dark patterns"),
 ("you actually view the dark pattern", "you actually see a dark pattern"), ("taking seriously", "taken seriously"),
 ("signed people for Prime", "signed people up for Prime"),
]
n = lambda s: re.sub(r"[^a-z0-9%/'\-]", '', s.lower().replace('’', "'"))
words = [dict(x) for x in src]
for i, w in enumerate(words):   # whisper sometimes ends a word before it starts: keep e >= t
    if w['e'] < w['t'] + 0.04: w['e'] = round(w['t'] + 0.08, 3)
hits = []
for old, new in FIX:
    ow = [n(x) for x in old.split()]; k = 0
    while k <= len(words) - len(ow):
        if [n(x['w']) for x in words[k:k + len(ow)]] == ow:
            seg = words[k:k + len(ow)]; t0, t1 = seg[0]['t'], seg[-1]['e']
            tail = re.sub(r"[\w%'’\-/]+$", '', seg[-1]['w']) or ''; punct = re.findall(r'[.,!?"”]+$', seg[-1]['w'])
            lead = re.findall(r'^["“]', seg[0]['w'])
            nw = new.split(); out = []
            for j, s in enumerate(nw):
                a = t0 + (t1 - t0) * j / len(nw); b = t0 + (t1 - t0) * (j + 1) / len(nw)
                if len(nw) == len(seg): a, b = seg[j]['t'], seg[j]['e']
                out.append({'w': s, 't': round(a, 3), 'e': round(b, 3)})
            if punct: out[-1]['w'] += punct[0]
            if lead: out[0]['w'] = lead[0] + out[0]['w']
            words[k:k + len(ow)] = out; hits.append((old, round(t0, 2))); k += len(nw)
        else: k += 1
# hand timing fixes (measured on the waveform): word, whisper start, real start, real end
for wd, t0, a_, b_ in [('we', 457.82, 458.28, 458.4)]:
    for x in words:
        if n(x['w']) == wd and abs(x['t'] - t0) < 0.05: x['t'], x['e'] = a_, b_
# sentence-start capitals and a stray full stop (2026-11-07 caption pass)
for i in range(1, len(words)):
    prev, w = words[i - 1]['w'], words[i]
    if w['w'] in ('confirmshaming', 'fake') and prev.endswith('.'): w['w'] = w['w'][0].upper() + w['w'][1:]
    if w['w'] == "You're" and prev == 'and': w['w'] = "you're"
    if w['w'] == 'out.' and words[i + 1]['w'] == 'when': w['w'] = 'out,'
json.dump(src, open(os.path.join(P, 'talking-head/data/raw_words.whisper.json'), 'w'))
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
    ('The page will say,', 258.36, 'A pair of shoes would say,', None, None),           # 4:17 (turbo raw + clip + sh10: "A pair of shoes would say, oh, only two left")
    ("you actually see a", 434.2, "you're asked to do the", None, None),                 # 6:49 (turbo x2 "asked to do the dark pattern"; small.en "you actually do the")
    ('pre-select', 394.44, 'pre-selected', None, None),                                  # 6:01 (all three)
    ('apps, the', 252.04, 'apps, where the', None, None),                                 # 4:11 (turbo x2 + small: "shopping apps, where the website say")
]:
    i = _find(words, seq, near)
    if i is not None: _put(words, i, i + len(seq.split()), new, t0, t1)
for w in words:   # "best for the user." (raw 5:09): whisper put "user." after its sound, so the teaser bite (out 309.43) lost it
    if w['w'] == 'user.' and abs(w['t'] - 309.44) < 0.05: w['t'], w['e'] = 309.28, 309.40
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
