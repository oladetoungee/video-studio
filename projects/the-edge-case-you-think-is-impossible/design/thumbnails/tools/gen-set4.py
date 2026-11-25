#!/usr/bin/env python3
"""Edge cases thumbnails SET 4 (2026-11-13, FULL-KIT-BRIEF-2026-11-12): fonts ONLY from the font board, with their source colours;
each thumbnail copies a DIFFERENT thumbnail-board composition ("Thumbnails N" = studio /ideas/boards/thumbnails/); max 2 "words left /
her right". 01 = her favourite (set 3's 09 TESTING | REAL USERS) with her edits kept: only its fonts / colours moved to font-board ones.
Writes directions/<dir>/index.html + content.json (keeps "nudge" + edited "text" of an existing content.json unless --force).
Run: python3 tools/gen-set4.py && node render.mjs"""
import json, os, sys
HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__))); D = os.path.join(HERE, 'directions')
FORCE = '--force' in sys.argv
SH = '../../assets/shoot/'
HEAD = '<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../../lib/fb.css"><style>{css}</style></head><body><div class="t">'
TAIL = '</div><script src="../../lib/bind.js"></script></body></html>'
ROOM = '<img class="room z1" data-img="room" alt=""><div class="dim z2"></div><img class="room z3" data-img="me" alt="">'
def room(n): return {'room': SH + f'room3-{n}.jpg', 'me': SH + f'me3-{n}.png'}
CHECK = '<svg viewBox="0 0 40 40" width="{s}" height="{s}"><circle cx="20" cy="20" r="19" fill="{bg}"/><path d="M11 20.5l6 6 12-13" stroke="{fg}" stroke-width="4.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>'
CROSS = '<svg viewBox="0 0 40 40" width="{s}" height="{s}"><circle cx="20" cy="20" r="19" fill="{bg}"/><path d="M13 13l14 14M27 13L13 27" stroke="{fg}" stroke-width="4.6" stroke-linecap="round"/></svg>'
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

# ---------- 01: her favourite (set 3's 09), composition + her edits kept; fonts / colours -> font board ----------
def t01():
    src = os.path.join(D, '09-testing-vs-real-users'); dst = '01-testing-vs-real-users'
    old = json.load(open(os.path.join(src if os.path.exists(src) else os.path.join(D, dst), 'content.json')))
    html = open(os.path.join(src if os.path.exists(src) else os.path.join(D, dst), 'index.html')).read()
    html = html.replace('<link rel="stylesheet" href="../../lib/field.css">', '<link rel="stylesheet" href="../../lib/field.css"><link rel="stylesheet" href="../../lib/fb.css">')
    html = html.replace('background:#22E08A', 'background:#21F587').replace('.R{position:absolute;left:640px;top:0;width:640px;height:720px;background:#111114}', '.R{position:absolute;left:640px;top:0;width:640px;height:720px;background:#0C0C0C}')
    html = html.replace('color:#111114}.rt', 'color:#010000}.rt').replace('.rt .y{color:#FF4713}', '.rt .y{color:#D92A11}')
    html = html.replace('class="L z1 pat-lines"', 'class="L z1"').replace('class="R z1 pat-lines-w"', 'class="R z1"')
    old.update({'fonts': ['combo-22 Inter Tight Black (ink #010000 on green #21F587, Design 270)', 'pair-03 Inter Tight (white on #0C0C0C, red #D92A11, Design 20)'],
                'colours': 'left Design 270 (#21F587 / #010000), right Design 20 (#0C0C0C / #FFFFFF / #D92A11)',
                'board': 'Thumbnails 55 (yt-02 before | after) / Thumbnails 66 (yt-13 Before | After)', 'recommended': True})
    p = os.path.join(D, dst); os.makedirs(p, exist_ok=True)
    open(os.path.join(p, 'index.html'), 'w').write(html); json.dump(old, open(os.path.join(p, 'content.json'), 'w'), indent=2, ensure_ascii=False); OUT.append(dst)

# ---------- 02: Thumbnails 82 (yt-29: two address-bar pills, wrong one crossed, right one ticked, him pointing at them) ----------
def t02():
    css = ('.t{background:#E99A3F}.h{left:58px;top:34px;font:900 168px/.86 FBBig,sans-serif;color:#000;text-transform:uppercase;letter-spacing:-.005em}'
           '.p{left:62px;display:flex;align-items:center;gap:22px;background:#000;color:#E99A3F;border-radius:16px;padding:16px 26px 16px 30px;font:800 66px/1 FBBig,sans-serif;text-transform:uppercase;white-space:nowrap}'
           '.p1{top:372px}.p2{top:478px}.me{right:-20px;height:590px}')
    html = HEAD.format(css=css) + ('<div class="h z3" data-k="h"></div>'
        f'<div class="p p1 z4" data-move="p1"><span data-k="a"></span>{CHECK.format(s=60, bg="#E99A3F", fg="#000")}</div>'
        f'<div class="p p2 z4" data-move="p2"><span data-k="b"></span>{CROSS.format(s=60, bg="#E99A3F", fg="#000")}</div>'
        '<img class="cut me z2" data-img="me" data-move="her" alt="">') + TAIL
    put('02-clicked-twice', html, {'text': {'h': 'Clicked<br>twice?', 'a': '1 click = 1 order', 'b': '2 clicks = paid twice'},
        'images': {'me': SH + 'cut-1593.png'}, 'kind': 'flat + her cut-out (the only words left / her right in the set)',
        'board': 'Thumbnails 82 (yt-29: two pills, one crossed, one ticked, him pointing)', 'fonts': ['design-02 Big Shoulders Display 900 (Design 397)'],
        'colours': 'Design 397 / combo-07: ground #E99A3F, ink #000000', 'thumbnail_text': 'CLICKED TWICE? + 1 click = 1 order (tick) / 2 clicks = paid twice (cross)', 'scores': 'cold critic r4: 8 alone / 8.5 with title',
        'titles': ['Why Users Get Charged Twice (Edge Cases Explained)', 'Edge Cases: Why Code That Passes Tests Still Breaks'],
        'title': 'Why Users Get Charged Twice (Edge Cases Explained)',
        'direction': 'Copies Thumbnails 82: the picture is the comparison (one click, one order ticked; two clicks, two orders crossed), she points at it from the right. Big Shoulders black on orange, as Design 397.'})

# ---------- 03: Thumbnails 89 (yt-36: WHAT IS SPACE COMPLEXITY, red heavy caps on yellow, line drawings right; no face) ----------
def t03():
    css = ('.t{background:#F7F02B}.h{left:56px;top:40px;font:400 150px/.98 FBAB,sans-serif;color:#E2262B;text-transform:uppercase;letter-spacing:-.01em}'
           '.n{right:70px;top:-60px;font:400 760px/1 FBAB,sans-serif;color:#111111;letter-spacing:-.04em}')
    html = HEAD.format(css=css) + '<div class="h z3" data-k="h"></div><div class="n z3" data-k="n"></div>' + TAIL
    put('03-bugs-your-tests-miss', html, {'text': {'h': 'Bugs<br>your<br>tests<br>miss', 'n': '8'},
        'kind': 'flat, no face', 'board': 'Thumbnails 89 (yt-36: WHAT IS SPACE COMPLEXITY, red heavy caps on yellow + drawings right)',
        'fonts': ['thumbs-12 Archivo Black (red #E2262B on yellow #F7F02B, Thumbnails 89)'], 'colours': 'Thumbnails 89: #F7F02B / #E2262B (+ #111111 for the list)',
        'thumbnail_text': 'BUGS YOUR TESTS MISS + a giant 8',
        'titles': ['Edge Cases: 8 Bugs Your Tests Will Miss', 'What Is an Edge Case? 8 Real Bugs Explained', 'Edge Cases: Why Code That Passes Tests Still Breaks'],
        'title': 'Edge Cases: 8 Bugs Your Tests Will Miss',
        'direction': 'Copies Thumbnails 89 (same font, same red on yellow): the claim stacked left, a test list right where everything passes except the one thing real users do.'})

# ---------- 04: Thumbnails 84 (yt-31: you're wasting your 20s, white lowercase + one red word left, him right in a dim room) ----------
def t04():
    css = ('.t{--rw:2000px;--rx:80px;--ry:-330px;--dim:rgba(42,37,34,.82);background:#2A2522}'
           '.h{left:50px;top:170px;font:700 106px/1.0 FBPop,sans-serif;color:#FFFFFF;letter-spacing:-.025em;text-shadow:0 4px 30px rgba(0,0,0,.45)}.h .r{color:#E5342B}')
    html = HEAD.format(css=css) + ROOM + '<div class="h z4" data-k="h"></div>' + TAIL
    put('04-tests-pass-app-breaks', html, {'text': {'h': 'tests pass.<br>app <span class="r">breaks.</span>'},
        'images': room(1594), 'kind': 'photo (her room dimmed; words left / her right, 2 of 2)',
        'board': 'Thumbnails 84 (yt-31: you\'re wasting your 20s)', 'fonts': ['thumbs-10 Poppins Bold (white + red #E5342B on #2A2522, Thumbnails 84)'],
        'colours': 'Thumbnails 84: #2A2522 / #FFFFFF / #E5342B', 'thumbnail_text': 'your tests pass. your app breaks.',
        'titles': ['Edge Cases: Why Code That Passes Tests Still Breaks', 'Why Your App Breaks When Real Users Arrive (Edge Cases)'],
        'title': 'Edge Cases: Why Code That Passes Tests Still Breaks',
        'direction': 'Copies Thumbnails 84: four short lowercase lines left, one word in red, her presenting it from the right in her real room (dimmed, face untouched).'})

# ---------- 05: Thumbnails 101 (yt-48: Do THIS After Work / Transform Your Life, one line on top, one at the foot, her in the middle) ----------
def t05():
    css = ('.t{--rw:2300px;--rx:-1000px;--ry:-550px;--dim:rgba(58,61,58,.6);background:#3A3D3A}'
           '.a,.b{left:0;width:1280px;text-align:center;font:800 80px/1 FBMon,sans-serif;text-transform:uppercase;letter-spacing:-.01em;white-space:nowrap}'
           '.a{top:12px;color:#FFFFFF}.b{top:632px;color:#F6C343}.top,.foot{left:0;width:1280px;background:#3A3D3A}.top{top:0;height:96px}.foot{top:624px;height:96px}')
    html = HEAD.format(css=css) + ROOM + '<div class="top z4"></div><div class="foot z4"></div><div class="a z5" data-k="a"></div><div class="b z5" data-k="b"></div>' + TAIL
    put('03-passed-tests-still-broken', html, {'text': {'a': 'Passed all tests', 'b': 'Still broken'}, 'images': room(1591),
        'kind': 'photo (her centred between a top line and a foot line)', 'board': 'Thumbnails 101 (yt-48: Do THIS After Work / Transform Your Life)',
        'fonts': ['thumbs-18 Montserrat ExtraBold (white + yellow #F6C343 on #3A3D3A, Thumbnails 162)'], 'colours': 'Thumbnails 162: #3A3D3A / #FFFFFF / #F6C343',
        'thumbnail_text': 'PASSED ALL TESTS / STILL BROKEN', 'scores': 'cold critic r5: 7 / 7.5, then recropped to one pointing hand (not re-scored)', 'titles': ['Your Code Passed Every Test. Why Is It Still Broken? (Edge Cases)', 'Why Code That Passes Tests Still Breaks (Edge Cases)'],
        'title': 'Your Code Passed Every Test. Why Is It Still Broken? (Edge Cases)',
        'direction': 'Copies Thumbnails 101: the setup on top, the punchline at the foot in yellow, she points in the middle of her room with a sceptical look (1591).'})

# ---------- 06: Thumbnails 47 (yt-75 flowstate.: one object centred on black, one line under it; no face) ----------
def t06():
    css = ('.t{background:#000000}.cal{left:409px;top:26px;width:462px;height:470px;background:#FFFFFF;border-radius:28px;overflow:hidden;box-shadow:0 30px 80px rgba(42,31,243,.0)}'
           '.cal .m{height:120px;background:#2A1FF3;color:#FFFFFF;font:700 58px/120px FBSw,sans-serif;text-align:center;letter-spacing:.06em;text-transform:uppercase}'
           '.cal .d{font:700 250px/320px FBSw,sans-serif;color:#000;text-align:center;letter-spacing:-.04em}'
           '.w{left:0;width:1280px;top:510px;text-align:center;font:600 112px/1 FBSw,sans-serif;color:#A5A3B0;letter-spacing:-.03em;white-space:nowrap}.w .b{color:#2A1FF3}')
    html = HEAD.format(css=css) + '<div class="cal z3" data-move="calendar"><div class="m" data-k="m"></div><div class="d" data-k="d"></div></div><div class="w z3" data-k="w"></div>' + TAIL
    put('04-the-leap-year-bug', html, {'text': {'m': 'February', 'd': '29', 'w': 'the <span class="b">leap year</span> bug.'},
        'kind': 'object on black, no face', 'board': 'Thumbnails 47 (yt-75 flowstate.: one object centred on black, one line under it)',
        'fonts': ['design-13 Switzer (grey #A5A3B0 + blue #2A1FF3 on #000000, Design 350)'], 'colours': 'Design 350 / combo-12: #000000 / #A5A3B0 / #2A1FF3',
        'thumbnail_text': 'the leap year bug. + a calendar page: February 29', 'scores': 'cold critic r4: 7.5 alone / 8 with title',
        'titles': ['The Leap Year Bug and 7 Other Edge Cases That Break Apps', 'Edge Cases: 8 Real Bugs That Broke Apps'],
        'title': 'The Leap Year Bug and 7 Other Edge Cases That Break Apps',
        'direction': 'Copies Thumbnails 47: one object in the middle of black (a calendar page on 29 February) and one line under it naming the bug people search for.'})

# ---------- 07: Thumbnails 63 (yt-10: SAVE 4 HOURS A DAY, heading across the top, him beside a hand-drawn tick / cross grid) ----------
def t07():
    css = ('.t{background:#0D24C5}.h{left:470px;top:36px;font:400 92px/1 FBPM,sans-serif;color:#E8EAF4;white-space:nowrap}'
           '.g{left:540px;top:190px;width:690px;color:#E8EAF4;font:400 70px/1 FBPM,sans-serif}.gr .m i{display:inline-block;width:62px;height:62px;border:6px solid #E8EAF4;border-radius:8px;font:400 58px/50px FBPM,sans-serif;font-style:normal;text-align:center}'
           '.gr{display:flex;justify-content:space-between;align-items:center;padding:30px 10px 26px;border-bottom:4px solid #E8EAF4}'
           '.gr:first-child{border-top:4px solid #E8EAF4}.gr .m{font-size:52px;width:70px;text-align:center}.me{left:-85px;height:580px}')
    rows = ''.join(f'<div class="gr"><span data-k="r{i}"></span><span class="m"><i></i></span></div>' for i in range(3))
    html = HEAD.format(css=css) + f'<div class="h z3" data-k="h"></div><div class="g z3" data-move="grid">{rows}</div><img class="cut me z2" data-img="me" data-move="her" alt="">' + TAIL
    put('05-test-these-before-you-ship', html, {'text': {'h': 'Test these first', 'r0': 'Double click', 'r1': 'Two tabs open', 'r2': '29 February'},
        'images': {'me': SH + 'cut-1586.png'}, 'kind': 'flat + her cut-out on the LEFT, hand-drawn list',
        'board': 'Thumbnails 63 (yt-10: SAVE 4 HOURS A DAY, heading on top, him beside a hand-drawn tick / cross table)',
        'fonts': ['design-20 Permanent Marker (#E8EAF4 on blue #0D24C5, Design 363)'], 'colours': 'Design 363: #0D24C5 / #E8EAF4',
        'thumbnail_text': 'TEST THESE FIRST + Double click, Two tabs open, 29 February (empty boxes)', 'scores': 'cold critic r5: 8 alone / 8.5 with title',
        'titles': ['Edge Cases Every Developer Should Test Before Shipping', 'What Is an Edge Case? 8 Real Examples'],
        'title': 'Edge Cases Every Developer Should Test Before Shipping',
        'direction': 'Copies Thumbnails 63: a marker heading across the top and a hand-drawn list of the cases nobody tests, she thinks it over from the left. Permanent Marker pale on blue, as Design 363.'})

# ---------- 08: Thumbnails 117 (yt-64: her in the middle, app icons floating round her head, lowercase line at the foot) ----------
def t08():
    css = ('.t{--rw:1700px;--rx:-210px;--ry:-410px;--dim:rgba(17,17,17,.7);background:#111111}'
           '.h{left:0;width:1280px;top:592px;text-align:center;font:800 90px/1 FBIT,sans-serif;color:#FFFFFF;letter-spacing:-.035em;white-space:nowrap}'
           '.h .bx{background:#E2231A;padding:0 .12em .04em;display:inline-block}.band{left:0;width:1280px;top:560px;height:160px;background:#111111}'
           '.c{background:#FFFFFF;border-radius:16px;padding:14px 18px;display:flex;gap:12px;align-items:center;font:700 56px/1 FS,sans-serif;color:#111;box-shadow:0 16px 36px rgba(0,0,0,.45);white-space:nowrap}'
           '.c1{left:24px;top:120px;rotate:-5deg;font-size:44px}.c2{left:870px;top:300px;rotate:4deg}.c3{left:110px;top:330px;rotate:3deg}.c4{left:930px;top:320px;rotate:-4deg}')
    ic = '<svg width="58" height="58" viewBox="0 0 40 40" style="flex:none"><circle cx="20" cy="20" r="19" fill="#E5322D"/><rect x="18" y="9" width="4" height="15" rx="2" fill="#fff"/><circle cx="20" cy="30" r="2.6" fill="#fff"/></svg>'
    cards = ''.join(f'<div class="c c{i} z4" data-move="c{i}">{ic}<span data-k="c{i}"></span></div>' for i in range(1, 3))
    html = HEAD.format(css=css) + ROOM + cards + '<div class="band z4"></div><div class="h z5" data-k="h"></div>' + TAIL
    put('06-your-app-will-break', html, {'text': {'h': 'your app will <span class="bx">break.</span>', 'c1': 'O\'Brien: invalid name', 'c2': 'Sold twice'},
        'images': room(1580), 'kind': 'collage over her room (her centred)', 'board': 'Thumbnails 117 (yt-64: you\'re in a war., icons round his head, line at the foot)',
        'fonts': ['thumbs-09 Inter Tight ExtraBold lowercase + red box (white on #111111, #E2231A, Thumbnails 68)'], 'colours': 'Thumbnails 68: #111111 / #FFFFFF / #E2231A',
        'thumbnail_text': 'your app will break. + two error cards beside her (O\'Brien: invalid name, Sold twice)', 'scores': 'cold critic r5: 8 alone / 8.5 with title',
        'titles': ['Edge Cases in Software: Why Your App Will Break', 'Edge Cases Developers Miss: 8 Real Bugs That Broke Apps'],
        'title': 'Edge Cases in Software: Why Your App Will Break',
        'direction': 'Copies Thumbnails 117: she thinks in the middle of her dimmed room, the errors real users cause float round her head, one lowercase line at the foot with the red box.'})

# ---------- 09: Thumbnails 97 (yt-44: a white post card with big black words, the person beside it) ----------
def t09():
    css = ('.t{--rw:2090px;--rx:-740px;--ry:-370px;--dim:rgba(12,12,12,.55);background:#0C0C0C}'
           '.card{left:530px;top:210px;width:660px;background:#F5F5F4;border-radius:26px;padding:34px 40px 36px;box-shadow:0 26px 60px rgba(0,0,0,.5);color:#030502}'
           '.who{display:flex;align-items:center;gap:16px;font:700 28px/1.1 FBIT,sans-serif}.who i{width:58px;height:58px;border-radius:50%;background:#030502;display:block}'
           '.who small{display:block;font:500 22px/1.1 FBIT,sans-serif;color:#6B6B70}'
           '.chip{left:600px;top:470px;background:#F5F5F4;border-radius:18px;padding:16px 24px;display:flex;gap:14px;align-items:center;font:700 48px/1 FS,sans-serif;color:#030502;box-shadow:0 20px 44px rgba(0,0,0,.5);white-space:nowrap;rotate:-2deg}'
           '.big{margin-top:0;font:900 104px/.92 FBIT,sans-serif;letter-spacing:-.045em;text-transform:uppercase}'
           '.meta{margin-top:24px;font:500 24px/1 FBIT,sans-serif;color:#6B6B70}')
    html = HEAD.format(css=css) + ROOM + ('<div class="card z4" data-move="card"><div class="big" data-k="big"></div></div><div class="chip z5" data-move="chip" style="display:none"><svg width="52" height="52" viewBox="0 0 40 40"><circle cx="20" cy="20" r="19" fill="#E5322D"/><rect x="18" y="9" width="4" height="15" rx="2" fill="#fff"/><circle cx="20" cy="30" r="2.6" fill="#fff"/></svg><span data-k="chip"></span></div>') + TAIL
    put('07-it-worked-in-testing', html, {'text': {'big': 'It worked in testing.', 'chip': 'Crashed at 3:30 a.m.'},
        'images': room(1588), 'kind': 'photo + a post card (her on the LEFT, card right)', 'board': 'Thumbnails 97 (yt-44: QUIT DATA NOW post card beside her)',
        'fonts': ['design-10 Inter Tight Black (#030502 on #F5F5F4, Design 378)'], 'colours': 'Design 378: card #F5F5F4 / ink #030502',
        'thumbnail_text': 'IT WORKED IN TESTING. (a card)', 'scores': 'cold critic r5: 7.5 / 8.5 (then a closed-mouth photo, 1588; not re-scored)',
        'titles': ['It Worked in Testing: Edge Cases That Break Real Apps', 'Edge Cases: Why Code That Passes Tests Still Breaks'],
        'title': 'It Worked in Testing: Edge Cases That Break Real Apps',
        'direction': 'Copies Thumbnails 97: a post card with one big black line beside the person; here she shrugs on the left of her dimmed room, the card on the right. Generic card (no platform).'})

# ---------- 10: Thumbnails 48 (yt-76: "Write to Understand Your Life", her photo left, big white serif quote right-aligned on dark) ----------
def t10():
    css = ('.t{--rw:1900px;--rx:-470px;--ry:-360px;--dim:rgba(45,43,42,.12);background:#2D2B2A}'
           '.side{left:600px;top:0;width:680px;height:720px;background:#2D2B2A}'
           '.toast{right:56px;top:470px;background:#FFFFFF;border-radius:16px;padding:16px 22px;display:flex;gap:14px;align-items:center;font:700 52px/1 FS,sans-serif;color:#111;white-space:nowrap}'
           '.q{right:56px;top:70px;text-align:right;font:400 114px/1.04 FBLib,serif;color:#FFFFFF;letter-spacing:-.02em;white-space:nowrap}.q b{font-weight:700}')
    html = HEAD.format(css=css) + ROOM + '<div class="side z4"></div><div class="q z5" data-k="q"></div><div class="toast z5" data-move="toast"><svg width="44" height="44" viewBox="0 0 40 40"><circle cx="20" cy="20" r="19" fill="#E5322D"/><rect x="18" y="9" width="4" height="15" rx="2" fill="#fff"/><circle cx="20" cy="30" r="2.6" fill="#fff"/></svg><span data-k="toast"></span></div>' + TAIL
    put('08-that-will-never-happen', html, {'text': {'q': '“That will<br><b>never</b><br>happen.”', 'toast': 'New bug report'}, 'images': room(1589),
        'kind': 'photo left + serif quote right', 'board': 'Thumbnails 48 (yt-76: "Write to Understand Your Life", photo left, white serif right)',
        'fonts': ['thumbs-05 Libre Baskerville Regular + Bold (white on #2D2B2A, Thumbnails 48)'], 'colours': 'Thumbnails 48: #2D2B2A / #FFFFFF',
        'thumbnail_text': '“That will never happen.”', 'scores': 'cold critic r5: 7.5 / 8.5 (then the stray hand cropped out; not re-scored)',
        'titles': ['Your Users Will Find the Bug You Said Was Impossible', 'Edge Cases in Software: 8 Times “Never” Happened'],
        'title': 'Your Users Will Find the Bug You Said Was Impossible',
        'direction': 'Copies Thumbnails 48: her photo on the left, the line every developer says set big in a white serif on the dark right half, "never" in bold.'})

for f in (t01, t02, t05, t06, t07, t08, t09, t10): f()
json.dump(OUT, open(os.path.join(D, 'index.json'), 'w'))
print('\n'.join(OUT))
