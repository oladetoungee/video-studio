/* scholarships film, part 2: DAAD EPOS, Sweden, the Netherlands, Hungary (+ the DSA correction), Estonia, Chevening, how to
 * prepare, the motivation letter, "apply only on the official website", the close (film 2:46 - end). */
'use strict';
function part2() {
  const k = PS({
    daad: 'the next one is the daad epos scholarship in germany', pron: 'i don\'t know if it\'s pronounced that',
    body: 'so this one is a very big scholarship body in germany', fit: 'the one i would say is a good fit for nigerian graduates is the epos one',
    dev: 'the scholarships for development-related postgraduate courses', exp: 'who already have at least two years of work experience after their first degree',
    six: 'your degree should not be more than six years old', pay: 'this scholarship gives you a monthly payment', ins: 'it helps you with health insurance',
    travel: 'there is a travel allowance', rent: 'and in some cases there is a rent subsidy', spec: 'and that one only works for specific courses',
    list: 'the list for 2027-28 for example has courses in development economics water engineering environmental governance',
    course: 'so you apply through the course by that course\'s deadline', passed: 'a lot of the deadlines for this one has passed',
    look: 'but if you have work experience i think this epos one is a very good one to look out for', y28: 'if you\'re looking to start in 2028 you already have to start preparing now',
  });
  const r = () => FR();

  /* 2:46 DAAD EPOS: Berlin */
  scene('daad-city', S(k.daad), 'black', (t) => {
    photo(t, { x: 0, y: 0, w: W, h: H }, 'berlin', { at: S(k.daad), dur: 9, dim: 0.32, title: 'DAAD EPOS', sub: 'Germany', cw: V(84, 70), ty: V(90, 420) });
    const dv = WT(k.dev, 'development-related');
    withA(ez(t, WT(k.body, 'big'), 0.35) * (1 - ez(t, WT(k.fit, 'fit') - 0.2, 0.2)), () => lab('A very big scholarship body', V(110, 56), V(860, 1180), V(34, 32), NB.let, 'left', { key: 'body' }));
    withA(ez(t, WT(k.fit, 'fit'), 0.35) * (1 - ez(t, dv - 0.2, 0.2)), () => lab('A good fit for Nigerian graduates', V(110, 56), V(860, 1180), V(34, 32), NB.let, 'left', { key: 'fitlab' }));
    withA(ez(t, dv, 0.45), () => KT(t, { lines: V(['For development-related', 'postgraduate courses'], ['For development-', 'related postgraduate', 'courses']), x: V(110, 56), y: V(800, 1080), size: V(76, 72), col: NB.let, t0: WT(k.dev, 'development-related'), stagger: 0.08, id: 'dev' }));
  });
  cue('shutter', S(k.daad), -6); flapSnd(S(k.daad) + 0.15, 9, 0.035);

  /* 3:04 who it is for + the DAAD page */
  scene('daad-gate', S(k.exp) - 0.3, 'term', (t) => {
    const R = r(); const gr = V({ x: R.x, y: R.y, w: 960, h: R.h }, { x: R.x, y: R.y, w: R.w, h: 640 });
    gate(t, gr, { gate: 'Gate 02', where: 'Germany', name: 'DAAD EPOS', t0: S(k.exp) - 0.3, cw: 46, facts: [
      { k: 'Work experience', v: '2+ YEARS', at: WT(k.exp, 'two') },
      { k: 'Pays', v: '€992 A MONTH', at: WT(k.pay, 'gives') },
    ] });
    clip(t, { x: V(R.x + 1010, R.x), y: V(260, 1150), w: V(690, 952), h: 200 }, 'daad-exp', { at: WT(k.exp, 'two') - 0.2, hlAt: [WT(k.exp, 'two')] });
    clip(t, { x: V(R.x + 1010, R.x), y: V(560, 1310), w: V(690, 952), h: 200 }, 'daad-992', { at: WT(k.pay, 'monthly') - 0.2, hlAt: [WT(k.pay, 'monthly') + 0.1], src: 'DAAD scholarship database · €992 for graduates' });
  });
  flapSnd(WT(k.exp, 'two'), 8); flapSnd(WT(k.six, 'six'), 16); flapSnd(WT(k.pay, 'gives'), 12); cue('shutter', WT(k.exp, 'two') - 0.2, -6); cue('marker', WT(k.pay, 'monthly') + 0.1, -6);

  /* 3:15 what else it pays: insurance, travel, rent */
  scene('daad-pays', S(k.ins), 'term', (t) => {
    const R = r();
    [['HEALTH INSURANCE', WT(k.ins, 'health')], ['TRAVEL ALLOWANCE', WT(k.travel, 'travel')], ['RENT (SOME CASES)', WT(k.rent, 'rent')]].forEach(([s, at], i) =>
      flaps(t, { x: R.x, y: V(270, 580) + i * V(180, 200), n: 17, cw: V(60, 52), ch: V(112, 104), text: s, key: 'p ' + i, t0: at - 0.1, stag: 0.025 }));
  });
  ['health', 'travel', 'rent'].forEach((w, i) => cue('flap', WT([k.ins, k.travel, k.rent][i], w) - 0.1, -5));

  /* 3:22 the 2027-28 list: courses, apply through the course, many deadlines passed */
  scene('daad-list', S(k.list), 'term', (t) => {
    const R = r(); lab('Course list 2027-28 (DAAD)', R.x, V(180, 480), V(34, 32), g.mid, 'left', { key: 'listl' });
    const cs = [['DEVELOPMENT ECONOMICS', 'economics'], ['WATER ENGINEERING', 'engineering'], ['ENVIRONMENTAL GOV.', 'governance']];
    cs.forEach(([s, w], i) => { const y = V(230, 530) + i * V(130, 200); flaps(t, { x: R.x, y, n: 21, cw: V(48, 40), ch: V(90, 80), text: s, key: 'c ' + i, t0: WT(k.list, w) - 0.25, stag: 0.02 });
      flaps(t, { x: V(R.x + 21 * 53 + 40, R.x), y: V(y, y + 90), n: 11, cw: V(48, 40), ch: V(90, 70), text: 'MANY PASSED', key: 'st ' + i, t0: WT(k.passed, 'deadlines') + i * 0.12, stag: 0.02, col: NB.dim }); });
  });
  cs_snd(); function cs_snd() { ['economics', 'engineering', 'governance'].forEach(w => cue('flap', WT(k.list, w) - 0.25, -6)); cue('close', WT(k.passed, 'deadlines') + 0.3, -4); }

  /* 3:35 look out for it if you have work experience; for 2028, start now */
  scene('daad-2028', S(k.look), 'term', (t) => {
    const R = r();
    KT(t, { lines: V(['Have work experience?', 'A very good one to look out for'], ['Have work', 'experience?', 'A very good one', 'to look out for']), x: R.x, y: V(300, 600), size: V(96, 92), times: TM(k.look, 10).slice(3), id: 'look' });
    if (t >= WT(k.y28, '2028') - 0.2) { lab('Starting in', R.x, V(640, 1030), V(34, 32), g.mid, 'left', { key: 'st' });
      flaps(t, { x: R.x, y: V(670, 1060), n: 4, cw: V(80, 76), ch: V(136, 130), text: '2028', key: 'y', t0: WT(k.y28, '2028') - 0.1, stag: 0.05 });
      withA(ez(t, WT(k.y28, 'preparing'), 0.35), () => dtxt('Start preparing now', V(R.x + 420, R.x), V(780, 1300), V(76, 76), g.fg, 'left', 'prep')); }
  });
  flapSnd(WT(k.y28, '2028') - 0.1, 4, 0.05);
  part2b();
}

function part2b() {
  const k = PS({
    si: 'then there\'s the swedish institute scholarship for global professionals in sweden', cert: 'it\'s for people from certain countries',
    work: 'already have work and leadership experience', ng: 'and nigeria is one of those countries', most: 'in fact they have even said that nigeria is one of the countries that it gets most applicants from',
    full: 'it\'s a full scholarship it pays your tuition and gives you a monthly living allowance', order: 'and the order you apply is also very important',
    uad: 'first you apply for the master\'s program through the university admissions', jan: 'i think the deadline is for january',
    feb: 'and then you apply for the scholarship itself in the short window in february', dd: 'so just be informed just confirm the date', win: 'i think that short window is 8 to 24 february 2027',
    conf: 'just confirm the date on the official website',
  });
  const r = () => FR();

  /* 3:44 Sweden: Stockholm */
  scene('si-city', S(k.si), 'black', (t) => {
    photo(t, { x: 0, y: 0, w: W, h: H }, 'stockholm', { at: S(k.si), dur: 9, dim: 0.3, title: 'SWEDISH INSTITUTE', sub: 'Sweden · for global professionals', cw: V(70, 52), ty: V(90, 420) });
    if (t >= WT(k.ng, 'nigeria') - 0.1) flaps(t, { x: V(110, 56), y: V(820, 1200), n: 15, cw: V(54, 50), ch: V(96, 90), text: 'NIGERIA ✓ ELIGIBLE', key: 'ng', t0: WT(k.ng, 'nigeria') - 0.1, stag: 0.025, col: NB.let });
    withA(ez(t, WT(k.work, 'work'), 0.4), () => lab('Needs work and leadership experience', V(110, 56), V(780, 1160), V(32, 30), NB.let, 'left', { key: 'work' }));
  });
  cue('shutter', S(k.si), -6); flapSnd(S(k.si) + 0.15, 17, 0.035); flapSnd(WT(k.ng, 'nigeria') - 0.1, 17, 0.025); cue('open', WT(k.ng, 'nigeria') + 0.5, -8);

  /* 3:55 "most applicants": what si.se confirms */
  scene('si-list', S(k.most), 'term', (t) => {
    const R = r(); lab('What si.se confirms (2 Nov 2026)', R.x, V(220, 520), V(34, 32), g.mid, 'left', { key: 'conf' });
    flaps(t, { x: R.x, y: V(270, 580), n: 12, cw: V(70, 62), ch: V(120, 110), text: '34 COUNTRIES', key: 'c34', t0: S(k.most) + 0.2, stag: 0.03 });
    flaps(t, { x: R.x, y: V(430, 740), n: 12, cw: V(70, 62), ch: V(120, 110), text: 'NIGERIA ✓', key: 'ngok', t0: WT(k.most, 'nigeria') - 0.05, stag: 0.03, col: NB.let });
    withA(ez(t, WT(k.full, 'full'), 0.4), () => { pass(t, V(R.x + 1000, R.x), V(270, 960), V(700, 952), V(380, 400), { kind: 'FULL', at: WT(k.full, 'full'), from: 80, rows: [['Pays', 'Tuition + living']], key: 'sifull' }); });
  });
  flapSnd(S(k.most) + 0.2, 12); flapSnd(WT(k.most, 'nigeria') - 0.05, 9); cue('slide', WT(k.full, 'full'), -4);

  /* 4:08 the order: step 1 University Admissions by 15 Jan, step 2 the scholarship 8-24 Feb + the si.se dates */
  scene('si-steps', S(k.order), 'term', (t) => {
    const R = r(); const cw = V(60, 54), ch = Math.round(cw * 1.8);
    withA(ez(t, WT(k.uad, 'first'), 0.35), () => lab('Step 1 · University Admissions', R.x, V(200, 470), V(34, 32), g.fg, 'left', { key: 's1' }));
    flaps(t, { x: R.x, y: V(230, 500), n: 12, cw, ch, text: 'BY 15 JAN 27', key: 'd1', t0: WT(k.jan, 'january') - 0.15, stag: 0.03, col: NB.go });
    withA(ez(t, WT(k.feb, 'scholarship'), 0.35), () => lab('Step 2 · The scholarship', V(R.x + 900, R.x), V(200, 760), V(34, 32), g.fg, 'left', { key: 's2' }));
    flaps(t, { x: V(R.x + 900, R.x), y: V(230, 790), n: 12, cw, ch, text: '8-24 FEB 27', key: 'd2', t0: WT(k.win, '8') - 0.15, stag: 0.03, col: NB.let });
    clip(t, { x: R.x, y: V(480, 1080), w: V(1500, 952), h: 380 }, 'si-dates', { at: WT(k.uad, 'university') - 0.1, hlAt: [WT(k.jan, 'january'), WT(k.win, '8')], open: true, src: 'si.se · checked 2 Nov 2026 · the portal closes 14:59 CET on 24 Feb' });
  });
  cue('shutter', WT(k.uad, 'university') - 0.1, -6); flapSnd(WT(k.jan, 'january') - 0.15, 12); flapSnd(WT(k.win, '8') - 0.15, 12); cue('marker', WT(k.jan, 'january'), -6);
  part2c();
}

function part2c() {
  const k = PS({
    nl: 'and if you\'ve been looking at scholarship in the netherlands', okp: 'it\'s probably out of the orange knowledge programme', ended: 'it ended in 2024',
    nothing: 'i didn\'t see anything', still: 'what is still available is the nl scholarship', holland: 'which used to be called the holland scholarship',
    eea: 'it\'s for students from outside the eea and that includes nigeria', k5: 'and it offers 5,000 euros for your first year', partial: 'it\'s a partial scholarship',
    help: 'but it would really help', uni: 'you apply to the university and after you get your admissions you apply for the scholarship',
    own: 'so each university sets its own deadline', offer: 'because you need the offer from the university to apply for the money',
    hu: 'and then there\'s one in hungary', huname: 'stipendium hungaricum', gov: 'it\'s the hungarian government scholarship',
    hucov: 'it covers your tuition your monthly stipend rather your place in the dorm or money towards your rent and it covers medical insurance',
    hufull: 'it doesn\'t cover your full living cost', helpful: 'but it is very helpful', tempus: 'you apply online through the tempus public foundation',
    nom: 'also has to nominate you', listed: 'i checked for nigeria and nigeria is on the list', fsb: 'the body that nominates you is the federal scholarship board',
    emb: 'the hungarian embassy in abuja says that the board can set its own earlier deadline', early: 'so you have to contact them early enough',
    last: 'the last round closed 15th january 2026', notopen: 'but the next round is not open yet',
  });
  const r = () => FR();

  /* 4:24 the Netherlands: Orange Knowledge ended */
  scene('nl-city', S(k.nl), 'black', (t) => {
    photo(t, { x: 0, y: 0, w: W, h: H }, 'amsterdam', { at: S(k.nl), dur: 8, dim: 0.34, title: 'NETHERLANDS', cw: V(70, 60), ty: V(90, 420) });
    if (t >= WT(k.okp, 'orange') - 0.1) { flaps(t, { x: V(110, 56), y: V(560, 1000), n: 16, cw: V(58, 52), ch: V(100, 92), text: 'ORANGE KNOWLEDGE', key: 'okp', t0: WT(k.okp, 'orange') - 0.1, stag: 0.025, col: t >= WT(k.ended, 'ended') ? NB.dim : NB.let });
      flaps(t, { x: V(110, 56), y: V(675, 1110), n: 13, cw: V(58, 52), ch: V(100, 92), text: 'ENDED IN 2024', key: 'okpend', t0: WT(k.ended, 'ended') - 0.05, stag: 0.025, col: NB.dim }); }
    clip(t, { x: V(110, 56), y: V(810, 1260), w: V(1100, 952), h: 150 }, 'okp-ended', { at: WT(k.ended, 'ended') + 0.3, hlAt: [WT(k.ended, '2024')], maxH: 100, plate: true, src: 'studyinnl.org · checked 2 Nov 2026' });
  });
  cue('shutter', S(k.nl), -6); flapSnd(S(k.nl) + 0.15, 11, 0.035); flapSnd(WT(k.okp, 'orange') - 0.1, 16, 0.025); cue('close', WT(k.ended, 'ended'), -3);

  /* 4:36 the NL Scholarship: €5,000 for the first year, partial, apply to the university first */
  scene('nl-gate', S(k.still), 'term', (t) => {
    const R = r(); const gr = V({ x: R.x, y: R.y, w: 1000, h: R.h }, { x: R.x, y: R.y, w: R.w, h: 700 });
    gate(t, gr, { gate: 'Gate 04', where: 'Netherlands', name: 'NL Scholarship', t0: S(k.still), facts: [
      { k: 'Pays (partial)', v: '€5,000 · YEAR 1', at: WT(k.k5, '5,000') - 0.1 },
    ] });
    clip(t, { x: V(R.x + 1060, R.x), y: V(300, 1270), w: V(640, 952), h: 220 }, 'nl-5000', { at: WT(k.k5, '5,000') - 0.25, hlAt: [WT(k.k5, '5,000')] });
    if (!PORTRAIT && t >= WT(k.eea, 'nigeria') - 0.1) flaps(t, { x: V(R.x + 1060, R.x + 520), y: V(640, 520), n: 9, cw: V(56, 46), ch: V(96, 80), text: 'NIGERIA ✓', key: 'ng', t0: WT(k.eea, 'nigeria') - 0.1, stag: 0.03, col: NB.let });
  });
  flapSnd(WT(k.eea, 'outside'), 15); flapSnd(WT(k.k5, '5,000') - 0.1, 14); flapSnd(WT(k.own, 'own') - 0.2, 20); cue('shutter', WT(k.k5, '5,000') - 0.25, -6); 

  /* 4:56 the offer first, then the money */
  scene('nl-order', S(k.offer), 'term', (t) => {
    const R = r(); const cw = V(60, 52), ch = Math.round(cw * 1.75);
    [['1', 'THE UNIVERSITY OFFER', WT(k.offer, 'offer')], ['2', 'THE MONEY', WT(k.offer, 'apply')]].forEach(([n, s, at], i) => { const y = V(330, 640) + i * V(230, 260);
      withA(ez(t, at - 0.2, 0.3), () => lab('Step ' + n, R.x, y - 22, V(34, 32), g.mid, 'left', { key: 'step ' + i }));
      flaps(t, { x: R.x, y, n: 19, cw: V(cw, 46), ch: V(ch, 80), text: s, key: 'o ' + i, t0: at - 0.2, stag: 0.025 }); });
  });
  flapSnd(WT(k.offer, 'offer') - 0.2, 19); flapSnd(WT(k.offer, 'apply') - 0.2, 9);

  /* 5:01 Hungary: Budapest */
  scene('hu-city', S(k.hu), 'black', (t) => {
    photo(t, { x: 0, y: 0, w: W, h: H }, 'budapest', { at: S(k.hu), dur: 10, dim: 0.32, title: 'STIPENDIUM HUNGARICUM', sub: 'Hungary · government scholarship', cw: V(58, 38), ty: V(90, 420) });
    const items = [['TUITION', 'tuition'], ['MONTHLY STIPEND', 'monthly'], ['DORM OR RENT', 'dorm'], ['MEDICAL INSURANCE', 'medical']];
    items.forEach(([s, w], i) => flaps(t, { x: V(110, 56), y: V(520, 860) + i * V(110, 120), n: 17, cw: V(44, 44), ch: V(80, 80), text: s, key: 'hc ' + i, t0: WT(k.hucov, w) - 0.1, stag: 0.02 }));
    withA(ez(t, WT(k.hufull, 'full'), 0.4) * (1 - ez(t, k.helpful.t - 0.2, 0.2)), () => lab('Not your full living cost', V(110, 56), V(1000, 1380), V(34, 30), NB.let, 'left', { key: 'notfull' }));
    withA(ez(t, k.helpful.t, 0.4), () => lab('But very helpful', V(110, 56), V(1000, 1380), V(34, 30), NB.let, 'left', { key: 'helpful' }));
  });
  cue('shutter', S(k.hu), -6); flapSnd(S(k.hu) + 0.15, 21, 0.035); ['tuition', 'monthly', 'dorm', 'medical'].forEach(w => cue('flap', WT(k.hucov, w) - 0.1, -6));

  /* 5:20 how you apply: Tempus online + your country nominates you */
  scene('hu-apply', S(k.tempus), 'term', (t) => {
    const R = r(); const cw = V(54, 48), ch = Math.round(cw * 1.75);
    [['ONLINE · TEMPUS', WT(k.tempus, 'tempus') - 0.2, 'Step 1'], ['YOUR COUNTRY', WT(k.nom, 'nominate') - 0.3, 'Step 2 · nominated by']].forEach(([s, at, l], i) => { const y = V(300, 620) + i * V(220, 250);
      withA(ez(t, at - 0.1, 0.3), () => lab(l, R.x, y - 22, V(34, 32), g.mid, 'left', { key: 'l ' + i })); flaps(t, { x: R.x, y, n: 15, cw, ch, text: s, key: 'a ' + i, t0: at, stag: 0.025 }); });
    if (t >= WT(k.listed, 'list') - 0.2) flaps(t, { x: R.x, y: V(760, 1150), n: 15, cw: V(44, 48), ch: V(80, 84), text: 'NIGERIA ✓ LISTED', key: 'listed', t0: WT(k.listed, 'list') - 0.2, stag: 0.025, col: NB.let });
  });
  flapSnd(WT(k.tempus, 'tempus') - 0.2, 15); flapSnd(WT(k.nom, 'nominate') - 0.3, 12); flapSnd(WT(k.listed, 'list') - 0.2, 16);

  /* 5:31 CORRECTION: the Federal Scholarship Board is now the Department of Scholarship Awards (DSA) */
  scene('hu-fix', WT(k.fsb, 'federal') + 0.9, 'black', (t) => {
    const R = r(); const at = WT(k.fsb, 'federal') + 0.9;
    correction(t, { x: R.x, y: V(80, 400), w: V(1700, 952), h: R.h }, { at, head: 'UPDATE', said: '"The Federal Scholarship Board"', now: 'It is now called the Department of Scholarship Awards (DSA). Same job: it nominates Nigerian applicants.', cps: 36 });
    clip(t, { x: R.x, y: V(690, 1260), w: V(1500, 952), h: 260 }, 'hu-dsa', { at: at + 2.4, hlAt: [at + 3.0, at + 3.4, at + 3.8], src: 'Embassy of Hungary in Abuja · checked 2 Nov 2026', hlOnly: [0, 1, 2] });
  });
  flapSnd(WT(k.fsb, 'federal') + 0.9, 6, 0.035, -3); cue('typeHit', WT(k.fsb, 'federal') + 2.5, -4); cue('shutter', WT(k.fsb, 'federal') + 2.4, -6); cue('marker', WT(k.fsb, 'federal') + 3.0, -6);

  /* 5:44 not open yet: last round 15 Jan 2026 */
  scene('hu-status', S(k.last), 'term', (t) => {
    const R = r(); board(t, R, { rows: ['hu'], t0: S(k.last) - 0.6, statusAt: { hu: WT(k.notopen, 'open') - 0.2 }, dimAt: WT(k.notopen, 'open'), heads: true, cols: [17, 12, 14] });
    withA(ez(t, WT(k.last, '15th'), 0.35), () => { lab('Last round closed', R.x, V(440, 900), V(34, 32), g.mid, 'left', { key: 'lastl' }); });
    flaps(t, { x: R.x, y: V(470, 930), n: 11, cw: V(54, 52), ch: V(94, 90), text: '15 JAN 2026', key: 'last', t0: WT(k.last, '15th') - 0.1, stag: 0.025, col: NB.dim });
    clip(t, { x: R.x, y: V(680, 1150), w: V(1500, 952), h: 200 }, 'hu-noopen', { at: WT(k.notopen, 'not') - 0.3, hlAt: [WT(k.notopen, 'open'), WT(k.last, '15th')], src: 'Embassy of Hungary in Abuja · checked 2 Nov 2026' });
  });
  boardSnd(S(k.last) - 0.6, 1); flapSnd(WT(k.last, '15th') - 0.1, 11); cue('close', WT(k.notopen, 'open'), -3); cue('shutter', WT(k.notopen, 'not') - 0.3, -6);
  part2d();
}

function part2d() {
  const k = PS({
    est: 'and now estonia this is where i study', state: 'estonia has a state scholarship for international student but it is not available for nigerians',
    only: 'only citizens of certain countries can apply and nigeria is not on that list', real: 'i think for nigerians the realistic options in estonia are the university\'s own tuition discount',
    em: 'and erasmus mundus programmes that include an estonian university', partial: 'i did get a partial scholarship for this program by the way', chose: 'but i chose the current program',
    chev: 'and then for chevening scholarship the uk is not in the eu', pop: 'because it\'s a very popular one', ukgov: 'it\'s the uk government scholarship for one-year masters',
    ng: 'nigerians get in really well', closed: 'i think the application has closed as of october', next: 'you\'re preparing for the next round',
    aug: 'this year it opened around august', nexty: 'so you should prepare for next year',
  });
  const r = () => FR();

  /* 5:50 Estonia, where she studies */
  scene('ee-city', S(k.est), 'black', (t) => {
    photo(t, { x: 0, y: 0, w: W, h: H }, 'tallinn', { at: S(k.est), dur: 9, dim: 0.34, title: 'ESTONIA', sub: 'Where I study', cw: V(76, 70), ty: V(90, 420), fx: 0.3 });
    if (t >= WT(k.state, 'state') - 0.1) { lab('State scholarship (international students)', V(110, 56), V(620, 960), V(32, 30), NB.let, 'left', { key: 'statel' });
      flaps(t, { x: V(110, 56), y: V(650, 990), n: 15, cw: V(54, 52), ch: V(94, 90), text: 'NOT FOR NIGERIA', key: 'notng', t0: WT(k.state, 'not') - 0.1, stag: 0.025, col: NB.dim }); }
  });
  cue('shutter', S(k.est), -6); flapSnd(S(k.est) + 0.15, 7, 0.035); flapSnd(WT(k.state, 'not') - 0.1, 15); cue('close', WT(k.state, 'not') + 0.3, -4);

  /* 6:07 the realistic options in Estonia */
  scene('ee-options', S(k.real), 'term', (t) => {
    const R = r();
    [['UNIVERSITY TUITION DISCOUNT', WT(k.real, 'discount') - 0.3], ['ERASMUS MUNDUS (E.G. AISS)', WT(k.em, 'erasmus') - 0.1]].forEach(([s, at], i) =>
      flaps(t, { x: R.x, y: V(290, 580) + i * V(170, 200), n: 26, cw: V(52, 32), ch: V(94, 60), text: s, key: 'opt ' + i, t0: at, stag: 0.02, col: NB.let }));
  });
  flapSnd(WT(k.real, 'discount') - 0.3, 26, 0.02); flapSnd(WT(k.em, 'erasmus') - 0.1, 26, 0.02);

  /* 6:22 Chevening (UK): closed, next round around August 2027 */
  scene('chev-city', S(k.chev), 'black', (t) => {
    photo(t, { x: 0, y: 0, w: W, h: H }, 'london', { at: S(k.chev), dur: 12, dim: 0.34, title: 'CHEVENING', sub: 'UK · not in the EU, but popular', cw: V(76, 70), ty: V(90, 420) });
    withA(ez(t, k.pop.t, 0.35) * (1 - ez(t, WT(k.ukgov, 'government') - 0.4, 0.2)), () => lab('Not in the EU, but very popular', V(110, 56), V(520, 880), V(34, 32), NB.let, 'left', { key: 'pop' }));
    withA(ez(t, k.ng.t, 0.35), () => lab('Nigerians get in really well', V(110, 56), V(920, 1280), V(34, 32), NB.let, 'left', { key: 'ngin' }));
    withA(ez(t, k.nexty.t, 0.35), () => lab('Prepare for next year', V(110, 56), V(980, 1340), V(34, 32), NB.let, 'left', { key: 'nexty' }));
    if (t >= WT(k.ukgov, 'government') - 0.2) flaps(t, { x: V(110, 56), y: V(540, 900), n: 22, cw: V(46, 36), ch: V(82, 66), text: 'UK GOV · 1-YEAR MASTER\'S', key: 'ukgov', t0: WT(k.ukgov, 'government') - 0.2, stag: 0.02 });
    if (t >= WT(k.closed, 'closed') - 0.2) { flaps(t, { x: V(110, 56), y: V(660, 1020), n: 22, cw: V(46, 36), ch: V(82, 66), text: 'CLOSED · OCT 2026', key: 'closed', t0: WT(k.closed, 'closed') - 0.2, stag: 0.02, col: NB.dim });
      if (t >= WT(k.aug, 'august') - 0.2) flaps(t, { x: V(110, 56), y: V(780, 1140), n: 22, cw: V(46, 36), ch: V(82, 66), text: 'NEXT: AROUND AUG 2027', key: 'next', t0: WT(k.aug, 'august') - 0.2, stag: 0.02, col: NB.let }); }
  });
  cue('shutter', S(k.chev), -6); flapSnd(S(k.chev) + 0.15, 9, 0.035); flapSnd(WT(k.ukgov, 'government') - 0.2, 17, 0.02); cue('close', WT(k.closed, 'closed'), -3); flapSnd(WT(k.aug, 'august') - 0.2, 17, 0.02);
  part2e();
}

function part2e() {
  const k = PS({
    which: 'whichever one of these scholarships you are preparing', friend: 'this is something i\'ll tell a friend', year: 'first start preparing a year before you go',
    y28: 'for example if i want a scholarship for 2028', cal: 'make a calendar for every one of these scholarships', dl: 'put the deadline put the required document',
    deg: 'your degree certificates', tr: 'your transcripts', pp: 'your passports that will not expire soon', cv: 'and up-to-date cv', eng: 'proof of english if you need it',
    off: 'get your official transcript', time: 'because it takes time', stud: 'if you can get a student transcript', mot: 'and for the motivation letter part', ans: 'answer the question that was asked',
    bound: 'so stay within the boundaries of what they asked', same: 'don\'t use the same letter for everywhere', sell: 'so try to sell your experiences',
    passion: 'try to sell your passion', work: 'sell the work that you\'ve done', orig: 'be original', refs: 'ask for your references',
    more: 'and also apply for more than one', comp: 'they are very competitive', last: 'apply only on the official websites', just: 'just the official websites',
    hope: 'i hope you get your scholarship and i hope you get in', root: 'i\'m rooting for you', bye: 'bye',
  });
  const r = () => FR();

  /* 6:50 a year before you go */
  scene('prep', S(k.which), 'term', (t) => {
    const R = r(); withA(ez(t, k.friend.t, 0.4), () => lab('What I\'d tell a friend', R.x, V(250, 560), V(34, 32), g.mid, 'left', { key: 'friend' }));
    KT(t, { lines: V(['Whichever one', 'you apply for'], ['Whichever', 'one you', 'apply for']), x: R.x, y: V(420, 760), size: V(150, 132), times: TM(k.which, 5).concat([k.which.w[4], k.which.w[4]]).slice(0, V(5, 5)), id: 'which', out: k.year.t - 0.15 });
    KT(t, { lines: V(['Start preparing', '*a year* before you go'], ['Start', 'preparing', '*a year*', 'before you go']), x: R.x, y: V(410, 720), size: V(150, 132), times: TM(k.year, 7).map(x => Math.max(x, k.year.t)), id: 'year', acc: NB.let });
  });
  cue('typeHit', WT(k.year, 'year'), -4);
  scene('prep-2028', S(k.y28), 'term', (t) => { const R = r();
    flaps(t, { x: R.x, y: V(360, 670), n: 4, cw: V(110, 100), ch: V(180, 170), text: '2028', key: 'y', t0: WT(k.y28, '2028') - 0.1, stag: 0.05 }); });
  flapSnd(WT(k.y28, '2028') - 0.1, 4, 0.05);

  /* 7:03 a calendar for every scholarship: deadline + documents */
  scene('calendar', S(k.cal), 'term', (t) => {
    const R = r(); board(t, R, { title: 'My calendar · 2028 intake', t0: S(k.cal), rows: ['em', 'si', 'nl'], statusAll: WT(k.dl, 'deadline'), checked: false, heads: true, compact: true, cols: [17, 15],
      status: { em: ['FROM OCT 2027', ''], si: ['FROM OCT 2027', ''], nl: ['PER UNI', ''] } });   // a plan for next year: nothing is open, so no green
  });
  boardSnd(S(k.cal), 3);

  /* 7:12 the documents tick on as she names them */
  scene('docs', S(k.deg), 'term', (t) => {
    const R = r(); const items = [['DEGREE CERTIFICATES', k.deg.t], ['TRANSCRIPTS', k.tr.t], ['VALID PASSPORT', k.pp.t], ['UP-TO-DATE CV', WT(k.cv, 'cv') - 0.2], ['PROOF OF ENGLISH', k.eng.t]];
    lab('Get these ready early', R.x, V(150, 440), V(34, 32), g.mid, 'left', { key: 'ready' });
    items.forEach(([s, at], i) => { const y = V(190, 490) + i * V(140, 150);
      flaps(t, { x: R.x, y, n: 22, cw: V(48, 38), ch: V(88, 74), text: s, key: 'doc ' + i, t0: at - 0.1, stag: 0.02 }); });
    if (t >= WT(k.off, 'official') - 0.1) { flaps(t, { x: V(R.x + 1290, R.x), y: V(190 + 140, 490 + 5 * 150 + 20), n: 9, cw: V(46, 44), ch: V(88, 80), text: 'START NOW', key: 'now', t0: WT(k.time, 'time') - 0.2, stag: 0.03, col: NB.let });
      withA(ez(t, k.stud.t, 0.3), () => lab('A student transcript helps too', V(R.x + 1290, R.x), V(190 + 260, 490 + 5 * 150 + 160), V(28, 28), g.mid, 'left', { key: 'stud', maxW: V(400, 900) }));
      withA(ez(t, WT(k.off, 'official'), 0.3), () => lab('Official transcripts take time', V(R.x + 1290, R.x), V(190 + 60, 490 + 5 * 150), V(28, 28), NB.let, 'left', { key: 'tt', maxW: V(400, 900) })); }
  });
  [k.deg.t, k.tr.t, k.pp.t, WT(k.cv, 'cv') - 0.2, k.eng.t].forEach(x => cue('tick', x, -6)); flapSnd(WT(k.time, 'time') - 0.2, 9, 0.03);

  /* 7:28 the motivation letter: answer the question */
  scene('letter', S(k.mot), 'term', (t) => {
    const R = r();
    withA(ez(t, k.mot.t, 0.4), () => lab('The motivation letter', R.x, V(220, 520), V(34, 32), g.mid, 'left', { key: 'ml' }));
    const rows = [['ANSWER THE QUESTION', WT(k.ans, 'answer')], ['STAY IN THE BOUNDARIES', WT(k.bound, 'boundaries') - 0.3], ['ONE LETTER PER PROGRAMME', WT(k.same, 'same') - 0.2],
      ['SELL YOUR EXPERIENCE', WT(k.sell, 'sell')], ['BE ORIGINAL', WT(k.orig, 'original') - 0.2]];
    rows.forEach(([s, at], i) => { const y = V(260, 560) + i * V(140, 150); withA(ez(t, at - 0.3, 0.2), () => lab('0' + (i + 1), R.x, y + V(58, 50), V(32, 30), g.mid, 'left', { key: 'n' + i }));
      flaps(t, { x: R.x + V(80, 70), y, n: 24, cw: V(48, 34), ch: V(88, 68), text: s, key: 'tip ' + i, t0: at - 0.1, stag: 0.02 }); });
    withA(ez(t, k.passion.t, 0.35), () => lab('Your passion, and the work you have done', R.x + V(80, 70), V(975, 1300), V(30, 28), g.mid, 'left', { key: 'passion' }));
  });
  [WT(k.ans, 'answer'), WT(k.bound, 'boundaries') - 0.3, WT(k.same, 'same') - 0.2, WT(k.sell, 'sell'), WT(k.orig, 'original') - 0.2].forEach(x => flapSnd(x - 0.1, 20, 0.02, -7));

  /* 7:58 references + more than one */
  scene('refs', S(k.refs), 'term', (t) => {
    const R = r(); [['ASK YOUR REFERENCES EARLY', WT(k.refs, 'references') - 0.3, NB.let], ['APPLY FOR MORE THAN ONE', WT(k.more, 'more') - 0.2, NB.let]].forEach(([s, at, c], i) =>
      flaps(t, { x: R.x, y: V(330, 640) + i * V(200, 220), n: 25, cw: V(60, 34), ch: V(110, 66), text: s, key: 'r ' + i, t0: at, stag: 0.02, col: c }));
    withA(ez(t, WT(k.comp, 'competitive'), 0.4), () => lab('They are very competitive', R.x, V(780, 1150), V(36, 32), g.mid, 'left', { key: 'comp' }));
  });
  flapSnd(WT(k.refs, 'references') - 0.3, 25, 0.02); flapSnd(WT(k.more, 'more') - 0.2, 23, 0.02);

  /* 8:05 black phrase card: apply only on the official website */
  scene('official', S(k.last), 'black', (t) => {
    phraseCard(t, { x: 0, y: V(0, 300), w: W, h: V(H, 1200) }, { at: S(k.last) + 0.05, lines: ['OFFICIAL', 'WEBSITES ONLY'], lines9: ['OFFICIAL', 'WEBSITES', 'ONLY'], key: 'official' });
  });
  cue('shutter', S(k.last), -2); flapSnd(S(k.last) + 0.05, 17, 0.03, -4);

  /* 8:10 the close: the board again, every row boards */
  scene('end', S(k.hope), 'term', (t) => {
    const R = r(); const tR = WT(k.root, 'rooting') - 0.1;
    board(t, R, { title: 'Departures · 2027 intake', t0: -99, checked: true });   // (2026-11-07: no 'I'm rooting for you' re-typed; the board stays, her handle at the bye)
    if (t >= tR) {
      withA(ez(t, k.bye.t, 0.4), () => lab('@WithGbemi', W / 2, V(820, 1350), V(36, 34), NB.let, 'center', { key: 'handle', lower: true })); }
  });
  flapSnd(WT(k.root, 'rooting') - 0.1, 11, 0.03, -4);
}
