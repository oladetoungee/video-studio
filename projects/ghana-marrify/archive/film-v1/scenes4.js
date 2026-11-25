/* Scenes, part 4 (phase 2): the beats between the phase-1 scenes. Each build* function is called from scenes2/3 at its
 * place in the timeline (P() finds phrases in order, so call order = timeline order).
 *   buildMid()      1:12 - 2:21  the ecosystem, Nigeria, "more of this", one record vs paper, the drawback, open data, balance
 *   buildCould()    2:55 - 3:04  could we minimise to what was asked
 *   buildAccess()   3:16 - 3:37  access levels, technology is not neutral
 *   buildCulture()  3:52 - 4:08  very tricky (polaroid), privacy engineering + cultural design side by side
 *   buildClose()    4:18 - 4:58  reciprocity, who looked up my record, build it, probe it (polaroid), super cool + recap */
'use strict';

function buildMid() {
  const k = PS({
    eco: 'the data ecosystem that the governments use that they run here the way it syncs i genuinely admire it',
    ng: 'and as someone coming from nigeria it blew my mind when i got it where everything just syncs',
    dir: 'and when i see something in this direction',
    inst: 'my first instinct is like yes please more of this because it solves so many problems',
    one: "there's one reliable record instead of like just pieces of paper everywhere instead of nin and this and that",
    main: 'and i think the main thing that even made me record this video is',
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

  /* ---------- 12 · the data ecosystem: everything syncs (ink, green) ---------- */
  addS(S(k.eco), 'ink', 'ecosystem', (t) => {
    const w = k.eco.w; const tSync = w[14];
    KR(t, { lines: ['Data ecosystem.'], x: L - 4, y: V(330, 500), size: V(104, 92), t0: w[1] - 0.04, stagger: 0.05 });
    KR(t, { lines: ['The way it *syncs.*'], x: L - 4, y: V(470, 610), size: V(104, 92), t0: tSync - 0.12, stagger: 0.05 });
    KT(t, { lines: ['I genuinely ~admire~ it.'], font: 'body', x: L, y: V(620, 720), size: V(56, 54), t0: w[17] - 0.1, stagger: 0.03 });
    // hub and nodes (her examples where she gave them; the rest unlabelled)
    const cx = V(1440, CX), cy = V(560, 1090), R = V(250, 300), nw = V(250, 230), nh = V(76, 70);
    const labels = ['Health records', 'Marriage', 'Divorce', '', '', ''];
    const hub = ease(t, w[2] - 0.05, 0.45); if (hub > 0) withA(hub, () => grp('eco hub', cx - 90, cy - 50, 180, 100, () => { rect(cx - 90, cy - 50, 180, 100, C.card); mono('Your data', cx, cy + 8, 22, C.ink, 'center', { ls: 0.16, fixed: true, key: 'eco hub label' }); }));
    labels.forEach((lab, i) => {
      const a = -Math.PI / 2 + i * Math.PI / 3; const nx = cx + Math.cos(a) * R * V(1.0, 0.87), ny = cy + Math.sin(a) * R * V(0.85, 0.95);
      const lp = ease(t, w[5] + i * 0.12, 0.6, E.inOutCubic); const synced = t >= tSync;
      if (lp > 0) pline(cx + Math.cos(a) * 60, cy + Math.sin(a) * 40, lerp(cx + Math.cos(a) * 60, nx, 1), lerp(cy + Math.sin(a) * 40, ny, 1), lp, synced ? C.green : C.inkMid, 3);
      const np = ease(t, w[2] + i * 0.1, 0.45); if (np <= 0) return;
      withA(clamp(np * 2), () => nodeCard(nx, ny + 20 * (1 - E.outExpo(np)), nw, nh, lab, prog(t, tSync + 0.05 + i * 0.04, 0.3), { key: 'eco node ' + i }));
    });
    withA(ease(t, tSync + 0.4, 0.3), () => illus(W - L, V(cy + R * 0.85 + 90, 1436), 'right'));
  }, { id: 'ecosystem', acc: 'green' });
  sCard(k.eco.w[2]); sPop(k.eco.w[1], -4); [0, 1, 2, 3, 4, 5].forEach(i => sTick(k.eco.w[2] + i * 0.1, -7)); sWh(k.eco.w[5], -8); sImp(k.eco.w[14] + 0.05, -10); [0, 0.04, 0.08].forEach(d => sTick(k.eco.w[14] + 0.1 + d, -2)); sPen(k.eco.w[17] + 0.3, -5);

  /* ---------- 13 · coming from Nigeria, it blew my mind (paper, green) ---------- */
  addS(S(k.ng), 'paper', 'nigeria', (t) => {
    const w = k.ng.w;
    flagIn(t, S(k.ng) + 0.06, 'nigeria', V(1290, L), V(220, 420), V(420, 300), { key: 'ng flag', label: 'Nigeria', labSize: 26 });
    KT(t, { lines: ['Coming from Nigeria,'], font: 'body', x: L, y: V(300, 760), size: V(64, 60), t0: w[3] - 0.05, stagger: 0.03 });
    KR(t, { lines: ['It blew', '*my mind.*'], x: L - 4, y: V(500, 940), size: V(170, 150), t0: w[7] - 0.06, stagger: 0.05 });
    withA(ease(t, w[15], 0.35), () => mono('Where everything just syncs', L, V(800, 1180), 28, g.mid, 'left', { ls: 0.22 }));
    // and then Ghana, doing something in this direction
    flagIn(t, k.dir.w[4] - 0.1, 'ghana', V(1290, L + 330), V(600, 420), V(300, 225), { key: 'ng ghana', label: 'Ghana', labSize: 26 });
    wipe(t, k.inst.w[0] - 0.15, C.green, 0.4);
  }, { id: 'nigeria', acc: 'green' });
  sPop(S(k.ng) + 0.45, -3); sPop(k.ng.w[3], -6); sImp(k.ng.w[9] + 0.05, -9); sPop(k.dir.w[4] + 0.3, -3); sWh(k.inst.w[0] - 0.35, -3);

  /* ---------- 14 · yes, please, more of this (green full bleed) ---------- */
  addS(k.inst.w[0] - 0.15, 'green', 'more-of-this', (t) => {
    const w = k.inst.w;
    KR(t, { lines: ['My first instinct:'], x: L - 4, y: V(280, 560), size: V(84, 76), t0: k.inst.w[0] - 0.1, stagger: 0.04 });
    KR(t, { lines: ['Yes, please.'], x: L - 6, y: V(500, 790), size: V(190, 150), times: [w[5], w[6]] });
    KR(t, { lines: V(['~More of this.~'], ['~More of~', '~this.~']), x: L - 6, y: V(700, 960), size: V(190, 160), times: [w[7], w[8], w[9]] });
    KT(t, { lines: V(['Because it solves so many problems.'], ['Because it solves', 'so many problems.']), font: 'body', x: L, y: V(900, 1300), size: V(52, 52), t0: w[12] - 0.1, stagger: 0.03 });
  }, { id: 'more-of-this', acc: 'green', push: 0.02 });
  sPop(k.inst.w[5], -2); sPop(k.inst.w[6], -4); sImp(k.inst.w[7] + 0.05, -8); sPop(k.inst.w[12], -6);

  /* ---------- 15 · one reliable record, instead of pieces of paper everywhere (paper, blue) ---------- */
  addS(S(k.one), 'paper', 'one-record', (t) => {
    const w = k.one.w, m = k.main.w; const tMain = m[4] - 0.1;
    beat(t, 0, tMain, () => KR(t, { lines: V(['*One* reliable record.'], ['*One* reliable', 'record.']), x: L - 4, y: V(210, 480), size: V(92, 88), t0: w[1] - 0.06, stagger: 0.04 }));
    beat(t, tMain, 1e9, () => KT(t, { lines: V(['The main thing that made me record this video:'], ['The main thing that made', 'me record this video:']), font: 'body', x: L, y: V(210, 480), size: V(58, 54), t0: tMain + 0.05, stagger: 0.03 }));
    const cx = L, cy = V(300, 600), cw = V(620, W - 2 * L), rows = [['Names', 0.75], ['Status', 0.45], ['Dates', 0.5], ['Place', 0.6]].slice(0, V(4, 3)).map(([kk, bw], i) => ({ k: kk, bw, mark: C.blue, tin: w[1] + 0.2 + i * 0.07 }));
    const ch = 92 + rows.length * 60 + 26;
    landing(t, w[1] - 0.05, cx, cy, { dy: 90, d: 0.5 }, (X, Y) => recordCard(t, X, Y, cw, { title: 'One record', tag: 'Illustration', rows, rowH: 60, key: 'one record 2' }));
    // the paper pile
    const px0 = V(860, L), py0 = V(260, 950), pw = V(950, W - 2 * L), ph = V(640, 420);
    const back = ease(t, m[2], 0.7, E.inOutCubic);   // "and I think the main thing": the pile clears into the record
    const tgtX = cx + cw / 2, tgtY = cy + ch / 2;
    for (let i = 0; i < 14; i++) {
      const tin = w[8] + i * 0.06; const p = ease(t, tin, 0.45); if (p <= 0) continue;
      const sx = px0 + 60 + hash(i * 3.1) * (pw - 300), sy = py0 + 20 + hash(i * 7.7) * (ph - 220); const rot = (hash(i * 5.3) - 0.5) * 0.7;
      const x = lerp(sx, tgtX - 110, back), y = lerp(sy, tgtY - 140, back) + (1 - E.outBack(p, 1.4)) * -80;
      withA(clamp(p * 3) * (1 - back), () => sheet(x, y, V(220, 180), V(280, 230), rot * (1 - back), { lines: 5, stamp: i % 5 === 2 }));
    }
    // NIN and "this and that"
    [['NIN', w[14]], ['', w[16]], ['', w[18] - 0.1]].forEach(([lab, tin], i) => {
      const p = ease(t, tin, 0.4); if (p <= 0) return;
      const ix = V(1180 + i * 170, L + 380 + i * 130), iy = V(470 + i * 70, 1040 + i * 60);
      withA(clamp(p * 3) * (1 - back), () => idCard(lerp(ix, tgtX - 120, back), lerp(iy + 40 * (1 - E.outBack(p, 1.6)), tgtY, back), V(260, 220), lab, (i - 1) * 0.12));
    });
    withA(ease(t, w[11], 0.35) * (1 - back), () => mono('Pieces of paper everywhere', V(px0 + pw, W - L), V(960, 1436), 26, g.mid, 'right', { ls: 0.2 }));
  }, { id: 'one-record', acc: 'blue' });
  sCard(k.one.w[1]); sPop(k.one.w[1] + 0.1, -4); [0, 0.18, 0.36, 0.54].forEach(d => sfx('page', k.one.w[8] + d, -4 - d * 6)); sPop(k.one.w[14] + 0.1, -2); sPop(k.one.w[16] + 0.1, -5); sPop(k.one.w[18], -6); sWh(k.main.w[2] + 0.2, -4); sfx('page', k.main.w[2] + 0.5, -6);

  /* ---------- 16 · the drawback TechCabal raised: sensitive private data (paper, orange) ---------- */
  addS(S(k.raise), 'paper', 'sensitive', (t) => {
    const w = k.raise.w;
    KT(t, { lines: V(['The drawback ~TechCabal~ raised:'], ['The drawback', '~TechCabal~ raised:']), font: 'body', x: L, y: V(220, 480), size: V(64, 60), t0: w[1] - 0.08, stagger: 0.03 });
    const cards = [['Marriage record', w[8]], ['Divorce record', w[10]]];
    cards.forEach(([title, tin], i) => {
      const x = V(L + i * 640, L), y = V(320, 640 + i * 270), cw = V(600, W - 2 * L);
      landing(t, tin - 0.05, x, y, { dy: 80, r: (i ? 0.04 : -0.04), d: 0.5 }, (X, Y, R) => withT(X + cw / 2, Y + 120, 1, R, () => recordCard(t, -cw / 2, -120, cw, { title, tag: 'Illustration', rowH: 56, rows: [['Names', 0.7], ['Date', 0.45]].map(([kk, bw]) => ({ k: kk, bw })), key: 'sens ' + i })));
      stamp(t, w[13] + i * 0.18, x + cw - V(150, 170), y + V(150, 150), 'Sensitive', C.orange, { size: V(30, 28), rot: -0.1, key: 'sensitive stamp ' + i });
    });
    KR(t, { lines: V(['Sensitive *private data.*'], ['Sensitive', '*private data.*']), x: L - 4, y: V(840, 1260), size: V(112, 104), t0: w[13] - 0.06, stagger: 0.05 });
  }, { id: 'sensitive', acc: 'orange' });
  sCard(k.raise.w[8] - 0.05); sCard(k.raise.w[10] - 0.05, -2); sStamp(k.raise.w[13] + 0.08, -1); sStamp(k.raise.w[13] + 0.26, -4); sPen(k.raise.w[1] + 0.3, -5);

  /* ---------- 17 · a personal thing about someone's life (ink, orange) ---------- */
  addS(S(k.pers), 'ink', 'personal', (t) => {
    const w = k.pers.w;
    const ps = V(300, 240); const px = V(420, L + 160), py = V(560, 760);
    const pp = ease(t, S(k.pers) + 0.05, 0.5); withA(pp, () => person(px, py + 30 * (1 - E.outExpo(pp)), ps, C.paper));
    landing(t, w[5] - 0.05, V(760, 400), V(330, 560), { dx: 140, dy: 0, d: 0.5 }, (X, Y) => recordCard(t, X, Y, V(560, 600), { title: 'Divorce record', tag: 'Illustration', rowH: 56, rows: [['Names', 0.7], ['Date', 0.45], ['Court', 0.55]].map(([kk, bw]) => ({ k: kk, bw })), border: C.orange, key: 'personal record' }));
    KT(t, { lines: V(["A ~personal~ thing about someone's life."], ['A ~personal~ thing', "about someone's life."]), font: 'body', x: L, y: V(880, 1120), size: V(62, 60), t0: w[9] - 0.08, stagger: 0.03 });
  }, { id: 'personal', acc: 'orange' });
  sPop(S(k.pers) + 0.3, -4); sCard(k.pers.w[5] - 0.05); sPen(k.pers.w[9] + 0.3, -3);

  /* ---------- 18 · searchable by anyone that has your name (paper, orange) ---------- */
  addS(S(k.srch), 'paper', 'searchable', (t) => {
    const w = k.srch.w;
    landing(t, S(k.srch) + 0.04, L, V(250, 640), { dy: 60, d: 0.45 }, (X, Y) => { searchBox(t, X, Y, V(1000, W - 2 * L), { h: V(100, 96), q: 'Your name', typeT0: w[10], cps: 20, press: w[11] + 0.35, key: 'your name box' }); illus(X + V(1000, W - 2 * L), Y + V(140, 136), 'right'); });
    KR(t, { lines: V(['Searchable by *anyone*'], ['Searchable', 'by *anyone*']), x: L - 4, y: V(520, 480), size: V(90, 84), t0: w[5] - 0.06, stagger: 0.05 });
    crowd(t, w[7] - 0.05, V(L + 40, L + 50), V(720, 860), V(16, 9), V(3, 3), V(66, 102), V(46, 64), C.ink);
    landing(t, w[11] + 0.4, V(1230, L), V(320, 1150), { dy: 80, d: 0.5 }, (X, Y) => recordCard(t, X, Y, V(580, W - 2 * L), { title: 'Divorce record', rowH: 56, rows: [['Names', 0.7], ['Date', 0.45]].map(([kk, bw]) => ({ k: kk, bw })), border: C.orange, key: 'search result' }));
  }, { id: 'searchable', acc: 'orange' });
  sCard(S(k.srch) + 0.04); sPop(k.srch.w[5], -4); [0, 0.15, 0.3].forEach(d => sTick(k.srch.w[7] + d, -4)); sType(k.srch.w[10], 9, 20); sClick(k.srch.w[11] + 0.35); sCard(k.srch.w[11] + 0.4);

  /* ---------- 19 · I like open data: in Estonia you can look up a business (paper, blue) ---------- */
  addS(S(k.od), 'paper', 'open-data', (t) => {
    const w = k.od.w, b = k.biz.w, c = k.bizc.w, y = k.year.w;
    KT(t, { lines: V(["I'm saying this as someone that likes ~open data.~"], ["I'm saying this as someone", 'that likes ~open data.~']), font: 'body', x: L, y: V(200, 470), size: V(56, 54), t0: w[2] - 0.08, stagger: 0.03 });
    flagIn(t, b[1] - 0.1, 'estonia', V(W - L - 200, W - L - 160), V(110, 560), V(200, 160), { key: 'od flag', label: 'Estonia', labSize: 22, labDy: 36 });
    landing(t, b[4] - 0.1, L, V(300, 590), { dy: 60, d: 0.45 }, (X, Y) => searchBox(t, X, Y, V(1000, 740), { h: V(96, 92), fs: V(36, 30), q: 'A business', typeT0: b[4], cps: 20, press: b[8], key: 'business box' }));
    // the business record (illustration): a revenue bar that fills when she says how much
    const bx = L, by = V(450, 760), bw = V(1700, W - 2 * L), bh = V(470, 600);
    landing(t, b[8] - 0.05, bx, by, { dy: 80, d: 0.5 }, (X, Y) => grp('business card', X, Y, bw, bh, () => {
      rect(X, Y, bw, bh, C.card); strokeR(X, Y, bw, bh, C.ink, 4);
      mono('Business record', X + 36, Y + 56, 24, C.ink, 'left', { ls: 0.2, fixed: true }); mono('Illustration', X + bw - 36, Y + 56, 20, C.mid, 'right', { ls: 0.2, fixed: true, key: 'biz tag' });
      rect(X + 36, Y + 80, bw - 72, 3, C.ink);
      [['Name', 0.5], ['Registered', 0.35]].forEach(([kk, f], i) => { mono(kk, X + 36, Y + 140 + i * 64, 22, C.mid, 'left', { ls: 0.16, fixed: true, raw: true }); rect(X + V(330, 300), Y + 124 + i * 64, (bw - V(400, 340)) * f, 18, '#D3CCBF'); });
      const rp = ease(t, c[3], 1.0, E.outCubic); const ry = Y + V(300, 300);
      withA(ease(t, c[3] - 0.1, 0.3), () => mono('How much it made', X + 36, ry + 30, 22, C.ink, 'left', { ls: 0.16, fixed: true }));
      rect(X + V(330, 36), ry + V(0, 60), (bw - V(400, 72)) * 0.72 * rp, V(46, 46), C.blue);
      withA(ease(t, y[10] - 0.1, 0.35), () => mono('In a year', X + V(330, 36), ry + V(100, 160), 22, C.blue, 'left', { ls: 0.2, fixed: true }));
    }));
  }, { id: 'open-data', acc: 'blue' });
  sPop(k.od.w[2], -6); sPop(k.biz.w[1] + 0.3, -4); sType(k.biz.w[4], 10, 20); sClick(k.biz.w[8]); sCard(k.biz.w[8] - 0.05); sWh(k.bizc.w[3] + 0.1, -8); sPop(k.year.w[10], -4);

  /* ---------- 20 · that's fine: a public entity (paper, green) ---------- */
  addS(S(k.fine), 'paper', 'public-entity', (t) => {
    const w = k.fine.w;
    KR(t, { lines: ["That's *fine.*"], x: L - 4, y: V(240, 500), size: V(130, 120), t0: w[1] - 0.06, stagger: 0.05 });
    withA(ease(t, w[7] - 0.1, 0.3), () => mono('Because a business is', L, V(340, 590), 28, g.mid, 'left', { ls: 0.22 }));
    const rows = [{ n: '01', s: 'A public entity', tin: w[11] - 0.1 }, { n: '02', s: 'Takes public money', tin: w[15] - 0.1 }, { n: '03', s: 'Holds public accountability', tin: w[18] - 0.1 }];
    const y0 = V(500, 760), rh = V(150, 170), sz = V(84, 66);
    IDX(t, rows, { x: L, y: y0, w: V(1700, W - 2 * L), rowH: rh, size: sz, numW: V(120, 84) });
    rows.forEach((r, i) => { const bs = V(70, 60), bx = W - L - bs, byy = y0 + i * rh - sz * 0.76; const ap = ease(t, r.tin + 0.1, 0.3); if (ap > 0) withA(ap, () => { strokeR(bx, byy, bs, bs, C.ink, 4); checkboxT(bx, byy, bs, prog(t, r.tin + 0.35, 0.3), C.greenInk, C.card); }); });
    wipe(t, k.div.w[0] - 0.15, C.orange, 0.4);
  }, { id: 'public-entity', acc: 'green' });
  sPop(k.fine.w[2], -3); [11, 15, 18].forEach(i => { sPop(k.fine.w[i] - 0.1, -4); sTick(k.fine.w[i] + 0.3, -2); }); sWh(k.div.w[0] - 0.35, -3);

  /* ---------- 21 · but a divorce is a little bit different (orange full bleed) ---------- */
  addS(k.div.w[0] - 0.15, 'orange', 'different', (t) => {
    const w = k.div.w;
    KT(t, { lines: V(['But maybe, in the case of a divorce,'], ['But maybe, in the', 'case of a divorce,']), font: 'body', x: L, y: V(300, 640), size: V(64, 60), t0: w[4] - 0.12, stagger: 0.03 });
    KR(t, { lines: V(["it's a little bit", '~different.~'], ["it's a little", 'bit ~different.~']), x: L - 6, y: V(560, 900), size: V(170, 130), times: V([w[8], w[9], w[10], w[11], w[12]], [w[8], w[9], w[10], w[11], w[12]]) });
  }, { id: 'different', acc: 'orange', push: 0.02 });
  sPop(k.div.w[4], -5); sImp(k.div.w[12] + 0.05, -8);

  /* ---------- 22 · I don't really know how to balance it (paper, blue) ---------- */
  addS(S(k.think), 'paper', 'balance', (t) => {
    const w = k.know.w;
    KT(t, { lines: ['That really got me thinking.'], font: 'body', x: L, y: V(200, 470), size: V(56, 54), t0: k.think.w[5] - 0.1, stagger: 0.03 });
    KR(t, { lines: ["I don't really *know.*"], x: L - 4, y: V(340, 600), size: V(110, 92), t0: w[2] - 0.06, stagger: 0.05 });
    // the scale: open data (left) vs personal data and privacy (right); it never quite settles
    const tL = w[10], tR = w[24], tB = w[20];
    const lean = -0.14 * ease(t, tL + 0.2, 0.8, E.outCubic) + 0.2 * ease(t, tR + 0.2, 0.8, E.outCubic);
    const wob = (t > tB ? 0.08 * Math.sin((t - tB) * 5.2) * Math.exp(-(t - tB) * 0.55) : 0);
    const ang = lean + wob; const sc = ease(t, S(k.think) + 0.05, 0.5);
    const cx = V(1180, CX), cy = V(560, 920), bw = V(1000, 620);
    withA(sc, () => balanceScale(cx, cy, bw, ang, C.ink, (px, py) => {
      const p = ease(t, tL, 0.4); if (p > 0) withA(p, () => chip(px - V(140, 120), py - V(80, 72) - 20 * (1 - E.outBack(p, 1.6)), V(280, 240), V(72, 66), 'Open data', { col: C.blue, fg: C.blue, size: V(24, 22), key: 'scale left' }));
    }, (px, py) => {
      const p = ease(t, tR, 0.4); if (p > 0) withA(p, () => { chip(px - V(160, 120), py - V(152, 138) - 20 * (1 - E.outBack(p, 1.6)), V(320, 240), V(72, 66), 'Personal data', { size: V(24, 22), key: 'scale right a' }); });
      const q = ease(t, w[27], 0.4); if (q > 0) withA(q, () => chip(px - V(160, 120), py - V(80, 72) - 20 * (1 - E.outBack(q, 1.6)), V(320, 240), V(72, 66), 'Privacy', { size: V(24, 22), key: 'scale right b' }));
    }, { postH: V(300, 300), hang: V(110, 100), panW: V(330, 260) }));
  }, { id: 'balance', acc: 'blue' });
  sPop(k.think.w[5], -6); sPop(k.know.w[3], -3); sPop(k.know.w[10], -3); sWh(k.know.w[10] + 0.25, -9); sPop(k.know.w[24], -3); sPop(k.know.w[27], -4); sWh(k.know.w[24] + 0.25, -9);
}

function buildCould() {
  const k = PS({
    play: 'i was also thinking about how data minimisation can come to play here as well',
    could: "could we minimise data to the point where we are not exposing much more than it's been asked for",
  });
  /* ---------- 33 · could we minimise to what was asked? (ink, green) ---------- */
  addS(S(k.play), 'ink', 'could', (t) => {
    const p = k.play.w, c = k.could.w;
    beat(t, 0, c[0] - 0.12, () => KT(t, { lines: V(['How can data minimisation ~come to play~ here?'], ['How can data minimisation', '~come to play~ here?']), font: 'body', x: L, y: V(220, 480), size: V(56, 54), t0: p[5] - 0.1, stagger: 0.03 }));
    beat(t, c[0] - 0.12, 1e9, () => {
      KT(t, { lines: V(['Could we minimise data to the point where we are'], ['Could we minimise data', 'to the point where we are']), font: 'body', x: L, y: V(220, 480), size: V(56, 54), t0: c[0] - 0.08, stagger: 0.025 });
      KT(t, { lines: V(["not exposing much more than it's been ~asked for?~"], ['not exposing much more than', "it's been ~asked for?~"]), font: 'body', x: L, y: V(290, 610), size: V(56, 54), t0: c[10] - 0.08, stagger: 0.025 });
    });
    // the exposure meter: everything, then only what was asked
    const n = 12; const shrink = ease(t, c[2], 1.1, E.outCubic); const on = Math.max(1, Math.round(n - (n - 1) * shrink));
    const mx = L, my = V(560, 900), mw = W - 2 * L, mh = V(150, 150);
    const mp = ease(t, S(k.play) + 0.05, 0.5); if (mp > 0) withA(mp, () => grp('exposure meter', mx, my - 50, mw, mh + 110, () => {
      mono('Data shown', mx, my - 22, 26, g.mid, 'left', { ls: 0.2 }); mono('Illustration', mx + mw, my - 22, 20, g.mid, 'right', { ls: 0.2, key: 'meter tag' });
      strokeR(mx, my, mw, mh, C.inkMid, 3); const cw = (mw - 40) / n;
      for (let i = 0; i < n; i++) { const cx = mx + 20 + i * cw; if (i < on) rect(cx + 4, my + 20, cw - 8, mh - 40, i === 0 && shrink > 0.9 ? C.green : C.paper); else strokeR(cx + 4, my + 20, cw - 8, mh - 40, C.inkLine, 2); }
      withA(ease(t, c[17] - 0.1, 0.35), () => { mono('What was asked', mx + 20, my + mh + 50, 26, C.green, 'left', { ls: 0.2 }); arrow(mx + 20 + cw / 2, my + mh + 16, mx + 20 + cw / 2, my + mh - 8, 1, C.green, 3, 12); });
    }));
  }, { id: 'could', acc: 'green' });
  sCard(S(k.play) + 0.05); sPop(k.play.w[5], -6); sWh(k.could.w[2] + 0.2, -6); [0, 0.15, 0.3, 0.45].forEach(d => sTick(k.could.w[2] + 0.1 + d, -6)); sPop(k.could.w[17], -2);
}

function buildAccess() {
  const k = PS({
    acc: 'but of course another person could request another thing',
    lev: 'and then i was thinking about like access level',
    ind: 'maybe perhaps an individual could access a level of this data',
    org: 'and maybe there are certain organizations or institutions that can access more',
    all: 'i was just thinking about all of it',
    tech: 'and again i always say this that technology is not neutral',
    form: "it works it takes the form of the system or the place that you're using it in",
  });
  /* ---------- 35 · access levels (paper, blue) ---------- */
  addS(S(k.acc), 'paper', 'access', (t) => {
    const a = k.acc.w, l = k.lev.w;
    beat(t, 0, l[7] - 0.15, () => {
      KT(t, { lines: ['Another person could request ~another thing.~'], font: 'body', x: L, y: V(220, 480), size: V(58, 54), t0: a[3] - 0.08, stagger: 0.03 });
      const cx = L, cy = V(360, 640), cw = V(820, W - 2 * L);
      const p1 = ease(t, S(k.acc) + 0.05, 0.4); if (p1 > 0) withA(p1, () => chip(cx, cy, cw, V(86, 80), 'Is this person married?', { size: V(26, 24), tick: 1, key: 'req 1' }));
      const p2 = ease(t, a[6], 0.4); if (p2 > 0) withA(p2, () => chip(cx, cy + V(110, 104) + 20 * (1 - E.outBack(p2, 1.6)), cw, V(86, 80), 'Another request…', { size: V(26, 24), col: C.blue, fg: C.blue, key: 'req 2' }));
    });
    beat(t, l[7] - 0.15, 1e9, () => {
      KR(t, { lines: ['Access *levels.*'], x: L - 4, y: V(250, 520), size: V(130, 120), t0: l[7] - 0.1, stagger: 0.05 });
      const mw = W - 2 * L, mh = V(96, 90);
      const t1 = k.ind.w[3], t2 = k.org.w[5];
      const f1 = ease(t, t1 + 0.1, 0.6, E.outCubic) * 2 / 12, f2 = ease(t, t2 + 0.1, 0.6, E.outCubic) * 6 / 12 + ease(t, k.org.w[11] - 0.1, 0.6, E.outCubic) * 3 / 12;
      if (t >= t1 - 0.1) withA(ease(t, t1 - 0.1, 0.35), () => meter(t, L, V(440, 720), mw, mh, f1, { label: 'An individual', cells: 12, key: 'tier individual' }));
      if (t >= t2 - 0.1) withA(ease(t, t2 - 0.1, 0.35), () => meter(t, L, V(660, 940), mw, mh, f2, { label: 'Organisations or institutions', cells: 12, key: 'tier institutions', foot: 'Illustration' }));
    });
  }, { id: 'access', acc: 'blue' });
  sPop(k.acc.w[3], -6); sCard(S(k.acc) + 0.05, -3); sCard(k.acc.w[6], -2); sPop(k.lev.w[7], -3); sPop(k.ind.w[3], -3); [0, 0.1].forEach(d => sTick(k.ind.w[3] + 0.15 + d, -3)); sPop(k.org.w[5], -3); [0, 0.1, 0.2, 0.3].forEach(d => sTick(k.org.w[5] + 0.15 + d, -4)); sTick(k.org.w[11], -2);

  /* ---------- 36 · technology is not neutral (orange full bleed) ---------- */
  addS(S(k.tech), 'orange', 'not-neutral', (t) => {
    const w = k.tech.w, f = k.form.w;
    KR(t, { lines: ['I always say this:'], x: L - 4, y: V(270, 560), size: V(84, 72), t0: w[1] - 0.06, stagger: 0.04 });
    KR(t, { lines: ['Technology'], x: L - 8, y: V(470, 760), size: V(210, 150), times: [w[7]] });
    KR(t, { lines: V(['is ~not neutral.~'], ['is ~not~', '~neutral.~']), x: L - 8, y: V(680, 930), size: V(210, 150), t0: w[9] - 0.08, stagger: 0.06 });
    KT(t, { lines: V(["It takes the form of the system, or the place you're using it in."], ['It takes the form of the', 'system, or the place', "you're using it in."]), font: 'body', x: L, y: V(900, 1240), size: V(50, 52), t0: f[3] - 0.08, stagger: 0.025 });
  }, { id: 'not-neutral', acc: 'orange', push: 0.02 });
  sImp(k.tech.w[9] + 0.05, -7); sPop(k.tech.w[7], -3); sPop(k.form.w[3], -6);
}

function buildCulture() {
  const k = PS({
    tri: "so it's very tricky when i think about it when i think about the drawbacks first",
    exp: 'that this is something that i myself think i need to explore further the human side of this thing',
    eng: "it's not just a privacy engineering conversation it's also a cultural design thing",
    side: "but i've just been putting it side by side i really love the idea",
  });
  /* ---------- 41 · very tricky; I myself need to explore further (paper, orange; polaroid of her) ---------- */
  addS(S(k.tri), 'paper', 'tricky', (t) => {
    const w = k.tri.w, e = k.exp.w;
    KR(t, { lines: ['Very *tricky.*'], x: L - 6, y: V(300, 520), size: V(160, 130), t0: w[3] - 0.06, stagger: 0.05 });
    withA(ease(t, w[14] - 0.1, 0.35), () => mono('When I think about the drawbacks', L, V(400, 600), 28, g.mid, 'left', { ls: 0.22, maxW: V(undefined, 520) }));
    polaroidIn(t, e[6] - 0.1, IMG.her_explore, V(1480, W - L - 190), V(560, 870), V(420, 340), 0.05, 'Gbemi, HCI researcher', { key: 'polaroid explore' });
    KT(t, { lines: V(['I need to explore further:'], ['I need to explore', 'further:']), font: 'body', x: L, y: V(640, 1110), size: V(66, 60), t0: e[11] - 0.1, stagger: 0.03 });
    KR(t, { lines: V(['~the human side.~'], ['~the human~', '~side.~']), x: L - 4, y: V(820, 1290), size: V(130, 110), t0: e[14] - 0.06, stagger: 0.06 });
  }, { id: 'tricky', acc: 'orange' });
  sPop(k.tri.w[3], -3); sCard(k.exp.w[6] - 0.1); sfx('page', k.exp.w[6], -4); sPop(k.exp.w[11], -6); sPen(k.exp.w[14] + 0.4, -2);

  /* ---------- 42 · privacy engineering AND cultural design, side by side (ink, orange) ---------- */
  addS(S(k.eng), 'ink', 'cultural', (t) => {
    const w = k.eng.w, s = k.side.w;
    KT(t, { lines: V(["It's not just a privacy engineering conversation,"], ["It's not just a privacy", 'engineering conversation,']), font: 'body', x: L, y: V(200, 470), size: V(56, 54), t0: w[1] - 0.08, stagger: 0.025 });
    KT(t, { lines: V(["it's also a ~cultural design~ thing."], ["it's also a ~cultural~", '~design~ thing.']), font: 'body', x: L, y: V(272, 610), size: V(56, 54), t0: w[8] - 0.08, stagger: 0.03 });
    const apart = ease(t, s[6] - 0.1, 0.8, E.inOutCubic);   // "side by side": the circles slide apart
    const r = V(250, 210), cy = V(690, 1080), c1 = V(CX - 160, CX - 120) - V(170, 110) * apart, c2 = V(CX + 160, CX + 120) + V(170, 110) * apart;
    const p1 = ease(t, w[4] - 0.05, 0.5), p2 = ease(t, w[10] - 0.05, 0.5);
    if (p1 > 0) withA(p1, () => { ctx.save(); ctx.strokeStyle = C.paper; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(c1, cy, r * E.outBack(p1, 1.4), 0, Math.PI * 2); ctx.stroke(); ctx.restore(); txtW('Privacy engineering', c1 - r * 0.62, cy, F.body(V(40, 34), 700), C.paper, r * 1.0, V(46, 40)); });
    if (p2 > 0) withA(p2, () => { ctx.save(); ctx.strokeStyle = C.orange; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(c2, cy, r * E.outBack(p2, 1.4), 0, Math.PI * 2); ctx.stroke(); ctx.restore(); txtW('Cultural design', c2 - r * 0.4, cy, F.body(V(40, 34), 700), C.orange, r * 1.0, V(46, 40)); });
    withA(ease(t, s[8] - 0.1, 0.35), () => mono('Side by side', V(CX, CX), V(1010, 1360), 28, g.fg, 'center', { ls: 0.24 }));
  }, { id: 'cultural', acc: 'orange' });
  sPop(k.eng.w[4], -3); sPop(k.eng.w[10], -2); sWh(k.side.w[6] + 0.2, -6); sPop(k.side.w[8], -5);
}

function buildClose() {
  const k = PS({
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

  /* ---------- 52 · reciprocity, for the average individual (paper, green) ---------- */
  addS(S(k.rc), 'paper', 'reciprocity', (t) => {
    const w = k.rc.w, a = k.avg.w;
    flagIn(t, S(k.rc) + 0.06, 'ghana', V(W - L - 370, L), V(130, 420), V(150, 135), { key: 'rc ghana' });
    flagIn(t, S(k.rc) + 0.2, 'nigeria', V(W - L - 200, L + 160), V(130, 420), V(200, 180), { key: 'rc nigeria' });
    KT(t, { lines: V(['If we are creating ~open data~ in Africa,'], ['If we are creating', '~open data~ in Africa,']), font: 'body', x: L, y: V(330, 640), size: V(64, 58), t0: w[8] - 0.1, stagger: 0.03 });
    KR(t, { lines: ['*Reciprocity.*'], x: L - 8, y: V(610, 900), size: V(220, 150), times: [w[21]] });
    KT(t, { lines: ['For the average individual?'], font: 'body', x: L, y: V(800, 1060), size: V(62, 58), t0: a[6] - 0.1, stagger: 0.03 });
    const pp = ease(t, a[7] - 0.05, 0.45); withA(pp, () => person(V(1560, 860), V(880, 1260) + 20 * (1 - E.outBack(pp, 1.6)), V(240, 200), C.greenInk));
  }, { id: 'reciprocity', acc: 'green' });
  sPop(S(k.rc) + 0.4, -4); sPop(k.rc.w[8], -6); sImp(k.rc.w[21] + 0.05, -9); sPop(k.avg.w[6], -6); sPop(k.avg.w[7], -3);

  /* ---------- 53 · if someone looks up my record, do I get to see that? (ink, green) ---------- */
  addS(S(k.look), 'ink', 'looked-up', (t) => {
    const w = k.look.w;
    KT(t, { lines: V(['If someone looks up my marriage record,'], ['If someone looks up', 'my marriage record,']), font: 'body', x: L, y: V(190, 470), size: V(56, 54), t0: w[1] - 0.08, stagger: 0.025 });
    KR(t, { lines: ['Do I get to *see* that?'], x: L - 4, y: V(300, 610), size: V(84, 72), t0: w[7] - 0.06, stagger: 0.04 });
    const sp = ease(t, w[1] - 0.05, 0.45); const px = V(300, L + 90), py = V(640, 860);
    withA(sp, () => { person(px, py, V(200, 150), C.inkMid); mono('Someone', px, py + V(140, 110), 24, g.mid, 'center', { ls: 0.2 }); });
    const cx = V(560, 400), cy = V(450, 740), cw = V(520, 600);
    landing(t, w[5] - 0.05, cx, cy, { dx: 80, dy: 0, d: 0.5 }, (X, Y) => recordCard(t, X, Y, cw, { title: 'My marriage record', rowH: 56, rows: [['Names', 0.7], ['Status', 0.45], ['Dates', 0.5]].slice(0, V(3, 2)).map(([kk, bw]) => ({ k: kk, bw, mark: t >= w[2] ? '#8A8780' : null })), key: 'looked record' }));
    arrow(px + V(110, 90), py - V(60, 40), cx - 16, py - V(60, 40), ease(t, w[2], 0.45, E.inOutCubic), C.inkMid, 4, 18);
    // the notification she would get (illustration)
    const nx = V(1180, L), ny = V(680, 1110), nw = V(630, W - 2 * L), nh = V(150, 150);
    landing(t, w[11] - 0.05, nx, ny, { dy: -60, d: 0.5 }, (X, Y) => grp('notification', X, Y, nw, nh, () => {
      rect(X, Y, nw, nh, C.card); strokeR(X, Y, nw, nh, C.green, 4);
      eye(X + 70, Y + nh / 2, 36, C.ink, ease(t, w[11] + 0.2, 0.35), C.card);
      txt('Someone looked up your record', X + 130, Y + 70, F.body(V(32, 30), 700), C.ink, 'left', 'alphabetic', 0, 'notif text');
      mono('Illustration', X + 130, Y + 112, 18, C.mid, 'left', { ls: 0.2, fixed: true, key: 'notif tag' });
    }));
  }, { id: 'looked-up', acc: 'green' });
  sPop(k.look.w[1], -6); sWh(k.look.w[2] + 0.1, -8); sCard(k.look.w[5] - 0.05); sPop(k.look.w[7], -4); sfx('pop', k.look.w[11], -1); sTick(k.look.w[11] + 0.25, -3);

  /* ---------- 54 · I really want African countries building this (green full bleed) ---------- */
  addS(S(k.want), 'green', 'build-it', (t) => {
    const w = k.want.w, s = k.solve.w, h = k.helps.w;
    KR(t, { lines: V(['I really want', 'African countries', '~building this.~'], ['I really want', 'African', 'countries', '~building this.~']), x: L - 6, y: V(300, 560), size: V(150, 120), times: [w[0], w[1], w[2], w[3], w[4], w[5], w[6]] });
    flagIn(t, w[3] - 0.05, 'ghana', V(W - L - 420, L), V(140, 1060), V(180, 150), { key: 'build ghana' });
    flagIn(t, w[3] + 0.1, 'nigeria', V(W - L - 220, L + 180), V(140, 1060), V(220, 200), { key: 'build nigeria' });
    beat(t, s[0] - 0.12, h[0] - 0.1, () => KT(t, { lines: ['It also solves a problem.'], font: 'body', x: L, y: V(880, 1300), size: V(60, 56), t0: s[5] - 0.1, stagger: 0.03 }));
    beat(t, h[0] - 0.1, 1e9, () => KT(t, { lines: V(['Technology helps, with things like this.'], ['Technology helps,', 'with things like this.']), font: 'body', x: L, y: V(880, 1300), size: V(60, 56), t0: h[0] - 0.08, stagger: 0.03 }));
  }, { id: 'build-it', acc: 'green', push: 0.02 });
  sPop(k.want.w[2], -4); sPop(k.want.w[3] + 0.4, -4); sImp(k.want.w[6] + 0.05, -8); sPop(k.solve.w[5], -5); sPop(k.helps.w[0], -5);

  /* ---------- 55 · probe it, question it (ink, blue; polaroid of her) ---------- */
  addS(S(k.probe), 'ink', 'probe', (t) => {
    const w = k.probe.w, hd = k.head.w;
    KT(t, { lines: V(['If we want to build this kind of infrastructure,'], ['If we want to build this', 'kind of infrastructure,']), font: 'body', x: L, y: V(190, 470), size: V(54, 52), t0: w[5] - 0.1, stagger: 0.025 });
    const cx = L, cy = V(300, 600), cw = V(660, 600), rows = [['Names', 0.7], ['Status', 0.45], ['Dates', 0.5], ['Court', 0.6], ['History', 0.65]].slice(0, V(5, 4));
    landing(t, S(k.probe) + 0.06, cx, cy, { dy: 80, d: 0.5 }, (X, Y) => recordCard(t, X, Y, cw, { title: 'A public record', tag: 'Illustration', rowH: 60, rows: rows.map(([kk, bw]) => ({ k: kk, bw })), key: 'probe record' }));
    // question marks on each row as she says "question it"
    rows.forEach((_, i) => { const q = ease(t, w[26] + i * 0.07, 0.3); if (q > 0) withA(q, () => _txt('?', cx + cw - 50, cy + 92 + i * 60 + 44, F.disp(42), C.blueT, 'center')); });
    // the magnifier sweeps the record on "probe it"
    const mp = prog(t, w[20] - 0.1, 1.0); if (mp > 0 && t < hd[0] + 0.4) { const e = E.inOutCubic(mp); withA(clamp(mp * 4) * (1 - prog(t, hd[0], 0.4)), () => magnifier(lerp(cx + 120, cx + cw - 160, e), cy + 160 + Math.sin(e * Math.PI) * V(160, 120), V(80, 70), C.paper, 8)); }
    KR(t, { lines: ['*Probe* it.'], x: V(900, L), y: V(380, 1080), size: V(110, 110), t0: w[20] - 0.08, stagger: 0.05 });
    KR(t, { lines: ['Question it.'], x: V(900, L), y: V(520, 1200), size: V(110, 110), t0: w[26] - 0.08, stagger: 0.05 });
    polaroidIn(t, hd[2] - 0.1, IMG.her_head, V(1520, W - L - 170), V(800, 770), V(360, 320), -0.05, "What's been running in my head", { key: 'polaroid head' });
  }, { id: 'probe', acc: 'blue' });
  sCard(S(k.probe) + 0.06); sPop(k.probe.w[5], -6); sWh(k.probe.w[20], -6); sPop(k.probe.w[20], -2); [0, 0.07, 0.14, 0.21, 0.28].forEach(d => sTick(k.probe.w[26] + d, -4)); sCard(k.head.w[2] - 0.1); sfx('page', k.head.w[2], -4);

  /* ---------- 56 · super cool, I really love it; the drawbacks, recapped (paper, green) ---------- */
  addS(S(k.like), 'paper', 'love-it', (t) => {
    const a = k.again.w;
    KR(t, { lines: V(['I really like the idea.'], ['I really like', 'the idea.']), x: L - 4, y: V(240, 470), size: V(84, 80), t0: S(k.like) + 0.1, stagger: 0.04 });
    KR(t, { lines: ['Super, super *cool.*'], x: L - 6, y: V(400, 640), size: V(90, 100), times: [k.cool.w[1], k.cool.w[2], k.cool.w[3]] });
    KT(t, { lines: ['I really love it.'], font: 'body', x: L, y: V(510, 740), size: V(60, 56), t0: k.lov.w[2] - 0.1, stagger: 0.03 });
    withA(ease(t, a[6] - 0.1, 0.35), () => mono('But again, the drawbacks:', V(1100, L), V(300, 850), 28, g.mid, 'left', { ls: 0.22 }));
    const items = ['Consent', 'Data minimisation', 'Access levels', 'Culture', 'Reciprocity'];
    IDX(t, items.map((s, i) => ({ n: '0' + (i + 1), s, tin: a[3] + i * 0.32 })), { x: V(1100, L), y: V(400, 940), w: V(710, W - 2 * L), rowH: V(104, 96), size: V(50, 50), numW: V(84, 84) });
    withA(ease(t, a[14] - 0.1, 0.35), () => mono("Just what's been running in my head", V(1100, L), V(960, 1436), 26, g.mid, 'left', { ls: 0.2 }));
  }, { id: 'love-it', acc: 'green' });
  sPop(k.like.w[2], -6); sPop(k.cool.w[1], -4); sPop(k.cool.w[2], -4); sImp(k.cool.w[3] + 0.05, -10); sPop(k.lov.w[2], -5); [0, 1, 2, 3, 4].forEach(i => sTick(k.again.w[3] + i * 0.32, -3));
}
