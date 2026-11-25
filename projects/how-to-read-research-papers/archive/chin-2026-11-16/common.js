/* how-to-read-research-papers: the talking-head look = the film's A · THE MARGIN (her pick 2026-11-02) + B's "Figure 2"
 * (her picture as the figure on a paper page, DM Serif caption), drawn in A's paper and type. The graphics (RP.*) live in
 * film/scenes/rp.js (loaded first). This file sets TH.look, the full-frame insert, the black phrase card, Figure 2, her
 * captions in this look (16:9 full edit and 9:16 shorts: condensed Helvetica caps, the key word on a highlighter block,
 * catalogue C1/C2) and each short's top title (a paper card, T3 drawn as paper; or her words on the band with a pass tab).
 * Every text is editable: captions = "caption/<n>" (her caption fixes "cap16" / "capShort" and her size / height sliders
 * apply), the top label = "label/label" (text, size, place; *word* = italic). */
'use strict';
{ const r0 = TH.ready; TH.ready = async () => { await RPF; await document.fonts.load('600 60px "Inter Tight"'); await document.fonts.load('400 60px "DM Serif Display"'); return r0(); }; }
const SHORT = !!(FOOT.m && FOOT.m.kind === 'short');
Object.assign(TH.look, {
  disp: (s) => `400 ${s}px "DM Serif Display"`, dispLS: -0.02, upper: false, font: 'disp', capFit: true, kwHideCap: true,
  fg: RP.paper, ink: RP.ink, acc: RP.paper, accOnDark: RP.paper,
  ground: 'rpDesk', cardGround: 'rpInk', panel: 'rpPaper', grid: false,
  outline: RP.paper, outlinePx: 0, ring: 'rgba(0,0,0,0)', ringPx: 0, plate: 'rp', dim: 0.3,
  band: RP.desk, rule: 'rgba(251,250,244,0.25)', talk: { z: [1.0, 1.06] },
});

/** a full-frame graphic insert (an L9-style cutaway, no film): her voice goes on, captions on top */
RP.full = (s, draw, o = {}) => {
  const lead = o.lead == null ? 0.12 : o.lead, hold = o.hold == null ? 0.45 : o.hold;
  const at = (x, end) => (typeof x === 'number' ? x : end ? x.e + hold : x.t - lead);
  let t0, t1; if (Array.isArray(s)) { t0 = s[0]; t1 = s[1]; } else if (s.from != null) { t0 = at(s.from); t1 = at(s.to || s.from, true); } else { t0 = s.t - lead; t1 = s.e + hold; }
  if (o.until != null) t1 = o.until;
  TH.used = true; const id = o.id || 'insert-' + (++RPX.n); const enter = o.enter == null ? 0.3 : o.enter;
  TH.segs.push({ kind: 'cutaway', t0, t1, id, cover: true, card: false, ground: 'rpDesk', o,
    draw: (t) => { const p = enter ? E.outCubic(prog(t, t0, enter)) : 1; if (!PORTRAIT) FOOT.capX = [W / 2, W * 0.84];
      withT(0, (1 - p) * H * 0.06, 1, 0, () => draw(t, { x: 0, y: 0, w: W, h: H - (o.capRoom == null ? V(170, 0) : o.capRoom) }));
      if (o.capRoom !== 0 && !PORTRAIT) rect(0, H - V(170, 0), W, V(170, 0), RP.desk);
      if (p < 1) withA(1 - p, () => rect(0, 0, W, H, RP.desk)); } });
  if (o.sound) RP.sfx(o.sound, t0 + 0.05, o.db != null ? o.db : -5);
  return { t0, t1, id };
};
/** a black phrase card (kit 1g): near-black ground, her words in DM Serif Display, the key word ~italic~ */
RP.card = (s, lines, o = {}) => { const L = [].concat(lines).join('\n').replace(/~([^~]+)~/g, '*$1*'); const sp = Array.isArray(s) ? { t: s[0] + 0.12 } : s;
  RP.sfx('boom', (o.start != null ? o.start : sp.t - 0.12) + 0.02, -8);
  return RP.full(o.start != null ? [o.start, s.e + 0.4] : s, RP.head({ ground: 'rpInk', lines: L, align: 'center', at: (o.start != null ? o.start : sp.t - 0.12), size: V(118, 104), y: 0.5, sound: false }), { id: o.id, enter: 0, capRoom: 0, noCaps: true }); };   // her sentence-case card (DM Serif, italic key word in paper colour), hard cut
/** B's Figure 2 in A's look: her picture is the figure on a paper page (DM Serif), "Figure 2:" + her line under it */
RP.fig = (s, o = {}) => TH.page(s, { device: 'none', ground: 'rpDesk', panel: 'rpPaper', ar: V(16 / 10, 4 / 3), face: V(0.34, 0.36), ...o });

/* ======================= her captions in this look (C1: condensed caps, the key word on a highlighter block) ======================= */
RP.KEY = new Set(['novel', 'parts', 'imrad', 'abstract', 'method', 'methods', 'discussion', 'limitation', 'limitations', 'gap', 'keshav', 'passes', 'pass', 'three-pass', 'minutes', 'hour', 'hours',
  'title', 'introduction', 'headings', 'conclusion', 'references', 'category', 'context', 'correctness', 'contribution', 'clarity', 'evening', 'margin', 'print', 'figures', 'evidence', 'third', 're-implement',
  'assumptions', 'weak', 'idea', 'beginners', 'critically', 'published', 'sample', 'size', '12', 'chi', 'claim', 'survey', 'lab', 'students', 'nurses', 'funded', 'funding', 'cochrane', 'favored', 'notes',
  'zotero', 'free', 'terms', 'ai', 'wrong', 'thesis', 'trust', 'relevant', 'five', 'ten', 'question', 'first', 'second', 'cs', 'later', 'background', 'higher', 'percentage', 'attention', 'digitally']);
RP.keyIdx = (ws) => { let best = -1; ws.forEach((w, i) => { const n = w.toLowerCase().replace(/[^a-z0-9'-]/g, ''); if (RP.KEY.has(n)) best = i; }); return best; };   // the LAST key word (usually the payoff)
RP.capStyle = 'inter';
/** draw one caption block (set 05: Inter Tight 600 sentence case, or DM Mono 500 lowercase; solid fill, a soft shadow only,
 *  no outline; the key word on a highlighter block). words, centre x, centre y, size, max width; returns the box */
RP.capDraw = (text, cx, cy, z, maxW, st = RP.capStyle) => {
  const ws = text.split(/\s+/).filter(Boolean); const key = RP.keyIdx(ws); const mono = st === 'mono';
  const f = mono ? `500 ${Math.round(z * 0.86)}px "DM Mono"` : `600 ${z}px "Inter Tight"`; const lsp = mono ? 0 : -0.01 * z; const sp = z * (mono ? 0.5 : 0.26);
  const wd = (i) => tw(ws[i], f, lsp);
  const lines = []; let cur = []; ws.forEach((w, i) => { const nx = [...cur, i]; if (cur.length && nx.reduce((a, j) => a + wd(j), 0) + (nx.length - 1) * sp > maxW) { lines.push(cur); cur = [i]; } else cur = nx; }); if (cur.length) lines.push(cur);
  if (lines.length === 2) { const tot = ws.length; let best = null; for (let k = 1; k < tot; k++) { const A = [...Array(k).keys()], B = [...Array(tot - k).keys()].map(x => x + k); const m = Math.max(...[A, B].map(l => l.reduce((q, j) => q + wd(j), 0) + (l.length - 1) * sp)); if (m <= maxW && (!best || m < best[0])) best = [m, [A, B]]; } if (best) { lines.length = 0; lines.push(...best[1]); } }
  const lw = (l) => l.reduce((a, j) => a + wd(j), 0) + (l.length - 1) * sp; const lh = z * 1.16; const tot = (lines.length - 1) * lh; let bw = 0;
  lines.forEach((l, li) => { let x = cx - lw(l) / 2; const y = cy - tot / 2 + li * lh + z * 0.36; bw = Math.max(bw, lw(l));
    l.forEach(j => { const ww = wd(j);
      if (j === key) { rect(x - z * 0.12, y - z * 0.84, ww + z * 0.24, z * 1.08, RP.hi); _txt(ws[j], x, y, f, RP.ink, 'left', 'alphabetic', lsp); }
      else { ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.55)'; ctx.shadowBlur = z * 0.22; ctx.shadowOffsetY = z * 0.03; _txt(ws[j], x, y, f, '#FFFFFF', 'left', 'alphabetic', lsp); ctx.restore(); }
      x += ww + sp; }); });
  return [cx - bw / 2 - z * 0.15, cy - tot / 2 - z * 0.62, bw + z * 0.3, tot + z * 1.1];
};
/* 16:9: her full-edit captions in this look (the runtime's chunks, her fixes and sliders; placement as the runtime does it) */
if (!PORTRAIT) drawCaptions16 = function (t, opt = {}) {
  const cs = FOOT.caps16 || []; let c = null; for (const x of cs) if (x.t0 <= t && t < x.t1) c = x; if (!c) return;
  const st = capSliderInfo(); const kz = (EDIT.data.captions16 && EDIT.data.captions16.size) ? clamp(EDIT.data.captions16.size / CAP16.size, 0.5, 1.6) : 1;
  const yc = EDIT.data.captions16 && EDIT.data.captions16.y != null ? clamp(st.y, CAPSIZE.y16[0], CAPSIZE.y16[1]) : 950; let z = 60 * kz;
  const ce = (EDIT.data.cap16 || {})[c.i]; const text = (ce != null ? ce : c.text).replace(/\n/g, ' ');
  const cam = camAt(t); let cx = CX, maxW = W * 0.62;
  if (FOOT.capX) { cx = FOOT.capX[0]; maxW = Math.min(W * 0.7, FOOT.capX[1]); }
  else if (cam.boxed) { const b = cam.box; if (b[2] < W * 0.4 || b[3] < H * 0.5) { if (!opt.onFilm) return; } else { cx = b[0] + b[2] / 2; maxW = Math.min(maxW, b[2] * 0.86); } }
  if (maxW < 560) z *= 0.86;
  ctx.save(); ctx.setTransform(...BASE); ctx.globalAlpha = 1; ctx.filter = 'none';
  const box = RP.capDraw(text, cx, yc, z, maxW, RP.capStyle); ctx.restore();
  regBox({ id: 'caption/' + c.i, edited: ce != null, hide: false }, ...box, { kind: 'caption', text, def: c.text, cue: c.i, cap16: true });
};

/* ======================= shorts: top title + captions per short ======================= */
/** per short: lab 'card' (paper card, DM Serif Display, *italic*) | 'band' (her words on the graphite band, a pass tab) | 'pen' (paper
 *  card + a blue-pen line under it = sublabel); cap 'inter' | 'mono'; tab = the pass number for 'band' */
RP.SHORTS = { sh01: { lab: 'card', cap: 'inter', text: 'How to read a *research paper*' }, sh02: { lab: 'pen', cap: 'mono', text: 'The 3 parts of a paper *that matter most*', pen: 'read these first' },
  sh03: { lab: 'band', cap: 'inter', tab: 1, text: 'Read a research paper *in 10 minutes*' }, sh04: { lab: 'card', cap: 'mono', text: 'The *5 Cs* of reading a research paper' },
  sh05: { lab: 'band', cap: 'inter', tab: 2, text: 'How to read a research paper\nPass two' }, sh06: { lab: 'band', cap: 'mono', tab: 3, text: 'How to read a research paper: *pass three*' },
  sh07: { lab: 'card', cap: 'inter', text: 'Is this research paper *any good?*' }, sh08: { lab: 'pen', cap: 'inter', text: 'Check a research paper’s *method*', pen: 'does it match the question?' },
  sh09: { lab: 'card', cap: 'mono', text: 'Who *funded* this research paper?' }, sh10: { lab: 'pen', cap: 'mono', text: 'How I take *notes* on research papers', pen: 'print · Zotero' },
  sh11: { lab: 'card', cap: 'inter', text: 'When a research paper *still doesn’t make sense*' } };
RP.TEASER = !!(FOOT.m && FOOT.m.kind === 'teaser');
RP.style = SHORT ? (RP.SHORTS[FOOT.m.id] || { lab: 'card', cap: 'inter', text: FOOT.m.label }) : RP.TEASER ? { lab: 'none', cap: 'inter', text: '' } : null;
if (RP.style) {
  const SHs = TH.shortStyle; RP.capStyle = RP.style.cap; RP.labText = RP.style.text || FOOT.m.label; FOOT.m.label = '';   // the built-in label steps aside: this look draws its own
  const LX = 54, top = 120; const ST = RP.style;
  const E_ = () => EDIT.data.t['label/label']; const labStr = () => { const e = E_(); return e && e.s != null ? e.s : RP.labText; };
  const pos = () => { const e = E_(); return (e && e.pos && e.pos[LAYOUT]) || {}; }; const labK = () => pos().k || 1; const labDy = () => pos().dy || 0; const labHidden = () => { const e = E_(); return !!(e && e.hide) || !!pos().hide; };
  const z0 = ST.lab === 'band' ? 80 : 74; const padX = ST.lab === 'band' ? 6 : 40, padY = ST.lab === 'band' ? 0 : 30;
  const fN = (z) => `400 ${z}px "DM Serif Display"`, fI = (z) => `italic 400 ${z}px "DM Serif Display"`;
  const segs = (l) => l.split(/(\*[^*]+\*)/).filter(Boolean).map(p => p[0] === '*' ? [p.slice(1, -1), true] : [p, false]);
  const wordsOf = (s) => { const out = []; segs(s).forEach(([p, it]) => p.split(/(\s+)/).filter(x => x && !/^\s+$/.test(x)).forEach(w => out.push([w, it]))); return out; };
  const maxW = () => W - 2 * LX - 2 * padX - (ST.lab === 'band' ? 150 : 0);
  const lines = (s) => { const z = z0; const ws = wordsOf(s); const wd = ([w, it]) => tw(w, it ? fI(z) : fN(z)); const spc = z * 0.25; const out = []; let cur = [];
    ws.forEach(w => { const nx = [...cur, w]; if (cur.length && nx.reduce((a, q) => a + wd(q), 0) + (nx.length - 1) * spc > maxW()) { out.push(cur); cur = [w]; } else cur = nx; }); if (cur.length) out.push(cur);
    if (out.length === 2) { const lw = (l) => l.reduce((a, q) => a + wd(q), 0) + (l.length - 1) * spc; let best = null;   // balanced, never one word alone
      for (let k = 1; k < ws.length; k++) { const A = ws.slice(0, k), B = ws.slice(k); const m = Math.max(lw(A), lw(B)); if (m <= maxW() && (!best || m < best[0])) best = [m, [A, B]]; } if (best) return best[1]; }
    return out; };
  const labH = () => { const n = lines(labStr()).length; return n * z0 * 1.08 + 2 * padY + (ST.pen ? 60 : 0); };
  TH.labelBottom = () => (!PORTRAIT || labHidden() ? 0 : top + labDy() + labK() * labH() + 14);
  if (ST.lab === 'none') TH.labelBottom = () => 0;
  function drawLab(t) {
    if (!PORTRAIT || ST.lab === 'none') return; SCENE_ID = 'label'; EL.seen.clear(); const ov = ovr('label'); const str = ov.s != null ? ov.s : RP.labText;
    const ls = lines(str); const H_ = labH(); const info = { text: str, def: RP.labText, kind: 'box', sk: ov.k, label: 'top label (text, size, place; *word* = italic)' };
    if (ov.hide) { regBox(ov, LX, top, W - 2 * LX, H_, info); return; }
    moved(ov, () => {
      if (ST.lab !== 'band') rect(LX, top, W - 2 * LX, H_, RP.paper);
      const col = ST.lab === 'band' ? RP.paper : RP.ink; let y = top + padY + z0 * 0.86;
      ls.forEach(l => { let x = LX + padX; l.forEach(([w, it]) => { _txt(w, x, y, it ? fI(z0) : fN(z0), col, 'left', 'alphabetic', -0.015 * z0); x += tw(w, it ? fI(z0) : fN(z0)) + z0 * 0.25; }); y += z0 * 1.08; });
      if (ST.pen) _txt(ST.pen, LX + padX + 4, y + 18, `500 38px "DM Mono"`, RP.pen, 'left');
      if (ST.lab === 'band' && ST.tab) RP.tab(W - LX - 120, top + 6, ST.tab, 116, 1);
      regBox(ov, LX, top, W - 2 * LX, H_, info);
    }, [CX, top]);
  }
  if (PORTRAIT) TH.capOff.push([0, 1e9]);   // the built-in caption blocks step aside (they still make the .srt); this look draws them
  const capKw = (t) => (TH.kws || []).some(k => t >= k.sp.t0 && t < k.sp.t1);
  function drawCap(t) {
    if (!PORTRAIT || t >= FOOT.dur || !SHOW.captions || capKw(t)) return;
    if (RP.TEASER && typeof TZ !== 'undefined' && TZ.gaps().some(g => t >= g.t0 - 0.02 && t < g.t1 + 0.02)) return;   // no caption over a title card
    const c = (TH.caps || []).find(x => x.t0 <= t && t < x.t1); if (!c) return;
    const cst = EDIT.data.captions9 || {}; const kz = cst.size ? clamp(cst.size / SHs.cap.size, 0.6, 1.5) : 1; const dy = cst.y != null ? cst.y - SHs.cap.y : 0;
    const ce = (EDIT.data.capShort || {})[c.i]; const text = ce != null ? ce : c.text;
    let cy = (FOOT.capYNow || SHs.cap.y) + dy;
    if (RP.TEASER && typeof TZ !== 'undefined' && TZ.vis && cst.y == null) { const v = TZ.vis(); cy = Math.max(cy, v.y + v.h - 200); }   // 2026-11-13: the teaser's portrait captions sit low in the visible frame (9:16, 1:1, 4:5), off her face
    const box = RP.capDraw(text, CX, cy, (RP.capStyle === 'mono' ? 62 : 66) * kz, W - 130, RP.capStyle);
    regBox({ id: 'caption/' + c.i, edited: ce != null, hide: false }, ...box, { kind: 'caption', text, def: c.text, cue: c.i });
  }
  // 2026-11-10 format mix: shorts with a manifest "fmt" other than E draw their own captions / titles (moments/formats.js); every short's cover frame is drawn there too
  const FMT_ON = SHORT && FOOT.m.fmt && FOOT.m.fmt !== 'E';
  if (FMT_ON) TH.labelBottom = () => 0;
  else TH.over.push((t) => { if (t >= FOOT.dur || (typeof RF !== 'undefined' && RF.coverOn(t))) return; drawCap(t); drawLab(t); });
}
