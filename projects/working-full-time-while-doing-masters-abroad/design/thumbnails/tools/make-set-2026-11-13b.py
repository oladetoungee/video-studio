#!/usr/bin/env python3
"""working-full-time thumbnails, SET 2026-11-13 ROUND 2 (after the cold critic rejected round 1, best 7).
Fonts ONLY from the font board (inspiration/boards/fonts/), in their source colours; every thumbnail copies a DIFFERENT
thumbnail-board composition ("Thumbnails N" = studio /ideas/boards/thumbnails/ item N); at most 2 "words left / her right";
every photo of her is a different shoot photo with a different crop; no stock photo used twice.
Writes directions/<dir>/index.html + content.json. Keeps "nudge" and edited "text" of an existing content.json unless --force.
Run: python3 tools/make-set-2026-11-13b.py --force && node render.mjs"""
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
def t01():
    css = ('.t{background:#E9E0CC}'
           '.k{top:26px;font:800 58px/1 FIT,sans-serif;color:#CB482E;letter-spacing:-.01em;text-transform:uppercase;white-space:nowrap}.k1{left:40px}.k2{right:40px}'
           '.w{top:84px;font:400 400px/1 FSC,sans-serif;color:#CB482E;letter-spacing:.005em;text-transform:uppercase;white-space:nowrap}.w1{left:30px}.w2{right:30px}'
           '.me{left:255px;top:160px;width:770px}')
    html = HEAD.format(css=css) + ('<div class="k k1 z2" data-k="k1"></div><div class="k k2 z2" data-k="k2"></div>'
        '<div class="w w1 z2" data-k="a"></div><div class="w w2 z2" data-k="b"></div><img class="cut me z3" data-img="me" data-move="her" alt="">') + TAIL
    put('01-full-time-work-full-time-study', html, {'recommended': True, 'text': {'k1': 'Full-time', 'k2': 'Full-time', 'a': 'Work', 'b': 'Study'},
        'images': {'me': SH + 'cut-1586c.png'}, 'kind': 'flat, huge words behind her (her in the middle)', 'layout': 'her centre',
        'board': 'Thumbnails 7 (pin-01-07 fpt.doc "COOK": one huge word behind the head)',
        'fonts': ['pair-04 Six Caps + Inter Tight (red #CB482E on cream #E9E0CC, Design 377)'], 'colours': 'Design 377: #E9E0CC / #CB482E',
        'thumbnail_text': 'FULL-TIME WORK | FULL-TIME STUDY (huge, either side of her)',
        'titles': [T_MAIN, T_SEARCH, T_FIRST], 'title': T_MAIN,
        'direction': 'Copies Thumbnails 7: two huge words fill the frame behind her, FULL-TIME WORK on one side, FULL-TIME STUDY on the other; she sits between them, thinking. Six Caps + Inter Tight red on cream, as Design 377.'})

# ---------- 02: Thumbnails 51 (yt-79 "How I have time for everything with a full time job": her in front of a big week calendar) ----------
def t02():
    cols = [(60, 'Mon', True), (276, 'Tue', False), (812, 'Thu', False), (1028, 'Fri', True)]
    css = ('.t{background:#D9F44F}'
           '.h{left:0;width:1280px;top:24px;text-align:center;font:900 92px/1 FIT,sans-serif;color:#070804;letter-spacing:-.04em;text-transform:uppercase;white-space:nowrap}'
           '.cal{left:36px;top:140px;width:1208px;height:600px;background:#070804;border-radius:22px 22px 0 0}'
           '.cal .d{position:absolute;top:22px;width:192px;text-align:center;font:800 36px/1 FIT,sans-serif;color:#D9F44F;text-transform:uppercase}'
           '.cal .b{position:absolute;width:192px;border-radius:12px;font:800 34px/1 FIT,sans-serif;color:#070804;padding:16px 0 0 16px;text-transform:uppercase}'
           '.cal .w{background:#D9F44F;height:250px;top:76px}.cal .c{background:#FFFFFF;height:150px;top:344px}'
           '.me{left:322px;top:196px;width:636px}')
    cells = ''; text = {'h': "Full-time job + master's"}
    for i, (x, d, cl) in enumerate(cols):
        x -= 36
        cells += f'<div class="d" style="left:{x}px" data-k="d{i}"></div><div class="b w" style="left:{x}px" data-k="w{i}"></div>'
        text[f'd{i}'] = d; text[f'w{i}'] = 'Work'
        if cl: cells += f'<div class="b c" style="left:{x}px" data-k="c{i}"></div>'; text[f'c{i}'] = 'Class'
    html = HEAD.format(css=css) + f'<div class="h z3" data-k="h"></div><div class="cal z2" data-move="calendar">{cells}</div><img class="cut me z4" data-img="me" data-move="her" alt="">' + TAIL
    put('02-week-calendar', html, {'text': text, 'images': {'me': SH + 'cut-1590c.png'},
        'kind': 'flat + her cut-out in the MIDDLE, in front of a generic week calendar', 'layout': 'her centre',
        'board': 'Thumbnails 51 (yt-79 "How I have time for everything with a full time job": her in front of a big week calendar)',
        'fonts': ['design-09 Inter Tight Black (ink #070804 on lime #D9F44F, Design 394)'], 'colours': 'Design 394: #D9F44F / #070804 (+ white blocks)',
        'thumbnail_text': "FULL-TIME JOB + MASTER'S + a week calendar (WORK every day, CLASS some evenings)",
        'titles': [T_WEEK, T_MAIN, T_DEV], 'title': T_WEEK,
        'direction': 'Copies Thumbnails 51: she sits in front of her week; the calendar says it (work blocks, class blocks), whole cards either side of her, one plain line on top. Inter Tight Black ink on lime, as Design 394.'})

# ---------- 03: Thumbnails 81 (yt-28 "ZERO -> DATA SCIENTIST / 6 MONTHS!": two labels joined by an arrow over his head, a tilted tag below) ----------
def t03():
    css = ('.t{--rw:1714px;--rx:-224px;--ry:-300px;--dim:rgba(17,17,17,.42);background:#111111}'
           '.lb{top:40px;background:#2FA8E0;color:#111111;font:700 92px/1 FOS,sans-serif;text-transform:uppercase;padding:10px 24px 16px;letter-spacing:-.005em;white-space:nowrap}'
           '.l1{left:36px;rotate:-2deg}.l2{right:36px;rotate:2deg}'
           '.ar{left:600px;top:28px}'
           '.tag{left:40px;top:560px;background:#111111;color:#2FA8E0;font:700 84px/1 FOS,sans-serif;text-transform:uppercase;padding:10px 26px 16px;rotate:-4deg;white-space:nowrap}')
    arrow = ('<svg width="220" height="80" viewBox="0 0 330 120" fill="none" stroke="#2FA8E0" stroke-width="12" stroke-linecap="round" stroke-linejoin="round">'
             '<path d="M20 90 C 110 10, 220 10, 300 70"/><path d="M262 76 L 304 74 L 296 34"/></svg>')
    html = HEAD.format(css=css) + ROOM + (f'<div class="lb l1 z4" data-k="a"></div><div class="lb l2 z4" data-k="b"></div><div class="ar z4" data-move="arrow">{arrow}</div>'
        '<div class="tag z5" data-k="c"></div>') + TAIL
    put('03-full-time-job-plus-masters-same-time', html, {'text': {'a': 'Full-time job', 'b': "Master's", 'c': 'At the same time'},
        'images': room(1581), 'kind': 'photo (her room, her in the middle, labels round her head)', 'layout': 'her centre',
        'board': 'Thumbnails 81 (yt-28 "How I Became A Data Scientist": ZERO -> DATA SCIENTIST + "6 MONTHS!" tag, him centred)',
        'fonts': ['thumbs-11 Oswald Bold (ink #111111 on blue #2FA8E0, Thumbnails 87)'], 'colours': 'Thumbnails 87: #2FA8E0 / #111111',
        'thumbnail_text': "FULL-TIME JOB -> MASTER'S + AT THE SAME TIME",
        'titles': [T_MAIN, T_SEARCH, T_BOTH], 'title': T_MAIN,
        'direction': 'Copies Thumbnails 81: two labels over her head joined by an arrow, a tilted tag below; she raises a hand in the middle of her room. Oswald ink on blue, as Thumbnails 87.'})

# ---------- 04: Thumbnails 69 (yt-16 "12:30 PM | 7:30 PM": two photos side by side, a time on each; her like) ----------
def t04():
    css = ('.t{background:#0C0C0C}.half{top:0;width:636px;height:720px;overflow:hidden}.h1{left:0}.h2{left:644px}'
           '.half img{position:absolute;display:block}.me1{width:1411px;left:-350px;top:-310px}.ph2{width:1080px;height:720px;left:-300px;top:0;object-fit:cover}'
           '.tm{top:470px;font:700 146px/1 FIT,sans-serif;color:#FFFFFF;background:#CB2D26;padding:8px 28px 18px;letter-spacing:-.045em;white-space:nowrap}'
           '.tm1{left:30px}.tm2{left:674px}'
           '.lb{top:610px;font:700 80px/1 FIT,sans-serif;color:#FFFFFF;background:#0C0C0C;padding:4px 24px 14px;letter-spacing:-.03em;white-space:nowrap}.lb1{left:30px}.lb2{left:674px}')
    html = HEAD.format(css=css) + ('<div class="half h1 z1"><img class="me1" data-img="a" alt=""></div><div class="half h2 z1"><img class="ph2" data-img="b" alt=""></div>'
        '<div class="tm tm1 z3" data-k="t1"></div><div class="tm tm2 z3" data-k="t2"></div><div class="lb lb1 z4" data-k="l1"></div><div class="lb lb2 z4" data-k="l2"></div>') + TAIL
    put('04-9am-job-9pm-masters', html, {'text': {'t1': '9:00', 't2': '21:00', 'l1': 'job', 'l2': "master's"},
        'images': {'a': SH + 'room-1585.jpg', 'b': PX + 'laptop.jpg'}, 'kind': 'split: her (morning) | a desk lamp-lit at night', 'layout': 'split',
        'board': 'Thumbnails 69 (yt-16 "24 Hours of Healthy Student Cooking": 12:30 PM | 7:30 PM, a time on each photo; she liked it)',
        'fonts': ['design-34 Inter Tight Bold (white #FFFFFF on red #CB2D26, Design 373)'], 'colours': 'Design 373: #CB2D26 / #FFFFFF (+ #0C0C0C tags, Design 20)',
        'thumbnail_text': "9:00 job | 21:00 master's",
        'titles': [T_MAIN, T_DEV, T_SEARCH], 'title': T_MAIN,
        'direction': 'Copies Thumbnails 69: the day told by two pictures and two times (her at 9:00 for the job, a lamp-lit desk at 21:00 for the master\'s). Inter Tight Bold white on red, as Design 373. Desk photo: Pexels (film/assets/CREDITS.md).'})

# ---------- 05: Thumbnails 104 (yt-51 "Copying / Understanding": two tags, the wrong one crossed out, her beside them; her like) ----------
def t05():
    css = ('.t{--rw:1512px;--rx:-20px;--ry:-300px;--dim:rgba(12,12,12,.58);background:#0C0C0C}'
           '.tg{font:900 90px/1 FIT,sans-serif;letter-spacing:-.045em;padding:14px 28px 22px;white-space:nowrap}'
           '.t1{left:40px;top:170px;background:#E2231A;color:#FFFFFF;rotate:-2deg}.t1 s{text-decoration-thickness:12px;text-decoration-color:#010000}'
           '.t2{left:40px;top:372px;background:#21F587;color:#010000;rotate:1deg}')
    html = HEAD.format(css=css) + ROOM + '<div class="tg t1 z4" data-k="a"></div><div class="tg t2 z4" data-k="b"></div>' + TAIL
    put('05-job-and-masters-not-or', html, {'text': {'a': "Job <s>or</s> master's", 'b': "Job AND master's"},
        'images': room(1593), 'kind': 'photo (her room; tags left / her right, her hand under the green tag, 2 of 2)', 'layout': 'words left / her right',
        'board': 'Thumbnails 104 (yt-51 "My Note-Taking System": Copying (red) / Understanding (green) tags beside her; she liked it)',
        'fonts': ['thumbs-09 Inter Tight Black white on red #E2231A (Thumbnails 68)', 'combo-22 Inter Tight Black #010000 on green #21F587 (Design 270)'],
        'colours': 'Thumbnails 68 #E2231A / #FFFFFF · Design 270 #21F587 / #010000 · room dimmed #0C0C0C',
        'thumbnail_text': "Job OR master's (OR crossed out, red) / Job AND master's (green)",
        'titles': [T_BOTH, T_MAIN, T_SEARCH], 'title': T_BOTH,
        'direction': 'Copies Thumbnails 104: two tags, "or" crossed out in red, the answer in green right above her open hand; her whole head on the right.'})

# ---------- 06: Thumbnails 121 (yt-68 "STOP WASTING EVENINGS": heavy white caps left, one word in a red box, him right) ----------
def t06():
    css = ('.t{--rw:2016px;--rx:-40px;--ry:-450px;--dim:rgba(34,34,34,.62);background:#222222}'
           '.h{left:50px;top:96px;font:400 138px/1.0 FAN,sans-serif;color:#FFFFFF;text-transform:uppercase;letter-spacing:.005em;white-space:nowrap}'
           '.h .bx{background:#D7262B;padding:0 .12em;display:inline-block;margin-top:14px}')
    html = HEAD.format(css=css) + ROOM + '<div class="h z4" data-k="h"></div>' + TAIL
    put('06-full-time-job-plus-masters', html, {'text': {'h': "Full-time<br>job<br><span class=\"bx\">+ master's</span>"},
        'images': room(1587), 'kind': 'photo (her room, closer, words left / her right, 1 of 2)', 'layout': 'words left / her right',
        'board': 'Thumbnails 121 (yt-68 "7 Things I Did To Stop Wasting My Evenings": STOP WASTING EVENINGS, white caps left + red box, him right)',
        'fonts': ['thumbs-16 Anton + red box (white on #222222, red #D7262B, Thumbnails 113)'], 'colours': 'Thumbnails 113: #222222 / #FFFFFF / #D7262B',
        'thumbnail_text': "FULL-TIME JOB + MASTER'S",
        'titles': [T_FIRST, T_MAIN, T_BOTH], 'title': T_FIRST,
        'direction': 'Copies Thumbnails 121: the claim in heavy white caps on the left, the second half in a red box, her hand in her hair on the right of her dimmed room (closer crop, face untouched).'})

# ---------- 07: Thumbnails 70 (yt-17 "HELPED ME LEARN": the words curve over her head) ----------
def t07():
    css = ('.t{--rw:1613px;--rx:-124px;--ry:-150px;--dim:rgba(43,43,43,.62);background:#2B2B2B}'
           '.arc{left:0;top:0;width:1280px;height:720px}.arc text{font:900 84px FMO,sans-serif;fill:#F6D23A;letter-spacing:.01em;text-transform:uppercase}')
    svg = ('<svg class="arc z4" viewBox="0 0 1280 720"><path id="p" d="M 120 600 A 520 500 0 0 1 1160 600" fill="none"/>'
           '<text text-anchor="middle"><textPath href="#p" startOffset="50%" data-k="a"></textPath></text></svg>')
    html = HEAD.format(css=css).replace('</style>', "@font-face{font-family:'FMO';src:url('../../fonts/Montserrat-Variable.ttf');font-weight:100 900}</style>") + ROOM + svg + TAIL
    put('07-working-while-studying', html, {'text': {'a': 'Working while studying'},
        'images': room(1594), 'kind': 'photo (her room, her in the middle, the words curve over her head)', 'layout': 'her centre',
        'board': 'Thumbnails 70 (yt-17 "HELPED ME LEARN": the words curve over her head)',
        'fonts': ['thumbs-06 Montserrat Black (yellow #F6D23A on #2B2B2B, Thumbnails 58)'], 'colours': 'Thumbnails 58: #2B2B2B / #F6D23A',
        'thumbnail_text': 'WORKING WHILE STUDYING (curved over her head)',
        'titles': [T_BOTH, T_MAIN, T_NG], 'title': T_BOTH,
        'direction': 'Copies Thumbnails 70: the search words arch over her head in heavy yellow caps; she presents with both hands in her dimmed room. Montserrat Black yellow on charcoal, as Thumbnails 58.'})

# ---------- 08: Thumbnails 89 (yt-36 "WHAT IS SPACE COMPLEXITY OF ALGORITHMS": red heavy caps on yellow + the thing drawn right; no face) ----------
def t08():
    css = ('.t{background:#F7F02B}.h{left:0;width:1280px;text-align:center;top:34px;font:400 84px/1.02 FBAB,sans-serif;color:#E2262B;text-transform:uppercase;letter-spacing:-.01em;white-space:nowrap}'
           '.pg{left:204px;top:236px;width:872px;background:#FFFFFF;border-radius:14px;padding:26px;rotate:-1.5deg}'
           '.pg img{width:100%;display:block}.pg .hl{position:absolute;left:108px;top:136px;width:184px;height:52px;background:#F7F02B;mix-blend-mode:multiply}'
           '.src{left:800px;top:484px;font:500 26px/1 FIT,sans-serif;color:#111111}'
           '.big{left:0;width:1280px;text-align:center;top:528px;font:400 132px/1 FBAB,sans-serif;color:#111111;text-transform:uppercase;letter-spacing:-.02em;white-space:nowrap}')
    html = HEAD.format(css=css).replace('</style>', "@font-face{font-family:'FBAB';src:url('../../fonts/ArchivoBlack-Regular.ttf')}</style>") + (
        '<div class="h z3" data-k="h"></div><div class="pg z3" data-move="page"><img data-img="pg" alt=""><div class="hl"></div></div>'
        '<div class="src z3" data-k="src"></div><div class="big z3" data-k="big"></div>') + TAIL
    put('08-can-you-work-while-studying-in-estonia', html, {'text': {'h': 'Can you work while<br>studying in Estonia?', 'big': 'Yes, full time.', 'src': 'Source: studyinestonia.ee'},
        'images': {'pg': SRC + 'sie-not-limited.png'}, 'kind': 'flat + the real page line, no face', 'layout': 'no face',
        'board': 'Thumbnails 89 (yt-36 "WHAT IS SPACE COMPLEXITY OF ALGORITHMS": red heavy caps on yellow + the thing shown right)',
        'fonts': ['thumbs-12 Archivo Black (red #E2262B + ink #111111 on yellow #F7F02B, Thumbnails 89)', 'source credit Inter Tight'], 'colours': 'Thumbnails 89: #F7F02B / #E2262B / #111111',
        'thumbnail_text': 'CAN YOU WORK WHILE STUDYING IN ESTONIA? YES, FULL TIME. + the real Study in Estonia line "Working hours for international students: not limited"',
        'titles': [T_EST, T_SW, T_MAIN], 'title': T_EST,
        'direction': 'Copies Thumbnails 89: the question in red heavy caps on yellow, the answer in black, the real line from studyinestonia.ee ("Working hours for international students: not limited") on a white card, credited.'})

# ---------- 09: Thumbnails 124 (yt-71 "the art of offline living": three real photos side by side, one lowercase line on top) ----------
def t09():
    css = ('.t{background:#3A3632}.p{top:118px;height:602px;object-fit:cover;display:block}.pa{left:0;width:420px}.pb{left:430px;width:420px}.pc{left:860px;width:420px}'
           '.band{left:0;top:0;width:1280px;height:118px;background:#3A3632}'
           '.h{left:0;width:1280px;top:22px;text-align:center;font:700 70px/1 FPO,sans-serif;color:#FFFFFF;letter-spacing:-.035em;white-space:nowrap}'
           '.wa{left:0;top:118px;width:420px;height:602px;overflow:hidden}.wa img{position:absolute;width:1300px;left:-388px;top:-250px}')
    html = HEAD.format(css=css) + ('<div class="wa z1"><img data-img="a" alt=""></div><img class="p pb z1" data-img="b" alt=""><img class="p pc z1" data-img="c" alt="">'
        '<div class="band z2"></div><div class="h z3" data-k="h"></div>') + TAIL
    put('09-job-and-masters-in-estonia', html, {'text': {'h': "a full-time job + master's in Estonia"},
        'images': {'a': SH + 'room-1589.jpg', 'b': PX + 'tallinn.jpg', 'c': PX + 'mealprep.jpg'},
        'kind': 'collage of 3 real photos (her, Tallinn, meal prep) + one line', 'layout': 'collage',
        'board': 'Thumbnails 124 (yt-71 "the art of offline living": three real photos side by side, one lowercase line)',
        'fonts': ['thumbs-14 Poppins Bold lowercase (white on #3A3632, Thumbnails 96)'], 'colours': 'Thumbnails 96: #3A3632 / #FFFFFF',
        'thumbnail_text': "a full-time job + master's in Estonia (her, Tallinn, meal prep)",
        'titles': [T_SW, T_DEV, T_NG], 'title': T_SW,
        'direction': 'Copies Thumbnails 124: three real photos of the life (her at home, Tallinn old town, the week\'s meal prep) and one plain lowercase line. Photos: her shoot + Pexels (film/assets/CREDITS.md).'})

# ---------- 10: Thumbnails 128 (viral-2 "Everything done by 2pm.": a checklist + one serif line; no face) ----------
def t10():
    tick = '<svg viewBox="0 0 40 40" width="74" height="74" style="flex:none"><rect x="2" y="2" width="36" height="36" rx="4" fill="none" stroke="#111111" stroke-width="3"/><path d="M9 21l8 8 15-18" stroke="#111111" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    css = ('.t{background:#E8E7E5}'
           '.clip{left:60px;top:84px;width:600px;height:600px;background:#FFFFFF;border-radius:18px;padding:96px 46px 0}'
           '.clip .top{position:absolute;left:200px;top:-26px;width:200px;height:66px;background:#555555;border-radius:12px}'
           '.row{display:flex;gap:26px;align-items:center;font:700 62px/1 FLB,serif;color:#111111;letter-spacing:-.035em;padding:30px 0;border-bottom:3px solid #E8E7E5;white-space:nowrap}'
           '.q{left:712px;top:190px;width:560px;font:700 128px/1.0 FLB,serif;color:#111111;letter-spacing:-.05em}')
    rows = ''.join(f'<div class="row">{tick}<span data-k="r{i}"></span></div>' for i in range(3))
    html = HEAD.format(css=css) + f'<div class="clip z2" data-move="list"><div class="top"></div>{rows}</div><div class="q z3" data-k="q"></div>' + TAIL
    put('10-job-and-masters-checklist', html, {'text': {'r0': 'Full-time job', 'r1': 'Evening class', 'r2': 'Assignment', 'q': 'Both,<br>full time.'},
        'kind': 'flat object (a checklist), no face', 'layout': 'no face',
        'board': 'Thumbnails 128 (viral-2 "Everything done by 2pm.": a clipboard checklist + one serif line, no face)',
        'fonts': ['pair-05 Libre Baskerville Bold (#111111 on #E8E7E5, Design 399)'], 'colours': 'Design 399: #E8E7E5 / #111111 / #555555',
        'thumbnail_text': 'Full-time job / Evening class / Assignment (all ticked) + Both, full time.',
        'titles': [T_MAIN, T_WEEK, T_BOTH], 'title': T_MAIN,
        'direction': 'Copies Thumbnails 128: the result as one flat object (a day where the job, the class and the assignment are all ticked) and one big serif line. Libre Baskerville ink on light grey, as Design 399.'})

for f in (t01, t02, t03, t04, t05, t06, t07, t08, t09, t10): f()
print('\n'.join(OUT))
