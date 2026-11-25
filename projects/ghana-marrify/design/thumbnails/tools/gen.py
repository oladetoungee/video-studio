"""Writes the round-2 thumbnail directions (index.html + content.json) for ghana-marrify.
  python3 tools/gen.py                 -> every direction
  python3 tools/gen.py 03 07           -> only directions starting with these prefixes
  python3 tools/gen.py 07 --reset      -> also overwrite content.json text/images/vars (otherwise her studio edits win)
index.html (the layout) is always rewritten. content.json: her studio edits are kept: existing text, images, vars,
nudge and class values win over the defaults here; only missing keys are filled and direction/titles refreshed.
Photo framing comes from tools/faces.txt (Vision face boxes of assets/scene/*.jpg). Then: node render.mjs
"""
import json, os, sys
T = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FACES = {}
for l in open(os.path.join(T, 'tools', 'faces.txt')):
    f, x, y, w = l.split(); FACES[f[2:-4]] = (float(x), float(y), float(w))

def frame(f, cx, cy, fw, W=1280, H=720, pre='--p'):
    """photo vars so the face centre lands at (cx, cy) with face width fw, photo always covering the W x H box"""
    x, y, w = FACES[f]
    pw = max(fw / w, W, H * 16 / 9); ph = pw * 9 / 16
    px = cx - (x + w / 2) * pw
    py = cy - (y * ph + w * pw / 2)
    px = min(0, max(W - pw, px)); py = min(0, max(H - ph, py))
    return f'{pre}x:{px:.0f}px;{pre}y:{py:.0f}px;{pre}w:{pw:.0f}px'

def scene(f): return {'scene': f'../../assets/scene/s_{f}.jpg', 'front': f'../../assets/scene/mask/s_{f}.png'}
PH = '<div class="photo z1" data-move="photo"><img data-img="scene" alt=""><div class="dim"></div></div>'
FRONT = '<div class="front"><img data-img="front" alt=""></div>'

def write(name, css, body, content):
    d = os.path.join(T, 'directions', name); os.makedirs(d, exist_ok=True)
    html = ('<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../../lib/r2.css"><style>\n'
            + css.strip() + '\n</style></head><body><div class="t">\n' + body.strip()
            + '\n</div><script src="../../lib/bind.js"></script></body></html>\n')
    open(os.path.join(d, 'index.html'), 'w').write(html)
    p = os.path.join(d, 'content.json')
    content.setdefault('vars', {})
    content['title'] = content['titles'][0]
    if os.path.exists(p) and not RESET:
        old = json.load(open(p))
        for k in ('text', 'images', 'vars'):
            content[k] = {**content.get(k, {}), **old.get(k, {})}
        for k in ('nudge', 'class'):
            if k in old: content[k] = old[k]
        if old.get('title') and old.get('title') not in content['titles']: content['title'] = old['title']
    order = ['direction', 'title', 'titles', 'text', 'images', 'vars', 'nudge', 'class']
    json.dump({k: content[k] for k in order if k in content}, open(p, 'w'), indent=2, ensure_ascii=False)

SEARCH_SVG = '<svg viewBox="0 0 24 24" width="34" height="34"><circle cx="10" cy="10" r="7" fill="none" stroke="#111114" stroke-width="2.6"/><path d="M15.5 15.5 L22 22" stroke="#111114" stroke-width="2.6" stroke-linecap="round"/></svg>'

D = {}
# ---------------------------------------------------------------- 01
D['01-shh-searchable'] = (f"""
.t{{--ground:#0f1513;--fg:#F7F5F0;--accent:#FFD23F;{frame('32.37', 640, 470, 280)};--dim:.22}}
.big{{left:0;right:0;top:4px;text-align:center;color:var(--fg)}}
.big .a{{font-size:66px;display:block}} .big .b{{font-size:164px;display:block;margin-top:-14px;letter-spacing:-.035em}}
.note{{left:60px;top:250px;font-size:64px;color:var(--accent);transform:rotate(-4deg)}}
""", f"""
{PH}
<div class="abs big serif nw z1 shadow" data-move="headline"><span class="a" data-k="line1"></span><span class="b it" data-k="line2"></span></div>
{FRONT}
<div class="abs note hand z3" data-k="note"></div>
""", {
 'direction': "Words behind her head (editorial serif, only a small overlap), her real 'shh' gesture in the room (0:32), one handwritten note",
 'titles': ["Ghana Put Marriage Records Online. Anyone Can Search Them.", "An HCI Researcher Reacts to Ghana's Public Marriage Records", "Should Marriage and Divorce Records Be This Easy to Find?"],
 'text': {'line1': 'your marriage is now', 'line2': 'searchable', 'note': '(your divorce too)'},
 'images': scene('32.37')})

# ---------------------------------------------------------------- 02
D['02-search-your-name'] = (f"""
.t{{--ground:#0f1513;--fg:#F7F5F0;--accent:#FFD23F;{frame('242.83', 960, 330, 400)};--dim:.30}}
.hd{{left:56px;top:40px;font-size:124px;color:var(--fg)}}
.ui{{left:56px;top:330px;width:540px;background:#FFFDF6;border-radius:12px;box-shadow:0 14px 40px rgba(0,0,0,.45);overflow:hidden}}
.ui .bar{{display:flex;align-items:center;gap:16px;padding:20px 22px;border-bottom:2px solid #e6e1d6}}
.ui .q{{font-family:'Archivo';font-weight:600;font-size:38px;color:#111114}}
.ui .cur{{display:inline-block;width:4px;height:40px;background:#111114;margin-left:4px;vertical-align:-6px}}
.ui .row{{display:flex;align-items:center;gap:16px;padding:14px 22px;font-family:'Archivo';font-weight:700;font-size:30px;color:#111114}}
.ui .row.big{{font-size:40px;padding:16px 22px}}
.ui .row + .row{{border-top:2px solid #eee9de}}
.ui .row b{{font-weight:700}} .ui .row .r{{color:var(--red)}}
.ui .bars{{margin-left:auto;display:flex;gap:8px}} .ui .bars i{{display:block;height:18px;background:#d9d4c8;border-radius:3px}}
.lbl{{left:58px;top:610px;font-size:14px;color:rgba(247,245,240,.7)}}
""", f"""
{PH}
<div class="abs hd serif nw z3 shadow" data-move="headline"><div data-k="line1"></div><div class="it" data-k="line2"></div></div>
<div class="abs ui z3" data-move="search">
  <div class="bar">{SEARCH_SVG}<span class="q" data-k="query"></span><span class="cur"></span></div>
  <div class="row"><span data-k="row1"></span><span class="bars"><i style="width:70px"></i><i style="width:40px"></i></span></div>
  <div class="row big"><span class="r" data-k="row2"></span><span class="bars"><i style="width:56px"></i><i style="width:64px"></i></span></div>
</div>
<div class="abs lbl mono z3" data-k="label"></div>
""", {
 'direction': "Her calm, unconvinced look in the room (4:03) + a generic name search that returns a marriage and a divorce record (labelled illustration)",
 'titles': ["Ghana Made Marriage and Divorce Records Searchable by Name", "Anyone in Ghana Can Now Look Up Your Marriage History", "An HCI Researcher on Ghana's New Marriage Records Site"],
 'text': {'line1': 'should this', 'line2': 'be public?', 'query': '[your name]', 'row1': 'Marriage record found', 'row2': 'Divorce record found', 'label': 'Illustration'},
 'images': scene('242.83')})

# ---------------------------------------------------------------- 03
D['03-estonia-ghana'] = (f"""
.t{{--ground:#0f1513;--fg:#F7F5F0;--accent:#FFD23F;{frame('215.63', 640, 380, 300)};--dim:.22}}
.w{{font-size:190px;color:var(--fg)}}
.e{{left:44px;top:40px}} .g{{right:44px;top:226px;text-align:right}}
.flag{{position:absolute;width:150px;height:98px;box-shadow:0 0 0 3px rgba(0,0,0,.25)}}
.fe{{left:300px;top:236px;background:linear-gradient(#0072CE 0 33.4%,#111 33.4% 66.7%,#fff 66.7%)}}
.fg{{right:50px;top:436px;background:linear-gradient(#CE1126 0 33.4%,#FCD116 33.4% 66.7%,#006B3F 66.7%)}}
.fg::after{{content:'\\2605';position:absolute;left:0;right:0;top:24px;text-align:center;font-size:42px;line-height:1;color:#111}}
.vs{{right:44px;top:118px;font-size:80px;color:var(--accent);transform:rotate(-6deg)}}
.note{{left:50px;top:560px;font-size:70px;color:var(--fg)}}
.note i{{color:var(--accent)}}
""", f"""
{PH}
<div class="abs w e anton nw z1 shadow" data-k="left"></div>
<div class="abs w g anton nw z1 shadow" data-k="right"></div>
{FRONT}
<div class="flag fe z3" data-move="flagEE"></div><div class="flag fg z3" data-move="flagGH"></div>
<div class="abs note serif nw z3 shadow" data-k="note"></div>
""", {
 'direction': "Two countries as giant words behind her head (like 'FAVOR' / 'COOK' on her board), flat flags, her thinking pose (3:35), one handwritten question",
 'titles': ["I Live in Estonia. My Take on Ghana's Marriage Records", "What Ghana's Marriage Records Site Can Learn from Estonia", "Estonia Puts Everything Online. Now Ghana Is Doing It Too"],
 'text': {'left': 'Estonia', 'right': 'Ghana', 'note': 'public records: <i>who does it better?</i>'},
 'images': scene('215.63')})
# note: the Estonia flag is blue-black-white, Ghana red-gold-green with a black star: flat stripes (hard stops), no shading

# ---------------------------------------------------------------- 04
D['04-techcabal-clipping'] = (f"""
.t{{--ground:#0f1513;--fg:#F7F5F0;--accent:#FFD23F;{frame('90.17', 960, 330, 340)};--dim:.25}}
.hd{{left:52px;top:40px;font-size:150px;color:var(--fg)}}
.clip{{left:46px;top:262px;width:600px;padding:26px 30px 20px;transform:rotate(-2deg);color:#111114}}
.clip .s{{font-family:'Instrument Sans';font-weight:600;font-size:34px;line-height:1.15}}
.clip .b{{font-family:'Instrument Sans';font-weight:700;font-size:58px;line-height:1.08;margin-top:6px}}
.clip .b span{{background:var(--accent);box-decoration-break:clone;-webkit-box-decoration-break:clone;padding:0 6px}}
.clip .credit{{margin-top:16px;color:#6b6b6b}}
.tape{{left:240px;top:244px;transform:rotate(3deg);z-index:4}}
""", f"""
{PH}
<div class="abs hd serif nw z3 shadow" data-move="headline"><span data-k="line1"></span> <i data-k="line2"></i></div>
<div class="clip z3" data-move="clipping"><div class="s" data-k="lead"></div><div class="b"><span data-k="quote"></span></div><div class="credit" data-k="credit"></div></div>
<div class="tape"></div>
""", {
 'direction': "TechCabal's own words (verbatim, typeset as a taped clipping, the key phrase highlighted) + her thinking, hand at her mouth (1:30)",
 'titles': ["Ghana Made Marriage and Divorce Records Searchable Online", "Ghana's Marriage Records App: Great Idea, Real Privacy Risks", "Should Anyone Be Able to Search Your Divorce?"],
 'text': {'line1': 'too', 'line2': 'public?', 'lead': 'Marriage and divorce records are', 'quote': 'sensitive personal information.', 'credit': 'TechCabal Daily · 8 Sep 2026'},
 'images': scene('90.17')})

# ---------------------------------------------------------------- 05
D['05-divorce-public-box'] = (f"""
.t{{--ground:#0f1513;--fg:#F7F5F0;--accent:#E8352B;{frame('205.08', 930, 340, 340)};--dim:.28}}
.hd{{left:52px;top:70px;color:var(--fg)}}
.hd .l{{font-size:96px;line-height:1.02}}
.hd .box{{display:inline-block;margin-top:18px;background:var(--accent);color:#fff;font-size:150px;padding:16px 34px 8px;transform:rotate(-2deg)}}
""", f"""
{PH}
<div class="abs hd z3" data-move="headline"><div class="l play nw shadow" data-k="line1"></div><div class="l play nw shadow" data-k="line2"></div><div class="box anton nw" data-k="box"></div></div>
""", {
 'direction': "Red highlight box on one word (her board: 'JOBS ARE DEAD', 'stop lying to yourself'), Playfair editorial lines, her raised-eyebrow look (3:25) in the room",
 'titles': ["Anyone Can Now Search Divorce Records in Ghana", "Ghana's Marriage Registry Is Open to Anyone. Is That OK?", "I Like Ghana's New Marriage Records Site. I Have Questions"],
 'text': {'line1': 'should your', 'line2': 'divorce be', 'box': 'public?'},
 'images': scene('205.08')})

# ---------------------------------------------------------------- 06
D['06-real-search-box'] = ("""
.t{--ground:#EDE9E2;--fg:#111114;--accent:#E8352B}
.hd{left:70px;top:50px;font-size:136px;color:var(--fg)}
.hd i{color:var(--accent)}
.card{left:60px;top:358px;width:1160px;background:#fff;border-radius:6px;padding:22px 22px 20px;box-shadow:0 18px 50px rgba(17,17,20,.16)}
.card img{display:block;width:100%}
.cr{right:62px;top:484px;text-align:right;font-size:15px;color:rgba(17,17,20,.55)}
.note{left:430px;top:560px;font-size:84px;color:var(--accent);transform:rotate(-3deg)}
.x{}svg.arr{left:330px;top:478px;width:90px;height:90px;color:var(--accent)}
""", f"""
<div class="abs hd serif nw" data-move="headline"><div data-k="line1"></div><div class="it" data-k="line2"></div></div>
<div class="abs card" data-move="source"><img data-img="shot" alt=""></div>
<div class="abs cr credit" data-k="credit"></div>
<svg class="draw arr z3" viewBox="0 0 90 90" data-move="arrow"><path d="M84 70 C 60 72, 30 60, 18 20"/><path d="M6 34 L18 18 L34 30"/></svg>
<div class="abs note hand nw z3" data-k="note"></div>
""", {
 'direction': "Faceless: the real, empty Marrify divorce search (captured 1 Oct 2026, no names) on a paper ground, a red hand-drawn note",
 'titles': ["Ghana Put Its Divorce Records Online. Anyone Can Search Them", "Ghana's New Public Marriage and Divorce Registry, Explained", "Should Divorce Records Be Searchable by Anyone?"],
 'text': {'line1': 'divorce records,', 'line2': 'one search away', 'credit': 'marrifyapp.com · captured 1 Oct 2026', 'note': 'any name works'},
 'images': {'shot': '../../assets/props/marrify_search_box.png'}})

# ---------------------------------------------------------------- 07
D['07-quote-card'] = (f"""
.t{{--ground:#0f1513;--fg:#111114;--accent:#1B3FD8;{frame('185.13', 950, 320, 330)};--dim:.12}}
.card{{left:52px;top:170px;width:590px;background:#fff;border-radius:6px;padding:36px 40px 38px;box-shadow:0 20px 50px rgba(0,0,0,.4);transform:rotate(-1.5deg)}}
.q{{font-size:70px;line-height:1.04;color:var(--fg)}}
.q .acc{{color:var(--accent)}}
""", f"""
{PH}
<div class="abs card z3" data-move="card"><div class="q sans" data-k="quote"></div></div>
""", {
 'direction': "One plain question on a white card (her board: 'Forget about going viral', 'How to get ridiculously better at communication?'), her wry look (3:05) in the room",
 'titles': ["Ghana Made Divorce Records Searchable. Here's My Take", "Ghana's Marriage Records Are Online. Is That a Good Idea?", "Ghana's Public Marriage Records: What Worries Me"],
 'text': {'quote': 'Would you want your divorce <span class="acc">searchable</span> online?'},
 'images': scene('185.13')})

# ---------------------------------------------------------------- 08
D['08-checklist-note'] = (f"""
.t{{--ground:#0f1513;--fg:#111114;--accent:#E8352B;{frame('123.00', 820, 330, 320)};--dim:.10}}
.note{{left:50px;top:140px;width:540px;background:#FFFDF6;padding:30px 34px 26px;box-shadow:0 18px 44px rgba(0,0,0,.42);transform:rotate(-4deg)}}
.note .h{{font-size:50px;color:#111114;margin-bottom:14px;white-space:nowrap}}
.note .i{{display:flex;align-items:center;gap:16px;font-size:60px;white-space:nowrap;color:#111114;line-height:1.08}}
.note svg{{width:46px;height:46px;flex:none;color:var(--accent)}}
.note svg path{{stroke-width:7}}
.tape{{left:190px;top:126px;transform:rotate(-6deg);z-index:4}}
""", f"""
{PH}
<div class="abs note z3" data-move="note"><div class="h hand" data-k="head"></div>
 <div class="i hand"><svg class="draw" style="position:static" viewBox="0 0 46 46"><path d="M5 25 L18 38 L42 6"/></svg><span data-k="item1"></span></div>
 <div class="i hand"><svg class="draw" style="position:static" viewBox="0 0 46 46"><path d="M5 25 L18 38 L42 6"/></svg><span data-k="item2"></span></div>
 <div class="i hand" style="color:var(--accent)"><svg class="draw" style="position:static" viewBox="0 0 46 46"><path d="M5 25 L18 38 L42 6"/></svg><span data-k="item3"></span></div></div>
<div class="tape"></div>
""", {
 'direction': "Handwritten checklist on a taped note (her board: 'Everything done by 2pm' clipboard), her side-eye with hands up (2:03) in the room",
 'titles': ["Ghana Put Every Marriage and Divorce Record Online", "Ghana's Marriage Records Site, Reviewed by an HCI Researcher", "Your Marriage History, One Search Away: Ghana's New Registry"],
 'text': {'head': 'now online in Ghana:', 'item1': 'marriages', 'item2': 'divorces', 'item3': 'anyone can search'},
 'images': scene('123.00')})

# ---------------------------------------------------------------- 09
D['09-who-looked-you-up'] = (f"""
.t{{--ground:#0f1513;--fg:#F7F5F0;--accent:#FFD23F;{frame('56.17', 930, 330, 360)};--dim:.30}}
.hd{{left:56px;top:50px;font-size:164px;color:var(--fg)}}
.hd i{{color:var(--accent)}}
.ping{{left:58px;top:470px;display:flex;align-items:center;gap:18px;background:#FFFDF6;border-radius:14px;padding:18px 22px;box-shadow:0 14px 40px rgba(0,0,0,.45)}}
.ping .eyes{{display:flex;gap:7px;flex:none;width:64px;height:64px;border-radius:50%;background:#d9d9d5;align-items:center;justify-content:center}}
.ping .eyes b{{display:block;width:16px;height:16px;border-radius:50%;border:4px solid #141414}}
.ping .tx{{font-family:'Instrument Sans';font-weight:600;font-size:38px;white-space:nowrap;line-height:1.1;color:#111114}}
.lbl{{left:60px;top:582px;font-size:14px;color:rgba(247,245,240,.7)}}
""", f"""
{PH}
<div class="abs hd serif nw z3 shadow" data-move="headline"><div data-k="line1"></div><div><i data-k="line2"></i> <span data-k="line3"></span></div></div>
<div class="abs ping z3" data-move="notice"><span class="eyes"><b></b><b></b></span><span class="tx" data-k="notice"></span></div>
<div class="abs lbl mono z3" data-k="label"></div>
""", {
 'direction': "Her sceptical squint, hand at her face (0:56) + one question about who searched you, with a small notification (illustration, the film's searcher eyes)",
 'titles': ["Someone Searched Your Marriage Record. Should You Know?", "Ghana's Public Marriage Records Need One Feature Estonia Has", "If Someone Searches Your Marriage Record, Should You Know?"],
 'text': {'line1': 'who looked', 'line2': 'you', 'line3': 'up?', 'notice': 'Someone searched your name', 'label': 'Illustration'},
 'images': scene('56.17')})

# ---------------------------------------------------------------- 10
D['10-private-searchable'] = (f"""
.t{{--ground:#F3EFE7;--fg:#111114;--accent:#E8352B;{frame('214.13', 300, 320, 330, 600, 720, '--b')}}}
.pb{{position:absolute;right:0;top:0;width:600px;height:720px;overflow:hidden}}
.pb img{{position:absolute;left:var(--bx);top:var(--by);width:var(--bw)}}
.hd{{left:56px;top:150px;color:var(--fg)}}
.hd .a{{font-size:96px}} .hd .b{{font-size:156px;margin-top:6px;position:relative;display:inline-block}}
.hd .c{{font-size:148px;color:var(--accent);margin-top:2px}}
.strike{{position:absolute;left:-10px;top:40px;width:calc(100% + 20px);height:70px;color:var(--accent)}}
.strike path{{stroke-width:9}}
.mk{{left:60px;top:640px;font-size:15px;color:rgba(17,17,20,.5)}}
""", f"""
<div class="pb" data-move="photo"><img data-img="scene" alt=""></div>
<div class="abs hd serif nw" data-move="headline"><div class="a" data-k="line1"></div>
 <div class="b"><span data-k="line2"></span><svg class="draw strike" viewBox="0 0 400 70" preserveAspectRatio="none"><path d="M4 44 C 90 30, 200 48, 396 22"/></svg></div>
 <div class="c it" data-k="line3"></div></div>
""", {
 'direction': "Clean white-and-red editorial (her board: 'no one cares.', 'how to be consistent'): serif type, a red scribble through one word, her photo as a block (3:34, hand up)",
 'titles': ["Ghana Made Marriage and Divorce Records Searchable Online", "Ghana's New Marriage Registry Raises a Big Privacy Question", "Ghana's Public Marriage Records Made Me Pause. Here's Why"],
 'text': {'line1': 'your divorce:', 'line2': 'private', 'line3': 'searchable.'},
 'images': {'scene': '../../assets/scene/s_214.13.jpg'}})

# ---------------------------------------------------------------- 11  Blink characters
def face(x, y, r, lx, ly, sh=''):
    return (f'<div class="sf" style="left:{x-r}px;top:{y-r}px;width:{2*r}px;height:{2*r}px{sh}">'
            f'<b style="transform:translate({lx}px,{ly}px)"></b><b style="transform:translate({lx}px,{ly}px)"></b></div>')
crowd = ''.join(face(*a) for a in [(770,120,58,8,10),(1020,110,50,-8,10),(1180,250,56,-10,4),(1190,470,52,-10,-6),(1040,610,50,-6,-8),(800,630,56,4,-10),(640,470,46,10,-4),(660,250,50,10,6)])
D['11-blink-records'] = ("""
.t{--ground:#F4F4F4;--fg:#141414;--accent:#E3412F}
.hd{left:60px;top:200px;font-size:104px;line-height:1.0;color:var(--fg);font-family:'Instrument Sans';font-weight:600;letter-spacing:-.035em}
.hd .acc{color:var(--accent)}
.rec{position:absolute;left:820px;top:230px;width:220px;height:280px;background:#2E4FE0;clip-path:polygon(0 0,74% 0,100% 20%,100% 100%,0 100%)}
.rec::after{content:'';position:absolute;right:0;top:0;width:26%;height:20%;background:#1d37b0;clip-path:polygon(0 0,100% 100%,0 100%)}
.reye{position:absolute;top:104px;width:62px;height:62px;border-radius:50%;background:#fff}
.reye b{position:absolute;left:18px;top:18px;width:26px;height:26px;border-radius:50%;background:#141414}
.rl{position:absolute;left:30px;font-family:'DM Mono';font-weight:500;font-size:15px;letter-spacing:.12em;color:rgba(255,255,255,.85);top:216px}
.sf{position:absolute;border-radius:50%;background:#D9D9D5;display:flex;gap:12%;align-items:center;justify-content:center}
.sf b{display:block;width:24%;height:24%;border-radius:50%;border:5px solid #141414;background:#fff}
.mk{left:62px;top:600px;font-size:15px;color:rgba(20,20,20,.45)}
""", f"""
<div class="abs hd" data-move="headline"><div data-k="line1"></div><div data-k="line2"></div></div>
<div data-move="crowd">{crowd}</div>
<div class="rec" data-move="record"><div class="reye" style="left:38px"><b style="transform:translate(-8px,6px)"></b></div><div class="reye" style="left:118px"><b style="transform:translate(-8px,6px)"></b></div><div class="rl" data-k="tag"></div></div>
""", {
 'direction': "Graphic option in the film's Blink look: a marriage record character with eyes, surrounded by searchers all looking at it (flat, white ground)",
 'titles': ["Ghana's Marriage and Divorce Records Are Now Searchable", "What Happens When Marriage Records Become Searchable?", "Ghana's New Marriage Registry: Useful, but Who Is Looking?"],
 'text': {'line1': 'Anyone can', 'line2': 'look <span class="acc">you</span> up.', 'tag': 'MARRIAGE RECORD'},
 'images': {}})

# ---------------------------------------------------------------- 12  before / now
D['12-before-now'] = ("""
.t{--ground:#141414;--fg:#F7F5F0;--accent:#FFD23F}
.l{position:absolute;left:0;top:0;width:640px;height:720px;background:#E7DFCC}
.r{position:absolute;left:640px;top:0;width:640px;height:720px;background:#16181A}
.lab{top:40px;font-size:76px}
.lab.a{left:48px;color:#141414}.lab.b{left:688px;color:var(--fg)}
.box{position:absolute;left:150px;top:220px;width:340px;height:230px}
.box .f{position:absolute;left:0;width:340px;height:44px;background:#C9A86A;border:3px solid #141414;border-radius:3px}
.box .f::before{content:'';position:absolute;left:24px;top:-14px;width:90px;height:14px;background:#C9A86A;border:3px solid #141414;border-bottom:0;border-radius:3px 3px 0 0}
.box .k{position:absolute;left:-20px;top:150px;width:380px;height:100px;background:#8E6B3A;border:3px solid #141414}
.box .k::after{content:'';position:absolute;left:150px;top:30px;width:80px;height:26px;border:3px solid #141414;background:#E7DFCC}
.cap{font-size:52px;width:560px}
.cap.a{left:50px;top:540px;color:#141414}.cap.b{left:690px;top:540px;color:var(--accent)}
.ph{position:absolute;left:840px;top:130px;width:240px;height:370px;border:5px solid #F7F5F0;border-radius:34px;background:#2a2d31;overflow:hidden}
.ph .s{margin:46px 16px 0;height:44px;border-radius:8px;background:#FFFDF6;display:flex;align-items:center;padding:0 12px;font-family:'Archivo';font-weight:600;font-size:20px;color:#111}
.ph .row{margin:12px 16px 0;height:40px;border-radius:6px;background:#3b3f44;display:flex;align-items:center;gap:8px;padding:0 10px;font-family:'Archivo';font-weight:700;font-size:16px;color:#F7F5F0}
.ph .row i{display:block;height:12px;background:#666;border-radius:2px;flex:1}
.mk{left:690px;top:676px;font-size:13px;color:rgba(247,245,240,.5)}
.mk2{left:50px;top:676px;font-size:13px;color:rgba(20,20,20,.5)}
""", """
<div class="l"></div><div class="r"></div>
<div class="abs lab a anton nw" data-k="left"></div><div class="abs lab b anton nw" data-k="right"></div>
<div class="box" data-move="archive"><div class="f" style="top:0"></div><div class="f" style="top:50px"></div><div class="f" style="top:100px"></div><div class="k"></div></div>
<div class="ph" data-move="phone"><div class="s" data-k="query"></div><div class="row"><span data-k="r1"></span><i></i></div><div class="row"><span data-k="r2"></span><i></i></div></div>
<div class="abs cap a hand" data-k="capL"></div><div class="abs cap b hand" data-k="capR"></div>
<div class="abs mk mono" data-k="label"></div>
""", {
 'direction': "Before / now split (her saved 'Before / After', 'Day 1 / Day 900' thumbnails): a paper archive vs a phone search, drawn flat",
 'titles': ["Ghana's Marriage and Divorce Records Are Now Online", "Ghana Moved Its Marriage Records Online. What Changes?", "From Court Files to Phone Searches: Ghana's Marriage Records"],
 'text': {'left': 'Before', 'right': 'Now', 'capL': 'your divorce: in a court archive', 'capR': 'your divorce: one search away', 'query': '[any name]', 'r1': 'Married', 'r2': 'Divorced', 'label': 'Illustration'},
 'images': {}})

# ---------------------------------------------------------------- 13  news clipping
D['13-news-but'] = (f"""
.t{{--ground:#0f1513;--fg:#F7F5F0;--accent:#FFD23F;{frame('46.13', 960, 330, 330)};--dim:.22}}
.clip{{left:44px;top:90px;width:640px;padding:24px 26px 16px;transform:rotate(-2deg)}}
.clip .credit{{margin-top:12px;color:#6b6b6b}}
.tape{{left:300px;top:72px;transform:rotate(4deg);z-index:4}}
.note{{left:56px;top:400px;font-size:100px;color:var(--accent);transform:rotate(-3deg)}}
svg.ul{{left:330px;top:478px;width:240px;height:30px;color:var(--accent)}}
""", f"""
{PH}
<div class="clip z3" data-move="clipping"><img data-img="clip" alt=""><div class="credit" data-k="credit"></div></div>
<div class="tape"></div>
<div class="abs note hand z3 shadow" data-move="note"><div data-k="note1"></div><div data-k="note2"></div></div>
""", {
 'direction': "The real Graphic Online headline as a taped clipping + her raised finger (0:46) + a handwritten 'but who else can search?'",
 'titles': ["Ghana's New App Checks If Your Partner Is Already Married", "Ghana's New Marriage App Is Useful. Who Else Can Search?", "Ghana Launched a Marriage Verification App. My Honest Take"],
 'text': {'credit': 'Graphic Online · Sep 2026', 'note1': 'but who else', 'note2': 'can search?'},
 'images': {**scene('46.13'), 'clip': '../../assets/props/graphic_headline.png'}})

# ---------------------------------------------------------------- 14  yes / no (data minimisation)
D['14-yes-or-no'] = ("""
.t{--ground:#111114;--fg:#F7F5F0;--accent:#22E08A}
.hd{left:60px;top:46px;font-size:118px;color:var(--fg)}
.hd i{color:var(--accent)}
.card{position:absolute;background:#FFFDF6;border-radius:10px;color:#111114}
.full{left:60px;top:268px;width:540px;padding:24px 28px}
.full .r{display:flex;align-items:center;gap:16px;font-family:'Archivo';font-weight:700;font-size:28px;padding:10px 0;border-top:2px solid #e8e3d8}
.full .r:first-child{border-top:0}
.full .r i{display:block;height:22px;background:#cfcabd;border-radius:3px;margin-left:auto}
.full .x{position:absolute;inset:0;color:#E8352B}
.full .x path{stroke-width:10}
.yes{left:700px;top:300px;width:520px;padding:34px 36px;}
.yes .q{font-family:'Archivo';font-weight:700;font-size:34px;color:#6b6b6b}
.yes .a{font-family:'Anton';font-size:150px;line-height:1;color:#111114;margin-top:8px}
.yes .a b{color:#12965A;font-weight:400}
.mk{left:62px;top:640px;font-size:14px;color:rgba(247,245,240,.55)}
""", """
<div class="abs hd serif nw" data-move="headline"><span data-k="line1"></span> <i data-k="line2"></i></div>
<div class="card full" data-move="full">
 <div class="r"><span data-k="f1"></span><i style="width:180px"></i></div><div class="r"><span data-k="f2"></span><i style="width:140px"></i></div>
 <div class="r"><span data-k="f3"></span><i style="width:160px"></i></div><div class="r"><span data-k="f4"></span><i style="width:200px"></i></div>
 <svg class="draw x" viewBox="0 0 540 260" preserveAspectRatio="none"><path d="M30 30 L510 230"/><path d="M510 30 L30 230"/></svg></div>
<div class="card yes" data-move="answer"><div class="q" data-k="q"></div><div class="a" data-k="a"></div></div>
<div class="abs mk mono" data-k="label"></div>
""", {
 'direction': "Flat graphic on the minimum-data idea: the full record crossed out vs a single yes/no answer (illustration)",
 'titles': ["Marriage Records Should Say Yes or No, Not Your Whole Story", "How Ghana's Marriage Registry Could Protect Privacy", "A Better Design for Ghana's Public Marriage Records"],
 'text': {'line1': 'why show', 'line2': 'everything?', 'f1': 'Spouse', 'f2': 'Wedding date', 'f3': 'Divorce', 'f4': 'Court', 'q': 'Currently married?', 'a': '<b>Yes.</b>', 'label': 'Illustration'},
 'images': {}})

# ---------------------------------------------------------------- 15  two reactions split
D['15-two-reactions'] = (f"""
.t{{--ground:#0f1513;--fg:#111114;--accent:#FFD23F;{frame('311.00', 320, 360, 300, 640, 720, '--a')};{frame('95.63', 320, 360, 300, 640, 720, '--b')}}}
.half{{position:absolute;top:0;width:640px;height:720px;overflow:hidden}}
.half img{{position:absolute}}
.h1{{left:0}} .h1 img{{left:var(--ax);top:var(--ay);width:var(--aw)}}
.h2{{left:640px}} .h2 img{{left:var(--bx);top:var(--by);width:var(--bw)}}
.div{{position:absolute;left:637px;top:0;width:6px;height:720px;background:#111114}}
.lab{{top:34px;font-size:50px;background:var(--accent);color:#111114;padding:8px 18px 2px}}
.lab.a{{left:34px}} .lab.b{{left:674px}}
.cap{{top:520px;font-size:104px;color:#F7F5F0;text-shadow:0 3px 16px rgba(0,0,0,.6)}}
.cap.a{{left:44px}} .cap.b{{left:684px}}
.chip{{position:absolute;left:400px;top:330px;width:480px;background:#FFFDF6;border-radius:10px;padding:16px 22px;box-shadow:0 12px 34px rgba(0,0,0,.5);font-family:'Archivo';font-weight:700;font-size:34px;color:#111114;display:flex;align-items:center;justify-content:space-between}}
.chip em{{font-family:'DM Mono';font-style:normal;font-weight:500;font-size:13px;letter-spacing:.1em;text-transform:uppercase;color:rgba(17,17,20,.5)}}
""", """
<div class="half h1" data-move="photoL"><img data-img="left" alt=""></div><div class="half h2" data-move="photoR"><img data-img="right" alt=""></div><div class="div"></div>
<div class="abs lab a anton nw" data-k="labL"></div><div class="abs lab b anton nw" data-k="labR"></div>
<div class="abs cap a hand nw" data-k="capL"></div><div class="abs cap b hand nw" data-k="capR"></div>
<div class="chip" data-move="chip"><span data-k="chip"></span><em data-k="chipLabel"></em></div>
""", {
 'direction': "Two-sided split of her own reactions (like her saved 'Before / After' splits): the African tech fan (smile, 5:11) vs the HCI researcher (frown, 1:35)",
 'titles': ["Ghana Put Marriage Records Online. I Have Mixed Feelings", "Ghana's Public Marriage Records: Exciting and Worrying", "An HCI Researcher Reacts to Ghana's Marriage Records App"],
 'text': {'labL': 'as an African', 'labR': 'as a researcher', 'capL': 'love it!', 'capR': 'hmm… wait', 'chip': 'Ghana: divorce record found', 'chipLabel': 'illustration'},
 'images': {'left': '../../assets/scene/s_311.00.jpg', 'right': '../../assets/scene/s_95.63.jpg'}})

REJECTED = {'07-quote-card', '11-blink-records', '12-before-now', '14-yes-or-no'}  # round 1: < 8 and weakest; in archive/thumbnails-v2-rejected/
RESET = '--reset' in sys.argv
only = [a for a in sys.argv[1:] if not a.startswith('--')]
for k, (css, body, c) in D.items():
    if k in REJECTED and k not in only: continue
    if only and not any(k.startswith(o) for o in only): continue
    write(k, css, body, c); print('wrote', k)
