#!/usr/bin/env python3
"""learn-to-code: her words on the RAW timeline with the caption corrections (transcripts/corrections.json + clear whisper slips; unclear words are listed in STATUS.md, not guessed).
Source: film/stills/directions/_shared/words.json (whisper tokens, t_dtw times). Writes talking-head/data/raw_words.json
(+ raw_words.whisper.json untouched copy). A replacement with a different word count spreads the old span over the new words."""
import json, os, re
HERE = os.path.dirname(os.path.abspath(__file__)); P = os.path.dirname(os.path.dirname(HERE))
src = json.load(open(os.path.join(P, 'film/stills/directions/_shared/words.json')))
FIX = [
 ("developer rules", "developer roles"), ("a rule that", "a role that"), ("senior rules", "senior roles"),
 ("development is job posting", "development job postings"), ("the job posting are", "the job postings are"),
 ("the rules about 15%", "they rose about 15%"), ("question to add,", "question to ask,"),
 ("build of software", "build software"), ("try cache.", "in a try-catch."), ("your survey message", "your server a message"),
 ("payments were successful.", "payment was successful."), ("office talk half", "that stock app"),
 ("add your mind into the loop.", "add the human in the loop."), ("trend trend seven,", "2027,"),
 ("like the bargain,", "like debugging,"), ("in the learn-out code,", "if you learn how to code,"),
 ("some link in", "some links in"), ("to to learn", "to learn"), ("when you fix that AI give you,", "when the fix that AI gives you"),
 ("out of the database, save your data.", "how the database saves your data."), ("the part of your app works", "the parts of your app work"),
 ("care and software", "care about software"),
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
json.dump(src, open(os.path.join(P, 'talking-head/data/raw_words.whisper.json'), 'w'))
json.dump(words, open(os.path.join(P, 'talking-head/data/raw_words.json'), 'w'), indent=0)
done = {h[0] for h in hits}
for o, _ in FIX:
    if o not in done: print('NOT FOUND:', o)
print(len(hits), 'fixes', len(words), 'words')


# 5:17 "some point before them start engineer" is unclear (kit Q12: maybe "sometimes they call them staff engineers"): the full edit
# cuts it (317.82-318.96, in silence on the waveform); its words are dropped so no caption guesses them
w2 = json.load(open(os.path.join(P, 'talking-head/data/raw_words.json')))
w2 = [w for w in w2 if not (317.15 < w['t'] < 318.9 and w['w'].strip('.,').lower() in ('some', 'point', 'before', 'them', 'start', 'engineer'))]
for w in w2:
    if w['w'] == 'to,' and abs(w['t'] - 317.2) < 0.05: w['e'] = 317.6
json.dump(w2, open(os.path.join(P, 'talking-head/data/raw_words.json'), 'w'), indent=0)
print(len(w2), 'words after dropping the unclear half-sentence')
# whisper's times for a few words sit in silence (waveform, voice16k.wav): move them onto her voice
FIXT = [('If', 0.01, 0.40, 0.50), ('you', 0.13, 0.50, 0.60), ('So', 46.34, 46.70, 46.80), ('maybe', 46.49, 46.80, 46.95), ('A', 318.88, 318.98, 319.06), ('Maybe', 396.08, 396.34, 396.5)]
for w in w2:
    for s_, t0, a, b in FIXT:
        if w['w'] == s_ and abs(w['t'] - t0) < 0.02: w['t'], w['e'] = a, b
json.dump(w2, open(os.path.join(P, 'talking-head/data/raw_words.json'), 'w'), indent=0)

# ---------- 2026-11-19 caption accuracy pass (her notes + a second, stronger transcription: whisper large-v3-turbo on the raw
# sound and on short clips around every difference, small.en as a third opinion; check "caption-accuracy" in CHECKS.md).
# Only words that differ are changed (a plural "s" the models disagree on is left alone); her own corrections win.
def fix_phrases(words, fixes):
    hits = []
    for old, new in fixes:
        ow = [n(x) for x in old.split()]; k = 0; found = False
        while k <= len(words) - len(ow):
            if [n(x['w']) for x in words[k:k + len(ow)]] == ow:
                seg = words[k:k + len(ow)]; t0, t1 = seg[0]['t'], seg[-1]['e']; nw = new.split(); out = []
                for j, s in enumerate(nw):
                    a = t0 + (t1 - t0) * j / len(nw); b = t0 + (t1 - t0) * (j + 1) / len(nw)
                    if len(nw) == len(seg): a, b = seg[j]['t'], seg[j]['e']
                    out.append({'w': s, 't': round(a, 3), 'e': round(b, 3)})
                words[k:k + len(ow)] = out; found = True; k += len(nw)
            else: k += 1
        if not found: print('NOT FOUND (11-19):', old)
        hits.append(old)
    return words
FIX2 = [   # (old words as they were, new words with her punctuation)
 ("I was struggling that that number", "I have a strong feeling that that number"),           # raw 0:24.5 (turbo x2; small heard "struggling")
 ("software development post, and I was seeing", "software development posting, I was seeing"),   # 0:33.6
 ("So maybe you are learning", "So maybe if you are learning"),                              # 0:46.7 (all three)
 ("you can just write code.", "you can just vibe code."),                                    # 0:51 her note (small.en clip: "wipe cold")
 ("a very right question to ask,, but", "a very valid question to ask, but"),                # 1:03 (turbo x2)
 ('When I\'m like, "Oh', 'But now I\'m like, "Oh'),                                          # 1:34.6 (turbo x2)
 ("The beginner right now, I will say", "If you're a beginner right now, I would say"),      # 1:36.7 (turbo x2, small)
 ("but I will say if you focus on four things,", "but I would say if you focus on four things,"),   # 1:44 (clips: turbo + small, beam 5)
 ("Everybody using AI to write code,", "Everybody is using AI to write code,"),              # 1:57 (all three)
 ("But I will say reading code is", "But I would say reading code is"),                      # 2:04 (turbo)
 ("because you're usually out to write code, to even read code.", "because you'd usually have to write code to even read code."),   # 2:14 her note (all three)
 ("starting to really care about software development", "starting to build a career in software development"),   # 2:23 (turbo x2)
 ("read it in case you need to read it.", "read it if there's a need to read it."),          # 2:31 (all three)
 ("if I paste this into AI, maybe the model that is not so solid", "if I paste this into a model that is not so solid"),   # 2:48 her note
 ("to wrap the saving, in a try-catch..", "to wrap the save in a try-catch."),               # 2:54 (turbo x2)
 ("the real fix is actually check", "the real fix is to actually check"),                    # 3:13 (turbo)
 ("you add the human in the loop..", "you are the human in the loop."),                      # 3:20 her note (kit Q10 answered)
 ("when the fix that AI gives you, or it's the actual problem.", "when a fix that AI gives you only hides the actual problem."),   # 3:30 her note
 ("send a request how the database saves your data..", "send a request, how does the database save your data?"),   # 3:44 (turbo)
 ("work together. What can go wrong", "work together, you know, what can go wrong"),        # 3:48 (all three)
 ("a stock app for your pharmacy,", "a stock app for a pharmacy,"),                          # 4:44 (turbo x2)
 ("very quickly, but the pharmacy needs", "very quickly. The pharmacy needs"),               # 4:47 (all three: no "but")
 ("field. is the reason why", "field. It's the reason why"),                                 # 5:14 (turbo)
 ("think of it something that", "think of it as something that"),                            # 5:42 (turbo)
 ("design. A lot of free reliable places", "design. There are a lot of free, reliable places"),   # 6:01 (turbo x2)
 ("Maybe not say something", "Maybe next year something"),                                   # 6:36 (after the edit's end)
 ("the promise I want to like go so seriously.", "the promise you want to hold so seriously."),   # 6:39 (after the edit's end)
]
w3 = fix_phrases(json.load(open(os.path.join(P, 'talking-head/data/raw_words.json'))), FIX2)
for w in w3:   # doubled punctuation from whisper ("ask,,", "loop..") never reaches a caption
    w['w'] = re.sub(r'([,.?!])\1+', r'\1', w['w'])
# times measured on the waveform (voice16k.wav): whisper put "very very rare" ~0.4 s late, so "rare" fell into the 11-19 cut
FIXT2 = [('very,', 8.38, 8.05, 8.40), ('very', 8.69, 8.45, 8.76), ('rare.', 9.25, 8.80, 9.08)]
for w in w3:
    for s_, t0, a, b in FIXT2:
        if w['w'] == s_ and abs(w['t'] - t0) < 0.02: w['t'], w['e'] = a, b
# "if I paste this into a model that is not so solid" (her words, 2:48): each word back on its own sound; "a" over where she
# says "AI, maybe the", "model" on its sound (169.71)
k = next(i for i, w in enumerate(w3) if w['w'] == 'paste' and 167.5 < w['t'] < 170)
for w, (a, b) in zip(w3[k - 2:k + 9], [(167.92, 167.99), (167.99, 168.02), (168.02, 168.2), (168.2, 168.35), (168.35, 168.5), (168.54, 169.05),
                                       (169.71, 169.86), (169.86, 170.12), (170.12, 170.26), (170.26, 170.52), (170.52, 170.69), (170.69, 171.0)]): w['t'], w['e'] = a, b
# more times measured on the waveform (the edges of the shorts and teaser bites: a caption word whose sound is not in the clip)
FIXT3 = [('and', 24.33, 24.50, 24.60), ('I', 24.48, 24.60, 24.69), ('I', 32.46, 32.62, 32.68), ('think', 32.49, 32.68, 33.08),
         ('So', 46.70, 46.42, 46.56), ('maybe', 46.90, 46.56, 46.85), ('you', 213.83, 213.60, 213.72), ("wouldn't", 213.96, 213.72, 213.86), ('know,', 214.32, 213.86, 214.00), ('right?', 214.59, 214.00, 214.30), ('The', 215.0, 214.86, 215.06),
         ('payment.', 237.44, 237.15, 237.48), ('goes', 316.99, 316.60, 316.85), ('to,', 317.2, 316.85, 317.04)]
for w in w3:
    for s_, t0, a, b in FIXT3:
        if w['w'] == s_ and abs(w['t'] - t0) < 0.02: w['t'], w['e'] = a, b
# "And the third skill" (3:35, turbo x3): the "And" is on the sound before "the"
k = next(i for i, w in enumerate(w3) if w['w'] == 'The' and abs(w['t'] - 214.86) < 0.01); w3[k]['w'] = 'the'; w3.insert(k, {'w': 'And', 't': 214.68, 'e': 214.86})
# 5:17 "Some people call them staff engineer." (kit Q12: the stronger transcription hears it clearly; was dropped as unclear)
k = next(i for i, w in enumerate(w3) if w['w'] == 'A' and abs(w['t'] - 318.98) < 0.02)
w3[k:k] = [{'w': a, 't': b, 'e': c} for a, b, c in [('Some', 317.07, 317.24), ('people', 317.24, 317.44), ('call', 317.48, 317.6), ('them', 317.6, 317.78), ('staff', 317.84, 318.12), ('engineer.', 318.12, 318.47)]]
for i, w in enumerate(w3):   # the opening now starts on "in the first quarter": a capital after "rare."
    if w['w'] == 'in' and abs(w['t'] - 15.42) < 0.05: w['w'] = 'In'
json.dump(w3, open(os.path.join(P, 'talking-head/data/raw_words.json'), 'w'), indent=0)
print(len(w3), 'words after the 2026-11-19 caption pass')

# words whose whisper start sits in a silence an edit trimmed (the engine drops them: "in software [development] right now",
# "you're [probably] asking"): moved to the kept side next to them (every moment's clips in data/edl.json; run footedl first)
EDL = json.load(open(os.path.join(P, 'talking-head/data/edl.json'))); MAN = json.load(open(os.path.join(P, 'talking-head/talking-head.json')))
manual = [c for mo in MAN['moments'] for c in (mo.get('cuts') or [])] + [c for mo in MAN['moments'] for b in (mo.get('bites') or []) if isinstance(b, dict) for c in b.get('cuts', [])]
def kept(w, a, b): return (w['t'] >= a - 0.08 and w['t'] < b - 0.03) or (min(w['e'], b) - max(w['t'], a) >= 0.5 * max(0.05, w['e'] - w['t']))
moved = 0
for k, v in EDL.items():
    cl = v['clips']
    for i in range(len(cl) - 1):
        b, a2 = cl[i][1], cl[i + 1][0]
        if a2 - b > 3: continue   # a manual cut, not a trimmed pause
        for w in w3:
            if b - 0.03 <= w['t'] < a2 - 0.08 and not kept(w, *cl[i]) and not kept(w, *cl[i + 1]):
                if any(c[0] <= w['t'] < c[1] for c in manual): continue
                d = w['e'] - w['t']
                if w['t'] - b < a2 - w['t']: w['t'] = round(b - 0.04 - min(d, 0.25), 3); w['e'] = round(b - 0.04, 3)
                else: w['t'] = round(a2 + 0.01, 3); w['e'] = round(a2 + 0.01 + max(0.08, min(d, 0.3)), 3)
                moved += 1; print('moved onto her voice:', k, w)
json.dump(w3, open(os.path.join(P, 'talking-head/data/raw_words.json'), 'w'), indent=0)
print(moved, 'words moved out of trimmed silences')
