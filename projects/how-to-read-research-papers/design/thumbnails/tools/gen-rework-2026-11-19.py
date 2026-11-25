#!/usr/bin/env python3
"""How to read research papers: thumbnail REWORK from her 50 picks (2026-11-19, projects/THUMBS-REWORK-BRIEF-2026-11-19.md).
Each new thumbnail copies ONE of her 19 Nov picks (inspiration/boards/thumbnails/img/pick1119-NN.jpg) in composition, kind of
picture and type treatment. Same editable system as gen-set3.py / gen-rework-2026-11-16.py: directions/<dir>/index.html +
content.json (lib/bind.js); every word in content.json "text". Keeps her studio nudges / edited text unless --force.
Run: python3 tools/gen-rework-2026-11-19.py && node render.mjs 12
Only 12 passed the cold critic (3 rounds); the others are written only with --all (for reviving one: then move it back from
archive/thumbnails-retired-2026-11-19/drafts-below-7/ or render it and judge again)."""
import json, os, sys
HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__))); D = os.path.join(HERE, 'directions')
FORCE = '--force' in sys.argv
OD = '../../assets/photo/oredev/'
ST = '../../assets/stock/'
HEAD = '<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../../lib/fb.css"><style>{css}</style></head><body><div class="t">'
TAIL = '</div><script src="../../lib/bind.js"></script></body></html>'
OUT = []
KEEP = {'12-stop-reading-every-word'}

def put(dirname, css, body, content):
    if dirname not in KEEP and '--all' not in sys.argv: return
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

KP = [ST + 'keshav_p1.png', ST + 'keshav_p2.png']
def page(cls, x, y, w, r, src=0, hl=None, z='z3', extra=''):
    strips = ''.join(f'<i style="left:{a}%;top:{b}%;width:{c}%;height:{d}%"></i>' for a, b, c, d in (hl or []))
    return (f'<div class="rpg {cls} {z}" data-move="{cls}" style="left:{x}px;top:{y}px;width:{w}px;rotate:{r}deg;{extra}">'
            f'<img src="{KP[src]}" alt="">{strips}</div>')
RPG = ('.rpg{box-shadow:0 16px 36px rgba(0,0,0,.38);background:#fff}.rpg img{display:block;width:100%}'
       '.rpg i{position:absolute;background:#F7D51D;mix-blend-mode:multiply}')
HL1 = [(33, 7.5, 33, 3.6), (8, 27, 41, 8.5)]   # Keshav p1: the title + the abstract

# 10 (pick1119-28 'Read Smarter') and 14 (pick1119-22 "you're not slow.") were built and dropped after cold critic round 1
# (10: 3/5, a near-clone of the pick beside it; 14: 5/6, collage with stock side panels). In ~/.Trash/research-thumbs-r1-dropped-2026-11-19/.

# 11 (pick1119-27 "finally, it makes sense.") was built and dropped after round 2 (4/5 in round 1: pretty, says nothing; a big
# enough paper covers her face). Its photo moved to 15. In ~/.Trash/research-thumbs-r1-dropped-2026-11-19/.

# 12 · pick1119-24 ("I Started A Book Club...": condensed serif caps stacked left over his real room, books bottom-left, him
# talking with a hand up on the right). Ours: her at the lectern mid-sentence, open smile, hand out (Øredev 55642240014; the
# lectern logo and laptop sticker are cropped out), a pile of real printed pages bottom-left, serif words left.
# Font thumbs-05 Libre Baskerville Regular + Bold, white on a dark ground (Thumbnails 48).
put('12-stop-reading-every-word',
    RPG + '.t{background:#1E1F22}'
    '.room{left:-20px;top:-70px;width:2000px;display:block}.dim{inset:0;background:rgba(14,14,16,.74)}'
    '.cut{left:-20px;top:-70px;width:2000px}'
    '.sm{left:54px;top:64px;color:#FFFFFF;font:700 78px/1 FBLib,serif;letter-spacing:-.03em;text-transform:uppercase}'
    '.big{left:50px;top:176px;color:#FFFFFF;font:700 132px/.98 FBLib,serif;letter-spacing:-.035em;text-transform:uppercase}',
    '<img class="room z1" data-img="room" alt=""><div class="dim z1"></div><img class="cut z2" data-img="cut" alt="">'
    + ''.join(page(f'pl{i}', x, y, 300, r, i % 2, z='z4') for i, (x, y, r) in enumerate([(40, 470, -9), (230, 500, 6)]))
    + '<div class="sm z5" data-k="a"></div><div class="big z5" data-k="b"></div>',
    {'text': {'a': 'stop reading', 'b': 'every<br>word'},
     'images': {'room': OD + 'od-55642441705.png', 'cut': OD + 'od-55642441705-cut.png'},
     'kind': 'her alive (speaking, hand out) on the right + serif words stacked left + a pile of real pages (words left / her right #2)',
     'board': 'pick1119-24 ("I Started A Book Club...": condensed serif caps left, books bottom-left, him talking right)',
     'fonts': ['thumbs-05 Libre Baskerville Bold, white on dark (Thumbnails 48)'],
     'colours': 'white on the room darkened to ~#1E1F22',
     'photo': 'Øredev 2026 photo 55642441705 (lectern, smiling mid-sentence, close), Enhance photo --bg keep --strength 0.5 + cut-out; logo cropped',
     'thumbnail_text': 'STOP READING EVERY WORD',
     'titles': ['I\'m a Researcher. This Is How I Read a Paper',
                'How to Read a Research Paper Without Reading It All',
                'Stop Reading Research Papers From Start to Finish'],
     'direction': 'Copies pick1119-24: the creator alive and talking on the right, big serif words stacked on the left, the topic\'s '
                  'objects (a pile of real printed pages) bottom-left.'})

# 13 · pick1119-34 ("Scientists studied doomscrolling. Here's what they found." + heavy italic serif "Brain Rot Research" stacked
# left, yellow underline, the real object big on the right). Ours: the real paper (Keshav 2007 p1, title + abstract highlighted)
# big on the right; three words for the three passes stacked left. Font thumbs-04 Playfair Display Black Italic, cream #EAD9B9
# on dark #2B2724 (Thumbnails 41); the underline in the page's highlighter yellow.
put('13-skim-read-rebuild',
    RPG + '.t{background:#2B2724}'
    '.h{left:50px;top:110px;color:#EAD9B9;font:900 128px/1.04 FBPF,serif;letter-spacing:-.02em}'
    '.h span{display:block}.h .u{display:inline-block;border-bottom:12px solid #F7D51D;padding-bottom:2px}'
    '.cr{left:62px;top:672px;color:#EAD9B9;font-size:15px}',
    page('p1', 700, 70, 380, -7, 0, hl=HL1[:1], z='z2')
    + page('p2', 850, 130, 380, 2, 0, hl=HL1 + [(8, 50, 41, 12), (52, 30, 40, 10)], z='z3')
    + page('p3', 990, 200, 380, 9, 0, hl=[(5, 5, 90, 90)], z='z4')
    + '<div class="h z5" data-move="words"><span><span class="u" data-k="a"></span></span><span data-k="b"></span><span data-k="c"></span></div>'
    + '<div class="credit cr z5" data-k="cr"></div>',
    {'text': {'a': 'Skim.', 'b': 'Read.', 'c': 'Deep dive.', 'cr': 'S. Keshav, "How to Read a Paper" (2007)'},
     'kind': 'no face: the same real paper three times, more highlighted each time (title / + key parts / all), + three heavy italic serif words stacked left',
     'board': 'pick1119-34 ("Scientists studied doomscrolling. Here\'s what they found.", "Brain Rot Research" stacked left + the object right)',
     'fonts': ['thumbs-04 Playfair Display Black Italic, cream #EAD9B9 on #2B2724 (Thumbnails 41)'],
     'colours': 'thumbs-04: #EAD9B9 on #2B2724; underline #F7D51D (the highlighter on the page)',
     'photo': 'none; real pages: S. Keshav, "How to Read a Paper", ACM SIGCOMM CCR 2007 (free PDF), credited',
     'thumbnail_text': 'Skim. Read. Deep dive.',
     'titles': ['A Professor\'s 3-Pass Method for Reading Research Papers',
                'How Researchers Actually Read a Paper (3 Passes)',
                'How to Read a Research Paper (The 3-Pass Method)'],
     'direction': 'Copies pick1119-34: a "here\'s what the expert says" title; on the picture, the real object big and three stacked '
                  'heavy italic serif words. Skim / read / rebuild = Keshav\'s passes (first pass skim, second read with care, third '
                  'the deep dive she describes, "virtually re-implement" the paper).'})

# 15 · pick1119-43 ("How to never procrastinate": black ground, a figure on the left looking at a phone, "is 3:32 / too long?" in
# heavy white sans with the number in red). Ours: her cut-out (Øredev 55642230148, hand at chin, looking down, thinking) on black,
# the question about the first pass (Keshav: 5-10 minutes tells you whether a paper is worth more time).
# Font thumbs-10 Poppins Bold lowercase, white + red key word (Thumbnails 84).
put('15-is-10-minutes-enough',
    RPG + '.t{background:#000000}.me{left:-150px;top:-380px;width:1000px;display:block}'
    '.q{left:640px;top:60px;color:#FFFFFF;font:700 132px/1.02 FBPop,sans-serif;letter-spacing:-.035em}'
    '.q em{font-style:normal;color:#E8352B}',
    '<img class="me z2" data-img="me" alt=""><div class="q z5" data-k="a"></div>'
    + page('pg', 720, 400, 440, 6, 0, hl=HL1[:1], z='z3'),
    {'text': {'a': 'is <em>10 min</em><br>enough?'},
     'images': {'me': OD + 'od-55642230148-cut.png'},
     'kind': 'flat black + her cut-out thinking on the left + one question with the number in red + the real paper under it',
     'board': 'pick1119-43 ("How to never procrastinate": figure left on black, "is 3:32 too long?" with the number red)',
     'fonts': ['thumbs-10 Poppins Bold lowercase, white + red key word #E8352B (Thumbnails 84)'],
     'colours': 'thumbs-10: #FFFFFF + #E8352B on #000000',
     'photo': 'Øredev 2026 photo 55642230148 (orange top, hand at chin), Enhance photo --bg keep --strength 0.5, cut-out',
     'thumbnail_text': 'is 10 min enough?',
     'titles': ['How to Know if a Research Paper Is Worth Reading',
                'Can You Judge a Research Paper in 10 Minutes?',
                'How to Skim a Research Paper Before You Commit to It'],
     'direction': 'Copies pick1119-43: one person on black on the left, a short question with a number in red on the right. The '
                  'number is true: Keshav\'s first pass takes 5-10 minutes and tells you whether to read on.'})

# 16 · pick1119-11 ("more books to read to be disgustingly educated": a huge light serif line across the top, partly behind her
# head, her in a real room). Ours: her on stage explaining with both hands (Øredev 55642239799, dark stage), the line behind her
# head. Font thumbs-17 / design-26 Instrument Serif italic, white on dark (Thumbnails 152 / Design 20).
put('16-read-like-a-researcher',
    '.t{background:#0B0B0D}.room{left:-240px;top:-420px;width:1800px;display:block}.cut{left:-240px;top:-420px;width:1800px}'
    '.big{left:640px;top:16px;translate:-50% 0;color:#FFFFFF;font:400 168px/1 FBIS,serif;letter-spacing:-.025em;white-space:nowrap;text-shadow:0 4px 24px rgba(0,0,0,.6)}',
    '<img class="room z1" data-img="room" alt=""><div class="big z2" data-k="a"></div><img class="cut z3" data-img="cut" alt="">',
    {'text': {'a': 'read like a researcher'},
     'images': {'room': OD + 'od-55642239799.png', 'cut': OD + 'od-55642239799-cut.png'},
     'kind': 'real moment (her on stage, explaining with both hands) + one huge light serif line behind her head',
     'board': 'pick1119-11 ("more books to read to be disgustingly educated": huge serif line behind her head)',
     'fonts': ['thumbs-17 / design-26 Instrument Serif italic, white on dark (Thumbnails 152 / Design 20)'],
     'colours': 'white on the dark stage',
     'photo': 'Øredev 2026 photo 55642239799 (on stage, both hands up), Enhance photo --bg keep --strength 0.5 + cut-out',
     'thumbnail_text': 'read like a researcher',
     'titles': ['How I Read Research Papers as a Master\'s Student',
                'How to Read Research Papers Effectively for Beginners',
                'I\'m an HCI Researcher. Here\'s How I Read a Paper'],
     'direction': 'Copies pick1119-11: one big light serif line across the top, her head in front of it, a real moment. The line is '
                  'the feeling (you, reading like the people who write them); the title carries the search words.'})

idx = sorted(x for x in os.listdir(D) if os.path.exists(os.path.join(D, x, 'index.html')))
json.dump(idx, open(os.path.join(D, 'index.json'), 'w'))
print('\n'.join(OUT))
