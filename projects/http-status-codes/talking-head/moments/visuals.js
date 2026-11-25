/* http-status-codes: "show, don't type" visuals (her review of the edge-cases edit, 2026-11-07 evening: "too much text… looks
 * like old websites"; the edge-cases rework is the model). Loaded after common.js, before plan.js (talking-head.json "common").
 * - FD.http: a dark code editor (no white sheet): methods blue, the status in its group colour, typed on her words.
 * - FD.table: no white cards: big codes on a dark ground (coloured tiles only where the cell is a class colour).
 * - FD.mistake: dark, the counter + ONE big code (her sentence is in the captions, not re-typed).
 * - HT.trip: a request travelling client -> server (-> proxy / other branch) and the response coming back with its code.
 * - HT.net: a generic browser network panel (rows of requests, the status column coloured by first digit).
 * - HT.who: 401 vs 403 as two people (one unknown, one known but locked out).
 * - HT.admins: two admins, one book, the old price coming back (409).
 * - HT.phone: the ONE form in the video, a modern phone screen: log in (401) -> no access (403).
 * - captions: on a light graphic the caption turns ink; half over a light graphic -> a solid dark band (FD.capMode).
 * Generic UI only (no real brand). Every text editable (txt/regBox), every block movable (grp). */
'use strict';
const HT = { night: '#111114', ink2: '#1C1C20', fg: '#EDEDE6', dim: 'rgba(237,237,230,0.45)', blue: '#8FA3FF' };
HT.bg = (r) => { r = FD.rr(r, HT.night); rect(r.x, r.y, r.w, r.h, HT.night); return r; };
HT.area = (r, o = {}) => { const m = FD.m(r); const CR = o.capRoom != null ? o.capRoom : FD.CR(); return { x: r.x + m, y: r.y + m, w: r.w - 2 * m, h: r.h - 2 * m - CR, m }; };
HT.ink = (c) => FD.colDark(c);

/* ---------- caption contrast: what is under the caption (graphics canvas pixels) ---------- */
/** 'foot' (her footage: white + soft shadow), 'light' (a light graphic: ink type), 'mixed' (part light: solid dark band) */
FD.capMode = (x, y, w, h) => {
  try { const m = ctx.getTransform(); const X = Math.round(m.a * x + m.e), Y = Math.round(m.d * y + m.f), WW = Math.max(1, Math.round(m.a * w)), HH = Math.max(1, Math.round(m.d * h));
    const d = ctx.getImageData(Math.max(0, X), Math.max(0, Y), Math.min(WW, ctx.canvas.width - Math.max(0, X)), Math.min(HH, ctx.canvas.height - Math.max(0, Y))).data;
    let n = 0, op = 0, lt = 0; const step = 4 * 7; for (let i = 0; i < d.length; i += step) { n++; if (d[i + 3] > 200) { op++; if ((0.299 * d[i] + 0.587 * d[i + 1] + 0.114 * d[i + 2]) > 150) lt++; } }
    if (!n) return 'foot'; const fl = lt / n, fo = op / n; if (fl > 0.8) return 'light'; if (fl > 0.12) return 'mixed'; return fo > 0.8 ? 'dark' : 'foot';
  } catch (e) { return 'foot'; }
};

/* ---------- small flat objects (no outlines) ---------- */
HT.laptop = (cx, cy, s, col) => { fillRR(cx - s * 0.8, cy - s * 0.55, s * 1.6, s, s * 0.08, col); fillRR(cx - s * 0.7, cy - s * 0.46, s * 1.4, s * 0.8, s * 0.04, HT.night);
  fillRR(cx - s * 1.0, cy + s * 0.5, s * 2.0, s * 0.12, s * 0.06, col); };
HT.server = (cx, cy, s, col, led) => { for (let i = 0; i < 3; i++) { const y = cy - s * 0.7 + i * s * 0.48; fillRR(cx - s * 0.75, y, s * 1.5, s * 0.4, s * 0.08, col);
  circle(cx - s * 0.5, y + s * 0.2, s * 0.06, led || FD.g2); rect(cx - s * 0.2, y + s * 0.17, s * 0.7, s * 0.06, 'rgba(17,17,20,0.35)'); } };
HT.gate = (cx, cy, s, col) => { fillRR(cx - s * 0.55, cy - s * 0.7, s * 0.3, s * 1.4, s * 0.08, col); fillRR(cx + s * 0.25, cy - s * 0.7, s * 0.3, s * 1.4, s * 0.08, col);
  rect(cx - s * 0.25, cy - s * 0.45, s * 0.5, s * 0.12, col); };
HT.person = (cx, cy, s, col) => { circle(cx, cy - s * 0.55, s * 0.36, col); fillRR(cx - s * 0.62, cy - s * 0.1, s * 1.24, s * 0.85, s * 0.42, col); };
HT.lock = (cx, cy, s, col) => { ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = s * 0.16; ctx.beginPath(); ctx.arc(cx, cy - s * 0.2, s * 0.32, Math.PI, 0); ctx.stroke(); ctx.restore();
  fillRR(cx - s * 0.5, cy - s * 0.22, s, s * 0.8, s * 0.12, col); circle(cx, cy + s * 0.12, s * 0.1, HT.night); };
HT.spinner = (t, cx, cy, s, col) => { ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = s * 0.14; ctx.lineCap = 'round'; ctx.beginPath(); const a = t * 6; ctx.arc(cx, cy, s * 0.5, a, a + 4.2); ctx.stroke(); ctx.restore(); };
/** an envelope (the message) at x, y, scale s; col fill; optional code text on it */
HT.env = (x, y, s, col, label, lcol) => { fillRR(x - s * 0.6, y - s * 0.4, s * 1.2, s * 0.8, s * 0.1, col);
  ctx.save(); ctx.strokeStyle = 'rgba(17,17,20,0.35)'; ctx.lineWidth = Math.max(2, s * 0.05); ctx.beginPath(); ctx.moveTo(x - s * 0.55, y - s * 0.34); ctx.lineTo(x, y + s * 0.05); ctx.lineTo(x + s * 0.55, y - s * 0.34); ctx.stroke(); ctx.restore();
  if (label) _txt(label, x, y + s * 0.62 + s * 0.3, FN(s * 0.5), lcol || col, 'center'); };

/* ---------- FD.http: a dark code editor ---------- */
FD.http = (o) => { (o.lines || []).forEach((l) => FD.snd(l.hi ? 'tick' : 'type', l.at, l.hi ? -4 : -9)); return (t, r) => {
  r = HT.bg(r); const A = HT.area(r, o); const side = !PORTRAIT && r.w > r.h * 1.25 && o.code; let x = A.x, y = A.y, aw = A.w, ah = A.h;
  if (o.kicker) { FD.kicker(t, o.kicker, x, y + V(30, 32), V(32, 34), HT.dim, o.kickerAt != null ? o.kickerAt : FD.lead(o.lines[0].at)); y += V(70, 76); ah -= V(70, 76); }
  const lines = o.lines; let z = o.size || V(58, 52); const f = () => FM(z);
  const cd = o.code; const codes = cd ? (cd.codes || [[cd.at, cd.c]]) : null; const cells = codes ? FD.seqs(codes) : null; const c0 = codes ? codes[codes.length - 1][1] : '1';
  let s = 0; if (cd) s = side ? Math.min(ah * 0.6, aw * 0.34 / 1.7) : Math.min(ah * (PORTRAIT ? 0.26 : 0.36), aw * 0.8 / (cells.length * 0.6));
  const textW = side ? aw - tw('0', FN(s)) * cells.length - A.m : aw; const codeH = cd && !side ? s * 0.86 + V(110, 120) : 0;
  while ((Math.max(...lines.map(l => tw(l.s, f()))) > textW || lines.length * z * 1.6 + codeH > ah) && z > 22) z -= 2;
  const sh = lines.length * z * 1.6; const y0 = y + Math.max(0, (ah - sh - codeH) / 2);
  if (cd) { const cw = tw('0', FN(s)) * cells.length; const cur = [...codes].reverse().find(q => t >= q[0]) || codes[0]; const col = HT.ink(cur[1]);
    const cx = side ? r.x + r.w - A.m - cw : x; const cy = side ? y + ah / 2 + s * 0.36 : y0 + s * 0.8;
    grp('http-code', cx, cy - s * 0.8, cw, s * 0.86, () => withA(fdE(t, FD.lead(codes[0][0]), 0.3), () => FD.odo(t, cells, cx, cy, s, { col })));
    const nm = [...(cd.names || [[cd.at, cd.name]])].reverse().find(n => n[1] && t >= n[0]); if (nm) withA(fdE(t, nm[0] + 0.05, 0.3), () => txt(UP(nm[1]), cx, cy + V(84, 88), FN(V(64, 60)), HT.fg, 'left', 'alphabetic', 0, 'http-name')); }
  const sy = side ? y + Math.max(0, (ah - sh) / 2) : y0 + codeH; const a0 = fdE(t, FD.lead(lines[0].at) - 0.2, 0.45, 'outQuint');
  const colOf = (w, l) => /^(GET|POST|PUT|PATCH|DELETE)$/.test(w) ? HT.blue : /^HTTP\//.test(w) ? HT.dim : /^[1-5]\d\d$/.test(w) ? HT.ink(w) : l.dim ? HT.dim : HT.fg;
  withA(a0, () => withT(0, 24 * (1 - a0), 1, 0, () => grp(o.key || 'message', x, sy, textW, sh, () => {
    lines.forEach((l, i) => { const ly = sy + z * 0.9 + i * z * 1.6; const ov = ovr('msg-' + i); const s_ = ov.s != null ? ov.s : l.s; const la = i === 0 ? FD.lead(l.at) : l.at; if (t < la) return;
      const n = Math.round(clamp((t - la) * 38, 0, s_.length)); const vis = s_.slice(0, n); let xx = x;
      if (l.hi && s_.includes(l.hi)) { const i0 = s_.indexOf(l.hi); const hx = x + tw(s_.slice(0, i0), f()); const p = fdE(t, l.hiAt || la + l.hi.length / 38 + 0.05, 0.4);
        const code = (l.hi.match(/[1-5]\d\d/) || ['1'])[0]; if (p > 0) rect(hx, ly + z * 0.22, tw(l.hi, f()) * p, Math.max(4, z * 0.08), HT.ink(code)); }
      vis.split(/(\s+)/).forEach((w) => { if (!w) return; _txt(w, xx, ly, f(), /\s/.test(w) ? HT.fg : colOf(w, l), 'left'); xx += tw(w, f()); });
      if (i === lines.length - 1 && n < s_.length && Math.floor(t * 2.4) % 2 === 0) rect(xx + 3, ly - z * 0.8, Math.max(3, z * 0.08), z * 1.0, HT.fg);
      regBox(ov, x, ly - z * 0.8, tw(s_, f()), z, { text: s_, def: l.s }); });
  }, { label: 'request / response (drag, resize)' })));
}; };

/* ---------- FD.table: big codes, no white cards ---------- */
FD.table = (o) => { (o.cells || []).flat().forEach(c => c && FD.snd('pop', c.at, -7)); (o.hi || []).forEach(h => FD.snd('tick', h.at, -4)); return (t, r) => {
  r = HT.bg(r); const m = FD.m(r);
  let y = r.y + m; if (o.kicker) { FD.kicker(t, o.kicker, r.x + m, y + V(30, 32), V(32, 34), HT.dim, o.kickerAt); y += V(76, 80); }
  const nr = o.cells.length, nc = o.cells[0].length; const rowW = o.rows ? V(300, 0) : 0; const colH = o.cols ? V(72, 120) : 0;
  const gx = r.x + m + rowW, gw = r.w - 2 * m - rowW, gh = r.y + r.h - m - (o.capRoom != null ? o.capRoom : FD.CR()) - y - colH;
  const cw = gw / nc, ch = Math.min(gh / nr, cw * 0.9); const gy = y + colH + Math.max(0, (gh - ch * nr) / 2);
  if (o.cols) o.cols.forEach((s, j) => withA(fdE(t, (o.colsAt || [])[j] != null ? o.colsAt[j] : o.kickerAt || 0, 0.3), () => { const fz = V(34, 32); const ls = FD.wrap(s.toUpperCase(), FM(fz), cw - 30);
    ls.forEach((l, k) => txt(l, gx + j * cw + cw / 2, gy - V(24, 24) - (ls.length - 1 - k) * fz * 1.2, FM(fz), HT.dim, 'center', 'alphabetic', 1, 'col' + j + (k ? '-' + k : ''))); }));
  o.cells.forEach((row, i) => { if (o.rows) withA(fdE(t, (o.rowsAt || [])[i] != null ? o.rowsAt[i] : (row[0] || {}).at || 0, 0.3), () => {
      const fz = V(40, 34); if (PORTRAIT) txt(o.rows[i].toUpperCase(), gx + 12, gy + i * ch + fz + 8, FM(fz), HT.dim, 'left', 'alphabetic', 1, 'row' + i);
      else txt(o.rows[i].toUpperCase(), r.x + m, gy + i * ch + ch / 2 + fz * 0.35, FM(fz), HT.dim, 'left', 'alphabetic', 1, 'row' + i); });
    row.forEach((cell, j) => { if (!cell) return; const p = fdE(t, i === 0 && j === 0 ? FD.lead(cell.at) : cell.at, 0.45, 'outQuint'); if (p <= 0) return;
      const x0 = gx + j * cw + 10, y0 = gy + i * ch + 10, w0 = cw - 20, h0 = ch - 20; const hi = (o.hi || []).find(h => h.row === i && h.col === j && t >= h.at); const hp = hi ? fdE(t, hi.at, 0.35) : 0;
      const tile = !!cell.ground; const anyHi = (o.hi || []).some(h => t >= h.at);
      grp('cell-' + i + '-' + j, x0, y0, w0, h0, () => withA(p * (anyHi && !hi ? 0.4 : 1), () => withT(0, (1 - p) * 30, 1, 0, () => {
        if (tile) fillRR(x0, y0, w0, h0, 18, FD.col(cell.ground));
        const fg = tile ? FD.ink : HT.ink(cell.c); let s = Math.min(h0 * (cell.name ? 0.42 : 0.62), w0 * 0.75 / (String(cell.c).length * 0.58));
        const nz0 = cell.name ? Math.min(V(46, 40), h0 * 0.14) : 0; const stackH = s * 0.8 + (cell.name ? nz0 * 1.7 : 0);
        const cy = y0 + (h0 - stackH) / 2 + s * 0.8 + (PORTRAIT && o.rows ? 22 : 0);
        txt(cell.c, x0 + w0 / 2, cy, FN(s), fg, 'center', 'alphabetic', 0, 'code-' + i + '-' + j);
        if (hp > 0) rect(x0 + w0 / 2 - tw(cell.c, FN(s)) / 2, cy + s * 0.1, tw(cell.c, FN(s)) * hp, Math.max(8, s * 0.06), fg);
        if (cell.name) { let nz = Math.min(V(46, 40), h0 * 0.14); while (tw(cell.name, FS(nz, 600)) > w0 - 24 && nz > 26) nz -= 2; txt(cell.name, x0 + w0 / 2, cy + s * 0.12 + nz * 1.3, FS(nz, 600), tile ? FD.ink : HT.fg, 'center', 'alphabetic', 0, 'name-' + i + '-' + j); }
      })), { label: 'code' }); }); });
}; };

/* ---------- FD.mistake: the counter + one big code, dark ---------- */
FD.mistake = (o) => { FD.snd('ratchet', o.at + 0.4, -4); return (t, r) => {
  r = HT.bg(r); const A = HT.area(r, o); const wide = r.w > r.h * 1.25; const big = o.big || ''; const col = HT.ink(o.code || big);
  const s = wide ? Math.min(A.h * 0.62, r.w * 0.24) : Math.min(A.h * 0.28, r.w * 0.4); const cells = FD.seqs([[o.at, String(o.from || o.n)], [o.at + 0.15, String(o.n)]]);
  const cx = A.x, cy = wide ? A.y + A.h / 2 + s * 0.36 : A.y + V(0, 90) + s * 0.8; const cw = tw('0', FN(s));
  grp('count', cx, cy - s * 0.8, cw * 2.2, s * 0.86, () => { withA(fdE(t, o.at - 0.1, 0.25), () => FD.odo(t, cells, cx, cy, s, { col: HT.fg }));
    withA(fdE(t, o.at + 0.3, 0.3), () => txt('/ ' + (o.of || 4), cx + cw * 1.05, cy, FN(s * 0.42), HT.dim, 'left', 'alphabetic', 0, 'of')); }, { label: 'mistake number' });
  const tx = wide ? cx + cw * 1.05 + tw('/ ' + (o.of || 4), FN(s * 0.42)) + A.m : A.x, aw = wide ? r.x + r.w - A.m - tx : A.w;
  let z = wide ? s * 0.8 : V(150, 170); while (tw(UP(big), FN(z)) > aw && z > 40) z -= 4; const by = wide ? cy : cy + z * 1.3;
  FD.words(t, UP(big), tx, by, FN(z), col, 'm-big', { at: o.bigAt || o.at + 0.5, stagger: 0.06 });
}; };

/* ---------- HT.trip: a request travels, the response comes back ---------- */
/** o.nodes [{k: 'laptop'|'server'|'gate'|'person', x, y (0..1 of the area), label, col}], o.legs [{a, b, at, dur, s (text on the way), code, ret}],
 *  o.burst {a, b, at, n, gap, back: '429'} (many requests), o.fail {node, at} (the node turns red), o.wait {node, at, until} (a spinner),
 *  o.code {c | codes, at, name} (a big code, bottom-left), o.cross {node, at} (a red cross over a node) */
HT.trip = (o) => { (o.legs || []).forEach(l => FD.snd(l.code ? 'pop' : 'tick', l.at, -7)); if (o.fail) FD.snd('ratchet', o.fail.at, -6); return (t, r) => {
  r = HT.bg(r); const A = HT.area(r, o); const port = r.h > r.w * 1.3; const s = Math.min(A.w, A.h * 1.6) * (port ? 0.17 : 0.15);
  const P = (n) => [A.x + A.w * (port && n.py != null ? n.px : n.x), A.y + A.h * (port && n.py != null ? n.py : n.y)];
  // the track
  (o.legs || []).forEach((l) => { const [x0, y0] = P(o.nodes[l.a]), [x1, y1] = P(o.nodes[l.b]); const p = fdE(t, l.at - 0.3, 0.4); if (p <= 0 || l.ret) return;
    withA(p * 0.5, () => { ctx.save(); ctx.strokeStyle = HT.dim; ctx.lineWidth = Math.max(3, s * 0.04); ctx.setLineDash([2, s * 0.18]); ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke(); ctx.restore(); }); });
  o.nodes.forEach((n, i) => { const [x, y] = P(n); const p = fdE(t, n.at != null ? FD.lead(n.at) : FD.lead(o.at || 0), 0.5, 'outBack'); if (p <= 0) return;
    const failed = o.fail && o.fail.node === i && t >= o.fail.at; const col = failed ? FD.g5 : n.col || HT.fg; const sh = failed ? Math.sin((t - o.fail.at) * 50) * 6 * (1 - clamp((t - o.fail.at) / 0.4)) : 0;
    grp('node-' + i, x - s, y - s, s * 2, s * 2, () => withA(p, () => withT(x + sh, y, p, 0, () => { const k = n.k || 'server';
      if (k === 'laptop') HT.laptop(0, 0, s, col); else if (k === 'gate') HT.gate(0, 0, s, col); else if (k === 'person') HT.person(0, 0, s, col); else HT.server(0, 0, s, col, failed ? FD.g5 : FD.g2); })), { label: 'object' });
    if (n.label) withA(p, () => txt(n.label, x, y + s * 1.2, FM(Math.max(30, s * 0.3)), HT.dim, 'center', 'alphabetic', 1, 'node-label' + i));
    if (o.wait && o.wait.node === i && t >= o.wait.at && t < (o.wait.until || 1e9)) HT.spinner(t, x, y - s * 1.25, s * 0.5, HT.fg);
    if (o.cross && o.cross.node === i && t >= o.cross.at) { const q = fdE(t, o.cross.at, 0.35, 'outBack'); withT(x + s * 0.8, y - s * 0.8, q, 0, () => { circle(0, 0, s * 0.32, FD.g5); _txt('×', 0, s * 0.14, FN(s * 0.5), HT.night, 'center'); }); }
  });
  const move = (l, label, col, k = 0) => { const [x0, y0] = P(o.nodes[l.a]), [x1, y1] = P(o.nodes[l.b]); const d = l.dur || 0.7; const q = (t - l.at - k) / d; if (q < 0 || q > 1.35) return;
    const e = E.inOutCubic(clamp(q)); const x = lerp(x0, x1, e), y = lerp(y0, y1, e) - Math.sin(e * Math.PI) * s * 0.35; const fade = q > 1 ? 1 - (q - 1) / 0.35 : 1;
    withA(fade, () => { HT.env(x, y, s * 0.55, col); if (label) withA(l.code ? 1 : 1 - clamp((e - 0.75) / 0.2), () => _txt(label, x, y - s * 0.5, FM(Math.max(30, s * 0.3)), col === HT.fg ? HT.fg : col, 'center')); }); };
  (o.legs || []).forEach((l) => move(l, l.s || l.code, l.code ? HT.ink(l.code) : HT.fg));
  if (o.burst) { const b = o.burst; for (let i = 0; i < (b.n || 8); i++) move({ a: b.a, b: b.b, at: b.at + i * (b.gap || 0.18), dur: 0.55 }, null, i >= (b.okN || 5) ? FD.c4 : HT.fg);
    if (b.back != null) for (let i = (b.okN || 5); i < (b.n || 8); i++) move({ a: b.b, b: b.a, at: b.at + i * (b.gap || 0.18) + 0.6, dur: 0.55 }, b.back, FD.c4); }
  if (o.code) { const codes = o.code.codes || [[o.code.at, o.code.c]]; const cells = FD.seqs(codes); const cur = [...codes].reverse().find(q => t >= q[0]) || codes[0]; const cs = Math.min(A.h * 0.3, V(220, 260));
    const cx = A.x, cy = A.y + A.h; grp('trip-code', cx, cy - cs * 0.8, tw('0', FN(cs)) * cells.length, cs * 0.86, () => withA(fdE(t, codes[0][0], 0.3), () => FD.odo(t, cells, cx, cy, cs, { col: HT.ink(cur[1]) })));
    const nm = [...(o.code.names || [[o.code.at, o.code.name]])].reverse().find(x => x[1] && t >= x[0]); if (nm) withA(fdE(t, nm[0] + 0.1, 0.3), () => txt(UP(nm[1]), cx + tw('0', FN(cs)) * cells.length + A.m * 0.5, cy - cs * 0.05, FN(V(64, 56)), HT.fg, 'left', 'alphabetic', 0, 'trip-name')); }
}; };

/* ---------- HT.net: a generic browser network panel ---------- */
/** o.rows [{m, path, c, at}], o.digitAt (the first digit of every status lights up), o.focus [{at, d: '4'}] (rows of that class stay, the rest dim) */
HT.net = (o) => { o.rows.forEach(rw => FD.snd('tick', rw.at, -9)); return (t, r) => {
  r = HT.bg(r); const A = HT.area(r, o); const z = Math.min(V(50, 44), A.h / (o.rows.length + 2) / 1.5); const lh = z * 1.75; const f = FM(z);
  const colS = A.x + A.w * (PORTRAIT ? 0.66 : 0.62), colT = A.x + A.w * 0.84; let y = A.y + Math.max(0, (A.h - lh * (o.rows.length + 1)) / 2) + z;
  withA(fdE(t, FD.lead(o.rows[0].at) - 0.2, 0.3), () => { txt('Name', A.x, y, FM(z * 0.7), HT.dim, 'left', 'alphabetic', 1, 'net-h1'); txt('Status', colS, y, FM(z * 0.7), HT.dim, 'left', 'alphabetic', 1, 'net-h2');
    if (!PORTRAIT) txt('Time', colT, y, FM(z * 0.7), HT.dim, 'left', 'alphabetic', 1, 'net-h3'); rect(A.x, y + z * 0.5, A.w, 2, 'rgba(237,237,230,0.12)'); });
  y += lh; const foc = [...(o.focus || [])].reverse().find(q => t >= q.at); const dg = o.digitAt != null ? fdE(t, o.digitAt, 0.4) : 0;
  o.rows.forEach((rw, i) => { const p = fdE(t, i === 0 ? FD.lead(rw.at) : rw.at, 0.35); if (p <= 0) return; const ry = y + i * lh; const on = !foc || String(rw.c)[0] === foc.d;
    withA(p * (on ? 1 : 0.22), () => withT(0, (1 - p) * 12, 1, 0, () => { if (i % 2 === 0) rect(A.x - 16, ry - z * 1.05, A.w + 32, lh, 'rgba(237,237,230,0.04)');
      _txt(rw.m + ' ', A.x, ry, f, HT.blue, 'left'); _txt(rw.path, A.x + tw(rw.m + ' ', f), ry, f, HT.fg, 'left');
      const c = String(rw.c); const col = HT.ink(c); _txt(c, colS, ry, f, col, 'left');
      if (dg > 0) { const w0 = tw(c[0], f); fillRR(colS - z * 0.15, ry - z * 0.95, (w0 + z * 0.3) * dg, z * 1.25, z * 0.2, col); _txt(c[0], colS, ry, f, HT.night, 'left'); }
      if (!PORTRAIT) _txt(rw.ms || (40 + (i * 37) % 300) + ' ms', colT, ry, f, HT.dim, 'left');
      if (foc && on) rect(A.x - 16, ry - z * 1.05, 6, lh, col); })); });
}; };

/* ---------- HT.who: 401 (who are you?) vs 403 (I know you, but no) ---------- */
HT.who = (o) => { FD.snd('pop', o.at, -6); FD.snd('pop', o.at2, -6); FD.snd('tick', o.denyAt, -4); return (t, r) => {
  r = HT.bg(r); const A = HT.area(r, o); const port = r.h > r.w * 1.3; const s = Math.min(A.w * (port ? 0.22 : 0.12), A.h * 0.24);
  const spots = port ? [[A.x + A.w * 0.5, A.y + A.h * 0.25], [A.x + A.w * 0.5, A.y + A.h * 0.72]] : [[A.x + A.w * 0.25, A.y + A.h * 0.45], [A.x + A.w * 0.72, A.y + A.h * 0.45]];
  [[o.at, '401'], [o.at2, '403']].forEach(([at, c], i) => { const p = fdE(t, at, 0.5, 'outBack'); if (p <= 0) return; const [x, y] = spots[i];
    grp('who-' + c, x - s * 1.8, y - s * 1.6, s * 3.6, s * 3.4, () => withA(clamp(p), () => withT(x, y, p, 0, () => {
      HT.person(0, 0, s, i ? HT.fg : 'rgba(237,237,230,0.35)');
      if (!i) { const q = fdE(t, at + 0.35, 0.4, 'outBack'); withT(s * 0.9, -s * 1.1, q, 0, () => { circle(0, 0, s * 0.42, FD.c4); _txt('?', 0, s * 0.2, FN(s * 0.6), HT.night, 'center'); }); }
      else { fillRR(-s * 0.3, s * 0.12, s * 0.6, s * 0.36, s * 0.06, FD.g2); ctx.save(); ctx.strokeStyle = HT.night; ctx.lineWidth = s * 0.07; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(-s * 0.12, s * 0.3); ctx.lineTo(-s * 0.02, s * 0.4); ctx.lineTo(s * 0.16, s * 0.2); ctx.stroke(); ctx.restore();
        const q = fdE(t, o.denyAt, 0.4, 'outBack'); if (q > 0) withT(s * 1.25, -s * 0.2, q, 0, () => HT.lock(0, 0, s * 0.6, FD.g5)); }
      txt(c, 0, s * 1.75, FN(s * 0.8), FD.c4, 'center', 'alphabetic', 0, 'who-code-' + c); })), { label: 'person' }); });
}; };

/* ---------- HT.admins: two admins, one book, the old price comes back ---------- */
HT.admins = (o) => { [o.at, o.aAt, o.bAt, o.saveAt].forEach(a => FD.snd('tick', a, -7)); FD.snd('ratchet', o.oldAt, -6); return (t, r) => {
  r = HT.bg(r); const A = HT.area(r, o); const port = r.h > r.w * 1.3; const s = Math.min(A.w * (port ? 0.17 : 0.12), A.h * 0.2);
  const pa = port ? [A.x + A.w * 0.22, A.y + A.h * 0.78] : [A.x + A.w * 0.12, A.y + A.h * 0.55], pb = port ? [A.x + A.w * 0.78, A.y + A.h * 0.78] : [A.x + A.w * 0.88, A.y + A.h * 0.55];
  const bc = port ? [A.x + A.w * 0.5, A.y + A.h * 0.3] : [A.x + A.w * 0.5, A.y + A.h * 0.45];
  const p0 = fdE(t, FD.lead(o.at), 0.5, 'outBack'); if (p0 <= 0) return;
  const price = t >= o.oldAt ? o.p0 : t >= o.aAt + 0.5 ? o.p1 : o.p0; const bad = t >= o.oldAt; const good = !bad && t >= o.aAt + 0.5;
  // the book
  const bw = s * 2.6, bh = s * 3.4; withA(p0, () => grp('book', bc[0] - bw / 2, bc[1] - bh / 2, bw, bh, () => { const sh = bad ? Math.sin((t - o.oldAt) * 50) * 8 * (1 - clamp((t - o.oldAt) / 0.4)) : 0;
    withT(sh, 0, 1, 0, () => { fillRR(bc[0] - bw / 2, bc[1] - bh / 2, bw, bh, s * 0.12, FD.g4); rect(bc[0] - bw / 2 + s * 0.22, bc[1] - bh / 2, s * 0.12, bh, 'rgba(17,17,20,0.25)');
      txt('42', bc[0] + s * 0.1, bc[1] - bh * 0.12, FN(s * 1.2), FD.ink, 'center', 'alphabetic', 0, 'book-n');
      fillRR(bc[0] - bw * 0.36, bc[1] + bh * 0.08, bw * 0.72, s * 0.9, s * 0.45, bad ? FD.g5 : good ? FD.g2 : HT.fg); txt(price, bc[0], bc[1] + bh * 0.08 + s * 0.64, FN(s * 0.62), FD.ink, 'center', 'alphabetic', 0, 'book-price'); }); }, { label: 'book' }));
  // the two admins
  [[pa, 'A', o.at], [pb, 'B', o.at + 0.15]].forEach(([p, n, at], i) => { const q = fdE(t, at, 0.5, 'outBack'); if (q <= 0) return;
    withA(clamp(q), () => withT(p[0], p[1], q, 0, () => { HT.person(0, 0, s, HT.fg); txt(n, 0, s * 1.35, FN(s * 0.55), HT.dim, 'center', 'alphabetic', 0, 'admin-' + n);
      if (i === 1 && t >= o.bAt) { const k = fdE(t, o.bAt, 0.4, 'outBack'); withT(0, -s * 1.5, k, 0, () => { fillRR(-s * 0.9, -s * 0.45, s * 1.8, s * 0.8, s * 0.4, 'rgba(237,237,230,0.18)'); _txt(o.p0, 0, s * 0.12, FN(s * 0.45), HT.fg, 'center'); }); } })); });
  // saves: A sends the new price, B sends the old one
  const send = (from, at, col, lab) => { const q = (t - at) / 0.7; if (q < 0 || q > 1.3) return; const e = E.inOutCubic(clamp(q)); const x = lerp(from[0], bc[0], e), y = lerp(from[1], bc[1], e) - Math.sin(e * Math.PI) * s;
    withA(q > 1 ? 1 - (q - 1) / 0.3 : 1, () => HT.env(x, y, s * 0.6, col, lab, col)); };
  send(pa, o.aAt - 0.2, FD.g2, o.p1); send(pb, o.saveAt, HT.fg, o.p0);
  if (o.code && t >= o.code.at) { const q = fdE(t, o.code.at, 0.4, 'outBack'); withT(bc[0], bc[1] + bh * 0.5 + s * 1.2, q, 0, () => txt(o.code.c, 0, 0, FN(s * 1.1), FD.c4, 'center', 'alphabetic', 0, 'admins-code')); }
}; };

/* ---------- HT.phone: the one form, a modern phone screen (401: log in -> 403: no access) ---------- */
HT.phone = (o) => { FD.snd('shutter', o.at, -7); FD.snd('pop', o.msgAt, -6); return (t, r) => {
  r = HT.bg(r); const A = HT.area(r, { capRoom: 0 }); const ph = Math.min(r.h * 0.86, 940), pw = ph * 0.5; const port = r.h > r.w * 1.3;
  const px = port ? r.x + (r.w - pw) / 2 : r.x + r.w * 0.56 - pw / 2, py = r.y + (r.h - ph) / 2; const a = fdE(t, FD.lead(o.at), 0.5); if (a <= 0) return;
  // the code beside the phone (rolls 401 -> 403)
  const codes = [[o.at, '401'], [o.msgAt, '403']]; const cells = FD.seqs(codes); const cs = port ? 0 : Math.min(260, (px - A.x - 40) / 1.9);
  if (cs > 60) grp('phone-code', A.x, r.y + r.h * 0.5 - cs * 0.4, tw('0', FN(cs)) * 3, cs * 0.86, () => withA(a, () => FD.odo(t, cells, A.x, r.y + r.h * 0.5 + cs * 0.4, cs, { col: FD.c4 })));
  withA(a, () => withT(0, (1 - a) * 60, 1, 0, () => grp('phone', px, py, pw, ph, () => {
    const P = devicePhone(px, py, pw, ph, null, { screen: '#FBFBF7' }); const sx = P.sx, sy = P.sy, sw = P.sw, sh = P.sh;   // realistic phone (2026-11-09)
    const m = 34; const msg = fdE(t, o.msgAt, 0.45); const k = clamp(msg);
    ctx.save(); rr(sx, sy, sw, sh, pw * 0.133); ctx.clip();
    withT(-sw * E.inOutCubic(k), 0, 1, 0, () => { let y = sy + 150; txt(o.title || 'Log in', sx + m, y, FN(58), FD.ink, 'left', 'alphabetic', 0, 'phone title'); y += 60;
      [['Email', o.email || 'you@example.com'], ['Password', '••••••••']].forEach(([lab, v], i) => { txt(lab.toUpperCase(), sx + m, y + 26, FM(24), '#6B6B6B', 'left', 'alphabetic', 1, 'phone label ' + i); y += 44;
        fillRR(sx + m, y, sw - 2 * m, 84, 18, '#EEEEE8'); const n = Math.round(v.length * clamp((t - o.at - 0.4 - i * 0.6) / 0.6)); _txt(v.slice(0, n), sx + m + 24, y + 54, FS(34, 500), FD.ink, 'left'); y += 120; });
      fillRR(sx + m, y + 10, sw - 2 * m, 90, 45, FD.ink); txt(o.btn || 'Log in', sx + sw / 2, y + 68, FS(36, 600), '#FFFFFF', 'center', 'alphabetic', 0, 'phone btn'); });
    withT(sw * (1 - E.inOutCubic(k)), 0, 1, 0, () => { if (k <= 0) return; const cy = sy + sh * 0.4; HT.lock(sx + sw / 2, cy, 120, FD.g5);
      const ls = FD.wrap(o.msg || "You don't have access to this", FS(40, 600), sw - 2 * m); ls.forEach((l, i) => txt(l, sx + sw / 2, cy + 170 + i * 52, FS(40, 600), FD.ink, 'center', 'alphabetic', 0, 'phone msg ' + i)); });
    ctx.restore();
  }, { label: 'phone' })));
}; };
