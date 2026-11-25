/* scholarships film, part 1: the board, how scholarships work, Erasmus Mundus + AISS (film 0:00 - 2:46). */
'use strict';
/** a scene; every scene drifts in a slow push (0.7 %/s, eased in, max 6 %) so a held frame is never dead (lab: dead hold) */
const scene = (id, start, ground, fn) => addScene(start, ground, '', (t) => { const lt = Math.max(0, t - start); const z = 1 + Math.min(V(0.06, 0.025), V(0.007, 0.003) * lt * Math.min(1, lt / 1.5));
  if (z === 1) return fn(t); ctx.save(); ctx.translate(CX, H * 0.48); ctx.scale(z, z); ctx.translate(-CX, -H * 0.48); try { fn(t); } finally { ctx.restore(); } }, { id });
const WT = (ph, word) => { const i = WORDS.slice(ph.i, ph.i + 60).findIndex(w => w.n === norm(word)); if (i < 0) throw new Error('word not in phrase: ' + word); return WORDS[ph.i + i].t; };

function part1() {
  const k = PS({
    a: 'a nigerian or an african student and you want to start a master\'s program in europe in 2027',
    passed: 'some scholarship deadlines have already passed', feb: 'and a lot of the big ones close between now and february',
    main: 'in this video i\'m going to go through the main scholarships', who: 'who each one of it is for what it covers and when it closes',
    oct: 'everything i\'m going to say in this video is current as of october 2026', links: 'and all the official links will be in the description box',
    check: 'please check them again and again before you apply', first: 'first i will start with how these scholarships work',
    same: 'do not all work the same', order: 'and the biggest difference is the order you apply in',
    r1: 'for some you apply for the scholarship and then for the master\'s degree at the same time', em: 'erasmus mundus works like this',
    r2: 'for some you apply to the university first', nl: 'the dutch nl scholarship works this way and sweden',
    r3: 'for some of them you apply for the scholarship and the university separately', chev: 'like chevening in the uk',
    cover: 'the second difference is how much they cover', full: 'a fully funded scholarship will pay your tuition and give you money to live on every month',
    part: 'a partial scholarship will give you some of it', one: 'it could be a one-time payment or a discount on your tuition',
    two: 'so there are two things you need to write down', need: 'what you need to have before you apply', fp: 'and whether the scholarship is full or partial',
  });
  const r = () => FR();

  /* 0:00 the topic in flaps */
  scene('open', 0, 'term', (t) => {
    const R = r(); const lines = V(['SCHOLARSHIPS', 'IN EUROPE', '2027 INTAKE'], ['SCHOLARSHIPS', 'IN EUROPE', '2027', 'INTAKE']);
    const cw = V(84, 72), ch = Math.round(cw * 1.72);
    flapLines(t, { lines, cx: W / 2, y: V(200, 560), cw, ch, t0: 0.15, stag: 0.035, lineStag: 0.14, cols: { [lines.length - 1]: NB.let }, n: 12, keyBase: 'title' });
    withA(ez(t, k.a.w[1], 0.4), () => lab('For Nigerian and African students', W / 2, V(860, 1360), V(34, 32), g.mid, 'center', { key: 'for' }));
  });
  flapSnd(0.15, 12, 0.035, -5);

  /* 0:05 "some deadlines have already passed": the board; closed rows grey, open ones flip green on "february" */
  scene('board', S(k.passed), 'term', (t) => {
    const R = r(); const push = 1 + 0.035 * io(t, k.passed.t + 1, 5);
    withT(R.x + R.w * 0.3, R.y + R.h * 0.4, push, 0, () => { ctx.translate(-(R.x + R.w * 0.3), -(R.y + R.h * 0.4));
      board(t, R, { title: 'Departures · 2027 intake', t0: S(k.passed) + 0.05, dimAt: WT(k.passed, 'passed'),
        statusAt: { em: WT(k.feb, 'february'), aiss: WT(k.feb, 'between'), si: WT(k.feb, 'february') + 0.1, nl: WT(k.feb, 'between') + 0.1, daad: WT(k.passed, 'passed'), hu: WT(k.passed, 'passed') + 0.08, chev: WT(k.passed, 'passed') + 0.16 } }); });
  });
  boardSnd(S(k.passed)); cue('close', WT(k.passed, 'passed'), -3); cue('open', WT(k.feb, 'february'), -6);

  /* 0:10 the three things every scholarship gets: who, what it pays, when it closes */
  scene('three', S(k.main), 'term', (t) => {
    const R = r(); const heads = [['WHO', WT(k.who, 'who')], ['WHAT IT PAYS', WT(k.who, 'covers')], ['WHEN IT CLOSES', WT(k.who, 'when')]];
    KT(t, { lines: V(['The main scholarships'], ['The main', 'scholarships']), x: R.x, y: V(250, 560), size: V(120, 104), times: TM(k.main, V(3, 3)).slice(0, 3).map(x => Math.max(x, k.main.w[8] - 0.2)), id: 'main' });
    heads.forEach(([h, at], i) => { const y = V(470, 900) + i * V(150, 170); lab('0' + (i + 1), R.x, y + V(62, 66), V(34, 34), g.mid, 'left', { key: 'n' + i });
      flaps(t, { x: R.x + V(90, 80), y, n: 14, cw: V(58, 54), ch: V(100, 94), text: h, key: 'head ' + i, t0: at - 0.1, stag: 0.025 }); });
  });
  cue('flap', WT(k.who, 'who') - 0.1, -6); cue('flap', WT(k.who, 'covers') - 0.1, -6); cue('flapEnd', WT(k.who, 'when') + 0.5, -5);

  /* 0:19 recorded in October, checked again 2 Nov 2026; links in the description */
  scene('checked', S(k.oct), 'term', (t) => {
    const R = r(); const cw = V(60, 54), ch = Math.round(cw * 1.75);
    lab('Recorded', R.x, V(280, 620), V(32, 32), g.mid, 'left', { key: 'rec' });
    flaps(t, { x: R.x, y: V(300, 640), n: 12, cw, ch, text: 'OCT 2026', key: 'oct', t0: WT(k.oct, 'october') - 0.1 });
    lab('Every date checked again', R.x, V(530, 900), V(32, 32), g.mid, 'left', { key: 'chk' });
    flaps(t, { x: R.x, y: V(550, 920), n: 12, cw, ch, text: '2 NOV 2026', key: 'nov', t0: WT(k.oct, 'october') + 0.7 });
    withA(ez(t, WT(k.links, 'official'), 0.4), () => { lab('Official links: in the description', R.x, V(820, 1250), V(34, 32), g.fg, 'left', { key: 'links' }); });
    withA(ez(t, WT(k.check, 'check'), 0.4), () => KT(t, { lines: ['Check them before you apply'], x: R.x, y: V(920, 1360), size: V(64, 56), font: 'body', upper: false, times: TM(k.check, 5), col: g.fg, id: 'checkline' }));
  });
  flapSnd(WT(k.oct, 'october') - 0.1, 8); flapSnd(WT(k.oct, 'october') + 0.7, 10);

  /* 0:28 how they work: the order you apply in */
  scene('order', S(k.first), 'term', (t) => {
    const R = r();
    KT(t, { lines: V(['How scholarships', 'in Europe work'], ['How', 'scholarships', 'in Europe work']), x: R.x, y: V(330, 640), size: V(150, 128), times: TM(k.first, V(5, 5)).concat([k.first.w[8], k.first.w[8]]).slice(1), id: 'how', out: S(k.order) + 0.1 });
    if (t >= S(k.order)) { KT(t, { lines: V(['The *order*', 'you apply in'], ['The *order*', 'you apply in']), x: R.x, y: V(380, 760), size: V(190, 160), times: pick(k.order, [4, 5, 6, 7, 8]), id: 'order', acc: NB.let }); }
  });
  cue('typeHit', WT(k.order, 'order'), -4);

  /* 0:38 three routes, one per flap row */
  scene('routes', S(k.r1), 'term', (t) => {
    const R = r(); const rows = [
      ['TOGETHER', 'Scholarship + master\'s at the same time', 'Erasmus Mundus', WT(k.r1, 'same') - 0.3, k.em.t],
      ['UNI FIRST', 'Admission first, then the scholarship', 'NL Scholarship', WT(k.r2, 'university') - 0.2, k.nl.t, 'Sweden', WT(k.nl, 'sweden')],
      ['SEPARATELY', 'Scholarship and university apart', 'Chevening (UK)', k.r3.t, k.chev.t]];
    rows.forEach(([f, d, ex, at, exAt, ex2, ex2At], i) => { const y = V(240, 540) + i * V(240, 300);
      withA(ez(t, at - 0.3, 0.2), () => lab('0' + (i + 1), R.x, y + V(64, 60), V(34, 32), g.mid, 'left', { key: 'n' + i }));
      const fw = flaps(t, { x: R.x + V(84, 76), y, n: 10, cw: V(56, 52), ch: V(96, 90), text: f, key: 'route ' + i, t0: at, stag: 0.03 });
      void d;   // (2026-11-07: the description re-typed her sentence; the flap word + the example carry it)
      withA(ez(t, exAt, 0.4), () => lab(ex, V(R.x + 84 + fw + 44, R.x + 76), V(y + 96, y + 196), V(30, 30), g.mid, 'left', { key: 'ex ' + i }));
      if (ex2) withA(ez(t, ex2At, 0.4), () => lab(ex2, V(R.x + 84 + fw + 44 + 330, R.x + 76 + 300), V(y + 96, y + 196), V(30, 30), g.mid, 'left', { key: 'ex2 ' + i })); });
  });
  flapSnd(WT(k.r1, 'same') - 0.3, 10); flapSnd(WT(k.r2, 'university') - 0.2, 10); flapSnd(k.r3.t, 10);

  /* 1:02 how much they cover: two boarding passes */
  scene('cover', S(k.cover), 'term', (t) => {
    const R = r();
    const pw = V(1180, 952), ph = V(380, 420);
    pass(t, V(R.x, R.x), V(250, 560), pw, ph, { kind: 'FULL', at: WT(k.full, 'fully'), from: -90, rows: [['Pays', 'Tuition + living']] });
    pass(t, V(R.x + R.w - pw, R.x), V(660, 1030), pw, ph, { kind: 'PARTIAL', at: WT(k.part, 'partial'), from: 90, rows: [['Pays', 'Some of it']] });
  });
  cue('slide', WT(k.full, 'fully'), -4); cue('slide', WT(k.part, 'partial'), -4);

  /* 1:15 two things to write down */
  scene('two', S(k.two), 'term', (t) => {
    const R = r();
    KT(t, { lines: V(['Two things to write down'], ['Two things', 'to write down']), x: R.x, y: V(230, 560), size: V(110, 100), times: TM(k.two, 8).slice(2), id: 'twotitle' });
    [['What you need before you apply', WT(k.need, 'need')], ['Full or partial?', WT(k.fp, 'full')]].forEach(([s, at], i) => { const y = V(450, 840) + i * V(200, 240);
      withA(ez(t, at - 0.1, 0.35), () => { hline(R.x, y - V(70, 80), R.w, ez(t, at - 0.1, 0.5), g.line, 2); lab('0' + (i + 1), R.x, y, V(34, 32), g.mid, 'left', { key: 'n' + i }); });
      KT(t, { lines: [s], x: R.x + V(90, 80), y: y + 6, size: V(76, 64), font: 'body', upper: false, t0: at - 0.1, stagger: 0.05, id: 'thing ' + i, fitW: R.w - V(90, 80) }); });
  });
  cue('tick', WT(k.need, 'need'), -6); cue('tick', WT(k.fp, 'full'), -6);
  part1b();
}

function part1b() {
  const k = PS({
    first: 'the first thing i\'m going to talk about is open to students from anywhere in the world',
    em: 'erasmus mundus is the european union scholarship for master\'s programs', any: 'nigeria africa anywhere',
    lit: 'this one is literally open to literally anyone', run: 'is run by a group of universities in different countries together',
    year: 'you could do your first year in one country and then your second year in another country',
    covers: 'it covers your participation cost which includes your tuition your travel your visa and a living allowance',
    page: 'according to the eu erasmus page', euro: 'the living allowance is 1,400 euros a month for up to 24 months',
    apply: 'so you apply directly to the program you want on the program\'s website', cat: 'there is a catalogue of all the programs on the eu\'s website',
    win: 'most programs take application between october and january', now: 'so for a 2027 start the window is now',
    mine: 'and there is also one in my school that i applied for as well and i got admission into it', aiss: 'it\'s called artificial intelligence for sustainable societies',
    open: 'and i think the admission for that is also open currently', listen: 'before you start applying for any of these programs please listen to this',
    every: 'not every program in the catalogue has scholarships every year', check: 'so check each programme\'s page before you spend weeks applying',
    pick: 'what i\'d advise is that you pick two or three programs', full: 'and give each of this application your full attention',
  });
  const r = () => FR();

  /* 1:22 Erasmus Mundus: Brussels, the EU flags */
  scene('em-city', S(k.first), 'black', (t) => {
    photo(t, { x: 0, y: 0, w: W, h: H }, 'brussels', { at: S(k.first), dur: 8, dim: 0.28, title: 'ERASMUS MUNDUS', sub: 'European Union · open to anyone', cw: V(70, 56), ty: V(90, 420) });
    withA(ez(t, k.lit.w[6] - 0.1, 0.35), () => KT(t, { lines: ['Open to literally anyone'], x: V(110, 56), y: V(860, 1260), size: V(64, 56), font: 'body', upper: false, col: NB.let, times: [k.lit.w[4], k.lit.w[5], k.lit.w[6], k.lit.w[7]], id: 'anyone' }));
    if (t >= WT(k.any, 'nigeria') - 0.1 && t < k.lit.w[6] - 0.1) { const y = V(820, 1250); ['NIGERIA', 'AFRICA', 'ANYWHERE'].forEach((s, i) => flaps(t, { x: V(110, 56) + i * V(380, 320), y, n: 8, cw: V(40, 36), ch: V(70, 64), text: s, key: 'any ' + i, t0: k.any.w[i] - 0.05, stag: 0.02, col: NB.let })); }
  });
  cue('shutter', S(k.first), -6); flapSnd(S(k.first) + 0.15, 14, 0.035); flapSnd(WT(k.any, 'nigeria') - 0.05, 8, 0.02);

  /* 1:35 how it runs: two countries */
  scene('em-run', S(k.run) - 0.1, 'term', (t) => {
    const R = r(); gate(t, R, { gate: 'Gate 01', where: 'EU', name: 'Erasmus Mundus', t0: S(k.run) - 0.1, facts: [
      { k: 'Run by', v: 'UNIVERSITIES IN 2+ COUNTRIES', at: WT(k.run, 'universities') },
      { k: 'Year 1 · Year 2', v: 'ONE COUNTRY · ANOTHER', at: WT(k.year, 'first') },
    ] });
  });
  flapSnd(WT(k.run, 'universities'), 14); flapSnd(WT(k.year, 'first'), 14);

  /* 1:45 what it covers: four items flip on her words */
  scene('em-covers', S(k.covers), 'term', (t) => {
    const R = r();
    [['TUITION', 'tuition'], ['TRAVEL', 'travel'], ['VISA', 'visa'], ['LIVING ALLOWANCE', 'living']].forEach(([s, w], i) => {
      flaps(t, { x: R.x, y: V(250, 560) + i * V(170, 190), n: 16, cw: V(62, 54), ch: V(120, 110), text: s, key: 'cov ' + i, t0: WT(k.covers, w) - 0.08, stag: 0.025, col: NB.let }); });
  });
  ['tuition', 'travel', 'visa', 'living'].forEach(w => cue('flap', WT(k.covers, w) - 0.08, -5)); cue('flapEnd', WT(k.covers, 'allowance') + 0.3, -4);

  /* 1:53 €1,400 a month, up to 24 months + the Programme Guide line */
  scene('em-1400', S(k.page), 'term', (t) => {
    const R = r(); const cw = V(110, 92), ch = Math.round(cw * 1.7);
    flaps(t, { x: R.x, y: V(130, 450), n: 6, cw, ch, text: '€1,400', key: 'amount', t0: WT(k.euro, '1,400') - 0.1, stag: 0.05, size: ch * 0.74 });
    withA(ez(t, WT(k.euro, 'month'), 0.35), () => dtxt('a month', R.x + V(6 * (cw + 10) + 40, 0), V(130 + ch * 0.78, 450 + ch + 110), V(90, 84), g.fg, 'left', 'month'));
    flaps(t, { x: R.x, y: V(130 + ch + 40, 450 + ch + 170), n: 19, cw: V(48, 44), ch: V(84, 80), text: 'FOR UP TO 24 MONTHS', key: 'months', t0: WT(k.euro, 'up') - 0.05, stag: 0.02 });
    clip(t, { x: R.x, y: V(620, 1100), w: V(1320, 952), h: 300 }, 'em-1400', { at: WT(k.page, 'erasmus') - 0.2, hlAt: [WT(k.euro, '1,400')] });
  });
  cue('shutter', WT(k.page, 'erasmus') - 0.2, -4); flapSnd(WT(k.euro, '1,400') - 0.1, 6, 0.05, -3); cue('marker', WT(k.euro, '1,400'), -4); flapSnd(WT(k.euro, 'up') - 0.05, 16, 0.02);

  /* 2:00 apply on the programme's own website; the catalogue */
  scene('em-apply', S(k.apply), 'term', (t) => {
    const R = r();
    KT(t, { lines: V(['Apply on the', 'programme\'s website'], ['Apply on the', 'programme\'s', 'website']), x: R.x, y: V(240, 560), size: V(124, 110), times: TM(k.apply, 5).concat(TM(k.apply, 9).slice(7)), id: 'apply' });
    clip(t, { x: R.x, y: V(560, 1000), w: V(1300, 952), h: 300 }, 'em-cat', { at: WT(k.cat, 'catalogue') - 0.1, src: 'EACEA, European Commission  ·  link in the description' });
  });
  cue('shutter', WT(k.cat, 'catalogue') - 0.1, -4);

  /* 2:07 the window: October to January, "the window is now" */
  scene('em-window', S(k.win), 'term', (t) => {
    const R = r(); const ms = ['OCT', 'NOV', 'DEC', 'JAN'];
    const cw = V(90, 64), ch = Math.round(cw * 1.6), gap = V(70, 24);
    ms.forEach((m, i) => { const x = R.x + i * (3 * (cw + 8) + gap); flaps(t, { x, y: V(230, 530), n: 3, cw, ch, text: m, key: 'm ' + i, t0: (i === 0 ? WT(k.win, 'october') : i === 3 ? WT(k.win, 'january') : WT(k.win, 'october') + 0.15 * i) - 0.05, stag: 0.04, col: NB.let }); });
    const nowAt = WT(k.now, 'now'); const lx = R.x, lw = 4 * (3 * (cw + 8) + gap) - gap;
    hline(lx, V(230, 530) + ch + 30, lw, ez(t, WT(k.win, 'october'), 1.0, 'outQuint'), NB.go, 2);
    if (t >= nowAt - 0.1) {
      flaps(t, { x: R.x, y: V(650, 930), n: 4, cw: V(110, 100), ch: V(180, 170), text: 'NOW', key: 'now', t0: nowAt - 0.1, stag: 0.05, col: NB.go }); }
    clip(t, { x: V(R.x + 900, R.x), y: V(660, 1180), w: V(800, 952), h: 220 }, 'em-window', { at: WT(k.win, 'between') - 0.2, hlAt: [WT(k.win, 'october')], open: true });
  });
  flapSnd(WT(k.win, 'october') - 0.05, 12, 0.04); cue('open', WT(k.now, 'now'), -4); cue('shutter', WT(k.win, 'between') - 0.2, -6);

  /* 2:15 AISS at her school: Tallinn */
  scene('aiss-city', S(k.mine), 'black', (t) => {
    photo(t, { x: 0, y: 0, w: W, h: H }, 'tallinn', { at: S(k.mine), dur: 9, dim: 0.3, title: 'AISS', sub: 'An Erasmus Mundus master\'s · Tallinn', cw: V(84, 70), ty: V(90, 420) });
    withA(ez(t, WT(k.aiss, 'artificial') - 0.2, 0.45), () => KT(t, { lines: V(['Artificial Intelligence', 'for Sustainable Societies'], ['Artificial', 'Intelligence for', 'Sustainable', 'Societies']), x: V(110, 56), y: V(760, 1060), size: V(84, 84), col: NB.let, times: TM(k.aiss, 7).slice(3).concat([k.aiss.w[6], k.aiss.w[6], k.aiss.w[6]]).slice(0, 4), id: 'aissname' }));
  });
  cue('shutter', S(k.mine), -6); flapSnd(S(k.mine) + 0.15, 4, 0.035);

  /* 2:26 correction: she says "open currently"; it opens on 2 December */
  scene('aiss-fix', S(k.open) + 0.05, 'black', (t) => {
    const R = r(); correction(t, { x: R.x, y: V(80, 400), w: V(1150, 952), h: R.h }, { at: S(k.open) + 0.05, head: 'UPDATE', said: '"The admission is also open currently."', now: 'Not open yet. AISS takes applications from 2 December 2026 to 2 February 2027.', src: 'aissprogram.eu · checked 2 Nov 2026', cps: 30 });
    clip(t, { x: V(1330, R.x), y: V(380, 1150), w: V(480, 560), h: 400 }, 'aiss-dates', { at: S(k.open) + 1.0, hlAt: [S(k.open) + 2.0, S(k.open) + 2.4], src: 'aissprogram.eu', open: true });
  });
  flapSnd(S(k.open) + 0.05, 6, 0.035, -3); cue('typeHit', S(k.open) + 1.6, -4); cue('shutter', S(k.open) + 1.6, -6);

  /* 2:33 not every programme has scholarships every year */
  scene('every', S(k.every), 'term', (t) => {
    const R = r(); const cols = V(6, 3), rows = V(3, 5), gap = V(26, 22); const cw = (R.w - (cols - 1) * gap) / cols, ch = Math.min(V(170, 190), (R.h - V(160, 300) - (rows - 1) * gap) / rows);
    const lit = new Set([1, 4, 8, 13]); const y0 = R.y + V(120, 260);
    for (let i = 0; i < cols * rows; i++) { const c = i % cols, rw = Math.floor(i / cols); const x = R.x + c * (cw + gap), y = y0 + rw * (ch + gap); const a = ez(t, S(k.every) + 0.1 + i * 0.04, 0.3);
      withA(a, () => { fillRR(x, y, cw, ch, 6, NB.flap); rect(x, y + ch / 2 - 1, cw, 2, 'rgba(0,0,0,0.35)');
        const on = lit.has(i) && t >= WT(k.every, 'scholarships') - 0.1 + (i % 4) * 0.08; _txt(on ? '€' : '—', x + cw / 2, y + ch * 0.68, F.disp(ch * 0.6), on ? NB.go : NB.dim, 'center'); }); }
  });
  cue('typeHit', WT(k.every, 'every'), -6);

  /* 2:41 pick two or three */
  scene('pick', S(k.pick), 'term', (t) => {
    const R = r(); const cw = V(210, 160), ch = Math.round(cw * 1.6), wT = 6 * cw * 1.09;
    lab('Pick', W / 2, V(200, 520), V(36, 34), g.mid, 'center', { key: 'pickl' });
    flaps(t, { x: (W - wT) / 2, y: V(240, 560), n: 6, cw, ch, text: '2 OR 3', key: 'two3', t0: WT(k.pick, 'two') - 0.05, stag: 0.05, size: ch * 0.72, align: 'center' });
    withA(ez(t, WT(k.pick, 'programs') + 0.6, 0.4) * (1 - ez(t, WT(k.full, 'full') - 0.3, 0.2)), () => lab('That fit what you study or your work', W / 2, V(240 + ch + 110, 560 + ch + 120), V(34, 32), g.mid, 'center', { key: 'fits' }));
    withA(ez(t, WT(k.full, 'full'), 0.4), () => KT(t, { lines: V(['programmes. Give each one your full attention.'], ['programmes.', 'Give each one your', 'full attention.']), x: W / 2, align: 'center', y: V(240 + ch + 130, 560 + ch + 140), size: V(64, 60), font: 'body', upper: false, times: TM(k.full, 7), id: 'att', fitW: R.w }));
  });
  flapSnd(WT(k.pick, 'two') - 0.05, 6, 0.05);
}
