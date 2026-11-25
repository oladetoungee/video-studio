/* Studio runtime, part 1: the engine (project-agnostic).
 *
 * A film is a list of scenes; each scene is a draw(t) function. Every frame is a pure function of time:
 * renderFrame(t) paints the canvas for video time t (seconds). No timers, no Math.random.
 *
 *   aspect      setAspect('16x9' | '9x16' | '4x5' | '1x1'); W/H are the layout space; V(landscape, portrait) picks a value
 *   timeline    P('spoken phrase') finds a phrase in the word timings; addScene(start, ground, label, draw, {id})
 *   sound       sfx(role, t, db) adds a cue; the mixer (studio/tools/stems.py) turns cues into the SFX stem
 *   edits       every text / box registers an element id "<sceneId>/<key>"; overrides come from edits.json
 *   captions    drawCaptions(t) burns the caption cue at t (toggle: SHOW.captions)
 *
 * The house design system (palette, fonts, components) is in house.js. Film code lives in projects/<slug>/film/.
 */
'use strict';

/* ---------- frame + aspect ---------- */
const FPS = 30;
const ASPECTS = {
  '16x9': { w: 1920, h: 1080, portrait: false, label: '16:9', layout: '16x9' },
  '9x16': { w: 1080, h: 1920, portrait: true, label: '9:16', layout: '9x16' },
  // 4:5 is the 9:16 composition fitted: portrait y 230..1650 scaled into 1350 px (no separate layout to maintain)
  '4x5': { w: 1080, h: 1350, portrait: true, label: '4:5', layout: '9x16', fit: [230, 1650] },
  // 1:1 (LinkedIn / X feed) is the 9:16 composition fitted the same way: portrait y 250..1670 scaled into 1080 px
  // (the content band 370..1440 and the captions at 1535 stay in; teasers, 2026-10-14)
  '1x1': { w: 1080, h: 1080, portrait: true, label: '1:1', layout: '9x16', fit: [250, 1670] },
};
let ASPECT = '16x9', LAYOUT = '16x9', PORTRAIT = false;
let W = 1920, H = 1080;        // layout space the scenes draw in
let CW = 1920, CH = 1080;      // canvas pixels
let L = 110;                   // left margin (her decks: ~110 px; portrait 80 px)
let CX = 960;                  // horizontal centre
// Portrait safe area: TikTok / Reels / Shorts UI covers ~250 px top and bottom. Content lives in 370..1440,
// the HUD sits at y 300, captions own the band 1460..1660.
const SAFE = { top: 250, bottom: 1670, hudY: 300, contentTop: 370, contentBottom: 1440, capTop: 1460 };
let BASE = [1, 0, 0, 1, 0, 0];  // base transform (layout space -> canvas)

function setAspect(a) {
  const A = ASPECTS[a] || ASPECTS['16x9'];
  ASPECT = ASPECTS[a] ? a : '16x9'; LAYOUT = A.layout; PORTRAIT = A.portrait;
  W = A.portrait ? 1080 : 1920; H = A.portrait ? 1920 : 1080; CW = A.w; CH = A.h;
  L = A.portrait ? 80 : 110; CX = W / 2;
  if (A.fit) { const s = CH / (A.fit[1] - A.fit[0]); BASE = [s, 0, 0, s, (CW - W * s) / 2, -A.fit[0] * s]; }
  else BASE = [1, 0, 0, 1, 0, 0];
  if (ctx && ctx.canvas && (ctx.canvas.width !== CW || ctx.canvas.height !== CH)) { ctx.canvas.width = CW; ctx.canvas.height = CH; }
}
/** V(landscape, portrait): the value for the current layout. Portrait omitted -> landscape value. */
const V = (land, port) => (PORTRAIT && port !== undefined ? port : land);

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
/** deterministic pseudo-random in [0,1) */
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
function fillRR(x, y, w, h, r, col) { rr(x, y, w, h, r); ctx.fillStyle = col; if (!THEME.alt) return ctx.fill(); THEME.surface = true; THEME.box = _box(ctx, x, y, w, h); try { ctx.fill(); } finally { THEME.surface = false; THEME.box = null; } }   // a surface (light / dark)
function strokeR(x, y, w, h, col, lw = 3) { ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.strokeRect(x + lw / 2, y + lw / 2, w - lw, h - lw); }
function strokeRR(x, y, w, h, r, col, lw = 3) { rr(x + lw / 2, y + lw / 2, w - lw, h - lw, r); ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.stroke(); }
function circle(x, y, r, col) { ctx.beginPath(); ctx.arc(x, y, Math.max(0, r), 0, Math.PI * 2); ctx.fillStyle = col; if (!THEME.alt) return ctx.fill();
  const k = Math.hypot(ctx.getTransform().a, ctx.getTransform().b); THEME.surface = r * k > 14; THEME.box = THEME.surface ? _box(ctx, x - r, y - r, 2 * r, 2 * r) : null; try { ctx.fill(); } finally { THEME.surface = false; THEME.box = null; } }   // over 14 px: a surface
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
/** raw text draw (not editable; use for computed strings like timecodes) */
function _txt(s, x, y, font, col, align = 'left', base = 'alphabetic', ls = 0) {
  setFont(font, ls); ctx.fillStyle = col; ctx.textAlign = align; ctx.textBaseline = base; ctx.fillText(s, x, y);
}
function tw(s, font, ls = 0) { setFont(font, ls); return ctx.measureText(s).width - (ls > 0 ? ls : 0); }
const fontPx = (font) => parseFloat(font.match(/(\d+(?:\.\d+)?)px/)[1]);

/* ---------- edits: element ids + overrides ----------
 * Every editable thing registers an element: id = "<sceneId>/<key>", key = its default text (or an explicit key).
 * edits.json:  { t: { "<id>": { s: "new text", hide: true, pos: { "16x9": {dx,dy}, "9x16": {dx,dy,k,hide} } } },
 *                captions: { "<cue index>": "text" } }
 * Text and hide are shared by every aspect; moves are per layout (4:5 follows 9:16). In a layout's pos, k scales a
 * movable box (image, card: grp) around its centre and hide: true hides it in that layout only.
 */
const EDIT = { data: { t: {}, captions: {} } };
function setEdits(e) { EDIT.data = { t: {}, captions: {}, ...(e || {}) }; EDIT.data.t = EDIT.data.t || {}; EDIT.data.captions = EDIT.data.captions || {}; EDIT.data.modes = EDIT.data.modes || {}; }

/* ---------- light / dark per screen ----------
 * Every ground in G has a designed mode (G.<ground>.mode 'light' | 'dark'; none = a full-bleed colour punchline, no
 * alternative). edits.json "modes": {"<sceneId>": "light" | "dark"} switches a screen to its alternative (only screens that
 * differ from their design are stored; no key = exactly as designed).
 * The alternative is a designed recolouring done at draw time, by ROLE: while a switched screen is drawn, every fill / stroke /
 * text call looks its colour up in the kit's table for that mode and role:
 *   surface  grounds, cards, slabs, big blocks: fillRect larger than 16 px both ways, fillRR, circles over 14 px
 *   ground   the screen's ground colour (filled once per frame)
 *   mark     text, strokes, hairlines and bars (fillRect 16 px or less), small dots, path fills (icons, glyphs)
 * so an ink slab on paper becomes a lifted dark slab (surface) while ink text becomes paper-white (mark); a deep blue block
 * stays deep blue while blue text lightens. Colours without an entry are never touched; drawImage (photos, screenshots) never.
 * themeFixed(fn) draws fn with no recolouring (eye whites, photo prints, flags). Scene code needs no changes: plain C.* / BL.*
 * values and literals are mapped (MC() is kept as a no-op for older scene code). Kits declare their tables with themeMap(). */
const THEME = { maps: {}, alt: null, fixed: 0, cache: new Map(), edges: {}, under: [], text: null, surface: false, box: null, role: null };
const _hex6 = (c) => { let h = c.slice(1).toUpperCase(); if (h.length === 3) h = h.split('').map(x => x + x).join(''); return '#' + h.slice(0, 6); };
/** themeMap(dir, role, [[from, to], ...]): colours on a screen switched to dir ('dark' | 'light') for role ('surface' | 'mark' |
 *  'both'). Later entries win. */
function themeMap(dir, role, list) {
  for (const r of role === 'both' ? ['surface', 'mark'] : [role]) { const k = dir + '|' + r; const m = THEME.maps[k] || (THEME.maps[k] = new Map()); for (const [a, b] of list) m.set(_hex6(a), _hex6(b)); }
  THEME.cache.clear();
}
/** the colour c (hex, rgb() or rgba(): canvas-normalised or not) for a role on a screen switched to dir; c itself when unmapped */
function themeSwap(c, dir = THEME.alt, role = 'mark') {
  if (typeof c !== 'string' || !dir) return c; const key = dir + '|' + role + '|' + c;
  if (THEME.cache.has(key)) return THEME.cache.get(key);
  const map = THEME.maps[dir + '|' + role]; let out = c;
  if (map) {
    if (/^#[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/.test(c)) out = map.get(_hex6(c)) || c;
    else { const m = /^rgba?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([\d.]+)\s*)?\)$/.exec(c);
      if (m) { const h = '#' + [m[1], m[2], m[3]].map(v => (+v).toString(16).padStart(2, '0')).join('').toUpperCase(); const to = map.get(h);
        if (to) { const n = parseInt(to.slice(1), 16); out = m[4] != null ? `rgba(${n >> 16},${(n >> 8) & 255},${n & 255},${m[4]})` : to; } } }
  }
  THEME.cache.set(key, out); return out;
}
const MC = (c) => c;   // kept for scene code written for the first version: colours are now mapped at draw time
/** draw fn with no recolouring (things that are real or must keep their colour in both modes) */
function themeFixed(fn) { THEME.fixed++; try { return fn(); } finally { THEME.fixed--; } }
/** dir null: draw as designed; 'dark' / 'light': the screen being drawn is switched to that mode */
function setAlt(dir) { THEME.alt = dir || null; THEME.under.length = 0; }
// the draw-time hooks (installed once; they pass straight through unless a switched screen is being drawn). While a switched
// screen is drawn they also keep a list of the surfaces drawn so far this frame (THEME.under), to tell two things apart:
//   a fill in the screen's own ground colour that sits on the ground is a mask (role 'ground': a full-frame wipe, a plate behind
//   a label), while the same colour on a card is a real object (a video player, a phone) and stays a surface;
//   text the recolouring left unreadable on what is under it (it read at 3:1 or more as designed, under 3:1 now) gets the
//   kit's light or dark text colour, whichever reads (THEME.text = [light, dark]).
const _lumC = new Map();
function _lum(c) {
  if (_lumC.has(c)) return _lumC.get(c); let r = 0, g_ = 0, b = 0;
  if (c[0] === '#') { const n = parseInt(_hex6(c).slice(1), 16); r = n >> 16; g_ = (n >> 8) & 255; b = n & 255; }
  else { const m = /rgba?\(([^)]+)\)/.exec(c); if (m) { const p = m[1].split(',').map(Number); r = p[0]; g_ = p[1]; b = p[2]; if (p[3] != null && p[3] < 0.6) { _lumC.set(c, null); return null; } } }
  const f = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); };
  const L_ = 0.2126 * f(r) + 0.7152 * f(g_) + 0.0722 * f(b); _lumC.set(c, L_); return L_;
}
const _ratio = (a, b) => { const A = _lum(a), B = _lum(b); if (A == null || B == null) return 21; return (Math.max(A, B) + 0.05) / (Math.min(A, B) + 0.05); };
function _box(c, x, y, w, h) { const m = c.getTransform(); let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  for (const [px, py] of [[x, y], [x + w, y], [x, y + h], [x + w, y + h]]) { const X = m.a * px + m.c * py + m.e, Y = m.b * px + m.d * py + m.f; x0 = Math.min(x0, X); y0 = Math.min(y0, Y); x1 = Math.max(x1, X); y1 = Math.max(y1, Y); }
  return [x0, y0, x1, y1]; }
const _under = (X, Y) => { const u = THEME.under; for (let i = u.length - 1; i >= 0; i--) { const r = u[i]; if (X >= r.b[0] && X <= r.b[2] && Y >= r.b[1] && Y <= r.b[3]) return r; } return null; };
(function themeHooks() {
  if (typeof CanvasRenderingContext2D === 'undefined') return;
  const P = CanvasRenderingContext2D.prototype; const k2 = (c) => { const m = c.getTransform(); return Math.hypot(m.a, m.b); };
  const norm = (s) => (s[0] === '#' ? _hex6(s) : s);
  const groundBase = () => norm(g.bg);
  const call = (c, orig, a, key, st, to) => { if (to === st) return orig.apply(c, a); c[key] = to; try { return orig.apply(c, a); } finally { c[key] = st; } };
  // a card surface gets a hairline in the alternative when the kit asks for one (THEME.edges[dir] = [{col: base colour, line}])
  const edge = (c, a, st) => { const e = (THEME.edges[THEME.alt] || []).find(x => x.col === norm(st)); if (!e) return;
    THEME.fixed++; try { c.save(); c.strokeStyle = e.line; c.lineWidth = 2 / Math.max(0.01, k2(c)); if (a.length >= 4) c.strokeRect(a[0] + 1, a[1] + 1, a[2] - 2, a[3] - 2); else c.stroke(); c.restore(); } finally { THEME.fixed--; } };
  // a surface fill: decide surface / ground, draw, remember it
  const surf = (c, orig, a, st, box) => {
    let role = 'surface';
    if (THEME.maps[THEME.alt + '|nested'] && THEME.maps[THEME.alt + '|nested'].has(norm(st)) && Math.min(box[2] - box[0], box[3] - box[1]) > 120) {
      const u = _under((box[0] + box[2]) / 2, (box[1] + box[3]) / 2); if (u && !u.ground && (THEME.nestOn || []).includes(norm(u.base))) role = 'nested'; }   // a big object on a card (THEME.nestOn: card colours)
    if (norm(st) === groundBase()) { const full = box[0] <= 1 && box[1] <= 1 && box[2] >= c.canvas.width - 1 && box[3] >= c.canvas.height - 1;   // covers the frame: a wipe
      const u = full ? null : _under((box[0] + box[2]) / 2, (box[1] + box[3]) / 2); if (!u || u.ground) role = 'ground'; }
    const to = themeSwap(st, THEME.alt, role); const r = call(c, orig, a, 'fillStyle', st, to);
    if (c.globalAlpha >= 0.5) THEME.under.push({ b: box, col: to, base: st, ground: role === 'ground' });
    if (role === 'surface') edge(c, a, st); return r;   // (nested / ground: no hairline)
  };
  const oFillRect = P.fillRect; P.fillRect = function (...a) {
    if (THEME.alt && THEME.fixed && typeof this.fillStyle === 'string' && this.globalAlpha >= 0.5 && Math.min(Math.abs(a[2]), Math.abs(a[3])) * k2(this) > 16)
      THEME.under.push({ b: _box(this, a[0], a[1], a[2], a[3]), col: this.fillStyle, base: this.fillStyle });   // a fixed surface (a photo print): text over it is checked too
    if (!THEME.alt || THEME.fixed || typeof this.fillStyle !== 'string') return oFillRect.apply(this, a);
    const st = this.fillStyle;
    if (Math.min(Math.abs(a[2]), Math.abs(a[3])) * k2(this) > 16) return surf(this, oFillRect, a, st, _box(this, a[0], a[1], a[2], a[3]));
    return call(this, oFillRect, a, 'fillStyle', st, themeSwap(st, THEME.alt, 'mark'));
  };
  const oFill = P.fill; P.fill = function (...a) {
    if (!THEME.alt || THEME.fixed || typeof this.fillStyle !== 'string') return oFill.apply(this, a);
    const st = this.fillStyle;
    if (THEME.role) return call(this, oFill, a, 'fillStyle', st, themeSwap(st, THEME.alt, THEME.role));   // a caller-set role (a character's body)
    if (THEME.surface && THEME.box) { const b = THEME.box; THEME.box = null; return surf(this, oFill, a, st, b); }
    return call(this, oFill, a, 'fillStyle', st, themeSwap(st, THEME.alt, 'mark'));
  };
  const oText = P.fillText; P.fillText = function (...a) {
    if (!THEME.alt || THEME.fixed || typeof this.fillStyle !== 'string') return oText.apply(this, a);
    const st = this.fillStyle; let to = themeSwap(st, THEME.alt, 'mark');
    if (THEME.text) {   // contrast guard: only where the recolouring broke a text that read as designed
      const w = this.measureText(a[0]).width; const fs = parseFloat((this.font.match(/(\d+(?:\.\d+)?)px/) || [0, 20])[1]);
      const al = this.textAlign; const cx = al === 'center' ? a[1] : al === 'right' || al === 'end' ? a[1] - w / 2 : a[1] + w / 2;
      const cy = this.textBaseline === 'middle' ? a[2] : this.textBaseline === 'top' ? a[2] + fs * 0.4 : a[2] - fs * 0.35;
      const m = this.getTransform(); const X = m.a * cx + m.c * cy + m.e, Y = m.b * cx + m.d * cy + m.f;
      const u = _under(X, Y); const under = u ? u.col : themeSwap(g.bg, THEME.alt, 'ground'), under0 = u ? u.base : g.bg;
      if (_ratio(to, under) < 3 && _ratio(st, under0) >= 3) { const [lt, dk] = THEME.text; to = _ratio(lt, under) >= _ratio(dk, under) ? lt : dk; }
    }
    THEME.drawn = to; return call(this, oText, a, 'fillStyle', st, to);
  };
  for (const [name, key] of [['strokeText', 'strokeStyle'], ['stroke', 'strokeStyle'], ['strokeRect', 'strokeStyle']]) { const orig = P[name]; P[name] = function (...a) {
    if (!THEME.alt || THEME.fixed || typeof this[key] !== 'string') return orig.apply(this, a);
    const st = this[key]; return call(this, orig, a, key, st, themeSwap(st, THEME.alt, 'mark'));
  }; }
})();
/** the colour a style will be drawn in right now (checks: the contrast tool reads this) */
const themeStyle = (c, role = 'mark') => (THEME.alt && !THEME.fixed ? themeSwap(c, THEME.alt, role) : c);
/** designed mode of a scene ('light' | 'dark' | null: a colour punchline without an alternative) and the chosen one */
function sceneMode0(sc) { const p = typeof G !== 'undefined' && G[sc.ground]; return (p && p.mode) || null; }
function sceneMode(sc) { const m0 = sceneMode0(sc); if (!m0) return null; const m = (EDIT.data.modes || {})[sc.id]; return m === 'light' || m === 'dark' ? m : m0; }
/** the mode a scene is switched to ('dark' | 'light'), or null when it is drawn as designed */
const sceneAlt = (sc) => { const m0 = sceneMode0(sc); const m = m0 && sceneMode(sc); return m && m !== m0 ? m : null; };
/** what a scene looks like for transitions: its ground, or (alternative) the ground it now matches (G.<g>.altKey) */
function groundKey(sc) { return sceneAlt(sc) ? ((G[sc.ground] && G[sc.ground].altKey) || sc.ground + '~alt') : sc.ground; }
let SCENE_ID = '';
const EL = { list: [], seen: new Map(), rec: true };
const keyOf = (s) => String(s).replace(/\s+/g, ' ').trim().slice(0, 80);
/** look up the override for an element of the current scene (also counts duplicates within a frame) */
function ovr(key) {
  let id = SCENE_ID + '/' + keyOf(key);
  const n = (EL.seen.get(id) || 0) + 1; EL.seen.set(id, n); if (n > 1) id += '#' + n;
  const e = EDIT.data.t[id]; const pos = e && e.pos && e.pos[LAYOUT];
  return { id, s: e && e.s != null ? e.s : null, hide: !!(e && e.hide) || !!(pos && pos.hide), dx: (pos && pos.dx) || 0, dy: (pos && pos.dy) || 0, k: (pos && pos.k) || 1, edited: !!e };
}
/** record an element's box (local coords, mapped through the current transform) for the editor's hit-testing */
function regBox(o, x, y, w, h, extra) {
  if (!EL.rec) return;
  const m = ctx.getTransform(); let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  for (const [px, py] of [[x, y], [x + w, y], [x, y + h], [x + w, y + h]]) {
    const X = m.a * px + m.c * py + m.e, Y = m.b * px + m.d * py + m.f;
    x0 = Math.min(x0, X); y0 = Math.min(y0, Y); x1 = Math.max(x1, X); y1 = Math.max(y1, Y);
  }
  EL.list.push({ id: o.id, x: x0, y: y0, w: x1 - x0, h: y1 - y0, k: Math.hypot(m.a, m.b), edited: o.edited, hidden: o.hide, kind: 'text', a: ctx.globalAlpha, ...extra });
}
/** run fn translated by the element's move (if any); c = [cx, cy]: also scale by the element's size edit around c */
function moved(o, fn, c) {
  const k = c && o.k && o.k !== 1 ? o.k : 1; if (!o.dx && !o.dy && k === 1) return fn();
  ctx.save(); ctx.translate(o.dx, o.dy); if (k !== 1) { ctx.translate(c[0], c[1]); ctx.scale(k, k); ctx.translate(-c[0], -c[1]); }
  try { return fn(); } finally { ctx.restore(); }
}
/** a movable group (card, window, photo...): grp('key', x, y, w, h, () => draw) */
// extra: {img: true} for photos (the editor offers size + hide in this frame size). Boxes can be resized (pos.k).
function grp(key, x, y, w, h, fn, extra) {
  const o = ovr('@' + key); const info = { kind: 'box', label: key, sk: o.k, ...(extra || {}) };
  if (o.hide) { regBox(o, x, y, w, h, info); return; }
  moved(o, () => { fn(); regBox(o, x, y, w, h, info); }, [x + w / 2, y + h / 2]);
}
/** editable plain text: same signature as _txt */
function txt(s, x, y, font, col, align = 'left', base = 'alphabetic', ls = 0, key) {
  const o = ovr(key || s); const str = o.s != null ? o.s : s;
  const w = tw(str, font, ls), fs = fontPx(font);
  const bx = align === 'center' ? x - w / 2 : align === 'right' ? x - w : x;
  const by = base === 'middle' ? y - fs * 0.55 : base === 'top' ? y : y - fs * 0.8;
  if (o.hide) { regBox(o, bx, by, w, fs * 1.05, { text: str, def: s }); return; }
  moved(o, () => { _txt(str, x, y, font, col, align, base, ls); regBox(o, bx, by, w, fs * 1.05, { text: str, def: s }); });
}

/** editable text that wraps onto more lines when wider than maxW (line height lh px). Returns the number of lines. */
function txtW(s, x, y, font, col, maxW, lh, ls = 0, key) {
  const o = ovr(key || s); const str = o.s != null ? o.s : s; const fs = fontPx(font);
  const lines = []; let cur = '';
  for (const part of str.split('\n')) { for (const w of part.split(' ')) { const nx = cur ? cur + ' ' + w : w; if (cur && tw(nx, font, ls) > maxW) { lines.push(cur); cur = w; } else cur = nx; } lines.push(cur); cur = ''; }
  const wMax = Math.max(...lines.map(l => tw(l, font, ls)));
  if (o.hide) { regBox(o, x, y - fs * 0.8, wMax, (lines.length - 1) * lh + fs * 1.05, { text: str, def: s }); return lines.length; }
  moved(o, () => { lines.forEach((ln, k) => _txt(ln, x, y + k * lh, font, col, 'left', 'alphabetic', ls)); regBox(o, x, y - fs * 0.8, wMax, (lines.length - 1) * lh + fs * 1.05, { text: str, def: s }); });
  return lines.length;
}

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
  const space = tw(' ', baseFont);
  const src = o.lines || [o.text];
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
  const Lo = { words, lines, lh, space, w: Math.max(...lines.map(l => l.w)), h: lines.length * lh, size };
  _lay.set(key, Lo); return Lo;
}
/** width available to a text block at x with this alignment (portrait safety net) */
function availW(x, align, margin) {
  const m = margin == null ? (PORTRAIT ? 64 : 60) : margin;
  return align === 'center' ? W - 2 * m : align === 'right' ? x - m : W - m - x;
}
/** KT: kinetic text block. o: lines[] | text (+maxW), x, y (first baseline), size, font 'disp'|'body'|'serif', align,
 *  times[] (one per display word) | t0 + stagger, col, acc, dur, blur, ul (underline serif words), out (time to leave),
 *  id (edit key; default = the text), fitW (max width: the size shrinks to fit; portrait always fits to the frame) */
function KT(t, o) {
  const def = (o.lines || [o.text]).join('\n'); const ov = ovr(o.id || def.replace(/\n/g, ' '));
  if (ov.s != null) o = { ...o, lines: ov.s.split('\n'), text: undefined };
  if (PORTRAIT || ov.s != null || o.fitW) { // shrink to fit (never in the untouched landscape film)
    const Lf = layoutKT(o); const av = o.fitW || availW(o.x, o.align || 'left');
    if (Lf.w > av) o = { ...o, size: Math.floor(o.size * av / Lf.w), blur: o.blur == null ? Math.min(18, o.size * 0.09) : o.blur };
  }
  const Lb = layoutKT(o); const align = o.align || 'left';
  const bx = align === 'center' ? o.x - Lb.w / 2 : align === 'right' ? o.x - Lb.w : o.x;
  const box = [bx, o.y - o.size * 0.86, Lb.w, (Lb.lines.length - 1) * Lb.lh + o.size * 1.1];
  const info = { text: (o.lines || [o.text]).join('\n'), def, markup: true };
  if (ov.hide) { regBox(ov, ...box, info); return Lb; }
  return moved(ov, () => { const R = KT_(t, o); if (R.vis) regBox(ov, ...box, info); return R; });
}
function KT_(t, o) {
  const Lo = layoutKT(o); const size = o.size; const align = o.align || 'left';
  const col = o.col || g.fg, acc = o.acc || g.acc; const dur = o.dur || 0.34; const blur0 = o.blur == null ? Math.min(18, size * 0.09) : o.blur;
  const out = o.out == null ? Infinity : o.out; const oa = 1 - prog(t, out - 0.16, 0.16); Lo.vis = false; if (oa <= 0) return Lo;
  ctx.textBaseline = 'alphabetic'; ctx.textAlign = 'left';
  Lo.words.forEach((w, i) => {
    const ln = Lo.lines[w.li]; const lx = align === 'center' ? o.x - ln.w / 2 : align === 'right' ? o.x - ln.w : o.x;
    const ti = o.times ? o.times[Math.min(i, o.times.length - 1)] : (o.t0 || 0) + i * (o.stagger == null ? 0.06 : o.stagger);
    if (ti == null || isNaN(ti)) throw new Error('KT: no time for word "' + w.s + '" in ' + JSON.stringify(o.lines || o.text));
    w.X = lx + w.dx; w.Y = o.y + w.li * Lo.lh; w.t = ti;
    const d = w.serif ? dur * 1.7 : dur; const p = prog(t, ti, d); if (p <= 0) return;
    Lo.vis = true;
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
  return Lo;
}
// time list for n display words mapped onto a spoken phrase
function TM(ph, n) {
  if (ph.w.length === n) return ph.w;
  const a = ph.t, b = ph.w[ph.w.length - 1];
  return Array.from({ length: n }, (_, i) => (n === 1 ? a : lerp(a, Math.max(a, b), i / (n - 1))));
}
const nW = (lines) => (Array.isArray(lines) ? lines : [lines]).reduce((s, l) => s + parseLine(l).length, 0);
/** several phrases' time lists, concatenated: TS([ph, n], [ph2, n2]) */
function TS(...parts) { return parts.flatMap(([ph, n]) => TM(ph, n)); }
/** pick word times by index from a phrase */
const pick = (ph, idx) => idx.map(i => ph.w[i]);
/** scene start: a hair before the first spoken word of its phrase */
const S = (ph, lead = 0.12) => ph.t - lead;

/* typing (UI text): characters appear at cps; returns number shown. caret while typing (and until o.caretTo). Editable. */
function typeText(t, t0, s, x, y, font, col, o = {}) {
  const ov = ovr(o.key || s); const str = ov.s != null ? ov.s : s;
  const fs = fontPx(font); const box = [x, y - fs * (o.base === 'middle' ? 0.55 : 0.85), Math.max(fs, tw(str, font, o.ls || 0)), fs * 1.1];
  if (ov.hide) { regBox(ov, ...box, { text: str, def: s }); return 0; }
  return moved(ov, () => { const n = typeText_(t, t0, str, x, y, font, col, o); if (n > 0) regBox(ov, ...box, { text: str, def: s }); return n; });
}
function typeText_(t, t0, s, x, y, font, col, o = {}) {
  const cps = o.cps || 22; const n = clamp(Math.floor((t - t0) * cps), 0, s.length); if (t < t0 && !o.caretBefore) return 0;
  const ls = o.ls || 0; const shown = s.slice(0, n); _txt(shown, x, y, font, col, 'left', o.base || 'alphabetic', ls);
  const caretTo = o.caretTo == null ? t0 + s.length / cps + 0.6 : o.caretTo;
  if (t < caretTo && (n < s.length || Math.floor(t * 2.2) % 2 === 0)) {
    const cx = x + tw(shown, font, ls) + 3; const fs = fontPx(font);
    rect(cx, y - fs * 0.82, Math.max(2, fs * 0.07), fs * 1.0, o.caretCol || col);
  }
  return n;
}
const typeDur = (s, cps = 22) => s.length / cps;

/* ---------- hand marks ---------- */
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
// a thick flat bar at -2deg across a word (her deck's .strike)
function strikeBar(x, y, w, p, col, h = 10) {
  if (p <= 0) return; const L_ = w * 1.08; ctx.save(); ctx.translate(x + w / 2, y); ctx.rotate(-0.035); ctx.fillStyle = col; ctx.fillRect(-L_ / 2, -h / 2, L_ * E.outExpo(p), h); ctx.restore();
}
// a flat block behind a word (her deck's .mk marker)
function marker(x, y, w, h, p, col) { if (p <= 0) return; ctx.fillStyle = col; ctx.fillRect(x, y, w * E.outExpo(p), h); }

/* ---------- timeline: words, phrases, scenes, cues ---------- */
let INTRO = 3.0, OUTRO = 6.0, TOTAL = 0;
let WORDS = [];
const norm = s => s.toLowerCase().replace(/’/g, "'").replace(/[^a-z0-9']/g, '');
function initWords(raw) { WORDS = raw.map(x => ({ w: x.w, t: x.t + INTRO, e: x.e + INTRO, n: norm(x.w) })); }
let CUR = 0;
/** Find a spoken phrase at/after the cursor (advances it). Returns {t, e, w:[word start times], ew:[word ends]} in video time. */
function P(q, o = {}) {
  const qs = q.split(/\s+/).map(norm).filter(Boolean);
  const from = o.from != null ? o.from : CUR;
  for (let i = from; i <= WORDS.length - qs.length; i++) {
    let ok = true;
    for (let k = 0; k < qs.length; k++) if (WORDS[i + k].n !== qs[k]) { ok = false; break; }
    if (ok) {
      if (!o.peek) CUR = i + qs.length;
      const ws = WORDS.slice(i, i + qs.length);
      return { t: ws[0].t, e: ws[ws.length - 1].e, w: ws.map(x => x.t), ew: ws.map(x => x.e), i };
    }
  }
  const ctxw = WORDS.slice(CUR, CUR + 14).map(x => x.w).join(' ');
  throw new Error(`phrase not found: "${q}" (cursor at ${(WORDS[CUR] || {}).t?.toFixed(2)}: ${ctxw})`);
}
/** resolve a dict of phrases in order: PS({a:'...', b:'...'}) */
function PS(d) { const k = {}; for (const [n, q] of Object.entries(d)) k[n] = P(q); return k; }

const SCENES = [], CUES = [];
/** addScene(start, ground, label, draw, o). o: id (stable scene id: edits + export names), grid, trans 'cut'|'whip', hud */
function addScene(start, ground, label, draw, o = {}) {
  if (o.id && SCENES.some(s => s.id === o.id)) throw new Error('duplicate scene id ' + o.id);
  SCENES.push({ start, ground, label, draw, id: o.id || null, grid: !!o.grid, trans: o.trans || 'cut', hud: o.hud !== false, layout: o.layout || '' });
}
/** SFX cue: role name (see film.json audio.sfx), time (video s), level offset dB. extra: {n, d} for typing (n key clicks over d s) */
function sfx(name, t, db = 0, extra = {}) { if (t == null || isNaN(t)) throw new Error('bad sfx time ' + name); CUES.push({ name, t: +t.toFixed(3), db, ...extra }); }
function sfxType(t, chars, cps = 22, db = 0) { sfx('type', t, db, { n: Math.max(2, Math.round(chars * 0.6)), d: +(chars / cps).toFixed(3) }); }

/** After all scenes are added: sort, give scenes without an id one, make same-ground cuts whips, add cut sounds. */
function finishScenes(o = {}) {
  SCENES.sort((a, b) => a.start - b.start);
  const n = new Map(); SCENES.forEach((s, i) => { s.n = i + 1; if (!s.id) { const b = (s.label.replace(/^\/\/\s*\d+\s*—\s*/, '') || 'scene').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); const k = (n.get(b) || 0) + 1; n.set(b, k); s.id = b + (k > 1 ? '-' + k : ''); } });
  const punch = o.punch || [];
  for (let i = 1; i < SCENES.length; i++) { const a = SCENES[i - 1], b = SCENES[i];
    if (a.ground === b.ground) b.trans = 'whip';            // same ground: whip-slide instead of a cut to the same colour
    if (o.cutSounds !== false && (a.label !== b.label || punch.includes(a.ground) || punch.includes(b.ground))) sfx('cut', b.start + (b.trans === 'whip' ? 0.1 : 0)); }
}
/** Thin the cue list so it never gets busy: higher-priority sounds win, lower ones need clear air around them. */
const SFX_PRI = { hit: 6, cut: 5, whoosh: 5, type: 4, click: 4, hitS: 3, card: 2, mark: 2, tick: 1 };
const SFX_GAP = { hit: 0.25, cut: 0.25, tick: 4.0, mark: 3.0, card: 1.0 };
function pruneCues() {
  const gap = (n) => (SFX_GAP[n] != null ? SFX_GAP[n] : 0.7);
  const order = [...CUES].sort((a, b) => (SFX_PRI[b.name] || 0) - (SFX_PRI[a.name] || 0) || a.t - b.t); const kept = [];
  for (const c of order) if (c.keep || kept.every(k => k.keep || Math.abs(k.t - c.t) >= gap(c.name))) kept.push(c);   // keep: a deliberate cut sound (teasers, TZ.cut), never thinned
  CUES.length = 0; kept.sort((a, b) => a.t - b.t).forEach(c => CUES.push(c));
}
function sceneIndex(t) { let i = 0; for (let k = 0; k < SCENES.length; k++) if (SCENES[k].start <= t + 1e-9) i = k; return i; }
function sceneEnd(i) { return i + 1 < SCENES.length ? SCENES[i + 1].start : TOTAL; }

/* ---------- render ---------- */
const SHOW = { captions: false, hud: false };   // hud: the old corner labels + timecode (removed at her request; hud=1 in film.html for regression checks)
let CLIP_START = null;   // when exporting a clip: a whip INTO the clip's first scene shows only that scene
function paintScene(k, t) {
  const sc = SCENES[k]; setAlt(sceneAlt(sc)); THEME.under.length = 0; g = G[sc.ground]; SCENE_ID = sc.id; EL.seen.clear();
  if (sc.grid) grid();
  ctx.save(); sc.draw(t, t - sc.start); ctx.restore();
}
function renderFrame(t) {
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.filter = 'none'; EL.list.length = 0;
  const i = sceneIndex(t); const sc = SCENES[i]; setAlt(sceneAlt(sc)); g = G[sc.ground];
  // the ground: its own role (a dark screen's ink ground turns paper, while ink things on it, a phone, a video player, stay dark)
  if (THEME.alt) themeFixed(() => { ctx.fillStyle = themeSwap(g.bg, THEME.alt, 'ground'); ctx.fillRect(0, 0, CW, CH); }); else { ctx.fillStyle = g.bg; ctx.fillRect(0, 0, CW, CH); }
  ctx.setTransform(...BASE);
  const lt = t - sc.start;
  const solo = CLIP_START != null && sc.start >= CLIP_START - 0.02;
  // same look on both sides (the chosen light / dark mode): whip; a different ground is a hard cut
  if (i > 0 && lt < 0.26 && groundKey(SCENES[i - 1]) === groundKey(sc) && !solo) {
    // horizontal whip (motion-blur slide): old content leaves left, new enters from the right
    const e = E.inOutCubic(lt / 0.26); const rec = EL.rec; EL.rec = false;
    ctx.save(); ctx.globalAlpha = 1 - e; ctx.filter = `blur(${(22 * Math.sin(Math.PI * Math.min(1, e * 1.2))).toFixed(1)}px)`; ctx.translate(-W * 0.3 * e, 0); paintScene(i - 1, t); ctx.restore();
    EL.rec = rec;
    ctx.save(); ctx.globalAlpha = e; ctx.filter = `blur(${(22 * (1 - e)).toFixed(1)}px)`; ctx.translate(W * 0.22 * (1 - e), 0); paintScene(i, t); ctx.restore();
  } else paintScene(i, t);
  setAlt(sceneAlt(sc)); g = G[sc.ground]; ctx.filter = 'none'; ctx.globalAlpha = 1; SCENE_ID = sc.id;
  if (sc.hud && SHOW.hud) hud(t, sc.label);
  setAlt(null);   // captions use the designed palette with the screen's chosen mode; the palettes rest as designed between frames
  if (SHOW.captions) drawCaptions(t, sceneMode(sc) === 'dark');
}

/* ---------- captions ---------- */
let CAPTIONS = [];   // [{i, t0, t1, text}] from the film's .srt (video time)
function parseSRT(s) {
  const ts = (x) => { const m = x.trim().match(/(\d+):(\d+):(\d+)[,.](\d+)/); return +m[1] * 3600 + +m[2] * 60 + +m[3] + +m[4] / 1000; };
  return s.replace(/\r/g, '').split(/\n\s*\n/).map(b => b.trim()).filter(Boolean).map((b, i) => {
    const ls = b.split('\n'); const k = ls.findIndex(l => l.includes('-->')); const [a, c] = ls[k].split('-->');
    return { i, t0: ts(a), t1: ts(c), text: ls.slice(k + 1).join('\n') };
  });
}
const capText = (c) => (EDIT.data.captions[c.i] != null ? EDIT.data.captions[c.i] : c.text);
function captionAt(t) { let lo = 0, hi = CAPTIONS.length - 1, f = -1; while (lo <= hi) { const m = (lo + hi) >> 1; if (CAPTIONS[m].t0 <= t) { f = m; lo = m + 1; } else hi = m - 1; } return f >= 0 && t < CAPTIONS[f].t1 ? CAPTIONS[f] : null; }
function lineIndexAt(t) { let f = 0; for (let k = 0; k < CAPTIONS.length; k++) if (CAPTIONS[k].t0 <= t + 1e-6) f = k; return f; }
/** captions: Archivo 700 on a flat ink block per line (her marker style). Landscape: bottom band. Portrait: the reserved band. */
function drawCaptions(t, dark) {
  const c = captionAt(t); if (!c) return;
  if (dark == null) dark = g === G.ink;
  const size = PORTRAIT ? 50 : 42, font = F.body(size, 700), maxW = PORTRAIT ? W - 2 * 90 : 1400, lh = size * 1.32, padX = size * 0.34;
  const words = capText(c).replace(/\n/g, ' ').split(/\s+/).filter(Boolean);
  const wrap = (mw) => { const out = []; let cur = ''; for (const w of words) { const nx = cur ? cur + ' ' + w : w; if (cur && tw(nx, font, 0) > mw) { out.push(cur); cur = w; } else cur = nx; } if (cur) out.push(cur); return out; };
  let lines = wrap(maxW);   // balance the lines (no one-word orphan): shrink the width while the line count holds
  if (lines.length > 1) { const n = lines.length; let mw = maxW; for (let k = 0; k < 24; k++) { const tryW = mw * 0.96; const l2 = wrap(tryW); if (l2.length > n) break; mw = tryW; lines = l2; } }
  const y0 = PORTRAIT ? SAFE.capTop + size : H - 44 - (lines.length - 1) * lh;
  const plate = dark ? '#2A2A31' : C.ink;   // a dark screen (designed or chosen): a lifted plate, else ink; text paper
  const o = { id: 'caption/' + c.i, edited: EDIT.data.captions[c.i] != null, hide: false };
  let bx0 = Infinity, bx1 = -Infinity;
  lines.forEach((ln, k) => {
    const w = tw(ln, font, 0), y = y0 + k * lh; bx0 = Math.min(bx0, CX - w / 2 - padX); bx1 = Math.max(bx1, CX + w / 2 + padX);
    rect(CX - w / 2 - padX, y - size * 0.98, w + padX * 2, size * 1.3, plate);
    _txt(ln, CX, y, font, C.paper, 'center');
  });
  regBox(o, bx0, y0 - size * 0.98, bx1 - bx0, (lines.length - 1) * lh + size * 1.3, { kind: 'caption', text: capText(c), def: c.text, cue: c.i });
}
