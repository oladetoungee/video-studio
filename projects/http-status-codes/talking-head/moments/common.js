/* http-status-codes: the talking-head look = her pick 2026-11-02, B · THE FIRST DIGIT, for the full edit, shorts and teaser.
 * Graphics come from the film's kit (film/scenes/fdkit.js: FD.code / type / clip / http / table / flow / photo / mistake),
 * all flat group-colour grounds, ink type, real pages on white. Black phrase cards (TH.card on fdBlack) with one serif word.
 * Type set 02 Bold condensed (TYPE-SYSTEM.md 2026-11-07): Anton UPPERCASE headlines, Inter Tight body / captions, DM Mono labels.
 * Captions: solid fill + soft shadow, no box, no outline. 16:9 Inter Tight 600 white, every status code in its group colour.
 * Shorts: odd = Anton caps (one coloured word); even = Inter Tight sentence captions. Top title: a flat block in the short's
 * group colour, Anton caps + an Inter Tight line under it (the part after '|').
 * Every text is txt()/regBox (editable), every block movable. Loaded before every moment script. */
'use strict';
Object.assign(TH.look, {
  disp: (s) => FN(s), dispLS: 0, upper: true, font: 'disp', capFit: true, kwHideCap: true,
  fg: FD.ink, ink: FD.ink, acc: FD.ink, accOnDark: FD.c4,
  ground: 'fd1', cardGround: 'fdBlack', panel: 'fdWhite', grid: false,
  outline: FD.white, outlinePx: 8, ring: FD.ink, ringPx: 4, plate: 'fd', dim: 0.38, band: FD.g1, rule: 'rgba(18,18,18,0.3)',
});
FD.n = 0;
/** a full-frame graphic (no film needed): an L9-style insert, her voice and captions go on */
FD.full = (s, draw, o = {}) => {
  const lead = o.lead == null ? 0.12 : o.lead, hold = o.hold == null ? 0.45 : o.hold;
  let t0, t1; if (Array.isArray(s)) { t0 = s[0]; t1 = s[1]; } else if (s.from != null) { t0 = s.from.t - lead; t1 = (s.to || s.from).e + hold; } else { t0 = s.t - lead; t1 = s.e + hold; }
  if (o.until != null) t1 = o.until;
  TH.used = true; const id = o.id || 'insert-' + (++FD.n);
  TH.segs.push({ kind: 'cutaway', t0, t1, id, cover: true, card: false, ground: o.ground || 'fd1', o, noCaps: o.noCaps,
    draw: (t) => { const k = 1 + 0.025 * E.inOutCubic(clamp((t - t0) / Math.max(0.5, t1 - t0)));   // a slow push: never dead still
      withT(W / 2 * (1 - k), H / 2 * (1 - k), k, 0, () => draw(t, { x: 0, y: 0, w: W, h: H })); } });
  return { t0, t1, id };
};

/* ---------- captions ---------- */
FD.CODE_RE = /^(\d{3}|[1-5]xx)$/i;
/** a soft shadow under caption type on her footage (contrast without an outline) */
FD.soft = (size) => { ctx.shadowColor = 'rgba(0,0,0,0.55)'; ctx.shadowBlur = Math.max(8, size * 0.28); ctx.shadowOffsetY = Math.max(1, size * 0.03); };
FD.WEAK = new Set(['a', 'an', 'the', 'to', 'for', 'of', 'in', 'on', 'at', 'and', 'so', 'is', 'or', 'but', 'with', 'my', 'your', 'that', 'i', 'it', 'be', 'are', 'was', 'can', 'will', 'as', 'if', 'like', 'this', 'there', 'they', 'you', 'we', 'what', 'just', 'means', 'right', "it's", "that's", "you're", "don't", 'yeah', 'ok', 'kind', 'really', 'very', 'about', 'when', 'which', 'then', 'also', 'one', 'some', 'have', 'has', 'would', 'does', 'not', 'their', 'them', 'who']);
FD.hiWord = (ws) => { const nn = (w) => w.toLowerCase().replace(/[^a-z0-9x']/g, '');
  const ci = ws.findIndex(w => FD.CODE_RE.test(nn(w))); if (ci >= 0) return [ci, FD.colDark(nn(ws[ci]))];
  let best = -1, sc = -1; ws.forEach((w, i) => { const n = nn(w); if (!n || FD.WEAK.has(n)) return; const s = n.length; if (s > sc) { sc = s; best = i; } });
  return [best, FD.hl]; };
/** C1 (shorts + 9:16) and her Helvetica (16:9 full edit), from TH.caps (one breath each) */
FD.capDraw = (t) => {
  const c = (TH.caps || []).find(x => x.t0 <= t && t < x.t1); if (!c) return;
  if (TH.capOff.some(([a, b]) => t >= a && t < b)) return;
  const sc = SCENES[sceneIndex(t)]; if (sc && sc.card && t >= sc.start) return; if (sc && sc.noCaps) return;
  const port = PORTRAIT; const key = port ? 'capShort' : 'cap16'; const ce = (EDIT.data[key] || {})[c.i]; const raw = ce != null ? ce : c.text;
  const cst = EDIT.data[port ? 'captions9' : 'captions16'] || {};
  if (!port) {   // 16:9: Inter Tight 600, solid white with a soft shadow (no box, no outline: TYPE-SYSTEM 2026-11-07), the codes in their group colour
    let size = cst.size ? clamp(Math.round(cst.size), 36, 110) : 58; const f = FS(size, 600), ls = -size * 0.01;
    const yBase = cst.y != null ? cst.y : 990; const cxC = FOOT.capX ? FOOT.capX[0] : CX; const maxW = FOOT.capX ? Math.min(W * 0.84, FOOT.capX[1]) : W * 0.8;
    const words = raw.split(/\s+/).filter(Boolean); let lines = [words];
    if (tw(raw, f, ls) > maxW) { let bi = 1, bm = 1e9; for (let k = 1; k < words.length; k++) { const m_ = Math.max(tw(words.slice(0, k).join(' '), f, ls), tw(words.slice(k).join(' '), f, ls)); if (m_ < bm) { bm = m_; bi = k; } } lines = [words.slice(0, bi), words.slice(bi)]; }
    const lh = size * 1.22; const y0 = yBase - (lines.length - 1) * lh; const sp = tw(' ', f, ls); let bx0 = 1e9, bx1 = -1e9;
    const widths = lines.map(l => tw(l.join(' '), f, ls)); const bw = Math.max(...widths) + 40; const bTop = y0 - size * 0.95, bH = (lines.length - 1) * lh + size * 1.34;
    const cm = FD.capMode ? FD.capMode(cxC - bw / 2, bTop, bw, bH) : 'foot';   // 2026-11-07: readable on every ground (ink on a light graphic, a dark band when half light)
    if (cm === 'mixed') fillRR(cxC - bw / 2 - 10, bTop - 8, bw + 20, bH + 16, 14, '#111114');
    ctx.save(); if (cm !== 'light') FD.soft(size);
    lines.forEach((ln, li) => { let x = cxC - widths[li] / 2; bx0 = Math.min(bx0, x); bx1 = Math.max(bx1, x + widths[li]);
      ln.forEach((wd) => { const n = wd.toLowerCase().replace(/[^a-z0-9x]/g, ''); _txt(wd, x, y0 + li * lh, f, cm === 'light' ? FD.ink : FD.CODE_RE.test(n) ? FD.colDark(n) : '#FFFFFF', 'left', 'alphabetic', ls); x += tw(wd, f, ls) + sp; }); });
    ctx.restore();
    regBox({ id: 'caption/' + c.i, edited: ce != null, hide: false }, cxC - bw / 2, bTop, bw, bH, { kind: 'caption', text: raw, def: c.text, cue: c.i, cap16: true });
    return;
  }
  { const fm = FD.fmtOf(); if (fm && fm !== 'E') { FD.capFmt(t, c, raw, ce, cst, fm); return; } }
  if (FOOT.m.capStyle === 'box' || FOOT.m.kind === 'teaser') {   // sentence captions: her words as spoken, Inter Tight 600 white with a soft shadow (no box), the codes in colour
    let size = cst.size ? clamp(Math.round(cst.size), 40, 130) : 70; const f = FS(size, 600);
    const yB = cst.y != null ? cst.y : (FOOT.capYNow ? FOOT.capYNow + 40 : 1560); const words = raw.split(/\s+/).filter(Boolean); const maxW = W * 0.82; let lines = [words];
    if (tw(raw, f) > maxW) { let bi = 1, bm = 1e9; for (let k = 1; k < words.length; k++) { const m_ = Math.max(tw(words.slice(0, k).join(' '), f), tw(words.slice(k).join(' '), f)); if (m_ < bm) { bm = m_; bi = k; } } lines = [words.slice(0, bi), words.slice(bi)]; }
    const lh = size * 1.18; const y0 = yB - (lines.length - 1) * lh; const ws = lines.map(l => tw(l.join(' '), f)); const bw = Math.max(...ws) + 44, bt = y0 - size * 0.98, bh = (lines.length - 1) * lh + size * 1.4; const sp = tw(' ', f);
    const cm = FD.capMode ? FD.capMode(CX - bw / 2, bt, bw, bh) : 'foot'; if (cm === 'mixed') fillRR(CX - bw / 2, bt, bw, bh, 18, '#111114');
    ctx.save(); if (cm !== 'light') FD.soft(size);
    lines.forEach((ln, li) => { let x = CX - ws[li] / 2; ln.forEach((wd) => { const n = wd.toLowerCase().replace(/[^a-z0-9x]/g, ''); _txt(wd, x, y0 + li * lh, f, cm === 'light' ? FD.ink : FD.CODE_RE.test(n) ? FD.colDark(n) : '#FFFFFF', 'left'); x += tw(wd, f) + sp; }); });
    ctx.restore();
    regBox({ id: 'caption/' + c.i, edited: ce != null, hide: false }, CX - bw / 2, bt, bw, bh, { kind: 'caption', text: raw, def: c.text, cue: c.i });
    return;
  }
  const text = raw.toUpperCase(); let size = cst.size ? clamp(Math.round(cst.size), 40, 150) : 86;
  const yBase = cst.y != null ? cst.y : (FOOT.capYNow ? FOOT.capYNow + size * 0.3 + 40 : 1540 + size * 0.3);
  let f = FN(size), ls = size * 0.005; const words = text.split(/\s+/).filter(Boolean); const [hi, hiCol] = FD.hiWord(words);
  const maxW = W * 0.86; let lines = [words];
  if (tw(text, f, ls) > maxW) { let bi = 1, bm = 1e9; for (let k = 1; k < words.length; k++) { const m_ = Math.max(tw(words.slice(0, k).join(' '), f, ls), tw(words.slice(k).join(' '), f, ls)); if (m_ < bm) { bm = m_; bi = k; } } lines = [words.slice(0, bi), words.slice(bi)]; }
  { const wide = Math.max(...lines.map(l => tw(l.join(' '), f, ls))); if (wide > maxW) { size = Math.round(size * Math.max(0.66, maxW / wide)); f = FN(size); ls = size * 0.005; } }
  const lh = size * 0.94; const y0 = yBase - (lines.length - 1) * lh; let k0 = 0; let bx0 = 1e9, bx1 = -1e9;
  ctx.save(); FD.soft(size);
  lines.forEach((ln, li) => { const s = ln.join(' '); const w = tw(s, f, ls); let x = clamp(CX - w / 2, 60, W - 60 - w); bx0 = Math.min(bx0, x); bx1 = Math.max(bx1, x + w); const y = y0 + li * lh; const sp = tw(' ', f, ls);
    ln.forEach((wd, j) => { setFont(f, ls); ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
      ctx.fillStyle = k0 + j === hi ? hiCol : '#FFFFFF'; ctx.fillText(wd, x, y); x += tw(wd, f, ls) + sp; });
    k0 += ln.length; });
  ctx.letterSpacing = '0px'; ctx.restore();
  regBox({ id: 'caption/' + c.i, edited: ce != null, hide: false }, bx0, y0 - size * 0.8, bx1 - bx0, (lines.length - 1) * lh + size, { kind: 'caption', text: raw, def: c.text, cue: c.i });
};

/* ---------- shorts top title (T7): group-colour block, heavy ink + italic serif ---------- */
FD.labelParts = (str) => { const m = str.match(/^(.*?)\s*\|\s*(.*)$/); return m ? [m[1], m[2]] : [str, '']; };
FD.labelLayout = (str, k = 1) => { const [a, b] = FD.labelParts(str); const z = 92 * k, z2 = 62 * k; const maxW = W - 140;
  let la = FD.wrap(UP(a), FN(z), maxW - 60), lb = b ? FD.wrap(b, FI(z2), maxW - 60) : [];
  const h = 40 * k + la.length * z * 1.02 + (lb.length ? lb.length * z2 * 1.1 + 14 * k : 0) + 30 * k; return { la, lb, z, z2, h }; };
FD.labelCol = () => { const m = FOOT.m; const s = (m.labelCode || m.label || ''); const mm = s.match(/\b([1-5])(\d\d|xx)\b/i); return mm ? FD['g' + mm[1]] : FD.g1; };
FD.labelDraw = () => {
  const m = FOOT.m; if (!m.label) return; SCENE_ID = 'label'; EL.seen.clear();
  const ov = ovr('label'); const str = (ov.s != null ? ov.s : m.label); const info = { text: str, def: m.label, kind: 'box', sk: ov.k, label: 'top title (text; "|" starts the italic part)' };
  if (m.labelStyle === 'stack') {   // T7 stacked: a full-width band of the group colour from the top edge, heavy left + italic serif under
    const L = FD.labelLayout(str, 1.18); const top = 0, h = L.h + 70; if (ov.hide) { regBox(ov, 0, 0, W, h, info); return; }
    moved(ov, () => { rect(0, 0, W, h, FD.labelCol()); let y = 80 + L.z * 0.9;
      L.la.forEach((l) => { _txt(l, 70, y, FN(L.z), FD.ink, 'left'); y += L.z * 1.02; });
      L.lb.forEach((l) => { _txt(l, 72, y - L.z * 0.2 + L.z2 * 0.3, FI(L.z2), FD.ink, 'left'); y += L.z2 * 1.05; });
      regBox(ov, 0, 0, W, h, info); }, [CX, 0]);
    return;
  }
  const top = 110; const L = FD.labelLayout(str); const bw = W - 120, x = 60;
  if (ov.hide) { regBox(ov, x, top, bw, L.h, info); return; }
  moved(ov, () => { rect(x, top, bw, L.h, FD.labelCol()); let y = top + 40 + L.z * 0.9;
    L.la.forEach((l) => { _txt(l, CX, y, FN(L.z), FD.ink, 'center'); y += L.z * 1.02; });
    y += 4; L.lb.forEach((l) => { _txt(l, CX, y - L.z * 0.2 + L.z2 * 0.3, FI(L.z2), FD.ink, 'center'); y += L.z2 * 1.05; });
    regBox(ov, x, top, bw, L.h, info); }, [CX, top]);
};
(function fdPost() {
  const post0 = TH.post, lb0 = TH.labelBottom;
  FD.labelBottomCalc = () => { const m = FOOT.m; const e = (EDIT.data.t || {})['label/label']; const str = e && e.s != null ? e.s : m.label; const k = (e && e.pos && e.pos[LAYOUT] && e.pos[LAYOUT].k) || 1;
    if (e && (e.hide || (e.pos && e.pos[LAYOUT] && e.pos[LAYOUT].hide))) return 0; return m.labelStyle === 'stack' ? (FD.labelLayout(str, 1.18).h + 70) * k : 110 + FD.labelLayout(str).h * k; };
  TH.labelBottom = () => (FOOT.m && FOOT.m.kind === 'short' && FOOT.m.label && PORTRAIT ? ((FOOT.m.fmt || 'E') === 'E' ? FD.labelBottomCalc() : 0) : lb0());
  TH.post = (t) => {
    const isShort = FOOT.m.kind === 'short', end = isShort && t >= FOOT.dur; const lab = FOOT.m.label, sc = SHOW.captions;
    FOOT.m.label = ''; SHOW.captions = false;
    try { post0(t); } finally { FOOT.m.label = lab; SHOW.captions = sc; }
    if (end || (FOOT.outro && t >= FOOT.dur)) return;
    ctx.save(); ctx.setTransform(...BASE); g = G.ink;
    if (isShort && FD.coverOn(t)) { FD.coverDraw(t); ctx.restore(); ctx.setTransform(1, 0, 0, 1, 0, 0); return; }   // the cover frame (2026-11-10)
    if (sc) { SCENE_ID = 'captions'; FD.capDraw(t); }
    if (isShort && (FOOT.m.fmt || 'E') === 'E') FD.labelDraw(); else if (isShort) FD.titleFmt(t);
    ctx.restore(); ctx.setTransform(1, 0, 0, 1, 0, 0);
  };
})();

/* ---------- shorts formats (her note 2026-11-08 "everything is the same format"; SHORTS-PLAYBOOK "Format menu") ----------
 * manifest "fmt" per short: A wide · B split · C cut-out · D captions on top · E window + title (the old look) · F square +
 * karaoke · G letterbox. The layouts are chosen in plan.js (FD_PLAN short); here: the title of each format, its captions. */
(function fdFonts2() {   // 2026-11-09 formats H / I / M (Inter Tight 800-900) and K (DM Serif Display, film subtitles), from library/fonts (OFL)
  for (const [fam, file, desc] of [['FDHeavy', 'InterTightExtraBold.ttf', { weight: '800' }], ['FDHeavy', 'InterTightBlack.ttf', { weight: '900' }], ['FDSerif', 'DMSerifDisplay-Regular.ttf', {}]]) {
    const x = new XMLHttpRequest(); x.open('GET', '/library/fonts/' + file, false); x.overrideMimeType('text/plain; charset=x-user-defined'); x.send();
    if (x.status !== 200) continue;
    const s = x.responseText, u = new Uint8Array(s.length); for (let i = 0; i < s.length; i++) u[i] = s.charCodeAt(i) & 255;
    const ff = new FontFace(fam, u.buffer, desc); document.fonts.add(ff); ff.load(); }
})();
const FH = (s, w = 900) => `${w} ${s}px FDHeavy`, FSER = (s) => `400 ${s}px FDSerif`;
FD.wall = '#2B2E35';   // J: the wall behind her (lighter than the screen so the screen reads as an object)
FD.JS = { x: 40, y: 110, w: 1000, h: 1000 };   // J: a big screen on the wall; her head and shoulders overlap its lower half (2026-11-09)
/** J: the room = a screen on a dark wall (thin bezel, soft shadow, a low console line); content(t, r) fills the screen. While she
 *  talks the screen holds the short's codes (manifest "poster", editable as 'poster'); a graphic swaps in with a quick fade. */
FD.jRoom = (t, q, content) => {
  const S = FD.JS; rect(0, 1560, W, H - 1560, '#121317'); rect(0, 1556, W, 4, '#2A2D35');
  ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.55)'; ctx.shadowBlur = 50; ctx.shadowOffsetY = 22; rect(S.x - 12, S.y - 12, S.w + 24, S.h + 24, '#0A0A0C'); ctx.restore();
  const r = { x: S.x, y: S.y, w: S.w, h: Math.round(S.h * 0.46) }; const g0 = g; g = G[FD.gKey()] || g0; rect(S.x, S.y, S.w, S.h, g.bg);   // content stays in the upper part (r), above her head
  const a = q.t0 < 0.05 ? 1 : MOTION.ease(t, q.t0, 0.25, 'outQuint');
  ctx.save(); ctx.beginPath(); ctx.rect(r.x, r.y, r.w, r.h); ctx.clip();
  withA(a, () => { if (content === FD.poster) FD.bigTitle({ x: r.x + 30, y: r.y + 30, w: r.w - 60, h: r.h - 60 }, { key: 'poster', def: FOOT.m.poster || FD.labelParts(FOOT.m.label || '')[0], whole: true, zMax: 420, maxL: 2, padX: 10, what: 'the codes on the screen behind her' });
    else content(t, r); });
  ctx.restore(); g = g0;
  rect(S.x + S.w / 2 - 70, S.y + S.h + 12, 140, 10, '#0A0A0C');   // the screen's foot
};
/** K: a small mono tag top-left (DM Mono, editable as 'tag'); M: the title in black heavy sans in a white rounded box (TikTok's own text style), editable as 'label' */
FD.smallText = (key, def, draw, what) => { const sid = SCENE_ID; SCENE_ID = 'label'; EL.seen.delete('label/' + key); const ov = ovr(key); const str = ov.s != null ? ov.s : def;
  try { draw(ov, str, { text: str, def, kind: 'box', sk: ov.k, label: what }); } finally { SCENE_ID = sid; } };
FD.tagK = () => FD.smallText('tag', UP(FD.labelParts(FOOT.m.label || '')[0]), (ov, str, info) => { const f = FM(36); const w = tw(str, f, 36 * 0.12); const x = 64, y = 112;
  if (ov.hide) { regBox(ov, x, y - 34, w, 44, info); return; }
  moved(ov, () => { ctx.save(); FD.soft(36); _txt(str, x, y, f, '#FFFFFF', 'left', 'alphabetic', 36 * 0.12); ctx.restore(); regBox(ov, x, y - 34, w, 44, info); }, [x, y]); }, 'small label top-left');
FD.boxM = () => { const def = (FOOT.m.label || '').replace(/\s*\|\s*/, ' | ');
  FD.smallText('label', def, (ov, str, info) => { const z = 66; const f = FH(z, 800); const maxW = W - 220;
    const lines = str.split('|').map(x => x.trim()).filter(Boolean).flatMap(l => FD.wrap(l, f, maxW)).slice(0, 3);
    const lh = z * 1.08, pw = 40, ph = 24; const bw = Math.max(...lines.map(l => tw(l, f))) + pw * 2, bh = lines.length * lh + ph * 2 - (lh - z) ; const x = CX - bw / 2, y = 168;
    if (ov.hide) { regBox(ov, x, y, bw, bh, info); return; }
    moved(ov, () => { fillRR(x, y, bw, bh, 28, '#FFFFFF'); lines.forEach((l, i) => _txt(l, CX, y + ph + z * 0.8 + i * lh, f, '#111111', 'center')); regBox(ov, x, y, bw, bh, info); }, [CX, y]); }, 'title box (text; "|" starts a new line)'); };
FD.fmtOf = () => (typeof FOOT !== 'undefined' && FOOT.m && FOOT.m.kind === 'short' && PORTRAIT ? (FOOT.m.fmt || 'E') : null);
FD.gKey = () => 'fd' + (FD.cls(String(FOOT.m.labelCode || '')) || 1);
FD.inGfx = (t) => (FD.gfxSpans || []).some(([a, b]) => t >= a && t < b);
FD.FLASH = 1.6;   // D: the title holds the top band for the first 1.6 s
/** the title set big inside r (Anton caps, as many lines as fit, the part after "|" in Inter Tight under it); editable as 'label' (or o.key) */
FD.bigTitle = (r, o = {}) => {
  const sid = SCENE_ID; SCENE_ID = 'label'; const key = o.key || 'label'; EL.seen.delete('label/' + key); const ov = ovr(key); SCENE_ID = sid;
  const def = o.def != null ? o.def : FOOT.m.label || ''; const str = ov.s != null ? ov.s : def;
  const info = { text: str, def, kind: 'box', sk: ov.k, label: o.what || 'title (text; "|" starts the second line)' };
  if (ov.hide) { const s2 = SCENE_ID; SCENE_ID = 'label'; regBox(ov, r.x, r.y, r.w, r.h, info); SCENE_ID = s2; return; }
  const [a, b] = o.whole ? [str, ''] : FD.labelParts(str); const maxW = r.w - (o.padX != null ? o.padX : 60) * 2; const maxL = o.maxL || 3;
  let z = o.zMax || 200, la = [];
  for (; z > 40; z -= 4) { la = FD.wrap(UP(a), FN(z), maxW); const z2_ = Math.min(o.z2Max || 60, z * 0.45); const h = la.length * z * 0.98 + (b ? 16 + z2_ * 1.15 * 2 : 0);
    if (la.length <= maxL && h <= r.h && Math.max(...la.map(l => tw(l, FN(z)))) <= maxW) break; }
  const z2 = Math.round(Math.min(o.z2Max || 60, z * 0.45)); const lb = b ? FD.wrap(b, FI(z2), maxW) : [];
  const hh = la.length * z * 0.98 + (lb.length ? 16 + lb.length * z2 * 1.15 : 0);
  const y0 = r.y + (o.valign === 'top' ? 0 : o.valign === 'bottom' ? r.h - hh : (r.h - hh) / 2); const cx = r.x + r.w / 2;
  const s2 = SCENE_ID; SCENE_ID = 'label';
  moved(ov, () => { let y = y0 + z * 0.86;
    la.forEach((l) => { _txt(l, cx, y, FN(z), o.col || FD.ink, 'center'); y += z * 0.98; });
    y += 16 - z * 0.98 + z * 0.12 + z2; lb.forEach((l) => { _txt(l, cx, y, FI(z2), o.col2 || o.col || FD.ink, 'center'); y += z2 * 1.15; });
    regBox(ov, r.x, y0, r.w, hh, info); }, [cx, y0]);
  SCENE_ID = s2;
};
/** B / C: the poster above her while she talks (B: the title; C: the codes, manifest "poster", huge, her cut-out stands in front) */
FD.poster = (t, r) => { if (FD.fmt === 'C') FD.bigTitle({ x: r.x, y: r.y, w: r.w, h: r.h }, { key: 'poster', def: FOOT.m.poster || FD.labelParts(FOOT.m.label || '')[0], whole: true, zMax: 400, maxL: 2, valign: 'top', padX: 10, what: 'the big codes behind her' });
  else FD.bigTitle({ x: r.x, y: r.y + 10, w: r.w, h: r.h - 20 }, { zMax: 170, maxL: 3, z2Max: 64 }); };
/** the title of formats D (a flash in the top band), F (a small line over her square), G (big, above her letterbox band) */
FD.titleFmt = (t) => {
  const fm = FOOT.m.fmt; if (!FOOT.m.label) return;
  if (fm === 'D' && t < FD.FLASH + 0.35) { const p = fdIO(t, FD.FLASH, 0.35); const h = 384;
    withT(0, -h * p, 1, 0, () => { rect(0, 0, W, h, FD.labelCol()); FD.bigTitle({ x: 0, y: 40, w: W, h: h - 70 }, { zMax: 120, maxL: 2, z2Max: 52 }); }); }
  if (fm === 'F' && !FD.inGfx(t)) FD.bigTitle({ x: 0, y: 70, w: W, h: 190 }, { zMax: 84, maxL: 2, z2Max: 44, col: '#FFFFFF', col2: 'rgba(255,255,255,0.72)' });
  if (fm === 'K' && !FD.inGfx(t)) FD.tagK();
  if (fm === 'M' && !FD.inGfx(t)) FD.boxM();
  if (fm === 'G') { const on = FD.inGfx(t); const a = 1 - (FD.gfxSpans || []).reduce((m, [x, y]) => Math.max(m, t >= x - 0.01 && t < y ? Math.min(1, (t - x) / 0.2, (y - t) / 0.2) : 0), 0);
    if (a > 0.01) withA(on ? a : 1, () => FD.bigTitle({ x: 0, y: 150, w: W, h: 440 }, { zMax: 130, maxL: 3, z2Max: 60, col: '#FFFFFF', col2: 'rgba(255,255,255,0.72)', valign: 'bottom' })); }
};
/** her captions in formats A-D, F, G: style + place by format (Anton caps or Inter Tight; F and G light each word as she says it) */
FD.capFmt = (t, c, raw, ce, cst, fm) => {
  if (fm === 'D' && t < FD.FLASH) return;
  if (/[HIJKM]/.test(fm)) return FD.capNew(t, c, raw, ce, cst, fm);
  const gfx = FD.inGfx(t); const yN = FOOT.capYNow;
  const S = { A: gfx ? { f: 'anton', cy: 1790 } : { f: 'anton', cy: 1728, ink: true, size: 92 },
    B: { f: 'inter', cy: yN != null ? yN - 25 : 1560 },
    C: { f: 'anton', cy: 1650, hi: true },
    D: gfx ? { f: 'inter', cy: 760 } : { f: 'inter', cy: 196, size: 80 },
    F: { f: 'anton', cy: gfx ? 1790 : 1650, lit: true, size: 96 },
    G: { f: 'inter', cy: gfx ? 1745 : 1440, lit: true, size: 62 } }[fm] || { f: 'anton', cy: 1600 };
  let size = cst.size ? clamp(Math.round(cst.size), 40, 150) : (S.size || (S.f === 'anton' ? 86 : 70));
  const up = S.f === 'anton'; const text = up ? raw.toUpperCase() : raw; let ff = (z) => (up ? FN(z) : FS(z, 600)); let f = ff(size); const ls = up ? size * 0.005 : 0;
  const words = text.split(/\s+/).filter(Boolean); const maxW = W * 0.86; let lines = [words];
  if (tw(text, f, ls) > maxW) { let bi = 1, bm = 1e9; for (let k = 1; k < words.length; k++) { const m_ = Math.max(tw(words.slice(0, k).join(' '), f, ls), tw(words.slice(k).join(' '), f, ls)); if (m_ < bm) { bm = m_; bi = k; } } lines = [words.slice(0, bi), words.slice(bi)]; }
  { const wide = Math.max(...lines.map(l => tw(l.join(' '), f, ls))); if (wide > maxW) { size = Math.round(size * Math.max(0.66, maxW / wide)); f = ff(size); } }
  const lh = size * (up ? 0.98 : 1.18); const cy = cst.y != null ? cst.y : S.cy; const y0 = cy - (lines.length - 1) * lh / 2 + size * 0.36;
  // word times for the lit captions: her words inside the cue (spread evenly when the counts differ)
  let wt = null; if (S.lit) { const ws = (typeof WORDS !== 'undefined' ? WORDS : []).filter(w => w.t >= c.t0 - 0.05 && w.t < c.t1 - 0.02).map(w => w.t);
    wt = ws.length === words.length ? ws : words.map((_, i) => c.t0 + (c.t1 - c.t0) * 0.9 * i / Math.max(1, words.length)); }
  const [hi, hiCol] = S.hi ? FD.hiWord(words) : [-1, null];
  const widths = lines.map(l => tw(l.join(' '), f, ls)); const bw = Math.max(...widths) + 44, bt = y0 - size * 0.95, bh = (lines.length - 1) * lh + size * 1.3;
  const cm = S.ink ? 'light' : FD.capMode ? FD.capMode(CX - bw / 2, bt, bw, bh) : 'foot'; if (cm === 'mixed') fillRR(CX - bw / 2, bt, bw, bh, 18, '#111114');
  ctx.save(); if (cm !== 'light') FD.soft(size); const sp = tw(' ', f, ls); let k0 = 0;
  lines.forEach((ln, li) => { let x = CX - widths[li] / 2; const y = y0 + li * lh;
    ln.forEach((wd, j) => { const n = wd.toLowerCase().replace(/[^a-z0-9x]/g, ''); const k = k0 + j; const code = FD.CODE_RE.test(n);
      let col = cm === 'light' ? FD.ink : '#FFFFFF';
      if (cm !== 'light' && code) col = S.lit ? FD.col(n) : FD.colDark(n);
      if (k === hi && cm !== 'light') col = hiCol;
      if (S.lit && t < wt[k] - 0.02) { ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0)'; _txt(wd, x, y, f, fm === 'G' ? '#7C7C80' : 'rgba(255,255,255,0.4)', 'left', 'alphabetic', ls); ctx.restore(); }
      else _txt(wd, x, y, f, col, 'left', 'alphabetic', ls);
      x += tw(wd, f, ls) + sp; });
    k0 += ln.length; });
  ctx.restore();
  regBox({ id: 'caption/' + c.i, edited: ce != null, hide: false }, CX - bw / 2, bt, bw, bh, { kind: 'caption', text: raw, def: c.text, cue: c.i });
};

/** captions of the 2026-11-09 formats. H / I / J: bold white caps, 2-3 words at a time on her word times (the cue is cut into
 *  chunks; edit the whole cue as before), the cue's key word in yellow (codes in their colour). K: film subtitles (DM Serif
 *  Display, sentence case, white on black boxes, low). M: small bold white sentence case with a soft shadow. */
FD.capNew = (t, c, raw, ce, cst, fm) => {
  const gfx = FD.inGfx(t);
  const S = { H: { cy: gfx ? 880 : 1500, size: 96, chunk: true, font: (z) => FH(z, 900), up: true },
    I: { cy: 1540, size: 76, chunk: true, font: (z) => FH(z, 900), up: true },
    J: { cy: 1700, size: 84, chunk: true, font: (z) => FH(z, 900), up: true },
    K: { cy: 1690, size: 62, font: FSER, box: true },
    M: { cy: gfx ? 1800 : 1560, size: 62, font: (z) => FH(z, 800) } }[fm];
  let size = cst.size ? clamp(Math.round(cst.size), 44, 150) : S.size; const cy = cst.y != null ? cst.y : S.cy;
  const all = (S.up ? raw.toUpperCase() : raw).split(/\s+/).filter(Boolean); if (!all.length) return;
  const ws = (typeof WORDS !== 'undefined' ? WORDS : []).filter(w => w.t >= c.t0 - 0.05 && w.t < c.t1 - 0.02).map(w => w.t);
  const wt = ws.length === all.length ? ws : all.map((_, i) => c.t0 + (c.t1 - c.t0) * 0.9 * i / Math.max(1, all.length));
  const [hi, hiCol] = S.up ? FD.hiWord(all) : [-1, null];
  let words = all, k0 = 0;
  if (S.chunk) {   // 2-3 words a chunk (a chunk ends after a comma / full stop; never one word alone if it can join the next)
    const ch = []; let cur = [];
    all.forEach((w, i) => { cur.push(i); const end = /[,.?!:;]$/.test(w) || cur.length === 3; if (end) { ch.push(cur); cur = []; } });
    if (cur.length) { if (cur.length === 1 && ch.length && ch[ch.length - 1].length < 4) ch[ch.length - 1].push(...cur); else ch.push(cur); }
    let pick = ch[0]; for (const g_ of ch) if (t >= wt[g_[0]] - 0.08) pick = g_;
    words = pick.map(i => all[i]); k0 = pick[0];
  }
  let f = S.font(size); const maxW = W * (S.box ? 0.84 : 0.86); let lines = [words];
  const join = (l) => l.join(' ');
  if (tw(join(words), f) > maxW) { let bi = 1, bm = 1e9; for (let k = 1; k < words.length; k++) { const m_ = Math.max(tw(join(words.slice(0, k)), f), tw(join(words.slice(k)), f)); if (m_ < bm) { bm = m_; bi = k; } } lines = [words.slice(0, bi), words.slice(bi)]; }
  { const wide = Math.max(...lines.map(l => tw(join(l), f))); if (wide > maxW) { size = Math.round(size * Math.max(0.7, maxW / wide)); f = S.font(size); } }
  const lh = size * (S.box ? 1.32 : S.up ? 1.0 : 1.18); const y0 = cy - (lines.length - 1) * lh / 2 + size * 0.36;
  const widths = lines.map(l => tw(join(l), f)); const sp = tw(' ', f);
  let bx0 = 1e9, bx1 = -1e9; let kk = k0;
  ctx.save();
  lines.forEach((ln, li) => { const y = y0 + li * lh; let x = CX - widths[li] / 2; bx0 = Math.min(bx0, x); bx1 = Math.max(bx1, x + widths[li]);
    if (S.box) { const px = size * 0.32; fillRR(x - px, y - size * 0.86, widths[li] + px * 2, size * 1.2, 6, 'rgba(0,0,0,0.86)'); }
    else FD.soft(size);
    ln.forEach((wd) => { const n = wd.toLowerCase().replace(/[^a-z0-9x]/g, ''); let col = '#FFFFFF';
      if (S.up && FD.CODE_RE.test(n)) col = FD.col(n); if (kk === hi) col = hiCol === FD.hl ? FD.hl : FD.col(n);
      _txt(wd, x, y, f, col, 'left', 'alphabetic', 0); x += tw(wd, f) + sp; kk++; }); });
  ctx.restore();
  const bt = y0 - size * 0.95, bh = (lines.length - 1) * lh + size * 1.3; const pad = S.box ? size * 0.32 : 22;
  regBox({ id: 'caption/' + c.i, edited: ce != null, hide: false }, bx0 - pad, bt, bx1 - bx0 + pad * 2, bh, { kind: 'caption', text: raw, def: c.text, cue: c.i });
};

/* ---------- the cover frame (her note 2026-11-10: "the real cover should be on the video… it has nothing to do with thumbnails") ----------
 * Manifest per short: "cover": {"on": true, "dur": 0.1, "at": <source s of the still>, "text": "line, ~one word~ in the code colour",
 * "style": "photo" (default) | "card"}. Drawn OVER the first `dur` seconds (no time inserted: sound and captions stay in sync), so
 * Instagram / TikTok / YouTube can pick it as the cover. ONE style for the series: her still full frame (tools/covers.py cuts it ->
 * assets/covers/<id>.jpg, image cover_<id>) + the line in heavy white Inter Tight with a soft shadow at y ~300-700 (inside the
 * Instagram grid crop y 240-1680, above her face). "card": the code's colour flat with a quiet same-hue line pattern, the line
 * in ink, her cut-out (cover_<id>_cut) at the foot. Editable: the line = text 'cover/cover' (✎ Edit at t = 0), her cut-out =
 * block 'cover/@her' (drag / size). */
FD.coverOf = () => { const c = FOOT.m && FOOT.m.kind === 'short' && PORTRAIT ? FOOT.m.cover : null; return c && c.on !== false ? c : null; };
FD.coverOn = (t) => { const c = FD.coverOf(); return !!c && t >= 0 && t < (c.dur || 0.1); };
FD.coverDraw = (t) => {
  const c = FD.coverOf(); const id = FOOT.m.id; const card = c.style === 'card'; const code = String(FOOT.m.labelCode || '');
  const sid = SCENE_ID; SCENE_ID = 'cover'; EL.seen.clear();
  try {
    if (card) {   // flat colour + a quiet pattern in the same hue (THUMBNAIL-STUDY §7): fine diagonal lines 6 % darker
      rect(0, 0, W, H, FD.col(code)); ctx.save(); ctx.strokeStyle = 'rgba(18,18,18,0.07)'; ctx.lineWidth = 3; ctx.beginPath();
      for (let x = -H; x < W + H; x += 26) { ctx.moveTo(x, 0); ctx.lineTo(x + H * 0.6, H); } ctx.stroke(); ctx.restore();
      const im = IMG['cover_' + id + '_cut']; if (im) { const h = 980, w = im.width / im.height * h; const x = CX - w / 2, y = H - h;
        grp('her', x, y, w, h, () => themeFixed(() => ctx.drawImage(im, x, y, w, h)), { img: true, label: 'her cut-out (drag to move, corners to resize)' }); }
    } else { const im = IMG['cover_' + id]; if (im) themeFixed(() => ctx.drawImage(im, 0, 0, W, H)); else rect(0, 0, W, H, '#111114'); }
    const ov = ovr('cover'); const str = ov.s != null ? ov.s : (c.text || FOOT.m.title || '');
    const info = { text: str, def: c.text || '', kind: 'box', sk: ov.k, label: 'cover line (text; ~word~ = the coloured word)' };
    const segs = []; str.split(/(~[^~]+~)/).filter(Boolean).forEach(p_ => { const on = /^~.*~$/.test(p_);
      p_.replace(/~/g, '').split(/\s+/).filter(Boolean).forEach(w => { if (/^[,.?!:;]+$/.test(w) && segs.length) segs[segs.length - 1].tail = w; else segs.push({ w, on }); }); });
    for (const s_ of segs) if (s_.tail) { s_.w2 = s_.tail; }   // punctuation after the coloured word stays on its line, in the base colour
    const maxW = W - 150, top = card ? 360 : 280, maxH = card ? 520 : 360; let z = 132, lines = [];
    const lay0 = (zz, mw) => { const f = FH(zz, 900); const sp = tw(' ', f); const L = [[]]; let cw = 0;
      for (const s_ of segs) { const ww = tw(s_.w + (s_.w2 || ''), f); if (L[L.length - 1].length && cw + sp + ww > mw) { L.push([]); cw = 0; } cw += (L[L.length - 1].length ? sp : 0) + ww; L[L.length - 1].push(s_); } return L; };
    // the biggest size where the line fits in <= 3 lines with no word alone on the last line (narrowing the measure may rebalance
    // it without adding a line); else the old rule (<= 4 lines that fit)
    const ok = (L, zz) => L.length * zz * 1.06 <= maxH && (L.length === 1 || L[L.length - 1].length >= 2);
    const pick = (zz, maxL) => { let L = lay0(zz, maxW); if (L.length > maxL) return null; if (ok(L, zz)) return L;
      for (let k = 0.96; k > 0.5; k -= 0.03) { const L2 = lay0(zz, maxW * k); if (L2.length > L.length) break; if (ok(L2, zz)) return L2; } return null; };
    lines = null; for (z = 132; z >= 100 && !lines; z -= 4) lines = pick(z, 3); if (lines) z += 4;   // big + balanced first
    if (!lines) for (z = 132; z > 64 && !lines; z -= 4) { const L = lay0(z, maxW); if (L.length <= 3 && L.length * z * 1.06 <= maxH) lines = L; } if (lines && z < 132) z += 4;
    if (!lines) for (z = 132; z > 60; z -= 4) { lines = lay0(z, maxW); if (lines.length <= 4 && lines.length * z * 1.06 <= maxH) break; }
    const f = FH(z, 900), sp = tw(' ', f), lh = z * 1.06; const ww_ = (s_) => tw(s_.w + (s_.w2 || ''), f); const bw = Math.max(...lines.map(l => l.reduce((a, s_, i) => a + ww_(s_) + (i ? sp : 0), 0)));
    const hiCol = card ? '#FFFFFF' : FD.col(code); const base = card ? FD.ink : '#FFFFFF';
    if (ov.hide) { regBox(ov, CX - bw / 2, top, bw, lines.length * lh, info); return; }
    moved(ov, () => { ctx.save(); if (!card) { ctx.shadowColor = 'rgba(0,0,0,0.6)'; ctx.shadowBlur = z * 0.35; ctx.shadowOffsetY = z * 0.04; }
      lines.forEach((l, i) => { const lw = l.reduce((a, s_, k) => a + ww_(s_) + (k ? sp : 0), 0); let x = CX - lw / 2; const y = top + z * 0.86 + i * lh;
        for (const s_ of l) { _txt(s_.w, x, y, f, s_.on ? hiCol : base, 'left', 'alphabetic', 0); if (s_.w2) _txt(s_.w2, x + tw(s_.w, f), y, f, base, 'left', 'alphabetic', 0); x += ww_(s_) + sp; } });
      ctx.restore(); regBox(ov, CX - bw / 2, top, bw, lines.length * lh, info); }, [CX, top]);
  } finally { SCENE_ID = sid; }
};
