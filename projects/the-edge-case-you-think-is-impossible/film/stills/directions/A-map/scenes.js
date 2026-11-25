/* A · HERE BE EDGE CASES. The edge of the map.
 * Her opening says it: "no way a user would navigate and navigate and navigate and end up in this kind of situation".
 * So the video is a sea chart. The happy path is the safe route across the middle of "your app"; every edge case is a
 * named place out at the edge of the chart (Cape Null, Leap Day Reef, O'Brien Point, Daylight Strait…), reached by a red
 * dashed route that wanders off the path. Real sources are pinned on as chart insets (with credits).
 * Sea #D6E5E1 (the ground), land buff #F4EAD0, ink #1F2523, ONE accent: route red #D8432B (only the routes users really take, the X, the key word).
 * Type: Alegreya SC 800 (place names, titles), Alegreya Sans 500/800 (sentences), IM Fell English italic (her own words),
 * Alegreya SC 500 letter-spaced (small chart labels). Thin graticule lines + a classic map neatline (bar border). */
'use strict';
const A = { paper: '#D6E5E1', ink: '#1F2523', mid: '#4C5A56', line: 'rgba(31,37,35,0.13)', red: '#D8432B', card: '#F4EAD0' };   // sea = pale chart blue-green, land = buff
G.chart = { bg: A.paper, fg: A.ink, mid: A.mid, line: A.line, acc: A.red, card: A.card, panel: '#E2D6B6', grid: A.line, mode: 'light' };
G.chart2 = { ...G.chart };
F.disp = (s) => `800 ${s}px "Alegreya SC"`;
F.body = (s, w = 500) => `${w} ${s}px "Alegreya Sans"`;
F.mono = (s, w = 500) => `500 ${s}px "Alegreya SC"`;
F.serif = (s) => `italic 400 ${s}px "IM Fell English"`;
LS.disp = 0.0; LS.mono = 0.14;

/** the chart's neatline: outer rule, inner rule, alternating bar scale between them */
function neatline(p = 1) {
  const o = V(34, 30), i = V(54, 48); const a = clamp(p);
  withA(a, () => {
    strokeR(o, o, W - 2 * o, H - 2 * o, A.ink, 4); strokeR(i, i, W - 2 * i, H - 2 * i, A.ink, 1.5);
    const step = 80; ctx.fillStyle = A.ink;
    for (let x = i, k = 0; x < W - i; x += step, k++) if (k % 2 === 0) { ctx.fillRect(x, o + 4, Math.min(step, W - i - x), i - o - 4); ctx.fillRect(x, H - i, Math.min(step, W - i - x), i - o - 4); }
    for (let y = i, k = 0; y < H - i; y += step, k++) if (k % 2 === 1) { ctx.fillRect(o + 4, y, i - o - 4, Math.min(step, H - i - y)); ctx.fillRect(W - i, y, i - o - 4, Math.min(step, H - i - y)); }
  });
}
/** graticule: thin latitude / longitude lines inside the neatline */
function graticule(p = 1) { withA(p, () => { const i = V(54, 48); ctx.fillStyle = A.line; for (let x = i + 240; x < W - i; x += 240) ctx.fillRect(x, i, 1, H - 2 * i); for (let y = i + 240; y < H - i; y += 240) ctx.fillRect(i, y, W - 2 * i, 1); }); }
/** a coastline (deterministic wobble) drawn up to p, with engraved water lines outside it */
function coastPts(cx, cy, rx, ry, seed, n = 120) {
  const pts = []; for (let k = 0; k <= n; k++) { const a = (k / n) * Math.PI * 2; const r = 1 + 0.11 * Math.sin(3 * a + seed) + 0.06 * Math.sin(7 * a + seed * 2.1) + 0.035 * Math.sin(15 * a + seed * 3.3); pts.push([cx + Math.cos(a) * rx * r, cy + Math.sin(a) * ry * r]); } return pts;
}
function coast(cx, cy, rx, ry, seed, p = 1, o = {}) {
  if (p <= 0) return; const pts = coastPts(cx, cy, rx, ry, seed); const m = Math.max(2, Math.round(pts.length * clamp(p)));
  if (p >= 1) { ctx.beginPath(); pts.forEach(([x, y], k) => (k ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.fillStyle = o.fill || A.card; ctx.fill(); }
  [[18, 0.30], [34, 0.18], [52, 0.10]].forEach(([d, al]) => { if (p < 1) return; ctx.save(); ctx.globalAlpha *= al; ctx.strokeStyle = A.ink; ctx.lineWidth = 1.6; ctx.beginPath();
    pts.forEach(([x, y], k) => { const dx = x - cx, dy = y - cy, L0 = Math.hypot(dx, dy) || 1; const X = x + dx / L0 * d, Y = y + dy / L0 * d; k ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); }); ctx.stroke(); ctx.restore(); });
  ctx.save(); ctx.strokeStyle = A.ink; ctx.lineWidth = o.lw || 3.5; ctx.lineJoin = 'round'; ctx.beginPath(); for (let k = 0; k < m; k++) { const [x, y] = pts[k]; k ? ctx.lineTo(x, y) : ctx.moveTo(x, y); } ctx.stroke(); ctx.restore();
}
/** a route through points, drawn up to the time of each leg (times[k] = when leg k starts; each leg takes d s) */
function route(t, pts, times, o = {}) {
  const col = o.col || A.red, d = o.d || 0.42; ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = o.lw || 7; ctx.lineCap = 'round'; ctx.setLineDash(o.dash || [2, 18]);
  let last = null;
  for (let k = 0; k < pts.length - 1; k++) { const p = ez(t, times[k], d, 'inOutQuart'); if (p <= 0) break; const [x0, y0] = pts[k], [x1, y1] = pts[k + 1];
    const mx = (x0 + x1) / 2 + (y1 - y0) * 0.18, my = (y0 + y1) / 2 - (x1 - x0) * 0.18; ctx.beginPath(); ctx.moveTo(x0, y0);
    const N = 30; for (let j = 1; j <= N * p; j++) { const u = j / N; const X = (1 - u) * (1 - u) * x0 + 2 * (1 - u) * u * mx + u * u * x1, Y = (1 - u) * (1 - u) * y0 + 2 * (1 - u) * u * my + u * u * y1; ctx.lineTo(X, Y); last = [X, Y]; }
    ctx.stroke(); }
  ctx.restore(); if (last && o.head !== false) circle(last[0], last[1], (o.lw || 7) * 1.1, col); return last;
}
/** the X that marks where users end up */
function xMark(t, t0, x, y, s = 34) { const p = ez(t, t0, 0.35, 'outBack'); if (p <= 0) return; withT(x, y, p, 0, () => { ctx.save(); ctx.strokeStyle = A.red; ctx.lineWidth = s * 0.32; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-s, -s); ctx.lineTo(s, s); ctx.moveTo(s, -s); ctx.lineTo(-s, s); ctx.stroke(); ctx.restore(); }); }
/** a small letter-spaced chart label */
function lab(s, x, y, size = 34, col = A.ink, align = 'left', key) { txt(s.toUpperCase(), x, y, F.mono(size), col, align, 'alphabetic', size * LS.mono, key); }
/** a place name in the big engraved caps, fading in */
function placeName(t, t0, s, x, y, size, align = 'left', col = A.ink) { withA(ez(t, t0, 0.4), () => txt(s, x, y + 14 * (1 - ez(t, t0, 0.5)), F.disp(size), col, align, 'alphabetic', size * 0.04)); }
/** a source inset pinned on the chart: ruled frame + crop + credit */
function inset(t, t0, key, x, y, w, o = {}) {
  const p = ez(t, t0, 0.5); if (p <= 0) return 0; let h = 0;
  withA(clamp(p * 1.6), () => { ctx.save(); ctx.translate(0, 26 * (1 - p)); const r = clipCard(t, key, x, y, w, { at: t0, hlAt: o.hlAt, hl: '#F2B9A8', pad: 16, sheet: '#FFFFFF', credit: A.mid, creditSize: V(24, 26), creditFont: (s) => F.mono(s), crop: o.crop, only: o.only, key: 'inset ' + key }); h = r.h;
    strokeR(x - 10, y - 10, w + 20, r.h - V(24, 26) * 1.9 + 20, A.ink, 2); ctx.restore(); });
  return h;
}
/** a small compass (north arrow), corner */
function north(x, y, s = 46) { ctx.save(); ctx.fillStyle = A.ink; ctx.beginPath(); ctx.moveTo(x, y - s); ctx.lineTo(x + s * 0.32, y + s * 0.3); ctx.lineTo(x, y + s * 0.08); ctx.closePath(); ctx.fill(); ctx.strokeStyle = A.ink; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x, y - s); ctx.lineTo(x - s * 0.32, y + s * 0.3); ctx.lineTo(x, y + s * 0.08); ctx.closePath(); ctx.stroke(); ctx.restore(); _txt('N', x, y - s - 12, F.disp(30), A.ink, 'center'); }
/** the chapter count, bottom-left, small */
function leg(n) { /* no counter: her no-HUD rule */ }

function buildFilm() {
  /* ---- the opening (2.18-12.6): the user navigates off the map ---- */
  addScene(2.0, 'chart', 'open', (t) => {
    rect(0, 0, W, H, A.paper);
    const push = 1 + 0.045 * io(t, 8.9, 3.6); const fx = V(1640, 760), fy = V(800, 1500);
    withT(fx, fy, push, 0, () => { ctx.translate(-fx, -fy);
      graticule(ez(t, 2.2, 0.6));
      const lx = V(700, CX), ly = V(640, 1060);
      coast(lx, ly, V(560, 400), V(300, 420), 1.7, ez(t, 2.18, 0.9, 'inOutQuart'));
      coast(V(1560, 860), V(300, 420), V(70, 60), V(44, 40), 4.2, ez(t, 3.0, 0.6));
      coast(V(1160, 240), V(980, 1760), V(60, 60), V(36, 40), 2.9, ez(t, 3.2, 0.6));
      withA(ez(t, 2.8, 0.4), () => lab('your app', lx, ly - V(150, 240), V(44, 46), A.ink, 'center'));
      // the happy path, a calm solid line across the land
      { const hp = ez(t, 3.3, 1.2, 'inOutQuart'); if (hp > 0) { ctx.save(); ctx.strokeStyle = A.ink; ctx.lineWidth = 5; ctx.beginPath(); const x0 = V(330, 300), x1 = V(1060, 780), y0 = ly + V(60, 120); for (let j = 0; j <= 40 * hp; j++) { const u = j / 40; const X = lerp(x0, x1, u), Y = y0 - Math.sin(u * Math.PI) * V(50, 80); j ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); } ctx.stroke(); ctx.restore(); }
        withA(ez(t, 4.2, 0.4), () => lab('the happy path', V(420, 330), ly + V(130, 200), V(34, 34), A.mid, 'left')); }
      // the user, then three turns off the path and out to the edge
      const pts = V([[600, 700], [880, 560], [1130, 790], [1380, 580], [1640, 800]], [[420, 1110], [720, 920], [380, 1320], [840, 1380], [760, 1560]]);
      withA(ez(t, 8.3, 0.3), () => { circle(pts[0][0], pts[0][1], 14, A.red); lab('the user', pts[0][0] - 10, pts[0][1] - V(30, 34), V(34, 34), A.red, 'right'); });
      route(t, pts, [8.9, 9.62, 10.36, 10.9], { d: 0.4 });
      xMark(t, 11.24, pts[4][0], pts[4][1], V(36, 40));
      withA(ez(t, 11.62, 0.5), () => txt('this kind of situation', V(pts[4][0] - 40, CX), V(pts[4][1] + 108, pts[4][1] + 130), F.serif(V(58, 64)), A.ink, V('right', 'center')));
      withA(ez(t, 6.0, 0.6), () => lab('here be edge cases', V(1660, 1000), V(760, 1800), V(34, 34), A.mid, 'center'));
      north(V(1770, 960), V(170, 230));
    });
    neatline(ez(t, 2.2, 0.5));
    // the title (outside the push)
    KT(t, { lines: ['Edge cases'], x: V(110, CX), y: V(250, 330), size: V(176, 168), font: 'disp', upper: false, align: V('left', 'center'), col: A.ink, times: [4.84, 4.96], blur: 8 });
    withA(ez(t, 7.5, 0.4) * (1 - ez(t, 8.8, 0.3)), () => txt('“there’s no way a user would…”', V(118, CX), V(340, 500), F.serif(V(60, 56)), A.ink, V('left', 'center')));
    withA(ez(t, 5.4, 0.5), () => txt('in the world', V(118 + tw('Edge cases', F.disp(176)) + 26, CX), V(250, 420), F.serif(V(64, 66)), A.red, V('left', 'center')));
  }, { id: 'open' });
  cue('paper', 2.2, -6); cue('pen', 2.45, -8); cue('hit', 4.86, -6); cue('pencil', 8.92, -6); cue('pencil2', 9.64, -6); cue('pencil', 10.38, -6); cue('stamp', 11.26, -3);

  /* ---- real users leave the happy path (44.2-66) ---- */
  addScene(44.1, 'chart2', 'users', (t) => {
    rect(0, 0, W, H, A.paper); graticule(); neatline();
    KT(t, { lines: ['Real users ~don’t~ always do that.'], x: V(110, 80), y: V(220, 300), size: V(84, 76), font: 'body', weight: 800, upper: false, col: A.ink, times: [44.3, 44.6, 44.9, 45.2, 45.6, 45.7], blur: 6, fitW: V(1700, 920) });
    const y0 = V(560, 900), x0 = V(150, 120), x1 = V(1300, 960);
    ctx.save(); ctx.strokeStyle = A.ink; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y0); ctx.stroke(); ctx.restore();
    [['fill the form', 0], ['click', 0.5], ['wait', 1]].forEach(([s, f], k) => { const x = lerp(x0 + 60, x1 - 40, f); circle(x, y0, 12, A.ink); lab(s, x, y0 + 56, V(30, 30), A.ink, 'center'); });
    const br = [['double-click', 51.0, V([380, 850], [260, 1260])], ['two tabs', 55.1, V([860, 880], [640, 1500])], ['network drops', 57.2, V([1560, 360], [360, 1700])], ['back 2 hours later', 59.6, V([1640, 780], [820, 1260])]];
    br.forEach(([s, at, end], k) => { const sx = lerp(x0 + 60, x1 - 40, [0.15, 0.45, 0.8, 0.95][k]);
      route(t, [[sx, y0], end], [at], { d: 0.45, lw: 6 }); xMark(t, at + 0.42, end[0], end[1], 26);
      withA(ez(t, at + 0.45, 0.35), () => lab(s, end[0], end[1] + 70, V(32, 32), A.red, 'center')); });
    leg(1);
  }, { id: 'users' });
  cue('pencil', 51.0, -6); cue('pencil2', 55.1, -6); cue('pencil', 57.2, -6); cue('pencil2', 59.6, -6);

  /* ---- Cape Null (255.2-270) ---- */
  addScene(255.1, 'chart', 'null', (t) => {
    rect(0, 0, W, H, A.paper); graticule(); neatline();
    const cx = V(1380, 700), cy = V(560, 560);
    coast(cx, cy, V(330, 280), V(250, 220), 5.1, 1);
    placeName(t, 255.6, 'Cape Null', V(cx, cx - 20), V(cy - 300, cy - 360), V(96, 92), 'center');
    lab('a licence plate in california', V(cx, cx - 20), V(cy - 236, cy - 300), V(34, 32), A.mid, 'center');
    // tickets drifting in to the cape, one by one
    const tk = [263.8, 264.1, 264.4, 264.7, 265.0, 265.3, 265.6]; tk.forEach((at, k) => { const p = ez(t, at, 0.45); if (p <= 0) return;
      const sx = V(260 + k * 120, 120 + k * 120), sy = V(980, 1180 + (k % 2) * 60); const ex = cx - 120 + (k % 4) * 70, ey = cy - 40 + Math.floor(k / 4) * 90 + (k % 2) * 16;
      withA(p, () => withT(lerp(sx, ex, p), lerp(sy, ey, p), 1, -0.08 + (k % 3) * 0.07, () => { rect(-38, -26, 76, 52, '#FFFFFF'); strokeR(-38, -26, 76, 52, A.ink, 2.5); rect(-28, -14, 40, 5, A.ink); rect(-28, -2, 56, 4, A.mid); rect(-28, 8, 30, 4, A.mid); })); });
    xMark(t, 260.4, cx, cy + 10, 40);
    KT(t, { lines: ['over *$12,000* in fines'], x: V(cx, CX), y: V(cy + 360, cy + 400), size: V(84, 84), font: 'disp', upper: false, align: 'center', col: A.ink, acc: A.red, times: [264.45, 264.73, 265.8, 266.1], blur: 6 });
    const iw = V(640, W - 200); inset(t, 256.2, 'wired-plate', V(120, 100), V(150, 1190), iw * 0.86);
    leg(4);
  }, { id: 'null' });
  cue('paper', 256.2, -6); cue('stamp', 260.4, -3); tk_cues();
  function tk_cues() { [263.8, 264.2, 264.6, 265.0].forEach((a, k) => cue(k % 2 ? 'card2' : 'card', a, -8)); }

  /* ---- Leap Day Reef (325.3-336) ---- */
  addScene(325.3, 'chart2', 'leap', (t) => {
    rect(0, 0, W, H, A.paper); graticule(); neatline();
    placeName(t, 325.5, 'Leap Day Reef', V(110, 80), V(220, 260), V(104, 96), 'left');
    // a chain of day islands: 26 27 28 | 1, and the 29 that the route aims for
    const days = ['26', '27', '28', '1']; const y = V(560, 820); const xs = V([260, 520, 780, 1500], [180, 400, 620, 900]);
    days.forEach((d, k) => { coast(xs[k], y, V(90, 80), V(66, 60), 1.3 + k, 1); _txt(d, xs[k], y + V(22, 20), F.disp(V(64, 58)), A.ink, 'center'); lab(k < 3 ? 'feb' : 'mar', xs[k], y + V(140, 130), V(32, 32), A.mid, 'center'); });
    const zx = V(1140, 540), zy = V(y + 40, 1180);
    withA(ez(t, 329.9, 0.4), () => { ctx.save(); ctx.setLineDash([10, 12]); ctx.strokeStyle = A.red; ctx.lineWidth = 4; ctx.beginPath(); coastPts(zx, zy, V(110, 100), V(78, 70), 9.9).forEach(([x, yy], k) => (k ? ctx.lineTo(x, yy) : ctx.moveTo(x, yy))); ctx.stroke(); ctx.restore();
      _txt('29', zx, zy + V(24, 22), F.disp(V(72, 66)), A.red, 'center'); lab('2012 + 1 year', zx, zy + V(150, 140), V(32, 32), A.red, 'center'); lab('= 29 feb 2013', zx, zy + V(192, 182), V(32, 32), A.red, 'center'); });
    route(t, [[xs[2] + 60, y - 100], [zx, zy - 80]], [329.4], { d: 0.6 });
    withA(ez(t, 331.6, 0.5), () => txt('that date doesn’t exist', V(1420, CX), V(zy + 330, zy + 320), F.serif(V(76, 74)), A.ink, 'center'));
    inset(t, 326.9, 'azure', V(110, 80), V(740, 1460), V(820, W - 160), { hlAt: [330.0, 330.6], only: [0, 1], crop: [176, 352] });
    leg(5);
  }, { id: 'leap' });
  cue('paper', 326.9, -6); cue('pencil', 329.4, -6); cue('marker', 330.0, -8); cue('wrong', 331.7, -6);
}
