#!/usr/bin/env python3
"""cookies: her words on the RAW timeline with the caption corrections (kit Q5, Q6, 1g + kit/transcripts/corrections.json).
Source: film/stills/directions/_shared/words.json (whisper tokens, t_dtw times, [t, e, w]). Writes talking-head/data/raw_words.json
(+ raw_words.whisper.json untouched). A replacement with a different word count spreads the old span over the new words."""
import json, os, re
HERE = os.path.dirname(os.path.abspath(__file__)); P = os.path.dirname(os.path.dirname(HERE))
src = [{'w': w, 't': t, 'e': e} for t, e, w in json.load(open(os.path.join(P, 'film/stills/directions/_shared/words.json')))]
FIX = [
 ("So, as the server knows", "So how does the server know"), ("My Others,", "My Orders,"), ("cloak room.", "cloakroom."),
 ("a set cookie, a set necessary cookie,", "accept cookies, accept necessary cookies,"), ("piece of test,", "piece of text,"),
 ("with an header", "with a header"), ("called set cookie.", "called Set-Cookie."), ("that code cookie", "that, the cookie"),
 ("can a cookie leave?", "can a cookie live?"), ("sets aspires or max age,", "sets Expires or Max-Age,"), ("Max-Age, Then", "Max-Age, then"),
 ("JSON stringify.", "JSON.stringify."), ("JSON.pass.", "JSON.parse."), ("the old browser", "the whole browser"),
 ("your cards,", "your cart,"), ("an R field", "a half-filled"), ("set item, get item, remove item.", "setItem, getItem, removeItem."),
 ("an app-filled form,", "a half-filled form,"), ("search field tab", "search filter tab"),
 ("read Cookie's local storage session storage?", "read cookies, localStorage, sessionStorage?"),
 ("thought party", "third-party"), ("to true document.cookie.", "through document.cookie."), ("HTTP only.", "HttpOnly."),
 ("HTTP only.", "HttpOnly."), ("HTTP-only", "HttpOnly"), ("holds more", "hold more"), ("they say in", "they stay in"),
 ("leaves with a tab.", "lives with the tab."), ("app field", "half-filled"), ("cookies, domain,", "cookie's domain"),
 ("Local storage", "localStorage"), ("local storage", "localStorage"), ("Session storage", "sessionStorage"), ("session storage", "sessionStorage"),
]
n = lambda s: re.sub(r"[^a-z0-9%/'\-.]", '', s.lower().replace('’', "'")).strip('.')
words = [dict(x) for x in src]
for w in words:
    if w['e'] < w['t'] + 0.04: w['e'] = round(w['t'] + 0.08, 3)
hits = []
for old, new in FIX:
    ow = [n(x) for x in old.split()]; k = 0
    while k <= len(words) - len(ow):
        if [n(x['w']) for x in words[k:k + len(ow)]] == ow:
            seg = words[k:k + len(ow)]; t0, t1 = seg[0]['t'], seg[-1]['e']
            nw = new.split(); out = []
            # keep the case of a sentence start and the punctuation as written in `new`; carry trailing punct of the old if new has none
            punct = re.findall(r'[.,!?]+$', seg[-1]['w'])
            for j, s in enumerate(nw):
                a = t0 + (t1 - t0) * j / len(nw); b = t0 + (t1 - t0) * (j + 1) / len(nw)
                if len(nw) == len(seg): a, b = seg[j]['t'], seg[j]['e']
                out.append({'w': s, 't': round(a, 3), 'e': round(b, 3)})
            if punct and not re.search(r'[.,!?]$', out[-1]['w']): out[-1]['w'] += punct[0]
            words[k:k + len(ow)] = out; hits.append((old, round(t0, 2))); k += len(nw)
        else: k += 1
# merge "local"+"storage" tokens that whisper split (already words) and fix sentence-start case for localStorage
for i, w in enumerate(words):
    if w['w'].startswith('LocalStorage'): w['w'] = 'l' + w['w'][1:]
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
    ('accept cookies, accept necessary cookies,', 63.97, "accept cookie, don't accept cookie, accept necessary cookie,", None, None),   # 1:04 (turbo x2 + small.en clip; was listed as unclear)
    ('filter tab that', 233.98, 'filter that', None, None),                              # 3:53 "search filter that someone picks" (no model hears "tab")
    ('JavaScript through', 273.45, 'JavaScript, too, through', None, None),              # 4:33 (turbo x2 + small.en: "read by JavaScript too")
]:
    i = _find(words, seq, near)
    if i is not None: _put(words, i, i + len(seq.split()), new, t0, t1)
for w in words:   # "After you log in" (raw 0:49): whisper put "After" on the end of "ticket."; the teaser bite starts in the pause after it
    if w['w'] == 'After' and abs(w['t'] - 48.88) < 0.05: w['t'], w['e'] = 49.22, 49.30
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
