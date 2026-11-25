# Builds the 2026-11-10 thumbnail set (11 directions). WARNING: re-running OVERWRITES content.json (her studio edits). Use only to rebuild.
#   python3 tools/make-set-2026-11-10.py [prefix ...]   (no args = all)
import json, os, sys
D = os.path.dirname(os.path.abspath(__file__)) + '/../directions'
HEAD = '<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../../lib/wft.css"><style>\n%s\n</style></head><body><div class="t %s">\n%s\n</div><script src="../../lib/bind.js"></script></body></html>\n'
S = '../../assets/shoot/'; C = '../../assets/collage/'; PX = '../../../../talking-head/assets/px/'; SRC = '../../../../talking-head/assets/src/'
def photo(n, washed=False):
    return ('<div class="pf %s z1" data-move="photo"><img class="room" data-img="room" src="%s%s.jpg" alt=""><div class="wash"></div><div class="dim"></div>'
            '<img class="me" data-img="me" src="%s%s-person.png" alt=""></div>') % ('washed' if washed else '', S, n, S, n) if washed else \
           ('<div class="pf z1" data-move="photo"><img class="room" data-img="room" src="%s%s.jpg" alt=""><div class="dim"></div>'
            '<img class="me" data-img="me" src="%s%s-person.png" alt=""></div>') % (S, n, S, n)
def lap(cls='', move='laptop'):
    bars = ''.join('<i style="width:%d%%;margin-left:%d%%;background:%s"></i>' % (w, m, c) for w, m, c in
                   [(46, 0, '#C8102E'), (70, 8, '#E7D7AE'), (52, 8, '#8E8676'), (64, 16, '#E7D7AE'), (38, 16, '#FFE45A'), (58, 8, '#8E8676'), (30, 0, '#C8102E')])
    return '<div class="lap %s" data-move="%s"><img src="%slaptop2.png" alt=""><div class="scr">%s</div></div>' % (cls, move, C, bars)
DIRS = {}
def d(name, css, body, content, cls='no-lift'):
    DIRS[name] = (css, body, content, cls)

# 01 PHOTO (recommended): she holds the two full-time things on her palms: a laptop with code + a stack of study books
d('01-job-plus-masters', '''
.hd{left:640px;top:44px;font-size:100px;line-height:.92;color:var(--ink)}
.lap{left:540px;top:262px;width:540px;transform:rotate(-4deg)}
''', photo('1589', True) + '''
<div class="hd z4" data-k="hd"></div>
''' + lap('z4'),
 dict(direction="Photo background (her shoot, white tee + red headband, Enhance photo): her room washed manila so it goes calm and warm, she in full colour on the left, both palms up. On her palms the two full-time things: a laptop with code (the job) and a stack of study books (the master's). The topic in plain words, huge, top right; the red of '+ MASTER'S' is her headband. Follows: her ux-research thumbnail (room washed in one colour, she presents the objects), study §3c (creator surrounded by the topic's objects).",
  thumbnail_text="Full-time job + master's", kind="photo", recommended=True,
  titles=["How I Work Full Time While Doing a Master's Abroad", "Working Full Time While Doing a Master's Abroad", "Masters While Working Full Time: My First Year"],
  text=dict(hd='Full-time job<br><span class="acc">+ master\'s</span>'),
  images=dict(room=S+'1589.jpg', me=S+'1589-person.png'),
  vars={'--wash': '#E7D7AE', '--ground': '#E7D7AE', '--pw': '1600px', '--pl': '-330px', '--pt': '-330px', '--wb': '1.35', '--wc': '.42'}))

# 02 FLAT: the time card: work 09:00-17:00 then class 17:45-20:00, every day; her cut-out, tired-wry
d('02-class-after-work', '''
.hd{left:60px;top:44px;font-size:118px;line-height:.9}
.card{left:60px;top:290px;width:680px;transform:rotate(-3deg);padding:22px 34px}
.card .r{display:flex;align-items:baseline;gap:26px;border-bottom:2px solid rgba(29,26,21,.18);padding:12px 0 6px}
.card .r:last-child{border-bottom:0}
.card .d{font-family:'Anton';font-size:64px;width:190px;color:var(--ink)}
.card .w,.card .c{font-family:'Anton';font-size:80px;letter-spacing:.01em;white-space:nowrap}
.card .c{color:var(--red)}
.cut{right:-30px;height:660px}
''', '''<div class="hd z3" data-k="hd"></div>
<div class="card z3" data-move="card"><div class="r"><span class="d">Work</span><span class="w">09:00-17:00</span></div><div class="r"><span class="d acc">Class</span><span class="c">17:45-20:00</span></div></div>
<img class="cut z2" data-img="me" data-move="her" src="''' + S + '''1580-cut.png" alt="">''',
 dict(direction="Flat charcoal ground with a quiet same-hue line pattern. A manila punch-clock time card, big: every day a work shift 09:00-17:00 in ink and a class 17:45-20:00 in stamp red. Her cut-out on the right, hand on her chin, a wry 'this is my life' look. Words say the situation plainly. Follows: study §3d (creator large on one side + a bold claim), the 9-5 / 5-9 outlier (two clock times), the video's own time-card look.",
  thumbnail_text="9-5 job, then class", kind="flat",
  titles=["Masters While Working Full Time: My Evening Schedule", "How I Work Full Time While Doing a Master's Abroad", "Masters While Working Full Time: My First Year"],
  text=dict(hd='9-5 job,<br><span class="acc">then class</span>'),
  images=dict(me=S+'1580-cut.png'), vars={'--ground': '#23201B'}), cls='no-lift pat')

# 03 OTHER (split): developer by day / student by night: two real scenes, her in the middle
d('03-developer-by-day', '''
.half{position:absolute;top:0;width:640px;height:720px;overflow:hidden}
.half img{width:100%;height:100%;object-fit:cover}
.half.l{left:0}.half.r{left:640px}
.half.l img{filter:brightness(.62) saturate(.8)}.half.r img{filter:brightness(.36) saturate(.5) hue-rotate(185deg);object-position:20% 50%}
.half.l::after,.half.r::after{content:"";position:absolute;inset:0;background:rgba(35,32,27,.35)}
.hd{top:40px;font-size:96px;line-height:.92;width:620px;text-align:center;white-space:normal}
.hd.a{left:10px}.hd.b{left:650px}
.cut{left:370px;height:570px}
.div{position:absolute;left:638px;top:0;width:4px;height:720px;background:var(--manila)}
''', '''<div class="half l z1" data-move="left"><img data-img="day" src="''' + PX + '''laptop.jpg" alt=""></div>
<div class="half r z1" data-move="right"><img data-img="night" src="''' + PX + '''lecture.jpg" alt=""></div>
<div class="div z2"></div>
<div class="hd a sh z4" data-k="left"></div><div class="hd b sh z4" data-k="right"></div>
<img class="cut z3" data-img="me" data-move="her" src="''' + S + '''1577-cut.png" alt="">''',
 dict(direction="Split, two real scenes: left a developer's desk with code on the screen, right a lecture room with students; her calm cut-out standing in the middle where they meet. 'Developer by day' / 'student by night' over each half in Anton. Follows: study §3f (before/after split when the topic IS two lives), the Mattheos '9-5 / 5-9' outlier. Photos: Pexels (talking-head/assets/px, credits film/assets/CREDITS.md).",
  thumbnail_text="Developer by day, student by night", kind="other (split)",
  titles=["How I Work Full Time While Doing a Master's Abroad", "My Week as a Developer and a Full-Time Master's Student", "I Work Full Time and Study Full Time. This Is How"],
  text=dict(left='Developer<br>by day', right='Student<br><span class="acc">by night</span>'),
  images=dict(day=PX+'laptop.jpg', night=PX+'lecture.jpg', me=S+'1577-cut.png'), vars={'--ground': '#23201B'}))

# 04 PHOTO: her own room, hand on chin; WORK FULL TIME / STUDY FULL TIME
d('04-work-and-study-full-time', '''
.hd{left:48px;top:70px;font-size:108px;line-height:.92}
''', photo('1580') + '''
<div class="hd sh z4" data-k="hd"></div>''',
 dict(direction="Photo background: her real room, a little darker so the words read, she on the right, hand on her chin, calm and a bit wry. The claim on the left in two lines, the second in her headband red. Follows: study §3d ('I'D FAIL SLAVERY', 'BECOME DANGEROUSLY ARTICULATE': creator large on one side + a 2-4 word claim).",
  thumbnail_text="Work full time. Study full time.", kind="photo",
  titles=["How I Juggle a Full-Time Job and a Full-Time Master's", "I Work Full Time and Study Full Time. This Is How", "How I Work Full Time While Doing a Master's Abroad", "One Year of a Full-Time Job and a Full-Time Master's"],
  text=dict(hd='Work full time.<br><span class="acc">Study full time.</span>'),
  images=dict(room=S+'1580.jpg', me=S+'1580-person.png'),
  vars={'--pw': '1800px', '--pl': '120px', '--pt': '-360px', '--dim': 'rgba(20,16,12,.4)', '--roomf': 'brightness(.55) saturate(.8)'}))

# 05 FLAT: a week calendar packed with work and class blocks; she points at it
d('05-how-i-plan-my-week', '''
.hd{left:56px;top:40px;font-size:110px;line-height:.9;color:var(--ink)}
.cal{position:absolute;left:56px;top:190px;width:760px;height:500px;background:#FFFDF6;box-shadow:0 24px 50px rgba(0,0,0,.18);padding:22px 22px 18px;display:grid;grid-template-columns:repeat(5,1fr);gap:10px}
.col{position:relative}
.col b{display:block;font-family:'DMMono';font-weight:400;font-size:24px;color:#6B5D40;text-align:center;margin-bottom:8px}
.col i{position:absolute;left:0;right:0;border-radius:6px}
.col i{font-family:'DMMono';font-size:22px;letter-spacing:.08em;color:#F4EBD3;display:flex;align-items:center;justify-content:center}
.col i.w{background:var(--charcoal)}.col i.c{background:var(--red)}.col i.s{background:#D9C99C}
.cut{right:-50px;height:610px}
''', '''<div class="hd z3" data-k="hd"></div>
<div class="cal z3" data-move="calendar">''' + ''.join(
    '<div class="col"><b>%s</b><i class="w" style="top:44px;height:230px">%s</i><i class="%s" style="top:%dpx;height:%dpx">%s</i></div>' % (dd, 'WORK' if dd == 'MON' else '', k, t, h, 'CLASS' if dd == 'MON' else '')
    for dd, k, t, h in [('MON', 'c', 290, 110), ('TUE', 'c', 290, 150), ('WED', 's', 290, 90), ('THU', 'c', 290, 110), ('FRI', 's', 290, 70)]) + '''</div>
<img class="cut z2" data-img="me" data-move="her" src="''' + S + '''1593-cut.png" alt="">''',
 dict(direction="Flat manila ground with a quiet line pattern. A real-looking week calendar fills the left: every day a long charcoal work block, then red class blocks and paler study blocks in the evenings. Her cut-out on the right pointing at it. Words: what the video gives you. Follows: PCFGSTUDY 'Schedule-maxxing' outlier (the calendar is the picture), study §3e (topic + the literal thing).",
  thumbnail_text="My work + study week", kind="flat",
  titles=["Full-Time Job and Full-Time Master's: How I Plan My Week", "My Week as a Developer and a Full-Time Master's Student", "How I Work Full Time While Doing a Master's Abroad"],
  text=dict(hd='My work + <span class="acc">study week</span>'),
  images=dict(me=S+'1593-cut.png'), vars={'--ground': '#E7D7AE', '--fg': '#1D1A15'}), cls='no-lift pat light')

# 06 OTHER (real page): Study in Estonia, working hours for international students: not limited
d('06-work-while-studying-estonia', '''
.hd{left:600px;top:44px;font-size:92px;line-height:.92}
.page{left:610px;top:330px;width:640px;padding:30px 34px 34px;transform:rotate(-2deg)}
.page .q{font-family:'IT';font-weight:700;font-size:36px;letter-spacing:-.02em;line-height:1.1}
.page .a{font-family:'IT';font-weight:700;font-size:76px;letter-spacing:-.03em;margin-top:18px}
.credit{left:620px;top:600px}
''', photo('1589', True) + '''
<div class="hd z4" data-k="hd"></div>
<div class="page z4" data-move="page"><div class="q" data-k="q"></div><div class="a"><span class="mark" data-k="a"></span></div></div>
<div class="credit z4" data-k="credit"></div>''',
 dict(direction="Photo background washed in charcoal so the room goes dark and calm, she in full colour on the left, palms up, presenting the proof on the right: the real line from the official Study in Estonia page, 'Working hours for international students: not limited', set big on a white page with a yellow marker. Small source credit. Follows: study §3e (topic + the literal thing), her ghana 10b clipping look.",
  thumbnail_text="Work while you study in Estonia", kind="other (real page)",
  titles=["Can International Students Work Full Time in Estonia?", "Working Full Time While Doing a Master's Abroad", "How I Work Full Time While Doing a Master's Abroad"],
  text=dict(hd='Work while you<br>study <span class="acc">in Estonia</span>', q='Working hours for international students:', a='not limited', credit='studyinestonia.ee'),
  images=dict(room=S+'1589.jpg', me=S+'1589-person.png'),
  vars={'--wash': '#3A342B', '--ground': '#23201B', '--pw': '1800px', '--pl': '-520px', '--pt': '-380px', '--wb': '1.2', '--wc': '.6'}))

# 07 COLLAGE: her full photo, the objects of a working student's year around her, one line
d('07-a-year-of-work-and-study', '''
.band{position:absolute;left:0;right:0;bottom:0;height:150px;background:var(--charcoal)}
.hd{left:0;width:1280px;text-align:center;top:590px;font-size:112px;line-height:.9;color:#F4EBD3}
.lap{left:30px;top:170px;width:400px;transform:rotate(-7deg)}
.books{left:900px;top:150px;width:340px;transform:rotate(5deg)}
.coffee{left:70px;top:390px;width:200px}
.meal{left:960px;top:400px;width:280px;transform:rotate(-4deg)}
.clock{left:360px;top:24px;width:150px}
''', photo('1577') + '''
''' + lap('z3') + '''
<img class="obj books z3" data-move="books" src="''' + C + '''books.png" alt="">
<div class="band z4"></div><div class="hd z5" data-k="hd"></div>''',
 dict(direction="Collage over her full photo (her room, a little darker), she calm in the middle; around her the real objects of a working student's year as cut-outs: laptop with code, study books, coffee, meal-prep boxes, a wall clock. One line across the bottom. Follows: her collage samples ('Time to lock in.', 'Capsule wardrobe'), study §3c (creator surrounded by the topic's objects).",
  thumbnail_text="1 year of work + study", kind="collage",
  titles=["One Year of a Full-Time Job and a Full-Time Master's", "Masters While Working Full Time: My First Year", "How I Work Full Time While Doing a Master's Abroad"],
  text=dict(hd='1 year of <span class="acc">work + study</span>'),
  images=dict(room=S+'1577.jpg', me=S+'1577-person.png'),
  vars={'--pw': '1500px', '--pl': '-80px', '--pt': '-300px', '--dim': 'rgba(20,16,12,.3)', '--roomf': 'brightness(.75)'}))

# 08 FLAT: the 24-hour dial: work, class, sleep in one day
SV = []
import math
def wedge(h0, h1, col, r=250, cx=270, cy=270):
    a0 = (h0 / 24) * 2 * math.pi - math.pi / 2; a1 = (h1 / 24) * 2 * math.pi - math.pi / 2
    x0, y0 = cx + r * math.cos(a0), cy + r * math.sin(a0); x1, y1 = cx + r * math.cos(a1), cy + r * math.sin(a1)
    big = 1 if (h1 - h0) % 24 > 12 else 0
    return '<path d="M%d %d L%.1f %.1f A%d %d 0 %d 1 %.1f %.1f Z" fill="%s"/>' % (cx, cy, x0, y0, r, r, big, x1, y1, col)
dial = ('<svg class="dial" viewBox="0 0 540 540" data-move="dial"><circle cx="270" cy="270" r="262" fill="#2E2A23"/>' + wedge(9, 17, '#E7D7AE') + wedge(17.75, 20, '#C8102E')
        + wedge(23.5, 31, '#776E5E') + ''.join('<rect x="268" y="14" width="4" height="%d" fill="#F4EBD3" transform="rotate(%d 270 270)"/>' % (22 if h % 6 == 0 else 10, h * 15) for h in range(24))
        + '<circle cx="270" cy="270" r="104" fill="#23201B"/><text x="270" y="306" text-anchor="middle" font-family="Anton" font-size="104" fill="#F4EBD3">24H</text></svg>')
d('08-job-and-masters-in-24-hours', '''
.hd{left:56px;top:40px;font-size:100px;line-height:.9}
.dial{position:absolute;left:70px;top:236px;width:450px;height:450px}
.k{position:absolute;font-family:'Anton';font-size:52px;letter-spacing:.01em;text-transform:uppercase}
.k1{left:540px;top:350px;color:var(--manila)}.k2{left:540px;top:440px;color:var(--red)}.k3{left:540px;top:530px;color:#A39880}
.cut{right:-100px;height:640px}
''', '''<div class="hd z3" data-k="hd"></div>''' + dial + '''
<div class="k k1 z3" data-k="k1"></div><div class="k k2 z3" data-k="k2"></div><div class="k k3 z3" data-k="k3"></div>
<img class="cut z2" data-img="me" data-move="her" src="''' + S + '''1584-cut.png" alt="">''',
 dict(direction="Flat charcoal with the quiet line pattern. The video's 24-hour dial, big: work 9-17 in manila, class 17:45-20 in red, sleep in grey; three one-word keys beside it (work, class, sleep). Her cut-out on the right, hand in her hair (the long-day feeling). Follows: study §3e (topic + the literal thing drawn big), her database-indexes thumbnail (one idea drawn big).",
  thumbnail_text="Job + master's in 24 hours", kind="flat",
  titles=["My Day as a Developer and a Full-Time Master's Student", "Full-Time Job and Full-Time Master's: How I Plan My Week", "How I Work Full Time While Doing a Master's Abroad"],
  text=dict(hd='Job + master\'s<br><span class="acc">in 24 hours</span>', k1='Work', k2='Class', k3='Sleep'),
  images=dict(me=S+'1584-cut.png'), vars={'--ground': '#23201B'}), cls='no-lift pat')

# 09 COLLAGE: from Nigeria to Estonia, a laptop and books between the two flags
d('09-nigeria-to-estonia', '''
.hd{left:56px;top:40px;font-size:104px;line-height:.92;color:var(--ink)}
.sub{position:absolute;left:60px;top:240px;font-size:58px;line-height:1.02;font-weight:700 !important;color:var(--ink)}
.f1,.f2{top:420px !important}.arrow{top:480px !important}
.f1{left:70px;top:380px;width:270px;height:180px;transform:rotate(-5deg)}
.f2{left:560px;top:380px;width:270px;height:180px;transform:rotate(4deg)}
.arrow{position:absolute;left:360px;top:440px;width:180px;height:60px}
.cut{right:-10px;height:600px}
''', '''<div class="hd z3" data-k="hd"></div><div class="sub lt z3" data-k="sub"></div>
<div class="flag v f1 z3" data-move="flag1"><i style="background:#008751"></i><i style="background:#fff"></i><i style="background:#008751"></i></div>
<div class="flag h f2 z3" data-move="flag2"><i style="background:#0072CE"></i><i style="background:#000"></i><i style="background:#fff"></i></div>
<svg class="arrow z3" viewBox="0 0 180 60" data-move="arrow"><path d="M6 30 H150" stroke="#C8102E" stroke-width="10" stroke-linecap="round"/><path d="M128 8 L168 30 L128 52" fill="none" stroke="#C8102E" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/></svg>
<img class="cut z2" data-img="me" data-move="her" src="''' + S + '''1594-cut.png" alt="">''',
 dict(direction="Collage on a manila ground with the quiet pattern: the Nigerian flag, a red arrow, the Estonian flag (drawn flat), a laptop with code under the arrow; her cut-out on the right, palm out. Words: the move in plain words and what she does there. Same family as her biggest video ('Dear Nigerian students', an arrow between two places). Follows: study §3c.",
  thumbnail_text="From Nigeria to Estonia: job + master's", kind="collage",
  titles=["Studying in Europe as a Nigerian With a Full-Time Job", "How I Work Full Time While Doing a Master's Abroad", "Working Full Time While Doing a Master's Abroad"],
  text=dict(hd='From Nigeria<br>to <span class="acc">Estonia</span>', sub='a full-time job<br>+ a master\'s'),
  images=dict(me=S+'1594-cut.png'), vars={'--ground': '#E7D7AE'}), cls='no-lift pat light')

# 10 FLAT: study leave: a month with 30 days off for school, 20 of them paid
d('10-paid-study-leave', '''
.hd{left:56px;top:44px;font-size:108px;line-height:.9}
.sub{position:absolute;left:60px;top:262px;font-size:46px;color:var(--paper)}
.mon{position:absolute;left:60px;top:350px;width:560px;display:grid;grid-template-columns:repeat(10,1fr);gap:8px;padding:22px;background:#FFFDF6;box-shadow:0 24px 50px rgba(0,0,0,.4)}
.mon i{display:block;height:44px;border-radius:5px;background:#D9C99C;font-style:normal;font-family:'Anton';font-size:26px;color:#1D1A15;text-align:center;line-height:44px}
.mon i.p{background:var(--red);color:#fff}
.cut{right:-170px;height:640px}
''', '''<div class="hd z3" data-k="hd"></div><div class="sub lt z3" data-k="sub"></div>
<div class="mon z3" data-move="days">''' + ''.join('<i class="%s">%d</i>' % ('p' if k <= 20 else '', k) for k in range(1, 31)) + '''</div>
<img class="cut z2" data-img="me" data-move="her" src="''' + S + '''1579-cut.png" alt="">''',
 dict(direction="Flat charcoal with the quiet pattern. Thirty day tiles, the first 20 in stamp red (paid), the rest manila: the Estonian study-leave rule drawn as a month (Adult Education Act § 13: up to 30 calendar days a year, average pay for 20). Her cut-out on the right, open hand. Follows: study §3e (a number a stranger knows: days off), her database-indexes thumbnail (one idea, drawn big).",
  thumbnail_text="30 days off to study", kind="flat",
  titles=["Working While Studying in Estonia? You Get Study Leave", "Can International Students Work Full Time in Estonia?", "Working Full Time While Doing a Master's Abroad"],
  text=dict(hd='30 days off<br><span class="acc">to study</span>', sub='20 of them paid, in Estonia'),
  images=dict(me=S+'1579-cut.png'), vars={'--ground': '#23201B'}), cls='no-lift pat')

# 11 PHOTO: 10 tips, numbered cards fanned by her
d('11-10-tips-working-students', '''
.hd{left:620px;top:60px;font-size:160px;line-height:.86;color:#fff}
.hd .s{display:block;font-size:72px;line-height:1;margin-top:14px}
''', photo('1584', True) + '''
<div class="hd sh z4" data-k="hd"></div>''',
 dict(direction="Photo background: her room washed deep charcoal so it goes quiet, she in full colour on the left, hand in her hair (the busy-life feeling). The promise on the right: '10 tips' huge, 'for working students' under it. Follows: study §3d (creator on one side + a bold claim), the 'Everything done by 2pm' / listicle outliers.",
  thumbnail_text="10 tips for working students", kind="photo",
  titles=["Working Full Time While Studying Abroad (10 Tips)", "How I Work Full Time While Doing a Master's Abroad", "Masters While Working Full Time: My First Year"],
  text=dict(hd='<span class="acc">10 tips</span><span class="s">for working students</span>'),
  images=dict(room=S+'1584.jpg', me=S+'1584-person.png'),
  vars={'--wash': '#4A4236', '--ground': '#23201B', '--pw': '1800px', '--pl': '-420px', '--pt': '-380px', '--wb': '1.25', '--wc': '.6'}))

# best first (after the cold test 2026-11-10); scores = fresh cold critic, PNG alone / with title 1, fixes applied after, not re-scored
ORDER = {'03-developer-by-day': ('01-developer-by-day', 'UPLOAD THIS (with title 1) · cold test 8 / 8 (night half darkened + cooled after)', True),
 '01-job-plus-masters': ('02-job-plus-masters', 'Test & Compare B · cold test 7 / 7 (books dropped, laptop bigger in her hands after)', True),
 '06-work-while-studying-estonia': ('03-work-while-studying-estonia', 'Test & Compare C · cold test 8 / 8 (critic\'s no. 1)', True),
 '10-paid-study-leave': ('04-paid-study-leave', 'cold test 8 / 8 (card clear of her hand after)', False),
 '08-job-and-masters-in-24-hours': ('05-job-and-masters-in-24-hours', 'cold test 7 / 8 (24H bigger after)', False),
 '02-class-after-work': ('06-class-after-work', 'cold test 7 / 6 (one work row + one class row, 80 px, title changed after)', False),
 '04-work-and-study-full-time': ('07-work-and-study-full-time', 'cold test 7 / 5 (title changed, room darker, words clear of her hair after)', False),
 '09-nigeria-to-estonia': ('08-nigeria-to-estonia', 'cold test 6 / 8 (job + master\'s line bold and bigger, laptop dropped after)', False),
 '05-how-i-plan-my-week': ('09-my-work-and-study-week', 'cold test 5 / 7 (words now say work + study, WORK / CLASS on Monday after)', False),
 '07-a-year-of-work-and-study': ('10-a-year-of-work-and-study', 'cold test 5 / 6 (3 props dropped, words on a solid band after)', False),
 '11-10-tips-working-students': ('11-10-tips-working-students', 'cold test 7 / 7', False)}
only = sys.argv[1:]
for name, (css, body, content, cls) in DIRS.items():
    if only and not any(ORDER[name][0].startswith(o) for o in only): continue
    name, sc, rec = ORDER[name]; content = dict(content, scores=sc, recommended=rec)
    p = os.path.join(D, name); os.makedirs(p, exist_ok=True)
    open(os.path.join(p, 'index.html'), 'w').write(HEAD % (css.strip(), cls, body.strip()))
    content.setdefault('title', content['titles'][0]); content['class'] = cls
    json.dump(content, open(os.path.join(p, 'content.json'), 'w'), indent=1, ensure_ascii=False)
    print(name)
