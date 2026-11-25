/* doomscrolling MOTION FILM (her pick A · Offline Bingo): pure motion on her cleaned voice (film/tools/voice.py = the full
 * talking-head edit's cut). The same stretches of her recording as the talking-head plan (raw seconds) and the same
 * graphics (scenes/bingo.js), each full frame; where the edit shows her face, the film sets her words as type with the mini
 * bingo card (the 1-9 counter) in the corner. Every "Number N" opens the whole card and daubs square N (06 where she said
 * "number eight": that word is cut). Hard cuts on her words; the card screens slide in. 16:9 + 9:16 from the same code. */
'use strict';
/** raw recording second -> film time (null if that second was cut) and back */
const R2F = (r) => { for (const [a, b, s] of RAWSEG) if (r >= a - 1e-6 && r < b) return s + r - a + INTRO; return null; };
const F2R = (t) => { const u = t - INTRO; for (const [a, b, s] of RAWSEG) if (u >= s - 1e-6 && u < s + (b - a)) return a + u - s; return -1; };
/** her words between raw a and b as a phrase {t, e, w, ew, i} */
function X(a, b) { let i0 = -1, i1 = -1; for (let i = 0; i < WORDS.length; i++) { const r = F2R(WORDS[i].t + 0.01); if (r >= a - 0.05 && r < b) { if (i0 < 0) i0 = i; i1 = i; } else if (i0 >= 0 && r >= b) break; }
  if (i0 < 0) return null; const ws = WORDS.slice(i0, i1 + 1); return { t: ws[0].t, e: ws[ws.length - 1].e, w: ws.map(x => x.t), ew: ws.map(x => x.e), i: i0 }; }
const FR = () => V({ x: 0, y: 0, w: W, h: H }, { x: 0, y: SAFE.contentTop - 30, w: W, h: SAFE.contentBottom - SAFE.contentTop + 60 });
G.bgButter.altKey = 'bgInk'; G.bgInk.altKey = 'bgButter';
/** her line as type on butter (or ink), the mini card counter top right */
const quote = (o) => (t, r) => { const inkG = o.ground === 'bgInk'; const gr = G[o.ground || 'bgButter']; rect(0, 0, W, H, gr.bg); const m = V(120, 80);
  const z = o.size || V(112, 92); const n = String(o.lines).split('\n').length; const y = r.y + r.h * (o.y || 0.46) - (n - 1) * z * 0.55;
  if (o.kicker) withA(bgE(t, o.at || 0, 0.4), () => BG.mono('kicker', o.kicker, r.x + m, y - z * 1.3, V(40, 38), inkG ? BG.butter : BG.ink));
  const s = 1 + 0.02 * E.inOutCubic(prog(t, o.at || 0, 8)); withT((r.x + r.w / 2) * (1 - s), (r.y + r.h / 2) * (1 - s), s, 0, () =>
    BG.text(t, 'q', o.lines, r.x + m, y, z, { at: o.at, hits: o.hits, maxW: r.w - 2 * m, col: inkG ? '#FFFDF5' : gr.fg, knock: inkG ? BG.ink : BG.butter, blockCol: inkG ? BG.butter : BG.ink, f: o.body ? (zz) => F.body(zz, 800) : undefined, lh: 1.12 }));
  if (!inkG && o.mini !== false && BG.count(t) > 0) { const sz = V(200, 170); BG.mini(t, r.x + r.w - sz - V(56, 44), r.y + V(56, 40), sz); }
};
function FS(id, start, g, draw) { addScene(start, g, '', (t) => { rect(0, 0, W, H, (G[g] || G.bgButter).bg); draw(t, FR()); }, { id }); }

function buildFilm() {
  for (const [n, r] of Object.entries(ITEM_RAW_F)) BG.AT[n] = R2F(r);
  const T0 = (p) => p.t - 0.12; let last = -1;
  const on = (a, b, id, mk) => { const p = X(a, b); if (!p) { console.warn('film: not found', id); return; } let s = id === 'open' ? 0 : T0(p); if (s <= last + 0.4) s = last + 0.4; last = s; mk(p, s); };
  /* 2026-11-19 (her note: "add sound to the motion film"): every key word that lands on a type screen gets a sound on its hit,
   * picked from what the word means (QSND), else a rotation of soft marks (no whooshes; SOUND-PALETTE.md). */
  const QROT = ['marker', 'typeHit', 'tap', 'check', 'typeHit', 'marker', 'click']; let qk = 0;
  const QSND = { 'never-stops': ['swipe', -6], 'no-cues': ['hit', -4], easy: ['hit', -5], bored: ['clock', -6], 'pick-phone': ['notify', -6], 'dont-enjoy': ['notify', -7],
    boom: ['boom', -2], awkward: ['hit', -5], monetise: ['cash', -6], money: ['cash', -7], 'never-beat': ['hit', -3], profound: ['hit', -5], hunter: ['pop', -6],
    special: ['ding', -8], nothing: ['error', -9], lazy: ['tape', -8], 'brain-dump': ['page', -5], journal: ['page', -6], wander: ['clock', -8] };
  const CR = (r) => (PORTRAIT ? r : { x: r.x, y: r.y, w: r.w, h: r.h * 0.8 });   // 16:9: the bingo card keeps the caption band free (teaser 0:40, 2026-11-19)
  const CARDR = (d) => (t, r) => d(t, CR(r));
  const Q = (a, b, id, lines, o = {}) => on(a, b, id, (p, s) => { const hit = o.hitW ? WT(p, o.hitW) : null;
    if (hit != null) { const [role, db] = QSND[id] || [QROT[qk++ % QROT.length], -7]; sfx(role, Math.max(s + 0.05, hit), db); }
    if (id === 'never-beat' && hit != null && hit - 2.6 > 0) sfx('riser', hit, -8, { keep: true });   // the one build-up of the film: ends on "genuine connection"
    FS(id, s, o.ground || 'bgButter', quote({ at: s + 0.05, lines, hits: hit != null ? hit : undefined, ...o })); });
  /* BG.word (bingo.js) calls its sound while DRAWING, so in the film it never reached the cue list: the film registers it here, at build
   * time, on the key word (the hit), with a sound picked from what the screen says (WSND), else a rotation. */
  const WROT = ['pop', 'typeHit', 'tap', 'marker']; let wk = 0, gid = '';
  const WSND = { designed: ['glitch', -9], pause: ['tape', -8], 'cant-press': ['click', -6], diamond: ['ding', -7], steal: ['cash', -6], 'ten-pushups': ['boom', -4],
    reduce: ['tick', -6], influencers: ['notify', -7], parents: ['pop', -6], background: ['page', -6], polished: ['marker', -6] };
  const word0 = BG.word; BG.word = (o) => { if (o.at != null && !o.silent) { const ht = Array.isArray(o.hits) ? o.hits[0] : o.hits; const [role, db] = WSND[gid] || [WROT[wk++ % WROT.length], -7];
    sfx(role, ht != null && ht > o.at ? ht : o.at + 0.02, db); } return word0({ ...o, silent: true }); };
  /* 2026-11-19 pictures pass: a photo arriving gets a sound from what the screen is about (QSND / WSND / PSND), else a rotation, so
   * 50 photos are not 50 shutters */
  const PSND = { 'time-gap': ['tick', -7], formats: ['page', -6], 'reach-book': ['page', -6], school: ['ding', -9], hunter: ['pop', -6], accomplish: ['ding', -8], curiosity: ['pop', -7],
    journal: ['page', -6], library: ['page', -7], 'brain-dump': ['marker', -6], polished: ['paper', -6], doodle: ['marker', -6], care: ['notify', -7], 'own-bike': ['tick', -7], lazy: ['tape', -8] };
  const PROT = [['shutter', -6], ['paper', -7], ['card', -6], ['shutter', -7], ['tap', -6], ['pop', -8]]; let pk = 0;
  const pic0 = BG.pic; BG.pic = (o) => { const sfx0 = BG.sfx; const [r0, d0] = o.snd || PSND[gid] || QSND[gid] || WSND[gid] || PROT[pk++ % PROT.length];
    BG.sfx = (role, t, db) => sfx0(gid ? r0 : role, t, gid ? d0 : db); try { return pic0(o); } finally { BG.sfx = sfx0; } };
  const SHROT = ['shutter', 'card', 'pop', 'shutter', 'paper', 'tap']; let shk = 0;   // photo rows: not every photo a shutter
  const Gx = (a, b, id, mk, g = 'bgButter') => on(a, b, id, (p, s) => { gid = id; const sf0 = BG.sfx; BG.sfx = (role, t, db) => sf0(role === 'shutter' ? SHROT[shk++ % SHROT.length] : role, t, db);
    let d; try { d = mk(p, s); } finally { BG.sfx = sf0; gid = ''; } FS(id, s, g, d); });
  const CARD = (a, b, n, o = {}) => Gx(a, b, 'item' + n, (p, s) => { const d = BG.cardG({ n, daubAt: BG.AT[n], at: s, push: true, head: o.head }); sfx('slide', s + 0.02, -4);
    return (t, r) => { const k = bgE(t, s, 0.5, 'outQuint'); withT(0, (1 - k) * V(80, 120), 1, 0, () => d(t, CR(r))); }; });

  /* ---------- why it's so hard to stop ---------- */
  Q(24.8, 34.6, 'open', 'Why is it so hard\nto stop [doomscrolling]?', { hitW: 'doomscrolling', size: V(130, 100) });
  Gx(34.6, 42.9, 'designed', (p, s) => BG.feed({ at: s + 0.1, flickAt: [WT(p, 'hard to stop') - 0.2] }), 'bgInk');   // 2026-11-19 show, don't type (the talking-head's pictures)
  Gx(43.0, 50.3, 'npr', (p, s) => BG.src({ key: 'npr', at: s, markAt: WT(p, 'infinite scroll'), mark: [200, 88, 545, 86] }));
  Gx(50.4, 57.6, 'never-stops', (p, s) => BG.feed({ at: s, flickAt: [WT(p, 'never') - 0.2, WT(p, 'never') + 1.2], keys: ['px-bike', 'px-plants', 'px-thrift', 'px-crochet', 'px-coffee-talk'] }), 'bgInk');
  Gx(57.7, 62.8, 'infinitely', (p, s) => BG.pic({ key: 'px-scroll-hand', at: s, dur: Math.max(4, p.e - s) }), 'bgInk');
  Gx(62.9, 71.2, 'no-cues', (p, s) => BG.pic({ key: 'px-phone-night', at: s, dur: Math.max(4, p.e - s) }), 'bgInk');
  Gx(71.3, 75.5, 'pause', (p, s) => BG.pic({ key: 'px-window-pause', at: s, dur: Math.max(4, p.e - s) }), 'bgInk');
  Gx(75.6, 88.2, 'cues', (p, s) => BG.cues({ at: s, bookAt: WT(p, 'chapter') - 0.2, epAt: WT(p, 'episode') - 0.2, feedAt: WT(p, 'but your') - 0.1, noAt: WT(p, "doesn't") }));
  Gx(104.3, 108.4, 'chronic', (p, s) => BG.pic({ key: 'px-couch-phone', at: s, dur: Math.max(4, p.e - s) }), 'bgInk');
  Gx(108.5, 117.9, 'screen-time', (p, s) => BG.meter({ at: s, title: 'Screen time: [low].\nI want it [lower].', hits: [WT(p, 'low'), WT(p, 'lower')], a: 'Lower', b: 'Average', from: 0.38, to: 0.12, moveAt: WT(p, 'even lower') }));
  Gx(118.0, 129.9, 'card-intro', (p, s) => { sfx('card', s + 0.05, -4); return CARDR(BG.cardG({ n: 0, at: s, head: 'MY OFFLINE CARD', push: true })); });

  /* ---------- pick something easy ---------- */
  Gx(130.0, 136.9, 'replace', (p, s) => BG.pic({ key: 'px-tea-book', at: s, dur: Math.max(4, p.e - s) }), 'bgInk');
  Gx(137.0, 145.1, 'tired', (p, s) => BG.meter({ at: s, title: 'When we’re [tired]', hits: WT(p, 'tired'), a: 'Easy', b: 'Difficult', from: 0.8, to: 0.1, moveAt: WT(p, 'more difficult') - 0.6, mark: 'Scrolling', markAt: WT(p, 'doomscrolling') }));
  Gx(145.2, 150.2, 'easy', (p, s) => BG.pic({ key: 'px-scroll-bed', at: s, fx: 0.55 }), 'bgInk');
  Gx(161.8, 168.6, 'demanding', (p, s) => BG.pic({ key: 'px-tired-sofa', at: s, dur: Math.max(4, p.e - s) }), 'bgInk');

  /* ---------- 01 reading ---------- */
  CARD(183.2, 189.7, 1);
  Gx(189.8, 192.7, 'i-like', (p, s) => BG.pic({ key: 'px-reading-smile', at: s, dur: Math.max(4, p.e - s), fy: 0.4 }), 'bgInk');
  Gx(192.8, 208.4, 'without-book', (p, s) => BG.square({ n: 1, img: 'px-book-table', at: s, name: 'Reading', line: '“You’ll barely see me\nwithout a [book].”', lineAt: WT(p, 'barely') - 0.2, hits: WT(p, 'book') }));
  Gx(208.5, 218.2, 'time-gap', (p, s) => BG.trio({ items: [{ key: 'px-waiting', at: WT(p, 'waiting') }, { key: 'px-queue', at: WT(p, 'queue') }, { key: 'px-busstop', at: WT(p, 'bus') }] }), 'bgInk');
  Gx(218.3, 230.0, 'reach-book', (p, s) => BG.square({ n: 1, img: 'px-book-table', at: s, name: 'Reading' }), 'bgInk');
  Gx(231.9, 238.0, 'break', (p, s) => BG.pic({ key: 'px-lunch-alone', at: s, dur: Math.max(4, p.e - s) }), 'bgInk');
  Gx(238.0, 244.7, 'pick-phone', (p, s) => BG.pic({ key: 'px-dinner', at: s, dur: Math.max(4, p.e - s) }), 'bgInk');
  Gx(244.8, 252.7, 'read-eat', (p, s) => BG.photo({ key: 'px-read-eat', at: s, cap: 'I read now while I eat' }));
  Gx(252.8, 281.1, 'fiction', (p, s) => BG.pic({ key: 'px-novels', at: s, dur: 28 }), 'bgInk');
  Gx(281.2, 291.4, 'dont-enjoy', (p, s) => BG.pic({ key: 'px-bored-book', at: s, dur: Math.max(4, p.e - s) }), 'bgInk');
  Gx(291.5, 340.5, 'formats', (p, s) => BG.trio({ items: [{ key: 'px-book-table', at: WT(p, 'physical') }, { key: 'px-tablet', at: WT(p, 'ipad') }, { key: 'px-ereader', at: WT(p, 'kindle', 1) }] }), 'bgInk');

  /* ---------- 02 boredom ---------- */
  CARD(340.6, 348.4, 2);
  Gx(348.5, 367.6, 'bored', (p, s) => BG.pic({ key: 'px-ceiling', at: s, dur: Math.max(4, p.e - s), push: 0.12 }), 'bgInk');
  Gx(367.6, 372.9, 'sit', (p, s) => BG.pic({ key: 'px-bench-alone', at: s, dur: Math.max(4, p.e - s) }), 'bgInk');
  Gx(372.9, 378.3, 'the-second', (p, s) => BG.feed({ at: s, flickAt: [WT(p, 'second')] }), 'bgInk');
  Gx(378.4, 380.5, 'places', (p, s) => BG.pic({ key: 'px-waiting', at: s, dur: Math.max(4, p.e - s) }), 'bgInk');
  Gx(380.5, 384.0, 'kettle', (p, s) => BG.photo({ key: 'px-kettle', at: s, cap: 'Waiting for the kettle to boil' }));
  Gx(384.0, 391.5, 'busstop', (p, s) => BG.photo({ key: 'px-busstop', at: s, cap: 'Standing at a bus stop' }));
  Gx(391.5, 402.7, 'wander', (p, s) => BG.pic({ key: 'px-daydream', at: s, dur: Math.max(4, p.e - s) }), 'bgInk');

  /* ---------- 03 small talk ---------- */
  CARD(402.8, 418.4, 3);
  Gx(418.5, 432.2, 'not-talking', (p, s) => BG.pic({ key: 'px-phones-table', at: s, dur: Math.max(4, p.e - s) }), 'bgInk');
  Gx(432.3, 439.0, 'small-talk', (p, s) => BG.pic({ key: 'px-neighbours', at: s, dur: Math.max(4, p.e - s) }), 'bgInk');
  Gx(439.0, 446.7, 'friend', (p, s) => BG.pic({ key: 'px-barista', at: s, dur: Math.max(4, p.e - s) }), 'bgInk');
  Gx(446.7, 454.3, 'real-life', (p, s) => BG.square({ n: 3, img: 'px-coffee-talk', at: s, name: 'Small talk' }));
  Gx(454.3, 464.0, 'please', (p, s) => BG.pic({ key: 'px-bench-talk', at: s, dur: Math.max(4, p.e - s) }), 'bgInk');
  Gx(464.0, 475.4, 'let-it-be', (p, s) => BG.pic({ key: 'px-laughing-talk', at: s, dur: Math.max(4, p.e - s) }), 'bgInk');
  Gx(475.5, 481.1, 'coffee', (p, s) => BG.photo({ key: 'px-coffee-talk', at: s, cap: 'Grab a coffee with someone', fy: 0.4 }));
  Gx(503.6, 510.4, 'awkward', (p, s) => BG.pic({ key: 'px-friends-laugh', at: s, dur: Math.max(4, p.e - s) }), 'bgInk');

  /* ---------- 04 friends ---------- */
  CARD(510.9, 528.2, 4);
  Gx(528.3, 542.3, 'parents', (p, s) => BG.pic({ key: 'px-chat', at: s, dur: 14 }), 'bgInk');
  Gx(542.4, 547.5, 'more-easily', (p, s) => BG.square({ n: 4, img: 'px-chat', at: s, name: 'Making friends' }), 'bgInk');
  Gx(547.6, 556.6, 'school', (p, s) => BG.pic({ key: 'px-school-kids', at: s, dur: Math.max(4, p.e - s) }), 'bgInk');
  Q(556.7, 562.8, 'boom', '[Boom.]', { ground: 'bgInk', hitW: 'boom', size: V(260, 200) });
  Gx(562.9, 571.5, 'not-impossible', (p, s) => BG.pic({ key: 'px-picnic', at: s, dur: Math.max(4, p.e - s) }), 'bgInk');
  Gx(571.5, 574.3, 'intentional', (p, s) => BG.pic({ key: 'px-planner', at: s, dur: Math.max(4, p.e - s) }), 'bgInk');
  Gx(574.3, 595.0, 'influencers', (p, s) => BG.feed({ at: s, hearts: true, heartAt: WT(p, 'virtual'), keys: ['px-coffee-talk', 'px-banana-bread', 'px-thrift', 'px-plants'] }), 'bgInk');
  Gx(595.0, 603.0, 'hang-out', (p, s) => BG.pic({ key: 'px-friends-laugh', at: s, dur: Math.max(4, p.e - s), fx: 0.3 }), 'bgInk');

  /* ---------- 05 something new ---------- */
  CARD(603.0, 610.4, 5);
  Gx(610.4, 620.2, 'bike', (p, s) => BG.photo({ key: 'px-bike', at: s + 0.2, cap: 'This summer: learning to ride a bike' }));
  Gx(620.2, 636.7, 'own-bike', (p, s) => BG.pic({ key: 'px-bike-evening', at: s, dur: Math.max(4, p.e - s) }), 'bgInk');
  Gx(636.7, 650.7, 'destination', (p, s) => BG.pic({ key: 'px-bike-road', at: s, dur: Math.max(4, p.e - s) }), 'bgInk');
  Gx(650.7, 660.4, 'cant-press', (p, s) => BG.pic({ key: 'px-handlebars', at: s, dur: Math.max(4, p.e - s) }), 'bgInk');
  Gx(660.4, 666.9, 'busy', (p, s) => BG.trio({ items: [{ key: 'px-crochet', at: s + 0.1 }, { key: 'px-pushups', at: WT(p, 'body') }] }), 'bgInk');
  Gx(666.9, 685.6, 'crochet', (p, s) => BG.photo({ key: 'px-crochet', at: s, cap: 'It could be crocheting' }));
  Gx(685.7, 696.4, 'hobbies', (p, s) => BG.trio({ items: [{ key: 'px-crochet', at: s + 0.1 }, { key: 'px-painting', at: WT(p, 'painting') }, { key: 'px-camera', at: WT(p, 'photography') }] }), 'bgInk');
  Gx(696.4, 719.3, 'banana', (p, s) => BG.square({ n: 5, img: 'px-banana-bread', at: s, name: 'Baking', line: '“I suck at\nbaking, guys.”', lineAt: WT(p, 'suck') - 0.3 }));
  Gx(719.3, 729.3, 'try-new', (p, s) => BG.trio({ items: [{ key: 'px-banana-bread', at: WT(p, 'bake') }, { key: 'px-bike', at: WT(p, 'bike') }] }), 'bgInk');
  Gx(729.4, 736.2, 'thrift', (p, s) => BG.photo({ key: 'px-thrift', at: s, cap: 'Thrift-store hunting' }));
  Gx(736.2, 746.2, 'hunter', (p, s) => BG.pic({ key: 'px-rack', at: s, dur: Math.max(4, p.e - s) }), 'bgInk');
  Gx(746.2, 754.8, 'special', (p, s) => BG.pic({ key: 'px-vintage', at: s, dur: Math.max(4, p.e - s) }), 'bgInk');
  Gx(754.8, 764.0, 'diamond', (p, s) => BG.pic({ key: 'px-vintage-bag', at: s, dur: Math.max(4, p.e - s) }), 'bgInk');
  Gx(764.0, 775.0, 'nothing', (p, s) => BG.pic({ key: 'px-store-exit', at: s, dur: Math.max(4, p.e - s) }), 'bgInk');
  Gx(775.0, 785.1, 'reputation', (p, s) => BG.pic({ key: 'px-bags', at: s, dur: 10 }), 'bgInk');
  Gx(785.2, 814.6, 'accomplish', (p, s) => BG.pic({ key: 'px-happy-shopper', at: s, dur: Math.max(4, p.e - s) }), 'bgInk');
  Gx(814.7, 829.1, 'steal', (p, s) => BG.word({ lines: '[€5 or €7]', at: WT(p, 'five') - 0.3, hits: WT(p, 'five') }));   // one number, the price (her emphasis)
  Gx(829.2, 835.0, 'something-else', (p, s) => BG.pic({ key: 'px-gardening', at: s, dur: Math.max(4, p.e - s) }), 'bgInk');
  Gx(835.0, 845.1, 'money', (p, s) => BG.pic({ key: 'px-coins', at: s, dur: Math.max(4, p.e - s) }), 'bgInk');
  Gx(845.1, 858.7, 'really', (p, s) => BG.pic({ key: 'px-painting-happy', at: s, dur: Math.max(4, p.e - s) }), 'bgInk');
  Gx(858.7, 865.0, 'monetise', (p, s) => BG.pic({ key: 'px-notes-watch', at: s, dur: Math.max(4, p.e - s) }), 'bgInk');
  Gx(865.0, 868.4, 'settle', (p, s) => BG.feed({ at: s, keys: ['px-thrift', 'px-crochet', 'px-plants'] }), 'bgInk');
  Gx(868.4, 870.2, 'curiosity', (p, s) => BG.pic({ key: 'px-explore', at: s, dur: Math.max(4, p.e - s) }), 'bgInk');
  Gx(870.2, 892.1, 'try-things', (p, s) => BG.trio({ items: [{ key: 'px-coffee-talk', at: WT(p, 'go out') }, { key: 'px-cooking', at: WT(p, 'new recipe') }, { key: 'px-camera', at: WT(p, 'photography') }, { key: 'px-plants', at: WT(p, 'decorate') }] }), 'bgInk');
  Gx(892.2, 907.6, 'plants', (p, s) => BG.photo({ key: 'px-plants', at: s, cap: 'A pet or a plant' }));

  /* ---------- 06 long-form ---------- */
  CARD(908.9, 919.5, 6);
  Gx(920.5, 931.5, 'long-video', (p, s) => BG.trio({ items: [{ key: 'px-laptop-video', at: WT(p, 'youtube') - 0.3 }, { key: 'px-longread', at: WT(p, 'article') - 0.3 }] }), 'bgInk');
  Gx(931.5, 942.8, 'more-long', (p, s) => BG.pic({ key: 'px-laptop-video', at: s, dur: Math.max(4, p.e - s), fx: 0.7 }), 'bgInk');
  Gx(942.9, 957.2, 'background', (p, s) => BG.pic({ key: 'px-chores', at: s, fx: 0.6, dur: 14 }), 'bgInk');
  Gx(957.2, 962.7, 'engage', (p, s) => BG.pic({ key: 'px-headphones-focus', at: s, dur: Math.max(4, p.e - s) }), 'bgInk');

  /* ---------- 07 physical ---------- */
  CARD(974.3, 984.4, 7);
  Gx(984.5, 993.3, 'pushups', (p, s) => BG.photo({ key: 'px-pushups', at: s, cap: 'A walk without your phone, or push-ups' }));
  Gx(993.3, 1016.5, 'lazy', (p, s) => BG.pic({ key: 'px-couch-lazy', at: s, dur: Math.max(4, p.e - s) }), 'bgInk');
  Gx(1016.5, 1025.0, 'ten-pushups', (p, s) => BG.reps({ key: 'px-pushups', at: s, countAt: WT(p, 'ten') - 0.1, every: 0.32, n: 10 }), 'bgInk');

  /* ---------- 08 prayer + journaling ---------- */
  CARD(1041.0, 1052.2, 8);
  Gx(1052.3, 1077.6, 'pray', (p, s) => BG.photo({ key: 'px-pray', at: s, cap: 'A few minutes, in the time you’d scroll' }));
  Gx(1077.6, 1089.7, 'journal', (p, s) => BG.pic({ key: 'px-notebook-write', at: s, dur: Math.max(4, p.e - s) }), 'bgInk');
  Gx(1089.7, 1110.0, 'profound', (p, s) => BG.pic({ key: 'px-doodle', at: s, dur: Math.max(4, p.e - s) }), 'bgInk');
  Gx(1110.0, 1124.4, 'junk', (p, s) => BG.photo({ key: 'px-journal', at: s, cap: 'Junk journaling: a journal out of scraps' }));
  Gx(1124.4, 1134.6, 'brain-dump', (p, s) => BG.pic({ key: 'px-handwriting', at: s, dur: Math.max(4, p.e - s) }), 'bgInk');
  Gx(1134.6, 1143.0, 'polished', (p, s) => BG.pic({ key: 'px-crumpled', at: s, dur: Math.max(4, p.e - s) }), 'bgInk');
  Gx(1143.0, 1148.7, 'library', (p, s) => BG.pic({ key: 'px-library', at: s, dur: Math.max(4, p.e - s) }), 'bgInk');

  /* ---------- cutting back ---------- */
  Gx(1158.4, 1168.8, 'reduce', (p, s) => BG.pic({ key: 'px-phone-down', at: s, dur: Math.max(4, p.e - s) }), 'bgInk');
  Gx(1168.8, 1186.5, 'apps', (p, s) => BG.apps({ at: s, delAt: WT(p, 'delete'), limitAt: WT(p, 'limit') - 0.3 }), 'bgInk');

  /* ---------- 09 call your people ---------- */
  CARD(1186.5, 1200.0, 9, { head: 'BINGO' });
  Gx(1200.0, 1210.9, 'call', (p, s) => BG.call({ at: s, names: [['Your people', s], ['Mom', WT(p, 'mom')], ['Dad', WT(p, 'dad')], ['Brother', WT(p, 'brother')], ['Sister', WT(p, 'sister')], ['Uncle', WT(p, 'uncle')], ['Friends', WT(p, 'friends')]] }));
  Gx(1210.9, 1223.3, 'genuine', (p, s) => BG.pic({ key: 'px-coffee-talk', at: s, dur: 12 }), 'bgInk');
  Q(1223.4, 1229.2, 'never-beat', 'Social media can never beat\n[genuine connection].', { ground: 'bgInk', hitW: 'genuine', size: V(100, 76) });
  Gx(1229.3, 1246.0, 'care', (p, s) => BG.pic({ key: 'px-call', at: s, dur: Math.max(4, p.e - s) }), 'bgInk');
  Gx(1246.0, 1254.9, 'bingo-end', (p, s) => CARDR(BG.cardG({ n: 9, at: s, head: 'BINGO', push: true })));
  const end = TOTAL - OUTRO; addScene(Math.max(last + 0.5, end - 0.1), 'bgButter', '', (t) => { rect(0, 0, W, H, BG.butter); const r = FR(); const z = V(110, 90);
    withA(bgE(t, end, 0.4), () => { BG.ml('end-handle', '@WithGbemi', r.x + r.w / 2, r.y + r.h * 0.5, F.disp(z), BG.ink, { align: 'center' }); }); }, { id: 'end' });
}
const ITEM_RAW_F = { 1: 183.54, 2: 341.08, 3: 403.54, 4: 511.52, 5: 609.78, 6: 909.0, 7: 974.72, 8: 1041.62, 9: 1188.28 };
