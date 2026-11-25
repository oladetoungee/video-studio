/* Part 2: how PHP2Shell works, who tried it, the fix (1:16 - 2:55). */
'use strict';
function part2() {
  /* ---------- 11. bug 1: memory ---------- */
  const k = { two: Q('Now there are two bugs reported', 75), mem: P('The first one is about memory'), out: P('So if PHP runs out of memory at a very specific moment'), read: P("while it's reading a request"), left: P('it leaves some unfinished data behind') };
  const REQ = 'POST /login HTTP/1.1';
  addScene(k.two.t - 0.1, 'bone', 'bug1', (t, lt) => {
    pushCam(lt, 11, 0.02);
    // two numbered bugs; the first one opens up
    [['01', 'memory', k.mem.w[5]], ['02', 'leftovers', 1e9]].forEach(([n, s, at], i) => { const p = ez(t, k.two.t - 0.3 + i * 0.12, 0.4); if (p <= 0) return;
      withA(p, () => { const x = L + i * V(330, 300), y = V(200, 470); _txt(n, x, y, F.disp(V(80, 80)), i === 0 ? A.orangeT : A.midB, 'left');
        withA(ez(t, at, 0.35), () => txt(s, x + V(100, 100), y - 8, F.body(V(46, 44), 800), A.ink, 'left', 'alphabetic', 0, 'bug name ' + n)); }); });
    hline(L, V(240, 510), W - 2 * L, ez(t, k.two.t, 0.6, 'outExpo'), A.ruleB, 2);
    // the request is read into memory, cell by cell; it runs out at a very specific moment
    const cells = 12, mx = L, my = V(470, 860), mw = W - 2 * L, ch = V(120, 110), gp = 8, cw = (mw - (cells - 1) * gp) / cells;
    withA(ez(t, k.out.t - 0.2, 0.4), () => { lab('PHP memory', mx, my - 26, 32, A.midB, 'left');
      for (let i = 0; i < cells; i++) strokeR(mx + i * (cw + gp), my, cw, ch, A.ink, 3); });
    const fillP = clamp((t - k.out.w[3]) / Math.max(0.5, k.read.e - k.out.w[3])); const nFull = Math.floor(fillP * cells);
    for (let i = 0; i < cells; i++) { const f = clamp(fillP * cells - i); if (f <= 0) continue; const x = mx + i * (cw + gp);
      const broken = t > k.left.w[4] && i >= cells - 3; rect(x + 6, my + 6, (cw - 12) * (broken ? 0.55 : f), ch - 12, broken ? A.orange : A.ink); }
    // the incoming request, typed in above the memory
    withA(ez(t, k.read.w[3] - 0.3, 0.3), () => { lab('incoming request', mx, V(380, 720), 32, A.midB, 'left');
      typeText(t, k.read.w[3], REQ, mx + V(380, 0), V(380, 780), F.mono(V(40, 38), 600), A.ink, { cps: 18, key: 'request line' }); });
    const oom = ez(t, k.out.w[4] + 0.1, 0.3); if (oom > 0 && t < k.left.w[1] + 0.2) withA(oom, () => stamp(t, k.out.w[4] + 0.1, 'OUT OF MEMORY', V(W - L - 330, CX), V(my + ch + 110, my + ch + 120), V(64, 60), A.orangeT, -0.06, 'stamp oom'));
    withA(ez(t, k.left.w[4], 0.4), () => { const x = mx + (cells - 3) * (cw + gp); hline(x, my + ch + 34, 3 * (cw + gp) - gp, 1, A.orangeT, 4);
      txt('unfinished data, left behind', x + 3 * (cw + gp) - gp, my + ch + 90, F.body(V(44, 40), 800), A.orangeT, 'right', 'alphabetic', 0, 'unfinished'); });
  }, { id: 'bug1' });
  cue('pop', k.two.t - 0.1, -4); cue('tick', k.mem.w[5], -2); cue('type', k.read.w[3], -8); cue('error', k.out.w[4] + 0.1, -6); cue('glitch', k.left.w[4], -6);

  /* ---------- 12. bug 1: the cleanup code believes it ---------- */
  const k2 = { then: P("then it's cleanup code treats that broken data like it's real"), run: P('and an attacker can use it to run their own commands') };
  addScene(k2.then.t - 0.1, 'bone', 'bug1b', (t, lt) => {
    const cells = 5, mx = V(L, L), my = V(330, 560), cw = V(170, 160), ch = V(120, 110), gp = 10;
    lab('after the request', mx, my - 30, 32, A.midB);
    for (let i = 0; i < cells; i++) { const x = mx + i * (cw + gp); const broken = i >= 2; strokeR(x, my, cw, ch, A.ink, 3); rect(x + 6, my + 6, (cw - 12) * (broken ? 0.55 : 1), ch - 12, broken ? A.orange : A.ink); }
    // the cleanup pass: a bar sweeps over the cells, and the broken ones get a tick (treated as real)
    const sw = io(t, k2.then.w[3], 1.2); if (sw > 0 && sw < 1) rect(mx + sw * (cells * (cw + gp)) - 6, my - 12, 12, ch + 24, A.ink);
    for (let i = 2; i < cells; i++) { const at = k2.then.w[3] + 1.2 * (i + 0.5) / cells; const p = ez(t, at, 0.3); if (p <= 0) continue; const x = mx + i * (cw + gp);
      withA(p, () => { circle(x + cw - 24, my + 24, 20, A.ink); ctx.save(); ctx.strokeStyle = A.bone; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(x + cw - 34, my + 24); ctx.lineTo(x + cw - 26, my + 32); ctx.lineTo(x + cw - 13, my + 15); ctx.stroke(); ctx.restore(); }); }
    KT(t, { lines: V(['the cleanup code', 'treats it as *real*'], ['the cleanup code', 'treats it as *real*']), font: 'body', x: mx, y: my + ch + V(110, 120), size: V(66, 60), times: [k2.then.w[1], k2.then.w[2], k2.then.w[3], k2.then.w[4], k2.then.w[6], k2.then.w[8], k2.then.w[10]], col: A.ink, acc: A.orangeT });
    const tx = V(1060, L), ty = V(330, 1020), tW = V(750, W - 2 * L), tH = V(300, 300);
    withA(ez(t, k2.run.w[2], 0.4), () => terminal(t, tx, ty, tW, tH, 'your-server', [{ s: "attacker's own command", at: k2.run.w[6], cps: 30, col: A.orange }, { s: '', at: k2.run.e + 0.4, caretTo: 1e9 }], { key: 'terminal 2' }));
    withA(ez(t, k2.run.w[6], 0.3), () => lab('runs on your server', tx, ty + tH + 60, 32, A.orangeT));
  }, { id: 'bug1b' });
  cue('swipe', k2.then.w[3] + 0.6, -10); cue('check', k2.then.w[10], -2); cue('type', k2.run.w[6], -8);

  /* ---------- 13. bug 2: leftovers on PHP workers ---------- */
  const k3 = { sec: P('The second bug is more about leftover information'), stuff: P('like leftover stuff on PHP workers from previous requests'), away: P('that it should have thrown away') };
  addScene(k3.sec.t - 0.1, 'bone', 'bug2', (t) => {
    _txt('02', L, V(200, 470), F.disp(80), A.orangeT, 'left'); txt('leftovers', L + 100, V(192, 462), F.body(V(46, 44), 800), A.ink, 'left', 'alphabetic', 0, 'bug name 02b');
    hline(L, V(240, 510), W - 2 * L, 1, A.ruleB, 2);
    const n = 3, wx = L, wy = V(340, 640), ww = V((W - 2 * L - 2 * 50) / 3, W - 2 * L), wh = V(420, 220), gx = V(ww + 50, 0), gy = V(0, wh + 40);
    for (let i = 0; i < n; i++) { const x = wx + i * gx, y = wy + i * gy; const p = ez(t, k3.sec.w[2] + i * 0.12, 0.4); if (p <= 0) continue;
      withA(p, () => { strokeR(x, y, ww, wh, A.ink, 4); lab('PHP worker ' + (i + 1), x + 24, y + 54, 32, A.midB, 'left', { key: 'worker ' + i });
        // a previous request passes through and leaves a scrap behind
        const ra = k3.stuff.w[6] + i * 0.25; const pr = io(t, ra, 1.0); const rx = x + 24 + (ww - 48 - V(200, 300)) * pr;
        if (pr < 1 && pr > 0) withA(1 - Math.max(0, pr - 0.8) * 5, () => { fillRR(rx, y + wh / 2 - 30, V(200, 300), 60, 8, A.ink); _txt('request', rx + 20, y + wh / 2 + 12, F.mono(32, 500), A.bone, 'left'); });
        const sc = ez(t, ra + 0.5, 0.3, 'outBack'); if (sc > 0) withA(clamp(sc), () => { const sw_ = 200, sh_ = 70; fillRR(x + ww - sw_ - 30, y + wh - sh_ - 26, sw_, sh_, 8, A.orange); themeFixed(() => _txt('leftover', x + ww - 30 - sw_ / 2, y + wh - 26 - sh_ / 2 + 11, F.mono(30, 600), A.inkFix, 'center')); });
      }); }
    withA(ez(t, k3.away.w[4], 0.4), () => { const y = V(870, 1400); KT(t, { lines: ['should have been *thrown away*'], font: 'body', x: L, y, size: V(60, 50), times: [k3.away.w[2], k3.away.w[3], k3.away.w[3], k3.away.w[4], k3.away.w[5]], col: A.ink, acc: A.orangeT }); });
  }, { id: 'bug2' });
  cue('place', k3.stuff.w[4], -4); cue('slide', k3.stuff.w[6] + 0.3, -6); cue('pop', k3.stuff.w[6] + 0.5, -4); cue('marker', k3.away.w[4], -4);

  /* ---------- 14. not random bugs: already tried (centred: the real headline is the picture) ---------- */
  const k4 = { not: P('Now these are not just random bugs'), huge: P('These are huge loopholes that people have already tried to exploit') };
  addScene(k4.not.t - 0.1, 'night', 'exploit', (t, lt) => {
    KT(t, { lines: V(['not just *random* bugs'], ['not just', '*random* bugs']), x: CX, align: 'center', y: V(250, 560), size: V(130, 130), times: [k4.not.t - 0.2, k4.not.w[3], k4.not.w[4], k4.not.w[5]], col: A.bone, acc: A.midN });
    const rw = tw('RANDOM', F.disp(V(130, 130))); const rx = V(CX - tw('NOT JUST RANDOM BUGS', F.disp(130)) / 2 + tw('NOT JUST ', F.disp(130)), CX - tw('RANDOM BUGS', F.disp(130)) / 2);
    strikeBar(rx, V(250, 680) - V(44, 44), rw, ez(t, k4.huge.w[2], 0.35), A.orange, 14);
    const cw = V(1700, W - 2 * L), cx = CX - cw / 2, cy = V(380, 760);
    const ch = clipCard(t, 'thn-head', cx, cy, cw, { at: k4.not.t - 0.3, crop: [10, 240], pad: 24 });
    if (ch.h) handLine(cx + 28, cy + clipH('thn-head', cw, { crop: [10, 240], pad: 24 }) + 10, cw - 56, ez(t, k4.huge.w[9], 0.6), A.orange, 8, 4);
    KT(t, { lines: V(['huge loopholes people already *tried to exploit*'], ['huge loopholes', 'people already', '*tried to exploit*']), font: 'body', x: CX, align: 'center', y: V(790, 1180), size: V(64, 62), times: [k4.huge.w[2], k4.huge.w[3], k4.huge.w[5], k4.huge.w[7], k4.huge.w[8], k4.huge.w[9], k4.huge.w[10]], col: A.bone, acc: A.orange });
  }, { id: 'exploit' });
  cue('stamp', k4.huge.w[2], -6); cue('shutter', k4.not.t - 0.1, -2); cue('scribble', k4.huge.w[9], -6);
  /* ---------- 15. before your code even runs ---------- */
  const k5 = { thing: P('The thing about PHP2Shell'), why: P("and why it's really so crazy"), bef: P('it happens before your code even runs'), reads: P('So PHP reads the incoming request first'), hole: P('and this loophole is in that reading part'), log: P('So your login, your middleware, your authentication'), nob: P('nobody stands a chance') };
  addScene(k5.thing.t - 0.1, 'night', 'before', (t, lt) => {
    dayFrame(t, k5.thing.t - 0.1, 21); dayHead(t, k5.thing.t, 21, 'WED', { name: 'PHP2Shell' }); pushCam(lt, 18, 0.05, CX, H * 0.55);   // the day's frame stays put; its content pushes in
    KT(t, { lines: ['why it’s', 'so *crazy*'], x: L, y: V(410, 680), size: V(150, 128), times: [k5.why.w[1], k5.why.w[2], k5.why.w[4], k5.why.w[5]], col: A.bone, acc: A.orange, out: k5.bef.w[2] - 0.05 });
    KT(t, { lines: ['before', 'your code', 'even *runs*'], x: L, y: V(410, 680), size: V(150, 128), times: k5.bef.w.slice(2), col: A.bone, acc: A.orange });
    const ev = [['a request comes in', k5.reads.w[3]], ['PHP reads it', k5.reads.w[2]], ['your login', k5.log.w[2]], ['your middleware', k5.log.w[4]], ['your authentication', k5.log.w[6]]];
    const x0 = V(980, L), y0 = V(170, 1010), rh = V(104, 80), rw = V(830, W - 2 * L), gut = 130;
    ev.forEach(([s, at], i) => { const p = ez(t, Math.min(at, k5.bef.w[5] + 0.1 + i * 0.09), 0.4); if (p <= 0) return; const y = y0 + i * rh;
      const hole = i === 1; const ph = hole ? ez(t, k5.hole.w[2], 0.35) : 0; const dead = i >= 2 ? ez(t, k5.nob.w[0] + (i - 2) * 0.12, 0.5) : 0;
      withA(p, () => { lab(['FIRST', 'THEN', 'THEN', 'THEN', 'LAST'][i], x0, y + rh / 2 + 12, 30, A.midN, 'left', { key: 'step ' + i });
        const bx = x0 + gut, bw = rw - gut; fillRR(bx, y + 6, bw, rh - 12, 8, A.panelN); if (ph > 0) fillRR(bx, y + 6, bw * ph, rh - 12, 8, A.orange);
        withA(1 - dead * 0.6, () => txt(s, bx + 28, y + rh / 2 + 15, F.body(V(44, 40), 700), ph > 0.5 ? A.ink : A.bone, 'left'));
        if (dead > 0) strikeBar(bx + 28, y + rh / 2 + 1, tw(s, F.body(V(44, 40), 700)), dead, A.orange, 6);
        if (hole && ph > 0.6) lab('the hole', bx + bw - 24, y + rh / 2 + 12, 30, A.ink, 'right', { w: 600 }); }); });
    // the quote arrives after the blocks (critic round 2: one focal point at a time)
    clipCard(t, 'php-quote', L, V(740, 1460), V(1700, W - 2 * L), { at: k5.log.w[0] - 0.2, crop: V([124, 215], [168, 212]), cropX: V(null, [370, 789]), hlAt: k5.log.w[1], creditSize: 30 });
  }, { id: 'before' });
  cue('thud', k5.bef.w[5], -4); cue('marker', k5.hole.w[2], -4); cue('shutter', k5.log.w[0] - 0.2, -6); cue('error', k5.nob.w[0], -8);

  /* ---------- 16. the best login in the world: the request slips under the door ---------- */
  const k6 = { best: P('You can have the best login in the world'), mat: P("and it wouldn't matter") };
  addScene(k6.best.t - 0.1, 'bone', 'login', (t) => {
    KT(t, { lines: V(['the best login', 'in the world'], ['the best login', 'in the world']), x: L, y: V(260, 520), size: V(120, 116), times: [k6.best.w[3], k6.best.w[4], k6.best.w[5], k6.best.w[6], k6.best.w[7], k6.best.w[8]], col: A.ink });
    const dx = V(1260, 640), dy = V(170, 720), dw = V(360, 300), dh = V(640, 460);
    door(dx, dy, dw, dh, 0, { col: A.ink, leaf: A.panelB });
    // three big padlocks on the door
    [0.25, 0.45, 0.65].forEach((fy, i) => { const p = ez(t, k6.best.w[4] + i * 0.15, 0.3, 'outBack'); if (p > 0) withA(clamp(p), () => withT(dx + dw * 0.3, dy + dh * fy, p, 0, () => padlock(0, 0, 60, A.ink, { hole: A.panelB }))); });
    // the request slides UNDER the door, before any lock
    const pr = io(t, k6.mat.w[0], 1.6); const ax = lerp(V(L, L), dx + dw + 140, pr), ay = dy + dh + 20;
    rect(V(L, L), ay + 26, W - 2 * L, 4, A.ink);
    if (pr > 0) { fillRR(ax - 210, ay - 34, 200, 56, 8, A.orange); _txt('request', ax - 110, ay + 6, F.mono(32, 600), A.ink, 'center'); }
    withA(ez(t, k6.mat.w[2], 0.4), () => KT(t, { lines: ["*wouldn't matter*"], x: L, y: V(560, 1400), size: V(110, 100), times: [k6.mat.w[1], k6.mat.w[2]], col: A.ink, acc: A.orangeT }));
  }, { id: 'login' });
  cue('check', k6.best.w[4], -4); cue('check', k6.best.w[4] + 0.3, -6); cue('slide', k6.mat.w[0] + 0.6, -2);

  /* ---------- 17. Amazon's honeypot: four days early ---------- */
  const k7 = { am: P('Even Amazon has reported that someone tried to use it'), hp: P('on one of their honeypot servers,'), trap: P('which is basically a trap server set up to catch attackers'), four: P('just four days before it was even announced') };
  addScene(k7.am.t - 0.1, 'bone', 'amazon', (t) => {
    clipCard(t, 'aws-head', L, V(130, 420), V(1100, W - 2 * L), { at: k7.am.w[1], crop: [30, 213], pad: 22, creditSize: 30 });
    // the trap: a server in a cage (a honeypot)
    const sx = V(1350, 330), sy = V(170, 700), sw = V(300, 300), sh = V(330, 280);
    withA(ez(t, k7.hp.w[4], 0.4), () => { server(sx, sy, sw, sh, { units: 3, lit: [A.orange, '#4A4038', A.orange] }); lab('honeypot', sx, sy + sh + 50, 32, A.midB); });
    const cage = ez(t, k7.trap.w[4], 0.5); if (cage > 0) { for (let i = 0; i <= 6; i++) { const x = sx - 40 + i * (sw + 80) / 6; rect(x - 3, sy - 40, 6, (sh + 70) * cage, A.ink); } rect(sx - 40, sy - 46, (sw + 80) * cage, 10, A.ink); }
    withA(ez(t, k7.trap.w[8], 0.4), () => lab('a trap set up to catch attackers', V(1350, 670), V(600, 760), 30, A.ink, 'left', { maxW: V(460, 340) }));
    // five days of October: 17 marked, 21 announced, 4 days between
    const dx = L, dy = V(720, 1250), dw = V(150, 160), dh = V(150, 120);
    for (let i = 0; i < 5; i++) { const d = 17 + i; const p = ez(t, k7.four.w[0] + i * 0.08, 0.35); if (p <= 0) continue; const x = dx + i * (dw + 12);
      withA(p, () => { strokeR(x, dy, dw, dh, A.ink, 3); const mk = d === 17 ? ez(t, k7.four.w[1], 0.3) : d === 21 ? ez(t, k7.four.w[5] + 0.1, 0.3) : 0;
        if (mk > 0) rect(x + 3, dy + 3, dw - 6, (dh - 6) * mk, d === 17 ? A.orange : A.ink);
        _txt(String(d), x + 16, dy + 64, F.disp(56), d === 21 && mk > 0.5 ? A.orange : A.ink, 'left'); }); }
    withA(ez(t, k7.four.w[1], 0.3), () => lab('first attempt', dx, dy + dh + 46, 30, A.ink));
    withA(ez(t, k7.four.w[5] + 0.1, 0.3), () => lab('announced', dx + 4 * (dw + 12), dy + dh + 46, 30, A.ink));
    withA(ez(t, k7.four.w[1] + 0.3, 0.4), () => { const x1 = dx + dw / 2, x2 = dx + 4 * (dw + 12) + dw / 2; ctx.save(); ctx.strokeStyle = A.orangeT; ctx.lineWidth = 5; ctx.beginPath();
      const pp = ez(t, k7.four.w[1] + 0.3, 0.8); for (let i = 0; i <= 40 * pp; i++) { const u = i / 40; const x = lerp(x1, x2, u), y = dy - 20 - Math.sin(u * Math.PI) * 70; i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke(); ctx.restore();
      withA(pp, () => txt('4 days early', (x1 + x2) / 2, dy - 106, F.disp(56), A.orangeT, 'center', 'alphabetic', 0, '4 days early')); });
  }, { id: 'amazon' });
  cue('shutter', k7.am.w[1], -2); cue('tick', k7.hp.w[4], -4); cue('place', k7.trap.w[4], -4); cue('tap', k7.four.w[1], -2); cue('scribble', k7.four.w[1] + 0.3, -6);

  /* ---------- 18. government sites switched off ---------- */
  const k8 = { gov: P('And there are government websites in Europe'), off: P('that literally went off while they patched'), dr: P('because of all of this drama') };
  addScene(k8.gov.t - 0.1, 'night', 'offline', (t) => {
    clipCard(t, 'ib-head', L, V(140, 420), V(1300, W - 2 * L), { at: k8.gov.t - 0.3, pad: 20, crop: [20, 300], creditSize: 30 });
    const n = V(6, 6), cols = V(6, 3), sw = V(250, 270), sh = V(170, 170), gp = V(28, 30); const gx = L, gy = V(560, 820);
    for (let i = 0; i < n; i++) { const c = i % cols, r = Math.floor(i / cols); const x = gx + c * (sw + gp), y = gy + r * (sh + gp);
      const p = ez(t, k8.gov.w[2] + i * 0.08, 0.35); if (p <= 0) continue; const off = ez(t, k8.off.w[2] + i * 0.16, 0.25);
      withA(p, () => { siteTile(x, y, sw, sh, 40 + i, 1, 0); strokeRR(x, y, sw, sh, 6, 'rgba(239,231,216,0.4)', 3); if (off > 0) { withA(off, () => { fillRR(x, y, sw, sh, 6, '#0B0806'); strokeRR(x, y, sw, sh, 6, A.panelN, 3); lab('offline', x + sw / 2, y + sh / 2 + 12, 30, A.orange, 'center', { key: 'offline ' + i }); }); } }); }
    withA(ez(t, k8.gov.w[3], 0.4), () => lab('government websites in Europe', gx, gy - 34, 32, A.midN));
    withA(ez(t, k8.off.w[6], 0.4), () => lab('taken offline as a precaution: no breach reported', gx, gy + V(2, 3) * (sh + gp) + V(30, 34), 30, A.midN, 'left', { maxW: W - 2 * L }));
    withA(ez(t, k8.off.w[6], 0.4), () => KT(t, { lines: ['switched off to *patch*'], x: L, y: V(930, 1300), size: V(110, 90), times: [k8.off.w[3], k8.off.w[3], k8.off.w[6], k8.off.w[6]], col: A.bone, acc: A.orange }));
  }, { id: 'offline' });
  cue('shutter', k8.gov.t - 0.1, -4); cue('tick', k8.off.w[2], -2); cue('tick', k8.off.w[2] + 0.48, -6); cue('glitch', k8.dr.w[3], -10);

  /* ---------- 19. the fix: the day's to-do ---------- */
  const k9 = { any: P("So basically if you're running PHP anywhere"), upd: P('you have to update your PHP'), old: P("If you're still on PHP 8.1 or older"), upg: P('you need to upgrade'), pkg: P('and updating the package is not even enough'), rest: P('You have to restart your Apache'), dock: P('and if you use Docker, you have to rebuild your images') };
  addScene(k9.any.t - 0.1, 'bone', 'fix', (t) => {
    dayFrame(t, k9.any.t - 0.1, 21); dayHead(t, k9.any.t - 0.1, 21, 'WED', { name: 'to do today' });
    KT(t, { lines: ['Update your PHP'], x: L, y: V(360, 690), size: V(130, 120), times: k9.upd.w.slice(3), col: A.ink });
    const cx = L, cy = V(420, 770), cw = V(1000, W - 2 * L), chh = V(380, 300);
    grp('code card', cx, cy, cw, chh, () => { withA(ez(t, k9.any.w[5], 0.4), () => {
      fillRR(cx, cy, cw, chh, 18, A.ink);
      txt('# fixed versions', cx + 50, cy + 78, F.mono(34, 500), A.midN, 'left');
      ['8.5.12', '8.4.27', '8.3.36', '8.2.35'].forEach((v, i) => { const at = k9.upd.w[4] + i * 0.12; withA(ez(t, at, 0.3), () => {
        const vx = PORTRAIT ? cx + 50 + (i % 2) * 450 : cx + 50 + i * 235, vy = PORTRAIT ? cy + 160 + Math.floor(i / 2) * 70 : cy + 180;
        txt(v, vx, vy, F.mono(V(52, 56), 600), A.orange, 'left'); }); });
      txt('php -v', cx + 50, cy + V(300, 280), F.mono(40, 500), A.bone, 'left');
      if (!PORTRAIT) txt('# check what you’re running', cx + 260, cy + 300, F.mono(32, 400), A.midN, 'left');
    }); });
    if (!PORTRAIT) clipCard(t, 'php-versions', cx, cy + chh + V(40, 40), V(1000, W - 2 * L), { at: k9.upd.w[5] + 0.4, crop: [36, 100], cropX: [0, 986], hlAt: k9.upd.w[5] + 0.7, pad: 18, creditSize: 30 });
    const todo = [['On 8.1 or older? Upgrade', k9.upg.w[3]], ['Update the package', k9.pkg.w[2]], ['Restart Apache / PHP-FPM', k9.rest.w[4]], ['Rebuild your Docker images', k9.dock.w[8]]];
    const tx = V(1170, L), ty = V(470, 1120), th = V(120, 76);
    todo.forEach(([s, at], i) => { const p = ez(t, at - 0.3, 0.4); if (p <= 0) return; const y = ty + i * th;
      withA(p, () => { const bs = V(56, 44); strokeR(tx, y, bs, bs, A.ink, 4); const pk = ez(t, at, 0.3); if (pk > 0) rect(tx + 9, y + 9, (bs - 18) * pk, bs - 18, A.orange);
        txt(s, tx + bs + 26, y + bs * 0.75, F.body(V(40, 36), 700), A.ink, 'left', 'alphabetic', 0, 'todo ' + i);
        if (i === 1) { const no = ez(t, k9.pkg.w[5], 0.4); if (no > 0) { strikeBar(tx + bs + 26, y + bs * 0.5, tw(s, F.body(V(40, 36), 700)), no, A.orangeT, 6); withA(no, () => lab('not enough', tx + bs + 40 + tw(s, F.body(V(40, 36), 700)), y + bs * 0.72, 30, A.orangeT)); } } }); });
  }, { id: 'fix' });
  cue('type', k9.upd.w[4], -8); cue('check', k9.upg.w[3], -2); cue('check', k9.pkg.w[2], -4); cue('error', k9.pkg.w[5], -10); cue('check', k9.rest.w[4], -2); cue('check', k9.dock.w[8], -4);

  /* ---------- 20. Laravel won't save you: the hole is underneath ---------- */
  const k10 = { ev: P('Everyone has been patching'), lv: P("and if you're using Laravel for example, your Laravel version doesn't even protect you here"), und: P('because the loophole is in PHP which is underneath Laravel') };
  addScene(k10.ev.t - 0.1, 'night', 'laravel', (t) => {
    KT(t, { lines: V(['your Laravel version', "doesn't *protect* you"], ['your Laravel', 'version', "doesn't *protect* you"]), font: 'body', x: L, y: V(230, 520), size: V(72, 66), times: [k10.lv.w[6], k10.lv.w[7], k10.lv.w[8], k10.lv.w[9], k10.lv.w[11], k10.lv.w[12]], col: A.bone, acc: A.orange });
    withA(ez(t, k10.ev.t, 0.4), () => lab('everyone has been patching', L, V(120, 420), 32, A.midN));
    const bx = V(L, L), bw = V(1100, W - 2 * L), bh = V(150, 140), by = V(560, 860);
    const pl = ez(t, k10.ev.t - 0.3, 0.4); if (pl > 0) withA(pl, () => { fillRR(bx, by, bw, bh, 10, A.orange); txt('Laravel', bx + 34, by + bh * 0.66, F.disp(72), A.ink, 'left', 'alphabetic', 0, 'stack laravel'); lab('your app', bx + bw - 30, by + bh * 0.6, 30, A.ink, 'right'); });
    const pp = ez(t, k10.und.w[4], 0.4); if (pp > 0) withA(pp, () => { const y = by + bh + 14; fillRR(bx, y, bw, bh, 10, A.panelN); txt('PHP', bx + 34, y + bh * 0.66, F.disp(72), A.bone, 'left', 'alphabetic', 0, 'stack php');
      // the crack in the PHP layer
      const cp = ez(t, k10.und.w[3] + 0.1, 0.6); if (cp > 0) { ctx.save(); ctx.strokeStyle = A.orange; ctx.lineWidth = 7; ctx.lineJoin = 'round'; ctx.beginPath(); const pts = [[0.55, 0], [0.6, 0.35], [0.56, 0.55], [0.63, 1]];
        pts.forEach(([fx, fy], i) => { const q = clamp(cp * 3 - i); if (i === 0) ctx.moveTo(bx + bw * fx, y + bh * fy); else if (q > 0) ctx.lineTo(bx + bw * lerp(pts[i - 1][0], fx, q), y + bh * lerp(pts[i - 1][1], fy, q)); }); ctx.stroke(); ctx.restore();
        withA(cp, () => lab('the hole is here', bx + bw * 0.66, y + bh * 0.62, 30, A.orange, 'left')); } });
    withA(ez(t, k10.und.w[7], 0.4), () => lab('↑ underneath Laravel', bx, by + 2 * bh + 70, 32, A.midN));
  }, { id: 'laravel' });
  cue('place', k10.ev.t - 0.1, -4); cue('place', k10.und.w[4], -4); cue('glitch', k10.und.w[3] + 0.1, -8);

  /* ---------- 21. Node.js the same day (top / bottom split) ---------- */
  const k11 = { not: P("And it's not even just PHP"), node: P('Node.js also had its own security release on that same day'), run: P('So if you run Node, you need to update that too') };
  addScene(k11.not.t - 0.1, 'night', 'node', (t, lt) => {
    dayFrame(t, k11.not.t - 0.1, 21); dayHead(t, k11.not.t - 0.1, 21, 'WED', { name: 'same day' });
    const bw = V((W - 2 * L - 30) / 2, W - 2 * L), bh = V(170, 150), by = V(300, 600);
    [['PHP2Shell', k11.not.t, A.panelN, A.bone, 'PHP'], ['Node.js', k11.node.w[0], A.orange, A.ink, 'security release']].forEach(([s, at, bg, fg, sub_], i) => { const p = ez(t, at, 0.45); if (p <= 0) return;
      const x = V(L + i * (bw + 30), L), y = V(by, by + i * (bh + 20));
      withA(p, () => { ctx.save(); ctx.translate(0, -30 * (1 - p)); fillRR(x, y, bw, bh, 12, bg); txt(s, x + 36, y + bh * 0.62, F.disp(V(96, 84)), fg, 'left', 'alphabetic', 0, 'same day ' + i);
        lab(sub_, x + bw - 30, y + bh - 28, 30, fg === A.ink ? A.ink : A.midN, 'right', { key: 'same day sub ' + i }); ctx.restore(); }); });
    const cw = V(1100, W - 2 * L), cy = V(520, 960);
    clipCard(t, 'node-head', CX - cw / 2, cy, cw, { at: k11.node.w[4], pad: 22, creditSize: 30 });
    withA(ez(t, k11.run.w[7], 0.4), () => { const x = V(CX - 330, L), y = V(870, 1330); strokeR(x, y, 56, 56, A.bone, 4); rect(x + 9, y + 9, 38 * ez(t, k11.run.w[8], 0.3), 38, A.orange);
      txt('Running Node? Update that too', x + 84, y + 42, F.body(V(42, 40), 700), A.bone, 'left', 'alphabetic', 0, 'node todo'); });
  }, { id: 'node' });
  cue('place', k11.not.t - 0.1, -6); cue('place', k11.node.w[0], -4); cue('shutter', k11.node.w[4], -4); cue('check', k11.run.w[8], -4);
}
