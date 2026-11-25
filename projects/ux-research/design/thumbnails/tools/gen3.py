"""Set 3 generator (2026-10-16, round 2): writes directions/<NN-name>/index.html, and content.json.
    python3 tools/gen3.py [01 03 ...]            html only (content.json kept: her studio edits survive)
    python3 tools/gen3.py [01 03 ...] --content  html + content.json from the definitions below, BUT the existing
                                                 "titles"/"title"/"nudge" are kept (titles were hand-fixed after round 1)
    (never --reset: it would overwrite the hand-fixed titles)
Mix: 01-08 her photo as the scene, 09-12 collage over her photo, 13-17 graphic (13-16 are hand-written html, not here),
18-20 other (before/after split, say/do, close face on a colour block).
Round 2 (critic round 1: "the photo options look like ONE formula, dim green-grey room"): photos now come from
assets/scene/g2 (tools/grade3.py: +0.5 EV, green pulled out), every option has its own crop (crop() places her face by
the Vision face box in tools/faces_g2.txt), at most one prop each, headlines on clean areas, nothing under 28 px."""
import json, os, sys
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
D = os.path.join(ROOT, 'directions')
args = [a for a in sys.argv[1:] if not a.startswith('--')]; content = '--content' in sys.argv
FACES = {l.split()[0][2:-4]: tuple(map(int, l.split()[1:4])) for l in open(os.path.join(ROOT, 'tools/faces_g2.txt')) if l.strip()}

def bg(t): return f'../../assets/scene/g2/s_{t}.jpg'
def cut(t): return f'../../assets/scene/g2/cut/s_{t}.png'
def crop(t, cx, cy, fh):
    """--sw/--sx/--sy so that her face (Vision box) is fh px tall, centred at (cx, cy); clamped so the photo covers the frame."""
    x, y, w = FACES[t]; k = fh / w; sw = 2880 * k; sh = 1620 * k
    sw = max(sw, 1280); k = sw / 2880; sh = 1620 * k
    sx = cx - (x + w / 2) * k; sy = cy - (y + w / 2) * k
    sx2 = min(0, max(1280 - sw, sx)); sy2 = min(0, max(720 - sh, sy))
    if abs(sx2 - sx) > 1 or abs(sy2 - sy) > 1: print(f'  crop {t}: clamped face centre by {sx2 - sx:.0f},{sy2 - sy:.0f}')
    return f'.scene{{--sw:{sw:.0f}px;--sx:{sx2:.0f}px;--sy:{sy2:.0f}px}}\n'
SC = '<img class="bg" data-img="bg" alt=""><img class="cut" data-img="cut" alt="">'   # inside .scene
ST = '../../assets/stock/'
HEAD = '<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../../lib/v3.css"><style>{css}</style></head><body><div class="t">\n{body}\n</div><script src="../../lib/arrow.js"></script><script src="../../lib/bind.js"></script></body></html>\n'
X = {}

# ---------- 01-08 PHOTO AS THE SCENE (each its own crop and layout) ----------
X['01-ux-research-plain-words'] = dict(
 css=crop('287.9', 640, 380, 250) + """
.ux{left:0;right:0;top:36px;text-align:center;font-size:190px;color:#17140F;line-height:.86}
.h2{left:0;right:0;top:520px;text-align:center;font-size:130px;color:#17140F}
.st1{left:880px;top:200px;rotate:5deg;font-size:52px}
""",
 body=f"""<div class="scene">{SC}</div>
<div class="hd anton ux z2" data-k="ux"></div>
<div class="hd grot h2 z4" data-k="hd"></div>
<div class="strip y st1 z5" data-k="sub"></div>""",
 content=dict(direction="Medium crop, her calm, hands together: a big 'UX' just above her head, 'research' across her cream sweater below her chin, a yellow paper strip 'in plain words' beside her. Brighter, neutral room. References: yt 'FAVOR' / 'UI UX roadmap' (word behind the head), Pinterest 'COOK', 'keep trying' (mixed type).",
  thumbnail_text="UX research in plain words", text=dict(ux="UX", hd="research", sub="in plain words"),
  images=dict(bg=bg('287.9'), cut=cut('287.9')), vars={"--meb":"1.02"},
  titles=["What Is UX Research? Explained From Scratch"]))

X['02-what-does-a-ux-researcher-do'] = dict(
 css=crop('349', 960, 360, 330) + """
.h1{left:52px;top:56px;font-size:64px;color:#17140F;line-height:1}
.h1 .big{display:block;font-size:76px;line-height:1;margin-top:10px}
.h1 .acc{color:#E8501E}
.cb{left:56px;top:300px;width:450px;rotate:-6deg}
.paper{left:104px;top:436px;width:360px;height:180px;rotate:-6deg;padding:30px 22px;font:800 46px/1.3 'Archivo';white-space:nowrap;color:#17140F;border-radius:4px}
""",
 body=f"""<div class="scene">{SC}</div>
<div class="hd grot h1 z4" data-k="hd"></div>
<img class="prop cb z4" src="{ST}clipboard-wood.png" data-move="clipboard" alt="">
<div class="card paper z5" data-k="notes"></div>""",
 content=dict(direction="Off-centre: her on the right pointing at herself (the UX researcher), the question in heavy dark type on the clean pale wall, one prop: a clipboard with her interview checklist (talk to users, watch them). References: yt 'POV' (29), Pinterest 'how to be consistent' (person + plain question), her database-indexes sample (few big elements).",
  thumbnail_text="What does a UX researcher do?", text=dict(hd="What does a<span class=\"big\"><span class=\"acc\">UX researcher</span><br>actually do?</span>", notes="✓ talk to users<br>✓ watch them"),
  images=dict(bg=bg('349'), cut=cut('349')), vars={"--meb":"1.02"},
  titles=["What Does a UX Researcher Actually Do All Week?"]))

X['03-ui-vs-ux-hands'] = dict(
 css=crop('300.6', 640, 400, 270) + """
.cd{position:absolute;width:290px;padding:18px 0 22px;text-align:center;border-radius:14px;box-shadow:0 18px 30px rgba(0,0,0,.28)}
.cd .w{font:400 170px/1 'Anton';letter-spacing:-.01em}
.cd .l{font:700 46px/1 'Archivo';letter-spacing:-.02em;margin-top:6px}
.c1{left:56px;top:190px;rotate:-6deg;background:#FFFDF6;color:#17140F}
.c2{left:918px;top:190px;rotate:6deg;background:#1B3FD8;color:#fff}
.vs{left:0;right:0;top:40px;text-align:center;font-size:150px;color:#17140F}
""",
 body=f"""<div class="scene">{SC}</div>
<div class="cd c1 z4" data-move="ui-card"><div class="w" data-k="ui"></div><div class="l" data-k="l1"></div></div>
<div class="cd c2 z4" data-move="ux-card"><div class="w" data-k="ux"></div><div class="l" data-k="l2"></div></div>
<div class="hd playit vs z4" data-k="vs" style="font-weight:800"></div>""",
 content=dict(direction="Centred, her two open hands raised: a white 'UI' card above one hand ('how it looks'), a blue 'UX' card above the other ('how it feels'), a big serif 'vs' over her head on the pale ceiling. Everything fully inside the frame. References: yt 'Before/After' splits (12, 21), 'UI UX roadmap' (26), viral 'Fitness sales framework' (labelled blocks).",
  thumbnail_text="UI vs UX", text=dict(ui="UI", ux="UX", vs="vs", l1="how it looks", l2="how it feels"),
  images=dict(bg=bg('300.6'), cut=cut('300.6')), vars={"--meb":"1.02"},
  titles=["UI vs UX vs UX Research: The Difference Explained"]))

X['04-become-a-ux-researcher-steps'] = dict(
 css=""".t{background:var(--ground);background-image:linear-gradient(#DCD6CA 2px,transparent 2px),linear-gradient(90deg,#DCD6CA 2px,transparent 2px);background-size:80px 80px}
.h1{left:56px;top:50px;font-size:80px;color:#17140F;line-height:1}
.h1 .acc{display:block;color:#0B6B3A;font-size:92px;margin-top:6px}
.st{position:absolute;bottom:0;background:#FFFDF6;box-shadow:0 14px 26px rgba(0,0,0,.14);border:4px solid #17140F;border-bottom:0}
.s1{left:56px;width:210px;height:150px}.s2{left:266px;width:210px;height:260px}.s3{left:476px;width:230px;height:370px;background:#22E08A}
.sl{position:absolute;font-family:'Marker';font-size:46px;color:#17140F;left:0;right:0;text-align:center;top:30px;white-space:nowrap}
.me{position:absolute;right:0;bottom:0;height:420px;filter:drop-shadow(5px 0 0 #fff) drop-shadow(-5px 0 0 #fff) drop-shadow(0 -5px 0 #fff) drop-shadow(0 5px 0 #fff)}
""",
 body="""<div class="hd grot h1 z4" data-k="hd"></div>
<div class="st s1 z2"><div class="sl" data-k="s1"></div></div><div class="st s2 z2"><div class="sl" data-k="s2"></div></div><div class="st s3 z2"><div class="sl" data-k="s3"></div></div>
<img class="me z3" data-img="me" alt="">""",
 content=dict(kind="graphic", direction="Flat graphic on paper with a thin grid: a staircase of three big steps (learn, practise, get hired, the last one green) climbs toward her calm cut-out with a white outline in the corner. The path into the field drawn literally. References: her database-indexes sample (one literal diagram + her outlined cut-out), viral 'Fitness sales framework', yt 'Zero to Data scientist' (27).",
  thumbnail_text="How to become a UX researcher", text=dict(hd="How to become<span class=\"acc\">a UX researcher</span>", s1="Learn", s2="Practise", s3="Get hired"),
  images=dict(me='../../assets/cut/gbemi-calm-hard.png'), vars={"--ground":"#EDE9E2"},
  titles=["What Is UX Research? A Beginner's Path Into the Field"]))

X['05-ux-research-for-startups'] = dict(
 css=crop('246.8', 700, 360, 250) + """
.h1{left:48px;top:48px;font-size:92px;line-height:1.1}
.h1 span{color:#17140F;padding:2px 0 6px}
.h1 b{background:#FF4713;color:#fff;padding:2px 18px 6px;font-weight:900}
.tag{left:930px;top:260px;rotate:6deg;--s:280px;--fs:66px}
""",
 body=f"""<div class="scene">{SC}</div>
<div class="hd grot h1 z4" data-k="hd"></div>
""",
 content=dict(direction="The widest shot: her whole bright room, her hands framing an idea like a founder before launch; the topic in heavy type with one orange highlight bar top-left. Nothing else: title, her hands, the room. References: Pinterest 'JOBS ARE DEAD' / 'THE 9-5 COLLAPSE' (highlight bars), yt 'stop lying to yourself' (14).",
  thumbnail_text="UX research for startups", text=dict(hd="<span>UX research</span><br><b>for startups</b>", note="Test it<br>first"),
  images=dict(bg=bg('246.8'), cut=cut('246.8')), vars={"--meb":"1.02"},
  titles=["UX Research on a Small Budget: Start With 5 Users"]))

X['06-will-ai-replace-ux-research'] = dict(
 css=crop('686.7', 960, 360, 300) + """
.h1{left:52px;top:56px;font-size:84px;color:#17140F;line-height:1}
.h1 .acc{display:block;color:#1B3FD8;font-size:104px;margin-top:8px}
.bot{position:absolute;left:52px;top:390px;width:84px;height:84px;border-radius:50%;background:#1B3FD8;color:#fff;font:900 36px/84px 'Grot';text-align:center;letter-spacing:-.02em}
.win{position:absolute;left:52px;top:380px;width:560px;border-radius:22px;overflow:hidden;box-shadow:0 18px 30px rgba(0,0,0,.30)}
.win .bar{position:relative;height:auto;border-radius:0;background:#2B2A27;color:#fff;font:500 34px/1 'Mono';padding:16px 24px}
.bub{position:relative;left:0;top:0;width:auto;border-radius:0;padding:28px 34px 32px;border-radius:30px 30px 30px 6px;background:#17140F;color:#fff;font:700 46px/1.12 'Archivo'}
""",
 body=f"""<div class="scene">{SC}</div>
<div class="hd grot h1 z4" data-k="hd"></div>
<div class="win z4" data-move="chat"><div class="bar" data-k="who"></div><div class="bub" data-k="msg"></div></div>""",
 content=dict(direction="A close-up: her calm, unconvinced face (hand at her temple, thinking) on the right; the AI question in heavy dark type on the clean wall, and one generic AI chat window offering to do the research for you (generic, no brand). References: yt 'Run AI agents locally' (22), 'It clicked' (4), DOAC 'stop lying' (14).",
  thumbnail_text="Will AI replace UX research?", text=dict(hd="Will AI replace<span class=\"acc\">UX research?</span>", who="AI chat", msg="I can talk to your users for you."),
  images=dict(bg=bg('686.7'), cut=cut('686.7')), vars={"--meb":"1.02"},
  titles=["AI and UX Research: What a Master's Student Thinks"]))

X['07-researcher-vs-designer'] = dict(
 css=crop('330.5', 440, 360, 420) + """
.tagc{position:absolute;width:450px;border-radius:18px;overflow:hidden;box-shadow:0 20px 34px rgba(0,0,0,.30);background:#fff}
.tagc .top{background:var(--c);color:#fff;font:900 40px/1 'Grot';letter-spacing:-.01em;padding:18px 0 14px;text-align:center}
.tagc .nm{font:900 60px/1 'Grot';letter-spacing:-.04em;color:#17140F;text-align:center;padding:30px 16px 34px}
.t1{left:780px;top:58px;rotate:-3deg;--c:#E8501E}.t2{left:780px;top:444px;rotate:3deg;--c:#1B3FD8}
.vs{left:780px;width:450px;top:278px;text-align:center;font-size:120px;color:#17140F;line-height:.8;top:292px}
.vs span{background:#FFFDF6;padding:0 28px 12px;border-radius:12px;box-shadow:0 14px 24px rgba(0,0,0,.22)}
""",
 body=f"""<div class="scene">{SC}</div>
<div class="tagc t1 z4" data-move="tag1"><div class="top" data-k="hello1"></div><div class="nm" data-k="r"></div></div>
<div class="tagc t2 z4" data-move="tag2"><div class="top" data-k="hello2"></div><div class="nm" data-k="d"></div></div>
<div class="hd serifit vs z5" data-k="vs"></div>""",
 content=dict(direction="Her on the left, two index fingers up (one for each job); on the right two big 'Hello, I'm a' name-tag stickers stacked, UX researcher over UX designer, with a big serif 'vs' between them. References: yt 'Before/After' splits (12, 21), 'Ruthless / Relaxed' (21b), Pinterest 'LOCKED FOCUS'.",
  thumbnail_text="UX researcher vs UX designer", text=dict(hello1="HELLO, I'M A", hello2="HELLO, I'M A", r="UX researcher", d="UX designer", vs="<span>vs</span>"),
  images=dict(bg=bg('330.5'), cut=cut('330.5')), vars={"--meb":"1.02"},
  titles=["UX Researcher vs UX Designer: Who Does What on a Team?"]))

X['08-is-ux-research-a-good-career'] = dict(
 css=crop('287.9', 950, 380, 430) + """
.pane{position:absolute;left:0;top:0;width:600px;height:720px;background:#F4EFE6}
.h1{left:52px;top:70px;font-size:90px;color:#17140F;line-height:1.18}
.h1 em{font-family:'PlayIt';font-style:normal;background:#FFD84D;padding:0 .1em .04em;box-decoration-break:clone;-webkit-box-decoration-break:clone}
.sm{left:56px;top:600px;font-size:40px;color:#6B6457}
""",
 body=f"""<div class="scene">{SC}</div>
<div class="pane z4"></div>
<div class="hd play h1 z5" data-k="hd"></div>
<div class="hd mono sm z5" data-k="sm"></div>""",
 content=dict(direction="Editorial split: a warm paper column with the question in a heavy serif ('career?' on a yellow marker highlight), her in black and white, close, calm, on the right. The only black-and-white photo option. References: Pinterest 'how to be consistent' / 'no one cares.' (editorial), viral 'Financial literacy', yt 'you're wasting your 20s' (30).",
  thumbnail_text="Is UX research a good career?", text=dict(hd="Is UX<br>research<br>a good<br><em>career?</em>", sm="from an HCI student"),
  images=dict(bg=bg('287.9'), cut=cut('287.9')), vars={"--gs":"1","--bgc":"1.16","--mec":"1.18"},
  titles=["UX Research Careers: What I've Noticed as a Student"]))

# ---------- 09-12 COLLAGE OVER HER FULL PHOTO (10-07 style), new ideas in round 2 ----------
X['09-collage-ux-research-for-beginners'] = dict(
 css=crop('9.5', 900, 330, 320) + """
.h1{left:52px;top:150px;font-size:122px;color:#17140F;line-height:.95}
.h1 i{display:block;font-family:'PlayIt';font-weight:700;font-style:normal;color:#C23A12;font-size:100px;margin-top:8px}
.cf{left:56px;top:470px;width:230px}
.l1{left:56px;top:430px;rotate:-4deg;font-size:48px}.l2{left:110px;top:536px;rotate:3deg;font-size:48px}
""",
 body=f"""<div class="scene">{SC}</div>
<img class="prop cf z5" src="{ST}coffee.png" data-move="coffee" alt="">
<div class="hd play h1 z4" data-k="hd"></div>""",
 content=dict(direction="Collage over her full photo: her calm on the right, one elegant serif line on the clean wall ('UX research / for beginners'), one cut-out object (a coffee cup: a beginner's first study session) floating below. No other labels. References: viral collage 'Capsule wardrobe', 'Time to lock in.', 'Thought of these?'.",
  thumbnail_text="UX research for beginners", text=dict(hd="UX research<i>for beginners</i>"),
  images=dict(bg=bg('9.5'), cut=cut('9.5')), vars={"--meb":"1.02"},
  titles=["UX Research for Beginners: What It Is and How It Works","What Is UX Research? Explained From Scratch","UX Research Explained Simply (No Jargon, Just Examples)"]))

X['10-collage-get-into-ux-research'] = dict(
 css=crop('692.7', 800, 330, 300) + """
.band{position:absolute;left:40px;top:440px;width:640px;height:220px;background:#FFFDF6;rotate:-2deg;box-shadow:0 16px 28px rgba(0,0,0,.25)}
.h1{left:70px;top:458px;font-size:62px;color:#17140F;line-height:1;rotate:-2deg}
.h1 b{display:block;font-family:'Play';font-weight:800;font-size:100px;letter-spacing:-.03em;margin-top:4px}
.cb{left:900px;top:60px;width:330px;rotate:8deg}
.paper{left:940px;top:160px;width:256px;height:200px;rotate:8deg;padding:24px 20px;font:800 36px/1.3 'Archivo';white-space:nowrap;color:#17140F;border-radius:4px}
.l2{left:56px;top:70px;rotate:-4deg;font-size:48px}.l3{left:110px;top:176px;rotate:3deg;font-size:48px}
""",
 body=f"""<div class="scene">{SC}</div>
<img class="prop cb z4" src="{ST}clipboard-wood.png" data-move="clipboard" alt="">
<div class="band z4" data-move="band"></div>
<div class="hd playit h1 z5" data-k="hd"></div>
<div class="card paper z5" data-k="plan"></div>""",
 content=dict(direction="Collage: her calm in her bright room, a wooden clipboard floating top-right holding a short plan (learn, practise, volunteer: the ways in from the video), the topic as one elegant serif line on a paper band at the bottom. References: viral collage 'How to be Feminine', 'in defense of being online', Pinterest 'new york city writing'.",
  thumbnail_text="How to get into UX research", text=dict(hd="How to get into<b>UX research</b>", plan="1. learn<br>2. practise<br>3. volunteer"),
  images=dict(bg=bg('692.7'), cut=cut('692.7')), vars={"--meb":"1.02"},
  titles=["How to Get Into UX Research With No Experience","How to Become a UX Researcher (From a Master's Student)","What Is UX Research? A Beginner's Path Into the Field"]))

X['11-collage-ux-research-methods'] = dict(
 css=crop('459.5', 640, 300, 250) + """
.h1{left:0;right:0;top:548px;text-align:center;font-size:104px;color:#fff;line-height:1}
.band{position:absolute;left:0;right:0;top:500px;height:220px;background:#17140F}
.l1{left:70px;top:190px;rotate:-5deg;font-size:50px}.l2{left:820px;top:130px;rotate:4deg;font-size:50px}.l3{left:930px;top:290px;rotate:-3deg;font-size:50px}
.cf{left:40px;top:300px;width:200px}
""",
 body=f"""<div class="scene">{SC}</div>
<div class="band z4"></div>
<div class="hd young h1 z5" data-k="hd"></div>
<div class="strip y l1 z5" data-k="l1"></div><div class="strip l2 z5" data-k="l2"></div><div class="strip l3 z5" data-k="l3"></div>""",
 content=dict(direction="Collage: her open hands, three method labels floating around her like notes (interviews, usability tests, surveys), and the topic in a big warm serif on a solid black band across the bottom. References: viral collage 'Time to lock in.' (labels around the person), yt 'HELPED ME LEARN' (16), Pinterest editorial bands.",
  thumbnail_text="UX research methods", text=dict(hd="UX research methods", l1="interviews", l2="usability tests", l3="surveys"),
  images=dict(bg=bg('459.5'), cut=cut('459.5')), vars={"--meb":"1.02"},
  titles=["7 UX Research Methods, From Interviews to A/B Tests","How Is UX Research Done? Interviews, Tests and Surveys","UX Research for Beginners: What It Is and How It Works"]))

X['12-types-of-ux-research'] = dict(
 css=""".t{background:var(--ground)}
.h1{left:0;right:0;top:44px;text-align:center;font-size:104px;color:#fff;line-height:1}
.cd{position:absolute;top:220px;width:540px;height:440px;border-radius:24px;background:#FFFDF6;box-shadow:0 22px 40px rgba(0,0,0,.25)}
.c1{left:70px;rotate:-2deg}.c2{left:670px;rotate:2deg}
.nm{position:absolute;left:0;right:0;bottom:84px;text-align:center;font:900 64px/1 'Grot';letter-spacing:-.03em;color:#17140F}
.sb{position:absolute;left:0;right:0;bottom:38px;text-align:center;font:500 34px/1 'Mono';letter-spacing:.04em;color:#6B6457}
.bub{position:absolute;left:110px;top:50px;width:320px;height:170px;border-radius:40px 40px 40px 8px;background:#17140F;color:#fff;font:900 96px/170px 'Grot';text-align:center;letter-spacing:-.03em}
""",
 body="""<div class="hd grot h1 z2" data-k="hd"></div>
<div class="cd c1 z3"><svg width="540" height="300" style="position:absolute;left:0;top:0"><g fill="#FFD84D" stroke="#17140F" stroke-width="5"><rect x="120" y="170" width="80" height="90" rx="6"/><rect x="230" y="110" width="80" height="150" rx="6"/><rect x="340" y="50" width="80" height="210" rx="6"/></g><path d="M100 262 h340" stroke="#17140F" stroke-width="6" stroke-linecap="round"/></svg><div class="nm" data-k="n1"></div><div class="sb" data-k="d1"></div></div>
<div class="cd c2 z3"><div class="bub" data-k="why"></div><div class="nm" data-k="n2"></div><div class="sb" data-k="d2"></div></div>""",
 content=dict(kind="other", direction="Full-bleed electric blue, no face: the two types of UX research as two big cards: numbers (a bar chart; quantitative) and reasons (a speech bubble asking 'Why?'; qualitative). References: her decks (one full-bleed accent for a punchline), yt 'Space complexity' (34), her database-indexes sample (two things side by side, drawn literally).",
  thumbnail_text="Types of UX research", text=dict(hd="Types of UX research", n1="Numbers", d1="quantitative", why="Why?", n2="Reasons", d2="qualitative"),
  images={}, vars={"--ground":"#1B3FD8"},
  titles=["Types of UX Research Explained: Qualitative vs Quantitative","3 Types of UX Research, Explained Simply","UX Research for Beginners: What It Is and How It Works"]))

# ---------- 17 GRAPHIC ----------
X['17-ux-vs-market-research'] = dict(
 css=""".t{background:var(--ground)}
.h1{left:0;right:0;top:40px;text-align:center;font-size:92px;color:#17140F;line-height:.98}
.h1 .it{color:var(--accent);font-size:84px;margin:0 .1em}
.col{position:absolute;top:246px;width:540px;height:430px;border-radius:26px;background:#FFFDF6;box-shadow:0 20px 40px rgba(0,0,0,.12)}
.cl{left:70px;rotate:-3deg}.cr{left:670px;top:262px;rotate:3deg;background:#17140F;color:#fff}
.q{position:absolute;left:0;right:0;bottom:40px;text-align:center;font:900 54px/1 'Grot';letter-spacing:-.03em;color:inherit}
.cl .q{color:#17140F}
.big{position:absolute;left:120px;top:110px;width:300px;height:120px;border-radius:24px;background:var(--accent);color:#17140F;font:900 56px/120px 'Grot';letter-spacing:-.03em;text-align:center}
""",
 body="""<div class="hd grot h1 z2" data-k="hd"></div>
<div class="col cl z2">
 <svg width="540" height="430" style="position:absolute;left:0;top:0"><g fill="none" stroke="#17140F" stroke-width="14" stroke-linecap="round" stroke-linejoin="round">
 <path d="M140 70 h44 l40 150 h150 l34 -110 h-210"/><circle cx="240" cy="270" r="20" fill="#17140F"/><circle cx="350" cy="270" r="20" fill="#17140F"/></g>
 <g transform="translate(330 50) rotate(14)"><path d="M0 0 h90 l30 40 l-30 40 h-90 z" fill="#2BD27F"/><circle cx="18" cy="40" r="9" fill="#FFFDF6"/></g></svg>
 <div class="q" data-k="qm"></div></div>
<div class="col cr z2"><div class="big" data-k="btn"></div>
 <svg width="540" height="430" style="position:absolute;left:0;top:0;z-index:4"><path d="M396 196 l0 92 l23 -20 l17 37 l20 -9 l-17 -37 l31 -3 z" fill="#fff" stroke="#17140F" stroke-width="5" stroke-linejoin="round"/></svg>
 <div class="q" data-k="qu"></div></div>""",
 content=dict(direction="Faceless graphic: the topic as a comparison, two big panels: market research = a shopping cart with a price tag ('Will they buy it?'); UX research = a hand cursor pressing a big button ('Can they use it?'). No small labels repeating the headline, no phone. Paper ground, one green accent. References: her database-indexes thumbnail (one idea, drawn literally), yt 'Space complexity' (34), 'Before/After' (32).",
  thumbnail_text="UX research vs market research", text=dict(hd="UX research <span class=\"it\">vs</span><br>market research", btn="Sign up", qm="Will they buy it?", qu="Can they use it?"),
  images={}, vars={"--ground":"#EDE9E2","--accent":"#2BD27F"},
  titles=["UX Research vs User Research vs Market Research"]))

# ---------- 18-20 OTHER ----------
X['18-what-ux-research-fixes'] = dict(
 css=""".t{background:#17140F}
.half{position:absolute;top:0;height:720px;width:640px}
.hl1{left:0;background:#D9D3C7}.hr1{left:640px;background:var(--accent)}
.h1{left:0;right:0;top:58px;text-align:center;font-size:84px;color:#fff;z-index:6}
.h1 span{background:#17140F;padding:6px 26px 10px;border-radius:6px}
.tg{position:absolute;top:200px;font:900 60px/1 'Grot';letter-spacing:-.03em;color:#17140F}
.pa{left:290px;top:236px;--pw:300px;--ph:470px;rotate:-5deg}.pb{left:710px;top:236px;--pw:300px;--ph:470px;rotate:5deg}
.pop{position:absolute;left:16px;right:16px;border-radius:12px;background:#fff;box-shadow:0 6px 16px rgba(0,0,0,.25);font:800 28px/1.1 'Archivo';padding:14px 12px;color:#17140F;white-space:nowrap}
.x{position:absolute;right:12px;top:12px;font:900 26px/1 'Archivo';color:#E8501E}
""",
 body="""<div class="half hl1 z1"></div><div class="half hr1 z1"></div>
<div class="hd grot h1" data-k="hd"></div>
<div class="tg z3" style="left:56px" data-k="before"></div><div class="tg z3" style="left:1070px" data-k="after"></div>
<div class="phone pa z3" data-move="before-phone"><div class="scr" style="background:#EEE">
 <div class="bar" style="left:16px;top:24px;width:220px;--bh:14px"></div><div class="bar" style="left:16px;top:48px;width:160px;--bh:14px"></div>
 <div class="bar" style="left:16px;top:360px;width:70px;height:34px;border-radius:6px;--bc:#bbb"></div><div class="bar" style="left:96px;top:360px;width:70px;height:34px;border-radius:6px;--bc:#bbb"></div><div class="bar" style="left:176px;top:360px;width:70px;height:34px;border-radius:6px;--bc:#bbb"></div>
 <div class="pop" style="top:84px;rotate:-3deg"><span class="x">✕</span><span data-k="p1"></span></div>
 <div class="pop" style="top:174px;rotate:3deg"><span class="x">✕</span><span data-k="p2"></span></div>
 <div class="pop" style="top:264px;rotate:-2deg;background:#FFE0D6"><span data-k="p3"></span></div></div></div>
<div class="phone pb z3" data-move="after-phone"><div class="scr">
 <div style="position:absolute;left:84px;top:90px;width:110px;height:110px;border-radius:50%;background:var(--accent)"><svg width="110" height="110"><path d="M31 57 l18 18 l33 -37" fill="none" stroke="#17140F" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
 <div style="position:absolute;left:0;right:0;top:236px;text-align:center;font:800 34px/1.1 'Archivo'" data-k="done"></div>
 <div class="btn" style="left:28px;bottom:34px;width:222px;height:66px;font-size:30px" data-k="btn"></div></div></div>""",
 content=dict(direction="Faceless before / after split: on grey, a cluttered app buried in pop-ups and an error; on green, the same task as one clear screen and one button. The headline says what the comparison is. References: yt 'before / after' (1, 12, 21, 32), 'my-project.vercel.app vs myproject.com' (28).",
  thumbnail_text="What UX research fixes", text=dict(hd="<span>What UX research fixes</span>", before="Before", after="After", p1="Rate us!", p2="Allow alerts?", p3="Error: try again", done="Order placed", btn="Done"),
  images={}, vars={"--accent":"#2BD27F"},
  titles=["Why Some Apps Are So Confusing (UX Research Explained)"]))

X['19-why-ux-researchers-watch-users'] = dict(
 css=""".t{background:var(--ground)}
.h1{left:56px;top:50px;font-size:92px;color:#17140F;line-height:.98}
.h1 .acc{color:var(--accent)}
.bub{left:60px;top:320px;width:500px;padding:34px 38px;border-radius:40px 40px 40px 8px;background:#17140F;color:#fff !important;color:#17140F;font:900 62px/1.02 'Grot';letter-spacing:-.03em}
.lab{position:absolute;font:500 38px/1 'Mono';letter-spacing:.06em;text-transform:uppercase;color:#6B6457}
.ph{left:840px;top:250px;--pw:370px;--ph:400px;rotate:4deg}
.ic{position:absolute;left:104px;top:60px;width:100px;height:100px;border-radius:26px;background:var(--accent)}
.zero{position:absolute;left:0;right:0;top:120px;white-space:nowrap;text-align:center;font:900 80px/1 'Grot';letter-spacing:-.04em;color:#17140F}
.neq{left:600px;top:330px;font-size:250px;color:var(--accent);line-height:1}
.zs{position:absolute;left:0;right:0;top:236px;white-space:nowrap;text-align:center;font:700 40px/1.1 'Archivo';color:#4A453C}
""",
 body="""<div class="hd grot h1 z2" data-k="hd"></div>
<div class="card bub z3" data-k="said"></div>
<div class="phone ph z3" data-move="phone"><div class="scr"><div class="zero" data-k="n"></div><div class="zs" data-k="ns"></div></div></div>
<div class="hd grot z4 neq" data-k="neq"></div>""",
 content=dict(direction="Faceless, built to read at 320 px: what a user SAYS (a big speech bubble, 'I'd use this every day!') against what they DO (their phone: the app opened 0 times this week), with a big orange '≠' between them: that gap is why UX researchers watch. Paper ground, one accent. References: yt tweet-card thumbnails ('Forget about going viral' 20, 'QUIT DATA NOW'), her database-indexes thumbnail (two things linked by an arrow).",
  thumbnail_text="Why UX researchers watch users", text=dict(hd="Why UX researchers<br><span class=\"acc\">watch users</span>", say="What they say", do="What they do", said="“I’d use this every day!”", neq="≠", n="0 times", ns="opened this week"),
  images={}, vars={"--ground":"#EDE9E2","--accent":"#E8501E"},
  titles=["UX Research: Why Users Say One Thing and Do Another"]))

X['20-start-ux-research-from-zero'] = dict(
 css=crop('9.5', 960, 400, 430) + """
.pane{position:absolute;left:0;top:0;width:600px;height:720px;background:var(--ground)}
.h1{left:52px;top:56px;font-size:100px;color:#fff;line-height:.98}
.fr{left:56px;top:300px;font-size:100px;color:#fff}
.z0{left:290px;top:176px;font-size:300px;color:var(--accent);line-height:1;letter-spacing:0}
.ex{left:56px;top:470px;font-size:96px;color:#fff}
""",
 body=f"""<div class="scene">{SC}</div>
<div class="pane z4"></div>
<div class="hd brico h1 z5" data-k="hd"></div>
<div class="hd brico fr z5" data-k="from"></div>
<div class="hd grot z0 z5" data-k="zero"></div>
<div class="hd brico ex z5" data-k="exp"></div>""",
 content=dict(direction="Big-face close crop: her calm face fills the right half, whole head in frame; on an off-black block on the left, 'UX research with 0 experience' with a giant yellow zero. References: yt 'Never get distracted again' (11, face + text block), 'Zero to Data scientist' (27), 'THEY LIED TO US' (24b).",
  thumbnail_text="UX research with 0 experience", text=dict(hd="UX research", **{"from": "with"}, zero="0", exp="experience"),
  images=dict(bg=bg('9.5'), cut=cut('9.5')), vars={"--ground":"#111114","--accent":"#FFD84D","--meb":"1.02"},
  titles=["How to Become a UX Researcher With No Experience"]))

for name, x in X.items():
    if args and not any(name.startswith(a) for a in args): continue
    d = os.path.join(D, name); os.makedirs(d, exist_ok=True)
    open(os.path.join(d, 'index.html'), 'w').write(HEAD.format(css=x['css'], body=x['body']))
    cf = os.path.join(d, 'content.json')
    if content or not os.path.exists(cf):
        old = json.load(open(cf)) if os.path.exists(cf) else {}
        c = dict(x['content'])
        if old.get('titles'): c['titles'] = old['titles']          # hand-fixed titles win
        c['title'] = old.get('title') or c['titles'][0]; c['set'] = 3
        if old.get('nudge'): c['nudge'] = old['nudge']
        n = int(name[:2]); c['kind'] = x['content'].get('kind') or ('photo' if n <= 8 else 'collage' if n <= 12 else 'graphic' if n <= 17 else 'other')
        json.dump(c, open(cf, 'w'), indent=2, ensure_ascii=False)
    print('wrote', name)
