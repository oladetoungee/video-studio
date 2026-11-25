#!/usr/bin/env python3
"""How to read research papers: thumbnails SET 3 (2026-11-13, projects/FULL-KIT-BRIEF-2026-11-12.md).
Fonts ONLY from the font board (inspiration/boards/fonts/), each with its board item's own colours (text + ground, sampled from the
specimen). Every thumbnail copies a DIFFERENT thumbnail-board composition ("Thumbnails N" = studio /ideas/boards/thumbnails/);
max 2 "words left / her right" (04, 09). Photos: her 29 Oct shoot, outfit C (1595 / 1599 / 1600 / 1601, Enhance photo + cut-out,
face untouched: class no-lift); Pexels stock (free licence) for the desk / library scenes, listed in README.md.
Writes directions/<dir>/index.html + content.json (keeps "nudge" + edited "text" of an existing content.json unless --force).
Run: python3 tools/gen-set3.py && node render.mjs"""
import json, os, sys
HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__))); D = os.path.join(HERE, 'directions')
FORCE = '--force' in sys.argv
SH = '../../assets/photo/shoot/'
ST = '../../assets/stock/'
CO = '../../assets/collage/'
HEAD = '<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../../lib/fb.css"><style>{css}</style></head><body><div class="t">'
TAIL = '</div><script src="../../lib/bind.js"></script></body></html>'
ROOM = '<img class="room z1" data-img="room" alt=""><div class="dim z2"></div><img class="room z3" data-img="me" alt="">'
def room(n): return {'room': SH + f'room-{n}.jpg', 'me': SH + f'room-{n}-cut.png'}
OUT = []

def put(dirname, css, body, content):
    p = os.path.join(D, dirname); os.makedirs(p, exist_ok=True); cj = os.path.join(p, 'content.json')
    if os.path.exists(cj) and not FORCE:
        old = json.load(open(cj)); content['nudge'] = old.get('nudge', {})
        for k, v in (old.get('text') or {}).items():
            if k in content['text']: content['text'][k] = v
    else: content.setdefault('nudge', {})
    content.setdefault('images', {}); content.setdefault('vars', {}); content.setdefault('class', 'no-lift')
    content['title'] = content['titles'][0]
    open(os.path.join(p, 'index.html'), 'w').write(HEAD.format(css=css) + body + TAIL)
    json.dump(content, open(cj, 'w'), indent=2, ensure_ascii=False); OUT.append(dirname)

ARROW = ('<svg viewBox="0 0 260 200" width="{w}" height="{h}"><path d="M14 30 C 90 10, 190 40, 214 150" stroke="{c}" stroke-width="11" fill="none" '
         'stroke-linecap="round"/><path d="M178 128 L 216 162 L 238 116" stroke="{c}" stroke-width="11" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>')

KP = [ST + 'keshav_p1.png', ST + 'keshav_p2.png']
def page(cls, x, y, w, r, src=0, move='', hl=None, z='z5'):
    """a real printed page (Keshav's "How to Read a Paper", p1 / p2) as a prop; hl = [(left, top, width, height)] highlighter strips in % of the page"""
    strips = ''.join(f'<i style="left:{a}%;top:{b}%;width:{c}%;height:{d}%"></i>' for a, b, c, d in (hl or []))
    return (f'<div class="rpg {cls} {z}" data-move="{move or cls}" style="left:{x}px;top:{y}px;width:{w}px;rotate:{r}deg">'
            f'<img src="{KP[src]}" alt="">{strips}</div>')
RPG = ('.rpg{box-shadow:0 16px 36px rgba(0,0,0,.38);background:#fff}.rpg img{display:block;width:100%}'
       '.rpg i{position:absolute;background:#F2D33A;mix-blend-mode:multiply}')
HL1 = [(33, 7.5, 33, 3.6), (8, 27, 41, 8.5)]   # Keshav p1: the title + the abstract

# 02 Thumbnails 69 (yt-16 "12:30 PM | 7:30 PM": a split of two photos, one short label on top of each)
put('02-every-word-vs-3-passes',
    RPG + '.t{background:#1C1C1C}.p{top:0;width:636px;height:720px;overflow:hidden}.p img.ph{position:absolute;display:block;width:1180px;top:-150px}'
    '.pa{left:0}.pb{left:644px}.pa img.ph{left:-262px}.pb img.ph{left:-292px}'
    '.dimp{position:absolute;inset:0;background:rgba(28,28,28,.42)}'
    '.lb{top:30px;font:700 84px/1 FBIT,sans-serif;letter-spacing:-.025em;padding:12px 22px 16px;white-space:nowrap}'
    '.la{left:318px;translate:-50% 0;background:#1C1C1C;color:#FFFFFF}.lbb{left:962px;translate:-50% 0;background:#F7D51D;color:#1C1C1C}',
    '<div class="p pa z1"><img class="ph" data-img="a" alt=""><div class="dimp"></div><img class="ph" data-img="acut" alt=""></div>'
    '<div class="p pb z1"><img class="ph" data-img="b" alt=""><div class="dimp"></div><img class="ph" data-img="bcut" alt=""></div>'
    '<div class="lb la z3" data-k="a"></div><div class="lb lbb z3" data-k="b"></div>'
    + ''.join(page(f'pl{i}', x, y, 300, r, i % 2) for i, (x, y, r) in enumerate([(-80, 470, -14), (60, 430, 9), (230, 455, -6), (380, 420, 12),
                                                                                  (-20, 560, 6), (170, 545, -10), (340, 575, 4)]))
    + page('one', 800, 520, 230, -5, 0, hl=HL1),
    {'text': {'a': 'every word', 'b': '3 passes'},
     'images': {'a': SH + 'room-1595.jpg', 'acut': SH + 'room-1595-cut.png', 'b': SH + 'room-1601.jpg', 'bcut': SH + 'room-1601-cut.png'},
     'kind': 'split (her twice: buried in pages / at ease with one page)',
     'board': 'Thumbnails 69 (yt-16 "12:30 PM | 7:30 PM")',
     'fonts': ['thumbs-02 Inter Tight Bold / Black (white on #1C1C1C, #1C1C1C on the yellow box #F7D51D, from Thumbnails 21)'],
     'colours': 'thumbs-02: #1C1C1C / #FFFFFF / #F7D51D',
     'thumbnail_text': 'every word | 3 passes',
     'titles': ['Stop Reading Research Papers From Start to Finish', 'How to Read Research Papers Faster as a Student',
                'You\'re Reading Research Papers in the Wrong Order'],
     'direction': 'Copies Thumbnails 69: two photos side by side, one short label each. Left: her, stressed (hand on her head), a pile of '
                  'real printed pages up to her chin, "every word"; right: her at ease, one page with the title and abstract highlighted.'})

# 05 Thumbnails 36 (pin-03-08 "Everything done by 2pm": a real list left, a serif line right, light grey ground). No face.
strips = ''.join(f'<div class="cs z3" data-move="c{i}" style="left:{40 + (i % 2) * 26}px;top:{50 + (i - 1) * 128}px;rotate:{(-1.5, 1.2, -0.8, 1.6, -1.2)[i - 1]}deg">'
                 f'<img src="{ST}k5c-{i}.png" alt=""><i style="width:{w}%"></i></div>'
                 for i, w in zip(range(1, 6), (83, 81, 85, 86, 70)))
put('05-five-questions-for-any-paper',
    '.t{background:#990915}.cs{background:#FFFFFF;padding:8px 16px;box-shadow:0 10px 24px rgba(0,0,0,.18)}.cs img{display:block}'
    '.cs i{position:absolute;left:17%;top:22%;height:56%;background:#F2D33A;mix-blend-mode:multiply}'
    '.h{left:680px;top:110px;width:570px;font:800 104px/1.0 FBBod,serif;color:#FBF3EC;letter-spacing:-.02em}'
    '.cr{left:680px;bottom:34px;color:#FBF3EC;font-size:20px}',
    strips + '<div class="h z3" data-k="h"></div><div class="credit cr z3" data-k="cr"></div>',
    {'text': {'h': '5 questions to ask any research paper', 'cr': 'Clippings: S. Keshav, "How to Read a Paper" (2007)'},
     'kind': 'clippings of a real page (the five questions, each cut out and highlighted) on deep red, no face',
     'board': 'Thumbnails 36 (pin-03-08 "Everything done by 2pm")',
     'fonts': ['design-16 Bodoni Moda 800 (cream #FBF3EC on red #990915, Design 1)'],
     'colours': 'design-16 / combo-15: ground #990915, ink #FBF3EC',
     'thumbnail_text': '5 questions to ask any research paper',
     'titles': ['How to Read a Research Paper Critically (The 5 Cs)', 'How to Tell if a Research Paper Is Any Good',
                'How to Read Research Papers Effectively for Beginners'],
     'direction': 'Copies Thumbnails 36: a real list on the left (the five numbered questions cut out of Keshav\'s "How to Read a Paper" '
                  'as paper clippings, the key words highlighted, credited), the promise in a heavy serif on deep red.'})

# 08 Thumbnails 125 (her own "Database Indexes": the words big top-left, the literal thing drawn, her big on the right). Words left / her right (the only one).
PAGE_ROWS = [('Abstract', 1), ('Introduction', 1), ('Methods', 0), ('Results', 0), ('Conclusion', 1)]
prow = ''.join(f'<div class="pr{" on" if on else ""}">{n}</div>' for n, on in PAGE_ROWS)
put('08-read-these-parts-first',
    '.t{background:#D9F44F}.h{left:54px;top:30px;font:900 110px/.9 FBIT,sans-serif;color:#070804;letter-spacing:-.05em}'
    '.pg{left:56px;top:262px;width:540px;height:480px;background:#FFFFFF;border-radius:10px 10px 0 0;padding:24px 26px;box-shadow:0 20px 50px rgba(7,8,4,.25);rotate:-3deg}'
    '.pr{font:700 52px/1 FBIT,sans-serif;color:#070804;padding:12px 16px 14px;margin:5px -16px;border-radius:5px;letter-spacing:-.02em}.pr.on{background:#070804;color:#D9F44F}'
    '.me{left:120px;top:-400px;width:1900px}',
    '<div class="h z3" data-k="h"></div><div class="pg z3" data-move="page">' + prow + '</div>'
    '<img class="cut me z2" data-img="me" data-move="her" alt="">',
    {'text': {'h': 'Read these<br>parts first'}, 'images': {'me': SH + 'room-1603-cut-tight.png'},
     'kind': 'flat + drawn paper + her cut-out, big (words left / her right, the only one in the set)',
     'board': 'Thumbnails 125 (her own "Database Indexes" thumbnail)',
     'fonts': ['combo-02 Inter Tight Black / Bold (#070804 on lime #D9F44F, Design 394)'],
     'colours': 'combo-02: ground #D9F44F, ink #070804',
     'thumbnail_text': 'Read these parts first + a paper with Abstract / Introduction / Conclusion marked',
     'titles': ['You\'re Reading Research Papers in the Wrong Order', 'Which Parts of a Research Paper to Read First',
                'How I Read Research Papers as a Master\'s Student'],
     'direction': 'Copies her own Database Indexes thumbnail (Thumbnails 125): the words big top-left, the literal thing drawn (a paper\'s '
                  'sections with three marked), she smiles big from the right.'})

# 03 Thumbnails 58 (yt-05 "FAVOR": huge yellow words on a dark ground beside the person)
put('03-read-any-paper-in-10-minutes',
    '.t{--rw:1500px;--rx:-420px;--ry:-200px;--dim:rgba(43,43,43,.84);background:#2B2B2B}'
    '.k{left:590px;top:96px;font:800 64px/1 FBMon,sans-serif;color:#FFFFFF;text-transform:uppercase;letter-spacing:-.01em;white-space:nowrap}'
    '.h{left:584px;top:180px;font:900 140px/.92 FBMon,sans-serif;color:#F6D23A;text-transform:uppercase;letter-spacing:-.045em}',
    ROOM + '<div class="k z4" data-k="k"></div><div class="h z4" data-k="h"></div>',
    {'text': {'k': 'Read any paper', 'h': 'in 10<br>minutes'}, 'images': room(1599),
     'kind': 'photo (her calm on the left, her room dark, huge yellow words on the right)',
     'board': 'Thumbnails 58 (yt-05 "FAVOR")',
     'fonts': ['thumbs-06 Montserrat Black (yellow #F6D23A on #2B2B2B, from Thumbnails 58) + the same font in white for the small line'],
     'colours': 'thumbs-06: ground #2B2B2B (her room darkened to it), #F6D23A',
     'thumbnail_text': 'READ ANY PAPER IN 10 MINUTES',
     'titles': ['How to Read a Research Paper (The 3-Pass Method)', 'How to Skim a Research Paper Before You Commit to It',
                'Read Less, Understand More: How to Read Research Papers'],
     'direction': 'Copies Thumbnails 58: huge yellow words on a dark ground beside her; the promise with its number (Keshav: the first '
                  'pass takes about five to ten minutes), she sits calm on the left in her darkened room.'})

# 09 Thumbnails 141 (viral: a real line from a paper + one note) with her big on the right in her real room (words left / her right, 2 of 2)
put('09-is-this-study-reliable',
    '.t{--rw:1600px;--rx:180px;--ry:-300px;--dim:rgba(20,20,20,.7);background:#141414}'
    '.note{left:44px;top:40px;width:640px;padding:30px 36px 34px;background:#F7F02B;rotate:-3deg;box-shadow:0 22px 46px rgba(0,0,0,.45)}'
    '.note .a{font:400 108px/.95 FBAB,sans-serif;color:#E2262B;text-transform:uppercase;letter-spacing:-.03em}'
    '.note .b{margin-top:16px;font:400 46px/1 FBAB,sans-serif;color:#E2262B;text-transform:uppercase;letter-spacing:-.01em}'
    '.clip{left:40px;top:470px;padding:14px 20px;background:#FFFFFF;rotate:-1.5deg;box-shadow:0 20px 44px rgba(0,0,0,.5)}'
    '.clip img{display:block;width:700px}.clip i{position:absolute;left:1.5%;top:18%;width:97%;height:64%;background:#F7F02B;mix-blend-mode:multiply}'
    '.cr{left:50px;top:600px;color:#DDDDDD;font-size:19px}',
    ROOM + '<div class="note z5" data-move="note"><div class="a" data-k="a"></div><div class="b" data-k="b"></div></div>'
    '<div class="clip z5" data-move="clip"><img data-img="clip" alt=""><i></i></div><div class="credit cr z5" data-k="cr"></div>',
    {'text': {'a': 'Only 12 people?', 'b': 'Is this study reliable?', 'cr': 'K. Caine, CHI 2016'},
     'images': {**room(1605), 'clip': ST + 'caine-12.png'},
     'kind': 'photo (her thinking, big, in her real room) + a yellow note + one real line from a study',
     'board': 'Thumbnails 141 (viral: "unclear ACL / Yoruba paper" screenshot)',
     'fonts': ['thumbs-12 Archivo Black caps (red #E2262B on yellow #F7F02B, from Thumbnails 89)'],
     'colours': 'thumbs-12: #F7F02B / #E2262B; her room darkened to #141414',
     'thumbnail_text': 'ONLY 12 PEOPLE? IS THIS STUDY RELIABLE? + "the most common sample size is 12."',
     'titles': ['How to Spot a Weak Study When Reading Research Papers', 'How to Tell if a Research Paper Is Any Good',
                'Sample Size, Method, Funding: How to Judge a Study'],
     'direction': 'Copies Thumbnails 141 (a real line from a paper with one note on it): "the most common sample size is 12." from '
                  'Caine\'s CHI 2016 abstract (verbatim, credited), the yellow note asks "Only 12 people?", she thinks it over, big, on the right.'})

SCORES = {}
REC = '08-read-these-parts-first'
for d in OUT:
    cj = os.path.join(D, d, 'content.json'); c = json.load(open(cj)); c['scores'] = SCORES.get(d, ''); c['recommended'] = d == REC
    json.dump(c, open(cj, 'w'), indent=2, ensure_ascii=False)
json.dump(sorted(OUT), open(os.path.join(D, 'index.json'), 'w'))
print('\n'.join(OUT))
