#!/usr/bin/env python3
"""working-full-time thumbnails, SET 2026-11-13 (projects/FULL-KIT-BRIEF-2026-11-12.md).
Fonts ONLY from the font board (inspiration/boards/fonts/), in their source colours; every thumbnail copies a DIFFERENT
thumbnail-board composition ("Thumbnails N" = studio /ideas/boards/thumbnails/ item N); at most 2 "words left / her right".
Writes directions/<dir>/index.html + content.json. Keeps "nudge" and edited "text" of an existing content.json unless --force.
Run: python3 tools/make-set-2026-11-13.py && node render.mjs"""
import json, os, sys
HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__))); D = os.path.join(HERE, 'directions')
FORCE = '--force' in sys.argv
SH = '../../assets/shoot2/'; PX = '../../assets/px/'; CO = '../../assets/collage/'
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

# ---------- A: Thumbnails 51 (yt-79 "How I have time for everything with a full time job": her in front of a big week calendar) ----------
def tA():
    days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
    css = ('.t{background:#D9F44F}'
           '.h{left:0;width:1280px;top:26px;text-align:center;font:900 92px/1 FIT,sans-serif;color:#070804;letter-spacing:-.04em;text-transform:uppercase;white-space:nowrap}'
           '.cal{left:70px;top:150px;width:1140px;height:640px;background:#070804;border-radius:22px;padding:22px 26px}'
           '.cal .d{position:absolute;top:22px;width:200px;text-align:center;font:800 34px/1 FIT,sans-serif;color:#D9F44F;text-transform:uppercase;letter-spacing:.02em}'
           '.cal .b{position:absolute;width:196px;border-radius:12px;font:800 30px/1 FIT,sans-serif;color:#070804;padding:14px 0 0 16px;text-transform:uppercase}'
           '.cal .w{background:#D9F44F;height:250px;top:78px}.cal .c{background:#FFFFFF;height:110px;top:344px}'
           '.me{left:268px;top:196px;width:744px}')
    cells = ''
    for i, d in enumerate(days):
        x = 26 + i * 220
        cells += f'<div class="d" style="left:{x}px" data-k="d{i}"></div><div class="b w" style="left:{x+2}px" data-k="w{i}"></div>'
        if i in (0, 1, 4): cells += f'<div class="b c" style="left:{x+2}px" data-k="c{i}"></div>'
    html = HEAD.format(css=css) + f'<div class="h z3" data-k="h"></div><div class="cal z2" data-move="calendar">{cells}</div><img class="cut me z4" data-img="me" data-move="her" alt="">' + TAIL
    text = {'h': "Full-time job + master's"}
    for i, d in enumerate(days): text[f'd{i}'] = d; text[f'w{i}'] = 'Work'
    for i in (0, 1, 4): text[f'c{i}'] = 'Class'
    put('03-week-calendar', html, {'text': text, 'images': {'me': SH + 'cut-1590c.png'},
        'kind': 'flat + her cut-out in the MIDDLE, in front of a generic week calendar', 'layout': 'her centre',
        'board': 'Thumbnails 51 (yt-79 "How I have time for everything with a full time job": her in front of a big week calendar)',
        'fonts': ['design-09 Inter Tight Black (ink #070804 on lime #D9F44F, Design 394 / combo-02)'], 'colours': 'Design 394: #D9F44F / #070804 (+ white blocks)',
        'thumbnail_text': "FULL-TIME JOB + MASTER'S + a week calendar: WORK every day, CLASS three evenings",
        'titles': [T_WEEK, T_MAIN, T_DEV], 'title': T_WEEK,
        'direction': 'Copies Thumbnails 51: she sits in front of her week; the calendar says it (work blocks every day, class blocks on evenings), one plain line on top. Inter Tight Black ink on lime, as Design 394.'})

# ---------- B: Thumbnails 69 (yt-16 "12:30 PM | 7:30 PM", two photos side by side, a time on each; her like) ----------
def tB():
    css = ('.t{background:#0C0C0C}.p1{left:0;top:0;width:636px;height:720px}.p2{left:644px;top:0;width:636px;height:720px}'
           '.tm{top:40px;font:700 112px/1 FIT,sans-serif;color:#FFFFFF;background:#CB2D26;padding:10px 26px 16px;letter-spacing:-.04em;white-space:nowrap}'
           '.tm1{left:36px}.tm2{left:680px}'
           '.lb{top:184px;font:700 64px/1 FIT,sans-serif;color:#FFFFFF;background:#0C0C0C;padding:8px 22px 14px;letter-spacing:-.02em;white-space:nowrap}.lb1{left:36px}.lb2{left:680px}')
    html = HEAD.format(css=css) + ('<img class="ph p1 z1" data-img="a" alt=""><img class="ph p2 z1" data-img="b" alt="">'
        '<div class="tm tm1 z3" data-k="t1"></div><div class="tm tm2 z3" data-k="t2"></div><div class="lb lb1 z3" data-k="l1"></div><div class="lb lb2 z3" data-k="l2"></div>') + TAIL
    put('02-9am-work-6pm-class', html, {'text': {'t1': '9:00', 't2': '18:00', 'l1': 'work', 'l2': 'class'},
        'images': {'a': PX + 'laptop.jpg', 'b': PX + 'lecture.jpg'}, 'kind': 'split, two real photos, no face', 'layout': 'split, no face',
        'board': 'Thumbnails 69 (yt-16 "24 Hours of Healthy Student Cooking": 12:30 PM | 7:30 PM, a time on each photo; she liked it)',
        'fonts': ['design-34 Inter Tight Bold (white #FFFFFF on red #CB2D26, Design 373)'], 'colours': 'Design 373: #CB2D26 / #FFFFFF (+ #0C0C0C tags, Design 20)',
        'thumbnail_text': '9:00 work | 18:00 class (a developer desk, a lecture room)',
        'titles': [T_MAIN, T_DEV, T_SEARCH], 'title': T_MAIN,
        'direction': 'Copies Thumbnails 69: the day told by two photos and two times (a developer desk at 9:00, a lecture room at 18:00). Inter Tight Bold white on red, as Design 373. Photos: Pexels (film/assets/CREDITS.md).'})

# ---------- C: Thumbnails 102 (yt-49 "a busy few days as a corporate girlie": a real photo, a small soft line top left) ----------
def tC():
    css = ('.t{--rw:1430px;--rx:-140px;--ry:-115px;--dim:rgba(43,36,32,.5);background:#2B2420}'
           '.h{left:56px;top:46px;color:#FFFFFF;text-shadow:0 3px 18px rgba(0,0,0,.55)}'
           '.h .a{display:block;font:600 78px/1.02 FIT,sans-serif;letter-spacing:-.035em}.h .b{display:block;font:400 96px/1 FIS,serif;letter-spacing:-.01em;margin-top:2px}')
    html = HEAD.format(css=css) + ROOM + '<div class="h z4" data-move="words"><span class="a" data-k="a"></span><span class="b" data-k="b"></span></div>' + TAIL
    put('10-developer-and-student', html, {'text': {'a': 'a full-time developer', 'b': "doing a full-time master's"},
        'images': room(1587), 'vars': {}, 'kind': 'photo (her real room, her in the middle, a small soft line top left)', 'layout': 'her centre, words top-left small',
        'board': 'Thumbnails 102 (yt-49 "a busy few days as a corporate girlie in nyc": real photo, small soft line top left)',
        'fonts': ['thumbs-17 Inter Tight + Instrument Serif italic (white on #2B2420, Thumbnails 152)'], 'colours': 'Thumbnails 152: #2B2420 / #FFFFFF',
        'thumbnail_text': "a full-time developer / doing a full-time master's",
        'titles': [T_DEV, T_MAIN, T_FIRST], 'title': T_DEV,
        'direction': 'Copies Thumbnails 102: her own room as it is (dimmed a little, face untouched), a soft two-line note top left: who she is and what she is doing.'})

# ---------- D: Thumbnails 128 (viral-2 "Everything done by 2pm.": a checklist on a clipboard + one serif line; no face) ----------
def tD():
    tick = '<svg viewBox="0 0 40 40" width="58" height="58" style="flex:none"><rect x="2" y="2" width="36" height="36" rx="4" fill="none" stroke="#111111" stroke-width="3"/><path d="M9 21l8 8 15-18" stroke="#111111" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    css = ('.t{background:#E8E7E5}'
           '.clip{left:80px;top:110px;width:500px;height:500px;background:#FFFFFF;border-radius:18px;box-shadow:0 26px 50px rgba(17,17,17,.18);padding:120px 44px 0}'
           '.clip .top{position:absolute;left:150px;top:-22px;width:170px;height:62px;background:#555555;border-radius:12px}'
           '.row{display:flex;gap:22px;align-items:center;font:700 50px/1 FLB,serif;color:#111111;letter-spacing:-.03em;padding:26px 0;border-bottom:2px solid #E8E7E5;white-space:nowrap}'
           '.q{left:630px;top:236px;width:640px;font:400 74px/1.08 FLB,serif;color:#111111;letter-spacing:-.04em}.q b{font-weight:700}')
    rows = ''.join(f'<div class="row">{tick}<span data-k="r{i}"></span></div>' for i in range(3))
    html = HEAD.format(css=css) + f'<div class="clip z2" data-move="list"><div class="top"></div>{rows}</div><div class="q z3" data-k="q"></div>' + TAIL
    put('07-job-and-masters-checklist', html, {'text': {'r0': '9-5 job', 'r1': 'Evening class', 'r2': 'Assignment', 'q': "A job and a master's.<br><b>Both full time.</b>"},
        'kind': 'flat object (a checklist), no face', 'layout': 'no face',
        'board': 'Thumbnails 128 (viral-2 "Everything done by 2pm.": a clipboard checklist + one serif line, no face)',
        'fonts': ['pair-05 Libre Baskerville Regular + Bold (#111111 on #E8E7E5, Design 399)'], 'colours': 'Design 399: #E8E7E5 / #111111 / #555555',
        'thumbnail_text': "9-5 job / Evening class / Assignment (all ticked) + A job and a master's. Both full time.",
        'titles': [T_MAIN, T_WEEK, T_BOTH], 'title': T_MAIN,
        'direction': 'Copies Thumbnails 128: the result as one object (a day where the job, the class and the assignment are all ticked) and one serif line. Libre Baskerville ink on light grey, as Design 399.'})

# ---------- E: Thumbnails 64 (yt-11 "interviewing 8 strangers about MOVING ABROAD": a real city scene, italic line + gold Bodoni caps) ----------
def tE():
    css = ('.t{background:#4F5A3E}.bg{left:0;top:0;width:1280px;height:720px}.tint{inset:0;background:rgba(79,90,62,.5)}'
           '.a{left:0;width:1280px;top:44px;text-align:center;font:400 76px/1 FIS,serif;color:#F4EBD0;text-shadow:0 3px 16px rgba(0,0,0,.45)}'
           '.b{left:0;width:1280px;top:118px;text-align:center;font:700 122px/1 FBO,serif;color:#E0B04A;letter-spacing:.01em;text-transform:uppercase;white-space:nowrap;text-shadow:0 6px 24px rgba(0,0,0,.45)}'
           '.me{left:356px;top:262px;width:568px}')
    html = HEAD.format(css=css) + '<img class="ph bg z1" data-img="bg" alt=""><div class="tint z2"></div><div class="a z4" data-k="a"></div><div class="b z4" data-k="b"></div><img class="cut me z3" data-img="me" data-move="her" alt="">' + TAIL
    put('04-working-while-studying-abroad', html, {'text': {'a': 'working full time while', 'b': 'Studying abroad'},
        'images': {'bg': PX + 'tallinn.jpg', 'me': SH + 'cut-1578c.png'}, 'kind': 'photo scene (Tallinn rooftops) + her in the middle', 'layout': 'her centre',
        'board': 'Thumbnails 64 (yt-11 "interviewing 8 strangers about MOVING ABROAD": city scene, italic line + gold serif caps, person centred)',
        'fonts': ['thumbs-07 Bodoni Moda caps + Instrument Serif italic (gold #E0B04A, cream #F4EBD0 on olive #4F5A3E, Thumbnails 64)'], 'colours': 'Thumbnails 64: #4F5A3E / #E0B04A / #F4EBD0',
        'thumbnail_text': 'working full time while STUDYING ABROAD',
        'titles': [T_SW, T_NG, T_FIRST], 'title': T_SW,
        'direction': 'Copies Thumbnails 64: a real place (Tallinn old town, Pexels) washed olive, the small italic line and the big gold Bodoni caps over it, her in the middle. Photo credit: film/assets/CREDITS.md.'})

# ---------- F: Thumbnails 133 (viral-7 "A PORTLAND VLOG": photo collage + one big line across) ----------
def tF():
    css = ('.t{background:#5A4F4A}.g{width:632px;height:356px}.g1{left:0;top:0}.g2{left:648px;top:0}.g3{left:0;top:364px}.g4{left:648px;top:364px}'
           '.wash{inset:0;background:rgba(90,79,74,.42)}'
           '.h{left:0;width:1280px;top:150px;text-align:center;font:600 196px/.9 FOS,sans-serif;color:#EDE2A0;text-transform:uppercase;letter-spacing:-.005em;white-space:nowrap;text-shadow:0 8px 30px rgba(0,0,0,.6)}')
    html = HEAD.format(css=css) + ('<img class="ph g g1 z1" data-img="a" alt=""><img class="ph g g2 z1" data-img="b" alt=""><img class="ph g g3 z1" data-img="c" alt=""><img class="ph g g4 z1" data-img="d" alt="">'
        '<div class="wash z2"></div><div class="h z3" data-k="h"></div>') + TAIL
    put('05-study-and-work-in-estonia', html, {'text': {'h': 'Study + work<br>in Estonia'},
        'images': {'a': PX + 'tallinn.jpg', 'b': SH + 'room-1590.jpg', 'c': PX + 'lecture.jpg', 'd': PX + 'laptop.jpg'},
        'vars': {}, 'kind': 'collage of 4 real photos (city, her room, lecture, desk) + one line', 'layout': 'collage, centred words',
        'board': 'Thumbnails 133 (viral-7 "A PORTLAND VLOG": photo collage + one big line across)',
        'fonts': ['shorts-06 Oswald SemiBold caps (cream #EDE2A0 on #5A4F4A, Formats 26)'], 'colours': 'Formats 26: #5A4F4A / #EDE2A0',
        'thumbnail_text': 'STUDY + WORK IN ESTONIA (over Tallinn, her room, a lecture, a desk)',
        'titles': [T_EST, T_MAIN, T_NG], 'title': T_EST,
        'direction': 'Copies Thumbnails 133: four real photos of the two lives (the city, her room, a lecture, a developer desk) and the search words across, cream Oswald caps as Formats 26.'})

# ---------- G: Thumbnails 121 (yt-68 "STOP WASTING EVENINGS": heavy white caps left, one word in a red box, him right) ----------
def tG():
    css = ('.t{--rw:1640px;--rx:150px;--ry:-300px;--dim:rgba(34,34,34,.66);background:#222222}'
           '.h{left:54px;top:118px;font:400 132px/1.0 FAN,sans-serif;color:#FFFFFF;text-transform:uppercase;letter-spacing:.005em;white-space:nowrap}'
           '.h .bx{background:#D7262B;padding:0 .12em;display:inline-block;margin-top:14px}')
    html = HEAD.format(css=css) + ROOM + '<div class="h z4" data-k="h"></div>' + TAIL
    put('06-full-time-job-plus-masters', html, {'text': {'h': "Full-time<br>job<br><span class=\"bx\">+ master's</span>"},
        'images': room(1586), 'kind': "photo (her room dimmed; words left / her right, 1 of 2)", 'layout': 'words left / her right',
        'board': 'Thumbnails 121 (yt-68 "7 Things I Did To Stop Wasting My Evenings": STOP WASTING EVENINGS, white caps left + red box, him right)',
        'fonts': ['thumbs-16 Anton + red box (white on #222222, red #D7262B, Thumbnails 113)'], 'colours': 'Thumbnails 113: #222222 / #FFFFFF / #D7262B',
        'thumbnail_text': "FULL-TIME JOB + MASTER'S",
        'titles': [T_MAIN, T_FIRST, T_BOTH], 'title': T_MAIN,
        'direction': 'Copies Thumbnails 121: the claim in heavy white caps on the left, the second half in a red box, her thinking it over on the right of her dimmed room (face untouched).'})

# ---------- H: Thumbnails 123 (yt-70 "upgrade your life with neuroplasticity": her in the middle, real objects of the topic around her) ----------
def tH():
    css = ('.t{--rw:1600px;--rx:-200px;--ry:-300px;--dim:rgba(58,54,50,.78);background:#3A3632}'
           '.h{left:0;width:1280px;top:28px;text-align:center;font:700 70px/1 FPO,sans-serif;color:#FFFFFF;letter-spacing:-.03em;white-space:nowrap}'
           '.o{display:block;filter:drop-shadow(0 16px 26px rgba(0,0,0,.5))}'
           '.lap{left:20px;top:200px;width:390px;rotate:-6deg}.lap .scr{position:absolute;left:16.6%;top:35.6%;width:65.7%;height:56%;background:#16191F;padding:20px 22px}'
           '.lap .scr i{display:block;height:13px;border-radius:7px;margin:0 0 15px;background:#5B6B86}'
           '.bk{left:960px;top:150px;width:300px;rotate:5deg}.ck{left:1010px;top:470px;width:200px}.cf{left:60px;top:520px;width:250px}')
    lines = ''.join(f'<i style="width:{w}%;background:{c}"></i>' for w, c in [(60, '#7FA7E8'), (82, '#5B6B86'), (45, '#E0B04A'), (70, '#5B6B86'), (52, '#7FA7E8'), (76, '#5B6B86')])
    html = HEAD.format(css=css) + ROOM + ('<div class="h z5" data-k="h"></div>'
        f'<div class="lap z4" data-move="laptop"><img class="o" data-img="lap" style="width:100%" alt=""><div class="scr">{lines}</div></div>'
        '<img class="o bk z4" data-img="bk" data-move="books" alt=""><img class="o ck z4" data-img="ck" data-move="clock" alt=""><img class="o cf z4" data-img="cf" data-move="coffee" alt="">') + TAIL
    put('09-balance-job-and-masters', html, {'text': {'h': "how I balance a job + a master's"},
        'images': dict(room(1589), lap=CO + 'laptop2.png', bk=CO + 'books.png', ck=CO + 'clock.png', cf=CO + 'coffee.png'),
        'kind': 'collage: her in the middle of her dimmed room, the objects of both lives around her', 'layout': 'her centre',
        'board': 'Thumbnails 123 (yt-70 "upgrade your life with neuroplasticity": her in the middle, real objects round her, small line on top)',
        'fonts': ['thumbs-14 Poppins Bold lowercase (white on #3A3632, Thumbnails 96)'], 'colours': 'Thumbnails 96: #3A3632 / #FFFFFF',
        'thumbnail_text': "how I balance a job + a master's (laptop with code, books, clock, coffee round her)",
        'titles': [T_MAIN, T_WEEK, T_FIRST], 'title': T_MAIN,
        'direction': 'Copies Thumbnails 123: she presents in the middle, the job (laptop with code) and the degree (books) on either side, the clock and the coffee for the long day; one lowercase line on top.'})

# ---------- I: Thumbnails 104 (yt-51 "Copying / Understanding": two tags, the wrong one crossed out, her beside them; her like) ----------
def tI():
    css = ('.t{--rw:1700px;--rx:30px;--ry:-310px;--dim:rgba(12,12,12,.55);background:#0C0C0C}'
           '.tg{left:54px;font:900 92px/1 FIT,sans-serif;letter-spacing:-.045em;padding:14px 26px 20px;white-space:nowrap}'
           '.t1{top:150px;background:#E2231A;color:#FFFFFF;rotate:-2deg}.t1 s{text-decoration-thickness:7px;text-decoration-color:#111111}'
           '.t2{top:330px;background:#21F587;color:#010000;rotate:1.5deg}')
    html = HEAD.format(css=css) + ROOM + '<div class="tg t1 z4" data-k="a"></div><div class="tg t2 z4" data-k="b"></div>' + TAIL
    put('08-job-and-masters-not-or', html, {'text': {'a': "Job OR master's", 'b': "Job AND master's"},
        'images': room(1593), 'kind': 'photo (her room; tags left / her right pointing at them, 2 of 2)', 'layout': 'words left / her right',
        'board': 'Thumbnails 104 (yt-51 "My Note-Taking System": Copying (red) / Understanding (green) tags beside her; she liked it)',
        'fonts': ['thumbs-09 Inter Tight Black white on red #E2231A (Thumbnails 68)', 'combo-22 Inter Tight Black #010000 on green #21F587 (Design 270)'],
        'colours': 'Thumbnails 68 #E2231A / #FFFFFF · Design 270 #21F587 / #010000 · room dimmed #0C0C0C',
        'thumbnail_text': "Job OR master's (red) / Job AND master's",
        'titles': [T_BOTH, T_MAIN, T_SEARCH], 'title': T_BOTH,
        'direction': 'Copies Thumbnails 104: two tags, the usual choice in red, the answer in green, her pointing at them from the right.'})

# ---------- J: Thumbnails 7 (pin-01-07 fpt.doc "COOK": one huge word behind the head) ----------
def tJ():
    css = ('.t{background:#E9E0CC}.w{top:20px;font:400 400px/1 FSC,sans-serif;color:#CB482E;letter-spacing:.005em;text-transform:uppercase;white-space:nowrap}'
           '.w1{left:30px}.w2{right:30px}.me{left:330px;top:200px;width:620px}')
    html = HEAD.format(css=css) + '<div class="w w1 z2" data-k="a"></div><div class="w w2 z2" data-k="b"></div><img class="cut me z3" data-img="me" data-move="her" alt="">' + TAIL
    put('01-work-study', html, {'recommended': True, 'text': {'a': 'Work', 'b': 'Study'}, 'images': {'me': SH + 'cut-1586c.png'},
        'kind': 'flat, huge words behind her (her in the middle)', 'layout': 'her centre',
        'board': 'Thumbnails 7 (pin-01-07 fpt.doc "COOK": one huge word behind the head)',
        'fonts': ['design-01 Six Caps (red #CB482E on cream #E9E0CC, Design 377)'], 'colours': 'Design 377: #E9E0CC / #CB482E',
        'thumbnail_text': 'WORK | STUDY (huge, either side of her)',
        'titles': [T_MAIN, T_SEARCH, T_FIRST], 'title': T_MAIN,
        'direction': 'Copies Thumbnails 7: two huge words fill the frame behind her, WORK on one side, STUDY on the other; she sits between them, thinking. Six Caps red on cream, as Design 377.'})

# ---------- K: Thumbnails 50 (yt-78 "THINK BIGGER": hand lettering on black + a red line drawing of someone at a computer; no face) ----------
def tK():
    draw = ('<svg viewBox="0 0 520 380" width="540" height="395" fill="none" stroke="#E0333B" stroke-width="7" stroke-linecap="round" stroke-linejoin="round">'
            '<rect x="40" y="40" width="250" height="160" rx="10"/><path d="M20 230h290l-26-30H46z"/>'
            '<path d="M70 80h120M70 108h170M70 136h90M70 164h140" stroke-width="6"/>'
            '<path d="M330 120c40-14 80-14 120 0v170c-40-14-80-14-120 0z"/><path d="M450 120c30-12 50-12 60-6v170c-10-6-30-6-60 6"/>'
            '<path d="M350 160h80M350 190h80M350 220h60" stroke-width="5"/>'
            '</svg>')
    css = ('.t{background:#2A2A2A}.h{left:70px;top:70px;font:400 128px/1.12 FKA,cursive;color:#E0333B;rotate:-4deg;white-space:nowrap}'
           '.h .w{color:#CAC0C1}.dr{right:30px;bottom:14px}')
    html = HEAD.format(css=css) + f'<div class="h z3" data-k="h"></div><div class="dr z2" data-move="drawing">{draw}</div>' + TAIL
    put('11-job-by-day-masters-by-night', html, {'text': {'h': "Job by day.<br><span class=\"w\">Master's by night.</span>"},
        'kind': 'flat, hand lettering + line drawing, no face', 'layout': 'no face',
        'board': 'Thumbnails 50 (yt-78 "Software Isn\'t Dead": THINK BIGGER hand lettering on black + a red line drawing)',
        'fonts': ['design-22 Kaushan Script (red #E0333B + grey #CAC0C1 on #2A2A2A, Design 392)'], 'colours': 'Design 392: #2A2A2A / #E0333B / #CAC0C1',
        'thumbnail_text': "Job by day. Master's by night. (+ a laptop and an open book drawn in red)",
        'titles': [T_DEV, T_MAIN, T_NG], 'title': T_DEV,
        'direction': 'Copies Thumbnails 50: hand lettering on a dark ground, a red line drawing of the two things (a laptop with code, an open book, a clock). Kaushan Script red and grey on charcoal, as Design 392.'})

for f in (tA, tB, tC, tD, tE, tF, tG, tH, tI, tJ, tK): f()
print('\n'.join(OUT))
