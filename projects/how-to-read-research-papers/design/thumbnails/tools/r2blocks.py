# Round-2 versions of the directions (after cold critic R1, 2026-11-06). Imported by gen-first-version.py (replaces earlier blocks).
def strip(x, y, box, s, hl=None, rot=0, name='strip', key='page', src='keshav_p1.png', W=1700):
    bx, by, bw, bh = box
    h = ''.join(f'<div class="hl" style="left:{(a-bx)*s-4}px;top:{bh*s*.08}px;width:{(b-a)*s+8}px;height:{bh*s*.84}px"></div>' for a, b in (hl or []))
    return (f'<div class="real z4" data-move="{name}" style="left:{x}px;top:{y}px;width:{bw*s+28}px;height:{bh*s+18}px;transform:rotate({rot}deg)">'
            f'<div style="position:absolute;left:14px;top:9px;width:{bw*s}px;height:{bh*s}px;overflow:hidden"><img data-img="{key}" src="../../assets/src/{src}" '
            f'style="left:{-bx*s}px;top:{-by*s}px;width:{W*s}px">{h}</div></div>')

def r2(add, scene, FR, ME, CUT, COL, SRC, lines, GV):
    add('01-how-to-read-research-papers', 'photo',
        "Photo background, her ux-research method: her room washed graphite so it goes calm, she in full colour, calm and closed-mouthed, beside one "
        "big printed paper: the abstract highlighted, three numbered tabs clipped to its edge. The topic name huge across the top, nothing else. "
        "References: her ux-research thumbnail (topic name, few huge props, gesture at the object), her database-indexes bar (one literal picture).",
        {"hd": "How to read<br><em class=\"acc\">research papers</em>", "pt": "Research paper", "t1": "1", "t2": "2", "t3": "3"},
        [1, 2, 6],
        f'''{scene(FR('439.0'), ME('439.0'))}
<div class="hd z4 shadow-t" data-k="hd"></div>
<div class="paper z4" data-move="paper" style="left:800px;top:250px;width:310px;height:380px;transform:rotate(3deg)">
 <div class="ttl" data-k="pt"></div><div style="height:18px"></div>
 <div class="ln hl"></div><div class="ln hl m"></div><div class="ln hl s"></div><div style="height:18px"></div>{lines(4)}<div style="height:18px"></div>{lines(3)}
 <div class="tab on" style="left:310px;top:30px" data-k="t1"></div><div class="tab" style="left:310px;top:130px" data-k="t2"></div><div class="tab" style="left:310px;top:230px" data-k="t3"></div>
</div>''',
        css='.hd{left:52px;top:30px;font-size:112px}.paper{overflow:visible}',
        images={"room": FR('439.0'), "me": ME('439.0')},
        vars={**GV, "--bgb": "1.5", "--sc": "1.3", "--sc-x": "-190px", "--sc-y": "60px"}, recommended=True)

    add('02-is-it-any-good', 'photo',
        "Photo background in natural colour, darkened: she looks at you, calm, lips closed. Beside her a printed paper marked up in blue pen, "
        "three circles on what she checks: the sample size, the method, who funded it. References: Pinterest annotation thumbnails (hand-drawn "
        "circles on a photo), the kit's outlier (a paper held up).",
        {"hd": "Is this study<br><em class=\"acc\">any good?</em>", "pt": "Results", "n1": "n = 12?", "n2": "method?", "n3": "who paid?"},
        [8, 4, 1],
        f'''{scene(FR('438.7'), ME('438.7'), 'natural')}
<div class="hd z4 shadow-t" data-k="hd"></div>
<div class="paper z4" data-move="paper" style="left:790px;top:220px;width:340px;height:380px;transform:rotate(-3deg)">
 <div class="ttl" data-k="pt"></div><div style="height:16px"></div>{lines(4)}<div style="height:12px"></div>{lines(4)}<div style="height:12px"></div>{lines(3)}
 <div class="hand" data-k="n1" style="position:absolute;left:34px;top:84px;font-size:60px"></div>
 <div class="hand" data-k="n2" style="position:absolute;left:130px;top:186px;font-size:54px"></div>
 <div class="hand" data-k="n3" style="position:absolute;left:34px;top:284px;font-size:54px"></div>
 <svg class="pen" style="left:0;top:0" width="340" height="380" viewBox="0 0 340 380">
  <path d="M24,126 C14,80 110,70 170,76 C214,82 210,126 178,136 C124,150 40,144 30,112" style="stroke-width:6"/>
  <path d="M120,228 C112,184 230,176 300,186 C340,192 334,234 300,242 C240,254 140,250 126,214" style="stroke-width:6"/>
  <path d="M22,326 C14,282 180,272 260,282 C310,288 304,330 262,338 C180,350 40,346 28,308" style="stroke-width:6"/>
 </svg>
</div>''',
        css='.hd{left:52px;top:34px;font-size:104px}',
        images={"room": FR('438.7'), "me": ME('438.7')},
        vars={**GV, "--bgb": ".75", "--sc": "1.3", "--sc-x": "-190px", "--sc-y": "60px"})

    add('03-read-it-in-3-passes', 'photo',
        "Photo background washed graphite, mirrored layout of 01: she on the right, calm; on the left three copies of the same paper in a row, "
        "each more highlighted than the last, tabs 1, 2, 3 on top and the time each pass takes in big handwriting (Keshav's numbers). "
        "References: viral 9 (a collage of the things she does), saved before/after progress thumbnails.",
        {"hd": "Read papers in <em class=\"acc\">3 passes</em>", "t1": "1", "t2": "2", "t3": "3", "m1": "5-10 min", "m2": "1 hour", "m3": "4-5 hours"},
        [6, 1, 10],
        f'''{scene(FR('14.0'), ME('14.0'))}
<div class="hd z4 shadow-t" data-k="hd"></div>
<div data-move="papers" class="abs z4" style="left:40px;top:220px;width:640px;height:440px">
 {''.join(f'<div class="paper" style="left:{i*205}px;top:{[40,20,40][i]}px;width:185px;height:250px;padding:22px 20px;transform:rotate({[-4,0,4][i]}deg)">' + ''.join('<div class="ln hl"></div>' if k < (i+1)*2+i else '<div class="ln"></div>' for k in range(8)) + '</div>' for i in range(3))}
 {''.join(f'<div class="tab on" data-k="t{i+1}" style="left:{i*205+56}px;top:{[-30,-50,-30][i]}px;width:72px;height:72px;font-size:48px;border-radius:12px 12px 0 0"></div>' for i in range(3))}
 {''.join(f'<div class="hand" data-k="m{i+1}" style="position:absolute;left:{i*205}px;top:{318}px;width:205px;text-align:center;font-size:52px;color:var(--paper);white-space:nowrap"></div>' for i in range(3))}
</div>''',
        css='.hd{left:52px;top:36px;font-size:100px}',
        images={"room": FR('14.0'), "me": ME('14.0')},
        vars={**GV, "--bgb": "1.2", "--sc": "1.3", "--sc-x": "190px", "--sc-y": "60px"})

    add('04-skim-it-in-10-minutes', 'photo',
        "Photo in natural colour, darkened, she on the right, calm. Headline at the bottom left for once. Top left a printed paper where only the "
        "title, abstract, headings and conclusion are highlighted and numbered 1-3 in the order to read them, the rest greyed out. "
        "References: the kit's T1 concept, saved thumbnails with the headline low and the prop high.",
        {"hd": "Skim any paper<br><em class=\"acc\">in 10 minutes</em>", "pt": "Title", "ha": "Abstract", "hh": "", "hc": "",
         "n1": "1", "n2": "2", "n3": "3"},
        [10, 1, 2],
        f'''{scene(FR('555.3'), ME('555.3'), 'natural')}
<div class="hd z4 shadow-t" data-k="hd"></div>
<div class="paper fade z4" data-move="paper" style="left:70px;top:30px;width:330px;height:400px;transform:rotate(-3deg);padding:26px 30px">
 <div class="ttl" style="font-size:30px"><span class="mk" data-k="pt"></span></div>
 <div class="h" style="margin-top:12px"><span class="mk" data-k="ha"></span></div><div class="ln hl"></div><div class="ln hl m"></div>
 <div class="h" style="margin-top:14px"><span class="mk" data-k="hh"></span></div>{lines(3)}{lines(2)}
 <div class="h" style="margin-top:14px"><span class="mk" data-k="hc"></span></div><div class="ln hl s"></div>
 <div class="num" data-k="n1" style="right:20px;top:20px"></div><div class="num" data-k="n2" style="right:20px;top:150px"></div><div class="num" data-k="n3" style="right:20px;top:300px"></div>
</div>''',
        css='.hd{left:52px;top:470px;font-size:86px}',
        images={"room": FR('555.3'), "me": ME('555.3')},
        vars={**GV, "--bgb": ".6", "--sc": "1.3", "--sc-x": "190px", "--sc-y": "40px"})

    add('05-too-many-papers', 'photo',
        "Words behind her (TikTok reference #19 and her saved 'FAVOR' / 'UI UX' thumbnails): her room washed graphite, the question in tall "
        "condensed yellow type across the top, she in full colour in front of it, calm, and a messy stack of printed papers with sticky tabs "
        "beside her. Her ux-research thumbnail is the type model (tall condensed yellow, topic only).",
        {"hd": "Too many papers?"},
        [5, 3, 2],
        f'''<div class="scene z1" data-move="room"><img class="bg" data-img="room" src="{FR('13.7')}" alt=""><div class="wash"></div><div class="dim"></div></div>
<div class="hd cond acc z2" data-k="hd"></div>
<div class="scene z3" data-move="her"><img class="me-c" data-img="me" src="{ME('13.7')}" alt=""></div>
<div class="abs z4" data-move="stack" style="left:70px;top:330px;width:330px;height:330px">
 {''.join(f'<div class="paper" style="left:{[0,12,-8,10,-4,16,2][i]}px;top:{i*40}px;width:300px;height:54px;padding:0;transform:rotate({[-3,2,-1,3,-2,1,-3][i]}deg);box-shadow:0 6px 10px rgba(0,0,0,.35)"></div>' for i in range(7))}
 <div class="abs" style="left:292px;top:50px;width:36px;height:24px;background:var(--hi)"></div><div class="abs" style="left:-20px;top:170px;width:36px;height:24px;background:#F79AB8"></div>
 <div class="paper" style="left:-10px;top:-110px;width:320px;height:130px;transform:rotate(-4deg)"><div class="ttl" style="font-size:44px">Research paper</div><div style="height:10px"></div>{lines(2)}</div>
</div>''',
        css='.hd{left:0;width:1280px;text-align:center;top:26px;font-size:150px}',
        images={"room": FR('13.7'), "me": ME('13.7')},
        vars={**GV, "--bgb": "1.15", "--sc": "1.3", "--sc-x": "120px", "--sc-y": "60px"})

    add('07-find-your-research-gap', 'photo',
        "Photo background washed graphite, she in colour, calm. On the right a paper's Limitations section with one line highlighted, a "
        "blue-pen arrow from it to a yellow sticky note 'my thesis?'. Three big objects, one arrow (her ux-research thumbnail: note -> arrow -> object). "
        "For the thesis angle of the video.",
        {"hd": "Find your<br><em class=\"acc\">research gap</em>", "h": "Limitations", "note": "my<br>thesis?"},
        [5, 3, 1],
        f'''{scene(FR('14.3'), ME('14.3'))}
<div class="hd z4 shadow-t" data-k="hd"></div>
<div class="paper z4" data-move="paper" style="left:770px;top:220px;width:330px;height:290px;transform:rotate(-2deg)">
 <div class="h" data-k="h" style="font-size:30px;margin-top:0"></div>{lines(2)}<div class="ln hl"></div><div class="ln hl s"></div>{lines(3)}</div>
<svg class="pen z5" style="left:880px;top:430px" width="160" height="120"><path d="M20,10 C26,70 70,96 130,92 M108,74 l26,18 l-28,16" style="stroke-width:8"/></svg>
<div class="sticky z5" data-move="note" style="left:960px;top:440px;width:200px;height:160px;font-size:54px;transform:rotate(5deg)"><span data-k="note"></span></div>''',
        css='.hd{left:52px;top:36px;font-size:112px}',
        images={"room": FR('14.3'), "me": ME('14.3')},
        vars={**GV, "--bgb": "1.2", "--sc": "1.3", "--sc-x": "-190px", "--sc-y": "60px"})

    add('09-collage-the-3-pass-method', 'collage',
        "Collage over her full natural photo (her 10-07 style): she on the right, one big serif line with the method's name, and three printed "
        "pages as die-cut stickers in one row with tabs 1, 2, 3, each more highlighted than the last. Nothing else.",
        {"hd": "the <em>3-pass</em> method", "t1": "1", "t2": "2", "t3": "3"},
        [6, 1, 2],
        f'''<div class="scene natural z1" data-move="room"><img class="bg" data-img="room" src="{FR('13.7')}" alt=""><div class="dim"></div></div>
<div class="hd z4 shadow-t" data-k="hd"></div>
{''.join(f'<div class="paper z3" data-move="p{i+1}" style="left:{50+i*200}px;top:{[300,280,300][i]}px;width:180px;height:240px;padding:20px;border:6px solid #fff;transform:rotate({[-5,0,5][i]}deg);overflow:visible">' + ''.join('<div class="ln hl"></div>' if k < (i+1)*2+i else '<div class="ln"></div>' for k in range(8)) + f'<div class="tab on" data-k="t{i+1}" style="left:50px;top:-62px;width:68px;height:68px;font-size:46px;border-radius:12px 12px 0 0"></div></div>' for i in range(3))}''',
        css='.hd{left:0;width:1280px;text-align:center;top:30px;font-size:118px;font-weight:600}.hd em{font-weight:600}',
        images={"room": FR('13.7')},
        vars={**GV, "--bgb": ".8", "--dim": "rgba(20,20,24,.18)", "--sc": "1.3", "--sc-x": "190px", "--sc-y": "40px"})

    add('17-can-you-trust-this-study', 'other',
        "The real receipt, no face: Kelly Caine's CHI 2016 paper, the line 'the most common sample size is 12', cut from the page as two strips "
        "and highlighted, big; twelve small figures under it. The headline asks the question a careful reader asks. References: TikTok "
        "references #08/#34 (a screenshot as the receipt, with a marker).",
        {"hd": "Can you trust <em class=\"acc\">this study?</em>", "note": "in HCI papers at CHI 2014", "cr": "Kelly Caine, Local Standards for Sample Size at CHI (CHI 2016)"},
        [8, 4, 3],
        f'''<div class="hd z4" data-k="hd"></div>
{strip(160, 230, (651, 808, 260, 26), 3.5, hl=[(651, 911)], rot=-1.5, name='strip2', key='receipt', src='caine__most-common-sample-size.png', W=1920)}
<div class="abs z4" data-move="people" style="left:200px;top:480px;width:880px;height:110px;display:flex;gap:22px;justify-content:center">
 {''.join('<svg width="52" height="104" viewBox="0 0 48 96"><circle cx="24" cy="16" r="13" fill="#FBFAF4"/><path d="M4,96 L4,50 Q4,34 24,34 Q44,34 44,50 L44,96 Z" fill="#FBFAF4"/></svg>' for _ in range(12))}</div>
<div class="hand z5" data-k="note" style="position:absolute;left:0;width:1280px;text-align:center;top:384px;font-size:56px;color:var(--fg)"></div>
<div class="cred z5" data-k="cr" style="position:absolute;left:90px;top:640px"></div>''',
        css='.hd{left:0;width:1280px;text-align:center;top:40px;font-size:108px}',
        images={"receipt": SRC('caine__most-common-sample-size.png')},
        vars=GV)
