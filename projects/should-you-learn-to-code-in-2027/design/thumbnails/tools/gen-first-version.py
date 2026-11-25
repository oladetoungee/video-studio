#!/usr/bin/env python3
"""FROZEN 2026-11-03 after critic round 2: the files in directions/ are the source now (her studio edits live there). Do not re-run with --force.
Writes the first version of every thumbnail direction (index.html + content.json), should-you-learn-to-code, 2026-11-03.
   python3 tools/gen-first-version.py             -> writes index.html for all; content.json only where it does not exist yet
   python3 tools/gen-first-version.py --force 03  -> also overwrites content.json of directions starting with 03 (loses studio edits!)
Once Gbemi edits a design in the studio, content.json is hers: never --force it. Freeze this file after the critic rounds."""
import json, os, sys

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
A = '../../assets'
force = '--force' in sys.argv
only = [a for a in sys.argv[1:] if not a.startswith('--')]

T = {
 1: "Should You Still Learn to Code in 2026? A Developer's Answer",
 2: "Is Learning to Code Worth It in 2026? A Developer's View",
 3: 'Should I Learn to Code in 2026? 4 Skills That Matter Now',
 4: "Is Coding Still Worth It in 2026? What I'd Focus On",
 5: 'Learn to Code With AI: 4 Skills Beginners Need Now',
 6: 'Junior Developer Jobs in 2026: Should You Still Code?',
 8: 'Only 4.5% of Developer Job Posts Are Entry Level. Now What?',
 9: "What I'd Tell a Beginner Developer Right Now (2026)",
 10: 'AI Writes the Code Now. These 4 Skills Still Matter',
 11: 'Junior Developer Jobs Are Rare. Should You Still Code?',
 12: "Learning to Code Won't Promise You a Junior Role",
 13: 'Coding With AI? Learn to Read the Code It Writes',
}

# her head in each frame (1280x720 space): centre x, top of hair (measured from the person layers)
HEAD = {'105.4': (597, 227), '140.0': (614, 246), '22.6': (717, 214), '234.3': (713, 244), '237.0': (615, 245),
        '252.5': (616, 241), '362.5': (611, 252), '52.1': (702, 216), '170.0': (609, 239)}

def place(t, s, X, Y):
    """scale s about (640, 216), then move so her head centre lands on X and the top of her hair on Y"""
    hx, top = HEAD[t]
    tx = X - 640 - (hx - 640) * s
    ty = Y - 216 - (top - 216) * s
    # keep the room covering the whole frame (no strip of ground at an edge)
    tx = max(640 - 640 * s, min(640 * s - 640, tx))
    ty = max(504 - 504 * s, min(216 * s - 216, ty))
    return {'--sc': f'{s}', '--sc-x': f'{round(tx)}px', '--sc-y': f'{round(ty)}px'}

def scene(t, cls=''):
    b = (f'<div class="scene {cls} z1" data-move="room"><img class="bg" data-img="room" src="{A}/frames/f_{t}.jpg" alt="">'
         f'<div class="wash"></div><div class="dim"></div></div>')
    f = f'<div class="scene {cls} z3" data-move="her"><img class="me-c" data-img="me" src="{A}/scene/gbemi-{t}-person.png" alt=""></div>'
    return b, f

def imgs(t): return {'room': f'{A}/frames/f_{t}.jpg', 'me': f'{A}/scene/gbemi-{t}-person.png'}

def sheet(name, bar_l, bar_r, lines, style, fs=34):
    """the review sheet: lines = [(kind, key)] kind in add / del / ctx / hl"""
    sg = {'add': '+', 'del': '-', 'ctx': '', 'hl': ''}
    ls = ''.join(f'<div class="ln {k}" style="font-size:{fs}px"><span class="sg">{sg[k]}</span><span class="tx" data-k="{key}"></span></div>' for k, key in lines)
    bar = '' if bar_l is None else f'<div class="bar"><span data-k="{bar_l}"></span><span class="r" data-k="{bar_r}"></span></div>'
    return f'<div class="sheet" data-move="{name}" style="{style}">{bar}<div style="padding:12px 0 14px">{ls}</div></div>'

D = []
def d(name, kind, words, titles, direction, css, body, text, images=None, vars=None, rec=False, cls=''):
    D.append(dict(name=name, kind=kind, words=words, titles=[T[i] for i in titles], direction=direction, css=css, body=body,
                  text=text, images=images or {}, vars=vars or {}, rec=rec, cls=cls))

SIGNUP = {'bar': 'signup.js', 'barr': 'suggested by AI'}

# ================================================================ PHOTO (her real frame)
HEAD.update({'96.6': (610, 225), '383.0': (619, 248)})
COLL = """.scene.natural .bg{filter:saturate(1) contrast(1.05) brightness(var(--bgb,1.12))}"""

# ================================================================ PHOTO (her real frame)
b, f = scene('52.1')
d('01-entry-level-4-5', 'photo', '4.5% JUNIOR DEV JOBS', [1, 3, 5],
  "Photo background: her room washed dark slate so it goes calm, she in full colour on the right, closed mouth, calm. The number is the topic: 4.5% huge in amber and what it is a share of in two heavy lines (Indeed: 4.5% of software development postings were entry level, Q1 2026). References: viral 1 'FINANCIAL LITERACY' (the topic huge beside the person), her ux-research thumbnail (room washed one colour), outliers with one big number.",
  """.only{left:62px;top:40px;font-size:72px;color:#fff}
.big{left:54px;top:120px;font-size:250px;color:var(--accent);letter-spacing:-.06em}
.lv{left:60px;top:350px;font-size:112px;color:#fff;line-height:.92}""",
  f"""{b}{f}<div class="hd only z4" data-k="only"></div><div class="hd big z4" data-k="big"></div><div class="hd lv z4" data-k="lv"></div>""",
  dict(only='Only', big='4.5%', lv='junior<br>dev jobs'),
  imgs('52.1'), {'--wash': '#5E6A78', '--bgb': '.62', '--bgc': '1.1', **place('52.1', 1.95, 900, 90)}, rec=True)

b, f = scene('22.6', 'natural')
d('02-where-are-junior-jobs', 'photo', 'WHERE ARE JUNIOR JOBS?', [1, 3, 9],
  "Photo background, natural colour, darkened: she points her thumb at a generic job search on the left: 'junior developer' typed in, and the two results both say SENIOR in amber. The question names the topic for a stranger. References: viral 5 (topic named, the scene shows it), her saved thumbnails with a search bar, kit TH7.",
  """.hd{left:44px;top:34px;font-size:88px;color:#fff;line-height:.95}
.srch{left:44px;top:250px;width:620px}
.srch .q{font-family:'MMono';font-weight:700;font-size:36px;padding:18px 22px;border-bottom:4px solid var(--ink)}
.srch .q i{display:inline-block;width:5px;height:40px;background:var(--ink);vertical-align:-7px;margin-left:4px}
.res{padding:10px 22px 14px}
.res div{display:flex;justify-content:space-between;align-items:center;gap:16px;font-weight:800;font-size:38px;letter-spacing:-.02em;white-space:nowrap;padding:16px 0;border-bottom:3px solid #E4E7EB}
.res div:last-child{border-bottom:0}
.res b{font-family:'MMono';font-weight:800;font-size:28px;background:#1B1F24;color:#fff;padding:4px 12px}""",
  f"""{b}{f}<div class="hd z4 shadow-t" data-k="hd"></div>
<div class="sheet srch z4" data-move="search"><div class="q"><span data-k="q"></span><i></i></div>
<div class="res"><div><span data-k="r1"></span><b data-k="l1"></b></div><div><span data-k="r2"></span><b data-k="l2"></b></div></div></div>""",
  dict(hd='Where are<br><span class="blk">junior</span> jobs?', q='junior developer', r1='Software Engineer', l1='SENIOR', r2='Backend Developer', l2='SENIOR'),
  imgs('22.6'), {'--bgb': '.55', **place('22.6', 1.6, 1000, 120)}, rec=True)

b, f = scene('234.3', 'natural')
d('03-4-skills-to-learn', 'photo', '4 SKILLS TO LEARN', [1, 8, 11],
  "Photo background: her room washed in the film's cool grey, she in full colour raising her open hand towards a big review sheet. The sheet is the plan written as a code change: four green added lines, the four skills, big enough to read on a phone. References: viral 2 (clipboard checklist), viral 4 (a list beside the person), kit TH3.",
  """.hd{left:46px;top:34px;font-size:112px;color:#fff}
.plan{left:600px;top:180px;width:650px}""",
  f"""{b}{f}<div class="hd z4" data-k="hd"></div>
{sheet('plan', None, None, [('add', 'l1'), ('add', 'l2'), ('add', 'l3'), ('add', 'l4')], '', 54).replace('class="sheet"', 'class="sheet plan z4"')}""",
  dict(hd='<span class="blk">4 skills</span> to learn', bar='learning-to-code.md', barr='', l1='read code', l2='debug', l3='fundamentals', l4='domain'),
  imgs('234.3'), {'--bgb': '.75', **place('234.3', 1.5, 310, 250)})

b, f = scene('105.4', 'natural')
d('04-can-you-read-ai-code', 'photo', 'CAN YOU READ AI CODE?', [5, 1, 10],
  "Photo background, natural colour, darkened: she looks worried on the right. On the left a big code card with three lines and the one she would question marked in amber. The words name the skill and the AI part plainly. References: the outliers (face + code editor), viral 4 (the object beside the person), kit TH4.",
  """.hd{left:46px;top:30px;font-size:96px;color:#fff;line-height:.95}
.code{left:46px;top:300px;width:620px}""",
  f"""{b}{f}<div class="hd z4 shadow-t" data-k="hd"></div>
{sheet('code', None, None, [('ctx', 'c1'), ('hl', 'c2'), ('ctx', 'c3')], '', 46).replace('class="sheet"', 'class="sheet code z4"')}""",
  dict(hd='Can you read<br><span class="blk">AI code?</span>', bar='signup.js', barr='', c1='try {', c2='  db.insert(user)', c3='} catch (e) { }'),
  imgs('105.4'), {'--bgb': '.6', **place('105.4', 1.6, 1000, 110)})

b, f = scene('362.5', 'bw')
d('05-ai-writes-you-review', 'photo', 'AI WRITES. YOU REVIEW.', [1, 3, 5],
  "Photo background, the film's idea: her room washed grey, she in black and white on the left (calm, closed mouth). On the right, big, the AI's change as a diff: one red removed line, two green added lines. References: viral 4 (diagram beside the person), her database-indexes thumbnail (one mechanism drawn big), the film's look B.",
  """.hd{left:580px;top:50px;font-size:92px;line-height:1}
.diff{left:580px;top:290px;width:670px}""",
  f"""{b}{f}<div class="hd z4" data-k="hd"></div>
{sheet('diff', None, None, [('del', 'l1'), ('add', 'l2'), ('add', 'l3')], '', 44).replace('class="sheet"', 'class="sheet diff z4"')}""",
  dict(hd='<span class="blkk">AI writes.</span><br><span class="blk">You review.</span>', bar='signup.js', barr='by AI', l1='save(user)', l2='try { save(user) }', l3='catch (e) { }'),
  imgs('362.5'), {'--wash': '#E9EBEE', '--bgb': '1.7', '--bgc': '.75', **place('362.5', 1.6, 290, 170)})

b, f = scene('252.5')
d('06-should-you-learn-to-code', 'photo', 'SHOULD YOU LEARN TO CODE?', [8, 10, 11],
  "Photo background washed in the film's one accent (amber) so the room goes flat and loud, she in full colour on the right with a wry, doubtful look. The words are the topic name, plain and huge, like her database-indexes and ux-research thumbnails, and one big literal object: a keyboard. References: her two own thumbnails (topic name huge + one object), viral 1.",
  """.hd{left:46px;top:40px;font-size:122px;line-height:.92}
.jc{left:50px;top:470px;width:520px;padding:24px 28px;rotate:-3deg}
.jc .role{font-size:54px}.jc .lvl{font-size:30px;background:var(--ink);color:var(--accent);margin-top:14px;padding:6px 14px}""",
  f"""{b}{f}<div class="hd z4" data-k="hd"></div>
<div class="card jc z4" data-move="jobcard"><div class="role" data-k="role"></div><span class="lvl" data-k="lvl"></span></div>""",
  dict(hd='Should you<br>learn<br>to code?', role='Junior Developer', lvl='ENTRY LEVEL'),
  {**imgs('252.5')}, {'--wash': '#F2A900', '--bgb': '1.25', '--bgc': '.8', **place('252.5', 1.6, 985, 130)}, rec=True)

b, f = scene('96.6', 'natural')
d('07-advice-for-new-coders', 'photo', 'ADVICE FOR NEW CODERS', [3, 1, 11],
  "Photo background: her room washed the film's light grey, she in full colour, smiling, warm and direct. The words say who it is for; one amber note gives the first piece of advice from the video in plain words. References: viral 5 (person + topic named), her saved 'one box' thumbnails, kit TH10.",
  """.hd{left:46px;top:40px;font-size:104px;line-height:.95;color:#fff}
.nt{left:60px;top:400px;width:470px;rotate:-3deg;padding:20px 26px 24px}
.nt .say{font-size:70px;line-height:1}""",
  f"""{b}{f}<div class="hd z4" data-k="hd"></div>
<div class="note nt z5" data-move="note"><div class="say" data-k="say"></div></div>""",
  dict(hd='Advice for<br>new coders', say='Build with AI first'),
  imgs('96.6'), {'--bgb': '.8', **place('96.6', 1.6, 960, 120)})

# ================================================================ COLLAGE (her natural photo + one die-cut object + one line)
b, f = scene('383.0', 'natural')
d('08-collage-ai-codes-you-check', 'collage', 'AI codes. You check.', [5, 3, 1],
  "Collage over her full natural photo, she glances sideways as if checking: one die-cut code card from AI with the empty catch, a gold magnifying glass held over it, one heavy serif line on a cream paper strip. No scribbles. References: viral collage 'Thought of these?', 'Time to lock in.', kit TH11.",
  COLL + """.strip{position:absolute;left:40px;top:500px;background:#FFFDF6;color:var(--ink);font-family:'DSerif',serif;font-size:92px;line-height:1;padding:14px 26px 20px;rotate:-2deg;white-space:nowrap;box-shadow:0 14px 26px rgba(0,0,0,.3)}
.strip em{font-family:'DSerifI',serif;font-style:normal;background:var(--accent);padding:0 .08em}
.code{left:40px;top:50px;width:520px;rotate:-4deg}
.mag{position:absolute;left:330px;top:95px;width:280px;rotate:8deg}""",
  f"""{b}{f}
{sheet('code', None, None, [('ctx', 'c1'), ('hl', 'c2')], '', 44).replace('class="sheet"', 'class="sheet code stk z4"')}
<img class="stk mag z5" data-move="magnifier" data-img="mag" src="{A}/collage/magnifier.png" alt="">
<div class="strip z5" data-move="strip" data-k="line"></div>""",
  dict(line='AI codes. <em>You</em> check.', bar='from AI', barr='', c1='try { save() }', c2='catch (e) { }'),
  {**imgs('383.0'), 'mag': f'{A}/collage/magnifier.png'}, {'--bgb': '1.15', **place('383.0', 1.5, 900, 110)})

b, f = scene('170.0', 'natural')
d('09-collage-no-job-guaranteed', 'collage', 'Learn to Code · NO JOB GUARANTEED', [11, 1, 3],
  "Collage over her natural photo: one big die-cut 'Learn to Code' certificate of completion with a red stamp across it, NO JOB GUARANTEED. Nothing else. The honest point of the video (learning is worth it, a junior role is not promised) in one object. References: viral collage 'Capsule wardrobe', her ghana-marrify clipping taste (the key words marked), kit TH13.",
  COLL + """.cert{position:absolute;left:30px;top:90px;width:640px;background:#FFFDF6;border:5px solid var(--ink);padding:12px;rotate:-5deg;color:var(--ink)}
.cert .in{border:3px solid var(--ink);padding:30px 26px 40px;text-align:center}
.cert .k{font-family:'MMono';font-weight:700;font-size:24px;letter-spacing:.05em}
.cert .ct{font-family:'DSerif',serif;font-size:80px;white-space:nowrap;line-height:1;margin-top:18px}
.cert .n{font-family:'Hand';font-weight:700;font-size:44px;margin-top:10px;color:#59636E}
.stamp{position:absolute;left:150px;top:345px;border:9px solid var(--red);color:var(--red);font-family:'Onest';font-weight:900;font-size:76px;line-height:.92;
  padding:14px 22px;rotate:-12deg;text-transform:uppercase;letter-spacing:-.03em;text-align:center;background:rgba(255,253,246,.9)}""",
  f"""{b}{f}
<div class="cert stk z4" data-move="certificate"><div class="in"><div class="k" data-k="ck"></div><div class="ct" data-k="ct"></div><div class="n" data-k="cn"></div></div></div>
<div class="stamp z5" data-move="stamp" data-k="stamp"></div>""",
  dict(ck='CERTIFICATE OF COMPLETION', ct='Learn to Code', cn='well done!', stamp='No job<br>guaranteed'),
  imgs('170.0'), {'--bgb': '1.15', **place('170.0', 1.9, 960, 90)}, rec=True)

# ================================================================ FLAT (the film's grey ground, the review sheet)
d('10-flat-what-to-learn-instead', 'flat', 'WHAT TO LEARN INSTEAD', [4, 1, 5],
  "Flat graphic on the film's cool grey: the beginner's plan as a code change. One red removed line (learn syntax) and four green added lines (the four skills), big. Her calm black-and-white cut-out on the right. One accent: the amber box on INSTEAD. References: her database-indexes thumbnail (topic huge, one mechanism, her small B&W cut-out with an outline), the film's frame b6.",
  """.hd{left:46px;top:36px;font-size:96px}
.plan{left:46px;top:180px;width:720px}
.me{right:-60px;height:600px}""",
  f"""<div class="hd z4" data-k="hd"></div>
{sheet('plan', None, None, [('del', 'l1'), ('add', 'l3'), ('add', 'l4'), ('add', 'l5'), ('add', 'l6')], '', 50).replace('class="sheet"', 'class="sheet plan z3"')}
<img class="cut bw ol me z2" data-move="her" data-img="me" src="{A}/cut/gbemi-52.1.png" alt="">""",
  dict(hd='What to learn <span class="blk">instead</span>', bar='learning-to-code.md', barr='', l1='learn syntax', l3='read code', l4='debug', l5='fundamentals', l6='domain'),
  {'me': f'{A}/cut/gbemi-52.1.png'}, {'--ground': '#E9EBEE'}, rec=True)

d('11-flat-skills-over-syntax', 'flat', 'SKILLS > SYNTAX', [4, 1, 9],
  "Flat graphic: two big tiles stacked on the left, a red one with SYNTAX struck through and a green one with READING CODE, and her cut-out with an ink outline on the right, glancing at them. Her words in the video: focus on other things, as opposed to learning syntax or how to write a for loop. References: viral 3 (the framework drawn), kit TH8.",
  """.hd{left:46px;top:34px;font-size:120px}
.tile{position:absolute;left:46px;width:570px;height:200px;border:5px solid var(--ink);display:flex;align-items:center;padding:0 34px;font-family:'Onest';font-weight:900;text-transform:uppercase;letter-spacing:-.03em;white-space:nowrap}
.tl{top:200px;background:var(--redbg);color:#A3141E;font-size:96px}.tl span{text-decoration:line-through;text-decoration-thickness:10px}
.tr{top:440px;background:var(--greenbg);color:#0F5A26;font-size:62px}
.me{right:-40px;height:520px;--ol:#1B1F24}""",
  f"""<div class="hd z4" data-k="hd"></div>
<div class="tile tl z2" data-move="syntax"><span data-k="kl"></span></div>
<div class="tile tr z2" data-move="skills" data-k="kr"></div>
<img class="cut ol me z3" data-move="her" data-img="me" src="{A}/cut/gbemi-252.5.png" alt="">""",
  dict(hd='Skills <span class="blk">&gt;</span> syntax', kl='Syntax', kr='Reading code'),
  {'me': f'{A}/cut/gbemi-252.5.png'}, {'--ground': '#E9EBEE'})

d('12-flat-junior-jobs-are-rare', 'flat', 'JUNIOR JOBS ARE RARE', [1, 3, 9],
  "Flat graphic: the career ladder from the film (A's ladder redrawn in B's colours, her pick). Every rung says SENIOR or MID; the bottom rung is missing, a dashed amber outline marked JUNIOR. Her calm cut-out, big, beside it. References: her database-indexes thumbnail (one literal mechanism, her cut-out with an outline), the film's frame b5.",
  """.hd{left:46px;top:30px;font-size:92px}
.lad{position:absolute;left:870px;top:150px;width:200px;height:570px}
.rail{position:absolute;top:0;bottom:0;width:22px;background:var(--ink)}
.rung{position:absolute;left:0;right:0;height:22px;background:var(--ink)}
.miss{position:absolute;left:22px;right:22px;height:30px;border:6px dashed #C98C00}
.tg{position:absolute;left:1090px;font-family:'MMono';font-weight:800;font-size:32px;background:var(--ink);color:#fff;padding:6px 14px}
.tg.j{background:var(--accent);color:var(--ink)}
.me{left:70px;height:640px;bottom:-170px;--ol:#1B1F24}""",
  f"""<div class="hd z4" data-k="hd"></div>
<div class="lad z2" data-move="ladder"><div class="rail" style="left:0"></div><div class="rail" style="right:0"></div>
<div class="rung" style="top:50px"></div><div class="rung" style="top:170px"></div><div class="rung" style="top:290px"></div>
<div class="miss" style="top:408px"></div></div>
<div class="tg z3" data-move="r1" data-k="r1" style="top:182px"></div><div class="tg z3" data-move="r2" data-k="r2" style="top:302px"></div>
<div class="tg z3" data-move="r3" data-k="r3" style="top:422px;background:#59636E"></div><div class="tg j z3" data-move="jr" data-k="jr" style="top:540px"></div>
<img class="cut ol me z3" data-move="her" data-img="me" src="{A}/cut/gbemi-362.5.png" alt="">""",
  dict(hd='Junior jobs are <span class="blk">rare</span>', r1='SENIOR', r2='SENIOR', r3='MID', jr='JUNIOR?'),
  {'me': f'{A}/cut/gbemi-362.5.png'}, {'--ground': '#E9EBEE'}, rec=True)

d('13-flat-ai-fixed-it', 'flat', 'AI "FIXED" IT? SIGNED UP: 0', [13, 5, 3],
  "Flat graphic on ink (the one dark option): the sign-up bug from the video, made readable at phone size. One code line (the empty catch the AI added), the crash gone in green and SIGNED UP: 0 huge in red. Her doubtful cut-out with an amber outline. References: the outliers (face + code), her database-indexes thumbnail (dark ground, one mechanism), the film's frames b3-b4.",
  """.hd{left:46px;top:40px;font-size:104px;color:#fff}
.code{left:46px;top:200px;width:480px}
.ok{position:absolute;left:50px;top:350px;font-family:'MMono';font-weight:800;font-size:46px;color:#4AC26B}
.su{position:absolute;left:46px;top:430px;font-family:'Onest';font-weight:900;font-size:106px;line-height:1;color:#FF5A5F;letter-spacing:-.04em;text-transform:uppercase;white-space:nowrap}
.me{right:-30px;height:560px;--ol:#F2A900}""",
  f"""<div class="hd z4" data-k="hd"></div>
{sheet('code', None, None, [('add', 'c1')], '', 44).replace('class="sheet"', 'class="sheet code z3"')}
<div class="ok z3" data-k="s1" data-move="crash"></div><div class="su z4" data-k="s2" data-move="signed"></div>
<img class="cut ol me z2" data-move="her" data-img="me" src="{A}/cut/gbemi-105.4.png" alt="">""",
  dict(hd='AI <span class="blk">"fixed"</span> it?', bar='signup.js', barr='', c1='catch (e) { }', s1='Crash: gone ✓', s2='Signed up: 0'),
  {'me': f'{A}/cut/gbemi-105.4.png'}, {'--ground': '#1B1F24', '--fg': '#FFFFFF'})

# ================================================================ OTHER
d('14-other-indeed-clipping', 'other', '4.5% in software development in Q1 2026 (Indeed, real headline)', [6, 3, 1],
  "No face, her ghana-marrify 10b taste: the real Indeed Hiring Lab headline (a screenshot) on a paper clipping on white, slightly tilted, with the report's own words under it, the number marked in amber; beside it a generic phone job app where both big cards say SENIOR and one small card says ENTRY LEVEL. The quote is word for word from the report; a small credit stays. References: her 10b clipping edit, kit TH9.",
  """.clip{position:absolute;left:30px;top:90px;width:790px;background:#fff;padding:24px 26px 30px;border:3px solid var(--ink);rotate:-3deg;box-shadow:0 22px 40px rgba(0,0,0,.18)}
.clip img{display:block;width:100%}
.qt{font-family:'DSerif',serif;font-size:64px;line-height:1.04;margin-top:22px;color:var(--ink);letter-spacing:-.01em}
.qt span{background:var(--accent);padding:0 .08em}
.cr{position:absolute;left:40px;top:640px;font-family:'MMono';font-weight:600;font-size:22px;color:#59636E;rotate:-3deg}
.phone{position:absolute;left:870px;top:40px;width:340px;height:660px;background:var(--ink);border-radius:46px;padding:14px;rotate:4deg;box-shadow:0 26px 50px rgba(0,0,0,.25)}
.scr{background:#F6F7F9;border-radius:34px;width:100%;height:100%;overflow:hidden;padding:50px 18px 18px}
.scr .h{font-weight:900;font-size:36px;letter-spacing:-.03em}
.scr .card{position:relative;margin-top:16px;padding:16px 16px}
.scr .card .role{font-size:30px}
.scr .card .lvl{font-size:22px;background:var(--ink);color:#fff}
.scr .card.jr{padding:10px 12px;width:230px}
.scr .card.jr .role{font-size:22px}.scr .card.jr .lvl{font-size:16px;background:var(--accent);color:var(--ink)}""",
  f"""<div class="clip z2" data-move="clipping"><img data-img="title" src="{A}/src/ind-title.png" alt=""><div class="qt" data-k="quote"></div></div>
<div class="cr z2" data-k="credit"></div>
<div class="phone z3" data-move="phone"><div class="scr"><div class="h" data-k="ph"></div>
<div class="card"><div class="role" data-k="j1"></div><span class="lvl" data-k="k1"></span></div>
<div class="card"><div class="role" data-k="j2"></div><span class="lvl" data-k="k2"></span></div>
<div class="card"><div class="role" data-k="j3"></div><span class="lvl" data-k="k3"></span></div>
<div class="card jr"><div class="role" data-k="j5"></div><span class="lvl" data-k="k5"></span></div></div></div>""",
  dict(quote='<span>4.5%</span> in software<br>development in Q1 2026', credit='Indeed Hiring Lab, 23 Jul 2026', ph='Developer jobs', j1='Engineer', k1='SENIOR', j2='Developer', k2='SENIOR',
       j3='Tech Lead', k3='SENIOR', j5='Junior Developer', k5='ENTRY LEVEL'),
  {'title': f'{A}/src/ind-title.png'}, {'--ground': '#FFFFFF'})

def cards(prefix, n):
    return ''.join(f'<div class="card"><div class="role" data-k="{prefix}{i}"></div><span class="lvl" data-k="{prefix}l{i}"></span></div>' for i in range(1, n + 1))
d('15-other-then-vs-now', 'other', 'THEN vs NOW', [6, 3, 1],
  "Split before / after: left half on the film's grey, THEN, two big job cards marked ENTRY LEVEL in amber; right half on ink, NOW, big cards all SENIOR and one tiny junior card. Her cut-out at the seam with both palms open. No numbers, so nothing is invented. References: her saved before/after and Day 1 / Day 900 splits, kit TH6.",
  """.half{position:absolute;top:0;bottom:0;width:640px}
.hl{left:0;background:#E9EBEE}.hr{left:640px;background:var(--ink)}
.hd{top:30px;font-size:120px}
.g{position:absolute;top:180px;display:flex;flex-direction:column;gap:14px;width:420px}
.g .card{position:relative;padding:14px 18px}
.g .card .role{font-size:36px}
.g .card .lvl{font-size:24px}
.gl{left:40px}.gr2{left:820px}
.gl .lvl{background:var(--accent)!important}
.gr2 .card:last-child{width:260px;padding:10px 12px}
.gr2 .card:last-child .role{font-size:24px}.gr2 .card:last-child .lvl{font-size:16px;background:var(--accent)}
.me{left:170px;height:420px;bottom:-110px;--ol:#FFFFFF}""",
  f"""<div class="half hl z1"></div><div class="half hr z1"></div>
<div class="hd z4" data-k="then" style="left:40px"></div><div class="hd z4" data-k="now" style="left:820px;color:#fff"></div>
<div class="g gl z2" data-move="then-board">{cards('a', 2)}</div>
<div class="g gr2 z2" data-move="now-board">{cards('b', 3)}</div>
<img class="cut ol me z3" data-move="her" data-img="me" src="{A}/cut/gbemi-237.0.png" alt="">""",
  dict(then='Then', now='<span class="acc">Now</span>', a1='Junior Developer', al1='ENTRY LEVEL', a2='Graduate Developer', al2='ENTRY LEVEL',
       b1='Senior Engineer', bl1='SENIOR', b2='Senior Developer', bl2='SENIOR', b3='Junior Developer', bl3='ENTRY LEVEL'),
  {'me': f'{A}/cut/gbemi-237.0.png'}, {'--ground': '#E9EBEE'})

d('16-other-yes-but', 'other', 'LEARN TO CODE? YES, BUT…', [8, 11, 1],
  "Full-bleed amber (the film's punchline colour, used once): the question and her answer, with a catch, in an ink block, and her smiling cut-out with an ink outline. It tells a stranger the topic and that the answer is not a plain yes. References: her saved 'one word in a box' thumbnails ('stop lying to yourself'), the film's frame b7.",
  """.hd{left:50px;top:70px;font-size:130px;line-height:.95}
.ans{left:50px;top:360px;font-size:130px}
.me{right:-20px;height:620px;--ol:#1B1F24}""",
  f"""<div class="hd z4" data-k="hd"></div><div class="hd ans z4" data-k="ans"></div>
<img class="cut ol me z2" data-move="her" data-img="me" src="{A}/cut/gbemi-140.0.png" alt="">""",
  dict(hd='Learn to<br>code?', ans='<span class="blkk">Yes, but…</span>'),
  {'me': f'{A}/cut/gbemi-140.0.png'}, {'--ground': '#F2A900'}, rec=True)

# ---------------------------------------------------------------- write
# dropped after critic round 2: 11 skills > syntax (cut-out artifacts, weakest); the rest renumbered
D = [x for x in D if not x['name'].startswith('11-flat-skills')]
for i, x in enumerate(D): x['name'] = f'{i + 1:02d}-' + x['name'][3:]
for x in D:
    if only and not any(x['name'].startswith(o) for o in only): continue
    dd = os.path.join(ROOT, 'directions', x['name']); os.makedirs(dd, exist_ok=True)
    html = (f'<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../../lib/rv.css"><style>\n{x["css"]}\n</style></head>'
            f'<body><div class="t {x["cls"]}">\n{x["body"]}\n</div><script src="../../lib/bind.js"></script></body></html>\n')
    open(os.path.join(dd, 'index.html'), 'w').write(html)
    cj = os.path.join(dd, 'content.json')
    if force or not os.path.exists(cj):
        c = {'direction': x['direction'], 'thumbnail_text': x['words'], 'titles': x['titles'], 'title': x['titles'][0], 'kind': x['kind'],
             'text': x['text'], 'images': x['images'], 'vars': x['vars'], 'recommended': x['rec'], 'scores': ''}
        open(cj, 'w').write(json.dumps(c, indent=1, ensure_ascii=False) + '\n')
    print('wrote', x['name'])
