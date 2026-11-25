/* doomscrolling: the edit plan, shared by the FULL edit (moments/full.js) and every short (shorts/shNN.js).
 * Written 2026-11-03 by the FILM agent. Each call names a stretch of her RAW recording (seconds, from data/sentences.txt);
 * X(a, b) = her words in that stretch inside this moment (null when the moment does not hold all of it), so the full edit
 * and a short that holds the same sentence get the same graphic. The bingo card is the 1-9 counter (BG.AT = the moment
 * time of each item's number word; items before a short's start are already daubed).
 * Shorts (her rules): she is always on camera (a full-frame graphic becomes the top panel, her below), no big overlay text,
 * no timers, the first phrase is her talking, no keywords (the captions carry her words).
 * The look: film/scenes/bingo.js + moments/common.js. */
'use strict';
const ITEM_RAW = { 1: 183.54, 2: 341.08, 3: 403.54, 4: 511.52, 5: 609.78, 6: 909.0, 7: 974.72, 8: 1041.62, 9: 1188.28 };
BG.skipIds = new Set(); BG.skip = (...ids) => ids.forEach(i => BG.skipIds.add(i));
function BG_PLAN(mode) {
  const SHORT = mode === 'short';
  const MR0 = FOOT.clips[0][0], MR1 = FOOT.clips[FOOT.clips.length - 1][1];
  for (let n = 1; n <= 9; n++) { const o = rawToOut(ITEM_RAW[n]); BG.AT[n] = o != null ? o : (ITEM_RAW[n] < MR0 ? -1 : undefined); }
  if (FOOT.m.kind === 'full') BG.miniFrom = rawToOut(150);
  /** her words between raw a and b (all inside this moment) as a phrase {t, e, w, ew, i}, else null */
  const X = (a, b) => {
    if (a < MR0 - 0.3 || b > MR1 + 1.5) return null; let i0 = -1, i1 = -1;
    for (let i = 0; i < WORDS.length; i++) { const r = outToRaw(WORDS[i].t + 0.01); if (r >= a - 0.05 && r < b) { if (i0 < 0) i0 = i; i1 = i; } else if (i0 >= 0 && r >= b) break; }
    if (i0 < 0) return null; const ws = WORDS.slice(i0, i1 + 1); return { t: ws[0].t, e: ws[ws.length - 1].e, w: ws.map(x => x.t), ew: ws.map(x => x.e), i: i0 };
  };
  let first = null; { for (let i = 0; i < WORDS.length; i++) { first = outToRaw(WORDS[i].t + 0.01); break; } }
  const on = (a, b, kind, fn) => {
    const ph = X(a, b); if (!ph) return;
    if (SHORT) {
      if (kind === 'kw' || kind === 'pops' || kind === 'stack' || kind === 'corner') return;
      if (FOOT.m.fmt && (kind === 'card' || /behind|bored-behind|boom|curiosity|brain-dump/.test(fn.toString().slice(0, 60)))) return;   // formats: no text cards / words behind her (the captions carry her words)
      if (Math.abs(a - first) < 1.0 && kind !== 'talk') return;   // the short opens on her talking
    }
    const n0 = TH.segs.length; fn(ph); const sg = TH.segs[TH.segs.length - 1];
    if (sg && TH.segs.length > n0 && BG.skipIds.has(sg.id)) TH.segs.pop();
  };
  const T0 = (ph) => ph.t - 0.12; const HV = (a, b) => V(a, b);
  const full = SHORT ? (sp, draw, o = {}) => TH.half(sp, { side: 'top', size: 1000, draw, id: o.id, lead: o.lead, until: o.until }) : BG.full;
  const tile0 = TH.tile; if (SHORT || PORTRAIT) TH.tile = (sp, o = {}) => TH.split(sp, { ...o, her: 0.46, side: 'bottom', at: undefined, w: undefined });
  const FX = SHORT && BG.fmtInstall ? BG.fmtInstall() : null;   // 2026-11-10: the short's format (moments/formats.js) places graphics + her
  const talk0 = TH.talk; if (SHORT) TH.talk = (sp, o = {}) => talk0(sp, { ...o, frame: 'wide', punch: undefined, push: undefined, alt: undefined });
  if (SHORT) { const ph = X(first - 0.1, first + 3.0); if (ph) TH.talk(ph, { frame: 'mid', id: 'hook' }); }
  const KW = (sp, w, o = {}) => { const ws = String(w).replace(/~/g, '').split(/\s+/); const c = ws.find(x => x.length > 3) || ws[0]; const tc = Array.isArray(sp) ? sp[0] + 0.1 : WT(sp, c);
    return TH.keyword(sp, w, { y: V(undefined, 300), times: o.times || ws.map(() => tc), ...o }); };
  const card = (n, o = {}) => BG.cardG({ n, daubAt: BG.AT[n] > 0 ? BG.AT[n] : null, at: o.at, push: true, head: o.head, name: o.name, flip: o.flip });
  /** L17 presenter: the graphic keeps to the side away from her cut-out (16:9), the rest is the butter ground */
  const PRES = (sp, side, id, draw) => TH.presenter(sp, { side, id, draw: PORTRAIT ? draw : (t, r) => { rect(r.x, r.y, r.w, r.h, BG.butter); const k = 0.62; draw(t, side === 'right' ? { x: r.x, y: r.y, w: r.w * k, h: r.h } : { x: r.x + r.w * (1 - k), y: r.y, w: r.w * k, h: r.h }); } });

  /* ---------- 0:00 why it's so hard to stop ---------- */
  on(24.8, 27.6, 'other', (p) => TH.behind(p, ['DOOMSCROLLING'], { times: [WT(p, 'doomscrolling')], id: 'doom-behind', size: HV(230, 130), y: HV(250, 560) }));
  on(34.6, 42.9, 'other', (p) => TH.split(p, { her: HV(0.4, 0.46), side: HV('right', 'bottom'), id: 'designed', ground: 'bgInk', inset: 0,
    draw: BG.feed({ at: T0(p) + 0.1, flickAt: [WT(p, 'hard to stop') - 0.2] }) }));
  on(43.0, 50.3, 'other', (p) => full(p, BG.src({ key: 'npr', at: T0(p), markAt: WT(p, 'infinite scroll'), mark: [200, 88, 545, 86] }), { id: 'npr' }));
  on(50.4, 57.6, 'talk', (p) => TH.talk(p, { frame: 'close', punch: ['never'], id: 'never-stops' }));
  on(57.7, 62.8, 'talk', (p) => TH.talk(p, { frame: 'mid', push: [HV(1.0, 1.06), HV(1.08, 1.1)], id: 'infinitely' }));
  on(62.9, 71.2, 'card', (p) => BG.cardInk([WT(p, 'natural') - 0.1, p.e + 0.4], ['No *stopping cues.*'], { times: [WT(p, 'natural'), WT(p, 'stopping'), WT(p, 'cues')], id: 'no-cues-card' }));
  on(71.3, 75.5, 'talk', (p) => TH.talk(p, { frame: 'close', id: 'pause' }));
  on(75.6, 88.2, 'other', (p) => full(p, BG.cues({ at: T0(p), bookAt: WT(p, 'chapter') - 0.2, epAt: WT(p, 'episode') - 0.2, feedAt: WT(p, 'but your') - 0.1, noAt: WT(p, "doesn't") }), { id: 'cues' }));
  if (SHORT && FOOT.m.fmt) on(75.6, 86.2, 'other', (p) => full([WT(p, 'chapter') - 0.5, p.e + 0.4], BG.cues({ noLabs: true, at: T0(p), bookAt: WT(p, 'chapter') - 0.2, epAt: WT(p, 'episode') - 0.2, feedAt: WT(p, 'but your') - 0.1, noAt: WT(p, "doesn't") }), { id: 'cues' }));   // sh01 (small pop-up card: the pictures only) ends at 86.27: the same graphic, cut to fit (2026-11-10)
  on(104.3, 108.4, 'talk', (p) => TH.talk(p, { frame: 'wide', push: [HV(1.0, 1.08), HV(1.12, 1.16)], id: 'chronic' }));
  on(108.5, 117.9, 'other', (p) => TH.split(p, { her: HV(0.4, 0.46), side: HV('left', 'bottom'), id: 'screen-time',
    draw: BG.meter({ at: T0(p), title: 'Screen time', hits: [], a: 'Lower', b: 'Average', from: 0.38, to: 0.12, moveAt: WT(p, 'even lower') }) }));
  on(118.0, 129.9, 'other', (p) => TH.room(p, { at: 'this video', her: HV(0.38, 0.44), side: HV('right', 'bottom'), id: 'card-intro', draw: BG.cardG({ n: 0, at: T0(p), head: 'MY OFFLINE CARD' }) }));

  /* ---------- 1:15 pick something easy ---------- */
  on(130.0, 136.9, 'talk', (p) => TH.talk(p, { frame: 'mid', id: 'replace' }));
  on(137.0, 145.1, 'other', (p) => TH.half(p, { side: HV('right', 'top'), id: 'tired', draw: BG.meter({ at: T0(p), title: HV('[Tired]', null), hits: WT(p, 'tired'), a: 'Easy', b: 'Difficult', from: 0.8, to: 0.1, moveAt: WT(p, 'more difficult') - 0.6, mark: 'Scrolling', markAt: WT(p, 'doomscrolling') }) }));
  on(145.2, 150.2, 'other', (p) => full([WT(p, 'doomscrolling') - 0.3, p.e + 0.5], BG.pic({ key: 'px-scroll-bed', at: WT(p, 'doomscrolling') - 0.3, fx: 0.55 }), { id: 'easy-way' }));
  on(161.8, 168.6, 'talk', (p) => TH.talk(p, { frame: 'close', punch: ['demanding'], id: 'demanding' }));

  /* ---------- 01 reading ---------- */
  on(183.2, 189.7, 'other', (p) => TH.half(p, { side: HV('right', 'top'), id: 'item1', draw: card(1, { at: T0(p) }) }));
  on(189.8, 192.7, 'talk', (p) => TH.talk(p, { frame: 'mid', id: 'i-like' }));
  on(192.8, 208.4, 'other', (p) => TH.split(p, { her: HV(0.4, 0.46), side: HV('left', 'bottom'), id: 'without-book',
    draw: BG.square({ n: 1, img: 'px-book-table', at: T0(p), name: 'Reading' }) }));
  on(208.5, 218.2, 'other', (p) => TH.room(p, { at: 'time gap', her: HV(0.4, 0.44), side: HV('right', 'bottom'), id: 'time-gap', ground: 'bgInk', inset: 0,
    draw: BG.trio({ items: [{ key: 'px-waiting', at: T0(p) + 0.4 }, { key: 'px-busstop', at: WT(p, 'bus') }, { key: 'px-book-table', at: WT(p, 'the book') }] }) }));
  on(218.3, 230.0, 'talk', (p) => TH.talk(p, { frame: 'close', punch: ['book'], id: 'reach-book' }));
  on(231.9, 238.0, 'talk', (p) => TH.talk(p, { frame: 'close', id: 'break' }));
  on(238.0, 244.7, 'talk', (p) => TH.talk(p, { frame: 'wide', id: 'pick-phone' }));
  on(244.8, 252.7, 'other', (p) => TH.tile(p, { at: HV('br', 'br'), w: HV(460, 400), id: 'read-eat', draw: BG.pic({ key: 'px-read-eat', at: T0(p) }) }));
  on(252.8, 281.1, 'other', (p) => TH.split([WT(p, 'mostly') - 0.4, WT(p, 'so regardless') - 0.1], { her: HV(0.4, 0.46), side: HV('right', 'bottom'), id: 'fiction',
    ground: 'bgInk', inset: 0, draw: BG.pic({ key: 'px-novels', at: WT(p, 'mostly') - 0.2 }) }));
  on(252.8, 281.1, 'talk', (p) => TH.talk([WT(p, 'so regardless') - 0.1, p.e + 0.4], { frame: 'mid', push: [HV(1.0, 1.06), HV(1.08, 1.1)], id: 'enjoy' }));
  on(281.2, 291.4, 'talk', (p) => TH.talk(p, { frame: 'close', push: [HV(1.4, 1.25), HV(1.5, 1.32)], id: 'dont-enjoy' }));
  on(291.5, 311.4, 'talk', (p) => TH.talk(p, { frame: 'mid', id: 'format' }));
  on(291.5, 340.5, 'other', (p) => TH.split([WT(p, 'for me') - 0.2, WT(p, 'the reason') - 0.1], { her: HV(0.4, 0.46), side: HV('left', 'bottom'), id: 'formats', ground: 'bgInk', inset: 0, draw: BG.pic({ key: 'px-book-table', at: WT(p, 'for me'), fx: 0.4 }) }));
  on(291.5, 340.5, 'talk', (p) => TH.talk([WT(p, 'the reason') - 0.1, WT(p, 'maybe') - 0.1], { frame: 'close', punch: ['ipad'], id: 'ipad' }));
  on(291.5, 340.5, 'other', (p) => TH.ots([WT(p, 'maybe') - 0.1, p.e + 0.4], { side: 'auto', w: HV(760, undefined), id: 'kindle', draw: BG.pic({ key: 'px-ereader', at: WT(p, 'maybe') - 0.1 }) }));

  /* ---------- 02 boredom ---------- */
  on(340.6, 348.4, 'other', (p) => TH.room(p, { at: 'number two', her: HV(0.4, 0.44), side: HV('left', 'bottom'), id: 'item2', draw: card(2, { at: T0(p) }) }));
  on(348.5, 367.6, 'other', (p) => TH.behind([WT(p, 'bored') - 0.2, p.e + 0.3], ['BORED'], { times: [WT(p, 'bored')], id: 'bored-behind', size: HV(300, 200), y: HV(260, 560) }));
  on(367.6, 372.9, 'talk', (p) => TH.talk(p, { frame: 'close', id: 'sit' }));
  on(372.9, 378.3, 'other', (p) => TH.split(p, { her: HV(0.4, 0.46), side: HV('right', 'bottom'), id: 'the-second', draw: BG.word({ lines: 'Bored?\n[Phone.]', at: T0(p) + 0.1, hits: WT(p, 'phone') }) }));
  on(380.5, 391.5, 'other', (p) => TH.tile([p.t - 0.1, WT(p, 'standing') - 0.1], { at: HV('br', 'br'), w: HV(460, 400), id: 'kettle', draw: BG.pic({ key: 'px-kettle', at: p.t - 0.1 }) }));
  on(380.5, 391.5, 'other', (p) => TH.half([WT(p, 'standing') - 0.1, p.e + 0.4], { side: HV('left', 'top'), id: 'busstop', ground: 'bgInk', draw: BG.pic({ key: 'px-busstop', at: WT(p, 'standing') - 0.1 }) }));
  on(391.5, 402.7, 'talk', (p) => TH.talk(p, { frame: 'mid', push: [HV(1.2, 1.16), HV(1.32, 1.24)], id: 'wander' }));

  /* ---------- 03 small talk ---------- */
  on(402.8, 418.4, 'other', (p) => TH.split(p, { her: HV(0.42, 0.46), side: HV('left', 'bottom'), id: 'item3', draw: card(3, { at: T0(p) }) }));
  on(418.5, 432.2, 'talk', (p) => TH.talk(p, { frame: 'mid', push: [HV(1.16, 1.12), HV(1.28, 1.2)], id: 'not-talking' }));
  on(432.3, 439.0, 'talk', (p) => TH.talk(p, { frame: 'close', punch: ['small'], id: 'small-talk' }));
  on(439.0, 444.0, 'talk', (p) => TH.talk(p, { frame: 'wide', id: 'friend' }));
  on(444.0, 446.7, 'talk', (p) => TH.talk(p, { frame: 'close', id: 'a-little' }));
  on(446.7, 454.3, 'other', (p) => TH.half(p, { side: HV('right', 'top'), id: 'real-life', draw: BG.square({ n: 3, img: 'px-coffee-talk', at: T0(p), name: 'Small talk' }) }));
  on(454.3, 464.0, 'talk', (p) => TH.talk(p, { frame: 'wide', punch: ['please'], id: 'please' }));
  on(464.0, 475.4, 'talk', (p) => TH.talk(p, { frame: 'mid', push: [HV(1.0, 1.08), HV(1.1, 1.12)], id: 'let-it-be' }));
  on(475.5, 481.1, 'other', (p) => TH.tile(p, { at: HV('br', 'br'), w: HV(460, 400), id: 'coffee', draw: BG.pic({ key: 'px-coffee-talk', at: T0(p), fy: 0.4 }) }));
  on(503.6, 510.4, 'talk', (p) => TH.talk(p, { frame: 'close', punch: ['awkward'], id: 'awkward' }));

  /* ---------- 04 friends ---------- */
  on(510.9, 528.2, 'other', (p) => PRES(p, 'right', 'item4', card(4, { at: T0(p) })));
  on(528.3, 542.3, 'other', (p) => TH.ots(p, { side: 'auto', w: HV(820, undefined), edge: 'rgba(0,0,0,0)', edgePx: 0.01, id: 'parents',
    draw: BG.pic({ key: 'px-chat', at: T0(p) + 0.1 }) }));
  on(542.4, 547.5, 'talk', (p) => TH.talk(p, { frame: 'close', id: 'more-easily' }));
  on(547.6, 556.6, 'talk', (p) => TH.talk(p, { frame: 'mid', push: [HV(1.0, 1.08), HV(1.1, 1.12)], id: 'school' }));
  on(556.7, 562.8, 'other', (p) => TH.behind([p.t - 0.05, p.t + 1.6], ['BOOM.'], { times: [p.t], id: 'boom', size: HV(330, 220), y: HV(270, 560) }));
  on(562.9, 571.5, 'talk', (p) => TH.talk(p, { frame: 'mid', push: [HV(1.18, 1.12), HV(1.3, 1.2)], id: 'not-impossible' }));
  on(574.3, 603.0, 'other', (p) => TH.room([WT(p, 'virtual') - 0.6, WT(p, 'just try') - 0.1], { at: 'virtual', her: HV(0.38, 0.44), side: HV('left', 'bottom'), id: 'influencers',
    draw: BG.feed({ at: WT(p, 'virtual') - 0.5, hearts: true, heartAt: WT(p, 'virtual'), keys: ['px-coffee-talk', 'px-banana-bread', 'px-thrift', 'px-plants'] }) }));
  on(574.3, 603.0, 'talk', (p) => TH.talk([WT(p, 'just try') - 0.1, p.e + 0.3], { frame: 'close', id: 'hang-out' }));

  /* ---------- 05 something new ---------- */
  on(603.0, 610.4, 'other', (p) => TH.half(p, { side: HV('left', 'top'), id: 'item5', draw: card(5, { at: T0(p) }) }));
  on(610.4, 620.2, 'other', (p) => TH.split(p, { her: HV(0.4, 0.46), side: HV('right', 'bottom'), id: 'bike', ground: 'bgInk', inset: 0, draw: BG.pic({ key: 'px-bike', at: T0(p) + 0.2 }) }));
  on(620.2, 636.7, 'talk', (p) => TH.talk(p, { frame: 'close', punch: ['bought'], id: 'own-bike' }));
  on(636.7, 650.7, 'talk', (p) => TH.talk(p, { frame: 'mid', push: [HV(1.0, 1.08), HV(1.1, 1.12)], id: 'destination' }));
  on(650.7, 660.4, 'talk', (p) => TH.talk(p, { frame: 'close', punch: ['press'], id: 'cant-scroll' }));
  on(660.4, 666.9, 'talk', (p) => TH.talk(p, { frame: 'wide', push: [HV(1.0, 1.08), HV(1.12, 1.16)], id: 'busy' }));
  on(666.9, 685.6, 'other', (p) => TH.tile(p, { at: HV('br', 'br'), w: HV(460, 400), id: 'crochet', draw: BG.pic({ key: 'px-crochet', at: T0(p) }) }));
  on(685.7, 696.4, 'other', (p) => TH.room(p, { at: 'painting', her: HV(0.38, 0.44), side: HV('right', 'bottom'), id: 'hobbies', ground: 'bgInk', inset: 0,
    draw: BG.trio({ items: [{ key: 'px-crochet', at: T0(p) }, { key: 'px-painting', at: WT(p, 'painting') }, { key: 'px-camera', at: WT(p, 'photography') }] }) }));
  on(696.4, 729.3, 'other', (p) => TH.split([p.t - 0.1, WT(p, 'so yeah') - 0.1], { her: HV(0.4, 0.46), side: HV('left', 'bottom'), id: 'banana',
    draw: BG.square({ n: 5, img: 'px-banana-bread', at: p.t - 0.1, name: 'Baking' }) }));
  on(696.4, 729.3, 'talk', (p) => TH.talk([WT(p, 'so yeah') - 0.1, p.e + 0.3], { frame: 'mid', punch: ['bike'], id: 'try-new' }));
  on(729.4, 736.2, 'other', (p) => TH.half(p, { side: HV('right', 'top'), id: 'thrift', draw: BG.pic({ key: 'px-thrift', at: T0(p) }) }));
  on(736.2, 746.2, 'talk', (p) => TH.talk(p, { frame: 'close', punch: ['hunter'], id: 'hunter' }));
  on(746.2, 785.1, 'talk', (p) => TH.talk([p.t - 0.1, WT(p, 'diamond') - 0.3], { frame: 'mid', push: [HV(1.14, 1.12), HV(1.26, 1.2)], id: 'special' }));
  on(746.2, 785.1, 'talk', (p) => TH.talk([WT(p, 'diamond') - 0.3, WT(p, 'sometimes') - 0.1], { frame: 'close', punch: ['diamond'], id: 'diamond' }));
  on(746.2, 785.1, 'talk', (p) => TH.talk([WT(p, 'sometimes') - 0.1, WT(p, 'reputation') - 0.6], { frame: 'close', id: 'nothing' }));
  on(746.2, 785.1, 'other', (p) => TH.ots([WT(p, 'reputation') - 0.6, p.e + 0.4], { side: 'auto', w: HV(760, undefined), id: 'reputation', edge: 'rgba(0,0,0,0)', edgePx: 0.01, draw: BG.pic({ key: 'px-bags', at: WT(p, 'reputation') - 0.4 }) }));
  on(785.2, 814.6, 'talk', (p) => TH.talk(p, { frame: 'close', push: [HV(1.4, 1.22), HV(1.5, 1.3)], id: 'motivated' }));
  on(814.7, 829.1, 'other', (p) => TH.split([WT(p, 'five') - 0.5, p.e + 0.4], { her: HV(0.42, 0.46), side: HV('right', 'bottom'), id: 'steal',
    draw: BG.word({ ink: true, lines: '[€5]', at: WT(p, 'five') - 0.2, hits: WT(p, 'five'), size: HV(110, 96) }), ground: 'bgInk' }));
  on(829.2, 835.0, 'talk', (p) => TH.talk(p, { frame: 'wide', id: 'something-else' }));
  on(835.0, 845.1, 'talk', (p) => TH.talk(p, { frame: 'mid', push: [HV(1.0, 1.08), HV(1.1, 1.12)], id: 'money' }));
  on(845.1, 858.7, 'talk', (p) => TH.talk(p, { frame: 'close', punch: ['really'], id: 'really' }));
  on(858.7, 868.4, 'talk', (p) => TH.talk([p.t - 0.1, WT(p, "it's the reason") - 0.1], { frame: 'close', punch: ['monetize'], id: 'monetise' }));
  on(858.7, 868.4, 'talk', (p) => TH.talk([WT(p, "it's the reason") - 0.1, p.e + 0.3], { frame: 'mid', id: 'settle' }));
  on(868.4, 870.2, 'other', (p) => TH.behind([p.t - 0.1, p.e + 0.6], ['CURIOSITY'], { times: [WT(p, 'curiosity')], id: 'curiosity', size: HV(220, 130), y: HV(260, 560) }));
  on(870.2, 892.1, 'other', (p) => TH.split(p, { her: HV(0.4, 0.46), side: HV('left', 'bottom'), id: 'try-things',
    ground: 'bgInk', draw: BG.trio({ items: [{ key: 'px-crochet', at: T0(p) + 0.3 }, { key: 'px-cooking', at: WT(p, 'new recipe') }, { key: 'px-camera', at: WT(p, 'photography') }, { key: 'px-plants', at: WT(p, 'decorate') }] }) }));
  if (SHORT && FOOT.m.fmt) on(870.2, 888.4, 'other', (p) => TH.split(p, { her: 0.46, side: 'bottom', id: 'try-things',   // sh09 ends at 888.45: the same photo row, cut to fit (2026-11-10)
    ground: 'bgInk', draw: BG.trio({ items: [{ key: 'px-crochet', at: T0(p) + 0.3 }, { key: 'px-cooking', at: WT(p, 'new recipe') }, { key: 'px-camera', at: WT(p, 'photography') }, { key: 'px-plants', at: WT(p, 'decorate') }] }) }));
  on(892.2, 907.6, 'other', (p) => TH.tile([p.t - 0.12, WT(p, 'i have a few') - 0.1], { at: HV('br', 'br'), w: HV(460, 400), id: 'plants', draw: BG.pic({ key: 'px-plants', at: T0(p) }) }));

  /* ---------- 06 long-form (she says "number eight" here: cut; the card shows 06) ---------- */
  on(908.55, 919.5, 'other', (p) => TH.room(p, { at: 'one thing', her: HV(0.4, 0.44), side: HV('left', 'bottom'), id: 'item6', draw: card(6, { at: T0(p) }) }));
  on(920.5, 931.5, 'other', (p) => TH.ots(p, { side: 'auto', w: HV(780, undefined), id: 'long-video',
    edge: 'rgba(0,0,0,0)', edgePx: 0.01, draw: BG.pic({ key: 'px-longread', at: SHORT ? T0(p) : WT(p, 'youtube') - 0.3 }) }));
  on(931.5, 942.8, 'talk', (p) => TH.talk(p, { frame: 'mid', push: [HV(1.0, 1.08), HV(1.1, 1.12)], id: 'longform' }));
  on(942.9, 957.2, 'other', (p) => TH.room(p, { at: 'background',  her: HV(0.4, 0.46), side: HV('right', 'bottom'), id: 'background',
    ground: 'bgInk', inset: 0, draw: BG.pic({ key: 'px-chores', at: T0(p) + 0.1, fx: 0.6 }) }));
  on(957.2, 962.7, 'talk', (p) => TH.talk(p, { frame: 'close', push: [HV(1.4, 1.22), HV(1.5, 1.3)], id: 'engage' }));

  /* ---------- 07 something physical ---------- */
  on(974.3, 984.4, 'other', (p) => TH.half(p, { side: HV('right', 'top'), id: 'item7', draw: card(7, { at: T0(p) }) }));
  on(984.5, 993.3, 'other', (p) => TH.tile(p, { at: HV('br', 'br'), w: HV(460, 400), id: 'pushups', draw: BG.pic({ key: 'px-pushups', at: T0(p) }) }));
  on(993.3, 1016.5, 'talk', (p) => TH.talk(p, { frame: 'mid', push: [HV(1.14, 1.12), HV(1.28, 1.2)], id: 'lazy' }));
  on(1016.5, 1025.0, 'other', (p) => full(p, BG.reps({ key: 'px-pushups', at: T0(p), countAt: WT(p, 'ten') - 0.1, every: 0.32, n: 10 }), { id: 'ten-pushups' }));

  /* ---------- 08 prayer + journaling ---------- */
  on(1041.0, 1052.2, 'other', (p) => PRES(p, 'left', 'item8', card(8, { at: T0(p) })));
  on(1052.3, 1077.6, 'other', (p) => TH.split(p, { her: HV(0.4, 0.46), side: HV('right', 'bottom'), id: 'pray', ground: 'bgInk', inset: 0, draw: BG.pic({ key: 'px-pray', at: T0(p) }) }));
  on(1077.6, 1081.2, 'talk', (p) => TH.talk(p, { frame: 'mid', id: 'journal' }));
  on(1081.3, 1110.0, 'talk', (p) => TH.talk(p, { frame: 'close', push: [HV(1.36, 1.22), HV(1.48, 1.3)], id: 'not-relaxed' }));
  on(1110.0, 1124.4, 'other', (p) => TH.tile(p, { at: HV('br', 'br'), w: HV(460, 400), id: 'junk', draw: BG.pic({ key: 'px-journal', at: T0(p) }) }));
  on(1124.4, 1134.6, 'other', (p) => TH.behind(p, ['BRAIN DUMP'], { times: [WT(p, 'brain'), WT(p, 'dump')], id: 'brain-dump', size: HV(220, 130), y: HV(260, 560) }));
  on(1134.6, 1143.0, 'talk', (p) => TH.talk(p, { frame: 'close', punch: ['polished'], id: 'polished' }));
  on(1143.0, 1148.7, 'talk', (p) => TH.talk(p, { frame: 'wide', id: 'library' }));

  /* ---------- cutting back ---------- */
  on(1158.4, 1168.8, 'other', (p) => TH.split(p, { her: HV(0.4, 0.46), side: HV('left', 'bottom'), id: 'reduce',
    ground: 'bgInk', inset: 0, draw: BG.feed({ at: T0(p) + 0.1, keys: ['px-thrift', 'px-bike', 'px-crochet', 'px-plants'] }) }));
  on(1168.8, 1186.5, 'other', (p) => TH.room(p, { at: 'one way', her: HV(0.38, 0.44), side: HV('right', 'bottom'), id: 'apps', ground: 'bgInk', inset: 0,
    draw: BG.apps({ at: T0(p), delAt: WT(p, 'delete'), limitAt: WT(p, 'limit') - 0.3 }) }));
  on(1186.5, 1187.9, 'talk', (p) => TH.talk(p, { frame: 'close', id: 'also-works' }));

  /* ---------- 09 call your people ---------- */
  on(1188.0, 1200.0, 'other', (p) => TH.half(p, { side: HV('left', 'top'), id: 'item9', draw: card(9, { at: T0(p), head: 'BINGO' }) }));
  on(1200.0, 1210.9, 'other', (p) => TH.split(p, { her: HV(0.42, 0.46), side: HV('right', 'bottom'), id: 'call',
    draw: BG.call({ at: T0(p), names: [['Your people', T0(p)], ['Mom', WT(p, 'mom')], ['Dad', WT(p, 'dad')], ['Brother', WT(p, 'brother')], ['Sister', WT(p, 'sister')], ['Uncle', WT(p, 'uncle')], ['Friends', WT(p, 'friends')]] }) }));
  on(1210.9, 1223.3, 'talk', (p) => TH.talk(p, { frame: 'mid', push: [HV(1.16, 1.12), HV(1.28, 1.2)], id: 'genuine' }));
  on(1223.4, 1229.2, 'other', (p) => full(p, BG.pic({ key: 'px-coffee-talk', at: T0(p) }), { id: 'genuine' }));
  on(1229.3, 1246.0, 'talk', (p) => TH.talk(p, { frame: 'close', push: [HV(1.36, 1.22), HV(1.46, 1.3)], id: 'care' }));
  on(1246.0, 1254.9, 'other', (p) => TH.room([p.t - 0.1, p.e + 0.6], { at: 'build', her: HV(0.4, 0.44), side: HV('left', 'bottom'), id: 'bingo-end', draw: BG.cardG({ n: 9, at: p.t - 0.1, head: 'BINGO', push: true }) }));

  if (FX) FX.restore(); TH.tile = tile0; TH.talk = talk0;
}
