#!/usr/bin/env python3
"""Set 3 (2026-11-13): 10 thumbnails, each copying a DIFFERENT board item's composition, fonts only from the font board.
   python3 tools/set_2026_11_13.py [--force]
Writes directions/<name>/index.html always, content.json only when missing (her studio edits live there) unless --force."""
import json, os, sys
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FORCE = '--force' in sys.argv
HEAD = '<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../../lib/sy.css"><style>'
TAIL = '</div><script src="../../lib/bind.js"></script></body></html>'
S = '../../assets/shoot/'
D = []

def add(name, css, body, content):
    D.append((name, css, body, content))

# 01 ---------------------------------------------------------------- yt-36: flat yellow, red heavy caps left, chart right
add('01-chart-should-i-learn-to-code',
""".t{--ground:#F7F02B}
.hd{left:46px;top:var(--hy,120px);font:400 var(--hs,128px)/.98 'AB';color:#E2262B;letter-spacing:-.01em;white-space:nowrap}
.ax{left:780px;top:60px;width:450px;height:500px;border-left:7px solid #1D1D1D;border-bottom:7px solid #1D1D1D}
.bar{bottom:160px;width:150px;background:#1D1D1D}
.b1{left:820px;height:var(--h1,392px)}.b2{left:1020px;height:var(--h2,26px);background:#E2262B}
.v{font:400 52px/1 'AB';color:#1D1D1D;text-align:center;width:190px}
.v1{left:800px;bottom:calc(var(--h1,392px) + 174px)}.v2{left:1000px;bottom:calc(var(--h2,26px) + 174px);color:#E2262B;font-size:64px}
.l{top:572px;font:400 40px/.98 'AB';color:#1D1D1D;text-align:center;width:190px}.l1{left:800px}.l2{left:1000px;color:#E2262B}
.src{left:50px;top:560px;font:400 34px/1.15 'AB';color:#1D1D1D;letter-spacing:0}""",
"""<div class="a hd z3" data-k="hd"></div><div class="a ax z2"></div>
<div class="a bar b1 z2"></div><div class="a bar b2 z2"></div>
<div class="a v v1 z3" data-k="v1"></div><div class="a v v2 z3" data-k="v2"></div>
<div class="a l l1 z3" data-k="l1"></div><div class="a l l2 z3" data-k="l2"></div><div class="a src z3" data-k="src"></div>""",
{"board": "yt-36", "kind": "flat chart, no face",
 "direction": "Copies board yt-36 (WHAT IS SPACE COMPLEXITY OF ALGORITHMS: flat yellow, heavy caps stacked on the left, a bar chart on the right). The question people search, and the chart that makes it urgent: of US software developer job posts on Indeed in Q1 2026, 69.3% were senior, 4.5% entry level (Indeed Hiring Lab, 23 Jul 2026). Bars to scale.",
 "thumbnail_text": "LEARN TO CODE IN 2027? + chart: senior jobs 69.3% / junior jobs 4.5%",
 "fonts": ["thumbs-12 Archivo Black (red #E2262B on yellow #F7F02B, as Thumbnails 89)"],
 "colours": "thumbs-12 specimen (#F7F02B ground, #E2262B ink) + #1D1D1D chart ink (yt-36 black axes)",
 "text": {"hd": "LEARN TO<br>CODE IN<br>2027?", "v1": "69.3%", "v2": "4.5%", "l1": "SENIOR<br>JOBS", "l2": "JUNIOR<br>JOBS",
          "src": "US job posts, Indeed 2026"},
 "vars": {"--h1": "380px", "--h2": "26px"}, "images": {}, "class": ""})

# 02 ---------------------------------------------------------------- yt-25: dark, red-box caps top-left, code screenshot + red arrow, her right
add('02-ai-code-breaks-can-you-fix-it',
""".t{--ground:#222222}
.hd{left:44px;top:30px;font:400 var(--hs,92px)/1.04 'AN';color:#fff;text-transform:uppercase;white-space:nowrap}
.hd .rb{background:#D7262B;color:#fff;padding:0 .14em;display:inline-block;margin-top:6px}
.ed{left:44px;top:300px;width:664px;height:136px;--cs:33px}
.ed .msg{font-family:'JB',monospace;font-size:31px;color:#FF7A7E;padding:8px 22px 0}
.cut{right:-60px;height:700px}
.arr{left:690px;top:120px;width:200px;height:200px}""",
"""<div class="a hd z4" data-k="hd"></div>
<div class="ed z2"><div class="bar"><i></i><i></i><i></i></div><div class="code" data-k="code"></div></div>
<img class="cut z3 shadow-me" data-img="me" src="../../assets/shoot/1618-cut.png" alt="">""",
{"board": "yt-25", "kind": "split: generic code editor + her cut-out right (words left / her right 1 of 2)",
 "direction": "Copies board yt-25 (STOP THIS!: dark ground, heavy caps top-left with one part in a red box, a code screenshot in the middle, a red arrow pointing at the mistake, the creator on the right; the arrow was cut after the cold review as clutter). Here: one line of code an AI wrote, marked red as the broken line, and the question the video answers: can you read and fix it yourself (her skills: reading code, debugging). Generic editor, no brand.",
 "thumbnail_text": "AI CODE BREAKS. / CAN YOU FIX IT?",
 "fonts": ["thumbs-16 Anton + red box (white #FFFFFF and red box #D7262B on #222222, as Thumbnails 113)", "thumbs-08 JetBrains Mono for the code on screen"],
 "colours": "thumbs-16 specimen (#222222 ground, #FFFFFF, #D7262B)",
 "text": {"hd": "AI code breaks.<br><span class=\"rb\">Can you fix it?</span>",
          "code": "<span class=\"err\"><span class=\"k\">const</span> email = form.email.<span class=\"f\">trim</span>()</span>",
          "err": ""},
 "images": {"me": S + "1618-cut.png"}, "vars": {}, "class": "no-lift"})

# 03 ---------------------------------------------------------------- viral-2: a clipboard checklist (object) beside a serif line, no face
add('03-checklist-4-coding-skills',
""".t{--ground:#CFE3DA}
.cb{left:30px;top:84px;width:650px;height:560px;background:#2A2C2B;border-radius:18px;transform:rotate(-4deg);box-shadow:0 26px 40px rgba(29,29,29,.22)}
.cb .pp{position:absolute;left:22px;top:46px;right:22px;bottom:22px;background:#FBFBF8;border-radius:4px;padding:56px 26px 0}
.cb .clip{position:absolute;left:255px;top:-18px;width:140px;height:64px;background:#9EA3A6;border-radius:12px 12px 6px 6px;box-shadow:inset 0 -8px 0 #7D8285}
.it{display:flex;align-items:center;gap:18px;font:700 45px/1 'LB';color:#1D1D1D;margin-bottom:50px;white-space:nowrap;letter-spacing:-.01em}
.it b{flex:none;width:52px;height:52px;border:3px solid #1D1D1D;border-radius:4px;position:relative}
.it b::after{content:"";position:absolute;left:9px;top:-2px;width:13px;height:26px;border:solid #1D1D1D;border-width:0 6px 6px 0;transform:rotate(42deg)}
.hd{left:740px;top:var(--hy,150px);font:700 var(--hs,82px)/1.08 'LB';color:#1D1D1D;letter-spacing:-.02em;white-space:nowrap}
.lab{left:644px;top:var(--ly,150px);font:800 32px/1 'AR';letter-spacing:.06em;text-transform:uppercase;color:#1D1D1D;background:#E6BBE5;padding:10px 14px}""",
"""<div class="a cb z2" data-move="clipboard"><div class="clip"></div><div class="pp">
<div class="it"><b></b><span data-k="i1"></span></div><div class="it"><b></b><span data-k="i2"></span></div>
<div class="it"><b></b><span data-k="i3"></span></div><div class="it"><b></b><span data-k="i4"></span></div></div></div>
<div class="a lab z3" data-k="lab"></div><div class="a hd z3" data-k="hd"></div>""",
{"board": "viral-2", "kind": "object (drawn clipboard) on flat colour, no face",
 "direction": "Copies board viral-2 (Everything done by 2pm: a clipboard with a ticked list on the left, a serif line on the right, lots of air). The list IS the video's answer: the four skills she says a beginner still needs (reading code, debugging, fundamentals, domain knowledge).",
 "thumbnail_text": "LEARN TO CODE IN 2027 / 4 coding skills you still need + checklist",
 "fonts": ["thumbs-15 Libre Baskerville (ink #1D1D1D on mint #CFE3DA) + its caps label on pink #E6BBE5, as Thumbnails 106"],
 "colours": "thumbs-15 specimen (#CFE3DA ground, #1D1D1D ink, #E6BBE5 label)",
 "text": {"lab": "", "hd": "<span style=\"font-size:1.9em;line-height:.9\">4</span> coding<br>skills you<br>still need", "i1": "Reading code", "i2": "Debugging", "i3": "Fundamentals", "i4": "Domain knowledge"},
 "images": {}, "vars": {}, "class": ""})

# 04 ---------------------------------------------------------------- her own ux-research thumbnail: room washed one colour, huge condensed caps, note -> arrow -> phone
add('04-learn-to-code-ai-builds-it',
""".t{--ground:#4A403C}
.room{filter:grayscale(1) contrast(.85) brightness(1.3)}
.hd{left:0;width:1280px;text-align:center;top:var(--hy,26px);font:600 var(--hs,170px)/1 'OS';color:#EDE2A0;letter-spacing:-.005em;text-transform:uppercase;white-space:nowrap}
.note{left:70px;top:330px;width:270px;height:250px;background:#EDE2A0;transform:rotate(-5deg);padding:30px 26px;font:600 46px/1.08 'OS';color:#4A403C;box-shadow:0 18px 30px rgba(0,0,0,.35)}
.note::before{content:"";position:absolute;left:118px;top:-12px;width:30px;height:30px;border-radius:50%;background:#C9473B;box-shadow:0 4px 6px rgba(0,0,0,.3)}
.arr{left:300px;top:470px;width:660px;height:200px}
.phone{left:850px;top:214px;width:400px;height:820px;transform:rotate(6deg)}
.scr{background:#F6F4EE;padding:84px 20px 0;font-family:'IT',sans-serif}
.q{margin-left:auto;width:max-content;max-width:330px;background:#4A403C;color:#fff;border-radius:22px 22px 6px 22px;padding:14px 20px;font:700 42px/1.1 'IT'}
.cd{margin-top:20px;background:#1E1F22;border-radius:12px;padding:16px 16px;font:500 27px/1.5 'JB';color:#98C379;white-space:pre}
.ok{margin-top:20px;display:flex;align-items:center;gap:12px;font:700 46px/1 'IT';color:#1D1D1D}
.ok i{width:44px;height:44px;border-radius:50%;background:#3BA55C;position:relative;display:block}
.ok i::after{content:"";position:absolute;left:15px;top:7px;width:11px;height:22px;border:solid #fff;border-width:0 5px 5px 0;transform:rotate(42deg)}""",
"""<div class="pf z1"><img class="room" data-img="room" alt=""><div class="room-wash"></div><div class="room-dim"></div>
<img class="me" data-img="me" alt=""></div>
<div class="a hd z4" data-k="hd"></div>
<div class="phone z5" data-move="phone"><div class="scr"><div class="q" data-k="q"></div>
<div class="cd">&lt;input email /&gt;
&lt;button&gt;Sign up</div><div class="ok"><i></i><span data-k="ok"></span></div></div></div>""",
{"board": "own-ux-research_her-thumbnail", "kind": "photo: her room washed one colour, she in full colour, a big phone",
 "direction": "Copies HER OWN ux-research thumbnail (board 'Yours'): her room washed in one colour so it goes calm, she in full colour in the middle, the topic huge in tall condensed caps across the top, a big phone beside her. The phone shows what anyone can now type to an AI ('Build me a sign-up page') and it done, so the question LEARN TO CODE? lands. Sticky note dropped after the cold review (clutter). Generic chat screen, no brand.",
 "thumbnail_text": "LEARN TO CODE? + phone: 'Build me a sign-up page' -> code -> Done",
 "fonts": ["shorts-06 Oswald 600 (cream #EDE2A0 on warm dark #5A4F4A, as Formats 26)"],
 "colours": "shorts-06 specimen (#5A4F4A ground used as the wash, #EDE2A0 cream)",
 "text": {"hd": "Learn to code?", "note": "Build me a sign-up page", "q": "Build me a sign-up page", "ok": "Done"},
 "images": {"room": S + "1607.jpg", "me": S + "1607-person.png"},
 "vars": {"--pw": "1360px", "--pl": "-140px", "--pt": "-20px", "--wash": "#5A4F4A", "--dim": "rgba(20,16,14,.5)"}, "class": "no-lift"})

# 05 ---------------------------------------------------------------- yt-16: two real photos side by side, a big label on each (no face)
add('05-split-more-jobs-few-for-beginners',
""".t{--ground:#0A0A0A}
.h{position:absolute;top:0;height:720px;overflow:hidden}.h img{width:100%;height:100%;object-fit:cover}
.h1{left:0;width:637px}.h2{left:643px;width:637px;background:#fff}
.h1 img{object-position:var(--h1x,78%) 50%}.h2 img{object-position:50% var(--h2y,58%)}
.big{top:var(--ly,30px);font:400 var(--ls,150px)/1 'BF';color:#DFB0AE;background:#0A0A0A;padding:14px 26px 6px;white-space:nowrap}
.sm{top:var(--sy,214px);font:400 var(--ss,50px)/1.05 'BF';color:#DFB0AE;background:#0A0A0A;padding:10px 22px 12px;white-space:nowrap}
.k1{left:30px}.k2{left:673px}""",
"""<div class="h h1 z1"><img data-img="h1" alt=""></div><div class="h h2 z1"><img data-img="h2" alt=""></div>
<div class="a big k1 z3" data-k="a1"></div><div class="a sm k1 z3" data-k="a2"></div>
<div class="a big k2 z3" data-k="b1"></div><div class="a sm k2 z3" data-k="b2"></div>""",
{"board": "yt-16", "kind": "split of 2 real photos (Pexels), no face",
 "direction": "Copies board yt-16 ('12:30 PM / 7:30 PM', one of her likes: two real photos side by side, one bold label on each). Two numbers that tell the story: US software developer job posts rose almost 15% (late Feb 2025 to June 2026, Indeed Hiring Lab, 8 Jul 2026), yet only 4.5% were for beginners (entry level, Q1 2026, Indeed Hiring Lab, 23 Jul 2026). Left: hands writing code on a laptop; right: a magnifying glass (looking for the junior jobs).",
 "thumbnail_text": "+15% developer jobs | 4.5% for beginners",
 "fonts": ["design-15 Bagel Fat One (pink #DFB0AE on black #0A0A0A, as Design 371)"],
 "colours": "design-15 / combo-04 (Design 371: #0A0A0A, #DFB0AE)",
 "text": {"a1": "+15%", "a2": "developer jobs", "b1": "4.5%", "b2": "for beginners"},
 "images": {"h1": "../../assets/pexels/laptop-574069.jpg", "h2": "../../assets/pexels/magnifier-17311366.jpg"},
 "vars": {}, "class": ""})

# 06 ---------------------------------------------------------------- yt-51: her thinking (hand at cheek), two stacked labels top-left with an arrow
add('06-copying-ai-code-vs-understanding',
""".t{--ground:#1C1C1C}
.lb{font:700 var(--ls,78px)/1 'IT';white-space:nowrap;letter-spacing:-.03em;padding:10px 18px 14px}
.l1{left:44px;top:var(--y1,170px);color:#fff;background:#1C1C1C}
.l1 s{text-decoration-thickness:11px;text-decoration-color:#fff}
.l2{left:44px;top:var(--y2,390px);color:#1C1C1C;background:#F7D51D}
.arr{left:100px;top:262px;width:140px;height:136px}""",
"""<img class="cut z2" data-img="me" alt="" style="right:-90px;height:760px;bottom:-30px">
<div class="a lb l1 z3" data-k="l1"></div><div class="a lb l2 z3" data-k="l2"></div>
<svg class="a arr z3" viewBox="0 0 140 130"><path d="M30 8 C 20 60, 40 96, 100 112" fill="none" stroke="#F7D51D" stroke-width="10" stroke-linecap="round"/><path d="M74 88 L 108 114 L 70 126" fill="none" stroke="#F7D51D" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/></svg>""",
{"board": "yt-51", "kind": "flat dark (#1C1C1C) + her cut-out on the right (words left / her right 2 of 2)",
 "direction": "Copies board yt-51 (Copying -> Understanding: the creator thinking, hand at her face, two stacked labels top-left joined by an arrow, the first crossed out). Here: Copying AI code (crossed out) -> Understanding it: her first skill, reading the code AI writes.",
 "thumbnail_text": "Copying AI code (crossed out) -> Understanding it",
 "fonts": ["thumbs-02 Inter Tight Bold (white on #1C1C1C, black on yellow highlight #F7D51D, as Thumbnails 21)"],
 "colours": "thumbs-02 specimen (#1C1C1C, #FFFFFF, #F7D51D)",
 "text": {"l1": "<s>Copying AI code</s>", "l2": "Understanding it"},
 "images": {"me": S + "1613-cut.png"},
 "vars": {"--ls": "92px", "--y1": "150px", "--y2": "400px"}, "class": "no-lift"})

# 07 ---------------------------------------------------------------- viral-3: creator big on the left, heavy title right with underline, highlighter boxes with arrows
add('07-coding-with-ai-the-loop',
""".t{--ground:#DFD8D4}
.cut{left:-70px;height:720px;bottom:0}
.hd{left:600px;top:34px;font:800 var(--hs,150px)/.88 'BS';color:#262824;text-transform:uppercase;white-space:nowrap;letter-spacing:-.005em}
.ul{left:560px;top:290px;width:640px;height:30px}
.bx{font:800 96px/1 'BS';color:#262824;text-transform:uppercase;padding:12px 20px 10px;white-space:nowrap}
.b1{left:600px;top:340px;background:#F3DD4C}.b2{left:760px;top:520px;background:#8ED3EE}.b3{display:none}
.ar{width:120px;height:80px}""",
"""<img class="cut z2" data-img="me" src="../../assets/shoot/1611-cut.png" alt="">
<div class="a hd z3" data-k="hd"></div>
<div class="a bx b1 z3" data-k="b1"></div><div class="a bx b2 z3" data-k="b2"></div><div class="a bx b3 z3" data-k="b3"></div>
<svg class="a ar z3" style="left:640px;top:458px" viewBox="0 0 120 80"><path d="M14 4 C 14 50, 40 66, 92 66 M 74 48 L 94 66 L 74 82" fill="none" stroke="#262824" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/></svg>""",
{"board": "viral-3", "kind": "flat light ground + her cut-out large on the left + a drawn 3-step loop",
 "direction": "Copies board viral-3 (FITNESS SALES FRAMEWORK: creator big and cropped on the left, a heavy two-line title on the right with a hand-drawn underline, highlighter boxes joined by thin arrows). Here: CODING WITH AI and her rule in two steps: AI writes -> you check (cut from 3 steps after the cold review: fewer words).",
 "thumbnail_text": "CODING WITH AI: AI writes -> you check",
 "fonts": ["design-04 Big Shoulders Display (ink #262824 on #DFD8D4, as Design 396)"],
 "colours": "design-04 specimen (#DFD8D4 ground, #262824 ink) + the three highlighter colours of viral-3 (yellow, blue, green)",
 "text": {"hd": "Coding<br>with AI", "b1": "AI writes", "b2": "You check", "b3": ""},
 "images": {"me": S + "1611-cut.png"}, "vars": {}, "class": "no-lift"})

# 08 ---------------------------------------------------------------- yt-05: one huge yellow word behind her head in her real room
add('08-coding-worth-learning-2027',
""".t{--ground:#2B2B2B}
.big{left:var(--bx,24px);top:var(--by,214px);font:900 var(--bs,258px)/1 'MO';color:#F6D23A;letter-spacing:-.02em;text-transform:uppercase;white-space:nowrap}
.top{left:var(--tx,800px);top:var(--ty,40px);font:900 70px/1.18 'MO';color:#F6D23A;white-space:nowrap;letter-spacing:-.01em}""",
"""<div class="pf z1"><img class="room" data-img="room" alt=""><div class="room-dim"></div></div>
<div class="a big z2 sh" data-k="big"></div>
<div class="pf z3" style="pointer-events:none"><img class="me" data-img="me" alt=""></div>
<div class="a top z4 sh" data-k="top"></div>""",
{"board": "yt-05", "kind": "photo: her room dimmed, one huge word behind her head",
 "direction": "Copies board yt-05 (FAVOR: one huge yellow word across the frame, the creator in her real room in front of it, covering part of a letter). Here: CODING behind her, with one small line above: worth learning in 2027?",
 "thumbnail_text": "CODING / still worth it in 2027?",
 "fonts": ["thumbs-06 Montserrat Black (yellow #F6D23A on dark #2B2B2B, as Thumbnails 58)"],
 "colours": "thumbs-06 specimen (#2B2B2B, #F6D23A); the room is dimmed toward #2B2B2B",
 "text": {"top": "<span style=\"background:#2B2B2B;padding:0 .14em;box-decoration-break:clone;-webkit-box-decoration-break:clone\">still worth it<br>in 2027?</span>", "big": "Coding"},
 "images": {"room": S + "1609.jpg", "me": S + "1609-person.png"},
 "vars": {"--pw": "1340px", "--pl": "-60px", "--pt": "10px", "--dim": "rgba(30,30,30,.68)", "--by": "-30px", "--bs": "236px", "--tx": "30px", "--ty": "330px"}, "class": "no-lift"})

# 09 ---------------------------------------------------------------- yt-29: bold orange, two dark bars (cross / tick), the creator beside them
add('09-course-not-a-job-still-worth-it',
""".t{--ground:#D16A3C}
.cut{left:-70px;height:720px}
.bar{left:var(--bx,470px);display:flex;align-items:center;gap:22px;background:#0C160C;color:#F5EFDE;border-radius:16px;padding:30px 34px 34px 38px;font:800 var(--fs,74px)/1.04 'IT';letter-spacing:-.025em;white-space:nowrap;box-shadow:0 14px 30px rgba(0,0,0,.25)}
.b1{top:var(--y1,230px)}
.mk{flex:none;width:110px;height:110px;border-radius:50%;position:relative;display:block}
.mk.x{background:#E5342B}.mk.x::before,.mk.x::after{content:"";position:absolute;left:49px;top:20px;width:12px;height:70px;background:#fff;border-radius:3px;transform:rotate(45deg)}.mk.x::after{transform:rotate(-45deg)}
.mk.v{background:#3BA55C}.mk.v::after{content:"";position:absolute;left:25px;top:11px;width:16px;height:34px;border:solid #fff;border-width:0 8px 8px 0;transform:rotate(42deg)}""",
"""<img class="cut z2 shadow-me" data-img="me" alt="">
<div class="a bar b1 z3"><span data-k="b1"></span><i class="mk x"></i></div>""",
{"board": "yt-29", "kind": "flat bold orange + one dark bar with a red cross + her cut-out on the left",
 "direction": "Copies board yt-29 (my-project.vercel.app (cross) / myproject.com (tick): a bold orange ground, two dark rounded bars stacked, a red cross on one and a green tick on the other, the creator beside them). Here one bar (the tick bar was cut after the cold review: it gave the answer away): a coding course is no longer a promise of a junior job (cross). The title carries the rest.",
 "thumbnail_text": "A coding course = a junior job (red cross)",
 "fonts": ["design-31 Inter Tight ExtraBold, words in bars (cream #F5EFDE on dark #0C160C bars, orange #D16A3C ground, as Design 406)"],
 "colours": "design-31 / combo-20 (Design 406: #D16A3C, #0C160C, #F5EFDE) + yt-29's red cross / green tick",
 "text": {"b1": "A coding course<br>= a junior job"},
 "images": {"me": S + "1615-cut.png"}, "vars": {}, "class": "no-lift"})

# 10 ---------------------------------------------------------------- yt-76: her on the left in her room, a big serif line on the right
add('10-too-late-to-learn-to-code',
""".t{--ground:#2B2420}
.sm{left:var(--tx,650px);top:var(--ty,150px);font:700 66px/1 'IT';color:#fff;text-transform:uppercase;letter-spacing:-.01em;white-space:nowrap}
.big{left:var(--tx,650px);top:calc(var(--ty,150px) + 72px);font:italic 400 var(--bs,196px)/.88 'IS';color:#fff;white-space:nowrap;letter-spacing:-.01em}""",
"""<div class="pf z1"><img class="room" data-img="room" alt=""><div class="room-dim"></div><img class="me" data-img="me" alt=""></div>
<div class="a sm z3 sh" data-k="sm"></div><div class="a big z3 sh" data-k="big"></div>""",
{"board": "yt-76", "kind": "photo: her room dimmed warm-dark, she natural on the left, words right",
 "direction": "Copies board yt-76 ('Write to Understand Your Life': the person on the left in a real, dim scene, a big serif line in white filling the right). Here the question beginners actually type: IS IT TOO LATE TO learn to code? (her answer: no, it is still worth it).",
 "thumbnail_text": "IS IT TOO LATE TO / learn to code?",
 "fonts": ["thumbs-17 Inter Tight + Instrument Serif italic (white #FFFFFF on warm dark #2B2420, as Thumbnails 152)"],
 "colours": "thumbs-17 specimen (#2B2420, #FFFFFF); the room is dimmed toward #2B2420",
 "text": {"sm": "Is it too late to", "big": "learn<br>to code?"},
 "images": {"room": S + "1614.jpg", "me": S + "1614-person.png"},
 "vars": {"--pw": "1720px", "--pl": "-420px", "--pt": "-235px", "--dim": "rgba(43,36,32,.74)"}, "class": "no-lift"})

KEEP = {'01-chart-should-i-learn-to-code': '01-chart-learn-to-code-2027', '02-ai-code-breaks-can-you-fix-it': '02-ai-code-breaks-can-you-fix-it',
        '04-learn-to-code-ai-builds-it': '03-learn-to-code-ai-builds-it', '06-copying-ai-code-vs-understanding': '04-copying-ai-code-vs-understanding',
        '09-course-not-a-job-still-worth-it': '05-a-coding-course-is-not-a-job', '10-too-late-to-learn-to-code': '06-too-late-to-learn-to-code'}
# dropped after 3 cold rounds (kept for the record, not written): 03 checklist (viral-2), 05 split (yt-16), 07 loop (viral-3), 08 CODING (yt-05)
D = [(KEEP[n], c, b, t) for n, c, b, t in D if n in KEEP]
for name, css, body, content in D:
    d = os.path.join(ROOT, 'directions', name); os.makedirs(d, exist_ok=True)
    open(os.path.join(d, 'index.html'), 'w').write(HEAD + css + '</style></head><body><div class="t">\n' + body + '\n' + TAIL)
    cp = os.path.join(d, 'content.json')
    if FORCE or not os.path.exists(cp):
        json.dump(content, open(cp, 'w'), indent=1, ensure_ascii=False)
names = sorted(n for n in os.listdir(os.path.join(ROOT, 'directions')) if os.path.exists(os.path.join(ROOT, 'directions', n, 'index.html')))
json.dump(names, open(os.path.join(ROOT, 'directions', 'index.json'), 'w'))
print('\n'.join(names))
