/* phone-distraction · look "A · Lock screen" (approved 2026-10-13). The film's visual kit: palette, grounds + light / dark
 * tables, Inter Tight type, and the lock-screen components (notification banners with per-word underline / red events,
 * the big clock, the home grid with red badges, the pull-to-refresh spinner, source sheets for the real documents).
 * Scene wrapper addL(): slow push, the pull-to-refresh transition (the screen is dragged down, a 12-tick spinner holds,
 * the new screen springs back up), the red-badge burst (a badge grows to fill the frame and becomes a red punch screen).
 * Numbers from film/stills/directions/README.md (look A). Every frame is a pure function of t.
 */
'use strict';

/* ---------- font: Inter Tight, loaded by the film itself (see projects/ENGINE-REQUESTS.md) ---------- */
const IT_FACE = (() => {
  if (typeof FontFace === 'undefined') return null;
  if (document.fonts.check('600 40px "Inter Tight"') && [...document.fonts].some(f => f.family.replace(/"/g, '') === 'Inter Tight' && f.status === 'loaded')) return null;
  const f = new FontFace('Inter Tight', `url(/p/${FILM.slug}/film/assets/fonts/InterTight.ttf)`, { weight: '100 900' });
  document.fonts.add(f); f.load().catch(e => console.error('Inter Tight', e));
  return f;
})();
// hold the render host's READY until the face is loaded (film.html sets READY after bootFilm returns)
(() => {
  if (!IT_FACE) return; let ready = false, want = false;
  IT_FACE.loaded.then(() => { _PL.clear(); ready = true; try { dispatchEvent(new Event('resize')); } catch (e) {} });
  try { Object.defineProperty(window, 'READY', { configurable: true, get: () => want && ready, set: (v) => { want = !!v; } }); } catch (e) {}
})();

/* ---------- cut-on-content: anything due within 0.35 s after a screen's first frame is already there on that frame ---------- */
let LSTART = -1;
const EMBED = (() => { try { return window.parent !== window; } catch (e) { return true; } })();
const onCut = (at) => (at != null && at >= LSTART - 0.001 && at - LSTART < 3.2 ? LSTART - 0.4 : at);   // a screen opens with its first elements on (critic: nothing empty after a cut)

/* ---------- palette ---------- */
const PD = {
  ink: '#0C0D10', card: '#1D1F25', cardOld: '#191B20', gap: '#17191E', text: '#F4F1EA', muted: '#8B8D94', lab: '#6E7078',
  red: '#FF4433', blue: '#3B6FE0', tileLab: '#C9C7C0', tiles: ['#2C2F36', '#363A42', '#2A2D33', '#40444D'], line: '#2A2C33',
  gray: '#D6D5D1', grayTxt: '#1A1A1A', grayMid: '#55565A', grayTiles: ['#B9B8B4', '#A9A8A4', '#C4C3BF', '#9E9D99'],
  sheet: '#FFFFFF', sheetInk: '#151515', onRed: '#FFF6F2',
};
// grounds: lock / lockB are the same ink (alternated so the engine never whips between two lock screens: our joins are cuts,
// pulls and bursts); gray = the grayscale home; red = the badge-burst punch screen (no alternative, like the house blue)
Object.assign(G, {
  lock: { bg: PD.ink, fg: PD.text, mid: PD.muted, line: PD.line, acc: PD.red, card: PD.card, panel: PD.card, grid: 'rgba(244,241,234,0.08)', mode: 'dark', altKey: 'lockL' },
  lockB: { bg: PD.ink, fg: PD.text, mid: PD.muted, line: PD.line, acc: PD.red, card: PD.card, panel: PD.card, grid: 'rgba(244,241,234,0.08)', mode: 'dark', altKey: 'lockLB' },
  gray: { bg: PD.gray, fg: PD.grayTxt, mid: PD.grayMid, line: '#B5B4B0', acc: '#3A3A3A', card: '#E6E5E1', panel: '#E6E5E1', grid: 'rgba(0,0,0,0.08)', mode: 'light', altKey: 'grayD' },
  red: { bg: PD.red, fg: PD.onRed, mid: 'rgba(255,246,242,0.78)', line: 'rgba(255,246,242,0.35)', acc: PD.onRed, card: PD.card, panel: PD.card, grid: 'rgba(255,255,255,0.2)' },
});
// light alternative of a lock screen: paper-white phone. Cards white with a hairline, ink text, the same red (a touch deeper)
themeMap('light', 'ground', [[PD.ink, '#ECEAE5']]);
themeMap('light', 'surface', [[PD.card, '#FFFFFF'], [PD.cardOld, '#F6F5F2'], [PD.gap, '#DCDAD4'], [PD.ink, '#ECEAE5'],
  [PD.tiles[0], '#CFCDC8'], [PD.tiles[1], '#C2C0BA'], [PD.tiles[2], '#D7D5D0'], [PD.tiles[3], '#B8B6B0'], [PD.line, '#D3D1CB'], ['#26292F', '#E2E0DB']]);
themeMap('light', 'mark', [[PD.text, '#111114'], [PD.muted, '#5C5E66'], [PD.lab, '#66686F'], [PD.tileLab, '#3A3A3D'], [PD.red, '#E3301E'],
  [PD.line, '#C9C7C1'], [PD.card, '#FFFFFF'], [PD.tiles[1], '#C2C0BA'], ['#4A4D55', '#B0AEA8']]);
THEME.edges.light = (THEME.edges.light || []).concat([{ col: PD.card, line: 'rgba(17,17,20,0.16)' }, { col: PD.cardOld, line: 'rgba(17,17,20,0.12)' }]);
// dark alternative of the grayscale screen
themeMap('dark', 'ground', [[PD.gray, '#1C1C1E']]);
themeMap('dark', 'surface', [[PD.gray, '#1C1C1E'], ['#E6E5E1', '#2A2A2D'], [PD.grayTiles[0], '#4A4A4C'], [PD.grayTiles[1], '#3E3E40'], [PD.grayTiles[2], '#555557'], [PD.grayTiles[3], '#38383A'], ['#7C7B78', '#8E8D8A']]);
themeMap('dark', 'mark', [[PD.grayTxt, '#ECEAE5'], [PD.grayMid, '#A3A3A7'], ['#3A3A3A', '#D0CFCB'], ['#76767A', '#9A9A9E'], ['#7C7B78', '#8E8D8A']]);
THEME.text = [PD.text, '#111114'];

/* ---------- type ---------- */
const FT = (w, s) => `${w} ${s}px "Inter Tight"`;
const RED = () => PD.red;
/** small all-caps label (ILLUSTRATION, source credits): 600, 34 px, +0.12 em */
function lab(s, x, y, o = {}) {
  const size = o.size || 34; const col = o.col || (g === G.gray ? '#76767A' : g === G.red ? PD.onRed : PD.lab);
  txt(o.upper === false ? s : s.toUpperCase(), x, y, FT(600, size), col, o.align || 'left', 'alphabetic', size * 0.12, o.key);
}
/** a muted credit line (sentence case), wraps at maxW */
function credit(s, x, y, maxW, o = {}) {
  const size = o.size || 40; return txtW(s, x, y, FT(500, size), o.col || (g === G.gray ? PD.grayMid : PD.muted), maxW, size * 1.3, 0, o.key);
}

/* ---------- rich text: markup  *w* = red (flips on its event)  _w_ = red underline wipe (on its event)  ~w~ = muted ---------- */
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
/** lay out a paragraph: words with x, line index; wraps at maxW, honours \n */
function layoutRich(str, font, maxW, lh) {
  const key = str + '|' + font + '|' + maxW + '|' + lh; if (_PL.has(key)) return _PL.get(key);
  const ws = parseRich(str); setFont(font, 0); const sp = ctx.measureText(' ').width;
  let x = 0, li = 0, wMax = 0; const lines = [[]];
  for (const w of ws) {
    w.w = ctx.measureText(w.s).width;
    if (x > 0 && x + w.w > maxW) { li++; x = 0; lines.push([]); }
    w.x = x; w.li = li; lines[li].push(w); x += w.w + sp; wMax = Math.max(wMax, x - sp);
    if (w.br) { li++; x = 0; lines.push([]); }
  }
  // no single word alone on the last line: pull one word down from the line above (when it fits and that line keeps 2+ words)
  const ls_ = lines.filter(l => l.length); const place = (l, k) => { let xx = 0; l.forEach(w => { w.x = xx; w.li = k; xx += w.w + sp; }); return xx - sp; };
  const n_ = ls_.length;
  if (n_ > 1 && ls_[n_ - 1].length === 1 && ls_[n_ - 2].length >= 3 && !ls_[n_ - 2][ls_[n_ - 2].length - 1].br) {
    const mv = ls_[n_ - 2].pop(); ls_[n_ - 1].unshift(mv);
    if (place(ls_[n_ - 1], n_ - 1) > maxW) { ls_[n_ - 1].shift(); ls_[n_ - 2].push(mv); place(ls_[n_ - 1], n_ - 1); }
    place(ls_[n_ - 2], n_ - 2);
    wMax = Math.max(...ls_.map(l => l.reduce((a_, q) => a_ + q.w, 0) + sp * (l.length - 1)));
  }
  const L_ = { ws, lines: ls_, lh, w: wMax, h: (li + 1) * lh, sp };
  L_.h = L_.lines.length * lh; _PL.set(key, L_); return L_;
}
/** draw rich text. o: x, y (top of the first line box), size, weight, maxW, lh (factor), col, align, at (whole block lands),
 *  times (one per word: words reveal on their spoken time), ev (one time per marked word, in order), key (edit id), dimAt */
function rich(t, s, o) {
  const ov = ovr(o.key || s.replace(/[*_~]/g, '')); const str = ov.s != null ? ov.s : s;
  const size = o.size || 60, font = FT(o.weight || 500, size), lhp = size * (o.lh || 1.12);
  const Lo = layoutRich(str, font, o.maxW || 900, lhp);
  const align = o.align || 'left';
  const bx = align === 'center' ? o.x - Lo.w / 2 : o.x;
  const box = [bx, o.y, Lo.w, Lo.h];
  if (ov.hide) { regBox(ov, ...box, { text: str, def: s }); return Lo; }
  moved(ov, () => {
    let mi = 0; const col = o.col || g.fg, red = o.red || (g === G.red ? PD.ink : PD.red);
    // entrance modes: 'words' (each word on its spoken time), 'drop' (the block drops in whole, 0.35 s outExpo from -40 px),
    // 'type' (characters type on with a caret, paced to finish on the last spoken word)
    const mode = o.mode || 'words'; let t0 = null, cps = 30, nch = 0;
    if (o.times && mode !== 'words') { t0 = onCut(o.times[0] - 0.05); const tot = Lo.ws.reduce((a_, w) => a_ + w.s.length + 1, 0); cps = clamp(tot / Math.max(0.4, o.times[o.times.length - 1] - t0 + 0.25), 16, 45); nch = Math.floor((t - t0) * cps); }
    if (mode === 'drop' && t0 != null && t < t0) return;
    ctx.save();
    if (mode === 'drop' && t0 != null) { const p = MOTION.ease(t, t0, 0.35, 'outExpo'); ctx.globalAlpha *= clamp((t - t0) / 0.2); ctx.translate(0, (1 - p) * -40); }
    let cc = 0, caret = null;
    Lo.ws.forEach((w, i) => {
      const ln = Lo.lines.find(l => l.includes(w)); const lw = ln.reduce((a, q) => a + q.w, 0) + Lo.sp * (ln.length - 1);
      const X = (align === 'center' ? o.x - lw / 2 : o.x) + w.x, Y = o.y + w.li * lhp + size * 0.86;
      if (i === 0) o._prevT = null; let tw_ = o.times && mode === 'words' ? onCut(o.times[Math.min(i, o.times.length - 1)]) : null;
      if (tw_ != null && o._prevT != null && tw_ > o._prevT + 0.45) tw_ = o._prevT + 0.45; if (tw_ != null) o._prevT = tw_;
      let a = 1, dy = 0, bl = 0, shown = w.s;
      if (mode === 'type' && t0 != null) { const k = nch - cc; cc += w.s.length + 1; if (k <= 0) { if (w.m) mi++; return; } shown = w.s.slice(0, k); if (k < w.s.length + 1) caret = [X + tw(shown, font), Y]; }
      if (tw_ != null) { const p = prog(t, tw_ - 0.04, 0.3); if (p <= 0) { if (w.m) mi++; return; } a = clamp(p * 2.2); dy = size * 0.14 * (1 - MOTION.EASE.outExpo(p)); bl = 6 * (1 - p); }
      let fill = col;
      const et = w.m ? (o.ev && o.ev[mi] != null ? o.ev[mi] : (tw_ != null ? tw_ : (o.times ? o.times[Math.min(i, o.times.length - 1)] : (o.at || 0)))) : 0;
      if (w.m === '*') fill = t >= et ? red : col;
      if (w.m === '~') fill = o.mid || g.mid;
      if (w.m) mi++;
      ctx.save(); ctx.globalAlpha *= a; if (bl > 0.4) ctx.filter = `blur(${bl.toFixed(1)}px)`;
      _txt(shown, X, Y + dy, font, fill, 'left', 'alphabetic', 0);
      ctx.restore();
      if (w.m === '_') { const p = MOTION.ease(t, et, 0.35, 'outExpo'); if (p > 0) { ctx.save(); ctx.globalAlpha *= a; rect(X, Y + size * 0.13, (w.w - (/[.,!?:;]$/.test(w.s) ? size * 0.25 : 0)) * p, Math.max(4, size * 0.085), red); ctx.restore(); } }
    });
    if (caret) rect(caret[0] + 4, caret[1] - size * 0.78, Math.max(3, size * 0.06), size * 0.92, PD.red);
    regBox(ov, ...box, { text: str, def: s, markup: true });
    ctx.restore();
  });
  return Lo;
}
/** height of a rich paragraph (for stacking) */
function richH(s, o) { const e = EDIT.data.t[SCENE_ID + '/' + keyOf(o.key || s.replace(/[*_~]/g, ''))]; const str = e && e.s != null ? e.s : s; const size = o.size || 60; return layoutRich(str, FT(o.weight || 500, size), o.maxW || 900, size * (o.lh || 1.12)); }

/* ---------- notification banner ---------- */
const BAN = { r: 34, padX: 40, padT: 30, padB: 36, head: 34, headGap: 14 };
const banSize = () => V(60, 58);
/** banner geometry for text s at width w */
function banH(s, w, o = {}) { const size = o.size || banSize(); const Lo = richH(s, { size, maxW: w - 2 * BAN.padX, key: o.key }); return BAN.padT + BAN.head + BAN.headGap + Lo.h + BAN.padB; }
/** banner(t, s, o): o = {x, y, w, at (drop-in time), times, ev, head, when, size, old (time it becomes an older banner), key, gone} */
function banner(t, s, o) {
  const at = onCut(o.at || 0); if (t < at) return 0;
  const size = o.size || banSize(); const w = o.w; const h = banH(s, w, o);
  const p = MOTION.ease(t, at, 0.42, 'outQuint');
  const a = clamp((t - at) / 0.2) * (o.gone != null ? 1 - clamp((t - o.gone) / 0.25) : 1);
  if (a <= 0) return h;
  const y = o.y + (1 - p) * -40;
  withA(a, () => grp(o.gkey || ('banner ' + (o.key || s).slice(0, 24)), o.x, y, w, h, () => {
    fillRR(o.x, y, w, h, BAN.r, o.old != null && t > o.old ? PD.cardOld : PD.card);
    _txt(o.head || '@WithGbemi', o.x + BAN.padX, y + BAN.padT + 28, FT(600, BAN.head), PD.text, 'left', 'alphabetic', -0.2);
    _txt(o.when || 'now', o.x + w - BAN.padX, y + BAN.padT + 28, FT(500, BAN.head), PD.muted, 'right');
    rich(t, s, { x: o.x + BAN.padX, y: y + BAN.padT + BAN.head + BAN.headGap, size, maxW: w - 2 * BAN.padX, times: o.times, ev: o.ev, at, key: o.key, col: PD.text });
  }));
  return h;
}
/** a stack of banners, newest on top at y0; older ones step down by the new one's height + 22 px (0.35 s, outExpo).
 *  items: [{s, at, ev, times, head, when}] in arrival order. o: x, y, w, keep (max shown; portrait default 2), bottom (cut-off) */
function bannerStack(t, items, o) {
  const gap = 22; const keep = o.keep || V(4, 2); const bottom = o.bottom || V(H - 60, SAFE.contentBottom + 40);
  items = items.map(it => ({ ...it, at: onCut(it.at) })); const hs = items.map(it => banH(it.s, o.w, it));
  items.forEach((it, i) => {
    if (t < it.at) return;
    let off = 0; for (let j = i + 1; j < items.length; j++) off += (hs[j] + gap) * MOTION.ease(t, items[j].at, 0.5, 'outQuint');
    const newer = items.filter((q, j) => j > i && t >= q.at).length;
    const leave = newer >= keep ? items[i + keep].at : null;
    if (leave != null && t > leave + 0.3) return;
    const over = clamp(1 - (o.y + off + hs[i] - bottom) / 80); if (over <= 0) return;   // pushed past the bottom: fades over 80 px
    withA(over, () => banner(t, it.s, { ...it, x: o.x, y: o.y + off, w: o.w, old: i < items.length - 1 ? items[i + 1].at : null, gone: leave }));
  });
}

/* ---------- big lock-screen clock with a digit roll ---------- */
/** clock(t, x, y, size, from, to, at, o): from / to like '1:20' / '1:40'; only changed digits roll (0.48 s outExpo, blur 0-8 px) */
function lockClock(t, x, y, size, from, to, at, o = {}) {
  const font = FT(200, size); const ls = -0.045 * size; setFont(font, ls);
  const p = at == null ? 0 : MOTION.ease(t, at, 0.48, 'outExpo'); const bl = at == null ? 0 : Math.sin(Math.PI * clamp((t - at) / 0.48)) * 8;
  const wAll = tw('8:88'.slice(4 - to.length), font, ls); let cx = o.align === 'center' ? x - wAll / 2 : x;
  const col = o.col || g.fg;
  const ov = ovr('@clock');
  moved(ov, () => {
    ctx.save(); ctx.beginPath(); ctx.rect(cx - 20, y - size * 0.98, wAll + 60, size * 1.08); ctx.clip();
    for (let i = 0; i < to.length; i++) {
      const a_ = from[i] || '', b_ = to[i]; const cw = tw(b_, font, ls) + ls;
      if (a_ !== b_ && p < 1) {
        ctx.save(); if (bl > 0.3) ctx.filter = `blur(${bl.toFixed(1)}px)`;
        _txt(a_, cx, y - p * size, font, col, 'left', 'alphabetic', ls); _txt(b_, cx, y + (1 - p) * size, font, col, 'left', 'alphabetic', ls); ctx.restore();
      } else _txt(b_, cx, y, font, col, 'left', 'alphabetic', ls);
      cx += cw;
    }
    ctx.restore();
    regBox(ov, (o.align === 'center' ? x - wAll / 2 : x), y - size * 0.8, wAll, size * 0.85, { kind: 'box', label: 'clock' });
  });
}

/* ---------- home grid ---------- */
const APPS = ['Feed', 'Clips', 'Chat', 'Mail', 'Shop', 'News', 'Photos', 'Video', 'Maps', 'Music', 'Notes', 'Bank'];
/** homeGrid(t, o): o = {x, y, cols, size, gx, gy, n (tiles), badges: {i: [count, at] | count}, badgeCol, tileCols, labCol, pop (time the
 *  tiles spring in), lab (label size), names, hi (index of a highlighted tile), hiAt} */
function homeGrid(t, o) {
  const n = o.n || 12; let size = o.size || 150; const cols = o.cols || 4; const out = [];
  { // portrait safety net: shrink the grid (around its centre column) so it ends above the safe bottom
    const rows = Math.ceil(n / cols), tot = rows * size + (rows - 1) * o.gy + 50, lim = (PORTRAIT ? SAFE.contentBottom : H - 40) - o.y;
    if (tot > lim) { const k = lim / tot, wAll = cols * size + (cols - 1) * o.gx; o = { ...o, gx: o.gx * k, gy: o.gy * k, lab: (o.lab || 32) * Math.max(0.85, k) }; size *= k; o.x += (wAll - (cols * size + (cols - 1) * o.gx)) / 2; }
  }
  for (let i = 0; i < n; i++) {
    const tx = o.x + (i % cols) * (size + o.gx), ty = o.y + Math.floor(i / cols) * (size + o.gy);
    const st = o.pop != null ? MOTION.spring(t - o.pop - i * 0.03, 0.7, 2.6) : 1; if (st <= 0.001) { out.push({ x: tx, y: ty, s: size }); continue; }
    const cols_ = o.tileCols || PD.tiles;
    ctx.save(); ctx.translate(tx + size / 2, ty + size / 2); ctx.scale(st, st); ctx.translate(-tx - size / 2, -ty - size / 2);
    fillRR(tx, ty, size, size, size * 0.23, cols_[i % cols_.length]);
    if (o.names !== false) _txt((o.names || APPS)[i % APPS.length], tx + size / 2, ty + size + (o.lab || 32) + 10, FT(500, o.lab || 32), o.labCol || PD.tileLab, 'center');
    const b = o.badges && o.badges[i];
    if (b != null) {
      const [val, at] = Array.isArray(b) ? b : [b, null];
      const bs = at == null ? 1 : MOTION.spring(t - at, 0.42, 2.6);   // ~25 % overshoot so each pop reads
      if (bs > 0.01) badge(tx + size - 6, ty + 6, typeof val === 'function' ? val(t) : val, o.badgeCol || PD.red, size / 150, bs);
    }
    ctx.restore();
    out.push({ x: tx, y: ty, s: size });
  }
  return out;
}
/** a notification badge centred at (cx, cy) */
function badge(cx, cy, label, col = PD.red, k = 1, s = 1) {
  const str = String(label); const fs = 32 * k; const font = FT(700, fs); const w = Math.max(56 * k, tw(str, font) + 28 * k), h = 56 * k;
  ctx.save(); ctx.translate(cx, cy); ctx.scale(s, s);
  fillRR(-w / 2, -h / 2, w, h, h / 2, col); _txt(str, 0, fs * 0.36, font, '#FFFFFF', 'center');
  ctx.restore();
}

/* ---------- pull-to-refresh spinner ---------- */
function spinner(cx, cy, r, fill, spin, col = PD.text) {
  for (let i = 0; i < 12; i++) {
    if (i >= Math.round(fill * 12)) continue;
    const a = 0.35 + 0.65 * (((i - spin * 12) % 12 + 12) % 12) / 12;
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(i * Math.PI / 6); ctx.globalAlpha *= a;
    fillRR(-4, -r, 8, r * 0.55, 4, col); ctx.restore();
  }
}

/* ---------- home indicator + ILLUSTRATION ---------- */
function homeBar() { withA(0.45, () => fillRR(CX - 110, H - 26, 220, 9, 5, g === G.gray ? '#3A3A3A' : PD.text)); }
function illus(x, y) { lab('Illustration', x == null ? V(120, 70) : x, y == null ? V(1010, SAFE.contentTop - 24) : (PORTRAIT ? SAFE.contentTop - 24 : y)); }

/* ---------- real-source sheet (a white document card inside the lock screen) ---------- */
/** sheet(t, o): o = {img, sx, sy, sw, sh (source crop, image px), x, y, w (card width), head [left, right], foot, at,
 *  hl: [[x, y, w, h (image px), t]...], zoom: {at, d, k, cx, cy (image px)}, plot (top-down reveal 1.1 s from at)} */
function sheet(t, o) {
  const im = IMG[o.img]; if (!im) return;
  const at = onCut(o.at || 0); if (t < at) return;
  const p = MOTION.ease(t, at, 0.4, 'outExpo'); const a = clamp((t - at) / 0.22);
  const pad = 30; const iw = o.w - 2 * pad; const sc = iw / o.sw; const ih = o.sh * sc;
  const headH = o.head ? 54 : 0, footH = o.foot ? 58 : 0; const h = pad + headH + ih + footH + pad - (o.foot ? 6 : 0);
  const y = o.y + (1 - p) * -40;
  withA(a * (o.gone != null ? 1 - clamp((t - o.gone) / 0.25) : 1), () => grp(o.gkey || ('sheet ' + o.img), o.x, y, o.w, h, () => {
    fillRR(o.x, y, o.w, h, BAN.r, PD.card);
    if (o.head) { _txt(o.head[0], o.x + pad + 10, y + pad + 32, FT(600, 34), PD.text); _txt(o.head[1] || '', o.x + o.w - pad - 10, y + pad + 32, FT(500, 34), PD.muted, 'right'); }
    const ix = o.x + pad, iy = y + pad + headH;
    themeFixed(() => {
      ctx.save(); rr(ix, iy, iw, ih, 14); ctx.clip(); rect(ix, iy, iw, ih, '#FFFFFF');
      let zk = 1, zx = 0, zy = 0;
      if (o.zoom) { const z = o.zoom; const e = MOTION.ease(t, z.at, z.d || 0.9, 'inOutQuart'); zk = 1 + (z.k - 1) * e;
        const fx = (z.cx - o.sx) * sc, fy = (z.cy - o.sy) * sc; zx = (iw / 2 - fx) * e; zy = (ih / 2 - fy) * e;
        ctx.translate(ix + fx + zx, iy + fy + zy); ctx.scale(zk, zk); ctx.translate(-(ix + fx), -(iy + fy)); }
      const plot = o.plot ? MOTION.ease(t, at, 1.1, 'outQuint') : 1;
      ctx.save(); if (plot < 1) { ctx.beginPath(); ctx.rect(ix, iy, iw, ih * plot); ctx.clip(); }
      ctx.drawImage(im, o.sx, o.sy, o.sw, o.sh, ix, iy, iw, ih); ctx.restore();
      if (plot < 1) rect(ix - 10, iy + ih * plot - 1.5, iw + 20, 3, PD.red);
      (o.hl || []).forEach(([hx, hy, hw, hh, ht, kind]) => {
        const q = MOTION.ease(t, ht, 0.35, 'outExpo'); if (q <= 0) return;
        const X = ix + (hx - o.sx) * sc, Y = iy + (hy - o.sy) * sc, Wd = hw * sc, Hd = hh * sc;
        if (kind === 'ring') { handCircle(X + Wd / 2, Y + Hd / 2, Wd * 0.58, Hd * 0.95, MOTION.ease(t, ht, 0.55, 'outQuint'), PD.red, 3.2 / zk * (o.ringW || 1), 3); return; }
        ctx.fillStyle = 'rgba(255,68,51,0.30)'; ctx.fillRect(X - 3 * sc, Y, (Wd + 6 * sc) * q, Hd);
        ctx.fillStyle = PD.red; ctx.fillRect(X - 3 * sc, Y + Hd - Math.max(2, 3 * sc), (Wd + 6 * sc) * q, Math.max(2, 3 * sc));
      });
      ctx.restore();
    });
    if (o.foot) _txt(o.foot, o.x + pad + 10, iy + ih + 46, FT(500, 34), PD.muted);
  }, { img: true }));
  return { h, ix: o.x + pad, iy: y + pad + headH, sc };
}

/* ---------- scene wrapper ---------- */
let _ALT = 0;
const PULL = { D: () => V(240, 380), drag: 0.4, hold: 0.45 };
/** addL(start, draw, o): o = {id, ground ('lock' alternates lock / lockB; 'gray', 'red'), pull (arrive by pull-to-refresh),
 *  burst: [x, y] (arrive by a red badge that grows from x, y), push (slow push, default 0.012), anchor [x, y], spin (spinner col)} */
function addL(start, draw, o = {}) {
  let me = null; const ground = !o.ground || o.ground === 'lock' ? (_ALT++ % 2 ? 'lockB' : 'lock') : o.ground;
  const wrapped = (t, lt) => {
    if (!me) me = SCENES.find(s => s.draw === wrapped);
    LSTART = me.start;
    const end = sceneEnd(me.n - 1); const dur = Math.max(0.5, end - me.start); const next = SCENES[me.n]; const nb = next && next.lo;
    const D = PULL.D();
    // inside a talking-head page (a hidden frame) in 9:16: scale 0.86 around y 1100, so content sits in y 452..1392, clear of a
    // short's top label (y 135..~380) and its captions (1460..1660). The film's own exports are unchanged (not embedded).
    if (EMBED && PORTRAIT) { ctx.translate(CX, 1100); ctx.scale(0.86, 0.86); ctx.translate(-CX, -1100); }
    // pull in: the screen arrives dragged down and springs back (2.0 Hz, zeta 0.67, ~6 % overshoot)
    let y = 0;
    if (o.pull) y = D * (1 - MOTION.spring(lt, 0.67, 2.0));
    // pull out: the next scene arrives by a pull, so this screen is dragged down before the cut and holds with the spinner
    let outDrag = 0, spinT = 0;
    if (nb && nb.pull) { const t0 = end - PULL.drag - PULL.hold; outDrag = D * MOTION.EASE.outExpo(clamp((t - t0) / PULL.drag)); spinT = t - t0 - PULL.drag; y = Math.max(y, outDrag); }
    if (y > 0.5) {
      rect(0, 0, W, y + 2, g === G.gray ? '#C6C5C1' : PD.gap);
      const fill = outDrag > 0 ? clamp(outDrag / D) : 1; const sp = outDrag > 0 ? Math.max(0, spinT) * 1.6 : 1.2 + lt * 1.6;
      withA(clamp(y / 60), () => spinner(CX, Math.min(y / 2, D / 2), V(44, 52), fill, sp, g === G.gray ? '#3A3A3A' : PD.text));
      ctx.save(); ctx.beginPath(); ctx.rect(0, y, W, H - y + 400); ctx.clip(); ctx.translate(0, y);
      rect(0, 0, W, H, g.bg);
    } else ctx.save();
    // slow push
    const push = o.push == null ? 0.012 : o.push; if (push || typeof HOLDS === 'object') { const an = o.anchor ? o.anchor() : [CX, H * 0.45]; let k = 1 + push * MOTION.EASE.inOutQuart(clamp(lt / dur));
      if (typeof HOLDS === 'object') for (const [h0, h1] of HOLDS) if (h0 >= me.start - 0.01 && h0 < end) { const mid = (h0 + h1) / 2; k *= 1 + 0.05 * MOTION.ease(t, mid - 0.35, 0.7, 'outQuint'); }   /* a push-in in the middle of a long hold (lab audit) */
      ctx.translate(an[0], an[1]); ctx.scale(k, k); ctx.translate(-an[0], -an[1]); }
    draw(t, lt, dur);
    ctx.restore();
    // burst out: a red badge grows over this screen into the next (red) scene
    if (nb && nb.burst) { const bt = end - 0.42; const q = clamp((t - bt) / 0.42); if (q > 0) { const [bx, by] = typeof nb.burst === 'function' ? nb.burst() : nb.burst; const R_ = Math.hypot(Math.max(bx, W - bx), Math.max(by, H - by)) + 40;
      const e = MOTION.EASE.inOutQuart(q); const r = lerp(28, R_, e); themeFixed(() => circle(bx, by, r, PD.red)); if (r < 140) themeFixed(() => _txt('1', bx, by + 11 * r / 28, FT(700, 32 * r / 28), '#FFFFFF', 'center')); } }
  };
  addScene(start, ground, o.label || 'lock', wrapped, o);
  SCENES[SCENES.length - 1].lo = o;
  if (o.pull) { sfx('pull', start - PULL.drag - PULL.hold + 0.02, 0); sfx('refresh', start + 0.05, 0); }
  if (o.burst) sfx('burst', start - 0.25, 0);
}

/* ---------- phrases ---------- */
/** WAT(word, after): video time of the first spoken occurrence of word at or after `after` (no cursor move) */
function WAT(word, after) { const k = norm(word); const w = WORDS.find(x => x.t >= after - 1e-6 && x.n === k); if (!w) throw new Error(`WAT: "${word}" after ${after}`); return w.t; }
/** PH(q): P(q) plus .at('word', n) = the start of the n-th (default 1st) occurrence of that word inside the phrase */
function PH(q, o) {
  const ph = P(q, o); const ws = WORDS.slice(ph.i, ph.i + ph.w.length).map(x => x.n);
  ph.at = (word, n = 1) => { const k = norm(word); let c = 0; for (let i = 0; i < ws.length; i++) if (ws[i] === k && ++c === n) return ph.w[i]; throw new Error(`word "${word}" not in phrase "${q}"`); };
  ph.end = ph.e; return ph;
}

/* ---------- sound vocabulary (film.json audio.sfx.roles) ---------- */
const sNotify = (t, db = 0) => sfx('notify', t, db);   // a banner lands
const sPop = (t, db = 0) => sfx('pop', t - 0.06, db);  // a badge / tile pops (cards start 0.1 s before the word)
const sTick = (t, db = 0) => sfx('tick', t, db);       // a toggle, a tap, a counter step
const sMark = (t, db = 0) => sfx('mark', t, db);       // a red underline / highlight
const sShut = (t, db = 0) => sfx('shutter', t, db);    // a real document lands
const sHit = (t, db = 0) => sfx('hit', t, db);         // a strong claim
const sClock = (t, db = 0) => sfx('clock', t, db);     // the clock rolls
const sCash = (t, db = 0) => sfx('cash', t, db);       // money
const sRiser = (t, db = 0) => sfx('riser', t, db);     // peak lands on t
const sSwipe = (t, db = 0) => sfx('swipe', t, db);
const sType = (t, chars, cps = 22, db = 0) => sfxType(t, chars, cps, db);
const sErr = (t, db = 0) => sfx('error', t, db);
const sGlitch = (t, db = 0) => sfx('glitch', t, db);
const sTape = (t, db = 0) => sfx('tape', t, db);
Object.assign(SFX_PRI, { burst: 8, hit: 7, riser: 6, pull: 6, refresh: 5, shutter: 5, notify: 4, cash: 4, clock: 4, pop: 3, mark: 3, tick: 2, swipe: 4, error: 4, glitch: 4, tape: 4, type: 3 });
Object.assign(SFX_GAP, { burst: 0.3, hit: 0.5, riser: 0.3, pull: 0.3, refresh: 0.3, shutter: 2.0, notify: 2.5, cash: 3.0, clock: 1.5, pop: 1.2, mark: 3.0, tick: 2.5, swipe: 2.5, error: 3.0, glitch: 3.0, tape: 3.0, type: 2.0 });
// fewer, louder sounds (critic round 1, whole film): no cue sits more than 3 dB under its role level
{ const _sfx = sfx; sfx = (name, t, db = 0, extra = {}) => _sfx(name, t, Math.max(db, -3), extra); }
