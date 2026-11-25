/* learn-to-code: "show, don't type" pass (her review of the edge-cases edit, 2026-11-07 evening; the edge-cases rework is the model).
 * Loaded after common.js, before plan.js (talking-head.json "common").
 * RV.night(draw): the same review sheet / flow on an off-black ground (a dark code editor) for about half the inserts, by swapping
 * the kit's colours while it draws. RV.capMode: what is under her 16:9 caption (graphics canvas pixels): a light graphic -> ink
 * type, half light -> a solid dark band, her footage -> white with a soft shadow. */
'use strict';
RV.NIGHT = { g: '#111114', ink: '#EDEDE6', dim: '#9AA1AA', wh: '#1E2228', add: '#133A22', addI: '#4ADE80', del: '#3F1D1D', delI: '#FF6B6B', field: '#2A2F36', mid: '#6B727C' };
RV.NIGHT_G = { bg: '#111114', fg: '#EDEDE6', mid: '#9AA1AA', panel: '#24282E', card: '#1E2228', line: 'rgba(255,255,255,0.14)' };
RV.night = (draw) => (t, r) => { if (typeof FOOT !== 'undefined' && FOOT.m && FOOT.m.kind === 'short') return draw(t, r);   // shorts keep the light sheet (the top title sits on its ground)
  const keep = {}, kg = {}; for (const k in RV.NIGHT) { keep[k] = RV[k]; RV[k] = RV.NIGHT[k]; }
  for (const gk of ['rvGrey', 'rvGreyB', 'rvWhite']) { kg[gk] = { ...G[gk] }; Object.assign(G[gk], RV.NIGHT_G); }
  try { draw(t, r); } finally { Object.assign(RV, keep); for (const gk in kg) G[gk] = Object.assign(G[gk], kg[gk]); } };
RV.capMode = (x, y, w, h) => {
  try { const m = ctx.getTransform(); const X = Math.max(0, Math.round(m.a * x + m.e)), Y = Math.max(0, Math.round(m.d * y + m.f));
    const WW = Math.min(Math.max(1, Math.round(m.a * w)), ctx.canvas.width - X), HH = Math.min(Math.max(1, Math.round(m.d * h)), ctx.canvas.height - Y);
    const d = ctx.getImageData(X, Y, WW, HH).data; let n = 0, lt = 0; for (let i = 0; i < d.length; i += 28) { n++; if (d[i + 3] > 200 && (0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2]) > 150) lt++; }
    const fl = n ? lt / n : 0; return fl > 0.8 ? 'light' : fl > 0.12 ? 'mixed' : 'foot'; } catch (e) { return 'foot'; } };

/** the parts of an app as objects (no words but three small names): a laptop, a server, a database, on off-black. A request
 *  travels on its own path (o.go [t, t, t]: browser -> server -> database, a tick when saved at o.saveAt); questions are marks:
 *  o.q1At a red "?" on the server-database link (what can go wrong between the parts), o.q2At the database glows (where the data
 *  is saved), o.q3At the answer travels back to the laptop (how it reaches what the user sees). */
RV.parts = (o) => { (o.go || []).forEach(a => RV.snd('tick', a, -6)); [o.saveAt, o.q1At, o.q2At, o.q3At].forEach(a => a != null && RV.snd('pop', a, -5)); return (t, r) => {
  rect(r.x, r.y, r.w, r.h, '#111114'); if (o.top) r = { x: r.x, y: r.y + o.top, w: r.w, h: r.h - o.top }; const port = r.h > r.w * 1.2; const capRoom = !PORTRAIT && typeof FOOT !== 'undefined' ? 150 : 0; const s = Math.min(r.w * (port ? 0.16 : r.w < 1500 ? 0.12 : 0.09), (r.h - capRoom) * 0.17);
  const cy = r.y + (r.h - capRoom) * 0.48; const xs = port ? [0.5, 0.5, 0.5].map(k => r.x + r.w * k) : [0.18, 0.5, 0.82].map(k => r.x + r.w * k);
  const ys = port ? [0.2, 0.5, 0.8].map(k => r.y + (r.h - capRoom) * k) : [cy, cy, cy]; const fg = '#EDEDE6', dim = 'rgba(237,237,230,0.45)';
  const a0 = rvE(t, o.at, 0.5);
  if (a0 <= 0) return;
  withA(a0, () => {
    // links
    for (let i = 0; i < 2; i++) { ctx.save(); ctx.strokeStyle = 'rgba(237,237,230,0.3)'; ctx.lineWidth = 4; ctx.setLineDash([2, 18]); ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(xs[i], ys[i]); ctx.lineTo(xs[i + 1], ys[i + 1]); ctx.stroke(); ctx.restore(); }
    // laptop
    grp('parts-laptop', xs[0] - s, ys[0] - s, s * 2, s * 2, () => { fillRR(xs[0] - s * 0.8, ys[0] - s * 0.55, s * 1.6, s, s * 0.08, fg); fillRR(xs[0] - s * 0.7, ys[0] - s * 0.46, s * 1.4, s * 0.8, s * 0.04, '#111114'); fillRR(xs[0] - s, ys[0] + s * 0.5, s * 2, s * 0.12, s * 0.06, fg); }, { label: 'object' });
    // server
    grp('parts-server', xs[1] - s, ys[1] - s, s * 2, s * 2, () => { for (let i = 0; i < 3; i++) { const y = ys[1] - s * 0.7 + i * s * 0.48; fillRR(xs[1] - s * 0.75, y, s * 1.5, s * 0.4, s * 0.08, fg); circle(xs[1] - s * 0.5, y + s * 0.2, s * 0.06, RV.NIGHT.addI); } }, { label: 'object' });
    // database (a cylinder)
    const glow = o.q2At != null ? rvE(t, o.q2At, 0.4) * (o.q3At != null && t > o.q3At + 0.6 ? 0.4 : 1) : 0; const dcol = glow > 0.5 ? RV.amb : fg;
    grp('parts-db', xs[2] - s, ys[2] - s, s * 2, s * 2, () => { const w = s * 1.3, h = s * 1.3, x = xs[2] - w / 2, y = ys[2] - h / 2;
      rect(x, y, w, h, dcol); ctx.fillStyle = dcol; ctx.beginPath(); ctx.ellipse(xs[2], y + h, w / 2, s * 0.22, 0, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#111114'; ctx.globalAlpha *= 0.35; ctx.beginPath(); ctx.ellipse(xs[2], y, w / 2, s * 0.22, 0, 0, Math.PI * 2); ctx.fill(); ctx.globalAlpha /= 0.35;
      ctx.fillStyle = dcol; ctx.beginPath(); ctx.ellipse(xs[2], y, w / 2 - 3, s * 0.2, 0, 0, Math.PI * 2); ctx.fill(); }, { label: 'object' });
    ['browser', 'server', 'database'].forEach((n, i) => txt(n, xs[i], ys[i] + s * 1.25, FM(Math.max(30, s * 0.28), 500), dim, 'center', 'alphabetic', 0, 'parts-label' + i));
  });
  // the request: a small square that travels; o.go = [leave browser, reach server, reach database]
  const pk = (x0, y0, x1, y1, ta, d, col) => { const q = (t - ta) / d; if (q < 0 || q > 1.25) return; const e = E.inOutCubic(clamp(q)); withA(q > 1 ? 1 - (q - 1) / 0.25 : 1, () => fillRR(lerp(x0, x1, e) - s * 0.22, lerp(y0, y1, e) - s * 0.22 - Math.sin(e * Math.PI) * s * 0.3, s * 0.44, s * 0.44, s * 0.1, col)); };
  if (o.go) { pk(xs[0], ys[0], xs[1], ys[1], o.go[0], 0.7, RV.amb); pk(xs[1], ys[1], xs[2], ys[2], o.go[1], 0.7, RV.amb); }
  if (o.saveAt != null && t >= o.saveAt) { const q = rvE(t, o.saveAt, 0.4); withT(xs[2] + s * 0.85, ys[2] - s * 0.85, q, 0, () => { circle(0, 0, s * 0.3, RV.NIGHT.addI); ctx.save(); ctx.strokeStyle = '#111114'; ctx.lineWidth = s * 0.08; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-s * 0.12, 0); ctx.lineTo(-s * 0.02, s * 0.1); ctx.lineTo(s * 0.14, -s * 0.1); ctx.stroke(); ctx.restore(); }); }
  if (o.q1At != null && t >= o.q1At) { const q = rvE(t, o.q1At, 0.4); const mx = (xs[1] + xs[2]) / 2, my = (ys[1] + ys[2]) / 2; withT(mx, my - (port ? 0 : s * 0.6), q, 0, () => { circle(0, 0, s * 0.34, RV.NIGHT.delI); _txt('?', 0, s * 0.17, FM(s * 0.5, 700), '#111114', 'center'); }); }
  if (o.q3At != null) pk(xs[2], ys[2], xs[0], ys[0], o.q3At, 1.0, RV.NIGHT.addI);
}; };

G.rvNight = { ...G.rvInk, bg: '#111114', panel: '#1E2228' };   // the skill cards: the same off-black as the other dark inserts
