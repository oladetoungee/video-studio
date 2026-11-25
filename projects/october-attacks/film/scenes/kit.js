/* october-attacks film kit: "THE MONTH" (her pick 2026-10-26: direction A) with B's keys mixed in.
 * The October 2026 wall calendar is the spine: the days go black "one attack after the other", the camera dives into a
 * day for its story. Stories about secrets are told with keys (taken off the hook, swapped, kept too long, stamped 4).
 * Grounds: October orange #F2541B (the month, punchlines; no light / dark alternative), night #16110D (inside a day),
 * bone #EFE7D8 (explainers). Ink #16110D. One accent per scene: ink on orange, orange on night and bone
 * (orange TEXT on bone is the deeper #D23E0C: 3.85:1). Type: Anton (numbers, headlines, caps), Manrope 700/800
 * (sentences), Spline Sans Mono (labels, code). Real article clippings: never altered, highlighter + source credit.
 * Pure functions of time; no Math.random. */
'use strict';
const A = { orange: '#F2541B', orangeT: '#D23E0C', ink: '#16110D', bone: '#EFE7D8', card: '#FBF6EC', midN: '#9C9182', midB: '#6E655A',
  panelN: '#2A221B', panelB: '#E3D9C6', peach: '#FFC59E', ruleN: 'rgba(239,231,216,0.16)', ruleB: 'rgba(22,17,13,0.18)', nbN: '#7D7164', nbB: '#8A8072', cream: '#FFF6EA', inkFix: '#17120E' };   // inkFix: ink that keeps its colour in both modes (text on objects that keep theirs)
G.oct = { bg: A.orange, fg: A.ink, mid: 'rgba(22,17,13,0.66)', line: 'rgba(22,17,13,0.28)', acc: A.ink, card: A.card, panel: A.card, grid: 'rgba(22,17,13,0.28)' };
G.night = { bg: A.ink, fg: A.bone, mid: A.midN, line: A.ruleN, acc: A.orange, card: A.card, panel: A.panelN, grid: A.ruleN, mode: 'dark', altKey: 'bone' };
G.bone = { bg: A.bone, fg: A.ink, mid: A.midB, line: A.ruleB, acc: A.orangeT, card: A.card, panel: A.panelB, grid: 'rgba(22,17,13,0.10)', mode: 'light', altKey: 'night' };
// light / dark alternates (the editor's Light / Dark per screen); the orange month has none (colour punchline)
themeMap('dark', 'ground', [[A.bone, A.ink]]);
themeMap('dark', 'surface', [[A.ink, A.panelN], [A.panelB, A.panelN], [A.card, '#221B15']]);
themeMap('dark', 'mark', [[A.ink, A.bone], [A.midB, A.midN], [A.orangeT, A.orange], [A.nbB, A.nbN], [A.panelB, A.panelN]]);
themeMap('light', 'ground', [[A.ink, A.bone]]);
themeMap('light', 'surface', [[A.panelN, A.panelB], [A.ink, A.ink]]);
themeMap('light', 'mark', [[A.bone, A.ink], [A.midN, A.midB], [A.orange, A.orangeT], [A.nbN, A.nbB], [A.panelN, A.panelB]]);
THEME.text = [A.bone, A.ink];

F.disp = (s) => `400 ${s}px Anton`;
F.body = (s, w = 700) => `${w} ${s}px Manrope`;
F.mono = (s, w = 500) => `${w} ${s}px "Spline Sans Mono"`;
LS.disp = 0.0; LS.mono = 0.06; LS.body = -0.01;

const ez = (t, t0, d, k = 'outQuint') => MOTION.ease(t, t0, d, k);
const io = (t, t0, d) => MOTION.ease(t, t0, d, 'inOutQuart');
const ezx = (t, t0, d) => MOTION.ease(t, t0, d, 'outExpo');
/** a sound cue never thinned by pruneCues (every sound here is placed by hand on its visual) */
const NUDGE = {};   // per-cue sync fixes from the lab audit (scenes/nudges.js: 'role@t' -> seconds)
const cue = (name, t, db = 0) => sfx(name, t + (NUDGE[name + '@' + (+t).toFixed(2)] || 0), db, { keep: true });
const dark = () => g === G.night;
const accT = () => (g === G.bone ? A.orangeT : A.orange);   // orange as text on this ground
/** editable mono label (uppercase, letter-spaced) */
const lab = (s, x, y, size = 32, col, align = 'left', o = {}) => mono(s, x, y, size, col || g.mid, align, { ls: 0.08, fixed: true, ...o });
/** editable body sentence (Manrope), wraps at maxW */
const body = (s, x, y, size, col, maxW, o = {}) => txtW(s, x, y, F.body(size, o.w || 700), col || g.fg, maxW || W - x - L, size * (o.lh || 1.22), 0, o.key);

/** QA only: boxes of raw texts and rules (calendar digits, weekday row, grid hairlines) for the text-collision sweep */
function qaBox(kind, label, x, y, w, h) { if (!window.QA_TEXT) return; const m = ctx.getTransform(); const X = (px, py) => [m.a * px + m.c * py + m.e, m.b * px + m.d * py + m.f];
  const [x0, y0] = X(x, y), [x1, y1] = X(x + w, y + h); window.QA_TEXT.push({ kind, id: SCENE_ID + '/' + label, text: label, x: Math.min(x0, x1), y: Math.min(y0, y1), w: Math.abs(x1 - x0), h: Math.abs(y1 - y0), a: ctx.globalAlpha }); }
const qaTxt = (s, x, y, font, align = 'left') => { const w_ = tw(s, font), fs = fontPx(font); qaBox('qa-text', s, align === 'center' ? x - w_ / 2 : align === 'right' ? x - w_ : x, y - fs * 0.78, w_, fs * 0.8); };

/* ============ the month ============ */
// Oct 1 2026 is a Thursday; weeks start on Monday (Estonia, where she lives)
const DAY0 = 3;
const cellOf = (d) => { const i = DAY0 + d - 1; return [i % 7, Math.floor(i / 7)]; };
function monthGeo() { return PORTRAIT ? { x: 60, y: 790, w: 960, rowH: 110, head: 768 } : { x: 110, y: 390, w: 1700, rowH: 128, head: 368 }; }
/**
 * The October calendar. o: t0 (draw-in), fills [{d, at, label}], numFade [d, a], labelA, ring {d, at} (hand circle),
 * dim (0..1 fade the empty days), x/y/w/rowH (override geometry: used for the small month in a corner)
 */
function month(t, o = {}) {
  const M = { ...monthGeo(), ...(o.geo || {}) }; const cw = M.w / 7; const lw = 2; const sc = M.rowH / 132;
  const dIn = (i) => ez(t, (o.t0 == null ? -10 : o.t0) + i * 0.012, 0.5);
  ['M', 'T', 'W', 'T', 'F', 'S', 'S'].forEach((d, i) => withA(dIn(i), () => { _mono(d, M.x + i * cw + 14 * sc, M.head, Math.max(24, 32 * sc), g === G.oct ? A.ink : g.mid, 'left', { ls: 0.1 }); qaTxt(d, M.x + i * cw + 14 * sc, M.head, F.mono(Math.max(24, 32 * sc), 500)); }));
  for (let r = 0; r <= 5; r++) { const pr = ez(t, (o.t0 == null ? -10 : o.t0) + r * 0.05, 0.6, 'outExpo'); hline(M.x, M.y + r * M.rowH, M.w, pr, g.line, lw); if (r === 0 && pr > 0.5) qaBox('qa-line', 'month top rule', M.x, M.y - 1, M.w * pr, 2); }
  for (let c = 0; c <= 7; c++) { const p = ez(t, (o.t0 == null ? -10 : o.t0) + 0.1 + c * 0.03, 0.6, 'outExpo'); rect(M.x + c * cw - lw / 2, M.y, lw, 5 * M.rowH * p, g.line); }
  const byDay = {}; (o.fills || []).forEach(f => { (byDay[f.d] = byDay[f.d] || []).push(f); });
  const numS = Math.round((PORTRAIT ? 50 : 52) * Math.max(0.55, sc));
  for (let d = 1; d <= 31; d++) {
    const [c, r] = cellOf(d); const x = M.x + c * cw, y = M.y + r * M.rowH; const fs = byDay[d];
    const pf = fs ? ez(t, fs[0].at, 0.32) : 0;
    if (pf > 0) { ctx.save(); ctx.translate(x, y); ctx.scale(1, pf); rect(lw / 2, lw / 2, cw - lw, M.rowH - lw, fs[0].col || A.ink); ctx.restore(); }
    const nin = dIn(7 + d * 0.5) * (o.numFade && o.numFade[0] === d ? clamp(o.numFade[1]) : 1) * (fs ? 1 : 1 - (o.dim || 0) * 0.6);
    const two = fs && fs.filter(f => f.label).length > 1;
    withA(nin, () => { _txt(String(d), x + 14 * sc, y + numS + 8 * sc, F.disp(numS), pf > 0.5 ? A.orange : g.fg, 'left'); qaTxt(String(d), x + 14 * sc, y + numS + 8 * sc, F.disp(numS)); });
    if (fs && !PORTRAIT && sc > 0.8) fs.forEach((f, k) => { const p = ez(t, f.at + 0.12, 0.3); if (p <= 0 || !f.label) return; const n = fs.filter(z => z.label).length;
      withA(p * (o.labelA == null ? 1 : clamp(o.labelA)), () => txt(f.label, x + 14, y + M.rowH - 12 - (n - 1 - k) * 28 + 8 * (1 - p), F.mono(n > 1 ? 24 : 28, 500), A.bone, 'left', 'alphabetic', 1.2, 'day ' + d + ' label ' + k)); });
  }
  if (o.ring) { const [x, y, w, h] = cellRect(o.ring.d, M); handCircle(x + w / 2, y + h / 2, w * 0.56, h * 0.56, ez(t, o.ring.at, 0.6, 'outQuint'), o.ring.col || A.ink, 7, 3); }
  return M;
}
function cellRect(d, M) { M = M || monthGeo(); const cw = M.w / 7; const [c, r] = cellOf(d); return [M.x + c * cw, M.y + r * M.rowH, cw, M.rowH]; }
/** camera dive: grows day d's cell to fill the frame (p 0 -> 1) */
function dive(p, d, fn) {
  const [x, y, w, h] = cellRect(d); const s = lerp(1, Math.max(W / w, H / h) * 1.02, p);
  const cx = lerp(W / 2, x + w / 2, Math.min(1, p * 1.4)), cy = lerp(H / 2, y + h / 2, Math.min(1, p * 1.4));
  ctx.save(); ctx.translate(W / 2, H / 2); ctx.scale(s, s); ctx.translate(-cx, -cy); fn(); ctx.restore();
}
/** inside a day: a hairline border (the zoomed cell) with the neighbouring days' numbers peeking in the gutters */
function dayFrame(t, t0, d) {
  const m = 46, p = ez(t, t0, 0.5); const col = dark() ? 'rgba(239,231,216,0.22)' : 'rgba(22,17,13,0.22)'; const nb = dark() ? A.nbN : A.nbB;
  withA(p, () => { strokeR(m, m, W - 2 * m, H - 2 * m, col, 3);
    _txt(String(d - 1), 16, V(110, 120), F.disp(28), nb, 'left'); _txt(String(d + 1), W - 16, V(110, 120), F.disp(28), nb, 'right');
    _txt(String(d + 7), m + 18, H - 30, F.disp(32), nb, 'left'); });
}
/** the day header inside a day: big orange date + a mono weekday line + (optional) the story's name in Anton */
function dayHead(t, t0, d, wd, o = {}) {
  const p = ez(t, t0, 0.5); const s = o.size || V(110, 130); const x = o.x || L, y = o.y || V(200, 470); const mon = o.month || 'OCTOBER 2026';
  withA(p, () => { _txt(String(d), x, y + 18 * (1 - p), F.disp(s), accT(), 'left'); const x2 = x + tw(String(d), F.disp(s)) + 26;
    if (o.name) { lab(wd + ' ' + d + ' ' + mon, x2, y - s * 0.62, 32, g.mid, 'left', { key: 'day line' }); txt(o.name, x2, y, F.disp(s * 0.56), o.nameCol || g.fg, 'left', 'alphabetic', 0, 'story name'); }
    else lab(wd + ' ' + d + ' ' + mon, x2, y - 12, 32, g.mid, 'left', { key: 'day line' }); });
}
/** a sentence that wipes on as one block (left to right): the film's second entry style (the first is word-by-word KT) */
function wipeLines(t, t0, lines, x, y, font, col, lh, d = 0.5, key) {
  const p = ez(t, t0, d, 'outExpo'); if (p <= 0) return; const fs = fontPx(font);
  const w = Math.max(...lines.map(l => tw(l, font))) + 20;
  ctx.save(); ctx.beginPath(); ctx.rect(x - 10, y - fs, w * p, lines.length * lh + fs * 0.5); ctx.clip();
  lines.forEach((l, i) => txt(l, x + 24 * (1 - p), y + i * lh, font, col, 'left', 'alphabetic', 0, (key || l) + (lines.length > 1 ? ' ' + i : ''))); ctx.restore();
}
/** a small calendar page for another month (August, December, April 2025): title, grid, marked days */
function miniMonth(t, t0, x, y, w, title, startDow, days, o = {}) {
  const p = ez(t, t0, 0.5); if (p <= 0) return; const cw = w / 7, rh = o.rowH || cw * 0.78; const rows = Math.ceil((startDow + days) / 7);
  const h = 90 + rows * rh;
  grp(o.key || ('page ' + title), x, y, w, h, () => withA(p, () => { ctx.save(); ctx.translate(0, 30 * (1 - p));
    fillRR(x, y, w, h, 8, o.paper || (dark() ? A.panelN : A.card));
    txt(title, x + 22, y + 62, F.disp(46), o.ink || g.fg, 'left', 'alphabetic', 0, 'page title ' + title);
    for (let d = 1; d <= days; d++) { const i = startDow + d - 1; const cx = x + (i % 7) * cw, cy = y + 90 + Math.floor(i / 7) * rh;
      const mk = (o.marks || []).find(m => m.d === d); const pm = mk ? ez(t, mk.at, 0.32) : 0;
      if (pm > 0) { ctx.save(); ctx.translate(cx + 3, cy + 3); ctx.scale(1, pm); rect(0, 0, cw - 6, rh - 6, mk.col || A.ink); ctx.restore(); }
      _txt(String(d), cx + 10, cy + rh * 0.55, F.disp(Math.round(rh * 0.42)), pm > 0.5 ? (mk.fg || A.orange) : (o.dim || g.mid), 'left'); }
    ctx.restore(); }));
  return h;
}

/* ============ real article clippings (crops of the captured pages, never altered) ============ */
/**
 * clipCard(t, key, x, y, w, o): white sheet, the screenshot, a highlighter sweeping the line she says (multiply, like a
 * marker on paper) and a small source credit. o: at, hlAt, hl (colour), crop [y0, y1], cropX [x0, x1], pad, rise,
 * creditBelow (true), credit colour, creditSize, hlMode 'underline'. Returns {h}.
 */
const DEFCROP = { 'aws-head': [30, 213], 'zb-head': [16, 318] };   // trims a sliver of the line above the headline (never alters the page)
function clipCard(t, key, x, y, w, o = {}) {
  const c = CLIPS[key]; const im = IMG['clip_' + key]; if (!c || !im) throw new Error('clip ' + key);
  const a = o.at == null ? 1 : ez(t, o.at, 0.5); if (a <= 0.001) return { h: 0 };
  if (!o.crop && DEFCROP[key]) o = { ...o, crop: DEFCROP[key] };
  const pad = o.pad == null ? 26 : o.pad; const y0 = o.crop ? o.crop[0] : 0, y1 = o.crop ? o.crop[1] : c.h;
  const x0 = o.cropX ? o.cropX[0] : 0, x1 = o.cropX ? o.cropX[1] : c.w;
  const s = (w - 2 * pad) / (x1 - x0); const ih = (y1 - y0) * s; const h = ih + 2 * pad;
  const rise = (o.rise == null ? 40 : o.rise) * (1 - a);
  { const body = /head$/.test(key) ? 0 : s * (c.file.includes('/src/') && CLIPS[key].w <= 1290 && !c.url.includes('aws') ? 27 : 36); const id = SCENE_ID + ' ' + key + ' ' + LAYOUT;   // QA: body text px on screen
    if (body && body < 28 && !(window.__small = window.__small || {})[id]) { window.__small[id] = 1; console.error('SMALLCLIP ' + id + ' ' + body.toFixed(1) + 'px'); } }
  { const ck = key + '|' + x0 + '|' + x1; const cache = (window.__cut = window.__cut || {});   // QA: a crop must not cut through a letter (ink in its first / last 6 px)
    if (!(ck in cache)) { const cv = document.createElement('canvas'); cv.width = 12; cv.height = Math.max(1, y1 - y0); const cx2 = cv.getContext('2d'); let hit = [];
      for (const [i_, sx] of [[0, x0], [1, x1 - 6]]) { if ((i_ === 0 && x0 === 0) || (i_ === 1 && x1 >= c.w)) continue; cx2.clearRect(0, 0, 12, cv.height); cx2.drawImage(im, sx, y0, 6, y1 - y0, 0, 0, 6, y1 - y0);
        const d = cx2.getImageData(0, 0, 6, cv.height).data; const bg = d[0] + d[1] + d[2]; for (let p = 0; p < d.length; p += 4) if (Math.abs(d[p] + d[p + 1] + d[p + 2] - bg) > 200) { hit.push(i_ ? 'right' : 'left'); break; } }
      cache[ck] = hit; if (hit.length) console.error('CLIPCUT ' + SCENE_ID + ' ' + key + ' ' + LAYOUT + ' cuts a letter on the ' + hit.join('+')); } }
  grp(o.key || 'clip ' + key, x, y, w, h + (o.creditBelow !== false ? 56 : 0), () => withA(Math.min(1, a * 1.6), () => {
    ctx.save(); ctx.translate(0, rise);
    themeFixed(() => {
      rect(x, y, w, h, '#FFFFFF');
      ctx.drawImage(im, x0, y0, x1 - x0, y1 - y0, x + pad, y + pad, (x1 - x0) * s, ih);
      if (o.hlAt != null) { ctx.save(); ctx.beginPath(); ctx.rect(x + pad, y + pad, (x1 - x0) * s, ih); ctx.clip(); c.hl.forEach((r, i) => {
        if (o.hlOnly && !o.hlOnly.includes(i)) return;
        const p = ez(t, (Array.isArray(o.hlAt) ? o.hlAt[i] || o.hlAt[0] : o.hlAt + i * 0.28), 0.42, 'outExpo'); if (p <= 0) return;
        if (r[1] + r[3] < y0 || r[1] > y1) return;
        const rx = x + pad + (r[0] - x0 - 6) * s, ry = y + pad + (r[1] - y0 - 2) * s, rw = (r[2] + 12) * s * p, rh = (r[3] + 4) * s;
        if (o.hlMode === 'underline') { ctx.fillStyle = o.hl || A.orange; ctx.fillRect(rx, ry + rh + 2, rw, Math.max(6, rh * 0.14)); }
        else { ctx.save(); ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = o.hl || A.peach; ctx.fillRect(rx, ry, rw, rh); ctx.restore(); }
      }); ctx.restore(); }
    });
    if (o.creditBelow !== false) { const cs = o.creditSize || 32; lab(c.source + '  ·  ' + c.date, x, y + h + cs * 1.45, cs, o.credit || g.mid, 'left', { key: 'credit ' + key, ls: 0.06 }); }
    ctx.restore();
  }), { img: true });
  return { h: h + (o.creditBelow !== false ? 58 : 0) };
}
/** the height a clip will take at width w (for layout) */
function clipH(key, w, o = {}) { const c = CLIPS[key]; if (!o.crop && DEFCROP[key]) o = { ...o, crop: DEFCROP[key] }; const pad = o.pad == null ? 26 : o.pad; const y0 = o.crop ? o.crop[0] : 0, y1 = o.crop ? o.crop[1] : c.h; const x0 = o.cropX ? o.cropX[0] : 0, x1 = o.cropX ? o.cropX[1] : c.w; return (y1 - y0) * (w - 2 * pad) / (x1 - x0) + 2 * pad; }

/* ============ keys (B's key board, redrawn in the month's palette) ============ */
/**
 * key(x, y, len, rot, o): a key hanging from its ring top (x, y), rotated about the ring. o: fill (bone), ink, bg (hole
 * colour = ground), bits (tooth depths), label (stamped on the bow), labelSize, labelCol, tag {lines, col, ink, size, w, rot}
 */
function key(x, y, len, rot, o = {}) {
  const r = len * 0.2, bw = len * 0.16, fill = o.fill || A.bone, ink = o.ink || A.ink, lw = Math.max(3, len * 0.012);
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot || 0);
  ctx.strokeStyle = o.ring || (dark() ? A.bone : ink); ctx.lineWidth = lw * 1.4; ctx.beginPath(); ctx.arc(0, r * 0.32, r * 0.32, 0, Math.PI * 2); ctx.stroke();
  const by = r * 0.64 + r;
  if (o.tag) { const tg = o.tag; const n = tg.lines.length, fs = tg.size || 32; const tw_ = tg.w || Math.max(...tg.lines.map(l => tw(l.toUpperCase(), F.mono(fs, 600)))) + 48; const th = n * fs * 1.3 + 46;
    ctx.save(); ctx.rotate(tg.rot == null ? -0.42 : tg.rot); ctx.strokeStyle = o.ring || (dark() ? A.bone : ink); ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, r * 0.32); ctx.lineTo(0, r * 0.32 + 40); ctx.stroke();
    const tx = -tw_ / 2, ty = r * 0.32 + 40; fillRR(tx, ty, tw_, th, 10, tg.col || A.card); strokeRR(tx, ty, tw_, th, 10, A.ink, 3); circle(0, ty + 15, 7, A.ink);
    tg.lines.forEach((ln, i) => _txt(ln.toUpperCase(), 0, ty + 30 + (i + 1) * fs * 1.3 - 4, F.mono(fs, 600), tg.ink || A.ink, 'center', 'alphabetic', 1));
    ctx.restore(); }
  ctx.beginPath(); ctx.arc(0, by, r, 0, Math.PI * 2); ctx.fillStyle = fill; ctx.fill(); ctx.lineWidth = lw; ctx.strokeStyle = ink; ctx.stroke();
  if (!o.label) { circle(0, by - r * 0.55, r * 0.17, o.bg || g.bg); ctx.beginPath(); ctx.arc(0, by - r * 0.55, r * 0.17, 0, Math.PI * 2); ctx.stroke(); }
  else themeFixed(() => _txt(o.label, 0, by + r * 0.5, F.disp(o.labelSize || r * 1.2), o.labelCol || ink, 'center'));
  const y0 = by + r * 0.92, y1 = by + r + len * 0.62, bits = o.bits || [0.5, 0.9, 0.3, 0.7, 0.4];
  ctx.beginPath(); ctx.moveTo(-bw / 2, y0); ctx.lineTo(-bw / 2, y1); ctx.lineTo(0, y1 + bw * 0.6); ctx.lineTo(bw / 2, y1 - bw * 0.2);
  const n = bits.length, step = (y1 - bw * 0.4 - (y0 + len * 0.1)) / n;
  for (let i = n - 1; i >= 0; i--) { const yy = y0 + len * 0.1 + i * step; const dd = bw / 2 + bits[i] * bw * 0.75; ctx.lineTo(dd, yy + step * 0.75); ctx.lineTo(dd, yy + step * 0.25); ctx.lineTo(bw / 2, yy); }
  ctx.lineTo(bw / 2, y0); ctx.closePath(); ctx.fillStyle = fill; ctx.fill(); ctx.strokeStyle = ink; ctx.lineWidth = lw; ctx.lineJoin = 'round'; ctx.stroke();
  rect(-bw * 0.12, y0 + len * 0.04, bw * 0.08, y1 - y0 - len * 0.1, ink);
  ctx.restore();
}
/** a damped swing after being hung at t0 (rad); settles in about a second */
const swing = (t, t0, amp = 0.3, f = 1.1, zeta = 0.34) => { const s = t - t0; if (s < 0) return amp; return amp * Math.exp(-zeta * 2 * Math.PI * f * s) * Math.cos(2 * Math.PI * f * s * Math.sqrt(1 - zeta * zeta)); };
/** a key rail: a flat bar with hooks (the place where keys are kept). Returns hook x positions. */
function rail(x, y, w, n, o = {}) { const col = o.col || (dark() ? A.panelN : A.ink); rect(x, y - 14, w, 28, col);
  const xs = []; for (let i = 0; i < n; i++) { const hx = x + w * (i + 0.5) / n; xs.push(hx); hook(hx, y + 10, o.hook || (dark() ? A.midN : A.ink)); } return xs; }
function hook(x, y, col) { ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + 26); ctx.arc(x + 12, y + 26, 12, Math.PI, 0, true); ctx.stroke(); ctx.restore(); }

/* ============ small flat objects ============ */
/** a generic terminal window (dark), lines typed on in order: [{s, at, col}] */
function terminal(t, x, y, w, h, title, lines, o = {}) {
  grp(o.key || 'terminal', x, y, w, h, () => { fillRR(x, y, w, h, 14, o.body || '#0B0806'); if (dark()) strokeRR(x, y, w, h, 14, 'rgba(239,231,216,0.35)', 3);
    rect(x, y + 56, w, 2, 'rgba(239,231,216,0.12)'); [0, 1, 2].forEach(i => circle(x + 34 + i * 30, y + 29, 9, i === 0 ? A.orange : '#4A4038'));
    themeFixed(() => _txt(title, x + w / 2, y + 38, F.mono(28, 500), A.midN, 'center'));
    const fs = o.size || 36, lh = fs * 1.5;
    lines.forEach((ln, i) => { if (t < ln.at) return; const yy = y + 56 + 30 + fs + i * lh; const pre = ln.pre == null ? '$ ' : ln.pre;
      themeFixed(() => { if (pre) _txt(pre, x + 34, yy, F.mono(fs, 500), A.orange, 'left');
        typeText(t, ln.at, ln.s, x + 34 + tw(pre, F.mono(fs, 500)), yy, F.mono(fs, 500), ln.col || A.bone, { cps: ln.cps || 26, key: 'term ' + ln.s, caretTo: ln.caretTo }); }); });
  });
}
/** a flat server box (rack unit) with status lights */
function server(x, y, w, h, o = {}) { const units = o.units || 3; const uh = h / units;
  for (let i = 0; i < units; i++) { fillRR(x, y + i * uh + 4, w, uh - 8, 8, o.col || (dark() ? A.panelN : A.ink)); circle(x + 34, y + i * uh + uh / 2, 9, (o.lit || [])[i] || '#4A4038'); rect(x + 70, y + i * uh + uh / 2 - 4, w * 0.45, 8, dark() ? '#3A3028' : '#3A3028'); } }
/** a closed padlock (address-bar icon size or big) */
function padlock(cx, cy, s, col, o = {}) { const open = o.open || 0; ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = s * 0.16; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.arc(cx, cy - s * 0.18 - open * s * 0.35, s * 0.34, Math.PI, 0); ctx.lineTo(cx + s * 0.34, cy - s * 0.05 - open * s * 0.35); ctx.moveTo(cx - s * 0.34, cy - s * 0.18 - open * s * 0.35); ctx.lineTo(cx - s * 0.34, cy - s * 0.05); ctx.stroke(); ctx.restore();
  fillRR(cx - s * 0.52, cy - s * 0.08, s * 1.04, s * 0.78, s * 0.1, col); circle(cx, cy + s * 0.26, s * 0.09, o.hole || g.bg); }
/** a flat browser address bar with a padlock and a URL (generic) */
function addressBar(x, y, w, h, url, o = {}) {
  fillRR(x, y, w, h, h / 2, o.bar || A.card); if (o.line) strokeRR(x, y, w, h, h / 2, o.line, 2);
  padlock(x + h * 0.6, y + h * 0.5, h * 0.42, o.ink || A.ink, { hole: o.bar || A.card });
  txt(url, x + h * 1.1, y + h / 2 + 2, F.mono(Math.round(h * 0.4), 500), o.ink || A.ink, 'left', 'middle', 0, o.key || ('url ' + url));
}
/** a generic small website tile (a mini browser window): flat bars for content; o.state 0..1 (taken over: orange) */
function siteTile(x, y, w, h, seed, p = 1, taken = 0) {
  withA(p, () => { const bar = h * 0.16; fillRR(x, y, w, h, 6, dark() ? A.panelN : A.card); rect(x, y + bar, w, 2, dark() ? '#3A3028' : A.panelB);
    for (let i = 0; i < 3; i++) circle(x + 10 + i * 10, y + bar / 2, 3, dark() ? '#4A4038' : A.nbB);
    const rows = 3; for (let r = 0; r < rows; r++) rect(x + 10, y + bar + 12 + r * (h - bar - 20) / rows, (w - 20) * (0.4 + 0.5 * hash(seed * 7 + r)), Math.max(4, h * 0.06), dark() ? '#3A3028' : A.panelB);
    if (taken > 0) { ctx.save(); ctx.beginPath(); rr(x, y, w, h, 6); ctx.clip(); rect(x, y, w, h * taken, A.orange); ctx.restore(); }
  });
}
/** a stamp (rotated outline box + word), pressed in at t0 */
function stamp(t, t0, s, cx, cy, size, col, rot = -0.12, key) { const p = ez(t, t0, 0.5, 'outQuint'); if (p <= 0) return;
  const font = F.disp(size); const w = tw(s, font) + size * 0.7, h = size * 1.35; const k = 1 + 0.3 * (1 - clamp(p));
  grp(key || ('stamp ' + s), cx - w / 2, cy - h / 2, w, h, () => withA(clamp(p * 2), () => withT(cx, cy, k, rot, () => { strokeR(-w / 2, -h / 2, w, h, col, Math.max(5, size * 0.08)); txt(s, 0, size * 0.36, font, col, 'center', 'alphabetic', 0, key || s); }))); }
/** a notification card (generic: a sender name, a line) sliding in */
function alertCard(t, at, x, y, w, sender, line, o = {}) { const p = ez(t, at, 0.45); if (p <= 0) return; const h = o.h || 128;
  grp(o.key || ('alert ' + sender), x, y, w, h, () => withA(clamp(p * 2), () => { ctx.save(); ctx.translate(60 * (1 - p), 0);
    fillRR(x, y, w, h, 18, o.bg || A.card); if (!dark()) strokeRR(x, y, w, h, 18, A.ruleB, 2);
    fillRR(x + 26, y + 26, 76, 76, 14, A.orange); _txt('!', x + 64, y + 86, F.disp(58), A.ink, 'center');
    txt(sender, x + 128, y + 54, F.body(34, 800), A.ink, 'left', 'alphabetic', 0, 'alert from ' + sender);
    txt(line, x + 128, y + 98, F.body(30, 600), A.midB, 'left', 'alphabetic', 0, 'alert line ' + sender + ' ' + line);
    if (o.amt) themeFixed(() => _txt(o.amt, x + w - 28, y + 76, F.disp(56), A.orangeT, 'right'));
    ctx.restore(); }));
}
/** a door (flat): frame + leaf that swings open (0..1, drawn as the leaf narrowing) + a lock plate */
function door(x, y, w, h, open, o = {}) { const col = o.col || (dark() ? A.panelN : A.ink);
  rect(x - 16, y - 16, w + 32, 16, col); rect(x - 16, y - 16, 16, h + 16, col); rect(x + w, y - 16, 16, h + 16, col);
  if (open < 1) { const lw_ = w * (1 - open * 0.82); fillRR(x, y, lw_, h, 4, o.leaf || (dark() ? '#3A3028' : A.panelB)); strokeRR(x, y, lw_, h, 4, col, 4);
    if (open < 0.4) { const lx = x + lw_ - 60; fillRR(lx - 22, y + h * 0.5 - 40, 44, 80, 8, A.orange); circle(lx, y + h * 0.5 - 6, 7, A.ink); rect(lx - 3, y + h * 0.5 - 2, 6, 22, A.ink); } }
  if (open > 0) withA(open, () => rect(x + w * (1 - open * 0.82) + 4, y, w * open * 0.82 - 4, h, o.light || A.orange));
}
/** a cursor arrow (flat) */
function arrowCursor(x, y, s = 1, col = A.ink) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, 46); ctx.lineTo(12, 35); ctx.lineTo(21, 54); ctx.lineTo(29, 50); ctx.lineTo(20, 32); ctx.lineTo(36, 32); ctx.closePath();
  ctx.fillStyle = col; ctx.fill(); ctx.lineWidth = 3; ctx.strokeStyle = col === A.ink ? A.bone : A.ink; ctx.stroke(); ctx.restore(); }
/** a big number that counts up (computed text: raw) */
function countUp(t, t0, d, a, b, x, y, size, col, align = 'left', fmt = (n) => n.toLocaleString('en-US')) { const v = Math.round(lerp(a, b, MOTION.ease(t, t0, d, 'outQuint'))); _txt(fmt(v), x, y, F.disp(size), col, align); return v; }
/** a slow push-in on the whole scene (amount 0.03 = 3 % over the scene) */
function push(lt, dur, amount, ax = CX, ay = H / 2) { pushCam(lt, dur, amount, ax, ay); }
