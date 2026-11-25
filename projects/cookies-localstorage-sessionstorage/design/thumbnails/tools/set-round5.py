# Round 5 (2026-11-13, final, after the fresh critic's round 4): patches round 4 (tools/set-round4.py).
# Her cut-outs are now *-hard.png: the aligned person layer with a hard mask (alpha > 150, eroded 1 px, 0.7 px soften): no halo, no fringe.
import importlib.util, os
_here = os.path.dirname(os.path.abspath(__file__))
_sp = importlib.util.spec_from_file_location('r4', os.path.join(_here, 'set-round4.py'))
_r4 = importlib.util.module_from_spec(_sp); _sp.loader.exec_module(_r4)

def blocks(S, PX, CL, photo, T_MAIN):
    B = {d['name'][:2]: d for d in _r4.blocks(S, PX, CL, photo, T_MAIN)}
    her = lambda n, x, y, w, z=2: f'<img class="her" data-img="me" data-move="her" src="{S}{n}-hard.png" alt="" style="left:{x}px;top:{y}px;width:{w}px;z-index:{z}">'
    HER_CSS = '.her{position:absolute;display:block}\n'

    # 01 ---------------------------------------------------------------------------------------------------------------------
    c = B['01']
    c.update(
 colours='Font 57 specimen colours, swapped: ground = its yellow #F7D51D, words #111111, highlight #111111 with yellow words',
 direction='Flat yellow ground (the specimen\'s highlight colour). One line across the top: "why is my cart still here?" ("still here?" knocked out of a black bar). She is on the left (shoot 1559, palm up, presenting, hard-masked cut-out, hand inside the frame); on the right a generic browser window with a shop cart (2 items) that is still there.',
 images={'me': S + '1559-hard.png'}, vars={'--ground': '#F7D51D'})
    c['css'] = (HER_CSS + c['css'].replace('color:#FFFFFF;z-index:5}', 'color:#111111;z-index:5}', 1)
                .replace('.hd .hl{background:#F7D51D;color:#111111;', '.hd .hl{background:#111111;color:#F7D51D;')
                .replace('.me2{position:absolute;left:-170px;top:40px;width:1100px;z-index:2}', '')
                .replace('.win{left:700px;top:190px;width:540px;height:430px;', '.win{left:650px;top:175px;width:590px;height:450px;')
                .replace('box-shadow:0 26px 50px rgba(0,0,0,.55)', 'box-shadow:0 22px 44px rgba(0,0,0,.28)'))
    c['body'] = her('1559', -240, -54, 1116) + c['body'][c['body'].index('\n'):]

    # 03 ---------------------------------------------------------------------------------------------------------------------
    c = B['03']
    c['images'] = {'me': S + '1554-hard.png'}
    c['direction'] = 'Pale grey ground, she large on the right (shoot 1554, hand on her chin, unconvinced; hard-masked). Two lines of calm black lowercase on the left, and under them a dark browser-storage panel (key / value, no borders): email, a login token in red, cart. Anyone\'s script can read it.'
    c['text'] = dict(c['text'], ph='Local storage', k1='email', v1='ada@mail.com', k2='token', v2='eyJhbGciOi&hellip;', k3='cart', v3='2 items')
    c['css'] = (HER_CSS + c['css'].replace('.cut{right:-200px;width:960px;bottom:-330px}', '')
        .replace(".pnl{left:50px;top:360px;width:560px;background:#FFFFFF;", ".pnl{left:50px;top:340px;width:640px;background:#111111;")
        .replace(".pnl .pt{background:#111111;color:#E9E7E3;font-weight:700;font-size:30px;padding:12px 22px}", ".pnl .pt{color:#9C9A96;font-weight:700;font-size:30px;padding:16px 28px 4px}")
        .replace(".pnl .rw{display:flex;font-size:34px;letter-spacing:-.02em;border-top:2px solid #E9E7E3}", ".pnl .rw{display:flex;font-size:42px;letter-spacing:-.02em;color:#E9E7E3}")
        .replace(".pnl .k{width:150px;padding:14px 22px;font-weight:700;border-right:2px solid #E9E7E3}", ".pnl .k{width:170px;padding:12px 28px;font-weight:700;color:#9C9A96}")
        .replace(".pnl .v{padding:14px 22px;font-weight:500;white-space:nowrap}", ".pnl .v{padding:12px 10px;font-weight:600;white-space:nowrap}")
        .replace(".pnl .rw.hot .v{background:#FFE9E9;color:#B3121A;font-weight:700}", ".pnl .rw.hot .v{color:#FF6B6B;font-weight:800}")
        .replace("color:#111111;z-index:4}", "z-index:4;padding-bottom:14px}", 1))
    c['body'] = her('1554', 200, -260, 1700) + c['body'][c['body'].index('\n<div class="a hd'):]

    # 05 ---------------------------------------------------------------------------------------------------------------------
    c = B['05']
    c['thumbnail_text'] = 'sessionStorage: refresh = kept / close tab = gone'
    c['direction'] = 'No face. sessionStorage as the headline. Two columns: "refresh" over "kept" and "close tab" over "gone" (gone on red), and under each a phone tilted in from the bottom with the same checkout form: filled in, then empty. Generic form, no shop.'
    c['text'] = dict(c['text'], top='sessionStorage')
    c['css'] = (c['css'].replace(".k{position:absolute;top:24px;font-family:'Inter Tight';font-weight:800;font-size:104px;", ".k{position:absolute;top:142px;font-family:'Inter Tight';font-weight:800;font-size:76px;")
        .replace('.k1{left:120px}.k2{left:700px}', '.k1{left:110px}.k2{left:700px}')
        .replace(".g{position:absolute;top:142px;font-family:'Inter Tight';font-weight:800;font-size:56px;", ".g{position:absolute;top:242px;font-family:'Inter Tight';font-weight:800;font-size:72px;")
        .replace('.g1{left:240px}.g2{left:840px}', '.g1{left:110px}.g2{left:700px}')
        .replace('.phone{top:236px;width:300px;height:615px}', '.phone{top:356px;width:300px;height:615px}')
        .replace('.ph1{left:170px;transform:rotate(-3deg)}.ph2{left:760px;transform:rotate(3deg)}', '.ph1{left:330px;transform:rotate(-8deg)}.ph2{left:930px;transform:rotate(8deg)}')
        + ".top{left:0;right:0;top:14px;text-align:center;font-family:'Inter Tight';font-weight:800;font-size:110px;line-height:1;letter-spacing:-.05em;color:#111111;z-index:4}\n")
    c['body'] = '<div class="a top nw" data-k="top"></div>\n' + c['body']

    # 06 ---------------------------------------------------------------------------------------------------------------------
    TICK = '<svg viewBox="0 0 84 84"><path d="M12 44 L34 66 L76 12" fill="none" stroke="#111" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    c = B['06']
    c.update(
 colours='Font 61 specimen: #F6D23A on its flat #2B2B2B; table = Font 58 specimen #111111 on #E9E7E3, the hot row in Font 61\'s yellow',
 direction='Flat dark ground (#2B2B2B), she on the left (shoot 1549, straight at the camera, hard-masked), a big pale table on the right: rows cookie / localStorage / sessionStorage, columns login / cart / form, one tick per row (the answer she gives in the video), the localStorage row lit yellow. WHAT GOES WHERE? in heavy yellow across the top.',
 text={'hd': 'WHAT GOES WHERE?', 'c1': 'login', 'c2': 'cart', 'c3': 'form', 'r1': 'cookie', 'r2': 'localStorage', 'r3': 'sessionStorage'},
 images={'me': S + '1549-hard.png'}, vars={'--ground': '#2B2B2B'},
 css=HER_CSS + '''
.hd{left:0;right:0;top:20px;text-align:center;font-family:'Montserrat';font-weight:900;font-size:104px;line-height:1;letter-spacing:-.03em;color:#F6D23A;z-index:5}
.tb{left:452px;top:150px;width:806px;background:#E9E7E3;border-radius:14px;padding:12px 22px 10px;font-family:'Inter Tight';color:#111111;z-index:4}
.tb table{width:100%;border-collapse:collapse}
.tb th{font-weight:800;font-size:44px;letter-spacing:-.04em;text-align:center;padding:2px 0 8px}
.tb td{border-top:4px solid #111;height:122px;text-align:center}
.tb td.r{text-align:left;font-weight:800;font-size:48px;letter-spacing:-.045em;white-space:nowrap;padding-right:10px}
.tb tr.hot td{background:#F6D23A}
.tb svg{width:80px;height:80px}
''',
 body=her('1549', -437, -87, 1260) + '''
<div class="a hd nw" data-k="hd"></div>
<div class="a tb" data-move="table"><table>
<tr><th></th><th data-k="c1"></th><th data-k="c2"></th><th data-k="c3"></th></tr>
<tr><td class="r" data-k="r1"></td><td>TICK</td><td></td><td></td></tr>
<tr class="hot"><td class="r" data-k="r2"></td><td></td><td>TICK</td><td></td></tr>
<tr><td class="r" data-k="r3"></td><td></td><td></td><td>TICK</td></tr>
</table></div>'''.replace('TICK', TICK))

    # 08 ---------------------------------------------------------------------------------------------------------------------
    c = B['08']
    c['text'] = dict(c['text'], tk='user: Ada<br>logged in: yes')
    c['direction'] = c['direction'].replace('"session_id=8f3a…" (a made-up example)', '"user: Ada / logged in: yes" (a plain made-up example)')
    c['css'] = c['css'].replace(".tk{left:300px;top:470px;", ".tk{left:250px;top:440px;line-height:1.15;")
    c['body'] = c['body'].replace('<div class="a tk nw" data-k="tk"></div>', '<div class="a tk" data-k="tk" style="white-space:nowrap"></div>')

    # 09 ---------------------------------------------------------------------------------------------------------------------
    c = B['09']
    c['direction'] = 'Her real room dimmed (shoot 1550, mid-explanation), she on the right. One line on top: HOW AM I STILL LOGGED IN? A generic browser window floats on the left: an avatar and "Hi, Ada / Welcome back", the thing a login cookie gives you.'
    c['vars'] = dict(c['vars'], **{'--pw': '1700px', '--pl': '-10px', '--pt': '-170px'})
    c['css'] = (c['css'].replace('.win{left:860px;top:250px;width:390px;', '.win{left:60px;top:220px;width:390px;')
                .replace('.win{transform:rotate(3deg) scale(1.15);transform-origin:100% 0}', '.win{transform:rotate(-3deg) scale(1.15);transform-origin:0 0}'))

    # 10 ---------------------------------------------------------------------------------------------------------------------
    c = B['10']
    c.update(
 board='Thumbnails 58 (yt-05 "FAVOR": one huge word across the frame in front of the creator\'s body, her face clear above it)',
 thumbnail_text='COOKIES',
 direction='Flat blue ground. She (shoot 1562, palm up at her chin, asking) fills the top half, hard-masked; COOKIES huge in black condensed caps across her chest, in front of her, all seven letters clear.',
 text={'hd': 'COOKIES'}, images={'me': S + '1562-hard.png'},
 css=HER_CSS + ".hd{left:0;right:0;top:420px;text-align:center;font-family:'Oswald';font-weight:700;font-size:262px;line-height:1;letter-spacing:.01em;color:#111111;z-index:4}\n",
 body=her('1562', -27, -234, 1440) + '\n<div class="a hd nw" data-k="hd"></div>')

    # 11 ---------------------------------------------------------------------------------------------------------------------
    D = lambda k, label, extra='': (f'<div class="dr d{k}" data-move="drawer{k}"><span data-k="d{k}"></span><i></i>{extra}</div>')
    B['11'] = dict(
 name='11-what-websites-store', kind='drawn', recommended=False,
 board='Thumbnails 52 (yt-80 "SECOND BRAIN": heavy words top-left on a flat ground, one big object below that shows the topic)',
 fonts='Font 54 (shorts-20: Satoshi Black Italic, white on #1B2440, Formats 57) + Font 58 (Inter Tight, black on light) on the drawers',
 colours='Font 54 specimen: #FFFFFF on #1B2440; drawers = Font 58 #111111 on #E9E7E3',
 thumbnail_text='what websites store in your browser',
 direction='No face. Navy ground, the words top-left in heavy white italic. Below, a big generic browser window that is a chest of three drawers: cookies (pulled open, a real cookie inside), localStorage, sessionStorage.',
 titles=['What Websites Store in Your Browser (Cookies, localStorage, sessionStorage)',
         'Cookies, localStorage and sessionStorage Explained Simply',
         T_MAIN],
 text={'hd': 'what websites store<br>in your browser', 'u': 'your browser', 'd1': 'cookies', 'd2': 'localStorage', 'd3': 'sessionStorage'},
 images={'obj': CL + 'cookie-clean.png'},
 vars={'--ground': '#1B2440'},
 css='''
.hd{left:56px;top:30px;font-family:'Satoshi';font-style:italic;font-weight:900;font-size:92px;line-height:1;letter-spacing:-.03em;color:#FFFFFF}
.win{left:300px;top:250px;width:900px;height:520px;background:#F2F1EE;border-radius:20px;z-index:2}
.dr{position:absolute;left:340px;width:820px;height:118px;background:#E9E7E3;border:5px solid #111111;border-radius:14px;font-family:'Inter Tight';font-weight:800;font-size:52px;letter-spacing:-.04em;color:#111111;padding:22px 34px;z-index:3}
.dr i{position:absolute;right:40px;top:44px;width:110px;height:22px;border-radius:11px;background:#111111}
.d1{top:330px;left:300px;width:900px;transform:translateY(-6px);box-shadow:0 18px 30px rgba(0,0,0,.35);z-index:4}
.d2{top:470px}.d3{top:600px}
.obj{left:560px;top:250px;width:150px;z-index:3}
''',
 body='''
<div class="a hd nw" data-k="hd"></div>
<div class="win" data-move="window"><div class="bar"><i></i><i></i><i></i><div class="url" data-k="u"></div></div></div>
<img class="a obj" data-img="obj" data-move="cookie" src="../../assets/collage/cookie-clean.png" alt="">
''' + D(1, '') + D(2, '') + D(3, ''))

    # 12 ---------------------------------------------------------------------------------------------------------------------
    c = B['12']
    c['thumbnail_text'] = 'Close the tab. What\'s left? (cookies, localStorage, sessionStorage)'
    c['direction'] = 'No face. Light grey ground: a browser tab with its close X at the top left, under it a list with hand-drawn marks: still logged in (tick), cart still there (tick), half-typed form (red cross, struck in red). On the right one serif line, Close the tab. What\'s left?, and the three names under it.'
    c['text'] = dict(c['text'], tab='shop.example', sub='cookies, localStorage,<br>sessionStorage')
    c['css'] = (c['css'].replace('.list{left:70px;top:150px;', '.list{left:70px;top:190px;')
        .replace('.row.gone span{text-decoration:line-through;text-decoration-thickness:5px;color:#6b6a68}', '.row.gone span{text-decoration:line-through;text-decoration-thickness:5px;color:#B3121A}')
        .replace('margin-bottom:62px', 'margin-bottom:54px')
        + ".tab{left:70px;top:56px;display:flex;align-items:center;gap:22px;background:#FFFFFF;border-radius:16px 16px 0 0;padding:16px 26px;font-family:'Inter Tight';font-weight:700;font-size:38px;color:#111111;box-shadow:0 10px 24px rgba(0,0,0,.08)}\n"
        + ".tab svg{width:40px;height:40px}\n"
        + ".sub{left:770px;top:560px;font-family:'Libre Baskerville';font-weight:700;font-size:36px;line-height:1.2;color:#B3121A}\n")
    c['body'] = ('<div class="a tab nw" data-move="tab"><span data-k="tab"></span><svg viewBox="0 0 40 40"><path d="M8 8 L32 32 M32 8 L8 32" stroke="#111111" stroke-width="6" stroke-linecap="round"/></svg></div>\n'
                 + c['body'] + '\n<div class="a sub nw" data-k="sub"></div>')

    # 13 ---------------------------------------------------------------------------------------------------------------------
    c = B['13']
    c.update(
 board='Thumbnails 13 (pin-01-13 "LOCKED / FOCUS": the creator centred, two words in the top corners) on a split ground like Thumbnails 55 (yt-02 before / after)',
 colours='Font 56 specimen: #FFFFFF words; ground split in its two box colours, #1A1A1A left and #D9262B right',
 thumbnail_text='COOKIES vs LOCALSTORAGE',
 direction='Ground split down the middle: black left, red right. She stands centred across the split (shoot 1558, amused, eyebrows up; hard-masked). COOKIES on the black half, LOCALSTORAGE on the red half, "vs" between them, all white Anton above her head.',
 text={'w1': 'COOKIES', 'or': 'vs', 'w2': 'LOCALSTORAGE'}, images={'me': S + '1558-hard.png'}, vars={'--ground': '#1A1A1A'},
 css=HER_CSS + '''
.half{left:640px;top:0;width:640px;height:720px;background:#D9262B;z-index:1}
.w{position:absolute;top:28px;font-family:'Anton';font-size:112px;line-height:1;letter-spacing:.005em;color:#FFFFFF;z-index:5}
.w1{left:44px}.w2{right:34px}
.or{left:464px;top:62px;font-family:'Anton';font-size:76px;color:#FFFFFF;z-index:5}
''',
 body='<div class="a half"></div>\n' + her('1558', -62, -72, 1404) + '''
<div class="w w1 nw" data-k="w1"></div><div class="a or nw" data-k="or"></div><div class="w w2 nw" data-k="w2"></div>''')

    return [B[k] for k in ('01', '03', '05', '06', '08', '09', '10', '11', '12', '13')]
