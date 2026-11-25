/* Part 3: Railway and Zeabur (2:55 - 4:28). */
'use strict';
function part3() {
  /* ---------- 22. while everyone patched: Railway, same day ---------- */
  const k1 = { why: Q('Now why everyone was busy patching PHP', 174), rw: P('Railway happened on the same day') };
  addScene(k1.why.t - 0.1, 'oct', 'busy', (t, lt) => {
    
    KT(t, { lines: V(['while everyone', 'was patching PHP'], ['while everyone', 'was patching PHP']), x: L, y: V(170, 470), size: V(96, 96), times: [k1.why.w[1], k1.why.w[2], k1.why.w[3], k1.why.w[4], k1.why.w[5], k1.why.w[6]], col: A.ink });
    const fills = [...FILLS.filter(f => f.label !== 'RAILWAY'), { d: 21, label: 'RAILWAY', at: k1.rw.w[0] }];
    month(t, { fills, ring: { d: 21, at: k1.rw.w[3], col: A.bone } });
    if (PORTRAIT) withA(ez(t, k1.rw.w[0], 0.3), () => txt('21 OCT  RAILWAY', L, 1426, F.disp(72), A.ink, 'left', 'alphabetic', 0, 'railway day'));
    withA(ez(t, k1.rw.w[3], 0.4), () => { if (!PORTRAIT) txt('21 Oct: the same day', W - L, 250, F.disp(56), A.cream, 'right', 'alphabetic', 0, 'same day'); });
  }, { id: 'busy' });
  cue('pop', k1.rw.w[0], -2); cue('scribble', k1.rw.w[3], -4);

  /* ---------- 23. what Railway is: a deployment platform ---------- */
  const k2 = { if: P("If you don't know what Railway is"), dep: P('Railway is a deployment platform where you can deploy your apps') };
  addScene(k2.if.t - 0.1, 'bone', 'deploy', (t) => {
    KT(t, { lines: V(['a deployment', 'platform'], ['a deployment platform']), x: L, y: V(260, 520), size: V(120, 96), times: [k2.dep.w[2], k2.dep.w[3], k2.dep.w[4]], col: A.ink });
    // your code -> the platform -> your app, live on the web
    const y = V(560, 860), bw = V(420, 400), bh = V(260, 200), gap = V(170, 60);
    const box = (i, title, sub, at, col, fg) => { const p = ez(t, at, 0.4); if (p <= 0) return; const x = V(L + i * (bw + gap), L), yy = V(y, y + i * (bh + gap));
      withA(p, () => { ctx.save(); ctx.translate(0, 24 * (1 - p)); fillRR(x, yy, bw, bh, 14, col); txt(title, x + 30, yy + 90, F.disp(60), fg, 'left', 'alphabetic', 0, 'deploy box ' + i); lab(sub, x + 30, yy + bh - 36, 30, col === A.orange ? A.ink : fg === A.ink ? A.midB : A.midN, 'left', { key: 'deploy sub ' + i }); ctx.restore(); }); };
    box(0, 'your code', 'on your laptop', k2.if.t - 0.7, A.card, A.ink); box(1, 'Railway', 'builds and runs it', k2.if.t - 0.5, A.ink, A.bone); box(2, 'your app', 'live on the web', k2.if.t + 0.3, A.orange, A.ink);
    [0, 1].forEach(i => { const p = ez(t, [k2.if.t - 0.4, k2.if.t + 0.1][i], 0.5); if (p <= 0) return;
      if (!PORTRAIT) arrowR(L + (i + 1) * bw + i * gap + 20, y + bh / 2, L + (i + 1) * (bw + gap) - 20 - gap * (1 - p) * 0.0, p, A.ink, 5, 20);
      else { const x = L + 60, yy = y + (i + 1) * bh + i * gap; pline(x, yy + 8, x, yy + gap - 8, p, A.ink, 5); } });
  }, { id: 'deploy' });
  cue('place', k2.if.t - 0.1, -4); cue('pop', k2.if.t + 0.3, -4);

  /* ---------- 24. the .env: the keyring ---------- */
  const k3 = { says: P('So basically, Railway says someone may have accessed their'), env: P("customers' encrypted environment variables"), dev: P("and if you're a developer, you know how important it is to keep your environment variable safe") };
  addScene(k3.says.t - 0.1, 'night', 'env', (t) => {
    dayFrame(t, k3.says.t - 0.1, 21); dayHead(t, k3.says.t - 0.1, 21, 'WED', { name: 'Railway' });
    const ex = L, ey = V(270, 560), ew = V(860, W - 2 * L), eh = V(280, 270);
    grp('env card', ex, ey, ew, eh, () => withA(ez(t, k3.says.w[4], 0.4), () => { fillRR(ex, ey, ew, eh, 16, A.panelN);
      txt('# .env', ex + 40, ey + 66, F.mono(34, 500), A.midN, 'left');
      [['DB_PASSWORD=', '••••••••'], ['OPENAI_API_KEY=', 'sk-•••••'], ['AWS_SECRET_KEY=', '••••••••']].forEach(([k, v], i) => { const at = k3.env.w[0] + i * 0.2; const y = ey + 140 + i * 56; withA(ez(t, at, 0.3), () => {
        const fs = V(36, 32); txt(k, ex + 40, y, F.mono(fs, 500), A.bone, 'left', 'alphabetic', 0, 'env key ' + i); txt(v, ex + 40 + tw(k, F.mono(fs, 500)), y, F.mono(fs, 500), A.orange, 'left', 'alphabetic', 0, 'env val ' + i); }); }); }));
    // the same secrets as keys on a ring (B): each key has its tag
    const rx = V(1340, 760), ry = V(280, 900), names = ['DB', 'OPENAI', 'AWS'];
    withA(ez(t, k3.dev.w[8], 0.4), () => { ctx.save(); ctx.strokeStyle = A.bone; ctx.lineWidth = 7; ctx.beginPath(); ctx.arc(rx, ry, 46, 0, Math.PI * 2); ctx.stroke(); ctx.restore();
      names.forEach((n, i) => { const a = -0.5 + i * 0.5; key(rx + Math.sin(a) * 46, ry + Math.cos(a) * 30, V(240, 200), a * 0.7 + swing(t, k3.dev.w[8] + i * 0.1, 0.18), { bits: [0.4, 0.7 - i * 0.2, 0.3, 0.8, 0.5], tag: { lines: [n], size: 28, rot: -0.9 + i * 0.25 } }); }); });
    withA(ez(t, k3.dev.w[14], 0.4), () => lab('keep them safe', V(rx - 120, L), V(780, 1000), 32, A.orange, 'left'));
    clipCard(t, 'railway-text', L, V(600, 1180), V(1100, W - 2 * L), { at: k3.env.w[0] - 0.3, crop: [172, 214], cropX: [134, 842], hlAt: k3.env.w[0], creditSize: 30 });
  }, { id: 'env' });
  cue('shutter', k3.env.w[0] - 0.3, -4); cue('marker', k3.env.w[0], -4); cue('type', k3.env.w[0] + 0.1, -10); cue('fall', k3.dev.w[8], -6);

  /* ---------- 25. deploys paused; revoke and change ---------- */
  const k4 = { pau: P('So Railway paused deployments for a while'), me: P('this even affected me'), ask: P('and they asked their users to revoke and change their API keys and cloud keys') };
  const tRev = k4.ask.w[6], tChg = k4.ask.w[8];
  addScene(k4.pau.t - 0.1, 'bone', 'paused', (t) => {
    // a generic deploy button that goes grey
    const bx = L, by = V(200, 470), bw = V(520, 520), bh = 110; const pz = ez(t, k4.pau.w[2] + 0.1, 0.35);
    grp('deploy button', bx, by, bw, bh, () => { fillRR(bx, by, bw, bh, 14, pz > 0.5 ? A.panelB : A.ink); txt(pz > 0.5 ? 'Deploys paused' : 'Deploy', bx + bw / 2, by + 72, F.body(46, 800), pz > 0.5 ? A.midB : A.bone, 'center', 'alphabetic', 0, pz > 0.5 ? 'paused label' : 'deploy label'); });
    if (pz > 0.5) arrowCursor(bx + bw * 0.7, by + bh * 0.55, 1.2);
    withA(ez(t, k4.me.w[2], 0.4), () => txt('(this one affected me too)', bx, by + bh + 70, F.body(V(40, 40), 600), A.orangeT, 'left', 'alphabetic', 0, 'affected me'));
    if (!PORTRAIT || t < tRev - 0.4) clipCard(t, 'rlb-paused', V(760, L), V(200, 720), V(1050, W - 2 * L), { at: k4.pau.w[2], crop: [30, 110], cropX: [0, 893], hlAt: k4.pau.w[3], pad: 18, creditSize: 30 });
    // revoke and change: the keys come off the rail; new ones go on
    const rx = V(760, 100), ry = V(560, 960), rw = V(1050, 880); const names = ['API KEY', 'CLOUD KEY', 'API KEY'];
    withA(ez(t, k4.ask.w[0], 0.4), () => { const xs = rail(rx, ry, rw, 3);
      xs.forEach((hx, i) => { const out = ez(t, tRev + i * 0.1, 0.5, 'inOutQuart'), inn = ez(t, tChg + 0.15 + i * 0.12, 0.45); const tag = { lines: [names[i]], size: 26, rot: -1.1 };
        if (out < 1) withA(1 - out, () => key(hx + 12, ry + 34 + out * 500, V(230, 230), swing(t, k4.ask.w[0] + i * 0.1, 0.25) + out * 0.7, { bits: [0.3, 0.8 - i * 0.2, 0.4, 0.6, 0.3], tag }));
        if (inn > 0) withA(Math.min(1, inn * 2), () => key(hx + 12, ry + 34 - (1 - inn) * 80, V(230, 230), swing(t, tChg + 0.15 + i * 0.12, 0.3), { fill: A.orange, bits: [0.7, 0.2, 0.6, 0.3, 0.8], tag: { lines: ['NEW'], size: 26, rot: -1.1 } })); }); });
    withA(ez(t, tRev, 0.3), () => txt('revoke', V(L, L), V(800, 1400), F.disp(V(96, 90)), A.ink, 'left', 'alphabetic', 0, 'revoke'));
    withA(ez(t, tChg, 0.3), () => txt('+ change', V(L, L + 330), V(910, 1400), F.disp(V(96, 90)), A.orangeT, 'left', 'alphabetic', 0, 'change'));
  }, { id: 'paused' });
  cue('tick', k4.pau.w[2] + 0.1, -2); cue('marker', k4.pau.w[3], -6); cue('pop', k4.me.w[2], -6); cue('fall', tRev + 0.2, -2); cue('pop', tChg + 0.3, -4);

  /* ---------- 26. how did they get in? not said yet ---------- */
  const k5 = { still: P("There's still no full details from Railway on how the attackers got in") };
  addScene(k5.still.t - 0.1, 'night', 'unknown', (t) => {
    const dx = V(1300, 380), dy = V(180, 560), dw = V(360, 320), dh = V(600, 520);
    door(dx, dy, dw, dh, 0.25 * ez(t, k5.still.w[8], 0.8), { col: A.panelN, leaf: '#3A3028', light: A.orange });
    withA(ez(t, k5.still.w[4], 0.35, 'outBack'), () => _txt('?', dx + dw * 0.5, dy + dh * 0.62, F.disp(V(300, 260)), A.orange, 'center'));
    KT(t, { lines: V(['how did they', 'get in?'], ['how did they get in?']), x: L, y: V(330, 1260), size: V(130, 96), times: [k5.still.t + 0.1, k5.still.t + 0.25, k5.still.w[10], k5.still.w[11], k5.still.w[12]], col: A.bone });
    withA(ez(t, k5.still.w[3], 0.4), () => lab('no full details yet', L, V(560, 1360), 34, A.orange));
    const up = ez(t, k5.still.w[8], 0.45); if (up > 0) { const cx = L, cy = V(640, 380), cw = V(1060, W - 2 * L), ch = V(230, 160);
      grp('update card', cx, cy, cw, ch, () => withA(up, () => { strokeRR(cx, cy, cw, ch, 12, A.midN, 3);
        lab('Update, 22 Oct (Railway’s preliminary report)', cx + 28, cy + 50, 28, A.orange, 'left', { maxW: cw - 56, key: 'update head' });
        txtW('In through its build system, then CI credentials. At most 1.85% of workspaces. The exact exploit is not public yet.', cx + 28, cy + V(100, 96), F.body(V(32, 28), 600), A.bone, cw - 56, V(40, 34), 0, 'update body'); })); }
  }, { id: 'unknown' });
  cue('door', k5.still.w[8], -4);

  /* ---------- 27. a series of attacks, aimed at AI companies ---------- */
  const k6 = { ser: P("They did say however, that it's part of a series of attacks on platforms like theirs"), goal: P('with the goal of getting to AI companies') };
  addScene(k6.ser.t - 0.1, 'bone', 'series', (t) => {
    KT(t, { lines: V(['a series of attacks'], ['a series', 'of attacks']), x: L, y: V(200, 480), size: V(110, 110), times: [k6.ser.w[7], k6.ser.w[8], k6.ser.w[9], k6.ser.w[10]], col: A.ink });
    // platforms (three tiles) -> AI companies
    const px = L, py = V(330, 700), pw = V(300, 270), ph = V(130, 120);
    ['platform', 'platform', 'platform'].forEach((s, i) => { const p = ez(t, k6.ser.w[9] + i * 0.15, 0.4); if (p <= 0) return; const x = V(px, px + i * (pw + 20)), y = V(py + i * (ph + 20), py);
      withA(p, () => { fillRR(x, y, pw, ph, 12, A.ink); txt(s, x + 26, y + ph * 0.6, F.body(40, 800), A.bone, 'left', 'alphabetic', 0, 'platform ' + i); }); });
    const ap = ez(t, k6.goal.w[4], 0.45); if (ap > 0) {
      const ax = V(px + pw + 260, L), ay = V(py + 40, py + ph + 150), aw = V(460, W - 2 * L), ah = V(330, 200);
      if (!PORTRAIT) [0, 1, 2].forEach(i => arrowR(px + pw + 20, py + i * (ph + 20) + ph / 2, ax - 20, ap, A.orangeT, 5, 18));
      else pline(CX, py + ph + 20, CX, ay - 16, ap, A.orangeT, 5);
      withA(ap, () => { fillRR(ax, ay, aw, ah, 14, A.orange); txt('AI companies', ax + 30, ay + V(110, 100), F.disp(V(72, 66)), A.ink, 'left', 'alphabetic', 0, 'ai companies'); lab('the goal', ax + 30, ay + ah - 34, 30, A.ink, 'left'); }); }
    clipCard(t, 'rlb-ai', V(L, L), V(800, 1210), V(1300, W - 2 * L), { at: k6.goal.w[0] - 0.2, crop: [98, 150], cropX: [20, 946], hlAt: k6.goal.w[4], pad: 18, creditSize: 30 });
  }, { id: 'series' });
  cue('place', k6.ser.w[12], -4); cue('swipe', k6.goal.w[4], -6); cue('marker', k6.goal.w[4] + 0.1, -6);

  /* ---------- 28. Zeabur: the platform that is shutting down (a wide storefront, the shutter comes down) ---------- */
  const k7 = { now: P('Now Zeabur, the company that is shutting down because of attacks'), int: P('is a very interesting one'), also: P('This is also another platform that developers use to deploy apps'), dec: P('and they are deciding to shut down completely') };
  addScene(k7.now.t - 0.1, 'night', 'zeabur', (t, lt) => {
    dayFrame(t, k7.now.t - 0.1, 14); dayHead(t, k7.now.t - 0.1, 14, 'WED', { name: 'Zeabur' });
    const sx = L, sy = V(330, 640), sw = W - 2 * L, sh = V(400, 420);
    withA(ez(t, k7.now.t - 0.3, 0.4), () => { rect(sx - 20, sy - 70, sw + 40, 70, A.orange); txt('ZEABUR', CX, sy - 18, F.disp(52), A.ink, 'center', 'alphabetic', 2, 'storefront');
      rect(sx, sy, sw, sh, '#0B0806');
      const n = V(5, 3); const tw_ = (sw - 40 - (n - 1) * 24) / n; for (let i = 0; i < n; i++) siteTile(sx + 20 + i * (tw_ + 24), sy + 30, tw_, sh - 60, 60 + i, ez(t, k7.now.w[6] + i * 0.6, 0.35), 0);
      const d = io(t, k7.dec.w[5], 1.0); if (d > 0) { rect(sx, sy, sw, sh * d, '#3A3028'); for (let y = sy + 20; y < sy + sh * d; y += 30) rect(sx, y, sw, 4, A.panelN); rect(sx, sy + sh * d - 16, sw, 16, A.midN); } });
    withA(ez(t, k7.also.w[7], 0.4), () => { lab('another platform where developers', sx, sy + sh + 56, 32, A.midN, 'left', { key: 'zeabur line 1' }); lab('deploy their apps', sx, sy + sh + 104, 32, A.midN, 'left', { key: 'zeabur line 2' }); });
    const cw = V(900, W - 2 * L); clipCard(t, 'zb-head', V(W - L - cw, L), V(sy + sh + 30, sy + sh + 150), cw, { at: k7.int.w[0], crop: [16, 318], pad: 0, creditSize: 30, rise: 30 });
  }, { id: 'zeabur' });
  cue('place', k7.now.t - 0.1, -6); cue('tick', k7.now.w[6], -8); cue('tick', k7.now.w[6] + 1.2, -10); cue('tape', k7.dec.w[5] + 0.6, -6); cue('shutter', k7.int.w[0], -4);
  /* ---------- 29. breached in August, again on the 14th and 15th ---------- */
  const k8 = { aug: P('They got breached in August'), oct: P('and on October 14th and 15th, they got breached again'), leak: P('which leaked internal credentials') };
  addScene(k8.aug.t - 0.1, 'bone', 'breaches', (t) => {
    const w = V(560, 440); const x1 = L, x2 = V(L + w + 80, L + 480), y = V(330, 600);
    miniMonth(t, k8.aug.t - 0.3, x1, y, w, 'AUGUST', 5, 31, { marks: [], key: 'august page' });
    withA(ez(t, k8.aug.w[3], 0.3), () => stamp(t, k8.aug.w[3], 'BREACHED', x1 + w / 2, y + V(300, 240), V(64, 50), A.orangeT, -0.12, 'stamp aug2'));
    miniMonth(t, k8.oct.w[1] - 0.2, x2, y, w, 'OCTOBER', 3, 31, { marks: [{ d: 14, at: k8.oct.w[2] }, { d: 15, at: k8.oct.w[4] }], key: 'october page' });
    KT(t, { lines: ['*again*'], x: V(x2 + w + 50, L), y: V(560, 1240), size: V(150, 130), times: [k8.oct.w[9]], col: A.ink, acc: A.orangeT });
    withA(ez(t, k8.leak.w[1], 0.4), () => lab('internal credentials leaked', V(x2 + w + 50, L), V(640, 1330), 32, A.ink, 'left', { maxW: V(300, 900) }));
  }, { id: 'breaches' });
  cue('page', k8.aug.t - 0.1, -4); cue('stamp', k8.aug.w[3], -2); cue('page', k8.oct.w[1] - 0.2, -6); cue('tap', k8.oct.w[2], -2); cue('tap', k8.oct.w[4], -4);

  /* ---------- 30. 321,810 accounts, 3.2 million records (orange) ---------- */
  const k9 = { sec: P('The second breach covered about 321,810 accounts'), env: P('and about 3.2 million environment variables records') };
  addScene(k9.sec.t - 0.1, 'oct', 'count', (t) => {
    lab('the second breach', L, V(118, 470), 34, g.mid);
    withA(ez(t, k9.sec.w[5] - 0.3, 0.25), () => countUp(t, k9.sec.w[5] - 0.2, 1.4, 0, 321810, L - 6, V(360, 660), V(220, 190), A.ink));
    withA(ez(t, k9.sec.w[6], 0.3), () => txt('accounts', L, V(440, 740), F.body(V(54, 52), 800), A.ink, 'left', 'alphabetic', 0, 'accounts'));
    withA(ez(t, k9.env.w[2] - 0.3, 0.3), () => { const v = lerp(0, 3.2, ez(t, k9.env.w[2] - 0.2, 1.2)); _txt(v.toFixed(1) + ' million', L - 6, V(640, 1000), F.disp(V(190, 160)), A.ink, 'left'); });
    withA(ez(t, k9.env.w[4], 0.3), () => txt('environment variable records', L, V(715, 1080), F.body(V(54, 46), 800), A.ink, 'left', 'alphabetic', 0, 'records'));
    clipCard(t, 'bczb-num', L, V(790, 1180), V(1700, W - 2 * L), { at: V(k9.sec.w[3], k9.env.w[6]), crop: V([90, 200], [140, 195]), cropX: V([0, 1756], [0, 1131]), hlOnly: V(null, [1, 2]), hlAt: V([k9.env.w[3], k9.sec.w[5], k9.sec.w[6]], k9.env.w[6] + 0.2), pad: 14, creditSize: 30, credit: g.mid });
  }, { id: 'count' });
  cue('tick', k9.sec.w[5], -2); cue('cash', k9.sec.w[5] + 1.2, -6); cue('tick', k9.env.w[2], -4); cue('shutter', V(k9.sec.w[3], k9.env.w[6]), -4);

  /* ---------- 31. how they got in again: the old admin key (B's keys + A's months) ---------- */
  const k10 = { how: P('So how did the attackers get in the second time'), acc: P('According to Zeabur, their admin token had no expiry date'), since: P('So they had not changed this token since January 2024'), chg: P('So after the first attack, when they changed their keys'), inc: P("they didn't include that particular set of tokens") };
  addScene(k10.how.t - 0.1, 'night', 'zeabur-keys', (t, lt) => {
    KT(t, { lines: V(['how did they get in *again*?'], ['how did they', 'get in *again*?']), x: L, y: V(170, 470), size: V(96, 92), times: [k10.how.t - 0.2, k10.how.w[3], k10.how.w[4], k10.how.w[6], k10.how.w[7], k10.how.w[8]], col: A.bone, acc: A.orange });
    const rx = V(L, 60), ry = V(280, 640), rw = V(1100, 960), n = 5; const names = ['AWS KEYS', 'GCP KEY', 'DATABASE', 'GITHUB APP', 'ADMIN'];
    const xs = rail(rx, ry, rw, n);
    const swapT = (i) => k10.chg.w[7] + i * 0.12;
    xs.forEach((hx, i) => { const hin = k10.how.t + 0.3 + i * 0.1; const admin = i === n - 1;
      withA(ez(t, hin, 0.3), () => lab(names[i], hx, ry - 34, V(28, 26), admin ? A.orange : A.midN, 'center', { key: 'peg ' + i, ls: 0.02 }));
      if (!admin) { const out = ez(t, swapT(i), 0.5, 'inOutQuart'), inn = ez(t, swapT(i) + 0.4, 0.45);
        if (out < 1 && t >= hin) withA(1 - out, () => key(hx + 12, ry + 34 + out * 600, V(300, 230), swing(t, hin, 0.26) - out * 0.5, { bits: [0.3, 0.8 - i * 0.1, 0.4, 0.6, 0.2 + i * 0.1] }));
        if (inn > 0) withA(Math.min(1, inn * 2), () => key(hx + 12, ry + 34 - (1 - inn) * 80, V(300, 230), swing(t, swapT(i) + 0.4, 0.3), { fill: A.midN, bits: [0.6, 0.3, 0.8 - i * 0.1, 0.4, 0.7] })); }
      else if (t >= hin) { const nudge = t >= k10.acc.w[3] ? swing(t, k10.acc.w[3], 0.14, 1.2) : 0;
        key(hx + 12, ry + 34, V(300, 230), swing(t, hin, 0.26) + nudge, { fill: A.orange, bits: [0.5, 0.5, 0.9, 0.2, 0.6],
 });
        // its tag, as a card beside the rail: admin token, since Jan 2024, no expiry
        const tp = ez(t, k10.acc.w[5], 0.4); if (tp > 0) { const cx = V(rx + rw + 60, L), cy = V(ry + 20, ry + 400), cw = V(420, 520), chh = 190;
          grp('admin tag', cx, cy, cw, chh, () => withA(tp, () => { fillRR(cx, cy, cw, chh, 12, A.card); circle(cx + 26, cy + 26, 8, A.ink);
            txt('ADMIN TOKEN', cx + 50, cy + 60, F.mono(34, 600), A.ink, 'left', 'alphabetic', 1, 'tag admin');
            withA(ez(t, k10.since.w[7], 0.3), () => txt('since Jan 2024', cx + 50, cy + 112, F.mono(34, 600), A.ink, 'left', 'alphabetic', 1, 'tag since'));
            withA(ez(t, k10.acc.w[7], 0.3), () => txt('no expiry', cx + 50, cy + 164, F.mono(34, 600), A.orangeT, 'left', 'alphabetic', 1, 'tag expiry')); })); }
        const pc = ez(t, k10.inc.w[2], 0.6); if (pc > 0) handCircle(hx + 12, ry + V(220, 180), V(140, 120), V(230, 190), pc, A.orange, 7, 5); } });
    withA(ez(t, k10.chg.w[7] + 0.9, 0.4), () => lab('changed after the first attack', rx, ry + V(480, 350), 30, A.midN, 'left'));
    // the months it stayed the same: Jan 2024 -> Oct 2026, a bar that never ends
    const mx = V(L, L), my = V(860, 1300), mw = V(1700, W - 2 * L), N = 34; const pb = ez(t, k10.since.w[7], 1.6, 'inOutQuart');
    if (pb > 0) { const cw = mw / N; for (let i = 0; i < N; i++) { const f = clamp(pb * N - i); if (f <= 0) break; rect(mx + i * cw + 1, my, cw * f - 2, 30, i === N - 1 ? A.orange : A.panelN); }
      withA(ez(t, k10.since.w[7], 0.3), () => lab('Jan 2024', mx, my + 74, 30, A.bone)); withA(ez(t, k10.since.w[7] + 1.4, 0.3), () => lab('Oct 2026: never changed', mx + mw, my + 74, 30, A.orange, 'right')); }
  }, { id: 'zeabur-keys' });
  cue('tick', k10.how.t + 0.4, -6); cue('tap', k10.acc.w[5], -2); cue('riser', k10.since.w[7] + 1.6, -4); cue('ding', k10.since.w[7] + 1.6, -6); cue('fall', k10.chg.w[7] + 0.2, -2); cue('pop', k10.chg.w[7] + 0.6, -6); cue('scribble', k10.inc.w[2], 0);

  /* ---------- 32. the gates open again ---------- */
  const k11 = { did: P("They didn't change those set"), gate: P('and that kind of opened the gates again'), now: P('and the old platform now is deciding to shut down') };
  addScene(k11.did.t - 0.1, 'night', 'gates', (t, lt) => { pushCam(lt, 8, 0.03, CX, H * 0.55);
    const dx = V(1260, 380), dy = V(180, 520), dw = V(380, 320), dh = V(620, 520);
    const op = io(t, k11.gate.w[4], 0.9); door(dx, dy, dw, dh, op, { col: A.panelN, leaf: '#3A3028', light: A.orange });
    if (op < 0.5) key(dx + dw - 60, dy + dh * 0.5 - 10, V(150, 130), -0.1 + swing(t, k11.did.t + 0.2, 0.15), { fill: A.orange });
    KT(t, { lines: V(['the gates', 'opened *again*'], ['the gates opened *again*']), x: L, y: V(330, 1180), size: V(130, 90), times: [k11.gate.w[4], k11.gate.w[5], k11.gate.w[6], k11.gate.w[7]], col: A.bone, acc: A.orange });
    clipCard(t, 'zeabur-quote', L, V(640, 1270), V(1060, W - 2 * L), { at: k11.did.w[2], crop: [154, 198], cropX: [0, 593], hlAt: k11.did.w[3], creditSize: 30 });
  }, { id: 'gates' });
  cue('door', k11.gate.w[4], -2); cue('shutter', k11.did.w[2], -6); cue('marker', k11.did.w[3], -6);

  /* ---------- 33. shut down by the end of December ---------- */
  const k12 = { pause: P('They will pause services and just shut everything down by the end of December'), cr: P('This is crazy') };
  addScene(k12.pause.t - 0.1, 'bone', 'december', (t) => {
    const w = V(620, 560); const x = V(1180, (W - 560) / 2), y = V(170, 760);
    miniMonth(t, k12.pause.t - 0.1, x, y, w, 'DECEMBER 2026', 1, 31, { marks: [{ d: 1, at: k12.pause.w[2], col: A.midB, fg: A.bone }, { d: 31, at: k12.pause.w[13] }], key: 'december page' });
    KT(t, { lines: V(['shut down by', 'the end of', '*December*'], ['shut down by', 'the end of *December*']), x: L, y: V(300, 470), size: V(120, 96), times: [k12.pause.w[5], k12.pause.w[6], k12.pause.w[9], k12.pause.w[10], k12.pause.w[11], k12.pause.w[12], k12.pause.w[13]], col: A.ink, acc: A.orangeT });
    withA(ez(t, k12.pause.w[2], 0.3), () => lab('Dec 1: services paused', L, V(720, 1380), 32, A.midB));
    withA(ez(t, k12.pause.w[13], 0.3), () => lab('Dec 31: everything off', L, V(780, 1430), 32, A.orangeT));
    clipCard(t, 'zb-dec', L, V(830, 0), V(980, 0), { at: PORTRAIT ? 1e9 : k12.pause.w[8], crop: [96, 154], cropX: [380, 1240], hlAt: k12.pause.w[12], pad: 0, creditSize: 30 });
  }, { id: 'december' });
  cue('page', k12.pause.t, -4); cue('tap', k12.pause.w[2], -4); cue('stamp', k12.pause.w[13], -2);
}
