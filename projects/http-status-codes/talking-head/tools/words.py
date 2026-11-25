#!/usr/bin/env python3
"""http-status-codes: her words on the RAW timeline with the caption corrections (kit/transcripts/corrections.json + clear
whisper slips checked against her own kit text; unclear ones are listed in STATUS.md as "listen" items, not guessed blindly).
Source: film/stills/directions/_shared/words.json (whisper tokens, t_dtw times). Writes talking-head/data/raw_words.json
(+ raw_words.whisper.json untouched copy) and film/data/raw_words.json (same file, for the film).
A replacement with a different word count spreads the old span over the new words."""
import json, os, re
HERE = os.path.dirname(os.path.abspath(__file__)); P = os.path.dirname(os.path.dirname(HERE))
src = json.load(open(os.path.join(P, 'film/stills/directions/_shared/words.json')))
FIX = [
 ("response as a three digit number.", "response has a three-digit number."),
 ("Okay is the reason phase.", "OK is the reason phrase."),
 ("Okay is the reason, reason phase,", "OK is the reason, reason phrase,"),
 ("ACTB status scores", "HTTP status codes"),
 ("three-digit number first.", "three-digit number first."),
 ("One XX means,", "1xx means,"), ("Two XX means", "2xx means"), ("three XX means", "3xx means"),
 ("that group to our Other branch,", "that book to our other branch,"),
 ("1XX status codes,", "1xx status codes,"), ("2XX to 5XX", "2xx to 5xx"), ("2XX status codes", "2xx status codes"),
 ("request work.", "request worked."), ("Yeah, it's the result.", "Here's the result."),
 ("getBooks42", "GET book 42"), ("201 created", "201 Created"), ("request world", "request worked"),
 ("204, no content,", "204 No Content,"), ("says, get book 9999,", "says, GET book 9999,"), ("admin route, delete book 42.", "admin route, DELETE book 42."),
 ("in delete book 42,", "in DELETE book 42,"),
 ("The three ISX ATTV status codes are redirect. they tell the clients", "The 3xx HTTP status codes are redirects. They tell the client"),
 ("location header.", "Location header."), ("three access HTTP status code", "3xx HTTP status codes"),
 ("If a book shop moves that book to other branch", "If a bookshop moves that book to the other branch"),
 ("to add in a header form,", "to hand in an order form,"), ("branch, which 307 or 308. You", "branch. With 307 or 308, you"),
 ("and you add it in there.", "and you hand it in there."),
 ("where post requests", "where POST requests"), ("I will use 307", "I would use 307"),
 ("400 by request", "400 Bad Request"), ("4.2.2", "422"), ("Some API send", "Some APIs send"),
 ("send gets book 9999", "send GET book 9999"), ("404 not found", "404 Not Found"), ("410 gone", "410 Gone"),
 ("409 conflict", "409 Conflict"), ("409 conflicts", "409 Conflict"), ("Admin A change", "Admin A changes"),
 ("keeps track of version,", "keeps track of versions,"),
 ("you are sent too many", "you have sent too many"),
 ("what you're sending this request.", "who's sending this request."), ("knows exactly where it is.", "knows exactly who it is."),
 ("401 unauthorized.", "401 Unauthorized."), ("403 forbidden.", "403 Forbidden."), ("an hotel keycard.", "a hotel keycard."),
 ("The product of business people mostly is the name.", "The part that confuses people mostly is the name."),
 ("called unauthorized.", "called Unauthorized."),
 ("500 internal server error", "500 Internal Server Error"), ("In most real setup,", "In most real setups,"),
 ("502 bad gateway", "502 Bad Gateway"), ("504 gateway timeout", "504 Gateway Timeout"), ("503 service unavailable", "503 Service Unavailable"),
 ("find or fill.", "findOrFail."), ("its clients get to 500.", "the client gets a 500."),
 ("The first one is leaking", "The fourth one is leaking"),
 ("In Lager,", "In Laravel,"), ("and now your code run.", "and how your code runs."),
 ("should always be forced in production,", "should always be false in production,"),
 ("with the bulk of your 500-response JOCI server error.", "with the body of your 500 response just saying Server Error."),
]
n = lambda s: re.sub(r"[^a-z0-9%/'\-]", '', s.lower().replace('’', "'"))
words = []
for x in src:
    ps = x['w'].split()
    if len(ps) < 2: words.append(dict(x)); continue
    for j, s_ in enumerate(ps):
        a = x['t'] + (x['e'] - x['t']) * j / len(ps); b = x['t'] + (x['e'] - x['t']) * (j + 1) / len(ps)
        words.append({'w': s_, 't': round(a, 3), 'e': round(b, 3)})
for w in words:
    if w['e'] < w['t'] + 0.04: w['e'] = round(w['t'] + 0.08, 3)
hits = []
for old, new in FIX:
    ow = [n(x) for x in old.split()]; k = 0
    while k <= len(words) - len(ow):
        if [n(x['w']) for x in words[k:k + len(ow)]] == ow:
            seg = words[k:k + len(ow)]; t0, t1 = seg[0]['t'], seg[-1]['e']
            nw = new.split(); out = []
            for j, s in enumerate(nw):
                a = t0 + (t1 - t0) * j / len(nw); b = t0 + (t1 - t0) * (j + 1) / len(nw)
                if len(nw) == len(seg): a, b = seg[j]['t'], seg[j]['e']
                out.append({'w': s, 't': round(a, 3), 'e': round(b, 3)})
            punct = re.findall(r'[.,!?"”]+$', seg[-1]['w']); out[-1]['w'] = re.sub(r'[.,!?"”]+$', '', out[-1]['w']) + (punct[0] if punct else '')
            words[k:k + len(ow)] = out; hits.append((old, round(t0, 2))); k += len(nw)
        else: k += 1
words = [w for w in words if not (w['w'].lower().startswith('is') and abs(w['t'] - 49.69) < 0.06)]   # left over from CLEANUP cut 2 ('Yeah, it is.')
# 2026-11-07 (show-don't-type pass): cut 2 now ends at 49.38 (the -60 dB dip before her kept "I've got your book"; the old 49.63
# clipped "I've"). The retake's 'Yeah, it' (whisper 49.2-49.69) is in the cut; her kept words start at 49.41 (measured), not whisper's 50.04.
words = [w for w in words if not (49.15 <= w['t'] < 49.75)]
for w in words:
    if abs(w['t'] - 50.04) < 0.02 and w['w'].startswith("I've"): w['t'], w['e'] = 49.42, 49.6
    elif abs(w['t'] - 50.18) < 0.02 and w['w'] == 'got': w['t'], w['e'] = 49.6, 49.8
    elif abs(w['t'] - 50.29) < 0.02 and w['w'] == 'your': w['t'], w['e'] = 49.83, 50.0
    elif abs(w['t'] - 50.44) < 0.02 and w['w'].startswith('book'): w['t'], w['e'] = 50.0, 50.3
json.dump(src, open(os.path.join(P, 'talking-head/data/raw_words.whisper.json'), 'w'))
json.dump(words, open(os.path.join(P, 'talking-head/data/raw_words.json'), 'w'), indent=0)
done = {h[0] for h in hits}
for o, _ in FIX:
    if o not in done: print('NOT FOUND:', o)
print(len(hits), 'fixes', len(words), 'words')
