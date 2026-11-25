"""Writes every thumbnail direction (index.html + content.json) for working-full-time (set 1, 2026-11-02).
   python3 tools/gen.py            -> writes index.html always; content.json only where it does not exist yet
   python3 tools/gen.py --force    -> also overwrites content.json (LOSES her studio edits: only before she has touched them)
   python3 tools/gen.py 03 07      -> only these
Then: node render.mjs (all + overview) or node render.mjs 03."""
import json, os, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FORCE = '--force' in sys.argv
ONLY = [a for a in sys.argv[1:] if not a.startswith('--')]

T = {  # the kit's titles (refined-kit 1a) + one variant
    1: "How I Work Full Time While Doing a Master's Abroad",
    2: "Working Full Time While Doing a Master's Abroad",
    3: "Masters While Working Full Time: My First Year",
    4: "Working Full Time While Studying Abroad (10 Tips)",
    5: "Can International Students Work Full Time in Estonia?",
    6: "Full-Time Job and Full-Time Master's: How I Plan My Week",
    7: "One Year of a Full-Time Job and a Full-Time Master's",
    8: "Studying in Europe as a Nigerian With a Full-Time Job",
    9: "My Week as a Developer and a Full-Time Master's Student",
    10: "I Work Full Time and Study Full Time. This Is How",
}
A = '../../assets/'
def scene(f, cls='', behind=''):
    return (f'<div class="scene {cls}" data-move="photo"><img class="bg" data-img="bg" alt=""><div class="wash"></div><div class="dim"></div>'
            f'{behind}<img class="me-c" data-img="me" alt=""></div>')
def simg(f): return {'bg': f'{A}scene/gbemi-{f}.jpg', 'me': f'{A}scene/gbemi-{f}-person.png'}
CODE = ('<div><span class="k">class</span> <span class="f">Invoice</span> {</div><div>&nbsp;&nbsp;<span class="k">public function</span> <span class="f">send</span>()</div>'
        '<div>&nbsp;&nbsp;{</div><div>&nbsp;&nbsp;&nbsp;&nbsp;<span class="k">return</span> <span class="s">\'sent\'</span>;</div><div>&nbsp;&nbsp;}</div><div>}</div>')
def lap(name='laptop', cls='', style=''):
    return f'<div class="lap {cls}" data-move="{name}" style="{style}"><div class="scr" data-k="code"></div><div class="base"></div></div>'
def page(name='notes', style='', h='notes_h', lines=('notes_1', 'notes_2', 'notes_3')):
    return (f'<div class="page" data-move="{name}" style="{style}"><div class="h" data-k="{h}"></div>' +
            ''.join(f'<div class="l" data-k="{k}"></div>' for k in lines) + '</div>')
def tcard(style, rows, name='timecard', week='WEEK 45', on=None):
    """rows: list of (day, w_in, w_out, c_in, c_out); a value starting with '!' is stamped red."""
    rs = ''
    for i, r in enumerate(rows):
        tds = f'<td>{r[0]}</td>' + ''.join(f'<td class="r">{v[1:]}</td>' if v.startswith('!') else f'<td>{v}</td>' for v in r[1:])
        rs += f'<tr class="{"on" if on == i else ""}">{tds}</tr>'
    return (f'<div class="tc" data-move="{name}" style="{style}"><div class="top"><span class="ti" data-k="tc_title">TIME CARD</span><span class="wk">{week}</span></div>'
            f'<div class="nm" data-k="tc_name"></div><table><tr><th></th><th colspan="2">Work<small>IN &nbsp; OUT</small></th><th colspan="2">Class<small>IN &nbsp; OUT</small></th></tr>{rs}</table></div>')
ARROW = lambda d, w=10, col='var(--accent)', head='': f'<svg class="draw z5" width="1280" height="720" data-move="arrow"><path d="{d}" fill="none" stroke="{col}" stroke-width="{w}" stroke-linecap="round" stroke-linejoin="round"/>{head}</svg>'

D = {}

# ---------------- PHOTO BACKGROUND (8) ----------------
D['01-job-plus-masters'] = dict(
    kind='photo', recommended=True, words="JOB + MASTER'S", titles=[T[1], T[2], T[4]],
    direction="Photo background (kit T1, recommended). Her room washed in one warm charcoal so it goes quiet, she calm in full colour in the middle; the topic huge across the top; the two halves of her day as two big objects: a laptop with code (the job) and lecture notes (the master's). Follows her ux-research thumbnail (washed room, three big things) and viral sample 1 (topic huge).",
    css=""".hd{left:0;right:0;top:20px;text-align:center;font-size:206px}
.lap{left:36px;top:388px;--lw:380px;rotate:-5deg}
.page{right:44px;top:372px;width:330px;rotate:5deg}""",
    body=scene('564.3') + '<div class="hd z3 shadow-t" data-k="hd"></div>' + lap(cls='z4') + page(style='', name='notes').replace('class="page"', 'class="page z4"'),
    text={'hd': 'Job <span class="acc">+</span> Master\'s', 'code': CODE, 'notes_h': 'Lecture 07', 'notes_1': 'read 2 papers', 'notes_2': 'essay due Thu', 'notes_3': '6 ECTS'},
    images=simg('564.3'), vars={'--wash': '#6B5638', '--dim': 'rgba(24,20,15,.38)', '--sc': '1.3', '--sc-x': '-30px', '--sc-y': '0px', '--accent': '#C8102E'})

D['02-full-time-x2'] = dict(
    kind='photo', recommended=True, words='FULL TIME x2', titles=[T[10], T[2]],
    direction="Photo background (kit T12, recommended). Her real 'this is a lot' gesture (both hands on her head, from her video), room washed dark, she in colour on the right. Left: FULL TIME huge and a red stamp x2; one plain line under it says what the two are. Follows the Pinterest moody scenes and the playbook's 'big words + real face'.",
    css=""".hd{left:54px;top:70px;font-size:290px;line-height:.8}
.stamp{left:480px;top:60px;font-size:170px;padding:6px 22px 0;rotate:-8deg;border-width:10px}
.sub{left:60px;top:560px;font-size:46px;color:var(--fg)}""",
    body=scene('565.9') + '<div class="hd z3 shadow-t" data-k="hd"></div><div class="stamp fill z4" data-k="stamp"></div><div class="sub z3 shadow-t" data-k="sub"></div>',
    text={'hd': 'Full<br>time', 'stamp': 'x2', 'sub': 'a job <span class="acc" style="color:#FF5470">and</span> a master\'s'},
    images=simg('565.9'), vars={'--wash': '#4E4436', '--dim': 'rgba(18,16,13,.45)', '--sc': '1.3', '--sc-x': '300px', '--sc-y': '0px'})

D['03-my-work-class-week'] = dict(
    kind='photo', words='MY WORK + CLASS WEEK', titles=[T[9], T[6]],
    direction="Photo background, real object (kit T11, here the film's time card instead of paper). She calm on the left, her room washed; her week as a punch-clock time card on the right: work IN/OUT and class IN/OUT, the class times stamped red. The words name the topic. Follows viral sample 3 (the framework drawn big) and the film's look B.",
    css=""".hd{left:40px;top:28px;font-size:128px}
.tc{left:600px;top:170px;width:640px;rotate:3deg}
.tc td{font-size:34px;padding:9px 4px}""",
    body=scene('564.3') + '<div class="hd z3 shadow-t" data-k="hd"></div>' + tcard('', [('MON', '09:00', '17:00', '!17:45', '!20:00'), ('TUE', '09:00', '17:00', '', ''), ('WED', '09:00', '17:00', '!17:45', '!20:00'), ('THU', '09:00', '17:00', '!18:00', '!21:00'), ('FRI', '09:00', '17:00', '', '')]).replace('class="tc"', 'class="tc z4"'),
    text={'hd': 'My work <span class="acc">+</span> class week', 'tc_title': 'TIME CARD', 'tc_name': 'NAME &nbsp; GBEMI'},
    images=simg('564.3'), vars={'--wash': '#5B5650', '--dim': 'rgba(22,19,14,.36)', '--sc': '1.28', '--sc-x': '-330px', '--sc-y': '0px'})

MONTHS = ['NOV', 'DEC', 'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT']
D['04-one-year-of-both'] = dict(
    kind='photo', words='1 YEAR OF BOTH', titles=[T[7], T[3]],
    direction="Photo background (kit T3). She smiling on the right, room washed; on the left a manila year card, twelve months crossed off in red from October 2025, the outcome in one object. Words: 1 YEAR OF BOTH + a plain line saying what 'both' is. Follows viral sample 2 (one object = the outcome).",
    css=""".hd{left:44px;top:26px;font-size:170px}
.sub{left:50px;top:182px;font-size:40px;color:var(--fg)}
.yr{position:absolute;left:52px;top:262px;width:560px;background:var(--manila);color:var(--ink);padding:20px 22px 24px;rotate:-3deg;box-shadow:0 24px 50px rgba(0,0,0,.5)}
.yr .yt{font:28px/1 'Cutive';letter-spacing:.06em;border-bottom:1px solid var(--rules);padding-bottom:10px;margin-bottom:12px}
.yr .gm{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}
.yr .gm div{position:relative;border:2px solid var(--rules);font:400 46px/1 'Bebas';text-align:center;padding:16px 0 10px}
.yr .gm div:after{content:'';position:absolute;inset:8px 18px;background:linear-gradient(45deg,transparent 46%,var(--red) 46% 54%,transparent 54%),linear-gradient(-45deg,transparent 46%,var(--red) 46% 54%,transparent 54%);opacity:.92}""",
    body=scene('86.1') + '<div class="hd z3 shadow-t" data-k="hd"></div><div class="sub z3 shadow-t" data-k="sub"></div>'
    '<div class="yr z4" data-move="year"><div class="yt" data-k="yr_t"></div><div class="gm">' + ''.join(f'<div>{m}</div>' for m in MONTHS) + '</div></div>',
    text={'hd': '1 year of <span class="acc">both</span>', 'sub': 'a full-time job + a full-time master\'s', 'yr_t': 'OCT 2025 &rarr; OCT 2026'},
    images=simg('86.1'), vars={'--wash': '#5B4B33', '--dim': 'rgba(22,19,14,.36)', '--sc': '1.3', '--sc-x': '330px', '--sc-y': '0px'})

D['05-9-5-work-5-9-class'] = dict(
    kind='photo (split)', words='9-5 WORK / 5-9 CLASS', titles=[T[3], T[10]],
    direction="Split before/after (kit T2): two real frames of her side by side, the left half washed warm like daytime with 9-5 WORK, the right half washed night charcoal with 5-9 CLASS (red). Two clock times are the whole idea. Follows the Mattheos '9-5 / 5-9' outlier (kit 7c) and the Day 1 / Day 900 splits on her board.",
    css=""".half{width:640px}.half.l{left:0}.half.r{left:640px}
.half.l .scene{--sc:1.32;--sc-x:-320px;--sc-y:0px}
.half.r .scene{--sc:1.32;--sc-x:-320px;--sc-y:0px}
.half.l .wash{background:#C99A55}.half.l .dim{background:rgba(30,22,10,0)}.half.l .bg{filter:grayscale(1) brightness(1.45) contrast(1.05)}
.half.r .wash{background:#3B3D4A}.half.r .dim{background:rgba(10,10,16,.42)}
.n{position:absolute;top:18px;font:400 210px/.86 'Bebas';color:var(--fg);text-shadow:0 10px 30px rgba(0,0,0,.35)}
.n.a{left:0;width:640px;text-align:center;color:#FFF6E2}.n.b{left:640px;width:640px;text-align:center}
.stamp{bottom:18px;font-size:84px;border-width:8px}
.s1{left:24px;rotate:-6deg;color:var(--ink);background:var(--manila);border-color:var(--manila)}
.s2{right:24px;rotate:5deg}
.div{position:absolute;left:636px;top:0;width:8px;height:720px;background:var(--manila)}""",
    body='<div class="half l" data-move="left"><div class="scene" data-move="photo"><img class="bg" data-img="bg" alt=""><div class="wash"></div><div class="dim"></div><img class="me-c" data-img="me" alt=""></div></div>'
    '<div class="half r" data-move="right"><div class="scene" data-move="photo2"><img class="bg" data-img="bg2" alt=""><div class="wash"></div><div class="dim"></div><img class="me-c" data-img="me2" alt=""></div></div>'
    '<div class="div z3"></div><div class="n a z4" data-k="left"></div><div class="n b z4" data-k="right"></div><div class="stamp fill s1 z5" data-k="s1"></div><div class="stamp fill s2 z5" data-k="s2"></div>',
    text={'left': '9-5', 'right': '5-9', 's1': 'Work', 's2': 'Class'},
    images={'bg': f'{A}scene/gbemi-499.5.jpg', 'me': f'{A}scene/gbemi-499.5-person.png', 'bg2': f'{A}scene/gbemi-472.5.jpg', 'me2': f'{A}scene/gbemi-472.5-person.png'},
    vars={})

WEEK1 = {"w": 600, "h": 400, "from": 8, "to": 22, "step": 2, "blocks": [
    {"d": 0, "s": 9, "e": 17, "k": "w", "t": "work"}, {"d": 1, "s": 9, "e": 17, "k": "w", "t": "work"}, {"d": 2, "s": 9, "e": 17, "k": "w", "t": "work"},
    {"d": 3, "s": 9, "e": 17, "k": "w", "t": "work"}, {"d": 4, "s": 9, "e": 17, "k": "w", "t": "work"},
    {"d": 0, "s": 17.75, "e": 20, "k": "c", "t": "class"}, {"d": 2, "s": 17.75, "e": 20, "k": "c", "t": "class"},
    {"d": 1, "s": 19, "e": 21, "k": "s", "t": "read"}, {"d": 3, "s": 17.75, "e": 20, "k": "c", "t": "class"}]}
D['06-one-calendar-photo'] = dict(
    kind='photo', recommended=True, words='ONE CALENDAR', titles=[T[6], T[9]],
    direction="Photo background (kit T8 in a photo version, recommended). Her real palms-up gesture presents a big manila week calendar where work (black) and class (red) sit on ONE grid. Room washed, she in colour on the right. Exactly her ux-research method: one big object she gestures at, topic in plain words on top.",
    css=""".hd{left:40px;top:24px;font-size:170px}
.sub{left:46px;top:170px;font-size:40px;color:var(--fg)}
.week{left:40px;top:244px;rotate:-2deg}""",
    body=scene('186.9') + '<div class="hd z3 shadow-t" data-k="hd"></div><div class="sub z3 shadow-t" data-k="sub"></div>'
    f"<div class=\"week z4\" data-move=\"calendar\" data-week='{json.dumps(WEEK1)}'></div>",
    text={'hd': 'One <span class="acc">calendar</span>', 'sub': 'for work and school'},
    images=simg('186.9'), vars={'--wash': '#5E4E36', '--dim': 'rgba(22,19,14,.36)', '--sc': '1.12', '--sc-x': '330px', '--sc-y': '0px'})

D['07-work-study-in-estonia'] = dict(
    kind='photo (words behind her)', words='WORK + STUDY IN ESTONIA', titles=[T[5], T[1]],
    direction="Photo background with the word behind her head (kit T7): ESTONIA huge behind her (she in front, her real cut-out), WORK + STUDY IN above it, the Estonian flag as a small tag. The place is the topic for people searching 'work and study in Estonia'. Follows the Pinterest 'big word behind the head' examples (FAVOR, POV, UI UX).",
    css=""".behind{position:absolute;left:0;right:0;top:146px;text-align:center;font:400 330px/.8 'Bebas';color:var(--fg);letter-spacing:.01em}
.hd{left:0;right:0;top:30px;text-align:center;font-size:120px}
.flag{left:1010px;top:42px;width:150px;height:96px;rotate:6deg}""",
    body=scene('564.3', behind='<div class="behind" data-k="big"></div>') + '<div class="hd z3 shadow-t" data-k="hd"></div>'
    '<div class="flag h z4" data-move="flag"><i style="background:#0072CE"></i><i style="background:#000"></i><i style="background:#fff"></i></div>',
    text={'hd': 'Work <span class="acc">+</span> study in', 'big': 'ESTONIA'},
    images=simg('564.3'), vars={'--wash': '#8E2E30', '--dim': 'rgba(30,12,12,.38)', '--sc': '1.32', '--accent': '#F6EEDB', '--sc-x': '0px', '--sc-y': '0px'})

DIAL1 = {"r": 170, "arcs": [{"from": 0, "to": 7, "k": "sleep", "label": "SLEEP", "out": 78, "fs": 40}, {"from": 9, "to": 17, "k": "work", "label": "WORK", "fs": 46},
                            {"from": 17.75, "to": 20, "k": "class", "label": "CLASS", "out": 78, "fs": 44}, {"from": 20, "to": 22, "k": "study", "label": "STUDY", "out": 78, "fs": 44}]}
D['08-24-hours-photo-dial'] = dict(
    kind='photo + drawn idea', words="FULL-TIME JOB + MASTER'S IN 24 HOURS", titles=[T[6], T[1]],
    direction="Photo background + A's 24-hour dial (her pick: B + A's dial). Her real hand-to-head moment on the left, room washed; on the right the 24-hour dial: sleep, work 9-17 in red, class and study hatched and manila. The words name the problem plainly: a full-time job and a master's in one day.",
    css=""".hd{right:40px;top:24px;font-size:96px;text-align:right}
svg.dial{left:720px;top:236px}""",
    body=scene('235.5') + '<div class="hd z3 shadow-t" data-k="hd"></div>' + f"<svg class=\"dial z4\" data-move=\"dial\" data-dial='{json.dumps(DIAL1)}'></svg>",
    text={'hd': 'Job + master\'s<br>in <span class="acc">24 hours</span>'},
    images=simg('235.5'), vars={'--wash': '#4C4234', '--dim': 'rgba(18,16,13,.46)', '--sc': '1.26', '--sc-x': '-300px', '--sc-y': '0px'})

# ---------------- COLLAGE (4) ----------------
D['09-collage-working-student'] = dict(
    kind='collage', words="working full time & a master's", titles=[T[1], T[2]],
    direction="Collage over her full natural photo (her 10-07 style: 'Time to lock in', 'Capsule wardrobe'): she calm in her real room, the objects of her week floating around her (a laptop with code, lecture books, coffee, a wall clock, meal-prep boxes), tiny handwritten labels, ONE big serif line on a dark band naming the topic. Pexels objects, credited in NOTES.md.",
    css=""".band{left:0;right:0;bottom:62px;text-align:center}
.band .s{font:400 92px/1 'DMS';color:#F6EEDB;white-space:nowrap}.band .s i{font-family:'DMSi';color:#FF5A6E}
.lap{left:46px;top:96px;--lw:300px;rotate:-8deg}
.o-books{right:36px;top:250px;width:250px;rotate:4deg}
.o-coffee{left:250px;top:330px;width:170px}
.o-clock{right:300px;top:26px;width:150px}
.o-meal{right:40px;top:40px;width:230px;rotate:-6deg}
.lab.l1{left:70px;top:58px;rotate:-6deg}.lab.l2{right:56px;top:220px;rotate:3deg}.lab.l3{right:70px;top:190px}.lab.l4{left:250px;top:300px;rotate:-4deg}""",
    body=scene('564.3', cls='nat') + lap(cls='z4') +
    f'<img class="obj o-books z4" data-img="books" alt=""><img class="obj o-coffee z4" data-img="coffee" alt=""><img class="obj o-clock z4" data-img="clock" alt=""><img class="obj o-meal z4" data-img="meal" alt="">'
    '<div class="lab l1 z5" data-k="l1"></div><div class="lab l3 z5" data-k="l3"></div><div class="lab l4 z5" data-k="l4"></div>'
    '<div class="band z6" data-move="band"><div class="s" data-k="line"></div></div>',
    text={'code': CODE, 'line': 'working full time <i>&amp; a master\'s</i>', 'l1': '9 to 5', 'l3': 'meal prep Sunday', 'l4': 'class at 6'},
    images=dict(simg('564.3'), books=f'{A}collage/books.png', coffee=f'{A}collage/coffee.png', clock=f'{A}collage/clock.png', meal=f'{A}collage/mealprep.png'),
    vars={'--sc': '1.12', '--sc-x': '0px', '--sc-y': '0px', '--bgb': '1.08'})

D['10-collage-nigeria-to-estonia'] = dict(
    kind='collage', words='NIGERIA → ESTONIA', titles=[T[8], T[1]],
    direction="Collage (kit T10, the family look of her biggest video 'nobody warned me about studying in Europe as a Nigerian'): two flags joined by a hand-drawn red arrow, a laptop and books riding the arrow, her natural photo on the right, a small tag saying what she does there.",
    css=""".hd{left:44px;font-size:128px}.hd.a{top:34px}.hd.b{top:520px}
.flag{width:170px;height:108px}.f1{left:380px;top:40px;rotate:-5deg}.f2{left:380px;top:540px;rotate:4deg}
.lap{left:170px;top:270px;--lw:250px;rotate:-6deg}
.o-books{left:20px;top:330px;width:170px;rotate:-4deg}
.tag{left:440px;top:330px;rotate:3deg;font-size:44px}""",
    body=scene('499.5', cls='nat') +
    '<div class="hd a z4 shadow-t" data-k="from"></div><div class="hd b z4 shadow-t" data-k="to"></div>'
    '<div class="flag f1 z4" data-move="flag1"><i style="background:#008751"></i><i style="background:#fff"></i><i style="background:#008751"></i></div>'
    '<div class="flag h f2 z4" data-move="flag2"><i style="background:#0072CE"></i><i style="background:#000"></i><i style="background:#fff"></i></div>'
    + ARROW('M 590 170 C 700 260, 690 420, 590 520', 12, head='<path d="M 560 486 L 590 522 L 632 500" fill="none" stroke="var(--accent)" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>') + lap(cls='z5') +
    '<img class="obj o-books z5" data-img="books" alt=""><div class="tag z6" data-k="tag"></div>',
    text={'from': 'Nigeria', 'to': 'Estonia', 'code': CODE, 'tag': "job + master's"},
    images=dict(simg('499.5'), books=f'{A}collage/books.png'),
    vars={'--sc': '1.2', '--sc-x': '330px', '--sc-y': '0px', '--bgb': '.92', '--accent': '#C8102E'})

D['11-collage-desk-flatlay'] = dict(
    kind='collage (flat-lay)', words='work + study abroad', titles=[T[1], T[4]],
    direction="Collage as a desk flat-lay on manila paper: her photo as a taped polaroid, the time card, a laptop with code, books, coffee and a wall clock laid around one big serif line. No room photo at all, so it reads well small. Follows viral sample 9 (collage of things) and the 'polaroid insert' in her decks.",
    css=""".t{background:var(--ground)}
.ln{position:absolute;left:0;right:0;top:250px;text-align:center;font:400 128px/1 'DMS';color:var(--ink)}.ln i{font-family:'DMSi';color:var(--accent)}
.pol{position:absolute;left:520px;top:24px;width:240px;background:#fff;padding:12px 12px 40px;rotate:-3deg;box-shadow:0 16px 30px rgba(0,0,0,.3)}
.pol img{display:block;width:216px;height:200px;object-fit:cover;object-position:50% 25%}
.pol .c{position:absolute;left:0;right:0;bottom:8px;text-align:center;font:700 26px/1 'Hand';color:var(--ink)}
.lap{left:40px;top:430px;--lw:330px;rotate:-6deg}
.o-books{right:40px;top:420px;width:270px;rotate:5deg}
.o-coffee{left:70px;top:40px;width:180px}
.o-clock{right:70px;top:40px;width:170px}
.mini{position:absolute;left:470px;top:420px;width:330px;background:#F3E8C8;color:var(--ink);padding:16px 18px;rotate:2deg;box-shadow:0 14px 26px rgba(0,0,0,.25);border:2px solid var(--rules)}
.mini .r{display:flex;justify-content:space-between;font:30px/1.5 'Cutive'}.mini .r b{font:400 34px/1.4 'Bebas';letter-spacing:.04em}.mini .r .x{color:var(--accent)}""",
    body='<div class="pol z3" data-move="polaroid"><img data-img="me" alt=""><div class="c" data-k="pol"></div></div><div class="ln z4" data-k="line"></div>' + lap(cls='z3') +
    '<img class="obj o-books z3" data-img="books" alt=""><img class="obj o-coffee z3" data-img="coffee" alt=""><img class="obj o-clock z3" data-img="clock" alt="">'
    '<div class="mini z3" data-move="card"><div class="r"><b>WORK</b><span>09:00-17:00</span></div><div class="r"><b>CLASS</b><span class="x">17:45-20:00</span></div></div>',
    text={'line': 'work <i>+ study</i> abroad', 'pol': 'Tallinn', 'code': CODE},
    images={'me': f'{A}frames/f_564.3.jpg', 'books': f'{A}collage/books.png', 'coffee': f'{A}collage/coffee.png', 'clock': f'{A}collage/clock.png'},
    vars={'--ground': '#E7D7AE', '--fg': '#1D1A15', '--accent': '#C8102E'})

D['12-collage-working-student-tips'] = dict(
    kind='collage', words='10 TIPS FOR WORKING STUDENTS', titles=[T[4], T[1]],
    direction="Collage over her full natural photo (palms raised, from her video): four manila tickets float around her, each one tip in two or three plain words (one calendar, study leave, meal prep, sleep); the promise '10 tips for working students' sits on a dark band. Follows viral sample 9 and her 'Thought of these?' collage sample.",
    css=""".band{left:0;right:0;bottom:44px;text-align:center}
.band .s{font:400 104px/1 'Bebas';color:#F6EEDB;white-space:nowrap;letter-spacing:.01em}
.tag{font-size:54px}.k1{left:40px;top:60px;rotate:-6deg}.k2{left:60px;top:300px;rotate:4deg}.k3{right:40px;top:70px;rotate:5deg}.k4{right:70px;top:310px;rotate:-4deg}
.tag b{color:var(--accent);font-weight:400;margin-right:12px}""",
    body=scene('382.5', cls='nat') + '<div class="tag k1 z4" data-k="k1"></div><div class="tag k2 z4" data-k="k2"></div><div class="tag k3 z4" data-k="k3"></div><div class="tag k4 z4" data-k="k4"></div>'
    '<div class="band z5" data-move="band"><div class="s" data-k="line"></div></div>',
    text={'k1': '<b>01</b>one calendar', 'k2': '<b>02</b>study leave', 'k3': '<b>03</b>meal prep', 'k4': '<b>04</b>sleep', 'line': '10 tips for <span class="acc" style="color:#FF5A6E">working students</span>'},
    images=simg('382.5'), vars={'--sc': '1.12', '--sc-x': '0px', '--sc-y': '0px', '--bgb': '1.0'})

# ---------------- FLAT GRAPHIC (5) ----------------
D['13-flat-time-card'] = dict(
    kind='flat graphic', words="FULL-TIME JOB + FULL-TIME MASTER'S", titles=[T[1], T[10]],
    direction="Flat, the film's look B as a thumbnail: charcoal wall, the topic stacked huge on the left (MASTER'S in stamp red), the manila time card on the right with Monday stamped (work 09:00-17:00, class 17:45-20:00), and her small black-and-white cut-out with a red outline. Follows her database-indexes bar (one mechanism, few big things, one accent).",
    css=""".hd{left:52px;top:110px;font-size:136px;line-height:.9}
.tc{left:700px;top:36px;width:540px;rotate:3deg}
.tc td{font-size:31px;padding:10px 4px}
.cut{left:420px;height:330px}""",
    body='<div class="hd z3" data-k="hd"></div>' + tcard('', [('MON', '09:00', '17:00', '!17:45', '!20:00'), ('TUE', '', '', '', ''), ('WED', '', '', '', ''), ('THU', '', '', '', ''), ('FRI', '', '', '', '')], on=0).replace('class="tc"', 'class="tc z4"') +
    '<img class="cut bw z5" data-img="me" alt="">',
    text={'hd': 'Full-time job<br>+ full-time<br><span class="acc">master\'s</span>', 'tc_title': 'TIME CARD', 'tc_name': 'NAME &nbsp; GBEMI'},
    images={'me': f'{A}cut/gbemi-564.3.png'}, vars={'--ground': '#23201B', '--fg': '#E7D7AE', '--accent': '#C8102E'})

DIAL2 = {"r": 230, "arcs": [{"from": 0, "to": 7, "k": "sleep", "label": "SLEEP", "out": 96, "fs": 50}, {"from": 9, "to": 17, "k": "work", "label": "WORK", "fs": 56},
                            {"from": 17.75, "to": 20, "k": "class", "label": "CLASS", "out": 96, "fs": 54}, {"from": 20, "to": 22, "k": "study", "label": "STUDY", "out": 96, "fs": 54}],
         "center": "24H", "cfs": 130}
D['14-flat-24-hour-dial'] = dict(
    kind='flat graphic (dial)', words="JOB + MASTER'S IN 24 HOURS", titles=[T[6], T[9]],
    direction="Flat, A's 24-hour dial in the time-card palette: one day as a ring, work 9-17 in red, class hatched, study in manila, sleep in grey. The words say the problem plainly. Follows viral sample 3 (the framework drawn big) and her database-indexes bar.",
    css=""".hd{left:52px;top:130px;font-size:128px;line-height:.9}
svg.dial{left:640px;top:62px}""",
    body='<div class="hd z3" data-k="hd"></div>' + f"<svg class=\"dial z4\" data-move=\"dial\" data-dial='{json.dumps(DIAL2)}'></svg>",
    text={'hd': 'Job +<br>master\'s<br><span class="acc">in 24 hours</span>'},
    images={}, vars={'--ground': '#23201B', '--fg': '#E7D7AE', '--accent': '#C8102E'})

WEEK2 = {"w": 820, "h": 470, "from": 8, "to": 22, "step": 2, "blocks": [
    {"d": 0, "s": 9, "e": 17, "k": "w", "t": "work", "fs": 28}, {"d": 1, "s": 9, "e": 17, "k": "w", "t": "work", "fs": 28}, {"d": 2, "s": 9, "e": 17, "k": "w", "t": "work", "fs": 28},
    {"d": 3, "s": 9, "e": 17, "k": "w", "t": "work", "fs": 28}, {"d": 4, "s": 9, "e": 17, "k": "w", "t": "work", "fs": 28},
    {"d": 0, "s": 17.75, "e": 20, "k": "c", "t": "class", "fs": 28}, {"d": 2, "s": 17.75, "e": 20, "k": "c", "t": "class", "fs": 28},
    {"d": 3, "s": 17.75, "e": 20, "k": "c", "t": "class", "fs": 28}, {"d": 1, "s": 19, "e": 21.5, "k": "s", "t": "read 2 papers", "fs": 24}],
    "ring": {"d": 1, "s": 19, "e": 21.5}}
D['15-flat-one-calendar'] = dict(
    kind='flat graphic', words='WORK + CLASS, ONE CALENDAR', titles=[T[6], T[9]],
    direction="Flat (kit T8): a big week calendar on manila, work in black and class in red on the same grid, Tuesday's study block ringed in red; her colour cut-out with a charcoal outline presents it. Words name the method. Follows the PCFGSTUDY 'Schedule-maxxing' outlier (calendar) and her database-indexes bar.",
    css=""".hd{left:40px;top:22px;font-size:120px;color:var(--ink)}
.week{left:36px;top:150px;background:#F3E8C8;box-shadow:none;border:1px solid var(--ink)}
.cut{right:-40px;height:470px}""",
    body='<div class="hd z3" data-k="hd"></div>' + f"<div class=\"week z3\" data-move=\"calendar\" data-week='{json.dumps(WEEK2)}'></div>" + '<img class="cut ol z5" data-img="me" alt="">',
    text={'hd': 'Work + class, <span class="acc">one calendar</span>'},
    images={'me': f'{A}cut/gbemi-186.9.png'}, vars={'--ground': '#E7D7AE', '--fg': '#1D1A15', '--accent': '#C8102E', '--ol': '#1D1A15'})

D['16-flat-job-by-day'] = dict(
    kind='flat graphic (split)', words="JOB BY DAY, MASTER'S BY NIGHT", titles=[T[3], T[10]],
    direction="Flat split: manila day on the left (JOB BY DAY + the laptop), charcoal night on the right (MASTER'S BY NIGHT + lecture notes), a punched time-card strip across the middle (work OUT 17:00, class IN 17:45 in red). Follows the before/after splits on her board.",
    css=""".dayh{position:absolute;left:0;top:0;width:640px;height:720px;background:var(--manila)}
.hd{font-size:136px;top:34px;line-height:.86}.h1{left:44px;color:var(--ink)}.h2{left:684px;color:var(--fg)}
.lap{left:120px;top:380px;--lw:400px;rotate:-3deg}
.page{left:770px;top:436px;width:400px;rotate:3deg}
.strip{position:absolute;left:390px;top:286px;width:500px;background:#F3E8C8;color:var(--ink);border:1px solid var(--ink);padding:10px 18px;rotate:-3deg;box-shadow:0 16px 30px rgba(0,0,0,.4)}
.strip .r{display:flex;justify-content:space-between;align-items:baseline;font:36px/1.35 'Cutive'}.strip b{font:400 40px/1.3 'Bebas';letter-spacing:.05em}.strip .x{color:var(--accent)}""",
    body='<div class="dayh"></div><div class="hd h1 z3" data-k="day"></div><div class="hd h2 z3" data-k="night"></div>' + lap(cls='z3') + page().replace('class="page"', 'class="page z3"') +
    '<div class="strip z5" data-move="strip"><div class="r"><b data-k="s1k"></b><span data-k="s1v"></span></div><div class="r x"><b data-k="s2k"></b><span data-k="s2v"></span></div></div>',
    text={'day': 'Job<br>by day', 'night': 'Master\'s<br><span class="acc">by night</span>', 'code': CODE, 'notes_h': 'Lecture 07', 'notes_1': 'read 2 papers', 'notes_2': 'essay due Thu', 'notes_3': '6 ECTS',
          's1k': 'WORK OUT', 's1v': '17:00', 's2k': 'CLASS IN', 's2v': '17:45'},
    images={}, vars={'--ground': '#23201B', '--fg': '#E7D7AE', '--accent': '#C8102E'})

TIPS = ['Check the work rules', 'Plan your credits', 'Plan the whole degree', 'Block your week', 'Use class time', 'One calendar', 'Study leave', 'Tell people early', 'Pick your kind of job', 'Meal prep + sleep']
D['17-flat-10-tips-checklist'] = dict(
    kind='flat graphic (checklist)', words='10 TIPS FOR WORKING STUDENTS', titles=[T[4], T[1]],
    direction="Flat (kit T4): the 10 tips as a manila checklist, each ticked in red, beside '10 TIPS' huge; her colour cut-out with a manila outline points the way. Everything on the list is in the video (the kit's 01-10 counter). Follows viral sample 2 (the DONE clipboard) and her database-indexes bar.",
    css=""".hd{left:46px;top:40px;font-size:230px;line-height:.8}
.sub{left:52px;top:420px;font:400 74px/.95 'Bebas';color:var(--fg);white-space:normal;width:340px;letter-spacing:.01em}
.list{position:absolute;left:400px;top:30px;width:470px;background:var(--manila);color:var(--ink);padding:18px 24px 14px;rotate:2deg;box-shadow:0 24px 50px rgba(0,0,0,.5)}
.list div{font:600 30px/1.42 'Work';border-bottom:2px solid var(--rules);display:flex;gap:14px;white-space:nowrap}
.list div:last-child{border:none}.list b{color:var(--accent);font:400 34px/1.3 'Bebas';width:28px}
.cut{right:-60px;height:420px}""",
    body='<div class="hd z3" data-k="hd"></div><div class="sub z3" data-k="sub"></div><div class="list z4" data-move="checklist">' + ''.join(f'<div><b>&#10003;</b><span data-k="tip{i}"></span></div>' for i in range(10)) + '</div>'
    '<img class="cut ol z5" data-img="me" alt="">',
    text=dict({'hd': '<span class="acc">10</span><br>tips', 'sub': 'for working students'}, **{f'tip{i}': v for i, v in enumerate(TIPS)}),
    images={'me': f'{A}cut/gbemi-130.5.png'}, vars={'--ground': '#23201B', '--fg': '#E7D7AE', '--accent': '#C8102E'})

# ---------------- OTHER (5) ----------------
D['18-real-page-can-students-work'] = dict(
    kind='other (real screenshot)', words='CAN STUDENTS WORK FULL TIME?', titles=[T[5], T[2]],
    direction="Real source (kit T6): the real Study in Estonia 'Working' page line, untouched crop, 'not limited' marked in yellow, credit under it; the question in plain words above; a red ESTONIA stamp; her calm cut-out on the right. Follows the ghana 10b clipping look and the playbook's 'screenshot as the heading'.",
    css=""".hd{left:46px;top:30px;font-size:132px;line-height:.9}
.clip{left:50px;top:300px;width:820px;rotate:-2deg}
.stamp{left:520px;top:236px;font-size:76px;rotate:6deg}
.cut{right:-30px;height:560px}""",
    body='<div class="hd z3" data-k="hd"></div><div class="clip z4" data-move="screenshot"><div class="im"><img data-img="shot" alt=""><div class="mk" style="left:8.7%;top:65%;width:22.6%;height:26%"></div></div><div class="cr" data-k="credit"></div></div>'
    '<div class="stamp fill z5" data-k="stamp"></div><img class="cut ol z3" data-img="me" alt="">',
    text={'hd': 'Can students work<br><span class="acc">full time?</span>', 'credit': 'studyinestonia.ee, Working &middot; 2 Nov 2026', 'stamp': 'In Estonia'},
    images={'shot': f'{A}src/sie-hours.png', 'me': f'{A}cut/gbemi-499.5.png'}, vars={'--ground': '#23201B', '--fg': '#E7D7AE', '--accent': '#C8102E'})

def idc(cls, k, v, img_key, style, bg, fg):
    return (f'<div class="idc {cls}" data-move="{cls}" style="{style};background:{bg};color:{fg}"><div class="ph"><img data-img="{img_key}" alt=""></div>'
            f'<div><div class="k" data-k="{cls}_k"></div><div class="v" data-k="{cls}_v"></div></div><div class="bar"></div></div>')
D['19-other-two-cards'] = dict(
    kind='other (objects, no room)', words='EMPLOYEE + STUDENT', titles=[T[9], T[7]],
    direction="Objects only (kit T9 without the photo shoot): two generic ID cards, a manila work badge and a red student card, both with her photo from the video, both stamped FULL TIME. No logos, no school or company names. The words say the two roles plainly. Follows the playbook 'props in frame 1'.",
    css=""".hd{left:0;right:0;top:34px;text-align:center;font-size:150px}
.c1{left:140px;top:280px;rotate:-6deg}.c2{left:690px;top:300px;rotate:5deg}
.stamp{left:440px;top:540px;font-size:92px;rotate:-6deg}""",
    body='<div class="hd z3" data-k="hd"></div>' + idc('c1', 'EMPLOYEE', '', 'me', '', '#E7D7AE', '#1D1A15') + idc('c2', 'STUDENT', '', 'me2', '', '#C8102E', '#F6EEDB') +
    '<div class="stamp fill z5" data-k="stamp"></div>',
    text={'hd': 'Employee <span class="acc">+</span> student', 'c1_k': 'EMPLOYEE', 'c1_v': 'SOFTWARE DEVELOPER<br>FULL TIME', 'c2_k': 'STUDENT', 'c2_v': "MASTER'S DEGREE<br>FULL TIME", 'stamp': 'Both full time'},
    images={'me': f'{A}frames/f_564.3.jpg', 'me2': f'{A}frames/f_499.5.jpg'}, vars={'--ground': '#23201B', '--fg': '#E7D7AE', '--accent': '#C8102E'})

D['20-real-page-study-leave'] = dict(
    kind='other (real law text)', words='STUDY LEAVE IN ESTONIA', titles=[T[5], T[2]],
    direction="Real source: the Adult Education Act § 13 on Riigi Teataja (English text), untouched crop, 'up to thirty calendar days in a year' marked, credit under it; 30 DAYS and 20 PAID as stamps. A working student who searches 'study leave Estonia' recognises it at once. A secondary option (it names one part of the video).",
    css=""".hd{left:46px;top:34px;font-size:150px;line-height:.88}
.sub{left:50px;top:300px;font-size:42px;color:var(--fg)}
.clip{left:50px;top:390px;width:820px;rotate:-1.5deg}
.s1{left:850px;top:70px;font-size:112px;rotate:-6deg;color:var(--fg);border-color:var(--fg)}
.s2{left:870px;top:330px;font-size:112px;rotate:5deg}""",
    body='<div class="hd z3" data-k="hd"></div><div class="sub z3" data-k="sub"></div><div class="clip z4" data-move="screenshot"><div class="im"><img data-img="shot" alt=""><div class="mk" style="left:1.1%;top:65.4%;width:24.6%;height:11.8%"></div></div><div class="cr" data-k="credit"></div></div>'
    '<div class="stamp s1 z5" data-k="s1"></div><div class="stamp fill s2 z5" data-k="s2"></div>',
    text={'hd': 'Study leave<br><span class="acc">in Estonia</span>', 'sub': 'if you work while you study', 'credit': 'riigiteataja.ee, Adult Education Act &sect; 13 &middot; 2 Nov 2026', 's1': '30 days', 's2': '20 paid'},
    images={'shot': f'{A}src/rt-aea-s13.png'}, vars={'--ground': '#23201B', '--fg': '#E7D7AE', '--accent': '#C8102E'})

D['21-desk-split-no-face'] = dict(
    kind='other (objects split, no face)', words="FULL-TIME JOB + FULL-TIME MASTER'S", titles=[T[2], T[10]],
    direction="No face, two halves of one desk: the laptop with code on charcoal (the job), lecture notes on manila (the master's), a big red + stamp joining them. Reads at 168 px as 'job + school'. For Test & Compare against the photo options.",
    css=""".r{position:absolute;left:640px;top:0;width:640px;height:720px;background:var(--manila)}
.hd{top:34px;font-size:118px;line-height:.88;width:600px;text-align:center}.h1{left:20px;color:var(--fg)}.h2{left:660px;color:var(--ink)}
.lap{left:90px;top:330px;--lw:460px;rotate:-3deg}
.page{left:760px;top:310px;width:420px;rotate:3deg}
.plus{position:absolute;left:560px;top:200px;width:160px;height:160px;background:var(--accent);color:#F6EEDB;font:400 200px/1 'Bebas';text-align:center;padding-top:8px;rotate:-6deg;filter:url(#ink)}""",
    body='<div class="r"></div><div class="hd h1 z3" data-k="job"></div><div class="hd h2 z3" data-k="masters"></div>' + lap(cls='z3') + page().replace('class="page"', 'class="page z3"') +
    '<div class="plus z5" data-move="plus">+</div>',
    text={'job': 'Full-time<br>job', 'masters': 'Full-time<br><span class="acc">master\'s</span>', 'code': CODE, 'notes_h': 'Lecture 07', 'notes_1': 'read 2 papers', 'notes_2': 'essay due Thu', 'notes_3': '6 ECTS'},
    images={}, vars={'--ground': '#23201B', '--fg': '#E7D7AE', '--accent': '#C8102E'})

D['22-punch-clock'] = dict(
    kind='other (object, drawn)', words='OFF WORK AT 5, CLASS AT 6', titles=[T[3], T[6]],
    direction="One drawn object: a punch clock (generic) with the time card in its slot, the clock face at six; the words are two plain times anyone understands: off work at 5, class at 6. Follows the film's look B (the clock runs on 'really') and viral sample 2 (one object = the idea).",
    css=""".hd{left:50px;top:150px;font-size:150px;line-height:.9}
.pc{position:absolute;left:800px;top:20px;width:420px;height:640px}
.pc .box{position:absolute;inset:0 0 120px 0;background:#3A3631;border-radius:26px;box-shadow:0 30px 60px rgba(0,0,0,.55)}
.pc .face{position:absolute;left:60px;top:46px;width:300px;height:300px;border-radius:50%;background:#F3E8C8;border:0 solid #1D1A15}
.pc .slot{position:absolute;left:70px;top:420px;width:280px;height:22px;background:#111;border-radius:6px}
.pc .card{position:absolute;left:100px;top:300px;width:220px;height:390px;background:var(--manila);border:2px solid var(--rules);padding:236px 14px 0;color:var(--ink);z-index:-1}
.pc .card div{font:24px/1.6 'Cutive';border-bottom:2px solid var(--rules)}.pc .card .x{color:var(--accent)}
svg.hands{position:absolute;left:60px;top:46px}""",
    body='<div class="hd z3" data-k="hd"></div><div class="pc z4" data-move="clock"><div class="card"><div data-k="c1"></div><div class="x" data-k="c2"></div></div><div class="box"></div><div class="face"></div><div class="slot"></div>'
    '<svg class="hands" width="300" height="300" viewBox="0 0 300 300">' + ''.join(f'<line x1="{150+118*__import__("math").cos(i*__import__("math").pi/6)}" y1="{150+118*__import__("math").sin(i*__import__("math").pi/6)}" x2="{150+102*__import__("math").cos(i*__import__("math").pi/6)}" y2="{150+102*__import__("math").sin(i*__import__("math").pi/6)}" stroke="#1D1A15" stroke-width="7"/>' for i in range(12)) +
    '<line x1="150" y1="150" x2="150" y2="78" stroke="#1D1A15" stroke-width="12" stroke-linecap="round" transform="rotate(180 150 150)"/><line x1="150" y1="150" x2="150" y2="42" stroke="#C8102E" stroke-width="8" stroke-linecap="round" transform="rotate(0 150 150)"/><circle cx="150" cy="150" r="11" fill="#1D1A15"/></svg></div>',
    text={'hd': 'Off work at 5,<br><span class="acc">class at 6</span>', 'c1': 'OUT 17:00', 'c2': 'IN 18:00'},
    images={}, vars={'--ground': '#23201B', '--fg': '#E7D7AE', '--accent': '#C8102E'})

# ---------------- ROUND 2: fixes from the cold critic (round 1, 2026-11-02) ----------------
# One class time everywhere (18:00, "class at 6"); props bigger and fewer; faces bigger; duplicates made different.
def upd(name, **kw):
    for k, v in kw.items():
        if k == 'css_add': D[name]['css'] += '\n' + v
        elif k == 'text_upd': D[name]['text'].update(v)
        elif k == 'vars_upd': D[name]['vars'].update(v)
        elif k == 'images_upd': D[name]['images'].update(v)
        else: D[name][k] = v
for n in D:
    D[n]['body'] = D[n]['body'].replace('!17:45', '!18:00')
# 01: headline +15 %, props 1.3x
upd('01-job-plus-masters', css_add=""".hd{font-size:236px;top:8px}
.lap{left:20px;top:360px;--lw:470px}
.page{right:24px;top:356px;width:400px}
.page .h{font-size:66px}.page .l{font:600 38px/45px 'Hand'}""")
# 02: plain line bigger
upd('02-full-time-x2', css_add=".sub{font-size:58px;top:548px}")
# 03: three rows, much bigger numbers
D['03-my-work-class-week']['body'] = scene('564.3') + '<div class="hd z3 shadow-t" data-k="hd"></div>' + tcard('', [('MON', '09:00', '17:00', '!18:00', '!20:00'), ('TUE', '09:00', '17:00', '', ''), ('WED', '09:00', '17:00', '!18:00', '!20:00')]).replace('class="tc"', 'class="tc z4"')
upd('03-my-work-class-week', css_add=""".hd{font-size:140px;top:20px}
.tc{left:560px;top:170px;width:690px}
.tc td{font-size:48px;padding:16px 6px}.tc td:first-child{font-size:34px}.tc th{font-size:28px}.tc th small{font-size:22px}""")
# 04: months OCT..SEP so the range matches; bigger crosses
D['04-one-year-of-both']['body'] = D['04-one-year-of-both']['body'].replace('<div>NOV</div><div>DEC</div><div>JAN</div><div>FEB</div><div>MAR</div><div>APR</div><div>MAY</div><div>JUN</div><div>JUL</div><div>AUG</div><div>SEP</div><div>OCT</div>',
    '<div>OCT</div><div>NOV</div><div>DEC</div><div>JAN</div><div>FEB</div><div>MAR</div><div>APR</div><div>MAY</div><div>JUN</div><div>JUL</div><div>AUG</div><div>SEP</div>')
upd('04-one-year-of-both', css_add=""".yr .gm div:after{inset:4px 10px;background:linear-gradient(45deg,transparent 42%,var(--red) 42% 58%,transparent 58%),linear-gradient(-45deg,transparent 42%,var(--red) 42% 58%,transparent 58%)}
.yr{top:250px;width:590px}.yr .yt{font-size:32px}""", text_upd={'yr_t': 'OCT 2025 &rarr; OCT 2026: 12 MONTHS'})
# 05: two different moments (calm by day, hands on her head at night), labels bigger
upd('05-9-5-work-5-9-class', images_upd={'bg2': f'{A}scene/gbemi-565.9.jpg', 'me2': f'{A}scene/gbemi-565.9-person.png', 'bg': f'{A}scene/gbemi-564.3.jpg', 'me': f'{A}scene/gbemi-564.3-person.png'},
    css_add=""".stamp{font-size:108px}.half.r .scene{--sc:1.3;--sc-x:-330px}""",
    direction="Split before/after (kit T2): two real moments of her side by side, calm in a warm daytime wash with 9-5 WORK, both hands on her head in a night wash with 5-9 CLASS (red). Two clock times are the whole idea. Follows the Mattheos '9-5 / 5-9' outlier (kit 7c) and the Day 1 / Day 900 splits on her board.")
# 06: three days only, blocks readable
WEEK1b = {"w": 600, "h": 420, "from": 8, "to": 22, "step": 2, "days": ["MON", "TUE", "WED"], "hours": False, "gut": 10, "blocks": [
    {"d": 0, "s": 9, "e": 17, "k": "w", "t": "work", "fs": 44}, {"d": 1, "s": 9, "e": 17, "k": "w", "t": "work", "fs": 44}, {"d": 2, "s": 9, "e": 17, "k": "w", "t": "work", "fs": 44},
    {"d": 0, "s": 18, "e": 20.5, "k": "c", "t": "class", "fs": 40}, {"d": 2, "s": 18, "e": 20.5, "k": "c", "t": "class", "fs": 40}, {"d": 1, "s": 18.5, "e": 21, "k": "s", "t": "study", "fs": 36}]}
D['06-one-calendar-photo']['body'] = scene('186.9') + '<div class="hd z3 shadow-t" data-k="hd"></div><div class="sub z3 shadow-t" data-k="sub"></div>' + f"<div class=\"week z4\" data-move=\"calendar\" data-week='{json.dumps(WEEK1b)}'></div>"
upd('06-one-calendar-photo', css_add=".week .dh{font-size:52px}")
# 07: words a little higher so the letter tops clear her hair
upd('07-work-study-in-estonia', css_add=".behind{top:118px}.hd{top:14px}")
# 08: bigger dial, three labels only
D['08-24-hours-photo-dial']['body'] = D['08-24-hours-photo-dial']['body'].replace(json.dumps(DIAL1), json.dumps({"r": 215, "th": 64, "nums": False, "arcs": [{"from": 0, "to": 7, "k": "sleep", "label": "SLEEP", "fs": 52}, {"from": 9, "to": 17, "k": "work", "label": "WORK", "fs": 62}, {"from": 18, "to": 22, "k": "class", "label": "CLASS", "out": 92, "fs": 60}]}))
upd('08-24-hours-photo-dial', css_add="svg.dial{left:690px;top:150px}.hd{font-size:92px}")
# 09: three props, each label beside its own object
D['09-collage-working-student']['body'] = (scene('564.3', cls='nat') + lap(cls='z4') +
    '<img class="obj o-books z4" data-img="books" alt=""><img class="obj o-meal z4" data-img="meal" alt="">'
    '<div class="lab l1 z5" data-k="l1"></div><div class="lab l3 z5" data-k="l3"></div><div class="lab l4 z5" data-k="l4"></div>'
    '<div class="band z6" data-move="band"><div class="s" data-k="line"></div></div>')
upd('09-collage-working-student', css_add=""".lap{left:40px;top:120px;--lw:360px}
.o-books{right:40px;top:300px;width:260px}.o-meal{right:40px;top:60px;width:280px}
.lab.l1{left:60px;top:76px}.lab.l3{right:60px;top:214px;rotate:3deg}.lab.l4{right:250px;top:300px;rotate:-5deg}""",
    text_upd={'l4': 'class at 6'}, images_upd={'coffee': None, 'clock': None})
D['09-collage-working-student']['images'] = {k: v for k, v in D['09-collage-working-student']['images'].items() if v}
# 10: flags and the two words only
D['10-collage-nigeria-to-estonia']['body'] = (scene('499.5', cls='nat') +
    '<div class="hd a z4 shadow-t" data-k="from"></div><div class="hd b z4 shadow-t" data-k="to"></div>'
    '<div class="flag f1 z4" data-move="flag1"><i style="background:#008751"></i><i style="background:#fff"></i><i style="background:#008751"></i></div>'
    '<div class="flag h f2 z4" data-move="flag2"><i style="background:#0072CE"></i><i style="background:#000"></i><i style="background:#fff"></i></div>'
    + ARROW('M 300 230 C 420 300, 420 400, 300 470', 14, head='<path d="M 262 444 L 300 474 L 346 456" fill="none" stroke="var(--accent)" stroke-width="14" stroke-linecap="round" stroke-linejoin="round"/>'))
upd('10-collage-nigeria-to-estonia', css_add=""".hd{font-size:176px}.hd.a{top:40px}.hd.b{top:500px}
.flag{width:190px;height:122px}.f1{left:470px;top:60px}.f2{left:470px;top:520px}""",
    direction="Collage (kit T10, the family look of her biggest video 'nobody warned me about studying in Europe as a Nigerian'): NIGERIA and ESTONIA huge, their flags, one hand-drawn red arrow between them, her natural photo on the right. Nothing else.")
D['10-collage-nigeria-to-estonia']['images'] = simg('499.5')
D['10-collage-nigeria-to-estonia']['text'] = {'from': 'Nigeria', 'to': 'Estonia'}
# 11: her polaroid big, two props, plainer words
upd('11-collage-desk-flatlay', css_add=""".pol{left:440px;top:20px;width:400px;padding:14px 14px 50px}.pol img{width:372px;height:300px}.pol .c{font-size:34px}
.ln{top:400px;font-size:112px}
.o-coffee,.o-clock{display:none}.lap{top:470px;left:30px;--lw:320px}.o-books{top:470px;width:240px}.mini{left:880px;top:90px;rotate:4deg}""",
    text_upd={'line': 'a job <i>+ a master\'s</i> abroad'}, words="a job + a master's abroad")
D['11-collage-desk-flatlay']['body'] = D['11-collage-desk-flatlay']['body'].replace('17:45-20:00', '18:00-20:00')
D['11-collage-desk-flatlay']['images'] = {k: v for k, v in D['11-collage-desk-flatlay']['images'].items() if k not in ('coffee', 'clock')}
D['11-collage-desk-flatlay']['body'] = D['11-collage-desk-flatlay']['body'].replace('<img class="obj o-coffee z3" data-img="coffee" alt=""><img class="obj o-clock z3" data-img="clock" alt="">', '')
# 12: two tips, bigger, crimson that matches the set
D['12-collage-working-student-tips']['body'] = (scene('382.5', cls='nat') + '<div class="tag k1 z4" data-k="k1"></div><div class="tag k3 z4" data-k="k3"></div>'
    '<div class="band z5" data-move="band"><div class="s" data-k="line"></div></div>')
upd('12-collage-working-student-tips', css_add=""".tag{font-size:72px}.k1{left:30px;top:250px}.k3{right:30px;top:250px}.band .s .acc{color:#FF4D63}""",
    text_upd={'line': '10 tips for <span class="acc">working students</span>', 'k1': '<b>01</b>one calendar', 'k3': '<b>02</b>study leave'})
for k in ('k2', 'k4'): D['12-collage-working-student-tips']['text'].pop(k, None)
# 13: her in colour, 1.8x bigger, overlapping the empty rows
upd('13-flat-time-card', css_add=".cut{left:auto;right:-20px;height:470px}", images_upd={'me': f'{A}cut/gbemi-564.3.png'})
D['13-flat-time-card']['body'] = D['13-flat-time-card']['body'].replace('<img class="cut bw z5"', '<img class="cut ol z5"')
upd('13-flat-time-card', vars_upd={'--ol': '#C8102E'})
# 14: her face in the middle of the dial (my 24 hours)
upd('14-flat-24-hour-dial', css_add=""".face{position:absolute;left:760px;top:183px;width:358px;height:358px;border-radius:50%;overflow:hidden}
.face img{width:100%;height:100%;object-fit:cover;object-position:50% 18%;filter:brightness(1.12) contrast(1.05)}""",
    images_upd={'me': f'{A}frames/f_564.3.jpg'},
    direction="Flat, A's 24-hour dial in the time-card palette with her face in the middle: one day as a ring around her, work 9-17 in red, class hatched, study in manila, sleep in grey. The words say the problem plainly. Follows viral sample 3 (the framework drawn big) and her database-indexes bar.")
D['14-flat-24-hour-dial']['body'] = D['14-flat-24-hour-dial']['body'].replace('"center": "24H", "cfs": 130', '"nums": true').replace('</svg>', '</svg><div class="face z5" data-move="face"><img data-img="me" alt=""></div>')
D['14-flat-24-hour-dial']['body'] = D['14-flat-24-hour-dial']['body'].replace(', "nums": true', '')
# 15: three days, bigger blocks, bigger her
WEEK2b = {"w": 760, "h": 500, "from": 8, "to": 22, "step": 2, "days": ["MON", "TUE", "WED"], "hours": False, "gut": 10, "blocks": [
    {"d": 0, "s": 9, "e": 17, "k": "w", "t": "work", "fs": 52}, {"d": 1, "s": 9, "e": 17, "k": "w", "t": "work", "fs": 52}, {"d": 2, "s": 9, "e": 17, "k": "w", "t": "work", "fs": 52},
    {"d": 0, "s": 18, "e": 20.5, "k": "c", "t": "class", "fs": 46}, {"d": 2, "s": 18, "e": 20.5, "k": "c", "t": "class", "fs": 46}, {"d": 1, "s": 18.5, "e": 21.5, "k": "s", "t": "study", "fs": 42}],
    "ring": {"d": 1, "s": 18.5, "e": 21.5}}
D['15-flat-one-calendar']['body'] = '<div class="hd z3" data-k="hd"></div>' + f"<div class=\"week z3\" data-move=\"calendar\" data-week='{json.dumps(WEEK2b)}'></div>" + '<img class="cut ol z5" data-img="me" alt="">'
upd('15-flat-one-calendar', css_add=".week .dh{font-size:60px}.cut{height:560px;right:-60px}.hd{font-size:112px}")
# 16: one class time
upd('16-flat-job-by-day', text_upd={'s2v': '18:00'})
# 17: manila ground (the one bright option), 3 big tips + 7 more, bigger her
D['17-flat-10-tips-checklist']['body'] = ('<div class="hd z3" data-k="hd"></div><div class="sub z3" data-k="sub"></div><div class="list z4" data-move="checklist">' +
    ''.join(f'<div><b>&#10003;</b><span data-k="tip{i}"></span></div>' for i in range(3)) + '<div class="more"><span data-k="more"></span></div></div><img class="cut ol z5" data-img="me" alt="">')
upd('17-flat-10-tips-checklist', css_add=""".t{color:var(--fg)}.hd{color:var(--ink)}.sub{color:var(--ink)}
.list{left:420px;top:120px;width:500px;background:#F6F0E0;border:1px solid var(--ink);box-shadow:none;rotate:-2deg}
.list div{font:700 46px/1.6 'Work'}.list b{font-size:56px;width:44px}.list .more{font:600 34px/1.6 'Work';color:#6E5E3E}
.cut{height:520px;right:-80px}""", vars_upd={'--ground': '#E7D7AE', '--fg': '#1D1A15', '--ol': '#1D1A15'},
    text_upd={'tip0': 'one calendar', 'tip1': 'study leave', 'tip2': 'meal prep', 'more': '+ 7 more'})
for i in range(3, 10): D['17-flat-10-tips-checklist']['text'].pop(f'tip{i}', None)
# 18: the image adds the hook; bigger source
upd('18-real-page-can-students-work', css_add=".clip{width:900px;top:290px}.hd{font-size:150px}", text_upd={'hd': 'No limit<br><span class="acc">on hours?</span>'}, words='NO LIMIT ON HOURS?',
    titles=[T[5], "Can You Work Full Time as a Student in Estonia?"])
# 19: stamp off the red card, bigger photos
upd('19-other-two-cards', css_add=".stamp{top:572px;left:400px;background:var(--manila);border-color:var(--manila);color:var(--ink)}.idc{width:450px;height:280px;grid-template-columns:150px 1fr}.idc .ph{width:150px;height:190px}.c1{left:90px}.c2{left:700px}")
# 20: '20 DAYS PAID'
upd('20-real-page-study-leave', text_upd={'s2': '20 days paid', 's1': '30 days'}, css_add=".s2{font-size:96px;left:820px}")
# 21: her in the middle between the two halves (kit T1's 'her in the middle')
D['21-desk-split-no-face']['body'] = D['21-desk-split-no-face']['body'].replace('<div class="plus z5" data-move="plus">+</div>', '<img class="cut ol z4" data-img="me" alt=""><div class="plus z5" data-move="plus">+</div>')
upd('21-desk-split-no-face', kind='other (split desk, her in the middle)', images_upd={'me': f'{A}cut/gbemi-564.3.png'},
    css_add=".cut{left:400px;height:420px}.plus{left:575px;top:150px;width:130px;height:130px;font-size:160px}.lap{left:20px;top:380px;--lw:400px}.page{left:860px;top:380px;width:380px}.hd{font-size:128px}",
    vars_upd={'--ol': '#E7D7AE'},
    direction="Split desk with her in the middle (kit T1's first idea): the job half on charcoal (laptop with code), the master's half on manila (lecture notes), her colour cut-out sitting between them under a red + stamp.")

# ---------------- ROUND 2b: layout fixes after looking ----------------
for n in D:
    D[n]['body'] = D[n]['body'].replace('class="r">17:45<', 'class="r">18:00<')
upd('03-my-work-class-week', css_add=".tc{left:540px;width:650px}.tc td{font-size:44px;padding:16px 4px}")
upd('04-one-year-of-both', css_add=""".yr .gm div:after{inset:6px 22px;background:linear-gradient(45deg,transparent 47%,var(--red) 47% 53%,transparent 53%),linear-gradient(-45deg,transparent 47%,var(--red) 47% 53%,transparent 53%);opacity:.85}
.yr .gm div{font-size:54px}""", text_upd={'yr_t': 'OCT 2025 &rarr; OCT 2026'})
upd('08-24-hours-photo-dial', css_add="svg.dial{left:650px;top:150px}")
upd('09-collage-working-student', css_add=".lab.l4{left:auto;right:300px;top:470px}")
upd('10-collage-nigeria-to-estonia', vars_upd={'--sc': '1.32', '--sc-x': '200px'}, css_add=".flag{width:150px;height:96px}.f1{left:470px;top:70px}.f2{left:470px;top:530px}")
upd('11-collage-desk-flatlay', css_add=".lap{top:540px;left:30px;--lw:260px}.o-books{top:530px;width:220px}")
upd('15-flat-one-calendar', css_add=".cut{height:480px;right:-90px}")
upd('18-real-page-can-students-work', css_add=".clip{width:820px;left:40px;top:320px}.stamp{left:640px;top:150px;rotate:7deg}")
upd('03-my-work-class-week', css_add=".tc{left:520px;width:720px}.tc td{font-size:38px;padding:16px 2px}")
upd('10-collage-nigeria-to-estonia', css_add=".hd{font-size:150px}.f1{left:440px;top:66px}.f2{left:440px;top:520px}")

# ---------------- ROUND 3: critic round 2 fixes ----------------
upd('07-work-study-in-estonia', css_add=".flag{left:70px;top:30px;width:130px;height:84px;rotate:-6deg}")
upd('20-real-page-study-leave', css_add=".s2{left:740px}")
upd('09-collage-working-student', css_add=".lab.l4{top:430px;right:270px}")
D['14-flat-24-hour-dial']['body'] = D['14-flat-24-hour-dial']['body'].replace('"r": 230, "arcs"', '"r": 230, "nums": false, "arcs"')
upd('19-other-two-cards', css_add=".idc{height:300px;grid-template-columns:180px 1fr}.idc .ph{width:180px;height:220px}")
upd('01-job-plus-masters', css_add=".lap{--lw:520px;top:350px;left:10px}.page{width:440px;top:340px;right:14px}")
upd('22-punch-clock', css_add=".pc .card div{font-size:34px}.pc .card{width:280px;left:70px}")
upd('03-my-work-class-week', css_add=".tc td.r{font-size:46px}")

# ---------------- critic scores (cold critic, paired with best title; R1 -> R2) + recommended for Test & Compare ----------------
SC = {'01': '6 -> 7', '02': '8 -> 8', '03': '6 -> 7', '04': '7 -> 8', '05': '6 -> 8', '06': '6 -> 7', '07': '8 -> 7 (flag fixed after R2)', '08': '5 -> 6',
      '09': '5 -> 6', '10': '6 -> 8', '11': '5 -> 7', '12': '7 -> 8', '13': '6 -> 8', '14': '6 -> 7', '15': '5 -> 7', '16': '6 -> 6', '17': '6 -> 7',
      '18': '8 -> 9', '19': '6 -> 7', '20': '6 -> 7 (stamp fixed after R2)', '21': '5 -> 7', '22': '6 -> 7'}
for n in D:
    D[n]['scores'] = 'cold critic, paired: ' + SC[n[:2]]
    D[n]['recommended'] = n[:2] in ('02', '18', '05')

TPL = '''<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../../lib/wf.css"><style>
{css}
</style></head><body><div class="t">
{body}
</div><script src="../../lib/wf.js"></script><script src="../../lib/bind.js"></script></body></html>
'''
for name, d in D.items():
    if ONLY and not any(name.startswith(o) for o in ONLY): continue
    p = os.path.join(ROOT, 'directions', name); os.makedirs(p, exist_ok=True)
    open(os.path.join(p, 'index.html'), 'w').write(TPL.format(css=d['css'], body=d['body']))
    cf = os.path.join(p, 'content.json')
    if FORCE or not os.path.exists(cf):
        c = {'direction': d['direction'], 'thumbnail_text': d['words'], 'titles': d['titles'], 'title': d['titles'][0], 'kind': d['kind'],
             'recommended': d.get('recommended', False), 'scores': d.get('scores', ''), 'text': d['text'], 'images': d['images'], 'vars': d['vars']}
        open(cf, 'w').write(json.dumps(c, indent=2, ensure_ascii=False) + '\n')
    print('wrote', name)
