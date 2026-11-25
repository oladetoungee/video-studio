"""v2 thumbnail set (2026-10-16): writes directions/<NN-name>/index.html + content.json.
   python3 tools/gen2.py            -> writes every direction; KEEPS an existing content.json's text/images/vars/nudge
                                      (her studio edits) unless --reset
   python3 tools/gen2.py 03 --reset -> only directions starting with 03, overwriting content.json
Shared look: lib/v2.css. Her cut-outs: assets/cut/ (tools/prep_cut.py)."""
import json, os, sys, math

T = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
args = sys.argv[1:]; reset = '--reset' in args; only = [a for a in args if not a.startswith('--')]
CUT = '../../assets/cut/'

# ---------- glyphs (generic line icons) ----------
G = {
 'heart': '<path d="M12 20.5s-7.5-4.6-9.6-9.2A5.3 5.3 0 0 1 12 5.6a5.3 5.3 0 0 1 9.6 5.7c-2.1 4.6-9.6 9.2-9.6 9.2z"/>',
 'bell': '<path d="M6 16.5V11a6 6 0 0 1 12 0v5.5l1.8 1.8H4.2z"/><path d="M10 21a2 2 0 0 0 4 0"/>',
 'chat': '<path d="M4 5.5h16v10.5H10l-5 4v-4H4z"/>',
 'play': '<path d="M8 5.2l11 6.8-11 6.8z"/>',
 'refresh': '<path d="M19 12a7 7 0 1 1-2.1-5"/><path d="M17.5 3v4.2h-4.2"/>',
 'inf': '<path d="M12 12c-2-2.6-3.6-4-5.5-4a4 4 0 0 0 0 8c1.9 0 3.5-1.4 5.5-4s3.6-4 5.5-4a4 4 0 0 1 0 8c-1.9 0-3.5-1.4-5.5-4z"/>',
 'cam': '<rect x="3.5" y="6.5" width="17" height="12.5" rx="3"/><circle cx="12" cy="12.7" r="3.4"/>',
 'pin': '<path d="M12 21s-6-5.6-6-10.5a6 6 0 0 1 12 0C18 15.4 12 21 12 21z"/><circle cx="12" cy="10.5" r="2.2"/>',
 'mail': '<rect x="3.5" y="6" width="17" height="12.5" rx="2.5"/><path d="M4 7l8 6 8-6"/>',
 'note': '<path d="M9 18V6l10-2v12"/><circle cx="7" cy="18" r="2.2"/><circle cx="17" cy="16" r="2.2"/>',
}
def glyph(name, color='#F4F1EA', w=2.2, fill=False):
    f = color if fill else 'none'
    return f'<svg viewBox="0 0 24 24" fill="{f}" stroke="{color}" stroke-width="{w}" stroke-linecap="round" stroke-linejoin="round">{G[name]}</svg>'

def arrow(p0, c, p1, w=12, head=38, color=None, name='arrow'):
    """quadratic curve p0 -> p1 (control c) with an open arrow head at p1."""
    ang = math.atan2(p1[1] - c[1], p1[0] - c[0])
    h1 = (p1[0] - head * math.cos(ang - .5), p1[1] - head * math.sin(ang - .5))
    h2 = (p1[0] - head * math.cos(ang + .5), p1[1] - head * math.sin(ang + .5))
    col = f';--arw:{color}' if color else ''
    return (f'<svg class="arw" data-move="{name}" width="1280" height="720" style="left:0;top:0;--aw:{w}{col}">'
            f'<path d="M{p0[0]:.0f} {p0[1]:.0f} Q{c[0]:.0f} {c[1]:.0f} {p1[0]:.0f} {p1[1]:.0f}"/>'
            f'<path d="M{h1[0]:.0f} {h1[1]:.0f} L{p1[0]:.0f} {p1[1]:.0f} L{h2[0]:.0f} {h2[1]:.0f}"/></svg>')


def loop_path(cx, cy, rx, ry, a0, a1, head=40):
    """clockwise elliptical arc from angle a0 to a1 (degrees, 0 = right, 90 = down) with an arrow head at the end."""
    pts = [(cx + rx * math.cos(math.radians(a)), cy + ry * math.sin(math.radians(a))) for a in [a0 + (a1 - a0) * i / 80 for i in range(81)]]
    d = 'M' + ' L'.join(f'{x:.0f} {y:.0f}' for x, y in pts)
    (x0, y0), (x1, y1) = pts[-4], pts[-1]
    ang = math.atan2(y1 - y0, x1 - x0)
    h1 = (x1 - head * math.cos(ang - .5), y1 - head * math.sin(ang - .5)); h2 = (x1 - head * math.cos(ang + .5), y1 - head * math.sin(ang + .5))
    return f'<path d="{d}"/><path d="M{h1[0]:.0f} {h1[1]:.0f} L{x1:.0f} {y1:.0f} L{h2[0]:.0f} {h2[1]:.0f}"/>'

def post(pic=True, lines=1, heart=False, extra=''):
    acts = f'<div style="display:flex;gap:14px;margin-top:12px">{"".join(f"<span style=\'width:30px;height:30px;display:block\'>{glyph(g, "#8B8D94")}</span>" for g in ["heart","chat"])}</div>' if heart else ''
    return ('<div class="post"><div class="who"><i></i><b></b></div>' + ('<div class="pic"></div>' if pic else '') +
            '<div class="ln"></div>' * lines + '<div class="ln s"></div>' + acts + extra + '</div>')

def spinner(s, color='#F4F1EA'):
    ticks = ''.join(f'<i style="transform:rotate({i*30}deg);opacity:{0.25 + 0.75 * ((i) / 11):.2f}"></i>' for i in range(12))
    return f'<div class="spin" style="--s:{s}px;--spc:{color}">{ticks}</div>'

def me(img, left, top, h, name='photo'):
    return f'<img class="me" data-img="{name}" data-move="her" src="{CUT}{img}" style="left:{left}px;top:{top}px;height:{h}px">'

D = []  # (folder, content, css, body)

FACE = '895.75_bw_red.png'          # her cut-out: black-and-white, red outline (width = 1.59 x height)
TONES = ['#C9D5C6', '#E6D5B8', '#C6CFDD', '#E0CBC5']   # muted photo blocks inside the light feeds
def lpost(i, heart=True, h=170):
    acts = (f'<div style="display:flex;gap:14px;margin-top:12px">' + ''.join(f"<span style='width:30px;height:30px;display:block'>{glyph(g, '#8B8D94')}</span>" for g in ['heart', 'chat']) + '</div>') if heart else ''
    return (f'<div class="post"><div class="who"><i></i><b></b></div><div class="pic" style="height:{h}px;background:{TONES[i % 4]}"></div>'
            f'<div class="ln"></div><div class="ln s"></div>{acts}</div>')
def lfeed(n, scale=1, top=60, start=0):
    return f'<div style="padding-top:{top}px;transform:scale({scale});transform-origin:0 0;width:{100/scale:.1f}%">' + ''.join(lpost(start + i) for i in range(n)) + '</div>'
def lphone(left, top, w, h, rot, inner, name='phone', z=2, origin='50% 50%'):
    r = round(w * .17)
    return (f'<div data-move="{name}" class="abs z{z}" style="left:{left}px;top:{top}px;transform:rotate({rot}deg);transform-origin:{origin}">'
            f'<div class="ph light" style="position:relative;width:{w}px;height:{h}px;border-radius:{r}px;padding:{round(w*.038)}px">'
            f'<div class="scr" style="border-radius:{round(r*.8)}px"><div class="isl" style="width:{round(w*.29)}px;height:{round(w*.085)}px;margin-left:-{round(w*.145)}px;top:{round(w*.045)}px"></div>{inner}</div></div></div>')

# 01 ---------------------------------------------------------------- slot machine (faceless, ink)
def reel(g, spin=False):
    if spin:
        col = ''.join(f'<span style="width:96px;height:96px;display:block;margin:0 auto 70px">{glyph(x, "#0C0D10" if x != "heart" else "#FF4433", 2.4, fill=(x == "heart"))}</span>' for x in ['heart', 'bell'])
        inner = f'<div style="position:absolute;left:0;right:0;top:-40px">{col}</div>'
    else:
        inner = f'<span style="width:104px;height:104px;display:block">{glyph(g, "#FF4433", 2.4, fill=True)}</span>'
    return f'<div style="position:relative;flex:1;height:330px;border-radius:24px;background:#FBFAF7;display:grid;place-items:center;overflow:hidden">{inner}</div>'
D.append(('01-slot-machine', dict(
  direction='Ink. The phone drawn as a slot machine: two hearts landed, the third reel caught mid-spin on a bell (a near miss), a red lever on its side, her calm cut-out bottom right. Unpredictable rewards (the core idea of the video) as one literal object.',
  thumbnail_text='Built like a slot machine',
  titles=['How Apps Are Designed to Be Addictive, a Researcher Explains', 'Why Am I Addicted to My Phone? 5 Design Tricks to Blame', 'Phone Addiction Isn\'t an Accident: The 5 Features Behind It'],
  text={'words': 'Built like<br>a <span class="acc">slot<br>machine</span>'}, images={'photo': CUT + FACE}),
  '.w{left:64px;top:150px;font-size:134px;width:620px}',
  f'''<div class="hd w" data-k="words"></div>
<div data-move="phone" class="abs" style="left:640px;top:60px;transform:rotate(4deg);z-index:2">
 <div style="position:absolute;left:384px;top:150px;width:18px;height:180px;border-radius:9px;background:#C9C6BF;transform:rotate(12deg);transform-origin:50% 100%"></div>
 <div style="position:absolute;left:398px;top:112px;width:76px;height:76px;border-radius:50%;background:var(--red)"></div>
 <div style="position:absolute;left:362px;top:300px;width:56px;height:56px;border-radius:50%;background:#2A2C33;box-shadow:inset 0 0 0 4px #4A4C54"></div>
 <div class="ph" style="position:relative;width:390px;height:560px;box-shadow:0 24px 50px rgba(0,0,0,.5), inset 0 0 0 4px #3A3A42"><div class="scr"><div class="isl"></div>
  <div style="position:absolute;left:18px;right:18px;top:120px;display:flex;gap:10px">{reel('heart')}{reel('heart')}{reel('bell', True)}</div>
 </div></div>
</div>
{me(FACE, 960, 380, 340)}'''))

# 03 ---------------------------------------------------------------- 99+ badge (ink, faceless)
D.append(('02-red-badge', dict(
  direction='Ink. One giant light app icon with a red 99+ badge and her calm black-and-white cut-out below it. The question talks to the viewer; the title names the topic.',
  thumbnail_text='Can you ignore this?',
  titles=['Why Every Notification Badge Is Red (Facebook\'s Was Blue)', 'Why You Keep Picking Up Your Phone Without Thinking', 'Why Am I Addicted to My Phone? 5 Design Tricks to Blame'],
  text={'words': 'Can you<br><span class="acc">ignore</span><br>this?', 'badge': '99+'}, images={'photo': CUT + FACE}),
  '.w{left:70px;top:160px;font-size:140px;width:560px}',
  f'''<div class="hd w" data-k="words"></div>
<div data-move="icon" class="abs" style="left:640px;top:140px;width:350px;height:350px;transform:rotate(-4deg);z-index:2">
 <div class="ico" style="left:0;top:0;width:350px;height:350px;--ic:#F2EFE9;box-shadow:0 30px 60px rgba(0,0,0,.5)"><span style="width:46%;height:46%;display:block;margin:12% 6% 0 0">{glyph('chat', '#0C0D10', 2)}</span></div>
 <div class="bdg" data-k="badge" style="right:-80px;top:-84px;font-size:124px;--bdring:#0C0D10"></div>
</div>
{me(FACE, 905, 390, 330)}'''))

# 04 ---------------------------------------------------------------- books end, feeds don't (ink, faceless)
D.append(('03-books-end', dict(
  direction='Faceless, ink. An open book on its last page ("The End") next to a phone whose feed runs off the bottom of the thumbnail. Old media had a stopping point; the feed does not.',
  thumbnail_text='Books end. Feeds don’t.',
  titles=['Infinite Scroll Explained: Why It Never Stops', 'Why Can\'t I Stop Scrolling? It Was Designed That Way', 'Why Websites Got Rid of the "Next Page" Button'],
  text={'words': 'Books end.<br><span class="acc">Feeds don’t.</span>', 'end': 'The End'}),
  '.w{left:64px;top:56px;font-size:118px;width:760px;white-space:nowrap}'
  '.pg{position:absolute;top:0;width:280px;height:340px;background:#F2EFE9;box-shadow:0 24px 50px rgba(0,0,0,.35), 0 6px 0 #D9D4C8;padding:44px 34px}'
  '.pg i{display:block;height:12px;border-radius:6px;background:#D9D4C8;margin-bottom:22px}.pg i:nth-child(7){width:55%}'
  '.pg span{font-family:"News",serif;font-style:italic;font-weight:500;font-size:84px;color:#0C0D10;letter-spacing:-.02em}',
  f'''<div class="hd w" data-k="words"></div>
<div class="abs z2" data-move="book" style="left:90px;top:330px;width:560px;height:340px;transform:rotate(-4deg)"><div class="pg" style="left:0;border-radius:14px 2px 2px 14px">{''.join('<i></i>' for _ in range(7))}</div><div class="pg" style="left:280px;border-radius:2px 14px 14px 2px;display:grid;place-items:center"><span data-k="end"></span></div><div style="position:absolute;left:278px;top:0;width:4px;height:340px;background:#CFC9BC"></div></div>
{lphone(820, 120, 320, 700, 4, lfeed(3, .92, 50), z=2)}
{arrow((1192, 250), (1240, 440), (1194, 630), w=13, head=40)}'''))

# 05 ---------------------------------------------------------------- make it boring (before/after)
ICOL = ['#FF7A59', '#FF4F8B', '#4C8DFF', '#2BC48A', '#FFB020', '#8F6BFF', '#22B8CF', '#FF6B3D', '#5BC266']
def home(colour, ring='#0C0D10', n=9, cols=3):
    icons = ['chat', 'heart', 'play', 'cam', 'mail', 'note', 'bell', 'pin', 'refresh'][:n]
    nums = (['12', '99+', '', '', '', '3', '24', '', ''] if n == 9 else ['', '99+', '', '24', '', ''])
    cells = ''
    for i, g in enumerate(icons):
        b = f'<div class="bdg" style="right:-14px;top:-14px;font-size:32px;--bdring:{ring}">{nums[i]}</div>' if colour and nums[i] else ''
        bg = ICOL[i] if colour else '#3A3C42'
        cells += f'<div style="position:relative;aspect-ratio:1;border-radius:24%;background:{bg};display:grid;place-items:center"><span style="width:52%;height:52%;display:block">{glyph(g, "#FFFFFF" if colour else "#A3A5AC", 2.2)}</span>{b}</div>'
    return f'<div style="display:grid;grid-template-columns:repeat({cols},1fr);gap:28px 26px;padding:80px 30px 0">{cells}</div>'
D.append(('04-make-it-boring', dict(
  direction='Faceless how-to, ink. Before / after: a bright home screen full of colour and red badges, then the same screen grey and quiet. One thick red arrow between.',
  thumbnail_text='Make your phone boring',
  titles=['How to Stop Scrolling: Phone Settings That Actually Help', 'How to Use Your Phone Less (Simple Settings That Help)'],
  text={'words': 'Make your phone <span class="acc">boring</span>'}),
  '.w{left:60px;top:52px;font-size:108px;width:1180px;white-space:nowrap}',
  f'''<div class="hd w" data-k="words"></div>
<div data-move="before" class="abs" style="left:120px;top:205px;transform:rotate(-4deg)"><div class="ph" style="position:relative;width:390px;height:620px"><div class="scr"><div class="isl"></div>{home(True, n=6, cols=2)}</div></div></div>
<div data-move="after" class="abs" style="left:770px;top:205px;transform:rotate(4deg)"><div class="ph" style="position:relative;width:390px;height:620px"><div class="scr"><div class="isl"></div>{home(False, n=6, cols=2)}</div></div></div>
{arrow((530, 500), (640, 350), (755, 480), w=22, head=58)}'''))

# 06 ---------------------------------------------------------------- pull refresh repeat (paper, faceless)
D.append(('05-pull-refresh-repeat', dict(
  direction='Faceless, paper. The pull-to-refresh loop: a light phone whose feed is pulled down (a drag line, a gap and a spinner at the top), inside one clean red loop arrow that passes behind it.',
  thumbnail_text='Pull. Refresh. Repeat.',
  titles=['Why Can\'t I Stop Scrolling? It Was Designed That Way', 'How Apps Are Designed to Be Addictive, a Researcher Explains', 'Why You Keep Picking Up Your Phone Without Thinking'],
  text={'words': 'Pull.<br>Refresh.<br><span class="acc">Repeat.</span>'}),
  '.t{--ground:#F2EFE9;--fg:#0C0D10}.w{left:70px;top:150px;font-size:140px;width:620px}',
  f'''<div class="hd w" data-k="words"></div>
<svg class="arw z1" data-move="loop" width="1280" height="720" style="left:0;top:0;--aw:15">
 {loop_path(962, 365, 268, 305, 34, 326, head=54)}
</svg>
{lphone(830, 95, 270, 540, 3, f'<div style="position:absolute;left:50%;top:56px;margin-left:-50px">{spinner(100, "#55575E")}</div>'
        f'<div style="position:absolute;left:50%;top:170px;width:8px;height:44px;margin-left:-4px;border-radius:4px;background:#55575E"></div>'
        f'<div style="position:absolute;left:50%;top:208px;margin-left:-18px;width:0;height:0;border-left:18px solid transparent;border-right:18px solid transparent;border-top:24px solid #55575E"></div>'
        + lfeed(2, .86, 260), z=2)}'''))

# 07 ---------------------------------------------------------------- 11:02 PM -> 1:40 AM (ink, faceless)
D.append(('06-just-5-minutes', dict(
  direction='Faceless lock-screen story, ink, with one serif italic headline: "11:02 PM" with a red arrow into a phone whose lock screen says 1:40 AM. The lost night told by two times.',
  thumbnail_text='Just 5 minutes?',
  titles=['Why You Can\'t Put Your Phone Down at Night', 'Why Your Phone Is So Hard to Put Down, Explained', 'Why Can\'t I Stop Scrolling? It Was Designed That Way'],
  text={'words': '<span class="ser">Just</span><br><span class="acc">5 minutes?</span>', 't1': '11:02 PM', 't2': '1:40', 'a2': 'AM'}),
  '.w{left:70px;top:70px;font-size:136px;width:760px}.w .ser{font-size:1.1em}'
  '.clk{position:absolute;font-weight:300;letter-spacing:-.05em;line-height:.8;z-index:3;white-space:nowrap}',
  f'''<div class="hd w" data-k="words"></div>
<div class="clk" data-k="t1" data-move="time1" style="left:74px;top:470px;font-size:124px;color:#C4C6CC"></div>
{arrow((560, 545), (770, 600), (850, 330), w=14, head=44)}
<div data-move="phone" class="abs z2" style="left:850px;top:110px;transform:rotate(4deg)">
 <div class="ph" style="position:relative;width:360px;height:720px;box-shadow:0 24px 50px rgba(0,0,0,.5), 0 0 0 3px #4A4C55"><div class="scr" style="--scr:#1D1F25"><div class="isl"></div>
  <div class="clk" style="left:0;right:0;top:130px;text-align:center;font-size:156px;color:#F4F1EA"><span data-k="t2"></span><span data-k="a2" style="font-size:52px;font-weight:300;letter-spacing:0;margin-left:8px"></span></div>
  <div style="position:absolute;left:10px;right:10px;top:330px;opacity:.2">{post(lines=1)}</div>
 </div></div>
</div>'''))

# 08 ---------------------------------------------------------------- EU (ink, faceless)
R10 = 270
stars = ''.join(f'<span style="position:absolute;left:{R10 + 228*math.sin(i*math.pi/6) - 22:.0f}px;top:{R10 - 228*math.cos(i*math.pi/6) - 22:.0f}px;width:44px;height:44px;display:block">'
                f'<svg viewBox="0 0 24 24"><path d="M12 2l2.9 6.3 6.9.7-5.2 4.6 1.5 6.8L12 17l-6.1 3.4 1.5-6.8L2.2 9l6.9-.7z" fill="#FFCC00"/></svg></span>' for i in range(12))
D.append(('07-eu-vs-infinite-scroll', dict(
  direction='News angle, faceless, ink. A light phone with an endless feed inside a blue disc ringed with twelve gold stars (Europe); the flag is the only colour. A red line cuts the feed off: the EU wants feeds to stop. True to the EU 2026 findings: preliminary, so the words say "vs", not "banned".',
  thumbnail_text='The EU vs infinite scroll',
  titles=['Instagram\'s Addictive Design Explained: What Europe Found', 'Why TikTok and Instagram Are in Trouble With Europe'],
  text={'words': 'The EU vs<br>infinite<br>scroll'}),
  '.w{left:64px;top:150px;font-size:116px;width:620px;letter-spacing:-.01em;line-height:1.02}',
  f'''<div class="hd w" data-k="words"></div>
<div data-move="flag" class="abs z1" style="left:{960-R10}px;top:{330-R10}px;width:{2*R10}px;height:{2*R10}px;border-radius:50%;background:#1B3FD8">{stars}</div>
{lphone(960-88, 330-175, 176, 350, 0, lfeed(1, .54, 34) + '<div style="position:absolute;left:10px;right:10px;top:212px;height:12px;border-radius:6px;background:#FF4433"></div>', z=2)}'''))

# 09 ---------------------------------------------------------------- red full-bleed (her)
D.append(('08-addictive-by-design', dict(
  direction='Punchline on full-bleed badge red: her calm black-and-white face with a white outline on the left, white type on the right, and a white phone with one app and its 99+ badge, tucked behind her shoulder.',
  thumbnail_text='Phone addiction is by design',
  titles=['How Apps Are Designed to Be Addictive, a Researcher Explains', 'Why Can\'t I Stop Scrolling? It Was Designed That Way', 'Why Am I Addicted to My Phone? 5 Design Tricks to Blame'],
  text={'words': 'Phone<br>addiction<br>is <span class="ser">by design</span>'}, images={'photo': CUT + '895.75_bw_white.png'}),
  '.t{--ground:#FF4433;--fg:#FFFFFF}.w{left:590px;top:60px;font-size:118px;width:680px}.w .ser{font-size:1.08em;position:relative;top:6px}',
  f'''<div class="hd w" data-k="words"></div>
{me('895.75_bw_white.png', -170, 150, 570)}
<div data-move="phone" class="abs z2" style="left:640px;top:440px;transform:rotate(10deg)">
 <div class="ph light" style="position:relative;width:360px;height:660px;border-radius:56px;padding:13px;box-shadow:0 24px 50px rgba(0,0,0,.35)"><div class="scr" style="border-radius:44px;--scr:#FBFAF7"><div class="isl" style="width:84px;height:24px;margin-left:-42px;top:13px"></div>
  <div class="ico" style="left:84px;top:110px;width:160px;height:160px;--ic:#15161B"><span style="width:50%;height:50%;display:block">{glyph('chat', '#F4F1EA', 2)}</span></div>
  <div class="bdg" style="left:196px;top:76px;font-size:56px;--bdring:#FBFAF7">99+</div></div></div>
</div>'''))

# ---------- write ----------
names = []
for folder, c, css, body in D:
    names.append(folder)
    if only and not any(folder.startswith(o) for o in only): continue
    d = os.path.join(T, 'directions', folder); os.makedirs(d, exist_ok=True)
    c = {'direction': c['direction'], 'concept': 'v2 (2026-10-16)', 'thumbnail_text': c['thumbnail_text'],
         'title': c['titles'][0], 'titles': c['titles'], 'scores': '', 'recommended': '',
         'text': c['text'], 'images': c.get('images', {}), 'vars': {}}
    cf = os.path.join(d, 'content.json')
    if os.path.exists(cf) and not reset:
        old = json.load(open(cf))
        for k in ('text', 'images', 'vars', 'nudge', 'class', 'scores', 'recommended'):
            if k in old: c[k] = old[k]
    json.dump(c, open(cf, 'w'), indent=2, ensure_ascii=False)
    html = (f'<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../../lib/v2.css"><style>\n{css}\n</style></head>'
            f'<body><div class="t">\n{body}\n</div><script src="../../lib/bind.js"></script></body></html>\n')
    open(os.path.join(d, 'index.html'), 'w').write(html)
json.dump(sorted(names), open(os.path.join(T, 'directions', 'index.json'), 'w'))
print('wrote', len(names))
