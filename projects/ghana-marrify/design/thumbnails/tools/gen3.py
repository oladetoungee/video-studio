"""Round-3 thumbnails for ghana-marrify (2026-10-06): TOPIC in plain words + a LITERAL picture of the topic (THUMBNAILS.md RULE 0).
  python3 tools/gen3.py               -> every direction
  python3 tools/gen3.py 03 07         -> only these prefixes
  python3 tools/gen3.py 07 --reset    -> also overwrite content.json text/images/vars (otherwise her studio edits win)
index.html is always rewritten; content.json keeps her studio edits (text, images, vars, nudge, class). Then: node render.mjs
Wording: every thumbnail text passed the cold wording gate (NOTES.md). Search UI, phone and certificate are generic illustrations.
"""
import json, os, sys
T = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RESET = '--reset' in sys.argv
ONLY = [a for a in sys.argv[1:] if not a.startswith('--')]
CUT = {}   # directions cut after critic round 1 (kept for the record; folders in archive/thumbnails-v3-cut/)
FACES = {}
for l in open(os.path.join(T, 'tools', 'faces.txt')):
    f, x, y, w = l.split(); FACES[f[2:-4]] = (float(x), float(y), float(w))

def frame(f, cx, cy, fw, W=1280, H=720):
    """photo vars: face centre at (cx, cy), face width fw px, photo always covering the frame"""
    x, y, w = FACES[f]
    pw = max(fw / w, W, H * 16 / 9); ph = pw * 9 / 16
    px = cx - (x + w / 2) * pw; py = cy - (y * ph + w * pw / 2)
    px = min(0, max(W - pw, px)); py = min(0, max(H - ph, py))
    return f'--px:{px:.0f}px;--py:{py:.0f}px;--pw:{pw:.0f}px'

def scene(f, **more): return {'scene': f'../../assets/scene/s_{f}.jpg', 'front': f'../../assets/scene/mask/s_{f}.png', **more}
def cut(f, **more): return {'front': f'../../assets/scene/mask/s_{f}.png', **more}
PH = '<div class="photo z1" data-move="photo"><img data-img="scene" alt=""><div class="dim"></div></div>'
FRONT = '<div class="front"><img data-img="front" alt=""></div>'
FLAGS = '<script src="../../lib/flags.js"></script>'
MAG = lambda s=40, c='#111114': f'<svg viewBox="0 0 24 24" width="{s}" height="{s}"><circle cx="10" cy="10" r="7" fill="none" stroke="{c}" stroke-width="2.8"/><path d="M15.5 15.5 L22 22" stroke="{c}" stroke-width="2.8" stroke-linecap="round"/></svg>'

def phone(cls='', move='phone', found=False):
    st = 'stamp found' if found else 'stamp'
    return f'''<div class="phone {cls}" data-move="{move}"><div class="scr"><div class="notch"></div>
<div class="app"><span class="flag il" data-flag="gh"></span><span data-k="p_app"></span></div>
<div class="sb">{MAG(30)}<span data-k="p_q"></span></div>
<div class="res"><div class="rl" data-k="p_rl"></div><div class="{st}" data-k="p_res"></div><div class="bars"><i></i><i></i><i></i></div></div>
<div class="ill">Illustration</div></div></div>'''
PHONE_TXT = {'p_app': 'Marriage records', 'p_q': 'Search a name', 'p_rl': 'Record found', 'p_res': 'Married'}
PHONE_FOUND = {**PHONE_TXT, 'p_rl': 'Result', 'p_res': 'Found ✓'}   # no second MARRIED when the headline already says it

def sbar(cls='', go=True):
    g = '<div class="go" data-k="s_go"></div>' if go else ''
    return f'<div class="sbar {cls}" data-move="searchbar">{MAG(52)}<span class="q" data-k="s_q"></span><span class="cur"></span>{g}</div>'

CERT = '''<div class="cert" data-move="certificate"><div class="in">
<div class="t1" data-k="c_t1"></div><div class="t2" data-k="c_t2"></div>
<div class="ln">This certifies that <b>[name]</b></div><div class="ln">and <b>[name]</b></div><div class="ln">were married on <b>[date]</b></div>
<div class="seal"></div><div class="stamp" data-k="c_stamp"></div></div><div class="ill">Illustration</div></div>'''
CERT_TXT = {'c_t1': 'Republic · Registry', 'c_t2': 'Certificate of Marriage', 'c_stamp': 'Married'}

def write(name, css, body, content, flags=True):
    d = os.path.join(T, 'directions', name); os.makedirs(d, exist_ok=True)
    html = ('<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../../lib/r3.css"><style>\n'
            + css.strip() + '\n</style></head><body><div class="t">\n' + body.strip()
            + '\n</div>' + (FLAGS if flags else '') + '<script src="../../lib/bind.js"></script></body></html>\n')
    open(os.path.join(d, 'index.html'), 'w').write(html)
    p = os.path.join(d, 'content.json')
    content.setdefault('vars', {}); content['title'] = content['titles'][0]
    if os.path.exists(p) and not RESET:
        old = json.load(open(p))
        for k in ('text', 'images', 'vars'): content[k] = {**content.get(k, {}), **old.get(k, {})}
        for k in ('nudge', 'class'):
            if k in old: content[k] = old[k]
        if old.get('title') and old['title'] not in content['titles']: content['title'] = old['title']
    order = ['direction', 'thumbnail_text', 'title', 'titles', 'text', 'images', 'vars', 'nudge', 'class']
    json.dump({k: content[k] for k in order if k in content}, open(p, 'w'), indent=2, ensure_ascii=False)

D = {}

D = {}
# ------------------------------------------------------------------ 01  MARRIED? behind her head + a search sticker
D['01-already-married'] = (f"""
.t{{--ground:#0f1513;--fg:#F7F5F0;--accent:#FFD23F;{frame('95.63', 900, 380, 330)};--dim:.30}}
.l1{{left:50px;top:70px;font-size:84px;color:var(--fg)}}
.l1 .flag{{width:96px;height:64px;margin-right:18px;vertical-align:2px}}
.l2{{left:44px;top:178px;font-size:158px;color:var(--accent);letter-spacing:-.01em}}
.sbar{{left:44px;top:560px;width:596px;height:100px;transform:rotate(-2deg);padding-right:24px;background:#FFFDF6}}
.sbar .q{{font-size:40px}} .sbar .cur{{height:48px}}
.illb{{left:58px;top:668px;color:rgba(255,255,255,.7)}}
""", f"""
{PH}
<div class="abs l1 play it nw z1 shadow" data-move="line1"><span class="flag il" data-flag="gh"></span><span data-k="line1"></span></div>
<div class="abs l2 anton nw z1" data-k="line2"></div>
{FRONT}
{sbar('z3', False)}
<div class="abs ill illb z3">Illustration</div>
""", {
 'direction': "Her sceptical look (1:35) in her room; her face big on the right, 'is he already / MARRIED?' fully readable on the left (italic serif over condensed caps, like 'Capsule wardrobe' / 'THIS IS WAR' on her board); Ghana flag on the hook line; a search-bar sticker (illustration)",
 'thumbnail_text': 'Is he already married?',
 'titles': ["Ghana Launched an App to Check If Someone Is Married", "You Can Now Look Up Marriages in Ghana. Should You?", "Ghana's New Marriage Search App: Good Idea or Privacy Risk?"],
 'text': {'line1': 'is he already', 'line2': 'MARRIED?', 's_q': "Search Ghana's records"},
 'images': scene('95.63')})

# ------------------------------------------------------------------ 02  paper ground + editorial + red box, her in a photo panel, phone
CUT['02-check-if-married'] = ("""
.t{--ground:#EDE9E2;--fg:#111114;--accent:#D7261E;--boxfg:#fff}
.panel{position:absolute;left:720px;top:0;width:560px;height:720px;overflow:hidden}
.panel img{position:absolute;left:-420px;top:-20px;width:1340px}
.hd{left:52px;top:52px;color:var(--fg)}
.hd .a{font-size:118px;display:block} .hd .b{font-size:118px;display:block;margin-top:2px}
.hd .c{display:inline-block;margin-top:16px;font-size:112px}
.gh{left:56px;top:448px;display:flex;align-items:center;gap:16px;font-size:34px;color:#111114}
.gh .flag{width:78px;height:52px}
.phone{left:540px;top:452px;transform:rotate(-7deg) scale(.56);z-index:3}
""", f"""
<div class="panel" data-move="photo"><img data-img="scene" alt=""></div>
<div class="abs hd z3" data-move="headline"><span class="a serif" data-k="line1"></span><span class="b serif it" data-k="line2"></span><span class="c ablack box" data-k="line3"></span></div>
<div class="abs gh mono z3" data-move="ghana"><span class="flag il" data-flag="gh"></span><span data-k="tag"></span></div>
{phone(found=True)}
""", {
 'direction': "Flat warm paper + a hard-edged photo panel of her in her room (hand over mouth, 1:04); editorial serif + one red highlight box (her board: 'Why You're Stuck'); a phone search returning 'Found' (illustration)",
 'thumbnail_text': "Check if someone's married",
 'titles': ["Ghana Put Its Marriage Records on an App. Is That OK?", "Should Anyone Be Able to Look Up Your Marriage?", "I Like Ghana's New Marriage App. Here's My One Worry"],
 'text': {'line1': 'Check if', 'line2': "someone's", 'line3': 'MARRIED', 'tag': 'New in Ghana', **PHONE_FOUND},
 'images': {'scene': '../../assets/scene/s_64.13.jpg'}})

# ------------------------------------------------------------------ 03  SEARCHABLE behind her head + a search card
CUT['03-ghana-searchable'] = (f"""
.t{{--ground:#0f1513;--fg:#F7F5F0;--accent:#FFD23F;{frame('185.13', 980, 400, 400)};--dim:.34}}
.l1{{left:50px;top:66px;font-size:72px;color:var(--fg)}}
.l1 .flag{{width:96px;height:64px;margin:0 16px 0 0;vertical-align:-2px}}
.l2{{left:44px;top:162px;font-size:128px;color:var(--accent)}}
.sbar{{left:50px;top:400px;width:600px;height:104px;transform:rotate(-2deg);padding-right:16px;background:#FFFDF6}}
.sbar .q{{font-size:40px}} .sbar .cur{{height:46px}}
.sbar .stamp{{margin-left:auto;font-size:46px;--srot:-6deg}}
.illb{{left:58px;top:516px;color:rgba(255,255,255,.7)}}
""", f"""
{PH}
<div class="abs l1 serif nw z1 shadow" data-move="line1"><span class="flag il" data-flag="gh"></span><span data-k="line1"></span></div>
<div class="abs l2 anton nw z1" data-k="line2"></div>
{FRONT}
<div class="sbar z3" data-move="searchbar">{MAG(48)}<span class="q" data-k="s_q"></span><span class="cur"></span><span class="stamp" data-k="res"></span></div>
<div class="abs ill illb z3">Illustration</div>
""", {
 'direction': "One plain statement: 'Ghana made marriages SEARCHABLE' on the left, her raised-hand 'hmm' moment (3:05) big on the right; one prop: a search bar returning MARRIED (illustration)",
 'thumbnail_text': 'Ghana made marriages searchable',
 'titles': ["Should Anyone Be Able to Look Up Your Marriage?", "I Love Ghana's New Marriage App. One Thing Worries Me", "Is Ghana's New Marriage Search App a Good Idea?"],
 'text': {'line1': 'Ghana made marriages', 'line2': 'SEARCHABLE', 's_q': 'Search a name', 'res': 'Married'},
 'images': scene('185.13')})

# ------------------------------------------------------------------ 04  the real Graphic Online headline + her raised finger
CUT['04-news-headline'] = (f"""
.t{{--ground:#0f1513;--fg:#F7F5F0;--accent:#FFD23F;{frame('46.13', 930, 330, 250)};--dim:.30}}
.clip{{left:40px;top:52px;width:500px;padding:18px 20px 12px;transform:rotate(-3deg);box-shadow:0 6px 14px rgba(0,0,0,.25),0 18px 40px rgba(0,0,0,.3)}}
.clip .credit{{margin-top:10px;color:#6b6b6b;font-size:12px}}
.tape{{left:230px;top:36px;transform:rotate(4deg);z-index:4}}
.big{{left:44px;top:402px;color:var(--fg)}}
.big .a{{display:block;font-size:80px}} .big .b{{display:inline-block;font-size:112px;margin-top:8px}}
""", f"""
{PH}
{FRONT}
<div class="clip z3" data-move="clipping"><img data-img="clip" alt=""><div class="credit" data-k="credit"></div></div>
<div class="tape"></div>
<div class="abs big z3" data-move="headline"><span class="a play it shadow" data-k="line1"></span><span class="b anton box" data-k="line2"></span></div>
""", {
 'direction': "News-led: the real Graphic Online headline (3 Sep 2026) as a taped clipping, credited; the topic in condensed caps with one yellow box (her board: 'JOBS ARE DEAD'); her raised finger (0:46)",
 'thumbnail_text': "Ghana's new marriage check",
 'titles': ["Ghana's Marriage Verification App: Great Idea, Big Question", "Should Anyone Be Able to Look Up Your Marriage?", "I Like This New App From Ghana. I Also Have Questions"],
 'text': {'line1': "Ghana's new", 'line2': 'MARRIAGE CHECK', 'credit': 'Graphic Online · 3 Sep 2026'},
 'images': scene('46.13', clip='../../assets/props/graphic_headline.png')}, False)

# ------------------------------------------------------------------ 05  before / after: paper records -> phone, her photo on the "now" side
CUT['05-records-online'] = ("""
.t{--ground:#111114;--fg:#F7F5F0;--accent:#FFFFFF}
.left{position:absolute;left:0;top:0;width:640px;height:720px;overflow:hidden}
.left img{width:100%;height:100%;object-fit:cover;object-position:50% 70%;filter:saturate(.85) brightness(.82)}
.right{position:absolute;left:640px;top:0;width:640px;height:720px;background:#FCD116}
.lab{top:24px;font-size:28px;color:#fff;background:#111114;padding:8px 14px}
.lab.l{left:24px} .lab.r{left:664px}
.hd{left:0;right:0;top:96px;text-align:center;z-index:5}
.hd span{display:inline-block;background:#111114;color:#fff;font-size:96px;padding:10px 26px 14px}
.hd .b{background:#fff;color:#111114;font-size:118px;margin-top:-4px;transform:rotate(-2deg)}
.phone{left:560px;top:300px;transform:rotate(-5deg) scale(.74);z-index:4}
.pol{left:960px;top:356px;width:270px;transform:rotate(5deg);padding-bottom:12px;z-index:3}
.pol .crop{width:246px;height:250px;overflow:hidden;position:relative}
.pol .crop img{position:absolute;width:780px;left:-262px;top:-60px}
""", f"""
<div class="left" data-move="paper"><img data-img="paper" alt=""></div>
<div class="right"></div>
<div class="abs lab l mono z3" data-k="before"></div><div class="abs lab r mono z3" data-k="after"></div>
<div class="abs hd bric" data-move="headline"><span class="a" data-k="line1"></span><br><span class="b" data-k="line2"></span></div>
<div class="pol" data-move="her"><div class="crop"><img data-img="her" alt=""></div></div>
{phone(found=True)}
""", {
 'direction': "Before / after split (her saved 'Before / After', 'Day 1 / Day 900'): bundles of paper records (stock) vs a phone search on Ghana yellow, with her smiling photo (5:11) as an insert; Bricolage in black and white boxes",
 'thumbnail_text': 'Marriage records: now online',
 'titles': ["Ghana Launched an App to Check If Someone Is Married", "Anyone Can Now Check If You're Married in Ghana", "Ghana's New Marriage App Is a Big Step. Here's My One Worry"],
 'text': {'line1': 'Marriage records', 'line2': 'now online', 'before': 'Before', 'after': 'Now', **PHONE_FOUND},
 'images': {'paper': '../../assets/stock/paper_bundles.jpg', 'her': '../../assets/scene/s_311.00.jpg'}})

# ------------------------------------------------------------------ 08  'Check before YOU MARRY' + phone, flag on the hook line
CUT['08-check-before-you-marry'] = (f"""
.t{{--ground:#0f1513;--fg:#F7F5F0;--accent:#FFD23F;{frame('205.08', 560, 340, 220)};--dim:.30}}
.hd{{left:50px;top:44px;color:var(--fg)}}
.hd .a{{display:block;font-size:96px}} .hd .a .flag{{width:90px;height:60px;margin-right:18px;vertical-align:8px}}
.hd .b{{display:inline-block;font-size:116px;margin-top:8px}}
.phone{{left:950px;top:200px;height:470px;transform:rotate(8deg) scale(.7);box-shadow:0 30px 60px rgba(0,0,0,.55)}}
.phone .res .rl, .phone .res .bars{{display:none}} .phone .res{{text-align:center;padding:26px 10px}} .phone .stamp{{font-size:70px;margin:0}}
""", f"""
{PH}
{FRONT}
<div class="abs hd z3 shadow" data-move="headline"><span class="a serif it"><span class="flag il" data-flag="gh"></span><span data-k="line1"></span></span><span class="b anton box" data-k="line2"></span></div>
{phone('z3')}
""", {
 'direction': "Her open-palm 'wait' moment (3:25) in her room; 'Check before / YOU MARRY' with the Ghana flag on the hook line; a phone search stamped MARRIED (illustration)",
 'thumbnail_text': 'Check before you marry',
 'titles': ["Ghana's New App Shows If Your Partner Is Already Married", "Would You Look Up Your Partner on Ghana's New App?", "Ghana's New Marriage Search App: Useful or Too Much?"],
 'text': {'line1': 'Check before', 'line2': 'YOU MARRY', **PHONE_TXT},
 'images': scene('205.08')})

# ------------------------------------------------------------------ 09  stacks of records + search bar + her photo
CUT['09-every-marriage'] = (f"""
.t{{--ground:#16110c;--fg:#F7F5F0;--accent:#FFD23F}}
.bg{{position:absolute;inset:0}} .bg img{{width:100%;height:100%;object-fit:cover;object-position:50% 60%;filter:brightness(.8) saturate(.9)}}
.bg::after{{content:'';position:absolute;inset:0;background:rgba(14,10,6,.32)}}
.hd{{left:56px;top:40px;color:var(--fg)}}
.hd .a{{display:block;font-size:100px}} .hd .a .flag{{width:84px;height:56px;margin-right:16px;vertical-align:6px}}
.hd .b{{display:block;font-size:146px;color:var(--accent);margin-top:-2px}}
.sbar{{left:56px;top:470px;width:640px;height:104px}}
.sbar .q{{font-size:46px}}
.pol{{left:900px;top:300px;width:320px;transform:rotate(4deg);padding-bottom:12px;z-index:3}}
.pol .crop{{width:296px;height:300px;overflow:hidden;position:relative}}
.pol .crop img{{position:absolute;width:900px;left:-328px;top:-50px}}
.illb{{left:60px;top:590px;color:rgba(255,255,255,.65)}}
""", f"""
<div class="bg" data-move="records"><img data-img="files" alt=""></div>
<div class="abs hd z3 shadow" data-move="headline"><span class="a serif it"><span class="flag il" data-flag="gh"></span><span data-k="line1"></span></span><span class="b anton" data-k="line2"></span></div>
{sbar('z3', False)}
<div class="pol" data-move="her"><div class="crop"><img data-img="her" alt=""></div></div>
<div class="abs ill illb z3">Illustration</div>
""", {
 'direction': "A real stack of old paper records (stock) full-bleed, one search bar across it, her sceptical hand-at-face look (0:56) as a photo insert; serif italic + yellow condensed caps, flag on the first line",
 'thumbnail_text': 'Every marriage, one search away',
 'titles': ["Ghana Put Its Marriage and Divorce Records on an App", "Should Anyone Be Able to Look Up Your Marriage?", "Ghana's Records App: Great Idea, Real Privacy Question"],
 'text': {'line1': 'Every marriage,', 'line2': 'ONE SEARCH AWAY', 's_q': 'Search a name'},
 'images': {'files': '../../assets/stock/file_stack.jpg', 'her': '../../assets/scene/s_56.17.jpg'}})

# ------------------------------------------------------------------ 10  MARRIED? / DIVORCED? cards above her hands + Ghana search bar
CUT['10-married-divorced'] = (f"""
.t{{--ground:#0f1513;--fg:#F7F5F0;--accent:#FFD23F;{frame('123.00', 640, 320, 220)};--dim:.30}}
.card{{position:absolute;background:#FBF6E9;padding:20px 22px;box-shadow:0 16px 40px rgba(0,0,0,.45)}}
.c1 .stamp{{font-size:88px}} .c2 .stamp{{font-size:60px;--stamp:#1B3FD8;--srot:5deg}}
.c1{{left:86px;top:100px;transform:rotate(-8deg)}} .c2{{left:850px;top:116px;transform:rotate(7deg)}}
.sbar{{left:280px;top:600px;width:720px;height:92px;padding-right:18px}}
.sbar .q{{font-size:44px}}
.illb{{left:290px;top:698px;color:rgba(255,255,255,.7)}}
.sbar .flag{{position:relative;width:72px;height:48px;margin-left:auto;box-shadow:none}}
""", f"""
{PH}
<div class="card c1 mid" data-move="married"><span class="stamp" data-k="st1"></span></div>
<div class="card c2 mid" data-move="divorced"><span class="stamp" data-k="st2"></span></div>
{FRONT}
<div class="sbar z3" data-move="searchbar">{MAG(52)}<span class="q" data-k="s_q"></span><span class="cur"></span><span class="flag" data-flag="gh"></span></div>
<div class="abs ill illb z3">Illustration</div>
""", {
 'direction': "Both her hands up, eyes to the side (2:03): a big MARRIED? card and a smaller DIVORCED? card by her hands; a search bar typed 'Search Ghana's records' with the flag (illustration)",
 'thumbnail_text': "Married? Divorced? Search Ghana's records",
 'titles': ["Should Your Divorce Be One Search Away?", "Ghana Put Marriage Records on an App. Should It?", "Ghana's New Records App: Great Idea, Real Privacy Risk"],
 'text': {'st1': 'Married?', 'st2': 'Divorced?', 's_q': "Search Ghana's records"},
 'images': scene('123.00')})

# ------------------------------------------------------------------ 06  certificate + search bar, her earnest look
CUT['06-status-searchable'] = (f"""
.t{{--ground:#0f1513;--fg:#F7F5F0;--accent:#FFD23F;{frame('131.63', 990, 330, 270)};--dim:.38}}
.hd{{left:48px;top:36px;color:var(--fg)}}
.hd .a{{display:block;font-size:84px}} .hd .b{{display:block;font-size:136px;color:var(--accent);margin-top:-4px}}
.cert{{left:64px;top:356px;transform:rotate(-4deg) scale(.86);transform-origin:0 0}}
.cert .ill{{top:auto;bottom:-24px}}
.sbar{{left:110px;top:300px;height:90px;transform:rotate(-4deg);z-index:4;padding-right:30px}}
.sbar .q{{font-size:38px}} .sbar .cur{{height:44px}}
""", f"""
{PH}
{FRONT}
<div class="abs hd z3 shadow" data-move="headline"><span class="a serif it" data-k="line1"></span><span class="b anton" data-k="line2"></span></div>
<div class="z3" style="position:absolute;inset:0">{CERT}</div>
{sbar('', False)}
""", {
 'direction': "A marriage certificate (illustration, no names) stamped MARRIED, a search bar laid across it, her earnest look (2:11) in the room; serif italic + condensed caps",
 'thumbnail_text': 'Marriage status: searchable',
 'titles': ["Ghana's New App Lets Anyone Check If You're Married", "Ghana Put Marriage and Divorce Records on One App", "Should Anyone Be Able to Look Up Your Marriage?"],
 'text': {'line1': 'Marriage status:', 'line2': 'SEARCHABLE', 's_q': 'Search a name', **CERT_TXT},
 'images': scene('131.63')})

# ------------------------------------------------------------------ 07  the film's Blink world: search bar + record character
CUT['07-one-search'] = ("""
.t{--ground:#F4F4F4;--fg:#111114;--accent:#16A34A}
.hd{left:0;right:0;top:50px;text-align:center;font-size:98px;color:var(--fg)}
.hd .acc{color:var(--accent)}
.sbar{left:110px;top:210px;width:1060px;box-shadow:0 14px 40px rgba(0,0,0,.12)}
.sbar .go{--go:#FF4713}
.critter{left:170px;top:372px;width:260px;height:325px}
.critter2{left:840px;top:452px;width:200px;height:250px}
.say{left:470px;top:470px;font-size:64px;background:#fff;color:#111114;padding:18px 26px;border-radius:18px;box-shadow:0 10px 30px rgba(0,0,0,.12)}
.say .stamp{font-size:80px;margin-left:10px;vertical-align:-6px;--srot:-5deg}
.gh{left:372px;top:350px;width:110px;height:74px;transform:rotate(10deg)}
.illb{right:24px;bottom:16px;color:#9a958a}
""", f"""
<div class="abs hd isans nw" data-move="headline"><span data-k="line1"></span> <span class="acc" data-k="line2"></span></div>
{sbar()}
<svg class="abs critter" data-move="record" viewBox="0 0 200 250"><path d="M0 0 H150 L200 50 V250 H0 Z" fill="#E8352B"/><path d="M150 0 V50 H200 Z" fill="#B3261E"/><ellipse cx="62" cy="120" rx="30" ry="34" fill="#fff"/><ellipse cx="138" cy="120" rx="30" ry="34" fill="#fff"/><circle cx="74" cy="126" r="15" fill="#111114"/><circle cx="150" cy="126" r="15" fill="#111114"/></svg>
<div class="abs say" data-move="answer"><span data-k="ans1"></span><span class="stamp" data-k="ans2"></span></div>
<span class="flag gh" data-flag="gh" data-move="flag"></span>
<div class="abs ill illb">Illustration</div>
""", {
 'direction': "Faceless, in the film's own 'Blink' world (white ground, record characters with eyes): a giant search bar, the certificate character answering MARRIED; Ghana flag",
 'thumbnail_text': 'Married or not? One search.',
 'titles': ["Ghana's New App Tells You If Someone Is Married", "Ghana Launched a Marriage Search App. Here's What Worries Me", "A Public Marriage Search in Ghana: Smart or Too Much?"],
 'text': {'line1': 'Married or not?', 'line2': 'One search.', 's_q': '[name]', 's_go': 'Search', 'ans1': 'Record found:', 'ans2': 'Married'},
 'images': {}})

# ------------------------------------------------------------------ 11  Ghana flag on the wall behind her + phone
CUT['11-ghana-check-any'] = (f"""
.t{{--ground:#0f1513;--fg:#F7F5F0;--accent:#FFD23F;{frame('311.00', 760, 360, 230)};--dim:.26}}
.wall{{left:610px;top:-10px;width:330px;height:220px;transform:rotate(-3deg)}}
.hd{{left:44px;top:40px;color:var(--fg)}}
.hd .a{{display:block;font-size:150px}} .hd .b{{display:block;font-size:108px;margin-top:4px}}
.hd .b em{{font-style:normal;color:var(--accent)}}
.phone{{left:1000px;top:226px;transform:rotate(8deg) scale(.82)}}
""", f"""
{PH}
<span class="flag wall mid" data-flag="gh" data-move="flag"></span>
{FRONT}
<div class="abs hd z3 shadow" data-move="headline"><span class="a anton" data-k="line1"></span><span class="b serif it" data-k="line2"></span></div>
{phone('z3')}
""", {
 'direction': "The Ghana flag pinned on the wall behind her (she sits in front of it), her smile (5:11), a phone with a marriage search (illustration); condensed GHANA + serif italic",
 'thumbnail_text': 'Ghana: check any marriage',
 'titles': ["Ghana's New App Lets Anyone Look Up a Marriage", "I Love This Idea From Ghana. I Also Have Questions", "Ghana's Marriage Search App: What It Gets Right (and Wrong)"],
 'text': {'line1': 'GHANA:', 'line2': 'check <em>any</em> marriage', **PHONE_TXT},
 'images': scene('311.00')})

# ------------------------------------------------------------------ 12  clean white-and-red editorial, her cut-out + phone
CUT['12-marriage-search-app'] = ("""
.t{--ground:#FFFFFF;--fg:#111114;--accent:#D7261E;--px:250px;--py:160px;--pw:1000px}
.k{left:0;right:0;top:20px;text-align:center;font-size:84px;color:var(--fg)}
.k .flag{width:80px;height:54px;margin-right:14px;vertical-align:2px}
.big{left:-10px;right:-10px;top:104px;text-align:center;font-size:146px;color:var(--accent);letter-spacing:-.045em}
.front{z-index:2}
.phone{left:930px;top:300px;transform:rotate(10deg) scale(.78);z-index:3}
.rings{left:60px;top:470px;width:330px;z-index:3;filter:drop-shadow(0 14px 18px rgba(0,0,0,.3))}
""", f"""
<div class="abs k serif it nw z3" data-move="kicker"><span class="flag il" data-flag="gh"></span><span data-k="line1"></span></div>
<div class="abs big bric nw z1" data-k="line2"></div>
{FRONT}
{phone()}
<img class="abs rings" data-img="rings" data-move="rings" alt="">
""", {
 'direction': "Clean white-and-red editorial (her board: 'how to be consistent', 'no one cares.'): 'Ghana's' + huge red 'marriage search app' behind her cut-out (2:48), phone search + real rings (stock)",
 'thumbnail_text': "Ghana's marriage search app",
 'titles': ["Anyone Can Now Check If You're Married in Ghana", "I Like Ghana's New Marriage App. Here's My One Worry", "Ghana Launched Marrify. Should Marriage Records Be Public?"],
 'text': {'line1': "Ghana's new", 'line2': 'marriage search app', **PHONE_TXT},
 'images': cut('185.13', rings='../../assets/stock/rings_cut.png')})

for name, v in D.items():
    if ONLY and not any(name.startswith(o) for o in ONLY): continue
    css, body, content = v[0], v[1], v[2]
    write(name, css, body, content, v[3] if len(v) > 3 else True)
    print('wrote', name)
