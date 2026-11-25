#!/usr/bin/env python3
"""working-full-time thumbnails, SET 2026-11-13 ROUND 5 (final; after the round-4 critic: 04 at 8, the rest 3-7).
Fonts ONLY from the font board (inspiration/boards/fonts/), in their source colours; every thumbnail copies a DIFFERENT
thumbnail-board composition ("Thumbnails N" = studio /ideas/boards/thumbnails/ item N); at most 2 "words left / her right";
every photo of her is a different shoot photo with a different crop; no stock photo used twice.
Writes directions/<dir>/index.html + content.json. Keeps "nudge" and edited "text" of an existing content.json unless --force.
Run: python3 tools/make-set-2026-11-13e.py --force && node render.mjs"""
import json, os, sys
HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__))); D = os.path.join(HERE, 'directions')
FORCE = '--force' in sys.argv
SH = '../../assets/shoot2/'; PX = '../../assets/px/'; SRC = '../../assets/src/'
HEAD = '<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../../lib/set.css"><style>{css}</style></head><body><div class="t">'
TAIL = '</div><script src="../../lib/bind.js"></script></body></html>'
ROOM = '<img class="room z1" data-img="room" alt=""><div class="dim z2"></div><img class="room z3" data-img="me" alt="">'
def room(n): return {'room': SH + f'room-{n}.jpg', 'me': SH + f'room-{n}-cut.png'}
OUT = []

def put(dirname, html, content):
    p = os.path.join(D, dirname); os.makedirs(p, exist_ok=True); cj = os.path.join(p, 'content.json')
    if os.path.exists(cj) and not FORCE:
        old = json.load(open(cj)); content['nudge'] = old.get('nudge', {})
        for k, v in (old.get('text') or {}).items():
            if k in content['text']: content['text'][k] = v
    else: content.setdefault('nudge', {})
    content.setdefault('images', {}); content.setdefault('vars', {}); content.setdefault('class', 'no-lift')
    open(os.path.join(p, 'index.html'), 'w').write(html); json.dump(content, open(cj, 'w'), indent=2, ensure_ascii=False); OUT.append(dirname)

T_MAIN = "How I Work Full Time While Doing a Master's Abroad"
T_SEARCH = "Working Full Time While Doing a Master's Abroad"
T_FIRST = "Masters While Working Full Time: My First Year"
T_EST = "Can International Students Work Full Time in Estonia?"
T_WEEK = "Full-Time Job and Full-Time Master's: How I Plan My Week"
T_DEV = "My Week as a Developer and a Full-Time Master's Student"
T_NG = "Studying in Europe as a Nigerian With a Full-Time Job"
T_SW = "Study and Work in Estonia: My Full-Time Job + Master's"
T_BOTH = "Working While Studying Abroad: How I Do Both"

# ---------- 01: Thumbnails 7 (pin-01-07 fpt.doc "COOK": huge words behind the head) ----------
T_9TO5 = "Working a 9-5 While Doing a Master's Abroad"
T_SURV = "Full-Time Job + Master's Abroad: How I Survive"
T_AFTER = "Studying After Work: My Master's With a Full-Time Job"
SHADOW = 'filter:drop-shadow(0 6px 10px rgba(0,0,0,.25))'
T_DAYNIGHT = "Day Job, Night Class: My Master's Abroad While Working"

# ---------- 01: Thumbnails 7 (pin-01-07 fpt.doc "COOK": huge words, the head between) ----------
def t01():
    css = ('.t{background:#E99A3F}'
           '.k{top:20px;font:800 74px/1 FBS,sans-serif;color:#000000;text-transform:uppercase;letter-spacing:.01em;white-space:nowrap}.k1{left:40px}.k2{right:40px}'
           '.w{top:86px;font:900 236px/1 FBS,sans-serif;color:#000000;text-transform:uppercase;letter-spacing:-.005em;white-space:nowrap}.w1{left:34px}.w2{right:34px}'
           f'.me{{left:222px;top:300px;width:836px;{SHADOW}}}')
    html = HEAD.format(css=css) + ('<div class="k k1 z2" data-k="k1"></div><div class="k k2 z2" data-k="k2"></div>'
        '<div class="w w1 z2" data-k="a"></div><div class="w w2 z2" data-k="b"></div><img class="cut me z3" data-img="me" data-move="her" alt="">') + TAIL
    put('01-full-time-work-full-time-study', html, {'recommended': True, 'text': {'k1': 'Full-time', 'k2': 'Full-time', 'a': 'Work', 'b': 'Study'},
        'images': {'me': SH + 'cut-1586c-clean.png'}, 'kind': 'flat, huge words above either side of her (her big, running off the bottom)', 'layout': 'her centre',
        'board': 'Thumbnails 7 (pin-01-07 fpt.doc "COOK": huge words, the head between)',
        'fonts': ['design-02 Big Shoulders Display Black (black #000000 on orange #E99A3F, Design 397)'], 'colours': 'Design 397: #E99A3F / #000000',
        'thumbnail_text': 'FULL-TIME WORK | FULL-TIME STUDY (heavy, either side above her)',
        'titles': [T_MAIN, T_SEARCH, T_FIRST], 'title': T_MAIN,
        'direction': 'Copies Thumbnails 7: two heavy words fill the top, FULL-TIME WORK and FULL-TIME STUDY, she sits big below between them, thinking. Big Shoulders Black on orange, as Design 397.'})

# ---------- 02: Thumbnails 51 (yt-79: her with a big week calendar) -> a plain week grid ----------
def t02():
    css = ('.t{background:#D9F44F}'
           '.h{left:0;width:1280px;top:14px;text-align:center;font:900 124px/1 FIT,sans-serif;color:#070804;letter-spacing:.02em;text-transform:uppercase;white-space:nowrap}'
           '.g{left:600px;top:176px;width:654px;height:520px;background:#070804}'
           '.dl{position:absolute;top:22px;width:64px;text-align:center;font:900 60px/1 FIT,sans-serif;color:#D9F44F}'
           '.rl{position:absolute;left:24px;font:900 60px/1.0 FIT,sans-serif;color:#D9F44F;letter-spacing:-.02em;white-space:nowrap}.rl i{font-style:normal;color:#FFFFFF}'
           '.sq{position:absolute;width:64px;height:170px}.wk{top:110px;background:#D9F44F}'
           '.st{top:310px;background:#3A3D2A}.st b{position:absolute;left:0;bottom:0;width:64px;height:58%;background:#FFFFFF}'
           f'.me{{left:-110px;top:200px;width:700px;{SHADOW}}}')
    cells = ''; text = {'h': "9-5 + master's", 'r0': 'Job<br><i>9-5</i>', 'r1': 'Study<br><i>6-9 PM</i>'}
    for i, d in enumerate('MTWTF'):
        x = 286 + i * 72
        cells += f'<div class="dl" style="left:{x}px" data-k="d{i}"></div><div class="sq wk" style="left:{x}px"></div><div class="sq st" style="left:{x}px"><b></b></div>'
        text[f'd{i}'] = d
    html = HEAD.format(css=css) + (f'<div class="h z3" data-k="h"></div><div class="g z2" data-move="calendar">{cells}'
        '<div class="rl" style="top:140px" data-k="r0"></div><div class="rl" style="top:340px" data-k="r1"></div></div>'
        '<img class="cut me z4" data-img="me" data-move="her" alt="">') + TAIL
    put('02-week-calendar', html, {'text': text, 'images': {'me': SH + 'cut-1594-clean.png'},
        'kind': 'flat + her on the LEFT presenting a plain week grid (job 9-5 full, study 6-9 PM part-filled, M-F)', 'layout': 'her left, grid right',
        'board': 'Thumbnails 51 (yt-79 "How I have time for everything with a full time job": her with a big week calendar)',
        'fonts': ['design-09 Inter Tight Black (ink #070804 on lime #D9F44F, Design 394)'], 'colours': 'Design 394: #D9F44F / #070804 (+ white)',
        'thumbnail_text': "9-5 + MASTER'S + a week grid: Job 9-5 (full) / Study 6-9 PM (part-filled), M-F",
        'titles': [T_WEEK, T_9TO5, T_DEV], 'title': T_WEEK,
        'direction': 'Copies Thumbnails 51: her week as one plain grid (job 9-5 every weekday, study 6-9 PM part of every evening), she presents it from the left. Inter Tight Black ink on lime, as Design 394.'})

# ---------- 03: Thumbnails 69 (yt-16 "12:30 PM | 7:30 PM": two pictures, a time on each; her like) ----------
def t03():
    css = ('.t{background:#000000}.half{top:0;width:636px;height:720px;overflow:hidden}.h1{left:0}.h2{left:644px}'
           '.half img,.half .ov{position:absolute;display:block}.a{width:1411px;left:-350px;top:-300px}.b{width:1200px;left:-255px;top:-190px}'
           '.mo{left:0;top:0;width:636px;height:720px;background:rgba(214,232,255,.30);mix-blend-mode:screen}'
           '.ev{left:0;top:0;width:636px;height:720px;background:rgba(14,8,26,.9)}'
           '.bx{top:476px;width:450px;font:700 120px/1 FIT,sans-serif;color:#FFFFFF;background:#CB2D26;padding:6px 0 12px 24px;letter-spacing:-.04em;white-space:nowrap}'
           '.b1{left:30px}.b2{left:674px}'
           '.lb{top:604px;width:450px;font:700 80px/1 FIT,sans-serif;color:#FFFFFF;background:#0C0C0C;padding:6px 0 12px 24px;letter-spacing:-.01em;text-transform:uppercase;white-space:nowrap}.l1{left:30px}.l2{left:674px}')
    html = HEAD.format(css=css) + ('<div class="half h1 z1"><img class="a" data-img="a" alt=""><div class="ov mo"></div><img class="a" data-img="ame" alt=""></div>'
        '<div class="half h2 z1"><img class="b" data-img="b" alt=""><div class="ov ev"></div><img class="b" data-img="bme" alt=""></div>'
        '<div class="bx b1 z3" data-k="t1"></div><div class="bx b2 z3" data-k="t2"></div><div class="lb l1 z4" data-k="l1"></div><div class="lb l2 z4" data-k="l2"></div>') + TAIL
    put('03-9am-job-9pm-masters', html, {'text': {'t1': '9 AM', 't2': '9 PM', 'l1': 'Job', 'l2': "Master's"},
        'images': {'a': SH + 'room-1585.jpg', 'ame': SH + 'room-1585-cut.png', 'b': SH + 'room-1578.jpg', 'bme': SH + 'room-1578-cut.png'},
        'kind': 'split: her at 9 AM (room bright and cool) | her at 9 PM (room in the dark); her face untouched in both', 'layout': 'split',
        'board': 'Thumbnails 69 (yt-16 "24 Hours of Healthy Student Cooking": 12:30 PM | 7:30 PM, a time on each photo; she liked it)',
        'fonts': ['design-34 Inter Tight Bold (white #FFFFFF on red #CB2D26, Design 373)'], 'colours': 'Design 373: #CB2D26 / #FFFFFF (+ #0C0C0C tags, Design 20)',
        'thumbnail_text': "9 AM JOB | 9 PM MASTER'S",
        'titles': [T_MAIN, T_9TO5, T_DEV], 'title': T_MAIN,
        'direction': 'Copies Thumbnails 69: the day told by two photos of her and two times; the 9 AM room bright and cool, the 9 PM room in the dark (only the room is graded). Inter Tight Bold white on red, as Design 373.'})

# ---------- 04: Thumbnails 121 (yt-68 "STOP WASTING EVENINGS": heavy white caps left, red box, him right) ----------
def t04():
    css = ('.t{--rw:2318px;--rx:-100px;--ry:-560px;--dim:rgba(34,34,34,.6);background:#222222}'
           '.dk{left:0;top:0;width:660px;height:720px;background:rgba(0,0,0,.3)}'
           '.h{left:40px;top:84px;font:400 154px/1.0 FAN,sans-serif;color:#FFFFFF;text-transform:uppercase;letter-spacing:.005em;white-space:nowrap}'
           '.h .pl{display:inline-block;transform:scale(1.9);transform-origin:50% 55%;margin-left:.18em}'
           '.h .bx{background:#D7262B;padding:0 .08em 0 0;display:inline-block;margin-top:14px;box-shadow:-.06em 0 0 #D7262B}')
    html = HEAD.format(css=css) + ROOM.replace('<div class="dim z2"></div>', '<div class="dim z2"></div><div class="dk z2"></div>') + '<div class="h z4" data-k="h"></div>' + TAIL
    put('04-full-time-job-plus-masters', html, {'text': {'h': "Full-time<br>job <span class=\"pl\">+</span><br><span class=\"bx\">master's</span>"},
        'images': room(1589), 'kind': 'photo (her room, close; words left / her right, 1 of 2)', 'layout': 'words left / her right',
        'board': 'Thumbnails 121 (yt-68 "7 Things I Did To Stop Wasting My Evenings": STOP WASTING EVENINGS, white caps left + red box, him right)',
        'fonts': ['thumbs-16 Anton + red box (white on #222222, red #D7262B, Thumbnails 113)'], 'colours': 'Thumbnails 113: #222222 / #FFFFFF / #D7262B',
        'thumbnail_text': "FULL-TIME JOB + MASTER'S",
        'titles': [T_FIRST, T_MAIN, T_BOTH], 'title': T_FIRST,
        'direction': 'Copies Thumbnails 121: the claim in heavy white caps on the darkened left, a big plus, the last word in a red box, her on the right of her dimmed room.'})

# ---------- 05: Thumbnails 127 (viral-1 "FINANCIAL LITERACY": the topic huge, the person in front) over Tallinn ----------
def t05():
    css = ('.t{background:#2E2E33}.bg{left:-20px;top:-20px;width:1320px;height:760px;filter:blur(3px)}.sh{inset:0;background:rgba(46,46,51,.55)}'
           '.a{left:0;width:1280px;text-align:center;top:22px;font:600 80px/1 FOSW,sans-serif;color:#FFFFFF;text-transform:uppercase;letter-spacing:.02em;white-space:nowrap}'
           '.b{left:0;width:1280px;text-align:center;top:96px;font:700 236px/1 FOSW,sans-serif;color:#7FF0C0;text-transform:uppercase;letter-spacing:.01em;white-space:nowrap}'
           f'.me{{left:400px;top:300px;width:860px;{SHADOW}}}')
    html = HEAD.format(css=css) + '<img class="ph bg z1" data-img="bg" alt=""><div class="sh z2"></div><div class="a z3" data-k="a"></div><div class="b z3" data-k="b"></div><img class="cut me z4" data-img="me" data-move="her" alt="">' + TAIL
    put('05-study-and-work-in-estonia', html, {'text': {'a': 'Study + work in', 'b': 'Estonia'},
        'images': {'bg': PX + 'tallinn.jpg', 'me': SH + 'cut-1578c-clean.png'}, 'kind': 'real Tallinn photo (darkened, softened), huge words over it, her big on the right in front', 'layout': 'words across the top, her below right of centre',
        'board': 'Thumbnails 127 (viral-1 "FINANCIAL LITERACY": the topic huge across the picture, the person in front)',
        'fonts': ['shorts-17 Oswald caps, white + mint key word (#FFFFFF, #7FF0C0 on #2E2E33, Formats 20)'], 'colours': 'Formats 20: #2E2E33 / #FFFFFF / #7FF0C0',
        'thumbnail_text': 'STUDY + WORK IN ESTONIA (over Tallinn old town)',
        'titles': [T_SW, T_EST, T_NG], 'title': T_SW,
        'direction': 'Copies Thumbnails 127: the topic huge across a real picture of the place (Tallinn old town, Pexels, film/assets/CREDITS.md, darkened and softened), ESTONIA in mint, her in front on the right.'})

# ---------- 06: Thumbnails 94 (yt-41 "It Clicked.": a dark real picture, one short line) + her face in the corner ----------
def t06():
    css = ('.t{background:#0C0C0C}.bgw{left:0;top:0;width:1280px;height:720px;overflow:hidden}.bgw img{position:absolute;width:2100px;left:-900px;top:-260px}'
           '.sh{inset:0;background:rgba(12,12,12,.45)}'
           '.pl{left:596px;top:150px;background:#0C0C0C;padding:20px 34px 30px}'
           '.h{font:900 98px/1.04 FIT,sans-serif;color:#FFFFFF;letter-spacing:.02em;white-space:nowrap}.h .r{color:#D92A11}'
           f'.me{{left:-60px;top:250px;width:640px;{SHADOW}}}')
    html = HEAD.format(css=css) + '<div class="bgw z1"><img data-img="bg" alt=""></div><div class="sh z2"></div><div class="pl z3" data-move="plate"><div class="h" data-k="h"></div></div><img class="cut me z4" data-img="me" data-move="her" alt="">' + TAIL
    put('06-class-starts-after-work', html, {'text': {'h': 'Class starts<br><span class="r">after work.</span>'},
        'images': {'bg': PX + 'laptop.jpg', 'me': SH + 'cut-1585r-clean.png'}, 'kind': 'real scene (a desk at night, code on the screen) + her, tired, bottom left; words on a dark plate right', 'layout': 'her left, words right',
        'board': 'Thumbnails 94 (yt-41 "AI has rewired my brain": "It Clicked." one short line on a dark picture)',
        'fonts': ['design-26 Inter Tight Black (white #FFFFFF, red #D92A11 on #0C0C0C, Design 20)'], 'colours': 'Design 20: #0C0C0C / #FFFFFF / #D92A11',
        'thumbnail_text': 'Class starts after work. (her tired, a desk with code at night)',
        'titles': [T_AFTER, T_MAIN, T_9TO5], 'title': T_AFTER,
        'direction': 'Copies Thumbnails 94: one dark real scene (a desk at night with code, Pexels, film/assets/CREDITS.md), one short line on a dark plate, her tired in the corner (hand in her hair).'})

# ---------- 07: Thumbnails 75 (yt-22 BEFORE | AFTER: two flat halves) -> DAY JOB | NIGHT CLASS ----------
def t07():
    lap = ('<svg width="340" height="236" viewBox="0 0 330 230"><rect x="40" y="10" width="250" height="160" rx="8" fill="#262824"/>'
           '<rect x="58" y="28" width="214" height="124" fill="#DFD8D4"/><rect x="74" y="48" width="120" height="12" fill="#262824"/><rect x="74" y="74" width="160" height="12" fill="#262824"/>'
           '<rect x="74" y="100" width="90" height="12" fill="#262824"/><path d="M0 178h330l-22 40H22z" fill="#262824"/></svg>')
    book = ('<svg width="340" height="236" viewBox="0 0 330 230"><path d="M165 40C120 14 60 10 14 22v180c46-12 106-8 151 18z" fill="#DFD8D4"/>'
            '<path d="M165 40c45-26 105-30 151-18v180c-46-12-106-8-151 18z" fill="#DFD8D4"/><rect x="161" y="40" width="8" height="180" fill="#262824"/></svg>')
    sun = '<svg width="120" height="120" viewBox="0 0 120 120"><circle cx="60" cy="60" r="34" fill="#262824"/></svg>'
    moon = '<svg width="120" height="120" viewBox="0 0 120 120"><path d="M78 16a46 46 0 1 0 28 66A38 38 0 0 1 78 16z" fill="#DFD8D4"/></svg>'
    css = ('.t{background:#262824}.L{left:0;top:0;width:640px;height:720px;background:#DFD8D4}.R{left:640px;top:0;width:640px;height:720px;background:#262824}'
           '.w{top:44px;width:640px;text-align:center;font:700 150px/.9 FBS,sans-serif;text-transform:uppercase;letter-spacing:-.005em;white-space:nowrap}'
           '.w1{left:0;color:#262824}.w2{left:640px;color:#DFD8D4}.i1{left:150px;top:420px}.i2{left:790px;top:420px}.s1{left:500px;top:300px}.s2{left:660px;top:300px}')
    html = HEAD.format(css=css) + (f'<div class="L z1"></div><div class="R z1"></div><div class="w w1 z2" data-k="a"></div><div class="w w2 z2" data-k="b"></div>'
        f'<div class="i1 z2">{lap}</div><div class="i2 z2">{book}</div><div class="s1 z2">{sun}</div><div class="s2 z2">{moon}</div>') + TAIL
    put('07-day-job-night-class', html, {'text': {'a': 'Day<br>job', 'b': 'Night<br>class'},
        'kind': 'flat split, light | dark, a laptop and a book drawn flat, no face', 'layout': 'split, no face',
        'board': 'Thumbnails 75 (yt-22 "Coding Was Hard Until I Learned THESE 5 Things": BEFORE | AFTER, two flat halves)',
        'fonts': ['design-04 Big Shoulders Display Bold (#262824 on #DFD8D4 and the reverse, Design 396)'], 'colours': 'Design 396: #DFD8D4 / #262824',
        'thumbnail_text': 'DAY JOB | NIGHT CLASS (a laptop and a sun | a book and a moon)',
        'titles': [T_DAYNIGHT, T_MAIN, T_9TO5], 'title': T_DAYNIGHT,
        'direction': 'Copies Thumbnails 75: two flat halves, light for the day job (a laptop, a sun), dark for the night class (a book, a moon). Big Shoulders Bold in Design 396\'s light grey and charcoal.'})

# ---------- 08: Thumbnails 31 (pin-03-02 "no one cares.": light ground, plain words, the person on the right) ----------
def t08():
    css = ('.t{background:#E9E7E3}.h{left:56px;top:60px;font:500 140px/.98 FIT,sans-serif;color:#111111;letter-spacing:-.05em;text-transform:uppercase}'
           f'.me{{left:520px;top:182px;width:820px;{SHADOW}}}')
    html = HEAD.format(css=css) + '<div class="h z3" data-k="h"></div><img class="cut me z2" data-img="me" data-move="her" alt="">' + TAIL
    put('08-can-you-do-both', html, {'text': {'h': 'Can<br>you do<br>both?'},
        'images': {'me': SH + 'cut-1593-clean.png'}, 'kind': 'bright plain ground, words left / her right, her open hand at the words (2 of 2)', 'layout': 'words left / her right',
        'board': 'Thumbnails 31 (pin-03-02 "no one cares.": plain words on light grey, the person right)',
        'fonts': ['thumbs-03 Inter Tight Medium (#111111 on #E9E7E3, Thumbnails 31)'], 'colours': 'Thumbnails 31: #E9E7E3 / #111111',
        'thumbnail_text': 'CAN YOU DO BOTH?',
        'titles': [T_MAIN, T_BOTH, T_SEARCH], 'title': T_MAIN,
        'direction': 'Copies Thumbnails 31: a bright, airy plain ground, one short question, her open hand right at the words.'})

# ---------- 09: Thumbnails 129 (viral-3 "FITNESS SALES FRAMEWORK": hand-written steps with arrows) -> the steps round her head ----------
def t09():
    ar = lambda r: f'<svg width="160" height="94" viewBox="0 0 120 70" fill="none" stroke="#FFFFFF" stroke-width="7" stroke-linecap="round" stroke-linejoin="round" style="rotate:{r}deg"><path d="M8 50C40 14 80 14 110 40"/><path d="M90 22l20 18-24 8"/></svg>'
    css = ('.t{background:#3B88D6}.s{font:700 128px/1 FCV,cursive;color:#FFFFFF;white-space:nowrap}'
           '.s1{left:40px;top:40px}.s2{right:50px;top:40px}.s3{right:40px;top:420px}.s4{left:40px;top:420px}'
           '.a1{left:560px;top:70px}.a2{left:1080px;top:250px}.a3{left:600px;top:560px}'
           f'.me{{left:370px;top:240px;width:560px;{SHADOW}}}')
    html = (HEAD.format(css=css).replace('</style>', "@font-face{font-family:'FCV';src:url('../../fonts/Caveat.ttf');font-weight:400 700}</style>")
        + ''.join(f'<div class="s s{i} z3" data-k="s{i}"></div>' for i in range(1, 5))
        + f'<div class="a1 z3">{ar(0)}</div><div class="a2 z3">{ar(90)}</div>'
        '<img class="cut me z2" data-img="me" data-move="her" alt="">') + TAIL
    put('09-work-class-study-sleep', html, {'text': {'s1': 'work 9-5', 's2': 'class', 's3': 'study', 's4': 'sleep!'},
        'images': {'me': SH + 'cut-1587r-clean.png'}, 'kind': 'flat blue, her (tired, hand in her hair) in the middle, the four steps of her day hand-written round her', 'layout': 'her centre, words round her',
        'board': 'Thumbnails 129 (viral-3 "FITNESS SALES FRAMEWORK": hand-written steps joined by arrows beside the face)',
        'fonts': ['shorts-14 Caveat Bold (white #FFFFFF on blue #3B88D6, Formats 64)'], 'colours': 'Formats 64: #3B88D6 / #FFFFFF',
        'thumbnail_text': 'work 9-5 -> class -> study -> sleep! (round her head)',
        'titles': [T_WEEK, T_9TO5, T_MAIN], 'title': T_WEEK,
        'direction': 'Copies Thumbnails 129: her day as hand-written steps joined by arrows, here going round her head (work 9-5, class, study, sleep!); she looks tired, hand in her hair. Caveat Bold white on blue, as Formats 64.'})

for f in (t01, t02, t03, t04, t05, t06, t07, t08, t09): f()
print('\n'.join(OUT))
