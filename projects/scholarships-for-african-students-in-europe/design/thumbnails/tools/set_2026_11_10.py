# Writes the 2026-11-10 thumbnail set (directions/NN-*/index.html + content.json). Run once; after that the
# directions are the editable sources (studio /design/<slug>/thumbnails/ edits content.json). Re-running overwrites them.
#   python3 tools/set_2026_11_10.py [only-prefix...]
import json, os, sys
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FACE = {1608: (1008, 520), 1609: (1008, 504), 1610: (882, 529), 1612: (1033, 504), 1613: (1033, 529), 1617: (1010, 470), 1619: (1083, 454)}
SH = '../../assets/shoot/'
SRC = '../../assets/src/'

def room(n, fx, fy, s):
    X, Y = FACE[n]
    return {'--rw': f'{round(2016 * s)}px', '--rx': f'{round(fx - X * s)}px', '--ry': f'{round(fy - Y * s)}px'}

HEAD = '<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../../lib/sch.css"><style>{css}</style></head><body><div class="t">\n{body}\n</div><script src="../../lib/bind.js"></script></body></html>'
D = {}

# 01 photo: €1,400 huge behind her head
D['01-1400-a-month'] = dict(
    css='.big{position:absolute;left:30px;top:22px;font-size:316px;color:#fff;letter-spacing:.005em}'
        '.low{position:absolute;left:44px;bottom:40px;font-size:88px;color:#fff;line-height:.9}'
        '.low .acc{color:#7DF0AE}',
    body='<img class="room z1" data-img="room" alt=""><div class="abs z2" style="inset:0;background:var(--dim)"></div>\n'
         '<div class="lg big z3" data-k="big" data-move="big"></div>\n<img class="room z4" data-img="me" alt="">\n'
         '<div class="lg low shd z5" data-k="low" data-move="low"></div>',
    c={'direction': 'Her shoot photo (black top, pink headband, arms crossed, calm) in her room, natural colour, a little calmed. The amount Erasmus Mundus pays every month, huge in white BEHIND her head (text behind the subject, like the Pinterest COOK / SEMINARU pins and HTTP 01); one line at the foot says what it is. Fact: €1,400 a month for up to 24 months (Erasmus+ Programme Guide, kit 1g).',
       'thumbnail_text': '€1,400 (behind her) + paid to you every month to study in Europe',
       'titles': ['Fully Funded Scholarships in Europe for Africans (2027)', 'Scholarships That Pay You to Study in Europe (2027)', 'Erasmus Mundus and More: Fully Funded Master\'s in Europe'],
       'kind': 'photo', 'recommended': True, 'class': 'no-lift',
       'text': {'big': '€1,400', 'low': 'paid to you every month<br>to study in <span class="acc">Europe</span>'},
       'images': {'room': SH + 'room-1612.jpg', 'me': SH + 'room-1612-cut.png'},
       'vars': {**room(1612, 985, 300, 0.96), '--dim': 'rgba(10,10,12,.30)'}})

# 02 flat: the dates closing soon on a paper card, green ground with quiet lines
D['07-scholarship-deadline'] = dict(
    css='.hd2{position:absolute;left:52px;top:40px;font-size:150px;color:#0E0F11}'
        '.paper{position:absolute;left:52px;top:318px;width:660px;background:#FBF9F4;border-radius:10px;box-shadow:0 22px 44px rgba(0,0,0,.28);padding:14px 34px;rotate:-1.2deg}'
        '.paper .d{font:800 150px/.9 "BarlowC";text-transform:uppercase;color:#0E0F11;padding-top:14px}.paper .w{font:800 44px/1.05 "IT";color:#16181B;letter-spacing:-.02em;padding:6px 0 16px}'
        '.row .d{font:800 76px/1 "BarlowC";text-transform:uppercase;width:200px;color:#0E0F11}.row .w{font:800 42px/1.08 "IT";color:#16181B;letter-spacing:-.01em}'
        '.cut{height:640px;right:-40px}',
    body='<div class="abs pat z1" style="inset:0"></div>\n<div class="lg hd2 z3" data-k="head" data-move="head"></div>\n'
         '<div class="paper z3" data-move="card"><div class="d" data-k="d2"></div><div class="w" data-k="w2"></div>'
         '</div>\n'
         '<img class="cut z2" data-img="me" alt="">',
    c={'direction': 'Flat signal green (the video\'s "you can still apply" colour) with fine same-hue diagonal lines (THUMBNAIL-STUDY §7). Top: the promise in plain words. A paper card with one real date, big (si.se: the Swedish Institute scholarship portal closes 24 February 2027). Her cut-out on the right, head tilted, arms crossed. Follows: HTTP 02 (the list IS the picture), "48 HOURS" (a time as the hook).',
       'thumbnail_text': 'SCHOLARSHIP DEADLINES + 24 Feb 2027, last day for Sweden\'s full scholarship (si.se)',
       'titles': ['Scholarships Nigerians Can Still Apply For in 2027', 'Fully Funded Scholarships in Europe for Africans (2027)', 'Scholarships for African Students in Europe: 2027 Deadlines'],
       'kind': 'flat', 'class': 'no-lift',
       'text': {'head': 'Scholarship<br>deadlines', 'd2': '24 Feb 2027', 'w2': 'last day for Sweden\'s<br>full scholarship'},
       'images': {'me': SH + 'cut-1610.png'},
       'vars': {'--ground': '#2FD27A', '--pa': '.07'}})

# 03 collage: city photos around her cut-out on paper
D['08-collage-cities'] = dict(
    css='.pol{width:440px}.pol img{height:300px}'
        '.line{position:absolute;left:0;right:0;bottom:34px;text-align:center;font-size:118px;color:#16181B}'
        '.cut{height:545px;left:50%;translate:-50% 0;bottom:150px}',
    body='<div class="abs z1" style="inset:0;background:#EDE9E2"></div>\n'
         '<div class="pol z2" data-move="p1" style="left:40px;top:40px;rotate:-5deg"><img data-img="p1" alt=""></div>'
         
         '<div class="pol z2" data-move="p3" style="right:40px;top:36px;rotate:5deg"><img data-img="p3" alt=""></div>'
         '\n'
         '<img class="cut z3" data-img="me" alt="">\n<div class="lg line z4" data-k="line" data-move="line"></div>',
    c={'direction': 'Collage on warm paper: two big city photos as polaroids (Stockholm, Amsterdam; Pexels) around her cut-out, hand on her cheek, thinking. One big line at the foot names the topic. No captions on the photos. Follows: board "my potential" collage, "Living in Finland diaries", her 10-07 collage style.',
       'thumbnail_text': 'FULLY FUNDED MASTER\'S IN EUROPE',
       'titles': ['Erasmus Mundus, DAAD and More: Scholarships for 2027', 'Scholarships for African Students in Europe: 2027 Deadlines', 'Scholarships for Nigerian Students in Europe 2027'],
       'kind': 'collage', 'class': 'no-lift',
       'text': {'line': 'Fully funded master\'s in <span style="color:#1B3FD8">Europe</span>'},
       'images': {'p1': SRC + 'stockholm.jpg', 'p2': SRC + 'berlin.jpg', 'p3': SRC + 'amsterdam.jpg', 'p4': SRC + 'budapest.jpg', 'me': SH + 'cut-1613.png'},
       'vars': {}})

# 04 photo: Nigerians can apply, with the flag
D['03-nigerians-can-apply'] = dict(
    css='.hd4{position:absolute;right:46px;top:52px;font-size:150px;color:#fff;text-align:right;line-height:.86}'
        '.sub{position:absolute;right:50px;top:328px;font:800 58px/1.05 "IT";color:#fff;text-align:right;letter-spacing:-.01em}'
        '.flag{position:absolute;right:52px;top:480px;width:210px;height:140px;display:flex;box-shadow:0 14px 30px rgba(0,0,0,.35);rotate:3deg}'
        '.flag i{flex:1;background:#008751}.flag i:nth-child(2){background:#fff}',
    body='<img class="room z1" data-img="room" alt=""><div class="abs z2" style="inset:0;background:var(--dim)"></div>\n'
         '<img class="room z3" data-img="me" alt="">\n<div class="lg hd4 shd z4" data-k="head" data-move="head"></div>\n'
         '<div class="sub shd z4" data-k="sub" data-move="sub"></div>\n<div class="flag z4" data-move="flag"><i></i><i></i><i></i></div>',
    c={'direction': 'Her shoot photo (looking straight at the viewer, hands together) in her room, calmed a little; she on the left. Right: the plain claim in big white condensed caps, a small line saying what for, and the Nigerian flag (drawn, three bands). Fact: Nigeria is eligible for Erasmus Mundus, the Swedish Institute scholarship (34 countries), DAAD EPOS, the NL Scholarship and Stipendium Hungaricum (kit 7f). Follows: board d-kind "I\'D FAIL SLAVERY" (creator one side, claim the other).',
       'thumbnail_text': 'NIGERIANS CAN APPLY + for scholarships in Europe + flag',
       'titles': ['Fully Funded Scholarships in Europe for Africans (2027)', 'Erasmus Mundus, DAAD and More: Scholarships for 2027', 'Studying in Europe as a Nigerian: The Scholarships'],
       'kind': 'photo', 'class': 'no-lift',
       'text': {'head': 'Nigerians<br>can apply', 'sub': 'for scholarships<br>in Europe'},
       'images': {'room': SH + 'room-1609.jpg', 'me': SH + 'room-1609-cut.png'},
       'vars': {**room(1609, 400, 300, 0.92), '--dim': 'rgba(10,10,12,.42)'}})

# 05 flat: €0 tuition, electric blue with quiet lines
D['04-zero-tuition'] = dict(
    css='.hd5{position:absolute;left:56px;top:50px;font-size:214px;color:#fff;line-height:.84}'
        '.sub{position:absolute;left:62px;top:430px;font:800 70px/1.05 "IT";color:#FFD23F;letter-spacing:-.02em}'
        '.sm{position:absolute;left:64px;top:380px;font:700 44px/1.1 "IT";color:#fff;letter-spacing:-.015em}.bill{position:absolute;left:62px;top:440px;width:520px;background:#FBF9F4;border-radius:8px;padding:22px 28px;rotate:-2deg;box-shadow:0 22px 44px rgba(0,0,0,.35)}'
        '.bill .k{font:500 22px/1 "Mono";letter-spacing:.08em;color:#6A6760;text-transform:uppercase}'
        '.bill .r{display:flex;justify-content:space-between;align-items:baseline;margin-top:16px;font:600 34px/1 "IT";color:#16181B}'
        '.bill .r b{font:800 74px/1 "BarlowC";color:#1B3FD8}'
        '.cut{height:610px;right:10px}',
    body='<div class="abs pat z1" style="inset:0"></div>\n<div class="lg hd5 z3" data-k="head" data-move="head"></div>\n'
         '<div class="sub z3" data-k="sub" data-move="sub"></div>\n'
         ''
         '<img class="cut z2" data-img="me" alt="">',
    c={'direction': 'Flat electric blue (house accent) with fine same-hue diagonal lines. The hook in two parts: €0 TUITION huge in white, "+ money to live on" in yellow; and what it is in plain words. Her cut-out on the right, hand in her hair. True for the fully funded ones (Erasmus Mundus, Swedish Institute, DAAD EPOS). Follows: archisha "$0 TUITION?!" outlier (kit 7), HTTP 07 (topic + one literal object).',
       'thumbnail_text': '€0 TUITION IN EUROPE + money to live on',
       'titles': ['Scholarships for Nigerian Students in Europe 2027', 'Fully Funded Scholarships in Europe for Africans (2027)', 'Study in Europe for Free? Scholarships Open to Africans'],
       'kind': 'flat', 'class': 'no-lift',
       'text': {'head': '€0 tuition<br>in Europe', 'sub': '+ money to live on', 'sm': ''},
       'images': {'me': SH + 'cut-1619.png'},
       'vars': {'--ground': '#1B3FD8', '--pa': '.09'}})

# 06 other: the real Swedish Institute line, big, her beside it
D['02-sweden-pays-real-page'] = dict(
    css='.hd6{position:absolute;left:56px;top:46px;font-size:168px;color:#F3F0E8;line-height:.86}'
        '.hd6 .acc{color:#2FD27A}'
        '.clip{left:44px;top:420px;width:720px;rotate:-1deg;padding:16px 18px}'
        '.clip .cr{color:#9AA0A8;font-size:18px}'
        '.cut{height:640px;right:-50px}',
    body='<div class="abs z1" style="inset:0;background:#1B1D21"></div>\n<img class="cut z2" data-img="me" alt="">\n<div class="lg hd6 z3" data-k="head" data-move="head"></div>\n'
         '<div class="clip z3" data-move="clip"><img data-img="page" alt=""><div class="mark" data-move="mark" style="left:18px;top:14px;width:684px;height:96px"></div><div class="cr" data-k="cr"></div></div>',
    c={'direction': 'Graphite (the video\'s ground). The plain claim huge: Sweden pays for your master\'s (the Swedish Institute scholarship pays tuition + a monthly allowance; Nigeria is eligible). Under it ONE real line cropped from the Swedish Institute\'s own page (si.se, unaltered), shown big, the dates marked in green, a small source line. Her cut-out on the right, arms crossed. Follows: board d-kind (creator one side, claim the other) + a real receipt (ghana 10b clipping).',
       'thumbnail_text': 'SWEDEN PAYS FOR YOUR MASTER\'S + the real si.se line (8-24 February 2027)',
       'titles': ['Fully Funded Scholarships in Europe for Africans (2027)', 'Swedish Institute Scholarship 2027: Who Can Apply and When', 'Scholarships Nigerians Can Still Apply For in 2027'],
       'kind': 'other', 'class': 'no-lift',
       'text': {'head': '<span class="acc">Sweden</span> pays for<br>your master\'s', 'cr': 'si.se · Swedish Institute Scholarships for Global Professionals'},
       'images': {'page': SRC + 'si-feb-dates.png', 'me': SH + 'cut-1612.png'},
       'vars': {}})

# 07 photo + phone: five scholarships on a phone
D['05-five-scholarships-phone'] = dict(
    css='.hd7{position:absolute;left:40px;bottom:36px;font-size:112px;color:#fff;line-height:.88}'
        '.phone{position:absolute;left:820px;top:40px;width:330px;height:676px;rotate:4deg}'
        '.scr{background:#FBF9F4;padding:76px 20px 0}'
        '.scr .li{display:flex;align-items:center;gap:14px;padding:14px 0;border-top:1px solid #E2DED4;font:800 29px/1.08 "IT";color:#16181B;letter-spacing:-.025em}'
        '.scr .li:first-child{border-top:0}'
        '.scr .li i{width:30px;height:30px;border-radius:50%;background:#2FD27A;flex:none;position:relative}'
        '.scr .li i:after{content:"";position:absolute;left:10px;top:5px;width:7px;height:13px;border:solid #0E0F11;border-width:0 3px 3px 0;rotate:45deg}',
    body='<img class="room z1" data-img="room" alt=""><div class="abs z2" style="inset:0;background:var(--dim)"></div>\n'
         '<img class="room z3" data-img="me" alt="">\n<div class="lg hd7 shd z4" data-k="head" data-move="head"></div>\n'
         '<div class="phone z5" data-move="phone"><div class="scr">'
         '<div class="li"><i></i><span data-k="l1"></span></div><div class="li"><i></i><span data-k="l2"></span></div><div class="li"><i></i><span data-k="l3"></span></div>'
         '<div class="li"><i></i><span data-k="l4"></span></div><div class="li"><i></i><span data-k="l5"></span></div></div></div>',
    c={'direction': 'Her shoot photo on the left (head tilted, arms crossed), room calmed. A realistic phone (lib/phone.js) on the right: the five scholarships the video covers, ticked, big enough for a phone screen. Headline: the plain count. Follows: board c-kind (creator + the objects of the topic), "UI UX Complete Roadmap" (the list is the picture).',
       'thumbnail_text': '5 SCHOLARSHIPS IN EUROPE + the names on a phone',
       'titles': ['Fully Funded Scholarships in Europe for Africans (2027)', 'Scholarships for Nigerian Students in Europe 2027', 'Scholarships Nigerians Can Still Apply For in 2027'],
       'kind': 'photo', 'class': 'no-lift',
       'text': {'head': '5 scholarships<br>in Europe', 'l1': 'Erasmus Mundus', 'l2': 'DAAD EPOS', 'l3': 'Swedish Institute', 'l4': 'NL Scholarship', 'l5': 'Stipendium Hungaricum'},
       'images': {'room': SH + 'room-1610.jpg', 'me': SH + 'room-1610-cut.png'},
       'vars': {**room(1610, 380, 300, 0.95), '--dim': 'rgba(10,10,12,.38)'}})

# 08 flat split: full or partial
D['06-full-or-partial'] = dict(
    css='.half{position:absolute;top:0;bottom:0;width:640px}.L{left:0}.R{right:0}'
        '.hd8{position:absolute;left:0;right:0;top:34px;text-align:center;font-size:128px;color:#fff}'
        '.k{position:absolute;bottom:52px;font:800 76px/1 "BarlowC";text-transform:uppercase}'
        '.v{position:absolute;bottom:136px;font:800 60px/1.04 "IT";letter-spacing:-.02em}'
        '.cut{height:560px;left:50%;translate:-50% 0}',
    body='<div class="half L pat z1" data-move="left" style="--ground:#2FD27A;--pa:.07"></div><div class="half R z1" style="background:#1B1D21"></div>\n'
         '<div class="lg hd8 shd z4" data-k="head" data-move="head"></div>\n<img class="cut z3" data-img="me" alt="">\n'
         '<div class="v z4" data-k="lv" data-move="lv" style="left:44px;color:#0E0F11"></div><div class="k z4" data-k="lk" data-move="lk" style="left:44px;color:#0E0F11"></div>\n'
         '<div class="v z4" data-k="rv" data-move="rv" style="right:44px;text-align:right;color:#F3F0E8"></div><div class="k z4" data-k="rk" data-move="rk" style="right:44px;color:#9AA0A8"></div>',
    c={'direction': 'Split: left half signal green with quiet lines (fully funded), right half graphite (partial). The question across the top; her cut-out in the middle, arms crossed, eyes on the viewer. Under each side the real example: Erasmus Mundus pays tuition + €1,400 a month; the NL Scholarship is €5,000 for the first year (studyinnl.org). Follows: board f-kind split (the topic is a contrast), viral 3 (framework drawn).',
       'thumbnail_text': 'FULLY FUNDED OR PARTIAL? + one real example each side',
       'titles': ['What a Fully Funded Scholarship in Europe Really Pays', 'Scholarships for African Students in Europe: 2027 Deadlines', 'Fully Funded Scholarships in Europe for Africans (2027)'],
       'kind': 'flat', 'class': 'no-lift',
       'text': {'head': 'Fully funded or partial?', 'lv': 'tuition +<br>€1,400 a month', 'lk': 'Fully funded', 'rv': '€5,000<br>once', 'rk': 'Partial'},
       'images': {'me': SH + 'cut-1612.png'},
       'vars': {}})

# 09 photo: the topic name + the first deadline
D['09-masters-in-europe'] = dict(
    css='.hd9{position:absolute;left:48px;top:44px;font-size:190px;color:#fff;line-height:.84}'
        '.sub{position:absolute;left:54px;top:478px;font:800 68px/1 "IT";color:#fff;letter-spacing:-.03em}'
        '.sub u{text-decoration:none;box-shadow:inset 0 -14px 0 #2FD27A}'
        '.sm{position:absolute;left:56px;top:574px;font:800 58px/1 "IT";color:#fff;letter-spacing:-.015em}',
    body='<img class="room z1" data-img="room" alt=""><div class="abs z2" style="inset:0;background:var(--dim)"></div>\n'
         '<img class="room z3" data-img="me" alt="">\n<div class="lg hd9 shd z4" data-k="head" data-move="head"></div>\n'
         '<div class="sub shd z4" data-k="sub" data-move="sub"></div>\n<div class="sm shd z4" data-k="sm" data-move="sm"></div>',
    c={'direction': 'Her shoot photo on the right (hands together, looking at the viewer), room calmed. The topic name huge in white on the left, the condition under it with a green underline, and the first real deadline in a small line (University Admissions Sweden, 15 January 2027). Follows: Cal Newport "Reading as an Act of Resistance" (claim + one underlined word), HTTP 03, "PhD Vlog".',
       'thumbnail_text': 'MASTER\'S IN EUROPE + on a scholarship + first deadline 15 January',
       'titles': ['Studying in Europe as a Nigerian: The Scholarships', 'How to Get a Scholarship to Study in Europe in 2027', 'Fully Funded Scholarships in Europe for Africans (2027)'],
       'kind': 'photo', 'class': 'no-lift',
       'text': {'head': 'Master\'s<br>in Europe', 'sub': 'on a <u>scholarship</u>', 'sm': 'first deadline: 15 Jan'},
       'images': {'room': SH + 'room-1608.jpg', 'me': SH + 'room-1608-cut.png'},
       'vars': {**room(1608, 960, 300, 0.98), '--dim': 'rgba(10,10,12,.40)'}})

# 11 other: the documents, a plain passport, her beside them
D['10-scholarship-documents'] = dict(
    css='.hd11{position:absolute;left:56px;top:46px;font-size:150px;color:#16181B;line-height:.86}'
        '.sub{position:absolute;left:60px;top:330px;font:800 60px/1.05 "IT";color:#16181B;letter-spacing:-.025em}'
        '.sub u{text-decoration:none;box-shadow:inset 0 -12px 0 #2FD27A}'
        '.letter{position:absolute;left:150px;top:440px;width:420px;height:420px;background:#FBF9F4;border-radius:6px;box-shadow:0 22px 44px rgba(0,0,0,.22);rotate:-4deg;padding:32px 34px}'
        '.letter .tt{font:800 36px/1.1 "IT";color:#16181B;letter-spacing:-.02em}'
        '.letter .ln{height:12px;border-radius:6px;background:#E3DFD5;margin-top:20px}'
        '.pp{position:absolute;left:520px;top:400px;width:210px;height:290px;background:#1F4D3A;border-radius:12px;box-shadow:0 22px 44px rgba(0,0,0,.3);rotate:7deg;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:26px}'
        '.pp b{font:500 22px/1 "Mono";letter-spacing:.24em;color:#E9D9A6}.pp i{width:78px;height:78px;border:3px solid #E9D9A6;border-radius:50%}'
        '.cut{height:660px;right:-40px}',
    body='<div class="abs pat-h z1" style="inset:0;--ground:#EDE9E2;--pa:.05"></div>\n<img class="cut z2" data-img="me" alt="">\n<div class="lg hd11 z3" data-k="head" data-move="head"></div>\n'
         '<div class="sub z3" data-k="sub" data-move="sub"></div>\n'
         '<div class="letter z3" data-move="letter"><div class="tt" data-k="lt"></div><div class="ln" style="margin-top:28px"></div><div class="ln"></div><div class="ln" style="width:80%"></div><div class="ln"></div><div class="ln" style="width:64%"></div></div>\n'
         '<div class="pp z4" data-move="passport"><i></i><b data-k="pp"></b></div>',
    c={'direction': 'Warm paper with a quiet halftone. Her cut-out on the right (hand on her cheek, thinking). Left: what this is + when to start, one word underlined in green; at the foot a plain motivation letter (lines only) and a plain green passport (drawn, no country crest). Follows: Pinterest "writing a book" desk scene, board c-kind (creator + the objects), her decks\' paper ground.',
       'thumbnail_text': 'SCHOLARSHIP DOCUMENTS + start a year early',
       'titles': ['What I\'d Tell a Friend Applying for Scholarships in Europe', 'How to Get a Scholarship to Study in Europe in 2027', 'Fully Funded Scholarships in Europe for Africans (2027)'],
       'kind': 'other', 'class': 'no-lift',
       'text': {'head': 'Scholarship<br>documents', 'sub': 'start a <u>year</u> early', 'lt': 'Motivation letter', 'pp': 'PASSPORT'},
       'images': {'me': SH + 'cut-1613.png'},
       'vars': {}})

only = sys.argv[1:]
for d, v in D.items():
    if only and not any(d.startswith(o) for o in only): continue
    p = os.path.join(ROOT, 'directions', d); os.makedirs(p, exist_ok=True)
    c = v['c']; c.setdefault('title', c['titles'][0])
    open(os.path.join(p, 'index.html'), 'w').write(HEAD.format(css=v['css'], body=v['body']))
    json.dump(c, open(os.path.join(p, 'content.json'), 'w'), indent=1, ensure_ascii=False)
    print('wrote', d)
