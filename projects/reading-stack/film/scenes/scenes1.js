/* Scenes, part 1: title, the stack, the problem, the method, origins, priming, why it works (0:00 - 4:28)
 * Every position is V(landscape 1920×1080, portrait 1080×1920). Portrait content sits in y 370..1440 (platform UI
 * covers the top and bottom ~250 px; captions own 1460..1660). 4:5 reuses the portrait layout. */
'use strict';

function buildScenes1() {
  /* ---------- 0 · title card (paper): the title rises, her real stack drops in beside it ---------- */
  const T_DROP = { convivial: 0.55, baratta: 0.85, marple: 1.12 };
  const STK = () => ({ x: V(980, L + 10), yb: V(970, 1440), w: V(830, 900) });   // the stack's place (title + stack scenes)
  addS(0, 'paper', '// 00 — intro', (t) => {
    KR(t, { lines: V(['How to read'], ['How to', 'read']), x: L - 4, y: V(400, 640), size: V(250, 230), times: [0.12, 0.26, 0.4] });
    KR(t, { lines: V(['and actually ~remember it.~'], ['and actually', '~remember it.~']), font: 'body', x: L + 4, y: V(590, 1040), size: V(104, 100), times: [0.95, 1.08, 1.3, 1.3] });
    withA(prog(t, 1.35, 0.3), () => mono('A reading method, tested on two books', L + 6, V(960, 420), 26, g.mid, 'left', { ls: 0.24 }));
    const s = STK(); realStack(t, s.x, s.yb, s.w, { drops: T_DROP });
  }, { id: 'title', push: 0.012 });
  sWh(0.3, -6); Object.values(T_DROP).forEach((x, i) => sBook(x + 0.15, -1 - i)); sPen(1.72, -2);

  /* ---------- 1 · "this is my current reading stack" ---------- */
  const k1 = PS({ a: 'so this is my current reading stack', bw: 'by the way i got that phrase from a video i saw', guy: 'this guy was like', q: 'this is my current reading stack', love: 'and i love this so much', nice: "it's always so nice to me", c: 'so yeah this is my current reading stack' });
  addS(S(k1.a, 0.1), 'ink', '// 01 — the stack', (t) => {   // the title card holds until just before her first word; the stack stays put across the cut
    KR(t, { lines: V(['So, this is my current'], ['So, this is', 'my current']), x: L, y: V(300, 520), size: V(110, 104), times: k1.a.w.slice(0, 5), dur: 0.42 });
    KR(t, { lines: ['Reading'], x: L - 6, y: V(545, 860), size: V(240, 205), times: [k1.a.w[5]] });
    KR(t, { lines: ['*Stack.*'], x: L - 6, y: V(770, 1060), size: V(240, 205), times: [k1.a.w[6]] });
    const s = STK(); realStack(t, s.x, s.yb, s.w, {});
  }, { id: 'stack', grid: true, push: 0.02 });
  sPop(k1.a.w[5] + 0.08, -2); sImp(k1.a.w[6] + 0.08, -8);

  addS(S(k1.bw), 'paper', '// 01 — the stack', (t) => {
    { const s = STK(), q = E.inOutCubic(prog(t, S(k1.bw), 0.7)); if (!PORTRAIT) realStack(t, lerp(s.x, L, q), lerp(s.yb, 1000, q), lerp(s.w, 520, q), {}); else if (q < 1) realStack(t, s.x, lerp(s.yb, 2300, q), s.w, {}); }
    beat(t, 0, k1.love.t - 0.05, () => KT(t, { lines: V(['By the way, I got that', 'phrase from a ~video~ I saw.'], ['By the way, I got', 'that phrase from', 'a ~video~ I saw.']), font: 'body', x: L, y: V(470, 520), size: V(72, 72), times: k1.bw.w }));
    beat(t, k1.love.t - 0.05, 1e9, () => {
      KT(t, { lines: ['“And I ~love~ this', 'so much.”'], font: 'body', x: L, y: V(470, 520), size: V(72, 72), times: TM(k1.love, 6) });
      withA(prog(t, k1.nice.t, 0.3), () => mono("It's always so nice to me", L, V(700, 700), 26, g.mid, 'left', { ls: 0.2 }));
    });
    // the video he was in: a generic video window; the cursor presses play on "this guy was like"
    const p = sn(t, k1.bw.w[9], 0.5); if (p <= 0) return;
    const by0 = V(250, 790), bx = V(1010, 80), by = by0 + 60 * (1 - p), bw = V(800, 920), bh = V(560, 640);
    withA(clamp(p * 2), () => browser(bx, by, bw, bh, { t, url: 'video.example/watch', typeT0: k1.bw.w[9] + 0.1, cps: 26, body: (x, y, w, h) => {
      rect(x, y, w, h, C.ink);
      const playing = t >= k1.guy.t + 0.05;
      if (!playing) { ctx.beginPath(); ctx.moveTo(x + w / 2 - 34, y + h / 2 - 44); ctx.lineTo(x + w / 2 + 50, y + h / 2); ctx.lineTo(x + w / 2 - 34, y + h / 2 + 44); ctx.closePath(); ctx.fillStyle = C.card; ctx.fill(); }
      const pr = playing ? clamp((t - k1.guy.t) / 14) : 0;
      rect(x + 30, y + h - 40, w - 60, 4, C.inkLine); rect(x + 30, y + h - 40, (w - 60) * (0.18 + pr * 0.5), 4, C.blueT);
      if (playing) {
        const q = '“This is my current reading stack.”';
        const qf = F.body(V(40, 44), 700);
        const n = typeText(t, k1.q.t, q, x + 50, y + h / 2 + 10, qf, C.card, { cps: q.length / Math.max(0.6, k1.q.e - k1.q.t), caretTo: k1.q.e + 0.2 });
        if (n === 0) mono('▶  playing', x + 50, y + h / 2 + 10, 24, C.inkMid);
        // her favourite phrase, underlined as she says she loves it
        handLine(x + 50, y + h / 2 + 34, tw(q, qf) * 0.98, E.outCubic(prog(t, k1.love.w[2] + 0.1, 0.5)), C.blueT, 6, 4);
      }
      // the heart: she loves this phrase
      const hp = prog(t, k1.love.w[2], 0.4); if (hp > 0) withA(clamp(hp * 3), () => withT(x + w - 80, y + 80, E.outBack(hp, 2.2), 0, () => {
        ctx.beginPath(); ctx.moveTo(0, 22); ctx.bezierCurveTo(-40, -6, -24, -38, 0, -18); ctx.bezierCurveTo(24, -38, 40, -6, 0, 22); ctx.closePath(); ctx.fillStyle = C.blueT; ctx.fill(); }));
    } }));
    const px = bx + bw / 2 + 12, py = by0 + 64 + (bh - 64) / 2 + 12;
    cursorAt(t, [[k1.guy.t - 0.9, V(1700, 900), V(980, 1500)], [k1.guy.t - 0.05, px, py], [k1.q.e + 0.6, px, py], [k1.q.e + 1.2, V(1780, 960), V(980, 1400)]], [k1.guy.t]);
  }, { id: 'video' });
  sCard(k1.bw.w[9] - 0.05); sType(k1.bw.w[9] + 0.1, 17, 26); sClick(k1.guy.t); sType(k1.q.t, 36, 36 / Math.max(0.6, k1.q.e - k1.q.t)); sPop(k1.love.w[2] + 0.12, -1); sPen(k1.love.w[2] + 0.1, -3);

  // the stack again, big: the spines drop one by one on her words, the title lands under them
  addS(S(k1.c), 'ink', '// 01 — the stack', (t) => {
    KR(t, { lines: V(['This is my current'], ['This is my', 'current']), font: 'body', x: V(CX, L), align: V('center', 'left'), y: V(250, 520), size: V(72, 76), times: k1.c.w.slice(2, 6) });
    KR(t, { lines: V(['Reading *stack.*'], ['Reading', '*stack.*']), x: V(CX, L - 6), align: V('center', 'left'), y: V(470, 800), size: V(190, 200), times: [k1.c.w[6], k1.c.w[7]] });
    realStack(t, V(260, L + 2), V(940, 1430), V(1400, 916), { drops: { convivial: k1.c.t + 0.02, baratta: k1.c.w[4] - 0.05, marple: k1.c.w[5] - 0.05 }, dropH: V(420, 380) });
  }, { id: 'stack-again', grid: true, push: 0.02 });
  sBook(k1.c.t + 0.17, -1); sBook(k1.c.w[4] + 0.1, -2); sBook(k1.c.w[5] + 0.1, -3); sImp(k1.c.w[7] + 0.05, -8);

  /* ---------- 2 · three books: the real covers fan in as she names them ---------- */
  const k2 = PS({ three: 'right now i have three books', b1: 'how to read and write critically by alex baratta', lib: 'from the library', b2: 'convivial toolbox', thesis: 'for my thesis', sup: 'suggested it to me', b3: "miss marple's final cases by agatha christie", nt: 'not going to talk about', fic: 'fiction i think is a different thing entirely' });
  const fanAt = (t) => { // fan state: how many covers are out, and the blend toward that layout
    const T1 = k2.b2.w[0], T2 = k2.b3.t; return { a: ease(t, T1 - 0.1, 0.55, E.inOutCubic), b: ease(t, T2 - 0.1, 0.55, E.inOutCubic) };
  };
  addS(S(k2.three), 'paper', '// 01 — the stack', (t) => {
    KR(t, { lines: V(['Right now: *three books.*'], ['Right now:', '*three books.*']), x: L, y: V(230, 470), size: V(100, 120), times: pick(k2.three, [0, 1, 4, 5]) });
    IDX(t, [
      { n: '01', s: 'How to Read and Write Critically', tin: k2.b1.t, sub: V('Alex Baratta', null) },
      { n: '02', s: 'Convivial Toolbox', tin: k2.b2.w[0], sub: V('Liz Sanders & Pieter Jan Stappers', null) },
      { n: '03', s: "Miss Marple's Final Cases", tin: k2.b3.t, sub: V('Agatha Christie', null), strike: k2.fic.w[0], dim: k2.fic.w[0] + 0.4 },
    ], { x: L, y: V(450, 1286), w: V(1000, 920), rowH: V(180, 72), size: V(50, 40), numW: V(100, 76), numSize: V(32, 26), subBelow: true, subDy: V(50, 40), ruleDy: V(88, 24), strikeCol: C.blue });
    // her marker follows the titles as she reads them
    { const fs = V(50, 40), f = F.disp(fs), ls = fs * LS.disp, nx = L + V(100, 76), rows = [[k2.b1.t, k2.b1.w[5] + 0.3, "HOW TO READ AND WRITE CRITICALLY"], [k2.b2.t, k2.b2.e + 0.2, 'CONVIVIAL TOOLBOX'], [k2.b3.w[1], k2.b3.w[4] + 0.3, "MISS MARPLE'S FINAL CASES"]];
      rows.forEach(([a, b, s], i) => { const y = V(450, 1286) + i * V(180, 72); if (t < k2.fic.w[0]) inkSweep(t, nx - 10, y - fs * 0.86, tw(s, f, ls) + 20, fs * 1.04, a, b, (c) => _txt(s, nx, y, f, c, 'left', 'alphabetic', ls)); });
      if (!PORTRAIT) [[0, k2.b1.w[6], k2.b1.e + 0.2, 'Alex Baratta'], [2, k2.b3.w[5], k2.b3.e + 0.2, 'Agatha Christie']].forEach(([i, a, b, s]) => { const y = 450 + i * 180 + 50, ms = 24, mf = F.mono(ms, 500), mls = ms * LS.mono; if (t < k2.fic.w[0]) inkSweep(t, nx - 6, y - 24, tw(s.toUpperCase(), mf, mls) + 14, 34, a, b, (c) => _txt(s.toUpperCase(), nx + 2, y, mf, c, 'left', 'alphabetic', mls), C.ink); }); }
    // the covers, real photos from her footage: one, then two, then three in a fan; Marple slides away ("not today")
    const f = fanAt(t); const cw = V(400, 350);
    const L1 = V([[1480, 580, -0.03], [1400, 570, -0.06], [1340, 580, -0.08]], [[540, 920, -0.03], [450, 910, -0.06], [380, 920, -0.08]]);
    const L2 = V([[1570, 600, 0.03], [1480, 590, -0.01]], [[640, 920, 0.03], [560, 910, -0.01]]);
    const L3 = V([1610, 610, 0.05], [740, 930, 0.05]);
    const p1 = L1[0].map((v, i) => lerp(lerp(v, L1[1][i], f.a), L1[2][i], f.b)), p2 = L2[0].map((v, i) => lerp(v, L2[1][i], f.b));
    const card = (img, tin, P, key, extra = {}) => { const st = landAt(t, tin, P[0], P[1], { dx: V(500, 400), dy: 40, r: 0.25, d: 0.6 }); if (st.p <= 0) return;
      const off = extra.leave ? ease(t, extra.leave, 0.7, E.inOutCubic) : 0;
      mb(t, tin, 0.6, (tt) => { const s2 = landAt(tt, tin, P[0], P[1], { dx: V(500, 400), dy: 40, r: 0.25, d: 0.6 }); withA(s2.a * (1 - 0.8 * off), () => { const h = cw * img.height / img.width; const rot = P[2] + s2.r + 0.18 * off;
        withT(0, 260 * off, 1, 0, () => { imgCard(img, s2.x - cw / 2, s2.y - h / 2, cw, { rot, pad: 12, key }); if (extra.over) withT(s2.x, s2.y, 1, rot, () => extra.over(cw, h)); }); }); }); };
    // her library copy gets a stamp; her thesis copy gets a sticky tab (her real copy is full of them)
    const stamp = (cw2, h) => { const p = prog(t, k2.lib.w[2], 0.3); if (p <= 0) return; withA(clamp(p * 3), () => withT(0, h * 0.18, 2.2 - 1.2 * E.outCubic(p), -0.18, () => { strokeR(-cw2 * 0.36, -34, cw2 * 0.72, 68, C.ink, 5); _txt('LIBRARY', 0, 11, F.mono(30, 500), C.ink, 'center', 'alphabetic', 6); })); };
    const tab = (cw2, h) => { const p = prog(t, k2.thesis.w[2], 0.35); if (p > 0) { const e = E.outBack(p, 1.8); rect(-cw2 / 2 + 24, -h / 2 - 54 * e, 120, 70 * e, C.blue); if (e > 0.6) _txt('THESIS', -cw2 / 2 + 84, -h / 2 - 54 * e + 34, F.mono(18, 500), C.onBlue, 'center', 'alphabetic', 3); }
      const q = prog(t, k2.sup.w[0] - 0.3, 0.35); if (q > 0) { const e = E.outBack(q, 1.8); rect(cw2 / 2 - 10, -h * 0.12, 64 * e + 10, 150, C.ink); if (e > 0.6) withT(cw2 / 2 + 28, -h * 0.12 + 75, 1, Math.PI / 2, () => _txt('SUGGESTED', 0, 7, F.mono(16, 500), C.card, 'center', 'alphabetic', 3)); } };
    card(IMG.bookB, k2.b1.w[4] - 0.1, p1, 'cover baratta', { over: stamp });
    card(IMG.bookC, k2.b2.w[0], p2, 'cover convivial', { over: tab });
    const ftab = (cw2, h) => { const p = prog(t, k2.b3.w[6], 0.35); if (p <= 0) return; const e = E.outBack(p, 1.8); rect(-cw2 / 2 - 64 * e, -h * 0.3, 64 * e + 6, 170, C.ink); if (e > 0.6) withT(-cw2 / 2 - 30, -h * 0.3 + 85, 1, -Math.PI / 2, () => _txt('FICTION', 0, 7, F.mono(16, 500), C.card, 'center', 'alphabetic', 3)); };
    card(IMG.marple, k2.b3.w[1], L3, 'cover marple', { leave: k2.nt.w[1] });
    // one typed caption under the fan, replaced as she speaks
    const cy = V(950, 1222), cx = V(1200, L + 4); const cf = F.mono(V(26, 28), 500);
    const caps = [['From the library', k2.lib.t, k2.b2.w[0] - 0.1], ['For my thesis', k2.thesis.t, k2.sup.t - 0.3], ['Suggested by a course supervisor', k2.sup.t - 0.2, k2.b3.t - 0.1], ['Fiction — not today', k2.fic.w[0] + 0.5, 1e9]].map(c => c); 
    caps.forEach(([s, a, b]) => beat(t, a, b, () => typeText(t, a, s.toUpperCase(), cx, cy, cf, g === G.ink ? C.paper : C.ink, { cps: 26, ls: V(26, 28) * 0.16, key: 'caption ' + s, caretTo: a + 1.6 })));
  }, { id: 'three-books' });
  sPop(k2.three.w[5], -2); sPop(k2.b1.t, -4); sWh(k2.b1.w[4] + 0.05, -4); sCard(k2.b1.w[4] + 0.3); sType(k2.lib.t, 16, 26); sImp(k2.lib.w[2] + 0.12, -12); sBook(k2.lib.w[2] + 0.1, -2);
  sPop(k2.b2.w[0] - 0.05, -4); sWh(k2.b2.w[0] + 0.15, -4); sCard(k2.b2.w[0] + 0.4); sType(k2.thesis.t, 13, 26); sPop(k2.thesis.w[2] + 0.08, -1); sType(k2.sup.t - 0.2, 32, 26, -2);
  sPop(k2.b3.t, -4); sPop(k2.b3.w[6] + 0.08, -3); sPop(k2.sup.w[0] - 0.25, -3); sWh(k2.nt.w[1] + 0.25, -7); sWh(k2.b3.w[1] + 0.15, -4); sCard(k2.b3.w[1] + 0.4); sPen(k2.fic.w[0], -1); sWh(k2.fic.w[0] + 0.55, -6); sType(k2.fic.w[0] + 0.5, 19, 26);

  /* ---------- 3 · today: a reading method to remember a huge chunk of what you read ---------- */
  const k3 = PS({ today: 'so today i want to talk about', rm: 'a reading method', rem: 'to remember a huge chunk of the things that you read', prac: 'try it practically in this video' });
  addS(S(k3.today), 'ink', '// 02 — today', (t) => {
    KR(t, { lines: ['Today:'], x: L, y: V(300, 500), size: V(160, 140), times: [k3.today.t] });
    KT(t, { lines: V(['A reading method', 'to ~remember~ a huge', 'chunk of what', 'you read.'], ['A reading method to', '~remember~ a huge chunk', 'of what you read.']), font: 'body', x: L, y: V(420, 640), size: V(84, 70), lh: 1.16, times: [...k3.rm.w, ...TM(k3.rem, 9)] });
    // what you read, as a column of chapters: a huge chunk of it fills in (remembered)
    const out = k3.prac.t - 0.15;
    const cardX = V(1040, L), cardY = V(200, 900), cw = V(770, 920), chh = V(700, 520), rows = 9;
    beat(t, k3.rm.t, out, () => { const p = landAt(t, k3.rm.w[1], cardX, cardY, { dy: 60 }); if (p.p <= 0) return; withA(p.a, () => grp('what you read', p.x, p.y, cw, chh, () => {
      pageCard(p.x, p.y, cw, chh, { label: 'What you read · one of the two books', bw: 0 });
      for (let i = 0; i < rows; i++) {
        const ry = p.y + 130 + i * (chh - 170) / rows; const on = i < 7 ? E.outExpo(prog(t, k3.rem.w[3] + 0.12 + i * 0.09, 0.35)) : 0;
        const tf = F.body(V(24, 22), 600); const ttl = BARATTA[i]; const tw_ = Math.min(tw(ttl, tf), cw - 200) + 16; if (on > 0) rect(p.x + 42, ry - 6, tw_ * on, V(34, 30), C.blue); ctx.save(); ctx.beginPath(); ctx.rect(p.x, ry - 8, cw - 140, 40); ctx.clip(); fitTxt(ttl, p.x + 50, ry + V(20, 18), tf, on >= 1 ? C.card : C.ink, cw - 200); ctx.restore();
      }
      const bp = E.outExpo(prog(t, k3.rem.w[5], 0.5)); const bx = p.x + cw - 110, y0 = p.y + 120, y1 = p.y + 130 + 6.6 * (chh - 170) / rows + 22;
      if (bp > 0) { pline(bx, y0, bx, lerp(y0, y1, bp), 1, C.blue, 5); pline(bx - 26, y0, bx, y0, bp, C.blue, 5); pline(bx - 26, y1, bx, y1, bp, C.blue, 5); withA(bp, () => withT(bx + 44, (y0 + y1) / 2, 1, -Math.PI / 2, () => mono('Remembered', 0, 0, 22, C.blue, 'center', { ls: 0.2, fixed: true }))); }
    })); });
    // "I'm going to try it, practically": the two books she tests it on
    beat(t, out, 1e9, () => {
      [[IMG.bookB, V(1250, 310), V(590, 1150), -0.04, 0], [IMG.bookC, V(1620, 770), V(600, 1160), 0.04, 1]].forEach(([img, x, y, r, i]) => {
        const tin = out + 0.05 + i * 0.12; const st = landAt(t, tin, x, y, { dy: 260, r: 0.2 * (i ? 1 : -1) }); if (st.p <= 0) return; const cw2 = V(380, 360); const h = cw2 * img.height / img.width;
        mb(t, tin, 0.55, (tt) => { const s2 = landAt(tt, tin, x, y, { dy: 260, r: 0.2 * (i ? 1 : -1) }); withA(s2.a, () => imgCard(img, s2.x - cw2 / 2, s2.y - h / 2, cw2, { rot: r + s2.r, pad: 12, key: 'tested ' + i })); });
      });
    });
  }, { id: 'today' });
  sPop(k3.today.t, -3); sCard(k3.rm.w[1]); sPen(k3.rem.w[1] + 0.3, -3); sfx('tick', k3.rem.w[3] + 0.15, -2, {}); sPop(k3.rem.w[3] + 0.75, -5); sPen(k3.rem.w[5], -3); sWh(k3.prac.t, -5); sBook(k3.prac.t + 0.25, -3); sBook(k3.prac.t + 0.37, -4);

  /* ---------- 4 · the problem ---------- */
  const k4 = PS({ read: 'the problem is that you read a book', days: 'some days', weeks: 'some weeks', asks: 'someone asks you later', what: 'what is this book about', gist: 'the general gist', vibe: 'the general vibe', one: 'maybe one or two things', pin: 'but you cannot really pinpoint', more: "you can't give them more information", feel: 'you are left with the feeling about the book', itself: 'as opposed to the book itself', fix: 'is going to fix that' });
  // time with the book: a calendar that fills, days then weeks
  addS(S(k4.read), 'ink', '// 03 — the problem', (t) => {
    KR(t, { lines: V(['You read a book.'], ['You read', 'a book.']), x: L - 4, y: V(300, 560), size: V(150, 170), times: pick(k4.read, [4, 5, 6, 7]) });
    const cols = 7, rowsN = 4, gx = V(L, L), gy = V(450, 870), cw = V((W - 2 * L - 6 * 14) / 7, (W - 2 * L - 6 * 12) / 7), ch = V(96, 110), gap = V(14, 12);
    withA(prog(t, k4.read.w[1], 0.3), () => mono('Time with the book', gx, gy - 30, 26, g.mid, 'left', { ls: 0.2 }));
    const filled = (tt) => Math.floor(5 * E.outCubic(prog(tt, k4.days.w[1] - 0.2, 0.7)) + 19 * E.outCubic(prog(tt, k4.weeks.w[1] - 0.2, 1.4)));
    const nOn = filled(t);
    for (let i = 0; i < cols * rowsN; i++) {
      const x = gx + (i % cols) * (cw + gap), y = gy + Math.floor(i / cols) * (ch + gap); const ap = prog(t, k4.read.w[1] + i * 0.012, 0.3); if (ap <= 0) continue;
      withA(ap, () => { if (i < nOn) rect(x, y, cw, ch, i < 5 ? C.blueT : C.paper); else strokeR(x, y, cw, ch, C.inkLine, 2); mono(String(i + 1).padStart(2, '0'), x + 14, y + 32, 20, i < nOn ? C.ink : C.inkMid, 'left', { ls: 0.06, raw: true, fixed: true }); });
    }
    const fy = gy + rowsN * (ch + gap) + 40;
    withA(prog(t, k4.days.w[1], 0.3), () => mono(t >= k4.weeks.w[1] ? 'Some weeks' : 'Some days', gx, fy, 28, C.blueT, 'left', { ls: 0.2, raw: true }));
    withA(prog(t, k4.weeks.e + 0.1, 0.3), () => mono('…and then someone asks', W - L, fy, 26, g.mid, 'right', { ls: 0.2 }));
  }, { id: 'read-a-book' });
  sPop(k4.read.w[7], -4); sTick(k4.days.w[1], -2); [0.15, 0.3, 0.45].forEach(d => sTick(k4.days.w[1] + d, -6)); sfx('tick', k4.weeks.w[1], -2); [0.2, 0.45, 0.75, 1.1].forEach(d => sTick(k4.weeks.w[1] + d, -7));
  // the question arrives as a message
  addS(S(k4.asks, 0.3), 'paper', '// 03 — the problem', (t) => {
    withA(prog(t, k4.asks.t, 0.25), () => mono('Someone asks you, later', L + 4, V(300, 560), 28, g.mid, 'left', { ls: 0.24 }));
    const bx = L, by = V(400, 640), bw = V(1300, W - 2 * L);
    const dots = prog(t, k4.asks.w[1], 0.2); const msg = t >= k4.what.t - 0.05;
    if (dots > 0 && !msg) withA(dots, () => { fillRR(bx, by, 260, 120, 40, C.card); for (let i = 0; i < 3; i++) circle(bx + 80 + i * 50, by + 60 + 10 * Math.sin(t * 9 - i * 0.9) * 0.6, 12, C.mid); });
    if (msg) { const p = landAt(t, k4.what.t - 0.05, bx, by, { dy: 40, d: 0.45 }); withA(p.a, () => withT(0, p.y - by, 1, 0, () => bubble(bx, by, bw, '“So what is this book about?”', { size: V(96, 92), key: 'question bubble', bg: C.card }))); }
    // the reply she can give: just the gist
    withA(prog(t, k4.what.e + 0.25, 0.3), () => { const ry = V(860, 1260); fillRR(V(W - L - 520, W - L - 600), ry - 70, V(520, 600), 110, 22, C.ink); mono('Um… the gist?', V(W - L - 470, W - L - 550), ry, 30, C.paper, 'left', { ls: 0.16 }); });
  }, { id: 'question' });
  sPop(k4.asks.w[1], -6); sPop(k4.what.t, 0); sPop(k4.what.e + 0.25, -4);
  // the gist, the vibe: a page that never comes into focus; then a crosshair that can't lock on
  const pageBlur = (t, x, y, w, h, sharp) => { rect(x, y, w, h, C.card); const tf = F.body(V(22, 22), 600);
    for (let r = 0; r < 9; r++) { const ry = y + 70 + r * (h - 110) / 9; const sh = sharp.find(s => s[0] === r); const p = sh ? ease(t, sh[1], 0.4) : 0; if (p > 0) rect(x + 36, ry - 6, (w - 72) * p, 32, C.blue); withA(p > 0.5 ? 1 : 0.3, () => fitTxt(BARATTA[r], x + 44, ry + 18, tf, p > 0.5 ? C.card : C.ink, w - 88)); } };
  addS(S(k4.gist), 'ink', '// 03 — the problem', (t) => {
    const px = V(1180, L), py = V(230, 1000), pw = V(630, W - 2 * L), ph = V(640, 420);
    beat(t, 0, k4.pin.t - 0.1, () => {
      withA(0.6, () => { KT(t, { lines: ['The gist.'], x: L, y: V(360, 520), size: V(170, 160), times: [k4.gist.w[1], k4.gist.w[2]], col: C.paper }); KT(t, { lines: ['The vibe.'], x: L, y: V(540, 680), size: V(170, 160), times: [k4.vibe.w[1], k4.vibe.w[2]], col: C.paper }); });
      KR(t, { lines: V(['*One or two*', '*things.*'], ['*One or two things.*']), x: L, y: V(760, 880), size: V(120, 96), times: TM(k4.one, 4).slice(0, 4) });
      const p = ease(t, k4.gist.w[1], 0.5); withA(p, () => pageBlur(t, px, py + 40 * (1 - p), pw, ph, [[2, k4.one.w[2]], [6, k4.one.w[4]]]));
    });
    beat(t, k4.pin.t - 0.1, 1e9, () => {
      KR(t, { lines: V(["You can't", '*pinpoint* it.'], ["You can't", '*pinpoint* it.']), x: L, y: V(400, 560), size: V(170, 140), times: [k4.pin.w[2], k4.pin.w[2], k4.pin.w[4], k4.pin.w[4] + 0.15] });
      pageBlur(t, px, py, pw, ph, []);
      // the crosshair hunts: it moves on, never locks
      const stops = [[0.3, 0.3], [0.7, 0.55], [0.4, 0.75], [0.62, 0.22], [0.25, 0.6], [0.72, 0.8]]; const t0 = k4.pin.w[4] - 0.2, step = 1.25;
      const k = clamp(Math.floor((t - t0) / step), 0, stops.length - 1); const u = E.inOutCubic(clamp((t - t0 - k * step) / 0.55));
      const a = stops[Math.max(0, k - 1)], b = stops[k]; const cx = px + pw * lerp(a[0], b[0], k ? u : 1), cy = py + ph * lerp(a[1], b[1], k ? u : 1);
      const fl = Math.sin(Math.PI * clamp((t - t0 - k * step - 0.5) / 0.7)); if (k || t > t0 + 0.5) withA(0.5 * fl, () => rect(px + 30, cy - 18, pw - 60, 36, C.blue));
      withA(prog(t, t0, 0.3), () => crosshair(cx, cy, V(100, 92), C.blueT, 0));
    });
  }, { id: 'gist' });
  sPen(k4.one.w[2], -5); sPen(k4.one.w[4], -5); sPop(k4.pin.w[4], -2); for (let i = 1; i < 6; i++) sWh(k4.pin.w[4] - 0.2 + i * 1.25 + 0.25, -14);
  // the feeling about the book, not the book itself
  addS(S(k4.feel), 'paper', '// 03 — the problem', (t) => {
    KT(t, { lines: V(["You're left with ~the feeling~ about", 'the book, not the book itself.'], ["You're left with", '~the feeling~ about', 'the book, not the', 'book itself.']), font: 'body', x: L, y: V(250, 520), size: V(76, 76), lh: 1.15, times: [...pick(k4.feel, [0, 2, 3, 4, 5, 6, 7, 8]), ...pick(k4.itself, [0, 3, 4, 5])] });
    const cw = V(780, 440), chh = V(560, 600), y0 = V(420, 820), xa = V(L, L), xb = V(W - L - 780, W - L - 440);
    const a = landAt(t, k4.feel.w[5], xa, y0, { dy: 60 }), b = landAt(t, k4.itself.w[3], xb, y0, { dy: 60 });
    if (a.p > 0) withA(a.a, () => grp('the feeling', a.x, a.y, cw, chh, () => { rect(a.x, a.y, cw, chh, C.ink); withA(0.42, () => { _txt('THE GIST.', a.x + 44, a.y + chh * 0.42, F.disp(V(96, 64)), C.paper, 'left', 'alphabetic', -2); _txt('THE VIBE.', a.x + 44, a.y + chh * 0.42 + V(96, 64), F.disp(V(96, 64)), C.paper, 'left', 'alphabetic', -2); }); }));
    if (b.p > 0) withA(b.a, () => grp('the book itself', b.x, b.y, cw, chh, () => { pageCard(b.x, b.y, cw, chh, { label: 'The book itself' });
      const tf = F.body(V(22, 18), 600); for (let r = 0; r < 8; r++) { const ry = b.y + 140 + r * (chh - 200) / 8; mono(String(r + 1).padStart(2, '0'), b.x + 40, ry + 16, 18, C.blue, 'left', { raw: true, fixed: true }); fitTxt(BARATTA[r], b.x + 90, ry + 16, tf, C.ink, cw - 130); }
      const sp = prog(t, k4.itself.w[5] + 0.2, 0.4); if (sp > 0) withA(0.78 * sp, () => rect(b.x, b.y, cw, chh, C.paper)); }));
    wipe(t, S(k4.fix, 0.9), C.punch);
  }, { id: 'feeling' });
  sPen(k4.feel.w[5] + 0.3, -3); sCard(k4.feel.w[5]); sCard(k4.itself.w[3]); sWh(k4.itself.w[5] + 0.3, -8); sRise(k4.fix.w[3], -4); sWh(k4.fix.t - 1.0, -3);
  addS(S(k4.fix, 0.9), 'blue', '// 03 — the problem', (t) => {
    KR(t, { lines: V(['This method', 'fixes that.'], ['This', 'method', 'fixes', 'that.']), x: CX, align: 'center', y: V(500, 700), size: V(290, 215), times: [k4.fix.t - 0.8, k4.fix.t - 0.62, k4.fix.w[3] - 0.05, k4.fix.w[3] + 0.12] });
  }, { id: 'fixes-that', push: 0.03 });
  sImp(k4.fix.w[3], -2);

  /* ---------- 5 · the method ---------- */
  const k5 = PS({ m: 'the method is pretty much straightforward', before: 'before you read the book', struct: 'you read the structure of the book first', newb: 'you get a new book', toc: 'you go to the table of content first', flip: "you don't just flip and start reading", toc2: 'you go to the table of content', chap: 'you look at the chapters', sub: 'the subheadings', laid: 'how the whole thing is laid out', page: 'before you even read a single page', done: 'if after you have done that', then: 'then you can then actually read the book', idea: "that's the whole idea", simple: "it's so simple" });
  addS(k5.m.t + 0.3, 'paper', '// 04 — the method', (t) => {
    eyebrow(t, k5.m.t, 'The method', CX, V(380, 700), { align: 'center' });
    sent(t, { lines: V(['Pretty much ~straightforward.~'], ['Pretty much', '~straightforward.~']), y: V(580, 880), size: V(110, 116), times: pick(k5.m, [3, 4, 5]) });
    wipe(t, S(k5.before), C.punch);
  }, { id: 'method' });
  sPen(k5.m.w[5] + 0.5, -3); sRise(k5.struct.w[3], -3); sWh(k5.before.t - 0.3, -4);
  addS(S(k5.before), 'blue', '// 04 — the method', (t) => {
    KR(t, { lines: ['Before you read the book,'], font: 'body', x: L, y: V(250, 560), size: V(60, 56), times: TM(k5.before, 5) });
    KR(t, { lines: ['Read the'], x: L - 6, y: V(470, 780), size: V(250, 175), times: pick(k5.struct, [1, 2]) });
    KR(t, { lines: ['structure'], x: L - 6, y: V(700, 950), size: V(250, 175), times: [k5.struct.w[3]], col: C.orange });
    KR(t, { lines: ['first.'], x: L - 6, y: V(930, 1120), size: V(250, 175), times: [k5.struct.w[7]] });
  }, { id: 'structure-first', grid: true, push: 0.03 });
  sImp(k5.struct.w[3], 0); sPop(k5.struct.w[7], -3);
  // a new book -> it opens on its contents -> chapters, sub-headings, layout labelled; pages read stays at 0
  addS(S(k5.newb), 'paper', '// 04 — the method', (t) => {
    const cx0 = V(L + 40, L), cy0 = V(260, 420), bw = V(380, 330), bh = V(520, 450);
    const open = prog(t, k5.toc.w[4] - 0.1, 0.45);   // the book's cover swings open (scaleX 1 -> 0)
    const bp = sn(t, k5.newb.w[3], 0.45);
    if (bp > 0 && open < 1) withA(clamp(bp * 2), () => withT(cx0, cy0 + 50 * (1 - bp), 1, 0, () => { const e = E.inOutCubic(open); ctx.transform(Math.max(0.02, Math.cos(e * Math.PI / 2)), -0.18 * Math.sin(e * Math.PI), 0, 1, 0, 0); imgCard(IMG.bookC, 0, 0, bw, { pad: 10, key: 'new book' }); }));
    // flip-and-start-reading: pages riffle where the book was, then fall away
    const rf = prog(t, k5.flip.w[0] - 0.2, 1.1), gone = ease(t, k5.flip.w[3] + 0.3, 0.5, E.inCubic);
    if (rf > 0 && gone < 1) withA(1 - gone, () => { for (let k = 0; k < 6; k++) { const q = E.outCubic(clamp(rf * 1.6 - k * 0.12)); withT(cx0 + V(120, 150), cy0 + bh + 60 * gone, 1, -0.32 * q * (1 - k / 7), () => { rect(0, -bh, bw * 0.92, bh, C.card); strokeR(0, -bh, bw * 0.92, bh, C.ink, 3); }); } });
    // flip-and-start-reading: pages riffle, then struck
    const fl = prog(t, k5.flip.t, 0.3); const fx = V(L + 40, L), fy = V(930, 960);
    if (fl > 0) withA(fl, () => { txt('Flip and start reading', fx, fy, F.body(V(44, 46), 600), g.fg, 'left', 'alphabetic', 44 * LS.body); strikeBar(fx, fy - 16, tw('Flip and start reading', F.body(V(44, 46), 600), 44 * LS.body), prog(t, k5.flip.w[3] + 0.1, 0.35), C.blue, 8); });
    const cp = sn(t, k5.toc.w[4] - 0.05, 0.5);
    const x = V(640, L), y = V(230, 1010), w = V(780, 600), h = V(640, 440), rs = V(58, 33), kw = V(1, 0.7);
    if (cp > 0) withA(clamp(cp * 2), () => {
      const sx = lerp(0.3, 1, E.outExpo(cp));   // the contents grows out of the opened book
      grp('contents card', x, y, w, h, () => withT(x, y, 1, 0, () => { ctx.scale(sx, 1);
        rect(0, 0, w, h, C.card); strokeR(0, 0, w, h, C.ink, 4);
        mono('Contents', 50, 72, 26, C.mid, 'left', { ls: 0.24, fixed: true }); hline(50, 98, w - 100, 1, C.line, 2);
        const chOn = prog(t, k5.chap.w[4], 0.3), sbOn = prog(t, k5.sub.w[1], 0.3); void kw;
        CONV_TOC.forEach(([kind, txt_], j) => {
          const ry = 150 + j * rs * 1.25; const rp = prog(t, k5.toc.w[4] + 0.15 + j * 0.06, 0.3);
          withA(rp, () => {
            if (kind === 'ch') { const f = F.body(V(30, 24), 700); if (chOn > 0) marker(44, ry - 26, Math.min(tw(txt_, f), w - 110) + 16, 38, chOn, MC('rgba(27,63,216,0.2)')); fitTxt(txt_, 50, ry, f, C.ink, w - 100); }
            else { const f = F.body(V(24, 20), 500); if (sbOn > 0) marker(74, ry - 21, Math.min(tw(txt_, f), w - 140) + 16, 30, sbOn, MC('rgba(27,63,216,0.14)')); fitTxt(txt_, 80, ry, f, sbOn > 0 ? C.ink : C.mid, w - 130); }
          });
        });
      }));
      const fp = Math.sin(Math.PI * clamp((t - k5.toc2.w[4]) / 0.8)); if (fp > 0) withA(fp, () => strokeR(x - 8, y - 8, w + 16, h + 16, C.blue, 8));
      const dn = prog(t, k5.done.w[4], 0.4); if (dn > 0) { withA(clamp(dn * 3), () => withT(x + w - 30, y + 30, E.outBack(dn, 2), 0, () => checkbox(-50, -50, 100, dn, C.blue))); }
      const chOn = prog(t, k5.chap.w[4], 0.3), sbOn = prog(t, k5.sub.w[1], 0.3), lay = prog(t, k5.laid.w[5], 0.5); const gx = V(40, 24);
      if (lay > 0) { const lx = x + w + gx, y0 = y + V(290, 240), y1 = y + h - 40; pline(lx, y0, lx, lerp(y0, y1, E.outCubic(lay)), 1, C.blue, 4); }
    });
    // pages read: a big zero that never moves
    const pg = prog(t, k5.page.t, 0.3); if (pg > 0) withA(pg, () => { const zx = V(L + 40, 470), zy = V(760, 820); mono('Pages read', zx, zy - V(170, 160), 26, g.mid, 'left', { ls: 0.2 }); counter(t, k5.page.t, 0.6, 0, 0, zx - 8, zy, F.disp(V(200, 190)), t >= k5.page.w[5] ? C.blue : C.ink, 'left', (n) => String(n).padStart(3, '0'));
      handLine(zx, zy + 26, V(330, 320), E.outCubic(prog(t, k5.page.w[5] + 0.1, 0.5)), C.blue, 8, 3); const ns = PORTRAIT ? 0 : prog(t, k5.page.w[6] + 0.6, 0.3); if (ns > 0) withA(clamp(ns * 3), () => withT(zx, zy + 54, 1.3 - 0.3 * E.outCubic(ns), 0, () => { rect(0, 0, V(330, 320), 56, C.ink); _txt('NOT A SINGLE ONE', 18, 37, F.mono(22, 500), C.card, 'left', 'alphabetic', 3); })); });
  }, { id: 'contents' });
  sBook(k5.newb.w[3] + 0.15, -3); sPage(k5.toc.w[4] - 0.05, 0); sCard(k5.toc.w[4] + 0.1, -3); sPage(k5.flip.t + 0.1, -4); sPen(k5.flip.w[3] + 0.1, -1); sPen(k5.chap.w[4], -5); sTick(k5.sub.w[1], -3); sPen(k5.laid.w[5], -4); sPop(k5.page.t + 0.05, -1); sPage(k5.flip.w[0] - 0.1, -2); sPage(k5.flip.w[0] + 0.3, -5); sPop(k5.toc2.w[4], -5); sClick(k5.done.w[4] + 0.1, 0); sPen(k5.page.w[5] + 0.1, -4); sPop(k5.page.w[6] + 0.65, -2);
  addS(S(k5.then, 0.3), 'ink', '// 04 — the method', (t) => {
    IDX(t, [{ n: '01', s: 'Read the structure', tin: k5.then.t - 0.2 }, { n: '02', s: 'Then read the book', tin: k5.then.w[5] }], { x: L, y: V(430, 760), rowH: V(170, 200), size: V(110, 68), numW: V(125, 90), ruleDy: V(50, 46) });
    const ck = prog(t, k5.then.w[2], 0.35); if (ck > 0) checkbox(V(W - L - 90, W - L - 56), V(430 - 82, 760 - 56), V(80, 56), ck, C.blueT);
    KT(t, { lines: V(["That's the whole idea. ~So simple.~"], ["That's the whole idea.", '~So simple.~']), font: 'body', weight: 600, x: L, y: V(850, 1200), size: V(60, 72), col: g.fg, times: [...k5.idea.w, k5.simple.w[2], k5.simple.w[2] + 0.12] });
  }, { id: 'two-steps' });
  sPop(k5.then.t - 0.15, -3); sClick(k5.then.w[2], -2); sPop(k5.then.w[5], -3); sPen(k5.simple.w[2] + 0.45, -3);

  /* ---------- 6 · an old idea ---------- */
  const k6 = PS({ seen: "i've seen it several times", pin: 'pinterest', yt: 'and then on youtube', old: "and it's an old idea", oldest: 'the oldest version of this method', book: 'how to read a book', adler: 'by mortimer adler', y40: 'from 1940', note: "i'm noting this down", get: 'i actually want to get that book and read it' });
  addS(S(k6.seen), 'ink', '// 05 — an old idea', (t) => {
    withA(prog(t, k6.seen.t, 0.3), () => mono("I've seen it several times", L, V(250, 500), 28, g.mid, 'left', { ls: 0.24 }));
    const a = sn(t, k6.seen.w[2], 0.45), b = sn(t, k6.yt.w[3] - 0.1, 0.45);
    // a pin board (generic): masonry tiles in her palette, one pin is a contents page
    if (a > 0) withA(clamp(a * 2), () => browser(L, V(330, 560) + 50 * (1 - a), V(800, 920), V(590, 420), { t, url: 'pinterest.com', typeT0: k6.pin.t - 0.7, cps: 24, key: 'pins window', body: (x, y, w, h) => {
      const cw = V(170, 200), cols = 4; const hs = [[150, 110, 190], [120, 200, 90], [180, 100, 160], [110, 170, 140]];
      for (let c = 0; c < cols; c++) { let yy = y + 26; hs[c].forEach((hh, r) => { const hi = c === 1 && r === 1; const tp = prog(t, k6.pin.t - 0.1 + (c * 3 + r) * 0.04, 0.3);
        withA(tp, () => { fillRR(x + 26 + c * (cw + 18), yy, cw, hh, 14, hi ? C.blue : [C.block, C.block2, C.block3][(c + r) % 3]); if (hi) for (let k = 0; k < 5; k++) rect(x + 46 + c * (cw + 18), yy + 30 + k * 30, (cw - 40) * (k % 2 ? 0.6 : 0.85), 10, C.onBlue); });
        yy += hh + 16; }); }
    } }));
    // a video page (generic): player, progress, title bars
    if (b > 0) withA(clamp(b * 2), () => browser(V(1010, L), V(330, 1030) + 50 * (1 - b), V(800, 920), V(590, 400), { t, url: 'youtube.com', typeT0: k6.yt.w[3], cps: 24, key: 'video window', body: (x, y, w, h) => {
      rect(x + 30, y + 26, w - 60, V(330, 230), C.ink); const my = y + 26 + V(165, 115); ctx.beginPath(); ctx.moveTo(x + w / 2 - 26, my - 32); ctx.lineTo(x + w / 2 + 34, my); ctx.lineTo(x + w / 2 - 26, my + 32); ctx.closePath(); ctx.fillStyle = C.card; ctx.fill();
      rect(x + 30, y + 26 + V(330, 230) - 8, (w - 60) * 0.35, 8, C.blue);
      circle(x + 58, y + V(400, 300), 26, C.block2); lbar(x + 100, y + V(388, 288), 420); lbar(x + 100, y + V(414, 314), 260);
    } }));
  }, { id: 'seen-it' });
  sCard(k6.seen.w[2]); sType(k6.pin.t, 13, 24); [0, 1, 2].forEach(i => sTick(k6.pin.t + 0.35 + i * 0.16, -8)); sCard(k6.yt.w[3] - 0.1); sType(k6.yt.w[3], 11, 24);
  // the timeline: from now back to 1940
  const TL = () => ({ x: L, y: V(820, 1230), w: W - 2 * L });
  addS(S(k6.old), 'paper', '// 05 — an old idea', (t) => {
    KR(t, { lines: V(["It's an *old* idea."], ["It's an", '*old*', 'idea.']), x: L, y: V(440, 600), size: V(210, 200), times: pick(k6.old, [1, 2, 3, 4]) });
    const tl = TL(); const back = E.inOutCubic(prog(t, k6.oldest.w[2], 1.6));
    timeline(t, tl.x, tl.y, tl.w, { tin: k6.old.w[4] + 0.1, marks: [{ u: 0.04, s: '1940', align: 'left', tin: k6.oldest.w[3], raw: true }, { u: 0.96, s: 'Now', align: 'right', tin: k6.old.w[4] + 0.3 }], at: (tt) => (tt < k6.old.w[4] + 0.4 ? null : lerp(0.96, 0.04, back)) });
  }, { id: 'old-idea' });
  sPop(k6.old.w[3], -3); sPen(k6.old.w[4] + 0.1, -5); sWh(k6.oldest.w[2] + 0.8, -5); sPop(k6.oldest.w[3], -4);
  addS(S(k6.book, 0.25), 'blue', '// 05 — an old idea', (t) => {
    KR(t, { lines: V(['How to Read a Book'], ['How to Read', 'a Book']), upper: false, x: L, y: V(300, 560), size: V(130, 120), times: k6.book.w });
    withA(prog(t, k6.adler.w[1], 0.3), () => mono('Mortimer J. Adler', L + 8, V(390, 760), 30, g.mid, 'left', { ls: 0.24 }));
    // the year rolls back from now to 1940 and lands in safety orange, bleeding off the frame (her 404 slide)
    const y0 = k6.y40.w[1] - 0.75; const p = prog(t, y0, 0.75); if (p > 0) {
      const v = Math.round(lerp(2026, 1940, E.outCubic(p))); const s = V(700, 520);
      withA(clamp(p * 3), () => _txt(String(v), CX, V(1200, 1290), F.disp(s), C.orange, 'center', 'alphabetic', s * LS.disp));
    }
    timeline(t, L, V(500, 900), V(1250, W - 2 * L), { tin: S(k6.book, 0.9) - 1, size: 22, marks: [{ u: 0.03, s: '1940', align: 'left', col: C.orange, raw: true, tin: S(k6.book, 0.9) - 1 }, { u: 0.97, s: 'Now', align: 'right', tin: S(k6.book, 0.9) - 1 }], at: () => 0.03 });
    if (!PORTRAIT) { const bp = landAt(t, k6.adler.w[1] + 0.2, 1480, 130, { dy: -60, d: 0.5 }); if (bp.p > 0) withA(bp.a, () => { bookCard(bp.x, bp.y, 320, 420, { title: ['How to', 'read a', 'book'], author: 'M. J. Adler', ts: 54, band: C.ink, key: 'adler book' }); mono('Illustration', bp.x, bp.y + 456, 18, g.mid, 'left', { ls: 0.18 }); }); }
  }, { id: 'adler-1940', grid: true, push: 0.02 });
  sCard(k6.adler.w[1] + 0.2, -2); sRise(k6.y40.w[1], -6); for (let i = 0; i < 6; i++) sTick(k6.y40.w[1] - 0.7 + i * 0.1, -10); sImp(k6.y40.w[1], -1);
  addS(S(k6.note, 0.2), 'paper', '// 05 — an old idea', (t) => {
    KT(t, { lines: ["I'm noting", 'this ~down.~'], font: 'body', x: L, y: V(470, 560), size: V(96, 100), times: [...k6.note.w, k6.note.w[3], k6.note.w[3]] });
    const addT = k6.note.w[3] + 0.15;
    const cp = sn(t, k6.note.t, 0.45); if (cp <= 0) return;
    const X = V(980, L), Y = V(260, 760), x = X, y = Y + 50 * (1 - cp), w = V(830, 920), h = V(560, 600);
    withA(clamp(cp * 2), () => grp('to-read list', x, y, w, h, () => {
      rect(x, y, w, h, C.card); strokeR(x, y, w, h, C.ink, 4);
      mono('To read', x + 50, y + 80, 26, C.mid, 'left', { ls: 0.24 }); hline(x + 50, y + 108, w - 100, 1, C.line, 2);
      const ry = y + 170;
      if (t >= addT) { checkbox(x + 50, ry, 40, prog(t, k6.get.w[8], 0.3)); typeText(t, addT + 0.1, 'How to Read a Book — Adler', x + 120, ry + 31, F.body(34, 600), C.ink, { cps: 26, caretTo: addT + 1.4 }); }
      rect(x + 50, y + h - 110, 170, 58, C.ink); txt('+ ADD', x + 135, y + h - 72, F.mono(22, 500), C.card, 'center', 'alphabetic', 22 * 0.16);
    }));
    cursorAt(t, [[k6.note.t + 0.1, V(1700, 900), V(960, 1480)], [addT - 0.08, X + 120, Y + h - 80], [k6.get.w[7], X + 120, Y + h - 80], [k6.get.w[8] - 0.05, X + 100, Y + 366], [k6.get.w[8] + 0.8, X + 320, Y + h + 40]], [addT - 0.05, k6.get.w[8]]);
  }, { id: 'to-read' });
  sCard(k6.note.t); sClick(k6.note.w[3] + 0.1); sType(k6.note.w[3] + 0.25, 26, 26); sClick(k6.get.w[8]); sPen(k6.note.w[3] + 0.45, -4);

  /* ---------- 7 · inspectional reading ---------- */
  const k7 = PS({ calls: 'he calls it', insp: 'inspectional reading', ch1: 'before you read chapter one', cp: 'the contents page', ct: 'the chapter titles', sh: 'the subheadings', skim: 'you skim a little', arg: 'laid out their argument' });
  // a contents page with chapters and sub-headings (illustration), used by the next two scenes
  const tocCard = (t, x, y, w, h, o = {}) => {
    rect(x, y, w, h, C.card); strokeR(x, y, w, h, o.edge || C.ink, 4);
    mono('Contents', x + 40, y + 62, 22, C.mid, 'left', { ls: 0.22, fixed: true }); hline(x + 40, y + 84, w - 80, 1, C.line, 2);
    const rh = (h - 130) / CONV_TOC.length; const fs = Math.max(16, Math.min(28, rh * 0.5));
    CONV_TOC.forEach(([k, s_], i) => { const ry = y + 130 + i * rh; const on = k === 'ch' ? (o.chOn || 0) : (o.subOn || 0);
      if (k === 'ch') fitTxt(s_, x + 40, ry + 6, F.body(fs, 700), on > 0.5 ? C.blue : C.ink, w - 80);
      else fitTxt(s_, x + 70, ry + 6, F.body(fs * 0.85, 500), on > 0.5 ? C.blue : C.mid, w - 110); });
    if (o.scan != null && o.scan > 0 && o.scan < 1) { const sy = y + 96 + (h - 120) * o.scan; rect(x - 16, sy, w + 32, 4, C.blue); withA(0.14, () => rect(x, y + 96, w, sy - y - 96, C.blue)); }
  };
  addS(S(k7.calls), 'paper', '// 06 — inspectional reading', (t) => {
    KR(t, { lines: ['Inspectional'], x: L - 6, y: V(600, 720), size: V(190, 160), times: [k7.insp.t] });
    KR(t, { lines: ['~reading.~'], font: 'serif', x: L, y: V(840, 930), size: V(220, 210), times: [k7.insp.w[1]] });
    const p = landAt(t, k7.calls.t, V(1430, 220), V(240, 990), { dy: 60 }); if (p.p > 0) withA(p.a, () => tocCard(t, p.x, p.y, V(380, 640), V(600, 440), { scan: prog(t, k7.insp.t + 0.1, 2.6) }));
  }, { id: 'inspect' });
  sCard(k7.calls.t); sImp(k7.insp.t, -6); sPen(k7.insp.w[1] + 0.55, -3); sWh(k7.insp.t + 0.3, -12);
  addS(S(k7.ch1), 'ink', '// 06 — inspectional reading', (t) => {
    KR(t, { lines: V(['Before chapter one:'], ['Before chapter one:']), x: L - 4, y: V(240, 480), size: V(90, 84), times: TM(k7.ch1, 3) });
    IDX(t, [{ n: '01', s: 'The contents page', tin: k7.cp.w[1] }, { n: '02', s: 'The chapter titles', tin: k7.ct.w[1] }, { n: '03', s: 'The sub-headings', tin: k7.sh.w[1] }, { n: '04', s: 'A little skim', tin: k7.skim.w[1] }], { x: V(820, L), y: V(420, 1040), w: V(990, W - 2 * L), rowH: V(128, 100), size: V(72, 66), numW: V(110, 90), numSize: V(32, 28) });
    KT(t, { lines: V(['to see how the author', 'laid out the ~argument.~'], ['to see how the author laid', 'out the ~argument.~']), font: 'body', weight: 600, x: V(820, L), y: V(950, 1400), size: V(44, 44), col: g.mid, times: TM(k7.arg, 9) });
    // the book, inspected: each step lights its part
    const bx = V(L, L), by = V(300, 560), bw = V(620, W - 2 * L), bh = V(640, 400);
    const sk = prog(t, k7.skim.w[1], 1.2); // a little skim: pages fan out behind the contents
    for (let k = 3; k >= 1; k--) { const o = E.outBack(clamp(sk * 1.4 - (3 - k) * 0.15), 1.4) * Math.sin(Math.PI * clamp(sk)); if (o > 0.01) withT(bx + bw / 2, by + bh / 2, 1, 0.05 * k * o, () => pageCard(-bw / 2 + 24 * k * o, -bh / 2 + 6 * k * o, bw, bh, { borderCol: C.inkMid, bw: 3 })); }
    const ap = ease(t, k7.ch1.t, 0.5); if (ap > 0) withA(clamp(ap * 2), () => tocCard(t, bx, by + 40 * (1 - ap), bw, bh, { edge: t >= k7.cp.w[1] && t < k7.ct.w[1] ? C.blueT : C.ink, chOn: t >= k7.ct.w[1] ? 1 : 0, subOn: t >= k7.sh.w[1] ? 1 : 0 }));
  }, { id: 'before-ch1' });
  sPop(k7.cp.w[1], -2); sCard(k7.ch1.w[1], -4); sPen(k7.ct.w[1], -4); sPen(k7.sh.w[1], -4); sfx('page', k7.skim.w[1] + 0.1, 0); sPop(k7.skim.w[2], -5);

  /* ---------- 8 · priming ---------- */
  const k8 = PS({ newer: 'the newer version of it', yt: 'you can see on youtube', ppl: 'people talk about it', js: "justin sung's youtube page", sub: 'i subscribe to his youtube channel', prim: 'where he calls this priming', same: 'the same idea', mins: 'you spend a few minutes with the heading', conn: 'how the parts connect', bsr: 'before you start reading', tt: 'the version i saw on tiktok', mem: 'i did use to memorize it', thr: 'read through the headings and the subheadings', memw: 'but memorizing it actually makes it work better for me', stick: 'it makes it stick for me', skim: 'as opposed to just skimming through', map: 'it makes the mapping stronger in my mind' });
  addS(S(k8.newer), 'ink', '// 07 — priming', (t) => {
    KR(t, { lines: V(['The newer version'], ['The newer', 'version']), x: L, y: V(230, 500), size: V(96, 110), times: k8.newer.w.slice(0, 3) });
    // the timeline again: the marker comes back to now
    if (!PORTRAIT) timeline(t, 1120, 200, 690, { tin: k8.newer.t, size: 22, marks: [{ u: 0.03, s: '1940', align: 'left', raw: true, tin: k8.newer.t }, { u: 0.97, s: 'Now', align: 'right', tin: k8.newer.t }], at: (tt) => lerp(0.03, 0.97, E.inOutCubic(prog(tt, k8.newer.w[1], 1.0))) });
    else timeline(t, L, 1350, W - 2 * L, { tin: k8.newer.t, size: 24, marks: [{ u: 0.03, s: '1940', align: 'left', raw: true, tin: k8.newer.t }, { u: 0.97, s: 'Now', align: 'right', tin: k8.newer.t }], at: (tt) => lerp(0.03, 0.97, E.inOutCubic(prog(tt, k8.newer.w[1], 1.0))) });
    for (let i = 0; i < 4; i++) { const ti = i < 2 ? k8.yt.w[4] + i * 0.18 : k8.ppl.w[0] + (i - 2) * 0.22; const q = sn(t, ti, 0.4); if (q <= 0 || t > k8.js.t + 0.2) continue;
      const vx = V(1180 + i * 160, L + 30 + i * 240), vy = V(300, 1180); withA(clamp(q * 2) * (1 - prog(t, k8.js.t - 0.2, 0.3)), () => withT(vx + 70, vy + 44 + 30 * (1 - q), 0.8 + 0.2 * q, 0, () => { rect(-70, -44, 140, 88, i % 2 ? C.panel : C.card); ctx.beginPath(); ctx.moveTo(-12, -18); ctx.lineTo(18, 0); ctx.lineTo(-12, 18); ctx.closePath(); ctx.fillStyle = C.ink; ctx.fill(); })); }
    const p = sn(t, k8.js.t - 0.2, 0.45); if (p <= 0) return;
    const bx = V(460, L), by = V(340, 720) + 50 * (1 - p), bw = V(1000, 920), bh = V(560, 540);
    const subd = t >= k8.sub.w[1] + 0.05;
    withA(clamp(p * 2), () => browser(bx, by, bw, bh, { t, url: 'youtube.com', typeT0: k8.js.t - 0.1, cps: 28, key: 'channel window', body: (x, y, w, h) => {
      rect(x, y, w, 120, C.block);
      circle(x + 150, y + 210, 90, C.ink); _txt('JS', x + 150, y + 214, F.mono(54, 500), C.card, 'center', 'middle', 4);
      txt('Justin Sung', x + 280, y + 225, F.body(64, 700), C.ink, 'left', 'alphabetic', -1); 
      const bxx = x + 280, byy = y + 300; rect(bxx, byy, 250, 66, subd ? C.block : C.ink);
      _txt(subd ? 'SUBSCRIBED ✓' : 'SUBSCRIBE', bxx + 125, byy + 42, F.mono(24, 500), subd ? C.ink : C.card, 'center', 'alphabetic', 24 * 0.12);
      for (let i = 0; i < 4; i++) { const tp = prog(t, k8.sub.e + 0.2 + i * 0.12, 0.35); withA(tp, () => rect(x + 34 + i * V(238, 218), y + h - 110 + 20 * (1 - E.outExpo(tp)), V(218, 198), 90, i === 1 ? C.ink : C.block)); }
    } }));
    cursorAt(t, [[k8.sub.t - 0.8, V(1650, 900), V(980, 1480)], [k8.sub.w[1] - 0.02, bx + 280 + 150, by + 64 + 4 + 300 + 40], [k8.sub.e + 1.5, bx + 280 + 150, by + 64 + 4 + 300 + 40]], [k8.sub.w[1]]);
  }, { id: 'justin-sung' });
  sWh(k8.newer.w[1] + 0.5, -8); [0, 0.18].forEach(d => sPop(k8.yt.w[4] + d, -6)); [0, 0.22].forEach(d => sPop(k8.ppl.w[0] + d, -7)); sCard(k8.js.t - 0.2); sType(k8.js.t - 0.1, 11, 28); sClick(k8.sub.w[1]); [0, 1, 2, 3].forEach(i => sTick(k8.sub.e + 0.25 + i * 0.12, -8));
  // priming: a few minutes with the headings; the parts connect into a map
  const NODES = V([[560, 690, 'Part 1'], [960, 800, 'Part 2'], [1360, 690, 'Part 3'], [760, 950, ''], [1160, 950, ''], [960, 610, '']], [[260, 1040, 'Part 1'], [540, 1210, 'Part 2'], [820, 1040, 'Part 3'], [300, 1380, ''], [780, 1380, ''], [540, 900, '']]);
  const LINKS = [[0, 1], [1, 2], [0, 5], [5, 2], [1, 3], [1, 4], [3, 4]];
  const headMap = (t, tin, tl, lw = 4, o = {}) => {
    LINKS.forEach(([a, b], i) => { const p = ease(t, tl + i * 0.12, 0.5, E.outCubic); if (p <= 0) return; const A = NODES[a], B = NODES[b]; pline(A[0], A[1], B[0], B[1], p, o.lcol || C.blue, typeof lw === 'function' ? lw(i) : lw); });
    NODES.forEach(([x, y, s], i) => { const p = sn(t, tin + i * 0.08, 0.35); if (p <= 0) return; const big = !!s; const w = big ? 220 : 120, h = big ? 80 : 56;
      const fil = o.fillAt != null && prog(t, o.fillAt + i * 0.12, 0.2) > 0.5 && big;
      withA(clamp(p * 2), () => withT(x, y, 0.7 + 0.3 * E.outBack(p, 1.6), 0, () => { rect(-w / 2, -h / 2, w, h, fil ? C.blue : i === 1 ? C.ink : C.card); strokeR(-w / 2, -h / 2, w, h, C.ink, 3); if (s) mono(s, 0, 9, 24, fil || i === 1 ? C.card : C.ink, 'center', { ls: 0.16, fixed: true }); })); });
  };
  addS(S(k8.prim, 0.4), 'paper', '// 07 — priming', (t) => {
    beat(t, 0, k8.prim.w[2] - 0.05, () => { const p = landAt(t, S(k8.prim, 0.4), CX - V(300, 260), V(380, 640), { dy: 40, d: 0.4 }); if (p.p > 0) withA(p.a, () => { const w = V(600, 520), h = V(340, 300); rect(p.x, p.y, w, h, C.ink); ctx.beginPath(); ctx.moveTo(p.x + w / 2 - 30, p.y + h / 2 - 38); ctx.lineTo(p.x + w / 2 + 42, p.y + h / 2); ctx.lineTo(p.x + w / 2 - 30, p.y + h / 2 + 38); ctx.closePath(); ctx.fillStyle = C.card; ctx.fill(); rect(p.x + 24, p.y + h - 30, (w - 48) * clamp((t - p.p) * 0 + prog(t, S(k8.prim, 0.4), 3)), 5, C.blueT); }); });
    beat(t, 0, k8.mins.t - 0.12, () => {
      withA(prog(t, k8.prim.w[2], 0.25), () => mono('He calls this', CX, V(360, 720), 30, g.mid, 'center', { ls: 0.24 }));
      KR(t, { lines: ['*Priming.*'], x: CX, align: 'center', y: V(640, 960), size: V(300, 240), times: [k8.prim.w[4]] });
      withA(prog(t, k8.same.t, 0.25), () => mono('Same idea', CX, V(800, 1110), 30, g.mid, 'center', { ls: 0.24 }));
    });
    beat(t, k8.mins.t - 0.12, 1e9, () => {
      sent(t, { lines: V(['Spend a few minutes with the headings.', 'Ask ~how the parts connect.~'], ['Spend a few minutes', 'with the headings.', 'Ask ~how the parts~', '~connect.~']), y: V(300, 520), size: V(70, 72), times: [...TM(k8.mins, 7), k8.conn.t - 0.25, ...k8.conn.w] });
      // a few minutes: a small dial sweeps a short wedge
      const cp = prog(t, k8.mins.w[3], 1.2); if (cp > 0) { const cx = V(1700, 930), cy = V(470, 860), r = V(60, 54); withA(clamp(cp * 3), () => { ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.strokeStyle = C.ink; ctx.lineWidth = 4; ctx.stroke(); ctx.beginPath(); ctx.moveTo(cx, cy); ctx.arc(cx, cy, r - 10, -Math.PI / 2, -Math.PI / 2 + 0.9 * E.outCubic(cp)); ctx.closePath(); ctx.fillStyle = C.blue; ctx.fill(); }); }
      headMap(t, k8.mins.t, k8.conn.w[3], 6, { fillAt: k8.conn.w[3] + 0.2 });
      withA(prog(t, k8.bsr.t, 0.3), () => mono('Before you start reading', CX, V(1020, 1470 - 60), 26, C.blue, 'center', { ls: 0.2 }));
    });
  }, { id: 'priming' });
  sImp(k8.prim.w[4], -6); sWh(k8.mins.t - 0.1, -6); sTick(k8.mins.w[3], -4); [0, 1, 2].forEach(i => sPop(k8.mins.t + 0.05 + i * 0.16, -6)); sCard(S(k8.prim, 0.4), -4); sPen(k8.conn.w[3], -2); sPen(k8.conn.w[3] + 0.5, -5); [0, 0.12, 0.24].forEach(d => sPop(k8.conn.w[3] + 0.2 + d, -6)); sTick(k8.bsr.t, -4);
  addS(S(k8.tt), 'ink', '// 07 — priming', (t) => {
    KR(t, { lines: V(['The TikTok version:'], ['The TikTok', 'version:']), x: L, y: V(330, 470), size: V(90, 84), times: pick(k8.tt, [0, 5, 5]) });
    KR(t, { lines: V(['*Memorise*', '*it.*'], ['*Memorise it.*']), x: L - 4, y: V(580, 730), size: V(190, 140), times: [k8.mem.w[4], k8.mem.w[5]] });
    if (!PORTRAIT) withA(prog(t, k8.thr.t, 0.3), () => mono('Read the headings. Then the sub-headings.', L + 4, 920, 26, g.mid, 'left', { ls: 0.2 }));
    // a phone with a short-video card (generic), then the contents she memorised
    const pp = sn(t, k8.tt.t, 0.5); if (pp <= 0) return;
    const showList = t >= k8.thr.t - 0.1;
    const phone = (x, y, w, h) => phoneFrame(x, y, w, h, (sx, sy, sw, sh) => {
      if (!showList) { rect(sx, sy, sw, sh, C.punch); txt('MEMORISE', sx + 30, sy + sh * 0.42, F.disp(sw * 0.17), C.onPunch, 'left', 'alphabetic', -2, 'phone memorise'); txt('THE CONTENTS', sx + 30, sy + sh * 0.42 + sw * 0.17, F.disp(sw * 0.12), C.onPunch, 'left', 'alphabetic', -2, 'phone contents');
        for (let i = 0; i < 3; i++) circle(sx + sw - 44, sy + sh * 0.62 + i * 56, 22, 'rgba(241,244,255,0.85)'); rect(sx + 24, sy + sh - 40, sw - 48, 5, 'rgba(241,244,255,0.35)'); rect(sx + 24, sy + sh - 40, (sw - 48) * clamp((t - k8.tt.w[5]) / 6), 5, C.onPunch); mono('A short video I saw', sx + 30, sy + 90, 18, C.onPunch, 'left', { ls: 0.14, fixed: true }); }
      else { mono('Contents', sx + 36, sy + 110, 20, C.mid, 'left', { ls: 0.2, fixed: true });
        for (let i = 0; i < 8; i++) { const ry = sy + 160 + i * (sh - 220) / 8; const on = prog(t, k8.thr.t + i * 0.28, 0.2); mono(String(i + 1).padStart(2, '0'), sx + 36, ry + 16, 20, C.blue, 'left', { ls: 0.04, raw: true, fixed: true }); fitTxt(BARATTA[i], sx + 84, ry + 16, F.body(19, 600), on > 0 ? C.ink : C.stone, sw - 110); } }
    });
    withA(clamp(pp * 2), () => { const x = V(1300, 330), y = V(150, 830) + 80 * (1 - pp), w = V(400, 420), h = V(800, 600); grp('phone', x, y, w, h, () => phone(x, y, w, h)); });
  }, { id: 'tiktok' });
  sCard(k8.tt.t); sImp(k8.mem.w[4], -7); sWh(k8.thr.t - 0.1, -7); [0, 3, 6].forEach(i => sTick(k8.thr.t + i * 0.28, -6));
  addS(S(k8.memw), 'paper', '// 07 — priming', (t) => {
    beat(t, 0, k8.map.t - 0.1, () => {
      KR(t, { lines: V(['Memorising *sticks.*'], ['Memorising', '*sticks.*']), x: L, y: V(300, 560), size: V(120, 130), times: [k8.memw.w[1], k8.stick.w[3]] });
      const a = sn(t, k8.memw.w[4], 1.2), b = sn(t, k8.skim.w[4], 1.0);
      withA(prog(t, k8.memw.w[1], 0.3), () => meter(t, L, V(500, 900), W - 2 * L, V(100, 120), 0.92 * a, { cells: V(20, 12), label: 'Memorising the headings' })); withA(prog(t, k8.memw.w[1], 0.3), () => mono('Illustration', W - L, V(440, 840), 18, g.mid, 'right', { ls: 0.18 }));
      withA(prog(t, k8.skim.w[2], 0.3), () => meter(t, L, V(770, 1220), W - 2 * L, V(100, 120), 0.3 * b, { cells: V(20, 12), label: 'Just skimming', col: g.mid }));
    });
    beat(t, k8.map.t - 0.1, 1e9, () => {
      KR(t, { lines: V(['The mapping gets *stronger.*'], ['The mapping', 'gets *stronger.*']), x: L, y: V(260, 520), size: V(110, 116), times: pick(k8.map, [2, 3, 4, 4]) });
      const th = (i) => 3 + 11 * E.outCubic(prog(t, k8.map.w[4] + 0.1 + i * 0.07, 0.8));
      withT(0, V(0, 40), 1, 0, () => headMap(t, k8.map.t - 0.1, k8.map.t, th));
    });
  }, { id: 'memorising' });
  sTick(k8.memw.w[4], -2); sTick(k8.skim.w[3], -4); sWh(k8.map.t - 0.1, -6); sImp(k8.map.w[4], -6); sPen(k8.map.w[4] + 0.2, -5);

  /* ---------- 9 · why it works ---------- */
  const k9 = PS({ why: 'so why does this method work', some: "it's about having somewhere to put things in your mind", cold: 'when you start reading a book cold', every: 'every new idea from the book that arrives', nowhere: 'your brain has nowhere to file it', floats: 'so the idea sort of floats in your mind', one: 'you have one idea from chapter one', next: 'the next idea arrives', six: 'chapter six', pile: 'a pile of ideas floating around in your mind', attach: 'they have nothing to attach themselves to', but: 'but when you have started the structure first', shape: 'you already know the shape of the argument', shows: 'so when an idea shows up in the book', part: 'you know which part of the book it belongs to', doing: 'and what it is doing there', go: 'that idea has somewhere to go to', mech: "that's the whole mechanism", shelves: "you're building the shelves before you put something on them" });
  addS(S(k9.why), 'paper', '// 08 — why it works', (t) => {
    beat(t, 0, k9.some.w[3] - 0.12, () => sent(t, { lines: V(['So why does this ~work?~'], ['So why does', 'this ~work?~']), y: V(580, 860), size: V(120, 130), times: pick(k9.why, [0, 1, 2, 3, 5]) }));
    beat(t, k9.some.w[3] - 0.12, 1e9, () => {
      KR(t, { lines: V(['Somewhere', 'to *put things.*'], ['Somewhere', 'to *put things.*']), x: L, y: V(380, 520), size: V(150, 128), times: pick(k9.some, [3, 4, 5, 6]) });
      withA(prog(t, k9.some.w[8], 0.3), () => mono('In your mind', L + 8, V(560, 700), 28, g.mid, 'left', { ls: 0.24 }));
      // empty pigeonholes: places ready for ideas
      const gx = V(L, L), gy = V(640, 790), cols = V(6, 3), rowsN = 2, cw = V(250, 284), ch = V(170, 290), gap = V(30, 34);
      for (let i = 0; i < cols * rowsN; i++) { const p = prog(t, k9.some.w[5] + i * 0.06, 0.45); if (p <= 0) continue; const x = gx + (i % cols) * (cw + gap), y = gy + Math.floor(i / cols) * (ch + gap);
        ctx.save(); ctx.strokeStyle = C.ink; ctx.lineWidth = 4; ctx.beginPath(); const q = E.outCubic(p); ctx.moveTo(x, y); ctx.lineTo(x, y + ch * Math.min(1, q * 2)); if (q > 0.5) { ctx.lineTo(x + cw * Math.min(1, (q - 0.5) * 2 * 1.0), y + ch); } ctx.stroke(); if (q >= 1) { ctx.beginPath(); ctx.moveTo(x + cw, y + ch); ctx.lineTo(x + cw, y); ctx.stroke(); } ctx.restore();
        withA(prog(t, k9.some.w[8] + i * 0.05, 0.3), () => mono('Ch ' + String(i + 1).padStart(2, '0'), x + 18, y + ch - 20, 20, C.blue, 'left', { ls: 0.1, raw: true, fixed: true })); }
    });
  }, { id: 'why-it-works' });
  sPen(k9.why.w[5] + 0.4, -4); sWh(k9.some.w[3] - 0.12, -6); sPen(k9.some.w[5], -5); sPen(k9.some.w[5] + 0.4, -7); sTick(k9.some.w[8], -6);
  // reading cold: a chapter ruler advances while idea cards pile up with nothing to attach to
  const ideaT = [k9.every.w[2], k9.floats.w[2] + 0.2, k9.one.w[3], k9.next.w[2], k9.six.w[1], k9.six.w[1] + 0.35, k9.pile.w[2], k9.pile.w[3] + 0.2, k9.pile.w[4] + 0.2];
  const idea = (i) => ({ x: V(1000 + 640 * (hash(i + 3) - 0.3), 540 + 640 * (hash(i + 3) - 0.5)), y: V(330 + 460 * hash(i + 11), 880 + 380 * hash(i + 11)), r: (hash(i + 5) - 0.5) * 0.22, ch: [1, 1, 1, 2, 6, 6, 6, 4, 3][i] });
  addS(S(k9.cold), 'ink', '// 08 — why it works', (t) => {
    const ty = V(330, 520), ts = V(110, 110);
    beat(t, k9.cold.t, k9.nowhere.t - 0.1, () => KT(t, { lines: ['Reading it', '~cold.~'], font: 'body', x: L, y: ty, size: ts, times: [k9.cold.w[3], k9.cold.w[5], k9.cold.w[6]] }));
    beat(t, k9.nowhere.t - 0.1, k9.floats.t - 0.1, () => KT(t, { lines: ['Nowhere', 'to ~file it.~'], font: 'body', x: L, y: ty, size: ts, times: pick(k9.nowhere, [3, 4, 5, 6]) }));
    beat(t, k9.floats.t - 0.1, k9.one.t - 0.1, () => KT(t, { lines: ['It just', '~floats.~'], font: 'body', x: L, y: ty, size: ts, times: [k9.floats.t, k9.floats.w[2], k9.floats.w[5]] }));
    beat(t, k9.one.t - 0.1, k9.next.t - 0.1, () => KT(t, { lines: ['One idea from', '~chapter one.~'], font: 'body', x: L, y: ty, size: ts, times: [...pick(k9.one, [2, 3, 4]), k9.one.w[5], k9.one.w[6]] }));
    beat(t, k9.next.t - 0.1, k9.six.t - 0.1, () => KT(t, { lines: ['The next', 'idea ~arrives.~'], font: 'body', x: L, y: ty, size: ts, times: [...k9.next.w.slice(0, 2), k9.next.w[2], k9.next.w[3]] }));
    beat(t, k9.six.t - 0.1, k9.attach.t - 0.1, () => KT(t, { lines: ['By chapter six:', '~a pile.~'], font: 'body', x: L, y: ty, size: ts, times: [k9.six.t - 0.3, k9.six.t, k9.six.w[1], k9.pile.w[0], k9.pile.w[1]] }));
    beat(t, k9.attach.t - 0.1, 1e9, () => KT(t, { lines: ['Nothing to', '~attach to.~'], font: 'body', x: L, y: ty, size: ts, times: pick(k9.attach, [2, 3, 4, 6]) }));
    // the chapter ruler: where you are in the book
    const rx = L, ry = V(990, 1420), rw = W - 2 * L;
    withA(prog(t, k9.cold.w[5], 0.4), () => { hline(rx, ry, rw, 1, C.inkMid, 3); for (let c = 0; c < 10; c++) { const x = rx + rw * c / 9; rect(x - 1, ry - 10, 3, 20, C.inkMid); mono(String(c + 1).padStart(2, '0'), x, ry - 22, 18, C.inkMid, c === 0 ? 'left' : c === 9 ? 'right' : 'center', { raw: true, fixed: true }); } });
    const at = 0.07 * ease(t, k9.every.t, 3.0, E.inOutCubic) + 0.041 * ease(t, k9.one.w[6] - 0.3, 0.6, E.inOutCubic) + 0.12 * ease(t, k9.next.t, 1.0, E.inOutCubic) + 0.325 * ease(t, k9.six.w[1] - 1.0, 1.2, E.inOutCubic) + 0.06 * ease(t, k9.pile.t, 4, E.inOutCubic);
    if (t > k9.cold.w[5]) { const mx = rx + rw * at; rect(mx - 3, ry - 30, 6, 40, C.blueT); }
    ideaT.forEach((ti, i) => {
      const p = sn(t, ti, 0.45); if (p <= 0) return; const d = idea(i); const drift = t - ti;
      const x = d.x + 14 * Math.sin(drift * 0.6 + i), y = d.y + 10 * Math.sin(drift * 0.45 + i * 2) - 90 * (1 - p);
      withA(clamp(p * 2), () => withT(x, y, 1, d.r + 0.05 * Math.sin(drift * 0.3 + i), () => { rect(-150, -50, 300, 100, C.card); _txt('IDEA', -126, 4, F.disp(34), C.ink, 'left', 'alphabetic', -1); mono('Ch ' + String(d.ch).padStart(2, '0'), 126, 2, 20, C.blue, 'right', { ls: 0.14, raw: true, fixed: true }); }));
    });
  }, { id: 'cold' });
  ideaT.forEach((x, i) => sfx(i % 2 ? 'card' : 'pop', x, i % 2 ? -4 : -5)); sWh(k9.six.w[1] - 0.4, -8); sTick(k9.one.w[6], -3); sTick(k9.six.w[1] + 0.2, -3); [k9.floats.t, k9.one.t, k9.next.t, k9.six.t].forEach(x => sWh(x - 0.05, -14));
  // studied first: the shelves exist; each idea slides onto its chapter's shelf
  const SH = () => ({ x: L, w: W - 2 * L, ys: V([470, 720, 970], [800, 1060, 1320]), lab: [['Ch 01', 'Ch 02'], ['Ch 03', 'Ch 04'], ['Ch 05', 'Ch 06']] });
  const snaps = [[k9.shows.w[3], 1, 0.62], [k9.part.w[5], 2, 0.3], [k9.doing.w[4], 0, 0.36], [k9.go.w[3], 2, 0.8]];   // [time, shelf, x along it]
  const bookRow = (x0, y, w, seed) => { let x = x0 + 20; for (let k = 0; k < 12; k++) { const bw = 34 + 26 * hash(seed + k), bh = V(130, 130) + 60 * hash(seed + k + 50); if (x + bw > x0 + w - 20) break; if (!(k === 4 || k === 9)) standSpine(x, y - bh, bw, bh, [C.block2, C.stone, C.ink, C.panel][(k + seed) % 4]); x += bw + 6; } };
  addS(S(k9.but), 'paper', '// 08 — why it works', (t) => {
    KR(t, { lines: V(['You know the *shape.*'], ['You know', 'the *shape.*']), x: L, y: V(220, 480), size: V(100, 110), times: pick(k9.shape, [0, 2, 3, 4]) });
    const s = SH();
    s.ys.forEach((y, i) => { const rp = prog(t, k9.but.t + i * 0.12, 0.6); shelfPlank(s.x, y, s.w, rp, null, { th: 10 }); withA(clamp(rp * 2), () => { mono(s.lab[i][0], s.x, y + 44, 22, g.acc, 'left', { raw: true }); mono(s.lab[i][1], s.x + s.w / 2, y + 44, 22, g.acc, 'left', { raw: true }); });
      const bp = prog(t, k9.shape.w[3] + i * 0.15, 0.5); if (bp > 0) withA(clamp(bp * 2), () => withT(0, 30 * (1 - E.outExpo(bp)), 1, 0, () => bookRow(s.x, y, s.w, i * 17))); });
    snaps.forEach(([ti, row, u], j) => {
      const p = E.outQuint(prog(t, ti, 0.6)); if (p <= 0) return;
      const tx = s.x + s.w * u, ty = s.ys[row]; const bw = 46, bh = V(170, 190);
      const draw = (tt) => { const q = E.outQuint(prog(tt, ti, 0.5)); const x = lerp(V(1700, 900), tx, q), y = lerp(V(150, 380), ty - bh / 2, q) - 18 * Math.sin(Math.PI * clamp((tt - ti - 0.45) / 0.3)) * (tt > ti + 0.45 ? 1 : 0);
        withA(clamp(q * 3), () => withT(x, y, 1, (1 - q) * 1.4, () => { rect(-bw / 2, -bh / 2, bw, bh, C.blue); withT(0, 0, 1, -Math.PI / 2, () => _txt('IDEA', 0, 7, F.mono(20, 500), C.onBlue, 'center', 'alphabetic', 3)); })); };
      mb(t, ti, 0.6, draw);
    });
    wipe(t, S(k9.mech), C.punch);
  }, { id: 'shelves' });
  snaps.forEach(([x]) => { sWh(x + 0.15, -8); sBook(x + 0.32, -3); }); sPen(k9.but.t, -6); sPop(k9.shape.w[4], -4); sRise(k9.shelves.w[3], -4);
  addS(S(k9.mech), 'blue', '// 08 — why it works', (t) => {
    KR(t, { lines: ["That's the whole mechanism."], font: 'body', x: L, y: V(300, 540), size: V(84, 70), times: k9.mech.w.slice(0, 4) });
    KR(t, { lines: ["You're building"], x: L, y: V(470, 720), size: V(120, 110), times: pick(k9.shelves, [0, 1]) });
    KR(t, { lines: V(['the shelves'], ['the', 'shelves']), x: L - 6, y: V(730, 930), size: V(290, 210), times: pick(k9.shelves, [2, 3]) });
    // the shelf under the words
    const sp = prog(t, k9.shelves.w[3] + 0.15, 0.6); if (sp > 0) rect(L, V(780, 1160), (W - 2 * L) * E.outExpo(sp), 14, C.onBlue);
    KT(t, { lines: V(['~before you put something on them.~'], ['~before you put~', '~something on them.~']), font: 'serif', x: L, y: V(930, 1300), size: V(110, 96), times: TM({ t: k9.shelves.w[4], w: [k9.shelves.w[4], k9.shelves.w[9] - 0.3] }, 6), acc: g.fg, ul: false });
  }, { id: 'build-shelves', grid: true, push: 0.025 });
  sImp(k9.shelves.w[3], 0); sPen(k9.shelves.w[3] + 0.15, -3);
}
