/* scholarships talking-head edit: the look ("NOW BOARDING", her pick 2026-11-02) for the full edit, shorts and teaser.
 * The film's kit (../film/scenes/kit.js: flaps, board, gate, pass, clip, photo, correction) is loaded before this file
 * (talking-head.json "common"), so the edit draws the same departures board, real pages and city photos as the film.
 * City photos sit BEHIND her (L17 presenter cut-out) when she talks about each country (her pick: C's photos).
 * 16:9 captions (type set 06, her rule 2026-11-07: no outlined captions): Inter Tight 600, solid off-white, a soft shadow only. */
'use strict';
PLATE.term = [NB.flap, NB.let, NB.let];
Object.assign(TH.look, {
  disp: (s) => F.disp(s), dispLS: 0, upper: true, font: 'disp',
  fg: NB.let, ink: NB.flap, acc: NB.let, accOnDark: NB.let,
  ground: 'term', cardGround: 'term', grid: false, panel: 'term',
  outline: NB.let, outlinePx: 0, ring: 'rgba(243,240,232,0.5)', ringPx: 1, corner: 'auto', plate: 'term', dim: 0.38,
  band: NB.ground, capFit: true, talk: { z: [1.0, 1.06] },
});

/* ---------- graphics for the layouts (draw(t, r): r = the panel the layout gives) ---------- */
const SC = {};
/** a graphite panel with a padded inner rect (captions keep their band in 16:9 full-frame use: o.capRoom) */
SC.wrap = (fn, o = {}) => (t, r) => {
  const g0 = g; g = G.term; if (!o.noBg) rect(r.x, r.y, r.w, r.h, NB.ground);
  const p = o.pad != null ? o.pad : V(64, 48); const top = o.top != null ? o.top : p; const bot = o.capRoom != null ? o.capRoom : p;
  const ir = { x: r.x + p, y: r.y + top, w: r.w - 2 * p, h: r.h - top - bot };
  ctx.save(); ctx.beginPath(); ctx.rect(r.x, r.y, r.w, r.h); ctx.clip(); fn(t, ir, r); ctx.restore(); g = g0;
};
/** the departures board (compact two-line rows when the panel is narrow) */
SC.board = (o) => SC.wrap((t, ir) => board(t, ir, { compact: PORTRAIT || ir.w < 1300, ...o }), { top: V(70, 56) });
/** a real official page with its highlight + source line (o: at, hlAt, src, title: a mono line above it) */
SC.clip = (name, o = {}) => SC.wrap((t, ir) => {
  let y = ir.y; if (o.title) { lab(o.title, ir.x, y + 30, V(32, 32), NB.let, 'left', { key: 'title' }); y += 70; }
  if (o.flap) { const cw = Math.min(V(64, 60), cellFit(o.flap.length, ir.w, 64)), ch = Math.round(cw * 1.75); flaps(t, { x: ir.x, y, n: o.flap.length, cw, ch, text: o.flap, key: 'flap', t0: o.flapAt == null ? o.at : o.flapAt, stag: 0.03, col: o.flapCol || NB.let }); y += ch + 50; }
  const h = ir.y + ir.h - y - 70; clip(t, { x: ir.x, y: y + Math.max(0, (h - CLIPS[name].h * Math.min(1, ir.w / CLIPS[name].w)) / 2) * (o.middle ? 1 : 0), w: ir.w, h }, name, { maxH: h, ...o });
}, o);
/** a city photo behind her (L17 presenter) with the country in flaps on the side away from her */
SC.city = (name, title, o = {}) => (t, r) => {
  const n = title.length, cw = o.cw || Math.min(V(70, 62), cellFit(n, V(r.w * 0.5, r.w - 112), 70)), gap = Math.max(3, Math.round(cw * 0.09)), wT = n * cw + (n - 1) * gap;
  const tx = PORTRAIT ? (W - wT) / 2 : (o.side === 'left' ? r.x + r.w - wT - 80 : r.x + 80);
  const ty = PORTRAIT ? Math.max(TH.labelBottom() + 40, r.y + 80) : r.y + 90;
  photo(t, r, name, { at: o.at, dur: o.dur || 8, dim: o.dim == null ? 0.22 : o.dim, title, sub: o.sub, cw, tx, ty, credit: true, creditX: PORTRAIT ? W - 30 : (o.side === 'left' ? r.x + r.w - 30 : r.x + 520), creditY: PORTRAIT ? ty - 20 : r.y + r.h - 30 });
};
/** a short stack of flap rows (label + value), centred in the panel */
SC.flapsCard = (rows, o = {}) => SC.wrap((t, ir) => {
  const nMax = Math.max(...rows.map(r_ => r_.v.length)); const cw = Math.min(o.cw || V(64, 60), cellFit(nMax, ir.w, 70)), ch = Math.round(cw * 1.75);
  const hTot = rows.length * (ch + 76); let y = ir.y + Math.max(0, (ir.h - hTot) / 2) + 40;
  rows.forEach((r_, i) => { const a = ez(t, r_.at - 0.35, 0.25); if (r_.k) withA(1, () => lab(r_.k, ir.x, y - 16, V(32, 30), g.mid, 'left', { key: 'k' + i }));
    withA(a, () => flaps(t, { x: ir.x, y, n: nMax, cw, ch, text: r_.v, key: 'v' + i, t0: r_.at, stag: 0.025, col: stCol(r_.st) })); y += ch + 76; });   // a row arrives just before its word (no empty cells waiting)
}, o);
/** the topic title in flaps (the opening, behind her) */
SC.title = (lines, at) => SC.wrap((t, ir) => {
  const n = Math.max(...lines.map(l => l.length)); const cw = Math.min(V(78, 74), cellFit(n, ir.w, 80)), ch = Math.round(cw * 1.72);
  flapLines(t, { lines, cx: PORTRAIT ? W / 2 : ir.x + (n * cw * 1.09) / 2, y: PORTRAIT ? Math.max(TH.labelBottom() + 60, ir.y + 40) : ir.y + 90, cw, ch, t0: at, stag: 0.035, lineStag: 0.14, n, keyBase: 'title' });
  withA(ez(t, at + 1.0, 0.4), () => lab('Checked 2 Nov 2026', PORTRAIT ? W / 2 : ir.x, PORTRAIT ? ir.y + 40 + lines.length * ch * 1.16 + 60 : ir.y + 90 + lines.length * ch * 1.16 + 70, V(32, 30), g.mid, PORTRAIT ? 'center' : 'left', { key: 'checked' }));
}, { top: V(60, 40) });

/* ---------- 16:9 captions: Inter Tight 600, sentence case as spoken, solid fill + soft shadow (no stroke, no box) ---------- */
// window edges (tile / over-the-shoulder): a 1 px hairline, never a thick frame
{ const tile0 = TH.tile, ots0 = TH.ots; TH.tile = (s, o = {}) => tile0(s, { edgePx: 1, edge: 'rgba(243,240,232,0.45)', ...o }); TH.ots = (s, o = {}) => ots0(s, { edgePx: 1, edge: 'rgba(243,240,232,0.45)', ...o }); }
drawCaptions16 = function (t, opt = {}) {
  const cs = FOOT.caps16 || []; let c = null; for (const x of cs) if (x.t0 <= t && t < x.t1) c = x; if (!c) return;
  const st = capSliderInfo(); const size0 = clamp(Math.round(st.size * 0.62), 36, 110); const yc = clamp(st.y, CAPSIZE.y16[0], CAPSIZE.y16[1]);
  const ce = (EDIT.data.cap16 || {})[c.i]; const text = ce != null ? ce : c.text; const up = text; const CF = (z) => `600 ${z}px "Inter Tight"`;
  const cam = camAt(t); let cx = CX, maxW = W * 0.78;
  if (FOOT.capX) { cx = FOOT.capX[0]; maxW = Math.min(maxW, FOOT.capX[1]); }
  else if (cam.boxed) { const b = cam.box; if (b[2] < W * 0.4 || b[3] < H * 0.5) { if (!opt.onFilm) return; } else { cx = b[0] + b[2] / 2; maxW = Math.min(maxW, b[2] * 0.88); } }
  let size = size0, lines = up.includes('\n') ? up.split('\n') : capLines2(up, CF(size), 0, maxW);
  while (size > size0 * 0.64 && Math.max(...lines.map(l => tw(l, CF(size)))) > maxW) { size = Math.round(size * 0.93); lines = up.includes('\n') ? up.split('\n') : capLines2(up, CF(size), 0, maxW); }
  const f = CF(size), lh = size * 1.18; const bw = Math.max(...lines.map(l => tw(l, f))), bh = lines.length * lh; const by = yc - bh / 2;
  ctx.save(); ctx.setTransform(...BASE); ctx.globalAlpha = 1; ctx.filter = 'none'; setFont(f); ctx.textAlign = 'center'; ctx.textBaseline = 'alphabetic'; ctx.lineJoin = 'round';
  ctx.shadowColor = 'rgba(0,0,0,0.6)'; ctx.shadowBlur = size * 0.35; ctx.shadowOffsetY = size * 0.04;
  lines.forEach((l, k) => { const y = by + size * 0.9 + k * lh; ctx.fillStyle = '#F3F0E8'; ctx.fillText(l, cx, y); });
  ctx.restore();
  regBox({ id: 'caption/' + c.i, edited: ce != null, hide: false }, cx - bw / 2, by, bw, bh, { kind: 'caption', text, def: c.text, cue: c.i, cap16: true, box: 0 });
};
