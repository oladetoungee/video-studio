/* edge cases: the edit plan, shared by the FULL edit (moments/full.js) and every short (shorts/shNN.js). FILM agent 2026-11-03.
 * EF_SENT / EF_RAW (moments/sent.js) = her phrases in order and their raw start. EF_PLAN(mode) runs every layout call whose
 * phrases are all inside this moment. Shorts (her rules): always on camera (a full-frame graphic becomes the top panel with
 * her below), no big overlay text, no timers, the first phrase is her talking, no keywords. A short can skip ids (EF.skip).
 * The look: film/scenes/ef.js (B · The Field) + moments/common.js. Layouts change every 3-6 s, never the same twice in a row. */
'use strict';
/** shorts: the hook (her first phrase, talking) ends at t, so a graphic can start inside that first phrase */
EF.hookTo = (t) => { const h = TH.segs.find(x => x.id === 'hook'); if (h) h.t1 = Math.min(h.t1, t); };
/** shorts' own extra panels (shorts/shNN.js): the graphic starts below the top label */
EF.halfS = (sp, o = {}) => TH.half(sp, { ...o, draw: o.draw && ((t, r) => o.draw(t, EF.rr(r))) });
EF.splitS = (sp, o = {}) => TH.split(sp, { ...o, draw: o.draw && ((t, r) => o.draw(t, EF.rr(r))) });
EF.skipIds = new Set(); EF.skip = (...ids) => ids.forEach(i => EF.skipIds.add(i));
function WTn(ph, word, n = 0) {
  const nn = (s) => s.toLowerCase().replace(/[’]/g, "'").replace(/[^a-z0-9']/g, ''); const want = String(word).split(/\s+/).map(nn);
  const ws = WORDS.slice(ph.i, ph.i + ph.w.length); let k0 = 0;
  for (let k = 0; k <= ws.length - want.length; k++) if (want.every((x, j) => ws[k + j].n === x)) { if (k0++ === n) return ph.w[k]; }
  return WT(ph, word);
}
function EF_PLAN(mode) {
  const s = {}; for (const [k, q] of Object.entries(EF_SENT)) { const c0 = CUR; try { const ph = P(q); if (EF_RAW[k] != null && Math.abs(outToRaw(ph.t) - EF_RAW[k]) > 1.5) { CUR = c0; continue; } s[k] = ph; } catch (e) { CUR = c0; } }
  const keys = Object.keys(s); const first = keys[0]; const SHORT = mode === 'short';
  const on = (refs, kind, fn) => {
    if (!refs.length || refs.some(r => !s[r])) return;
    if (SHORT) { if (kind === 'behind' || kind === 'kw' || kind === 'glitch' || kind === 'card') return; if (refs.includes(first) && kind !== 'talk') return; }
    const n0 = TH.segs.length; fn(); const sg = TH.segs[TH.segs.length - 1];
    if (sg && TH.segs.length > n0 && EF.skipIds.has(sg.id)) TH.segs.pop();
  };
  const T0 = (ph) => ph.t - 0.12; const HV = V;
  const FX = SHORT && EF.fmtInstall ? EF.fmtInstall(s, first) : null;   // 2026-11-10: the short's format (moments/formats.js) places graphics + her; installed before the overrides below wrap it, and kept for the short's own extra panels (shorts/shNN.js)
  const full = SHORT ? (sp, draw, o = {}) => TH.half(sp, { side: 'top', size: 1060, draw: (t, r) => draw(t, EF.rr(r)), id: o.id, until: o.until }) : EF.full;
  const tile0 = TH.tile; if (SHORT) TH.tile = (sp, o = {}) => TH.split(sp, { ...o, her: 0.44, side: 'bottom', at: undefined, w: undefined });
  const talk0 = TH.talk; if (SHORT) TH.talk = (sp, o = {}) => talk0(sp, { ...o, frame: 'wide', punch: undefined, push: undefined, alt: undefined });   // 2026-11-12 her note: no automatic zooms on her in a short (one framing, no mid / close / push / punch)
  const wrapD = (fn) => (sp, o = {}) => fn(sp, o.draw && SHORT ? { ...o, draw: (t, r) => o.draw(t, EF.rr(r)) } : o);
  const half0 = TH.half, room0 = TH.room, ots0 = TH.ots, pres0 = TH.presenter; if (SHORT) { TH.half = wrapD(half0); TH.room = wrapD(room0); TH.presenter = wrapD(pres0); }
  if (SHORT && first) TH.talk(s[first], { frame: 'wide', id: 'hook' });
  const KW = (sp, w, o = {}) => { const ws = String(w).replace(/~/g, '').split(/\s+/); const c = ws.find(x => x.length > 3) || ws[0]; const tc = Array.isArray(sp) ? sp[0] + 0.1 : WT(sp, c);
    return TH.keyword(sp, w, { y: V(300, 1240), times: o.times || ws.map(() => tc), ...o }); };
  const CH = (k, n, name, sub, id) => on([k], 'other', () => full(s[k], EF.chapter({ n, name, at: T0(s[k]) + 0.25 }), { id, dark: true }));   // no sub-line (2026-11-07: it previewed things she explains later)
  const SPLIT = (sp, side, draw, id, o = {}) => { const d0 = o.draw || draw; return TH.split(sp, { her: HV(0.38, 0.44), side: HV(side, 'bottom'), id, ...o, draw: d0 && SHORT ? (t, r) => d0(t, EF.rr(r)) : d0 }); };

  /* ---------- 0:00 intro: edge cases real users will find ---------- */
  on(['s0'], 'behind', () => TH.behind(s.s0, ['EDGE CASES'], { times: [WT(s.s0, 'edge')], id: 'edge-cases', size: HV(250, 150), y: HV(250, 560) }));
  on(['s1'], 'other', () => TH.half(s.s1, { side: HV('right', 'top'), id: 'navigate', draw: EF.pic({ key: 'px_7534794', at: T0(s.s1), fx: 0.62, fy: 0.35, dim: 0.12, over: (t, r) => EF.tapPath(t, [r.x + r.w * 0.1, r.y + r.h * 0.12, r.w * 0.8, r.h * 0.66], { at: WT(s.s1, 'navigate') - 0.1, step: 0.27, n: 34, seed: 11, errAt: WT(s.s1, 'situation') }) }) }));
  on(['s1'], 'snd', () => { [WT(s.s1, 'navigate'), WTn(s.s1, 'navigate', 1), WTn(s.s1, 'navigate', 2)].forEach(a => EF.sfx('tick', a, -8)); EF.sfx('error', WT(s.s1, 'situation'), -8); });
  on(['s2'], 'talk', () => TH.talk(s.s2, { frame: 'close', push: [HV(1.4, 1.22), HV(1.5, 1.3)], id: 'promise' }));
  on(['s3', 's4'], 'other', () => TH.ots({ from: s.s3, to: s.s4 }, { side: 'auto', w: HV(780, undefined), id: 'issue', draw: EF.notify({ at: WT(s.s3, 'report') - 0.1, title: 'Customer charged twice', meta: 'NEW ISSUE' }) }));
  on(['s6'], 'other', () => TH.half(s.s6, { side: HV('right', 'top'), id: 'few-users', draw: EF.crowd({ at: T0(s.s6) + 0.25, n: 5, who: 2, hitAt: WT(s.s6, 'edge cases') }) }));
  on(['s6'], 'snd', () => { EF.sfx('pop', T0(s.s6) + 0.3, -8); EF.sfx('error', WT(s.s6, 'edge cases'), -7); });
  on(['s7', 's9'], 'other', () => full({ from: s.s7, to: s.s9 }, EF.path({ times: [T0(s.s7) + 0.3, WT(s.s8, 'click'), WT(s.s9, 'wait')], realAt: WT(s.s9, 'wait') + 0.6 }), { id: 'happy-path' }));
  on(['s10'], 'talk', () => TH.talk(s.s10, { frame: 'mid', id: 'straightforward' }));
  on(['s11', 's12'], 'other', () => TH.half({ from: s.s11, to: s.s12 }, { side: HV('left', 'top'), id: 'real-users', draw: EF.pic({ key: 'px_5357816', at: T0(s.s11), fx: 0.42, fy: 0.25 }) }));
  on(['s13', 's15'], 'other', () => full({ from: s.s13, to: s.s15 }, EF.orders({ typeAt: T0(s.s13) + 0.1, presses: [WT(s.s13, 'double-click'), WT(s.s13, 'double-click') + 0.22, WT(s.s13, 'like'), WT(s.s13, 'like') + 0.24, WT(s.s13, 'like') + 0.48, WT(s.s13, 'like') + 0.72, WT(s.s14, 'click')], tab: WT(s.s15, 'tabs') - 0.2, note: 'one customer, [seven] orders', noteAt: WT(s.s14, 'lot') }), { id: 'double-click' }));
  on(['s13'], 'snd', () => [WT(s.s13, 'double-click'), WT(s.s13, 'double-click') + 0.22, WT(s.s13, 'like'), WT(s.s13, 'like') + 0.24, WT(s.s13, 'like') + 0.48, WT(s.s13, 'like') + 0.72].forEach((a, i) => EF.sfx(i % 2 ? 'tick' : 'pop', a, -6)));
  on(['s16'], 'other', () => TH.tile(s.s16, { at: HV('br', 'br'), w: HV(560, 420), id: 'network', draw: EF.pic({ key: 'px_4559756', at: T0(s.s16), fx: 0.62, fy: 0.3, over: (t, r) => { const u = efU(r); EF.signal(t, r.x + r.w * 0.08, r.y + r.h * 0.1, 120 * u, { dropAt: WT(s.s16, 'drop') - 0.3 }); } }) }));
  on(['s16'], 'snd', () => EF.sfx('error', WT(s.s16, 'drop') + 0.6, -8));
  on(['s17'], 'other', () => TH.ots(s.s17, { side: 'auto', w: HV(720, undefined), id: 'two-hours', draw: EF.clock({ bg: EF.night, steps: [[T0(s.s17), '14:02'], [WT(s.s17, 'two hours') - 0.4, '14:47'], [WT(s.s17, 'two hours') - 0.2, '15:31'], [WT(s.s17, 'two hours'), '16:02']] }) }));
  on(['s18'], 'talk', () => TH.talk(s.s18, { frame: 'mid', push: [HV(1.16, 1.12), HV(1.26, 1.18)], id: 'nothing-strange' }));

  /* ---------- 1:05 01 duplicate submission ---------- */
  CH('s20', 1, 'Duplicate orders', 'One customer, two orders, two charges', 'ch1');
  on(['s21', 's22'], 'other', () => SPLIT({ from: s.s21, to: s.s22 }, 'right', EF.order({ presses: [WT(s.s21, 'place order'), WT(s.s22, 'again')], loadAt: WT(s.s21, 'slow') - 0.6 }), 'place-order', { ground: 'efInk' }));
  on(['s21', 's22'], 'snd', () => { EF.sfx('pop', WT(s.s21, 'place order'), -4); EF.sfx('pop', WT(s.s22, 'again'), -4); });
  on(['s23'], 'other', () => full(s.s23, EF.lanes({ at: T0(s.s23), a: 'Request 1', b: 'Request 2', target: 'Server', hitA: WT(s.s23, 'two requests'), hitB: WT(s.s23, 'two requests') + 0.2, result: [{ s: 'Order #1041  ·  Order #1042', at: WT(s.s23, 'creates') }] }), { id: 'two-requests' }));
  on(['s24'], 'other', () => TH.ots(s.s24, { side: 'auto', w: HV(760, undefined), id: 'charged-twice', draw: EF.charges({ at: WT(s.s24, 'charge on'), second: WT(s.s24, 'twice') - 0.2, noteAt: WT(s.s24, 'twice') }) }));
  on(['s25'], 'talk', () => TH.talk(s.s25, { frame: 'close', punch: ['double-click'], id: 'no-double' }));
  on(['s26'], 'other', () => TH.tile(s.s26, { at: HV('bl', 'br'), w: HV(560, 420), id: 'retry', draw: EF.lanes({ at: T0(s.s26), a: 'Sent', b: 'Retry', target: 'Order', hitA: WT(s.s26, 'sent'), hitB: WT(s.s26, 'retry') }) }));
  on(['s27'], 'other', () => full(s.s27, EF.dialog({ bg: EF.night, at: T0(s.s27) + 0.25, title: 'Send the form again?', body: '', btn: 'Continue', press: WT(s.s27, 'yes') }), { id: 'resubmit', dark: true }));
  on(['s27'], 'snd', () => EF.sfx('pop', WT(s.s27, 'yes'), -4));
  on(['s28'], 'other', () => TH.room(s.s28, { at: 'disabling', her: HV(0.38, 0.44), side: HV('right', 'bottom'), id: 'disable', draw: EF.disable({ press: WT(s.s28, 'first click') }) }));
  on(['s28'], 'snd', () => EF.sfx('pop', WT(s.s28, 'first click'), -5));
  on(['s30'], 'behind', () => TH.behind(s.s30, ['IDEMPOTENCY KEY'], { times: [WT(s.s30, 'idempotency')], id: 'idem', size: HV(170, 100), y: HV(250, 560) }));
  on(['s30'], 'other', () => SHORT && TH.half(s.s30, { side: 'top', size: 1060, id: 'idem-word', draw: EF.word({ lines: 'an [idempotency key]', at: T0(s.s30), hits: WT(s.s30, 'idempotency') }) }));
  on(['s32', 's33'], 'other', () => full({ from: s.s32, to: s.s33 }, EF.once({ presses: [WT(s.s32, 'doing'), WT(s.s32, 'twice')], label: 'Pay €39', unit: 'payment' }), { id: 'twice-once' }));
  on(['s32'], 'snd', () => { EF.sfx('pop', WT(s.s32, 'doing'), -5); EF.sfx('pop', WT(s.s32, 'twice'), -5); });
  on(['s34'], 'other', () => full(s.s34, EF.src('stripe', { bg: EF.night, at: T0(s.s34), hlAt: [WT(s.s34, 'same idea'), WT(s.s34, 'header')], crop: [0, 200], maxW: 1600 }), { id: 'stripe', dark: true }));
  on(['s35'], 'other', () => TH.ots(s.s35, { side: 'auto', w: HV(700, undefined), id: 'key-code', w: HV(700, undefined), draw: EF.code({ at: T0(s.s35), lines: [[['POST /orders', '#FFFFFF']], [['Idempotency-Key: ', '#B9C77A'], ['8f14e45f', EF.lime]], [['POST /orders  ', '#FFFFFF'], ['(retry)', EF.red]], [['Idempotency-Key: ', '#B9C77A'], ['8f14e45f', EF.lime]]], step: 0.3, result: { s: 'one payment, [not two]', at: WT(s.s35, 'second payment') } }) }));

  /* ---------- 2:03 02 race condition ---------- */
  CH('s36', 2, 'Race condition', 'Starbucks gift cards, and one item left in stock', 'ch2');
  on(['s37', 's38'], 'other', () => SPLIT({ from: s.s37, to: s.s38 }, 'right', null, 'race', { draw: EF.lanes({ at: T0(s.s37), a: 'Thing 1', b: 'Thing 2', target: 'Your code', targetSub: 'expects one, then the other', hitA: WT(s.s37, 'same time'), hitB: WT(s.s38, 'one after') }) }));
  on(['s39'], 'other', () => full(s.s39, EF.src('sakurity', { at: T0(s.s39), hlAt: WT(s.s39, 'gift cards') + 0.2, creditText: 'sakurity.com  ·  Egor Homakov  ·  21 May 2015' }), { id: 'starbucks' }));
  on(['s40', 's42'], 'other', () => SPLIT({ from: s.s40, to: s.s42 }, 'left', EF.gift({ at: T0(s.s40), sendAt: WT(s.s41, 'same time'), doneAt: WT(s.s42, '20') }), 'gift-cards'));
  on(['s42'], 'snd', () => { EF.sfx('cash', WT(s.s42, '20'), -5); });
  on(['s43', 's45'], 'other', () => TH.presenter({ from: s.s43, to: s.s45 }, { side: 'right', id: 'each-checked', draw: EF.lanes({ at: T0(s.s43), a: 'Request 1: balance ok?', b: 'Request 2: balance ok?', target: '$5', targetSub: 'moved twice', hitA: WT(s.s44, 'moved'), hitB: WT(s.s44, 'moved') + 0.05 }) }));
  on(['s46'], 'talk', () => TH.talk(s.s46, { frame: 'close', punch: ['app'], id: 'your-app' }));
  on(['s47', 's49'], 'other', () => full({ from: s.s47, to: s.s49 }, EF.lanes({ at: T0(s.s47), a: 'Buyer A', b: 'Buyer B', target: '1 left', targetSub: 'both see it', hitA: WT(s.s48, 'click buy'), hitB: WT(s.s48, 'click buy') + 0.06, result: [{ s: 'Order confirmed  ·  Order confirmed', at: WT(s.s49, 'both create') }] }), { id: 'one-left' }));
  on(['s49'], 'snd', () => EF.sfx('error', WT(s.s49, 'sold'), -6));
  on(['s51', 's52'], 'other', () => TH.room({ from: s.s51, to: s.s52 }, { at: 'only one', her: HV(0.36, 0.44), side: HV('right', 'bottom'), id: 'zero-rows', draw: EF.code({ at: T0(s.s51), lines: [[['UPDATE products', '#FFFFFF']], [['SET stock = stock - 1', '#FFFFFF']], [['WHERE id = 42 ', '#FFFFFF'], ['AND stock > 0', EF.lime]]], step: 0.35, result: [{ s: 'Buyer A: 1 row updated', at: WT(s.s51, 'only one') }, { s: 'Buyer B: [0 rows] = sold out', at: WT(s.s52, 'zero rows'), red: true }] }) }));

  /* ---------- 3:07 03 names ---------- */
  CH('s53', 3, 'Names', 'O’Brien, Null, and the names we never tested', 'ch3');
  on(['s54', 's56'], 'other', () => full({ from: s.s54, to: s.s56 }, EF.sql({ at: T0(s.s54), lines: ['SELECT * FROM users'], name: 'O\'Brien', typeAt: WT(s.s54, "o'brien") - 0.1, cps: 6, breakAt: WT(s.s55, 'ends the text'), errAt: WT(s.s56, 'breaks') }), { id: 'obrien', dark: true }));
  on(['s56'], 'snd', () => EF.sfx('error', WT(s.s56, 'breaks'), -5));
  on(['s57', 's58'], 'other', () => full({ from: s.s57, to: s.s58 }, EF.sql({ at: T0(s.s57) - 1, lines: ['SELECT * FROM users'], name: "O'; DROP TABLE users; --", inject: true, typeAt: WT(s.s57, 'type'), cps: 11, hlAt: WT(s.s57, 'on purpose'), dropAt: WT(s.s58, 'sql injection') }), { id: 'injection', enter: 0, sound: 'tick', db: -10, dark: true }));
  on(['s57'], 'snd', () => EF.sfx('glitch', WT(s.s58, 'sql injection'), -8));
  on(['s59'], 'other', () => full(s.s59, EF.src('bbc-head', { bg: EF.night, at: WT(s.s59, 'bbc') - 0.3, credit: false, maxW: 1300 }), { id: 'bbc', dark: true }));
  on(['s60', 's62'], 'other', () => full({ from: s.s60, to: s.s62 }, (t, r) => { const u = efU(r); const wide = r.w > r.h * 1.2; efBg(r, EF.night);
    EF.phoneForm({ title: 'Book a flight', at: T0(s.s60), fields: [{ label: 'First name', value: 'Jennifer', typeAt: WT(s.s60, 'jennifer') - 0.1 }, { label: 'Surname', value: 'Null', typeAt: WT(s.s60, 'null'), cps: 10, errAt: WT(s.s60, 'surname field'), errText: 'Surname is required.' }] })(t, wide ? { x: r.x, y: r.y, w: r.w * 0.45, h: r.h } : { x: r.x, y: r.y, w: r.w, h: r.h * 0.62 });
    EF.clip(t, 'bbc-jn', wide ? r.x + r.w * 0.47 : r.x + 60 * u, wide ? r.y + r.h * 0.34 : r.y + r.h * 0.64, wide ? r.w * 0.49 : r.w - 120 * u, { at: WT(s.s61, 'surname') - 0.3, hlAt: [WT(s.s61, 'null'), WT(s.s62, 'empty')], credit: false }); }, { id: 'jennifer-null', dark: true }));
  on(['s60'], 'snd', () => EF.sfx('error', WT(s.s60, 'surname field'), -5));
  on(['s63'], 'talk', () => TH.talk(s.s63, { frame: 'mid', id: 'null-apart' }));
  on(['s63'], 'glitch', () => TH.glitch(WT(s.s63, 'null'), { text: 'NULL' }));

  /* ---------- 4:12 04 the NULL licence plate ---------- */
  on(['s65'], 'other', () => SPLIT(s.s65, 'right', EF.plate({ at: T0(s.s65) + 0.4, credit: 'Story: Joseph Tartaro (droogie), DEF CON 27, 2019', creditAt: WT(s.s65, 'conference') }), 'plate'));
  on(['s66'], 'talk', () => TH.talk(s.s66, { frame: 'close', punch: ['null'], id: 'that-was' }));
  on(['s67'], 'other', () => full(s.s67, EF.plate({ at: T0(s.s67), left: true, tickets: [WT(s.s67, 'parking'), WT(s.s67, 'tickets'), WT(s.s67, 'over'), WT(s.s67, '12000') - 0.2, WT(s.s67, 'fines'), WT(s.s67, 'not his')], finesFrom: WT(s.s67, 'over'), finesAt: WT(s.s67, 'fines') }), { id: 'tickets' }));
  on(['s67'], 'snd', () => [WT(s.s67, 'parking'), WT(s.s67, 'tickets'), WT(s.s67, 'over'), WT(s.s67, 'fines')].forEach(a => EF.sfx('paper', a, -6)));
  on(['s68', 's69'], 'other', () => SPLIT({ from: s.s68, to: s.s69 }, 'left', EF.plateOnPhoto({ key: 'px_7549098', at: T0(s.s68), fy: 0.4, plateAt: WT(s.s69, 'linked') - 0.2, tickets: [WT(s.s69, 'linked') + 0.4, WT(s.s69, 'null') - 0.3, WT(s.s69, 'null') + 0.1] }), 'no-plate', { ground: 'efInk' }));
  on(['s70'], 'other', () => SHORT ? TH.talk(s.s70, { frame: 'mid', id: 'his-plate' }) : full(s.s70, EF.src('wired-head', { at: T0(s.s70) }), { id: 'his-plate' }));
  on(['s71'], 'other', () => TH.tile(s.s71, { at: HV('br', 'br'), w: HV(560, 420), id: 'wired', img: 'clip_wired-plate', credit: 'Photo: Elena Lacey / Getty Images' }));

  /* ---------- 4:27 05 leap years ---------- */
  CH('s72', 5, 'Leap years', 'The day Microsoft Azure went down', 'ch5');
  on(['s73', 's74'], 'other', () => TH.half({ from: s.s73, to: s.s74 }, { side: HV('right', 'top'), id: 'four-years', draw: EF.years({ at: T0(s.s73), title: 'Every [four] years', titleHits: WT(s.s73, 'four years') }) }));
  on(['s75'], 'other', () => TH.tile(s.s75, { at: HV('br', 'br'), w: HV(600, 420), id: 'azure', draw: EF.pic({ key: 'px_37730212', at: T0(s.s75), fx: 0.4 }) }));
  on(['s76', 's77'], 'other', () => full({ from: s.s76, to: s.s77 }, EF.cert({ at: T0(s.s76) + 0.1, lockAt: WT(s.s76, 'certificates'), yearAt: WT(s.s76, 'one year') }), { id: 'cert', dark: true }));
  on(['s78', 's79'], 'other', () => SPLIT({ from: s.s78, to: s.s79 }, 'left', EF.leap({ at: WT(s.s78, '2012') - 0.4, nextAt: WT(s.s78, 'gave'), errAt: WT(s.s79, "doesn't exist") }), 'leap-date', { ground: 'efInk' }));
  on(['s79'], 'snd', () => EF.sfx('error', WT(s.s79, "doesn't exist"), -4));
  on(['s80'], 'other', () => full(s.s80, EF.src('azure', { at: T0(s.s80), crop: [176, 352], hlAt: [WT(s.s80, 'certificate'), WT(s.s80, 'failed')] }), { id: 'azure-down' }));

  /* ---------- 5:41 06 time zones and daylight saving ---------- */
  CH('s82', 6, 'Daylight saving', 'When 3:30 a.m. happens twice', 'ch6');
  on(['s84'], 'other', () => TH.tile(s.s84, { at: HV('br', 'br'), w: HV(560, 420), id: 'estonia', draw: EF.pic({ key: 'px_35838020', at: T0(s.s84), fy: 0.6, over: (t, r) => withA(efE(t, WT(s.s84, 'estonia'), 0.4), () => { const u = efU(r); EF.capTxt('TALLINN, ESTONIA', r.x + 60 * u, r.y + 100 * u, F.mono(Math.max(32, 34 * u)), '#FFFFFF', 'left'); }) }) }));
  on(['s85', 's87'], 'other', () => full({ from: s.s85, to: s.s87 }, EF.clock({ label: 'Tallinn  ·  29 March 2026', steps: [[T0(s.s85), '02:59'], [WT(s.s86, 'straight') , '04:00', true], [WT(s.s87, 'never'), '04:00', true]], job: null }), { id: 'spring' }));
  on(['s86'], 'snd', () => EF.sfx('tick', WT(s.s86, 'straight'), -4));
  on(['s88', 's90'], 'other', () => TH.presenter({ from: s.s88, to: s.s90 }, { side: 'right', id: 'autumn', draw: EF.clock({ label: 'Tallinn  ·  25 October 2026', steps: [[T0(s.s88), '03:59'], [WT(s.s89, 'back'), '03:00', true], [WT(s.s90, 'twice'), '03:30', true]] }) }));
  on(['s91', 's94'], 'other', () => full({ from: s.s91, to: s.s94 }, EF.clock({ label: 'Online shop  ·  daily sales report', steps: [[T0(s.s91), '03:30']], job: { s: 'Daily sales report, 03:30', at: WT(s.s91, 'daily'), state: [[WT(s.s93, 'not run'), 'NEVER RAN', true], [WT(s.s94, 'twice'), 'RAN TWICE', true]] } }), { id: 'report-job' }));

  /* ---------- 5:54 07 unicode ---------- */
  CH('s96', 7, 'Unicode names', 'Seven letters, thirteen bytes', 'ch7');
  on(['s97', 's98'], 'other', () => TH.tile({ from: s.s97, to: s.s98 }, { at: HV('br', 'br'), w: HV(620, 420), id: 'tone-marks', draw: EF.word({ lines: 'Adé[bá]yọ̀', at: T0(s.s97), hits: WT(s.s97, 'tone marks') }) }));
  on(['s99', 's102'], 'other', () => full({ from: s.s99, to: s.s102 }, EF.bytes({ typeAt: T0(s.s99) + 0.2, sevenAt: WT(s.s100, 'seven'), strlenAt: WT(s.s100, 'count bytes'), bytesAt: WT(s.s101, 'letters'), thirteenAt: WT(s.s102, '13') }), { id: 'bytes', until: s.s103 ? T0(s.s103) - 0.05 : undefined }));
  on(['s103', 's104'], 'other', () => SPLIT({ from: s.s103, to: s.s104 }, 'right', EF.nameLen({ name: 'Adébáyọ̀ Ọláolúwa', typeAt: T0(s.s103) + 0.2, letters: 17, bytes: 26, limit: 20, rejectAt: WT(s.s104, 'reject') }), 'max-20', { ground: 'efInk' }));
  on(['s104'], 'snd', () => EF.sfx('error', WT(s.s104, 'reject'), -5));
  on(['s105'], 'other', () => TH.ots(s.s105, { side: 'auto', w: HV(700, undefined), id: 'unicode-fix', draw: EF.code({ at: T0(s.s105), lines: [[['mb_strlen($name)', '#FFFFFF'], ['  // 17', EF.lime]], [['Normalizer::normalize($name)', '#FFFFFF']]], step: WT(s.s105, 'normalize') - T0(s.s105), sound: false }) }));

  /* ---------- 6:57 08 Hyrum's law ---------- */
  CH('s106', 8, 'Hyrum’s law', 'Named after Hyrum Wright', 'ch8');
  on(['s109', 's111'], 'other', () => full({ from: s.s109, to: s.s111 }, EF.src('hyrum', { bg: EF.night, at: T0(s.s109), hlAt: [WT(s.s109, 'sufficient'), WT(s.s111, 'depended')], crop: [190, 312], maxW: 1600 }), { id: 'hyrum-quote', dark: true }));
  on(['s112', 's114'], 'other', () => TH.half({ from: s.s112, to: s.s114 }, { side: HV('right', 'top'), id: 'api-order', draw: EF.api({ at: T0(s.s112) + 0.3 }) }));
  on(['s115', 's118'], 'other', () => full({ from: s.s115, to: s.s118 }, EF.api({ at: T0(s.s115) - 0.5, pickAt: WT(s.s116, 'last product'), flipAt: WT(s.s117, 'add an index') }), { id: 'api-break' }));
  on(['s117'], 'snd', () => EF.sfx('error', WT(s.s118, 'break'), -5));
  on(['s119'], 'talk', () => TH.talk(s.s119, { frame: 'close', punch: ['broken'], id: 'to-them' }));
  on(['s120', 's121'], 'talk', () => TH.talk({ from: s.s120, to: s.s121 }, { frame: 'mid', push: [HV(1.06, 1.08), HV(1.16, 1.14)], id: 'to-us' }));

  /* ---------- 7:45 closing ---------- */
  on(['s123', 's124'], 'other', () => TH.presenter({ from: s.s123, to: s.s124 }, { side: 'right', id: 'so-much-more', draw: EF.montage({ items: [{ label: '01', big: '×2' }, { label: '04', big: 'NULL' }, { label: '05', big: '29 FEB', red: true }, { label: '07', big: '13' }], times: [T0(s.s123) + 0.1, T0(s.s123) + 0.4, T0(s.s123) + 0.7, T0(s.s123) + 1.0] }) }));
  on(['s125'], 'talk', () => TH.talk(s.s125, { frame: 'close', push: [HV(1.38, 1.22), HV(1.5, 1.3)], id: 'cant-predict' }));
  on(['s126'], 'card', () => EF.card(s.s126, ['wouldn’t', '*ship anything*'], { id: 'ship', times: [WT(s.s126, "wouldn't"), WT(s.s126, 'ship'), WT(s.s126, 'anything')] }));
  on(['s127'], 'talk', () => TH.talk(s.s127, { frame: 'mid', push: [HV(1.1, 1.08), HV(1.2, 1.16)], id: 'catch-few' }));
  on(['s128'], 'talk', () => TH.talk(s.s128, { frame: 'wide', push: [HV(1.0, 1.08), HV(1.08, 1.14)], id: 'all-of-them' }));

  TH.talk = talk0; TH.tile = tile0; TH.half = half0; TH.room = room0; TH.ots = ots0; TH.presenter = pres0;
  if (SHORT && FOOT.dur) TH.segs.forEach(sg => { if (sg.t1 > FOOT.dur) sg.t1 = FOOT.dur; });   // 2026-11-10: no graphic runs on into the end card (outroCard)
  return s;
}
