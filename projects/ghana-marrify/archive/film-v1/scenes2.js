/* Scenes, part 2: Estonia (0:51 - 1:40), then the drawbacks and consent (1:40 - 2:36).
 * Phase 1 (style frames): Estonia, everything online, the courthouse in 2003 vs a phone in three seconds. */
'use strict';

/** a courthouse glyph: pediment, four columns, steps (flat, one colour) */
function courthouse(x, y, w, col) {
  const h = w * 0.82; ctx.fillStyle = col;
  ctx.beginPath(); ctx.moveTo(x, y + h * 0.26); ctx.lineTo(x + w / 2, y); ctx.lineTo(x + w, y + h * 0.26); ctx.closePath(); ctx.fill();
  rect(x + w * 0.04, y + h * 0.29, w * 0.92, h * 0.07, col);
  for (let i = 0; i < 4; i++) rect(x + w * (0.12 + i * 0.22), y + h * 0.4, w * 0.1, h * 0.42, col);
  rect(x + w * 0.02, y + h * 0.84, w * 0.96, h * 0.07, col); rect(x - w * 0.04, y + h * 0.93, w * 1.08, h * 0.07, col);
  return h;
}

/** the list of things you can do online (her examples), with a chain that links them */
function onlineList(t, x, y, w, rows, o) {
  const rh = o.rowH, bs = o.box;
  const chainP = ease(t, o.chainT, 0.9, E.inOutCubic);
  if (chainP > 0) rect(x + bs / 2 - 2, y + bs / 2, 4, (rows.length - 1) * rh * chainP, C.ink);
  rows.forEach(([s, tin], i) => {
    const yy = y + i * rh; const p = ease(t, tin, 0.4);
    if (p <= 0) { strokeR(x, yy, bs, bs, C.line, 3); return; }
    withA(clamp(p * 2), () => {
      rect(x, yy, bs, bs, C.card); strokeR(x, yy, bs, bs, C.ink, 4); checkboxT(x, yy, bs, prog(t, tin + 0.25, 0.3), C.greenInk, C.card);
      typeText(t, tin, s, x + bs + 26, yy + bs * 0.74, F.body(o.size, 700), C.ink, { cps: 30, caretTo: tin + 0.5, key: 'online ' + s });
      if (o.tag) withA(ease(t, tin + 0.35, 0.3), () => mono('Online', x + w, yy + bs * 0.68, 22, C.greenInk, 'right', { ls: 0.2, fixed: true, key: 'online tag ' + i }));
    });
  });
}

function buildScenes2() {
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
  });

  /* ---------- 10 · Estonia, about a year (ink, green) ---------- */
  addS(S(k.est), 'ink', 'estonia', (t) => {
    const w = k.est.w, h = k.hub.w;
    KT(t, { lines: ["I've been living in"], font: 'body', x: L, y: V(250, 790), size: V(64, 60), times: w.slice(0, 4) });
    KR(t, { lines: ['*Estonia.*'], x: L - 8, y: V(480, 1000), size: V(250, 200), times: [w[4]] });
    withA(ease(t, w[6], 0.35), () => mono('About a year now', L, V(570, 1080), 30, g.fg, 'left', { ls: 0.22 }));
    flagIn(t, w[4] - 0.05, 'estonia', V(1420, L), V(150, 430), V(400, 360), { key: 'flag estonia big' });
    polaroidIn(t, w[8] - 0.1, IMG.her_estonia, V(1640, W - L - 170), V(700, 600), V(320, 300), 0.06, 'Me, in Estonia', { key: 'polaroid estonia' });
    KT(t, { lines: V(['People always say this place is', '~the digital hub of Europe~'], ['People always say', 'this place is', '~the digital hub~', '~of Europe~']), font: 'body', x: L, y: V(780, 1170), size: V(60, 56), lh: 1.18, times: [h[1], h[2], h[3], h[5], h[6], h[7], h[8], h[9], h[10], h[11], h[12]], ul: false });
    withA(ease(t, h[14], 0.35), () => mono('…or something like that', L, V(950, 1436), 26, g.mid, 'left', { ls: 0.2 }));
  }, { id: 'estonia', acc: 'green', push: 0.02 });
  sWh(k.est.w[4] - 0.1, -4); sPop(k.est.w[4] + 0.45, -3); sTick(k.est.w[6], -4); sPop(k.hub.w[9], -5);

  /* ---------- 11 · everything here is online (paper, green) ---------- */
  addS(S(k.lie), 'paper', 'online', (t) => {
    const nT = k.nothing.t - 0.05;
    beat(t, 0, nT, () => KT(t, { lines: V(["I'm not going to lie, it's ~so real.~"], ["I'm not going to lie,", "it's ~so real.~"]), font: 'body', x: L, y: V(210, 470), size: V(58, 58), t0: k.lie.w[1] - 0.06, stagger: 0.025 }));
    beat(t, nT, 1e9, () => KT(t, { lines: ["There's nothing you", "can't do online here."], font: 'body', x: L, y: V(190, 470), size: V(58, 58), lh: 1.15, times: [k.nothing.w[0], k.nothing.w[2], k.nothing.w[9], k.nothing.w[10], k.nothing.w[11], k.nothing.w[12]] }));
    KR(t, { lines: V(['Everything', 'is *online.*'], ['Everything', 'is *online.*']), x: L - 6, y: V(450, 680), size: V(170, 120), times: [k.every.w[0], k.every.w[8], k.every.w[9]] });
    withA(ease(t, k.exag.w[2], 0.3), () => mono("I'm not exaggerating", L, V(760, 845), 28, g.mid, 'left', { ls: 0.22 }));
    const rows = [['Health records', k.health.w[1]], ['Get married', k.married.w[3]], ['Divorce', k.divorce.w[2]], ['A link for everything', k.link.w[2]]];
    if (!PORTRAIT) {
      landing(t, S(k.lie) + 0.05, 1240, 170, { dy: 140, d: 0.6 }, (X, Y) => grp('phone', X, Y, 470, 760, () => phoneFrame(X, Y, 470, 760, (sx, sy, sw, sh) => {
        mono('Illustration', sx + 34, sy + 96, 18, C.mid, 'left', { ls: 0.2, fixed: true });
        rect(sx + 34, sy + 118, sw - 68, 3, C.ink);
        onlineList(t, sx + 34, sy + 160, sw - 68, rows, { rowH: 135, box: 50, size: 30, chainT: k.health.w[4] });
      })));
    } else {
      landing(t, S(k.lie) + 0.05, L, 880, { dy: 140, d: 0.6 }, (X, Y) => grp('phone', X, Y, 420, 560, () => phoneFrame(X, Y, 420, 560, (sx, sy, sw, sh) => {
        mono('Illustration', sx + 30, sy + 80, 18, C.mid, 'left', { ls: 0.2, fixed: true });
        rect(sx + 30, sy + 98, sw - 60, 3, C.ink);
        onlineList(t, sx + 30, sy + 130, sw - 60, rows, { rowH: 96, box: 44, size: 28, chainT: k.health.w[4] });
      })));
    }
  }, { id: 'online', acc: 'green' });
  sPen(k.lie.w[7] + 0.3, -4); sPop(k.every.w[9], -2); sCard(S(k.lie) + 0.05); sType(k.health.w[1], 14, 30); sTick(k.health.w[1] + 0.3, -2);
  sPen(k.health.w[4], -6); sType(k.married.w[3], 11, 30); sTick(k.married.w[3] + 0.3, -2); sType(k.divorce.w[2], 7, 30); sTick(k.divorce.w[2] + 0.3, -2); sType(k.link.w[2], 21, 30); sTick(k.link.w[2] + 0.3, -2);

  buildMid();

  /* ---------- 20 · consent: a courthouse in 2003 vs a phone in three seconds (paper, orange) ---------- */
  const c = PS({
    cons: "and there's also the consent part of the conversation",
    diff: 'like the difference between a divorce record sitting in a courthouse somewhere in 2003',
    ph: 'and somebody just being able to check it on their phone in three seconds right',
  });
  addS(S(c.cons), 'paper', 'consent', (t) => {
    const d = c.diff.w, p = c.ph.w;
    KR(t, { lines: ['The *consent* part.'], x: L - 4, y: V(210, 470), size: V(110, 100), times: c.cons.w.slice(3, 6) });
    // two mirrored halves: object on top, a numeral on one shared baseline, a caption on one shared baseline
    const lx = L, rx = V(1080, 600), numY = V(840, 1080), capY = V(945, 1140), numS = V(170, 120);
    const dim = 1 - 0.45 * ease(t, p[1] + 0.3, 0.5);
    withA(dim, () => {
      const fw = V(420, 400), fh = V(300, 290), fy = V(320, 600);
      landing(t, d[5], lx, fy, { dy: -120, r: -0.1, d: 0.55 }, (X, Y, R) => withT(X + fw / 2, Y + fh / 2, 1, -0.03 + R, () => grp('folder', -fw / 2, -fh / 2, fw, fh, () => folder(-fw / 2, -fh / 2, fw, fh, 'Divorce record', { labSize: V(24, 22) }))));
      KR(t, { lines: ['2003'], x: lx - 4, y: numY, size: numS, times: [d[13]], col: g.mid });
      withA(ease(t, d[10], 0.4), () => mono('In a courthouse, somewhere', lx, capY, 26, g.mid, 'left', { ls: 0.2, maxW: V(undefined, 420) }));
    });
    const dv = ease(t, p[0], 0.6, E.inOutCubic);
    if (PORTRAIT) rect(539, 580, 3, 620 * dv, C.line); else rect(959, 320, 3, 660 * dv, C.line);
    const phw = V(280, 330), phh = V(400, 390), phy = V(290, 575), s2 = phw / 290;
    landing(t, p[1], rx, phy, { dy: 160, d: 0.6 }, (X, Y) => grp('phone consent', X, Y, phw, phh, () => phoneFrame(X, Y, phw, phh, (sx, sy, sw, sh) => {
      rect(sx + 18, sy + 70 * s2, sw - 36, 50 * s2, C.card); strokeR(sx + 18, sy + 70 * s2, sw - 36, 50 * s2, C.ink, 3);
      typeText(t, p[6], 'A name', sx + 32, sy + 104 * s2, F.body(Math.round(24 * s2), 600), C.ink, { cps: 18, key: 'phone query', caretTo: p[12] });
      const rp = ease(t, p[12], 0.35); if (rp > 0) withA(rp, () => {
        const ry = sy + 140 * s2, rh = sh - 170 * s2; rect(sx + 18, ry, sw - 36, rh, C.card); strokeR(sx + 18, ry, sw - 36, rh, C.orange, 4);
        mono('Divorce record', sx + 34, ry + 40 * s2, Math.round(18 * s2), C.orange, 'left', { ls: 0.14, fixed: true });
        for (let i = 0; i < Math.min(4, Math.floor((rh - 90 * s2) / (40 * s2)) + 1); i++) rect(sx + 34, ry + (74 + i * 40) * s2, (sw - 90) * (0.9 - 0.15 * (i % 3)), 10 * s2, '#D3CCBF');
      });
    })));
    if (ease(t, p[12], 0.3) > 0) withA(ease(t, p[12], 0.3), () => {
      const v = counter(t, p[12], p[13] - p[12] + 0.25, 0, 3, rx - 4, numY, F.disp(numS), C.orange, 'left');
      mono('Seconds', rx + tw(String(v), F.disp(numS)) + 24, numY, 30, C.ink, 'left', { ls: 0.22 });
    });
    withA(ease(t, p[1], 0.3), () => mono('On their phone, today', rx, capY, 26, g.mid, 'left', { ls: 0.2, key: 'phone label', maxW: V(undefined, 400) }));
  }, { id: 'consent', acc: 'orange' });
  sPop(c.cons.w[4], -3); sCard(c.diff.w[5] + 0.1); sPop(c.diff.w[13], -2); sWh(c.ph.w[0], -6); sCard(c.ph.w[1]); sType(c.ph.w[6], 6, 18); sClick(c.ph.w[12] - 0.05); [0, 0.12, 0.24].forEach(dd => sTick(c.ph.w[12] + 0.1 + dd, -2)); sImp(c.ph.w[13] + 0.2, -10);
}
