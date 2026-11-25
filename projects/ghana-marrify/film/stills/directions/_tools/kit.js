// Tiny seek(t) kit for the ghana-marrify direction tests. Every frame is a pure function of t.
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
