"""First version of every thumbnail direction (2026-11-03). Writes directions/<NN-name>/{index.html,content.json}.
After the first run the directions are the source (the studio edits content.json): run this again only with --force,
and only for a direction you name:  python3 tools/gen-first-version.py 07 [--force]"""
import json, os, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DIRS = os.path.join(ROOT, 'directions')
KS = 1700 / 612  # keshav page px per pt
T = {  # the kit's titles (section 1a)
 1: "How to Read a Research Paper (The 3-Pass Method)",
 2: "How to Read Research Papers Effectively for Beginners",
 3: "How to Read Research Papers as a Master's Student",
 4: "How to Read a Research Paper Critically (Step by Step)",
 5: "How to Read Research Papers for Your Thesis",
 6: "The 3-Pass Method for Reading Research Papers",
 7: "Stop Reading Research Papers From Start to Finish",
 8: "How to Tell if a Research Paper Is Any Good",
 9: "You're Reading Research Papers in the Wrong Order",
 10: "Read a Research Paper in 10 Minutes, Then Decide",
}
FR = lambda t: f"../../assets/frames/f_{t}.jpg"
ME = lambda t: f"../../assets/scene/gbemi-{t}-person.png"
CUT = lambda t: f"../../assets/cut/gbemi-{t}-cut.png"
SRC = lambda f: f"../../assets/src/{f}"
COL = lambda f: f"../../assets/collage/{f}"

def lines(n, last='s', cls=''):
    return ''.join(f'<div class="ln {cls}"></div>' for _ in range(n - 1)) + f'<div class="ln {last} {cls}"></div>'

def scene(room, me, cls='', extra=''):
    return (f'<div class="scene {cls} z1" data-move="room"><img class="bg" data-img="room" src="{room}" alt=""><div class="wash"></div><div class="dim"></div></div>'
            f'<div class="scene {cls} z3" data-move="her"><img class="me-c" data-img="me" src="{me}" alt=""></div>{extra}')

def keshav(x, y, w, h, px, py, s, rot=0, hls=(), name='page', key='page', src='keshav_p1.png'):
    """a crop of Keshav's real page: (px,py) = page point at the crop's top-left, s = px per page-px"""
    hl = ''.join(f'<div class="hl" style="left:{(a*KS-px)*s - 6}px;top:{((b-8.5)*KS-py)*s}px;width:{(c-a)*KS*s + 12}px;height:{12*KS*s}px"></div>' for a, b, c in hls)
    return (f'<div class="real z4" data-move="{name}" style="left:{x}px;top:{y}px;width:{w}px;height:{h}px;transform:rotate({rot}deg)">'
            f'<img data-img="{key}" src="{SRC(src)}" style="left:{-px*s}px;top:{-py*s}px;width:{1700*s}px;height:{2200*s}px">{hl}</div>')

import sys as _sys; _sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from r2blocks import strip
D = []
def add(name, kind, direction, text, titles, html, css='', images=None, vars=None, cls='', recommended=False):
    D.append(dict(name=name, kind=kind, direction=direction, text=text, titles=[T[i] for i in titles], html=html, css=css,
                  images=images or {}, vars=vars or {}, cls=cls, recommended=recommended))

GV = {"--ground": "#2F3136", "--fg": "#FBFAF4", "--accent": "#F3EE2E", "--wash": "#3A3D44"}

# ---------------------------------------------------------------- PHOTO (7)
add('01-how-to-read-research-papers', 'photo',
    "Photo background, her ux-research method: her room washed graphite (the film's ground) so it goes calm, she in full colour pointing "
    "at a big printed paper on the right: abstract highlighted, three numbered tabs clipped to its edge. The topic name huge across the top. "
    "References: her ux-research thumbnail (topic name, few huge props, gesture at the object), her database-indexes bar (one literal picture).",
    {"hd": "How to read<br><em class=\"acc\">research papers</em>", "pt": "Research paper", "ha": "Abstract", "hm": "Method", "hd2": "Discussion",
     "t1": "1", "t2": "2", "t3": "3"},
    [1, 2, 6],
    f'''{scene(FR('112.3'), ME('112.3'))}
<div class="hd z4 shadow-t" data-k="hd"></div>
<div class="paper z4" data-move="paper" style="left:836px;top:262px;width:330px;height:420px;transform:rotate(3deg)">
 <div class="ttl" data-k="pt"></div><div style="height:14px"></div>
 <div class="h" data-k="ha"></div><div class="ln hl"></div><div class="ln hl m"></div><div class="ln"></div>
 <div class="h" data-k="hm"></div>{lines(3)}
 <div class="h" data-k="hd2"></div>{lines(3)}
 <div class="tab on" style="left:330px;top:40px" data-k="t1"></div><div class="tab" style="left:330px;top:140px" data-k="t2"></div><div class="tab" style="left:330px;top:240px" data-k="t3"></div>
</div>''',
    css='.hd{left:52px;top:30px;font-size:112px}.paper{overflow:visible}.paper .tab{left:330px!important}',
    images={"room": FR('112.3'), "me": ME('112.3')},
    vars={**GV, "--bgb": "1.2", "--sc": "1.3", "--sc-x": "-190px", "--sc-y": "60px"}, recommended=True)

add('02-is-it-any-good', 'photo',
    "Photo background in natural colour, darkened: she looks at you, calm and a little sceptical. Beside her a printed paper marked up in "
    "blue pen, three circles on what she checks: the sample size, the method, who funded it. References: Pinterest annotation thumbnails "
    "(hand-drawn circles and notes on a photo), the kit's outlier (a paper held up).",
    {"hd": "Is this paper<br><em class=\"acc\">any good?</em>", "pt": "Results", "n1": "n = 12?", "n2": "method?", "n3": "who funded it?"},
    [8, 4, 1],
    f'''{scene(FR('438.7'), ME('438.7'), 'natural')}
<div class="hd z4 shadow-t" data-k="hd"></div>
<div class="paper z4" data-move="paper" style="left:800px;top:250px;width:400px;height:430px;transform:rotate(-3deg)">
 <div class="ttl" data-k="pt"></div><div style="height:16px"></div>{lines(4)}<div style="height:12px"></div>{lines(4)}<div style="height:12px"></div>{lines(3)}
 <div class="hand" data-k="n1" style="position:absolute;left:40px;top:96px;font-size:58px"></div>
 <div class="hand" data-k="n2" style="position:absolute;left:150px;top:210px;font-size:58px"></div>
 <div class="hand" data-k="n3" style="position:absolute;left:30px;top:320px;font-size:58px"></div>
 <svg class="pen" style="left:0;top:0" width="400" height="430" viewBox="0 0 400 430">
  <path d="M30,140 C20,90 120,78 190,86 C240,92 236,140 200,152 C140,166 50,160 36,124" style="stroke-width:6"/>
  <path d="M140,252 C130,205 250,196 330,206 C380,212 372,258 330,266 C260,278 160,274 146,236" style="stroke-width:6"/>
  <path d="M22,364 C14,318 200,306 330,316 C390,322 384,370 330,378 C220,392 40,386 28,346" style="stroke-width:6"/>
 </svg>
</div>''',
    css='.hd{left:52px;top:34px;font-size:104px}',
    images={"room": FR('438.7'), "me": ME('438.7')},
    vars={**GV, "--bgb": ".62", "--sc": "1.3", "--sc-x": "-190px", "--sc-y": "60px"})

add('03-read-it-in-3-passes', 'photo',
    "Photo background washed graphite, she in colour with an open palm towards three copies of the same paper fanned out, each more "
    "marked up than the last, tabs 1, 2, 3 on them and the time each pass takes in blue pen (Keshav's numbers). References: viral 9 "
    "(a collage of things she holds out), her ux-research thumbnail (gesture at the object).",
    {"hd": "Read it in <em class=\"acc\">3 passes</em>", "t1": "1", "t2": "2", "t3": "3", "m1": "5-10 min", "m2": "1 hour", "m3": "4-5 hours"},
    [6, 1, 10],
    f'''{scene(FR('247.3'), ME('247.3'))}
<div class="hd z4 shadow-t" data-k="hd"></div>
<div data-move="papers" class="abs z4" style="left:640px;top:200px;width:620px;height:500px">
 <div class="paper" style="left:0;top:60px;width:230px;height:300px;transform:rotate(-7deg)"><div class="ln hl s"></div>{lines(3)}<div style="height:10px"></div>{lines(4, cls='ghost')}<div style="height:10px"></div>{lines(3, cls='ghost')}</div>
 <div class="paper" style="left:190px;top:30px;width:230px;height:300px;transform:rotate(-1deg)"><div class="ln hl s"></div><div class="ln hl"></div>{lines(2)}<div style="height:10px"></div><div class="ln hl m"></div>{lines(3)}<div style="height:10px"></div>{lines(3)}</div>
 <div class="paper" style="left:380px;top:50px;width:230px;height:300px;transform:rotate(5deg)"><div class="ln hl s"></div><div class="ln hl"></div><div class="ln hl m"></div><div class="ln"></div><div style="height:10px"></div><div class="ln hl"></div><div class="ln hl m"></div>{lines(2)}<div style="height:10px"></div><div class="ln hl"></div>{lines(2)}
  <svg class="pen" style="left:0;top:0" width="230" height="300"><path d="M150,40 l20,20 l36,-40" style="stroke-width:7"/><path d="M170,150 c20,-30 50,-10 30,10 c-20,20 10,40 30,10" style="stroke-width:5"/></svg></div>
 <div class="tab on" style="left:52px;top:0px;width:70px;height:70px;font-size:46px;border-radius:12px 12px 0 0" data-k="t1"></div>
 <div class="tab on" style="left:262px;top:-30px;width:70px;height:70px;font-size:46px;border-radius:12px 12px 0 0" data-k="t2"></div>
 <div class="tab on" style="left:460px;top:-4px;width:70px;height:70px;font-size:46px;border-radius:12px 12px 0 0" data-k="t3"></div>
 <div class="hand" data-k="m1" style="position:absolute;left:30px;top:390px;font-size:56px;color:var(--paper)"></div>
 <div class="hand" data-k="m2" style="position:absolute;left:232px;top:370px;font-size:56px;color:var(--paper)"></div>
 <div class="hand" data-k="m3" style="position:absolute;left:400px;top:392px;font-size:56px;color:var(--paper)"></div>
</div>''',
    css='.hd{left:52px;top:36px;font-size:112px}',
    images={"room": FR('247.3'), "me": ME('247.3')},
    vars={**GV, "--bgb": "1.2", "--sc": "1.3", "--sc-x": "-190px", "--sc-y": "60px"})

add('04-skim-it-in-10-minutes', 'photo',
    "Photo background, black and white (her and her room), with one colour on it: a big printed paper where only the title, the abstract, "
    "the headings and the conclusion are highlighted and everything else is greyed out, numbered 1-4 in the order to read them, and a "
    "handwritten 10 min. References: the kit's T1 concept, saved thumbnails with one word in a colour box.",
    {"hd": "Skim it in<br><em class=\"acc\">10 minutes</em>", "pt": "Title", "ha": "Abstract", "hh": "Headings", "hc": "Conclusion", "m": "10 min",
     "n1": "1", "n2": "2", "n3": "3"},
    [10, 1, 2],
    f'''{scene(FR('555.3'), ME('555.3'), 'bw')}
<div class="hd z4 shadow-t" data-k="hd"></div>
<div class="paper fade z4" data-move="paper" style="left:806px;top:150px;width:380px;height:540px;transform:rotate(2.5deg)">
 <div class="ttl"><span class="mk" data-k="pt"></span></div><div style="height:6px"></div>
 <div class="h"><span class="mk" data-k="ha"></span></div><div class="ln hl"></div><div class="ln hl m"></div><div style="height:6px"></div>
 <div class="h"><span class="mk" data-k="hh"></span></div>{lines(4)}<div style="height:6px"></div>{lines(3)}
 <div class="h"><span class="mk" data-k="hc"></span></div><div class="ln hl"></div><div class="ln hl s"></div>
 <div class="num" data-k="n1" style="right:26px;top:24px"></div><div class="num" data-k="n2" style="right:26px;top:176px"></div><div class="num" data-k="n3" style="right:26px;top:400px"></div>
</div>
<div class="hand z5" data-k="m" style="position:absolute;left:560px;top:600px;font-size:76px;color:var(--paper);transform:rotate(-6deg)"></div>''',
    css='.hd{left:52px;top:40px;font-size:112px}.paper .h{margin-top:22px}',
    images={"room": FR('555.3'), "me": ME('555.3')},
    vars={**GV, "--bgb": ".8", "--sc": "1.3", "--sc-x": "-190px", "--sc-y": "60px"})

add('05-too-many-papers', 'photo',
    "Photo background washed deep blue-pen colour (one colour, so the room goes calm), she in full colour beside a tall, messy stack of "
    "printed papers with sticky tabs. The question every student with a reading list asks. References: viral 5 (the topic + her with it), "
    "her ux-research thumbnail (room in one colour, she in colour).",
    {"hd": "Too many<br><em class=\"acc\">papers to read?</em>"},
    [5, 3, 2],
    f'''{scene(FR('410.7'), ME('410.7'))}
<div class="hd z4 shadow-t" data-k="hd"></div>
<div class="abs z4" data-move="stack" style="left:820px;top:230px;width:400px;height:480px">
 {''.join(f'<div class="paper" style="left:{[0,14,-8,10,-4,18,2,-10,8,0][i]}px;top:{i*44}px;width:360px;height:60px;padding:0;transform:rotate({[-3,2,-1,3,-2,1,-3,2,-1,1][i]}deg);box-shadow:0 6px 10px rgba(0,0,0,.35)"></div>' for i in range(10))}
 <div class="abs" style="left:350px;top:60px;width:40px;height:26px;background:var(--hi)"></div><div class="abs" style="left:-24px;top:190px;width:40px;height:26px;background:#F79AB8"></div>
 <div class="abs" style="left:352px;top:300px;width:40px;height:26px;background:var(--hi)"></div>
 <div class="paper" style="left:-14px;top:-120px;width:380px;height:150px;transform:rotate(-4deg)"><div class="ttl" style="font-size:26px">Research paper</div><div style="height:10px"></div>{lines(3)}</div>
</div>''',
    css='.hd{left:52px;top:34px;font-size:104px}',
    images={"room": FR('410.7'), "me": ME('410.7')},
    vars={**GV, "--wash": "#2D4A9E", "--bgb": "1.15", "--sc": "1.3", "--sc-x": "-190px", "--sc-y": "60px"})

add('06-read-papers-faster', 'photo',
    "Photo background in natural colour, darkened, she calm. Keshav's real page (the paper that teaches this method) tilted beside her, "
    "his line 'This pass should take about five to ten minutes' highlighted. References: #08/#21 in her TikTok references (a real page "
    "as the receipt, with a marker), saved thumbnails with a document held up.",
    {"hd": "Read papers<br><em class=\"acc\">faster</em>", "cr": "S. Keshav, How to Read a Paper (2007)"},
    [2, 1, 10],
    f'''{scene(FR('9.3'), ME('9.3'), 'natural')}
<div class="hd z4 shadow-t" data-k="hd"></div>
{strip(600, 250, (294, 1758, 523, 32), 1.2, hl=[(538, 814)], rot=-2, name='line')}
{strip(640, 330, (176, 1838, 606, 30), 0.95, rot=1, name='step1')}
{strip(640, 390, (175, 1890, 641, 58), 0.95, rot=-1, name='step2')}
{strip(640, 480, (175, 1972, 274, 30), 0.95, rot=1, name='step3')}
<div class="cred z5" data-k="cr" style="position:absolute;left:640px;top:560px"></div>''',
    css='.hd{left:52px;top:40px;font-size:124px}',
    images={"room": FR('9.3'), "me": ME('9.3'), "page": SRC('keshav_p1.png')},
    vars={**GV, "--bgb": ".6", "--sc": "1.3", "--sc-x": "-190px", "--sc-y": "60px"})

add('07-find-your-research-gap', 'photo',
    "Photo background washed graphite, she in colour with one finger up. On the right a paper's Limitations section with one line "
    "highlighted, a blue-pen arrow from it to a yellow sticky note 'my thesis?'. Three big objects, one arrow (her ux-research thumbnail: "
    "note -> arrow -> object).",
    {"hd": "Find your<br><em class=\"acc\">research gap</em>", "h": "Limitations", "note": "my<br>thesis?"},
    [5, 3, 1],
    f'''{scene(FR('13.7'), ME('13.7'))}
<div class="hd z4 shadow-t" data-k="hd"></div>
<div class="paper z4" data-move="paper" style="left:760px;top:236px;width:360px;height:330px;transform:rotate(-2deg)">
 <div class="h" data-k="h" style="font-size:30px;margin-top:0"></div>{lines(2)}<div class="ln hl"></div><div class="ln hl s"></div>{lines(3)}</div>
<svg class="pen z5" style="left:900px;top:470px" width="200" height="140"><path d="M20,10 C30,90 90,120 170,110 M146,90 l28,20 l-30,18" style="stroke-width:8"/></svg>
<div class="sticky z5" data-move="note" style="left:1020px;top:520px;width:220px;height:170px;font-size:56px;transform:rotate(5deg)"><span data-k="note"></span></div>''',
    css='.hd{left:52px;top:36px;font-size:112px}',
    images={"room": FR('13.7'), "me": ME('13.7')},
    vars={**GV, "--bgb": "1.2", "--sc": "1.3", "--sc-x": "-190px", "--sc-y": "60px"})

# ---------------------------------------------------------------- COLLAGE (3)
add('08-collage-how-to-read-a-research-paper', 'collage',
    "Collage over her full natural photo (her 10-07 style: the creator in her room, small die-cut objects floating around her, one big "
    "serif line naming the topic, 2-3 tiny handwritten labels): a coffee, reading glasses, a printed paper with tab 1, a sticky note.",
    {"hd": "how to read a <em>research paper</em>", "l1": "", "t1": "1"},
    [1, 2, 3],
    f'''<div class="scene natural z1" data-move="room"><img class="bg" data-img="room" src="{FR('9.3')}" alt=""><div class="dim"></div></div>
<div class="hd z4 shadow-t" data-k="hd"></div>
<img class="stk z3" data-img="glasses" data-move="glasses" src="{COL('px_25389282-cut.png')}" style="left:930px;top:110px;width:300px;transform:rotate(-12deg)">
<div class="paper z3" data-move="paper" style="left:930px;top:300px;width:250px;height:330px;transform:rotate(6deg);border:6px solid #fff">
 <div class="ttl" style="font-size:24px">Research paper</div><div style="height:8px"></div><div class="ln hl"></div><div class="ln hl s"></div>{lines(3)}<div style="height:8px"></div>{lines(4)}
 <div class="tab on" style="left:240px;top:30px;width:60px;height:60px;font-size:38px" data-k="t1"></div></div>
<div class="hand z5" data-k="l1" style="position:absolute;left:110px;top:600px;font-size:48px;color:var(--paper);transform:rotate(-4deg)"></div>
''',
    css='.hd{left:0;width:1280px;text-align:center;top:30px;font-size:84px;font-weight:800;letter-spacing:-.03em}.hd em{font-weight:700}.paper{overflow:visible}',
    images={"room": FR('9.3'), "glasses": COL('px_25389282-cut.png')},
    vars={**GV, "--bgb": ".78", "--dim": "rgba(20,20,24,.18)", "--sc": "1.0"})

add('09-collage-the-3-pass-method', 'collage',
    "Collage over her full natural photo: three printed pages as die-cut stickers labelled 1, 2, 3 around her, each with its time "
    "handwritten, one serif line for the method's name, the reading glasses as a fourth object.",
    {"hd": "the <em>3-pass</em> method", "sub": "for reading research papers", "m1": "1 · 10 min", "m2": "2 · an hour", "m3": "3 · a few hours"},
    [6, 1, 2],
    f'''<div class="scene natural z1" data-move="room"><img class="bg" data-img="room" src="{FR('439.0')}" alt=""><div class="dim"></div></div>
<div class="hd z4 shadow-t" data-k="hd"></div>
<div class="hand z4" data-k="sub" style="position:absolute;left:0;width:1280px;text-align:center;top:146px;font-size:52px;color:var(--paper)"></div>
{''.join(f'<div class="paper z3" data-move="p{i+1}" style="left:{x}px;top:{y}px;width:190px;height:250px;padding:22px;border:6px solid #fff;transform:rotate({r}deg)">{"".join(["<div class=\"ln hl\"></div>"]*(i+1))}{lines(6-i)}<div class="hand" data-k="m{i+1}" style="position:absolute;left:0;top:-64px;font-size:46px;color:var(--paper)"></div></div>' for i,(x,y,r) in enumerate([(70,300,-8),(1020,250,6),(740,470,-3)]))}
<img class="stk z3" data-img="glasses" data-move="glasses" src="{COL('px_25389282-cut.png')}" style="left:60px;top:600px;width:230px;transform:rotate(10deg)">''',
    css='.hd{left:0;width:1280px;text-align:center;top:30px;font-size:110px;font-weight:600}.hd em{font-weight:600}.paper{overflow:visible}.paper .hand{white-space:nowrap}',
    images={"room": FR('439.0'), "glasses": COL('px_25389282-cut.png')},
    vars={**GV, "--bgb": ".78", "--dim": "rgba(20,20,24,.2)"})

add('10-collage-reading-papers-for-your-thesis', 'collage',
    "Collage over her full natural photo: a novel with a pen cross over it on one side, a research paper with a highlighter mark and "
    "tabs on the other, one serif line, small labels. For master's and PhD students with a reading list.",
    {"hd": "reading papers for your <em>thesis</em>", "l1": "not like a novel", "l2": "in 3 passes"},
    [5, 3, 1],
    f'''<div class="scene natural z1" data-move="room"><img class="bg" data-img="room" src="{FR('14.0')}" alt=""><div class="dim"></div></div>
<div class="hd z4 shadow-t" data-k="hd"></div>
<div class="abs z3" data-move="novel" style="left:40px;top:300px;width:330px;height:260px">
 <img class="stk" data-img="novel" src="{COL('px_5489753-cut.png')}" style="left:0;top:0;width:330px;transform:rotate(-6deg)">
 <svg class="pen" style="left:20px;top:10px" width="300" height="230"><path d="M20,30 L280,200 M280,30 L20,200" style="stroke-width:12;stroke:#E23B2E"/></svg></div>
<div class="paper z3" data-move="paper" style="left:950px;top:300px;width:250px;height:320px;transform:rotate(5deg);border:6px solid #fff">
 <div class="ttl" style="font-size:24px">Research paper</div><div style="height:8px"></div><div class="ln hl"></div><div class="ln hl m"></div>{lines(3)}<div style="height:8px"></div>{lines(4)}
 <div class="tab on" style="left:240px;top:24px;width:56px;height:56px;font-size:34px">1</div><div class="tab" style="left:240px;top:90px;width:56px;height:56px;font-size:34px">2</div><div class="tab" style="left:240px;top:156px;width:56px;height:56px;font-size:34px">3</div></div>
<div class="hand z5" data-k="l1" style="position:absolute;left:60px;top:570px;font-size:50px;color:var(--paper);transform:rotate(-4deg)"></div>
<div class="hand z5" data-k="l2" style="position:absolute;left:960px;top:636px;font-size:50px;color:var(--paper);transform:rotate(-3deg)"></div>''',
    css='.hd{left:0;width:1280px;text-align:center;top:30px;font-size:92px;font-weight:600}.hd em{font-weight:600}.paper{overflow:visible}',
    images={"room": FR('14.0'), "novel": COL('px_5489753-cut.png')},
    vars={**GV, "--bgb": ".78", "--dim": "rgba(20,20,24,.18)"})

# ---------------------------------------------------------------- FLAT (4)
add('11-read-it-out-of-order', 'flat',
    "Flat graphite ground, no face: one big printed paper with the order to read it in, yellow numbered circles on the title and "
    "abstract (1), the headings (2), the conclusion (3) and the references (4), the long paragraphs greyed out. The headline says the "
    "surprise plainly. References: her database-indexes thumbnail (the idea drawn big and literally), viral 3 (the framework drawn).",
    {"hd": "What to<br><em class=\"acc\">read first</em>", "pt": "Research paper", "ha": "Abstract", "hh": "Headings", "hc": "Conclusion", "hr": "References",
     "n1": "1", "n2": "2", "n3": "3", "n4": "4"},
    [9, 7, 1],
    f'''<div class="hd z4" data-k="hd"></div>
<div class="paper fade z3" data-move="paper" style="left:700px;top:30px;width:470px;height:610px;transform:rotate(3deg)">
 <div class="row1"><div class="ttl" style="font-size:40px"><span class="mk" data-k="pt"></span></div><div class="num" data-k="n1"></div></div>
 <div class="h"><span class="mk" data-k="ha"></span></div><div class="ln hl"></div><div class="ln hl m"></div>
 <div class="row1"><div class="h"><span class="mk" data-k="hh"></span></div><div class="num" data-k="n2"></div></div>{lines(4)}<div style="height:6px"></div>{lines(3)}
 <div class="row1"><div class="h"><span class="mk" data-k="hc"></span></div><div class="num" data-k="n3"></div></div><div class="ln hl m"></div>
 <div class="row1"><div class="h"><span class="mk" data-k="hr"></span></div><div class="num" data-k="n4"></div></div>{lines(2)}
</div>''',
    css='.hd{left:70px;top:190px;font-size:124px;white-space:normal;width:620px}.paper .h{margin-top:26px;font-size:28px}.row1{display:flex;justify-content:space-between;align-items:flex-end}.row1 .num{position:relative;width:70px;height:70px;font-size:56px;flex:none}',
    vars=GV, recommended=True)

add('12-the-3-pass-method', 'flat',
    "Flat paper ground (the film's paper colour), her black-and-white cut-out with a white outline on the left, the method's name huge "
    "in ink with the 3 in italic, and on the right a paper with its three tabs, the first one highlighted. References: her "
    "database-indexes thumbnail (flat ground, small cut-out of her, one drawn idea), with the paper look of this video.",
    {"hd": "The <em>3-pass</em><br>method", "sub": "for reading research papers", "t1": "1", "t2": "2", "t3": "3"},
    [6, 1, 2],
    f'''<img class="cut ol z3" data-img="me" data-move="her" src="{CUT('13.7')}" style="left:-150px;height:560px">
<div class="hd z4" data-k="hd"></div>
<div class="hand z4" data-k="sub" style="position:absolute;left:604px;top:300px;font-size:64px"></div>
<div class="paper z3" data-move="paper" style="left:640px;top:390px;width:440px;height:220px;height:360px;transform:rotate(-2deg);box-shadow:0 20px 40px rgba(0,0,0,.18);border:2px solid #E3E1D8">
 <div class="ttl">Research paper</div><div style="height:12px"></div><div class="ln hl"></div><div class="ln hl s"></div>{lines(3)}
 <div class="tab on" style="left:440px;top:0px;width:80px;height:80px;font-size:52px" data-k="t1"></div><div class="tab" style="left:440px;top:88px;width:80px;height:80px;font-size:52px" data-k="t2"></div><div class="tab" style="left:440px;top:176px;width:80px;height:80px;font-size:52px" data-k="t3"></div></div>''',
    css='.hd{left:600px;top:60px;font-size:118px;color:var(--fg)}.hd em{color:var(--accent)}.paper{overflow:visible}',
    images={"me": CUT('13.7')},
    vars={"--ground": "#FBFAF4", "--fg": "#17171A", "--accent": "#2447C9", "--ol": "#FFFFFF"})

add('13-is-this-paper-any-good', 'flat',
    "Flat graphite ground, no face: a paper card titled 'Before you trust a paper' with the three checks from the video in blue pen, each "
    "with a tick box: the sample size, the method, who funded it. The headline asks the question plainly. References: saved "
    "thumbnails with a checklist ('Everything done by 2pm'), viral 3 (the framework drawn).",
    {"hd": "Is this<br>research paper<br><em class=\"acc\">any good?</em>", "pt": "Check 3 things", "c1": "How many people?", "c2": "Right method?", "c3": "Who paid for it?"},
    [8, 4, 3],
    f'''<div class="hd z4" data-k="hd"></div>
<div class="paper z3" data-move="card" style="left:740px;top:110px;width:500px;height:470px;transform:rotate(-2.5deg);padding:44px 44px">
 <div class="ttl" data-k="pt" style="font-size:46px"></div>
 {''.join(f'<div style="display:flex;align-items:center;gap:22px;margin-top:{48 if i==0 else 34}px"><div style="width:58px;height:58px;border:5px solid var(--ink);border-radius:6px;flex:none;position:relative"><svg class="pen" style="left:-6px;top:-22px" width="80" height="80"><path d="M10,44 l18,20 l40,-56" style="stroke-width:9"/></svg></div><div class="hand" data-k="c{i+1}" style="font-size:54px"></div></div>' for i in range(3))}
</div>''',
    css='.hd{left:50px;top:160px;font-size:92px}.paper .hand{font-size:58px!important;-webkit-text-stroke:1.2px var(--pen)}',
    vars=GV)

add('14-not-a-novel', 'flat',
    "Flat split on graphite, no face: on the left a novel (a real book photo, die-cut) read from page 1 to the end, crossed out in pen; on "
    "the right a research paper with tabs 1, 2, 3, read in passes. The headline says the one idea: a paper is not read like a novel. "
    "References: the saved before/after splits; the kit's cold reviewer liked this idea best (9/10 with title 7).",
    {"hd": "Don't read papers <em class=\"acc\">like a novel</em>", "t1": "1", "t2": "2", "t3": "3"},
    [7, 9, 1],
    f'''<div class="hd z4" data-k="hd"></div>
<div class="abs z3" data-move="novel" style="left:60px;top:220px;width:520px;height:400px">
 <img data-img="novel" src="{COL('px_5489753-cut.png')}" style="position:absolute;left:0;top:0;width:520px;filter:drop-shadow(0 20px 30px rgba(0,0,0,.4))">
 <svg class="pen" style="left:30px;top:10px" width="470" height="370"><path d="M30,40 L440,330 M440,40 L30,330" style="stroke-width:28;stroke:#FBFAF4"/></svg></div>
<div class="paper z3" data-move="paper" style="left:780px;top:200px;width:330px;height:420px;transform:rotate(3deg)">
 <div class="ttl" style="font-size:30px">Research paper</div><div style="height:10px"></div><div class="ln hl"></div><div class="ln hl m"></div>{lines(3)}<div style="height:10px"></div>{lines(4)}<div style="height:10px"></div>{lines(3)}
 <div class="tab on" style="left:330px;top:30px" data-k="t1"></div><div class="tab" style="left:330px;top:126px" data-k="t2"></div><div class="tab" style="left:330px;top:222px" data-k="t3"></div></div>
''',
    css='.hd{left:0;width:1280px;text-align:center;top:40px;font-size:92px}.paper{overflow:visible}',
    images={"novel": COL('px_5489753-cut.png')},
    vars=GV)

# ---------------------------------------------------------------- OTHER (4)
add('15-stop-reading-every-line', 'other',
    "Before / after split, no face: the same paper twice. Left, every line highlighted (reading it like a book, 'hours'); right, only the "
    "title, abstract, headings and conclusion highlighted ('10 min'). The headline tells you what to stop doing. References: the saved "
    "before/after and Day 1 / Day 900 splits.",
    {"hd": "Stop reading <em class=\"acc\">every line</em>", "a": "hours", "b": "10 min", "pa": "Research paper", "pb": "Research paper"},
    [7, 2, 10],
    f'''<div class="hd z4" data-k="hd"></div>
<div class="abs z2" style="left:640px;top:170px;width:4px;height:520px;background:#4A4D55"></div>
<div class="paper z3" data-move="before" style="left:130px;top:170px;width:380px;height:420px;transform:rotate(-3deg)"><div class="ttl" style="font-size:28px" data-k="pa"></div><div style="height:10px"></div>{lines(5, 'm')}<div style="height:10px"></div>{lines(5, 'm')}<div style="height:10px"></div>{lines(4, 's')}</div>
<div class="paper fade z3" data-move="after" style="left:770px;top:170px;width:380px;height:420px;transform:rotate(2deg)"><div class="ttl" style="font-size:44px"><span class="mk" data-k="pb"></span></div><div style="height:10px"></div><div class="ln hl"></div><div class="ln hl m"></div>{lines(3)}<div style="height:10px"></div><div class="ln hl s"></div>{lines(4)}<div style="height:10px"></div><div class="ln hl"></div><div class="ln hl s"></div>{lines(2)}</div>
<div class="hand z5" data-k="a" style="position:absolute;left:230px;top:590px;font-size:96px;color:#FBFAF4;transform:rotate(-6deg)"></div>
<div class="hand z5" data-k="b" style="position:absolute;left:850px;top:590px;font-size:96px;color:var(--accent);transform:rotate(-6deg)"></div>
<svg class="pen z5" style="left:160px;top:190px" width="330" height="380"><path d="M20,20 L310,360 M310,20 L20,360" style="stroke-width:14;stroke:#2447C9"/></svg>''',
    css='.hd{left:0;width:1280px;text-align:center;top:36px;font-size:96px}',
    vars=GV)

add('16-keshavs-how-to-read-a-paper', 'other',
    "The real document, no face: the top of S. Keshav's two-page paper 'How to Read a Paper' (2007), the method the video teaches, on "
    "graphite; its title highlighted, and in blue pen 'the 3-pass method' with tabs 1-2-3 on the page edge. A real page, credited. "
    "References: her 10b taste (a real clipping with the key words highlighted), TikTok references #08/#21.",
    {"note": "the 3-pass method", "cr": "S. Keshav, “How to Read a Paper”, 2007", "t1": "1", "t2": "2", "t3": "3"},
    [6, 1, 2],
    f'''{keshav(130, 60, 950, 330, 225, 200, 0.9, rot=-2, hls=[(196, 85, 414)], name='page', key='page')}
<div class="tab on z4" data-k="t1" style="left:1076px;top:80px;width:96px;height:96px;font-size:62px"></div><div class="tab z4" data-k="t2" style="left:1078px;top:186px;width:96px;height:96px;font-size:62px"></div><div class="tab z4" data-k="t3" style="left:1080px;top:292px;width:96px;height:96px;font-size:62px"></div>
<div class="hand z5" data-k="note" style="position:absolute;left:0;width:1280px;text-align:center;top:450px;font-size:150px;color:var(--accent);transform:rotate(-3deg)"></div>
<div class="cred z5" data-k="cr" style="position:absolute;left:150px;top:670px"></div>''',
    css='',
    images={"page": SRC('keshav_p1.png')},
    vars=GV)

add('17-is-12-people-enough', 'other',
    "The real receipt, no face: Kelly Caine's CHI 2016 paper ('Local Standards for Sample Size at CHI'), the abstract line where the most "
    "common sample size is 12, highlighted; twelve small figures drawn under it. The headline asks the question a careful reader asks. "
    "References: TikTok references #08/#34 (a screenshot as the receipt, with a marker).",
    {"hd": "Is 12 people <em class=\"acc\">enough?</em>", "cr": "Kelly Caine, Local Standards for Sample Size at CHI (CHI 2016)"},
    [8, 4, 3],
    f'''<div class="hd z4" data-k="hd"></div>
<div class="real z3" data-move="receipt" style="left:90px;top:250px;width:1100px;height:122px;transform:rotate(-1deg)"><img data-img="receipt" src="{SRC('caine__most-common-sample-size.png')}" style="left:-950px;top:-1128px;width:2880px"><div class="hl" style="left:896px;top:48px;width:104px;height:38px"></div><div class="hl" style="left:22px;top:88px;width:400px;height:38px"></div></div>
<div class="abs z4" data-move="people" style="left:240px;top:470px;width:800px;height:100px;display:flex;gap:18px;justify-content:center">
 {''.join('<svg width="48" height="96" viewBox="0 0 48 96"><circle cx="24" cy="16" r="13" fill="#FBFAF4"/><path d="M4,96 L4,50 Q4,34 24,34 Q44,34 44,50 L44,96 Z" fill="#FBFAF4"/></svg>' for _ in range(12))}</div>
<div class="cred z5" data-k="cr" style="position:absolute;left:90px;top:620px"></div>''',
    css='.hd{left:0;width:1280px;text-align:center;top:40px;font-size:118px}',
    images={"receipt": SRC('caine__most-common-sample-size.png')},
    vars=GV)

add('18-paper-with-her-as-figure-1', 'other',
    "The thumbnail is a research paper (the film's 'Figure 2' idea): a paper page on graphite with the video's topic as the paper's title, "
    "her name as the author, the abstract as grey lines with one highlighted, and her photo as Figure 1 with a caption. Literal, "
    "playful, and the topic reads first. References: B Typeset's Figure layout she picked, the Pinterest polaroid inserts.",
    {"pt": "How to Read a<br>Research Paper", "au": "Gbemisola Oladetoun · @WithGbemi", "ab": "Abstract", "fig": "<b>Figure 1.</b> An HCI master's student."},
    [1, 3, 2],
    f'''<div class="paper z3" data-move="page" style="left:130px;top:30px;width:1020px;height:760px;padding:40px 60px;transform:rotate(-1.5deg)">
 <div class="ttl" data-k="pt" style="font-size:80px;text-align:center;line-height:.95"></div>
 <div data-k="au" style="text-align:center;font-family:'News';font-size:28px;margin-top:14px;font-style:italic"></div>
 <div style="display:flex;gap:40px;margin-top:26px">
  <div style="flex:1"><div class="h" data-k="ab" style="margin-top:4px"></div><div class="ln hl"></div><div class="ln hl m"></div>{lines(5)}<div style="height:10px"></div>{lines(4)}</div>
  <div style="width:560px"><div style="width:560px;height:360px;overflow:hidden;position:relative;border:2px solid #17171A"><img data-img="fig" src="{FR('14.3')}" style="position:absolute;left:-330px;top:-130px;width:1220px"></div>
   <div data-k="fig" style="font-family:'News';font-size:40px;margin-top:10px;line-height:1.2"></div></div>
 </div></div>''',
    css='.paper .ln{height:11px;margin-bottom:12px}',
    images={"fig": FR('14.3')},
    vars=GV)


CUT_DIRS = {'06-read-papers-faster', '10-collage-reading-papers-for-your-thesis', '16-keshavs-how-to-read-a-paper', '17-is-12-people-enough'}
from r2blocks import r2
_n0 = len(D)
r2(add, scene, FR, ME, CUT, COL, SRC, lines, GV)          # round 2 (after cold critic R1) replaces same-name directions
_r2 = {d['name'] for d in D[_n0:]}
D[:] = [d for i, d in enumerate(D) if d['name'] not in CUT_DIRS and (i >= _n0 or d['name'] not in _r2)]
D.sort(key=lambda d: d['name'])

def write(d, force):
    p = os.path.join(DIRS, d['name']); os.makedirs(p, exist_ok=True)
    if os.path.exists(os.path.join(p, 'content.json')) and not force:
        print('keep', d['name']); return
    html = (f'<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../../lib/rp.css"><style>{d["css"]}</style></head>'
            f'<body><div class="t">\n{d["html"]}\n</div><script src="../../lib/bind.js"></script></body></html>')
    open(os.path.join(p, 'index.html'), 'w').write(html)
    c = {"direction": d['direction'], "thumbnail_text": None, "titles": d['titles'], "title": d['titles'][0], "kind": d['kind'],
         "text": d['text'], "images": d['images'], "vars": d['vars']}
    if d['cls']: c['class'] = d['cls']
    if d['recommended']: c['recommended'] = True
    import re
    words = ' '.join(re.sub('<[^>]+>', ' ', v) for k, v in d['text'].items() if k in ('hd', 'note', 'pt')) or ''
    c['thumbnail_text'] = ' '.join(words.split())
    json.dump(c, open(os.path.join(p, 'content.json'), 'w'), indent=1, ensure_ascii=False)
    print('wrote', d['name'])

if __name__ == '__main__':
    args = [a for a in sys.argv[1:] if not a.startswith('--')]; force = '--force' in sys.argv
    for d in D:
        if not args or any(d['name'].startswith(a) for a in args): write(d, force or bool(args) and force)
