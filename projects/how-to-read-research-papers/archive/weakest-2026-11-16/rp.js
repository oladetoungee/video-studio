/* how-to-read-research-papers: the look A · THE MARGIN (her pick 2026-11-02) + B's "Figure 2" layout drawn in A's paper and
 * type. Shared by the motion film (film/film.json scripts) and the talking-head edit, shorts and teaser (talking-head.json
 * "common", before moments/common.js).
 * Keshav's real paper ("How to Read a Paper", 2007) is the object we carry through the whole video and mark up the way she
 * reads now: fluorescent highlighter on the lines that matter, blue-pen notes in the margin, numbered tabs 1-2-3 clipped to
 * the edge for the passes. Every receipt is a real page (crops only): Keshav, Caine (CHI 2016), PubMed (Cochrane 2017), Zotero.
 * Flat graphite #2F3136, paper #FBFAF4, highlighter #F3EE2E (only ever on paper or on her captions), blue pen #2447C9.
 * Type (her set 05, 2026-11-07): DM Serif Display headlines (the key word *italic*), DM Mono for the pen notes and credits, Inter Tight captions, the
 * paper's own type for receipts, DM Mono only for small credits. Every text editable (ovr keys), every block movable (grp).
 * Each graphic RP.x(o) returns draw(t, r) (r = the rect it fills): a talking-head layout's o.draw, or a film scene. */
'use strict';
const RP = { desk: '#2F3136', desk2: '#26282C', paper: '#FBFAF4', card: '#FFFDF6', hi: '#F3EE2E', pen: '#2447C9', ink: '#17171A',
  soft: '#B9BCC2', mid: '#6A6C72', line: 'rgba(23,23,26,0.14)', lineD: 'rgba(251,250,244,0.16)', KS: 1700 / 612 };
/* fonts: DM Serif Display, Inter Tight and DM Mono (library/fonts) are
 * registered here; the moment / film waits for them (TH.ready / boot) */
const RPF = (() => { const add = (fam, src, d) => { const f = new FontFace(fam, src, d || {}); document.fonts.add(f); return f.load(); };
  // 2026-11-13 FONT-BOARD pass: in the shorts and the teaser the graphics' serif is Newsreader 600 (font board shorts-11, Formats 52), not
  // DM Serif Display (not on the board). The full edit and the film keep DM Serif Display.
  const FBS = typeof FOOT !== 'undefined' && FOOT.m && (FOOT.m.kind === 'short' || FOOT.m.kind === 'teaser');
  const SR = FBS ? '/p/how-to-read-research-papers/talking-head/assets/fonts/Newsreader-600.ttf' : '/library/fonts/DMSerifDisplay-Regular.ttf';
  const SI = FBS ? '/p/how-to-read-research-papers/talking-head/assets/fonts/Newsreader-600-Italic.ttf' : '/library/fonts/DMSerifDisplay-Italic.ttf';
  return Promise.all([add('DM Serif Display', `url(${SR})`), add('DM Serif Display', `url(${SI})`, { style: 'italic' }),
    add('Inter Tight', 'url(/library/fonts/InterTightMedium.ttf)', { weight: '500' }), add('Inter Tight', 'url(/library/fonts/InterTightSemiBold.ttf)', { weight: '600' }),
    add('Inter Tight', 'url(/library/fonts/InterTightBold.ttf)', { weight: '700' }), add('Inter Tight', 'url(/library/fonts/InterTightExtraBold.ttf)', { weight: '800' }),
    add('DM Mono', 'url(/library/fonts/DMMono-Medium.ttf)', { weight: '500' })]).catch(e => console.error('research-papers fonts', e)); })();

G.rpDesk = { bg: RP.desk, fg: RP.paper, mid: RP.soft, line: RP.lineD, acc: RP.paper, card: RP.paper, panel: RP.desk2, grid: RP.lineD, mode: 'dark' };
G.rpPaper = { bg: RP.paper, fg: RP.ink, mid: RP.mid, line: RP.line, acc: RP.pen, card: RP.card, panel: '#EFEDE4', grid: RP.line, mode: 'light' };
G.rpInk = { bg: '#1B1C1F', fg: RP.paper, mid: RP.soft, line: RP.lineD, acc: RP.paper, card: RP.paper, panel: RP.desk2, grid: RP.lineD, mode: 'dark' };
G.rpDesk.altKey = 'rpPaper'; G.rpPaper.altKey = 'rpDesk';
F.disp = (s) => `400 ${s}px "DM Serif Display"`;
F.body = (s, w = 500) => `${Math.max(500, Math.min(800, w))} ${s}px "Inter Tight"`;
F.serif = (s) => `italic 400 ${s}px "DM Serif Display"`;
F.serifR = F.serif;
F.hand = (s) => `500 ${Math.round(s * 0.78)}px "DM Mono"`;   // (set 05: the pen notes are set in DM Mono, no handwriting)
LS.disp = -0.02; LS.body = -0.005; LS.serif = -0.02;
if (typeof PLATE !== 'undefined') { PLATE.rp = [RP.paper, RP.ink, RP.pen]; PLATE.rpDesk = [RP.desk, RP.paper, RP.hi]; }

const rpE = (t, t0, d, e = 'outQuint') => (e === 'outCubic' || e === 'inOutCubic') ? E[e](clamp((t - t0) / d)) : MOTION.ease(t, t0, d, e);
RP.sfx = (role, t, db = 0) => { if (t != null && t >= 0 && t < TOTAL) sfx(role, t, db); };
/** the time she starts a word inside a phrase (first match), else the phrase start */
function WT(ph, word) {
  const n = (s) => s.toLowerCase().replace(/[’]/g, "'").replace(/[^a-z0-9']/g, '');
  const want = String(word).split(/\s+/).map(n); const ws = WORDS.slice(ph.i, ph.i + ph.w.length);
  for (let k = 0; k <= ws.length - want.length; k++) if (want.every((x, j) => ws[k + j].n === x)) return ph.w[k];
  return ph.t;
}
RP.short = () => !!(typeof FOOT !== 'undefined' && PORTRAIT && FOOT.m && FOOT.m.kind === 'short');
function rpClip(x, y, w, h, fn) { ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip(); fn(); ctx.restore(); }
/** shorts: a graphic that reaches the top of the frame starts below the top label */
RP.rr = (r) => {
  if (!RP.short() || typeof TH === 'undefined') return r; const lb = TH.labelBottom(); if (!(lb > 0)) return r;
  const m = ctx.getTransform(), sy = m.d / BASE[3], y0 = (m.d * r.y + m.f - BASE[5]) / BASE[3];
  if (y0 >= lb + 20) return r; const d = (lb + 24 - y0) / (sy || 1);
  rect(r.x, r.y, r.w, r.h, RP.desk); return { x: r.x, y: r.y + d, w: r.w, h: r.h - d };
};
/** a slow push on long holds (nothing sits still): scale around the rect's centre */
RP.push = (t, t0, r, fn, k = 0.04, d = 6) => { const s = 1 + k * E.inOutCubic(prog(t, t0, d)); withT((r.x + r.w / 2) * (1 - s), (r.y + r.h / 2) * (1 - s), s, 0, fn); };
const RPX = { n: 0 };

/** editable headline text: '\n' = new line, *word* = the italic key word. Rises in at o.at (lines 0.07 s apart).
 *  o.f(size, italic) font, o.col, o.align, o.maxW (shrinks to fit), o.lh. Returns {w, h, size}. */
RP.text = (t, key, def, x, y, size, o = {}) => {
  const ov = ovr(key); const str = ov.s != null ? ov.s : def; const lines = String(str).split('\n');
  const ff = o.f || ((z, it) => it ? `italic 400 ${z}px "DM Serif Display"` : (o.mono ? `500 ${z}px "DM Mono"` : `400 ${z}px "DM Serif Display"`));
  const ls = (z) => (o.ls == null ? -0.02 : o.ls) * z; const parts = (l) => l.split(/(\*[^*]+\*)/).filter(Boolean).map(p => p[0] === '*' ? [p.slice(1, -1), true] : [p, false]);
  const lw = (l, z) => parts(l).reduce((a, [s, it]) => a + tw(s, ff(z, it), ls(z)), 0);
  let z = size; if (o.maxW) while (Math.max(...lines.map(l => lw(l, z))) > o.maxW && z > 18) z -= 2;
  const lh = (o.lh || 1.04) * z, W_ = Math.max(...lines.map(l => lw(l, z))), H_ = (lines.length - 1) * lh + z * 1.02;
  const bx = o.align === 'center' ? x - W_ / 2 : o.align === 'right' ? x - W_ : x;
  const info = { text: str, def, label: 'text (*word* = italic)' };
  if (ov.hide) { regBox(ov, bx, y - z * 0.8, W_, H_, info); return { w: W_, h: H_, size: z }; }
  moved(ov, () => {
    lines.forEach((l, li) => { const a = o.at == null ? 1 : rpE(t, o.at + li * (o.stag == null ? 0.07 : o.stag), 0.45, 'outExpo'); if (a <= 0.002) return;
      const w = lw(l, z); let xx = o.align === 'center' ? x - w / 2 : o.align === 'right' ? x - w : x; const yy = y + li * lh;
      withA(clamp(a * 1.6), () => withBlur(5 * (1 - a), () => withT(0, (1 - a) * z * 0.35, 1, 0, () => parts(l).forEach(([s, it]) => { _txt(s, xx, yy, ff(z, it), o.col || RP.paper, 'left', 'alphabetic', ls(z)); xx += tw(s, ff(z, it), ls(z)); })))); });
    regBox(ov, bx, y - z * 0.8, W_, H_, info);
  }, [bx + W_ / 2, y]);
  return { w: W_, h: H_, size: z };
};
/** a pen note (DM Mono in blue): writes on left to right over o.d s from at; editable */
RP.hand = (t, key, def, x, y, size, o = {}) => {
  const ov = ovr(key); const str = ov.s != null ? ov.s : def; const lines = String(str).split('\n'); const f = F.hand(size); const lh = size * (o.lh || 0.98);
  const W_ = Math.max(...lines.map(l => tw(l, f))); const H_ = (lines.length - 1) * lh + size;
  const bx = o.align === 'center' ? x - W_ / 2 : o.align === 'right' ? x - W_ : x; const info = { text: str, def, label: 'handwriting' };
  if (ov.hide) { regBox(ov, bx, y - size * 0.8, W_, H_, info); return { w: W_, h: H_ }; }
  const at = o.at == null ? -9 : o.at; const d = o.d || 0.5; const k = clamp((t - at) / d);
  if (k > 0) moved(ov, () => withT(x, y, 1, (o.rot || 0) * Math.PI / 180, () => {
    lines.forEach((l, li) => { const kl = clamp(k * lines.length - li); if (kl <= 0) return; const w = tw(l, f); const lx = o.align === 'center' ? -w / 2 : o.align === 'right' ? -w : 0;
      rpClip(lx - 10, li * lh - size, w * kl + 10, size * 1.5, () => _txt(l, lx, li * lh, f, o.col || RP.pen, 'left')); });
    regBox(ov, bx - x, -size * 0.8, W_, H_, info);
  }), [x, y]);
  if (o.sound !== false && o.at != null) RPX.handSnd = RPX.handSnd || 0;
  return { w: W_, h: H_ };
};
/** a pen stroke through points [[x, y], ...] drawn by k (0..1), round caps */
RP.stroke = (pts, k, lw = 8, col = RP.pen) => {
  if (k <= 0) return; let L = 0; const seg = []; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(d); L += d; }
  let left = L * clamp(k); ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length && left > 0; i++) { const f = Math.min(1, left / seg[i - 1]); ctx.lineTo(lerp(pts[i - 1][0], pts[i][0], f), lerp(pts[i - 1][1], pts[i][1], f)); left -= seg[i - 1]; }
  ctx.stroke(); ctx.restore();
};
RP.tick = (x, y, s, k, col = RP.pen) => RP.stroke([[x, y], [x + s * 0.35, y + s * 0.4], [x + s, y - s * 0.55]], k, s * 0.2, col);
/** a hand-drawn loop round a box (x, y, w, h), drawn by k */
RP.loop = (x, y, w, h, k, col = RP.pen, lw = 6) => { const cx = x + w / 2, cy = y + h / 2, rx = w / 2 + 18, ry = h / 2 + 14; const pts = [];
  for (let i = 0; i <= 64; i++) { const a = -Math.PI * 0.62 + Math.PI * 2.1 * i / 64; const wob = 1 + 0.03 * Math.sin(a * 3 + 1.3); pts.push([cx + Math.cos(a) * rx * wob, cy + Math.sin(a) * ry * wob]); }
  RP.stroke(pts, k, lw, col); };
/** the highlighter: a translucent yellow block multiplied onto paper, sweeping left to right from at over d */
RP.hl = (x, y, w, h, t, at, d = 0.18) => { const p = rpE(t, at, d, 'outCubic'); if (p <= 0) return; ctx.save(); ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = RP.hi; rr(x - 4, y, (w + 8) * p, h, 6); ctx.fill(); ctx.restore(); };
/** a numbered tab clipped to a page edge (x = the edge, y = top): paper, DM Serif number */
RP.tab = (x, y, n, s, k = 1, on = true) => { if (k <= 0) return; withT(x - s * (1 - E.outExpo(k)), y, 1, 0, () => { ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.28)'; ctx.shadowBlur = 16; ctx.shadowOffsetY = 6;
  ctx.fillStyle = on ? RP.paper : '#D9D7CF'; rr(0, 0, s, s, s * 0.12); ctx.fill(); ctx.restore(); ctx.fillStyle = on ? RP.paper : '#D9D7CF'; ctx.fillRect(0, 0, s * 0.2, s);
  _txt(String(n), s * 0.52, s * 0.72, F.disp(s * 0.62), RP.ink, 'center'); }); };
/** a credit line (DM Mono, soft) */
RP.cred = (s, x, y, z, col = RP.soft, align = 'left', key = 'credit') => txt(s, x, y, `500 ${Math.max(V(22, 26), Math.round(z * 0.85))}px "DM Mono"`, col, align, 'alphabetic', 0, key);
/** a paper sheet with a soft shadow (the only "depth" in the look: paper on a desk) */
RP.sheet = (x, y, w, h, col = RP.paper, sh = 1) => { ctx.save(); ctx.shadowColor = `rgba(0,0,0,${0.34 * sh})`; ctx.shadowBlur = 50 * sh; ctx.shadowOffsetY = 22 * sh; ctx.fillStyle = col; ctx.fillRect(x, y, w, h); ctx.restore(); };
/** a photo cropped to cover the box (never stretched) */
RP.cover = (key, x, y, w, h, fx = 0.5, fy = 0.5) => {
  const im = IMG[key]; if (!im) { rect(x, y, w, h, '#555'); return; }
  const s = Math.max(w / im.width, h / im.height); const sw = w / s, sh = h / s;
  themeFixed(() => ctx.drawImage(im, clamp((im.width - sw) * fx, 0, im.width - sw), clamp((im.height - sh) * fy, 0, im.height - sh), sw, sh, x, y, w, h));
};
/** a Keshav phrase box in page px: [x, y, w, h] */
RP.kbox = (name, li = 0) => { const p = KESHAV[name]; if (!p) return null; const l = p.lines[Math.min(li, p.lines.length - 1)]; const K = RP.KS; return [(l[0] - 2) * K, (l[1] - 8.8) * K, (l[2] - l[0] + 4) * K, 11.8 * K]; };

/* ======================= graphics: each returns draw(t, r) ======================= */

/** 1 · Keshav's real page as the running object. o.p (1 | 2), o.focus = a phrase name or [ptX, ptY] (the page point that
 *  sits at o.fx / o.fy of the panel), o.s = page scale (px per page px; default by panel), o.rot (deg), o.at (slides in),
 *  o.hl [[phrase, time, lineIndex?]] highlighter, o.ticks [[ptX, ptY, time]] pen ticks, o.notes [{s, x, y (pt), at, z, rot}],
 *  o.loops [[phrase, time]], o.cross [phrase, time], o.tab [n, ptY], o.move [{at, focus, s}] (the camera travels across the page),
 *  o.title {lines, at, side: 'left'|'top'} = a headline on the desk beside the page, o.credit */
RP.page = (o) => {
  const at = o.at == null ? 0 : o.at; RP.sfx('paper', at + 0.13, -4);
  (o.hl || []).forEach((h, i) => { if (i < 3) RP.sfx('marker', h[1] + 0.04, -7); });
  (o.ticks || []).forEach((h, i) => { if (i < 3) RP.sfx('pencil', h[2], -9); });
  (o.notes || []).slice(0, 2).forEach(n => RP.sfx('scribble', n.at + 0.05, -9));
  (o.move || []).forEach(m => RP.sfx('paperMove', m.at + 0.05, -10));
  return (t, r) => { r = RP.rr(r); rect(r.x, r.y, r.w, r.h, RP.desk); const K = RP.KS;
    const im = IMG['keshav_p' + (o.p || 1)];
    let title = o.title, tW = 0;
    if (title && !PORTRAIT && (title.side || 'left') === 'left') tW = Math.min(r.w * 0.36, 660);
    const pr = { x: r.x + tW, y: r.y, w: r.w - tW, h: r.h }; if (title && (PORTRAIT || title.side === 'top')) { pr.y += V(300, 360); pr.h -= V(300, 360); }
    const focusPt = (f) => { if (Array.isArray(f)) return f; const b = RP.kbox(f); return b ? [(b[0] + b[2] / 2) / K, (b[1] + b[3] / 2) / K] : [306, 396]; };
    // the camera: a key list (focus, scale), eased 0.6 s between keys
    const s0 = o.s || (PORTRAIT ? 0.62 : clamp(pr.w / 1700 * 1.05, 0.55, 1.0));
    const keys = [{ at: -1e9, f: focusPt(o.focus || [306, 396]), s: s0 }, ...(o.move || []).map(m => ({ at: m.at, f: focusPt(m.focus), s: m.s || s0 }))];
    let cf = keys[0].f, cs = keys[0].s; for (let i = 1; i < keys.length; i++) { const k = rpE(t, keys[i].at, 0.6, 'inOutQuart'); if (k <= 0) break; cf = [lerp(cf[0], keys[i].f[0], k), lerp(cf[1], keys[i].f[1], k)]; cs = lerp(cs, keys[i].s, k); }
    const push = 1 + 0.05 * E.inOutCubic(prog(t, at, 5.5)); cs *= push;
    const kIn = rpE(t, at, 0.75, 'outExpo'); const rot = ((o.rot == null ? -1.5 : o.rot) + 4 * (1 - kIn)) * Math.PI / 180;
    const ax = pr.x + pr.w * (o.fx == null ? 0.5 : o.fx), ay = pr.y + pr.h * (o.fy == null ? 0.48 : o.fy);
    rpClip(pr.x, pr.y, pr.w, pr.h, () => withBlur(6 * (1 - kIn), () => {
      ctx.save(); ctx.translate(ax + (1 - kIn) * pr.w * 0.35, ay + (1 - kIn) * 90); ctx.rotate(rot); ctx.scale(cs, cs); ctx.translate(-cf[0] * K, -cf[1] * K);
      grp('page', 0, 0, 1700, 2200, () => { RP.sheet(0, 0, 1700, 2200, '#FFFFFF', 1 / cs);
        if (im) themeFixed(() => ctx.drawImage(im, 0, 0, 1700, 2200));
        (o.hl || []).forEach(([ph, tt, li]) => { const p = KESHAV[ph]; if (!p) return; const ls = li == null ? p.lines.map((_, i) => i) : [li]; ls.forEach((i, j) => { const b = RP.kbox(ph, i); RP.hl(b[0], b[1], b[2], b[3], t, tt + j * 0.11, 0.14); }); });
        (o.hlpt || []).forEach(([x0, y0, x1, tt]) => RP.hl((x0 - 2) * K, (y0 - 8.8) * K, (x1 - x0 + 4) * K, 11.8 * K, t, tt, 0.12));
        (o.ticks || []).forEach(([x, y, tt]) => RP.tick((x - 26) * K, (y - 4) * K, 15 * K, rpE(t, tt, 0.22, 'outCubic')));
        (o.loops || []).forEach(([ph, tt]) => { const b = RP.kbox(ph); if (b) RP.loop(b[0], b[1], b[2], b[3], rpE(t, tt, 0.4, 'inOutCubic'), RP.pen, 3.2 * K); });
        if (o.cross) { const b = RP.kbox(o.cross[0]) || [140, 560, 700, 300]; const k1 = rpE(t, o.cross[1], 0.22, 'outCubic'), k2 = rpE(t, o.cross[1] + 0.18, 0.22, 'outCubic');
          const bx = o.crossBox || [b[0], b[1], b[2], b[3]]; RP.stroke([[bx[0], bx[1]], [bx[0] + bx[2], bx[1] + bx[3]]], k1, 5 * K); RP.stroke([[bx[0] + bx[2], bx[1]], [bx[0], bx[1] + bx[3]]], k2, 5 * K); }
        (o.notes || []).forEach((n, i) => RP.hand(t, 'note' + i, n.s, n.x * K, n.y * K, (n.z || 26) * K, { at: n.at, rot: n.rot == null ? -3 : n.rot, d: n.d || 0.5, col: n.col }));
        if (o.tab) RP.tab(1700, o.tab[1] * K, o.tab[0], 46 * K, rpE(t, o.tab[2] == null ? at + 0.3 : o.tab[2], 0.35, 'outExpo'));
      }, { img: true, label: 'Keshav’s page (drag to move, resize)' });
      ctx.restore();
    }));
    if (title) { const z = title.size || V(100, 104); const ta = title.at == null ? at + 0.15 : title.at;
      if (!PORTRAIT && (title.side || 'left') === 'left') { const n = title.lines.split('\n').length; RP.text(t, 'title', title.lines, r.x + V(96, 72), r.y + r.h * 0.46 - (n - 1) * z * 0.52, z, { at: ta, maxW: tW - V(110, 80) });
        if (title.hand) RP.hand(t, 'title-hand', title.hand, r.x + V(110, 80), r.y + r.h * 0.46 + (n) * z * 0.62 + 40, V(64, 70), { at: title.handAt, col: RP.paper, rot: -4 }); }
      else { rect(r.x, r.y, r.w, pr.y - r.y, RP.desk); RP.text(t, 'title', title.lines, r.x + V(96, 72), r.y + V(150, 190), z, { at: ta, maxW: r.w - V(192, 144) }); } }
    if (o.credit !== false) { const cs_ = o.credit || 'S. Keshav, “How to Read a Paper” (2007)'; const cz = V(26, 30); const cw_ = tw(cs_, `500 ${Math.round(cz * 0.85)}px "DM Mono"`); rect(r.x + V(98, 72) - 14, r.y + r.h - V(52, 56) - cz, cw_ + 28, cz * 1.5, RP.desk); RP.cred(cs_, r.x + V(98, 72), r.y + r.h - V(52, 56), cz, RP.soft, 'left', 'credit'); }
  };
};

/** 2 · a real web page clipping (crop only) on a white card, the highlighter on the words she says (o.hlAt: a time, or one per
 *  box), the source as a small credit. o.title (a headline on the desk above, *italic*), o.hand {s, at} a blue-pen note on the
 *  card, o.only (box indexes), o.w (share of the width), o.dark (the clipping is dark: Zotero; no highlighter multiply) */
RP.src = (key, o = {}) => {
  RP.sfx('shutter', (o.at || 0) + 0.12, -6); if (o.hlAt != null) [].concat(o.hlAt).slice(0, 2).forEach(h => h != null && RP.sfx('marker', h + 0.03, -7));
  return (t, r) => { r = RP.rr(r); rect(r.x, r.y, r.w, r.h, RP.desk);
    const c = CLIPS[key], im = IMG['clip_' + key]; if (!c || !im) { mono('missing source ' + key, r.x + 40, r.y + 80, 28, RP.soft, 'left', { raw: true }); return; }
    const m = Math.max(V(80, 56), r.w * 0.06); let top = r.y + m + V(10, 20);
    if (o.title && !RP.short()) { const z = o.titleSize || Math.min(V(92, 96), (r.w - 2 * m) / 7.5); const b = RP.text(t, 'title', o.title, r.x + m, top + z * 0.82, z, { at: (o.at || 0) + 0.08, maxW: r.w - 2 * m }); top += b.h + V(50, 56); }
    const avH = r.y + r.h - m - top - V(70, 80) - (o.capRoom || 0); const pad = V(26, 22);
    const s = Math.min(((o.w || 1) * (r.w - 2 * m) - 2 * pad) / c.w, (avH - 2 * pad) / c.h, o.maxScale || 2.4);
    const cw = c.w * s + 2 * pad, ch = c.h * s + 2 * pad; const x = o.align === 'center' ? r.x + (r.w - cw) / 2 : r.x + m, y = top + Math.max(0, (avH - ch) * (o.vAlign == null ? 0.3 : o.vAlign));
    const a = rpE(t, o.at || 0, 0.55, 'outExpo');
    withA(clamp(a * 1.6), () => withBlur(5 * (1 - a), () => withT(0, 60 * (1 - a), 1, (1 - a) * 0.02 + (o.rot || -0.5) * Math.PI / 180, () => {
      grp('page', x, y, cw, ch, () => themeFixed(() => { RP.sheet(x, y, cw, ch, o.dark ? '#2E323A' : '#FFFFFF', 0.8); ctx.drawImage(im, x + pad, y + pad, c.w * s, c.h * s);
        if (o.hlAt != null && !o.dark) rpClip(x + pad, y + pad, c.w * s, c.h * s, () => c.hl.forEach((b, i) => { if (o.only && !o.only.includes(i)) return;
          const ht = Array.isArray(o.hlAt) ? o.hlAt[o.only ? o.only.indexOf(i) : i] : o.hlAt + i * 0.12; if (ht == null) return; RP.hl(x + pad + b[0] * s, y + pad + (b[1] - 1) * s, b[2] * s, (b[3] + 2) * s, t, ht, 0.16); }));
        if (o.hlAt != null && o.dark) c.hl.forEach((b, i) => { const ht = Array.isArray(o.hlAt) ? o.hlAt[i] : o.hlAt + i * 0.2; if (ht == null) return; const p = rpE(t, ht, 0.2, 'outCubic');
          if (p > 0) { ctx.fillStyle = RP.hi; ctx.fillRect(x + pad + b[0] * s, y + pad + (b[1] + b[3]) * s + 2, b[2] * s * p, 6 * s); } });
        (o.loops || []).forEach(([i, tt]) => { const b = c.hl[i]; if (b) RP.loop(x + pad + b[0] * s, y + pad + b[1] * s, b[2] * s, b[3] * s, rpE(t, tt, 0.4, 'inOutCubic'), RP.pen, 6); });
        if (o.hand) RP.hand(t, 'hand', o.hand.s, x + pad + (o.hand.x == null ? 0.05 : o.hand.x) * c.w * s, y + ch + V(70, 76), V(56, 60), { at: o.hand.at, rot: -2, col: RP.paper });
      }), { img: true, label: 'real page (drag to move, resize)' });
      RP.cred(o.credit || c.source, x, y + ch + (o.hand ? V(150, 160) : V(52, 56)), V(26, 30), RP.soft, 'left', 'credit');
    })));
  };
};

/** 3 · a headline on the desk (DM Serif Display paper, *italic* key word), o.hand (a handwritten line in paper colour),
 *  o.small (a plain line under it), o.ground ('rpDesk' | 'rpInk' | 'rpPaper'), o.align */
RP.head = (o) => {
  if (o.sound !== false) RP.sfx(o.sound || 'tap', (o.at || 0) + 0.12, -8); if (o.handAt != null) RP.sfx('scribble', o.handAt + 0.05, -9);
  return (t, r) => { r = RP.rr(r); const gr = G[o.ground || 'rpDesk']; rect(r.x, r.y, r.w, r.h, gr.bg);
    const m = Math.max(V(96, 72), r.w * 0.07); const ctr = o.align === 'center'; const x = ctr ? r.x + r.w / 2 : r.x + m; const nL = String(o.lines).split('\n').length;
    const size = o.size || Math.min(V(150, 128), (r.w - 2 * m) / 6.6, (r.h - 2 * m) / (nL * 1.1 + 1.6));
    const y = r.y + r.h * (o.y || 0.44) - (nL - 1) * size * 0.52;
    RP.push(t, o.at || 0, r, () => {
      const b = RP.text(t, 'lines', o.lines, x, y, size, { at: o.at, maxW: r.w - 2 * m, align: ctr ? 'center' : 'left', col: gr.fg });
      if (o.hand) RP.hand(t, 'hand', o.hand, ctr ? x : x + 8, y + b.h + size * 0.35, Math.min(V(78, 80), size * 0.62, (r.w - 2 * m) / (Math.max(...String(o.hand).split('\n').map(l => l.length)) * 0.6 * 0.78)), { at: o.handAt == null ? (o.at || 0) + 0.5 : o.handAt, rot: -3, col: o.handCol || (gr.mode === 'light' ? RP.pen : RP.paper), align: ctr ? 'center' : 'left' });
      if (o.small) withA(rpE(t, o.smallAt != null ? o.smallAt : (o.at || 0) + 0.5, 0.45), () => txtW(o.small, ctr ? r.x + m : x, y + b.h + size * (o.hand ? 1.25 : 0.55), F.body(V(44, 46), 500), gr.mid, r.w - 2 * m, V(58, 60), 0, 'small'));
    }, 0.035, 6);
    if (o.credit) RP.cred(o.credit, r.x + m, r.y + r.h - V(52, 56), V(26, 30), gr.mid);
  };
};

/** 4 · the paper's parts: a paper sheet split into labelled blocks that light up on her words. o.items [{s, at}] (the parts in
 *  order), o.main (indexes of the three that do the work: circled in pen at o.mainAt[i]), o.title */
RP.parts = (o) => {
  RP.sfx('paper', (o.at || 0) + 0.13, -5); (o.mainAt || []).slice(0, 3).forEach(tt => RP.sfx('marker', tt, -8));
  return (t, r) => { r = RP.rr(r); rect(r.x, r.y, r.w, r.h, RP.desk); const m = V(80, 64);
    const n = o.items.length; const shW = Math.min(V(r.w * 0.5, r.w - 2 * m), V(820, 900)); const shX = PORTRAIT ? r.x + (r.w - shW) / 2 : r.x + r.w - m - shW;
    const top = r.y + m + (PORTRAIT && o.title ? V(0, 220) : 0); const shH = r.h - (top - r.y) - m - V(40, 70); const a = rpE(t, o.at || 0, 0.6, 'outExpo');
    if (o.title && !PORTRAIT) RP.text(t, 'title', o.title, r.x + m + 10, r.y + r.h * 0.42, V(104, 100), { at: (o.at || 0) + 0.1, maxW: shX - r.x - 2 * m });
    if (o.title && PORTRAIT) RP.text(t, 'title', o.title, r.x + m, r.y + m + 120, 100, { at: (o.at || 0) + 0.1, maxW: r.w - 2 * m });
    withA(clamp(a * 1.5), () => withT(0, 80 * (1 - a), 1, -0.012, () => grp('sheet', shX, top, shW, shH, () => {
      RP.sheet(shX, top, shW, shH, RP.paper); const pad = V(46, 40); const gap = V(14, 14); const bh = (shH - 2 * pad - gap * (n - 1)) / n;
      o.items.forEach((it, i) => { const y = top + pad + i * (bh + gap); const on = t >= it.at - 0.05; const main = (o.main || []).indexOf(i);
        const z = Math.min(V(46, 48), bh * V(0.5, 0.66));
        if (on) { const p = rpE(t, it.at - 0.05, 0.3, 'outCubic');
          if (main >= 0 && o.mainAt && t >= o.mainAt[main]) RP.hl(shX + pad, y + bh * 0.18, tw(it.s, F.disp(z, 800)) + 20, bh * 0.64, t, o.mainAt[main], 0.16);
          withA(p, () => _txt(it.s, shX + pad + 10, y + bh * 0.5 + z * 0.34, F.disp(z, 800), RP.ink, 'left'));
          const x0 = shX + pad + tw(it.s, F.disp(z, 800)) + 50; const lw = shW - pad - (x0 - shX); const nb = Math.max(1, Math.min(3, Math.floor(bh / 26)));
          for (let k = 0; k < nb; k++) rect(x0, y + bh * (0.5 - 0.17 * (nb - 1)) + k * bh * 0.34 - 4, lw * (k === nb - 1 ? 0.6 : 1) * p, 8, '#D8D6CD'); }
        else { for (let k = 0; k < 2; k++) rect(shX + pad + 10, y + bh * 0.36 + k * bh * 0.3, (shW - 2 * pad) * (k ? 0.55 : 0.9), 8, '#E6E4DC'); }
        if (main >= 0 && o.mainAt) { const tt = o.mainAt[main]; RP.hand(t, 'n' + main, String(main + 1), shX - V(60, 0) + (PORTRAIT ? 30 : 0), y + bh * 0.5 + 24, V(76, 70), { at: tt + 0.1, d: 0.25, rot: -6, col: PORTRAIT ? RP.pen : RP.paper }); }
      });
    }, { label: 'the paper’s parts' })));
  };
};

/** 5 · three passes: three paper cards, numbered tabs, a time each (italic) and her question in blue pen. o.on (1..3: the
 *  pass being talked about; others dim), o.times [[at for card 1..3]], o.title */
RP.PASSES = [['1', '5–10 minutes', 'is this paper\neven for me?'], ['2', 'up to 1 hour', 'what did they find,\nwhat’s the evidence?'], ['3', '4–5 hours', 're-create it\nin your head']];
RP.passes = (o = {}) => {
  RP.sfx('cardPlace', (o.at || 0) + 0.13, -5); (o.times || []).slice(1).forEach(tt => RP.sfx('cardPlace', tt + 0.04, -7));
  return (t, r) => { r = RP.rr(r); rect(r.x, r.y, r.w, r.h, RP.desk); const m = V(80, 60);
    let head = 0; if (o.title) { const zt = V(Math.min(100, r.h * 0.11), 84); const tb = RP.text(t, 'title', o.title.replace(/\n/g, ' '), r.x + m, r.y + m + zt * 0.9, zt, { at: (o.at || 0) + 0.08, maxW: r.w - 2 * m, lh: 1.0 }); head = tb.h + V(70, 60); }
    const tW = 0;
    const ax = r.x + m + tW, aw = r.w - 2 * m - tW - V(70, 110), ay = r.y + m + head, ah = r.h - 2 * m - head - V(30, 0);
    RP.PASSES.forEach(([n, tm, q], i) => {
      const at = (o.times && o.times[i] != null) ? o.times[i] : (o.at || 0) + 0.12 * i; const a = rpE(t, at, 0.5, 'outExpo'); if (a <= 0) return;
      const ch = PORTRAIT ? (ah - 2 * 40) / 3 : Math.min(ah * 0.92, 520); const cw = PORTRAIT ? aw : (aw - 2 * V(70, 36)) / 3;
      const cx = PORTRAIT ? ax + (i % 2) * 18 : ax + i * (cw + 70), cy = PORTRAIT ? ay + i * (ch + 40) : ay + (ah - ch) / 2 + [12, -10, 6][i];
      const dim = o.on && o.on !== i + 1 ? 0.35 : 1;
      withA(clamp(a * 1.5) * dim, () => withT(0, 70 * (1 - a), 1, [-0.012, 0.008, -0.005][i], () => grp('card' + n, cx, cy, cw, ch, () => {
        RP.sheet(cx, cy, cw, ch, RP.paper, 0.8); RP.tab(cx + cw, cy + V(36, 30), n, Math.min(V(64, 96), cw * 0.14), 1, true);
        const z = Math.min(V(64, 64), cw / 7.4, ch * 0.3); const pad = V(40, Math.min(40, ch * 0.14));
        if (o.on === i + 1) RP.hl(cx + pad, cy + pad + z * 0.12, tw(tm, `italic 400 ${z}px "DM Serif Display"`) + 12, z * 0.95, t, (o.onAt || at) + 0.2, 0.16);
        txt(tm, cx + pad, cy + pad + z * 0.86, `italic 400 ${z}px "DM Serif Display"`, RP.ink, 'left', 'alphabetic', -0.02 * z, 'time' + n);
        if (PORTRAIT) RP.hand(t, 'q' + n, q.replace(/\n/g, ' '), cx + pad, cy + pad + z * 1.95, Math.min(52, ch * 0.2, (cw - 2 * pad - 120) / (q.length * 0.42)), { at: at + 0.25, rot: -1 });
        else RP.hand(t, 'q' + n, q, cx + pad, cy + pad + z * 2.0, Math.min(56, cw / 10), { at: at + 0.25, rot: -2 });
        if (!PORTRAIT) txt('Pass ' + n, cx + pad, cy + ch - pad + 4, F.body(V(30, 34), 600), RP.mid, 'left', 'alphabetic', 0, 'pass' + n);
      }, { label: 'pass ' + n })));
    });
    RP.cred('Times from S. Keshav, “How to Read a Paper” (2007); pass three: for beginners', r.x + m, r.y + r.h - V(40, 46), V(24, 28), RP.soft, 'left', 'credit');
  };
};

/** 6 · Keshav's five Cs: a crop of his list on a card + her plain words in pen beside each, ticked on her words (o.times) */
RP.FIVE = [['Category', 'what kind of paper?'], ['Context', 'related to what?'], ['Correctness', 'do the assumptions hold?'], ['Contributions', 'what’s new here?'], ['Clarity', 'is it well written?']];
RP.fiveC = (o) => {
  RP.sfx('paper', (o.at || 0) + 0.13, -5); (o.times || []).forEach((tt, i) => RP.sfx(i % 2 ? 'pencil' : 'marker', tt + 0.03, -9));
  return (t, r) => { r = RP.rr(r); rect(r.x, r.y, r.w, r.h, RP.desk); const m = V(80, 56); const K = RP.KS; const im = IMG.keshav_p1;
    const x0 = 312, y0 = 250, wpt = 250, hpt = 160;   // the list on page 1 (pt)
    const cardW = PORTRAIT ? Math.min(r.w - 2 * m, (r.h - 760) * 250 / 160) : Math.min(r.w * 0.5, 900); const s = cardW / (wpt * K); const cardH = hpt * K * s;
    const cx = r.x + m, cy = PORTRAIT ? r.y + m + 150 : r.y + (r.h - cardH) / 2 - 90;
    if (PORTRAIT) { if (!o.noTitle) RP.text(t, 'title', 'The *five Cs*', r.x + m, r.y + m + 90, 96, { at: (o.at || 0) + 0.1 }); }
    else RP.text(t, 'title', 'The *five Cs*', r.x + m, r.y + r.h - V(110, 0), 96, { at: (o.at || 0) + 0.1 });
    const a = rpE(t, o.at || 0, 0.6, 'outExpo');
    withA(clamp(a * 1.5), () => withT(0, 60 * (1 - a), 1, -0.012, () => grp('list', cx, cy, cardW, cardH, () => {
      RP.sheet(cx, cy, cardW, cardH, '#FFFFFF', 0.8);
      rpClip(cx, cy, cardW, cardH, () => { ctx.save(); ctx.translate(cx - x0 * K * s, cy - y0 * K * s); ctx.scale(s, s); if (im) themeFixed(() => ctx.drawImage(im, 0, 0, 1700, 2200));
        RP.FIVE.forEach(([w], i) => { const b = RP.kbox(w + ':'); if (b && o.times && o.times[i] != null) RP.hl(b[0], b[1], b[2], b[3], t, o.times[i], 0.14); }); ctx.restore(); });
    }, { img: true, label: 'Keshav’s list' })));
    RP.FIVE.forEach(([w, q], i) => { const tt = o.times && o.times[i]; if (tt == null) return;
      const z = V(58, 46); const y = PORTRAIT ? cy + cardH + 90 + i * 70 : r.y + V(170, 0) + i * ((r.h - 340) / 4.4) + 40; const x = PORTRAIT ? cx + 60 : cx + cardW + 110;
      RP.tick(x - 56, y - 18, V(34, 28), rpE(t, tt, 0.2, 'outCubic'), RP.paper);
      RP.hand(t, 'c' + i, q, x, y, z, { at: tt + 0.1, rot: -1.5, col: RP.paper, d: 0.45 }); });
    RP.cred('S. Keshav, “How to Read a Paper” (2007): what you should be able to answer after pass one', r.x + m, r.y + r.h - V(40, 46), V(24, 26), RP.soft);
  };
};

/** 7 · pass three: their study vs your version, rows she names, the differences circled in pen. o.rows [{q, a, b, at, diff}] */
RP.compare = (o) => {
  RP.sfx('paper', (o.at || 0) + 0.13, -5); (o.rows || []).forEach(rw => { RP.sfx('pencil', rw.at + 0.05, -10); if (rw.diff != null) RP.sfx('scribble', rw.diff, -8); });
  return (t, r) => { r = RP.rr(r); rect(r.x, r.y, r.w, r.h, RP.desk); const m = V(80, 56); const gap = V(44, 30);
    const cw = (r.w - 2 * m - gap) / 2, top = r.y + m + V(30, 40), ch = r.h - 2 * m - V(90, 110);
    [['Their study', 0], ['Your version', 1]].forEach(([h, i]) => { const x = r.x + m + i * (cw + gap); const a = rpE(t, (o.at || 0) + i * (o.bAt ? 0 : 0.15), 0.55, 'outExpo'); const at2 = i && o.bAt != null ? o.bAt : (o.at || 0) + i * 0.15; const a2 = rpE(t, at2, 0.55, 'outExpo');
      withA(clamp((i ? a2 : a) * 1.5), () => withT(0, 60 * (1 - (i ? a2 : a)), 1, i ? 0.008 : -0.01, () => grp(i ? 'yours' : 'theirs', x, top, cw, ch, () => {
        RP.sheet(x, top, cw, ch, i ? RP.card : RP.paper, 0.8); const pad = V(40, 32); const z = V(58, 54);
        if (i) RP.hand(t, 'h1', h, x + pad, top + pad + z * 0.9, z * 1.15, { at: at2 + 0.1, rot: -2 }); else txt(h, x + pad, top + pad + z * 0.86, F.disp(z, 800), RP.ink, 'left', 'alphabetic', -0.02 * z, 'h0');
        (o.rows || []).forEach((rw, k) => { const y = top + pad + z * 2.2 + k * V(150, 170); if (t < (i ? rw.at : Math.min(rw.at, (o.at || 0) + 0.4 + 0.15 * k)) - 0.05) return;
          const zq = V(30, 26); txtW(rw.q, x + pad, y, F.body(zq, 600), RP.mid, cw - 2 * pad, zq * 1.15, 0, 'q' + k + i);
          const val = i ? rw.b : rw.a; const zz = V(52, 40); const yv = y + (PORTRAIT && tw(rw.q, F.body(zq, 600)) > cw - 2 * pad ? zq * 1.15 : 0);
          if (i) RP.hand(t, 'v' + k, val, x + pad, yv + zz * 1.15, zz * 1.1, { at: rw.at + 0.25, rot: -1 });
          else withA(rpE(t, Math.min(rw.at, (o.at || 0) + 0.4 + 0.15 * k), 0.3), () => txt(val, x + pad, yv + zz * 1.05, `italic 400 ${zz}px "DM Serif Display"`, RP.ink, 'left', 'alphabetic', 0, 'v' + k));
          if (i && rw.diff != null) RP.loop(x + pad, yv + zz * 0.35, Math.min(cw - 2 * pad, tw(val, F.hand(zz * 1.1))), zz * 0.9, rpE(t, rw.diff, 0.45, 'inOutCubic'), RP.pen, 5); });
      }, { label: h })));
    });
    if (o.foot) RP.hand(t, 'foot', o.foot, r.x + r.w / 2, r.y + r.h - V(56, 50), V(56, 52), { at: o.footAt, col: RP.paper, align: 'center', rot: -1 });
  };
};

/** 8 · sample size: tally marks in pen for 12 people, the 12 big, a note (o.at, o.tallyAt, o.note, o.noteAt) */
RP.twelve = (o) => {
  RP.sfx('scribble', (o.tallyAt || o.at || 0) + 0.05, -6); if (o.noteAt != null) RP.sfx('pencil', o.noteAt, -9);
  return (t, r) => { r = RP.rr(r); rect(r.x, r.y, r.w, r.h, RP.desk); const m = V(90, 64);
    const cx = r.x + r.w / 2; const sz = Math.min(r.w * 0.11, V(130, 120), r.h * 0.14); const t0 = o.tallyAt || o.at || 0; const y = r.y + r.h * 0.3;
    withA(rpE(t, o.at || 0, 0.4), () => grp('sheet', r.x + m, r.y + m, r.w - 2 * m, r.h - 2 * m - V(40, 60), () => { RP.sheet(r.x + m, r.y + m, r.w - 2 * m, r.h - 2 * m - V(40, 60), RP.paper, 0.8);
      const n = 12, gx = sz * 0.36; let x = cx - ((2 * 4 + 4) * gx + 2 * sz * 0.5) / 2 - sz * 0.2;
      for (let i = 0; i < n; i++) { const k = rpE(t, t0 + i * 0.07, 0.12, 'outCubic'); const g5 = i % 5; if (g5 === 4) { RP.stroke([[x - gx * 4.3, y + sz * 0.62], [x + gx * 0.2, y - sz * 0.05]], k, sz * 0.08); x += sz * 0.55; continue; }
        RP.stroke([[x, y - sz * 0.15 + (i % 2) * 4], [x + 6, y + sz * 0.75]], k, sz * 0.08); x += gx; }
      const zz = Math.min(V(180, 200), r.h * 0.2); withA(rpE(t, t0 + 0.9, 0.3), () => txt('12', cx, y + sz + zz * 1.0, `italic 400 ${zz}px "DM Serif Display"`, RP.ink, 'center', 'alphabetic', -0.02 * zz, 'n'));
      if (o.note) RP.hand(t, 'note', o.note, cx, y + sz + zz * 1.0 + Math.min(V(110, 120), r.h * 0.09), Math.min(V(64, 64), r.h * 0.06), { at: o.noteAt, align: 'center', rot: -2 });
    }, { label: 'twelve people' }));
    if (o.credit) RP.cred(o.credit, r.x + m, r.y + r.h - V(40, 46), V(24, 28), RP.soft);
  };
};

/** 9 · a list of questions in pen, each ticked as she asks it: o.items [{s, at}], o.title */
RP.list = (o) => {
  (o.items || []).slice(0, 6).forEach((it, i) => RP.sfx(i % 2 ? 'pencil' : 'tap', it.at + 0.03, -9));
  return (t, r) => { r = RP.rr(r); rect(r.x, r.y, r.w, r.h, RP.desk); const m = V(80, 56);
    const shW = Math.min(r.w - 2 * m, V(1100, 1000)), shX = r.x + (r.w - shW) / 2, shY = r.y + m, shH = r.h - 2 * m - V(30, 40); const a = rpE(t, o.at || 0, 0.55, 'outExpo');
    withA(clamp(a * 1.5), () => withT(0, 50 * (1 - a), 1, -0.008, () => grp('sheet', shX, shY, shW, shH, () => { RP.sheet(shX, shY, shW, shH, RP.paper, 0.8);
      const pad = V(56, 44); let y = shY + pad + V(70, 80);
      if (o.title) { const b = RP.text(t, 'title', o.title, shX + pad, y, V(76, 80), { at: (o.at || 0) + 0.08, col: RP.ink, maxW: shW - 2 * pad }); y += b.h + V(40, 50); }
      const n = o.items.length; const lh = Math.min(V(110, 120), (shY + shH - pad - y) / n);
      o.items.forEach((it, i) => { const yy = y + i * lh + lh * 0.5; const z = Math.min(V(84, 84), lh * 0.78);
        RP.tick(shX + pad, yy - z * 0.2, z * 0.55, rpE(t, it.at, 0.2, 'outCubic'));
        RP.hand(t, 'i' + i, it.s, shX + pad + z * 0.95, yy + z * 0.25, z, { at: it.at + 0.05, d: 0.35, rot: -1 }); });
    }, { label: 'list' })));
  };
};

/** 10 · a photo (Pexels) on the desk as a print, a line of her words on the desk, small credit */
RP.photo = (o) => {
  RP.sfx('shutter', (o.at || 0) + 0.04, -6);
  return (t, r) => { r = RP.rr(r); rect(r.x, r.y, r.w, r.h, RP.desk); const m = V(72, 56);
    const tH = o.lines ? (PORTRAIT ? (o.hand ? 560 : 400) : 0) : 0; const tW = o.lines && !PORTRAIT ? Math.min(r.w * 0.38, 640) : 0;
    const px = r.x + m + tW, py = r.y + m, pw = r.w - 2 * m - tW, ph = r.h - 2 * m - tH - V(60, 70); const a = rpE(t, o.at || 0, 0.55, 'outExpo');
    withA(clamp(a * 1.6), () => withT(0, 50 * (1 - a), 1, (o.rot == null ? 0.8 : o.rot) * Math.PI / 180, () => grp('photo', px, py, pw, ph, () => {
      RP.sheet(px - 14, py - 14, pw + 28, ph + 28, '#FFFFFF', 0.8); const k = 1 + 0.05 * E.inOutCubic(prog(t, o.at || 0, 7));
      rpClip(px, py, pw, ph, () => withT((px + pw / 2) * (1 - k), (py + ph / 2) * (1 - k), k, 0, () => RP.cover(o.key, px, py, pw, ph, o.fx == null ? 0.5 : o.fx, o.fy == null ? 0.5 : o.fy))); }, { img: true })));
    if (o.lines) { const z = o.size || V(96, 100); if (PORTRAIT) RP.text(t, 'lines', o.lines, r.x + m, r.y + r.h - m - tH + 130, z, { at: (o.at || 0) + 0.15, maxW: r.w - 2 * m });
      else RP.text(t, 'lines', o.lines, r.x + m, r.y + r.h * 0.42, z, { at: (o.at || 0) + 0.15, maxW: tW - 50 });
      if (o.hand) RP.hand(t, 'hand', o.hand, r.x + m + 6, PORTRAIT ? r.y + r.h - m - 10 : r.y + r.h * 0.42 + z * 2.6, V(60, 64), { at: o.handAt, col: RP.paper, rot: -3 }); }
    RP.cred(o.credit || 'Photo: Pexels', r.x + r.w - m, r.y + r.h - V(28, 30), V(22, 24), RP.soft, 'right', 'credit');
  };
};

/** 11 · three numbered notes (what to do when it still makes no sense): o.items [{s, sub, at}] on paper slips */
RP.notes = (o) => {
  (o.items || []).forEach((it, i) => RP.sfx('cardPlace', it.at + 0.03, -7));
  return (t, r) => { r = RP.rr(r); rect(r.x, r.y, r.w, r.h, RP.desk); const m = V(80, 56); const n = o.items.length;
    o.items.forEach((it, i) => { const a = rpE(t, it.at, 0.5, 'outExpo'); if (a <= 0) return;
      const w = PORTRAIT ? r.w - 2 * m : (r.w - 2 * m - (n - 1) * 40) / n, h = PORTRAIT ? (r.h - 2 * m - (n - 1) * 36) / n : r.h * 0.6;
      const x = PORTRAIT ? r.x + m : r.x + m + i * (w + 40), y = PORTRAIT ? r.y + m + i * (h + 36) : r.y + (r.h - h) / 2 + [10, -12, 4][i % 3];
      withA(clamp(a * 1.5), () => withT(0, 60 * (1 - a), 1, [-0.014, 0.01, -0.006][i % 3], () => grp('note' + i, x, y, w, h, () => {
        RP.sheet(x, y, w, h, RP.paper, 0.8); const pad = V(40, 40); const z = Math.min(V(58, 64), w / 7.5);
        txt(String(i + 1).padStart(2, '0'), x + pad, y + pad + V(40, 30), F.mono(V(32, 34)), RP.mid, 'left', 'alphabetic', 2, 'n' + i);
        const ty = y + pad + V(130, Math.min(140, h * 0.42)); const b = RP.text(t, 's' + i, PORTRAIT ? it.s.replace(/\n/g, ' ') : it.s, x + pad, ty, PORTRAIT ? Math.min(z, h * 0.2) : z, { at: it.at + 0.05, col: RP.ink, maxW: w - 2 * pad });
        if (it.sub) RP.hand(t, 'sub' + i, it.sub, x + pad, ty + b.h + V(z * 0.7, 20), Math.min(V(54, 50), w / 8.5, h * 0.18), { at: it.subAt || it.at + 0.6, rot: -2 });
      }, { label: 'note ' + (i + 1) })));
    });
  };
};

/** 12 · a generic PDF reader with highlights + margin notes (Zotero-like, no brand UI): o.at, o.hlAt [t...], o.noteAt */
RP.reader = (o) => {
  RP.sfx('click', (o.at || 0) + 0.1, -6); (o.hlAt || []).forEach(tt => RP.sfx('marker', tt, -8)); if (o.noteAt) RP.sfx('typeHit', o.noteAt, -8);
  return (t, r) => { r = RP.rr(r); rect(r.x, r.y, r.w, r.h, RP.desk); const m = V(72, 50); const a = rpE(t, o.at || 0, 0.55, 'outExpo');
    const x = r.x + m, y = r.y + m, w = r.w - 2 * m, h = r.h - 2 * m - V(30, 40);
    withA(clamp(a * 1.5), () => withT(0, 50 * (1 - a), 1, 0, () => grp('reader', x, y, w, h, () => {
      RP.sheet(x, y, w, h, '#E9E8E3', 0.8); const bar = V(56, 64); rect(x, y, w, bar, '#D6D5CF'); for (let i = 0; i < 3; i++) circle(x + 30 + i * 26, y + bar / 2, 7, '#B5B3AC');
      const side = PORTRAIT ? 0 : w * 0.3; const px = x + 40, pw = w - side - 80, py = y + bar + 30, ph = h - bar - 60;
      rect(px, py, pw, ph, '#FFFFFF'); const s = pw / 1700; rpClip(px, py, pw, ph, () => { ctx.save(); ctx.translate(px, py - 430 * RP.KS * s); ctx.scale(s, s); if (IMG.keshav_p1) themeFixed(() => ctx.drawImage(IMG.keshav_p1, 0, 0, 1700, 2200));
        ['about five to ten minutes', 'Carefully read the title, abstract, and introduction', 'Read the conclusions'].forEach((ph_, i) => { const b = RP.kbox(ph_); if (b && o.hlAt && o.hlAt[i] != null) RP.hl(b[0], b[1], b[2], b[3], t, o.hlAt[i], 0.16); }); ctx.restore(); });
      if (!PORTRAIT) { const sx = x + w - side, sy = y + bar; rect(sx, sy, side, h - bar, '#F3F2EE'); _txt('Notes', sx + 34, sy + 64, F.disp(44), RP.ink, 'left');
        if (o.noteAt != null) { const k = clamp((t - o.noteAt) * 22); const s1 = o.note || 'Pass 1 takes 5–10 min. Read this one again for the thesis.'; withA(1, () => txtW(s1.slice(0, Math.floor(k)), sx + 34, sy + 130, F.body(32, 500), RP.ink, side - 68, 44, 0, 'note')); } }
    }, { label: 'PDF with highlights' })));
    if (o.credit) RP.cred(o.credit, r.x + m, r.y + r.h - V(24, 26), V(22, 24), RP.soft);
  };
};

/** a paper correction screen drawn as a graphic (when the plain "pause her" card is not used): the corrected line typed on,
 *  the inserted words in blue pen with a caret, the receipt above. o.at, o.lines (array, the 2nd has the caret insert) */
RP.fix = (o) => {
  RP.sfx('scribble', (o.penAt || (o.at || 0) + 0.8), -6);
  return (t, r) => { r = RP.rr(r); rect(r.x, r.y, r.w, r.h, RP.desk); const m = V(90, 56); const a = rpE(t, o.at || 0, 0.5, 'outExpo');
    const cw = Math.min(r.w - 2 * m, V(1180, 1000)), ch = V(440, 560), cx = r.x + (r.w - cw) / 2, cy = r.y + r.h * 0.52 - ch / 2;
    withA(clamp(a * 1.5), () => withT(0, 50 * (1 - a), 1, -0.01, () => grp('card', cx, cy, cw, ch, () => {
      RP.sheet(cx, cy, cw, ch, RP.paper, 0.8); const z = V(56, 56); const pad = V(70, 56);
      RP.text(t, 'l', o.text || 'Kelly Caine looked at every paper\npublished at CHI 2014 and found the\nmost common sample size was 12.', cx + pad, cy + pad + z * 1.4, z, { at: (o.at || 0) + 0.1, col: RP.ink, w: 500, wi: 600, lh: 1.5, maxW: cw - 2 * pad });
      RP.hand(t, 'pen', o.pen || 'correction: one conference, CHI 2014', cx + pad, cy + ch - pad, V(54, 56), { at: o.penAt || (o.at || 0) + 0.8, rot: -2 });
    }, { label: 'correction' })));
  };
};
