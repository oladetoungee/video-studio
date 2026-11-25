"""phone-distraction thumbnails (2026-10-13): one direction per concept of the social strategist (kit/refined-kit.md section 3,
TH01-TH22) plus two extras (a collage over her photo, and a flat lock screen in the film's look).
RULE 0 / RULE 1 (THUMBNAILS.md): the topic in plain words + a literal picture of it; never a phrase from her script.
  python3 tools/gen.py                 -> every direction
  python3 tools/gen.py 03 07           -> only these prefixes
  python3 tools/gen.py 07 --reset      -> also overwrite content.json text/images/vars (otherwise her studio edits win)
index.html is always rewritten; content.json keeps her studio edits (text, images, vars, nudge, class). Then: node render.mjs
Her photo: warmed copies of 4K frames (assets/scene/warm/, tools/warm.py: colour balance only, never flipped or retouched)
+ the same frame's person mask (assets/scene/warm/mask/) so words can sit behind her head.
Every phone screen is a GENERIC drawing labelled ILLUSTRATION (no real app, logo or interface)."""
import json, os, sys, math
T = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RESET = '--reset' in sys.argv
ONLY = [a for a in sys.argv[1:] if not a.startswith('--')]
FACES = {}
for l in open(os.path.join(T, 'tools', 'faces.txt')):
    f, x, y, w = l.split(); FACES[f[2:-4]] = (float(x), float(y), float(w))
SCORES = json.load(open(os.path.join(T, 'tools', 'scores.json'))) if os.path.exists(os.path.join(T, 'tools', 'scores.json')) else {}

def frame(f, cx, cy, fw, W=1280, H=720):
    """photo vars: face centre at (cx, cy), face width fw px; the photo always covers the frame"""
    x, y, w = FACES[f]
    pw = max(fw / w, W, H * 16 / 9); ph = pw * 9 / 16
    px = cx - (x + w / 2) * pw; py = cy - (y * ph + w * pw / 2)
    px = min(0, max(W - pw, px)); py = min(0, max(H - ph, py))
    return f'--px:{px:.0f}px;--py:{py:.0f}px;--pw:{pw:.0f}px'
def scene(f, **more): return {'scene': f'../../assets/scene/warm/s_{f}.jpg', 'front': f'../../assets/scene/warm/mask/s_{f}.png', **more}
PH = '<div class="photo" data-move="photo"><img data-img="scene" alt=""><div class="dim"></div></div>'
FRONT = '<div class="front"><img data-img="front" alt=""></div>'

# ---------- generic glyphs (flat, drawn here; not any app's icon) ----------
G = {
 'heart': '<path d="M12 21s-7.5-4.6-9.5-9.2C1 8.2 3.4 4.5 7 4.5c2.1 0 3.6 1.1 5 3 1.4-1.9 2.9-3 5-3 3.6 0 6 3.7 4.5 7.3C19.5 16.4 12 21 12 21z" fill="currentColor"/>',
 'heartO': '<path d="M12 21s-7.5-4.6-9.5-9.2C1 8.2 3.4 4.5 7 4.5c2.1 0 3.6 1.1 5 3 1.4-1.9 2.9-3 5-3 3.6 0 6 3.7 4.5 7.3C19.5 16.4 12 21 12 21z" fill="none" stroke="currentColor" stroke-width="2"/>',
 'chat': '<path d="M4 5h16v11H9l-5 4z" fill="currentColor"/>',
 'chatO': '<path d="M4 5h16v11H9l-5 4z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>',
 'cam': '<rect x="3" y="7" width="18" height="13" rx="3" fill="none" stroke="currentColor" stroke-width="2.2"/><circle cx="12" cy="13.5" r="3.6" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M8 7l1.5-3h5L16 7" fill="none" stroke="currentColor" stroke-width="2.2"/>',
 'play': '<path d="M7 4l13 8-13 8z" fill="currentColor"/>',
 'bell': '<path d="M6 17V11a6 6 0 0 1 12 0v6l2 2H4z M10 21h4" fill="currentColor"/>',
 'mail': '<rect x="3" y="6" width="18" height="13" rx="2" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M3 7l9 7 9-7" fill="none" stroke="currentColor" stroke-width="2.2"/>',
 'bag': '<path d="M5 8h14l-1 13H6z M9 8a3 3 0 0 1 6 0" fill="none" stroke="currentColor" stroke-width="2.2"/>',
 'note': '<path d="M9 18V5l11-2v13" fill="none" stroke="currentColor" stroke-width="2.2"/><circle cx="6.5" cy="18" r="2.5" fill="currentColor"/><circle cx="17.5" cy="16" r="2.5" fill="currentColor"/>',
 'pin': '<path d="M12 22s7-7.5 7-13a7 7 0 0 0-14 0c0 5.5 7 13 7 13z" fill="none" stroke="currentColor" stroke-width="2.2"/><circle cx="12" cy="9" r="2.5" fill="currentColor"/>',
 'share': '<path d="M4 12l16-8-6 16-3-6z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>',
 'x': '<path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/>',
}
def svg(name, size=None, color='currentColor', extra=''):
    s = f' width="{size}" height="{size}"' if size else ''
    return f'<svg viewBox="0 0 24 24"{s} style="color:{color};{extra}">{G[name]}</svg>'

def spinner(s=60, c='#F4F1EA'):
    ticks = ''.join(f'<i style="transform:rotate({k*30}deg);opacity:{0.25 + 0.75 * ((k + 1) / 12):.2f}"></i>' for k in range(12))
    return f'<div class="spin" style="--s:{s}px;--spc:{c}">{ticks}</div>'

def post(pic=True, lines=2, heart=None, extra=''):
    acts = f'<div class="acts">{svg("heartO", 26)}{svg("chatO", 26)}{svg("share", 26)}{extra}</div>'
    return (f'<div class="post"><div class="who"><i></i><b></b></div>' + ('<div class="pic"></div>' if pic else '')
            + ''.join('<div class="ln{}"></div>'.format(' s' if k == lines - 1 else '') for k in range(lines)) + acts + '</div>')

def phone(inner, x, y, s=1.0, rot=0, cls='', move='phone', z=3, ill=True, illc=None):
    il = f'' if ill else ''
    return (f'<div class="ph {cls}" data-move="{move}" style="left:{x}px;top:{y}px;transform:rotate({rot}deg) scale({s});transform-origin:0 0;z-index:{z}">'
            f'<div class="scr"><div class="isl"></div>{inner}{il}</div></div>')

def ico(glyph, bg, size, badge=None, bsize=None, x=None, y=None, move=None, k=None, z=3, ring='#0C0D10'):
    pos = f'position:absolute;left:{x}px;top:{y}px;' if x is not None else ''
    b = (f'<span class="bdg" {f"data-k={chr(34)}{k}{chr(34)} " if k else ""}style="font-size:{bsize or size * 0.3:.0f}px;right:{-size * 0.1:.0f}px;top:{-size * 0.1:.0f}px;--bdring:{ring}">{badge}</span>'
         if badge is not None else '')
    mv = f' data-move="{move}"' if move else ''
    return f'<div class="ico"{mv} style="{pos}width:{size}px;height:{size}px;--ic:{bg};z-index:{z}">{svg(glyph, None, "#fff")}{b}</div>'

# hand-drawn red pen: a loose ellipse that overshoots its start, and an arrow
def circle(cx, cy, rx, ry, rot=-8, move='circle'):
    pts = []
    for k in range(0, 41):
        a = -2.2 + k / 40 * (2 * math.pi + 0.55)
        wob = 1 + 0.05 * math.sin(a * 3 + 1)
        pts.append((rx * wob * math.cos(a), ry * wob * math.sin(a)))
    d = 'M' + ' L'.join(f'{px:.1f} {py:.1f}' for px, py in pts)
    pad = 20
    return (f'<svg class="pen" data-move="{move}" style="left:{cx - rx - pad}px;top:{cy - ry - pad}px;transform:rotate({rot}deg)" width="{2 * (rx + pad)}" height="{2 * (ry + pad)}" '
            f'viewBox="{-rx - pad} {-ry - pad} {2 * (rx + pad)} {2 * (ry + pad)}"><path d="{d}"/></svg>')
def arrow(x1, y1, x2, y2, bend=40, head=26, move='arrow', w=8):
    mx, my = (x1 + x2) / 2, (y1 + y2) / 2
    dx, dy = x2 - x1, y2 - y1; L = math.hypot(dx, dy) or 1
    cx, cy = mx - dy / L * bend, my + dx / L * bend
    a = math.atan2(y2 - cy, x2 - cx)
    h1 = (x2 - head * math.cos(a - 0.45), y2 - head * math.sin(a - 0.45)); h2 = (x2 - head * math.cos(a + 0.45), y2 - head * math.sin(a + 0.45))
    xs = [x1, x2, cx, h1[0], h2[0]]; ys = [y1, y2, cy, h1[1], h2[1]]
    X0, Y0 = min(xs) - 20, min(ys) - 20; W, H = max(xs) - X0 + 20, max(ys) - Y0 + 20
    d = f'M{x1 - X0:.0f} {y1 - Y0:.0f} Q{cx - X0:.0f} {cy - Y0:.0f} {x2 - X0:.0f} {y2 - Y0:.0f} M{h1[0] - X0:.0f} {h1[1] - Y0:.0f} L{x2 - X0:.0f} {y2 - Y0:.0f} L{h2[0] - X0:.0f} {h2[1] - Y0:.0f}'
    return f'<svg class="pen" data-move="{move}" style="left:{X0:.0f}px;top:{Y0:.0f}px;--pw2:{w}" width="{W:.0f}" height="{H:.0f}"><path d="{d}"/></svg>'

def write(name, css, body, content):
    if ONLY and not any(name.startswith(o) for o in ONLY): return
    d = os.path.join(T, 'directions', name); os.makedirs(d, exist_ok=True)
    html = ('<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../../lib/pd.css"><style>\n'
            + css.strip() + '\n</style></head><body><div class="t">\n' + body.strip()
            + '\n</div><script src="../../lib/bind.js"></script></body></html>\n')
    open(os.path.join(d, 'index.html'), 'w').write(html)
    p = os.path.join(d, 'content.json')
    content.setdefault('vars', {}); content.setdefault('images', {}); content['title'] = content['titles'][0]
    if os.path.exists(p) and not RESET:
        old = json.load(open(p))
        for k in ('text', 'images', 'vars'): content[k] = {**content.get(k, {}), **old.get(k, {})}
        for k in ('nudge', 'class'):
            if k in old: content[k] = old[k]
        if old.get('title') and old['title'] not in content['titles']: content['title'] = old['title']
    content.update(SCORES.get(name, {}))
    order = ['direction', 'concept', 'follows', 'needs_photo', 'thumbnail_text', 'title', 'titles', 'scores', 'recommended', 'text', 'images', 'vars', 'nudge', 'class']
    json.dump({k: content[k] for k in order if k in content}, open(p, 'w'), indent=2, ensure_ascii=False)
    print('wrote', name)

# ---------- titles: the strategist's (refined-kit.md section 2) + new ones written here (checked by tools/check.py) ----------
TT = {
 'S1': "Why You Can't Stop Scrolling: 5 Features Designed on Purpose",
 'S2': "Phone Addiction Isn't an Accident: The 5 Features Behind It",
 'S3': "How Apps Are Designed to Be Addictive, a Researcher Explains",
 'S4': "Why Am I Addicted to My Phone? 5 Design Tricks to Blame",
 'S6': "Attention Economy Explained: Who Pays for Free Apps?",
 'S7': "How to Stop Scrolling: Phone Settings That Actually Help",
 'S8': "Why Can't I Stop Scrolling? It Was Designed That Way",
 'C1': "Why You Check Your Phone Even When Nothing's There",
 'C2': "He Invented Pull-to-Refresh. Later He Called It Addictive",
 'C3': "Why Every Notification Badge Is Red (Facebook's Was Blue)",
 'C3b': "Why Facebook Reportedly Switched Its Notifications to Red",
 'C4': "Why I Left Instagram at 19 (and the Rule I Use Now)",
 'C5': "Europe Says Infinite Scroll May Break the Law. Here's Why",
 'C6': "Why Websites Got Rid of the \"Next Page\" Button",
 'C8': "Why You Keep Watching: Autoplay Decides for You",
 'C9': "Why You Keep Checking the Likes on Your Own Post",
 # new (2026-10-13, design agent)
 'N1': "Why Apps Feel Like Gambling: The Psychology Explained",
 'N2': "How to Use Your Phone Less (Simple Settings That Help)",
 'N3': "Pull-to-Refresh Explained: Why You Keep Pulling Down",
 'N4': "Infinite Scroll Explained: Why It Never Stops",
 'N5': "4 Phone Settings That Help You Stop Scrolling",
 'N6': "If the App Is Free, Who Pays? The Attention Economy",
 'N7': "Addictive Design Is Now a Legal Problem in Europe",
 'N8': "I Quit Instagram at 19. Here's My Rule for Social Media",
 'N9': "Why You Keep Checking Your Phone for Likes",
 'N10': "Autoplay Explained: Why the Next Video Starts on Its Own",
 'N11': "Why Notifications Are Red, and Why You Can't Ignore Them",
 'N12': "Why You Can't Put Your Phone Down at Night",
 'N13': "Why I Keep My Notifications Silenced (and You Can Too)",
 'N14': "Why You Keep Picking Up Your Phone Without Thinking",
 'N15': "Why I Keep My Phone Silent (and You Can Too)",
 'N16': "Why Your Phone Is So Hard to Put Down, Explained",
 'N17': "Instagram's Addictive Design Explained: What Europe Found",
 'N18': "Infinite Scroll Explained: Why Apps Removed the Last Page",
 'N19': "Why I Turned Off Every Notification on My Phone",
}
def ti(*ids): return [TT[i] for i in ids]

HEAD = 'position:absolute;z-index:4'


# ======================================================================================
# Round 2 (2026-10-13), after the three gates: fewer "caps + red word + mockup" layouts; words behind her head (06, 20);
# a real clipping (13) and a real quote card (16); serif / lowercase (18, 20, 21); every closed-mouth frame checked by eye.
def home(gray=False, few=False, cols3=False, no99=False):
    cols = ['#E8453C', '#2E7CF6', '#F2A93B', '#34C759', '#AF52DE', '#FF2D6F', '#1FB5C9', '#FF9500', '#5856D6', '#30B0C7', '#E8453C', '#34C759']
    if cols3: cols = ['#E8453C', '#2E7CF6', '#F2A93B', '#34C759', '#2E7CF6', '#E8453C', '#F2A93B', '#34C759', '#E8453C']
    gl = ['cam', 'chat', 'play', 'heart', 'bag', 'note', 'mail', 'bell', 'pin', 'share', 'heart', 'play']
    bd = ['12', '3', '99+', '7', None, '1', '24', '4', None, '2', '5', None]
    if no99: bd[2] = '9'
    labs = ['Photos', 'Chat', 'Video', 'Feed', 'Shop', 'Music', 'Mail', 'News', 'Maps', 'Social', 'Likes', 'Clips']
    n = (3 if few else 9) if cols3 else (4 if few else 12)
    pick = ([0, 6, 8] if cols3 else [0, 6, 8, 2]) if few else list(range(n))
    cells = ''
    for idx in pick:
        bg = '#8E8D8A' if gray else cols[idx]
        b = '' if gray or not bd[idx] else f'<span class="bdg">{bd[idx]}</span>'
        cells += f'<div><div class="ico" style="--ic:{bg}">{svg(gl[idx], None, "#fff")}{b}</div><div class="lb">{labs[idx]}</div></div>'
    return f'<div class="{"grid3" if cols3 else "grid4"}">{cells}</div>'

# 01 · TH19 "1:40 AM. AGAIN." (top 1)
write('01-1-40-am', f'''
.t{{--ground:#0C0D10;--fg:#F4F1EA;--accent:#FF4433;{frame('186.0', 1000, 320, 330)}}}
.photo{{left:620px;overflow:hidden}} .photo img{{left:calc(var(--px) - 620px)}}
.photo::after{{content:'';position:absolute;inset:0;background:rgba(10,12,20,.16)}}
.clk{{left:50px;top:40px;font-size:300px;font-weight:300}}
.am{{left:62px;top:316px;font-size:52px;font-weight:700;letter-spacing:.02em;color:var(--mut)}}
.ag{{left:50px;top:440px;font-size:172px;color:var(--accent);text-transform:uppercase}}
.b1{{left:870px;top:34px;width:380px;z-index:4}} .b1 .bd{{font-size:32px}}
''', f'''
{PH}
<div class="abs clock clk z4" data-k="clock"></div>
<div class="abs am z4" data-k="ampm"></div>
<div class="abs it ag" data-k="again"></div>
<div class="abs ban big b1" data-move="banner1"><div class="hd"><span data-k="b1h"></span><span>now</span></div><div class="bd" data-k="b1"></div></div>

''', {'direction': 'Film look A at night: a lock screen reading 1:40 AM, one notification banner, AGAIN in badge red; her on the right, steady look (3:06), lightly dimmed. Best with a real night photo of her lit by the phone (flagged).',
      'concept': 'TH19', 'follows': 'Pinterest moody real scenes + the film lock screen', 'needs_photo': 'her in bed or on the sofa at night, lit by the phone',
      'thumbnail_text': '1:40 AM. AGAIN.', 'titles': ti('N12', 'S8', 'S1'),
      'text': {'clock': '1:40', 'ampm': 'AM', 'again': 'Again.', 'b1h': 'Feed', 'b1': '12 new posts for you'},
      'images': scene('186.0')})

# 02 · TH04 "THIS GESTURE" (top 2): bigger spinner, a handwritten "pull" on the arrow; words behind her head.
inner02 = (f'<div style="height:190px;display:grid;place-items:center;padding-top:44px">{spinner(92)}</div>' + post() + post(lines=1))
write('02-this-gesture', f'''
.t{{--ground:#0C0D10;--fg:#F4F1EA;--accent:#FF4433;{frame('793.0', 330, 380, 290)}}}
.w1{{left:36px;top:24px;font-size:124px;color:var(--fg)}}
.pl{{left:1150px;top:430px;font-size:64px;transform:rotate(-8deg)}}
''', f'''
{PH}
<div class="abs it cap w1 z2 sh" data-k="words"></div>
{FRONT}
{phone(inner02, 860, 120, 0.95, 6, z=4)}
{circle(1030, 268, 104, 94)}
{arrow(1205, 200, 1190, 420, bend=-30, move='pull')}
<div class="abs hand pl z5" data-k="pull"></div>

''', {'direction': 'Her pointing (13:13) at a big generic phone mid pull-to-refresh: the spinner circled in red pen, an arrow and a handwritten "pull". THIS GESTURE sits behind her head.',
      'concept': 'TH04', 'follows': 'Pinterest annotation (red circles) + viral sample 4 (a drawing beside her)',
      'thumbnail_text': 'THIS GESTURE', 'titles': ti('C2', 'N3'),
      'text': {'words': 'This <span class="acc">gesture</span>', 'pull': 'pull'}, 'images': scene('793.0')})

# 03 · TH20 "MAKE IT BORING" (top 3): 9 big icons vs 3 grey ones, labels 34 px, flat ground.
write('03-make-it-boring', f'''
.t{{--ground:#0C0D10;--fg:#F4F1EA;--accent:#FF4433}}
.hd1{{left:0;right:0;top:30px;text-align:center;font-size:120px;color:var(--fg)}}
.lab{{font-size:34px;color:var(--mut);top:178px}}
.ph.g .scr{{--scr:#1a1b1f}}
.ph .grid3 .lb{{font-size:17px}}
''', f'''
<div class="abs it cap hd1 z4" data-k="words"></div>
<div class="abs mono lab z4" style="left:226px" data-k="before"></div>
<div class="abs mono lab z4" style="left:806px;color:var(--fg)" data-k="after"></div>
{phone(home(cols3=True), 150, 240, 1.15, -4, move='before-phone')}
{phone(home(gray=True, few=True, cols3=True), 740, 230, 1.15, 4, cls='g', move='after-phone')}
{arrow(586, 470, 706, 470, bend=-30, move='arrow', w=10)}
''', {'direction': 'Faceless before/after in the film look: the same generic home screen, left in colour with a red badge on every app, right in grayscale with three apps and no badges.',
      'concept': 'TH20', 'follows': 'before/after splits (Sahil Bloom, ~185x) + viral sample 2 (one object = the result)',
      'thumbnail_text': 'MAKE IT BORING', 'titles': ti('S7', 'N2'),
      'text': {'words': 'Make it <span class="acc">boring</span>', 'before': 'Before', 'after': 'After'}})

# 04 · TH05 "WHY THIS DOT?": words on top, a bell icon (no stray shape), her finger up under it.
write('04-why-this-dot', f'''
.t{{--ground:#0C0D10;--fg:#F4F1EA;--accent:#FF4433;{frame('238.5', 430, 420, 280)}}}
.w{{left:40px;top:30px;font-size:122px;color:#fff}}
''', f'''
{PH}
<div class="bdg" data-move="dot" data-k="badge" style="position:absolute;left:800px;top:150px;font-size:150px;z-index:4;box-shadow:none"></div>
<div class="abs it cap w z4 sh" data-k="words"></div>
''', {'direction': 'Her finger up (3:58) towards one giant red notification badge on a plain generic app icon. WHY THIS DOT? across the top.',
      'concept': 'TH05', 'follows': 'viral sample 1 (the object huge beside her) + sample 5',
      'thumbnail_text': 'WHY THIS DOT?', 'titles': ti('C3', 'N11'),
      'text': {'words': 'Why this <span class="acc">dot?</span>', 'badge': '1'}, 'images': scene('238.5')})

# 05 · TH02 "SLOT MACHINE IN YOUR POCKET" (no "=" sign; one red).
reel = lambda inner: f'<div class="reel"><div class="rc">{inner}</div></div>'
write('05-slot-machine', f'''
.t{{--ground:#FF4433;--fg:#0C0D10;--accent:#FFFFFF}}
.w{{left:56px;top:84px;font-size:118px;color:var(--fg);width:580px}}
.w .acc{{color:#fff}}
.mach{{position:absolute;left:660px;top:58px;width:460px;height:640px;border-radius:60px;background:#0C0D10;padding:16px;z-index:3;transform:rotate(3deg)}}
.mach .in{{height:100%;border-radius:46px;background:#F2EFE9;padding:66px 22px 0;position:relative}}
.mach .isl{{position:absolute;top:16px;left:50%;width:100px;height:28px;margin-left:-50px;border-radius:16px;background:#0C0D10}}
.reels{{display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;margin-top:28px}}
.reel{{height:200px;border-radius:18px;background:#fff;border:4px solid #0C0D10;display:grid;place-items:center}}
.rc svg{{width:92px;height:92px}} .rc b{{font-family:'IT';font-weight:800;font-size:104px;color:#9A9996;line-height:1}}
.top{{font-family:'IT';font-weight:900;font-size:40px;letter-spacing:-.02em;text-align:center;color:#0C0D10;text-transform:uppercase}}
.btn{{margin:34px auto 0;width:230px;height:76px;border-radius:40px;background:#0C0D10;color:#fff;font-weight:800;font-size:30px;display:grid;place-items:center;letter-spacing:-.01em}}
.lever{{position:absolute;left:1124px;top:170px;width:22px;height:240px;background:#0C0D10;border-radius:11px;z-index:2;transform:rotate(3deg)}}
.lever::before{{content:'';position:absolute;left:-26px;top:-60px;width:74px;height:74px;border-radius:50%;background:#0C0D10}}
''', f'''
<div class="abs it cap w z4" data-k="words"></div>
<div class="lever" data-move="lever"></div>
<div class="mach" data-move="machine"><div class="in"><div class="isl"></div>
  <div class="reels">{reel(svg('heart', None, '#FF4433'))}{reel(svg('chat', None, '#0C0D10'))}{reel('<b>0</b>')}</div>
  <div class="btn" data-k="btn"></div>
  
</div></div>
''', {'direction': 'Faceless, one object = the idea: a phone built as a slot machine (lever on the side); its reels a heart, a chat bubble and a grey 0 (sometimes something, sometimes nothing). Full-bleed badge red, ink type.',
      'concept': 'TH02', 'follows': 'viral sample 2 (one object, faceless) + Mrwhosetheboss casino',
      'thumbnail_text': 'SLOT MACHINE IN YOUR POCKET', 'titles': ti('S3', 'N3'),
      'text': {'words': 'Slot machine <span class="acc">in your pocket</span>', 'top': 'Pull to refresh', 'btn': 'Try again'}})

# 06 · NEW (replaces "STILL NOTHING?"): DOOMSCROLLING in huge type behind her head + floating feed bits (viral sample 1).
write('06-doomscrolling', f'''
.t{{--ground:#0C0D10;--fg:#F4F1EA;--accent:#FF4433;{frame('442.5', 640, 400, 240)}}}
.w{{left:-6px;right:-6px;top:150px;text-align:center;font-size:154px;color:#fff;z-index:2}}
.fl{{position:absolute;z-index:4}}
''', f'''
{PH}
<div class="abs huge w" data-k="words"></div>
{FRONT}
<div class="fl ban big" data-move="banner" style="left:60px;top:420px;width:330px;transform:rotate(-6deg)"><div class="hd"><span data-k="bh"></span><span>now</span></div><div class="bd" data-k="bb"></div></div>

''', {'direction': 'The topic in huge words behind her head (viral sample 1, FINANCIAL LITERACY): DOOMSCROLLING across the room, her calm in front (7:22), one notification banner.',
      'concept': 'new (sample 1 remake)', 'follows': 'viral sample 1 (topic in huge words behind her head + objects flying)',
      'thumbnail_text': 'DOOMSCROLLING', 'titles': ti('N16', 'S4'),
      'text': {'words': 'Doomscrolling', 'bh': 'Feed', 'bb': '12 new posts'}, 'images': scene('442.5')})

# 07 · TH07 "SET UP TO SCROLL": no phone; two sticky notes as a collage around her.
write('07-set-up-to-scroll', f'''
.t{{--ground:#0C0D10;--fg:#F4F1EA;--accent:#FF4433;{frame('783.0', 520, 380, 280)}}}
.w{{left:40px;top:28px;font-size:118px;color:var(--fg)}}
.n1{{left:900px;top:220px;width:300px;height:190px;font-size:66px;transform:rotate(3deg);z-index:5}}
.n2{{left:70px;top:330px;width:290px;height:190px;font-size:66px;transform:rotate(-3deg);z-index:5;background:#FF4433;color:#fff}}
''', f'''
{PH}
<div class="abs it cap w z2 sh" data-k="words"></div>
{FRONT}
<div class="note n1" data-k="n1" data-move="note1"></div>
<div class="note n2" data-k="n2" data-move="note2"></div>
''', {'direction': 'A two-part framework on sticky notes either side of her (ENDLESS FEED, RED BADGES), her pointing at one (13:03); the words sit behind her head.',
      'concept': 'TH07', 'follows': 'viral sample 3 (FITNESS SALES FRAMEWORK: the framework drawn beside the face)',
      'thumbnail_text': 'SET UP TO SCROLL', 'titles': ti('S3', 'S4'),
      'text': {'words': 'Set up to <span class="acc">scroll</span>', 'n1': 'endless<br>feed', 'n2': 'red<br>badges'}, 'images': scene('783.0')})

# 08 · TH08 "THE FEED HAS NO END": the paper strip alone, running off the top and the bottom.
strip = ''.join(f'<div class="sp"><div class="who"><i></i><b></b></div><div class="pc"></div><div class="l"></div><div class="l s"></div></div>' for _ in range(8))
write('08-feed-has-no-end', f'''
.t{{--ground:#0C0D10;--fg:#F4F1EA;--accent:#FF4433;{frame('300.0', 330, 400, 260)}}}
.w{{left:40px;top:26px;font-size:96px;color:var(--fg);width:640px}}
.strip{{position:absolute;left:790px;top:-80px;width:310px;z-index:3;transform:rotate(4deg);background:#F7F5F0;padding:16px 16px 0;box-shadow:0 10px 26px rgba(0,0,0,.4)}}
.sp{{background:#fff;border-radius:14px;padding:12px;margin-bottom:14px;box-shadow:0 2px 8px rgba(0,0,0,.08)}}
.sp .who{{display:flex;gap:10px;align-items:center}} .sp .who i{{width:30px;height:30px;border-radius:50%;background:#d9d4c8}} .sp .who b{{width:110px;height:11px;border-radius:6px;background:#e2ded4}}
.sp .pc{{height:120px;border-radius:10px;background:#e9e5db;margin-top:10px}} .sp .l{{height:10px;border-radius:5px;background:#e2ded4;margin-top:9px}} .sp .l.s{{width:60%}}
.sp:nth-child(3n+2) .pc{{background:#FF4433}}
''', f'''
{PH}
<div class="abs it cap w z4 sh" data-k="words"></div>
<div class="strip" data-move="strip">{strip}</div>

''', {'direction': 'The endless feed made physical: one long paper strip of posts running off the top and bottom of the frame; her beside it, finger up (5:00). Best with a photo of her holding her phone up (flagged).',
      'concept': 'TH08', 'follows': 'viral sample 1 (a literal picture of the topic)', 'needs_photo': 'her holding her phone up, screen towards the camera',
      'thumbnail_text': 'THE FEED HAS NO END', 'titles': ti('C6', 'S8'),
      'text': {'words': 'The feed has <span class="acc">no end</span>'}, 'images': scene('300.0')})

# 09 · TH09 "THEY REMOVED THIS": phone lower, rougher circle.
write('09-they-removed-this', f'''
.t{{--ground:#F2EFE9;--fg:#0C0D10;--accent:#FF4433}}
.w{{left:56px;top:46px;font-size:112px;color:var(--fg)}}
.web{{position:absolute;left:56px;top:250px;width:690px;height:420px;background:#fff;border:3px solid #0C0D10;border-radius:14px;z-index:2}}
.web .bar{{height:44px;border-bottom:3px solid #0C0D10;display:flex;align-items:center;gap:9px;padding-left:16px}}
.web .bar i{{width:13px;height:13px;border-radius:50%;border:2.5px solid #0C0D10}}
.web .ln{{height:14px;border-radius:7px;background:#E4E0D6;margin:18px 34px 0}} .web .ln.s{{width:55%}}
.pg{{position:absolute;left:34px;bottom:34px;display:flex;align-items:center;gap:14px;font-family:'IT';font-weight:600;font-size:30px;color:#6b6b70}}
.pg span{{width:52px;height:52px;border-radius:10px;border:2.5px solid #c9c4b8;display:grid;place-items:center}}
.pg span.on{{background:#0C0D10;color:#fff;border-color:#0C0D10}}
.nx{{margin-left:16px;background:#0C0D10;color:#fff;font-weight:800;font-size:40px;padding:14px 28px;border-radius:12px;letter-spacing:-.02em}}
''', f'''
<div class="abs it cap w z4" data-k="words"></div>
<div class="web" data-move="website"><div class="bar"><i></i><i></i><i></i></div>
  <div class="ln"></div><div class="ln"></div><div class="ln s"></div><div class="ln"></div><div class="ln s"></div>
  <div class="pg"><span class="on">1</span><span>2</span><span>3</span><b class="nx" data-k="next"></b></div></div>
{circle(452, 598, 168, 66, rot=-6)}
{phone(post() + post() + post(), 870, 200, 0.95, 5, cls='light', illc='rgba(12,13,16,.5)')}

''', {'direction': 'Faceless: an old website with page numbers and a big Next page button circled in red pen; a phone feed with no bottom beside it.',
      'concept': 'TH09', 'follows': 'viral sample 4 (a drawing tells it) + Pinterest red-pen scribbles + her ghana 10b paper look',
      'thumbnail_text': 'THEY REMOVED THIS', 'titles': ti('N4', 'C6'),
      'text': {'words': 'They removed <span class="acc">this</span>', 'next': 'Next page →'}})

# 10 · TH10 "4 SWITCHES": the sub line bright and bigger; each switch says its state.
rows10 = ''.join(f'<div class="sw"><span data-k="s{i}"></span><em data-k="v{i}"></em><i class="tog{" on" if on else ""}"></i></div>' for i, on in enumerate([False, False, False, True], 1))
write('10-four-switches', f'''
.t{{--ground:#0C0D10;--fg:#F4F1EA;--accent:#FF4433}}
.w{{left:60px;top:150px;font-size:124px;color:var(--fg);line-height:.84;width:640px}}
.sub{{left:64px;top:440px;font-size:54px;font-weight:700;color:#D8D6D0;letter-spacing:-.025em;width:600px;line-height:1.05}}
.set{{position:absolute;left:740px;top:110px;width:500px;background:#1D1F25;border-radius:30px;padding:12px 10px;z-index:3;transform:rotate(2deg)}}
.set .sw span{{font-size:32px;flex:1}} .set .sw{{padding:24px 20px}} .set .sw em{{font-style:normal;font-family:'Plex';font-size:22px;letter-spacing:.1em;color:var(--mut)}}
.set .tog{{width:96px;height:58px;border-radius:29px}} .set .tog::after{{width:48px;height:48px;top:5px;left:5px}} .set .tog.on::after{{left:43px}}
.set .sw:last-of-type{{border-bottom:0}}
''', f'''
<div class="abs it cap w z4" data-k="words"></div>
<div class="abs sub z4" data-k="sub"></div>
<div class="set" data-move="settings">{rows10}</div>
''', {'direction': 'Faceless, practical: a generic settings card with four big switches, each with its state (Autoplay off, Red badges off, Notifications off, Grayscale on).',
      'concept': 'TH10', 'follows': 'viral sample 2 (a clipboard of DONEs: the outcome as one object)',
      'thumbnail_text': '4 SWITCHES', 'titles': ti('S7', 'N2'),
      'text': {'words': '4 <span class="acc">switches</span>', 'sub': '', 's1': 'Autoplay', 's2': 'Red badges', 's3': 'Notifications', 's4': 'Grayscale',
               'v1': 'OFF', 'v2': 'OFF', 'v3': 'OFF', 'v4': 'ON'}})

# 11 · TH11 "YOU'RE NOT THE CUSTOMER": no leader line, the FREE tag 1.5x, beside her.
write('11-not-the-customer', f'''
.t{{--ground:#0C0D10;--fg:#F4F1EA;--accent:#FF4433;{frame('492.5', 940, 360, 290)}}}
.w{{left:44px;top:40px;font-size:96px;color:var(--fg);width:640px}}
.tg{{left:250px;top:470px;font-size:112px;transform:rotate(-10deg);z-index:5}}
''', f'''
{PH}
{ico('heart', '#3A3D45', 250, x=90, y=330, move='app')}
<div class="tag tg" data-k="tag" data-move="tag"></div>
<div class="abs it cap w z4 sh" data-k="words"></div>

''', {'direction': 'A big plain app icon with a paper price tag reading FREE; her sceptical look (8:12).',
      'concept': 'TH11', 'follows': 'viral sample 2 (one object) + Pinterest editorial',
      'thumbnail_text': "YOU'RE NOT THE CUSTOMER", 'titles': ti('S6', 'N6'),
      'text': {'words': "You're not the <span class=\"acc\">customer</span>", 'tag': 'FREE'}, 'images': scene('492.5')})

# 12 · TH12 "BUILT TO HOOK YOU": words on top, one 99+ only, phone clear of her face.
write('12-built-to-hook', f'''
.t{{--ground:#0C0D10;--fg:#F4F1EA;--accent:#FF4433;{frame('157.0', 400, 400, 270)}}}
.w{{left:40px;top:28px;font-size:112px;color:#fff}}
.big{{position:absolute;left:960px;top:150px;z-index:5;background:#FF4433;color:#fff;font-family:'IT';font-weight:800;font-size:110px;letter-spacing:-.04em;
     border-radius:90px;padding:4px 40px 12px;box-shadow:0 0 0 12px #0C0D10}}
''', f'''
{PH}
{phone(home(cols3=True, no99=True), 790, 210, 0.95, 6)}
<div class="big" data-k="badge" data-move="badge"></div>
<div class="abs it cap w z4 sh" data-k="words"></div>
''', {'direction': 'One bold object, one face, the claim: a generic home screen with one oversized red 99+ badge on its corner; her finger up (2:37). Best with a photo of her holding the phone up (flagged).',
      'concept': 'TH12', 'follows': 'her collage-over-creator samples, reduced to one object', 'needs_photo': 'her holding her phone up to the camera',
      'thumbnail_text': 'BUILT TO HOOK YOU', 'titles': ti('N14', 'S2'),
      'text': {'words': 'Built to <span class="acc">hook</span> you', 'badge': '99+'}, 'images': scene('157.0')})

# 13 · TH13 "EU vs THE ENDLESS FEED": the real Commission headline as a paper clipping (her ghana 10b taste), key words highlighted.
write('13-eu-vs-feed', f'''
.t{{--ground:#0C0D10;--fg:#F4F1EA;--accent:#FF4433;{frame('186.0', 1000, 360, 280)}}}
.w{{left:40px;top:30px;font-size:100px;color:#fff}}
.w .vs{{font-weight:300}}
.clipn{{left:50px;top:250px;width:620px;font-size:46px;transform:rotate(-3deg);z-index:4}}
.stars{{position:absolute;left:590px;top:200px;width:120px;height:120px;z-index:5;transform:rotate(8deg)}}
''', f'''
{PH}
<div class="clipn" data-move="clipping"><div data-k="clip"></div></div>
<div class="abs it cap w z4 sh" data-k="words"></div>
''', {'direction': 'News in four words: the real European Commission headline (10 Jul 2026) re-set as a paper clipping with the key words highlighted, no source line on the card (as in her ghana 10b edit; the source is in NOTES.md and the description); her calm beside it (3:06).',
      'concept': 'TH13', 'follows': 'her own edit of ghana-marrify 10b (newspaper clipping, yellow highlight) + viral sample 1',
      'thumbnail_text': 'EU vs THE ENDLESS FEED', 'titles': ti('N17', 'C5'),
      'text': {'words': 'EU <span class="vs">vs</span> <span class="acc">the endless feed</span>',
               'clip': 'Commission preliminarily finds the <mark>addictive design</mark> of Instagram and Facebook in breach of the Digital Services Act',
               'credit': 'European Commission · 10 Jul 2026'}, 'images': scene('186.0')})

# 14 · TH14 "6 YEARS OFF THE APP": no handwriting, a bigger crossed-out icon.
write('14-six-years-off', f'''
.t{{--ground:#0C0D10;--fg:#F4F1EA;--accent:#FF4433;{frame('747.0', 920, 360, 300)}}}
.w{{left:44px;top:36px;font-size:96px;color:#fff;width:620px}}
''', f'''
{PH}
{ico('cam', '#3A3D45', 290, x=110, y=320, move='app')}
<svg class="pen" data-move="cross" style="left:84px;top:296px;--pw2:12" width="340" height="340"><path d="M24 24 L316 316 M316 28 L28 312"/></svg>
<div class="abs it cap w z4 sh" data-k="words"></div>

''', {'direction': 'A personal story with a number: a plain camera-style app icon (no real logo) crossed out in red pen beside her today (12:27). Much better with a photo of her at about 19 as a polaroid (flagged).',
      'concept': 'TH14', 'follows': 'Pinterest polaroids + Day 1 / Day 900 splits', 'needs_photo': 'any photo of her at about 19 (for a then / now polaroid)',
      'thumbnail_text': '6 YEARS OFF THE APP', 'titles': ti('C4', 'N8'),
      'text': {'words': '6 years off <span class="acc">the app</span>'}, 'images': scene('747.0')})

# 15 · TH15 "ALL NOTIFICATIONS: OFF": the card fully in frame.
rows15 = ''.join(f'<div class="sw"><span data-k="a{i}"></span><i class="tog"></i></div>' for i in range(1, 5))
write('15-turned-them-off', f'''
.t{{--ground:#0C0D10;--fg:#F4F1EA;--accent:#FF4433;{frame('63.5', 1000, 350, 290)}}}
.w{{left:44px;top:30px;font-size:90px;color:#fff;width:700px}}
.set{{position:absolute;left:70px;top:330px;width:470px;background:#1D1F25;border-radius:26px;padding:8px 6px;z-index:3;transform:rotate(-3deg)}}
.set .sw span{{font-size:32px}} .set .tog{{width:84px;height:50px;border-radius:25px}} .set .tog::after{{width:42px;height:42px;top:4px;left:4px}}
.set .sw:last-of-type{{border-bottom:0}}
''', f'''
{PH}
<div class="set" data-move="settings">{rows15}</div>
<div class="abs it cap w z4 sh" data-k="words"></div>

''', {'direction': 'The most searched fix shown as calm: a generic notification settings card with every switch off; her relaxed (1:03). Best with a photo of her at her desk, phone face down (flagged).',
      'concept': 'TH15', 'follows': 'viral sample 2 + "BORING WAY" (Pinterest)', 'needs_photo': 'her relaxed at her desk, phone face down',
      'thumbnail_text': 'ALL NOTIFICATIONS: OFF', 'titles': ti('N15', 'S7'),
      'text': {'words': 'All notifications: <span class="acc">off</span>', 'a1': 'Chats', 'a2': 'Social', 'a3': 'Video', 'a4': 'Shopping'}, 'images': scene('63.5')})

# 16 · NEW (replaces "5 MINUTES LATER..."): the inventor's own words as a quote card + the spinner. Faceless, paper.
write('16-inventor-quote', f'''
.t{{--ground:#F2EFE9;--fg:#0C0D10;--accent:#FF4433}}
.w{{left:56px;top:44px;font-size:92px;color:var(--fg);width:700px}}
.clipn{{left:56px;top:330px;width:640px;font-size:64px;transform:rotate(-2deg);z-index:4;border:3px solid #0C0D10}}
''', f'''
<div class="abs it cap w z4" data-k="words"></div>
<div class="clipn" data-move="quote"><div data-k="quote"></div><div class="cr" data-k="credit"></div></div>
{phone(f'<div style="height:220px;display:grid;place-items:center;padding-top:50px">{spinner(96, "#0C0D10")}</div>' + post(lines=1), 830, 70, 1.0, 5, cls='light', illc='rgba(12,13,16,.5)')}
{circle(1015, 210, 100, 92)}
''', {'direction': 'Faceless, paper: the inventor of pull-to-refresh in his own words (Loren Brichter to the Guardian, 2017) on a clipping with the key word highlighted, beside a generic phone mid-refresh with the spinner circled.',
      'concept': 'new (TH04 as a quote)', 'follows': 'her edit of ghana-marrify 10b (clipping + phone on plain ground)',
      'thumbnail_text': 'ITS INVENTOR SAID THIS', 'titles': ti('N3', 'S3'),
      'text': {'words': 'Its inventor <span class="acc">said this</span>', 'quote': '“Pull-to-refresh is <mark>addictive.</mark>”',
               'credit': 'Loren Brichter · The Guardian, 2017'}})

# 17 · TH17 "YOU DIDN'T PICK THIS": a smaller player at left, her face clear.
write('17-didnt-pick-this', f'''
.t{{--ground:#0C0D10;--fg:#F4F1EA;--accent:#FF4433;{frame('633.5', 980, 360, 280)}}}
.w{{left:44px;top:30px;font-size:100px;color:#fff;width:660px}}
.pl{{position:absolute;left:50px;top:290px;width:470px;height:300px;background:#1D1F25;border-radius:22px;z-index:3;overflow:hidden;transform:rotate(-2deg)}}
.pl .nx{{position:absolute;left:50%;top:50%;transform:translate(-50%,-56%);text-align:center}}
.pl .up{{font-size:28px;font-weight:600;color:#A9ABB2}}
.ringc{{width:150px;height:150px;margin:12px auto 0;border-radius:50%;border:11px solid #3a3d45;border-top-color:#FF4433;border-right-color:#FF4433;display:grid;place-items:center;font-family:'IT';font-weight:800;font-size:86px;color:#fff;line-height:1}}
.pl .bar{{position:absolute;left:0;right:0;bottom:0;height:10px;background:#3a3d45}} .pl .bar i{{display:block;width:96%;height:100%;background:#FF4433}}
.pl .cx{{position:absolute;right:20px;top:18px;width:56px;height:56px;border-radius:50%;background:rgba(255,255,255,.12);display:grid;place-items:center}}
''', f'''
{PH}
<div class="pl" data-move="player"><div class="nx"><div class="up" data-k="up"></div><div class="ringc" data-k="count"></div></div>
  <div class="cx">{svg('x', 30, '#fff')}</div><div class="bar"><i></i></div></div>
<div class="abs it cap w z4 sh" data-k="words"></div>

''', {'direction': 'Everyone has watched a video they did not choose: a generic video player counting down Up next 5; her concerned, hand raised (10:33).',
      'concept': 'TH17', 'follows': 'viral sample 2 + Wyatt Feaster (UI on screen)',
      'thumbnail_text': "YOU DIDN'T PICK THIS", 'titles': ti('N10', 'C8'),
      'text': {'words': "You didn't <span class=\"acc\">pick this</span>", 'up': 'Up next in', 'count': '5'}, 'images': scene('633.5')})

# 18 · TH21 "ENDLESS on purpose": mixed type (heavy + serif italic), phone clear of the words.
write('18-on-purpose', f'''
.t{{--ground:#0C0D10;--fg:#F4F1EA;--accent:#FF4433;{frame('152.0', 640, 380, 270)}}}
.w{{left:40px;top:40px;font-size:108px;color:#fff;line-height:.92;z-index:2}}
.w i{{font-family:'News';font-weight:500;font-style:italic;letter-spacing:-.04em;text-transform:none;color:var(--accent)}}
''', f'''
{PH}
{phone(post() + post() + post(), 900, 30, 0.95, 4)}
{arrow(1240, 360, 1225, 715, bend=-20, move='down-arrow')}
<div class="abs it cap w sh" data-k="words"></div>
{FRONT}

''', {'direction': 'Her hand out towards a big generic feed (2:32); a red-pen arrow runs off the bottom of the frame. ENDLESS, ON PURPOSE in heavy caps with a serif italic accent.',
      'concept': 'TH21', 'follows': 'viral sample 5 (topic + her) + Pinterest mixed type ("Capsule wardrobe")',
      'thumbnail_text': 'ENDLESS, ON PURPOSE', 'titles': ti('N18', 'S8'),
      'text': {'words': "Endless,<br><i>on purpose</i>"}, 'images': scene('152.0')})

# 19 · TH22 "BOOKS END. FEEDS DON'T.": two lines, one over each prop.
write('19-books-end', f'''
.t{{--ground:#F2EFE9;--fg:#0C0D10;--accent:#FF4433;{frame('455.5', 640, 380, 240)}}}
.w1{{left:40px;top:26px;font-size:86px;color:#fff;z-index:4}}
.w2{{left:40px;top:106px;font-size:86px;color:var(--accent);z-index:4}}
.bk{{position:absolute;left:60px;top:260px;width:300px;height:400px;background:#FFFDF6;border:4px solid #0C0D10;border-radius:6px 16px 16px 6px;z-index:4;transform:rotate(-5deg);box-shadow:12px 12px 0 #0C0D10;padding:40px 30px;text-align:center}}
.bk .ln{{height:10px;border-radius:5px;background:#E4E0D6;margin:12px 0}} .bk .ln.s{{width:60%;margin:12px auto}}
.bk .end{{font-family:'News';font-style:italic;font-weight:500;font-size:64px;margin-top:40px;color:#0C0D10}}
''', f'''
{PH}
<div class="bk" data-move="book"><div class="ln"></div><div class="ln"></div><div class="ln s"></div><div class="end" data-k="end"></div></div>
{phone(post() + post() + post() + post(), 940, 230, 0.95, 5, cls='light', illc='rgba(12,13,16,.5)')}
<div class="abs it cap w1 sh" data-k="w1"></div>
<div class="abs it cap w2 sh" data-k="w2"></div>

''', {'direction': 'Literal objects either side of her: a book page ending in THE END (left) under BOOKS END., a phone feed running off the bottom (right) under FEEDS DON\'T.; her in the middle (7:35).',
      'concept': 'TH22', 'follows': 'viral sample 1 (literal objects) + Day 1 / Day 900 splits',
      'thumbnail_text': "BOOKS END. FEEDS DON'T.", 'titles': ti('S8', 'S1'),
      'text': {'words': '', 'w1': 'Books end.', 'w2': "Feeds don't.", 'end': 'The End'}, 'images': scene('455.5')})

# 20 · NEW (replaces the cluttered TH01): lowercase serif behind her head + one phone with one badge.
write('20-picked-it-up', f'''
.t{{--ground:#0C0D10;--fg:#F4F1EA;--accent:#FF4433;{frame('562.5', 600, 420, 250)}}}
.w{{left:0;right:0;top:110px;text-align:center;font-family:'News';font-weight:500;font-size:150px;letter-spacing:-.04em;line-height:.9;color:#fff;z-index:2;white-space:nowrap}}
.w i{{font-style:italic;color:var(--accent)}}
''', f'''
{PH}
<div class="abs w" data-k="words"></div>
{FRONT}
{phone(f'<div style="padding:90px 18px 0"><div class="clock" style="font-size:110px;text-align:center">1:40</div><div class="ban" style="margin-top:30px;background:#1D1F25"><div class="hd"><span>Feed</span><span>now</span></div><div class="bd">12 new posts</div></div></div>', 920, 300, 0.78, 6)}
<div class="bdg" data-move="badge" style="position:absolute;left:1120px;top:276px;font-size:54px;z-index:5" data-k="badge"></div>
''', {'direction': 'Editorial: "picked it up again?" in big lowercase serif behind her head (Pinterest woven type), her steady look (9:22), one generic lock screen with one red badge.',
      'concept': 'TH01', 'follows': 'Pinterest woven type ("alone in korea", "COOK") + Hazel Thayer (phone lit)', 'needs_photo': 'her on the sofa at night, face lit by the phone',
      'thumbnail_text': 'picked it up again?', 'titles': ti('N12', 'S4'),
      'text': {'words': 'picked it up <i>again?</i>', 'badge': '12'}, 'images': scene('562.5')})

# 21 · EXTRA collage over her: 3 objects around her head, no labels, the serif line higher.
write('21-collage-five-tricks', f'''
.t{{--ground:#0C0D10;--fg:#FFFFFF;--accent:#FF4433;{frame('163.5', 640, 300, 250)}}}
.w{{left:0;right:0;top:470px;text-align:center;font-size:132px;color:#fff;font-family:'News';font-weight:500;letter-spacing:-.035em;line-height:.9;z-index:4;text-shadow:0 4px 26px rgba(0,0,0,.4)}}
.w i{{font-style:italic}}
.mini{{position:absolute;z-index:4;box-shadow:0 10px 24px rgba(0,0,0,.4)}}
''', f'''
{PH}
<div class="abs w" data-k="words"></div>
{ico('chat', '#3A3D45', 200, badge='9', bsize=70, x=820, y=70, move='badge-icon', ring='#3A3D45', z=4)}

''', {'direction': 'Collage over her (her asked-for style): a full natural photo of her (2:43), one object beside her head (an app with a red badge), one big lowercase serif line.',
      'concept': 'extra (collage)', 'follows': 'inspiration/viral-samples/collage/ ("Time to lock in.", "How to be Feminine")',
      'thumbnail_text': 'not an accident', 'titles': ti('S1', 'S4'),
      'text': {'words': 'not an <i>accident</i>'}, 'images': scene('163.5')})

# 22 · EXTRA flat lock screen (film look): 3 banners, no sub line.
write('22-not-you-lockscreen', f'''
.t{{--ground:#0C0D10;--fg:#F4F1EA;--accent:#FF4433}}
.w{{left:60px;top:170px;font-size:170px;color:var(--fg);line-height:.84;width:600px}}
.stack{{position:absolute;left:680px;top:130px;width:500px;z-index:3}}
.stack .ban{{margin-bottom:18px}} .stack .ban .bd{{font-size:36px}}
''', f'''
<div class="abs it cap w z4" data-k="words"></div>
<div class="stack" data-move="banners">
''' + ''.join(f'<div class="ban big" style="transform:translateX({dx}px)"><div class="hd"><span data-k="h{i}"></span><span>now</span></div><div class="bd" data-k="m{i}"></div></div>'
              for i, dx in enumerate([0, 34, 0], 1)) + '''
</div>

''', {'direction': 'Faceless, the film lock screen as the thumbnail: three notification banners (pull to refresh, autoplay, likes) on ink; IT\'S NOT YOU answers the guilt question the title asks.',
      'concept': 'extra (film look)', 'follows': 'the approved film look A + Pinterest "BORING WAY" (notifications stacked)',
      'thumbnail_text': "IT'S NOT YOU.", 'titles': ti('S4', 'S2'),
      'text': {'words': "It's not <span class=\"acc\">you.</span>", 'h1': 'Feed', 'm1': 'Pull down for new posts',
               'h2': 'Video', 'm2': 'Up next: playing in 5', 'h3': 'Likes', 'm3': 'Someone liked your photo'}})

# 23 · NEW (round 3): the strongest idea (MAKE IT BORING) with her face, a one-word highlight box (Pinterest "JOBS ARE DEAD").
write('23-boring-with-her', f'''
.t{{--ground:#0C0D10;--fg:#F4F1EA;--accent:#FF4433;{frame('673.0', 300, 400, 260)}}}
.w{{left:40px;top:30px;font-size:118px;color:#fff;z-index:4}}
.w .box{{color:#fff}}
.ph.g .scr{{--scr:#1a1b1f}}
''', f'''
{PH}
{phone(home(cols3=True), 770, 260, 0.74, -4, move='before-phone')}
{phone(home(gray=True, few=True, cols3=True), 1030, 250, 0.74, 5, cls='g', move='after-phone')}
<div class="abs it cap w sh" data-k="words"></div>

''', {'direction': 'MAKE IT BORING with her (11:13, calm): the same generic home screen twice beside her, in colour with red badges, then grayscale with three apps; BORING in a red highlight box.',
      'concept': 'TH20 + her', 'follows': 'Pinterest one-word highlight ("JOBS ARE DEAD") + before/after splits',
      'thumbnail_text': 'MAKE IT BORING', 'titles': ti('N2', 'S7'),
      'text': {'words': 'Make it <span class="box">boring</span>'}, 'images': scene('673.0')})
