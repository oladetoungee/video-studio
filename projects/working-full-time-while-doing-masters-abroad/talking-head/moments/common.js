/* working-full-time: the talking-head look = her pick 2026-11-02, B · CLOCK IN / CLOCK OUT (a punch-clock time card) for the
 * whole video, with A's 24-hour dial for the "same one 24 hours" part (WF.dial).
 * Grounds: wall charcoal #23201B (main), manila card #E7D7AE (cards, corrections), black #0D0C0A (phrase cards).
 * ONE accent: stamp red #C8102E (her headband) = the time / rule / word that matters. Card rules #A08A5E, stamp ink #1D1A15.
 * Type: Bebas Neue (headlines, times, captions), Work Sans 600/700 (sentences), Cutive Mono (stamps, credits, labels).
 * Motion: stamps land in 0.12 s (scale 1.25 -> 1, slightly uneven ink), cards slide in 0.5-0.7 s (outQuint), words land on her
 * word times, pushes in-out. Sounds: stamp (wood hit / typewriter hit), paper slide, card flick, marker, clock tick, focus.
 * Her captions (C1): heavy condensed caps (Bebas), paper white with a dark outline, one word per chunk in stamp red. Shorts top
 * title (T3): a manila box with black Bebas. Both drawn by WF.post (wraps TH.post), editable like the house ones.
 * Every text is txt()/txtW() (editable), every block grp() (movable, resizable). Loaded before every moment script. */
'use strict';
F.body = (s, w = 600) => FW(s, w);   // set 02: Inter Tight for sentences, plates and pages
Object.assign(TH.look, {
  disp: (s) => FB(s), dispLS: 0.01, upper: true, font: 'disp', capFit: true, kwHideCap: true,
  fg: WF.manila, ink: WF.ink, acc: WF.red, accOnDark: WF.red,
  ground: 'wfWall', cardGround: 'wfBlack', panel: 'wfCard', grid: false,
  outline: WF.manila, outlinePx: 8, ring: WF.manila, ringPx: 4, plate: 'wf', dim: 0.38, band: WF.wall, rule: 'rgba(231,215,174,0.35)',
});

/** a full-frame graphic (no film needed): an L9-style insert, her voice and captions go on */
WF.full = (s, draw, o = {}) => {
  const lead = o.lead == null ? 0.12 : o.lead, hold = o.hold == null ? 0.5 : o.hold;
  const at = (x, end) => (typeof x === 'number' ? x : end ? x.e + hold : x.t - lead);
  let t0, t1; if (Array.isArray(s)) { t0 = s[0]; t1 = s[1]; } else if (s.from != null) { t0 = at(s.from); t1 = at(s.to || s.from, true); } else { t0 = s.t - lead; t1 = s.e + hold; }
  if (o.until != null) t1 = o.until;
  TH.used = true; const id = o.id || 'insert-' + (++WF.n);
  const enter = o.enter == null ? 0.3 : o.enter;
  TH.segs.push({ kind: 'cutaway', t0, t1, id, cover: true, card: false, ground: o.ground || 'wfWall', o, noCaps: o.noCaps,
    draw: (t) => { const p = enter ? E.outCubic(prog(t, t0, enter)) : 1; const k = 1 + 0.03 * E.inOutCubic(prog(t, t0, Math.max(0.5, t1 - t0)));   // a slow push: never dead still
      withT((1 - p) * W * 0.1 + W / 2 * (1 - k), H / 2 * (1 - k), k, 0, () => draw(t, { x: 0, y: 0, w: W, h: H })); if (p < 1) withA(1 - p, () => rect(0, 0, W, H, WF.wall)); } });
  if (o.sound !== false) sfx(o.sound || 'paper', t0 + 0.04, o.db != null ? o.db : -3);
  return { t0, t1, id };
};
WF.n = 0;

/* ---------- her captions C1 + the shorts top title T3, in the look (wrapping TH.post; editable like the house ones) ----------
 * C1 (re-typed 2026-11-07, set 02): Inter Tight 500 as spoken, paper white #F4EBD3, a soft shadow (no outline), one word in stamp red (the chunk's
 * strongest word: a number, else its longest content word), centred; 16:9 at y 985 (size 86), 9:16 at the caption height
 * (size 96, two lines max). Chunks = the shorts chunks (TH.caps: one breath, <= 44 characters). Edits: 16:9 "cap16",
 * 9:16 "capShort" (her corrected text), "captions16" / "captions9" {size, y} (her sliders).
 * T3: a manila box #E7D7AE with black Bebas, top at y 135, one or two balanced lines; edits "label" (text, size, hide). */
WF.fixCaps = () => { if (WF.capsFixed || !TH.caps) return; WF.capsFixed = true; const cs = TH.caps;
  const WEAK = new Set(['a', 'an', 'the', 'to', 'for', 'of', 'in', 'on', 'at', 'and', 'so', 'is', 'or', 'but', 'with', 'my', 'your', 'that', 'i', 'it', 'be', 'are', 'was', 'can', 'will', 'as', 'if', 'like']);
  const nn = (s) => s.toLowerCase().replace(/[^a-z']/g, '');
  for (let i = 0; i < cs.length - 1; i++) { const a = cs[i], b = cs[i + 1]; if (b.t0 - a.ws[a.ws.length - 1].e > 0.6) continue;
    while (a.ws.length > 2 && WEAK.has(nn(a.ws[a.ws.length - 1].s))) b.ws.unshift(a.ws.pop());
    a.text = a.ws.map(x => x.s).join(' '); b.text = b.ws.map(x => x.s).join(' '); b.t0 = Math.max(a.t0 + 0.2, b.ws[0].t - 0.05); a.t1 = Math.min(b.t0, a.ws[a.ws.length - 1].e + 0.35); }
};
/** keywords in the caption style (critic 2026-11-02: the house keyword read at under 3:1 on her shirt): Bebas paper with the
 *  captions' dark outline, ~word~ in stamp red, at chest height; the caption steps aside while it is up. Editable (key). */
WF.kws = [];
WF.kwDraw = (t) => { for (const k of WF.kws) { if (t < k.t0 || t >= k.t1) continue; const p = wfE(t, k.t0, 0.22); const z = V(118, 104); const f = FB(z);
    const parts = k.text.split(/(~[^~]+~)/).filter(Boolean).map(s => ({ s: s.replace(/~/g, '').trim().toUpperCase(), red: /^~/.test(s) })).filter(x => x.s);
    const ov = ovr('kw-' + k.id); const str = ov.s != null ? ov.s.toUpperCase() : null; const segs = str ? [{ s: str, red: false }] : parts;
    const sp = tw(' ', f); const tot = segs.reduce((a, s) => a + tw(s.s, f), 0) + sp * (segs.length - 1); const y = k.y; let x = CX - tot / 2;
    withA(p, () => { ctx.save(); ctx.lineJoin = 'round'; ctx.miterLimit = 2; setFont(f, 0); ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
      ctx.shadowColor = 'rgba(0,0,0,0.55)'; ctx.shadowBlur = z * 0.18; ctx.shadowOffsetY = z * 0.03; for (const s of segs) { ctx.fillStyle = s.red ? WF.red : WF.paper; ctx.fillText(s.s, x, y + (1 - p) * 20); x += tw(s.s, f) + sp; }
      ctx.restore(); });
    regBox(ov, CX - tot / 2, y - z * 0.85, tot, z * 1.05, { text: segs.map(s => s.s).join(' '), def: k.text.replace(/~/g, '') }); } };
WF.capDraw = (t) => { WF.fixCaps();
  const c = (TH.caps || []).find(x => x.t0 <= t && t < x.t1); if (!c) return;
  if (TH.capOff.some(([a, b]) => t >= a && t < b)) return;
  const sc = SCENES[sceneIndex(t)]; if (sc && sc.card && t >= sc.start) return; if (sc && sc.noCaps) return;
  const port = PORTRAIT; const key = port ? 'capShort' : 'cap16'; const ce = (EDIT.data[key] || {})[c.i]; const text = (ce != null ? ce : c.text);
  const cst = EDIT.data[port ? 'captions9' : 'captions16'] || {}; let size = cst.size ? clamp(Math.round(cst.size), 36, 150) : V(62, 70);
  const yBase = cst.y != null ? cst.y : port ? (FOOT.capYNow ? 1790 : 1535 + size * 0.3) : 985;   // 9:16 under a top panel: on her chest, never across her face
  let f = FW(size, 500), ls = -size * 0.01; const words = text.split(/\s+/).filter(Boolean).filter((w_, i_, a_) => !(i_ > 0 && w_.toLowerCase() === a_[i_ - 1].toLowerCase())); const red = WF.redWord(words);
  // one line in 16:9 (wider than 84 % -> two balanced lines), two balanced lines max in 9:16
  const cxC = !port && FOOT.capX ? FOOT.capX[0] : CX; const maxW = !port && FOOT.capX ? Math.min(W * 0.84, FOOT.capX[1]) : W * V(0.84, 0.88); let lines = [words];
  if (tw(text, f, ls) > maxW) { let bi = 1, bm = 1e9; for (let k = 1; k < words.length; k++) { const m_ = Math.max(tw(words.slice(0, k).join(' '), f, ls), tw(words.slice(k).join(' '), f, ls)); if (m_ < bm) { bm = m_; bi = k; } } lines = [words.slice(0, bi), words.slice(bi)]; }
  { const wide = Math.max(...lines.map(l => tw(l.join(' '), f, ls))); if (wide > maxW) { const k = Math.max(0.68, maxW / wide); size = Math.round(size * k); f = FW(size, 500); ls = -size * 0.01; } }
  const lh = size * 1.18; let y0 = yBase - (lines.length - 1) * lh; if (port && cst.y == null && typeof capClearFace === 'function') { const bh0 = (lines.length - 1) * lh + size * 1.02, top0 = y0 - size * 0.86; y0 += capClearFace(t, top0, bh0) - top0; }   /* 1:1 / 4:5: off her face and chin (2026-11-16) */ let k0 = 0; let bx0 = 1e9, bx1 = -1e9;
  ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.6)'; ctx.shadowBlur = size * 0.35; ctx.shadowOffsetY = size * 0.04;
  lines.forEach((ln, li) => { const s = ln.join(' '); const w = tw(s, f, ls); let x = clamp(cxC - w / 2, V(96, 60), W - V(96, 60) - w); bx0 = Math.min(bx0, x); bx1 = Math.max(bx1, x + w); const y = y0 + li * lh; const sp = tw(' ', f, ls);
    ln.forEach((wd, j) => { const ww = tw(wd, f, ls); setFont(f, ls); ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
      ctx.fillStyle = k0 + j === red ? (WF.capKey || '#FF5A4E') : WF.paper; ctx.fillText(wd, x, y); x += ww + sp; });
    k0 += ln.length; });
  ctx.letterSpacing = '0px'; ctx.restore();
  regBox({ id: 'caption/' + c.i, edited: ce != null, hide: false }, bx0, y0 - size * 0.86, bx1 - bx0, (lines.length - 1) * lh + size * 1.02, { kind: 'caption', text: ce != null ? ce : c.text, def: c.text, cue: c.i, cap16: !port });
};
WF.labelDraw = () => {
  const m = FOOT.m; if (!m.label) return; SCENE_ID = 'label'; EL.seen.clear();
  const ov = ovr('label'); const str = (ov.s != null ? ov.s : m.label); const info = { text: str, def: m.label, kind: 'box', sk: ov.k, label: 'top title (text, size, place)' };
  const z = 84, padX = 34, padY = 22, top = 135; const f = FB(z), ls = 1; const U = str.toUpperCase();
  let lines = [U]; if (tw(U, f, ls) > W - 160) { const ws = U.split(' '); let bi = 1, bm = 1e9; for (let k = 1; k < ws.length; k++) { const mm = Math.max(tw(ws.slice(0, k).join(' '), f, ls), tw(ws.slice(k).join(' '), f, ls)); if (mm < bm) { bm = mm; bi = k; } } lines = [ws.slice(0, bi).join(' '), ws.slice(bi).join(' ')]; }
  const bw = Math.max(...lines.map(l => tw(l, f, ls))) + padX * 2, bh = lines.length * z * 0.98 + padY * 2 - z * 0.12;
  if (ov.hide) { regBox(ov, CX - bw / 2, top, bw, bh, info); return; }
  moved(ov, () => { rect(CX - bw / 2, top, bw, bh, WF.manila);
    lines.forEach((l, i) => _txt(l, CX, top + padY + z * 0.8 + i * z * 0.98, f, WF.ink, 'center', 'alphabetic', ls));
    regBox(ov, CX - bw / 2, top, bw, bh, info); }, [CX, top]);
  WF.labelH = top + bh;
};
(function wfPost() {
  const post0 = TH.post, lb0 = TH.labelBottom;
  // the manila top title's bottom, computed as WF.labelDraw lays it out (its text and size edits included); the house label is not drawn
  WF.labelBottomCalc = () => { const m = FOOT.m; const e = (EDIT.data.t || {})['label/label']; const str = (e && e.s != null ? e.s : m.label).toUpperCase(); const k = (e && e.pos && e.pos[LAYOUT] && e.pos[LAYOUT].k) || 1;
    const z = 84, f = FB(z), padY = 22; const lines = tw(str, f, 1) > W - 160 ? 2 : 1; return 135 + (lines * z * 0.98 + padY * 2 - z * 0.12) * k; };
  TH.labelBottom = () => (FOOT.m && FOOT.m.kind === 'short' && FOOT.m.fmt && FOOT.m.fmt !== 'E' ? 0 : FOOT.m && FOOT.m.kind === 'short' && FOOT.m.label ? WF.labelBottomCalc() : lb0());
  TH.post = (t) => {
    if (FOOT.m.kind === 'short' && FOOT.m.fmt && FOOT.m.fmt !== 'E') {   // 2026-11-10 format mix: moments/formats.js draws captions, titles and the cover
      const lab = FOOT.m.label; FOOT.m.label = ''; try { post0(t); } finally { FOOT.m.label = lab; } return; }
    const isShort = FOOT.m.kind === 'short', end = isShort && t >= FOOT.dur; const lab = FOOT.m.label, sc = SHOW.captions;
    FOOT.m.label = ''; SHOW.captions = false;
    try { post0(t); } finally { FOOT.m.label = lab; SHOW.captions = sc; }
    if (end || ((FOOT.outro || FOOT.ocard) && t >= FOOT.dur)) return;
    ctx.save(); ctx.setTransform(...BASE); g = G.ink;
    SCENE_ID = 'keywords'; EL.seen.clear(); WF.kwDraw(t);
    if (sc) WF.capDraw(t);
    if (isShort) WF.labelDraw();
    ctx.restore(); ctx.setTransform(1, 0, 0, 1, 0, 0);
  };
})();
