"""Round-4 thumbnails for ghana-marrify (2026-10-06): one per concept of the social strategist (kit/refined-kit.md, T1-T11),
the top 3 pairs first. Topic in plain words + a literal picture of it (THUMBNAILS.md RULE 0); the words are the concept's own.
  python3 tools/gen4.py               -> every direction
  python3 tools/gen4.py 03 07         -> only these prefixes
  python3 tools/gen4.py 07 --reset    -> also overwrite content.json text/images/vars (otherwise her studio edits win)
index.html is always rewritten; content.json keeps her studio edits (text, images, vars, nudge, class). Then: node render.mjs
Her photo: warmed copies of the video frames (assets/scene/warm/, tools/warm.py: colour balance only, never flipped or retouched).
Every phone screen, record card and document is a generic illustration labelled ILLUSTRATION. No real names ("[name]").
"""
import json, os, sys
T = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RESET = '--reset' in sys.argv
ONLY = [a for a in sys.argv[1:] if not a.startswith('--')]
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

def scene(f, **more): return {'scene': f'../../assets/scene/warm/s_{f}.jpg', 'front': f'../../assets/scene/warm/mask/s_{f}.png', **more}
PH = '<div class="photo z1" data-move="photo"><img data-img="scene" alt=""><div class="dim"></div></div>'
FRONT = '<div class="front"><img data-img="front" alt=""></div>'
FLAGS = '<script src="../../lib/flags.js"></script>'
MAG = lambda s=40, c='#111114': f'<svg viewBox="0 0 24 24" width="{s}" height="{s}"><circle cx="10" cy="10" r="7" fill="none" stroke="{c}" stroke-width="2.8"/><path d="M15.5 15.5 L22 22" stroke="{c}" stroke-width="2.8" stroke-linecap="round"/></svg>'

def phone(inner, cls='', move='phone', sticker=False):
    st = '<span class="flag sticker" data-flag="gh"></span>' if sticker else ''
    return (f'<div class="ph {cls}" data-move="{move}"><div class="scr"><div class="notch"></div>{inner}'
            f'<div class="ill">Illustration</div></div>{st}</div>')
HDR = '<div class="hdr"><span class="flag il" data-flag="gh"></span><span data-k="p_app"></span></div>'
QRY = f'<div class="q">{MAG(28)}<span data-k="p_q"></span><span class="cur"></span></div>'
def result(lab='p_lab', big='p_big', bars=True, bigcls='big'):
    b = '<div class="bars"><i></i><i></i><i></i></div>' if bars else ''
    return f'<div class="card"><div class="lab" data-k="{lab}"></div><div class="{bigcls}" data-k="{big}"></div>{b}</div>'
SEARCH_SCREEN = HDR + QRY + result(bars=False)

def sbar(cls='', key='s_q', move='searchbar'):
    return f'<div class="sbar {cls}" data-move="{move}">{MAG(52)}<span class="q" data-k="{key}"></span><span class="cur"></span></div>'

def record(cls='', move='record'):
    rows = ''.join(f'<div class="row"><span data-k="r_k{i}"></span><span data-k="r_v{i}"></span></div>' for i in range(1, 4))
    return (f'<div class="rec {cls}" data-move="{move}"><div class="h" data-k="r_h"></div><div class="sub" data-k="r_sub"></div>{rows}'
            f'<div class="row hot"><span data-k="r_k4"></span><span data-k="r_v4"></span></div><div class="ill">Illustration</div></div>')
REC_TXT = {'r_h': 'Marriage record', 'r_sub': 'Registry search result', 'r_k1': 'Name', 'r_v1': '[name]', 'r_k2': 'Spouse',
           'r_v2': '[name]', 'r_k3': 'Wedding', 'r_v3': '[date]', 'r_k4': 'Divorce', 'r_v4': 'On record'}

def write(name, css, body, content, flags=True):
    d = os.path.join(T, 'directions', name); os.makedirs(d, exist_ok=True)
    html = ('<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../../lib/r4.css"><style>\n'
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
    content.update(SCORES.get(name, {}))
    order = ['direction', 'concept', 'thumbnail_text', 'title', 'titles', 'scores', 'recommended', 'text', 'images', 'vars', 'nudge', 'class']
    json.dump({k: content[k] for k in order if k in content}, open(p, 'w'), indent=2, ensure_ascii=False)

# the strategist's titles (refined-kit.md section 2), checked there: 40-60 characters, keyword early, no em-dashes
TT = {
 1: "You Can Now Check If Someone Is Married in Ghana",
 2: "Check If Someone Is Married: Ghana Now Has an App",
 3: "Ghana's Marriage Records Are Now Online. Should They Be?",
 4: "Marrify: Ghana's App to Check If Someone Is Married",
 5: "Should Marriage Records Be Public? Ghana Just Made Them",
 6: "Check Marital Status Online: Ghana's New App",
 7: "Married? In Ghana, Anyone Can Now Look You Up",
 8: "Ghana Made Marriages Searchable. Anyone Can Check Yours",
 9: "Your Divorce, Searchable by Name? Ghana Just Did It",
 10: "Is He Already Married? Ghana Built an App to Check",
 11: "Ghana Put Every Marriage and Divorce Online. Good Idea?",
}

# critic scores, rounds 1-3 (NOTES.md): a = cold image-only (topic confidence 1-5 / click), b = with its title in a feed (clarity/click),
# c = taste vs her references. Recommended = passed the topic gate and the title gate (b >= 8/8) in the final round.
SCORES = {
 '01-before-you-say-yes': {'scores': 'a 4/7 · 4/7 · 3/6 | b 8/8 · 8/8 · 8/8 | c 5 · 6 · 5', 'recommended': True},
 '02-type-a-name': {'scores': 'a 3/6 · 2/4 · 3/6 | b 7/7 · 8/7 · 8/7 | c 5 · 5 · 5', 'recommended': False},
 '03-not-so-private': {'scores': 'a 3/6 · 3/5 · 4/7 | b 8/8 · 8/8 · 8/8 | c 5 · 6 · 5', 'recommended': True},
 '04-taken-or-single': {'scores': 'a 4/7 · 2/5 · 2/5 | b 9/7 · 9/7 · 9/7 | c 7 · 6 · 6', 'recommended': False},
 '05-before-the-wedding': {'scores': 'a 2/4 · 4/7 · 5/8 | b 7/6 · 9/8 · 9/7 | c 5 · 5 · 5', 'recommended': False},
 '06-even-your-divorce': {'scores': 'a 3/5 · 4/6 · 3/6 | b 8/8 · 8/7 · 8/7 | c 6 · 5 · 6', 'recommended': False},
 '07-pastor-licensed': {'scores': 'a 4/5 · 4/6 · 4/6 | b 5/6 · 6/5 · 6/6 | c 6 · 6 · 6', 'recommended': False},
 '08-anyone-can-open-it': {'scores': 'a 1/2 · 4/6 · 5/7 | b 6/6 · 8/6 · 8/6 | c 2 · 3 · 4', 'recommended': False},
 '09-even-yours': {'scores': 'a 3/5 · 3/5 · 3/6 | b 7/6 · 7/6 · 7/7 | c 5 · 5 · 5', 'recommended': False},
 '10-anyone-can-check': {'scores': 'a 5/8 · 4/7 · 4/7 | b 8/7 · 7/6 · 7/6 | c 6.5 · 7 · 6.5', 'recommended': False},
 '11-married-divorced-public': {'scores': 'a 4/6 · 5/8 · 5/8 | b 9/8 · 9/8 · 9/8 | c 7 · 7 · 7', 'recommended': True},
}
D = {}
def record_short(cls='', move='record'):
    return (f'<div class="rec short {cls}" data-move="{move}"><div class="h" data-k="r_h"></div><div class="sub" data-k="r_sub"></div>'
            f'<div class="row hot"><span data-k="r_k4"></span><span data-k="r_v4"></span></div><div class="ill">Illustration</div></div>')

# ------------------------------------------------------------------ 01  T10  BEFORE YOU SAY YES: proposal polaroid + her side-eyeing a phone
D['01-before-you-say-yes'] = (f"""
.t{{--ground:#0f1513;--fg:#F7F5F0;--accent:#FFD23F;--px:-110px;--py:-80px;--pw:1421px;--dim:.10}}
.hd{{left:36px;top:26px;z-index:4;color:var(--fg)}}
.hd .a{{display:block;font-size:108px}} .hd .b{{display:inline-block;font-size:146px;margin-top:6px}}
.pol4{{left:46px;top:372px;transform:rotate(-5deg);z-index:3}}
.pol4 .crop{{width:380px;height:290px}}
.pol4 .crop img{{left:-157px;top:-415px;width:760px}}
.ph{{left:925px;top:120px;transform:rotate(8deg) scale(.78);transform-origin:0 0}}
.ph .big{{font-size:80px}}
.pol4 img{{filter:brightness(1.12)}}
""", f"""
{PH}
{phone(SEARCH_SCREEN, 'mid')}
{FRONT}
<div class="abs hd anton shadow" data-move="headline"><span class="a" data-k="line1"></span><span class="b box" data-k="line2"></span></div>
<div class="pol4" data-move="proposal"><div class="crop"><img data-img="proposal" alt=""></div></div>
""", {
 'concept': 'T10 (top pair 1)',
 'direction': "A proposal (stock photo of hands holding an open ring box, Pexels) as a polaroid; she side-eyes the phone in her raised hand (3:14), where a marriage search says MARRIED (illustration). Follows viral sample 1 + Pinax: the proposal and the phone in one picture.",
 'thumbnail_text': 'Before you say yes',
 'titles': [TT[10], TT[1], TT[7]],
 'text': {'line1': 'Before you', 'line2': 'say yes', 'p_app': 'Marriage records', 'p_q': '[name]', 'p_lab': 'Record found', 'p_big': 'Married'},
 'images': scene('194.30', proposal='../../assets/stock/proposal_hands.jpg')})

# ------------------------------------------------------------------ 02  T7  TYPE A NAME.: eye contact, phone held out to the viewer
D['02-type-a-name'] = (f"""
.t{{--ground:#0f1513;--fg:#F7F5F0;--accent:#FFD23F;{frame('165.00', 600, 360, 400)};--dim:.12}}
.hd{{left:40px;top:34px;color:var(--fg)}}
.hd .a{{display:block;font-size:170px}} .hd .b{{display:block;font-size:170px;color:var(--accent);margin-top:-6px}}
.ph{{left:850px;top:170px;transform:rotate(-7deg) scale(1.1);transform-origin:0 0;z-index:3}}
.ph .big{{font-size:74px}}
""", f"""
{PH}
<div class="abs hd anton z1" data-move="headline"><span class="a" data-k="line1"></span><span class="b" data-k="line2"></span></div>
{FRONT}
{phone(HDR + QRY + result(bars=False), '')}
""", {
 'concept': 'T7 (top pair 2)',
 'direction': "Straight eye contact (2:45), words behind her shoulders; a phone held out towards the viewer with a name typed and the result 'Married, 2019' (illustration). Follows viral sample 8 (eye contact, the title carries it) + the phone as the object.",
 'thumbnail_text': 'Type a name.',
 'titles': [TT[7], TT[1], TT[8]],
 'text': {'line1': 'Type a', 'line2': 'name.', 'p_app': 'Marriage records', 'p_q': '[name]', 'p_lab': 'Status', 'p_big': 'Married,<br>2019'},
 'images': scene('165.00')})

# ------------------------------------------------------------------ 03  T9  NOT SO PRIVATE: a divorce paper pulled up into a search bar
D['03-not-so-private'] = (f"""
.t{{--ground:#0f1513;--fg:#F7F5F0;--accent:#D7261E;{frame('133.00', 980, 360, 380)};--dim:.16}}
.hd{{left:44px;top:22px;color:var(--fg)}}
.hd .a{{display:block;font-size:128px;font-weight:900}} .hd .b{{display:inline-block;font-size:136px;margin-top:4px;color:#fff;--boxfg:#fff}}
.sbar{{left:44px;top:322px;width:600px;height:96px;z-index:5;border-radius:20px}}
.sbar .q{{font-size:40px}} .sbar .cur{{height:46px}}
.slot{{position:absolute;left:44px;top:370px;width:620px;height:350px;overflow:hidden;z-index:4}}
.decree{{left:50px;top:-6px;transform:rotate(-4deg);padding-top:58px;width:520px;box-shadow:0 20px 40px rgba(0,0,0,.55)}}
.decree .t1{{font-size:20px}} .decree .t2{{font-size:76px}}
.decree .ill{{position:absolute;right:16px;bottom:240px;color:#a39a85}}
""", f"""
{PH}
{FRONT}
<div class="abs hd z3 shadow" data-move="headline"><span class="a play it" data-k="line1"></span><span class="b anton box" data-k="line2"></span></div>
<div class="slot" data-move="paper"><div class="decree"><div class="t1" data-k="d_t1"></div><div class="t2" data-k="d_t2"></div>
<div class="nm" data-k="d_nm"></div><div class="ln"></div><div class="ln s"></div><div class="ln"></div><div class="ill">Illustration</div></div></div>
{sbar()}
""", {
 'concept': 'T9 (top pair 3)',
 'direction': "A paper divorce decree (generic, no names) being pulled up into a search bar; she looks on, wry (2:13). 'not so' in heavy serif italic, PRIVATE in a red box (her board's red box on one word). Follows viral sample 4 (the idea drawn as one picture).",
 'thumbnail_text': 'Not so private',
 'titles': [TT[9], TT[3], TT[1]],
 'text': {'line1': 'not so', 'line2': 'PRIVATE', 's_q': 'Search a name', 'd_t1': 'Decree of', 'd_t2': 'Divorce', 'd_nm': '[name] and [name]'},
 'images': scene('133.00')})

# ------------------------------------------------------------------ 04  T1  TAKEN OR SINGLE?: huge question, she side-eyes the phone
D['04-taken-or-single'] = (f"""
.t{{--ground:#0f1513;--fg:#F7F5F0;--accent:#FFD23F;{frame('167.90', 900, 420, 400)};--dim:.14}}
.w1{{left:36px;top:24px;font-size:176px;color:var(--fg);letter-spacing:.01em}}
.w2{{left:36px;top:204px;font-size:176px;color:var(--accent);letter-spacing:.01em}}
.ph{{left:56px;top:430px;transform:rotate(-6deg) scale(.74);transform-origin:0 0;z-index:3}}
.ph .mid{{font-size:44px}}
""", f"""
{PH}
{FRONT}
<div class="abs w1 anton nw z3 shadow" data-k="line1"></div>
<div class="abs w2 anton nw z3 shadow" data-k="line2"></div>
{phone(HDR + result(bars=False, bigcls='mid'), '')}
""", {
 'concept': 'T1',
 'direction': "TAKEN OR / SINGLE? huge beside her face (viral sample 1 'FINANCIAL LITERACY'; behind her head was tried and hid 'SINGLE'); she side-eyes a phone (2:47) whose search says '1 marriage on record' (illustration). Pinax: phone with the app.",
 'thumbnail_text': 'Taken or single?',
 'titles': [TT[1], TT[6], TT[10]],
 'text': {'line1': 'Taken or', 'line2': 'single?', 'p_app': 'Marriage records', 'p_q': '[name]', 'p_lab': 'Result', 'p_big': '1 marriage on record'},
 'images': scene('167.90')})

# ------------------------------------------------------------------ 05  T2  BEFORE THE WEDDING: she peers over a search result she holds up
D['05-before-the-wedding'] = (f"""
.t{{--ground:#0f1513;--fg:#F7F5F0;--accent:#FFD23F;{frame('179.00', 900, 250, 380)};--dim:.16}}
.hd{{left:40px;top:34px;color:var(--fg)}}
.hd span{{display:block;font-size:122px;line-height:.92}} .hd .c{{color:var(--accent)}}
.res{{position:absolute;left:560px;top:318px;width:540px;transform:rotate(-3deg);z-index:4;background:#FBF7EC;padding:24px 30px 18px;box-shadow:0 24px 60px rgba(0,0,0,.5)}}
.res .top{{display:flex;align-items:center;gap:16px;font-family:'Archivo';font-weight:800;font-size:34px;color:#111114}}
.res .top .flag{{width:60px;height:40px}}
.res .k{{font-family:'DM Mono';font-weight:500;font-size:20px;letter-spacing:.14em;text-transform:uppercase;color:#7d7058;margin-top:18px}}
.res .stamp{{font-size:80px;margin-top:10px;--srot:-4deg}}
.res .ill{{margin-top:12px;text-align:right;color:#a39a85}}
""", f"""
{PH}
{FRONT}
<div class="abs hd anton z3 shadow" data-move="headline"><span data-k="line1"></span><span class="c" data-k="line2"></span></div>
<div class="res" data-move="result"><div class="top"><span class="flag il" data-flag="gh"></span><span data-k="c_t1"></span></div>
<div class="k" data-k="c_k"></div><div class="stamp" data-k="c_stamp"></div><div class="ill">Illustration</div></div>
""", {
 'concept': 'T2',
 'direction': "She peers over a printed marriage-search result she holds up (generic, no names), stamped ALREADY MARRIED, eyes to camera (2:59). Round 2 swapped the concept's certificate for the search result after the cold critic read the certificate as 'wedding paperwork'. Follows viral sample 5 (topic words big + the scene shows it).",
 'thumbnail_text': 'Before the wedding',
 'titles': [TT[2], TT[10], TT[1]],
 'text': {'line1': 'Before the', 'line2': 'wedding', 'c_t1': 'Marriage record search', 'c_k': 'Your fiancé: [name]', 'c_stamp': 'Already married'},
 'images': scene('179.00')})

# ------------------------------------------------------------------ 06  T3  EVEN YOUR DIVORCE: short record card, DIVORCE bar in red
D['06-even-your-divorce'] = (f"""
.t{{--ground:#0f1513;--fg:#F7F5F0;--accent:#D7261E;{frame('118.75', 980, 380, 390)};--dim:.14}}
.hd{{left:40px;top:28px;color:var(--fg)}}
.hd .a{{display:block;font-size:112px;font-weight:900}} .hd .b{{display:block;font-size:160px;margin-top:-4px}}
.rec{{left:46px;top:392px;transform:rotate(-3deg);z-index:3}}
""", f"""
{PH}
{FRONT}
<div class="abs hd z3 shadow" data-move="headline"><span class="a play it" data-k="line1"></span><span class="b anton" data-k="line2"></span></div>
{record_short()}
""", {
 'concept': 'T3',
 'direction': "A printed MARRIAGE RECORD card cut to one line: DIVORCE, on record, in red; she sits beside it, hands at her chin, thoughtful (1:58), like her best video's chin-on-hand pose. Follows viral samples 4 and 3 (a readable board, face beside it).",
 'thumbnail_text': 'Even your divorce',
 'titles': [TT[3], TT[9], TT[11]],
 'text': {'line1': 'even your', 'line2': 'DIVORCE', **REC_TXT},
 'images': scene('118.75')})

# ------------------------------------------------------------------ 07  T4  IS YOUR PASTOR LICENSED?: finger up beside a phone with ONE row
D['07-pastor-licensed'] = (f"""
.t{{--ground:#0f1513;--fg:#F7F5F0;--accent:#D7261E;{frame('46.13', 620, 360, 360)};--dim:.14}}
.hd{{left:40px;top:30px;color:var(--fg)}}
.hd .a{{display:block;font-size:104px}} .hd .b{{display:inline-block;font-size:132px;margin-top:8px;color:#fff;--boxfg:#fff}}
.ph{{left:940px;top:120px;transform:rotate(6deg) scale(.96);transform-origin:0 0;z-index:3}}
.ph .mid{{font-size:40px}} .ph .big{{font-size:76px}}
""", f"""
{PH}
{FRONT}
<div class="abs hd anton z3 shadow" data-move="headline"><span class="a" data-k="line1"></span><span class="b box" data-k="line2"></span></div>
{phone(HDR + '<div class="card"><div class="lab" data-k="p_lab"></div><div class="mid" data-k="p_row"></div><div class="big ok" data-k="p_big"></div></div>', '')}
""", {
 'concept': 'T4',
 'direction': "She raises a finger (0:46) beside a big phone showing ONE row: 'Officiant: Licensed ✓' (the platform also verifies licensed officiants; illustration). LICENSED? in a red box. Follows viral sample 9 ('Thought of these?' + the thing itself). For people who heard the name Marrify.",
 'thumbnail_text': 'Is your pastor licensed?',
 'titles': [TT[4], TT[1], TT[6]],
 'text': {'line1': 'Is your pastor', 'line2': 'licensed?', 'p_app': 'Marriage records', 'p_lab': 'Officiant check', 'p_row': 'Your pastor', 'p_big': 'Licensed ✓'},
 'images': scene('46.13')})

# ------------------------------------------------------------------ 08  T5  open records: old paper files spilling out of the phone in her hands
D['08-anyone-can-open-it'] = (f"""
.t{{--ground:#0f1513;--fg:#F7F5F0;--accent:#FFD23F;{frame('242.83', 400, 320, 330)};--dim:.14}}
.hd{{left:40px;top:40px;color:var(--fg);z-index:4}}
.hd .a{{display:block;font-size:104px;line-height:.95}}
.hd .b{{display:inline-block;font-size:104px;line-height:.95;margin-top:10px;padding-bottom:.08em}}
.files{{position:absolute;left:780px;top:250px;width:470px;z-index:4;transform:rotate(-4deg);filter:drop-shadow(0 26px 22px rgba(0,0,0,.6))}}
""", f"""
{PH}
{FRONT}
<img class="files" data-img="files" data-move="files" alt="">
<div class="abs hd anton shadow" data-move="headline"><span class="a" data-k="line1"></span><span class="b box" data-k="line2"></span></div>
""", {
 'concept': 'T5',
 'direction': "One image: a tied bundle of old paper government files (Pexels) held up at her hands (4:02); she looks on, unconvinced. Round 2 changed the words from 'Anyone can open it' (a cold critic could not tell what 'it' was) to name the records.",
 'thumbnail_text': 'Marriage records: open to anyone',
 'titles': [TT[5], TT[3], TT[8]],
 'text': {'line1': 'Marriage<br>records:', 'line2': 'open to<br>anyone', 'p_app': 'Marriage records', 'p_q': 'Search a name'},
 'images': scene('242.83', files='../../assets/stock/paper_bundles_cut.png')})

# ------------------------------------------------------------------ 09  T6  EVEN YOURS: phone to camera, 'Marital status: MARRIED'
D['09-even-yours'] = (f"""
.t{{--ground:#0f1513;--fg:#F7F5F0;--accent:#FFD23F;{frame('76.20', 820, 370, 390)};--dim:.12}}
.hd{{right:34px;top:60px;color:var(--fg);text-align:right}}
.hd .a{{display:block;font-size:160px}} .hd .b{{display:block;font-size:160px;color:var(--accent);margin-top:-4px}}
.ph{{left:50px;top:190px;transform:rotate(-6deg) scale(1.1);transform-origin:0 0;z-index:3}}
.ph .big{{font-size:70px}}
""", f"""
{PH}
{FRONT}
<div class="abs hd anton z3 shadow" data-move="headline"><span class="a" data-k="line1"></span><span class="b" data-k="line2"></span></div>
{phone(HDR + QRY + result(bars=False), '')}
""", {
 'concept': 'T6',
 'direction': "A phone held up to the camera, big: 'Marital status: MARRIED' for '[your name]' (illustration); she looks straight at you, unimpressed (1:16). Follows the NADRA outliers (a phone held to camera with the status) and sample 2 (one object = the result).",
 'thumbnail_text': 'Even yours',
 'titles': [TT[6], TT[7], TT[1]],
 'text': {'line1': 'Even', 'line2': 'yours', 'p_app': 'Marriage records', 'p_q': '[your name]', 'p_lab': 'Marital status', 'p_big': 'Married'},
 'images': scene('76.20')})

# ------------------------------------------------------------------ 10  T8  ANYONE CAN CHECK: the real Graphic Online headline, cut to its key phrase
D['10-anyone-can-check'] = (f"""
.t{{--ground:#0f1513;--fg:#F7F5F0;--accent:#FFD23F;{frame('273.60', 960, 330, 300)};--dim:.20}}
.news{{left:40px;top:36px;width:660px;transform:rotate(-2deg);z-index:3}}
.news .hl2{{font-size:58px;line-height:1.15}}
.hd{{left:40px;top:432px;color:var(--fg)}}
.hd .a{{display:block;font-size:118px}} .hd .b{{display:inline-block;font-size:118px;margin-top:6px}}
""", f"""
{PH}
{FRONT}
<div class="news" data-move="clipping"><div class="src" data-k="n_src"></div><div class="hl2" data-k="n_hl"></div></div>
<div class="abs hd anton z3 shadow" data-move="headline"><span class="a" data-k="line1"></span><span class="b box" data-k="line2"></span></div>
""", {
 'concept': 'T8',
 'direction': "The real Graphic Online headline (3 Sep 2026), cut to its key phrase so it reads at feed size, credited: '…verify prospective partners' marital status…' (exact words, cut with ellipses); she glances up, one eyebrow raised (4:33). Follows her board's news-clipping / tweet-card thumbnails.",
 'thumbnail_text': 'Anyone can check',
 'titles': [TT[8], TT[1], TT[5]],
 'text': {'line1': 'Anyone', 'line2': 'can check', 'n_src': 'Graphic Online · 3 Sep 2026',
          'n_hl': "“…verify <mark>prospective partners’ marital status</mark>…”"},
 'images': scene('273.60')}, False)

# ------------------------------------------------------------------ 11  T11  MARRIED? DIVORCED? PUBLIC.: sceptical face + one red record line
D['11-married-divorced-public'] = (f"""
.t{{--ground:#0f1513;--fg:#F7F5F0;--accent:#D7261E;{frame('95.63', 800, 360, 360)};--dim:.12}}
.hd{{left:40px;top:40px;color:var(--fg)}}
.hd span{{display:block;font-size:124px;line-height:.98}}
.hd .c{{display:inline-block;margin-top:14px;color:#fff;--boxfg:#fff;font-size:136px}}
.rec{{left:44px;top:470px;transform:rotate(-3deg) scale(.8);transform-origin:0 0;z-index:3}}
""", f"""
{PH}
{FRONT}
<div class="abs hd anton z3 shadow" data-move="headline"><span data-k="line1"></span><span data-k="line2"></span><span class="c box" data-k="line3"></span></div>
{record_short()}
""", {
 'concept': 'T11',
 'direction': "Three plain words stacked, PUBLIC. in a red box; her sceptical look (1:35) in her room; one prop: a record card cut to one red line, DIVORCE on record (illustration). Follows viral sample 8 (plain frame, the words carry it).",
 'thumbnail_text': 'Married? Divorced? Public.',
 'titles': ["Ghana Put Marriage and Divorce Records Online. Good Idea?", TT[11], TT[3]],
 'text': {'line1': 'Married?', 'line2': 'Divorced?', 'line3': 'Public.', **REC_TXT},
 'images': scene('95.63')})

for name, v in D.items():
    if ONLY and not any(name.startswith(o) for o in ONLY): continue
    css, body, content = v[0], v[1], v[2]
    write(name, css, body, content, v[3] if len(v) > 3 else True)
    print('wrote', name)
