# Set 4 (2026-11-12 evening): new thumbnails, each copying the composition of one named board item (her note: "select 10 or 15
# formats and create a thumbnail that copies each format"). Kept from set 3: 03 (yt-74), 05 (yt-16), 06 (yt-79), 08 (yt-80).
# Writes directions/<name>/{index.html, content.json}. content.json only when missing (her studio edits live there); --force overwrites.
import json, os, sys
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FORCE = '--force' in sys.argv
ONLY = [a for a in sys.argv[1:] if not a.startswith('--')]
HEAD = '<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../../lib/eu.css"><style>{css}</style></head><body><div class="t">\n{body}\n</div>{extra}<script src="../../lib/bind.js"></script></body></html>'
FLAGS = '<script src="../../lib/pc.js" defer></script>'
S = []
def add(name, css, body, content, extra=''):
    S.append((name, css, body, content, extra))

# board yt-66 "FINANCIAL LITERACY": her in her real room, two huge white words behind her head, money in the air
add('10-behind-head-study-in-europe',
 '.bg{width:var(--bw,1411px);left:var(--bx,-81px);top:var(--by,-20px)}'
 '.veil{inset:0;background:var(--dim,rgba(14,14,18,.55))}'
 '.w{left:0;right:0;text-align:center;font:400 var(--ws,200px)/.86 "AB",sans-serif;color:#fff;letter-spacing:-.035em}'
 '.w1{top:var(--y1,12px)}.w2{top:var(--y2,190px)}'
 '.cash{position:absolute;filter:drop-shadow(0 14px 18px rgba(0,0,0,.35))}'
 '.c1{display:none}.c2{display:none}.c3{display:none}.c4{display:none}',
 '<img class="ph bg z1" data-img="bg" alt=""><div class="veil z2"></div>\n'
 '<div class="a w w1 shd z3" data-k="w1"></div><div class="a w w2 shd z3" data-k="w2"></div>\n'
 '<img class="ph bg cut z4" data-img="me" alt="">\n'
 '<img class="cash c1 z5" data-img="cash" data-move="cash1" alt=""><img class="cash c2 z5" data-img="cash" data-move="cash2" alt=""><img class="cash c3 z5" data-img="cash" data-move="cash3" alt=""><img class="cash c4 z5" data-img="cash" data-move="cash4" alt="">',
 {'board': 'yt-66', 'kind': 'her full shoot photo in her room, huge words behind her head, euro notes in the air',
  'direction': 'Copies board yt-66 ("FINANCIAL LITERACY": the creator in her real room, two huge white words across the top that go BEHIND her head, money flying around her). Her shoot photo (outfit B, Enhance photo, face untouched); the room behind the words is darkened so they pop; her cut-out sits on top of the words (the euro notes were taken out after the cold review: same as 05). Words: STUDY IN / EUROPE.',
  'thumbnail_text': 'STUDY IN EUROPE (behind her head)',
  'titles': ['Cheapest Countries to Study in Europe for Nigerians (2027)', 'What Studying in Europe Really Costs a Nigerian in 2027', 'Studying in Europe as a Nigerian: The Real Cost'],
  'title': 'Cheapest Countries to Study in Europe for Nigerians (2027)', 'class': 'no-lift',
  'text': {'w1': 'STUDY IN', 'w2': 'EUROPE'},
  'images': {'bg': '../../assets/shoot/room-1582.jpg', 'me': '../../assets/shoot/room-1582-cut.png', 'cash': '../../assets/collage/euro-fan-cut.png'}, 'vars': {}})

# board yt-36 "WHAT IS SPACE COMPLEXITY OF ALGORITHMS": flat yellow, purple heavy caps stacked left, a drawn bar chart right
BARS = ''.join(f'<div class="bar" style="left:{x}px;height:{h}px"></div><span class="flag fl" data-flag="{f}" style="left:{x + 14}px"></span>'
               for x, h, f in [(0, 252, 'at'), (118, 295, 'de'), (236, 359, 'fr'), (354, 361, 'ee')])
add('12-yellow-how-much',
 '.t{background:var(--ground,#F4E04D)}'
 '.pat{inset:0;background:repeating-linear-gradient(-45deg,rgba(0,0,0,.035) 0 2px,transparent 2px 9px)}'
 '.w{left:50px;top:var(--wy,36px);font:400 var(--ws,118px)/1.04 "AB",sans-serif;color:var(--pu,#4B1F7A);letter-spacing:-.02em;text-transform:uppercase}'
 '.chart{position:absolute;left:var(--cx,836px);top:var(--cy,150px);width:470px;height:470px;scale:.92;transform-origin:0 0}'
 '.ax{position:absolute;left:0;bottom:60px;width:470px;height:400px;border-left:7px solid #111114;border-bottom:7px solid #111114}'
 '.bars{position:absolute;left:30px;bottom:67px;width:440px;height:400px}'
 '.bar{position:absolute;bottom:0;width:86px;background:var(--bar,#2BB673);border:6px solid #111114;border-bottom:0}'
 '.bars .bar:nth-of-type(4){background:var(--hot,#FF4713)}'
 '.fl{position:absolute;bottom:-56px;width:58px;height:40px;border:3px solid #111114}'
 '.arrow{position:absolute;left:20px;top:-28px;width:440px;height:200px}',
 '<div class="pat z1"></div><div class="a w z3" data-k="w"></div>\n'
 '<div class="chart z3" data-move="chart"><div class="ax"></div><div class="bars">' + BARS + '</div>'
 '<svg class="arrow" viewBox="0 0 440 200"><path d="M10 170 C 120 150, 250 90, 400 30" fill="none" stroke="#111114" stroke-width="8" stroke-linecap="round"/><path d="M372 22 L404 28 L392 58" fill="none" stroke="#111114" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/></svg></div>',
 {'board': 'yt-36', 'kind': 'flat yellow ground, heavy purple caps, a drawn bar chart (no face)',
  'direction': 'Copies board yt-36 ("WHAT IS SPACE COMPLEXITY OF ALGORITHMS": flat yellow, heavy purple caps stacked on the left, a simple black-outlined chart on the right). Words: HOW MUCH DOES IT COST TO STUDY IN EUROPE? Chart: four bars = what year one costs (tuition + one year of money to show, kit 7f) in Austria under 24 (€10,177), Germany (€11,904), France (€14,480), Estonia (€14,560), flags under the bars, an arrow going up. No numbers on the bars: the picture says "it adds up", the video gives the numbers.',
  'thumbnail_text': 'HOW MUCH DOES IT COST TO STUDY IN EUROPE? + bar chart with 4 flags',
  'titles': ['What Studying in Europe Really Costs a Nigerian in 2027', 'Cheapest Country to Study in Europe? 9 Countries Compared', 'Cheapest Countries in Europe: Tuition + Proof of Funds'],
  'title': 'What Studying in Europe Really Costs a Nigerian in 2027',
  'text': {'w': 'How much<br>does it<br>cost to<br>study in<br>Europe?'}, 'images': {}, 'vars': {}}, FLAGS)

# board yt-62 "Every Large Language Model Explained": a clean white grid of round logos with their names, nothing else
FL = [('de', 'Germany'), ('fr', 'France'), ('it', 'Italy'), ('at', 'Austria'), ('cz', 'Czechia'), ('pl', 'Poland'), ('ee', 'Estonia'), ('no', 'Norway'), ('fi', 'Finland')]
GRID = ''.join(f'<div class="cell" style="left:{60 + (i % 5) * 238 + (119 if i >= 5 else 0)}px;top:{70 + (i // 5) * 320}px"><span class="flag rnd" data-flag="{f}"></span><div class="nm" data-k="n{i}"></div></div>' for i, (f, n) in enumerate(FL))
add('13-flag-grid-9-countries',
 '.t{background:var(--ground,#FFFFFF)}'
 '.cell{position:absolute;width:210px;text-align:center}'
 '.rnd{width:176px;height:176px;border-radius:50%;border:7px solid #111114;display:block;margin:0 auto}'
 '.rnd svg{width:100%;height:100%}'
 '.nm{margin-top:12px;font:800 38px/1 "BG",sans-serif;color:#111114;letter-spacing:-.02em;white-space:nowrap}',
 GRID,
 {'board': 'yt-62', 'kind': 'flat white grid of 9 round flags with names (no face, no headline)',
  'direction': 'Copies board yt-62 ("Every Large Language Model Explained in 17 Minutes": a clean white grid of round logos with their names, no headline; the title does the talking). Nine round flags = the nine countries in the video, with their names. Works only with the title "9 European Countries Compared for Nigerian Students".',
  'thumbnail_text': '9 round flags with country names (no headline)',
  'titles': ['9 European Countries Compared for Nigerian Students', 'Cheapest Country to Study in Europe? 9 Countries Compared', 'Every Cheap Country to Study in Europe, Compared (2027)'],
  'title': '9 European Countries Compared for Nigerian Students',
  'text': {f'n{i}': n for i, (f, n) in enumerate(FL)}, 'images': {}, 'vars': {}}, FLAGS)

# board yt-34 "WEB3 EXPLAINED!": flat blue ground, huge black condensed caps left, the creator big on the right reacting
add('06-blue-proof-of-funds-explained',
 '.t{background:var(--ground,#2F8CF0)}'
 '.pat{inset:0;background:repeating-linear-gradient(0deg,rgba(255,255,255,.05) 0 2px,transparent 2px 8px)}'
 '.me{width:var(--rw,1411px);left:var(--rx,-60px);top:var(--ry,-205px)}'
 '.w{left:48px;top:var(--wy,40px);font:400 var(--ws,164px)/.92 "AN",sans-serif;color:#111114;letter-spacing:-.005em;text-transform:uppercase}'
 '.cash{position:absolute;width:var(--cw,250px);left:var(--cx,175px);top:var(--cy,438px);rotate:-6deg;filter:drop-shadow(0 14px 18px rgba(0,0,0,.35))}'
 '.s{left:52px;top:var(--sy,342px);font:400 var(--ss,112px)/1 "AN",sans-serif;color:#111114;text-transform:uppercase}',
 '<div class="pat z1"></div><img class="ph me cut z2" data-img="me" alt="">\n'
 '<div class="a w z3" data-k="w"></div><div class="a s z3" data-k="s"></div>',
 {'board': 'yt-34', 'kind': 'flat blue ground, huge condensed caps left, her cut-out right (1 of 2 "person beside a headline")',
  'direction': 'Copies board yt-34 ("WEB3 EXPLAINED!": flat blue, the topic in huge black condensed caps on the left, "EXPLAINED!" smaller under it, the creator big on the right). Her shoot cut-out (Enhance photo, face untouched), her open palm under the words. Words: PROOF OF FUNDS / EXPLAINED',
  'thumbnail_text': 'PROOF OF FUNDS EXPLAINED',
  'titles': ['Proof of Funds for Studying in Europe, Country by Country', 'Tuition Free Universities in Europe Need Proof of Funds', 'What Is Proof of Funds? Study in Europe (2027)'],
  'title': 'Proof of Funds for Studying in Europe, Country by Country', 'class': 'no-lift',
  'text': {'w': 'Proof of<br>funds', 's': 'Explained'}, 'images': {'me': '../../assets/shoot/room-1593-cut.png'}, 'vars': {}})

# board yt-38 "TWO SUM": a real notepad on a wooden desk seen from above, the sum hand-written on it, huge white caps across the top
add('08-notebook-europe-budget',
 '.bg{width:var(--bw,1600px);left:var(--bx,-160px);top:var(--by,-150px)}'
 '.veil{left:0;right:0;top:0;height:230px;background:linear-gradient(rgba(20,12,6,.55),rgba(20,12,6,0))}'
 '.w{left:0;right:0;top:var(--wy,26px);text-align:center;font:400 var(--ws,124px)/1 "AB",sans-serif;color:#fff;letter-spacing:-.025em;text-transform:uppercase}'
 '.hw{position:absolute;font:600 var(--hs,56px)/1.28 "CV",cursive;color:#1D2C6B;white-space:nowrap}'
 '.l{left:var(--lx,368px);top:var(--ly,232px);rotate:-1.5deg}'
 '.r{left:var(--rx,790px);top:var(--ry,282px);font-size:var(--rs,150px);color:#D7261E;rotate:-4deg;line-height:1}'
 '.ring{position:absolute;left:750px;top:250px;width:290px;height:240px}',
 '<img class="ph bg z1" data-img="bg" alt=""><div class="veil z2"></div>\n'
 '<div class="a w shd z3" data-k="w"></div>\n'
 '<div class="hw l z3" data-k="list"></div><div class="hw r z3" data-k="sum"></div>\n'
 '<svg class="ring z3" data-move="ring" viewBox="0 0 230 190"><path d="M118 14 C 40 10, 8 70, 22 120 C 38 176, 160 186, 204 132 C 236 92, 214 22, 130 16 L 100 20" fill="none" stroke="#D7261E" stroke-width="7" stroke-linecap="round"/></svg>',
 {'board': 'yt-38', 'kind': 'real photo (Unsplash: spiral notepad on a wooden desk), hand-written list, huge white caps (no face)',
  'direction': 'Copies board yt-38 ("TWO SUM": a real notepad on a wooden desk seen from above, the problem hand-written on it, the topic in huge white caps across the top). Notepad photo by Kelly Sikkema (Unsplash). On the left page, in pen: tuition + proof of funds + visa + rent; on the right page a red "= ?" circled. Words: STUDY IN EUROPE.',
  'thumbnail_text': 'STUDY IN EUROPE + notepad: tuition + proof of funds + visa + rent = ?',
  'titles': ['What Studying in Europe Really Costs a Nigerian in 2027', 'Cheapest Countries in Europe: Tuition + Proof of Funds', 'Cheapest Countries to Study in Europe for Nigerians (2027)'],
  'title': 'What Studying in Europe Really Costs a Nigerian in 2027',
  'text': {'w': 'Study in Europe', 'list': 'tuition<br>+ proof of funds<br>+ visa<br>+ rent', 'sum': '= ?'},
  'images': {'bg': '../../assets/px/notebook-wood.jpg'}, 'vars': {}})

# board pin-01-13 "LOCKED / FOCUS": a real scene with the subject in the middle, one red box with white caps in each top corner
add('16-red-boxes-for-free',
 '.bg{width:var(--bw,1480px);left:var(--bx,-170px);top:var(--by,-170px)}'
 '.veil{inset:0;background:var(--dim,rgba(10,8,6,.18))}'
 '.bx{top:var(--by2,34px);padding:6px 22px 12px;background:var(--red,#D7261E);color:#fff;font:400 var(--bs,74px)/1 "AN",sans-serif;text-transform:uppercase;letter-spacing:.005em;box-shadow:0 10px 28px rgba(0,0,0,.3)}'
 '.b1{left:34px}.b2{right:34px}',
 '<img class="ph bg z1" data-img="bg" alt=""><div class="veil z2"></div>\n'
 '<div class="a bx b1 z3" data-k="b1"></div><div class="a bx b2 z3" data-k="b2"></div>',
 {'board': 'pin-01-13', 'kind': 'real scene (Pexels: a student with books in a European street), two red word boxes (no Gbemi)',
  'direction': 'Copies Pinterest pin-01-13 ("LOCKED / FOCUS": a real scene with the subject in the middle, one red box of white caps in each top corner). A student holding books in front of an old European building (Pexels, Andrea Piacquadio). Boxes: STUDY IN EUROPE / FOR FREE?',
  'thumbnail_text': 'STUDY IN EUROPE | FOR FREE?',
  'titles': ['Study in Europe for Free? What Nigerians Really Pay', 'Tuition Free Universities in Europe Need Proof of Funds', 'Cheapest Countries to Study in Europe for Nigerians (2027)'],
  'title': 'Study in Europe for Free? What Nigerians Really Pay',
  'text': {'b1': 'Study in Europe', 'b2': 'For free?'}, 'images': {'bg': '../../assets/px/student-books.jpg'}, 'vars': {}})

# board viral-7 / pin-01-03 "A PORTLAND VLOG": a collage of real city photos, huge white bold words over the middle, a handwritten word
add('17-city-collage-europe-on-a-budget',
 '.p{position:absolute;overflow:hidden}.p img{width:100%;height:100%;object-fit:cover;display:block}'
 '.p1{left:0;top:0;width:430px;height:360px}.p2{left:436px;top:0;width:400px;height:360px}.p3{left:842px;top:0;width:438px;height:360px}'
 '.p4{left:0;top:366px;width:640px;height:354px}.p5{left:646px;top:366px;width:634px;height:354px}'
 '.veil{inset:0;background:var(--dim,rgba(12,10,8,.30))}'
 '.w{left:0;right:0;text-align:center;font:400 var(--ws,196px)/.86 "AB",sans-serif;color:#fff;letter-spacing:-.035em;text-transform:uppercase}'
 '.w1{top:var(--y1,150px)}.w2{top:var(--y2,346px);font-size:var(--w2s,136px)}'
 '.hw{left:var(--hx,90px);top:var(--hy,92px);font:700 var(--hs,84px)/1 "CV",cursive;color:#fff;rotate:-6deg}',
 '<div class="p p1 z1"><img data-img="p1" alt=""></div><div class="p p2 z1"><img data-img="p2" alt=""></div><div class="p p3 z1"><img data-img="p3" alt=""></div>'
 '<div class="p p4 z1"><img data-img="p4" alt=""></div><div class="p p5 z1"><img data-img="p5" alt=""></div><div class="veil z2"></div>\n'
 '<div class="a hw shd z3" data-k="hw"></div><div class="a w w1 shd z3" data-k="w1"></div><div class="a w w2 shd z3" data-k="w2"></div>',
 {'board': 'viral-7', 'kind': 'collage of 5 real city photos (Pexels), huge white words + a handwritten word (no face)',
  'direction': 'Copies her viral sample 7 / pin-01-03 ("A PORTLAND VLOG": a grid of real photos of the place, huge white bold words over the middle, one small handwritten word). Berlin, Paris, Vienna, Prague, Tallinn (Pexels). Words: "study in" handwritten, EUROPE / ON A BUDGET huge.',
  'thumbnail_text': 'study in EUROPE ON A BUDGET',
  'titles': ['Cheapest Countries to Study in Europe for Nigerians (2027)', 'Cheapest Country to Study in Europe? 9 Countries Compared', 'Studying in Europe as a Nigerian: The Real Cost'],
  'title': 'Cheapest Countries to Study in Europe for Nigerians (2027)',
  'text': {'hw': 'study in', 'w1': 'Europe', 'w2': 'on a budget'},
  'images': {'p1': '../../assets/collage/paris.jpg', 'p2': '../../assets/collage/prague.jpg', 'p3': '../../assets/collage/vienna.jpg', 'p4': '../../assets/collage/berlin.jpg', 'p5': '../../assets/collage/tallinn-street.jpg'}, 'vars': {}})

# board yt-31 "you're wasting your 20s": the creator in a dim room holding the object toward us, soft bold lowercase words left, one word red
add('05-cheapest-places-to-study-abroad',
 '.bg{width:var(--bw,1714px);left:var(--bx,-120px);top:var(--by,-369px)}'
 '.veil{inset:0;background:var(--dim,rgba(10,10,14,.68))}'
 '.w{left:50px;top:var(--wy,130px);font:700 var(--ws,96px)/1.02 "PB",sans-serif;color:#fff;letter-spacing:-.03em}'
 '.w .or{color:var(--or,#FF5A4A)}.w .big{font-size:1.08em}'
 '.cash{position:absolute;width:var(--cw,330px);left:var(--cx,835px);top:var(--cy,352px);rotate:-10deg;filter:drop-shadow(0 16px 20px rgba(0,0,0,.45))}',
 '<img class="ph bg z1" data-img="bg" alt=""><div class="veil z2"></div>\n'
 '<img class="ph bg cut z3" data-img="me" alt=""><img class="cash z4" data-img="cash" data-move="cash" alt="">\n'
 '<div class="a w shd z5" data-k="w"></div>',
 {'board': 'yt-31', 'kind': 'her full shoot photo, room dimmed, euro notes on her open palms, soft bold lowercase words left',
  'direction': 'Copies board yt-31 ("you\'re wasting your 20s": the creator in a dim room holding the thing toward us, 4 short lines of soft bold lowercase white words on the left, one word in red). Her shoot photo (palms up, face untouched), room dimmed, euro notes (Pexels) resting on her palms. Words: cheapest places to study abroad ("cheapest" red).',
  'thumbnail_text': 'cheapest places to study abroad',
  'titles': ['Cheapest Countries to Study in Europe for Nigerians (2027)', 'Cheapest Country to Study in Europe? 9 Countries Compared', 'Study in Europe for Free? What Nigerians Really Pay'],
  'title': 'Cheapest Countries to Study in Europe for Nigerians (2027)', 'class': 'no-lift',
  'text': {'w': '<span class="or big">cheapest</span><br>places to<br>study<br>abroad'},
  'images': {'bg': '../../assets/shoot/room-1589.jpg', 'me': '../../assets/shoot/room-1589-cut.png', 'cash': '../../assets/collage/euro-fan-cut.png'}, 'vars': {}})

# board yt-53 "Anthropic Academy / COURSES RANKED": flat mint ground, big serif title left, a lilac box of caps under it, the creator right
add('09-mint-countries-ranked',
 '.t{background:var(--ground,#BFE3D5)}'
 '.me{width:var(--rw,770px);left:var(--rx,555px);top:var(--ry,72px)}'
 '.w{left:56px;top:var(--wy,96px);font:600 var(--ws,156px)/.96 "NW",serif;color:#16241E;letter-spacing:-.03em}'
 '.lab{left:58px;top:var(--ly,470px);padding:10px 22px 12px;background:var(--lil,#C7B6F2);font:800 var(--ls,58px)/1 "IT",sans-serif;color:#16241E;letter-spacing:-.01em;text-transform:uppercase}'
 '.star{position:absolute;left:var(--sx,560px);top:var(--sy,60px);width:110px;height:110px}',
 '<img class="ph me cut z2" data-img="me" alt="">\n'
 '<div class="a w z3" data-k="w"></div><div class="a lab z3" data-k="lab"></div>\n',
 {'board': 'yt-53', 'kind': 'flat mint ground, big serif title, lilac caps label, her cut-out right (2 of 2 "person beside a headline")',
  'direction': 'Copies board yt-53 ("Anthropic Academy / COURSES RANKED": flat mint, a big two-line serif title on the left, one lilac box of caps under it, the creator on the right; its logo mark is left out). Her shoot cut-out (palms out toward the words, face untouched). Words: Study in Europe / 9 COUNTRIES RANKED.',
  'thumbnail_text': 'Study in Europe / 9 COUNTRIES RANKED',
  'titles': ['Cheapest Country to Study in Europe? 9 Countries Compared', '9 European Countries Compared for Nigerian Students', 'Cheapest Countries to Study in Europe for Nigerians (2027)'],
  'title': 'Cheapest Country to Study in Europe? 9 Countries Compared', 'class': 'no-lift',
  'text': {'w': 'Study in<br>Europe', 'lab': '9 countries ranked'}, 'images': {'me': '../../assets/shoot/cut-1590c.png'}, 'vars': {}})

# board yt-10 "SAVE 4 HOURS A DAY": the creator in his room in front of a hand-drawn chart with ticks and crosses, yellow italic caps on top
ROWS = [('Germany', 1), ('France', 0), ('Norway', 0), ('Estonia', 0)]
TABLE = ''.join(f'<div class="row"><span data-k="r{i}"></span><b class="{"y" if ok else "n"}">{"&#10003;" if ok else "&#10007;"}</b></div>' for i, (c, ok) in enumerate(ROWS))
add('01-chart-free-tuition',
 '.bg{width:var(--bw,1512px);left:var(--bx,0px);top:var(--by,-205px)}'
 '.veil{inset:0;background:var(--dim,rgba(12,12,16,.42))}'
 '.sheet{position:absolute;left:var(--px,28px);top:var(--py,128px);width:480px;padding:14px 22px 16px;background:#FBFAF5;rotate:1.2deg;box-shadow:0 16px 40px rgba(0,0,0,.35)}'
 '.sheet .hd{font:700 52px/1 "CV",cursive;color:#111114;display:flex;justify-content:space-between;border-bottom:4px solid #111114;padding-bottom:8px;margin-bottom:4px}'
 '.row{display:flex;justify-content:space-between;align-items:center;font:700 72px/1.18 "CV",cursive;color:#1D2C6B;border-bottom:2px solid rgba(17,17,20,.25)}'
 '.row b{font:800 80px/1 "FG",sans-serif;width:84px;text-align:center}.row b.y{color:#159A55}.row b.n{color:#D7261E}'
 '.w{left:0;right:0;top:var(--wy,14px);text-align:center;font:italic 900 var(--ws,96px)/1 "IT",sans-serif;color:var(--yl,#FFD60A);letter-spacing:-.025em;text-transform:uppercase}',
 '<img class="ph bg z1" data-img="bg" alt=""><div class="veil z2"></div>\n'
 '<div class="sheet z3" data-move="sheet"><div class="hd"><span data-k="h1"></span><span data-k="h2"></span></div>' + TABLE + '</div>\n'
 '<img class="ph bg cut z4" data-img="me" alt="">\n'
 '<div class="a w shd z5" data-k="w"></div>',
 {'board': 'yt-10', 'kind': 'her full shoot photo, a hand-written chart of ticks and crosses behind her, yellow italic caps on top',
  'direction': 'Copies board yt-10 ("SAVE 4 HOURS A DAY": the creator in his room in front of a hand-drawn chart full of ticks and crosses, heavy yellow italic caps across the top). Her shoot photo (pointing at the chart, face untouched), room dimmed, a paper chart behind her: free tuition? Germany yes (most public universities), France, Norway, Estonia no (all from the kit). Words: FREE TUITION IN EUROPE?',
  'thumbnail_text': 'FREE TUITION IN EUROPE? + chart: Germany tick, France / Norway / Estonia crosses',
  'titles': ['Tuition Free Universities in Europe Need Proof of Funds', 'Study in Europe for Free? What Nigerians Really Pay', 'Cheapest Country to Study in Europe? 9 Countries Compared'],
  'title': 'Tuition Free Universities in Europe Need Proof of Funds', 'class': 'no-lift',
  'text': dict({'w': 'Free tuition in Europe?', 'h1': 'country', 'h2': 'free?'}, **{f'r{i}': c for i, (c, ok) in enumerate(ROWS)}),
  'images': {'bg': '../../assets/shoot/room-1591.jpg', 'me': '../../assets/shoot/room-1591-cut.png'}, 'vars': {}})

for name, css, body, content, extra in S:
    # dropped after the cold review (Bin: ~/.Trash/cheapest-thumbnails-set3-2026-11-12/dropped-set4/); only rebuilt when named
    if name.startswith(('12-', '13-', '16-', '17-')) and not ONLY: continue
    if ONLY and not any(name.startswith(o) for o in ONLY): continue
    d = os.path.join(ROOT, 'directions', name); os.makedirs(d, exist_ok=True)
    open(os.path.join(d, 'index.html'), 'w').write(HEAD.format(css=css, body=body, extra=extra))
    cp = os.path.join(d, 'content.json')
    if FORCE or not os.path.exists(cp):
        json.dump(content, open(cp, 'w'), indent=1, ensure_ascii=False)
    print('wrote', name)
