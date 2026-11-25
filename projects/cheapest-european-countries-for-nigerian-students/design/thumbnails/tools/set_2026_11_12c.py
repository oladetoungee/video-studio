# Round 2 (2026-11-12 night): she loves 08 (the notebook) and it becomes 01. Her correction: "I said I like something; that
# doesn't mean everything now has to look like it. We have a whole board of different ideas." So the new ones replace the
# weak 06 / 09 / 10 and each copies a DIFFERENT board composition that is not yet in the set and is unlike 08 and each other.
# Kept: 03 (yt-29), 04 (yt-63), 06 (pin-03-02), 10 (yt-65); dropped n1 (yt-11), n2 (yt-44), n4 (pin-01-17), n6 (yt-71).
# Writes directions/<name>/{index.html, content.json}. content.json only when missing (her studio edits live there); --force overwrites.
import json, os, sys
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FORCE = '--force' in sys.argv
ONLY = [a for a in sys.argv[1:] if not a.startswith('--')]
HEAD = '<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../../lib/eu.css"><style>{css}</style></head><body><div class="t">\n{body}\n</div>{extra}<script src="../../lib/bind.js"></script></body></html>'
S = []
def add(name, css, body, content, extra=''):
    S.append((name, css, body, content, extra))
SH = '../../assets/shoot/'

# board yt-11 "MOVING ABROAD": a real place, small italic serif line on top, huge gold serif caps across the middle
add('n1-street-afford-europe',
 '.bg{width:var(--bw,1500px);left:var(--bx,-220px);top:var(--by,-140px)}'
 '.veil{inset:0;background:var(--dim,rgba(12,9,6,.42))}.band,.band2{display:none}'
 '.s{left:0;right:0;top:var(--sy,58px);text-align:center;font:italic 400 var(--ss,92px)/1 "DMS",serif;color:#fff}'
 '.w{left:0;right:0;top:var(--wy,500px);text-align:center;font:400 var(--ws,150px)/.95 "DMS",serif;color:#fff;letter-spacing:-.01em;text-transform:uppercase}.w span{color:var(--gold,#F6C445)}',
 '<img class="ph bg z1" data-img="bg" alt=""><div class="veil z2"></div><div class="veil band z2"></div><div class="veil band2 z2"></div>\n'
 '<div class="a s shd z3" data-k="s"></div><div class="a w shd z3" data-k="w"></div>',
 {'board': 'yt-11', 'kind': 'real place photo (Pexels: a young Black student with books outside an old European building), italic serif line + huge serif caps (one word gold), no face',
  'direction': 'Copies board yt-11 ("interviewing 8 strangers about / MOVING ABROAD": a real street scene, a small italic serif line on top, huge gold serif caps across the middle). Photo by Andrea Piacquadio (Pexels): a young Black woman with books outside an old European building. Words: can a Nigerian afford to / STUDY IN EUROPE?',
  'thumbnail_text': 'can a Nigerian afford to STUDY IN EUROPE?',
  'titles': ['Cheapest Countries to Study in Europe for Nigerians (2027)', 'What Studying in Europe Really Costs a Nigerian in 2027', 'Studying in Europe as a Nigerian: The Real Cost'],
  'title': 'Cheapest Countries to Study in Europe for Nigerians (2027)',
  'text': {'s': 'can a Nigerian afford to', 'w': 'study in <span>Europe?</span>'},
  'images': {'bg': '../../assets/px/student-books.jpg'}, 'vars': {}})

# board yt-44 "QUIT DATA NOW": a white post card on the left (avatar, name, huge black caps, one red box), the creator right, dark plain ground
ICONS = ('<svg viewBox="0 0 24 24"><path d="M4 5h16v11H9l-5 4z" fill="none" stroke="#666" stroke-width="2" stroke-linejoin="round"/></svg>'
         '<svg viewBox="0 0 24 24"><path d="M7 7h10v6M17 13l-3-3M17 13l3-3M17 17H7v-6M7 11l-3 3M7 11l3 3" fill="none" stroke="#666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
         '<svg viewBox="0 0 24 24"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10z" fill="none" stroke="#666" stroke-width="2" stroke-linejoin="round"/></svg>')
add('n2-post-card-cheapest-country',
 '.t{background:var(--ground,#1E1A2E)}'
 '.card{position:absolute;left:var(--cx,46px);top:var(--cy,118px);width:var(--cw,700px);background:#fff;border-radius:30px;padding:30px 40px 30px;box-shadow:0 24px 50px rgba(0,0,0,.4);rotate:-1.5deg}'
 '.hd{display:flex;align-items:center;gap:18px;margin-bottom:22px}'
 '.av{width:74px;height:74px;border-radius:50%;object-fit:cover;object-position:50% 18%;background:#ddd}'
 '.nm{font:800 32px/1.1 "FG",sans-serif;color:#111}.hn{font:500 26px/1.2 "FG",sans-serif;color:#777}'
 '.w{font:900 var(--ws,88px)/1 "IT",sans-serif;color:#111114;letter-spacing:-.03em;text-transform:uppercase}'
 '.box{display:inline-block;margin-top:12px;background:var(--red,#E3242B);color:#fff;font:900 var(--bs,88px)/1 "IT",sans-serif;letter-spacing:-.03em;text-transform:uppercase;padding:6px 18px 10px}'
 '.ic{display:flex;gap:70px;margin-top:26px}.ic svg{width:34px;height:34px}'
 '.me{position:absolute;width:var(--mw,900px);left:var(--mx,560px);top:var(--my,90px)}',
 '<img class="me cut z2" data-img="me" alt="">\n'
 '<div class="card z3" data-move="card"><div class="hd"><img class="av" data-img="av" alt=""><div><div class="nm" data-k="nm"></div><div class="hn" data-k="hn"></div></div></div>'
 '<div class="w" data-k="w"></div><div class="box" data-k="box"></div><div class="ic">' + ICONS + '</div></div>',
 {'board': 'yt-44', 'kind': 'a white post card (her own name and handle) with huge black caps and one red box, her cut-out right on a dark plain ground',
  'direction': 'Copies board yt-44 ("QUIT DATA NOW": a white social post card on the left with the avatar and name, huge black caps, the last words in a red box; the creator on the right on a dark plain ground). The card is from her own account (With Gbemi, @WithGbemi), no like or view counts. Her shoot photo (outfit B, Enhance photo, face untouched). Words: CHEAPEST COUNTRY / IN EUROPE?',
  'thumbnail_text': 'post card: CHEAPEST COUNTRY [IN EUROPE?]',
  'titles': ['Cheapest Country to Study in Europe? 9 Countries Compared', '9 European Countries Compared for Nigerian Students', 'Cheapest Countries to Study in Europe for Nigerians (2027)'],
  'title': 'Cheapest Country to Study in Europe? 9 Countries Compared', 'class': 'no-lift',
  'text': {'nm': 'With Gbemi', 'hn': '@WithGbemi', 'w': 'Cheapest<br>country to<br>study', 'box': 'in Europe?'},
  'images': {'me': SH + 'cut-1579.png', 'av': SH + 'cut-1578.png'}, 'vars': {}})

# board yt-63 "CODE IN 2026": the creator's real photo, words in stacked white boxes on the left (one line per box)
add('04-boxes-study-in-europe-for-0',
 '.bg{width:var(--bw,1560px);left:var(--bx,-10px);top:var(--by,-300px)}'
 '.stack{position:absolute;left:var(--sx,44px);top:var(--sy,120px);display:flex;flex-direction:column;align-items:flex-start;gap:14px}'
 '.bx{background:#fff;color:#111114;font:800 var(--ws,104px)/1 "FG",sans-serif;letter-spacing:-.02em;text-transform:uppercase;padding:8px 22px 14px;box-shadow:0 10px 26px rgba(0,0,0,.3)}'
 '.bx.r{background:var(--red,#E3242B);color:#fff}',
 '<img class="ph bg z1" data-img="bg" alt="">\n'
 '<div class="stack z3" data-move="stack"><div class="bx" data-k="b1"></div><div class="bx" data-k="b2"></div><div class="bx r" data-k="b3"></div></div>',
 {'board': 'yt-63', 'kind': 'her full shoot photo, words in three stacked white boxes left, the last one red',
  'direction': 'Copies board yt-63 ("CODE / IN / 2026": the creator\'s real photo, the words in stacked white boxes with black type on the left, one line per box). Her shoot photo (palms up, as if weighing it; outfit B, Enhance photo, face untouched), shifted right. Words: STUDY IN / EUROPE / FOR €0? (the last box red). Germany: €0 tuition at most public universities, but €11,904 in the bank for the visa (kit 7f): the title and the video answer it.',
  'thumbnail_text': 'STUDY IN / EUROPE / FOR €0? (stacked boxes)',
  'titles': ['What Studying in Europe Really Costs a Nigerian in 2027', 'Tuition Free Universities in Europe Need Proof of Funds', 'Cheapest Countries to Study in Europe for Nigerians (2027)'],
  'title': 'What Studying in Europe Really Costs a Nigerian in 2027', 'class': 'no-lift',
  'text': {'b1': 'Study in', 'b2': 'Europe', 'b3': 'for €0?'},
  'images': {'bg': SH + 'room-1590.jpg'}, 'vars': {}})

# board pin-01-17 "BORING WAY": heavy caps top-left, a stack of notification cards under it, the creator on the right
def note(i, t, s):
    return (f'<div class="nt" data-move="n{i}"><div class="dot"><svg viewBox="0 0 24 24"><rect x="3" y="6" width="18" height="13" rx="2" fill="none" stroke="#fff" stroke-width="2"/><path d="M3.5 7l8.5 7 8.5-7" fill="none" stroke="#fff" stroke-width="2"/></svg></div>'
            f'<div><div class="tt" data-k="t{i}"></div><div class="ss" data-k="s{i}"></div></div></div>')
add('n4-notifications-before-you-apply',
 '.t{background:var(--ground,#0F1B33)}'
 '.w{left:44px;top:var(--wy,30px);font:400 var(--ws,84px)/.98 "AB",sans-serif;color:#fff;letter-spacing:-.02em;text-transform:uppercase}'
 '.list{position:absolute;left:var(--lx,44px);top:var(--ly,250px);display:flex;flex-direction:column;gap:18px}'
 '.nt{display:flex;align-items:center;gap:22px;width:var(--nw,700px);background:#fff;border-radius:20px;padding:20px 26px;box-shadow:0 14px 30px rgba(0,0,0,.35)}'
 '.dot{flex:none;width:68px;height:68px;border-radius:50%;background:var(--acc,#E3242B);display:grid;place-items:center}.dot svg{width:36px;height:36px}'
 '.tt{font:800 36px/1.1 "FG",sans-serif;color:#111}.ss{font:500 30px/1.25 "FG",sans-serif;color:#555;margin-top:4px}'
 '.ss b{color:#111;font-weight:800}'
 '.me{position:absolute;width:var(--mw,860px);left:var(--mx,600px);top:var(--my,155px)}',
 '<img class="me cut z2" data-img="me" alt="">\n'
 '<div class="a w z3" data-k="w"></div>\n'
 '<div class="list z3">' + note(1, '', '') + note(2, '', '') + note(3, '', '') + '</div>',
 {'board': 'pin-01-17', 'kind': 'flat navy ground, heavy caps top-left, a stack of 3 notification cards, her cut-out right',
  'direction': 'Copies board pin-01-17 ("BORING WAY": heavy white caps top-left, a stack of notification cards under it, the creator on the right). Three generic notifications (no app, no brand): the admission offer, the proof of funds (Germany: €11,904 for one year, kit 7f), the visa appointment. Her shoot photo (outfit B, Enhance photo, face untouched). Words: BEFORE YOU STUDY IN EUROPE.',
  'thumbnail_text': 'BEFORE YOU STUDY IN EUROPE + 3 notifications: offer / proof of funds €11,904 / visa appointment',
  'titles': ['Proof of Funds for Studying in Europe, Country by Country', 'What Studying in Europe Really Costs a Nigerian in 2027', 'Tuition Free Universities in Europe Need Proof of Funds'],
  'title': 'Proof of Funds for Studying in Europe, Country by Country', 'class': 'no-lift',
  'text': {'w': 'Before you<br>study in Europe', 't1': 'Offer of admission', 's1': 'Congratulations, you got in!',
           't2': 'Proof of funds', 's2': 'Show <b>€11,904</b> for one year (Germany)', 't3': 'Visa appointment', 's3': 'Bring your bank statement'},
  'images': {'me': SH + 'cut-1593.png'}, 'vars': {}})

# board yt-65 "HOW I LEARN FOUR LANGUAGES": the creator's photo, one caps line across the top with one word in colour, a slanted stack of labels beside her
LBL = ''.join(f'<div class="lb" data-k="l{i}" style="margin-left:{m}px;rotate:{r}deg"></div>' for i, (m, r) in enumerate([(30, -7), (0, -5), (40, -6), (10, -4)]))
add('10-labels-which-country-cheapest',
 '.bg{width:var(--bw,1500px);left:var(--bx,-330px);top:var(--by,-250px)}'
 '.veil{inset:0;background:var(--dim,rgba(12,10,10,.42))}'
 '.top{left:0;right:0;top:0;height:120px;background:rgba(10,10,12,.72)}'
 '.w{left:0;right:0;top:var(--wy,22px);text-align:center;font:400 var(--ws,80px)/1 "AN",sans-serif;color:#fff;letter-spacing:.005em;text-transform:uppercase}'
 '.w span{color:var(--acc,#FF5A36)}'
 '.labels{position:absolute;left:var(--lx,770px);top:var(--ly,215px);display:flex;flex-direction:column;gap:6px}'
 '.rs{right:0;top:120px;bottom:0;width:560px;background:rgba(10,10,12,.55)}'
 '.lb{font:400 var(--ls,104px)/1 "AN",sans-serif;letter-spacing:.01em;color:#fff;text-transform:uppercase;text-shadow:0 4px 18px rgba(0,0,0,.6)}'
 '.lb:first-child{color:var(--acc,#FF5A36)}',
 '<img class="ph bg z1" data-img="bg" alt=""><div class="veil z2"></div><img class="ph bg cut z3" data-img="me" alt="">\n'
 '<div class="veil rs z2"></div><div class="veil top z4"></div><div class="a w z5" data-k="w"></div>\n'
 '<div class="labels z5" data-move="labels">' + LBL + '</div>',
 {'board': 'yt-65', 'kind': 'her full shoot photo, one caps line on a dark band at the top, a slanted stack of country names beside her',
  'direction': 'Copies board yt-65 ("HOW I LEARN FOUR LANGUAGES": the creator\'s photo, one caps line across the top with one word in colour, a slanted stack of labels beside her; here all in one condensed font). Her shoot photo (thinking, hand at her head; outfit B, Enhance photo, face untouched) moved left, room dimmed. Labels: Austria, Germany, France, Estonia (four of the nine countries in the video, cheapest year one first by kit 7f: Austria under 24 €10,177, Germany €11,904, France €14,480, Estonia €14,560). Words: WHICH COUNTRY IN EUROPE IS CHEAPEST?',
  'thumbnail_text': 'WHICH COUNTRY IN EUROPE IS CHEAPEST? + Austria / Germany / France / Estonia',
  'titles': ['Cheapest Countries in Europe: Tuition + Proof of Funds', 'Proof of Funds for Studying in Europe, Country by Country', 'Cheapest Countries to Study in Europe for Nigerians (2027)'],
  'title': 'Cheapest Countries in Europe: Tuition + Proof of Funds', 'class': 'no-lift',
  'text': {'w': 'Which country in Europe is <span>cheapest?</span>', 'l0': 'Austria', 'l1': 'Germany', 'l2': 'France', 'l3': 'Estonia'},
  'images': {'bg': SH + 'room-1585.jpg', 'me': SH + 'room-1585-cut.png'}, 'vars': {}})

# board yt-71 "the art of offline living": three real photos side by side (a life in pictures), one plain lowercase line over the top
add('n6-collage-on-a-budget',
 '.t{background:#0E0E10}'
 '.p{position:absolute;top:0;height:720px;overflow:hidden}.p img{position:absolute;display:block}'
 '.p1{left:0;width:340px}.p2{left:350px;width:580px}.p3{left:940px;width:340px}'
 '.p1 img{height:var(--h1,760px);left:var(--x1,-420px);top:var(--y1,-20px)}'
 '.p2 img{height:var(--h2,960px);left:var(--x2,-410px);top:var(--y2,-90px)}'
 '.p3 img{height:var(--h3,760px);left:var(--x3,-420px);top:var(--y3,-20px)}'
 '.band{left:0;right:0;top:0;height:160px;background:rgba(10,10,12,.7)}'
 '.w{left:0;right:0;top:var(--wy,34px);text-align:center;font:700 var(--ws,80px)/1 "FG",sans-serif;color:#fff;letter-spacing:-.02em}',
 '<div class="p p1 z1"><img data-img="p1" alt=""></div><div class="p p2 z1"><img data-img="p2" alt=""></div><div class="p p3 z1"><img data-img="p3" alt=""></div>\n'
 '<div class="veil band z2"></div><div class="a w shd z3" data-k="w"></div>',
 {'board': 'yt-71', 'kind': 'three photos side by side (a €100 note in a hand, her, a Tallinn street), one lowercase line on top',
  'direction': 'Copies board yt-71 ("the art of offline living": three real photos side by side that tell a life, one plain lowercase line over the top). Left: a hand holding a €100 note (Markus Spiske, Pexels); middle: her shoot photo (thinking; outfit B, Enhance photo, face untouched); right: an old-town street in Tallinn, where she studies (Argo Allvee, Pexels). Words: what it costs to study in Europe.',
  'thumbnail_text': 'what it costs to study in Europe',
  'titles': ['Cheapest Countries to Study in Europe for Nigerians (2027)', 'Cheapest Countries in Europe: Tuition + Proof of Funds', 'Proof of Funds for Studying in Europe, Country by Country'],
  'title': 'Cheapest Countries to Study in Europe for Nigerians (2027)', 'class': 'no-lift',
  'text': {'w': 'what it costs to study in Europe'},
  'images': {'p1': '../../assets/px/hand-100-euro.jpg', 'p2': SH + 'room-1586.jpg', 'p3': '../../assets/collage/tallinn-street.jpg'}, 'vars': {}})

add('06-white-studying-isnt-free',
 '.t{background:var(--ground,#F5F3EF)}'
 '.w{left:var(--wx,54px);top:var(--wy,80px);font:900 var(--ws,124px)/1 "FG",sans-serif;color:#111114;letter-spacing:-.04em}'
 '.tag{position:absolute;left:var(--tx,60px);top:var(--ty,500px);background:#111114;color:#fff;font:800 var(--ts,46px)/1 "FG",sans-serif;padding:14px 22px 16px;rotate:-2deg}.tag b{color:var(--yl,#FFD23F)}'
 '.w span{color:var(--red,#E3242B)}'
 '.me{position:absolute;width:var(--mw,760px);left:var(--mx,620px);top:var(--my,66px)}',
 '<img class="me cut z2" data-img="me" alt="">\n<div class="a w z3" data-k="w"></div><div class="tag z3" data-k="tag"></div>',
 {'board': 'pin-03-02', 'kind': 'plain off-white ground, bold lowercase sentence left (last words red), her cut-out right',
  'direction': 'Copies board pin-03-02 ("no one cares.": a plain white ground, one short bold lowercase sentence on the left, the person on the right, nothing else). Her shoot photo (hand at her chin, thinking; outfit B, Enhance photo, face untouched). Words: studying in Europe isn\'t free. + a black tag: €0 tuition ≠ €0 cost. True: even where tuition is €0 (Germany, most public universities) the visa asks for €11,904 in the bank (kit 7f).',
  'thumbnail_text': "studying in Europe isn't free. + tag: €0 tuition ≠ €0 cost",
  'titles': ['Study in Europe for Free? What Nigerians Really Pay', 'Tuition Free Universities in Europe Need Proof of Funds', 'What Studying in Europe Really Costs a Nigerian in 2027'],
  'title': 'Study in Europe for Free? What Nigerians Really Pay', 'class': 'no-lift',
  'text': {'w': "studying<br>in Europe<br><span>isn't free.</span>", 'tag': '€0 tuition <b>≠</b> €0 cost'},
  'images': {'me': SH + 'cut-1586.png'}, 'vars': {}})

X = '<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="19" fill="#E3242B"/><path d="M13 13l14 14M27 13L13 27" stroke="#fff" stroke-width="5" stroke-linecap="round"/></svg>'
V = '<svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="19" fill="#159A55"/><path d="M11 21l6 6 12-13" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/></svg>'
add('03-orange-germany-is-free-myth',
 '.t{background:var(--ground,#FF6B1A)}'
 '.bar{position:absolute;display:flex;align-items:center;gap:22px;background:#fff;border-radius:16px;padding:18px 24px 20px 30px;box-shadow:0 12px 26px rgba(0,0,0,.18);font:800 var(--bs,62px)/1 "FG",sans-serif;letter-spacing:-.02em;white-space:nowrap}'
 '.bar svg{flex:none;width:74px;height:74px}'
 '.b1{left:var(--x1,46px);top:var(--y1,150px);color:#C8161D;rotate:-2deg}.b1 span{text-decoration:line-through;text-decoration-thickness:6px}'
 '.b2{left:var(--x2,80px);top:var(--y2,380px);color:#0E7A41;rotate:1.5deg}'
 '.me{position:absolute;width:var(--mw,820px);left:var(--mx,560px);top:var(--my,62px)}',
 '<img class="me cut z2" data-img="me" alt="">\n'
 '<div class="bar b1 z3" data-move="bar1"><span data-k="b1"></span>' + X + '</div>\n'
 '<div class="bar b2 z3" data-move="bar2"><span data-k="b2"></span>' + V + '</div>',
 {'board': 'yt-29', 'kind': 'flat orange ground, two white bars (one crossed out with a red cross, one with a green tick), her cut-out pointing',
  'direction': 'Copies board yt-29 ("my-project.vercel.app (cross) / myproject.com (tick)": flat orange, two white bars, the wrong one with a red cross, the right one with a green tick, the creator pointing at them). Her shoot photo (pointing; outfit B, Enhance photo, face untouched). Words: "Germany is free" (crossed out) / "€11,904 for the visa" (tick). True (kit 7f): tuition is €0 at most public universities in Germany, but the visa asks for €11,904 (€992 a month) in a blocked account.',
  'thumbnail_text': 'Germany is free (crossed out, red cross) / €11,904 for the visa (green tick)',
  'titles': ['Tuition Free Universities in Europe Need Proof of Funds', 'Germany Is Free to Study In. The Visa Isn\'t', 'Proof of Funds for Studying in Europe, Country by Country'],
  'title': 'Tuition Free Universities in Europe Need Proof of Funds', 'class': 'no-lift',
  'text': {'b1': 'Germany is free', 'b2': '€11,904 for the visa'},
  'images': {'me': SH + 'cut-1591.png'}, 'vars': {}})

for name, css, body, content, extra in S:
    if name.startswith('n') and not ONLY: continue   # dropped after the cold review (Bin: ~/.Trash/cheapest-thumbnails-round2-2026-11-12/)
    if ONLY and not any(name.startswith(o) for o in ONLY): continue
    d = os.path.join(ROOT, 'directions', name); os.makedirs(d, exist_ok=True)
    open(os.path.join(d, 'index.html'), 'w').write(HEAD.format(css=css, body=body, extra=extra))
    cp = os.path.join(d, 'content.json')
    if FORCE or not os.path.exists(cp):
        json.dump(dict(content, recommended=False, nudge={}), open(cp, 'w'), indent=1, ensure_ascii=False)
    print('wrote', name)
