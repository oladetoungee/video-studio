"""Word checks for every direction (CHECKS.md stands-alone, titles-paired, no-dashes-no-hype):
- thumbnail words 1-6 (the headline only), no 3-word run shared with her transcript (RULE 1: no script phrases)
- 2-3 titles, each 40-60 characters, no em/en dashes, no hype words
  python3 tools/check.py"""
import json, os, re, glob
T = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
P = os.path.dirname(os.path.dirname(T))
srt = open(os.path.join(P, 'kit/transcripts/transcript.srt')).read()
tw = re.findall(r"[a-z0-9']+", re.sub(r'\d\d:\d\d:\d\d,\d+ --> .*|\n\d+\n', ' ', srt).lower())
grams = set(zip(tw, tw[1:], tw[2:]))
HYPE = ['insane', 'shocking', "won't believe", 'game-changer', 'mind-blowing', 'secret', 'crazy', 'unbelievable']
bad = 0
for f in sorted(glob.glob(os.path.join(T, 'directions/*/content.json'))):
    c = json.load(open(f)); d = os.path.basename(os.path.dirname(f)); notes = []
    txt = c.get('thumbnail_text') or re.sub(r'<[^>]+>', ' ', c['text'].get('words', '')).replace('&nbsp;', ' ')
    w = re.findall(r"[a-z0-9']+", txt.lower().replace('’', "'"))
    if not 1 <= len(w) <= 6: notes.append(f'{len(w)} words')
    for g in zip(w, w[1:], w[2:]):
        if g in grams: notes.append('script phrase: ' + ' '.join(g))
    ts = c.get('titles', [])
    if not 2 <= len(ts) <= 3: notes.append(f'{len(ts)} titles')
    for t in ts:
        if not 40 <= len(t) <= 60: notes.append(f'title {len(t)} chars: {t}')
        if re.search('[\u2013\u2014]', t) or any(h in t.lower() for h in HYPE): notes.append('dash/hype: ' + t)
        tl = set(re.findall(r"[a-z']+", t.lower())) - {'the', 'a', 'to', 'you', 'your', 'it', 'of', 'is', 'why', 'and', 'on', 'in', 'for', 'that', 'i', 'my'}
        rep = tl & set(w)
        if rep: notes.append(f'word repeated in title "{t[:30]}…": {", ".join(sorted(rep))}')
    bad += bool([n for n in notes if not n.startswith('word repeated')])
    print(f'{d:28s} {txt.strip()!r:32s} ' + ('; '.join(notes) if notes else 'ok'))
print('FAILS', bad)
