/* cheapest-countries: the talking-head look = her pick 2026-11-02, A · PRICE CHECK (film/scenes/pckit.js), for the full edit,
 * the shorts and the teaser. Shelf grey #E4E6E3, label yellow #FFD60A, ink #121212, rail #2A2B2E, sticker red #E4002B (red only
 * ever means "this costs more than it looks"). Type: Sofia Sans Extra Condensed 900 / Sofia Sans 900 / Martian Mono.
 * Her captions (C2): heavy condensed caps, white with a dark edge, the chunk's number (else its strongest word) on a yellow label box.
 * Shorts top title (T3): a white box, black Sofia Sans 900, sentence case, top at y 135. Keywords: the caption style, bigger.
 * Every text is editable (txt / regBox), every block movable / resizable (grp). Loaded before every moment script. */
'use strict';
Object.assign(TH.look, {
  disp: (s) => FX(s), dispLS: 0, upper: true, font: 'disp', capFit: true, kwHideCap: true,
  fg: PC.ink, ink: PC.ink, acc: PC.red, accOnDark: PC.lab,
  ground: 'pcWall', cardGround: 'pcBlack', panel: 'pcWall', grid: false,
  outline: PC.white, outlinePx: 0, ring: PC.lab, ringPx: 0, plate: 'pc', dim: 0.35, band: PC.wall, rule: 'rgba(18,18,18,0.3)',
});

/** a full-frame graphic (an L9-style insert from the kit, no film needed): her voice and captions go on */
PC.n = 0;
PC.full = (s, draw, o = {}) => {
  const lead = o.lead == null ? 0.12 : o.lead, hold = o.hold == null ? 0.45 : o.hold;
  const at = (x, end) => (typeof x === 'number' ? x : end ? x.e + hold : x.t - lead);
  let t0, t1; if (Array.isArray(s)) { t0 = s[0]; t1 = s[1]; } else if (s.from != null) { t0 = at(s.from); t1 = at(s.to || s.from, true); } else { t0 = s.t - lead; t1 = s.e + hold; }
  TH.used = true; const id = o.id || 'insert-' + (++PC.n);
  TH.segs.push({ kind: 'cutaway', t0, t1, id, cover: true, card: false, ground: o.ground || 'pcWall', o, noCaps: o.noCaps,
    draw: (t) => { const k = 1 + 0.03 * E.inOutCubic(prog(t, t0, Math.max(0.5, t1 - t0)));   // a slow 3 % push: never dead still
      PC.T0 = t0; withT(W / 2 * (1 - k), H / 2 * (1 - k), k, 0, () => draw(t, { x: 0, y: 0, w: W, h: H })); PC.T0 = null; } });
  if (o.sound !== false) sfx(o.sound || 'shutter', t0 + 0.02, o.db != null ? o.db : -3);
  return { t0, t1, id };
};

/* ---------- captions C2, keywords and the shorts top title T3, drawn by wrapping TH.post (editable like the house ones) ---------- */
PC.fixCaps = () => { if (PC.capsFixed || !TH.caps) return; PC.capsFixed = true; const cs = TH.caps;
  const WEAK = new Set(['a', 'an', 'the', 'to', 'for', 'of', 'in', 'on', 'at', 'and', 'so', 'is', 'or', 'but', 'with', 'my', 'your', 'that', 'i', 'it', 'be', 'are', 'was', 'can', 'will', 'as', 'if', 'like']);
  const nn = (s) => s.toLowerCase().replace(/[^a-z']/g, '');
  for (let i = 0; i < cs.length - 1; i++) { const a = cs[i], b = cs[i + 1]; if (b.t0 - a.ws[a.ws.length - 1].e > 0.6) continue;
    while (a.ws.length > 2 && WEAK.has(nn(a.ws[a.ws.length - 1].s))) b.ws.unshift(a.ws.pop());
    a.text = a.ws.map(x => x.s).join(' '); b.text = b.ws.map(x => x.s).join(' '); b.t0 = Math.max(a.t0 + 0.2, b.ws[0].t - 0.05); a.t1 = Math.min(b.t0, a.ws[a.ws.length - 1].e + 0.35); }
};
PC.STOP = new Set(['the', 'a', 'an', 'and', 'or', 'but', 'so', 'to', 'of', 'in', 'on', 'for', 'at', 'is', 'it', 'you', 'your', 'that', 'this', 'with', 'are', 'be', 'have', 'has', 'i', "i'm", 'my', 'we', 'they', 'if', 'as', 'like', 'just', 'about', 'also', 'from', 'can', 'do', 'what', 'there', "that's", "you're", 'know', 'really', 'very', 'want']);
/** the word on the yellow label: a number or money first, else the longest content word (only when >= 6 letters) */
PC.hiWord = (ws) => { let best = -1, bl = 0; ws.forEach((w, i) => { if (/[0-9€$]/.test(w)) { if (best < 0 || !/[0-9]/.test(ws[best])) best = i; } });
  if (best >= 0) return best; ws.forEach((w, i) => { const c = w.toLowerCase().replace(/[^a-z']/g, ''); if (!PC.STOP.has(c) && c.length > bl) { bl = c.length; best = i; } }); return bl >= 6 ? best : -1; };
PC.capDraw = (t) => { PC.fixCaps();
  const c = (TH.caps || []).find(x => x.t0 <= t && t < x.t1); if (!c) return;
  if (TH.capOff.some(([a, b]) => t >= a && t < b)) return;
  const sc = SCENES[sceneIndex(t)]; if (sc && sc.card && t >= sc.start) return; if (sc && sc.noCaps) return;
  const port = PORTRAIT; const key = port ? 'capShort' : 'cap16'; const ce = (EDIT.data[key] || {})[c.i]; const text = (ce != null ? ce : c.text).replace(/…/g, '');
  const cst = EDIT.data[port ? 'captions9' : 'captions16'] || {}; let size = cst.size ? clamp(Math.round(cst.size), 40, 160) : V(64, 72);   // Inter Tight 700 (set 06 body)
  const yBase = cst.y != null ? cst.y : port ? (FOOT.capYNow ? FOOT.capYNow + size * 0.3 + 50 : 1540 + size * 0.3) : 990;
  let f = FS(size, 700); const words = text.split(/\s+/).filter(Boolean); if (!words.length) return; const hi = PC.hiWord(words);
  const cxC = !port && FOOT.capX ? FOOT.capX[0] : CX; const maxW = !port && FOOT.capX ? Math.min(W * 0.84, FOOT.capX[1]) : W * V(0.84, 0.88); let lines = [words];
  if (tw(text, f) > maxW) { let bi = 1, bm = 1e9; for (let k = 1; k < words.length; k++) { const m_ = Math.max(tw(words.slice(0, k).join(' '), f), tw(words.slice(k).join(' '), f)); if (m_ < bm) { bm = m_; bi = k; } } lines = [words.slice(0, bi), words.slice(bi)]; }
  { const wide = Math.max(...lines.map(l => tw(l.join(' '), f))); if (wide > maxW) { const k = Math.max(0.66, maxW / wide); size = Math.round(size * k); f = FS(size, 700); } }
  const lh = size * 1.18; let y0 = yBase - (lines.length - 1) * lh; if (port && cst.y == null && typeof capClearFace === 'function') { const bh0 = (lines.length - 1) * lh + size * 1.02, top0 = y0 - size * 0.86; y0 += capClearFace(t, top0, bh0) - top0; }   /* 1:1 / 4:5: off her face and chin (2026-11-16) */ let k0 = 0; let bx0 = 1e9, bx1 = -1e9;
  // on a flat graphic (full-frame insert, a tile, the presenter's ground, the room's panel) the caption is ink; on her picture white + a soft shadow
  const onGfx = (TH.segs || []).some(sg => t >= sg.t0 && t < sg.t1 && sg.ground !== 'pcBlack' && (sg.kind === 'cutaway' || sg.kind === 'tile' || sg.kind === 'presenter' || (PORTRAIT && FOOT.capYNow != null && (sg.kind === 'split' || sg.kind === 'room'))));
  ctx.save(); ctx.lineJoin = 'round'; ctx.miterLimit = 2;
  lines.forEach((ln, li) => { const s = ln.join(' '); const sp = tw(' ', f); const w = tw(s, f); let x = clamp(cxC - w / 2, V(96, 60), W - V(96, 60) - w); bx0 = Math.min(bx0, x); bx1 = Math.max(bx1, x + w); const y = y0 + li * lh;
    ln.forEach((wd, j) => { const ww = tw(wd, f); setFont(f, 0); ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
      if (!onGfx) { ctx.shadowColor = 'rgba(0,0,0,0.6)'; ctx.shadowBlur = size * 0.4; ctx.shadowOffsetY = size * 0.04; }
      ctx.fillStyle = onGfx ? PC.ink : PC.white; ctx.fillText(wd, x, y); x += ww + sp; });
    k0 += ln.length; });
  ctx.restore();
  regBox({ id: 'caption/' + c.i, edited: ce != null, hide: false }, bx0, y0 - size * 0.86, bx1 - bx0, (lines.length - 1) * lh + size * 1.02, { kind: 'caption', text: ce != null ? ce : c.text, def: c.text, cue: c.i, cap16: !port });
};
/** keywords (chest height, the caption style bigger, ~word~ on the yellow label); the caption steps aside while one is up */
PC.kws = [];
PC.kw = (sp, text, o = {}) => { const a_ = sp.from || sp, b_ = sp.to || sp.from || sp; const t0 = (o.t0 != null ? o.t0 : a_.t - 0.1), t1 = Math.min(o.t1 != null ? o.t1 : b_.e + 0.05, t0 + 4.5); if (!(t1 > t0)) return; const id = o.id || 'kw' + PC.kws.length;
  PC.kws.push({ t0, t1, text, id, y: o.y }); TH.capOff.push([t0, t1]); if (o.sound !== false) sfx('pop', t0 + 0.05, -4); };
PC.kwDraw = (t) => { for (const k of PC.kws) { if (t < k.t0 || t >= k.t1) continue; const p = pcE(t, k.t0, 0.25); let z = V(128, 118); { const plain = (ovr('kw-' + k.id).s || k.text).replace(/~/g, '').toUpperCase(); EL.seen.delete(SCENE_ID + '/kw-' + k.id); const ww = tw(plain, FX(z)) + z * 0.3; if (ww > W * 0.9) z = Math.floor(z * W * 0.9 / ww); } const f = FX(z);
    const ov = ovr('kw-' + k.id); const src = ov.s != null ? ov.s : k.text;
    const segs = src.split(/(~[^~]+~)/).filter(Boolean).map(s => ({ s: s.replace(/~/g, '').trim().toUpperCase(), hi: /^~/.test(s) })).filter(x => x.s);
    const sp = tw(' ', f); const tot = segs.reduce((a, s) => a + tw(s.s, f), 0) + sp * (segs.length - 1);
    const y = k.y != null ? k.y : V(330, PC.short() ? Math.max(560, TH.labelBottom() + 200) : 640); let x = CX - tot / 2; const sc = lerp(1.15, 1, p);
    withA(Math.min(1, p * 2), () => { ctx.save(); ctx.translate(CX, y); ctx.scale(sc, sc); ctx.translate(-CX, -y); ctx.lineJoin = 'round'; setFont(f, 0); ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
      for (const s of segs) { const ww = tw(s.s, f);
        ctx.shadowColor = 'rgba(0,0,0,0.5)'; ctx.shadowBlur = z * 0.25; ctx.fillStyle = PC.white; ctx.fillText(s.s, x, y); x += ww + sp; }
      ctx.restore(); });
    regBox(ov, CX - tot / 2, y - z * 0.85, tot, z * 1.05, { text: src, def: k.text }); } };
/** T3: the shorts top title, a white box with black Sofia Sans 900 (sentence case), one or two balanced lines; editable (text, size, place) */
PC.labelGeom = (str) => { str = str.toUpperCase(); const z = 104, padX = 0, padY = 10; const f = FX(z); let lines = [str];
  if (tw(str, f) > W - 200) { const ws = str.split(' '); let bi = 1, bm = 1e9; for (let k = 1; k < ws.length; k++) { const mm = Math.max(tw(ws.slice(0, k).join(' '), f), tw(ws.slice(k).join(' '), f)); if (mm < bm) { bm = mm; bi = k; } } lines = [ws.slice(0, bi).join(' '), ws.slice(bi).join(' ')]; }
  let zz = z, ff = f; const wid = Math.max(...lines.map(l => tw(l, f))); if (wid > W - 120) { zz = Math.floor(z * (W - 120) / wid); ff = FX(zz); }
  const bw = Math.max(...lines.map(l => tw(l, ff))) + padX * 2, bh = lines.length * zz * 0.95 + padY * 2; return { z: zz, padX, padY, f: ff, lines, bw, bh, top: 135 }; };
PC.labelDraw = () => {
  const m = FOOT.m; if (!m.label) return; SCENE_ID = 'label'; EL.seen.clear();
  const ov = ovr('label'); const str = (ov.s != null ? ov.s : m.label); const info = { text: str, def: m.label, kind: 'box', sk: ov.k, label: 'top title (text, size, place)' };
  const L = PC.labelGeom(str);
  if (ov.hide) { regBox(ov, CX - L.bw / 2, L.top, L.bw, L.bh, info); return; }
  moved(ov, () => {
    L.lines.forEach((l, i) => _txt(l, CX, L.top + L.padY + L.z * 0.8 + i * L.z * 0.95, L.f, PC.ink, 'center', 'alphabetic', 0));
    regBox(ov, CX - L.bw / 2, L.top, L.bw, L.bh, info); }, [CX, L.top]);
};
(function pcPost() {
  const post0 = TH.post, lb0 = TH.labelBottom;
  PC.labelBottomCalc = () => { const m = FOOT.m; const e = (EDIT.data.t || {})['label/label']; const str = e && e.s != null ? e.s : m.label; const k = (e && e.pos && e.pos[LAYOUT] && e.pos[LAYOUT].k) || 1;
    const L = PC.labelGeom(str); return L.top + L.bh * k; };
  TH.labelBottom = () => (FOOT.m && FOOT.m.kind === 'short' && FOOT.m.label ? PC.labelBottomCalc() : lb0());
  TH.post = (t) => {
    const isShort = FOOT.m.kind === 'short', end = isShort && t >= FOOT.dur; const lab = FOOT.m.label, sc = SHOW.captions;
    FOOT.m.label = ''; SHOW.captions = false;
    try { post0(t); } finally { FOOT.m.label = lab; SHOW.captions = sc; }
    if (end || (FOOT.outro && t >= FOOT.dur)) return;
    ctx.save(); ctx.setTransform(...BASE); g = G.ink;
    SCENE_ID = 'keywords'; EL.seen.clear(); PC.kwDraw(t);
    if (sc) PC.capDraw(t);
    if (isShort) PC.labelDraw();
    ctx.restore(); ctx.setTransform(1, 0, 0, 1, 0, 0);
  };
})();
