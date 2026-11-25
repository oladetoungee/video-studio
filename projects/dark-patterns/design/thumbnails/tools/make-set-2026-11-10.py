# Builds the 2026-11-10 thumbnail set (11 directions). WARNING: re-running OVERWRITES content.json (her studio edits, scores). Use only to rebuild from scratch.
import json, os, sys
D = '/Users/gbemi/Desktop/CODE/videos/projects/dark-patterns/design/thumbnails/directions'
HEAD = '<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../../lib/dp.css"><style>\n%s\n</style></head><body><div class="t %s">\n%s\n</div><script src="../../lib/bind.js"></script></body></html>\n'
S = '../../assets/shoot/'
def photo(n, washed=False):
    return ('<div class="pf %s z1" data-move="photo"><img class="room" data-img="room" src="%s%s.jpg" alt=""><div class="wash"></div><div class="dim"></div>'
            '<img class="me" data-img="me" src="%s%s-person.png" alt=""></div>') % ('washed' if washed else '', S, n, S, n) if washed else \
           ('<div class="pf z1" data-move="photo"><img class="room" data-img="room" src="%s%s.jpg" alt=""><div class="dim"></div>'
            '<img class="me" data-img="me" src="%s%s-person.png" alt=""></div>') % (S, n, S, n)
DIRS = {}
def d(name, css, body, content, cls='no-lift'):
    DIRS[name] = (css, body, content, cls)

popup = '''<div class="ui popup %s" data-move="popup"><div class="off" data-k="off"></div><div class="yes" data-k="yes"></div><div class="no" data-k="no"></div></div>'''

# 01 PHOTO: her palm up, the phone with the guilt-trip pop-up sits on it; THIS IS ON PURPOSE
d('01-on-purpose', '''
.hd{left:50px;top:50px;font-size:92px;line-height:.94;color:#111}
.phone{left:250px;top:268px;width:250px;height:512px;transform:rotate(-6deg)}
.scr{background:#fff;display:flex;flex-direction:column;justify-content:center;padding:0 22px;text-align:center}
.scr .off{font-weight:700;font-size:64px;letter-spacing:-.04em;line-height:.9}
.scr .sub{font-size:22px;font-weight:500;margin-top:8px}
.scr .yes{background:#111;color:#fff;font-weight:700;font-size:23px;padding:15px 0;margin-top:22px;border-radius:10px}
.scr .no{font-size:24px;font-weight:600;color:#6E6E6E;margin-top:16px;line-height:1.2;text-decoration:underline;text-underline-offset:.18em}
''', photo('1559', True) + '''
<div class="hd z4" data-k="hd"></div>
<div class="phone z4" data-move="phone"><div class="scr"><div class="off" data-k="off"></div><div class="sub" data-k="sub"></div><div class="yes" data-k="yes"></div><div class="no" data-k="no"></div></div></div>''',
 dict(direction="Photo background (her shoot, white shirt, Enhance photo): her room washed pink so it goes calm, she in full colour on the right, palm up. On her palm a real-looking phone with a shop pop-up: 10% OFF, a big black 'Yes please' button and the guilt-trip link 'No thanks, I hate saving money'. Big words on the left say it is deliberate. Follows: her ux-research thumbnail (room washed in one colour, she presents the object), board 'creator holding the topic'.",
  thumbnail_text="Shops do this on purpose", kind="photo", recommended=True,
  titles=['Dark Patterns: "No Thanks, I Hate Saving Money" Has a Name', 'The Tricks Online Shops Use to Make You Say Yes', 'Dark Patterns Explained: 11 Tricks Websites Use on You'],
  text=dict(hd='Shops do this<br>on purpose', off='10% OFF', sub='your first order', yes='Yes please', no='No thanks, I hate saving money'),
  images=dict(room=S+'1559.jpg', me=S+'1559-person.png'),
  vars={'--wash':'#FF9EC4','--ground':'#FF9EC4','--pw':'1280px','--pl':'250px','--pt':'-190px'}))

# 02 FLAT: topic name explained + the pop-up huge, her cut-out right
d('02-dark-patterns-explained', '''
.hd{left:56px;top:50px;font-size:124px;line-height:.86}
.hd2{position:absolute;left:60px;top:176px;font-size:84px;letter-spacing:-.04em;font-weight:300}
.pp{left:60px;top:330px;width:580px;padding:22px 30px 22px}
.pp .off{font-size:84px}.pp .yes{font-size:30px;margin-top:12px;padding:12px 0}.pp .no{font-size:26px;margin-top:14px}
.cut{right:-40px;height:640px}
''', '''<div class="hd z3" data-k="hd"></div><div class="hd2 z3" data-k="hd2"></div>
<div class="abs pp ui popup z3" data-move="popup"><div class="off" data-k="off"></div><div class="yes" data-k="yes"></div><div class="no" data-k="no"></div></div>
<img class="cut z2" data-img="me" data-move="her" src="'''+S+'''1557-cut.png" alt="">''',
 dict(direction="Flat pink ground with fine same-hue diagonal lines (her 'bold colour + quiet pattern' refs). The topic name huge in Helvetica 700, 'explained' in 300 under it (type set 03, heavy + light); under it the trick everybody has met: a 10% OFF pop-up with the big 'Yes please' and the guilt-trip 'No thanks, I hate saving money'. Her cut-out large on the right, calm, looking at the viewer. Follows: tech explainer kind (topic name huge + the literal thing: 'ALGORITHMS MADE EASY', her database-indexes thumbnail).",
  thumbnail_text="dark patterns, explained", kind="flat", recommended=True,
  titles=['The Tricks Online Shops Use to Make You Say Yes', 'What Are Dark Patterns? 11 Examples From Online Shops', 'Dark Patterns in UX: 11 Examples and Why Companies Use Them'],
  text=dict(hd='Dark patterns', hd2='explained', off='10% OFF', yes='Yes please', no='No thanks, I hate saving money'),
  images=dict(me=S+'1557-cut.png'), vars={'--ground':'#FF9EC4'}), cls='no-lift pat')

# 03 PHOTO: I didn't add this, cart with a cleaning spray marked
d('03-i-didnt-add-this', '''
.panel{position:absolute;left:0;top:0;width:470px;height:720px;background:#111}
.hd{left:54px;top:54px;font-size:104px;line-height:.92;color:#fff}
.cart{left:54px;top:330px;width:560px;padding:26px 32px 22px}
.cart .mono{font-size:30px;opacity:.7;margin-bottom:10px}
.cart .row{font-size:38px;font-weight:700;letter-spacing:-.02em;padding:13px 0}
.cart .row.add{background:#FF9EC4;margin:0 -32px;padding:13px 32px}
.cart .tot{font-size:40px;font-weight:700}
''', photo('1558') + '''
<div class="panel z2"></div><div class="hd z4" data-k="hd"></div>
<div class="ui cart z4" data-move="cart"><div class="mono" data-k="cartlabel"></div>
<div class="row"><span data-k="item1"></span><span data-k="p1"></span></div><div class="rule"></div>
<div class="row add"><span data-k="item2"></span><span data-k="p2"></span></div>
<div class="row tot"><span data-k="totl"></span><span data-k="tot"></span></div></div>''',
 dict(direction="Photo background: her room in natural colour, darkened a little so the words read; she on the right with a side-eye. On the left a big shop cart: running shoes €40 and, highlighted in pink, a cleaning spray €5 she never picked. Follows: 'creator large on one side + a bold claim' (I'D FAIL SLAVERY, Reading as an Act of Resistance) and her 10b taste (the key line marked).",
  thumbnail_text="I didn't add this", kind="photo",
  titles=['Dark Patterns Examples: How Online Shops Trick You', 'Dark Patterns in E-Commerce: 11 Checkout Tricks to Spot', 'Dark Patterns Explained: 11 Tricks Websites Use on You'],
  text=dict(hd="I didn't<br>add this", cartlabel='YOUR CART', item1='Running shoes', p1='€40', item2='Cleaning spray', p2='€5', totl='Total', tot='€45'),
  images=dict(room=S+'1558.jpg', me=S+'1558-person.png'),
  vars={'--pw':'1280px','--pl':'290px','--pt':'-170px','--dim':'rgba(17,17,17,.12)','--ground':'#111111'}))

# 04 OTHER: hidden fees, product page vs checkout, no face
d('04-hidden-fees', '''
.hd{left:50px;top:34px;font-size:132px}
.pg{top:214px;width:400px;height:460px;padding:22px 24px}
.pg .mono{font-size:31px;opacity:.7}
.cut{right:-120px;height:560px}
.pg .im{height:200px;margin-top:12px;background:url('../../assets/pexels/px-7588163.jpg') center 72%/cover}
.pg .pr{font-size:84px;font-weight:700;letter-spacing:-.045em;margin-top:16px}
.pg .row{font-size:38px;font-weight:700;padding:8px 0}
.pg .fee{font-size:38px;font-weight:700;margin-top:10px;display:inline-block}
.ar{left:456px;top:372px;font-size:96px;font-weight:700}
''', '''<div class="hd z3" data-k="hd"></div>
<img class="cut z1" data-img="me" data-move="her" src="'''+S+'''1558-cut.png" alt="">
<div class="ui pg z2" style="left:50px" data-move="product"><div class="mono" data-k="l1"></div><div class="im"></div><div class="pr" data-k="pr1"></div></div>
<div class="abs ar z2" data-k="arrow" data-move="arrow"></div>
<div class="ui pg z2" style="left:560px" data-move="checkout"><div class="mono" data-k="l2"></div>
<div class="row" style="margin-top:22px"><span data-k="i1"></span><span data-k="p1"></span></div><div class="rule"></div>
<div><span class="fee blk" data-k="fee"></span></div><div class="pr" data-k="pr2"></div></div>''',
 dict(direction="Split before / after on pink, her cut-out on the right with a side-eye (added after the cold test) with the quiet line pattern: left the product page, the shoes at €40; right the checkout, the same shoes, '+ Service fee €12' knocked out of a black block, total €52; an arrow between. 'Hidden fees' huge on top. Follows: YouTube before/after splits, 'a real-looking screen as the picture'. The shop is generic (no brand).",
  thumbnail_text="Hidden fees", kind="other",
  titles=['Dark Patterns in E-Commerce: 11 Checkout Tricks to Spot', 'Dark Patterns Examples: How Online Shops Trick You', 'What Are Dark Patterns? 11 Examples From Online Shops'],
  text=dict(hd='Hidden fees', l1='PRODUCT PAGE', pr1='€40', l2='CHECKOUT', i1='Shoes', p1='€40', fee='+ Service fee €12', pr2='Total €52', arrow='→'),
  images=dict(me=S+'1558-cut.png'), vars={'--ground':'#FF9EC4'}), cls='no-lift pat')

# 05 COLLAGE: her full photo natural + floating objects; one line
d('05-tricks-online-shops-use', '''
.hd{left:46px;bottom:40px;font-size:84px;color:#111;line-height:1.08}
.hd b{font-weight:700;background:#FF9EC4;padding:0 .14em}
.ck{left:56px;top:64px;width:330px;padding:18px 22px;transform:rotate(-4deg);font-size:28px;font-weight:700;display:flex;gap:14px;align-items:center;white-space:nowrap}
.ck .box{font-size:34px;flex:none}
.tm{left:56px;top:56px;padding:14px 24px;background:#111;color:#fff;transform:rotate(4deg);font-family:'DMMono';font-size:58px;letter-spacing:.02em}
.tm small{display:block;font-size:17px;letter-spacing:.14em;opacity:.7}
.st{left:960px;top:300px;background:#FF9EC4;padding:14px 22px;transform:rotate(-5deg);font-size:34px;font-weight:700;letter-spacing:-.02em;box-shadow:0 16px 30px rgba(0,0,0,.25)}
.shoe{left:70px;top:250px;width:270px;transform:rotate(-8deg)}
''', photo('1550') + '''
<div class="abs tm z4" data-move="timer"><small data-k="tml"></small><span data-k="tm"></span></div>
<div class="abs st z4" data-k="stock" data-move="stock"></div>
<div class="hd z5" data-k="hd"></div>''',
 dict(direction="Collage over her full photo (natural colour, room darkened a little): she in the middle with an open hand; around her the tricks as real objects: a 'sale ends in 09:59' timer, an 'Only 2 left!' sticker. One line, bottom left. Follows: her collage samples ('Capsule wardrobe', 'Thought of these?'), board kind c (creator surrounded by the topic's objects).",
  thumbnail_text="tricks online shops use", kind="collage",
  titles=['What Are Dark Patterns? 11 Examples From Online Shops', 'Dark Patterns Explained: 11 Tricks Websites Use on You', 'That Countdown Timer Is Fake. 11 Tricks Online Shops Use'],
  text=dict(hd='<b>Tricks</b><br><b>online shops</b><br><b>use</b>', ck='Gift wrap + €2.99', tml='SALE ENDS IN', tm='09:59', stock='Only 2 left!'),
  images=dict(room=S+'1550.jpg', me=S+'1550-person.png'),
  vars={'--pw':'1280px','--pl':'0px','--pt':'-200px','--dim':'rgba(17,17,17,.28)'}))

# 06 PHOTO: can't cancel, three cancel screens
d('06-cant-cancel', '''
.hd{right:50px;top:44px;font-size:112px;color:#fff;text-align:right}
.hd span{color:#FF9EC4}
.ph{width:205px;height:420px}
.ph .scr{display:flex;flex-direction:column;justify-content:center;padding:24px;gap:16px;background:#fff;text-align:center}
.ph b{font-size:31px;font-weight:700;letter-spacing:-.03em;line-height:1.02}
.ph i{font-style:normal;background:#111;color:#fff;font-weight:700;font-size:19px;padding:12px 6px;border-radius:9px}
.ph u{text-decoration:underline;color:#6E6E6E;font-weight:500;font-size:17px}
''', photo('1564', True) + '''
<div class="hd sh z4" data-k="hd"></div>
<div class="phone ph z4" data-move="phone1" style="left:560px;top:236px;transform:rotate(-6deg)"><div class="scr"><b data-k="s1"></b><i data-k="b1"></i><u data-k="n1"></u></div></div>
<div class="phone ph z4" data-move="phone2" style="left:790px;top:252px;transform:rotate(0deg)"><div class="scr"><b data-k="s2"></b><i data-k="b2"></i><u data-k="n2"></u></div></div>
<div class="phone ph z4" data-move="phone3" style="left:1020px;top:266px;transform:rotate(6deg)"><div class="scr"><b data-k="s3"></b><i data-k="b3"></i><u data-k="n3"></u></div></div>''',
 dict(direction="Photo background: her room washed in a deep plum so it goes calm and dark, she in full colour on the left, hand on her cheek, tired of it. On the right three real-looking phones, each one more screen between you and leaving: 'Are you sure?', 'Wait! 50% off', 'Tell us why'. Follows: board kind d (creator on one side + a bold line), Techquickie cancel-UI thumbnails.",
  thumbnail_text="Can't cancel?", kind="photo",
  titles=['Dark Patterns Explained: 11 Tricks Websites Use on You', 'Dark Patterns in UX: 11 Examples and Why Companies Use Them', 'Dark Patterns Examples: How Online Shops Trick You'],
  text=dict(hd="Can't <span>cancel?</span>", s1='Are you sure?', b1='Keep my plan', n1='Continue', s2='Wait! 50% off', b2='Stay and save', n2='No, continue', s3='Tell us why', b3='Pick a reason', n3='Continue'),
  images=dict(room=S+'1564.jpg', me=S+'1564-person.png'),
  vars={'--wash':'#3A2430','--ground':'#3A2430','--pw':'1280px','--pl':'-260px','--pt':'-170px'}))

# 07 FLAT paper: already ticked for you, big checkbox, her big cut-out left
d('07-already-ticked', '''
.hd{left:600px;top:60px;font-size:96px;line-height:.92}
.ck{left:600px;top:340px;width:620px;padding:30px 36px;display:flex;gap:28px;align-items:center}
.ck .box{font-size:96px;flex:none}
.ck .w{font-size:46px;font-weight:700;letter-spacing:-.03em;line-height:1.05}
.ck .w span{display:block;font-weight:700;font-size:60px;margin-top:4px}
.cut{left:-60px;height:700px}
''', '''<img class="cut z2" data-img="me" data-move="her" src="'''+S+'''1564-cut.png" alt="">
<div class="hd z3" data-k="hd"></div>
<div class="ui ck z3" data-move="checkbox"><span class="box on"></span><div class="w"><div data-k="item"></div><span data-k="price"></span></div></div>''',
 dict(direction="Flat warm paper ground with a faint line pattern; her cut-out large on the left (hand on cheek, wry); on the right the claim in two lines and one giant checkbox, already ticked: 'Gift wrapping + €2.99'. Follows: board kind d (creator large on one side + a bold claim), her database-indexes thumbnail (one object drawn big).",
  thumbnail_text="Already ticked for you", kind="flat",
  titles=['Dark Patterns in E-Commerce: 11 Checkout Tricks to Spot', 'Dark Patterns Explained: 11 Tricks Websites Use on You', 'The Tricks Online Shops Use to Make You Say Yes'],
  text=dict(hd='Already<br>ticked for you', item='Gift wrapping', price='+ €2.99'),
  images=dict(me=S+'1564-cut.png'), vars={'--ground':'#F4EFE8','--patc':'rgba(17,17,17,.035)'}), cls='no-lift pat')

# 08 FLAT ink: this timer is fake
d('08-fake-timer', '''
.hd{left:56px;top:46px;font-size:112px;color:#fff;line-height:.92}
.hd span{color:#FF9EC4}
.card{left:56px;top:330px;width:640px;padding:26px 34px;background:#fff;color:#111}
.card .mono{font-size:24px;opacity:.6}
.card .tm{font-family:'DMMono';font-size:150px;letter-spacing:-.02em;line-height:1;margin-top:8px}
.card .rf{position:absolute;right:30px;top:24px;font-size:74px;font-weight:300}
.cut{right:-70px;height:640px}
''', '''<div class="hd z3" data-k="hd"></div>
<div class="abs card z3" data-move="timer"><div class="mono" data-k="lab"></div><div class="tm" data-k="tm"></div><div class="rf" data-k="rf"></div></div>
<img class="cut z2" data-img="me" data-move="her" src="'''+S+'''1562-cut.png" alt="">''',
 dict(direction="Flat off-black ground with fine diagonal lines a few % lighter; 'This timer is fake' in white with 'fake' in pink; a shop's 'Sale ends in 09:59' timer at poster size with a reload arrow (it starts again when you refresh). Her cut-out on the right, hand out, a 'come on' face. Follows: board kind e (the literal thing huge, clean dark ground, one accent), the Nerdwriter1 literal-UI thumbnail.",
  thumbnail_text="This timer is fake", kind="flat",
  titles=['Dark Patterns Examples: How Online Shops Trick You', 'What Are Dark Patterns? 11 Examples From Online Shops', 'Dark Patterns in E-Commerce: 11 Checkout Tricks to Spot'],
  text=dict(hd='This timer<br>is <span>fake</span>', lab='SALE ENDS IN', tm='09:59', rf='↻'),
  images=dict(me=S+'1562-cut.png'), vars={'--ground':'#111111','--patc':'rgba(255,255,255,.035)'}), cls='no-lift pat')

# 09 OTHER: is this legal? clipping + phone on white
d('09-is-this-legal', '''
.hd{left:60px;top:44px;font-size:118px}
.clip{left:60px;top:270px;width:720px;padding:34px 38px;transform:rotate(-2deg);background:#fff;box-shadow:0 22px 44px rgba(17,17,17,.16)}
.clip .h{font-size:66px;font-weight:700;letter-spacing:-.035em;line-height:1.02}
.clip .h em{font-style:normal;background:#FF9EC4;padding:0 .08em}
.phone{left:860px;top:110px;width:270px;height:556px;transform:rotate(4deg)}
.scr{background:#fff;padding:96px 24px 0}
.scr .mono{font-size:15px;opacity:.55}
.scr .t1{font-size:30px;font-weight:700;letter-spacing:-.03em;margin:12px 0 18px;line-height:1.05}
.scr .rowc{display:flex;gap:12px;align-items:flex-start;font-size:21px;font-weight:600;line-height:1.15;padding:14px 0;border-top:1px solid #ddd}
.scr .rowc .box{font-size:26px;flex:none}
.scr .go{background:#111;color:#fff;text-align:center;font-weight:700;font-size:21px;padding:15px 0;border-radius:10px;margin-top:22px}
''', '''<div class="hd z3" data-k="hd"></div>
<div class="abs clip z3" data-move="clipping"><div class="h" data-k="clip"></div></div>
<div class="phone z3" data-move="phone"><div class="scr"><div class="mono" data-k="lab"></div><div class="t1" data-k="t1"></div>
<div class="rowc"><span class="box on"></span><span data-k="opt"></span></div><div class="go" data-k="go"></div></div></div>''',
 dict(direction="Her 10b taste (newspaper clipping + phone on warm paper, key words highlighted, no source line, no quote marks): the clipping says Amazon agreed to pay $2.5 billion over Prime sign-ups (FTC settlement, 25 Sep 2025, true), '$2.5 billion' in pink; beside it a phone checkout with 'Start my free trial' already ticked. No face. Follows: her ghana-marrify 10b edit.",
  thumbnail_text="Is this legal?", kind="other",
  titles=['Are Dark Patterns Illegal? What EU and US Law Says', 'Dark Patterns Explained: 11 Tricks Websites Use on You', 'Hard to Cancel Subscriptions? 11 Dark Patterns Explained'],
  text=dict(hd='Is this legal?', clip='Amazon to pay <em>$2.5&nbsp;billion</em> over Prime&nbsp;sign&#8209;ups', lab='CHECKOUT', t1='Place your order', opt='Start my free trial', go='Place order'),
  images={}, vars={'--ground':'#F4EFE8'}), cls='')

# 10 FLAT: only 2 left? monday vs a week later
d('10-only-2-left', '''
.hd{left:0;right:0;text-align:center;top:34px;font-size:128px}
.cut{left:390px;height:440px}
.pg{top:220px;width:430px;height:440px;padding:22px 26px}
.pg .mono{font-size:24px;opacity:.6}
.pg .im{height:250px;margin-top:12px;background:url('../../assets/pexels/px-7588163.jpg') center 72%/cover}
.pg .st{display:inline-block;margin-top:22px;background:#111;color:#FF9EC4;font-size:36px;font-weight:700;padding:8px 16px;letter-spacing:-.02em}
''', '''<div class="hd z3" data-k="hd"></div>
<img class="cut z3" data-img="me" data-move="her" src="'''+S+'''1557-cut.png" alt="">
<div class="ui pg z2" style="left:40px;transform:rotate(-2deg)" data-move="monday"><div class="mono" data-k="d1"></div><div class="im"></div><div class="st" data-k="s1"></div></div>
<div class="ui pg z2" style="left:812px;transform:rotate(2deg)" data-move="later"><div class="mono" data-k="d2"></div><div class="im"></div><div class="st" data-k="s2"></div></div>''',
 dict(direction="Flat pink with the quiet line pattern, no face: the same product card twice, 'Monday' and 'A month later', her cut-out between them looking unconvinced, the same 'Only 2 left in stock' label on both. The question on top. Follows: board kind f (day 1 / day 7 split), 'object = the idea'.",
  thumbnail_text="Only 2 left?", kind="flat",
  titles=['Dark Patterns Examples: How Online Shops Trick You', 'Dark Patterns in E-Commerce: 11 Checkout Tricks to Spot', 'What Are Dark Patterns? 11 Examples From Online Shops'],
  text=dict(hd='Only 2 left?', d1='MONDAY', s1='Only 2 left in stock', d2='A MONTH LATER', s2='Only 2 left in stock'),
  images=dict(me=S+'1557-cut.png'), vars={'--ground':'#FF9EC4'}), cls='no-lift pat')

# 11 PHOTO: why apps keep asking (notifications)
d('11-apps-keep-asking', '''
.hd{right:54px;top:44px;font-size:96px;line-height:.92;color:#111;text-align:right}
.phone{left:900px;top:250px;width:250px;height:512px;transform:rotate(5deg)}
.scr{background:#F2F2F4;padding:90px 18px 0}
.nt{background:#fff;border-radius:16px;padding:16px 16px 14px;margin-bottom:12px;box-shadow:0 4px 12px rgba(0,0,0,.08)}
.nt b{display:block;font-size:21px;font-weight:700;letter-spacing:-.02em;line-height:1.1}
.nt span{display:flex;justify-content:space-between;margin-top:10px;font-size:20px;font-weight:600;color:#6E6E6E}
.nt span i{font-style:normal;color:#111}
''', photo('1562', True) + '''
<div class="hd z4" data-k="hd"></div>
<div class="phone z4" data-move="phone"><div class="scr">
<div class="nt"><b data-k="q1"></b><span><em data-k="no"></em><i data-k="yes"></i></span></div>
<div class="nt"><b data-k="q2"></b><span><em data-k="no"></em><i data-k="yes"></i></span></div>
<div class="nt"><b data-k="q3"></b><span><em data-k="no"></em><i data-k="yes"></i></span></div></div></div>''',
 dict(direction="Photo background washed warm paper (her room calm and light): she on the right with a 'really?' hand; on the left a phone with the same 'Turn on notifications?' prompt three times, 'Not now' each time. Follows: her ux-research thumbnail (washed room, she gestures at the object).",
  thumbnail_text="Why apps keep asking", kind="photo",
  titles=['Dark Patterns in UX: 11 Examples and Why Companies Use Them', 'Dark Patterns Explained: 11 Tricks Websites Use on You'],
  text=dict(hd='Why apps<br>keep asking', q1='Turn on notifications?', q2='Turn on notifications?', q3='Turn on notifications?', no='Not now', yes='Turn on'),
  images=dict(room=S+'1562.jpg', me=S+'1562-person.png'),
  vars={'--wash':'#EDE6DC','--ground':'#EDE6DC','--pw':'1280px','--pl':'-250px','--pt':'-150px','--wc':'.3','--wb':'1.95'}))

only = sys.argv[1:]
for name,(css,body,content,cls) in DIRS.items():
    if only and not any(name.startswith(o) for o in only): continue
    p = os.path.join(D, name); os.makedirs(p, exist_ok=True)
    content.setdefault('title', content['titles'][0])
    if 'no-lift' in cls: content['class'] = ' '.join(c for c in cls.split() if c)
    elif cls: content['class'] = cls
    open(os.path.join(p,'index.html'),'w').write(HEAD % (css.strip(), '', body))
    json.dump(content, open(os.path.join(p,'content.json'),'w'), indent=1, ensure_ascii=False)
print('ok', len(DIRS))
