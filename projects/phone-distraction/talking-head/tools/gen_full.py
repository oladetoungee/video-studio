#!/usr/bin/env python3
"""Writes moments/full.js: her WHOLE video, tightened, with motion throughout (layout menu L1-L13).
Her words are cut into breath-sized phrases (3-6.5 s, sentence / clause ends), and each phrase gets a layout:
- the film's own screens (synced by her words) as L5 half and half, L9 cutaway or L11 corner cam, where the film shows
  something real (the patent, the EU releases, the CHI paper) or a phone event (badges, feed, pull-to-refresh, toggles)
- her on camera in between: L1 framings, L2 a word behind her, L8 a keyword, L3 giant type, L4 a stack, L7 pops, L10 cards,
  L12 highlights, one L13 glitch
Rules (BUILD-BRIEF): something changes every 3-6 s, the same layout never twice in a row, >= 4 layouts a minute, never flipped.
Hand-picked lines (PICK) override the automatic text for the moments that matter. Re-run after editing PICK."""
import json, os, re
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FILM = os.path.join(os.path.dirname(ROOT), 'film')
W = json.load(open(os.path.join(ROOT, 'data/raw_words.json')))   # her words on the source timeline (what the moment matches)
CL = json.load(open(os.path.join(ROOT, 'data/edl.json')))['full']['clips']
_k = []   # the same filter as footage.js initMomentWords: words inside the kept clips, a word repeated across a jump cut keeps its 2nd take
for ci, (a, b) in enumerate(CL):
    for w in W:
        if w['t'] >= a - 0.08 and w['t'] < b - 0.03: _k.append(dict(w, k=ci))
_n = lambda s: re.sub(r"[^a-z0-9']", '', s.lower().replace('’', "'"))
for i in range(len(_k) - 1, 0, -1):
    if _k[i]['k'] != _k[i - 1]['k'] and _n(_k[i]['w']) == _n(_k[i - 1]['w']) and abs(_k[i]['t'] - _k[i - 1]['t']) < 0.6: del _k[i - 1]
W = _k
SEG = json.load(open(os.path.join(FILM, 'data/cutlist.json')))['segments']
def to_film(t):   # source time -> the film's edited-voice time
    for g in SEG:
        if g['orig_start'] <= t < g['orig_end']: return g['edit_start'] + t - g['orig_start']
    return t
SC = json.load(open(os.path.join(FILM, 'data/meta.json')))['SCENES']
INTRO = json.load(open(os.path.join(FILM, 'film.json')))['intro']
norm = lambda s: re.sub(r"[^a-z0-9']", '', s.lower().replace('’', "'"))
STOP = set("a an the and or but so to of in on at for with from by is are was were be been it it's its this that these those i i'm you you're your we they he she my me our their them his her just like um uh really very actually kind sort thing things something some there here what when where who how why if then than do does did don't didn't not no yes yeah okay one two also more most much many all any can could would should will about into up down out over again even only because as know mean get got make made going go gonna want need".split())

# film screens worth showing as an insert, and how (half / cutaway / corner)
FILMY = {'hook': 'cutaway', 'later': 'half', 'plan': 'half', 'quote': 'cutaway', 'flood': 'half', 'free': 'half', 'ads': 'half', 'product': 'cutaway',
  'fogg': 'half', 'class': 'corner', 'model': 'cutaway', 'prompt': 'half', 'students': 'corner', 'gamble': 'cutaway', 'psych': 'half', 'predict': 'half',
  'phoneworks': 'half', 'designs': 'corner', 'ptr': 'half', 'patent': 'cutaway', 'pulls': 'half', 'scroll': 'half', 'pages': 'half', 'removed': 'corner',
  'loadmore': 'half', 'cues': 'cutaway', 'lastpage': 'cutaway', 'autoplay': 'half', 'decide': 'half', 'effort': 'corner', 'defaults': 'half',
  'badges': 'half', 'accident': 'cutaway', 'bluered': 'half', 'grab': 'cutaway', 'everyapp': 'corner', 'unfinished': 'half', 'chi': 'cutaway',
  'urgent': 'half', 'likes': 'half', 'approval': 'half', 'howmany': 'corner', 'check': 'half', 'braindrain': 'half', 'eu-tiktok': 'cutaway',
  'eu-named': 'cutaway', 'eu-meta': 'cutaway', 'legal': 'corner', 'whatnow': 'half', 'nineteen': 'half', 'left': 'cutaway', 'need': 'corner',
  'rule': 'half', 'notifoff': 'half', 'try': 'cutaway', 'grayscale': 'half', 'autoplayoff': 'half', 'notifneed': 'corner', 'homescreen': 'half',
  'blocker': 'cutaway', 'askyourself': 'half', 'asset': 'cutaway', 'takeback': 'cutaway'}
# her lines that get their own treatment: first words of the phrase -> (layout, args)
PICK = [
  ("your phone was intentionally", 'shout', ['Designed to', '*distract you*']),
  ("my name is gbemisola", 'card', ['Gbemisola', '*HCI researcher*']),
  ("back in 1971", 'keyword', 'back in ~1971~'),
  ("you don't pay instagram", 'stack', [("Instagram: free", "instagram"), ("TikTok: free", "tiktok"), ("Facebook: free", "facebook")]),
  ("mike krieger", 'pops', ['Mike Krieger', 'Tristan Harris']),
  ("i should only open instagram", 'pops', ['Twitter', 'Instagram', 'TikTok']),
  ("so your attention is in a way the product", 'behind', ['product']),
  ("persuasive technology", 'keyword', '~persuasive~ technology'),
  ("it is also the bedrock of gambling", 'behind', ['gambling']),
  ("the first of many is the pulltorefresh", 'shout', ['*Pull-to-refresh*']),
  ("another intentional design that keeps you stuck", 'keyword', 'infinite ~scroll~'),
  ("do i actually want to keep going", 'shout', ['Keep', '*going?*']),
  ("another design that keeps you stuck", 'keyword', '~autoplay~'),
  ("so deciding to stop takes efforts", 'pops', ['stop: effort', 'continue: no effort']),
  ("so it was changed to red", 'behind', ['red']),
  ("another reason why you cannot let go", 'keyword', '~likes~'),
  ("i was also reading that in february 2026", 'card', ['February 2026', 'the *EU* steps in']),
  ("now when it comes to regulation", 'keyword', 'a global ~award~'),
  ("i remember when i was 19", 'behind', ['19']),
  ("and i didn't use the app for six good years", 'shout', ['Six', '*good years*']),
  ("these days my personal rule", 'behind', ['need']),
  ("and all my notifications are turned off", 'keyword', 'even ~WhatsApp~'),
  ("you can try grayscale", 'keyword', '~grayscale~'),
  ("your attention is an asset", 'shout', ['Your attention', 'is an *asset*']),
  ("and you need to take it back", 'shout', ['Take it', '*back*']),
]
GLITCH = "and that does not did not happen by accident"

def chunks():
    out, cur = [], []
    for i, w in enumerate(W):
        cur.append(w); d = w['e'] - cur[0]['t']; nxt = W[i + 1] if i + 1 < len(W) else None
        end_s = w['w'][-1] in '.?!'; clause = w['w'][-1] in ',;:'
        gap = (nxt['t'] - w['e']) if nxt else 9
        if not nxt or (end_s and d >= 2.6) or (clause and d >= 3.6) or d >= 6.2 or (gap > 0.5 and d >= 2.2):
            out.append(cur); cur = []
    # fold very short tails into the previous phrase
    res = []
    for c in out:
        if res and c[-1]['e'] - c[0]['t'] < 1.6 and (c[-1]['e'] - res[-1][0]['t']) < 7.5: res[-1] = res[-1] + c
        else: res.append(c)
    return res

def scene_at(t):
    t = to_film(t) + INTRO; s = [x for x in SC if x['start'] <= t < x['end']]; return s[0]['id'] if s else ''

MARKS = []
for f in ('s1', 's2', 's3', 's4'):
    src = open(os.path.join(FILM, 'scenes', f + '.js')).read()
    for q in re.findall(r"'([^'\n]{4,160})'", src) + re.findall(r'"([^"\n]{4,160})"', src):
        for m in re.findall(r"[*_]([A-Za-z0-9’',.?: -]{3,40}?)[*_]", q):
            ws = [norm(x) for x in m.split() if norm(x)]
            if ws and sum(w not in STOP for w in ws) >= max(1, len(ws) - 1) and len(' '.join(ws)) >= 5: MARKS.append((ws, m.strip(' .,?:')))
MARKS.sort(key=lambda x: -len(' '.join(x[0])))

def marked(c):
    ws = [norm(w['w']) for w in c]
    for mw, txt in MARKS:
        n = len(mw)
        for i in range(len(ws) - n + 1):
            if ws[i:i + n] == mw: return txt
    return None

def keyw(c, n=1):
    ws = [(norm(w['w']), re.sub(r"[.,?!;:]+$", '', w['w']), w) for w in c]
    cand = [x for x in ws if x[0] and x[0] not in STOP and len(x[0]) > 3]
    cand.sort(key=lambda x: -len(x[0]))
    return [x[1] for x in cand[:n]] or [ws[-1][1]]

def js(s): return json.dumps(s, ensure_ascii=False)

def main():
    C = chunks(); lines = []; keys = {}
    talk_frames = ['mid', 'close', 'wide', 'close', 'mid', 'tight']
    her_cycle = ['talk', 'keyword', 'talk', 'behind', 'talk', 'keyword']; used_words = set()
    film_cycle = ['half', 'cutaway', 'corner']
    last = None; hi = 0; fi = 0; ti = 0; glitched = False; used_film = {}
    skip = set()
    for n, c in enumerate(C):
        if n in skip: keys[f'p{n}'] = ' '.join(norm(w['w']) for w in c if norm(w['w'])); continue
        ph = ' '.join(norm(w['w']) for w in c if norm(w['w']))
        k = f'p{n}'; keys[k] = ph
        sid = scene_at((c[0]['t'] + c[-1]['e']) / 2)
        pick = next((p for p in PICK if ph.startswith(p[0]) or (' ' + p[0]) in (' ' + ph) and ph.find(p[0]) < 12), None)
        lay = None; arg = None
        if pick: lay, arg = pick[1], pick[2]
        if lay is None:
            mk = marked(c)
            if last in ('half', 'cutaway', 'corner', None) or (last == 'shout'):
                lay = her_cycle[hi % len(her_cycle)]; hi += 1
                if lay in ('keyword', 'behind') and not mk: lay = 'talk'
                if lay in ('keyword', 'behind') and mk and mk.lower() in used_words: lay = 'talk'
                if lay == 'keyword': arg = '~' + mk + '~'; used_words.add(mk.lower())
                if lay == 'behind': arg = [max([x for x in mk.split() if norm(x) not in STOP] or mk.split(), key=len).strip(',.?')]; used_words.add(mk.lower())
            else:
                lay = film_cycle[fi % 3]
        if lay == last: lay = 'talk' if last != 'talk' else 'keyword'
        span = f'k.{k}'
        if ph.startswith(GLITCH) and not glitched:
            lines.append(f"  TH.glitch(k.{k}.w[{min(5, len(c) - 1)}], {{ text: 'ACCIDENT?' }});   // L13 (once)"); glitched = True
        if lay == 'talk':
            fr = talk_frames[ti % len(talk_frames)]; ti += 1
            kw = keyw(c)[0].lower()
            lines.append(f"  TH.talk({span}, {{ frame: '{fr}', alt: {str(ti % 2 == 0).lower()}, punch: [{js(norm(kw))}] }});   // L1")
        elif lay in ('half', 'cutaway', 'corner'):
            o = "{ film: {}" + (", side: V('" + ('right' if fi % 2 else 'left') + "', 'top')" if lay == 'half' else '') + (", enter: 'push'" if lay == 'cutaway' and fi % 3 == 0 else '') + " }"
            fi += 1
            lines.append(f"  TH.{lay}({span}, {o});   // {'L5' if lay == 'half' else 'L9' if lay == 'cutaway' else 'L11'} film: {sid}")
        elif lay == 'keyword':
            s = arg or ('~' + keyw(c)[0] + '~')
            lines.append(f"  TH.keyword({span}, {js(s)});   // L8")
        elif lay == 'behind':
            ws = arg or [keyw(c)[0]]
            t_ = ', '.join(f"WT(k.{k}, {js(w)})" for w in ws)
            lines.append(f"  TH.behind({span}, {js(ws)}, {{ times: [{t_}] }});   // L2")
        elif lay == 'shout':
            ln = arg or [' '.join(keyw(c, 2))]
            lines.append(f"  TH.shout({span}, {js(ln)});   // L3")
        elif lay == 'card':
            ln = arg or [keyw(c)[0]]
            lines.append(f"  TH.card({span}, {js(ln)});   // L10")
        elif lay == 'pops':
            items = arg or keyw(c, 3)
            if len(items) < 2: items = items + [keyw(c)[0]]
            lines.append(f"  TH.pops({span}, {js(items[:4])}, {{ focus: {len(items[:4]) - 1} }});   // L7")
        elif lay == 'stack' and arg:
            nxt = ' '.join(norm(w['w']) for w in (C[n + 1] if n + 1 < len(C) else []))
            if any(b_ not in ph.split() for _, b_ in arg) and n + 1 < len(C): span = f"{{ from: k.{k}, to: k.p{n + 1} }}"; skip.add(n + 1)
            items = ', '.join("{ s: " + js(a_) + ", at: " + js(b_) + " }" for a_, b_ in arg)
            lines.append(f"  TH.stack({span}, [{items}]);   // L4")
        elif lay == 'stack':
            ws_ = [w for w in c]; third = max(1, len(ws_) // 3); parts = [ws_[:third], ws_[third:2 * third], ws_[2 * third:]]
            parts = [p for p in parts if p]
            items = ', '.join("{ s: " + js(' '.join(w['w'] for w in p).rstrip('.,')) + ", at: " + js(' '.join(norm(w['w']) for w in p[:2] if norm(w['w']))) + " }" for p in parts)
            lines.append(f"  TH.stack({span}, [{items}]);   // L4")
        last = lay
    out = ["/* phone-distraction: the FULL talking-head edit (her whole video, tightened), in the film's look A (Lock screen).",
           " * Generated by tools/gen_full.py (phrases from her corrected words; PICK overrides the important lines). Layouts L1-L13",
           " * (studio/runtime/layouts.js): something changes every 3-6 s, never the same layout twice in a row, film inserts are the",
           " * motion film synced by her words. Her footage is only cropped and scaled: never flipped, never retouched. */",
           "'use strict';",
           "/** start of the first spoken occurrence of a word inside a phrase */",
           "function WT(ph, word) { const n = (s) => s.toLowerCase().replace(/[’]/g, \"'\").replace(/[^a-z0-9']/g, ''); const ws = WORDS.slice(ph.i, ph.i + ph.w.length); const k = ws.findIndex(x => x.n === n(word)); return ph.w[k < 0 ? 0 : k]; }",
           "function buildMoment() {", "  const k = PS({"]
    out += [f"    {k}: {js(v)}," for k, v in keys.items()]
    out += ["  });"] + lines + ["}"]
    open(os.path.join(ROOT, 'moments/full.js'), 'w').write('\n'.join(out) + '\n')
    from collections import Counter
    print(len(C), 'phrases', Counter(l.split('(')[0].strip() for l in lines))

main()
