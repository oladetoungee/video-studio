# Round 4 (2026-11-13, last round after the fresh critic's round 3): patches round 3 (tools/set-round3.py), drops 02 (WHICH ONE?
# meant nothing alone) and 04 (label not a promise, cookie repeats 08), adds 4 new board compositions (10-13).
import importlib.util, os
_here = os.path.dirname(os.path.abspath(__file__))
_sp = importlib.util.spec_from_file_location('r3', os.path.join(_here, 'set-round3.py'))
_r3 = importlib.util.module_from_spec(_sp); _sp.loader.exec_module(_r3)

def blocks(S, PX, CL, photo, T_MAIN):
    B = {d['name'][:2]: d for d in _r3.blocks(S, PX, CL, photo, T_MAIN)}
    person = lambda n, css_cls='me2': f'<img class="{css_cls}" data-img="me" data-move="her" src="{S}{n}-person.png" alt="">'

    # 01: her presenting a generic browser window with the cart (browser reads), headline one line on top -----------------------
    B['01'].update(
 board='Thumbnails 21 (pin-02-04 "Why You\'re Stuck": one line across the top with one word highlighted, the creator below holding up the thing the video is about)',
 direction='Flat near-black ground (#1C1C1C). One line across the top: "why is my cart still here?" ("still here?" on the yellow highlight). She is left of centre (shoot 1559, palm up, presenting) and on her palm floats a generic browser window with a shop cart (2 items) that is still there.',
 text={'hd': 'why is my cart <span class="hl">still here?</span>', 'u': 'shop.example/cart', 'h': 'Your cart (2)', 'a': 'Running shoes', 'b': 'Water bottle', 'c': 'Checkout'},
 images={'me': S + '1559-person.png'},
 vars={'--ground': '#1C1C1C'},
 css='''
.hd{left:0;right:0;top:26px;text-align:center;font-family:'Inter Tight';font-weight:700;font-size:88px;line-height:1.1;letter-spacing:-.045em;word-spacing:.06em;color:#FFFFFF;z-index:5}
.hd .hl{background:#F7D51D;color:#111111;padding:0 16px 6px}
.me2{position:absolute;left:-170px;top:40px;width:1100px;z-index:2}
.win{left:700px;top:190px;width:540px;height:430px;z-index:4;transform:rotate(3deg);box-shadow:0 26px 50px rgba(0,0,0,.55)}
.win .pg{padding:24px 34px;font-family:'Inter Tight'}
.win .h{font-weight:900;font-size:56px;letter-spacing:-.045em;margin-bottom:10px}
.win .it{display:flex;align-items:center;gap:20px;font-weight:700;font-size:38px;letter-spacing:-.03em;padding:14px 0;border-top:3px solid #EEE}
.win .it i{width:62px;height:62px;border-radius:12px;background:#EFEFEC;display:block}
.win .c{background:#111;color:#fff;border-radius:14px;font-weight:700;font-size:34px;text-align:center;padding:14px 0;margin-top:12px}
''',
 body=person('1559') + '''
<div class="a hd nw" data-k="hd"></div>
<div class="win" data-move="window"><div class="bar"><i></i><i></i><i></i><div class="url" data-k="u"></div></div>
<div class="pg"><div class="h nw" data-k="h"></div><div class="it"><i></i><span data-k="a"></span></div><div class="it"><i></i><span data-k="b"></span></div><div class="c" data-k="c"></div></div></div>''')

    # 03: a generic stored-data panel (key / value, a token visible) instead of the padlock ---------------------------------------
    c = B['03']
    c['direction'] = 'Pale grey ground, her cut-out large on the right (shoot 1554, hand on her chin, unconvinced). Two lines of calm black lowercase on the left, and under them a generic browser storage panel: key / value rows with an email and a login token in plain sight.'
    c['text'] = dict(c['text'], ph='localStorage', k1='email', v1='ada@mail.com', k2='token', v2='eyJhbGciOiJIUzI1&hellip;', k3='cart', v3='2 items')
    c['css'] = (c['css'].replace('.lock{left:70px;top:350px;width:300px;height:348px}', '')
        + ".pnl{left:50px;top:360px;width:560px;background:#FFFFFF;border-radius:16px;overflow:hidden;box-shadow:0 18px 36px rgba(0,0,0,.14);font-family:'Inter Tight';color:#111111;z-index:4}\n"
        + ".pnl .pt{background:#111111;color:#E9E7E3;font-weight:700;font-size:30px;padding:12px 22px}\n"
        + ".pnl .rw{display:flex;font-size:34px;letter-spacing:-.02em;border-top:2px solid #E9E7E3}\n"
        + ".pnl .k{width:150px;padding:14px 22px;font-weight:700;border-right:2px solid #E9E7E3}\n.pnl .v{padding:14px 22px;font-weight:500;white-space:nowrap}\n.pnl .rw.hot .v{background:#FFE9E9;color:#B3121A;font-weight:700}\n")
    c['body'] = c['body'][:c['body'].index('<svg class="a lock')] + (
        '<div class="a pnl" data-move="panel"><div class="pt" data-k="ph"></div>'
        '<div class="rw"><div class="k" data-k="k1"></div><div class="v" data-k="v1"></div></div>'
        '<div class="rw hot"><div class="k" data-k="k2"></div><div class="v" data-k="v2"></div></div>'
        '<div class="rw"><div class="k" data-k="k3"></div><div class="v" data-k="v3"></div></div></div>')

    # 05: "gone" on red ------------------------------------------------------------------------------------------------------------
    c = B['05']
    c['colours'] += '; "gone" on the video\'s crash red #E5262A in white so it differs from "kept" (readability over the specimen pair)'
    c['css'] += '.g2{background:#E5262A;color:#FFFFFF}\n'

    # 06: full margin around her, short column heads ----------------------------------------------------------------------------
    c = B['06']
    c['text'] = dict(c['text'], c2='local', c3='session')
    c['vars'] = dict(c['vars'], **{'--pl': '-530px'})
    c['css'] = c['css'].replace('.tb{left:466px;top:150px;width:800px;', '.tb{left:540px;top:150px;width:716px;')
    c['direction'] = c['direction'].replace('columns cookie / localStorage / sessionStorage', 'columns cookie / local / session')

    # 09: no shadow, darker room, wider word gaps, card +15% ----------------------------------------------------------------------
    c = B['09']
    c['vars'] = dict(c['vars'], **{'--dim': 'rgba(30,24,20,.74)'})
    c['css'] = (c['css'].replace("letter-spacing:-.045em;", "letter-spacing:-.03em;word-spacing:.14em;")
                + '.win{transform:rotate(3deg) scale(1.15);transform-origin:100% 0}\n')
    c['body'] = c['body'].replace('<div class="a hd sh nw"', '<div class="a hd nw"')

    out = [B[k] for k in ('01', '03', '05', '06', '08', '09')]

    # 10 NEW: big word behind her head ------------------------------------------------------------------------------------------
    out.append(dict(
 name='10-cookies-behind', kind='cut-out', recommended=False,
 board='Thumbnails 80 (yt-27 "Complete Roadmap UI UX": one huge word filling the frame behind the creator\'s head, a small line above it)',
 fonts='Font 66 (thumbs-11: Oswald Bold, black on blue, Thumbnails 87)',
 colours='Font 66 specimen: #111111 on #2FA8E0',
 thumbnail_text='how websites remember you / COOKIES',
 direction='Flat blue ground, COOKIES huge in black condensed caps behind her; she (shoot 1553, smiling, straight at the camera) stands in front of the lower middle of the word. A small line above: how websites remember you.',
 titles=['Why Websites Need Cookies (Explained Simply)',
         'What Are Browser Cookies? How Websites Remember You',
         T_MAIN],
 text={'pre': 'how websites remember you', 'hd': 'COOKIES'},
 images={'me': S + '1553-person.png'},
 vars={'--ground': '#2FA8E0'},
 css='''
.pre{left:0;right:0;top:22px;text-align:center;font-family:'Oswald';font-weight:700;font-size:62px;line-height:1;letter-spacing:.005em;color:#111111;z-index:4}
.hd{left:0;right:0;top:78px;text-align:center;font-family:'Oswald';font-weight:700;font-size:330px;line-height:1;letter-spacing:.01em;color:#111111;z-index:1}
.me2{position:absolute;left:-110px;top:-60px;width:1500px;z-index:2}
''',
 body='<div class="a pre nw" data-k="pre"></div>\n<div class="a hd nw" data-k="hd"></div>\n' + person('1553')))

    # 11 NEW: real scene, her at her desk, the screen behind her shows a page ----------------------------------------------------
    out.append(dict(
 name='11-what-websites-store', kind='photo', recommended=False,
 board='Thumbnails 46 (yt-74 "Teaching myself EVERYTHING": the creator in her real room at her desk, the words low on the left of the photo)',
 fonts='Font 54 (shorts-20: Satoshi Black Italic, white on #1B2440, Formats 57)',
 colours='Font 54 specimen: #FFFFFF on #1B2440 (a solid navy plate, no shadow)',
 thumbnail_text='what websites store in your browser',
 direction='Her real room as it is (shoot 1556, at her desk by her computer, straight at the camera). The words sit low on the left on a solid navy plate: what websites store in your browser.',
 titles=['What Websites Store in Your Browser (Cookies, localStorage, sessionStorage)',
         'Cookies, localStorage and sessionStorage Explained Simply',
         T_MAIN],
 text={'hd': 'what websites store<br>in your browser'},
 images={'room': S + '1556.jpg', 'me': S + '1556-person.png'},
 vars={'--pw': '1700px', '--pl': '-330px', '--pt': '-260px', '--dim': 'rgba(0,0,0,.12)'},
 css='''
.hd{left:36px;top:470px;font-family:'Satoshi';font-style:italic;font-weight:900;font-size:76px;line-height:1.02;letter-spacing:-.03em;color:#FFFFFF;background:#1B2440;padding:14px 26px 20px;z-index:5}
.scr2{left:1080px;top:20px;width:210px;height:300px;background:#fff;border-radius:6px;overflow:hidden;z-index:2;font-family:'Inter Tight';transform:skewY(-3deg)}
.scr2 .bar{height:30px;background:#ECECEA;font-size:12px;color:#666;padding:7px 10px}
.scr2 .h{font-weight:900;font-size:30px;letter-spacing:-.04em;padding:14px 14px 6px;color:#111}
.scr2 i{display:block;height:44px;margin:8px 14px;border-radius:8px;background:#EFEFEC}
.scr2 b{display:block;height:36px;margin:12px 14px;border-radius:8px;background:#111}
''',
 body=photo('1556') + '''
<div class="a hd nw" data-k="hd"></div>'''))

    # 12 NEW: checklist card, no face ---------------------------------------------------------------------------------------------
    T = '<svg viewBox="0 0 84 84"><path d="M12 44 L34 66 L76 12" fill="none" stroke="#111111" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    X = '<svg viewBox="0 0 84 84"><path d="M16 16 L68 68 M68 16 L16 68" fill="none" stroke="#B3121A" stroke-width="11" stroke-linecap="round"/></svg>'
    out.append(dict(
 name='12-close-the-tab-whats-left', kind='flat', recommended=False,
 board='Thumbnails 36 (pin-03-08 "Everything done by 2pm.": a hand-ticked list on the left, one calm serif line on the right, plain light ground)',
 fonts='Font 17 (design-17: Libre Baskerville Bold, black on light grey, Design 399)',
 colours='Font 17 specimen: #111111 on #E8E7E5 (the one cross in a dark red for "gone")',
 thumbnail_text='Close the tab. What\'s left?',
 direction='No face. Light grey ground: on the left a list with hand-drawn marks: still logged in (tick), cart still there (tick), half-typed form (cross). On the right one serif line: Close the tab. What\'s left?',
 titles=['Close the Tab: What Your Browser Keeps (Cookies vs localStorage vs sessionStorage)',
         'Why Your Cart Stays but Your Checkout Form Disappears',
         T_MAIN],
 text={'hd': 'Close<br>the tab.<br>What&rsquo;s<br>left?', 'r1': 'still logged in', 'r2': 'cart still there', 'r3': 'half-typed form'},
 images={},
 vars={'--ground': '#E8E7E5'},
 css='''
.list{left:70px;top:150px;font-family:'Libre Baskerville';font-weight:700;font-size:54px;letter-spacing:-.02em;color:#111111;line-height:1}
.row{display:flex;align-items:center;gap:26px;margin-bottom:62px}
.row svg{width:90px;height:90px;flex:none}
.row.gone span{text-decoration:line-through;text-decoration-thickness:5px;color:#6b6a68}
.hd{left:770px;top:70px;font-family:'Libre Baskerville';font-weight:700;font-size:112px;line-height:1.02;letter-spacing:-.03em;color:#111111}
.rule{left:700px;top:80px;width:4px;height:560px;background:#111111}
''',
 body=f'''
<div class="a list" data-move="list">
 <div class="row nw">{T}<span data-k="r1"></span></div>
 <div class="row nw">{T}<span data-k="r2"></span></div>
 <div class="row gone nw">{X}<span data-k="r3"></span></div>
</div>
<div class="a rule"></div>
<div class="a hd nw" data-k="hd"></div>'''))

    # 13 NEW: two words in boxes at the top corners, her centred in her room ------------------------------------------------------
    out.append(dict(
 name='13-cookies-or-localstorage', kind='photo', recommended=False,
 board='Thumbnails 13 (pin-01-13 "LOCKED / FOCUS": the creator centred in a real room, two words in red boxes in the top corners)',
 fonts='Font 56 (thumbs-01: Anton + red box, Thumbnails 10)',
 colours='Font 56 specimen: #FFFFFF words, boxes #1A1A1A and #D9262B, room dimmed',
 thumbnail_text='COOKIES or LOCALSTORAGE?',
 direction='Her real room dimmed (shoot 1558, amused, eyebrows up), she centred. Two words in boxes in the top corners: COOKIES (black box) and LOCALSTORAGE? (red box): the choice every web developer asks about.',
 titles=['Cookies vs localStorage: Which Should You Use?',
         'localStorage vs Cookies: Where Should Your Data Go?',
         'Cookies vs localStorage (Explained With an Online Shop)'],
 text={'w1': 'COOKIES', 'w2': 'LOCALSTORAGE?', 'or': 'or'},
 images={'room': S + '1558.jpg', 'me': S + '1558-person.png'},
 vars={'--pw': '1500px', '--pl': '-110px', '--pt': '-200px', '--dim': 'rgba(10,10,10,.5)'},
 css='''
.w{position:absolute;top:34px;font-family:'Anton';font-size:96px;line-height:1;letter-spacing:.005em;color:#FFFFFF;background:#1A1A1A;padding:12px 26px 12px;z-index:5}
.w1{left:34px}.w2{right:34px;background:#D9262B}
.or{left:0;right:0;top:56px;text-align:center;font-family:'Anton';font-size:64px;color:#FFFFFF;z-index:5}
''',
 body=photo('1558') + '''
<div class="w w1 nw" data-k="w1"></div><div class="a or nw" data-k="or"></div><div class="w w2 nw" data-k="w2"></div>'''))
    return out
