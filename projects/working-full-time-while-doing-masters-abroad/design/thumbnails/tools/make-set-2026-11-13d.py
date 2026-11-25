#!/usr/bin/env python3
"""working-full-time thumbnails, SET 2026-11-13 ROUND 4 (after the round-3 critic: best 7.5; 5 fixed + 5 new).
Fonts ONLY from the font board (inspiration/boards/fonts/), in their source colours; every thumbnail copies a DIFFERENT
thumbnail-board composition ("Thumbnails N" = studio /ideas/boards/thumbnails/ item N); at most 2 "words left / her right";
every photo of her is a different shoot photo with a different crop; no stock photo used twice.
Writes directions/<dir>/index.html + content.json. Keeps "nudge" and edited "text" of an existing content.json unless --force.
Run: python3 tools/make-set-2026-11-13d.py --force && node render.mjs"""
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

# ---------- 01: Thumbnails 7 (pin-01-07 fpt.doc "COOK": huge words behind the head) ----------
def t01():
    css = ('.t{background:#E9E0CC}'
           '.k{top:22px;font:800 98px/1 FIT,sans-serif;color:#CB482E;letter-spacing:-.02em;text-transform:uppercase;white-space:nowrap}.k1{left:34px}.k2{right:34px}'
           '.w{top:118px;font:400 350px/1 FSC,sans-serif;color:#CB482E;letter-spacing:.01em;text-transform:uppercase;white-space:nowrap}.w1{left:34px}.w2{right:34px}'
           f'.me{{left:222px;top:232px;width:836px;{SHADOW}}}')
    html = HEAD.format(css=css) + ('<div class="k k1 z2" data-k="k1"></div><div class="k k2 z2" data-k="k2"></div>'
        '<div class="w w1 z2" data-k="a"></div><div class="w w2 z2" data-k="b"></div><img class="cut me z3" data-img="me" data-move="her" alt="">') + TAIL
    put('01-full-time-work-full-time-study', html, {'recommended': True, 'text': {'k1': 'Full-time', 'k2': 'Full-time', 'a': 'Work', 'b': 'Study'},
        'images': {'me': SH + 'cut-1586c-clean.png'}, 'kind': 'flat, huge words either side of her (her in the middle, big)', 'layout': 'her centre',
        'board': 'Thumbnails 7 (pin-01-07 fpt.doc "COOK": huge word behind the head)',
        'fonts': ['pair-04 Six Caps + Inter Tight (red #CB482E on cream #E9E0CC, Design 377)'], 'colours': 'Design 377: #E9E0CC / #CB482E',
        'thumbnail_text': 'FULL-TIME WORK | FULL-TIME STUDY (huge, either side of her)',
        'titles': [T_MAIN, T_SEARCH, T_FIRST], 'title': T_MAIN,
        'direction': 'Copies Thumbnails 7: huge words fill the frame either side of her, FULL-TIME WORK and FULL-TIME STUDY; she sits big between them, thinking. Six Caps + Inter Tight red on cream, as Design 377.'})

# ---------- 02: Thumbnails 51 (yt-79: her with a big week calendar) -> a plain week grid, two rows of blocks ----------
def t02():
    css = ('.t{background:#D9F44F}'
           '.h{left:560px;top:36px;font:900 84px/1 FIT,sans-serif;color:#070804;letter-spacing:.02em;text-transform:uppercase;white-space:nowrap}'
           '.g{left:600px;top:160px;width:650px;height:520px;background:#070804;padding:26px}'
           '.dl{position:absolute;top:22px;width:84px;text-align:center;font:900 62px/1 FIT,sans-serif;color:#D9F44F}'
           '.rl{position:absolute;left:26px;font:900 62px/1 FIT,sans-serif;color:#D9F44F;letter-spacing:-.02em}'
           '.sq{position:absolute;width:70px;height:150px}.wk{top:110px;background:#D9F44F}.st{top:300px;background:#FFFFFF}'
           f'.me{{left:-110px;top:178px;width:690px;{SHADOW}}}')
    cells = ''; text = {'h': "9-5 + master's", 'r0': 'Job', 'r1': 'Study'}
    for i, d in enumerate('MTWTF'):
        x = 236 + i * 80 + i * 0
        x = 236 + i * 80
        cells += f'<div class="dl" style="left:{x}px" data-k="d{i}"></div><div class="sq wk" style="left:{x+2}px"></div><div class="sq st" style="left:{x+2}px"></div>'
        text[f'd{i}'] = d
    cells = cells.replace('width:84px', 'width:72px')
    html = HEAD.format(css=css) + (f'<div class="h z3" data-k="h"></div><div class="g z2" data-move="calendar">{cells}'
        '<div class="rl" style="top:150px" data-k="r0"></div><div class="rl" style="top:340px" data-k="r1"></div></div>'
        '<img class="cut me z4" data-img="me" data-move="her" alt="">') + TAIL
    put('02-week-calendar', html, {'text': text, 'images': {'me': SH + 'cut-1594-clean.png'},
        'kind': 'flat + her cut-out on the LEFT presenting a plain week grid (JOB row, STUDY row, Mon-Fri)', 'layout': 'her left, grid right',
        'board': 'Thumbnails 51 (yt-79 "How I have time for everything with a full time job": her with a big week calendar)',
        'fonts': ['design-09 Inter Tight Black (ink #070804 on lime #D9F44F, Design 394)'], 'colours': 'Design 394: #D9F44F / #070804 (+ white blocks)',
        'thumbnail_text': "9-5 + MASTER'S + a week grid: JOB every day, STUDY every day (M T W T F)",
        'titles': [T_WEEK, T_9TO5, T_DEV], 'title': T_WEEK,
        'direction': 'Copies Thumbnails 51: her week as one plain grid (a JOB row and a STUDY row, every weekday filled), she presents it from the left. Inter Tight Black ink on lime, as Design 394.'})

# ---------- 03: Thumbnails 69 (yt-16 "12:30 PM | 7:30 PM": two pictures, a time on each; her like) ----------
def t03():
    css = ('.t{background:#0C0C0C}.half{top:0;width:637px;height:720px;overflow:hidden}.h1{left:0}.h2{left:643px}'
           '.half img,.half .ov{position:absolute;display:block}.a{width:1411px;left:-350px;top:-300px}.b{width:1200px;left:-255px;top:-190px}'
           '.mo{left:0;top:0;width:637px;height:720px;background:rgba(214,232,255,.30);mix-blend-mode:screen}'
           '.ev{left:0;top:0;width:637px;height:720px;background:rgba(26,11,2,.80)}'
           '.bx{top:440px;width:460px;font:700 150px/1 FIT,sans-serif;color:#FFFFFF;background:#CB2D26;padding:8px 0 18px 26px;letter-spacing:-.045em;white-space:nowrap}'
           '.b1{left:30px}.b2{left:673px}'
           '.lb{top:590px;width:460px;font:700 80px/1 FIT,sans-serif;color:#FFFFFF;background:#0C0C0C;padding:10px 0 16px 26px;letter-spacing:-.01em;text-transform:uppercase;white-space:nowrap}.l1{left:30px}.l2{left:673px}')
    html = HEAD.format(css=css) + ('<div class="half h1 z1"><img class="a" data-img="a" alt=""><div class="ov mo"></div><img class="a" data-img="ame" alt=""></div>'
        '<div class="half h2 z1"><img class="b" data-img="b" alt=""><div class="ov ev"></div><img class="b" data-img="bme" alt=""></div>'
        '<div class="bx b1 z3" data-k="t1"></div><div class="bx b2 z3" data-k="t2"></div><div class="lb l1 z4" data-k="l1"></div><div class="lb l2 z4" data-k="l2"></div>') + TAIL
    put('03-9am-job-9pm-masters', html, {'text': {'t1': '9:00', 't2': '21:00', 'l1': 'Job', 'l2': "Master's"},
        'images': {'a': SH + 'room-1585.jpg', 'ame': SH + 'room-1585-cut.png', 'b': SH + 'room-1578.jpg', 'bme': SH + 'room-1578-cut.png'},
        'kind': 'split: her at 9:00 (bright cool room) | her at 21:00 (room dark and warm); her face untouched in both', 'layout': 'split',
        'board': 'Thumbnails 69 (yt-16 "24 Hours of Healthy Student Cooking": 12:30 PM | 7:30 PM, a time on each photo; she liked it)',
        'fonts': ['design-34 Inter Tight Bold (white #FFFFFF on red #CB2D26, Design 373)'], 'colours': 'Design 373: #CB2D26 / #FFFFFF (+ #0C0C0C tags, Design 20)',
        'thumbnail_text': "9:00 JOB | 21:00 MASTER'S",
        'titles': [T_MAIN, T_9TO5, T_DEV], 'title': T_MAIN,
        'direction': 'Copies Thumbnails 69: the day told by two photos of her and two times; the 9:00 room bright and cool, the 21:00 room dark and warm (only the room is graded). Inter Tight Bold white on red, as Design 373.'})

# ---------- 04: Thumbnails 121 (yt-68 "STOP WASTING EVENINGS": heavy white caps left, red box, him right) ----------
def t04():
    css = ('.t{--rw:2117px;--rx:-30px;--ry:-492px;--dim:rgba(34,34,34,.6);background:#222222}'
           '.dk{left:0;top:0;width:660px;height:720px;background:rgba(0,0,0,.3)}'
           '.h{left:40px;top:84px;font:400 154px/1.0 FAN,sans-serif;color:#FFFFFF;text-transform:uppercase;letter-spacing:.005em;white-space:nowrap}'
           '.h .bx{background:#D7262B;padding:0 .1em;display:inline-block;margin-top:14px}')
    html = HEAD.format(css=css) + ROOM.replace('<div class="dim z2"></div>', '<div class="dim z2"></div><div class="dk z2"></div>') + '<div class="h z4" data-k="h"></div>' + TAIL
    put('04-full-time-job-plus-masters', html, {'text': {'h': "Full-time<br>job +<br><span class=\"bx\">master's</span>"},
        'images': room(1589), 'kind': 'photo (her room, close; words left / her right, 1 of 2)', 'layout': 'words left / her right',
        'board': 'Thumbnails 121 (yt-68 "7 Things I Did To Stop Wasting My Evenings": STOP WASTING EVENINGS, white caps left + red box, him right)',
        'fonts': ['thumbs-16 Anton + red box (white on #222222, red #D7262B, Thumbnails 113)'], 'colours': 'Thumbnails 113: #222222 / #FFFFFF / #D7262B',
        'thumbnail_text': "FULL-TIME JOB + MASTER'S",
        'titles': [T_FIRST, T_MAIN, T_BOTH], 'title': T_FIRST,
        'direction': 'Copies Thumbnails 121: the claim in heavy white caps on the darkened left, the last word in a red box, her on the right of her dimmed room.'})

# ---------- 05: Thumbnails 127 (viral-1 "FINANCIAL LITERACY": huge words behind her) -> over a real Tallinn photo ----------
def t05():
    css = ('.t{background:#2E2E33}.bg{left:0;top:0;width:1280px;height:720px}.sh{inset:0;background:rgba(46,46,51,.38)}'
           '.a{left:0;width:1280px;top:24px;text-align:center;font:600 84px/1 FOSW,sans-serif;color:#FFFFFF;text-transform:uppercase;letter-spacing:.02em;white-space:nowrap}'
           '.b{left:0;width:1280px;top:106px;text-align:center;font:700 250px/1 FOSW,sans-serif;color:#7FF0C0;text-transform:uppercase;letter-spacing:.01em;white-space:nowrap}'
           f'.me{{left:390px;top:396px;width:500px;{SHADOW}}}')
    html = HEAD.format(css=css) + '<img class="ph bg z1" data-img="bg" alt=""><div class="sh z2"></div><div class="a z3" data-k="a"></div><div class="b z3" data-k="b"></div><img class="cut me z4" data-img="me" data-move="her" alt="">' + TAIL
    put('05-study-and-work-in-estonia', html, {'text': {'a': 'Study + work in', 'b': 'Estonia'},
        'images': {'bg': PX + 'tallinn.jpg', 'me': SH + 'cut-1590c-clean.png'}, 'kind': 'real Tallinn photo + huge words + her below them', 'layout': 'her centre, below the words',
        'board': 'Thumbnails 127 (viral-1 "FINANCIAL LITERACY": the topic huge across the picture, the person in front)',
        'fonts': ['shorts-17 Oswald caps, white + mint key word (#FFFFFF, #7FF0C0 on #2E2E33, Formats 20)'], 'colours': 'Formats 20: #2E2E33 / #FFFFFF / #7FF0C0',
        'thumbnail_text': 'STUDY + WORK IN ESTONIA (over Tallinn old town)',
        'titles': [T_SW, T_EST, T_NG], 'title': T_SW,
        'direction': 'Copies Thumbnails 127: the topic huge across a real picture of the place (Tallinn old town, Pexels, film/assets/CREDITS.md), ESTONIA in mint, her presenting below it.'})

# ---------- 06: Thumbnails 94 (yt-41 "It Clicked.": one dark real picture, one short white line in the middle; no face) ----------
def t06():
    css = ('.t{background:#0C0C0C}.bg{left:0;top:0;width:1280px;height:720px}.sh{inset:0;background:rgba(12,12,12,.5)}'
           '.h{left:0;width:1280px;top:190px;text-align:center;font:900 134px/1.0 FIT,sans-serif;color:#FFFFFF;letter-spacing:-.04em;white-space:nowrap}.h .r{color:#D92A11}')
    html = HEAD.format(css=css) + '<img class="ph bg z1" data-img="bg" alt=""><div class="sh z2"></div><div class="h z3" data-k="h"></div>' + TAIL
    put('06-class-starts-after-work', html, {'text': {'h': 'Class starts<br><span class="r">after work.</span>'},
        'images': {'bg': PX + 'laptop.jpg'}, 'kind': 'real scene (a desk at night, code on the screen), no face', 'layout': 'no face',
        'board': 'Thumbnails 94 (yt-41 "AI has rewired my brain": "It Clicked." one short white line on a dark picture)',
        'fonts': ['design-26 Inter Tight Black (white #FFFFFF, red #D92A11 on #0C0C0C, Design 20)'], 'colours': 'Design 20: #0C0C0C / #FFFFFF / #D92A11',
        'thumbnail_text': 'Class starts after work. (over a lamp-lit desk with code at night)',
        'titles': [T_AFTER, T_MAIN, T_9TO5], 'title': T_AFTER,
        'direction': 'Copies Thumbnails 94: one dark real scene (a desk at night, Pexels, film/assets/CREDITS.md) and one short line in the middle, the second half in red.'})

# ---------- 07: Thumbnails 75 (yt-22 BEFORE | AFTER: two flat colour halves, a sign between; no face here) ----------
def t07():
    lap = ('<svg width="330" height="230" viewBox="0 0 330 230"><rect x="40" y="10" width="250" height="160" rx="8" fill="#120F0E"/>'
           '<rect x="58" y="28" width="214" height="124" fill="#D44B29"/><rect x="74" y="48" width="120" height="12" fill="#120F0E"/><rect x="74" y="74" width="160" height="12" fill="#120F0E"/>'
           '<rect x="74" y="100" width="90" height="12" fill="#120F0E"/><path d="M0 178h330l-22 40H22z" fill="#120F0E"/></svg>')
    book = ('<svg width="330" height="230" viewBox="0 0 330 230"><path d="M165 40C120 14 60 10 14 22v180c46-12 106-8 151 18z" fill="#D44B29"/>'
            '<path d="M165 40c45-26 105-30 151-18v180c-46-12-106-8-151 18z" fill="#D44B29"/><rect x="161" y="40" width="8" height="180" fill="#120F0E"/></svg>')
    css = ('.t{background:#120F0E}.L{left:0;top:0;width:640px;height:720px;background:#D44B29}.R{left:640px;top:0;width:640px;height:720px;background:#120F0E}'
           '.w{top:40px;width:640px;text-align:center;font:900 168px/.92 FBS,sans-serif;text-transform:uppercase;letter-spacing:-.01em;white-space:nowrap}'
           '.w small{display:block;font-size:.5em;line-height:1.1}.w1{left:0;color:#120F0E}.w2{left:640px;color:#D44B29}.i1{left:155px;top:380px}.i2{left:795px;top:380px}'
           '.pl{left:560px;top:300px;width:160px;height:160px;border-radius:50%;background:#FFFFFF;color:#120F0E;text-align:center;font:900 150px/150px FBS,sans-serif}')
    html = HEAD.format(css=css) + (f'<div class="L z1"></div><div class="R z1"></div><div class="w w1 z2" data-k="a"></div><div class="w w2 z2" data-k="b"></div>'
        f'<div class="i1 z2">{lap}</div><div class="i2 z2">{book}</div><div class="pl z3" data-k="p"></div>') + TAIL
    put('07-job-plus-masters-split', html, {'text': {'a': '<small>Full-time</small>job', 'b': "<small>Full-time</small>master's", 'p': '+'},
        'kind': 'flat split, two colours, a laptop and a book drawn flat, no face', 'layout': 'split, no face',
        'board': 'Thumbnails 75 (yt-22 "Coding Was Hard Until I Learned THESE 5 Things": BEFORE | AFTER, two flat halves, a sign between)',
        'fonts': ['pair-06 Big Shoulders Display Black (ink #120F0E on #D44B29 and the reverse, Design 400)'], 'colours': 'Design 400: #D44B29 / #120F0E (+ white plus)',
        'thumbnail_text': "FULL-TIME JOB + FULL-TIME MASTER'S (a laptop | a book)",
        'titles': [T_MAIN, T_SEARCH, T_FIRST], 'title': T_MAIN,
        'direction': 'Copies Thumbnails 75: two flat halves, the job (a laptop) and the master\'s (a book), a plus between them. Big Shoulders Black in Design 400\'s orange and ink.'})

# ---------- 08: Thumbnails 31 (pin-03-02 "no one cares.": light ground, plain lowercase words, the person on the right) ----------
def t08():
    css = ('.t{background:#E9E7E3}.h{left:60px;top:150px;font:500 112px/1.0 FIT,sans-serif;color:#111111;letter-spacing:-.05em}'
           f'.me{{left:560px;top:195px;width:800px;{SHADOW}}}')
    html = HEAD.format(css=css) + '<div class="h z3" data-k="h"></div><img class="cut me z2" data-img="me" data-move="her" alt="">' + TAIL
    put('08-you-can-do-both', html, {'text': {'h': "a job and<br>a master's?<br>you can<br>do both."},
        'images': {'me': SH + 'cut-1593-clean.png'}, 'kind': 'bright plain ground, words left / her right presenting them (2 of 2)', 'layout': 'words left / her right',
        'board': 'Thumbnails 31 (pin-03-02 "no one cares.": plain lowercase words on light grey, the person right)',
        'fonts': ['thumbs-03 Inter Tight Medium (#111111 on #E9E7E3, Thumbnails 31)'], 'colours': 'Thumbnails 31: #E9E7E3 / #111111',
        'thumbnail_text': "a job and a master's? you can do both.",
        'titles': [T_BOTH, T_MAIN, T_SEARCH], 'title': T_BOTH,
        'direction': 'Copies Thumbnails 31: a bright, airy plain ground, four short lowercase lines, her presenting them with an open hand from the right.'})

# ---------- 09: Thumbnails 129 (viral-3 "FITNESS SALES FRAMEWORK": the face at the side, a hand-written flow beside it) ----------
def t09():
    arrow = '<svg width="90" height="40" viewBox="0 0 90 40" fill="none" stroke="#18480E" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"><path d="M6 22c26-8 50-8 74 0"/><path d="M64 8l16 14-18 10"/></svg>'
    css = ('.t{background:#C4BF3B}.h{left:520px;top:30px;font:400 110px/1 FCB,cursive;color:#18480E;white-space:nowrap}'
           '.s{font:400 94px/1 FCB,cursive;color:#18480E;white-space:nowrap}.s1{left:520px;top:200px}.s2{left:900px;top:200px}.s3{left:520px;top:390px}.s4{left:900px;top:390px}'
           '.a1{left:790px;top:226px}.a2{left:600px;top:310px;rotate:120deg}.a3{left:790px;top:416px}'
           f'.me{{left:-170px;top:150px;width:700px;{SHADOW}}}')
    html = HEAD.format(css=css) + ('<div class="h z3" data-k="h"></div>'
        + ''.join(f'<div class="s s{i} z3" data-k="s{i}"></div>' for i in range(1, 5))
        + f'<div class="a1 z3">{arrow}</div><div class="a3 z3">{arrow}</div>'
        '<div class="z3" style="left:640px;top:300px;width:330px;height:90px"><svg width="330" height="90" viewBox="0 0 330 90" fill="none" stroke="#18480E" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"><path d="M300 8C250 60 120 70 30 70"/><path d="M48 52L28 70l22 14"/></svg></div>'
        '<img class="cut me z2" data-img="me" data-move="her" alt="">') + TAIL
    put('09-my-weekday', html, {'text': {'h': 'my weekday:', 's1': 'work 9-5', 's2': 'class', 's3': 'study', 's4': 'sleep!'},
        'images': {'me': SH + 'cut-1587.png'}, 'kind': 'flat, her face on the LEFT, a hand-written flow on the right', 'layout': 'her left, words right',
        'board': 'Thumbnails 129 (viral-3 "FITNESS SALES FRAMEWORK": the face at the side, a hand-written flow with arrows)',
        'fonts': ['design-19 Caveat Brush (green #18480E on #C4BF3B, Design 362)'], 'colours': 'Design 362: #C4BF3B / #18480E',
        'thumbnail_text': 'my weekday: work 9-5 -> class -> study -> sleep!',
        'titles': [T_WEEK, T_9TO5, T_MAIN], 'title': T_WEEK,
        'direction': 'Copies Thumbnails 129: her at the side (hand in her hair), the weekday written out as a flow with arrows. Caveat Brush green on olive yellow, as Design 362.'})

# ---------- 10: Thumbnails 46 (yt-74 "Teaching myself EVERYTHING": a real photo, white italic words low left, a red line) ----------
def t10():
    css = ('.t{background:#2E2A26}.bg{left:0;top:0;width:1280px;height:720px}.sh{left:0;top:330px;width:1280px;height:390px;background:rgba(46,42,38,.62)}'
           '.h{left:56px;top:400px;font:900 108px/1.0 FPF,serif;color:#E8DCC8;text-transform:uppercase;letter-spacing:-.01em;white-space:nowrap}'
           '.ul{left:60px;top:636px;width:560px;height:12px;background:#D92A11;rotate:-1.5deg}')
    html = HEAD.format(css=css) + '<img class="ph bg z1" data-img="bg" alt=""><div class="sh z2"></div><div class="h z3" data-k="h"></div><div class="ul z3"></div>' + TAIL
    put('10-surviving-a-job-and-masters', html, {'text': {'h': "Surviving a job<br>+ a master's"},
        'images': {'bg': PX + 'mealprep.jpg'}, 'kind': 'real scene (the week\'s meal prep), no face', 'layout': 'no face',
        'board': 'Thumbnails 46 (yt-74 "I\'m sick of OVERCONSUMING stuff": a real photo, white italic words low left, a red line)',
        'fonts': ['thumbs-04 Playfair Display Black Italic caps (#E8DCC8 on #2E2A26, Thumbnails 41)'], 'colours': 'Thumbnails 41: #2E2A26 / #E8DCC8 (+ red line)',
        'thumbnail_text': "SURVIVING A JOB + A MASTER'S (over a week of meal prep)",
        'titles': [T_SURV, T_MAIN, T_BOTH], 'title': T_SURV,
        'direction': 'Copies Thumbnails 46: a real scene of how the week is survived (meal prep boxes, Pexels, film/assets/CREDITS.md), the words in Playfair Black Italic caps low left with a red line.'})

for f in (t01, t02, t03, t04, t05, t06, t07, t08, t09, t10): f()
print('\n'.join(OUT))
