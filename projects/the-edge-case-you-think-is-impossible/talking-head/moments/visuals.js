/* edge cases: picture-led and animated visuals (her review 2026-11-07 evening: "too much text… looks like old websites").
 * Pexels photos full-bleed with a slow push, flat avatars, a wandering tap path, a typed SQL query that breaks, signal bars,
 * a modern notification, a button that disables, a counter that stays at 1. No borders, no outlined boxes, almost no words.
 * Loaded after common.js (talking-head.json "common"). Photos: film/assets/CREDITS.md. */
'use strict';
/** a Pexels photo full-bleed in r (cover crop), slow push from o.at; o.fx/o.fy focus 0..1; o.z zoom; o.over(t, r, map) draws on top
 *  (map(px, py) -> canvas point for a photo pixel); o.dim darkens a little for overlays */
EF.pic = (o) => (t, r) => {
  const im = IMG[o.key]; if (!im) { efBg(r, EF.ink); return; }
  const k = (o.z || 1) * (1 + (o.push == null ? 0.07 : o.push) * clamp((t - (o.at || 0)) / (o.dur || 8)));
  const s = Math.max(r.w / im.width, r.h / im.height) * k; const sw = r.w / s, sh = r.h / s;
  const sx = clamp((im.width - sw) * (o.fx == null ? 0.5 : o.fx), 0, im.width - sw), sy = clamp((im.height - sh) * (o.fy == null ? 0.5 : o.fy), 0, im.height - sh);
  efClip(r.x, r.y, r.w, r.h, () => {
    grp('photo ' + o.key, r.x, r.y, r.w, r.h, () => themeFixed(() => ctx.drawImage(im, sx, sy, sw, sh, r.x, r.y, r.w, r.h)), { img: true });
    if (o.dim) rect(r.x, r.y, r.w, r.h, `rgba(12,12,12,${o.dim})`);
    if (o.over) o.over(t, r, (px, py) => [r.x + (px * im.width - sx) * s, r.y + (py * im.height - sy) * s], s);
  });
};
/* deterministic PRNG */
EF.rng = (seed) => () => { seed = (seed * 1664525 + 1013904223) % 4294967296; return seed / 4294967296; };
/** a wandering path of taps (lime rings + a thin path), one every o.step s from o.at, inside box [x, y, w, h]; o.errAt: a red pulse
 *  where the path stops. No words. */
EF.tapPath = (t, box, o) => {
  const [bx, by, bw, bh] = box; const R = EF.rng(o.seed || 7); const N = o.n || 26; const pts = [];
  let px = bx + bw * 0.2, py = by + bh * 0.8; for (let i = 0; i < N; i++) { px = clamp(px + (R() - 0.45) * bw * 0.5, bx, bx + bw); py = clamp(py + (R() - 0.55) * bh * 0.45, by, by + bh); pts.push([px, py]); }
  const step = o.step || 0.3; const end = o.errAt != null ? o.errAt : 1e9; const tt = Math.min(t, end);
  const nShown = clamp(Math.floor((tt - o.at) / step) + 1, 0, N); if (nShown <= 0) return;
  const u = Math.max(0.9, bw / 520);
  ctx.save(); ctx.lineCap = 'round'; ctx.lineJoin = 'round';
  // the path: older segments fade out (a moving trail)
  for (let i = 1; i < nShown; i++) { const age = nShown - i; const a = clamp(1 - age / 9); if (a <= 0) continue;
    const seg = i === nShown - 1 ? clamp(((tt - o.at) / step) % 1 * 2.5) : 1; const [x0, y0] = pts[i - 1], [x1, y1] = pts[i];
    ctx.globalAlpha = a * 0.9; ctx.strokeStyle = EF.lime; ctx.lineWidth = 5 * u; ctx.setLineDash([2, 14 * u]); ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x0 + (x1 - x0) * seg, y0 + (y1 - y0) * seg); ctx.stroke(); }
  ctx.setLineDash([]);
  for (let i = Math.max(0, nShown - 8); i < nShown; i++) { const t0 = o.at + i * step; const q = clamp((t - t0) / 0.45); const age = nShown - 1 - i; const a = clamp(1 - age / 7);
    const [x, y] = pts[i]; ctx.globalAlpha = a; circle(x, y, 22 * u, 'rgba(12,12,12,0.55)'); circle(x, y, 17 * u, EF.lime);
    if (q < 1) { ctx.globalAlpha = a * (1 - q); ctx.strokeStyle = EF.lime; ctx.lineWidth = 4 * u; ctx.beginPath(); ctx.arc(x, y, (16 + 50 * E.outCubic(q)) * u, 0, 7); ctx.stroke(); } }
  if (t >= end) { const [x, y] = pts[nShown - 1]; const q = clamp((t - end) / 0.5); ctx.globalAlpha = 1;
    circle(x, y, 18 * u * (1 + 0.25 * Math.sin(Math.min(q, 1) * Math.PI)), EF.red);
    for (let k = 0; k < 2; k++) { const qq = clamp((t - end - k * 0.35) / 0.9); if (qq > 0 && qq < 1) { ctx.globalAlpha = 1 - qq; ctx.strokeStyle = EF.red; ctx.lineWidth = 5 * u; ctx.beginPath(); ctx.arc(x, y, (20 + 90 * E.outCubic(qq)) * u, 0, 7); ctx.stroke(); } } }
  ctx.restore();
};
/** a handful of people (flat avatars, ink on lime), one by one from o.at; at o.hitAt one turns red and gets the bug */
EF.crowd = (o) => (t, r) => {
  efBg(r); const u = efU(r); const n = o.n || 5; const port = r.h > r.w * 1.05;
  const cols = port ? 3 : n; const cw = r.w / (cols + 0.6), hd = Math.min(cw * 0.2, 70 * u * (port ? 1.5 : 1.25));
  for (let i = 0; i < n; i++) { const cx = r.x + cw * (0.8 + (i % cols)) + (port && i >= cols ? cw * 0.5 : 0), cy = r.y + r.h * (port ? (i < cols ? 0.34 : 0.66) : 0.5);
    const p = efE(t, o.at + i * 0.12, 0.45, 'outBack'); if (p <= 0) continue; const hit = o.hitAt != null && i === (o.who == null ? 2 : o.who) ? efE(t, o.hitAt, 0.3) : 0;
    const col = hit > 0.5 ? EF.red : EF.ink; const bob = Math.sin((t - o.at) * 2.2 + i * 1.3) * 4 * u;
    withT(cx, cy + bob + (1 - p) * 60 * u, 0.6 + 0.4 * p, hit > 0 ? Math.sin(clamp((t - o.hitAt) / 0.4) * Math.PI * 4) * 0.08 * (1 - clamp((t - o.hitAt) / 0.4)) : 0, () => {
      circle(0, -hd * 0.9, hd, col); fillRR(-hd * 1.7, hd * 0.35, hd * 3.4, hd * 2.2, hd * 1.1, col);
      if (hit > 0.5) { const q = clamp((t - o.hitAt) / 0.5); withA(1, () => { circle(hd * 1.5, -hd * 2.1, hd * 0.55 * E.outBack(q), EF.ink); _txt('!', hd * 1.5, -hd * 2.1 + hd * 0.28, F.mono(hd * 0.8), EF.lime, 'center'); }); }
    }); }
};
/** a modern notification on a dark ground: a rounded white card slides down (no border, soft shadow); o.title, o.meta, o.at */
EF.notify = (o) => (t, r) => {
  efBg(r, EF.ink); const u = efU(r); const p = efE(t, o.at, 0.6, 'outBack'); if (p <= 0) return;
  const m = 40 * u, w = r.w - 2 * m, h = 270 * u, x = r.x + m, y = r.y + r.h * 0.3 - (1 - p) * 300 * u;
  withA(clamp(p * 2), () => { ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.45)'; ctx.shadowBlur = 40 * u; ctx.shadowOffsetY = 14 * u; fillRR(x, y, w, h, 34 * u, '#F7F7F2'); ctx.restore();
    fillRR(x + 34 * u, y + 44 * u, 92 * u, 92 * u, 24 * u, EF.red); _txt('!', x + 80 * u, y + 116 * u, F.disp(80 * u), EF.white, 'center');
    txt(o.meta || 'NEW ISSUE', x + 152 * u, y + 80 * u, F.mono(34 * u), '#6B6B6B', 'left', 'alphabetic', 1, 'notify meta');
    _txt('now', x + w - 34 * u, y + 80 * u, F.mono(34 * u), '#6B6B6B', 'right');
    EF.text(t, 'notify title', o.title, x + 152 * u, y + 180 * u, 76 * u, { maxW: w - 190 * u, bar: false });
  });
  // a second, smaller card peeks in under it (more reports)
  if (o.moreAt != null) { const q = efE(t, o.moreAt, 0.5, 'outBack'); if (q > 0) withA(q * 0.75, () => fillRR(x + 30 * u, y + h + 18 * u, w - 60 * u, 40 * u, 20 * u, 'rgba(247,247,242,0.5)')); }
};
/** a SQL query typed live on a dark editor (no border): o.name typed into the quotes from o.typeAt (o.cps); the apostrophe closes the
 *  text early: what follows turns red with a wavy underline at o.breakAt; o.errAt: a red "syntax error" line + a shake.
 *  o.inject: the typed text is an injection (red highlight on what comes after the apostrophe at o.hlAt; table rows vanish at o.dropAt) */
EF.sql = (o) => (t, r) => {
  efBg(r, '#111114'); const u = efU(r); const port = r.h > r.w * 1.05; const m = (port ? 50 : 80) * u;
  const narrow = r.w < 1300; const z = Math.min(54 * u, (r.w - 2 * m) / (narrow ? 17 : 25)); if (narrow && !o.pre) o = { ...o, lines: [...(o.lines || ['SELECT * FROM users']), 'WHERE surname ='], pre: ' ' }; const f = F.mono(z); const lh = z * 1.7;
  const sh = o.errAt != null && t > o.errAt && t < o.errAt + 0.45 ? Math.sin((t - o.errAt) * 60) * 10 * u * (1 - (t - o.errAt) / 0.45) : 0;
  const y0 = r.y + (port ? r.h * 0.2 : r.h * 0.26);
  withT(sh, 0, 1, 0, () => {
    const lines = o.lines || ['SELECT * FROM users']; let y = y0;
    lines.forEach((l, i) => { withA(efE(t, (o.at || 0) + i * 0.15, 0.35), () => { const kw = l.split(' '); let x = r.x + m;
      kw.forEach(w => { const isK = /^(SELECT|FROM|WHERE|UPDATE|SET|AND)$/.test(w); _txt(w + ' ', x, y, f, isK ? '#8FA3FF' : '#EDEDE6', 'left'); x += tw(w + ' ', f); }); }); y += lh; });
    // the line with the typed name
    withA(efE(t, (o.at || 0) + lines.length * 0.15, 0.35), () => {
      let x = r.x + m; const pre = o.pre || 'WHERE surname = '; pre.split(' ').forEach((w, i, a) => { const s = w + (i < a.length - 1 ? ' ' : ''); _txt(s, x, y, f, /^WHERE$/.test(w) ? '#8FA3FF' : '#EDEDE6', 'left'); x += tw(s, f); });
      const name = [...o.name]; const n = clamp(Math.floor((t - o.typeAt) * (o.cps || 7)), 0, name.length); const ap = name.indexOf("'");
      const brk = o.breakAt != null && t >= o.breakAt; const hl = o.hlAt != null ? efE(t, o.hlAt, 0.4) : 0;
      _txt("'", x, y, f, EF.lime, 'left'); x += tw("'", f); const sx0 = x; let bx0 = null;
      name.slice(0, n).forEach((c, i) => { const after = ap >= 0 && i > ap; const isAp = i === ap; let col = EF.lime;
        if (after && (brk || o.inject)) col = EF.red; if (isAp && brk) col = EF.white;
        const cw = tw(c, f); if (after && hl > 0) rect(x, y - z * 0.95, cw * Math.min(1, hl * 1.5) + 1, z * 1.3, 'rgba(255,59,31,0.25)');
        _txt(c, x, y, f, col, 'left'); if (after && bx0 == null) bx0 = x; x += cw; });
      if (n === name.length && !o.inject) { _txt("'", x, y, f, brk ? EF.red : EF.lime, 'left'); x += tw("'", f); }
      // caret
      if (t < (o.breakAt || o.hlAt || 1e9) && Math.floor(t * 2.4) % 2 === 0) rect(x + 3, y - z * 0.9, Math.max(3, z * 0.08), z * 1.15, EF.white);
      // the wavy underline under what fell outside the text
      if (brk && bx0 != null) { const q = efE(t, o.breakAt, 0.35); ctx.save(); ctx.strokeStyle = EF.red; ctx.lineWidth = 3 * u; ctx.beginPath();
        const L = (x - bx0) * q; for (let k = 0; k <= L; k += 2) { const yy = y + z * 0.35 + Math.sin(k / (5 * u)) * 3.5 * u; k ? ctx.lineTo(bx0 + k, yy) : ctx.moveTo(bx0, yy); } ctx.stroke(); ctx.restore(); }
      void sx0;
    });
    y += lh;
    if (o.errAt != null) withA(efE(t, o.errAt, 0.3), () => { circle(r.x + m + z * 0.45, y + lh * 0.5 - z * 0.35, z * 0.45, EF.red); _txt('!', r.x + m + z * 0.45, y + lh * 0.5 - z * 0.35 + z * 0.3, F.mono(z * 0.8), EF.white, 'center');
      txt(o.errText || 'syntax error', r.x + m + z * 1.3, y + lh * 0.5, f, EF.red, 'left', 'alphabetic', 0, 'sql error'); });
    // injection: the users table below, rows wiped
    if (o.dropAt != null) { const ty = y + lh * 0.6; const rw = r.w - 2 * m, rh = z * 1.1; for (let i = 0; i < 4; i++) { const q = efE(t, o.dropAt + i * 0.09, 0.4, 'inExpo');
      withA(efE(t, o.at || 0, 0.4) * (1 - q), () => withT((q) * 120 * u, 0, 1, 0, () => { fillRR(r.x + m, ty + i * (rh + 14 * u), rw * (0.95 - i * 0.07), rh, 8 * u, 'rgba(237,237,230,0.12)');
        fillRR(r.x + m + 20 * u, ty + i * (rh + 14 * u) + rh * 0.35, rw * 0.22, rh * 0.3, 4 * u, 'rgba(237,237,230,0.35)'); })); } }
  });
};
/** signal bars over a photo (top-right of box), dropping to none at o.dropAt, then red; a stuck spinner under them */
EF.signal = (t, x, y, sz, o) => {
  const lost = clamp((t - o.dropAt) / 0.9); const nOn = 4 - Math.floor(lost * 4.01); const red = t >= o.dropAt + 0.9;
  ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.5)'; ctx.shadowBlur = 16;
  for (let i = 0; i < 4; i++) { const bh = sz * (0.3 + 0.23 * i); fillRR(x + i * sz * 0.32, y + sz - bh, sz * 0.22, bh, sz * 0.05, i < nOn ? EF.white : red ? EF.red : 'rgba(255,255,255,0.3)'); }
  ctx.restore();
  if (red) { const q = efE(t, o.dropAt + 0.9, 0.35, 'outBack'); withT(x + sz * 1.45, y + sz * 0.15, q, 0, () => { circle(0, 0, sz * 0.24, EF.red); _txt('×', 0, sz * 0.1, F.mono(sz * 0.35), EF.white, 'center'); }); }
};
/** a big button: pressed at o.press, then greyed (disabled); later presses (o.more) do nothing. No words but the button's. */
EF.disable = (o) => (t, r) => {
  efBg(r); const u = efU(r); const w = Math.min(r.w * 0.7, 560 * u), h = 150 * u; const x = r.x + (r.w - w) / 2, y = r.y + r.h * 0.42 - h / 2;
  const off = t >= o.press + 0.15; const pr = EF.pressAt(t, [o.press, ...(o.more || [])]);
  withT(x + w / 2, y + h / 2, 1 - 0.05 * pr, 0, () => { fillRR(-w / 2, -h / 2, w, h, h / 2, off ? '#B9C77A' : EF.ink);
    txt(o.label || 'Place order', 0, h * 0.14, F.disp(h * 0.38), off ? '#7A8640' : EF.white, 'center', 'alphabetic', 0, 'disable label'); });
  // the finger / cursor dot and its rings
  [o.press, ...(o.more || [])].forEach((a, i) => { const q = clamp((t - a) / 0.5); if (t < a - 0.35 || q >= 1) return;
    const cx = x + w * 0.62 + i * 14 * u, cy = y + h * 0.6; const app = clamp((t - (a - 0.35)) / 0.35);
    withA(app * (1 - q), () => { circle(cx, cy, 22 * u, 'rgba(12,12,12,0.35)'); if (t >= a) { ctx.save(); ctx.strokeStyle = i ? '#7A8640' : EF.ink; ctx.lineWidth = 4 * u; ctx.beginPath(); ctx.arc(cx, cy, (24 + 60 * E.outCubic(q)) * u, 0, 7); ctx.stroke(); ctx.restore(); } }); });
};
/** the same request twice, still one order: two taps (rings) on the left, a big counter that stays at 1 */
EF.once = (o) => (t, r) => {
  efBg(r); const u = efU(r); const port = r.h > r.w * 1.05; const cx = r.x + r.w * (port ? 0.5 : 0.3), cy = r.y + r.h * (port ? 0.3 : 0.47);
  const bw = 460 * u, bh = 170 * u;
  const pr = EF.pressAt(t, o.presses); withT(cx, cy, 1 - 0.05 * pr, 0, () => { fillRR(-bw / 2, -bh / 2, bw, bh, bh / 2, EF.ink); txt(o.label || 'Pay €39', 0, bh * 0.14, F.disp(bh * 0.38), EF.white, 'center', 'alphabetic', 0, 'once label'); });
  o.presses.forEach((a) => { const q = clamp((t - a) / 0.55); if (t >= a && q < 1) withA(1 - q, () => { ctx.save(); ctx.strokeStyle = EF.ink; ctx.lineWidth = 4 * u; ctx.beginPath(); ctx.arc(cx + bw * 0.2, cy + bh * 0.1, (24 + 70 * E.outCubic(q)) * u, 0, 7); ctx.stroke(); ctx.restore(); }); });
  const nx = r.x + r.w * (port ? 0.5 : 0.7), ny = r.y + r.h * (port ? 0.72 : 0.56); const a = efE(t, o.presses[0] + 0.15, 0.4); if (a <= 0) return;
  withA(a, () => { const bump = o.presses.slice(1).reduce((m, p) => Math.max(m, t >= p + 0.1 && t < p + 0.45 ? Math.sin((t - p - 0.1) / 0.35 * Math.PI) : 0), 0);
    withT(nx, ny, 1 + 0.08 * bump, 0, () => { _txt('1', 0, 0, F.disp(420 * u), EF.ink, 'center'); });
    txt(o.unit || 'payment', nx, ny + 100 * u, F.mono(Math.max(32, 40 * u)), EF.ink, 'center', 'alphabetic', 1, 'once unit'); });
};

/* ---- round 2 (coordinator review 2026-11-07): fewer lime grounds, no form boxes, one modern phone form ---- */
EF.night = '#111114';
/** the chapter card, dark: "EDGE CASE 03 / 08" in mono lime + the name typed big in serif white, a lime caret. No box. */
EF.chapter = (o) => (t, r) => {
  efBg(r, EF.night); const u = efU(r); const m = 90 * u; const z = Math.min(170 * u, (r.w - 2 * m) / 7);
  const y = r.y + r.h * 0.5 + z * 0.3;
  withA(efE(t, o.at - 0.2, 0.4), () => txt(`EDGE CASE ${String(o.n).padStart(2, '0')} / 08`, r.x + m, y - z * 1.15, F.mono(Math.max(32, 36 * u)), EF.lime, 'left', 'alphabetic', 2, 'chapter kicker'));
  const ov = ovr('value chapter'); const v = ov.s != null ? ov.s : o.name; const ch = [...v]; const n = Math.round(ch.length * clamp((t - o.at) / Math.max(0.2, ch.length / 16)));
  const shown = ch.slice(0, n).join(''); const f = F.disp(z); _txt(shown, r.x + m, y, f, EF.white, 'left', 'alphabetic', -0.02 * z);
  const sw = tw(shown, f, -0.02 * z); if (Math.floor(t * 2.2) % 2 === 0 || t < o.at + 1) rect(r.x + m + sw + 10 * u, y - z * 0.78, Math.max(5, z * 0.05), z * 0.92, EF.lime);
  regBox(ov, r.x + m, y - z, Math.max(200, sw), z * 1.1, { text: v, def: o.name, label: 'chapter name' });
};
/** a licence plate object (not UI): white plate, rounded, dark rim, state line + big text */
EF.plateObj = (cx, cy, pw, text, u) => { const ph = pw * 0.5;
  ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.45)'; ctx.shadowBlur = 30 * u; ctx.shadowOffsetY = 12 * u; fillRR(cx - pw / 2, cy - ph / 2, pw, ph, 22 * u, '#F4F4EF'); ctx.restore();
  strokeRR(cx - pw / 2 + 12 * u, cy - ph / 2 + 12 * u, pw - 24 * u, ph - 24 * u, 14 * u, '#1C2A5A', 4 * u);
  _txt('California', cx, cy - ph * 0.26, (EF.FB ? `800 ${Math.round(ph * 0.17)}px FBIT` : `italic 400 ${Math.round(ph * 0.17)}px "DM Serif Display"`), '#B3261E', 'center');
  _txt(text, cx, cy + ph * 0.27, F.mono(ph * 0.42), '#1C2A5A', 'center', 'alphabetic', ph * 0.04); };
/** a photo with a plate reading NULL that slides in at o.plateAt, tickets landing on it at o.tickets */
EF.plateOnPhoto = (o) => EF.pic({ key: o.key, at: o.at, fx: o.fx, fy: o.fy, dim: 0.15, over: (t, r) => { const u = efU(r); const p = efE(t, o.plateAt, 0.55, 'outBack'); if (p <= 0) return;
  const pw = Math.min(r.w * 0.62, 640 * u); const cx = r.x + r.w / 2, cy = r.y + r.h * 0.5 + (1 - p) * r.h * 0.6;
  EF.plateObj(cx, cy, pw, 'NULL', u);
  (o.tickets || []).forEach((a, i) => { const q = efE(t, a, 0.4, 'outBack'); if (q <= 0) return; const tw_ = 150 * u, th = 190 * u;
    withT(cx + (i - 1) * pw * 0.32, cy - pw * 0.06 - (1 - q) * 200 * u, 1, ((i * 29) % 21 - 10) / 50, () => { ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.35)'; ctx.shadowBlur = 16 * u; fillRR(-tw_ / 2, -th / 2, tw_, th, 6 * u, '#FFFFFF'); ctx.restore();
      rect(-tw_ / 2, -th / 2, tw_, 34 * u, EF.red); for (let k = 0; k < 4; k++) rect(-tw_ / 2 + 14 * u, -th / 2 + (60 + k * 28) * u, tw_ * (0.5 + ((i + k) % 3) * 0.12), 8 * u, '#C8C8C8'); }); }); } });
/** big place-order button on a dark ground: a loading bar runs inside it from o.loadAt, pressed at o.presses (rings) */
EF.order = (o) => (t, r) => {
  efBg(r, EF.night); const u = efU(r); const w = Math.min(r.w * 0.72, 620 * u), h = 160 * u; const cx = r.x + r.w / 2, cy = r.y + r.h * 0.45;
  const pr = EF.pressAt(t, o.presses); const ld = o.loadAt != null && t > o.loadAt ? clamp((t - o.loadAt) / 3) : 0;
  withT(cx, cy, 1 - 0.05 * pr, 0, () => { fillRR(-w / 2, -h / 2, w, h, h / 2, EF.lime);
    if (ld > 0) { ctx.save(); rr(-w / 2, -h / 2, w, h, h / 2); ctx.clip(); rect(-w / 2, -h / 2, w * ld, h, '#B9D43A'); ctx.restore(); }
    txt(o.label || 'Place order', 0, h * 0.14, F.disp(h * 0.4), EF.ink, 'center', 'alphabetic', 0, 'order label'); });
  o.presses.forEach((a, i) => { const q = clamp((t - a) / 0.55); if (t >= a && q < 1) withA(1 - q, () => { ctx.save(); ctx.strokeStyle = i ? EF.red : EF.lime; ctx.lineWidth = 5 * u; ctx.beginPath(); ctx.arc(cx + w * 0.22, cy + h * 0.1, (26 + 80 * E.outCubic(q)) * u, 0, 7); ctx.stroke(); ctx.restore(); }); });
  // spinner under the button while it is slow
  if (ld > 0 && ld < 1) { ctx.save(); ctx.strokeStyle = 'rgba(255,255,255,0.6)'; ctx.lineWidth = 5 * u; ctx.lineCap = 'round'; ctx.beginPath(); const a0 = t * 7; ctx.arc(cx, cy + h + 40 * u, 26 * u, a0, a0 + 4.2); ctx.stroke(); ctx.restore(); }
};
/** a certificate: a padlock that locks, then "+1 year" big; dark ground */
EF.cert = (o) => (t, r) => {
  efBg(r, EF.night); const u = efU(r); const port = r.h > r.w * 0.85; const cx = r.x + r.w * (port ? 0.5 : 0.3), cy = r.y + r.h * (port ? 0.32 : 0.48);   // near-square panels stack too (sh07 letterbox panel, 2026-11-12: '+1 year' ran off the right edge)
  const p = efE(t, o.at, 0.5, 'outBack'); if (p <= 0) return; const s = 120 * u * p;
  const lock = efE(t, o.lockAt, 0.35); ctx.save(); ctx.strokeStyle = EF.lime; ctx.lineWidth = 26 * u * p; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(cx, cy - s * 0.55 - (1 - lock) * 40 * u, s * 0.62, Math.PI, 0); ctx.stroke(); ctx.restore();
  fillRR(cx - s * 1.05, cy - s * 0.5, s * 2.1, s * 1.7, 22 * u, EF.lime); circle(cx, cy + s * 0.25, s * 0.2, EF.night); rect(cx - s * 0.06, cy + s * 0.25, s * 0.12, s * 0.45, EF.night);
  const q = efE(t, o.yearAt, 0.45); const tx = r.x + r.w * (port ? 0.5 : 0.56), ty = r.y + r.h * (port ? 0.72 : 0.54);
  withA(q, () => withT(0, (1 - q) * 30 * u, 1, 0, () => txt(o.big || '+1 year', tx, ty, F.disp(Math.min(210 * u, r.w * 0.16)), EF.white, port ? 'center' : 'left', 'alphabetic', 0, 'cert big')));
  withA(efE(t, o.yearAt + 0.4, 0.4), () => txt(o.small || 'today’s date, year + 1', tx, ty + 80 * u, F.mono(Math.max(32, 38 * u)), EF.lime, port ? 'center' : 'left', 'alphabetic', 1, 'cert small'));
};
/** the leap date: "29 Feb 2012" big; "+1" ticks the year to 2013; at o.errAt the date turns red and is struck through */
EF.leap = (o) => (t, r) => {
  efBg(r, EF.night); const u = efU(r); const z = Math.min(190 * u, r.w / 6.2); const cx = r.x + r.w / 2;
  const a = efE(t, o.at, 0.4); if (a <= 0) return; const y1 = r.y + r.h * 0.38, y2 = r.y + r.h * 0.38 + z * 1.35;
  withA(a, () => txt('29 Feb 2012', cx, y1, F.disp(z), EF.white, 'center', 'alphabetic', 0, 'leap from'));
  const b = efE(t, o.nextAt, 0.45); if (b <= 0) return; const bad = t >= o.errAt;
  withA(b, () => withT(0, (1 - b) * 40 * u, 1, 0, () => { const s = '29 Feb 2013'; const f = F.disp(z); txt(s, cx, y2, f, bad ? EF.red : EF.lime, 'center', 'alphabetic', 0, 'leap to');
    _txt('+1 year', cx - tw(s, f) / 2 - 30 * u, y1 + z * 0.62, F.mono(Math.max(32, 34 * u)), '#9A9A92', 'left');
    if (bad) { const q = efE(t, o.errAt, 0.35); rect(cx - tw(s, f) / 2 - 10 * u, y2 - z * 0.33, (tw(s, f) + 20 * u) * q, Math.max(6, z * 0.06), EF.red); } }));
};
/** a name and its length: the name types big, a counter counts letters; at o.rejectAt the wrong count (bytes) shows red over the limit */
EF.nameLen = (o) => (t, r) => {
  efBg(r, EF.night); const u = efU(r); const m = 80 * u; const v = o.name; const ch = [...v.normalize('NFC')];
  const n = Math.round(ch.length * clamp((t - o.typeAt) / Math.max(0.2, ch.length / 14))); const z = Math.min(150 * u, (r.w - 2 * m) / (ch.length * 0.52));
  const y = r.y + r.h * 0.42; _txt(ch.slice(0, n).join(''), r.x + m, y, F.disp(z), EF.white, 'left'); const bad = t >= o.rejectAt;
  const cnt = bad ? o.bytes : Math.min(n, o.letters); const lim = o.limit;
  withA(efE(t, o.typeAt, 0.4), () => { const f = F.mono(Math.max(40, 64 * u)); const s1 = String(cnt), s2 = ' / ' + lim; _txt(s1, r.x + m, y + 140 * u, f, bad ? EF.red : EF.lime, 'left'); _txt(s2, r.x + m + tw(s1, f), y + 140 * u, f, '#9A9A92', 'left');
    const bw = r.w - 2 * m, by = y + 190 * u; fillRR(r.x + m, by, bw, 14 * u, 7 * u, 'rgba(255,255,255,0.15)'); fillRR(r.x + m, by, bw * Math.min(1, cnt / lim) , 14 * u, 7 * u, bad ? EF.red : EF.lime);
    if (bad) withA(efE(t, o.rejectAt, 0.3), () => txt(o.errText || 'Name is too long', r.x + m, by + 90 * u, F.mono(Math.max(34, 42 * u)), EF.red, 'left', 'alphabetic', 0, 'name err')); });
};
/** the one form in the video, as a modern phone screen: dark phone, white screen, soft grey fields (no outlines), an error in red */
EF.phoneForm = (o) => (t, r) => {
  efBg(r, o.bg || EF.night); const u = efU(r); const ph = Math.min(r.h * 0.9, 900 * u), pw = ph * 0.5; const px = o.px != null ? o.px(r, pw) : r.x + (r.w - pw) / 2, py = r.y + (r.h - ph) / 2;
  const a = efE(t, o.at, 0.5); if (a <= 0) return;
  withA(a, () => withT(0, (1 - a) * 60 * u, 1, 0, () => {
    const P = devicePhone(px, py, pw, ph, null, { screen: '#FBFBF7' }); const sx = P.sx, sy = P.sy, sw = P.sw, sh = P.sh; const uu = Math.min(u, sh / 760);   // 2026-11-12: the content scales to the screen, so the error line keeps its own room above the button in every ratio (realistic phone 2026-11-09)
    const m = 34 * uu; let y = sy + 130 * uu; txt(o.title, sx + m, y, F.disp(Math.min(54 * uu, (sw - 2 * m) / 6.2)), EF.ink, 'left', 'alphabetic', 0, 'phone title'); y += 70 * uu;
    o.fields.forEach((fd, i) => { const lz = Math.max(24, 26 * uu); txt(fd.label.toUpperCase(), sx + m, y, F.mono(lz), '#6B6B6B', 'left', 'alphabetic', 1, 'phone label ' + i); y += 18 * uu;
      const fh = 92 * uu; const err = fd.errAt != null && t >= fd.errAt; fillRR(sx + m, y, sw - 2 * m, fh, 18 * uu, err ? '#FFE3DE' : '#EEEEE8');
      const v = fd.value; const n = fd.typeAt == null ? v.length : Math.round(v.length * clamp((t - fd.typeAt) / Math.max(0.15, v.length / (fd.cps || 10))));
      _txt(v.slice(0, n), sx + m + 24 * uu, y + fh * 0.66, F.disp(46 * uu), EF.ink, 'left'); y += fh;
      if (err) withA(efE(t, fd.errAt, 0.3), () => txt(fd.errText, sx + m, y + 44 * uu, F.mono(Math.min(28 * uu, (sw - 2 * m) / (0.62 * fd.errText.length))), EF.red, 'left', 'alphabetic', 0, 'phone err ' + i));
      y += 80 * uu; });
    const by = Math.max(sy + sh - 150 * uu, y + 10 * uu); fillRR(sx + m, by, sw - 2 * m, 96 * uu, 48 * uu, EF.ink); _txt(o.btn || 'Continue', sx + sw / 2, by + 62 * uu, F.disp(40 * uu), EF.white, 'center');
  }));
};
