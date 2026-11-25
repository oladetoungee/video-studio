#!/usr/bin/env python3
"""Rework 2026-11-19 (projects/THUMBS-REWORK-BRIEF-2026-11-19.md): new thumbnails, each copying ONE of her 50 picks
(inspiration/boards/thumbnails/img/pick1119-NN.jpg) in composition, kind of picture and type treatment. Photos: the Øredev
conference photos (assets/oredev/, Enhance photo, face not lifted) + the 29 Oct shoot (assets/shoot/).
   python3 tools/set_2026_11_19.py [--force]
Writes directions/<name>/index.html always, content.json only when missing (her studio edits live there) unless --force."""
import json, os, sys
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FORCE = '--force' in sys.argv
HEAD = '<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../../lib/sy.css"><style>'
TAIL = '</div><script src="../../lib/bind.js"></script></body></html>'
O = '../../assets/oredev/'
S = '../../assets/shoot/'
D = []
def add(name, css, body, content):
    D.append((name, css, body, content))

# shared: a photo placed by vars inside a clipping box (--w width, --x/--y offset), so she can re-crop in the editor
PH = """.ph{position:absolute;overflow:hidden}.ph img{position:absolute;display:block}"""

# 07 ------------------------------------------------------------ pick1119-06: BEFORE | AFTER halves, arrow, "2027 ROADMAP" sticker
add('07-before-after-2027-roadmap', PH + """
.t{--ground:#1A1A1A}
.l{left:0;top:0;width:640px;height:720px}.l img{width:var(--lw,1180px);left:var(--lx,-300px);top:var(--ly,-40px)}
.r{left:640px;top:0;width:640px;height:720px;background:#0B0B0C}.r img{width:var(--rw,1150px);left:var(--rx,-300px);top:var(--ry,-300px)}
.lid{left:40px;top:500px;width:470px;height:300px;border-radius:22px;background:#C9CBCE;box-shadow:inset 0 0 0 4px #B4B7BB,0 -10px 30px rgba(0,0,0,.35);transform:rotate(-3deg)}
.tape{left:70px;top:575px;width:400px;padding:16px 10px;background:#F4F1E8;transform:rotate(-5deg);white-space:nowrap;font:500 31px/1 'JB';color:#333;text-align:center;box-shadow:0 6px 12px rgba(0,0,0,.25)}
.lap{left:780px;top:470px;width:470px;height:300px;border-radius:16px 16px 0 0;background:#222326;padding:14px;box-shadow:0 -10px 40px rgba(0,0,0,.6)}
.lap .ed{position:relative;left:0;top:0;width:100%;height:100%;border-radius:6px;--cs:21px;box-shadow:none}
.tag{top:34px;font:400 92px/1 'AN';text-transform:uppercase;padding:6px 26px 2px;letter-spacing:.01em}
.b4{left:34px;background:#D9262B;color:#fff}.af{left:880px;background:#F7D51D;color:#111}
.stk{left:472px;top:160px;background:#F7D51D;color:#111;font:400 50px/.95 'AN';text-align:center;padding:12px 18px;transform:rotate(-6deg);box-shadow:0 10px 20px rgba(0,0,0,.4);text-transform:uppercase}
.stk b{font-size:74px;font-weight:400;display:block}
.arr{left:390px;top:300px;width:300px;height:170px}""",
"""<div class="a ph l z1"><img data-img="before" alt=""></div><div class="a ph r z1"><img data-img="after" alt=""></div>
<div class="a lid z2"></div><div class="a tape z3" data-k="tape"></div>
<div class="a tag b4 z4" data-k="before"></div><div class="a tag af z4" data-k="after"></div>
<svg class="a arr z4" viewBox="0 0 300 170"><g fill="none" stroke="#F7D51D" stroke-width="13" stroke-linecap="round" stroke-linejoin="round"><path d="M14 150 C 90 160, 190 130, 262 52"/><path d="M200 50 L 266 46 L 262 112"/></g></svg>
<div class="a stk z5" data-k="sticker"></div>""",
{"board": "pick1119-06", "kind": "before / after halves: your room (the old way) | you on stage (now), a laptop on each side",
 "direction": "Copies pick1119-06 (How I Would Learn Python in 2027 (If I Could Start Over): BEFORE in a red box over a bored person behind a laptop with a taped print(df) label, AFTER in a green box over the same person happy with an open laptop of code, a yellow arrow between, a yellow 2027 ROADMAP sticker). Here: BEFORE = your room, hand at your chin, a laptop lid taped print(\"Hello World\") (the old way of learning); AFTER = you on stage explaining, an open laptop with code (what the video's roadmap leads to: build with AI first, then reading code, debugging, fundamentals).",
 "thumbnail_text": "BEFORE / AFTER + sticker 2027 ROADMAP",
 "fonts": ["thumbs-01 Anton + red box (white #FFFFFF on #D9262B, as Thumbnails 10); AFTER and the sticker on thumbs-02's yellow #F7D51D with ink #1C1C1C", "thumbs-08 JetBrains Mono for the code + the taped label"],
 "colours": "thumbs-01 (#D9262B, #FFFFFF, #1A1A1A) + thumbs-02 yellow #F7D51D",
 "text": {"before": "Before", "after": "After", "sticker": "<b>2027</b>Roadmap", "tape": "print(\"Hello World\")",
          "code": "<span class=\"k\">async function</span> <span class=\"f\">signUp</span>(user) {\n  <span class=\"k\">const</span> exists = <span class=\"k\">await</span> db.<span class=\"f\">find</span>(user.email);\n  <span class=\"k\">if</span> (exists) <span class=\"k\">return</span> <span class=\"s\">\"Already signed up\"</span>;\n  <span class=\"k\">await</span> db.<span class=\"f\">save</span>(user);\n}"},
 "images": {"before": S + "1613.jpg", "after": O + "55642239799.jpg"},
 "vars": {}, "class": "no-lift"})

# 08 ------------------------------------------------------------ pick1119-09: you centred over a full-screen code editor, one line at the bottom with a red underline
add('08-dont-just-copy-ai-code', PH + """
.t{--ground:#1E1F22}
.edf{left:0;top:0;width:1280px;height:720px;border-radius:0;--cs:23px;background:#2E3036}
.glow{left:330px;top:60px;width:620px;height:620px;border-radius:50%;background:#4A4D55;filter:blur(60px)}
.edf .code{padding:22px 30px 22px 240px}
.side{left:0;top:40px;width:210px;height:680px;background:#191A1D;border-right:1px solid #2B2D31;padding:20px 16px;font:500 19px/1.9 'JB';color:#8B8F97;white-space:pre}
.me2{left:var(--mx,232px);top:var(--my,34px);width:var(--mw,820px);filter:drop-shadow(0 20px 40px rgba(0,0,0,.6))}
.hd{left:0;width:1280px;text-align:center;top:var(--hy,540px);font:700 var(--hs,96px)/1 'PB';color:#fff;letter-spacing:-.02em;white-space:nowrap;text-shadow:0 4px 10px rgba(0,0,0,.6),0 12px 40px rgba(0,0,0,.7)}
.ul{left:var(--ux,640px);top:var(--uy,650px);width:var(--uw,420px);height:40px}""",
"""<div class="a ed edf z1"><div class="bar"><i></i><i></i><i></i></div><div class="code" data-k="code"></div></div>
<div class="a side z1" data-k="files"></div>
<div class="a glow z1"></div><img class="a me2 z2" data-img="me" alt="">
<div class="a hd z4" data-k="hd"></div>
""",
{"board": "pick1119-09", "kind": "you centred, big, over a full-screen code editor; one line at the bottom, a red underline",
 "direction": "Copies pick1119-09 (What I'd Learn Instead of Coding in 2027 + 'Don't Waste Your Life': the person centred and big, straight to camera, over a full-screen code editor, big white bold words across the bottom, a red brush underline). Here: Don't just copy it (the code AI gives you), the video's first skill (read the code) said as a feeling, not a lesson.",
 "thumbnail_text": "Don't just copy AI code.",
 "fonts": ["thumbs-10 Poppins Bold (white #FFFFFF, red key colour #E2231A as the underline, as Thumbnails 84)", "thumbs-08 JetBrains Mono for the code behind you"],
 "colours": "thumbs-10 (#FFFFFF on dark #2A2522) + red #E2231A; editor #1E1F22",
 "text": {"hd": "Don't just copy AI code.",
          "files": "src/\n  app.js\n  signup.js\n  payment.js\n  db.js\ntests/\npackage.json",
          "code": "<span class=\"n\">1</span><span class=\"k\">import</span> { db } <span class=\"k\">from</span> <span class=\"s\">\"./db\"</span>;\n<span class=\"n\">2</span>\n<span class=\"n\">3</span><span class=\"k\">export async function</span> <span class=\"f\">pay</span>(order) {\n<span class=\"n\">4</span>  <span class=\"k\">const</span> card = order.card;\n<span class=\"n\">5</span>  <span class=\"k\">await</span> <span class=\"f\">charge</span>(card, order.total);\n<span class=\"n\">6</span>  <span class=\"k\">await</span> db.orders.<span class=\"f\">save</span>(order);\n<span class=\"n\">7</span>  <span class=\"k\">return</span> { ok: <span class=\"k\">true</span> };\n<span class=\"n\">8</span>}\n<span class=\"n\">9</span>\n<span class=\"n\">10</span><span class=\"k\">export async function</span> <span class=\"f\">signUp</span>(user) {\n<span class=\"n\">11</span>  <span class=\"k\">try</span> {\n<span class=\"n\">12</span>    <span class=\"k\">await</span> db.users.<span class=\"f\">save</span>(user);\n<span class=\"n\">13</span>  } <span class=\"k\">catch</span> (e) {}\n<span class=\"n\">14</span>}"},
 "images": {"me": S + "1609-cut.png"},
 "vars": {}, "class": "no-lift"})

# 09 ------------------------------------------------------------ pick1119-07: a real wide scene, huge white caps across the top
add('09-still-worth-it-stage', PH + """
.t{--ground:#6E6A70}
.full{left:0;top:0;width:1280px;height:720px}.full img{width:var(--w,2800px);left:var(--x,-560px);top:var(--y,-200px)}
.hd{left:0;width:1280px;text-align:center;top:var(--hy,22px);font:800 var(--hs,146px)/1 'IT';color:#fff;letter-spacing:-.015em;word-spacing:.08em;text-transform:uppercase;white-space:nowrap;opacity:.96;text-shadow:0 4px 18px rgba(0,0,0,.35)}""",
"""<div class="a ph full z1"><img data-img="photo" alt=""></div>
<div class="a hd z3" data-k="hd"></div>""",
{"board": "pick1119-07", "kind": "photo: a real wide scene (you speaking, mid-smile), huge white caps across the top",
 "direction": "Copies pick1119-07 (I'm No Longer a Software Engineer... + 'I LEFT TECH?': a real, wide, lived-in scene, the person in it, huge white caps across the top). Here: you speaking on stage, mid-smile, one hand out (Øredev photo; the Øredev logo and the laptop sticker are cropped out), and the question as huge caps: STILL WORTH IT? The title says what; the picture says a real developer answers it.",
 "thumbnail_text": "STILL WORTH IT?",
 "fonts": ["design-26 Inter Tight ExtraBold caps (white #FFFFFF, as Design 20; there on #0C0C0C, here on the photo)"],
 "colours": "design-26 white #FFFFFF on the photo",
 "text": {"hd": "Still worth it?"},
 "images": {"photo": O + "55642441705.jpg"},
 "vars": {}, "class": "no-lift"})

# 10 ------------------------------------------------------------ pick1119-04: condensed serif headline left, you gesturing on a dark stage right
add('10-writing-code-is-the-easy-part', PH + """
.t{--ground:#0D0D0E}
.r{left:var(--rl,520px);top:0;width:760px;height:720px;-webkit-mask-image:linear-gradient(90deg,transparent 0,#000 140px)}
.r img{width:var(--w,1400px);left:var(--x,-380px);top:var(--y,-470px)}
.hd{left:56px;top:var(--hy,92px);font:700 var(--hs,92px)/1.08 'LB';color:#fff;letter-spacing:-.025em;white-space:nowrap}""",
"""<div class="a ph r z1"><img data-img="photo" alt=""></div>
<div class="a hd z3" data-k="hd"></div>""",
{"board": "pick1119-04", "kind": "photo: you mid-gesture on a dark stage (right), a bold serif headline (left)",
 "direction": "Copies pick1119-04 (The Kind of Thinker Who Will Thrive in the AI Era + 'The Rise of Systems Thinkers': a dark stage, the speaker on the right mid-explanation with both hands, a heavy serif headline in three short lines on the left). Here: you explaining with both hands (Øredev), and the idea the video turns on as a headline: writing code is the easy part now (AI writes it fast; reading it, debugging it and knowing the system are what's left for you).",
 "thumbnail_text": "Writing code / is the easy / part now.",
 "fonts": ["thumbs-05 Libre Baskerville Bold (white #FFFFFF on dark #2D2B2A, as Thumbnails 48)"],
 "colours": "thumbs-05 (#FFFFFF on #2D2B2A); ground #0D0D0E to meet the photo's dark stage",
 "text": {"hd": "Writing code<br>is the easy<br>part now."},
 "images": {"photo": O + "55642239799.jpg"},
 "vars": {}, "class": "no-lift"})

# 11 ------------------------------------------------------------ pick1119-48: light ground, tight black headline + red underline, floating tiles, you below
add('11-what-to-learn-first', PH + """
.t{--ground:#EFEDE6}
.hd{left:0;width:1280px;text-align:center;top:var(--hy,26px);font:700 var(--hs,112px)/1 'IT';color:#111;letter-spacing:-.03em;white-space:nowrap;top:var(--hy,18px)}
.ul{left:var(--ux,800px);top:var(--uy,124px);width:var(--uw,400px);height:30px}
.hd u{text-decoration:underline;text-decoration-color:#E2231A;text-decoration-thickness:12px;text-underline-offset:14px}
.me3{left:var(--mx,250px);top:var(--my,-160px);width:var(--mw,880px);filter:drop-shadow(0 18px 30px rgba(0,0,0,.25))}
.tile{width:150px;height:150px;border-radius:34px;box-shadow:0 18px 30px rgba(0,0,0,.18),inset 0 -6px 0 rgba(0,0,0,.12);display:flex;align-items:center;justify-content:center}
.tile svg{width:96px;height:96px}
.t1{left:120px;top:210px;background:#1E1F22;transform:rotate(-10deg)}
.t2{left:150px;top:470px;background:#E2231A;transform:rotate(8deg)}
.t3{left:1010px;top:200px;background:#2E6BE6;transform:rotate(9deg)}
.t4{left:1000px;top:465px;background:#F7D51D;transform:rotate(-7deg)}""",
"""<div class="a hd z5" data-k="hd"></div>
<img class="a me3 z2" data-img="me" alt="">
<div class="a tile t1 z4" data-move="tile-code"><svg viewBox="0 0 96 96" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"><path d="M34 26 L 12 48 L 34 70"/><path d="M62 26 L 84 48 L 62 70"/><path d="M54 18 L 42 78"/></svg></div>
<div class="a tile t2 z4" data-move="tile-bug"><svg viewBox="0 0 96 96" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round"><ellipse cx="48" cy="54" rx="20" ry="26" fill="#fff"/><circle cx="48" cy="26" r="11" fill="#fff"/><path d="M28 44 L 12 36M28 58 L 10 58M30 72 L 14 82M68 44 L 84 36M68 58 L 86 58M66 72 L 82 82M42 16 L 36 6M54 16 L 60 6"/><path d="M48 32 L 48 78" stroke="#E2231A" stroke-width="4"/></svg></div>
<div class="a tile t3 z4" data-move="tile-db"><svg viewBox="0 0 96 96" fill="none" stroke="#fff" stroke-width="7"><ellipse cx="48" cy="22" rx="30" ry="10"/><path d="M18 22 V 74 C 18 80, 78 80, 78 74 V 22"/><path d="M18 40 C 18 46, 78 46, 78 40M18 57 C 18 63, 78 63, 78 57"/></svg></div>
<div class="a tile t4 z4" data-move="tile-search"><svg viewBox="0 0 96 96" fill="none" stroke="#111" stroke-width="9" stroke-linecap="round"><circle cx="42" cy="42" r="24"/><path d="M60 60 L 82 82"/></svg></div>""",
{"board": "pick1119-48", "kind": "light ground, tight black headline with a red underline, four tiles floating, you below (tired, hand at your chin)",
 "direction": "Copies pick1119-48 (Here's the AI Roadmap You Actually Need + 'Stop Learning AI Randomly': light ground, a tight black headline with one word underlined in red, app-icon tiles floating around, the person below looking worn out). Here: What to learn first, your Øredev photo (hand at your chin, looking down), and four plain tiles for the four skills the video names (reading code, debugging, how systems work, finding problems): no brand icons.",
 "thumbnail_text": "What to learn first",
 "fonts": ["thumbs-19 Inter Tight, very tight (ink #111111 on #EFEDE6, as Thumbnails 174), set in Bold"],
 "colours": "thumbs-19 (#EFEDE6, #111111) + red #E2231A (underline, bug tile), tiles #1E1F22 / #2E6BE6 / #F7D51D",
 "text": {"hd": "What to learn <u>first</u>"},
 "images": {"me": O + "55642230148-cut.png"},
 "vars": {}, "class": "no-lift"})

# 12 ------------------------------------------------------------ pick1119-32: no words, a dense screen of code left, you right looking at it
add('12-too-much-to-learn-no-words', PH + """
.t{--ground:#14110F}
.edl{left:0;top:0;width:820px;height:720px;border-radius:0;--cs:22px}
.edl .code{padding:16px 22px}
.edl .err{background:rgba(226,38,43,.30)}
.term{left:0;top:540px;width:820px;height:180px;background:#111214;border-top:1px solid #2B2D31;padding:14px 22px;font:500 21px/1.55 'JB';color:#C9CCD2;white-space:pre}
.term .r{color:#FF6B6B}
.r2{left:820px;top:0;width:460px;height:720px}.r2 img{width:var(--w,700px);left:var(--x,-150px);top:var(--y,-260px)}""",
"""<div class="a ed edl z1"><div class="bar"><i></i><i></i><i></i></div><div class="code" data-k="code"></div></div>
<div class="a term z2" data-k="term"></div>
<div class="a ph r2 z1"><img data-img="photo" alt=""></div>""",
{"board": "pick1119-32", "kind": "no words: a dense screen of code and an error (left), you looking at it (right)",
 "direction": "Copies pick1119-32 (Theres' too much sh*t to learn in tech: no words, a dense technical screen on the left two thirds, the person on the right looking at it, a real moment). Here: a generic editor with code an AI wrote and a red error in the terminal, and your Øredev photo in profile, speaking, turned toward it. The title carries the words.",
 "thumbnail_text": "(no words)",
 "fonts": ["thumbs-08 JetBrains Mono for the code on screen only"],
 "colours": "editor #1E1F22, terminal #111214, error red #FF6B6B; your warm photo",
 "text": {"code": "<span class=\"n\">12</span><span class=\"k\">export async function</span> <span class=\"f\">handleWebhook</span>(req) {\n<span class=\"n\">13</span>  <span class=\"k\">const</span> event = req.body;\n<span class=\"n\">14</span>  <span class=\"k\">if</span> (event.type === <span class=\"s\">\"payment.success\"</span>) {\n<span class=\"n\">15</span>    <span class=\"k\">await</span> db.orders.<span class=\"f\">insert</span>({\n<span class=\"n\">16</span>      id: event.orderId,\n<span class=\"n\">17</span>      amount: event.amount,\n<span class=\"n\">18</span>      status: <span class=\"s\">\"paid\"</span>,\n<span class=\"n\">19</span>    });\n<span class=\"n\">20</span>  }\n<span class=\"n\">21</span>  <span class=\"k\">return</span> { received: <span class=\"k\">true</span> };\n<span class=\"n\">22</span>}",
          "term": "$ npm test\n<span class=\"r\">✕ saves one order per payment</span>\n<span class=\"r\">  Expected 1 row, received 2</span>\n  at handleWebhook (webhook.js:15)"},
 "images": {"photo": O + "55642297769.jpg"},
 "vars": {}, "class": "no-lift"})

# 13 ------------------------------------------------------------ pick1119-22: your face close in the middle, two side photos, a lowercase line with a gold end
add('13-its-not-too-late', PH + """
.t{--ground:#0F0E0D}
.m{left:var(--ml,300px);top:0;width:980px;height:720px}.m img{width:var(--w,1900px);left:var(--x,-430px);top:var(--y,-60px)}
.sl{left:0;top:0;width:300px;height:720px}.sl img{width:var(--sw,1090px);left:var(--sx,-560px);top:var(--sy,0px)}
.sr{left:1000px;top:0;width:280px;height:720px}.sr img{width:var(--rw,520px);left:var(--rx,-110px);top:var(--ry,-80px)}
.dimside{position:absolute;inset:0;background:rgba(0,0,0,.28)}
.hd{left:0;width:1280px;text-align:center;top:var(--hy,470px);font:800 var(--hs,128px)/1 'MO';color:#fff;letter-spacing:-.03em;white-space:nowrap;text-shadow:0 4px 10px rgba(0,0,0,.6),0 14px 44px rgba(0,0,0,.75)}
.hd .g{color:#F6C343}
.scrim{left:0;top:330px;width:1280px;height:390px;background:linear-gradient(180deg,rgba(0,0,0,0),rgba(0,0,0,.72) 70%)}""",
"""<div class="a ph sl z1"><img data-img="left" alt=""><div class="dimside"></div></div>
<div class="a ph m z2"><img data-img="face" alt=""></div>
<div class="a scrim z3"></div><div class="a hd z4" data-k="hd"></div>""",
{"board": "pick1119-22", "kind": "photo collage: your face close and alive in the middle, a laptop of code left, you on stage right, one lowercase line with a gold end",
 "direction": "Copies pick1119-22 (I'm 45. If you're in your 30s, watch this. + 'girl, it's not too late.': the person's face close and alive in the middle, real photos either side, one lowercase line across the bottom with the last words in gold). Here: your Øredev smile in the middle, a laptop of code on the left (Pexels; the stage photo on the right was cut after cold round 2: no focal point), and the answer to the question in the title: it's not too late.",
 "thumbnail_text": "it's not too late.",
 "fonts": ["thumbs-18 Montserrat ExtraBold (white #FFFFFF + yellow-gold #F6C343 key words, as Thumbnails 162)"],
 "colours": "thumbs-18 (#FFFFFF, #F6C343; there on #3A3D3A, here on photos)",
 "text": {"hd": "it's not <span class=\"g\">too late.</span>"},
 "images": {"face": O + "55642240014.jpg", "left": "../../assets/pexels/laptop-574069.jpg", "right": ""},
 "vars": {}, "class": "no-lift"})

# after 3 cold rounds only 07 stayed; the others (08-13) are in ../../archive/thumbnails-retired-2026-11-19/ (kept here for the record)
KEEP = {'07-before-after-2027-roadmap'}
D = [x for x in D if x[0] in KEEP or '--all' in sys.argv]
for name, css, body, content in D:
    d = os.path.join(ROOT, 'directions', name); os.makedirs(d, exist_ok=True)
    open(os.path.join(d, 'index.html'), 'w').write(HEAD + css + '</style></head><body><div class="t">\n' + body + '\n' + TAIL)
    cp = os.path.join(d, 'content.json')
    if FORCE or not os.path.exists(cp):
        json.dump(content, open(cp, 'w'), indent=1, ensure_ascii=False)
names = sorted(n for n in os.listdir(os.path.join(ROOT, 'directions')) if os.path.exists(os.path.join(ROOT, 'directions', n, 'index.html')))
json.dump(names, open(os.path.join(ROOT, 'directions', 'index.json'), 'w'))
print('\n'.join(names))
