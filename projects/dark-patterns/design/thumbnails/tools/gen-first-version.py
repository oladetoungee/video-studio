#!/usr/bin/env python3
FROZEN 2026-11-02 after critic round 1: the files in directions/ are the source now (fixes were made there). Do not re-run.
"""Writes the first version of every thumbnail direction (index.html + content.json).
   python3 tools/gen.py            -> writes index.html for all; content.json only where it does not exist yet
   python3 tools/gen.py --force 03 -> also overwrites content.json of directions starting with 03 (loses studio edits!)
Once Gbemi edits a design in the studio, content.json is hers: never --force it."""
import json, os, sys

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
A = '../../assets'
force = '--force' in sys.argv
only = [a for a in sys.argv[1:] if not a.startswith('--')]

T = {
 1: 'Dark Patterns: "No Thanks, I Hate Saving Money" Has a Name',
 2: "How Websites Trick You Into Buying Things You Didn't Add",
 3: 'That Countdown Timer Is Fake. 11 Tricks Online Shops Use',
 4: 'Dark Patterns Explained: 11 Tricks Websites Use on You',
 5: 'What Are Dark Patterns? 11 Examples From Online Shops',
 6: 'Dark Patterns in UX: 11 Examples and Why Companies Use Them',
 7: 'Dark Patterns Examples: How Online Shops Trick You',
 8: 'Dark Patterns in E-Commerce: 11 Checkout Tricks to Spot',
 9: 'Are Dark Patterns Illegal? What EU and US Law Says',
 10: 'Hard to Cancel Subscriptions? 11 Dark Patterns Explained',
 11: 'Why the Box at Checkout Was Already Ticked for You',
 12: 'The Tricks Online Shops Use to Make You Say Yes',
}

def scene(t, cls='', front=True, back=True):
    """her photo: room (grey + wash) and her (full colour) as two aligned layers; split so words can sit between"""
    b = (f'<div class="scene {cls} z1" data-move="room"><img class="bg" data-img="room" src="{A}/frames/f_{t}.jpg" alt="">'
         f'<div class="wash"></div><div class="dim"></div></div>') if back else ''
    f = (f'<div class="scene {cls} z3" data-move="her"><img class="me-c" data-img="me" src="{A}/scene/gbemi-{t}-person.png" alt=""></div>') if front else ''
    return b, f

def popup(w, link_fs, off_fs, yes_fs, extra=''):
    return (f'<div class="ui popup" style="width:{w}px{extra}">'
            f'<div class="off" data-k="off" style="font-size:{off_fs}px"></div>'
            f'<div class="yes" data-k="yes" style="font-size:{yes_fs}px"></div>'
            f'<div class="no" data-k="no" style="font-size:{link_fs}px"></div></div>')

D = []
def d(name, kind, words, titles, direction, css, body, text, images=None, vars=None, rec=False, cls=''):
    D.append(dict(name=name, kind=kind, words=words, titles=[T[i] for i in titles], direction=direction, css=css, body=body,
                  text=text, images=images or {}, vars=vars or {}, rec=rec, cls=cls))

POP = {'off': '10% OFF', 'yes': 'Yes please', 'no': 'No thanks, I hate saving money'}

# ---------------------------------------------------------------- PHOTO (her room, one-colour wash, she in colour)
b, f = scene('459.0')
d('01-dark-patterns-in-her-hand', 'photo', 'DARK PATTERNS', [12, 4, 5],
  "Photo background (her ux-research method): her room washed in one deep plum so it goes calm, she in full colour holding out her palm, and on her palm the 10% OFF pop-up. A black magnifier blows up the guilt-trip 'no' link so it reads at phone size. The topic name huge in pink across the top. References: her ux-research thumbnail (room washed one colour, topic huge, she presents the object), viral 1 'FINANCIAL LITERACY'.",
  """.hd{left:0;right:0;top:26px;text-align:center;font-size:150px;color:var(--accent)}
.pop{left:672px;top:250px;z-index:4}
.lens{left:930px;top:300px;width:300px;height:300px;--lw:16px;--hl:110px;--hw:28px;z-index:5}
.lens .in div{font-weight:900;font-size:46px;line-height:1.08;letter-spacing:-.02em;padding:0 26px;color:#6E6E6E}""",
  f"""{b}{f}<div class="hd z2" data-k="hd"></div>
<div class="abs pop" data-move="popup">{popup(300, 15, 66, 22)}</div>
<div class="lens" data-move="lens"><div class="in"><div data-k="big"></div></div></div>""",
  dict(hd='Dark patterns', big='<span class="blk">I hate saving money</span>', **POP),
  vars={'--ground': '#2A1520', '--fg': '#FFFFFF', '--accent': '#FF9EC4', '--wash': '#5A2A40', '--sc': '1', '--sc-x': '-150px', '--sc-y': '0px', '--bgb': '.9'}, cls='')

b, f = scene('84.0')
d('02-i-didnt-add-this', 'photo', "I DIDN'T ADD THIS", [4, 2, 7],
  "Photo background: her room washed pink (the film's ground), she in full colour with one finger up, 'wait a minute'. Beside her a big shop cart: running shoes €40 and, under it, a cleaning spray €5 she never picked, circled in black marker. References: viral 4 (diagram drawn on the scene), her ux-research thumbnail (few, huge props on her photo), her 10b taste (the key thing marked).",
  """.hd{left:56px;top:30px;font-size:124px}
.cart{left:700px;top:200px;width:520px;padding:28px 32px 26px}
.cart .mono{font-size:22px;opacity:.6;margin-bottom:14px}
.cart .row{font-size:38px;font-weight:800;letter-spacing:-.02em;padding:14px 0}
.cart .row span:last-child{font-family:'GMono';font-weight:700}
.ring{position:absolute;left:-44px;top:-16px;width:calc(100% + 88px);height:calc(100% + 32px)}
.tot{font-size:30px!important;font-weight:700!important}""",
  f"""{b}{f}<div class="hd z4" data-k="hd"></div>
<div class="ui cart z4" data-move="cart"><div class="mono" data-k="cartlabel"></div>
<div class="row"><span data-k="item1"></span><span data-k="p1"></span></div><div class="rule"></div>
<div class="row" style="position:relative"><span data-k="item2"></span><span data-k="p2"></span>
<svg class="ring" viewBox="0 0 100 40" preserveAspectRatio="none"><path d="M6,22 C4,6 40,2 70,4 C96,6 99,20 92,32 C82,40 20,40 8,30 C3,26 4,18 12,12" fill="none" stroke="#111" stroke-width="1.6" stroke-linecap="round" vector-effect="non-scaling-stroke" style="stroke-width:7px"/></svg></div>
<div class="rule"></div><div class="row tot"><span data-k="totl"></span><span data-k="tot"></span></div></div>""",
  dict(hd="I didn't add this", cartlabel='Your cart', item1='Running shoes', p1='€40', item2='Cleaning spray', p2='€5', totl='Total', tot='€45'),
  vars={'--ground': '#FF9EC4', '--fg': '#111111', '--accent': '#FF9EC4', '--wash': '#FF9EC4', '--bgb': '2.1', '--bgc': '.6', '--sc': '1.42', '--sc-x': '-260px', '--sc-y': '60px'}, rec=True)

b, f = scene('348.0', 'natural')
d('03-hidden-fees', 'photo', 'HIDDEN FEES', [8, 7, 4],
  "Photo background in natural colour (her real room, darkened a little so the words read), she puts a finger to her lips, 'shh'. On the left the words HIDDEN FEES huge in pink, and a white price tag: €40 crossed out, €52 knocked out of a black block, '+ service fee' under it. References: Pinterest 'text woven into the photo', viral 6 (a real-looking price as the picture).",
  """.hd{left:52px;top:60px;font-size:150px;color:var(--accent);line-height:.84}
.price{left:56px;top:380px;padding:26px 36px 24px;transform:rotate(-3deg)}
.price .p{font-size:108px;font-weight:900;letter-spacing:-.04em;display:flex;gap:26px;align-items:center;line-height:1}
.price .s{font-size:46px;margin-top:12px;font-family:'Geist';font-weight:800;text-transform:none;letter-spacing:-.02em}""",
  f"""{b}{f}<div class="hd z4" data-k="hd"></div>
<div class="ui price z4" data-move="price"><div class="p"><span class="strike" data-k="old"></span><span class="blk" data-k="new"></span></div><div class="s mono" data-k="fee"></div></div>""",
  dict(hd='Hidden<br>fees', old='€40', new='€52', fee='+ service fee'),
  vars={'--ground': '#111111', '--fg': '#FFFFFF', '--accent': '#FF9EC4', '--dim': 'rgba(17,17,17,.45)', '--sc': '1.4', '--sc-x': '250px', '--sc-y': '60px'})

b, f = scene('208.0')
d('04-cant-cancel', 'photo', "CAN'T CANCEL?", [6, 4, 12],
  "Photo background: her room washed near-black, she in full colour with an unimpressed look. Beside her, three phone screens stacked like cards, the cancel pages everyone has fought: 'Are you sure?', 'Wait! 50% off', 'Tell us why you're leaving'. The words in pink, CANCEL knocked out of a black block. References: Pinterest 'one word in a box', Techquickie face + UI.",
  """.hd{left:54px;top:40px;font-size:128px;color:#fff}
.ph{width:240px;height:440px}
.ph .scr{display:flex;flex-direction:column;justify-content:center;padding:26px;gap:18px}
.ph b{font-size:36px;font-weight:900;letter-spacing:-.03em;line-height:1}
.ph i{font-style:normal;background:#111;color:#fff;font-weight:700;font-size:20px;padding:12px;text-align:center;border-radius:6px}
.ph u{text-decoration:none;color:#6E6E6E;font-weight:600;font-size:18px;text-align:center}""",
  f"""{b}{f}<div class="hd z4" data-k="hd"></div>
<div class="phone ph z4" data-move="phone1" style="left:525px;top:200px;transform:rotate(-5deg)"><div class="scr"><b data-k="s1"></b><i data-k="b1"></i><u data-k="n1"></u></div></div>
<div class="phone ph z4" data-move="phone2" style="left:780px;top:220px;transform:rotate(0deg)"><div class="scr"><b data-k="s2"></b><i data-k="b2"></i><u data-k="n2"></u></div></div>
<div class="phone ph z4" data-move="phone3" style="left:1030px;top:240px;transform:rotate(5deg)"><div class="scr"><b data-k="s3"></b><i data-k="b3"></i><u data-k="n3"></u></div></div>""",
  dict(hd="Can't <span class=\"blkp\">cancel?</span>", s1='Are you sure?', b1='Keep my plan', n1='Continue', s2='Wait! 50% off', b2='Stay and save', n2='No, continue', s3="Tell us why you're leaving", b3='Keep my plan', n3='Next'),
  vars={'--ground': '#111111', '--fg': '#FFFFFF', '--accent': '#FF9EC4', '--wash': '#3A3A3A', '--bgb': '.8', '--sc': '1.38', '--sc-x': '-240px', '--sc-y': '60px'})

COLL = """.scene.natural .bg{filter:saturate(.95) contrast(1.04) brightness(1.08)!important}
.line{position:absolute;left:0;right:0;text-align:center;font-family:'DSerifI';color:#fff;line-height:.95;letter-spacing:-.01em;
 text-shadow:0 3px 0 rgba(0,0,0,.25),0 8px 30px rgba(0,0,0,.45)}
.lab{position:absolute;font-family:'Hand';font-weight:700;font-size:40px;color:#fff;text-shadow:0 2px 8px rgba(0,0,0,.55);white-space:nowrap}
.mini{position:absolute;background:#fff;color:#111;box-shadow:0 14px 24px rgba(0,0,0,.3)}"""
# 05-09: their index.html + content.json are the source now (edited by hand after round 1; not regenerated here).

b, f = scene('459.0', 'natural')
d('10-collage-tricked-at-checkout', 'collage', 'TRICKED AT CHECKOUT?', [7, 8, 11],
  "Collage over her full natural photo (her 10-07 style): three small die-cut objects around her (shopping bags, a gift box with a ticked box, a countdown sticker), one big serif italic line across the middle, two small handwritten labels. Cut to 3 objects after the cold review called the 6-object version cluttered. References: her collage samples 'Capsule wardrobe', 'Time to lock in.', 'Thought of these?'.",
  COLL + """.line{top:470px;font-size:116px}
.bags{left:40px;top:60px;width:250px;transform:rotate(-8deg)}
.gift{left:960px;top:60px;width:260px;transform:rotate(7deg)}
.tm{left:1010px;top:300px;padding:10px 18px;font-family:'GMono';font-weight:700;font-size:56px;background:#111;color:#fff;transform:rotate(-5deg)}
.gck{left:1085px;top:205px;font-size:62px;transform:rotate(7deg)}
.l1{left:950px;top:20px;transform:rotate(-4deg)}.l2{left:1000px;top:390px;transform:rotate(-3deg)}""",
  f"""{b}{f}<img class="stk bags z4" data-img="bags" data-move="bags" src="{A}/collage/bags.png" alt="">
<img class="stk gift z4" data-img="gift" data-move="gift" src="{A}/collage/gift.png" alt=""><span class="abs gck z4" data-move="tick"><span class="box on"></span></span>
<div class="mini tm z4" data-k="timer" data-move="timer"></div>
<div class="lab l1 z5" data-k="lab1"></div><div class="lab l2 z5" data-k="lab2"></div>
<div class="line z5" data-k="line"></div>""",
  dict(line='tricked at checkout?', timer='09:59', lab1='already ticked', lab2='fake timer'),
  images={'bags': f'{A}/collage/bags.png', 'gift': f'{A}/collage/gift.png'},
  vars={'--ground': '#111111', '--fg': '#FFFFFF', '--accent': '#FF9EC4', '--sc': '1.1', '--sc-x': '-40px', '--sc-y': '15px'})

b, f = scene('16.84', 'natural')
d('11-collage-tricks-online-shops-use', 'collage', 'THE TRICKS ONLINE SHOPS USE', [5, 4, 6],
  "Collage over her full natural photo, her palms up as if handing them to you: a tiny 10% OFF pop-up with the guilt-trip 'no' link, a receipt slip with '+ service fee', an 'Only 2 left!' sticker. One serif line, small handwritten labels naming each trick. References: her collage samples ('How to be Feminine', 'in defense of being online').",
  COLL + """.line{top:28px;font-size:96px}
.pp{left:60px;top:220px;transform:rotate(-6deg)}
.rc{left:990px;top:190px;width:250px;padding:18px 18px 24px;transform:rotate(5deg);font-family:'GMono';font-weight:600;font-size:20px;line-height:1.5}
.rc b{display:block;background:#111;color:#FF9EC4;padding:2px 6px;margin-top:6px;font-weight:700}
.o2{left:1000px;top:470px;background:#FF9EC4;color:#111;font-weight:900;font-size:38px;padding:10px 18px;transform:rotate(-6deg);letter-spacing:-.02em}
.l1{left:70px;top:520px;transform:rotate(-4deg)}.l2{left:1030px;top:140px;transform:rotate(3deg)}.l3{left:990px;top:560px;transform:rotate(-2deg)}""",
  f"""{b}{f}<div class="abs pp z4" data-move="popup">{popup(260, 13, 52, 18)}</div>
<div class="mini rc z4" data-move="receipt"><div data-k="r1"></div><div data-k="r2"></div><b data-k="r3"></b></div>
<div class="mini o2 z4" data-k="only" data-move="only2"></div>
<div class="lab l1 z5" data-k="lab1"></div><div class="lab l2 z5" data-k="lab2"></div><div class="lab l3 z5" data-k="lab3"></div>
<div class="line z5" data-k="line"></div>""",
  dict(line='the tricks online shops use', r1='SHOES    €40', r2='DELIVERY  €0', r3='+ FEE    €12', only='Only 2 left!', lab1='guilt-trip button', lab2='hidden fee', lab3='fake scarcity', off='10% OFF', yes='Yes please', no='No thanks, I hate saving money'),
  vars={'--ground': '#111111', '--fg': '#FFFFFF', '--accent': '#FF9EC4', '--sc': '1.14', '--sc-x': '0px', '--sc-y': '28px'})

b, f = scene('384.0', 'natural')
d('12-collage-dark-patterns-explained', 'collage', 'dark patterns, explained', [1, 12, 2],
  "Editorial collage over her full natural photo: 'dark patterns' in big serif italic with a small 'explained' under it, and three die-cut stickers of the tricks themselves around her head: a ticked checkbox, a countdown, a pop-up 'No thanks…' link. Calm face, few objects, one line. References: her collage samples ('Capsule wardrobe' serif across the middle).",
  COLL + """.line{top:14px;font-size:150px}
.ex{position:absolute;left:0;right:0;top:168px;text-align:center;font-family:'GMono';font-weight:600;font-size:34px;letter-spacing:.2em;color:#fff;text-transform:uppercase;text-shadow:0 2px 10px rgba(0,0,0,.5)}
.c1{left:60px;top:520px;padding:16px 22px;font-size:40px;font-weight:800;display:flex;gap:16px;align-items:center;transform:rotate(-7deg);letter-spacing:-.02em}
.c2{left:1000px;top:300px;padding:8px 18px;font-family:'GMono';font-weight:700;font-size:62px;background:#111;color:#fff;transform:rotate(6deg)}
.c3{left:70px;top:320px;padding:14px 20px;font-size:30px;font-weight:600;color:#6E6E6E;text-decoration:underline;transform:rotate(-3deg)}""",
  f"""{b}{f}<div class="mini c1 z4" data-move="checkbox"><span class="box on"></span><span data-k="c1"></span></div>
<div class="mini c2 z4" data-k="c2" data-move="timer"></div><div class="mini c3 z4" data-k="c3" data-move="link"></div>
<div class="line z5" data-k="line"></div><div class="ex z5" data-k="ex"></div>""",
  dict(line='dark patterns', ex='explained', c1='Gift wrap +€2.99', c2='09:59', c3='No thanks, I hate saving money'),
  vars={'--ground': '#111111', '--fg': '#FFFFFF', '--accent': '#FF9EC4', '--sc': '1.1', '--sc-x': '0px', '--sc-y': '50px'})

b, f = scene('90.7', 'natural')
d('13-collage-where-did-12-come-from', 'collage', 'where did €12 come from?', [7, 8, 2],
  "Collage over her full natural photo, her side glance: a long white receipt sticker with '+ service fee €12' circled, the shoe from the product page as a small die-cut, one serif line asking the question everyone asks at checkout. References: her collage samples, viral 9 (a question as the hook).",
  COLL + """.line{top:520px;font-size:104px}
.rc{left:60px;top:60px;width:300px;padding:24px 24px 30px;transform:rotate(-6deg);font-family:'GMono';font-weight:600;font-size:24px;line-height:1.6}
.rc .ring{position:absolute;left:4px;bottom:12px;width:300px;height:66px}
.pc{left:980px;top:60px;width:240px;padding:12px 12px 14px;transform:rotate(6deg)}.pc .im{height:170px;background:url('../../assets/pexels/px-7588163.jpg') center 72%/cover}.pc .pp{font-size:48px;font-weight:900;letter-spacing:-.04em;margin-top:8px}
.l1{left:330px;top:290px;transform:rotate(-6deg)}""",
  f"""{b}{f}<div class="mini rc z4" data-move="receipt"><div data-k="r1"></div><div data-k="r2"></div><div data-k="r3"></div><div style="font-weight:800" data-k="r4"></div>
<svg class="ring" viewBox="0 0 100 40" preserveAspectRatio="none"><path d="M6,22 C4,6 40,2 70,4 C96,6 99,20 92,32 C82,40 20,40 8,30 C3,26 4,18 12,12" fill="none" stroke="#FF4F9A" stroke-linecap="round" vector-effect="non-scaling-stroke" style="stroke-width:5px"/></svg></div>
<div class="mini pc z4" data-move="product"><div class="im"></div><div class="pp" data-k="pp"></div></div>
<div class="lab l1 z5" data-k="lab1"></div><div class="line z5" data-k="line"></div>""",
  dict(line='where did €12 come from?', r1='SHOES ..... €40', r2='SHIPPING .. €0', r3='SUBTOTAL .. €40', r4='+ FEE ..... €12', lab1='', pp='€40'),
  vars={'--ground': '#111111', '--fg': '#FFFFFF', '--accent': '#FF9EC4', '--sc': '1.06', '--sc-x': '0px', '--sc-y': '10px'})

# ---------------------------------------------------------------- FLAT (the film's pink "Blown up" look)
d('14-guilt-trip-buttons', 'flat', 'GUILT-TRIP BUTTONS', [12, 1, 4],
  "Flat pink ground (the film's look): the 10% OFF pop-up at poster size, a huge black YES PLEASE button and, under it, the guilt-trip link 'No thanks, I hate saving money' big enough to read on a phone; a black magnifier blows up 'I hate saving money'. Her small colour cut-out at the right, arms crossed, with a black outline. References: Nerdwriter1 'DARK PATTERNS' (big button vs small link), viral 2, her database-indexes thumbnail (one mechanism, small cut-out with outline).",
  """.hd{left:54px;top:36px;font-size:118px}
.pp{left:54px;top:170px}
.pp .popup{padding:26px 36px 28px}
.lens{left:585px;top:390px;width:290px;height:290px;--lw:16px;--hl:100px;--hw:28px}
.lens .in div{font-weight:900;font-size:44px;line-height:1.14;letter-spacing:-.03em;padding:0 26px}
.cut{right:-70px;height:560px}""",
  f"""<div class="hd z3" data-k="hd"></div><div class="abs pp z2" data-move="popup">{popup(560, 28, 130, 38)}</div>
<div class="lens z4" data-move="lens"><div class="in"><div data-k="big"></div></div></div>
<img class="cut ol z3" data-img="me" data-move="her" src="{A}/cut/gbemi-181.64.png" alt="">""",
  dict(hd='Guilt-trip buttons', big='<span class="blk">I hate saving money</span>', **POP),
  images={'me': f'{A}/cut/gbemi-181.64.png'},
  vars={'--ground': '#FF9EC4', '--fg': '#111111', '--accent': '#FF9EC4', '--ol': '#111111'}, rec=True)

d('16-fake-countdowns', 'flat', 'FAKE COUNTDOWNS', [8, 4, 12],
  "Flat pink ground: one huge black countdown '09:59' with a pink refresh arrow wrapped round it ('it starts again when you refresh'), the price tag beside it so it is clearly a shop, and her small colour cut-out with one finger up, outlined in black. References: viral 2 (one object = the idea), her database-indexes thumbnail (B&W cut-out with outline, one mechanism).",
  """.hd{left:54px;top:34px;font-size:118px}
.tm{left:54px;top:200px;width:700px;background:#111;color:#fff;padding:26px 36px 30px}
.tm .mono{font-size:28px;opacity:.75}
.tm .clock{font-family:'GMono';font-weight:700;font-size:210px;line-height:1;letter-spacing:-.05em}
.rf{position:absolute;left:10px;top:calc(100% + 30px);width:130px;height:130px}
.pt{left:520px;top:540px;background:#fff;color:#111;padding:14px 24px;transform:rotate(-4deg);box-shadow:0 18px 30px rgba(0,0,0,.25)}
.pt b{font-size:64px;font-weight:900;letter-spacing:-.04em;line-height:1}.pt s{font-family:'GMono';font-size:28px;margin-left:12px;color:#6E6E6E}
.cut{right:-40px;height:540px}""",
  f"""<div class="hd z3" data-k="hd"></div>
<div class="abs tm z2" data-move="timer"><div class="mono" data-k="ends"></div><div class="clock" data-k="clock"></div>
<svg class="rf" viewBox="0 0 100 100"><path d="M78,30 A36,36 0 1 0 84,62" fill="none" stroke="#111" stroke-width="12" stroke-linecap="round"/><path d="M62,22 L84,28 L80,6" fill="none" stroke="#111" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
<div class="abs pt z4" data-move="price"><b data-k="price"></b><s data-k="was"></s></div>
<img class="cut ol z3" data-img="me" data-move="her" src="{A}/cut/gbemi-84.0.png" alt="">""",
  dict(hd='Fake countdowns', ends='Sale ends in', clock='09:59', price='€29', was='€59'),
  images={'me': f'{A}/cut/gbemi-84.0.png'},
  vars={'--ground': '#FF9EC4', '--fg': '#111111', '--accent': '#FF9EC4', '--ol': '#111111'})

d('17-only-2-left', 'flat', 'ONLY 2 LEFT?', [7, 8],
  "Flat pink ground, no face: the same product card twice, MONDAY and A WEEK LATER, the same shoe and the same 'Only 2 left in stock' sticker both times. Anyone sees the stock line is fake. References: viral 2 (object = the idea), YouTube 'Day 1 / Day 900' splits.",
  """.hd{left:0;right:0;text-align:center;top:30px;font-size:128px}
.pc{top:180px;width:500px;padding:18px 18px 24px}
.pc .im{height:250px;background:url('../../assets/pexels/px-7588163.jpg') center 72%/cover}
.pc .mono{font-size:30px;margin:16px 4px 8px}
.pc .st{display:inline-block;background:#111;color:#FF9EC4;font-weight:900;font-size:42px;letter-spacing:-.02em;padding:6px 14px;margin-left:4px;white-space:nowrap}
.ar{left:604px;top:380px;font-size:90px;font-weight:900}""",
  f"""<div class="hd z3" data-k="hd"></div>
<div class="ui pc z2" style="left:70px;transform:rotate(-3deg)" data-move="card1"><div class="im"></div><div class="mono" data-k="d1"></div><span class="st" data-k="s1"></span></div>
<div class="abs ar z2" data-k="arrow" data-move="arrow"></div>
<div class="ui pc z2" style="left:720px;transform:rotate(3deg)" data-move="card2"><div class="im"></div><div class="mono" data-k="d2"></div><span class="st" data-k="s2"></span></div>""",
  dict(hd='Only 2 left?', d1='Monday', s1='Only 2 left in stock', d2='A week later', s2='Only 2 left in stock', arrow='→'),
  vars={'--ground': '#FF9EC4', '--fg': '#111111', '--accent': '#FF9EC4'})

d('18-confusing-checkboxes', 'flat', 'CONFUSING CHECKBOXES', [5, 4, 6],
  "Flat pink ground: one giant email checkbox with the sentence everyone reads three times ('Untick this box if you don't want to stop receiving emails'), the three negatives knocked out of black blocks, a big question mark; her small black-and-white cut-out with the unimpressed look. References: viral 6 (a screen as the picture), the film's 'trick wording' scene.",
  """.hd{left:54px;top:34px;font-size:92px}
.cb{left:54px;top:190px;width:880px;padding:36px 40px;display:flex;gap:30px;align-items:flex-start}
.cb .box{font-size:84px;flex:none;margin-top:6px}
.cb p{font-size:60px;font-weight:800;line-height:1.14;letter-spacing:-.025em}
.q{left:560px;top:430px;font-size:240px;font-weight:900;transform:rotate(10deg);line-height:1}
.cut{right:-60px;height:500px}""",
  f"""<div class="hd z3" data-k="hd"></div><div class="abs q z1" data-k="q" data-move="question"></div>
<div class="ui cb z2" data-move="checkbox"><span class="box on"></span><p data-k="line"></p></div>
<img class="cut bw z3" data-img="me" data-move="her" src="{A}/cut/gbemi-208.0.png" alt="">""",
  dict(hd='Confusing checkboxes', q='', line='<span class="blk">Untick</span> this box if you <span class="blk">don\'t</span> want to <span class="blk">stop</span> receiving emails'),
  images={'me': f'{A}/cut/gbemi-208.0.png'},
  vars={'--ground': '#FF9EC4', '--fg': '#111111', '--accent': '#FF9EC4', '--ol': '#111111'})

d('19-dark-patterns-under-the-lens', 'flat', 'DARK PATTERNS', [12, 4, 5],
  "Flat black ground (the film's look inverted): DARK PATTERNS huge in pink, a white checkout summary, and the black-and-pink magnifier over the one line that should not be there: '+ Service fee €12'. Her calm colour cut-out with a pink outline. References: her database-indexes thumbnail (topic huge, one mechanism, dark ground, cut-out with outline), viral 1 (topic name).",
  """.hd{left:54px;top:36px;font-size:128px;color:var(--accent)}
.co{left:54px;top:230px;width:600px;padding:26px 32px}
.co .row{font-size:34px;font-weight:700;padding:12px 0}
.co .row span:last-child{font-family:'GMono'}
.lens{left:280px;top:350px;width:370px;height:370px;--lw:18px;--hl:110px;--hw:30px;border-color:#FF9EC4}
.lens::after{background:#FF9EC4}
.lens .in div{font-size:42px;font-weight:900;letter-spacing:-.03em;line-height:1.1;padding:0 14px}
.cut{right:-30px;height:520px;--ol:#FF9EC4}""",
  f"""<div class="hd z3" data-k="hd"></div>
<div class="ui co z2" data-move="checkout"><div class="mono" style="font-size:22px;opacity:.6" data-k="lab"></div>
<div class="row"><span data-k="i1"></span><span data-k="p1"></span></div><div class="rule"></div>
<div class="row"><span data-k="i2"></span><span data-k="p2"></span></div><div class="rule"></div>
<div class="row"><span data-k="i3"></span><span data-k="p3"></span></div></div>
<div class="lens z4" data-move="lens"><div class="in"><div data-k="big"></div></div></div>
<img class="cut ol z3" data-img="me" data-move="her" src="{A}/cut/gbemi-384.0.png" alt="">""",
  dict(hd='Dark patterns', lab='Checkout', i1='Shoes', p1='€40', i2='Delivery', p2='€0', i3='Service fee', p3='€12', big='<span class="blk">+ Service fee</span><br><span class="blk">€12</span>'),
  images={'me': f'{A}/cut/gbemi-384.0.png'},
  vars={'--ground': '#111111', '--fg': '#FFFFFF', '--accent': '#FF9EC4', '--ol': '#FF9EC4'})

# ---------------------------------------------------------------- OTHER (no face, split / document / diagram)
d('15-40-to-52', 'other', '€40 → €52', [5, 4, 8],
  "Split before/after, no face (kit T4): left the product page, the shoe at €40; right the checkout, the same shoe, a big '+ Service fee €12' knocked out of a black block and the total €52; one thick arrow between. 'Service fee' made big after the cold review. References: viral 6 (a real-looking screen), YouTube before/after splits.",
  """.hd{left:0;right:0;text-align:center;top:26px;font-size:150px}
.pg{top:220px;width:520px;height:420px;padding:20px}
.pg .mono{font-size:26px;opacity:.55}
.pg .im{height:200px;margin-top:12px;background:url('../../assets/pexels/px-7588163.jpg') center 72%/cover}
.pg .pr{font-size:80px;font-weight:900;letter-spacing:-.04em;margin-top:18px}
.pg .row{font-size:36px;font-weight:700;padding:6px 0}
.pg .fee{font-size:46px;font-weight:900;margin-top:8px;display:inline-block}
.ar{left:590px;top:380px;font-size:110px;font-weight:900}""",
  f"""<div class="hd z3" data-k="hd"></div>
<div class="ui pg z2" style="left:50px" data-move="product"><div class="mono" data-k="l1"></div><div class="im"></div><div class="pr" data-k="pr1"></div></div>
<div class="abs ar z2" data-k="arrow" data-move="arrow"></div>
<div class="ui pg z2" style="left:710px" data-move="checkout"><div class="mono" data-k="l2"></div>
<div class="row" style="margin-top:20px"><span data-k="i1"></span><span data-k="p1"></span></div><div class="rule"></div>
<div><span class="fee blk" data-k="fee"></span></div><div class="pr" data-k="pr2"></div></div>""",
  dict(hd='€40 → €52', l1='Product page', pr1='€40', l2='Checkout', i1='Shoes', p1='€40', fee='+ Service fee €12', pr2='Total €52', arrow=''),
  vars={'--ground': '#FF9EC4', '--fg': '#111111', '--accent': '#FF9EC4'}, rec=True)

d('20-is-this-legal', 'other', 'IS THIS LEGAL?', [9, 10],
  "Her ghana 10b look: plain white ground, a newspaper-style clipping (serif headline, slight tilt, no source line or date) with the true fact 'Amazon to pay $2.5 billion to settle FTC case over Prime sign‑ups', '$2.5 billion' highlighted pink; beside it a generic phone with a pre-ticked 'Start my free trial' box. True: FTC, 25 Sep 2025, $1 billion penalty + up to $1.5 billion refunds; no Amazon UI or logo is drawn.",
  """.t{background:var(--ground,#FFFFFF)}
.hd{left:56px;top:40px;font-size:124px}
.clip{left:50px;top:220px;width:770px;background:#FBF8F2;padding:34px 40px 40px;transform:rotate(-2.5deg);box-shadow:0 20px 40px rgba(0,0,0,.18)}
.clip p{font-family:'DSerif';font-size:66px;line-height:1.08;color:#111;letter-spacing:-.01em}
.clip p span{background:#FF9EC4;padding:0 .08em}
.ph{left:870px;top:150px;width:320px;height:540px;transform:rotate(5deg)}
.ph .scr{padding:40px 26px;display:flex;flex-direction:column;gap:26px}
.ph .mono{font-size:22px;opacity:.6}
.ph .ln{display:flex;gap:16px;align-items:flex-start;font-size:32px;font-weight:800;letter-spacing:-.02em;line-height:1.1}
.ph .ln .box{font-size:44px;flex:none}
.ph i{font-style:normal;background:#111;color:#fff;font-weight:800;font-size:26px;padding:16px;text-align:center;border-radius:8px;margin-top:auto}""",
  f"""<div class="hd z3" data-k="hd"></div>
<div class="abs clip z2" data-move="clipping"><p data-k="head"></p></div>
<div class="phone ph z2" data-move="phone"><div class="scr"><div class="mono" data-k="lab"></div><div class="ln"><span class="box on"></span><span data-k="tick"></span></div><i data-k="btn"></i></div></div>""",
  dict(hd='Is this legal?', head='Amazon to pay <span>$2.5 billion</span> to settle FTC case over Prime sign‑ups', lab='Checkout', tick='Start my free trial', btn='Place order'),
  vars={'--ground': '#FFFFFF', '--fg': '#111111', '--accent': '#FF9EC4'})

d('21-eu-checked-399-shops', 'other', 'EU CHECKED 399 SHOPS', [9, 8],
  "A real source, no face: the European Commission's own press release headline (30 Jan 2023), cropped and untouched, on a white card with a small credit, and the result as a big counter: 148 of 399 shops used a trick. Pink ground. References: viral 6 (a real document as the picture), her october-attacks liking for real headline clippings.",
  """.hd{left:54px;top:34px;font-size:100px}
.src{left:620px;top:400px;width:620px;transform:rotate(2deg);background:#fff;padding:22px 26px;box-shadow:0 20px 40px rgba(0,0,0,.2)}
.src img{display:block;width:100%}
.cr{position:absolute;left:0;top:100%;margin-top:10px;font-family:'GMono';font-weight:600;font-size:18px;letter-spacing:.04em;text-transform:uppercase;white-space:nowrap}
.big{left:54px;top:220px;flex-direction:column;align-items:flex-start;display:flex;align-items:flex-end;gap:22px}
.big b{font-size:230px;font-weight:900;letter-spacing:-.05em;line-height:.8}
.big span{font-size:58px;font-weight:800;letter-spacing:-.02em;line-height:1.05;padding-bottom:6px}""",
  f"""<div class="hd z3" data-k="hd"></div>
<div class="abs src z2" data-move="release"><img data-img="src" src="{A}/src/ec-head.png" alt=""><div class="cr" data-k="credit"></div></div>
<div class="abs big z2" data-move="counter"><b class="blk" data-k="n"></b><span data-k="of"></span></div>""",
  dict(hd='EU checked 399 shops', credit='European Commission, 30 Jan 2023', n='148', of='used at least one<br>dark pattern'),
  images={'src': f'{A}/src/ec-head.png'},
  vars={'--ground': '#FF9EC4', '--fg': '#111111', '--accent': '#FF9EC4'})

d('22-easy-to-join-hard-to-leave', 'other', 'EASY TO JOIN, HARD TO LEAVE', [10, 6],
  "Diagram, no face: on the left one big black 'Start free trial' button, labelled 1 CLICK; on the right the way out as a staircase of four screens ('Are you sure?', 'Wait! 50% off', 'Tell us why', 'Confirm on desktop') ending at a small 'Cancelled'. Flat pink. References: her database-indexes thumbnail (one mechanism drawn big), viral 4 (a diagram).",
  """.hd{left:54px;top:30px;font-size:92px;line-height:1.06}
.jb{left:54px;top:330px;background:#111;color:#fff;font-weight:900;font-size:50px;letter-spacing:-.02em;padding:34px 38px}
.jl{left:60px;top:470px;font-size:34px}
.st{position:absolute;width:230px;padding:18px 18px;font-weight:800;font-size:30px;letter-spacing:-.02em;line-height:1.05}
.st small{display:block;font-family:'GMono';font-weight:600;font-size:20px;letter-spacing:.04em;opacity:.85;margin-bottom:6px}
.done{left:900px;top:615px;font-size:28px;padding:10px 14px;background:#111;color:#FF9EC4}""",
  f"""<div class="hd z3" data-k="hd"></div>
<div class="abs jb z2" data-k="join" data-move="join"></div><div class="abs mono jl z2" data-k="jl"></div>
<div class="ui st z2" style="left:480px;top:250px" data-move="s1"><small>1</small><span data-k="s1"></span></div>
<div class="ui st z2" style="left:630px;top:330px" data-move="s2"><small>2</small><span data-k="s2"></span></div>
<div class="ui st z2" style="left:780px;top:410px" data-move="s3"><small>3</small><span data-k="s3"></span></div>
<div class="ui st z2" style="left:930px;top:490px" data-move="s4"><small>4</small><span data-k="s4"></span></div>
<div class="abs mono done z2" data-k="done" data-move="done"></div>""",
  dict(hd='Easy to join,<br><span class="blk">hard to leave</span>', join='Start free trial', jl='1 click', s1='Are you sure?', s2='Wait! 50% off', s3='Tell us why', s4='Confirm on desktop', done='Cancelled'),
  vars={'--ground': '#FF9EC4', '--fg': '#111111', '--accent': '#FF9EC4'})

for x in D:
    if only and not any(x['name'].startswith(o) for o in only): continue
    p = os.path.join(ROOT, 'directions', x['name']); os.makedirs(p, exist_ok=True)
    html = (f'<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../../lib/dp.css"><style>\n{x["css"]}\n</style></head>'
            f'<body><div class="t {x["cls"]}">\n{x["body"]}\n</div><script src="../../lib/bind.js"></script></body></html>\n')
    open(os.path.join(p, 'index.html'), 'w').write(html)
    cj = os.path.join(p, 'content.json')
    if force or not os.path.exists(cj):
        imgs = dict(x['images'])
        # photo layers: let her swap the room and her picture in the editor
        import re
        for k in ('room', 'me'):
            m = re.search(r'data-img="%s" src="([^"]+)"' % k, x['body'])
            if m and k not in imgs: imgs[k] = m.group(1)
        c = dict(direction=x['direction'], thumbnail_text=x['words'], titles=x['titles'], title=x['titles'][0], kind=x['kind'],
                 text=x['text'], images=imgs, vars=x['vars'])
        if x['rec']: c['recommended'] = True
        json.dump(c, open(cj, 'w'), indent=1, ensure_ascii=False)
print(len(D), 'directions')
