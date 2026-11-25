/* scholarships film kit: "NOW BOARDING" (her pick 2026-11-02: direction B for the whole video + C's city photos per country).
 * The 2027 intake is a departures board. Each scholarship is a flight with a CLOSES time and a STATUS. Split-flap letters
 * flip on her words. Signal green #2FD27A ONLY ever means "you can still apply" (open / admission open); closed, passed or
 * not-open rows are grey. Grounds: terminal graphite (dark; a light alternative exists), black (phrase cards, corrections).
 * Real official pages are cropped, never changed, with a source line and "checked 2 Nov 2026". Pexels city photos per
 * country (credits in film/assets/CREDITS.md). Pure functions of time: no timers, no Math.random (hash()).
 * Loaded by the film AND by the talking-head edit (talking-head.json "common": ../film/scenes/kit.js). */
'use strict';
const NB = { ground: '#1B1D21', flap: '#0E0F11', flipTop: '#16181B', split: '#2A2D33', let: '#F3F0E8', dim: '#7A7F87', go: '#2FD27A', goT: '#5BE59A',
  black: '#0A0A0B', paper: '#F3F0E8', paperInk: '#16181B', paperMid: '#6A6760', hl: '#7FE9AE', panel: '#25282D', line: 'rgba(243,240,232,0.14)',
  lightGround: '#E9E6DE', lightMid: '#5E626A', goDeep: '#12924F', hlDim: '#D9D3C4' };
// Type set 06 Ultra condensed (her pick 2026-11-07, inspiration/know-how/TYPE-SYSTEM.md): League Gothic + Inter Tight (+ DM Mono).
// Not declared in studio/runtime/fonts.css yet: loaded here from library/fonts and READY is held until they are in.
(() => {
  if (typeof FontFace === 'undefined' || window.__NB_FONTS) return; window.__NB_FONTS = true;
  const base = '/library/fonts/';
  const fs = [['League Gothic', 'LeagueGothicRegular.ttf', '400'], ['Inter Tight', 'InterTightMedium.ttf', '500'], ['Inter Tight', 'InterTightSemiBold.ttf', '600'], ['Inter Tight', 'InterTightBold.ttf', '700']]
    .map(([n, f, w]) => { const ff = new FontFace(n, `url(${base}${f})`, { weight: w }); document.fonts.add(ff); return ff.load(); });
  let ok = false, want = !!window.READY;
  Promise.all(fs).then(() => { ok = true; _lay.clear(); try { dispatchEvent(new Event('resize')); } catch (e) { } }).catch(e => console.error('type set 06 fonts', e));
  try { Object.defineProperty(window, 'READY', { configurable: true, get: () => want && ok, set: (v) => { want = !!v; } }); } catch (e) { }
})();
F.disp = (s) => `400 ${Math.round(s * 1.3)}px "League Gothic"`;   // set 06: League Gothic is narrow, so every headline is set 30 % larger (her rule: headlines fill the frame)
F.flap = (s, w) => `400 ${s * 1.12}px "League Gothic"`;
F.body = (s, w = 500) => `${w >= 600 ? 600 : 500} ${s}px "Inter Tight"`;
F.serif = (s) => `600 ${s}px "Inter Tight"`;   // set 06 has no serif: accent words in Inter Tight
F.mono = (s, w = 500) => `${w} ${s}px "DM Mono"`;
LS.disp = 0.0; LS.body = -0.01; LS.serif = -0.01; LS.mono = 0.08;

G.term = { bg: NB.ground, fg: NB.let, mid: NB.dim, line: NB.line, acc: NB.go, card: NB.paper, panel: NB.panel, grid: NB.line, mode: 'dark', altKey: 'termL' };
G.black = { bg: NB.black, fg: NB.let, mid: NB.dim, line: NB.line, acc: NB.go, card: NB.paper, panel: NB.panel, grid: NB.line };   // phrase cards + corrections: no alternative
G.termL = { bg: NB.lightGround, fg: NB.paperInk, mid: NB.lightMid, line: 'rgba(22,24,27,0.16)', acc: NB.goDeep, card: '#FFFFFF', panel: '#D9D5CB', grid: 'rgba(22,24,27,0.1)', mode: 'light', altKey: 'term' };
// light alternative of a graphite screen: the ground goes light, text on it goes ink; the flap cells (objects) keep their colour
themeMap('light', 'ground', [[NB.ground, NB.lightGround]]);
themeMap('light', 'mark', [[NB.let, NB.paperInk], [NB.dim, NB.lightMid], [NB.go, NB.goDeep], [NB.line, 'rgba(22,24,27,0.16)']]);
themeMap('light', 'surface', [[NB.panel, '#D9D5CB']]);
themeMap('dark', 'ground', [[NB.lightGround, NB.ground]]);
themeMap('dark', 'mark', [[NB.paperInk, NB.let], [NB.lightMid, NB.dim], [NB.goDeep, NB.go]]);
THEME.text = [NB.let, NB.paperInk];

const ez = (t, t0, d, k = 'outQuint') => MOTION.ease(t, t0, d, k);
const io = (t, t0, d) => MOTION.ease(t, t0, d, 'inOutQuart');
const CUE_LAG = (typeof FOOT === 'undefined') ? 0.08 : 0;   // film: soundqa measured cues ~90 ms early vs the first changed frame
const cue = (name, t, db = 0) => sfx(name, t + CUE_LAG, db, { keep: true });
/** frame rect for a full-screen composition (16:9 margins / 9:16 content band) */
const FR = () => V({ x: 110, y: 96, w: 1700, h: 888 }, { x: 64, y: 380, w: 952, h: 1050 });
/** editable mono label, letter-spaced caps */
const lab = (s, x, y, size = 32, col, align = 'left', o = {}) => mono(s, x, y, size, col || g.mid, align, { ls: 0.08, fixed: true, ...o });
/** editable display line (Barlow Condensed 800, caps), no animation */
const dtxt = (s, x, y, size, col, align = 'left', key) => txt(s.toUpperCase(), x, y, F.disp(size), col || g.fg, align, 'alphabetic', 0, key || s);

/* ---------- split-flap ---------- */
const GLY = 'ABCDEFGHIJKLMNOPRSTUVWXYZ0123456789';
/** the colour a status word takes: go (still open) / dim (closed, passed, not open) / let */
const stCol = (st) => (st === 'go' ? NB.go : st === 'dim' ? NB.dim : NB.let);
/** one row of flap cells. o: x, y, n (cells, grows to fit the text), cw, ch, size (glyph px), text, key (edit key), t0, stag
 *  (s between cells), col (or colFn(i)), prev (text shown before t0), prevCol, gap (px between cells), align 'left'|'center' (pad).
 *  Each cell flips through 3-7 glyphs at 0.05 s, then lands. The whole row is one editable text (click to rewrite it). */
function flaps(t, o) {
  const ov = ovr(o.key || o.text); let s = String(ov.s != null ? ov.s : o.text).toUpperCase();
  const gap = o.gap == null ? Math.max(3, Math.round(o.cw * 0.09)) : o.gap; let n = o.fixedN ? Math.max(o.n || 0, s.length) : Math.max(1, s.length + ((o.n || 0) > s.length ? 1 : 0));   // a row is its text + one spare tile (board columns keep their width: fixedN)
  if (o.align === 'center' && s.length < n) { const p = Math.floor((n - s.length) / 2); s = ' '.repeat(p) + s; }
  const prev = o.prev != null ? String(o.prev).toUpperCase() : ''; const t0 = o.t0 == null ? -99 : o.t0, stag = Math.min(o.stag == null ? 0.03 : o.stag, 0.3 / Math.max(1, s.length));   // a whole row settles within ~0.5 s
  const wTot = n * o.cw + (n - 1) * gap; const size = o.size || o.ch * 0.7; const font = F.flap(size, o.w || 600);
  const info = { text: ov.s != null ? ov.s : o.text, def: o.text, label: 'flap row' };
  if (ov.hide) { regBox(ov, o.x, o.y, wTot, o.ch, info); return wTot; }
  // a row arrives just before it flips (no empty tiles waiting on screen), unless it shows text already (prev) or o.showEmpty
  const arrive = o.showEmpty || prev.trim() ? 1 : ez(t, t0 - 0.2, 0.15); if (arrive <= 0) return wTot;
  withA(arrive, () => moved(ov, () => {
    themeFixed(() => {
      for (let i = 0; i < n; i++) {
        const x = o.x + i * (o.cw + gap), ch = s[i] || ' ', pc = prev[i] || ' ';
        fillRR(x, o.y, o.cw, o.ch, Math.max(2, o.cw * 0.07), NB.flap);
        const s0 = t0 + i * stag, k = 2 + Math.floor(hash(i * 7.3 + t0 * 3.1) * 3), end = s0 + k * 0.05;   // 2-4 glyphs per tile (critic: settle fast)
        let glyph = ch, col = o.colFn ? o.colFn(i) : (o.col || NB.let), flip = false;
        if (t < s0) { glyph = pc; col = o.prevCol || col; }
        else if (t < end && (ch !== ' ' || pc !== ' ')) { glyph = GLY[Math.floor(hash(Math.floor((t - s0) / 0.05) + i * 13.1) * GLY.length)]; flip = true; col = NB.let; }
        if (flip) rect(x, o.y, o.cw, o.ch / 2, NB.flipTop);
        if (glyph !== ' ') _txt(glyph, x + o.cw / 2, o.y + o.ch / 2 + size * 0.35, font, col, 'center');
        rect(x, o.y + o.ch / 2 - 0.5, o.cw, 1, NB.split);
      }
    });
    regBox(ov, o.x, o.y, wTot, o.ch, info);
  }));
  return wTot;
}
/** when a flap row has landed (for sounds): t0 + n * stag + ~0.3 */
const flapEnd = (t0, n, stag = 0.03) => t0 + n * stag + 0.2;
/** sound for a flap cascade: soft typewriter clicks while it flips, one select click when it lands */
function flapSnd(t0, n, stag = 0.03, db = -6) { const d = n * stag + 0.25; for (let k = 0; k < Math.min(4, Math.ceil(d / 0.22)); k++) cue('flap', t0 + k * 0.2, db); cue('flapEnd', flapEnd(t0, n, stag), db + 1); }
/** a block of centred flap lines (titles, phrase cards). o: lines, cx, y (top), cw, ch, t0, stag, lineStag, cols {lineIndex: col}, keyBase */
function flapLines(t, o) {
  const n = o.n || Math.max(...o.lines.map(l => l.length)); const gap = Math.max(3, Math.round(o.cw * 0.09)); const wTot = n * o.cw + (n - 1) * gap;
  o.lines.forEach((l, i) => flaps(t, { x: o.cx - wTot / 2, y: o.y + i * (o.ch + (o.lgap || o.ch * 0.16)), n, cw: o.cw, ch: o.ch, text: l, key: (o.keyBase || 'line') + ' ' + i, align: 'center', fixedN: true,
    t0: (o.t0 || 0) + i * (o.lineStag == null ? 0.1 : o.lineStag), stag: o.stag, col: (o.cols && o.cols[i]) || NB.let, size: o.size }));
  return { w: wTot, h: o.lines.length * (o.ch + (o.lgap || o.ch * 0.16)) };
}
/** cell size that fits n cells in width w */
const cellFit = (n, w, maxCw = 60) => Math.min(maxCw, Math.floor((w + 4) / n / 1.09));

/* ---------- the departures board ---------- */
// the scholarships (checked on the official pages 2 Nov 2026). st: go = still open, dim = closed / passed / not open
const ROWS = [
  { id: 'em', name: 'ERASMUS MUNDUS', short: 'ERASMUS MUNDUS', where: 'EU-WIDE', closes: 'MOST OCT-JAN', status: 'OPEN', st: 'go' },
  { id: 'aiss', name: 'AISS (TALLINN)', short: 'AISS', where: 'ESTONIA', closes: '2 FEB 2027', status: 'OPENS 2 DEC', st: '' },
  { id: 'si', name: 'SWEDISH INSTITUTE', short: 'SWEDEN', where: 'SWEDEN', closes: '15 JAN / FEB', status: 'ADMISSION OPEN', st: 'go' },
  { id: 'nl', name: 'NL SCHOLARSHIP', short: 'NETHERLANDS', where: 'NETHERLANDS', closes: 'PER UNI', status: 'PER UNI', st: '' },
  { id: 'daad', name: 'DAAD EPOS', short: 'GERMANY', where: 'GERMANY', closes: 'PER COURSE', status: 'MANY PASSED', st: 'dim' },
  { id: 'hu', name: 'STIPENDIUM HUNG.', short: 'HUNGARY', where: 'HUNGARY', closes: 'NOT YET OUT', status: 'NOT OPEN', st: 'dim' },
  { id: 'chev', name: 'CHEVENING', short: 'UK', where: 'UK', closes: 'OCT 2026', status: 'CLOSED', st: 'dim' },
];
/** the board inside rect r. o: t0 (rows flip in), rows (ids, default all), statusAt {id: time} (status flips at that time;
 *  before it the status cells are blank), dimAt (time the closed rows go grey; before: white), title (big line above),
 *  focus (row id: the others dim to 35 %), focusAt, cols (cells per column), compact (9:16: two lines per row) */
function board(t, r, o = {}) {
  const rows = (o.rows ? o.rows.map(id => ROWS.find(x => x.id === id)) : ROWS);
  const t0 = o.t0 == null ? -99 : o.t0; let y = r.y;
  if (o.title) { const ts = V(o.titleSize || 92, o.titleSize9 || 64); withA(ez(t, t0 - 0.2, 0.4), () => dtxt(o.title, r.x, y + ts * 0.8, ts, g.fg, 'left', 'title')); y += ts * 1.25;
    const below = PORTRAIT || o.compact; if (o.checked !== false) lab('Checked 2 Nov 2026', below ? r.x : r.x + r.w, r.y + (below ? ts * 1.16 + 34 : 30), V(30, 30), g.mid, below ? 'left' : 'right', { key: 'checked' }); if (below) y += 44; }
  const foc = (id) => (o.focus && t >= (o.focusAt == null ? -99 : o.focusAt) ? (o.focus === id || (Array.isArray(o.focus) && o.focus.includes(id)) ? 1 : 0.32) : 1);
  if (!PORTRAIT) {
    const two = !!o.compact; const cols = o.cols || (two ? [17, 14] : [17, 12, 14]); const colGap = 36; const tot = cols.reduce((a, b) => a + b, 0);
    const cw = Math.min(o.cw || 60, Math.floor((r.w - colGap * 2 + 4) / tot / 1.09)); const gap = Math.max(3, Math.round(cw * 0.09));
    const ch = Math.min(Math.round(cw * 2.3), Math.floor((r.y + r.h - y - 56) / rows.length / 1.2)); const rg = Math.round(ch * 0.2);
    const xs = []; let x = r.x; cols.forEach(n => { xs.push(x); x += n * (cw + gap) + colGap; });
    if (o.heads !== false) (two ? ['Scholarship', 'Status'] : ['Scholarship', 'Closes', 'Status']).forEach((h, j) => withA(ez(t, t0, 0.4), () => lab(h, xs[j], y + 32, V(32, 30), g.mid, 'left', { key: 'head ' + h })));
    y += 56;
    rows.forEach((rw, i) => withA(foc(rw.id), () => {
      const ry = y + i * (ch + rg), rt = t0 + i * 0.07; const dimNow = rw.st === 'dim' && t >= (o.dimAt == null ? -99 : o.dimAt);
      const base = dimNow ? NB.dim : NB.let;
      flaps(t, { x: xs[0], y: ry, n: cols[0], cw, ch, text: rw.name, key: rw.id + ' name', t0: rt, stag: 0.02, col: base, fixedN: true });
      if (!two) flaps(t, { x: xs[1], y: ry, n: cols[1], cw, ch, text: rw.closes, key: rw.id + ' closes', t0: rt + 0.05, stag: 0.02, col: base, fixedN: true });
      const sa = o.statusAt && o.statusAt[rw.id] != null ? o.statusAt[rw.id] : (o.statusAll != null ? o.statusAll : rt + 0.1);
      const so = o.status && o.status[rw.id]; flaps(t, { x: xs[two ? 1 : 2], y: ry, n: cols[two ? 1 : 2], cw, ch, text: so ? so[0] : rw.status, key: rw.id + ' status', t0: sa, stag: 0.025, col: stCol(so ? so[1] : rw.st), showEmpty: true, fixedN: true });
    }));
    return { y: y + rows.length * (ch + rg), cw, ch };
  }
  // 9:16 (or compact): two lines per row: name, then status + closes (mono)
  const n0 = 16; let cw = cellFit(n0, r.w, 56); let ch = Math.round(cw * 1.75);
  const chFit = Math.floor(((r.y + r.h - y) / rows.length - 18) / 1.8); if (ch > chFit) { ch = Math.max(24, chFit); cw = Math.round(ch / 1.75); }
  const ch2 = Math.round(ch * 0.8), cw2 = Math.round(cw * 0.8); const rowH = ch + 6 + ch2 + 12;
  rows.forEach((rw, i) => withA(foc(rw.id), () => {
    const ry = y + i * rowH, rt = t0 + i * 0.07; const dimNow = rw.st === 'dim' && t >= (o.dimAt == null ? -99 : o.dimAt);
    flaps(t, { x: r.x, y: ry, n: n0, cw, ch, text: rw.name, key: rw.id + ' name', t0: rt, stag: 0.02, col: dimNow ? NB.dim : NB.let, fixedN: true });
    const sa = o.statusAt && o.statusAt[rw.id] != null ? o.statusAt[rw.id] : (o.statusAll != null ? o.statusAll : rt + 0.1);
    const so = o.status && o.status[rw.id]; flaps(t, { x: r.x, y: ry + ch + 6, n: 14, cw: cw2, ch: ch2, text: so ? so[0] : rw.status, key: rw.id + ' status', t0: sa, stag: 0.025, col: stCol(so ? so[1] : rw.st), showEmpty: true });
  }));
  return { y: y + rows.length * rowH, cw, ch };
}
/** sounds for a board that flips in at t0 (one cascade per two rows, not per cell) */
function boardSnd(t0, nRows = 7) { for (let i = 0; i < nRows; i += 2) cue('flap', t0 + i * 0.07, -6); cue('flapEnd', t0 + nRows * 0.07 + 0.6, -5); }

/* ---------- a gate: one scholarship, its facts in flaps ---------- */
/** o: t0, gate ('GATE 01'), name (big), where, facts [{k: 'PAYS', v: '€1,400 A MONTH', at, st}], status, statusAt, st */
function gate(t, r, o) {
  const t0 = o.t0 == null ? -99 : o.t0; let y = r.y;
  const nameSize = o.nameSize || V(118, 96);
  withA(ez(t, t0, 0.35), () => lab((o.gate || 'Gate') + (o.where ? '  ·  ' + o.where : ''), r.x, y + 30, V(32, 30), g.mid, 'left', { key: 'gate' }));
  y += 52;
  KT(t, { lines: o.nameLines || [o.name], x: r.x, y: y + nameSize * 0.84, size: nameSize, t0: t0 + 0.08, stagger: 0.07, col: g.fg, id: 'name', fitW: r.w });
  y += (o.nameLines ? o.nameLines.length : 1) * nameSize * 0.95 + V(40, 46);
  const facts = o.facts || []; const nMax = Math.max(10, ...facts.map(f => f.v.length)); const cw = cellFit(nMax, r.w, V(o.cw || 52, 56)); const ch = Math.round(cw * 1.8);
  facts.forEach((f, i) => { const at = f.at == null ? t0 + 0.25 + i * 0.25 : f.at; const fy = y + i * (ch + V(64, 70));
    withA(ez(t, at - 0.15, 0.3), () => lab(f.k, r.x, fy + 0, V(30, 30), g.mid, 'left', { key: 'fact ' + i }));
    flaps(t, { x: r.x, y: fy + 14, n: nMax, cw, ch, text: f.v, key: 'value ' + i, t0: at, stag: 0.025, col: stCol(f.st) }); });
  return { y: y + facts.length * (ch + V(64, 70)), cw, ch };
}

/* ---------- boarding passes: fully funded / partial ---------- */
function pass(t, x, y, w, h, o) {
  const p = ez(t, o.at, 0.5); if (p <= 0) return;
  const dx = (1 - p) * (o.from || -80);
  withA(clamp(p * 1.6), () => grp(o.key || o.kind, x + dx, y, w, h, () => themeFixed(() => {
    fillRR(x + dx, y, w, h, 18, NB.paper); const full = o.kind === 'FULL';
    ctx.save(); rr(x + dx, y, w, h, 18); ctx.clip(); rect(x + dx, y, w, h * 0.22, full ? NB.flap : '#2B2E33'); ctx.restore();
    txt(full ? 'FULLY FUNDED' : 'PARTIAL', x + dx + 44, y + h * 0.165, F.disp(h * 0.13), NB.let, 'left', 'alphabetic', 0, (o.key || o.kind) + ' head');
    (o.rows || []).forEach((rw, i) => { const ry = y + h * 0.3 + i * h * 0.33;
      txt(rw[0].toUpperCase(), x + dx + 44, ry + 28, F.mono(30), NB.paperMid, 'left', 'alphabetic', 2.4, (o.key || o.kind) + ' k' + i);
      const one = o.rows.length === 1; txtW(rw[1], x + dx + 44, ry + 28 + h * (one ? 0.27 : 0.13), F.flap(h * (one ? 0.24 : 0.115)), NB.paperInk, w - 88, h * (one ? 0.25 : 0.12), 0, (o.key || o.kind) + ' v' + i); });   // one row (2026-11-07): the value big
  })));
}

/* ---------- a real official page (cropped, never changed) ---------- */
/** clip(t, r, name, o): the crop width-fitted in r (o.maxH), a highlight sweeps on each marked phrase at o.hlAt[i] (or o.at + 0.5),
 *  a source line under it. o.at: slides in (0.55 s, outQuint), o.rot (deg), o.src (source text override) */
function clip(t, r, name, o = {}) {
  const c = CLIPS[name]; const im = IMG['clip_' + name]; if (!c || !im) return null;
  const at = o.at == null ? -99 : o.at; const p = ez(t, at, 0.55); if (p <= 0) return null;
  // readable: never smaller than minK (capture px are 2x CSS, so 0.62 = body text ~22-26 px); a wide strip shows a window
  // of its width centred on the first highlight (a crop of the crop, nothing altered)
  const band = o.band != null ? o.band : (PORTRAIT || typeof FOOT !== 'undefined') && c.hl.length && !o.full;   // one highlighted line (+ a little above / below)
  const sy0 = band ? Math.max(0, c.hl[0][1] - c.hl[0][3] * 0.9) : 0, sh0 = band ? Math.min(c.h - sy0, c.hl[0][3] * 2.8) : c.h;
  const mh = o.maxH || r.h - 60; let k = Math.min(r.w, o.maxW || r.w) / c.w; k = Math.max(k, o.minK != null ? o.minK : band ? V(1.25, 1.5) : V(0.95, 1.25)); if (sh0 * k > mh) k = mh / sh0;
  const w = Math.min(r.w, o.maxW || r.w, c.w * k), h = sh0 * k; const vw = w / k;
  const hc = c.hl.length ? c.hl[0][0] + c.hl[0][2] / 2 : vw / 2; const sx = clamp(hc - vw / 2, 0, Math.max(0, c.w - vw));
  const x = o.align === 'center' ? r.x + (r.w - w) / 2 : r.x, y = o.y != null ? o.y : r.y;
  const dy = (1 - p) * 60, pad = Math.round(V(22, 18));
  withA(clamp(p * 1.8), () => grp(o.key || ('page ' + name), x - pad, y - pad + dy, w + pad * 2, h + pad * 2, () => {
    themeFixed(() => { ctx.save(); ctx.translate(x + w / 2, y + h / 2 + dy); if (o.rot) ctx.rotate(o.rot * Math.PI / 180); ctx.translate(-(x + w / 2), -(y + h / 2 + dy));
      fillRR(x - pad, y - pad + dy, w + pad * 2, h + pad * 2, 6, '#FFFFFF'); ctx.drawImage(im, sx * im.width / c.w, sy0 * im.height / c.h, vw * im.width / c.w, sh0 * im.height / c.h, x, y + dy, w, h);
      ctx.save(); ctx.beginPath(); ctx.rect(x, y + dy - 4, w, h + 8); ctx.clip();
      c.hl.forEach((b, i) => { const ht = o.hlAt ? o.hlAt[Math.min(i, o.hlAt.length - 1)] : at + 0.5 + i * 0.3; const q = ez(t, ht, 0.4, 'outQuint'); if (q <= 0 || (o.hlOnly && !o.hlOnly.includes(i))) return;
        ctx.save(); ctx.globalCompositeOperation = 'multiply'; rect(x + (b[0] - sx - 6) * k, y + dy + (b[1] - sy0 - 3) * k, (b[2] + 12) * k * q, (b[3] + 6) * k, o.open ? NB.hl : NB.hlDim); ctx.restore(); });
      ctx.restore(); ctx.restore(); });
  }, { img: true, label: 'official page (drag, resize)' }));
  withA(clamp(p * 1.4), () => { const sy = y + h + pad + V(46, 44) + dy, s_ = o.src || (c.source + '  ·  ' + c.date);
    if (o.plate) { const z_ = V(28, 28); themeFixed(() => fillRR(x - pad, sy - z_ * 1.1, Math.min(monoW(s_, z_, { fixed: true, ls: 0.08 }) + z_, Math.max(w + pad * 2, V(700, 900))), z_ * 1.6, 4, NB.flap)); }
    lab(s_, x - pad + (o.plate ? 14 : 0), sy, V(28, 28), o.plate ? NB.let : g.mid, 'left', { key: 'source ' + name, maxW: Math.max(w + pad * 2, V(700, 900)), lower: false }); });
  return { x, y, w, h };
}

/* ---------- a city photo (Pexels), behind her or full frame ---------- */
/** photo(t, r, name, o): cover-fitted, a slow 4 % push from o.at, o.dim (0..1 dark veil so type reads), o.title (country in
 *  flaps at the top-left), o.credit (small 'Photo: name / Pexels') */
function photo(t, r, name, o = {}) {
  const im = IMG['photo_' + name]; if (!im) return; const at = o.at == null ? 0 : o.at;
  const z = 1.04 + 0.04 * io(t, at, Math.max(3, o.dur || 6)); const s = Math.max(r.w / im.width, r.h / im.height) * z; const fx = o.fx == null ? 0.5 : o.fx, fy = o.fy == null ? 0.5 : o.fy;
  themeFixed(() => { ctx.save(); ctx.beginPath(); ctx.rect(r.x, r.y, r.w, r.h); ctx.clip();
    ctx.drawImage(im, r.x + (r.w - im.width * s) * fx, r.y + (r.h - im.height * s) * fy, im.width * s, im.height * s);
    if (o.dim) rect(r.x, r.y, r.w, r.h, `rgba(10,10,11,${o.dim})`); ctx.restore(); });
  if (o.title) { const n = o.title.length, cw = o.cw || V(64, 58), ch = Math.round(cw * 1.75);
    const tx = o.tx != null ? o.tx : r.x + V(70, 56), ty = o.ty != null ? o.ty : r.y + V(70, 120);
    flaps(t, { x: tx, y: ty, n, cw, ch, text: o.title, key: 'country', t0: at + 0.15, stag: 0.035, col: NB.let });
    if (o.sub) withA(ez(t, at + 0.5, 0.4), () => { const z_ = V(30, 30), wS = monoW(o.sub, z_, { fixed: true, ls: 0.08 }) + z_ * 1.2; const sx = Math.max(r.x + 40, Math.min(tx, r.x + r.w - 64 - wS)); themeFixed(() => fillRR(sx, ty + ch + 18, wS, z_ * 1.8, 4, NB.flap)); lab(o.sub, sx + z_ * 0.6, ty + ch + 18 + z_ * 1.22, z_, NB.let, 'left', { key: 'country sub' }); }); }
  if (o.credit !== false) { const P_ = PHOTOS[name]; const s_ = 'Photo: ' + P_.by + ' / Pexels'; const z_ = 24; const cx = o.creditX != null ? o.creditX : r.x + r.w - 24, cy = o.creditY != null ? o.creditY : r.y + r.h - 22;
    const cw_ = tw(s_.toUpperCase(), F.mono(z_), z_ * 0.04) + 20; themeFixed(() => rect(cx - cw_ + 10, cy - z_ - 6, cw_, z_ + 16, 'rgba(14,15,17,0.72)'));
    _mono(s_, cx, cy, z_, '#E0DFD9', 'right', { ls: 0.04 }); }
}

/* ---------- a black phrase card in flaps ---------- */
function phraseCard(t, r, o) {
  const lines = V(o.lines, o.lines9 || o.lines); const n = Math.max(...lines.map(l => l.length));
  const cw = Math.min(V(92, 90), cellFit(n, r.w * 0.94, 96)); const ch = Math.round(cw * 1.72);
  const totH = lines.length * (ch + ch * 0.16);
  flapLines(t, { lines, cx: r.x + r.w / 2, y: r.y + (r.h - totH) / 2, cw, ch, t0: o.at, stag: 0.03, lineStag: 0.12, cols: o.cols, n, keyBase: o.key || 'phrase' });
}

/* ---------- a correction screen: the board pauses, the fix types on ---------- */
/** o: at, head ('CORRECTION'), said (what she said, struck), now (the fact today, typed), src (source line) */
function correction(t, r, o) {
  const at = o.at; const cw = V(58, 50), ch = Math.round(cw * 1.75);
  flaps(t, { x: r.x, y: r.y + V(40, 20), n: (o.head || 'CORRECTION').length, cw, ch, text: o.head || 'CORRECTION', key: 'head', t0: at, stag: 0.035, col: NB.let });
  const fs = V(64, 60), fsB = V(70, 64), maxW = r.w; let y = r.y + V(40, 20) + ch + V(110, 120);
  if (o.said) withA(ez(t, at + 0.4, 0.4), () => { lab('In the video', r.x, y - fs * 1.05, V(30, 30), g.mid, 'left', { key: 'said label' });
    const nL = txtW(o.said, r.x, y, F.body(fs), g.mid, maxW, fs * 1.18, 0, 'said'); const sw = Math.min(maxW, tw(o.said, F.body(fs)));
    const sp = ez(t, at + 0.9, 0.45, 'outQuint'); if (nL === 1) rect(r.x - 6, y - fs * 0.3, (sw + 12) * sp, Math.max(5, fs * 0.08), NB.go === g.acc ? NB.let : g.fg); y += nL * fs * 1.18 + V(60, 70); });
  else y += 0;
  lab(o.nowLabel || 'Now', r.x, y + fsB * 0.02 - fsB * 1.05, V(30, 30), g.mid, 'left', { key: 'now label' });
  const ov = ovr('now'); const s = ov.s != null ? ov.s : o.now; const cps = o.cps || 34; const t1 = at + (o.said ? 1.0 : 0.3);
  // the fix types on in Barlow, wrapped (typed character by character, caret while typing)
  moved(ov, () => { const words = s.split(' '); const lines = []; let cur = ''; for (const w_ of words) { const nx = cur ? cur + ' ' + w_ : w_; if (cur && tw(nx, F.body(fsB)) > maxW) { lines.push(cur); cur = w_; } else cur = nx; } lines.push(cur);
    let shown = clamp(Math.floor((t - t1) * cps), 0, s.length); let yy = y;
    lines.forEach((ln) => { const k = Math.min(ln.length, shown); if (k > 0) _txt(ln.slice(0, k), r.x, yy, F.body(fsB), g.fg); if (shown <= ln.length && shown >= 0 && t >= t1 && t < t1 + s.length / cps + 0.8 && Math.floor(t * 2.4) % 2 === 0) rect(r.x + tw(ln.slice(0, k), F.body(fsB)) + 4, yy - fsB * 0.8, 5, fsB * 0.95, NB.let); shown -= ln.length + 1; yy += fsB * 1.2; });
    regBox(ov, r.x, y - fsB * 0.85, maxW, lines.length * fsB * 1.2, { text: s, def: o.now });
    if (o.src) withA(ez(t, t1 + s.length / cps, 0.4), () => lab(o.src, r.x, yy + V(40, 50), V(28, 28), g.mid, 'left', { key: 'source', lower: false, maxW: maxW })); });
}
const corrDur = (o) => (o.said ? 1.0 : 0.3) + o.now.length / (o.cps || 34);
