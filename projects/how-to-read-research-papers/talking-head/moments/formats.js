/* how-to-read-research-papers: the shorts FORMAT MIX + the COVER FRAME (ROLLOUT-BRIEF 2026-11-10; ported from http-status-codes
 * moments/plan.js FD_PLAN short + common.js FD.capFmt / capNew / titleFmt / jRoom / coverDraw), drawn in THIS video's look:
 * graphite / paper / highlighter yellow / blue pen, type set 05 (DM Serif Display headlines + captions, the key word italic in
 * yellow; Inter Tight for the sentence captions and the TikTok box; DM Mono for the small tag). SHORTS-PLAYBOOK "Format menu".
 * Manifest per short: "fmt" A-M (E = the old look in common.js: paper card label + her 3:4 window), "frame9", "poster" (C / J:
 * the words on the ground / on the screen behind her), "cover" {on, dur, at, text ("~word~" = yellow italic), style
 * "photo" | "card" | "card-blue"}. Loaded after visuals.js, before plan.js (talking-head.json "common").
 * Editable: titles 'label/label', posters 'label/poster', the K tag 'label/tag', captions 'caption/<n>', cover line 'cover/cover',
 * the card cut-out 'cover/@her'. */
'use strict';
// 2026-11-13 FONT-BOARD pass (moments/fontboard.js sets RF_FB per short: board fonts in their source colours); RF_FB null = the old look
const FB_ = () => (typeof RF_FB !== 'undefined' ? RF_FB : null);
const RFN = (s) => (FB_() ? FB_().A(s) : `400 ${s}px "DM Serif Display"`), RFI = (s) => (FB_() ? (FB_().AI || FB_().A)(s) : `italic 400 ${s}px "DM Serif Display"`);
const RFS = (s, w = 600) => (FB_() && FB_().B ? FB_().B(s) : `${w} ${s}px "Inter Tight"`), RFM = (s) => (FB_() && FB_().M ? FB_().M(s) : `500 ${s}px "DM Mono"`);
const FBc = (k, d) => (FB_() && FB_()[k] != null ? FB_()[k] : d);
const FBup = (s) => (FB_() && FB_().up ? String(s).toUpperCase() : String(s));
const FBls = (z) => (FB_() ? (FB_().ls || 0) * z : -0.015 * z);
G.rpHi = { bg: RP.hi, fg: RP.ink, mid: RP.mid, line: RP.line, acc: RP.pen, card: RP.card, panel: '#E9E42A', grid: RP.line, mode: 'light' };
const RF = { spans: [], popN: 0 };
RF.fmt = (typeof FOOT !== 'undefined' && FOOT.m && FOOT.m.kind === 'short') ? (FOOT.m.fmt || 'E') : null;
RF.on = !!RF.fmt && RF.fmt !== 'E';
RF.inGfx = (t) => RF.spans.some(([a, b]) => t >= a && t < b);
RF.soft = (z) => { ctx.shadowColor = 'rgba(0,0,0,0.55)'; ctx.shadowBlur = Math.max(8, z * 0.28); ctx.shadowOffsetY = Math.max(1, z * 0.03); };
RF.title = () => (typeof RP.labText === 'string' && RP.labText) || (RP.SHORTS[FOOT.m.id] || {}).text || FOOT.m.title || '';
/** words of a rich line: [word, italic]; "*x y*" = italic run */
RF.BR = '\u2028';   // her Shift+Enter: a real line break (her lines are never re-wrapped, only shrunk)
RF.words = (s) => { const out = []; FBup(s).replace(/[ \t]*\n[ \t]*/g, ' ' + RF.BR + ' ').split(/(\*[^*]+\*)/).filter(Boolean).forEach(p => { const it = /^\*.*\*$/.test(p);
  p.replace(/\*/g, '').split(/[ \t]+/).filter(Boolean).forEach(w => { if (/^[,.?!:;)]+$/.test(w) && out.length && out[out.length - 1][0] !== RF.BR) out[out.length - 1] = [out[out.length - 1][0] + w, out[out.length - 1][1]]; else out.push([w, it]); }); }); return out; };
RF.hand = (ws) => ws.some(q => q[0] === RF.BR);
RF.lay = (ws, z, maxW) => { const wd = ([w, it]) => tw(w, it ? RFI(z) : RFN(z), FBls(z)); const sp = z * 0.25; const L = [[]]; let cw = 0;
  for (const q of ws) { if (q[0] === RF.BR) { if (L[L.length - 1].length) L.push([]); cw = 0; continue; }
    const ww = wd(q); if (!RF.hand(ws) && L[L.length - 1].length && cw + sp + ww > maxW) { L.push([]); cw = 0; } cw += (L[L.length - 1].length ? sp : 0) + ww; L[L.length - 1].push(q); }
  return L.filter(l => l.length); };
RF.lw = (l, z) => l.reduce((a, [w, it], i) => a + tw(w, it ? RFI(z) : RFN(z), FBls(z)) + (i ? z * 0.25 : 0), 0);
/** a title set big inside r in DM Serif Display (rich: *italic* in colIt); editable as 'label' (or o.key) */
RF.bigTitle = (r, o = {}) => {
  const sid = SCENE_ID; SCENE_ID = 'label'; const key = o.key || 'label'; EL.seen.delete('label/' + key); const ov = ovr(key);
  const def = o.def != null ? o.def : RF.title(); const str = ov.s != null ? ov.s : def;
  const info = { text: str, def, kind: 'box', sk: ov.k, label: o.what || 'title (text; *word* = italic)' };
  try {
    if (ov.hide) { regBox(ov, r.x, r.y, r.w, r.h, info); return; }
    const ws = RF.words(str); const hand = RF.hand(ws); const maxW = r.w - (o.padX != null ? o.padX : 50) * 2; const maxL = o.maxL || 3; let z = Math.round((o.zMax || 200) * FBc('zK', 1)), L = [];
    for (; z > 36; z -= 4) { L = RF.lay(ws, z, maxW); if ((hand || L.length <= maxL) && L.length * z * 1.02 <= r.h && Math.max(...L.map(l => RF.lw(l, z))) <= maxW && (hand || L.length === 1 || L[L.length - 1].length >= 2 || ws.length < 3)) break; }
    const lh = z * 1.02, hh = L.length * lh; const y0 = r.y + (o.valign === 'top' ? 0 : o.valign === 'bottom' ? r.h - hh : (r.h - hh) / 2); const cx = r.x + r.w / 2;
    moved(ov, () => { if (o.shadow) RF.soft(z);
      L.forEach((l, i) => { let x = o.align === 'left' ? r.x + (o.padX || 0) : cx - RF.lw(l, z) / 2; const y = y0 + z * 0.84 + i * lh;
        l.forEach(([w, it]) => { const f = it ? RFI(z) : RFN(z); _txt(w, x, y, f, it ? (o.colIt || o.col || RP.ink) : (o.col || RP.ink), 'left', 'alphabetic', FBls(z)); x += tw(w, f, FBls(z)) + z * 0.25; }); });
      ctx.shadowColor = 'rgba(0,0,0,0)'; regBox(ov, r.x, y0, r.w, hh, info); }, [cx, y0]);
  } finally { SCENE_ID = sid; }
};
/** B / C: the poster above her while she talks (B: the title on paper; C: the poster word huge on yellow, her cut-out in front) */
RF.poster = (t, r) => { const PO = FBc('poster', { bg: RP.paper, ink: RP.ink, key: RP.pen });
  if (RF.fmt === 'C') RF.bigTitle({ x: r.x, y: r.y + 20, w: r.w, h: r.h * 0.5 }, { key: 'poster', def: FOOT.m.poster || RF.title(), zMax: 300, maxL: 2, valign: 'top', padX: 30, col: PO.ink, colIt: PO.key, what: 'the big words behind her' });
  else { const ph = r.h - 190; rect(r.x, r.y, r.w, ph, PO.bg); RF.bigTitle({ x: r.x + 20, y: r.y + 40, w: r.w - 40, h: ph - 80 }, { zMax: 150, maxL: 3, col: PO.ink, colIt: PO.key }); } };   // the paper stops above the divider: her captions sit on the dark strip
/** J: a big screen on a dark wall (thin bezel, soft shadow); the screen shows the poster on paper while she talks, a graphic when there is one */
RF.JS = { x: 40, y: 110, w: 1000, h: 1000 };
RF.JK = { compare: 1 };   /* (the two-card compare is laid out for the full 1000 px width: no scale-up) */
RF.jRoom = (t, q, content, jk) => {
  const S = RF.JS; rect(0, 1560, W, H - 1560, '#121317'); rect(0, 1556, W, 4, '#2A2D35');
  ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.55)'; ctx.shadowBlur = 50; ctx.shadowOffsetY = 22; rect(S.x - 12, S.y - 12, S.w + 24, S.h + 24, '#0A0A0C'); ctx.restore();
  const PO = FBc('poster', { bg: RP.paper, ink: RP.ink, key: RP.pen });
  const r = { x: S.x, y: S.y, w: S.w, h: Math.round(S.h * 0.46) }; rect(S.x, S.y, S.w, S.h, content ? RP.desk : PO.bg);
  const a = q.t0 < 0.05 ? 1 : MOTION.ease(t, q.t0, 0.25, 'outQuint');
  /* 2026-11-16 (critic: graphics small in a mostly empty screen): a graphic gets the screen down to just above her head (760 px)
   * and is drawn 1.3x larger (laid out in a 769 x 538 box, scaled up); the poster keeps its old box. */
  const JK = jk || 1.3, rc = { x: S.x, y: S.y, w: S.w, h: 760 };
  ctx.save(); ctx.beginPath(); if (content) ctx.rect(rc.x, rc.y, rc.w, rc.h); else ctx.rect(r.x, r.y, r.w, r.h); ctx.clip();
  withA(a, () => { if (!content) RF.bigTitle({ x: r.x + 30, y: r.y + 30, w: r.w - 60, h: r.h - 60 }, { key: 'poster', def: FOOT.m.poster || RF.title(), zMax: 260, maxL: 2, padX: 10, col: PO.ink, colIt: PO.key, what: 'the words on the screen behind her' });
    else { ctx.save(); ctx.translate(rc.x, rc.y); ctx.scale(JK, JK); content(t, { x: 0, y: 0, w: Math.round(rc.w / JK), h: Math.round(rc.h / JK) }); ctx.restore(); } });
  ctx.restore(); rect(S.x + S.w / 2 - 70, S.y + S.h + 12, 140, 10, '#0A0A0C');
};
/** K: a small DM Mono tag top-left; M: the title in black Inter Tight 800 in a white rounded box ("|" = a new line) */
RF.small = (key, def, draw, what) => { const sid = SCENE_ID; SCENE_ID = 'label'; EL.seen.delete('label/' + key); const ov = ovr(key); const str = ov.s != null ? ov.s : def;
  try { draw(ov, str, { text: str, def, kind: 'box', sk: ov.k, label: what }); } finally { SCENE_ID = sid; } };
RF.plain = (s) => String(s).replace(/\*/g, '');
RF.tagK = () => RF.small('tag', RF.plain(RF.title()).toUpperCase(), (ov, str, info) => { const TG = FBc('tag', null); const z = TG ? 40 : 36; const f = RFM(z); const x = 64, y = 120;
  const lines = String(str).split('\n').map(l => l.trim()).filter(Boolean); const w = Math.max(...lines.map(l => tw(l, f, z * 0.06))); const lh = z * 1.3; const bh = lines.length * lh;
  if (ov.hide) { regBox(ov, x, y - z, w, bh, info); return; }
  moved(ov, () => { ctx.save(); if (TG) rect(x - 18, y - z - 12, w + 36, bh + 18, TG.bg); else RF.soft(z);
    lines.forEach((l, i) => _txt(l, x, y + i * lh, f, TG ? TG.ink : '#FFFFFF', 'left', 'alphabetic', z * 0.06)); ctx.restore(); regBox(ov, x - 18, y - z - 12, w + 36, bh + 18, info); }, [x, y]); }, 'small label top-left');
RF.boxM = () => RF.small('label', RF.plain(FOOT.m.boxText || RF.title()), (ov, str, info) => { const z = 66; const f = FB_() && FB_().box ? FB_().box(z) : RFS(z, 800); const maxW = W - 220; const BX = FBc('box9', { bg: '#FFFFFF', ink: '#111111' });
  const lines = str.split(/[|\n]/).map(x => x.trim()).filter(Boolean).flatMap(l => { const ws = l.split(/\s+/); const out = []; let cur = '';
    ws.forEach(w => { const nx = cur ? cur + ' ' + w : w; if (cur && tw(nx, f) > maxW) { out.push(cur); cur = w; } else cur = nx; }); if (cur) out.push(cur); return out; }).slice(0, 3);
  const lh = z * 1.08, pw = 40, ph = 24; const bw = Math.max(...lines.map(l => tw(l, f))) + pw * 2, bh = lines.length * lh + ph * 2 - (lh - z); const x = CX - bw / 2, y = 168;
  if (ov.hide) { regBox(ov, x, y, bw, bh, info); return; }
  moved(ov, () => { fillRR(x, y, bw, bh, 28, BX.bg); lines.forEach((l, i) => _txt(l, CX, y + ph + z * 0.8 + i * lh, f, BX.ink, 'center')); regBox(ov, x, y, bw, bh, info); }, [CX, y]); }, 'title box (text; "|" starts a new line)');
/** the title of formats F (small, over her square), G (big, above her letterbox band), K (tag), M (white box) */
RF.titleDraw = (t) => {
  const fm = RF.fmt; const gfx = RF.inGfx(t);
  if (fm === 'F' && !gfx) RF.bigTitle({ x: 40, y: 70, w: W - 80, h: 200 }, { zMax: 84, maxL: 2, col: FBc('title', '#FFFFFF'), colIt: FBc('key', RP.hi), shadow: !!FB_() });
  if (fm === 'K' && !gfx) RF.tagK();
  if (fm === 'M' && !gfx) RF.boxM();
  if (fm === 'G') { const a = 1 - RF.spans.reduce((m, [x, y]) => Math.max(m, t >= x - 0.01 && t < y ? Math.min(1, (t - x) / 0.2, (y - t) / 0.2) : 0), 0);
    if (a > 0.01) withA(gfx ? a : 1, () => RF.bigTitle({ x: 30, y: 150, w: W - 60, h: 440 }, { zMax: 128, maxL: FB_() ? 2 : 3, col: FBc('gTitle', '#FFFFFF'), colIt: FBc('gKey', RP.hi), valign: 'bottom' })); }
};

/* ---------- captions per format ---------- */
RF.split2 = (words, f, ls, maxW) => { const join = (l) => l.join(' '); let lines = [words];
  if (tw(join(words), f, ls) > maxW) { let bi = 1, bm = 1e9; for (let k = 1; k < words.length; k++) { const m_ = Math.max(tw(join(words.slice(0, k)), f, ls), tw(join(words.slice(k)), f, ls)); if (m_ < bm) { bm = m_; bi = k; } } lines = [words.slice(0, bi), words.slice(bi)]; }
  return lines; };
RF.wordTimes = (c, n) => { const ws = (typeof WORDS !== 'undefined' ? WORDS : []).filter(w => w.t >= c.t0 - 0.05 && w.t < c.t1 - 0.02).map(w => w.t);
  return ws.length === n ? ws : Array.from({ length: n }, (_, i) => c.t0 + (c.t1 - c.t0) * 0.9 * i / Math.max(1, n)); };
RF.capDraw = (t) => {
  const c = (TH.caps || []).find(x => x.t0 <= t && t < x.t1); if (!c) return;
  const ce = (EDIT.data.capShort || {})[c.i]; const raw = ce != null ? ce : c.text; const cst = EDIT.data.captions9 || {};
  const fm = RF.fmt, gfx = RF.inGfx(t) && (!/[AFGHKM]/.test(fm) || !!FOOT.panelRect); const yN = FOOT.capYNow; const FB = FB_();   // a graphic counts once its panel is on screen (2026-11-13: H captions sat on her face while a panel waited for its word)
  const S = { A: gfx ? { f: 'sans', cy: 1790, size: 70 } : { f: 'serif', cy: 1740, size: 84, ink: true },
    B: { f: 'sans', cy: FB_() ? 1660 : (yN != null ? yN - 25 : 1560), size: 70 },   // font-board pass: on her sweater under her face (the divider put them on her head)
    C: { f: 'serif', cy: gfx ? 1080 : 760, size: 86, ink: true },   // on the yellow between the words / graphic and her head   // ink on the yellow ground / her pale sweater
    F: { f: 'serif', cy: gfx ? 1790 : 1650, lit: true, size: 92 },
    G: { f: 'sans', cy: gfx ? 1745 : 1440, lit: true, size: 62, grey: true },
    H: { f: 'serif', cy: gfx ? (FB_() ? 870 : 950) : 1500, chunk: true, size: 104 },   // font-board pass: above the bottom panel (was touching it)
    I: { f: 'serif', cy: 1540, chunk: true, size: 84 },
    J: { f: 'serif', cy: 1700, chunk: true, size: 92 },
    K: { f: 'serif', cy: 1690, size: 62, box: true, nokey: true },
    M: { f: 'sans8', cy: gfx ? 1800 : 1560, size: 62, nokey: true } }[fm];
  if (!S) return;
  // font-board pass: captions in short phrases (2-5 words, brief 2026-11-12) in the board font; ink on the board's band where the band is coloured
  const inkM = !!(S.ink || (FB && FB.capInk && (fm === 'G' || (fm === 'F' && !gfx))));   // F with a graphic: captions sit on her picture (white)
  const chunkN = FB ? 4 : 3; const doChunk = S.chunk || !!FB;
  let size = cst.size ? clamp(Math.round(cst.size), 40, 150) : Math.round((FB ? Math.max(S.size, 72) : S.size) * FBc('capK', 1)); const cy = cst.y != null ? cst.y : S.cy;
  const font = (z) => (FB ? FB.B(z) : S.f === 'serif' ? RFN(z) : S.f === 'sans8' ? RFS(z, 800) : RFS(z, 600)); const fontIt = (z) => (FB ? FB.B(z) : S.f === 'serif' ? RFI(z) : font(z));
  const all = (FB && FB.capUp ? raw.toUpperCase() : raw).split(/\s+/).filter(Boolean); if (!all.length) return;
  const key = S.nokey && !FB ? -1 : RP.keyIdx(all); const wt = RF.wordTimes(c, all.length);
  let idx = all.map((_, i) => i);
  if (doChunk) { const ch = []; let cur = []; idx.forEach(i => { cur.push(i); if (/[,.?!:;]$/.test(all[i]) || cur.length === chunkN) { ch.push(cur); cur = []; } });
    if (cur.length) { if (cur.length === 1 && ch.length && ch[ch.length - 1].length < chunkN + 1) ch[ch.length - 1].push(...cur); else ch.push(cur); }
    let pick = ch[0]; for (const g_ of ch) if (t >= wt[g_[0]] - 0.08) pick = g_; idx = pick; }
  const ls = FB ? (FB.ls || 0) * size : 0;
  const fW = (i, z) => (i === key ? fontIt(z) : font(z));
  const maxW = W * (S.box ? 0.84 : 0.86); const lwid = (l, z) => l.reduce((a, i, k) => a + tw(all[i], fW(i, z), ls) + (k ? z * 0.26 : 0), 0);
  let lines = [idx]; if (lwid(idx, size) > maxW) { let bi = 1, bm = 1e9; for (let k = 1; k < idx.length; k++) { const m_ = Math.max(lwid(idx.slice(0, k), size), lwid(idx.slice(k), size)); if (m_ < bm) { bm = m_; bi = k; } } lines = [idx.slice(0, bi), idx.slice(bi)]; }
  { const wide = Math.max(...lines.map(l => lwid(l, size))); if (wide > maxW) size = Math.round(size * Math.max(0.66, maxW / wide)); }
  const lh = size * (S.box ? 1.32 : S.f === 'serif' || FB ? 1.06 : 1.18); const y0 = cy - (lines.length - 1) * lh / 2 + size * 0.36; let bx0 = 1e9, bx1 = -1e9;
  const CB = FBc('capBox', { bg: 'rgba(0,0,0,0.86)', ink: '#FFFFFF' });
  const base = inkM ? FBc('capInk', RP.ink) : S.box ? CB.ink : FBc('cap', '#FFFFFF'), keyC = inkM ? FBc('capInkKey', RP.pen) : S.box ? CB.ink : FBc('capKey', RP.hi);
  const dim = inkM ? FBc('capDim', 'rgba(23,23,26,0.35)') : (S.grey && !FB ? '#7C7C80' : 'rgba(255,255,255,0.4)');
  ctx.save();
  lines.forEach((ln, li) => { const y = y0 + li * lh; const lw_ = lwid(ln, size); let x = CX - lw_ / 2; bx0 = Math.min(bx0, x); bx1 = Math.max(bx1, x + lw_);
    if (S.box) { const px = size * 0.32; fillRR(x - px, y - size * 0.9, lw_ + px * 2, size * 1.24, 6, CB.bg); }
    ln.forEach((i) => { const f = fW(i, size); const col = i === key ? keyC : base;
      const unsaid = S.lit && t < wt[i] - 0.02;
      ctx.save(); if (!inkM && !S.box && !unsaid) RF.soft(size);
      _txt(all[i], x, y, f, unsaid ? dim : col, 'left', 'alphabetic', ls); ctx.restore();
      x += tw(all[i], f, ls) + size * 0.26; }); });
  ctx.restore();
  const bt = y0 - size * 0.95, bh = (lines.length - 1) * lh + size * 1.3; const pad = S.box ? size * 0.32 : 22;
  regBox({ id: 'caption/' + c.i, edited: ce != null, hide: false }, bx0 - pad, bt, bx1 - bx0 + pad * 2, bh, { kind: 'caption', text: raw, def: c.text, cue: c.i });
};

/* ---------- the cover frame (her note 2026-11-10: "the real cover should be on the video"); SHORTS-PLAYBOOK "Cover frame" ---------- */
RF.coverOf = () => { const c = FOOT.m && FOOT.m.kind === 'short' && PORTRAIT ? FOOT.m.cover : null; return c && c.on !== false ? c : null; };
RF.coverOn = (t) => { const c = RF.coverOf(); return !!c && t >= 0 && t < (c.dur || 0.1); };
RF.coverDraw = (t) => {
  // 2026-11-13 font-board pass: three cover kinds (HER-STANDARD "Short covers"): "photo" = her real room (a frame of this short) under
  // the line on the board item's ground, "big" = the line alone on the board item's ground, "frame" = a slide from the short under the
  // line (assets/covers/<id>-frame.jpg). No line pattern, no cut-out on a plain colour. ~word~ = the key word (board key colour or box).
  const c = RF.coverOf(); const id = FOOT.m.id; const st = c.style === 'big' || c.big ? 'big' : c.style === 'frame' ? 'frame' : 'photo';
  const FC = FBc('cover', null) || { bg: RP.desk, card: RP.desk, ink: '#FFFFFF', key: RP.hi };
  const sid = SCENE_ID; SCENE_ID = 'cover'; EL.seen.clear();
  try {
    let top, maxH, zMax = 150;
    if (st === 'photo') { rect(0, 0, W, H, FC.bg || FC.card); const im = IMG['cover_' + id]; const k = c.scale || 0.9, dy = c.shift != null ? c.shift : 600;
      if (im) { const w = W * k, h = H * k, x = (W - w) / 2; grp('her', x, dy, w, h, () => themeFixed(() => ctx.drawImage(im, x, dy, w, h)), { img: true, label: 'her picture (drag to move, corners to resize)' }); }
      top = 110; maxH = dy - 150; zMax = 170; }
    else if (st === 'frame') { rect(0, 0, W, H, FC.card || FC.bg); const im = IMG['cover_' + id + '_frame'];
      const fw = W * (c.frameW || 0.84), fy = c.frameY != null ? c.frameY : 760;
      if (im) { const fh = fw * im.height / im.width, fx = (W - fw) / 2; grp('slide', fx, fy, fw, fh, () => { ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.28)'; ctx.shadowBlur = 40; ctx.shadowOffsetY = 16; rect(fx, fy, fw, fh, '#000'); ctx.restore(); themeFixed(() => ctx.drawImage(im, fx, fy, fw, fh)); }, { img: true, label: 'the slide (drag to move, corners to resize)' }); }
      top = 170; maxH = fy - 250; zMax = 140; }
    else { rect(0, 0, W, H, FC.card || FC.bg); top = 330; maxH = 1200; zMax = 190; }
    const ov = ovr('cover'); const str = ov.s != null ? ov.s : (c.text || '');
    const info = { text: str, def: c.text || '', kind: 'box', sk: ov.k, label: 'cover line (text; ~word~ = the key word; Shift+Enter = a new line)' };
    const ws = RF.words(str.replace(/~([^~]+)~/g, (m_, x) => '*' + x.split(/\s+/).join('* *') + '*')); const hand = RF.hand(ws); const maxW = W - 150; let z = Math.round(zMax * FBc('zK', 1)), L = [];
    for (; z > 40; z -= 4) { L = RF.lay(ws, z, maxW); if ((hand || L.length <= 5) && L.length * z * 1.06 <= maxH && Math.max(...L.map(l => RF.lw(l, z))) <= maxW && (hand || L.length === 1 || L[L.length - 1].length >= 2)) break; }
    const lh = z * 1.06; const bw = Math.max(...L.map(l => RF.lw(l, z))); if (st === 'big') top = (H - L.length * lh) / 2 - z * 0.1;
    if (ov.hide) { regBox(ov, CX - bw / 2, top, bw, L.length * lh, info); return; }
    moved(ov, () => { ctx.save();
      L.forEach((l, i) => { let x = CX - RF.lw(l, z) / 2; const y = top + z * 0.84 + i * lh;
        l.forEach(([w, it]) => { const f = it ? RFI(z) : RFN(z); const wv = tw(w, f, FBls(z));
          if (it && FC.keyBox) { rect(x - z * 0.1, y - z * 0.86, wv + z * 0.2, z * 1.08, FC.keyBox); _txt(w, x, y, f, FC.keyInk, 'left', 'alphabetic', FBls(z)); }
          else _txt(w, x, y, f, it ? (FC.key || FC.ink) : FC.ink, 'left', 'alphabetic', FBls(z));
          x += wv + z * 0.25; }); });
      ctx.restore(); regBox(ov, CX - bw / 2, top, bw, L.length * lh, info); }, [CX, top]);
  } finally { SCENE_ID = sid; }
};
TH.over.push((t) => {
  if (!RF.fmt || !PORTRAIT || t >= FOOT.dur) return;
  if (RF.coverOn(t)) { RF.coverDraw(t); return; }
  if (!RF.on) return;
  if (SHOW.captions) { const s0 = SCENE_ID; SCENE_ID = 'captions'; RF.capDraw(t); SCENE_ID = s0; }
  RF.titleDraw(t);
});

/* ---------- where graphics go per format (called from plan.js RP_PLAN in a short) ---------- */
/** installs the format's layouts; returns { full, fig, fill } (fill = no plain-framing gaps for B C H-M; call after the plan) */
RF.install = (s, first, orig) => {
  const FMT = RF.fmt; const { talk0, split0 } = orig; const half0 = TH.half, pres0 = TH.presenter, room0 = TH.room;
  if (/[FG]/.test(FMT)) TH.look.band = FBc('band', '#111114'); else if (FMT === 'A') TH.look.band = FBc('band', RP.hi);
  if (FMT === 'C' && FBc('poster', null)) G.rpHi = { ...G.rpHi, bg: FBc('poster').bg, panel: FBc('poster').bg };   // C: the board item's ground behind her
  const mark = (sg) => { if (sg) RF.spans.push([sg.t0, sg.t1]); return sg; };
  const lbBox = (sp_, o) => { const q = TH.span(sp_, o); const sg = TH.seg('half', q, o, (t) => { const e = MOTION.ease(t, q.t0, 0.45, 'outQuint'); if (e <= 0.001) return;
      const r = { x: 0, y: 0, w: W, h: 976 }; ctx.save(); ctx.beginPath(); ctx.rect(0, r.y + r.h * (1 - e), W, r.h * e); ctx.clip(); rect(r.x, r.y, r.w, r.h, RP.desk); o.draw(t, r); ctx.restore();
      FOOT.panelRect = { x: 0, y: r.y, w: W, h: r.h }; }, () => CAM(q.t0, { box: [0, 1000, W, Math.round(W * 9 / 16)], z: 1, d: 0.45, ease: 'inOutQuart' }));
    sfx('swipe', q.t0 + 0.2, -4); return sg; };
  const POP = { x: 110, y: 50, w: 860, h: 420 };   // above her headband in this recording (her face sits higher than in HTTP)
  const popCard = (sp_, o) => { const q = TH.span(sp_, o); const k = (RF.popN = RF.popN + 1); const tilt = (k % 2 ? -1 : 1) * 0.03;
    const sg = TH.seg('pops', q, o, (t) => { const pin = MOTION.ease(t, q.t0, 0.42, 'outBack'), pout = MOTION.ease(t, q.t1 - 0.22, 0.22, 'inExpo'); if (pin <= 0.001 || pout >= 0.999) return;
      const r = POP; const cx = r.x + r.w / 2, cy = r.y + r.h / 2; const sc = (0.82 + 0.18 * pin) * (1 - 0.12 * pout);
      grp('card', r.x, r.y, r.w, r.h, () => withA(clamp(Math.min(pin * 2.5, 1 - pout)), () => {
        ctx.save(); ctx.translate(cx, cy); ctx.rotate(tilt * (1 + 0.6 * (1 - pin))); ctx.scale(sc, sc); ctx.translate(-cx, -cy);
        ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.38)'; ctx.shadowBlur = 46; ctx.shadowOffsetY = 18; fillRR(r.x, r.y, r.w, r.h, 26, FBc('pop', RP.desk)); ctx.restore();
        ctx.save(); rr(r.x, r.y, r.w, r.h, 26); ctx.clip(); if (o.draw) o.draw(t, { x: r.x, y: r.y, w: r.w, h: r.h }); ctx.restore();
        ctx.restore(); }), { label: 'pop-up card (drag to move, corners to resize)' });
      FOOT.panelRect = { x: r.x, y: r.y, w: r.w, h: r.h }; }, () => CAM(q.t0, { z: 1.0 }));
    sfx('pop', q.t0 + 0.06, -4); return sg; };
  const jSeg = (sp_, o, content) => { const q = TH.span(sp_, o); TH.needMatte(q.t0, q.t1);
    const h = Math.round(H * 0.74), w = Math.round(h * 16 / 9); const box = [Math.round(W / 2 - 0.497 * w), H - h, w, h];
    const sg = TH.seg('presenter', q, o, (t) => TH.cutout(t, { ground: '#2B2E35', grid: false, outline: RP.paper, outlinePx: 0, under: () => RF.jRoom(t, q, content, RF.JK[o.id]) }),
      () => CAM(q.t0, { box, z: 1 }), { cover: true });
    if (content) sfx('shutter', q.t0 + 0.05, -6); return sg; };
  const GFX = {
    A: (sp_, o) => half0(sp_, { side: 'top', size: 1050, id: o.id, draw: o.draw, noCaps: o.noCaps, z: 1.35 }),
    B: (sp_, o) => split0(sp_, { side: 'bottom', her: 0.48, id: o.id, draw: o.draw, noCaps: o.noCaps, enter: 0.3 }),
    C: (sp_, o) => pres0(sp_, { side: 'right', scale: 0.5, id: o.id, draw: o.draw, noCaps: o.noCaps, ground: 'rpHi', enter: 0.3 }),
    F: (sp_, o) => half0(sp_, { side: 'top', size: 1000, id: o.id, draw: o.draw, noCaps: o.noCaps, z: 1.3 }),
    G: (sp_, o) => lbBox(sp_, o),
    H: (sp_, o) => half0(sp_, { side: 'bottom', size: 900, id: o.id, draw: o.draw, noCaps: o.noCaps, z: 1.25, fy: 0.42 }),
    I: (sp_, o) => popCard(sp_, o),
    J: (sp_, o) => jSeg(sp_, o, o.draw),
    K: (sp_, o) => half0(sp_, { side: 'top', size: 940, id: o.id, draw: o.draw, noCaps: o.noCaps, z: 1.3, ground: 'rpInk' }),
    M: (sp_, o) => half0(sp_, { side: 'top', size: 1000, id: o.id, draw: o.draw, noCaps: o.noCaps, z: 1.3 }),
  };
  const top = (sp_, o = {}) => mark(GFX[FMT](sp_, o));
  // 2026-11-12 her note ("you add a zoom effect by yourselves... at least remove the zoom effect"): no automatic zooms on her in a
  // short. Every L1 talk in a short uses one framing (no mid / close / push / punch); full-screen formats H I K M (and G, her whole frame) stay at z 1
  // all through, also in the gaps between segments (the L1 default framing would be 8 % tighter).
  if (/^[GHIKM]$/.test(FMT) && TH.look && TH.look.talk && TH.look.talk.z) TH.look.talk = { ...TH.look.talk, z: [TH.look.talk.z[0], 1.0] };
  const talkF = {
    B: (sp_, o) => split0(sp_, { side: 'bottom', her: 0.48, id: o.id, draw: RF.poster, enter: 0, ground: 'rpDesk', sound: false }),
    C: (sp_, o) => pres0(sp_, { side: 'right', scale: 0.64, id: o.id, draw: RF.poster, enter: 0.0001, ground: 'rpHi', gr: [40, 110, W - 80, 1000], sound: false }),
    G: (sp_, o) => talk0(sp_, { id: o.id, frame: 1 }),
    J: (sp_, o) => jSeg(sp_, o, null),
    H: (sp_, o) => talk0(sp_, { id: o.id, frame: 1.0 }), I: (sp_, o) => talk0(sp_, { id: o.id, frame: 1.0 }),
    K: (sp_, o) => talk0(sp_, { id: o.id, frame: 1.0 }), M: (sp_, o) => talk0(sp_, { id: o.id, frame: 1.0 }),
  };
  TH.tile = top; TH.room = top; TH.ots = top; TH.presenter = top; TH.half = top; TH.split = (sp_, o = {}) => (o.draw ? top(sp_, o) : split0(sp_, o));
  TH.talk = (sp_, o = {}) => (talkF[FMT] ? talkF[FMT](sp_, o) : talk0(sp_, { ...o, frame: 'wide', punch: undefined, push: undefined, alt: undefined }));
  const full = (sp_, draw, o = {}) => top(sp_, { ...o, draw });
  const fig = (sp_, o) => top(sp_, { id: o.id, draw: RP.head({ lines: o.title.join('\n'), at: (sp_.from || sp_).t - 0.1, hand: o.hand }) });
  const fill = () => { if (!/[BCHIJKM]/.test(FMT)) return;
    const sg = TH.segs.slice().sort((x, y) => x.t0 - y.t0); let t = 0;
    for (const x of sg) { if (x.t0 - t > 0.45) TH.talk([t, x.t0], { id: 'fmt-' + t.toFixed(1).replace('.', '_') }); t = Math.max(t, x.t1); }
    if (TOTAL - t > 0.45) TH.talk([t, TOTAL], { id: 'fmt-end' }); };
  const restore = () => { TH.half = half0; TH.presenter = pres0; TH.room = room0; };
  return { full, fig, fill, restore };
};
