/* database-indexes: the FULL talking-head edit (her whole video, tightened), in the film's look ("A · Query Plan").
 * Layout menu L1-L13 (studio/runtime/layouts.js, inspiration/know-how/MOTION-REFERENCES.md): something changes every
 * 3-6 s, the same layout never twice in a row, >= 4 layouts a minute. Film inserts are the motion film, synced by her words.
 * Her footage is only cropped and scaled: never flipped, never retouched. Same cuts as the film (film/data/cutlist.json). */
'use strict';
function buildMoment() {
  const k = PS({
    a1: 'as you get more users', a2: 'now it might take a little bit longer', a3: 'one thing that you can always use',
    a4: 'in this video', a5: 'what an index actually is', a6: 'the different types of indexes', a7: 'the mistakes that people make',
    b1: 'to understand why a database index matters', b2: 'say we have a bookstore', b3: 'we run this query',
    b4: 'without an index the database has no idea', b5: 'it starts at the first row', b6: 'full table scan',
    b7: 'and in many cases', b8: 'when your table has maybe 10', b9: 'but at a million rows',
    c1: 'what is a database index', c2: 'the easiest way to think about it', c3: 'if you want to find every page',
    c4: 'you go to the index at the back', c5: 'a database index works the same way', c6: "it's a separate structure",
    c7: 'and for each value it keeps a pointer', c8: 'and it only stores the column and the pointer',
    d1: 'now what mechanism does a database index use', d2: 'i read an article on this', d3: 'i will link the article',
    d4: 'say you have an index on the email column', d5: 'the database opens the index in the middle', d6: 'bob comes before dave',
    d7: 'now it sees alice@email.com', d8: 'bob comes after alice', d9: 'and it keeps moving strategically',
    d10: "bob's entry in the index", d11: 'so with this strategy', d12: 'in about 20 steps or so',
    d13: 'without an index you will do up to a million checks', d14: 'most databases store their indexes',
    d15: 'so even with a table with millions of rows', d16: 'you usually only need a few levels',
    e1: 'adding a database index will literally', e2: "it's kind of a one-liner", e3: 'in sql it looks something like this',
    e4: 'if you are using laravel', e5: 'now when you search books by author',
    f1: "once you've added your database index", f2: 'you can ask the database', f3: 'just put the word explain',
    f4: 'in postgresql you will see', f5: 'it means that the database is reading every single row', f6: 'and if you see',
    f7: 'seq scan sequential scan', f8: 'in mysql the results will come back', f9: 'if it says all',
    f10: 'if it says something like', f11: 'so if your query is slow', f12: 'is this query doing a full scan',
    g1: 'there are a few types of database index', g2: 'you hear people talk about', g3: "i'm just only going to focus on three",
    g4: 'the first one is b-tree', g5: 'the b-tree is the default one', g6: "so it's very common",
    g7: 'it can find exact matches', g8: 'it can find ranges', g9: 'it can sort', g10: 'and it can find values by how they start',
    g11: 'and that works because the index is sorted',
    h1: 'the second commonly used type', h2: 'it makes sure that no two rows', h3: 'for example no two user can sign up',
    h4: 'your primary key already has one', h5: 'and the third one', h6: 'this one kind of always confuses me',
    h7: 'the third one is the composite index', h8: 'so say you index last name and first name',
    h9: 'it helps you when you search by last name', h10: 'but when you search by only first name',
    i1: 'a little bit of a reason', i2: 'think of a phone book sorted by surname', i3: 'all the adeyemis are together',
    i4: 'and inside each surname', i5: 'so in the okafors', i6: "so if i'm looking for ada okafor", i7: "i go to the o's",
    i8: 'but what if i want everyone', i9: "there's probably ada adeyemi", i10: 'they are spread across the whole phone book',
    i11: 'so nothing groups the adas together', i12: "so that's exactly what happens", i13: 'so the tip is to put the column',
    j1: 'and for the rest', j2: 'we have the hash index', j3: "like looking up someone's login session", j4: 'it cannot do range or sorting',
    j5: 'a bitmap is for columns', j6: 'you mostly see it in databases', j7: 'and then we have spatial index',
    j8: 'or when a ride app looks for drivers', j9: "so it's groups places", j10: 'instead of every coffee shop',
    j11: 'and then we have the full-text index', j12: 'for example when you search an online store', j13: 'so it works by indexing each word',
    j14: "and there's also covering index",
    k1: 'you also hear about clustered', k2: 'the clustered index decides the order', k3: 'think of this as a phone book again',
    k4: 'so once you find the name', k5: 'a table can only have one clustered index', k6: 'a non-clustered index is a separate structure',
    k7: 'as the index at the back of the book', k8: 'so a table can have lots', k9: 'so this is the difference',
    l1: 'so now that begs the question', l2: "why don't we just index every column", l3: 'we cannot', l4: 'every time you insert',
    l5: 'so if your orders table has six indexes', l6: 'so the more database indexes you have', l7: 'indexes also take up storage space',
    l8: 'and for a small table', l9: "it's faster to read them", l10: 'so what you do is that you only index', l11: "you don't index everything",
    l12: 'but because as good as it is',
    m1: 'and there are several mistakes', m2: 'you can have a database index', m3: 'and these are the common mistakes',
    m4: 'the first one is wrapping your column', m5: 'a normal index on email is sorted', m6: 'the lowercase versions are not in that index',
    m7: "so the database can't use it here", m8: 'adding a wildcard', m9: 'the index is sorted by how each value starts',
    m10: "and if you don't know how it starts",
    n1: 'another database index gotcha', n2: 'the database creates an index on that column', n3: "in postgresql it doesn't",
    n4: "so if you're on postgres", n5: 'you have to check and confirm', n6: "and it's one of the common reasons",
    o1: 'so again to reiterate', o2: 'use it when a column keeps showing up', o2b: 'or your order by', o3: 'so say you are sorting a million orders',
    o4: "if there's no index", o5: 'but with an index', o6: 'also when you use explain', o7: 'so if your query is slow you probably',
    o8: "and if it's doing a full scan", o9: 'also when a table gets more read', o10: "but you shouldn't do that",
    o11: 'table is constantly written to', o12: "so that's it with database indexes", o13: 'bye',
  });
  // each layout runs from its phrase until the next layout's phrase (no plain gaps); L8 keywords are overlays on their own phrase
  const ORDER = [];
  const L_ = (lay, a, b, fn) => ORDER.push({ lay, a, b, fn });
  /* 0:00 open */
  L_('shout', k.a1, null, (sp, U) => TH.shout(sp, ['Your database', '*grows.*'], Object.assign({}, U)));  // L3
  L_('half', k.a2, null, (sp, U) => TH.half(sp, Object.assign({ film: { fit: 'safe' }, size: V(960, 1150), side: V('left', 'top') }, U)));  // L5 the table grows, the page crawls
  L_('card', k.a3, null, (sp, U) => TH.card(sp, ['A *database index.*'], Object.assign({}, U)));  // L10
  L_('stack', k.a4, k.a7, (sp, U) => TH.stack(sp, [{ s: 'Without an index', at: 'no' }, { s: 'What an index is', at: 'actually' }, { s: 'The types', at: 'types' }, { s: 'The mistakes', at: 'mistakes' }], U));  // L4
  /* 0:27 without an index */
  L_('talk', k.b1, null, (sp, U) => TH.talk(sp, Object.assign({ frame: 'mid', push: [1.0, 1.08], alt: true }, U)));  // L1
  L_('keyword', k.b1, null, (sp, U) => TH.keyword(sp, "why it ~matters~", U || {}));
  L_('cutaway', k.b2, k.b3, (sp, U) => TH.cutaway(sp, Object.assign({ film: {}, enter: 'push' }, U)));  // L9 the books table + the query
  L_('corner', k.b4, null, (sp, U) => TH.corner(sp, Object.assign({ film: {} }, U)));  // L11 no map of the 42s
  L_('half', k.b5, k.b6, (sp, U) => TH.half(sp, Object.assign({ film: { fit: 'safe' }, size: V(960, 1150), side: V('right', 'top') }, U)));  // L5 full table scan
  L_('talk', k.b7, null, (sp, U) => TH.talk(sp, Object.assign({ frame: 'close', punch: ['problematic'] }, U)));  // L1
  L_('keyword', k.b7, null, (sp, U) => TH.keyword(sp, 'very ~problematic~', U || {}));  // L8
  L_('cutaway', k.b8, k.b9, (sp, U) => TH.cutaway(sp, Object.assign({ film: {} }, U)));  // L9 100 rows vs a million
  /* 1:08 what is an index */
  L_('card', k.c1, null, (sp, U) => TH.card(sp, ['What is a *database index?*'], Object.assign({}, U)));  // L10
  L_('talk', k.c2, null, (sp, U) => TH.talk(sp, Object.assign({ frame: 'mid', alt: true }, U)));  // L1
  L_('half', k.c3, k.c4, (sp, U) => TH.half(sp, Object.assign({ film: { fit: 'safe' }, size: V(960, 1150), side: V('left', 'top') }, U)));  // L5 the index at the back of a book
  L_('behind', k.c5, null, (sp, U) => TH.behind(sp, ['same way'], Object.assign({}, U)));  // L2
  L_('cutaway', k.c6, k.c7, (sp, U) => TH.cutaway(sp, Object.assign({ film: {} }, U)));  // L9 copy the column, sort, pointers
  L_('corner', k.c8, null, (sp, U) => TH.corner(sp, Object.assign({ film: {} }, U)));  // L11 usually much smaller
  /* 1:43 how it finds one row fast */
  L_('shout', k.d1, null, (sp, U) => TH.shout(sp, ['How does it', 'find things *so fast?*'], Object.assign({}, U)));  // L3
  L_('talk', k.d2, k.d3, (sp, U) => TH.talk(sp, Object.assign({ frame: 'close', alt: true }, U)));  // L1 (the article: credited in the film's walk)
  L_('keyword', k.d2, null, (sp, U) => TH.keyword(sp, "from an ~article~", U || {}));
  L_('keyword', k.d3, null, (sp, U) => TH.keyword(sp, 'link in the ~description~', U || {}));  // L8
  L_('cutaway', k.d4, k.d6, (sp, U) => TH.cutaway(sp, Object.assign({ film: {}, enter: 'push' }, U)));  // L9 the B-tree walk starts
  L_('corner', k.d7, k.d8, (sp, U) => TH.corner(sp, Object.assign({ film: {} }, U)));  // L11 bob > alice
  L_('cutaway', k.d9, k.d10, (sp, U) => TH.cutaway(sp, Object.assign({ film: {} }, U)));  // L9 found, pointer to the row
  L_('half', k.d11, k.d12, (sp, U) => TH.half(sp, Object.assign({ film: { fit: 'safe' }, size: V(960, 1150), side: V('right', 'top') }, U)));  // L5 halving to about 20
  L_('talk', k.d13, null, (sp, U) => TH.talk(sp, Object.assign({ frame: 'mid', punch: ['million'] }, U)));  // L1
  L_('keyword', k.d13, null, (sp, U) => TH.keyword(sp, 'up to a ~million~ checks', U || {}));  // L8
  L_('behind', k.d14, null, (sp, U) => TH.behind(sp, ['B-tree'], Object.assign({}, U)));  // L2
  L_('half', k.d15, k.d16, (sp, U) => TH.half(sp, Object.assign({ film: { fit: 'safe' }, size: V(960, 1150), side: V('left', 'top') }, U)));  // L5 a few levels
  /* 2:48 add one */
  L_('talk', k.e1, null, (sp, U) => TH.talk(sp, Object.assign({ frame: 'close', alt: true }, U)));  // L1
  L_('keyword', k.e1, null, (sp, U) => TH.keyword(sp, "query ~optimisation~", U || {}));
  L_('card', k.e2, null, (sp, U) => TH.card(sp, ['A *one-liner*'], Object.assign({}, U)));  // L10
  L_('cutaway', k.e3, k.e4, (sp, U) => TH.cutaway(sp, Object.assign({ film: {} }, U)));  // L9 SQL + Laravel
  L_('corner', k.e5, null, (sp, U) => TH.corner(sp, Object.assign({ film: {} }, U)));  // L11 index first, then the rows
  /* 3:06 check it */
  L_('talk', k.f1, k.f2, (sp, U) => TH.talk(sp, Object.assign({ frame: 'mid', push: [1.0, 1.08], alt: true }, U)));  // L1
  L_('keyword', k.f1, null, (sp, U) => TH.keyword(sp, "is it ~used?~", U || {}));
  L_('keyword', k.f3, null, (sp, U) => TH.keyword(sp, 'put ~EXPLAIN~ in front', U || {}));  // L8
  L_('half', k.f4, k.f6, (sp, U) => TH.half(sp, Object.assign({ film: { fit: 'safe' }, size: V(960, 1150), side: V('left', 'top') }, U)));  // L5 Seq Scan / Index Scan
  L_('shout', k.f7, null, (sp, U) => TH.shout(sp, ['Seq Scan:', '*sequential*'], Object.assign({}, U)));  // L3
  L_('cutaway', k.f8, k.f10, (sp, U) => TH.cutaway(sp, Object.assign({ film: {} }, U)));  // L9 MySQL type column
  L_('stack', k.f11, k.f12, (sp, U) => TH.stack(sp, [{ s: 'Slow query?', at: 'slow' }, { s: 'Full scan?', at: 'full' }, { s: 'Using an index?', at: 'using' }], U));  // L4
  /* 3:48 types */
  L_('card', k.g1, null, (sp, U) => TH.card(sp, ['Types of *indexes*'], Object.assign({}, U)));  // L10
  L_('pops', k.g2, k.g3, (sp, U) => TH.pops(sp, ['B-tree', 'hash', 'bitmap', 'unique'], Object.assign({ focus: 0, focusAt: 'three' }, U)));  // L7
  L_('behind', k.g4, null, (sp, U) => TH.behind(sp, ['B-tree'], Object.assign({}, U)));  // L2
  L_('half', k.g5, k.g6, (sp, U) => TH.half(sp, Object.assign({ film: { fit: 'safe' }, size: V(960, 1150), side: V('right', 'top') }, U)));  // L5 the default
  L_('cutaway', k.g7, k.g10, (sp, U) => TH.cutaway(sp, Object.assign({ film: {} }, U)));  // L9 exact, range, sort, starts with
  L_('corner', k.g11, null, (sp, U) => TH.corner(sp, Object.assign({ film: {} }, U)));  // L11 Harry titles together
  L_('keyword', k.h1, null, (sp, U) => TH.keyword(sp, 'the ~unique~ index', U || {}));  // L8
  L_('half', k.h2, k.h4, (sp, U) => TH.half(sp, Object.assign({ film: { fit: 'safe' }, size: V(960, 1150), side: V('left', 'top') }, U)));  // L5 duplicate refused
  L_('talk', k.h5, k.h6, (sp, U) => TH.talk(sp, Object.assign({ frame: 'close', punch: ['confuses'] }, U)));  // L1
  L_('keyword', k.h6, null, (sp, U) => TH.keyword(sp, 'always ~confuses~ me', U || {}));  // L8
  L_('cutaway', k.h7, k.h10, (sp, U) => TH.cutaway(sp, Object.assign({ film: {}, enter: 'push' }, U)));  // L9 composite: helps / helps / usually not
  L_('talk', k.i1, null, (sp, U) => TH.talk(sp, Object.assign({ frame: 'mid', alt: true }, U)));  // L1
  L_('keyword', k.i1, null, (sp, U) => TH.keyword(sp, "a ~phone book~", U || {}));
  L_('half', k.i2, k.i5, (sp, U) => TH.half(sp, Object.assign({ film: { fit: 'safe' }, size: V(960, 1150), side: V('right', 'top') }, U)));  // L5 the phone book
  L_('corner', k.i6, k.i7, (sp, U) => TH.corner(sp, Object.assign({ film: {} }, U)));  // L11 Ada Okafor: easy
  L_('shout', k.i8, null, (sp, U) => TH.shout(sp, ['Everyone', 'called *Ada?*'], Object.assign({}, U)));  // L3
  L_('cutaway', k.i9, k.i11, (sp, U) => TH.cutaway(sp, Object.assign({ film: {} }, U)));  // L9 three pages, every page
  L_('half', k.i12, k.i13, (sp, U) => TH.half(sp, Object.assign({ film: { fit: 'safe' }, size: V(960, 1150), side: V('left', 'top') }, U)));  // L5 the tip
  /* 5:50 the rest */
  L_('talk', k.j1, null, (sp, U) => TH.talk(sp, Object.assign({ frame: 'mid', push: [1.0, 1.06], alt: true }, U)));  // L1
  L_('keyword', k.j1, null, (sp, U) => TH.keyword(sp, "the ~rest~", U || {}));
  L_('cutaway', k.j2, k.j4, (sp, U) => TH.cutaway(sp, Object.assign({ film: {} }, U)));  // L9 hash
  L_('corner', k.j5, k.j6, (sp, U) => TH.corner(sp, Object.assign({ film: {} }, U)));  // L11 bitmap
  L_('half', k.j7, k.j8, (sp, U) => TH.half(sp, Object.assign({ film: { fit: 'safe' }, size: V(960, 1150), side: V('right', 'top') }, U)));  // L5 spatial
  L_('keyword', k.j9, k.j10, (sp, U) => TH.keyword(sp, 'only places ~around you~', U || {}));  // L8
  L_('cutaway', k.j11, k.j13, (sp, U) => TH.cutaway(sp, Object.assign({ film: {} }, U)));  // L9 full-text
  L_('stack', k.j14, null, (sp, U) => TH.stack(sp, [{ s: 'Covering index', at: 'covering' }, { s: 'Partial index', at: 'partial' }], U));  // L4
  /* 6:54 clustered */
  L_('talk', k.k1, null, (sp, U) => TH.talk(sp, Object.assign({ frame: 'close', alt: true }, U)));  // L1
  L_('keyword', k.k1, null, (sp, U) => TH.keyword(sp, "~clustered~ or not", U || {}));
  L_('half', k.k2, k.k4, (sp, U) => TH.half(sp, Object.assign({ film: { fit: 'safe' }, size: V(960, 1150), side: V('left', 'top') }, U)));  // L5 rows sorted on disk
  L_('behind', k.k5, null, (sp, U) => TH.behind(sp, ['one'], Object.assign({}, U)));  // L2
  L_('cutaway', k.k6, k.k7, (sp, U) => TH.cutaway(sp, Object.assign({ film: {} }, U)));  // L9 non-clustered
  L_('corner', k.k8, k.k9, (sp, U) => TH.corner(sp, Object.assign({ film: {} }, U)));  // L11 lots of them
  /* 7:30 the cost */
  L_('talk', k.l1, null, (sp, U) => TH.talk(sp, Object.assign({ frame: 'mid', alt: true }, U)));  // L1
  // ("the ~question~" keyword removed: it ran into "index every column?" at 7:35)
  L_('keyword', k.l2, null, (sp, U) => TH.keyword(sp, 'index ~every~ column?', U || {}));  // L8
  L_('shout', k.l3, null, (sp, U) => TH.shout(sp, ['We *cannot.*'], Object.assign({}, U)));  // L3
  L_('half', k.l4, k.l5, (sp, U) => TH.half(sp, Object.assign({ film: { fit: 'safe' }, size: V(960, 1150), side: V('right', 'top') }, U)));  // L5 7 writes
  L_('cutaway', k.l6, k.l7, (sp, U) => TH.cutaway(sp, Object.assign({ film: {} }, U)));  // L9 slower writes, storage
  L_('talk', k.l8, null, (sp, U) => TH.talk(sp, Object.assign({ frame: 'close', alt: true }, U)));  // L1
  L_('keyword', k.l8, null, (sp, U) => TH.keyword(sp, "a ~small~ table", U || {}));
  L_('corner', k.l9, null, (sp, U) => TH.corner(sp, Object.assign({ film: {} }, U)));  // L11 10 rows
  L_('stack', k.l10, k.l11, (sp, U) => TH.stack(sp, [{ s: 'search', at: 'search' }, { s: 'filter', at: 'filter' }, { s: 'join', at: 'join' }, { s: 'sort', at: 'sort' }], U));  // L4
  L_('keyword', k.l12, null, (sp, U) => TH.keyword(sp, 'it can get ~costly~', U || {}));  // L8
  /* 8:22 mistakes */
  L_('card', k.m1, null, (sp, U) => TH.card(sp, ['Two *mistakes*'], Object.assign({}, U)));  // L10
  L_('talk', k.m2, k.m3, (sp, U) => TH.talk(sp, Object.assign({ frame: 'mid', punch: ["won't"] }, U)));  // L1
  L_('keyword', k.m2, null, (sp, U) => TH.keyword(sp, "still won't ~use it~", U || {}));
  L_('cutaway', k.m4, k.m5, (sp, U) => TH.cutaway(sp, Object.assign({ film: {} }, U)));  // L9 LOWER(email)
  L_('half', k.m6, k.m7, (sp, U) => TH.half(sp, Object.assign({ film: { fit: 'safe' }, size: V(960, 1150), side: V('left', 'top') }, U)));  // L5 not in the index
  TH.glitch(k.m7.w[3], { text: "CAN'T" });                                                     // L13 (once)
  L_('corner', k.m8, k.m10, (sp, U) => TH.corner(sp, Object.assign({ film: {} }, U)));  // L11 '%Fall%'
  /* 9:03 foreign keys */
  L_('talk', k.n1, null, (sp, U) => TH.talk(sp, Object.assign({ frame: 'close', alt: true }, U)));  // L1
  L_('keyword', k.n1, null, (sp, U) => TH.keyword(sp, "a ~gotcha~", U || {}));
  L_('half', k.n2, k.n3, (sp, U) => TH.half(sp, Object.assign({ film: { fit: 'safe' }, size: V(960, 1150), side: V('right', 'top') }, U)));  // L5 MySQL vs PostgreSQL
  L_('keyword', k.n4, null, (sp, U) => TH.keyword(sp, 'on ~Postgres?~', U || {}));  // L8
  L_('cutaway', k.n5, k.n6, (sp, U) => TH.cutaway(sp, Object.assign({ film: {} }, U)));  // L9 check, joins get slow
  /* 9:28 when to add one */
  L_('card', k.o1, null, (sp, U) => TH.card(sp, ['When to *add one*'], Object.assign({}, U)));  // L10
  L_('stack', k.o2, k.o2b, (sp, U) => TH.stack(sp, [{ s: 'WHERE', at: 'where' }, { s: 'JOIN', at: 'joins' }, { s: 'ORDER BY', at: 'order' }], U));  // L4
  L_('cutaway', k.o3, k.o5, (sp, U) => TH.cutaway(sp, Object.assign({ film: {} }, U)));  // L9 ORDER BY + LIMIT
  L_('half', k.o6, k.o8, (sp, U) => TH.half(sp, Object.assign({ film: { fit: 'safe' }, size: V(960, 1150), side: V('left', 'top') }, U)));  // L5 EXPLAIN says full scan
  L_('corner', k.o9, null, (sp, U) => TH.corner(sp, Object.assign({ film: {} }, U)));  // L11 read a lot
  L_('talk', k.o10, k.o11, (sp, U) => TH.talk(sp, Object.assign({ frame: 'mid', alt: true }, U)));  // L1
  L_('keyword', k.o10, null, (sp, U) => TH.keyword(sp, "a ~small~ table?", U || {}));
  L_('keyword', k.o11, null, (sp, U) => TH.keyword(sp, 'rarely ~searched~', U || {}));  // L8
  L_('card', k.o12, null, (sp, U) => TH.card(sp, ['Database *indexes*'], Object.assign({ riser: false }, U)));  // L10 the end, then bye on her
  const main = ORDER.filter(r => r.lay !== 'keyword');
  ORDER.forEach((r) => {
    // a keyword stays for its own phrase (+0.6 s), then her captions come back (her note 2026-10-15: long stretches without captions)
    if (r.lay === 'keyword') { const nx = main.find(m => m.a.t > r.a.t + 0.05), e = (r.b || r.a).e; return r.fn({ from: r.a, to: r.b || r.a }, { until: nx ? Math.max(e + 0.35, Math.min(e + 0.6, nx.a.t - 0.2)) : e + 0.6 }); }
    const i = main.indexOf(r), nx = main[i + 1];
    const until = nx ? nx.a.t - 0.12 : null;
    r.fn({ from: r.a, to: r.b || r.a }, until ? { until: Math.max(until, (r.b || r.a).e + 0.2) } : {});
  });
}
