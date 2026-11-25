// Tiny seek(t) kit (copied from ghana-marrify directions, extended for database-indexes). Every frame is a pure function of t.
// Scenes: scene(id, t0, t1, build(root, S), update(lt, S, t)). Layout space: 1920x1080 or 1080x1920 (?aspect=9x16).
const QS = new URLSearchParams(location.search);
const PORTRAIT = QS.get('aspect') === '9x16';
const W = PORTRAIT ? 1080 : 1920, H = PORTRAIT ? 1920 : 1080, CX = W / 2, CY = H / 2;
const V = (l, p) => (PORTRAIT ? p : l);
const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const lerp = (a, b, x) => a + (b - a) * x;
const prog = (t, t0, t1) => clamp((t - t0) / (t1 - t0));
// arrive fast, land soft (each frame ~12-19% of the remaining distance at 30 fps ~ expo k=5..6 per second scaled)
const eOut = (x) => (x <= 0 ? 0 : x >= 1 ? 1 : 1 - Math.pow(2, -10 * x) * (1 - x) - 0 * x);
const eIn = (x) => (x <= 0 ? 0 : x >= 1 ? 1 : x * x * x);
const eIO = (x) => (x <= 0 ? 0 : x >= 1 ? 1 : x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
// damped spring step response, t in seconds since start; f = frequency (Hz), z = damping ratio
function spring(t, f = 2.2, z = 0.55) {
  if (t <= 0) return 0;
  const w = 2 * Math.PI * f, wd = w * Math.sqrt(1 - z * z);
  return 1 - Math.exp(-z * w * t) * (Math.cos(wd * t) + (z * w / wd) * Math.sin(wd * t));
}
function hash(n) { let x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); }
const stage = document.getElementById('stage');
stage.style.width = W + 'px'; stage.style.height = H + 'px';
function el(tag, css = {}, html = '', parent = stage) {
  const e = document.createElement(tag);
  Object.assign(e.style, { position: 'absolute' }, css);
  if (html) e.innerHTML = html;
  parent.appendChild(e); return e;
}
function set(e, css) { Object.assign(e.style, css); return e; }
const scenes = [];
function scene(id, t0, t1, build, update, z = 0) { scenes.push({ id, t0, t1, build, update, z, root: null, S: {} }); }
window.seek = (t) => {
  for (const s of scenes) {
    const on = t >= s.t0 && t < s.t1;
    if (on && !s.root) { s.root = el('div', { left: 0, top: 0, width: W + 'px', height: H + 'px', overflow: 'hidden', zIndex: s.z }); s.build(s.root, s.S); }
    if (s.root) s.root.style.display = on ? 'block' : 'none';
    if (on) s.update(t - s.t0, s.S, t);
  }
  return true;
};
window.ready = false;
document.fonts.ready.then(() => Promise.all([...document.images].map(i => i.complete ? 1 : new Promise(r => { i.onload = i.onerror = r; })))).then(() => { window.ready = true; });

// ---- database-indexes additions ----
const NS = 'http://www.w3.org/2000/svg';
function svg(parent, css = {}) { const s = document.createElementNS(NS, 'svg'); s.setAttribute('width', W); s.setAttribute('height', H); s.setAttribute('viewBox', `0 0 ${W} ${H}`); Object.assign(s.style, { position: 'absolute', left: 0, top: 0, overflow: 'visible' }, css); parent.appendChild(s); return s; }
function sv(parent, tag, attrs = {}, text) { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); if (text != null) e.textContent = text; parent.appendChild(e); return e; }
// type-on: n characters visible at progress p (0..1); returns substring
const typed = (s, p) => s.slice(0, Math.round(clamp(p) * s.length));
// stroke draw: set dash so a path of length L is drawn to fraction p
function draw(e, p) { const L = e.__L || (e.__L = e.getTotalLength ? e.getTotalLength() : 1000); e.setAttribute('stroke-dasharray', L); e.setAttribute('stroke-dashoffset', L * (1 - clamp(p))); }
// expo-out over a window, ease in-out over a window
const ein = (t, t0, d) => eOut(prog(t, t0, t0 + d));
const eio = (t, t0, d) => eIO(prog(t, t0, t0 + d));
const fmt = (n) => Math.round(n).toLocaleString('en-US');
// ?t=<seconds> freezes the page at that time once it is ready (for previews and iframes)
if (QS.get('t') != null) { const tq = +QS.get('t'); const iv = setInterval(() => { if (window.ready) { clearInterval(iv); window.seek(tq); } }, 20); }
