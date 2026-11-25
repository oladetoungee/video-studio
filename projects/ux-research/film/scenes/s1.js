/* ux-research film, part 1: the opening dive (C) and UI vs UX (her words 0:00-1:10 of the edited voice). */
'use strict';

/* ---------- the opening: the screen is the crust, the question sits on it; then the dive down to the wall ---------- */
function buildOpening() {
  const k = PS({ app: "if you're building an app", q1: 'one very simple question', who: 'who is this app for and what do they actually need it for',
    heart: 'that question is the heart of ux research', study: 'what i study', hci: "master's degree in human-computer interaction", start: 'start from the scratch',
    ui: 'ui', ux: 'ux', home: 'and then we\'ll walk it all the way up to ux research', how: 'how it is done', all: 'and all of that' });
  const T_END = k.all.e + 0.25;
  // depth of each layer under the crust (landscape / portrait layout space)
  const CRUST = () => V(820, 1330), LAY = () => V(620, 760);
  const layers = [UX.s1, UX.s2, UX.s3, UX.s4, UX.wall];
  // camera (y of the view centre, zoom): holds on the surface, eases down a little on "heart", pulls back on the agenda, dives
  const camY = (t) => {
    let y = V(540, 960), z = 1;
    const p1 = MOTION.ease(t, k.heart.t, 1.0, 'inOutQuart'); y = lerp(y, V(660, 1120), p1);
    const p2 = MOTION.ease(t, k.start.t - 0.1, 1.0, 'inOutQuart'); y = lerp(y, CRUST() + LAY() * 0.3, p2); z = lerp(z, V(0.7, 0.72), p2);
    const p3 = MOTION.ease(t, k.how.t, T_END - k.how.t, 'inOutQuart'); y = lerp(y, CRUST() + LAY() * 4 + V(600, 1250), p3); z = lerp(z, 1, p3);
    return [y, z];
  };
  const draw = (t) => {
    const [cy, z] = camY(t);
    const pz = FR().z;
    ctx.save(); ctx.translate(W / 2, FR().cy); ctx.scale(z * pz, z * pz); ctx.translate(-W / 2, -cy - FR().dy);
    // strata: flat colours with a hand-cut wavy edge (no gradients); the last one is the wall
    for (let i = 0; i < layers.length; i++) {
      const y0 = CRUST() + LAY() * i; ctx.beginPath(); ctx.moveTo(-W * 2, y0 + 30);
      for (let x = -W * 2; x <= W * 3; x += 60) ctx.lineTo(x, y0 + Math.sin(x / 210 + i * 1.7) * 12 + Math.sin(x / 77 + i) * 4);
      ctx.lineTo(W * 3, y0 + LAY() * 8); ctx.lineTo(-W * 2, y0 + LAY() * 8); ctx.closePath(); ctx.fillStyle = layers[i]; ctx.fill();
    }
    // the phone (UI) stands on the crust
    const px = V(1240, 390), pw = V(300, 300), phH = V(560, 520), py = CRUST() - phH + 8;
    const pp = MOTION.ease(t, k.app.t, 0.7, 'outQuint');
    if (pp > 0) {
      strokePts([[px + 30, py], [px + pw - 30, py], [px + pw, py + 30], [px + pw, py + phH - 30], [px + pw - 30, py + phH], [px + 30, py + phH], [px, py + phH - 30], [px, py + 30], [px + 30, py]], pp, UX.dink, 12);
      const sp = MOTION.ease(t, k.app.t + 0.45, 0.4, 'outExpo');
      withA(sp, () => { rect(px + 28, py + 40, pw - 56, 110 * sp, UX.ora); rect(px + 28, py + 180, (pw - 120) * sp, 18, UX.dink); rect(px + 28, py + 214, (pw - 80) * sp, 12, '#BDB6AA'); rect(px + 28, py + 238, (pw - 140) * sp, 12, '#BDB6AA'); rect(px + 28, py + phH - 90, pw - 56, 44, UX.dink); });
    }
    // "one very simple question": a big orange question mark beside the phone until she asks it
    { const a = MOTION.ease(t, k.q1.w[3], 0.35, 'outExpo') * (1 - MOTION.ease(t, k.who.t - 0.3, 0.3, 'inExpo'));
      if (a > 0) withA(a, () => withT(V(560, 700), V(560, 560), lerp(1.4, 1, a), 0.12, () => _txt('?', 0, 0, FX.hank(V(300, 220), 800), UX.ora, 'center'))); }
    // her question, word by word on her words
    const qx = V(150, 80), qy = V(300, 590), qs = V(88, 84);
    const qLines = V(['Who is this app for,', 'and what do they', 'actually need it for?'], ['Who is this app for,', 'and what do they', 'actually need', 'it for?']);
    { const { o: ov, s } = TX('question', qLines.join('\n')); const lines = s.split('\n'); let wi = 0; const font = FX.hank(qs, 800), ls = -qs * 0.035, lh = qs * 1.05;
      const wMax = Math.max(...lines.map(l => tw(l, font, ls)));
      const qa = 1 - MOTION.ease(t, k.start.t, 0.4, 'inExpo');
      if (qa > 0) moved(ov, () => { ctx.save(); ctx.globalAlpha *= qa; lines.forEach((ln, li) => { let x = qx; ln.split(' ').forEach((w) => { const ti = k.who.w[Math.min(wi, k.who.w.length - 1)]; wi++;
        const p = prog(t, ti - 0.04, 0.3); if (p > 0) { const e = E.outExpo(p); withA(clamp(p * 2.4), () => _txt(w, x, qy + li * lh + (1 - e) * 14, font, /^(Who|need)/.test(w) ? UX.ora : UX.dink, 'left', 'alphabetic', ls)); }
        x += tw(w + ' ', font, ls); }); }); ctx.restore();
        if (t >= k.who.t - 0.05) regBox(ov, qx, qy - qs * 0.85, wMax, (lines.length - 1) * lh + qs * 1.1, { text: s, def: qLines.join('\n') }); });
      MOTION.expect('question lands', k.who.t, { state: 'question' }); if (t >= k.who.t) MOTION.state('question'); }
    // the probe: UX research drills down out of the phone on "the heart of UX research"
    const prb = MOTION.ease(t, k.heart.w[3], 1.4, 'inOutQuart');
    if (prb > 0) { const x0 = px + pw / 2, y0 = py + phH, y1 = y0 + (LAY() * 1.6) * prb; rect(x0 - 5, y0, 10, y1 - y0, UX.ora); circle(x0, y1, 16, UX.ora); }
    withA(MOTION.ease(t, k.heart.w[4], 0.4, 'outExpo'), () => textBlock('the heart of UX research', 'the heart of UX research', px + pw / 2 + V(40, 36), CRUST() + LAY() * V(0.75, 0.4), { font: (s) => FX.hank(s, 800), size: V(64, 46), col: UX.dink }));
    // her master's: a polaroid on the surface
    polaroid(t, 'her masters', V(560, 690), V(560, 760), V(300, 300), 'her_48', "my master's: HCI", { t: k.study.w[2], rot: -4, fs: 38 });
    // the agenda written on the layers as she says it: UI (crust), UX, UX research
    const lab = (key, s, y, t0) => withA(MOTION.ease(t, t0, 0.35, 'outExpo'), () => textBlock(key, s, V(150, 80), y, { font: (z_) => FX.hank(z_, 800), size: V(120, 110), col: UX.dink, ls: -0.03 }));
    lab('agenda UI', 'UI', CRUST() - V(60, 60), k.ui.t);
    lab('agenda UX', 'UX', CRUST() + LAY() * 0.5, k.ux.t);
    lab('agenda UX research', 'UX research', CRUST() + LAY() * 1.3, k.home.w[k.home.w.length - 2]);
    ctx.restore();
  };
  addScene(0, 'surf', 'the question', draw, { id: 'question' });
  sfx('pen', k.app.t, -2); sfx('pop', k.q1.w[3], -2); sfx('typeHit', k.who.t, -4); sfx('pen', k.heart.w[3], -4); sfx('shutter', k.study.w[2]);
  sfx('pop', k.ui.t, -3); sfx('pop', k.ux.t, -3); sfx('pop', k.home.w[k.home.w.length - 2], -3);
  sfx('riser', T_END - 0.05, -2); sfx('whoosh', k.how.t + 0.9, -4);
  return T_END;
}

/* ---------- UI/UX said like one word ---------- */
function buildUIUX(tStart) {
  const k = PS({ heard: 'probably heard people say', say: 'ui/ux like one word', des: 'ui/ux designer', crs: 'ui/ux course', two: 'but ui and ux are two different things' });
  const b = board('ui-ux-word', (t) => {
    const s = V(330, 300);
    const cx = BW() / 2;
    const k1 = MOTION.ease(t, k.two.w[1], 0.6, 'inOutQuart');   // the joined note splits on "UI and UX"
    // "UI/UX" said as one word: one note; then its two halves pull apart into two notes
    wallWord(t, 'people say', "you've probably heard people say", cx, V(200, 480), V(76, 56), UX.paint, tStart + 0.02, k.heard.w[3] + 0.2, { align: 'center', out: k.two.w[1] });
    note(t, 'UI/UX', cx - s / 2, V(330, 520), s, 'UI/UX', { t: k.say.t, rot: -2, fs: 92, out: k.two.w[1] });
    note(t, 'UI split', lerp(cx - s / 2, V(cx - s - 120, 70), k1), lerp(V(330, 520), V(300, 860), k1), s, 'UI', { t: k.two.w[1], rot: -3, fs: 120, from: 1.02, spin: 2, dy: 0 });
    note(t, 'UX split', lerp(cx - s / 2, V(cx + 120, BW() - s - 70), k1), lerp(V(330, 520), V(300, 860), k1), s, 'UX', { t: k.two.w[1], rot: 3, fs: 120, bg: UX.ora, from: 1.02, spin: -2, dy: 0 });
    // her two examples, typed on cards
    card(t, 'designer card', V(150, 90), V(100, 1160), V(520, 900), V(150, 140), { t: k.des.t, rot: -2, lines: false, out: k.two.w[1] }, (x, y) => textBlock('UI/UX designer', 'UI/UX designer', x + 40, y + V(95, 92), { font: (z) => FX.type(z, 700), size: V(52, 56), col: UX.ink }));
    card(t, 'course card', V(1250, 90), V(110, 1340), V(520, 900), V(150, 140), { t: k.crs.t, rot: 2, lines: false, out: k.two.w[1] }, (x, y) => textBlock('UI/UX course', 'UI/UX course', x + 40, y + V(95, 92), { font: (z) => FX.type(z, 700), size: V(52, 56), col: UX.ink }));
    // a paint-marker divider between the two, then "two different things"
    stroke(t, V(wavyPts(cx, 230, cx, 760, 8, 3, 24), wavyPts(540, 820, 540, 1260, 8, 3, 24)), k.two.w[3] + 0.1, 0.5, UX.paint, 9);
    wallWord(t, 'two different things', 'two different things', cx, V(900, 1420), V(96, 84), UX.paint, k.two.w[4], k.two.w[6] + 0.3, { align: 'center' });
  });
  screen(tStart, 'ui-ux-word', 'UI/UX');
  camBoard(0, b, 0.01);
  sfx('pen', tStart + 0.02, -3); sfx('pop', k.say.t); sfx('card', k.des.t); sfx('card', k.crs.t, -2); sfx('pop', k.two.w[1], 0); sfx('pen', k.two.w[3] + 0.1, -3);
  MOTION.expect('UI/UX note lands', k.say.t, { el: 'ui-ux-word/UI/UX' });
  return b;
}

/* ---------- UI vs UX: still A1 in motion ---------- */
function buildUIvsUX(prev) {
  const k = PS({ ui: 'ui stands for user interface', see: 'what you can see and touch', b1: 'the button', b2: 'the colours', b3: 'the layout', b4: 'the icons', b5: 'the screen',
    ux: 'ux on the other hand stands for user experience', feel: 'it is how the whole product feels to use',
    q1: "can a user find what they're looking for", q2: 'does it make sense to the user', q3: 'did users get frustrated using it', q4: 'did the user come back to use it' });
  const b = board('ui-vs-ux', (t) => {
    const P_ = PORTRAIT;
    const L = P_
      ? { ui: [70, 330, 940, 300], ux: [70, 1960, 940, 300], s: 280, fs: 52, uiN: [[70, 690], [400, 708], [730, 688], [235, 1022], [565, 1034]], uxN: [[60, 2330], [384, 2348], [708, 2326], [384, 2670]] }
      : { ui: [130, 120, 760, 330], ux: [1060, 120, 760, 330], s: 214, fs: 46, uiN: [[150, 520], [395, 540], [640, 512], [270, 778], [520, 790]], uxN: [[1060, 505], [1305, 525], [1574, 498], [1190, 740]] };
    const head = (key, big, sub, x, y, w, h, t0, rot, subT) => card(t, key, x, y, w, h, { t: t0, rot, head: 172, lh: P_ ? 46 : 52 }, (cx, cy) => {
      textBlock(key + ' head', big, cx + 44, cy + 140, { font: (z) => FX.grot(z, 800), size: P_ ? 130 : 150, col: UX.ink, ls: -0.04 });
      typedWords(t, key + ' sub', sub, cx + 46, cy + (P_ ? 226 : 232), P_ ? 38 : 40, UX.ink, subT, { w: 400, maxW: w - 90 });
    });
    head('UI card', 'UI', 'what you can see and touch', ...L.ui, k.ui.t, -1.5, k.see.w);
    ['the button', 'the colours', 'the layout', 'the icons', 'the screen'].forEach((w, i) => note(t, w, ...L.uiN[i], L.s, w, { t: [k.b1, k.b2, k.b3, k.b4, k.b5][i].w[1], rot: [-4, 3, -2, 5, -3][i], fs: L.fs }));
    if (!P_) stroke(t, wavyPts(960, 150, 962, 960, 10, 2, 30), k.ux.t - 0.5, 0.55, UX.paint, 8);
    head('UX card', 'UX', 'how the whole product feels to use', ...L.ux, k.ux.t, 1.2, k.feel.w.slice(2));
    const qs = [["Can a user find what they're looking for?", k.q1], ['Does it make sense to the user?', k.q2], ['Did the users get frustrated using it?', k.q3], ['Did the user come back to use it?', k.q4]];
    qs.forEach(([w, ph_], i) => note(t, w, ...L.uxN[i], L.s + 36, w, { t: ph_.t, rot: [3, -3, 4, -2][i], fs: P_ ? 40 : 34, bg: UX.ora }));
    const lq = L.uxN[3]; stroke(t, loopPts(lq[0], lq[1], L.s + 36, L.s + 36, 3), k.q4.w[4], 0.6, UX.paint, 8);
  }, { span: [1, 1.6] });
  link(prev, b, k.ui.t - 0.85); screen(k.ui.t - 0.85, 'ui-vs-ux', 'UI vs UX');
  camBoard(k.ui.t - 0.85, b);
  cam(k.ux.t - 0.6, b, () => BW() / 2, [540, 2400], 1, 0.8);   // portrait: travel down the tall board to UX
  sfx('swipe', k.ui.t - 0.45); sfx('card', k.ui.t); [k.b1, k.b3, k.b5].forEach((p) => sfx('pop', p.w[1], -3)); sfx('card', k.ux.t, -1);
  [k.q1, k.q3].forEach((p) => sfx('pop', p.t, -3)); sfx('pen', k.q4.w[4], -3);
  MOTION.expect('UI card lands', k.ui.t, { el: 'ui-vs-ux/@UI card' });
  return b;
}

/* ---------- a beautiful app that is a nightmare to use ---------- */
function buildNightmare(prev) {
  const k = PS({ beau: 'so you can have a beautiful app with a beautiful interface', night: 'that is a nightmare to use', gui: 'in that case you have a great ui', bux: 'but terrible ux' });
  const b = board('nightmare', (t) => {
    const P_ = PORTRAIT;
    const cx = V(380, 120), cy = V(110, 380), cw = V(640, 840), ch = V(860, 820);
    card(t, 'app card', cx, cy, cw, ch, { t: k.beau.w[1], rot: -1.5, lines: false }, (x, y, w, h) => {
      // an illustration of a good-looking app screen (labelled), drawn in ink and orange
      const px = x + w / 2 - 170, py = y + 70, pw = 340, phh = h - 170;
      strokeRR(px, py, pw, phh, 40, UX.ink, 10);
      rect(px + 30, py + 50, pw - 60, 150, UX.ora); rect(px + 30, py + 230, 200, 22, UX.ink); rect(px + 30, py + 268, 250, 14, '#BDB6AA'); rect(px + 30, py + 294, 220, 14, '#BDB6AA');
      for (let i = 0; i < 3; i++) fillRR(px + 30 + i * 95, py + 340, 80, 80, 14, i === 1 ? UX.note : '#E6E0D5');
      fillRR(px + 30, py + phh - 90, pw - 60, 50, 25, UX.ink);
      // the user's path through it: a knot (drawn on "nightmare")
      const knot = []; for (let i = 0; i <= 120; i++) { const u = i / 120; knot.push([px + pw / 2 + Math.sin(u * 19) * 120 * (0.4 + u * 0.6) + (u - 0.5) * 60, py + 120 + u * (phh - 220) + Math.cos(u * 23) * 70]); }
      stroke(t, knot, k.night.w[3], 1.1, UX.ora, 9);
    });
    const n1 = V([1180, 220], [80, 1230]), n2 = V([1180, 600], [560, 1230]), s = V(300, 280);
    note(t, 'great UI', ...n1, s, 'great UI', { t: k.gui.w[4], rot: -3, fs: 64, after: (x, y, s_) => stroke(t, [[x + s_ * 0.66, y + s_ * 0.86], [x + s_ * 0.76, y + s_ * 0.96], [x + s_ * 0.96, y + s_ * 0.7]], k.gui.w[5] + 0.2, 0.35, UX.green, 12) });
    note(t, 'terrible UX', ...n2, s, 'terrible UX', { t: k.bux.w[0], rot: 3, fs: 64, bg: UX.ora, after: (x, y, s_) => { stroke(t, [[x + s_ * 0.7, y + s_ * 0.72], [x + s_ * 0.94, y + s_ * 0.96]], k.bux.w[2] + 0.15, 0.25, UX.ink, 12); stroke(t, [[x + s_ * 0.94, y + s_ * 0.72], [x + s_ * 0.7, y + s_ * 0.96]], k.bux.w[2] + 0.35, 0.25, UX.ink, 12); } });
    wallWord(t, 'a nightmare to use', 'a nightmare to use', V(1060, 80), V(980, 1625), V(80, 76), UX.paint, k.night.w[3], k.night.w[4] + 0.35);
  });
  link(prev, b, k.beau.t - 0.75); screen(k.beau.t - 0.75, 'nightmare', 'great UI, terrible UX'); camBoard(k.beau.t - 0.75, b);
  sfx('card', k.beau.w[1]); sfx('pen', k.night.w[3], -2); sfx('tick', k.gui.w[5] + 0.2, -2); sfx('error', k.bux.w[2] + 0.15, -4);
  return b;
}

/* ---------- UI is part of UX; the experience is much bigger ---------- */
function buildBigger(prev) {
  const k = PS({ part: 'so your ui is kind of part of your ux', big: 'the experience is just much bigger than what is on the screen' });
  const b = board('bigger', (t) => {
    const cx = BW() / 2, cy = BH() / 2;
    const s = V(240, 240);
    note(t, 'UI small', cx - s / 2, cy - s / 2 - V(20, 80), s, 'UI', { t: k.part.w[2], rot: -3, fs: 110 });
    stroke(t, loopPts(cx - 210, cy - 230 - V(20, 80), 420, 420, 5, 30), k.part.w[7], 0.6, UX.ora, 10);
    wallWord(t, 'UX inner', 'UX', cx + V(250, 200), cy - V(170, 330), V(110, 100), UX.ora, k.part.w[7], k.part.w[7] + 0.35);
    // the camera pulls back on "much bigger": a far bigger loop and her line
    stroke(t, loopPts(cx - V(820, 470), cy - V(470, 860), V(1640, 940), V(940, 1720), 9, 30), k.big.w[4], 0.9, UX.paint, 12);
    if (!PORTRAIT) wallWord(t, 'much bigger than what is on the screen', 'much bigger than what is on the screen', cx, cy + 330, 84, UX.paint, k.big.w[4] + 0.2, k.big.w[9] + 0.3, { align: 'center' });
    else { wallWord(t, 'much bigger than', 'much bigger than', cx, cy + 560, 64, UX.paint, k.big.w[4] + 0.2, k.big.w[6] + 0.3, { align: 'center' }); wallWord(t, 'what is on the screen', 'what is on the screen', cx, cy + 660, 64, UX.paint, k.big.w[7], k.big.w[9] + 0.3, { align: 'center' }); }
  });
  link(prev, b, k.part.t - 0.3); screen(k.part.t - 0.3, 'bigger', 'the experience is bigger');
  cam(k.part.t - 0.3, b, () => BW() / 2, () => BH() / 2 - V(20, 80), 1.45, 0.8);
  cam(k.big.w[3], b, () => BW() / 2, () => BH() / 2, V(0.98, 0.98), 1.0);
  sfx('pop', k.part.w[2]); sfx('pen', k.part.w[7], -3); sfx('swipe', k.big.w[3] + 0.4, -6); sfx('pen', k.big.w[4], -3);
  return b;
}

function buildPart1() {
  const tEnd = buildOpening();
  const b1 = buildUIUX(tEnd);
  const b2 = buildUIvsUX(b1);
  const b3 = buildNightmare(b2);
  return buildBigger(b3);
}
