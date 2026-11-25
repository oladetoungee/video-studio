"""v3 thumbnail set (2026-10-16, after "stop being one way"): 20 options, a real MIX
   photo background (01-08) · collage over her photo (09-12) · flat graphic (13-17) · other (18 split, 19 clipping, 20 close face).
   python3 tools/gen3.py            -> writes every direction; KEEPS an existing content.json's text/images/vars/nudge (her edits)
   python3 tools/gen3.py 03 --reset -> only directions starting with 03, overwriting content.json
13 and 14 are kept from v2 (their words passed the gate): this script only refreshes their titles/notes.
Look: lib/v3.css (imports lib/v2.css). Frames: assets/scene/warm/s_<t>.jpg + person cut-out mask/s_<t>.png (tools/prep.sh)."""
import json, os, sys, math

T = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
args = sys.argv[1:]; reset = '--reset' in args; only = [a for a in args if not a.startswith('--')]
SC = '../../assets/scene/warm/'
CUT = '../../assets/cut/'

G = {
 'heart': '<path d="M12 20.5s-7.5-4.6-9.6-9.2A5.3 5.3 0 0 1 12 5.6a5.3 5.3 0 0 1 9.6 5.7c-2.1 4.6-9.6 9.2-9.6 9.2z"/>',
 'bell': '<path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.8 1.8H4.2z"/><path d="M10 21a2 2 0 0 0 4 0"/>',
 'chat': '<path d="M4 5.5h16v10.5H10l-5 4v-4H4z"/>',
 'play': '<path d="M8 5.2l11 6.8-11 6.8z"/>',
 'cam': '<rect x="3.5" y="6.5" width="17" height="12.5" rx="3"/><circle cx="12" cy="12.7" r="3.4"/>',
 'mail': '<rect x="3.5" y="6" width="17" height="12.5" rx="2.5"/><path d="M4 7l8 6 8-6"/>',
 'note': '<path d="M9 18V6l10-2v12"/><circle cx="7" cy="18" r="2.2"/><circle cx="17" cy="16" r="2.2"/>',
 'moon': '<path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/>',
 'x': '<path d="M6 6l12 12M18 6L6 18"/>',
}
def glyph(name, color='#F4F1EA', w=2.2, fill=False):
    f = color if fill else 'none'
    return f'<svg viewBox="0 0 24 24" fill="{f}" stroke="{color}" stroke-width="{w}" stroke-linecap="round" stroke-linejoin="round">{G[name]}</svg>'

def arrow(p0, c, p1, w=10, head=34, color='#FF4433', name='arrow'):
    ang = math.atan2(p1[1] - c[1], p1[0] - c[0])
    h1 = (p1[0] - head * math.cos(ang - .5), p1[1] - head * math.sin(ang - .5))
    h2 = (p1[0] - head * math.cos(ang + .5), p1[1] - head * math.sin(ang + .5))
    return (f'<svg class="arw" data-move="{name}" width="1280" height="720" style="left:0;top:0;--aw:{w};--arw:{color}">'
            f'<path d="M{p0[0]:.0f} {p0[1]:.0f} Q{c[0]:.0f} {c[1]:.0f} {p1[0]:.0f} {p1[1]:.0f}"/>'
            f'<path d="M{h1[0]:.0f} {h1[1]:.0f} L{p1[0]:.0f} {p1[1]:.0f} L{h2[0]:.0f} {h2[1]:.0f}"/></svg>')

def place(W, hx, hy, bw=1280, bh=720):
    """frame width W on screen so her head centre lands at x=hx and the top of her head at y=hy;
    clamped so the frame always covers the box (bw x bh)."""
    k = W / 2560; x = round(hx - 1310 * k); y = round(hy - 350 * k); h = round(1440 * k)
    x2 = min(0, max(bw - W, x)); y2 = min(0, max(bh - h, y))
    if (x2, y2) != (x, y): print(f'  . clamped W={W}: x {x}->{x2}, y {y}->{y2}')
    return x2, y2

def photo(t, W, hx, hy, front=False, br=None):
    x, y = place(W, hx, hy)
    st = f'left:{x}px;top:{y}px;width:{W}px' + (f';--br:{br}' if br else '')
    s = f'<div class="photo"><img data-img="photo" src="{SC}s_{t}.jpg" style="{st}"></div>'
    if front: s += f'<div class="front"><img data-img="cutout" src="{SC}mask/s_{t}.png" style="{st}"></div>'
    return s

def imgs(t, front=False):
    d = {'photo': f'{SC}s_{t}.jpg'}
    if front: d['cutout'] = f'{SC}mask/s_{t}.png'
    return d

def post(pic=True, lines=1, dark=True, play=False):
    p = ''
    if pic:
        p = '<div class="pic" style="position:relative">' + ('<span style="position:absolute;left:50%;top:50%;width:64px;height:64px;margin:-32px;border-radius:50%;background:rgba(255,255,255,.9);display:grid;place-items:center"><span style="width:30px;height:30px;display:block;margin-left:5px">' + glyph('play', '#111', 2, True) + '</span></span>' if play else '') + '</div>'
    return '<div class="post"><div class="who"><i></i><b></b></div>' + p + '<div class="ln"></div>' * lines + '<div class="ln s"></div></div>'

def phone(x, y, w, h, inner, rot=0, light=False, name='phone', z=2, extra=''):
    return (f'<div data-move="{name}" class="abs" style="left:{x}px;top:{y}px;transform:rotate({rot}deg);z-index:{z}">'
            f'<div class="ph{" light" if light else ""}" style="position:relative;width:{w}px;height:{h}px;{extra}"><div class="scr">'
            f'<div class="isl"></div>{inner}</div></div></div>')

def icon(x, y, s, g, bg, badge=None, fg='#fff', bsize=None, rot=0, name=None, z=4, pos='absolute'):
    b = f'<div class="bdg" style="right:{-s*.12:.0f}px;top:{-s*.12:.0f}px;font-size:{bsize or s*.24:.0f}px;--bdring:#fff">{badge}</div>' if badge else ''
    nm = f' data-move="{name}"' if name else ''
    return (f'<div{nm} class="ico" style="position:{pos};left:{x}px;top:{y}px;width:{s}px;height:{s}px;--ic:{bg};transform:rotate({rot}deg);z-index:{z};box-shadow:0 12px 26px rgba(0,0,0,.3)">'
            f'<span style="width:50%;height:50%;display:block">{glyph(g, fg, 2.2)}</span>{b}</div>')

def spinner(s, color='#F4F1EA'):
    ticks = ''.join(f'<i style="transform:rotate({i*30}deg);opacity:{0.25 + 0.75 * (i / 11):.2f}"></i>' for i in range(12))
    return f'<div class="spin" style="--s:{s}px;--spc:{color}">{ticks}</div>'

FEED = '<div style="padding-top:58px">' + post() + post(pic=True, play=True) + post() + '</div>'
FEED_L = FEED  # light variant uses .ph.light styling

def lock(time, small=False):
    fs = 64 if small else 92
    return (f'<div style="padding-top:{60 if small else 90}px;text-align:center"><div class="clock" style="font-size:{fs}px">{time}</div></div>'
            '<div style="position:absolute;left:12px;right:12px;top:' + ('170' if small else '250') + 'px;display:grid;gap:10px">'
            + ''.join('<div class="ban" style="height:' + ('46' if small else '64') + 'px;padding:10px 14px;display:flex;gap:10px;align-items:center"><i style="width:26px;height:26px;border-radius:8px;background:#FF4433;flex:none"></i><b style="height:10px;flex:1;border-radius:5px;background:rgba(255,255,255,.35)"></b></div>' for _ in range(3)) + '</div>')

D = []
def add(name, kind, words, body, titles, refs, direction, text=None, images=None, style=''):
    D[:] = [d for d in D if d['name'] != name]   # a later add() with the same name replaces the earlier one (round fixes)
    D.append(dict(name=name, kind=kind, words=words, body=body, titles=titles, refs=refs, direction=direction,
                  text=text or {}, images=images or {}, style=style))

# ======================= PHOTO BACKGROUND (01-08) =======================
# 01 her raised hand at her cheek, closed smile; boxed words on the wall; a phone mid-scroll beside the words
add('01-why-cant-stop-scrolling', 'photo', 'Why you can’t stop scrolling',
    photo('300.0', 1800, 900, 100) +
    '<div class="it abs z4" data-k="words" style="left:48px;top:70px;font-size:92px;width:640px;line-height:1.08"></div>' +
    phone(400, 380, 250, 520, FEED, rot=-9, light=True, name='phone', z=3) +
    arrow((345, 450), (310, 590), (390, 670), w=10, name='swipe'),
    ['How Apps Are Designed to Be Addictive, a Researcher Explains', 'Phone Addiction Isn’t an Accident: The 5 Features Behind It'],
    'stop lying to yourself (DOAC, highlight box) · Never get distracted again (Justin Sung) · Stop wasting evenings',
    'Her in her room, big and bright (closed smile, hand at her cheek); the topic in white and yellow boxes on the wall; a dark phone mid-scroll under the words.',
    text={'words': '<span class="bx">Why you can’t</span><br><span class="bx y">stop scrolling</span>'}, images=imgs('300.0'))

# 02 words behind her head (FAVOR / POV / COOK style)
add('02-apps-engineered-to-addict', 'photo', 'Apps engineered to addict you',
    photo('157.0', 1800, 640, 250) +
    '<div class="nr abs z2 sh" data-k="top" style="left:0;width:1280px;text-align:center;top:22px;font-size:64px;color:#fff"></div>' +
    '<div class="an abs z2" data-k="words" style="left:0;width:1280px;text-align:center;top:84px;font-size:200px;color:#FF4433;text-shadow:0 4px 18px rgba(0,0,0,.25);letter-spacing:.005em"></div>' +
    icon(905, 470, 128, 'chat', '#15161B', badge='99+', name='app', z=4, rot=8),
    ['Why Can’t I Stop Scrolling? It Was Designed That Way', 'Why You Can’t Stop Scrolling: 5 Features Designed on Purpose', 'Why You Keep Picking Up Your Phone Without Thinking'],
    'FAVOR (word behind the head) · POV (Pinterest) · COOK (fpt.doc) · UI UX roadmap',
    'Wide and bright: her, finger at her chin, thinking; "ADDICT YOU" in huge red letters just above her head, "apps engineered to" above in serif; one app icon with a 99+ badge by her shoulder.',
    text={'top': '<i>apps engineered to</i>', 'words': 'addict you'}, images=imgs('157.0'))

# 03 her on the left, an annotated phone on the right (framework / annotation refs)
add('03-how-apps-keep-you-scrolling', 'photo', 'How apps keep you scrolling',
    photo('475.2', 1800, 330, 175) +
    '<div class="it abs z4 sh2" data-k="words" style="left:40px;top:30px;font-size:80px;width:1240px;color:#fff;line-height:.95;white-space:nowrap"></div>' +
    phone(800, 200, 300, 620, '<div style="position:absolute;left:0;right:0;top:46px;display:grid;place-items:center">' + spinner(54, '#555') + '</div><div style="padding-top:118px">' + post(play=True) + post() + '</div>', rot=6, light=True, name='phone', z=4) +
    '<div class="hand abs z5 sh" data-k="l1" style="left:1110px;top:205px;font-size:44px;color:#fff"></div>' +
    arrow((1108, 230), (1040, 220), (985, 268), w=8, head=26, color='#FFE14D', name='a1') +
    '<div class="hand abs z5 sh" data-k="l2" style="left:640px;top:420px;font-size:44px;color:#fff;text-align:right;width:150px"></div>' +
    arrow((735, 470), (790, 500), (850, 470), w=8, head=26, color='#FFE14D', name='a2') +
    '<div class="hand abs z5 sh" data-k="l3" style="left:1120px;top:560px;font-size:44px;color:#fff"></div>' +
    arrow((1118, 590), (1080, 640), (1040, 640), w=8, head=26, color='#FFE14D', name='a3'),
    ['Why Am I Addicted to My Phone? 5 Design Tricks to Blame', 'Phone Addiction Isn’t an Accident: The 5 Features Behind It'],
    'Fitness sales framework (drawn steps) · Pinterest annotated vlogs (arrows, handwriting) · new york city writing',
    'Her on the left with a raised finger, the title behind her head; a light phone on the right annotated in yellow handwriting: refresh, autoplay, endless feed.',
    text={'words': 'How apps keep you <span class="yel">scrolling</span>', 'l1': 'refresh', 'l2': 'autoplay', 'l3': 'endless'}, images=imgs('475.2', True))

# 04 her open palm = stop; huge STOP
add('04-stop-doomscrolling', 'photo', 'Stop doomscrolling',
    photo('292.7', 1500, 820, 120) +
    '<div class="abs z4" style="left:46px;top:96px"><div class="an" data-k="stop" style="font-size:250px;line-height:.86"></div>'
    '<div class="it" data-k="words" style="font-size:86px;margin-top:14px"></div></div>' +
    phone(170, 500, 220, 460, FEED, rot=-12, light=True, name='phone', z=3),
    ['How to Use Your Phone Less (Simple Settings That Help)', 'Why You Can’t Put Your Phone Down at Night'],
    'STOP THIS! (red box) · Stop wasting evenings · Never get distracted again',
    'Her palm up like a stop sign (mouth almost closed), close and bright; STOP in a red block, "doomscrolling" in a white one; a phone mid-feed tilting out of the corner.',
    text={'stop': '<span class="bx r" style="padding:.02em .1em .04em">Stop</span>', 'words': '<span class="bx">doomscrolling</span>'}, images=imgs('292.7'))

# 05 a big settings card is the text
add('05-turn-off-these-settings', 'photo', 'Turn off these addictive settings',
    photo('238.5', 1800, 380, 120) +
    '<div class="card" data-move="card" style="left:640px;top:58px;width:590px;padding-top:30px;transform:rotate(2deg)">'
    '<div class="it" data-k="words" style="font-size:66px;padding:0 30px 26px;line-height:.98"></div>'
    '<div class="row"><span data-k="r1"></span><i class="tog off"></i></div>'
    '<div class="row"><span data-k="r2"></span><i class="tog off"></i></div>'
    '<div class="row" style="border-bottom:0;padding-bottom:30px"><span data-k="r3"></span><i class="tog off"></i></div></div>' +
    arrow((560, 120), (560, 260), (650, 330), w=10, name='point'),
    ['Why Am I Addicted to My Phone? 5 Design Tricks to Blame', 'Why Can’t I Stop Scrolling? It Was Designed That Way'],
    'Everything done by 2pm (checklist card) · Boring way (notification cards beside the face) · Forget about going viral (tweet card)',
    'Her on the left, calm, raised finger; a big paper-white settings card on the right IS the text: "Turn off these addictive settings" over three switches, all off (Autoplay, Notifications, App badges).',
    text={'words': 'Turn off these<br><span class="red">addictive settings</span>', 'r1': 'Autoplay', 'r2': 'Notifications', 'r3': 'App badges'}, images=imgs('238.5'))

# 06 editorial serif + a grayscale polaroid
add('06-use-your-phone-less', 'photo', 'How to use your phone less',
    photo('163.5', 1640, 900, 110) +
    '<div class="pf abs z4 sh" data-k="words" style="left:46px;top:60px;font-size:96px;width:640px;color:#fff;line-height:.98"></div>' +
    '<div data-move="polaroid" class="abs z4" style="left:96px;top:400px;transform:rotate(-6deg);background:#fff;padding:12px 12px 52px;box-shadow:0 18px 40px rgba(0,0,0,.4)">'
    '<div style="width:300px;height:220px;background:#2A2B2F;position:relative;overflow:hidden">'
    '<div style="position:absolute;left:24px;right:24px;top:34px;display:grid;grid-template-columns:repeat(4,1fr);gap:16px">' +
    ''.join(f'<div class="ico" style="position:relative;width:100%;aspect-ratio:1;--ic:#5A5C62"><span style="width:52%;height:52%;display:block">{glyph(g, "#D9D9D9")}</span></div>' for g in ['chat', 'heart', 'play', 'cam', 'mail', 'note', 'bell', 'chat']) +
    '</div></div><div class="hand" data-k="cap" style="position:absolute;left:0;right:0;bottom:6px;text-align:center;font-size:38px;color:#222"></div></div>',
    ['How to Stop Scrolling: Phone Settings That Actually Help', 'Why Your Phone Is So Hard to Put Down, Explained'],
    'how to be consistent (editorial serif) · alone in korea / keep trying (Pinterest serif) · polaroid inserts (Pinterest)',
    'Her on the right, calm, in her warm room; the title in a tall Playfair serif on the left with "less" in red italic; a polaroid of a grey, quiet home screen captioned "grayscale on".',
    text={'words': 'How to use<br>your phone <i class="red" style="font-style:italic">less</i>', 'cap': 'grayscale on'}, images=imgs('163.5'))

# 07 a generic screen-time card next to her (hand at her temple, thinking)
bars = [120, 150, 135, 190, 215, 250, 300]
add('07-screen-time-not-an-accident', 'photo', 'Your screen time isn’t an accident',
    photo('350.9', 1760, 330, 130) +
    '<div class="it abs z4 sh2" data-k="words" style="left:640px;top:44px;font-size:74px;width:620px;color:#fff;line-height:.98"></div>' +
    '<div class="card" data-move="card" style="left:700px;top:300px;width:520px;height:360px;background:#16171B;color:#F4F1EA;padding:28px 34px">'
    '<div class="it" data-k="card" style="font-size:36px;letter-spacing:-.02em"></div>'
    '<div style="position:absolute;left:34px;right:34px;bottom:34px;height:240px;display:flex;align-items:flex-end;gap:16px">' +
    ''.join(f'<i style="flex:1;height:{h}px;border-radius:10px;background:{"#FF4433" if i == 6 else "#3A3D45"}"></i>' for i, h in enumerate(bars)) +
    '</div></div>',
    ['How Apps Are Designed to Be Addictive, a Researcher Explains', 'Why You Can’t Stop Scrolling: 5 Features Designed on Purpose'],
    'Never get distracted again (card beside the face) · Space complexity (chart) · you’re in a war',
    'Her on the left, hand at her temple, thinking (closed mouth); the line on the right, "accident" in yellow; under it a generic dark screen-time card whose bars climb all week to a red last day (no numbers).',
    text={'words': 'Your screen time<br>isn’t an <span class="yel">accident</span>', 'card': 'Screen time this week'}, images=imgs('350.9'))

# 08 glossy app icons floating around her head; bold line at the bottom
add('08-why-social-media-addictive', 'photo', 'Why is social media addictive?',
    photo('152.0', 1280, 640, 70) +
    icon(330, 120, 120, 'heart', '#FF4433', badge='24', rot=-10, name='i1') +
    icon(840, 90, 112, 'chat', '#1B3FD8', badge='9', rot=9, name='i2') +
    icon(250, 330, 96, 'play', '#15161B', rot=6, name='i3') +
    icon(930, 300, 96, 'bell', '#FFB000', badge='3', fg='#111', rot=-7, name='i4') +
    '<div class="abs z5" style="left:0;width:1280px;text-align:center;top:470px"><div class="it sh2" data-k="top" style="font-size:66px;color:#fff"></div>'
    '<div class="an sh2" data-k="words" style="font-size:150px;color:#FFE14D;margin-top:4px"></div></div>',
    ['Why You Keep Picking Up Your Phone Without Thinking', 'Why Can’t I Stop Scrolling? It Was Designed That Way'],
    'you’re in a war (icons around the head) · THEY LIED TO US (bottom line) · I CAN’T DO THIS',
    'Her centred, wide, calm; four generic app icons (like, comments, video, bell) with red badges float around her head; the question across the bottom, "ADDICTIVE?" in big yellow letters.',
    text={'top': 'Why is social media', 'words': 'addictive?'}, images=imgs('152.0'))

# ======================= COLLAGE OVER HER FULL PHOTO (09-12) =======================
def stk_phone(x, y, rot, inner, w=170, h=340, name='s_phone'):
    return (f'<div class="stk" data-move="{name}" style="left:{x}px;top:{y}px;transform:rotate({rot}deg);--r:36px">'
            f'<div class="ph" style="position:relative;width:{w}px;height:{h}px;border-radius:30px;padding:7px;box-shadow:none"><div class="scr" style="border-radius:24px">'
            f'<div class="isl" style="width:50px;height:14px;margin-left:-25px;top:9px"></div>{inner}</div></div></div>')

def stk_icon(x, y, s, g, bg, rot, badge=None, name='s_icon', fg='#fff'):
    b = f'<div class="bdg" style="right:{-s*.16:.0f}px;top:{-s*.16:.0f}px;font-size:{s*.26:.0f}px;--bdring:#fff">{badge}</div>' if badge else ''
    return (f'<div class="stk" data-move="{name}" style="left:{x}px;top:{y}px;transform:rotate({rot}deg);--r:{s*.3:.0f}px;padding:7px">'
            f'<div class="ico" style="position:relative;width:{s}px;height:{s}px;--ic:{bg}"><span style="width:50%;height:50%;display:block">{glyph(g, fg, 2.2)}</span>{b}</div></div>')

def mini_lock(t):
    return (f'<div style="padding-top:44px;text-align:center"><div class="clock" style="font-size:46px">{t}</div></div>'
            '<div style="position:absolute;left:9px;right:9px;top:118px;display:grid;gap:8px">' +
            ''.join('<div style="height:36px;border-radius:12px;background:rgba(255,255,255,.12);display:flex;gap:8px;align-items:center;padding:0 9px"><i style="width:20px;height:20px;border-radius:6px;background:#FF4433;flex:none"></i><b style="height:8px;flex:1;border-radius:4px;background:rgba(255,255,255,.35)"></b></div>' for _ in range(4)) + '</div>')

def mini_feed():
    return ('<div style="padding-top:34px">' + ''.join('<div style="margin:0 9px 9px;border-radius:12px;background:#1D1F25;padding:9px"><div style="height:74px;border-radius:8px;background:#2B2E36"></div><div style="height:7px;border-radius:4px;background:#3A3D45;margin-top:8px"></div></div>' for _ in range(3)) + '</div>')

def slot(x, y, rot, name='s_slot'):
    reel = lambda g, c: f'<div style="width:62px;height:86px;border-radius:10px;background:#fff;display:grid;place-items:center"><span style="width:40px;height:40px;display:block">{glyph(g, c, 2.4, True)}</span></div>'
    return (f'<div class="stk" data-move="{name}" style="left:{x}px;top:{y}px;transform:rotate({rot}deg);--r:26px;padding:8px">'
            '<div style="position:relative;width:250px;height:150px;border-radius:20px;background:#D9342B;display:flex;gap:9px;align-items:center;justify-content:center">'
            + reel('heart', '#FF4433') + reel('heart', '#FF4433') + reel('bell', '#FFB000') +
            '<i style="position:absolute;right:-30px;top:30px;width:12px;height:70px;background:#555;border-radius:6px"></i>'
            '<i style="position:absolute;right:-38px;top:12px;width:28px;height:28px;border-radius:50%;background:#FF4433;border:3px solid #fff"></i></div></div>')

add('09-cant-put-your-phone-down', 'collage', 'Can’t put your phone down?',
    photo('437.0', 1280, 640, 70) +
    stk_phone(70, 70, -8, mini_lock('1:40'), name='s_phone') +
    stk_icon(1040, 80, 110, 'heart', '#FF4433', 7, badge='99+', name='s_heart') +
    slot(940, 300, 6) +
    '<div class="nr abs z5 sh" data-k="words" style="left:0;width:1280px;text-align:center;top:478px;font-size:84px;color:#fff;line-height:1"></div>' +
    '<div class="lab" data-k="l1" style="left:300px;top:110px"></div>' +
    '<div class="lab" data-k="l2" style="left:1010px;top:226px"></div>' +
    '<div class="lab" data-k="l3" style="left:90px;top:420px"></div>',
    ['Why Am I Addicted to My Phone? 5 Design Tricks to Blame', 'Phone Addiction Isn’t an Accident: The 5 Features Behind It'],
    'Time to lock in. (serif across the middle, small labels) · Capsule wardrobe · Thought of these?',
    'Collage over her full, natural photo: a phone at 1:40 full of notifications, a heart icon with 99+, a little slot machine of hearts as cut-out stickers; one serif line across the middle; three small labels.',
    text={'words': 'Can’t put<br><i>your phone down?</i>', 'l1': 'infinite scroll', 'l2': 'red badges', 'l3': 'autoplay'}, images=imgs('437.0'))

add('10-phone-addiction-explained', 'collage', 'Phone addiction, explained',
    photo('747.0', 1400, 660, 90) +
    stk_phone(990, 60, 9, mini_feed(), name='s_phone') +
    stk_icon(110, 90, 104, 'bell', '#FFB000', -9, badge='12', name='s_bell', fg='#111') +
    stk_icon(150, 330, 96, 'play', '#15161B', 8, name='s_play') +
    '<div class="ins abs z5 sh" data-k="words" style="left:0;width:1280px;text-align:center;top:560px;font-size:124px;color:#fff"></div>' +
    '<div class="lab" data-k="l1" style="left:60px;top:228px"></div>' +
    '<div class="lab" data-k="l2" style="left:1010px;top:450px"></div>',
    ['Why Can’t I Stop Scrolling? It Was Designed That Way', 'Why You Can’t Stop Scrolling: 5 Features Designed on Purpose'],
    'How to be Feminine (big serif low) · in defense of being online · Capsule wardrobe',
    'Collage, closer: her calm and centred; a bell with 12, a video icon and an endless-feed phone stuck around her; "Phone addiction, explained" in a big Instrument Serif low across her; two small labels.',
    text={'words': 'Phone addiction, <i>explained</i>', 'l1': 'pull to refresh', 'l2': 'likes'}, images=imgs('747.0'))

add('11-apps-impossible-to-close', 'collage', 'Why apps feel impossible to close',
    photo('442.5', 1280, 640, 70) +
    ''.join(stk_icon(x, y, s, g, c, r, badge=b, name=f's_i{i}') for i, (x, y, s, g, c, r, b) in enumerate([
        (90, 260, 92, 'chat', '#1B3FD8', -10, '9'), (230, 120, 84, 'cam', '#E8457A', 8, '3'), (1080, 140, 92, 'play', '#FF4433', 9, None), (980, 300, 84, 'note', '#22B573', -7, '1')])) +
    '<div class="stk" data-move="s_x" style="left:1060px;top:470px;transform:rotate(-8deg);--r:50%;padding:8px"><div style="width:100px;height:100px;border-radius:50%;background:#15161B;display:grid;place-items:center"><span style="width:52px;height:52px;display:block">' + glyph('x', '#fff', 3) + '</span></div></div>' +
    '<div class="pf abs z5 sh" data-k="words" style="left:0;width:1280px;text-align:center;top:40px;font-size:68px;color:#fff;font-weight:600"></div>' +
    '<div class="lab" data-k="l1" style="left:1010px;top:604px"></div>' +
    '<div class="lab" data-k="l2" style="left:70px;top:380px"></div>',
    ['Infinite Scroll Explained: Why It Never Stops', 'Why Can’t I Stop Scrolling? It Was Designed That Way'],
    'Thought of these? (objects around the head) · in defense of being online · Time to lock in.',
    'Collage, the line at the top in Playfair: generic app icons with red badges stuck around her, and a black "close" button she never presses; two small labels.',
    text={'words': 'Why apps feel <i style="font-style:italic">impossible to close</i>', 'l1': 'close?', 'l2': 'one more'}, images=imgs('442.5'))

add('12-stop-scrolling-at-night', 'collage', 'how to stop scrolling at night',
    photo('874.7', 1280, 640, 70, br=1.08) +
    '<div class="stk" data-move="s_moon" style="left:1040px;top:70px;transform:rotate(8deg);--r:50%;padding:8px"><div style="width:130px;height:130px;border-radius:50%;background:#16234A;display:grid;place-items:center"><span style="width:76px;height:76px;display:block">' + glyph('moon', '#FFE14D', 2, True) + '</span></div></div>' +
    stk_phone(990, 300, 7, mini_lock('1:40'), w=150, h=300, name='s_phone') +
    '<div class="nr abs z5 sh" data-k="words" style="left:40px;width:900px;top:520px;font-size:80px;color:#fff;line-height:1"></div>' +
    '<div class="lab" data-k="l1" style="left:60px;top:120px"></div>' +
    '<div class="lab" data-k="l2" style="left:60px;top:170px"></div>' +
    '<div class="lab" data-k="l3" style="left:60px;top:220px"></div>',
    ['Why Your Phone Is So Hard to Put Down, Explained', 'How to Use Your Phone Less (Simple Settings That Help)'],
    'Time to lock in. (small labels in a stack) · new york city writing · alone in korea (lowercase serif)',
    'Collage: her hand up, wide; a moon sticker and a 1:40 lock screen on the right; the line in lowercase serif bottom-left; three small labels of what to switch (grayscale, autoplay off, notifications off) top-left.',
    text={'words': 'how to stop scrolling<br><i>at night</i>', 'l1': '1. grayscale', 'l2': '2. autoplay off', 'l3': '3. notifications off'}, images=imgs('874.7'))

# ======================= GRAPHIC (13-17): 13, 14 kept from v2 =======================
KEEP = {
 '13-addictive-by-design': ('08-addictive-by-design', 'graphic', 'Phone addiction is by design',
    ['Why You Keep Picking Up Your Phone Without Thinking', 'Why Can’t I Stop Scrolling? It Was Designed That Way'],
    'her own database-indexes thumbnail (quality bar) · Jobs are dead (Pinterest, bold flat) · I CAN’T DO THIS'),
 '14-make-your-phone-boring': ('04-make-it-boring', 'graphic', 'Make your phone boring',
    ['How to Stop Scrolling: Phone Settings That Actually Help', 'How to Use Your Phone Less (Simple Settings That Help)'],
    'Before / After (Justin Sung) · Coding was hard until (before/after arrow) · her database-indexes thumbnail'),
}

feedlong = ''.join('<div class="post" style="margin:0 0 16px">' + '<div class="who"><i></i><b></b></div><div class="pic"></div><div class="ln"></div><div class="ln s"></div></div>' for _ in range(6))
add('15-infinite-scroll-feels-addictive', 'graphic', 'Why infinite scroll feels addictive',
    '<div class="hd" data-k="words" style="left:60px;top:130px;font-size:116px;width:700px;color:#0C0D10"></div>' +
    '<div data-move="feed" class="abs z2 light" style="left:790px;top:-260px;width:330px;transform:rotate(7deg)"><div class="ph light" style="position:relative;width:330px;height:640px;margin-top:260px;border-radius:52px"><div class="scr"><div class="isl"></div><div style="padding:60px 16px 0">' + feedlong + '</div></div></div></div>' +
    arrow((1200, 120), (1240, 360), (1170, 640), w=12, head=38, name='down'),
    ['Why Websites Got Rid of the "Next Page" Button', 'Why Can’t I Stop Scrolling? It Was Designed That Way'],
    'her database-indexes thumbnail (one drawn mechanism) · Two Sum (flat drawing) · div div div (repetition)',
    'No face. Warm paper ground; the question on the left in ink with "addictive" in red; a light phone whose feed spills out above and below the phone, with one red arrow running down.',
    text={'words': 'Why infinite<br>scroll feels<br><span class="acc">addictive</span>'}, style='.t{--ground:#F2EFE9}')

add('16-why-notifications-are-red', 'graphic', 'Why notifications are red',
    '<div class="hd" data-k="words" style="left:60px;top:70px;font-size:112px;width:700px"></div>' +
    '<div class="abs z3" data-move="badges" style="left:70px;top:430px;display:flex;align-items:center;gap:34px">'
    '<div class="bdg" style="position:relative;font-size:84px;background:#2F6BFF;--bdring:#0C0D10;opacity:.9">1</div>'
    '<div class="bdg" style="position:relative;font-size:84px;background:#22B573;--bdring:#0C0D10;opacity:.9">1</div>'
    '<div class="bdg" style="position:relative;font-size:150px;--bdring:#0C0D10">1</div></div>' +
    f'<img class="me" data-img="photo" data-move="her" src="{CUT}895.75_col_white.png" style="left:770px;top:150px;height:570px">',
    ['Why You Keep Picking Up Your Phone Without Thinking', 'Why Am I Addicted to My Phone? 5 Design Tricks to Blame'],
    'her database-indexes thumbnail (cut-out with outline) · stop lying to yourself (one red word) · 18+ THEY LIED TO US (one badge)',
    'Ink ground; the question big, "red" in red; three notification badges in a row, blue and green small, the red one huge; her colour cut-out with a white outline on the right, calm.',
    text={'words': 'Why notifications<br>are <span class="acc">red</span>'}, images={'photo': f'{CUT}895.75_col_white.png'})

marks = [(560, 96, 'refresh'), (705, 165, 'badge'), (560, 330, 'feed'), (725, 405, 'autoplay'), (560, 585, 'likes')]
add('17-five-tricks-apps-use', 'graphic', '5 tricks apps use on you',
    '<div class="hd" data-k="words" style="left:60px;top:110px;font-size:120px;width:520px"></div>' +
    phone(800, 50, 320, 640, '<div style="position:absolute;left:0;right:0;top:54px;display:grid;place-items:center">' + spinner(46, '#666') + '</div>'
          '<div style="position:absolute;right:26px;top:52px;width:46px;height:46px"><div class="bdg" style="position:relative;font-size:26px;--bdring:#EDEAE3">8</div></div>'
          '<div style="padding-top:116px">' + post(play=True) + '<div class="post"><div class="who"><i></i><b></b></div><div class="ln"></div><div class="acts" style="display:flex;gap:16px;margin-top:12px"><span style="width:36px;height:36px;display:block">' + glyph('heart', '#FF4433', 2.4, True) + '</span></div></div>' + post() + '</div>', rot=0, light=True, name='phone', z=2) +
    ''.join(f'<div class="abs z4" data-move="n{i+1}" style="left:{[740, 1150, 740, 1150, 740][i]}px;top:{[90, 150, 320, 330, 520][i]}px;width:66px;height:66px;border-radius:50%;background:#FFE14D;color:#111;font:800 40px IT;display:grid;place-items:center;box-shadow:0 8px 18px rgba(0,0,0,.3)">{i+1}</div>' for i in range(5)),
    ['Why Can’t I Stop Scrolling? It Was Designed That Way', 'Phone Addiction Isn’t an Accident: The 5 Features Behind It'],
    'her database-indexes thumbnail (one mechanism, numbered) · Fitness sales framework · Space complexity of an algorithm',
    'No face. Electric blue ground; the words big and white on the left; one light phone on the right with five yellow numbered dots on its parts (refresh, red badge, endless feed, autoplay video, like).',
    text={'words': '5 tricks<br>apps use<br><span style="color:#FFE14D">on you</span>'}, style='.t{--ground:#1B3FD8;--fg:#fff}')

# ======================= OTHER (18-20) =======================
def half(t, side, W, hx, hy):
    x, y = place(W, hx, hy, 640)
    return (f'<div class="abs z1" style="left:{0 if side == "L" else 640}px;top:0;width:640px;height:720px;overflow:hidden">'
            f'<img data-img="{"before" if side == "L" else "after"}" src="{SC}s_{t}.jpg" style="position:absolute;left:{x}px;top:{y}px;width:{W}px;filter:brightness(1.14) contrast(1.06) saturate({1.0 if side == "R" else 1.06})"></div>')

busy = '<div style="padding:56px 16px 0;display:grid;grid-template-columns:repeat(3,1fr);gap:18px">' + ''.join(
    f'<div class="ico" style="position:relative;width:100%;aspect-ratio:1;--ic:{c}"><span style="width:50%;height:50%;display:block">{glyph(g, "#fff")}</span>' + (f'<div class="bdg" style="right:-8px;top:-8px;font-size:20px;--bdring:#0C0D10">{b}</div>' if b else '') + '</div>'
    for g, c, b in [('chat', '#FF7A45', '99+'), ('heart', '#E8457A', '24'), ('play', '#2F6BFF', '7'), ('cam', '#22B573', '12'), ('mail', '#FFB000', '3'), ('note', '#8A5CF6', '5')]) + '</div>'
calm = '<div style="padding:56px 16px 0;display:grid;grid-template-columns:repeat(3,1fr);gap:18px">' + ''.join(
    f'<div class="ico" style="position:relative;width:100%;aspect-ratio:1;--ic:#3A3D45"><span style="width:50%;height:50%;display:block">{glyph(g, "#B8B8B8")}</span></div>' for g in ['chat', 'heart', 'play', 'cam', 'mail', 'note']) + '</div>'
add('18-before-after', 'other', 'Fix your phone addiction',
    half('554.5', 'L', 1500, 300, 120) + half('300.0', 'R', 1500, 340, 120) +
    '<i class="abs z3" style="left:637px;top:0;width:6px;height:720px;background:#fff"></i>' +
    '<div class="mono abs z4" data-k="b" style="left:30px;top:28px;font-size:34px;background:#0C0D10;color:#fff;padding:6px 14px"></div>' +
    '<div class="mono abs z4" data-k="a" style="left:670px;top:28px;font-size:34px;background:#fff;color:#0C0D10;padding:6px 14px"></div>' +
    phone(430, 300, 190, 380, busy, rot=-8, name='p_before', z=3) + phone(1060, 300, 190, 380, calm, rot=8, name='p_after', z=3) +
    '<div class="it abs z5" data-k="words" style="left:0;width:1280px;text-align:center;top:600px;font-size:76px"></div>',
    ['How to Stop Scrolling: Phone Settings That Actually Help', 'How to Use Your Phone Less (Simple Settings That Help)'],
    'Before / After (Justin Sung) · Day 1 / Day 900 · 12:30 PM / 7:30 PM split',
    'Split before / after: left, her frowning beside a phone crowded with coloured apps and red badges; right, her smiling beside the same phone gone grey and quiet; the promise in a black block across the bottom.',
    text={'b': 'before', 'a': 'after', 'words': '<span style="background:#0C0D10;color:#fff;padding:4px 22px 10px">Fix your phone addiction</span>'}, images={'before': f'{SC}s_554.5.jpg', 'after': f'{SC}s_300.0.jpg'})

add('19-eu-vs-addictive-apps', 'other', 'The EU vs addictive apps',
    '<div class="hd" data-k="words" style="left:60px;top:46px;font-size:88px;width:760px;color:#0C0D10"></div>' +
    '<div class="clip" data-k="clip" data-move="clip" style="left:60px;top:270px;width:640px;font-size:46px;transform:rotate(-2.5deg)"></div>' +
    phone(860, 70, 300, 610, '<div style="padding-top:58px">' + post() + post(play=True) + '</div><div style="position:absolute;left:0;right:0;bottom:0;height:150px;background:#FBFAF7;display:grid;place-items:center"><div style="width:76%;height:8px;background:#FF4433;border-radius:4px"></div></div>', rot=5, light=True, name='phone', z=2),
    ['Europe Says Infinite Scroll May Break the Law. Here’s Why', 'Instagram’s Addictive Design Explained: What Europe Found', 'Why Can’t I Stop Scrolling? It Was Designed That Way'],
    'her own ghana-marrify 10b edit (clipping + phone on white) · a paper screenshot (viral sample) · QUIT DATA NOW (tweet card)',
    'Real-document look on white: the European Commission’s real headline of 10 Jul 2026 re-set as a paper clipping, "addictive design" highlighted (no quotation marks, no source line, as in her 10b edit; source in NOTES.md); a phone whose endless feed is cut by a red line; the topic on top.',
    text={'words': 'The EU vs <span class="acc">addictive apps</span>', 'clip': 'Commission preliminarily finds the <mark>addictive design</mark> of Instagram and Facebook in breach of the Digital Services Act'},
    style='.t{--ground:#FFFFFF}')

add('20-not-your-fault', 'other', 'Phone addiction isn’t your fault',
    photo('152.0', 2560, 900, 20) +
    '<div class="it abs z4" data-k="words" style="left:50px;top:90px;font-size:96px;width:560px;color:#0C0D10;line-height:.98"></div>' +
    phone(110, 520, 230, 470, '<div style="padding-top:60px">' + post() + '</div>', rot=-10, light=True, name='phone', z=4),
    ['Why Am I Addicted to My Phone? 5 Design Tricks to Blame', 'Why Can’t I Stop Scrolling? It Was Designed That Way'],
    'I QUIT (big face) · Never get distracted again (face + words) · It Clicked. (one line, one face)',
    'Big-face close crop: her calm face fills the right of the frame; on the soft wall at the left, the line in ink with "fault" in red, underlined in red pen; a light phone peeking in at the bottom left.',
    text={'words': 'Phone addiction isn’t your <span style="position:relative;display:inline-block;color:#E8321F">fault<svg viewBox="0 0 300 40" style="position:absolute;left:-2%;top:92%;width:104%;height:30px;overflow:visible"><path d="M4 26 C 90 8, 200 30, 296 12" stroke="#E8321F" stroke-width="9" fill="none" stroke-linecap="round"/></svg></span>'}, images=imgs('152.0'))


# ======================= ROUND 2 (after critic 1): replacements =======================
add('01-why-cant-stop-scrolling', 'photo', 'Why you can’t stop scrolling',
    photo('300.0', 1800, 900, 100) +
    '<div class="it abs z4" data-k="words" style="left:48px;top:64px;font-size:92px;width:640px;line-height:1.2"></div>' +
    phone(90, 330, 190, 380, FEED, rot=-8, light=True, name='phone', z=3),
    ['How Apps Are Designed to Be Addictive, a Researcher Explains', 'Phone Addiction Isn’t an Accident: The 5 Features Behind It'],
    'stop lying to yourself (DOAC, highlight box) · Never get distracted again (Justin Sung) · Stop wasting evenings',
    'Her in her room, big and bright (closed smile, hand raised by her cheek); the topic in a white and a yellow box on the wall; a light phone mid-feed under the words.',
    text={'words': '<span class="bx">Why you can’t</span><br><span class="bx y">stop scrolling</span>'}, images=imgs('300.0'))

add('02-apps-engineered-to-addict', 'photo', 'Apps engineered to addict you',
    photo('157.0', 2000, 640, 273) +
    '<div class="nr abs z2 sh" data-k="top" style="left:0;width:1280px;text-align:center;top:16px;font-size:70px;color:#fff"></div>' +
    '<div class="an abs z2" data-k="words" style="left:0;width:1280px;text-align:center;top:84px;font-size:180px;color:#FF4433;text-shadow:0 4px 18px rgba(0,0,0,.25)"></div>' +
    icon(930, 450, 180, 'chat', '#15161B', badge='99+', name='app', z=4, rot=8),
    ['Why Can’t I Stop Scrolling? It Was Designed That Way', 'Why You Can’t Stop Scrolling: 5 Features Designed on Purpose', 'Why You Keep Picking Up Your Phone Without Thinking'],
    'FAVOR / POV (huge word over the head) · COOK (fpt.doc) · UI UX roadmap',
    'Wide and bright: her, finger at her chin, thinking; "ADDICT YOU" in huge red letters right above her head, "apps engineered to" above it in serif; one big app icon with a 99+ badge by her shoulder.',
    text={'top': '<i>apps engineered to</i>', 'words': 'addict you'}, images=imgs('157.0'))

add('03-how-apps-keep-you-scrolling', 'photo', 'How apps keep you scrolling',
    photo('475.2', 2100, 300, 175) +
    '<div class="it abs z4 sh2" data-k="words" style="left:36px;top:26px;font-size:70px;width:1240px;color:#fff;white-space:nowrap"></div>' +
    phone(900, 170, 300, 620, '<div style="position:absolute;left:0;right:0;top:46px;display:grid;place-items:center">' + spinner(54, '#555') + '</div><div style="padding-top:118px">' + post(play=True) + post() + '</div>', rot=5, light=True, name='phone', z=4) +
    '<div class="hand abs z5 sh" data-k="l1" style="left:640px;top:180px;font-size:62px;color:#fff"></div>' +
    arrow((830, 215), (900, 200), (985, 236), w=8, head=26, color='#FFE14D', name='a1') +
    '<div class="hand abs z5 sh" data-k="l2" style="left:610px;top:380px;font-size:62px;color:#fff"></div>' +
    arrow((850, 420), (900, 440), (960, 410), w=8, head=26, color='#FFE14D', name='a2') +
    '<div class="hand abs z5 sh" data-k="l3" style="left:630px;top:580px;font-size:62px;color:#fff"></div>' +
    arrow((830, 615), (880, 640), (940, 620), w=8, head=26, color='#FFE14D', name='a3'),
    ['Why Am I Addicted to My Phone? 5 Design Tricks to Blame', 'Phone Addiction Isn’t an Accident: The 5 Features Behind It'],
    'Fitness sales framework (drawn steps) · Pinterest annotated vlogs (arrows, handwriting) · new york city writing',
    'Her on the left, finger raised; the title across the top, "scrolling" bigger in yellow; a light phone on the right annotated in big handwriting: refresh, autoplay, endless.',
    text={'words': 'How apps keep you <span class="yel" style="font-size:1.3em">scrolling</span>', 'l1': 'refresh', 'l2': 'autoplay', 'l3': 'endless'}, images=imgs('475.2'))

add('04-stop-doomscrolling', 'photo', 'Stop doomscrolling',
    photo('292.7', 1500, 820, 120) +
    '<div class="abs z4" style="left:46px;top:150px"><div class="an" data-k="stop" style="font-size:250px;line-height:.86"></div>'
    '<div class="it" data-k="words" style="font-size:92px;margin-top:16px"></div></div>',
    ['How to Use Your Phone Less (Simple Settings That Help)', 'Why You Can’t Put Your Phone Down at Night'],
    'STOP THIS! (red box) · Stop wasting evenings · Never get distracted again',
    'Her palm up like a stop sign, close and bright; STOP in a red block, "doomscrolling" in a white one; a light phone mid-feed under the palm she is refusing.',
    text={'stop': '<span class="bx r" style="padding:.02em .1em .04em">Stop</span>', 'words': '<span class="bx">doomscrolling</span>'}, images=imgs('292.7'))

add('05-turn-off-these-settings', 'photo', 'Turn off these addictive settings',
    photo('238.5', 1800, 360, 120) +
    '<div class="card" data-move="card" style="left:700px;top:70px;width:540px;padding-top:30px;transform:rotate(2deg)">'
    '<div class="it" data-k="words" style="font-size:60px;padding:0 30px 26px;line-height:.98"></div>' +
    ''.join('<div class="row"' + (' style="padding-bottom:30px"' if i == 3 else '') + f'><span data-k="r{i}"></span><span style="display:flex;gap:14px;align-items:center"><b class="mono" style="font-size:30px;color:#FF4433">off</b><i class="tog off"></i></span></div>' for i in (1, 2, 3)) +
    '</div>',
    ['Why Am I Addicted to My Phone? 5 Design Tricks to Blame', 'Why Can’t I Stop Scrolling? It Was Designed That Way'],
    'Everything done by 2pm (checklist card) · Boring way (notification cards beside the face) · Forget about going viral (tweet card)',
    'Her on the left, calm, raised finger; a paper-white settings card on the right IS the text: "Turn off these addictive settings" over three switches, each marked OFF in red (Autoplay, Notifications, App badges).',
    text={'words': 'Turn off these<br><span class="red">addictive settings</span>', 'r1': 'Autoplay', 'r2': 'Notifications', 'r3': 'App badges'}, images=imgs('238.5'))

add('06-use-your-phone-less', 'photo', 'How to use your phone less',
    photo('747.0', 1800, 880, 110, br='1.1') .replace('saturate(1.06)', '') +
    '<div class="it abs z4 sh2" data-k="words" style="left:50px;top:120px;font-size:100px;width:620px;color:#fff;line-height:.95"></div>' +
    '<div class="hand abs z5" data-k="note" style="left:60px;top:500px;font-size:64px;color:#FF4433;transform:rotate(-4deg);background:#fff;padding:6px 22px 12px;box-shadow:0 12px 26px rgba(0,0,0,.35)"></div>',
    ['How to Stop Scrolling: Phone Settings That Actually Help', 'Why Your Phone Is So Hard to Put Down, Explained'],
    'Day 1 / Day 900 (black-and-white photo) · how to be consistent (one red word) · just start. (editorial)',
    'Her whole photo in black and white (the only colour is red): calm, on the right; the promise big and white on the left with "less" in red; a white note with "tip: go grayscale" in red handwriting.',
    text={'words': 'How to use<br>your phone<br><span class="red">less</span>', 'note': 'Grayscale'}, images=imgs('747.0'),
    style='.photo img{filter:grayscale(1) brightness(1.18) contrast(1.12)!important}')

add('07-screen-time-not-an-accident', 'photo', 'Your screen time isn’t an accident',
    photo('350.9', 1760, 330, 130) +
    '<div class="it abs z4" data-k="words" style="left:640px;top:36px;font-size:66px;width:640px;line-height:1.18"></div>' +
    '<div class="card" data-move="card" style="left:650px;top:268px;width:590px;height:420px;background:#16171B;color:#F4F1EA;padding:30px 36px">'
    '<div class="it" data-k="card" style="font-size:40px;letter-spacing:-.02em"></div>'
    '<div style="position:absolute;left:36px;right:36px;bottom:36px;height:280px;display:flex;align-items:flex-end;gap:18px">' +
    ''.join(f'<i style="flex:1;height:{h}px;border-radius:12px;background:{"#FF4433" if i == 6 else "#3A3D45"}"></i>' for i, h in enumerate([110, 140, 125, 175, 200, 232, 280])) +
    '</div></div>',
    ['How Apps Are Designed to Be Addictive, a Researcher Explains', 'Why You Can’t Stop Scrolling: 5 Features Designed on Purpose'],
    'Never get distracted again (card beside the face) · Space complexity (chart) · stop lying to yourself (boxed words)',
    'Her on the left, hand at her temple, thinking (closed mouth); the line on the right in two black boxes, "accident" in yellow; under it a generic dark screen-time card whose bars climb all week to a red last day (no numbers).',
    text={'words': '<span class="bx k">Your screen time</span><br><span class="bx k">isn’t an <span class="yel">accident</span></span>', 'card': 'Screen time this week'}, images=imgs('350.9'))

add('08-why-social-media-addictive', 'photo', 'Why is social media addictive?',
    photo('152.0', 1800, 860, 90) +
    icon(470, 110, 160, 'heart', '#FF4433', badge='24', rot=-10, name='i1') +
    icon(1080, 170, 150, 'chat', '#1B3FD8', badge='9', rot=9, name='i2') +
    '<div class="abs z5" style="left:40px;top:430px;width:640px"><div class="it sh2" data-k="top" style="font-size:62px;color:#fff"></div>'
    '<div class="an sh2" data-k="words" style="font-size:156px;color:#FFE14D;margin-top:6px"></div></div>',
    ['Why You Keep Picking Up Your Phone Without Thinking', 'Why Can’t I Stop Scrolling? It Was Designed That Way'],
    'you’re in a war (icons around the head) · THEY LIED TO US (bottom line) · I CAN’T DO THIS',
    'Her on the right, calm; two big generic icons (a like with 24, comments with 9) grouped by her head on the right; the question on the left, "ADDICTIVE?" in big yellow letters.',
    text={'top': 'Why is social media', 'words': 'addictive?'}, images=imgs('152.0'))

add('09-cant-put-your-phone-down', 'collage', 'Can’t put your phone down?',
    photo('437.0', 1900, 900, 120) +
    '<div class="nr abs z5 sh" data-k="words" style="left:50px;top:56px;font-size:96px;width:640px;color:#fff;line-height:.98"></div>' +
    stk_phone(120, 380, -8, mini_lock('1:40'), w=150, h=300, name='s_phone') +
    '<div class="lab" data-k="l1" style="left:330px;top:560px;font-size:38px"></div>' +
    stk_icon(1100, 80, 120, 'heart', '#FF4433', 8, badge='99+', name='s_heart') +
    '<div class="lab" data-k="l2" style="left:1110px;top:250px;font-size:38px"></div>',
    ['Why Am I Addicted to My Phone? 5 Design Tricks to Blame', 'Phone Addiction Isn’t an Accident: The 5 Features Behind It'],
    'Time to lock in. (serif line + small labels) · Capsule wardrobe · Thought of these?',
    'Collage over her natural photo, her on the right: the question in a big serif on the left; two cut-out stickers only, a lock screen at 1:40 full of notifications ("1:40 am") and a like icon with 99+ by her head ("likes").',
    text={'words': 'Can’t put<br><i>your phone down?</i>', 'l1': '1:40 am', 'l2': 'likes'}, images=imgs('437.0'))

add('10-phone-addiction-explained', 'collage', 'Phone addiction, explained',
    photo('163.5', 1280, 655, 175) +
    '<div class="abs z5" data-move="strip" style="left:110px;top:530px;width:1060px;height:150px;background:#F4EFE4;transform:rotate(-2deg);box-shadow:0 14px 30px rgba(0,0,0,.35);display:grid;place-items:center">'
    '<div class="ins" data-k="words" style="font-size:104px;color:#141414;white-space:nowrap"></div></div>' +
    stk_icon(90, 90, 120, 'bell', '#FFB000', -9, badge='12', name='s_bell', fg='#111') +
    '<div class="lab" data-k="l1" style="left:60px;top:260px;font-size:38px"></div>' +
    stk_phone(1040, 60, 8, mini_feed(), w=150, h=300, name='s_phone') +
    '<div class="lab" data-k="l2" style="left:930px;top:400px;font-size:38px"></div>',
    ['Why Can’t I Stop Scrolling? It Was Designed That Way', 'Why You Can’t Stop Scrolling: 5 Features Designed on Purpose'],
    'How to be Feminine (big serif) · in defense of being online (paper strip) · Capsule wardrobe',
    'Collage, wide: her calm and centred; the title in Instrument Serif on a strip of paper stuck across the bottom; two stickers with their own labels, a bell with 12 ("notifications") and an endless feed ("infinite scroll").',
    text={'words': 'Phone addiction, <i>explained</i>', 'l1': 'notifications', 'l2': 'infinite scroll'}, images=imgs('163.5'))

add('11-apps-impossible-to-close', 'collage', 'Why apps feel impossible to close',
    photo('874.7', 1280, 525, 199) +
    '<div class="stk" data-move="s_x" style="left:40px;top:40px;transform:rotate(-8deg);--r:50%;padding:10px"><div style="width:220px;height:220px;border-radius:50%;background:#15161B;display:grid;place-items:center"><span style="width:110px;height:110px;display:block">' + glyph('x', '#fff', 3) + '</span></div></div>' +
    '<div class="lab" data-k="l1" style="left:120px;top:300px;font-size:40px"></div>' +
    stk_icon(1020, 450, 130, 'play', '#FF4433', 8, badge='99+', name='s_app') +
    '<div class="pf abs z5 sh" data-k="words" style="left:760px;top:56px;width:480px;text-align:right;font-size:70px;color:#fff;font-weight:600;line-height:1"></div>',
    ['Infinite Scroll Explained: Why It Never Stops', 'Why Can’t I Stop Scrolling? It Was Designed That Way'],
    'Thought of these? (one object by the hand) · in defense of being online · Time to lock in.',
    'Collage, wide: her hand reaching up to a huge black "close" button sticker; the line in Playfair on the right, "impossible" bigger in italic; one video icon with 99+ low on the right.',
    text={'words': 'Why apps feel <i style="font-style:italic;font-size:1.35em;display:block">impossible</i>to close', 'l1': 'close?'}, images=imgs('874.7'))

add('12-stop-scrolling-at-night', 'collage', 'how to stop scrolling at night',
    photo('442.5', 1280, 655, 175) +
    '<div class="abs z5" data-move="strip" style="left:150px;top:24px;width:980px;height:118px;background:#16234A;transform:rotate(1.5deg);box-shadow:0 14px 30px rgba(0,0,0,.35);display:grid;place-items:center"><div class="nr" data-k="words" style="font-size:72px;color:#F4EFE4;white-space:nowrap"></div></div>' +
    '<div class="stk" data-move="s_moon" style="left:1050px;top:180px;transform:rotate(8deg);--r:50%;padding:9px"><div style="width:170px;height:170px;border-radius:50%;background:#16234A;display:grid;place-items:center"><span style="width:100px;height:100px;display:block">' + glyph('moon', '#FFE14D', 2, True) + '</span></div></div>' +
    stk_phone(70, 230, -8, mini_lock('1:40'), w=180, h=360, name='s_phone') +
    '<div class="lab" data-k="l1" style="left:80px;top:640px;font-size:40px"></div>',
    ['Why Your Phone Is So Hard to Put Down, Explained', 'How to Use Your Phone Less (Simple Settings That Help)'],
    'Time to lock in. (stickers + one line) · alone in korea (lowercase serif) · new york city writing',
    'Collage over her full photo: her photo graded cool and dim like night (flat, no glow); the line in lowercase cream serif on a strip of night-blue paper across the top; a moon sticker on the right and a 1:40 lock screen sticker on the left ("1:40 am").',
    text={'words': 'how to stop scrolling <i>at night</i>', 'l1': '1:40 am'}, images=imgs('442.5'))

add('15-infinite-scroll-feels-addictive', 'graphic', 'Why infinite scroll feels addictive',
    '<div class="hd" data-k="words" style="left:60px;top:190px;font-size:116px;width:700px;color:#0C0D10"></div>' +
    '<div data-move="feed" class="abs z2 light" style="left:790px;top:-260px;width:330px;transform:rotate(7deg)"><div class="ph light" style="position:relative;width:330px;height:640px;margin-top:260px;border-radius:52px"><div class="scr"><div class="isl"></div><div style="padding:60px 16px 0">' + feedlong + '</div></div></div></div>',
    ['Why Websites Got Rid of the "Next Page" Button', 'Why Can’t I Stop Scrolling? It Was Designed That Way'],
    'her database-indexes thumbnail (one drawn mechanism) · Two Sum (flat drawing) · div div div (repetition)',
    'No face. Warm paper ground; the question on the left in ink with "addictive" in red; one tall light phone of an endless feed on the right, running off the top of the frame.',
    text={'words': 'Why infinite<br>scroll feels<br><span class="acc">addictive</span>'}, style='.t{--ground:#F2EFE9}')

add('16-why-notifications-are-red', 'graphic', 'Why notifications are red',
    '<div class="hd" data-k="words" style="left:60px;top:60px;font-size:112px;width:700px"></div>' +
    '<div class="abs z3" data-move="badges" style="left:70px;top:380px;display:flex;align-items:center;gap:30px">'
    '<div class="bdg" style="position:relative;font-size:90px;background:#2F6BFF;--bdring:#0C0D10">1</div>'
    '<div class="bdg" style="position:relative;font-size:90px;background:#22B573;--bdring:#0C0D10">1</div>'
    '<div class="bdg" style="position:relative;font-size:210px;--bdring:#0C0D10">1</div></div>' +
    f'<img class="me" data-img="photo" data-move="her" src="{CUT}895.75_col_white.png" style="left:690px;top:150px;height:570px">',
    ['Why You Keep Picking Up Your Phone Without Thinking', 'Why Am I Addicted to My Phone? 5 Design Tricks to Blame'],
    'her database-indexes thumbnail (cut-out with outline) · stop lying to yourself (one red word) · 18+ THEY LIED TO US (one badge)',
    'Ink ground; the question big, "red" in red; three notification badges in a row, blue and green small, the red one huge; her colour cut-out with a white outline on the right, calm.',
    text={'words': 'Why notifications<br>are <span class="acc">red</span>'}, images={'photo': f'{CUT}895.75_col_white.png'})

dots = [((700, 112), (925, 140)), ((1190, 96), (1085, 128)), ((700, 300), (915, 330)), ((700, 500), (835, 520)), ((1190, 610), (1100, 630))]
add('17-five-tricks-apps-use', 'graphic', '5 tricks apps use on you',
    '<div class="hd" data-k="words" style="left:60px;top:110px;font-size:120px;width:560px"></div>' +
    phone(800, 50, 320, 640, '<div style="position:absolute;left:0;right:0;top:54px;display:grid;place-items:center">' + spinner(46, '#666') + '</div>'
          '<div style="position:absolute;right:26px;top:52px;width:46px;height:46px"><div class="bdg" style="position:relative;font-size:26px;--bdring:#EDEAE3">8</div></div>'
          '<div style="padding-top:116px">' + post(play=True) + '<div class="post"><div class="who"><i></i><b></b></div><div class="ln"></div><div class="acts" style="display:flex;gap:16px;margin-top:12px"><span style="width:36px;height:36px;display:block">' + glyph('heart', '#FF4433', 2.4, True) + '</span></div></div>' + post() + '</div>', rot=0, light=True, name='phone', z=2) +
    '<svg class="abs z3" width="1280" height="720" style="left:0;top:0">' + ''.join(f'<path d="M{a[0]} {a[1]} L{b[0]} {b[1]}" stroke="#FFE14D" stroke-width="5" stroke-linecap="round"/><circle cx="{b[0]}" cy="{b[1]}" r="9" fill="#FFE14D"/>' for a, b in dots) + '</svg>' +
    ''.join(f'<div class="abs z4" data-move="n{i+1}" style="left:{a[0]-36}px;top:{a[1]-36}px;width:72px;height:72px;border-radius:50%;background:#FFE14D;color:#111;font:800 44px IT;display:grid;place-items:center;box-shadow:0 8px 18px rgba(0,0,0,.3)">{i+1}</div>' for i, (a, b) in enumerate(dots)),
    ['Why Can’t I Stop Scrolling? It Was Designed That Way', 'Phone Addiction Isn’t an Accident: The 5 Features Behind It'],
    'her database-indexes thumbnail (one mechanism, numbered) · Fitness sales framework · Space complexity of an algorithm',
    'No face. Electric blue ground; the words big and white on the left; one light phone on the right with five yellow numbered pins on its parts (refresh, red badge, autoplay video, like, endless feed).',
    text={'words': '5 tricks<br>apps use<br><span style="color:#FFE14D">on you</span>'}, style='.t{--ground:#1B3FD8;--fg:#fff}')

add('18-before-after', 'other', 'Fix your phone addiction',
    half('695.5', 'L', 1500, 300, 110) + half('300.0', 'R', 1500, 340, 110) +
    '<i class="abs z3" style="left:637px;top:0;width:6px;height:720px;background:#fff"></i>' +
    '<div class="mono abs z4" data-k="b" style="left:30px;top:28px;font-size:36px;background:#0C0D10;color:#fff;padding:6px 14px"></div>' +
    '<div class="mono abs z4" data-k="a" style="left:670px;top:28px;font-size:36px;background:#fff;color:#0C0D10;padding:6px 14px"></div>' +
    phone(370, 200, 250, 480, busy, rot=-7, name='p_before', z=3) + phone(1010, 200, 250, 480, calm, rot=7, name='p_after', z=3) +
    '<div class="it abs z5" data-k="words" style="left:0;width:1280px;top:632px;height:88px;font-size:64px;background:#0C0D10;color:#fff;text-align:center;line-height:84px"></div>',
    ['How to Stop Scrolling: Phone Settings That Actually Help', 'How to Use Your Phone Less (Simple Settings That Help)'],
    'Before / After (Justin Sung) · Day 1 / Day 900 · 12:30 PM / 7:30 PM split',
    'Split before / after: left, her grimacing beside a phone crowded with coloured apps and red badges; right, her smiling beside the same phone gone grey and quiet; the promise on a black strip along the bottom.',
    text={'b': 'before', 'a': 'after', 'words': 'Fix your phone addiction'}, images={'before': f'{SC}s_695.5.jpg', 'after': f'{SC}s_300.0.jpg'})

add('19-eu-vs-addictive-apps', 'other', 'The EU vs addictive apps',
    '<div class="hd" data-k="words" style="left:60px;top:40px;font-size:96px;width:900px;color:#0C0D10"></div>' +
    '<div data-move="clip" class="abs z3" style="left:30px;top:330px;width:900px;background:#fff;padding:26px 30px 18px;box-shadow:0 16px 36px rgba(0,0,0,.22);transform:rotate(-2deg)">'
    '<div style="position:relative"><img data-img="clip" src="../../assets/props/eu-headline.png" style="display:block;width:100%">'
    '<i style="position:absolute;left:78.5%;top:12%;width:20.5%;height:36%;background:#FFE14D;mix-blend-mode:multiply"></i>'
    '<i style="position:absolute;left:0;top:57%;width:16%;height:36%;background:#FFE14D;mix-blend-mode:multiply"></i></div>'
    '<div class="mono" data-k="credit" style="font-size:28px;color:#6b6b70;margin-top:12px"></div></div>' +
    f'<img class="me" data-img="photo" data-move="her" src="{CUT}895.75_col_red.png" style="left:690px;top:150px;height:570px;z-index:4">',
    ['Europe Says Infinite Scroll May Break the Law. Here’s Why', 'Instagram’s Addictive Design Explained: What Europe Found', 'Why Can’t I Stop Scrolling? It Was Designed That Way'],
    'her own ghana-marrify 10b edit (real document + highlight) · a paper screenshot (viral sample) · QUIT DATA NOW (tweet card)',
    'Real-document look on white: the real European Commission headline (10 Jul 2026, a screenshot of their page) stuck on as a clipping, "addictive design" highlighted, small source credit; her colour cut-out with a red outline on the right; the topic on top.',
    text={'words': 'The EU vs<br><span class="acc">addictive apps</span>', 'credit': 'European Commission, 10 Jul 2026'},
    images={'clip': '../../assets/props/eu-headline.png', 'photo': f'{CUT}895.75_col_red.png'}, style='.t{--ground:#FFFFFF}')

add('20-not-your-fault', 'other', 'Phone addiction isn’t your fault',
    photo('152.0', 2560, 900, 20) +
    '<div class="it abs z4" data-k="words" style="left:40px;top:110px;font-size:92px;width:560px;color:#0C0D10;line-height:.98;background:#F4EFE4;padding:30px 34px 44px;transform:rotate(-2deg);box-shadow:0 16px 34px rgba(0,0,0,.3)"></div>',
    ['Why Am I Addicted to My Phone? 5 Design Tricks to Blame', 'Why Can’t I Stop Scrolling? It Was Designed That Way'],
    'I QUIT (big face) · Never get distracted again (face + words) · It Clicked. (one line, one face)',
    'Big-face close crop: her calm face fills the right of the frame; on the left, the line in ink on a paper card, "fault" bigger, in red, underlined in red pen. Nothing else.',
    text={'words': 'Phone addiction isn’t your <span style="position:relative;display:inline-block;color:#E8321F;font-size:1.2em">fault<svg viewBox="0 0 300 40" style="position:absolute;left:-2%;top:92%;width:104%;height:30px;overflow:visible"><path d="M4 26 C 90 8, 200 30, 296 12" stroke="#E8321F" stroke-width="9" fill="none" stroke-linecap="round"/></svg></span>'}, images=imgs('152.0'))


# ======================= ROUND 3 (after critic 2) =======================
add('01-why-cant-stop-scrolling', 'photo', 'Why you can’t stop scrolling',
    photo('300.0', 1800, 900, 100) +
    '<div class="it abs z4" data-k="words" style="left:44px;top:430px;font-size:104px;width:760px;line-height:1.16;transform:rotate(-2deg)"></div>' +
    phone(1030, 330, 220, 450, FEED, rot=9, light=True, name='phone', z=3),
    ['How Apps Are Designed to Be Addictive, a Researcher Explains', 'Phone Addiction Isn’t an Accident: The 5 Features Behind It'],
    'stop lying to yourself (DOAC, highlight box) · Never get distracted again (Justin Sung) · it’s a problem (Pinterest, words low)',
    'Her in her room, big and bright (closed smile, hand raised by her cheek); the topic low on the left in a white and a yellow box, tilted like tape; a light phone mid-feed by her raised hand.',
    text={'words': '<span class="bx">Why you can’t</span><br><span class="bx y">stop scrolling</span>'}, images=imgs('300.0'))

add('02-apps-engineered-to-addict', 'photo', 'Apps engineered to addict you',
    photo('157.0', 1700, 640, 232) +
    '<div class="abs z2" style="left:0;width:1280px;text-align:center;top:14px"><span class="nr bx k" data-k="top" style="font-size:54px;padding:2px 18px 8px"></span></div>' +
    '<div class="an abs z2" data-k="words" style="left:0;width:1280px;text-align:center;top:82px;font-size:166px;color:#FF4433;text-shadow:0 4px 18px rgba(0,0,0,.25)"></div>' +
    icon(850, 400, 220, 'chat', '#15161B', badge='99+', name='app', z=4, rot=8),
    ['Why Can’t I Stop Scrolling? It Was Designed That Way', 'Why You Can’t Stop Scrolling: 5 Features Designed on Purpose', 'Why You Keep Picking Up Your Phone Without Thinking'],
    'FAVOR / POV (huge word over the head) · COOK (fpt.doc) · UI UX roadmap',
    'Wide and bright: her, finger at her chin, thinking; "ADDICT YOU" in huge red letters right above her head, "apps engineered to" on a black tab above; one big app icon with a 99+ badge by her shoulder.',
    text={'top': '<i style="color:#fff">apps engineered to</i>', 'words': 'addict you'}, images=imgs('157.0'))

add('04-stop-doomscrolling', 'photo', 'Stop doomscrolling',
    photo('292.7', 1500, 820, 120) +
    '<div class="abs z4" style="left:46px;top:170px"><div class="an" data-k="stop" style="font-size:212px;line-height:.86"></div>'
    '<div class="it" data-k="words" style="font-size:84px;margin-top:16px"></div></div>' +
    phone(1010, 380, 210, 430, FEED, rot=10, light=True, name='phone', z=3),
    ['How to Use Your Phone Less (Simple Settings That Help)', 'Why You Can’t Put Your Phone Down at Night'],
    'STOP THIS! (red box) · Stop wasting evenings · Never get distracted again',
    'Her palm up like a stop sign, close and bright; STOP in a red block, "doomscrolling" in a white one; a light phone mid-feed under the palm she is refusing.',
    text={'stop': '<span class="bx r" style="padding:.02em .1em .04em">Stop</span>', 'words': '<span class="bx">doomscrolling</span>'}, images=imgs('292.7'))

add('06-use-your-phone-less', 'photo', 'How to use your phone less',
    photo('747.0', 1800, 880, 110, br='1.1') +
    '<div class="it abs z4 sh2" data-k="words" style="left:50px;top:100px;font-size:100px;width:620px;color:#fff;line-height:.95"></div>' +
    '<div class="card" data-move="card" style="left:56px;top:470px;width:430px;transform:rotate(-3deg)"><div class="row" style="border-top:0;padding:26px 30px"><span data-k="note" style="font-size:44px"></span><i class="tog on" style="width:110px;height:64px;border-radius:32px"></i></div></div>',
    ['How to Stop Scrolling: Phone Settings That Actually Help', 'Why Your Phone Is So Hard to Put Down, Explained'],
    'Day 1 / Day 900 (black-and-white photo) · how to be consistent (one red word) · just start. (editorial)',
    'Her whole photo in black and white (the only colour is red): calm, on the right; the promise big and white on the left with "less" in red; a white settings card with one switch, "Grayscale", turned on in red (that is why the photo is grey).',
    text={'words': 'How to use<br>your phone<br><span class="red">less</span>', 'note': 'Grayscale'}, images=imgs('747.0'),
    style='.photo img{filter:grayscale(1) brightness(1.18) contrast(1.12)!important}')

add('08-why-social-media-addictive', 'photo', 'Why is social media addictive?',
    photo('152.0', 1800, 860, 90) +
    icon(1050, 70, 180, 'heart', '#FF4433', badge='24', rot=-10, name='i1') +
    icon(1100, 300, 140, 'chat', '#1B3FD8', badge='9', rot=9, name='i2') +
    '<div class="it abs z5 sh2" data-k="words" style="left:40px;top:150px;width:560px;font-size:90px;color:#fff;line-height:.98"></div>',
    ['Why You Keep Picking Up Your Phone Without Thinking', 'Why Can’t I Stop Scrolling? It Was Designed That Way'],
    'you’re in a war (icons around the head) · Why we can’t focus (sentence case) · I CAN’T DO THIS',
    'Her on the right, calm; two big generic icons (a like with 24, comments with 9) grouped by her head on the right; the question on the left in heavy sentence case, "addictive?" in yellow.',
    text={'words': 'Why is social media <span class="yel">addictive?</span>'}, images=imgs('152.0'))

add('09-cant-put-your-phone-down', 'collage', 'Can’t put your phone down?',
    photo('437.0', 1280, 655, 175) +
    stk_icon(1040, 70, 130, 'heart', '#FF4433', 8, badge='99+', name='s_heart') +
    stk_icon(110, 90, 120, 'bell', '#FF4433', -9, badge='12', name='s_bell') +
    slot(880, 330, 6) +
        '<div class="nr abs z5 sh" data-k="words" style="left:0;width:1280px;text-align:center;top:575px;font-size:92px;color:#fff;line-height:1;white-space:nowrap"></div>' +
    '<div class="lab" data-k="l1" style="left:1075px;top:240px;font-size:34px"></div>' +
    '<div class="lab" data-k="l2" style="left:100px;top:250px;font-size:34px"></div>' +
    '<div class="lab" data-k="l4" style="left:920px;top:506px;font-size:34px"></div>',
    ['Why Am I Addicted to My Phone? 5 Design Tricks to Blame', 'Phone Addiction Isn’t an Accident: The 5 Features Behind It'],
    'Time to lock in. (one serif line across her, small labels scattered) · Capsule wardrobe · Thought of these?',
    'Collage exactly in the time-to-lock-in manner: her full natural photo; one serif line low across her chin and hands; three cut-out stickers (a like with 99+, a bell with 12, a little slot machine of hearts), each labelled, each with its own small label, plus one more label.',
    text={'words': 'Can’t put <i>your phone down?</i>', 'l1': 'likes', 'l2': 'red badges', 'l4': 'slot machine'}, images=imgs('437.0'))

add('10-phone-addiction-explained', 'collage', 'Phone addiction, explained',
    photo('163.5', 1280, 655, 175) +
    '<div class="abs z5" data-move="strip" style="left:190px;top:462px;width:900px;height:130px;background:#F4EFE4;transform:rotate(-2deg);box-shadow:0 14px 30px rgba(0,0,0,.35);display:grid;place-items:center">'
    '<div class="ins" data-k="words" style="font-size:94px;color:#141414;white-space:nowrap"></div></div>' +
    stk_icon(90, 90, 120, 'play', '#15161B', -9, name='s_play') +
    '<div class="lab" data-k="l1" style="left:80px;top:260px;font-size:36px"></div>' +
    stk_phone(1040, 60, 8, mini_feed(), w=150, h=300, name='s_phone') +
    '<div class="lab" data-k="l2" style="left:880px;top:396px;font-size:36px"></div>',
    ['Why Can’t I Stop Scrolling? It Was Designed That Way', 'Why You Can’t Stop Scrolling: 5 Features Designed on Purpose'],
    'How to be Feminine (big serif) · in defense of being online (paper strip) · Capsule wardrobe',
    'Collage, wide: her calm and centred; the title in Instrument Serif on a strip of paper stuck across her; two stickers with their own labels, a video ("autoplay") and an endless feed ("infinite scroll").',
    text={'words': 'Phone addiction, <i>explained</i>', 'l1': 'autoplay', 'l2': 'infinite scroll'}, images=imgs('163.5'))

add('11-apps-impossible-to-close', 'collage', 'Why apps feel impossible to close',
    photo('874.7', 1280, 525, 199) +
    stk_phone(40, 120, -8, '<div style="position:absolute;inset:0;background:#2B2E36"></div><div style="position:absolute;left:50%;top:50%;width:70px;height:70px;margin:-35px;border-radius:50%;background:rgba(255,255,255,.9);display:grid;place-items:center"><span style="width:32px;height:32px;display:block;margin-left:5px">' + glyph('play', '#111', 2, True) + '</span></div><span style="position:absolute;right:16px;top:34px;width:16px;height:16px;display:block;opacity:.75">' + glyph('x', '#fff', 2) + '</span>', w=240, h=480, name='s_phone') +
    '<svg class="abs z5" width="1280" height="720" style="left:0;top:0"><ellipse cx="231" cy="166" rx="40" ry="36" fill="none" stroke="#FF4433" stroke-width="7" transform="rotate(-8 231 166)"/></svg>' +
    '<div class="pf abs z5" data-k="words" style="left:700px;top:50px;width:540px;text-align:right;font-size:66px;font-weight:600;line-height:1.22"></div>',
    ['Infinite Scroll Explained: Why It Never Stops', 'Why Can’t I Stop Scrolling? It Was Designed That Way'],
    'Thought of these? (one object by the hand) · in defense of being online · Time to lock in.',
    'Collage, wide: her hand up beside a phone sticker playing a video whose close X is tiny and faint, circled in red; the line in Playfair on the right on black tabs, "impossible" in yellow italic.',
    text={'words': '<span class="bx k">Why apps feel</span><br><span class="bx k"><i style="font-style:italic;color:#FFE14D">impossible</i></span><br><span class="bx k">to close</span>'}, images=imgs('874.7'))

clock = ('<div class="stk" data-move="s_clock" style="left:70px;top:250px;transform:rotate(-8deg);--r:50%;padding:9px"><div style="position:relative;width:200px;height:200px;border-radius:50%;background:#FBFAF7;border:10px solid #FF4433">'
         '<i style="position:absolute;left:50%;top:50%;width:8px;height:58px;margin-left:-4px;background:#111;border-radius:4px;transform-origin:50% 0;transform:rotate(-130deg)"></i>'
         '<i style="position:absolute;left:50%;top:50%;width:6px;height:78px;margin-left:-3px;background:#111;border-radius:3px;transform-origin:50% 0;transform:rotate(60deg)"></i>'
         '<i style="position:absolute;left:50%;top:50%;width:16px;height:16px;margin:-8px;background:#111;border-radius:50%"></i></div></div>')
add('12-stop-scrolling-at-night', 'collage', 'how to stop scrolling at night',
    photo('442.5', 1280, 655, 175, br='0.86') + '<div class="abs" style="inset:0;z-index:2;background:rgba(14,26,72,.38)"></div>' +
    '<div class="abs z5" data-move="strip" style="left:170px;top:24px;width:940px;height:108px;background:#16234A;transform:rotate(1.5deg);box-shadow:0 14px 30px rgba(0,0,0,.35);display:grid;place-items:center"><div class="nr" data-k="words" style="font-size:70px;color:#F4EFE4;white-space:nowrap"></div></div>' +
    '<div class="stk" data-move="s_moon" style="left:1020px;top:180px;transform:rotate(8deg);--r:50%;padding:9px"><div style="width:210px;height:210px;border-radius:50%;background:#16234A;display:grid;place-items:center"><span style="width:100px;height:100px;display:block">' + glyph('moon', '#FFE14D', 2, True) + '</span></div></div>' +
    clock + '<div class="lab" data-k="l1" style="left:100px;top:500px;font-size:38px"></div>' +
    '<div class="lab" data-k="l2" style="left:1050px;top:420px;font-size:38px"></div>',
    ['Why Your Phone Is So Hard to Put Down, Explained', 'How to Use Your Phone Less (Simple Settings That Help)'],
    'Time to lock in. (stickers + small labels) · alone in korea (lowercase serif) · new york city writing',
    'Collage over her full photo: her photo graded cool and dim like night (flat, no glow); the line in lowercase cream serif on a strip of night-blue paper across the top; a clock at 1:40 on the left ("1:40 am") and a moon on the right ("bedtime").',
    text={'words': 'how to stop scrolling <i>at night</i>', 'l1': '1:40 am', 'l2': 'bedtime'}, images=imgs('442.5'))

ribbon = ''.join('<div class="post" style="margin:0 0 16px;--postbg:#fff;--ln:#D3CEC2;--av:#BDB6A6;--pic:#D9D4C8;box-shadow:0 3px 14px rgba(0,0,0,.10)"><div class="who"><i></i><b></b></div><div class="pic" style="height:120px"></div><div class="ln"></div></div>' for _ in range(5))
add('15-infinite-scroll-feels-addictive', 'graphic', 'Why infinite scroll feels addictive',
    '<div class="hd" data-k="words" style="left:60px;top:46px;font-size:96px;width:640px;color:#0C0D10"></div>' +
    f'<img class="me" data-img="photo" data-move="her" src="{CUT}895.9_bw_red.png" style="left:-40px;top:330px;height:390px">' +
    '<div data-move="up" class="abs z1" style="left:840px;top:-560px;width:250px;opacity:.6">' + ribbon + '</div>' +
    '<div data-move="down" class="abs z1" style="left:840px;top:640px;width:250px;opacity:.6">' + ribbon + '</div>' +
    phone(820, 120, 290, 520, '<div style="padding:56px 0 0">' + ribbon.replace('margin:0 0 16px', 'margin:0 14px 14px') + '</div>', light=True, name='phone', z=2) +
    '<div class="it abs z3" data-k="inf" style="left:1130px;top:250px;font-size:150px;color:#FF4433;font-weight:800"></div>',
    ['Why Websites Got Rid of the "Next Page" Button', 'Why Can’t I Stop Scrolling? It Was Designed That Way'],
    'her database-indexes thumbnail (one drawn mechanism + cut-out) · div div div (repetition) · Two Sum (flat drawing)',
    'Paper ground; the question top-left in ink, "addictive" in red; her black-and-white cut-out (red outline, glancing) under it; a phone whose feed keeps going above and below it, off both edges of the frame, with a red ∞.',
    text={'words': 'Why infinite<br>scroll feels<br><span class="acc">addictive</span>', 'inf': '∞'}, images={'photo': f'{CUT}895.9_bw_red.png'}, style='.t{--ground:#F2EFE9}')

add('16-why-notifications-are-red', 'graphic', 'Why notifications are red',
    '<div class="hd" data-k="words" style="left:60px;top:60px;font-size:108px;width:700px"></div>' +
    '<div class="abs z3" data-move="badges" style="left:70px;top:360px;display:flex;align-items:center;gap:30px">'
    '<div class="bdg" style="position:relative;font-size:84px;background:#2F6BFF;--bdring:#0C0D10">1</div>'
    '<div class="bdg" style="position:relative;font-size:84px;background:#22B573;--bdring:#0C0D10">1</div>'
    '<div class="bdg" style="position:relative;font-size:230px;--bdring:#0C0D10">1</div></div>' +
    f'<img class="me" data-img="photo" data-move="her" src="{CUT}895.9_col_white.png" style="left:700px;top:150px;height:570px">',
    ['Why You Keep Picking Up Your Phone Without Thinking', 'Why Am I Addicted to My Phone? 5 Design Tricks to Blame'],
    'her database-indexes thumbnail (cut-out with outline) · stop lying to yourself (one red word) · 18+ THEY LIED TO US (one badge)',
    'Ink ground; the question big, "red" in red; three notification badges, blue and green small, the red one huge; her colour cut-out (white outline, glancing sideways at them) on the right.',
    text={'words': 'Why notifications<br>are <span class="acc">red</span>'}, images={'photo': f'{CUT}895.9_col_white.png'})

add('18-before-after', 'other', 'Break your scrolling habit',
    half('695.5', 'L', 1500, 300, 110) + half('300.0', 'R', 1500, 340, 110) +
    '<i class="abs z3" style="left:637px;top:0;width:6px;height:720px;background:#fff"></i>' +
    '<div class="mono abs z4" data-k="b" style="left:30px;top:28px;font-size:36px;background:#0C0D10;color:#fff;padding:6px 14px"></div>' +
    '<div class="mono abs z4" data-k="a" style="left:670px;top:28px;font-size:36px;background:#fff;color:#0C0D10;padding:6px 14px"></div>' +
    phone(26, 300, 170, 330, busy.replace('gap:18px','gap:12px').replace('padding:56px 16px 0','padding:46px 12px 0'), rot=-6, name='p_before', z=3) + phone(1086, 300, 170, 330, calm.replace('gap:18px','gap:12px').replace('padding:56px 16px 0','padding:46px 12px 0'), rot=6, name='p_after', z=3) +
    '<div class="it abs z5" data-k="words" style="left:0;width:1280px;top:632px;height:88px;font-size:64px;background:#0C0D10;color:#fff;text-align:center;line-height:84px"></div>',
    ['How to Stop Scrolling: Phone Settings That Actually Help', 'How to Use Your Phone Less (Simple Settings That Help)'],
    'Before / After (Justin Sung) · Day 1 / Day 900 · 12:30 PM / 7:30 PM split',
    'Split before / after: left, her grimacing, a phone crowded with coloured apps and red badges at the left edge; right, her smiling, the same phone gone grey and quiet at the right edge (both faces clear); the promise on a black strip along the bottom.',
    text={'b': 'before', 'a': 'after', 'words': 'Break your scrolling habit'}, images={'before': f'{SC}s_695.5.jpg', 'after': f'{SC}s_300.0.jpg'})

# ---------- write ----------
base = os.path.join(T, 'directions')
D.sort(key=lambda d: d['name'])
for d in D:
    if only and not any(d['name'].startswith(o) for o in only): continue
    p = os.path.join(base, d['name']); os.makedirs(p, exist_ok=True)
    html = (f'<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../../lib/v3.css">'
            f'<style>{d["style"]}</style></head><body><div class="t">\n{d["body"]}\n</div><script src="../../lib/bind.js"></script></body></html>\n')
    open(os.path.join(p, 'index.html'), 'w').write(html)
    cj = os.path.join(p, 'content.json')
    c = {'direction': d['direction'], 'kind': d['kind'], 'concept': 'v3 (2026-10-16)', 'references': d['refs'],
         'thumbnail_text': d['words'], 'title': d['titles'][0], 'titles': d['titles'], 'scores': '', 'recommended': '',
         'text': d['text'], 'images': d['images'], 'vars': {}}
    if os.path.exists(cj) and not reset:
        old = json.load(open(cj))
        for k in ['text', 'images', 'vars', 'nudge', 'class', 'scores', 'recommended']:
            if k in old: c[k] = old[k]
    json.dump(c, open(cj, 'w'), indent=2, ensure_ascii=False)
    print('wrote', d['name'])

for name, (src, kind, words, titles, refs) in KEEP.items():
    p = os.path.join(base, name)
    if not os.path.isdir(p): print('  ! missing kept direction', name, '(move', src, 'here first)'); continue
    c = json.load(open(os.path.join(p, 'content.json')))
    c.update({'kind': kind, 'thumbnail_text': words, 'titles': titles, 'title': titles[0], 'references': refs, 'concept': 'kept from v2 (' + src + ')'})
    c.setdefault('scores', ''); c['recommended'] = c.get('recommended', '') if not reset else ''
    json.dump(c, open(os.path.join(p, 'content.json'), 'w'), indent=2, ensure_ascii=False)
    print('kept', name)
