# Builds the 2026-11-10 thumbnail set (10 directions, best first). WARNING: re-running OVERWRITES content.json (her studio
# edits, scores). Use only to rebuild from scratch:  python3 tools/make-set-2026-11-10.py [01 04 ...]
# Look: type set 06 (League Gothic caps = 'Dela' alias, Inter Tight = 'Fig', DM Mono), butter #F7D44C / ink #161616 /
# card #FFFDF5 / dauber orange #FF6A1A. Photos: her 29 Oct shoot, outfit A (white shirt), Enhance photo -> assets/shoot/.
import json, os, sys
D = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'directions')
HEAD = '<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../../lib/bingo.css"><style>\n%s\n</style></head><body><div class="t %s">\n%s\n</div><script src="../../lib/bind.js"></script></body></html>\n'
S = '../../assets/shoot/'; P = '../../assets/pexels/'; C = '../../assets/collage/'
def photo(n, washed=False, natural=False):
    cl = 'washed' if washed else ('natural' if natural else '')
    return ('<div class="pf %s z1" data-move="photo"><img class="room" data-img="room" src="%s%s.jpg" alt="">%s<div class="dim"></div>'
            '<img class="me" data-img="me" src="%s%s-person.png" alt=""></div>') % (cl, S, n, '<div class="wash"></div>' if washed else '', S, n)
def feed(n=3, keys=('thrift', 'coffee-talk', 'bike', 'bread', 'crochet')):
    out = ''
    for i in range(n):
        out += '<div class="post"><i class="av"></i><b class="nm"></b><img src="%s%s.jpg" alt=""><b class="ln"></b></div>' % (P, keys[i % len(keys)])
    return out
FEED_CSS = '''.scr{background:#F4F1E8;padding-top:13%}.post{margin:0 0 6%}.post .av{display:inline-block;width:9%;aspect-ratio:1;border-radius:50%;background:#C9C2B0;margin:0 3% 0 5%;vertical-align:middle}
.post .nm{display:inline-block;width:34%;height:9px;border-radius:5px;background:#D8D2C2;vertical-align:middle}.post img{display:block;width:100%;aspect-ratio:1/0.8;object-fit:cover;margin-top:4%}
.post .ln{display:block;width:70%;height:9px;border-radius:5px;background:#D8D2C2;margin:4% 5% 0}'''
DIRS = {}
def d(name, css, body, content, cls='no-lift'):
    DIRS[name] = (css, body, content, cls)

T1 = '9 Easy Things I Do Instead of Doomscrolling'
T2 = 'Things to Do Instead of Doomscrolling (That I Actually Do)'
T3 = 'How to Stop Doomscrolling: 9 Things I Do Instead'
T4 = 'What to Do Instead of Scrolling on Your Phone (9 Ideas)'
T5 = 'Hobbies Instead of Doomscrolling: What Works for Me'
T6 = 'Why Is It So Hard to Stop Doomscrolling? (9 Swaps)'
T7 = "I'm Replacing Doomscrolling With These 9 Habits"
T8 = "How to Stop Doomscrolling When You're Tired"
T9 = 'Analog Hobbies Instead of Doomscrolling (What I Do)'

# 01 PHOTO: her room washed butter, she on the right, palm up, a stack of books on her palm; I SCROLL LESS NOW
d('01-i-scroll-less-now', '''
.hd{left:56px;top:70px;font-size:205px;line-height:.84}
.books{left:985px;top:392px;width:240px;transform:rotate(-4deg)}
''', photo('1559', True) + '''
<div class="hd z4" data-k="hd"></div>
<img class="obj books z4" data-img="books" data-move="books" src="''' + C + '''books2.png" alt="">''',
 dict(direction="Photo background (her shoot, white shirt, Enhance photo): her room washed butter so it goes calm, she in full colour on the right, palm up, a stack of books sitting on her palm instead of a phone. Huge League Gothic words on the left, one word in orange. Follows: her ux-research thumbnail (room washed in one colour, she presents the object), thumbnail board 'creator holding the topic' (§3d).",
  thumbnail_text="I scroll less now", kind="photo", recommended=False, titles=[T1, T7, T3],
  text=dict(hd='I SCROLL<br><span class="acc">LESS</span> NOW'), images=dict(room=S + '1559.jpg', me=S + '1559-person.png', books=C + 'books2.png'),
  vars={'--wash': '#F7D44C', '--ground': '#F7D44C', '--pw': '1280px', '--pl': '330px', '--pt': '-200px', '--wb': '1.62', '--wc': '.55'}, title=T1))

# 02 FLAT: butter ground + quiet lines; a phone (feed) -> arrow -> books, yarn, bike; 9 EASY SWAPS; her cut-out on the right
d('02-9-easy-swaps', FEED_CSS + '''
.hd{left:52px;top:410px;font-size:196px;line-height:.82}
.sub{position:absolute;left:58px;top:600px;font-family:'Fig';font-weight:800;font-size:92px;letter-spacing:-.02em;color:#161616}
.phone{left:70px;top:46px;width:170px;height:350px;transform:rotate(-7deg)}
.arrow{left:250px;top:80px;width:200px;height:140px}
.books{left:450px;top:50px;width:240px;transform:rotate(-5deg)}
.bike{left:480px;top:220px;width:250px}
.cut{right:-70px;height:610px}
''', '''<div class="phone z3" data-move="phone"><div class="scr">''' + feed(3) + '''</div></div>
<svg class="arrow z4" data-move="arrow" viewBox="0 0 200 140"><path d="M14,104 C60,22 130,18 176,70" fill="none" stroke="#161616" stroke-width="9" stroke-linecap="round"/><path d="M146,48 L180,74 L146,96" fill="none" stroke="#161616" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/></svg>
<img class="obj books z4" data-img="books" data-move="books" src="''' + C + '''books2.png" alt=""><img class="obj bike z4" data-img="bike" data-move="bike" src="''' + C + '''bike.png" alt="">
<img class="cut z3" data-img="me" data-move="me" src="''' + S + '''1558-cut.png" alt="">
<div class="hd z5" data-k="hd"></div><div class="sub z5" data-k="sub"></div>''',
 dict(direction="Flat butter ground with a quiet same-hue line pattern. Top left: a real-looking phone with an endless feed, a hand-drawn arrow, then the things that replace it (books, yarn, a bike). Bottom left: 9 EASY SWAPS huge + 'for doomscrolling'. Right: her cut-out (shoot, white shirt), calm. Follows: her database-indexes thumbnail (thing -> arrow -> thing, one idea drawn literally), board 'tech explainer' (§3e).",
  thumbnail_text="9 easy swaps for doomscrolling", kind="flat", recommended=False, titles=[T7, T1, T4],
  text=dict(hd='9 EASY <span class="acc">SWAPS</span>', sub='for doomscrolling'), images=dict(me=S + '1558-cut.png', books=C + 'books2.png', bike=C + 'bike.png'),
  vars={'--ground': '#F7D44C'}, title=T7), cls='no-lift pat')

# 03 FLAT: ink ground; a phone whose feed runs off the bottom; THE FEED NEVER ENDS; her cut-out, hand under her chin
d('03-the-feed-never-ends', FEED_CSS + '''
.hd{left:56px;top:66px;font-size:214px;line-height:.84;color:#FFFDF5}
.phone{left:610px;top:150px;width:290px;height:640px;transform:rotate(-5deg)}
.cut{right:-110px;height:690px}
''', '''<div class="phone z3" data-move="phone"><div class="scr">''' + feed(4) + '''</div></div>
<img class="cut z2" data-img="me" data-move="me" src="''' + S + '''1551-cut.png" alt="">
<div class="hd z5" data-k="hd"></div>''',
 dict(direction="Flat off-black ground with a quiet same-hue line pattern. Huge cream League Gothic 'THE FEED NEVER ENDS' (ENDS in butter) on the left; a real-looking phone in the middle whose feed runs off the bottom of the frame; her cut-out on the right, hand under her chin, thinking. Follows: board 'tech explainer' (§3e, the literal thing), viral sample 4 (the loop drawn).",
  thumbnail_text="The feed never ends", kind="flat", recommended=False, titles=[T6, T3],
  text=dict(hd='THE FEED<br>NEVER<br><span class="acc">ENDS</span>'), images=dict(me=S + '1551-cut.png'),
  vars={'--ground': '#161616', '--accent': '#F7D44C', '--patc': 'rgba(255,253,245,.035)'}, title=T6), cls='no-lift pat')

# 04 PHOTO: her room in natural colour, DOOMSCROLLING struck through in orange + 'what I do instead'
d('04-doomscrolling-crossed-out', '''
.hd{left:0;right:0;top:30px;text-align:center;font-size:150px;color:#FFFDF5}
.hd .strike{position:relative;display:inline-block}.hd .strike::after{content:"";position:absolute;left:-2%;right:-2%;top:46%;height:14px;background:#FF6A1A;border-radius:2px}
.sub{position:absolute;left:0;right:0;top:176px;text-align:center;font-family:'Fig';font-weight:700;font-size:58px;letter-spacing:-.02em;color:#FFFDF5}
''', photo('1562', natural=True) + '''
<div class="hd z4 sh" data-k="hd"></div><div class="sub z4 sh" data-k="sub"></div>''',
 dict(direction="Photo background (her shoot, white shirt, Enhance photo): her room in its own colours, slightly darkened at the top so the words read; she in the middle, both hands under her chin, smiling. DOOMSCROLLING across the top in cream with an orange line through it, 'what I do instead' under it. Follows: Pinterest 'one word marked' pins, board 'creator large + bold claim' (§3d).",
  thumbnail_text="doomscrolling (crossed out), what I do instead", kind="photo", recommended=False, titles=[T7, T2],
  text=dict(hd='<span class="strike">DOOMSCROLLING</span>', sub='what I do instead'), images=dict(room=S + '1562.jpg', me=S + '1562-person.png'),
  vars={'--pw': '1470px', '--pl': '-110px', '--pt': '-150px', '--dim': 'linear-gradient(rgba(22,22,22,.55),rgba(22,22,22,0) 45%)'}, title=T2))

# 05 COLLAGE: her full natural photo, real objects as polaroids around her, one lowercase line
d('05-my-offline-hobbies', '''
.pol{width:290px;height:300px}
.p1{left:50px;top:60px;transform:rotate(-6deg)}.p2{right:50px;top:60px;transform:rotate(5deg)}
.p3{right:44px;top:36px;transform:rotate(5deg)}.p4{right:52px;top:330px;transform:rotate(-4deg)}
.line{position:absolute;left:0;right:0;bottom:30px;text-align:center;font-family:'Dela';font-size:170px;line-height:.9;color:#FFFDF5;text-transform:uppercase}
''', photo('1550', natural=True) + '''
<div class="pol p1 z4" data-move="p1"><img data-img="p1" src="''' + P + '''reading-sofa.jpg" alt=""></div>
<div class="pol p2 z4" data-move="p2"><img data-img="p2" src="''' + P + '''bike.jpg" alt=""></div>

<div class="line z5 sh" data-k="line"></div>''',
 dict(direction="Collage over her full photo (her shoot, white shirt, room in natural colour): four real photos pinned round her (crochet, a bike, someone reading on a sofa, a thrift shop table), one big soft-sans lowercase line across the foot. Follows: 'the art of offline living', 'Living in Finland diaries' (board §3b), her collage samples.",
  thumbnail_text="offline hobbies", kind="collage", recommended=False, titles=[T2, T3],
  text=dict(line='OFFLINE <span style="color:#F7D44C">HOBBIES</span>'), images=dict(room=S + '1550.jpg', me=S + '1550-person.png', p1=P + 'reading-sofa.jpg', p2=P + 'bike.jpg'),
  vars={'--pw': '1280px', '--pl': '0px', '--pt': '-120px', '--dim': 'linear-gradient(rgba(22,22,22,0) 55%,rgba(22,22,22,.6))'}, title=T2))

# 06 PHOTO: her room washed ink (night), hand on her cheek, tired; TOO TIRED TO STOP SCROLLING?
d('06-too-tired-to-stop', '''
.hd{left:56px;top:84px;font-size:184px;line-height:.86;color:#FFFDF5}
''', photo('1564', True) + '''
<div class="hd z4" data-k="hd"></div>''',
 dict(direction="Photo background (her shoot, white shirt, Enhance photo): her room washed dark like late at night, she in full colour on the right, hand on her cheek, tired. Cream League Gothic question on the left, TIRED in butter. Follows: board 'creator large + bold claim' (§3d), viral sample 5 (her doing the topic).",
  thumbnail_text="Too tired to stop scrolling?", kind="photo", recommended=True, titles=[T1, T8, T3],
  text=dict(hd='TOO <span class="acc">TIRED</span><br>TO STOP<br>SCROLLING?'), images=dict(room=S + '1564.jpg', me=S + '1564-person.png'),
  vars={'--wash': '#3A3A44', '--ground': '#161616', '--accent': '#F7D44C', '--pw': '1300px', '--pl': '300px', '--pt': '-230px', '--wb': '1.2'}, title=T1))

# 07 PHOTO: her room washed orange, her palm raised (stop); PUT THE PHONE DOWN; a phone on its face at the corner
d('07-put-the-phone-down', '''
.hd{left:56px;top:70px;font-size:190px;line-height:.84;color:#161616}
''', photo('1550', True) + '''
<div class="hd z4" data-k="hd"></div>''',
 dict(direction="Photo background (her shoot, white shirt, Enhance photo): her room washed dauber orange, she in full colour on the right with her palm raised like 'stop'. Ink League Gothic words on the left. Follows: board 'creator large + bold claim' (§3d), 'JUST WAIT' (a plain instruction).",
  thumbnail_text="Put the phone down", kind="photo", recommended=False, titles=[T3, T1],
  text=dict(hd='PUT THE<br>PHONE<br><span style="color:#FFFDF5">DOWN</span>'), images=dict(room=S + '1550.jpg', me=S + '1550-person.png'),
  vars={'--wash': '#FF6A1A', '--ground': '#FF6A1A', '--pw': '1300px', '--pl': '300px', '--pt': '-170px', '--wb': '1.55'}, title=T3))

# 08 COLLAGE GRID: a 3x3 card of real photos, her in the middle square; 9 THINGS TO DO OFFLINE
G = ['openbook', 'bike', 'call', None]
grid = ''.join('<div class="sq">%s</div>' % ('<img data-img="g%d" src="%s%s.jpg" alt="">' % (i, P, k) if k else '<img data-img="me" class="meimg" src="' + S + '1557.jpg" alt="">') for i, k in enumerate(G))
d('08-9-things-to-do-offline', '''
.hd{left:50px;top:66px;font-size:200px;line-height:.84;color:#FFFDF5}
.card{left:640px;top:40px;width:600px;height:640px;padding:10px;background:#FFFDF5}
.card .grid{background:#FFFDF5;height:100%;grid-template-rows:repeat(2,1fr);grid-template-columns:repeat(2,1fr);gap:8px}
.card .sq img.meimg{object-position:46% 30%;transform:scale(1.7);transform-origin:47% 40%}
''', '''<div class="hd z4" data-k="hd"></div>
<div class="card z3" data-move="card"><div class="grid">''' + grid + '''</div></div>''',
 dict(direction="Collage grid: a bingo card of nine real photos (a book, two friends talking, a bike, a thrift table, her in the middle square, a long read on a tablet, push-ups, a journal, a phone call), off-black ground with quiet lines, huge cream words on the left, OFFLINE in butter. Follows: tile-collage outliers (Benni Erler, Veronika Mark), board §3b.",
  thumbnail_text="9 things to do offline", kind="collage", recommended=False, titles=['9 Things to Do Offline Instead of Scrolling', T4],
  text=dict(hd='9 THINGS<br>TO DO<br><span class="acc">OFFLINE</span>'), images=dict(me=S + '1557.jpg', **{'g%d' % i: P + k + '.jpg' for i, k in enumerate(G) if k}),
  vars={'--ground': '#161616', '--accent': '#F7D44C', '--patc': 'rgba(255,253,245,.035)'}, title='9 Things to Do Offline Instead of Scrolling'), cls='no-lift pat')

# 09 FLAT: cream paper, a flat-lay of real things (books, yarn, notebook, bag, plant, bread), the phone face down; ANALOG HOBBIES
d('09-analog-hobbies', '''
.hd{left:56px;top:96px;font-size:230px;line-height:.82}
.books{left:560px;top:40px;width:330px;transform:rotate(-8deg)}.yarn{left:880px;top:40px;width:200px;transform:rotate(10deg)}
.notebook{left:560px;top:420px;width:300px;transform:rotate(12deg)}.cut{right:-60px;height:430px}
.bread{left:640px;top:560px;width:230px;transform:rotate(-4deg)}
.phone{left:640px;top:590px;width:120px;height:250px;transform:rotate(78deg)}.phone .scr{background:#1E1E22}
''', '''<div class="hd z4" data-k="hd"></div>
<img class="obj books z3" data-img="books" data-move="books" src="''' + C + '''books.png" alt=""><img class="obj yarn z3" data-img="yarn" data-move="yarn" src="''' + C + '''yarn.png" alt="">
<img class="obj notebook z3" data-img="notebook" data-move="notebook" src="''' + C + '''notebook.png" alt=""><img class="cut z2" data-img="me" data-move="me" src="''' + S + '''1561-cut.png" alt="">''',
 dict(direction="Flat cream paper with a quiet line pattern, no face: a tidy flat-lay of real things (old books, blue yarn, a notebook, a handbag, banana bread) and her cut-out bottom right, hand on her cheek. 'MY ANALOG HOBBIES' huge on the left, ANALOG in orange. Follows: viral sample 2 (the objects are the outcome), board §3c (the objects ARE the topic).",
  thumbnail_text="My analog hobbies", kind="flat", recommended=False, titles=[T3, T1],
  text=dict(hd='MY<br><span class="acc">ANALOG</span><br>HOBBIES'), images=dict(books=C + 'books.png', yarn=C + 'yarn.png', notebook=C + 'notebook.png', me=S + '1561-cut.png'),
  vars={'--ground': '#F1ECDF'}, title=T3), cls='no-lift pat')

# 10 OTHER: before / after split, no face: phone in bed at night (grey) | reading on a sofa (warm); LESS PHONE / MORE LIFE
d('10-less-phone-more-life', '''
.half{position:absolute;top:0;width:640px;height:720px;overflow:hidden}.half img{width:100%;height:100%;object-fit:cover}
.l{left:0}.l img{filter:grayscale(1) brightness(.75) contrast(1.1);object-position:50% 50%}.r{left:640px}.r img{object-position:40% 50%}
.div{position:absolute;left:636px;top:0;width:8px;height:720px;background:#F7D44C}
.h1,.h2{position:absolute;bottom:40px;font-family:'Dela';font-size:150px;line-height:.84;text-transform:uppercase}
.h1{left:44px;color:#FFFDF5}.h2{left:684px;color:#F7D44C}
''', '''<div class="half l z1" data-move="left"><img data-img="left" src="''' + P + '''night-phone.jpg" alt=""></div>
<div class="half r z1" data-move="right"><img data-img="right" src="''' + P + '''reading-sofa.jpg" alt=""></div><div class="div z2"></div>
<div class="h1 z4 sh" data-k="h1"></div><div class="h2 z4 sh" data-k="h2"></div>''',
 dict(direction="Before / after split, no face: left a phone glowing in bed at night (grey), right someone reading on a sofa in daylight (warm); a thin butter line between. 'LESS PHONE' cream on the left, 'MORE LIFE' butter on the right. Follows: her saved before / after and Day 1 / Day 900 splits (board §3f: the topic IS a change).",
  thumbnail_text="Less phone, more life", kind="other", recommended=False, titles=[T4, T7],
  text=dict(h1='LESS<br>PHONE', h2='MORE<br>LIFE'), images=dict(left=P + 'night-phone.jpg', right=P + 'reading-sofa.jpg'),
  vars={'--ground': '#161616'}, title=T4), cls='')

NEW = {'06-too-tired-to-stop': '01-too-tired-to-stop', '10-less-phone-more-life': '02-less-phone-more-life', '01-i-scroll-less-now': '03-i-scroll-less-now',
  '03-the-feed-never-ends': '04-the-feed-never-ends', '07-put-the-phone-down': '05-put-the-phone-down', '02-9-easy-swaps': '06-9-easy-swaps',
  '04-doomscrolling-crossed-out': '07-doomscrolling-crossed-out', '08-9-things-to-do-offline': '08-9-things-to-do-offline',
  '05-my-offline-hobbies': '09-offline-hobbies', '09-analog-hobbies': '10-analog-hobbies'}   # best first (cold test 2026-11-10)
DIRS = {NEW.get(k, k): v for k, v in DIRS.items()}
only = sys.argv[1:]
for name, (css, body, content, cls) in DIRS.items():
    if only and not any(name.startswith(o) for o in only): continue
    p = os.path.join(D, name); os.makedirs(p, exist_ok=True)
    open(os.path.join(p, 'index.html'), 'w').write(HEAD % (css.strip(), cls, body.strip()))
    c = dict(content); c['class'] = (c.get('class', '') + ' ' + cls).strip(); c.setdefault('scores', '')
    json.dump(c, open(os.path.join(p, 'content.json'), 'w'), indent=1, ensure_ascii=False)
json.dump(sorted(x for x in os.listdir(D) if os.path.isdir(os.path.join(D, x))), open(os.path.join(D, 'index.json'), 'w'))
print('ok', len(DIRS))
