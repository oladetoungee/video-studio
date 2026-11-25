# Set 2 (2026-11-07): her type set 03 (Helvetica Neue heavy + light, DM Mono labels), no thick lines, her own photos.
# Words first (THUMBNAILS.md RULE 1): each option names the topic or its plainest promise; none is a line from the script.
G = {'--ground': '#D9DCDA', '--fg': '#0E0E0E'}

# ================================================================ PHOTO-LED (her own photos)
d('01-topic-headshot', 'photo', 'Cookies, localStorage, sessionStorage', [9, 8],
  "Her database-indexes method with her new headshot: the topic name huge on the left in heavy + light Helvetica (the three words people search), she on the right on the same cool grey as her photo backdrop, calm, closed mouth. A small mono line underneath says what the video gives. References: her database-indexes thumbnail (topic name huge, she at the side), her Swiss type references (pinterest-type-2026-11).",
  """.hd{left:64px;top:92px;font-size:112px;line-height:.98}
.sub{position:absolute;left:68px;top:500px;font-size:26px;color:rgba(14,14,14,.6)}""",
  f"""<div class="hd z4" data-k="hd"></div>
{her('headshot', 'right:-30px;height:690px')}""",
  dict(hd='Cookies,<br>localStorage,<br><span class="lt">sessionStorage</span>', sub=''),
  vars={'--ground': '#8E959E', '--fg': '#0E0E0E'}, rec=True)

d('02-close-the-tab', 'photo', "Close the tab. What's still there?", [1, 2],
  "Her seated photo (yellow and red top) on the right, the question on the left in heavy + light, and the answer as two plain rows: Cart, still there (green); Form, gone (red). One idea, three big things. References: kit concept T10 (one action, the outcome), her ux-research thumbnail (few big things), Swiss posters (type is the image).",
  """.hd{left:64px;top:70px;font-size:104px;line-height:.98}
.row{position:absolute;left:68px;display:flex;align-items:baseline;gap:26px;font-size:66px;letter-spacing:-.045em}
.row .v{font-weight:700;font-size:54px}""",
  f"""<div class="hd z4" data-k="hd"></div>
<img class="obj z4" data-img="cart" data-move="cart" src="{A}/collage/cart-yellow.png" style="left:56px;top:300px;width:290px" alt="">
{form('a', 2, 'left:360px;top:320px;width:290px;padding:20px 22px 24px', empty=True, fs=24, h=56, lb=24)}
<div class="row z4" style="top:610px" data-move="r1"><span class="v g" data-k="v1"></span></div>
<div class="row z4" style="top:610px;left:364px" data-move="r2"><span class="v r" data-k="v2"></span></div>
{her('seated', 'right:-150px;height:660px')}""",
  dict(hd="Close the tab.<br><span class='lt'>What’s still there?</span>", v1='Cart stays', v2='Form gone', alb='Checkout form', af0=' ', af1=' ', af2=' '),
  vars=G, rec=True)

d('03-where-is-your-cart-saved', 'photo', 'Where is your cart saved?', [1, 3],
  "Her headshot on the left, on concrete. On the right the question in heavy + light, a real mini shopping cart (Pexels die-cut, soft shadow only) and the answer as a green field 'localStorage' with a light line 'still there after you close the browser'. References: the film's half frame (th1, 8 cold), set 1's best photo option (07, 7 cold), her ux-research thumbnail.",
  """.hd{left:560px;top:58px;font-size:96px;line-height:.98}
.cart{left:560px;top:330px;width:330px}
.ans{position:absolute;left:910px;top:520px;font-size:60px;font-weight:700;letter-spacing:-.045em;color:#0B9A5B}
.ln{left:912px;top:480px;width:330px;font-size:30px;font-weight:300;color:#0E0E0E}""",
  f"""<div class="hd z4" data-k="hd"></div>
<img class="obj cart z4" data-img="cart" data-move="cart" src="{A}/collage/cart-yellow.png" alt="">
<div class="ans z4" data-k="ans" data-move="answer"></div>
{her('headshot', 'left:-60px;height:640px')}""",
  dict(hd='Where is your<br>cart <span class="lt">saved?</span>', ans='localStorage', ln='Still there after you close the browser.'),
  vars=G)

d('04-still-logged-in', 'photo', 'Still logged in. How?', [6, 5],
  "Her seated photo on the left, calm and sure. Right: the question in heavy + light, a plain white shop window ('Hi, Ada' with an account dot, no brand) and under it the answer in an ink field, 'cookie: session_id=117'. References: kit concept T6 (8/8 cold), set 1's 04 (7 cold), viral 5 (topic + the scene shows it).",
  """.hd{left:600px;top:58px;font-size:100px;line-height:.98}
.win{left:604px;top:330px;width:620px;height:190px}
.win .bar{height:52px;border-bottom:1px solid rgba(14,14,14,.2);display:flex;align-items:center;gap:10px;padding:0 20px;font-family:'DMMono';font-size:22px;color:rgba(14,14,14,.6)}
.win .bar i{width:12px;height:12px;border-radius:50%;background:rgba(14,14,14,.3);display:inline-block}
.win .hi{position:absolute;left:28px;top:78px;font-weight:700;font-size:76px;letter-spacing:-.045em;display:flex;align-items:center;gap:20px}
.win .av{width:56px;height:56px;border-radius:50%;background:#0B9A5B}
.ck{position:absolute;left:770px;top:580px;font-size:52px;font-weight:700;letter-spacing:-.045em;color:#0E0E0E;white-space:nowrap}
.ckimg{left:604px;top:540px;width:140px}""",
  f"""<div class="hd z4" data-k="hd"></div>
<div class="card win z4" data-move="window"><div class="bar"><i></i><i></i><i></i></div><div class="hi"><span data-k="hi"></span><span class="av"></span></div></div>
<img class="obj ckimg z4" data-img="cookie" data-move="cookieimg" src="{A}/collage/cookie.png" alt=""><div class="ck z4" data-k="ck" data-move="cookie"></div>
{her('seated', 'left:-260px;height:640px')}""",
  dict(hd='Still logged in.<br><span class="lt">How?</span>', url='shop.example', hi='Hi, Ada', ck='A cookie <span class="lt">with your ID</span>'),
  vars=G)

d('05-sessionstorage-behind-her', 'photo', 'sessionStorage, gone when you close the tab', [8, 9],
  "Words behind her (her saved 'POV' / 'FAVOR' thumbnails): 'sessionStorage' huge in ink behind her head on her own grey backdrop, so she sits in front of the word; under it one red line, 'Gone when you close the tab.' References: her saved YouTube thumbnails with words behind the head, Swiss posters (the headline runs off the edge).",
  """.big{position:absolute;left:0;right:0;text-align:center;top:30px;font-weight:700;font-size:176px;letter-spacing:-.06em;line-height:.9;color:#0E0E0E;white-space:nowrap}
.gn{left:52px;top:440px;font-size:72px;line-height:1}""",
  f"""<div class="big z2" data-k="big" data-move="big"></div>{her('headshot', 'left:580px;height:540px')}
{res('gn', 'gone', 'color:#C8191E')}""",
  dict(big='sessionStorage', gn='Gone when you<br>close the tab.'),
  vars={'--ground': '#9BA2AB', '--fg': '#0E0E0E'})


# ================================================================ COLLAGE (her full photo + a few object die-cuts, one line, mono labels)
# 07 collage dropped after round 3 (same idea and layout as 02 once the clutter was cut).
# 09, 11, 12 (flat): their directions/<id>/index.html + content.json are the source (edited there after round 3).
# 11 and 15 cut after round 3 (11 weakest table, 15 duplicates 04/12): moved to the Bin.

# ================================================================ OTHER (no face: diagram, split)
d('13-any-script-can-read-localstorage', 'other', 'Any script can read localStorage', [7],
  "No face, flat ink. A white storage panel (cart '2 items', theme 'dark', lang 'en') on the right; on the left three script names in one column (your-app.js in white, analytics.js and chat-widget.js in red), joined by one thin bracket and one arrow into the panel. References: viral 4 (a diagram), her database-indexes thumbnail (one mechanism, one arrow), set 1's 17 (7 cold).",
  """.hd{left:64px;top:52px;font-size:96px;color:#fff;line-height:.98}
.pn{left:640px;top:330px;width:576px}
.pn .tt{font-family:'DMMono';font-weight:500;font-size:24px;letter-spacing:.12em;text-transform:uppercase;padding:16px 20px 10px;color:rgba(14,14,14,.6)}
.pn .kv{font-size:50px}
.sc{position:absolute;left:64px;font-family:'DMMono';font-weight:500;font-size:54px;white-space:nowrap}""",
  f"""<div class="hd z3" data-k="hd"></div>
<div class="card pn z3" data-move="panel"><div class="tt" data-k="pt"></div><div class="kv"><div class="h" data-k="kh"></div><div class="h" data-k="vh"></div>
<div data-k="k1"></div><div data-k="v1"></div></div></div>
<div class="sc r z3" style="top:360px" data-k="s2" data-move="s2"></div><div class="sc r z3" style="top:480px" data-k="s3" data-move="s3"></div>
{arrow('left:530px;top:370px;width:110px;height:160px', 'M10 20 L40 20 L40 140 L10 140 M40 80 L145 80 M125 65 L148 80 L125 95', 3, '#fff')}""",
  dict(hd='Any script can read<br><span class="lt">your localStorage</span>', pt='localStorage', kh='Key', vh='Value', k1='email', v1='ada@me.io', k2='theme', v2='dark', k3='lang', v3='en', s1='your-app.js', s2='analytics.js', s3='chat-widget.js'),
  vars={'--ground': '#0E0E0E', '--fg': '#FFFFFF'})

d('14-refresh-vs-close-tab', 'other', 'sessionStorage: refresh vs close tab', [4, 1, 8],
  "Split before/after, no face. 'sessionStorage' named on top so a stranger knows the topic. Left half concrete: Refresh, the filled checkout form, 'Still there' in green. Right half ink: Close tab, the same form empty, 'Gone' in red. Same form in the same place on both sides. References: her saved YouTube Day 1 / Day 900 splits, set 1's 15 (7 cold) with the critic's fix (topic word added).",
  """.l{position:absolute;left:0;top:0;width:640px;height:720px;background:#D9DCDA}.rr{position:absolute;left:640px;top:0;width:640px;height:720px;background:#0E0E0E}
.tp{position:absolute;left:60px;top:28px;font-weight:700;font-size:76px;letter-spacing:-.05em;color:#0E0E0E}
.h1{left:60px;top:150px;font-size:64px;font-weight:300}.h2{left:700px;top:150px;font-size:64px;font-weight:300;color:#fff}
.sa{left:60px;top:580px;font-size:72px}.sb{left:700px;top:580px;font-size:72px}""",
  f"""<div class="l z1"></div><div class="rr z1"></div><div class="tp z4" data-k="tp"></div>
<div class="hd h1 z3" data-k="h1"></div><div class="hd h2 z3" data-k="h2"></div>
{form('a', 3, 'left:60px;top:230px;width:520px', fs=32, h=64, lb=24)}{form('b', 3, 'left:700px;top:230px;width:520px', empty=True, fs=32, h=64, lb=24)}
{res('sa', 'ok', '')}{res('sb', 'gone', '')}""",
  dict(tp='sessionStorage', h1='Refresh', h2='Close tab', sa='Still there', sb='Gone', **ff('a'), blb='Checkout form', bf0=' ', bf1=' ', bf2=' '),
  vars=G)

