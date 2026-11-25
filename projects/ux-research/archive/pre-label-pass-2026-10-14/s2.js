/* ux-research film, part 2: what UX is, UX research, why, the researcher, the categories (edited voice 1:10-4:49). */
'use strict';

/** card with a big Schibsted headline and an optional typed line under it */
function headCard(t, key, x, y, w, h, t0, big, o = {}) {
  card(t, key, x, y, w, h, { t: t0, rot: o.rot || 0, head: o.head || (o.size || 120) + 30, lh: o.lh || 52, lines: o.lines, out: o.out }, (cx, cy) => {
    textBlock(key + ' head', big, cx + 44, cy + (o.size || 120) * 0.95 + 8, { font: (z) => FX.grot(z, 800), size: o.size || 120, col: UX.ink, ls: -0.04, maxW: w - 88, lh: (o.size || 120) * 0.96 });
    if (o.sub) typedWords(t, key + ' sub', o.sub, cx + 46, cy + (o.subY || (o.size || 120) + 96), o.subSize || 40, UX.ink, o.subT || [t0 + 0.3], { w: o.subW || 400, maxW: w - 92, lh: o.subLh });
  });
}
/** card with typed words only (Courier Prime bold, her words) */
function typedCard(t, key, x, y, w, h, t0, text, times, o = {}) {
  card(t, key, x, y, w, h, { t: t0, rot: o.rot || 0, head: o.head || 70, lh: o.lh || (o.size || 52) * 1.3, lines: o.lines, out: o.out }, (cx, cy) => {
    typedWords(t, key + ' text', text, cx + 44, cy + (o.y0 || (o.head || 70) + (o.size || 52) * 1.3 - 12), o.size || 52, UX.ink, times, { maxW: w - 88, lh: (o.size || 52) * 1.3, w: o.w || 700 });
  });
}

/* ---------- what is UX ---------- */
function buildWhatUX(prev) {
  const k = PS({ wux: 'now what is ux', cov: 'user experience or ux covers everything about how a person experiences a product or a service' });
  const b = board('what-is-ux', (t) => {
    wallWord(t, 'UX?', 'UX?', V(150, 80), V(330, 640), V(250, 230), UX.paint, k.wux.w[3], k.wux.w[3] + 0.4);
    typedCard(t, 'ux definition', V(760, 70), V(170, 760), V(1020, 940), V(620, 640), k.cov.w[3], 'UX covers everything about how a person experiences a product or a service.', k.cov.w.slice(3), { size: V(58, 56), rot: 1.2 });
    const ev = V([840, 380, 330, 90], [130, 990, 330, 80]);   // "everything" circled (card space + card position)
    stroke(t, loopPts(ev[0], ev[1], ev[2], ev[3], 4, 18), k.cov.w[5] + 0.15, 0.55, UX.ora, 8);
  });
  link(prev, b, k.wux.t - 0.75); screen(k.wux.t - 0.75, 'what-is-ux', 'what is UX?'); camBoard(k.wux.t - 0.75, b);
  sfx('pen', k.wux.w[3], -3); sfx('card', k.cov.w[3]); sfx('pen', k.cov.w[5] + 0.15, -6);
  return b;
}

/* ---------- Don Norman + Norman & Nielsen's definition (real sources) ---------- */
function buildNorman(prev) {
  const k = PS({ term: 'the term was popularised by don norman when he was at apple', way: 'and the way he and jakob nielsen describe it',
    ev: "user experience covers every part of a person's interaction with a company its services and its products" });
  const b = board('norman', (t) => {
    const P_ = PORTRAIT;
    // part 1: his NN/g bio (1993: he joined Apple; first job title with "User Experience")
    sourceShot(t, 'norman bio', V(110, 50), V(170, 470), V(1700, 980), 'src_nng_norman', { t: k.term.w[3], rot: -0.6, hl: [[272, 32, 322, 23, k.term.w[9] + 0.1], [238, 57, 596, 23, k.term.w[3] + 0.6]] });
    credit(t, 'norman credit', 'Screenshot: Don Norman\'s bio, nngroup.com', V(110, 50), V(470, 680), k.term.w[3] + 0.5, { maxW: V(1700, 940) });
    note(t, 'Don Norman', V(330, 90), V(600, 820), V(300, 290), 'Don Norman', { t: k.term.w[5], rot: -3, fs: 60 });
    note(t, 'at Apple', V(720, 410), V(620, 840), V(300, 290), 'at Apple', { t: k.term.w[10], rot: 4, fs: 60, bg: UX.ora });
    credit(t, 'early 1990s', 'He joined Apple in the early 1990s.', V(1060, 60), V(780, 1230), k.term.w[10] + 0.6, { col: UX.paint, maxW: V(700, 940) });
    // part 2: Norman and Nielsen's definition, highlighted on her words
    const ox = V(1920 * 0.85, 0), oy = V(0, 1920 * 0.8);
    sourceShot(t, 'nng definition', ox + V(220, 60), oy + V(150, 380), V(1240, 960), 'src_nng_def', { t: k.way.w[4], rot: 0.8, hl: [[175, 222, 692, 30, k.ev.w[3]], [64, 256, 466, 30, k.ev.w[8]]] });
    credit(t, 'definition credit', 'Screenshot: "The Definition of User Experience", nngroup.com', ox + V(220, 60), oy + V(620, 760), k.way.w[4] + 0.5, { maxW: V(1400, 960) });
    ['the company', 'its services', 'its products'].forEach((s, i) => note(t, s, ox + V(330 + i * 440, 70 + i * 330), oy + V(720, 900 + (i % 2) * 40), V(300, 290), s, { t: [k.ev.w[11], k.ev.w[13], k.ev.w[16]][i], rot: tilt(i + 11), fs: 56, bg: i === 0 ? UX.ora : UX.note }));
  }, { span: [1.85, 1.8] });
  link(prev, b, k.term.t - 0.75); screen(k.term.t - 0.75, 'norman', 'Don Norman'); camPart(k.term.t - 0.75, b, 0, 0);
  cam(k.term.w[11] + 0.15, b, [1003, 565], [283, 535], [1.9, 2.6], 0.6);   // the highlighted line, readable
  screen(k.way.t - 0.3, 'definition', 'the definition'); cam(k.way.t - 0.3, b, [1920 * 0.85 + 960, 540], [540, 1920 * 0.8 + 960], 1, 0.8);
  sfx('shutter', k.term.w[3]); sfx('pop', k.term.w[5], -3); sfx('pop', k.term.w[10], -3); sfx('swipe', k.way.t - 0.05, -6); sfx('shutter', k.way.w[4], -2);
  sfx('pop', k.ev.w[11], -4); sfx('pop', k.ev.w[16], -4);
  MOTION.expect('Norman bio lands', k.term.w[3], { el: 'norman/@norman bio' });
  return b;
}

/* ---------- human-centred design + the line from the Medium article ---------- */
function buildQuote(prev) {
  const k = PS({ hcd: 'an idea called human-centred design', simple: 'the idea is simple', phrase: 'i love this phrase', med: 'medium article',
    q: "good design doesn't start with screens it starts with people" });
  const b = board('quote', (t) => {
    headCard(t, 'human-centred design', V(150, 70), V(70, 400), V(1000, 940), V(250, 300), k.hcd.w[3], 'human-centred design', { size: V(92, 96), rot: -1.5, lines: false, out: k.q.w[5] - 0.45 });
    wallWord(t, 'a phrase I love', 'a phrase I love:', V(1240, 80), V(200, 780), V(72, 64), UX.ora, k.phrase.w[1], k.phrase.w[3] + 0.3, { out: k.q.t + 1.2 });
    const L = V([330, 360, 1260, 500, 96], [70, 820, 940, 600, 78]);
    card(t, 'quote card', L[0], L[1], L[2], L[3], { t: k.q.t, rot: -0.8, lines: false, from: 1.08, spin: 2 }, (x, y) => {
      const f = FX.grot(L[4], 800), ls = -L[4] * 0.035;
      const l1a = "Good design doesn't start with ", l1b = 'screens.', l2a = 'It starts with ', l2b = 'people.';
      const y1 = y + V(150, 150), y2 = y1 + L[4] * V(1.5, 1.6);
      const two = PORTRAIT;   // portrait: four lines
      const lines = two ? [["Good design doesn't", ''], ['start with ', 'screens.'], ['It starts with', ''], ['', 'people.']] : [["Good design doesn't start", ''], ['with ', 'screens.'], ['It starts with ', 'people.']];
      const ys = two ? [y + 140, y + 140 + 96, y + 140 + 96 * 2 + 40, y + 140 + 96 * 3 + 40] : [y + 150, y + 150 + 100, y + 150 + 200 + 50];
      const wk = two ? [k.q.w[0], k.q.w[3], k.q.w[6], k.q.w[8]] : [k.q.w[0], k.q.w[4], k.q.w[6]];
      lines.forEach(([a, bb], i) => { const tt = wk[Math.min(i, 3)]; const p = MOTION.ease(t, tt - 0.05, 0.3, 'outExpo'); if (p <= 0) return;
        withA(clamp(p * 2), () => { _txt(a, x + 60, ys[i], f, UX.ink, 'left', 'alphabetic', ls); if (bb) _txt(bb, x + 60 + tw(a, f, ls), ys[i], f, UX.ink, 'left', 'alphabetic', ls); });
        if (bb === 'screens.') { const sx = x + 60 + tw(a, f, ls), sw = tw(bb, f, ls); stroke(t, [[sx - 8, ys[i] - L[4] * 0.3], [sx + sw + 10, ys[i] - L[4] * 0.36]], k.q.w[5] + 0.2, 0.35, UX.ora, 12); }
        if (bb === 'people.') { const sx = x + 60 + tw(a, f, ls), sw = tw(bb, f, ls); stroke(t, loopPts(sx + 8, ys[i] - L[4] * 0.8, sw - 8, L[4] * 0.95, 11, 4), k.q.w[8] + 0.2, 0.55, UX.ora, 9); }
      });
    });
    credit(t, 'medium credit', 'Line from a Medium article.', L[0], L[1] + L[3] + V(70, 80), k.q.t + 0.4);
  });
  link(prev, b, k.hcd.t - 0.75); screen(k.hcd.t - 0.75, 'quote', 'human-centred design'); camBoard(k.hcd.t - 0.75, b);
  cam(k.q.w[5] - 0.2, b, [960, 540], [640, 1120], [1.12, 1.1], 0.7);
  sfx('card', k.hcd.w[3]); sfx('pen', k.phrase.w[1], -2); sfx('card', k.q.t, -2); sfx('pen', k.q.w[5] + 0.2, -2); sfx('pen', k.q.w[8] + 0.2, -3);
  return b;
}

/* ---------- start from the people: their needs, abilities, limitations, real lives ---------- */
function buildAround(prev) {
  const k = PS({ start: 'so you start from the people who use a product', needs: 'their needs', abil: 'their abilities', lim: 'their limitations', lives: 'their real lives', around: 'and you design around them' });
  const b = board('around-people', (t) => {
    const cx = BW() / 2, cy = BH() / 2 + V(10, -40);
    // a person drawn in paint marker at the centre
    const hp = MOTION.ease(t, k.start.w[4], 0.6, 'outQuint');
    strokePts(loopPts(cx - 70, cy - 230, 140, 140, 2, 0), hp, UX.paint, 12);
    stroke(t, [[cx - 170, cy + 120], [cx - 150, cy - 30], [cx - 60, cy - 70], [cx + 60, cy - 70], [cx + 150, cy - 30], [cx + 170, cy + 120]], k.start.w[4] + 0.35, 0.6, UX.paint, 12);
    const s = V(290, 290);
    const pos = V([[180, 110], [1450, 110], [180, 680], [1450, 680]], [[80, 380], [710, 380], [80, 1340], [710, 1340]]);
    [['their needs', k.needs], ['their abilities', k.abil], ['their limitations', k.lim], ['their real lives', k.lives]].forEach(([w, p_], i) => note(t, w, pos[i][0], pos[i][1], s, w, { t: p_.w[1], rot: tilt(i + 3), fs: 52, bg: i === 3 ? UX.ora : UX.note }));
    stroke(t, loopPts(V(130, 50), V(70, 340), V(1660, 980), V(940, 1360), 21, 10), k.around.w[3], 0.8, UX.ora, 10);
    wallWord(t, 'design around them', 'design around them', cx, cy + V(300, 360), V(76, 56), UX.paint, k.around.w[2], k.around.w[4] + 0.3, { align: 'center' });
  });
  link(prev, b, k.start.t - 0.6); screen(k.start.t - 0.6, 'around-people', 'start from the people'); camBoard(k.start.t - 0.6, b);
  sfx('pen', k.start.w[4], -4); sfx('pop', k.needs.w[1], -3); sfx('pop', k.lim.w[1], -3); sfx('pop', k.lives.w[1], -2); sfx('pen', k.around.w[3], -3);
  return b;
}

/* ---------- what is UX research ---------- */
function buildWhatUXR(prev) {
  const k = PS({ know: 'so now we know what ux is', what: 'now what is ux research', get: 'ux research is how you get to know your users',
    und: 'it is the work of understanding the people', need: 'what they need', str: 'where they struggle', pri: 'what they prioritise',
    right: 'so that you can build the product the right way', works: 'build it in a way that actually works for them' });
  const b = board('what-is-ux-research', (t) => {
    note(t, 'UX done', V(150, 80), V(110, 400), V(220, 220), 'UX', { t: k.know.w[4], rot: -4, fs: 96, after: (x, y, s) => stroke(t, [[x + s * 0.62, y + s * 0.8], [x + s * 0.74, y + s * 0.93], [x + s * 0.97, y + s * 0.62]], k.know.w[5] + 0.1, 0.3, UX.green, 11) });
    wallWord(t, 'UX research?', 'UX research?', V(450, 350), V(250, 560), V(150, 104), UX.paint, k.what.w[3], k.what.w[4] + 0.35);
    typedCard(t, 'get to know', V(450, 70), V(310, 640), V(1100, 940), V(240, 260), k.get.w[4], 'how you get to know your users', k.get.w.slice(3), { size: V(56, 54), rot: -1 });
    const s = V(270, 280), pos = V([[260, 620], [620, 640], [980, 615]], [[60, 960], [400, 980], [740, 955]]);
    [['what they need', k.need], ['where they struggle', k.str], ['what they prioritise', k.pri]].forEach(([w, p_], i) => note(t, w, pos[i][0], pos[i][1], s, w, { t: p_.t, rot: tilt(i + 21), fs: 48 }));
    arrowStroke(t, V(wavyPts(1290, 760, 1460, 760, 10, 4, 18), wavyPts(540, 1245, 540, 1295, 6, 4, 10)), k.right.w[4], 0.5, UX.paint, 8);
    note(t, 'works for them', V(1490, 380), V(610, 1310), V(310, 280), 'works for them', { t: k.works.w[7], rot: 3, fs: 54, bg: UX.ora });
  });
  link(prev, b, k.know.t - 0.7); screen(k.know.t - 0.7, 'what-is-ux-research', 'what is UX research?'); camBoard(k.know.t - 0.7, b);
  sfx('tick', k.know.w[5] + 0.1, -3); sfx('pen', k.what.w[3], -4); sfx('card', k.get.w[4]); sfx('pop', k.need.t, -3); sfx('pop', k.pri.t, -3); sfx('pen', k.right.w[4], -5); sfx('pop', k.works.w[7], -1);
  return b;
}

/* ---------- why: don't build the wrong thing; building is expensive ---------- */
function buildWhy(prev) {
  const k = PS({ why: 'why are we doing all this research', wrong: "you don't want to build the wrong thing", guess: 'guess your way through', wrong2: "you don't want to build the wrong thing",
    exp: 'building is very expensive', ai: 'even with ai you still spend your time and your tokens', team: 'you probably still need a team' });
  const b = board('why', (t) => {
    wallWord(t, 'Why?', 'Why?', V(130, 80), V(300, 600), V(190, 220), UX.paint, k.why.w[0], k.why.w[0] + 0.4);
    headCard(t, 'wrong thing', V(720, 70), V(140, 760), V(1090, 940), V(470, 470), k.wrong.w[1], "You don't want to build the wrong thing.", { size: V(110, 92), rot: 1, lines: false });
    note(t, 'guess', V(250, 150), V(560, 1300), V(280, 270), 'guess your way through', { t: k.guess.w[0], rot: -5, fs: 50, out: k.wrong2.t + 0.3,
      after: (x, y, s) => { stroke(t, [[x + 20, y + 20], [x + s - 20, y + s - 20]], k.guess.w[3] + 0.3, 0.25, UX.ink, 11); stroke(t, [[x + s - 20, y + 20], [x + 20, y + s - 20]], k.guess.w[3] + 0.5, 0.25, UX.ink, 11); } });
    // part 2: building is expensive (her three costs)
    const ox = V(1920, 0), oy = V(0, 1920);
    wallWord(t, 'Building is expensive.', 'Building is expensive.', ox + V(150, 80), oy + V(260, 560), V(120, 84), UX.paint, k.exp.w[0], k.exp.w[3] + 0.3);
    const s = V(330, 300), pos = V([[150, 470], [600, 490], [1050, 465]], [[60, 820], [400, 1180], [720, 820]]);
    [['your time', k.ai.w[6]], ['your tokens', k.ai.w[9]], ['a team', k.team.w[3]]].forEach(([w, tt], i) => note(t, w, ox + pos[i][0], oy + pos[i][1], s, w, { t: tt, rot: tilt(i + 31), fs: 64, bg: i === 2 ? UX.ora : UX.note }));
    credit(t, 'even with AI', 'even with AI', ox + V(1480, 80), oy + V(700, 1640), k.ai.w[2], { col: UX.paint, size: V(52, 46) });
  }, { span: [1.0 + 1920 * 0 + 1, 2.0] });
  link(prev, b, k.why.t - 0.7); screen(k.why.t - 0.7, 'why', 'why do research?'); camPart(k.why.t - 0.7, b, 0, 0);
  screen(k.exp.t - 0.35, 'expensive', 'building is expensive'); camPart(k.exp.t - 0.35, b, V(1, 0), V(0, 1));
  sfx('pen', k.why.w[0], -3); sfx('hit', k.wrong.w[1], -4); sfx('pop', k.guess.w[0], -4); sfx('error', k.guess.w[3] + 0.3, -6);
  sfx('swipe', k.exp.t - 0.05, -6); sfx('cash', k.exp.w[3], -4); sfx('pop', k.ai.w[6], -4); sfx('pop', k.ai.w[9], -4); sfx('pop', k.team.w[4], -3);
  return b;
}

/* ---------- why products fail; catch both early; cheaper to change a sketch ---------- */
function buildFail(prev) {
  const k = PS({ f1: 'a lot of products fail because the team built something that maybe nobody actually needs', f2: 'some other products fail because they build the right thing',
    find: "people just couldn't find their way around it", fig: "or people just couldn't figure it out", catch: 'ux research helps to catch both problems early on',
    cheap: 'it is cheaper to change your idea or change your sketch', live: 'than it is to rebuild an app that is already live' });
  const b = board('fail', (t) => {
    const c1 = V([130, 120, 780, 560], [70, 380, 940, 560]), c2 = V([1010, 140, 780, 560], [70, 980, 940, 540]);
    typedCard(t, 'fail one', ...c1, k.f1.w[4], 'built something that maybe nobody actually needs', k.f1.w.slice(7), { size: V(50, 50), rot: -1.5 });
    typedCard(t, 'fail two', ...c2, k.f2.t, "built the right thing, but people just couldn't find their way around it", [...k.f2.w.slice(6, 10), ...k.find.w], { size: V(50, 50), rot: 1.2 });
    // a lost path drawn on "figure it out"
    const lp = []; for (let i = 0; i <= 80; i++) { const u = i / 80; lp.push([c2[0] + 120 + u * (c2[2] - 260) + Math.sin(u * 17) * 60, c2[1] + c2[3] - 150 + Math.cos(u * 13) * 60]); }
    stroke(t, lp, k.fig.w[4], 0.9, UX.ora, 8);
    stroke(t, loopPts(c1[0], c1[1], c1[2], c1[3], 31, 26), k.catch.w[5], 0.5, UX.paint, 9);
    stroke(t, loopPts(c2[0], c2[1], c2[2], c2[3], 33, 26), k.catch.w[6], 0.5, UX.paint, 9);
    wallWord(t, 'catch both early', 'catch both, early', V(960, 540), V(800, 1600), V(84, 76), UX.ora, k.catch.w[6], k.catch.w[8] + 0.3, { align: 'center' });
    // part 2: a sketch on a note vs an app that is already live
    const ox = V(1920, 0), oy = V(0, 1920);
    note(t, 'sketch note', ox + V(200, 120), oy + V(250, 480), V(420, 400), '', { t: k.cheap.w[9], rot: -4, after: (x, y, s) => {
      stroke(t, [[x + s * 0.32, y + s * 0.15], [x + s * 0.68, y + s * 0.15], [x + s * 0.68, y + s * 0.85], [x + s * 0.32, y + s * 0.85], [x + s * 0.32, y + s * 0.15]], k.cheap.w[9] + 0.1, 0.6, UX.ink, 6);
      stroke(t, [[x + s * 0.38, y + s * 0.3], [x + s * 0.62, y + s * 0.3]], k.cheap.w[9] + 0.6, 0.2, UX.ink, 6);
      stroke(t, [[x + s * 0.38, y + s * 0.42], [x + s * 0.55, y + s * 0.42]], k.cheap.w[9] + 0.7, 0.2, UX.ink, 6); } });
    credit(t, 'your sketch', 'your sketch', ox + V(260, 160), oy + V(760, 950), k.cheap.w[9] + 0.3, { col: UX.paint });
    card(t, 'live app', ox + V(1060, 360), oy + V(170, 1080), V(620, 600), V(640, 520), { t: k.live.w[6], rot: 2, lines: false }, (x, y, w, h) => {
      fillRR(x + w / 2 - 150, y + 60, 300, h - 120, 34, UX.ink); rect(x + w / 2 - 120, y + 110, 240, 120, UX.ora); rect(x + w / 2 - 120, y + 260, 180, 18, '#FFFDF6');
      const sp = MOTION.ease(t, k.live.w[9], 0.35, 'outExpo'); withA(sp, () => withT(x + w - 120, y + 90, lerp(1.6, 1, sp), -0.2, () => { strokeR(-90, -40, 180, 80, UX.ora, 7); _txt('LIVE', 0, 18, FX.marker(56), UX.ora, 'center'); }));
      _txt('ILLUSTRATION', x + 30, y + h - 26, FX.type(32, 700), '#6C6A66');
    });
    wallWord(t, 'cheaper', 'cheaper', ox + V(240, 120), oy + V(150, 450), V(110, 96), UX.ora, k.cheap.w[3], k.cheap.w[3] + 0.35);
  }, { span: [2, 2] });
  link(prev, b, k.f1.t - 0.25); screen(k.f1.t - 0.25, 'fail', 'why products fail'); camPart(k.f1.t - 0.25, b, 0, 0);
  cam(k.f2.t - 0.4, b, [960, 540], [540, 915], 1, 0.8);
  screen(k.cheap.t - 0.3, 'cheaper', 'cheaper to change a sketch'); camPart(k.cheap.t - 0.3, b, V(1, 0), V(0, 1));
  sfx('card', k.f1.w[4]); sfx('card', k.f2.t, -2); sfx('pen', k.fig.w[4], -4); sfx('pen', k.catch.w[5], -3); sfx('swipe', k.cheap.t - 0.05, -6);
  sfx('pen', k.cheap.w[9] + 0.1, -2); sfx('card', k.live.w[6], -2); sfx('hit', k.live.w[9], -6);
  return b;
}

/* ---------- decisions come from real people, not a random person on the team ---------- */
function buildRealPeople(prev) {
  const k = PS({ dec: 'and doing ux research means that decisions about a product come from what the users the real people actually do', rand: 'otherwise they just come from a random person on the team' });
  const b = board('real-people', (t) => {
    typedCard(t, 'decisions', V(150, 70), V(110, 380), V(1000, 940), V(400, 470), k.dec.w[1], 'Decisions about a product come from what the users, the real people, actually do.', k.dec.w.slice(5), { size: V(52, 50), rot: -1 });
    for (let i = 0; i < 5; i++) { const px = V(260 + i * 170, 170 + i * 180), py = V(800, 1080); const a = MOTION.ease(t, k.dec.w[16] + i * 0.12, 0.4, 'outExpo'); person(px, py + (1 - a) * 30, 110, i === 2 ? UX.ora : UX.paint, a); }
    note(t, 'random person', V(1290, 690), V(600, 1220), V(380, 360), 'a random person on the team', { t: k.rand.w[6], rot: 4, fs: 56, bg: UX.ora,
      after: (x, y, s) => { stroke(t, [[x + 24, y + 24], [x + s - 24, y + s - 24]], k.rand.w[9] + 0.15, 0.25, UX.ink, 12); stroke(t, [[x + s - 24, y + 24], [x + 24, y + s - 24]], k.rand.w[9] + 0.35, 0.25, UX.ink, 12); } });
  });
  link(prev, b, k.dec.t - 0.7); screen(k.dec.t - 0.7, 'real-people', 'real people decide'); camBoard(k.dec.t - 0.7, b);
  cam(k.rand.w[6] + 0.25, b, [1480, 790], [870, 1400], [1.8, 2.3], 0.6);
  sfx('card', k.dec.w[5]); sfx('pop', k.dec.w[16], -4); sfx('pop', k.rand.w[6], -3); sfx('error', k.rand.w[9] + 0.15, -6);
  return b;
}

/* ---------- who is a UX researcher ---------- */
function buildResearcher(prev) {
  const k = PS({ who: 'now who is a ux researcher', does: 'a ux researcher does ux research', works: 'works closely with designers product managers engineers and the people running the business',
    bring: 'their job is to bring real users into those conversations' });
  const b = board('researcher', (t) => {
    wallWord(t, 'Who is a UX researcher?', 'Who is a UX researcher?', BW() / 2, V(170, 470), V(96, 68), UX.paint, k.who.w[3], k.who.w[5] + 0.3, { align: 'center' });
    const cs = V([[150, 290], [1290, 290], [150, 790], [1290, 790]], [[60, 640], [560, 640], [60, 1260], [560, 1260]]);
    const cw = V(480, 460), ch = V(170, 170);
    const ws = [['designers', k.works.w[3]], ['product managers', k.works.w[4]], ['engineers', k.works.w[6]], ['the people running the business', k.works.w[9]]];
    const cx = BW() / 2, cy = V(560, 1060);
    ws.forEach(([w, tt], i) => {
      card(t, w, cs[i][0], cs[i][1], cw, ch, { t: tt, rot: tilt(i + 41, 2), lines: false }, (x, y) => textBlock(w + ' text', w, x + 36, y + 70, { font: (z) => FX.type(z, 700), size: V(44, 42), col: UX.ink, maxW: cw - 72, lh: 50 }));
      const ex = cs[i][0] + cw / 2, ey = cs[i][1] + ch / 2; stroke(t, wavyPts(cx, cy, lerp(cx, ex, 0.62), lerp(cy, ey, 0.62), 6, i, 14), k.bring.w[9] + i * 0.1, 0.4, UX.paint, 6);
    });
    note(t, 'real users', cx - V(160, 150), cy - V(160, 150), V(320, 300), 'real users', { t: k.bring.w[6], rot: -2, fs: 66, bg: UX.ora });
  });
  link(prev, b, k.who.t - 0.7); screen(k.who.t - 0.7, 'researcher', 'who is a UX researcher?'); camBoard(k.who.t - 0.7, b);
  sfx('pen', k.who.w[3], -4); sfx('card', k.works.w[3], -2); sfx('card', k.works.w[6], -3); sfx('pop', k.bring.w[6]); sfx('pen', k.bring.w[9], -5);
  return b;
}

/* ---------- a typical week, then: find patterns (clustering) ---------- */
function buildWeek(prev) {
  const k = PS({ typ: 'a typical week for a ux researcher might look like', plan: 'planning a study', rec: 'recruiting people to take part', run: 'running user interviews or usability testing',
    sit: 'then sitting down with the notes or the recordings', pat: 'to find patterns' });
  const b = board('week', (t) => {
    const steps = [['01', 'plan a study', k.plan.t], ['02', 'recruit people to take part', k.rec.t], ['03', 'run interviews or usability tests', k.run.w[1]], ['04', 'sit down with the notes or the recordings', k.sit.t]];
    const pos = V([[110, 330], [540, 350], [970, 325], [1400, 345]], [[60, 500], [560, 520], [60, 1040], [560, 1060]]);
    const cw = V(410, 460), ch = V(420, 470);
    wallWord(t, 'a typical week', 'a typical week', V(110, 60), V(220, 450), V(100, 92), UX.paint, k.typ.w[0], k.typ.w[3] + 0.3);
    steps.forEach(([n, s, tt], i) => card(t, 'step ' + n, pos[i][0], pos[i][1], cw, ch, { t: tt, rot: tilt(i + 51, 2), head: 150, lh: 50 }, (x, y) => {
      _txt(n, x + 34, y + 118, FX.grot(110, 800), UX.ora, 'left', 'alphabetic', -4);
      textBlock(s, s, x + 34, y + 210, { font: (z) => FX.type(z, 700), size: V(42, 44), col: UX.ink, maxW: cw - 68, lh: 50 });
    }));
    // part 2: find patterns: notes land scattered, then gather into three clusters, circled (illustration)
    const ox = V(1920, 0), oy = V(0, 1920);
    headCard(t, 'find patterns', ox + V(150, 70), oy + V(110, 390), V(980, 940), V(270, 250), k.pat.w[0], 'find patterns', { size: V(110, 92), rot: -1.2, sub: 'in the notes or the recordings', subSize: 36, subT: k.sit.w.slice(4), subY: V(190, 180) });
    const C = V([[420, 680], [1000, 680], [1560, 680]], [[260, 900], [820, 900], [540, 1300]]); const s = V(138, 128);
    const T0 = k.sit.w[5];
    for (let i = 0; i < 15; i++) {
      const g_ = i % 3, j = Math.floor(i / 3); const ang = j * 1.3 + g_, r = j === 0 ? 0 : s * 0.72;
      const tx = C[g_][0] + Math.cos(ang) * r - s / 2, ty = C[g_][1] + Math.sin(ang) * r * 0.8 - s / 2;
      const sx = V(120, 60) + hash(i + 3) * (BW() - V(380, 240)), sy = V(430, 700) + hash(i + 40) * V(520, 700);
      const m = MOTION.ease(t, k.pat.w[1] + g_ * 0.1, 0.7, 'inOutQuart');
      note(t, 'pattern note ' + i, lerp(ox + sx, ox + tx, m), lerp(oy + sy, oy + ty, m), s, '', { t: T0 + i * 0.06, rot: (hash(i * 9) - 0.5) * 14 * (1 - m * 0.5), bg: g_ === 1 ? UX.ora : UX.note, scribble: true, seed: i + 1 });
    }
    C.forEach((cc, i) => stroke(t, loopPts(ox + cc[0] - s * 1.25, oy + cc[1] - s * 1.12, s * 2.5, s * 2.15, i + 7), k.pat.w[1] + 0.75 + i * 0.15, 0.5, i === 1 ? UX.ora : UX.paint, 7));
    credit(t, 'patterns illustration', 'Illustration: notes from interviews', ox + V(150, 70), oy + V(990, 1580), T0 + 0.6);
  }, { span: [2, 2] });
  link(prev, b, k.typ.t - 0.7); screen(k.typ.t - 0.7, 'week', 'a typical week'); camPart(k.typ.t - 0.7, b, 0, 0);
  screen(k.sit.w[2], 'patterns', 'find patterns'); camPart(k.sit.w[2], b, V(1, 0), V(0, 1));
  sfx('card', k.plan.t); sfx('card', k.rec.t, -2); sfx('card', k.run.w[1], -2); sfx('card', k.sit.t, -3); sfx('swipe', k.sit.w[2] + 0.35, -6);
  sfx('pop', k.sit.w[5], -4); sfx('card', k.pat.w[0], -4); sfx('pen', k.pat.w[1] + 0.75, -4);
  return b;
}

/* ---------- sharing what they found changes what gets built ---------- */
function buildShare(prev) {
  const k = PS({ fin: 'and finally sharing what they found', team: 'with the team in a way that actually changes what gets built' });
  const b = board('share', (t) => {
    typedCard(t, 'sharing', V(150, 70), V(160, 400), V(860, 940), V(320, 300), k.fin.w[2] + 0.5, 'sharing what they found with the team', [...k.fin.w.slice(2), ...k.team.w.slice(0, 3)], { size: V(54, 54), rot: -1.2 });
    note(t, 'what gets built', V(1180, 300), V(140, 860), V(560, 560), '', { t: k.team.w[7], rot: 3, after: (x, y, s) => {
      // the product sketch: a screen whose main button gets redrawn after the finding
      strokePts([[x + s * 0.3, y + s * 0.1], [x + s * 0.7, y + s * 0.1], [x + s * 0.7, y + s * 0.9], [x + s * 0.3, y + s * 0.9], [x + s * 0.3, y + s * 0.1]], 1, UX.ink, 6);
      strokePts([[x + s * 0.36, y + s * 0.26], [x + s * 0.62, y + s * 0.26]], 1, UX.ink, 6);
      strokePts([[x + s * 0.38, y + s * 0.72], [x + s * 0.5, y + s * 0.72]], 1, UX.ink, 8);
      stroke(t, [[x + s * 0.34, y + s * 0.68], [x + s * 0.56, y + s * 0.77]], k.team.w[9], 0.25, UX.ora, 8);
      stroke(t, loopPts(x + s * 0.36, y + s * 0.5, s * 0.28, s * 0.1, 3, 8), k.team.w[9] + 0.3, 0.45, UX.ora, 8);
    } });
    wallWord(t, 'changes what gets built', 'changes what gets built', V(1080, 120), V(940, 1560), V(58, 70), UX.ora, k.team.w[7], k.team.w[10] + 0.3);
  });
  link(prev, b, k.fin.t + 0.1); screen(k.fin.t + 0.1, 'share', 'share what they found'); camBoard(k.fin.t + 0.1, b);
  sfx('card', k.fin.w[2]); sfx('pop', k.team.w[7], -3); sfx('pen', k.team.w[9], -2);
  return b;
}

/* ---------- researcher vs designer ---------- */
function buildRvsD(prev) {
  const k = PS({ mix: 'people usually mix up who a ux researcher is and who a ux designer is', rj: "a ux researcher's job is to understand the users what they need",
    dj: "a ux designer's job is to take that understanding and design the product around it", one: 'just one person that ends up doing both jobs', pm: 'a lot of product managers that do research' });
  const b = board('researcher-vs-designer', (t) => {
    const c1 = V([110, 140, 780, 470], [70, 380, 940, 430]), c2 = V([1030, 160, 780, 470], [70, 1010, 940, 430]);
    headCard(t, 'UX researcher', ...c1, k.mix.w[2], 'UX researcher', { size: V(84, 80), rot: -1.5, sub: 'understand the users, what they need', subSize: V(44, 44), subT: k.rj.w.slice(6), subY: V(196, 190), subW: 700 });
    headCard(t, 'UX designer', ...c2, k.mix.w[11], 'UX designer', { size: V(84, 80), rot: 1.2, sub: 'take that understanding and design the product around it', subSize: V(44, 44), subT: k.dj.w.slice(5), subY: V(196, 190), subW: 700 });
    arrowStroke(t, V(wavyPts(830, 420, 1060, 470, 10, 2, 16), wavyPts(860, 830, 860, 1030, 10, 2, 16)), k.dj.w[7], 0.5, UX.ora, 9);
    note(t, 'one person, both jobs', V(560, 90), V(690, 1330), V(310, 260), 'one person, both jobs', { t: k.one.w[1], rot: -4, fs: 54, bg: UX.ora });
    note(t, 'product managers', V(1040, 620), V(700, 1340), V(310, 260), 'product managers do research too', { t: k.pm.w[4], rot: 3, fs: 46 });
  });
  link(prev, b, k.mix.t - 0.7); screen(k.mix.t - 0.7, 'researcher-vs-designer', 'researcher vs designer'); camBoard(k.mix.t - 0.7, b);
  sfx('card', k.mix.w[5]); sfx('card', k.mix.w[11], -2); sfx('pen', k.dj.w[7], -4); sfx('pop', k.one.w[1]); sfx('pop', k.pm.w[4], -3);
  return b;
}

/* ---------- what you need: curiosity about people ---------- */
function buildCurious(prev) {
  const k = PS({ need: 'what you need to dive into ux research is just genuine curiosity about users about people', study: 'taking the time to study people', pat: 'find patterns',
    listen: 'just be really good at listening', int: 'you must be interested in people' });
  const b = board('curiosity', (t) => {
    wallWord(t, 'what you need', 'what you need:', V(150, 70), V(240, 520), V(84, 72), UX.paint, k.need.w[1], k.need.w[2] + 0.3, { out: k.need.w[10] - 0.2 });
    headCard(t, 'genuine curiosity', V(150, 70), V(130, 400), V(1100, 940), V(330, 350), k.need.w[10], 'genuine curiosity about people', { size: V(110, 100), rot: -1, lines: false });
    const s = V(290, 290), pos = V([[150, 600], [520, 630], [890, 605]], [[60, 870], [400, 900], [740, 875]]);
    [['study people', k.study.w[4]], ['find patterns', k.pat.w[0]], ['listening', k.listen.w[5]]].forEach(([w, tt], i) => note(t, w, pos[i][0], pos[i][1], s, w, { t: tt, rot: tilt(i + 61), fs: 56 }));
    const nx = V(1360, 330), ny = V(500, 1220), ns = V(400, 380);
    note(t, 'interested in people', nx, ny, ns, 'be interested in people', { t: k.int.w[3], rot: 3, fs: 64, bg: UX.ora });
    stroke(t, loopPts(nx, ny, ns, ns, 13, 30), k.int.w[5], 0.6, UX.paint, 9);
  });
  link(prev, b, k.need.t - 0.7); screen(k.need.t - 0.7, 'curiosity', 'curiosity'); camBoard(k.need.t - 0.7, b);
  cam(k.int.w[3] + 0.3, b, [1560, 520], [700, 1410], [2.0, 2.6], 0.6);   // punch-in: the orange note fills the frame
  sfx('card', k.need.w[9]); sfx('pop', k.study.w[4], -4); sfx('pop', k.listen.w[5], -4); sfx('pop', k.int.w[3]); sfx('pen', k.int.w[5], -4);
  return b;
}

/* ---------- so many ways to categorise it; the first three big pairs ---------- */
function buildCategories(prev) {
  const k = PS({ start: 'i kept running into different ways that people categorise it', cour: 'you go on coursera', num: 'coursera has quite a number', diff: "it's a different kind of categorization everywhere",
    list: 'you see generative and evaluative qualitative and quantitative behavioural and attitudinal primary and secondary remote in-person moderated unmoderated',
    useful: 'but the useful way to think about it is that some of these pairs describe what kind of information you get', likeq: 'like quantitative and qualitative',
    others: 'and others describe how you run the research', liker: 'like remote or in-person', lot: "there's a lot of categorization", focus: 'i will focus on the first three big pairs in this video' });
  const L = k.list.w; // you see gen and eva qual and quan beh and att pri and sec rem inp mod unm
  const pairs = [['generative', L[2], 'evaluative', L[4]], ['qualitative', L[5], 'quantitative', L[7]], ['behavioural', L[8], 'attitudinal', L[10]],
    ['primary', L[11], 'secondary', L[13]], ['remote', L[14], 'in-person', L[15]], ['moderated', L[16], 'unmoderated', L[17]]];
  const T_SORT = k.useful.w[10], T_HOW = k.others.w[2], T_FOCUS = k.focus.w[6];
  const b = board('categories', (t) => {
    wallWord(t, 'so many ways to categorise it', 'so many ways to categorise it', V(110, 60), V(150, 500), V(92, 70), UX.paint, k.start.w[4], k.start.w[9] + 0.3, { out: T_SORT });
    note(t, 'Coursera', V(1500, 760), V(780, 300 + 160), V(250, 220), 'Coursera', { t: k.cour.w[3], rot: 5, fs: 50, out: k.list.w[2] - 0.2 });
    const s = V(250, 230);
    // grid spots (scattered) and the sorted spots: the two pairs she names go to "information" / "how you run it"; on "first three", pairs 1-3 come forward
    const spot = (i) => V([[120 + (i % 3) * 590, 300 + Math.floor(i / 3) * 380], null][0], [[60 + (i % 2) * 500, 640 + Math.floor(i / 2) * 290], null][0]);
    pairs.forEach(([a, ta, c, tc], i) => {
      let [x, y] = spot(i);
      const pf = MOTION.ease(t, T_FOCUS + i * 0.08, 0.8, 'inOutQuart');
      if (i < 3) { const fx = V(150 + i * 580, 60), fy = V(560, 560 + i * 330); x = lerp(x, fx, pf); y = lerp(y, fy, pf); }
      const gone = i >= 3 ? T_FOCUS : null;
      note(t, a, x, y, s, a, { t: ta, rot: tilt(i * 2 + 70, 5), fs: 44, out: gone });
      note(t, c, x + s * 0.92, y + 16, s, c, { t: tc, rot: tilt(i * 2 + 71, 5), fs: 44, bg: UX.ora, out: gone });
      if (i < 3) stroke(t, loopPts(V(150 + i * 580, 60) - 10, V(560, 560 + i * 330) - 10, s * 1.92 + 20, s + 36, i + 81, 18), T_FOCUS + 0.9 + i * 0.25, 0.5, UX.paint, 7);
    });
    // her two examples: "what kind of information" (quantitative / qualitative) and "how you run it" (remote / in-person)
    const pi = MOTION.ease(t, k.likeq.w[1], 0.5, 'outExpo') * outK(t, T_FOCUS), pr = MOTION.ease(t, k.liker.w[1], 0.5, 'outExpo') * outK(t, T_FOCUS);
    withA(pi, () => { const sp = spot(1); strokePts(loopPts(sp[0] - 14, sp[1] - 14, s * 1.92 + 28, s + 44, 5, 16), pi, UX.ora, 8); });
    withA(pi, () => { const sp = spot(1); textBlock('what kind of information you get', 'what kind of information you get', sp[0], sp[1] - V(40, 46), { font: (z) => FX.type(z, 700), size: V(40, 28), col: UX.paint }); });
    withA(pr, () => { const sp = spot(4); strokePts(loopPts(sp[0] - 14, sp[1] - 14, s * 1.92 + 28, s + 44, 6, 16), pr, UX.paint, 8); });
    withA(pr, () => { const sp = spot(4); textBlock('how you run the research', 'how you run the research', sp[0], sp[1] + s + V(80, 90), { font: (z) => FX.type(z, 700), size: V(40, 36), col: UX.paint }); });
    wallWord(t, 'the first three big pairs', 'the first three big pairs', V(150, 60), V(330, 450), V(96, 76), UX.paint, k.focus.w[4], k.focus.w[7] + 0.3);
  }, { span: [1, 1.2] });
  link(prev, b, k.start.t - 0.7); screen(k.start.t - 0.7, 'categories', 'so many categories'); camBoard(k.start.t - 0.7, b);
  cam(k.list.t - 0.3, b, () => BW() / 2, [540, 1000], 1, 0.9);
  screen(T_FOCUS - 0.3, 'three-pairs', 'the three big pairs'); cam(T_FOCUS - 0.3, b, () => BW() / 2, [540, 960], 1, 0.9);
  sfx('pen', k.start.w[4], -5); sfx('pop', k.cour.w[3], -3); pairs.forEach(([, ta], i) => { if (i % 2 === 0) sfx('pop', ta, -6); });
  sfx('pen', k.likeq.w[1], -5); sfx('pen', k.liker.w[1], -5); sfx('crumple', T_FOCUS + 0.1, -6); sfx('pen', T_FOCUS + 0.9, -5);
  return b;
}

function buildPart2(b) {
  b = buildWhatUX(b); b = buildNorman(b); b = buildQuote(b); b = buildAround(b); b = buildWhatUXR(b); b = buildWhy(b); b = buildFail(b);
  b = buildRealPeople(b); b = buildResearcher(b); b = buildWeek(b); b = buildShare(b); b = buildRvsD(b); b = buildCurious(b); b = buildCategories(b);
  return b;
}
