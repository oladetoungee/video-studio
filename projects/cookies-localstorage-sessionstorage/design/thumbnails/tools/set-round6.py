# Round 6 (2026-11-13, targeted, after the final critic on round 5): 01 06 08 09 unchanged; 03 bigger panel rows; 05 12 13 rebuilt;
# 10 rebuilt (no face: a phone with a generic cookie banner); 11 dropped (could not reach 8).
import importlib.util, os
_here = os.path.dirname(os.path.abspath(__file__))
_sp = importlib.util.spec_from_file_location('r5', os.path.join(_here, 'set-round5.py'))
_r5 = importlib.util.module_from_spec(_sp); _sp.loader.exec_module(_r5)

def blocks(S, PX, CL, photo, T_MAIN):
    B = {d['name'][:2]: d for d in _r5.blocks(S, PX, CL, photo, T_MAIN)}

    # 03: rows 48 px, the card lower so "isn't" has air -----------------------------------------------------------------
    c = B['03']
    c['css'] = (c['css'].replace('.pnl{left:50px;top:340px;width:640px;', '.pnl{left:50px;top:372px;width:680px;')
                .replace('.pnl .rw{display:flex;font-size:42px;', '.pnl .rw{display:flex;font-size:50px;')
                .replace('.pnl .pt{color:#9C9A96;font-weight:700;font-size:30px;padding:16px 28px 4px}', '.pnl .pt{color:#9C9A96;font-weight:700;font-size:30px;padding:12px 28px 0}')
                .replace('.pnl .k{width:170px;padding:12px 28px;', '.pnl .k{width:190px;padding:6px 28px;')
                .replace('.pnl .v{padding:12px 10px;', '.pnl .v{padding:6px 10px;')
                .replace(".hd{left:56px;top:96px;", ".hd{left:56px;top:66px;"))

    # 05: one clear left / right, phones whole --------------------------------------------------------------------------------
    fm = lambda k, filled: ''.join(f'<div class="in{"" if filled else " e"}" data-k="v{k}{i}"></div>' for i in (1, 2, 3))
    ph = lambda k, inner: f'<div class="phone ph{k}" data-move="phone{k}"><div class="scr">{inner}</div></div>'
    c = B['05']
    c.update(
 thumbnail_text='sessionStorage: refresh = still there / close tab = gone',
 direction='No face. sessionStorage as the headline. Left: "refresh: still there" over a whole phone with the checkout form filled in. Right: "close tab: gone" (gone on red) over the same phone with the form empty. Generic form, no shop.',
 text={'top': 'sessionStorage', 'k1': 'refresh: <b>still there</b>', 'k2': 'close tab: <b class="red">gone</b>', 'h1': 'Checkout', 'h2': 'Checkout',
       'v11': 'Ada Okafor', 'v12': 'Tartu mnt 12', 'v13': 'Tallinn', 'v21': '&nbsp;', 'v22': '&nbsp;', 'v23': '&nbsp;', 'b1': 'Pay now', 'b2': 'Pay now'},
 css='''
.top{left:0;right:0;top:12px;text-align:center;font-family:'Inter Tight';font-weight:800;font-size:104px;line-height:1;letter-spacing:-.05em;color:#111111;z-index:4}
.k{position:absolute;top:136px;font-family:'Inter Tight';font-weight:700;font-size:54px;line-height:1;letter-spacing:-.04em;color:#111111;z-index:4;text-align:center;width:600px}
.k b{background:#FFE600;padding:0 12px 6px;font-weight:800}
.k b.red{background:#E5262A;color:#FFFFFF}
.k1{left:20px}.k2{left:660px}
.phone{top:218px;width:236px;height:484px}
.ph1{left:202px}.ph2{left:842px}
.scr{padding:52px 16px 0;font-family:'Inter Tight'}
.scr .h{font-weight:900;font-size:36px;letter-spacing:-.04em;margin-bottom:8px}
.scr .in{border-radius:9px;background:#EFEFEC;font-weight:700;font-size:26px;letter-spacing:-.03em;padding:10px 12px;margin-top:10px;height:50px;white-space:nowrap}
.scr .b{background:#111;color:#fff;border-radius:10px;font-weight:700;font-size:24px;text-align:center;padding:12px 0;margin-top:18px}
.mid{left:638px;top:236px;width:4px;height:440px;background:#111111;opacity:.15}
''',
 body='<div class="a top nw" data-k="top"></div>\n<div class="k k1 nw" data-k="k1"></div><div class="k k2 nw" data-k="k2"></div>\n<div class="a mid"></div>\n'
      + ph(1, '<div class="h" data-k="h1"></div>' + fm(1, True) + '<div class="b" data-k="b1"></div>') + '\n'
      + ph(2, '<div class="h" data-k="h2"></div>' + fm(2, False) + '<div class="b" data-k="b2"></div>'))

    # 10: why every website asks about cookies: a phone with a generic cookie banner, no face ---------------------------------
    B['10'] = dict(
 name='10-why-websites-ask-about-cookies', kind='object', recommended=False,
 board='Thumbnails 112 (yt-59 "Run AI Agents Locally": a heavy headline over one big device screen showing the thing, nothing else)',
 fonts='Font 67 (thumbs-12: Archivo Black, red on yellow, Thumbnails 89) + Font 58 (Inter Tight, black on light) on the phone',
 colours='Font 67 specimen: #E2262B on #F7F02B; phone screen #FFFFFF with #111111',
 thumbnail_text='why every website asks about cookies',
 direction='No face. Yellow ground, the question in heavy red on the left: why every website asks about cookies. On the right a big tilted phone with a generic shop page and the cookie banner everyone knows sliding up: "We use cookies" / Accept all / Reject.',
 titles=['Why Websites Need Cookies (Explained Simply)',
         'What Are Browser Cookies? Why Every Site Asks You to Accept Them',
         T_MAIN],
 text={'hd': 'why every<br>website<br>asks about<br>cookies', 'bt': 'We use cookies', 'bs': 'to keep you logged in and remember your cart.', 'b1': 'Accept all', 'b2': 'Reject'},
 images={},
 vars={'--ground': '#F7F02B'},
 css='''
.hd{left:56px;top:40px;font-family:'Archivo Black';font-size:112px;line-height:.98;letter-spacing:-.035em;color:#E2262B}
.phone{left:790px;top:46px;width:330px;height:676px;transform:rotate(6deg)}
.scr{font-family:'Inter Tight'}
.pg{position:absolute;inset:60px 18px auto 18px}
.pg i{display:block;height:120px;border-radius:14px;background:#EFEFEC;margin-bottom:14px}
.pg i.s{height:34px;width:70%}
.bn{position:absolute;left:0;right:0;bottom:0;background:#FFFFFF;border-radius:26px 26px 0 0;box-shadow:0 -10px 30px rgba(0,0,0,.18);padding:24px 22px 34px}
.bn .bt2{font-weight:900;font-size:36px;letter-spacing:-.04em}
.bn .s{font-weight:600;font-size:20px;color:#555;margin:6px 0 16px;line-height:1.25}
.bn .a1{background:#111;color:#fff;border-radius:12px;font-weight:800;font-size:28px;text-align:center;padding:14px 0}
.bn .a2{color:#111;font-weight:700;font-size:26px;text-align:center;padding:12px 0 0;text-decoration:underline}
''',
 body='''
<div class="a hd nw" data-k="hd"></div>
<div class="phone" data-move="phone"><div class="scr"><div style="position:absolute;inset:0;background:#FFFFFF"></div><div class="pg"><i class="s"></i><i></i><i></i></div>
<div class="bn"><div class="bt2" data-k="bt"></div><div class="s" data-k="bs"></div><div class="a1" data-k="b1"></div><div class="a2" data-k="b2"></div></div></div></div>''')

    # 12: a real-looking browser with the tab X, list inside, no subtitle -------------------------------------------------------
    T = '<svg viewBox="0 0 84 84"><path d="M12 44 L34 66 L76 12" fill="none" stroke="#111111" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    X = '<svg viewBox="0 0 84 84"><path d="M16 16 L68 68 M68 16 L16 68" fill="none" stroke="#B3121A" stroke-width="11" stroke-linecap="round"/></svg>'
    c = B['12']
    c.update(
 thumbnail_text='Close the tab. What\'s left?',
 direction='No face. Light grey ground. Left: a big generic browser window whose tab has a large close X (a cursor on it); inside, a list with hand-drawn marks: still logged in (tick), cart still there (tick), half-typed form (red cross, struck in red). Right: one serif line, Close the tab. What\'s left?',
 text={'hd': 'Close<br>the tab.<br>What&rsquo;s<br>left?', 'tab': 'shop.example', 'r1': 'still logged in', 'r2': 'cart still there', 'r3': 'half-typed form'},
 css='''
.bw{left:44px;top:56px;width:660px;height:600px;background:#FFFFFF;border-radius:20px;box-shadow:0 20px 44px rgba(0,0,0,.14);overflow:hidden}
.tabs{height:92px;background:#DAD9D6;display:flex;align-items:flex-end;padding:0 18px}
.tb2{display:flex;align-items:center;gap:26px;background:#FFFFFF;border-radius:16px 16px 0 0;padding:18px 26px;font-family:'Inter Tight';font-weight:700;font-size:36px;color:#111111}
.tb2 svg{width:48px;height:48px}
.list{left:84px;top:200px;font-family:'Libre Baskerville';font-weight:700;font-size:50px;letter-spacing:-.02em;color:#111111;line-height:1;z-index:3}
.row{display:flex;align-items:center;gap:24px;margin-bottom:46px}
.row svg{width:82px;height:82px;flex:none}
.row.gone span{text-decoration:line-through;text-decoration-thickness:5px;color:#B3121A}
.cur{left:372px;top:112px;width:64px;height:78px;z-index:4}
.hd{left:770px;top:70px;font-family:'Libre Baskerville';font-weight:700;font-size:112px;line-height:1.02;letter-spacing:-.03em;color:#111111}
''',
 body=f'''
<div class="a bw" data-move="browser"><div class="tabs"><div class="tb2 nw"><span data-k="tab"></span><svg viewBox="0 0 40 40"><path d="M8 8 L32 32 M32 8 L8 32" stroke="#111111" stroke-width="6" stroke-linecap="round"/></svg></div></div></div>
<svg class="a cur" data-move="cursor" viewBox="0 0 32 40"><path d="M2 2 L2 32 L10 25 L16 38 L21 36 L15 23 L26 23 Z" fill="#111111" stroke="#FFFFFF" stroke-width="2.5" stroke-linejoin="round"/></svg>
<div class="a list" data-move="list">
 <div class="row nw">{T}<span data-k="r1"></span></div>
 <div class="row nw">{T}<span data-k="r2"></span></div>
 <div class="row gone nw">{X}<span data-k="r3"></span></div>
</div>
<div class="a hd nw" data-k="hd"></div>''')

    # 13: no face now: one object per side ------------------------------------------------------------------------------------
    c = B['13']
    c.update(
 kind='split',
 colours='Font 56 specimen: #FFFFFF words; ground split in its two box colours, #1A1A1A left and #D9262B right; tags in Font 63 (JetBrains Mono, black on light)',
 fonts='Font 56 (thumbs-01: Anton, Thumbnails 10) + Font 63 (thumbs-08: JetBrains Mono ExtraBold) on the tags',
 direction='No face. Ground split down the middle: black left, red right. COOKIES on the black half, LOCALSTORAGE on the red half, a big "vs" on the line. Under each one real thing: a cookie with a paper tag "user: Ada" (what a cookie carries), a shop cart with a tag "cart: 2 items" (what localStorage keeps).',
 text={'w1': 'COOKIES', 'or': 'vs', 'w2': 'LOCALSTORAGE', 't1': 'user: Ada', 't2': 'cart: 2 items'},
 images={'o1': CL + 'cookie-pair-clean.png', 'o2': CL + 'cart-yellow-clean.png'},
 css='''
.half{left:640px;top:0;width:640px;height:720px;background:#D9262B;z-index:1}
.w{position:absolute;top:38px;font-family:'Anton';font-size:104px;line-height:1;letter-spacing:.005em;color:#FFFFFF;z-index:5}
.w1{left:120px}.w2{right:44px}
.or{left:586px;top:250px;width:108px;height:108px;border-radius:50%;background:#FFFFFF;color:#1A1A1A;font-family:'Anton';font-size:84px;line-height:100px;text-align:center;z-index:6}
.o1{left:40px;top:250px;width:540px;z-index:3;filter:drop-shadow(0 18px 26px rgba(0,0,0,.5))}
.o2{left:790px;top:220px;width:380px;z-index:3;filter:drop-shadow(0 18px 26px rgba(0,0,0,.35))}
.tg{position:absolute;background:#F2F1EE;color:#111111;font-family:'JetBrains Mono';font-weight:800;font-size:52px;padding:12px 24px;box-shadow:0 10px 22px rgba(0,0,0,.35);z-index:4}
.t1{left:90px;top:560px;transform:rotate(-4deg)}.t2{left:770px;top:580px;transform:rotate(3deg)}
''',
 body='''<div class="a half"></div>
<div class="w w1 nw" data-k="w1"></div><div class="a or nw" data-k="or"></div><div class="w w2 nw" data-k="w2"></div>
<img class="a o1" data-img="o1" data-move="cookie" src="../../assets/collage/cookie-pair-clean.png" alt="">
<img class="a o2" data-img="o2" data-move="cart" src="../../assets/collage/cart-yellow-clean.png" alt="">
<div class="tg t1 nw" data-k="t1"></div><div class="tg t2 nw" data-k="t2"></div>''')

    return [B[k] for k in ('01', '03', '05', '06', '08', '09', '10', '12', '13')]
