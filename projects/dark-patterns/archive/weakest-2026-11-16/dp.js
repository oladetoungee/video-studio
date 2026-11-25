/* dark-patterns: the look C · BLOWN UP (her pick 2026-11-02) + B's honest-vs-winning split, shared by the motion film
 * (film/film.json scripts) and the talking-head edit, shorts and teaser (talking-head.json "common", before moments/common.js).
 * Flat pink #FF9EC4, ink #111111, white UI; B's split = paper #EEECE6 / ink, pink its one mark. The marker = an ink block
 * with the word knocked out in pink; a black magnifying glass (hairline) finds the trick. Type set 03 (2026-11-07):
 * Helvetica Neue 700 + 300, body 400, DM Mono labels.
 * Every text editable (txt / mono / DP.text with ovr keys: [word] = a black block), every block movable (grp).
 * Each graphic DP.x(o) returns draw(t, r) (r = the rect it fills): a talking-head layout's o.draw, or a film scene. */
'use strict';
const DP = { pink: '#FF9EC4', ink: '#111111', white: '#FFFFFF', mid: '#5C3446', grey: '#7A7A7A', soft: '#FFC4DB', paper: '#FFFFFF', ink2: '#141414',
  line: 'rgba(17,17,17,0.16)', lineW: 'rgba(255,255,255,0.18)' };
/* fonts: Geist + DM Serif Display are not in studio/runtime/fonts.css yet (ENGINE-REQUESTS): registered here, and the moment
 * waits for them before the first frame (TH.ready runs after buildMoment, before anything is drawn or exported) */
const DPF = (() => { const add = (fam, file, d) => { const f = new FontFace(fam, `url(/library/fonts/${file})`, d || {}); document.fonts.add(f); return f.load(); };
  return Promise.all([add('Geist', 'Geist.ttf', { weight: '100 900' }), add('DM Serif Display', 'DMSerifDisplay-Regular.ttf'), add('DM Serif Display', 'DMSerifDisplay-Italic.ttf', { style: 'italic' })]).catch(e => console.error('dark-patterns fonts', e)); })();

G.dpPink = { bg: DP.pink, fg: DP.ink, mid: DP.mid, line: DP.line, acc: DP.ink, card: DP.white, panel: DP.soft, grid: DP.line, mode: 'light' };
G.dpInk = { bg: DP.ink, fg: DP.white, mid: '#C9A9B8', line: DP.lineW, acc: DP.pink, card: DP.white, panel: '#222222', grid: DP.lineW, mode: 'dark' };
G.dpWhite = { bg: DP.white, fg: DP.ink, mid: '#6B6B6B', line: DP.line, acc: DP.ink, card: DP.white, panel: '#F2F2F2', grid: DP.line, mode: 'light' };
G.dpPaper = { bg: DP.paper, fg: DP.ink, mid: '#6E6A62', line: DP.line, acc: DP.ink, card: DP.white, panel: '#E2DFD7', grid: DP.line, mode: 'light' };
/* type set 03 Heavy + light (her pick 2026-11-07, inspiration/know-how/TYPE-SYSTEM.md): Helvetica Neue Bold 700 headlines
 * (tracking -0.045em, sentence case) mixed with Helvetica Neue Light 300 for contrast words, Helvetica Neue 400 body,
 * DM Mono 500 caps labels (+0.12em). No outlines, rings or borders over 2 px (separate with space and colour). */
const HNW = (w) => (w >= 600 ? 700 : w <= 300 ? 300 : w >= 500 ? 500 : 400);
F.disp = (s, w = 700) => `${HNW(w)} ${s}px "Helvetica Neue"`;
F.body = (s, w = 400) => `${HNW(w)} ${s}px "Helvetica Neue"`;
F.mono = (s, w = 500) => `500 ${s}px "DM Mono"`;
F.serif = (s) => `300 ${s}px "Helvetica Neue"`;   // the light contrast words (~word~)
LS.disp = -0.045; LS.body = -0.01; LS.mono = 0.12; LS.serif = -0.02;
if (typeof PLATE !== 'undefined') { PLATE.dp = [DP.pink, DP.ink, DP.ink]; PLATE.dpInk = [DP.ink, DP.white, DP.pink]; PLATE.dpWhite = [DP.white, DP.ink, DP.ink]; }

const dpE = (t, t0, d, e = 'outQuint') => MOTION.ease(t, t0, d, e);
DP.sfx = (role, t, db = 0) => { if (t != null && t >= 0 && t < TOTAL) sfx(role, t, db); };
/** the time she starts a word inside a phrase (first match), else the phrase start */
function WT(ph, word) {
  const n = (s) => s.toLowerCase().replace(/[’]/g, "'").replace(/[^a-z0-9']/g, '');
  const want = String(word).split(/\s+/).map(n);
  const ws = WORDS.slice(ph.i, ph.i + ph.w.length);
  for (let k = 0; k <= ws.length - want.length; k++) if (want.every((x, j) => ws[k + j].n === x)) return ph.w[k];
  return ph.t;
}
DP.filmP = () => PORTRAIT && typeof FOOT === 'undefined';   // the film in 9:16 (stack everything)
DP.short = () => !!(typeof FOOT !== 'undefined' && PORTRAIT && FOOT.m && FOOT.m.kind === 'short');
function clipR(x, y, w, h, fn) { ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip(); fn(); ctx.restore(); }
function clipC(cx, cy, r, fn) { ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.clip(); fn(); ctx.restore(); }
/** shorts: a graphic that reaches the top of the frame starts below the top label */
DP.rr = (r) => {
  if (!DP.short()) return r; const lb = TH.labelBottom(); if (!(lb > 0)) return r;
  const m = ctx.getTransform(), sy = m.d / BASE[3], y0 = (m.d * r.y + m.f - BASE[5]) / BASE[3];
  if (y0 >= lb + 20) return r; const d = (lb + 24 - y0) / (sy || 1);
  rect(r.x, r.y, r.w, r.h, DP.ink); return { x: r.x, y: r.y + d, w: r.w, h: r.h - d };
};

/** editable text, [word] = an ink block with the word knocked out in pink (sweeps in at o.hits[i] / o.hits / o.at + 0.25).
 *  '\n' = a new line (o.lh). size shrinks so the widest line fits o.maxW. o.f (font fn, default F.disp), o.w (weight),
 *  o.at (rises in), o.align, o.col, o.knock, o.blockCol. Returns {w, h, size}. */
DP.text = (t, key, def, x, y, size, o = {}) => {
  const ov = o.raw ? { s: null, hide: false, dx: 0, dy: 0, k: 1 } : ovr(key); const str = ov.s != null ? ov.s : def; const ff = o.f || ((s) => F.disp(s, o.w || 900));
  const lines = String(str).split('\n'); const plain = (l) => l.replace(/[\[\]]/g, '');
  const ls = (z) => (o.ls == null ? -0.045 : o.ls) * z;
  let z = size; const wid = (zz) => Math.max(...lines.map(l => tw(plain(l), ff(zz), ls(zz))));
  if (o.maxW) while (wid(z) > o.maxW && z > 18) z -= 2;
  const font = ff(z), lh = (o.lh || 1.08) * z, W_ = wid(z), H_ = (lines.length - 1) * lh + z * 1.08;
  const bx = o.align === 'center' ? x - W_ / 2 : o.align === 'right' ? x - W_ : x;
  const a = o.at == null ? 1 : dpE(t, o.at, 0.42);
  const info = { text: str, def, label: 'text ([word] = black block)' };
  if (ov.hide) { regBox(ov, bx, y - z * 0.86, W_, H_, info); return { w: W_, h: H_, size: z }; }
  if (a > 0.002) moved(ov, () => {
    let bi = 0;
    withA(clamp(a * 1.8), () => withT(0, (1 - a) * z * 0.25, 1, 0, () => lines.forEach((l, li) => {
      const lw = tw(plain(l), font, ls(z)); let xx = o.align === 'center' ? x - lw / 2 : o.align === 'right' ? x - lw : x; const yy = y + li * lh;
      for (const p of l.split(/(\[[^\]]+\])/).filter(Boolean)) {
        const bl = p[0] === '['; const s = bl ? p.slice(1, -1) : p; const w = tw(s, font, ls(z));
        _txt(s, xx, yy, font, o.col || DP.ink, 'left', 'alphabetic', ls(z));
        if (bl) { const ht = Array.isArray(o.hits) ? o.hits[Math.min(bi, o.hits.length - 1)] : o.hits != null ? o.hits : (o.at || 0) + 0.3; bi++;
          const q = dpE(t, ht, 0.4, 'outExpo'); if (q > 0) { const pd = z * 0.12, by = yy - z * 0.86, bh = z * 1.08, bw = (w + 2 * pd) * q;
            rect(xx - pd, by, bw, bh, o.blockCol || DP.ink); clipR(xx - pd, by, bw, bh, () => _txt(s, xx, yy, font, o.knock || DP.pink, 'left', 'alphabetic', ls(z))); } }
        xx += w; }
    })));
    if (!o.raw) regBox(ov, bx, y - z * 0.86, W_, H_, info);
  });
  return { w: W_, h: H_, size: z };
};
/** the specimen name label (A's borrowed idea): "03 / 11  HARD TO CANCEL", Geist Mono, on an ink tab */
DP.tag = (t, at, n, name, x, y, o = {}) => { if (DP.short()) return;   // shorts: no series counter a stranger can't place
  const z = o.size || V(36, 34); const s = (n ? String(n).padStart(2, '0') + ' / 11   ' : '') + name; const p = dpE(t, at, 0.4); if (p <= 0) return;
  const w = monoW(s, z, { fixed: true }) + z * 1.3, h = z * 1.9;
  withA(clamp(p * 2), () => grp('tag', x, y, w, h, () => { rect(x, y, w * E.outExpo(clamp(p)), h, o.bg || DP.ink); mono(s, x + z * 0.65, y + h * 0.66, z, o.fg || DP.pink, 'left', { key: 'tag', fixed: true }); }));
};
/** the magnifying glass: a black ring at (cx, cy) radius r; inside, fn drawn k x around (fx, fy). The handle points bottom-right. */
DP.lens = (cx, cy, r, k, fx, fy, fn, o = {}) => {
  if (r < 2) return; const lw = o.lw || 2;
  ctx.save(); ctx.shadowColor = 'rgba(17,17,17,0.35)'; ctx.shadowBlur = 30; ctx.shadowOffsetY = 12; ctx.fillStyle = o.inside || DP.white; ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill(); ctx.restore();
  clipC(cx, cy, r, () => { rect(cx - r, cy - r, 2 * r, 2 * r, o.inside || DP.white); ctx.save(); ctx.translate(cx, cy); ctx.scale(k, k); ctx.translate(-fx, -fy); fn(); ctx.restore(); });
  ctx.save(); ctx.strokeStyle = DP.ink;
  ctx.lineWidth = 8; ctx.lineCap = 'butt'; const a = o.handle == null ? Math.PI / 4 : o.handle;
  ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * (r + lw * 0.4), cy + Math.sin(a) * (r + lw * 0.4)); ctx.lineTo(cx + Math.cos(a) * r * 1.55, cy + Math.sin(a) * r * 1.55); ctx.stroke(); ctx.restore();
};
/** a dotted leader from the small thing to the lens */
DP.leader = (x0, y0, x1, y1) => { ctx.save(); ctx.strokeStyle = DP.ink; ctx.lineWidth = 2; ctx.setLineDash([2, 10]); ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke(); ctx.restore(); };
/** a checkbox (generic UI), on 0..1 draws the tick */
DP.box = (x, y, s, on, col = DP.ink, tick) => {
  strokeR(x, y, s, s, col, 2); if (on <= 0) return;
  ctx.save(); ctx.strokeStyle = tick || col; ctx.lineWidth = Math.max(3, s * 0.08); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath();
  const p = clamp(on); const a = [x + s * 0.2, y + s * 0.52], b = [x + s * 0.42, y + s * 0.74], c = [x + s * 0.8, y + s * 0.26];
  ctx.moveTo(...a); if (p < 0.4) ctx.lineTo(lerp(a[0], b[0], p / 0.4), lerp(a[1], b[1], p / 0.4)); else { ctx.lineTo(...b); const q = (p - 0.4) / 0.6; ctx.lineTo(lerp(b[0], c[0], q), lerp(b[1], c[1], q)); }
  ctx.stroke(); ctx.restore();
};
/** a hand-drawn marker loop around a box, p 0..1 */
DP.loop = (cx, cy, rx, ry, p, col = DP.ink, lw = 2) => {   // a hairline marker loop (no thick strokes)
  lw = Math.min(lw, 2);
  if (p <= 0) return; ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath();
  const n = 60, end = Math.PI * 2.12 * p;
  for (let i = 0; i <= n; i++) { const a = -Math.PI * 0.6 + end * i / n; const w = 1 + 0.035 * Math.sin(a * 3 + 1); const X = cx + Math.cos(a - 0.05) * rx * w, Y = cy + Math.sin(a) * ry * w; i ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); }
  ctx.stroke(); ctx.restore();
};
/** a photo cropped to cover the box (never stretched) */
DP.cover = (key, x, y, w, h, fx = 0.5, fy = 0.5) => {
  const im = IMG[key]; if (!im) { rect(x, y, w, h, '#DDD'); return; }
  const s = Math.max(w / im.width, h / im.height); const sw = w / s, sh = h / s;
  themeFixed(() => ctx.drawImage(im, clamp((im.width - sw) * fx, 0, im.width - sw), clamp((im.height - sh) * fy, 0, im.height - sh), sw, sh, x, y, w, h));
};
/** a slow push on long holds (a graphic never sits dead still): scale around the rect's centre */
DP.push = (t, t0, r, fn, k = 0.025, d = 8) => { const s = 1 + k * E.inOutCubic(prog(t, t0, d)); withT((r.x + r.w / 2) * (1 - s), (r.y + r.h / 2) * (1 - s), s, 0, fn); };
const DPX = { n: 0 };

/* ======================= graphics: each returns draw(t, r) for a layout's o.draw (r = the panel rect) ======================= */

/** 1 · the pop-up at poster scale: "10% OFF" (o.offAt), "Yes please" (o.btnAt), the guilt-trip link typed on (o.linkAt);
 *  the lens finds it (o.lensAt) and blocks "I hate saving money" (o.blockAt). o.tag = [n, name] specimen label. */
DP.popup = (o) => {
  DP.sfx('pop', o.at, -5); if (o.btnAt) DP.sfx('tick', o.btnAt, -6); if (o.linkAt) DP.sfx('typeHit', o.linkAt, -8); if (o.lensAt) DP.sfx('focus', o.lensAt, -4); if (o.blockAt) DP.sfx('marker', o.blockAt, -5);
  return (t, r) => { r = DP.rr(r); rect(r.x, r.y, r.w, r.h, DP.pink);
    const vert = r.h > r.w * 1.15 || DP.filmP(); const m = V(56, 48);
    const w = Math.min(vert ? r.w - 2 * m : r.w * 0.56, (r.h - 2 * m) / 0.78 * (vert ? 0.62 : 0.95));
    const h = w * 0.78, x = vert ? r.x + (r.w - w) / 2 : r.x + m + (o.lensAt ? 0 : (r.w - 2 * m - w) / 2), y = vert ? r.y + m + V(0, 40) : r.y + (r.h - h) / 2;
    const pin = dpE(t, o.at || 0, 0.45);
    let L = null;
    withA(clamp(pin * 2), () => withT(0, 50 * (1 - pin), 1, 0, () => grp('popup', x, y, w, h, () => {
      rect(x, y, w, h, DP.white); const cx = x + w / 2;
      withA(o.offAt == null ? 1 : dpE(t, o.offAt, 0.35), () => txt('10% OFF', cx, y + h * 0.32, F.disp(w * 0.19), DP.ink, 'center', 'alphabetic', -w * 0.004, 'off'));
      withA(o.btnAt == null ? 1 : dpE(t, o.btnAt, 0.35), () => { rect(x + w * 0.1, y + h * 0.43, w * 0.8, h * 0.2, DP.ink); txt('Yes please', cx, y + h * 0.565, F.body(w * 0.065, 700), DP.white, 'center', 'alphabetic', 0, 'yes'); });
      const ov = ovr('link'); const ln = ov.s != null ? ov.s : 'No thanks, I hate saving money'; const fs = w * 0.036; const lw = tw(ln, F.body(fs, 500));
      const pl = o.linkAt == null ? 1 : clamp((t - o.linkAt) / 0.9); const n = Math.round(ln.length * pl);
      _txt(ln.slice(0, n), cx - lw / 2, y + h * 0.8, F.body(fs, 500), DP.grey, 'left'); if (pl >= 1) rect(cx - lw / 2, y + h * 0.8 + 4, lw, 2, DP.grey);
      regBox(ov, cx - lw / 2, y + h * 0.8 - fs, lw, fs * 1.3, { text: ln, def: 'No thanks, I hate saving money' });
      L = { ln, fs, x0: cx - lw / 2, y0: y + h * 0.8, lx: cx, ly: y + h * 0.8 - fs * 0.35, lw };
    })));
    if (o.tag) DP.tag(t, (o.at || 0) + 0.3, o.tag[0], o.tag[1], vert ? r.x + m : x, vert ? y + h + 40 : (y - V(90, 90) >= r.y + 8 ? y - V(90, 90) : y + h + 24));
    if (o.lensAt && L) {
      const R = dpE(t, o.lensAt, 0.55, 'outBack') * (vert ? Math.min(r.w * 0.36, (r.y + r.h - (y + h) - 70) / 1.25) : Math.min(r.h * 0.3, (r.x + r.w - (x + w) - 70) / 1.25));
      const cx = vert ? r.x + r.w * 0.44 : x + w + (r.x + r.w - x - w) * 0.45, cy = vert ? y + h + 70 + R * 1.05 : r.y + r.h * 0.5;
      const pre = 'No thanks, '; const ix = L.ln.indexOf('I hate'); const off = tw(ix > 0 ? L.ln.slice(0, ix) : pre, F.body(L.fs, 500)); const part = ix > 0 ? L.ln.slice(ix) : 'I hate saving money';
      if (R > 4) DP.leader(L.x0 + L.lw + 10, L.ly, vert ? cx : cx - R, vert ? cy - R : cy);
      const pwF = tw(part, F.body(L.fs, 500)); DP.lens(cx, cy, R, (R * 1.7) / Math.max(1, pwF), L.x0 + off + pwF / 2, L.ly, () => {
        _txt(L.ln.slice(0, ix > 0 ? ix : pre.length), L.x0, L.y0, F.body(L.fs, 500), DP.grey, 'left'); rect(L.x0, L.y0 + 4, L.lw, 2, DP.grey);
        const fnt = F.body(L.fs, 500), pw = tw(part, fnt), q = dpE(t, o.blockAt || o.lensAt + 0.5, 0.45, 'outExpo'), pd = L.fs * 0.12;
        _txt(part, L.x0 + off, L.y0, fnt, DP.grey, 'left'); if (q > 0) { rect(L.x0 + off - pd, L.y0 - L.fs * 0.86, (pw + 2 * pd) * q, L.fs * 1.08, DP.ink); clipR(L.x0 + off - pd, L.y0 - L.fs * 0.86, (pw + 2 * pd) * q, L.fs * 1.08, () => _txt(part, L.x0 + off, L.y0, fnt, DP.pink, 'left')); }
      });
    }
  };
};

/** 2 · a word card: o.kicker (mono), o.lines (one string, '\n' = new line, [word] = block), o.hits, o.at, o.small (a line
 *  under it, Geist Light), o.smallAt, o.ground ('dpPink' | 'dpInk' | 'dpWhite'), o.size, o.align ('left' | 'center'), o.tag */
DP.word = (o) => {
  DP.sfx(o.sound || 'typeHit', (o.at || 0) + 0.02, -6); if (o.hits != null) [].concat(o.hits).slice(0, 2).forEach(h => DP.sfx('marker', h, -6));
  return (t, r) => { r = DP.rr(r); const gr = G[o.ground || 'dpPink']; rect(r.x, r.y, r.w, r.h, gr.bg);
    const m = Math.max(V(64, 52), r.w * 0.06); const ctr = o.align === 'center'; const x = ctr ? r.x + r.w / 2 : r.x + m;
    const nL = String(o.lines).split('\n').length; let size = o.size || Math.min(V(150, 132), (r.w - 2 * m) / 6.2, (r.h - 2 * m) / (nL * 1.15 + 1.4));
    let y = r.y + r.h * (o.y || 0.42) - (nL - 1) * size * 0.54; y = Math.max(y, r.y + m + (o.tag ? V(110, 116) : 0) + (o.kicker ? size * 0.9 + V(40, 44) : 0) + size * 0.9);
    DP.push(t, o.at || 0, r, () => {
      if (o.kicker) withA(dpE(t, (o.at || 0), 0.4), () => mono(o.kicker, x, y - size * 1.25, V(36, 34), gr.mid, ctr ? 'center' : 'left', { key: 'kicker', maxW: r.w - 2 * m }));
      const b = DP.text(t, 'lines', o.lines, x, y, size, { at: o.at, hits: o.hits, maxW: r.w - 2 * m, align: ctr ? 'center' : 'left', col: gr.fg, knock: gr === G.dpInk ? DP.ink : DP.pink, blockCol: gr === G.dpInk ? DP.pink : DP.ink });
      if (o.small) withA(dpE(t, o.smallAt != null ? o.smallAt : (o.at || 0) + 0.5, 0.45), () => {
        const z = Math.min(V(48, 46), b.size * 0.42); txtW(o.small, ctr ? r.x + m : x, y + b.h + z * 0.9, F.body(z, 300), gr.fg, r.w - 2 * m, z * 1.25, -0.01 * z, 'small'); });
      if (o.tag) DP.tag(t, (o.at || 0) + 0.2, o.tag[0], o.tag[1], r.x + m, r.y + m);
    });
  };
};

/** 3 · a real page clipping (crop only, never altered): white sheet, a pink marker sweeps the words she says (o.hlAt: a time, or
 *  one per box), the source + date as a small credit. o.title (a big line above, [word] blocks), o.kicker, o.lens {i, at}: the
 *  magnifier reads highlight box i. o.ground, o.w (share of the panel's width), o.only (box indexes to mark). */
DP.src = (key, o = {}) => {
  DP.sfx('shutter', (o.at || 0) + 0.05, -5); if (o.lens) DP.sfx('focus', o.lens.at, -4);
  return (t, r) => { r = DP.rr(r); const gr = G[o.ground || 'dpPink']; rect(r.x, r.y, r.w, r.h, gr.bg);
    const c = CLIPS[key], im = IMG['clip_' + key]; if (!c || !im) { mono('missing source ' + key, r.x + 40, r.y + 80, 28, gr.mid, 'left', { raw: true }); return; }
    const m = Math.max(V(56, 44), r.w * 0.05); const capRoom = o.capRoom || 0;
    let top = r.y + m;
    if (o.kicker) { withA(dpE(t, o.at || 0, 0.4), () => mono(o.kicker, r.x + m, top + 32, V(36, 34), gr.mid, 'left', { key: 'kicker', maxW: r.w - 2 * m })); top += V(80, 80); }
    if (o.title) { const z = o.titleSize || Math.min(V(92, 84), (r.w - 2 * m) / 9); const nL = o.title.split('\n').length;
      const b = DP.text(t, 'title', o.title, r.x + m, top + z * 0.86, z, { at: (o.at || 0) + 0.1, hits: o.titleHits, maxW: r.w - 2 * m, col: gr.fg, knock: gr === G.dpInk ? DP.ink : DP.pink, blockCol: gr === G.dpInk ? DP.pink : DP.ink });
      top += b.h + V(44, 48); void nL; }
    const avH = r.y + r.h - m - capRoom - top - V(56, 60); const pad = V(22, 20);
    const s = Math.min(((o.w || 1) * (r.w - 2 * m) - 2 * pad) / c.w, (avH - 2 * pad) / c.h, o.maxScale || 2.2);
    const cw = c.w * s + 2 * pad, ch = c.h * s + 2 * pad; const x = r.x + m, y = top + Math.max(0, (avH - ch) * (o.vAlign == null ? 0.35 : o.vAlign));
    const a = dpE(t, o.at || 0, 0.5);
    withA(clamp(a * 1.6), () => withT(0, 36 * (1 - a), 1, 0, () => {
      grp('page', x, y, cw, ch, () => themeFixed(() => { rect(x, y, cw, ch, DP.white); ctx.drawImage(im, x + pad, y + pad, c.w * s, c.h * s);
        if (o.hlAt != null) clipR(x + pad, y + pad, c.w * s, c.h * s, () => c.hl.forEach((b, i) => { if (o.only && !o.only.includes(i)) return;
          const ht = Array.isArray(o.hlAt) ? o.hlAt[o.only ? o.only.indexOf(i) : i] : o.hlAt + i * 0.28; if (ht == null) return; const p = dpE(t, ht, 0.42, 'outExpo'); if (p <= 0) return;
          ctx.save(); ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = DP.pink; ctx.fillRect(x + pad + (b[0] - 6) * s, y + pad + (b[1] - 2) * s, (b[2] + 12) * s * p, (b[3] + 4) * s); ctx.restore(); })); }), { img: true, label: 'real page (drag to move, resize)' });
      mono(o.credit || (c.source + (c.date ? '  ·  ' + c.date : '')), x, y + ch + V(48, 48), V(30, 30), gr.mid, 'left', { key: 'credit', maxW: r.w - 2 * m });
    }));
    if (o.lens && c.hl[o.lens.i]) { const b = c.hl[o.lens.i]; const fx = x + pad + (b[0] + b[2] / 2) * s, fy = y + pad + (b[1] + b[3] / 2) * s;
      const R0 = o.lens.r || Math.min(V(250, 230), r.h * 0.26); const R = dpE(t, o.lens.at, 0.55, 'outBack') * R0;
      const lx = o.lens.x != null ? r.x + r.w * o.lens.x : Math.min(r.x + r.w - R * 1.6, fx + R * 1.2), ly = o.lens.y != null ? r.y + r.h * o.lens.y : Math.min(r.y + r.h - R * 1.6 - capRoom, y + ch + R * 0.9);
      if (R > 4) DP.leader(fx, fy + b[3] * s * 0.6, lx - R * 0.5, ly - R * 0.8);
      DP.lens(lx, ly, R, Math.min(4, (R * 1.6) / ((b[2] + 30) * s)), fx, fy, () => themeFixed(() => { ctx.drawImage(im, x + pad, y + pad, c.w * s, c.h * s);
        if (o.hlAt != null) { ctx.save(); ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = DP.pink; ctx.fillRect(x + pad + (b[0] - 6) * s, y + pad + (b[1] - 2) * s, (b[2] + 12) * s, (b[3] + 4) * s); ctx.restore(); } }));
    }
  };
};

/** 4 · a checkout card: rows [{s, price, img, at, sneak (lands with a drop on its time), tick ('pre' = ticked for you at o.tickAt)}],
 *  o.total [[time, '€40.00'], ...] (the total flips), o.loop {row, at} (a marker loop round a row), o.title, o.tag */
DP.cart = (o) => {
  DP.sfx('paper', (o.at || 0) + 0.02, -6); (o.rows || []).forEach(rw => { if (rw.sneak) DP.sfx('pop', rw.at, -3); if (rw.tickAt) DP.sfx('tick', rw.tickAt, -2); });
  if (o.loop) DP.sfx('marker', o.loop.at, -5); (o.total || []).slice(1).forEach(([tt]) => DP.sfx('coin', tt, -7));
  return (t, r) => { r = DP.rr(r); rect(r.x, r.y, r.w, r.h, G[o.ground || 'dpPink'].bg);
    const m = Math.max(V(56, 44), r.w * 0.06); const cw = Math.min(r.w - 2 * m, V(900, 980)); const x = r.x + (r.w - cw) / 2;
    const rows = o.rows || []; const rh = Math.min(V(150, 160), (r.h - 2 * m - V(330, 340)) / Math.max(2, rows.length)); const ch = V(150, 150) + rows.length * rh + V(170, 170);
    const y = r.y + Math.max(m, (r.h - ch) * 0.45); const a = dpE(t, o.at || 0, 0.45); const z = Math.min(V(44, 46), rh * 0.34);
    DP.push(t, o.at || 0, r, () => withA(clamp(a * 2), () => withT(0, 40 * (1 - a), 1, 0, () => grp('checkout', x, y, cw, ch, () => {
      rect(x, y, cw, ch, DP.white); txt(o.title || 'Checkout', x + 44, y + V(96, 98), F.disp(V(64, 66), 800), DP.ink, 'left', 'alphabetic', -1, 'title');
      let yy = y + V(150, 150);
      rows.forEach((rw, i) => { const p = rw.at == null ? 1 : rw.sneak ? MOTION.spring(t - rw.at, 0.55, 2.4) : dpE(t, rw.at, 0.35); if (p <= 0.002) { return; }
        withA(clamp(p * 2), () => withT(0, rw.sneak ? -30 * (1 - Math.min(1, p)) : 0, 1, 0, () => {
          let tx = x + 44;
          if (rw.tick) { const s = rh * 0.38; DP.box(tx, yy + rh / 2 - s / 2, s, rw.tickAt == null ? 1 : dpE(t, rw.tickAt, 0.35), DP.ink); tx += s + 26; }
          if (rw.img) { const s = rh * 0.74; DP.cover(rw.img, tx, yy + rh * 0.13, s, s, 0.5, 0.65); tx += s + 26; }
          txt(rw.s, tx, yy + rh * 0.6, F.body(z, 600), DP.ink, 'left', 'alphabetic', 0, 'row' + (i + 1));
          txt(rw.price, x + cw - 44, yy + rh * 0.6, F.mono(z, 600), DP.ink, 'right', 'alphabetic', 0, 'price' + (i + 1));
        }));
        if (o.loop && o.loop.row === i) DP.loop(x + cw / 2, yy + rh / 2, cw / 2 - 8, rh / 2 + 10, dpE(t, o.loop.at, 0.6, 'inOutQuart'), DP.ink, 6);
        yy += rh; });
      hline(x + 44, yy + 30, cw - 88, 1, DP.line, 2);
      const tot = (o.total || [[0, '']]).filter(([tt]) => t >= tt).pop() || o.total[0]; const fl = o.total && o.total.length > 1 ? dpE(t, tot[0], 0.3) : 1;
      txt('Total', x + 44, yy + 110, F.body(V(50, 50), 700), DP.ink, 'left', 'alphabetic', 0, 'total');
      withT(0, (1 - fl) * 16, 1, 0, () => _txt(tot[1], x + cw - 44, yy + 110, F.mono(V(54, 54), 700), DP.ink, 'right'));
      if (o.total && o.total.length > 1 && t >= o.total[1][0]) { const tw_ = tw(tot[1], F.mono(V(54, 54), 700)), q = dpE(t, o.total[1][0] + 0.15, 0.4, 'outExpo'); rect(x + cw - 44 - tw_ - 8, yy + 110 - 50, (tw_ + 16) * q, 64, DP.ink); clipR(x + cw - 44 - tw_ - 8, yy + 60, (tw_ + 16) * q, 64, () => _txt(tot[1], x + cw - 44, yy + 110, F.mono(V(54, 54), 700), DP.pink, 'right')); }
    }))));
    if (o.tag) DP.tag(t, (o.at || 0) + 0.25, o.tag[0], o.tag[1], x, Math.max(r.y + 20, y - V(84, 84)));
    if (o.note) withA(dpE(t, o.note.at, 0.4), () => mono(o.note.s, x, y + ch + V(60, 64), V(30, 32), DP.ink, 'left', { key: 'note', maxW: cw }));
  };
};

/** 5 · hidden costs: €40 on the product page (shoe photo) -> struck, "+ [service fee]" -> €52 at checkout. o.a, o.fee, o.b */
DP.price = (o) => {
  DP.sfx('coin', o.a, -6); DP.sfx('marker', o.fee, -5); DP.sfx('hit', o.b, -6);
  return (t, r) => { r = DP.rr(r); rect(r.x, r.y, r.w, r.h, DP.pink); const vert = r.h > r.w * 0.95; const m = Math.max(V(56, 44), r.w * 0.05);
    const pw = vert ? r.w - 2 * m : r.w * 0.36, ph = vert ? r.h * 0.4 : r.h - 2 * m - V(140, 0); const px = r.x + m, py = r.y + m;
    const pa = dpE(t, o.at || o.a - 0.4, 0.45);
    withA(clamp(pa * 2), () => grp('product', px, py, pw, ph, () => { DP.cover('px-7588163', px, py, pw, ph, 0.5, 0.7); const z = V(28, 30); const lb = 'PRODUCT PAGE'; const lw = monoW(lb, z, { fixed: true }) + 48; rect(px, py + ph - 64, lw, 64, DP.ink); mono(lb, px + 24, py + ph - 22, z, DP.white, 'left', { key: 'product', fixed: true }); }, { img: true }));
    const x = vert ? r.x + m : px + pw + V(80, 0), y = vert ? py + ph + V(0, 230) : r.y + r.h * 0.5; const big = Math.min(V(220, 170), (r.w - (x - r.x) - m) / V(3.4, 5.0));
    DP.text(t, 'old', '€40', x, y, big, { at: o.a - 0.1, col: DP.ink });
    const st = dpE(t, o.fee, 0.4, 'outExpo'); rect(x - 10, y - big * 0.36, (tw('€40', F.disp(big)) + 20) * st, big * 0.1, DP.ink);
    const fz = big * 0.27; DP.text(t, 'fee', '+ [service fee]', x, y + big * 0.62, fz, { at: o.fee, hits: o.fee + 0.15, f: (s) => F.body(s, 600) });
    const bx = x + tw('€40', F.disp(big)) + big * 0.45; DP.text(t, 'new', '€52', bx, y, big, { at: o.b - 0.05 });
    withA(dpE(t, o.b + 0.1, 0.4), () => mono('AT CHECKOUT', bx + 6, y + big * 0.62, V(28, 30), DP.ink, 'left', { key: 'at checkout' }));
    if (o.tag) DP.tag(t, (o.at || o.a - 0.4) + 0.25, o.tag[0], o.tag[1], vert ? px + 20 : x, vert ? py + 20 : r.y + m);
  };
};

/** 6 · hard to cancel: "Join" (one click) on the left; to cancel, page after page piles up on the right (o.pages times) */
DP.cancel = (o) => {
  DP.sfx('click', o.joinAt, -3); (o.pages || []).forEach((p, i) => DP.sfx(i % 2 ? 'paper' : 'tick', p, -5));
  return (t, r) => { r = DP.rr(r); rect(r.x, r.y, r.w, r.h, DP.pink); const vert = r.h > r.w * 0.95; const m = Math.max(V(56, 44), r.w * 0.05);
    const half = vert ? { x: r.x + m, y: r.y + m, w: r.w - 2 * m, h: r.h * 0.3 } : { x: r.x + m, y: r.y + m, w: r.w * 0.36, h: r.h - 2 * m };
    const a = dpE(t, o.at || 0, 0.4);
    withA(clamp(a * 2), () => { mono('TO JOIN', half.x, half.y + 30, V(30, 32), DP.ink, 'left', { key: 'to join' });
      const bw = half.w * 0.86, bh = V(130, 120), bx = half.x, by = half.y + V(80, 70); const pr = o.joinAt != null && Math.abs(t - o.joinAt) < 0.12 ? 0.95 : 1;
      withT(bx + bw / 2, by + bh / 2, pr, 0, () => { rect(-bw / 2, -bh / 2, bw, bh, DP.ink); txt(o.join || 'Join in one click', 0, bh * 0.14, F.body(V(46, 46), 700), DP.white, 'center', 'alphabetic', 0, 'join'); });
      });   // (2026-11-07: '1 click' under 'Join in one click' said it twice)
    const R = vert ? { x: r.x + m, y: r.y + r.h * 0.38, w: r.w - 2 * m, h: r.h * 0.6 - m } : { x: r.x + r.w * 0.45, y: r.y + m, w: r.w * 0.55 - m, h: r.h - 2 * m };
    withA(dpE(t, (o.pages || [0])[0] - 0.3, 0.4), () => mono('TO CANCEL', R.x, R.y + 30, V(30, 32), DP.ink, 'left', { key: 'to cancel' }));
    const texts = o.texts || ['Are you sure?', 'Wait! Here is 50% off', 'Tell us why you are leaving', 'You will lose your perks', 'Last chance: stay?', 'Are you really sure?'];
    const n = (o.pages || []).filter(p => t >= p).length; const cw = R.w * 0.8, chh = V(190, 170);
    (o.pages || []).forEach((p, i) => { const q = MOTION.spring(t - p, 0.6, 2.2); if (q <= 0.002) return; const ox = i * V(26, 22), oy = V(80, 70) + i * V(52, 50);
      withA(clamp((t - p) * 8), () => withT(R.x + ox, R.y + oy + (1 - Math.min(1, q)) * 50, 1, (hash(i + 7) - 0.5) * 0.04, () => { rect(0, 0, cw, chh, DP.white); 
        _txt(texts[i % texts.length], 36, chh * 0.42, F.body(V(42, 40), 700), DP.ink, 'left'); rect(36, chh * 0.6, cw * 0.32, chh * 0.24, DP.ink); _txt('Keep my plan', 36 + cw * 0.16, chh * 0.6 + chh * 0.17, F.body(V(24, 24), 600), DP.white, 'center');
        _txt('continue to cancel', 36 + cw * 0.32 + 30, chh * 0.6 + chh * 0.17, F.body(V(22, 22), 500), DP.grey, 'left'); })); });
    void n;   // (2026-11-07: the 'page N' counter read as a leftover; the stack itself grows)
    if (o.tag && !vert) DP.tag(t, (o.at || 0) + 0.2, o.tag[0], o.tag[1], half.x, r.y + r.h - m - 60);
  };
};

/** 7 · a photo print with a mono caption (o.key image, o.cap, o.credit, o.at); a slow push */
DP.photo = (o) => {
  DP.sfx('shutter', (o.at || 0) + 0.04, -4);
  return (t, r) => { r = DP.rr(r); rect(r.x, r.y, r.w, r.h, G[o.ground || 'dpPink'].bg); const m = Math.max(V(56, 44), r.w * 0.05);
    const pw = r.w - 2 * m, ph = r.h - 2 * m - V(90, 96); const a = dpE(t, o.at || 0, 0.45);
    withA(clamp(a * 2), () => withT(0, 40 * (1 - a), 1, 0, () => grp('photo', r.x + m, r.y + m, pw, ph, () => {
      const k = 1 + 0.04 * E.inOutCubic(prog(t, o.at || 0, 6)); clipR(r.x + m, r.y + m, pw, ph, () => withT((r.x + m + pw / 2) * (1 - k), (r.y + m + ph / 2) * (1 - k), k, 0, () => DP.cover(o.key, r.x + m, r.y + m, pw, ph, o.fx == null ? 0.5 : o.fx, o.fy == null ? 0.5 : o.fy))); }, { img: true })));
    if (o.cap) withA(dpE(t, (o.at || 0) + 0.3, 0.4), () => mono(o.cap, r.x + m, r.y + r.h - m - V(30, 34), V(30, 32), G[o.ground || 'dpPink'].fg, 'left', { key: 'cap', maxW: pw * 0.72 }));
    withA(dpE(t, (o.at || 0) + 0.3, 0.4), () => mono(o.credit || 'Photo: Pexels', r.x + r.w - m, r.y + r.h - m - V(30, 34), V(22, 24), G[o.ground || 'dpPink'].mid, 'right', { key: 'credit' }));
  };
};

/** 8 · a free trial that turns paid: "Premium, free for 1 month" + card first (o.askAt), a month passes (o.endAt), charged (o.chargeAt) */
DP.trial = (o) => {
  DP.sfx('pop', (o.at || 0) + 0.05, -5); if (o.askAt) DP.sfx('typeHit', o.askAt, -6); if (o.endAt) DP.sfx('tick', o.endAt, -4); if (o.chargeAt) DP.sfx('coin', o.chargeAt, -3);
  return (t, r) => { r = DP.rr(r); rect(r.x, r.y, r.w, r.h, DP.pink); const m = Math.max(V(56, 44), r.w * 0.05);
    const sc = Math.min(1, (r.w - 2 * m) / 820, (r.h - 2 * m - V(120, 40)) / 640); const cw = 820 * sc, ch = 640 * sc; const x = r.x + (r.w - cw) / 2, y = r.y + m;
    const a = dpE(t, o.at || 0, 0.45);
    DP.push(t, o.at || 0, r, () => withA(clamp(a * 2), () => withT(x, y + 40 * (1 - a), sc, 0, () => grp('trial', 0, 0, 820, 640, () => { const x = 0, y = 0, cw = 820, ch = 640;
      rect(x, y, cw, ch, DP.white); const p = 48;
      mono('PREMIUM', x + p, y + 70, V(28, 30), DP.mid, 'left', { key: 'premium' });
      DP.text(t, 'free', 'Free for 1 month', x + p, y + V(160, 170), V(76, 76), { maxW: cw - 2 * p });
      const fa = o.askAt == null ? 1 : dpE(t, o.askAt, 0.4);
      withA(fa, () => { mono('ENTER YOUR CARD FIRST', x + p, y + V(250, 260), V(26, 28), DP.ink, 'left', { key: 'card first' }); strokeR(x + p, y + V(280, 290), cw - 2 * p, V(96, 100), DP.ink, 2);
        const typed = '4242 4242 4242 ••••'; const n = o.askAt == null ? typed.length : Math.floor(clamp((t - o.askAt - 0.3) / 1.2) * typed.length); _txt(typed.slice(0, n), x + p + 28, y + V(342, 354), F.mono(V(40, 42), 500), DP.ink, 'left'); });
      // the month: a bar that fills, then the charge
      const by = y + ch - V(160, 170), bw = cw - 2 * p; const fp = o.endAt ? clamp((t - (o.askAt || o.at || 0) - 0.8) / Math.max(0.5, o.endAt - (o.askAt || o.at || 0) - 0.8)) : 0;
      rect(x + p, by, bw, 18, DP.soft); rect(x + p, by, bw * E.inOutCubic(fp), 18, DP.ink);
      mono('DAY 1', x + p, by + 60, V(24, 26), DP.mid, 'left', { key: 'day1', fixed: true }); mono('DAY 30', x + p + bw, by + 60, V(24, 26), DP.mid, 'right', { key: 'day30', fixed: true });
    }))));
    if (o.chargeAt) { const q = dpE(t, o.chargeAt, 0.35, 'outBack'); if (q > 0.01) withT(x + cw * 0.6, y + ch - 90 * sc, (0.6 + 0.4 * q) * Math.max(0.7, sc), -0.06, () => withA(clamp(q * 2), () => {
      const s = o.charge || 'CHARGED: 1 YEAR'; const z = V(56, 54); const w = tw(s, F.disp(z, 900), -1) + 60; rect(-w / 2, -z, w, z * 1.6, DP.ink); txt(s, 0, z * 0.32, F.disp(z, 900), DP.pink, 'center', 'alphabetic', -1, 'charged'); })); }
    if (o.tag) DP.tag(t, (o.at || 0) + 0.25, o.tag[0], o.tag[1], x, y + ch + V(36, 40));
  };
};

/** 9 · one checkbox sentence: o.s ([word] = blocked on o.hits), the box (o.tickAt = it ticks itself), o.under (a mono line), o.tag */
DP.check = (o) => {
  [].concat(o.hits || []).forEach((h, i) => DP.sfx(['tick', 'tick', 'tick'][i % 3], h, -5)); if (o.tickAt) DP.sfx('click', o.tickAt, -3);
  return (t, r) => { r = DP.rr(r); rect(r.x, r.y, r.w, r.h, G[o.ground || 'dpPink'].bg); const vert = r.h > r.w * 0.95; const m = Math.max(V(64, 48), r.w * 0.06);
    const bs = V(140, 120); const nL = String(o.s).split('\n').length; const size = o.size || Math.min(V(92, 84), (r.w - 2 * m - (vert ? 0 : bs + 40)) / 10.5);
    const y0 = r.y + (r.h - (nL * size * 1.12 + (vert ? bs + 60 : 0))) * 0.42;
    const a = dpE(t, o.at || 0, 0.4);
    DP.push(t, o.at || 0, r, () => {
      withA(clamp(a * 2), () => { rect(r.x + m, y0, bs, bs, DP.white); DP.box(r.x + m, y0, bs, o.tickAt == null ? (o.ticked ? 1 : 0) : dpE(t, o.tickAt, 0.35), DP.ink); });
      const lx = vert ? r.x + m : r.x + m + bs + 44, ly = vert ? y0 + bs + 60 + size * 0.86 : y0 + size * 0.86;
      const b = DP.text(t, 'sentence', o.s, lx, ly, size, { at: o.at, hits: o.hits, maxW: r.x + r.w - m - lx, w: 800, lh: 1.12 });
      if (o.under) withA(dpE(t, o.underAt || (o.at || 0) + 1, 0.4), () => mono(o.under, lx, ly + b.h + V(30, 40), V(30, 32), DP.ink, 'left', { key: 'under', maxW: r.x + r.w - m - lx }));
      if (o.tag) DP.tag(t, (o.at || 0) + 0.2, o.tag[0], o.tag[1], r.x + m, r.y + m);
    });
  };
};

/** 10 · disguised ads: a search for "running shoes" (typed from o.at), four results; the first two carry a tiny "Sponsored"
 *  that the lens blows up (o.lensAt); o.blockAt blocks "paid ads" */
DP.search = (o) => {
  DP.sfx('typeHit', (o.at || 0) + 0.05, -6); (o.rowsAt ? [o.rowsAt] : []).forEach(x => DP.sfx('pop', x, -6)); if (o.lensAt) DP.sfx('focus', o.lensAt, -4);
  return (t, r) => { r = DP.rr(r); rect(r.x, r.y, r.w, r.h, DP.pink); const m = Math.max(V(56, 44), r.w * 0.05); const vert = PORTRAIT || r.h > r.w * 0.95;
    const cw = vert ? r.w - 2 * m : r.w * 0.58, x = r.x + m, y = r.y + m; const a = dpE(t, o.at || 0, 0.4);
    let tagBox = null;
    withA(clamp(a * 2), () => grp('results', x, y, cw, r.h - 2 * m, () => {
      rect(x, y, cw, V(100, 100), DP.white); strokeR(x, y, cw, V(100, 100), DP.ink, 2);
      const q = 'running shoes'; const n = Math.floor(clamp((t - (o.at || 0) - 0.15) / 0.7) * q.length); _txt(q.slice(0, n), x + 34, y + V(64, 64), F.body(V(44, 44), 500), DP.ink, 'left');
      const rh = Math.min(V(170, 190), (r.h - 2 * m - V(130, 130)) / 4 - 16); const names = ['Runner One', 'Trail Light', 'City Runner', 'Road Pro'];
      for (let i = 0; i < 4; i++) { const p = dpE(t, (o.rowsAt || (o.at || 0) + 0.8) + i * 0.1, 0.35); const yy = y + V(130, 130) + i * (rh + 16);
        withA(p, () => { rect(x, yy, cw, rh, DP.white); DP.cover('px-7588163', x + 20, yy + 20, rh - 40, rh - 40, 0.5, 0.7);
          _txt(names[i], x + rh + 10, yy + rh * 0.42, F.body(V(40, 42), 700), DP.ink, 'left'); _txt('€' + [59, 64, 49, 72][i], x + rh + 10, yy + rh * 0.74, F.mono(V(34, 36), 500), DP.ink, 'left');
          if (i < 2) { const fs = V(16, 18); const sx = x + cw - 30 - tw('Sponsored', F.body(fs, 500)), sy = yy + rh * 0.3; _txt('Sponsored', sx, sy, F.body(fs, 500), DP.grey, 'left'); if (i === 0) tagBox = { x: sx, y: sy - fs * 0.4, w: tw('Sponsored', F.body(fs, 500)), fs }; } }); }
    }, { label: 'search results' }));
    if (o.lensAt && tagBox) { const R = dpE(t, o.lensAt, 0.55, 'outBack') * (vert ? Math.min(r.w * 0.3, 260) : Math.min(r.h * 0.3, (r.x + r.w - x - cw) * 0.36));
      const lx = vert ? r.x + r.w * 0.6 : x + cw + (r.x + r.w - x - cw) * 0.5, ly = vert ? r.y + r.h * 0.72 : r.y + r.h * 0.55; if (R > 4) DP.leader(tagBox.x + tagBox.w / 2, tagBox.y + 20, lx - R * 0.6, ly - R * 0.75);
      DP.lens(lx, ly, R, (R * 1.5) / tagBox.w, tagBox.x + tagBox.w / 2, tagBox.y, () => _txt('Sponsored', tagBox.x, tagBox.y + tagBox.fs * 0.4, F.body(tagBox.fs, 500), DP.grey, 'left')); }
    if (o.blockAt) { const z = V(84, 76); const bx = vert ? r.x + m : x + cw + 50, by = vert ? r.y + r.h - m - z * 0.4 : r.y + r.h - m - z * 0.6; DP.text(t, 'paid', '[paid ads]', bx, by, z, { at: o.blockAt - 0.1, hits: o.blockAt }); }
    if (o.tag) DP.tag(t, (o.at || 0) + 0.2, o.tag[0], o.tag[1], vert ? x : x + cw + 50, r.y + m);
  };
};

/** 11 · nagging: "Turn on notifications?" with only "Allow" and "Not now"; it comes back on o.asks (times), a count goes up */
DP.nag = (o) => {
  (o.asks || []).forEach((a, i) => DP.sfx(i ? 'notify' : 'pop', a, -4)); if (o.lensAt) DP.sfx('focus', o.lensAt, -4);
  return (t, r) => { r = DP.rr(r); rect(r.x, r.y, r.w, r.h, DP.pink); const m = Math.max(V(56, 44), r.w * 0.05);
    const asks = o.asks || [o.at || 0]; const n = asks.filter(a => t >= a).length; const last = asks[Math.max(0, n - 1)];
    const cw = Math.min(r.w - 2 * m, V(760, 880)), ch = V(420, 440); const x = r.x + (r.w - cw) / 2, y = r.y + (r.h - ch) * 0.4;
    const q = MOTION.spring(t - last, 0.55, 2.6); if (n) withA(clamp((t - last) * 8), () => withT(x + cw / 2, y + ch / 2, 0.85 + 0.15 * Math.min(1.05, q), 0, () => grp('prompt', -cw / 2, -ch / 2, cw, ch, () => {
      rect(-cw / 2, -ch / 2, cw, ch, DP.white); txt('Turn on notifications?', 0, -ch / 2 + V(120, 124), F.body(V(54, 52), 800), DP.ink, 'center', 'alphabetic', -1, 'question');
      _txt('We’ll let you know about deals.', 0, -ch / 2 + V(190, 192), F.body(V(32, 32), 400), DP.grey, 'center');
      const bw = (cw - 3 * 40) / 2, bh = V(110, 110), by = ch / 2 - bh - 44;
      rect(-cw / 2 + 40, by, bw, bh, '#EFEFEF'); txt('Not now', -cw / 2 + 40 + bw / 2, by + bh * 0.62, F.body(V(42, 42), 700), DP.ink, 'center', 'alphabetic', 0, 'not now');
      rect(-cw / 2 + 80 + bw, by, bw, bh, DP.ink); txt('Allow', -cw / 2 + 80 + bw * 1.5, by + bh * 0.62, F.body(V(42, 42), 700), DP.white, 'center', 'alphabetic', 0, 'allow');
      if (o.loopAt) DP.loop(0, by + bh / 2, cw / 2 - 10, bh / 2 + 22, dpE(t, o.loopAt, 0.6, 'inOutQuart'), DP.ink, 6);
    })));
    if (!o.noCount && (n > 1 || o.countAlways)) DP.text(t, 'count', 'asked ' + n + 'x', x, y + ch + V(130, 140), V(96, 90), { at: asks[1] || asks[0], w: 900 });
    if (o.tag) DP.tag(t, (o.at || asks[0]) + 0.2, o.tag[0], o.tag[1], x, y - V(90, 90));
    if (o.note) withA(dpE(t, o.note.at, 0.4), () => mono(o.note.s, x, y + ch + V(220, 230), V(30, 32), DP.ink, 'left', { key: 'note', maxW: cw }));
  };
};

/** 12 · fake urgency: THIS DEAL ENDS IN 10:00 counting down; she presses Refresh (o.refreshAt) and it is back at 10:00
 *  (full edit and film only: no timers in shorts, her rule) */
DP.timer = (o) => {
  DP.sfx('clock', (o.at || 0) + 0.1, -6); if (o.refreshAt) { DP.sfx('click', o.refreshAt, -3); DP.sfx('tape', o.refreshAt + 0.15, -6); }
  return (t, r) => { r = DP.rr(r); rect(r.x, r.y, r.w, r.h, DP.pink); const cx = r.x + r.w / 2;
    const st = (o.at || 0) + 0.3, rf = o.refreshAt || 1e9; const left = t < st ? 600 : t < rf ? 600 - Math.floor(t - st) : t < rf + 0.25 ? -1 : 600 - Math.max(0, Math.floor(t - rf - 0.25));
    const s = left < 0 ? '' : String(Math.floor(left / 60)).padStart(2, '0') + ':' + String(left % 60).padStart(2, '0');
    const z = Math.min(V(340, 300), r.w / 3.4);
    withA(dpE(t, o.at || 0, 0.3), () => mono('THIS DEAL ENDS IN', cx, r.y + r.h * 0.26, V(36, 36), DP.ink, 'center', { key: 'deal' }));
    if (s) _txt(s, cx, r.y + r.h * 0.26 + z * 1.05, F.disp(z), DP.ink, 'center', 'alphabetic', -z * 0.02);
    const bw = Math.min(V(380, 420), r.w * 0.6), by = r.y + r.h * 0.26 + z * 1.4; const press = Math.abs(t - rf) < 0.1 ? 0.94 : 1;
    withA(dpE(t, rf - 0.6, 0.3), () => withT(cx, by + 50, press, 0, () => { rect(-bw / 2, -50, bw, 100, DP.white); strokeR(-bw / 2, -50, bw, 100, DP.ink, 2);
      ctx.save(); ctx.strokeStyle = DP.ink; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(-bw / 2 + 64, 0, 22, 0.3, Math.PI * 1.75); ctx.stroke(); ctx.restore();
      txt('Refresh', 30, 16, F.body(46, 700), DP.ink, 'center', 'alphabetic', 0, 'refresh'); }));
    if (o.againAt) DP.text(t, 'again', 'starts [again] from 10 minutes', cx, by + V(220, 230), V(56, 50), { at: o.againAt - 0.1, hits: o.againAt + 0.1, align: 'center', f: (q) => F.body(q, 700), maxW: r.w - 80 });
    if (o.tag) DP.tag(t, (o.at || 0) + 0.2, o.tag[0], o.tag[1], r.x + V(60, 48), r.y + V(60, 48));
  };
};

/** 13 · fake scarcity: a product card "Only [2] left in stock"; a week later (o.weekAt) the same card, the same 2 */
DP.stock = (o) => {
  DP.sfx('pop', (o.at || 0) + 0.05, -5); if (o.weekAt) DP.sfx('stamp', o.weekAt, -4);
  return (t, r) => { r = DP.rr(r); rect(r.x, r.y, r.w, r.h, DP.pink); const vert = r.h > r.w * 0.95; const m = Math.max(V(56, 44), r.w * 0.05);
    const card = (x, y, w, h, at, key) => { const a = dpE(t, at, 0.45); if (a <= 0) return; withA(clamp(a * 2), () => withT(0, 40 * (1 - a), 1, 0, () => grp(key, x, y, w, h, () => {
      rect(x, y, w, h, DP.white); const ph = h * 0.52; DP.cover('px-7588163', x, y, w, ph, 0.5, 0.7);
      _txt('Running shoes', x + 30, y + ph + h * 0.12, F.body(Math.min(44, w / 9), 700), DP.ink, 'left'); _txt('€40', x + 30, y + ph + h * 0.22, F.mono(Math.min(40, w / 10), 500), DP.ink, 'left');
      DP.text(t, key + '-stock', 'Only [2] left in stock', x + 30, y + h - h * 0.08, Math.min(V(50, 46), w / 9), { hits: at + 0.4, f: (q) => F.body(q, 800) }); }))); };
    const n = o.weekAt ? 2 : 1; const gap = V(60, 40); const w = vert ? r.w - 2 * m : Math.min((r.w - 2 * m - gap) / 2, (r.h - 2 * m) * 0.78), h = vert ? (r.h - 2 * m - gap - V(0, 60)) / 2 : w / 0.78;
    const x0 = vert ? r.x + m : r.x + (r.w - (n * w + (n - 1) * gap)) / 2 + (n === 1 ? 0 : 0), y0 = vert ? r.y + m : r.y + (r.h - h) / 2;
    card(x0, y0, w, h, o.at || 0, 'today');
    if (o.weekAt) { const x1 = vert ? x0 : x0 + w + gap, y1 = vert ? y0 + h + gap : y0; card(x1, y1, w, h, o.weekAt, 'week');
      const q = dpE(t, o.weekAt + 0.1, 0.35, 'outBack'); if (q > 0.01) withT(x1 + w * 0.5, y1 + h * 0.25, 0.7 + 0.3 * q, -0.06, () => withA(clamp(q * 2), () => { const z = V(46, 44); const s = '1 WEEK LATER'; const ww = tw(s, F.disp(z), -1) + 50; rect(-ww / 2, -z, ww, z * 1.6, DP.ink); txt(s, 0, z * 0.32, F.disp(z), DP.pink, 'center', 'alphabetic', -1, 'week later'); })); }
    if (o.tag) DP.tag(t, (o.at || 0) + 0.2, o.tag[0], o.tag[1], r.x + m, r.y + V(10, 10));
  };
};

/** 14 · B's split, the honest version vs the version that wins (her pick: one scene type inside C). A on paper (left / top),
 *  B on ink (right / bottom), pink is B's only mark. o.a / o.b: {title, sub, draw(t, rect, side)}; o.bAt (B lands later),
 *  o.at; o.full (B takes the frame at o.fullAt: "build the honest version" -> A takes it: o.win 'a') */
DP.vs = (o) => {
  DP.sfx('swipe', (o.at || 0) + 0.15, -5); if (o.bAt) DP.sfx('pop', o.bAt, -4); if (o.winAt) DP.sfx('hit', o.winAt, -5);
  return (t, r) => { r = DP.rr(r); const vert = r.h > r.w * 1.05 || DP.filmP(); const d = dpE(t, o.at || 0, 0.65, 'inOutQuart');
    let k = 0.5; if (o.winAt) k = lerp(0.5, o.win === 'a' ? 1 : 0, dpE(t, o.winAt, 0.7, 'inOutQuart'));
    const A = vert ? { x: r.x, y: r.y, w: r.w, h: r.h * k } : { x: r.x, y: r.y, w: r.w * k, h: r.h }, B = vert ? { x: r.x, y: r.y + r.h * k, w: r.w, h: r.h * (1 - k) } : { x: r.x + r.w * k, y: r.y, w: r.w * (1 - k), h: r.h };
    rect(r.x, r.y, r.w, r.h, DP.paper);
    const side = (S, key, gr, sd, at) => { if (S.w < 2 || S.h < 2) return; if (S.w < 260 || S.h < 220) { rect(S.x, S.y, S.w, S.h, gr.bg); return; } rect(S.x, S.y, S.w, S.h, gr.bg); const m = Math.max(V(48, 40), Math.min(S.w, S.h) * 0.07); const a = dpE(t, at, 0.45);
      clipR(S.x, S.y, S.w, S.h, () => withA(clamp(a * 2), () => { const g0 = g; g = gr;
        _txt(key.toUpperCase(), S.x + m, S.y + m + V(56, 54), F.disp(V(72, 66)), key === 'b' ? DP.pink : DP.ink, 'left');
        mono(sd.label || (key === 'a' ? 'The honest version' : 'The version that wins'), S.x + m + V(70, 64), S.y + m + V(48, 46), V(26, 28), gr.mid, 'left', { key: key + '-label', fixed: true });
        let y = S.y + m + V(150, 140);
        if (sd.title) { const z = sd.size || Math.min(V(76, 70), (S.w - 2 * m) / 9); const b = DP.text(t, key + '-title', sd.title, S.x + m, y + z * 0.4, z, { at: at + 0.1, hits: sd.hits, maxW: S.w - 2 * m, col: gr.fg, knock: key === 'b' ? DP.ink : DP.pink, blockCol: key === 'b' ? DP.pink : DP.ink, w: 800 }); y += b.h + V(30, 26); }
        if (sd.draw) sd.draw(t, { x: S.x + m, y, w: S.w - 2 * m, h: S.y + S.h - m - y }, key);
        g = g0; })); };
    if (d > 0) { side(A, 'a', G.dpPaper, o.a || {}, o.at || 0); side(B, 'b', G.dpInk, o.b || {}, o.bAt || (o.at || 0) + 0.25);
      if (!vert) rect(A.x + A.w - 2, r.y, 4, r.h, DP.ink); }
  };
};
/** mini checkout for the split (no photo): rows [s, price, {pink, tickAt, at}] */
DP.miniCart = (rows, tot) => (t, R, key) => { const cw = R.w, rh = Math.min(V(100, 96), R.h / (rows.length + 2.2)); const z = Math.min(V(38, 38), rh * 0.4);
  rect(R.x, R.y, cw, rh * (rows.length + 1.7), DP.white); let y = R.y + rh * 0.2;
  rows.forEach(([s, pr, f = {}], i) => { const a = f.at == null ? 1 : MOTION.spring(t - f.at, 0.55, 2.4); if (a <= 0.002) { y += rh; return; } const col = f.pink && key === 'b' ? DP.pink : DP.ink;
    withA(clamp(a * 2), () => { let tx = R.x + 28; if (f.box) { const s_ = rh * 0.4; DP.box(tx, y + rh / 2 - s_ / 2, s_, f.tickAt == null ? (f.ticked ? 1 : 0) : dpE(t, f.tickAt, 0.35), DP.ink); tx += s_ + 18; }
      if (f.pink && key === 'b') rect(R.x + 6, y + 6, 10, rh - 12, DP.pink);
      _txt(s, tx, y + rh * 0.62, F.body(z, 600), DP.ink, 'left'); _txt(pr, R.x + cw - 28, y + rh * 0.62, F.mono(z, 600), col === DP.pink ? DP.ink : DP.ink, 'right'); }); y += rh; });
  hline(R.x + 28, y + rh * 0.1, cw - 56, 1, DP.line, 2); const T_ = typeof tot === 'function' ? tot(t, key) : tot;
  _txt('Total', R.x + 28, y + rh * 0.75, F.body(z, 800), DP.ink, 'left'); _txt(T_, R.x + cw - 28, y + rh * 0.75, F.mono(z, 700), DP.ink, 'right'); };

/** 15 · a big number: o.big ('399', counts up from 0 on o.at when numeric; '76%' too), o.small (a line under), o.kicker,
 *  o.foot (source), o.ground ('dpPink' | 'dpInk'), o.block (the number on an ink block at o.blockAt) */
DP.stat = (o) => {
  DP.sfx(o.sound || 'hit', (o.at || 0) + 0.05, -5);
  return (t, r) => { r = DP.rr(r); const gr = G[o.ground || 'dpPink']; rect(r.x, r.y, r.w, r.h, gr.bg); const m = Math.max(V(64, 48), r.w * 0.06);
    const at = o.at || 0; const num = String(o.big).match(/^([^0-9]*)([0-9][0-9,.]*)(.*)$/);
    let s = o.big; if (num && o.count !== false) { const to = parseFloat(num[2].replace(/,/g, '')); const v = Math.round(to * E.outCubic(prog(t, at, o.countD || 0.9))); s = num[1] + v + num[3]; }
    const fz = V(30, 32), footY = r.y + r.h - m - (o.capRoom || 0); let big = Math.min(V(330, 300), (r.w - 2 * m) / Math.max(2.2, String(o.big).length * 0.62), r.h * 0.42);
    DP.push(t, at, r, () => {
      if (o.kicker) withA(dpE(t, at, 0.4), () => mono(o.kicker, r.x + m, r.y + m + 30, V(30, 32), gr.mid, 'left', { key: 'kicker', maxW: r.w - 2 * m }));
      const smallZ = Math.min(V(60, 58), (r.w - 2 * m) / 12); const yS = o.foot ? footY - fz * 2.2 : footY; const nS = o.small ? Math.ceil(tw(o.small, F.body(smallZ, 700)) / (r.w - 2 * m)) : 0;
      const top = r.y + m + (o.kicker ? V(76, 84) : 0); let yB = (o.small ? yS - nS * smallZ * 1.15 - smallZ * 0.4 : yS) - big * 0.18;
      if (yB - big * 0.86 < top) { big = Math.max(60, (yB + big * 0.18 - top) / 1.04); yB = (o.small ? yS - nS * smallZ * 1.15 - smallZ * 0.4 : yS) - big * 0.18; }
      const p = dpE(t, at, 0.45); withA(clamp(p * 2), () => withT(0, (1 - p) * 30, 1, 0, () => { const ov = ovr('big'); const str = ov.s != null ? ov.s : s; const f = F.disp(big); const w = tw(str, f, -big * 0.03);
        if (o.block) { const q = dpE(t, o.blockAt || at + 0.6, 0.4, 'outExpo'); _txt(str, r.x + m, yB, f, gr.fg, 'left', 'alphabetic', -big * 0.03); if (q > 0) { rect(r.x + m - 12, yB - big * 0.82, (w + 24) * q, big * 1.0, gr === G.dpInk ? DP.pink : DP.ink); clipR(r.x + m - 12, yB - big * 0.82, (w + 24) * q, big, () => _txt(str, r.x + m, yB, f, gr === G.dpInk ? DP.ink : DP.pink, 'left', 'alphabetic', -big * 0.03)); } }
        else _txt(str, r.x + m, yB, f, gr.fg, 'left', 'alphabetic', -big * 0.03);
        regBox(ov, r.x + m, yB - big * 0.8, w, big * 0.95, { text: str, def: o.big }); }));
      if (o.small) withA(dpE(t, at + 0.25, 0.4), () => txtW(o.small, r.x + m, yS - (nS - 1) * smallZ * 1.15, F.body(smallZ, 700), gr.fg, r.w - 2 * m, smallZ * 1.15, -0.01 * smallZ, 'small'));
      if (o.foot) mono(o.foot, r.x + m, footY, fz, gr.mid, 'left', { key: 'foot', maxW: r.w - 2 * m });
    });
  };
};

/** 16 · the 11 tricks as specimen tags: o.on (how many are lit), o.at; lit = ink tag with pink type, the rest outlined */
DP.NAMES = ['Confirmshaming', 'Hard to cancel', 'Sneak into basket', 'Hidden costs', 'Hidden subscription', 'Trick wording', 'Disguised ads', 'Nagging', 'Pre-selection', 'Fake urgency', 'Fake scarcity'];
DP.eleven = (o) => {
  DP.sfx('paper', (o.at || 0) + 0.05, -6);
  return (t, r) => { r = DP.rr(r); rect(r.x, r.y, r.w, r.h, DP.pink); const m = Math.max(V(56, 44), r.w * 0.05); const cols = V(r.w > 1300 ? 3 : 2, 2);
    const cw = (r.w - 2 * m - (cols - 1) * 22) / cols, rh = Math.min(V(96, 92), (r.h - 2 * m - V(120, 130)) / Math.ceil(11 / cols) - 16);
    if (o.title) DP.text(t, 'title', o.title, r.x + m, r.y + m + V(70, 72), V(84, 76), { at: o.at, maxW: r.w - 2 * m, hits: o.titleHits });
    DP.NAMES.forEach((nm, i) => { const c = i % cols, rw = Math.floor(i / cols); const x = r.x + m + c * (cw + 22), y = r.y + m + V(130, 140) + rw * (rh + 16);
      const p = dpE(t, (o.at || 0) + 0.15 + i * 0.07, 0.35); const lit = i < (o.on || 0) || (o.litAt && t >= o.litAt[i]);
      withA(clamp(p * 2), () => { rect(x, y, cw, rh, lit ? DP.ink : DP.soft);
        const z = Math.min(V(34, 32), rh * 0.36); _mono(String(i + 1).padStart(2, '0'), x + 24, y + rh * 0.62, z, lit ? DP.pink : DP.ink, 'left', { w: 600 });
        _txt(nm, x + 24 + z * 2.6, y + rh * 0.64, F.body(Math.min(V(40, 38), rh * 0.42, (cw - z * 3.6) / (nm.length * 0.55)), 700), lit ? DP.white : DP.ink, 'left'); }); });
  };
};

/** 17 · a correction screen (her rule: the edit fixes the recording): CORRECTION block, the right facts typed on, the source */
DP.fix = (o) => {
  DP.sfx('glitch', (o.at || 0) + 0.02, -10); DP.sfx('typeHit', (o.at || 0) + 0.35, -6);
  return (t, r) => { r = DP.rr(r); rect(r.x, r.y, r.w, r.h, DP.pink); const m = Math.max(V(64, 48), r.w * 0.06); const at = o.at || 0;
    const z0 = V(36, 36); withA(dpE(t, at, 0.3), () => { const s = o.head || 'CORRECTION'; const w = monoW(s, z0, { fixed: true }) + z0 * 1.2; rect(r.x + m, r.y + m, w, z0 * 1.9, DP.ink); mono(s, r.x + m + z0 * 0.6, r.y + m + z0 * 1.28, z0, DP.pink, 'left', { key: 'head', fixed: true }); });
    const ov = ovr('fix'); const str = ov.s != null ? ov.s : o.text; const lines = []; const z = o.size || Math.min(V(66, 60), (r.w - 2 * m) / 15); const font = F.disp(z, 800);
    for (const para of str.split('\n')) { let cur = ''; for (const w of para.split(' ')) { const nx = cur ? cur + ' ' + w : w; if (cur && tw(nx, font) > r.w - 2 * m) { lines.push(cur); cur = w; } else cur = nx; } lines.push(cur); }
    const all = lines.join('\n'); const n = Math.floor(clamp((t - at - 0.3) / (o.typeD || 2.6)) * all.length); let used = 0; const lh = z * 1.22; const y0 = r.y + m + z0 * 1.9 + z * 1.6;
    lines.forEach((ln, i) => { const k = clamp(n - used, 0, ln.length); used += ln.length + 1; _txt(ln.slice(0, k), r.x + m, y0 + i * lh, font, DP.ink, 'left'); });
    regBox(ov, r.x + m, y0 - z, r.w - 2 * m, lines.length * lh, { text: str, def: o.text });
    if (o.src) withA(dpE(t, at + (o.typeD || 2.6) + 0.3, 0.4), () => mono(o.src, r.x + m, y0 + lines.length * lh + V(30, 40), V(26, 28), DP.ink, 'left', { key: 'src', maxW: r.w - 2 * m }));
  };
};

