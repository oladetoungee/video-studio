# Round 2 (2026-11-13, after the fresh cold critic: none 8+ alone; 5 side splits; same hand-on-cheek pose 4x; 03/07 both "is it safe").
# Loaded by make-set-2026-11-13.py: blocks(S, PX, CL, photo, T_MAIN) -> list of directions (same keys as SET entries).
def blocks(S, PX, CL, photo, T_MAIN):
    B = []
    phone = lambda k, inner, extra='': f'<div class="phone ph{k}" data-move="phone{k}"{extra}><div class="scr">{inner}</div></div>'

    # 01 ------------------------------------------------------------------------------------------------------------
    B.append(dict(
 name='01-cart-still-here', kind='photo', recommended=True,
 board='Thumbnails 72 (yt-19 "YOU\'RE NOT ORDINARY", one of her likes: the creator centred in her real room, two short phrases flanking her head left and right)',
 fonts='Font 57 (thumbs-02: Inter Tight Bold, white + yellow highlight on #1C1C1C, Thumbnails 21)',
 colours='Font 57 specimen: #FFFFFF words, highlight #F7D51D with #111111 words, room dimmed to near #1C1C1C',
 thumbnail_text='why is my cart / still here?',
 direction='Her real room dimmed dark (shoot 1557, calm, straight at the camera), she centred and natural. The question splits around her head: "why is my cart" on the left, "still here?" on a yellow highlight on the right. A real shopping cart (Pexels) sits low on the left: the online cart everyone comes back to.',
 titles=['localStorage Explained: Why Your Cart Is Still There',
         'How Websites Remember Your Cart (localStorage vs Cookies)',
         T_MAIN],
 text={'l': 'why is<br>my cart', 'r': '<span class="hl">still</span><br><span class="hl">here?</span>'},
 images={'room': S + '1557.jpg', 'me': S + '1557-person.png', 'obj': CL + 'cart-yellow.png'},
 vars={'--pw': '1400px', '--pl': '-60px', '--pt': '-205px', '--dim': 'rgba(18,18,18,.55)'},
 css='''
.l,.r{top:90px;font-family:'Inter Tight';font-weight:700;font-size:112px;line-height:1;letter-spacing:-.05em;color:#FFFFFF;z-index:5}
.l{left:40px;text-align:left}
.r{right:40px;text-align:right}
.r .hl{background:#F7D51D;color:#111111;padding:0 14px 6px;display:inline-block;margin-bottom:10px}
.obj{left:70px;top:330px;width:250px;z-index:4;filter:drop-shadow(0 16px 24px rgba(0,0,0,.45))}
''',
 body=photo('1557') + '''
<div class="a l sh nw" data-k="l"></div>
<div class="a r nw" data-k="r"></div>
<img class="a obj" data-img="obj" data-move="cart" src="../../assets/collage/cart-yellow.png" alt="">'''))

    # 02 ------------------------------------------------------------------------------------------------------------
    B.append(dict(
 name='02-which-one', kind='cut-out', recommended=False,
 board='Thumbnails 123 (yt-70 "upgrade your life with neuroplasticity": the creator centred, real objects of the topic around her, one line on top)',
 fonts='Font 67 (thumbs-12: Archivo Black, red on yellow, Thumbnails 89)',
 colours='Font 67 specimen: #E2262B on #F7F02B',
 thumbnail_text='WHICH ONE? (cookies / localStorage / sessionStorage)',
 direction='Flat yellow ground, her cut-out centred (shoot 1562, palm up: "which one?"). Around her the three things a browser keeps, as objects with their names in red: a real cookie (cookies), a real shop cart (localStorage), a half-filled form card (sessionStorage). WHICH ONE? huge in red on top.',
 titles=['Cookies vs localStorage vs sessionStorage: Which One to Use?',
         T_MAIN,
         'Where Websites Store Your Data (Cookies, localStorage, sessionStorage)'],
 text={'hd': 'WHICH ONE?', 't1': 'cookies', 't2': 'localStorage', 't3': 'sessionStorage', 'f1': 'Ada Okafor', 'f2': 'Tartu mnt 1'},
 images={'cut': S + '1562-cut-clean.png', 'o1': CL + 'cookie-pair.png', 'o2': CL + 'cart-navy.png'},
 vars={'--ground': '#F7F02B'},
 css='''
.hd{left:0;right:0;top:14px;text-align:center;font-family:'Archivo Black';font-size:150px;line-height:1;letter-spacing:-.03em;color:#E2262B;z-index:5}
.cut{left:330px;width:680px;bottom:-60px}
.tg{font-family:'Archivo Black';font-size:40px;letter-spacing:-.03em;color:#E2262B;z-index:5;line-height:1}
.t1{left:56px;top:196px}.t2{right:40px;top:196px}.t3{left:34px;top:432px}
.o1{left:20px;top:236px;width:310px;z-index:4}
.o2{right:30px;top:258px;width:290px;z-index:4}
.fc{left:40px;top:484px;width:290px;color:#111;background:#fff;border-radius:16px;padding:18px 20px;z-index:4;box-shadow:0 12px 26px rgba(0,0,0,.18);font-family:'Inter Tight'}
.fc div{background:#EFEFEC;border-radius:9px;font-weight:700;font-size:30px;letter-spacing:-.03em;padding:10px 14px;margin:6px 0}
.fc div.e{color:transparent}
''',
 body='''
<img class="cut z3" data-img="cut" data-move="cut" src="../../assets/shoot/1562-cut-clean.png" alt="">
<div class="a hd nw" data-k="hd"></div>
<img class="a o1" data-img="o1" data-move="cookie" src="../../assets/collage/cookie-pair.png" alt="">
<img class="a o2" data-img="o2" data-move="cart" src="../../assets/collage/cart-navy.png" alt="">
<div class="a fc" data-move="form"><div data-k="f1"></div><div data-k="f2"></div><div class="e">.</div></div>
<div class="a tg t1 nw" data-k="t1"></div><div class="a tg t2 nw" data-k="t2"></div><div class="a tg t3 nw" data-k="t3"></div>'''))

    # 03 ------------------------------------------------------------------------------------------------------------
    B.append(dict(
 name='03-localstorage-isnt-private', kind='cut-out', recommended=False,
 board='Thumbnails 31 (pin-03-02 "no one cares.": pale grey ground, two lines of black lowercase sans on the left, the speaker large on the right)',
 fonts='Font 58 (thumbs-03: Inter Tight, #111111 on #E9E7E3, the type of Thumbnails 31 itself; set at 600 for weight)',
 colours='Font 58 specimen: #111111 on #E9E7E3 (the open padlock drawn in the same ink)',
 thumbnail_text='localStorage isn\'t private.',
 direction='Pale grey ground, her cut-out large on the right (shoot 1554, hand on her chin, unconvinced), cropped above the microphone. Two lines of calm black lowercase on the left, an open padlock drawn under them.',
 titles=['Is localStorage Safe? Who Can Read Your Data',
         'localStorage vs Cookies: Which Is More Secure?',
         T_MAIN],
 text={'hd': 'localStorage<br>isn&rsquo;t private.'},
 images={'cut': S + '1554-cut-clean.png'},
 vars={'--ground': '#E9E7E3'},
 css='''
.hd{left:56px;top:96px;font-family:'Inter Tight';font-weight:600;font-size:122px;line-height:.98;letter-spacing:-.06em;color:#111111}
.cut{right:-200px;width:960px;bottom:-330px}
.lock{left:90px;top:370px;width:250px;height:290px}
''',
 body='''
<img class="cut z2" data-img="cut" data-move="cut" src="../../assets/shoot/1554-cut-clean.png" alt="">
<div class="a hd z4 nw" data-k="hd"></div>
<svg class="a lock z4" data-move="padlock" viewBox="0 0 250 290"><path d="M62 140 V 86 C 62 30, 168 14, 182 70" fill="none" stroke="#111111" stroke-width="26" stroke-linecap="round"/><rect x="16" y="130" width="218" height="150" rx="26" fill="#111111"/><circle cx="125" cy="196" r="20" fill="#E9E7E3"/><rect x="116" y="200" width="18" height="44" rx="6" fill="#E9E7E3"/></svg>'''))

    # 04 ------------------------------------------------------------------------------------------------------------
    B.append(dict(
 name='04-cookies-the-browser-kind', kind='cut-out', recommended=False,
 board='Thumbnails 7 (pin-01-07 "COOK": one huge black word across a pale frame, the person in the middle in front of it)',
 fonts='Font 10 (design-10: Inter Tight 900 black on off-white, with its small plain line, Design 378)',
 colours='Font 10 specimen: #030502 on #F5F5F4 (the small line reversed: #F5F5F4 on a #030502 block)',
 thumbnail_text='cookies (the browser kind)',
 direction='Off-white ground, "cookies" huge in black lowercase across the top; her cut-out (shoot 1559, palm out, presenting) in front of the lower edge of the word, a real cookie on her open palm. A black block says which cookies: "(the browser kind)".',
 titles=['What Are Browser Cookies? How Websites Remember You',
         'Why Websites Need Cookies (Explained Simply)',
         T_MAIN],
 text={'hd': 'cookies', 'sub': '(the browser kind)'},
 images={'cut': S + '1559-cut-clean.png', 'obj': CL + 'cookie.png'},
 vars={'--ground': '#F5F5F4'},
 css='''
.hd{left:0;right:0;top:-34px;text-align:center;font-family:'Inter Tight';font-weight:900;font-size:340px;line-height:1;letter-spacing:-.07em;color:#030502;z-index:1}
.sub{left:40px;top:560px;font-family:'Inter Tight';font-weight:800;font-size:60px;letter-spacing:-.04em;color:#F5F5F4;background:#030502;padding:8px 22px 14px;z-index:5}
.cut{left:180px;width:880px;bottom:-250px}
.obj{left:90px;top:330px;width:230px;z-index:4;filter:drop-shadow(0 14px 20px rgba(0,0,0,.3))}
''',
 body='''
<div class="a hd nw" data-k="hd"></div>
<img class="cut z2" data-img="cut" data-move="cut" src="../../assets/shoot/1559-cut-clean.png" alt="">
<img class="a obj" data-img="obj" data-move="cookie" src="../../assets/collage/cookie.png" alt="">
<div class="a sub nw" data-k="sub"></div>'''))

    # 05 ------------------------------------------------------------------------------------------------------------
    fm = lambda k, filled: ''.join(f'<div class="in{"" if filled else " e"}" data-k="v{k}{i}"></div>' for i in (1, 2, 3))
    B.append(dict(
 name='05-refresh-vs-close-tab', kind='flat', recommended=False,
 board='Thumbnails 69 (yt-16 "12:30 PM / 7:30 PM": two pictures side by side, a short label on top of each, the same thing at two moments)',
 fonts='Font 49 (shorts-15: Inter Tight 800 black on a yellow highlight, on off-white, Formats 65)',
 colours='Font 49 specimen: #111111 on highlight #FFE600, ground #F7F7F5 (the X in the same black)',
 thumbnail_text='refresh / close tab',
 direction='No face. Two phones with the same checkout form: under "refresh" it is still filled in, under "close tab" the fields are empty and a big hand-drawn X says it is gone. Labels on yellow highlights. Generic form, no shop.',
 titles=['sessionStorage: Why Your Form Disappears When You Close the Tab',
         'sessionStorage vs localStorage: What Survives a Closed Tab?',
         T_MAIN],
 text={'k1': 'refresh', 'k2': 'close tab', 'h1': 'Checkout', 'h2': 'Checkout',
       'v11': 'Ada Okafor', 'v12': 'Tartu mnt 12', 'v13': 'Tallinn', 'v21': '&nbsp;', 'v22': '&nbsp;', 'v23': '&nbsp;', 'b1': 'Pay now', 'b2': 'Pay now'},
 images={},
 vars={'--ground': '#F7F7F5'},
 css='''
.k{position:absolute;top:40px;font-family:'Inter Tight';font-weight:800;font-size:104px;line-height:1;letter-spacing:-.05em;color:#111111;background:#FFE600;padding:4px 22px 14px;z-index:4}
.k1{left:120px}.k2{left:700px}
.phone{top:190px;width:300px;height:615px}
.ph1{left:170px;transform:rotate(-3deg)}.ph2{left:760px;transform:rotate(3deg)}
.scr{padding:64px 22px 0;font-family:'Inter Tight'}
.scr .h{font-weight:900;font-size:44px;letter-spacing:-.04em;margin-bottom:12px}
.scr .in{border-radius:10px;background:#EFEFEC;font-weight:700;font-size:32px;letter-spacing:-.03em;padding:12px 14px;margin-top:12px;height:62px;white-space:nowrap}
.scr .b{background:#111;color:#fff;border-radius:12px;font-weight:700;font-size:30px;text-align:center;padding:14px 0;margin-top:22px}
.x{left:690px;top:250px;width:440px;height:440px;z-index:6}
''',
 body='<div class="k k1 nw" data-k="k1"></div><div class="k k2 nw" data-k="k2"></div>\n'
      + phone(1, '<div class="h" data-k="h1"></div>' + fm(1, True) + '<div class="b" data-k="b1"></div>') + '\n'
      + phone(2, '<div class="h" data-k="h2"></div>' + fm(2, False) + '<div class="b" data-k="b2"></div>') + '''
<svg class="a x" data-move="x" viewBox="0 0 440 440"><path d="M70 64 C 170 170, 270 270, 376 380 M 372 70 C 270 170, 170 270, 64 372" fill="none" stroke="#111111" stroke-width="40" stroke-linecap="round"/></svg>'''))

    # 06 ------------------------------------------------------------------------------------------------------------
    TICK = '<svg viewBox="0 0 84 84"><path d="M12 44 L34 66 L76 12" fill="none" stroke="#111" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/></svg>'
    B.append(dict(
 name='06-what-goes-where', kind='photo', recommended=False,
 board='Thumbnails 63 (yt-10 "SAVE 4 HOURS A DAY": the creator in front of a big ticked table, heavy yellow caps across the top)',
 fonts='Font 61 (thumbs-06: Montserrat Black, yellow on dark, Thumbnails 58) + Font 58 (thumbs-03: Inter Tight, black on pale grey) in the table',
 colours='Font 61 specimen: #F6D23A on #2B2B2B (her room dimmed to it); table = Font 58 specimen #111111 on #E9E7E3',
 thumbnail_text='WHAT GOES WHERE?',
 direction='Her room dimmed dark, she on the left (shoot 1549, straight at the camera), a big pale table filling the right: rows login / cart / form, columns cookie / local / session, one tick per row (the answer she gives in the video). WHAT GOES WHERE? in heavy yellow across the top.',
 titles=[T_MAIN,
         'Cookies vs localStorage vs sessionStorage: Which One to Use?',
         'Where Online Shops Keep Your Login, Cart and Form'],
 text={'hd': 'WHAT GOES WHERE?', 'c1': 'cookie', 'c2': 'local', 'c3': 'session', 'r1': 'login', 'r2': 'cart', 'r3': 'form'},
 images={'room': S + '1549.jpg', 'me': S + '1549-person.png'},
 vars={'--pw': '1500px', '--pl': '-560px', '--pt': '-170px', '--dim': 'rgba(20,20,20,.7)'},
 css='''
.hd{left:0;right:0;top:22px;text-align:center;font-family:'Montserrat';font-weight:900;font-size:106px;line-height:1;letter-spacing:-.03em;color:#F6D23A;z-index:5}
.tb{left:420px;top:156px;width:840px;background:#E9E7E3;border-radius:14px;padding:14px 26px 10px;font-family:'Inter Tight';color:#111111;z-index:4}
.tb table{width:100%;border-collapse:collapse}
.tb th{font-weight:800;font-size:46px;letter-spacing:-.04em;text-align:center;padding:4px 0 10px}
.tb td{border-top:4px solid #111;height:124px;text-align:center}
.tb td.r{text-align:left;font-weight:800;font-size:58px;letter-spacing:-.04em;width:170px}
.tb svg{width:86px;height:86px}
''',
 body=photo('1549') + '''
<div class="a hd sh nw" data-k="hd"></div>
<div class="a tb" data-move="table"><table>
<tr><th></th><th data-k="c1"></th><th data-k="c2"></th><th data-k="c3"></th></tr>
<tr><td class="r" data-k="r1"></td><td>TICK</td><td></td><td></td></tr>
<tr><td class="r" data-k="r2"></td><td></td><td>TICK</td><td></td></tr>
<tr><td class="r" data-k="r3"></td><td></td><td></td><td>TICK</td></tr>
</table></div>'''.replace('TICK', TICK)))

    # 07 ------------------------------------------------------------------------------------------------------------
    cart = lambda k: ('<div class="h" data-k="h' + k + '"></div>'
        + f'<div class="it"><img data-img="i{k}" src="../../assets/collage/cookie.png" alt=""><span data-k="a{k}"></span></div>'
        + f'<div class="it"><img data-img="j{k}" src="../../assets/collage/cart-yellow.png" alt=""><span data-k="b{k}"></span></div>'
        + f'<div class="b" data-k="c{k}"></div>')
    B.append(dict(
 name='07-cart-today-tomorrow', kind='split', recommended=False,
 board='Thumbnails 67 (yt-14 "DAY 1 / DAY 900": two photos of the same person side by side, one big caps label at the bottom of each)',
 fonts='Font 51 (shorts-17: Oswald caps, white + mint key word on #2E2E33, Formats 20) + Font 58 (Inter Tight, black on light) on the phones',
 colours='Font 51 specimen: #FFFFFF and #7FF0C0 on #2E2E33 (label plates)',
 thumbnail_text='TODAY / TOMORROW (the same cart)',
 direction='Two photos of her side by side (shoot 1553 smiling, 1558 amused), each holding up the same phone with the same shop cart (2 items). Label plates at the bottom: TODAY and TOMORROW (mint). The cart that is still there the next day.',
 titles=['localStorage Explained: Why Your Cart Is Still There',
         'How Websites Remember Your Cart (localStorage vs Cookies)',
         T_MAIN],
 text={'l1': 'TODAY', 'l2': 'TOMORROW', 'h1': 'Your cart (2)', 'h2': 'Your cart (2)', 'a1': 'Cookies', 'b1': 'Toy cart', 'a2': 'Cookies', 'b2': 'Toy cart', 'c1': 'Checkout', 'c2': 'Checkout'},
 images={'p1': S + '1553.jpg', 'p2': S + '1558.jpg'},
 vars={'--ground': '#2E2E33'},
 css='''
.pn{position:absolute;top:0;height:720px;width:636px;overflow:hidden}
.pn img{position:absolute;display:block}
.pa{left:0}.pb{left:644px}
.pa img{width:1250px;left:-350px;top:-150px}
.pb img{width:1250px;left:-370px;top:-150px}
.lb{bottom:60px;font-family:'Oswald','Anton';font-weight:700;font-size:86px;line-height:1;letter-spacing:.01em;background:#2E2E33;color:#FFFFFF;padding:8px 26px 12px;z-index:5}
.lb1{left:30px}.lb2{left:674px;color:#7FF0C0}
.phone{top:250px;width:210px;height:430px;z-index:4}
.ph1{left:400px;transform:rotate(-4deg)}.ph2{left:1030px;transform:rotate(4deg)}
.scr{padding:50px 14px 0;font-family:'Inter Tight'}
.scr .h{font-weight:900;font-size:30px;letter-spacing:-.04em;margin-bottom:8px}
.scr .it{display:flex;align-items:center;gap:8px;font-weight:700;font-size:22px;padding:8px 0;border-top:2px solid #eee}
.scr .it img{width:58px;height:58px;object-fit:contain}
.scr .b{background:#111;color:#fff;border-radius:10px;font-weight:700;font-size:22px;text-align:center;padding:10px 0;margin-top:10px}
''',
 body='''
<div class="pn pa z1"><img data-img="p1" data-move="p1" src="../../assets/shoot/1553.jpg" alt=""></div>
<div class="pn pb z1"><img data-img="p2" data-move="p2" src="../../assets/shoot/1558.jpg" alt=""></div>
<div class="a lb lb1 nw" data-k="l1"></div><div class="a lb lb2 nw" data-k="l2"></div>
''' + phone(1, cart('1')) + '\n' + phone(2, cart('2'))))

    # 08 ------------------------------------------------------------------------------------------------------------
    B.append(dict(
 name='08-whats-in-a-browser-cookie', kind='object', recommended=False,
 board='Thumbnails 91 (yt-38 "TWO SUM": one real object filling the frame, the topic in huge heavy rounded type on top, a small note on the object)',
 fonts='Font 14 (design-14: Bagel Fat One, cream on red, Design 361) + Font 63 (thumbs-08: JetBrains Mono ExtraBold, black on light) on the ticket',
 colours='Font 14 / Font 94 combo (Design 361): ground #DC3E2B, words #EDE6D9; ticket #EDE6D9 with #111111 mono',
 thumbnail_text='what\'s in a browser cookie?',
 direction='No face. Red ground, two real chocolate-chip cookies (Pexels, free licence) big in the middle right with a cream ticket stuck on them: "session_id=8f3a…" (a made-up example). The question in big rounded cream type on top.',
 titles=['What Are Browser Cookies? How Websites Remember You',
         'How Login Cookies Work: Session IDs Explained Simply',
         T_MAIN],
 text={'hd': 'what&rsquo;s in a<br>browser cookie?', 'tk': 'session_id=8f3a&hellip;'},
 images={'obj': CL + 'cookie-pair.png'},
 vars={'--ground': '#DC3E2B'},
 css='''
.hd{left:56px;top:30px;font-family:'Bagel Fat One';font-size:128px;line-height:.98;letter-spacing:-.01em;color:#EDE6D9;z-index:4}
.obj{left:520px;top:290px;width:700px;filter:drop-shadow(0 22px 30px rgba(0,0,0,.35));z-index:2}
.tk{left:300px;top:470px;background:#EDE6D9;color:#111111;font-family:'JetBrains Mono';font-weight:800;font-size:62px;letter-spacing:-.02em;padding:16px 30px;transform:rotate(-4deg);box-shadow:0 12px 26px rgba(0,0,0,.3);z-index:3}
''',
 body='''
<div class="a hd nw" data-k="hd"></div>
<img class="a obj" data-img="obj" data-move="cookie" src="../../assets/collage/cookie-pair.png" alt="">
<div class="a tk nw" data-k="tk"></div>'''))

    # 09 ------------------------------------------------------------------------------------------------------------
    B.append(dict(
 name='09-still-logged-in', kind='photo', recommended=False,
 board='Thumbnails 44 (yt-72 "boring, but it works": the creator centred in her room, a UI card floating beside her, one line across the top)',
 fonts='Font 72 (thumbs-17: Inter Tight + Instrument Serif italic, white on #2B2420, Thumbnails 152)',
 colours='Font 72 specimen: #FFFFFF words on #2B2420 (her room dimmed 55% to it); the card is a generic white browser window',
 thumbnail_text='still logged in? how',
 direction='Her real room dimmed (shoot 1550, mid-explanation, hand up), she centred. One line on top: "still logged in? how" (how in italic serif). A generic browser window floats beside her: an avatar and "Hi, Ada / Welcome back", the thing a login cookie gives you.',
 titles=['Why Websites Need Cookies (How You Stay Logged In)',
         'How Login Cookies Work: Session IDs Explained Simply',
         T_MAIN],
 text={'hd': 'still logged in? <i>how</i>', 'hi': 'Hi, Ada', 'wb': 'Welcome back', 'av': 'A', 'u': 'shop.example'},
 images={'room': S + '1550.jpg', 'me': S + '1550-person.png'},
 vars={'--pw': '1400px', '--pl': '-80px', '--pt': '-170px', '--dim': 'rgba(43,36,32,.6)'},
 css='''
.hd{left:0;right:0;top:20px;text-align:center;font-family:'Inter Tight';font-weight:700;font-size:96px;letter-spacing:-.05em;line-height:1;color:#FFFFFF;z-index:5}
.hd i{font-family:'Instrument Serif';font-style:italic;font-weight:400;font-size:116px;letter-spacing:-.02em}
.win{left:830px;top:200px;width:410px;height:330px;z-index:5;transform:rotate(3deg)}
.win .bc{display:flex;align-items:center;gap:22px;padding:38px 30px 0}
.win .av{width:110px;height:110px;border-radius:50%;background:#2E7D4F;color:#fff;font:800 60px 'Inter Tight';display:flex;align-items:center;justify-content:center}
.win .hi{font:900 64px 'Inter Tight';letter-spacing:-.04em;line-height:1}
.win .wb{font:600 30px 'Inter Tight';color:#555;margin-top:6px}
.win .ln{margin:30px 30px 0;height:22px;border-radius:8px;background:#EDEDEA}
''',
 body=photo('1550') + '''
<div class="a hd sh nw" data-k="hd"></div>
<div class="win" data-move="window"><div class="bar"><i></i><i></i><i></i><div class="url" data-k="u"></div></div>
<div class="bc"><div class="av" data-k="av"></div><div><div class="hi nw" data-k="hi"></div><div class="wb nw" data-k="wb"></div></div></div><div class="ln"></div></div>'''))

    # 10 ------------------------------------------------------------------------------------------------------------
    B.append(dict(
 name='10-whats-saved-in-your-browser', kind='object', recommended=False,
 board='Thumbnails 52 (yt-80 "SECOND BRAIN": heavy two-line caps top-left on a soft beige ground, one real thing held up big that shows the topic)',
 fonts='Font 6 (design-06: Archivo 900 at 62% width, Design 351)',
 colours='Font 6 / combo-06 specimen (Design 351): ink #101114 on #E6DFCD, accents #173DAF and #E5C63A',
 thumbnail_text='WHAT\'S SAVED IN YOUR BROWSER?',
 direction='No face. Beige ground, heavy condensed caps top-left: WHAT\'S SAVED IN YOUR BROWSER? Below and right, one big generic browser window (blue bar) with the three things inside it as real objects: a cookie, a shop cart and a half-filled form.',
 titles=['Cookies, localStorage and sessionStorage Explained Simply',
         'What Does Your Browser Save About You? (Cookies vs localStorage)',
         T_MAIN],
 text={'hd': 'WHAT&rsquo;S SAVED IN<br>YOUR BROWSER?', 'u': 'shop.example', 'f1': 'Ada Okafor', 'f2': 'Tartu mnt 1'},
 images={'o1': CL + 'cookie.png', 'o2': CL + 'cart-yellow.png'},
 vars={'--ground': '#E6DFCD'},
 css='''
.hd{left:50px;top:30px;font-family:'Archivo';font-weight:900;font-stretch:62%;font-size:150px;line-height:.9;letter-spacing:-.01em;color:#101114}
.win{left:300px;top:330px;width:860px;height:350px;border-radius:20px;box-shadow:0 22px 44px rgba(16,17,20,.25)}
.win .bar{background:#173DAF}
.win .bar i{background:#E5C63A}
.o1{left:340px;top:410px;width:230px;z-index:3}
.o2{left:620px;top:396px;width:220px;z-index:3}
.fc{left:880px;top:420px;width:240px;z-index:3;font-family:'Inter Tight';color:#111}
.fc div{background:#EFEFEC;border-radius:9px;font-weight:700;font-size:26px;letter-spacing:-.03em;padding:10px 12px;margin:0 0 10px;color:#111}
.fc div.e{color:transparent}
''',
 body='''
<div class="a hd nw" data-k="hd"></div>
<div class="win z2" data-move="window"><div class="bar"><i></i><i></i><i></i><div class="url" data-k="u"></div></div></div>
<img class="a o1" data-img="o1" data-move="cookie" src="../../assets/collage/cookie.png" alt="">
<img class="a o2" data-img="o2" data-move="cart" src="../../assets/collage/cart-yellow.png" alt="">
<div class="a fc" data-move="form"><div data-k="f1"></div><div data-k="f2"></div><div class="e">.</div></div>'''))
    return B
