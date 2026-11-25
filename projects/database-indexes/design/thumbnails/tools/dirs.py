# Thumbnail directions, round 2 (after gate round 1: cold topic critic, title-pair critic, taste critic).
# Round-2 rules: closed-mouth frames only (tools/expr.swift: inner-lip gap < 0.035 of the face, eyes open); this set's own
# type (IBM Plex Sans Bold, sentence case, one key word on a yellow or red block; never the condensed caps of ghana-marrify);
# no decorative database cylinders or spinners unless the object IS the point; code text >= 30 px; no handwritten captions
# that die at 320 px. Exec'd by tools/gen.py (helpers: place, SCENE, CUT, db, spinner, mk, rows, D).

PH = '<div class="photo" data-move="photo"><img data-img="scene" alt=""><div class="dim"></div></div>'
def H(*keys, cls='hd sh2'):
    return ''.join(f'<div class="w {k} {cls}" data-k="{k}"></div>' for k in keys)
DARK = {'--ground': '#0E1013', '--fg': '#FFFFFF', '--accent': '#FFC53D'}
def V(fr, cx, cy, fw, dim='.2', cover=True, **kw):
    return dict(place(fr, cx, cy, fw, cover), **DARK, **{'--dimo': dim}, **kw)

# ============ 01 Slow database? (T01) ============
D['01-slow-database'] = dict(
    concept='T01', thumbnail_text='Slow database?', frame='4:00.5 (hand on head, mouth closed)',
    direction='Photo-led: her real room, hand on her head (her own gesture in the recording), large on the right. The problem in two words on the left, "Slow" on a red block. Follows viral sample 5 (topic named + scene). Round 2: closed-mouth frame, Plex type, no icons.',
    title='Database Indexes: Why Your App Slows Down as It Grows',
    titles=['Database Indexes: Why Your App Slows Down as It Grows', 'SQL Indexes: Make Slow Queries Fast with One Line', 'Database Indexing for Beginners: Fix Slow SQL Queries'],
    text={'a': '<span class="markr">Slow</span>', 'b': 'database?'}, images={'scene': SCENE('240.5')},
    vars=V('240.5', 900, 330, 410, '.14'),
    style='.w{position:absolute;left:56px;z-index:3;color:var(--fg)} .w.a{top:150px;font-size:190px} .w.b{top:356px;font-size:132px}',
    body=PH + H('a', 'b'))

# ============ 02 Fast... then slow? (T12) ============
def phone_app(slow):
    items = ''.join('<div class="it"><i></i><div><b></b><s></s></div></div>' for _ in range(6))
    return f'<div class="scr"><div class="notch"></div><div class="app{" slow" if slow else ""}"><div class="hd2">{"Loading…" if slow else "Orders"}</div>{items}</div></div>'

D['02-fast-then-slow'] = dict(
    concept='T12', thumbnail_text='Fast… then slow?', frame='2:21.9 (both hands in, calm)', recommended=True,
    direction='Before / after split on her real photo. Left: the app with a few users has loaded. Right: the same app with thousands of users, an empty skeleton list still loading. No invented timings. Follows her saved "Day 1 / Day 900" splits and the "fast with 10 rows, crawls with 10,000" conversation. Round 2: no spinner or cylinder, labels on the phones, headline clear of her headwrap.',
    title='Database Indexes: Why Your App Slows Down as It Grows',
    titles=['Database Indexes: Why Your App Slows Down as It Grows', 'No Index? Your Database Reads Every Single Row', 'Database Indexing for Beginners: Fix Slow SQL Queries'],
    text={'a': 'Fast…', 'b': 'then <span class="markr">slow?</span>', 'la': '10 users', 'lb': '10,000 users'}, images={'scene': SCENE('141.9')},
    vars=V('141.9', 640, 360, 290, '.18'),
    style='.w{position:absolute;top:26px;z-index:3;font-size:120px;color:var(--fg)} .w.a{left:48px;color:#22C55E} .w.b{right:44px;text-align:right}'
          '.phone{width:230px;height:410px;top:230px;z-index:3} .ph1{left:64px;transform:rotate(-5deg)} .ph2{right:70px;transform:rotate(5deg)}'
          '.app{padding:46px 16px 0} .app .hd2{font-family:Plex;font-weight:700;font-size:26px;margin-bottom:12px}'
          '.it{display:flex;gap:12px;align-items:center;padding:10px 0;border-top:2px solid #e6e2d8} .it i{width:40px;height:40px;border-radius:10px;background:#FFC53D}'
          '.it b{display:block;width:120px;height:12px;background:#0E1013;border-radius:6px;margin-bottom:8px} .it s{display:block;width:80px;height:10px;background:#cfcabd;border-radius:5px}'
          '.app.slow .hd2{color:#9a958a} .app.slow i,.app.slow b,.app.slow s{background:#e4e0d6}'
          '.l{position:absolute;z-index:4;font-family:"Plex Mono";font-weight:600;font-size:30px;padding:2px 14px;border-radius:6px;top:604px} .l.a{left:84px;background:#22C55E;color:#0E1013;transform:rotate(-5deg)} .l.b{right:86px;background:#F23D2E;color:#fff;transform:rotate(5deg)}',
    body=PH + H('a', 'b') + f'<div class="phone ph1" data-move="phone-fast">{phone_app(False)}</div><div class="phone ph2" data-move="phone-slow">{phone_app(True)}</div>'
         '<div class="l a" data-k="la"></div><div class="l b" data-k="lb"></div>')

# ============ 03 Is it using the index? (T07) ============
D['03-is-it-using-the-index'] = dict(
    concept='T07', thumbnail_text='Is it using the index?', frame='3:55.9 (fingers at her temple, thinking)', recommended=True,
    direction='Photo-led with the film\'s terminal panel: a real PostgreSQL EXPLAIN, and the answer every developer dreads, Seq Scan, big and red. Her on the right, thinking. Follows the code-card outliers (techTFQ, LearnThatStack). Round 2: closed-mouth frame, query one line, Seq Scan 58 px.',
    title="Added an Index and It's Still Slow? Check This First",
    titles=["Added an Index and It's Still Slow? Check This First", 'Database Index Mistakes (and How to Check with EXPLAIN)', 'Seq Scan vs Index Scan: Is Your Query Using the Index?'],
    text={'a': 'Is it using', 'b': 'the <span class="mark">index?</span>', 'q1': 'EXPLAIN SELECT * FROM orders WHERE …', 'r1': 'Seq Scan on orders'},
    images={'scene': SCENE('235.9')},
    vars=V('235.9', 930, 340, 380, '.2'),
    style='.w{position:absolute;left:48px;z-index:3;font-size:110px;color:var(--fg)} .w.a{top:30px} .w.b{top:162px}'
          '.term{left:40px;top:336px;width:660px;z-index:3;padding:58px 30px 30px} .q{font-size:24px;color:#B8BCC4;white-space:nowrap}'
          '.res{font-size:58px;margin-top:20px} .res .bad{padding:2px 14px}',
    body=PH + H('a', 'b') + '<div class="term" data-move="terminal"><div class="bar"><i style="left:20px"></i><i style="left:40px"></i><i style="left:60px"></i></div>'
         '<div class="ln q" data-k="q1"></div><div class="ln res"><span class="bad" data-k="r1"></span></div></div>')

# ============ 04 LOWER() skips your index (T06) ============
D['04-lower-breaks-index'] = dict(
    concept='T06', thumbnail_text='LOWER() skips your index', frame='6:50.2 (wary frown, mouth closed)', recommended=True,
    direction='Mistake format: the query with LOWER(email) and a plain index on email gets Seq Scan (red); the fix, an index on the same expression, gets Index Scan (yellow). Her wary on the left. Real PostgreSQL behaviour. Round 2: the fix is now the expression index (the first version silently changed the query), words "skips" (it only skips a plain index).',
    title='Why Your Database Ignores Your Index (2 Common Mistakes)',
    titles=['Why Your Database Ignores Your Index (2 Common Mistakes)', 'Database Index Mistakes (and How to Check with EXPLAIN)', '2 Database Index Mistakes (and a Postgres Gotcha)'],
    text={'a': '<span class="markr">LOWER()</span>', 'b': 'skips your index', 'c1': "WHERE LOWER(email) = 'bob@…'", 's1': 'Seq Scan',
          'c2': 'CREATE INDEX ON users (LOWER(email));', 's2': 'Index Scan'},
    images={'scene': SCENE('410.2')},
    vars=V('410.2', 300, 380, 330, '.2'),
    style='.w{position:absolute;z-index:3;color:var(--fg);left:600px} .w.a{top:34px;font-size:104px} .w.b{top:150px;font-size:80px}'
          '.term{left:600px;width:650px;z-index:3;padding:22px 24px 20px 96px} .term.t1{top:292px;border-color:var(--red)} .term.t2{top:476px;border-color:#7a5d17}'
          '.term .ln{font-size:24px} .term .s{font-size:30px;margin-top:8px;font-weight:600} .t1 .s{color:#ff7a6e} .t2 .s{color:#FFC53D} .mk{z-index:4}',
    body=PH + H('a', 'b') +
         '<div class="term t1" data-move="card-bad"><div class="ln" data-k="c1"></div><div class="ln s">→ <span data-k="s1"></span></div></div>'
         '<div class="term t2" data-move="card-good"><div class="ln" data-k="c2"></div><div class="ln s">→ <span data-k="s2"></span></div></div>'
         + mk('x', 614, 312, 64) + mk('ok', 614, 496, 64))

# ============ 05 No index? It reads every row (T03) ============
D['05-reads-every-row'] = dict(
    concept='T03', thumbnail_text='No index? It reads every row', frame='8:16.8 (pointing at the table, mouth closed)',
    direction='Photo-led now (round 1 was the flat cut-out formula): she points at a tall printout of a books table pinned over the wall of her room; a red line runs down every row, the one row it wanted in yellow. The slow behaviour drawn as an object (viral sample 2).',
    title='Database Indexes: Why Your App Slows Down as It Grows',
    titles=['Database Indexes: Why Your App Slows Down as It Grows', 'No Index? Your Database Reads Every Single Row', 'Database Indexing for Beginners: Fix Slow SQL Queries'],
    text={'a': 'No index?', 'b': 'It reads', 'c': '<span class="markr">every row</span>'},
    images={'scene': SCENE('496.8')},
    vars=V('496.8', 990, 400, 360, '.22'),
    style='.tw{position:absolute;left:58px;top:12px;width:480px;transform:rotate(-3deg);z-index:2} .tbl{position:relative;--cols:104px 1fr 132px;font-size:21px}'
          '.scan{position:absolute;left:-30px;top:44px;height:560px;width:10px;z-index:5;background:var(--red);border-radius:5px} .scan:after{content:"";position:absolute;bottom:-6px;left:-11px;border:16px solid transparent;border-top:22px solid var(--red)}'
          '.w{position:absolute;left:560px;z-index:3;color:var(--fg)} .w.a{top:30px;font-size:84px;color:#ff7a6e} .w.b{top:120px;font-size:110px} .w.c{top:236px;font-size:110px}',
    body=PH + '<div class="tw" data-move="table"><div class="tbl">' + rows(16, 469863, hit=12) + '</div><div class="scan"></div></div>' + H('a', 'b', 'c'))

# ============ 06 1 row in a million (T21, Query Plan look) ============
def btree2(w=640):
    # pruned to the path: root dave|mia, alice|carl, leaf alice|bob, Bob's row (a B+tree with 2 keys per node shown)
    return f'''<svg viewBox="0 0 560 430" width="{w}"><g font-family="Plex Mono" font-size="34" fill="#ECEAE4" stroke-width="3">
<g stroke="#ECEAE4" fill="none"><rect x="250" y="6" width="220" height="64"/><line x1="360" y1="6" x2="360" y2="70"/>
<rect x="60" y="150" width="220" height="64"/><line x1="170" y1="150" x2="170" y2="214"/>
<rect x="0" y="292" width="200" height="64"/><line x1="100" y1="292" x2="100" y2="356"/>
<line x1="470" y1="70" x2="530" y2="150" stroke="#555B66" stroke-dasharray="7 9"/><line x1="280" y1="214" x2="330" y2="292" stroke="#555B66" stroke-dasharray="7 9"/></g>
<g stroke="#FFC53D" stroke-width="7" fill="none"><line x1="255" y1="70" x2="170" y2="150"/><line x1="170" y1="214" x2="150" y2="292"/><line x1="150" y1="356" x2="150" y2="380"/></g>
<rect x="100" y="292" width="100" height="64" fill="#FFC53D"/>
<g stroke="none"><text x="305" y="50" text-anchor="middle">dave</text><text x="415" y="50" text-anchor="middle">mia</text>
<text x="115" y="194" text-anchor="middle">alice</text><text x="225" y="194" text-anchor="middle">carl</text>
<text x="50" y="336" text-anchor="middle" font-size="30">alice</text><text x="150" y="336" text-anchor="middle" fill="#0E1013" font-weight="600">bob</text></g>
<rect x="10" y="380" width="430" height="46" fill="none" stroke="#FFC53D" stroke-width="3"/>
<text x="26" y="413" font-size="26">row 48,213 │ bob@email.com</text></g></svg>'''

D['06-20-steps'] = dict(
    concept='T21', thumbnail_text='1 row in a million, ~20 steps', frame='3:27.7 ("this small" pinch, mouth closed)',
    direction='The film\'s Query Plan look (off-black, hairline grid, one yellow path): the index tree, pruned to the path that finds bob@email.com and his row, nodes 1.5x bigger than round 1; her real "this small" gesture on the right. "About 20 steps" is her own phrase (20 comparisons over 3-4 page reads; BRIEF).',
    title='How Database Indexes Find 1 Row in a Million',
    titles=['How Database Indexes Find 1 Row in a Million', 'No Index? Your Database Reads Every Single Row', 'What Is a Database Index? (And Why Your App Needs One)'],
    text={'a': '1 row in a million.', 'b': '<span class="mark">~20 steps.</span>'},
    images={'front': CUT('207.7')},
    vars=dict(place('207.7', 1010, 360, 340, cover=False), **{'--ground': '#0E1013', '--fg': '#ECEAE4', '--accent': '#FFC53D'}),
    style='.w{position:absolute;left:52px;z-index:3;font-size:84px;color:var(--fg)} .w.a{top:40px} .w.b{top:136px}'
          '.tree{position:absolute;left:58px;top:262px;z-index:2} .front{z-index:1}',
    body='<div class="grid"></div><div class="front" data-move="her"><img data-img="front" alt=""></div>'
         f'<div class="tree" data-move="tree">{btree2(600)}</div>' + H('a', 'b', cls='hd'))

# ============ 07 A database index is this (T02) ============
D['07-index-like-a-book'] = dict(
    concept='T02', thumbnail_text='A database index is this', frame='9:18.1 (pointing at the page, mouth closed)',
    direction='Collage over her photo: the index page at the back of a book (everyone has used one), one entry highlighted, an arrow to the matching row of a database table. She points at it. Topic named plainly + its object. Round 2: no cylinder, no scribble, arrow ends clear of the table header.',
    title='What Is a Database Index? (And Why Your App Needs One)',
    titles=['What Is a Database Index? (And Why Your App Needs One)', 'Database Indexing for Beginners: Fix Slow SQL Queries', 'How Database Indexes Find 1 Row in a Million'],
    text={'a': 'A database index', 'b': 'is <span class="mark">this.</span>', 'h': 'Index'},
    images={'scene': SCENE('558.1')},
    vars=V('558.1', 990, 360, 360, '.2'),
    style='.w{position:absolute;left:46px;z-index:4;color:var(--fg);font-size:92px} .w.a{top:34px} .w.b{top:132px}'
          '.pg{position:absolute;left:64px;top:262px;width:380px;background:#FBF6EA;color:#1b1b1b;transform:rotate(-4deg);z-index:3;box-shadow:0 18px 40px rgba(0,0,0,.5);padding:24px 32px 30px;font-family:"Instrument Serif",serif}'
          '.pg h4{font-size:56px;font-weight:400;font-style:italic;margin-bottom:6px} .pg p{font-size:32px;line-height:1.42;display:flex;justify-content:space-between;border-bottom:1px dotted #bbb}'
          '.pg p.hit{background:#FFC53D}'
          '.tb{position:absolute;left:470px;top:540px;width:430px;z-index:3;--cols:120px 1fr;font-size:24px;transform:rotate(2deg)}'
          '.arr{position:absolute;left:410px;top:420px;z-index:4}',
    body=PH + '<div class="pg" data-move="book-index"><h4 data-k="h"></h4><p><span>Adeyemi</span><span>112</span></p><p><span>B-tree</span><span>34</span></p>'
         '<p class="hit"><span>Bob</span><span>48</span></p><p><span>bookstore</span><span>12</span></p><p><span>hash</span><span>77</span></p><p><span>Okafor</span><span>113</span></p></div>'
         '<div class="tbl tb" data-move="table"><div class="r h"><span>row</span><span>email</span></div><div class="r faded"><span>48,212</span><span>ada@email.com</span></div>'
         '<div class="r hit"><span>48,213</span><span>bob@email.com</span></div><div class="r faded"><span>48,214</span><span>chidi@email.com</span></div></div>'
         '<svg class="arr" width="150" height="150" viewBox="0 0 150 150"><path d="M6 26 C 70 16, 110 50, 118 120" fill="none" stroke="#FFC53D" stroke-width="7" stroke-linecap="round"/><path d="M98 106 L119 126 L134 100" fill="none" stroke="#FFC53D" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></svg>'
         + H('a', 'b'))

# ============ 08 Wrong column order? (T05) ============
D['08-column-order'] = dict(
    concept='T05', thumbnail_text='Wrong column order?', frame='4:28.7 (chin on hand, thinking)',
    direction='Composite index as code: an index on (last_name, first_name); a search by surname ticked green, a search by first name only crossed red (usually not used; BRIEF). Her own names (Okafor, Ada). Round 2: one prop only, closed-mouth thinking frame, code 34 px.',
    title='Composite Index Explained: Why Column Order Matters',
    titles=['Composite Index Explained: Why Column Order Matters', 'Database Index Types: Which One Should You Use?', '2 Database Index Mistakes (and a Postgres Gotcha)'],
    text={'a': 'Wrong', 'b': '<span class="mark">column order?</span>', 'code': 'INDEX (last_name, first_name)', 'q1': "WHERE last_name = 'Okafor'", 'q2': "WHERE first_name = 'Ada'"},
    images={'scene': SCENE('268.7')},
    vars=V('268.7', 300, 360, 340, '.22'),
    style='.w{position:absolute;left:560px;z-index:3;color:var(--fg)} .w.a{top:34px;font-size:110px} .w.b{top:166px;font-size:96px}'
          '.term{left:560px;top:330px;width:690px;z-index:3;padding:30px 30px} .code{font-size:34px;font-weight:600;color:#fff}'
          '.qq{font-size:31px;margin-top:22px;display:flex;align-items:center;gap:18px} .qq .mk{position:relative;--bs:52px;border-width:3px}',
    body=PH + H('a', 'b') + '<div class="term" data-move="code"><div class="ln code" data-k="code"></div>'
         f'<div class="ln qq">{mk("ok",0,0,52)}<span data-k="q1"></span></div><div class="ln qq">{mk("x",0,0,52)}<span data-k="q2"></span></div></div>')

# ============ 09 Which index type? (T08) ============
D['09-which-index'] = dict(
    concept='T08', thumbnail_text='Which index type?', frame='3:14.4 (hands up, puzzled, mouth closed)',
    direction='Three sticky notes stuck on the wall beside her, each an index type and what it is for (B-tree: ranges and sorting; hash: exact match; full-text: words in text). Follows viral sample 3 (framework on sticky notes). Round 2: no mini icons, notes spaced apart, marker handwriting.',
    title='Database Index Types: Which One Should You Use?',
    titles=['Database Index Types: Which One Should You Use?', 'B-Tree vs Hash vs Full-Text: Database Index Types', 'Database Indexing for Beginners: Fix Slow SQL Queries'],
    text={'a': 'Which', 'b': '<span class="mark">index type?</span>', 's1': 'B-tree', 's2': 'Hash', 's3': 'Full-text', 'd1': 'ranges, sorting', 'd2': 'exact match', 'd3': 'words in text'},
    images={'scene': SCENE('194.4')},
    vars=V('194.4', 960, 360, 360, '.2'),
    style='.w{position:absolute;left:48px;z-index:3;color:var(--fg)} .w.a{top:30px;font-size:110px} .w.b{top:160px;font-size:100px}'
          '.sticky{width:230px;height:176px;z-index:3;font-family:Caveat;font-weight:700;font-size:66px;line-height:1} .sticky small{display:block;font-family:"Plex Mono";font-weight:600;font-size:23px;margin-top:10px}'
          '.s1{left:48px;top:318px;transform:rotate(-4deg)} .s2{left:300px;top:330px;transform:rotate(3deg);background:#9EE6B4} .s3{left:150px;top:520px;transform:rotate(-2deg);background:#FFB59E;width:250px}',
    body=PH + H('a', 'b') +
         ''.join(f'<div class="sticky s{i}" data-move="note{i}"><span data-k="s{i}"></span><small data-k="d{i}"></small></div>' for i in (1, 2, 3)))

# ============ 10 Index every column? (T09) ============
D['10-index-every-column'] = dict(
    concept='T09', thumbnail_text='Index every column?', frame='2:28 (sceptical side look, mouth closed)',
    direction='The beginner\'s question on a real-looking orders table: every column header highlighted as indexed; her sceptical side look. Follows viral sample 4 (the question the viewer already has). Round 2: no pill tags (the whole header row is yellow instead), closed-mouth frame.',
    title='Why Indexing Every Column Makes Your Database Slower',
    titles=['Why Indexing Every Column Makes Your Database Slower', '6 Indexes, 7 Writes: The Hidden Cost of Database Indexes', "Don't Add a Database Index Before You Run EXPLAIN"],
    text={'a': 'Index', 'b': '<span class="mark">every</span> column?', 'n': 'INDEX on all 5 columns'},
    images={'scene': SCENE('148.0')},
    vars=V('148.0', 1000, 370, 360, '.2'),
    style='.w{position:absolute;left:48px;z-index:3;color:var(--fg)} .w.a{top:30px;font-size:120px} .w.b{top:172px;font-size:110px}'
          '.tb{position:absolute;left:44px;top:340px;width:660px;z-index:3;--cols:repeat(5,1fr);font-size:23px;transform:rotate(-2deg)} .tb .r>span{padding:10px 12px}'
          '.tb .h{background:#FFC53D;color:#0E1013} .n{position:absolute;left:52px;top:640px;font-size:26px;color:#FFC53D;z-index:3;font-weight:600}',
    body=PH + H('a', 'b') + '<div class="tbl tb" data-move="table"><div class="r h"><span>id</span><span>user_id</span><span>status</span><span>total</span><span>created</span></div>'
         + ''.join(f'<div class="r"><span>{1040 + i}</span><span>{u}</span><span>{s}</span><span>{t}</span><span>{d}</span></div>' for i, (u, s, t, d) in enumerate([(42, 'paid', '18.50', 'Oct 01'), (7, 'new', '9.99', 'Oct 01'), (42, 'paid', '31.00', 'Oct 02'), (19, 'sent', '12.40', 'Oct 02')]))
         + '</div><div class="n mono" data-k="n"></div>')

# ============ 11 How "near me" search works (T11) ============
D['11-near-me'] = dict(
    concept='T11', thumbnail_text='How "near me" works', frame='0:22.7 (calm, mouth closed)',
    direction='Everyday object fills the frame: a phone map (illustration, no real app) with coffee pins, a dashed circle round "you", only the pins inside lit. What a spatial index does. Round 2: calm frame, no cylinder, title made spatial-only.',
    title="Spatial Index Explained: How 'Near Me' Search Works",
    titles=["Spatial Index Explained: How 'Near Me' Search Works", 'Database Index Types: Which One Should You Use?', 'Spatial and Full-Text Indexes: How Apps Search Fast'],
    text={'a': 'How <span class="mark">"near me"</span>', 'b': 'search works', 'lab': ''},
    images={'scene': SCENE('22.7')},
    vars=V('22.7', 990, 380, 360, '.2'),
    style='.w{position:absolute;left:470px;z-index:3;color:var(--fg)} .w.a{top:36px;font-size:92px} .w.b{top:140px;font-size:92px}'
          '.phone{left:70px;top:70px;width:340px;height:610px;z-index:3;transform:rotate(-4deg)} .map{position:absolute;inset:0;background:#E9E4D6}'
          '.lab{position:absolute;left:106px;top:666px;font-size:15px;color:#cfd2d8;z-index:3;letter-spacing:.1em}',
    body=PH + H('a', 'b') +
         '<div class="phone" data-move="phone"><div class="scr"><div class="notch"></div><div class="map"><svg width="312" height="582" viewBox="0 0 312 582">'
         '<path d="M-10 120 L330 210 M-10 420 L330 330 M90 -10 L150 600 M230 -10 L200 600" stroke="#fff" stroke-width="16"/>'
         '<path d="M-10 270 L330 260" stroke="#fff" stroke-width="26"/><rect x="190" y="420" width="90" height="70" fill="#CFE3C5"/><rect x="20" y="20" width="60" height="80" fill="#CFE3C5"/>'
         '<circle cx="156" cy="290" r="112" fill="rgba(255,197,61,.18)" stroke="#0E1013" stroke-width="3" stroke-dasharray="10 9"/>'
         '<circle cx="156" cy="290" r="13" fill="#1B6CFF" stroke="#fff" stroke-width="5"/>'
         + ''.join(f'<g transform="translate({x} {y})"><path d="M0 0 c-16 -22 -16 -40 0 -40 c16 0 16 18 0 40z" fill="{c}" stroke="#0E1013" stroke-width="2.5"/><circle cy="-27" r="6" fill="#fff"/></g>'
                   for x, y, c in [(110, 250, '#F23D2E'), (210, 330, '#F23D2E'), (190, 214, '#F23D2E'), (40, 520, '#A39E92'), (280, 90, '#A39E92'), (40, 150, '#A39E92'), (270, 560, '#A39E92'), (120, 420, '#F23D2E')])
         + '</svg></div></div></div><div class="lab mono" data-k="lab"></div>')

# ============ 12 One line of SQL (T13) ============
D['12-one-line-of-sql'] = dict(
    concept='T13', thumbnail_text='One line of SQL', frame='7:28.7 (pointing at the card, mouth closed)',
    direction='One object = the outcome (viral sample 2): a paper card with the one real line, CREATE INDEX (works in PostgreSQL and MySQL), yellow on the key words; she points at it. Round 2: no scribble, closed-mouth frame.',
    title='Database Indexing for Beginners: Fix Slow SQL Queries',
    titles=['Database Indexing for Beginners: Fix Slow SQL Queries', 'SQL Indexes: Make Slow Queries Fast with One Line', 'Database Indexes: Why Your App Slows Down as It Grows'],
    text={'a': 'One line', 'b': 'of <span class="mark">SQL.</span>', 'c1': '<span class="hl">CREATE INDEX</span> idx_author', 'c2': 'ON books (author_id);'},
    images={'scene': SCENE('448.7')},
    vars=V('448.7', 980, 380, 350, '.18'),
    style='.w{position:absolute;left:50px;z-index:3;color:var(--fg);font-size:132px} .w.a{top:30px} .w.b{top:160px}'
          '.paper{left:44px;top:376px;width:700px;z-index:3;transform:rotate(-2deg);padding:30px 34px} .paper .ln{font-size:40px;font-weight:600;line-height:1.35;white-space:nowrap}',
    body=PH + H('a', 'b') + '<div class="paper" data-move="card"><div class="ln" data-k="c1"></div><div class="ln" data-k="c2"></div></div>')

# ============ 13 Postgres doesn't index this (T15) ============
D['13-postgres-foreign-keys'] = dict(
    concept='T15', thumbnail_text="Postgres doesn't index this", frame='2:28 (sceptical side look, mouth closed)',
    direction='Two tables joined by a foreign key; orders.customer_id (the column PostgreSQL does not index for you; MySQL InnoDB does) ringed red with a NO INDEX tag. Her sceptical on the left. Real behaviour (BRIEF). Follows PlanetScale "Postgres and MySQL Indexes Are Completely Different" (28x). Round 2: tag in mono instead of a script caption, no cut hand.',
    title='Postgres Foreign Key Index: Why Your Joins Got Slow',
    titles=['Postgres Foreign Key Index: Why Your Joins Got Slow', '2 Database Index Mistakes (and a Postgres Gotcha)', "Added an Index and It's Still Slow? Check This First"],
    text={'a': "Postgres doesn't", 'b': '<span class="markr">index this</span>', 'n': 'NO INDEX'},
    images={'scene': SCENE('148.0')},
    vars=V('148.0', 270, 340, 340, '.25'),
    style='.w{position:absolute;left:540px;z-index:3;color:var(--fg)} .w.a{top:34px;font-size:84px} .w.b{top:132px;font-size:104px}'
          '.t1{position:absolute;left:550px;top:310px;width:320px;z-index:3;--cols:1fr;font-size:27px} .t2{position:absolute;left:950px;top:310px;width:290px;z-index:3;--cols:1fr;font-size:27px}'
          '.tbl .r>span{padding:10px 16px} .ring{position:absolute;left:536px;top:410px;width:350px;height:68px;border:6px solid var(--red);border-radius:40px;z-index:4;transform:rotate(-2deg)}'
          '.join{position:absolute;left:870px;top:432px;z-index:2} .n{position:absolute;left:748px;top:428px;font-size:26px;color:#fff;background:var(--red);padding:2px 12px;border-radius:5px;z-index:5;font-weight:600}',
    body=PH + H('a', 'b') +
         '<div class="tbl t1" data-move="orders"><div class="r h"><span>orders</span></div><div class="r"><span>id</span></div><div class="r"><span>customer_id</span></div><div class="r"><span>total</span></div><div class="r"><span>created_at</span></div></div>'
         '<div class="tbl t2" data-move="customers"><div class="r h"><span>customers</span></div><div class="r"><span>id</span></div><div class="r"><span>name</span></div><div class="r"><span>email</span></div></div>'
         '<svg class="join" width="80" height="60" viewBox="0 0 80 60"><path d="M0 10 H40 V48 H80" fill="none" stroke="#FFC53D" stroke-width="5"/></svg>'
         '<div class="ring" data-move="ring"></div><div class="n mono" data-k="n"></div>')

# ============ 14 When to add an index (T16) ============
D['14-when-to-index'] = dict(
    concept='T16', thumbnail_text='When to add an index', frame='10:51.8 (sceptical, hand raised, mouth closed)',
    direction='A clipboard checklist beside her (viral sample 2, the DONE clipboard): WHERE, JOIN, ORDER BY ticked in ink, "every column" struck out in red. Round 2: hand-drawn ink ticks (no icon circles), "every column" 38 px, closed-mouth frame.',
    title='Why Indexing Every Column Makes Your Database Slower',
    titles=['Why Indexing Every Column Makes Your Database Slower', "Don't Add a Database Index Before You Run EXPLAIN", 'What Is a Database Index? (And Why Your App Needs One)'],
    text={'a': 'When to add', 'b': 'an <span class="mark">index</span>', 'i1': 'WHERE', 'i2': 'JOIN', 'i3': 'ORDER BY', 'i4': 'every column'},
    images={'scene': SCENE('651.8')},
    vars=V('651.8', 980, 380, 360, '.2'),
    style='.w{position:absolute;left:48px;z-index:3;color:var(--fg);font-size:104px} .w.a{top:30px} .w.b{top:152px}'
          '.cb{position:absolute;left:70px;top:290px;width:450px;height:470px;background:#B98A55;border-radius:16px;z-index:3;transform:rotate(-3deg);box-shadow:0 18px 40px rgba(0,0,0,.5)}'
          '.cb .clip{position:absolute;left:155px;top:-18px;width:140px;height:44px;background:#9aa0a8;border-radius:8px;border:3px solid #6b7078}'
          '.cb .sh{position:absolute;left:22px;top:36px;right:22px;bottom:-60px;background:#FFFDF6;padding:26px 26px}'
          '.it{display:flex;align-items:center;gap:16px;font-family:"Plex Mono";font-weight:600;font-size:42px;color:#0E1013;margin-bottom:16px;white-space:nowrap} .it svg{flex:none}'
          '.it.no span{color:var(--red);font-size:38px;text-decoration:line-through;text-decoration-thickness:4px}',
    body=PH + H('a', 'b') + '<div class="cb" data-move="clipboard"><div class="sh">'
         + ''.join(f'<div class="it"><svg width="50" height="44" viewBox="0 0 50 44"><path d="M4 24 L18 38 L46 6" fill="none" stroke="#0E1013" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/></svg><span data-k="i{i}"></span></div>' for i in (1, 2, 3))
         + '<div class="it no"><svg width="50" height="44" viewBox="0 0 50 44"><path d="M8 6 L42 38 M42 6 L8 38" stroke="#F23D2E" stroke-width="7" stroke-linecap="round"/></svg><span data-k="i4"></span></div></div><div class="clip"></div></div>')

# ============ 15 Slow Laravel app? (T18) ============
D['15-laravel-index'] = dict(
    concept='T18', thumbnail_text='Slow Laravel app?', frame='8:53.6 (finger at temple, mouth closed)',
    direction='For Laravel developers (she uses Laravel; "laravel database indexing" is a search phrase): only the one migration line that adds the index, 46 px in the film\'s terminal panel; her thinking on the right. Round 2: one line instead of three, closed-mouth frame.',
    title='Laravel Database Indexing: Fix Slow Queries in One Line',
    titles=['Laravel Database Indexing: Fix Slow Queries in One Line', 'Database Indexing for Beginners: Fix Slow SQL Queries'],
    text={'a': '<span class="markr">Slow</span>', 'b': 'Laravel app?', 'c2': "<span class=\"good\">$table->index('author_id');</span>", 'fn': 'in your migration'},
    images={'scene': SCENE('533.6')},
    vars=V('533.6', 990, 380, 370, '.22'),
    style='.w{position:absolute;left:48px;z-index:3;color:var(--fg)} .w.a{top:40px;font-size:140px} .w.b{top:196px;font-size:104px}'
          '.term{left:40px;top:370px;width:700px;z-index:3;padding:30px 28px 30px} .term .ln{font-size:40px} .fn{font-size:24px;color:#9AA0AA;margin-top:14px}',
    body=PH + H('a', 'b') + '<div class="term" data-move="code"><div class="ln" data-k="c2"></div><div class="fn mono" data-k="fn"></div></div>')

# ============ 16 Why your index gets ignored (T20) ============
D['16-like-wildcard'] = dict(
    concept='T20', thumbnail_text='Why your index gets ignored', frame='0:38.6 (hands open: why?, mouth closed)',
    direction='One huge line of real SQL, WHERE title LIKE \'%fall%\', the first % ringed red (a leading wildcard, so a normal B-tree index cannot help). Her hands open, "why?". Round 2: the code sits below her face (round 1 covered her eyes), ring centred on the %.',
    title='Database Index Mistakes (and How to Check with EXPLAIN)',
    titles=['Database Index Mistakes (and How to Check with EXPLAIN)', 'Why Your Database Ignores Your Index (2 Common Mistakes)', '2 Database Index Mistakes (and a Postgres Gotcha)'],
    text={'a': 'Why your index', 'b': 'gets <span class="markr">ignored</span>', 'c': "WHERE title LIKE '<span class=\"pc\">%</span>fall%'"},
    images={'scene': SCENE('38.6')},
    vars=V('38.6', 1000, 330, 330, '.25'),
    style='.w{position:absolute;left:48px;z-index:3;color:var(--fg);font-size:96px} .w.a{top:34px} .w.b{top:152px}'
          '.paper{left:40px;top:520px;transform:rotate(-1.5deg);z-index:3;padding:18px 34px;white-space:nowrap} .paper .ln{font-size:58px;font-weight:600}'
          '.pc{position:relative;display:inline-block} .pc:after{content:"";position:absolute;left:-12px;top:-6px;right:-12px;bottom:-4px;border:6px solid var(--red);border-radius:50%}',
    body=PH + H('a', 'b') + '<div class="paper" data-move="code"><div class="ln" data-k="c"></div></div>')

# ============ 17 1 new order = 7 writes (T22, faceless) ============
D['17-slower-writes'] = dict(
    concept='T22', thumbnail_text='1 new order = 7 writes', frame='none (faceless, Query Plan look)',
    direction='Faceless option in the film\'s look: one new order (yellow) lands in the orders table AND in each of its six indexes (her own example), every stack labelled. Round 2: "index" labels on each stack (round 1 was too abstract).',
    title='Why Indexing Every Column Makes Your Database Slower',
    titles=['Why Indexing Every Column Makes Your Database Slower', '6 Indexes, 7 Writes: The Hidden Cost of Database Indexes', "Don't Add a Database Index Before You Run EXPLAIN"],
    text={'a': '1 new order', 'b': '= <span class="mark">7 writes</span>', 't': 'table', 'i': 'index'},
    images={},
    vars={'--ground': '#0E1013', '--fg': '#ECEAE4', '--accent': '#FFC53D'},
    style='.w{position:absolute;left:60px;z-index:3;color:var(--fg);font-size:116px} .w.a{top:40px} .w.b{top:164px}'
          '.stk{position:absolute;bottom:96px;display:flex;flex-direction:column;gap:6px} .stk i{display:block;height:22px;border:2.5px solid #ECEAE4;border-radius:3px}'
          '.stk i.n{background:#FFC53D;border-color:#FFC53D} .main{left:60px;width:280px} .ix{width:118px}'
          '.cap{position:absolute;top:640px;font-size:28px;color:#9AA0AA;font-weight:600}',
    body='<div class="grid"></div>' + H('a', 'b', cls='hd') +
         '<div class="stk main" data-move="table"><i class="n"></i>' + '<i></i>' * 8 + '</div><div class="cap mono" style="left:60px" data-k="t"></div>'
         + ''.join(f'<div class="stk ix" style="left:{390 + k * 140}px" data-move="index{k + 1}"><i class="n"></i>' + '<i></i>' * (4 - k % 3) + f'</div><div class="cap mono" style="left:{390 + k * 140}px">index</div>' for k in range(6)))

# ============ 18 Same query: slow / fast (faceless) ============
D['18-seq-vs-index-scan'] = dict(
    concept='new (pairs S8, C2)', thumbnail_text='Same query. Slow / fast', frame='none (faceless, Query Plan look)',
    direction='Faceless, the film\'s A3 still made bold: the same query EXPLAINed before the index (Seq Scan, red) and after (Index Scan, yellow). Real PostgreSQL output (COSTS OFF). Round 2: not two equal cards any more: a red strike across the slow line, the fast result larger.',
    title='Seq Scan vs Index Scan: Is Your Query Using the Index?',
    titles=['Seq Scan vs Index Scan: Is Your Query Using the Index?', "Added an Index and It's Still Slow? Check This First"],
    text={'a': 'Same query.', 'r1': 'Seq Scan on orders', 'l1': 'before', 'l2': 'after CREATE INDEX', 'r2': 'Index Scan', 'r2b': 'using orders_customer_id_idx'},
    images={},
    vars={'--ground': '#0E1013', '--fg': '#ECEAE4', '--accent': '#FFC53D'},
    style='.w{position:absolute;left:60px;top:40px;font-size:116px;color:var(--fg);z-index:3}'
          '.l{position:absolute;left:64px;font-size:28px;color:#9AA0AA;font-weight:600} .l1{top:236px} .l2{top:396px}'
          '.r1{position:absolute;left:60px;top:276px;font-family:"Plex Mono";font-weight:600;font-size:64px;color:#ff7a6e;text-decoration:line-through;text-decoration-thickness:6px}'
          '.r2{position:absolute;left:60px;top:448px;font-family:"Plex Mono";font-weight:600;font-size:104px;line-height:1} .r2 span{background:#FFC53D;color:#0E1013;padding:0 16px}'
          '.r2b{position:absolute;left:64px;top:580px;font-size:34px;color:#ECEAE4}',
    body='<div class="grid"></div>' + H('a', cls='hd') + '<div class="l l1 mono" data-k="l1"></div><div class="r1" data-k="r1"></div>'
         '<div class="l l2 mono" data-k="l2"></div><div class="r2"><span data-k="r2"></span></div><div class="r2b mono" data-k="r2b"></div>')

# ============ 19 1,000,000 checks or ~20? (faceless) ============
D['19-million-vs-20'] = dict(
    concept='new (pairs S2, C1)', thumbnail_text='1,000,000 checks or ~20?', frame='none (faceless, Query Plan look)',
    direction='Faceless numbers in the film\'s look: up to 1,000,000 checks with no index against about 20 comparisons with one, bars drawn to scale (the 20 is a sliver, labelled). Wording per BRIEF ("about 20 comparisons", never "20 disk reads").',
    title='How Database Indexes Find 1 Row in a Million',
    titles=['How Database Indexes Find 1 Row in a Million', 'No Index? Your Database Reads Every Single Row', 'Database Indexes Explained: How Apps Search Fast'],
    text={'h': 'Find 1 row in a million', 'l1': 'NO INDEX', 'n1': '1,000,000', 'u1': 'checks', 'l2': 'WITH AN INDEX', 'n2': '~20', 'u2': 'comparisons'},
    images={},
    vars={'--ground': '#0E1013', '--fg': '#ECEAE4', '--accent': '#FFC53D'},
    style='.h{position:absolute;left:60px;top:40px;font-size:66px;color:var(--fg)}'
          '.lb{position:absolute;left:62px;font-size:28px;color:#9AA0AA;font-weight:600} .l1{top:166px} .l2{top:440px}'
          '.n{position:absolute;left:56px;font-family:Plex;font-weight:700;letter-spacing:-.04em;line-height:1} .n1{top:196px;font-size:150px;color:#ECEAE4} .n2{top:468px;font-size:150px;color:var(--accent)}'
          '.u{font-size:52px;font-weight:600;letter-spacing:-.02em;margin-left:14px} .n1 .u{color:#9AA0AA}'
          '.bar1{position:absolute;left:60px;top:372px;width:1160px;height:30px;background:#3a3f48} .bar2{position:absolute;left:640px;top:530px;width:6px;height:60px;background:var(--accent)}',
    body='<div class="grid"></div><div class="h hd" data-k="h"></div>'
         '<div class="lb l1 mono" data-k="l1"></div><div class="n n1" data-move="million"><span data-k="n1"></span><span class="u" data-k="u1"></span></div><div class="bar1"></div>'
         '<div class="lb l2 mono" data-k="l2"></div><div class="n n2" data-move="twenty"><span data-k="n2"></span><span class="u" data-k="u2"></span></div>')

# ============ 20 Collage: database indexes, explained ============
D['20-collage-explained'] = dict(
    concept='new (collage style she asked for, 2026-10-07)', thumbnail_text='database indexes, explained', frame='0:22.7 (calm, mouth closed)',
    direction='Collage over the creator (her collage samples "Time to lock in.", "Capsule wardrobe"): the full photo of her, three objects of the topic (the book index page, the index tree on a sticky note, a terminal line), one big lowercase serif line set off-centre over the dark chair, two tiny labels. Round 2: 3 props instead of 6, line moved left and lowercase (round 1 was centred like reading-stack).',
    title='Database Indexes: Why Your App Slows Down as It Grows',
    titles=['Database Indexes: Why Your App Slows Down as It Grows', 'What Is a Database Index? (And Why Your App Needs One)', 'Database Indexes Explained: How Apps Search Fast'],
    text={'a': 'database indexes,', 'b': 'explained', 's1': 'why apps get slow', 's3': 'when not to add one'},
    images={'scene': SCENE('22.7')},
    vars=V('22.7', 760, 300, 290, '.06'),
    style='.w{position:absolute;left:40px;z-index:4;color:#fff;text-shadow:0 3px 18px rgba(0,0,0,.6)} .w.a{top:452px;font-size:104px} .w.b{top:548px;font-size:118px;font-style:italic;color:#FFC53D}'
          '.s{position:absolute;z-index:4;font-family:"Instrument Serif";font-style:italic;font-size:38px;color:#fff;text-shadow:0 2px 10px rgba(0,0,0,.6)}'
          '.o{position:absolute;z-index:3;filter:drop-shadow(0 12px 22px rgba(0,0,0,.45))}'
          '.tl{left:960px;top:60px;background:#15181D;border:2px solid #2C313A;border-radius:10px;padding:14px 18px;font-family:"Plex Mono";font-size:26px;color:#ECEAE4;transform:rotate(5deg)} .tl b{background:#F23D2E;color:#fff;padding:0 8px;border-radius:4px}'
          '.st{left:1010px;top:250px;width:220px;height:180px;background:#FFE26A;transform:rotate(-5deg);padding:14px}'
          '.bk{left:70px;top:60px;width:240px;background:#FBF6EA;padding:16px 22px;transform:rotate(-6deg);font-family:"Instrument Serif";font-style:italic;color:#1b1b1b} .bk h5{font-size:38px;font-weight:400} .bk p{font-size:24px;line-height:1.45;border-bottom:1px dotted #bbb}'
          '.s1{left:330px;top:120px;transform:rotate(-4deg)} .s3{left:960px;top:640px;transform:rotate(-2deg)}',
    body=PH +
         '<div class="o tl" data-move="terminal"><b>Seq Scan</b> on orders</div>'
         '<div class="o st" data-move="tree-note"><svg width="192" height="152" viewBox="0 0 186 146"><g fill="none" stroke="#0E1013" stroke-width="3"><rect x="63" y="6" width="60" height="26"/><rect x="8" y="62" width="60" height="26"/><rect x="118" y="62" width="60" height="26"/><rect x="8" y="114" width="44" height="24"/><rect x="62" y="114" width="44" height="24"/><path d="M93 32L38 62M93 32L148 62M38 88L30 114M38 88L84 114"/></g><path d="M93 32L38 62L84 114" fill="none" stroke="#F23D2E" stroke-width="5"/></svg></div>'
         '<div class="o bk" data-move="book-index"><h5>Index</h5><p>Adeyemi … 112</p><p>B-tree … 34</p><p>Bob … 48</p><p>Okafor … 113</p></div>'
         '<div class="s s1" data-k="s1"></div><div class="s s3" data-k="s3"></div>'
         '<div class="w a serif" data-k="a"></div><div class="w b serif" data-k="b"></div>')

# ============ 21 REMAKE of viral sample 1 ============
cards = [(860, 380, 24, .72), (950, 430, -12, .8), (1060, 420, 34, .76), (1000, 500, -28, .86), (1130, 500, 10, .84), (1070, 580, -6, .94), (1170, 640, -34, 1)]
D['21-remake-sample1'] = dict(
    concept='REMAKE of viral sample 1', sample='1', thumbnail_text='DATABASE INDEXES', frame='4:00.5 (hand on head, mouth closed)',
    direction='REMAKE of viral sample 1 ("FINANCIAL LITERACY", Tina Huang, 1.9M): the topic in two huge white words behind her head, her hand at her head, the topic\'s object flying past her shoulder (money -> table-row cards). Round 2: closed-mouth frame, fewer, bigger cards, her lower so INDEXES reads.',
    title='Database Indexes: Why Your App Slows Down as It Grows',
    titles=['Database Indexes: Why Your App Slows Down as It Grows', 'Database Indexes Explained: How Apps Search Fast', 'What Is a Database Index? (And Why Your App Needs One)'],
    text={'a': 'DATABASE', 'b': 'INDEXES'}, images={'scene': SCENE('240.5'), 'front': CUT('240.5')},
    vars=dict(place('240.5', 640, 600, 290), **{k.replace('--p', '--f'): v for k, v in place('240.5', 640, 600, 290, cover=False).items()}, **{'--ground': '#0E1013', '--fg': '#FAFAF7', '--accent': '#FFC53D', '--dimo': '0'}),
    style='.wd{position:absolute;left:0;right:0;text-align:center;font-family:Montserrat;font-weight:800;color:var(--fg);text-transform:uppercase;line-height:1;white-space:nowrap;z-index:1}'
          '.wd.a{top:10px;font-size:196px;letter-spacing:-.01em} .wd.b{top:196px;font-size:196px;letter-spacing:.02em} .photo img{filter:blur(6px) brightness(.85) saturate(.9)} .front{z-index:2}'
          '.fly{position:absolute;inset:0;z-index:3} .fly div{position:absolute;width:150px;height:48px;background:#FFFDF6;border:3px solid #0E1013;border-radius:4px;font:600 19px "Plex Mono";color:#0E1013;display:flex;align-items:center;gap:8px;padding:0 10px;box-shadow:0 3px 6px rgba(0,0,0,.3)}'
          '.fly div i{width:24px;height:24px;background:#FFC53D;border:2px solid #0E1013;border-radius:3px}',
    body=PH + '<div class="wd a" data-k="a"></div><div class="wd b" data-k="b"></div><div class="front"><img data-img="front" alt=""></div>'
         '<div class="fly" data-move="rows">' + ''.join(f'<div style="left:{x - 75}px;top:{y - 24}px;transform:rotate({r}deg) scale({k})"><i></i>row {48210 + n}</div>' for n, (x, y, r, k) in enumerate(cards)) + '</div>')

# ============ 22 REMAKE of viral sample 5 ============
D['22-remake-sample5'] = dict(
    concept='REMAKE of viral sample 5', sample='5', thumbnail_text='how to fix a slow query', frame='0:22.7 (calm)',
    direction='REMAKE of viral sample 5 ("how to be consistent"): the how-to phrase small, the key words giant in red behind her head, her centred, two tall printouts of table rows either side (the books -> the rows). Round 2: real room not blurred, how-to line on a white band for contrast, printouts with visible rows.',
    title='SQL Indexes: Make Slow Queries Fast with One Line',
    titles=['SQL Indexes: Make Slow Queries Fast with One Line', 'Database Indexing for Beginners: Fix Slow SQL Queries'],
    text={'a': 'how to fix a', 'b': 'slow query'}, images={'scene': SCENE('22.7'), 'front': CUT('22.7')},
    vars=dict(place('22.7', 640, 540, 250), **{'--ground': '#EDE9E2', '--fg': '#E0201B', '--accent': '#E0201B', '--dimo': '0', '--pb': '1.12'}),
    style='.front{z-index:2}'
          '.a{position:absolute;left:50%;transform:translateX(-50%);top:18px;font-family:Plex;font-weight:600;font-size:56px;color:#1b1b1b;z-index:3;letter-spacing:-.02em;background:#fff;padding:0 18px;white-space:nowrap}'
          '.b{position:absolute;left:0;right:0;top:84px;text-align:center;font-family:Plex;font-weight:700;font-size:196px;color:var(--fg);letter-spacing:-.06em;line-height:1;z-index:1}'
          '.pr{position:absolute;bottom:-20px;width:250px;z-index:3;--cols:1fr 1fr;font-size:18px} .p1{left:30px;transform:rotate(-4deg)} .p2{right:30px;transform:rotate(4deg)}',
    body=PH + '<div class="a" data-k="a"></div><div class="b" data-k="b"></div><div class="front"><img data-img="front" alt=""></div>'
         '<div class="tbl pr p1" data-move="rows-left">' + ''.join(f'<div class="r{" hit" if n == 5 else ""}"><span>{469863 + n}</span><span>book</span></div>' for n in range(11)) + '</div>'
         '<div class="tbl pr p2" data-move="rows-right">' + ''.join(f'<div class="r"><span>{48210 + n}</span><span>order</span></div>' for n in range(11)) + '</div>')

# ============ 23 REMAKE of viral sample 3 ============
D['23-remake-sample3'] = dict(
    concept='REMAKE of viral sample 3', sample='3', thumbnail_text='How an index finds a row', frame='7:28.7 (pointing up at the words, mouth closed)',
    direction='REMAKE of viral sample 3 ("FITNESS SALES FRAMEWORK"): the topic in heavy black on a paper grid with a red underline, the framework as coloured boxes: the index search from her video drawn as a branching tree (dave -> left to alice, mia faded; alice -> right to bob -> his row); her on the right pointing at it. Example after Sergey Egorenkov\'s article. Round 2: a real branching tree (round 1 read as a linked list), closed-mouth frame.',
    title='How Database Indexes Find 1 Row in a Million',
    titles=['How Database Indexes Find 1 Row in a Million', 'What Is a Database Index? (And Why Your App Needs One)', 'Database Indexing for Beginners: Fix Slow SQL Queries'],
    text={'a': 'How an index', 'b': 'finds a row', 'k1': 'dave', 'k2': 'alice', 'k5': 'mia', 'k3': 'bob', 'k4': 'row 48,213'},
    images={'front': CUT('448.7')},
    vars=dict(place('448.7', 1020, 400, 320, cover=False), **{'--ground': '#FFFFFF', '--fg': '#111111', '--accent': '#E0201B'}),
    style='.grid{--gridc:rgba(0,0,0,.06);background-size:40px 40px} .front{z-index:2}'
          '.w{position:absolute;left:44px;z-index:3;font-family:Plex;font-weight:700;color:var(--fg);letter-spacing:-.04em;line-height:1} .w.a{top:26px;font-size:96px} .w.b{top:122px;font-size:96px}'
          '.ul{position:absolute;left:44px;top:226px;z-index:3}'
          '.bx{position:absolute;z-index:3;font-family:Caveat;font-weight:700;font-size:58px;color:#111;padding:2px 24px;border:3px solid #111;line-height:1.1}'
          '.b1{left:300px;top:270px;background:#FFE14D} .b2{left:110px;top:400px;background:#7FD3FF} .b5{left:480px;top:400px;background:#eee;color:#999;border-color:#aaa} .b3{left:270px;top:530px;background:#FFE14D} .b4{left:430px;top:620px;background:#6EE7A0;font-size:44px}',
    body='<div class="grid"></div><div class="front" data-move="her"><img data-img="front" alt=""></div>'
         '<div class="w a" data-k="a"></div><div class="w b" data-k="b"></div>'
         '<svg class="ul" width="520" height="30" viewBox="0 0 520 30"><path d="M6 20 C 150 6, 330 26, 514 10" stroke="#E0201B" stroke-width="8" fill="none" stroke-linecap="round"/></svg>'
         '<svg class="ar" style="position:absolute;left:0;top:0;z-index:3" width="1280" height="720" viewBox="0 0 1280 720"><g fill="none" stroke="#111" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">'
         '<path d="M330 340 L240 394"/><path d="M246 378 L238 396 258 398"/><path d="M230 470 L300 524"/><path d="M282 522 L302 526 298 506"/><path d="M380 600 L440 626"/><path d="M420 628 L442 628 434 608"/></g>'
         '<path d="M420 340 L510 394" stroke="#aaa" stroke-width="4" stroke-dasharray="8 8" fill="none"/></svg>'
         '<div class="bx b1" data-k="k1"></div><div class="bx b2" data-k="k2"></div><div class="bx b5" data-k="k5"></div><div class="bx b3" data-k="k3"></div><div class="bx b4" data-k="k4"></div>')

# ============ 24 NEW: the book index page as the hero object ============
D['24-index-page-hero'] = dict(
    concept='new (taste critic: "a printed book index page held in front of her as the hero object")', thumbnail_text='how a database index works', frame='3:09.1 (hands framing, mouth closed)',
    direction='Editorial, her Pinterest board: lowercase serif words woven into the photo, and the object everyone already knows, the index page at the back of a book, big between her hands, one entry highlighted with its page number. The line names the topic plainly.',
    title='What Is a Database Index? (And Why Your App Needs One)',
    titles=['What Is a Database Index? (And Why Your App Needs One)', 'Database Indexing for Beginners: Fix Slow SQL Queries', 'Database Indexes Explained: How Apps Search Fast'],
    text={'a': 'how a', 'b': 'database index', 'c': 'works', 'h': 'Index'},
    images={'scene': SCENE('189.1')},
    vars=V('189.1', 900, 280, 290, '.1'),
    style='.w{position:absolute;z-index:4;color:#fff;text-shadow:0 3px 16px rgba(0,0,0,.6)} .w.a{left:56px;top:60px;font-size:100px} .w.b{left:56px;top:150px;font-size:112px;font-style:italic;color:#FFC53D} .w.c{left:56px;top:262px;font-size:100px}'
          '.pg{position:absolute;left:690px;top:430px;width:400px;background:#FBF6EA;color:#1b1b1b;transform:rotate(-3deg);z-index:3;box-shadow:0 18px 40px rgba(0,0,0,.5);padding:20px 30px 30px;font-family:"Instrument Serif",serif}'
          '.pg h4{font-size:46px;font-weight:400;font-style:italic} .pg p{font-size:30px;line-height:1.4;display:flex;justify-content:space-between;border-bottom:1px dotted #bbb} .pg p.hit{background:#FFC53D}',
    body=PH + '<div class="pg" data-move="book-index"><h4 data-k="h"></h4><p><span>B-tree</span><span>34</span></p><p class="hit"><span>Bob</span><span>48</span></p><p><span>bookstore</span><span>12</span></p><p><span>hash</span><span>77</span></p><p><span>Okafor</span><span>113</span></p></div>'
         '<div class="w a serif" data-k="a"></div><div class="w b serif" data-k="b"></div><div class="w c serif" data-k="c"></div>')

# ============ 25 NEW: sticky notes on her wall, marker words ============
D['25-sticky-wall'] = dict(
    concept='new (taste critic: "handwritten marker on paper or sticky notes")', thumbnail_text='slow query? → add an index → check EXPLAIN', frame='8:53.6 (finger at temple, mouth closed)',
    direction='Text woven into the scene: three sticky notes on the empty wall of her room, written in marker, the fix as a 3-step path (slow query? -> add an index -> check EXPLAIN), one red arrow. Her thinking beside them. Close to her Pinterest board (handwritten words, real room), not used in any earlier project.',
    title="Added an Index and It's Still Slow? Check This First",
    titles=["Added an Index and It's Still Slow? Check This First", 'Database Indexing for Beginners: Fix Slow SQL Queries', "Don't Add a Database Index Before You Run EXPLAIN"],
    text={'n1': 'slow query?', 'n2': 'add an index', 'n3': 'check EXPLAIN'},
    images={'scene': SCENE('533.6')},
    vars=V('533.6', 900, 380, 360, '.08'),
    style='.sticky{z-index:3;font-family:Caveat;font-weight:700;font-size:74px;line-height:.95;width:300px;height:220px;display:flex;align-items:center;justify-content:center;text-align:center;padding:18px}'
          '.n1{left:50px;top:40px;transform:rotate(-4deg)} .n2{left:320px;top:250px;transform:rotate(3deg);background:#9EE6B4} .n3{left:60px;top:450px;transform:rotate(-2deg);background:#FFB59E}'
          '.arr{position:absolute;left:0;top:0;z-index:4}',
    body=PH + '<div class="sticky n1" data-move="note1" data-k="n1"></div><div class="sticky n2" data-move="note2" data-k="n2"></div><div class="sticky n3" data-move="note3" data-k="n3"></div>'
         '<svg class="arr" width="1280" height="720" viewBox="0 0 1280 720"><g fill="none" stroke="#E0201B" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"><path d="M300 210 C 340 230, 360 250, 370 262"/><path d="M350 262 L372 266 368 244"/><path d="M380 470 C 360 500, 350 510, 340 520"/><path d="M336 498 L338 522 360 516"/></g></svg>')

# ============ 26 NEW: split, without vs with an index ============
D['26-split-without-with'] = dict(
    concept='new (taste critic: "a before/after split")', thumbnail_text='without an index / with an index', frame='8:16.8 (pointing at the panel, mouth closed)',
    direction='A hard 50/50 split like "THE 9-5 COLLAPSE" / "JOBS ARE DEAD" on her board: left half a flat panel, the same lookup twice, without an index (1,000,000 rows read, red) and with one (1 row, yellow); right half her real photo pointing at it.',
    title='How Database Indexes Find 1 Row in a Million',
    titles=['How Database Indexes Find 1 Row in a Million', 'No Index? Your Database Reads Every Single Row', 'Database Indexes: Why Your App Slows Down as It Grows'],
    text={'l1': 'without an index', 'v1': '1,000,000 rows read', 'l2': 'with an index', 'v2': '1 row', 'q': "WHERE email = 'bob@email.com'"},
    images={'scene': SCENE('496.8')},
    vars=V('496.8', 920, 380, 380, '.1'),
    style='.pn{position:absolute;left:0;top:0;width:620px;height:720px;background:#0E1013;z-index:2}'
          '.q{position:absolute;left:44px;top:40px;font-size:28px;color:#9AA0AA;z-index:3;font-weight:600}'
          '.l{position:absolute;left:44px;font-family:Plex;font-weight:700;font-size:60px;letter-spacing:-.03em;color:#fff;z-index:3} .l1{top:120px} .l2{top:380px}'
          '.v{position:absolute;left:44px;font-family:Plex;font-weight:700;letter-spacing:-.04em;z-index:3;line-height:1} .v1{top:200px;font-size:58px;color:#ff7a6e} .v2{top:470px;font-size:150px} .v2 span{background:#FFC53D;color:#0E1013;padding:0 .12em}'
          '.rule{position:absolute;left:44px;top:350px;width:530px;height:3px;background:#2C313A;z-index:3}',
    body=PH + '<div class="pn" data-move="panel"></div><div class="q mono" data-k="q"></div><div class="l l1" data-k="l1"></div><div class="v v1" data-k="v1"></div><div class="rule"></div>'
         '<div class="l l2" data-k="l2"></div><div class="v v2"><span data-k="v2"></span></div>')


# =====================================================================================================================
# Round 3 (after gate round 2): technical must-fixes, cut-out halos, text off faces, more editorial variety.
# Each update() replaces only the fields it names.
# =====================================================================================================================
def R3(name, note, **kw):
    d = D[name]; d.update(kw); d['direction'] = d['direction'] + ' Round 3: ' + note

R3('01-slow-database', 'editorial lowercase serif instead of the sans + red box (taste: too close to the shared template).',
   thumbnail_text='why is my database so slow?',
   text={'a': 'why is my', 'b': 'database', 'c': 'so slow?'},
   style='.w{position:absolute;left:56px;z-index:3;color:#fff;text-shadow:0 3px 18px rgba(0,0,0,.6)} .w.a{top:150px;font-size:96px} .w.b{top:236px;font-size:150px;font-style:italic;color:#FFC53D} .w.c{top:384px;font-size:110px}',
   body=PH + H('a', 'b', 'c', cls='serif'))

R3('02-fast-then-slow', '"Fast" in white (one accent), 100,000 users (10,000 was not convincing), darker skeleton, a "database" cue on the slow phone.',
   text={'a': 'Fast…', 'b': 'then <span class="markr">slow?</span>', 'la': '10 users', 'lb': '100,000 users', 'db': 'waiting on the database…'},
   style=D['02-fast-then-slow']['style'].replace('.w.a{left:48px;color:#22C55E}', '.w.a{left:48px}').replace('.app.slow i,.app.slow b,.app.slow s{background:#e4e0d6}', '.app.slow i,.app.slow b,.app.slow s{background:#cfc9bc}')
         + '.dbw{position:absolute;right:92px;top:560px;z-index:4;font-family:"Plex Mono";font-weight:600;font-size:17px;color:#6b665c;transform:rotate(5deg);width:200px;text-align:center}',
   body=D['02-fast-then-slow']['body'] + '<div class="dbw" data-k="db"></div>')

R3('03-is-it-using-the-index', 'new frame (round 2\'s pout read sulky): raised-eyebrow look.',
   frame='10:51.8 (raised eyebrow, mouth closed)', images={'scene': SCENE('651.8')}, vars=V('651.8', 940, 360, 380, '.2'))

R3('04-lower-breaks-index', 'labelled PostgreSQL (MySQL 8 writes the index as ((LOWER(email)))).',
   text=dict(D['04-lower-breaks-index']['text'], pg='PostgreSQL'),
   style=D['04-lower-breaks-index']['style'] + '.pg{position:absolute;left:604px;top:650px;font-size:24px;color:#9AA0AA;z-index:3;font-weight:600}',
   body=D['04-lower-breaks-index']['body'] + '<div class="pg mono" data-k="pg"></div>')

R3('05-reads-every-row', 'her moved right so "every row" no longer touches her eye; "No index?" white; table header no longer clipped.',
   vars=V('496.8', 1090, 400, 340, '.22'),
   style=D['05-reads-every-row']['style'].replace('.w.a{top:30px;font-size:84px;color:#ff7a6e}', '.w.a{top:30px;font-size:84px}').replace('.tw{position:absolute;left:58px;top:12px;', '.tw{position:absolute;left:58px;top:34px;'))

R3('06-20-steps', 'the cut-out (chair fringe) replaced by the film\'s round corner cam with a yellow ring; "~20 comparisons" (a 3-level tree next to "20 steps" read as a contradiction).',
   thumbnail_text='1 row in a million, ~20 comparisons', frame='0:22.7 (calm, in the corner cam)',
   text={'a': '1 row in a million.', 'b': '<span class="mark">~20 comparisons.</span>'},
   images={'scene': SCENE('22.7')},
   vars={'--ground': '#0E1013', '--fg': '#ECEAE4', '--accent': '#FFC53D'},
   style='.w{position:absolute;left:52px;z-index:3;font-size:84px;color:var(--fg)} .w.a{top:40px} .w.b{top:136px}'
         '.tree{position:absolute;left:58px;top:262px;z-index:2} .cam{position:absolute;right:56px;bottom:56px;width:330px;height:330px;border-radius:50%;overflow:hidden;border:7px solid #FFC53D;z-index:3}'
         '.cam img{position:absolute;width:1040px;left:-345px;top:-110px}',
   body='<div class="grid"></div>' + f'<div class="tree" data-move="tree">{btree2(600)}</div>' + H('a', 'b', cls='hd')
        + '<div class="cam" data-move="cam"><img data-img="scene" alt=""></div>')

R3('07-index-like-a-book', 'the index entry and the row now match (index says 48, the row is row 48); new frame (the old one read as "shh").',
   frame='2:21.9 (both hands in, mouth closed)', images={'scene': SCENE('141.9')}, vars=V('141.9', 1000, 360, 330, '.2'),
   body=D['07-index-like-a-book']['body'].replace('<span>48,212</span>', '<span>47</span>').replace('<span>48,213</span>', '<span>48</span>').replace('<span>48,214</span>', '<span>49</span>').replace('<div class="r faded"><span>49</span><span>chidi@email.com</span></div>', ''))

R3('08-column-order', 'the cross now says "usually" (PostgreSQL 18 and MySQL 8 skip scan can sometimes help).',
   text=dict(D['08-column-order']['text'], q2="WHERE first_name = 'Ada' <span style=\"color:#9AA0AA\">(usually)</span>"))

R3('10-index-every-column', 'the note is plain words now.', text=dict(D['10-index-every-column']['text'], n='an index on every column'))

R3('12-one-line-of-sql', 'words name the result (cold read: "one line of SQL" did not say what it does).',
   thumbnail_text='Slow query? One line.', text=dict(D['12-one-line-of-sql']['text'], a='Slow query?', b='<span class="mark">One line.</span>'),
   style=D['12-one-line-of-sql']['style'].replace('font-size:132px} .w.a{top:30px} .w.b{top:160px}', 'font-size:112px} .w.a{top:34px} .w.b{top:160px}'))

R3('13-postgres-foreign-keys', 'NO INDEX tag moved outside the ring; her moved right off the edge.',
   vars=V('148.0', 320, 340, 340, '.25'),
   style=D['13-postgres-foreign-keys']['style'].replace('.n{position:absolute;left:748px;top:428px;', '.n{position:absolute;left:600px;top:486px;'))

R3('14-when-to-index', 'new frame ("this small" pinch); clipboard shortened.',
   frame='3:27.7 ("this small" pinch, mouth closed)', images={'scene': SCENE('207.7')}, vars=V('207.7', 980, 380, 360, '.2'),
   style=D['14-when-to-index']['style'].replace('.cb{position:absolute;left:70px;top:290px;width:450px;height:470px;', '.cb{position:absolute;left:70px;top:290px;width:450px;height:390px;').replace('bottom:-60px;background:#FFFDF6', 'bottom:22px;background:#FFFDF6'))

R3('15-laravel-index', 'code 44 px, caption removed.', text=dict(D['15-laravel-index']['text'], fn=''),
   style=D['15-laravel-index']['style'].replace('.term .ln{font-size:40px}', '.term .ln{font-size:44px}'))

R3('16-like-wildcard', 'code lifted 30 px.', style=D['16-like-wildcard']['style'].replace('.paper{left:40px;top:520px', '.paper{left:40px;top:490px'))

R3('20-collage-explained', '"when not to add one" moved up out of the duration-badge corner.',
   style=D['20-collage-explained']['style'].replace('.s3{left:960px;top:640px;', '.s3{left:960px;top:560px;'))

R3('21-remake-sample1', 'no separate blurred copy behind her (round 2 showed a ghost of her head); the room is the same frame, words behind her head.',
   vars=dict(place('240.5', 640, 600, 300), **{'--ground': '#0E1013', '--fg': '#FAFAF7', '--accent': '#FFC53D', '--dimo': '.15'}),
   style=D['21-remake-sample1']['style'].replace('.photo img{filter:blur(6px) brightness(.85) saturate(.9)}', ''))

R3('22-remake-sample5', 'words raised so "query" clears her headwrap; the how-to line is plain text with a shadow.',
   style=D['22-remake-sample5']['style'].replace('background:#fff;padding:0 18px;white-space:nowrap}', 'color:#fff;text-shadow:0 2px 12px rgba(0,0,0,.6);white-space:nowrap}').replace('.b{position:absolute;left:0;right:0;top:84px;', '.b{position:absolute;left:0;right:0;top:60px;'),
   vars=dict(place('22.7', 640, 580, 240), **{'--ground': '#EDE9E2', '--fg': '#E0201B', '--accent': '#E0201B', '--dimo': '0', '--pb': '1.12'}))

R3('23-remake-sample3', 'her photo in a clean frame instead of a cut-out (halo on white); one accent (yellow path, white boxes).',
   images={'scene': SCENE('448.7')}, vars={'--ground': '#FFFFFF', '--fg': '#111111', '--accent': '#E0201B'},
   style=D['23-remake-sample3']['style'].replace('.b2{left:110px;top:400px;background:#7FD3FF}', '.b2{left:110px;top:400px;background:#FFE14D}').replace('.b5{left:480px;top:400px;background:#eee;color:#999;border-color:#aaa}', '.b5{left:480px;top:400px;background:#fff;color:#999;border-color:#aaa}').replace('.b4{left:430px;top:620px;background:#6EE7A0;font-size:44px}', '.b4{left:430px;top:620px;background:#FFE14D;font-size:44px}')
         + '.fr{position:absolute;right:40px;top:130px;width:470px;height:560px;overflow:hidden;border:10px solid #fff;box-shadow:0 0 0 3px #111;z-index:2;transform:rotate(2deg)} .fr img{position:absolute;width:1500px;left:-470px;top:-160px}',
   body=D['23-remake-sample3']['body'].replace('<div class="front" data-move="her"><img data-img="front" alt=""></div>', '<div class="fr" data-move="her"><img data-img="scene" alt=""></div>'))

R3('24-index-page-hero', 'card lowered 20 px so her fingers grip its top edge; 4 rows, nothing cut at the bottom.',
   style=D['24-index-page-hero']['style'].replace('.pg{position:absolute;left:690px;top:430px;', '.pg{position:absolute;left:690px;top:450px;'),
   body=D['24-index-page-hero']['body'].replace('<p><span>Okafor</span><span>113</span></p>', ''))

R3('25-sticky-wall', 'the steps in the right order (check with EXPLAIN before adding the index), thicker arrows, plain words.',
   thumbnail_text='slow query? → run EXPLAIN → add an index',
   text={'n1': 'slow query?', 'n2': 'run EXPLAIN', 'n3': 'add an index'},
   titles=["Don't Add a Database Index Before You Run EXPLAIN", "Added an Index and It's Still Slow? Check This First", 'Database Indexing for Beginners: Fix Slow SQL Queries'],
   title="Don't Add a Database Index Before You Run EXPLAIN",
   body=D['25-sticky-wall']['body'].replace('stroke-width="7"', 'stroke-width="9"'))

R3('26-split-without-with', 'one accent (the million line grey), no tiny query line, wider frame.',
   text=dict(D['26-split-without-with']['text'], q=''),
   style=D['26-split-without-with']['style'].replace('.v1{top:200px;font-size:58px;color:#ff7a6e}', '.v1{top:200px;font-size:58px;color:#9AA0AA}'),
   vars=V('496.8', 960, 380, 330, '.1'))
D['08-column-order']['style'] = D['08-column-order']['style'].replace('.qq .mk{position:relative;', '.qq .mk{flex:none;position:relative;')
D['13-postgres-foreign-keys']['style'] = D['13-postgres-foreign-keys']['style'].replace('.n{position:absolute;left:600px;top:486px;', '.n{position:absolute;left:730px;top:372px;')
D['08-column-order']['style'] = D['08-column-order']['style'].replace('.qq{font-size:31px;', '.qq{font-size:27px;')


# =====================================================================================================================
# Round 4 (coordinator + taste critic r2: "about half share one layout"): six directions get a different composition.
# =====================================================================================================================
def R4(name, note, **kw):
    d = D[name]; d.update(kw); d['direction'] = d['direction'] + ' Round 4 (composition): ' + note

R4('03-is-it-using-the-index', 'centred: question across the top, her centred, the EXPLAIN result as a full-width bar across her chest.',
   text={'a': 'Is it using the <span class="mark">index?</span>', 'q1': 'EXPLAIN SELECT * FROM orders WHERE customer_id = 42;', 'r1': 'Seq Scan on orders'},
   vars=V('651.8', 640, 330, 330, '.18'),
   style='.w{position:absolute;left:0;right:0;text-align:center;z-index:3;color:var(--fg)} .w.a{top:22px;font-size:86px}'
         '.term{left:70px;right:70px;top:520px;z-index:3;padding:22px 34px 24px} .q{font-size:24px;color:#B8BCC4;white-space:nowrap} .res{font-size:60px;margin-top:10px} .res .bad{padding:2px 16px}',
   body=PH + H('a') + '<div class="term" data-move="terminal"><div class="ln q" data-k="q1"></div><div class="ln res"><span class="bad" data-k="r1"></span></div></div>')

R4('09-which-index', 'her centred with the three notes stuck round her, the question in lowercase serif along the bottom.',
   thumbnail_text='which index type?', text={'a': 'which <i style="color:#FFC53D">index type?</i>', 's1': 'B-tree', 's2': 'Hash', 's3': 'Full-text', 'd1': 'ranges, sorting', 'd2': 'exact match', 'd3': 'words in text'},
   vars=V('194.4', 640, 300, 300, '.18'),
   style='.w{position:absolute;left:44px;z-index:3;color:#fff;text-shadow:0 3px 16px rgba(0,0,0,.6)} .w.a{top:560px;font-size:118px}'
         '.sticky{width:240px;height:180px;z-index:3;font-family:Caveat;font-weight:700;font-size:70px;line-height:1} .sticky small{display:block;font-family:"Plex Mono";font-weight:600;font-size:24px;margin-top:10px}'
         '.s1{left:44px;top:50px;transform:rotate(-6deg)} .s2{right:44px;top:60px;transform:rotate(5deg);background:#9EE6B4} .s3{right:70px;top:300px;transform:rotate(-3deg);background:#FFB59E;width:260px}',
   body=PH + H('a', cls='serif') + ''.join(f'<div class="sticky s{i}" data-move="note{i}"><span data-k="s{i}"></span><small data-k="d{i}"></small></div>' for i in (1, 2, 3)))

R4('10-index-every-column', 'split headline around her centred head (like the "Fast… then slow?" split), the table as a full-width strip at the bottom.',
   text={'a': 'Index', 'b': '<span class="mark">every</span>', 'c': 'column?', 'n': ''},
   vars=V('148.0', 640, 300, 300, '.2'),
   style='.w{position:absolute;z-index:3;color:var(--fg)} .w.a{left:48px;top:60px;font-size:130px} .w.b{right:48px;top:40px;font-size:120px} .w.c{right:48px;top:170px;font-size:120px}'
         '.tb{position:absolute;left:90px;width:1100px;top:470px;z-index:3;--cols:repeat(5,1fr);font-size:25px;transform:rotate(-1.5deg)} .tb .r>span{padding:10px 16px} .tb .h{background:#FFC53D;color:#0E1013}',
   body=PH + H('a', 'b', 'c') + D['10-index-every-column']['body'].split(H('a', 'b'))[1].replace('<div class="n mono" data-k="n"></div>', ''))

R4('12-one-line-of-sql', 'centred: one-line headline across the top, the SQL card held across the middle of the frame.',
   text={'a': 'Slow query? <span class="mark">One line.</span>', 'c1': '<span class="hl">CREATE INDEX</span> idx_author', 'c2': 'ON books (author_id);'},
   vars=V('448.7', 640, 290, 290, '.16'),
   style='.w{position:absolute;left:0;right:0;text-align:center;z-index:3;color:var(--fg)} .w.a{top:22px;font-size:84px}'
         '.paper{left:50%;top:440px;transform:translateX(-50%) rotate(-2deg);z-index:3;padding:26px 40px} .paper .ln{font-size:48px;font-weight:600;line-height:1.3;white-space:nowrap}',
   body=PH + H('a') + '<div class="paper" data-move="card"><div class="ln" data-k="c1"></div><div class="ln" data-k="c2"></div></div>')

R4('14-when-to-index', 'mirrored: her on the left, the headline and clipboard on the right.',
   vars=V('207.7', 330, 380, 360, '.2'),
   style=D['14-when-to-index']['style'].replace('.w{position:absolute;left:48px;', '.w{position:absolute;right:48px;text-align:right;').replace('.cb{position:absolute;left:70px;top:290px;', '.cb{position:absolute;left:770px;top:296px;').replace('transform:rotate(-3deg);box-shadow', 'transform:rotate(3deg);box-shadow'))

R4('15-laravel-index', 'words behind her head (her board\'s "big word behind the head"), the migration line as a bar across the bottom.',
   text={'a': '<span class="markr">Slow</span>', 'b': 'Laravel app?', 'c2': "<span class=\"good\">$table->index('author_id');</span>"},
   images={'scene': SCENE('533.6'), 'front': CUT('533.6')},
   vars=V('533.6', 640, 430, 320, '.2'),
   style='.w{position:absolute;color:var(--fg)} .w.a{left:56px;top:34px;font-size:96px;z-index:3} .w.b{left:0;right:0;text-align:center;top:104px;font-size:176px;z-index:1}'
         '.front{z-index:2} .term{left:50%;transform:translateX(-50%);top:572px;z-index:3;padding:20px 30px} .term .ln{font-size:48px}',
   body=PH + '<div class="w b hd sh2" data-k="b"></div><div class="front"><img data-img="front" alt=""></div><div class="w a hd sh2" data-k="a"></div>'
        '<div class="term" data-move="code"><div class="ln" data-k="c2"></div></div>')
D['15-laravel-index']['vars'] = V('533.6', 640, 510, 280, '.2')
D['15-laravel-index']['style'] = D['15-laravel-index']['style'].replace('.w.b{left:0;right:0;text-align:center;top:104px;font-size:176px;z-index:1}', '.w.b{left:0;right:0;text-align:center;top:96px;font-size:156px;z-index:1}')

# ---------- Round 4 fixes from the round-3 gate ----------
D['13-postgres-foreign-keys']['style'] = D['13-postgres-foreign-keys']['style'].replace('.n{position:absolute;left:730px;top:372px;font-size:26px;', '.n{position:absolute;left:762px;top:426px;font-size:21px;')
D['07-index-like-a-book']['body'] = D['07-index-like-a-book']['body'].replace('<p><span>Adeyemi</span><span>112</span></p>', '').replace('<p><span>Okafor</span><span>113</span></p>', '')
D['07-index-like-a-book']['style'] = D['07-index-like-a-book']['style'].replace('.pg p{font-size:32px;', '.pg p{font-size:40px;').replace('.w{position:absolute;left:46px;z-index:4;color:var(--fg);font-size:92px} .w.a{top:34px} .w.b{top:132px}', '.w{position:absolute;left:46px;z-index:4;color:var(--fg)} .w.a{top:34px;font-size:92px} .w.b{top:130px;font-size:120px}').replace('.pg{position:absolute;left:64px;top:262px;', '.pg{position:absolute;left:64px;top:300px;').replace('.arr{position:absolute;left:410px;top:420px;', '.arr{position:absolute;left:420px;top:400px;')
D['05-reads-every-row']['vars'] = V('496.8', 1030, 420, 320, '.22')
D['05-reads-every-row']['style'] = D['05-reads-every-row']['style'].replace('.w.b{top:120px;font-size:110px} .w.c{top:236px;font-size:110px}', '.w.b{top:120px;font-size:100px} .w.c{top:230px;font-size:96px}')
D['20-collage-explained']['style'] = D['20-collage-explained']['style'].replace('.tl{left:960px;top:60px;', '.tl{left:900px;top:60px;')
D['02-fast-then-slow']['style'] = D['02-fast-then-slow']['style'].replace('font-size:17px;color:#6b665c', 'font-size:22px;color:#4a463f')
D['07-index-like-a-book']['style'] = D['07-index-like-a-book']['style'].replace('.arr{position:absolute;left:420px;top:400px;', '.arr{position:absolute;left:420px;top:440px;')
D['15-laravel-index']['style'] = D['15-laravel-index']['style'].replace('.w.a{left:56px;top:34px;font-size:96px;z-index:3}', '.w.a{left:56px;top:18px;font-size:76px;z-index:3}').replace('top:96px;font-size:156px;z-index:1}', 'top:118px;font-size:150px;z-index:1}')
D['07-index-like-a-book']['style'] = D['07-index-like-a-book']['style'].replace('.tb{position:absolute;left:470px;top:540px;', '.tb{position:absolute;left:520px;top:548px;')

# ---------- Round 5 fixes from the round-4 gate ----------
D['13-postgres-foreign-keys']['style'] = D['13-postgres-foreign-keys']['style'].replace('.join{position:absolute;left:870px;top:432px;z-index:2}', '.join{position:absolute;left:870px;top:360px;z-index:2}')
D['13-postgres-foreign-keys']['body'] = D['13-postgres-foreign-keys']['body'].replace('<svg class="join" width="80" height="60" viewBox="0 0 80 60"><path d="M0 10 H40 V48 H80"', '<svg class="join" width="80" height="100" viewBox="0 0 80 100"><path d="M0 84 H40 V40 H80"')
D['07-index-like-a-book']['body'] = D['07-index-like-a-book']['body'].replace('<p><span>B-tree</span><span>34</span></p>', '<p><span>Ada</span><span>47</span></p>')
D['07-index-like-a-book']['style'] = D['07-index-like-a-book']['style'].replace('.tb{position:absolute;left:520px;top:548px;', '.tb{position:absolute;left:560px;top:560px;')
D['02-fast-then-slow']['style'] = D['02-fast-then-slow']['style'].replace('.dbw{position:absolute;right:92px;top:560px;', '.dbw{position:absolute;right:92px;top:520px;')
D['26-split-without-with']['style'] = D['26-split-without-with']['style'].replace('.l1{top:120px} .l2{top:380px}', '.l1{top:120px} .l2{top:360px}')
D['07-index-like-a-book']['body'] = D['07-index-like-a-book']['body'].replace('<p><span>bookstore</span><span>12</span></p><p><span>hash</span><span>77</span></p>', '<p><span>Chidi</span><span>49</span></p><p><span>Emeka</span><span>50</span></p>')
