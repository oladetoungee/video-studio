/* Scenes, part 2: book one, How to Read and Write Critically (Alex Baratta), chapter by chapter (4:28 - 9:23)
 * Positions are V(landscape, portrait); see scenes1.js. v3: the real spine/cover, a library shelf, the chapter map
 * (10 blocks that fill as she reads the contents and are reused: 05-07 merge into one block, all get a "?"). */
'use strict';
// the published chapter list, in the book's order (she mislabels a couple of numbers aloud; the screen shows the book)
const BARATTA = [
  'What does it mean to be critical?',
  'Different ways to show your criticality',
  'Understanding score bands and developing your skills within academic assessment',
  'The connection between critical reading, thinking and writing',
  'How to structure your essays',
  'How to structure your dissertation',
  'Additional assessments to consider',
  'Four ways to approach interpretation',
  'How to use quotes, paraphrase and summarise',
  'How to use critical language in your assessments',
];
const pad2 = n => String(n).padStart(2, '0');
function contentsRows(t, tins, o = {}) {
  IDX(t, BARATTA.map((s, i) => ({ n: pad2(i + 1), s, tin: tins[i], size: i === 2 ? V(29, 26) : V(32, 28) })),
    { x: o.x == null ? 600 : o.x, y: o.y || 200, w: o.w || W - 600 - 110, rowH: o.rowH || 80, size: 32, font: 'body', weight: 600, numW: V(76, 60), numSize: 24, ruleDy: V(26, 20), focus: o.focus, dimA: o.dimA == null ? 0.3 : o.dimA, wrap: false });
}
/** the chapter map: the contents as 10 blocks in one column (bar length ~ title length).
 *  o.tin[i] lands block i; o.focus(i) 0..1; o.merge {a, b, t, label}; o.q time ("?" on every block); o.hi {i: t} */
function cmap(t, x, y, w, rh, o) {
  const gap = Math.max(6, rh * 0.18), h = rh - gap; const m = o.merge ? E.inOutCubic(prog(t, o.merge.t, 0.6)) : 0;
  const onInk = g === G.ink;
  for (let i = 0; i < 10; i++) {
    const ti = o.tin ? o.tin[i] : o.t0; const p = prog(t, ti, 0.4); if (p <= 0) continue;
    const inM = o.merge && i >= o.merge.a && i <= o.merge.b; const by = y + i * rh + (inM ? (o.merge.a === i ? 0 : -gap * m * (i - o.merge.a)) : (o.merge && i > o.merge.b ? -gap * m * (o.merge.b - o.merge.a) : 0));
    if (inM && m > 0.5 && i > o.merge.a) continue;   // merged: block a draws the whole union (no overlapping translucent strips)
    const hh = inM ? (m > 0.5 ? (o.merge.b - o.merge.a) * (h + gap * (1 - m)) + h : h + gap * m * (i < o.merge.b ? 1 : 0)) : h;
    const hiT = o.hi && o.hi[i] != null ? o.hi[i] : null; const hi = (hiT != null && t >= hiT) || (inM && m > 0.5);
    const f = o.focus ? o.focus(i) : 1; const e = E.outBack(p, 1.7);
    withA(clamp(p * 3) * (0.3 + 0.7 * f), () => withT(x, by + hh / 2, 1, 0, () => { ctx.scale(0.4 + 0.6 * e, 1);
      rect(0, -hh / 2, w, hh, hi ? (onInk ? C.blueT : C.blue) : (onInk ? C.inkPanel : C.card)); if (!hi) strokeR(0, -hh / 2, w, hh, onInk ? C.inkMid : C.ink, 3);
      if (!(inM && m > 0.3)) { mono(pad2(i + 1), 16, h * 0.18, Math.min(24, h * 0.5), hi ? (onInk ? C.ink : C.card) : g.acc, 'left', { ls: 0.04, raw: true, fixed: true }); if (h >= 30 && !(o.bare || PORTRAIT)) fitTxt(BARATTA[i], 16 + Math.min(24, h * 0.5) * 2.4, h * 0.2, F.body(Math.min(20, h * 0.46), 600), hi ? (onInk ? C.ink : C.card) : (onInk ? C.paper : C.ink), w - 40 - Math.min(24, h * 0.5) * 2.4 - (o.q != null ? 40 : 0)); }
      if (o.q != null) { const qp = prog(t, o.q + i * 0.06, 0.3); if (qp > 0) withA(qp, () => _txt('?', w - 16, h * 0.32, F.disp(h * 0.9), hi ? C.card : (onInk ? C.blueT : C.blue), 'right')); }
    }));
  }
  if (o.merge && m > 0.5) { const yy = y + o.merge.a * rh, hh = (o.merge.b - o.merge.a + 1) * h; withA((m - 0.5) * 2, () => _txt(o.merge.label, x + w / 2, yy + hh / 2 + 12, F.disp(Math.min(40, hh * 0.3)), onInk ? C.ink : C.card, 'center', 'alphabetic', -1)); }
}

function buildScenes2() {
  /* ---------- 10 · book one: the Baratta spine slides out of her stack and becomes the cover ---------- */
  const k = PS({ prac: "so let's actually do this practically", start: "i'll start with this book", small: "because it's a smaller one", clean: 'the structure is very clean', title: 'how to read and write critically by alex baratta', tell: 'the title is already telling us something', attr: 'the title is what attracted me to it in the library', simple: "it's very simple and direct", treat: 'treating writing and reading critically together', open: 'now if we open up to the chapters', ten: 'we have 10 chapters in this book' });
  const STB = () => ({ x: V(1000, L + 40), yb: V(1010, 1430), w: V(800, 700) });
  const coverAt = () => ({ x: V(1300, 620), y: V(130, 760), w: V(480, 340) });   // where the cover settles (top-left corner)
  /** the Baratta spine leaving the stack (u 0..1) and turning into the cover (v 0..1) */
  const pullOut = (t, tOut, st) => {
    const r0 = realStack(t, st.x, st.yb, st.w, { only: [] }).rects.baratta; const c = coverAt(); const ch = c.w * IMG.bookB.height / IMG.bookB.width;
    const u = E.inOutCubic(prog(t, tOut, 0.7)); const v = E.inOutCubic(prog(t, tOut + 0.35, 0.6));
    const sx = lerp(r0[0], r0[0] + V(260, 60), u), sy = lerp(r0[1], r0[1] - V(140, 120), u);
    const X = lerp(sx, c.x, v), Y = lerp(sy, c.y, v), Wd = lerp(r0[2], c.w, v), Hd = lerp(r0[3], ch, v);
    const xf = clamp((v - 0.78) / 0.22); withA(1 - xf, () => ctx.drawImage(IMG.spine_baratta, X, Y, Wd, Hd));
    withA(xf, () => { rect(X - 12, Y - 12, Wd + 24, Hd + 24, C.card); ctx.drawImage(IMG.bookB, X, Y, Wd, Hd); });
    return { u, v };
  };
  addS(S(k.prac), 'ink', '// 09 — book one', (t) => {
    KR(t, { lines: ["Let's do this, ~practically.~"], font: 'body', x: L, y: V(260, 500), size: V(64, 64), times: [k.prac.w[1], k.prac.w[3], k.prac.w[4], k.prac.w[5]] });
    KR(t, { lines: ['Book one.'], x: L - 6, y: V(520, 680), size: V(220, 190), times: [k.start.w[4], k.start.w[4] + 0.16] });
    KT(t, { lines: V(['The smaller one.', 'Very clean ~structure.~'], ['The smaller one.', 'Very clean', '~structure.~']), font: 'body', x: L, y: V(680, 820), size: V(60, 56), lh: 1.25, times: [k.small.w[2], k.small.w[3], k.small.w[4], k.clean.w[3], k.clean.w[4], k.clean.w[4] + 0.15] });
    const st = STB(); const tOut = k.start.w[3] - 0.3;
    realStack(t, st.x, st.yb, st.w, { drops: { convivial: k.prac.w[0], baratta: k.prac.w[1], marple: k.prac.w[2] }, only: t < tOut ? undefined : ['convivial', 'marple'], off: (n) => (n === 'marple' && t >= tOut ? { dy: ease(t, tOut + 0.3, 0.4, E.outCubic) * SPINES.baratta.h * st.w / 1520 } : null) });
    if (t >= tOut) pullOut(t, tOut, st);
    // "the smaller one": thickness bracket on the cover vs the thick spine still in the stack
    const sp = prog(t, k.small.w[3], 0.4); if (sp > 0) { const r = realStack(t, st.x, st.yb, st.w, { only: [] }).rects.convivial; withA(sp, () => strokeR(r[0] - 8, r[1] - 8, r[2] + 16, r[3] + 16, C.inkMid, 2)); }
  }, { id: 'book-one', grid: true });
  sBook(k.prac.w[0] + 0.15, -4); sBook(k.prac.w[1] + 0.15, -5); sBook(k.prac.w[2] + 0.15, -6); sImp(k.start.w[4], -8); sWh(k.start.w[3] + 0.3, -3); sPage(k.start.w[3] + 0.7, -3); sPop(k.small.w[3] + 0.1, -5); sPen(k.clean.w[4] + 0.4, -4);
  // the title, the library shelf she found it on, then READ + WRITE marked
  addS(S(k.title), 'paper', '// 09 — book one', (t) => {
    const tr = k.treat.w; const shelfIn = k.attr.t - 0.1, shelfOut = k.simple.t - 0.2;
    KR(t, { lines: ['How to read', 'and write', 'critically'], x: L - 4, y: V(440, 620), size: V(170, 130), times: k.title.w.slice(0, 6), mark: { idx: [2, 4], at: [tr[3], tr[1]], col: C.blue, fg: C.card } });
    withA(prog(t, k.title.w[6], 0.3), () => mono('Alex Baratta', L + 6, V(860, 950), 30, g.fg, 'left', { ls: 0.2 }));
    // right: the cover (closed: "before I open it")
    const c = { x: V(1240, 600), y: V(170, 960), w: V(500, 320) }; const ch = c.w * IMG.bookB.height / IMG.bookB.width;
    withA(1 - prog(t, k.simple.t - 0.4, 0.3), () => handLine(L, V(440, 620) + 14, V(940, 760), E.outCubic(prog(t, k.tell.w[4], 0.6)), C.blue, 10, 6));
    beat(t, 0, shelfIn, () => { imgCard(IMG.bookB, c.x, c.y, c.w, { rot: -0.03, pad: 14, key: 'cover baratta' });
      const bd = prog(t, k.tell.w[0], 0.45); if (bd > 0) withT(c.x + c.w / 2, c.y + ch * 0.55, 1, -0.03, () => { const bw = (c.w + 60) * E.outExpo(bd); rect(-bw / 2, -45, bw, 90, C.ink); withA(clamp(bd * 2 - 0.6), () => _txt('CLOSED', 0, 12, F.mono(30, 500), C.card, 'center', 'alphabetic', 8)); });
      const cl = prog(t, k.tell.w[1], 0.4); if (cl > 0) withA(cl, () => { withT(c.x + c.w / 2, c.y + ch + 70, 1, 0, () => mono('Before I open it', 0, 0, 24, C.blue, 'center', { ls: 0.2 })); }); });
    // the library: generic spines on a shelf, hers pulled half out
    beat(t, shelfIn, shelfOut, () => {
      const sx = V(1000, L), sy = V(860, 1430), sw = V(810, W - 2 * L); const sp = ease(t, shelfIn, 0.5);
      shelfPlank(sx, sy, sw, sp, null, { th: 12 }); let x = sx + 10;
      for (let i = 0; i < 16; i++) { const bw = 34 + 22 * hash(i + 40), bh = V(300, 300) + 120 * hash(i + 90); if (x + bw > sx + sw - 10) break; const tin = shelfIn + 0.05 + i * 0.025;
        const q = ease(t, tin, 0.4); if (i === 7) { const pull = E.outBack(prog(t, k.attr.w[3], 0.6), 1.4); const hb = 380, wb = 80; withA(q, () => withT(x + wb / 2, sy - hb / 2 - V(160, 60) * pull, 1, -0.08 * pull, () => withT(0, 0, 1, -Math.PI / 2, () => ctx.drawImage(IMG.spine_baratta, -hb / 2, -wb / 2, hb, wb)))); x += wb + 6; continue; }
        withA(q, () => standSpine(x, sy - bh * q, bw, bh * q, [C.block2, C.stone, C.ink, C.panel, C.mid][(i * 3) % 5])); x += bw + 6; }
    });
    // READ + WRITE, together
    beat(t, shelfOut, 1e9, () => {
      // the real cover again: READ and WRITE boxed on its own title, then joined
      const ci = ease(t, shelfOut, 0.45); withA(ci, () => imgCard(IMG.bookB, c.x, c.y + 30 * (1 - ci), c.w, { rot: 0, pad: 14, key: 'cover baratta title' }));
      const s_ = (c.w - 28) / IMG.bookB.width, ox = c.x + 14, oy = c.y + 14; const bxr = (x0, y0, x1, y1, ti, col) => { const p = ease(t, ti, 0.4); if (p > 0) strokeR(ox + x0 * s_ - 8, oy + y0 * s_ - 8, ((x1 - x0) * s_ + 16) * p, (y1 - y0) * s_ + 16, col, 6); };
      bxr(78, 320, 290, 414, k.simple.e + 0.85, C.blue); bxr(68, 416, 282, 510, k.simple.e + 1.75, C.blue);
      const j = E.outCubic(prog(t, tr[5] - 0.1, 0.6)); if (j > 0) { const xx = ox + 318 * s_; pline(xx, oy + 367 * s_, xx, lerp(oy + 367 * s_, oy + 463 * s_, j), 1, C.blue, 6); pline(ox + 298 * s_, oy + 367 * s_, xx, oy + 367 * s_, j, C.blue, 6); pline(ox + 290 * s_, oy + 463 * s_, xx, oy + 463 * s_, j, C.blue, 6); }
    });
  }, { id: 'b1-title' });
  sPen(k.treat.w[1], -3); sPen(k.treat.w[3], -3); sWh(k.attr.t - 0.05, -6); [0, 0.15, 0.3].forEach(d => sTick(k.attr.t + d, -9)); sPage(k.attr.w[3] + 0.15, -2); sWh(k.simple.t - 0.15, -8); sPop(k.treat.w[5], -3); sPop(k.title.w[6], -6);
  // the contents, row by row as she reads it; each chapter lands as a block in the map
  const R = [P('what does it mean to be critical'), P('different ways to show your criticality'), P('understanding the score band'), P('the connection between critical reading'), P('how to structure your essay'), P('how to structure your dissertation'), P('additional assessment to consider'), P('four ways to approach interpretation'), P('use quotes paraphrasing'), P('how to use critical language')];
  const tins = R.map(r => r.t - 0.08);
  const readEnd = R[9].e + 1.0;
  const curCh = (tt) => { let a = -1; tins.forEach((x, i) => { if (tt >= x) a = i; }); return a; };
  addS(S(k.open), 'paper', '// 09 — book one', (t) => {
    // the cover swings open on "open up"
    { const c = { x: V(1240, 600), y: V(170, 960), w: V(500, 320) }, ch = c.w * IMG.bookB.height / IMG.bookB.width + 28; const op = prog(t, k.open.w[3] - 0.3, 0.8), gone = ease(t, k.ten.w[2] - 0.7, 0.45, E.inCubic);
      if (gone < 1) withA(1 - gone, () => withT(-80 * gone, 0, 1, 0, () => { rect(c.x, c.y, c.w, ch, C.card); strokeR(c.x, c.y, c.w, ch, C.ink, 3); mono('Contents', c.x + 40, c.y + 70, 24, C.mid, 'left', { ls: 0.22, fixed: true }); hline(c.x + 40, c.y + 96, c.w - 80, 1, C.line, 2); for (let i = 0; i < 7; i++) fitTxt(BARATTA[i], c.x + 40, c.y + 150 + i * (ch - 200) / 7, F.body(V(20, 15), 600), C.ink, c.w - 80); }));
      if (op < 1) withT(c.x, c.y, 1, 0, () => { const e = E.inOutCubic(op); ctx.transform(Math.max(0.02, Math.cos(e * Math.PI / 2)), -0.16 * Math.sin(e * Math.PI), 0, 1, 0, 0); imgCard(IMG.bookB, 0, 0, c.w, { pad: 14, key: 'cover open' }); }); }
    const p10 = prog(t, k.ten.w[2] - 0.5, 0.6); if (p10 > 0) withA(clamp(p10 * 3), () => counter(t, k.ten.w[2] - 0.5, 0.6, 0, 10, L - 10, V(420, 680), F.disp(V(220, 200)), C.blue, 'left', (n) => String(n)));
    withA(prog(t, k.ten.w[3], 0.3), () => mono('Chapters', V(L + 260, L + 250), V(420, 680), 30, g.fg, 'left', { ls: 0.24 }));
    const fc = (tt) => (tt > readEnd ? -1 : curCh(tt));
    if (!PORTRAIT) cmap(t, L, 480, 420, 56, { bare: true, tin: tins, focus: (i) => (fc(t) === -1 || fc(t) === i ? 1 : 0.55) });
    contentsRows(t, tins, { x: V(620, L), y: V(250, 900), w: V(W - 620 - L, W - 2 * L), rowH: V(78, 54), focus: fc });
    R.forEach((r, i) => { if (t < r.t - 0.1 || t > (R[i + 1] ? R[i + 1].t - 0.1 : readEnd + 0.4)) return; const rx = V(620, L) + V(76, 60), ry = V(250, 900) + i * V(78, 54); const fs = i === 2 ? V(29, 26) : V(32, 28); const f = F.body(fs, 600), ls = fs * LS.body;
      const rEnd = R[i + 1] ? Math.max(r.e + 0.1, R[i + 1].t - 0.6) : r.e + 0.8; inkSweep(t, rx - 8, ry - fs * 0.95, tw(BARATTA[i], f, ls) + 16, fs * 1.3, r.t - 0.05, rEnd, (c) => _txt(BARATTA[i], rx, ry, f, c, 'left', 'alphabetic', ls));
      if (!PORTRAIT) { const q = clamp((t - r.t) / Math.max(0.3, rEnd - r.t)); rect(L, 480 + i * 56, 420 * q, 46, MC('rgba(27,63,216,0.35)')); } });
  }, { id: 'b1-contents' });
  sPage(k.open.w[3], -1); sPop(k.ten.w[2], -2); for (let i = 0; i < 10; i++) sTick(k.ten.w[2] - 0.5 + i * 0.06, -12); tins.forEach((x, i) => { sPop(x + 0.1, -5); if (i % 3 === 1) sPen(x + 0.15, -9); });

  /* ---------- 11 · chapter one: a question ---------- */
  const k1 = PS({ q: 'so the first thing you notice is that chapter one is a question', part: 'in this book particularly', what: 'what does it mean to be critical', thinks: 'which means that the author thinks', main: 'the main problem to start with', def: 'no one has actually defined the word for you', be: 'you should be critical', think: 'you should think critically', blah: 'blah blah blah', fix: 'starts by fixing the definition', throw: 'i also throw the word critical thinking around a lot', vid: 'i even have a video on my youtube', chal: 'am i going to be challenged by the definition', give: 'this person is going to give', get: 'is it that i get challenged', supp: 'gets supported by this author', look: "so i'm already looking forward to that" });
  addS(S(k1.q), 'paper', '// 10 — chapter 01', (t) => {
    // block 01 from the map grows into a card with a question mark
    const bp = ease(t, k1.q.t + 0.2, 0.8, E.inOutCubic); const x = V(1260, L), y = V(190, 880), w = V(560, 400), h = V(600, 520);
    if (bp > 0) { const X = lerp(L, x, bp), Y = lerp(V(480, 760), y, bp), Wd = lerp(V(420, 920), w, bp), Hd = lerp(V(46, 46), h, bp);
      const fl = t >= k1.main.w[2]; rect(X, Y, Wd, Hd, fl ? C.blue : C.card); strokeR(X, Y, Wd, Hd, fl ? C.blue : C.ink, 4); mono('01', X + 30, Y + 50, 30, fl ? C.card : C.blue, 'left', { raw: true });
      const qp = prog(t, k1.q.w[12] - 0.1, 0.5); if (qp > 0) withA(qp, () => _txt('?', X + Wd / 2, Y + Hd * 0.78, F.serif(Hd * 0.9 * E.outBack(qp, 1.5)), fl ? C.card : C.blue, 'center')); }
    KR(t, { lines: V(['What does it', 'mean to be', '*critical?*'], ['What does', 'it mean to', 'be *critical?*']), x: L - 4, y: V(440, 560), size: V(150, 116), times: k1.what.w, mark: { idx: [6], at: [k1.thinks.w[4]], col: C.blue, fg: C.card } });
  }, { id: 'ch1-question' });
  sWh(k1.q.t + 0.6, -5); sPop(k1.q.w[12] + 0.2, -1); sPop(k1.what.w[6], -5); sTick(k1.thinks.w[4], -4); sPen(k1.thinks.w[4], -3); sPop(k1.main.w[2], -2);
  const dict = (t, fillT, x, y, word = 'critical', o = {}) => grp('dictionary card ' + word, x, y, V(910, 920), V(580, 520), () => {
    const w = V(910, 920), h = V(580, 520); rect(x, y, w, h, C.card); if (g !== G.ink) strokeR(x, y, w, h, C.ink, 4);
    txt(word, x + 70, y + V(190, 170), F.serifR(V(150, 140)), C.ink, 'left', 'alphabetic', -2);
    mono(o.pos || 'adj.', x + 70 + tw(word, F.serifR(V(150, 140)), -2) + 30, y + V(190, 170), 26, C.mid, 'left', { ls: 0.16 });
    hline(x + 70, y + V(250, 220), w - 140, 1, C.line, 2);
    for (let i = 0; i < (o.noSlots ? 0 : 3); i++) {
      const ry = y + V(320, 290) + i * 72; mono(String(i + 1) + '.', x + 70, ry + 12, 24, C.blue, 'left', { ls: 0.04, raw: true });
      const fp = fillT == null ? 0 : E.outExpo(prog(t, fillT + i * 0.18, 0.5)); const bw = [620, 540, 420][i];
      ctx.save(); ctx.setLineDash([10, 10]); strokeR(x + 130, ry - 10, bw, 26, C.dash, 2); ctx.restore();
      if (fp > 0) rect(x + 130, ry - 10, bw * fp, 26, C.ink);
      if (o.q != null) { const qp = prog(t, o.q + i * 0.15, 0.3); if (qp > 0) withA(qp, () => _txt('?', x + 130 + bw + 24, ry + 14, F.disp(40), C.blue, 'left')); }
    }
  });
  addS(S(k1.def), 'ink', '// 10 — chapter 01', (t) => {
    KR(t, { lines: ['No one has', '~defined~ it', 'for you.'], font: 'body', x: L, y: V(440, 500), size: V(96, 96), lh: 1.15, times: pick(k1.def, [0, 1, 2, 4, 6, 7, 8]) });
    const p = sn(t, k1.def.t, 0.45); if (p > 0) withA(clamp(p * 2), () => dict(t, null, V(900, L), V(250, 860) + 50 * (1 - p), 'critical', { q: k1.def.w[6] }));
  }, { id: 'ch1-undefined' });
  sCard(k1.def.t); sTick(k1.def.w[6], -4);
  // everybody keeps saying it: speech bubbles pile up
  addS(S(k1.be, 1.0), 'paper', '// 10 — chapter 01', (t) => {
    for (let i = 0; i < 7; i++) { const q = sn(t, k1.be.t - 0.8 + i * 0.06, 0.4); if (q > 0) withA(clamp(q * 2), () => person(V(L + 60 + i * 120, L + 60 + i * 130), V(990, 1440) + 30 * (1 - q), V(70, 64), i % 3 === 1 ? C.ink : C.stone)); }
    const B = [['“Be critical.”', k1.be.w[3], V([L, 330, -0.03], [L, 560, -0.03])], ['“Think critically.”', k1.think.w[3], V([620, 470, 0.025], [200, 800, 0.03])], ['“Blah, blah, blah.”', k1.blah.t, V([1050, 640, -0.02], [120, 1060, -0.02])],
      ['“Be critical!”', k1.blah.w[1], V([300, 760, 0.04], [420, 1220, 0.04])], ['“Critical!”', k1.blah.w[2], V([1300, 320, 0.05], [560, 680, 0.05])]];
    B.forEach(([s, ti, [x, y, r]], i) => { const p = landAt(t, ti, x, y, { dy: 50, r: r * 4, d: 0.45 }); if (p.p <= 0) return; withA(p.a * (i > 2 ? 0.9 : 1), () => withT(p.x, p.y, 1, r + p.r, () => bubble(0, 0, V(i > 2 ? 520 : 700, i > 2 ? 520 : 760), s, { size: V(i > 2 ? 52 : 72, i > 2 ? 52 : 70), fit: true, bg: i === 2 ? C.ink : C.card, fg: i === 2 ? C.card : C.ink, border: i === 2 ? null : C.ink, side: i % 2 ? 'r' : 'l', key: 'say ' + i }))); });
  }, { id: 'be-critical' });
  sPop(k1.be.w[3], 0); [0, 0.18, 0.36].forEach(d => sTick(k1.be.t - 0.75 + d, -7)); sPop(k1.think.w[3], -1); sPop(k1.blah.t, -2); sPop(k1.blah.w[1], -4); sPop(k1.blah.w[2], -5);
  addS(S(k1.fix, 1.3), 'ink', '// 10 — chapter 01', (t) => {
    KR(t, { lines: ['This author', '~fixes~ the', 'definition first.'], font: 'body', x: L, y: V(440, 500), size: V(84, 88), lh: 1.15, times: [k1.fix.t - 1.2, k1.fix.t - 1.0, k1.fix.w[2], k1.fix.w[3], k1.fix.w[4], k1.fix.w[4] + 0.2] });
    dict(t, k1.fix.w[4], V(900, L), V(250, 860));
    const ck = prog(t, k1.fix.w[4] + 0.8, 0.4); if (ck > 0) withA(clamp(ck * 3), () => withT(V(900 + 910 - 20, L + 920 - 20), V(250 + 20, 860 + 20), E.outBack(ck, 2), 0, () => checkbox(-45, -45, 90, ck, C.blueT)));
  }, { id: 'ch1-definition' });
  sPen(k1.fix.w[4], -1); sPen(k1.fix.w[4] + 0.35, -5); sClick(k1.fix.w[4] + 0.85, -2);
  // "I throw the word critical around a lot": the word gets thrown; then challenged or supported?
  addS(S(k1.throw, 0.5), 'paper', '// 10 — chapter 01', (t) => {
    beat(t, 0, k1.chal.t - 0.1, () => {
      KR(t, { lines: V(['I throw the word', '~critical~ around', 'a lot.'], ['I throw the word', '~critical~ around', 'a lot.']), font: 'body', x: L, y: V(330, 520), size: V(90, 90), lh: 1.15, times: [k1.throw.t, k1.throw.t + 0.07, k1.throw.t + 0.14, k1.throw.t + 0.21, ...pick(k1.throw, [5, 7, 8, 9])] });
      // the word, thrown around: chips arc in and land scattered
      const gather = E.inOutCubic(prog(t, k1.chal.t - 2.0, 0.8)); const chips = V([[110, 760], [380, 760], [650, 760], [245, 860], [515, 860]], [[80, 900], [350, 900], [620, 900], [215, 1000], [485, 1000]]);
      chips.forEach(([x, y], i) => { const ti = k1.throw.w[7] + i * 0.13; const p = prog(t, ti, 0.5); if (p <= 0) return; const e = E.outQuint(p);
        const X = lerp(lerp(V(-200, -200), x, e), V(560, 400), gather * 0.85), Y = lerp(y - 260 * Math.sin(Math.PI * Math.min(1, e)) * (1 - e) - 40 * (1 - e), V(900, 1020), gather * 0.85);
        withT(X, Y, 1, (hash(i + 4) - 0.5) * 0.08 + (1 - e) * -1.5, () => { rect(0, -38, 240, 64, i % 2 ? C.ink : C.blue); _txt('critical', 120, 7, F.serif(40), C.card, 'center'); }); });
      // her video on it (generic card, labelled)
      const vp = landAt(t, k1.vid.w[4], V(1200, 560), V(250, 1120), { dy: 60 }); if (vp.p > 0) withA(vp.a, () => grp('my video', vp.x, vp.y, V(600, 440), V(460, 300), () => {
        const vw = V(600, 440), vh = V(460, 300); rect(vp.x, vp.y, vw, vh, C.card); strokeR(vp.x, vp.y, vw, vh, C.ink, 4); rect(vp.x + 24, vp.y + 24, vw - 48, vh * 0.6, C.ink);
        txt('CRITICAL THINKING', vp.x + 50, vp.y + 24 + vh * 0.36, F.disp(V(44, 32)), C.card, 'left', 'alphabetic', -1, 'video title'); ctx.beginPath(); ctx.moveTo(vp.x + vw - 90, vp.y + 60); ctx.lineTo(vp.x + vw - 56, vp.y + 80); ctx.lineTo(vp.x + vw - 90, vp.y + 100); ctx.closePath(); ctx.fillStyle = C.card; ctx.fill();
        mono('My video · illustration', vp.x + 28, vp.y + vh - 40, 22, C.mid, 'left', { ls: 0.18, fixed: true }); const pl = prog(t, k1.vid.e + 0.7, 2.5); if (pl > 0) { rect(vp.x + 24, vp.y + 24 + vh * 0.6 - 8, (vw - 48) * pl, 8, C.blue); } }));
    });
    beat(t, k1.chal.t - 0.1, 1e9, () => {
      KR(t, { lines: ['Am I going to be…'], font: 'body', x: L, y: V(290, 500), size: V(80, 72), times: k1.chal.w.slice(0, 5) });
      const cw = V(800, 920), ch = V(400, 330);
      const shake = (t0) => { const d = t - t0; return d > 0 && d < 0.5 ? Math.sin(d * 50) * 10 * (1 - d / 0.5) : 0; };
      const opt = (x, y0, s, ti, st) => { const p = sn(t, ti, 0.4); if (p <= 0) return; withA(clamp(p * 2), () => { const y = y0 + 40 * (1 - p); const dx = st.shake ? shake(st.shake) : 0; grp('option ' + s, x, y, cw, ch, () => withT(dx, 0, 1, 0, () => {
        const on = st.on != null && t >= st.on; rect(x, y, cw, ch, on ? st.col : C.card); strokeR(x, y, cw, ch, on ? st.col : C.ink, 4);
        mono(s === 'Challenged' ? 'Option 01' : 'Option 02', x + 50, y + 80, 24, on ? C.card : C.blue, 'left', { ls: 0.16 });
        txt(s.toUpperCase() + '?', x + 46, y + ch - 90, F.disp(V(110, 100)), on ? C.card : C.ink, 'left', 'alphabetic', 110 * LS.disp);
        const qp = prog(t, k1.look.w[3], 0.4); if (qp > 0) withA(qp, () => _txt('?', x + cw - 60, y + 110, F.disp(120 * E.outBack(qp, 2)), on ? C.card : C.blue, 'right')); })); }); };
      opt(L, V(400, 580), 'Challenged', k1.chal.w[5], { shake: k1.get.w[5], on: k1.get.w[5], col: C.ink });
      opt(V(1010, L), V(400, 960), 'Supported', k1.give.w[2], { on: k1.supp.w[1], col: C.blue });
      const dp = landAt(t, k1.give.w[3], L, V(850, 1310), { dy: 40, d: 0.45 }); if (dp.p > 0) withA(dp.a, () => { const dw = V(1700, 920); rect(dp.x, dp.y, dw, 70, C.ink); _txt('critical', dp.x + 30, dp.y + 50, F.serifR(44), C.card, 'left'); mono('The author’s definition', dp.x + 200, dp.y + 44, 22, C.inkMid, 'left', { ls: 0.18, fixed: true }); });
      withA(prog(t, k1.look.w[3], 0.3), () => mono("Reading to find out. I'm looking forward to that.", L + 6, V(960, 1410), 26, C.blue, 'left', { ls: 0.2, maxW: V(undefined, 920) }));
    });
  }, { id: 'challenged' });
  sPen(k1.throw.w[5] + 0.4, -6); [0, 1, 2, 3, 4].forEach(i => sWh(k1.throw.w[7] + i * 0.13 + 0.2, -12 - i)); [0, 2, 4].forEach(i => sPop(k1.throw.w[7] + i * 0.13 + 0.35, -7)); sCard(k1.vid.w[4]);
  sCard(k1.chal.w[5]); sCard(k1.give.w[2]); sCard(k1.give.w[3], -3); sClick(k1.vid.e + 0.7, -3); sWh(k1.chal.t - 1.6, -10); sClick(k1.get.w[5]); sImp(k1.get.w[5] + 0.02, -12); sClick(k1.supp.w[1]); sPop(k1.look.w[3], -3);

  /* ---------- 12 · chapter two: tips, fanned like a hand of cards ---------- */
  const k2 = PS({ c2: 'chapter two different ways to show your criticality', prac: 'this is going to be practical', tips: "i'm going to get tips", ass: "i haven't read the book", tips2: 'tips on how to show my criticality' });
  addS(S(k2.c2), 'ink', '// 11 — chapter 02', (t) => {
    KR(t, { lines: V(['Different ways to show', 'your *criticality.*'], ['Different ways', 'to show your', '*criticality.*']), x: L - 4, y: V(360, 620), size: V(110, 110), times: [k2.c2.t, ...k2.c2.w.slice(3)] });
    const bk = landAt(t, k2.c2.w[0] + 0.1, V(1100, L), V(1080, 900), { dy: 50 }); if (bk.p > 0 && !PORTRAIT) withA(bk.a * (1 - prog(t, k2.prac.w[2], 0.4)), () => { const w = V(400, 920); rect(bk.x, bk.y - 80, w, 70, C.blueT); mono('02', bk.x + 20, bk.y - 34, 24, C.ink, 'left', { raw: true }); rect(bk.x + 80, bk.y - 49, w * 0.6, 8, C.ink); });
    const pr = prog(t, k2.prac.w[2], 0.35); if (pr > 0) withA(clamp(pr * 3), () => withT(V(L + 6, L + 6), V(610, 930), 1, 0, () => { const s = 1.4 - 0.4 * E.outCubic(pr); ctx.scale(s, s); rect(0, -44, 360, 64, C.blueT); _txt('PRACTICAL', 180, 2, F.mono(30, 500), C.ink, 'center', 'alphabetic', 6); }));
    { const ph = prog(t, k2.prac.t - 1.3, 0.4) * (1 - prog(t, k2.tips2.w[0] + 0.4, 0.3)); if (ph > 0) for (let i = 0; i < 3; i++) withA(ph, () => withT(V(1300, 540), V(1100, 1460), 1, (i - 1) * 0.28, () => { rect(-V(420, 360) / 2, -V(560, 420) - 60, V(420, 360), V(560, 420), C.inkPanel); strokeR(-V(420, 360) / 2, -V(560, 420) - 60, V(420, 360), V(560, 420), C.inkMid, 2); })); }
    // the tips: three cards fan out from one pivot
    const px = V(1300, 540), py = V(1100, 1460); const n = [k2.tips.w[4], k2.tips2.w[0], k2.tips2.w[0] + 0.3];
    n.forEach((ti, i) => { const p = ease(t, ti, 0.7, E.outQuint); if (p <= 0) return; const ang = (i - 1) * 0.28 * p; const cw = V(420, 360), ch = V(560, 420);
      mb(t, ti, 0.6, (tt) => { const q = ease(tt, ti, 0.7, E.outQuint); const a2 = (i - 1) * 0.28 * q; withA(clamp(q * 3), () => withT(px, py + 200 * (1 - q), 1, a2, () => { rect(-cw / 2, -ch - 60, cw, ch, C.card); strokeR(-cw / 2, -ch - 60, cw, ch, C.ink, 3); mono('Tip ' + pad2(i + 1), -cw / 2 + 34, -ch, 24, C.blue, 'left', { ls: 0.16, fixed: true }); _txt('?', 0, -ch / 2 - 10, F.disp(ch * 0.42), C.blue, 'center'); })); }); });
    const gp = prog(t, k2.ass.w[1], 0.35); if (gp > 0) withA(clamp(gp * 3), () => withT(V(1560, 820), V(560, 940), 1.5 - 0.5 * E.outCubic(gp), 0, () => { rect(-110, -40, 220, 70, C.paper); _txt('MY GUESS', 0, 8, F.mono(24, 500), C.ink, 'center', 'alphabetic', 4); }));
  }, { id: 'ch2' });
  sImp(k2.prac.w[2] + 0.05, -10); sTick(k2.prac.t - 1.25, -6); sPop(k2.c2.w[0] + 0.25, -4); sCard(k2.tips.w[4]); sCard(k2.tips2.w[0]); sCard(k2.tips2.w[0] + 0.3, -3); sPop(k2.ass.w[1] + 0.1, -2); sWh(k2.tips.w[4] + 0.1, -9);

  /* ---------- 13 · chapter three: score bands ---------- */
  const k3 = PS({ c3: 'chapter three goes on to score bands and assessment', tells: 'that already tells me what this book is for', wants: 'what it wants', life: 'critical thinking as a life skill', title: 'by the chapter title', marked: 'getting marked well', acad: 'academically', useful: 'useful for me to know', expect: 'now i would not be expecting', phil: 'anything philosophical', strat: 'now i\'m expecting practical academic strategy' });
  addS(S(k3.c3), 'paper', '// 12 — chapter 03', (t) => {
    beat(t, 0, k3.life.t - 0.8, () => {
      KR(t, { lines: ['Chapter *03*'], x: L - 4, y: V(240, 480), size: V(110, 96), times: [k3.c3.t, k3.c3.w[1]] });
      KR(t, { lines: V(['Score bands', '& *assessment.*'], ['Score bands', '& *assessment.*']), x: L - 4, y: V(400, 640), size: V(160, 120), times: k3.c3.w.slice(5, 9), mark: { idx: [3], at: [k3.tells.w[3]], col: C.blue, fg: C.card } });
      withA(prog(t, k3.tells.w[3], 0.3), () => mono('That already tells me what this book is for', L + 6, V(700, 860), 26, C.blue, 'left', { ls: 0.2, maxW: V(undefined, 900) }));
      withA(prog(t, k3.wants.w[2], 0.3), () => mono('…and what it wants', L + 6, V(750, 960), 26, g.mid, 'left', { ls: 0.2 }));
    });
    beat(t, k3.life.t - 0.8, 1e9, () => {
      sweep(t, L + V(110, 90) - 8, V(470, 690) + 160 - 60, tw('GETTING MARKED WELL', F.disp(64), 64 * LS.disp) + 16, 70, k3.acad.t - 0.1, k3.acad.e + 0.2);
      IDX(t, [
        { n: '01', s: 'Critical thinking as a life skill', tin: k3.life.t - 0.6, strike: k3.life.w[5] + 0.1, dim: k3.life.w[5] + 0.3 },
        { n: '02', s: 'Getting marked well', tin: k3.marked.t, tag: { t: k3.useful.w[0], s: '✓ what it is for', col: C.blue } },
        { n: '03', s: 'Anything philosophical', tin: k3.expect.w[3] - 0.3, strike: k3.phil.w[1] + 0.3, dim: k3.phil.w[1] + 0.5 },
      ], { x: L, y: V(470, 690), w: V(1040, W - 2 * L), rowH: V(160, 190), size: V(64, 66), numW: V(110, 90), subBelow: true, subDy: 48, strikeCol: C.blue });
    });
    // marks (illustration): one bar that fills to the top on "getting marked well"
    const bx = V(1260, L), by = V(900, 1410), bw = V(540, W - 2 * L), steps = 5; const ap = ease(t, k3.c3.w[1], 0.6);
    if (ap > 0) { const bh = V(70, 60); withA(ap, () => { strokeR(bx, by - bh, bw, bh, C.ink, 4); const f = 0.32 * E.outCubic(prog(t, k3.c3.w[1], 0.8)) + 0.6 * E.inOutCubic(prog(t, k3.marked.t, 1.0)); rect(bx + 10, by - bh + 10, (bw - 20) * f, bh - 20, t >= k3.marked.w[2] ? C.blue : C.mid); mono('Marks · illustration', bx, by - bh - 18, 20, g.mid, 'left', { ls: 0.18 }); }); }
  }, { id: 'ch3' });
  sTick(k3.c3.w[1] + 0.3, -6); sTick(k3.tells.w[3], -4); sPop(k3.life.t - 0.6, -4); sPen(k3.life.w[5] + 0.1, -3); sPop(k3.marked.t, -4); sWh(k3.marked.t + 0.4, -8); sPop(k3.useful.w[0], 0); sPen(k3.acad.t, -3); sTick(k3.title.w[1], -5); sPop(k3.expect.w[3] - 0.25, -4); sPen(k3.tells.w[3], -3); sPen(k3.phil.w[1] + 0.3, -3);
  addS(S(k3.strat, 0.1), 'blue', '// 12 — chapter 03', (t) => {
    KR(t, { lines: ["Now I'm expecting:"], font: 'body', x: L, y: V(300, 600), size: V(90, 80), times: k3.strat.w.slice(0, 3) });
    KR(t, { lines: ['Practical', 'academic', 'strategy.'], x: L - 6, y: V(500, 820), size: V(250, 170), lh: 0.9, times: k3.strat.w.slice(3) });
  }, { id: 'ch3-strategy', grid: true, push: 0.03 });
  sRise(k3.strat.w[3], -6); sImp(k3.strat.w[3], -2);

  /* ---------- 14 · chapter four: thinking, writing, reading as a Venn ---------- */
  const k4 = PS({ c4: 'and then chapter four', conn: 'the connection between critical thinking critical writing critical reading', tog: 'how everything comes together', q1: 'is it possible to think critically but not write critically', q2: 'is it possible to do one or the other', q3: 'or are they bundled together', dk: "i don't know yet", ant: 'this author has the answer' });
  /** venn(t, cx, cy, r, sep 0..1 (0 = overlapping, 1 = apart), o) */
  const venn = (t, cx, cy, r, sep, o = {}) => {
    const lab = ['Thinking', 'Writing', 'Reading']; const ang = [-Math.PI / 2 - 0.0, Math.PI / 6, Math.PI * 5 / 6];
    const off = (i) => { const s = (o.seps ? o.seps[i] : sep); const d = r * (0.55 + 0.75 * s); return [cx + Math.cos(ang[i]) * d, cy + Math.sin(ang[i]) * d]; };
    if (o.fill > 0) { ctx.save(); const P0 = off(0); ctx.beginPath(); ctx.arc(P0[0], P0[1], r, 0, Math.PI * 2); ctx.clip(); const P1 = off(1); ctx.beginPath(); ctx.arc(P1[0], P1[1], r, 0, Math.PI * 2); ctx.clip(); const P2 = off(2); ctx.beginPath(); ctx.arc(P2[0], P2[1], r, 0, Math.PI * 2); ctx.fillStyle = hexA(o.fillCol || C.blue, o.fill); ctx.fill(); ctx.restore(); }
    for (let i = 0; i < 3; i++) { const a = o.tin ? prog(t, o.tin[i], 0.5) : 1; if (a <= 0) continue; const [x, y] = off(i); withA(a, () => { ctx.beginPath(); ctx.arc(x, y, r * (0.6 + 0.4 * E.outBack(a, 1.4)), 0, Math.PI * 2); ctx.strokeStyle = o.hiIdx === i ? (o.col2 || C.blue) : (o.col || g.fg); ctx.lineWidth = o.hiIdx === i ? 8 : 5; ctx.stroke(); }); }
    for (let i = 0; i < 3; i++) { const a = o.tin ? prog(t, o.tin[i], 0.5) : 1; if (a <= 0) continue; const [x, y] = off(i); withA(a, () => { { const lx_ = x + Math.cos(ang[i]) * r * 1.32, ly_ = y + Math.sin(ang[i]) * r * 1.22, fs_ = Math.max(18, r * 0.12); const ww_ = monoW(lab[i], fs_, { fixed: true }) + 14; rect(lx_ - ww_ / 2, ly_ - fs_ * 0.7, ww_, fs_ * 1.4, g.bg); } mono(lab[i], x + Math.cos(ang[i]) * r * 1.32, y + Math.sin(ang[i]) * r * 1.22 + 8, Math.max(18, r * 0.12), o.hiIdx === i ? (o.col2 || C.blue) : (o.col || g.fg), 'center', { ls: 0.14, fixed: true }); }); }
    if (o.q > 0) withA(o.q, () => _txt('?', cx, cy + r * 0.28, F.disp(r * 0.8 * E.outBack(clamp(o.q), 2)), o.qCol || C.blue, 'center'));
  };
  addS(S(k4.c4), 'ink', '// 13 — chapter 04', (t) => {
    beat(t, 0, k4.conn.w[3] - 0.12, () => KR(t, { lines: ['Chapter *04.*'], x: L - 4, y: V(600, 760), size: V(240, 180), times: [k4.c4.w[2], k4.c4.w[3]] }));
    const c = k4.conn.w;
    KR(t, { lines: V(['_Critical_ thinking.', '_Critical_ writing.', '_Critical_ reading.'], ['_Critical_ thinking.', '_Critical_ writing.', '_Critical_ reading.']), x: L - 4, y: V(420, 600), size: V(120, 96), lh: 1.0, times: c.slice(3, 9) });
    const sep = 1 - E.inOutCubic(prog(t, k4.tog.w[1], 1.0));
    venn(t, V(1480, 540), V(560, 1170), V(150, 140), sep, { tin: [c[4], c[6], c[8]], fill: 0.85 * E.outCubic(prog(t, k4.tog.w[3], 0.6)), fillCol: C.blueT, col: C.paper });
    withA(prog(t, k4.tog.w[3], 0.3), () => mono('Together?', V(1480, 540), V(980, 1440), 28, C.blueT, 'center', { ls: 0.2 }));
  }, { id: 'ch4' });
  sPop(k4.conn.w[4], -3); sPop(k4.conn.w[6], -3); sPop(k4.conn.w[8], -3); sWh(k4.tog.w[1] + 0.5, -6); sImp(k4.tog.w[3], -10);
  addS(S(k4.q1, 1.6), 'paper', '// 13 — chapter 04', (t) => {
    KR(t, { lines: ["Questions I'm already asking:"], font: 'body', x: L, y: V(260, 470), size: V(70, 62), times: TM({ t: S(k4.q1, 1.6) + 0.1, w: [S(k4.q1, 1.6) + 0.1, k4.q1.t - 0.2] }, 4) });
    IDX(t, [
      { n: 'Q1', s: 'Think critically, but not write critically?', tin: k4.q1.w[3] },
      { n: 'Q2', s: 'Do one, but not the other?', tin: k4.q2.w[4] },
      { n: 'Q3', s: 'Or are they bundled together?', tin: k4.q3.t },
    ], { x: L, y: V(420, 1050), w: V(1040, W - 2 * L), rowH: V(150, 130), size: V(50, 52), numW: V(110, 90), font: 'body', weight: 700, focus: (tt) => (tt >= k4.dk.t ? -1 : tt >= k4.q3.t ? 2 : tt >= k4.q2.w[4] ? 1 : 0) });
    // the Venn answers each question: apart (Q1), one alone (Q2), bundled (Q3), then a question mark
    const q1 = E.inOutCubic(prog(t, k4.q1.w[8], 0.8)), q3 = E.inOutCubic(prog(t, k4.q3.w[3], 0.8));
    const seps = [0.15 + 0.85 * q1 * (1 - q3) - 0.15 * q3, 0.15 + 0.85 * q1 * (1 - q3) - 0.15 * q3, 0.15 - 0.15 * q3].map(v => Math.max(0, v));
    venn(t, V(1550, 540), V(560, 800), V(120, 105), 0, { seps, hiIdx: t >= k4.q2.w[4] && t < k4.q3.t ? 0 : -1, fill: 0.9 * q3, q: prog(t, k4.dk.w[1], 0.4), qCol: C.card });
    const dk = "I don't know yet —";
    withA(prog(t, k4.dk.t, 0.3), () => mono(dk, L + 6, V(930, 1390), 26, g.mid, 'left', { ls: 0.2 }));
    const bkp = landAt(t, k4.ant.w[1], V(1700, 900), V(860, 660), { dy: 60, r: 0.2 }); if (bkp.p > 0) withA(bkp.a, () => imgCard(IMG.bookB, bkp.x - V(80, 70), bkp.y - V(110, 100), V(160, 140), { rot: 0.06 + bkp.r, pad: 8, key: 'answer book' }));
    withA(prog(t, k4.ant.w[3], 0.3), () => mono('I expect the author has the answer.', V(L + 6 + monoW(dk, 26, { ls: 0.2 }) + 16, L + 6), V(930, 1430), 26, C.blue, 'left', { ls: 0.2 }));
  }, { id: 'ch4-questions' });
  sPop(k4.q1.w[3], -3); sWh(k4.q1.w[8] + 0.3, -7); sPop(k4.q2.w[4], -3); sPop(k4.q3.t, -3); sWh(k4.q3.w[3] + 0.3, -7); sPop(k4.dk.w[1] + 0.1, -1); sTick(k4.ant.w[3], -5); sCard(k4.ant.w[1], -2);

  /* ---------- 15 · chapters five to seven: a block (the map's blocks merge) ---------- */
  const k5 = PS({ five: 'chapter five six seven', ess: 'essay dissertation assessment', block: 'in my head that feels like a block', struct: 'the whole block is about structure', org: 'how do you organize your essay', add: 'additional assessment parts', seven: 'chapter seven', poster: 'poster presentation', oral: 'oral presentation', still: 'still everything feels like a block to me' });
  addS(S(k5.five), 'paper', '// 14 — chapters 05–07', (t) => {
    [[k5.ess.w[0], k5.ess.w[1]], [k5.ess.w[1], k5.ess.w[2]], [k5.ess.w[2], k5.ess.e], [k5.seven.t, k5.seven.e + 0.3]].forEach(([a, b], j) => { const i = j === 3 ? 2 : j; const fs = V(48, 38); sweep(t, L + V(100, 70) - 8, V(360, 1180) + i * V(110, 76) - fs * 0.95, tw(BARATTA[4 + i], F.body(fs, 700)) + 16, fs * 1.3, a - 0.1, b, MC(j === 3 ? 'rgba(27,63,216,0.34)' : 'rgba(27,63,216,0.26)')); });
    const r57 = () => { const fs = V(48, 38), f = F.body(fs, 700), ls = fs * LS.body, nx = L + V(100, 70); [[0, k5.org.w[2], k5.org.e + 0.2], [2, k5.add.w[1], k5.add.e + 0.1]].forEach(([i, a, b]) => { const y = V(360, 1180) + i * V(110, 76); if (t < k5.still.t) inkSweep(t, nx - 8, y - fs * 0.92, tw(BARATTA[4 + i], f, ls) + 16, fs * 1.2, a, b, (c) => _txt(BARATTA[4 + i], nx, y, f, c, 'left', 'alphabetic', ls)); }); };
    IDX(t, [4, 5, 6].map((i, j) => ({ n: pad2(i + 1), s: BARATTA[i], tin: k5.five.w[1 + j] })), { x: L, y: V(360, 1180), w: V(1000, W - 2 * L), rowH: V(110, 76), size: V(48, 38), numW: V(100, 70), numSize: V(32, 26), font: 'body', weight: 700, focus: (tt) => (tt >= k5.add.t && tt < k5.still.t ? 2 : -1) });
    withA(prog(t, k5.org.w[3], 0.3) * (1 - prog(t, k5.add.t - 0.2, 0.2)), () => mono('How do you organise your essay?', L + 6, V(970, 1420), 26, C.blue, 'left', { ls: 0.2 }));
    r57();
    KR(t, { lines: V(['A *block:* structure.'], ['A *block:*', 'structure.']), x: L - 4, y: V(800, 560), size: V(120, 110), times: [k5.block.w[6], k5.block.w[7], k5.struct.w[5], k5.struct.w[5]] });
    // the map: chapters 05-07 slide together into one block
    const ol = prog(t, k5.org.w[3], 0.6); if (ol > 0) { const bx = V(1240, 600), by = V(230, 720) + 4 * V(64, 42), bw = V(570, 400), bh = 3 * V(64, 42); withA(ol, () => { for (let r = 0; r < 3; r++) rect(bx + bw * 0.12, by + bh * (0.62 + r * 0.12), bw * [0.5, 0.76, 0.42][r] * E.outCubic(clamp(ol * 3 - r)), 6, C.card); }); }
    cmap(t, V(1240, 600), V(230, 720), V(570, 400), V(64, 42), { bare: true, t0: k5.five.t - 0.4, tin: Array.from({ length: 10 }, (_, i) => k5.five.t - 0.4 + i * 0.05), focus: (i) => (i >= 4 && i <= 6 ? 1 : 0.5), merge: { a: 4, b: 6, t: k5.block.w[7], label: 'STRUCTURE' } });
    // poster and oral presentation: two small illustrated cards
    [['Poster', k5.poster.t, 0], ['Oral', k5.oral.t, 1]].forEach(([s_, ti, i]) => { const P0 = V([[1090, 905], [1470, 905]], [[L, 760], [L, 900]])[i]; const p = landAt(t, ti, P0[0], P0[1], { dy: 40, d: 0.45 }); if (p.p <= 0) return; const cw = V(340, 460);
      withA(p.a * (t >= k5.still.t ? 0.45 : 1), () => grp(s_ + ' presentation', p.x, p.y, cw, 100, () => { const x = p.x, y = p.y; rect(x, y, cw, 100, C.card); strokeR(x, y, cw, 100, C.ink, 3);
        mono(s_ + ' presentation', x + 28, y + 60, 22, C.ink, 'left', { ls: 0.12, fixed: true, maxW: cw - 40 }); })); });
  }, { id: 'ch5-7' });
  [0, 1, 2].forEach(j => sPop(k5.five.w[1 + j], -4)); sImp(k5.block.w[7], -8); sWh(k5.block.w[7] + 0.2, -6); sPen(k5.ess.w[0], -6); sPen(k5.ess.w[1], -7); sPen(k5.ess.w[2], -7); sPen(k5.org.w[2], -3); sPen(k5.add.w[1], -3); sPen(k5.seven.t, -6); sCard(k5.poster.t, -2); sCard(k5.oral.t, -2); sPop(k5.still.w[5], -5);

  /* ---------- 16 · chapters eight to ten ---------- */
  const k6 = PS({ eight: 'and then chapter eight nine and ten', ch8: 'four ways to approach interpretation', head: "in my head i'm thinking when someone says something", mind: 'where should my mind go to first', act: 'actually i interpret what people say', ctx: 'do i interpret contextually', form: "i'm already forming something up in my head", four: 'the four approaches are agreement disagreement illustration and explanation', ch9: 'the next chapter is how to use quotes paraphrase and summarize', plag: 'plagiarism direct quotation', ch10: 'the last chapter is how to use critical language in your assessment', hedge: 'there is hedging', why: 'why do we hedge', dk: "i don't know what that is yet", cl: "oh there's critical language", are: 'so there are languages that are critical', not: 'there are languages that are not critical', dk2: "i don't know yet" });
  addS(S(k6.eight), 'paper', '// 15 — chapters 08–10', (t) => {
    IDX(t, [7, 8, 9].map((i, j) => ({ n: pad2(i + 1), s: BARATTA[i], tin: [k6.eight.w[3], k6.eight.w[4], k6.eight.w[6]][j] })), { x: L, y: V(380, 1080), w: V(1060, W - 2 * L), rowH: V(150, 130), size: V(44, 40), numW: V(100, 76), font: 'body', weight: 700, focus: (tt) => (tt >= k6.ch8.t ? 0 : -1) });
    cmap(t, V(1240, 560), V(230, 560), V(570, 440), V(64, 44), { bare: true, tin: Array.from({ length: 10 }, (_, i) => k6.eight.t - 0.3 + i * 0.04), focus: (i) => (i >= 7 ? 1 : 0.4), merge: { a: 4, b: 6, t: -1, label: 'STRUCTURE' }, hi: { 7: k6.ch8.t } });
  }, { id: 'ch8-10' });
  sPop(k6.eight.w[3], -3); sPop(k6.eight.w[4], -3); sPop(k6.eight.w[6], -3); sPen(k6.ch8.t, -4);
  // when someone says something: a bubble that branches into ways to read it
  addS(S(k6.head, 0.2), 'ink', '// 15 — chapter 08', (t) => {
    KT(t, { lines: V(['Where should my mind', 'go ~first?~'], ['Where should my', 'mind go ~first?~']), font: 'body', x: L, y: V(340, 580), size: V(80, 80), times: [...k6.mind.w.slice(0, 5), k6.mind.w[6]] });
    const bp = landAt(t, k6.head.t, V(L, L), V(560, 770), { dy: 40, d: 0.45 }); if (bp.p > 0) withA(bp.a, () => bubble(bp.x, bp.y, V(560, 600), '“…”', { size: 90, fit: false, bg: C.paper, fg: C.ink, key: 'someone says' }));
    const ox = V(L + 560, L + 600), oy = V(640, 830); const outs = V([[1150, 500], [1250, 660], [1150, 820], [1250, 960]], [[300, 1080], [640, 1080], [300, 1300], [640, 1300]]);
    const labs = ['?', 'Contextually?', '?', '?'];
    outs.forEach(([x, y], i) => { const ti = k6.mind.w[6] + 0.2 + i * 0.15; const p = ease(t, ti, 0.5, E.outCubic); if (p <= 0) return; pline(ox, oy, x, y, p, C.inkMid, 3);
      const q = prog(t, ti + 0.3, 0.35); if (q <= 0) return; const on = i === 1 && t >= k6.ctx.w[3]; const fm = i === 3 && t >= k6.form.w[3]; const bw = V(i === 1 ? 420 : 160, i === 1 ? 340 : 140);
      withA(q, () => withT(x, y, 0.7 + 0.3 * E.outBack(q, 1.6), 0, () => { rect(0, -40, bw, 80, on ? C.blueT : fm ? C.paper : C.inkLine); strokeR(0, -40, bw, 80, on ? C.blueT : C.paper, 3); _txt(on ? 'CONTEXTUALLY?' : (fm ? '…' : '?'), bw / 2, 12, on ? F.mono(V(30, 26), 500) : F.disp(44), on || fm ? C.ink : C.paper, 'center', 'alphabetic', on ? 4 : 0); })); });
  }, { id: 'ch8-head' });
  sPop(k6.head.t + 0.1, -2); [0, 1, 2, 3].forEach(i => sPen(k6.mind.w[6] + 0.2 + i * 0.15, -10)); [0, 1, 2, 3].forEach(i => sPop(k6.mind.w[6] + 0.55 + i * 0.15, -8)); sClick(k6.ctx.w[3], -1); sPop(k6.form.w[3], -5); sTick(k6.act.w[2], -5);
  addS(S(k6.four, 1.2), 'paper', '// 15 — chapter 08', (t) => {
    for (let i = 0; i < 4; i++) { const q = prog(t, S(k6.four, 1.2) + 0.05 + i * 0.08, 0.35); if (q <= 0) continue; const x = V(L + (i % 2) * 860, L), y = V(270 + Math.floor(i / 2) * 370, 560 + i * 218), cw = V(830, 920), ch = V(330, 196); withA(q, () => rect(x, y, cw, ch, C.panel)); }
    { const ho = 1 - prog(t, k6.four.w[4] - 0.2, 0.25); if (ho > 0) withA(ho, () => KR(t, { lines: V(['*Four* approaches.'], ['*Four*', 'approaches.']), x: L - 4, y: V(560, 880), size: V(170, 150), times: [S(k6.four, 1.2) + 0.15, k6.four.w[2]] })); }
    ['Agreement', 'Disagreement', 'Illustration', 'Explanation'].forEach((s, i) => {
      const ti = [k6.four.w[4], k6.four.w[5], k6.four.w[6], k6.four.w[8]][i]; const p = sn(t, ti, 0.4); if (p <= 0) return;
      const x = V(L + (i % 2) * 860, L), y = V(270 + Math.floor(i / 2) * 370, 560 + i * 218) + 40 * (1 - p), cw = V(830, 920), ch = V(330, 196), ts = V(104, 92);
      withA(clamp(p * 2), () => grp('card ' + s, x, y, cw, ch, () => withT(x + cw / 2, y + ch / 2, 1, (1 - p) * (i % 2 ? 0.08 : -0.08), () => { rect(-cw / 2, -ch / 2, cw, ch, i === 3 && t > ti + 0.6 ? C.ink : C.card); strokeR(-cw / 2, -ch / 2, cw, ch, C.ink, 4); mono(pad2(i + 1), -cw / 2 + 44, -ch / 2 + V(70, 56), 26, C.blue, 'left', { ls: 0.06, raw: true }); txt(s.toUpperCase(), -cw / 2 + 40, -ch / 2 + V(270, 160), F.disp(ts), i === 3 && t > ti + 0.6 ? C.card : C.ink, 'left', 'alphabetic', ts * LS.disp); })));
    });
    withA(prog(t, k6.four.e + 0.9, 0.3), () => mono('Those are the four approaches', L + 6, V(1020, 1440), 24, C.blue, 'left', { ls: 0.2 }));
  }, { id: 'ch8-four' });
  [0, 1, 2, 3].forEach(i => sTick(S(k6.four, 1.2) + 0.1 + i * 0.08, -9)); [4, 5, 6, 8].forEach(i => { sCard(k6.four.w[i], -2); sPop(k6.four.w[i] + 0.05, -6); });
  addS(S(k6.ch9), 'ink', '// 16 — chapter 09', (t) => {
    KR(t, { lines: V(['How to use quotes,', 'paraphrase', '& *summarise.*'], ['How to use', 'quotes,', 'paraphrase', '& *summarise.*']), x: L - 4, y: V(430, 660), size: V(130, 120), times: [k6.ch9.t + 0.05, ...k6.ch9.w.slice(5, 8), k6.ch9.w[8], k6.ch9.w[9], k6.ch9.w[10]] });
    // giant quote marks
    const qp = prog(t, k6.ch9.t, 0.5); if (qp > 0) withA(clamp(qp * 2), () => _txt('“ ”', V(1560, 760), V(560 + 60 * (1 - E.outQuint(qp)), 1300 + 60 * (1 - E.outQuint(qp))), F.serif(V(420, 300)), C.blueT, 'center'));
    [['Plagiarism', k6.plag.w[0]], ['Direct quotation', k6.plag.w[1]]].forEach(([s, ti], i) => { const p = sn(t, ti, 0.35); if (p <= 0) return; withA(clamp(p * 2), () => { const x = L + i * V(420, 350), y = V(870, 1250); const w = monoW(s, 30) + 60; rect(x, y + 8 * (1 - p), w, 72, i ? C.paper : C.inkPanel); strokeR(x, y + 8 * (1 - p), w, 72, C.paper, 3); mono(s, x + 30, y + 47 + 8 * (1 - p), 30, i ? C.ink : C.paper, 'left'); }); });
  }, { id: 'ch9' });
  sPop(k6.ch9.t + 0.1, -2); sPop(k6.plag.w[0], -3); sPop(k6.plag.w[1], -3);
  addS(S(k6.ch10), 'paper', '// 17 — chapter 10', (t) => {
    beat(t, 0, k6.hedge.t - 0.1, () => KR(t, { lines: ['The last chapter:'], font: 'body', x: L, y: V(290, 520), size: V(90, 80), times: TM({ t: k6.ch10.t, w: k6.ch10.w.slice(0, 3) }, 3) }));
    beat(t, 0, k6.hedge.t - 0.1, () => KR(t, { lines: V(['How to use', '*critical* language.'], ['How to use', '*critical*', 'language.']), x: L - 4, y: V(470, 700), size: V(150, 140), times: k6.ch10.w.slice(4, 9) }));
    beat(t, k6.hedge.t - 0.1, k6.cl.w[2] + 0.15, () => {
      KR(t, { lines: ['There is'], font: 'body', x: L, y: V(420, 540), size: 90, times: k6.hedge.w.slice(0, 2) });
      KR(t, { lines: ['~hedging.~'], font: 'serif', x: L - 6, y: V(640, 740), size: V(230, 200), times: [k6.hedge.w[2]] });
      // a blank dictionary entry: she doesn't know yet
      const p = landAt(t, k6.why.t, V(980, L), V(250, 900), { dy: 50 }); if (p.p > 0) withA(p.a, () => withT(p.x, p.y, V(0.9, 1), 0, () => { dict(t, null, 0, 0, 'hedging', { pos: 'n.', noSlots: true }); const bq = prog(t, k6.dk.w[3], 0.4); if (bq > 0) withA(clamp(bq * 3), () => _txt('?', V(700, 720), V(470, 440), F.disp(V(220, 190) * E.outBack(bq, 1.8)), C.blue, 'center')); }));
      withA(prog(t, k6.why.t, 0.3), () => mono('Why do we hedge?', L + 6, V(780, 860), 30, g.fg, 'left', { ls: 0.2 }));
    });
    beat(t, k6.cl.w[2] - 0.1, 1e9, () => {
      beat(t, k6.cl.t - 0.1, k6.are.w[6] - 0.1, () => KR(t, { lines: ['Critical', '*language.*'], x: L - 4, y: V(560, 760), size: V(200, 170), times: [k6.cl.w[2], k6.cl.w[3]] }));
      const cw = V(830, 920), ch = V(420, 320), ts = V(120, 104);
      const col = (x, y0, s, ti, dim) => { const p = sn(t, ti, 0.4); if (p <= 0) return; withA(clamp(p * 2), () => { const y = y0 + 40 * (1 - p); grp('column ' + s, x, y, cw, ch, () => { rect(x, y, cw, ch, dim ? C.paper : C.ink); strokeR(x, y, cw, ch, C.ink, 4); mono(dim ? 'Perhaps' : 'Language that is', x + 44, y + 72, 24, dim ? C.blue : C.blueT, 'left', { ls: 0.16 }); txt(s.toUpperCase(), x + 40, y + ch - V(80, 64), F.disp(ts), dim ? C.mid : C.paper, 'left', 'alphabetic', ts * LS.disp); }); }); };
      col(L, V(400, 600), 'Critical', k6.are.w[6], false); col(V(L + 860, L), V(400, 960), 'Not critical', k6.not.w[5], true);
      withA(prog(t, k6.dk2.t, 0.3), () => mono("I don't know yet.", L + 6, V(900, 1340), 26, g.mid, 'left', { ls: 0.2 }));
    });
  }, { id: 'ch10' });
  sPop(k6.ch10.w[6], -4); sImp(k6.hedge.w[2], -10); sPen(k6.hedge.w[2] + 0.6, -3); sCard(k6.why.t); sPop(k6.dk.w[3], -3); sImp(k6.cl.w[3], -10); sCard(k6.are.w[6]); sCard(k6.not.w[5]); sPop(k6.dk2.t, -6);

  /* ---------- 17 · still my guess ---------- */
  const k7 = PS({ guess: 'all of these are still my guess', find: "i'm reading to find out", right: 'am i right or am i wrong', retain: "i'm able to retain more ideas now because my mind is expecting things", pos: 'my mind has a position now' });
  addS(S(k7.guess), 'paper', '// 18 — my guess', (t) => {
    KR(t, { lines: V(['All of these are', 'still ~my guess.~'], ['All of these', 'are still', '~my guess.~']), font: 'body', x: L, y: V(330, 520), size: V(100, 110), times: k7.guess.w });
    withA(prog(t, k7.find.w[1], 0.3), () => mono("Now when I read, I'm reading to find out", L + 6, V(560, 860), 26, g.mid, 'left', { ls: 0.2, maxW: V(undefined, 920) }));
    [['Right?', k7.right.w[2], V(L, L), V(700, 960)], ['Wrong?', k7.right.w[6], V(L + 420, L + 440), V(700, 960)]].forEach(([s, ti, x, y]) => { const p = sn(t, ti, 0.35); if (p <= 0) return; withA(clamp(p * 2), () => { checkbox(x, y, 64, 0); txt(s.toUpperCase(), x + 100, y + 60, F.disp(90), g.fg, 'left', 'alphabetic', 90 * LS.disp); }); });
    // every block of the map is still a guess
    cmap(t, V(1240, L), V(230, 1060), V(570, W - 2 * L), V(64, 38), { tin: Array.from({ length: 10 }, (_, i) => k7.guess.t + i * 0.04), q: k7.guess.w[5], merge: { a: 4, b: 6, t: -1, label: 'STRUCTURE' } });
  }, { id: 'my-guess' });
  sPen(k7.guess.w[5] + 0.4, -4); for (let i = 0; i < 10; i += 3) sTick(k7.guess.w[5] + i * 0.06, -6); sClick(k7.right.w[2], -2); sClick(k7.right.w[6], -2);
  // the crosshair from "pinpoint" finally locks: a position
  addS(S(k7.retain), 'ink', '// 18 — my guess', (t) => {
    KT(t, { lines: V(['I retain more ideas:', 'my mind is ~expecting~ things.'], ['I retain more ideas:', 'my mind is', '~expecting~ things.']), font: 'body', x: L, y: V(250, 470), size: V(64, 68), times: [...pick(k7.retain, [0, 3, 4, 5]), ...k7.retain.w.slice(8, 13)] });
    KR(t, { lines: V(['My mind has', 'a *position.*'], ['My mind', 'has a', '*position.*']), x: L - 6, y: V(560, 760), size: V(200, 130), times: [...k7.pos.w.slice(0, 3), k7.pos.w[3], k7.pos.w[4]] });
    const px = V(1360, L), py = V(330, 1060), pw = V(450, W - 2 * L), ph = V(560, 370); const ap = ease(t, k7.retain.t, 0.5);
    if (ap > 0) withA(ap, () => { rect(px, py, pw, ph, C.card); for (let r = 0; r < 8; r++) { const ry = py + 60 + r * (ph - 100) / 8; const on = r === 4 && t >= k7.pos.w[4]; if (on) rect(px + 30, ry - 8, pw - 60, 34, C.blue); fitTxt(BARATTA[r], px + 40, ry + 16, F.body(V(18, 20), 600), on ? C.card : C.ink, pw - 80); } });
    const lk = prog(t, k7.pos.w[4] - 0.1, 0.4); const tx = px + pw * 0.5, ty = py + 60 + 4 * (ph - 100) / 8 + 8;
    if (ap > 0) { const k2_ = E.inOutCubic(prog(t, k7.retain.w[8], k7.pos.w[4] - k7.retain.w[8] - 0.1)); const cx = lerp(px + pw * 0.2, tx, k2_) + 30 * Math.sin(k2_ * 9) * (1 - k2_), cy = lerp(py + ph * 0.85, ty, k2_);
      crosshair(cx, cy, V(100, 92), C.blueT, lk); }
  }, { id: 'position' });
  sCard(k7.retain.t, -4); sWh(k7.retain.w[8] + 0.4, -12); sClick(k7.pos.w[4], 0); sImp(k7.pos.w[4] + 0.02, -6);
}
