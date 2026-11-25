# Wrote the FIRST version of directions 02-18 (2026-11-03). Frozen: from now on the source of truth is each
# directions/<name>/{index.html,content.json} (she edits content.json in the studio). Re-running would overwrite her edits:
#   python3 tools/gen-first-version.py --force
import json, os, sys
if '--force' not in sys.argv: sys.exit('frozen: pass --force to overwrite directions 02-18')
HERE = os.path.dirname(os.path.abspath(__file__)); D = os.path.join(HERE, '..', 'directions')
A = '../../assets/'
T = {  # kit section 1a titles
 1: "9 Easy Things I Do Instead of Doomscrolling",
 2: "Things to Do Instead of Doomscrolling (That I Actually Do)",
 3: "How to Stop Doomscrolling: 9 Things I Do Instead",
 4: "What to Do Instead of Scrolling on Your Phone (9 Ideas)",
 5: "Hobbies Instead of Doomscrolling: What Works for Me",
 6: "Why Is It So Hard to Stop Doomscrolling? (9 Swaps)",
 7: "I'm Replacing Doomscrolling With These 9 Habits",
 8: "How to Stop Doomscrolling When You're Tired",
 9: "Analog Hobbies Instead of Doomscrolling (What I Do)",
 10: "Doomscrolling Is Designed to Never End. This Is What I Do",
}
def scene(room, me, cls='', wash=True, dim=False):
    w = '<div class="wash"></div>' if wash else ''
    d = '<div class="dim"></div>' if dim else ''
    s = f'<div class="scene z1 {cls}" data-move="room"><img class="bg" data-img="room" src="{room}" alt="">{w}{d}</div>'
    if me is not False: s += f'\n<div class="scene z3 {cls}" data-move="her"><img class="me-c" data-img="me" src="{me}" alt=""></div>'
    return s
def obj(key, cls='obj', z='z4'):
    return f'<img class="{cls} {key} {z}" data-img="{key}" data-move="{key}" src="" alt="">'
ARROW = lambda cls, path, head, col='#161616', w=9: f'<svg class="arrow {cls} z4" data-move="{cls}" viewBox="0 0 300 200"><path d="{path}" fill="none" stroke="{col}" stroke-width="{w}" stroke-linecap="round"/><path d="{head}" fill="none" stroke="{col}" stroke-width="{w}" stroke-linecap="round" stroke-linejoin="round"/></svg>'

dirs = []
def add(name, kind, words, titles, direction, text, images, vars_, css, body, extra=None):
    c = {'direction': direction, 'thumbnail_text': words, 'titles': [T[i] for i in titles], 'title': T[titles[0]], 'kind': kind,
         'text': text, 'images': images, 'vars': vars_}
    if extra: c.update(extra)
    dirs.append((name, c, css, body))

# 02 photo: natural (warmed) room, she left, the bingo card of photos on the right
SQ = ['read-eat', 'busstop', 'coffee-talk', 'crochet', 'thrift', 'reading-sofa', 'kettle', 'pray', 'call']
sqhtml = ''.join(f'<div class="sq{" now" if i == 8 else ""}"><img data-img="p{i+1}" src="" alt=""><div class="dot" style="left:-18px;top:-20px;width:84px;height:80px"></div><div class="n" style="left:10px;top:8px;font-size:34px">{i+1:02d}</div></div>' for i in range(9))
add('02-offline-bingo', 'photo', 'OFFLINE BINGO', [1, 4, 7],
    "Photo background in natural colour (warmed): she sits left, calm, closed mouth; on the right the film's bingo card, nine squares = nine offline things (Pexels photos: reading at the table, a bus stop, coffee with a friend, crochet, a thrift shop, reading on the sofa, a kettle, prayer, a phone call to someone), each numbered and daubed orange. References: her ux-research thumbnail (her photo + one big drawn idea), outliers with 3-9 tile collages (Benni Erler, Veronika Mark).",
    {'hd': 'Offline<br>bingo'}, {'room': A + 'frames/f_22.0.jpg', 'me': A + 'scene/gbemi-22.0-person.png', **{f'p{i+1}': A + f'pexels/{n}.jpg' for i, n in enumerate(SQ)}},
    {'--bgb': '1.3', '--sc': '1.34', '--sc-x': '-300px', '--sc-y': '70px'},
    '.hd{left:40px;top:34px;font-size:96px;color:#fff;line-height:.95}.hd{text-shadow:0 4px 0 rgba(0,0,0,.25),0 12px 30px rgba(0,0,0,.45)}\n.card{left:690px;top:40px;width:560px}.card .grid{height:616px;grid-template-rows:repeat(3,1fr)}',
    scene('', '', 'natural', wash=False) + '\n<div class="hd z5" data-k="hd"></div>\n<div class="card z4" data-move="card"><div class="grid">' + sqhtml + '</div></div>')

# 03 photo: room washed ink, OFFLINE huge behind her head (text woven into the photo), 'hobbies' serif, yarn + bread
add('03-offline-hobbies', 'photo', 'OFFLINE HOBBIES', [9, 5],
    "Photo background washed near-black, she in full colour in the middle (calm, closed mouth); OFFLINE huge in butter BEHIND her head (text woven into the scene, her Pinterest board), 'hobbies' in a white serif in front; a ball of yarn and a loaf of banana bread (Pexels die-cuts) at her shoulders. References: Pinterest 'COOK' / 'WRITING a book' (big word behind the head), outlier 'What Happens When You Ditch Your Phone For Hobbies?'.",
    {'hd': 'OFFLINE', 'sub': 'hobbies'}, {'room': A + 'frames/f_22.8.jpg', 'me': A + 'scene/gbemi-22.8-person.png', 'yarn': A + 'collage/yarn.png', 'bread': A + 'collage/bread.png'},
    {'--wash': '#2A2A2A', '--bgb': '1.2', '--sc': '1.18', '--sc-x': '0px', '--sc-y': '60px', '--fg': '#F7D44C'},
    '.hd{left:0;right:0;text-align:center;top:40px;font-size:226px;color:var(--fg)}\n.sub{position:absolute;left:0;right:0;text-align:center;top:500px;font-size:168px;color:#fff;line-height:1}\n.yarn{left:40px;top:430px;width:250px;transform:rotate(-8deg)}\n.bread{left:960px;top:440px;width:300px;transform:rotate(6deg)}',
    scene('', '').replace('<div class="scene z1 " data-move="room">', '<div class="scene z1" data-move="room">').split('\n')[0] + '\n<div class="hd z2" data-k="hd"></div>\n' + scene('', '').split('\n')[1] + '\n<div class="sub serif shadow-t z5" data-k="sub"></div>\n' + obj('yarn', 'stk') + obj('bread', 'stk'))

# 04 photo split: butter panel left with READ + the open book, her photo on the right
add('04-read-instead', 'photo', 'READ INSTEAD OF SCROLLING', [2, 1, 4],
    "Split: a flat butter panel on the left with READ huge (daubed orange) and 'instead of scrolling', a big open book die-cut (Pexels) tilted over the seam; her photo on the right in natural colour, hand raised in a small pinch as if holding a page. References: her database-indexes thumbnail (topic huge, one literal object), Pinterest 'how to be consistent' (person studying among books).",
    {'hd': '<span class="daub">READ</span>', 'sub': 'instead of<br>scrolling'}, {'room': A + 'frames/f_47.0.jpg', 'me': A + 'scene/gbemi-47.0-person.png', 'book': A + 'collage/openbook.png'},
    {'--bgb': '1.3', '--sc': '1.2', '--sc-x': '330px', '--sc-y': '70px'},
    '.panel{position:absolute;left:0;top:0;width:600px;height:720px;background:var(--ground)}\n.hd{left:56px;top:60px;font-size:200px;--dl:-6%;--dw:112%;--dt:6%;--dh:92%;--dr:-3deg}\n.sub{position:absolute;left:58px;top:280px;font-size:84px;line-height:.98;font-weight:900;letter-spacing:-.03em}\n.book{left:300px;top:420px;width:330px;transform:rotate(-12deg)}',
    scene('', '', 'natural', wash=False) + '\n<div class="panel z2" data-move="panel"></div>\n<div class="hd z4" data-k="hd"></div><div class="sub z4" data-k="sub"></div>\n' + obj('book'))

# 05 photo B&W: hand on head, tired; TIRED daubed (the one colour)
add('05-too-tired-to-stop', 'photo', 'TOO TIRED TO STOP SCROLLING?', [8, 6],
    "Photo in black and white, she in black and white too, one hand pushing her hair back (closed mouth, worn out); the only colour is the orange daub on TIRED. Text stacked on the left. References: viral sample 5 (her doing the topic), Pinterest 'Why You're Stuck' (one highlighted word), her ux-research method (photo calmed to one tone).",
    {'hd1': 'Too', 'hd2': '<span class="daub">tired</span>', 'hd3': 'to stop', 'hd4': 'scrolling?'}, {'room': A + 'frames/f_96.5.jpg', 'me': A + 'scene/gbemi-96.5-person.png'},
    {'--wash': '#FFFFFF', '--bgb': '1.25', '--sc': '1.28', '--sc-x': '230px', '--sc-y': '60px', '--fg': '#FFFDF5'},
    '.hd{left:50px;color:var(--fg);text-shadow:0 6px 24px rgba(0,0,0,.45)}.hd1{top:60px;font-size:96px}.hd2{top:160px;font-size:150px;color:#161616;text-shadow:none;--dl:-6%;--dw:112%;--dt:2%;--dh:100%;--dr:-3deg}.hd3{top:330px;font-size:96px}.hd4{top:430px;font-size:96px}',
    scene('', '', 'bw', wash=False, dim=True) + '\n' + ''.join(f'<div class="hd hd{i} z4" data-k="hd{i}"></div>' for i in range(1, 5)),
    extra={'class': ''})

# 06 photo: a big taped note, MY NO-PHONE LIST, she glances at it
items = ['Read', 'Let myself be bored', 'Small talk', 'Make friends', 'Try something new', 'Long reads', 'Move', 'Pray + journal', 'Call my people']
note = ''.join(f'<div class="li"><span class="nn">{i+1}</span><span data-k="i{i+1}"></span></div>' for i in range(9))
add('06-my-no-phone-list', 'photo', 'MY NO-PHONE LIST', [1, 7],
    "Photo background in natural colour, she on the right glancing left at a big cream note taped to the scene: 'MY NO-PHONE LIST' in Dela and her nine things written in a list, each number daubed orange. References: Pinterest 'adulting habits' (a written list in the scene), viral 9 (the list as the picture), her calm closed-mouth face.",
    {'hd': 'My no-phone list', **{f'i{i+1}': t for i, t in enumerate(items)}}, {'room': A + 'frames/f_1072.8.jpg', 'me': A + 'scene/gbemi-1072.8-person.png'},
    {'--bgb': '1.25', '--sc': '1.3', '--sc-x': '300px', '--sc-y': '60px'},
    '.note{position:absolute;left:46px;top:46px;width:560px;height:628px;background:var(--card);padding:34px 40px;transform:rotate(-2.5deg);box-shadow:0 20px 40px rgba(0,0,0,.35)}\n.note .tape{left:220px;top:-18px;transform:rotate(3deg)}\n.note .hd{position:relative;font-size:56px;white-space:normal;line-height:.95}\n.li{display:flex;align-items:center;gap:18px;font-weight:800;font-size:33px;letter-spacing:-.01em;line-height:1;margin-top:13px}\n.nn{position:relative;font-family:Dela;width:44px;height:44px;display:flex;align-items:center;justify-content:center;font-size:26px}\n.nn::before{content:"";position:absolute;inset:-2px;background:var(--accent,#FF6A1A);border-radius:46% 54% 42% 58% / 55% 45% 58% 42%;z-index:-1}\n.li .nn{z-index:0}',
    scene('', '', 'natural', wash=False) + '\n<div class="note z4" data-move="note"><div class="tape"></div><div class="hd" data-k="hd"></div><div style="margin-top:18px">' + note + '</div></div>')

# 07 photo washed orange: LESS PHONE, MORE OF THIS -> bag, bread, plant
add('07-less-phone-more-this', 'photo', 'LESS PHONE, MORE OF THIS', [7, 4],
    "Photo background washed dauber orange, she in full colour on the right, smiling with her eyes closed; 'LESS PHONE,' in white and 'MORE OF THIS' in ink across the top-left; a marker arrow points down to three die-cut offline things (a thrifted bag, banana bread, a plant). References: her ux-research thumbnail (one-colour wash, few big props, one arrow), viral 9 (the objects are the outcome).",
    {'hd1': 'Less phone,', 'hd2': 'more of this'}, {'room': A + 'frames/f_822.3.jpg', 'me': A + 'scene/gbemi-822.3-person.png', 'bag': A + 'collage/bag.png', 'bread': A + 'collage/bread.png', 'plant': A + 'collage/plant.png'},
    {'--wash': '#FF6A1A', '--bgb': '1.7', '--bgc': '.8', '--sc': '1.3', '--sc-x': '300px', '--sc-y': '80px'},
    '.hd{left:44px}.hd1{top:40px;font-size:92px;color:#fff}.hd2{top:140px;font-size:92px;color:#161616}\n.bag{left:40px;top:400px;width:250px;transform:rotate(-5deg)}.bread{left:270px;top:470px;width:270px;transform:rotate(4deg)}.plant{left:540px;top:330px;width:200px}\n.a1{left:300px;top:240px;width:180px;height:140px}',
    scene('', '') + '\n<div class="hd hd1 z5 shadow-t" data-k="hd1"></div><div class="hd hd2 z5" data-k="hd2"></div>\n' + obj('bag', 'stk') + obj('bread', 'stk') + obj('plant', 'stk') + '\n' + ARROW('a1', 'M20,20 C110,10 160,60 150,150', 'M120,128 L152,160 L176,122', '#fff'))

# 08 collage over her full natural photo: my offline list (kit T1)
add('08-collage-my-offline-list', 'collage', 'my offline list', [1, 10],
    "Collage over her full natural photo (warmed, she centred, calm): small die-cut offline things float around her (a book stack, yarn, a bike, banana bread, a thrifted bag, a plant, a notebook), one big white serif line 'my offline list' across the middle, three tiny handwritten notes. Kit T1. References: her collage samples ('Time to lock in.', 'Thought of these?'), viral 9.",
    {'hd': 'my offline list', 'n1': 'read while I eat', 'n2': 'thrift-store bags', 'n3': 'banana bread (still failing)'},
    {'room': A + 'frames/f_19.5.jpg', 'me': A + 'scene/gbemi-19.5-person.png', 'books': A + 'collage/books2.png', 'yarn': A + 'collage/yarn.png', 'bike': A + 'collage/bike.png', 'bread': A + 'collage/bread.png', 'bag': A + 'collage/bag.png', 'plant': A + 'collage/plant.png', 'notebook': A + 'collage/notebook.png'},
    {'--bgb': '1.3', '--sc': '1.08', '--sc-x': '0px', '--sc-y': '30px'},
    '.hd{position:absolute;left:0;right:0;top:300px;text-align:center;font-size:150px;color:#fff;line-height:1}\n.books{left:70px;top:40px;width:200px;transform:rotate(-8deg)}.yarn{left:1010px;top:40px;width:170px;transform:rotate(10deg)}\n.bike{left:40px;top:500px;width:270px;transform:rotate(-4deg)}.bread{left:960px;top:520px;width:250px;transform:rotate(5deg)}\n.bag{left:250px;top:150px;width:150px;transform:rotate(6deg)}.plant{left:900px;top:150px;width:120px;transform:rotate(-4deg)}.notebook{left:1080px;top:290px;width:170px;transform:rotate(12deg)}\n.n{position:absolute;color:#fff;font-size:44px;text-shadow:0 2px 10px rgba(0,0,0,.6)}.n1{left:60px;top:250px;transform:rotate(-4deg)}.n2{left:250px;top:640px;transform:rotate(-3deg)}.n3{left:830px;top:470px;transform:rotate(3deg)}',
    scene('', '', 'natural', wash=False) + '\n' + ''.join(obj(k, 'stk', 'z4') for k in ['books', 'yarn', 'bike', 'bread', 'bag', 'plant', 'notebook']) + '\n<div class="hd serif shadow-t z5" data-k="hd"></div>\n' + ''.join(f'<div class="n n{i} hand z5" data-k="n{i}"></div>' for i in (1, 2, 3)))

# 09 collage: polaroids taped round her, 'what I do instead of scrolling'
pols = [('p1', 'read-eat', 'read', 'left:40px;top:60px;width:250px;height:230px;transform:rotate(-6deg)'),
        ('p2', 'busstop', 'be bored', 'left:990px;top:50px;width:250px;height:230px;transform:rotate(5deg)'),
        ('p3', 'coffee-talk', 'talk to people', 'left:60px;top:330px;width:250px;height:230px;transform:rotate(4deg)'),
        ('p4', 'crochet', 'make something', 'left:970px;top:330px;width:260px;height:230px;transform:rotate(-5deg)')]
polh = ''.join(f'<div class="pol z4" data-move="{k}" style="{st}"><img data-img="{k}" src="" alt=""><div class="cap" data-k="c{k[1]}"></div><div class="tape" style="left:70px;top:-16px;transform:rotate(-4deg)"></div></div>' for k, n, c, st in pols)
add('09-collage-what-i-do-instead', 'collage', 'what I do instead of scrolling', [2, 1, 3],
    "Collage over her natural photo washed butter yellow (she in full colour, centred, calm): four taped polaroids (Pexels stand-ins: reading at the table, a bus stop, coffee with a friend, crochet) with handwritten captions, one big serif line 'what I do instead of scrolling' along the bottom. References: her collage samples, Pinterest polaroid inserts, outlier 'What to do instead of scrolling' (Wendy Huang).",
    {'hd': 'what I do instead <span class="acc2">of scrolling</span>', **{f'c{k[1]}': c for k, n, c, st in pols}},
    {'room': A + 'frames/f_22.0.jpg', 'me': A + 'scene/gbemi-22.0-person.png', **{k: A + f'pexels/{n}.jpg' for k, n, c, st in pols}},
    {'--wash': '#F7D44C', '--bgb': '2.1', '--bgc': '.72', '--sc': '1.05', '--sc-x': '0px', '--sc-y': '20px'},
    '.hd{position:absolute;left:0;right:0;bottom:22px;text-align:center;font-size:104px;color:#161616;line-height:1;white-space:nowrap}\n.band{position:absolute;left:0;right:0;bottom:0;height:150px;background:var(--card)}\n.acc2{color:var(--accent,#FF6A1A)}',
    scene('', '') + '\n' + polh + '\n<div class="band z4" data-move="band"></div><div class="hd serif z5" data-k="hd"></div>')

# 10 collage grid: 2x2 tiles, her photo in one, WHAT I DO INSTEAD band
add('10-collage-grid-what-i-do-instead', 'collage', 'WHAT I DO INSTEAD', [2, 7],
    "A 2x2 grid of four big photos: her (natural colour, calm) top-left, then a book at the table, a bike, and a thrift shop (Pexels stand-ins), split by thin ink lines; across the middle an ink band 'WHAT I DO INSTEAD' with 'of doomscrolling' in a butter box. Kit T5 (four big tiles beat nine small ones). References: tile collages of Benni Erler / Veronika Mark outliers.",
    {'hd': 'What I do instead', 'sub': 'of doomscrolling'},
    {'me': A + 'frames/f_22.8.jpg', 'p2': A + 'pexels/read-eat.jpg', 'p3': A + 'pexels/bike.jpg', 'p4': A + 'pexels/thrift.jpg'},
    {},
    '.g4{position:absolute;inset:0;display:grid;grid-template-columns:1fr 1fr;grid-template-rows:1fr 1fr;gap:8px;background:#161616}\n.g4 img{width:100%;height:100%;object-fit:cover;display:block}\n.g4 .me{object-position:50% 40%;filter:brightness(1.3) contrast(1.05) sepia(.14)}\n.bandx{position:absolute;left:0;right:0;top:282px;height:156px;background:#161616;display:flex;align-items:center;justify-content:center;gap:24px}\n.bandx .hd{position:static;font-size:76px;color:var(--card)}\n.bandx .sub{font-family:Fig;font-weight:900;font-size:50px;background:var(--butter);color:#161616;padding:4px 14px;letter-spacing:-.02em;white-space:nowrap}',
    '<div class="g4 z1" data-move="grid"><img class="me" data-img="me" src="" alt=""><img data-img="p2" src="" alt=""><img data-img="p3" src="" alt=""><img data-img="p4" src="" alt=""></div>\n<div class="bandx z4" data-move="band"><div class="hd" data-k="hd"></div><div class="sub" data-k="sub"></div></div>')

# 11 collage 'time to lock in' style: her full photo, one serif line, tiny labels + two small objects
add('11-collage-less-scrolling', 'collage', 'less scrolling.', [3, 7],
    "Collage over her full natural photo (warmed, she smiling with her eyes closed): one big serif line 'less scrolling.' across the middle with 'more living' tucked under in handwriting; three small white labels scattered ('read at dinner', 'bus stop, no phone', 'call my mum') and two small die-cuts (an open book, a kettle). References: her collage sample 'Time to lock in.' (one serif line + 2-4 tiny labels), 'in defense of being online'.",
    {'hd': 'less scrolling.', 'n0': 'more living', 'n1': 'read at dinner', 'n2': 'bus stop, no phone', 'n3': 'call my mum'},
    {'room': A + 'frames/f_822.3.jpg', 'me': A + 'scene/gbemi-822.3-person.png', 'book': A + 'collage/openbook.png', 'kettle': A + 'collage/kettle.png'},
    {'--bgb': '1.2', '--sc': '1.12', '--sc-x': '0px', '--sc-y': '40px'},
    '.hd{position:absolute;left:0;right:0;top:330px;text-align:center;font-size:170px;color:#fff;line-height:1}\n.n0{position:absolute;left:640px;top:500px;font-size:80px;color:var(--butter);transform:rotate(-4deg);text-shadow:0 2px 12px rgba(0,0,0,.6)}\n.lb{position:absolute;color:#fff;font-weight:700;font-size:30px;text-shadow:0 2px 10px rgba(0,0,0,.7)}.n1{left:120px;top:150px}.n2{left:900px;top:120px}.n3{left:110px;top:590px}\n.book{left:40px;top:200px;width:200px;transform:rotate(-8deg)}.kettle{left:1050px;top:170px;width:150px;transform:rotate(5deg)}',
    scene('', '', 'natural', wash=False) + '\n' + obj('book', 'stk') + obj('kettle', 'stk') + '\n<div class="hd serif shadow-t z5" data-k="hd"></div><div class="n0 hand z5" data-k="n0"></div>\n' + ''.join(f'<div class="lb n{i} z5" data-k="n{i}"></div>' for i in (1, 2, 3)))

# 12 flat: full bingo card + her B&W cut-out with orange outline
labels = ['Read', 'Be bored', 'Small talk', 'Make friends', 'New hobby', 'Long reads', 'Move', 'Pray', 'Call home']
sq12 = ''.join(f'<div class="sq{" now" if i == 8 else ""}">{"" if i == 8 else "<div class=dot style=left:20px;top:14px;width:120px;height:100px></div>"}<div class="n" style="left:16px;top:12px;font-size:40px">{i+1:02d}</div><div class="l" data-k="l{i+1}" style="left:16px;bottom:14px;font-size:27px"></div></div>' for i in range(9))
add('12-flat-bingo-card', 'flat', 'INSTEAD OF DOOMSCROLLING', [1, 3],
    "Flat butter ground: the film's bingo card big on the right (nine squares = nine things she does instead, eight daubed orange, the ninth ringed: almost a full card), 'INSTEAD OF DOOMSCROLLING' stacked on the left, her black-and-white cut-out with an orange outline under it. References: her database-indexes thumbnail (topic in plain words, one literal drawn idea, her B&W cut-out with an orange outline), the film's look A.",
    {'hd1': 'Instead of', 'hd2': 'doom-', 'hd3': 'scrolling', **{f'l{i+1}': t for i, t in enumerate(labels)}},
    {'me': A + 'cut/gbemi-22.0.png'}, {},
    '.hd{left:44px}.hd1{top:40px;font-size:72px}.hd2{top:120px;font-size:100px}.hd3{top:216px;font-size:100px}\n.card{left:660px;top:30px;width:590px}.card .grid{height:648px;grid-template-rows:repeat(3,1fr)}\n.cut{left:110px;height:400px}',
    ''.join(f'<div class="hd hd{i} z4" data-k="hd{i}"></div>' for i in (1, 2, 3)) + '\n<img class="cut bw z3" data-img="me" data-move="her" src="" alt="">\n<div class="card z4" data-move="card"><div class="grid">' + sq12 + '</div></div>')

# 13 flat ink: a book that ends vs a feed that doesn't
add('13-flat-books-end-feeds-dont', 'flat', 'THE FEED NEVER ENDS', [3, 6, 10],
    "Flat ink ground, no face: a big open book (Pexels die-cut) whose last page says 'The End' in handwriting, beside a small generic dark phone whose feed cards run off the bottom of the frame; 'THE FEED NEVER ENDS' in butter across the top, the word ENDS daubed. Kit T2 (the cold reviewer's top pick with title 3). Deliberately book-led, unlike the phone-led thumbnails of the earlier phone video. References: viral 4 (the loop drawn), her database-indexes bar.",
    {'hd1': 'The feed', 'hd2': 'never <span class="daub">ends</span>', 'end': 'The End'},
    {'book': A + 'collage/openbook.png'}, {'--ground': '#161616', '--fg': '#F7D44C'},
    '.hd{left:50px}.hd1{top:44px;font-size:110px}.hd2{top:160px;font-size:110px}.hd2 .daub{color:#161616;--dl:-6%;--dw:112%;--dt:4%;--dh:96%}\n.book{left:70px;top:330px;width:420px;transform:rotate(-8deg)}\n.end{position:absolute;left:330px;top:490px;font-size:64px;color:#161616;transform:rotate(-10deg)}\n.phone{left:760px;top:120px;width:330px;height:700px;transform:rotate(6deg)}\n.feed{position:absolute;left:18px;right:18px;top:18px}\n.fc{background:#3a3a3a;border-radius:16px;height:150px;margin-bottom:14px;position:relative}\n.fc::after{content:"";position:absolute;left:16px;bottom:16px;width:60%;height:14px;border-radius:7px;background:#555}',
    '<div class="hd hd1 z4" data-k="hd1"></div><div class="hd hd2 z4" data-k="hd2"></div>\n' + obj('book') + '<div class="end hand z5" data-k="end"></div>\n<div class="phone z4" data-move="phone"><div class="scr"><div class="feed">' + '<div class="fc"></div>' * 5 + '</div></div></div>')

# 14 flat: phone face down -> arrow -> the swaps
add('14-flat-9-easy-swaps', 'flat', '9 EASY SWAPS', [7, 4],
    "Flat butter ground, no face: on the left a generic phone lying face down with an ink X; a big marker arrow carries the eye to a pile of the things that replace it (book stack, yarn, bike, banana bread, plant, notebook as die-cuts). '9 EASY SWAPS' huge along the bottom, 'for doomscrolling' in an ink box. References: viral 4 (the idea drawn literally), her database-indexes thumbnail (thing → arrow → thing).",
    {'hd': '9 easy swaps', 'sub': 'for doomscrolling'},
    {'books': A + 'collage/books2.png', 'yarn': A + 'collage/yarn.png', 'bike': A + 'collage/bike.png', 'bread': A + 'collage/bread.png', 'plant': A + 'collage/plant.png', 'notebook': A + 'collage/notebook.png'}, {},
    '.hd{left:44px;bottom:40px;font-size:132px}\n.sub{position:absolute;left:50px;top:40px;background:#161616;color:var(--butter);font-weight:900;font-size:56px;padding:6px 18px;letter-spacing:-.02em}\n.phone{left:90px;top:150px;width:220px;height:330px;transform:rotate(-10deg);background:#2a2a2a;border:12px solid #161616}\n.phone .x{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:Dela;font-size:200px;color:var(--accent,#FF6A1A);line-height:1}\n.a1{left:330px;top:200px;width:260px;height:180px}\n.books{left:590px;top:110px;width:250px;transform:rotate(-6deg)}.yarn{left:860px;top:70px;width:190px;transform:rotate(8deg)}.plant{left:1080px;top:60px;width:150px}\n.bike{left:820px;top:270px;width:300px}.bread{left:600px;top:320px;width:230px;transform:rotate(5deg)}.notebook{left:1080px;top:300px;width:180px;transform:rotate(14deg)}',
    '<div class="sub z4" data-k="sub"></div>\n<div class="phone z3" data-move="phone"><div class="x">×</div></div>\n' + ARROW('a1', 'M20,120 C90,30 180,30 250,90', 'M214,64 L254,94 L214,118') + '\n' + ''.join(obj(k) for k in ['books', 'yarn', 'plant', 'bread', 'bike', 'notebook']) + '\n<div class="hd z4" data-k="hd"></div>')

# 15 flat ink: numbered list poster + her colour cut-out with a butter outline
add('15-flat-numbered-list', 'flat', 'INSTEAD OF SCROLLING: 01 READ 02 GET BORED 03 TALK', [4, 2],
    "Flat ink ground: a numbered list in her deck style (mono number + huge Dela line + hairline rule): 'instead of scrolling' as the header, then 01 READ, 02 GET BORED, 03 TALK TO PEOPLE and a daubed '+6 MORE'; her cut-out in full colour on the right with a butter outline, smiling. References: her own decks (numbered list: mono 01 + bold line + rule), her database-indexes thumbnail (cut-out with an outline).",
    {'hd': 'Instead of scrolling', 'r1': 'Read', 'r2': 'Get bored', 'r3': 'Talk to people', 'more': '+6 more'},
    {'me': A + 'cut/gbemi-821.5.png'}, {'--ground': '#161616', '--fg': '#FFFDF5', '--ol': '#F7D44C'},
    '.hd{left:50px;top:40px;font-size:64px;color:var(--butter)}\n.rows{position:absolute;left:50px;top:140px;width:700px}\n.row{display:flex;align-items:baseline;gap:26px;border-top:3px solid rgba(255,253,245,.3);padding:12px 0 10px}\n.row .mono{font-size:40px;color:var(--butter)}\n.row .ln{font-family:Dela;font-size:76px;color:var(--fg);text-transform:uppercase;line-height:1.05;white-space:nowrap}\n.more{position:absolute;left:58px;top:600px;font-family:Dela;font-size:58px;color:#161616;text-transform:uppercase}\n.more{--dl:-8%;--dw:116%}\n.cut{right:-20px;height:560px}',
    '<div class="hd z4" data-k="hd"></div>\n<div class="rows z4" data-move="rows">' + ''.join(f'<div class="row"><span class="mono">0{i}</span><span class="ln" data-k="r{i}"></span></div>' for i in (1, 2, 3)) + '</div>\n<div class="z4" style="position:absolute;left:58px;top:600px"><span class="more daub" data-k="more" style="position:relative;left:0;top:0"></span></div>\n<img class="cut ol z3" data-img="me" data-move="her" src="" alt="">')

# 16 other: split, swap this for this
add('16-split-swap-this-for-this', 'other', 'SWAP THIS → FOR THIS', [7, 4],
    "Split before/after, no face of hers: left, a woman scrolling in bed at night, in black and white and dim (Pexels stand-in); right, a woman reading on a sofa in warm daylight colour (Pexels stand-in); a butter seam with the bingo daub; 'SWAP THIS' / 'FOR THIS' in handwriting-free Dela labels on ink and butter boxes at the bottom. References: her saved before / after and Day 1 / Day 900 splits.",
    {'l': 'Swap this', 'r': 'for this'},
    {'left': A + 'pexels/night-phone.jpg', 'right': A + 'pexels/reading-sofa.jpg'}, {},
    '.half{position:absolute;top:0;height:720px;width:636px;overflow:hidden}.half img{width:100%;height:100%;object-fit:cover;display:block}\n.hl{left:0}.hl img{filter:grayscale(1) brightness(.7) contrast(1.1)}.hr{right:0}.hr img{filter:brightness(1.08) saturate(1.05)}\n.lab{position:absolute;bottom:44px;font-family:Dela;font-size:76px;text-transform:uppercase;padding:6px 20px;white-space:nowrap}\n.ll{left:40px;background:#161616;color:var(--card)}.lr{left:690px;background:var(--butter);color:#161616}\n.seam{position:absolute;left:636px;top:0;width:8px;height:720px;background:var(--butter)}\n.arr{position:absolute;left:560px;top:250px;width:160px;height:160px;border-radius:50%;background:var(--accent,#FF6A1A);display:flex;align-items:center;justify-content:center;font-family:Dela;font-size:96px;color:#161616}',
    '<div class="half hl z1" data-move="left"><img data-img="left" src="" alt=""></div><div class="half hr z1" data-move="right"><img data-img="right" src="" alt=""></div><div class="seam z2"></div>\n<div class="arr z4" data-move="arrow">→</div>\n<div class="lab ll z4" data-k="l"></div><div class="lab lr z4" data-k="r"></div>')

# 17 other: top-down flat-lay of analog things on warm paper, phone face down at the edge
add('17-flatlay-my-analog-hobbies', 'other', 'MY ANALOG HOBBIES', [9, 5],
    "Top-down flat-lay on warm paper, no face: the offline things laid out like a table (book stack, yarn, banana bread, notebook, plant, thrifted bag, die-cut Pexels stand-ins), the phone face down and pushed half off the edge; 'MY ANALOG HOBBIES' in an ink box. Kit T8. References: viral 2 (one picture = the outcome), outliers with analog objects as the picture.",
    {'hd': 'My analog hobbies'},
    {'books': A + 'collage/books2.png', 'yarn': A + 'collage/yarn.png', 'bread': A + 'collage/bread.png', 'notebook': A + 'collage/notebook.png', 'plant': A + 'collage/plant.png', 'bag': A + 'collage/bag.png'}, {'--ground': '#EAE6DA'},
    '.hd{left:60px;top:286px;font-size:92px;background:#161616;color:var(--butter);padding:14px 26px 18px}\n.books{left:40px;top:20px;width:290px;transform:rotate(-14deg)}.yarn{left:420px;top:20px;width:230px}.bag{left:760px;top:10px;width:270px;transform:rotate(8deg)}\n.plant{left:1100px;top:30px;width:150px}.bread{left:120px;top:470px;width:330px;transform:rotate(-6deg)}.notebook{left:540px;top:470px;width:290px;transform:rotate(9deg)}\n.phone{left:1010px;top:440px;width:220px;height:400px;transform:rotate(-18deg);background:#2a2a2a;border:12px solid #161616}',
    ''.join(obj(k) for k in ['books', 'yarn', 'bag', 'plant', 'bread', 'notebook']) + '\n<div class="phone z3" data-move="phone"></div>\n<div class="hd z5" data-k="hd"></div>')

# 18 other: one striking swap, full-bleed photo + her small cut-out
add('18-read-while-you-eat', 'other', 'READ WHILE YOU EAT', [1, 2],
    "Full-bleed photo of someone reading a book at a meal (Pexels stand-in, warm), 'READ WHILE YOU EAT' stacked on the left on a butter box, her small cut-out in the bottom-right corner with an orange outline (her database-indexes way of placing herself), calm. Kit T4 (cold reviewer: 'READ WHILE YOU EAT' beats 'BOOK > PHONE'). One concrete, surprising swap as the hook; the title carries the nine.",
    {'hd1': 'Read', 'hd2': 'while you', 'hd3': '<span class="daub">eat</span>'},
    {'bg': A + 'pexels/read-eat.jpg', 'me': A + 'cut/gbemi-22.8.png'}, {},
    '.bgp{position:absolute;inset:0;width:1280px;height:720px;object-fit:cover;filter:brightness(1.02)}\n.box{position:absolute;left:40px;top:40px;width:560px;height:440px;background:var(--butter)}\n.hd{left:70px}.hd1{top:70px;font-size:120px}.hd2{top:200px;font-size:100px}.hd3{top:316px;font-size:120px;--dl:-6%;--dw:112%;--dt:6%;--dh:92%}\n.cut{right:20px;height:380px}',
    '<img class="bgp z1" data-img="bg" data-move="photo" src="" alt="">\n<div class="box z3" data-move="box"></div>' + ''.join(f'<div class="hd hd{i} z4" data-k="hd{i}"></div>' for i in (1, 2, 3)) + '\n<img class="cut ol z4" data-img="me" data-move="her" src="" alt="">')

for name, c, css, body in dirs:
    p = os.path.join(D, name); os.makedirs(p, exist_ok=True)
    # scene() placeholders are filled from content.json by bind.js; give src so they render before bind runs
    html = f'<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../../lib/bingo.css"><style>\n{css}\n</style></head><body><div class="t">\n{body}\n</div><script src="../../lib/bind.js"></script></body></html>\n'
    open(os.path.join(p, 'index.html'), 'w').write(html)
    json.dump(c, open(os.path.join(p, 'content.json'), 'w'), indent=1, ensure_ascii=False)
    print('wrote', name)
