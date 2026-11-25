// directions-v2 seek(t) kit (DOM). Every frame is a pure function of t. Scenes: scene(id, t0, t1, build(root,S), update(lt,S,t)).
// Layout space 1920x1080 or 1080x1920 (?aspect=9x16). Ported later into film/scenes (canvas): only images, text, rects,
// transforms, opacity, clip and the grayscale / duotone filters are used, all of which the canvas engine can draw.
const QS = new URLSearchParams(location.search);
const PORTRAIT = QS.get('aspect') === '9x16';
const W = PORTRAIT ? 1080 : 1920, H = PORTRAIT ? 1920 : 1080, CX = W / 2, CY = H / 2;
const V = (l, p) => (PORTRAIT ? p : l);
const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const lerp = (a, b, x) => a + (b - a) * x;
const prog = (t, t0, d) => clamp((t - t0) / d);
// arrive fast, land soft: expo out (each 30 fps frame covers ~15 % of what is left at d = 0.5 s)
const eOut = (x) => (x <= 0 ? 0 : x >= 1 ? 1 : 1 - Math.pow(2, -10 * x));
const eIO = (x) => (x <= 0 ? 0 : x >= 1 ? 1 : x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
const eIn = (x) => clamp(x) ** 3;
function spring(t, f = 2.0, z = 0.6) {
  if (t <= 0) return 0;
  const w = 2 * Math.PI * f, wd = w * Math.sqrt(1 - z * z);
  return 1 - Math.exp(-z * w * t) * (Math.cos(wd * t) + (z * w / wd) * Math.sin(wd * t));
}
function hash(n) { let x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); }
const ASSETS = '../../../assets/directions-v2/';
const stage = document.getElementById('stage');
stage.style.width = W + 'px'; stage.style.height = H + 'px';
function el(tag, css = {}, html = '', parent = stage) {
  const e = document.createElement(tag);
  Object.assign(e.style, { position: 'absolute' }, css);
  if (html) e.innerHTML = html;
  parent.appendChild(e); return e;
}
function img(src, css = {}, parent = stage) { const e = el('img', css, '', parent); e.src = src.startsWith('http') || src.startsWith('./') ? src : ASSETS + src; e.draggable = false; return e; }
function set(e, css) { Object.assign(e.style, css); return e; }
// entrance: from {x,y,s,r,o,blur}; at lt; dur; returns progress
function enter(e, lt, at, dur = 0.5, from = {}, base = {}) {
  const p = eOut(prog(lt, at, dur)), q = 1 - p;
  const x = (base.x || 0) + (from.x || 0) * q, y = (base.y || 0) + (from.y || 0) * q;
  const s = (base.s == null ? 1 : base.s) * (from.s == null ? 1 : lerp(from.s, 1, p));
  const r = (base.r || 0) + (from.r || 0) * q;
  // motion blur follows speed: strongest at the start of the move, clear when settled
  const sp = from.x || from.y ? Math.abs(Math.pow(2, -10 * prog(lt, at, dur))) : 0;
  const blur = (from.blur || 0) * q + (from.mb ? from.mb * sp : 0);
  e.style.transform = `translate(${x}px,${y}px) rotate(${r}deg) scale(${s})`;
  e.style.opacity = from.o == null ? (lt < at ? 0 : 1) : lerp(from.o, 1, clamp(prog(lt, at, dur * 0.15)));
  e.style.filter = (e.dataset.f || '') + (blur > 0.2 ? ` blur(${blur.toFixed(1)}px)` : '');
  return p;
}
// word-by-word type on: element with spans .w
function words(e, text, cls = '') { e.innerHTML = text.split(' ').map(w => `<span class="w ${cls}" style="display:inline-block;white-space:pre">${w} </span>`).join(''); return [...e.querySelectorAll('.w')]; }
function typeOn(spans, lt, at, step = 0.09, dur = 0.3, dy = 26) {
  spans.forEach((s, i) => { const p = eOut(prog(lt, at + i * step, dur)); s.style.opacity = p > 0 ? clamp(p * 1.6) : 0; s.style.transform = `translateY(${(1 - p) * dy}px)`; s.style.filter = p < 0.98 ? `blur(${((1 - p) * 8).toFixed(1)}px)` : ''; });
}
// highlighter swipe (her yellow) behind an element's text: a child bar scaled in x
function marker(e, lt, at, dur = 0.45) { const p = eOut(prog(lt, at, dur)); e.style.transform = `scaleX(${p})`; e.style.opacity = p > 0 ? 1 : 0; }
const scenes = [];
function scene(id, t0, t1, build, update, z = 0) { scenes.push({ id, t0, t1, build, update, z, root: null, S: {} }); }
window.seek = (t) => {
  for (const s of scenes) {
    const on = t >= s.t0 && t < s.t1;
    if (on && !s.root) { s.root = el('div', { left: 0, top: 0, width: W + 'px', height: H + 'px', overflow: 'hidden', zIndex: s.z }); s.build(s.root, s.S); }
    if (s.root) s.root.style.display = on ? 'block' : 'none';
    if (on) { s.update(t - s.t0, s.S, t); for (const c of s.root.querySelectorAll('[data-at]')) c.style.opacity = t >= +c.dataset.at ? 1 : 0; }
  }
  return true;
};
window.ready = false;
// build every scene once up front so all images are requested before ready
setTimeout(() => {
  for (const s of scenes) { s.root = el('div', { left: 0, top: 0, width: W + 'px', height: H + 'px', overflow: 'hidden', zIndex: s.z, display: 'none' }); s.build(s.root, s.S); }
  document.fonts.ready.then(() => Promise.all([...document.images].map(i => (i.complete ? Promise.resolve() : new Promise(r => { i.onload = i.onerror = r; })).then(() => i.decode ? i.decode().catch(() => 0) : 0)))).then(() => { window.seek(0); window.ready = true; });
}, 0);

// ---------- shared pieces ----------
// Her real type (font-style-placement reference): pale-yellow three-part caption along the bottom (Helvetica Neue 400, 50 px
// at 1920) and the heavy stacked keyword (#F3EC7A). Shown on every frame so each ground is judged with her type on it.
const YEL = '#F3EC7A', CAP = '#F4EFB4';
// times (optional, absolute page seconds): each part appears on her word, as the engine's captions do
function caption3(root, parts, py = 880, times = null) {
  const y = V(1080 - 70, 1920 - 260), m = W * 0.065;
  const box = el('div', { left: m + 'px', width: (W - 2 * m) + 'px', top: (y - 50) + 'px', height: '60px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', font: `400 ${V(50, 46)}px "Helvetica Neue"`, letterSpacing: '-0.02em', color: CAP, zIndex: 50 }, '', root);
  if (PORTRAIT) { set(box, { display: 'block', left: '90px', width: (W - 180) + 'px', textAlign: 'center', textWrap: 'balance', top: py + 'px', lineHeight: 1.15 }); box.textContent = parts.join(' '); return box; }
  parts.forEach((p, i) => { const e = el('span', { position: 'static' }, p, box); if (times) e.dataset.at = times[i]; });
  return box;
}
// the hand-held phone (real CC0 photo, cut out); screen rect measured on cut/phonehand2.png: x 433-840, y 118-838 of 948x1308
const PHONE = { w: 948, h: 1308, sx: 433, sy: 118, sw: 407, sh: 720 };
function phone(root, x, y, scale, css = {}) {
  const wrap = el('div', Object.assign({ left: x + 'px', top: y + 'px', width: PHONE.w + 'px', height: PHONE.h + 'px', transformOrigin: '0 0' }, css), '', root);
  const inner = el('div', { left: 0, top: 0, width: PHONE.w + 'px', height: PHONE.h + 'px', transform: `scale(${scale})`, transformOrigin: '0 0' }, '', wrap);
  const photo = img('cut/phonehand2.png', { left: 0, top: 0, width: PHONE.w + 'px', height: PHONE.h + 'px' }, inner);
  const screen = el('div', { left: PHONE.sx + 'px', top: PHONE.sy + 'px', width: PHONE.sw + 'px', height: PHONE.sh + 'px', overflow: 'hidden', background: '#0E0E10' }, '', inner);
  return { wrap, inner, photo, screen, scale };
}
// a generic app icon (no brand): a rounded square in a flat colour with a simple glyph
const GLYPHS = ['●', '▲', '■', '◆', '✚', '◐', '♥', '★', '▶', '✉', '☰', '◉'];
function appIcon(parent, x, y, size, col, glyph, css = {}) {
  const e = el('div', Object.assign({ left: x + 'px', top: y + 'px', width: size + 'px', height: size + 'px', borderRadius: size * 0.23 + 'px', background: col, color: 'rgba(255,255,255,0.92)', font: `700 ${size * 0.44}px "Helvetica Neue"`, display: 'flex', alignItems: 'center', justifyContent: 'center' }, css), glyph, parent);
  return e;
}
function badge(parent, x, y, size, n) {
  return el('div', { left: x + 'px', top: y + 'px', minWidth: size + 'px', height: size + 'px', padding: `0 ${size * 0.22}px`, boxSizing: 'border-box', borderRadius: size / 2 + 'px', background: '#FF3B30', color: '#fff', font: `700 ${size * 0.6}px "Helvetica Neue"`, display: 'flex', alignItems: 'center', justifyContent: 'center' }, String(n), parent);
}
function credit(root, text, css = {}) { return el('div', Object.assign({ font: `400 ${V(24, 26)}px "DM Mono"`, letterSpacing: '0.02em', whiteSpace: 'nowrap' }, css), text, root); }
