/* phone-distraction · look "B · The Receipt" (her pick, 2026-10-17: "I love the receipt one"). The film's visual kit.
 * One object runs through the film: a till receipt that prints a line for every design trick she explains, itemised against
 * YOUR ATTENTION. Ground: flat electric blue. Photos: real people and objects as halftone print cut-outs with a paper edge
 * (film/assets/receipt/, built by assets/directions-v2/build_receipt.py). Real sources as paper clippings with a soft yellow
 * marker and a small credit. Type: Helvetica Neue (her type) white on blue; receipts in DM Mono ink on paper.
 * Her note (2026-10-17): no yellow-ish yellow anywhere; the marker stays her yellow, softened. Every frame is a pure function of t.
 */
'use strict';

/* ---------- cut-on-content: anything due within 0.35 s after a screen's first frame is already there on that frame ---------- */
let LSTART = -1;
const EMBED = (() => { try { return window.parent !== window; } catch (e) { return true; } })();
const onCut = (at) => (at != null && at >= LSTART - 0.001 && at - LSTART < 0.35 ? LSTART - 0.4 : at);

/* ---------- palette ---------- */
const RC = {
  blue: '#1F3BD6', paper: '#FBF8EE', ink: '#15161A', inkMid: '#5B5C63', rule: '#C9C4B4', mark: '#F1E9A6', white: '#FFFFFF',
  sky: '#AFC0FF', shade: 'rgba(0,0,40,0.30)', red: '#FF3B30', slot: '#10227E', screen: '#FAFAF7', tile: '#D9D6CC', tileD: '#2B2C31',
  gray: '#8A8A8A',
};
// grounds: blue / blueB are the same blue (alternated so two blue screens never whip into each other: our joins are cuts, the
// paper feed and the slip); slip = the punch screen, a full-bleed receipt (no alternative); gray = the grayscale tip
Object.assign(G, {
  blue: { bg: RC.blue, fg: RC.white, mid: RC.sky, line: 'rgba(255,255,255,0.3)', acc: RC.mark, card: RC.paper, panel: RC.paper, grid: 'rgba(255,255,255,0.08)', mode: 'dark', altKey: 'blueL' },
  blueB: { bg: RC.blue, fg: RC.white, mid: RC.sky, line: 'rgba(255,255,255,0.3)', acc: RC.mark, card: RC.paper, panel: RC.paper, grid: 'rgba(255,255,255,0.08)', mode: 'dark', altKey: 'blueLB' },
  slip: { bg: RC.paper, fg: RC.ink, mid: RC.inkMid, line: RC.rule, acc: RC.mark, card: RC.paper, panel: RC.paper, grid: 'rgba(0,0,0,0.06)' },
  gray: { bg: RC.gray, fg: RC.white, mid: '#E2E2E2', line: 'rgba(255,255,255,0.3)', acc: '#E8E8E8', card: RC.paper, panel: RC.paper, grid: 'rgba(255,255,255,0.08)', mode: 'dark', altKey: 'grayL' },
});
// light alternative of a blue screen: warm paper ground, ink type; paper objects, prints and phone screens keep their colours
themeMap('light', 'ground', [[RC.blue, '#E6E1D3'], [RC.gray, '#E6E1D3']]);
themeMap('light', 'mark', [[RC.white, RC.ink], [RC.sky, '#3B4A97'], ['#E2E2E2', '#55565C']]);
themeMap('light', 'surface', [[RC.slot, '#B9B3A2']]);
THEME.text = [RC.white, RC.ink];

/* ---------- type ---------- */
const FT = (w, s) => `${w} ${s}px "Helvetica Neue"`;
const MONO = (s, w = 500) => `${w} ${s}px "DM Mono"`;
const LSD = (s) => -0.035 * s;   // display tracking
/** small label (DM Mono, uppercase, letter-spaced) on the ground */
function lab(s, x, y, o = {}) {
  const size = o.size || V(30, 32);
  txt(o.upper === false ? s : s.toUpperCase(), x, y, MONO(size), o.col || g.fg, o.align || 'left', 'alphabetic', size * 0.08, o.key);
}
/** source credit (DM Mono, sentence case) on the ground; wraps at maxW */
function credit(s, x, y, maxW, o = {}) {
  const size = o.size || V(26, 26);
  return withA(o.a == null ? 0.88 : o.a, () => txtW(s, x, y, MONO(size, 400), o.col || g.fg, maxW || V(900, 920), size * 1.35, 0, o.key));
}

/* ---------- rich text: *w* = soft marker swipe behind the word (the word turns ink), _w_ = underline wipe, ~w~ = muted ---------- */
const _PL = new Map();
function parseRich(str) {
  const out = []; let mode = null;
  for (const part of str.split('\n')) {
    for (let raw of part.split(' ').filter(Boolean)) {
      let m = mode;
      if (!m && /^[*_~]/.test(raw)) { m = raw[0]; raw = raw.slice(1); }
      let close = false; const end = m ? raw.lastIndexOf(m) : -1;
      if (m && end >= 0 && end >= raw.length - 3) { raw = raw.slice(0, end) + raw.slice(end + 1); close = true; }
      out.push({ s: raw, m: m || '', br: false }); mode = m && !close ? m : null;
    }
    if (out.length) out[out.length - 1].br = true;
  }
  if (out.length) out[out.length - 1].br = false;
  return out;
}
function layoutRich(str, font, ls, maxW, lh) {
  const key = str + '|' + font + '|' + ls + '|' + maxW + '|' + lh; if (_PL.has(key)) return _PL.get(key);
  const ws = parseRich(str); setFont(font, ls); const sp = ctx.measureText(' ').width;
  let x = 0, li = 0; const lines = [[]];
  for (const w of ws) {
    w.w = ctx.measureText(w.s).width - (ls > 0 ? ls : 0);
    if (x > 0 && x + w.w > maxW) { li++; x = 0; lines.push([]); }
    w.x = x; w.li = li; lines[li].push(w); x += w.w + sp;
    if (w.br) { li++; x = 0; lines.push([]); }
  }
  const ls_ = lines.filter(l => l.length); const place = (l, k) => { let xx = 0; l.forEach(w => { w.x = xx; w.li = k; xx += w.w + sp; }); return xx - sp; };
  const n_ = ls_.length;
  // no single word alone on the last line
  if (n_ > 1 && ls_[n_ - 1].length === 1 && ls_[n_ - 2].length >= 3 && !ls_[n_ - 2][ls_[n_ - 2].length - 1].br) {
    const mv = ls_[n_ - 2].pop(); ls_[n_ - 1].unshift(mv);
    if (place(ls_[n_ - 1], n_ - 1) > maxW) { ls_[n_ - 1].shift(); ls_[n_ - 2].push(mv); place(ls_[n_ - 1], n_ - 1); }
    place(ls_[n_ - 2], n_ - 2);
  }
  ls_.forEach((l, k) => place(l, k));
  const wMax = Math.max(...ls_.map(l => l.reduce((a_, q) => a_ + q.w, 0) + sp * (l.length - 1)));
  const L_ = { ws, lines: ls_, lh, w: wMax, h: ls_.length * lh, sp };
  _PL.set(key, L_); return L_;
}
/** rich(t, s, o): o = x, y (top), size, weight, maxW, lh, col, align, times (one per word), ev (one per marked word), mode
 *  ('words' | 'drop' | 'type'), key, mono (DM Mono instead of Helvetica) */
function rich(t, s, o) {
  const ov = ovr(o.key || s.replace(/[*_~]/g, '')); const str = ov.s != null ? ov.s : s;
  const size = o.size || 60; const font = o.mono ? MONO(size) : FT(o.weight || 700, size); const ls = o.mono ? 0 : (o.ls != null ? o.ls : LSD(size));
  const lhp = size * (o.lh || 1.04);
  const Lo = layoutRich(str, font, ls, o.maxW || 900, lhp);
  const align = o.align || 'left';
  const bx = align === 'center' ? o.x - Lo.w / 2 : o.x;
  const box = [bx, o.y, Lo.w, Lo.h];
  if (ov.hide) { regBox(ov, ...box, { text: str, def: s }); return Lo; }
  moved(ov, () => {
    let mi = 0; const col = o.col || g.fg;
    const mode = o.mode || 'words'; let t0 = null, cps = 30, nch = 0;
    if (o.times && mode !== 'words') { t0 = onCut(o.times[0] - 0.05); const tot = Lo.ws.reduce((a_, w) => a_ + w.s.length + 1, 0); cps = clamp(tot / Math.max(0.4, o.times[o.times.length - 1] - t0 + 0.25), 16, 45); nch = Math.floor((t - t0) * cps); }
    if (mode === 'drop' && t0 != null && t < t0) return;
    ctx.save();
    if (mode === 'drop' && t0 != null) { const p = MOTION.ease(t, t0, 0.4, 'outExpo'); ctx.globalAlpha *= clamp((t - t0) / 0.18); ctx.translate(0, (1 - p) * 46); }
    let cc = 0, prevT = null;
    Lo.ws.forEach((w, i) => {
      const ln = Lo.lines[w.li]; const lw = ln.reduce((a, q) => a + q.w, 0) + Lo.sp * (ln.length - 1);
      const X = (align === 'center' ? o.x - lw / 2 : align === 'right' ? o.x - lw : o.x) + w.x, Y = o.y + w.li * lhp + size * 0.84;
      let tw_ = o.times && mode === 'words' ? onCut(o.times[Math.min(i, o.times.length - 1)]) : null;
      if (tw_ != null && prevT != null && tw_ > prevT + 0.45) tw_ = prevT + 0.45; if (tw_ != null) prevT = tw_;
      let a = 1, dy = 0, bl = 0, shown = w.s;
      if (mode === 'type' && t0 != null) { const k = nch - cc; cc += w.s.length + 1; if (k <= 0) { if (w.m) mi++; return; } shown = w.s.slice(0, k); }
      if (tw_ != null) { const p = prog(t, tw_ - 0.04, 0.32); if (p <= 0) { if (w.m) mi++; return; } a = clamp(p * 2.2); dy = size * 0.16 * (1 - MOTION.EASE.outExpo(p)); bl = p < 0.5 ? 5 * (1 - 2 * p) : 0; }
      const et = w.m ? (o.ev && o.ev[mi] != null ? o.ev[mi] : o.ev && o.ev.length ? o.ev[o.ev.length - 1] + 0.12 * (mi - o.ev.length + 1) : (tw_ != null ? tw_ + 0.1 : (o.times ? o.times[Math.min(i, o.times.length - 1)] : (o.at || 0)))) : 0;
      let fill = col;
      if (w.m === '~') fill = o.mid || g.mid;
      if (w.m === '*') {   // the soft marker swipes behind the word on its event; the word turns ink once covered
        const q = MOTION.ease(t, et, 0.3, 'outQuint');
        if (q > 0) { ctx.save(); ctx.globalAlpha *= a; themeFixed(() => rect(X - size * 0.09, Y - size * 0.8 + dy, (w.w + size * 0.18) * q, size * 1.0, RC.mark)); ctx.restore(); }
        if (q > 0.5) fill = RC.ink;
      }
      if (w.m) mi++;
      ctx.save(); ctx.globalAlpha *= a; if (bl > 0.4) ctx.filter = `blur(${bl.toFixed(1)}px)`;
      if (fill === RC.ink) themeFixed(() => _txt(shown, X, Y + dy, font, fill, 'left', 'alphabetic', ls)); else _txt(shown, X, Y + dy, font, fill, 'left', 'alphabetic', ls);
      ctx.restore();
      if (w.m === '_') { const p = MOTION.ease(t, et, 0.38, 'outExpo'); if (p > 0) { ctx.save(); ctx.globalAlpha *= a; rect(X, Y + size * 0.12, (w.w - (/[.,!?:;]$/.test(w.s) ? size * 0.25 : 0)) * p, Math.max(4, size * 0.07), o.ul || col); ctx.restore(); } }
    });
    regBox(ov, ...box, { text: str, def: s, markup: true });
    ctx.restore();
  });
  return Lo;
}
function richH(s, o) { const e = EDIT.data.t[SCENE_ID + '/' + keyOf(o.key || s.replace(/[*_~]/g, ''))]; const str = e && e.s != null ? e.s : s; const size = o.size || 60;
  return layoutRich(str, o.mono ? MONO(size) : FT(o.weight || 700, size), o.mono ? 0 : LSD(size), o.maxW || 900, size * (o.lh || 1.04)); }

/** her keyword stack, as the film's headline: a small line, then the big words (both land on her spoken times). Returns the
 *  bottom y. o: x, y, maxW, small (size), size (big), t1 / t2 (times), ev (marker times on the big line), mode, align, col */
function stack(t, s1, s2, o) {
  const x = o.x == null ? V(110, 70) : o.x, y = o.y == null ? V(110, SAFE.contentTop + 10) : o.y, maxW = o.maxW || V(900, 940);
  const ss = o.small || V(54, 52), bs = o.size || V(132, 118);
  let yy = y;
  if (s1) { const L1 = rich(t, s1, { x, y: yy, size: ss, weight: 700, lh: 1.08, maxW, times: o.t1, mode: o.mode1 || 'words', col: o.col1 || o.col, align: o.align, key: o.key1 }); yy += L1.h + ss * 0.18; }
  if (s2) { const L2 = rich(t, s2, { x, y: yy, size: bs, weight: 700, lh: 0.98, maxW, times: o.t2, ev: o.ev, mode: o.mode || 'words', col: o.col, align: o.align, key: o.key2 }); yy += L2.h; }
  return yy;
}

/* ---------- paper ---------- */
/** a drop shadow under paper (soft, offset down: paper lying on the blue) */
function paperShadow(fn, k = 1) { ctx.save(); ctx.shadowColor = RC.shade; ctx.shadowBlur = 34 * k; ctx.shadowOffsetY = 16 * k; fn(); ctx.restore(); }
/** zig-zag torn bottom edge path from (x, y) across w */
function zigPath(x, y, w, h, tooth = 22, depth = 12, top = false) {
  const n = Math.max(2, Math.round(w / tooth));
  ctx.beginPath(); ctx.moveTo(x, top ? y + depth : y); ctx.lineTo(x + w, top ? y + depth : y); ctx.lineTo(x + w, y + h - depth);
  for (let i = n; i >= 0; i--) ctx.lineTo(x + (i / n) * w, y + h - (i % 2 ? 0 : depth));
  ctx.closePath();
}
/** a soft yellow marker block that wipes in left to right */
function markRect(t, x, y, w, h, at, d = 0.42) { const q = MOTION.ease(t, at, d, 'outQuint'); if (q > 0) themeFixed(() => { ctx.save(); ctx.globalCompositeOperation = 'multiply'; rect(x, y, w * q, h, RC.mark); ctx.restore(); }); return q; }

/** receipt(t, key, x, y, w, rows, o): a till receipt that prints row by row. rows: {l, r, at, big, small, center, rule, hl (marker
 *  time), strike (time), gap}. o: at (paper appears), fs (font size), slot (draw the printer slot at y), tear (time it tears off
 *  and lifts away), gone, head (a header row printed first, centred big), rot (deg). The paper grows down as rows print. */
function receipt(t, key, x, y, w, rows, o = {}) {
  const fs = o.fs || V(32, 30), pad = fs * 1.25; let yy = pad * 0.9; const items = [];
  const t0 = onCut(o.at != null ? o.at : (rows[0] && rows[0].at != null ? rows[0].at - 0.15 : 0));
  rows.forEach((r) => {
    if (r.rule) { items.push({ ...r, y: yy, h: fs * 0.9 }); yy += fs * 0.9; return; }
    const sz = r.big ? fs * 1.5 : r.small ? fs * 0.9 : fs; const h = sz * 1.32;
    items.push({ ...r, y: yy, h, sz }); yy += h + (r.gap != null ? r.gap : fs * 0.22);
  });
  const total = yy + pad * 0.7;
  if (t < t0) return { h: total };
  // fed length: the bottom of the last row due so far (0.14 s feed per row, outQuint), plus the margin
  let fed = pad * 0.9;
  items.forEach((it, i) => { const at = onCut(it.at != null ? it.at : t0); const q = MOTION.ease(t, at, 0.16, 'outQuint'); const bot = (i + 1 < items.length ? items[i + 1].y : total); if (q > 0) fed = Math.max(fed, lerp(it.y, bot, q)); });
  if (o.full) fed = total;
  const h = Math.min(total, fed + (fed >= total - 1 ? 0 : pad * 0.4));
  let a = clamp((t - t0) / 0.12); if (o.gone != null) a *= 1 - clamp((t - o.gone) / 0.25);
  if (a <= 0) return { h };
  // tear: lifts up and away (0.7 s inOutQuart) with a small rotation
  let ty = 0, tr = 0; if (o.tear != null) { const q = MOTION.ease(t, o.tear, 0.75, 'inOutQuart'); ty = -q * (y + h + 200); tr = q * (o.tearRot || 4) * Math.PI / 180; }
  withA(a, () => grp(key, x, y, w, h, () => themeFixed(() => {
    ctx.save();
    if (o.rot || tr) { ctx.translate(x + w / 2, y); ctx.rotate((o.rot || 0) * Math.PI / 180 + tr); ctx.translate(-x - w / 2, -y); }
    ctx.translate(0, ty);
    paperShadow(() => { ctx.fillStyle = RC.paper; zigPath(x, y, w, h + 12, 22, 12); ctx.fill(); }, 0.8);
    ctx.save(); zigPath(x, y, w, h + 12, 22, 12); ctx.clip();
    items.forEach((it) => {
      if (it.y + (it.h || 0) * 0.6 > fed) return;
      const iy = y + it.y;
      if (it.rule) { ctx.save(); ctx.setLineDash([8, 7]); ctx.strokeStyle = RC.ink; ctx.globalAlpha *= 0.5; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(x + pad, iy + it.h / 2); ctx.lineTo(x + w - pad, iy + it.h / 2); ctx.stroke(); ctx.restore(); return; }
      const font = MONO(it.sz, it.big ? 500 : 500); const by = iy + it.sz * 1.0;
      if (it.hl != null) markRect(t, x + pad - 10, iy + 2, w - 2 * pad + 20, it.h - 4, it.hl);
      const col = it.col || RC.ink;
      const L = String(it.l).toUpperCase(), R = it.r != null ? String(it.r).toUpperCase() : null;
      if (it.center) txt(L, x + w / 2, by, font, col, 'center', 'alphabetic', 0.5, key + '/' + it.l);
      else { txt(L, x + pad, by, font, col, 'left', 'alphabetic', 0.5, key + '/' + it.l); if (R != null) txt(R, x + w - pad, by, font, col, 'right', 'alphabetic', 0.5, key + '/' + it.l + '/r'); }
      if (it.strike != null) { const q = MOTION.ease(t, it.strike, 0.35, 'outQuint'); if (q > 0) rect(x + pad - 6, iy + it.h * 0.5, (w - 2 * pad + 12) * q, Math.max(3, it.sz * 0.1), col); }
    });
    ctx.restore();
    ctx.restore();
  })));
  // every receipt prints out of a slot: the frame's top edge, or a printer slot bar drawn where it starts
  if (o.slot !== false && y > 4) themeFixed(() => fillRR(x - 30, y - 14, w + 60, 22, 11, RC.slot));
  return { h, total };
}

/** clip(t, key, imgKey, [sx, sy, sw, sh], x, y, w, o): a real source as a paper clipping (white paper border, tilted, drops in).
 *  o: at, rot (deg), pad, hl: [[x, y, w, h (source px), time]...], credit (text, under it), creditW, zoom {at, d, k, cx, cy}, gone */
function clip(t, key, imgKey, crop, x, y, w, o = {}) {
  const im = IMG[imgKey]; if (!im) return null;
  const at = onCut(o.at || 0); if (t < at) return null;
  const [sx, sy, sw, sh] = crop; const pad = o.pad == null ? 18 : o.pad; const iw = w - 2 * pad, sc = iw / sw, ih = sh * sc, h = ih + 2 * pad;
  const p = MOTION.ease(t, at, 0.5, 'outQuint'); let a = clamp((t - at) / 0.16); if (o.gone != null) a *= 1 - clamp((t - o.gone) / 0.25);
  const rot = ((o.rot || 0) + (1 - p) * (o.rot0 == null ? 3 : o.rot0)) * Math.PI / 180, dy = (1 - p) * (o.from == null ? 70 : o.from);
  withA(a, () => grp(key, x, y, w, h, () => themeFixed(() => {
    ctx.save(); ctx.translate(x + w / 2, y + h / 2 + dy); ctx.rotate(rot); ctx.translate(-x - w / 2, -y - h / 2);
    paperShadow(() => rect(x, y, w, h, '#FFFFFF'));
    ctx.save(); ctx.beginPath(); ctx.rect(x + pad, y + pad, iw, ih); ctx.clip();
    let zk = 1;
    if (o.zoom) { const z = o.zoom; const e = MOTION.ease(t, z.at, z.d || 0.9, 'inOutQuart'); zk = 1 + (z.k - 1) * e; const fx = x + pad + (z.cx - sx) * sc, fy = y + pad + (z.cy - sy) * sc;
      const tx = lerp(0, x + pad + iw / 2 - fx, e), ty_ = lerp(0, y + pad + ih / 2 - fy, e); ctx.translate(fx + tx, fy + ty_); ctx.scale(zk, zk); ctx.translate(-fx, -fy); }
    if (o.gray) ctx.filter = 'grayscale(1) contrast(1.15)';
    ctx.drawImage(im, sx, sy, sw, sh, x + pad, y + pad, iw, ih); ctx.filter = 'none';
    (o.hl || []).forEach(([hx, hy, hw, hh, ht]) => markRect(t, x + pad + (hx - sx) * sc - 4, y + pad + (hy - sy) * sc, hw * sc + 8, hh * sc, ht));
    ctx.restore(); ctx.restore();
  }), { img: true }));
  if (o.credit) credit(o.credit, x, y + h + V(40, 44), o.creditW || Math.max(w, V(700, 900)), { key: key + ' credit' });
  return { h, ix: x + pad, iy: y + pad, sc };
}

/** prt(t, key, imgKey, x, y, h, o): a halftone print cut-out (paper edge, lies on the blue). o: at, from [dx, dy], rot (deg),
 *  rot0, screen(sx, sy, sw, sh) draws the phone screen (prints with a screen rect in SCREENS), dy (extra y, e.g. a lift),
 *  credit {s, x, y, w}, gone, k (scale), shadow (false: none) */
const SCREENS = { ht_hand: [376, 111, 342, 606], ht_hand2: [238, 151, 448, 800], ht_tvlegs: [100, 62, 555, 415, 60], ht_tv: [345, 105, 640, 600, 110] };
function prt(t, key, imgKey, x, y, h, o = {}) {
  const im = IMG[imgKey]; if (!im) return null;
  const at = onCut(o.at == null ? -1e9 : o.at); if (t < at) return null;
  const w = h * im.width / im.height; const p = MOTION.ease(t, at, o.d || 0.55, 'outQuint');
  const [fx, fy] = o.from || [0, 80]; let a = clamp((t - at) / 0.14); if (o.gone != null) a *= 1 - clamp((t - o.gone) / 0.3);
  const X = x + (1 - p) * fx, Y = y + (1 - p) * fy + (o.dy || 0), rot = ((o.rot || 0) + (1 - p) * (o.rot0 || 0)) * Math.PI / 180;
  withA(a, () => grp(key, x, y, w, h, () => themeFixed(() => {
    ctx.save(); ctx.translate(X + w / 2, Y + h / 2); ctx.rotate(rot); if (o.k && o.k !== 1) ctx.scale(o.k, o.k); ctx.translate(-X - w / 2, -Y - h / 2);
    if (o.shadow === false) ctx.drawImage(im, X, Y, w, h); else paperShadow(() => ctx.drawImage(im, X, Y, w, h), 0.7);
    const sr = SCREENS[imgKey];
    if (sr && o.screen) { const k = h / im.height; const sx = X + sr[0] * k, sy = Y + sr[1] * k, sw = sr[2] * k, sh = sr[3] * k;
      ctx.save(); if (sr[4]) rr(sx, sy, sw, sh, sr[4] * k); else { ctx.beginPath(); ctx.rect(sx, sy, sw, sh); } ctx.clip(); if (o.screenBg !== false) rect(sx, sy, sw, sh, o.screenBg || RC.screen); o.screen(sx, sy, sw, sh); ctx.restore(); }
    ctx.restore();
  }), { img: true }));
  if (o.credit) credit(o.credit.s, o.credit.x == null ? x : o.credit.x, o.credit.y == null ? y + h + V(36, 40) : o.credit.y, o.credit.w || V(700, 900), { key: key + ' credit' });
  // o.cr: a credit placed by itself, 34 px under the print (or 14 px above it when there is no room below), as wide as the print
  if (o.cr) { const size = V(26, 26), lim = V(952, 1470), cw = Math.max(w, V(380, 420)); const nl = Math.ceil(tw(o.cr, MONO(size, 400)) / cw + 0.001);
    const below = y + h + 34 + size * 0.8; const cy = below + (nl - 1) * size * 1.35 <= lim ? below : y - 14 - (nl - 1) * size * 1.35;
    withA(a * 0.9, () => txtW(o.cr, o.crx == null ? x : o.crx, cy, MONO(size, 400), g.fg, cw, size * 1.35, 0, key + ' credit')); }
  return { w, h, x: X, y: Y };
}
/** screen geometry of a print (for drawing on the screen from outside prt): [sx, sy, sw, sh] at print h placed at x, y */
function scr(imgKey, x, y, h) { const im = IMG[imgKey], sr = SCREENS[imgKey]; const k = h / im.height; return [x + sr[0] * k, y + sr[1] * k, sr[2] * k, sr[3] * k]; }

/** slip(t, key, x, y, w, h, at, fn, o): a plain paper piece (note, ticket, button card) that drops in; fn(yy, p) draws inside */
function slip(t, key, x, y, w, h, at, fn, o = {}) {
  at = onCut(at); if (t < at) return;
  const p = MOTION.ease(t, at, 0.45, 'outQuint'); let a = clamp((t - at) / 0.14); if (o.gone != null) a *= 1 - clamp((t - o.gone) / 0.25);
  const yy = y + (1 - p) * (o.from == null ? 50 : o.from); const rot = ((o.rot || 0) + (1 - p) * (o.rot0 == null ? 2 : o.rot0)) * Math.PI / 180;
  withA(a, () => grp(key, x, yy, w, h, () => themeFixed(() => {
    ctx.save(); ctx.translate(x + w / 2, yy + h / 2); ctx.rotate(rot); if (o.k) ctx.scale(o.k, o.k); ctx.translate(-x - w / 2, -yy - h / 2);
    paperShadow(() => { if (o.zig) { ctx.fillStyle = o.col || RC.paper; zigPath(x, yy, w, h, 22, 12); ctx.fill(); } else fillRR(x, yy, w, h, o.r == null ? 6 : o.r, o.col || RC.paper); }, o.sh || 0.7);
    fn(yy, p);
    ctx.restore();
  })));
}
/** a rubber stamp: ink outline box with mono text, thumped on (scale 1.35 -> 1, 0.22 s), tilted */
function stamp(t, s, x, y, at, o = {}) {
  at = onCut(at); if (t < at) return; const size = o.size || V(40, 40); const font = MONO(size, 500);
  const w = tw(s.toUpperCase(), font, size * 0.12) + size * 1.1, h = size * 1.7; const q = MOTION.ease(t, at, 0.22, 'outQuint'); const k = lerp(1.35, 1, q);
  const col = o.col || (o.onPaper ? RC.ink : g.fg);
  withA(clamp((t - at) / 0.08) * (o.a || 0.92), () => grp(o.key || ('stamp ' + s), x, y, w, h, () => {
    ctx.save(); ctx.translate(x + w / 2, y + h / 2); ctx.rotate((o.rot == null ? -6 : o.rot) * Math.PI / 180); ctx.scale(k, k); ctx.translate(-x - w / 2, -y - h / 2);
    const draw = () => { strokeRR(x, y, w, h, 8, col, Math.max(4, size * 0.12)); txt(s.toUpperCase(), x + w / 2, y + h * 0.66, font, col, 'center', 'alphabetic', size * 0.12, o.key || s); };
    if (o.onPaper) themeFixed(draw); else draw();
    ctx.restore();
  }));
}

/* ---------- phone screen UI (drawn on a print's blank screen: ink on paper, red badges only) ---------- */
function uiClock(sx, sy, sw, sh, s, o = {}) { _txt(s, sx + sw / 2, sy + sh * (o.y || 0.3), FT(300, sw * (o.k || 0.3)), RC.ink, 'center', 'alphabetic', -sw * 0.01); if (o.sub) _txt(o.sub, sx + sw / 2, sy + sh * (o.y || 0.3) + sw * 0.1, MONO(sw * 0.055), RC.inkMid, 'center'); }
/** a red notification badge centred at (cx, cy), scaled by k, spring s */
function badge(cx, cy, label, k = 1, s = 1, col = RC.red) {
  const str = String(label); const fs = 32 * k; const font = FT(700, fs); const w = Math.max(56 * k, tw(str, font) + 28 * k), h = 56 * k;
  ctx.save(); ctx.translate(cx, cy); ctx.scale(s, s); themeFixed(() => { fillRR(-w / 2, -h / 2, w, h, h / 2, col); _txt(str, 0, fs * 0.36, font, '#FFFFFF', 'center'); }); ctx.restore();
}
/** a feed of generic posts (ink blocks), scrolled by off px; o.ad(i) marks Sponsored, o.like(i, x, y) */
function uiFeed(sx, sy, sw, sh, off, o = {}) {
  const ph = o.ph || sw * 0.92; const pad = sw * 0.06; const i0 = Math.floor(off / ph);
  for (let i = i0; i < i0 + Math.ceil(sh / ph) + 2; i++) {
    const y = sy + (o.top || 0) + i * ph - off; if (y > sy + sh) break;
    circle(sx + pad + sw * 0.05, y + pad + sw * 0.05, sw * 0.05, RC.tileD);
    rect(sx + pad + sw * 0.14, y + pad + sw * 0.03, sw * 0.36, Math.max(5, sw * 0.03), RC.tileD);
    fillRR(sx + pad, y + pad + sw * 0.14, sw - 2 * pad, ph * 0.6, sw * 0.03, (i % 3 === 1) ? '#B9B4A6' : RC.tile);
    if (o.ad && o.ad(i)) _txt('Sponsored', sx + pad + sw * 0.14, y + pad + sw * 0.12, FT(700, Math.max(14, sw * 0.055)), RC.ink);
    if (o.like) o.like(i, sx + pad, y + pad + sw * 0.14 + ph * 0.6 + sw * 0.07);
  }
}
/** a grid of generic app squares with optional red badges: o = {cols, n, pad, badges: {i: [val, at] | val}, cols_ (fills), pop} */
function uiGrid(t, sx, sy, sw, sh, o = {}) {
  const cols = o.cols || 3, n = o.n || 12; const gap = sw * 0.07; const s = (sw - gap * (cols + 1)) / cols; const out = [];
  for (let i = 0; i < n; i++) {
    const x = sx + gap + (i % cols) * (s + gap), y = sy + (o.top == null ? sh * 0.1 : o.top) + Math.floor(i / cols) * (s + gap * 1.3);
    const st = o.pop != null ? MOTION.spring(t - o.pop - i * 0.03, 0.7, 2.6) : 1; out.push({ x, y, s });
    if (st <= 0.001) continue;
    ctx.save(); ctx.translate(x + s / 2, y + s / 2); ctx.scale(st, st); ctx.translate(-x - s / 2, -y - s / 2);
    fillRR(x, y, s, s, s * 0.24, (o.fills || [RC.tileD, '#55565C', '#3A3B41', '#77787E'])[i % (o.fills || [0, 0, 0, 0]).length]);
    const b = o.badges && o.badges[i];
    if (b != null) { const [val, at] = Array.isArray(b) ? b : [b, null]; const bs = at == null ? 1 : MOTION.spring(t - at, 0.42, 2.6); if (bs > 0.01) badge(x + s - s * 0.04, y + s * 0.04, typeof val === 'function' ? val(t) : val, s / 150, bs, o.badgeCol); }
    ctx.restore();
  }
  return out;
}
/** an ink toggle (on 0..1) at x, y with height h */
function uiToggle(x, y, h, on) { const w = h * 1.66; fillRR(x, y, w, h, h / 2, on > 0.5 ? RC.ink : '#C4C0B4'); circle(x + h / 2 + (w - h) * on, y + h / 2, h / 2 - h * 0.09, RC.paper); }
/** a heart at x, y, size s */
function heart(x, y, s, col, fill = true, lw = 4) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s / 100, s / 100); ctx.beginPath();
  ctx.moveTo(0, 30); ctx.bezierCurveTo(-60, -10, -45, -60, 0, -32); ctx.bezierCurveTo(45, -60, 60, -10, 0, 30); ctx.closePath();
  if (fill) { ctx.fillStyle = col; ctx.fill(); } else { ctx.strokeStyle = col; ctx.lineWidth = lw * 100 / s; ctx.stroke(); }
  ctx.restore();
}
/** the 12-tick pull-to-refresh spinner */
function spinner(cx, cy, r, fill, spin, col = RC.ink) {
  for (let i = 0; i < 12; i++) { if (i >= Math.round(fill * 12)) continue; const a = 0.35 + 0.65 * (((i - spin * 12) % 12 + 12) % 12) / 12;
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(i * Math.PI / 6); ctx.globalAlpha *= a; fillRR(-r * 0.09, -r, r * 0.18, r * 0.55, r * 0.09, col); ctx.restore(); }
}
/** a tap ripple at x, y from t0 */
function tap(t, t0, x, y, col = RC.ink, r0 = 18) {
  const q = clamp((t - t0) / 0.5); if (q <= 0 || q >= 1) return;
  themeFixed(() => { ctx.save(); ctx.globalAlpha *= (1 - q) * 0.9; ctx.strokeStyle = col; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(x, y, r0 + 50 * MOTION.EASE.outQuint(q), 0, Math.PI * 2); ctx.stroke(); ctx.restore();
    if (q < 0.35) withA(0.7 * (1 - q / 0.35), () => circle(x, y, r0 + 6, col)); });
}

/* ---------- scene wrapper ---------- */
let _ALT = 0;
/** addR(start, draw, o): o = {id, ground ('blue' alternates blue / blueB; 'slip', 'gray'), feed (the screen arrives by a paper
 *  feed: everything slides down from the top 0.45 s, a print sound), push (slow push, default 0.012), anchor () => [x, y]} */
function addR(start, draw, o = {}) {
  let me = null; const ground = !o.ground || o.ground === 'blue' ? (_ALT++ % 2 ? 'blueB' : 'blue') : o.ground;
  const wrapped = (t, lt) => {
    if (!me) me = SCENES.find(s => s.draw === wrapped);
    LSTART = me.start;
    const end = sceneEnd(me.n - 1); const dur = Math.max(0.5, end - me.start); const next = SCENES[me.n]; const nb = next && next.lo;
    // inside a talking-head page (a hidden frame) in 9:16: scale 0.86 around y 1100 (clear of a short's top label and captions)
    if (EMBED && PORTRAIT) { ctx.translate(CX, 1100); ctx.scale(0.86, 0.86); ctx.translate(-CX, -1100); }
    ctx.save();
    if (o.feed) { const q = MOTION.ease(t, me.start, 0.45, 'outQuint'); if (q < 1) ctx.translate(0, -(1 - q) * V(260, 380)); }
    const push = o.push == null ? 0.012 : o.push; if (push || typeof HOLDS === 'object') { const an = o.anchor ? o.anchor() : [CX, H * 0.45]; let k = 1 + push * MOTION.EASE.inOutQuart(clamp(lt / dur));
      if (typeof HOLDS === 'object') for (const [h0, h1] of HOLDS) if (h0 >= me.start - 0.01 && h0 < end) { const mid = (h0 + h1) / 2; k *= 1 + 0.05 * MOTION.ease(t, mid - 0.35, 0.7, 'outQuint'); }
      ctx.translate(an[0], an[1]); ctx.scale(k, k); ctx.translate(-an[0], -an[1]); }
    draw(t, lt, dur);
    ctx.restore();
    // out to a slip (punch) screen: a sheet of receipt paper feeds down over this screen (0.45 s), torn edge leading
    if (nb && nb.ground === 'slip') { const bt = end - 0.45; const q = MOTION.ease(t, bt, 0.45, 'inOutQuart'); if (q > 0) themeFixed(() => { const hh = q * (H + 40); ctx.fillStyle = RC.paper; zigPath(0, -40, W, hh + 40, 30, 16); ctx.fill(); }); }
  };
  addScene(start, ground, o.label || 'receipt', wrapped, o);
  SCENES[SCENES.length - 1].lo = { ...o, ground };
  if (o.feed) sfx('print', start + 0.02, -2);
  if (o.ground === 'slip') sfx('tear', start - 0.3, 0);
}

/* ---------- phrases ---------- */
function WAT(word, after) { const k = norm(word); const w = WORDS.find(x => x.t >= after - 1e-6 && x.n === k); if (!w) throw new Error(`WAT: "${word}" after ${after}`); return w.t; }
function PH(q, o) {
  const ph = P(q, o); const ws = WORDS.slice(ph.i, ph.i + ph.w.length).map(x => x.n);
  ph.at = (word, n = 1) => { const k = norm(word); let c = 0; for (let i = 0; i < ws.length; i++) if (ws[i] === k && ++c === n) return ph.w[i]; throw new Error(`word "${word}" not in phrase "${q}"`); };
  ph.end = ph.e; return ph;
}
/** times for display words from a spoken phrase (same word = its own time, in order; the rest interpolated) */
function TW(ph, s) {
  const dw = parseRich(s).map(w => norm(w.s.replace(/[“”"’]/g, m => (m === '’' ? "'" : ''))));
  const sw = WORDS.slice(ph.i, ph.i + ph.w.length).map(x => x.n);
  const out = new Array(dw.length).fill(null); let j = 0;
  dw.forEach((w, i) => { for (let k = j; k < sw.length; k++) if (sw[k] === w) { out[i] = ph.w[k]; j = k + 1; break; } });
  for (let i = 0; i < out.length; i++) if (out[i] == null) {
    let a = i - 1; while (a >= 0 && out[a] == null) a--; let b = i + 1; while (b < out.length && out[b] == null) b++;
    const ta = a >= 0 ? out[a] : ph.t, tb = b < out.length ? out[b] : Math.min(ph.e, (a >= 0 ? out[a] : ph.t) + 0.6);
    out[i] = lerp(ta, tb, (i - a) / (b - a));
  }
  return out;
}

/* ---------- sound vocabulary (film.json audio.sfx.roles) ---------- */
const sPrint = (t, db = 0) => sfx('print', t, db);     // a receipt row prints
const sBell = (t, db = 0) => sfx('bell', t, db);       // a total lands
const sTear = (t, db = 0) => sfx('tear', t, db);       // paper tears
const sPaper = (t, db = 0) => sfx('paper', t, db);     // a print / slip lands on the desk
const sStamp = (t, db = 0) => sfx('stamp', t, db);     // a rubber stamp
const sPop = (t, db = 0) => sfx('pop', t - 0.04, db);  // a badge pops
const sTick = (t, db = 0) => sfx('tick', t, db);       // a tap, a toggle
const sMark = (t, db = 0) => sfx('mark', t, db);       // the marker swipe
const sShut = (t, db = 0) => sfx('shutter', t, db);    // a real source lands
const sHit = (t, db = 0) => sfx('hit', t, db);         // a strong claim
const sCash = (t, db = 0) => sfx('cash', t, db);       // money
const sSwipe = (t, db = 0) => sfx('swipe', t, db);     // (rare: at most 1 in 6)
const sRefresh = (t, db = 0) => sfx('refresh', t, db); // pull-to-refresh lands
const sNotify = (t, db = 0) => sfx('notify', t, db);   // a notification
const sErr = (t, db = 0) => sfx('error', t, db);
const sClock = (t, db = 0) => sfx('clock', t, db);
const sTape = (t, db = 0) => sfx('tape', t, db);
Object.assign(SFX_PRI, { tear: 8, hit: 7, stamp: 6, shutter: 6, bell: 5, print: 3, paper: 4, notify: 4, cash: 4, clock: 4, pop: 3, mark: 3, tick: 2, swipe: 4, refresh: 5, error: 4, tape: 4, type: 3 });
Object.assign(SFX_GAP, { tear: 0.3, hit: 0.5, stamp: 0.6, shutter: 1.5, bell: 1.5, print: 0.22, paper: 0.8, notify: 1.5, cash: 3.0, clock: 1.5, pop: 0.5, mark: 1.2, tick: 0.5, swipe: 4.0, refresh: 0.5, error: 3.0, tape: 3.0, type: 2.0 });
