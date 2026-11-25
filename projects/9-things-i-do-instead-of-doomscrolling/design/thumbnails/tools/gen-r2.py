# Round 2 (2026-11-03, after cold critic R1): rewrote the whole set (16 options). Frozen like gen-first-version.py:
# from now on each directions/<name>/{index.html,content.json} is the source (her studio edits live in content.json).
#   python3 tools/gen-r2.py --force
import json, os, sys
if '--force' not in sys.argv: sys.exit('frozen: pass --force to overwrite the directions')
HERE = os.path.dirname(os.path.abspath(__file__)); D = os.path.join(HERE, '..', 'directions')
A = '../../assets/'
T = {
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
def scene(cls='', wash=False, her=True):
    w = '<div class="wash"></div>' if wash else ''
    s = f'<div class="scene z1 {cls}" data-move="room"><img class="bg" data-img="room" src="" alt="">{w}<div class="dim"></div></div>'
    if her: s += f'\n<div class="scene z3 {cls}" data-move="her"><img class="me-c" data-img="me" src="" alt=""></div>'
    return s
def obj(key, cls='stk', z='z4'):
    return f'<img class="{cls} {key} {z}" data-img="{key}" data-move="{key}" src="" alt="">'
def arrow(cls, path, head, col='#161616', w=10):
    return f'<svg class="arrow {cls} z4" data-move="{cls}" viewBox="0 0 300 200"><path d="{path}" fill="none" stroke="{col}" stroke-width="{w}" stroke-linecap="round"/><path d="{head}" fill="none" stroke="{col}" stroke-width="{w}" stroke-linecap="round" stroke-linejoin="round"/></svg>'
def fr(t): return {'room': A + f'frames/f_{t}.jpg', 'me': A + f'scene/gbemi-{t}-person.png'}
def hds(n): return ''.join(f'<div class="hd hd{i} z5" data-k="hd{i}"></div>' for i in range(1, n + 1))

dirs = []
def add(name, kind, words, titles, direction, text, images, vars_, css, body, rec=False):
    c = {'direction': direction, 'thumbnail_text': words, 'titles': [T[i] for i in titles], 'title': T[titles[0]], 'kind': kind,
         'text': text, 'images': images, 'vars': vars_}
    if rec: c['recommended'] = True
    dirs.append((name, c, css, body))

# ---------- photo (6) ----------
add('01-phone-down', 'photo', 'PHONE DOWN', [1, 3, 2],
    "Photo background in natural colour (her room warmed and lifted), she on the left, calm, closed mouth, chin in frame. 'PHONE DOWN.' huge across the top, DOWN daubed orange; on the open right side two big die-cut offline things (a stack of books, a bike; Pexels stand-ins). References: her ux-research thumbnail (her photo + few huge props), outlier 'What Happens When You Ditch Your Phone For Hobbies?'.",
    {'hd1': 'Phone', 'hd2': '<span class="daub">down.</span>'}, {**fr('21.0'), 'books': A + 'collage/books2.png', 'bike': A + 'collage/bike.png'},
    {'--bgb': '1.55', '--sc': '1.3', '--sc-x': '-190px', '--sc-y': '60px'},
    '.hd1{left:44px;top:30px;font-size:150px}.hd2{left:560px;top:30px;font-size:150px;--dl:-5%;--dw:110%;--dt:4%;--dh:96%}\n.books{left:800px;top:230px;width:330px;transform:rotate(-6deg)}.bike{left:760px;top:420px;width:470px;transform:rotate(-2deg)}',
    scene('natural') + '\n' + hds(2) + '\n' + obj('books', 'obj') + obj('bike', 'obj'))

add('02-doomscrolling-crossed-out', 'photo', 'DOOMSCROLLING (crossed out)', [4, 1],
    "Photo background: her room in black and white, she in full colour in the middle, calm, closed mouth. The word DOOMSCROLLING across the top in ink, struck through with a thick orange dauber line; a book stack and a ball of yarn (Pexels die-cuts) at her shoulders say what replaces it. References: Pinterest 'stop lying to yourself' (one word marked), her database-indexes bar (topic word huge).",
    {'hd1': 'Doomscrolling'}, {**fr('22.0'), 'books': A + 'collage/books2.png', 'yarn': A + 'collage/yarn.png'},
    {'--bgb': '1.75', '--bgc': '.8', '--sc': '1.25', '--sc-x': '0px', '--sc-y': '80px'},
    '.hd1{left:0;right:0;text-align:center;top:52px;font-size:104px}\n.strike{position:absolute;left:70px;right:70px;top:98px;height:30px;background:var(--accent,#FF6A1A);transform:rotate(-2deg);border-radius:14px 22px 16px 24px}\n.books{left:40px;top:330px;width:330px;transform:rotate(-7deg)}.yarn{left:960px;top:330px;width:270px;transform:rotate(8deg)}',
    scene('') + '\n' + hds(1) + '<div class="strike z6" data-move="strike"></div>\n' + obj('books') + obj('yarn'))

add('03-offline-hobbies', 'photo', 'OFFLINE hobbies', [1, 7, 5],
    "Photo background washed near-black, she in full colour (calm, closed mouth); OFFLINE huge in butter across the top, her head tucked just under it; 'hobbies' in a big white serif on the dark wall beside her; a ball of yarn (Pexels die-cut). References: Pinterest 'COOK' / 'WRITING a book' (big word on the scene), outlier 'What Happens When You Ditch Your Phone For Hobbies?'.",
    {'hd1': 'OFFLINE', 'sub': 'hobbies'}, {**fr('22.8'), 'yarn': A + 'collage/yarn.png'},
    {'--wash': '#2A2A2A', '--bgb': '1.6', '--sc': '1.3', '--sc-x': '-130px', '--sc-y': '50px', '--fg': '#F7D44C'},
    '.hd1{left:0;right:0;text-align:center;top:26px;font-size:200px;color:var(--fg)}\n.sub{position:absolute;left:700px;top:400px;font-size:170px;color:#fff;line-height:1}\n.yarn{left:40px;top:430px;width:250px;transform:rotate(-8deg)}',
    scene('', wash=True) + '\n' + hds(1) + '\n<div class="sub serif shadow-t z5" data-k="sub"></div>\n' + obj('yarn'))

add('04-be-bored-on-purpose', 'photo', 'BE BORED ON PURPOSE', [1, 6],
    "Split: a flat butter panel on the left with 'BE BORED' huge (BORED daubed orange) and 'on purpose', a boiling kettle (Pexels die-cut) over the seam; her photo on the right in natural colour, calm, closed mouth. One concrete swap from the list as the hook (waiting for the kettle without the phone); the title carries the nine. References: her database-indexes thumbnail (topic huge, one literal object).",
    {'hd1': 'Be', 'hd2': '<span class="daub">bored</span>', 'sub': 'on purpose'}, {**fr('22.0'), 'kettle': A + 'collage/kettle.png'},
    {'--bgb': '1.55', '--sc': '1.3', '--sc-x': '190px', '--sc-y': '40px'},
    '.panel{position:absolute;left:0;top:0;width:600px;height:720px;background:var(--ground)}\n.hd1{left:56px;top:50px;font-size:150px}.hd2{left:56px;top:200px;font-size:150px;--dl:-5%;--dw:110%;--dt:4%;--dh:96%}\n.sub{position:absolute;left:58px;top:380px;font-size:80px;font-weight:900;letter-spacing:-.03em;white-space:nowrap}\n.kettle{left:330px;top:450px;width:280px;transform:rotate(-4deg)}',
    scene('natural') + '\n<div class="panel z2" data-move="panel"></div>\n' + hds(2) + '<div class="sub z5" data-k="sub"></div>\n' + obj('kettle', 'obj'))

add('05-too-tired-to-stop', 'photo', 'TOO TIRED TO STOP SCROLLING?', [6, 1],
    "Photo in black and white, she in black and white too, one hand pushing her hair back (worn out, mouth closed), chin in frame; the only colour is the orange daub on TIRED. Text stacked on the left, clear of her hair. References: viral sample 5 (her doing the topic), Pinterest 'Why You're Stuck' (one highlighted word).",
    {'hd1': 'Too', 'hd2': '<span class="daub">tired</span>', 'hd3': 'to stop', 'hd4': 'scrolling?'}, fr('96.5'),
    {'--bgb': '1.25', '--sc': '1.4', '--sc-x': '250px', '--sc-y': '40px', '--fg': '#FFFDF5'},
    '.hd{left:46px;color:var(--fg);text-shadow:0 6px 24px rgba(0,0,0,.45)}.hd1{top:60px;font-size:84px}.hd2{top:150px;font-size:136px;color:#161616;text-shadow:none;--dl:-6%;--dw:112%;--dt:2%;--dh:100%}.hd3{top:310px;font-size:84px}.hd4{top:400px;font-size:84px}',
    scene('bw'))

add('07-less-phone-more-of-this', 'photo', 'LESS PHONE, MORE OF THIS', [7, 1],
    "Photo background washed deep green (one colour calms the room, her ux-research method), she in full colour on the right, calm, closed mouth; 'LESS PHONE,' in white and 'MORE OF THIS' in butter top-left; a white marker arrow drops to three die-cut offline things (books, yarn, a notebook). References: her ux-research thumbnail (one-colour wash, few big props, one arrow), viral 9 (the objects are the outcome).",
    {'hd1': 'Less phone,', 'hd2': 'more of this'}, {**fr('22.8'), 'books': A + 'collage/books2.png', 'yarn': A + 'collage/yarn.png', 'notebook': A + 'collage/notebook.png'},
    {'--wash': '#2F5A48', '--bgb': '1.5', '--bgc': '.9', '--sc': '1.3', '--sc-x': '190px', '--sc-y': '50px'},
    '.hd{left:44px}.hd1{top:40px;font-size:88px;color:#fff}.hd2{top:136px;font-size:88px;color:var(--butter)}\n.books{left:40px;top:400px;width:260px;transform:rotate(-6deg)}.yarn{left:300px;top:440px;width:200px;transform:rotate(6deg)}.notebook{left:470px;top:500px;width:230px;transform:rotate(-8deg)}\n.a1{left:340px;top:230px;width:180px;height:150px}',
    scene('', wash=True) + '\n' + hds(2) + '\n' + obj('books') + obj('yarn') + obj('notebook') + '\n' + arrow('a1', 'M20,20 C110,10 160,60 150,150', 'M118,126 L152,162 L180,120', '#fff'))

# ---------- collage (3) ----------
add('08-collage-my-offline-list', 'collage', 'my offline list', [1, 3],
    "Collage over her full natural photo (warmed and lifted), she right of centre, calm, closed mouth: one big white serif line 'my offline list' stacked on the left (clear of her face), three die-cut offline things floating around (books, yarn, a bike). Kit T1. References: her collage samples ('Time to lock in.', 'Thought of these?').",
    {'hd': 'my<br>offline<br>list'}, {**fr('19.5'), 'books': A + 'collage/books2.png', 'yarn': A + 'collage/yarn.png', 'bike': A + 'collage/bike.png'},
    {'--bgb': '1.6', '--sc': '1.15', '--sc-x': '96px', '--sc-y': '40px'},
    '.hd{position:absolute;left:46px;top:60px;font-size:150px;color:#fff;line-height:.86}\n.books{left:1010px;top:40px;width:230px;transform:rotate(8deg)}.yarn{left:1040px;top:400px;width:200px;transform:rotate(-8deg)}.bike{left:40px;top:500px;width:300px;transform:rotate(-4deg)}',
    scene('natural') + '\n' + obj('books') + obj('yarn') + obj('bike') + '\n<div class="hd serif shadow-t z5" data-k="hd"></div>')

add('09-collage-my-offline-habits', 'collage', 'MY OFFLINE HABITS', [3, 2],
    "Collage over her natural photo (warmed), she in the middle, calm: two big taped polaroids either side (Pexels stand-ins: reading at the table, coffee with a friend), no captions; 'MY OFFLINE HABITS' in heavy Dela on a cream band along the bottom. References: her collage samples, Pinterest polaroid inserts, outlier 'What to do instead of scrolling' (Wendy Huang).",
    {'hd': 'My offline habits'}, {**fr('22.0'), 'p1': A + 'pexels/read-eat.jpg', 'p2': A + 'pexels/coffee-talk.jpg'},
    {'--bgb': '1.55', '--sc': '1.1', '--sc-x': '0px', '--sc-y': '0px'},
    '.band{position:absolute;left:0;right:0;bottom:0;height:150px;background:var(--card)}\n.hd{left:0;right:0;text-align:center;bottom:34px;font-size:84px}\n.pol{padding:14px}',
    scene('natural') + ''.join(f'\n<div class="pol z4" data-move="{k}" style="{st}"><img data-img="{k}" src="" alt=""><div class="tape" style="left:110px;top:-16px;transform:rotate(-4deg)"></div></div>' for k, st in [('p1', 'left:40px;top:60px;width:330px;height:380px;transform:rotate(-6deg)'), ('p2', 'left:910px;top:60px;width:330px;height:380px;transform:rotate(5deg)')]) + '\n<div class="band z4" data-move="band"></div><div class="hd z5" data-k="hd"></div>')

add('10-collage-grid-9-things', 'collage', '9 THINGS I DO INSTEAD', [7, 4],
    "Photo grid: her (natural colour, calm, closed mouth) fills the left half; on the right two tiles stacked (Pexels stand-ins: reading at the table, a phone call to someone close), split by thin ink lines; an ink band along the bottom says '9 THINGS I DO INSTEAD'. Kit T5 (few big tiles). References: tile collages of the Benni Erler / Veronika Mark outliers.",
    {'hd': '9 things I do instead'}, {'me': A + 'frames/f_22.8.jpg', 'p2': A + 'pexels/read-eat.jpg', 'p3': A + 'pexels/call.jpg'},
    {},
    '.g{position:absolute;inset:0;display:grid;grid-template-columns:690px 1fr;grid-template-rows:1fr 1fr;gap:8px;background:#161616}\n.g img{width:100%;height:100%;object-fit:cover;display:block}\n.g .me{grid-row:1/3;object-position:46% 30%;filter:brightness(1.4) contrast(1.06) sepia(.22)}\n.bandx{position:absolute;left:0;right:0;bottom:0;height:140px;background:#161616;display:flex;align-items:center;justify-content:center}\n.bandx .hd{position:static;font-size:78px;color:var(--card)}\n.bandx .hd .n9{color:var(--accent,#FF6A1A)}',
    '<div class="g z1" data-move="grid"><img class="me" data-img="me" src="" alt=""><img data-img="p2" src="" alt=""><img data-img="p3" src="" alt=""></div>\n<div class="bandx z4" data-move="band"><div class="hd" data-k="hd"></div></div>')

# ---------- flat (4) ----------
labels = ['Read', 'Be bored', 'Small talk', 'Make friends', 'New hobby', 'Long reads', 'Move', 'Pray', 'Call home']
sq = ''.join(f'<div class="sq{" now" if i == 8 else ""}">{"" if i == 8 else "<div class=dot style=left:6px;top:4px;width:92px;height:70px></div>"}<div class="n" style="left:16px;top:14px;font-size:44px">{i+1:02d}</div><div class="l" data-k="l{i+1}" style="left:16px;bottom:14px;font-size:31px"></div></div>' for i in range(9))
add('12-flat-9-things-offline', 'flat', '9 THINGS TO DO OFFLINE', [6, 7],
    "Flat butter ground: the film's bingo card big on the right (nine squares = the nine things, each number daubed orange like the film's 'done' mark, the ninth ringed as 'next'), '9 THINGS TO DO OFFLINE' stacked on the left, her black-and-white cut-out with a solid ink outline under it. References: her database-indexes thumbnail (topic in plain words, one literal drawn idea, her B&W cut-out with an outline), the film's look A.",
    {'hd1': '9 things', 'hd2': 'to do', 'hd3': 'offline', **{f'l{i+1}': t for i, t in enumerate(labels)}},
    {'me': A + 'cut/gbemi-22.0.png'}, {'--ol': '#161616'},
    '.hd{left:44px;font-size:92px}.hd1{top:40px}.hd2{top:134px}.hd3{top:228px;color:var(--accent,#FF6A1A)}\n.card{left:650px;top:30px;width:600px}.card .grid{height:648px;grid-template-rows:repeat(3,1fr)}\n.cut{left:120px;height:350px}',
    hds(3) + '\n<img class="cut bw z3" data-img="me" data-move="her" src="" alt="">\n<div class="card z4" data-move="card"><div class="grid">' + sq + '</div></div>')

feed = ''.join(f'<div class="fc"><img data-img="f{i}" src="" alt=""></div>' for i in (1, 2, 3))
add('13-flat-the-feed-never-ends', 'flat', 'THE FEED NEVER ENDS', [3, 6],
    "Flat ink ground, no face: a big open book (Pexels die-cut) with a 'THE END' sticker on its page, beside a generic phone whose bright feed of photo posts runs off the bottom of the frame; 'THE FEED NEVER ENDS' in butter, ENDS daubed. Kit T2 (the kit's cold reviewer top pick). Book-led, unlike the phone-led thumbnails of the earlier phone video. References: viral 4 (the loop drawn), her database-indexes bar.",
    {'hd1': 'The feed', 'hd2': 'never <span class="daub">ends</span>', 'end': 'The end'},
    {'book': A + 'collage/openbook.png', 'f1': A + 'pexels/coffee-talk.jpg', 'f2': A + 'pexels/thrift.jpg', 'f3': A + 'pexels/busstop.jpg'}, {'--ground': '#161616', '--fg': '#F7D44C'},
    '.hd{left:50px;font-size:100px}.hd1{top:44px}.hd2{top:150px}.hd2 .daub{color:#161616;--dl:-6%;--dw:112%;--dt:4%;--dh:96%}\n.book{left:40px;top:290px;width:470px;transform:rotate(-6deg)}\n.end{position:absolute;left:250px;top:470px;font-family:Dela;font-size:72px;color:#161616;background:var(--accent,#FF6A1A);padding:4px 18px;transform:rotate(-7deg);text-transform:uppercase;line-height:1.1;white-space:nowrap}\n.phone{left:830px;top:230px;width:340px;height:620px;transform:rotate(6deg);background:#3A3A3A}\n.phone .scr{background:#F4F1EA}\n.fc{margin:16px 16px 0;height:190px;border-radius:14px;overflow:hidden}.fc img{width:100%;height:100%;object-fit:cover;display:block}',
    hds(2) + '\n' + obj('book', 'obj') + '<div class="end z5" data-k="end"></div>\n<div class="phone z4" data-move="phone"><div class="scr">' + feed + '</div></div>')

add('14-flat-9-easy-swaps', 'flat', '9 EASY SWAPS', [4, 7],
    "Flat butter ground, no face: a generic phone with a plain grey feed and a big orange X on the left; a marker arrow carries the eye to four things that replace it (book stack, yarn, bike, notebook as die-cuts); '9 EASY SWAPS' huge along the bottom with a 48 px margin, 'for doomscrolling' in an ink box. References: viral 4 (the idea drawn literally), her database-indexes thumbnail (thing → arrow → thing).",
    {'hd': '9 easy swaps', 'sub': 'for doomscrolling'},
    {'books': A + 'collage/books2.png', 'yarn': A + 'collage/yarn.png', 'bike': A + 'collage/bike.png', 'notebook': A + 'collage/notebook.png'}, {},
    '.hd{left:48px;bottom:40px;font-size:118px}\n.sub{position:absolute;left:50px;top:40px;background:#161616;color:var(--butter);font-weight:900;font-size:56px;padding:6px 18px;letter-spacing:-.02em}\n.phone{left:80px;top:140px;width:230px;height:370px;transform:rotate(-8deg)}\n.phone .scr{background:#E6E3DC}.notch{position:absolute;left:50%;top:10px;width:70px;height:16px;margin-left:-35px;background:#161616;border-radius:8px}\n.pc{margin:34px 14px 0;height:110px;background:#C9C5BC;border-radius:10px}\n.x{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:Dela;font-size:230px;color:var(--accent,#FF6A1A);line-height:1}\n.a1{left:330px;top:180px;width:280px;height:190px}\n.books{left:620px;top:90px;width:300px;transform:rotate(-6deg)}.yarn{left:960px;top:70px;width:250px;transform:rotate(8deg)}\n.bike{left:850px;top:300px;width:390px}.notebook{left:600px;top:350px;width:250px;transform:rotate(9deg)}',
    '<div class="sub z4" data-k="sub"></div>\n<div class="phone z3" data-move="phone"><div class="scr"><div class="notch"></div><div class="pc"></div><div class="pc"></div></div><div class="x">×</div></div>\n' + arrow('a1', 'M20,130 C90,30 190,30 260,100', 'M222,72 L264,104 L222,128') + '\n' + ''.join(obj(k, 'obj') for k in ['books', 'yarn', 'bike', 'notebook']) + '\n<div class="hd z4" data-k="hd"></div>')

add('15-flat-my-no-phone-list', 'flat', 'MY NO-PHONE LIST: 01 READ 02 GET BORED 03 TALK', [1, 7],
    "Flat ink ground: a numbered list in her deck style (mono number + huge Dela line + hairline rule): 'my no-phone list' as the header, then 01 READ, 02 GET BORED, 03 TALK TO PEOPLE and a daubed '+6 MORE'; her cut-out in full colour on the right (calm, closed mouth) with a solid butter outline. References: her own decks (numbered list), her database-indexes thumbnail (cut-out with an outline).",
    {'hd': 'My no-phone list', 'r1': 'Read', 'r2': 'Get bored', 'r3': 'Talk to people', 'more': '+6 more'},
    {'me': A + 'cut/gbemi-22.0.png'}, {'--ground': '#161616', '--fg': '#FFFDF5', '--ol': '#F7D44C'},
    '.hd{left:50px;top:40px;font-size:64px;color:var(--butter)}\n.rows{position:absolute;left:50px;top:136px;width:760px}\n.row{display:flex;align-items:baseline;gap:26px;border-top:3px solid rgba(255,253,245,.3);padding:12px 0 8px}\n.row .mono{font-size:40px;color:var(--butter)}\n.row .ln{font-family:Dela;font-size:72px;color:var(--fg);text-transform:uppercase;line-height:1.05;white-space:nowrap}\n.more{font-family:Dela;font-size:58px;color:#161616;text-transform:uppercase;--dl:-8%;--dw:116%}\n.cut{right:-10px;height:470px}',
    '<div class="hd z4" data-k="hd"></div>\n<div class="rows z5" data-move="rows">' + ''.join(f'<div class="row"><span class="mono">0{i}</span><span class="ln" data-k="r{i}"></span></div>' for i in (1, 2, 3)) + '</div>\n<div class="z5" style="position:absolute;left:58px;top:600px" data-move="morebox"><span class="more daub" data-k="more"></span></div>\n<img class="cut ol z3" data-img="me" data-move="her" src="" alt="">')

# ---------- other (3) ----------
add('16-split-swap-this-for-this', 'other', 'SWAP THIS → FOR THIS', [4, 7],
    "Split before/after, no face of hers: left, hands holding a glowing phone in bed at night, black and white (Pexels stand-in, cropped to the hands and phone); right, a woman reading on a sofa in warm daylight (Pexels stand-in); a butter seam with an orange arrow; 'SWAP THIS' / 'FOR THIS' on ink and butter boxes. References: her saved before / after and Day 1 / Day 900 splits.",
    {'l': 'Swap this', 'r': 'for this'},
    {'left': A + 'pexels/night-phone.jpg', 'right': A + 'pexels/reading-sofa.jpg'}, {},
    '.half{position:absolute;top:0;height:720px;width:636px;overflow:hidden}.half img{width:100%;height:100%;object-fit:cover;display:block}\n.hl{left:0}.hl img{height:170%;object-position:50% 0;filter:grayscale(1) brightness(1.05) contrast(1.15)}.hr{right:0}.hr img{filter:brightness(1.08) saturate(1.05)}\n.lab{position:absolute;bottom:44px;font-family:Dela;font-size:76px;text-transform:uppercase;padding:6px 20px;white-space:nowrap}\n.ll{left:40px;background:#161616;color:var(--card)}.lr{left:690px;background:var(--butter);color:#161616}\n.seam{position:absolute;left:636px;top:0;width:8px;height:720px;background:var(--butter)}\n.arr{position:absolute;left:560px;top:250px;width:160px;height:160px;border-radius:50%;background:var(--accent,#FF6A1A);display:flex;align-items:center;justify-content:center;font-family:Dela;font-size:96px;color:#161616}',
    '<div class="half hl z1" data-move="left"><img data-img="left" src="" alt=""></div><div class="half hr z1" data-move="right"><img data-img="right" src="" alt=""></div><div class="seam z2"></div>\n<div class="arr z4" data-move="arrow">→</div>\n<div class="lab ll z4" data-k="l"></div><div class="lab lr z4" data-k="r"></div>', rec=True)

add('17-flatlay-my-analog-hobbies', 'other', 'MY ANALOG HOBBIES', [1, 3],
    "Still life on warm paper, no face: one tight cluster of analog things on the right (a book stack, yarn, a notebook, a plant; Pexels die-cuts), 'MY ANALOG HOBBIES' stacked huge on the left, ANALOG daubed. Kit T8. References: viral 2 (one picture = the outcome), outliers with analog objects as the picture.",
    {'hd1': 'My', 'hd2': '<span class="daub">analog</span>', 'hd3': 'hobbies'},
    {'books': A + 'collage/books2.png', 'yarn': A + 'collage/yarn.png', 'notebook': A + 'collage/notebook.png', 'plant': A + 'collage/plant.png'}, {'--ground': '#EAE6DA'},
    '.hd{left:50px;font-size:116px}.hd1{top:80px}.hd2{top:220px;--dl:-5%;--dw:110%;--dt:4%;--dh:96%}.hd3{top:360px}\n.plant{left:1000px;top:40px;width:230px}.books{left:700px;top:160px;width:380px;transform:rotate(-4deg)}.yarn{left:1010px;top:370px;width:230px;transform:rotate(8deg)}.notebook{left:640px;top:440px;width:360px;transform:rotate(-8deg)}',
    hds(3) + '\n' + ''.join(obj(k, 'obj') for k in ['plant', 'books', 'yarn', 'notebook']))

add('18-read-while-you-eat', 'other', 'READ WHILE YOU EAT', [1, 2],
    "Full-bleed photo of someone reading a book at a meal (Pexels stand-in, warm), 'READ WHILE YOU EAT' stacked on a butter box top-left with a small '+8 MORE' tag, her cut-out bottom-right with an orange outline (her database-indexes way of placing herself), calm, closed mouth. One concrete, surprising swap as the hook; the title carries the nine.",
    {'hd1': 'Read', 'hd2': 'while you', 'hd3': '<span class="daub">eat</span>', 'tag': '+8 more'},
    {'bg': A + 'pexels/read-eat.jpg', 'me': A + 'cut/gbemi-22.8.png'}, {},
    '.bgp{position:absolute;inset:0;width:1280px;height:720px;object-fit:cover}\n.box{position:absolute;left:40px;top:40px;width:500px;height:390px;background:var(--butter)}\n.hd{left:66px}.hd1{top:66px;font-size:112px}.hd2{top:186px;font-size:86px}.hd3{top:290px;font-size:112px;--dl:-6%;--dw:112%;--dt:6%;--dh:92%}\n.tg{position:absolute;left:40px;top:446px;font-family:Dela;font-size:40px;background:#161616;color:var(--card);padding:6px 16px;text-transform:uppercase}\n.cut{right:10px;height:470px}',
    '<img class="bgp z1" data-img="bg" data-move="photo" src="" alt="">\n<div class="box z3" data-move="box"></div>' + hds(3) + '<div class="tg z5" data-k="tag"></div>\n<img class="cut ol z4" data-img="me" data-move="her" src="" alt="">')

for name, c, css, body in dirs:
    p = os.path.join(D, name); os.makedirs(p, exist_ok=True)
    html = f'<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../../lib/bingo.css"><style>\n{css}\n</style></head><body><div class="t">\n{body}\n</div><script src="../../lib/bind.js"></script></body></html>\n'
    open(os.path.join(p, 'index.html'), 'w').write(html)
    json.dump(c, open(os.path.join(p, 'content.json'), 'w'), indent=1, ensure_ascii=False)
print(len(dirs), 'directions written')
