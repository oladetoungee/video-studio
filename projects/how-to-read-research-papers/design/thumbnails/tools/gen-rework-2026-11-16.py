#!/usr/bin/env python3
"""How to read research papers: thumbnail REWORK (2026-11-16, projects/WEAKEST-BRIEF-2026-11-16.md).
New versions BESIDE the old ones (02 -> 02b, 09 -> 09b, 05 -> 05b); the old directions + PNGs are untouched.
Same system as tools/gen-set3.py: directions/<dir>/index.html + content.json (lib/bind.js), every word editable in the studio.
Keeps her studio nudges / edited text of an existing content.json unless --force.
Run: python3 tools/gen-rework-2026-11-16.py && node render.mjs <dir> ..."""
import json, os, sys
HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__))); D = os.path.join(HERE, 'directions')
FORCE = '--force' in sys.argv
SH = '../../assets/photo/shoot/'
ST = '../../assets/stock/'
HEAD = '<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../../lib/fb.css"><style>{css}</style></head><body><div class="t">'
TAIL = '</div><script src="../../lib/bind.js"></script></body></html>'
OUT = []

def put(dirname, css, body, content):
    p = os.path.join(D, dirname); os.makedirs(p, exist_ok=True); cj = os.path.join(p, 'content.json')
    if os.path.exists(cj) and not FORCE:
        old = json.load(open(cj)); content['nudge'] = old.get('nudge', {})
        for k, v in (old.get('text') or {}).items():
            if k in content['text']: content['text'][k] = v
    else: content.setdefault('nudge', {})
    content.setdefault('images', {}); content.setdefault('vars', {}); content.setdefault('class', 'no-lift')
    content['title'] = content['titles'][0]
    open(os.path.join(p, 'index.html'), 'w').write(HEAD.format(css=css) + body + TAIL)
    json.dump(content, open(cj, 'w'), indent=2, ensure_ascii=False); OUT.append(dirname)

KP = [ST + 'keshav_p1.png', ST + 'keshav_p2.png']
def page(cls, x, y, w, r, src=0, move='', hl=None, z='z5'):
    strips = ''.join(f'<i style="left:{a}%;top:{b}%;width:{c}%;height:{d}%"></i>' for a, b, c, d in (hl or []))
    return (f'<div class="rpg {cls} {z}" data-move="{move or cls}" style="left:{x}px;top:{y}px;width:{w}px;rotate:{r}deg">'
            f'<img src="{KP[src]}" alt="">{strips}</div>')
RPG = ('.rpg{box-shadow:0 16px 36px rgba(0,0,0,.38);background:#fff}.rpg img{display:block;width:100%}'
       '.rpg i{position:absolute;background:#F7D51D;mix-blend-mode:multiply}')
HL1 = [(33, 7.5, 33, 3.6), (8, 27, 41, 8.5)]   # Keshav p1: the title + the abstract

# 02b: same board item as 02 (Thumbnails 69, yt-16 "12:30 PM | 7:30 PM", one of her likes): two photos, one short label each.
# 02 said "every word | 3 passes" (insider words). 02b says what a stranger wants: the same paper, 4 hours vs 10 minutes
# (Keshav 2007: the detailed pass "can take about four or five hours for beginners"; the first pass "about five to ten minutes").
put('02b-4-hours-vs-10-minutes',
    RPG + '.t{background:#1C1C1C}.p{top:0;width:636px;height:720px;overflow:hidden}.p img.ph{position:absolute;display:block;width:1180px;top:-150px}'
    '.pa{left:0}.pb{left:644px}.pa img.ph{left:-262px}.pb img.ph{left:-292px}'
    '.dimp{position:absolute;inset:0;background:rgba(28,28,28,.5)}'
    '.lb{top:26px;font:900 112px/1 FBIT,sans-serif;letter-spacing:-.04em;padding:10px 26px 18px;white-space:nowrap}'
    '.la{left:318px;translate:-50% 0;background:#1C1C1C;color:#FFFFFF}.lbb{left:962px;translate:-50% 0;background:#F7D51D;color:#1C1C1C}'
    '.tag{left:640px;bottom:26px;translate:-50% 0;background:#FFFFFF;color:#1C1C1C;font:700 62px/1 FBIT,sans-serif;letter-spacing:-.025em;'
    'padding:12px 24px 15px;white-space:nowrap;box-shadow:0 12px 30px rgba(0,0,0,.45)}',
    '<div class="p pa z1"><img class="ph" data-img="a" alt=""><div class="dimp"></div><img class="ph" data-img="acut" alt=""></div>'
    '<div class="p pb z1"><img class="ph" data-img="b" alt=""><div class="dimp"></div><img class="ph" data-img="bcut" alt=""></div>'
    '<div class="lb la z6" data-k="a"></div><div class="lb lbb z6" data-k="b"></div><div class="tag z6" data-k="tag"></div>'
    + ''.join(page(f'pl{i}', x, y, 330, r, i % 2) for i, (x, y, r) in enumerate([(-90, 440, -14), (60, 400, 9), (240, 430, -6), (380, 395, 12),
                                                                                  (-30, 540, 6), (170, 520, -10), (350, 555, 4)]))
    + page('one', 770, 420, 330, -5, 0, hl=HL1),
    {'text': {'a': '4 hours', 'b': '10 minutes', 'tag': 'same research paper'},
     'images': {'a': SH + 'room-1595.jpg', 'acut': SH + 'room-1595-cut.png', 'b': SH + 'room-1603.jpg', 'bcut': SH + 'room-1603-cut.png'},
     'kind': 'split (her twice: buried in pages / at ease with one highlighted page) + one line joining them',
     'board': 'Thumbnails 69 (yt-16 "12:30 PM | 7:30 PM", one of her likes)',
     'fonts': ['thumbs-02 Inter Tight Black / Bold (white on #1C1C1C, #1C1C1C on the yellow box #F7D51D, from Thumbnails 21)'],
     'colours': 'thumbs-02: #1C1C1C / #FFFFFF / #F7D51D',
     'thumbnail_text': '4 hours | 10 minutes + "same research paper"',
     'titles': ['How to Read Research Papers Faster as a Student', 'Stop Reading Research Papers From Start to Finish',
                'How to Read a Research Paper (The 3-Pass Method)'],
     'direction': 'Rework of 02 (2026-11-16). Copies Thumbnails 69: two photos side by side, one big time label each. Left: her, '
                  'stressed, a pile of real printed pages, "4 hours"; right: her at ease with one page, title and abstract highlighted, '
                  '"10 minutes"; "same research paper" joins them. Numbers from Keshav 2007 (detailed pass 4-5 hours for beginners, '
                  'first pass 5-10 minutes).'})

# 09b: copies Thumbnails 141 for real this time (a real paper on screen + the speaker small in a corner): the actual abstract of
# Caine, CHI 2016 (screenshot of open.clemson.edu at 3x, verbatim), "the most common sample size is 12." highlighted and the 12
# circled in red; her thinking in a round camera bubble; the question in thumbs-01 Anton + red box (Thumbnails 10).
put('09b-can-you-trust-this-study',
    '.t{background:#1A1A1A}'
    '.h{left:48px;top:30px;font:400 116px/1 FBAnt,sans-serif;color:#FFFFFF;text-transform:uppercase;letter-spacing:-.005em}'
    '.h .a{display:block}.h .b{display:inline-block;margin-top:6px;background:#D9262B;color:#FFFFFF;padding:2px 22px 8px}'
    '.pg{left:30px;top:350px;width:790px;height:284px;background:#FFFFFF;rotate:-2deg;box-shadow:0 24px 60px rgba(0,0,0,.55)}'
    '.pg .ti{position:absolute;left:26px;top:20px;width:490px}'
    '.pg .ln{position:absolute;left:24px;display:block}.pg .l7{top:88px;width:354px}.pg .l8{top:174px;width:700px}'
    '.pg .hl{position:absolute;background:#F7F02B;mix-blend-mode:multiply;height:70px}'
    '.pg .ring{position:absolute;left:634px;top:158px;width:110px;height:104px;border:7px solid #D9262B;border-radius:50%;rotate:-6deg}'
    '.me{left:800px;top:222px;width:456px;height:456px;border-radius:50%;overflow:hidden;border:8px solid #FFFFFF;box-shadow:0 20px 50px rgba(0,0,0,.55)}'
    '.me img{position:absolute;width:1130px;left:-414px;top:-166px}'
    '.cr{left:60px;top:684px;color:#BBBBBB;font-size:15px}',
    '<div class="h z5" data-move="words"><span class="a" data-k="a"></span><span class="b" data-k="b"></span></div>'
    '<div class="pg z3" data-move="page"><img class="ti" src="' + ST + 'caine-title-3x.png" alt="">'
    # two real lines of Caine's abstract (verbatim, across its line break), 1.55x of the 3x screenshot; highlighted, the 12 circled
    '<img class="ln l7" src="' + ST + 'caine-l7.png" alt=""><img class="ln l8" src="' + ST + 'caine-l8.png" alt="">'
    '<i class="hl" style="left:20px;top:92px;width:362px"></i><i class="hl" style="left:20px;top:178px;width:708px"></i><i class="ring"></i></div>'
    '<div class="me z5" data-move="her"><img data-img="me" alt=""></div><div class="credit cr z5" data-k="cr"></div>',
    {'text': {'a': 'Can you trust', 'b': 'this study?', 'cr': 'K. Caine, "Local Standards for Sample Size at CHI", CHI 2016 (open.clemson.edu)'},
     'images': {'me': SH + 'room-1605.jpg'},
     'kind': 'a real paper on screen (abstract, one line highlighted, the 12 circled) + her thinking in a small round camera bubble',
     'board': 'Thumbnails 141 (viral: "unclear ACL / Yoruba paper" screenshot: the paper big, the speaker small in a corner)',
     'fonts': ['thumbs-01 Anton + red box (white on #1A1A1A, white on red #D9262B, from Thumbnails 10)'],
     'colours': 'thumbs-01: ground #1A1A1A, #FFFFFF, red #D9262B; highlighter #F7F02B',
     'thumbnail_text': 'CAN YOU TRUST THIS STUDY? + a real abstract with "the most common sample size is 12." highlighted',
     'titles': ['How to Tell if a Research Paper Is Any Good', 'How to Spot a Weak Study When Reading Research Papers',
                'How to Read a Research Paper Critically'],
     'direction': 'Rework of 09 (2026-11-16). 09 was words left / her right (like 08) with three text blocks. 09b copies Thumbnails '
                  '141: the real paper is the picture (Caine CHI 2016 abstract, verbatim, credited), one line highlighted, the 12 '
                  'circled; the question in Anton with a red box; she thinks it over in a round camera bubble.'})

# 05b (label + question clippings, Keshav verbatim) was built and scored lower than 05 (cold critic 3 vs 4: the questions are ~6 px
# on a phone); dropped 2026-11-16, in ~/.Trash/research-thumbnails-05b-2026-11-16/ (clippings stay in assets/stock/k5q-N.png).

SCORES = {'02b-4-hours-vs-10-minutes': 'cold critic 2026-11-16, 3 rounds, alone: 7 / 7 / 7 (02: 5.5 / 4 / 5.5)',
          '09b-can-you-trust-this-study': 'cold critic 2026-11-16, 3 rounds, alone: 6 / 7 / 6.5 (09: 7 / 7 / 6)'}
for d in OUT:
    cj = os.path.join(D, d, 'content.json'); c = json.load(open(cj)); c['scores'] = SCORES.get(d, ''); c['recommended'] = False
    json.dump(c, open(cj, 'w'), indent=2, ensure_ascii=False)
idx = sorted(x for x in os.listdir(D) if os.path.exists(os.path.join(D, x, 'index.html')))
json.dump(idx, open(os.path.join(D, 'index.json'), 'w'))
print('\n'.join(OUT))
