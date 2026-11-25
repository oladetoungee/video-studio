#!/usr/bin/env python3
"""9 things thumbnails: rework of the 2 lowest of set 5 (2026-11-16, projects/WEAKEST-BRIEF-2026-11-16.md).
The old 04 and 09 stay exactly as they are; the new versions get the next suffix (04b, 09b).
Same system as tools/gen-set5.py (lib/s5.css + lib/bind.js; text in content.json "text", photos in "images", moves in "nudge").
Fonts only from the font board, in their specimen colours. Run: python3 tools/gen-rework-2026-11-16.py && node render.mjs 04b 09b"""
import json, os, sys
HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__))); D = os.path.join(HERE, 'directions')
FORCE = '--force' in sys.argv
SH = '../../assets/shoot/'; S5 = '../../assets/set5/'; PX = '../../assets/pexels/'
HEAD = '<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../../lib/s5.css"><style>{css}</style></head><body><div class="t">'
TAIL = '</div><script src="../../lib/bind.js"></script></body></html>'
T1 = '9 Easy Things I Do Instead of Doomscrolling'
T3 = 'How to Stop Doomscrolling: 9 Things I Do Instead'
T4 = 'What to Do Instead of Scrolling on Your Phone (9 Ideas)'
T6 = 'Offline Hobbies to Replace Doomscrolling (9 Easy Ones)'
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
    open(os.path.join(p, 'index.html'), 'w').write(html); json.dump(content, open(cj, 'w'), indent=2, ensure_ascii=False); OUT.append(dirname)

# 09b · Thumbnails 98 (yt-45 IT'S A TRAP): a real scene on the left half with huge caps across it, the person on the right in her room.
#   Rework of 09 (cut your screen time, r5 6.5/7: a data card beside a cut-out on flat dark; the card's small numbers carry the idea
#   and read as an app ad). Here the PICTURE is the problem itself (someone lit by a phone in bed at night), the words name it.
def t09b():
    css = ('.t{background:#1E1E1E}'
           '.sc{left:0;top:0;width:640px;height:720px;object-fit:cover;object-position:50% 50%;rotate:180deg;filter:saturate(.35) brightness(.8)}'
           '.rm{left:640px;top:0;width:640px;height:720px;overflow:hidden}'
           '.rm img{position:absolute;width:1650px;left:-215px;top:-290px;display:block}.rm .dk{position:absolute;inset:0;background:rgba(30,30,30,.62)}'
           '.h{left:36px;top:250px;font:400 96px/1 FBAnt,sans-serif;color:#FFFFFF;text-transform:uppercase;letter-spacing:.005em;'
           'text-shadow:0 6px 28px rgba(0,0,0,.55);white-space:nowrap}'
           '.h .r{display:inline-block;background:#D7262E;padding:4px 20px 0;margin-top:14px;text-shadow:none}')
    html = HEAD.format(css=css) + ('<img class="sc z1" data-img="scene" data-move="scene" alt="">'
        '<div class="rm z2" data-move="her"><img data-img="room" alt=""><div class="dk"></div><img data-img="me" alt=""></div>'
        '<div class="h z5" data-k="h"></div>') + TAIL
    put('09b-still-doomscrolling-at-2am', html, {'text': {'h': 'Still<br>doomscrolling<br><span class="r">at 2am?</span>'},
        'images': {'scene': PX + 'night-phone.jpg', 'room': SH + '1548.jpg', 'me': SH + '1548-person.png'},
        'kind': 'real scene left (someone lit by a phone in bed at night) + her in her dimmed room right, huge caps across the scene',
        'board': 'Thumbnails 98 (yt-45 IT\'S A TRAP: a real scene on the left with huge caps across it, the person on the right)',
        'fonts': ['thumbs-16 Anton + red box (white + #D7262E box on #1E1E1E, Thumbnails 113)'],
        'colours': 'Font thumbs-16 specimen: #1E1E1E (her room is dimmed in it) / #FFFFFF / red box #D7262E',
        'thumbnail_text': 'STILL DOOMSCROLLING AT 2AM? (over someone lit by a phone in bed at night; she looks at you, hand on her cheek)',
        'titles': [T3, T4],
        'rework_of': '09-cut-your-screen-time (kept as it was)',
        'direction': 'Rework of 09. Copies Thumbnails 98 (IT\'S A TRAP) with the Anton + red box of Thumbnails 113: the left half is the problem itself, someone lit by a phone in bed at night; the right half is her in her own room (dimmed, face untouched), hand on her cheek. The words name the topic people search and ask the viewer if it is them (round 2: the trap line read as a tired formula and ran into her face).'},
        'words left / her right')

# 04b · Thumbnails 129 / 15 (viral-3, pin-01-15 FITNESS SALES FRAMEWORK): her face very big at the left edge, heavy condensed title top
#   right, the things as big highlighter tags in a zig-zag with hand-drawn arrows.
#   Rework of 04 (my no-phone list, r4 6.5/7: five small hand-written rows, her head cut by the edge, flat blue; reads like a slide).
def t04b():
    css = ('.t{background:#F7F02B}'
           '.me{left:-210px;bottom:-420px;height:1080px;filter:drop-shadow(0 20px 30px rgba(0,0,0,.35))}'
           '.h{left:640px;top:58px;width:620px;text-align:left;font:400 92px/1.02 FBAB,sans-serif;color:#E2262B;text-transform:uppercase;letter-spacing:-.01em}'
           '.c{font:400 46px/1 FBAB,sans-serif;color:#F7F02B;background:#E2262B;padding:16px 26px 14px;text-transform:uppercase;white-space:nowrap;box-shadow:0 10px 0 #111111}'
           '.c1{left:660px;top:300px;rotate:-3deg}.c2{left:830px;top:405px;rotate:2deg}.c3{left:650px;top:520px;rotate:-2deg}'
           '.c4{background:none;box-shadow:none;color:#111111;font-size:44px;left:700px;top:618px;rotate:-2deg}'
           '.ar{left:0;top:0;width:1280px;height:720px}')
    ar = ('<svg class="ar z3" data-move="arrows" viewBox="0 0 1280 720" fill="none" stroke="#111111" stroke-width="7" stroke-linecap="round" stroke-linejoin="round">'
          '<path d="M880 318 C 920 318, 950 340, 962 392"/><path d="M944 380 l18 12 l6 -22"/>'
          '<path d="M1080 495 C 1085 530, 1060 548, 1030 552"/><path d="M1046 538 l-16 14 l20 8"/>'
          '</svg>')
    chips = ''.join(f'<div class="c c{i} z4" data-k="c{i}"></div>' for i in range(1, 5))
    html = HEAD.format(css=css) + ('<img class="cut me z2" data-img="me" data-move="her" alt="">'
        '<div class="h z4" data-k="h"></div>' + ar + chips) + TAIL
    put('04b-instead-of-scrolling', html, {'text': {'h': 'Instead of<br>scrolling', 'c1': 'read', 'c2': 'call home', 'c3': 'ride a bike', 'c4': '+ 6 more'},
        'images': {'me': SH + '1557-cut.png'},
        'kind': 'flat navy + her face very big at the left edge + the swaps as big tags joined by hand-drawn arrows',
        'board': 'Thumbnails 129 (viral-3 / pin-01-15 FITNESS SALES FRAMEWORK: face big at the left edge, heavy caps title top right, highlighter tags in a zig-zag with arrows)',
        'fonts': ['thumbs-12 Archivo Black (red #E2262B on yellow #F7F02B, Thumbnails 89)'],
        'colours': 'Font thumbs-12 specimen: #F7F02B / #E2262B (+ #111111 for the arrows and shadows, as its drawings)',
        'thumbnail_text': 'INSTEAD OF SCROLLING: read, call home, ride a bike, + 6 more (tags joined by arrows)',
        'titles': [T6, T1],
        'rework_of': '04-my-no-phone-list (kept as it was)',
        'direction': 'Rework of 04. Copies Thumbnails 129 (FITNESS SALES FRAMEWORK) in Archivo Black red on yellow (Thumbnails 89): her face big and calm at the left edge, the search words as the title, three of her swaps as big red tags joined by drawn arrows and "+ 6 more" (round 2: fewer words, gives away less, yellow so it does not look like the old blue 04).'},
        'her left (face big), title + tags right')

for f in (t09b, t04b): f()
idx = os.path.join(D, 'index.json'); cur = json.load(open(idx))
json.dump(sorted(set(cur) | set(OUT)), open(idx, 'w'))
print('\n'.join(OUT))
