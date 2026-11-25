/* ux-research film kit: "A · The research wall" (her pick, 2026-10-13), with C's vertical dive for the opening question
 * and the closing line. Look in numbers: film/stills/directions/README.md section A.
 *
 * One long deep-green wall holds index cards, sticky notes and polaroids of her. Everything she explains is written on a
 * card or a note on the word she says it, then sorted (clustered, circled, crossed out). The camera travels along the wall
 * from board to board (0.8 s inOutQuart; the engine's adaptive motion blur blurs the travel by its speed), so the wall carries
 * every transition. A paint-marker line runs from each board to the next and draws on with the travel.
 *
 * Model: BOARDS live in one world (landscape: side by side; portrait: stacked, re-laid out with V()). A board draws all its
 * things at absolute video time t in its own 1920x1080 / 1080x1920 space. Studio screens (addScene) are stretches of the
 * timeline; each one draws the whole world through the camera (camAt(t)), so a travel shows both boards. Edit ids use the
 * board's id (SCENE_ID is set per board while it draws), so an edit stays put whichever screen shows it.
 * Every frame is a pure function of t; no Math.random (hash()).
 */
'use strict';

/* ---------- fonts (the film's own faces, OFL; in assets/fonts) ----------
 * The studio's fonts.css is shared, so the film registers its faces itself, synchronously, from the bytes (a FontFace made
 * from an ArrayBuffer is usable at once), before any scene measures text. */
(function uxFonts() {
  const base = FILM.base + 'assets/fonts/';
  const list = [['UXMarker', 'PermanentMarker-Regular.ttf', {}], ['UXHand', 'Caveat.ttf', { weight: '400 700' }],
    ['UXGrot', 'SchibstedGrotesk.ttf', { weight: '400 900' }], ['UXType', 'CourierPrime-Regular.ttf', { weight: '400' }],
    ['UXType', 'CourierPrime-Bold.ttf', { weight: '700' }], ['UXHank', 'HankenGrotesk.ttf', { weight: '100 900' }]];
  for (const [fam, file, desc] of list) {
    const x = new XMLHttpRequest(); x.open('GET', base + file, false); x.overrideMimeType('text/plain; charset=x-user-defined'); x.send();
    if (x.status !== 200) throw new Error('font ' + file + ' ' + x.status);
    const s = x.responseText, u = new Uint8Array(s.length); for (let i = 0; i < s.length; i++) u[i] = s.charCodeAt(i) & 255;
    const ff = new FontFace(fam, u.buffer, desc); document.fonts.add(ff); ff.load();
  }
})();
const FX = {
  marker: (s) => `400 ${s}px UXMarker`,
  hand: (s, w = 600) => `${w} ${s}px UXHand`,
  grot: (s, w = 800) => `${w} ${s}px UXGrot`,
  type: (s, w = 400) => `${w} ${s}px UXType`,
  hank: (s, w = 800) => `${w} ${s}px UXHank`,
};

/* ---------- palette (one accent per board: her headband orange) ---------- */
const UX = {
  wall: '#1D3A32', wall2: '#1D3A33', note: '#FFE15A', ora: '#F26A2E', card: '#FFFDF6', ink: '#17140F', paint: '#F4F0E6',
  credit: '#B8C4BC', redRule: '#E27F76', blueRule: '#C9D6EA', tape: '#E9E3D0', noteInk: '#1A0F08', oraDeep: '#B9461A',
  // the dive (C): paper, strata, bedrock
  paper: '#F3EFE6', s1: '#CFE7E0', s2: '#93CDBF', s3: '#3E9A8B', s4: '#1F5E55', bed: '#0F2B28', dink: '#12201E',
  photo: '#FBFAF6', photoInk: '#24201A', green: '#2F6B5A', blue: '#7FA8E8',
};
// grounds: two identical wall grounds alternate so the engine never whips between screens (the camera travel is the join)
G.wallA = { bg: UX.wall, fg: UX.paint, mid: UX.credit, line: '#2C5247', acc: UX.ora, card: UX.card, panel: UX.card, grid: 'rgba(0,0,0,0)', mode: 'dark' };
G.wallB = { bg: UX.wall2, fg: UX.paint, mid: UX.credit, line: '#2C5247', acc: UX.ora, card: UX.card, panel: UX.card, grid: 'rgba(0,0,0,0)', mode: 'dark' };
G.surf = { bg: UX.paper, fg: UX.dink, mid: '#4F5B58', line: '#C9C2B4', acc: UX.ora, card: UX.card, panel: UX.card, grid: 'rgba(0,0,0,0)', mode: 'light' };
// light alternative of the wall: a paper wall; paint-marker words turn ink, credits a dark grey-green; notes, cards, orange keep
themeMap('light', 'ground', [[UX.wall, '#E8E3D7'], [UX.wall2, '#E8E3D7']]);
themeMap('light', 'surface', [[UX.wall, '#E8E3D7'], [UX.wall2, '#E8E3D7'], [UX.bed, '#E8E3D7']]);
themeMap('light', 'mark', [[UX.paint, UX.ink], [UX.credit, '#46524C'], ['#2C5247', '#C9C2B4']]);
THEME.edges.light = (THEME.edges.light || []).concat([{ col: UX.card, line: 'rgba(23,20,15,0.35)' }]);
// dark alternative of the dive: the paper turns the wall green, its ink text paper
themeMap('dark', 'ground', [[UX.paper, UX.bed]]);
themeMap('dark', 'surface', [[UX.paper, UX.bed]]);
themeMap('dark', 'mark', [[UX.dink, UX.paint], ['#4F5B58', UX.credit]]);

/* ---------- text with edit ids ---------- */
const _lines = new Map();
/** wrap str into lines no wider than maxW in font (cache); '\n' forces a break */
function wrapLines(str, font, maxW, ls = 0) {
  const key = str + '|' + font + '|' + maxW + '|' + ls; if (_lines.has(key)) return _lines.get(key); if (_lines.size > 4000) _lines.clear();   // bounded: a long export must not grow memory
  const out = [];
  for (const part of String(str).split('\n')) { let cur = ''; for (const w of part.split(' ').filter(Boolean)) { const nx = cur ? cur + ' ' + w : w; if (cur && tw(nx, font, ls) > maxW) { out.push(cur); cur = w; } else cur = nx; } out.push(cur); }
  // no single short word alone on a last line: pull one word down when it fits
  if (out.length > 1) { const last = out[out.length - 1]; if (!last.includes(' ')) { const prev = out[out.length - 2].split(' '); if (prev.length > 2) { const mv = prev.pop(); const nl = mv + ' ' + last; if (tw(nl, font, ls) <= maxW) { out[out.length - 2] = prev.join(' '); out[out.length - 1] = nl; } } } }
  _lines.set(key, out); return out;
}
/** fit text in a box: shrink from size until it fits w x h. returns {size, lines, lh} */
const _fit = new Map();
function fitText(str, mk, w, h, size, lhK = 1.04, minSize = 18, ls = 0) {
  const key = [str, mk(10), w, h, size, lhK, ls].join('|'); if (_fit.has(key)) return _fit.get(key); if (_fit.size > 4000) _fit.clear();
  let s = size, L;
  for (; s >= minSize; s -= 2) { L = wrapLines(str, mk(s), w, ls * s); const widest = Math.max(...L.map(l => tw(l, mk(s), ls * s))); if (widest <= w && L.length * s * lhK <= h) break; }
  const r = { size: s, lines: L, lh: s * lhK }; _fit.set(key, r); return r;
}
/** the text an element shows (her edit or the default) */
function TX(key, def) { const o = ovr(key); return { o, s: o.s != null ? o.s : def }; }
/** a block of lines, editable: o = {font: size => font string, size, col, align, lh, maxW, ls (em), key} */
function textBlock(key, def, x, y, o) {
  const { o: ov, s } = TX(key, def); const size = o.size, font = o.font(size), ls = (o.ls || 0) * size;
  const lines = o.maxW ? wrapLines(s, font, o.maxW, ls) : String(s).split('\n'); const lh = o.lh || size * 1.1;
  const wMax = Math.max(...lines.map(l => tw(l, font, ls))); const al = o.align || 'left';
  const bx = al === 'center' ? x - wMax / 2 : al === 'right' ? x - wMax : x;
  const box = [bx, y - size * 0.82, wMax, (lines.length - 1) * lh + size * 1.08];
  if (ov.hide) { regBox(ov, ...box, { text: s, def }); return { lines, lh, w: wMax, h: box[3] }; }
  moved(ov, () => { lines.forEach((ln, k) => _txt(ln, x, y + k * lh, font, o.col, al, 'alphabetic', ls)); regBox(ov, ...box, { text: s, def }); });
  return { lines, lh, w: wMax, h: box[3], box };
}

/* ---------- paper things ---------- */
function shadowOn(blur, oy, a) { ctx.shadowColor = `rgba(0,0,0,${a})`; ctx.shadowBlur = blur; ctx.shadowOffsetY = oy; ctx.shadowOffsetX = 0; }
function shadowOff() { ctx.shadowColor = 'rgba(0,0,0,0)'; ctx.shadowBlur = 0; ctx.shadowOffsetY = 0; }
/** the slap: lands like a sticky note slapped on a wall (spring 2.6 Hz, damping 0.58, from scale 1.32, +9 deg, y -36);
 *  returns null before t0, else {a, sc, r, dy, sh: [blur, oy]} */
function slapAt(t, t0, o = {}) {
  if (typeof t0 !== 'number' || isNaN(t0)) throw new Error('slap without a time');
  const lt = t - t0; if (lt < 0) return null;
  const p = MOTION.spring(lt, o.z || 0.58, o.f || 2.6), q = E.outExpo(prog(lt, 0, 0.35));
  return { a: clamp(lt / 0.07), sc: lerp(o.from ?? 1.32, 1, p), r: ((o.rot || 0) + lerp(o.spin ?? 9, 0, p)) * Math.PI / 180,
    dy: lerp(o.dy ?? -36, 0, p), dx: o.dx ? lerp(o.dx, 0, p) : 0, sh: [lerp(23, 8, q) * (o.lift ?? 1), lerp(30, 9, q) * (o.lift ?? 1)] };
}
/** exit for paper things: o.out = time it is pulled off (0.3 s, inExpo, drops + fades) */
function outK(t, out) { if (out == null) return 1; return 1 - MOTION.ease(t, out, 0.3, 'inExpo'); }
/** a sticky note: square s, Permanent Marker text fitted inside, slapped on at o.t. Editable text, movable. */
function note(t, key, x, y, s, text, o = {}) {
  const S = slapAt(t, o.t, { rot: o.rot || 0, from: o.from, spin: o.spin, dy: o.dy, dx: o.dx }); if (!S) return;
  const k = outK(t, o.out); if (k <= 0) return;
  const { o: ov, s: str } = TX(key, text); const h = o.h || s;
  const cx = x + s / 2, cy = y + h * 0.08;
  const box = [x, y, s, h];
  if (ov.hide) { regBox(ov, ...box, { text: str, def: text }); return; }
  moved(ov, () => {
    ctx.save(); ctx.globalAlpha *= S.a * k; ctx.translate(cx + S.dx, cy + S.dy + (1 - k) * 60); ctx.rotate(S.r); ctx.scale(S.sc, S.sc); ctx.translate(-cx, -cy);
    shadowOn(S.sh[0], S.sh[1], 0.42); rect(x, y, s, h, o.bg || UX.note); shadowOff();
    if (o.scribble) scribbles(x, y, s, o.seed || 1);
    else if (str) {
      const pad = o.pad ?? s * 0.09; const F_ = fitText(str, FX.marker, s - 2 * pad, h - 2 * pad, o.fs || 46, 1.06, 16);
      const y0 = y + h / 2 - (F_.lines.length * F_.lh) / 2 + F_.size * 0.82;
      F_.lines.forEach((ln, i) => _txt(ln, cx, y0 + i * F_.lh, FX.marker(F_.size), o.ink || (o.bg === UX.ora ? UX.noteInk : UX.ink), 'center'));
    }
    if (o.after) o.after(x, y, s, h);
    ctx.restore();
    regBox(ov, ...box, { text: str, def: text });
  });
}
/** illegible marker lines on a note (stand-in for real notes; boards that use it carry an "Illustration" credit) */
function scribbles(x, y, s, seed) {
  const n = 3 + Math.floor(hash(seed) * 2); ctx.save(); ctx.strokeStyle = 'rgba(42,38,32,0.8)'; ctx.lineWidth = s * 0.028; ctx.lineCap = 'round'; ctx.beginPath();
  for (let i = 0; i < n; i++) { const yy = y + s * (0.26 + i * 0.17), x0 = x + s * 0.14, x1 = x + s * (0.55 + hash(seed * 7 + i) * 0.32);
    ctx.moveTo(x0, yy); for (let xx = x0; xx < x1; xx += s * 0.03) ctx.lineTo(xx + s * 0.03, yy + Math.sin((xx - x0) / (s * 0.03) * 1.6) * s * 0.018); }
  ctx.stroke(); ctx.restore();
}
/** an index card (ruled: red head rule + pale blue lines, printed, not a gradient), slapped on at o.t; inner(x, y, w, h)
 *  draws its content in card coordinates. A movable / resizable box ('@' + key). */
function card(t, key, x, y, w, h, o, inner) {
  const S = slapAt(t, o.t, { rot: o.rot || 0, from: o.from ?? 1.1, spin: o.spin ?? 3, dy: o.dy ?? -24 }); if (!S) return;
  const k = outK(t, o.out); if (k <= 0) return;
  grp(key, x, y, w, h, () => {
    const cx = x + w / 2, cy = y + h / 2;
    ctx.save(); ctx.globalAlpha *= S.a * k; ctx.translate(cx, cy + S.dy + (1 - k) * 60); ctx.rotate(S.r); ctx.scale(S.sc, S.sc); ctx.translate(-cx, -cy);
    shadowOn(S.sh[0] * 0.9, S.sh[1] * 0.8, 0.38); rect(x, y, w, h, o.bg || UX.card); shadowOff();
    if (o.lines !== false) {
      const head = o.head || 92, lh = o.lh || 52;
      rect(x, y + head, w, 3, UX.redRule);
      for (let yy = head + lh; yy < h - 10; yy += lh) rect(x, y + yy, w, 2, UX.blueRule);
    }
    if (inner) inner(x, y, w, h);
    ctx.restore();
  });
}
/** a strip of masking tape */
function tapeStrip(x, y, w, rot, a = 1) { withA(a, () => withT(x, y, 1, rot * Math.PI / 180, () => { rect(-w / 2, -20, w, 40, 'rgba(233,227,208,0.82)'); })); }
/** a polaroid of her (never flipped): img key in IMG, caption in Caveat. Movable / resizable photo. */
function polaroid(t, key, x, y, w, img, cap, o = {}) {
  const S = slapAt(t, o.t, { rot: o.rot || 0, from: o.from ?? 1.15, spin: o.spin ?? 6 }); if (!S) return;
  const k = outK(t, o.out); if (k <= 0) return;
  const pad = w * 0.06, ph = (w - 2 * pad) * (o.ar || 1), h = pad + ph + w * 0.24;
  grp(key, x, y, w, h, () => {
    const cx = x + w / 2, cy = y + h * 0.1;
    ctx.save(); ctx.globalAlpha *= S.a * k; ctx.translate(cx, cy + S.dy + (1 - k) * 60); ctx.rotate(S.r); ctx.scale(S.sc, S.sc); ctx.translate(-cx, -cy);
    themeFixed(() => {
      shadowOn(S.sh[0], S.sh[1], 0.42); rect(x, y, w, h, UX.photo); shadowOff();
      const im = IMG[img];
      if (im) { const iw = w - 2 * pad; const r = Math.max(iw / im.width, ph / im.height); const sw = iw / r, sh = ph / r; const px = o.pos ? o.pos[0] : 0.5, py = o.pos ? o.pos[1] : 0.32;
        ctx.drawImage(im, (im.width - sw) * px, (im.height - sh) * py, sw, sh, x + pad, y + pad, iw, ph); }
      else rect(x + pad, y + pad, w - 2 * pad, ph, '#333');
      if (cap) { const fs = o.fs || Math.max(30, w * 0.1); _txt(TX(key + ' caption', cap).s, cx, y + pad + ph + w * 0.12 + fs * 0.3, FX.hand(fs, 700), UX.photoInk, 'center'); }
    });
    if (o.tape !== false) tapeStrip(cx, y + 4, w * 0.42, (o.rot || 0) * -1.5 + 3, 1);
    ctx.restore();
  }, { img: true });
}
/** a pinned screenshot of a real source (never recoloured), credit under it; o.hl = [[x,y,w,h,t0]] highlight boxes in
 *  image pixels (marker yellow block behind, drawn on left to right) */
function sourceShot(t, key, x, y, w, img, o = {}) {
  const S = slapAt(t, o.t, { rot: o.rot || 0, from: 1.06, spin: o.spin ?? 2, dy: -20 }); if (!S) return;
  const k = outK(t, o.out); if (k <= 0) return;
  const im = IMG[img]; const sc = w / (o.crop ? o.crop[2] : im.width); const cr = o.crop || [0, 0, im.width, im.height]; const h = cr[3] * sc;
  grp(key, x, y, w, h, () => {
    const cx = x + w / 2, cy = y + h / 2;
    ctx.save(); ctx.globalAlpha *= S.a * k; ctx.translate(cx, cy + S.dy + (1 - k) * 60); ctx.rotate(S.r); ctx.scale(S.sc, S.sc); ctx.translate(-cx, -cy);
    themeFixed(() => {
      shadowOn(S.sh[0], S.sh[1], 0.4); rect(x - 14, y - 14, w + 28, h + 28, '#FFFFFF'); shadowOff();
      ctx.drawImage(im, cr[0], cr[1], cr[2], cr[3], x, y, w, h);
      for (const [hx, hy, hw, hh, ht] of o.hl || []) { const p = MOTION.ease(t, ht, 0.45, 'outQuint'); if (p <= 0) continue;
        ctx.save(); ctx.globalCompositeOperation = 'multiply'; rect(x + (hx - cr[0]) * sc - 6, y + (hy - cr[1]) * sc, (hw * sc + 12) * p, hh * sc, 'rgba(255,225,90,0.85)'); ctx.restore(); }
    });
    tapeStrip(x + w * 0.12, y - 6, 150, -8); tapeStrip(x + w * 0.88, y - 6, 150, 7);
    ctx.restore();
  }, { img: true });
}

/* ---------- marker strokes ---------- */
/** draw a polyline [[x,y],...] up to fraction p of its length */
function strokePts(pts, p, col, lw, o = {}) {
  if (p <= 0 || pts.length < 2) return;
  let L = 0; const seg = []; for (let i = 1; i < pts.length; i++) { const d = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(d); L += d; }
  let rem = L * clamp(p); ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.globalAlpha *= o.a ?? 0.96;
  ctx.beginPath(); ctx.moveTo(pts[0][0], pts[0][1]);
  for (let i = 1; i < pts.length && rem > 0; i++) { const f = Math.min(1, rem / seg[i - 1]); ctx.lineTo(lerp(pts[i - 1][0], pts[i][0], f), lerp(pts[i - 1][1], pts[i][1], f)); rem -= seg[i - 1]; }
  ctx.stroke(); ctx.restore();
}
/** a marker stroke drawn on between t0 and t0 + d (outQuint) */
function stroke(t, pts, t0, d, col = UX.paint, lw = 9) { if (typeof t0 !== 'number' || isNaN(t0)) throw new Error('stroke without a time'); strokePts(pts, MOTION.ease(t, t0, d, 'outQuint'), col, lw); }
/** hand loop around a box, slightly open like a real marker circle */
const _loops = new Map();
function loopPts(x, y, w, h, seed = 1, pad = 24) {
  const key = [x, y, w, h, seed, pad].join(','); if (_loops.has(key)) return _loops.get(key); if (_loops.size > 2000) _loops.clear();
  const cx = x + w / 2, cy = y + h / 2, rx = w / 2 + pad, ry = h / 2 + pad * 0.85; const out = [];
  for (let i = 0; i <= 64; i++) { const a = -2.2 + (i / 64) * Math.PI * 2.12, wob = 1 + (hash(seed * 31 + i) - 0.5) * 0.035; out.push([cx + Math.cos(a) * rx * wob, cy + Math.sin(a) * ry * wob * (1 + i / 400)]); }
  _loops.set(key, out); return out;
}
/** a wavy hand line from a to b */
function wavyPts(x1, y1, x2, y2, amp = 10, seed = 1, n = 40) {
  const out = []; for (let i = 0; i <= n; i++) { const u = i / n; out.push([lerp(x1, x2, u) + Math.sin(u * 7 + seed) * amp * 0.3, lerp(y1, y2, u) + Math.sin(u * 5.3 + seed * 2) * amp]); } return out;
}
/** an arrow (marker): shaft points + a two-stroke head that draws after the shaft */
function arrowStroke(t, pts, t0, d, col = UX.paint, lw = 8) {
  stroke(t, pts, t0, d, col, lw);
  const n = pts.length, [x2, y2] = pts[n - 1], [x1, y1] = pts[Math.max(0, n - 4)]; const a = Math.atan2(y2 - y1, x2 - x1), hl = lw * 4.2;
  const hp = MOTION.ease(t, t0 + d * 0.85, 0.2, 'outQuint');
  strokePts([[x2 - Math.cos(a - 0.5) * hl, y2 - Math.sin(a - 0.5) * hl], [x2, y2], [x2 - Math.cos(a + 0.5) * hl, y2 - Math.sin(a + 0.5) * hl]], hp, col, lw);
}
/** paint-marker words written on the wall (clip reveal left -> right, t0..t1). Editable. */
function wallWord(t, key, text, x, y, size, col, t0, t1, o = {}) {
  if (isNaN(t0) || isNaN(t1)) throw new Error('wallWord without a time: ' + key); if (t < t0 || outK(t, o.out) <= 0) return; const { o: ov, s } = TX(key, text); const font = (o.font || FX.marker)(size); const al = o.align || 'left';
  const w = tw(s, font, 0); const bx = al === 'center' ? x - w / 2 : al === 'right' ? x - w : x; const box = [bx, y - size * 0.86, w, size * 1.1];
  if (ov.hide) { regBox(ov, ...box, { text: s, def: text }); return; }
  moved(ov, () => { const k = MOTION.ease(t, t0, t1 - t0, 'outQuint') * outK(t, o.out);
    ctx.save(); ctx.beginPath(); ctx.rect(bx - size * 0.1, y - size * 1.3, (w + size * 0.25) * k, size * 1.9); ctx.clip(); ctx.globalAlpha *= outK(t, o.out);
    _txt(s, x, y, font, col, al); ctx.restore(); regBox(ov, ...box, { text: s, def: text }); });
}
/** a small typed credit / label on the wall (Courier Prime, >= 44 px landscape, 36 px portrait) */
function credit(t, key, text, x, y, t0, o = {}) { if (typeof t0 !== 'number' || isNaN(t0)) throw new Error('credit without a time: ' + key);
  const k = MOTION.ease(t, t0, 0.35, 'outExpo') * outK(t, o.out); if (k <= 0) return;
  withA(k, () => withT(0, (1 - k) * 12, 1, 0, () => textBlock(key, text, x, y, { font: (s) => FX.type(s, o.w || 400), size: o.size || 44, col: o.col || UX.credit, align: o.align, maxW: o.maxW, lh: o.lh })));
}
/** typed text on a card: words appear on her word times (Courier Prime bold), editable */
function typedWords(t, key, text, x, y, size, col, times, o = {}) {
  const { o: ov, s } = TX(key, text); const font = FX.type(size, o.w || 700); const maxW = o.maxW || 1e9; const lh = o.lh || size * 1.25;
  const lines = wrapLines(s, font, maxW); const ws = []; lines.forEach((ln, li) => { let xx = 0; ln.split(' ').forEach((w) => { ws.push({ w, x: xx, li }); xx += tw(w + ' ', font); }); });
  const wMax = Math.max(...lines.map(l => tw(l, font))); const box = [x, y - size * 0.82, wMax, (lines.length - 1) * lh + size * 1.1];
  if (ov.hide) { regBox(ov, ...box, { text: s, def: text }); return; }
  moved(ov, () => { let any = false; ws.forEach((w, i) => { const ti = times[Math.min(i, times.length - 1)] ?? times[times.length - 1]; if (typeof ti !== 'number' || isNaN(ti)) throw new Error('typed word without a time: ' + key); const p = prog(t, ti, 0.12); if (p <= 0) return; any = true;
    withA(p, () => _txt(w.w, x + w.x, y + w.li * lh, font, col, 'left')); }); if (any) regBox(ov, ...box, { text: s, def: text }); });
}
/** times for n words spread over a phrase (her word times when the counts match) */
const TW = (ph, n) => TM(ph, n);

/* ---------- people (C's figures, for the dive and the bedrock) ---------- */
function person(x, y, s, col, a = 1) { withA(a, () => { circle(x, y - s * 0.95, s * 0.28, col); ctx.beginPath(); ctx.moveTo(x - s * 0.5, y); ctx.quadraticCurveTo(x - s * 0.5, y - s * 0.62, x, y - s * 0.62); ctx.quadraticCurveTo(x + s * 0.5, y - s * 0.62, x + s * 0.5, y); ctx.closePath(); ctx.fillStyle = col; ctx.fill(); }); }

/* ---------- the world: boards + camera ---------- */
// x, y, z may be a number, [landscape, portrait] or a function (layouts are chosen at draw time: the editor switches aspect live)
const val = (v) => (Array.isArray(v) ? V(v[0], v[1]) : typeof v === 'function' ? v() : v);
const BOARDS = [];   // {id, i, x, y, draw(t)}  x, y = world origin of the board (per layout)
const CAMK = [];     // camera keys {t (move start), d, x, y, z, ease}
let BOARD_ID = '';
const BW = () => (PORTRAIT ? 1080 : 1920), BH = () => (PORTRAIT ? 1920 : 1080);
/** board size along the wall: o.span = [landscape widths, portrait heights] (default 1 viewport) */
const bspan = (b) => val(b.o.span || 1);
const bsize = (b) => (PORTRAIT ? [1080, 1920 * bspan(b)] : [1920 * bspan(b), 1080 * (b.o.hL || 1)]);
/** where a board sits on the wall: landscape side by side (480 px of wall between) with a gentle up / down; portrait stacked
 *  with a gentle left / right. Computed per layout (the editor switches aspect live). */
const _xy = { layout: null, list: [] };
function bxy(b) {
  if (_xy.layout !== LAYOUT || _xy.list.length !== BOARDS.length) {
    _xy.layout = LAYOUT; _xy.list = []; let acc = 0;
    for (const bb of BOARDS) { const sz = bsize(bb);
      if (bb.o.at) { _xy.list.push(val(bb.o.at)); continue; }
      _xy.list.push(PORTRAIT ? [Math.round((hash(bb.i * 3.1) - 0.5) * 420), acc] : [acc, Math.round((hash(bb.i * 1.7) - 0.5) * 560)]);
      acc += (PORTRAIT ? sz[1] : sz[0]) + 900; }
  }
  return _xy.list[b.i];
}
/** board(id, draw, o): adds a board at the next place on the wall; draw(t) uses board-local coordinates. o.span, o.from */
function board(id, draw, o = {}) { const b = { id, i: BOARDS.length, draw, o }; BOARDS.push(b); return b; }
/** camera key: at time t start moving to (x, y) in board b's local space (centre of the view), zoom z, over d seconds */
function cam(t, b, x, y, z = 1, d = 0.8, ease = 'inOutQuart') { CAMK.push({ t, d, lx: x, ly: y, lz: z, ease, b }); CAMK.sort((a, c) => a.t - c.t); }
const camW = (k) => { const [ox, oy] = bxy(k.b); return [ox + val(k.lx), oy + val(k.ly), val(k.lz)]; };
/** camera on a board's centre (whole board in view) */
const camBoard = (t, b, d = 0.8, z = 1) => cam(t, b, () => BW() / 2, () => BH() / 2, z, d);
/** a frame-sized view at offset (fx, fy) viewports into a wide / tall board */
const camPart = (t, b, fx, fy, d = 0.8, z = 1) => cam(t, b, () => BW() * (fx + 0.5), () => BH() * (fy + 0.5), z, d);
function camAt(t) {
  if (!CAMK.length) return { x: BW() / 2, y: BH() / 2, z: 1 };
  // the slow push while the camera rests (no dead holds): +3 % over 12 s after a move lands (then +0.12 % a second), eased; the next move starts from
  // the pushed framing, so the camera never jumps
  const pushF = (dt) => (dt <= 0 ? 0 : V(0.03, 0.03) * (0.5 - 0.5 * Math.cos(Math.PI * clamp(dt / 9))) + V(0.0015, 0.0016) * Math.max(0, dt - 9));   // then keeps creeping on long rests
  let [x, y, z] = camW(CAMK[0]); let cur = 0;
  for (let i = 1; i < CAMK.length; i++) { const k = CAMK[i]; if (t <= k.t) break; cur = i;
    z *= 1 + pushF(k.t - (CAMK[i - 1].t + CAMK[i - 1].d));
    const p = MOTION.ease(t, k.t, k.d, k.ease); const [kx, ky, kz] = camW(k); x = lerp(x, kx, p); y = lerp(y, ky, p); z = lerp(z, kz, p); }
  z *= 1 + pushF(t - (CAMK[cur].t + CAMK[cur].d));
  return { x, y, z };
}
/** marker connector lines between consecutive boards (drawn on during the travel into the next board) */
const LINKS = [];   // {a, b, t0, d}
function link(a, b, t0, d = 0.8) { LINKS.push({ a, b, t0, d }); }
function linkPts(l) {
  const [ax, ay] = bxy(l.a), [bx, by] = bxy(l.b), [aw, ah] = bsize(l.a);
  if (PORTRAIT) return wavyPts(ax + 540 + 160, ay + ah + 300, bx + 540 - 160, by - 300, 14, l.a.i + 1, 24);
  return wavyPts(ax + aw + 300, ay + 540 + 200, bx - 300, by + 540 - 200, 20, l.a.i + 1, 24);
}
/* portrait framing: the boards are laid out on 1080 x 1920, but a phone shows content in y 370..1440 (platform UI + captions);
 * the portrait camera therefore looks at the board's band 400..1640 (centre 1020) and maps it into the safe band (centre 906)
 * at 0.8 (so portrait layouts keep their content in local y 400..1640), so nothing sits under the captions or the app buttons. */
const PFRAME = { z: 0.8, dy: 60, cy: 906 };
// landscape: the same idea, gentler: the board's 110..1810 x 50..1030 stays inside the 96 / 54 px title-safe margins
const LFRAME = { z: 0.95, dy: 0, cy: 540 };
const FR = () => (PORTRAIT ? PFRAME : LFRAME);
function drawWorld(t) {
  const c = camAt(t); const keepId = SCENE_ID;
  const pz = FR().z, py = FR().cy;
  ctx.save(); ctx.translate(W / 2, py); ctx.scale(c.z * pz, c.z * pz); ctx.translate(-c.x, -c.y - FR().dy);
  const vw = W / (c.z * pz) / 2 + 260, vh = H / (c.z * pz) / 2 + 260;
  for (const l of LINKS) { if (t < l.t0) continue; const p = MOTION.ease(t, l.t0, l.d * 0.9, 'inOutQuart'); strokePts(linkPts(l), p, UX.paint, 7, { a: 0.55 }); }
  for (const b of BOARDS) {
    const [ox, oy] = bxy(b); const [bw_, bh_] = bsize(b); if (ox + bw_ < c.x - vw || ox > c.x + vw || oy + bh_ < c.y - vh || oy > c.y + vh) continue;
    if (b.o.from != null && t < b.o.from - 0.5) continue;
    SCENE_ID = b.id; BOARD_ID = b.id; ctx.save(); ctx.translate(ox, oy); b.draw(t); ctx.restore();
  }
  ctx.restore(); SCENE_ID = keepId;
}
/** a studio screen: a stretch of the timeline from start, drawn through the camera. ground alternates wallA / wallB. */
let _gAlt = 0;
function screen(start, id, label, o = {}) {
  const ground = o.ground || ((_gAlt++ % 2) ? 'wallB' : 'wallA');
  addScene(start, ground, label, (t) => { if (o.draw) o.draw(t); else drawWorld(t); }, { id });
}

/* ---------- small helpers ---------- */
/** her phrase, after the cursor */
const ph = (q) => P(q);
/** word time of the n-th word of a phrase (negative from the end) */
const wt = (p, n) => (n < 0 ? p.w[p.w.length + n] : p.w[n]);
/** n items in a grid: cols per row, cell w x h, origin -> [[x, y], ...] (rows centred when short) */
function gridXY(n, cols, x0, y0, cw, chh, totalW) {
  const out = []; for (let i = 0; i < n; i++) { const r = Math.floor(i / cols), c = i % cols; const inRow = Math.min(cols, n - r * cols);
    const off = totalW ? (totalW - inRow * cw) / 2 : 0; out.push([x0 + off + c * cw, y0 + r * chh]); } return out;
}
/** a deterministic tilt in degrees for item i */
const tilt = (i, amp = 4) => Math.round(((hash(i * 7.3 + 1) - 0.5) * 2 * amp) * 10) / 10;
// (debug) name the caller of a bad cue
{ const _sfx0 = sfx; sfx = function (n, t, ...r) { if (t == null || isNaN(t)) throw new Error('bad sfx ' + n + ' at ' + (new Error().stack.split('\n')[2] || '')); return _sfx0(n, t, ...r); }; }
