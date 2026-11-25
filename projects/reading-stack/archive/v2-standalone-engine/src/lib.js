/* Reading Motion v2: design system + drawing kit (canvas 2D, deterministic; t = seconds of video time)
 *
 * Her world, one system for the whole video:
 *   grounds  paper #EDE9E2 · ink #111114 · card #FFFDF6 · full-bleed electric blue #1B3FD8 (punchlines)
 *   accent   electric blue (on ink: #6E8CFF, her deck's "blue as text in dark"); safety orange #FF4713 very rarely
 *   type     Bricolage Grotesque 800 (display, uppercase, tight) · Archivo (sentences/body) ·
 *            DM Mono (labels, numbers, corners) · Instrument Serif italic (one elegant accent word)
 * Flat grounds only: no gradients, glows, vignettes, particles, textures, or drama shadows.
 */
'use strict';
const W = 1920, H = 1080, FPS = 30;
const INTRO = 3.0;   // title card before her voice starts
const OUTRO = 6.0;   // end card after "Bye."

const C = {
  paper: '#EDE9E2', ink: '#111114', card: '#FFFDF6', panel: '#DED8CD', mid: '#6C6A66', line: '#CEC6B8',
  blue: '#1B3FD8', blueT: '#6E8CFF', orange: '#FF4713', onBlue: '#F1F4FF',
  inkMid: '#8A8780', inkLine: '#2B2B31', inkPanel: '#1E1E23',
};
// ground -> palette for everything drawn on it
const G = {
  paper: { bg: C.paper, fg: C.ink, mid: C.mid, line: C.line, acc: C.blue, card: C.card, panel: C.panel, grid: 'rgba(17,17,20,0.11)' },
  card:  { bg: C.card, fg: C.ink, mid: C.mid, line: C.line, acc: C.blue, card: C.paper, panel: C.panel, grid: 'rgba(17,17,20,0.10)' },
  ink:   { bg: C.ink, fg: C.paper, mid: C.inkMid, line: C.inkLine, acc: C.blueT, card: C.card, panel: C.panel, grid: 'rgba(237,233,226,0.12)' },
  blue:  { bg: C.blue, fg: C.onBlue, mid: 'rgba(241,244,255,0.72)', line: 'rgba(241,244,255,0.28)', acc: C.onBlue, card: C.card, panel: C.panel, grid: 'rgba(241,244,255,0.32)' },
};
let g = G.paper;              // current ground palette (set per scene)

const F = {
  disp: (s) => `800 ${s}px "Bricolage Grotesque"`,
  body: (s, w = 700) => `${w} ${s}px Archivo`,
  mono: (s, w = 500) => `${w} ${s}px "DM Mono"`,
  serif: (s) => `italic 400 ${s}px "Instrument Serif"`,
  serifR: (s) => `400 ${s}px "Instrument Serif"`,
};
const LS = { disp: -0.03, body: -0.012, mono: 0.16, serif: -0.01 };   // letter-spacing, em

let ctx = null;
function setCtx(c) { ctx = c; }

/* ---------- math / easing ---------- */
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const lerp = (a, b, t) => a + (b - a) * t;
const prog = (t, t0, d) => clamp((t - t0) / d);
const E = {
  lin: t => t,
  outCubic: t => 1 - Math.pow(1 - t, 3),
  outQuart: t => 1 - Math.pow(1 - t, 4),
  outQuint: t => 1 - Math.pow(1 - t, 5),
  outExpo: t => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t)),
  inCubic: t => t * t * t,
  inOutCubic: t => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
  inOutQuart: t => (t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2),
  outBack: (t, s = 1.2) => { const c3 = s + 1; return 1 + c3 * Math.pow(t - 1, 3) + s * Math.pow(t - 1, 2); },
};
function hash(n) { const s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); }
function hexA(hex, a) { const n = parseInt(hex.slice(1), 16); return `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${a})`; }

/* ---------- state helpers ---------- */
function withA(a, fn) { if (a <= 0.002) return; ctx.save(); ctx.globalAlpha *= clamp(a); fn(); ctx.restore(); }
function withT(x, y, s, r, fn) { ctx.save(); ctx.translate(x, y); if (r) ctx.rotate(r); if (s !== 1) ctx.scale(s, s); fn(); ctx.restore(); }
function withBlur(b, fn) { if (b < 0.3) { fn(); return; } ctx.save(); ctx.filter = `blur(${b.toFixed(2)}px)`; fn(); ctx.restore(); }
/** A beat: content visible from t0 to t1, leaves with a quick 0.16 s fade + 10 px lift. */
function beat(t, t0, t1, fn) {
  if (t < t0 - 0.001 || t >= t1) return;
  const o = 1 - prog(t, t1 - 0.16, 0.16);
  ctx.save(); ctx.globalAlpha *= o; ctx.translate(0, -10 * (1 - o)); fn(); ctx.restore();
}
/** snap-in amount: fast in, soft settle */
function sn(t, t0, d = 0.34) { return E.outExpo(prog(t, t0, d)); }

/* ---------- primitives ---------- */
function rect(x, y, w, h, col) { ctx.fillStyle = col; ctx.fillRect(x, y, w, h); }
function rr(x, y, w, h, r) {
  r = Math.min(r, Math.abs(w) / 2, Math.abs(h) / 2);
  ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath();
}
function fillRR(x, y, w, h, r, col) { rr(x, y, w, h, r); ctx.fillStyle = col; ctx.fill(); }
function strokeR(x, y, w, h, col, lw = 3) { ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.strokeRect(x + lw / 2, y + lw / 2, w - lw, h - lw); }
function strokeRR(x, y, w, h, r, col, lw = 3) { rr(x + lw / 2, y + lw / 2, w - lw, h - lw, r); ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.stroke(); }
function circle(x, y, r, col) { ctx.beginPath(); ctx.arc(x, y, Math.max(0, r), 0, Math.PI * 2); ctx.fillStyle = col; ctx.fill(); }
function hline(x, y, w, p, col, lw = 2) { if (p <= 0) return; ctx.fillStyle = col; ctx.fillRect(x, y - lw / 2, w * p, lw); }
function pline(x1, y1, x2, y2, p, col, lw = 3) {
  if (p <= 0) return; ctx.save(); ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(lerp(x1, x2, p), lerp(y1, y2, p));
  ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'butt'; ctx.stroke(); ctx.restore();
}
function arrowR(x1, y, x2, p, col, lw = 3, head = 14) { // straight right-pointing arrow
  if (p <= 0) return; const x = lerp(x1, x2, p); pline(x1, y, x - 2, y, 1, col, lw);
  ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - head, y - head * 0.6); ctx.lineTo(x - head, y + head * 0.6); ctx.closePath(); ctx.fillStyle = col; ctx.fill();
}
function setFont(font, ls = 0) { ctx.font = font; ctx.letterSpacing = ls ? ls.toFixed(2) + 'px' : '0px'; }
function txt(s, x, y, font, col, align = 'left', base = 'alphabetic', ls = 0) {
  setFont(font, ls); ctx.fillStyle = col; ctx.textAlign = align; ctx.textBaseline = base; ctx.fillText(s, x, y);
}
function tw(s, font, ls = 0) { setFont(font, ls); return ctx.measureText(s).width - (ls > 0 ? ls : 0); }
// DM Mono label: uppercase, letter-spaced (her corner labels / eyebrows)
function mono(s, x, y, size = 24, col = g.mid, align = 'left', o = {}) {
  txt(o.lower ? s : s.toUpperCase(), x, y, F.mono(size, o.w || 500), col, align, o.base || 'alphabetic', size * (o.ls == null ? LS.mono : o.ls));
}
function monoW(s, size = 24, o = {}) { return tw(o.lower ? s : s.toUpperCase(), F.mono(size, o.w || 500), size * (o.ls == null ? LS.mono : o.ls)); }

/* ---------- hand marks (the reference's blue underline / circle) ---------- */
// hand underline: a slightly bowed brush stroke drawn left -> right
function handLine(x, y, w, p, col, lw = 6, seed = 1) {
  if (p <= 0) return; const N = 28; const n = Math.max(2, Math.round(N * clamp(p)));
  ctx.save(); ctx.strokeStyle = col; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.lineWidth = lw; ctx.beginPath();
  for (let i = 0; i <= n; i++) {
    const u = i / N; const xx = x + w * u; const yy = y + Math.sin(u * Math.PI) * w * 0.018 + Math.sin(u * 9 + seed) * 1.2 - u * 3;
    i ? ctx.lineTo(xx, yy) : ctx.moveTo(xx, yy);
  }
  ctx.stroke(); ctx.restore();
}
// hand ellipse around something (drawn progressively, slightly over-closed)
function handCircle(cx, cy, rx, ry, p, col, lw = 5, seed = 2) {
  if (p <= 0) return; const a0 = -2.2; const span = Math.PI * 2 * 1.08 * clamp(p);
  ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath();
  const N = 64; for (let i = 0; i <= N; i++) { const a = a0 + span * i / N; const wob = 1 + 0.035 * Math.sin(a * 3 + seed) + 0.03 * (i / N);
    const x = cx + Math.cos(a) * rx * wob, y = cy + Math.sin(a) * ry * wob; i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }
  ctx.stroke(); ctx.restore();
}
// her deck's .strike: a thick flat bar at -2deg across a word
function strikeBar(x, y, w, p, col = C.orange, h = 10) {
  if (p <= 0) return; const L = w * 1.08; ctx.save(); ctx.translate(x + w / 2, y); ctx.rotate(-0.035); ctx.fillStyle = col; ctx.fillRect(-L / 2, -h / 2, L * E.outExpo(p), h); ctx.restore();
}
// her deck's .mk marker: a flat block behind a word
function marker(x, y, w, h, p, col) { if (p <= 0) return; ctx.fillStyle = col; ctx.fillRect(x, y, w * E.outExpo(p), h); }

/* ---------- kinetic type ----------
 * Markup in a line:  *word*  = accent colour (same face)
 *                    ~word~  = Instrument Serif italic accent (+ hand underline unless o.ul === false)
 *                    _word_  = dimmed (mid colour)
 * Every word snaps in at its own time: blur -> sharp, 0.12 em rise, fast in / soft settle.
 */
function parseLine(s) {
  const out = []; let mode = null;
  for (let raw of s.split(' ').filter(Boolean)) {
    let m = mode;
    if (!m && /^[*~_]/.test(raw)) { m = raw[0]; raw = raw.slice(1); }
    let close = false; const end = m ? raw.lastIndexOf(m) : -1;
    if (m && end >= 0 && end >= raw.length - 2) { raw = raw.slice(0, end) + raw.slice(end + 1); close = true; }
    out.push({ s: raw, style: m || '' }); mode = m && !close ? m : null;
  }
  return out;
}
const _lay = new Map();
function layoutKT(o) {
  const key = JSON.stringify([o.lines, o.text, o.size, o.font, o.lh, o.maxW, o.upper, o.serifScale]);
  if (_lay.has(key)) return _lay.get(key);
  const size = o.size; const kind = o.font || 'disp'; const upper = o.upper == null ? kind === 'disp' : o.upper;
  const baseFont = kind === 'disp' ? F.disp(size) : kind === 'body' ? F.body(size, o.weight || 700) : F.serif(size);
  const ls = size * (kind === 'disp' ? LS.disp : kind === 'body' ? LS.body : LS.serif);
  const sScale = o.serifScale || (kind === 'disp' ? 1.02 : 1.14);
  const sFont = F.serif(size * sScale), sLs = size * sScale * LS.serif;
  const space = tw(' ', baseFont) * (kind === 'disp' ? 1.0 : 1.0);
  let src = o.lines || [o.text];
  const words = []; const lines = [];
  const mk = (w) => { const serif = w.style === '~'; const s = serif ? w.s : (upper ? w.s.toUpperCase() : w.s);
    const font = serif ? sFont : baseFont; const l = serif ? sLs : ls; return { ...w, s, font, ls: l, w: tw(s, font, l), serif }; };
  for (const line of src) {
    const ws = parseLine(line).map(mk);
    if (o.maxW) { // wrap
      let cur = [], cw = 0;
      for (const w of ws) { const add = (cur.length ? space : 0) + w.w; if (cur.length && cw + add > o.maxW) { lines.push({ ws: cur, w: cw }); cur = []; cw = 0; } cw += (cur.length ? space : 0) + w.w; cur.push(w); }
      lines.push({ ws: cur, w: cw });
    } else { let cw = 0; ws.forEach((w, i) => { cw += (i ? space : 0) + w.w; }); lines.push({ ws, w: cw }); }
  }
  const lh = size * (o.lh || (kind === 'disp' ? 0.92 : 1.2));
  lines.forEach((ln, li) => { let x = 0; ln.ws.forEach((w, i) => { if (i) x += space; w.dx = x; w.li = li; x += w.w; words.push(w); }); });
  const L = { words, lines, lh, space, w: Math.max(...lines.map(l => l.w)), h: lines.length * lh, size };
  _lay.set(key, L); return L;
}
/** KT: kinetic text block. o: lines[] | text (+maxW), x, y (first baseline), size, font 'disp'|'body'|'serif', align,
 *  times[] (one per display word) | t0 + stagger, col, acc, dur, blur, ul (underline serif words), out (time to leave) */
function KT(t, o) {
  const L = layoutKT(o); const size = o.size; const align = o.align || 'left';
  const col = o.col || g.fg, acc = o.acc || g.acc; const dur = o.dur || 0.34; const blur0 = o.blur == null ? Math.min(18, size * 0.09) : o.blur;
  const out = o.out == null ? Infinity : o.out; const oa = 1 - prog(t, out - 0.16, 0.16); if (oa <= 0) return L;
  ctx.textBaseline = 'alphabetic'; ctx.textAlign = 'left';
  L.words.forEach((w, i) => {
    const ln = L.lines[w.li]; const lx = align === 'center' ? o.x - ln.w / 2 : align === 'right' ? o.x - ln.w : o.x;
    const ti = o.times ? o.times[Math.min(i, o.times.length - 1)] : (o.t0 || 0) + i * (o.stagger == null ? 0.06 : o.stagger);
    if (ti == null || isNaN(ti)) throw new Error('KT: no time for word "' + w.s + '" in ' + JSON.stringify(o.lines || o.text));
    w.X = lx + w.dx; w.Y = o.y + w.li * L.lh; w.t = ti;
    const d = w.serif ? dur * 1.7 : dur; const p = prog(t, ti, d); if (p <= 0) return;
    const e = E.outExpo(p); const a = clamp(p * 2.4) * oa; const b = (w.serif ? blur0 * 1.5 : blur0) * (1 - E.outCubic(p));
    ctx.save(); ctx.globalAlpha *= a;
    const fill = w.style === '*' || w.style === '~' ? acc : w.style === '_' ? g.mid : col;
    const mi = o.mark ? o.mark.idx.indexOf(i) : -1; const mt = mi >= 0 ? (o.mark.at ? o.mark.at[mi] : ti + 0.1) : 0; const mp = mi >= 0 ? prog(t, mt, 0.3) : 0;
    if (mi >= 0) marker(w.X - size * 0.06, w.Y - size * 0.78, w.w + size * 0.12, size * 0.9, mp, o.mark.col || acc);
    setFont(w.font, w.ls); ctx.fillStyle = mp > 0.45 ? (o.mark.fg || g.bg) : fill;
    if (b > 0.3) ctx.filter = `blur(${b.toFixed(2)}px)`;
    ctx.fillText(w.s, w.X, w.Y + size * 0.12 * (1 - e));
    ctx.restore();
    if (w.serif && o.ul !== false) { const up = prog(t, ti + 0.32, 0.42); withA(oa, () => handLine(w.X + w.w * 0.02, w.Y + size * 0.2, w.w * 0.96, E.outCubic(up), acc, Math.max(4, size * 0.045), i)); }
  });
  return L;
}
// time list for n display words mapped onto a spoken phrase
function TM(ph, n) {
  if (ph.w.length === n) return ph.w;
  const a = ph.t, b = ph.w[ph.w.length - 1];
  return Array.from({ length: n }, (_, i) => (n === 1 ? a : lerp(a, Math.max(a, b), i / (n - 1))));
}
const nW = (lines) => (Array.isArray(lines) ? lines : [lines]).reduce((s, l) => s + parseLine(l).length, 0);

/* typing (UI text): characters appear at cps; returns number shown. caret while typing (and until o.caretTo) */
function typeText(t, t0, s, x, y, font, col, o = {}) {
  const cps = o.cps || 22; const n = clamp(Math.floor((t - t0) * cps), 0, s.length); if (t < t0 && !o.caretBefore) return 0;
  const ls = o.ls || 0; const shown = s.slice(0, n); txt(shown, x, y, font, col, 'left', o.base || 'alphabetic', ls);
  const caretTo = o.caretTo == null ? t0 + s.length / cps + 0.6 : o.caretTo;
  if (t < caretTo && (n < s.length || Math.floor(t * 2.2) % 2 === 0)) {
    const cx = x + tw(shown, font, ls) + 3; const fs = parseFloat(font.match(/(\d+(?:\.\d+)?)px/)[1]);
    rect(cx, y - fs * 0.82, Math.max(2, fs * 0.07), fs * 1.0, o.caretCol || col);
  }
  return n;
}
const typeDur = (s, cps = 22) => s.length / cps;

/* ---------- components ---------- */
// grid lines (her UBER / 404 slides): 160 px, hairline
function grid(col = g.grid, step = 160) { ctx.fillStyle = col; for (let x = step; x < W; x += step) ctx.fillRect(x, 0, 1, H); for (let y = step; y < H; y += step) ctx.fillRect(0, y, W, 1); }

// eyebrow label (mono, top of a composition)
function eyebrow(t, t0, s, x, y, o = {}) { const p = prog(t, t0, 0.3); if (p <= 0) return; withA(p, () => mono(s, x, y, o.size || 26, o.col || g.mid, o.align || 'left', { ls: 0.24 })); }

/** Index list (her numbered rows): mono number in accent + uppercase line + hairline rule.
 * rows: [{n, s, tin, sub, strike, dim}], o: x, y (baseline of first row), w, rowH, size, focus(t)->idx|-1, font */
function IDX(t, rows, o) {
  const x = o.x == null ? 110 : o.x, w = o.w || W - 2 * x, rowH = o.rowH || 118, size = o.size || 76; const nx = o.numW == null ? 125 : o.numW;
  const focus = o.focus ? o.focus(t) : -1; const kind = o.font || 'disp';
  rows.forEach((r, i) => {
    const size = r.size || o.size || 76;
    const y = o.y + i * rowH; const p = prog(t, r.tin, 0.34); if (p <= 0 && !o.ghost) return;
    let a = 1; if (focus !== -1 && focus !== i && !(Array.isArray(focus) && focus.includes(i))) a = o.dimA == null ? 0.22 : o.dimA;
    if (r.dim != null) a *= 1 - 0.78 * prog(t, r.dim, 0.3);
    // rule
    const ruleY = y + (o.ruleDy == null ? size * 0.34 : o.ruleDy);
    const rp = E.outExpo(prog(t, r.tin - 0.05, 0.6)); if (o.ghost && p <= 0) { hline(x, ruleY, w, 1, g.line, 3); return; }
    if (o.rules !== false) hline(x, ruleY, w, rp, o.ruleCol || g.line, 3);
    withA(a, () => {
      const e = E.outExpo(p); const b = 10 * (1 - E.outCubic(p));
      withA(clamp(p * 2.4), () => withBlur(b, () => {
        mono(r.n, x, y - (o.numUp || 0), o.numSize || 34, r.numCol || g.acc, 'left', { ls: 0.06 });
        const f = kind === 'disp' ? F.disp(size) : F.body(size, o.weight || 700); const s = kind === 'disp' ? r.s.toUpperCase() : r.s;
        txt(s, x + nx, y + size * 0.1 * (1 - e), f, r.col || g.fg, 'left', 'alphabetic', size * (kind === 'disp' ? LS.disp : LS.body));
        if (r.sub) { if (o.subBelow) mono(r.sub, x + nx + 2, y + (o.subDy || 50), o.subSize || 24, g.mid, 'left'); else mono(r.sub, x + w, y, o.subSize || 24, g.mid, 'right'); }
      }));
      if (r.strike != null) { const tw0 = tw(kind === 'disp' ? r.s.toUpperCase() : r.s, kind === 'disp' ? F.disp(size) : F.body(size, o.weight || 700), size * (kind === 'disp' ? LS.disp : LS.body)); strikeBar(x + nx, y - size * 0.34, tw0, prog(t, r.strike, 0.35), o.strikeCol || C.orange, Math.max(8, size * 0.12)); }
    });
    if (r.tag) { const tp = prog(t, r.tag.t, 0.3); if (tp > 0) withA(tp, () => { if (o.subBelow) mono(r.tag.s, x + nx + 2 + (r.sub ? monoW(r.sub, o.subSize || 24) + 40 : 0), y + (o.subDy || 50), o.subSize || 24, r.tag.col || g.acc, 'left'); else mono(r.tag.s, x + w, y, 24, r.tag.col || g.acc, 'right'); }); }
  });
}

// browser window (her 404 cards / "YOU ARE IN YOUR BROWSER"): panel header, three dots, address field
function browser(x, y, w, h, o = {}) {
  const hh = o.hh || 64; const border = o.border == null ? (g === G.paper ? 4 : 0) : o.border;
  rect(x, y, w, h, C.card); rect(x, y, w, hh, C.panel); rect(x, y + hh, w, 4, C.ink);
  for (let i = 0; i < 3; i++) circle(x + 30 + i * 22, y + hh / 2, 6, C.ink);
  const ax = x + 112, aw = w - 140;
  if (o.url != null || o.field) {
    rect(ax, y + 12, aw, hh - 24, C.card); strokeR(ax, y + 12, aw, hh - 24, C.ink, 3);
    if (o.url != null) {
      if (o.typeT0 != null) typeText(o.t, o.typeT0, o.url, ax + 20, y + hh / 2 + 1, F.mono(24, 500), C.ink, { base: 'middle', cps: o.cps || 20, caretTo: o.caretTo });
      else txt(o.url, ax + 20, y + hh / 2 + 1, F.mono(24, 500), C.ink, 'left', 'middle');
    }
  } else rect(ax, y + hh / 2 - 7, aw, 14, '#D2CBBE');
  if (border) strokeR(x, y, w, h, C.ink, border);
  if (o.body) { ctx.save(); ctx.beginPath(); ctx.rect(x, y + hh + 4, w, h - hh - 4); ctx.clip(); o.body(x, y + hh + 4, w, h - hh - 4); ctx.restore(); }
}
// placeholder text bar (her grey lines in the UI cards)
function lbar(x, y, w, h = 14, col = '#D8D1C4') { rect(x, y, w, h, col); }

// polaroid insert (her pasted prints): card frame, photo, mono caption in the bottom margin
function polaroid(img, cx, cy, w, rot, caption, o = {}) {
  const pad = o.pad || Math.round(w * 0.045), bot = o.bot || Math.round(w * 0.16); const ih = o.ih || Math.round((w - pad * 2) * (img ? img.height / img.width : 1.2));
  const h = pad + ih + bot;
  withT(cx, cy, o.s == null ? 1 : o.s, rot, () => {
    rect(-w / 2, -h / 2, w, h, C.card);
    if (g === G.paper || g === G.card) strokeR(-w / 2, -h / 2, w, h, 'rgba(17,17,20,0.16)', 2);
    if (img) ctx.drawImage(img, 0, o.crop ? o.crop[0] * img.height : 0, img.width, (o.crop ? o.crop[1] - o.crop[0] : 1) * img.height, -w / 2 + pad, -h / 2 + pad, w - pad * 2, ih);
    const cs = o.capSize || Math.max(16, w * 0.042);
    if (caption && o.capType) typeText(o.capType.t, o.capType.t0, caption.toUpperCase(), -w / 2 + pad + 2, h / 2 - bot * 0.38, F.mono(cs, 500), C.ink, { cps: 24, ls: cs * 0.12, caretTo: o.capType.caretTo });
    else if (caption) mono(caption, -w / 2 + pad + 2, h / 2 - bot * 0.38, cs, C.ink, 'left', { ls: 0.12 });
  });
  return h;
}
function polaroidIn(t, t0, img, cx, cy, w, rot, caption, o = {}) {
  const p = prog(t, t0, 0.55); if (p <= 0) return; const e = E.outQuint(p);
  withA(clamp(p * 3), () => polaroid(img, cx, cy + (o.from == null ? 180 : o.from) * (1 - e), w, rot + (o.spin == null ? 0.12 : o.spin) * (1 - e), caption, o));
}

// flat typographic book (no photo): a card with the title set in her type system
function bookCard(x, y, w, h, o = {}) {
  rect(x, y, w, h, o.bg || C.card); if (o.border !== false) strokeR(x, y, w, h, o.borderCol || C.ink, o.bw || 4);
  if (o.band) rect(x, y, w, h * 0.1, o.band);
  const pad = w * 0.09; const ts = o.ts || w * 0.13;
  (o.title || []).forEach((ln, i) => txt(ln.toUpperCase(), x + pad, y + h * 0.1 + pad + ts * 0.95 * (i + 1), F.disp(ts), o.fg || C.ink, 'left', 'alphabetic', ts * LS.disp));
  if (o.author) mono(o.author, x + pad, y + h - pad, Math.max(14, w * 0.05), o.fg || C.ink, 'left', { ls: 0.12 });
}

// mouse cursor (arrow), with click pulse
function cursorAt(t, path, clicks = []) { // path: [[t,x,y],...]
  if (!path.length || t < path[0][0]) return null;
  let x = path[0][1], y = path[0][2];
  for (let i = 1; i < path.length; i++) { const [t1, x1, y1] = path[i]; const [t0, x0, y0] = path[i - 1]; if (t >= t1) { x = x1; y = y1; } else if (t > t0) { const e = E.inOutQuart((t - t0) / (t1 - t0)); x = lerp(x0, x1, e); y = lerp(y0, y1, e); break; } else break; }
  let s = 1; for (const c of clicks) { const d = t - c; if (d >= 0 && d < 0.35) { s = 1 - 0.14 * Math.sin(Math.PI * clamp(d / 0.16)); withA(1 - d / 0.35, () => { ctx.beginPath(); ctx.arc(x, y, 10 + 34 * E.outCubic(d / 0.35), 0, Math.PI * 2); ctx.strokeStyle = g === G.ink ? C.paper : C.ink; ctx.lineWidth = 2.5; ctx.stroke(); }); } }
  withT(x, y, s * 1.25, 0, () => {
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, 34); ctx.lineTo(8, 26); ctx.lineTo(14, 40); ctx.lineTo(20, 37); ctx.lineTo(14, 24); ctx.lineTo(25, 24); ctx.closePath();
    ctx.fillStyle = C.ink; ctx.fill(); ctx.strokeStyle = C.card; ctx.lineWidth = 2.5; ctx.lineJoin = 'round'; ctx.stroke();
  });
  return { x, y };
}

// checkbox (square, her UI style)
function checkbox(x, y, s, on, col = g.acc) {
  if (on > 0) { rect(x, y, s, s, col); ctx.save(); ctx.strokeStyle = C.card; ctx.lineWidth = s * 0.14; ctx.lineCap = 'square'; ctx.beginPath();
    const p = clamp(on); ctx.moveTo(x + s * 0.24, y + s * 0.52); const mx = x + s * 0.43, my = y + s * 0.7; if (p < 0.5) ctx.lineTo(lerp(x + s * 0.24, mx, p * 2), lerp(y + s * 0.52, my, p * 2)); else { ctx.lineTo(mx, my); ctx.lineTo(lerp(mx, x + s * 0.78, (p - 0.5) * 2), lerp(my, y + s * 0.3, (p - 0.5) * 2)); } ctx.stroke(); ctx.restore(); }
  else strokeR(x, y, s, s, g === G.ink ? C.inkMid : C.ink, 3);
}

/** meter (her "IN FLIGHT" bar): outlined box, fill, mono labels above/below */
function meter(t, x, y, w, h, frac, o = {}) {
  const col = o.col || g.acc;
  if (o.label) mono(o.label, x, y - 22, 26, g.mid, 'left', { ls: 0.2 });
  if (o.value != null) mono(String(o.value), x + w, y - 22, 30, col, 'right', { ls: 0.06 });
  strokeR(x, y, w, h, col, 4);
  if (o.cells) { const n = o.cells, cw = (w - 40) / n; const on = Math.round(n * frac); for (let i = 0; i < n; i++) { const cx = x + 20 + i * cw; if (i < on) rect(cx + 3, y + 18, cw - 6, h - 36, col); else strokeR(cx + 3, y + 18, cw - 6, h - 36, g.mid, 2); } }
  else rect(x + 12, y + 12, (w - 24) * clamp(frac), h - 24, col);
  if (o.foot) mono(o.foot, x, y + h + 42, 26, g.mid, 'left', { ls: 0.2 });
  if (o.footR) mono(o.footR, x + w, y + h + 42, 28, col, 'right', { ls: 0.08 });
}

/* ---------- HUD (corners, like her reference: "// 03 — store"  ·  "POCKETSFLOW 00:00:06:52") ---------- */
function timecode(t) { const f = Math.floor(t * FPS + 1e-6); const ff = f % FPS, s = Math.floor(f / FPS); const p = n => String(n).padStart(2, '0'); return `${p(Math.floor(s / 3600))}:${p(Math.floor(s / 60) % 60)}:${p(s % 60)}:${p(ff)}`; }
function hud(t, label) {
  const col = g === G.blue ? 'rgba(241,244,255,0.78)' : g.mid;
  if (label) txt(label, 60, 62, F.mono(22, 500), col, 'left', 'alphabetic', 22 * 0.04);
  txt('HOW TO READ', W - 60 - tw('  ' + timecode(t), F.mono(22, 500), 22 * 0.04), 62, F.mono(22, 500), col, 'right', 'alphabetic', 22 * 0.1);
  txt('  ' + timecode(t), W - 60, 62, F.mono(22, 500), col, 'right', 'alphabetic', 22 * 0.04);
}
