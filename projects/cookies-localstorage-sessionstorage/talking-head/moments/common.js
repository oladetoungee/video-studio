/* cookies-localstorage-sessionstorage: the talking-head look = the film's A · CRASH TEST (her pick 2026-11-02), with the
 * cloakroom as one scene in A's style. The look and every graphic live in film/scenes/ck.js (loaded first); this file sets
 * TH.look, the 16:9 captions (type set 03: Helvetica Neue 500, solid white, a soft shadow, one word green for kept / red for gone),
 * the full-frame insert, the black phrase card and the shorts' per-short top title + caption styles (moment "ckStyle").
 * Every text is editable, every block movable: the short label is "label/label", each caption block "caption/<n>". */
'use strict';
{ const r0 = TH.ready; TH.ready = async () => { await CKF; return r0(); }; }
Object.assign(TH.look, {
  disp: (s) => `700 ${s}px "Helvetica Neue"`, dispLS: -0.045, upper: false, font: 'disp', capFit: true, kwHideCap: true,
  fg: CK.white, ink: CK.ink, acc: CK.grn, accOnDark: CK.grn,
  ground: 'ckLab', cardGround: 'ckInk', panel: 'ckWhite', grid: false,
  outline: CK.white, outlinePx: 0, ring: CK.ink, ringPx: 6, plate: 'ck', dim: 0.3,
  band: CK.conc, rule: 'rgba(14,14,14,0.5)', edge: CK.ink,
});
CK.GREEN = new Set(['there', 'stays', 'stay', 'back', 'remember', 'persistent', 'survives', 'keep', 'small', 'strings', 'origin', 'cookie', 'cookies', 'localstorage', 'sessionstorage', 'ticket', 'cart', 'id', 'session', 'login', 'key', 'value', 'server']);
CK.RED = new Set(['gone', 'deleted', 'disappear', 'stateless', 'never', 'cleared', 'clear', 'exceptions', 'httponly', 'third-party', 'any', 'every', 'forget', 'own']);
CK.keyIx = (ws) => { const nn = (w) => w.toLowerCase().replace(/[^a-z0-9'\-]/g, ''); let k = ws.findIndex(w => CK.RED.has(nn(w))); if (k >= 0) return [k, CK.red];
  k = ws.findIndex(w => CK.GREEN.has(nn(w))); return k >= 0 ? [k, CK.grn] : [-1, null]; };

/* ---------- 16:9 captions in this look (set 03): Helvetica Neue 500, solid fill, soft shadow, no outline ---------- */
CK.FOOTG = '#7BE6A6', CK.FOOTR = '#FF7A7A';
/** is the canvas under this box (layout px) an opaque light graphic? (her footage shows through a transparent canvas) */
CK.onLight = (x, y, w, h) => { try { const X = BASE[0] * x + BASE[4], Y = BASE[3] * y + BASE[5], Wd = Math.max(1, BASE[0] * w), Hd = Math.max(1, BASE[3] * h);
    const d = ctx.getImageData(Math.max(0, X | 0), Math.max(0, Y | 0), Wd | 0, Hd | 0).data; let a = 0, l = 0, n = 0;
    for (let i = 0; i < d.length; i += 4 * 16) { a += d[i + 3] / 255; l += (d[i] * 0.2126 + d[i + 1] * 0.7152 + d[i + 2] * 0.0722) / 255 * (d[i + 3] / 255); n++; }
    return !!(n && a / n > 0.6 && l / Math.max(1e-6, a) > 0.55); } catch (e) { return false; } };   // the key-word colours over her footage (lighter, so they read on her room)
CK.capWord = (s, x, y, f, fill, ls = 0) => { ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.55)'; ctx.shadowBlur = 14; ctx.shadowOffsetY = 2; _txt(s, x, y, f, fill, 'left', 'alphabetic', ls); ctx.restore(); };
drawCaptions16 = function (t, opt = {}) {
  const cs = FOOT.caps16 || []; let c = null; for (const x of cs) if (x.t0 <= t && t < x.t1) c = x; if (!c) return;
  const st = capSliderInfo(); const size0 = clamp(Math.round(st.size * 0.7), 36, 110); const yc = clamp(st.y, CAPSIZE.y16[0], CAPSIZE.y16[1]);
  const ce = (EDIT.data.cap16 || {})[c.i]; const text = ce != null ? ce : c.text;
  const cam = camAt(t); let cx = CX, maxW = W * 0.7;
  if (FOOT.capX) { cx = FOOT.capX[0]; maxW = Math.min(maxW, FOOT.capX[1]); }
  else if (cam.boxed) { const b = cam.box; if (b[2] < W * 0.4 || b[3] < H * 0.5) { if (!opt.onFilm) return; } else { cx = b[0] + b[2] / 2; maxW = Math.min(maxW, b[2] * 0.88); } }
  const F5 = (z) => (CK.FB ? `500 ${z}px FBIT` : `500 ${z}px "Helvetica Neue"`);   /* font-board pass 2026-11-13: Inter Tight in the teaser */ const lsz = (z) => -0.01 * z;
  let size = size0, lines = text.includes('\n') ? text.split('\n') : capLines2(text, F5(size), lsz(size), maxW);
  while (size > size0 * 0.62 && Math.max(...lines.map(l => tw(l, F5(size), lsz(size)))) > maxW) { size = Math.round(size * 0.93); lines = text.includes('\n') ? text.split('\n') : capLines2(text, F5(size), lsz(size), maxW); }
  const f = F5(size), lh = size * 1.18; const bw = Math.max(...lines.map(l => tw(l, f, lsz(size)))), bh = lines.length * lh; const by = yc - bh / 2;
  const all = lines.join(' ').split(/\s+/); const [ki, kc] = CK.keyIx(all); let gi = 0;
  // what is under the caption? her footage shows through (transparent canvas) -> white; a light graphic panel -> ink, dark key colours
  const onLight = CK.onLight(cx - bw / 2, by, bw, bh);
  ctx.save(); ctx.setTransform(...BASE); ctx.globalAlpha = 1; ctx.filter = 'none';
  lines.forEach((l, k) => { const y = by + size * 0.92 + k * lh; let x = cx - tw(l, f, lsz(size)) / 2;
    for (const w of l.split(' ')) { const col = gi === ki ? (onLight ? kc : kc === CK.red ? CK.FOOTR : CK.FOOTG) : onLight ? CK.ink : CK.white;
      if (onLight) _txt(w, x, y, f, col, 'left', 'alphabetic', lsz(size)); else CK.capWord(w, x, y, f, col, lsz(size)); x += tw(w + ' ', f, lsz(size)); gi++; } });
  ctx.restore();
  regBox({ id: 'caption/' + c.i, edited: ce != null, hide: false }, cx - bw / 2, by, bw, bh, { kind: 'caption', text, def: c.text, cue: c.i, cap16: true, box: 0 });
};

/* set 03 is sentence case: kinetic type (cards, words behind her, keywords) keeps the case it is written in */
{ const KT0 = KT; KT = (t, o) => KT0(t, { upper: false, ...o }); }

/** a full-frame graphic insert (an L9-style cutaway without a film): her voice goes on, captions on a band under it (16:9) */
CK.n = 0;
CK.full = (s, draw, o = {}) => {
  const lead = o.lead == null ? 0.12 : o.lead, hold = o.hold == null ? 0.5 : o.hold;
  const at = (x, end) => (typeof x === 'number' ? x : end ? x.e + hold : x.t - lead);
  let t0, t1; if (Array.isArray(s)) { t0 = s[0]; t1 = s[1]; } else if (s.from != null) { t0 = at(s.from); t1 = at(s.to || s.from, true); } else { t0 = s.t - lead; t1 = s.e + hold; }
  if (o.until != null) t1 = o.until;
  TH.used = true; const id = o.id || 'insert-' + (++CK.n);
  const band = o.capRoom == null ? V(240, 0) : o.capRoom;
  TH.segs.push({ kind: 'cutaway', t0, t1, id, cover: true, card: false, ground: 'ckLab', o,
    draw: (t) => { if (!PORTRAIT) FOOT.capX = [W / 2, W * 0.84];
      rect(0, 0, W, H, CK.conc); draw(t, { x: 0, y: 0, w: W, h: H - band });
      if (band && !PORTRAIT) rect(0, H - band, W, band, CK.ink); } });
  if (o.sound) CK.sfx(o.sound, t0 + 0.03, o.db != null ? o.db : -4);
  return { t0, t1, id };
};
/** a black phrase card: pure ink, her words, one word green; hard cut in and out (TH.card on ckInk) */
CK.card = (s, lines, o = {}) => TH.card(s, lines, { ground: 'ckInk', riser: false, ...o });

/* ======================= shorts: per-short top title + caption styles (moment "ckStyle": {lab, cap}) ======================= */
CK.style = (FOOT.m && FOOT.m.kind === 'short' && !FOOT.m.fmt && FOOT.m.ckStyle) || null;   // 2026-11-10: a short with a format ("fmt", moments/formats.js) draws its own title + captions
/* shorts: per-short top title + caption styles in set 03 (moment "ckStyle": {lab, cap}). No boxes, no outlines (TYPE-SYSTEM.md).
 * Top titles sit on the flat concrete band above her 3:4 window: 'heavylight' (first part Bold, the rest Light), 'kicker' (DM Mono
 * "BROWSER STORAGE" + the title in Bold), 'plain' (Bold). Captions over her picture: 'body' (Helvetica Neue 500 + soft shadow, one
 * key word green / red), 'word' (one word at a time, Bold, bigger), 'karaoke' (said words turn green), 'light' (Helvetica Neue Light). */
if (CK.style) {
  const SH = TH.shortStyle; CK.labText = FOOT.m.label; FOOT.m.label = '';
  const st0 = CK.style.lab; const z = st0 === 'kicker' ? 64 : 66; const top = 140; const LX = 60; const lhK = 1.06;
  const E_ = () => EDIT.data.t['label/label']; const labStr = () => { const e = E_(); return e && e.s != null ? e.s : CK.labText; };
  const posOf = () => { const e = E_(); return (e && e.pos && e.pos[LAYOUT]) || {}; };
  const labHidden = () => { const e = E_(); return !!(e && e.hide) || !!posOf().hide; };
  const fB = F.disp(z), fL = F.light(z), lsp = -0.03 * z, maxW = W - 2 * LX;
  const wrap = (str, f) => { const out = []; let cur = ''; for (const w of str.split(/\s+/)) { const nx = cur ? cur + ' ' + w : w; if (cur && tw(nx, f, lsp) > maxW) { out.push(cur); cur = w; } else cur = nx; } if (cur) out.push(cur); return out; };
  /** the label as [[text, font], ...] lines */
  const labLines = (str) => { if (st0 === 'heavylight') { const m = str.match(/^(.*?[:?])\s+(.*)$/) || str.match(/^(.*?)\s+(\(.*\))$/);
      if (m) return [...wrap(m[1], fB).map(l => [l, fB]), ...wrap(m[2], fL).map(l => [l, fL])];
      const ls = wrap(str, fB); return ls.map((l, i) => [l, i ? fL : fB]); }
    return wrap(str, fB).map(l => [l, fB]); };
  const kick = st0 === 'kicker' ? 40 + 26 : 0;
  const labH = () => kick + labLines(labStr()).length * z * lhK + 6;
  TH.labelBottom = () => (!PORTRAIT || labHidden() ? 0 : top + (posOf().dy || 0) + (posOf().k || 1) * labH() + 18);
  function drawLab(t) {
    if (!PORTRAIT) return; SCENE_ID = 'label'; EL.seen.clear(); const ov = ovr('label'); const str = ov.s != null ? ov.s : CK.labText;
    const H_ = labH(); const info = { text: str, def: CK.labText, kind: 'box', sk: ov.k, label: 'top label (text, size, place)' };
    if (ov.hide) { regBox(ov, LX, top, maxW, H_, info); return; }
    moved(ov, () => { let y = top;
      if (st0 === 'kicker') { _txt('BROWSER STORAGE', LX, y + 32, F.mono(32), CK.ink, 'left', 'alphabetic', 32 * 0.12); y += kick; }
      labLines(str).forEach(([l, f]) => { _txt(l, LX, y + z * 0.86, f, CK.ink, 'left', 'alphabetic', lsp); y += z * lhK; });
      regBox(ov, LX, top, maxW, H_, info); }, [CX, top]);
  }
  TH.capOff.push([0, 1e9]);
  const capKw = (t) => (TH.kws || []).some(k => t >= k.sp.t0 && t < k.sp.t1);
  function drawCap(t) {
    if (!PORTRAIT || t >= FOOT.dur || !SHOW.captions || capKw(t)) return;
    const c = (TH.caps || []).find(x => x.t0 <= t && t < x.t1); if (!c) return;
    const cst = EDIT.data.captions9 || {}; const kz = cst.size ? clamp(cst.size / SH.cap.size, 0.6, 1.5) : 1; const dy = cst.y != null ? cst.y - SH.cap.y : 0;
    const ce = (EDIT.data.capShort || {})[c.i]; const text = ce != null ? ce : c.text; const st = CK.style.cap;
    const yC = (FOOT.capYNow || SH.cap.y) + dy; let ws = text.split(/\s+/).filter(Boolean); const [key, kc] = CK.keyIx(ws); const keyCol = kc === CK.red ? CK.FOOTR : CK.FOOTG;
    let off = 0; if (st === 'word') { const ti = c.ws.filter(w => w.t <= t + 0.02).length - 1; off = Math.max(0, Math.min(ws.length - 1, ti)); }
    const zz = (st === 'word' ? 104 : st === 'light' ? 78 : 66) * kz; const f = st === 'word' ? F.disp(zz) : st === 'light' ? F.light(zz) : (CK.FB ? `500 ${zz}px FBIT` : `500 ${zz}px "Helvetica Neue"`); const ls = -0.02 * zz;
    const shown = st === 'word' ? [ws[off]] : ws; const lines = []; let cur = []; for (const w of shown) { const nx = [...cur, w]; if (cur.length && tw(nx.join(' '), f, ls) > W - 140) { lines.push(cur); cur = [w]; } else cur = nx; } if (cur.length) lines.push(cur);
    const lh = zz * 1.15; const y0 = yC - (lines.length - 1) * lh / 2 + zz * 0.35; let bw = 0, gi = off;
    const bwAll = Math.max(...lines.map(ln => tw(ln.join(' '), f, ls))); const light = CK.onLight(CX - bwAll / 2, y0 - zz * 0.9, bwAll, (lines.length - 1) * lh + zz * 1.2);
    lines.forEach((ln, li) => { const s_ = ln.join(' '); const lw = tw(s_, f, ls); bw = Math.max(bw, lw); let x = CX - lw / 2;
      ln.forEach((w) => { const said = c.ws[gi] && t >= c.ws[gi].t - 0.02; const G_ = light ? CK.grn : CK.FOOTG, R_ = light ? CK.red : CK.FOOTR, Wt = light ? CK.ink : CK.white;
        const col = st === 'karaoke' ? (said ? G_ : Wt) : gi === key ? (kc === CK.red ? R_ : G_) : Wt;
        if (light) _txt(w, x, y0 + li * lh, f, col, 'left', 'alphabetic', ls); else CK.capWord(w, x, y0 + li * lh, f, col, ls); x += tw(w + ' ', f, ls); gi++; }); });
    regBox({ id: 'caption/' + c.i, edited: ce != null, hide: false }, CX - bw / 2 - 14, y0 - zz * 0.9, bw + 28, (lines.length - 1) * lh + zz * 1.2, { kind: 'caption', text, def: c.text, cue: c.i });
  }
  TH.over.push((t) => { if (t >= FOOT.dur) return; drawCap(t); drawLab(t); });
}
