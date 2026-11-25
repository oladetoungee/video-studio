# Rebuilt 2026-11-13 (coordinator: 7 of 10 were "words left, her right"). Spliced into make-set-2026-11-12.py by name.
# Each block is a dict for SET (same keys). S / PX / photo() come from the main script.
def blocks(S, PX, photo):
    B = {}
    B['01'] = dict(
 name='01-apps-that-trick-you', kind='photo', recommended=False,
 board='Thumbnails 101 (yt-48 "Do THIS After Work": one line in a band across the top, the creator centred in her real room below)',
 fonts='Font 65 (Poppins Bold lowercase, red key word, Thumbnails 84) on its dark ground; phone text = Font 58 (Inter Tight, black on light)',
 colours='Font 65 specimen: band #2A2522, words #FFFFFF, key word #E5342B',
 thumbnail_text='shops that trick you',
 direction='A dark band across the top with one line, "shops that trick you" ("trick" in red). Below it her real room (photo 1559), she centred and natural, palm up; on her palm a phone with a shop pop-up whose grey link says "No thanks, I hate saving money".',
 titles=['Dark Patterns: "No Thanks, I Hate Saving Money" Has a Name',
         'The Tricks Online Shops Use to Make You Say Yes',
         'Dark Patterns Explained: 11 Tricks Websites Use on You'],
 text={'hd': 'shops that <span class="r">trick</span> you', 'off': '10% OFF', 'yes': 'Yes please', 'no': 'No thanks, I hate saving money'},
 images={'room': S + '1559.jpg', 'me': S + '1559-person.png'},
 vars={'--pw': '1300px', '--pl': '-20px', '--pt': '-40px', '--dim': 'rgba(10,10,10,.3)'},
 css='''
.band{left:0;right:0;top:0;height:178px;background:#2A2522;z-index:4}
.hd{left:0;right:0;top:30px;text-align:center;font-family:'Poppins';font-weight:700;font-size:112px;line-height:1;letter-spacing:-.045em;color:#fff;z-index:5}
.hd .r{color:#E5342B}
.phone{left:930px;top:250px;width:236px;height:484px;transform:rotate(6deg)}
.scr{display:flex;flex-direction:column;justify-content:center;padding:0 16px;text-align:center;font-family:'Inter Tight'}
.scr .off{font-weight:900;font-size:62px;letter-spacing:-.04em;line-height:.9}
.scr .yes{background:#111;color:#fff;font-weight:700;font-size:26px;padding:14px 0;margin-top:20px;border-radius:12px}
.scr .no{font-size:30px;font-weight:700;color:#444;margin-top:14px;line-height:1.15;text-decoration:underline;text-underline-offset:.15em}
''',
 body=photo('1559') + '''
<div class="a band"></div>
<div class="a hd nw" data-k="hd"></div>
<div class="phone z5" data-move="phone"><div class="scr"><div class="off" data-k="off"></div><div class="yes" data-k="yes"></div><div class="no" data-k="no"></div></div></div>''')

    B['03'] = dict(
 name='03-hard-to-cancel', kind='photo', recommended=False,
 board='Thumbnails 116 (yt-63, the lower one "IT\'S OVER": the person centred in a real scene, the words in a band across the lower half, over her)',
 fonts='Font 77 (Archivo 800, Design 351)',
 colours='Font 77 specimen (Design 351): ink #101114 on cream #E6DFCD boxes, over her room dimmed 40%',
 thumbnail_text='SUBSCRIPTIONS YOU CAN\'T CANCEL',
 direction='Her real room (photo 1564, hand on cheek, fed up), she centred. Across the lower half, over her shirt, two cream boxes: SUBSCRIPTIONS / YOU CAN\'T CANCEL.',
 titles=['Hard to Cancel Subscriptions? 11 Dark Patterns Explained',
         'Dark Patterns Explained: 11 Tricks Websites Use on You',
         'Dark Patterns in UX: 11 Examples and Why Companies Use Them'],
 text={'w1': 'SUBSCRIPTIONS', 'w2': 'YOU CAN\'T CANCEL'},
 images={'room': S + '1564.jpg', 'me': S + '1564-person.png'},
 vars={'--pw': '1320px', '--pl': '-50px', '--pt': '-150px', '--dim': 'rgba(10,10,10,.4)'},
 css='''
.w{position:absolute;left:50%;translate:-50% 0;font-family:'Archivo';font-weight:800;font-size:96px;line-height:1;letter-spacing:-.03em;
  background:#E6DFCD;color:#101114;padding:12px 30px 10px;box-shadow:0 14px 30px rgba(0,0,0,.35);z-index:5}
.w1{top:470px}.w2{top:588px}
''',
 body=photo('1564') + '''
<div class="w w1 nw" data-k="w1"></div><div class="w w2 nw" data-k="w2"></div>''')

    phone = lambda k, x, rot: (f'<div class="phone z3 p{k}" data-move="phone{k}" style="left:{x}px;transform:rotate({rot}deg)"><div class="scr">'
        f'<div class="t1" data-k="t{k}"></div><div class="s1" data-k="s{k}"></div><div class="b1 b{k}" data-k="b{k}"></div><div class="n1" data-k="n{k}"></div></div></div>')
    B['06'] = dict(
 name='06-leaving-already', kind='collage', recommended=False,
 board='Thumbnails 124 (yt-71 "the art of offline living": three panels side by side as one collage, one calm line centred across the top)',
 fonts='Font 25 (Figtree ExtraBold, Design 370) for the line + Font 58 (Inter Tight, black on light) on the screens',
 colours='Font 101 colour combo (Design 370): ground #A0B8D7, line #2E3E58 (the combo\'s ink; its pale yellow #EEEB98 does not read on this blue)',
 thumbnail_text='shops that won\'t let you leave',
 direction='No face. Three phones side by side, each a generic shop pop-up that stops you leaving: "Leaving already? Stay: 20% off", "Are you sure? You\'ll lose your saved items", "Wait! Free shipping if you stay / No, I like paying for shipping". One line across the top: "shops that won\'t let you leave".',
 titles=['What Are Dark Patterns? 11 Examples From Online Shops',
         'The Tricks Online Shops Use to Make You Say Yes',
         'Dark Patterns Explained: 11 Tricks Websites Use on You'],
 text={'hd': 'shops that won\'t let you leave',
       't1': 'Leaving already?', 's1': '', 'b1': 'Stay: 20% off', 'n1': 'Leave anyway',
       't2': 'Are you sure?', 's2': 'You\'ll lose your saved items', 'b2': 'Keep shopping', 'n2': 'Leave',
       't3': 'Wait!', 's3': 'Free shipping if you stay', 'b3': 'Stay', 'n3': 'No, I like paying for shipping'},
 images={},
 vars={'--ground': '#A0B8D7'},
 css='''
.hd{left:0;right:0;top:34px;text-align:center;font-family:'Figtree';font-weight:800;font-size:80px;letter-spacing:-.035em;line-height:1;color:#2E3E58}
.phone{top:168px;width:310px;height:636px}
.scr{display:flex;flex-direction:column;justify-content:center;padding:0 20px 60px;text-align:center;font-family:'Inter Tight'}
.t1{font-weight:900;font-size:48px;letter-spacing:-.04em;line-height:1}
.s1{font-weight:600;font-size:28px;line-height:1.15;margin-top:10px;color:#333}
.b1{background:#111;color:#fff;font-weight:700;font-size:32px;padding:17px 0;margin-top:20px;border-radius:12px}
.b1.b1{background:#21F587;color:#010000}
.n1{font-weight:600;font-size:26px;color:#7a7a7a;margin-top:14px;line-height:1.15;text-decoration:underline}
''',
 body='<div class="a hd z4 nw" data-k="hd"></div>\n' + phone(1, 70, -4) + '\n' + phone(2, 485, 0) + '\n' + phone(3, 900, 4))

    B['08'] = dict(
 name='08-i-didnt-add-this', kind='flat', recommended=False,
 board='Thumbnails 55 (yt-02 "before / after": the frame split in two halves, a short label at the top of each half, the same thing shown twice with one difference)',
 fonts='Font 31 (Inter Tight, Design 406: cream words in ink boxes on orange)',
 colours='Font 31 / Font 111 specimen (Design 406): ground #D16A3C, panels #0C160C, words #F5EFDE; the sneaked-in line marked #E0282B',
 thumbnail_text='You added / At checkout: + Cleaning spray €5',
 direction='No face. Split in two dark panels on orange: "You added" with one line "Running shoes €40", and "At checkout" with the same shoes plus "Cleaning spray €5" (red plus) that you never picked. The example she gives in the video.',
 titles=['How Websites Trick You Into Buying Things You Didn\'t Add',
         'Dark Patterns Examples: How Online Shops Trick You',
         'Dark Patterns in E-Commerce: 11 Checkout Tricks to Spot'],
 text={'l1': 'You added', 'a1': 'Running shoes', 'p1': '€40', 'l2': 'At checkout', 'a2': 'Running shoes', 'p2': '€40', 'hook': 'I didn\'t add this!', 'a3': 'Cleaning spray', 'p3': '+€5', 'tl': 'Total', 't1': '€40', 'tr': 'Total', 't2': '€45'},
 images={},
 vars={'--ground': '#D16A3C'},
 css='''
.hk{left:0;right:0;top:22px;text-align:center;font-family:'Inter Tight';font-weight:900;font-size:76px;letter-spacing:-.045em;line-height:1}
.hk span{background:#0C160C;color:#F5EFDE;padding:4px 22px 10px}
.pn{position:absolute;top:150px;width:560px;background:#0C160C;border-radius:28px;color:#F5EFDE;font-family:'Inter Tight';padding:44px 44px}
.pa{left:50px}.pb{left:670px}
.lab{font-weight:900;font-size:64px;letter-spacing:-.045em;line-height:1;margin-bottom:24px}
.tot{margin-top:26px;font-size:58px;border-top:6px solid #F5EFDE}
.row{display:flex;justify-content:space-between;align-items:baseline;font-weight:700;font-size:46px;letter-spacing:-.03em;padding:18px 0;border-top:3px solid rgba(245,239,222,.25)}
.row b{font-weight:900}
.row.new{color:#fff;background:#E0282B;margin:0 -20px;padding:18px 20px;border-radius:14px;border-top:none}
''',
 body='''
<div class="a hk z3 nw"><span data-k="hook"></span></div>
<div class="pn pa z2" data-move="before"><div class="lab nw" data-k="l1"></div><div class="row nw"><span data-k="a1"></span><b data-k="p1"></b></div><div class="row nw" style="visibility:hidden"><span>.</span><b>.</b></div><div class="row tot nw"><span data-k="tl"></span><b data-k="t1"></b></div></div>
<div class="pn pb z2" data-move="after"><div class="lab nw" data-k="l2"></div><div class="row nw"><span data-k="a2"></span><b data-k="p2"></b></div><div class="row new nw"><span data-k="a3"></span><b data-k="p3"></b></div><div class="row tot nw"><span data-k="tr"></span><b data-k="t2"></b></div></div>''')

    B['12'] = dict(
 name='12-is-this-legal', kind='photo', recommended=False,
 board='Thumbnails 119 (yt-66 "FINANCIAL LITERACY": the creator centred, one huge white word filling the frame BEHIND her head)',
 fonts='Font 71 (Anton, Thumbnails 113: white on dark)',
 colours='Font 71 specimen: white #FFFFFF words on a dark ground (her room dimmed 55%, like #222222)',
 thumbnail_text='are fake timers LEGAL?',
 direction='Her real room (photo 1558, unconvinced smile), she centred, the room dimmed. LEGAL? huge in white BEHIND her head (she sits in front of the letters), "are fake timers" small across the top.',
 titles=['Are Dark Patterns Illegal? What EU and US Law Says',
         'Dark Patterns Explained: 11 Tricks Websites Use on You',
         'Hard to Cancel Subscriptions? 11 Dark Patterns Explained'],
 text={'hd': 'LEGAL?', 'pre': 'are fake timers', 'lab': 'Sale ends in', 'clock': '09:59'},
 images={'room': S + '1558.jpg', 'me': S + '1558-person.png'},
 vars={'--pw': '1300px', '--pl': '-17px', '--pt': '0px', '--dim': 'rgba(8,8,8,.55)', '--ground': '#222222'},
 css='''
.hd{left:0;right:0;top:84px;text-align:center;font-family:'Anton';font-size:250px;line-height:1;letter-spacing:.01em;color:#fff;z-index:2}
.chip{left:40px;top:520px;background:#E9E7E3;color:#111;border-radius:18px;padding:10px 24px 8px;font-family:'Inter Tight';z-index:5;box-shadow:0 14px 30px rgba(0,0,0,.35)}
.chip .l{font-weight:600;font-size:22px;color:#E2231A}
.chip .c{font-weight:900;font-size:84px;line-height:.95;letter-spacing:-.04em}
.pre{left:0;right:0;top:12px;text-align:center;font-family:'Anton';font-size:86px;line-height:1;color:#FFFFFF;z-index:4}
''',
 body=photo('1558') + '''
<div class="a hd nw" data-k="hd"></div>
<div class="a pre sh nw" data-k="pre"></div>
<div class="a chip" data-move="timer"><div class="l" data-k="lab"></div><div class="c" data-k="clock"></div></div>''')
    return B
