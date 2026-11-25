"""ux-research thumbnails (2026-10-13): one direction per concept of the social strategist (kit/refined-kit.md section 3,
T01-T22, T17 left out as the weakest), plus a collage-over-creator option and a research-wall option in the film's look.
  python3 tools/gen.py               -> every direction
  python3 tools/gen.py 03 07         -> only these prefixes
  python3 tools/gen.py 07 --reset    -> also overwrite content.json text/images/vars/nudge (otherwise her studio edits win)
index.html is always rewritten; content.json keeps her studio edits. Then: node render.mjs
Her photo: frames of kit/UX research. .mov (4K), warmed (tools/warm.py, colour balance only), never flipped or retouched.
Every app screen, chart, badge, job ad and book is a generic illustration marked "Illustration".
"""
import json, os, sys, math
T = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RESET = '--reset' in sys.argv
ONLY = [a for a in sys.argv[1:] if not a.startswith('--')]
FW, FH = 2880, 1620
FACES = {}
for l in open(os.path.join(T, 'tools', 'faces.txt')):
    p = l.split()
    if len(p) >= 13: FACES[p[0][2:-4]] = (float(p[6]), float(p[8]), float(p[10]))

def photo(f, cx, cy, fw, bx=0, bw=1280, H=720, clamp=True):
    """photo vars: face centre at (cx, cy) in the box, face width fw px; the photo always covers its box"""
    x, y, w = FACES[f]
    k = max(fw / w, bw / FW, H / FH); pw, ph = FW * k, FH * k
    px = cx - (x + w / 2) * k; py = cy - (y + w / 2) * k
    if clamp: px = min(0, max(bw - pw, px)); py = min(0, max(H - ph, py))
    return {'--px': f'{px:.0f}px', '--py': f'{py:.0f}px', '--pw': f'{pw:.0f}px', '--bx': f'{bx}px', '--bw': f'{bw}px'}

def at(f, fx, fy, v):
    """where a point of the 2880x1620 frame lands on the thumbnail, for photo vars v"""
    k = float(v['--pw'][:-2]) / FW
    return (float(v['--bx'][:-2]) + float(v['--px'][:-2]) + fx * k, float(v['--py'][:-2]) + fy * k)

def scene(f): return {'scene': f'../../assets/scene/g/s_{f}.jpg', 'front': f'../../assets/scene/g/mask/s_{f}.png'}
PH = '<div class="photo" data-move="photo"><img data-img="scene" alt=""><div class="dim"></div></div>'
FRONT = '<div class="front"><img data-img="front" alt=""></div>'
CUT = '<div class="front shadowed" data-move="her"><img data-img="front" alt=""></div>'

# ---------- hand-drawn marker paths ----------
def loop(x, y, w, h, seed=1, turns=1.12):
    """a loose hand-drawn loop around a box (overshoots its start, like a paint marker)"""
    cx, cy, rx, ry = x + w / 2, y + h / 2, w / 2 * 1.08, h / 2 * 1.12
    pts = []; n = 48; a0 = -2.2 + seed * .37
    for i in range(n + 1):
        a = a0 + i / n * math.tau * turns
        wob = 1 + .045 * math.sin(i * .9 + seed) + .03 * math.cos(i * 1.7 + seed * 2)
        pts.append((cx + math.cos(a) * rx * wob, cy + math.sin(a) * ry * wob * (1 + .06 * i / n)))
    return 'M' + ' L'.join(f'{px:.1f} {py:.1f}' for px, py in pts)

def arrow(x1, y1, x2, y2, bend=.25, head=34):
    mx, my = (x1 + x2) / 2, (y1 + y2) / 2; dx, dy = x2 - x1, y2 - y1
    qx, qy = mx - dy * bend, my + dx * bend
    a = math.atan2(y2 - qy, x2 - qx)
    h1 = (x2 - head * math.cos(a - .5), y2 - head * math.sin(a - .5)); h2 = (x2 - head * math.cos(a + .5), y2 - head * math.sin(a + .5))
    return (f'M{x1:.0f} {y1:.0f} Q{qx:.0f} {qy:.0f} {x2:.0f} {y2:.0f}', f'M{h1[0]:.0f} {h1[1]:.0f} L{x2:.0f} {y2:.0f} L{h2[0]:.0f} {h2[1]:.0f}')

def svg(paths, move='marks', color=None, width=None, z=4):
    st = (f'--mk:{color};' if color else '') + (f'--mw:{width};' if width else '')
    ps = ''.join(f'<path d="{p}"/>' for p in paths)
    return f'<svg class="mk z{z}" data-move="{move}" style="left:0;top:0;{st}" width="1280" height="720" viewBox="0 0 1280 720">{ps}</svg>'

# ---------- app screens (generic, Illustration) ----------
# ---------- app screens (generic, Illustration). Round 2: a text-led checkout screen instead of the clip-art bowl ----------
ITEMS = [('#F2A65A', 'Avocado bowl', '£9.50'), ('#8FBF7A', 'Iced latte', '£3.80')]
def _items():
    return ''.join(f'<div class="it"><i style="background:{c}"></i><span>{n}</span><b>{p}</b></div>' for c, n, p in ITEMS)
def app(kind='checkout', extra=''):
    top = '<div class="bar"><span class="bk">&lsaquo;</span><span>Checkout</span><span class="dots">&middot;&middot;&middot;</span></div>'
    body = f'<div class="h1">Your order</div>{_items()}<div class="sum"><span>Delivery</span><b>£1.99</b></div><div class="tot"><span>Total</span><b>£15.29</b></div>'
    if kind in ('checkout', 'messy'): pay = '<div class="pay">Pay £15.29</div>'
    elif kind == 'tiny': pay = '<div class="ghost">pay &rsaquo;</div>'
    elif kind == 'tinymid': pay = '<div class="ghost mid" style="top:426px">pay &rsaquo;</div>'
    elif kind == 'wrong': pay = '<div class="up"><b>Add a cookie?</b><span>+ £2.00</span></div><div class="ghost" style="bottom:44px">pay &rsaquo;</div>'
    else: pay = ''
    if kind == 'analytics':
        return ('<div class="app an"><div class="bar"><span>Dashboard</span></div><div class="lab">Active users</div><div class="zero">0</div>'
                '<svg width="250" height="120" style="margin-top:6px"><path d="M4 100 L246 100" stroke="#E3342A" stroke-width="5" fill="none"/>'
                '<path d="M4 20 L246 20 M4 60 L246 60" stroke="#e8e1d6" stroke-width="2" fill="none"/></svg><div class="lab" style="margin-top:6px">Last 30 days</div>'
                '<div class="lab" style="margin-top:28px">Downloads</div><div class="mid">2</div></div>' + extra + '')
    if kind == 'settings':
        lab = ['Sync mode', 'Smart defaults', 'Legacy view', 'Auto-assist', 'Data saver+', 'Beta layout', 'Quick actions', 'Pro gestures', 'Haptic sort', 'Dual menu', 'Advanced 2']
        rws = ''.join(f'<div class="tg"><span>{l}</span><i class="{"on" if i % 3 else ""}"></i></div>' for i, l in enumerate(lab))
        return f'<div class="app"><div class="bar"><span class="bk">&lsaquo;</span><span>Settings</span><span></span></div>{rws}</div>' + extra + ''
    out = f'<div class="app">{top}{body}{pay}</div>'
    if kind == 'messy':
        out += ('<div class="shade"></div>'
                '<div class="pop" style="top:70px;transform:rotate(-2deg)">Rate us 5 stars?<div class="b"><span>Later</span><span>Rate</span></div></div>'
                '<div class="pop" style="top:200px;transform:rotate(2deg)">Turn on notifications?<div class="b"><span>No</span><span>Allow</span></div></div>'
                '<div class="pop" style="top:330px;transform:rotate(-1deg)">Accept cookies from 47 partners?<div class="b"><span>Manage</span><span>Accept</span></div></div>')
    return out + extra + ''

def phone(kind='checkout', style='', move='phone', extra='', z=3):
    return f'<div class="phone z{z}" data-move="{move}" style="{style}"><div class="scr"><div class="notch"></div>{app(kind, extra)}</div></div>'


def write(name, css, body, content):
    d = os.path.join(T, 'directions', name); os.makedirs(d, exist_ok=True)
    html = ('<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../../lib/ux.css"><style>\n'
            + css.strip() + '\n</style></head><body><div class="t">\n' + body.strip()
            + '\n</div><script src="../../lib/bind.js"></script></body></html>\n')
    open(os.path.join(d, 'index.html'), 'w').write(html)
    p = os.path.join(d, 'content.json')
    content.setdefault('vars', {}); content.setdefault('text', {}); content['title'] = content['titles'][0]
    if os.path.exists(p):
        old = json.load(open(p))
        if not RESET:
            for k in ('text', 'images', 'vars'): content[k] = {**content.get(k, {}), **old.get(k, {})}
            for k in ('nudge', 'class'):
                if k in old: content[k] = old[k]
            if old.get('title') and old['title'] not in content['titles']: content['title'] = old['title']
        for k in ('scores', 'recommended'):
            if k in old and k not in content: content[k] = old[k]
    order = ['direction', 'concept', 'thumbnail_text', 'title', 'titles', 'scores', 'recommended', 'text', 'images', 'vars', 'nudge', 'class']
    json.dump({k: content[k] for k in order if k in content}, open(p, 'w'), indent=2, ensure_ascii=False)

def vars_css(v): return ';'.join(f'{k}:{val}' for k, val in v.items())

# the strategist's titles (refined-kit.md section 2): 40-60 characters, keyword early, checked there
S = {1: "What Is UX Research? Why Good-Looking Apps Still Fail", 2: "What Is UX Research? Explained With Real App Examples",
     3: "UX Research for Beginners: Watch Users, Don't Just Ask", 4: "UI vs UX vs UX Research: The Difference Explained",
     5: "7 UX Research Methods, From Interviews to A/B Tests", 6: "Types of UX Research Explained: Qualitative vs Quantitative",
     7: "What Does a UX Researcher Actually Do All Week?", 8: "UX Researcher vs UX Designer: Who Does What on a Team?",
     9: "How to Become a UX Researcher With No Experience"}
C = {1: "UX Research: Why Users Say One Thing and Do Another", 2: "Why Beautiful Apps Can Be Awful to Use (UX Research)",
     3: "Built an App Nobody Uses? You Skipped UX Research", 4: "Can't Afford UX Research? Start With 5 Conversations",
     5: "Analytics Show Where Users Quit, Not Why (UX Research)", 6: "Test Your App Idea on Paper Before You Pay to Build It"}

D = []  # (name, css, body, content). Round 2 (2026-10-13): rebuilt after the three gates (see NOTES.md)
VIG = '<div class="vig"></div>'
def ph_at(L, T, s, sx, sy):   # a point on a phone screen (sx, sy in screen px) -> thumbnail px, for a phone at L,T with scale s and origin 0 0
    return (L + (11 + sx) * s, T + (11 + sy) * s)

# ===== 01 · T02 UI vs UX: same checkout, clean vs broken (top pair 1) =====
v = photo('601', 420, 400, 270, bx=640, bw=640)
p1 = (250, 205, .78); p2 = (690, 205, .78)
D.append(('01-ui-vs-ux-split', f"""
.t{{--ground:#EDE9E2;--fg:#17140F;--accent:#E3342A;--bgb:.62;{vars_css(v)}}}
.l1{{left:40px;top:14px;font-size:250px;color:var(--fg)}} .l2{{left:680px;top:14px;font-size:250px;color:var(--chalk)}}
.m1{{left:190px;top:110px;font-size:44px;color:#5b564d;transform:rotate(-6deg)}} .m2{{left:880px;top:80px;font-size:44px;color:var(--chalk);transform:rotate(-6deg)}}
.x{{left:{p2[0] + 170}px;top:{p2[1] + 20}px;font-size:200px;color:var(--accent);line-height:1;transform:rotate(-8deg)}}
""", f"""
{PH}{FRONT}
<div class="abs grot l1 z1" data-k="w1"></div><div class="abs grot l2 z3 shadow" data-k="w2"></div>
{phone('checkout', f'left:{p1[0]}px;top:{p1[1]}px;transform:rotate(-3deg) scale({p1[2]});transform-origin:0 0', 'phone-ui')}
{phone('messy', f'left:{p2[0]}px;top:{p2[1]}px;transform:scale({p2[2]});transform-origin:0 0', 'phone-ux')}
<div class="abs marker m1 z3" data-k="m1"></div><div class="abs marker m2 z3 hardsh" data-k="m2"></div>
""", {'direction': 'The same checkout screen twice (Illustration). Left, UI, on warm paper: clean and calm. Right, UX, over her real room (sceptical, hand at face): the same screen buried under pop-ups. Follows Kole Jain\'s CLUELESS / FLUENT split (506K, 16x) and uxpeak\'s Junior / Senior phones.',
      'concept': 'T02 (top pair 1)', 'thumbnail_text': 'UI | UX', 'recommended': True,
      'titles': ["UI vs UX: Why a Pretty App Can Still Fail", S[4], C[2]], 'text': {'w1': 'UI', 'w2': 'UX', 'm1': '', 'm2': ''},
      'images': scene('601')}))

# ===== 02 · T03 Pretty but unusable (top pair 2) =====
v = photo('688', 900, 330, 300)
L_, T_, s_ = 60, 290, .8
g = ph_at(L_, T_, s_, 244, 432)
D.append(('02-pretty-but-unusable', f"""
.t{{--ground:#10201b;--fg:#F4F0E6;--accent:#F26A2E;{vars_css(v)}}}
.hd{{left:40px;top:30px;color:var(--fg)}} .hd div{{white-space:nowrap;font-size:120px}}
.ul{{left:44px;top:278px;width:500px;height:30px}}
""", f"""
{PH}{VIG}
<div class="abs grot hd z1 shadow" data-move="headline"><div data-k="l1"></div><div data-k="l2"></div></div>
{FRONT}
{phone('tinymid', f'left:{L_}px;top:{T_}px;transform:scale({s_});transform-origin:0 0')}
{svg([loop(g[0] - 60, g[1] - 30, 120, 60, 2)], 'circle', width=8)}
""", {'direction': 'Her real room, a puzzled sideways look (hand on cheek), lifted and warmed. A clean checkout (Illustration) whose pay button is a faint 10 px word, circled in red marker. Words in two lines. Follows viral sample 4 (annotation on top) and her reading-stack edit (big expressive face).',
      'concept': 'T03 (top pair 2)', 'thumbnail_text': 'PRETTY BUT UNUSABLE', 'recommended': True,
      'titles': [S[1], C[2]],
      'text': {'l1': 'PRETTY BUT', 'l2': 'UNUSABLE'}, 'images': scene('688')}))

# ===== 03 · T11 Zero users (top pair 3) =====
v = photo('653.5', 960, 420, 280)
D.append(('03-zero-users', f"""
.t{{--ground:#10201b;--fg:#F4F0E6;--accent:#E3342A;{vars_css(v)}}}
.hd{{left:40px;top:20px;font-size:200px;color:var(--fg);white-space:nowrap}}
""", f"""
{PH}{VIG}
<div class="abs grot hd z1 shadow" data-move="headline" data-k="hd"></div>
{FRONT}
<div class="note o z3" data-move="note" style="left:90px;top:330px;--s:300px;transform:rotate(-6deg);font-size:58px" data-k="note"></div>
""", {'direction': 'Every builder\'s fear in one number: 0 USERS in huge type, and an orange sticky note: Launch day! Her worried, eyebrows-up look. Follows viral sample 2 (one object shows the outcome).',
      'concept': 'T11 (top pair 3)', 'thumbnail_text': '0 USERS', 'recommended': True,
      'titles': [C[3], S[1]], 'text': {'hd': '<span class="acc">0</span> USERS', 'note': 'Launch day!'}, 'images': scene('653.5')}))

# ===== 04 · T15 Users tap the wrong button =====
v = photo('670', 960, 400, 250)
L_, T_, s_ = 60, 230, .82
u = ph_at(L_, T_, s_, 210, 420)
D.append(('04-wrong-button', f"""
.t{{--ground:#10201b;--fg:#F4F0E6;--accent:#F26A2E;{vars_css(v)}}}
.hd{{left:40px;top:22px;color:var(--fg)}} .hd div{{white-space:nowrap;font-size:96px}}
.dot{{left:{u[0] - 18:.0f}px;top:{u[1] - 18:.0f}px;width:36px;height:36px;border-radius:50%;background:rgba(227,52,42,.9)}}
""", f"""
{PH}{VIG}{FRONT}
<div class="abs grot hd z3 shadow" data-move="headline"><div data-k="l1"></div><div data-k="l2"></div></div>
{phone('wrong', f'left:{L_}px;top:{T_}px;transform:rotate(-3deg) scale({s_});transform-origin:0 0')}
<div class="abs dot z4"></div>
{svg([loop(L_ + 40, T_ + 400 * s_, 220, 110, 4)], 'ring', width=9)}
""", {'direction': 'What a usability test finds: on a checkout (Illustration) the tap lands on the big green "Add a cookie?" card, ringed in red marker, while the real pay button is a faint word nobody sees. She studies it, hand on cheek. Follows viral sample 2 (one object shows the finding).',
      'concept': 'T15', 'thumbnail_text': 'USERS TAP THE WRONG BUTTON',
      'titles': [C[2], S[1]],
      'text': {'l1': 'USERS TAP THE', 'l2': '<span class="acc">WRONG</span> BUTTON'}, 'images': scene('670')}))

# ===== 05 · T06 What users say ≠ what they do (sticky notes) =====
v = photo('757', 700, 380, 260)
D.append(('05-say-vs-do', f"""
.t{{--ground:#10201b;--fg:#F4F0E6;--accent:#F26A2E;{vars_css(v)}}}
.hd{{left:40px;top:20px;font-size:170px;color:var(--fg);white-space:nowrap}}
.n1{{left:50px;top:250px;--s:270px;transform:rotate(-6deg);font-size:46px}}
.n2{{left:960px;top:300px;--s:270px;transform:rotate(5deg);font-size:46px}}
.l1{{left:60px;top:540px;font-size:34px;color:var(--chalk);transform:rotate(-6deg)}} .l2{{left:372px;top:620px;font-size:34px;color:var(--chalk);transform:rotate(5deg)}}
""", f"""
{PH}{VIG}{FRONT}
<div class="abs grot hd z3 shadow" data-move="headline" data-k="hd"></div>
<div class="note n1 z3" data-move="note-say" data-k="say"></div>
<div class="note o n2 z3" data-move="note-do" data-k="do"></div>
""", {'direction': 'The film\'s say vs do board on her real photo: SAY ≠ DO in big type, a canary note with what users tell you ("I always use search") and an orange note with what they actually do ("taps the menu"), her knowing chin-on-hand smile. Follows the before/after splits on her board and viral sample 3.',
      'concept': 'T06', 'thumbnail_text': 'SAY ≠ DO',
      'titles': [C[1], S[3]],
      'text': {'hd': 'SAY <span style="color:#E3342A">≠</span> DO', 'say': '&ldquo;I always use search.&rdquo;', 'do': 'Taps the menu. Every time.'}, 'images': scene('757')}))

# ===== 06 · T01 UX research, huge behind her head =====
v = photo('628', 640, 430, 250)
D.append(('06-ux-research-explained', f"""
.t{{--ground:#10201b;--fg:#F4F0E6;--accent:#F26A2E;--bgb:.6;{vars_css(v)}}}
.w1{{left:-6px;right:-6px;top:84px;text-align:center;font-size:262px;color:var(--fg);white-space:nowrap}}
.w2{{left:0;right:0;top:612px;text-align:center;font-size:96px;color:var(--fg);text-shadow:0 3px 24px rgba(0,0,0,.6)}}
""", f"""
{PH}{VIG}
<div class="abs anton w1 z1" data-k="l1"></div>
{FRONT}
<div class="abs serif w2 z3" data-k="l2"></div>
""", {'direction': 'Viral sample 1 ("FINANCIAL LITERACY"): the topic full width, huge, partly behind her head; her direct look in her room, background darkened; one elegant serif line across her chest (her collage samples). Also Aliena Cai\'s "UX UI" outlier (285K, 17x).',
      'concept': 'T01', 'thumbnail_text': 'UX RESEARCH, explained simply',
      'titles': ["What Is UX Research? Explained From Scratch", S[2]],
      'text': {'l1': 'UX RESEARCH', 'l2': '<i>explained simply</i>'}, 'images': scene('628')}))

# ===== 07 · T04 A week in UX research (notes on her wall) =====
v = photo('586', 960, 380, 260)
D.append(('07-inside-ux-research', f"""
.t{{--ground:#10201b;--fg:#F4F0E6;--accent:#FFE15A;{vars_css(v)}}}
.big{{left:40px;top:34px;--s:390px;transform:rotate(-3deg);font-size:58px;line-height:1.02;background:var(--accent)}}
.s1{{display:none}}
.s2{{left:80px;top:470px;--s:210px;transform:rotate(4deg);font-size:31px}}
.s3{{left:330px;top:450px;--s:210px;transform:rotate(-5deg);font-size:32px}}
""", f"""
{PH}{VIG}{FRONT}
<div class="note big z3" data-move="note" data-k="note"></div>
<div class="note o s1 z3" data-move="note-1" data-k="n1"></div>
<div class="note s2 z3" data-move="note-2" data-k="n2"></div>
<div class="note o s3 z3" data-move="note-3" data-k="n3"></div>
""", {'direction': 'Sticky notes on the wall of her real room (the film\'s research wall, made literal): one big canary note names the topic, two small notes name the work she describes (interview users, find patterns). Her smile on the right. Follows viral sample 3 (work drawn as sticky notes).',
      'concept': 'T04', 'thumbnail_text': 'WHAT UX RESEARCHERS DO',
      'titles': [S[7], "A Week in UX Research: Plan, Interview, Find Patterns"],
      'text': {'note': 'What UX researchers do', 'n1': '', 'n2': 'Interview users', 'n3': 'Find patterns'}, 'images': scene('586')}))

# ===== 08 · T05 Which one are you? (badges in her fingers) =====
v = photo('409', 640, 300, 230)
l = at('409', 985, 815, v); r = at('409', 1995, 800, v)
D.append(('08-which-one', f"""
.t{{--ground:#10201b;--fg:#F4F0E6;--accent:#FFE15A;{vars_css(v)}}}
.hd{{left:0;right:0;top:18px;text-align:center;font-size:100px;color:var(--fg)}}
.badge2{{width:330px;padding:38px 20px 26px}} .badge2 .av{{display:none}}
.badge2 .k{{font-family:'Grot';font-weight:900;font-size:40px;color:#8b8172;letter-spacing:-.02em}}
.badge2 .r{{font-size:40px;margin-top:2px}}
.b1{{left:{l[0] - 230:.0f}px;top:{l[1] + 40:.0f}px;transform:rotate(-5deg);--strap:40px}}
.b2{{left:{r[0] - 90:.0f}px;top:{r[1] + 40:.0f}px;transform:rotate(5deg);--strap:40px;--sc:#1D3A32}}
""", f"""
{PH}{VIG}
<div class="abs grot hd z1 shadow" data-k="hd"></div>
{FRONT}
<div class="badge2 b1 z3" data-move="badge-1"><div class="k" data-k="k1"></div><div class="r" data-k="b1"></div></div>
<div class="badge2 b2 z3" data-move="badge-2"><div class="k" data-k="k2"></div><div class="r" data-k="b2"></div></div>
""", {'direction': 'The two jobs people mix up, as two big lanyard badges held up in her pinched fingers (RESEARCHER / DESIGNER), and a question that pulls the viewer in. Follows props-as-the-topic on her Pinterest board.',
      'concept': 'T05', 'thumbnail_text': 'WHICH ONE ARE YOU?',
      'titles': ["UX Researcher or UX Designer: Which Job Fits You?", S[8], "UX Researcher or UX Designer? Here's the Real Difference"],
      'text': {'hd': 'WHICH ONE ARE YOU?', 'k1': 'UX', 'b1': 'RESEARCHER', 'k2': 'UX', 'b2': 'DESIGNER'}, 'images': scene('409')}))

# ===== 10 · T08 Three types (index cards on her photo) =====
v = photo('628', 1000, 380, 250)
cards = ''.join(f'<div class="icard tc z3" data-move="card-{i + 1}" style="left:{x}px;top:{y}px;transform:rotate({r}deg);--head:200px"><div class="grot" data-k="c{i + 1}" style="font-size:{fs}px;line-height:1;padding-top:14px"></div></div>'
                for i, (x, y, r, fs) in enumerate([(40, 330, -5, 50), (290, 380, 3, 50), (540, 330, 6, 50)]))
D.append(('10-three-types', f"""
.t{{--ground:#10201b;--fg:#F4F0E6;--accent:#F26A2E;{vars_css(v)}}}
.tc{{width:250px;height:260px;text-align:center}} .tc .grot span{{color:#9b927f}}
.hd{{left:40px;top:24px;color:var(--fg)}} .hd div{{white-space:nowrap}} .a{{font-size:150px}} .b{{font-size:72px;margin-top:4px}}
""", f"""
{PH}{VIG}{FRONT}
<div class="abs grot hd z3 shadow" data-move="headline"><div class="a" data-k="l1"></div><div class="b" data-k="l2"></div></div>
{cards}
""", {'direction': 'Three index cards pinned over her real photo, one pair each in plain words (BEFORE vs AFTER: generative/evaluative; WHY vs HOW MANY: qualitative/quantitative; SAY vs DO: attitudinal/behavioural); the count in big type; her direct look on the right. Follows props-as-the-topic and viral sample 9 (the things themselves).',
      'concept': 'T08', 'thumbnail_text': '3 TYPES OF UX RESEARCH',
      'titles': ["3 Types of UX Research, Explained Simply", S[6]],
      'text': {'l1': '3 TYPES', 'l2': 'OF <span class="acc">UX RESEARCH</span>', 'c1': 'BEFORE<br><span>vs</span> AFTER', 'c2': 'WHY<br><span>vs</span> HOW MANY', 'c3': 'SAY<br><span>vs</span> DO'}, 'images': scene('628')}))

# ===== 11 · T09 Seven ways (collage over the creator) =====
v = photo('41.5', 700, 300, 240)
D.append(('11-seven-ways', f"""
.t{{--ground:#10201b;--fg:#FFFDF6;--accent:#F26A2E;--bgb:.75;{vars_css(v)}}}
.ln{{left:0;right:0;top:450px;text-align:center;color:var(--fg);text-shadow:0 4px 26px rgba(0,0,0,.6);white-space:nowrap;font-family:'Young';font-size:96px;letter-spacing:-.03em}}
.ln b{{font-family:'Grot';font-weight:900;color:var(--accent);font-size:150px;vertical-align:-14px;margin-right:12px}}
.n1{{left:70px;top:70px;--s:190px;transform:rotate(-7deg);font-size:34px}}
.n2{{left:1010px;top:60px;--s:190px;transform:rotate(6deg);font-size:34px}}
.n3{{left:1030px;top:290px;--s:190px;transform:rotate(-4deg);font-size:34px}}
""", f"""
{PH}{FRONT}
<div class="note n1 z3" data-move="note-1" data-k="m1"></div>
<div class="note o n2 z3" data-move="note-2" data-k="m2"></div>
<div class="note n3 z3" data-move="note-3" data-k="m3"></div>
<div class="abs ln z4" data-k="line"></div>
""", {'direction': 'Collage over the creator (her viral-samples/collage): her full natural photo, lightly blurred room, three sticky notes floating round her naming methods she covers, one big line across her chest with a heavy orange 7.',
      'concept': 'T09', 'thumbnail_text': '7 ways to study users',
      'titles': [S[5], "7 Ways to Study Your Users (UX Research for Beginners)"],
      'text': {'line': '<b>7</b>ways to study users', 'm1': 'Interviews', 'm2': 'Surveys', 'm3': 'A/B tests'}, 'images': scene('41.5')}))

# ===== 12 · T10 Five users, zero budget =====
v = photo('757', 330, 420, 330)
ini = [('#2F5A4C', 'A'), ('#EDE9E2', 'K'), ('#2F5A4C', 'M'), ('#EDE9E2', 'T'), ('#2F5A4C', 'S')]
tiles = ''.join(f'<div class="vt" style="background:{c}"><span>{n}</span></div>' for c, n in ini) + '<div class="vt you"><span>you</span></div>'
D.append(('12-five-users-zero', f"""
.t{{--ground:#10201b;--fg:#F4F0E6;--accent:#FFE15A;{vars_css(v)}}}
.lap{{left:640px;top:250px;width:560px;transform:rotate(2deg)}}
.lap .sc{{background:#141518;border-radius:20px 20px 0 0;padding:14px;height:330px}}
.lap .grid{{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;height:100%}}
.vt{{position:relative;border-radius:10px;display:flex;align-items:center;justify-content:center}}
.vt span{{width:84px;height:84px;border-radius:50%;background:#FFE15A;display:flex;align-items:center;justify-content:center;font-family:'Marker';font-size:44px;color:#17140F}}
.vt.you{{background:#2a2c31}} .vt.you span{{background:none;color:#9aa;font-size:22px;font-family:'DM Mono';font-weight:500;text-transform:uppercase}}
.lap .base{{height:22px;background:#c9ccd1;border-radius:0 0 22px 22px;margin:0 -34px}}
.lap .ill{{position:absolute;left:4px;top:-22px;color:rgba(244,240,230,.55)}}
.hd{{left:0;right:0;top:20px;text-align:center;color:var(--fg);font-size:170px;white-space:nowrap}}
""", f"""
{PH}{VIG}{FRONT}
<div class="abs grot hd z3 shadow" data-move="headline" data-k="hd"></div>
<div class="abs lap z3" data-move="laptop"><div class="sc"><div class="grid" style="height:calc(100% - 50px)">{tiles}</div><div class="callbar"><i></i><i></i><i class="end"></i></div></div><div class="base"></div></div>
""", {'direction': 'Research anyone can do this week: one line, 5 USERS. $0., across the top; a laptop on a video call with five people (initials, no stock faces; Illustration); her chin-on-hand knowing look, big, on the left. Follows the laptop thumbnails on her YouTube board.',
      'concept': 'T10', 'thumbnail_text': '5 USERS. $0.',
      'titles': [C[4], "No Budget for UX Research? Talk to 5 Users First"],
      'text': {'hd': '5 USERS. <span class="acc">$0.</span>'}, 'images': scene('757')}))

# ===== 13 · T12 Sketch first, build later (flat paper) =====
D.append(('13-sketch-first', f"""
.t{{--ground:#EDE9E2;--fg:#17140F;--accent:#F26A2E}}
.sk{{left:70px;top:270px;width:330px;height:400px;transform:rotate(-5deg);--head:0px;padding:30px}}
.sk svg{{width:100%;height:100%}}
.sk svg *{{fill:none;stroke:#3a3a3a;stroke-width:4;stroke-linecap:round;stroke-linejoin:round}}
.h1{{left:40px;top:24px;font-size:116px;color:var(--fg)}} .h2{{left:40px;top:128px;font-size:116px;color:var(--accent)}}
.c1{{left:430px;top:330px;font-size:64px;color:#1F9D55;transform:rotate(-8deg);line-height:1}}
.c2{{left:470px;top:520px;font-size:64px;color:#E3342A;transform:rotate(-4deg);line-height:1}}
""", f"""
<div class="abs grot h1 z1" data-k="l1"></div><div class="abs grot h2 z1" data-k="l2"></div>
<div class="icard sk z2" data-move="sketch"><svg viewBox="0 0 320 380"><rect x="40" y="10" width="240" height="360" rx="26"/><path d="M70 60 L200 60 M70 84 L150 84"/><rect x="70" y="110" width="180" height="90" rx="14"/><path d="M70 230 L250 230 M70 260 L210 260 M70 290 L230 290"/><rect x="70" y="320" width="180" height="34" rx="10"/></svg></div>
<div class="abs marker c1 z3" data-k="m1"></div>
<div class="abs marker c2 z3" data-k="m2"></div>
{svg(list(arrow(420, 370, 360, 420, .3, 26)) + list(arrow(740, 545, 830, 480, -.3, 26)), 'arrows', color='#3a3a3a', width=6)}
{phone('checkout', 'left:830px;top:220px;transform:rotate(4deg) scale(.72);transform-origin:0 0')}
""", {'direction': 'Flat warm-paper option (no photo). Left: a pencil wireframe on an index card, "a day" in green marker. Right: the finished app on a phone (Illustration), "months" in red. The money reason for testing early, in two objects. Follows the before/after splits on her board.',
      'concept': 'T12', 'thumbnail_text': 'SKETCH FIRST. BUILD LATER.',
      'titles': [C[6], "Test Your App Idea Before You Build It (UX Research)"],
      'text': {'l1': 'SKETCH FIRST.', 'l2': 'BUILD LATER.', 'm1': 'cheap to<br>change', 'm2': 'costly to<br>change'}}))

# ===== 14 · T13 Iceberg: UI is not UX (flat) =====
ppl = ''.join(f'<div class="pp" style="left:{x}px;top:{y}px"><i></i><b></b></div>' for x, y in [(470, 450), (570, 500), (680, 450), (780, 520), (870, 460), (610, 590), (730, 610)])
D.append(('14-ui-is-not-ux-iceberg', """
.t{--ground:#EDE9E2;--fg:#17140F;--accent:#F26A2E}
.sea{position:absolute;left:0;right:0;top:300px;bottom:0;background:#1D3A32}
.wl{position:absolute;left:0;right:0;top:296px;height:8px;background:#5E9C88}
.hd{left:40px;top:24px;font-size:160px;color:var(--fg);white-space:nowrap}
.tip{left:600px;top:206px;width:170px;height:54px;border-radius:14px;background:#17140F;color:#fff;font:800 24px 'Archivo';display:flex;align-items:center;justify-content:center}
.tip2{left:560px;top:268px;width:250px;height:22px;border-radius:6px;background:#F26A2E}
.pp{position:absolute}
.pp i{position:absolute;left:0;top:0;width:40px;height:40px;border-radius:50%;background:#1D3A32}
.pp b{position:absolute;left:-14px;top:44px;width:68px;height:46px;border-radius:34px 34px 8px 8px;background:#1D3A32}
.lab1{left:860px;top:190px;font-size:110px;color:#17140F} .lab2{left:980px;top:430px;font-size:130px;color:#F4F0E6}
""", f"""
<div class="sea"></div>
<div class="abs grot hd z1" data-k="hd"></div>
<div class="ice z1"><svg width="1280" height="720" style="position:absolute;left:0;top:0"><path d="M545 300 L610 185 L690 160 L770 195 L825 300 Z" fill="#FFFDF6"/><path d="M360 300 L840 300 L960 420 L930 580 L820 720 L420 720 L330 560 Z" fill="#CFE0DA"/></svg></div>
<div class="wl z1"></div>
<div class="abs tip z2" data-k="tip"></div><div class="abs tip2 z2"></div>
<div class="z2">{ppl}</div>
<div class="abs marker lab1 z2" data-k="a"></div><div class="abs marker lab2 z2" data-k="b"></div>
""", {'direction': 'Faceless flat option: a drawn iceberg on warm paper and the research-wall green sea. Above the water, one button (UI). Below, a much bigger mass full of people (UX). Big marker labels. Follows sample 9 and the flat-colour options she said are welcome.',
      'concept': 'T13', 'thumbnail_text': 'UI IS NOT UX',
      'titles': ["UI vs UX: The Experience Is Bigger Than the Screen", S[4]],
      'text': {'hd': 'UI IS <span class="acc">NOT</span> UX', 'tip': 'Buy now', 'a': 'UI', 'b': 'UX'}}))

# ===== 15 · T14 No jargon =====
v = photo('41.5', 930, 480, 240)
D.append(('15-no-jargon', f"""
.t{{--ground:#10201b;--fg:#F4F0E6;--accent:#F26A2E;{vars_css(v)}}}
.book{{left:80px;top:270px;width:340px;height:400px;background:#1D3A32;color:#F4F0E6;border-radius:6px 16px 16px 6px;padding:40px 30px;transform:rotate(-8deg);
      box-shadow:14px 14px 0 #e9e2d2, 16px 16px 0 #cfc6b4, 0 30px 60px rgba(0,0,0,.5)}}
.book .w{{font-family:'Play';font-weight:800;font-size:40px;line-height:1.3;position:relative}}
.book .w s{{text-decoration:line-through;text-decoration-color:#F26A2E;text-decoration-thickness:7px}}
.book .ill{{position:absolute;left:30px;bottom:18px;color:rgba(244,240,230,.6)}}
.hd{{left:40px;top:28px;color:var(--fg)}} .hd div{{white-space:nowrap}} .a{{font-size:100px}} .b{{font-size:150px;color:var(--accent);margin-top:2px}}
""", f"""
{PH}{VIG}{FRONT}
<div class="abs grot hd z3 shadow" data-move="headline"><div class="a" data-k="l1"></div><div class="b" data-k="l2"></div></div>
<div class="abs book z3" data-move="book"><div class="w" data-k="jargon"></div></div>
""", {'direction': 'A thick textbook (Illustration) with every jargon word struck through in orange marker, her look to camera; UX RESEARCH named, NO JARGON big in orange. Beginners fear the jargon; the video explains it from scratch. Follows viral sample 1 (big words) plus a prop.',
      'concept': 'T14', 'thumbnail_text': 'UX RESEARCH, NO JARGON',
      'titles': ["UX Research Explained Simply (No Jargon, Just Examples)", S[2]],
      'text': {'l1': 'UX RESEARCH,', 'l2': 'NO JARGON', 'jargon': '<s>Triangulation</s><br><s>Heuristics</s><br><s>Ethnography</s><br><s>Synthesis</s>'}, 'images': scene('41.5')}))

# ===== 16 · T16 Nobody tested this app =====
v = photo('686.5', 940, 380, 270)
D.append(('16-nobody-tested', f"""
.t{{--ground:#10201b;--fg:#F4F0E6;--accent:#F26A2E;{vars_css(v)}}}
.hd{{left:40px;top:24px;color:var(--fg)}} .hd div{{white-space:nowrap;font-size:104px}}
""", f"""
{PH}{VIG}{FRONT}
<div class="abs grot hd z3 shadow" data-move="headline"><div data-k="l1"></div><div data-k="l2"></div></div>
{phone('messy', 'left:80px;top:230px;transform:rotate(-6deg) scale(.9);transform-origin:0 0')}
""", {'direction': 'A shared frustration: a checkout buried under pop-up over pop-up (rate us, notifications, cookies; Illustration), and her knowing, unimpressed look with a hand at her temple. One accent: the word APP in her headband orange.',
      'concept': 'T16', 'thumbnail_text': 'NOBODY TESTED THIS APP',
      'titles': ["What Is UX Research? The Step Bad Apps Skip", C[2]],
      'text': {'l1': 'NOBODY TESTED', 'l2': 'THIS <span class="acc">APP</span>'}, 'images': scene('686.5')}))

# ===== 18 · T19 Why apps confuse you =====
v = photo('740.5', 860, 440, 250)
D.append(('18-why-apps-confuse-you', f"""
.t{{--ground:#10201b;--fg:#F4F0E6;--accent:#F26A2E;{vars_css(v)}}}
.hd{{left:40px;top:28px;color:var(--fg)}} .hd div{{white-space:nowrap}} .a{{font-size:96px}} .b{{font-size:128px}}
.app .tg{{font-size:24px;padding:16px 0}} .app .tg i{{width:52px;height:28px;border-radius:14px}}
""", f"""
{PH}{VIG}{FRONT}
<div class="abs grot hd z3 shadow" data-move="headline"><div class="a" data-k="l1"></div><div class="b" data-k="l2"></div></div>
{phone('settings', 'left:70px;top:260px;transform:rotate(-7deg) scale(.86);transform-origin:0 0')}
""", {'direction': 'Her hand on her head, looking away, next to a settings page full of vague toggles (Illustration). Cream headline, orange only on CONFUSE. A reaction and a screen everyone recognises (her reading-stack edit: big expressive face).',
      'concept': 'T19', 'thumbnail_text': 'WHY APPS CONFUSE YOU',
      'titles': ["Why Some Apps Are So Confusing (UX Research Explained)", "What Is UX Research? Why Some Apps Are So Confusing", C[2]],
      'text': {'l1': 'WHY APPS', 'l2': '<span class="acc">CONFUSE</span> YOU'}, 'images': scene('740.5')}))

# ===== 19 · T20 Zero years? (job ad clipping) =====
v = photo('601', 930, 360, 290)
D.append(('19-zero-years', f"""
.t{{--ground:#10201b;--fg:#F4F0E6;--accent:#FFE15A;{vars_css(v)}}}
.ad{{left:20px;top:80px;width:480px;padding:28px 32px 24px;background:#FBF8F0;transform:rotate(-4deg);box-shadow:0 20px 50px rgba(0,0,0,.5);color:#17140F}}
.ad .k{{font-family:'DM Mono';font-weight:500;font-size:20px;letter-spacing:.2em;text-transform:uppercase;color:#6b665c}}
.ad .r{{font-family:'Play';font-weight:900;font-size:66px;line-height:1;margin:10px 0 14px}}
.ad mark{{background:var(--accent);padding:0 .08em;box-decoration-break:clone;-webkit-box-decoration-break:clone}}
.ad .req{{font-family:'Play';font-weight:700;font-size:40px;color:#3a352c}}
.ad .req s{{text-decoration:line-through;text-decoration-color:#E3342A;text-decoration-thickness:7px}}
.ad .yrs{{white-space:nowrap;font-family:'Marker';font-size:104px;color:#E3342A;line-height:1;margin-top:8px;transform:rotate(-5deg)}}
.ad .ill{{margin-top:8px}}
""", f"""
{PH}{VIG}{FRONT}
<div class="abs ad z3" data-move="job-ad"><div class="k" data-k="k"></div><div class="r" data-k="role"></div><div class="req" data-k="req"></div><div class="yrs" data-k="yrs"></div></div>
""", {'direction': 'Her favourite ghana-marrify edit (10b): a newspaper job-ad clipping (generic, no company, Illustration), UX Researcher highlighted in yellow, "3+ years" struck through and "0 years?" written under it in red marker, all on the card; her hands-at-face look stays clear.',
      'concept': 'T20', 'thumbnail_text': '0 YEARS?',
      'titles': [S[9], "How to Get Into UX Research With No Experience"],
      'text': {'k': 'Now hiring', 'role': '<mark>UX Researcher</mark>', 'req': '<s>3+ years</s> experience', 'yrs': '0 years?'}, 'images': scene('601')}))

# ===== 20 · T21 Don't just ask users. Watch them. (notes in her fingers) =====
v = photo('337', 640, 330, 240)
l = at('337', 842, 851, v); r = at('337', 1780, 929, v)
D.append(('20-dont-just-ask-watch', f"""
.t{{--ground:#10201b;--fg:#F4F0E6;--accent:#F26A2E;{vars_css(v)}}}
.n1{{left:{l[0] - 300:.0f}px;top:{l[1] - 250:.0f}px;--s:300px;transform:rotate(-7deg);font-size:54px}}
.n2{{left:{r[0] - 10:.0f}px;top:{r[1] - 270:.0f}px;--s:300px;transform:rotate(6deg);font-size:62px}}
.top{{left:0;right:0;top:4px;text-align:center;font-size:100px;color:var(--fg);font-family:'Serif';font-weight:400;letter-spacing:-.01em}}
""", f"""
{PH}{VIG}
<div class="note n1 z1" data-move="note-ask" data-k="a"></div>
<div class="note o n2 z1" data-move="note-watch" data-k="b"></div>
{FRONT}
<div class="abs grot top z3 shadow" data-k="top"></div>
""", {'direction': 'Two sticky notes held in her pinched fingers, the film\'s sticky-note language in her real room: canary "Don\'t just ask users." and orange "Watch them.", with UX RESEARCH named above her head.',
      'concept': 'T21', 'thumbnail_text': "UX RESEARCH: DON'T JUST ASK USERS. WATCH THEM.",
      'titles': [S[3], C[1]],
      'text': {'top': 'UX RESEARCH', 'a': "Don't just ask users.", 'b': 'Watch them.'}, 'images': scene('337')}))

# ===== 21 · T22 Said vs did (faceless, warm paper) =====
L_, T_, s_ = 820, 200, .78
p = ph_at(L_, T_, s_, 139, 546)
D.append(('21-said-vs-did', f"""
.t{{--ground:#EDE9E2;--fg:#17140F;--accent:#E3342A}}
.hd{{left:40px;top:26px;font-size:140px;color:var(--fg);white-space:nowrap}}
.qc{{left:60px;top:280px;width:470px;height:300px;transform:rotate(-4deg);--head:0px;--lh:50px;display:flex;align-items:center;justify-content:center}}
.qc .q{{font-family:'Marker';font-size:86px;line-height:1}}
.tt{{position:absolute;font-family:'Marker';color:var(--accent);font-size:66px;white-space:nowrap;line-height:1}}
""", f"""
<div class="abs grot hd z1" data-move="headline" data-k="hd"></div>
<div class="icard qc z2" data-move="quote"><div class="q" data-k="q"></div></div>
{phone('tiny', f'left:{L_}px;top:{T_}px;transform:scale({s_});transform-origin:0 0')}
{svg([loop(p[0] - 70, p[1] - 30, 120, 50, 3), loop(p[0] - 60, p[1] - 24, 110, 44, 6)], 'scribble', width=7, z=4)}
<div class="tt z4" style="left:330px;top:300px;transform:rotate(-8deg);font-size:58px" data-k="t1"></div>
""", {'direction': 'Faceless flat option on warm paper: an index card with what the user said ("It\'s easy!") and, beside it, the checkout (Illustration) where they could not find the pay button: red scribble rings round it and "where?!" in red marker. Same idea as 05 for a faceless test or a carousel cover. Follows viral sample 2.',
      'concept': 'T22', 'thumbnail_text': 'USERS SAID vs DID',
      'titles': [C[1], S[3]],
      'text': {'hd': 'SAID <span class="acc">≠</span> DID', 'q': '&ldquo;It\'s easy!&rdquo;', 't1': 'where&rsquo;s pay?!'}}))

# ===== 22 · Collage over the creator: UX research for beginners =====
v = photo('586', 640, 300, 250)
D.append(('22-what-is-ux-research-collage', f"""
.t{{--ground:#10201b;--fg:#FFFDF6;--accent:#F26A2E;--bgb:.8;{vars_css(v)}}}
.band{{left:0;right:0;top:500px;height:150px;background:rgba(0,0,0,.3)}}
.ln{{left:0;right:0;top:490px;text-align:center;font-size:120px;color:var(--fg);text-shadow:0 3px 8px rgba(0,0,0,.6), 0 4px 30px rgba(0,0,0,.7);white-space:nowrap}}
.lb{{font-family:'Serif';font-style:italic;font-size:40px;color:#fff;text-shadow:0 2px 10px rgba(0,0,0,.8);white-space:nowrap}}
.n1{{left:80px;top:80px;--s:190px;transform:rotate(-8deg);font-size:32px}}
.n2{{left:1010px;top:250px;--s:190px;transform:rotate(7deg);font-size:30px}}
.ic{{left:960px;top:40px;width:260px;height:160px;transform:rotate(4deg);--head:70px;--lh:30px;padding:10px 20px}}
.ic .g{{font-size:62px}}
""", f"""
{PH}{FRONT}
<div class="note n1 z3" data-move="note-1" data-k="n1"></div>
<div class="note o n2 z3" data-move="note-2" data-k="n2"></div>
<div class="icard ic z3" data-move="card"><div class="grot g" data-k="card"></div></div>
<div class="abs serif ln z4" data-k="line"></div>
<div class="abs lb z4" style="left:310px;top:150px" data-k="s1"></div>
<div class="abs lb z4" style="left:90px;top:330px" data-k="s2"></div>
""", {'direction': 'Her collage style (viral-samples/collage: "Capsule wardrobe", "Time to lock in."): full natural photo of her in her room, bright, small objects of the topic floating around her (two sticky notes with the two questions research asks, an index card UI ≠ UX), one big elegant serif line across her chest, two small italic labels.',
      'concept': 'Collage over the creator (her 2026-10-07 style)', 'thumbnail_text': 'UX research, in plain words',
      'titles': ["UX Research for Beginners: What It Is and How It Works", S[2]],
      'text': {'line': 'UX research, <i>in plain words</i>', 'n1': 'Who is it for?', 'n2': 'What do they need?', 'card': 'UI ≠ UX', 's1': 'say vs do', 's2': 'how to get in'}, 'images': scene('586')}))

# ===== 23 · Research wall (left) + her photo (right): UI vs UX =====
v = photo('653.5', 330, 380, 270, bx=660, bw=620)
D.append(('23-wall-ui-vs-ux', f"""
.t{{--ground:#1D3A32;--fg:#F4F0E6;--accent:#F26A2E;--bgb:.62;{vars_css(v)}}}
.c1{{left:40px;top:40px;width:300px;height:190px;transform:rotate(-3deg);--head:150px}}
.c2{{left:370px;top:50px;width:300px;height:190px;transform:rotate(3deg);--head:150px}}
.c1 .g,.c2 .g{{font-size:140px}}
.n{{--s:220px;font-size:38px}}
.front{{left:0;width:1280px}} .front img{{left:calc(var(--px) + 660px)}}
""", f"""
{PH}{FRONT}
<div class="icard c1 z2" data-move="card-ui"><div class="grot g" data-k="a"></div></div>
<div class="icard c2 z2" data-move="card-ux"><div class="grot g" data-k="b"></div></div>
<div class="note n z2" data-move="note-1" style="left:60px;top:310px;transform:rotate(-4deg)" data-k="u1"></div>

<div class="note o n z2" data-move="note-3" style="left:400px;top:300px;transform:rotate(3deg)" data-k="x1"></div>
{svg(list(arrow(300, 420, 380, 420, -.4, 22)) + [loop(390, 300, 230, 220, 5)], 'marks', color='#F4F0E6', width=7, z=3)}
""", {'direction': 'Half research wall, half her: the film\'s green wall on the left with two index cards (UI, UX), canary notes under UI (what you see) and orange notes under UX (how it feels); her real photo on the right, worried eyebrows-up look.',
      'concept': 'T02 variant in the film look', 'thumbnail_text': 'UI / UX on the research wall',
      'titles': ["UI vs UX Explained: What Users See vs How It Feels", S[4]],
      'text': {'a': 'UI', 'b': 'UX', 'u1': 'The button', 'x1': 'Can they find it?'},
      'images': scene('653.5')}))

for name, css, body, content in D:
    if ONLY and not any(name.startswith(o) for o in ONLY): continue
    write(name, css, body, content); print('wrote', name)
