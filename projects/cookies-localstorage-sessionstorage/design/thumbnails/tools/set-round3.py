# Round 3 (2026-11-13, after the fresh critic's round 2): patches round 2 (tools/set-round2.py) and drops 07 (mic in both halves,
# halves look the same) and 10 (same cookie + cart + form trio as 02, no stakes).
import importlib.util, os
_here = os.path.dirname(os.path.abspath(__file__))
_sp = importlib.util.spec_from_file_location('r2', os.path.join(_here, 'set-round2.py'))
_r2 = importlib.util.module_from_spec(_sp); _sp.loader.exec_module(_r2)

def blocks(S, PX, CL, photo, T_MAIN):
    B = {d['name'][:2]: d for d in _r2.blocks(S, PX, CL, photo, T_MAIN)}

    B['01'].update(
 kind='cut-out',
 board='Thumbnails 101 (yt-48 "Do THIS After Work": one question across the top, the creator centred below it, nothing else)',
 colours='Font 57 specimen: ground #1C1C1C, words #FFFFFF, highlight #F7D51D with #111111 words',
 direction='Flat near-black ground (the specimen\'s #1C1C1C), the question as one centred block on top: "why is my cart" and "still here?" on the yellow highlight. Her cut-out centred below (shoot 1557, calm, straight at the camera), a real shopping cart (Pexels) beside her on the left.',
 text={'hd': 'why is my cart<br><span class="hl">still here?</span>'},
 images={'cut': S + '1557-cut-clean.png', 'obj': CL + 'cart-yellow.png'},
 vars={'--ground': '#1C1C1C'},
 css='''
.hd{left:0;right:0;top:26px;text-align:center;font-family:'Inter Tight';font-weight:700;font-size:112px;line-height:1.06;letter-spacing:-.05em;color:#FFFFFF;z-index:5}
.hd .hl{background:#F7D51D;color:#111111;padding:0 18px 8px}
.cut{left:190px;width:960px;bottom:-300px}
.obj{left:14px;top:330px;width:276px;z-index:4;filter:drop-shadow(0 16px 24px rgba(0,0,0,.5))}
''',
 body='''
<img class="cut z2" data-img="cut" data-move="cut" src="../../assets/shoot/1557-cut-clean.png" alt="">
<div class="a hd nw" data-k="hd"></div>
<img class="a obj" data-img="obj" data-move="cart" src="../../assets/collage/cart-yellow.png" alt="">''')

    B['02'].update(
 board='Thumbnails 116 (yt-63, the lower one "IT\'S OVER": a big two-word line on top, the creator centred under it with one expressive gesture)',
 thumbnail_text='WHICH ONE? cookies vs localStorage vs sessionStorage',
 direction='Flat yellow ground. WHICH ONE? huge in red, under it the three names people search for, in red: cookies vs localStorage vs sessionStorage. Her cut-out centred below (shoot 1562, palm up, asking). No props.',
 text={'hd': 'WHICH ONE?', 'sub': 'cookies vs localStorage vs sessionStorage'},
 images={'cut': S + '1562-cut-clean.png'},
 css='''
.hd{left:0;right:0;top:10px;text-align:center;font-family:'Archivo Black';font-size:160px;line-height:1;letter-spacing:-.03em;color:#E2262B;z-index:5}
.sub{left:0;right:0;top:186px;text-align:center;font-family:'Archivo Black';font-size:47px;letter-spacing:-.03em;color:#E2262B;z-index:5}
.cut{left:300px;width:700px;bottom:-110px}
''',
 body='''
<img class="cut z3" data-img="cut" data-move="cut" src="../../assets/shoot/1562-cut-clean.png" alt="">
<div class="a hd nw" data-k="hd"></div>
<div class="a sub nw" data-k="sub"></div>''')

    c = B['03']
    c['direction'] = c['direction'].replace('an open padlock drawn under them.', 'a big open padlock drawn under "private" (the second thing you see).')
    c['css'] = c['css'].replace('.lock{left:90px;top:370px;width:250px;height:290px}', '.lock{left:70px;top:350px;width:300px;height:348px}')

    c = B['04']
    c['titles'] = ['Why Websites Need Cookies (Explained Simply)', 'What Are Browser Cookies? How Websites Remember You', T_MAIN]
    c['images'] = {'cut': S + '1559-cut-clean.png', 'obj': CL + 'cookie-clean.png'}
    c['css'] = (c['css'].replace('.cut{left:180px;width:880px;bottom:-250px}', '.cut{left:210px;width:860px;bottom:-310px}').replace("top:-34px;text-align:center;font-family:'Inter Tight';font-weight:900;font-size:340px", "top:-40px;text-align:center;font-family:'Inter Tight';font-weight:900;font-size:272px")
                .replace(".sub{left:40px;top:560px;", ".sub{left:0;right:0;margin:0 auto;width:max-content;top:232px;").replace('font-size:60px;letter-spacing:-.04em;color:#F5F5F4', 'font-size:56px;letter-spacing:-.04em;color:#F5F5F4')
                .replace('.obj{left:90px;top:330px;width:230px;', '.obj{left:990px;top:400px;width:240px;'))
    c['direction'] = 'Off-white ground, "cookies" huge in black lowercase across the top, a black block under it says which cookies: "(the browser kind)". Her cut-out centred below (shoot 1559, palm out, presenting), a real cookie beside her.'
    c['images'] = {'cut': S + '1559-person.png', 'obj': CL + 'cookie-clean.png'}
    c['css'] = c['css'] + ".cut{left:157px;top:100px;width:967px;bottom:auto}\n.obj{left:770px;top:540px;width:190px;z-index:4;transform:rotate(-8deg)}\n.hd{font-size:250px !important;top:-30px !important}\n.sub{top:212px !important}\n"
    c['direction'] = 'Off-white ground, "cookies" huge in black lowercase across the top, a black block under it says which cookies: "(the browser kind)". She stands centred below (shoot 1559, palm up, presenting) with a real cookie on her open palm.'
    c['body'] = c['body'].replace('collage/cookie.png', 'collage/cookie-clean.png').replace('1559-cut-clean.png', '1559-person.png')

    c = B['05']
    c['direction'] = 'No face. Two phones with the same checkout form: under "refresh" it is still filled in ("kept"), under "close tab" the same fields are empty ("gone"). Labels on yellow highlights. Generic form, no shop.'
    c['text'] = dict(c['text'], g1='kept', g2='gone')
    c['css'] = (c['css'].replace('.x{left:690px;top:250px;width:440px;height:440px;z-index:6}', '')
                .replace(".k{position:absolute;top:40px;", ".k{position:absolute;top:24px;")
                .replace('.phone{top:190px;width:300px;height:615px}', '.phone{top:236px;width:300px;height:615px}')
                + ".g{position:absolute;top:142px;font-family:'Inter Tight';font-weight:800;font-size:56px;line-height:1;letter-spacing:-.04em;color:#111111;background:#FFE600;padding:2px 14px 8px;z-index:4}\n.g1{left:240px}.g2{left:840px}\n")
    c['body'] = c['body'][:c['body'].index('<svg class="a x"')] + '<div class="g g1 nw" data-k="g1"></div><div class="g g2 nw" data-k="g2"></div>'

    c = B['06']
    c['direction'] = c['direction'].replace('columns cookie / local / session, one tick per row', 'columns cookie / localStorage / sessionStorage, one tick per row, the cart row lit yellow')
    c['text'] = dict(c['text'], c2='local<br>Storage', c3='session<br>Storage')
    c['css'] = (c['css'].replace('.tb{left:420px;top:156px;width:840px;', '.tb{left:466px;top:150px;width:800px;')
                .replace('.tb th{font-weight:800;font-size:46px;letter-spacing:-.04em;text-align:center;padding:4px 0 10px}', '.tb th{font-weight:800;font-size:40px;line-height:.95;letter-spacing:-.04em;text-align:center;padding:4px 0 10px}')
                .replace('height:124px', 'height:116px')
                + '.tb tr.hot td{background:#F6D23A}\n')
    c['body'] = c['body'].replace('<tr><td class="r" data-k="r2">', '<tr class="hot"><td class="r" data-k="r2">')

    c = B['08']
    c['titles'] = ['What\'s Actually Inside a Browser Cookie?', 'How Login Cookies Work: Session IDs Explained Simply', T_MAIN]
    c['images'] = {'obj': CL + 'cookie-pair-clean.png'}
    c['body'] = c['body'].replace('collage/cookie-pair.png', 'collage/cookie-pair-clean.png')

    c = B['09']
    c['thumbnail_text'] = 'HOW AM I STILL LOGGED IN?'
    c['fonts'] = 'Font 72 (thumbs-17: Inter Tight, white on #2B2420, Thumbnails 152)'
    c['direction'] = 'Her real room dimmed (shoot 1550, mid-explanation, hand up), she centred. One line on top: HOW AM I STILL LOGGED IN? A generic browser window floats beside her: an avatar and "Hi, Ada / Welcome back", the thing a login cookie gives you.'
    c['text'] = dict(c['text'], hd='HOW AM I STILL LOGGED IN?')
    c['vars'] = dict(c['vars'], **{'--pt': '-110px', '--pl': '-160px'})
    c['css'] = (c['css'].replace(".hd{left:0;right:0;top:20px;text-align:center;font-family:'Inter Tight';font-weight:700;font-size:96px;letter-spacing:-.05em;",
                                 ".hd{left:0;right:0;top:22px;text-align:center;font-family:'Inter Tight';font-weight:800;font-size:84px;letter-spacing:-.045em;")
                .replace('.win{left:830px;top:200px;width:410px;', '.win{left:860px;top:250px;width:390px;'))

    return [B[k] for k in ('01', '02', '03', '04', '05', '06', '08', '09')]
