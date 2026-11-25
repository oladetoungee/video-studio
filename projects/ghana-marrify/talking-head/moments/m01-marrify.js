/* Moment 01 (kit clip 1), Blink look: the open. "Ghana just launched something called Marrify… centralised data, finally, finally."
 * ~44 s. Every position is V(16:9, 9:16). Beats: ../MOMENTS.md. Kit: ../../film/scenes/blink.js; layout: common.js. */
'use strict';

function buildMoment() {
  const k = PS({
    open: 'ghana just launched something called marrify', plat: "it's like a public platform", sv: 'where you can search and verify',
    mar: 'marriages', div: 'divorces', off: 'and licensed marriage officials',
    month: 'it launched last month', gender: 'with some ministry of gender',
    read: 'and i was just reading about it the other day on techcabal',
    works: 'and the way that it works is that it pulls data', srcs: 'from different government sources',
    rgd: "registrar-general's department", courts: 'the courts', local: 'local assembly', allof: 'all of that',
    km: 'it covers all kinds of marriages', kd: 'and all kinds of divorces',
    back: 'it goes all the way back', recs: 'like records from all the way back',
    check: 'and you can also check whether', church: 'a church', pastor: 'or a pastor', venue: 'and a marriage venue', lic: 'is actually licensed to conduct a marriage',
    love: 'and i really love this when i saw it', afr: "because as an african i'm thinking wow", cen: "we're having centralised data finally finally",
  });
  const [c1, c2, c3] = cutTimes();
  const tSearch = k.plat.t - 0.1, tTC = c3, tSrc = k.works.t - 0.1, tBack = k.back.t - 0.08, tLic = k.check.t - 0.1, tCen = k.cen.w[1] - 0.12;
  const x = LX(), w = WX();

  /* ---------- camera ---------- */
  camSplit(-1);
  camPunch(c1, 1.34, 1.24);
  CAM(c2, { z: V(1.26, 1.16), fx: V(0.68, null), fy: V(null, 0.36) });
  camSplit(tTC);
  camSplit(tSrc, { z: V(1.36, 0.82) });
  camFull(k.km.t - 0.1, 1.26, 1.16); camPunch(k.kd.w[4] - 0.04, 1.4, 1.26);
  camSplit(tLic, { now: true });
  camFull(k.love.w[2] - 0.1, 1.26, 1.16); camPush(k.love.w[2], 1.6, 1.34, 1.22);
  camPunch(k.afr.w[3] - 0.05, 1.42, 1.28);

  /* 1 · hook (on screen from frame 0): the records of a country, with eyes */
  bshot(0, (t) => {
    wsplit(t, -0.6, () => {
      head(t, -0.8, V(['Ghana now lets you', 'check if someone', 'is *married.*'], ['Ghana now lets', 'you check if', 'someone is *married.*']), x, V(220, 1170), V(76, 80), { id: 'hook' });
      const fy = V(520, 1392); flagB('ghana', x, fy, V(130, 110));
      bub(t, k.open.w[5] - 0.05, x + V(160, 150), fy - V(6, 4), "It's called *Marrify.*", { size: V(44, 44), key: 'called' });
      const cast = [['cert', BL.red], ['folder', BL.sand], ['envelope', BL.cobalt], ['stamp', BL.black]];
      cast.forEach(([sh, col], i) => pop(t, -0.7 + i * 0.06, sh, col, V(200 + i * 170, 165 + i * 215), V(920, 1640), V(180, 170), { seed: i * 3 + 1, lx: V(0.8, 0), ly: V(-0.2, -0.9) }));
    });
  }, { id: 'hook' });
  sfx('pop', 0.04, -6); sfx('pop', k.open.w[5] - 0.05);

  /* 2 · a public platform: the REAL Marrify search box (empty), credited; what it verifies ticks on her words */
  bshot(tSearch, (t) => {
    wsplit(t, tSearch, () => {
      head(t, tSearch + 0.1, ['A *public* platform', 'to search and verify:'], x, V(180, 1180), V(68, 72), { id: 'public' });
      const cxs = V(x, 40), cws = V(w, 1000);
      const sp = springIn(t, tSearch + 0.15, cxs, V(290, 1290), { dy: 80 });
      if (sp.p > 0) withA(clamp(sp.p * 3), () => sourceCard(IMG.mf_search, cxs, sp.y, cws, { crop: V([0, 0, 1700, 340], [40, 110, 1660, 250]), credit: MF_CREDIT, key: 'marrify search', creditX: V(x, 80) }));
      face(t, V(x + w - 30, 880), V(270, 1216), V(40, 56), 21, { s: popS(t, k.sv.w[3]), wake: k.sv.w[3] + 0.1, lx: -0.7, ly: 0.7, squeeze: [k.mar.t, k.mar.t + 0.3] });
      const items = [['Marriages', k.mar.t - 0.05, k.mar.t + 0.15], ['Divorces', k.div.t - 0.05, k.div.t + 0.15], ['Licensed marriage officials', k.off.w[1] - 0.05, k.off.w[3]]];
      const pos = V([[x, 560], [x, 670], [x, 780]], [[x, 1482], [x + 300, 1482], [x, 1562]]);
      items.forEach(([s, t0, tk], i) => bub(t, t0, pos[i][0], pos[i][1], s, { size: V(48, 36), tick: tk, key: 'verify ' + i }));
    });
  }, { id: 'search' });
  sfx('whoosh', tSearch + 0.04); sfx('pop', tSearch + 0.15, -4); sfx('tick', k.mar.t + 0.15); sfx('tick', k.div.t + 0.15); sfx('tick', k.off.w[3]);

  /* 3 · launched last month, with the Ministry of Gender (a stamp peeks in) */
  bshot(c1, (t) => {
    bubPair(t, { s: 'Launched *last month*', t: c1 + 0.04 }, { s: 'with the Ministry of Gender', t: k.gender.w[0] }, { out: c3 - 0.15 });
    withA(1 - prog(t, c3 - 0.35, 0.2), () => bub(t, k.gender.w[2], x, V(540, 1476), 'Launched in Accra, 28 Aug 2026', { size: V(32, 32), fg: BL.grey, key: 'date' }));
    if (PORTRAIT) pop(t, k.gender.w[2] + 0.1, 'stamp', BL.black, 720, 1590, 210, { seed: 7, lx: -0.8, ly: -0.4, a: 1 - prog(t, c3 - 0.35, 0.2) }); else peek(t, c1 + 0.2, c3, 'stamp', BL.black, { seed: 7 });
  }, { id: 'launched' });
  sfx('pop', c1 + 0.04); sfx('pop', k.gender.w[0], -4); sfx('blink', c1 + 0.5, -6);

  /* 4 · split: she read it on TechCabal: the REAL newsletter section, the launch line highlighted on her word */
  const tcDraw = (t) => {
    head(t, tTC + 0.1, V(['I read about it on *TechCabal.*'], ['I read about it on', '*TechCabal.*']), V(CX, x), V(190, 1180), V(84, 72), { acc: BL.red, align: V('center', 'left'), id: 'tc head' });
    const cx_ = V(360, 40), cw_ = V(1200, 1000), sp = springIn(t, tTC + 0.12, cx_, V(270, 1294), { dy: 90 });
    if (sp.p > 0) withA(clamp(sp.p * 3), () => sourceCard(IMG.tc_column, cx_, sp.y, cw_, { crop: [0, 1480, 1180, 1765], credit: TC.credit, creditX: V(cx_, 80), key: 'tc launch', over: (M) => highlight(t, k.read.w[11], 0.8, TC.launch, M, BL.hiRed) }));
    if (!PORTRAIT) [[230, 520, 0], [1690, 520, 1]].forEach(([fx, fy, i]) => face(t, fx, fy, 70, 60 + i, { s: popS(t, tTC + 0.2 + i * 0.06), lx: i ? -1 : 1, ly: 0.2, squeeze: [k.read.w[11], k.read.w[11] + 0.3] }));
  };
  if (PORTRAIT) bshot(tTC, (t) => wsplit(t, tTC, () => tcDraw(t)), { id: 'techcabal' }); else bcard(tTC, tcDraw, { id: 'techcabal', push: 0 });
  sfx('whoosh', tTC + 0.04); sfx('pen', k.read.w[11]);

  /* 5 · split: where the data comes from: three government sources walk into one search */
  bshot(tSrc, (t) => {
    wsplit(t, tSrc, () => {
      head(t, tSrc + 0.05, ['It *pulls data* from:'], x, V(180, 1180), V(68, 72), { acc: BL.cobalt, id: 'pulls' });
      const src = [['register', BL.green, "Registrar-General's Department", k.rgd.t], ['court', BL.cobalt, 'The courts', k.courts.w[1]], ['stamp', BL.black, 'Local assemblies', k.local.t]];
      const hubX = V(x + 560, 500), hubY = V(800, 1645), sz = V(160, 200);
      src.forEach(([sh, col, lab, said], i) => {
        const sx = V(x + 80, 220 + i * 280), sy = V(390 + i * 200, 1500), tin = tSrc + 0.15 + i * 0.1;
        const named = t >= said - 0.05;
        dotted(V(sx + sz * 0.5, sx), V(sy - sz * 0.45, sy + 6), hubX - V(110, 0), hubY - V(150, 150), ease(t, said, 0.5), named ? BL.cobalt : BL.soft, 6, 14);
        pop(t, tin, sh, col, sx, sy, sz, { seed: i * 5 + 2, lx: V(0.8, 0), ly: V(0.2, 0.8), open: named ? blinkOpen(t, i * 5 + 2) : 0.2 });
        withA(ease(t, tin + 0.1, 0.3), () => bmono(lab, V(sx + sz * 0.62, sx), V(sy - sz * 0.42, 1246), V(26, 26), { col: named ? BL.ink : BL.soft, key: 'src ' + i, align: V('left', 'center'), maxW: V(330, 230) }));
      });
      pop(t, tSrc + 0.3, 'folder', BL.sand, hubX, hubY, V(240, 140), { seed: 17, open: t > k.allof.t ? 'happy' : blinkOpen(t, 17), ly: -0.3, lx: V(-0.5, 0) });
      withA(ease(t, tSrc + 0.4, 0.3), () => bmono('One search', V(hubX, hubX + 100), V(hubY + 48, 1610), V(26, 26), { align: V('center', 'left'), col: BL.grey, key: 'one search' }));
    });
  }, { id: 'sources' });
  sfx('whoosh', tSrc + 0.04); sfx('pop', tSrc + 0.15, -5); sfx('pop', tSrc + 0.3, -3); sfx('tick', k.rgd.t + 0.3, -4); sfx('tick', k.courts.w[1] + 0.3, -4); sfx('tick', k.local.t + 0.3, -4);

  /* 6 · all kinds of marriages, all kinds of divorces (a certificate and a folder peek in) */
  bshot(k.km.t - 0.1, (t) => {
    bubPair(t, { s: 'All kinds of *marriages*', t: k.km.w[2] - 0.05 }, { s: 'All kinds of *divorces*', t: k.kd.w[1], acc: BL.red }, { out: tBack });
    peek(t, k.km.w[5] - 0.1, tBack, 'cert', BL.red, { seed: 3 });
  }, { id: 'kinds' });
  sfx('pop', k.km.w[2]); sfx('pop', k.kd.w[1], -2);

  /* 7 · card (eyelid wipe): records from all the way back: a line of records, older ones further away */
  bcard(tBack, (t) => {
    head(t, tBack + 0.02, V(['It goes all the way *back.*'], ['It goes all', 'the way *back.*']), CX, V(240, 720), V(96, 100), { align: 'center', id: 'back' });
    const n = 7;
    for (let i = 0; i < n; i++) {   // drawn back to front: older (smaller) records behind
      const j = n - 1 - i, f = j / (n - 1), sz = V(320, 380) * Math.pow(0.84, j), xx = V(CX + 460 - j * 165, CX + 240 - j * 88), yy = V(900 - f * 130, 1580 - f * 230);
      pop(t, tBack + 0.12 + j * 0.06, ['cert', 'gazette', 'register', 'folder', 'cert', 'gazette', 'register'][j], [BL.red, BL.gold, BL.green, BL.sand, BL.coral, BL.gold, BL.green][j], xx, yy, sz, { seed: 30 + j, lx: -0.9, ly: 0 });
    }
    withA(ease(t, k.recs.t, 0.3), () => { bmono('Today', V(CX + 460, CX + 220), V(975, 1660), V(30, 32), { align: 'center', key: 'today' }); bmono('All the way back', V(CX - 530, CX - 250), V(840, 1220), V(30, 32), { align: 'center', key: 'theback' }); });
  }, { id: 'back', lid: true });
  sfx('crowd', tBack + 0.15, -4);

  /* 8 · split: you can also check a church, a pastor, a venue: licensed? (a stamp says yes) */
  bshot(tLic, (t) => {
    wsplit(t, tLic, () => {
      head(t, tLic + 0.02, ['Check if it’s *licensed:*'], x, V(180, 1180), V(68, 72), { id: 'alsocheck' });
      const rows = [['A church', k.church.w[1]], ['A pastor', k.pastor.w[2]], ['A marriage venue', k.venue.w[3]]];
      rows.forEach(([s, said], i) => bub(t, tLic + 0.1 + i * 0.08, x, V(260 + i * 120, 1222 + i * 120), s, { size: V(50, 50), tick: k.lic.w[2] + 0.1 * i, key: 'lic ' + i, fg: t >= said - 0.05 ? BL.ink : BL.soft }));
      const sp = popS(t, k.lic.w[2] - 0.1, 2.8, 0.4);
      if (sp > 0) critter('stamp', BL.green, V(x + 560, 800), V(770, 1560), V(230, 300), { s: sp, open: 'happy', key: 'licensed stamp' });
      withA(ease(t, k.lic.w[2], 0.3), () => bmono('Licensed to conduct a marriage', x, V(700, 1636), V(26, 28), { col: BL.green, key: 'lic q', maxW: V(420, 860) }));
    });
  }, { id: 'licensed' });
  sfx('whoosh', tLic + 0.04); sfx('pop', tLic + 0.1, -5); sfx('pop', k.lic.w[2] - 0.1); [0, 0.1, 0.2].forEach(d => sfx('tick', k.lic.w[2] + d + 0.1, -4));

  /* 9 · I really love this / as an African: wow */
  bshot(k.love.w[2] - 0.12, (t) => {
    if (t < k.afr.t - 0.12) bubPair(t, { s: 'I really *love* this', t: k.love.w[2] - 0.1 }, { s: 'when I saw it', t: k.love.w[5] });
    else bubPair(t, { s: 'As an *African:*', t: k.afr.t - 0.1 }, { s: '“Wow.”', t: k.afr.w[6], size: V(64, 58) });
    peek(t, k.love.w[3], null, 'folder', BL.sand, { open: 'happy', seed: 9 });
  }, { id: 'love' });
  sfx('pop', k.love.w[2] - 0.1); sfx('pop', k.afr.t - 0.1); sfx('blink', k.afr.w[6], -2);

  /* 10 · card (eyelid wipe): centralised data. finally, finally: every record packs into one place */
  bcard(tCen, (t) => {
    head(t, tCen + 0.02, V(['Centralised data.'], ['Centralised', 'data.']), CX, V(250, 560), V(110, 110), { align: 'center', id: 'cen' });
    head(t, k.cen.w[4], ['*Finally, finally.*'], CX, V(370, 800), V(72, 72), { align: 'center', acc: BL.green, id: 'finally' });
    const cast = [['cert', BL.red], ['folder', BL.sand], ['envelope', BL.cobalt], ['stamp', BL.black], ['gazette', BL.gold], ['register', BL.green], ['idcard', BL.coral]];
    const fin = V([[-420, 900], [-260, 860], [-80, 910], [90, 850], [250, 900], [410, 870], [560, 910]], [[-290, 1260], [-95, 1230], [100, 1270], [290, 1220], [-200, 1520], [0, 1500], [200, 1530]]);
    cast.forEach(([sh, col], i) => {
      const sp = springIn(t, tCen + 0.06 + i * 0.04, CX + fin[i][0], fin[i][1], { dx: (i % 2 ? 1 : -1) * V(700, 500), dy: -60 });
      critter(sh, col, sp.x, sp.y, V(190, 220), { s: sp.s, open: t > k.cen.w[4] ? 'happy' : blinkOpen(t, 40 + i), lx: 0, ly: -0.8 });
    });
  }, { id: 'centralised', lid: true });
  sfx('crowd', tCen + 0.1, -2); sfx('pop', k.cen.w[4], -3);
}
