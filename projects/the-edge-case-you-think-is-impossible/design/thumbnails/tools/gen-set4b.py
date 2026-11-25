#!/usr/bin/env python3
"""Edge cases thumbnails SET 4b (2026-11-16, WEAKEST-BRIEF): new versions of the 3 lowest in set 4 (03, 04, 07), written BESIDE
the old ones (03b, 04b, 07b; the old folders and PNGs stay untouched). Each copies a board composition the set does not use yet,
fonts only from the font board in their source colours, plain words (no story details; "edge cases" only in the titles).
Keeps "nudge" + edited "text" of an existing content.json unless --force. Run: python3 tools/gen-set4b.py && node render.mjs"""
import json, os, sys
HERE = os.path.dirname(os.path.dirname(os.path.abspath(__file__))); D = os.path.join(HERE, 'directions')
FORCE = '--force' in sys.argv
SH = '../../assets/shoot/'
FF = ("@font-face{font-family:'FBOsw';src:url('../../fonts/Oswald-Variable.ttf');font-weight:200 700}"
      "@font-face{font-family:'FBAnton';src:url('../../fonts/Anton.ttf')}")
HEAD = '<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../../lib/fb.css"><style>' + FF.replace('{', '{{').replace('}', '}}') + '{css}</style></head><body><div class="t">'
TAIL = '</div><script src="../../lib/bind.js"></script></body></html>'
ROOM = '<img class="room z1" data-img="room" alt=""><div class="dim z2"></div><img class="room z3" data-img="me" alt="">'
def room(n): return {'room': SH + f'room3-{n}.jpg', 'me': SH + f'me3-{n}.png'}
CHECK = '<svg viewBox="0 0 40 40" width="{s}" height="{s}" style="flex:none"><circle cx="20" cy="20" r="19" fill="{bg}"/><path d="M11 20.5l6 6 12-13" stroke="{fg}" stroke-width="4.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>'
ALERT = '<svg width="{s}" height="{s}" viewBox="0 0 40 40" style="flex:none"><circle cx="20" cy="20" r="19" fill="#E5322D"/><rect x="18" y="9" width="4" height="15" rx="2" fill="#fff"/><circle cx="20" cy="30" r="2.6" fill="#fff"/></svg>'
STAR = '<svg width="{s}" height="{s}" viewBox="0 0 24 24"><path d="M12 2.2l2.9 6.1 6.6.8-4.9 4.6 1.3 6.6L12 17.1l-5.9 3.2 1.3-6.6L2.5 9.1l6.6-.8z" fill="{c}"/></svg>'
OUT = []

def put(dirname, html, content):
    p = os.path.join(D, dirname); os.makedirs(p, exist_ok=True); cj = os.path.join(p, 'content.json')
    if os.path.exists(cj) and not FORCE:
        old = json.load(open(cj)); content['nudge'] = old.get('nudge', {})
        for k, v in (old.get('text') or {}).items():
            if k in content['text']: content['text'][k] = v
    else: content['nudge'] = content.pop('nudge_default', {})
    content.pop('nudge_default', None)
    content.setdefault('images', {}); content.setdefault('vars', {}); content.setdefault('class', 'no-lift')
    open(os.path.join(p, 'index.html'), 'w').write(html); json.dump(content, open(cj, 'w'), indent=2, ensure_ascii=False); OUT.append(dirname)

# ---------- 03b: Thumbnails 126 (her own UX RESEARCH: room washed in one colour, huge condensed topic across the top,
#            she in the middle with her palms up under a phone, a sticky note -> arrow -> phone) ----------
def t03b():
    css = ('.t{--rw:1400px;--rx:-100px;--ry:-220px;--dim:rgba(78,68,64,.9);background:#5A4F4A}'
           '.h{left:0;width:1280px;top:6px;text-align:center;font:700 128px/1 FBOsw,sans-serif;color:#EDE2A0;text-transform:uppercase;letter-spacing:-.012em;white-space:nowrap;text-shadow:0 6px 28px rgba(0,0,0,.55)}'
           '.note{left:930px;top:250px;width:280px;height:262px;background:#EDE2A0;rotate:5deg;box-shadow:0 22px 44px rgba(0,0,0,.4);padding:46px 26px 0;'
           'font:600 70px/1.02 FBOsw,sans-serif;color:#2A2421;text-transform:uppercase;text-align:center}'
           '.note:before{content:"";position:absolute;left:50%;top:14px;width:24px;height:24px;margin-left:-12px;border-radius:50%;background:#C8392B}'
           '.arr{left:400px;top:440px;width:520px;height:150px}'
           '.ph{left:200px;top:170px;width:210px;height:430px;rotate:-6deg}'
           '.ph .scr{display:flex;flex-direction:column;align-items:center;padding-top:84px;font-family:FBIT,sans-serif;color:#111}'
           '.ph .lab{font:700 30px/1 FBIT,sans-serif;color:#555}.ph .num{font:900 140px/1 FBIT,sans-serif;color:#E5322D;letter-spacing:-.05em;margin-top:6px}'
           '.ph .sub{margin-top:14px;background:#FFECEB;color:#B3261E;border-radius:14px;padding:10px 14px;font:800 24px/1.1 FBIT,sans-serif;text-align:center}')
    arrow = ('<svg class="arr z5" data-move="arrow" viewBox="0 0 440 150"><path d="M425 30 C 330 150, 140 150, 30 70" stroke="#EDE2A0" stroke-width="12" fill="none" stroke-linecap="round"/>'
             '<path d="M30 70 L 78 66 M30 70 L 52 112" stroke="#EDE2A0" stroke-width="12" fill="none" stroke-linecap="round"/></svg>')
    html = HEAD.format(css=css) + ROOM + ('<div class="h z4" data-k="h"></div>'
        '<div class="note z5" data-move="note" data-k="note"></div>' + arrow +
        '<div class="phone ph z5" data-move="phone"><div class="scr"><div class="lab" data-k="lab"></div><div class="num" data-k="num"></div><div class="sub" data-k="sub"></div></div></div>') + TAIL
    put('03b-bugs-that-break-apps', html, {'text': {'h': 'Bugs that break apps', 'note': 'Only<br>1 left', 'lab': 'In stock', 'num': '−1', 'sub': '2 people<br>bought it'},
        'images': room(1590), 'kind': 'photo, her room washed in one colour, her in the middle (new version of 03)',
        'board': 'Thumbnails 126 (her own UX RESEARCH: one-colour room, huge condensed topic on top, sticky note -> arrow -> phone)',
        'fonts': ['shorts-06 Oswald SemiBold caps (cream #EDE2A0 on #5A4F4A, Formats 26)', 'Inter Tight inside the phone (generic UI)'],
        'colours': 'Formats 26 / shorts-06: #5A4F4A / #EDE2A0 (+ error red #E5322D on the phone)',
        'thumbnail_text': 'BUGS THAT BREAK APPS + sticky note "Only 1 left" -> phone "In stock: -1, 2 people bought it"',
        'titles': ['Edge Cases: The Bugs That Break Real Apps', 'Edge Cases Explained: 8 Bugs That Break Apps', 'Edge Cases: Why Code That Passes Tests Still Breaks'],
        'title': 'Edge Cases: The Bugs That Break Real Apps', 'replaces': '03-passed-tests-still-broken (kept beside it)', 'scores': 'cold critic 2026-11-16, 3 fresh rounds, PNGs only, alone: r1 7, r2 6, r3 4 (r3 was a try without the note + arrow, undone). Old 03 in the same rounds: 6 / 5 / 5.5',
        'direction': 'Copies Thumbnails 126 (her own UX RESEARCH): the room washed in one warm colour so it goes calm, the topic huge across the top, she holds out her palms under a phone; a sticky note "Only 1 left" points to the phone showing stock at -1 after 2 people bought it.'})

# ---------- 04b: Thumbnails 65 (yt-12 "Never get distracted again...": one big post card is the picture; here no face,
#            three 1-star review cards on black under one line with a yellow highlight word) ----------
def t04b():
    css = ('.t{background:#1C1C1C}'
           '.h{left:60px;top:44px;font:700 100px/1 FBIT,sans-serif;color:#FFFFFF;letter-spacing:-.035em;white-space:nowrap}'
           '.h .hl{background:#F7D51D;color:#111111;padding:0 .14em .04em;margin-left:.04em}'
           '.ok{left:60px;top:196px;display:flex;gap:14px;align-items:center;background:#173D27;color:#7BE3A2;border-radius:18px;padding:16px 26px;font:700 56px/1 FBIT,sans-serif;rotate:3deg;white-space:nowrap}'
           '.rv{width:860px;background:#FFFFFF;border-radius:22px;padding:22px 30px 24px;box-shadow:0 24px 50px rgba(0,0,0,.5);color:#111}'
           '.rv .st{display:flex;gap:4px}.rv .q{margin-top:12px;font:800 66px/1.05 FBIT,sans-serif;letter-spacing:-.025em;white-space:nowrap}'
           '.r1{left:130px;top:300px;rotate:-2.5deg}.r2{left:360px;top:500px;rotate:2deg}')
    stars = STAR.format(s=46, c='#E5322D') + ''.join(STAR.format(s=46, c='#D9D9DE') for _ in range(4))
    cards = ''.join(f'<div class="rv r{i} z{3 + i}" data-move="r{i}"><div class="st">{stars}</div><div class="q" data-k="r{i}"></div></div>' for i in range(1, 3))
    html = HEAD.format(css=css) + ('<div class="h z3" data-k="h"></div>'
        f'<div class="ok z4" data-move="ok">{CHECK.format(s=60, bg="#7BE3A2", fg="#173D27")}<span data-k="ok"></span></div>' + cards) + TAIL
    put('04b-bugs-your-tests-miss', html, {'text': {'h': 'Bugs your tests <span class="hl">miss</span>', 'ok': 'All tests passed',
        'r1': '“It charged me twice.”', 'r2': '“It won’t take my name.”'},
        'kind': 'flat, no face: two one-star reviews (new version of 04)',
        'board': 'Thumbnails 65 (yt-12 "Never get distracted again...": the post card IS the picture)',
        'fonts': ['thumbs-02 Inter Tight Bold + yellow highlight (white on #1C1C1C, #F7D51D, Thumbnails 21)'],
        'colours': 'Thumbnails 21 / thumbs-02: #1C1C1C / #FFFFFF / #F7D51D (+ star red #E5322D)',
        'thumbnail_text': 'Bugs your tests miss + "All tests passed" + two 1-star reviews (charged twice / won\'t take my name)',
        'titles': ['Edge Cases: Bugs Your Tests Miss (and Real Users Find)', 'Edge Cases: Why Code That Passes Tests Still Breaks', 'What Is an Edge Case? 8 Real Bugs Explained'],
        'title': 'Edge Cases: Bugs Your Tests Miss (and Real Users Find)', 'replaces': '04-the-leap-year-bug (kept beside it)', 'scores': 'cold critic 2026-11-16, 3 fresh rounds, PNGs only, alone: r1 6 (3 reviews), r2 7, r3 6. Old 04 in the same rounds: 5 / 6 / 6.5',
        'direction': 'Copies Thumbnails 65: the cards are the picture. A green "All tests passed" tag, then what real users write: two generic one-star reviews (no app, no brand). One line on top, one yellow highlighted word.'})

# ---------- 07b: Thumbnails 113 (yt-60 STOP LEARNING CODE THE OLD WAY: stacked Anton caps left, last line in a red box,
#            the person right in a dark room, the thing he means floating between) ----------
def t07b():
    css = ('.t{--rw:2000px;--rx:-60px;--ry:-360px;--dim:rgba(34,34,34,.80);background:#222222}'
           '.h{left:44px;top:70px;font:400 100px/1 FBAnton,sans-serif;white-space:nowrap;color:#FFFFFF;text-transform:uppercase;letter-spacing:.002em;text-shadow:0 6px 26px rgba(0,0,0,.5)}'
           '.h .bx{display:inline-block;background:#D7262B;padding:4px 16px 0;margin-top:10px}'
           '.ph{left:506px;top:180px;width:228px;height:468px;rotate:4deg}'
           '.ph .scr{padding:96px 18px 0;font-family:FBIT,sans-serif;color:#111}'
           '.ph .lab{font:700 26px/1 FBIT,sans-serif;color:#555;margin-bottom:10px}'
           '.ph .fld{border:4px solid #E5322D;border-radius:14px;padding:12px 14px;font:800 44px/1 FBIT,sans-serif;background:#FFF}'
           '.ph .err{margin-top:12px;display:flex;gap:8px;align-items:center;white-space:nowrap;letter-spacing:-.02em;font:800 27px/1.1 FBIT,sans-serif;color:#C0261F}'
           '.ph .btn{margin-top:26px;background:#111;color:#fff;border-radius:14px;padding:16px 0;text-align:center;font:800 28px/1 FBIT,sans-serif;opacity:.35}')
    html = HEAD.format(css=css) + ROOM + ('<div class="h z5" data-k="h"></div>'
        '<div class="phone ph z5" data-move="phone"><div class="scr"><div class="lab" data-k="lab"></div><div class="fld" data-k="fld"></div>'
        f'<div class="err">{ALERT.format(s=24)}<span data-k="err"></span></div><div class="btn" data-k="btn"></div></div></div>') + TAIL
    put('07b-tests-wont-catch-this', html, {'text': {'h': 'Your<br>tests<br>won’t<br><span class="bx">catch&nbsp;this</span>',
        'lab': 'First name', 'fld': 'Zoë', 'err': 'Invalid name', 'btn': 'Continue'},
        'images': room(1594), 'kind': 'photo: stacked caps left, her right in her dark room, a phone between (new version of 07; words left / her right 2 of 2 with 02)',
        'board': 'Thumbnails 113 (yt-60 STOP LEARNING CODE THE OLD WAY: stacked Anton, red box on the last line, him right)',
        'fonts': ['thumbs-16 Anton + red box (white on #222222, #D7262B, Thumbnails 113)', 'Inter Tight inside the phone (generic UI)'],
        'colours': 'Thumbnails 113 / thumbs-16: #222222 / #FFFFFF / #D7262B',
        'thumbnail_text': 'YOUR TESTS WON\'T CATCH THIS + a sign-up form rejecting the name "Zoë"',
        'titles': ['Edge Cases Your Tests Won\'t Catch (8 Real Examples)', 'Edge Cases: Why Code That Passes Tests Still Breaks'],
        'title': 'Edge Cases Your Tests Won\'t Catch (8 Real Examples)', 'replaces': '07-it-worked-in-testing (kept beside it)', 'scores': 'cold critic 2026-11-16, 3 fresh rounds, PNGs only, alone: r1 8, r2 7.5, r3 7 (best of the 11 in every round). Old 07 in the same rounds: 4 / 5 / 4',
        'direction': 'Copies Thumbnails 113: four stacked Anton lines on the left, the last in a red box; she looks on calmly from the right of her dark room (1594, mouth closed); between them the thing tests miss: a sign-up form that rejects an ordinary name with an accent.'})

for f in (t03b, t04b, t07b): f()
print('\n'.join(OUT))
