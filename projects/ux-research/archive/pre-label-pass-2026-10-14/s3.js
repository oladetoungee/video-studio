/* ux-research film, part 3: the three big pairs, more categories, methods, small budget, user vs market research, AI,
 * career, how to get in, the closing line (edited voice 4:49-12:00). */
'use strict';

/** a small typed index label ("01 / 03") on the wall */
function idxLabel(t, key, s, x, y, t0) { credit(t, key, s, x, y, t0, { col: UX.paint, size: V(48, 44), w: 700 }); }
/** pair card: big word + typed line */
function pairCard(t, key, x, y, w, h, t0, word, sub, subT, o = {}) {
  headCard(t, key, x, y, w, h, t0, word, { size: o.size || V(100, 92), rot: o.rot || 0, sub, subSize: o.subSize || V(42, 42), subT, subY: o.subY || V(180, 170), subW: 700 });
}

/* ---------- 01 / 03: generative vs evaluative ---------- */
function buildGenEval(prev) {
  const k = PS({ first: 'the first big way to split ux research is generative versus evaluative', gen: 'generative ux research happens early before anything is designed',
    q: 'it asks questions like what is the real problem', need: 'what do people need', get: 'how do they get by right now', gens: 'it generates ideas for what to build',
    thesis: "for my thesis i'm doing generative research", ev: 'evaluative research on the other hand happens later after there is a design', q2: 'it asks questions like does this product actually work',
    can: 'can users use it', stuck: 'where do the users get stuck while using it', exist: "so you're evaluating something that already exists",
    sum1: 'so generative ux research helps you decide what to build', sum2: 'and evaluative ux research tells you whether what you build works' });
  const b = board('generative-evaluative', (t) => {
    credit(t, 'pair 1 label', '01 / 03', V(150, 80), V(110, 420), k.first.w[1], { col: UX.paint, size: V(48, 44), w: 700, out: k.sum1.t - 0.3 });
    pairCard(t, 'Generative', V(150, 70), V(160, 470), V(900, 940), V(330, 330), k.first.w[5], 'Generative', 'happens early, before anything is designed', k.gen.w.slice(3), { rot: -1.2 });
    const s = V(300, 290), pos = V([[150, 560], [500, 590], [850, 565]], [[60, 870], [400, 900], [740, 875]]);
    [['What is the real problem?', k.q.w[4]], ['What do people need?', k.need.t], ['How do they get by right now?', k.get.t]].forEach(([w, tt], i) => note(t, w, pos[i][0], pos[i][1], s, w, { t: tt, rot: tilt(i + 91), fs: 46, bg: UX.ora }));
    wallWord(t, 'ideas for what to build', 'ideas for what to build', V(150, 80), V(980, 1225), V(76, 64), UX.paint, k.gens.w[2], k.gens.w[6] + 0.3);
    polaroid(t, 'my thesis', V(1290, 700), V(60, 1250), V(400, 300), 'her_347', 'my thesis', { t: k.thesis.w[2], rot: 5, fs: 44 });
    const ox = V(1920, 0), oy = V(0, 1920);
    pairCard(t, 'Evaluative', ox + V(150, 70), oy + V(160, 470), V(900, 940), V(330, 330), k.ev.t, 'Evaluative', 'happens later, after there is a design', k.ev.w.slice(5), { rot: 1.2 });
    [['Does this product actually work?', k.q2.w[4]], ['Can users use it?', k.can.t], ['Where do the users get stuck?', k.stuck.t]].forEach(([w, tt], i) => note(t, w, ox + pos[i][0], oy + pos[i][1], s, w, { t: tt, rot: tilt(i + 95), fs: 46 }));
    wallWord(t, 'something that already exists', 'something that already exists', ox + V(150, 80), oy + V(980, 1300), V(76, 60), UX.paint, k.exist.w[3], k.exist.w[6] + 0.3);
    // the summary, seen from further back: one big note under each
    const S2 = V(520, 480);
    note(t, 'decide what to build', V(700, 300), V(1090, 3840 + 430), S2, 'decide what to build', { t: k.sum1.w[2], rot: -3, fs: 96, bg: UX.ora, from: 1.2 });
    note(t, 'whether what you build works', V(1920 + 700, 300), V(1090, 3840 + 1000), S2, 'whether what you build works', { t: k.sum2.w[6], rot: 3, fs: 90, from: 1.2 });
  }, { span: [2, 3] });
  link(prev, b, k.first.t - 0.7); screen(k.first.t - 0.7, 'generative', 'generative'); camPart(k.first.t - 0.7, b, 0, 0);
  screen(k.ev.t - 0.35, 'evaluative', 'evaluative'); camPart(k.ev.t - 0.35, b, V(1, 0), V(0, 1));
  screen(k.sum1.t - 0.3, 'gen-vs-eval', 'decide vs check'); cam(k.sum1.t - 0.3, b, [1920, 540], [640, 4735], [0.5, 1], 1.0);
  sfx('card', k.first.w[8]); [k.q.w[4], k.get.t].forEach((x) => sfx('pop', x, -4)); sfx('pen', k.gens.w[2], -5); sfx('shutter', k.thesis.w[2]);
  sfx('swipe', k.ev.t - 0.05, -6); sfx('card', k.ev.t, -2); [k.q2.w[4], k.stuck.t].forEach((x) => sfx('pop', x, -4)); sfx('pen', k.exist.w[3], -5);
  sfx('whoosh', k.sum1.t + 0.1, -8); sfx('pop', k.sum1.w[5], -2); sfx('pop', k.sum2.w[6], -2);
  return b;
}

/* ---------- 02 / 03: quantitative vs qualitative ---------- */
function buildQualQuant(prev) {
  const k = PS({ sec: 'the second way to split ux research is qualitative versus quantitative', quan: 'quantitative ux research is about numbers', many: 'how many people completed the task',
    pct: 'what percentage dropped off at checkout', long: 'how long did it take', what: 'it tells you what is happening and how much of it', qual: 'qualitative ux research is about understanding',
    why: 'why did the users drop off', think: 'what were they thinking', conf: 'what confused them', small: "it's usually smaller and more in depth", tellwhy: 'it tells you the why',
    both: 'usually you want both', nums: 'you want the numbers to show where the problem is', conv: 'and you want the conversation to show why the problem is happening' });
  const b = board('quantitative-qualitative', (t) => {
    credit(t, 'pair 2 label', '02 / 03', V(150, 80), V(110, 420), k.sec.w[1], { col: UX.paint, size: V(48, 44), w: 700, out: k.both.t - 0.3 });
    pairCard(t, 'Quantitative', V(150, 70), V(160, 470), V(980, 940), V(330, 330), k.sec.w[1] + 0.2, 'Quantitative', 'about numbers', k.quan.w.slice(4), { size: V(96, 90), rot: -1.2 });
    const s = V(300, 290), pos = V([[150, 560], [500, 590], [850, 565]], [[60, 870], [400, 900], [740, 875]]);
    [['How many people completed the task?', k.many.t], ['What percentage dropped off at checkout?', k.pct.t], ['How long did it take?', k.long.t]].forEach(([w, tt], i) => note(t, w, pos[i][0], pos[i][1], s, w, { t: tt, rot: tilt(i + 101), fs: 44 }));
    // an illustrative bar chart in paint marker (no real data: labelled)
    const bx = V(1300, 240), by = V(870, 1540);
    for (let i = 0; i < 4; i++) { const hgt = [180, 300, 230, 380][i]; const p = MOTION.ease(t, k.what.w[7] + i * 0.08, 0.5, 'outQuint'); if (p > 0) rect(bx + i * 120, by - hgt * p, 80, hgt * p, i === 3 ? UX.ora : UX.paint); }
    stroke(t, [[bx - 30, by], [bx + 500, by]], k.what.w[7] - 0.1, 0.4, UX.paint, 6);
    credit(t, 'bars illustration', 'Illustration', bx, by + V(60, 60), k.what.w[7] + 0.3);
    const ox = V(1920, 0), oy = V(0, 1920);
    pairCard(t, 'Qualitative', ox + V(150, 70), oy + V(160, 470), V(980, 940), V(330, 330), k.qual.t, 'Qualitative', 'about understanding', k.qual.w.slice(4), { size: V(96, 90), rot: 1.2 });
    [['Why did the users drop off?', k.why.t], ['What were they thinking?', k.think.t], ['What confused them?', k.conf.t]].forEach(([w, tt], i) => note(t, w, ox + pos[i][0], oy + pos[i][1], s, w, { t: tt, rot: tilt(i + 105), fs: 46, bg: UX.ora }));
    wallWord(t, 'smaller, more in depth', 'smaller, more in depth', ox + V(150, 80), oy + V(980, 1290), V(70, 60), UX.paint, k.small.w[3], k.small.w[6] + 0.3);
    wallWord(t, 'the why', 'the why', ox + V(1210, 640), oy + V(800, 1580), V(150, 110), UX.ora, k.tellwhy.w[3], k.tellwhy.w[4] + 0.3);
    const S2 = V(520, 480);
    note(t, 'numbers show where', V(700, 300), V(1090, 3840 + 430), S2, 'numbers show where the problem is', { t: k.both.w[1], rot: -3, fs: 84, from: 1.2 });
    note(t, 'conversation shows why', V(1920 + 700, 300), V(1090, 3840 + 1000), S2, 'the conversation shows why', { t: k.conv.w[5], rot: 3, fs: 84, bg: UX.ora, from: 1.2 });
    if (!PORTRAIT) wallWord(t, 'you want both', 'you want both', V(1920, 540), V(-60, 3840 + 990), V(220, 110), UX.paint, k.both.w[2], k.both.w[3] + 0.4, { align: 'center' });
  }, { span: [2, 3] });
  link(prev, b, k.sec.t - 0.7); screen(k.sec.t - 0.7, 'quantitative', 'quantitative'); camPart(k.sec.t - 0.7, b, 0, 0);
  screen(k.qual.t - 0.35, 'qualitative', 'qualitative'); camPart(k.qual.t - 0.35, b, V(1, 0), V(0, 1));
  screen(k.both.t - 0.3, 'want-both', 'you want both'); cam(k.both.t - 0.3, b, [1920, 540], [640, 4735], [0.5, 1], 1.0);
  sfx('card', k.quan.t); sfx('pop', k.many.t, -4); sfx('pop', k.pct.t, -4); sfx('clock', k.long.w[1], -4); sfx('pen', k.what.w[7] - 0.1, -6);
  sfx('swipe', k.qual.t - 0.05, -6); sfx('card', k.qual.t, -2); sfx('pop', k.why.t, -4); sfx('pop', k.conf.t, -4); sfx('pen', k.tellwhy.w[3], -3);
  sfx('pen', k.both.w[2], -4); sfx('pop', k.nums.w[4], -2); sfx('pop', k.conv.w[5], -2);
  return b;
}

/* ---------- 03 / 03: attitudinal vs behavioural ---------- */
function buildAttBeh(prev) {
  const k = PS({ third: 'now the third big way to split ux research is behavioural versus attitudinal', att: 'attitudinal ux research is about what users say what they think what they feel',
    tell: 'what they tell you that they do', surv: 'surveys and interviews are mostly attitudinal', beh: 'behavioural ux research on the other hand is about what people actually do',
    watch: 'so you watch them use the thing', data: 'you look at the data and what they click' });
  const b = board('attitudinal-behavioural', (t) => {
    credit(t, 'pair 3 label', '03 / 03', V(150, 80), V(110, 420), k.third.w[1], { col: UX.paint, size: V(48, 44), w: 700, out: PORTRAIT ? k.beh.t - 0.5 : null });
    const c1 = V([110, 160, 820, 380], [70, 470, 940, 360]), c2 = V([990, 180, 820, 380], [70, 1150, 940, 360]);
    pairCard(t, 'Attitudinal', ...c1, k.third.w[2] + 0.2, 'Attitudinal', 'what users say, think and feel', [k.att.w[6], k.att.w[7], k.att.w[9], k.att.w[11], k.att.w[11] + 0.2, k.att.w[12]], { size: V(92, 88), rot: -1.2 });
    pairCard(t, 'Behavioural', ...c2, k.third.w[10] - 0.3, 'Behavioural', 'what people actually do', k.beh.w.slice(9), { size: V(92, 88), rot: 1.2 });
    const s = V(260, 230);
    note(t, 'surveys', V(150, 80), V(600, 870), s, 'surveys', { t: k.surv.t, rot: -4, fs: 56 });
    note(t, 'interviews', V(470, 380), V(620, 880), s, 'interviews', { t: k.surv.w[2], rot: 3, fs: 50 });
    note(t, 'watch them use it', V(1030, 80), V(610, 1510), s, 'watch them use it', { t: k.watch.w[2], rot: -3, fs: 50, bg: UX.ora });
    note(t, 'what they click', V(1350, 380), V(630, 1520), s, 'what they click', { t: k.data.w[7], rot: 4, fs: 50, bg: UX.ora, after: (x, y, s_) => {
      // a cursor arrow clicking (drawn in ink)
      const cp = MOTION.ease(t, k.data.w[8], 0.35, 'outQuint'); const cx = x + s_ * 0.86, cy = y + s_ * 0.82 + (1 - cp) * 30;
      withA(cp, () => { ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx, cy + 56); ctx.lineTo(cx + 14, cy + 44); ctx.lineTo(cx + 26, cy + 68); ctx.lineTo(cx + 36, cy + 63); ctx.lineTo(cx + 24, cy + 40); ctx.lineTo(cx + 42, cy + 40); ctx.closePath(); ctx.fillStyle = UX.ink; ctx.fill(); }); } });
  }, { span: [1, 1.1] });
  link(prev, b, k.third.t - 0.7); screen(k.third.t - 0.7, 'attitudinal-behavioural', 'say vs do'); camBoard(k.third.t - 0.7, b);
  cam(k.beh.t - 0.4, b, () => BW() / 2, [540, 1060], 1, 0.8);
  sfx('card', k.att.t); sfx('pop', k.surv.t, -4); sfx('card', k.beh.t, -2); sfx('pop', k.watch.w[2], -4); sfx('tick', k.data.w[8] + 0.2, -2);
  return b;
}

/* ---------- what people say vs what they do (still A2), ask vs watch, watches as much as it asks ---------- */
function buildSayDo(prev) {
  const k = PS({ ham: 'i want to hammer on this', ears: 'hammered into my ears during my first semester', say: 'that what people say and what people do are often very different',
    surv: 'what people say what they give you in a survey is usually different from what they do when you watch them', ask: 'if you ask someone how they use an app they will give you an answer',
    watch: 'if you watch them use the app they could end up doing something completely different', bel: 'and they might genuinely believe what they told you',
    hum: 'we are human beings', not: 'we are just not very good at noticing our own behaviours', good: 'so good ux research watches as much as it asks',
    still: 'what people say still matters', some: 'sometimes they do exactly what they tell you', match: "but when what they say and what they do don't match", useful: 'is also a very useful finding' });
  const b = board('say-vs-do', (t) => {
    const P_ = PORTRAIT;
    const L = P_
      ? { say: [90, 520], do: [690, 520], ws: 150, card: [70, 680, 940, 330], cfs: 52, n1: [80, 1050, 270], n2: [730, 1050, 270], pol: [380, 1040, 320] }
      : { say: [170, 210], do: [1500, 210], ws: 170, card: [520, 300, 880, 390], cfs: 58, n1: [140, 430, 290], n2: [1490, 430, 290], pol: [830, 700, 250] };
    wallWord(t, 'hammer on this', 'I want to hammer on this', BW() / 2, V(560, 960), V(110, 84), UX.paint, k.ham.w[3], k.ham.w[5] + 0.3, { align: 'center', out: k.say.w[1] - 0.3 });
    polaroid(t, 'my first semester', L.pol[0], L.pol[1], L.pol[2], 'her_440', 'my first semester', { t: k.ears.w[6], rot: 5, fs: P_ ? 40 : 36 });
    wallWord(t, 'say', 'say', L.say[0], L.say[1], L.ws, UX.paint, k.say.w[3], k.say.w[3] + 0.5);
    wallWord(t, 'do', 'do', L.do[0], L.do[1], L.ws, UX.ora, k.say.w[7], k.say.w[7] + 0.4);
    typedCard(t, 'often very different', L.card[0], L.card[1], L.card[2], L.card[3], k.say.w[1], 'What people say and what people do are often very different.', k.say.w.slice(1), { size: L.cfs, rot: -1, head: P_ ? 100 : 80 });
    note(t, 'what they tell you', L.n1[0], L.n1[1], L.n1[2], 'what they tell you', { t: k.surv.w[6], rot: -4, fs: 44 });
    note(t, 'what they actually do', L.n2[0], L.n2[1], L.n2[2], 'what they actually do', { t: k.surv.w[14], rot: 3, fs: 44, bg: UX.ora });
    // part 2: ask vs watch (illustration: the path they describe vs the path they take)
    const ox = V(1920, 0), oy = V(0, 1920);
    note(t, 'ask', ox + V(150, 80), oy + V(170, 420), V(320, 300), 'ask: an answer', { t: k.ask.w[2], rot: -3, fs: 64 });
    note(t, 'watch', ox + V(150, 80), oy + V(600, 1100), V(320, 300), 'watch: something completely different', { t: k.watch.w[2], rot: 3, fs: 46, bg: UX.ora });
    const sx = ox + V(560, 440), sy1 = oy + V(320, 570), sy2 = oy + V(750, 1250);
    stroke(t, [[sx, sy1], [sx + V(1100, 560), sy1]], k.ask.w[11], 0.6, UX.paint, 9);
    const wp = []; for (let i = 0; i <= 90; i++) { const u = i / 90; wp.push([sx + u * V(1100, 560) + Math.sin(u * 9) * 40, sy2 + Math.sin(u * 13) * V(120, 90) * Math.sin(u * 3.1)]); }
    stroke(t, wp, k.watch.w[11], 1.2, UX.ora, 9);
    typedCard(t, 'genuinely believe', ox + V(560, 140), oy + V(80, 1390), V(900, 800), V(150, 160), k.bel.w[3], 'They might genuinely believe what they told you.', k.bel.w.slice(1), { size: V(48, 44), lines: false, rot: 1, y0: V(92, 98) });
    wallWord(t, 'not good at noticing', 'not very good at noticing our own behaviours', ox + V(150, 80), oy + V(1000, 1620), V(62, 40), UX.paint, k.not.w[3], k.not.w[9] + 0.3);
    // part 3: good UX research watches as much as it asks; a mismatch is a useful finding
    const qx = V(0, 0), qy = V(1080 + 400, 3840 + 400);
    card(t, 'watches as much as it asks', qx + V(260, 70), qy + V(200, 420), V(1400, 940), V(380, 520), { t: k.good.w[0], rot: -0.8, lines: false }, (x, y) => {
      const f = FX.grot(V(96, 92), 800), ls = -3; const l1 = 'Good UX research', l2a = 'watches', l2b = ' as much as it ', l2c = 'asks.';
      const tt = k.good.w; withA(MOTION.ease(t, tt[0], 0.3, 'outExpo'), () => _txt(l1, x + 60, y + 140, f, UX.ink, 'left', 'alphabetic', ls));
      if (PORTRAIT) { withA(MOTION.ease(t, tt[3], 0.3, 'outExpo'), () => _txt('watches as', x + 60, y + 250, f, UX.ink, 'left', 'alphabetic', ls)); withA(MOTION.ease(t, tt[5], 0.3, 'outExpo'), () => _txt('much as it asks.', x + 60, y + 360, f, UX.ink, 'left', 'alphabetic', ls));
        stroke(t, wavyPts(x + 58, y + 250 + 20, x + 62 + tw('watches', f, ls), y + 250 + 20, 3, 7, 16), tt[3] + 0.2, 0.4, UX.ora, 9); stroke(t, wavyPts(x + 60 + tw('much as it ', f, ls), y + 360 + 20, x + 60 + tw('much as it asks', f, ls), y + 360 + 20, 3, 8, 16), tt[8] + 0.2, 0.4, UX.ora, 9); }
      else { const y2 = y + 270; withA(MOTION.ease(t, tt[3], 0.3, 'outExpo'), () => { _txt(l2a, x + 60, y2, f, UX.ink, 'left', 'alphabetic', ls); _txt(l2b, x + 60 + tw(l2a, f, ls), y2, f, UX.ink, 'left', 'alphabetic', ls); });
        withA(MOTION.ease(t, tt[8], 0.3, 'outExpo'), () => _txt(l2c, x + 60 + tw(l2a + l2b, f, ls), y2, f, UX.ink, 'left', 'alphabetic', ls));
        stroke(t, wavyPts(x + 58, y2 + 20, x + 62 + tw(l2a, f, ls), y2 + 20, 3, 7, 16), tt[3] + 0.2, 0.4, UX.ora, 9); stroke(t, wavyPts(x + 60 + tw(l2a + l2b, f, ls), y2 + 20, x + 60 + tw(l2a + l2b + 'asks', f, ls), y2 + 20, 3, 8, 16), tt[8] + 0.2, 0.4, UX.ora, 9); }
    });
    note(t, 'say still matters', qx + V(260, 70), qy + V(660, 1020), V(300, 290), 'what people say still matters', { t: k.still.w[3], rot: -3, fs: 46 });
    note(t, 'useful finding', qx + V(1240, 640), qy + V(620, 1020), V(400, 370), "why they don't match: a very useful finding", { t: k.useful.w[4], rot: 3, fs: 50, bg: UX.ora });
  }, { span: [2, 3.0], hL: 2.5 });
  link(prev, b, k.ham.t - 0.7); screen(k.ham.t - 0.7, 'say-vs-do', 'what people say vs do'); camBoard(k.ham.t - 0.7, b);
  screen(k.ask.t - 0.35, 'ask-vs-watch', 'ask vs watch'); camPart(k.ask.t - 0.35, b, V(1, 0), V(0, 1));
  screen(k.good.t - 0.4, 'watches-asks', 'watches as much as it asks'); cam(k.good.t - 0.4, b, [960, 540], [1480 + 540, 3840 + 400 + 960], 1, 0.9);
  sfx('pen', k.ham.w[3], -3); sfx('shutter', k.ears.w[6]); sfx('pen', k.say.w[3], -3); sfx('card', k.say.w[1], -3); sfx('pen', k.say.w[7], -3); sfx('pop', k.surv.w[6], -5); sfx('pop', k.surv.w[14], -4);
  sfx('swipe', k.ask.t - 0.05, -6); sfx('pop', k.ask.w[2], -4); sfx('pen', k.ask.w[11], -6); sfx('pop', k.watch.w[2], -3); sfx('pen', k.watch.w[11], -4); sfx('card', k.bel.w[3], -4);
  sfx('swipe', k.good.t - 0.05, -7); sfx('pen', k.good.w[3] + 0.2, -4); sfx('pop', k.still.w[3], -5); sfx('ding', k.useful.w[4], -4);
  MOTION.expect('first semester polaroid', k.ears.w[6], { el: 'say-vs-do/@my first semester' });
  return b;
}

/* ---------- a few more categories ---------- */
function buildMoreCats(prev) {
  const k = PS({ few: 'there are a few more categories of ux research', pri: 'the primary research is the research you do yourself', sec: 'secondary research uses what already exists',
    rem: 'remote ux research happens over a video call', inp: 'in-person research happens in the same room', mod: 'and then we have moderated research where a researcher is there guiding the session',
    unm: 'and unmoderated research where people complete tasks on their own' });
  const b = board('more-categories', (t) => {
    wallWord(t, 'a few more, quickly', 'a few more, quickly', V(110, 60), V(150, 500), V(84, 76), UX.paint, k.few.w[4], k.few.w[7] + 0.3);
    const items = [['primary', 'research you do yourself', k.pri.w[1], k.pri.w.slice(6)], ['secondary', 'uses what already exists', k.sec.t, k.sec.w.slice(2)],
      ['remote', 'over a video call', k.rem.t, k.rem.w.slice(4)], ['in-person', 'in the same room', k.inp.t, k.inp.w.slice(3)],
      ['moderated', 'a researcher is there, guiding the session', k.mod.w[4], k.mod.w.slice(7)], ['unmoderated', 'people complete tasks on their own', k.unm.w[1], k.unm.w.slice(4)]];
    const cw = V(540, 470), ch = V(330, 300);
    items.forEach(([w, sub, t0, subT], i) => {
      const col = V(Math.floor(i / 2), i % 2), row = V(i % 2, Math.floor(i / 2));
      const x = V(110 + col * 590, 60 + col * 500), y = V(270 + row * 390, 560 + row * 340);
      headCard(t, w, x, y, cw, ch, t0, w, { size: V(64, 60), rot: tilt(i + 121, 2), sub, subSize: V(38, 36), subT, subY: V(150, 140), head: 100, lh: 46, subLh: 46 });
    });
  }, { span: [1, 1.15] });
  link(prev, b, k.few.t - 0.7); screen(k.few.t - 0.7, 'more-categories', 'a few more categories'); camBoard(k.few.t - 0.7, b);
  cam(k.mod.t - 0.5, b, () => BW() / 2, [540, 1000], 1, 0.8);
  sfx('pen', k.few.w[4], -5); sfx('card', k.pri.w[1]); sfx('card', k.sec.t, -3); sfx('card', k.rem.t, -2); sfx('card', k.inp.t, -3); sfx('card', k.mod.w[4], -2); sfx('card', k.unm.w[1], -3);
  return b;
}

/* ---------- how UX research is done: the methods ---------- */
function buildMethods(prev) {
  const k = PS({ how: 'so how is ux research actually done', int: "there's user interview", talk: 'you talk to them about their lives their work their frustration',
    usa: "there's usability testing", task: 'you give someone a task to do with your design', loud: 'usually while they think out loud', surv: 'then we have surveys',
    reach: 'you can reach a lot of people quickly with surveys', less: 'but surveys usually have less depth', ctx: "and then there's contextual inquiry", where: 'where you go to where people work and live',
    diary: 'there are also diary studies', days: 'over days or weeks', miss: 'a single session would have missed', card: "there's card sorting", ab: "there's a/b testing", all: "there's all kinds of ux research methods" });
  const b = board('methods', (t) => {
    wallWord(t, 'How is it done?', 'How is it done?', V(110, 60), V(170, 450), V(110, 96), UX.paint, k.how.w[2], k.how.w[5] + 0.3, { out: PORTRAIT ? k.surv.t - 0.9 : null });
    const m = [['user interviews', 'their lives, their work, their frustration', k.int.w[1], k.talk.w.slice(6)], ['usability testing', 'a task, while they think out loud', k.usa.w[1], [k.task.w[3], k.task.w[4], ...k.loud.w.slice(1)]],
      ['surveys', 'reach a lot of people quickly, less depth', k.surv.w[3], [...k.reach.w.slice(2, 8), k.less.w[4], k.less.w[5]]], ['contextual inquiry', 'where people work and live', k.ctx.w[3], k.where.w.slice(4)]];
    const cw = V(800, 940), ch = V(330, 280);
    m.forEach(([w, sub, t0, subT], i) => {
      const x = V(110 + (i % 2) * 910, 70), y = V(260 + Math.floor(i / 2) * 390, 560 + i * 305);
      headCard(t, w, x, y, cw, ch, t0, w, { size: V(76, 72), rot: tilt(i + 131, 2), sub, subSize: V(40, 40), subT, subY: V(160, 150), head: 112, lh: 48, subLh: 48 });
    });
    // part 2
    const ox = V(1920, 0), oy = V(0, 1920 * 1.0);
    headCard(t, 'diary studies', ox + V(110, 70), oy + V(160, 420), V(900, 940), V(400, 380), k.diary.w[3], 'diary studies', { size: V(84, 80), rot: -1, sub: 'over days or weeks', subSize: 42, subT: k.days.w, subY: 170 });
    for (let d = 0; d < 7; d++) { const p = MOTION.ease(t, k.days.w[1] + d * 0.09, 0.3, 'outExpo'); if (p > 0) withA(p, () => { const x = ox + V(160 + d * 115, 120 + d * 120), y = oy + V(470, 720); strokeR(x, y, 92, 70, UX.ink, 4); stroke(t, [[x + 22, y + 36], [x + 40, y + 54], [x + 72, y + 18]], k.days.w[1] + 0.2 + d * 0.09, 0.2, UX.ora, 6); }); }
    note(t, 'card sorting', ox + V(1150, 120), oy + V(150, 940), V(320, 300), 'card sorting', { t: k.card.w[1], rot: 4, fs: 60, bg: UX.ora });
    note(t, 'A/B testing', ox + V(1530, 520), oy + V(190, 970), V(300, 290), 'A/B testing', { t: k.ab.w[1], rot: -3, fs: 64 });
    for (let i = 0; i < 9; i++) note(t, 'more methods ' + i, ox + V(1080 + (i % 3) * 270, 80 + (i % 3) * 320) + hash(i) * 40, oy + V(520 + Math.floor(i / 3) * 135, 1180 + Math.floor(i / 3) * 110) + hash(i + 9) * 30, V(180, 150), '', { t: k.all.w[3] + i * 0.07, rot: tilt(i + 141, 9), scribble: true, seed: i + 30, bg: i % 4 === 1 ? UX.ora : UX.note });
    wallWord(t, 'all kinds of methods', 'all kinds of methods', ox + V(1080, 80), oy + V(985, 1620), V(64, 60), UX.paint, k.all.w[3], k.all.w[6] + 0.3);
    credit(t, 'methods illustration', 'Illustration', ox + V(1500, 820), oy + V(480, 1620), k.all.w[6]);
  }, { span: [2, 2] });
  link(prev, b, k.how.t - 0.7); screen(k.how.t - 0.7, 'methods', 'the methods'); camPart(k.how.t - 0.7, b, 0, 0);
  cam(k.surv.t - 0.5, b, [960, 540], [540, 1110], 1, 0.8);
  screen(k.diary.t - 0.35, 'more-methods', 'more methods'); camPart(k.diary.t - 0.35, b, V(1, 0), V(0, 1));
  sfx('pen', k.how.w[2], -5); sfx('card', k.int.w[1]); sfx('card', k.usa.w[1], -2); sfx('card', k.surv.w[3], -2); sfx('card', k.ctx.w[3], -3);
  sfx('swipe', k.diary.t - 0.05, -6); sfx('card', k.diary.w[3], -2); sfx('clock', k.days.w[1], -4); sfx('pop', k.card.w[1], -2); sfx('pop', k.ab.w[1], -2); sfx('pop', k.all.w[3], -5);
  return b;
}

/* ---------- research on a small budget ---------- */
function buildBudget(prev) {
  const k = PS({ big: 'only big companies with big budgets can do', small: 'but even as a small startup some research is always better than no research', lab: "you don't need a lab",
    five: 'talk to five people who would actually use your product before you start to build', friends: 'maybe yourself and a few friends', three: 'watch three of your friends try your app on a video call',
    counts: 'that also counts', deeper: 'good design goes so much deeper than just a nice visual', works: "it's about whether the thing actually works for the people using it" });
  const b = board('small-budget', (t) => {
    note(t, 'big budgets', V(150, 80), V(170, 420), V(360, 340), 'big companies, big budgets', { t: k.big.w[2], rot: -4, fs: 56, after: (x, y, s) => { stroke(t, [[x + 24, y + 24], [x + s - 24, y + s - 24]], k.small.w[1], 0.25, UX.ink, 12); stroke(t, [[x + s - 24, y + 24], [x + 24, y + s - 24]], k.small.w[1] + 0.2, 0.25, UX.ink, 12); } });
    headCard(t, 'better than no research', V(640, 70), V(150, 820), V(1150, 940), V(430, 440), k.small.w[6], 'Some research is always better than no research.', { size: V(96, 84), rot: 1, lines: false });
    note(t, 'no lab', V(260, 600), V(660, 460), V(300, 290), 'a lab', { t: k.lab.w[1], rot: 3, fs: 80, bg: UX.ora, after: (x, y, s) => stroke(t, [[x + 20, y + s * 0.55], [x + s - 20, y + s * 0.45]], k.lab.w[4], 0.3, UX.ink, 14) });
    credit(t, "you don't need", "you don't need", V(250, 600), V(620, 430), k.lab.w[1], { col: UX.paint });
    // part 2: five people, three friends on a video call
    const ox = V(1920, 0), oy = V(0, 1920);
    wallWord(t, 'talk to five people', 'talk to five people', ox + V(110, 60), oy + V(190, 480), V(96, 80), UX.paint, k.five.w[2] + 0.4, k.five.w[4] + 0.5);
    for (let i = 0; i < 5; i++) note(t, 'person ' + (i + 1), ox + V(110 + i * 230, 60 + (i % 3) * 330), oy + V(280, 520 + Math.floor(i / 3) * 330), V(200, 300), '', { t: k.five.w[3] + i * 0.12, rot: tilt(i + 151, 5), bg: i === 2 ? UX.ora : UX.note, out: PORTRAIT ? k.deeper.w[0] + i * 0.04 : null,
      after: (x, y, s) => person(x + s / 2, y + s * 0.86, s * 0.6, UX.ink) });
    card(t, 'video call', ox + V(1260, 120), oy + V(240, 1210), V(560, 840), V(440, 420), { t: k.three.w[8], rot: 2, lines: false, out: PORTRAIT ? k.deeper.w[0] + 0.2 : null }, (x, y, w, h) => {
      fillRR(x + 30, y + 30, w - 60, h - 60, 16, '#2A2620');
      for (let i = 0; i < 3; i++) { const tx = x + 50 + i * ((w - 100) / 3), tw_ = (w - 100) / 3 - 14; const p = MOTION.ease(t, k.three.w[8] + 0.2 + i * 0.15, 0.3, 'outExpo');
        withA(p, () => { fillRR(tx, y + 70, tw_, h - 210, 10, '#4A443A'); person(tx + tw_ / 2, y + h - 150, tw_ * 0.5, [UX.note, UX.ora, UX.paint][i]); }); }
      circle(x + w / 2, y + h - 90, 26, UX.ora);
      _txt('ILLUSTRATION', x + 40, y + h - 6, FX.type(28, 700), '#6C6A66');
    });
    if (!PORTRAIT) note(t, 'that also counts', ox + V(1300, 200), oy + V(730, 1400), V(300, 220), 'that also counts', { t: k.counts.w[1], rot: -3, fs: 50, after: (x, y, s) => stroke(t, [[x + s * 0.72, y + s * 0.62], [x + s * 0.8, y + s * 0.7], [x + s * 0.95, y + s * 0.5]], k.counts.w[2], 0.3, UX.green, 10) });
    note(t, 'works for the people', ox + V(970, 560), oy + V(600, 1000), V(280, 280), 'works for the people using it', { t: k.works.w[5], rot: 3, fs: 46, bg: UX.ora });
    wallWord(t, 'deeper than a nice visual', 'deeper than a nice visual', ox + V(110, 60), oy + V(1000, 800), V(70, 60), UX.ora, k.deeper.w[4], k.deeper.w[10] + 0.3, {});
  }, { span: [2, 2] });
  link(prev, b, k.big.t - 0.7); screen(k.big.t - 0.7, 'small-budget', 'small budget'); camPart(k.big.t - 0.7, b, 0, 0);
  cam(k.small.w[13] + 0.2, b, [1215, 540], [365, 1040], [1.45, 1.2], 0.6); cam(k.lab.t - 0.3, b, [960, 540], [540, 960], 1, 0.6);
  screen(k.five.w[1], 'five-people', 'five people'); camPart(k.five.w[1], b, V(1, 0), V(0, 1));
  sfx('pop', k.big.w[2], -4); sfx('error', k.small.w[1], -6); sfx('card', k.small.w[6]); sfx('pop', k.lab.w[1], -3); sfx('pen', k.lab.w[4], -5); sfx('swipe', k.five.w[1] + 0.3, -6);
  sfx('pop', k.five.w[3], -4); sfx('notify', k.three.w[8] + 0.2, -3); sfx('tick', k.counts.w[2], -3); sfx('pen', k.deeper.w[4], -5); sfx('pop', k.works.w[5], -3);
  return b;
}

/* ---------- UX research vs user research vs market research ---------- */
function buildUserMarket(prev) {
  const k = PS({ another: 'another question i wanted to answer', q: 'is ux research the same as user research', same: 'they mean the same thing', jobs: 'even in job titles', broad: 'now user research is the broader one', sits: 'ux research sits under it',
    about: 'user research is about understanding the users themselves', feed: 'it can feed into a lot of decisions that go beyond design', price: 'how customers feel about your prices or your delivery time',
    isnt: "it isn't really about the experience of your product", focus: 'ux research is more focused on how people experience a specific product or service', goal: 'they share the same goal',
    real: 'decisions are based on real users', market: 'both of them also differ from market research', buy: 'market research is more about what people would buy', use: 'ux research is about how people use the product' });
  const b = board('user-vs-market', (t) => {
    const P_ = PORTRAIT;
    wallWord(t, 'another question', 'another question', V(110, 60), V(150, 450), V(84, 72), UX.paint, k.another.w[0], k.another.w[1] + 0.3, { out: k.broad.t });
    const sb = MOTION.ease(t, k.broad.w[5], 0.9, 'inOutQuart');   // the two notes become a set inside a set
    const s = V(300, 280);
    const ux0 = V([560, 330], [140, 520]), us0 = V([1060, 330], [640, 520]), uxS = V([760, 560], [390, 1120]), usS = V([300, 160], [100, 560]);
    note(t, 'UX research', lerp(ux0[0], uxS[0], sb), lerp(ux0[1], uxS[1], sb), s, 'UX research', { t: k.q.w[1], rot: -3, fs: 64, bg: UX.ora });
    note(t, 'user research', lerp(us0[0], usS[0], sb), lerp(us0[1], usS[1], sb), s, 'user research', { t: k.q.w[6], rot: 3, fs: 60 });
    withA(1 - sb, () => wallWord(t, '=', '=', V(940, 540), V(570, 950), V(130, 120), UX.paint, k.same.w[1], k.same.w[3], { align: 'center', font: FX.grot }));
    credit(t, 'mostly the same', 'mostly mean the same thing, even in job titles', V(560, 140), V(760, 1030), k.same.w[2], { out: k.broad.t, maxW: V(1000, 880) });
    stroke(t, loopPts(V(240, 70), V(110, 470), V(1440, 940), V(780, 1260), 41, 10), k.broad.w[5], 0.8, UX.paint, 10);
    stroke(t, loopPts(uxS[0] - 40, uxS[1] - 40, s + 80, s + 80, 42, 20), k.sits.w[3], 0.6, UX.ora, 9);
    note(t, 'your prices', V(1250, 70), V(640, 1230), V(240, 230), 'your prices', { t: k.price.w[5], rot: 4, fs: 50 });
    note(t, 'delivery time', V(1250, 650), V(400 + 0, 1230), V(220, 230), 'your delivery time', { t: k.price.w[8], rot: -3, fs: 46 });
    [['their needs', k.about.w[6] + 0.8, V(330, 640), V(520, 600)], ['their habits', k.about.w[6] + 1.1, V(540, 140), V(650, 820)], ['their lives', k.about.w[6] + 1.35, V(1000, 120), V(230, 880)]].forEach(([w, tt, x, y], i) =>
      note(t, w, x, y, V(200, 190), w, { t: tt, rot: tilt(i + 171), fs: 40 }));
    if (false) wallWord(t, 'beyond design', 'beyond design', V(1420, 560), V(300, 1050), V(60, 56), UX.paint, k.feed.w[8], k.feed.w[10] + 0.3);
    if (false) credit(t, 'not the product experience', "isn't really about the experience of your product", V(1180, 70), V(860, 1420), k.isnt.w[0], { maxW: V(560, 940), size: V(38, 34) });
    if (false) credit(t, 'specific product', 'how people experience a specific product or service', V(1100, 780), V(1010, 1300), k.focus.w[6], { col: UX.ora, maxW: V(480, 700), size: V(40, 36) });
    // market research: its own circle, apart
    const ox = V(1920, 0), oy = V(0, 1920);
    note(t, 'market research', ox + V(330, 360), oy + V(300, 520), V(380, 360), 'market research', { t: k.market.w[6], rot: -3, fs: 70 });
    stroke(t, loopPts(ox + V(330, 360), oy + V(300, 520), V(380, 360), V(380, 360), 43, 30), k.market.w[7], 0.6, UX.paint, 9);
    credit(t, 'what people would buy', 'what people would buy', ox + V(250, 230), oy + V(780, 1000), k.buy.w[7], { col: UX.paint, size: V(52, 48) });
    note(t, 'UX research 2', ox + V(1170, 360), oy + V(300, 1240), V(380, 360), 'UX research', { t: k.use.w[1], rot: 3, fs: 70, bg: UX.ora });
    credit(t, 'how people use the product', 'how people use the product', ox + V(1000, 230), oy + V(780, 1620), k.use.w[6], { col: UX.paint, size: V(52, 48) });
    wallWord(t, 'same goal: real users', 'same goal: real users', V(960, 540), V(1010, 1620), V(70, 60), UX.ora, k.goal.w[3], k.real.w[4] + 0.3, { align: 'center' });
  }, { span: [2, 2] });
  link(prev, b, k.another.t - 0.5); screen(k.another.t - 0.5, 'user-research', 'UX vs user research'); camPart(k.another.t - 0.5, b, 0, 0);
  cam(k.focus.t - 0.2, b, [940, 540], [600, 1100], [1.12, 1.15], 0.7); cam(k.goal.t - 0.4, b, [960, 540], [540, 960], 1, 0.7);
  screen(k.market.t - 0.35, 'market-research', 'market research'); camPart(k.market.t - 0.35, b, V(1, 0), V(0, 1));
  sfx('pop', k.q.w[1], -3); sfx('pop', k.q.w[6], -3); sfx('pen', k.broad.w[5], -3); sfx('pen', k.sits.w[3], -5); sfx('pop', k.price.w[5], -4); sfx('pen', k.goal.w[3], -5); sfx('pop', k.about.w[6] + 0.9, -5); sfx('pen', k.feed.w[8], -5);
  sfx('swipe', k.market.t - 0.05, -6); sfx('pop', k.market.w[6], -3); sfx('cash', k.buy.w[7], -5); sfx('pop', k.use.w[1], -3);
  return b;
}

/* ---------- will AI replace UX research? ---------- */
function buildAI(prev) {
  const k = PS({ will: 'will ai replace ux research', tools: 'ai tools are already doing a lot of the slow work', trans: 'they can transcribe interviews', summ: 'they can summarise hours of notes',
    saves: 'it saves ux researchers a lot of time', thesis: 'i cannot even imagine having to do my thesis four years ago', work: 'it would be a lot of work', chang: 'so ai is changing how ux research gets done', well: 'if you use it well' });
  const b = board('ai', (t) => {
    wallWord(t, 'Will AI replace UX research?', 'Will AI replace UX research?', V(110, 60), V(170, 450), V(84, 58), UX.paint, k.will.w[0], k.will.w[4] + 0.3);
    // an interview transcript (illustrative lines) types on, then collapses to a three-line summary
    const cx = V(110, 70), cy = V(260, 560), cw = V(820, 940), chh = V(720, 560);
    const T1 = k.trans.w[3], T2 = k.summ.w[3];
    card(t, 'transcript', cx, cy, cw, chh, { t: k.tools.w[8], rot: -1, head: 92, lh: 52 }, (x, y, w, h) => {
      _txt('the slow work: a transcript', x + 40, y + 66, FX.type(V(40, 38), 700), UX.ink);
      const col = MOTION.ease(t, T2, 0.8, 'inOutQuart');
      const n = 11; for (let i = 0; i < n; i++) { const p = MOTION.ease(t, T1 + i * 0.09, 0.25, 'outQuint'); if (p <= 0) continue;
        const keep = i === 1 || i === 5 || i === 8; const kk = keep ? [1, 5, 8].indexOf(i) : 0;
        const yy = lerp(y + 130 + i * 52, y + 150 + kk * 70, keep ? col : 0); const a = keep ? 1 : 1 - col;
        withA(a, () => { const ww = (w - 120) * (0.55 + hash(i + 7) * 0.4) * p; if (keep && col > 0.5) rect(x + 36, yy - 24, ww + 8, 36, 'rgba(255,225,90,0.9)'); rect(x + 40, yy - 12, ww, 10, '#6C6A66'); }); }
      _txt('ILLUSTRATION', x + 40, y + h - 28, FX.type(30, 700), '#6C6A66');
    });
    note(t, 'a lot of time', V(1020, 60), V(300, 1150), V(300, 260), 'saves a lot of time', { t: k.saves.w[5], rot: 4, fs: 52 });
    polaroid(t, 'thesis polaroid', V(1430, 700), V(330, 1120), V(360, 280), 'her_655', 'my thesis, without AI?', { t: k.thesis.w[7], rot: -5, fs: V(36, 30) });
    wallWord(t, 'a lot of work', 'a lot of work', V(1400, 70), V(900, 1490), V(56, 50), UX.ora, k.work.w[3], k.work.w[6] + 0.3);
    note(t, 'if you use it well', V(1020, 370), V(620, 1150), V(330, 260), 'if you use it well', { t: k.well.w[3], rot: -3, fs: 56, bg: UX.ora });
    stroke(t, loopPts(V(1020, 370), V(620, 1150), V(330, 260), V(330, 260), 51, 26), k.well.w[4] + 0.1, 0.5, UX.paint, 8);
  }, { span: [1, 1.0] });
  link(prev, b, k.will.t - 0.7); screen(k.will.t - 0.7, 'ai', 'will AI replace it?'); camBoard(k.will.t - 0.7, b);
  sfx('glitch', k.will.w[1], -8); sfx('pen', k.will.w[0], -6); sfx('card', k.tools.w[8]); sfx('typeHit', k.trans.w[3], -6); sfx('swipe', k.summ.w[3], -8); sfx('pop', k.saves.w[5], -4);
  sfx('tape', k.thesis.w[8], -6); sfx('shutter', k.thesis.w[7] + 0.0, -3); sfx('pop', k.well.w[3], -3); sfx('pen', k.work.w[3], -5);
  return b;
}

/* ---------- the career, from a student's point of view ---------- */
function buildCareer(prev) {
  const k = PS({ car: "if you're thinking about a career in ux research", stud: "i'm still a student", mast: "i'm currently doing my master's in human computer interaction",
    jobs: 'the number of jobs with the title ux researcher is actually small compared to other design roles', exp: 'a lot of companies expect their designers and maybe their product managers to just do some research work themselves',
    fewer: 'companies have fewer people whose whole job is research', skill: "it's still a very much needed skill", entry: "it's just the entry level that might be hard to break into",
    know: "i wouldn't know yet honestly", market: "i'm not in the job market for ux research yet" });
  const b = board('career', (t) => {
    wallWord(t, 'a career?', 'a career in UX research?', V(650, 80), V(150, 1010), V(72, 54), UX.paint, k.car.w[5], k.car.w[8] + 0.3);
    polaroid(t, 'still a student', V(150, 80), V(170, 420), V(420, 400), 'her_666', 'still a student', { t: k.stud.w[2], rot: -4, fs: 46 });
    note(t, "master's in HCI", V(620, 560), V(360, 470), V(300, 280), "master's in HCI", { t: k.mast.w[5], rot: 4, fs: 56 });
    // job titles (illustration, not data): a short pile vs a tall pile of title cards
    const pile = (key, x, y, n, label, t0, col) => { for (let i = 0; i < n; i++) { const p = MOTION.ease(t, t0 + i * 0.07, 0.35, 'outExpo'); if (p > 0) withA(p, () => { shadowOn(10, 5, 0.3); rect(x + (hash(i + n) - 0.5) * 16, y - i * 46 - (1 - p) * 30, V(280, 240), 38, col); shadowOff(); }); }
      credit(t, key, label, x, y + V(100, 90), t0, { col: UX.paint, size: V(42, 38), maxW: V(320, 300) }); };
    pile('UX researcher pile', V(1020, 140), V(860, 1500), 2, 'UX researcher', k.jobs.w[7], UX.ora);
    pile('design roles pile', V(1430, 600), V(860, 1500), 9, 'other design roles', k.jobs.w[15], UX.card);
    credit(t, 'jobs illustration', 'Illustration, not data', V(1020, 140), V(1000, 1650), k.jobs.w[16], { size: V(36, 34) });
    // part 2
    const ox = V(1920, 0), oy = V(0, 1920);
    note(t, 'designers and PMs', ox + V(150, 80), oy + V(170, 420), V(380, 360), 'designers and product managers do some research', { t: k.exp.w[6], rot: -3, fs: 48 });
    note(t, 'needed skill', ox + V(620, 600), oy + V(170, 420), V(380, 360), 'still a very much needed skill', { t: k.skill.w[3], rot: 3, fs: 52, bg: UX.ora,
      after: (x, y, s) => stroke(t, [[x + s * 0.7, y + s * 0.8], [x + s * 0.8, y + s * 0.9], [x + s * 0.96, y + s * 0.66]], k.skill.w[6], 0.3, UX.ink, 10) });
    note(t, 'entry level', ox + V(150, 80), oy + V(620, 900), V(380, 360), 'the entry level might be hard to break into', { t: k.entry.w[3], rot: 2, fs: 46 });
    if (!PORTRAIT) note(t, 'fewer people', ox + 620, oy + 620, 380, 'fewer people whose whole job is research', { t: k.fewer.w[3], rot: -2, fs: 46 });
    polaroid(t, 'not in the job market', ox + V(1180, 560), oy + V(220, 900), V(420, 400), 'her_695', 'not in the job market yet', { t: k.market.w[3], rot: 5, fs: 36 });
  }, { span: [2, 2] });
  link(prev, b, k.car.t - 0.7); screen(k.car.t - 0.7, 'career', 'the career'); camPart(k.car.t - 0.7, b, 0, 0);
  cam(k.jobs.t - 0.4, b, [960, 540], [540, 960], 1, 0.8);
  screen(k.exp.t - 0.35, 'career-2', 'companies expect'); camPart(k.exp.t - 0.35, b, V(1, 0), V(0, 1));
  sfx('shutter', k.stud.w[2]); sfx('pop', k.mast.w[5], -4); sfx('card', k.jobs.w[7], -4); sfx('card', k.jobs.w[15], -3);
  sfx('swipe', k.exp.t - 0.05, -6); sfx('pop', k.exp.w[6], -4); sfx('tick', k.skill.w[6], -3); sfx('pop', k.fewer.w[3], -5); sfx('pop', k.entry.w[3], -4); sfx('shutter', k.market.w[3], -3);
  return b;
}

/* ---------- how to get in ---------- */
function buildGetIn(prev) {
  const k = PS({ way: "the way i'm getting into it is by getting a master's degree", diff: 'you can get into it different ways', basics: 'you can learn the basics',
    guides: 'there are free guides from places like nielsen norman group maze interaction design foundation', books: 'there are a lot of books as well',
    real: "try to do real research something that nobody's paying you for", pick: 'just pick an app you use', interview: 'interview a few people', watch: 'watch them use it', write: 'write what you find',
    caseS: 'write your first case study', vol: 'you can also volunteer to do research with small business',
    fields: 'come from other fields psychology teaching marketing journalism computer science', job: 'if your job already involves talking to people figuring out what they need', love: 'maybe this is something you might love',
    deg: 'degrees going to school', valid: 'is actually also a very valid route maybe even the most common one' });
  const G = k.guides.w;   // there are free guides from places like nielsen norman group maze interaction design foundation
  const steps = [['pick an app you use', k.pick.w[2]], ['interview a few people', k.interview.w[0]], ['watch them use it', k.watch.w[0]], ['write up what you find', k.write.w[0]], ['your first case study', k.caseS.w[2]]];
  const F_ = k.fields.w; const fl = [['psychology', F_[4]], ['teaching', F_[5]], ['marketing', F_[6]], ['journalism', F_[7]], ['computer science', F_[8]]];
  const b = board('get-in', (t) => {
    polaroid(t, 'my route', V(150, 80), V(150, 420), V(400, 380), 'her_720', "my route: a master's", { t: k.way.w[2], rot: -4, fs: 38 });
    wallWord(t, 'different ways', 'different ways', V(650, 560), V(260, 480), V(66, 66), UX.paint, k.diff.w[5], k.diff.w[6] + 0.3);
    note(t, 'learn the basics', V(650, 560), V(380, 560), V(300, 280), 'learn the basics', { t: k.basics.w[3], rot: 3, fs: 54 });
    sourceShot(t, 'nng shot', V(1220, 70), V(120, 1220), V(620, 460), 'src_nng_def', { t: G[7], rot: -2, crop: [0, 0, 910, 170] });
    sourceShot(t, 'maze shot', V(1265, 590), V(400, 1320), V(560, 420), 'src_maze', { t: G[9], rot: 2, crop: [0, 0, 1440, 760] });
    sourceShot(t, 'ixdf shot', V(1330, 560), V(700, 1220), V(500, 420), 'src_ixdf', { t: G[12], rot: -1, crop: [0, 0, 1060, 560] });
    credit(t, 'guides credit', 'Free guides: nngroup.com, maze.co, ixdf.org', V(150, 70), V(1005, 1600), G[12] + 0.4, { maxW: V(1300, 940) });
    note(t, 'how to ask questions', V(650, 560), V(680, 860), V(280, 280), 'how to ask questions', { t: k.basics.w[3] + 2.0, rot: -2, fs: 50 });
    note(t, 'books', V(950, 100), V(560, 1000), V(260, 250), 'books', { t: k.books.w[5], rot: -4, fs: 64, bg: UX.ora });
    // part 2: real research that nobody pays you for
    const ox = V(1920, 0), oy = V(0, 1920);
    card(t, 'real research card', ox + V(110, 70), oy + V(120, 420), V(1000, 940), V(820, 860), { t: k.real.w[4], rot: -1, head: 150, lh: 110 }, (x, y, w) => {
      textBlock('real research head', 'real research nobody pays you for', x + 40, y + 100, { font: (z) => FX.grot(z, 800), size: V(52, 46), col: UX.ink, ls: -0.03 });
      steps.forEach(([s, tt], i) => { const yy = y + 150 + 110 * (i + 1) - 30; const p = MOTION.ease(t, tt, 0.3, 'outExpo'); if (p <= 0) return;
        withA(p, () => { strokeR(x + 44, yy - 46, 54, 54, UX.ink, 4); textBlock('step ' + s, s, x + 130, yy, { font: (z) => FX.type(z, 700), size: V(48, 44), col: UX.ink }); });
        stroke(t, [[x + 54, yy - 22], [x + 70, yy - 4], [x + 104, yy - 54]], tt + 0.25, 0.25, UX.ora, 8); });
    });
    note(t, 'volunteer', ox + V(1250, 640), oy + V(260, 1110), V(400, 380), 'volunteer with a small business', { t: k.vol.w[4], rot: 4, fs: 52, bg: UX.ora });
    // part 3: other fields
    const px = V(0, 0), py = V(1080 + 400, 3840 + 400);
    wallWord(t, 'they come from other fields', 'they come from other fields', px + V(110, 60), py + V(170, 450), V(84, 64), UX.paint, k.fields.w[0], k.fields.w[3] + 0.3);
    fl.forEach(([w, tt], i) => note(t, w, px + V(110 + i * 350, 60 + (i % 3) * 330), py + V(280 + (i % 2) * 40, 560 + Math.floor(i / 3) * 330), V(300, 290), w, { t: tt, rot: tilt(i + 161, 5), fs: 52, bg: i === 4 ? UX.ora : UX.note }));
    typedCard(t, 'might love', px + V(110, 70), py + V(720, 1260), V(1100, 940), V(260, 320), k.job.w[3], 'If your job already involves talking to people, you might love this.', [...k.job.w.slice(0, 8), ...k.love.w.slice(5)], { size: V(48, 46), rot: -1 });
    note(t, 'a degree', px + V(1400, 600), py + V(600, 1080), V(360, 380), 'a degree: maybe the most common route', { t: k.valid.w[6], rot: 3, fs: 50, bg: UX.ora });
  }, { span: [2, 3], hL: 2.5 });
  link(prev, b, k.way.t - 0.7); screen(k.way.t - 0.7, 'get-in', 'how to get in'); camPart(k.way.t - 0.7, b, 0, 0);
  cam(k.guides.t - 0.5, b, [960, 540], [540, 960], 1, 0.8);
  screen(k.real.t - 0.35, 'real-research', 'real research'); camPart(k.real.t - 0.35, b, V(1, 0), V(0, 1));
  screen(k.fields.t - 0.5, 'other-fields', 'other fields'); cam(k.fields.t - 0.5, b, [960, 540], [1480 + 540, 3840 + 400 + 960], 1, 0.9);
  sfx('shutter', k.way.w[9]); sfx('pen', k.diff.w[5], -5); sfx('pop', k.basics.w[3], -4); sfx('shutter', G[7], -3); sfx('shutter', G[9], -4); sfx('shutter', G[12], -3); sfx('pop', k.books.w[5], -4);
  sfx('swipe', k.real.t - 0.05, -6); sfx('card', k.real.w[4]); steps.forEach(([, tt], i) => { if (i % 2 === 0) sfx('tick', tt + 0.25, -3); }); sfx('pop', k.vol.w[4], -3);
  sfx('swipe', k.fields.t - 0.2, -7); fl.forEach(([, tt], i) => { if (i % 2 === 0) sfx('pop', tt, -5); }); sfx('card', k.job.w[3], -3); sfx('pop', k.valid.w[6], -2);
  return b;
}

/* ---------- the close: the wall from far back, then the line, and the end card ---------- */
function buildClose(prev, all) {
  const k = PS({ that: "so that's ux research", long: "it's a very long video", skip: 'skipped through', forget: "just don't forget this phrase", g1: "good design doesn't start with screens", g2: 'good design starts with people' });
  const END = k.g2.e;
  const b = board('close', (t) => {
    const P_ = PORTRAIT; const L = V([200, 140, 1150, 660, 100], [70, 450, 940, 650, 88]);
    card(t, 'closing card', L[0], L[1], L[2], L[3], { t: k.g1.t, rot: -0.8, lines: false, from: 1.12 }, (x, y) => {
      const f = FX.grot(L[4], 800), ls = -L[4] * 0.035, lh = L[4] * 1.08;
      const rows = [["Good design doesn't", '', k.g1.w[0]], ['start with ', 'screens.', k.g1.w[3]], ['Good design starts', '', k.g2.w[0]], ['with ', 'people.', k.g2.w[3]]];
      rows.forEach(([a, bb, tt], i) => { const yy = y + 60 + L[4] + i * lh + (i > 1 ? L[4] * 0.45 : 0); const p = MOTION.ease(t, tt - 0.05, 0.3, 'outExpo'); if (p <= 0) return;
        withA(clamp(p * 2), () => { _txt(a, x + 60, yy, f, UX.ink, 'left', 'alphabetic', ls); if (bb) _txt(bb, x + 60 + tw(a, f, ls), yy, f, bb === 'people.' ? UX.ora : UX.ink, 'left', 'alphabetic', ls); });
        const sx = x + 60 + tw(a, f, ls), sw = tw(bb, f, ls);
        if (bb === 'screens.') stroke(t, [[sx - 8, yy - L[4] * 0.3], [sx + sw + 10, yy - L[4] * 0.36]], k.g1.w[5] + 0.15, 0.35, UX.ora, 13);
        if (bb === 'people.') stroke(t, loopPts(sx + 8, yy - L[4] * 0.8, sw - 8, L[4] * 0.95, 11, 4), k.g2.w[4] + 0.1, 0.6, UX.ora, 10); });
    });
    wallWord(t, 'if you skipped', 'If you skipped through,', V(200, 70), V(300, 560), V(84, 64), UX.paint, k.long.w[3] + 0.9, k.long.w[3] + 1.6, { out: k.g1.t - 0.2 });
    wallWord(t, "don't forget this", "don't forget this:", V(200, 70), V(440, 680), V(84, 64), UX.ora, k.forget.w[1], k.forget.w[3] + 0.3, { out: k.g1.t - 0.2 });
    credit(t, 'closing credit', 'Line from a Medium article.', L[0], L[1] + L[3] + V(70, 62), k.g1.t + 0.6);
    // the people (C's bedrock), painted on the wall under the card
    for (let i = 0; i < 7; i++) { const px = V(330 + i * 150, 150 + i * 95), py = V(1000, 1300); const a = MOTION.ease(t, k.g2.w[4] + 0.1 + i * 0.07, 0.4, 'outExpo'); person(px, py + (1 - a) * 30, V(90, 70), i === 3 ? UX.ora : UX.paint, a); }
    polaroid(t, 'Gbemi polaroid', V(1450, 170), V(220, 1340), V(330, 220), 'her_766', 'Gbemi', { t: k.g2.w[4] + 0.6, rot: 6, fs: V(40, 34) });
    note(t, '@WithGbemi', V(1440, 540), V(760, 1360), V(260, 230), '@WithGbemi', { t: END + 1.0, rot: 5, fs: 46, bg: UX.ora });
  });
  link(prev, b, k.long.w[3]);
  // "So that's UX research": the camera pulls far back over the wall, then flies to the last board on "this phrase"
  screen(k.that.t - 0.2, 'the-wall', "that's UX research");
  const bs = all.slice(-3);
  const span = () => { const a = bxy(bs[0]), z = bxy(b), sz = bsize(b); return PORTRAIT ? z[1] + sz[1] - a[1] : z[0] + sz[0] - a[0]; };
  cam(k.that.t - 0.2, bs[0], () => (PORTRAIT ? 540 : span() / 2), () => (PORTRAIT ? span() / 2 : 540), () => Math.max(0.2, (PORTRAIT ? H : W) / (span() + 600)), 1.2);
  // (no long overview: under 2 s, then into the closing board)
  screen(k.long.w[3], 'close', 'good design starts with people'); camBoard(k.long.w[3], b, 1.1);
  sfx('whoosh', k.that.t + 0.4, -6); sfx('riser', k.g1.t - 0.05, -4); sfx('card', k.g1.t); sfx('pen', k.g1.w[5] + 0.15, -2); sfx('pen', k.g2.w[4] + 0.1, -3); sfx('hit', k.g2.w[4], -5);
  sfx('shutter', k.g2.w[4] + 0.6, -4); sfx('pop', END + 1.0, -2);
  MOTION.expect('closing card lands', k.g1.t, { el: 'close/@closing card' });
  return b;
}

function buildPart3(b) {
  const start = BOARDS.length;
  b = buildGenEval(b); b = buildQualQuant(b); b = buildAttBeh(b); b = buildSayDo(b); b = buildMoreCats(b); b = buildMethods(b); b = buildBudget(b);
  b = buildUserMarket(b); b = buildAI(b); b = buildCareer(b); b = buildGetIn(b);
  return buildClose(b, BOARDS);
}
