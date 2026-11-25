#!/usr/bin/env python3
"""working-full-time thumbnails, SET 2026-11-13 ROUND 3 (after the round-2 critic: best 7.5; 6 kept and fixed, the rest dropped).
Fonts ONLY from the font board (inspiration/boards/fonts/), in their source colours; every thumbnail copies a DIFFERENT
thumbnail-board composition ("Thumbnails N" = studio /ideas/boards/thumbnails/ item N); at most 2 "words left / her right";
every photo of her is a different shoot photo with a different crop; no stock photo used twice.
Writes directions/<dir>/index.html + content.json. Keeps "nudge" and edited "text" of an existing content.json unless --force.
Run: python3 tools/make-set-2026-11-13c.py --force && node render.mjs"""
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

# ---------- 01: Thumbnails 7 (pin-01-07 fpt.doc "COOK": huge words behind the head) ----------
def t01():
    css = ('.t{background:#E9E0CC}'
           '.k{top:22px;font:800 98px/1 FIT,sans-serif;color:#CB482E;letter-spacing:-.02em;text-transform:uppercase;white-space:nowrap}.k1{left:34px}.k2{right:34px}'
           '.w{top:118px;font:400 372px/1 FSC,sans-serif;color:#CB482E;letter-spacing:.005em;text-transform:uppercase;white-space:nowrap}.w1{left:34px}.w2{right:34px}'
           '.me{left:316px;top:262px;width:648px;filter:drop-shadow(0 6px 10px rgba(0,0,0,.28))}')
    html = HEAD.format(css=css) + ('<div class="k k1 z2" data-k="k1"></div><div class="k k2 z2" data-k="k2"></div>'
        '<div class="w w1 z2" data-k="a"></div><div class="w w2 z2" data-k="b"></div><img class="cut me z3" data-img="me" data-move="her" alt="">') + TAIL
    put('01-full-time-work-full-time-study', html, {'recommended': True, 'text': {'k1': 'Full-time', 'k2': 'Full-time', 'a': 'Work', 'b': 'Study'},
        'images': {'me': SH + 'cut-1586c-clean.png'}, 'kind': 'flat, huge words either side of her (her in the middle)', 'layout': 'her centre',
        'board': 'Thumbnails 7 (pin-01-07 fpt.doc "COOK": one huge word behind the head)',
        'fonts': ['pair-04 Six Caps + Inter Tight (red #CB482E on cream #E9E0CC, Design 377)'], 'colours': 'Design 377: #E9E0CC / #CB482E',
        'thumbnail_text': 'FULL-TIME WORK | FULL-TIME STUDY (huge, either side of her)',
        'titles': [T_MAIN, T_SEARCH, T_FIRST], 'title': T_MAIN,
        'direction': 'Copies Thumbnails 7: two huge words fill the frame, FULL-TIME WORK on one side, FULL-TIME STUDY on the other; she sits between them, thinking. Six Caps + Inter Tight red on cream, as Design 377.'})

# ---------- 02: Thumbnails 51 (yt-79: her in front of a big week calendar) -> her on the LEFT presenting the whole week ----------
def t02():
    days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']; lect = {0: 'Lecture 18:00', 1: 'Lecture 18:00', 3: 'Lecture 18:00', 2: 'Study', 4: 'Thesis'}
    css = ('.t{background:#D9F44F}'
           '.h{left:490px;top:30px;font:900 92px/1 FIT,sans-serif;color:#070804;letter-spacing:.02em;text-transform:uppercase;white-space:nowrap}'
           '.cal{left:480px;top:150px;width:780px;height:540px;background:#070804;border-radius:22px;padding:0}'
           '.cal .d{position:absolute;top:22px;width:144px;text-align:center;font:800 34px/1 FIT,sans-serif;color:#D9F44F;text-transform:uppercase}'
           '.cal .b{position:absolute;width:144px;border-radius:12px;font:800 29px/1.08 FIT,sans-serif;color:#070804;padding:14px 10px 0 14px}'
           '.cal .w{background:#D9F44F;height:250px;top:74px}.cal .c{background:#FFFFFF;height:170px;top:342px}'
           '.me{left:-50px;top:250px;width:530px;filter:drop-shadow(0 6px 10px rgba(0,0,0,.25))}')
    cells = ''; text = {'h': "9-5 + master's"}
    for i, d in enumerate(days):
        x = 14 + i * 152
        cells += f'<div class="d" style="left:{x}px" data-k="d{i}"></div><div class="b w" style="left:{x}px" data-k="w{i}"></div><div class="b c" style="left:{x}px" data-k="c{i}"></div>'
        text[f'd{i}'] = d; text[f'w{i}'] = 'Work<br>9-17'; text[f'c{i}'] = lect[i].replace(' ', '<br>')
    html = HEAD.format(css=css) + f'<div class="h z3" data-k="h"></div><div class="cal z2" data-move="calendar">{cells}</div><img class="cut me z4" data-img="me" data-move="her" alt="">' + TAIL
    put('02-week-calendar', html, {'text': text, 'images': {'me': SH + 'cut-1594-clean.png'},
        'kind': 'flat + her cut-out on the LEFT presenting a generic week calendar on the right', 'layout': 'her left, calendar right',
        'board': 'Thumbnails 51 (yt-79 "How I have time for everything with a full time job": her with a big week calendar)',
        'fonts': ['design-09 Inter Tight Black (ink #070804 on lime #D9F44F, Design 394)'], 'colours': 'Design 394: #D9F44F / #070804 (+ white blocks)',
        'thumbnail_text': "9-5 + MASTER'S + a Mon-Fri calendar (Work 9-17 every day; Lecture 18:00, Assignment, Thesis in the evenings)",
        'titles': [T_WEEK, T_9TO5, T_DEV], 'title': T_WEEK,
        'direction': 'Copies Thumbnails 51: her week as a calendar (work 9-17 every day, lecture / assignment / thesis every evening), she presents it from the left. Inter Tight Black ink on lime, as Design 394.'})

# ---------- 03: Thumbnails 69 (yt-16 "12:30 PM | 7:30 PM": two pictures side by side, a time on each; her like) ----------
def t03():
    css = ('.t{background:#0C0C0C}.half{top:0;width:636px;height:720px;overflow:hidden}.h1{left:0}.h2{left:644px}'
           '.half img{position:absolute;display:block}.a{width:1411px;left:-350px;top:-300px}.b{width:1200px;left:-255px;top:-190px}'
           '.ev{position:absolute;left:0;top:0;width:636px;height:720px;background:rgba(40,18,6,.62)}'
           '.tm{top:448px;font:700 150px/1 FIT,sans-serif;color:#FFFFFF;background:#CB2D26;padding:8px 28px 18px;letter-spacing:-.045em;white-space:nowrap}'
           '.tm1{left:30px}.tm2{left:674px}'
           '.lb{top:596px;font:700 90px/1 FIT,sans-serif;color:#FFFFFF;background:#0C0C0C;padding:4px 24px 16px;letter-spacing:-.03em;white-space:nowrap}.lb1{left:30px}.lb2{left:674px}')
    html = HEAD.format(css=css) + ('<div class="half h1 z1"><img class="a" data-img="a" alt=""></div>'
        '<div class="half h2 z1"><img class="b" data-img="b" alt=""><div class="ev"></div><img class="b" data-img="bme" alt=""></div>'
        '<div class="tm tm1 z3" data-k="t1"></div><div class="tm tm2 z3" data-k="t2"></div><div class="lb lb1 z4" data-k="l1"></div><div class="lb lb2 z4" data-k="l2"></div>') + TAIL
    put('03-9am-job-9pm-masters', html, {'text': {'t1': '9:00', 't2': '21:00', 'l1': 'job', 'l2': "master's"},
        'images': {'a': SH + 'room-1585.jpg', 'b': SH + 'room-1578.jpg', 'bme': SH + 'room-1578-cut.png'}, 'kind': 'split: her at 9:00 | her at 21:00 (room darkened warm, her face untouched)', 'layout': 'split',
        'board': 'Thumbnails 69 (yt-16 "24 Hours of Healthy Student Cooking": 12:30 PM | 7:30 PM, a time on each photo; she liked it)',
        'fonts': ['design-34 Inter Tight Bold (white #FFFFFF on red #CB2D26, Design 373)'], 'colours': 'Design 373: #CB2D26 / #FFFFFF (+ #0C0C0C tags, Design 20)',
        'thumbnail_text': "9:00 job | 21:00 master's",
        'titles': [T_MAIN, T_9TO5, T_DEV], 'title': T_MAIN,
        'direction': 'Copies Thumbnails 69: the day told by two photos of her and two times (9:00 for the job, 21:00 for the master\'s, the room darkened to evening around her). Inter Tight Bold white on red, as Design 373.'})

# ---------- 04: Thumbnails 104 (yt-51 "Copying / Understanding": two tags, the wrong one crossed out, her beside them; her like) ----------
def t04():
    css = ('.t{--rw:2117px;--rx:-500px;--ry:-440px;--dim:rgba(12,12,12,.58);background:#0C0C0C}'
           '.tg{left:36px;font:900 76px/1 FIT,sans-serif;letter-spacing:-.045em;padding:14px 26px 20px;white-space:nowrap}'
           '.t1{top:160px;background:#E2231A;color:#FFFFFF;rotate:-2deg}.t1 .x{position:relative;display:inline-block}'
           '.t1 .x::after{content:"";position:absolute;left:-8%;right:-8%;top:50%;height:16px;margin-top:-6px;background:#010000;rotate:-8deg}'
           '.t2{top:330px;background:#21F587;color:#010000;rotate:1deg}.t2 .and{font-size:1.5em;vertical-align:-.08em}')
    html = HEAD.format(css=css) + ROOM + '<div class="tg t1 z4" data-k="a"></div><div class="tg t2 z4" data-k="b"></div>' + TAIL
    put('04-job-and-masters-not-or', html, {'text': {'a': "Job <span class=\"x\">or</span> master's", 'b': "Job <span class=\"and\">AND</span> master's"},
        'images': room(1593), 'kind': 'photo, close (her face big on the right; tags left: words left / her right, 1 of 2)', 'layout': 'words left / her right',
        'board': 'Thumbnails 104 (yt-51 "My Note-Taking System": Copying (red) / Understanding (green) tags beside her; she liked it)',
        'fonts': ['thumbs-09 Inter Tight Black white on red #E2231A (Thumbnails 68)', 'combo-22 Inter Tight Black #010000 on green #21F587 (Design 270)'],
        'colours': 'Thumbnails 68 #E2231A / #FFFFFF · Design 270 #21F587 / #010000 · room dimmed #0C0C0C',
        'thumbnail_text': "Job OR master's (OR struck out in black) / Job AND master's (AND big, green)",
        'titles': [T_BOTH, T_MAIN, T_SEARCH], 'title': T_BOTH,
        'direction': 'Copies Thumbnails 104: two tags, "or" struck out on the red one, the answer in green with a big AND; her face close on the right.'})

# ---------- 05: Thumbnails 121 (yt-68 "STOP WASTING EVENINGS": heavy white caps left, one word in a red box, him right) ----------
def t05():
    css = ('.t{--rw:1500px;--rx:-38px;--ry:-320px;--dim:rgba(34,34,34,.6);background:#222222}'
           '.dk{left:0;top:0;width:640px;height:720px;background:rgba(0,0,0,.3)}'
           '.h{left:50px;top:110px;font:400 138px/1.0 FAN,sans-serif;color:#FFFFFF;text-transform:uppercase;letter-spacing:.005em;white-space:nowrap}'
           '.h .bx{background:#D7262B;padding:0 .12em;display:inline-block;margin-top:14px}')
    html = HEAD.format(css=css) + ROOM.replace('<div class="dim z2"></div>', '<div class="dim z2"></div><div class="dk z2"></div>') + '<div class="h z4" data-k="h"></div>' + TAIL
    put('05-full-time-job-plus-masters', html, {'text': {'h': "Full-time<br>job<br><span class=\"bx\">+ master's</span>"},
        'images': room(1591), 'kind': 'photo (her room, words left / her right pointing at them, 2 of 2)', 'layout': 'words left / her right',
        'board': 'Thumbnails 121 (yt-68 "7 Things I Did To Stop Wasting My Evenings": STOP WASTING EVENINGS, white caps left + red box, him right)',
        'fonts': ['thumbs-16 Anton + red box (white on #222222, red #D7262B, Thumbnails 113)'], 'colours': 'Thumbnails 113: #222222 / #FFFFFF / #D7262B',
        'thumbnail_text': "FULL-TIME JOB + MASTER'S",
        'titles': [T_FIRST, T_MAIN, T_BOTH], 'title': T_FIRST,
        'direction': 'Copies Thumbnails 121: the claim in heavy white caps on the darkened left, the second half in a red box, her pointing at it from the right.'})

# ---------- 06: Thumbnails 127 (viral-1 "FINANCIAL LITERACY": huge words BEHIND her head in her real room) ----------
def t06():
    css = ('.t{--rw:1390px;--rx:-62px;--ry:0px;--dim:rgba(90,79,74,.72);background:#5A4F4A}'
           '.h{left:0;width:1280px;top:6px;text-align:center;font:600 200px/.92 FOS,sans-serif;color:#EDE2A0;text-transform:uppercase;letter-spacing:-.01em;white-space:nowrap}')
    html = HEAD.format(css=css) + '<img class="room z1" data-img="room" alt=""><div class="dim z2"></div><div class="h z3" data-k="h"></div><img class="room z4" data-img="me" alt="">' + TAIL
    put('06-work-and-study-abroad', html, {'text': {'h': 'Work + study<br>abroad'},
        'images': room(1581), 'kind': 'photo, huge words behind her head (her in the middle)', 'layout': 'her centre, words behind',
        'board': 'Thumbnails 127 (viral-1 "FINANCIAL LITERACY": huge words behind her head)',
        'fonts': ['shorts-06 Oswald SemiBold caps (cream #EDE2A0 on #5A4F4A, Formats 26)'], 'colours': 'Formats 26: #5A4F4A / #EDE2A0',
        'thumbnail_text': 'WORK + STUDY ABROAD (huge, behind her)',
        'titles': [T_SW, T_NG, T_MAIN], 'title': T_SW,
        'direction': 'Copies Thumbnails 127: the topic in huge cream condensed caps across her room, behind her head; she raises a hand in front. Oswald cream on warm grey, as Formats 26.'})

for f in (t01, t02, t03, t04, t05, t06): f()
print('\n'.join(OUT))
