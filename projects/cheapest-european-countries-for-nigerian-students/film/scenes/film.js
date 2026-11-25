/* cheapest-countries: the MOTION FILM (her whole narration, tightened: film/data/cutlist.json), pure motion graphics in her pick
 * A · PRICE CHECK (scenes/pckit.js). A sentence with a diagram gets the diagram (the same shelf labels, real pages and city
 * photos as the talking-head edit, full frame); the others are her words as kinetic type on the shelf grey or on black.
 * Corrections: France 964 hours gets its own correction screen (a sticker CORRECTION + the service-public line); the France
 * WAS €615 / NOW €877.50 label, "280 half days", Austria €1,505.84; the Czech "$6,000" is cut from the voice. */
'use strict';
function buildFilm() {
  const s = {}; for (const [k, q] of Object.entries(PC_SENT)) { try { s[k] = P(q); } catch (e) { /* not in the film */ } }
  window.PC_MISSING = Object.keys(PC_SENT).filter(k => !s[k]);
  const w = (k, word) => WT(s[k], word); const T0 = (ph) => ph.t - 0.12; const R = () => ({ x: 0, y: 0, w: W, h: H });
  const scene = (id, start, ground, draw, o = {}) => addScene(start, ground, id, (t) => {
    const u = Math.max(0, t - start) / 3.5, k = Math.min(1.05, 1 + 0.015 * (Math.floor(u) + E.inOutCubic(u - Math.floor(u))));   // a stepped push, 3 % every 3.5 s (eased): never a dead hold
    PC.T0 = start; withT(W / 2 * (1 - k), H / 2 * (1 - k), k, 0, () => draw(t, R())); PC.T0 = null; }, { id });
  const cue = (role, t, db = -3) => { if (t != null && isFinite(t)) sfx(role, t, db); };
  const nine = [['Germany', 'DE'], ['France', 'FR'], ['Italy', 'IT'], ['Austria', 'AT'], ['Czechia', 'CZ'], ['Poland', 'PL'], ['Estonia', 'EE'], ['Norway', 'NO'], ['Finland', 'FI']];
  // key -> [last key of the group, draw factory, sounds]
  const GFX = {
    a01: ['a01', () => PC.title({ kicker: 'TUITION + PROOF OF FUNDS · 2027', lines: [{ s: 'CHEAP COUNTRIES', at: w('a01', 'cheap') - 0.1 }, { s: 'TO STUDY IN EUROPE', at: w('a01', 'europe') - 0.2 }] }), () => cue('pop', w('a01', 'cheap') - 0.1, -4)],
    a02: ['a04', () => PC.label({ name: 'Germany', flag: 'DE', kicker: 'TUITION', price: '€0', at: T0(s.a02), priceAt: w('a02', 'free'), ast: w('a03', 'it is'), line: 'at most public universities', lineAt: w('a03', 'public'),
      stk: { lines: ['*Proof of funds not included:', '€11,904 a year'], at: w('a04', 'but'), ul: w('a04', 'proof of funds') }, push: { at: w('a04', 'proof of funds'), k: 0.12 } }), () => { cue('bell', w('a02', 'free'), -5); cue('ast', w('a03', 'it is'), -4); cue('sticker', w('a04', 'but'), -2); cue('marker', w('a04', 'proof of funds'), -6); }],
    a05: ['a05', () => PC.shelf({ title: '9 COUNTRIES · 2027 INTAKE', at: w('a05', 'comparing'), stagger: 0.12, items: nine.map(([n, f]) => ({ name: n, flag: f, price: '€?' })) }), () => cue('tick', w('a05', 'comparing'))],
    a09: ['a09', () => PC.title({ lines: [{ s: 'EVERY LINK IS', at: w('a09', 'links') - 0.2 }, { s: 'IN THE DESCRIPTION', at: w('a09', 'description') - 0.1 }] })],
    b01: ['b02', () => PC.phrase({ lines: [{ s: 'Cheap =', at: w('b01', 'cheap') }, { s: '~tuition~ +', times: [w('b02', 'tuition'), w('b02', 'tuition') + 0.2] }, { s: '~proof of funds~', times: [w('b02', 'proof'), w('b02', 'of'), w('b02', 'funds')] }] }), null, 'pcBlack'],
    b03: ['b04', () => PC.list({ title: 'PROOF OF FUNDS', items: [{ k: 'THE MONEY YOU SHOW', v: 'THE EMBASSY', at: w('b03', 'embassy') }, { k: 'TO PROVE YOU CAN', v: 'LIVE THERE', at: w('b04', 'live') }] }), () => { cue('tick', w('b03', 'embassy')); cue('tick', w('b04', 'live')); }],
    b05: ['b06', () => PC.city({ photo: 'tallinn-street', credit: 'Argo Allvee', name: 'Estonia', flag: 'EE', kicker: 'PROOF OF FUNDS', price: '€880', priceAt: w('b06', '880'), line: 'a month · students', at: T0(s.b05) }), () => cue('pop', w('b06', '880'), -4)],
    b08: ['b11', () => PC.list({ title: 'WHAT CHANGES THE COST', items: [{ k: '01 · THE LANGUAGE', v: 'LOCAL = OFTEN FREE', at: w('b09', 'language') }, { k: '02 · RENT', v: 'YOUR CITY', at: w('b10', 'rent') }, { k: '03 · WORK', v: 'ALLOWED?', at: w('b11', 'work') }] }), () => { cue('tick', w('b09', 'language')); cue('tick', w('b10', 'rent')); cue('tick', w('b11', 'work')); }],
    c01: ['c02', () => PC.city({ photo: 'berlin', credit: 'Irina Nesterenko', name: 'Germany', flag: 'DE', kicker: 'COUNTRY 1', at: T0(s.c01) + 0.05, line: 'everybody says it is affordable', lineAt: w('c02', 'affordable') })],
    c03: ['c04', () => PC.label({ name: 'Germany', flag: 'DE', kicker: 'TUITION', price: '€0', at: T0(s.c03), priceAt: w('c03', 'tuition'), line: 'Nigerians included', lineAt: w('c04', 'nigeria'), side: 'center' }), () => cue('bell', w('c03', 'tuition'), -6)],
    c05: ['c06', () => PC.label({ name: 'Semester contribution', flag: 'DE', price: 'a few €100', at: T0(s.c05), priceAt: w('c06', 'few hundred'), line: 'every semester', side: 'center' })],
    c07: ['c07', () => PC.clip('de-bw', { at: T0(s.c07), hl: w('c07', 'exceptions'), title: 'Baden-Württemberg: €1,500 a semester' }), () => cue('marker', w('c07', 'exceptions'), -6)],
    c08: ['c11', () => PC.label({ name: 'Germany', flag: 'DE', kicker: 'TUITION', price: '€0', at: T0(s.c08), priceAt: T0(s.c08) + 0.15, ast: w('c08', 'proof of funds'), stk: { lines: ['*Proof of funds:', '€11,904 a year'], at: w('c10', '11,904') - 0.1, ul: w('c11', 'blocked') }, clip: { name: 'de-daad', at: w('c09', '992') - 0.3, hl: w('c09', 'every month') } }),
      () => { cue('ast', w('c08', 'proof of funds'), -4); cue('marker', w('c09', 'every month'), -6); cue('sticker', w('c10', '11,904') - 0.1, -2); }],
    c12: ['c13', () => PC.list({ title: 'A BLOCKED ACCOUNT', items: [{ k: 'AT THE START', v: '€11,904 IN', at: w('c12', 'start') }, { k: 'EVERY MONTH', v: '€992 OUT', at: w('c13', 'fixed amount') }] }), () => { cue('coins', w('c12', 'start'), -6); cue('tick', w('c13', 'fixed amount')); }],
    c14: ['c15', () => PC.list({ title: 'GERMANY 2027', rowH: 140, items: [{ k: 'NEW AMOUNT', v: 'NOT ANNOUNCED YET', at: w('c14', '2027') }, { k: 'CHECK AGAIN', v: 'BEFORE YOU OPEN IT', at: w('c15', 'check'), red: true }] })],
    c16: ['c16', () => PC.pair({ title: 'STUDENTS IN GERMANY CAN WORK', a: { name: 'Full days', flag: 'DE', price: '140', line: 'a year', at: w('c16', '140') - 0.2 }, b: { name: 'Or half days', flag: 'DE', price: '280', line: 'a year · half days', at: w('c16', 'full days') + 0.5 }, vs: 'OR' }), () => cue('pop', w('c16', '140') - 0.2, -4)],
    c19: ['c20', () => PC.label({ name: 'Plan for this', flag: 'DE', kicker: 'PROOF OF FUNDS', price: '€11,904', priceAt: w('c19', 'proof'), red: true, line: 'blocked · for the visa', lineAt: w('c20', 'visa'), side: 'center' }), () => cue('sticker', w('c19', 'proof'), -3)],
    d01: ['d01', () => PC.city({ photo: 'paris', credit: 'Kenrick Baksh', name: 'France', flag: 'FR', kicker: 'COUNTRY 2', at: T0(s.d01) + 0.05 })],
    d02: ['d03', () => PC.clip('fr-icef', { at: T0(s.d02), hl: w('d02', 'higher fee'), title: 'Higher fees from outside the EU', stk: { lines: ['DIFFERENTIATED FEES'], at: w('d03', 'differentiated') } }), () => cue('sticker', w('d03', 'differentiated'), -3)],
    d04: ['d05', () => PC.pair({ title: 'FRANCE · PUBLIC UNIVERSITIES · 2026/27', a: { name: "Bachelor's", flag: 'FR', kicker: 'A YEAR', price: '€2,902', at: w('d04', '2,902') - 0.2 }, b: { name: "Master's", flag: 'FR', kicker: 'A YEAR', price: '€3,950', at: w('d05', '3,950') - 0.2 } }), () => { cue('pop', w('d04', '2,902') - 0.2, -4); cue('pop', w('d05', '3,950') - 0.2, -4); }],
    d06: ['d07', () => PC.list({ title: 'FROM THE 2026 INTAKE', rowH: 140, items: [{ k: 'FEE WAIVERS', v: 'USED TO BE COMMON', at: w('d06', 'waive') }, { k: 'A NEW DECREE', v: 'LIMITS THEM', at: w('d07', 'limits'), red: true }] })],
    d08: ['d09', () => PC.label({ name: 'France · before', flag: 'FR', kicker: 'PROOF OF FUNDS', price: '€615', priceAt: w('d08', '615') - 0.1, line: 'a month · €7,380 a year', lineAt: w('d09', '7,380'), side: 'center' })],
    d10: ['d11', () => PC.label({ name: 'France · from 1 Aug 2026', flag: 'FR', kicker: 'PROOF OF FUNDS', was: { s: '€615', at: T0(s.d10) + 0.1, strike: w('d10', 'raised') }, price: '€877.50', priceAt: w('d11', '878') - 0.1, redAt: w('d11', '878') - 0.1, line: 'a month · 47 % of the French minimum wage', lineAt: w('d10', '47%'), stk: { lines: ['PRICE UP'], at: w('d10', 'raised'), size: 0.07 }, clip: { name: 'fr-funds', at: w('d10', 'august') - 0.2, hl: w('d11', '878') } }),
      () => { cue('sticker', w('d10', 'raised'), -2); cue('pop', w('d11', '878') - 0.1, -3); }],
    d15: ['d16', () => PC.sum({ name: 'France', flag: 'FR', title: "FRANCE · A MASTER'S · YEAR ONE", tuition: { price: '€3,950', at: w('d15', 'add') }, funds: { price: '€10,530', at: w('d15', 'two numbers') }, total: { lines: ['= €14,480 first year'], at: w('d16', '14,480') - 0.1 } }), () => cue('sticker', w('d16', '14,480') - 0.1, -2)],
    d17: ['d18', () => PC.pair({ title: 'FIRST YEAR', a: { name: 'Germany', flag: 'DE', price: '€11,904', at: w('d17', '11,900') - 0.2 }, b: { name: 'France', flag: 'FR', price: '€14,480', red: true, line: '+ about €2,500', at: w('d18', '2,500') - 0.2 } })],
    d19: ['d19', () => PC.clip('fr-work', { at: T0(s.d19) + 0.1, hl: w('d19', '964'), title: 'France: students can work up to 964 hours a year', stk: { lines: ['CORRECTION'], at: T0(s.d19) + 0.2 } }), () => { cue('sticker', T0(s.d19) + 0.2, -2); cue('marker', w('d19', '964'), -6); }],
    d22: ['d23', () => PC.phrase({ lines: [{ s: 'Lower living cost.', at: w('d22', 'living') }, { s: '~Higher tuition.~', times: [w('d22', 'tuition') - 0.2, w('d22', 'higher')] }, { s: 'Do the math.', at: w('d23', 'math') - 0.3 }] }), null, 'pcBlack'],
    e01: ['e02', () => PC.city({ photo: 'bologna', credit: 'Pascal Küffer', name: 'Italy', flag: 'IT', kicker: 'COUNTRY 3', line: 'the fee can follow your family income', lineAt: w('e02', 'income'), at: T0(s.e01) + 0.05 })],
    e03: ['e05', () => PC.list({ title: 'ISEE PARIFICATO', items: [{ k: 'YOUR FAMILY', v: 'INCOME + ASSETS', at: w('e03', 'income') }, { k: 'EACH UNIVERSITY', v: 'SETS ITS OWN FEE', at: w('e05', 'each university') }] })],
    e07: ['e09', () => PC.label({ name: 'Italy', flag: 'IT', kicker: 'PROOF OF FUNDS', price: '€10,179.85', priceAt: w('e08', '10,179.85') - 0.1, line: 'a year + your ticket home', lineAt: w('e09', 'ticket'), at: T0(s.e07), side: 'center' }), () => cue('pop', w('e08', '10,179.85') - 0.1, -4)],
    e12: ['e12', () => PC.pair({ title: 'PROOF OF FUNDS · A YEAR', a: { name: 'Germany', flag: 'DE', price: '€11,904', at: T0(s.e12) }, b: { name: 'Italy', flag: 'IT', price: '€10,180', at: w('e12', "germany's") - 0.2 } })],
    f01: ['f02', () => PC.city({ photo: 'vienna', credit: 'Jonas Horsch', name: 'Austria', flag: 'AT', kicker: 'COUNTRY 4', line: 'low fees, strange proof of funds rules', lineAt: w('f02', 'strange'), at: T0(s.f01) + 0.05 })],
    f03: ['f04', () => PC.label({ name: 'Austria', flag: 'AT', kicker: 'TUITION · A SEMESTER', price: '€726.72', priceAt: w('f03', '726.72') - 0.1, line: '+ ÖH €26.20 = €1,505.84 a year', lineAt: w('f04', 'union'), at: T0(s.f03), clip: { name: 'at-tuw', at: w('f03', 'semester'), hl: w('f03', '726.72') } }), () => cue('marker', w('f03', '726.72'), -6)],
    f05: ['f07', () => PC.clip('at-list', { at: T0(s.f05), hl: ['benin', 'ethiopia', 'senegal', 'togo', 'uganda'].map(x => w('f06', x)), title: 'No tuition for citizens of these countries', maxS: 0.75, stk: { lines: ['NIGERIA: NOT ON THE LIST'], at: w('f07', 'nigeria') } }), () => cue('sticker', w('f07', 'nigeria'), -2)],
    f08: ['f11', () => PC.pair({ photo: 'vienna', credit: 'Jonas Horsch', title: 'PROOF OF FUNDS FOR 2026', titleAt: T0(s.f08), a: { name: 'Under 24', flag: 'AT', kicker: 'A MONTH', price: '€722.58', at: w('f09', 'under') - 0.1, priceAt: w('f09', '722.58') - 0.1 }, b: { name: '24 and over', flag: 'AT', kicker: 'A MONTH', price: '€1,308.39', red: true, at: w('f10', '24') - 0.1, priceAt: w('f10', '1,308.39') - 0.1 } }), () => { cue('pop', w('f09', '722.58') - 0.1, -4); cue('sticker', w('f10', '1,308.39') - 0.1, -3); }],
    f12: ['f13', () => PC.pair({ title: 'PROOF OF FUNDS · A YEAR', a: { name: 'Under 24', flag: 'AT', price: '€8,671', at: w('f12', '8k') - 0.2 }, b: { name: '24 and over', flag: 'AT', price: '€15,700', red: true, at: w('f13', '15,700') - 0.2 } })],
    g01: ['g03', () => PC.city({ photo: 'prague', credit: 'Ceyda Çiftci', name: 'Czech Republic', flag: 'CZ', kicker: 'TUITION IN CZECH', price: '€0', priceAt: w('g02', 'free'), line: 'public universities, taught in Czech', at: T0(s.g01) + 0.05 }), () => cue('bell', w('g02', 'free'), -6)],
    g05: ['g06', () => PC.label({ name: 'Czech Republic', flag: 'CZ', kicker: 'PROOF OF FUNDS · 12 MONTHS', price: '115,810 Kč', priceAt: w('g05', '115,810') - 0.1, line: 'check the amount with the embassy', lineAt: w('g06', 'confirm'), at: T0(s.g05), clip: { name: 'cz-mv', at: w('g05', 'crowns'), hl: w('g05', 'month') } })],
    g07: ['g10', () => PC.city({ photo: 'warsaw', credit: 'Caio', name: 'Poland', flag: 'PL', kicker: 'PROOF OF FUNDS', price: '776 zł', priceAt: w('g08', '776') - 0.1, line: 'a month + rent + 2,500 zł ticket', lineAt: w('g09', '2,500'), at: T0(s.g07) }), () => cue('pop', w('g08', '776') - 0.1, -4)],
    h04: ['h04', () => PC.list({ title: 'TALLINN UNIVERSITY · 2027/28', rowH: 150, items: [{ k: "MOST MASTER'S, A YEAR", v: '€4,000 – €5,200', at: w('h04', '4,000') - 0.1 }] })],
    h05: ['h07', () => PC.label({ name: 'My programme · a year', flag: 'EE', kicker: 'TUITION', was: { s: '€6,000', at: w('h05', '6,000') - 0.1, strike: w('h07', 'increased') }, price: '€7,000', priceAt: w('h07', '7k') - 0.15, redAt: w('h07', '7k') - 0.15, line: 'new non-EU students, 2027/28', lineAt: w('h07', '7k'), stk: { lines: ['PRICE UP'], at: w('h07', 'increased'), size: 0.07 }, at: T0(s.h05) }), () => cue('sticker', w('h07', 'increased'), -2)],
    h08: ['h10', () => PC.city({ photo: 'tallinn-street', credit: 'Argo Allvee', name: 'Estonia', flag: 'EE', kicker: 'PROOF OF FUNDS', price: '€880', priceAt: w('h08', '880') - 0.1, line: 'a month · about €10,500 a year', lineAt: w('h10', '10,500'), at: T0(s.h08) })],
    h11: ['h12', () => PC.list({ title: 'WORK IN ESTONIA', rowH: 140, items: [{ k: 'ON A STUDY PERMIT', v: 'YOU CAN WORK', at: w('h12', 'work') }, { k: 'AS LONG AS YOU', v: 'STUDY FULL-TIME', at: w('h12', 'full-time') }] })],
    i01: ['i02', () => PC.city({ photo: 'oslo', credit: 'Eswaran Arulkumar', name: 'Norway', flag: 'NO', kicker: 'FEES FOR NON-EU STUDENTS', line: 'since 2023', lineAt: w('i02', '2023'), at: T0(s.i01) + 0.05 })],
    i03: ['i04', () => PC.label({ name: 'Norway · NHH', flag: 'NO', kicker: "MASTER'S · A YEAR", price: 'NOK 204,000', priceAt: w('i04', '204,000') - 0.1, red: true, line: 'Norwegian School of Economics', at: T0(s.i03), side: 'center' })],
    i05: ['i05', () => PC.clip('no-udi', { at: T0(s.i05), hl: w('i05', '170,000'), title: 'For living costs, one academic year' }), () => cue('marker', w('i05', '170,000'), -6)],
    i06: ['i07', () => PC.city({ photo: 'helsinki', credit: 'Antti Kulmanen', name: 'Finland', flag: 'FI', kicker: "UEF · MASTER'S · A YEAR", price: '€10,000 – 12,000', priceAt: w('i07', '10,000') - 0.1, red: true, at: T0(s.i06) })],
    i08: ['i08', () => PC.label({ name: 'Finland', flag: 'FI', kicker: 'PROOF OF FUNDS', price: '€9,600', priceAt: w('i08', '9,600') - 0.1, line: 'a year · €800 a month', at: T0(s.i08), side: 'center' })],
    j01: ['j03', () => PC.phrase({ lines: [{ s: 'Do ~the numbers~', times: [w('j01', 'doing the numbers') - 0.2, w('j01', 'numbers'), w('j01', 'numbers')] }, { s: 'before you apply.', at: w('j03', 'before') }] }), null, 'pcBlack'],
    j04: ['j04', () => PC.shelf({ title: 'FIRST YEAR = TUITION + PROOF OF FUNDS', at: T0(s.j04) + 0.1, stagger: 0.24, foot: 'starting numbers, official pages, 2 Nov 2026',
      items: ['AT', 'IT', 'DE', 'FR', 'EE', 'FI'].map(c => ({ name: PC_NUM[c].name + (c === 'AT' ? ' · under 24' : ''), flag: c, price: PC_NUM[c].y, line: PC_NUM[c].line.replace(' (under 24)', ''), red: PC_NUM[c].red })) }), () => cue('tick', T0(s.j04) + 0.1)],
    j06: ['j07', () => PC.pair({ a: { name: 'Czech Republic', flag: 'CZ', kicker: 'IN CZECH', price: '€0', at: w('j06', 'free') - 0.2 }, b: { name: 'Italy', flag: 'IT', kicker: 'TUITION', price: 'by income', at: w('j07', 'italy') - 0.1 } })],
    j14: ['j15', () => PC.city({ photo: 'paris', credit: 'Kenrick Baksh', name: 'Paris', flag: 'FR', kicker: 'RENT', line: 'check the rent in your city', lineAt: w('j15', 'rent'), at: T0(s.j14) })],
    j16: ['j17', () => PC.list({ title: 'ALSO ADD', items: [{ k: '01', v: 'SCHOOL', at: w('j16', 'school') }, { k: '02', v: 'RENT', at: w('j16', 'rent') }, { k: '03', v: 'WORK', at: w('j16', 'work') }, { k: '04', v: 'COST OF LIVING', at: w('j17', 'cost') }] })],
  };
  const keys = Object.keys(PC_SENT).filter(k => s[k]); let i = 0, n = 0; let lastGround = '';
  while (i < keys.length) {
    const k = keys[i]; const g_ = GFX[k];
    if (g_ && s[g_[0]]) {
      try { scene(k, i === 0 ? 0 : T0(s[k]), g_[3] || 'pcWall', g_[1]()); if (g_[2]) g_[2](); if (i > 0) cue(g_[3] === 'pcBlack' ? 'sticker' : 'shutter', T0(s[k]) + 0.085, -5); lastGround = g_[3] || 'pcWall'; } catch (e) { console.error('FILM-ERR', k, e.message); }
      i = keys.indexOf(g_[0]) + 1; continue;
    }
    const ground = (n++ % 3 === 2) ? 'black' : 'wall';
    scene(k, i === 0 ? 0 : T0(s[k]), ground === 'black' ? 'pcBlack' : 'pcWall', PC.say(s[k], { ground })); if (n % 2 === 0) cue(ground === 'black' ? 'paper' : 'tick', T0(s[k]) + 0.04, -6);
    i++;
  }
  console.error('FILM-MISSING', window.PC_MISSING.join(' '));
}
