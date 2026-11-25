#!/usr/bin/env python3
"""Builds the dark-patterns thumbnail set of 2026-11-12 (12 directions, each copying one named thumbnail-board item,
fonts only from the font board). OVERWRITES content.json + index.html: do not run after her studio edits.
   python3 tools/make-set-2026-11-12.py [prefix ...]"""
import json, os, sys
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
D = os.path.join(ROOT, 'directions')
S = '../../assets/shoot/'
PX = '../../assets/pexels/'

def page(css, body):
    return ('<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../../lib/set.css"><style>\n'
            + css.strip() + '\n</style></head><body><div class="t">\n' + body.strip()
            + '\n</div><script src="../../lib/bind.js"></script></body></html>\n')

def photo(n, dim=True):
    return (f'<div class="pf z1"><img class="room" data-img="room" src="{S}{n}.jpg" alt="">'
            + ('<div class="dim"></div>' if dim else '') + '</div>'
            + f'<img class="me" data-img="me" src="{S}{n}-person.png" alt="">')

SET = []

# 01 ---------------------------------------------------------------------------------------------------------------
SET.append(dict(
 name='01-apps-that-trick-you', kind='photo', recommended=False,
 board='Thumbnails 84 (yt-31 "you\'re wasting your 20s": he sits in his real room, holds the topic object up on one side, three lines of lowercase bold on the other, one word in red)',
 fonts='Font 65 (Poppins Bold lowercase, red key word, from Thumbnails 84)',
 colours='Font 65 specimen (Thumbnails 84): white #FFFFFF words, red #E5342B key word, on a dark ground (her room dimmed 50%, like #2A2522); phone text = Font 58 (Inter Tight, black on light)',
 thumbnail_text='shops that trick you',
 direction='Her real room (shoot photo 1559, white shirt, palm up), the room dimmed so the words pop, she natural on top. On her palm a phone with a shop pop-up whose small grey link says "No thanks, I hate saving money". Three lowercase lines on the left, "trick" in red. The phone predicts the title.',
 titles=['Dark Patterns: "No Thanks, I Hate Saving Money" Has a Name',
         'The Tricks Online Shops Use to Make You Say Yes',
         'Dark Patterns Explained: 11 Tricks Websites Use on You'],
 text={'hd': 'shops that<br><span class="r">trick</span><br>you', 'off': '10% OFF', 'sub': '', 'yes': 'Yes please', 'no': 'No thanks, I hate saving money'},
 images={'room': S + '1559.jpg', 'me': S + '1559-person.png'},
 vars={'--pw': '1500px', '--pl': '-20px', '--pt': '-240px', '--dim': 'rgba(10,10,10,.5)'},
 css='''
.hd{left:36px;top:140px;font-family:'Poppins';font-weight:700;font-size:104px;line-height:.9;letter-spacing:-.045em;color:#fff}
.hd .r{color:#E5342B}
.phone{left:996px;top:120px;width:270px;height:560px;transform:rotate(5deg)}
.scr{display:flex;flex-direction:column;justify-content:center;padding:0 16px;text-align:center;font-family:'Inter Tight'}
.scr .off{font-weight:900;font-size:66px;letter-spacing:-.04em;line-height:.9}
.scr .sub{font-size:22px;font-weight:600;margin-top:8px}
.scr .yes{background:#111;color:#fff;font-weight:700;font-size:26px;padding:16px 0;margin-top:24px;border-radius:12px}
.scr .no{font-size:36px;font-weight:700;color:#444;margin-top:12px;line-height:1.2;text-decoration:underline;text-underline-offset:.18em}
''',
 body=photo('1559') + '''
<div class="a hd sh z4 nw" data-k="hd"></div>
<div class="phone z5" data-move="phone"><div class="scr"><div class="off" data-k="off"></div><div class="sub" data-k="sub"></div><div class="yes" data-k="yes"></div><div class="no" data-k="no"></div></div></div>'''))

# 02 ---------------------------------------------------------------------------------------------------------------
SET.append(dict(
 name='02-this-timer-is-fake', kind='cut-out', recommended=True,
 board='Thumbnails 68 (yt-15 "stop lying to yourself!": black ground, two lines of white lowercase bold on the left, one word knocked out of a red box, the speaker large on the right)',
 fonts='Font 64 (Inter Tight Bold lowercase + red box, from Thumbnails 68)',
 colours='Font 64 specimen (Thumbnails 68): ground #111111, words #FFFFFF, red box #E2231A; timer card = Font 58 (black Inter Tight on light)',
 thumbnail_text='this timer is fake',
 direction='Black ground, her cut-out large on the right (photo 1558, unconvinced smile). Left: "this timer is fake" in white lowercase, "fake" in a red box; under it a shop countdown "Sale ends in 09:59" in big digits (generic, no shop).',
 titles=['That Countdown Timer Is Fake. 11 Tricks Online Shops Use',
         'Dark Patterns Examples: How Online Shops Trick You',
         'Dark Patterns in E-Commerce: 11 Checkout Tricks to Spot'],
 text={'hd': 'this timer<br>is <span class="box">fake</span>', 'lab': 'Sale ends in', 'clock': '09:59'},
 images={'cut': S + '1558-cut.png'},
 vars={'--ground': '#111111'},
 css='''
.hd{left:64px;top:96px;font-family:'Inter Tight';font-weight:700;font-size:132px;line-height:1;letter-spacing:-.05em;color:#fff}
.hd .box{background:#E2231A;padding:0 .12em .04em;margin-left:.02em}
.timer{left:64px;top:430px;background:#fff;color:#111;border-radius:22px;padding:22px 34px 18px;font-family:'Inter Tight'}
.timer .lab{font-weight:600;font-size:28px;color:#E2231A;letter-spacing:-.01em}
.timer .clock{font-weight:900;font-size:150px;line-height:.9;letter-spacing:-.04em;font-variant-numeric:tabular-nums}
.cut{right:-60px;width:820px;bottom:-96px}
''',
 body='''
<img class="cut z2" data-img="cut" data-move="cut" src="../../assets/shoot/1558-cut.png" alt="">
<div class="a hd z4 nw" data-k="hd"></div>
<div class="a timer z4" data-move="timer"><div class="lab" data-k="lab"></div><div class="clock" data-k="clock"></div></div>'''))

# 03 ---------------------------------------------------------------------------------------------------------------
SET.append(dict(
 name='03-hard-to-cancel', kind='photo', recommended=False,
 board='Thumbnails 116 (yt-63 "CODE IN 2026": the speaker in his real room, three short words stacked in separate boxes on the left, the middle box a different colour)',
 fonts='Font 7 (Archivo 800 at 75% width, Design 367) / Font 77 (Archivo, Design 351)',
 colours='Font 77 specimen (Design 351): ink #101114 on cream #E6DFCD boxes, over her room dimmed 62%',
 thumbnail_text='SUBSCRIPTIONS YOU CAN\'T CANCEL',
 direction='Her real room (photo 1564, hand on cheek, fed up), room dimmed, she natural. Three stacked boxes on the left: SUBSCRIPTIONS / YOU CAN\'T / CANCEL (all three in the cream of the Archivo specimen). The words name the trap everyone has met.',
 titles=['Hard to Cancel Subscriptions? 11 Dark Patterns Explained',
         'Dark Patterns Explained: 11 Tricks Websites Use on You',
         'Dark Patterns in UX: 11 Examples and Why Companies Use Them'],
 text={'w1': 'SUBSCRIPTIONS', 'w2': 'YOU CAN\'T', 'w3': 'CANCEL', 'keep': 'Keep my plan', 'cx': 'cancel'},
 images={'room': S + '1564.jpg', 'me': S + '1564-person.png'},
 vars={'--pw': '1700px', '--pl': '0px', '--pt': '-268px', '--dim': 'rgba(10,10,10,.62)'},
 css='''
.w{position:absolute;left:44px;font-family:'Archivo';font-weight:800;font-stretch:75%;font-size:82px;line-height:1;letter-spacing:-.03em;
  background:#E6DFCD;color:#101114;padding:10px 26px 8px;box-shadow:0 14px 30px rgba(0,0,0,.35)}
.w1{top:70px}.w2{top:200px}.w3{top:330px}
.ui{left:44px;top:486px;width:470px;background:#E9E7E3;border-radius:22px;padding:22px 26px 18px;text-align:center;font-family:'Inter Tight';box-shadow:0 14px 30px rgba(0,0,0,.35)}
.ui .keep{background:#111;color:#fff;font-weight:700;font-size:40px;letter-spacing:-.03em;padding:16px 0;border-radius:14px}
.ui .cx{color:#6f6f6f;font-weight:600;font-size:28px;margin-top:12px;text-decoration:underline}
''',
 body=photo('1564') + '''
<div class="w w1 z4 nw" data-k="w1"></div><div class="w w2 z4 nw" data-k="w2"></div><div class="w w3 z4 nw" data-k="w3"></div>
<div class="a ui z4" data-move="buttons"><div class="keep" data-k="keep"></div><div class="cx" data-k="cx"></div></div>'''))

# 04 ---------------------------------------------------------------------------------------------------------------
SET.append(dict(
 name='04-hidden-fees', kind='object', recommended=False,
 board='Thumbnails 91 (yt-38 "TWO SUM": a real object photo (a notepad and a hand drawing on it) fills the frame, two huge heavy words on top, a red hand-drawn mark on the object)',
 fonts='Font 77 (Archivo 900 condensed, Design 351) for the words and the note',
 colours='Font 77 / Font 97 colour combo (Design 351): ground #E6DFCD (photo multiplied onto it), ink #101114, note on yellow #E5C63A, ring #173DAF',
 thumbnail_text='HIDDEN FEES',
 direction='No face. A real photo of two hands holding a long shop receipt (Pexels 4959926, free licence) on the cream of the Archivo specimen. HIDDEN FEES huge on the right; a blue marker circle on one line of the receipt with a note on a yellow tag "€40 → €52?" (the price that grows at checkout, her shoe example).',
 titles=['Dark Patterns in E-Commerce: 11 Checkout Tricks to Spot',
         'Dark Patterns Examples: How Online Shops Trick You',
         'What Are Dark Patterns? 11 Examples From Online Shops'],
 text={'hd': 'HIDDEN<br>FEES', 'note': '€40 → €52?'},
 images={'obj': PX + 'px-4959926.jpg'},
 vars={'--ground': '#E6DFCD'},
 css='''
.obj{position:absolute;left:-110px;top:-330px;width:780px;mix-blend-mode:multiply;filter:brightness(1.16) contrast(1.05)}
.hd{left:640px;top:170px;font-family:'Archivo';font-weight:900;font-stretch:62%;font-size:220px;line-height:.86;letter-spacing:-.02em;color:#101114}
.ring{left:150px;top:170px;width:200px;height:110px}
.note{left:300px;top:70px;font-family:'Archivo';font-weight:900;font-stretch:62%;font-size:96px;line-height:1;color:#101114;background:#E5C63A;padding:6px 18px 4px;transform:rotate(-4deg)}
''',
 body='''
<img class="obj z1" data-img="obj" data-move="obj" src="../../assets/pexels/px-4959926.jpg" alt="">
<div class="a hd z4 nw" data-k="hd"></div>
<svg class="a ring z4" data-move="ring" viewBox="0 0 230 130"><path d="M40 20 C110 -4 222 18 220 64 C218 112 92 128 28 104 C-8 90 4 40 64 18" fill="none" stroke="#173DAF" stroke-width="9" stroke-linecap="round"/></svg>
<div class="a note z4 nw" data-k="note"></div>'''))

# 05 ---------------------------------------------------------------------------------------------------------------
SET.append(dict(
 name='05-how-apps-make-you-say-yes', kind='photo', recommended=False,
 board='Thumbnails 28 (pin-02-11 "how I bend time", one of her likes: she talks in her real room, one lowercase line across the top, a small second line at the bottom, hand-drawn scribbles around her)',
 fonts='Font 25 (Figtree ExtraBold, Design 370)',
 colours='Font 101 colour combo (Design 370): words #FFFFFF, scribbles #F3E58B, room dimmed with #283A5A',
 thumbnail_text='how apps make you say yes',
 direction='Her real room (photo 1550, both hands open, explaining), room dimmed in navy so the white words pop, she natural. Top: "how apps make you say yes"; bottom: "(and why it works)". Yellow hand-drawn doodles of what she means around her: a ticked box, a cart, a stopwatch.',
 titles=['Dark Patterns Explained: 11 Tricks Websites Use on You',
         'What Are Dark Patterns? 11 Examples From Online Shops',
         'Dark Patterns in UX: 11 Examples and Why Companies Use Them'],
 text={'hd': 'how apps make you say yes', 'sub': '(and why it works)'},
 images={'room': S + '1550.jpg', 'me': S + '1550-person.png'},
 vars={'--pw': '1520px', '--pl': '-170px', '--pt': '-230px', '--dim': 'rgba(40,58,90,.55)'},
 css='''
.hd{left:0;right:0;top:34px;text-align:center;font-family:'Figtree';font-weight:800;font-size:96px;letter-spacing:-.035em;line-height:1;color:#fff}
.sub{left:0;right:0;top:138px;text-align:center;font-family:'Figtree';font-weight:700;font-size:50px;letter-spacing:-.02em;color:#F3E58B}
.doo{position:absolute;fill:none;stroke:#F3E58B;stroke-width:7;stroke-linecap:round;stroke-linejoin:round}
.d1{left:70px;top:230px;width:190px;height:190px}.d2{left:1010px;top:200px;width:210px;height:180px}.d3{left:120px;top:470px;width:170px;height:170px}
''',
 body=photo('1550') + '''
<div class="a hd sh z5 nw" data-k="hd"></div>
<div class="a sub sh z5 nw" data-k="sub"></div>
<svg class="doo d1 z4" data-move="tick" viewBox="0 0 190 190"><path d="M30 34 L160 30 L164 160 L28 158 Z"/><path d="M58 96 L88 128 L150 46"/></svg>
<svg class="doo d2 z4" data-move="cart" viewBox="0 0 210 180"><path d="M12 22 L48 24 L74 112 L176 110 L196 50 L58 50"/><circle cx="88" cy="146" r="14"/><circle cx="160" cy="146" r="14"/></svg>
<svg class="doo d3 z4" data-move="watch" viewBox="0 0 170 170"><circle cx="85" cy="96" r="62"/><path d="M85 96 L85 60 M85 96 L110 112 M70 18 L100 18 M85 18 L85 34"/></svg>'''))

# 06 ---------------------------------------------------------------------------------------------------------------
SET.append(dict(
 name='06-leaving-already', kind='photo', recommended=False,
 board='Thumbnails 104 (yt-51 "Copying / Understanding", one of her likes: she sits thinking, hand at her chin, two short labels in solid colour boxes stacked at the top left, slightly offset)',
 fonts='Font 113 (Inter Tight, Design 270: black on green) + Font 58 (Inter Tight, Thumbnails 31: black/grey on light) for the pop-up',
 colours='Font 113 specimen: black #010000 on green #21F587; Font 58 specimen: black on light #E9E7E3 (the pop-up)',
 thumbnail_text='Leaving already? Stay: 20% off / Leave anyway',
 direction='Her real room (photo 1558, an unconvinced smile), room a little dimmed. The pop-up a shop shows when you try to leave: "Leaving already?" with a big green "Stay: 20% off" and a tiny grey "Leave anyway" link.',
 titles=['The Tricks Online Shops Use to Make You Say Yes',
         'Dark Patterns Explained: 11 Tricks Websites Use on You',
         'What Are Dark Patterns? 11 Examples From Online Shops'],
 text={'q': 'Leaving<br>already?', 'yes': 'Stay: 20% off', 'no': 'Leave anyway'},
 images={'room': S + '1558.jpg', 'me': S + '1558-person.png'},
 vars={'--pw': '1700px', '--pl': '0px', '--pt': '-300px', '--dim': 'rgba(10,10,10,.35)'},
 css='''
.lb{position:absolute;font-family:'Inter Tight';font-weight:900;letter-spacing:-.035em;line-height:1;padding:12px 24px 14px;box-shadow:0 14px 30px rgba(0,0,0,.3)}
.pop{left:30px;top:96px;width:580px;height:440px;background:#E9E7E3;border-radius:28px;box-shadow:0 24px 50px rgba(0,0,0,.4)}
.q{left:62px;top:122px;line-height:1;font-family:'Inter Tight';font-weight:700;font-size:56px;letter-spacing:-.04em;color:#111}
.yes{left:62px;top:280px;font-size:80px;background:#21F587;color:#010000}
.no{left:62px;top:428px;font-size:34px;font-weight:600;background:none;box-shadow:none;padding:0;color:#7a7a7a;text-decoration:underline;text-underline-offset:.15em}
''',
 body=photo('1558') + '''
<div class="a pop z4" data-move="popup"></div>
<div class="a q z5 nw" data-k="q"></div>
<div class="lb yes z5 nw" data-k="yes"></div>
<div class="lb no z5 nw" data-k="no"></div>'''))

# 07 ---------------------------------------------------------------------------------------------------------------
SET.append(dict(
 name='07-why-shops-trick-you', kind='flat', recommended=False,
 board='Thumbnails 89 (yt-36 "WHAT IS SPACE COMPLEXITY OF ALGORITHMS": flat yellow, heavy red caps stacked on the left, a simple black line drawing of the topic on the right)',
 fonts='Font 9 (Inter Tight Black, Design 394: black on lime), also for the words inside the drawing',
 colours='Font 9 specimen (Design 394): ground #D9F44F, words and drawing #000000',
 thumbnail_text='WHY SHOPS TRICK YOU',
 direction='No face. Flat lime, WHY SHOPS TRICK YOU in heavy black caps on the left. On the right a black line drawing of a generic checkout: "Only 2 left!" in red, a box already ticked, and the Pay button. Drawn, so obviously not a real shop.',
 titles=['Dark Patterns in UX: 11 Examples and Why Companies Use Them',
         'What Are Dark Patterns? 11 Examples From Online Shops',
         'Dark Patterns Explained: 11 Tricks Websites Use on You'],
 text={'hd': 'WHY<br>SHOPS<br>TRICK<br>YOU', 'clock': 'Only 2 left!', 'gift': 'Gift wrap', 'left': '', 'pay': 'PAY NOW'},
 images={},
 vars={'--ground': '#D9F44F'},
 css='''
.hd{left:60px;top:44px;font-family:'Inter Tight';font-weight:900;font-size:150px;line-height:.9;letter-spacing:-.05em;color:#000000}
.win{left:640px;top:100px;width:560px;height:520px;border:8px solid #000000;border-radius:26px;background:#D9F44F}
.bar{position:absolute;left:0;right:0;top:0;height:58px;border-bottom:8px solid #000000}
.bar i{position:absolute;top:18px;width:18px;height:18px;border:5px solid #000000;border-radius:50%}
.in{position:absolute;font-family:'Inter Tight';font-weight:900;color:#000000}
.clock{left:40px;top:104px;font-size:76px;letter-spacing:-.02em;line-height:1;color:#000000}
.chk{left:40px;top:256px;font-size:52px;display:flex;align-items:center;gap:20px}
.chk b{display:inline-block;width:58px;height:58px;border:6px solid #000000;border-radius:8px;position:relative;background:#000000}
.chk b::after{content:"";position:absolute;left:14px;top:2px;width:16px;height:32px;border:solid #D9F44F;border-width:0 8px 8px 0;transform:rotate(45deg)}
.tag{left:316px;top:-30px;font-size:38px;background:#E4262B;color:#fff;padding:8px 16px;transform:rotate(8deg);border:5px solid #111}
.pay{left:40px;right:40px;top:368px;height:104px;border:8px solid #000000;border-radius:18px;background:transparent;color:#000000;font-size:58px;display:flex;align-items:center;justify-content:center}
''',
 body='''
<div class="a hd z3 nw" data-k="hd"></div>
<div class="a win z2" data-move="checkout"><div class="bar"><i style="left:22px"></i><i style="left:56px"></i><i style="left:90px"></i></div>
 <div class="in clock" data-k="clock"></div>
 <div class="in chk"><b></b><span data-k="gift"></span></div>
 <div class="in pay" data-k="pay"></div>
 <div class="in tag nw" data-k="left"></div>
</div>'''))

# 08 ---------------------------------------------------------------------------------------------------------------
SET.append(dict(
 name='08-i-didnt-add-this', kind='cut-out', recommended=False,
 board='Thumbnails 82 (yt-29 "vercel.app / .com": flat orange, two light chips stacked on the left, one with a red plus (added for you), one with a green tick, the creator pointing from the right)',
 fonts='Font 31 (Inter Tight, Design 406: cream words in ink boxes on orange) for the chips and the note',
 colours='Font 31 / Font 111 specimen (Design 406): ground #D16A3C, boxes #0C160C, words #F5EFDE; tick #21A85A, cross #E0282B',
 thumbnail_text='Running shoes €40 / Cleaning spray €5: I didn\'t add this',
 direction='Flat orange. One cart line, big: "Cleaning spray €5" with a red cross, and "I didn\'t add this!" in a tilted box. Her cut-out on the right (photo 1562, hand up: "what is this?"). The example is the one she gives in the video.',
 titles=['How Websites Trick You Into Buying Things You Didn\'t Add',
         'Dark Patterns Examples: How Online Shops Trick You',
         'Dark Patterns in E-Commerce: 11 Checkout Tricks to Spot'],
 text={'b': 'Cleaning spray <b>+€5</b>', 'note': 'I didn\'t add this!'},
 images={'cut': S + '1562-cut.png'},
 vars={'--ground': '#D16A3C'},
 css='''
.chip{position:absolute;display:flex;align-items:center;gap:22px;background:#0C160C;color:#F5EFDE;border-radius:22px;padding:20px 28px 20px 30px;
  font-family:'Inter Tight';font-weight:700;font-size:52px;letter-spacing:-.03em;box-shadow:0 16px 34px rgba(0,0,0,.25)}
.chip b{font-weight:900;margin-left:10px}
.chip i{display:inline-block;width:70px;height:70px;border-radius:50%;position:relative;flex:none}
.ok{left:44px;top:130px}.ok i{background:#21A85A}
.ok i::after{content:"";position:absolute;left:24px;top:12px;width:16px;height:32px;border:solid #fff;border-width:0 8px 8px 0;transform:rotate(45deg)}
.bad{left:44px;top:120px;font-size:74px;padding:26px 36px 26px 30px}.bad i{width:96px!important;height:96px!important}.bad i::before,.bad i::after{left:44px!important;top:20px!important;height:56px!important}.bad i{background:#E0282B}
.bad i::before,.bad i::after{content:"";position:absolute;left:31px;top:15px;width:8px;height:40px;background:#fff;border-radius:3px;transform:rotate(45deg)}
.bad i::before{transform:none}.bad i::after{transform:rotate(90deg)}
.note{left:84px;top:320px;font-family:'Inter Tight';font-weight:900;font-size:72px;letter-spacing:-.04em;color:#F5EFDE;background:#0C160C;padding:10px 24px 14px;transform:rotate(-3deg)}
.cut{right:-130px;width:760px;bottom:-110px}
''',
 body='''
<img class="cut z2" data-img="cut" data-move="cut" src="../../assets/shoot/1562-cut.png" alt="">
<div class="chip bad z4 nw" data-move="chip-bad"><i></i><span data-k="b"></span></div>
<div class="a note z4 nw" data-k="note"></div>'''))

# 09 ---------------------------------------------------------------------------------------------------------------
SET.append(dict(
 name='09-free-trial-trap', kind='cut-out', recommended=False,
 board='Thumbnails 98 (yt-45 "IT\'S A TRAP": three chunky words in one line across the top, the picture of the trap underneath on the left, the creator on the right)',
 fonts='Font 5 (Anton, Design 368) + Font 112 (Inter Tight, Design 116: white on navy) for the note; phone text = Font 58',
 colours='Font 5 specimen (Design 368): ground #17357B, words #D8CDBB; note #FFFFFF (Font 112)',
 thumbnail_text='FREE TRIAL TRAP',
 direction='Flat navy. FREE TRIAL TRAP in heavy condensed cream caps across the top. Underneath on the left a phone with a generic sign-up screen: "7 days FREE", a "Start free trial" button and "cancel anytime*", and beside it, with an arrow: "then €79.99 a year". Her cut-out on the right (photo 1557, calm side-eye).',
 titles=['Dark Patterns Explained: 11 Tricks Websites Use on You',
         'Hard to Cancel Subscriptions? 11 Dark Patterns Explained',
         'The Tricks Online Shops Use to Make You Say Yes'],
 text={'hd': 'FREE TRIAL TRAP', 'big': '7 days<br>FREE', 'btn': 'Start free trial', 'fine': '', 'note': 'then €79.99<br>a year'},
 images={'cut': S + '1557-cut.png'},
 vars={'--ground': '#17357B'},
 css='''
.hd{left:44px;top:14px;font-family:'Anton';font-size:168px;line-height:1;letter-spacing:0;color:#D8CDBB}
.phone{left:84px;top:212px;width:296px;height:606px;transform:rotate(-6deg)}
.scr{display:flex;flex-direction:column;justify-content:center;padding:0 20px;text-align:center;font-family:'Inter Tight'}
.scr .big{font-weight:900;font-size:70px;line-height:.92;letter-spacing:-.04em}
.scr .btn{background:#111;color:#fff;font-weight:700;font-size:26px;padding:17px 0;margin-top:24px;border-radius:12px}
.scr .fine{font-size:18px;color:#9a9a9a;margin-top:12px;font-weight:500}
.note{left:420px;top:300px;font-family:'Inter Tight';font-weight:700;font-size:58px;line-height:1;letter-spacing:-.03em;color:#FFFFFF}
.arr{left:330px;top:420px;width:130px;height:110px}
.cut{right:-110px;width:760px;bottom:-110px}
''',
 body='''
<img class="cut z2" data-img="cut" data-move="cut" src="../../assets/shoot/1557-cut.png" alt="">
<div class="a hd z4 nw" data-k="hd"></div>
<div class="phone z5" data-move="phone"><div class="scr"><div class="big" data-k="big"></div><div class="btn" data-k="btn"></div><div class="fine" data-k="fine"></div></div></div>
<div class="a note z5 nw" data-k="note"></div>
<svg class="a arr z5" data-move="arrow" viewBox="0 0 130 110"><path d="M120 12 C80 20 50 50 26 92 M26 92 L22 58 M26 92 L56 80" fill="none" stroke="#FFFFFF" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/></svg>'''))

# 10 ---------------------------------------------------------------------------------------------------------------
SET.append(dict(
 name='10-tricks-online-shops-use', kind='collage', recommended=False,
 board='Thumbnails 124 (yt-71 "the art of offline living": three real photos side by side as one collage, one calm lowercase line centred across the top)',
 fonts='Font 25 (Figtree ExtraBold, Design 370)',
 colours='words #FFFFFF with a soft shadow, top of the photos 22% darker (Font 101 colour combo, Design 370)',
 thumbnail_text='online shopping tricks',
 direction='Three real photos as one collage: shopping bags held out (Pexels 5650023), her in her room (photo 1557), a white trainer on a stool (Pexels 7588163). One lowercase line across the top: "online shopping tricks".',
 titles=['What Are Dark Patterns? 11 Examples From Online Shops',
         'Dark Patterns Examples: How Online Shops Trick You',
         'Dark Patterns in E-Commerce: 11 Checkout Tricks to Spot'],
 text={'hd': 'online shopping tricks'},
 images={'p1': PX + 'px-5650023.jpg', 'p2': S + '1557.jpg', 'p3': PX + 'px-7588163.jpg'},
 vars={'--ground': '#111111'},
 css='''
.pn{position:absolute;top:0;height:720px;overflow:hidden}
.pn img{position:absolute;display:block}
.p1{left:0;width:400px}.p1 img{width:520px;left:-80px;top:-60px}
.p2{left:406px;width:468px}.p2 img{width:1160px;left:-340px;top:-120px}
.p3{left:880px;width:400px}.p3 img{height:720px;width:auto;left:-470px;top:0}
.pn::after{content:"";position:absolute;inset:0;background:rgba(0,0,0,.12)}
.hd{left:0;right:0;top:36px;text-align:center;font-family:'Figtree';font-weight:800;font-size:96px;letter-spacing:-.035em;color:#fff}
''',
 body='''
<div class="pn p1 z1"><img data-img="p1" data-move="p1" src="../../assets/pexels/px-5650023.jpg" alt=""></div>
<div class="pn p2 z1"><img data-img="p2" data-move="p2" src="../../assets/shoot/1557.jpg" alt=""></div>
<div class="pn p3 z1"><img data-img="p3" data-move="p3" src="../../assets/pexels/px-7588163.jpg" alt=""></div>
<div class="a hd sh z4 nw" data-k="hd"></div>'''))

# 11 ---------------------------------------------------------------------------------------------------------------
SET.append(dict(
 name='11-already-ticked-for-you', kind='flat', recommended=False,
 board='Thumbnails 36 (pin-03-08 "Everything done by 2pm.": a white card on a dark frame, a hand-drawn checklist on the left, one calm serif line on the right)',
 fonts='Font 18 (Gloock, Design 391: red on black) + Font 26 (Inter Tight, Design 20: white on black) for the list',
 colours='Font 18 specimen: red #BF3520 on black #010101; Font 26 specimen: white on black; ticks in the same red',
 thumbnail_text='Already ticked for you.',
 direction='No face. Black ground: a checkout list in white on the left with three boxes already ticked in red (Gift wrap +€2.99, Insurance +€4.50, Newsletter), and "Already ticked for you." in a calm serif on the right. Generic, no shop.',
 titles=['Why the Box at Checkout Was Already Ticked for You',
         'Dark Patterns in E-Commerce: 11 Checkout Tricks to Spot',
         'Dark Patterns Explained: 11 Tricks Websites Use on You'],
 text={'hd': 'Already<br>ticked<br>for you.', 'r1': 'Gift wrap +€2.99', 'r2': 'Insurance +€4.50', 'r3': 'Protection +€3.99'},
 images={},
 vars={'--ground': '#010101'},
 css='''
.card{display:none}
.list{color:#FFFFFF !important}
.list path[stroke="#111"]{stroke:#FFFFFF}
.hd{color:#BF3520 !important}
.list{left:90px;top:120px;font-family:'Inter Tight';font-weight:600;letter-spacing:-.02em;font-size:58px;color:#111;line-height:1}
.row{display:flex;align-items:center;gap:26px;margin-bottom:46px}
.row svg{width:84px;height:84px;flex:none}
.hd{left:700px;top:96px;font-family:'Gloock';font-size:136px;line-height:.98;letter-spacing:-.02em;color:#111}
''',
 body='''
<div class="a card z1"></div>
<div class="a list z3" data-move="list">
 <div class="row nw"><svg viewBox="0 0 84 84"><path d="M10 14 L72 10 L74 74 L12 72 Z" fill="none" stroke="#111" stroke-width="5" stroke-linejoin="round"/><path d="M18 40 L38 62 L80 4" fill="none" stroke="#BF3520" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/></svg><span data-k="r1"></span></div>
 <div class="row nw"><svg viewBox="0 0 84 84"><path d="M12 10 L74 14 L70 74 L10 70 Z" fill="none" stroke="#111" stroke-width="5" stroke-linejoin="round"/><path d="M18 42 L38 62 L80 6" fill="none" stroke="#BF3520" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/></svg><span data-k="r2"></span></div>
 <div class="row nw"><svg viewBox="0 0 84 84"><path d="M10 12 L72 12 L74 72 L12 74 Z" fill="none" stroke="#111" stroke-width="5" stroke-linejoin="round"/><path d="M18 40 L38 60 L80 4" fill="none" stroke="#BF3520" stroke-width="9" stroke-linecap="round" stroke-linejoin="round"/></svg><span data-k="r3"></span></div>
</div>
<div class="a hd z3 nw" data-k="hd"></div>'''))

# 12 ---------------------------------------------------------------------------------------------------------------
SET.append(dict(
 name='12-is-this-legal', kind='photo', recommended=False,
 board='Thumbnails 83 (yt-30 "POV": one huge white word filling the frame BEHIND the person in her real room, she in front of it)',
 fonts='Font 71 (Anton, Thumbnails 113: white on dark)',
 colours='Font 71 specimen: white #FFFFFF words on a dark ground (her room dimmed 50% black, like #222222)',
 thumbnail_text='are fake timers LEGAL?',
 direction='Her real room (photo 1551, hand at her chin, sceptical), room dimmed, LEGAL? huge in white BEHIND her (she stands in front of the letters), "are fake timers" above. Pairs with the law title.',
 titles=['Are Dark Patterns Illegal? What EU and US Law Says',
         'Dark Patterns Explained: 11 Tricks Websites Use on You',
         'Hard to Cancel Subscriptions? 11 Dark Patterns Explained'],
 text={'hd': 'LEGAL?', 'pre': 'are fake timers', 'lab': 'Sale ends in', 'clock': '09:59'},
 images={'room': S + '1551.jpg', 'me': S + '1551-person.png'},
 vars={'--pw': '1900px', '--pl': '0px', '--pt': '-360px', '--dim': 'rgba(8,8,8,.64)'},
 css='''
.hd{left:26px;top:210px;font-family:'Anton';font-size:300px;line-height:1;letter-spacing:-.01em;color:#fff;z-index:2}
.pre{left:40px;top:50px;font-family:'Anton';font-size:128px;line-height:1;color:#FFFFFF;z-index:4}
.chip{left:44px;top:536px;background:#E9E7E3;color:#111;border-radius:18px;padding:10px 24px 8px;font-family:'Inter Tight';z-index:4;box-shadow:0 14px 30px rgba(0,0,0,.35)}
.chip .l{font-weight:600;font-size:22px;color:#E2231A}
.chip .c{font-weight:900;font-size:84px;line-height:.95;letter-spacing:-.04em}
''',
 body=photo('1551') + '''
<div class="a hd nw" data-k="hd"></div>
<div class="a pre sh nw" data-k="pre"></div>
<div class="a chip" data-move="timer"><div class="l" data-k="lab"></div><div class="c" data-k="clock"></div></div>'''))


only = sys.argv[1:]
# 2026-11-13 rebuilds (01 03 06 08 12: no more "words left, her right"), kept in their own file
import importlib.util
_sp = importlib.util.spec_from_file_location('b13', os.path.join(ROOT, 'tools', 'set-2026-11-13-blocks.py'))
_m = importlib.util.module_from_spec(_sp); _sp.loader.exec_module(_m)
_B = _m.blocks(S, PX, photo)
SET = [_B.get(d['name'][:2], d) for d in SET]
DROPPED = {'05-how-apps-make-you-say-yes', '10-tricks-online-shops-use'}
for d in SET:
    if d['name'] in DROPPED:   # dropped after the cold critic (5/10)
        continue
    if only and not any(d['name'].startswith(o) for o in only):
        continue
    p = os.path.join(D, d['name']); os.makedirs(p, exist_ok=True)
    c = {k: d[k] for k in ('direction', 'thumbnail_text', 'kind', 'recommended', 'titles', 'text', 'images', 'vars', 'board', 'fonts', 'colours')}
    c['title'] = d['titles'][0]; c['class'] = 'no-lift'; c['scores'] = ''
    old = os.path.join(p, 'content.json')
    if os.path.exists(old):   # keep scores written after the critic
        try: c['scores'] = json.load(open(old)).get('scores', '')
        except Exception: pass
    json.dump(c, open(old, 'w'), indent=1, ensure_ascii=False)
    open(os.path.join(p, 'index.html'), 'w').write(page(d['css'], d['body']))
    print('wrote', d['name'])
