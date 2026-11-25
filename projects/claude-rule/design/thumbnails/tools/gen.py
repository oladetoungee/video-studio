"""claude-rule thumbnails (2026-10-13): the refined kit's thumbnail concepts (kit/refined-kit.md section 3), built in the
film's Thread look (lilac #CDBFF3 / ink #15131C, Schibsted Grotesk 900, IBM Plex Mono) on her real room (4K frames, warmed
lightly by tools/warm.py, never flipped, never retouched).
  python3 tools/gen.py               -> every direction
  python3 tools/gen.py 03 07         -> only these prefixes
  python3 tools/gen.py 07 --reset    -> also overwrite content.json text/images/vars (otherwise her studio edits win)
index.html is always rewritten; content.json keeps her studio edits (text, images, vars, nudge, class). Then: node render.mjs
Rules: every chat window / phone / laptop is a generic drawing labelled ILLUSTRATION (no logo, the word "Claude" in plain
type); the model never says anything (only system lines like "This chat has ended"); the cruel user message is always
blurred; Anthropic's page is a real screenshot with a source line.
"""
import json, os, sys
T = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
RESET = '--reset' in sys.argv
ONLY = [a for a in sys.argv[1:] if not a.startswith('--')]

# face boxes in the 3840x2160 frames (tools/faces.swift): x, y, w
FACES = {'0.7': (1605, 703, 717), '9.3': (1714, 731, 734), '12.7': (1663, 707, 728), '13.3': (1628, 727, 735),
         '20.7': (1682, 716, 729), '76.3': (1593, 788, 702), '99.2': (1806, 652, 784), '111.3': (1979, 701, 701),
         '116.3': (1612, 755, 750), '165.3': (1590, 801, 689), '241.3': (1604, 741, 693), '247.8': (1704, 767, 706),
         '256.7': (1684, 828, 553), '261.7': (1545, 806, 701), '262.3': (1532, 788, 713), '270.8': (1562, 777, 730),
         '271.5': (1481, 611, 838)}

def photo(t, cx, top, fw, x0=0, x1=1280):
    """her photo: face centre at x=cx, face-box top at y=top, face width fw (px); covers x0..x1 (clipped there)."""
    fx, fy, w = FACES[t]; k = fw / w
    k = max(k, (x1 - x0) / 3840, 720 / 2160)
    pw, ph = 3840 * k, 2160 * k
    px = cx - (fx + w / 2) * k; py = top - fy * k
    px = min(x0, max(x1 - pw, px)); py = min(0, max(720 - ph, py))
    v = f'--px:{px:.0f}px;--py:{py:.0f}px;--pw:{pw:.0f}px'
    if x0 > 0 or x1 < 1280:
        v += f';--clip:inset(0px {px + pw - x1:.0f}px 0px {x0 - px:.0f}px)'
    return v

def imgs(t, **more):
    return {'scene': f'../../assets/scene/s_{t}.jpg', 'cut': f'../../assets/cut/c_{t}.png', **more}

PH = '<img class="bg" data-img="scene" data-move="photo" alt="">'
FG = '<img class="fg" data-img="cut" data-move="photo" alt="">'

def win(move='chat', style='', body='', name='chat_name', inp='chat_in', cls=''):
    return (f'<div class="win {cls}" data-move="{move}" style="{style}"><div class="hd"><span class="nm" data-k="{name}"></span>'
            f'</div><div class="bd">{body}</div>'
            f'<div class="in"><span data-k="{inp}"></span></div></div>')
RUDE = '<div class="bub rude"><span data-k="rude"></span></div>'
RUDE2 = '<div class="bub rude"><span data-k="rude2"></span></div>'
RUDE3 = '<div class="bub rude"><span data-k="rude3"></span></div>'
SOFT = '<div class="bub soft" data-k="soft"></div>'
END = '<div class="endbar" data-k="ended"></div>'
CHAT_TXT = {'chat_name': 'Claude', 'chat_in': 'You can start a new chat', 'rude': 'YOU ARE USELESS, ANSWER ME NOW',
            'ended': 'This chat has ended'}

def phone(inner, style='', move='phone'):
    return f'<div class="phone" data-move="{move}" style="{style}"><div class="scr"><div class="notch"></div>{inner}</div></div>'

def laptop(inner, style='', move='laptop'):
    return f'<div class="laptop" data-move="{move}" style="{style}"><div class="lid">{inner}</div><div class="base"></div></div>'

SEC_MARKS = ('<i class="mark" style="left:38.9%;top:27.5%;width:57.3%;height:12.5%"></i>'
             '<i class="mark" style="left:2.2%;top:42.5%;width:24%;height:12.5%"></i>')
def shot(img, src_key='src', style='', move='page', marks=''):
    return (f'<div class="shot" data-move="{move}" style="{style}"><div style="position:relative"><img data-img="{img}" alt="">{marks}</div>'
            f'<div class="src" data-k="{src_key}"></div></div>')
SRC = 'Screenshot · anthropic.com · 8 Oct 2026'

def hl(keys, style, move='headline', cls='hl'):
    return f'<div class="{cls}" data-move="{move}" style="{style}">' + ''.join(f'<div data-k="{k}"></div>' for k in keys) + '</div>'

def write(name, css, body, content):
    d = os.path.join(T, 'directions', name); os.makedirs(d, exist_ok=True)
    html = ('<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../../lib/cr.css"><style>\n'
            + css.strip() + '\nimg.bg,img.fg{clip-path:var(--clip,none)}\n</style></head><body><div class="t">\n' + body.strip()
            + '\n</div><script src="../../lib/bind.js"></script></body></html>\n')
    open(os.path.join(d, 'index.html'), 'w').write(html)
    p = os.path.join(d, 'content.json')
    content.setdefault('vars', {}); content['title'] = content['titles'][0]
    if os.path.exists(p) and not RESET:
        old = json.load(open(p))
        for k in ('text', 'images', 'vars'): content[k] = {**content.get(k, {}), **old.get(k, {})}
        for k in ('nudge', 'class'):
            if k in old: content[k] = old[k]
        if old.get('title') and old['title'] not in content['titles']: content['title'] = old['title']
    sc = json.load(open(os.path.join(T, 'tools', 'scores.json'))) if os.path.exists(os.path.join(T, 'tools', 'scores.json')) else {}
    content.update(sc.get(name, {}))
    if content.get('recommended'): content['direction'] = '★ RECOMMENDED. ' + content['direction'].removeprefix('★ RECOMMENDED. ')
    if content.get('scores') and 'Scores:' not in content['direction']: content['direction'] += ' Scores: ' + content['scores']
    order = ['direction', 'concept', 'thumbnail_text', 'title', 'titles', 'scores', 'recommended', 'text', 'images', 'vars', 'nudge', 'class']
    json.dump({k: content[k] for k in order if k in content}, open(p, 'w'), indent=2, ensure_ascii=False)

# the strategist's titles (refined-kit.md section 2): 40-60 characters, keyword early, no em-dashes, no hype words
TT = {
 1: "Is Claude Conscious? Why Anthropic Protects It From Users",
 2: "Anthropic Will Ban Cruelty to Claude. Should It?",
 3: "Claude Can End Your Chat If You're Cruel. But Why?",
 4: "Mean to Claude? It Can End the Chat. Is That Right?",
 5: "AI Can't Feel. So Why Protect Claude From Cruelty?",
 6: "Is It Okay to Be Mean to AI? Anthropic's New Rule",
 7: "Should You Be Nice to AI? Yes, But Not for Its Sake",
 8: "Anthropic Says Claude Might Be Hurt. I Don't Buy It",
 9: "Can You Hurt a Chatbot? Why Claude Ends Cruel Chats",
 10: "If Claude Can Be Hurt, Is Anthropic Overworking It?",
 11: "Why I'm Kind to AI, Even Though It Can't Feel",
 12: "Claude Can Hang Up on You. Should AI Be Allowed To?",
}
def titles(*n): return [TT[i] for i in n]

D = {}
def d(name):
    def reg(f): D[name] = f; return f
    return reg

FACES.update({'17.5': (1641, 741, 691), '21.5': (1680, 721, 719), '26.75': (1632, 726, 721), '45.0': (1613, 741, 711),
  '72.75': (1691, 771, 719), '101.75': (1634, 622, 745), '116.0': (1744, 798, 730), '134.75': (1551, 807, 734),
  '166.5': (1572, 810, 686), '172.25': (1574, 786, 699), '197.25': (1518, 807, 690), '236.5': (1695, 790, 665),
  '254.0': (1626, 775, 691), '264.75': (1535, 775, 717), '269.0': (1635, 769, 693)})
# Round 2 (after the three gates, 2026-10-13): closed-mouth frames picked by tools/expr.swift (mouth gap + eyes open), one red
# message instead of three, fewer elements, every title naming the rule or the question; "Will Ban" (T2) dropped (reads as
# account bans). 07 and 09 cut as near-duplicates; 07 is now a second collage.

# ---------------------------------------------------------------- 01 TOO RUDE FOR AI? (TH01)
@d('01-too-rude-for-ai')
def _():
    t = '17.5'
    css = '''.t{--ground:var(--lilac)}
.hl{left:668px;top:44px;font-size:112px}
.win{left:668px;top:290px;--fs:32px;--ww:572px}'''
    body = f'''{PH}{FG}
{hl(['l1', 'l2'], '')}
{win(body=RUDE + END)}'''
    write('01-too-rude-for-ai', css, body, dict(
        direction='TH01, split: her real room on the left (face big, eyebrows up, palm out, mouth closed), the film\'s lilac on the right with a drawn chat: one blurred red all-caps message, then a big grey "This chat has ended" bar. Refs: viral sample 6 (a screen as the hook), Jel\'s chat bubble (11x), sample 1.',
        concept='TH01', thumbnail_text='TOO RUDE FOR AI?', titles=titles(9, 3, 6),
        text={'l1': 'TOO RUDE', 'l2': 'FOR AI?', **CHAT_TXT},
        images=imgs(t), vars={'--ground': '#CDBFF3', '--fg': '#15131C', '--accent': '#E8352B'}))
    fix_photo('01-too-rude-for-ai', photo(t, 320, 190, 380, 0, 640))

# ---------------------------------------------------------------- 02 AI CAN HANG UP (TH03)
@d('02-ai-can-hang-up')
def _():
    t = '101.75'
    css = '''.hl{left:40px;top:470px;font-size:104px;line-height:.98}
.phone{left:850px;top:30px;--phw:390px;--phh:660px;transform:rotate(5deg)}
.phone .win{--fs:34px}
.phone .win .in{display:none}
.phone .endbar{font-size:1.1em}'''
    body = f'''{PH}{FG}
{hl(['l1', 'l2'], '')}
{phone(win(body=RUDE + END))}'''
    write('02-ai-can-hang-up', css, body, dict(
        direction='TH03: her real room, palm up ("stop"), lips pressed; a big drawn phone on the right: "Claude" at the top, ONE big blurred red all-caps message and the grey "This chat has ended" bar. Words in lilac boxes, bottom left. Refs: sample 6, Derk\'s chatbot + one word (32x).',
        concept='TH03', thumbnail_text='AI CAN HANG UP', titles=titles(9, 6, 3),
        text={'l1': '<span class="boxl l">AI CAN</span>', 'l2': '<span class="boxl l">HANG UP</span>', **CHAT_TXT, 'rude': 'YOU USELESS STUPID BOT'},
        images=imgs(t)))
    fix_photo('02-ai-can-hang-up', photo(t, 520, 120, 350))

# ---------------------------------------------------------------- 03 BE CRUEL, AI WALKS OUT (TH05 reworded)
@d('03-cruel-ai-leaves')
def _():
    t = '116.0'
    css = '''.hl{left:40px;top:36px;font-size:96px;line-height:1}
.laptop{left:30px;top:268px;--lw:620px}
.laptop .win{--fs:23px}
.laptop .endbar{font-size:1.5em}'''
    body = f'''{PH}{FG}
{hl(['l1', 'l2'], '')}
{laptop(win(body=RUDE + END))}'''
    write('03-cruel-ai-leaves', css, body, dict(
        direction='TH05 reworded after the critics ("AI LEAVES" read as awkward): her sly sideways look towards a big drawn laptop on the left; the chat ends in a grey bar "Claude has left the chat" (ILLUSTRATION). Words: "BE CRUEL," in red, "AI WALKS OUT" in ink. Refs: sample 6, round 1\'s "AI CAN WALK AWAY".',
        concept='TH05', thumbnail_text='BE CRUEL, AI WALKS OUT', titles=titles(9, 3),
        text={'l1': '<span class="boxl r">BE CRUEL,</span>', 'l2': '<span class="boxl">AI WALKS OUT</span>', **CHAT_TXT},
        images=imgs(t)))
    fix_photo('03-cruel-ai-leaves', photo(t, 930, 160, 380))

# ---------------------------------------------------------------- 04 BE RUDE, GET CUT OFF? (TH10)
SCISSORS = '''<svg class="sc" viewBox="0 0 200 120">
<g fill="none" stroke="#15131C" stroke-width="10"><circle cx="34" cy="30" r="22"/><circle cx="34" cy="90" r="22"/></g>
<path d="M52 42 L196 96 L188 104 L48 54 Z" fill="#6E6A78"/><path d="M52 78 L196 24 L188 16 L48 66 Z" fill="#8F8A9A"/>
<circle cx="104" cy="60" r="6" fill="#15131C"/></svg>'''
@d('04-be-rude-get-cut-off')
def _():
    t = '21.5'
    css = '''.hl{left:40px;top:478px;font-size:96px;line-height:1}
.win{left:740px;top:40px;--fs:30px;--ww:510px;transform:rotate(-2deg)}
.cutrow{border-top-width:.28em}
.cutrow svg{width:11em;top:-4.4em;left:-2.2em}'''
    body = f'''{PH}{FG}
{win(body=RUDE + '<div class="cutrow">' + SCISSORS + '</div><div class="after-cut"><div class="endbar" data-k="ended"></div></div>')}
{hl(['l1', 'l2'], '')}'''
    write('04-be-rude-get-cut-off', css, body, dict(
        direction='TH10: her real room, open hand, mouth closed; a drawn "Claude" chat on the right with a big pair of scissors cutting across it under the blurred red message (thick dashed cut line; the rest of the chat greyed). Words bottom left in white and ink boxes. Refs: samples 2 and 4 (the idea drawn literally).',
        concept='TH10', thumbnail_text='BE RUDE, GET CUT OFF?', titles=titles(6, 3),
        text={'l1': '<span class="boxl wh">BE RUDE,</span>', 'l2': '<span class="boxl">GET CUT OFF?</span>', **CHAT_TXT,
              'rude': 'YOU STUPID USELESS BOT', 'rude2': 'ANSWER ME NOW!!'},
        images=imgs(t)))
    fix_photo('04-be-rude-get-cut-off', photo(t, 380, 130, 370))

# ---------------------------------------------------------------- 05 FRUSTRATED VS CRUEL (TH17)
@d('05-frustrated-vs-cruel')
def _():
    t = '134.75'
    css = '''.t{--ground:var(--lilac)}
.lab{position:absolute;font-family:'Schibsted';font-weight:900;text-transform:uppercase;letter-spacing:-.045em;line-height:.86;white-space:nowrap;z-index:6}
.m{position:absolute;z-index:6;font-size:40px;max-width:none;white-space:nowrap}
.to{position:absolute;left:44px;top:34px;z-index:6;font-weight:800;font-size:34px;letter-spacing:-.02em;color:var(--mute)}
.ok{left:40px;top:84px;font-size:96px;color:var(--ink)}
.m1{left:44px;top:180px}
.line{position:absolute;left:0;top:322px;width:660px;height:14px;background:var(--accent,var(--red));z-index:6}
.no{left:40px;top:372px;font-size:128px;color:var(--accent,var(--red))}
.m2{left:44px;top:496px}
.ill.k{position:absolute;left:46px;top:672px;font-size:13px}
.bub.m{border-bottom-right-radius:.9em;border-bottom-left-radius:.25em}'''
    body = f'''{PH}{FG}
<div class="to" data-k="to" data-move="to"></div>
<div class="lab ok" data-k="l1" data-move="label-frustrated"></div>
<div class="bub soft m m1" data-k="soft" data-move="msg-ok"></div>
<div class="line" data-move="line"></div>
<div class="lab no" data-k="l2" data-move="label-cruel"></div>
<div class="bub rude m m2" data-move="msg-cruel"><span data-k="rude"></span></div>
'''
    write('05-frustrated-vs-cruel', css, body, dict(
        direction='TH17: the line the rule actually draws. Lilac on the left with two messages "to Claude": "ugh, wrong again" (fine) under FRUSTRATED, a blurred red all-caps message under CRUEL, a thick red line between; her real room on the right half, sceptical frown, mouth closed. Refs: sample 4 (a diagram), sample 3 (the framework drawn).',
        concept='TH17', thumbnail_text='FRUSTRATED VS CRUEL', titles=titles(6, 3),
        text={'to': 'Messages to Claude, an AI:', 'l1': 'FRUSTRATED', 'l2': 'CRUEL', 'soft': 'ugh, wrong again', 'rude': 'YOU USELESS STUPID THING'},
        images=imgs(t), vars={'--ground': '#CDBFF3', '--fg': '#15131C', '--accent': '#E8352B'}))
    fix_photo('05-frustrated-vs-cruel', photo(t, 980, 160, 380, 660, 1280))

# ---------------------------------------------------------------- 06 MEAN TO CLAUDE? (TH07): words behind her head
@d('06-mean-to-claude')
def _():
    t = '236.5'
    css = '''.hl.behind{left:34px;top:60px;font-size:150px;color:#fff;line-height:.86}
.shade{--shade:.22}'''
    body = f'''{PH}<div class="shade"></div>
{hl(['l1', 'l2'], '', cls='hl behind')}
{FG}'''
    write('06-mean-to-claude', css, body, dict(
        direction='TH07: her face big (frown, lips pressed: "really?"), "MEAN TO CLAUDE?" huge in white BEHIND her head (her matte in front), like sample 1 "FINANCIAL LITERACY"; the room darkened 22 % so white type reads on the pale wall (flat dim, no glow). Nothing else. Refs: sample 1, Brett Codes "ai is just a tool" (4.7x).',
        concept='TH07', thumbnail_text='MEAN TO AI?', titles=titles(12, 6),
        text={'l1': 'MEAN TO', 'l2': 'AI?'}, images=imgs(t)))
    fix_photo('06-mean-to-claude', photo(t, 960, 180, 400))

# ---------------------------------------------------------------- 07 collage B: is Claude conscious? (her requested style)
@d('07-is-claude-conscious-collage')
def _():
    t = '45.0'
    css = '''.line{position:absolute;left:0;right:0;top:528px;text-align:center;z-index:8;font-family:'Instrument Serif';font-style:italic;font-size:136px;
 color:#fff;letter-spacing:-.01em;white-space:nowrap;text-shadow:0 3px 0 rgba(21,19,28,.55)}
.shade{--shade:.08}
.shot{left:30px;top:50px;width:600px;transform:rotate(-4deg)}
.mark{--hlc:rgba(255,225,77,.95)}
.note{left:980px;top:110px;font-size:62px;transform:rotate(6deg)}
.win{left:900px;top:300px;--fs:21px;--ww:330px;transform:rotate(4deg)}
.typing{display:flex;gap:.3em;padding:.45em .7em;background:#EDE9F6;border-radius:.9em;border-bottom-left-radius:.25em;align-self:flex-start}
.typing i{width:.45em;height:.45em;border-radius:50%;background:#8E86A6;display:block}'''
    body = f'''{PH}<div class="shade"></div>{FG}
{shot('page', 'src', '', 'page', '<i class="mark" style="left:0.8%;top:8%;width:52.2%;height:39%"></i>')}
<div class="note" data-k="note" data-move="note"></div>
<div class="line" data-k="l1" data-move="headline"></div>'''
    write('07-is-claude-conscious-collage', css, body, dict(
        direction='Collage over the creator (her requested style, "Time to lock in." / "Capsule wardrobe"): her full room photo, calm and direct; three cut-outs float on top: the REAL line from Claude\'s constitution "Claude\'s moral status is deeply uncertain." highlighted (credited), a yellow note "tool?", a small "Claude" chat with a typing indicator; one big serif line across her chest. Refs: the collage samples, sample 9.',
        concept='consciousness family (collage)', thumbnail_text='is Claude conscious?', titles=titles(8, 5),
        text={'l1': 'is Claude conscious?', 'note': 'just a tool?', 'src': 'Screenshot · anthropic.com/constitution', **CHAT_TXT, 'chat_in': 'Message…'},
        images=imgs(t, page='../../assets/props/constitution_line.png')))
    fix_photo('07-is-claude-conscious-collage', photo(t, 640, 150, 290))

# ---------------------------------------------------------------- 08 YELLING AT AI? (TH12)
@d('08-yelling-at-ai')
def _():
    t = '254.0'
    css = '''.t{--ground:var(--ink)}
.hl{left:760px;top:44px;font-size:104px;color:#fff;line-height:.92}
.win{left:760px;top:290px;--fs:30px;--ww:480px}'''
    body = f'''{PH}{FG}
{hl(['l1', 'l2'], '')}
{win(body=RUDE + END)}'''
    write('08-yelling-at-ai', css, body, dict(
        direction='TH12, split: her real room on the left 58 % (fingers at her temple, lips pressed: a headache look); the right is dark ink with a drawn "Claude" chat: one big blurred red all-caps message and the chat ending. Words in white, "AI?" in red. Refs: sample 2, the "being rude to ai" outliers (Duncanyounot "I BULLIED AI" 2.4M).',
        concept='TH12', thumbnail_text='YELLING AT AI?', titles=titles(6, 7),
        text={'l1': 'YELLING', 'l2': 'AT <span class="acc">AI?</span>', **CHAT_TXT, 'rude': 'WHY ARE YOU SO STUPID'},
        images=imgs(t), vars={'--ground': '#15131C', '--fg': '#FFFFFF', '--accent': '#E8352B'}))
    fix_photo('08-yelling-at-ai', photo(t, 380, 170, 390, 0, 730))

# ---------------------------------------------------------------- 10 TOOL OR PERSON? (TH08): words behind her head
@d('10-tool-or-person')
def _():
    t = '26.75'
    css = '''.s0{left:46px;top:40px;font-size:76px;color:#fff}
.w1{left:40px;top:110px;font-size:200px;color:#fff}
.w2{left:34px;top:388px;font-size:156px;color:var(--lilac)}
.or{position:absolute;left:480px;top:260px;z-index:8;font-family:'Instrument Serif';font-style:italic;font-size:120px;color:#fff}
.shade{--shade:.2}
.win{left:640px;top:560px;--fs:20px;--ww:290px;z-index:9;transform:rotate(-3deg)}
.typing{display:flex;gap:.3em;padding:.45em .7em;background:#EDE9F6;border-radius:.9em;border-bottom-left-radius:.25em;align-self:flex-start}
.typing i{width:.45em;height:.45em;border-radius:50%;background:#8E86A6;display:block}'''
    body = f'''{PH}<div class="shade"></div>
<div class="hl behind s0" data-k="l0" data-move="word-is-ai"></div>
<div class="hl behind w1" data-k="l1" data-move="word-tool"></div>
<div class="hl behind w2" data-k="l2" data-move="word-person"></div>
{FG}
<div class="or" data-k="or" data-move="or"></div>
{win(body='<div class="typing"><i></i><i></i><i></i></div>')}'''
    write('10-tool-or-person', css, body, dict(
        direction='TH08: the whole debate in words behind her head (her matte in front): "IS AI A" small, "TOOL" huge in white, a serif "or", "PERSON?" in lilac; her sceptical look, fingers pinched, mouth closed; room dimmed 20 % (flat). Refs: sample 1 ("FINANCIAL LITERACY" behind the head), Pinterest "COOK" / "POV".',
        concept='TH08', thumbnail_text='IS AI A TOOL OR PERSON?', titles=titles(11, 5),
        text={'l0': 'IS AI A', 'l1': 'TOOL', 'l2': 'PERSON?', 'or': 'or', **CHAT_TXT, 'chat_in': 'Message…'}, images=imgs(t)))
    fix_photo('10-tool-or-person', photo(t, 1010, 170, 360))

# ---------------------------------------------------------------- 11 collage over her (TH11, her requested style)
@d('11-ai-that-hangs-up-collage')
def _():
    t = '269.0'
    css = '''.line{position:absolute;left:0;right:0;top:560px;text-align:center;z-index:8;font-family:'Instrument Serif';font-style:italic;font-size:124px;
 color:#fff;letter-spacing:-.01em;white-space:nowrap;text-shadow:0 3px 0 rgba(21,19,28,.55)}
.phone{left:40px;top:40px;--phw:250px;--phh:470px;transform:rotate(-7deg)}
.phone .win{--fs:23px}
.phone .endbar{font-size:1.05em}
.shot{left:730px;top:50px;width:520px;transform:rotate(4deg)}
.mark{--hlc:rgba(255,225,77,.95)}
.note{left:930px;top:300px;font-size:64px;transform:rotate(-6deg)}
.bg,.fg{filter:brightness(1.12)}'''
    body = f'''{PH}{FG}
{phone(win(body=RUDE + END))}
{shot('page', style='', marks=SEC_MARKS)}
<div class="line" data-k="l1" data-move="headline"></div>'''
    write('11-ai-that-hangs-up-collage', css, body, dict(
        direction='TH11, collage over the creator (her requested style): her full photo in her room, a calm closed-mouth smile, 12 % brighter; three cut-outs: a drawn phone with an ended chat, the REAL Anthropic paragraph with the rule highlighted in yellow (credited), a yellow note "cruel?"; one serif line across her chest (never over her face). Refs: the collage samples, sample 9.',
        concept='TH11', thumbnail_text='the AI that hangs up', titles=titles(3, 6),
        text={'l1': 'the AI that hangs up', 'src': SRC, **CHAT_TXT},
        images=imgs(t, page='../../assets/props/policy_section.png')))
    fix_photo('11-ai-that-hangs-up-collage', photo(t, 640, 150, 290))

# ---------------------------------------------------------------- 12 NEW RULE FOR CLAUDE (real page, news)
@d('12-new-rule-for-claude')
def _():
    t = '134.75'
    css = '''.hl{left:40px;top:40px;font-size:100px;line-height:1}
.shot{left:36px;top:310px;width:720px;transform:rotate(-2deg)}
.mark{--hlc:rgba(255,225,77,.95)}'''
    body = f'''{PH}{FG}
{hl(['l1', 'l2'], '')}
{shot('page', 'src', '', 'page-rule', '<i class="mark" style="left:37.4%;top:50%;width:60.4%;height:20%"></i><i class="mark" style="left:0.6%;top:77.5%;width:24.8%;height:20%"></i>')}'''
    write('12-new-rule-for-claude', css, body, dict(
        direction='News-led: her real room, palm out, mouth closed, on the right; on the left ONE real Anthropic clipping ("Addressing abusive behavior toward our models", with "sustained and needless abusive or cruel behavior toward our models" highlighted in yellow, like her ghana-marrify 10b), with a source line. Words: what this is, plainly. Refs: Dan Grib\'s printed page (33x), her 10b clipping.',
        concept='rule family (real page)', thumbnail_text='NEW RULE FOR CLAUDE', titles=titles(6, 4),
        text={'l1': '<span class="boxl">NEW RULE</span>', 'l2': '<span class="boxl l">FOR CLAUDE</span>', 'src': SRC},
        images=imgs(t, page='../../assets/props/policy_rule_2lines.png')))
    fix_photo('12-new-rule-for-claude', photo(t, 1010, 170, 360))

# ---------------------------------------------------------------- 13 KIND TO A CHATBOT? (TH06)
@d('13-kind-to-a-chatbot')
def _():
    t = '247.8'
    css = '''.s1{left:44px;top:120px;font-size:100px;color:#fff;font-weight:800;text-transform:none;letter-spacing:-.035em}
.s2{left:34px;top:226px;font-size:150px;color:var(--accent,var(--red));text-transform:lowercase;letter-spacing:-.05em}
.win{left:56px;top:470px;--fs:26px;--ww:400px;transform:rotate(-3deg)}
.shade{--shade:.12}'''
    body = f'''{PH}<div class="shade"></div>
<div class="hl behind s1" data-k="l1" data-move="small-line"></div>
<div class="hl behind s2" data-k="l2" data-move="big-line"></div>
{FG}
{win(body='<div class="bub" data-k="msg"></div>')}'''
    write('13-kind-to-a-chatbot', css, body, dict(
        direction='TH06, white-and-red editorial (Pinterest "how to be consistent"): "be kind to" in white and "a chatbot?" huge in red, behind her head; her hand on her heart, warm half-smile; a drawn "Claude" chat with her message "thank you so much!" bottom left. Refs: Pinterest "how to be consistent", sample 5.',
        concept='TH06', thumbnail_text='BE KIND TO A CHATBOT?', titles=titles(11, 7),
        text={'l1': 'be kind to', 'l2': 'a chatbot?', 'msg': 'thank you so much!', **CHAT_TXT, 'chat_in': 'Message…'},
        images=imgs(t)))
    fix_photo('13-kind-to-a-chatbot', photo(t, 1080, 170, 330))

# ---------------------------------------------------------------- 14 CAN AI FEEL HURT? (TH14/TH20)
PLASTER = '''<svg class="plaster" data-move="plaster" viewBox="0 0 300 100" style="position:absolute;z-index:8">
<rect x="4" y="12" width="292" height="76" rx="38" fill="#E7B48A" stroke="#B9835A" stroke-width="4"/>
<rect x="104" y="18" width="92" height="64" rx="8" fill="#F5D7B6"/>
<g fill="#B9835A"><circle cx="38" cy="38" r="5"/><circle cx="62" cy="62" r="5"/><circle cx="38" cy="62" r="5"/><circle cx="62" cy="38" r="5"/>
<circle cx="238" cy="38" r="5"/><circle cx="262" cy="62" r="5"/><circle cx="238" cy="62" r="5"/><circle cx="262" cy="38" r="5"/></g></svg>'''
@d('14-can-ai-feel-hurt')
def _():
    t = '197.25'
    css = '''.hl{left:40px;top:40px;font-size:100px;line-height:1}
.bigb{position:absolute;left:60px;top:330px;width:470px;height:270px;background:#fff;border-radius:64px;border-bottom-left-radius:16px;z-index:6;
 box-shadow:0 14px 34px rgba(10,6,24,.35)}
.nm2{position:absolute;left:68px;top:284px;z-index:6;font-weight:800;font-size:34px;color:#fff;text-shadow:0 2px 0 rgba(0,0,0,.45)}
.plaster{left:140px;top:410px;width:320px;transform:rotate(-20deg)}
.ill.k{position:absolute;left:70px;top:612px;z-index:6;color:#fff}'''
    body = f'''{PH}{FG}
{hl(['l1', 'l2'], '')}
<div class="bigb" data-move="bubble"></div>{PLASTER}
'''
    write('14-can-ai-feel-hurt', css, body, dict(
        direction='TH14/TH20: her real room, eyebrows up, mouth closed; on the left a huge empty chat bubble from "Claude" (the model says nothing) with a big sticking plaster across it: "hurt" made literal and a little funny. The question in ink and lilac boxes. Refs: sample 6, Dan Grib "AI has feelings" (33x), "does ai have feelings" searches.',
        concept='TH14', thumbnail_text='CAN AI FEEL HURT?', titles=titles(9, 1),
        text={'l1': '<span class="boxl">CAN AI</span>', 'l2': '<span class="boxl l">FEEL HURT?</span>', 'chat_name': 'Claude'},
        images=imgs(t)))
    fix_photo('14-can-ai-feel-hurt', photo(t, 920, 170, 370))

# ---------------------------------------------------------------- 15 CRUEL TO AI = ? (TH21, flat)
@d('15-cruel-to-ai-equals')
def _():
    css = '''.t{--ground:var(--lilac)}
.hl{left:60px;top:150px;font-size:164px}
.hl .acc{color:var(--accent,var(--red))}
.endbig{position:absolute;left:60px;top:360px;font-weight:900;font-size:164px;letter-spacing:-.045em;line-height:.9;color:var(--accent,var(--red));text-transform:uppercase}
.ill.k{position:absolute;left:62px;top:640px;font-size:14px}'''
    body = f'''{hl(['l1'], '')}
<div class="endbig" data-k="ended" data-move="ended-bar"></div>
'''
    write('15-cruel-to-ai-equals', css, body, dict(
        direction='TH21, the flat one in the film\'s Thread look: lilac ground, "CRUEL TO AI =" in huge ink type, and the answer is a white "CHAT ENDED" bar as wide as the frame; the block centred vertically. Refs: her deck look (flat ground, heavy type), the flat "no one cares." pin.',
        concept='TH21', thumbnail_text='CRUEL TO AI = CHAT ENDED', titles=titles(9, 4),
        text={'l1': 'CRUEL TO AI <span class="acc">=</span>', 'ended': 'CHAT ENDED'},
        images={}, vars={'--ground': '#CDBFF3', '--fg': '#15131C', '--accent': '#E8352B'}))

# ---------------------------------------------------------------- 16 BEING CRUEL ENDED THIS CHAT (TH15, faceless)
@d('16-being-cruel-ended-this-chat')
def _():
    css = '''.t{--ground:var(--ink)}
.hl{left:56px;top:150px;font-size:100px;line-height:1.02;color:#fff}
.hl .acc{color:var(--accent,var(--red))}
.phone{left:850px;top:30px;--phw:400px;--phh:760px;transform:rotate(6deg)}
.phone .win{--fs:36px}
.phone .endbar{font-size:1.1em}'''
    body = f'''{hl(['l1', 'l2', 'l3'], '')}
{phone(win(body=RUDE + END))}'''
    write('16-being-cruel-ended-this-chat', css, body, dict(
        direction='TH15, faceless: dark ink ground, a big drawn phone on the right with one blurred red all-caps message and the grey "This chat has ended" bar under "Claude". Cause and effect in heavy white type, "CRUEL" in red. Refs: sample 6 (one screen is the whole thumbnail).',
        concept='TH15', thumbnail_text='BEING CRUEL ENDED THIS CHAT', titles=titles(6, 9),
        text={'l1': 'BEING', 'l2': '<span class="acc">CRUEL</span>', 'l3': 'ENDS THE CHAT', **CHAT_TXT, 'rude': 'USELESS. I HATE YOU'},
        images={}, vars={'--ground': '#15131C', '--fg': '#FFFFFF', '--accent': '#E8352B'}))

# ---------------------------------------------------------------- 17 BE MEAN = CHAT OVER (TH02)
@d('17-be-mean-chat-over')
def _():
    t = '172.25'
    css = '''.a{left:30px;top:56px;font-size:150px;color:#fff}
.b{right:30px;top:56px;font-size:150px;color:#fff;text-align:right}
.win{left:330px;top:500px;--fs:22px;--ww:580px}
.win .in{display:none}
.shade{--shade:.15}'''
    body = f'''{PH}<div class="shade"></div>
<div class="hl behind a" data-k="l1" data-move="left-words"></div>
<div class="hl behind b" data-k="l2" data-move="right-words"></div>
{FG}
{win(body=RUDE + END)}'''
    write('17-be-mean-chat-over', css, body, dict(
        direction='TH02: cause, then consequence. "BE MEAN" left and "CHAT OVER" right in huge white type behind her head (her matte in front), her frown in the middle, mouth closed; below, a drawn "Claude" chat: a blurred red message and the grey "This chat has ended" bar. Refs: Dan Grib\'s page held up (33x), sample 1, Pinterest "COOK".',
        concept='TH02', thumbnail_text='BE MEAN, CHAT OVER', titles=titles(12, 6),
        text={'l1': 'BE<br>MEAN,', 'l2': 'CHAT<br>OVER.', **CHAT_TXT}, images=imgs(t)))
    fix_photo('17-be-mean-chat-over', photo(t, 640, 160, 320))

# ---------------------------------------------------------------- 18 SAY PLEASE TO AI? (TH18, flat)
@d('18-say-please-to-ai')
def _():
    css = '''.t{--ground:var(--lilac)}
.hl{left:44px;top:50px;font-size:150px}
.box{position:absolute;left:44px;top:400px;width:1192px;height:210px;background:#fff;border-radius:105px;z-index:6;display:flex;align-items:center;
 padding:0 40px 0 70px;font-weight:600;font-size:140px;letter-spacing:-.04em;box-shadow:0 10px 0 var(--ink)}
.box .cur{display:inline-block;width:10px;height:130px;background:var(--accent,var(--red));margin-left:10px}
.box .send{margin-left:auto;width:130px;height:130px;border-radius:65px;background:var(--ink);display:flex;align-items:center;justify-content:center}
.to{position:absolute;left:52px;top:340px;font-family:'Plex Mono';font-weight:500;font-size:44px;letter-spacing:.04em;color:var(--mute)}
.ill.k{position:absolute;left:52px;top:650px;font-size:14px}'''
    body = f'''{hl(['l1', 'l2'], '')}
<div class="to" data-k="to" data-move="to"></div>
<div class="box" data-move="input"><span data-k="typed"></span><span class="cur"></span><span class="send"><svg width="64" height="64" viewBox="0 0 24 24"><path d="M12 19V5M5 12l7-7 7 7" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg></span></div>
'''
    write('18-say-please-to-ai', css, body, dict(
        direction='TH18, flat Thread look: lilac ground, the question in huge ink type, and a full-width message box with "please" being typed "To: Claude" (cursor in red). Refs: sample 2 (one object carries it), the "saying please to ai" searches.',
        concept='TH18', thumbnail_text='SAY PLEASE TO AI?', titles=titles(6, 7),
        text={'l1': 'SAY PLEASE', 'l2': 'TO AI?', 'to': 'To: Claude', 'typed': 'please'},
        images={}, vars={'--ground': '#CDBFF3', '--fg': '#15131C', '--accent': '#E8352B'}))

# ---------------------------------------------------------------- 19 AI PROTECTED FROM US? (TH04)
DOME = '''<svg class="dome" data-move="dome" viewBox="0 0 400 360" style="position:absolute;z-index:7">
<path d="M30 320 C30 120 120 20 200 20 C280 20 370 120 370 320" fill="rgba(255,255,255,.15)" stroke="#fff" stroke-width="11"/>
<path d="M80 250 C80 150 120 90 170 66" fill="none" stroke="rgba(255,255,255,.8)" stroke-width="12" stroke-linecap="round"/>
<rect x="10" y="318" width="380" height="30" rx="10" fill="#2A2733"/><circle cx="200" cy="14" r="14" fill="#fff"/></svg>'''
@d('19-protected-from-us')
def _():
    t = '72.75'
    css = '''.hl{left:40px;top:40px;font-size:92px;line-height:1}
.dome{left:850px;top:240px;width:420px}
.win{left:912px;top:400px;--fs:22px;--ww:296px}
.typing{display:flex;gap:.3em;padding:.45em .7em;background:#EDE9F6;border-radius:.9em;border-bottom-left-radius:.25em;align-self:flex-start}
.typing i{width:.45em;height:.45em;border-radius:50%;background:#8E86A6;display:block}'''
    body = f'''{PH}{FG}
{hl(['l1', 'l2'], '')}
{win(body='<div class="typing"><i></i><i></i><i></i></div>')}{DOME}'''
    write('19-protected-from-us', css, body, dict(
        direction='TH04: her real room, eyebrow raised, hand up, mouth closed; on the right a drawn "Claude" chat under a glass dome (thick 8 px outline, 15 % white fill): an AI kept under glass, with us outside. Refs: Claudius Papirus\' creature under a dome ("BAN CRUELTY?" this week), sample 2.',
        concept='TH04', thumbnail_text='AI PROTECTED FROM US?', titles=titles(5, 7),
        text={'l1': '<span class="boxl">AI PROTECTED</span>', 'l2': '<span class="boxl l">FROM US?</span>', **CHAT_TXT, 'chat_in': 'Message…'},
        images=imgs(t)))
    fix_photo('19-protected-from-us', photo(t, 540, 236, 320))

# ---------------------------------------------------------------- 20 IS CLAUDE CONSCIOUS? (search term)
@d('20-is-claude-conscious')
def _():
    t = '116.0'
    css = '''.s1{left:44px;top:60px;font-size:104px;line-height:1}
.no{position:absolute;left:56px;top:330px;z-index:8;font-family:'Caveat';font-weight:700;font-size:120px;color:#fff;white-space:nowrap;transform:rotate(-4deg);text-shadow:0 3px 0 rgba(21,19,28,.6)}
.shade{--shade:.12}'''
    body = f'''{PH}<div class="shade"></div>{FG}
{hl(['l1', 'l2'], '', cls='hl front s1')}
<div class="no" data-k="hand" data-move="handwritten"></div>'''
    write('20-is-claude-conscious', css, body, dict(
        direction='The big evergreen search ("is claude conscious"): "IS CLAUDE" in an ink box and "CONSCIOUS?" in a lilac box, top left, clear of her head; her sly sideways look, mouth closed; a big handwritten "my answer: no" (her view in the video). Refs: sample 1, Fireship "Claude is definitely not conscious" (802K), Decoded Genius "No, AI Isn\'t Conscious" (2.8M).',
        concept='consciousness family', thumbnail_text='IS CLAUDE CONSCIOUS?', titles=titles(11, 5),
        text={'l1': '<span class="boxl">IS CLAUDE</span>', 'l2': '<span class="boxl l">CONSCIOUS?</span>', 'hand': 'my answer: no'}, images=imgs(t)))
    fix_photo('20-is-claude-conscious', photo(t, 960, 170, 370))

# ---------------------------------------------------------------- 21 the real rule + the phone on white (her 10b style)
@d('21-real-rule-and-phone')
def _():
    css = '''.t{--ground:#FFFFFF}
.hl{left:48px;top:50px;font-size:116px}
.shot{left:28px;top:300px;width:900px;transform:rotate(-3deg)}
.phone .win .in{display:none}
.mark{--hlc:rgba(255,225,77,.95)}
.phone{left:950px;top:150px;--phw:290px;--phh:540px;transform:rotate(7deg);z-index:7}
.phone .win{--fs:28px}
.phone .endbar{font-size:1.1em}'''
    body = f'''{hl(['l1'], '')}
{shot('page', 'src', '', 'page', '<i class="mark" style="left:37.4%;top:50%;width:60.4%;height:20%"></i><i class="mark" style="left:0.6%;top:77.5%;width:24.8%;height:20%"></i>')}
{phone(win(body=RUDE + END))}'''
    write('21-real-rule-and-phone', css, body, dict(
        direction='Her ghana-marrify 10b edit applied here: plain white, the REAL Anthropic paragraph as a tilted clipping with the key words highlighted in yellow, and a drawn phone with an ended chat on the other side. Added after the gates: one short ink line on top so it reads cold ("CLAUDE\'S NEW RULE"). Source line kept small (real screenshot).',
        concept='rule family (clipping + phone)', thumbnail_text="CLAUDE'S NEW RULE", titles=titles(6, 3),
        text={'l1': 'CLAUDE’S NEW RULE', 'src': SRC, **CHAT_TXT},
        images={'page': '../../assets/props/policy_rule_2lines.png'}, vars={'--ground': '#FFFFFF', '--fg': '#15131C', '--accent': '#E8352B'}))

# ---------------------------------------------------------------- 22 NEW CLAUDE RULE, FROM NOV 12 (news + date)
@d('22-new-ai-rule-nov-12')
def _():
    t = '166.5'
    css = '''.hl{left:40px;top:36px;font-size:88px;line-height:1}
.cal{position:absolute;left:50px;top:300px;width:310px;z-index:7;background:#fff;border-radius:22px;overflow:hidden;box-shadow:0 14px 30px rgba(10,6,24,.35);transform:rotate(-4deg);text-align:center}
.cal .m{background:var(--accent,var(--red));color:#fff;font-weight:900;font-size:50px;letter-spacing:-.02em;padding:10px 0 8px}
.cal .dd{font-weight:900;font-size:190px;letter-spacing:-.06em;line-height:1;padding:6px 0 18px;color:var(--ink)}'''
    body = f'''{PH}{FG}
{hl(['l1', 'l2'], '')}
<div class="cal" data-move="calendar"><div class="m" data-k="mon"></div><div class="dd" data-k="day"></div></div>'''
    write('22-new-ai-rule-nov-12', css, body, dict(
        direction='News with the date: her real room, hand up, eyebrows raised; a calendar tile "FROM NOV 12" (when the rule takes effect) on the left; no chat card, so her face gets the room. Words: "NEW CLAUDE RULE" + "DON\'T BE CRUEL". Time-sensitive: use only before 12 November.',
        concept='rule family (date)', thumbnail_text="NEW CLAUDE RULE: DON'T BE CRUEL", titles=titles(6, 3),
        text={'l1': '<span class="boxl">NEW CLAUDE RULE</span>', 'l2': '<span class="boxl r">DON\'T BE CRUEL</span>', 'mon': 'FROM NOV', 'day': '12'},
        images=imgs(t)))
    fix_photo('22-new-ai-rule-nov-12', photo(t, 760, 250, 380))

def fix_photo(name, v):
    """photo geometry goes into content.json vars (editable), unless she has already moved it"""
    p = os.path.join(T, 'directions', name, 'content.json'); c = json.load(open(p))
    for kv in v.split(';'):
        k, val = kv.split(':', 1)
        if RESET or k not in c['vars']: c['vars'][k] = val
    json.dump(c, open(p, 'w'), indent=2, ensure_ascii=False)

for name, f in sorted(D.items()):
    if ONLY and not any(name.startswith(o) for o in ONLY): continue
    f(); print(name)
idx = sorted(x for x in os.listdir(os.path.join(T, 'directions')) if os.path.exists(os.path.join(T, 'directions', x, 'index.html')))
json.dump(idx, open(os.path.join(T, 'directions', 'index.json'), 'w'))
