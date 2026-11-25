/* Shared helpers for the scholarships direction pages. Every frame is a pure function of t (no timers, no Math.random). */
const Q = new URLSearchParams(location.search);
const MODE = Q.get('mode') || 'still';
const E = {
  outExpo: x => x >= 1 ? 1 : 1 - Math.pow(2, -10 * x),
  outQuint: x => 1 - Math.pow(1 - x, 5),
  outCubic: x => 1 - Math.pow(1 - x, 3),
  inOutQuart: x => x < .5 ? 8 * x * x * x * x : 1 - Math.pow(-2 * x + 2, 4) / 2,
  inExpo: x => x <= 0 ? 0 : Math.pow(2, 10 * x - 10),
  lin: x => x,
};
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
// progress of a move that starts at t0 and lasts d seconds
const P = (t, t0, d, ease = E.outExpo) => ease(clamp((t - t0) / d));
const lerp = (a, b, k) => a + (b - a) * k;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
// deterministic hash noise
const hash = n => { const s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); };
// spring (damping ratio z, ~freq f), position only; returns value overshooting around 1
const spring = (x, z = 0.6, f = 2.2) => { if (x <= 0) return 0; const w = 2 * Math.PI * f; const wd = w * Math.sqrt(1 - z * z); return 1 - Math.exp(-z * w * x) * (Math.cos(wd * x) + (z * w / wd) * Math.sin(wd * x)); };
// set style helper
function st(el, o) { if (typeof el === 'string') el = $(el); if (!el) return; for (const k in o) el.style[k] = o[k]; return el; }
// enter: opacity + translate + blur on a progress k (0..1); blur follows speed
function enter(el, k, dx = 0, dy = 0, blur = 8) {
  if (typeof el === 'string') el = $(el); if (!el) return;
  const v = 1 - k; el.style.opacity = clamp(k * 1.6); el.style.transform = `translate(${dx * v}px, ${dy * v}px)`;
  el.style.filter = v > 0.02 ? `blur(${(blur * v).toFixed(2)}px)` : 'none';
}
// stamp slam: scale 1.35 -> 1 over d with a slight rotation; opacity snaps on
function stamp(el, t, t0, rot = -6, d = 0.22) {
  if (typeof el === 'string') el = $(el); if (!el) return;
  const k = P(t, t0, d, E.outQuint); const on = t >= t0;
  el.style.opacity = on ? 1 : 0; const s = lerp(1.38, 1, k);
  el.style.transform = `rotate(${rot}deg) scale(${s})`; el.style.filter = on && k < .6 ? `blur(${(1.6 * (1 - k)).toFixed(2)}px)` : 'none';
}
// type on a text node by characters
function typeOn(el, text, t, t0, cps = 28) { if (typeof el === 'string') el = $(el); const n = clamp(Math.floor((t - t0) * cps), 0, text.length); el.textContent = t < t0 ? '' : text.slice(0, n); }
// highlight sweep: a block's width grows left to right
function sweep(el, t, t0, d = 0.3) { if (typeof el === 'string') el = $(el); if (!el) return; const k = P(t, t0, d, E.outCubic); el.style.transform = `scaleX(${k})`; el.style.opacity = t >= t0 ? 1 : 0; }
// feeds (video frames from r.mjs) and stills fallback
const FEEDS = {};
window.setFeed = (id, url) => new Promise(res => { let im = FEEDS[id]; if (!im) { im = FEEDS[id] = []; } const els = $$(`img[data-feed="${id}"]`); let left = els.length; if (!left) return res(); els.forEach(e => { e.onload = () => { if (--left === 0) res(); }; e.src = url; }); });
// stage scaling: pages are built at their native size (1920x1080 or 1080x1920)
function fitStage() { const s = $('#stage'); if (!s) return; }
async function imagesReady() { await Promise.all($$('img').map(i => i.complete ? 0 : new Promise(r => { i.onload = i.onerror = r; }))); await document.fonts.ready; }
// ---- research-papers additions ----
const KS = 1700 / 612; // Keshav page png px per pt (200 dpi)
// keshav phrase rect in page px: [x, y, w, h] from [x0pt, baselinePt, x1pt]
const kr = (l, pad = 2) => [(l[0] - pad) * KS, (l[1] - 8.6) * KS, (l[2] - l[0] + 2 * pad) * KS, 11.6 * KS];
// SVG path drawn by progress k (path needs pathLength="1")
function drawK(el, k) { if (typeof el === 'string') el = $(el); if (!el) return; el.style.strokeDasharray = '1 1'; el.style.strokeDashoffset = String(1 - clamp(k)); el.style.opacity = k > 0 ? 1 : 0; }
// clip reveal left->right (handwriting write-on)
function writeOn(el, k) { if (typeof el === 'string') el = $(el); if (!el) return; el.style.clipPath = `inset(-20% ${(100 - 100 * clamp(k)).toFixed(2)}% -20% -5%)`; el.style.opacity = k > 0 ? 1 : 0; }
// stage boot: pages define window.SCENES = {name: {t, draw(t)}}, window.TEST = draw(t) for video
function boot(build) {
  const W = +Q.get('w') || 1920, H = +Q.get('h') || 1080; const s = $('#stage'); s.style.width = W + 'px'; s.style.height = H + 'px';
  window.W = W; window.H = H;
  window.show = async (name) => { const sc = window.SCENES[name]; s.innerHTML = ''; sc.draw(sc.t ?? 99, s); await imagesReady(); };
  window.seek = async (t) => { s.innerHTML = ''; window.TEST(t, s); await imagesReady(); };
  imagesReady().then(() => { window.READY = true; });
}
// html helper
const h = (html) => { const d = document.createElement('div'); d.innerHTML = html.trim(); return d.firstElementChild; };
