#!/usr/bin/env python3
"""Set 2 (2026-11-10, ROLLOUT-BRIEF): writes directions/NN-*/{index.html,content.json}. Run ONCE; after she edits in the studio
the content.json files are hers (do not re-run over her edits). Pairs (picture + words + titles) were written first, see README.md.
Photos: her shoot, outfit C (cream knit), IMG 1595 / 1599 / 1600 / 1601 (HTTP used the others), Enhance photo + cut-out."""
import json, os
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
D = os.path.join(ROOT, 'directions')
A = '../../assets'
SH = A + '/photo/shoot'
HEAD = '<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../../lib/rp.css"><style>{css}</style></head><body><div class="t {cls}">\n'
TAIL = '\n</div><script src="../../lib/bind.js"></script></body></html>'

def paper(lines, x, y, w, h, rot=0, title='', cls='', key='', move='paper', z='z3', extra=''):
    """a printed paper: lines = string of codes: h (highlighted), n (normal), m (medium), s (short), g (gap), H (hl medium)"""
    m = {'h': '<div class="ln hl"></div>', 'H': '<div class="ln hl m"></div>', 'n': '<div class="ln"></div>', 'm': '<div class="ln m"></div>',
         's': '<div class="ln s"></div>', 'g': '<div style="height:12px"></div>'}
    t = f'<div class="ttl" style="font-size:30px" data-k="{key}"></div><div style="height:12px"></div>' if key else ''
    return (f'<div class="paper {cls} {z}" data-move="{move}" style="left:{x}px;top:{y}px;width:{w}px;height:{h}px;transform:rotate({rot}deg);{extra}">'
            + t + ''.join(m[c] for c in lines) + '</div>')

SETS = []
def add(name, kind, css, body, text, titles, direction, images=None, vars_=None, cls='', recommended=False, refs=''):
    SETS.append(dict(name=name, kind=kind, css=css, body=body, text=text, titles=titles, direction=direction, images=images or {},
                     vars=vars_ or {}, cls=cls, recommended=recommended, refs=refs))

# 01 PHOTO (kind d: creator large on one side + the topic huge on the other) -------------------------------------------------
add('01-how-to-read-research-papers', 'photo',
    '.hd{left:58px;top:70px;font-size:118px;line-height:.92;white-space:normal;width:640px}',
    '<img class="room grey z1" data-img="room" alt=""><div class="washc z2"></div>'
    '<img class="room z3" data-img="me" alt="">'
    '<div class="hd z4 soft-t" data-k="hd"></div>'
    + paper('hHnnmgnhHns', 92, 470, 300, 330, -5, cls='fade', move='paper', z='z5'),
    {'hd': 'How to read <em class="acc">research papers</em>'},
    ['The 3-Pass Method for Reading Research Papers', 'Read Research Papers Faster (Without Missing the Point)',
     "How I Read Research Papers as a Master's Student"],
    'Her shoot photo (cream knit, head tilted, a small smile; IMG 1601, Enhance photo) large on the right, her room washed graphite '
    'so it goes calm and she stays in full colour. Left: the topic name huge in DM Serif Display, "research papers" in highlighter '
    'yellow italic. One printed paper with highlighted lines at the foot (the literal object). Follows: "Reading as an Act of '
    'Resistance" (creator large + claim), her ux-research thumbnail (room in one colour, she in colour).',
    {'room': SH + '/room-1601.jpg', 'me': SH + '/room-1601-cut.png'},
    {'--rw': '1900px', '--rx': '-20px', '--ry': '-500px', '--wash': '#3A3D44', '--bgb': '1.15', '--accent': '#F3EE2E'},
    'no-lift', True)

# 02 PHOTO (the problem): hand on her head, a pile of papers --------------------------------------------------------------
add('02-too-many-papers', 'photo',
    '.hd{left:56px;top:56px;font-size:112px;line-height:.92;white-space:normal;width:600px}',
    '<img class="room grey z1" data-img="room" alt=""><div class="washc z2"></div>'
    '<img class="room z3" data-img="me" alt="">'
    '<div class="hd z5 soft-t" data-k="hd"></div>'
    + paper('nnnnmgnnns', 40, 470, 280, 300, -9, move='p1', z='z4')
    + paper('nnnnmgnnns', 210, 450, 280, 320, 4, move='p2', z='z4')
    + paper('hHnnmgnnns', 380, 490, 280, 300, -2, move='p3', z='z4'),
    {'hd': 'Too many papers <em class="acc">to read?</em>'},
    ['How to Read a Research Paper (The 3-Pass Method)', 'How to Read Research Papers Fast for Your Thesis',
     'Read a Research Paper in 10 Minutes, Then Decide'],
    'The problem a stranger knows: her shoot photo with her hand on her head (IMG 1595), room washed graphite, she in colour on the '
    'right; on the left the question in big serif and a messy pile of three printed papers at the foot. The title gives the fix. '
    'Follows: "I can\'t cope if I\'m not reading" (a feeling + the object), "JUST WAIT" (a claim + a real scene).',
    {'room': SH + '/room-1595.jpg', 'me': SH + '/room-1595-cut.png'},
    {'--rw': '1900px', '--rx': '60px', '--ry': '-520px', '--wash': '#3A3D44', '--bgb': '1.15', '--accent': '#F3EE2E'},
    'no-lift')

# 03 FLAT bold yellow + quiet lines: what to read first (kept idea of old 11, no face) -------------------------------------
add('03-what-to-read-first', 'flat',
    '.t{--fg:#17171A}.hd{left:70px;top:170px;font-size:132px;white-space:normal;width:620px;color:#17171A}.hd em{color:var(--pen)}'
    '.paper .h{margin-top:26px;font-size:28px}.row1{display:flex;justify-content:space-between;align-items:flex-end}'
    '.row1 .num{position:relative;width:70px;height:70px;font-size:50px;flex:none;background:var(--pen);color:#FBFAF4}',
    '<div class="abs z1 pat" style="inset:0"></div><div class="hd z4" data-k="hd"></div>'
    '<div class="paper fade z3" data-move="paper" style="left:700px;top:40px;width:470px;height:640px;transform:rotate(3deg)">'
    '<div class="row1"><div class="ttl" style="font-size:40px"><span class="mk" data-k="pt"></span></div><div class="num" data-k="n1"></div></div>'
    '<div class="h"><span class="mk" data-k="ha"></span></div><div class="ln hl"></div><div class="ln hl m"></div>'
    '<div class="row1"><div class="h"><span class="mk" data-k="hh"></span></div><div class="num" data-k="n2"></div></div>'
    '<div class="ln"></div><div class="ln"></div><div class="ln"></div><div class="ln s"></div><div style="height:6px"></div><div class="ln"></div><div class="ln"></div><div class="ln s"></div>'
    '<div class="row1"><div class="h"><span class="mk" data-k="hc"></span></div><div class="num" data-k="n3"></div></div><div class="ln hl m"></div>'
    '<div class="row1"><div class="h"><span class="mk" data-k="hr"></span></div><div class="num" data-k="n4"></div></div><div class="ln"></div><div class="ln s"></div></div>',
    {'hd': 'What to <em>read first</em>', 'pt': 'Research paper', 'ha': 'Abstract', 'hh': 'Headings', 'hc': 'Conclusion',
     'hr': 'References', 'n1': '1', 'n2': '2', 'n3': '3', 'n4': '4'},
    ["You're Reading Research Papers in the Wrong Order", 'Stop Reading Research Papers From Start to Finish',
     'How to Read a Research Paper (The 3-Pass Method)'],
    'Bold highlighter-yellow ground with fine same-hue diagonal lines (design board "Bold colour + quiet pattern"). Ink headline, '
    '"read first" in blue-pen italic. One printed paper with the reading order numbered in blue pen 1-4 (its real section names: '
    'they ARE the picture, not labels). No face. Follows: "UI UX Complete Roadmap" (the thing drawn), her database-indexes thumbnail.',
    vars_={'--ground': '#F3EE2E', '--pa': '.06'})

# 04 OTHER before / after: stop reading every line ---------------------------------------------------------------------------
add('04-stop-reading-every-line', 'other',
    '.hd{left:0;width:1280px;text-align:center;top:40px;font-size:100px}',
    '<div class="hd z4" data-k="hd"></div>'
    '<div class="abs z2" style="left:638px;top:190px;width:4px;height:480px;background:#4A4D55"></div>'
    + paper('hhhhHghhhhHghhhs', 130, 190, 380, 450, -3, move='before')
    + '<svg class="pen z5" style="left:150px;top:230px" width="350" height="400"><path d="M20,20 L330,380 M330,20 L20,380" style="stroke-width:16;stroke:#FBFAF4"/></svg>'
    + paper('hHnnsgsnnnsghsns', 770, 190, 380, 450, 2, cls='fade', move='after'),
    {'hd': 'Stop reading <em class="acc">every line</em>'},
    ['Stop Reading Research Papers From Start to Finish', 'Read a Research Paper in 10 Minutes, Then Decide',
     'How to Read Research Papers Effectively for Beginners'],
    'Before / after on graphite, no face: left, a paper with EVERY line highlighted, crossed out; right, the same paper with only '
    'the few parts that matter highlighted. No labels: the two papers say it. Follows: the saved before/after and Day 1 / Day 900 splits.',
    vars_={'--ground': '#2F3136', '--accent': '#F3EE2E'})

# 05 PHOTO: is this study any good? (arms crossed, one printed paper with a circled number) ---------------------------------
add('05-is-this-study-any-good', 'photo',
    '.hd{left:60px;top:60px;font-size:112px;line-height:.92;white-space:normal;width:620px}',
    '<img class="room soft z1" data-img="room" alt=""><div class="abs z2" style="inset:0;background:rgba(17,17,20,.38)"></div>'
    '<img class="room z3" data-img="me" alt="">'
    '<div class="hd z5 soft-t" data-k="hd"></div>'
    '<div class="paper z4" data-move="paper" style="left:90px;top:400px;width:420px;height:380px;transform:rotate(-4deg)">'
    '<div class="ttl" style="font-size:30px" data-k="pt"></div><div style="height:12px"></div><div class="ln"></div><div class="ln"></div>'
    '<div class="ln m"></div><div style="height:6px"></div><div style="font-family:\'News\';font-size:44px;display:inline-block;position:relative" data-k="n"></div>'
    '<div class="ln"></div><div class="ln s"></div></div>'
    '<svg class="pen z5" style="left:150px;top:470px" width="260" height="140"><ellipse cx="110" cy="74" rx="96" ry="44" style="stroke-width:7" transform="rotate(-6 110 74)"/></svg>',
    {'hd': 'Is this study <em class="acc">any good?</em>', 'pt': 'Results', 'n': 'n = 12'},
    ['How to Tell if a Research Paper Is Any Good', 'How to Read a Research Paper Critically (3 Checks)',
     'Can You Trust This Study? How to Read Research Critically'],
    'Her shoot photo, arms crossed, calm and doubtful (IMG 1600), room in natural colour darkened. Left: the question big, and one '
    'printed "Results" page with "n = 12" circled in blue pen (a reader checking the sample size: a picture of checking, not a label). '
    'Follows: Pinterest annotation thumbnails (hand circles on a photo), "BECOME DANGEROUSLY ARTICULATE" (creator + claim).',
    {'room': SH + '/room-1600.jpg', 'me': SH + '/room-1600-cut.png'},
    {'--rw': '1900px', '--rx': '10px', '--ry': '-520px', '--bgb': '.8', '--accent': '#F3EE2E'}, 'no-lift')

# 06 COLLAGE (kind c): her cut-out in the middle of real reading objects --------------------------------------------------
add('06-read-papers-like-a-researcher', 'collage',
    '.t{--fg:#17171A}.hd{left:0;width:1280px;text-align:center;top:30px;font-size:96px;color:#17171A}.hd em{color:var(--pen)}'
    '.me{position:absolute;left:50%;bottom:0;height:560px;translate:-50% 0}',
    '<div class="abs z1" style="inset:0;background:#EDE9E2"></div>'
    '<div class="hd z5" data-k="hd"></div>'
    '<img class="stk z2" data-img="book" data-move="book" style="left:30px;top:250px;width:390px;transform:rotate(-8deg)" alt="">'
    '<img class="stk z2" data-img="hl" data-move="highlighters" style="left:910px;top:300px;width:330px;transform:rotate(14deg)" alt="">'
    '<img class="stk z4" data-img="coffee" data-move="coffee" style="left:1040px;top:560px;width:200px" alt="">'
    '<img class="stk z4" data-img="glasses" data-move="glasses" style="left:70px;top:560px;width:300px;transform:rotate(-10deg)" alt="">'
    + paper('hHnnsgnhns', 860, 170, 220, 260, 8, move='paper', z='z2')
    + '<img class="me z3" data-img="me" data-move="her" alt="">',
    {'hd': 'read papers like <em>a researcher</em>'},
    ['How to Read a Research Paper (The 3-Pass Method)', 'How Researchers Read Papers (and You Can Too)',
     "How I Read Research Papers as a Master's Student"],
    'Creator in the middle surrounded by the real objects of the topic (THUMBNAIL-STUDY §3c): her cut-out (IMG 1599, calm, colour) on '
    'warm paper, around her an open book with glasses, highlighters, a coffee, a printed paper with highlights (Pexels die-cuts). One '
    'serif line on top. Follows: "I DID 1 YEAR OF PERSONAL CURRICULUMS" (objects ARE the topic), "my potential" collage.',
    {'me': SH + '/1599-person.png', 'book': A + '/collage/px_5489753-cut.png', 'hl': A + '/collage/px_6192502-cut.png',
     'coffee': A + '/collage/px_13576191-cut.png', 'glasses': A + '/collage/px_25389282-cut.png'},
    {'--ground': '#EDE9E2'}, 'no-lift')

# 07 COLLAGE (kind b): three photo panels + one centred line ------------------------------------------------------------
add('07-reading-research-papers-panels', 'collage',
    '.pn{position:absolute;top:0;height:720px;overflow:hidden}.pn img{position:absolute;display:block;max-width:none}'
    '.ln1{position:absolute;left:0;width:1280px;text-align:center;top:270px;font-family:"News";font-size:104px;line-height:.95;color:#FBFAF4;text-shadow:0 6px 30px rgba(0,0,0,.6)}'
    '.ln2{position:absolute;left:0;width:1280px;text-align:center;top:500px;font-family:"News";font-style:italic;font-size:48px;color:#FBFAF4;text-shadow:0 4px 20px rgba(0,0,0,.6)}',
    '<div class="pn z1" style="left:0;width:426px"><img data-img="p1" style="left:-360px;top:-40px;height:780px" alt=""></div>'
    '<div class="pn z1" style="left:427px;width:426px"><img data-img="p2" style="left:-500px;top:-120px;height:900px" alt=""></div>'
    '<div class="pn z1" style="left:854px;width:426px"><img data-img="p3" style="left:-170px;top:0;height:720px" alt=""></div>'
    '<div class="abs z2" style="inset:0;background:rgba(17,17,20,.30)"></div>'
    '<div class="ln1 z3" data-k="l1"></div><div class="ln2 z3" data-k="l2"></div>',
    {'l1': 'reading research papers', 'l2': '(the 3-pass method)'},
    ["How I Read Research Papers as a Master's Student", 'The 3-Pass Method for Reading Research Papers',
     'How to Read a Research Paper (The 3-Pass Method)'],
    'Three real photo panels side by side: her (IMG 1601, in her room with the bookshelf), a hand highlighting a printed paper, a '
    'printer printing pages (Pexels, credited in film/assets/CREDITS.md); one centred white serif line + a small bracket line. '
    'Follows: "Living in Finland diaries", "the art of offline living", "PhD Vlog (Mathematics & Astrophysics)".',
    {'p1': SH + '/room-1601.jpg', 'p2': A + '/pexels/8553916.jpg', 'p3': A + '/pexels/7014408.jpg'}, {}, 'no-lift')

# 08 FLAT bold blue + quiet lines: read papers in 3 passes, her cut-out ------------------------------------------------
add('08-read-papers-in-3-passes', 'flat',
    '.hd{left:56px;top:46px;font-size:110px;white-space:normal;width:820px;line-height:.92}'
    '.cut{right:-40px;height:600px}',
    '<div class="abs z1 pat" style="inset:0"></div><div class="hd z4" data-k="hd"></div>'
    '<div data-move="papers" class="abs z3" style="left:50px;top:330px;width:700px;height:380px">'
    + paper('hnnnmgnnnns', 0, 30, 200, 270, -4, move='pa', z='z3')
    + paper('hHnhmgnhnns', 225, 10, 200, 270, 0, move='pb', z='z3')
    + paper('hHhhHghhhhs', 450, 30, 200, 270, 4, move='pc', z='z3')
    + '<div class="tab on" data-k="t1" style="left:64px;top:-40px;width:72px;height:72px;font-size:48px;border-radius:12px 12px 0 0"></div>'
    '<div class="tab on" data-k="t2" style="left:289px;top:-60px;width:72px;height:72px;font-size:48px;border-radius:12px 12px 0 0"></div>'
    '<div class="tab on" data-k="t3" style="left:514px;top:-40px;width:72px;height:72px;font-size:48px;border-radius:12px 12px 0 0"></div></div>'
    '<img class="cut z3" data-img="me" data-move="her" alt="">',
    {'hd': 'Read papers in <em class="acc">3 passes</em>', 't1': '1', 't2': '2', 't3': '3'},
    ['The 3-Pass Method for Reading Research Papers', 'How to Read a Research Paper in 3 Passes',
     'How to Read a Research Paper (The 3-Pass Method)'],
    'Bold blue-pen ground with fine same-hue lines. Three copies of the same paper, each more highlighted than the last, tabs 1-2-3 '
    'on top (no time labels). Her cut-out (IMG 1600, arms crossed) on the right. Follows: "ALGORITHMS MADE EASY" (topic + the thing '
    'drawn), her database-indexes thumbnail (flat ground, one drawn idea).',
    {'me': SH + '/1600-person.png'}, {'--ground': '#2447C9', '--pa': '.10', '--fg': '#FBFAF4', '--accent': '#F3EE2E'}, 'no-lift')

# 09 OTHER: the thumbnail is a research paper with her as Figure 1 (kept idea of old 18, shoot photo) ---------------------
add('09-paper-with-her-as-figure-1', 'other',
    '.paper .ln{height:11px;margin-bottom:12px}',
    '<div class="paper z3" data-move="page" style="left:130px;top:30px;width:1020px;height:760px;padding:40px 60px;transform:rotate(-1.5deg)">'
    '<div class="ttl" data-k="pt" style="font-size:80px;text-align:center;line-height:.95"></div>'
    '<div data-k="au" style="text-align:center;font-family:\'News\';font-size:28px;margin-top:14px;font-style:italic"></div>'
    '<div style="display:flex;gap:40px;margin-top:26px"><div style="flex:1"><div class="h" data-k="ab" style="margin-top:4px"></div>'
    '<div class="ln hl"></div><div class="ln hl m"></div><div class="ln"></div><div class="ln"></div><div class="ln"></div><div class="ln"></div>'
    '<div class="ln s"></div><div style="height:10px"></div><div class="ln"></div><div class="ln"></div><div class="ln"></div><div class="ln s"></div></div>'
    '<div style="width:560px"><div style="width:560px;height:360px;overflow:hidden;position:relative">'
    '<img data-img="fig" style="position:absolute;left:-290px;top:-150px;width:1100px;max-width:none"></div>'
    '<div data-k="fig" style="font-family:\'News\';font-size:40px;margin-top:10px;line-height:1.2"></div></div></div></div>',
    {'pt': 'How to Read a<br>Research Paper', 'au': 'Gbemisola Oladetoun · @WithGbemi', 'ab': 'Abstract', 'fig': '<b>Figure 1.</b>'},
    ['How to Read a Research Paper (The 3-Pass Method)', "How to Read Research Papers as a Master's Student",
     'How to Read Research Papers Effectively for Beginners'],
    'The thumbnail IS a research paper on graphite: the topic as the paper\'s title, her name as the author, a highlighted abstract, '
    'and her shoot photo (IMG 1599) as Figure 1. Literal and playful, the topic reads first. Kept from set 1 (critic 7.5 / 8), now on her shoot photo.',
    {'fig': SH + '/room-1599.jpg'}, {'--ground': '#2F3136'}, 'no-lift')

# 10 FLAT: don't read papers like a novel (kept idea of old 14) ---------------------------------------------------------
add('10-not-like-a-novel', 'flat',
    '.hd{left:0;width:1280px;text-align:center;top:40px;font-size:94px}.paper{overflow:visible}',
    '<div class="hd z4" data-k="hd"></div>'
    '<div class="abs z3" data-move="novel" style="left:60px;top:220px;width:520px;height:400px">'
    '<img data-img="novel" style="position:absolute;left:0;top:0;width:520px;filter:drop-shadow(0 20px 30px rgba(0,0,0,.4))">'
    '<svg class="pen" style="left:30px;top:10px" width="470" height="370"><path d="M30,40 L440,330 M440,40 L30,330" style="stroke-width:28;stroke:#FBFAF4"/></svg></div>'
    + paper('hHnnsgnnnsgnns', 780, 200, 330, 420, 3, key='pt', move='paper')[:-6]
    + '<div class="tab on" style="left:330px;top:30px" data-k="t1"></div><div class="tab" style="left:330px;top:126px" data-k="t2"></div>'
    '<div class="tab" style="left:330px;top:222px" data-k="t3"></div></div>',
    {'hd': 'Don\'t read papers <em class="acc">like a novel</em>', 'pt': 'Research paper', 't1': '1', 't2': '2', 't3': '3'},
    ['Stop Reading Research Papers From Start to Finish', "You're Reading Research Papers in the Wrong Order",
     'How to Read a Research Paper (The 3-Pass Method)'],
    'Flat graphite, no face: a real open book crossed out in paper-white pen, beside it a research paper with tabs 1, 2, 3 (read in '
    'passes). The headline says the one idea. Kept from set 1 (critic 7 / 8). Follows: saved before/after splits.',
    {'novel': A + '/collage/px_5489753-cut.png'}, {'--ground': '#2F3136', '--accent': '#F3EE2E'})

# 11 PHOTO: read any paper in 10 minutes ------------------------------------------------------------------------------
add('11-read-any-paper-in-10-minutes', 'photo',
    '.hd{left:640px;top:70px;font-size:120px;line-height:.9;white-space:normal;width:600px}',
    '<img class="room grey z1" data-img="room" alt=""><div class="washc z2"></div>'
    '<img class="room z3" data-img="me" alt="">'
    '<div class="hd z5 soft-t" data-k="hd"></div>'
    + paper('hHnnsgnnnsghns', 870, 420, 280, 320, 5, cls='fade', move='paper', z='z4'),
    {'hd': 'Read any paper in <em class="acc">10 minutes</em>'},
    ['How to Read a Research Paper in 10 Minutes', 'Read a Research Paper in 10 Minutes, Then Decide',
     'How to Skim a Research Paper (The First Pass)'],
    'Her shoot photo, calm, looking at the lens (IMG 1599), on the LEFT this time, room washed in deep blue-pen ink so it calms; right: '
    'the promise big in serif with "10 minutes" in highlighter yellow, a printed paper with only the key parts highlighted under it. '
    'Follows: "48 HOURS" (a time in the words), her ux-research thumbnail (room in one colour).',
    {'room': SH + '/room-1599.jpg', 'me': SH + '/room-1599-cut.png'},
    {'--rw': '1900px', '--rx': '-640px', '--ry': '-520px', '--wash': '#2B3A78', '--bgb': '1.2', '--accent': '#F3EE2E'}, 'no-lift')

os.makedirs(D, exist_ok=True)
for s in SETS:
    d = os.path.join(D, s['name']); os.makedirs(d, exist_ok=True)
    open(os.path.join(d, 'index.html'), 'w').write(HEAD.format(css=s['css'], cls='') + s['body'] + TAIL)
    import re; tt = s['text'].get('hd') or (s['text'].get('l1', '') + ' ' + s['text'].get('l2', '')).strip() or s['text'].get('pt'); c = {'direction': s['direction'], 'thumbnail_text': re.sub(r'<[^>]+>', ' ', tt).replace('  ', ' ').strip(),
         'titles': s['titles'], 'title': s['titles'][0], 'kind': s['kind'], 'text': s['text'], 'images': s['images'], 'vars': s['vars']}
    if s['cls']: c['class'] = s['cls']
    if s['recommended']: c['recommended'] = True
    json.dump(c, open(os.path.join(d, 'content.json'), 'w'), indent=1, ensure_ascii=False)
json.dump(sorted(s['name'] for s in SETS), open(os.path.join(D, 'index.json'), 'w'))
print(len(SETS), 'directions')
