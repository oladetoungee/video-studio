# Set 3 (2026-11-12): thumbnails whose words a stranger understands cold ("bugs", "your app breaks", "it works on my machine").
# Writes directions/<slug>/index.html + content.json (keeps any "nudge" / text edits she made in the studio unless --force).
#   python3 tools/gen-set3.py [--force]      then   node render.mjs
import json, os, sys
D = '/Users/gbemi/Desktop/CODE/videos/projects/the-edge-case-you-think-is-impossible/design/thumbnails/directions'
SH = '../../assets/shoot/'
FORCE = '--force' in sys.argv
V = []

def photo(n):
    """her room photo dimmed + her cut-out at the same place on top (face untouched)"""
    return ('<img class="room z1" data-img="room" alt=""><div class="dim z2"></div>'
            '<img class="room me3 z3" data-img="me" alt="">'), {'room': SH + f'room3-{n}.jpg', 'me': SH + f'me3-{n}.png'}

def phone(x, y, w, inner, extra=''):
    return f'<div class="phone ui z5" data-move="phone" style="left:{x}px;top:{y}px;width:{w}px;height:{round(w*2.05)}px{extra}"><div class="scr">{inner}</div></div>'

# 01 flat blue, her pointing at the words -------------------------------------------------------------------------------
V.append(dict(slug='01-bugs-that-break-your-app', kind='flat', board='yt-34 WEB3 EXPLAINED! (topic huge + creator pointing), yt-68 STOP WASTING EVENINGS',
 css='.big{left:56px;top:50px;font-size:112px}.me{position:absolute;right:-130px;bottom:0;height:600px}',
 body='<div class="hx big z4" data-k="big"></div><img class="cut me z3" data-img="me" data-move="her" alt="">' + '<div class="phone ui z5" data-move="phone" style="left:470px;top:375px;width:190px;height:390px;transform:rotate(-5deg)"><div class="scr"><div style="padding:110px 12px 0;text-align:center"><div class="err-ic" style="font-size:52px">!</div><div style="font-family:ITBlack;font-size:29px;line-height:1.08;margin-top:12px;letter-spacing:-.01em" data-k="perr"></div></div></div></div>',
 text={'big': 'Bugs that<br><span class="y">break</span><br>your app', 'perr': '<span style="font-size:1.9em;letter-spacing:-.03em">Feb 29</span>'},
 images={'me': SH + 'cut-1590.png'}, vars={'--ground': '#1B3FD8'}, cls='pat-lines-w no-lift',
 thumbnail_text='BUGS THAT BREAK YOUR APP',
 titles=['Edge Cases in Software Development (8 Real Examples)', 'What Is an Edge Case in Programming? 8 Real Examples'],
 direction='Flat electric blue with a quiet same-hue line pattern; the plain promise huge in white, BREAK in yellow; her cut-out (1590, palms open, presenting a phone with an error) right. Kind e/d: topic + creator, like WEB3 EXPLAINED.'))

# 02 photo, sceptical -----------------------------------------------------------------------------------------------------
b, im = photo(1588)
V.append(dict(slug='02-that-will-never-happen', kind='photo', board='yt-45 IT\'S A TRAP / yt-61 THEY LIED TO US (a line everyone has heard + a sceptical face)',
 css='.toast{left:46px;top:500px;width:520px;background:#fff;border-radius:16px;padding:20px 24px;display:flex;gap:16px;align-items:center;box-shadow:0 20px 44px rgba(0,0,0,.45);transform:rotate(-3deg);font-family:ITBlack;font-size:36px;letter-spacing:-.015em;color:#111114;line-height:1.05}.toast .err-ic{font-size:46px;flex:none}.big{left:48px;top:140px;font-size:104px;line-height:.95}.q{left:40px;top:30px;font-size:140px;line-height:1;color:#FFD23F;font-family:ITBlack}',
 body=b + '<div class="hx q z4" data-k="q"></div><div class="hx big s3 z4" data-k="big"></div><div class="code z5" data-move="code" style="left:44px;top:470px;font-size:46px;line-height:1.25;border-radius:16px;padding:22px 30px;background:#1A1D24" data-k="code"></div>',
 text={'q': '“', 'big': 'That will<br><span class="bx">never</span><br>happen”', 'code': 'if (user.clicksTwice) {\n  <span style="color:#FFD23F">// never happens</span>\n}'},
 images=im, vars={'--rw': '2000px', '--rx': '-90px', '--ry': '-380px', '--dim': 'rgba(10,10,12,.55)'}, cls='no-lift',
 thumbnail_text='“THAT WILL NEVER HAPPEN”',
 titles=['Edge Cases in Software: 8 Times It Did Happen', 'Your Users Will Find the Bug You Said Was Impossible'],
 direction='Her room dimmed, she untouched on top (1588, unimpressed, hand at her hair); the line every developer has said, NEVER in a red box. Kind d.'))

# 03 photo + checklist ----------------------------------------------------------------------------------------------------
b, im = photo(1591)
rows = [('c1', 'Double click', 1), ('c2', 'Two tabs open', 1), ('c3', 'No internet', 0)]
chk = '<div class="chk z5" data-move="checklist" style="left:44px;top:262px;width:500px;transform:rotate(-3deg)">' + ''.join(
    f'<div class="row"><span class="bx{" on" if on else ""}"></span><span data-k="{k}"></span></div>' for k, _, on in rows) + '</div>'
V.append(dict(slug='03-test-this-before-you-ship', kind='photo', board='yt-72 boring, but it works (creator + a literal checklist), yt-31 "watch this before"',
 css='.big{left:44px;top:40px;font-size:112px}.sub{left:48px;top:148px;font-size:64px}.chk .row{font-size:50px;padding:16px 0;gap:22px}.chk .bx{width:46px;height:46px;border-width:5px}.chk .bx.on::after{left:10px;top:-6px;width:16px;height:32px;border-width:0 8px 8px 0}',
 body=b + '<div class="hx big s3 z4" data-k="big"></div><div class="hx sub s3 z4" style="text-transform:none;letter-spacing:-.02em" data-k="sub"></div>' + chk,
 text={'big': 'Test <span class="y">this</span>', 'sub': 'before you ship', **{k: v for k, v, _ in rows}},
 images=im, vars={'--rw': '2050px', '--rx': '-330px', '--ry': '-470px', '--dim': 'rgba(10,10,12,.36)'}, cls='no-lift',
 thumbnail_text='TEST THIS before you ship (+ a checklist: double click, two tabs open, no internet)',
 titles=['What Is an Edge Case? 8 Real Bugs to Test For', 'Edge Cases Every Developer Should Test Before Shipping'],
 direction='Her room dimmed, she points up at a paper checklist (1591); TEST THIS in heavy white, "before you ship" smaller under it; three big checklist items. Kind a + c: the literal thing, like the checklist in yt-72.'))

# 04 dark code + the error everyone has seen --------------------------------------------------------------------------------
code = ('<div class="code ui z4" data-move="code" style="left:52px;top:350px;font-size:62px;line-height:1.15;border-radius:18px;padding:30px 36px;background:#1A1D24">'
        '<span class="r2" data-k="err"></span></div>')
V.append(dict(slug='04-your-code-will-break', kind='flat', board='yt-39 Stop using div (literal code picture), yt-63 CODE IN 2026 (claim + creator)',
 css='.big{left:52px;top:56px;font-size:136px}.code .r2{color:#FF6B5E;font-family:DMono;font-weight:500}.me{position:absolute;right:-150px;bottom:0;height:640px}',
 body='<div class="hx big z4" data-k="big"></div>' + code + '<img class="cut me z3" data-img="me" data-move="her" alt="">',
 text={'big': 'Your code<br><span class="bx">will</span> break', 'err': '✕ Cannot read\n  properties of null'},
 images={'me': SH + 'cut-1586.png'}, vars={'--ground': '#0E1116'}, cls='pat-lines-w no-lift',
 thumbnail_text='YOUR CODE WILL BREAK (+ code and the "Cannot read properties of null" error)',
 titles=['Why Code Breaks When Real Users Arrive (Edge Cases)', 'Edge Cases in Software Development (8 Real Examples)'],
 direction='Off-black with a quiet line pattern; the claim huge, WILL in a red box; the error every JavaScript developer has seen, big and red on a code card; her cut-out (1586, hand at her chin, knowing look) right. Kind e: literal code like "Stop using div".'))

# 05 photo, shrug: what real users do -----------------------------------------------------------------------------------------
b, im = photo(1579)
V.append(dict(slug='05-users-click-twice', kind='photo', board='yt-25 STOP THIS! (claim + the literal thing on screen), yt-43 just start. (creator + one plain line)',
 css='.big{right:40px;top:44px;font-size:118px;text-align:right;line-height:.9}.btn3{right:190px;top:400px;background:#22E08A;color:#111114;font-family:ITBlack;font-size:62px;letter-spacing:-.02em;border-radius:20px;padding:24px 50px;box-shadow:0 20px 44px rgba(0,0,0,.45)}.cur3{position:absolute;right:160px;top:495px;width:84px;height:112px}.ck3{position:absolute;font-family:ITBlack;font-size:40px;color:#FFD23F;text-shadow:0 2px 12px rgba(0,0,0,.6)}',
 body=b + '<div class="hx big s3 z4" data-k="big"></div><div class="btn3 ui z5" style="position:absolute" data-move="btn" data-k="btn"></div>'
      '<svg class="cur3 z6" data-move="cursor" viewBox="0 0 24 32"><path d="M2 2 L2 26 L8 20 L12 30 L16 28 L12 18 L20 18 Z" fill="#111114" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/></svg>'
      '<div class="z6" data-move="clicks" style="position:absolute;left:0;top:0"><div class="ck3" style="left:1125px;top:490px;transform:rotate(-14deg)" data-k="c1"></div><div class="ck3" style="left:1135px;top:552px;transform:rotate(10deg)" data-k="c2"></div></div>',
 text={'big': 'Users<br><span class="y">click</span><br>twice', 'btn': 'Pay now', 'c1': 'click', 'c2': 'click'},
 images=im, vars={'--rw': '2100px', '--rx': '-720px', '--ry': '-380px', '--dim': 'rgba(10,10,12,.62)'}, cls='no-lift',
 thumbnail_text='USERS CLICK TWICE (+ a Pay now button, cursor, click click)',
 titles=['Edge Cases in Software: What Real Users Actually Do', 'Why Code Breaks When Real Users Arrive (Edge Cases)'],
 direction='Her room dimmed, she shrugs with an open hand (1579) on the left; a plain fact about real users on the right, with a Pay now button clicked twice. Replaces the brief\'s "It works on my machine" (cold critics read it as a setup/Docker video, 5-6.5 in three rounds). Kind d + the literal thing.'))

# 06 collage: objects of the topic around her, no labels -------------------------------------------------------------------
b, im = photo(1590)
cal = ('<div class="cal z5" data-move="cal" style="left:50px;top:200px;width:270px;transform:rotate(-7deg)">'
       '<div class="mth" style="font-size:28px" data-k="mth"></div><div class="day" style="font-size:180px" data-k="day"></div></div>')
clock = ('<svg class="z5" data-move="clock" style="position:absolute;left:990px;top:250px;width:230px;height:230px;filter:drop-shadow(0 18px 30px rgba(0,0,0,.4))" viewBox="0 0 100 100">'
         '<circle cx="50" cy="50" r="47" fill="#FFFDF6"/><circle cx="50" cy="50" r="47" fill="none" stroke="#111114" stroke-width="3"/>'
         + ''.join(f'<rect x="49" y="7" width="2" height="{8 if i%3==0 else 5}" fill="#111114" transform="rotate({i*30} 50 50)"/>' for i in range(12)) +
         '<rect x="48" y="24" width="4" height="28" rx="2" fill="#111114" transform="rotate(90 50 50)"/><rect x="48.8" y="14" width="2.4" height="38" rx="1.2" fill="#E5322D" transform="rotate(0 50 50)"/>'
         '<circle cx="50" cy="50" r="3.5" fill="#111114"/></svg>')
field = ('<div class="ui z5" data-move="field" style="position:absolute;left:40px;top:520px;width:340px;background:#fff;border-radius:14px;padding:18px 22px;box-shadow:0 18px 40px rgba(0,0,0,.4);transform:rotate(4deg)">'
         '<div style="font-family:ITBlack;font-size:50px;letter-spacing:-.02em;color:#111114;border:3px solid #E5322D;border-radius:10px;padding:8px 14px" data-k="name"></div>'
         '<div style="margin-top:10px;color:#E5322D;font-family:ITBlack;font-size:28px;display:flex;gap:10px;align-items:center"><span class="err-ic">!</span><span data-k="nerr"></span></div></div>')
ph = phone(1020, 250, 190, '<div style="padding:110px 14px 0;text-align:center"><div class="err-ic" style="font-size:50px">!</div>'
           '<div style="font-family:ITBlack;font-size:26px;line-height:1.1;margin-top:14px;letter-spacing:-.01em" data-k="perr"></div></div>', ';transform:rotate(7deg)')
V.append(dict(slug='06-bugs-nobody-tests-for', kind='collage', board='THUMBNAIL-STUDY kind c "creator surrounded by real objects of the topic" (my potential, personal curriculums), yt-70 neuroplasticity',
 css='.big{left:0;width:1280px;text-align:center;top:40px;font-size:96px}',
 body=b + '<div class="hx big s3 z6" data-k="big"></div>' + cal + field,
 text={'big': 'bugs <span style="color:#FFD23F">nobody</span> tests for', 'mth': 'February', 'day': '29', 'name': 'O\'Brien', 'nerr': 'Invalid name'},
 images=im, vars={'--rw': '1900px', '--rx': '-410px', '--ry': '-330px', '--dim': 'rgba(10,10,12,.5)'}, cls='no-lift',
 thumbnail_text='BUGS NOBODY TESTS FOR (+ a 29 February page, a form rejecting O\'Brien)',
 titles=['Famous Software Bugs Explained: Leap Day, Names and More', 'Edge Cases in Software Development (8 Real Examples)'],
 direction='Collage over her room (1590, palms open as if presenting): the things that break apps float around her with no captions (a 29 February page, a form rejecting O\'Brien). One heavy line on top. Kind c.'))

# 07 flat orange STOP -------------------------------------------------------------------------------------------------------
V.append(dict(slug='07-perfect-users-dont-exist', kind='flat', board='yt-60 STOP LEARNING CODE THE OLD WAY, yt-25 STOP THIS!, yt-68 STOP WASTING EVENINGS',
 css='.toast{left:52px;top:540px;background:#fff;border-radius:16px;padding:18px 26px;display:flex;gap:16px;align-items:center;box-shadow:0 20px 44px rgba(0,0,0,.3);transform:rotate(-3deg);font-family:ITBlack;font-size:58px;letter-spacing:-.015em;color:#111114;white-space:nowrap}.toast .err-ic{font-size:64px}.big{left:52px;top:44px;font-size:112px;color:#111114}.big .bx{background:#111114;color:#fff}.me{position:absolute;right:-170px;bottom:0;height:620px}',
 body='<div class="hx big z4" data-k="big"></div><img class="cut me z3" data-img="me" data-move="her" alt=""><div class="toast ui z5" style="position:absolute" data-move="toast"><span class="err-ic">!</span><span data-k="toast"></span></div>',
 text={'big': 'Perfect<br>users<br><span class="bx">don\'t</span><br>exist', 'toast': 'Charged twice'},
 images={'me': SH + 'cut-1593.png'}, vars={'--ground': '#FF4713'}, cls='pat-lines no-lift',
 thumbnail_text='PERFECT USERS DON\'T EXIST (+ a Charged twice error)',
 titles=['Edge Cases: How Real Users Break Your Code', 'Edge Cases Every Developer Should Test Before Shipping'],
 direction='Flat safety orange with a quiet line pattern; the claim in heavy black, DON\'T in a black box; her cut-out (1593, pointing at the words) right; a big "Charged twice" error card. Kind d.'))

# 08 flat, no face: error screens -------------------------------------------------------------------------------------------
win = ('<div class="win ui z4" data-move="browser" style="left:52px;top:260px;width:640px;height:330px;transform:rotate(-2deg)"><div class="bar"><i></i><i></i><i></i><span class="url"></span></div>'
       '<div style="padding:44px 44px 0"><div style="font-family:DMono;font-size:22px;letter-spacing:.12em;color:#6B6B6B" data-k="flab"></div>'
       '<div style="margin-top:10px;border:3px solid #E5322D;border-radius:12px;padding:12px 20px;font-family:ITBlack;font-size:84px;letter-spacing:-.02em;line-height:1" data-k="fval"></div>'
       '<div style="margin-top:16px;color:#E5322D;font-family:ITBlack;font-size:34px;letter-spacing:-.01em;display:flex;gap:12px;align-items:center"><span class="err-ic">!</span><span data-k="fmsg"></span></div></div></div>')
p1 = ('<div class="phone ui" data-move="phone1" style="left:70px;top:320px;width:200px;height:410px;transform:rotate(-8deg)"><div class="scr"><div style="padding:110px 16px 0;text-align:center">'
      '<div class="err-ic" style="font-size:50px">!</div><div style="font-family:ITBlack;font-size:25px;line-height:1.1;margin-top:16px" data-k="p1"></div>'
      '<div style="margin:18px auto 0;width:120px;background:#111114;color:#fff;border-radius:22px;padding:9px 0;font-weight:800;font-size:17px" data-k="p1b"></div></div></div></div>')
p2 = ('<div class="phone ui" data-move="phone2" style="left:1010px;top:300px;width:200px;height:410px;transform:rotate(7deg)"><div class="scr"><div style="padding:110px 16px 0;text-align:center">'
      '<svg width="64" height="52" viewBox="0 0 16 12"><g fill="#B9B9C0"><path d="M8 2.2c2.5 0 4.8 1 6.5 2.6l1.2-1.3C13.7 1.6 11 .4 8 .4S2.3 1.6.3 3.5l1.2 1.3C3.2 3.2 5.5 2.2 8 2.2z"/><path d="M8 5.8c1.5 0 2.9.6 3.9 1.5l1.2-1.3C11.8 4.8 10 4 8 4S4.2 4.8 2.9 6l1.2 1.3c1-.9 2.4-1.5 3.9-1.5z"/><path d="M8 9.2c.6 0 1.1.2 1.5.6L8 11.4 6.5 9.8c.4-.4.9-.6 1.5-.6z"/></g><rect x="1" y="5.5" width="15" height="1.6" fill="#E5322D" transform="rotate(38 8 6)"/></svg>'
      '<div style="font-family:ITBlack;font-size:25px;line-height:1.1;margin-top:14px" data-k="p2"></div></div></div></div>')
V.append(dict(slug='08-why-apps-break', kind='other', board='THUMBNAIL-STUDY kind e (tech: topic name huge + the literal thing), yt-67 DevOps logo grid, yt-36 WHAT IS SPACE COMPLEXITY',
 css='.big{left:52px;top:56px;font-size:134px;color:#111114}.big .bx{background:#E5322D}.me{position:absolute;right:-120px;bottom:0;height:560px}',
 body='<div class="hx big z3" data-k="big"></div>' + win + '<img class="cut me z4" data-img="me" data-move="her" alt="">',
 text={'big': 'Why apps <span class="bx">break</span>', 'flab': 'SURNAME', 'fval': 'O\'Brien', 'fmsg': 'Please enter a valid name', 'p1': 'Something went wrong', 'p1b': 'Try again', 'p2': 'No internet connection'},
 images={'me': SH + 'cut-1588.png'}, vars={'--ground': '#EAE6DA'}, cls='pat-dots no-lift',
 thumbnail_text='WHY APPS BREAK (+ a form rejecting the surname O\'Brien)',
 titles=['Edge Cases Explained: Names, Dates and Double Clicks', 'Edge Cases Developers Miss: 8 Real Bugs That Broke Apps'],
 direction='Warm paper with a quiet dot pattern; the question huge, BREAK in a red box; one big generic form rejecting the surname O\'Brien; her cut-out (1588, unimpressed) right. Kind e/d.'))

# 09 split: testing vs real users -------------------------------------------------------------------------------------------
def scr_ok(k):
    return (f'<div style="padding:96px 18px 0;text-align:center"><svg width="78" height="78" viewBox="0 0 40 40"><circle cx="20" cy="20" r="19" fill="#18A957"/><path d="M11 20.5l6 6 12-13" stroke="#fff" stroke-width="4.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>'
            f'<div style="font-family:ITBlack;font-size:34px;line-height:1.05;margin-top:18px;letter-spacing:-.01em" data-k="{k}"></div></div>')
def scr_bad():
    card = lambda k: (f'<div style="background:#F2F2F4;border-radius:16px;padding:14px 14px;margin-top:12px;text-align:left;font-family:ITBlack;font-size:25px;line-height:1.05;display:flex;gap:10px;align-items:center">'
                      f'<svg width="30" height="30" viewBox="0 0 40 40" style="flex:none"><circle cx="20" cy="20" r="19" fill="#18A957"/><path d="M11 20.5l6 6 12-13" stroke="#fff" stroke-width="4.4" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg><span data-k="{k}"></span></div>')
    return ('<div style="padding:70px 14px 0">' + card('b1') + card('b2') +
            '<div style="margin-top:22px;text-align:center;color:#E5322D;font-family:ITBlack;font-size:42px;line-height:1.0" data-k="b3"></div></div>')
V.append(dict(slug='09-testing-vs-real-users', kind='other', rec=True, board='yt-13 / yt-02 Before | After split, yt-61 Copying vs Understanding, yt-33 AFTER | BEFORE',
 css='.L{position:absolute;left:0;top:0;width:640px;height:720px;background:#22E08A}.R{position:absolute;left:640px;top:0;width:640px;height:720px;background:#111114}'
     '.me{position:absolute;left:378px;bottom:0;height:460px;z-index:6}.lt{left:0;width:640px;text-align:center;top:40px;font-size:100px;color:#111114}.rt{left:640px;width:640px;text-align:center;top:40px;font-size:100px;color:#fff}.rt .y{color:#FF4713}',
 body='<div class="L z1 pat-lines"></div><div class="R z1 pat-lines-w"></div><div class="hx lt z4" data-k="lt"></div><div class="hx rt z4" data-k="rt"></div>'
      + '<img class="cut me" data-img="me" data-move="her" alt="">' + phone(150, 180, 240, scr_ok('ok'), ';transform:rotate(-4deg)').replace('data-move="phone"', 'data-move="phoneL"')
      + phone(890, 180, 240, scr_bad(), ';transform:rotate(4deg)').replace('data-move="phone"', 'data-move="phoneR"'),
 text={'lt': 'Testing', 'rt': '<span class="y">Real</span> users', 'ok': 'Order placed', 'b1': 'Order placed', 'b2': 'Order placed', 'b3': 'Charged twice'},
 images={'me': SH + 'cut-1583.png'}, vars={}, cls='no-lift',
 thumbnail_text='TESTING | REAL USERS (+ one order placed vs the same order placed twice)',
 titles=['Edge Cases: Why Code That Passes Tests Still Breaks', 'Why Code That Passes Tests Still Breaks (Edge Cases)'],
 direction='Before / after split: green "Testing" with one clean "Order placed"; black "Real users" with the same order placed twice and "Charged twice" in red. Her cut-out (1583, calm) at the seam. Kind f.'))

# 10 photo, thinking: a number + plain words ----------------------------------------------------------------------------------
b, im = photo(1580)
V.append(dict(slug='10-bugs-your-tests-miss', kind='photo', board='yt-35 "47 Algorithms" (a number a stranger can count on), yt-68 STOP WASTING EVENINGS (heavy white claim + calm creator)',
 css='.n{left:40px;top:40px;font-size:330px;line-height:.8;color:#FFD23F}.big{left:48px;top:310px;font-size:100px;line-height:.92}.toast{left:48px;top:540px;background:#fff;border-radius:16px;padding:18px 26px;display:flex;gap:16px;align-items:center;box-shadow:0 20px 44px rgba(0,0,0,.45);transform:rotate(-3deg);font-family:ITBlack;font-size:42px;letter-spacing:-.015em;color:#111114;white-space:nowrap}.toast .err-ic{font-size:50px}',
 body=b + '<div class="hx n s3 z4" data-k="n"></div><div class="hx big s3 z4" data-k="big"></div><div class="cal z5" data-move="cal" style="left:380px;top:40px;width:190px;transform:rotate(7deg)"><div class="mth" style="font-size:22px" data-k="mth"></div><div class="day" style="font-size:120px" data-k="day"></div></div>',
 text={'n': '8', 'big': 'bugs your<br>tests miss', 'mth': 'February', 'day': '29'},
 images=im, vars={'--rw': '2150px', '--rx': '-60px', '--ry': '-400px', '--dim': 'rgba(10,10,12,.55)'}, cls='no-lift',
 thumbnail_text='8 BUGS YOUR TESTS MISS',
 titles=['Edge Cases in Software: 8 Real Bugs That Broke Apps', 'How to Find Edge Cases Before Your Users Do'],
 direction='Her room dimmed, she thinks, hand at her chin (1580), face untouched; a huge yellow 8 + heavy white words + a 29 February page. Kind d.'))

SC = {'01': 'cold critic (final round): 7 alone / 7 with title', '02': '7 / 8', '03': '8 / 8', '04': '6 / 6 (title since changed)', '05': '8 / 8', '06': '7 / 8', '07': '7 / 7', '08': '7 / 7', '09': '8.5 / 9 (best in all 5 rounds)', '10': '8 / 7 (title since changed to the 8-bugs one)'}
idx = []
for v in V:
    p = os.path.join(D, v['slug']); os.makedirs(p, exist_ok=True)
    html = ('<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../../lib/field.css"><style>' + v['css'] +
            '</style></head><body><div class="t">' + v['body'] + '</div><script src="../../lib/bind.js"></script></body></html>')
    open(os.path.join(p, 'index.html'), 'w').write(html)
    c = dict(direction=v['direction'], board=v['board'], thumbnail_text=v['thumbnail_text'], titles=v['titles'], title=v['titles'][0],
             kind=v['kind'], text=v['text'], images=v['images'], vars=v['vars'], **({'class': v['cls']} if v['cls'] else {}))
    if v.get('rec'): c['recommended'] = True
    if v['slug'][:2] in SC: c['scores'] = SC[v['slug'][:2]]
    cj = os.path.join(p, 'content.json')
    if os.path.exists(cj) and not FORCE:
        old = json.load(open(cj))
        for k in ('nudge', 'scores'):
            if k in old: c[k] = old[k]
    open(cj, 'w').write(json.dumps(c, indent=2, ensure_ascii=False) + '\n')
    idx.append(v['slug'])
print('\n'.join(idx))
