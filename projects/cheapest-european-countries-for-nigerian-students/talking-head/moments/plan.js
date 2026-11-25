/* cheapest-countries: the edit plan, shared by the FULL edit (moments/full.js) and every short (shorts/shNN.js).
 * PC_SENT (film/scenes/pcsent.js) = her phrases in order. PC_PLAN(mode) finds the ones inside this moment and runs every layout
 * whose phrases are all there. In a short: the first phrase is always her talking (no overlay at the start), no L3 shout, no
 * behind / stack / pops, at most one keyword, full-frame graphics become a top panel over her (L14, her at the bottom).
 * Change a layout here and the full edit and the shorts that hold it change together.
 * Corrections (FEEDBACK 2026-11-02): France 964 hours = a "pause her" screen (talking-head.json "pauses" fix-964) + caption;
 * France proof of funds = WAS €615 / NOW €877.50 label; Germany = "280 half days" label + caption; Austria = €1,505.84 label;
 * the Czech "$6,000" is cut. */
'use strict';
const PCX = { skipIds: new Set() };
function PC_PLAN(mode) {
  const s = {}; for (const [k, q] of Object.entries(PC_SENT)) { try { s[k] = P(q); } catch (e) { /* not in this moment */ } }
  window.PC_MISSING = Object.keys(PC_SENT).filter(k => !s[k]); if (mode !== 'short') console.error('PLAN-MISSING', window.PC_MISSING.join(' '));
  const keys = Object.keys(s); const first = keys[0]; let kws = 0; const short = mode === 'short';
  const on = (refs, kind, fn) => {
    if (!refs.length || refs.some(r => !s[r])) return;
    if (short) {
      if (kind === 'behind' || kind === 'pops' || kind === 'stack') return;
      if (refs.includes(first) && kind !== 'talk') return;
      if (kind === 'kw') return;
      if (kind === 'card') return;
    }
    try { fn(); } catch (e) { console.error('PLAN-ERR', refs.join(','), e.message); }
  };
  const w = (k, word) => WT(s[k], word);
  const T0 = (ph) => ph.t - 0.12;
  const FR = (a, b) => ({ from: s[a], to: s[b || a] });
  const capRoom = V(170, 0);   // 16:9 full-frame graphics keep her caption band free
  // the layouts, with this look's defaults (and the shorts' mapping)
  const full = (sp, draw, id, o = {}) => short ? TH.split(sp, { her: 0.42, side: 'bottom', id, draw, ...o }) : PC.full(sp, draw, { id, ...o });
  const split = (sp, draw, id, side = 'right', o = {}) => TH.split(sp, { her: V(0.38, 0.42), side: V(side, 'bottom'), id, draw, ...o });
  const tile = (sp, draw, id, at = 'br', o = {}) => short ? TH.split(sp, { her: 0.42, side: 'bottom', id, draw }) : TH.tile(sp, { at, w: V(560, 440), id, draw, edge: 'rgba(18,18,18,0.3)', edgePx: 1, ...o });
  const ots = (sp, draw, id, o = {}) => TH.ots(sp, { side: 'auto', w: V(820, undefined), ar: V(16 / 10, 16 / 10), id, draw, edge: 'rgba(0,0,0,0)', edgePx: 0.01, ...o });
  const DK = PC.dk; const pic = (sp, key, id, o = {}) => full(sp, PC.pic({ key, at: (sp.from || sp).t - 0.12, ...o }), id, { ground: 'pcBlack', sound: o.sound || 'shutter' });
  const pres = (sp, draw, id, side = 'right') => TH.presenter(sp, { side, id, gr: [0, 0, W, H], ground: 'pcBlack', draw });
  const SRC = (sp, name, id, o = {}) => full(sp, DK(PC.clip(name, { hcrop: true, minS: 2, maxS: 2.6, capRoom, ...o })), id, { ground: 'pcBlack' });   // a real page, big (about 80-90 % of the width), its highlighted line readable
  const room = (sp, draw, id, at, side = 'right') => short ? split(sp, draw, id, side) : TH.room(sp, { at, side: V(side, 'bottom'), her: V(0.38, 0.42), id, draw });
  const KW = (sp, text, id, o = {}) => PC.kw(sp, text, { id, ...o });
  const talk = (sp, frame, id, o = {}) => TH.talk(sp, { frame: short ? 'wide' : frame, id, ...(short ? {} : o) });   // shorts: one framing, no automatic zooms (her note 2026-11-12)
  // 2026-11-10: shorts with a format (manifest "fmt", moments/formats.js PCF) place graphics / her framing by format; the rest as before
  const TH0 = { talk: TH.talk, tile: TH.tile, cutaway: TH.cutaway, split: TH.split, presenter: TH.presenter, room: TH.room, half: TH.half, ots: TH.ots };
  const fmtOn = short && typeof PCF !== 'undefined' && PCF.setup(s, first);
  if (short && first && !fmtOn) TH.talk(s[first], { frame: 'wide', id: 'hook' });

  /* ---------- 0:00 what "cheap" means ---------- */
  on(['a01'], 'talk', () => talk(s.a01, 'mid', 'open', { push: [V(1.0, 1.04), V(1.08, 1.1)] }));
  on(['a02', 'a04'], 'other', () => full(FR('a02', 'a04'), PC.label({ name: 'Germany', flag: 'DE', kicker: 'TUITION', price: '€0', at: T0(s.a02), priceAt: w('a02', 'free'), ast: w('a03', 'it is'),
    stk: { lines: ['*+ proof of funds'], at: w('a04', 'proof of funds'), size: 0.07 }, push: { at: w('a04', 'proof of funds'), k: 0.12 }, capRoom }), 'open-label'));
  on(['a02'], 'other', () => { sfx('bell', w('a02', 'free'), -5); sfx('ast', w('a03', 'it is'), -4); sfx('sticker', w('a04', 'but'), -2); sfx('marker', w('a04', 'proof of funds'), -6); });
  on(['a05'], 'other', () => split(s.a05, PC.shelf({ title: '9 COUNTRIES', at: T0(s.a05) + 0.15, stagger: 0.12, cols: V(3, 3),
    items: [['Germany', 'DE'], ['France', 'FR'], ['Italy', 'IT'], ['Austria', 'AT'], ['Czechia', 'CZ'], ['Poland', 'PL'], ['Estonia', 'EE'], ['Norway', 'NO'], ['Finland', 'FI']].map(([n, f]) => ({ name: n, flag: f, price: '€?' })) }), 'nine', 'right', { her: V(0.34, 0.42) }));
  on(['a06'], 'talk', () => talk(s.a06, 'close', 'official'));
  on(['a07', 'a08'], 'other', () => pic(FR('a07', 'a08'), 'laptop-library', 'check-sources', { fx: 0.4 }));
  on(['a09'], 'talk', () => talk(s.a09, 'mid', 'links', { push: [1.0, 1.06] }));

  /* ---------- 0:41 cheap = tuition + proof of funds ---------- */
  on(['b01', 'b02'], 'other', () => full(FR('b01', 'b02'), PC.phrase({ lines: [{ s: 'Cheap =', at: w('b01', 'cheap') }, { s: '~tuition~ +', times: [w('b02', 'tuition'), w('b02', 'tuition') + 0.2] }, { s: '~proof of funds~', times: [w('b02', 'proof'), w('b02', 'of'), w('b02', 'funds')] }], capRoom }), 'cheap', { sound: 'shutter', ground: 'pcBlack' }));
  if (short) on(['b02'], 'other', () => split([w('b02', 'tuition') - 0.35, s.b02.e + 0.45], PC.pair({ a: { name: 'Number 1', price: 'Tuition', at: w('b02', 'tuition') - 0.2 }, b: { name: 'Number 2', price: 'Proof of funds', red: true, at: w('b02', 'proof') - 0.2 }, vs: '+' }), 'sh-two'));
  on(['b03', 'b04'], 'other', () => ots(FR('b03', 'b04'), PC.pic({ key: 'passport-euro', at: T0(s.b03), fx: 0.5 }), 'pof-def'));
  if (short && typeof PCF !== 'undefined' && PCF.B() === 37) on(['b05', 'b06'], 'other', () => full(FR('b05', 'b06'), DK(PC.label({ name: 'Estonia', flag: 'EE', kicker: 'PROOF OF FUNDS · STUDENTS', price: '€880', priceAt: w('b06', '880'), line: 'a month', at: T0(s.b05), side: 'center' })), 'ee-880', { ground: 'pcBlack' }));   // 2026-11-12: sh07 keeps the Tallinn photo
  else on(['b05', 'b06'], 'other', () => pres(FR('b05', 'b06'), PC.city({ photo: 'tallinn-street', credit: 'Argo Allvee', name: 'Estonia', flag: 'EE', kicker: 'PROOF OF FUNDS', price: '€880', priceAt: w('b06', '880'), line: 'a month · students', at: T0(s.b05) }), 'ee-880', 'right'));
  on(['b06'], 'other', () => sfx('pop', w('b06', '880'), -4));
  on(['b07'], 'talk', () => talk(s.b07, 'mid', 'baseline'));
  on(['b08'], 'talk', () => talk(s.b08, 'close', 'changes-talk', { push: [1.0, 1.06] }));
  on(['b09', 'b11'], 'other', () => full(FR('b09', 'b11'), PC.trio({ items: [{ key: 'lecture', word: 'LANGUAGE', at: T0(s.b09) + 0.3 }, { key: 'keys', word: 'RENT', at: w('b10', 'rent'), fx: 0.55 }, { key: 'work', word: 'WORK', at: w('b11', 'work') }], capRoom }), 'changes', { ground: 'pcBlack' }));
  on(['b09'], 'other', () => { sfx('tick', w('b09', 'language'), -4); sfx('tick', w('b10', 'rent'), -4); sfx('tick', w('b11', 'work'), -4); });
  on(['b12'], 'talk', () => talk(s.b12, 'close', 'big-thing', { punch: ['big'] }));
  on(['b13', 'b14'], 'talk', () => talk(FR('b13', 'b14'), 'mid', 'every-year', { push: [1.0, 1.07] }));
  on(['b15'], 'talk', () => talk(s.b15, 'wide', 'best'));

  /* ---------- 1:51 Germany ---------- */
  on(['c01'], 'other', () => full(s.c01, PC.city({ photo: 'berlin', credit: 'Irina Nesterenko', name: 'Germany', flag: 'DE', kicker: 'COUNTRY 1', at: T0(s.c01) + 0.05 }), 'de-city', { hold: 0.9, ground: 'pcBlack' }));
  on(['c02'], 'talk', () => talk(s.c02, 'mid', 'everybody'));
  on(['c03', 'c04'], 'other', () => split(FR('c03', 'c04'), PC.label({ name: 'Germany', flag: 'DE', kicker: 'TUITION', price: '€0', at: T0(s.c03), priceAt: w('c03', 'tuition'), side: 'center' }), 'de-free', 'right'));
  on(['c05', 'c06'], 'other', () => ots(FR('c05', 'c06'), PC.label({ name: 'Semester contribution', flag: 'DE', price: '€100s', at: T0(s.c05), priceAt: w('c06', 'few hundred'), side: 'center', w: 1100 }), 'de-contrib'));
  on(['c07'], 'other', () => SRC(s.c07, 'de-bw', 'de-bw', { at: T0(s.c07), hl: w('c07', 'exceptions') }));
  on(['c08', 'c11'], 'other', () => full(FR('c08', 'c11'), PC.label({ name: 'Germany', flag: 'DE', kicker: 'TUITION', price: '€0', at: T0(s.c08), priceAt: T0(s.c08) + 0.15, ast: w('c08', 'proof of funds'),
    stk: { lines: ['*Proof of funds:', '€11,904 a year'], at: w('c10', '11,904') - 0.1, ul: w('c11', 'blocked') }, clip: { name: 'de-daad', at: w('c09', '992') - 0.3, hl: w('c09', 'every month') }, capRoom }), 'de-pof'));
  on(['c08'], 'other', () => { sfx('ast', w('c08', 'proof of funds'), -4); sfx('marker', w('c09', 'every month'), -6); sfx('sticker', w('c10', '11,904') - 0.1, -2); });
  on(['c12', 'c13'], 'other', () => full(FR('c12', 'c13'), PC.blocked({ at: T0(s.c12) + 0.1, lockAt: w('c12', 'start'), start: 11904, step: 992, payAt: w('c13', 'fixed amount'), every: 0.3, n: 12 }), 'blocked', { ground: 'pcBlack' }));
  on(['c12'], 'other', () => { sfx('coins', w('c12', 'start'), -6); sfx('tick', w('c13', 'fixed amount'), -4); });
  on(['c14', 'c15'], 'talk', () => talk(FR('c14', 'c15'), 'close', 'de-2027', { punch: ['2027'] }));
  on(['c16'], 'other', () => split(s.c16, DK(PC.pair({ a: { name: 'Full days', flag: 'DE', price: '140', line: 'a year', at: T0(s.c16) + 0.2, priceAt: w('c16', '140') - 0.1 }, b: { name: 'Half days', flag: 'DE', price: '280', line: 'a year', at: w('c16', 'full days') + 0.5 }, vs: 'OR' })), 'de-work', 'left', { ground: 'pcBlack' }));
  on(['c17'], 'talk', () => talk(s.c17, 'wide', 'de-lang'));
  on(['c18'], 'talk', () => talk(s.c18, 'close', 'de-afford', { punch: ['affordable'] }));
  on(['c19', 'c20'], 'other', () => room(FR('c19', 'c20'), PC.label({ name: 'Germany', flag: 'DE', kicker: 'PROOF OF FUNDS', price: '€11,904', priceAt: w('c19', 'proof'), red: true, side: 'center' }), 'de-plan', 'plan for'));

  /* ---------- 3:28 France ---------- */
  on(['d01'], 'other', () => full(s.d01, PC.city({ photo: 'paris', credit: 'Kenrick Baksh', name: 'France', flag: 'FR', kicker: 'COUNTRY 2', at: T0(s.d01) + 0.05 }), 'fr-city', { hold: 0.9, ground: 'pcBlack' }));
  on(['d02', 'd03'], 'other', () => SRC(FR('d02', 'd03'), 'fr-icef', 'fr-diff', { at: T0(s.d02), hl: w('d02', 'higher fee'), stk: { lines: ['DIFFERENTIATED FEES'], at: w('d03', 'differentiated') } }));
  const b66 = short && typeof PCF !== 'undefined' && PCF.B() === 66;   // board 66 (France short): the master's fee pops up as the real Cnam page when she says it
  if (b66) on(['d05'], 'other', () => SRC([w('d05', '3,950') - 0.3, s.d05.e + 0.45], 'fr-cnam', 'fr-cnam', { at: w('d05', '3,950') - 0.3, hl: w('d05', '3,950'), minS: 3, maxS: 4 }));
  on(['d04', 'd05'], 'other', () => full([w('d04', '2,902') - 0.35, b66 ? w('d05', '3,950') - 0.3 : s.d05.e + 0.45], DK(PC.pair({ a: { name: "Bachelor's", flag: 'FR', kicker: 'A YEAR', price: '€2,902', at: w('d04', '2,902') - 0.2 }, b: { name: "Master's", flag: 'FR', kicker: 'A YEAR', price: '€3,950', at: w('d05', '3,950') - 0.2 }, capRoom })), 'fr-fees', { ground: 'pcBlack' }));
  on(['d06', 'd07'], 'talk', () => talk(FR('d06', 'd07'), 'mid', 'fr-decree', { push: [1.0, 1.08] }));
  on(['d08', 'd09'], 'other', () => ots(FR('d08', 'd09'), PC.label({ name: 'France · before', flag: 'FR', kicker: 'PROOF OF FUNDS', price: '€615', priceAt: w('d08', '615') - 0.1, line: 'a month', side: 'center' }), 'fr-615'));
  on(['d10'], 'other', () => SRC([T0(s.d10), w('d11', '878') - 0.35], 'fr-funds', 'fr-funds', { at: T0(s.d10), hl: w('d10', 'august'), minS: 1.4 }));
  on(['d10', 'd11'], 'other', () => full([w('d11', '878') - 0.35, s.d11.e + 0.45], PC.label({ name: 'France', flag: 'FR', kicker: 'PROOF OF FUNDS', was: { s: '€615', at: w('d11', '878') - 0.35 }, price: '€877.50', priceAt: w('d11', '878') - 0.1, redAt: w('d11', '878') - 0.1,
    line: 'a month', stk: { lines: ['PRICE UP'], at: w('d11', '878'), size: 0.07 }, at: w('d11', '878') - 0.35, capRoom }), 'fr-877'));
  on(['d10'], 'other', () => { sfx('sticker', w('d10', 'raised'), -2); sfx('pop', w('d11', '878') - 0.1, -3); });
  on(['d12', 'd13'], 'talk', () => talk(FR('d12', 'd13'), 'mid', 'fr-10k'));
  on(['d14'], 'talk', () => talk(s.d14, 'mid', 'own-country', { push: [1.0, 1.06] }));
  on(['d15', 'd16'], 'other', () => full([w('d15', 'add') - 0.35, s.d16.e + 0.45], PC.sum({ name: 'France', flag: 'FR', tuition: { price: '€3,950', at: w('d15', 'add') }, funds: { price: '€10,530', at: w('d15', 'two numbers') }, total: { lines: ['= €14,480 first year'], at: w('d16', '14,480') - 0.1 }, capRoom }), 'fr-sum'));
  on(['d16'], 'other', () => sfx('sticker', w('d16', '14,480') - 0.1, -2));
  on(['d17', 'd18'], 'other', () => split(FR('d17', 'd18'), PC.pair({ title: 'FIRST YEAR', a: { name: 'Germany', flag: 'DE', price: '€11,904', at: T0(s.d17) + 0.2, priceAt: w('d17', '11,900') - 0.2 }, b: { name: 'France', flag: 'FR', price: '€14,480', red: true, line: '+ about €2,500', at: w('d18', '2,500') - 0.2 } }), 'de-vs-fr', 'right'));
  on(['d19'], 'other', () => SRC(s.d19, 'fr-work', 'fr-work', { at: T0(s.d19), hl: w('d19', '964') }));
  on(['d20'], 'talk', () => talk(s.d20, 'close', 'fr-lang'));
  on(['d22', 'd23'], 'talk', () => talk(FR('d22', 'd23'), 'close', 'fr-math', { punch: ['math'] }));

  /* ---------- 5:26 Italy ---------- */
  on(['e01', 'e02'], 'other', () => full(FR('e01', 'e02'), PC.city({ photo: 'bologna', credit: 'Pascal Küffer', name: 'Italy', flag: 'IT', kicker: 'COUNTRY 3', at: T0(s.e01) + 0.05 }), 'it-city', { ground: 'pcBlack' }));
  on(['e03', 'e05'], 'other', () => ots(FR('e03', 'e05'), PC.pic({ key: 'family-papers', at: T0(s.e03), fx: 0.5, over: (t, r) => PC.sticker(t, w('e04', 'isee'), ['ISEE PARIFICATO'], r.x + r.w - V(60, 40), r.y + r.h - V(150, 200), V(64, 58), { key: 'isee-stk', align: 'right', ink: '#FFFFFF' }) }), 'it-isee'));
  on(['e06'], 'talk', () => talk(s.e06, 'mid', 'it-check'));
  on(['e07', 'e09'], 'other', () => split(FR('e07', 'e09'), DK(PC.label({ name: 'Italy', flag: 'IT', kicker: 'PROOF OF FUNDS', price: '€10,179.85', priceAt: w('e08', '10,179.85') - 0.1, line: 'a year', at: T0(s.e07), side: 'center' })), 'it-pof', 'right', { ground: 'pcBlack' }));
  on(['e10'], 'talk', () => talk(s.e10, 'wide', 'it-early', { push: [1.0, 1.06] }));
  on(['e11'], 'talk', () => talk(s.e11, 'mid', 'it-modest', { punch: ['modest'] }));
  on(['e12'], 'other', () => ots(s.e12, PC.pair({ a: { name: 'Germany', flag: 'DE', price: '€11,904', at: T0(s.e12) }, b: { name: 'Italy', flag: 'IT', price: '€10,180', at: w('e12', "germany's") - 0.2 } }), 'it-vs-de'));

  /* ---------- 6:38 Austria ---------- */
  on(['f01', 'f02'], 'other', () => full(FR('f01', 'f02'), PC.city({ photo: 'vienna', credit: 'Jonas Horsch', name: 'Austria', flag: 'AT', kicker: 'COUNTRY 4', at: T0(s.f01) + 0.05 }), 'at-city', { ground: 'pcBlack' }));
  on(['f03', 'f04'], 'other', () => split(FR('f03', 'f04'), PC.label({ name: 'Austria', flag: 'AT', kicker: 'A SEMESTER · €1,505.84 A YEAR', price: '€726.72', priceAt: w('f03', '726.72') - 0.1, at: T0(s.f03), side: 'center' }), 'at-fee', 'right'));
  on(['f05', 'f07'], 'other', () => SRC(FR('f05', 'f07'), 'at-list', 'at-list', { at: T0(s.f05), hl: ['benin', 'ethiopia', 'senegal', 'togo', 'uganda'].map(x => w('f06', x)), zoomHl: 2, minS: 2, hleft: true, stk: { lines: ['NIGERIA: NOT ON THE LIST'], at: w('f07', 'nigeria') } }));
  on(['f07'], 'other', () => sfx('sticker', w('f07', 'nigeria'), -2));
  on(['f08'], 'talk', () => talk(s.f08, 'close', 'at-age', { punch: ['age'] }));
  on(['f09', 'f11'], 'other', () => full(FR('f09', 'f11'), PC.pair({ photo: 'vienna', credit: 'Jonas Horsch', a: { name: 'Under 24', flag: 'AT', kicker: 'A MONTH', price: '€722.58', at: w('f09', 'under') - 0.1, priceAt: w('f09', '722.58') - 0.1 }, b: { name: '24 and over', flag: 'AT', kicker: 'A MONTH', price: '€1,308.39', red: true, at: w('f10', '24') - 0.1, priceAt: w('f10', '1,308.39') - 0.1 }, capRoom }), 'at-age-pair'));
  on(['f11'], 'other', () => SRC(s.f11, 'at-oead', 'at-oead', { at: T0(s.f11), hl: [w('f11', '12'), w('f11', 'advance')] }));
  on(['f12', 'f13'], 'other', () => room([w('f12', '8k') - 0.35, s.f13.e + 0.45], PC.pair({ title: 'PROOF OF FUNDS · A YEAR', a: { name: 'Under 24', flag: 'AT', price: '€8,671', at: w('f12', '8k') - 0.2 }, b: { name: '24 and over', flag: 'AT', price: '€15,700', red: true, at: w('f13', '15,700') - 0.2 } }), 'at-year', 'under', 'left'));
  on(['f15'], 'talk', () => talk(s.f15, 'close', 'at-younger', { punch: ['younger'] }));

  /* ---------- 7:53 Czech Republic and Poland ---------- */
  on(['g01', 'g03'], 'other', () => full(FR('g01', 'g03'), PC.city({ photo: 'prague', credit: 'Ceyda Çiftci', name: 'Czech Republic', flag: 'CZ', kicker: 'TUITION IN CZECH', price: '€0', priceAt: w('g02', 'free'), at: T0(s.g01) + 0.05 }), 'cz-city', { ground: 'pcBlack' }));
  on(['g04'], 'talk', () => talk(s.g04, 'mid', 'cz-english'));
  on(['g05'], 'other', () => SRC([T0(s.g05), w('g05', '12 month') - 0.1], 'cz-mv', 'cz-mv', { at: T0(s.g05), hl: w('g05', 'crowns') }));
  on(['g05', 'g06'], 'other', () => split([w('g05', '12 month') - 0.1, s.g06.e + 0.45], PC.label({ name: 'Czech Republic', flag: 'CZ', kicker: 'PROOF OF FUNDS · 12 MONTHS', price: '115,810 Kč', at: w('g05', '12 month') - 0.1, side: 'center' }), 'cz-pof', 'right'));
  on(['g07', 'g10'], 'other', () => pres(FR('g07', 'g10'), PC.city({ photo: 'warsaw', credit: 'Caio', name: 'Poland', flag: 'PL', kicker: 'PROOF OF FUNDS', price: '776 zł', priceAt: w('g08', '776') - 0.1, line: 'a month + rent', lineAt: w('g08', 'rent'), at: T0(s.g07) }), 'pl-city', 'left'));

  /* ---------- 8:50 Estonia ---------- */
  on(['h02'], 'talk', () => talk(s.h02, 'close', 'ee-me'));
  on(['h03'], 'other', () => ots(s.h03, PC.pic({ key: 'lecture', at: T0(s.h03), fx: 0.5 }), 'ee-fees'));
  on(['h04'], 'other', () => ots(s.h04, DK(PC.label({ name: 'Tallinn University', flag: 'EE', kicker: 'A YEAR', price: '€4,000–5,200', priceAt: w('h04', '4,000') - 0.1, at: T0(s.h04), side: 'center' })), 'ee-tlu'));
  on(['h05', 'h07'], 'other', () => full(FR('h05', 'h07'), PC.label({ name: 'My tuition', flag: 'EE', kicker: 'A YEAR', was: { s: '€6,000', at: w('h05', '6,000') - 0.1, strike: w('h07', 'increased') }, price: '€7,000', priceAt: w('h07', '7k') - 0.15, redAt: w('h07', '7k') - 0.15,
    stk: { lines: ['PRICE UP'], at: w('h07', '7k') - 0.15, size: 0.07 }, at: T0(s.h05), capRoom }), 'ee-mine'));
  on(['h07'], 'other', () => { sfx('sticker', w('h07', 'increased'), -2); sfx('pop', w('h07', '7k') - 0.15, -3); });
  on(['h08', 'h10'], 'other', () => pres(FR('h08', 'h10'), PC.city({ photo: 'tallinn-street', credit: 'Argo Allvee', name: 'Estonia', flag: 'EE', kicker: 'PROOF OF FUNDS', price: '€880', priceAt: w('h08', '880') - 0.1, line: 'a month', at: T0(s.h08) }), 'ee-pof', 'right'));
  on(['h11', 'h12'], 'other', () => room(FR('h11', 'h12'), PC.pic({ key: 'work', at: T0(s.h11), fx: 0.45 }), 'ee-work', 'work', 'left'));
  on(['h13'], 'talk', () => talk(s.h13, 'close', 'ee-exp', { punch: ['experience'] }));
  on(['h15'], 'talk', () => talk(s.h15, 'mid', 'ee-program', { push: [1.0, 1.06] }));

  /* ---------- 10:01 Norway and Finland ---------- */
  on(['i01', 'i02'], 'other', () => full(FR('i01', 'i02'), PC.city({ photo: 'oslo', credit: 'Eswaran Arulkumar', name: 'Norway', flag: 'NO', kicker: 'FEES FOR NON-EU STUDENTS', line: 'since 2023', lineAt: w('i02', '2023'), at: T0(s.i01) + 0.05 }), 'no-city', { ground: 'pcBlack' }));
  on(['i03', 'i04'], 'other', () => split(FR('i03', 'i04'), PC.label({ name: 'Norway · NHH', flag: 'NO', kicker: "MASTER'S · A YEAR", price: 'NOK 204,000', priceAt: w('i04', '204,000') - 0.1, red: true, at: T0(s.i03), side: 'center' }), 'no-nhh', 'right'));
  on(['i05'], 'other', () => SRC(s.i05, 'no-udi', 'no-udi', { at: T0(s.i05), hl: w('i05', '170,000') }));
  on(['i06', 'i07'], 'other', () => pres(FR('i06', 'i07'), PC.city({ photo: 'helsinki', credit: 'Antti Kulmanen', name: 'Finland', flag: 'FI', kicker: "UEF · MASTER'S · A YEAR", price: '€10,000 – 12,000', priceAt: w('i07', '10,000') - 0.1, red: true, at: T0(s.i06) }), 'fi-city', 'left'));
  on(['i08'], 'other', () => tile(s.i08, PC.label({ name: 'Finland', flag: 'FI', kicker: 'PROOF OF FUNDS', price: '€9,600', priceAt: w('i08', '9,600') - 0.1, line: 'a year', at: T0(s.i08), side: 'center' }), 'fi-pof', 'tr', { w: V(620, 440) }));
  on(['i09'], 'other', () => pic(s.i09, 'graduation', 'scholar', { fy: 0.4 }));
  on(['i11'], 'talk', () => talk(s.i11, 'mid', 'expensive', { punch: ['expensive'] }));

  /* ---------- 11:15 which country is cheapest for you? ---------- */
  on(['j01', 'j03'], 'other', () => pic(FR('j01', 'j03'), 'calculator', 'numbers', { fx: 0.3 }));
  on(['j04'], 'other', () => full(s.j04, DK(PC.shelf({ title: 'FIRST YEAR = TUITION + PROOF OF FUNDS', at: T0(s.j04) + 0.1, stagger: 0.24, foot: 'starting numbers, official pages, 2 Nov 2026', capRoom,
    items: ['AT', 'IT', 'DE', 'FR', 'EE', 'FI'].map((c, i) => ({ name: PC_NUM[c].name + (c === 'AT' ? ' · under 24' : ''), flag: c, price: PC_NUM[c].y, line: PC_NUM[c].line.replace(' (under 24)', ''), red: PC_NUM[c].red, size: undefined })) })), 'ranking', { hold: 0.9, ground: 'pcBlack' }));
  on(['j06', 'j07'], 'other', () => split(FR('j06', 'j07'), PC.pair({ a: { name: 'Czech Republic', flag: 'CZ', kicker: 'IN CZECH', price: '€0', at: T0(s.j06) + 0.2, priceAt: w('j06', 'free') - 0.2 }, b: { name: 'Italy', flag: 'IT', kicker: 'TUITION', price: 'Cheaper', at: w('j07', 'italy') - 0.1, priceAt: w('j07', 'cheaper') - 0.1 } }), 'cz-it', 'right'));
  on(['j08'], 'talk', () => talk(s.j08, 'close', 'starting'));
  on(['j09'], 'talk', () => talk(s.j09, 'mid', 'clicking'));
  // 2026-11-12: the 'BEFORE YOU APPLY' list (sh-start) is gone: it re-typed her words, and sh09's cut left it 0 s long
  on(['j11'], 'talk', () => talk(s.j11, 'close', 'research'));
  on(['j12', 'j13'], 'talk', () => talk(FR('j12', 'j13'), 'wide', 'pick', { push: [1.0, 1.07] }));
  on(['j14', 'j15'], 'other', () => pres(FR('j14', 'j15'), PC.city({ photo: 'paris', credit: 'Kenrick Baksh', name: 'Paris', flag: 'FR', kicker: 'RENT', at: T0(s.j14) }), 'rent', 'right'));
  on(['j16', 'j17'], 'other', () => full(FR('j16', 'j17'), PC.trio({ items: [{ key: 'lecture', word: 'SCHOOL', at: w('j16', 'school') }, { key: 'keys', word: 'RENT', at: w('j16', 'rent'), fx: 0.55 }, { key: 'work', word: 'WORK', at: w('j16', 'work') }], capRoom }), 'also', { ground: 'pcBlack' }));
  on(['j18'], 'talk', () => talk(s.j18, 'close', 'rooting'));
  on(['j19'], 'talk', () => talk(s.j19, 'mid', 'end', { push: [V(1.0, 1.04), V(1.06, 1.08)] }));
  if (fmtOn) PCF.fill();
  if (short && typeof FOOT !== 'undefined' && FOOT.dur) for (const x of TH.segs) if (x.t1 > FOOT.dur) x.t1 = FOOT.dur;   // nothing runs into the ending card
  Object.assign(TH, TH0);
  return s;
}
