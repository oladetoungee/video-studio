# Writes the 2026-11-10 thumbnail set (directions/NN-*/index.html + content.json). Run once; after that the directions are the
# editable sources (studio /design/<slug>/thumbnails/ edits content.json). Re-running OVERWRITES her studio edits.
#   python3 tools/set_2026_11_10.py [only-prefix...]
# Facts (kit 7f, official pages checked 2 Nov 2026): Germany tuition €0 at most public universities, proof of funds €11,904 a year
# (€992 a month); Austria tuition €726.72 a semester + ÖH €26.20, proof of funds €722.58 a month under 24, €1,308.39 at 24 and over;
# France master's €3,950 a year + €877.50 a month (€10,530 a year) since 1 Aug 2026; Estonia (Tallinn University) €4,000+ a year +
# €880 a month. Year one = tuition + 12 months of proof of funds: Austria (under 24) €10,177, Germany €11,904, France €14,480, Estonia €14,560.
import json, os, sys
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SH = '../../assets/shoot/'
CO = '../../assets/collage/'
HEAD = {1578: (1054, 444), 1581: (1032, 480), 1582: (1041, 485), 1585: (955, 518), 1586: (942, 525), 1589: (928, 526), 1590: (1119, 521)}   # (hair centre x, head top y) in the 2016x1512 room photo

def room(n, fx, fy, s):
    X, Y = HEAD[n]
    return {'--rw': f'{round(2016 * s)}px', '--rx': f'{round(fx - X * s)}px', '--ry': f'{round(fy - Y * s)}px'}

HTML = '<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../../lib/ce.css"><style>{css}</style></head><body><div class="t">\n{body}\n</div><script src="../../lib/bind.js"></script></body></html>'
ROOMB = '<img class="room z1" data-img="room" alt=""><div class="dimr z2"></div>\n'
ME = '<img class="room z4" data-img="me" alt="">\n'
FLAG = {'DE': '<div class="flag h z5" data-move="flag{k}" style="{st}"><i style="background:#000"></i><i style="background:#DD0000"></i><i style="background:#FFCE00"></i></div>',
        'FR': '<div class="flag z5" data-move="flag{k}" style="{st}"><i style="background:#0055A4"></i><i style="background:#fff"></i><i style="background:#EF4135"></i></div>',
        'AT': '<div class="flag h z5" data-move="flag{k}" style="{st}"><i style="background:#C8102E"></i><i style="background:#fff"></i><i style="background:#C8102E"></i></div>',
        'EE': '<div class="flag h z5" data-move="flag{k}" style="{st}"><i style="background:#0072CE"></i><i style="background:#000"></i><i style="background:#fff"></i></div>'}
def flag(c, st, k=''): return FLAG[c].format(st=st, k=k)
D = {}

D['03-free-tuition-in-europe'] = dict(
    css='.big{left:62px;top:10px;font-size:310px;color:#fff;line-height:.8}.q{left:66px;top:262px;font-size:162px;color:#fff;line-height:.8}.q .or{color:var(--or)}.sub{left:70px;top:404px;font-size:66px;color:#fff}',
    body=ROOMB + '<div class="lg big shd z3" data-k="big" data-move="big"></div>\n' + ME + '<div class="lg q shd z5" data-k="q" data-move="q"></div><div class="it sub shd z5" data-k="sub" data-move="sub"></div>',
    c={'direction': 'Her shoot photo (white tee, red headband) in her room, presenting an open palm, a calm sceptical look. "€0" huge on the left as if she holds it out, "TUITION?" under it. The title gives the topic and who it is for; the picture asks the question every viewer has (is Europe really free?). Follows: board d-kind (creator one side, claim the other) + HTTP 01 (big number). Fact: most public universities in Germany (and Czech-taught programmes in Czechia) charge €0 tuition, but every country asks for proof of funds (kit 7f).',
       'thumbnail_text': '€0 TUITION? to study in Europe',
       'titles': ['Cheapest Countries to Study in Europe for Nigerians (2027)', 'Study in Europe for Free? What Nigerians Really Pay', 'Tuition Free Universities in Europe Need Proof of Funds'],
       'kind': 'photo', 'class': 'no-lift',
       'text': {'big': '€0', 'q': 'Tuition<span class="or">?</span>', 'sub': 'to study in Europe'},
       'images': {'room': SH + 'room-1590.jpg', 'me': SH + 'room-1590-cut.png'},
       'vars': {**room(1590, 900, 36, 0.92), '--dim': 'rgba(17,17,20,.42)'}})

D['02-germany-free-tuition'] = dict(
    css='.cut{height:700px;right:-30px}.k1{left:64px;top:62px;font-size:30px;color:#B9B3A8}'
        '.a{left:60px;top:128px;font-size:176px;color:var(--paper)}.b{left:60px;top:338px;font-size:96px;color:#fff}'
        '.c{left:60px;top:440px;font-size:200px;color:var(--or)}.cut{height:780px;right:-150px}',
    body='<div class="pat-l z1"></div>\n' + flag('DE', 'left:64px;top:40px;width:120px;height:72px;box-shadow:none') +
         '<div class="mono k1 z3" data-k="k1" data-move="k1" style="left:168px;top:72px"></div>\n'
         '<div class="lg a z3" data-k="a" data-move="a"></div><div class="lg b z3" data-k="b" data-move="b"></div><div class="lg c z3" data-k="c" data-move="c"></div>\n'
         '<img class="cut z2" data-img="me" alt="">',
    c={'direction': 'Flat off-black with fine same-hue lines (§7). Left, two lines a stranger reads in a second: TUITION €0 in paper colour, then "money to show" and €11,904 in the one orange (= costs more). The German flag + GERMANY in mono. Her cut-out on the right, hand on her chin, thinking. Follows: board e-kind (tech explainer: the topic huge + the literal thing) and her old 14 (FREE vs €11,904, the best-scored idea of set 1). Fact: €11,904 a year = €992 a month, German Missions in Nigeria / DAAD (kit 7f).',
       'thumbnail_text': 'TUITION €0 · VISA NEEDS €11,904 (German flag)',
       'titles': ['Germany Is Free to Study In. The Visa Isn\'t', 'Studying in Germany: The Real Cost for Nigerians (2027)', 'Cheapest Countries to Study in Europe for Nigerians (2027)'],
       'kind': 'flat', 'class': 'no-lift',
       'text': {'k1': '', 'a': 'Tuition €0', 'b': 'Visa needs', 'c': '€11,904'},
       'images': {'me': SH + 'cut-1586c.png'},
       'vars': {'--ground': '#111114', '--pa': '.035'}})

D['x-03-collage-cheapest-countries'] = dict(
    css='.pol{width:390px;height:300px}.cut{height:540px;left:50%;translate:-50% 0;bottom:0}.sub3{left:0;right:0;bottom:22px;text-align:center;font-size:50px;color:var(--ink)}'
        '.line{left:0;right:0;bottom:78px;text-align:center;font-size:140px;color:var(--ink)}.line .or{color:var(--or)}',
    body='<div class="pat z1"></div>\n'
         '<div class="pol z2" data-move="p1" style="left:34px;top:30px;rotate:-6deg"><img data-img="p1" alt=""></div>'
         '<div class="pol z2" data-move="p2" style="left:210px;top:240px;rotate:4deg;width:290px;height:200px"><img data-img="p2" alt=""></div>'
         '<div class="pol z2" data-move="p3" style="right:34px;top:26px;rotate:5deg"><img data-img="p3" alt=""></div>'
         '<div class="pol z2" data-move="p4" style="right:210px;top:240px;rotate:-4deg;width:290px;height:200px"><img data-img="p4" alt=""></div>' + flag('DE', 'left:58px;top:270px;width:66px;height:44px;rotate:-6deg', 'p1') + flag('FR', 'left:228px;top:410px;width:66px;height:44px;rotate:4deg', 'p2') + flag('AT', 'right:58px;top:270px;width:66px;height:44px;rotate:5deg', 'p3') + flag('EE', 'right:238px;top:410px;width:66px;height:44px;rotate:-4deg', 'p4') + '\n'
         '<img class="cut z3" data-img="me" alt="">\n<div class="lg line z4" data-k="line" data-move="line"></div><div class="it sub3 z4" data-k="sub" data-move="sub"></div>',
    c={'direction': 'Collage on warm paper with a quiet line pattern: four city photos as polaroids (Berlin, Paris, Vienna, Tallinn; Pexels, free licence), each with its small flag, around her cut-out (calm, straight at the viewer). One big line at the foot names the topic. No captions on the photos. Follows: board b-kind ("Living in Finland diaries", "the art of offline living") and c-kind (creator surrounded by the topic\'s things).',
       'thumbnail_text': 'CHEAPEST COUNTRIES (four European cities, each with its flag)',
       'titles': ['Cheapest Country to Study in Europe? 9 Countries Compared', '9 European Countries Compared for Nigerian Students', 'Cheapest Countries to Study in Europe for Nigerians (2027)'],
       'kind': 'collage', 'class': 'no-lift',
       'text': {'line': '<span class="or">Cheapest</span> countries', 'sub': 'to study in Europe'},
       'images': {'p1': CO + 'berlin.jpg', 'p2': CO + 'paris.jpg', 'p3': CO + 'vienna.jpg', 'p4': CO + 'tallinn-street.jpg', 'me': SH + 'cut-1578c.png'},
       'vars': {'--ground': '#EDE9E2', '--pa': '.035'}})

D['x-04-under-24-austria'] = dict(
    css='.big{left:50px;top:84px;font-size:200px;color:#fff}.sub{left:56px;top:300px;font-size:60px;color:#fff}',
    body=ROOMB + '<div class="lg big shd z3" data-k="big" data-move="big"></div>\n' + ME +
         '<div class="it sub shd z5" data-k="sub" data-move="sub"></div>\n' + flag('AT', 'left:68px;top:410px;width:120px;height:80px', 'at'),
    c={'direction': 'Her shoot photo, head tilted, a knowing look, in her room (calmed a little). UNDER 24? huge on the left, one plain line under it: "Austria costs you less", and the Austrian flag. Follows: board "48 HOURS" (a number as the hook) + d-kind. Fact: Austria\'s proof of funds is €722.58 a month under 24 and €1,308.39 at 24 and over (OeAD, since 1 Jan 2026; kit 7f).',
       'thumbnail_text': 'UNDER 24? Austria costs students less',
       'titles': ['Under 24? This Country Is Cheaper to Study In', 'Study in Austria: Why Your Age Changes the Cost', 'Cheapest Countries to Study in Europe for Nigerians (2027)'],
       'kind': 'photo', 'class': 'no-lift',
       'text': {'big': 'Under 24?', 'sub': 'Austria costs students less'},
       'images': {'room': SH + 'room-1585.jpg', 'me': SH + 'room-1585-cut.png'},
       'vars': {**room(1585, 1080, 30, 1.13), '--dim': 'rgba(17,17,20,.36)'}})

D['05-receipt-year-one'] = dict(
    css='.rcpt{left:70px;top:46px;width:580px;rotate:-2deg}.rcpt .hd{font-size:30px}.rcpt .ft{font-size:26px}.rcpt .row:nth-of-type(2){background:rgba(255,71,19,.22);margin:0 -16px;padding-left:16px;padding-right:16px}.hd2{left:690px;top:120px;font-size:150px;color:var(--ink);line-height:.9}'
        '.sub2{left:696px;top:420px;font-size:44px;color:var(--ink)}',
    body='<div class="pat z1"></div>\n'
         '<div class="rcpt z3" data-move="rcpt"><div class="hd" data-k="rh"></div>'
         '<div class="row"><span class="k" data-k="k1"></span><span class="v" data-k="v1"></span></div>'
         '<div class="row"><span class="k" data-k="k2"></span><span class="v" data-k="v2"></span></div>'
         '<div class="row"><span class="k" data-k="k3"></span><span class="v" data-k="v3"></span></div>'
         '<div class="row"><span class="k" data-k="k4"></span><span class="v" data-k="v4"></span></div>'
         '<div class="ft" data-k="ft"></div></div>\n'
         '<div class="lg hd2 z3" data-k="head" data-move="head"></div><div class="it sub2 z3" data-k="sub" data-move="sub"></div>',
    c={'direction': 'No face: a long paper receipt on orange with a quiet line pattern (§7), tilted, listing what year one costs in four countries (tuition + a year of the money you must show). Right: "Year one in Europe" big in ink, "what it really costs" under it. Follows: board e-kind (the literal thing) and HTTP 02 (the list IS the picture). Facts: kit 7f (Austria under 24 €1,505.84 + €8,671; Germany €11,904; France €3,950 + €10,530; Estonia €4,000 + €10,560).',
       'thumbnail_text': 'YEAR ONE IN EUROPE (a receipt: Austria €10,177 · Germany €11,904 · France €14,480 · Estonia €14,560)',
       'titles': ['What Studying in Europe Really Costs a Nigerian in 2027', 'Cheapest Countries in Europe: Tuition + Proof of Funds', 'Cheapest Countries to Study in Europe for Nigerians (2027)'],
       'kind': 'other',
       'text': {'rh': 'Tuition + visa money', 'k1': 'Austria*', 'v1': '€10,177', 'k2': 'Germany', 'v2': '€11,904', 'k3': 'France', 'v3': '€14,480', 'k4': 'Estonia', 'v4': '€14,560',
                'ft': '*under 24 · Nov 2026', 'head': 'Year one<br>in Europe', 'sub': 'what studying really costs'},
       'images': {}, 'vars': {'--ground': '#FF4713', '--pa': '.06'}})

D['04-money-you-must-show'] = dict(
    css='.cut{height:680px;right:20px}.notes{width:330px;right:395px;top:290px;rotate:-8deg}'
        '.hd2{left:60px;top:66px;font-size:170px;color:var(--ink);line-height:.84}.sub2{left:64px;top:520px;font-size:62px;color:var(--ink)}',
    body='<div class="pat z1"></div>\n<img class="cut z2" data-img="me" alt="">\n<img class="obj notes z3" data-img="notes" data-move="notes" alt="">\n'
         '<div class="lg hd2 z3" data-k="head" data-move="head"></div><div class="it sub2 z3" data-k="sub" data-move="sub"></div>',
    c={'direction': 'Flat safety orange with a quiet line pattern (§7). Her cut-out on the right holds out her open palm with a fan of euro notes on it (Pexels, cut out). Left: MONEY YOU MUST SHOW in big ink caps, "to study in Europe" under it. Follows: board c-kind (the object IS the topic) + d-kind. Fact: every country sets a proof-of-funds amount for the student visa (kit 7f).',
       'thumbnail_text': 'MONEY YOU MUST SHOW · to study in Europe',
       'titles': ['Proof of Funds for Studying in Europe, Country by Country', 'What Is Proof of Funds? Study in Europe (2027)', 'Tuition Free Universities in Europe Need Proof of Funds'],
       'kind': 'flat', 'class': 'no-lift',
       'text': {'head': 'Money<br>you must<br>show', 'sub': 'to study in Europe'},
       'images': {'me': SH + 'cut-1590c.png', 'notes': CO + 'euro-fan-cut.png'},
       'vars': {'--ground': '#FF4713', '--pa': '.06'}})

D['x-07-what-i-pay-in-estonia'] = dict(
    css='.big{left:56px;top:60px;font-size:190px;color:#fff}.sub{left:62px;top:250px;font-size:62px;color:#fff}',
    body=ROOMB + '<div class="lg big shd z3" data-k="big" data-move="big"></div>\n' + ME +
         '<div class="it sub shd z5" data-k="sub" data-move="sub"></div>\n' + flag('EE', 'left:66px;top:350px;width:120px;height:78px', 'ee'),
    c={'direction': 'Her shoot photo in her room in Tallinn, one hand up as she explains. WHAT I PAY huge on the left, "to study in Estonia" under it, the Estonian flag. A real person\'s own numbers: the story the title tells. Follows: board d-kind + "Living in Finland diaries" (a personal angle on a place). Fact: her fee €6,000 a year; new non-EU students on her programme €7,000 (tlu.ee, kit 7e).',
       'thumbnail_text': 'WHAT I PAY · to study in Estonia',
       'titles': ['What Studying in Europe Really Costs a Nigerian in 2027', 'I Study in Estonia: What It Really Costs a Nigerian', 'Studying in Europe as a Nigerian: The Real Cost'],
       'kind': 'photo', 'class': 'no-lift',
       'text': {'big': 'What I pay', 'sub': 'to study in Estonia'},
       'images': {'room': SH + 'room-1582.jpg', 'me': SH + 'room-1582-cut.png'},
       'vars': {**room(1582, 1050, 36, 1.0), '--dim': 'rgba(17,17,20,.34)'}})

D['01-split-free-or-not'] = dict(
    css='.L{left:0;top:0;width:640px;height:720px;background:var(--paper)}.R{left:640px;top:0;width:640px;height:720px;background:var(--ink)}'
        '.a{left:50px;top:70px;font-size:220px;color:var(--ink)}.ak{top:290px !important}.bk{top:290px !important}.ak{left:56px;top:300px;font-size:46px;color:var(--ink)}'
        '.b{right:46px;top:70px;font-size:220px;color:var(--or);text-align:right}.bk{right:50px;top:300px;font-size:40px;color:#fff;text-align:right}'
        '.cut{height:570px;left:50%;translate:-50% 0}.ak,.bk{font-size:50px !important}',
    body='<div class="abs L z1"></div><div class="abs R z1"></div>\n'
         '<div class="lg a z3" data-k="a" data-move="a"></div><div class="it ak z3" data-k="ak" data-move="ak"></div>' + flag('DE', 'left:440px;top:96px;width:120px;height:80px;box-shadow:none', 'de') +
         '<div class="lg b z3" data-k="b" data-move="b"></div><div class="it bk z3" data-k="bk" data-move="bk"></div>\n'
         '<img class="cut z4" data-img="me" alt="">',
    c={'direction': 'Split: warm paper left ("Free?" + "what you hear about Germany"), off-black right (€11,904 in orange + "what you must show"), her calm cut-out in the middle on the seam. The before / after idea, only because the topic IS a gap between the story and the cost. Follows: board f-kind (split) and set 1\'s best-scored option (14). Fact: €11,904 a year, German Missions in Nigeria (kit 7f).',
       'thumbnail_text': 'FREE? (what you hear about Germany) | €11,904 (what the visa asks)',
       'titles': ['Study in Europe for Free? What Nigerians Really Pay', 'Germany Is Free to Study In. The Visa Isn\'t', 'Tuition Free Universities in Europe Need Proof of Funds'],
       'kind': 'other', 'class': 'no-lift', 'recommended': True,
       'text': {'a': 'Free?', 'ak': 'what you hear<br>about Germany', 'b': '€11,904', 'bk': 'what the<br>visa asks'},
       'images': {'me': SH + 'cut-1578c.png'}, 'vars': {}})

D['x-09-which-is-cheaper'] = dict(
    css='.hd2{left:0;right:0;top:30px;text-align:center;font-size:150px;color:#fff}.sub9{left:0;right:0;top:170px;text-align:center;font-size:56px;color:#fff}',
    body=ROOMB + '<div class="lg hd2 shd z3" data-k="head" data-move="head"></div><div class="it sub9 shd z5" data-k="sub" data-move="sub"></div>\n' + ME +
         flag('DE', 'left:var(--f1x,770px);top:var(--f1y,486px);width:180px;height:120px;rotate:-6deg', '1') + flag('FR', 'left:var(--f2x,975px);top:var(--f2y,462px);width:180px;height:120px;rotate:5deg', '2'),
    c={'direction': 'Her shoot photo in her room, both palms open like a pair of scales; a German flag on one palm and a French flag on the other. One line across the top: WHICH IS CHEAPER? The picture IS the comparison. Follows: board a-kind (a real scene, text big across it) + c-kind (her surrounded by the topic\'s things).',
       'thumbnail_text': 'WHICH IS CHEAPER? to study in (a German and a French flag on her palms)',
       'titles': ['Cheapest Country to Study in Europe? 9 Countries Compared', 'Germany or France: Which Is Cheaper to Study In?', 'Cheapest Countries to Study in Europe for Nigerians (2027)'],
       'kind': 'photo', 'class': 'no-lift',
       'text': {'head': 'Which is cheaper?', 'sub': 'to study in'},
       'images': {'room': SH + 'room-1589.jpg', 'me': SH + 'room-1589-cut.png'},
       'vars': {**room(1589, 640, 250, 0.82), '--dim': 'rgba(17,17,20,.5)'}})

D['06-europe-on-a-budget'] = dict(
    css='.pic{right:0;top:0;width:520px;height:720px;filter:blur(7px) brightness(.8)}.cut{height:600px;left:560px}.k{font:800 48px/1 IT !important;letter-spacing:-.01em !important;text-transform:none !important}.hd2{left:60px;top:84px;font-size:190px;color:var(--ink);line-height:.88}'
        '.sub2{left:64px;top:452px;font-size:74px;color:var(--or)}.k{left:66px;top:590px;color:var(--ink);font-size:36px}',
    body='<div class="pat z1"></div>\n<img class="pic z2" data-img="photo" data-move="photo" alt="">\n'
         '<div class="lg hd2 z3" data-k="head" data-move="head"></div><div class="it sub2 z3" data-k="sub" data-move="sub"></div>'
         '<div class="mono k z3" data-k="k" data-move="k"></div><img class="cut z4" data-img="me" alt="">',
    c={'direction': 'Flat warm paper with a quiet line pattern, a real photo full-height on the right (students in a lecture, Pexels, free licence). Left: STUDY IN EUROPE in big ink caps, "on a budget" in orange, a small mono line "9 countries compared". Her cut-out (hand on chin, thinking) on the seam between the words and the photo. Follows: board e-kind (topic huge + the literal thing) and the design board "text placement" pins.',
       'thumbnail_text': 'STUDY IN EUROPE · on a budget · 9 countries compared',
       'titles': ['Cheapest Countries to Study in Europe for Nigerians (2027)', 'Study in Europe on a Budget: 9 Countries Compared', 'Cheapest Country to Study in Europe? 9 Countries Compared'],
       'kind': 'flat', 'class': 'no-lift',
       'text': {'head': 'Study in<br>Europe', 'sub': 'on a budget', 'k': '9 countries compared'},
       'images': {'photo': CO + 'lecture.jpg', 'me': SH + 'cut-1586c.png'}, 'vars': {'--ground': '#EDE9E2', '--pa': '.035'}})

only = sys.argv[1:]
for name, d in D.items():
    if name.startswith('x-'): continue   # dropped after cold round 4 (2026-11-10), kept here for reference
    if only and not any(name.startswith(o) for o in only): continue
    p = os.path.join(ROOT, 'directions', name); os.makedirs(p, exist_ok=True)
    open(os.path.join(p, 'index.html'), 'w').write(HTML.format(css=d['css'], body=d['body']))
    c = dict(d['c']); c['title'] = c['titles'][0]
    json.dump(c, open(os.path.join(p, 'content.json'), 'w'), indent=1, ensure_ascii=False)
    print(name)
