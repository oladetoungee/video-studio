#!/usr/bin/env python3
"""Cookies thumbnail set of 2026-11-13 (projects/FULL-KIT-BRIEF-2026-11-12.md): 11 directions, each copying one named
thumbnail-board item (inspiration/boards/thumbnails, "Thumbnails N" = item N of board.json), fonts only from the font board
(inspiration/boards/fonts, "Font N" = item N) in the specimen's own text + ground colours.
OVERWRITES content.json + index.html (keeps "scores" and her "nudge"): only to rebuild.
   python3 tools/make-set-2026-11-13.py [prefix ...]"""
import json, os, sys
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
D = os.path.join(ROOT, 'directions')
S = '../../assets/shoot/'
PX = '../../assets/pexels/'
CL = '../../assets/collage/'

def page(css, body):
    return ('<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../../lib/set.css"><style>\n'
            + css.strip() + '\n</style></head><body><div class="t">\n' + body.strip()
            + '\n</div><script src="../../lib/bind.js"></script></body></html>\n')

def photo(n, dim=True):
    return (f'<div class="pf z1"><img class="room" data-img="room" src="{S}{n}.jpg" alt="">'
            + ('<div class="dim"></div>' if dim else '') + '</div>'
            + f'<img class="me" data-img="me" src="{S}{n}-person.png" alt="">')

SET = []
T_MAIN = 'localStorage vs sessionStorage vs Cookies (What Goes Where)'

# 01 -------------------------------------------------------------------------------------------------------------------
SET.append(dict(
 name='01-cart-still-here', kind='photo', recommended=True,
 board='Thumbnails 48 (yt-76 "Write to Understand Your Life": the person large on the left in a real photo, a calm serif line in quotes on the dark right half)',
 fonts='Font 60 (thumbs-05: Libre Baskerville Regular + Bold, white on #2D2B2A)',
 colours='Font 60 specimen: words #FFFFFF on #2D2B2A (the right of her room darkened to it)',
 thumbnail_text='"Why is my cart still here?"',
 direction='Her real room (shoot 1563, hand on her chin, curious), she large on the left in natural colour; the right half is a flat dark panel (#2D2B2A) she sits in front of, and carries one white serif question in quotes, the one everyone has asked after closing a shop and coming back.',
 titles=['localStorage Explained: Why Your Cart Is Still There',
         T_MAIN,
         'How Websites Remember Your Cart (localStorage vs Cookies)'],
 text={'hd': '&ldquo;Why is my<br>cart <b>still</b><br>here?&rdquo;'},
 images={'room': S + '1563.jpg', 'me': S + '1563-person.png'},
 vars={'--pw': '1500px', '--pl': '-470px', '--pt': '-240px', '--dim': 'rgba(0,0,0,0)', '--ground': '#2D2B2A'},
 css='''
.shade{position:absolute;left:600px;right:0;top:0;bottom:0;z-index:2;background:#2D2B2A}
.hd{right:60px;top:110px;text-align:right;font-family:'Libre Baskerville';font-weight:400;font-size:118px;line-height:1.04;letter-spacing:-.025em;color:#FFFFFF;z-index:4}
.hd b{font-weight:700}
''',
 body=photo('1563', dim=False) + '''
<div class="shade"></div>
<div class="a hd nw" data-k="hd"></div>'''))

# 02 -------------------------------------------------------------------------------------------------------------------
SET.append(dict(
 name='02-cookies-localstorage-sessionstorage', kind='photo', recommended=False,
 board='Thumbnails 121 (yt-68 "STOP WASTING EVENINGS": three words stacked in tight boxes on the left, the middle box red, the creator in his real room on the right)',
 fonts='Font 56 (thumbs-01: Anton + red box, white on #1A1A1A, box #D9262B)',
 colours='Font 56 specimen: words #FFFFFF, boxes #1A1A1A and #D9262B, over her room dimmed',
 thumbnail_text='COOKIES / LOCALSTORAGE / SESSIONSTORAGE',
 direction='Her real room (shoot 1549, straight look), dimmed so the boxes read; the three names people search for stacked in Anton boxes on the left, LOCALSTORAGE in red. The title asks which one to use.',
 titles=['Cookies vs localStorage vs sessionStorage: Which One to Use?',
         T_MAIN,
         'Where Websites Store Your Data (Cookies, localStorage, sessionStorage)'],
 text={'w1': 'COOKIES', 'w2': 'LOCALSTORAGE', 'w3': 'SESSIONSTORAGE'},
 images={'room': S + '1549.jpg', 'me': S + '1549-person.png'},
 vars={'--pw': '1560px', '--pl': '0px', '--pt': '-200px', '--dim': 'rgba(10,10,10,.45)'},
 css='''
.w{position:absolute;left:44px;font-family:'Anton';font-size:86px;line-height:1;letter-spacing:.005em;color:#FFFFFF;background:#1A1A1A;padding:12px 24px 10px;z-index:5}
.w1{top:170px}.w2{top:286px;background:#D9262B}.w3{top:402px}
''',
 body=photo('1549') + '''
<div class="w w1 nw" data-k="w1"></div><div class="w w2 nw" data-k="w2"></div><div class="w w3 nw" data-k="w3"></div>'''))

# 03 -------------------------------------------------------------------------------------------------------------------
SET.append(dict(
 name='03-localstorage-isnt-private', kind='cut-out', recommended=False,
 board='Thumbnails 31 (pin-03-02 "no one cares.": pale grey ground, two lines of black lowercase sans on the left, the speaker large on the right)',
 fonts='Font 58 (thumbs-03: Inter Tight Medium, #111111 on #E9E7E3, the type of Thumbnails 31 itself)',
 colours='Font 58 specimen: words #111111 on #E9E7E3',
 thumbnail_text='localStorage isn\'t private.',
 direction='Pale grey ground, her cut-out large on the right (shoot 1554, hand on her chin, unconvinced). Two lines of calm black lowercase on the left: "localStorage isn\'t private." A claim developers search for, without a picture of code.',
 titles=['Is localStorage Safe? Who Can Read Your Data',
         'localStorage vs Cookies: Which Is More Secure?',
         T_MAIN],
 text={'hd': 'localStorage<br>isn&rsquo;t private.'},
 images={'cut': S + '1554-cut.png'},
 vars={'--ground': '#E9E7E3'},
 css='''
.hd{left:56px;top:210px;font-family:'Inter Tight';font-weight:500;font-size:124px;line-height:.98;letter-spacing:-.06em;color:#111111}
.cut{right:-150px;width:820px;bottom:-60px}
''',
 body='''
<img class="cut z2" data-img="cut" data-move="cut" src="../../assets/shoot/1554-cut.png" alt="">
<div class="a hd z4 nw" data-k="hd"></div>'''))

# 04 -------------------------------------------------------------------------------------------------------------------
SET.append(dict(
 name='04-cookies-the-browser-kind', kind='cut-out', recommended=False,
 board='Thumbnails 7 (pin-01-07 "COOK": one huge black word across a pale frame, the person in the middle cutting through it)',
 fonts='Font 10 (design-10: Inter Tight 900 black on off-white, with its small plain line underneath, Design 378)',
 colours='Font 10 specimen: #030502 on #F5F5F4',
 thumbnail_text='cookies (the browser kind)',
 direction='Off-white ground, "cookies" huge in black lowercase across the frame; her cut-out (shoot 1561, hand on her cheek, smiling) stands in the middle in front of the word. A small line under it says which cookies: "(the browser kind)".',
 titles=['What Are Browser Cookies? How Websites Remember You',
         'Why Websites Need Cookies (Explained Simply)',
         T_MAIN],
 text={'hd': 'cookies', 'sub': '(the browser kind)'},
 images={'cut': S + '1561-cut.png'},
 vars={'--ground': '#F5F5F4'},
 css='''
.hd{left:0;right:0;top:-10px;text-align:center;font-family:'Inter Tight';font-weight:900;font-size:330px;line-height:1;letter-spacing:-.07em;color:#030502;z-index:1}
.sub{left:0;right:0;top:340px;text-align:right;padding-right:40px;font-family:'Inter Tight';font-weight:600;font-size:54px;letter-spacing:-.03em;color:#030502;z-index:4}
.cut{left:200px;width:820px;bottom:-165px}
''',
 body='''
<div class="a hd nw" data-k="hd"></div>
<img class="cut z2" data-img="cut" data-move="cut" src="../../assets/shoot/1561-cut.png" alt="">
<div class="a sub nw" data-k="sub"></div>'''))

# 05 -------------------------------------------------------------------------------------------------------------------
form = lambda k, filled: (f'<div class="win w{k}" data-move="window{k}"><div class="bar"><i></i><i></i><i></i><div class="url" data-k="u{k}"></div></div>'
    f'<div class="fm"><div class="h" data-k="h{k}"></div>'
    + ''.join(f'<div class="lb" data-k="l{k}{i}"></div><div class="in{"" if filled else " e"}" data-k="v{k}{i}"></div>' for i in (1, 2, 3))
    + '</div></div>')
SET.append(dict(
 name='05-refresh-vs-close-tab', kind='flat', recommended=False,
 board='Thumbnails 69 (yt-16 "12:30 PM / 7:30 PM": two pictures side by side, a short label on top of each, the same thing at two moments)',
 fonts='Font 49 (shorts-15: Inter Tight 800 black on a yellow highlight, on off-white, Formats 65)',
 colours='Font 49 specimen: words #111111 on highlight #FFE600, ground #F7F7F5',
 thumbnail_text='refresh / close tab',
 direction='No face. Two browser windows of the same checkout form side by side: under "refresh" it is still filled in, under "close tab" it is empty. The labels sit on yellow highlights. Generic form, no shop.',
 titles=['sessionStorage: Why Your Form Disappears When You Close the Tab',
         'sessionStorage vs localStorage: What Survives a Closed Tab?',
         T_MAIN],
 text={'k1': 'refresh', 'k2': 'close tab', 'u1': 'shop.example/checkout', 'u2': 'shop.example/checkout', 'h1': 'Checkout', 'h2': 'Checkout',
       'l11': 'Name', 'v11': 'Ada Okafor', 'l12': 'Street', 'v12': 'Tartu mnt 12', 'l13': 'City', 'v13': 'Tallinn',
       'l21': 'Name', 'v21': '&nbsp;', 'l22': 'Street', 'v22': '&nbsp;', 'l23': 'City', 'v23': '&nbsp;'},
 images={},
 vars={'--ground': '#F7F7F5'},
 css='''
.k{position:absolute;top:34px;font-family:'Inter Tight';font-weight:800;font-size:96px;line-height:1;letter-spacing:-.05em;color:#111111;background:#FFE600;padding:4px 20px 12px;z-index:4}
.k1{left:60px}.k2{left:670px}
.win{top:180px;width:570px;height:520px}
.w1{left:40px}.w2{left:670px}
.fm{padding:22px 38px;font-family:'Inter Tight'}
.fm .h{font-weight:800;font-size:44px;letter-spacing:-.04em;margin-bottom:10px}
.fm .lb{font-weight:600;font-size:24px;color:#666;margin-top:12px}
.fm .in{border-radius:10px;background:#EFEFEC;font-weight:700;font-size:38px;letter-spacing:-.03em;padding:12px 18px;margin-top:6px;height:66px}
''',
 body='<div class="k k1 nw" data-k="k1"></div><div class="k k2 nw" data-k="k2"></div>\n' + form(1, True) + '\n' + form(2, False)))

# 06 -------------------------------------------------------------------------------------------------------------------
SET.append(dict(
 name='06-what-goes-where', kind='photo', recommended=False,
 board='Thumbnails 63 (yt-10 "SAVE 4 HOURS A DAY": the creator in front of a big ticked table, heavy yellow caps across the top)',
 fonts='Font 61 (thumbs-06: Montserrat Black, yellow on dark, Thumbnails 58) + Font 58 (thumbs-03: Inter Tight, black on pale grey) in the table',
 colours='Font 61 specimen: #F6D23A on #2B2B2B (her room dimmed to it); table = Font 58 specimen #111111 on #E9E7E3',
 thumbnail_text='WHAT GOES WHERE?',
 direction='Her room dimmed dark, she on the left (shoot 1555, hand on her chin, thinking), a big pale table behind her on the right: rows login / cart / form, columns cookie / localStorage / sessionStorage, one tick per row (the answer she gives in the video). WHAT GOES WHERE? in heavy yellow across the top.',
 titles=[T_MAIN,
         'Cookies vs localStorage vs sessionStorage: Which One to Use?',
         'Where Online Shops Keep Your Login, Cart and Form'],
 text={'hd': 'WHAT GOES WHERE?', 'c1': 'cookie', 'c2': 'localStorage', 'c3': 'sessionStorage', 'r1': 'login', 'r2': 'cart', 'r3': 'form'},
 images={'room': S + '1555.jpg', 'me': S + '1555-person.png'},
 vars={'--pw': '1500px', '--pl': '-560px', '--pt': '-200px', '--dim': 'rgba(20,20,20,.7)'},
 css='''
.hd{left:0;right:0;top:26px;text-align:center;font-family:'Montserrat';font-weight:900;font-size:104px;line-height:1;letter-spacing:-.03em;color:#F6D23A;z-index:5}
.tb{left:440px;top:165px;width:816px;background:#E9E7E3;border-radius:14px;padding:18px 26px 14px;font-family:'Inter Tight';color:#111111;z-index:2}
.tb table{width:100%;border-collapse:collapse}
.tb th{font-weight:700;font-size:35px;letter-spacing:-.03em;text-align:center;padding:6px 0 14px}
.tb td{border-top:3px solid #111;height:112px;text-align:center}
.tb td.r{text-align:left;font-weight:800;font-size:52px;letter-spacing:-.04em;width:150px}
.tb svg{width:78px;height:78px}
''',
 body=photo('1555') + '''
<div class="a hd sh nw" data-k="hd"></div>
<div class="a tb" data-move="table"><table>
<tr><th></th><th data-k="c1"></th><th data-k="c2"></th><th data-k="c3"></th></tr>
<tr><td class="r" data-k="r1"></td><td>TICK</td><td></td><td></td></tr>
<tr><td class="r" data-k="r2"></td><td></td><td>TICK</td><td></td></tr>
<tr><td class="r" data-k="r3"></td><td></td><td></td><td>TICK</td></tr>
</table></div>'''.replace('TICK', '<svg viewBox="0 0 84 84"><path d="M12 44 L34 66 L76 12" fill="none" stroke="#111" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/></svg>')))

# 07 -------------------------------------------------------------------------------------------------------------------
SET.append(dict(
 name='07-who-can-read-this', kind='flat', recommended=False,
 board='Thumbnails 92 (yt-39 "Stop Using div": nothing but code on a plain ground, big and readable, one mark that tells you something is wrong)',
 fonts='Font 63 (thumbs-08: JetBrains Mono ExtraBold, black on yellow, Thumbnails 65)',
 colours='Font 63 specimen: #111111 on #F6D83B',
 thumbnail_text='who can read this?',
 direction='No face. Yellow ground, a line of real browser code that saves an email in localStorage, and below it a script tag from somewhere else reading it back. "who can read this?" big on top. All in the specimen\'s black typewriter mono; the email is an obvious example.',
 titles=['Is localStorage Safe? Who Can Read Your Data',
         'localStorage Explained: What Any Script on Your Page Can Read',
         T_MAIN],
 text={'hd': 'who can<br>read this?', 'c1': 'localStorage.setItem(<br>&nbsp;&nbsp;"email", "ada@mail.com")', 'c2': '&lt;script src="ads.js"&gt;', 'c3': '&nbsp;&nbsp;localStorage.getItem("email")', 'c4': '&nbsp;&nbsp;// "ada@mail.com"'},
 images={},
 vars={'--ground': '#F6D83B'},
 css='''
.hd{left:64px;top:40px;font-family:'JetBrains Mono';font-weight:800;font-size:112px;line-height:1.02;letter-spacing:-.04em;color:#111111}
.code{left:64px;top:300px;font-family:'JetBrains Mono';font-weight:800;font-size:44px;line-height:1.3;letter-spacing:-.02em;color:#111111}
.code .c1{margin-bottom:28px}
.code .c2,.code .c3,.code .c4{background:#111111;color:#F6D83B;display:inline-block;padding:0 14px}
.code .c4{opacity:.999}
.mark{left:1040px;top:56px;width:190px;height:190px}
''',
 body='''
<div class="a hd nw" data-k="hd"></div>
<div class="a code nw" data-move="code"><div class="c1" data-k="c1"></div><div><span class="c2" data-k="c2"></span></div><div><span class="c3" data-k="c3"></span></div><div><span class="c4" data-k="c4"></span></div></div>
<svg class="a mark" data-move="eye" viewBox="0 0 200 200"><path d="M14 100 C 50 40, 150 40, 186 100 C 150 160, 50 160, 14 100 Z" fill="none" stroke="#111" stroke-width="14" stroke-linejoin="round"/><circle cx="100" cy="100" r="30" fill="#111"/></svg>'''))

# 08 -------------------------------------------------------------------------------------------------------------------
SET.append(dict(
 name='08-whats-in-a-browser-cookie', kind='object', recommended=False,
 board='Thumbnails 91 (yt-38 "TWO SUM": one real object filling the frame, the topic in huge heavy rounded type on top, a small handwritten-style note on the object)',
 fonts='Font 14 (design-14: Bagel Fat One, cream on red, Design 361) + Font 63 (thumbs-08: JetBrains Mono, black on light) on the ticket',
 colours='Font 14 / Font 94 combo (Design 361): ground #DC3E2B, words #EDE6D9; ticket #EDE6D9 with #111111 mono',
 thumbnail_text='what\'s in a browser cookie?',
 direction='No face. Red ground, a real chocolate-chip cookie (Pexels, free licence) big at the bottom right with a small cream ticket stuck in it: "session_id=8f3a…" (a made-up example). The question in big rounded cream type on top.',
 titles=['What Are Browser Cookies? How Websites Remember You',
         'How Login Cookies Work: Session IDs Explained Simply',
         T_MAIN],
 text={'hd': 'what&rsquo;s in a<br>browser cookie?', 'tk': 'session_id=8f3a&hellip;'},
 images={'obj': CL + 'cookie.png'},
 vars={'--ground': '#DC3E2B'},
 css='''
.hd{left:56px;top:36px;font-family:'Bagel Fat One';font-size:132px;line-height:.98;letter-spacing:-.01em;color:#EDE6D9;z-index:4}
.obj{left:640px;top:330px;width:560px;filter:drop-shadow(0 22px 30px rgba(0,0,0,.35));z-index:2}
.tk{left:430px;top:500px;background:#EDE6D9;color:#111111;font-family:'JetBrains Mono';font-weight:800;font-size:48px;letter-spacing:-.02em;padding:14px 26px;transform:rotate(-6deg);box-shadow:0 12px 26px rgba(0,0,0,.3);z-index:3}
''',
 body='''
<div class="a hd nw" data-k="hd"></div>
<img class="a obj" data-img="obj" data-move="cookie" src="../../assets/collage/cookie.png" alt="">
<div class="a tk nw" data-k="tk"></div>'''))

# 09 -------------------------------------------------------------------------------------------------------------------
SET.append(dict(
 name='09-how-websites-remember-you', kind='collage', recommended=False,
 board='Thumbnails 124 (yt-71 "the art of offline living": three real photos side by side as one collage, one calm white line centred across them)',
 fonts='Font 34 (design-34: Inter Tight Bold, white, Design 373)',
 colours='Font 34 specimen: #FFFFFF words on its red #CB2D26 (a band across the top, the photos below)',
 thumbnail_text='how websites remember you',
 direction='Three photo panels: a real cookie (Pexels) | her in her room (shoot 1552, arms crossed, calm) | a real shop cart (Pexels). One white line across the top: "how websites remember you". The three things the video is about, as photos.',
 titles=['How Websites Remember You (Cookies vs localStorage)',
         'Cookies, localStorage and sessionStorage Explained Simply',
         T_MAIN],
 text={'hd': 'how websites remember you'},
 images={'p1': PX + 'px-29850744.jpg', 'p2': S + '1552.jpg', 'p3': PX + 'px-953864.jpg'},
 vars={},
 css='''
.pn{position:absolute;top:0;height:720px;overflow:hidden}
.pn img{position:absolute;display:block}
.p1{left:0;width:396px}.p1 img{height:720px;width:auto;left:-400px;top:0}
.p2{left:404px;width:472px}.p2 img{width:1500px;left:-604px;top:-330px}
.p3{left:884px;width:396px}.p3 img{height:720px;width:auto;left:-440px;top:0}
.pn::after{content:"";position:absolute;inset:0;background:rgba(0,0,0,.14)}
.band{left:0;right:0;top:0;height:150px;background:#CB2D26}
.hd{left:0;right:0;top:28px;text-align:center;font-family:'Inter Tight';font-weight:700;font-size:92px;letter-spacing:-.045em;line-height:1;color:#FFFFFF}
.pn{top:150px;height:570px}
''',
 body='''
<div class="pn p1 z1"><img data-img="p1" data-move="p1" src="../../assets/pexels/px-29850744.jpg" alt=""></div>
<div class="pn p2 z1"><img data-img="p2" data-move="p2" src="../../assets/shoot/1552.jpg" alt=""></div>
<div class="pn p3 z1"><img data-img="p3" data-move="p3" src="../../assets/pexels/px-953864.jpg" alt=""></div>
<div class="a band z3"></div>
<div class="a hd z4 nw" data-k="hd"></div>'''))

# 10 -------------------------------------------------------------------------------------------------------------------
SET.append(dict(
 name='10-still-logged-in', kind='photo', recommended=False,
 board='Thumbnails 104 (yt-51 "Copying -> Understanding", one of her likes: the creator in her real room, two short labels in coloured boxes beside her face joined by an arrow)',
 fonts='Font 11 (design-11: Inter Tight 700, ink #0C150A on lime #8AF25F, Design 365)',
 colours='Font 11 / Font 105 combo (Design 365): #8AF25F and #0C150A (one box lime on ink, one ink on lime)',
 thumbnail_text='closed the browser -> still logged in?',
 direction='Her real room (shoot 1548, hand on her cheek, puzzled), she left of centre in natural colour. Beside her face two boxes joined by a drawn arrow: "closed the browser" then "still logged in?". The everyday puzzle the video answers (a login cookie).',
 titles=['Why Websites Need Cookies (How You Stay Logged In)',
         'How Login Cookies Work: Session IDs Explained Simply',
         T_MAIN],
 text={'b1': 'closed the browser', 'b2': 'still logged in?'},
 images={'room': S + '1548.jpg', 'me': S + '1548-person.png'},
 vars={'--pw': '1500px', '--pl': '-120px', '--pt': '-250px', '--dim': 'rgba(10,10,10,.25)'},
 css='''
.b{position:absolute;font-family:'Inter Tight';font-weight:700;font-size:70px;line-height:1;letter-spacing:-.045em;padding:12px 24px 16px;border-radius:10px;z-index:5;box-shadow:0 12px 26px rgba(0,0,0,.3)}
.b1{left:590px;top:120px;background:#0C150A;color:#8AF25F}
.b2{left:690px;top:470px;background:#8AF25F;color:#0C150A}
.ar{left:760px;top:220px;width:200px;height:240px;z-index:4}
''',
 body=photo('1548') + '''
<div class="b b1 nw" data-k="b1"></div>
<svg class="a ar" data-move="arrow" viewBox="0 0 200 240"><path d="M40 10 C 20 90, 70 170, 140 200" fill="none" stroke="#8AF25F" stroke-width="12" stroke-linecap="round"/><path d="M100 178 L148 204 L118 232" fill="none" stroke="#8AF25F" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/></svg>
<div class="b b2 nw" data-k="b2"></div>'''))

# 11 -------------------------------------------------------------------------------------------------------------------
SET.append(dict(
 name='11-whats-saved-in-your-browser', kind='drawn', recommended=False,
 board='Thumbnails 105 (yt-52 "STUDY 12 HOURS A DAY": one hand-drawn sketch on a plain flat ground, hand-lettered words beside it)',
 fonts='Font 20 (design-20: Permanent Marker caps, Design 363)',
 colours='Font 20 / Font 108 combo (Design 363): #E8EAF4 on #0D24C5 (the sketch drawn in the same pale ink)',
 thumbnail_text='WHAT\'S SAVED IN YOUR BROWSER?',
 direction='No face. Electric-blue ground, a pale marker sketch of a browser window with three things inside it: a cookie, a shopping cart and a half-filled form. Hand-lettered pale caps on the left: WHAT\'S SAVED IN YOUR BROWSER?',
 titles=['Cookies, localStorage and sessionStorage Explained Simply',
         'What Does Your Browser Save About You? (Cookies vs localStorage)',
         T_MAIN],
 text={'hd': 'WHAT&rsquo;S<br>SAVED IN<br>YOUR<br>BROWSER?'},
 images={},
 vars={'--ground': '#0D24C5'},
 css='''
.hd{left:50px;top:80px;font-family:'Permanent Marker';font-size:96px;line-height:1.02;color:#E8EAF4;transform:rotate(-3deg)}
.sk{left:600px;top:80px;width:640px;height:546px}
''',
 body='''
<div class="a hd nw" data-k="hd"></div>
<svg class="a sk" data-move="sketch" viewBox="0 0 680 580" fill="none" stroke="#E8EAF4" stroke-width="9" stroke-linecap="round" stroke-linejoin="round">
 <path d="M24 30 C 220 22, 460 26, 656 34 C 660 200, 654 380, 650 552 C 450 560, 230 556, 30 548 C 26 380, 20 200, 24 30 Z"/>
 <path d="M26 104 C 240 98, 450 102, 654 108"/>
 <circle cx="70" cy="68" r="12"/><circle cx="112" cy="68" r="12"/><circle cx="154" cy="68" r="12"/>
 <path d="M210 70 C 330 66, 480 66, 620 72"/>
 <path d="M150 260 C 150 200, 250 186, 270 250 C 292 318, 196 352, 160 318 C 146 304, 148 286, 150 260 Z"/>
 <path d="M190 236 l4 4 M232 262 l4 4 M196 296 l4 4 M240 300 l4 4"/>
 <path d="M372 200 L404 200 L432 312 L560 312 L590 228 L420 228"/>
 <circle cx="450" cy="348" r="16"/><circle cx="540" cy="348" r="16"/>
 <path d="M90 410 C 280 404, 420 406, 600 412 M90 470 C 240 466, 300 468, 360 472"/>
 <path d="M90 410 L90 500"/>
</svg>'''))


# round 2 (2026-11-13, after the fresh cold critic) replaces round 1 entirely: tools/set-round2.py
import importlib.util
_sp = importlib.util.spec_from_file_location('r6', os.path.join(ROOT, 'tools', 'set-round6.py'))
_m = importlib.util.module_from_spec(_sp); _sp.loader.exec_module(_m)
SET = _m.blocks(S, PX, CL, photo, T_MAIN)

only = sys.argv[1:]
names = []
for d in SET:
    names.append(d['name'])
    if only and not any(d['name'].startswith(o) for o in only):
        continue
    p = os.path.join(D, d['name']); os.makedirs(p, exist_ok=True)
    c = {k: d[k] for k in ('direction', 'thumbnail_text', 'kind', 'recommended', 'titles', 'text', 'images', 'vars', 'board', 'fonts', 'colours')}
    c['title'] = d['titles'][0]; c['class'] = 'no-lift'; c['scores'] = ''
    old = os.path.join(p, 'content.json')
    if os.path.exists(old):   # keep scores + her studio nudges
        try:
            o = json.load(open(old)); c['scores'] = o.get('scores', '')
            if o.get('nudge'): c['nudge'] = o['nudge']
        except Exception: pass
    json.dump(c, open(old, 'w'), indent=1, ensure_ascii=False)
    open(os.path.join(p, 'index.html'), 'w').write(page(d['css'], d['body']))
    print('wrote', d['name'])
json.dump(sorted(names), open(os.path.join(D, 'index.json'), 'w'))
