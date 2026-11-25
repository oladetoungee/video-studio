#!/usr/bin/env python3
"""9 things thumbnails SET 5 (2026-11-13, FULL-KIT-BRIEF-2026-11-12): lifestyle look. Fonts ONLY from the font board, each in its
specimen's own colours; each thumbnail copies a DIFFERENT thumbnail-board composition ("Thumbnails N" = studio /ideas/boards/thumbnails/);
max 2 "words left / her right" (this set: 1, 07). Every stock photo is used in ONE thumbnail only. Round 2 after the cold critic
(round 1 had 11; 4 dropped as weak or look-alike, 3 new). Writes directions/<dir>/index.html + content.json (keeps "nudge" + edited "text"
of an existing content.json unless --force).  Run: python3 tools/gen-set5.py && node render.mjs"""
import json, os, sys
HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__))); D = os.path.join(HERE, 'directions')
FORCE = '--force' in sys.argv
SH = '../../assets/shoot/'; S5 = '../../assets/set5/'; CL = '../../assets/collage/'
HEAD = '<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../../lib/s5.css"><style>{css}</style></head><body><div class="t">'
TAIL = '</div><script src="../../lib/bind.js"></script></body></html>'
ROOM = '<img class="room z1" data-img="room" alt=""><div class="dim z2"></div><img class="room z3" data-img="me" alt="">'
def room(n): return {'room': SH + f'{n}.jpg', 'me': SH + f'{n}-person.png'}
OUT = []
CENSUS = {'01': 'her centred + photos', '02': 'her left, words right', '03': 'split, no face', '04': 'her left, list right', '05': 'scene, no face', '06': 'photo + words, no face', '07': 'words left / her right', '08': 'her centred, word behind', '09': 'her left, phone right', '10': 'scene, no face'}
T1 = '9 Easy Things I Do Instead of Doomscrolling'
T2 = 'Things to Do Instead of Doomscrolling (That I Actually Do)'
T3 = 'How to Stop Doomscrolling: 9 Things I Do Instead'
T4 = 'What to Do Instead of Scrolling on Your Phone (9 Ideas)'
T5 = "I'm Replacing Doomscrolling With These 9 Habits"
T6 = 'Offline Hobbies to Replace Doomscrolling (9 Easy Ones)'
TICK = '<svg viewBox="0 0 40 40" width="{s}" height="{s}" fill="none" stroke="{c}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 22l10 10L36 7"/></svg>'

def put(dirname, html, content):
    p = os.path.join(D, dirname); os.makedirs(p, exist_ok=True); cj = os.path.join(p, 'content.json')
    if os.path.exists(cj) and not FORCE:
        old = json.load(open(cj)); content['nudge'] = old.get('nudge', {})
        for k, v in (old.get('text') or {}).items():
            if k in content['text']: content['text'][k] = v
        for k in ('scores', 'recommended'):
            if k in old and k not in content: content[k] = old[k]
    else: content.setdefault('nudge', {})
    content.setdefault('images', {}); content.setdefault('vars', {}); content.setdefault('class', 'no-lift')
    content['title'] = content['titles'][0]; content['census'] = CENSUS[dirname[:2]]
    open(os.path.join(p, 'index.html'), 'w').write(html); json.dump(content, open(cj, 'w'), indent=2, ensure_ascii=False); OUT.append(dirname)

# 01 · Thumbnails 140 (viral-time-to-lock-in): her in the middle of her room, real photos of the topic round her, one serif line
def t01():
    css = ('.t{--rw:1280px;--rx:0px;--ry:-10px;--dim:rgba(60,42,34,.66);background:#3C2A22}'
           '.h{left:0;width:1280px;top:24px;text-align:center;color:#FFFFFF;white-space:nowrap;text-shadow:0 4px 30px rgba(0,0,0,.6)}'
           '.h b{font:700 136px/1 FBBod,serif;letter-spacing:.02em;text-transform:uppercase}.h i{font:400 164px/1 FBIns,serif;font-style:normal;margin-left:.12em}'
           '.p{border:10px solid #FFFFFF;box-shadow:0 18px 40px rgba(0,0,0,.5);overflow:hidden;background:#fff}.p img{width:100%;height:100%;object-fit:cover;display:block}'
           '.p1{left:26px;top:250px;width:400px;height:320px;rotate:-6deg}.p2{left:860px;top:270px;width:400px;height:330px;rotate:5deg}')
    ps = ''.join(f'<div class="p p{i} z4" data-move="photo{i}"><img data-img="p{i}" alt=""></div>' for i in range(1, 3))
    html = HEAD.format(css=css) + ROOM + ps + '<div class="h z5" data-k="h"></div>' + TAIL
    put('01-offline-hobbies', html, {'text': {'h': '<b>Offline</b><i>hobbies</i>'},
        'images': {**room(1564), 'p1': S5 + 'crochet.jpg', 'p2': S5 + 'painting.jpg'},
        'kind': 'her photo + collage (her centred, photos of the hobbies pinned round her)',
        'board': 'Thumbnails 140 (viral-time-to-lock-in: her in the middle, small photos round her, one white serif line)',
        'fonts': ['shorts-10 Bodoni Moda caps + Instrument Serif italic (white on #3C2A22, Formats 48)'],
        'colours': 'Font shorts-10 specimen: ground #3C2A22 (the room is washed in it), ink #FFFFFF',
        'thumbnail_text': 'OFFLINE hobbies (+ photos: crochet, painting)',
        'titles': [T2, T1],
        'direction': 'Copies Thumbnails 140: she smiles in the middle of her own room (washed brown so the words pop, her face untouched), two real photos of the hobbies pinned round her, one serif line on top.'})

# 02 · Thumbnails 124 (yt-71 the art of offline living): her real room scene + the offline objects collaged over it, one white lowercase serif line on top
def t02():
    css = ('.t{--rw:1500px;--rx:-110px;--ry:-150px;--dim:rgba(45,43,42,.55);background:#2D2B2A}'
           '.h{left:0;width:1280px;top:30px;text-align:center;font:400 86px/1 FBLib,serif;color:#FFFFFF;letter-spacing:-.02em;white-space:nowrap;text-shadow:0 4px 30px rgba(0,0,0,.6)}'
           '.o1{left:-10px;top:400px;width:390px;rotate:-6deg}.o2{left:310px;top:540px;width:260px;rotate:4deg}'
           '.o3{left:870px;top:330px;width:380px;rotate:7deg}.o4{left:900px;top:560px;width:300px;rotate:-8deg}.o5{left:690px;top:600px;width:210px;rotate:-14deg}')
    objs = [('o1', 'books2.png', CL), ('o2', 'notebook.png', CL), ('o3', 'bike.png', CL), ('o4', 'cup-cut.png', S5), ('o5', 'phone-cut.png', S5)]
    oh = ''.join(f'<img class="die {k} z4" data-img="{k}" data-move="{k}" alt="">' for k, _, _ in objs)
    html = HEAD.format(css=css) + ROOM + oh + '<div class="h z5" data-k="h"></div>' + TAIL
    put('02-how-to-stop-doomscrolling', html, {'text': {'h': 'how to stop doomscrolling'},
        'images': {**room(1561), **{k: base + f for k, f, base in objs}},
        'kind': 'her real room + collage of the offline objects over it',
        'board': 'Thumbnails 124 (yt-71 the art of offline living: a real scene with the objects collaged over it, one white lowercase serif line on top)',
        'fonts': ['thumbs-05 Libre Baskerville Regular (white on #2D2B2A, Thumbnails 48)'], 'colours': 'Font thumbs-05 specimen: #2D2B2A (the room is washed in it) / #FFFFFF',
        'thumbnail_text': 'how to stop doomscrolling (her in her room; books, a notebook, a bike, a coffee and a switched-off phone round her)',
        'titles': [T1, T2],
        'direction': 'Copies Thumbnails 124: her own room as the scene (dimmed, face untouched), the offline things laid over it as a collage (books, notebook, bike, coffee, the phone switched off), one lowercase serif line on top in the words people search.'})

# 03 · Thumbnails 66 (yt-13 Before | After): two real photos side by side, a white word on each, no face of hers
def t03():
    css = ('.t{background:#3A3D3A}.pn{top:0;height:720px;object-fit:cover}.a{left:0;width:634px;object-position:72% 50%;filter:brightness(1.35)}.b{left:646px;width:634px}'
           '.l{top:28px;font:800 104px/1 FBMon,sans-serif;letter-spacing:-.02em;background:#3A3D3A;padding:10px 24px 16px;border-radius:6px}.l1{left:30px;color:#FFFFFF}.l2{left:676px;color:#F6C343}')
    html = HEAD.format(css=css) + ('<img class="pn a z1" data-img="a" alt=""><img class="pn b z1" data-img="b" alt="">'
        '<div class="l l1 z3" data-k="a"></div><div class="l l2 z3" data-k="b"></div>') + TAIL
    put('03-before-after', html, {'text': {'a': 'Before', 'b': 'After'},
        'images': {'a': S5 + 'scroll-bed.jpg', 'b': S5 + 'reading-sofa.jpg'}, 'vars': {}, 'class': '',
        'kind': 'split of two real scenes, no face of hers', 'board': 'Thumbnails 66 (yt-13 Before | After: two photos side by side, a white word on each)',
        'fonts': ['thumbs-18 Montserrat ExtraBold, yellow key word (white + #F6C343 on #3A3D3A, Thumbnails 162)'],
        'colours': 'Font thumbs-18 specimen: #3A3D3A (the divider) / #FFFFFF / #F6C343',
        'thumbnail_text': 'Before (on her phone in bed in the dark) | After (reading on the sofa in daylight)',
        'titles': [T5, T1],
        'direction': 'Copies Thumbnails 66: the change is the picture. Left, someone lit by a phone in a dark bedroom; right, the same kind of evening with a book on the sofa.'})

# 04 · Thumbnails 63 (yt-10 SAVE 4 HOURS A DAY): heading across the top, a hand-written list with ticks, she presents it (her LEFT)
def t04():
    css = ('.t{background:#3B88D6}.h{left:600px;top:22px;font:700 116px/1 FBCav,sans-serif;color:#FFFFFF;white-space:nowrap}'
           '.me{left:-150px;bottom:-330px;height:920px}'
           '.l{left:620px;top:150px;width:630px;color:#FFFFFF;font:700 98px/1 FBCav,sans-serif}'
           '.r{display:flex;align-items:center;gap:22px;height:112px;border-bottom:4px solid rgba(255,255,255,.55)}.r svg{flex:none}')
    items = ['read', 'call home', 'ride a bike', 'thrift', 'journal']
    rows = ''.join(f'<div class="r">{TICK.format(s=66, c="#FFFFFF")}<span data-k="i{i}"></span></div>' for i in range(len(items)))
    html = HEAD.format(css=css) + f'<div class="h z4" data-k="h"></div><div class="l z3" data-move="list">{rows}</div><img class="cut me z2" data-img="me" data-move="her" alt="">' + TAIL
    put('04-my-no-phone-list', html, {'text': {'h': 'my no-phone list', **{f'i{i}': t for i, t in enumerate(items)}},
        'images': {'me': S5 + '1559-cut-clean.png'}, 'vars': {}, 'kind': 'flat + her cut-out on the LEFT + a hand-written ticked list',
        'board': 'Thumbnails 63 (yt-10 SAVE 4 HOURS A DAY: heading on top, a hand-drawn tick list beside him)',
        'fonts': ['shorts-14 Caveat Bold (white on #3B88D6, Formats 64)'], 'colours': 'Font shorts-14 specimen: #3B88D6 / #FFFFFF',
        'thumbnail_text': 'my no-phone list: read, call home, ride a bike, thrift, journal (ticked)',
        'titles': [T1, T2],
        'direction': 'Copies Thumbnails 63: a hand-written list of five things from the video, each ticked, and she presents it with an open hand from the left. Caveat white on blue, as Formats 64.'})

# 05 · Thumbnails 40 (pin-03-13 adulting habits) + study kind c: the person in the middle, the objects of the topic round her, one big line
def t05():
    css = ('.t{background:#F2F3C4}.h{left:0;width:1280px;top:18px;text-align:center;color:#2A1F6E;white-space:nowrap;letter-spacing:-.04em}'
           '.h b{font:300 104px/1 FBBric,sans-serif}.h i{font:800 104px/1 FBBric,sans-serif;font-style:normal}'
           '.me{left:400px;bottom:-130px;height:600px}'
           '.o1{left:20px;top:170px;width:300px;rotate:-8deg}.o2{left:40px;top:470px;width:300px;rotate:6deg}.o3{left:290px;top:560px;width:200px;rotate:-5deg}'
           '.o4{left:950px;top:160px;width:300px;rotate:5deg}.o5{left:960px;top:440px;width:300px;rotate:-6deg}.o6{left:800px;top:590px;width:190px;rotate:4deg}')
    objs = [('o1', 'books2.png', CL), ('o2', 'yarn.png', CL), ('o3', 'cup-cut.png', S5), ('o4', 'bike.png', CL), ('o5', 'openbook.png', CL), ('o6', 'notebook.png', CL)]
    oh = ''.join(f'<img class="die {k} z2" data-img="{k}" data-move="{k}" alt="">' for k, _, _ in objs)
    html = HEAD.format(css=css) + oh + '<img class="cut me z3" data-img="me" data-move="her" alt=""><div class="h z4" data-k="h"></div>' + TAIL
    put('05-what-to-do-instead', html, {'text': {'h': '<b>what to do </b><i>instead</i>'},
        'images': {'me': S5 + '1548-cut-clean.png', **{k: base + f for k, f, base in objs}}, 'vars': {},
        'kind': 'her cut-out in the middle of the objects, flat pale ground',
        'board': 'Thumbnails 40 (pin-03-13 adulting habits: the objects of the topic round the person, one big line)',
        'fonts': ['design-24 Bricolage Grotesque 300 + 800 (#2A1F6E on #F2F3C4, Design 409)'], 'colours': 'Font design-24 specimen: #F2F3C4 / #2A1F6E',
        'thumbnail_text': 'what to do instead (her in the middle; books, yarn, a coffee, a bike, an open book, a notebook round her)',
        'titles': [T4, T1],
        'direction': 'Copies Thumbnails 40 (and the study\'s "creator surrounded by the objects"): she thinks in the middle, the offline things round her, the question on top; the title finishes it ("…instead of scrolling").'})

# 06 · Thumbnails 89 (yt-36 WHAT IS SPACE COMPLEXITY): red heavy caps on yellow left, simple line drawings right, no face
def t06():
    css = ('.t{background:#F7F02B}.h{left:56px;top:70px;font:400 112px/1.02 FBAB,sans-serif;color:#E2262B;text-transform:uppercase;letter-spacing:-.01em}'
           '.dr{left:700px;top:40px;width:540px;height:640px}')
    k = '#111111'
    dr = (f'<svg class="dr z3" data-move="drawings" viewBox="0 0 540 640" fill="none" stroke="{k}" stroke-width="7" stroke-linecap="round" stroke-linejoin="round">'
          # phone lying face down (the back, a camera bump), crossed out
          '<g transform="translate(40 40) rotate(-12)"><rect x="0" y="0" width="120" height="230" rx="22"/><rect x="16" y="16" width="40" height="52" rx="10"/></g>'
          '<path d="M20 40 L200 300 M200 40 L20 300" stroke="#E2262B" stroke-width="10"/>'
          # open book
          '<g transform="translate(260 40)"><path d="M10 40 C70 10 120 20 135 50 C150 20 200 10 260 40 V200 C200 170 150 180 135 210 C120 180 70 170 10 200 Z"/><path d="M135 50 V210"/><path d="M40 75 C70 65 100 68 115 80 M40 110 C70 100 100 103 115 115 M155 80 C170 68 200 65 230 75 M155 115 C170 103 200 100 230 110" stroke-width="5"/></g>'
          # bicycle
          '<g transform="translate(20 360)"><circle cx="70" cy="170" r="62"/><circle cx="300" cy="170" r="62"/><path d="M70 170 L140 70 L250 70 L300 170 M140 70 L180 170 L250 70 M180 170 L70 170 M130 50 L160 50 M250 70 L240 40 L270 40"/></g>'
          # coffee cup
          '<g transform="translate(390 360)"><path d="M10 60 H120 V150 C120 185 95 205 65 205 C35 205 10 185 10 150 Z"/><path d="M120 85 C160 85 160 140 120 140"/><path d="M45 10 C35 25 55 35 45 50 M80 10 C70 25 90 35 80 50" stroke-width="5"/></g>'
          '</svg>')
    html = HEAD.format(css=css) + '<div class="h z3" data-k="h"></div>' + dr + TAIL
    put('06-put-the-phone-down', html, {'text': {'h': 'Put the<br>phone<br>down.<br>Do this.'}, 'vars': {}, 'class': '',
        'kind': 'flat graphic, line drawings, no face', 'board': 'Thumbnails 89 (yt-36 WHAT IS SPACE COMPLEXITY: red heavy caps on yellow, line drawings right)',
        'fonts': ['thumbs-12 Archivo Black (red #E2262B on yellow #F7F02B, Thumbnails 89)'], 'colours': 'Font thumbs-12 specimen: #F7F02B / #E2262B (+ #111111 for the drawings)',
        'thumbnail_text': 'PUT THE PHONE DOWN. DO THIS. + drawings: a phone face down crossed out, an open book, a bike, a coffee',
        'titles': [T4, T1],
        'direction': 'Copies Thumbnails 89 with its own font and colours: the instruction stacked left in red caps, and on the right simple line drawings of what to do (the phone face down and crossed out, a book, a bike, a coffee).'})

# 07 · Thumbnails 84 (yt-31 you're wasting your 20s): white lowercase lines left with one red word, her right in a dim room (words left / her right: 1 of 2)
def t07():
    css = ('.t{--rw:1900px;--rx:-60px;--ry:-330px;--dim:rgba(42,37,34,.82);background:#2A2522}'
           '.h{left:50px;top:140px;font:700 112px/1.0 FBPop,sans-serif;color:#FFFFFF;letter-spacing:-.03em;text-shadow:0 4px 30px rgba(0,0,0,.45)}.h .r{color:#E5342B}')
    html = HEAD.format(css=css) + ROOM + '<div class="h z5" data-k="h"></div>' + TAIL
    put('07-wasting-your-evenings', html, {'text': {'h': 'you\'re<br><span class="r">wasting</span><br>your<br>evenings'}, 'images': room(1558),
        'kind': 'her photo, dim room (words left / her right, the only one in the set)', 'board': 'Thumbnails 84 (yt-31 you\'re wasting your 20s: white lowercase left, one red word, him right)',
        'fonts': ['thumbs-10 Poppins Bold lowercase, red key word (white + #E5342B on #2A2522, Thumbnails 84)'], 'colours': 'Font thumbs-10 specimen: #2A2522 (the room is dimmed in it) / #FFFFFF / #E5342B',
        'thumbnail_text': "you're wasting your evenings",
        'titles': [T3, T1],
        'direction': 'Copies Thumbnails 84 with its own font and colours: four short lowercase lines on the left with "wasting" in red, she looks straight at you from the right of her dimmed room (face untouched).'})

# 08 · Thumbnails 58 (yt-05 FAVOR): one huge word behind her head; here on a bold flat colour, not dark
def t08():
    css = ('.t{background:#D9F44F}.w{left:0;width:1280px;top:36px;text-align:center;font:900 240px/1 FBIT,sans-serif;color:#070804;letter-spacing:-.025em;white-space:nowrap}'
           '.me{left:260px;bottom:-200px;height:690px}')
    html = HEAD.format(css=css) + '<div class="w z2" data-k="w"></div><img class="cut me z3" data-img="me" data-move="her" alt="">' + TAIL
    put('08-log-off', html, {'text': {'w': 'LOG OFF'}, 'images': {'me': S5 + '1550-cut-clean.png'}, 'vars': {},
        'kind': 'flat lime + her cut-out centred, one huge word behind her head', 'board': 'Thumbnails 58 (yt-05 FAVOR: one huge word behind her head)',
        'fonts': ['combo-02 Inter Tight Black (#070804 on #D9F44F, Design 394)'], 'colours': 'Font combo-02 specimen: #D9F44F / #070804',
        'thumbnail_text': 'LOG OFF (behind her head)',
        'titles': [T1, T6],
        'direction': 'Copies Thumbnails 58: one huge word behind her, she shows an open hand in front of it. Black Inter Tight on lime, as Design 394.'})

# ---------- round 5 (2026-11-13): five new board compositions ----------
# 02 · Thumbnails 48 (yt-76 "Write to Understand Your Life"): her photo left, a big white serif quote right-aligned on dark
def t02q():
    css = ('.t{--rw:1500px;--rx:-330px;--ry:-200px;--dim:rgba(45,43,42,.2);background:#2D2B2A}'
           '.side{left:580px;top:0;width:700px;height:720px;background:#2D2B2A}'
           '.q{right:56px;top:120px;text-align:right;font:400 122px/1.04 FBLib,serif;color:#FFFFFF;letter-spacing:-.025em;white-space:nowrap}.q b{font-weight:700}')
    html = HEAD.format(css=css) + ROOM + '<div class="side z4"></div><div class="q z5" data-k="q"></div>' + TAIL
    put('02-your-phone-can-wait', html, {'text': {'q': '“Your<br>phone<br>can <b>wait.</b>”'}, 'images': room(1563),
        'kind': 'her photo left + serif quote right', 'board': 'Thumbnails 48 (yt-76 "Write to Understand Your Life": photo left, big white serif right on dark)',
        'fonts': ['thumbs-05 Libre Baskerville Regular + Bold (white on #2D2B2A, Thumbnails 48)'], 'colours': 'Font thumbs-05 specimen: #2D2B2A / #FFFFFF',
        'thumbnail_text': '“Your phone can wait.”',
        'titles': [T1, T3],
        'direction': 'Copies Thumbnails 48 with its own font and colours: her thinking on the left of her room, one short line set big in a white serif on the dark right half, "wait" in bold.'})

# 05 · Thumbnails 37 (pin-03-09 create.): a real full-bleed scene of someone doing the thing, one soft lowercase serif line low in the middle, no face
def t05h():
    css = ('.t{background:#4A4440}.bg{left:0;top:0;width:1280px;height:720px;object-fit:cover;object-position:50% 35%}.dim{inset:0;background:rgba(74,68,64,.30)}'
           '.h{left:0;width:1280px;top:520px;text-align:center;font:400 128px/1 FBLib,serif;color:#FFFFFF;letter-spacing:-.025em;white-space:nowrap;text-shadow:0 4px 34px rgba(0,0,0,.6)}')
    html = HEAD.format(css=css) + '<img class="bg z1" data-img="bg" alt=""><div class="dim z2"></div><div class="h z3" data-k="h"></div>' + TAIL
    put('05-pick-up-a-hobby', html, {'text': {'h': 'pick up a hobby.'}, 'images': {'bg': S5 + 'knitting.jpg'}, 'vars': {}, 'class': '',
        'kind': 'real scene (hands knitting), no face', 'board': 'Thumbnails 37 (pin-03-09 create.: a real warm scene, one lowercase serif line low in the middle)',
        'fonts': ['shorts-21 Libre Baskerville (white on #4A4440, Formats 45)'], 'colours': 'Font shorts-21 specimen: #4A4440 (a light wash on the photo) / #FFFFFF',
        'thumbnail_text': 'pick up a hobby. (over someone knitting in a pink jumper)',
        'titles': [T6, T1],
        'direction': 'Copies Thumbnails 37: a real scene of someone doing the thing (knitting in an armchair) and one quiet lowercase serif line under it.'})

# 06 · Thumbnails 36 (pin-03-08 Everything done by 2pm.): a framed photo of a written list beside a serif line, no face
def t06l():
    css = ('.t{background:#E8E7E5}.fr{left:60px;top:60px;width:560px;height:600px;border-radius:22px;overflow:hidden}.fr img{position:absolute;width:1500px;left:-700px;top:-330px;display:block}'
           '.h{left:680px;top:150px;font:700 96px/1.04 FBLib,serif;color:#111111;letter-spacing:-.03em}')
    html = HEAD.format(css=css) + '<div class="fr z2" data-move="photo"><img data-img="ph" alt=""></div><div class="h z3" data-k="h"></div>' + TAIL
    put('06-instead-of-scrolling', html, {'text': {'h': 'Things<br>to do<br>instead of<br>scrolling.'}, 'images': {'ph': S5 + 'todo-flatlay.jpg'}, 'vars': {}, 'class': '',
        'kind': 'photo of a written list + serif line, no face', 'board': 'Thumbnails 36 (pin-03-08 Everything done by 2pm.: a picture of a list on the left, a serif line on the right)',
        'fonts': ['design-17 Libre Baskerville Bold (#111111 on #E8E7E5, Design 399)'], 'colours': 'Font design-17 specimen: #E8E7E5 / #111111',
        'thumbnail_text': 'Things to do instead of scrolling. (beside a photo of a hand-written list in a notebook)',
        'titles': [T5, T1],
        'direction': 'Copies Thumbnails 36: a real photo of a hand-written list in a notebook on the left, the search phrase in a bold serif on the right, light grey as Design 399.'})

# 09 · Thumbnails 97 (yt-44 QUIT DATA NOW: a card beside the person): her on the LEFT, a real-looking phone showing a screen-time page on the right
def t09p():
    css = ('.t{background:#1C1C1C}.h{left:560px;top:22px;font:700 80px/1.05 FBIT,sans-serif;color:#FFFFFF;letter-spacing:-.035em;white-space:nowrap}'
           '.h .y{background:#F7D51D;color:#1C1C1C;padding:0 .12em;display:inline-block}'
           '.me{left:-60px;bottom:-190px;height:820px}'
           '.phone{left:770px;top:196px;width:254px;height:520px}.phone .scr{background:#FFFFFF;height:100%;border-radius:30px;overflow:hidden;padding:46px 18px 0;font-family:FBIT,sans-serif;color:#111}'
           '.scr .t1{font:700 22px/1 FBIT}.scr .t2{font:500 13px/1 FBIT;color:#777;margin-top:16px}.scr .t3{font:800 44px/1 FBIT;margin-top:6px;letter-spacing:-.03em}'
           '.scr .bars{display:flex;align-items:flex-end;gap:7px;height:110px;margin-top:16px;border-bottom:2px solid #e3e3e3}.scr .bars i{flex:1;background:#2F7BF6;border-radius:3px 3px 0 0;display:block}'
           '.scr .row{display:flex;justify-content:space-between;font:600 14px/1 FBIT;padding:13px 0;border-bottom:1px solid #eee}')
    bars = ''.join(f'<i style="height:{h}%"></i>' for h in (70, 85, 62, 95, 78, 100, 88))
    scr = (f'<div class="phone z3" data-move="phone"><div class="scr"><div class="t1">Screen Time</div><div class="t2">Daily average</div><div class="t3" data-k="avg"></div>'
           f'<div class="bars">{bars}</div><div class="row"><span>Social</span><span>4h 10m</span></div><div class="row"><span>Video</span><span>1h 55m</span></div>'
           '<div class="row"><span>Games</span><span>0h 22m</span></div><div class="row"><span>Pickups</span><span>96</span></div></div></div>')
    html = HEAD.format(css=css) + '<div class="h z4" data-k="h"></div>' + scr + '<img class="cut me z2" data-img="me" data-move="her" alt="">' + TAIL
    put('09-cut-your-screen-time', html, {'text': {'h': 'cut your<br><span class="y">screen time</span>', 'avg': '6h 41m'},
        'images': {'me': S5 + '1562-cut-clean.png'}, 'vars': {}, 'kind': 'flat dark + her cut-out on the LEFT + a generic phone (screen time page) right',
        'board': 'Thumbnails 97 (yt-44 QUIT DATA NOW: a card beside the person)',
        'fonts': ['thumbs-02 Inter Tight Bold + yellow highlight (white + #F7D51D on #1C1C1C, Thumbnails 21)'], 'colours': 'Font thumbs-02 specimen: #1C1C1C / #FFFFFF / #F7D51D',
        'thumbnail_text': 'cut your SCREEN TIME (+ a generic phone: Screen Time, daily average 6h 41m, an example number, not hers)',
        'titles': [T3, T1],
        'direction': 'Copies Thumbnails 97 (a card beside the person, here the card is a real-looking generic phone): the phone shows a high daily screen time, she reacts with both hands from the left; the words name what people search.'})

# 10 · Thumbnails 4 (pin-01-04 alone in korea): a real outdoor scene, big lowercase words across the top, no face
def t10s():
    css = ('.t{background:#EFEDE6}.bg{left:0;top:0;width:1280px;height:720px;object-fit:cover;object-position:50% 30%}'
           '.h{left:0;width:1280px;top:34px;text-align:center;font:500 112px/1 FBIT,sans-serif;color:#111111;letter-spacing:-.05em;white-space:nowrap}')
    html = HEAD.format(css=css) + '<img class="bg z1" data-img="bg" alt=""><div class="h z3" data-k="h"></div>' + TAIL
    put('10-less-scrolling-more-living', html, {'text': {'h': 'less scrolling, more living'}, 'images': {'bg': S5 + 'bike-path.jpg'}, 'vars': {}, 'class': '',
        'kind': 'real outdoor scene (a bike on a field path), no face', 'board': 'Thumbnails 4 (pin-01-04 alone in korea: a real scene, big lowercase words across the top)',
        'fonts': ['thumbs-19 Inter Tight Medium, very tight (#111111 on #EFEDE6, Thumbnails 174)'], 'colours': 'Font thumbs-19 specimen: #111111 on #EFEDE6 (the pale sky stands in for the ground)',
        'thumbnail_text': 'less scrolling, more living (over a bike left on a country path)',
        'titles': [T6, T1],
        'direction': 'Copies Thumbnails 4: one calm real scene (a bike left on a field path) with the line in tight dark lowercase across the pale sky.'})

for f in (t01, t03, t04, t07, t08, t09p): f()   # round 5: 02q, 05h, 06l, 10s dropped (cold critic under 7)
json.dump(sorted(OUT), open(os.path.join(D, 'index.json'), 'w'))
print('\n'.join(OUT))
