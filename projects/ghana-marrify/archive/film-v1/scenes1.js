/* Scenes, part 1: the open (0:00 - 0:50). Marrify, what it does, where the data comes from, "finally, finally".
 * Every position is V(landscape 1920x1080, portrait 1080x1920). Portrait content sits in y 370..1440.
 * Entrances vary on purpose: the visual leads (search box, calendar, article, source cards, flags), headlines land
 * as one unit on their key word, and only the big display lines build word by word. */
'use strict';

function buildScenes1() {
  const k = PS({
    ghana: 'ghana just launched something called marrify',
    plat: "it's like a public platform where you can search and verify marriages divorces and licensed marriage officials",
    month: 'it launched last month with some ministry of gender',
    read: 'and i was just reading about it the other day on techcabal',
    works: 'and the way that it works is that it pulls data from different government sources',
    rgd: "the registrar-general's department", courts: 'the courts', local: 'local assembly', all: 'all of that',
    kinds: 'it covers all kinds of marriages and all kinds of divorces',
    back: 'it goes all the way back like records from all the way back',
    check: 'and you can also check whether a church or a pastor and a marriage venue is actually licensed to conduct a marriage',
    love: 'and i really love this when i saw this',
    afr: "because as an african i'm thinking wow",
    cent: "we're having centralised data finally finally",
    now: 'now before i talk about drawbacks',
    art: "because i read techcabal's article about this and there were some drawbacks it cited",
  });

  /* ---------- 1 · hook: "Ghana just launched something called Marrify" (ink) ---------- */
  addS(0, 'ink', 'open', (t) => {
    flagIn(t, 0.05, 'ghana', V(1540, L), V(150, 430), V(250, 330));
    KR(t, { lines: V(['Ghana just launched'], ['Ghana just', 'launched']), x: L - 4, y: V(330, 790), size: V(112, 124), times: k.ghana.w.slice(0, 3) });
    KR(t, { lines: ['_something called_'], x: L, y: V(450, 990), size: V(80, 76), times: k.ghana.w.slice(3, 5) });
    KR(t, { lines: ['Marrify.'], x: L - 10, y: V(760, 1240), size: V(290, 236), times: [k.ghana.w[5]] });
  }, { id: 'launched', grid: true, acc: 'blue', push: 0.02 });
  sWh(0.05, -6); sPop(0.45, -3); sImp(k.ghana.w[5] + 0.05, -8);

  /* ---------- 2 · a public platform: search and verify (paper). The search box leads. ---------- */
  addS(k.plat.w[2] - 0.1, 'paper', 'platform', (t) => {
    const w = k.plat.w; const t0 = w[2] - 0.1;
    const bx = L, by = V(300, 640), bw = V(1040, W - 2 * L);
    landing(t, t0 + 0.02, bx, by, { dy: 70, d: 0.5 }, (X, Y) => {
      searchBox(t, X, Y, bw, { h: V(100, 96), q: 'Name, town or certificate number', typeT0: t0 + 0.3, cps: 26, press: w[10] + 0.08, ph: '' });
      illus(X + bw, Y + V(140, 136), 'right');
    });
    KR(t, { lines: ['Search and *verify:*'], x: L - 4, y: V(220, 560), size: V(104, 96), t0: w[8] - 0.04, stagger: 0.04 });
    IDX(t, [
      { n: '01', s: 'Marriages', tin: w[11] },
      { n: '02', s: 'Divorces', tin: w[12] },
      { n: '03', s: 'Licensed marriage officials', tin: w[14] },
    ], { x: L, y: V(640, 1000), w: V(1700, W - 2 * L), rowH: V(122, 140), size: V(72, 66), numW: V(110, 90) });
  }, { id: 'platform', acc: 'blue' });
  sCard(k.plat.w[2] - 0.06); sType(k.plat.w[2] + 0.2, 32, 26); sPop(k.plat.w[8], -4); sClick(k.plat.w[10] + 0.08); sPop(k.plat.w[11], -2); sPop(k.plat.w[12], -3); sPop(k.plat.w[14], -2);

  /* ---------- 3 · launched last month, with the Ministry (ink). The calendar leads. ---------- */
  addS(S(k.month), 'ink', 'launch', (t) => {
    const w = k.month.w;
    landing(t, S(k.month) + 0.04, V(1290, L), V(170, 640), { dy: 90, r: 0.06, d: 0.55 }, (X, Y, R) => withT(X + V(200, 160), Y + V(210, 168), 1, R, () => calTile(-V(200, 160), -V(210, 168), V(400, 320), 'Aug 2026', '28', 'Accra')));
    KR(t, { lines: V(['Launched', '*last month,*'], ['Launched', '*last month,*']), x: L - 4, y: V(330, 520), size: V(150, 130), t0: w[1] - 0.06, stagger: 0.05 });
    landing(t, w[4], L, V(640, 1060), { dy: 80, d: 0.5 }, (X, Y) => grp('ministry card', X, Y, V(1000, W - 2 * L), V(250, 300), () => {
      rect(X, Y, V(1000, W - 2 * L), V(250, 300), C.card);
      mono('With', X + 36, Y + 60, 24, C.mid, 'left', { ls: 0.2, fixed: true });
      txtW('Ministry of Gender, Children and Social Protection', X + 36, Y + V(130, 140), F.body(V(54, 54), 700), C.ink, V(900, W - 2 * L - 72), V(62, 64));
    }));
  }, { id: 'launch', acc: 'blue' });
  sCard(S(k.month) + 0.06); sPop(k.month.w[3], -4); sCard(k.month.w[4]); sPop(k.month.w[6], -5);

  /* ---------- 3b · reading about it on TechCabal (paper). The article leads; it scrolls as she explains. ---------- */
  addS(S(k.read), 'paper', 'read', (t) => {
    const w = k.read.w;
    landing(t, S(k.read) + 0.04, V(1040, L), V(170, 760), { dy: 120, d: 0.55 }, (X, Y) => {
      articleCard(t, X, Y, V(770, W - 2 * L), V(740, 600), { url: 'techcabal.com', typeT0: w[4] + 0.1, key: 'article read', scroll: 120 * ease(t, k.works.w[1], 1.2, E.inOutCubic) });
      illus(X, Y + V(780, 640));
    });
    KR(t, { lines: ['Reading about it'], font: 'body', x: L, y: V(380, 520), size: V(80, 74), t0: w[4] - 0.03, stagger: 0.04, upper: false });
    KR(t, { lines: ['on ~TechCabal.~'], font: 'body', x: L, y: V(480, 610), size: V(80, 74), t0: w[11] - 0.12, stagger: 0.05, upper: false });
  }, { id: 'read', acc: 'blue' });
  sCard(S(k.read) + 0.04); sPop(k.read.w[4], -5); sType(k.read.w[4] + 0.1, 13, 28); sPen(k.read.w[11] + 0.3, -4); sWh(k.works.w[1] + 0.2, -10);

  /* ---------- 4 · where the data comes from: three sources -> one record (paper, grid) ---------- */
  addS(k.works.w[9] - 0.12, 'paper', 'sources', (t) => {
    const w = k.works.w;
    KR(t, { lines: V(['It pulls data from *government sources:*'], ['It pulls data from', '*government sources:*']), x: L - 4, y: V(220, 450), size: V(70, 64), times: [w[9] - 0.06, w[9] - 0.02, w[9] + 0.02, w[9] + 0.06, w[13] - 0.05, w[13] - 0.01] });
    { const g0 = ease(t, w[9] - 0.05, 0.5); if (g0 > 0) withA(g0 * (1 - ease(t, k.rgd.w[1] - 0.2, 0.3)), () => { const n = 9; for (let i = 0; i < n; i++) { const p = ease(t, w[9] + i * 0.12, 0.4); if (p > 0) withA(p, () => sheet(V(1000, 120) + (i % 3) * V(260, 300), V(330, 620) + Math.floor(i / 3) * V(160, 220) - 30 * (1 - E.outExpo(p)), V(200, 180), V(130, 120), (hash(i * 2.3) - 0.5) * 0.3, { lines: 4 })); } }); }
    const src = [["Registrar-General's Department", k.rgd.w[1]], ['The courts', k.courts.w[1]], ['Local assemblies', k.local.w[0]]];
    const BX = V(L, L + 60), BW = V(760, W - 2 * L - 60), BH = V(120, 110), BY = (i) => V(330 + i * 160, 580 + i * 130);
    const nRows = 5, rowH = V(64, 52);
    const cx = V(1200, L + 60), cw = V(610, W - 2 * L - 60), ch = 92 + nRows * rowH + 26;
    const cy = V(330, 1040), cMid = cy + ch / 2;
    const tFill = k.local.w[1] + 0.85;   // connectors done: the record fills
    const rows = [['Type', 0.45], ['Names', 0.8], ['Date', 0.4], ['Place', 0.62], ['Status', 0.5]].map(([kk, bw], i) => ({ k: kk, bw, mark: t >= tFill + i * 0.1 ? C.blue : null }));
    src.forEach(([s, ton], i) => {
      sourceBox(t, BX, BY(i), BW, BH, '0' + (i + 1), s, ton - 0.14, ton - 0.04, { size: V(38, 36), ly: V(92, 86), key: 'source ' + (i + 1) });
      const pc = ease(t, k.local.w[1] + 0.1 + i * 0.1, 0.6, E.inOutCubic);
      if (PORTRAIT) connector(BX, BY(i) + BH / 2, cx, cMid, pc, C.ink, 3, L + 22);
      else connector(BX + BW, BY(i) + BH / 2, cx, cMid, pc, C.ink, 3, 1035);
    });
    landing(t, k.local.w[0], cx, cy, { dx: V(160, 0), dy: V(0, 120), d: 0.55 }, (X, Y) => recordCard(t, X, Y, cw, { title: 'One record', tag: 'Illustration', rows, rowH, key: 'one record' }));
  }, { id: 'sources', grid: true, acc: 'blue' });
  sPop(k.works.w[9], -4); sPop(k.works.w[13], -4); sCard(k.rgd.w[1] - 0.14); sCard(k.courts.w[1] - 0.14, -1); sCard(k.local.w[0] - 0.14, -1); sWh(k.local.w[1] + 0.2, -5); [0, 0.1, 0.2, 0.3, 0.4].forEach(d => sTick(k.local.w[1] + 0.85 + d, -3));

  /* ---------- 5 · all kinds of marriages, all kinds of divorces, all the way back (ink) ---------- */
  addS(k.kinds.w[2] - 0.12, 'ink', 'kinds', (t) => {
    const w = k.kinds.w, b = k.back.w;
    KR(t, { lines: V(['All kinds of *marriages.*'], ['All kinds of', '*marriages.*']), x: L - 4, y: V(270, 500), size: V(118, 112), t0: w[2] - 0.06, stagger: 0.04 });
    KR(t, { lines: V(['All kinds of *divorces.*'], ['All kinds of', '*divorces.*']), x: L - 4, y: V(400, 760), size: V(118, 112), t0: w[7] - 0.06, stagger: 0.04 });
    // a line of records that runs back in time (kept inside the margins)
    const ly = V(840, 1260), step = V(170, 140), cwR = V(118, 100), chR = V(78, 66);
    const sh = V(1500, 900) * E.outQuart(prog(t, b[1], 1.2));
    const right = W - L - V(150, 90);
    const lp = ease(t, w[5] - 0.2, 0.6); hline(L, ly, W - 2 * L, lp, C.inkMid, 3);
    ctx.save(); ctx.beginPath(); ctx.rect(L, ly - chR - 80, W - 2 * L, chR + 100); ctx.clip();
    for (let i = 0; i < 22; i++) {
      const x = right - i * step + sh; if (x < L - cwR || x > W - L + cwR) continue;
      const tin = i < 3 ? w[5] + i * 0.1 : i < 5 ? w[10] + (i - 3) * 0.1 : -1e9; const p = ease(t, tin, 0.4); if (p <= 0) continue;
      withA(clamp(p * 2), () => {
        const yy = ly - chR - 18 - 26 * (1 - E.outBack(p, 1.6)); const dv = i >= 3 && i < 5;
        rect(x - cwR / 2, yy, cwR, chR, dv ? C.inkPanel : C.card); if (dv) strokeR(x - cwR / 2, yy, cwR, chR, C.paper, 2);
        rect(x - cwR / 2 + 14, yy + 18, cwR * 0.55, 7, dv ? C.inkMid : '#D3CCBF'); rect(x - cwR / 2 + 14, yy + 36, cwR * 0.7, 7, dv ? C.inkMid : '#D3CCBF');
        rect(x - 1.5, ly - 18, 3, 18, C.inkMid);
      });
    }
    ctx.restore();
    withA(ease(t, w[5], 0.4), () => { const nx = right + sh; if (nx < W - L + 40) mono('Now', nx, ly + 50, 24, C.blueT, 'center', { ls: 0.2 }); });
    withA(ease(t, b[4], 0.4), () => mono('All the way back', L, ly + 60, 26, g.fg, 'left', { ls: 0.22 }));
    withA(ease(t, b[4], 0.4), () => arrow(L + monoW('All the way back', 26) + V(170, 110), ly + 52, L + monoW('All the way back', 26) + 40, ly + 52, ease(t, b[4], 0.5), C.paper, 3, 14));
  }, { id: 'kinds', acc: 'blue' });
  sPop(k.kinds.w[5], -2); sPop(k.kinds.w[10], -3); sWh(k.back.w[1] + 0.15, -3); sTick(k.back.w[7] + 0.2, -4);

  /* ---------- 6 · check: licensed? church, pastor, venue (paper, green = yes) ---------- */
  addS(k.check.w[4] - 0.15, 'paper', 'licensed', (t) => {
    const w = k.check.w;
    KR(t, { lines: ['Check: *licensed?*'], x: L - 4, y: V(230, 520), size: V(110, 100), t0: w[4] - 0.05, stagger: 0.05 });
    const rows = [{ n: '01', s: 'A church', tin: w[7] }, { n: '02', s: 'A pastor', tin: w[10] }, { n: '03', s: 'A marriage venue', tin: w[13] }];
    const y0 = V(430, 760), rh = V(150, 160), sz = V(96, 80);
    IDX(t, rows, { x: L, y: y0, w: V(1700, W - 2 * L), rowH: rh, size: sz, numW: V(120, 90) });
    rows.forEach((r, i) => {
      const bs = V(78, 66), bx = W - L - bs, byy = y0 + i * rh - sz * 0.76;
      const ap = ease(t, r.tin + 0.1, 0.3); if (ap <= 0) return;
      withA(ap, () => { strokeR(bx, byy, bs, bs, C.ink, 4); checkboxT(bx, byy, bs, prog(t, w[17] + i * 0.14, 0.32), C.greenInk, C.card); });
    });
    stamp(t, w[17] + 0.45, V(W - L - 420, CX), V(920, 1330), 'Licensed to conduct a marriage', C.greenInk, { size: V(30, 28), key: 'licensed stamp' });
    withA(ease(t, w[7], 0.3), () => illus(L, V(1000, 1430)));
  }, { id: 'licensed', acc: 'green' });
  sPop(k.check.w[4], -4); sPop(k.check.w[7], -3); sPop(k.check.w[10], -3); sPop(k.check.w[13], -3); [0, 0.14, 0.28].forEach(d => sTick(k.check.w[17] + d + 0.1, -1)); sStamp(k.check.w[17] + 0.5, -2);

  /* ---------- 7 · "as an African, I'm thinking: wow" (ink, green on "wow" only). The flags lead. ---------- */
  addS(S(k.love), 'ink', 'african', (t) => {
    flagIn(t, S(k.love) + 0.1, 'nigeria', V(1330, L), V(330, 520), V(330, 230), { label: 'Nigeria', labCol: g.mid, labSize: 28 });
    flagIn(t, S(k.love) + 0.25, 'ghana', V(1330, L + 290), V(560, 520), V(240, 172), { label: 'Ghana', labCol: g.mid, labDy: V(44, 44), labSize: 28 });
    KR(t, { lines: V(['As an African,'], ['As an', 'African,']), x: L - 4, y: V(500, 880), size: V(150, 130), t0: k.afr.w[1] - 0.06, stagger: 0.05 });
    KR(t, { lines: ["I'm thinking:"], x: L - 4, y: V(660, 1150), size: V(100, 84), times: k.afr.w.slice(4, 6) });
    KR(t, { lines: ['~wow,~'], font: 'serif', x: V(L, L), y: V(900, 1390), size: V(200, 190), times: [k.afr.w[6]] });
    wipe(t, k.cent.w[2] - 0.15, C.green, 0.35);
  }, { id: 'african', acc: 'green' });
  sPop(S(k.love) + 0.45, -3); sPop(S(k.love) + 0.6, -5); sPen(k.afr.w[6] + 0.35, -2); sWh(k.cent.w[2] - 0.3, -3);

  /* ---------- 8 · punchline: centralised data. Finally, finally! (green full bleed) ---------- */
  addS(k.cent.w[2] - 0.15, 'green', 'finally', (t) => {
    const w = k.cent.w;
    KT(t, { lines: ["We're having"], font: 'body', x: L, y: V(250, 560), size: V(68, 64), t0: w[2] - 0.13, stagger: 0.06 });
    KR(t, { lines: V(['Centralised', 'data.'], ['Centralised', 'data.']), x: L - 8, y: V(480, 760), size: V(230, 170), times: [w[2], w[3]] });
    KR(t, { lines: V(['Finally, ~finally!~'], ['Finally,', '~finally!~']), x: L - 4, y: V(880, 1180), size: V(150, 150), times: [w[4], w[5]] });
  }, { id: 'finally', acc: 'green', push: 0.025 });
  sImp(k.cent.w[3] + 0.05, -7); sPop(k.cent.w[4], -2); sPop(k.cent.w[5], 0);

  /* ---------- 9 · "before I talk about drawbacks" (paper, orange). An excerpt card (not the browser again) leads. ---------- */
  addS(S(k.now), 'paper', 'drawbacks', (t) => {
    const w = k.now.w, a = k.art.w;
    const ex = V(1040, L), ey = V(200, 760), ew = V(770, W - 2 * L), eh = V(560, 560);
    landing(t, S(k.now) + 0.04, ex, ey, { dy: 110, r: 0.03, d: 0.55 }, (X, Y, R) => withT(X + ew / 2, Y + eh / 2, 1, R, () => grp('excerpt', -ew / 2, -eh / 2, ew, eh, () => {
      const x0 = -ew / 2, y0 = -eh / 2; rect(x0, y0, ew, eh, C.card); strokeR(x0, y0, ew, eh, C.ink, 4);
      mono('From the TechCabal article', x0 + 40, y0 + 62, 24, C.mid, 'left', { ls: 0.2, fixed: true });
      rect(x0 + 40, y0 + 92, ew - 80, 3, C.ink);
      for (let i = 0; i < 7; i++) {
        const ly = y0 + 150 + i * 56, lw = (ew - 80) * (0.94 - 0.14 * ((i * 5) % 3) / 2);
        const hi = [2, 3, 4].indexOf(i); const hp = hi >= 0 ? clamp((t - (a[11] + hi * 0.18)) / 0.45) : 0;
        if (hp > 0) rect(x0 + 34, ly - 10, (lw + 12) * E.outCubic(hp), 34, C.orange);
        rect(x0 + 40, ly, lw, 14, hp > 0.6 ? 'rgba(17,17,20,0.8)' : '#D3CCBF');
      }
    })));
    withA(ease(t, S(k.now) + 0.3, 0.3), () => illus(ex, ey + eh + 40));
    KR(t, { lines: ['*Drawbacks…*'], x: L - 6, y: V(430, 560), size: V(124, 140), times: [w[5]] });
    withA(ease(t, a[11] + 0.3, 0.4), () => mono('The drawbacks it cited', L, V(520, 650), 28, C.orange, 'left', { ls: 0.22 }));
  }, { id: 'drawbacks', acc: 'orange' });
  sCard(S(k.now) + 0.04); sPop(k.now.w[5], -3); sPen(k.art.w[11], -2); sPen(k.art.w[11] + 0.36, -5);
}
