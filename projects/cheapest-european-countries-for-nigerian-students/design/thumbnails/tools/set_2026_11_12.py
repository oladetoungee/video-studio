# Set 3 (2026-11-12): 10 thumbnails, each copying the composition of one named board item.
# Writes directions/NN-name/{index.html, content.json}. content.json is written ONLY when missing (her studio edits live there);
# pass --force to overwrite both (wipes her edits: only for a full rebuild before she has touched them).
import json, os, sys
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FORCE = '--force' in sys.argv
HEAD = '<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../../lib/eu.css"><style>{css}</style></head><body><div class="t">\n{body}\n</div>{extra}<script src="../../lib/bind.js"></script></body></html>'
MAP_JS = '''<script>window.__extra = async () => { const h = document.getElementById('map'); h.innerHTML = await (await fetch('../../assets/map/europe.svg')).text(); };</script>'''
S = []

def add(name, css, body, content, extra=''):
    S.append((name, css, body, content, extra))

# 01 · board yt-11 "MOVING ABROAD": a real street, people with suitcases, big serif caps across the middle, an italic line above
add('01-street-study-in-europe',
 '.bg{width:var(--bw,1400px);left:var(--bx,-60px);top:var(--by,-110px)}'
 '.veil{inset:0;background:var(--dim,rgba(20,14,8,.30))}.band{left:0;right:0;top:170px;height:340px;background:radial-gradient(ellipse 70% 60% at 50% 50%,rgba(12,9,6,.7),rgba(12,9,6,0))}'
 '.cap{left:0;right:0;top:var(--cy,300px);text-align:center;font:400 var(--cs,150px)/.9 "DMS",serif;letter-spacing:.035em;color:var(--gold,#F2C94C)}'
 '.pre{left:0;right:0;top:var(--py,218px);text-align:center;font:italic 400 var(--ps,80px)/1 "DMS",serif;color:var(--gold,#F2C94C)}',
 '<img class="ph bg z1" data-img="bg" alt=""><div class="veil z2"></div><div class="veil band z2"></div>\n'
 '<div class="a pre shd z3" data-k="pre"></div><div class="a cap shd z3" data-k="cap"></div>',
 {'board': 'yt-11', 'kind': 'real scene (Pexels street), editorial serif, no face',
  'direction': 'Copies board yt-11 ("MOVING ABROAD": a woman with a suitcase in a real hallway, big serif caps across the middle, a small italic line above). A real Italian old-town street with students pulling suitcases (Pexels, Vinicius Vieira ft), warm and slightly darkened; "STUDY IN EUROPE" in big gold serif caps across the middle, "the cheapest countries to" in italic serif above it. No face: the street and the suitcases are the picture.',
  'thumbnail_text': 'the cheapest countries to STUDY IN EUROPE',
  'titles': ['Cheapest Countries to Study in Europe for Nigerians (2027)', 'What Studying in Europe Really Costs a Nigerian in 2027', 'Cheapest Country to Study in Europe? 9 Countries Compared'],
  'title': 'Cheapest Countries to Study in Europe for Nigerians (2027)',
  'text': {'pre': 'the cheapest countries to', 'cap': 'STUDY IN EUROPE'},
  'images': {'bg': '../../assets/px/oldtown-suitcases.jpg'}, 'vars': {}, 'class': ''})

# 02 · board yt-71 "the art of offline living": 4 real photos as panels + one centred lowercase serif line
add('02-collage-europe-on-a-budget',
 '.p1{left:0;top:0;width:520px;height:720px}.p2{left:526px;top:0;width:374px;height:720px}.p3{left:906px;top:0;width:374px;height:720px}'
 '.fill.p1 img{width:auto;height:var(--p1h,780px);left:var(--p1l,-250px);top:var(--p1t,-20px);object-fit:fill}.p2 img{object-position:50% 50%}'
 '.veil{left:0;right:0;top:0;height:260px;background:radial-gradient(ellipse 55% 100% at 50% 0,rgba(10,10,12,var(--dim,.62)),rgba(10,10,12,0))}'
 '.line{left:0;right:0;top:var(--ly,40px);text-align:center;font:400 var(--ls,100px)/1 "DMS",serif;color:#fff;letter-spacing:-.015em}',
 '<div class="fill p1 z1"><img data-img="p1" alt=""></div><div class="fill p2 z1"><img data-img="p2" alt=""></div>'
 '<div class="fill p3 z1"><img data-img="p3" alt=""></div><div class="veil z2"></div>\n'
 '<div class="a line shd z3" data-k="line"></div>',
 {'board': 'yt-71', 'kind': 'collage of 4 real photos (her full shoot photo + 3 Pexels), lowercase serif',
  'direction': 'Copies board yt-71 ("the art of offline living": 3-4 real photos side by side, one centred lowercase serif line across the top). Panels: her full shoot photo in her room (not a cut-out, palms up), Humboldt University library in Berlin, euro notes. One line: "study in europe on a budget".',
  'thumbnail_text': 'study in europe on a budget',
  'titles': ['Cheapest Countries to Study in Europe for Nigerians (2027)', 'Studying in Europe as a Nigerian: The Real Cost', 'Cheapest Countries in Europe: Tuition + Proof of Funds'],
  'title': 'Studying in Europe as a Nigerian: The Real Cost',
  'class': 'no-lift',
  'text': {'line': 'study in europe on a budget'},
  'images': {'p1': '../../assets/shoot/room-1589.jpg', 'p2': '../../assets/px/university-berlin.jpg', 'p3': '../../assets/collage/euro-fan.jpg'},
  'vars': {}})

# 03 · board yt-74 "Teaching myself EVERYTHING": her real scene, white italic words bottom-left, a red hand-drawn mark
add('04-is-it-really-free',
 '.bg{width:var(--bw,1500px);left:var(--bx,-10px);top:var(--by,-300px)}'
 '.veil{left:0;bottom:0;width:860px;height:420px;background:radial-gradient(ellipse at 20% 85%,rgba(10,10,12,.62),rgba(10,10,12,0) 70%)}'
 '.l1{left:56px;top:var(--y1,418px);font:italic 400 var(--s1,74px)/1 "IS",serif;color:#fff}'
 '.l2{left:50px;top:var(--y2,488px);font:900 var(--s2,128px)/1 "IT",sans-serif;font-style:normal;transform:skewX(-9deg);transform-origin:0 100%;color:#fff;letter-spacing:-.02em}'
 '.mark{left:300px;top:628px;width:430px;height:60px}',
 '<img class="ph bg z1" data-img="bg" alt=""><div class="veil z2"></div>\n'
 '<div class="a l1 shd z3" data-k="l1"></div><div class="a l2 shd z3" data-k="l2"></div>\n'
 '<svg class="a mark z4" data-move="mark" viewBox="0 0 560 60"><path d="M6 34 C 120 18, 260 14, 420 22 S 540 30, 552 26" fill="none" stroke="#E5322D" stroke-width="9" stroke-linecap="round"/><path d="M40 48 C 170 36, 330 34, 470 40" fill="none" stroke="#E5322D" stroke-width="6" stroke-linecap="round"/></svg>',
 {'board': 'yt-74', 'kind': 'her full shoot photo in her room, italic type',
  'direction': 'Copies board yt-74 ("Teaching myself EVERYTHING": a real scene of the person, white italic words bottom-left, a red hand-drawn mark). Her full shoot photo in her room (hand on chin, thinking), not a cut-out; "is studying in Europe" in italic serif, "REALLY FREE?" in heavy slanted sans, a red hand-drawn underline.',
  'thumbnail_text': 'is studying in Europe REALLY FREE?',
  'titles': ['Tuition Free Universities in Europe Need Proof of Funds', 'Study in Europe for Free? What Nigerians Really Pay', 'Cheapest Countries to Study in Europe for Nigerians (2027)'],
  'title': 'Tuition Free Universities in Europe Need Proof of Funds',
  'class': 'no-lift',
  'text': {'l1': 'is studying in Europe', 'l2': 'REALLY <span class="or">FREE?</span>'}, 'vars': {'--or': '#E5322D'},
  'images': {'bg': '../../assets/shoot/room-1586.jpg'}})

# 04 · board yt-63 "CODE IN 2026": words in stacked white boxes on the left, the person large on the right in a real room
add('04-study-in-europe-real-cost',
 '.bg{width:var(--bw,1700px);left:var(--bx,0px);top:var(--by,-400px)}'
 '.veil{inset:0;background:var(--dim,rgba(12,12,14,.36))}'
 '.bx{left:56px;padding:2px 22px 10px;background:#fff;color:#111114;font:800 var(--bs,80px)/1.02 "IT",sans-serif;letter-spacing:-.035em;box-shadow:0 14px 34px rgba(0,0,0,.35)}'
 '.b1{top:var(--b1,190px)}.b2{top:var(--b2,290px);background:var(--acc,#1B3FD8);color:#fff}.b3{top:var(--b3,390px)}',
 '<img class="ph bg z1" data-img="bg" alt=""><div class="veil z2"></div>\n'
 '<div class="a bx b1 z3" data-k="b1"></div><div class="a bx b2 z3" data-k="b2"></div><div class="a bx b3 z3" data-k="b3"></div>',
 {'board': 'yt-63', 'kind': 'her full shoot photo + words in boxes (1 of the 2 allowed "person beside a headline")',
  'direction': 'Copies board yt-63 ("CODE IN 2026": each word in its own stacked white box on the left, the person large on the right in a real, darker room). Her full shoot photo (no cut-out), room darkened a little; three boxes: STUDY IN EUROPE / THE REAL COST (blue box) / 2027. Plain search words, the promise, the intake year.',
  'thumbnail_text': 'STUDY IN EUROPE / THE REAL COST / 2027',
  'titles': ['Cheapest Countries in Europe: Tuition + Proof of Funds', 'What It Really Costs a Nigerian to Study in Europe', 'Cheapest Countries to Study in Europe for Nigerians (2027)'],
  'title': 'Cheapest Countries in Europe: Tuition + Proof of Funds',
  'class': 'no-lift',
  'text': {'b1': 'STUDY IN EUROPE', 'b2': 'THE REAL COST', 'b3': '2027'},
  'images': {'bg': '../../assets/shoot/room-1581.jpg'}, 'vars': {}})

# 05 · board yt-16 "12:30 PM / 7:30 PM": two real photos side by side, one bold white label at the top of each
add('02-split-tuition-vs-money',
 '.h1{left:0;top:0;width:637px;height:720px}.h2{left:643px;top:0;width:637px;height:720px}'
 '.h1 img{object-position:var(--h1x,60%) 50%}.h2 img{object-position:50% var(--h2y,62%)}'
 '.veil{top:0;height:240px;background:var(--dim,rgba(10,10,12,.30))}.v1{left:0;width:637px}'
 '.lb{top:var(--ly,34px);font:400 var(--ls,96px)/1 "AB",sans-serif;color:#fff;letter-spacing:-.02em}'
 '.s{top:var(--sy,140px);font:700 var(--ss,48px)/1 "FG",sans-serif;color:#fff}'
 '.k1{left:46px}.k2{left:690px}',
 '<div class="fill h1 z1"><img data-img="h1" alt=""></div><div class="fill h2 z1"><img data-img="h2" alt=""></div><div class="veil v1 z2"></div>\n'
 '<div class="a lb k1 shd z3" data-k="a1"></div><div class="a s k1 shd z3" data-k="a2"></div>'
 '<div class="a lb k2 shd z3" data-k="b1"></div><div class="a s k2 shd z3" data-k="b2"></div>',
 {'board': 'yt-16', 'kind': 'split of 2 real photos (Pexels), no face',
  'direction': 'Copies board yt-16 ("12:30 PM / 7:30 PM": two real photos side by side, one bold white label at the top of each). Left: a European lecture hall, "€0 tuition". Right: a hand holding a €100 note, "€11,904 to show" (Germany: tuition is €0 at most public universities, but the visa asks you to show €11,904 a year = €992 a month, kit 7f). The before/after split is used because the topic IS a gap between two numbers.',
  'thumbnail_text': '€0 tuition | €11,904 to show (Germany)',
  'titles': ['Germany Is Free to Study In. The Visa Isn\'t', 'Tuition Free Universities in Europe Need Proof of Funds', 'Study in Europe for Free? What Nigerians Really Pay'],
  'title': 'Germany Is Free to Study In. The Visa Isn\'t',
  'text': {'a1': '€0', 'a2': 'tuition in Germany', 'b1': '€11,904', 'b2': 'to show for the visa'},
  'images': {'h1': '../../assets/collage/lecture.jpg', 'h2': '../../assets/px/hand-100-euro.jpg'}, 'vars': {}})

# 06 · board yt-79 (her with a mug in front of a big calendar): the thing she is talking about fills the wall behind her
add('03-map-of-prices',
 '#map{position:absolute;left:var(--mx,-95px);top:var(--my,-270px);width:var(--mw,1420px)}#map svg{width:100%;height:auto;display:block}'
 '#map .c{--land:#D8D1C2;--line:#EDE9E2}#map .nine{fill:#C9C0AE}#map #DEU,#map #AUT,#map #FRA,#map #EST{fill:var(--hi,#FF4713)}'
 '.me{width:var(--rw,1250px);left:var(--rx,455px);top:var(--ry,-40px)}'
 '.pin{font:400 46px/1 "AB",sans-serif;color:#fff;background:#111114;padding:8px 14px 10px;box-shadow:0 10px 22px rgba(0,0,0,.25);letter-spacing:-.01em}'
 '.pin small{display:block;font:500 18px/1 "Mono",monospace;letter-spacing:.1em;color:#BDB6A8;margin-bottom:6px;text-transform:uppercase}'
 '.q{left:44px;top:var(--qy,34px);font:600 var(--qs,76px)/1 "NW",serif;color:#111114;letter-spacing:-.02em}'
 '.n{left:48px;top:var(--ny,118px);font:italic 500 44px/1.1 "NW",serif;color:#26241F}.pin.big{font-size:64px;background:var(--or)}.pin.big small{color:#fff}',
 '<div class="t-bg z1" style="position:absolute;inset:0;background:#EDE9E2"></div><div id="map" class="z1"></div>\n'
 '<div class="a pin z3" style="left:var(--fx,40px);top:var(--fy,600px)" data-k="p_fr"></div>'
 '<div class="a pin z3" style="left:var(--dx,300px);top:var(--dy,300px)" data-k="p_de"></div>'
 '<div class="a pin big z3" style="left:var(--ax,540px);top:var(--ay,545px)" data-k="p_at"></div>'
 '<div class="a pin z3" style="left:var(--ex,540px);top:var(--ey,190px)" data-k="p_ee"></div>\n'
 '<img class="ph me cut z4" data-img="me" alt="">\n'
 '<div class="a q z5" data-k="q"></div><div class="a n z5" data-k="n"></div>',
 {'board': 'yt-79', 'kind': 'object-led: a map of Europe with 4 prices, her cut-out in front of it',
  'direction': 'Copies board yt-79 (the creator in front of a big wall calendar: the thing she talks about fills the wall behind her). A flat paper map of Europe (Natural Earth, public domain) with four countries in orange and what year one costs there (tuition + one year of the money you must show, kit 7f: Austria under 24 €10,177, Germany €11,904, France €14,480, Estonia €14,560); her shoot cut-out bottom-right in front of it. Words: "cheapest place to study?" in serif, a small italic line under it.',
  'thumbnail_text': 'cheapest place to study? + Europe map with 4 prices',
  'titles': ['Cheapest Country to Study in Europe? 9 Countries Compared', '9 European Countries Compared for Nigerian Students', 'Cheapest Countries to Study in Europe for Nigerians (2027)'],
  'title': 'Cheapest Country to Study in Europe? 9 Countries Compared',
  'class': 'no-lift',
  'text': {'q': 'Cheapest place to study?', 'n': 'first year: fees + visa money',
           'p_de': '<small>Germany</small>€11,904', 'p_fr': '<small>France</small>€14,480', 'p_at': '<small>Austria (under 24)</small>€10,177', 'p_ee': '<small>Estonia</small>€14,560'},
  'images': {'me': '../../assets/shoot/room-1578-cut.png'}, 'vars': {}},
 MAP_JS)

# 07 · board yt-72 "boring, but it works": face in the middle, a balance card on one side, a paper list on the other, lowercase line on top
add('07-proof-of-funds-explained',
 '.bg{width:var(--bw,1500px);left:var(--bx,-110px);top:var(--by,-330px);filter:blur(7px) brightness(.8)}'
 '.me{width:var(--bw,1500px);left:var(--bx,-110px);top:var(--by,-330px)}'
 '.top{left:0;right:0;top:var(--ty,26px);text-align:center;font:700 var(--ts,84px)/1 "FG",sans-serif;color:#fff;letter-spacing:-.025em}'
 '.card{left:46px;top:300px;width:330px;padding:24px 28px 26px;background:#fff;color:#111114;border-radius:18px;box-shadow:0 18px 40px rgba(0,0,0,.35)}'
 '.card .k{font:600 26px/1 "IT",sans-serif;color:#6B675F}.card .v{font:800 66px/1.1 "IT",sans-serif;letter-spacing:-.03em;margin-top:8px}'
 '.doc{left:860px;top:190px;width:385px;padding:24px 28px 18px;background:#FBF9F4;color:#111114;box-shadow:0 18px 40px rgba(0,0,0,.35);transform:rotate(2deg)}'
 '.doc .h{font:700 28px/1.15 "IT",sans-serif;padding-bottom:12px;border-bottom:2px solid #111114}'
 '.doc .r{display:flex;justify-content:space-between;font:700 38px/1 "IT",sans-serif;padding:16px 0 13px;border-bottom:1px solid #DDD7CB}.doc .r b{font-weight:800}',
 '<img class="ph bg z1" data-img="bg" alt=""><img class="ph me cut z2" data-img="me" alt="">\n'
 '<div class="a top shd z3" data-k="top"></div>\n'
 '<div class="a card z3" data-move="card"><div class="k" data-k="ck"></div><div class="v" data-k="cv"></div></div>\n'
 '<div class="a doc z3" data-move="doc"><div class="h" data-k="dh"></div>'
 '<div class="r"><span data-k="r1k"></span><b data-k="r1v"></b></div><div class="r"><span data-k="r2k"></span><b data-k="r2v"></b></div>'
 '<div class="r"><span data-k="r3k"></span><b data-k="r3v"></b></div><div class="r" style="border:0"><span data-k="r4k"></span><b data-k="r4v"></b></div>'
 '</div>',
 {'board': 'yt-72', 'kind': 'her face in the middle (room softly blurred) + a balance card + a paper list',
  'direction': 'Copies board yt-72 ("boring, but it works": the face in the middle of a soft room, a "Balance" card on one side, a paper checklist on the other, one lowercase line on top). Her shoot photo with the room softly blurred behind her (her untouched, sharp); left a plain card "Germany: 1 year €11,904"; right a paper list of the money other countries want you to show for a year (kit 7f: Estonia €10,560 = €880 x 12, France €10,530 = €877.50 x 12, Italy €10,180, Finland €9,600). Line: "proof of funds, explained" (tech pattern: topic + explained).',
  'thumbnail_text': 'proof of funds, explained',
  'titles': ['Proof of Funds for Studying in Europe, Country by Country', 'What Is Proof of Funds? Study in Europe (2027)', 'Tuition Free Universities in Europe Need Proof of Funds'],
  'title': 'Proof of Funds for Studying in Europe, Country by Country',
  'class': 'no-lift',
  'text': {'top': 'proof of funds, explained', 'ck': 'Germany: 1 year', 'cv': '€11,904', 'dh': 'Money to show for 1 year',
           'r1k': 'Estonia', 'r1v': '€10,560', 'r2k': 'France', 'r2v': '€10,530', 'r3k': 'Italy', 'r3v': '€10,180',
           'r4k': 'Finland', 'r4v': '€9,600'},
  'images': {'bg': '../../assets/shoot/room-1578.jpg', 'me': '../../assets/shoot/room-1578-cut.png'}, 'vars': {}})

# 08 · board yt-80 "SECOND BRAIN": the object held in a hand fills the frame, heavy white words top-left
add('07-before-you-japa',
 '.bg{width:var(--bw,1400px);left:var(--bx,-120px);top:var(--by,-110px)}'
 '.w{left:58px;top:var(--wy,46px);font:400 var(--ws,118px)/.94 "AB",sans-serif;color:#fff;letter-spacing:-.03em;text-transform:uppercase}'
 '.s{left:62px;top:var(--sy,402px);font:italic 400 var(--ss,66px)/1 "IS",serif;color:#fff}',
 '<img class="ph bg z1" data-img="bg" alt="">\n<div class="a w shd2 z3" data-k="w"></div><div class="a s shd2 z3" data-k="s"></div>',
 {'board': 'yt-80', 'kind': 'object in hand (Pexels: two hands holding euro notes), no face',
  'direction': 'Copies board yt-80 ("SECOND BRAIN": one object held in a hand on a calm ground, heavy white words top-left). Two Black hands holding fans of euro notes on a warm plain ground (Pexels, cottonbro studio). "BEFORE YOU JAPA" in heavy white caps (japa = Nigerian slang for moving abroad), "to study in Europe" in italic serif under it. No face.',
  'thumbnail_text': 'BEFORE YOU JAPA to study in Europe',
  'titles': ['What Studying in Europe Really Costs a Nigerian in 2027', 'Cheapest Countries to Study in Europe for Nigerians (2027)', 'Proof of Funds for Studying in Europe, Country by Country'],
  'title': 'What Studying in Europe Really Costs a Nigerian in 2027',
  'text': {'w': 'Before<br>you<br>japa', 's': 'to study in Europe'},
  'images': {'bg': '../../assets/px/hands-euro-fans-wide.jpg'}, 'vars': {}})

# 09 · board yt-76 "Write to Understand Your Life": the person close on the left, a big serif line in quotes on the right
add('09-how-much-do-you-need',
 '.bg{width:var(--bw,1700px);left:var(--bx,-560px);top:var(--by,-300px)}'
 '.wash{inset:0;background:var(--wash,#2A4FE0);mix-blend-mode:multiply;opacity:.8}'
 '.me{width:var(--bw,1700px);left:var(--bx,-560px);top:var(--by,-300px)}'
 '.q{left:var(--qx,600px);top:var(--qy,92px);width:640px;white-space:normal;font:400 var(--qs,112px)/.98 "DMS",serif;color:#fff;letter-spacing:-.01em}'
 '.s{left:var(--qx,600px);top:var(--sy,560px);font:italic 400 var(--ss,64px)/1 "DMS",serif;color:#fff}',
 '<img class="ph bg z1" data-img="bg" alt=""><div class="veil wash z2"></div><img class="ph me cut z3" data-img="me" alt="">\n'
 '<div class="a q shd2 z4" data-k="q"></div><div class="a s shd2 z4" data-k="s"></div>',
 {'board': 'yt-76', 'kind': 'her shoot photo, room washed in one colour (like her own ux-research thumbnail), serif quote',
  'direction': 'Copies board yt-76 ("Write to Understand Your Life": the person close-up on the left on a strong blue, a big serif line in quotes on the right). Her shoot photo with her room washed in one deep blue (the way she made her own ux-research thumbnail) and her in full colour on the left; on the right the question every student asks, in quotes: "How much do you need?", and "to study in Europe" in italic under it.',
  'thumbnail_text': '"How much do you need?" to study in Europe',
  'titles': ['What Studying in Europe Really Costs a Nigerian in 2027', 'Proof of Funds for Studying in Europe, Country by Country', 'Cheapest Countries to Study in Europe for Nigerians (2027)'],
  'title': 'What Studying in Europe Really Costs a Nigerian in 2027',
  'class': 'no-lift',
  'text': {'q': '“How much do you need?”', 's': 'to study in Europe'},
  'images': {'bg': '../../assets/shoot/room-1586.jpg', 'me': '../../assets/shoot/room-1586-cut.png'}, 'vars': {}})

# 10 · board reel-1899-39 "how portfolios get rejected in 8 seconds": a real paper flat-lay, big mixed-weight black type on it
add('10-real-cost-calculator',
 '.bg{width:var(--bw,1750px);left:var(--bx,0px);top:var(--by,-110px)}'
 '.veil{inset:0;background:rgba(255,255,255,var(--wh,.0))}'
 '.l1{left:var(--lx,56px);top:var(--y1,150px);font:300 var(--s1,84px)/1 "IT",sans-serif;color:#111114;letter-spacing:-.035em}'
 '.l2{left:var(--lx,50px);top:var(--y2,236px);font:900 var(--s2,150px)/.9 "IT",sans-serif;color:#111114;letter-spacing:-.05em;white-space:normal;width:700px}'
 '.l2 .or{color:var(--or)}',
 '<img class="ph bg z1" data-img="bg" alt=""><div class="veil z2"></div>\n<div class="a l1 z3" data-k="l1"></div><div class="a l2 z3" data-k="l2"></div>',
 {'board': 'reel-1899-39', 'kind': 'object-led real photo (calculator on paper, Pexels), mixed-weight type, no face',
  'direction': 'Copies board reel-1899-39 ("how portfolios get rejected in 8 seconds": a real paper flat-lay with big black type in mixed weights on it). Euro notes, coins and a calculator on a plain warm desk (Pexels, olia danilevich), with calm space on the left for the words; "the real cost of" in a light weight, "studying in Europe" heavy, with "Europe" in orange.',
  'thumbnail_text': 'the real cost of studying in Europe',
  'titles': ['Cheapest Countries to Study in Europe for Nigerians (2027)', 'Cheapest Country to Study in Europe? 9 Countries Compared', 'Study in Europe for Free? What Nigerians Really Pay'],
  'title': 'Cheapest Countries to Study in Europe for Nigerians (2027)',
  'text': {'l1': 'the real cost of', 'l2': 'studying<br>in <span class="or">Europe</span>'},
  'images': {'bg': '../../assets/px/euro-calculator-wide.jpg'}, 'vars': {}})

for name, css, body, content, extra in S:
    d = os.path.join(ROOT, 'directions', name); os.makedirs(d, exist_ok=True)
    html = HEAD.format(css=css, body=body, extra=extra)
    open(os.path.join(d, 'index.html'), 'w').write(html)
    cj = os.path.join(d, 'content.json')
    if FORCE or not os.path.exists(cj):
        content.setdefault('recommended', False)
        json.dump(content, open(cj, 'w'), indent=1, ensure_ascii=False)
    print(name)
