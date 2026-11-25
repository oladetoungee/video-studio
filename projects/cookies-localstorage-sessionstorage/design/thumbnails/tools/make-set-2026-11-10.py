# Builds the 2026-11-10 thumbnail set (folders renumbered best-first after the cold test; recommended flags + scores were set in content.json after) (10 directions) from her shoot (outfit A, white shirt; Enhance photo + cut-out).
# WARNING: re-running OVERWRITES content.json (her studio edits). Use only to rebuild from scratch:  python3 tools/make-set-2026-11-10.py [01 05 ...]
import json, os, sys
D = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'directions')
HEAD = '<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../../lib/ct.css"><style>\n%s\n</style></head><body><div class="t %s">\n%s\n</div><script src="../../lib/bind.js"></script></body></html>\n'
S = '../../assets/shoot/'
C = '../../assets/collage/'
P = '../../assets/pexels/'
TICK = '<span class="dotc ok" style="font-size:%dpx"><svg viewBox="0 0 24 24"><path d="M5 12.5l4.5 4.5L19 7.5" stroke="#fff" stroke-width="3.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg></span>'
CROSS = '<span class="dotc gone" style="font-size:%dpx"><svg viewBox="0 0 24 24"><path d="M7 7l10 10M17 7L7 17" stroke="#fff" stroke-width="3.4" fill="none" stroke-linecap="round"/></svg></span>'
PTR = '<svg class="ptr z5" data-move="pointer" style="left:%dpx;top:%dpx" viewBox="0 0 24 30"><path d="M2 2v22l6-5.5 4 9 4-1.8-4-8.8h8z" fill="#fff" stroke="#0E0E0E" stroke-width="1.6" stroke-linejoin="round"/></svg>'

def photo(n, washed=False):
    return ('<div class="pf %s z1" data-move="photo"><img class="room" data-img="room" src="%s%s.jpg" alt=""><div class="wash"></div><div class="dim"></div>'
            '<img class="me" data-img="me" src="%s%s-person.png" alt=""></div>') % ('washed' if washed else '', S, n, S, n)
def form(cls, k, filled, w, fz=26, fh=54):
    rows = ''.join('<div class="f %s" data-k="%s%d" style="font-size:%dpx;height:%dpx">%s</div>' % ('' if filled else 'empty', k, i, fz, fh, '') for i in range(3))
    return rows
DIRS = {}
def d(name, css, body, content, cls='no-lift'):
    DIRS[name] = (css, body, content, cls)

# 01 PHOTO (recommended): her room washed crash-yellow, she thinks; close the tab: the cart stays (tick), the form empties (cross)
d('07-close-the-tab', '''
.lp{position:absolute;left:0;top:0;width:600px;height:720px;background:var(--ground)}
.hd{left:56px;top:52px;font-size:100px;line-height:.96}
.cartw{position:absolute;left:46px;top:330px;width:300px}
.cartw img{width:300px;display:block;filter:drop-shadow(0 14px 18px rgba(0,0,0,.25))}
.hd .q{color:#E5262A}
.win{left:360px;top:330px;width:300px}
.win .bar .tb{font-size:24px}
.win .bar .tb .x{width:48px;height:48px;font-size:38px}
.win .fs{padding:6px 18px 20px}
.win .fs div{height:40px;border-radius:8px;background:#EEF0EF;margin-top:12px}
.ok1{position:absolute;left:250px;top:300px}.no1{position:absolute;left:596px;top:316px}
''', photo('1555', True) + '''
<div class="lp z2"></div><div class="hd z4" data-k="hd"></div>
<div class="cartw z4" data-move="cart"><img data-img="cart" src="''' + C + '''cart-yellow.png" alt=""></div>
<div class="win z4" data-move="window"><div class="bar"><div class="tb"><span data-k="tab"></span><span class="x on">×</span></div></div><div class="fs"><div></div><div></div><div></div></div></div>
<div class="ok1 z5" data-move="tick">''' + TICK % 74 + '''</div>
''',
 dict(direction="Photo background (her shoot, white shirt, Enhance photo): her room washed crash-yellow (the video's marker colour) so it goes calm, she in full colour on the right, hand on her chin, thinking. On the left a flat crash-yellow panel with the question in heavy + light, under it the answer as two real things: a shopping cart with a green tick (still there) and an emptied checkout page in a browser window whose tab is being closed, the red x of its tab says gone. Follows: board kind d (creator large on one side + a bold claim), her ux-research thumbnail (room washed one colour, few big things).",
  thumbnail_text="Close the tab. What's left?", kind="photo", recommended=True,
  titles=['localStorage vs sessionStorage vs Cookies (What Goes Where)', 'Why Your Cart Stays but Your Checkout Form Disappears', 'Cookies vs localStorage vs sessionStorage: Which to Use?'],
  text=dict(hd="Close the tab.<br><span class='q'>What’s left?</span>", tab='Checkout'),
  images=dict(room=S + '1555.jpg', me=S + '1555-person.png', cart=C + 'cart-yellow.png'),
  vars={'--wash': '#FFD400', '--ground': '#FFD400', '--pw': '1640px', '--pl': '230px', '--pt': '-360px', '--wb': '1.5'}))

# 02 FLAT: topic name huge on crash-yellow with a quiet line pattern, the real objects (a cookie, a phone with a cart), her cut-out right
d('05-cookie-or-localstorage', '''
.hd{left:56px;top:56px;font-size:100px;line-height:.9}
.hd2{position:absolute;left:60px;top:150px;font-size:100px;letter-spacing:-.045em;font-weight:300}
.hd2 b{font-weight:700}
.ck{position:absolute;left:44px;top:330px;width:300px;filter:drop-shadow(0 16px 20px rgba(0,0,0,.28))}
.phone{left:380px;top:300px;width:210px;height:430px;transform:rotate(5deg)}
.scr{padding:58px 18px 0}
.scr .t1{font-weight:700;font-size:30px;letter-spacing:-.03em}
.scr .it{display:flex;align-items:center;gap:12px;margin-top:16px;font-size:20px;font-weight:500}
.scr .it img{width:62px;height:62px;object-fit:contain;background:#F1F2F1;border-radius:10px}
.scr .btn{margin-top:22px;background:#0E0E0E;color:#fff;font-weight:700;font-size:20px;text-align:center;padding:12px 0;border-radius:10px}
.cut{right:-60px;height:690px}
.tkt{position:absolute;left:150px;top:520px;background:#FFFDF6;padding:12px 18px;transform:rotate(-8deg);box-shadow:0 10px 20px rgba(0,0,0,.25);font-family:'DMMono';font-size:28px;white-space:nowrap}
''', '''<div class="hd z3" data-k="hd"></div><div class="hd2 z3" data-k="hd2"></div>
<img class="ck z4" data-img="cookie" data-move="cookie" src="''' + C + '''cookie.png" alt="">
<div class="tkt z5" data-k="tk" data-move="ticket"></div>
<div class="phone z4" data-move="phone"><div class="scr"><div class="t1" data-k="p1"></div>
<div class="it"><img data-img="item" src="''' + C + '''cart-yellow.png" alt=""><span data-k="p2"></span></div>
<div class="it"><img data-img="item2" src="''' + C + '''cookie-pair.png" alt=""><span data-k="p3"></span></div>
<div class="btn" data-k="p4"></div></div></div>
<img class="cut z2" data-img="me" data-move="her" src="''' + S + '''1549-cut.png" alt="">''',
 dict(direction="Flat crash-yellow ground with fine same-hue diagonal lines (her 'bold colour + quiet pattern' refs). The question developers search, huge in Helvetica 700 (type set 03); under it the two things the video is about, as real objects: a real chocolate-chip cookie and a phone with a shop cart. Her cut-out large on the right, calm, looking at the viewer. Follows: tech explainer kind (topic name huge + the literal thing: 'ALGORITHMS MADE EASY'), her database-indexes thumbnail.",
  thumbnail_text="Cookie or localStorage?", kind="flat",
  titles=['Cookies vs localStorage: Where Should Your Data Go?', 'localStorage vs sessionStorage vs Cookies (What Goes Where)', 'How Websites Remember You (Cookies vs localStorage)'],
  text=dict(hd='Cookie or', hd2='<b>localStorage?</b>', tk='session_id=117', p1='Your cart', p2='Toy cart', p3='Cookies', p4='Checkout'),
  images=dict(me=S + '1549-cut.png', cookie=C + 'cookie.png', item=C + 'cart-yellow.png', item2=C + 'cookie-pair.png'), vars={'--ground': '#FFD400'}), cls='no-lift pat')

# 03 PHOTO: her room natural (a little dimmed), smiling, hand on her cheek; a phone with her cart; "Why is my cart still here?"
d('01-cart-still-here', '''
.hd{left:52px;top:46px;font-size:96px;line-height:.95;color:#fff}
.phone{left:118px;top:300px;width:220px;height:450px;transform:rotate(-7deg)}
.scr{padding:60px 18px 0}
.scr .t1{font-weight:700;font-size:30px;letter-spacing:-.03em}
.scr .it{display:flex;align-items:center;gap:12px;margin-top:16px;font-size:20px;font-weight:500}
.scr .it img{width:62px;height:62px;object-fit:contain;background:#F1F2F1;border-radius:10px}
.tg{position:absolute;left:356px;top:620px;background:#0E0E0E;color:#7BE6A6;font-family:'DMMono';font-size:34px;padding:10px 18px;letter-spacing:.02em}
.scr .btn{margin-top:22px;background:#087A47;color:#fff;font-weight:700;font-size:20px;text-align:center;padding:12px 0;border-radius:10px}
''', photo('1561') + '''
<div class="hd sh z4" data-k="hd"></div>
<div class="phone z4" data-move="phone"><div class="scr"><div class="t1" data-k="p1"></div>
<div class="it"><img data-img="item" src="''' + C + '''cookie-pair.png" alt=""><span data-k="p2"></span></div>
<div class="it"><img data-img="item2" src="''' + C + '''cart-navy.png" alt=""><span data-k="p3"></span></div>
<div class="btn" data-k="p4"></div></div></div>
<div class="tg z5" data-k="tg"></div>''',
 dict(direction="Photo background: her real room (natural colour, dimmed a little so white words read), she on the right smiling with her hand on her cheek, as if she just noticed. On the left a real-looking phone with a shop cart that is still full, a small mono tag 'localStorage' beside it (the answer, so it reads as tech). The question everyone has had, in white. Follows: board kind a/d (her in her real setting + a plain question), YouTube 'creator holding the topic'.",
  thumbnail_text="Why is my cart still here?", kind="photo",
  titles=['localStorage Explained: Why Your Cart Is Still There', 'localStorage vs sessionStorage vs Cookies (What Goes Where)', 'How Websites Remember Your Cart (localStorage vs Cookies)'],
  text=dict(hd='Why is my cart<br>still here?', p1='Your cart (2)', p2='Cookies', p3='Toy cart', p4='Checkout', tg='localStorage'),
  images=dict(room=S + '1561.jpg', me=S + '1561-person.png', item=C + 'cookie-pair.png', item2=C + 'cart-navy.png'),
  vars={'--pw': '1500px', '--pl': '300px', '--pt': '-300px', '--dim': 'rgba(14,14,14,.38)', '--ground': '#2A2C2B'}))

# 04 COLLAGE: her full photo (arms crossed), the browser's three keepsakes as die-cut objects around her, one line on top
d('10-what-your-browser-remembers', '''
.hd{left:0;right:0;top:40px;text-align:center;font-size:84px;color:#fff}
.ck{position:absolute;left:60px;top:300px;width:300px;transform:rotate(-8deg);filter:drop-shadow(0 16px 20px rgba(0,0,0,.4))}
.cartw{position:absolute;left:70px;top:470px;width:250px;filter:drop-shadow(0 16px 20px rgba(0,0,0,.4))}
.phone{left:960px;top:150px;width:290px;height:594px;transform:rotate(6deg)}
.scr{padding:80px 22px 0}
.scr .lb{font-family:'DMMono';font-size:22px;letter-spacing:.1em;text-transform:uppercase;color:rgba(14,14,14,.55)}
.scr .f{background:#EEF0EF;border-radius:10px;height:54px;margin-top:12px;font-size:24px;display:flex;align-items:center;padding:0 14px}
.scr .btn{margin-top:20px;background:#0E0E0E;color:#fff;font-weight:700;font-size:24px;text-align:center;padding:11px 0;border-radius:10px}
''', photo('1552') + '''
<div class="hd sh z4" data-k="hd"></div>
<div class="phone z4" data-move="phone"><div class="scr"><div class="lb" data-k="p1"></div><div class="f" data-k="p2"></div><div class="f" data-k="p3"></div><div class="f" data-k="p4"></div><div class="btn" data-k="p5"></div></div></div>''',
 dict(direction="Collage over her full photo: she sits in the middle of her real room (arms crossed, calm), around her the three things a browser keeps for a shop, as real die-cut objects: a phone with a half-filled checkout form (right): the thing a browser keeps for you. One centred line in white with a soft shadow. Follows: board kind c (creator in the middle surrounded by the topic's objects), her collage samples.",
  thumbnail_text="What your browser remembers", kind="collage",
  titles=['How Websites Remember You (Cookies vs localStorage)', 'Cookies, localStorage and sessionStorage Explained Simply', 'localStorage vs sessionStorage vs Cookies (What Goes Where)'],
  text=dict(hd='What your browser remembers', p1='Checkout', p2='Ada Okafor', p3='Tartu mnt 12', p4=' ', p5='Pay now'),
  images=dict(room=S + '1552.jpg', me=S + '1552-person.png'),
  vars={'--pw': '1520px', '--pl': '-120px', '--pt': '-330px', '--dim': 'rgba(14,14,14,.22)', '--ground': '#2A2C2B'}))

# 05 OTHER (split, no face): sessionStorage, refresh = still there, close tab = gone (the same form in the same place)
d('03-refresh-vs-close-tab', '''
.l{position:absolute;left:0;top:0;width:640px;height:720px;background:#D9DCDA}
.r{position:absolute;left:640px;top:0;width:640px;height:720px;background:#0E0E0E}
.hd{left:0;right:0;top:40px;text-align:center;font-size:96px}
.hd .pl{background:#FFD400;color:#0E0E0E;padding:0 .2em .04em}
.k{position:absolute;top:168px;font-size:62px;font-weight:700;letter-spacing:-.04em}
.form{top:258px;width:470px;padding:22px 26px 26px}
.res{top:560px;font-size:84px}
''', '''<div class="l z1"></div><div class="r z1"></div>
<div class="hd z3" data-k="hd"></div>
<div class="k z3" data-k="kl" style="left:84px"></div><div class="k w z3" data-k="kr" style="left:724px"></div>
<div class="form z3" data-move="formL" style="left:84px">''' + ''.join('<div class="f" data-k="a%d" style="font-size:30px;height:62px"></div>' % i for i in range(3)) + '''</div>
<div class="form z3" data-move="formR" style="left:724px">''' + ''.join('<div class="f empty" data-k="b%d" style="font-size:30px;height:62px"></div>' % i for i in range(3)) + '''</div>
<div class="res ok z3" data-k="v1" style="left:84px"></div><div class="res gone z3" data-k="v2" style="left:724px"></div>''',
 dict(direction="Split before / after, no face: 'sessionStorage' named on top on one crash-yellow plate (the topic is the first thing read). Left half concrete: Refresh, the filled checkout form, 'Still there' in green. Right half ink: Close tab, the same form empty, 'Gone' in red. Same form in the same place on both sides. Follows: her saved YouTube before/after and Day 1 / Day 900 splits (board kind f: the topic IS a change).",
  thumbnail_text="sessionStorage: refresh vs close tab", kind="other",
  titles=['sessionStorage vs localStorage: Why Your Form Disappeared', 'Why Your Cart Stays but Your Checkout Form Disappears', 'localStorage vs sessionStorage vs Cookies (What Goes Where)'],
  text=dict(hd="<span class='pl'>sessionStorage</span>", kl='Refresh', kr='Close tab', a0='Ada Okafor', a1='Tartu mnt 12', a2='Tallinn', b0=' ', b1=' ', b2=' ', v1='Still there', v2='Gone'),
  images={}, vars={'--ground': '#0E0E0E'}))

# 06 PHOTO: her room washed dark (ink), she in full colour, neutral; a phone still logged in + a real cookie; "Still logged in. How?"
d('04-still-logged-in', '''
.hd{left:56px;top:50px;font-size:100px;line-height:.95;color:#fff}
.phone{left:130px;top:300px;width:230px;height:470px;transform:rotate(-5deg)}
.scr{padding:64px 20px 0}
.scr .av{width:76px;height:76px;border-radius:50%;background:#087A47;color:#fff;font-weight:700;font-size:38px;display:flex;align-items:center;justify-content:center}
.scr .hi{font-weight:700;font-size:40px;letter-spacing:-.04em;margin-top:16px}
.scr .sub{font-size:20px;color:rgba(14,14,14,.6);margin-top:6px}
.scr .ln{height:16px;border-radius:8px;background:#ECEEED;margin-top:16px}
.ck{position:absolute;left:350px;top:570px;width:190px;filter:drop-shadow(0 16px 20px rgba(0,0,0,.45))}
''', photo('1553', True) + '''
<div class="hd z4" data-k="hd"></div>
<div class="phone z4" data-move="phone"><div class="scr"><div class="av" data-k="p0"></div><div class="hi" data-k="p1"></div><div class="sub" data-k="p2"></div><div class="ln"></div><div class="ln" style="width:70%"></div><div class="ln" style="width:84%"></div></div></div>
<img class="ck z5" data-img="cookie" data-move="cookie" src="''' + C + '''cookie.png" alt="">''',
 dict(direction="Photo background: her room washed near-black so it goes quiet, she in full colour on the right, calm, looking straight at the viewer. On the left a phone that is still signed in ('Hi, Ada', a green avatar) and a real cookie on its corner: the answer is the cookie. Big white question. Follows: board kind d (creator large on one side + a bold line), Techquickie 'phone + one object' thumbnails.",
  thumbnail_text="Still logged in. How?", kind="photo",
  titles=['Why Websites Need Cookies (HTTP Is Stateless)', 'How Login Cookies Work: Session IDs Explained Simply', 'What Are Browser Cookies? How Websites Remember You'],
  text=dict(hd="Still logged in.<br><span style='color:#7BE6A6'>How?</span>", p0='A', p1='Hi, Ada', p2='Welcome back'),
  images=dict(room=S + '1553.jpg', me=S + '1553-person.png', cookie=C + 'cookie.png'),
  vars={'--wash': '#5A6460', '--ground': '#3A403D', '--pw': '1500px', '--pl': '280px', '--pt': '-300px', '--wb': '1.25', '--wc': '.8'}))

# 07 FLAT (ink + a quiet line pattern): localStorage isn't private; the page's scripts read it (code card), her cut-out wry on the right
d('02-localstorage-isnt-private', '''
.hd{left:56px;top:56px;font-size:104px;line-height:.92;color:#fff}
.hd .lt{color:#FF4D4D;font-weight:700}
.code{position:absolute;left:56px;top:380px;width:660px;background:#1E2020;border-radius:18px;padding:28px 32px;font-size:40px;line-height:1.45;color:#D9DCDA}
.code .c1{color:#8C918F}.code .c2{color:#7BE6A6}
.cut{right:-40px;height:640px}
''', '''<div class="hd z3" data-k="hd"></div>
<div class="code z3" data-move="code"><div class="c1" data-k="c0"></div><div class="c1" data-k="c1"></div><div data-k="c2"></div><div class="c2" data-k="c3"></div></div>
<img class="cut z2" data-img="me" data-move="her" src="''' + S + '''1563-cut.png" alt="">''',
 dict(direction="Flat off-black ground with fine diagonal lines a few % lighter. The claim in heavy white 'localStorage' + light red 'isn't private'; under it the proof as one line of real code reading the stored email. Her cut-out on the right, hand on her cheek, a wry 'yes, really' look. Follows: tech explainer kind (topic huge + the literal code: 'stop using div'), board kind d.",
  thumbnail_text="localStorage isn't private", kind="flat",
  titles=['localStorage vs Cookies: Who Can Read Your Data?', 'Is localStorage Safe? Who Can Read It (and Cookies)', 'localStorage vs sessionStorage vs Cookies (What Goes Where)'],
  text=dict(hd="localStorage<br><span class='lt'>isn’t private</span>", c0='', c1='', c2="getItem('email')", c3='→ "ada@me.io"'),
  images=dict(me=S + '1563-cut.png'), vars={'--ground': '#0E0E0E', '--patc': 'rgba(255,255,255,.035)'}), cls='no-lift pat')

# 08 OTHER (board, no face): what survives a closed tab, three rows, tick / tick / cross
d('08-what-survives-a-closed-tab', '''
.hd{left:64px;top:52px;font-size:92px;line-height:.98}
.tbl{position:absolute;left:64px;top:300px;width:740px}
.cut{right:-90px;height:600px}
.rw{display:flex;align-items:center;justify-content:space-between;border-top:1px solid rgba(14,14,14,.3);padding:22px 0 20px}
.rw .a{font-weight:700;font-size:66px;letter-spacing:-.04em}
.rw .b{font-family:'DMMono';font-size:44px;color:rgba(14,14,14,.6);margin-left:26px}
''', '''<div class="hd z3" data-k="hd"></div>
<div class="tbl z3" data-move="table">
<div class="rw"><div><span class="a" data-k="r1"></span><span class="b" data-k="s1"></span></div>''' + TICK % 76 + '''</div>
<div class="rw"><div><span class="a" data-k="r2"></span><span class="b" data-k="s2"></span></div>''' + TICK % 76 + '''</div>
<div class="rw"><div><span class="a" data-k="r3"></span><span class="b" data-k="s3"></span></div>''' + CROSS % 76 + '''</div></div>
<img class="cut z2" data-img="me" data-move="her" src="''' + S + '''1552-cut.png" alt="">''',
 dict(direction="Concrete ground with the quiet line pattern, her cut-out (arms crossed) on the right third: the question big in heavy + light, then the answer as three rows a shopper knows (Login, Cart, Form), each with where it lives in mono and a green tick or a red cross. Hairlines only. Follows: her database-indexes thumbnail (one mechanism drawn big), board kind e (clean ground, one accent pair).",
  thumbnail_text="What survives a closed tab?", kind="other",
  titles=['Local Storage vs Session Storage vs Cookies (Tab Test)', 'localStorage vs sessionStorage vs Cookies (What Goes Where)', 'Why Your Cart Stays but Your Checkout Form Disappears'],
  text=dict(hd="What survives<br>a closed tab?", r1='Login', s1='cookie', r2='Cart', s2='localStorage', r3='Form', s3='sessionStorage'),
  images=dict(me=S + '1552-cut.png'), vars={'--ground': '#D9DCDA'}), cls='no-lift pat')

# 09 PHOTO: her room washed soft green, hand on her chin; a giant real cookie with a cloakroom-style ticket sticking out
d('06-whats-inside-a-cookie', '''
.hd{left:56px;top:46px;font-size:86px;line-height:.95}
.ckw{position:absolute;left:70px;top:300px;width:400px;height:400px}
.ckw img{position:absolute;left:0;top:0;width:400px;filter:drop-shadow(0 18px 24px rgba(0,0,0,.35))}
.tkt{position:absolute;left:220px;top:330px;background:#FFFDF6;padding:24px 36px 26px;transform:rotate(-9deg);box-shadow:0 14px 26px rgba(0,0,0,.28);
  font-family:'DMMono';font-size:50px;letter-spacing:.02em;white-space:nowrap}
.tkt .k{font-size:26px;letter-spacing:.14em;text-transform:uppercase;color:rgba(14,14,14,.55);display:block;margin-bottom:6px}
''', photo('1554', True) + '''
<div class="hd z4" data-k="hd"></div>
<div class="ckw z4" data-move="cookie"><img data-img="cookie" src="''' + C + '''cookie.png" alt=""></div>
<div class="tkt z5" data-move="ticket"><span class="k" data-k="tk"></span><span data-k="tv"></span></div>''',
 dict(direction="Photo background: her room washed a soft green (the video's 'kept' colour) so it goes calm, she in full colour on the right, hand on her chin, curious. On the left a giant real cookie with a cream ticket sticking out of it, like a cloakroom ticket: 'session_id=117'. The plain question on top. Follows: board kind d + 'the literal object, big' (viral 1: topic word + the object).",
  thumbnail_text="What's inside a browser cookie?", kind="photo",
  titles=['What Are Browser Cookies? How Websites Remember You', 'Why Websites Need Cookies (HTTP Is Stateless)', 'How Login Cookies Work: Session IDs Explained Simply'],
  text=dict(hd="What’s inside<br>a browser cookie?", tk='Your ticket', tv='session_id=117'),
  images=dict(room=S + '1554.jpg', me=S + '1554-person.png', cookie=C + 'cookie.png'),
  vars={'--wash': '#A8E2C0', '--ground': '#A8E2C0', '--pw': '1460px', '--pl': '240px', '--pt': '-260px', '--wb': '1.5'}))

# 10 COLLAGE (photo panels + one centred line): a real cookie | her | a real cart, "cookies vs localStorage"
d('09-cookies-vs-localstorage', '''
.pn{position:absolute;top:0;height:720px;overflow:hidden}
.pn img{position:absolute;display:block}
.pn{height:540px}
.p1{left:0;width:384px}.p2{left:384px;width:512px}.p3{left:896px;width:384px;background:#FFD400}
.p1 img{left:-88px;top:-203px;width:607px}
.p2 .me{left:-180px;top:-250px;width:1500px}
.store{position:absolute;left:18px;top:150px;width:350px;background:#fff;border-radius:16px;box-shadow:0 18px 30px rgba(0,0,0,.2);padding:20px 22px 16px}
.store .lb{font-family:'DMMono';font-size:30px;letter-spacing:.04em;margin-bottom:8px}
.store .kv1{white-space:nowrap;font-family:'DMMono';font-size:36px;line-height:1.2;padding-top:10px;border-top:1px solid rgba(14,14,14,.25)}
.store .lb{color:rgba(14,14,14,.6)}
.gap{position:absolute;top:0;width:8px;height:540px;background:#fff}
.foot{position:absolute;left:0;top:540px;width:1280px;height:180px;background:#0E0E0E}
.hd{left:0;right:0;top:572px;text-align:center;font-size:104px;color:#fff}
.hd .lt{color:#fff}
''', '''<div class="pn p1 z1" data-move="panel1"><img data-img="a" src="''' + P + '''px-31116124.jpg" alt=""></div>
<div class="pn p2 z1" data-move="panel2"><img class="me" data-img="me" src="''' + S + '''1548.jpg" alt=""></div>
<div class="pn p3 z1" data-move="panel3"><div class="store"><div class="lb code" data-k="lb"></div><div class="kv1"><span data-k="k1"></span> <span class="g" data-k="v1"></span></div></div></div>
<div class="gap z2" style="left:380px"></div><div class="gap z2" style="left:892px"></div>
<div class="foot z2"></div><div class="hd z4" data-k="hd"></div>''',
 dict(direction="Photo collage, three panels with thin white gaps: a real cookie on white | her in her room (hand on her cheek, natural colour) | localStorage drawn as what it is, a small key / value store (cart, theme) on crash yellow. One centred line in white on an ink foot band: the two names people search, heavy + light. Follows: board kind b (2-4 real photo panels + one centred line: 'Living in Finland diaries', 'A PORTLAND VLOG').",
  thumbnail_text="cookies vs localStorage", kind="collage",
  titles=['localStorage vs sessionStorage vs Cookies (What Goes Where)', 'Cookies vs localStorage vs sessionStorage: Which to Use?', 'Local Storage vs Session Storage vs Cookies (Shop Example)'],
  text=dict(hd="Cookies <span class='lt'>vs</span> localStorage", lb='localStorage', k1='cart:', v1='2 items'),
  images=dict(me=S + '1548.jpg', a=P + 'px-31116124.jpg'), vars={'--ground': '#FFFFFF'}))

only = sys.argv[1:]
for name, (css, body, content, cls) in DIRS.items():
    if only and not any(name.startswith(o) for o in only): continue
    p = os.path.join(D, name); os.makedirs(p, exist_ok=True)
    open(os.path.join(p, 'index.html'), 'w').write(HEAD % (css.strip(), cls, body.strip()))
    c = dict(content); c['title'] = c['titles'][0]; c['class'] = cls
    c.setdefault('scores', '')
    json.dump(c, open(os.path.join(p, 'content.json'), 'w'), indent=1, ensure_ascii=False)
    print(name)
