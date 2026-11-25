#!/usr/bin/env python3
"""Writes the first version of every thumbnail direction (index.html + content.json) for http-status-codes (2026-11-03).
   python3 tools/gen-first-version.py            -> writes index.html for all; content.json only where it does not exist yet
   python3 tools/gen-first-version.py --force 03 -> also overwrites content.json of directions starting with 03 (loses studio edits!)
Once Gbemi edits a design in the studio, content.json is hers: never --force it.
FROZEN for content.json 2026-11-06 after critic round 3 (scores live in each content.json): run it without --force only, to rewrite index.html."""
import json, os, sys

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
A = '../../assets'
force = '--force' in sys.argv
only = [a for a in sys.argv[1:] if not a.startswith('--')]

T = {
 1: 'HTTP Status Codes Explained: Is It You or the Server?',
 '1a': 'HTTP Status Codes Explained (and the Mistakes to Avoid)',
 '1b': 'HTTP Status Codes Explained (With Real API Examples)',
 2: 'HTTP Status Codes Explained: 200, 404, 500 and More',
 3: 'HTTP Status Codes Explained With a Bookstore API',
 4: 'HTTP Status Codes Explained (Laravel API Examples)',
 5: 'How to Remember HTTP Status Codes Without a Cheat Sheet',
 6: 'REST API Status Codes: Which One Should You Return?',
 7: 'HTTP 401 vs 403: Unauthorized vs Forbidden Explained',
 8: 'API Status Codes Explained for Backend Developers',
 9: 'HTTP Status Code Mistakes That Break Your Frontend',
 10: 'Stop Returning 200 OK for Errors (HTTP Status Codes)',
 11: 'The HTTP Status Codes Developers Mix Up the Most',
 12: "Why Your API Shouldn't Send 200 OK for an Error",
 13: 'Every HTTP Status Code You Will Actually Use',
 14: 'HTTP 400 vs 422: Which One Should Your API Return?',
}
C = {'stone': '#D9D4C7', 'mint': '#8FE3B0', 'sky': '#8EC5FF', 'amber': '#FFA51F', 'tomato': '#FF5A3C', 'ink': '#121212'}

def scene(t, cls=''):
    """her photo: room (grey + wash) and her (full colour) as two aligned layers, so words can sit between them"""
    b = (f'<div class="scene {cls} z1" data-move="room"><img class="bg" data-img="room" src="{A}/frames/f_{t}.jpg" alt="">'
         f'<div class="wash"></div><div class="dim"></div></div>')
    f = f'<div class="scene {cls} z3" data-move="her"><img class="me-c" data-img="me" src="{A}/scene/gbemi-{t}-person.png" alt=""></div>'
    return b, f

def odo(frm, to, f, size, rest='', cls='', blur=4, move='odometer', k='rest', dim=False):
    """the film's odometer: the first digit caught near the end of its roll (the old digit faint above, a little blur)"""
    return (f'<div class="odo {cls}" data-move="{move}" style="font-size:{size}px"><span class="win" style="--f:{f};--bl:{blur}px">'
            f'<span class="a" data-k="{k}_from"></span><span class="b" data-k="{k}_to"></span></span>'
            f'<span class="rest{" xx" if dim else ""}" data-k="{k}"></span></div>'), {f'{k}_from': frm, f'{k}_to': to, k: rest}

D = []
def d(name, kind, words, titles, direction, css, body, text, images=None, vars=None, rec=False, cls=''):
    D.append(dict(name=name, kind=kind, words=words, titles=[T[i] for i in titles], direction=direction, css=css, body=body,
                  text=text, images=images or {}, vars=vars or {}, rec=rec, cls=cls))

def imgs(t, **extra):
    return dict(room=f'{A}/frames/f_{t}.jpg', me=f'{A}/scene/gbemi-{t}-person.png', **extra)

ODO_CSS = """.odo{position:absolute;display:flex;align-items:flex-end;font-family:'FD';font-weight:800;letter-spacing:-.05em;line-height:1;color:var(--ink)}
.odo .win{position:relative;overflow:hidden;height:.76em;width:.6em;display:block}
.odo .win span{position:absolute;left:0;right:0;text-align:center;line-height:.76em;height:.76em;top:0}
.odo .win .a{translate:0 calc(var(--f) * -100%);filter:blur(calc(var(--bl) * 2));opacity:var(--ao,0)}
.odo .win .b{translate:0 calc((1 - var(--f)) * 100%);filter:blur(var(--bl))}
.odo .rest{line-height:.76em;height:.76em;display:block}
.odo .xx{opacity:.3}"""

# ================================================================ PHOTO (her room in grey + one class colour, she in full colour)
F01 = '277.5'
b, f = scene(F01)
d('01-http-status-codes-404', 'photo', 'HTTP STATUS CODES', [2, 13, 1],
  "Photo background (her ux-research method): her room in grey washed amber (the 4xx colour), she in full colour, palm up toward a big browser window that says 404 Not Found. The topic name huge across the top. References: her ux-research thumbnail (room washed one colour, topic huge, she presents the object), her database-indexes thumbnail (one literal picture).",
  """.hd{left:0;right:0;top:26px;text-align:center;font-size:118px}
.br{left:830px;top:380px;width:410px;height:300px;transform:rotate(3deg);overflow:hidden}
.br .pg{padding:30px 34px}
.br .n{font-family:'FD';font-weight:800;font-size:150px;letter-spacing:-.05em;line-height:.85}
.br .m{font-size:40px;font-weight:700;letter-spacing:-.02em;margin-top:14px}
.ring{left:16px;top:6px;width:124px;height:150px}""",
  f"""{b}{f}<div class="hd z4" data-k="hd"></div>
<div class="card br z4" data-move="browser"><div class="bar"><i></i><i></i><i></i></div>
<div class="pg" style="position:relative"><div class="n" data-k="code"></div><div class="m" data-k="msg"></div>
</div></div>""",
  dict(hd='HTTP status codes', code='404', msg='Not Found'),
  imgs(F01), {'--wash': C['amber'], '--ground': C['amber'], '--bgb': '1.3', '--sc': '1.3', '--sc-x': '-60px', '--sc-y': '0px'})

F02 = '215.5'
b, f = scene(F02)
d('02-4xx-you-5xx-server', 'photo', '4XX = YOU / 5XX = SERVER', ['1a', 1, 8],
  "Photo background split in two class colours: the left half of her room washed amber (4xx), the right half tomato (5xx), she in full colour in the middle with both hands open, one toward each side. On each side the rule in giant type: 4XX = YOU, 5XX = SERVER. References: before/after splits in her saved YouTube thumbnails, her ux-research thumbnail (one colour wash), the film's colour flood.",
  """.l,.r{position:absolute;top:60px;font-family:'FD';font-weight:800;text-transform:uppercase;letter-spacing:-.04em;line-height:.86}
.l{left:44px}.r{right:44px;text-align:right}
.l .big,.r .big{font-size:190px}.l .eq,.r .eq{font-size:84px;margin-top:16px}
.big i{font-style:normal;opacity:.35}
.tp{position:absolute;left:50%;top:26px;translate:-50% 0;background:var(--ink);color:#fff;padding:8px 18px 10px;font-family:'FD';font-weight:800;font-size:44px;letter-spacing:-.02em;text-transform:uppercase;white-space:nowrap}""",
  f"""{b.replace('<div class="wash"></div>', '<div class="wash l"></div><div class="wash r"></div>')}{f}
<div class="l z4" data-move="left"><div class="big" data-k="l1"></div><div class="eq" data-k="l2"></div></div>
<div class="r z4" data-move="right"><div class="big" data-k="r1"></div><div class="eq" data-k="r2"></div></div>""",
  dict(l1='4XX', l2='= you', r1='5XX', r2='= server'),
  imgs(F02), {'--wash': C['amber'], '--wash2': C['tomato'], '--sc': '1.15', '--sc-y': '0px'}, rec=True)

F03 = '508.99'
b, f = scene(F03)
d('03-said-200-failed', 'photo', 'BUT IT FAILED (under a 200 OK)', [10, 12, 9],
  "Photo background: her room washed stone (neutral) so the two colours carry the idea; she on the left, calm, hands together. On the right one big API response: a mint 200 OK badge on top, and under it the body {\"error\": \"Something went wrong\"} with a tomato marker underline. The words say the bug in plain English. References: her saved 'before/after' and 'real screen' thumbnails, her database-indexes thumbnail (one mechanism, few big things).",
  """.hd{left:640px;top:36px;font-size:104px;line-height:.92;background:var(--ink);color:#fff;padding:18px 26px 14px}
.res{left:610px;top:330px;width:630px;padding:30px 34px 34px;transform:rotate(-2deg)}
.res .ok{display:inline-block;background:var(--c2);font-family:'FD';font-weight:800;font-size:104px;letter-spacing:-.05em;line-height:1;padding:10px 22px 14px}
.res .code{font-size:37px;margin-top:24px;line-height:1.35}
.res .code b{font-weight:400;background:linear-gradient(transparent 70%,var(--c5) 70%)}""",
  f"""{b}{f}<div class="hd z4" data-k="hd"></div>
<div class="card res z4" data-move="response"><div class="ok" data-k="ok"></div><div class="code" data-k="body"></div></div>""",
  dict(hd='But it<br>failed', ok='200 OK', body='{"error":<br> <b>"Something went wrong"</b>}'),
  imgs(F03), {'--wash': C['stone'], '--sc': '1.38', '--sc-x': '-190px', '--sc-y': '0px'})

F04 = '479.5'
b, f = scene(F04)
d('04-401-not-403', 'photo', '401 ≠ 403', [7, 11],
  "Photo background: room washed amber (both codes are 4xx), she in full colour with both hands up; above each hand a white code card, 401 'Who are you?' and 403 'Not allowed'. Between them, huge, the not-equal sign. References: viral 'two objects in her hands' thumbnails (1.jpg), her saved before/after splits.",
  """.c1,.c2{position:absolute;top:230px;width:280px;padding:24px 26px 28px;text-align:left}
.c1{left:16px;transform:rotate(-4deg)}.c2{right:16px;transform:rotate(4deg);background:var(--ink);color:#fff}
.c1 .n,.c2 .n{font-family:'FD';font-weight:800;font-size:130px;letter-spacing:-.05em;line-height:.85}
.c1 .m,.c2 .m{font-size:38px;font-weight:800;letter-spacing:-.02em;line-height:1.05;margin-top:16px}
.ne{left:0;right:0;top:12px;text-align:center;font-size:150px}""",
  f"""{b}{f}<div class="hd ne z4" data-k="hd"></div>
<div class="card c1 z4" data-move="card401"><div class="n" data-k="n1"></div><div class="m" data-k="m1"></div></div>
<div class="card c2 z4" data-move="card403"><div class="n" data-k="n2"></div><div class="m" data-k="m2"></div></div>""",
  dict(hd='401 ≠ 403', n1='401', m1='Who are you?', n2='403', m2='Not allowed'),
  imgs(F04), {'--wash': C['amber'], '--sc': '1.15', '--sc-y': '0px'}, rec=True)

F05 = '175.66'
b, f = scene(F05)
d('05-503-not-your-fault', 'photo', 'NOT YOUR FAULT (503)', [1, '1b', 2],
  "Photo background: her room washed tomato (the 5xx colour), she calm in full colour on the right; on the left one big phone, a third of the frame, showing a plain white 503 Service Unavailable page (generic, no brand). The words give the answer for that code. References: her viral sample 6 (the 503 phone screen), her ux-research thumbnail (photo washed one colour, big object).",
  """.hd{left:440px;top:30px;font-size:112px;line-height:.88}
.phone{left:60px;top:200px;width:360px;height:420px;transform:rotate(-4deg);background:#fff;border-radius:0;padding:0}
.phone .scr{border-radius:0}
.scr .in{padding:70px 24px 0;text-align:center}
.scr .n{font-family:'FD';font-weight:800;font-size:190px;letter-spacing:-.05em;line-height:.85}
.scr .m{font-size:40px;font-weight:800;line-height:1.05;margin-top:18px}
.scr .s{font-family:'FM';font-size:18px;color:rgba(18,18,18,.55);margin-top:30px}""",
  f"""{b}{f}<div class="hd z4" data-k="hd"></div>
<div class="phone z4" data-move="phone"><div class="scr"><div class="in"><div class="n" data-k="code"></div><div class="m" data-k="msg"></div></div></div></div>""",
  dict(hd='Not your<br>fault', code='503', msg='Service Unavailable'),
  imgs(F05), {'--wash': C['tomato'], '--sc': '1.38', '--sc-x': '240px', '--sc-y': '0px'})

F06 = '251.66'
b, f = scene(F06)
d('06-read-the-first-digit', 'photo', 'READ THE FIRST DIGIT', [5, 13, 1],
  "Photo background: room washed stone, she in full colour on the left pointing at three tall tiles in the class colours: 2 = it worked (mint), 4 = you broke it (amber), 5 = server broke it (tomato). The way to remember every code, drawn as three big objects. References: her ux-research sticky notes (few, huge props on her photo), the film's class colours.",
  """.hd{left:560px;top:24px;font-size:100px;line-height:.88}
.tiles{position:absolute;left:560px;top:236px;display:flex;gap:18px}
.tl{width:208px;height:420px;padding:22px 20px;display:flex;flex-direction:column;justify-content:space-between;color:var(--ink)}
.tl .d{font-family:'FD';font-weight:800;font-size:220px;letter-spacing:-.05em;line-height:.78}
.tl .m{font-size:40px;font-weight:800;letter-spacing:-.02em;line-height:1}
.tl.big{scale:1.14;z-index:2;box-shadow:none}
.tiles{align-items:center}""",
  f"""{b}{f}<div class="hd z4" data-k="hd"></div>
<div class="tiles z4" data-move="tiles"><div class="tl" style="background:var(--c2)"><div class="d" data-k="d1"></div><div class="m" data-k="m1"></div></div>
<div class="tl big" style="background:var(--c4)"><div class="d" data-k="d2"></div><div class="m" data-k="m2"></div></div>
<div class="tl" style="background:var(--c5)"><div class="d" data-k="d3"></div><div class="m" data-k="m3"></div></div></div>""",
  dict(hd='Read the<br>first digit', d1='2', m1='It worked', d2='4', m2='You broke it', d3='5', m3='Server broke it'),
  imgs(F06), {'--wash': C['stone'], '--sc': '1.38', '--sc-x': '-190px', '--sc-y': '0px'})

# ================================================================ COLLAGE (her full natural photo, small die-cut stickers, one serif line)
F08 = '527.8'
b, f = scene(F08, 'natural')
d('08-collage-status-codes-explained', 'collage', 'status codes, explained', [13, '1b', 3],
  "Collage over her full natural photo (she smiling at her desk): one big elegant serif line 'status codes, explained' across the middle, and four die-cut code stickers in the class colours around her (200, 301, 404, 500), each with a tiny handwritten label (it worked, moved, not found, server broke). References: her collage samples ('Time to lock in', 'Capsule wardrobe'): full photo, small cut-outs, one serif line, 2-4 tiny labels.",
  """.ln{position:absolute;left:50%;top:560px;translate:-50% 0;rotate:-2deg;white-space:nowrap;background:#FFFDF6;color:var(--ink);padding:4px 34px 14px;font-family:'IS';font-size:118px;line-height:1}
.sk{position:absolute;padding:10px 20px 14px;font-family:'FD';font-weight:800;font-size:78px;letter-spacing:-.05em;line-height:1;color:var(--ink)}
.lb{position:absolute;font-family:'Hand';font-weight:700;font-size:52px;color:#fff;text-shadow:0 2px 10px rgba(0,0,0,.5)}""",
  f"""{b}{f}<div class="ln z4" data-k="line"></div>
<div class="sk stk z4" data-move="s200" style="left:70px;top:70px;background:var(--c2);transform:rotate(-8deg)" data-k="s1"></div><div class="lb z4" data-k="l1" style="left:96px;top:176px"></div>
<div class="sk stk z4" data-move="s404" style="left:60px;top:330px;background:var(--c4);transform:rotate(6deg)" data-k="s3"></div><div class="lb z4" data-k="l3" style="left:74px;top:436px"></div>
<div class="sk stk z4" data-move="s500" style="left:1010px;top:320px;background:var(--c5);transform:rotate(-6deg)" data-k="s4"></div><div class="lb z4" data-k="l4" style="left:980px;top:426px"></div>""",
  dict(line='status codes, explained', s1='200', l1='it worked', s3='404', l3='not found', s4='500', l4='server broke'),
  imgs(F08), {'--sc': '1.0'})

# ================================================================ FLAT (a class-colour ground, the odometer, her cut-out)
o, ot = odo('4', '5', 1, 520, '04', blur=0, dim=True)
d('10-odometer-who-broke-it', 'flat', 'FIRST DIGIT = WHO BROKE IT', [1, 8, 5],
  "Flat, no face, one ground (tomato, the 5xx colour): the film's odometer number 504 with the first digit sharp and full ink and the last two digits ghosted, so the eye lands on the digit that matters. The words give the rule. References: her database-indexes thumbnail (one big drawn idea, few elements), the film's B look.",
  ODO_CSS + """
.odo{left:56px;top:110px}
.odo .xx{opacity:.45}
.tag{position:absolute;left:62px;top:40px;font-family:'FM';font-size:48px;color:var(--ink)}
.hd{left:60px;top:520px;font-size:90px;line-height:.92}""",
  f"""<div class="tag z4" data-k="tag"></div>{o}<div class="hd z4" data-k="hd"></div>""".replace('class="odo ', 'class="odo z3 '),
  dict(tag='HTTP status code', hd='First digit<br>= who broke it', **ot), {}, {'--ground': C['tomato']})

d('11-five-colours-cheat-sheet', 'flat', 'HTTP STATUS CODES (five classes)', [13, 2],
  "Flat cheat sheet, no face: five full-height columns in the class colours, each with its digit huge and one plain word (hold on, OK, moved, your fault, server's fault); an ink band on top with the topic name. A thumbnail people save. References: viral 3.jpg (framework drawn), her database-indexes clarity.",
  """.band{position:absolute;left:0;right:0;top:0;height:170px;background:var(--ink);color:#fff;display:flex;align-items:center;justify-content:center}
.band .hd{position:static;color:#fff;font-size:118px}
.cols{position:absolute;left:0;right:0;top:170px;bottom:0;display:grid;grid-template-columns:repeat(5,1fr)}
.cols>div{padding:56px 20px 0;color:var(--ink);display:flex;flex-direction:column}
.cols .d{font-family:'FD';font-weight:800;font-size:240px;letter-spacing:-.05em;line-height:.78}
.cols .d i{font-style:normal;font-size:.26em;color:rgba(18,18,18,.6);letter-spacing:-.02em}
.cols .m{font-size:46px;font-weight:800;letter-spacing:-.02em;line-height:1.02;margin-top:56px}""",
  """<div class="band z2" data-move="band"><div class="hd" data-k="hd"></div></div>
<div class="cols z2" data-move="columns"><div style="background:#D9D4C7"><div class="d">1<i>xx</i></div><div class="m" data-k="m1"></div></div>
<div style="background:var(--c2)"><div class="d">2<i>xx</i></div><div class="m" data-k="m2"></div></div>
<div style="background:var(--c3)"><div class="d">3<i>xx</i></div><div class="m" data-k="m3"></div></div>
<div style="background:var(--c4)"><div class="d">4<i>xx</i></div><div class="m" data-k="m4"></div></div>
<div style="background:var(--c5)"><div class="d">5<i>xx</i></div><div class="m" data-k="m5"></div></div></div>""",
  dict(hd='HTTP status codes', m1='Hold on', m2='OK', m3='Moved', m4='You', m5='Server'), {}, {'--ground': C['ink']})

d('12-400-or-422', 'flat', '400 OR 422?', [14, 6],
  "Flat amber ground (both are 4xx) with her black-and-white cut-out, ink outline, on the right, shrugging. Two big cards on the left: 400 'Broken request' (white) and 422 'Wrong data' (ink). A real choice developers argue about. References: her database-indexes thumbnail (B&W cut-out with outline, one idea), viral split thumbnails.",
  """.hd{left:56px;top:34px;font-size:128px}
.c1,.c2{position:absolute;top:270px;width:320px;padding:26px 28px 30px}
.c1{left:56px;transform:rotate(-3deg)}.c2{left:410px;transform:rotate(3deg);background:var(--ink);color:#fff}
.c1 .n,.c2 .n{font-family:'FD';font-weight:800;font-size:140px;letter-spacing:-.05em;line-height:.85}
.c1 .m,.c2 .m{font-size:44px;font-weight:800;letter-spacing:-.02em;line-height:1.02;margin-top:18px}
.cut{right:-30px;height:500px}""",
  """<div class="hd z4" data-k="hd"></div>
<div class="card c1 z4" data-move="card400"><div class="n" data-k="n1"></div><div class="m" data-k="m1"></div></div>
<div class="card c2 z4" data-move="card422"><div class="n" data-k="n2"></div><div class="m" data-k="m2"></div></div>
<img class="cut bw z3" data-img="me" data-move="her" src="../../assets/cut/gbemi-344.6.png" alt="">""",
  dict(hd='400 or 422?', n1='400', m1='Broken request', n2='422', m2='Wrong data'),
  {'me': f'{A}/cut/gbemi-344.6.png'}, {'--ground': C['amber'], '--ol': '#FFFFFF'})

d('13-created-something-201', 'flat', 'CREATED SOMETHING? 201', [6, 8, '1b'],
  "Flat mint ground (2xx) with her full-colour cut-out, white outline, pointing at the answer. One question card 'Created something?' and the answer huge: 201 Created. Shows the kind of decision the video answers. References: kodekloud faceless explainer cards, her database-indexes thumbnail (question → answer reading path).",
  """.q{left:620px;top:56px;white-space:nowrap;padding:20px 28px 24px;font-family:'FD';font-weight:800;font-size:64px;letter-spacing:-.03em;line-height:1;transform:rotate(-2deg)}
.ans{position:absolute;left:650px;top:225px;font-family:'FD';font-weight:800;font-size:340px;letter-spacing:-.06em;line-height:.8}
.sub{position:absolute;left:670px;top:540px;font-size:66px;font-weight:800;letter-spacing:-.02em}
.cut{left:-60px;height:640px}""",
  """<div class="card q z4" data-k="q" data-move="question"></div><div class="ans z4" data-k="ans"></div>
<img class="cut ol z3" data-img="me" data-move="her" src="../../assets/cut/gbemi-207.17.png" alt="">""",
  dict(q='Created something?', ans='201'),
  {'me': f'{A}/cut/gbemi-207.17.png'}, {'--ground': C['mint'], '--ol': '#FFFFFF'})

d('14-find-vs-findorfail', 'flat', 'find() vs findOrFail()', [9, 4],
  "Flat stone ground with her black-and-white cut-out on the right. Two lines of Laravel code on white cards, each with the code it ends in: Book::find(9999) → 500 (tomato), Book::findOrFail(9999) → 404 (amber). For the Laravel audience; no Laravel logo. References: her saved 'real screen' thumbnails, her database-indexes thumbnail (a mechanism with an arrow).",
  """.hd{left:56px;top:36px;font-size:84px;text-transform:none;letter-spacing:-.015em}
.ln{position:absolute;left:56px;display:flex;align-items:center;gap:22px}
.ln .cd{background:#fff;font-family:'FM';font-size:48px;padding:20px 26px}
.ln .ar{font-family:'FD';font-weight:800;font-size:60px}
.ln .rs{font-family:'FD';font-weight:800;font-size:140px;letter-spacing:-.05em;line-height:.85;padding:8px 16px 12px}
.cut{right:-460px;height:580px}""",
  """<div class="hd z4" data-k="hd"></div>
<div class="ln z4" data-move="line1" style="top:190px"><div class="cd" data-k="c1"></div><div class="ar">→</div><div class="rs" style="background:var(--c5)" data-k="r1"></div></div>
<div class="ln z4" data-move="line2" style="top:430px"><div class="cd" data-k="c2"></div><div class="ar">→</div><div class="rs" style="background:var(--c4)" data-k="r2"></div></div>
<img class="cut bw z3" data-img="me" data-move="her" src="../../assets/cut/gbemi-304.93.png" alt="">""",
  dict(hd='Laravel: 500 or 404?', c1='find(9999)', r1='500', c2='findOrFail(9999)', r2='404'),
  {'me': f'{A}/cut/gbemi-304.93.png'}, {'--ground': C['stone'], '--ol': '#FFFFFF'})

# ================================================================ OTHER (no face: a screen, a real page, a panel)
d('15-your-500-is-leaking', 'other', 'YOUR 500 IS LEAKING', [9, '1a'],
  "Other, no face: an ink ground, the part of a generic JSON error response (debug on) that leaks: the file path and the line number highlighted tomato, plus the stack trace. Generic paths, no real app. The words name the risk. References: her saved 'real screen' thumbnails, viral 6.jpg (a real screen).",
  """.hd{left:56px;top:44px;font-size:104px;color:#fff}
.hd .c5{color:var(--c5)}
.js{left:56px;top:250px;width:1168px;padding:36px 40px;background:#1d1d1f;color:#eae7df;font-size:52px;line-height:1.45;box-shadow:none}
.js b{font-weight:400;background:var(--c5);color:var(--ink);padding:0 6px}""",
  """<div class="hd z4" data-k="hd"></div>
<div class="card code js z4" data-move="json" data-k="json"></div>""",
  dict(hd='Your <span class="c5">500</span> is leaking', json='"file": <b>"/var/www/app/Http/…</b>\n  <b>/BookController.php"</b>,\n"line": <b>42</b>'),
  {}, {'--ground': C['ink']})

d('16-github-404-not-403', 'other', '404, NOT 403. ON PURPOSE.', [11, 7],
  "Other, no face: four lines of GitHub's own docs (captured from docs.github.com at phone width, cropped, not changed, credited) big on a white card over the sky ground, the part about hiding private repositories highlighted amber. The words say the surprising fact. References: her ghana 10b clipping (real text, key words highlighted), viral 'real document' thumbnails.",
  """.hd{left:56px;top:36px;font-size:104px;line-height:.9}
.shot{left:56px;top:290px;width:1168px;padding:16px;transform:rotate(-1deg)}
.shot img{display:block;width:100%}
.shot .mk{position:absolute;background:rgba(255,165,31,.62);mix-blend-mode:multiply}
.cr{left:60px;top:470px;font-size:22px;color:rgba(18,18,18,.75)}""",
  """<div class="hd z4" data-k="hd"></div>
<div class="card shot z3" data-move="screenshot"><div style="position:relative"><img data-img="shot" src="../../assets/src/gh-hl2.png" alt=""><div class="mk" style="left:3%;top:4%;width:82%;height:44%"></div><div class="mk" style="left:3%;top:52%;width:23.5%;height:44%"></div></div></div>
<div class="credit cr z4" data-k="credit"></div>""",
  dict(hd='404, not 403.<br>On purpose.', credit='GitHub Docs, Troubleshooting the REST API (docs.github.com)'),
  {'shot': f'{A}/src/gh-hl2.png'}, {'--ground': C['sky']})

d('17-devtools-status-column', 'other', 'WHAT THESE NUMBERS MEAN', [1, 2, 13],
  "Other, no face: a big generic browser DevTools Network panel (no brand), four bookstore requests, the Status column coloured by class (200 and 201 mint, 404 amber, 502 tomato) and circled in marker. Everyone has seen this column; the words promise to explain it. References: viral real-screen thumbnails, her database-indexes thumbnail (one object, one marker).",
  """.hd{left:56px;top:30px;font-size:96px;line-height:.9}
.net{left:56px;top:250px;width:1168px}
.net .th,.net .tr{display:grid;grid-template-columns:230px 1fr;align-items:center;padding:0 30px;height:92px;border-bottom:2px solid #ECEAE5}
.net .th{height:56px;font-family:'FM';font-size:24px;color:rgba(18,18,18,.55);background:#F5F4F1}
.net .tr{font-family:'FM';font-size:40px}
.net .st{font-family:'FD';font-weight:800;font-size:60px;letter-spacing:-.03em;padding:2px 16px;justify-self:start}
.ring{left:-30px;top:40px;width:270px;height:404px}""",
  """<div class="hd z4" data-k="hd"></div>
<div class="card net z3" data-move="panel"><div class="th"><span>Status</span><span>Name</span></div>
<div class="tr"><span class="st" style="background:var(--c2)" data-k="s1"></span><span data-k="n1"></span></div>
<div class="tr"><span class="st" style="background:var(--c2)" data-k="s2"></span><span data-k="n2"></span></div>
<div class="tr"><span class="st" style="background:var(--c4)" data-k="s4"></span><span data-k="n4"></span></div>
<div class="tr" style="border:0"><span class="st" style="background:var(--c5)" data-k="s5"></span><span data-k="n5"></span></div>
<svg class="mk ring" viewBox="0 0 100 200" preserveAspectRatio="none"><path d="M50,6 C14,4 6,60 8,110 C10,170 30,196 56,194 C88,192 96,140 94,90 C92,30 74,6 40,10" style="stroke-width:3;vector-effect:non-scaling-stroke;stroke-width:7px"/></svg></div>""",
  dict(hd='What these<br>HTTP codes mean', s1='200', n1='/books/42', s2='201', n2='/books', s4='404', n4='/books/9999', s5='502', n5='/stock'),
  {}, {'--ground': C['stone']})


# ================================================================ NEW in v2 (after critic round 1)
F07 = '377.83'
b, f = scene(F07, 'natural')
d('07-collage-401-403-keycard', 'collage', '401 vs 403 (keycard)', [7, 11],
  "Collage over her full natural photo (room darkened a little): a polaroid of a real hotel keycard at a door lock (Pexels, Ketut Subiyanto) and two die-cut code stickers, amber 401 'no card' and ink 403 'wrong room'; one big serif line '401 vs 403' across the bottom. The keycard makes the difference obvious without code. References: her collage samples (full photo, a few cut-outs, one serif line, tiny handwritten labels), viral 1.jpg (the topic object).",
  """.pol{position:absolute;left:46px;top:70px;width:330px;padding:12px 12px 0;background:#fff;transform:rotate(-5deg);box-shadow:0 14px 30px rgba(0,0,0,.35)}
.pol img{display:block;width:100%;height:300px;object-fit:cover}
.pol .cap{font-family:'FM';font-size:20px;padding:10px 4px 12px;color:var(--ink)}
.sk{position:absolute;padding:10px 22px 14px;font-family:'FD';font-weight:800;font-size:96px;letter-spacing:-.05em;line-height:1}
.lb{position:absolute;font-family:'Hand';font-weight:700;font-size:54px;color:#fff;text-shadow:0 2px 12px rgba(0,0,0,.55)}
.ln{position:absolute;left:50%;top:540px;translate:-50% 0;rotate:-2deg;white-space:nowrap;background:#FFFDF6;color:var(--ink);padding:4px 40px 14px;font-family:'IS';font-size:140px;line-height:1}""",
  f"""{b}{f}<div class="pol z4" data-move="polaroid" style="padding-bottom:12px"><img data-img="card" src="{A}/props/keycard-door.jpg" alt=""></div>
<div class="sk stk z4" data-move="s401" style="left:930px;top:80px;background:var(--c4);color:var(--ink);transform:rotate(6deg)" data-k="s1"></div><div class="lb z4" data-k="l1" style="left:960px;top:200px"></div>
<div class="sk stk z4" data-move="s403" style="left:960px;top:300px;background:var(--ink);color:#fff;transform:rotate(-5deg)" data-k="s2"></div><div class="lb z4" data-k="l2" style="left:960px;top:420px"></div>
<div class="ln z4" data-k="line"></div>""",
  dict(cap='hotel keycard', s1='401', l1='no card', s2='403', l2='wrong room', line='401 vs 403'),
  imgs(F07, card=f'{A}/props/keycard-door.jpg'), {'--dim': 'rgba(18,18,18,.25)', '--sc': '1.0'})

d('09-request-response', 'flat', 'HTTP STATUS CODES (request → response)', [3, '1b', 2],
  "Flat stone ground, her full-colour cut-out with a white outline on the left. The topic name huge on the right, and under it the one idea drawn big: a request card GET /books/9999, an arrow, and the answer tile 404 Not Found in amber. A literal picture of what a status code is. References: her database-indexes thumbnail (topic name huge, card → arrow → card), kodekloud request/response explainers.",
  """.hd{left:560px;top:40px;font-size:108px;line-height:.88;text-transform:none;letter-spacing:-.018em}
.rq{left:560px;top:330px;padding:22px 28px;font-family:'FM';font-size:50px;transform:rotate(-2deg)}
svg.ar{position:absolute;left:690px;top:425px;width:130px;height:120px}
.rs{position:absolute;left:840px;top:470px;padding:16px 28px 20px;background:var(--c4);transform:rotate(2deg)}
.rs .n{font-family:'FD';font-weight:800;font-size:150px;letter-spacing:-.05em;line-height:.82;position:relative}
.rs .m{font-size:40px;font-weight:800;letter-spacing:-.02em}
.ring{left:-14px;top:-14px;width:110px;height:150px}
.cut{left:-130px;height:660px}""",
  f"""<div class="hd z4" data-k="hd"></div>
<div class="card rq z4" data-move="request" data-k="req"></div>
<svg class="mk ar z4" viewBox="0 0 100 100"><path d="M10,10 C60,8 92,30 80,86" style="stroke-width:7"/><path d="M62,72 L80,90 L94,68" style="stroke-width:7"/></svg>
<div class="rs z4" data-move="response"><div class="n"><span data-k="code"></span></div><div class="m" data-k="msg"></div></div>
<img class="cut ol z3" data-img="me" data-move="her" src="{A}/cut/gbemi-516.83.png" alt="">""",
  dict(hd='HTTP<br>status codes', req='GET /books/9999', code='404', msg='Not Found'),
  {'me': f'{A}/cut/gbemi-516.83.png'}, {'--ground': C['stone'], '--ol': '#FFFFFF'})

# ---------------------------------------------------------------- write
for x in D:
    if only and not any(x['name'].startswith(o) for o in only):
        continue
    p = os.path.join(ROOT, 'directions', x['name']); os.makedirs(p, exist_ok=True)
    html = (f'<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../../lib/hs.css"><style>\n{x["css"]}\n</style></head>'
            f'<body><div class="t {x["cls"]}">\n{x["body"]}\n</div><script src="../../lib/bind.js"></script></body></html>\n')
    open(os.path.join(p, 'index.html'), 'w').write(html)
    cj = os.path.join(p, 'content.json')
    if force or not os.path.exists(cj):
        c = {'direction': x['direction'], 'thumbnail_text': x['words'], 'titles': x['titles'], 'title': x['titles'][0], 'kind': x['kind'],
             'text': x['text'], 'images': x['images'], 'vars': x['vars'], 'recommended': x['rec'], 'scores': ''}
        json.dump(c, open(cj, 'w'), indent=1, ensure_ascii=False)
    print('wrote', x['name'])
