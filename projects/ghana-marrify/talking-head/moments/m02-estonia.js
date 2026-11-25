/* Moment 02 (kit clip 2), Blink look: Estonia is fully digital. "I've been living in Estonia for about a year now… instead of NIN and this and that."
 * ~45 s. V(16:9, 9:16). Beats: ../MOMENTS.md. */
'use strict';

function buildMoment() {
  const k = PS({
    year: "i've been living in estonia for about a year now", hub: 'and people always say this place is the digital hub of europe or something like that',
    lie: "and i'm not going to lie it's so real", every: 'everything you want to do here is online', exag: "i'm not exaggerating everything",
    health: 'your health records', links: 'everything links so well',
    nothing: "there is nothing you want to do that you can't do online here", mar: 'you can get married online', div: 'you can divorce online',
    link: "there's a link for everything you want to do in estonia",
    eco: 'the data ecosystem that the governments use that they run here', sync: 'the way it syncs', adm: 'i genuinely admire it',
    ng: 'and as someone coming from nigeria', blew: 'it blew my mind when i got here', sync2: 'where everything just syncs',
    gh: 'and i see ghana doing something in this direction', yes: "my first instinct is like yes please more of this",
    solves: 'because it solves so much problems', one: "there's one reliable record", paper: 'instead of like just pieces of paper everywhere', nin: 'instead of nin and this and that',
  });
  const [c1, c2] = cutTimes();
  const tHub = k.hub.w[7] - 0.1, tEvery = k.every.t - 0.1, tLinks = c1, tEco = k.eco.t - 0.08, tNg = k.ng.t - 0.08, tYes = c2, tOne = k.solves.t - 0.08;
  const x = LX(), w = WX();

  /* camera */
  camSplit(-1);
  camPunch(tHub, 1.38, 1.24);
  camFull(k.lie.t - 0.1, 1.26, 1.16); camPush(k.lie.t, 1.9, 1.36, 1.22);
  camSplit(tEvery);
  camPunch(k.health.t - 0.1, 1.38, 1.24);
  camSplit(tLinks);
  camSplit(tEco, { z: V(1.36, 0.82) });
  camPunch(k.adm.t - 0.1, 1.42, 1.28);
  camSplit(tNg);
  camFull(k.gh.t - 0.1, 1.28, 1.16); camPush(k.gh.t, 1.8, 1.38, 1.22);
  camSplit(tOne, { now: true });

  /* 1 · hook: in Estonia you can get divorced online (a divorce folder waves from Estonia) */
  bshot(0, (t) => {
    wsplit(t, -0.6, () => {
      flagB('estonia', x, V(180, 1130), V(130, 120));
      head(t, -0.8, V(['In Estonia, you', 'can get *divorced*', 'online.'], ['In Estonia, you can', 'get *divorced* online.']), x, V(370, 1300), V(88, 78), { id: 'hook' });
      bub(t, k.year.w[8] - 0.1, V(x + 160, x + 150), V(170, 1124), 'I’ve lived here a year.', { size: V(40, 40), key: 'year' });
      pop(t, -0.7, 'folder', BL.sand, V(x + 160, 300), V(880, 1620), V(220, 210), { seed: 4, open: 'happy' });
      pop(t, -0.64, 'cert', BL.red, V(x + 420, 560), V(880, 1620), V(180, 180), { seed: 6, lx: -0.6, ly: -0.5 });
      pop(t, -0.58, 'idcard', BL.cobalt, V(x + 630, 800), V(880, 1620), V(180, 180), { seed: 8, lx: -0.6, ly: -0.5 });
    });
  }, { id: 'hook' });
  sfx('pop', 0.04, -6); sfx('pop', k.year.w[8] - 0.1);

  /* 2 · the digital hub of Europe / I'm not going to lie: it's so real */
  bshot(tHub, (t) => {
    if (t < k.lie.t - 0.12) bubPair(t, { s: 'The digital *hub* of Europe', t: tHub + 0.04 }, { s: '(or something like that)', t: k.hub.w[12] });
    else bubPair(t, { s: 'I’m not going to lie:', t: k.lie.t - 0.1, size: V(54, 48) }, { s: 'It’s so *real.*', t: k.lie.w[6], size: V(70, 62) });
    peek(t, tHub + 0.3, null, 'idcard', BL.cobalt, { seed: 11, open: t > k.lie.w[6] ? 'happy' : t > k.hub.w[12] && t < k.hub.w[12] + 0.6 ? 0.1 : undefined });
  }, { id: 'hub' });
  sfx('pop', tHub + 0.04); sfx('pop', k.lie.t - 0.1); sfx('pop', k.lie.w[6], -2);

  /* 3 · split: everything you want to do here is online (each record gets its green check) */
  bshot(tEvery, (t) => {
    wsplit(t, tEvery, () => {
      head(t, tEvery + 0.05, V(['Everything you want to', 'do here is *online.*'], ['Everything you want', 'to do here is *online.*']), x, V(190, 1160), V(64, 72), { id: 'online' });
      const cast = [['cert', BL.red], ['folder', BL.sand], ['envelope', BL.cobalt], ['register', BL.green], ['idcard', BL.coral], ['gazette', BL.gold]];
      cast.forEach(([sh, col], i) => {
        const cx = V(x + 100 + (i % 3) * 240, 190 + (i % 3) * 300), cy = V(580 + Math.floor(i / 3) * 260, 1470);
        if (PORTRAIT && i >= 3) return;
        const tick = k.every.w[7] + i * 0.12;
        pop(t, tEvery + 0.15 + i * 0.06, sh, col, cx, cy, V(160, 180), { seed: 50 + i, open: t > tick + 0.2 ? 'happy' : blinkOpen(t, 50 + i), ly: -0.4 });
        check(cx + V(50, 60), cy - V(190, 200), V(50, 56), prog(t, tick, 0.3), BL.green);
      });
      bub(t, k.exag.w[2] - 0.05, x, V(880, 1526), 'I’m not *exaggerating.*', { size: V(44, 44), key: 'exag' });
    });
  }, { id: 'online' });
  sfx('whoosh', tEvery + 0.04); sfx('crowd', tEvery + 0.15, -4); [0, 0.12, 0.24].forEach(d => sfx('tick', k.every.w[7] + d, -3)); sfx('pop', k.exag.w[2]);

  /* 4 · your health records, everything links */
  bshot(k.health.t - 0.12, (t) => {
    bubPair(t, { s: 'Your *health records*', t: k.health.t - 0.1 }, { s: 'Everything *links.*', t: k.links.w[0] }, { out: tLinks - 0.05 });
    peek(t, k.health.w[1], tLinks, 'register', BL.green, { seed: 12 });
  }, { id: 'health' });
  sfx('pop', k.health.t - 0.1); sfx('pop', k.links.w[0], -3);

  /* 5 · split: there's a link for everything (records with bubbles, each ticks) */
  bshot(tLinks, (t) => {
    wsplit(t, tLinks, () => {
      const head2 = t >= k.link.w[2] - 0.05;
      if (!head2) head(t, tLinks + 0.05, ['Nothing you can’t', 'do *online.*'], x, V(190, 1160), V(64, 72), { id: 'nothing' });
      else { FOOT.hideCap = true; head(t, k.link.w[2] - 0.05, ['There’s a link', '*for everything.*'], x, V(190, 1160), V(64, 72), { id: 'linkhead' }); }
      const rows = [['register', BL.green, 'Your health records, online', tLinks + 0.15, k.link.w[2]], ['cert', BL.red, 'You can get married online', k.mar.w[3] - 0.1, k.link.w[2] + 0.12], ['folder', BL.sand, 'You can divorce online', k.div.w[2] - 0.1, k.link.w[2] + 0.24]];
      rows.forEach(([sh, col, s, t0, tk], i) => {
        const ry = V(330 + i * 160, 1290 + i * 118);
        const lit = 0.3 + 0.7 * prog(t, t0, 0.25);
        withA(lit, () => { pop(t, tLinks + 0.1 + i * 0.06, sh, col, x + V(55, 65), ry + V(110, 104), V(110, 112), { seed: 60 + i, lx: 0.9, open: t > t0 ? blinkOpen(t, 60 + i) : 0.2 });
          bub(t, tLinks + 0.14 + i * 0.06, x + V(130, 150), ry + V(10, 12), s, { size: V(36, 40), tick: tk, key: 'link ' + i }); });
      });
      illus(V(x, 940), V(960, 1160), V('left', 'right'));
    });
  }, { id: 'links' });
  sfx('whoosh', tLinks + 0.04); sfx('pop', k.mar.w[3] - 0.1); sfx('pop', k.div.w[2] - 0.1); [0, 0.12, 0.24].forEach(d => sfx('tick', k.link.w[2] + d, -3));

  /* 6 · split: the data ecosystem: records linked by lines; on "syncs" every eye blinks together */
  bshot(tEco, (t) => {
    wsplit(t, tEco, () => {
      head(t, tEco + 0.05, ['The data *ecosystem*'], x, V(190, 1160), V(66, 72), { acc: BL.cobalt, id: 'eco' });
      const cx = V(440, 510), cy = V(600, 1430), R = V(240, 340), ry = V(1, 0.35);
      const nodes = [['register', BL.green, 'Health records'], ['cert', BL.red, 'Marriage'], ['folder', BL.sand, 'Divorce'], ['idcard', BL.cobalt, 'You']];
      const pos = nodes.map((_, i) => { const a = -Math.PI / 2 + i * Math.PI / 2; return [cx + Math.cos(a) * R, cy + Math.sin(a) * R * ry]; });
      const ts = nodes.map((_, i) => tEco + 0.12 + 0.1 * i), tSync = k.sync.w[3];
      for (let i = 0; i < 4; i++) for (let j = i + 1; j < 4; j++) dotted(pos[i][0], pos[i][1] - V(40, 40), pos[j][0], pos[j][1] - V(40, 40), ease(t, Math.max(ts[i], ts[j]) + 0.2, 0.5), t >= tSync ? BL.cobalt : BL.line, t >= tSync ? 7 : 5, 14);
      const syncBlink = t >= tSync && t < tSync + 0.14 ? 0 : null;    // they all blink at once on "syncs"
      const syncPulse = 1 + 0.12 * Math.max(0, Math.sin(Math.PI * clamp((t - tSync) / 0.32)));
      nodes.forEach(([sh, col, lab], i) => { pop(t, ts[i], sh, col, pos[i][0], pos[i][1] + V(30, 40), V(170, 160) * syncPulse, { seed: 70 + i, open: syncBlink != null ? syncBlink : (t > tSync + 0.14 ? 'happy' : blinkOpen(t, 70 + i)) });
        withA(ease(t, ts[i] + 0.1, 0.3), () => { const lw = tw(lab.toUpperCase(), BF.mono(V(24, 26)), 1) + 20; fillRR(pos[i][0] - lw / 2, pos[i][1] + V(50, 52), lw, V(36, 38), 8, BL.ground); bmono(lab, pos[i][0], pos[i][1] + V(76, 78), V(24, 26), { align: 'center', key: 'eco ' + i }); }); });
    });
  }, { id: 'ecosystem' });
  sfx('whoosh', tEco + 0.04); sfx('crowd', tEco + 0.12, -4); sfx('blink', k.sync.w[3], 0); sfx('pen', k.sync.w[3] + 0.05, -4);

  /* 7 · I genuinely admire it */
  bshot(k.adm.t - 0.12, (t) => {
    bubPair(t, { s: 'I genuinely *admire* it.', t: k.adm.t - 0.1, size: V(68, 58) }, null);
    peek(t, k.adm.w[2], null, 'cert', BL.red, { open: 'happy', seed: 13 });
  }, { id: 'admire' });
  sfx('pop', k.adm.t - 0.1);

  /* 8 · split: coming from Nigeria, it blew my mind (wide eyes) */
  bshot(tNg, (t) => {
    wsplit(t, tNg, () => {
      head(t, tNg + 0.05, ['Coming from *Nigeria:*'], x, V(190, 1160), V(64, 72), { id: 'from-ng' });
      const fy = V(260, 1206), fw = V(200, 180);
      const p1 = popS(t, tNg + 0.08), p2 = popS(t, tNg + 0.18);
      if (p1 > 0) withT(x + fw / 2, fy + fw / 4, p1, 0, () => flagB('nigeria', -fw / 2, -fw / 4, fw));
      dotted(x + fw + 20, fy + fw / 4, x + fw + V(150, 170), fy + fw / 4, ease(t, tNg + 0.1, 0.3), BL.ink, 6, 14);
      if (p2 > 0) withT(x + fw + V(170, 190) + fw / 2, fy + fw * 0.32, p2, 0, () => flagB('estonia', -fw / 2, -fw * 0.32, fw));
      const cast = [['cert', BL.red], ['folder', BL.sand], ['idcard', BL.cobalt]];
      cast.forEach(([sh, col], i) => { const bump = 1 + 0.18 * Math.max(0, Math.sin(Math.PI * clamp((t - k.blew.w[3] - i * 0.05) / 0.35)));
        pop(t, k.blew.w[1] + i * 0.03, sh, col, V(x + 120 + i * 220, 190 + i * 300), V(700, 1486), V(150, 150) * bump, { seed: 80 + i, open: t > k.sync2.w[3] ? 'happy' : 1, lx: 0, ly: -0.8 }); });
      head(t, k.blew.w[0], ['It blew my *mind.*'], x, V(860, 1618), V(80, 96), { id: 'blew' });
    });
  }, { id: 'nigeria' });
  sfx('whoosh', tNg + 0.04); sfx('pop', tNg + 0.15); sfx('pop', tNg + 0.4, -3); sfx('crowd', k.blew.w[1], -4); sfx('blink', k.blew.w[3] - 0.1);

  /* 9 · and I see Ghana doing something in this direction */
  bshot(k.gh.t - 0.12, (t) => {
    bubPair(t, { s: 'I see *Ghana* doing', t: k.gh.w[1] }, { s: 'something in this direction.', t: k.gh.w[5] }, { out: tYes - 0.05, x: V(x, x + 150) });
    const p = popS(t, k.gh.w[3]); if (p > 0) withT(V(x + 70, x + 72), V(580, 1294), p, -0.06, () => flagB('ghana', -60, -40, 120));
  }, { id: 'ghana' });
  sfx('pop', k.gh.w[1]); sfx('pop', k.gh.w[3], -3);

  /* 10 · card (eyelid wipe): yes, please. more of this. (the records cheer) */
  bcard(tYes, (t) => {
    bmono('My first instinct', CX, V(260, 560), V(28, 30), { align: 'center', key: 'instinct' });
    head(t, tYes + 0.02, V(['Yes, please.', '*More of this.*'], ['Yes, please.', '*More of this.*']), CX, V(420, 760), V(120, 116), { align: 'center', id: 'yes' });
    const cast = [['cert', BL.red], ['folder', BL.sand], ['register', BL.green], ['envelope', BL.cobalt], ['idcard', BL.coral]];
    cast.forEach(([sh, col], i) => { const bounce = Math.max(0, Math.sin((t - tYes) * 7 + i)) * V(16, 18) * (t > k.yes.w[5] ? 1 : 0);
      pop(t, tYes + 0.1 + i * 0.06, sh, col, V(CX - 500 + i * 250, 140 + i * 200), V(900, 1450) - bounce, V(170, 170), { seed: 90 + i, open: t > k.yes.w[5] ? 'happy' : blinkOpen(t, 90 + i) }); });
  }, { id: 'yes', lid: true });
  sfx('crowd', tYes + 0.1, -4); sfx('yes', k.yes.w[5]);

  /* 11 · split: pieces of paper everywhere (dizzy records, struck) -> one reliable record (happy, green) */
  bshot(tOne, (t) => {
    wsplit(t, tOne, () => {
      head(t, tOne + 0.05, ['It solves *so much.*'], x, V(190, 1160), V(64, 72), { id: 'solves' });
      const mess = [['cert', BL.red], ['envelope', BL.cobalt], ['folder', BL.sand], ['idcard', BL.coral], ['gazette', BL.gold]];
      const gone = E.inOutCubic(prog(t, k.nin.w[5] + 0.1, 0.5));
      mess.forEach(([sh, col], i) => { const mx = V(x + 60 + i * 140, 130 + i * 175), my = V(380, 1340) + (i % 2) * V(20, 16);
        pop(t, tOne + 0.15 + i * 0.07, sh, col, mx, my, V(130, 140), { rot: (hash(i + 3) - 0.5) * 40, seed: 100 + i, lx: Math.sin(t * 6 + i), ly: Math.cos(t * 5 + i) * 0.6, a: 1 - 0.7 * gone }); });
      const ly = V(480, 1452); withA(ease(t, tOne + 0.4, 0.3), () => _txt('Pieces of paper everywhere', x, ly, BF.h(V(40, 40), 600), BL.ink, 'left', 'alphabetic', -0.5));
      { const tl = tw('Pieces of paper everywhere', BF.h(V(40, 40), 600), -0.5); strikeBar(x + tl * 0.04, ly - V(13, 13), tl * 0.92, prog(t, k.nin.w[0], 0.35), BL.red, 4); }
      withA(ease(t, k.nin.w[2], 0.3), () => { const nx = V(x + 60 + 3 * 140, 655), ny = V(426, 1396), ns = V(24, 24), nw = tw('NIN: NIGERIA’S ID NUMBER', BF.mono(ns), ns * 0.04) + 24; fillRR(nx - nw / 2, ny - ns * 1.05, nw, ns * 1.5, 8, BL.card); bmono('NIN: Nigeria’s ID number', nx, ny, ns, { align: 'center', col: BL.ink, key: 'nin' }); });
      const op = springIn(t, k.one.w[1] - 0.05, x, V(660, 1526), { dy: 60 });
      if (op.p > 0) { critter('cert', BL.green, x + V(80, 70), op.y + V(150, 100), V(150, 120), { s: op.s, open: 'happy' });
        bub(t, k.one.w[1] - 0.05, x + V(180, 150), op.y + V(20, -40), 'One *reliable* record', { size: V(46, 64), key: 'onerec' }); }
    });
  }, { id: 'record' });
  sfx('whoosh', tOne + 0.04); sfx('crowd', tOne + 0.15, -4); sfx('yes', k.one.w[2]); sfx('pen', k.nin.w[0]); sfx('pop', k.nin.w[2], -2);
}
