/* Part 1: the month, PHP2Shell (0:00 - 2:55). Times come from her words (P / Q); "near" = seconds in the edited voice. */
'use strict';
/** a spoken phrase searched from about `near` seconds (edited voice time) */
function Q(q, near) { CUR = Math.max(0, WORDS.findIndex(w => w.t >= near + INTRO - 1.2)); return P(q); }
let FILLS = [];
function part1() {
  /* ---------- 1. the month fills up ---------- */
  const k1 = { lot: Q('A lot of things have been happening on the internet this month', 0), oct: P('October is supposed to be'), aw: P('Cybersecurity Awareness Month'), iro: P('and it has ironically been'), one: P('one attack after the other') };
  const fillT = [0, 0.16, 0.32, 0.48, 0.64, 0.8].map(x => k1.one.w[0] + x);
  FILLS = [[14, 'ZEABUR'], [15, 'ZEABUR'], [17, 'EMUDHRA'], [19, 'OPENCODE'], [21, 'PHP2SHELL'], [21, 'RAILWAY']].map(([d, label], i) => ({ d, label, at: fillT[i] }));
  addScene(0, 'oct', 'month', (t, lt) => {
    const pz = 1 + 0.04 * io(t, 3.0, 5.0); ctx.translate(CX, H * 0.55); ctx.scale(pz, pz); ctx.translate(-CX, -H * 0.55);
    withA(ez(t, -0.5, 0.4), () => lab('this month on the internet', L, V(80, 410), 32, g.mid));
    KT(t, { lines: ['October'], x: L, y: V(296, 716), size: V(180, 196), times: [k1.oct.w[0]], col: A.ink, blur: 10 });
    const pb = ez(t, k1.aw.w[0], 0.55, 'outExpo');
    if (pb > 0) { const bx = V(1160, L), by = V(196, 434), bw = V(650, W - 2 * L), bh = V(76, 66);
      grp('awareness banner', bx, by, bw, bh, () => { ctx.save(); ctx.beginPath(); ctx.rect(bx, by, bw * pb, bh); ctx.clip(); rect(bx, by, bw, bh, A.ink);
        txt('Cybersecurity Awareness Month', bx + 26, by + bh / 2 + 2, F.mono(V(33, 34), 500), A.bone, 'left', 'middle', 1.5); ctx.restore();
        handLine(bx, by + bh + V(16, 9), bw, ez(t, k1.iro.w[3] - 0.1, 0.6), A.ink, 7, 3); }); }
    withA(ez(t, k1.oct.w[0] + 0.2, 0.4), () => txt('2026', W - L, V(80, 410), F.mono(32, 500), g.mid, 'right', 'alphabetic', 2));
    month(t, { t0: -0.25, fills: FILLS });
    if (PORTRAIT) { let cur = null; FILLS.forEach(f => { if (t >= f.at) cur = f; });
      if (cur) { const p = ez(t, cur.at, 0.3); withA(p, () => _txt(cur.d + ' OCT  ' + cur.label, L, 1426 + 16 * (1 - p), F.disp(72), A.ink, 'left')); } }
  }, { id: 'month' });
  cue('slide', 0.4, -6); cue('thud', k1.oct.w[0], -3); cue('marker', k1.aw.w[0], -4); cue('scribble', k1.iro.w[3] - 0.1, -6);
  cue('place', fillT[0], -3); cue('tap', fillT[2], -2); cue('pop', fillT[4], -3);
  MOTION.expect('month: 14 fills', fillT[0] + 0.12, { el: 'month/day 14 label 0', aspect: '16x9' });

  /* ---------- 2. dive into the 21st: PHP ---------- */
  const k2 = { php: P('PHP, which is the language'), most: P('most of the websites in the world'), two: P('has had two critical security holes') };
  const tDive = k2.php.t - 0.6;
  addScene(tDive, 'night', 'php', (t) => {
    const p = io(t, tDive, 0.6);
    if (p < 1) { rect(0, 0, W, H, A.orange); g = G.oct; dive(p, 21, () => month(99, { labelA: 1 - p * 5, numFade: [21, 1 - (p - 0.45) * 3], fills: FILLS })); g = G.night; if (p < 0.98) return; }
    const t1 = tDive + 0.15;
    dayFrame(t, t1, 21); dayHead(t, t1, 21, 'WED');
    KT(t, { lines: ['PHP'], x: L - 8, y: V(660, 830), size: V(400, 360), times: [k2.php.t], col: A.bone, blur: 12 });
    wipeLines(t, k2.most.w[0], ['runs most of the', 'websites in the world'], L, V(812, 962), F.body(V(54, 52), 700), A.midN, 66, 0.6, 'most of the web');
    clipCard(t, 'php-head', V(840, L), V(380, 1080), V(970, W - 2 * L), { at: k2.two.w[0], cropX: [0, 1120], pad: 24 });
    withA(ez(t, k2.two.w[2], 0.35), () => { const y = V(640, 1330); txt('CVE-2026-109618', V(840, L), y, F.mono(34, 500), A.orange, 'left'); txt('CVE-2026-109619', V(1230, L + 450), y, F.mono(34, 500), A.orange, 'left'); });
    withA(ez(t, k2.two.w[3], 0.35), () => KT(t, { lines: ['two critical *holes*'], x: V(840, L), y: V(780, 1430), size: V(84, 80), times: [k2.two.w[2], k2.two.w[3], k2.two.w[5]], col: A.bone, acc: A.orange }));
  }, { id: 'php' });
  cue('swipe', tDive + 0.3, -4); cue('shutter', k2.two.w[0], -2); cue('thud', k2.two.w[5], -4);

  /* ---------- 3. same day: Railway, the keys come off the hook ---------- */
  const k3 = { rail: P('Railway, which is also a popular platform'), dev: P('among developers where we deploy apps'), tell: P('has had to literally tell their users to change their secret keys') };
  const tSwap = k3.tell.w[8];
  addScene(k3.rail.t - 0.12, 'night', 'railway', (t) => {
    dayFrame(t, -1, 21); dayHead(t, -1, 21, 'WED');
    KT(t, { lines: ['Railway'], x: L - 4, y: V(470, 700), size: V(210, 200), times: [k3.rail.t], col: A.bone });
    wipeLines(t, k3.dev.w[1], V(['where developers', 'deploy their apps'], ['where developers deploy apps']), L, V(560, 790), F.body(V(50, 48), 700), A.midN, 62, 0.6, 'dev');
    // the key rail: three keys hang; on "change their secret keys" they drop off and new ones swing in
    const rx = V(1080, 140), ry = V(300, 900), rw = V(700, 800); const xs = rail(rx, ry, rw, 3);
    xs.forEach((hx, i) => { const hin = k3.rail.t + 0.3 + i * 0.12; const pin = ez(t, hin, 0.4); if (pin <= 0) return;
      const out = ez(t, tSwap + i * 0.1, 0.5, 'inOutQuart'); const inn = ez(t, tSwap + 0.55 + i * 0.12, 0.45);
      if (out < 1) withA(1 - out, () => key(hx + 12, ry + 34 + out * 600, V(250, 240), swing(t, hin, 0.28) + out * 0.6, { bits: [0.3 + 0.1 * i, 0.8, 0.2, 0.6, 0.35] }));
      if (inn > 0) withA(Math.min(1, inn * 2), () => key(hx + 12, ry + 34 - (1 - inn) * 80, V(250, 240), swing(t, tSwap + 0.55 + i * 0.12, 0.3), { fill: A.orange, bits: [0.6, 0.3, 0.8 - i * 0.1, 0.4, 0.7] })); });
    withA(ez(t, tSwap + 0.9, 0.4), () => lab('new keys', rx + rw, ry - 50, 32, A.orange, 'right'));
    clipCard(t, 'railway-revoke', L, V(740, 1370), V(1700, W - 2 * L), { at: k3.tell.w[4], crop: V([40, 175], [84, 126]), cropX: V(null, [281, 1060]), hlAt: tSwap, hlOnly: V(null, [0]), creditSize: 30 });
  }, { id: 'railway' });
  cue('slide', k3.rail.t - 0.05, -6); cue('tick', k3.rail.t + 0.42, -6); cue('fall', tSwap + 0.2, -2); cue('pop', tSwap + 0.75, -4);

  /* ---------- 4. Zeabur: hacked twice, shutting down ---------- */
  const k4 = { also: P('There is also another platform, Zeabur,'), shut: P('that is literally shutting down after being hacked twice'), out: P("like they're literally checking out") };
  addScene(k4.also.t - 0.15, 'bone', 'zeabur-open', (t) => {
    dayFrame(t, k4.also.t - 0.15, 14); dayHead(t, k4.also.t - 0.1, 14, 'WED');
    KT(t, { lines: ['Zeabur'], x: L - 4, y: V(470, 700), size: V(210, 200), times: [k4.also.w[4]], col: A.ink });
    KT(t, { lines: V(['shutting down after', 'being *hacked twice*'], ['shutting down after', 'being *hacked twice*']), font: 'body', x: L, y: V(590, 800), size: V(60, 54), times: k4.shut.w.slice(3), col: A.ink, acc: A.orangeT });
    // the door closes on "shutting down"; two stamps: AUG and OCT
    const dx = V(1240, 600), dy = V(250, 960), dw = V(360, 300), dh = V(560, 440);
    const cl = io(t, k4.shut.w[3], 0.7); door(dx, dy, dw, dh, 1 - cl, { col: A.ink, leaf: A.panelB, light: A.orange });
    stamp(t, k4.shut.w[7], 'AUG', dx + dw * 0.5, dy + dh * 0.66, V(60, 52), A.orangeT, -0.14, 'stamp aug');
    stamp(t, k4.shut.w[8], 'OCT', dx + dw * 0.5, dy + dh * 0.84, V(60, 52), A.orangeT, 0.08, 'stamp oct');
    withA(ez(t, k4.out.w[3], 0.4), () => { const sx = dx + dw / 2, sy = dy + dh * 0.36; ctx.save(); ctx.translate(sx, sy); ctx.rotate(0.06 * swing(t, k4.out.w[3], 1, 0.9));
      pline(-70, -10, 0, -70, 1, A.ink, 3); pline(70, -10, 0, -70, 1, A.ink, 3); fillRR(-120, -10, 240, 90, 8, A.ink); txt('CLOSED', 0, 52, F.disp(52), A.orange, 'center', 'alphabetic', 1, 'closed sign'); ctx.restore(); });
  }, { id: 'zeabur-open' });
  cue('door', k4.shut.w[3] - 0.1, -6); cue('stamp', k4.shut.w[7], -2); cue('stamp', k4.shut.w[8], -4); cue('place', k4.out.w[3], -2);

  /* ---------- 5. a hacker with AI agents: 100+ sites ---------- */
  const k5 = { news: P('And there is news of another hacker'), ai: P('that has used AI agents'), brk: P('to break into more than a hundred companies') };
  addScene(k5.news.t - 0.1, 'night', 'agents-open', (t) => {
    const cols = V(12, 10), rows = V(10, 12), tw_ = V(76, 88), th_ = V(56, 52), gap = V(9, 8);
    const gx = V(W - L - cols * (tw_ + gap) + gap, (W - cols * (tw_ + gap)) / 2 + gap / 2), gy = V(170, 560);
    for (let i = 0; i < cols * rows; i++) { const c = i % cols, r = Math.floor(i / cols); const at = k5.news.t - 0.7 + (c + r) * 0.01;
      const TK = [5, 14, 27, 33, 46, 52, 63, 79, 86, 101, 113]; const hk = TK.indexOf(i); const hit = hk >= 0 ? k5.brk.w[3] + hk * 0.12 : 1e9;   // 11 of 120: 1 square = 10 sites tried, 100+ of 1,200+ (Reuters / TNW)
      siteTile(gx + c * (tw_ + gap), gy + r * (th_ + gap), tw_, th_, i, ez(t, at, 0.4), ez(t, hit, 0.25)); }
    const tx = V(L, L), ty = V(330, 470);
    KT(t, { lines: V(['one hacker', 'used', '*AI agents*'], ['one hacker used *AI agents*']), x: tx, y: ty, size: V(110, 84), times: [k5.news.t + 0.1, k5.news.t + 0.25, k5.ai.w[3], k5.ai.w[3], k5.ai.w[4]], col: A.bone, acc: A.orange });
    withA(ez(t, k5.brk.w[5], 0.4), () => { countUp(t, k5.brk.w[5], 1.2, 0, 100, V(L, L), V(900, 1400), V(190, 130), A.orange, 'left', (n) => n + (n >= 100 ? '+' : '')); });
    withA(ez(t, k5.brk.w[7], 0.4), () => lab('company websites broken into (of 1,200+ tried)', V(L, L + 300), V(960, 1350), 32, A.midN, 'left', { maxW: V(1000, 680) }));
    withA(ez(t, k5.brk.w[3], 0.4), () => lab('1 square = 10 sites tried', V(gx, L), V(gy - 24, gy - 24), 30, A.midN, 'left'));
  }, { id: 'agents-open' });
  cue('glitch', k5.ai.w[3], -6); cue('typeHit', k5.brk.w[3], -2); cue('tick', k5.brk.w[5] + 1.0, -4);

  /* ---------- 6. an overflow: the month again, the biggest one ---------- */
  const k6 = { ov: P("So it's been an overflow of attacks this month"), big: P('I believe the PHP one is the biggest one so far') };
  addScene(k6.ov.t - 0.1, 'oct', 'overflow', (t, lt) => {
    
    KT(t, { lines: V(['an *overflow* of attacks'], ['an *overflow*', 'of attacks']), x: L, y: V(250, 470), size: V(120, 140), times: [k6.ov.w[3], k6.ov.w[4], k6.ov.w[5], k6.ov.w[6]], col: A.ink, acc: A.cream });
    month(t, { fills: FILLS, ring: { d: 21, at: k6.big.w[6], col: A.bone } });
    withA(ez(t, k6.big.w[6] + 0.2, 0.4), () => { const [x, y, w, h] = cellRect(21); txt('PHP2Shell: the biggest one', V(W - L, L), V(120, 1430), F.disp(V(56, 64)), A.cream, V('right', 'left'), 'alphabetic', 0, 'the biggest'); });
  }, { id: 'overflow' });
  cue('thud', k6.ov.w[3], -6); cue('scribble', k6.big.w[6], -2);

  /* ---------- 7. PHP runs nearly three quarters of the web ---------- */
  const k7 = { runs: P('PHP runs nearly three quarters of the websites in the world'), wp: P('WordPress runs on PHP'), lv: P('Laravel runs on PHP'), me: P('I write Laravel at work'), most: P('Most of the web runs on PHP') };
  addScene(k7.runs.t - 0.12, 'bone', 'share', (t, lt) => { pushCam(lt, 8, 0.03, CX, H * 0.55);
    // 100 website tiles; nearly three quarters turn ink
    const n = 10, s = V(56, 52), gp = V(10, 8); const gx = V(1100, (W - n * (s + gp)) / 2), gy = V(250, 660);
    const gA = PORTRAIT ? 1 - ez(t, k7.wp.t - 0.3, 0.3) : 1;
    if (gA > 0) withA(gA, () => { for (let i = 0; i < 100; i++) { const c = i % n, r = Math.floor(i / n); const pin = ez(t, k7.runs.t - 0.7 + i * 0.003, 0.35); if (pin <= 0) continue;
      const on = i < 75 ? ez(t, k7.runs.w[2] + i * 0.012, 0.25) : 0;
      const hot = i < 75 ? ez(t, k7.most.w[4] + i * 0.01, 0.2) : 0;
      withA(pin, () => { rect(gx + c * (s + gp), gy + r * (s + gp), s, s, hot > 0.5 ? A.orange : on > 0.5 ? A.ink : A.panelB); if (on > 0 && on < 1) rect(gx + c * (s + gp), gy + r * (s + gp), s, s * on, A.ink); }); }
    withA(ez(t, k7.runs.w[5], 0.4), () => lab('each square: 1 in 100 websites', gx, gy + n * (s + gp) + 40, 32, A.midB, 'left')); });
    KT(t, { lines: V(['nearly', '*three quarters*', 'of the web'], ['nearly *three quarters*', 'of the web']), x: L, y: V(300, 520), size: V(110, 100), times: [k7.runs.t - 0.2, k7.runs.w[3], k7.runs.w[4], k7.runs.w[6], k7.runs.w[7], k7.runs.w[8]], col: A.ink, acc: A.orangeT });
    // what runs on it: a stack that builds on a PHP base (WordPress, Laravel, her)
    const bx = L, by = V(900, 1300), bw = V(820, W - 2 * L - 90), bh = V(86, 86);
    const layer = (i, s_, at, col, fg) => { const p = ez(t, at, 0.4); if (p <= 0) return; const y = by - i * (bh + 10);
      withA(p, () => { ctx.save(); ctx.translate(0, -30 * (1 - p)); fillRR(bx, y, bw, bh, 8, col); txt(s_, bx + 28, y + bh / 2 + 16, F.disp(48), fg, 'left', 'alphabetic', 0, 'layer ' + s_); ctx.restore(); }); };
    layer(0, 'PHP', k7.wp.w[3], A.ink, A.orange);
    withA(ez(t, k7.most.w[4], 0.3), () => { handLine(bx, by + bh + 22, bw, ez(t, k7.most.w[4], 0.6), A.orangeT, 7, 6); lab('most of the web runs on it', bx, by + bh + 74, 30, A.ink, 'left'); });
    if (t < k7.wp.t) return;
    layer(1, 'WordPress', k7.wp.w[0], A.panelB, A.ink);
    const pl = ez(t, k7.lv.w[0], 0.4); if (pl > 0) { const y = by - 2 * (bh + 10); withA(pl, () => { ctx.save(); ctx.translate(0, -30 * (1 - pl)); fillRR(bx, y, bw, bh, 8, A.orange); txt('Laravel', bx + 28, y + bh / 2 + 16, F.disp(48), A.ink, 'left', 'alphabetic', 0, 'layer Laravel'); ctx.restore(); }); }
    withA(ez(t, k7.me.w[2], 0.4), () => { const y = by - 2 * (bh + 10) + bh / 2; lab('← I write this at work', bx + bw - 20, y + 12, 32, A.ink, 'right', { key: 'me at work' });
      const cp = ez(t, k7.me.w[3], 0.3); circle(bx + bw + 46, y, 30, A.ink); if (cp > 0) { ctx.save(); ctx.strokeStyle = A.orange; ctx.lineWidth = 7; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(bx + bw + 32, y); ctx.lineTo(bx + bw + 32 + 10 * Math.min(1, cp * 2), y + 10 * Math.min(1, cp * 2)); if (cp > 0.5) ctx.lineTo(bx + bw + 42 + 16 * (cp - 0.5) * 2, y + 10 - 22 * (cp - 0.5) * 2); ctx.stroke(); ctx.restore(); } });
  }, { id: 'share' });
  cue('tick', k7.runs.w[2], -6); cue('place', k7.wp.w[0], -4); cue('place', k7.lv.w[0], -2); cue('marker', k7.me.w[2], -4);

  /* ---------- 8. two loopholes: PHP2Shell ---------- */
  const k8 = { two: P('And two critical loopholes have been found in PHP this month'), call: P("They're calling it the PHP2Shell") };
  addScene(k8.two.t - 0.1, 'night', 'found', (t) => {
    dayFrame(t, k8.two.t - 0.1, 21); dayHead(t, k8.two.t, 21, 'WED');
    // a PHP block with two holes punched in it
    const bx = V(L, L), by = V(330, 640), bw = V(980, W - 2 * L), bh = V(380, 360);
    grp('php block', bx, by, bw, bh, () => { withA(ez(t, k8.two.t - 0.4, 0.4), () => { fillRR(bx, by, bw, bh, 16, A.panelN); txt('PHP', bx + 50, by + bh * 0.72, F.disp(V(240, 220)), A.bone, 'left', 'alphabetic', 0, 'php word'); });
      [[0.74, 0.34, k8.two.w[1]], [0.86, 0.66, k8.two.w[2]]].forEach(([fx, fy, at], i) => { const p = ez(t, at, 0.3, 'outBack'); if (p <= 0) return; const r = V(54, 48) * p;
        circle(bx + bw * fx, by + bh * fy, r, A.ink); ctx.save(); ctx.strokeStyle = A.orange; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(bx + bw * fx, by + bh * fy, r, 0, Math.PI * 2); ctx.stroke(); ctx.restore(); }); });
    withA(ez(t, k8.two.w[1], 0.35), () => lab('2 critical holes', bx, by + bh + 60, 32, A.midN));
    KT(t, { lines: ['PHP2Shell'], x: V(1150, L), y: V(560, 1260), size: V(170, 170), times: [k8.call.w[4]], col: A.orange, blur: 14, fitW: V(700, W - 2 * L) });
    withA(ez(t, k8.call.w[0], 0.35), () => lab("they're calling it", V(1154, L), V(400, 1100), 32, A.midN));
  }, { id: 'found' });
  cue('pop', k8.two.w[1], -2); cue('pop', k8.two.w[2], -3); cue('thud', k8.call.w[4], -2);

  /* ---------- 9. a shell: their commands on your server ---------- */
  const k9 = { sh: P('And the shell part of the name is actually very important'), get: P('Getting a shell means that the attack is so bad'), type: P('that an attacker can type commands on your server'), pc: P('as if they were on their own personal computer') };
  addScene(k9.sh.t - 0.12, 'night', 'shell', (t, lt) => { pushCam(lt, 8, 0.03, CX, H * 0.55);
    dayFrame(t, k9.sh.t - 0.12, 21);
    KT(t, { lines: ['PHP2Shell'], x: L, y: V(250, 520), size: V(110, 130), times: [k9.sh.w[2]], col: A.bone });
    withA(ez(t, k9.sh.w[8], 0.4), () => handLine(L + tw('PHP2', F.disp(V(110, 130))), V(272, 548), tw('SHELL', F.disp(V(110, 130))), ez(t, k9.sh.w[8], 0.5), A.orange, 7, 2));
    KT(t, { lines: V(['type commands', 'on *your server*'], ['type commands', 'on *your server*']), font: 'body', x: L, y: V(430, 680), size: V(64, 64), times: [k9.type.w[4], k9.type.w[5], k9.type.w[6], k9.type.w[7], k9.type.w[8]], col: A.bone, acc: A.orange });
    const tx = V(840, L), ty = V(330, 840), tW = V(970, W - 2 * L), tH = V(470, 470);
    withA(ez(t, k9.get.t, 0.45), () => terminal(t, tx, ty + 30 * (1 - ez(t, k9.get.t, 0.45)), tW, tH, 'your-server', [
      { s: 'whoami', at: k9.type.w[4] }, { pre: '', s: 'www-data', at: k9.type.w[4] + 0.6, col: A.midN }, { s: 'ls /var/www', at: k9.type.w[7] }, { pre: '', s: 'index.php  config.php  uploads/', at: k9.type.w[7] + 0.8, col: A.midN, cps: 60 }, { s: 'cat config.php', at: k9.pc.w[1] }, { pre: '', s: '(their eyes on your files)', at: k9.pc.w[5], col: A.orange, cps: 40 }, { s: '', at: k9.pc.e + 0.6, caretTo: 1e9 }]));
    KT(t, { lines: V(['as if it were', '*their own* computer'], ['as if it were *their own* computer']), font: 'body', x: L, y: V(680, 1400), size: V(56, 44), times: [k9.pc.w[1], k9.pc.w[2], k9.pc.w[3], k9.pc.w[5], k9.pc.w[6], k9.pc.w[8]], col: A.bone, acc: A.orange });
  }, { id: 'shell' });
  cue('marker', k9.sh.w[8], -6); cue('type', k9.type.w[4], -6); cue('type', k9.type.w[7], -8); cue('tick', k9.pc.w[5], -6);

  /* ---------- 10. 9.2 out of 10 (orange punchline) ---------- */
  const k10 = { rate: P('PHP has rated this 9.2 out of 10'), bad: P('so it is really terrible') };
  addScene(k10.rate.t - 0.1, 'oct', 'score', (t) => {
    lab('severity, out of 10', L, V(180, 520), 34, g.mid);
    const v = lerp(0, 9.2, ez(t, k10.rate.w[4] - 0.3, 1.0)); _txt(v.toFixed(1), L - 10, V(640, 880), F.disp(V(440, 360)), A.ink, 'left');
    const mx = V(1000, L), my = V(330, 930), mw = V(800, W - 2 * L), mh = V(200, 130);
    for (let i = 0; i < 10; i++) { const on = clamp(v - i); const cw = (mw - 9 * 10) / 10; const x = mx + i * (cw + 10);
      strokeR(x, my, cw, mh, A.ink, 4); if (on > 0) rect(x, my + mh * (1 - on), cw, mh * on, A.ink); }
    withA(ez(t, k10.bad.w[3], 0.3), () => KT(t, { lines: ['really *terrible*'], x: V(1000, L), y: V(680, 1190), size: V(100, 96), times: [k10.bad.w[3], k10.bad.w[4]], col: A.ink, acc: A.cream }));
    clipCard(t, 'dr-92', V(1000, L), V(780, 1240), V(800, W - 2 * L), { at: k10.rate.w[5], crop: [94, 146], cropX: [494, 1383], hlAt: k10.rate.w[5] + 0.2, pad: 18, creditSize: 30, credit: g.mid });
  }, { id: 'score' });
  cue('riser', k10.rate.w[4] + 0.6, -6); cue('hit', k10.rate.w[4] + 0.7, -2); cue('thud', k10.bad.w[4], -4);
}
