/* Blink film, part 1 (0:00 - 1:39): the launch, how it works, "finally", the TechCabal source, Estonia, "more of this",
 * one record. Positions: V(landscape 1920x1080, portrait 1080x1920); portrait content in y 370..1440. */
'use strict';

// TechCabal newsletter column (assets/src_tc_column.jpg = doc x 610..1230, y 6640.. at 2x). Line boxes in image px.
const TC = {
  head: [0, 120, 1240, 330],
  launch: [[314.6, 1500, 785.4, 40], [48.6, 1551.2, 938.2, 36]],
  lead: [[48.6, 2381, 360.4, 38]],
  sensitive: [[417.8, 2383, 606.4, 36], [48.6, 2434.2, 302.2, 36]],
  misuse: [[538.8, 2485.4, 454, 36], [48.6, 2536.6, 538.2, 36]],
  credit: 'Screenshot · TechCabal Daily · 8 Sep 2026',
};
const CAST = [['cert', 'red', 150], ['folder', 'sand', 160], ['envelope', 'cobalt', 160], ['stamp', 'black', 150], ['gazette', 'gold', 150], ['register', 'green', 150], ['idcard', 'coral', 160]];

function buildB1() {
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

  /* ---------- 1 · hook: Ghana just launched Marrify; all kinds of records gather (A1) ---------- */
  addB(0, (t) => {
    const PK = V([[-430, 870, 1.0], [-250, 840, 0.8], [-80, 880, 1.05], [70, 820, 0.65], [215, 870, 0.95], [380, 850, 0.8], [520, 880, 0.65]],
                 [[-300, 1130, 1.0], [-110, 1100, 0.8], [90, 1140, 1.05], [300, 1090, 0.7], [-190, 1380, 0.95], [40, 1360, 0.8], [250, 1390, 0.75]]);
    CAST.forEach(([sh, col, sz], i) => {
      const fx = CX + PK[i][0] * V(1.3, 1.12), fy = PK[i][1] + V(40, -60), kk = PK[i][2]; const t0 = -0.3 + [3, 0, 5, 1, 4, 2, 6][i] * 0.07;
      const sp = spring(t - t0, 2.0, 0.5); const fromX = fx + (i < 3.5 ? -1 : 1) * V(520, 300) * (1 - Math.abs(i - 3) / 7);
      const look = t < 2.2 ? clamp((CX - fx) / 300, -1, 1) : 0;
      critter(sh, BL[col], lerp(fromX, fx, sp), lerp(fy + V(300, 360), fy, sp), sz * V(1.45, 1.4), { s: popS(t, t0) * kk, rot: (1 - sp) * (i % 2 ? 10 : -10) + (i % 3 - 1) * 4 * sp, open: blinkOpen(t, i * 3.1 + 1), lx: look, ly: t < 2.2 ? -0.2 : 0.3, key: 'cast ' + i });
    });
    bh(t, { fx: 'pop', lines: V(['Ghana just launched *Marrify.*'], ['Ghana just launched', '*Marrify.*']), x: CX, y: V(200, 470), size: V(96, 96), align: 'center', times: [k.ghana.w[0], k.ghana.w[1], k.ghana.w[2], k.ghana.w[5]], acc: BL.green, noWrap: true, id: 'hook' });
    bh(t, { lines: V(['A public search for marriage and divorce records.'], ['A public search for marriage', 'and divorce records.']), x: CX, y: V(300, 660), size: V(42, 44), weight: 500, col: BL.grey, align: 'center', noWrap: true, t0: 0.75, stagger: 0.02, id: 'hook sub' });
  }, { id: 'gather', push: 0.012 });
  [3, 0, 5, 1, 4, 2, 6].forEach((o, i) => sPop(0.3 + o * 0.09 + 0.06, -4 - (i % 3)));

  /* ---------- 2 · a public platform: search and verify marriages, divorces, licensed officials ---------- */
  addB(k.plat.w[2] - 0.1, (t) => {
    const w = k.plat.w; const t0 = w[2] - 0.1;
    bh(t, { lines: ['A public platform where you can'], x: CX, y: V(210, 500), size: V(60, 54), align: 'center', t0: t0 + 0.05, stagger: 0.02, col: BL.grey, out: w[8] - 0.1, id: 'public platform' });
    bh(t, { lines: ['Search and *verify:*'], x: CX, y: V(210, 500), size: V(88, 84), align: 'center', t0: w[8] - 0.05, stagger: 0.12, acc: BL.cobalt, fx: 'pop', id: 'search verify' });
    const px = V(CX - 560, 150), py = V(320, 640), pw = V(1200, 840), ph = V(124, 110);
    const pb = popS(t, t0 + 0.05, 2.6, 0.5); if (pb > 0) withT(px + pw / 2, py + ph / 2, pb, 0, () => grp('search pill', -pw / 2, -ph / 2, pw, ph, () => {
      ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.07)'; ctx.shadowBlur = 30; ctx.shadowOffsetY = 10; fillRR(-pw / 2, -ph / 2, pw, ph, ph / 2, BL.card); ctx.restore(); strokeRR(-pw / 2, -ph / 2, pw, ph, ph / 2, MC('rgba(20,20,20,0.12)'), 2);
      const mx = -pw / 2 + 50; ctx.save(); ctx.strokeStyle = BL.ink; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(mx, -4, 13, 0, Math.PI * 2); ctx.stroke(); ctx.beginPath(); ctx.moveTo(mx + 9, 5); ctx.lineTo(mx + 19, 15); ctx.stroke(); ctx.restore();
      const q = 'Search records'; const n = clamp(Math.floor((t - (t0 + 0.4)) * 30), 0, q.length);
      _txt(q.slice(0, n), mx + 44, 16, BF.h(V(46, 40), 500), BL.ink, 'left'); if (n < q.length && n > 0) rect(mx + 48 + tw(q.slice(0, n), BF.h(V(46, 40), 500)), -24, 3, 48, BL.ink);
    }));
    withA(ease(t, t0 + 0.5, 0.3), () => bmono('Illustration', px + pw, py + ph + V(40, 40), 20, { align: 'right' }));
    glyphFace(V(px - 110, CX), V(py + ph / 2, py + 260), V(54, 52), { s: popS(t, t0 + 0.12), state: faceState(t, 3, { wake: t0 + 0.3 }), state2: faceState(t - 1 / 30, 3, { wake: t0 + 0.3 }), lx: 1, ly: V(0, 0.6), key: 'searcher' });
    const items = [['cert', 'green', 'Marriages', w[11]], ['folder', 'sand', 'Divorces', w[12]], ['stamp', 'black', 'Licensed marriage officials', w[14]]];
    const shown = items.filter(it => t >= it[3] - 0.05).length;
    items.forEach(([sh, col, lab, tin], i) => {
      let x = V(CX - 480 + i * 480, 240 + i * 300);
      if (!PORTRAIT) { const slot = (n) => CX + (i - (n - 1) / 2) * 580;
        x = slot(1); for (let n = 2; n <= 3; n++) x = lerp(x, slot(n), t < items[n - 1][3] - 0.05 ? 0 : spring(t - (items[n - 1][3] - 0.05), 1.8, 0.7)); }
      const y = V(900, 1220); const sp = springIn(t, tin - 0.05, x, y, { dy: 80 });
      critter(sh, BL[col], sp.x, sp.y, V(190, 170), { s: sp.s, open: t < tin + 0.3 ? 0 : blinkOpen(t, i * 5 + 2), lx: 0, ly: -0.7, label: lab, labKey: 'item ' + i, labA: ease(t, tin + 0.1, 0.3), key: 'item critter ' + i });
    });
  }, { id: 'platform' });
  sPop(k.plat.w[2], -3); sType(k.plat.w[2] + 0.3, 14, 30, -4); sPop(k.plat.w[8], -6); sPop(k.plat.w[11], -2); sBlink(k.plat.w[11] + 0.3, -6); sPop(k.plat.w[12], -2); sBlink(k.plat.w[12] + 0.3, -6); sPop(k.plat.w[14], -2); sBlink(k.plat.w[14] + 0.3, -6);

  /* ---------- 3 · launched last month (real headlines, credited) ---------- */
  addB(S(k.month), (t) => {
    const w = k.month.w;
    bh(t, { fx: 'rise', lines: V(['Launched last month, with the *Ministry of Gender.*'], ['Launched last month,', 'with the *Ministry of Gender.*']), x: CX, y: V(175, 480), size: V(70, 70), align: 'center', t0: w[1] - 0.05, stagger: 0.03, acc: BL.cobalt, id: 'launched last month' });
    const cards = [['news_graphic', [0, 130, 1546, 410], 'Screenshot · Graphic Online · 3 Sep 2026', w[1]], ['news_technext', [0, 110, 1760, 490], 'Screenshot · Technext · 4 Sep 2026', w[3] + 0.05], ['news_itweb', [0, 120, 2022, 370], 'Screenshot · ITWeb Africa · 7 Sep 2026', w[6]]];
    const cw = V(1560, 940), cx = CX - cw / 2, cy = V(380, 700);
    cards.forEach(([img, crop, cred, tin], i) => {
      if (t < tin) return; const nxt = cards[i + 1] ? cards[i + 1][3] : 1e9; const back = ease(t, nxt, 0.12, E.outCubic);
      const sp = springIn(t, tin, cx, cy, { dy: V(260, 360), f: 2.2, z: 0.6 });
      withA(clamp(sp.p * 3) * (1 - back), () => withT(CX, cy + V(220, 260), (1 - 0.08 * back) * (0.9 + 0.1 * Math.min(1, sp.s)), ((i % 2 ? 2 : -2) * (1 - sp.p) + (i - 1) * 1.2) * Math.PI / 180, () => {
        ctx.translate(-CX, -(cy + V(220, 260)));
        sourceCard(IMG[img], cx, sp.y - V(60, 80) * back, cw, { crop, credit: back < 0.2 ? cred : null, key: 'news ' + i, creditX: cx });
      }));
    });
    critter('cert', BL.green, V(CX + 790, CX + 380), V(1000, 1250), V(150, 140), { s: popS(t, w[6] + 0.3), open: blinkOpen(t, 41), lx: -0.9, ly: -0.3, key: 'reader critter' });
  }, { id: 'launch' });
  sPop(k.month.w[1], -3); sWh(k.month.w[1] + 0.1, -10); sPop(k.month.w[3] + 0.05, -3); sPop(k.month.w[6], -3); sBlink(k.month.w[6] + 0.5, -6);

  /* ---------- 4 · reading it on TechCabal (the real newsletter; "launched Marrify" highlighted) ---------- */
  addB(S(k.read), (t) => {
    const w = k.read.w; const t0 = S(k.read);
    bh(t, { fx: 'cut', lines: V(['I was reading about it on *TechCabal.*'], ['I was reading about it', 'on *TechCabal.*']), x: CX, y: V(175, 470), size: V(72, 70), align: 'center', t0: w[4] - 0.05, stagger: 0.03, acc: BL.red, id: 'reading techcabal' });
    const cw = V(1500, 960), cx = CX - cw / 2 + V(70, 0);
    const p1 = springIn(t, t0 + 0.05, cx, V(320, 580), { dy: 120 }); if (p1.p > 0) withA(clamp(p1.p * 3) * (1 - ease(t, w[10] - 0.1, 0.25)), () => sourceCard(IMG.tc_column, cx, p1.y, cw, { crop: [0, 140, 1180, 304], key: 'tc head' }));
    const p2 = springIn(t, w[10] - 0.1, cx, V(320, 800), { dy: 140 });
    if (p2.p > 0) withA(clamp(p2.p * 3), () => sourceCard(IMG.tc_column, cx, p2.y, cw, { crop: [0, 1466, 1180, 1770], credit: TC.credit, key: 'tc launch', over: (M) => highlight(t, w[11] + 0.1, 0.8, TC.launch, M, BL.hiRed) }));
    // a reader, eyes sweeping along the lines
    const rx = V(cx - 75, CX), ry = V(620, 1330); const sweep = ((t * 0.8) % 1); const st = t < t0 + 0.4 ? '-' : faceState(t, 9);
    glyphFace(rx, ry, V(62, 76), { s: popS(t, t0 + 0.2), state: st, state2: faceState(t - 1 / 30, 9, { wake: t0 + 0.4 }), lx: V(lerp(0.2, 1, sweep), lerp(-0.6, 0.6, sweep)), ly: V(0.4, -1), key: 'reader' });
  }, { id: 'read' });
  sPop(S(k.read) + 0.1, -3); sPop(k.read.w[10], -3); sPen(k.read.w[11] + 0.1, -2);

  /* ---------- 5 · where the data comes from: three sources -> one record ---------- */
  addB(k.works.w[9] - 0.12, (t) => {
    const w = k.works.w; const t0 = w[9] - 0.12;
    bh(t, { fx: 'pop', lines: V(['It pulls data from *government sources.*'], ['It pulls data from', '*government sources.*']), x: CX, y: V(175, 480), size: V(74, 72), align: 'center', times: [w[9] - 0.06, w[9] - 0.02, w[9] + 0.02, w[9] + 0.06, w[13] - 0.05, w[13] - 0.01], acc: BL.green, id: 'pulls data' });
    const rx = CX, ry = V(1000, 1400), rsz = V(210, 220); const tAll = k.all.t;
    const src = [['register', 'green', "Registrar-General's Department", k.rgd.w[1]], ['court', 'cobalt', 'The courts', k.courts.w[1]], ['folder', 'sand', 'Local assemblies', k.local.w[0]]];
    src.forEach(([sh, col, lab, tin], i) => {
      const x = V(CX - 640 + i * 640, 210 + i * 330), y = V(590, 880); const sp = springIn(t, tin - 0.08, x, y, { dy: -120 });
      dotted(x, y + V(64, 70), rx, ry - rsz * 0.95, ease(t, tAll + i * 0.08, 0.6, E.inOutCubic), BL.soft, 5, 14);
      critter(sh, BL[col], sp.x, sp.y, V(160, 150), { s: sp.s, open: t < tin + 0.2 ? 0 : blinkOpen(t, i * 7 + 5), lx: t > tAll ? lookAt(x, y, rx, ry)[0] : 0, ly: t > tAll ? 0.8 : -0.3, label: lab, labKey: 'source ' + i, labA: ease(t, tin, 0.3), labSize: V(22, 22), key: 'source critter ' + i });
    });
    // the one record: asleep from the start, wakes when the sources connect
    const wake = tAll + 0.55;
    critter('cert', BL.cobalt, rx, ry, rsz, { s: popS(t, t0 + 0.1) * (1 + 0.12 * Math.sin(Math.PI * prog(t, wake, 0.3))), open: t < wake ? 0 : blinkOpen(t, 61), lx: 0, ly: -0.6, key: 'one record' });
    withA(ease(t, wake, 0.3), () => bmono('One record', rx + rsz * 0.62, ry - rsz * 0.4, V(24, 24), { col: BL.cobalt }));
  }, { id: 'sources' });
  sPop(k.works.w[9], -6); sPop(k.rgd.w[1], -2); sPop(k.courts.w[1], -2); sPop(k.local.w[0], -2); sWh(k.all.t + 0.1, -6); sBlink(k.all.t + 0.55, -1);

  /* ---------- 6 · all kinds of marriages and divorces, all the way back ---------- */
  addB(k.kinds.w[2] - 0.12, (t) => {
    const w = k.kinds.w, b = k.back.w;
    bh(t, { fx: 'rise', lines: ['All kinds of *marriages.*'], x: CX, y: V(190, 480), size: V(80, 76), align: 'center', t0: w[2] - 0.06, stagger: 0.03, acc: BL.green, id: 'all marriages' });
    bh(t, { fx: 'pop', lines: ['All kinds of *divorces.*'], x: CX, y: V(290, 570), size: V(80, 76), align: 'center', t0: w[7] - 0.06, stagger: 0.09, acc: BL.sand, id: 'all divorces' });
    const ly = V(930, 1250), step = V(260, 190), sz = V(190, 150); const sh = V(2200, 1300) * E.outQuart(prog(t, b[1], 1.3));
    const right = CX + V(560, 300);
    for (let i = 0; i < 26; i++) {
      const x = right - i * step + sh; if (x < -sz || x > W + sz) continue;
      const tin = i < 4 ? w[5] + i * 0.08 : i < 7 ? w[10] + (i - 4) * 0.08 : -9; if (t < tin) continue;
      const shape = i % 2 ? 'folder' : (i % 4 === 0 ? 'cert' : 'gazette'); const col = i % 2 ? BL.sand : [BL.green, BL.red, BL.cobalt, BL.gold][Math.floor(i / 2) % 4];
      const age = clamp((i - 6) / 18); critter(shape, col, x, ly + (i % 3) * 8, sz * (1 - 0.25 * age), { s: popS(t, tin), a: 1 - 0.45 * age, open: blinkOpen(t, i * 2.3 + 3), lx: 0.6, ly: -0.2 });
    }
    withA(ease(t, b[4], 0.4), () => { bmono('All the way back', V(170, 80), ly + V(90, 96), V(26, 26), { col: BL.ink }); });
    withA(ease(t, w[5], 0.4) * (1 - ease(t, b[2], 0.4)), () => bmono('Now', right, ly + V(90, 96), V(24, 24), { col: BL.green, align: 'center' }));
  }, { id: 'kinds' });
  [0, 1, 2, 3].forEach(i => sPop(k.kinds.w[5] + i * 0.08 + 0.05, -5 - i)); [0, 1, 2].forEach(i => sPop(k.kinds.w[10] + i * 0.08 + 0.05, -5 - i)); sWh(k.back.w[1] + 0.15, -2);

  /* ---------- 7 · is it actually licensed? the stamp hops from row to row ---------- */
  addB(k.check.w[4] - 0.15, (t) => {
    const w = k.check.w;
    bh(t, { lines: ['Is it actually *licensed?*'], x: CX, y: V(200, 480), size: V(84, 80), align: 'center', t0: w[4] - 0.05, stagger: 0.0, acc: BL.green, fx: 'cut', id: 'licensed q' });
    const rows = [['A church', w[7]], ['A pastor', w[10]], ['A marriage venue', w[13]]];
    const bx = V(CX - 200, 280), by0 = V(340, 640), step = V(190, 190);
    rows.forEach(([s, tin], i) => bub(t, tin - 0.05, bx, by0 + i * step, s, { size: V(52, 46), tick: w[17] + i * 0.18 + 0.1, key: 'licensed ' + i }));
    // the stamp: lands beside the first row, hops down to each row as she says "licensed"
    const hop = (i) => w[17] + i * 0.18; let row = 0; for (let i = 0; i < 3; i++) if (t >= hop(i) - 0.12) row = i;
    const hp = prog(t, hop(row) - 0.12, 0.18); const sy = by0 + row * step + V(95, 100) - Math.sin(Math.PI * hp) * 40 * (row > 0 ? 1 : 0);
    critter('stamp', BL.black, V(bx - 170, bx - 140), sy + V(20, 10), V(170, 140), { s: popS(t, w[7] - 0.2), open: t >= w[17] && t < w[17] + 0.7 ? 'happy' : blinkOpen(t, 17), lx: 1, ly: 0, key: 'stamp critter' });
    withA(ease(t, w[19], 0.4), () => bmono('Licensed to conduct a marriage', CX, V(960, 1300), V(30, 28), { col: BL.green, align: 'center' }));
    withA(ease(t, w[7], 0.3), () => bmono('Illustration', V(W - 110, W - 80), V(1000, 1436), 20, { align: 'right' }));
  }, { id: 'licensed' });
  sPop(k.check.w[4], -5); sPop(k.check.w[7], -3); sPop(k.check.w[10], -3); sPop(k.check.w[13], -3); [0, 1, 2].forEach(i => { sTick(k.check.w[17] + i * 0.18 + 0.12, 0); }); sImp(k.check.w[19], -12);

  /* ---------- 8 · as an African, I'm thinking: wow (her photo, the records gather round) ---------- */
  addB(S(k.love), (t) => {
    const a = k.afr.w; const t0 = S(k.love);
    const cx = CX, cy = V(560, 900), d = V(320, 380);
    herCircle(IMG.her_smile, cx, cy, d, { s: popS(t, t0 + 0.05, 2.2, 0.5), crop: [0.44, 0.56, 0.6], tint: BL.mint, key: 'her african' });
    const n = CAST.length;
    CAST.forEach(([sh, col], i) => {
      const ang = -Math.PI * 0.95 + i * (Math.PI * 0.9 / (n - 1)) + Math.PI * 0.475; const R = V(400, 340);
      const x = cx + Math.cos(ang - Math.PI / 2) * R * V(1.45, 1.25), y = cy + Math.sin(ang - Math.PI / 2) * R * 0.0 + V(270, 330) - Math.abs(Math.cos(ang - Math.PI / 2)) * V(80, 60);
      const tin = a[3] - 0.1 + [3, 1, 5, 0, 6, 2, 4][i] * 0.05;
      const lk = lookAt(x, y, cx, cy);
      critter(sh, BL[col], x, y, V(120, 110), { s: popS(t, tin), open: t >= a[6] ? 'happy' : blinkOpen(t, i * 4.4), lx: lk[0], ly: lk[1], key: 'ring ' + i });
    });
    bh(t, { fx: 'rise', lines: V(["As an African, I'm thinking: *wow.*"], ['As an African,', "I'm thinking: *wow.*"]), x: CX, y: V(175, 480), size: V(76, 72), align: 'center', times: [a[1] - 0.05, a[1], a[1] + 0.05, a[4], a[5], a[6]], acc: BL.green, id: 'african wow' });
  }, { id: 'african' });
  sPop(S(k.love) + 0.1, -2); [0, 1, 2].forEach(i => sPop(k.afr.w[3] + i * 0.1, -4 - i)); sBlink(k.afr.w[6], 0);

  /* ---------- 9 · centralised data. Finally, finally! (everyone jumps) ---------- */
  addB(k.cent.w[2] - 0.15, (t) => {
    const w = k.cent.w;
    bh(t, { fx: 'cut', lines: ['Centralised data.'], noWrap: true, x: CX, y: V(300, 600), size: V(120, 110), align: 'center', t0: w[2] - 0.05, stagger: 0.06, id: 'centralised' });
    bh(t, { lines: ['*Finally, finally!*'], noWrap: true, x: CX, y: V(440, 760), size: V(120, 110), align: 'center', times: [w[4], w[5]], acc: BL.green, fx: 'pop', id: 'finally' });
    CAST.forEach(([sh, col, sz], i) => {
      const PKf = V([[-430, 900], [-250, 870], [-80, 910], [70, 850], [215, 900], [380, 880], [520, 910]], [[-300, 1180], [-110, 1150], [90, 1190], [300, 1140], [-190, 1400], [40, 1380], [250, 1410]]);
      const x = CX + PKf[i][0] * V(1.3, 1.12), y = PKf[i][1] + V(30, 0);
      const jump = (tt) => Math.max(0, Math.sin(Math.PI * prog(t, tt, 0.42))) * V(110, 120);
      const jx = 0;
      critter(sh, BL[col], x + jx, y - jump(w[4] + i * 0.03) - jump(w[5] + i * 0.03), sz * V(1.3, 1.25) * [1, 0.8, 1.05, 0.65, 0.95, 0.8, 0.65][i], { s: popS(t, w[2] - 0.1 + i * 0.04), open: t >= w[4] ? 'happy' : blinkOpen(t, i), ly: -0.6, key: 'jump ' + i });
    });
  }, { id: 'finally', push: 0.02 });
  sImp(k.cent.w[3] + 0.05, -8); sPop(k.cent.w[4] + 0.1, 0); sPop(k.cent.w[5] + 0.1, 0); sBlink(k.cent.w[4], -2);

  /* ---------- 10 · "before I talk about drawbacks": TechCabal's drawback line, highlighted ---------- */
  addB(S(k.now), (t) => {
    const w = k.now.w, a = k.art.w; const t0 = S(k.now);
    bh(t, { fx: 'pop', lines: ['Before I talk about *drawbacks…*'], x: CX, y: V(175, 480), size: V(76, 70), align: 'center', t0: w[1] - 0.05, stagger: 0.09, acc: BL.red, id: 'before drawbacks' });
    const cw = V(1640, 960), cx = CX - cw / 2;
    const p = springIn(t, t0 + 0.05, cx, V(330, 620), { dy: 120 });
    if (p.p > 0) withA(clamp(p.p * 3), () => sourceCard(IMG.tc_column, cx, p.y, cw, { crop: [0, 2350, 1180, 2600], credit: TC.credit, key: 'tc drawback', over: (M) => highlight(t, w[5], 0.5, TC.lead, M, BL.hiRed) }));
    critter('folder', BL.sand, V(cx + cw - 90, CX + 330), V(980, 1330), V(150, 170), { s: popS(t, S(k.now) + 0.4), open: 'down', key: 'worried folder' });
    withA(ease(t, a[11], 0.35), () => bmono('Drawbacks it cited', V(cx, cx), V(860, 1330), V(22, 24), { col: BL.red }));
  }, { id: 'drawbacks' });
  sPop(S(k.now) + 0.1, -3); sPen(k.now.w[5], -1); sPop(k.art.w[11] - 0.15, -4);

  buildB1b();
}

function buildB1b() {
  const k = PS({
    est: "i've been living in estonia for about a year now",
    hub: 'and people always say like this place is the digital hub of europe or something like that',
    lie: "and i'm not going to lie it's so real",
    every: 'everything here everything you want to do here is online',
    exag: "i'm not exaggerating everything",
    health: 'your health records everything links so well',
    nothing: "there is nothing you want to do that you can't do online here",
    married: 'you can get married online', divorce: 'you can divorce online',
    link: "there's a link for everything you want to do in estonia",
    eco: 'the data ecosystem that the governments use that they run here the way it syncs i genuinely admire it',
    ng: 'and as someone coming from nigeria it blew my mind when i got it where everything just syncs',
    dir: 'and i see ghana doing something in this direction',
    inst: 'my first instinct is like yes please more of this because it solves so many problems',
    one: "there's one reliable record instead of like just pieces of paper everywhere instead of nin and this and that",
    main: 'and i think the main thing that even made me record this video is',
  });

  /* ---------- 11 · Estonia: about a year (her polaroid) ---------- */
  addB(S(k.est), (t) => {
    const w = k.est.w, h = k.hub.w; const t0 = S(k.est);
    bh(t, { fx: 'rise', lines: ["I've been living in *Estonia*", 'for about a year.'], x: CX, y: V(175, 480), size: V(72, 70), align: 'center', t0: w[2] - 0.05, stagger: 0.03, acc: BL.cobalt, id: 'living estonia' });
    const px = V(CX - 430, CX - 170), py = V(650, 1070); const pp = springIn(t, t0 + 0.1, px, py, { dy: 200, f: 1.8 });
    bPolaroid(IMG.her_estonia, pp.x, pp.y, V(360, 380), (-0.05 + 0.1 * (1 - pp.p)), 'Me, in Estonia', { s: Math.min(1.1, pp.s), key: 'polaroid estonia' });
    const fs = popS(t, w[4]); if (fs > 0) withT(V(px + 150, CX + 40), V(py - 270, py - 300), fs, -0.12, () => flagB('estonia', -V(70, 80), -40, V(140, 160)));
    // people always say: "this place is the digital hub of Europe"
    const fx = V(CX + 150, 160), fy = V(620, 1330);
    glyphFace(fx, fy, V(66, 62), { s: popS(t, h[1] - 0.1), state: faceState(t, 23, { wake: h[1] + 0.05 }), state2: faceState(t - 1 / 30, 23, { wake: h[1] + 0.05 }), lx: 1, ly: -0.2, key: 'people say' });
    bub(t, h[5] - 0.1, V(fx + 100, fx + 90), V(fy - 120, fy - 140), 'This place is the\n*digital hub of Europe*', { size: V(40, 38), acc: BL.cobalt, key: 'hub bubble' });
    withA(ease(t, h[14] - 0.1, 0.35), () => bmono('…or something like that', V(fx + 110, fx + 100), V(fy + 60, fy + 50), V(22, 24), { col: BL.grey }));
  }, { id: 'estonia', lid: true });
  sPop(S(k.est) + 0.15, -2); sPop(k.est.w[4], -4); sPop(k.hub.w[1], -4); sPop(k.hub.w[5], -3);

  /* ---------- 12 · everything here is online (A4: her, the records ticking things off) ---------- */
  addB(S(k.lie), (t) => {
    const t0 = S(k.lie); const tE = k.every.w[0] - 0.08, tN = k.link.w[0] - 0.08;
    bh(t, { fx: 'pop', lines: ["I'm not going to lie, *it's so real.*"], x: CX, y: V(175, 470), size: V(70, 64), align: 'center', t0: k.lie.w[1] - 0.06, stagger: 0.09, acc: BL.green, out: tE, id: 'so real' });
    const tNo = k.nothing.t - 0.08;
    bh(t, { fx: 'rise', lines: V(['Everything here is *online.*'], ['Everything here', 'is *online.*']), x: CX, y: V(175, 470), size: V(70, 68), align: 'center', t0: tE, stagger: 0.04, acc: BL.green, out: tNo, id: 'everything online' });
    bh(t, { fx: 'cut', lines: V(["There's *nothing* you can't do online here."], ["There's *nothing* you can't", 'do online here.']), x: CX, y: V(175, 470), size: V(70, 66), align: 'center', t0: tNo, stagger: 0.03, acc: BL.green, out: tN, id: 'nothing offline' });
    bh(t, { fx: 'pop', lines: V(["There's *a link for everything.*"], ["There's a link", '*for everything.*']), x: CX, y: V(175, 470), size: V(70, 68), align: 'center', t0: tN, stagger: 0.09, acc: BL.green, id: 'a link' });
    withA(ease(t, k.exag.w[2] - 0.1, 0.3) * (1 - ease(t, k.health.w[0], 0.3)), () => bmono("I'm not exaggerating", CX, V(230, 620), V(22, 24), { align: 'center', col: BL.grey }));
    const mvL = PORTRAIT ? 1 : spring(t - (k.health.w[1] - 0.4), 1.6, 0.75); const hx = V(lerp(CX, 420, mvL), CX), hy = V(620, 860), hd = V(340, 250);
    herCircle(IMG.her_smile, hx, hy + V(0, 120) * (1 - spring(t - (k.health.w[1] - 0.4), 1.6, 0.75)), hd, { s: popS(t, t0 + 0.08, 2.2, 0.5) * (PORTRAIT ? lerp(1.45, 1, spring(t - (k.health.w[1] - 0.4), 1.6, 0.75)) : 1), crop: [0.44, 0.56, 0.6], tint: BL.mint, key: 'her online' });
    withA(ease(t, t0 + 0.4, 0.3), () => bmono('Gbemi, in Estonia', hx, hy + hd / 2 + V(50, 46), V(22, 22), { align: 'center', col: BL.grey }));
    const rows = [['register', 'cobalt', 'Your health records, online', k.health.w[1]], ['cert', 'red', 'You can get married online', k.married.w[3]], ['folder', 'sand', 'You can divorce online', k.divorce.w[2]], ['envelope', 'green', 'A link for everything', k.link.w[2]]];
    const rx = V(800, 100), ry0 = V(320, 1060), step = V(175, 100);
    const lk = ease(t, k.health.w[4], 0.8, E.inOutCubic); if (lk > 0) dotted(rx + 50, ry0 + 50, rx + 50, ry0 + 50 + step * 3, lk, BL.line, 6, 16);
    rows.forEach(([sh, col, s, tin], i) => {
      critter(sh, BL[col], rx + 50, ry0 + i * step + V(92, 84), V(100, 92), { s: popS(t, tin - 0.1), open: blinkOpen(t, i + 30), lx: -0.6, key: 'online critter ' + i });
      bub(t, tin, rx + V(140, 118), ry0 + i * step, s, { size: V(40, 36), tick: tin + 0.35, key: 'online ' + i });
    });
  }, { id: 'online' });
  sPop(S(k.lie) + 0.1, -3); sPop(k.every.w[0], -5); sPop(k.nothing.t, -6); sWh(k.health.w[4], -10);
  [k.health.w[1], k.married.w[3], k.divorce.w[2], k.link.w[2]].forEach(tt => { sPop(tt, -3); sTick(tt + 0.4, -1); });

  /* ---------- 13 · the data ecosystem: the way it syncs (everyone blinks at once) ---------- */
  addB(S(k.eco), (t) => {
    const w = k.eco.w; const tS = w[14];
    bh(t, { fx: 'rise', lines: ['The data ecosystem.'], x: CX, y: V(175, 480), size: V(76, 72), align: 'center', t0: w[1] - 0.05, stagger: 0.04, out: tS - 0.1, id: 'ecosystem' });
    bh(t, { lines: ['The way it *syncs.*'], x: CX, y: V(175, 480), size: V(76, 72), align: 'center', t0: tS - 0.08, stagger: 0.0, acc: BL.green, fx: 'cut', id: 'syncs' });
    withA(ease(t, w[16] - 0.1, 0.35), () => bmono('I genuinely admire it', CX, V(260, 580), V(28, 28), { align: 'center', col: BL.grey }));
    const cx = CX, cy = V(700, 1080), rx = V(720, 340), ry = V(260, 320);
    const nodes = CAST.slice(0, 6).map(([sh, col], i) => { const a = -Math.PI / 2 + i * Math.PI / 3; return [sh, col, cx + Math.cos(a) * rx, cy + Math.sin(a) * ry]; });
    nodes.forEach(([, , x, y], i) => { const [, , x2, y2] = nodes[(i + 1) % 6]; dotted(x, y - 50, x2, y2 - 50, ease(t, w[5] + i * 0.1, 0.6, E.inOutCubic), t >= tS ? BL.green : BL.line, 6, 16); });
    nodes.forEach(([sh, col, x, y], i) => {
      // their own clocks until "syncs": then they all blink on the same frame, then smile
      const own = blinkOpen(t, i * 3.3 + 7); const syncB = t >= tS && t < tS + 0.14 ? (t < tS + 0.05 ? 1 - (t - tS) / 0.05 : (t - tS - 0.05) / 0.09) : null;
      const open = syncB != null ? syncB : t >= tS + 0.5 && t < tS + 1.6 ? 'happy' : own;
      critter(sh, BL[col], x, y, V(130, 120), { s: popS(t, S(k.eco) + i * 0.07), open, lx: lookAt(x, y, cx, cy)[0], ly: lookAt(x, y, cx, cy)[1], key: 'eco ' + i });
    });
  }, { id: 'ecosystem' });
  sPop(k.eco.w[1], -5); [0, 1, 2, 3, 4, 5].forEach(i => sPop(k.eco.w[2] + i * 0.07 + 0.05, -6 - i * 0.5)); sBlink(k.eco.w[14], 2); sImp(k.eco.w[14] + 0.05, -12);

  /* ---------- 14 · coming from Nigeria, it blew my mind (the big face cycles its eyes) ---------- */
  addB(S(k.ng), (t) => {
    const w = k.ng.w, d = k.dir.w;
    bh(t, { fx: 'pop', lines: V(['Coming from Nigeria, *it blew my mind.*'], ['Coming from Nigeria,', '*it blew my mind.*']), x: CX, y: V(175, 480), size: V(74, 72), align: 'center', times: [w[3], w[3] + 0.03, w[5], w[7], w[8], w[8] + 0.05, w[9]], acc: BL.purple, id: 'blew my mind' });
    const fx = CX, fy = V(620, 1000), r = V(210, 220);
    const seq = (tt) => tt < w[5] ? '-' : tt < w[7] ? '*' : tt < w[7] + 0.12 ? '-' : tt < w[9] ? 'O' : tt < w[9] + 0.35 ? '<' : faceState(tt, 51);
    glyphFace(fx, fy, r, { s: popS(t, S(k.ng) + 0.05, 2.0, 0.5), state: seq(t), state2: seq(t - 1 / 30), key: 'big face' });
    const nf = popS(t, w[5]); if (nf > 0) withT(V(fx - 600, fx - 300), V(fy - 120, fy - 330), nf, -0.1, () => { flagB('nigeria', -V(90, 80), -V(45, 40), V(180, 160)); });
    withA(ease(t, w[5], 0.3), () => bmono('Nigeria', V(fx - 600, fx - 300), V(fy - 20, fy - 240), V(22, 22), { align: 'center' }));
    const gf = popS(t, d[3]); if (gf > 0) withT(V(fx + 600, fx + 300), V(fy - 120, fy - 330), gf, 0.1, () => { flagB('ghana', -V(70, 65), -V(47, 44), V(140, 130)); });
    withA(ease(t, d[3], 0.3), () => bmono('Ghana, doing something in this direction', V(fx + 600, fx + 300), V(fy - 20, fy - 240), V(22, 22), { align: 'center', maxW: V(330, 300) }));
  }, { id: 'nigeria' });
  sPop(S(k.ng) + 0.1, -3); sBlink(k.ng.w[5], -2); sBlink(k.ng.w[7] + 0.12, -1); sImp(k.ng.w[9], -10); sPop(k.ng.w[5] + 0.05, -6); sPop(k.dir.w[3] + 0.05, -3);

  /* ---------- 15 · yes, please. More of this. (records multiply) ---------- */
  addB(k.inst.w[0] - 0.15, (t) => {
    const w = k.inst.w;
    bh(t, { lines: ['My first instinct:'], x: CX, y: V(230, 520), size: V(56, 54), align: 'center', t0: w[0] - 0.1, stagger: 0.03, col: BL.grey, id: 'instinct' });
    bh(t, { lines: ['Yes, please.'], x: CX, y: V(370, 660), size: V(120, 110), align: 'center', times: [w[5], w[6]], fx: 'pop', id: 'yes please' });
    bh(t, { fx: 'rise', lines: ['*More of this.*'], x: CX, y: V(500, 780), size: V(120, 110), align: 'center', times: [w[7], w[8], w[9]], acc: BL.green, id: 'more of this' });
    withA(ease(t, w[12] - 0.1, 0.35), () => bmono('Because it solves so many problems', CX, V(580, 860), V(24, 26), { align: 'center', col: BL.grey }));
    for (let i = 0; i < V(16, 14); i++) {
      const [sh, col] = CAST[i % 7]; const x = V(CX - 760 + (i % 8) * 200 + (Math.floor(i / 8) % 2) * 100, CX - 400 + (i % 5) * 200 + (Math.floor(i / 5) % 2) * 100) + (hash(i * 3) - 0.5) * 40, y = V(820 + Math.floor(i / 8) * 150, 1080 + Math.floor(i / 5) * 150) + (hash(i * 5) - 0.5) * 30;
      const tin = i < 5 ? w[0] - 0.1 + i * 0.06 : w[7] + (i * 7 % 16) * 0.05;
      critter(sh, BL[col], x, y, V(120, 110) * (0.85 + 0.3 * hash(i + 5)), { s: popS(t, tin), open: t > w[12] ? 'happy' : blinkOpen(t, i * 1.9), ly: -0.6, lx: (hash(i) - 0.5) });
    }
  }, { id: 'more-of-this', push: 0.02 });
  sPop(k.inst.w[5], -2); sPop(k.inst.w[6], -4); [0, 0.15, 0.3, 0.45].forEach(d => sPop(k.inst.w[7] + d + 0.06, -4 - d * 6)); sBlink(k.inst.w[12], -2);

  /* ---------- 16 · one reliable record, instead of pieces of paper everywhere (then dive into its eye) ---------- */
  const recX = CX, recY = V(800, 1250), recS = V(240, 260);
  addB(S(k.one), (t) => {
    const w = k.one.w, m = k.main.w; const tIn = w[4] - 0.08, tMain = m[4] - 0.1;
    const suck = ease(t, m[2], 0.7, E.inCubic);
    for (let i = 0; i < 16; i++) {
      const tin = w[8] + i * 0.05; if (t < tin) continue; const sp = spring(t - tin, 1.8, 0.6);
      const sx = V(180 + hash(i * 3.1) * 1560, 120 + hash(i * 3.1) * 840), sy = V(400 + hash(i * 7.7) * 480, 700 + hash(i * 7.7) * 560);
      const x = lerp(lerp(sx + (hash(i) - 0.5) * 600, sx, sp), recX, suck), y = lerp(lerp(sy - 500, sy, sp), recY - recS * 0.5, suck);
      withA(1 - prog(suck, 0.85, 1), () => withT(x, y, 1 - 0.7 * suck, (hash(i * 5) - 0.5) * 1.2 * (1 - suck), () => { ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.06)'; ctx.shadowBlur = 16; rect(-60, -78, 120, 156, BL.card); ctx.restore(); strokeR(-60, -78, 120, 156, MC('rgba(20,20,20,0.12)'), 2); for (let l = 0; l < 5; l++) rect(-44, -54 + l * 22, l ? 76 : 50, 6, BL.line); }));
    }
    [['NIN', w[14]], ['', w[16]], ['', w[18] - 0.08]].forEach(([lab, tin], i) => {
      if (t < tin) return; const x = lerp(V(CX - 380 + i * 380, 220 + i * 320), recX, suck), y = lerp(V(560, 1000), recY - recS * 0.5, suck);
      withA(1 - prog(suck, 0.85, 1), () => { critter('idcard', [BL.coral, BL.gold, BL.purple][i], x, y, V(150, 140) * (1 - 0.6 * suck), { s: popS(t, tin), open: blinkOpen(t, i + 70), lx: 0.3, key: 'id ' + i }); if (lab) bmono(lab, x, y + V(36, 36), V(26, 26), { align: 'center', col: BL.ink, a: 1 - suck }); });
    });
    bh(t, { lines: ['*One* reliable record,'], x: CX, y: V(175, 480), size: V(76, 72), align: 'center', t0: w[1] - 0.05, stagger: 0.1, acc: BL.cobalt, out: tIn, fx: 'pop', id: 'one record' });
    bh(t, { fx: 'cut', lines: V(['instead of *pieces of paper everywhere.*'], ['instead of *pieces of', 'paper everywhere.*']), x: CX, y: V(175, 480), size: V(76, 72), align: 'center', t0: tIn, stagger: 0.03, acc: BL.red, out: tMain, id: 'pieces of paper' });
    bh(t, { lines: V(['The main thing that made me record this video:'], ['The main thing that made', 'me record this video:']), x: CX, y: V(175, 480), size: V(60, 58), align: 'center', t0: tMain, stagger: 0.025, col: BL.grey, id: 'main thing' });
    const wake = m[2] + 0.75; const bump = 1 + 0.15 * Math.sin(Math.PI * prog(t, wake - 0.1, 0.3));
    critter('cert', BL.cobalt, recX, recY, recS, { s: popS(t, S(k.one)) * bump, open: t < w[1] + 0.4 ? 0 : t > wake - 0.1 && t < wake + 0.08 ? 0 : blinkOpen(t, 88), lx: 0, ly: t > wake ? 0 : -0.6, key: 'the one record' });
  }, { id: 'one-record', dive: () => [recX - recS * 0.12, recY - recS * 0.9 + recS * 0.52] });
  sPop(k.one.w[1], -2); [0, 0.2, 0.4, 0.6].forEach(d => sPop(k.one.w[8] + d + 0.05, -6 - d * 5)); sPop(k.one.w[14] + 0.05, -2); sPop(k.one.w[16] + 0.05, -5); sPop(k.one.w[18], -6); sWh(k.main.w[2] + 0.4, -2); sBlink(k.main.w[2] + 0.7, -2);
}
