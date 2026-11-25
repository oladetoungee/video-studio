/* working-full-time directions: shared canvas helpers. Every frame is a pure function of time (no timers, no Math.random).
 * A page defines DIR = { size: [w,h] default, stills: {name: {t, aspect, draw?}}, draw(t) } and calls boot(DIR). */
'use strict';
const Q = new URLSearchParams(location.search);
let W = +Q.get('w') || 1920, H = +Q.get('h') || 1080, PORT = H > W;
const cv = document.createElement('canvas'); cv.width = W; cv.height = H; document.body.appendChild(cv);
const ctx = cv.getContext('2d');
const V = (l, p) => (PORT ? p : l);
let WORDS = [];
const IMG = {}; const FEED = {};
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const lerp = (a, b, p) => a + (b - a) * p;
const EASE = {
  outQuint: (p) => 1 - Math.pow(1 - p, 5), outExpo: (p) => (p >= 1 ? 1 : 1 - Math.pow(2, -10 * p)),
  inOutQuart: (p) => (p < 0.5 ? 8 * p * p * p * p : 1 - Math.pow(-2 * p + 2, 4) / 2), inExpo: (p) => (p <= 0 ? 0 : Math.pow(2, 10 * p - 10)),
  outBack: (p) => { const c = 1.4; return 1 + (c + 1) * Math.pow(p - 1, 3) + c * Math.pow(p - 1, 2); }, lin: (p) => p,
};
const ez = (t, t0, d, k = 'outQuint') => EASE[k](clamp((t - t0) / d));
const io = (t, t0, d) => ez(t, t0, d, 'inOutQuart');
/** hash-based deterministic noise */
const hash = (n) => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
const norm = (s) => s.toLowerCase().replace(/[^a-z0-9' ]/g, '');
/** P('phrase', near): her words, searched from near-1 s. {t, e, w: [start of each word]} */
function P(q, near = 0) {
  const qs = norm(q).split(/\s+/).filter(Boolean);
  for (let i = 0; i < WORDS.length; i++) {
    if (WORDS[i].t < near - 1) continue;
    let ok = true; for (let j = 0; j < qs.length; j++) { const w = WORDS[i + j]; if (!w || norm(w.w).replace(/\s+/g, '') !== qs[j].replace(/\s+/g, '')) { ok = false; break; } }
    if (ok) { const ws = WORDS.slice(i, i + qs.length); return { t: ws[0].t, e: ws[ws.length - 1].e, w: ws.map(w => w.t) }; }
  }
  throw new Error('phrase not found: ' + q + ' @' + near);
}
function withA(a, fn) { if (a <= 0.001) return; ctx.save(); ctx.globalAlpha *= clamp(a); fn(); ctx.restore(); }
function rect(x, y, w, h, c) { ctx.fillStyle = c; ctx.fillRect(x, y, w, h); }
function rrPath(x, y, w, h, r) { ctx.beginPath(); ctx.roundRect(x, y, w, h, r); }
function fillRR(x, y, w, h, r, c) { rrPath(x, y, w, h, r); ctx.fillStyle = c; ctx.fill(); }
function strokeR(x, y, w, h, c, lw = 3) { ctx.strokeStyle = c; ctx.lineWidth = lw; ctx.strokeRect(x + lw / 2, y + lw / 2, w - lw, h - lw); }
function line(x1, y1, x2, y2, c, lw = 2) { ctx.strokeStyle = c; ctx.lineWidth = lw; ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); }
function circle(x, y, r, c) { ctx.fillStyle = c; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.fill(); }
function font(f) { ctx.font = f; }
function txt(s, x, y, f, c, align = 'left', base = 'alphabetic', ls = 0) {
  ctx.font = f; ctx.fillStyle = c; ctx.textAlign = align; ctx.textBaseline = base; ctx.letterSpacing = ls + 'px'; ctx.fillText(s, x, y); ctx.letterSpacing = '0px';
}
function tw(s, f, ls = 0) { ctx.font = f; ctx.letterSpacing = ls + 'px'; const w = ctx.measureText(s).width; ctx.letterSpacing = '0px'; return w; }
/** words of a line appear on her word times (blur-free rise + fade, 0.3 s each) */
function wordsOn(t, words, times, x, y, f, c, o = {}) {
  let cx = x; const sp = tw(' ', f);
  words.forEach((w, i) => { const p = ez(t, times[Math.min(i, times.length - 1)], o.d || 0.32); const ww = tw(w, f, o.ls || 0);
    withA(p, () => txt(w, cx, y + (o.rise == null ? 18 : o.rise) * (1 - p), (o.fonts && o.fonts[i]) || f, (o.cols && o.cols[i]) || c, 'left', 'alphabetic', o.ls || 0)); cx += ww + sp; });
  return cx - sp - x;
}
/** draw an image to cover a box (object-fit: cover), optional focus fx, fy in 0..1 */
function cover(im, x, y, w, h, fx = 0.5, fy = 0.5, zoom = 1) {
  if (!im) return; const iw = im.naturalWidth || im.width, ih = im.naturalHeight || im.height; const s = Math.max(w / iw, h / ih) * zoom;
  const sw = w / s, sh = h / s; const sx = clamp((iw - sw) * fx, 0, iw - sw), sy = clamp((ih - sh) * fy, 0, ih - sh);
  ctx.drawImage(im, sx, sy, sw, sh, x, y, w, h);
}
/** a real page clipping: white sheet + crop + highlighter (multiply) sweeping each box + source line under it */
function clipCard(t, key, x, y, w, o = {}) {
  const c = CLIPS[key], im = IMG['clip_' + key]; const a = o.at == null ? 1 : ez(t, o.at, 0.45); if (a <= 0.001) return 0;
  const pad = o.pad == null ? 26 : o.pad; const s = (w - 2 * pad) / c.w; const ih = c.h * s, h = ih + 2 * pad; const rise = 30 * (1 - a);
  withA(Math.min(1, a * 1.6), () => { ctx.save(); ctx.translate(0, rise);
    if (o.shadow !== false) { rect(x + 10, y + 10, w, h, 'rgba(0,0,0,0.18)'); }
    rect(x, y, w, h, '#FFFFFF'); ctx.drawImage(im, x + pad, y + pad, c.w * s, ih);
    if (o.hlAt != null) c.hl.forEach((r, i) => { if (o.only && !o.only.includes(i)) return; const p = ez(t, (Array.isArray(o.hlAt) ? o.hlAt[i] : o.hlAt + i * 0.3), 0.42, 'outExpo'); if (p <= 0) return;
      ctx.save(); ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = o.hl || '#FFE45A'; ctx.fillRect(x + pad + r[0] * s, y + pad + r[1] * s, r[2] * s * p, r[3] * s); ctx.restore(); });
    if (o.credit !== false) txt(c.source + '  ·  ' + c.date, x, y + h + (o.cs || 30) * 1.45, `500 ${o.cs || 30}px ${o.creditFont || '"JetBrains Mono"'}`, o.creditCol || '#8A8F98', 'left');
    ctx.restore(); });
  return h;
}
function loadImg(name, src) { return new Promise((res) => { const im = new Image(); im.onload = () => { IMG[name] = im; res(); }; im.onerror = () => { console.warn('img fail ' + src); res(); }; im.src = src; }); }
window.setFeed = (id, d) => new Promise((res) => { const im = new Image(); im.onload = () => { FEED[id] = im; res(); }; im.src = d; });
async function boot(DIR) {
  WORDS = await (await fetch('../_shared/words.json')).json();
  const imgs = Object.assign({}, DIR.images || {}); if (typeof CLIPS !== 'undefined') for (const k in CLIPS) imgs['clip_' + k] = '../_src/' + CLIPS[k].file;
  await Promise.all(Object.entries(imgs).map(([k, v]) => loadImg(k, v)));
  await document.fonts.ready; for (const f of DIR.fonts || []) { try { await document.fonts.load(f); } catch (e) {} }
  if (DIR.init) DIR.init();
  window.seek = async (t) => { ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, W, H); DIR.draw(t); };
  window.show = async (name) => { const s = DIR.stills[name]; if (!s) throw new Error('no still ' + name);
    if (s.feeds) for (const [id, src] of Object.entries(s.feeds)) await new Promise((r) => { const im = new Image(); im.onload = () => { FEED[id] = im; r(); }; im.onerror = r; im.src = src; });
    await window.seek(s.t); };
  window.READY = true;
}
/* sound cues: pages list them in DIR.cues(t0,t1) -> [{t, role, db}] for mixtest */
