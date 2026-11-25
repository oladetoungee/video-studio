#!/usr/bin/env python3
"""Writes every thumbnail direction (design/thumbnails/directions/<NN-name>/{index.html,content.json}) in look A "Price Check".
content.json is only written when missing (her studio edits live there); --force rewrites it (never after she has edited).
Render after: node render.mjs (all + overview) or node render.mjs 07.
Numbers are the checked ones from kit/refined-kit.md (sections 0, 6, 7f)."""
import json, os, sys

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.dirname(HERE)
FORCE = '--force' in sys.argv
F = '../../assets/frames/f_{}.jpg'
P = '../../assets/scene/p_{}.png'
C = '../../assets/photos/headshot-cut.png'   # 2026-11-07: her new studio photo (was a video-frame cut-out)

TITLES = {
    1: "Cheapest Countries to Study in Europe for Nigerians (2027)",
    2: "Cheapest Country to Study in Europe? 9 Countries Compared",
    3: "Cheapest Countries in Europe: Tuition + Proof of Funds",
    4: "Proof of Funds for Studying in Europe, Country by Country",
    5: "Tuition Free Universities in Europe Need Proof of Funds",
    6: "Study in Europe for Free? What Nigerians Really Pay",
    7: "Germany Is Free to Study In. The Visa Isn't",
    8: "What Studying in Europe Really Costs a Nigerian in 2027",
    9: "9 European Countries Compared for Nigerian Students",
    10: "Studying in Europe as a Nigerian: The Real Cost",
    11: "Under 24? This Country Is Cheaper to Study In",
}

D = []  # (name, meta, html, text, images, vars)
RETIRED = {'04-under-24-austria', '09-what-i-pay-in-estonia', '13-real-page-austria-age'}   # 2026-11-07: retired after the critic (in the Bin)

HER = {16: 'seated', 751: 'headshot', 170: 'headshot', 289: 'seated', 485: 'seated', 660: 'headshot', 723: 'seated'}
def scene(t, wash, s=1.0, tx=0, ty=0, natural=False, behind=''):
    """2026-11-07 (her rule: thumbnails use her new photos, library/her-photos/, no mic): her studio photo. natural = the whole photo
    (her grey backdrop) as the background; else her cut-out (studio Remove background) on the direction's flat colour field
    (--wash), bottom-anchored, moved by tx and scaled by s. The old video-frame look is gone (no washed room)."""
    who = HER.get(t, 'headshot')
    if natural:
        pos = '50% 34%' if who == 'headshot' else '58% 26%'
        return f'<div class="z1" data-move="photo" style="left:0;top:0;width:1280px;height:720px"><img class="nat" data-img="photo" src="../../assets/photos/{who}.jpg" style="object-position:{pos}"></div>'.replace(f'{who}.jpg', 'headshot.png' if who == 'headshot' else 'seated.jpg')
    h = min(600, round(560 * s)); x = 640 + tx
    return (f'<div class="z1" style="left:0;top:0;width:1280px;height:720px;background:var(--wash)"></div>{behind}'
            f'<img class="z1" data-move="photo" data-img="person" src="../../assets/photos/{who}-cut.png" style="position:absolute;height:{h}px;left:{x}px;bottom:0;transform:translateX(-50%)">')

def flag(code, w, h=None, extra=''):
    h = h or round(w * 2 / 3)
    return f'<span class="flag" data-flag="{code}" style="width:{w}px;height:{h}px;{extra}"></span>'

def label(key, x, y, w, country, code, kind, price, sup='', red=False, rot=0, ps=150, strip=58, ks=34, bar=True, z=4, extra=''):
    """a shelf-edge price label; text keys <key>_c (country), <key>_k (kind), <key>_p (price)"""
    sp = f'<sup>{sup}</sup>' if sup else ''
    return (f'<div class="label{" redl" if red else ""} z{z}" data-move="{key}" style="left:{x}px;top:{y}px;width:{w}px;rotate:{rot}deg;{extra}">'
            f'<div class="strip" style="height:{strip}px;font-size:{round(strip*.56)}px"><span data-k="{key}_c">{country}</span>{flag(code, round(strip*1.05)) if code else ""}</div>'
            f'<div class="kind" style="font-size:{ks}px" data-k="{key}_k">{kind}</div>'
            f'<div class="price" style="font-size:{ps}px"><span data-k="{key}_p">{price}</span>{sp}</div>'
            + (f'<svg class="barcode" data-seed="{len(key)}" style="position:absolute;right:20px;bottom:22px;width:{round(w*.24)}px;height:{round(ps*.4)}px;color:{"#fff" if red else "#121212"}"></svg>' if bar else '')
            + '</div>'), {f'{key}_c': country, f'{key}_k': kind, f'{key}_p': price}

def sticker(key, x, y, w, txt, size=40, rot=-2, yellow=False, z=5):
    return f'<div class="sticker{" y" if yellow else ""} z{z}" data-k="{key}" style="left:{x}px;top:{y}px;width:{w}px;font-size:{size}px;rotate:{rot}deg">{txt}</div>', {key: txt}

def big(key, x, y, size, txt, color='var(--lab)', z=5, extra='', cls='big'):
    return f'<div class="{cls} z{z}" data-k="{key}" style="left:{x}px;top:{y}px;font-size:{size}px;color:{color};{extra}">{txt}</div>', {key: txt}

def add(name, kind, words, titles, direction, parts, vars=None, rec=False, images=None):
    if name in RETIRED: return
    html, text = [], {}
    for p in parts:
        if isinstance(p, tuple): html.append(p[0]); text.update(p[1])
        else: html.append(p)
    D.append(dict(name=name, kind=kind, words=words, titles=[TITLES[i] for i in titles], direction=direction,
                  html='\n'.join(html), text=text, vars=vars or {}, rec=rec, images=images or {}))

# ---------------------------------------------------------------- photo-led (her room washed in one colour, she in full colour)
add('01-cheapest-countries-in-europe', 'photo background', 'CHEAPEST COUNTRIES IN EUROPE', [2, 3],
    'Photo-led, like her UX RESEARCH thumbnail: her room washed in shelf charcoal, she in full colour, the topic huge across the top in label yellow. '
    'She holds the film\'s Germany shelf label on her open palm: TUITION €0*, and the red sticker says what the asterisk hides.',
    [scene(16, '', s=1.0, tx=330, ty=40),
     big('hd', 40, 22, 116, 'Cheapest countries<br>to study in Europe', extra=''),
     label('de', 30, 340, 450, 'Germany', 'de', 'Tuition', '€0', '*', rot=0, ps=180, strip=60, ks=34, bar=False),
     sticker('st', 40, 620, 800, '*but €11,904 to show', size=54, rot=0)],
    {'--wash': '#EDE9E2', '--ground': '#0f1f1a', '--bg-b': '2'}, rec=True)

add('02-the-real-cost', 'photo background', 'THE REAL COST', [1, 8],
    'Photo-led: she holds out both hands like a set of scales. Left hand: the yellow TUITION €0 label. Right hand: the red PROOF OF FUNDS €11,904 label. '
    'The whole video (cheap tuition, expensive visa money) in one gesture. Room washed in deep ink.',
    [scene(751, '', s=0.9, tx=0, ty=60),
     big('hd', 0, 14, 130, 'The real cost', extra='width:1280px;text-align:center'),
     big('sub', 0, 118, 84, 'of studying in Europe', color='#111114', extra='width:1280px;text-align:center'),
     label('a', 70, 430, 330, 'Germany', 'de', 'Tuition', '€0', ps=150, strip=52, ks=30, rot=-5, bar=False),
     label('b', 820, 400, 440, 'Germany', 'de', 'Proof of funds', '€11,904', red=True, ps=140, strip=52, ks=30, rot=4, bar=False)],
    {'--wash': '#EDE9E2', '--ground': '#16181C', '--bg-b': '2'}, rec=True)

add('03-free-tuition-not-quite', 'photo background', 'FREE TUITION? NOT QUITE', [3, 7],
    'Photo-led, text-led: she is on the right with her hand on her chin (sceptical). Two stickers answer the question: tuition €0 (yellow), money to show €11,904 (red). '
    'The words are a plain question and answer anyone can read. Room washed in a dark blue-grey.',
    [scene(170, '', s=1.1, tx=300, ty=-70),
     big('hd', 40, 34, 136, 'Free tuition?', extra=''),
     big('hd2', 40, 166, 136, 'Not quite', color='#FF4713'),
     sticker('s2', 40, 400, 560, '€11,904 to show for the visa', size=64, rot=-2)],
    {'--wash': '#EDE9E2', '--ground': '#10161d', '--bg-b': '2'})

add('04-under-24-austria', 'photo background', 'STUDY IN AUSTRIA · UNDER 24?', [2, 4],
    'Photo-led: she raises a hand as if asking "how old are you?". The Austria label has two prices: under 24 (yellow, the cheap one) and 24 and over (red). '
    'Real OeAD numbers (EUR 722,58 and 1.308,39 a month, 2026).',
    [scene(289, '', s=1.15, tx=0, ty=-40),
     big('hd0', 640, 34, 92, 'Study in Austria', color='#fff', extra='width:600px;text-align:right'),
     big('hd', 720, 132, 180, 'Under<br>24?', extra='width:520px;text-align:right'),
     f'<div class="label z4" data-move="at" style="left:30px;top:180px;width:470px;rotate:-3deg">'
     f'<div class="strip" style="height:60px;font-size:34px"><span data-k="at_c">Austria</span>{flag("at", 63)}</div>'
     f'<div class="kind" style="font-size:32px" data-k="at_k1">Proof of funds, under 24</div>'
     f'<div class="price" style="font-size:118px"><span data-k="at_p1">€723</span><span style="font-size:.36em" data-k="at_m1"> /month</span></div>'
     f'<div style="background:var(--red);color:#fff;padding:14px 22px 16px"><div class="kind" style="padding:0;font-size:32px" data-k="at_k2">24 and over</div>'
     f'<div class="price" style="padding:0;font-size:96px"><span data-k="at_p2">€1,308</span><span style="font-size:.4em" data-k="at_m2"> /month</span></div></div></div>'],
    {'--wash': '#EDE9E2', '--ground': '#1a0f10'})
D[-1]['text'].update({'at_c': 'Austria', 'at_k1': 'Proof of funds, under 24', 'at_p1': '€723', 'at_m1': ' /month', 'at_k2': '24 and over', 'at_p2': '€1,308', 'at_m2': ' /month'})

add('05-money-you-must-show', 'photo background', 'MONEY YOU MUST SHOW', [4, 5],
    'Photo-led: she holds out an open hand with a fan of euro notes in it (Pexels photo, cut out, set behind her fingers). The words say plainly what proof of funds is. Room washed in deep red-brown so the notes and yellow pop.',
    [scene(485, '', s=1.15, tx=-120, ty=-30, behind='<img class="obj" data-img="notes" src="../../assets/collage/euro-fan-cut.png" style="position:absolute;left:110px;top:190px;width:300px;rotate:-12deg">'),
     big('hd', 560, 40, 118, 'Money you<br>must show', extra='text-align:right;width:680px'),
     big('hd2', 560, 250, 64, 'to study in Europe', color='#111114', extra='text-align:right;width:680px')],
    {'--wash': '#EDE9E2', '--ground': '#1a0f10'})

# ---------------------------------------------------------------- collage over her natural photo
def tagline(x, y, len_):
    return f'<div class="string z3" style="left:{x}px;top:0;height:{y}px"></div>'

def hang(key, x, y, w, country, code, price, rot, red=False):
    s = tagline(x + w // 2, y + 8, 0)
    h, t = label(key, x, y, w, country, code, 'Tuition + funds', price, red=red, rot=rot, ps=92, strip=46, ks=26, bar=False)
    return s + h, t

add('06-collage-the-real-cost', 'collage', 'the real cost of studying in Europe', [1, 8],
    'Collage over her natural photo (her 10-07 style): three price tags hang on strings around her, each a country with its first-year cost (tuition + one year of proof of funds), '
    'one elegant serif line across the bottom. Red = the one over €14,000.',
    [scene(660, '', natural=True, s=1.0, ty=0),
     hang('t1', 40, 160, 300, 'Germany', 'de', '€11,904', -4),
     hang('t2', 940, 350, 300, 'Austria <24', 'at', '€10,177', 3),
     hang('t3', 930, 110, 300, 'France', 'fr', '€14,480', 4, red=True),

     '<div class="z5" style="left:0;top:560px;width:1280px;height:160px;background:#121212"></div>',
     big('hd', 0, 596, 80, 'the real cost of <span style="color:#FF4713">studying in Europe</span>', color='#EDE9E2', cls='big', extra='width:1280px;text-align:center;white-space:nowrap;z-index:6'),
     ],
    {})

add('07-in-naira', 'photo, natural', '€11,904 = ₦18.7 MILLION', [7, 10],
    'Photo, her natural colour: Germany\'s proof of funds turned into naira, the number a Nigerian family actually has to find. '
    'A yellow shelf label says ₦18.7 million, with €11,904 above it. Rate: CBN window ₦1,570.93 per €1 (25 Aug 2026, kit 7a); change it in the editor when the rate moves.',
    [scene(660, '', natural=True, s=1.12, tx=-150, ty=-30),
     '<div class="z3" style="left:700px;top:0;width:580px;height:720px;background:#EDE9E2"></div>',
     '<div class="z2" style="left:0;top:0;width:1280px;height:720px;background:linear-gradient(90deg,rgba(14,14,16,.0) 0,rgba(14,14,16,0) 100%)"></div>',
     label('ng', 730, 150, 520, 'Germany\'s visa money', 'de', '€11,904 in naira', '₦18.7m', ps=180, strip=60, ks=40, rot=2, bar=False),
     big('top', 740, 52, 76, 'Study in Europe', color='#121212'),
     big('note', 720, 560, 26, '₦1,570.93 = €1 (CBN, Aug 2026)', color='#121212', cls='mono', extra='white-space:nowrap;width:500px;text-align:left')],
    {})

def pol(key, x, y, w, h, img, cap, rot, price, red=False):
    s = (f'<div class="pol z4" data-move="{key}" style="left:{x}px;top:{y}px;width:{w}px;rotate:{rot}deg"><img data-img="{key}" src="../../assets/collage/{img}" style="height:{h}px">'
         f'<div class="cap" data-k="{key}_cap">{cap}</div>'
         f'<div class="sticker" data-k="{key}_p" style="position:absolute;right:-26px;top:-24px;font-size:44px;padding:8px 14px;rotate:6deg;{"" if red else "background:var(--lab);color:var(--ink)"}">{price}</div></div>')
    return s, {f'{key}_cap': cap, f'{key}_p': price}

add('08-collage-which-country', 'collage', 'which country is cheapest?', [2, 1],
    'Collage over her natural photo (hands open, "it depends"): three city polaroids (Paris, Vienna, Tallinn, Pexels) with first-year price stickers, '
    'one serif question at the top.',
    [scene(723, '', natural=True, s=1.0, tx=0, ty=40),
     '<div class="z2" style="left:0;top:0;width:1280px;height:150px;background:#121212"></div>',
     big('hd', 0, 30, 92, 'which country is <span style="color:#FF4713">cheapest?</span>', color='#EDE9E2', cls='big', extra='width:1280px;text-align:center;z-index:6'),
     pol('p1', 30, 176, 270, 160, 'paris.jpg', 'France, year 1', -6, '€14,480', red=True),
     pol('p2', 930, 180, 290, 200, 'vienna.jpg', 'Austria, <24', 5, '€10,177'),
     pol('p3', 50, 476, 290, 120, 'tallinn-street.jpg', 'Estonia, year 1', -4, '€14,560', red=True),
     ],
    {})

add('09-what-i-pay-in-estonia', 'photo background', 'WHAT I PAY IN ESTONIA', [8, 10],
    'Photo-led, personal: her real fee. An Estonia shelf label says MY MASTER\'S €6,000 a year (her Human-Computer Interaction fee; new non-EU students now pay €7,000, tlu.ee 2 Nov 2026, add it if she wants). Room washed in Estonian blue.',
    [scene(660, '', s=1.1, tx=-200, ty=-10),
     big('hd', 700, 40, 128, 'What I pay<br><span style="color:#fff">in Estonia</span>', extra='width:560px'),
     label('ee', 720, 330, 440, 'Estonia', 'ee', 'My tuition, a year', '€6,000', ps=150, strip=56, ks=32, rot=3, bar=False),
     sticker('st', 740, 590, 440, 'New students: €7,000', size=40, rot=3),
     ],
    {'--wash': '#EDE9E2', '--ground': '#0c1a2e'})

# ---------------------------------------------------------------- flat, in the film's look
add('10-flat-germany-0-star', 'flat graphic', 'GERMANY · TUITION €0*', [7, 5],
    'Flat, the film\'s opening label as a thumbnail (no face): shelf grey wall, one huge Germany label, €0 with a red asterisk, and the red sticker says '
    'what the asterisk means. One object, one accent, nothing else.',
    ['<div class="rail z1" style="top:300px;height:200px"></div>',
     label('de', 90, 50, 900, 'Germany', 'de', 'Tuition', '€0', '*', ps=380, strip=96, ks=58, rot=0, bar=False)[0],
     sticker('st', 150, 540, 900, '*Proof of funds: €11,904', size=72, rot=-2)],
    {})
D[-1]['text'].update({'de_c': 'Germany', 'de_k': 'Tuition', 'de_p': '€0'})

add('11-flat-shelf-ranked', 'flat graphic', 'CHEAPEST COUNTRIES IN EUROPE', [1, 2],
    'Flat: a shelf of three labels ranked 1-2-3 by first-year cost (tuition + a year of proof of funds), the topic as a big heading, '
    'and her colour cut-out with a yellow outline. Austria is shown at the under-24 rate.',
    [big('hd', 40, 34, 112, 'Cheapest countries<br>in Europe', color='#121212'),
     '<div class="rail z1" style="top:520px;height:200px"></div>',
     label('a', 40, 330, 300, 'Austria', 'at', 'Year one, <24', '€10,177', ps=96, strip=44, ks=26, bar=False)[0],
     label('b', 355, 330, 300, 'Germany', 'de', 'Year one', '€11,904', ps=96, strip=44, ks=26, bar=False)[0],
     label('c', 670, 330, 300, 'France', 'fr', 'Year one', '€14,480', red=True, ps=96, strip=44, ks=26, bar=False)[0],
     label('d', 40, 548, 250, 'France', 'fr', 'First year', '€14,480', red=True, ps=78, strip=44, ks=24, bar=False, extra='display:none')[0],
     f'<img class="cut ol z6" data-img="me" data-move="me" src="{C.format(464)}" style="right:-90px;height:470px">'],
    {})
D[-1]['text'].update({'a_c': 'Austria', 'a_k': 'Year one, <24', 'a_p': '€10,177', 'b_c': 'Germany', 'b_k': 'Year one', 'b_p': '€11,904', 'c_c': 'France', 'c_k': 'Year one', 'c_p': '€14,480'})

add('12-flat-two-bars', 'flat graphic', 'IS GERMANY REALLY FREE?', [7, 5],
    'Flat, the framework drawn (her database-indexes bar): Germany\'s two bars. Tuition is a flat line at €0; proof of funds is a tall red bar at €11,904. '
    'Her calm colour cut-out on the right.',
    [big('hd', 40, 36, 112, 'Is Germany<br>really <span class="rbox">free?</span>', color='#121212', extra='line-height:.98'),
     '<div class="z2" style="left:40px;top:640px;width:640px;height:6px;background:#121212"></div>',
     '<div class="z3" data-move="bar1" style="left:60px;top:612px;width:230px;height:28px;background:#111114"></div>',
     big('l1', 60, 652, 34, 'tuition €0', color='#121212', cls='mono'),
     '<div class="z3" data-move="bar2" style="left:330px;top:300px;width:300px;height:340px;background:var(--red)"></div>',
     big('l2', 346, 320, 90, '€11,904', color='#fff', z=4),
     big('l3', 346, 652, 34, 'proof of funds', color='#121212', cls='mono'),
     flag('de', 90, extra='position:absolute;left:60px;top:520px;z-index:4'),
     f'<img class="cut ol z6" data-img="me" data-move="me" src="{C.format(464)}" style="right:-60px;height:620px">'],
    {'--ol': '#FFD60A'})

# ---------------------------------------------------------------- other
def page(key, x, y, w, img, cred, rot=-1.5):
    return (f'<div class="page z4" data-move="{key}" style="left:{x}px;top:{y}px;width:{w}px;rotate:{rot}deg"><img data-img="{key}" src="../../assets/src/{img}">'
            f'<div class="cr" data-k="{key}_cr">{cred}</div></div>'), {f'{key}_cr': cred}

add('13-real-page-austria-age', 'real page', 'STUDY IN AUSTRIA? YOUR AGE MATTERS', [11, 4],
    'Real page + her cut-out: the OeAD checklist lines for students under 24 and from 24 (EUR 722,58 and 1.308,39 a month, 2026), '
    'cropped and highlighted, credited. Big words say the surprise in plain English.',
    [big('hd', 40, 30, 124, 'Study in Austria?<br><span class="acc" style="color:var(--red)">Your age</span> matters', color='#121212'),
     page('pg', 30, 350, 760, 'at-ages-big.png', 'oead.at, student residence permit · 2 Nov 2026', rot=-1.2),
     sticker('st1', 50, 530, 540, 'Under 24: €723 a month', size=42, rot=-3, yellow=True),
     sticker('st2', 60, 612, 660, '24 and over: €1,308 a month', size=42, rot=2),
     f'<img class="cut ol z6" data-img="me" data-move="me" src="{C.format(170)}" style="right:-140px;height:540px">'],
    {'--ol': '#E4002B'})

add('14-split-free-vs-11904', 'split', 'FREE vs €11,904', [6, 7],
    'Split, before / after style (her saved before-after thumbnails): left half yellow "what you hear: FREE", right half red "what you show: €11,904", '
    'her colour cut-out in the middle with a white outline. Germany flag on both sides.',
    ['<div class="z1" style="left:0;top:0;width:640px;height:720px;background:#EDE9E2"></div>',
     '<div class="z1" style="left:640px;top:0;width:640px;height:720px;background:#111114"></div>',
     big('k1', 40, 46, 40, 'Germany: tuition', color='#121212', cls='mono'),
     big('v1', 36, 100, 230, 'Free', color='#121212'),
     big('k2', 700, 46, 40, 'Proof of funds', color='#fff', cls='mono', extra='text-align:right;width:540px'),
     big('v2', 700, 100, 200, '€11,904', color='#FF4713', extra='text-align:right;width:540px'),
     big('f1', 40, 540, 70, 'what you<br>hear', color='#121212', cls='words'),
     big('f2', 860, 540, 70, 'what you<br>show', color='#EDE9E2', cls='words', extra='text-align:right;width:380px'),
     f'<img class="cut ol z5" data-img="me" data-move="me" src="{C.format(660)}" style="left:360px;height:520px">'],
    {'--ol': '#ffffff'})

# ---------------------------------------------------------------- write
def page_html(d):
    return ('<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../../lib/pc.css"></head><body>\n'
            f'<div class="t">\n{d["html"]}\n</div><script src="../../lib/pc.js"></script><script src="../../lib/bind.js"></script></body></html>\n')

os.makedirs(os.path.join(ROOT, 'directions'), exist_ok=True)
for d in D:
    dd = os.path.join(ROOT, 'directions', d['name']); os.makedirs(dd, exist_ok=True)
    open(os.path.join(dd, 'index.html'), 'w').write(page_html(d))
    cj = os.path.join(dd, 'content.json')
    if FORCE or not os.path.exists(cj):
        imgs = {}
        import re
        for m in re.finditer(r'data-img="([^"]+)"[^>]*src="([^"]+)"', d['html']): imgs[m.group(1)] = m.group(2)
        json.dump({'direction': d['direction'], 'thumbnail_text': d['words'], 'titles': d['titles'], 'title': d['titles'][0],
                   'kind': d['kind'], 'recommended': d['rec'], 'scores': '', 'text': d['text'], 'images': imgs, 'vars': d['vars']},
                  open(cj, 'w'), ensure_ascii=False, indent=1)
print(len(D), 'directions')
