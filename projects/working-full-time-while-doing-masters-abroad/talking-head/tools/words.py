#!/usr/bin/env python3
"""working-full-time: her words on the RAW timeline with the caption corrections (transcripts/corrections.json + clear whisper slips; unclear words are listed in STATUS.md, not guessed).
Source: film/stills/directions/_shared/words.json (whisper tokens, t_dtw times). Writes talking-head/data/raw_words.json
(+ raw_words.whisper.json untouched copy). A replacement with a different word count spreads the old span over the new words."""
import json, os, re
HERE = os.path.dirname(os.path.abspath(__file__)); P = os.path.dirname(os.path.dirname(HERE))
src = json.load(open(os.path.join(P, 'film/stills/directions/_shared/words.json')))
FIX = [
 ("full stacks of chair", "full-stack software"), ("ECTA", "ECTS"), ("how I do vote", "how I do both"),
 ("Working-wise studying", "Working while studying"), ("codits", "credits"), ("plan your old degree", "plan your whole degree"),
 ("non-tisses", "non-thesis"), ("I add most", "I had most"), ("79 in the evening", "7 to 9 in the evening"),
 ("set by side", "side by side"), ("running off my courses", "rounding off my courses"),
 ("walk around the clock", "work around the clock"), ("That you have to walk around", "That you have to work around"),
 ("forget to work", "forget about work"), ("studying for your time", "studying full time"), ("degree year as well", "degree here as well"),
 ("keep moving and keep moving", "keeps moving and keeps moving"),
 ("these coffee days", "this confidence"), ("happens this we can", "happens this week can"), ("around to 7.45,", "around 7:45,"),   # 2026-11-13: whisper re-run on 538-558 s alone
]
n = lambda s: re.sub(r"[^a-z0-9%/'\-]", '', s.lower().replace('’', "'"))
words = []
for x in src:   # whisper sometimes gives several words in one entry ("full stacks of chair"): split them over its span
    ps = x['w'].split()
    if len(ps) < 2: words.append(dict(x)); continue
    for j, s_ in enumerate(ps):
        a = x['t'] + (x['e'] - x['t']) * j / len(ps); b = x['t'] + (x['e'] - x['t']) * (j + 1) / len(ps)
        words.append({'w': s_, 't': round(a, 3), 'e': round(b, 3)})
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
# 3:50 'to block, block your week': whisper heard one 'block' (dtw 230.70); the waveform cut (CLEANUP cut 3, ends 230.89)
# keeps the second one, so the word belongs after the cut
for w in words:
    if w['w'] == 'block' and abs(w['t'] - 230.7) < 0.05: w['t'], w['e'] = 230.95, 231.3
# 2026-11-07 caption pass: joins across the cuts read as one sentence (no stray capital / full stop)
for i, w in enumerate(words):
    if w['w'] == 'Full-time' and abs(w['t'] - 7.58) < 0.3: w['w'] = 'full-time'
    for wd, t0 in (('2025.', 11.64), ('semester.', 121.14), ('year.', 133.84)):
        if w['w'] == wd and abs(w['t'] - t0) < 0.05: w['w'] = wd[:-1] + ','
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
    ('is the the real', 79.46, "I swear, it's the real", 79.46, 81.63),                   # 1:19 sh02 hook (turbo raw "I swear it's it's it's the real ghetto", clip "I swear, it's"; small.en "So it's")
    ("don't just write credits like", 156.12, "don't just write code, it's like", None, None),   # 2:36 (turbo + small.en clips both: "don't just write code, it's like understand")
    ('two times or this course', 162.2, 'two times, for this course', None, None),         # 2:42 (small.en clip; turbo "or this because")
    ("focus, and I'm on my thesis.", 202.22, 'focus on my thesis.', None, None),            # 3:22 (both clips: "focus, focus, focus on my thesis")
    ('class like class around 7:45,,', 297.36, 'class, my class runs till 7:45,', None, None),   # 4:57 (turbo raw + clip "my class runs till 7:45, 8 p.m.")
    ("You show who thinks you're on there.", 361.58, 'You shuffle things here and there.', None, None),   # 6:02 (turbo raw + clip "things here and there")
    ('At school, we take', 373.28, 'School will take', None, None),                       # 6:13 (both clips: "School will take a lot of my blood in December")
    ('once we do', 384.92, 'once a week, do', None, None),                                 # 6:25 (both clips: "And then once a week, do a weekly review")
    ('really can have', 594.6, "really can't have", None, None),                          # 9:54 "you really can't have a perfect work-life balance, per se, because..." (small.en clip + turbo on the full sound; turbo clip "can": listen)
    ("bit don't fear but", 408.46, 'bit unfair, but', None, None),                         # 6:48 (both clips: "it sounds a little bit unfair")
    ('think or study leaves.', 432.96, 'think, of study leaves.', None, None),             # 7:13 (both clips: "30 calendar days, I think, of study leaves")
    ('the want to', 460.94, 'the one to', None, None),                                     # 7:41 (both clips: "have to be the one to now say")
]:
    i = _find(words, seq, near)
    if i is not None: _put(words, i, i + len(seq.split()), new, t0, t1)
for w in words:   # sh08 starts on "you need to" (409.24): "but" is said before it, so it is not on sh08's first caption
    if w['w'] == 'but' and abs(w['t'] - 409.16) < 0.02: w['t'], w['e'] = 409.08, 409.2
    # words whisper put a little late, so a short or teaser bite that starts in the pause after them showed them (sh07 "is", teaser "it.", "work.")
    if w['w'] == 'is' and abs(w['t'] - 328.68) < 0.02: w['t'], w['e'] = 328.45, 328.64
    if w['w'] == 'it.' and abs(w['t'] - 17.88) < 0.02: w['t'], w['e'] = 17.8, 17.86
    if w['w'] == 'work.' and abs(w['t'] - 330.16) < 0.02: w['t'], w['e'] = 330.06, 330.14
    if w['w'] == 'This' and abs(w['t'] - 12.02) < 0.02: w['t'], w['e'] = 12.1, 12.3   # "This month makes it a year" is cut (12.00-16.55): "This" showed after "2025,"
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
