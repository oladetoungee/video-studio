/* Blink film, part 2 (1:39 - 5:03): TechCabal's drawback, searchable by anyone, open data and balance, consent,
 * minimisation (the column-lock fold), the minimal answer, access levels, culture (calm register), reciprocity, the close. */
'use strict';

/** a balance scale: beam rotated by ang, pans hung from both ends; drawL / drawR(x, panTopY) */
function bScale(cx, cy, beamW, ang, drawL, drawR) {
  const col = BL.ink; rect(cx - 5, cy, 10, V(260, 260), col); fillRR(cx - 90, cy + V(260, 260), 180, 12, 6, col);
  const ex = Math.cos(ang) * beamW / 2, ey = Math.sin(ang) * beamW / 2; pline(cx - ex, cy - ey, cx + ex, cy + ey, 1, col, 8); circle(cx, cy, 13, col);
  [[cx - ex, cy - ey, drawL], [cx + ex, cy + ey, drawR]].forEach(([px, py, dr]) => { const hang = V(120, 110), pw = V(300, 260); pline(px, py, px - pw * 0.42, py + hang, 1, col, 2); pline(px, py, px + pw * 0.42, py + hang, 1, col, 2); fillRR(px - pw / 2, py + hang, pw, 10, 5, col); dr(px, py + hang); });
}
/** a simple phone outline with a body callback */
function bPhone(x, y, w, h, body) { fillRR(x, y, w, h, w * 0.14, BL.ink); ctx.save(); rr(x + 10, y + 10, w - 20, h - 20, w * 0.11); ctx.clip(); rect(x + 10, y + 10, w - 20, h - 20, BL.card); if (body) body(x + 10, y + 10, w - 20, h - 20); ctx.restore(); fillRR(x + w / 2 - w * 0.16, y + 22, w * 0.32, 14, 7, BL.ink); }
const MF_CREDIT = 'Screenshot · Marrify homepage · 1 Oct 2026';

function buildB2() {
  const k = PS({
    raise: 'the drawback that techcabal raised which is that marriage and divorce records are sensitive private data',
    pers: "i don't know like a divorce record is a personal thing about someone's life",
    srch: 'and now that record is searchable by anyone that has your name',
    od: "and i'm saying this as someone that likes open data",
    biz: 'in estonia you can search online and find businesses',
    bizc: "you can check how much a business like you don't know anything about",
    year: 'you can look up how much they made in a year',
    fine: "and that's fine i think because if business is a public entity that takes public money holds public accountability",
    div: "but maybe in the case of a divorce it's a little bit different",
    think: 'so that really got me thinking about the drawbacks of course',
    know: "i don't really know because i love the idea of open data but i also really don't know how to balance it well with personal data and privacy issues",
  });
  const cardC = () => [CX, V(560, 900)];

  /* ---------- 17 · the drawback TechCabal raised (iris opens on the real paragraph) ---------- */
  addB(S(k.raise), (t) => {
    const w = k.raise.w;
    bh(t, { lines: ['The drawback TechCabal raised:'], x: CX, y: V(175, 470), size: V(64, 60), align: 'center', t0: w[1] - 0.05, stagger: 0.03, col: BL.grey, id: 'tc raised' });
    const cw = V(1640, 960), cx = CX - cw / 2; const z = 1 + 0.04 * ease(t, w[13], 1.5, E.outCubic);
    withT(CX, V(470, 700), z, 0, () => { ctx.translate(-CX, -V(470, 700)); sourceCard(IMG.tc_column, cx, V(440, 600), cw, { crop: V([20, 2366, 1170, 2470], [20, 2366, 1170, 2520]), credit: TC.credit, key: 'tc sensitive', over: (M) => { highlight(t, w[1], 0.45, TC.lead, M, BL.hiRed); highlight(t, w[13] - 0.05, 1.1, TC.sensitive, M, BL.hi); } }); });
    bh(t, { fx: 'pop', lines: V(['Sensitive *personal information.*'], ['Sensitive', '*personal information.*']), x: CX, y: V(800, 1140), size: V(92, 84), align: 'center', t0: w[13] - 0.05, stagger: 0.09, acc: BL.red, id: 'sensitive info' });
    withA(ease(t, w[13] + 0.4, 0.4), () => bmono("TechCabal's words", CX, V(880, 1330), V(26, 26), { align: 'center' }));
  }, { id: 'sensitive', iris: cardC });
  sPen(k.raise.w[1], -2); sPen(k.raise.w[13], -1); sImp(k.raise.w[13] + 0.1, -12);

  /* ---------- 18 · a divorce record is a personal thing (calm: it sleeps) ---------- */
  addB(S(k.pers), (t) => {
    const w = k.pers.w; const t0 = S(k.pers);
    const br = 1 + 0.015 * Math.sin(t * 2.2);
    critter('folder', BL.sand, CX, V(620, 1050), V(300, 320), { s: popS(t, t0 + 0.05, 1.6, 0.7) * br, open: 0, key: 'sleeping record' });
    withA(ease(t, t0 + 0.6, 0.6), () => bmono('A divorce record', CX, V(690, 1110), V(28, 28), { align: 'center' }));
    bh(t, { fx: 'rise', lines: V(["A divorce record is a *personal* thing about someone's life."], ['A divorce record is', 'a *personal* thing about', "someone's life."]), x: CX, y: V(860, 1330), size: V(62, 60), align: 'center', t0: w[5] - 0.1, stagger: 0.07, dur: 0.8, acc: BL.red, id: 'personal thing' });
  }, { id: 'personal', push: 0.01 });
  sPop(S(k.pers) + 0.2, -8);

  /* ---------- 19 · searchable by anyone that has your name (the REAL Marrify search box; faces gather) ---------- */
  addB(S(k.srch), (t) => {
    const w = k.srch.w; const t0 = S(k.srch);
    bh(t, { fx: 'pop', lines: ['Searchable by *anyone*', 'that has your name.'], noWrap: true, x: CX, y: V(175, 470), size: V(72, 68), align: 'center', t0: w[5] - 0.05, stagger: 0.09, acc: BL.red, id: 'searchable anyone' });
    const cw = V(1300, 920), cx = CX - cw / 2, cy = V(480, 760);
    const sp = springIn(t, t0 + 0.04, cx, cy, { dy: 100 });
    let box = null; if (sp.p > 0) withA(clamp(sp.p * 3), () => { box = sourceCard(IMG.mf_search, cx, sp.y, cw, { credit: MF_CREDIT, key: 'marrify search' }); });
    const bcx = CX, bcy = cy + V(110, 105);
    const n = V(16, 14); const faces = [];
    for (let i = 0; i < n; i++) {
      const a = (i / n) * Math.PI * 2 + 0.2 + (hash(i) - 0.5) * 0.2; const rx = V(880, 500), ry = V(400, 520);
      const x = bcx + Math.cos(a) * rx * (0.9 + hash(i + 4) * 0.15), y = bcy + Math.sin(a) * ry * (0.9 + hash(i + 8) * 0.15);
      if (y < V(330, 630) || y > V(1120, 1450)) continue;
      faces.push({ x, y, r: V(64, 56) * (0.85 + hash(i + 2) * 0.3), t0: w[7] - 0.15 + ((i * 5) % n) * 0.035, seed: i * 2.1, look: lookAt(x, y, bcx, bcy) });
    }
    crowd(t, faces, { f: 1.9, z: 0.6 });
  }, { id: 'searchable' });
  sPop(S(k.srch) + 0.1, -3); sPop(k.srch.w[5], -6); sCrowd(k.srch.w[7] - 0.1, -2); [0, 0.15, 0.3].forEach(d => sPop(k.srch.w[7] + d, -6));

  /* ---------- 20 · I like open data: in Estonia you can look up a business ---------- */
  addB(S(k.od), (t) => {
    const w = k.od.w, b = k.biz.w, c = k.bizc.w, y = k.year.w;
    bh(t, { fx: 'rise', lines: V(["I'm saying this as someone that likes *open data.*"], ["I'm saying this as someone", 'that likes *open data.*']), x: CX, y: V(175, 470), size: V(62, 58), align: 'center', t0: w[2] - 0.05, stagger: 0.03, acc: BL.green, id: 'likes open data' });
    const sx = V(CX - 380, CX - 220), sy = V(800, 1060);
    critter('shop', BL.cobalt, sx, sy, V(320, 230), { s: popS(t, S(k.od)), open: t < b[8] ? 0 : blinkOpen(t, 91), lx: 0.8, ly: -0.2, label: 'A business, in Estonia', labKey: 'biz label', labA: ease(t, b[8], 0.3), key: 'shop' });
    const fs = popS(t, b[1]); if (fs > 0) withT(V(sx - 200, sx - 120), V(sy - 340, sy - 250), fs, -0.1, () => flagB('estonia', -80, -50, 160));
    glyphFace(V(sx - 380, CX + 300), V(sy - 140, sy - 300), V(80, 60), { s: popS(t, b[4] - 0.1), state: faceState(t, 33, { wake: b[4] }), state2: faceState(t - 1 / 30, 33, { wake: b[4] }), lx: V(1, -1), ly: 0.3, key: 'biz searcher' });
    // what you can see: how much it made in a year
    const bx = V(CX + 40, 120), by = V(400, 1240), bw = V(760, 840);
    const p = ease(t, c[3] - 0.1, 0.4); if (p > 0) withA(p, () => grp('revenue card', bx, by, bw, V(250, 150), () => {
      ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.07)'; ctx.shadowBlur = 30; ctx.shadowOffsetY = 10; fillRR(bx, by, bw, V(250, 150), 22, BL.card); ctx.restore();
      bmono('How much it made', bx + 32, by + 56, 26, { col: BL.grey });
      const bars = [0.45, 0.62, 0.8]; bars.forEach((f, i) => { const gp = ease(t, c[3] + i * 0.12, 0.6, E.outCubic); rect(bx + 32 + i * V(90, 120), by + V(220, 130) - V(130, 60) * f * gp, V(64, 90), V(130, 60) * f * gp, i === 2 ? BL.green : MC('#CFE8DA')); });
      withA(ease(t, y[10] - 0.1, 0.3), () => bmono('In a year', bx + V(400, 450), by + V(210, 120), 26, { col: BL.green }));
      bmono('Illustration', bx + bw - 26, by + 52, 18, { align: 'right', key: 'rev tag' });
    }));
  }, { id: 'open-data' });
  sPop(k.od.w[2], -6); sPop(k.biz.w[1], -5); sPop(k.biz.w[4], -5); sPop(k.biz.w[8], -2); sPop(k.bizc.w[3], -4); [0, 0.12, 0.24].forEach(d => sTick(k.bizc.w[3] + d + 0.1, -4));

  /* ---------- 21 · that's fine: a business is a public entity ---------- */
  addB(S(k.fine), (t) => {
    const w = k.fine.w;
    bh(t, { fx: 'cut', lines: ["That's *fine,* because a business:"], x: CX, y: V(175, 480), size: V(70, 66), align: 'center', t0: w[1] - 0.05, stagger: 0.03, acc: BL.green, id: 'thats fine' });
    critter('shop', BL.cobalt, V(CX - 560, CX), V(860, 960), V(300, 230), { s: popS(t, S(k.fine) + 0.05), open: t > w[18] + 0.3 ? 'happy' : blinkOpen(t, 92), lx: V(1, 0), ly: V(-0.2, 0.6), key: 'shop 2' });
    [['Is a public entity', w[11]], ['Takes public money', w[15]], ['Holds public accountability', w[18]]].forEach(([s, tin], i) => bub(t, tin - 0.1, V(CX - 260, 140), V(340 + i * 200, 1040 + i * 140), s, { size: V(46, 40), tick: tin + 0.3, key: 'public ' + i }));
  }, { id: 'public-entity' });
  [11, 15, 18].forEach(i => { sPop(k.fine.w[i] - 0.1, -3); sTick(k.fine.w[i] + 0.35, 0); }); sPop(k.fine.w[2], -6);

  /* ---------- 22 · but a divorce is a little bit different (calm) ---------- */
  addB(k.div.w[0] - 0.15, (t) => {
    const w = k.div.w;
    bh(t, { fx: 'pop', lines: V(["Maybe, in the case of a divorce, it's *a little bit different.*"], ['Maybe, in the case of', "a divorce, it's *a little", 'bit different.*']), x: CX, y: V(200, 480), size: V(64, 64), align: 'center', t0: w[1] - 0.05, stagger: 0.09, dur: 0.75, acc: BL.red, id: 'little different' });
    critter('shop', BL.cobalt, V(CX - 360, CX - 240), V(860, 1150), V(270, 200), { s: 1, open: blinkOpen(t, 93), lx: 0.5, key: 'shop 3' });
    critter('folder', BL.sand, V(CX + 360, CX + 240), V(860, 1150), V(270, 200), { s: popS(t, w[7] - 0.1, 1.6, 0.7), open: t > w[7] + 0.4 ? 'down' : 1, lx: -0.3, key: 'divorce folder' });
    withA(ease(t, w[7], 0.5), () => { bmono('A business', V(CX - 360, CX - 240), V(940, 1220), 28, { align: 'center' }); bmono('A divorce', V(CX + 360, CX + 240), V(940, 1220), 28, { align: 'center' }); });
  }, { id: 'different' });
  sPop(k.div.w[7], -8);

  /* ---------- 23 · I don't really know how to balance it ---------- */
  addB(S(k.think), (t) => {
    const w = k.know.w; const tB = w[20];
    bh(t, { lines: ['That really got me thinking.'], x: CX, y: V(175, 470), size: V(56, 54), align: 'center', t0: k.think.w[3] - 0.05, stagger: 0.03, col: BL.grey, out: w[2] - 0.1, id: 'thinking' });
    bh(t, { fx: 'rise', lines: ["I don't really *know*"], x: CX, y: V(175, 470), size: V(80, 76), align: 'center', t0: w[2] - 0.08, stagger: 0.04, acc: BL.cobalt, out: tB - 0.1, id: 'dont know' });
    bh(t, { fx: 'pop', lines: ['how to *balance* it well.'], x: CX, y: V(175, 470), size: V(80, 76), align: 'center', t0: tB - 0.1, stagger: 0.09, acc: BL.cobalt, id: 'balance it' });
    const lean = -0.14 * ease(t, w[10] + 0.2, 0.8, E.outCubic) + 0.2 * ease(t, w[24] + 0.2, 0.8, E.outCubic);
    const wob = t > tB ? 0.09 * Math.sin((t - tB) * 5.2) * Math.exp(-(t - tB) * 0.5) : 0; const ang = lean + wob;
    const sc = ease(t, S(k.think) + 0.05, 0.5);
    withA(sc, () => bScale(CX, V(470, 960), V(1300, 660), ang, (px, py) => {
      critter('cert', BL.green, px, py, V(180, 130), { s: popS(t, S(k.think) + 0.2), open: t < w[10] ? 0 : blinkOpen(t, 101), lx: 1, ly: 0, label: 'Open data', labKey: 'pan l', labA: ease(t, w[10], 0.3) });
    }, (px, py) => {
      critter('folder', BL.sand, px, py, V(180, 130), { s: popS(t, S(k.think) + 0.3), open: t < w[24] ? 0 : blinkOpen(t, 102), lx: -1, ly: 0, label: 'Personal data, privacy', labKey: 'pan r', labA: ease(t, w[24], 0.3) });
    }));
  }, { id: 'balance' });
  sPop(k.know.w[2], -5); sPop(k.know.w[10], -3); sWh(k.know.w[10] + 0.25, -8); sPop(k.know.w[24], -3); sWh(k.know.w[20] + 0.1, -8);

  buildB2b();
}

function buildB2b() {
  const c = PS({
    cons: "and there's also the consent part of the conversation",
    diff: 'like the difference between a divorce record sitting in a courthouse somewhere in 2003',
    ph: 'and somebody just being able to check it on their phone in three seconds right',
    mini: 'and i was also then thinking about data minimisation',
    idea: 'so the idea of data minimisation is that you expose the minimum amount of data required to answer the question being asked',
    ask: 'so if i ask the question is this person currently free to marry',
    yn: "that's a yes or no answer",
    req: 'answering that question does not require showing when they got married who they married when they divorced which court granted it right',
    play: 'i was also thinking about how data minimisation can come to play here as well',
    could: "could we minimise data to the point where we are not exposing much more than it's been asked for",
    case: 'like in the case of marrify in ghana for example the question is is this person married',
    simple: 'so the answer is simple this person currently has an active marriage on record',
    noth: 'nothing else no name of spouse no dates no history',
  });
  const TBL_LABEL = 'Diagram: placeholder fields, no real records';

  /* ---------- 24 · consent: a record in a courthouse in 2003, a phone in three seconds (calm) ---------- */
  addB(S(c.cons), (t) => {
    const d = c.diff.w, p = c.ph.w;
    bh(t, { lines: ['The *consent* part.'], x: CX, y: V(175, 480), size: V(84, 80), align: 'center', t0: c.cons.w[3] - 0.06, stagger: 0.0, acc: BL.red, fx: 'cut', id: 'consent' });
    const shift = PORTRAIT ? 1 : spring(t - (p[1] - 0.3), 1.6, 0.75); const lx = V(lerp(CX, CX - 480, shift), CX - 260), rx = V(CX + 480, CX + 260), by = V(740, 1060);
    const slide = spring(t - d[7], 1.6, 0.7);
    critter('court', BL.faceD, lx + V(-100 + 170 * slide, 50), by - V(60, 40), V(300, 200), { s: popS(t, S(c.cons) + 0.1, 1.8, 0.65), open: 0, a: 0.9, key: 'court' });
    const woke = t >= p[12];
    critter('folder', BL.sand, lx - V(80, 70) + V(900, -160) * (1 - slide), by + 10, V(170, 150), { s: popS(t, S(c.cons) + 0.3, 1.8, 0.65), open: woke ? 1 : 0, lx: woke ? 1 : 0, ly: woke ? -0.3 : 0, key: 'folder 2003' });
    bh(t, { fx: 'rise', lines: ['2003'], x: lx, y: V(910, 1240), size: V(96, 84), align: 'center', t0: d[13] - 0.05, col: BL.soft, id: '2003' });
    withA(ease(t, d[10], 0.4), () => bmono('In a courthouse, somewhere', lx, V(970, 1300), V(26, 26), { align: 'center' }));
    bh(t, { lines: ['The difference between…'], x: CX, y: V(260, 570), size: V(44, 40), weight: 500, col: BL.grey, align: 'center', t0: d[2] - 0.05, stagger: 0.03, out: d[5] - 0.1, id: 'difference between' });
    { const dv2 = ease(t, d[2], 0.8, E.inOutCubic); if (!PORTRAIT && dv2 > 0) rect(CX - 1, V(420, 0), 2, 480 * dv2, BL.line); }
    withA(ease(t, d[5] - 0.05, 0.4) * (1 - ease(t, d[13] - 0.2, 0.3)), () => bh(t, { lines: ['A divorce record, sitting'], x: CX, y: V(260, 570), size: V(44, 40), weight: 500, col: BL.grey, align: 'center', t0: d[5] - 0.05, stagger: 0.02, id: 'divorce sitting' }));
    // the phone, today
    const pw = V(280, 200), ph2 = V(500, 360); const pp = springIn(t, p[1] - 0.05, rx - pw / 2, by - ph2 + 40, { dy: 160 });
    if (pp.p > 0) withA(clamp(pp.p * 3), () => bPhone(pp.x, pp.y, pw, ph2, (sx, sy, sw, sh) => {
      glyphFace(sx + sw / 2, sy + 90, 44, { state: faceState(t, 44), lx: 0, ly: 0.6 });
      fillRR(sx + 16, sy + 160, sw - 32, 40, 20, BL.field);
      if (t >= p[6]) { const rp = ease(t, p[12], 0.35); withA(rp, () => { critter('folder', BL.sand, sx + sw / 2, sy + sh - 30, 110, { open: 1, lx: -0.5, ly: -0.6 }); }); }
    }));
    if (t >= p[12]) withA(ease(t, p[12], 0.3), () => { counter(t, p[12], p[13] - p[12] + 0.3, 0, 3, rx, V(910, 1240), BF.h(V(96, 84), 600), BL.red, 'center'); bmono('Seconds, on their phone', rx, V(970, 1300), V(26, 26), { align: 'center', col: BL.red }); });
    dotted(lx + V(160, 90), by - 80, rx - V(160, 120), by - 80, ease(t, p[6], 0.7, E.inOutCubic), BL.line, 6, 16);
  }, { id: 'consent', lid: true });
  sPop(S(c.cons) + 0.15, -6); sPop(S(c.cons) + 0.35, -8); sPop(c.diff.w[13], -6); sPop(c.ph.w[1], -3); sType(c.ph.w[6], 6, 18, -6); sBlink(c.ph.w[12], -1); [0, 0.1, 0.2].forEach(d => sTick(c.ph.w[12] + d + 0.05, -2));

  /* ---------- 25 · data minimisation: expose the minimum (the table) ---------- */
  addB(S(c.mini), (t) => {
    const i = c.idea.w;
    bh(t, { fx: 'cut', lines: ['Data minimisation.'], x: CX, y: V(175, 480), size: V(84, 80), align: 'center', t0: c.mini.w[7] - 0.05, stagger: 0.05, out: i[8] - 0.1, id: 'data min' });
    bh(t, { fx: 'pop', lines: V(['Expose the *minimum* needed to answer the question.'], ['Expose the *minimum*', 'needed to answer', 'the question.']), x: CX, y: V(175, 480), size: V(68, 66), align: 'center', t0: i[8] - 0.08, stagger: 0.09, acc: BL.green, id: 'expose minimum' });
    const rx = CX, ry = V(880, 1200), rs = V(260, 240);
    critter('cert', BL.cobalt, rx, ry, rs, { s: popS(t, S(c.mini) + 0.1), open: blinkOpen(t, 201), ly: -0.4, key: 'min record' });
    const fields = ['Name', 'Spouse', 'Married', 'Divorced', 'Court', 'Status']; const gone = ease(t, i[11] - 0.05, 0.5, E.inCubic);
    fields.forEach((f, n) => {
      const ang = -Math.PI * 0.95 + n * Math.PI * 0.9 / 5 + Math.PI * 0.025; const keep = f === 'Status';
      let x = rx + Math.cos(ang) * V(660, 380), y = ry - rs * 0.6 + Math.sin(ang) * V(340, 420);
      if (keep) { const mv = spring(t - i[11], 1.6, 0.7); x = lerp(x, rx + V(300, 220), mv); y = lerp(y, ry - rs * 0.55, mv); }
      const a = keep ? 1 : 1 - gone; if (a <= 0.01) return;
      bub(t, S(c.mini) + 0.4 + n * 0.1, x, y - 30, keep ? '*Status*' : f, { size: V(46, 38), anchor: 'c', acc: BL.green, a, key: 'field ' + n });
    });
    withA(ease(t, i[4], 0.3), () => bmono('Diagram: placeholder fields, no real records', CX, V(990, 1436), V(22, 22), { align: 'center' }));
  }, { id: 'minimisation', lid: true });
  sPop(S(c.mini) + 0.1, -2); sPop(c.idea.w[4], -4); sWh(c.idea.w[11], -6); sTick(c.idea.w[11] + 0.4, -2);

  /* ---------- 26 · is this person currently free to marry? yes or no ---------- */
  addB(S(c.ask), (t) => {
    const a = c.ask.w, y = c.yn.w; const t0 = S(c.ask);
    bh(t, { fx: 'rise', lines: V(['Is this person currently *free to marry?*'], ['Is this person currently', '*free to marry?*']), x: CX, y: V(200, 480), size: V(84, 80), align: 'center', t0: a[6] - 0.08, stagger: 0.04, acc: BL.cobalt, id: 'free q' });
    glyphFace(V(CX - 560, 170), V(700, 760), V(64, 58), { s: popS(t, t0 + 0.05), state: faceState(t, 5, { wake: t0 + 0.2 }), state2: faceState(t - 1 / 30, 5, { wake: t0 + 0.2 }), lx: 1, ly: 0.4, key: 'asker' });
    const rx = CX, ry = V(920, 1240);
    const look = t < y[2] ? 0 : t < y[4] ? -1 : t < y[5] ? 1 : Math.sin((t - y[5]) * 2.5);
    critter('cert', BL.cobalt, rx, ry, V(270, 240), { s: popS(t, S(c.ask) + 0.2), open: t < a[12] ? 0 : blinkOpen(t, 8), lx: look, ly: -0.3, key: 'answerer' });
    bub(t, y[2] - 0.05, rx - V(330, 230), ry - V(300, 220), 'Yes', { size: V(80, 64), weight: 600, anchor: 'r', key: 'yes' });
    bub(t, y[4] - 0.05, rx + V(330, 230), ry - V(300, 220), 'No', { size: V(80, 64), weight: 600, key: 'no' });
    withA(ease(t, y[5], 0.35), () => bmono('A yes or no answer', rx, ry + V(70, 80), V(28, 28), { align: 'center' }));
  }, { id: 'free-to-marry' });
  sPop(S(c.ask) + 0.1, -3); sType(c.ask.w[6], 39, 26, -6); sPop(c.ask.w[12], -2); sPop(c.yn.w[2], -2); sPop(c.yn.w[4], -2);

  /* ---------- 27 · it does not require showing: married, spouse, divorced, court (columns lock) ---------- */
  addB(S(c.req), (t) => {
    const r = c.req.w;
    bh(t, { fx: 'pop', lines: V(['Answering it does *not* require showing:'], ['Answering it does', '*not* require showing:']), x: CX, y: V(175, 480), size: V(68, 66), align: 'center', t0: r[0] - 0.05, stagger: 0.09, acc: BL.red, id: 'not require' });
    const tw_ = V(1660, 960);
    lockTable(t, CX - tw_ / 2, V(400, 800), tw_, { cols: V(['Name', 'Spouse', 'Married', 'Divorced', 'Court', 'Status'], ['Name', 'Spouse', 'Married', 'Divorced', 'Court', 'Status']), rowsN: 4, label: TBL_LABEL, key: 'table lock',
      locks: { Name: r[5], Married: r[10], Spouse: r[13], Divorced: r[16], Court: r[19] } });
  }, { id: 'not-required' });
  [5, 10, 13, 16, 19].forEach(i => sClick(c.req.w[i] + 0.02, -2));

  /* ---------- 28 · could we minimise to what's asked? (the fold) -> dive into the asker's eye ---------- */
  const ask2 = () => [V(CX + 520, CX + 260), V(880, 1330)];
  addB(S(c.play), (t) => {
    const p = c.play.w, q = c.could.w;
    bh(t, { fx: 'rise', lines: V(['How can data minimisation *come to play here?*'], ['How can data minimisation', '*come to play here?*']), x: CX, y: V(175, 480), size: V(64, 60), align: 'center', t0: p[5] - 0.05, stagger: 0.03, acc: BL.green, out: q[0] - 0.1, id: 'come to play' });
    bh(t, { fx: 'cut', lines: V(['Could we minimise data to the point where we are', "not exposing much more than *it's been asked for?*"], ['Could we minimise data', 'to the point where we', 'are not exposing much', "more than *it's been asked for?*"]), x: CX, y: V(175, 440), size: V(56, 52), align: 'center', times: null, t0: q[0] - 0.08, stagger: 0.025, acc: BL.green, id: 'could minimise' });
    const tw_ = V(1660, 960);
    lockTable(t, CX - tw_ / 2, V(570, 1010), tw_, { cols: ['Name', 'Spouse', 'Married', 'Divorced', 'Court', 'Status'], rowsN: 3, label: TBL_LABEL, key: 'table fold', locks: { Name: -1, Married: -1, Spouse: -1, Divorced: -1, Court: -1 }, fold: { t: q[2], d: 1.2, keep: 'Status' } });
    const [fx, fy] = ask2();
    glyphFace(fx, fy, V(70, 76), { s: popS(t, q[16] - 0.2), state: faceState(t, 15, { wake: q[17] }), state2: faceState(t - 1 / 30, 15, { wake: q[17] }), lx: -0.8, ly: -0.6, key: 'asker 2' });
    withA(ease(t, q[17], 0.35), () => bmono("What's asked", fx, fy + V(110, 120), V(22, 22), { align: 'center', col: BL.green }));
  }, { id: 'could', dive: () => { const [fx, fy] = ask2(); return [fx - V(70, 76) * 0.4, fy - V(70, 76) * 0.1]; } });
  sPop(c.play.w[5], -6); sWh(c.could.w[2] + 0.2, -3); sPop(c.could.w[16], -3);

  /* ---------- 29 · in the case of Marrify: the minimal answer. Nothing else. (iris opens on the asker; A3) ---------- */
  addB(S(c.case), (t) => {
    const q = c.case.w, s = c.simple.w, n = c.noth.w;
    const ax = V(560, 170), ay = V(340, 690);
    bh(t, { fx: 'pop', lines: ['In the case of *Marrify*, in Ghana:'], x: CX, y: V(175, 450), size: V(56, 52), align: 'center', t0: S(c.case) + 0.25, stagger: 0.09, acc: BL.green, id: 'case marrify' });
    glyphFace(ax, ay, V(70, 74), { s: 1, state: (t > S(c.case) + 0.62 && t < S(c.case) + 0.72) ? '-' : faceState(t, 5), state2: (t > S(c.case) + 0.65 && t < S(c.case) + 0.75) ? '-' : null, lx: 0.8, ly: 0.3, key: 'asker 3' });
    bub(t, S(c.case) + 0.6, V(ax + 100, 80), V(ay - 40, ay + 100), 'Is this person married?', { size: V(44, 44), key: 'is married' });
    const rx = V(560, 880), ry = V(820, 1180);
    critter('cert', BL.cobalt, rx, ry, V(200, 210), { s: popS(t, S(c.case) + 0.5), open: t < q[16] ? 0 : t < s[4] ? 1 : blinkOpen(t, 8), lx: 0.7, ly: -0.5, key: 'answer record' });
    { const qp = popS(t, q[16], 2.6, 0.5) * (1 - ease(t, s[4], 0.3)); if (qp > 0.02) withT(rx + V(130, 120), ry - V(330, 340), qp, 0, () => _txt('?', 0, 0, BF.h(V(110, 96), 700), BL.cobalt, 'center')); }
    bub(t, s[5] - 0.1, V(760, 80), V(500, 900), 'This person currently has\nan *active marriage* on record.', { size: V(46, 42), weight: 600, acc: BL.cobalt, key: 'answer' });
    [['Name of spouse', n[3]], ['Dates', n[7]], ['History', n[9]]].forEach(([lab, tin], i) => {
      const f0 = BF.h(V(44, 42), 500); const prevW = [0, tw('Name of spouse', f0) + 64, tw('Name of spouse', f0) + tw('Dates', f0) + 128][i];
      const x2 = V(790 + prevW, 120), y = V(790, 1110 + i * 66);
      const p = ease(t, tin - 0.1, 0.35); if (p <= 0) return;
      withA(p, () => { const f = BF.h(V(44, 42), 500); _txt(lab, x2, y + 14 * (1 - p), f, BL.grey, 'left'); const wv = tw(lab, f); rect(x2 - 4, y - V(14, 13) + 14 * (1 - p), (wv + 8) * ease(t, tin + 0.05, 0.3), 4, BL.grey); });
    });
    bh(t, { lines: ['Nothing else.'], x: V(760, CX), y: V(960, 1400), size: V(110, 92), align: V('left', 'center'), t0: n[0] - 0.05, stagger: 0.15, fx: 'pop', id: 'nothing else' });
  }, { id: 'minimal-answer', iris: () => [V(560, 170), V(340, 690)] });
  sBlink(S(c.case) + 0.62, -2); sPop(c.case.w[13], -4); sPop(c.simple.w[2], -3); sPop(c.simple.w[5], -3); [3, 7, 9].forEach(i => sPen(c.noth.w[i], -3)); sImp(c.noth.w[0] + 0.05, -10);

  buildB2c();
}

function buildB2c() {
  const k = PS({
    acc: 'but of course another person could request another thing',
    lev: 'and then i was thinking about like access level',
    ind: 'maybe perhaps an individual could access a level of this data',
    org: 'and maybe there are certain organizations or institutions that can access more',
    all: 'i was just thinking about all of it',
    tech: 'and again i always say this that technology is not neutral',
    form: "it works it takes the form of the system or the place that you're using it in",
    ex: "for example the way a piece of technology works in estonia will be completely different from the way it's working in a country in africa in nigeria in ghana",
    ee: 'in estonia a divorce record could just be administrative nobody cares',
    af: 'but in an african context to a large extent divorce especially for women is pretty stigmatised',
    tri: "so it's very tricky when i think about it when i think about the drawbacks first",
    exp: 'that this is something that i myself think i need to explore further the human side of this thing',
    eng: "it's not just a privacy engineering conversation it's also a cultural design thing",
    side: "but i've just been putting it side by side i really love the idea",
  });

  /* ---------- 30 · access levels: an individual sees one thing, institutions more ---------- */
  addB(S(k.acc), (t) => {
    const a = k.acc.w, l = k.lev.w;
    bh(t, { fx: 'rise', lines: V(['Another person could request *another thing.*'], ['Another person could', 'request *another thing.*']), x: CX, y: V(175, 480), size: V(64, 62), align: 'center', t0: a[3] - 0.05, stagger: 0.03, acc: BL.cobalt, out: l[7] - 0.1, id: 'another thing' });
    if (t < l[7] - 0.15) { const ff = (n, x, tin, txt2, seed) => { const yy0 = V(560, 760 + n * 200); glyphFace(x, yy0, V(80, 76), { s: popS(t, tin), state: faceState(t, seed, { wake: tin + 0.15 }), lx: 0.6, ly: 0.2 }); bub(t, tin + 0.15, x + V(100, 90), yy0 - 60, txt2, { size: V(40, 36), key: 'request ' + n }); };
      ff(0, V(CX - 640, 120), S(k.acc) + 0.05, 'Is this person married?', 301); ff(1, V(CX + 300, 120), a[3] - 0.1, 'Another request…', 302); }
    bh(t, { lines: ['Access *levels.*'], x: CX, y: V(175, 480), size: V(84, 80), align: 'center', t0: l[7] - 0.08, stagger: 0, acc: BL.cobalt, fx: 'cut', id: 'access levels' });
    const fieldsAll = ['Status', 'Names', 'Dates', 'Court'];
    const row = (who, y, tin, nOpen, lab, tMore) => {
      if (t < tin) return; const x0 = V(CX - 620, 170); const nO = typeof nOpen === 'function' ? nOpen(t) : nOpen;
      if (who === 'face') glyphFace(x0, y, V(60, 56), { s: popS(t, tin), state: faceState(t, 61, { wake: tin + 0.2 }), lx: 1, key: 'tier face' });
      else critter('register', BL.green, x0, y + V(60, 56), V(130, 120), { s: popS(t, tin), open: blinkOpen(t, 62), lx: 1, key: 'tier inst' });
      if (who !== 'face' && !PORTRAIT) critter('court', BL.purple, x0 - 170, y + 60, 120, { s: popS(t, k.org.w[7] - 0.05), open: blinkOpen(t, 63), lx: 1, key: 'tier inst 2' });
      if (who !== 'face') { const hp = ease(t, k.org.w[11] - 0.1, 0.6, E.outCubic); if (hp > 0) rect(V(CX - 440, 300), y - V(60, 56), V(1060, 700) * hp, 6, BL.green); }
      bmono(lab, x0, y + V(110, 100), V(24, 24), { align: 'center', a: ease(t, tin, 0.3), maxW: V(300, 220) });
      fieldsAll.forEach((f, n) => {
        const open = n < (tMore != null && t >= tMore ? nO + 1 : nO); const cwid = (k2) => bhLayout([fieldsAll[k2]], V(36, 32) * BK('bub'), 500, -0.01 * V(36, 32) * BK('bub')).w + V(36, 32) * BK('bub') * 2.7; let xx = V(CX - 420, 320 + (n % 2) * 360); if (!PORTRAIT) for (let k2 = 0; k2 < n; k2++) xx += cwid(k2) + 48; const x = xx, yy = V(y - 40, y - 40 + Math.floor(n / 2) * 110);
        bub(t, tin + 0.15 + n * 0.08, x, yy, open ? f : '_' + f + '_', { size: V(36, 36), key: 'tier ' + lab + ' ' + n, acc: BL.green, lock: open ? null : tin + 0.3 + n * 0.08 });
      });
    };
    row('face', V(430, 660), Math.min(k.ind.w[3] - 0.1, l[7] + 0.1), 1, 'An individual', null);
    row('inst', V(720, 1020), Math.min(k.org.w[5] - 0.1, l[7] + 0.9), (tt) => (tt >= k.org.w[5] - 0.1 ? 2 : 0), 'Organisations, institutions', k.org.w[11] - 0.1);
    withA(ease(t, k.org.w[11], 0.35), () => bmono('Can access more', V(CX - 100, W - 80), V(840, 1350), V(26, 26), { align: V('left', 'right'), col: BL.green }));
    withA(ease(t, k.ind.w[3], 0.3), () => bmono('Illustration', V(W - 110, W - 80), V(980, 1436), 22, { align: 'right' }));
  }, { id: 'access' });
  sPop(k.acc.w[3], -6); sPop(k.lev.w[7], -4); sPop(k.ind.w[3], -2); sPop(k.org.w[5], -2); sTick(k.org.w[11], -2);

  /* ---------- 31 · technology is not neutral: it takes the form of the place (the record reshapes) ---------- */
  addB(S(k.tech), (t) => {
    const w = k.tech.w, f = k.form.w;
    bh(t, { lines: ['I always say this:'], x: CX, y: V(175, 470), size: V(52, 50), align: 'center', t0: w[1] - 0.05, stagger: 0.03, col: BL.grey, id: 'always say' });
    bh(t, { fx: 'pop', lines: V(['Technology is *not neutral.*'], ['Technology is', '*not neutral.*']), x: CX, y: V(300, 600), size: V(110, 104), align: 'center', times: [w[7], w[8], w[9], w[10]], acc: BL.red, id: 'not neutral' });
    // the container takes two shapes; the record inside takes the shape of its place
    const cx = CX, cy = V(960, 1120); const m1 = ease(t, f[8] - 0.1, 0.6, E.inOutCubic), m2 = ease(t, f[11] - 0.1, 0.6, E.inOutCubic);
    const bw = lerp(lerp(V(470, 340), V(800, 520), m1), V(340, 260), m2), bhh = lerp(lerp(V(400, 300), V(270, 200), m1), V(500, 380), m2);
    const cp = ease(t, S(k.tech) + 0.1, 0.5); if (cp > 0) withA(cp, () => { ctx.save(); ctx.setLineDash([14, 10]); strokeRR(cx - bw / 2, cy - bhh, bw, bhh, 24, BL.soft, 4); ctx.restore(); });
    withT(cx, cy, 1, 0, () => { ctx.scale(bw / V(470, 340), bhh / V(400, 300)); critter('cert', BL.cobalt, 0, -6, V(200, 190), { s: popS(t, S(k.tech) + 0.15), open: blinkOpen(t, 71), ly: -0.2 }); });
    withA(ease(t, f[8], 0.3), () => bmono('The system', V(cx - 560, 160), V(cy - 60, cy + 80), 28, { col: BL.grey }));
    withA(ease(t, f[11], 0.3), () => bmono('The place', V(cx + 360, W - 160), V(cy - 60, cy + 80), 28, { col: BL.grey, align: V('left', 'right') }));
  }, { id: 'not-neutral' });
  sImp(k.tech.w[9] + 0.05, -9); sPop(S(k.tech) + 0.2, -6); sWh(k.form.w[8], -9); sWh(k.form.w[11], -9);

  /* ---------- 32 · Estonia vs Africa: the same record, a different meaning (calm, no eye gags) ---------- */
  addB(S(k.ex), (t) => {
    const x = k.ex.w, e = k.ee.w, a = k.af.w;
    bh(t, { fx: 'rise', lines: ['*Completely* different.'], x: CX, y: V(175, 470), size: V(80, 76), align: 'center', t0: x[13] - 0.05, stagger: 0.05, acc: BL.cobalt, out: e[0] - 0.1, id: 'completely different' });
    bh(t, { fx: 'cut', lines: V(['In Estonia, it could just be *administrative.*'], ['In Estonia, it could', 'just be *administrative.*']), x: CX, y: V(175, 470), size: V(68, 64), align: 'center', t0: e[0] - 0.08, stagger: 0.04, dur: 0.7, acc: BL.cobalt, out: a[0] - 0.1, id: 'estonia admin' });
    bh(t, { fx: 'pop', lines: V(['In an African context, *especially for women.*'], ['In an African context,', '*especially for women.*']), x: CX, y: V(175, 470), size: V(68, 64), align: 'center', t0: a[0] - 0.08, stagger: 0.09, dur: 0.8, acc: BL.red, id: 'african women' });
    const L1 = V(CX - 480, CX), R1 = V(CX + 480, CX), y1 = V(780, 860), y2 = V(780, 1310);
    const dv = ease(t, x[10], 0.7, E.inOutCubic); if (PORTRAIT) rect(140, 1025, (W - 280) * dv, 2, BL.line); else rect(CX - 1, 260, 2, 720 * dv, BL.line);
    // left: Estonia
    const fl = popS(t, S(k.ex) + 0.1); if (fl > 0) withT(V(L1, 160), V(350, 690), fl, 0, () => flagB('estonia', -70, -22, 140));
    critter('folder', BL.sand, L1, y1, V(240, 180), { s: popS(t, S(k.ex) + 0.1, 1.8, 0.65), open: blinkOpen(t, 81), lx: 0, ly: 0, key: 'left record' });
    [[-220, 30], [230, 10]].forEach(([dx, dy], i) => glyphFace(L1 + dx * V(1, 0.9), y1 - V(80, 70) + dy, V(40, 38), { s: popS(t, e[9] - 0.1 + i * 0.1), state: '-', lx: i ? 1 : -1, ly: 0, a: 0.85 }));
    bh(t, { fx: 'rise', lines: ['Administrative.'], x: L1, y: V(920, 950), size: V(56, 50), align: 'center', t0: e[8] - 0.1, stagger: 0.05, id: 'administrative' });
    withA(ease(t, e[9] - 0.1, 0.5), () => bmono('Nobody cares', L1, V(990, 995), V(30, 26), { align: 'center' }));
    // right: Nigeria, Ghana
    const f2 = popS(t, x[26]); if (f2 > 0) withT(V(R1 - 90, 170), V(350, 1080), f2, 0, () => flagB('nigeria', -80, -20, 160));
    const f3 = popS(t, x[28]); if (f3 > 0) withT(V(R1 + 90, 340), V(350, 1080), f3, 0, () => flagB('ghana', -60, -20, 120));
    const down = t >= a[12];
    critter('folder', BL.sand, R1, y2, V(240, 160), { s: popS(t, S(k.ex) + 0.25, 1.8, 0.65), open: down ? 'down' : blinkOpen(t, 82), lx: 0, ly: 0.4, key: 'right record' });
    for (let i = 0; i < 6; i++) { const ang = Math.PI * (1.05 + i * 0.18); const fx = R1 + Math.cos(ang) * V(300, 230), fy = y2 - V(110, 60) + Math.sin(ang) * V(200, 110); glyphFace(fx, fy, V(38, 36), { s: popS(t, a[3] + i * 0.12, 1.8, 0.7), state: 'o', lx: lookAt(fx, fy, R1, y2 - 60)[0], ly: lookAt(fx, fy, R1, y2 - 60)[1], a: 0.9 }); }
    bh(t, { fx: 'pop', lines: ['Stigmatised,'], x: R1, y: V(920, 1392), size: V(56, 50), align: 'center', t0: a[15] - 0.1, stagger: 0.09, acc: BL.red, col: BL.red, id: 'stigmatised' });
    withA(ease(t, a[10] - 0.1, 0.5), () => bmono('Especially for women', R1, V(990, 1434), V(30, 26), { align: 'center', col: BL.red }));
  }, { id: 'split', lid: true, push: 0.008 });
  sPop(k.ex.w[10], -6); sPop(k.ee.w[3], -6); sPop(k.ex.w[26], -6); sPop(k.ex.w[28], -6);

  /* ---------- 33 · very tricky; I need to explore further: the human side (her photo; calm) ---------- */
  addB(S(k.tri), (t) => {
    const w = k.tri.w, e = k.exp.w;
    bh(t, { fx: 'rise', lines: ['Very *tricky.*'], x: CX, y: V(190, 480), size: V(96, 92), align: 'center', t0: w[3] - 0.06, stagger: 0.06, dur: 0.7, acc: BL.red, out: PORTRAIT ? e[11] - 0.1 : null, id: 'very tricky' });
    bh(t, { lines: V(['When I think about the drawbacks.'], ['When I think about', 'the drawbacks.']), x: CX, y: V(270, 570), size: V(44, 42), weight: 500, col: BL.grey, align: 'center', out: PORTRAIT ? e[11] - 0.1 : null, t0: w[13] - 0.06, stagger: 0.03, id: 'think drawbacks' });
    const mv = spring(t - (e[6] - 0.1), 1.5, 0.75); const pp0 = springIn(t, S(k.tri) + 0.1, V(CX + 520, CX), V(620, 920), { dy: 160, f: 1.7, z: 0.7 }); const pp = { ...pp0, x: pp0.x - V(60, 0) * mv, y: pp0.y + V(0, 40) * mv, s: pp0.s * (1 + 0.1 * mv) };
    bPolaroid(IMG.her_explore, pp.x, pp.y + V(40, 80), V(360, 520), 0.04 - 0.08 * (1 - pp.p), 'Gbemi, HCI researcher', { s: Math.min(1.05, pp.s), key: 'polaroid explore' });
    bh(t, { fx: 'cut', lines: V(['I need to explore further:', '*the human side.*'], ['I need to explore further:', '*the human side.*']), noWrap: true, fitW: V(900, undefined), x: V(170, CX), y: V(600, 480), size: V(70, 64), align: V('left', 'center'), t0: e[11] - 0.1, stagger: 0.06, dur: 0.7, acc: BL.red, id: 'human side' });
  }, { id: 'tricky' });
  sPop(k.tri.w[3], -8); sPop(S(k.tri) + 0.15, -4);

  /* ---------- 34 · privacy engineering AND cultural design, side by side ---------- */
  addB(S(k.eng), (t) => {
    const w = k.eng.w, s = k.side.w;
    bh(t, { fx: 'pop', lines: ['Not just *privacy engineering.*'], x: CX, y: V(175, 470), size: V(72, 66), align: 'center', t0: w[1] - 0.05, stagger: 0.09, acc: BL.cobalt, id: 'not just privacy' });
    bh(t, { fx: 'rise', lines: ['Also *cultural design.*'], x: CX, y: V(270, 680), size: V(72, 66), align: 'center', t0: w[8] - 0.05, stagger: 0.04, acc: BL.red, id: 'cultural design' });
    const close = ease(t, s[6] - 0.1, 0.8, E.inOutCubic); const gap = lerp(V(440, 260), V(250, 150), close); const cy = V(860, 1150);
    critter('register', BL.cobalt, CX - gap, cy, V(240, 180), { s: popS(t, S(k.eng)), open: blinkOpen(t, 111), lx: close, label: 'Privacy engineering', labKey: 'pe', labA: ease(t, w[4], 0.3) });
    for (let i = 0; i < 3; i++) glyphFace(CX + gap + (i - 1) * V(150, 120), cy - V(110, 90) - (i === 1 ? 60 : 0), V(72, 64), { s: popS(t, S(k.eng) + 0.15 + i * 0.08), state: faceState(t, 120 + i), lx: -close, ly: 0 });
    withA(ease(t, w[10], 0.3), () => bmono('Cultural design', CX + gap, cy + V(44, 46), V(24, 26), { align: 'center', col: BL.grey }));
    withA(ease(t, s[8] - 0.1, 0.35), () => bmono('Side by side', CX, cy + V(150, 160), V(22, 22), { align: 'center' }));
  }, { id: 'cultural' });
  sPop(k.eng.w[4], -3); sPop(k.eng.w[10], -3); sWh(k.side.w[6], -9);

  buildB2d();
}

function buildB2d() {
  const r = PS({
    smart: 'but another thing i find genuinely smart in estonia',
    paired: "is the idea that your data being in the system is also paired with you being able to see what's happening to it",
    both: 'that transparency runs both ways',
    rc: 'and i also think that if we are creating open data in africa we also need to ask the question of reciprocity',
    avg: 'where is the reciprocity for the average individual',
    look: 'if someone looks up my marriage record do i get to see that someone looked it up',
    want: 'i really want african countries building this kind of infrastructure',
    solve: 'because i genuinely think it also solves a problem',
    helps: 'technology helps when it comes to things like this',
    probe: 'but i also think that if we want to build this kind of infrastructure as people we still need to probe it a little bit and question it',
    head: "and that's what i've just been doing in my head",
    like: 'i really like the idea i read about',
    cool: "it's super super cool",
    lov: 'i really love it',
    again: "but again just thinking about the drawbacks and everything this is just what's been running in my head",
  });
  const A = () => ({ x: V(560, 300), y: V(700, 1000) }), B = () => ({ x: V(1360, 780), y: V(820, 1340) });

  /* ---------- 35 · in Estonia: your data in the system, and you seeing what happens to it (A6) ---------- */
  addB(S(r.smart), (t) => {
    const p = r.paired.w; const a = A(), b = B();
    bh(t, { fx: 'pop', lines: V(['Something *genuinely smart* in Estonia:'], ['Something *genuinely*', '*smart* in Estonia:']), x: CX, y: V(175, 470), size: V(64, 62), align: 'center', t0: r.smart.w[5] - 0.08, stagger: 0.09, acc: BL.green, out: p[12] - 0.1, id: 'genuinely smart' });
    bh(t, { fx: 'rise', lines: V(['Your data in the system, *and you seeing what happens to it.*'], ['Your data in the system,', '*and you seeing', 'what happens to it.*']), x: CX, y: V(175, 470), size: V(58, 58), align: 'center', t0: p[12] - 0.08, stagger: 0.03, acc: BL.green, id: 'paired' });
    const back = t >= p[18];
    glyphFace(a.x, a.y, V(90, 110), { s: popS(t, S(r.smart) + 0.05), state: faceState(t, 131), lx: 1, ly: V(0.1, 0.8), key: 'someone' });
    bmono('Someone searching', a.x, a.y + V(140, 165), V(22, 24), { align: 'center' });
    critter('cert', BL.cobalt, b.x, b.y, V(220, 260), { s: popS(t, S(r.smart) + 0.2), open: back && t < p[18] + 0.08 ? 0 : blinkOpen(t, 132), lx: back ? -1 : 0.3, ly: back ? V(-0.2, -0.7) : 0.6, key: 'your record' });
    bmono('Your record', b.x, b.y + V(50, 52), V(22, 24), { align: 'center' });
    const rc = { x: b.x, y: b.y - V(220, 260) * 0.45 }; const d1 = ease(t, p[5] - 0.1, 0.6, E.inOutCubic);
    dotted(a.x + V(100, 90), a.y + V(20, 90), rc.x - V(110, 100), rc.y, d1, BL.ink, 6, 15);
  }, { id: 'two-way', lid: true });
  sPop(S(r.smart) + 0.1, -4); sWh(r.paired.w[5], -10); sBlink(r.paired.w[18], 0);

  /* ---------- 36 · transparency runs both ways ---------- */
  addB(S(r.both), (t) => {
    const w = r.both.w; const a = A(), b = B();
    bh(t, { fx: 'cut', lines: ['Transparency runs *both ways.*'], x: CX, y: V(200, 480), size: V(96, 84), align: 'center', times: [w[1], w[2], w[3], w[4]], acc: BL.green, id: 'both ways' });
    const big = spring(t - S(r.both), 1.8, 0.7); const fa = { x: V(560, 300), y: V(700, 1000) }, fb = { x: V(1380, 780), y: V(1000, 1400) };
    glyphFace(lerp(a.x, fa.x, big), lerp(a.y, fa.y + V(60, 0), big), V(90, 110) * (1 + 0.9 * big), { state: t >= w[4] ? '^' : faceState(t, 131), lx: 1, ly: V(0.1, 0.8) });
    critter('cert', BL.cobalt, lerp(b.x, fb.x, big), lerp(b.y, fb.y, big), V(220, 260) * (1 + 0.55 * big), { open: t >= w[4] ? 'happy' : 1, lx: -1, ly: V(-0.2, -0.7) });
    const ax2 = lerp(a.x, fa.x, big) + V(250, 180), ay2 = lerp(a.y, fa.y + V(60, 0), big), bx2 = lerp(b.x, fb.x, big) - V(260, 200), by2 = lerp(b.y, fb.y, big) - V(300, 330);
    dotted(ax2, ay2 - 20, bx2, by2 - 20, 1, BL.ink, 7, 18);
    dotted(bx2, by2 + 40, ax2, ay2 + 40, ease(t, w[3], 0.6, E.inOutCubic), BL.green, 7, 18);
  }, { id: 'both-ways' });
  sImp(r.both.w[3] + 0.05, -8); sBlink(r.both.w[4], -2);

  /* ---------- 37 · reciprocity, for the average individual (a crowd gathers) ---------- */
  addB(S(r.rc), (t) => {
    const w = r.rc.w, a = r.avg.w;
    bh(t, { fx: 'pop', lines: V(['If we are creating *open data* in Africa,'], ['If we are creating', '*open data* in Africa,']), x: CX, y: V(175, 470), size: V(62, 60), align: 'center', t0: w[8] - 0.05, stagger: 0.09, acc: BL.green, id: 'creating open data' });
    bh(t, { fx: 'rise', lines: ['Where is the *reciprocity?*'], x: CX, y: V(320, 720), size: V(96, 88), align: 'center', t0: w[21] - 0.1, stagger: 0.05, acc: BL.green, id: 'where reciprocity' });
    const fg = popS(t, S(r.rc) + 0.1); if (fg > 0) withT(CX, V(420, 900), fg, 0, () => { flagB('ghana', -136, -24, 120); flagB('nigeria', 16, -24, 160); });
    const faces = []; const N = V(22, 16);
    for (let i = 0; i < N; i++) { const early = i % 5 === 0; const col = i % V(8, 6); const rowi = Math.floor(i / V(8, 6)); faces.push({ x: V(260 + col * 200 + (rowi % 2) * 100, 150 + col * 155 + (rowi % 2) * 75), y: V(620 + rowi * 150, 1010 + rowi * 150), r: V(78, 66) * (0.85 + 0.3 * hash(i + 9)), t0: early ? S(r.rc) + 0.2 + i * 0.05 : a[6] - 0.3 + ((i * 7) % N) * 0.04, seed: i * 1.3 + 140, look: [0, -0.6] }); }
    crowd(t, faces, { f: 1.9, z: 0.6 });
    withA(ease(t, a[7], 0.35), () => bmono('The average individual', CX, V(1040, 1436), V(22, 22), { align: 'center' }));
  }, { id: 'reciprocity' });
  sPop(r.rc.w[8], -6); sImp(r.rc.w[21] + 0.05, -10); sCrowd(r.avg.w[6] - 0.3, -1); [0, 0.2, 0.4].forEach(d => sPop(r.avg.w[6] - 0.2 + d, -6));

  /* ---------- 38 · if someone looks up my marriage record, do I get to see that? ---------- */
  addB(S(r.look), (t) => {
    const w = r.look.w; const a = A(), b = B();
    bh(t, { fx: 'pop', noWrap: !PORTRAIT, lines: V(['If someone looks up my marriage record,', 'do I get to see *that someone looked it up?*'], ['If someone looks up', 'my marriage record,', 'do I get to see that', '*someone looked it up?*']), x: CX, y: V(175, 450), size: V(62, 62), align: 'center', t0: w[1] - 0.05, stagger: 0.09, acc: BL.cobalt, id: 'looked it up' });
    glyphFace(a.x, a.y, V(90, 110), { s: popS(t, w[1] - 0.1), state: faceState(t, 141), lx: 1, ly: V(0.1, 0.8), key: 'someone 2' });
    const sees = t >= w[11];
    critter('cert', BL.cobalt, b.x, b.y, V(220, 260), { s: popS(t, w[5] - 0.1), open: sees && t < w[11] + 0.08 ? 0 : blinkOpen(t, 142), lx: sees ? -1 : 0, ly: sees ? V(-0.2, -0.7) : 0.6, key: 'my record' });
    const rc = { x: b.x, y: b.y - V(220, 260) * 0.45 };
    dotted(a.x + V(100, 90), a.y + V(20, 90), rc.x - V(110, 100), rc.y, ease(t, w[2], 0.5, E.inOutCubic), BL.ink, 6, 15);
    bub(t, w[11] - 0.05, V(W - 110, 80), V(b.y - 470, b.y - 560), 'Someone looked up your record', { size: V(36, 36), anchor: V('r', 'l'), key: 'notification', border: BL.green });
    withA(ease(t, w[11], 0.3), () => bmono('Illustration', V(W - 110, W - 80), V(b.y - 270, b.y - 470), 18, { align: 'right' }));
  }, { id: 'looked-up' });
  sPop(r.look.w[1], -4); sWh(r.look.w[2], -10); sPop(r.look.w[5], -4); sPop(r.look.w[11], 0); sBlink(r.look.w[11] + 0.05, -2);

  /* ---------- 39 · I really want African countries building this (everyone gathers around her) ---------- */
  addB(S(r.want), (t) => {
    const w = r.want.w, s = r.solve.w, h = r.helps.w;
    bh(t, { fx: 'rise', lines: V(['I really want African countries *building this.*'], ['I really want African', 'countries *building this.*']), x: CX, y: V(175, 470), size: V(72, 68), align: 'center', times: [w[0], w[1], w[2], w[3], w[4], w[5], w[6]], acc: BL.green, id: 'building this' });
    const hx = CX, hy = V(600, 930), hd = V(320, 360);
    herCircle(IMG.her_smile, hx, hy, hd, { s: popS(t, S(r.want) + 0.05, 2.2, 0.5), crop: [0.44, 0.56, 0.6], tint: BL.mint, key: 'her build' });
    CAST.forEach(([sh, col], i) => { const ang = Math.PI * (0.05 + i * 0.15); const x = hx + Math.cos(Math.PI - ang) * V(460, 420), y = hy + V(200, 230) + Math.sin(ang) * V(110, 120) - 20; critter(sh, BL[col], x, y, V(120, 110), { s: popS(t, w[3] + i * 0.06), open: t > s[6] ? 'happy' : blinkOpen(t, i + 150), lx: lookAt(x, y, hx, hy)[0], ly: -0.5 }); });
    const faces = []; for (let i = 0; i < V(8, 6); i++) { const side = i % 2 ? 1 : -1; faces.push({ x: hx + side * V(480 + Math.floor(i / 2) * 100, 400) , y: V(520 + Math.floor(i / 2) * 120, 640 + Math.floor(i / 2) * 150) - (PORTRAIT && Math.floor(i / 2) > 1 ? 0 : 0), r: V(50, 46), t0: w[5] + i * 0.06, seed: i + 160, look: [-side, 0] }); }
    crowd(t, faces, { f: 2, z: 0.6 });
    withA(ease(t, s[6] - 0.1, 0.35) * (1 - ease(t, h[0] - 0.1, 0.3)), () => bmono('It also solves a problem', CX, V(1010, 1420), V(24, 26), { align: 'center', col: BL.green }));
    withA(ease(t, h[0] - 0.05, 0.35), () => bmono('Technology helps, with things like this', CX, V(1010, 1420), V(24, 26), { align: 'center', col: BL.green }));
  }, { id: 'build-it', lid: true, push: 0.02 });
  sPop(r.want.w[3], -3); sCrowd(r.want.w[5], -3); sBlink(r.solve.w[6], -2);

  /* ---------- 40 · probe it, question it (a searcher with a magnifier; her polaroid) ---------- */
  addB(S(r.probe), (t) => {
    const w = r.probe.w, hd = r.head.w;
    bh(t, { lines: V(['If we want to build this kind of infrastructure,'], ['If we want to build this', 'kind of infrastructure,']), x: CX, y: V(175, 470), size: V(62, 58), align: 'center', t0: w[5] - 0.08, stagger: 0.03, col: BL.grey, out: w[14] - 0.1, id: 'if we build' });
    bh(t, { lines: ['As people, we still need to'], x: CX, y: V(175, 470), size: V(62, 58), align: 'center', t0: w[14] - 0.08, stagger: 0.03, col: BL.grey, id: 'as people' });
    bh(t, { lines: V(['*Probe* it. Question it.'], ['*Probe* it.', 'Question it.']), x: CX, y: V(330, 640), size: V(100, 96), align: 'center', times: [w[20] - 0.08, w[20], w[26] - 0.08, w[26]], acc: BL.cobalt, fx: 'pop', noWrap: true, id: 'probe question' });
    const rx = V(CX - 200, CX - 160), ry = V(880, 1180);
    const mp = prog(t, w[20] - 0.1, 1.2); const e = E.inOutCubic(mp); const mx = lerp(rx - 140, rx + 120, e), my = ry - 160 - Math.sin(e * Math.PI) * 80;
    glyphFace(V(rx - 380, rx - 250), V(ry - 120, ry - 420), V(80, 70), { s: popS(t, S(r.probe) + 0.15), state: t >= w[20] ? '<' : faceState(t, 175), lx: 1, ly: 0.3, key: 'prober' });
    critter('cert', BL.cobalt, rx, ry, V(240, 240), { s: popS(t, S(r.probe) + 0.05), open: t >= w[26] && t < w[26] + 0.4 ? 'down' : blinkOpen(t, 171), lx: mp > 0 && mp < 1 ? (mx - rx) / 160 : 0, ly: -0.5, key: 'probed record' });
    if (mp > 0) withA(clamp(mp * 5) * (1 - prog(t, hd[0], 0.4)), () => { ctx.save(); ctx.strokeStyle = BL.ink; ctx.lineWidth = 9; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(mx, my, 66, 0, Math.PI * 2); ctx.stroke(); ctx.beginPath(); ctx.moveTo(mx + 48, my + 48); ctx.lineTo(mx + 108, my + 108); ctx.lineWidth = 15; ctx.stroke(); ctx.restore(); });
    for (let i = 0; i < 3; i++) { const q = ease(t, w[26] + i * 0.1, 0.3); if (q > 0) withA(q, () => _txt('?', rx + 170 + i * 46, ry - 200 - (i % 2) * 40 - 20 * (1 - q), BF.h(64, 700), BL.cobalt, 'center')); }
    const pp = springIn(t, hd[2] - 0.15, V(CX + 520, W - 230), V(700, 1000), { dy: 160, f: 1.8, z: 0.7 });
    bPolaroid(IMG.her_head, pp.x, pp.y, V(380, 300), -0.05 + 0.08 * (1 - pp.p), "What's been running in my head", { s: Math.min(1.05, pp.s), key: 'polaroid head' });
  }, { id: 'probe' });
  sPop(r.probe.w[5], -6); sWh(r.probe.w[20], -4); [0, 0.1, 0.2].forEach(d => sTick(r.probe.w[26] + d, -2)); sPop(r.head.w[2] - 0.1, -3);

  /* ---------- 41 · I really like the idea; super, super cool; what's been running in my head (recap) ---------- */
  addB(S(r.like), (t) => {
    const a = r.again.w;
    bh(t, { lines: ['I really like the idea.'], x: CX, y: V(175, 470), size: V(62, 60), align: 'center', t0: r.like.w[2] - 0.08, stagger: 0.03, col: BL.grey, id: 'like idea' });
    bh(t, { fx: 'cut', lines: ['Super, super *cool.*'], x: CX, y: V(300, 600), size: V(100, 96), align: 'center', times: [r.cool.w[1], r.cool.w[2], r.cool.w[3]], acc: BL.green, out: a[3] - 0.1, id: 'super cool' });
    bh(t, { fx: 'pop', lines: ['But again, the *drawbacks:*'], noWrap: true, x: CX, y: V(300, 620), size: V(84, 80), align: 'center', t0: a[3] - 0.08, stagger: 0.09, acc: BL.red, id: 'again drawbacks' });
    const hx = CX, hy = V(560, 900), hd = V(250, 290);
    herCircle(IMG.her_smile, hx, hy, hd, { s: popS(t, S(r.like) + 0.05, 2.2, 0.5), crop: [0.44, 0.56, 0.6], tint: BL.mint, key: 'her love' });
    const items = ['Consent', 'Data minimisation', 'Access levels', 'Culture', 'Reciprocity']; const cs = V(36, 34);
    const cw = items.map(it => bhLayout([it], cs, 500, -0.01 * cs).w + cs * 1.6); const gap = 32;
    const rowsI = V([items.map((_, i) => i)], [[0, 1, 2], [3, 4]]);
    rowsI.forEach((ids, ri) => { const tot = ids.reduce((acc, i) => acc + cw[i], 0) + gap * (ids.length - 1); let x = CX - tot / 2;
      ids.forEach(i => { bub(t, a[3] + i * 0.28, x, hy + hd / 2 + V(60, 70) + ri * V(110, 100), items[i], { size: cs, key: 'recap ' + i }); x += cw[i] + gap; }); });
    CAST.slice(0, 2).forEach(([sh, col], i) => critter(sh, BL[col], V(CX - 620 + i * 1240, 200 + i * 680), V(660, 1020), V(130, 100), { s: popS(t, S(r.like) + 0.2 + i * 0.08), open: t < a[3] && t > r.cool.w[1] ? 'happy' : blinkOpen(t, i + 180), ly: -0.6 }));
    withA(ease(t, a[14] - 0.1, 0.35), () => bmono("Just what's been running in my head", CX, V(990, 1436), V(26, 26), { align: 'center' }));
  }, { id: 'love-it' });
  sPop(r.cool.w[1], -3); sPop(r.cool.w[2], -3); sImp(r.cool.w[3] + 0.05, -10); [0, 1, 2, 3, 4].forEach(i => sPop(r.again.w[3] + i * 0.28 + 0.05, -4));

  /* ---------- 42 · end card: Ghana's Marrify, @WithGbemi; the cast packs in, everyone blinks, the lids close ---------- */
  const tEnd = TOTAL - OUTRO + 0.3;
  addB(tEnd, (t) => {
    bh(t, { fx: 'rise', lines: V(["Ghana's *Marrify.*"], ["Ghana's", '*Marrify.*']), x: CX, y: V(230, 520), size: V(110, 110), align: 'center', t0: tEnd + 0.05, stagger: 0.08, acc: BL.green, id: 'end title' });
    bh(t, { lines: V(['Centralised data, and what Estonia taught me.'], ['Centralised data, and', 'what Estonia taught me.']), x: CX, y: V(330, 760), size: V(48, 48), align: 'center', t0: tEnd + 0.5, stagger: 0.03, col: BL.grey, id: 'end sub' });
    const PK = V([[-430, 830, 1.0], [-250, 800, 0.8], [-80, 840, 1.05], [70, 780, 0.65], [215, 830, 0.95], [380, 810, 0.8], [520, 840, 0.65]], [[-300, 1130, 1.0], [-110, 1100, 0.8], [90, 1140, 1.05], [300, 1090, 0.7], [-190, 1380, 0.95], [40, 1360, 0.8], [250, 1390, 0.75]]);
    CAST.forEach(([sh, col, sz], i) => { const fx = CX + PK[i][0] * V(1.3, 1.12), fy = PK[i][1] + V(40, -60); const t0 = tEnd + 0.4 + [3, 0, 5, 1, 4, 2, 6][i] * 0.08; const sp = spring(t - t0, 2.0, 0.5);
      const all = TOTAL - 1.4; const open = t >= all && t < all + 0.14 ? (t < all + 0.05 ? 1 - (t - all) / 0.05 : (t - all - 0.05) / 0.09) : blinkOpen(t, i * 3.1 + 1);
      critter(sh, BL[col], fx, lerp(fy + V(420, 600), fy, sp), sz * V(1.3, 1.3) * PK[i][2], { s: popS(t, t0), open, ly: -0.4, lx: clamp((CX - fx) / 400, -1, 1) }); });
    withA(ease(t, tEnd + 1.3, 0.4), () => bmono('@WithGbemi', CX, V(1000, 1436), V(30, 30), { align: 'center', col: BL.ink }));
    blinkLids(E.inCubic(prog(t, TOTAL - 0.5, 0.45)));
  }, { id: 'end', push: 0.01 });
  sPop(tEnd + 0.1, -4); sPop(tEnd + 0.6, -6); sBlink(TOTAL - 1.4, -2); sfx('lid', TOTAL - 0.45, -4);
}
