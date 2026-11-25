#!/usr/bin/env python3
"""9 things thumbnails: rework from her 50 picks of 19 Nov (projects/THUMBS-REWORK-BRIEF-2026-11-19.md).
Each new direction copies ONE pick (inspiration/boards/thumbnails/img/pick1119-NN.jpg) in composition, picture kind and type.
Same system as gen-set5.py (lib/s5.css + lib/bind.js; text in content.json "text", photos in "images", moves in "nudge").
Fonts only from the font board, in their specimen colours. Her Oredev photos: assets/oredev/ (Enhance photo --strength 0.5 --bg keep,
face untouched, never mirrored). Run: python3 tools/gen-rework-2026-11-19.py && node render.mjs 10 11 12 13 14  (--force resets her nudges)"""
import json, os, sys
HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__))); D = os.path.join(HERE, 'directions')
FORCE = '--force' in sys.argv
OR = '../../assets/oredev/'; S5 = '../../assets/set5/'; PX = '../../assets/pexels/'
HEAD = ('<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../../lib/s5.css"><style>'
        "@font-face{font-family:'FBOsw';src:url('../../fonts/Oswald-Variable.ttf');font-weight:200 700}{css}</style></head><body><div class=\"t\">")
TAIL = '</div><script src="../../lib/bind.js"></script></body></html>'
OUT = []

def put(dirname, html, content, census):
    p = os.path.join(D, dirname); os.makedirs(p, exist_ok=True); cj = os.path.join(p, 'content.json')
    if os.path.exists(cj) and not FORCE:
        old = json.load(open(cj)); content['nudge'] = old.get('nudge', {})
        for k, v in (old.get('text') or {}).items():
            if k in content['text']: content['text'][k] = v
        for k in ('scores', 'recommended'):
            if k in old and k not in content: content[k] = old[k]
    else: content.setdefault('nudge', {})
    content.setdefault('images', {}); content.setdefault('vars', {}); content.setdefault('class', 'no-lift')
    content['title'] = content['titles'][0]; content['census'] = census
    open(os.path.join(p, 'index.html'), 'w').write(HEAD.replace('{css}', css_of[dirname]) + html + TAIL)
    json.dump(content, open(cj, 'w'), indent=2, ensure_ascii=False); OUT.append(dirname)

css_of = {}

# generic short-video feed screen for a phone (stock photo + a plain rail of round buttons; no real app UI)
def feed(img_key):
    return (f'<div class="phone" data-move="phone-{img_key}"><div class="scr fd"><img data-img="{img_key}" alt="">'
            '<div class="rail"><i></i><i></i><i></i><i></i></div><div class="cap"><b></b><b></b></div></div></div>')
FEED_CSS = ('.phone .scr.fd{position:relative;height:100%;border-radius:30px;overflow:hidden;background:#000}'
            '.fd img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}'
            '.fd .rail{position:absolute;right:12px;bottom:90px;display:flex;flex-direction:column;gap:16px}'
            '.fd .rail i{display:block;width:30px;height:30px;border-radius:50%;background:rgba(255,255,255,.9)}'
            '.fd .cap{position:absolute;left:14px;bottom:34px;width:60%}.fd .cap b{display:block;height:9px;border-radius:5px;background:rgba(255,255,255,.85);margin-top:8px}'
            '.fd .cap b+b{width:70%}')

# 10 · pick1119-17 ("THAT PHONE IS THE PROBLEM"): her face big and warm in the middle, phones with a feed tilted down the left,
#      a short line in the brand's yellow above white caps at the bottom with a soft shadow.
def t10():
    n = '10-i-got-my-evenings-back'
    css_of[n] = ('.t{background:#24160D}'
        '.bg{left:-40px;top:-40px;width:1360px;height:800px;object-fit:cover;filter:blur(16px) brightness(.55) saturate(1.1)}'
        '.p1{left:70px;top:60px;rotate:-7deg}.phone{width:290px;height:594px}' + FEED_CSS +
        '.me{right:-10px;bottom:0;height:680px;display:block;filter:drop-shadow(0 10px 30px rgba(0,0,0,.5))}'
        '.h{left:0;right:0;bottom:30px;text-align:center;font:800 84px/1 FBMon,sans-serif;color:#FFFFFF;text-transform:uppercase;'
        'letter-spacing:-.01em;text-shadow:0 4px 0 rgba(0,0,0,.35),0 8px 30px rgba(0,0,0,.8);white-space:nowrap}'
        '.h .y{color:#F5CF2F}')
    html = ('<img class="ph bg z1" data-img="room" data-move="room" alt=""><img class="me z2" data-img="me" data-move="her" alt="">'
            f'<div class="p1 z3" style="position:absolute">{feed("feed1")}</div>'
            '<div class="h z5" data-k="h"></div>')
    html = html.replace('<div class="phone" data-move="phone-feed1">', '<div class="phone" data-move="phone-feed1" style="position:relative">')
    put(n, html, {
        'text': {'h': 'I got my <span class="y">evenings back</span>'},
        'images': {'room': S5 + 'tea-candle.jpg', 'me': OR + 'smile-head-cut.png', 'feed1': PX + 'pushups.jpg'},
        'kind': 'her face big and laughing on the right (Oredev, cut-out) over a warm blurred evening room + one phone with an endless feed tilted on the left + one line of caps at the bottom',
        'board': 'pick1119-17 (i stopped doomscrolling 6 months ago... / THAT PHONE IS THE PROBLEM)',
        'fonts': ['shorts-01 Montserrat ExtraBold caps, yellow key word (white + #F5CF2F, Formats 2)'],
        'colours': 'Font shorts-01 specimen: white + yellow #F5CF2F; ground = a warm room photo, blurred and darkened',
        'thumbnail_text': 'I GOT MY EVENINGS BACK ("evenings back" in yellow)',
        'titles': ['I Cut Back on Doomscrolling. Here\'s What I Do Instead',
                   'How I Stopped Doomscrolling Every Night (9 Easy Swaps)',
                   'How to Stop Doomscrolling: 9 Things I Do Instead'],
        'direction': 'Copies pick1119-17: her face close, warm and alive (Oredev, laughing mid-sentence), the feed on a tilted phone at the left, a feeling line at the bottom in white caps with the key words in yellow. The title says what the video is; the thumbnail says how it feels after. Round 1 critic: the first version (calm, looking down) read as bored, against the words.',
    }, 'phone left, her right, words bottom')

# 11 · pick1119-43 ("is 3:32 too long?" + an X-ray of someone hunched over a phone on black): one picture of the problem on
#      the left, a short question in big white lowercase on the right with the number in red.
def t11():
    n = '11-is-5-hours-too-much'
    css_of[n] = ('.t{background:#0B0B0B}'
        '.phone{left:140px;top:70px;width:300px;height:615px;rotate:-7deg}'
        '.phone .scr.st{background:#FFFFFF;height:100%;border-radius:36px;overflow:hidden;padding:58px 22px 0;font-family:FBIT,sans-serif;color:#111}'
        '.st .t1{font:700 27px/1 FBIT}.st .t2{font:500 16px/1 FBIT;color:#777;margin-top:18px}'
        '.st .t3{font:800 74px/1 FBIT;margin-top:8px;letter-spacing:-.03em;color:#E1251B}'
        '.st .bars{display:flex;align-items:flex-end;gap:8px;height:130px;margin-top:20px;border-bottom:2px solid #e3e3e3}'
        '.st .bars i{flex:1;background:#2F7BF6;border-radius:3px 3px 0 0;display:block}'
        '.st .row{display:flex;justify-content:space-between;font:600 17px/1 FBIT;padding:15px 0;border-bottom:1px solid #eee}'
        '.h{left:540px;top:150px;font:700 150px/1.02 FBIT,sans-serif;color:#FFFFFF;letter-spacing:-.04em;white-space:nowrap}'
        '.h .r{color:#E1251B}')
    html = ('<div class="phone z2" data-move="phone"><div class="scr st"><div class="t1">Screen Time</div><div class="t2">Today</div>'
            '<div class="t3" data-k="avg"></div><div class="bars"><i style="height:40%"></i><i style="height:55%"></i><i style="height:48%"></i>'
            '<i style="height:70%"></i><i style="height:66%"></i><i style="height:84%"></i><i style="height:100%"></i></div>'
            '<div class="row"><span>Social</span><span>3h 41m</span></div><div class="row"><span>Video</span><span>1h 09m</span></div>'
            '</div></div>'
            '<div class="h z4" data-k="h"></div>')
    put(n, html, {
        'text': {'h': 'is <span class="r">5 hours</span><br>too much?', 'avg': '5h 12m'},
        'kind': 'flat black + ONE device for the number (a generic phone on its Screen Time page, 5h 12m, an example, not hers) + a big lowercase question with the number in red',
        'board': 'pick1119-43 (How to never procrastinate / is 3:32 too long?)',
        'fonts': ['thumbs-09 Inter Tight Bold lowercase + red (white + #E1251B on near-black, Thumbnails 68)'],
        'colours': 'Font thumbs-09 specimen: #111 ground / white / red #E1251B',
        'thumbnail_text': 'is 5 hours too much? ("5 hours" in red; the phone shows 5h 12m)',
        'titles': ['How Much Screen Time Is Too Much? (What I Do Instead)',
                   'Too Much Screen Time? 9 Things I Do Instead of Scrolling'],
        'direction': 'Copies pick1119-43: black ground, the problem as one picture on the left (here a plain generic phone showing a daily screen time), a short question in huge white lowercase on the right with the number in red. No face: a stranger reads it in a second.',
    }, 'phone left, words right (no face)')

# 12 · pick1119-12 ("PRODUCTIVE UNI WEEK", i stopped scrolling for a week): a row of real moments side by side, one heavy
#      condensed headline in pale yellow across the top.
def t12():
    n = '12-my-offline-evenings'
    css_of[n] = ('.t{background:#141210}'
        '.pa{top:0;height:720px;object-fit:cover;display:block}'
        '.a1{left:0;width:400px;object-position:62% 50%;filter:brightness(.72)}.a3{left:880px;width:400px;object-position:30% 50%;filter:brightness(.72)}'
        '.mw{left:406px;top:0;width:468px;height:720px;overflow:hidden}.mw img{position:absolute;height:1150px;left:-250px;top:-170px;display:block}'
        '.h{left:0;right:0;top:26px;text-align:center;font:700 116px/1 FBOsw,sans-serif;color:#EADB9A;text-transform:uppercase;letter-spacing:-.005em;'
        'text-shadow:0 4px 0 rgba(0,0,0,.35),0 8px 30px rgba(0,0,0,.7);white-space:nowrap}')
    html = ('<img class="pa a1 z1" data-img="left" data-move="left" alt=""><div class="mw z1" data-move="her"><img data-img="me" alt=""></div>'
            '<img class="pa a3 z1" data-img="right" data-move="right" alt=""><div class="h z5" data-k="h"></div>')
    put(n, html, {
        'text': {'h': 'My offline evenings'},
        'images': {'left': S5 + 'knitting.jpg', 'me': OR + 'profile.jpg', 'right': S5 + 'reading-sofa.jpg'},
        'kind': 'collage of three real evening moments (knitting, her talking with people, reading on the sofa) + one heavy condensed headline across the top',
        'board': 'pick1119-12 (i stopped scrolling for a week... / PRODUCTIVE UNI WEEK)',
        'fonts': ['shorts-06 Oswald (huge cream condensed caps, #EADB9A, Formats 26)'],
        'colours': 'Font shorts-06 specimen: cream #EADB9A caps; ground = the photos',
        'thumbnail_text': 'MY OFFLINE EVENINGS',
        'titles': ['What I Do Instead of Doomscrolling (9 Real Things)',
                   'I Replaced Doomscrolling With These 9 Things',
                   'Things to Do Instead of Doomscrolling (That I Actually Do)'],
        'direction': 'Copies pick1119-12: three real moments side by side (stock knitting and reading, Pexels; her in the middle talking with people at a dinner, Oredev photo), one heavy condensed line across the top. The pictures ARE the list.',
    }, 'three-photo collage, words top')

# 13 · pick1119-22 ("girl, it's not too late."): her face big in the middle, a real scene on each side, a reassuring line in
#      white bold lowercase at the bottom with the key words in gold.
def t13():
    n = '13-its-not-your-fault'
    css_of[n] = ('.t{background:#3A3D3A}'
        '.sr{left:880px;top:0;width:400px;height:720px;object-fit:cover;object-position:88% 50%;filter:brightness(.8)}'
        '.p1{left:90px;top:40px;rotate:-8deg}.phone{width:300px;height:615px}' + FEED_CSS +
        '.me{left:400px;top:-330px;height:1200px;display:block;filter:drop-shadow(0 10px 30px rgba(0,0,0,.45))}'
        '.h{left:0;right:0;bottom:36px;text-align:center;font:800 94px/1 FBMon,sans-serif;color:#FFFFFF;letter-spacing:-.025em;'
        'text-shadow:0 4px 0 rgba(0,0,0,.35),0 8px 30px rgba(0,0,0,.8);white-space:nowrap}.h .y{color:#F6C343}')
    html = ('<img class="me z2" data-img="me" data-move="her" alt="">'
            f'<div class="p1 z3" style="position:absolute">{feed("feed1")}</div><div class="h z5" data-k="h"></div>')
    html = html.replace('<div class="phone" data-move="phone-feed1">', '<div class="phone" data-move="phone-feed1" style="position:relative">')
    put(n, html, {
        'text': {'h': 'it\'s not <span class="y">your fault.</span>'},
        'images': {'me': OR + 'chin-cut.png', 'feed1': PX + 'busstop.jpg'},
        'kind': 'her in the middle (Oredev, orange top, hand at her chin, a small smile, looking down towards a phone with an endless feed on the left) + one line at the bottom (round 2: the third photo on the right was dropped)',
        'board': 'pick1119-22 (I\'m 45. If you\'re in your 30s, watch this. / girl, it\'s not too late.)',
        'fonts': ['thumbs-18 Montserrat ExtraBold + yellow (white + #F6C343 on #3A3D3A, Thumbnails 162)'],
        'colours': 'Font thumbs-18 specimen: #3A3D3A ground / white / yellow #F6C343',
        'thumbnail_text': 'it\'s not your fault. ("your fault." in yellow)',
        'titles': ['Why You Can\'t Stop Doomscrolling (And What I Do Instead)',
                   'Can\'t Stop Doomscrolling? 9 Things I Do Instead'],
        'direction': 'Copies pick1119-22: a reassuring line, not a scold (her video opens with the apps being designed to keep you scrolling). Her in the middle, the feed on the left, real life (a phone call) on the right, the line in white bold lowercase with the key words in yellow. Round 1: the talking photo and a dark left scene said nothing about phones; now a phone with a feed is the first thing you see.',
    }, 'phone left, her right, words bottom')

# 14 · pick1119-28 ("Learn Deeply" in a yellow box over hands on an open book and journal): a warm close real scene of the
#      thing itself, a short phrase in black on a yellow box at the top.
def t14():
    n = '14-read-dont-scroll'
    css_of[n] = ('.t{background:#1B130D}'
        '.bg{left:0;top:0;width:1280px;height:720px;object-fit:cover;object-position:50% 60%}'
        '.pd{left:820px;top:330px;width:420px;rotate:28deg;display:block;filter:drop-shadow(0 18px 24px rgba(0,0,0,.5))}'
        '.h{left:0;right:0;top:44px;text-align:center}'
        '.h span{display:inline-block;background:#F7D51D;color:#111111;font:700 116px/1 FBIT,sans-serif;letter-spacing:-.035em;padding:10px 30px 16px;white-space:nowrap;'
        'box-shadow:0 10px 30px rgba(0,0,0,.35)}')
    html = ('<img class="ph bg z1" data-img="scene" data-move="scene" alt=""><img class="pd z3" data-img="phone" data-move="phone" alt="">'
            '<div class="h z5"><span data-k="h"></span></div>')
    put(n, html, {
        'text': {'h': 'Read, don\'t scroll'},
        'images': {'scene': S5 + 'candle-book.jpg', 'phone': S5 + 'phone-cut.png'},
        'kind': 'full-bleed warm real scene (an open book, a candle, a cup of tea at night), no face + one phrase on a yellow box at the top',
        'board': 'pick1119-28 (Forget Your Reading Journal, Do This Instead / Learn Deeply)',
        'fonts': ['thumbs-02 Inter Tight Bold + yellow highlight (#111 on #F7D51D, Thumbnails 21)'],
        'colours': 'Font thumbs-02 specimen: yellow box #F7D51D, black text',
        'thumbnail_text': 'Read, don\'t scroll (black on a yellow box)',
        'titles': ['What I Do at Night Instead of Doomscrolling',
                   'What to Do Instead of Scrolling at Night (9 Easy Things)',
                   'Things to Do Instead of Doomscrolling (That I Actually Do)'],
        'direction': 'Copies pick1119-28: the thing itself, close and warm (an evening with a book instead of the phone; Pexels), one short phrase in a yellow box. No face, a calm contrast to the faces in the set.',
    }, 'scene, no face, words top')

for f in (t10, t11, t12, t13, t14): f()
print('wrote', ' '.join(OUT))
