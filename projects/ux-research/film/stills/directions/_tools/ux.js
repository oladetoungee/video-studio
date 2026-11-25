// Shared helpers for the ux-research direction pages (loaded after kit.js). Every frame is a pure function of t.
// A page registers animators with on(fn(t)); window.seek(t) runs them all.
const ANIM = [];
const on = (fn) => ANIM.push(fn);
window.seek = (t) => { for (const f of ANIM) f(t); return true; };
const eQuart = (x) => (x <= 0 ? 0 : x >= 1 ? 1 : x < 0.5 ? 8 * x ** 4 : 1 - Math.pow(-2 * x + 2, 4) / 2); // inOutQuart .76,0,.24,1
const eExpo = (x) => (x <= 0 ? 0 : x >= 1 ? 1 : 1 - Math.pow(2, -10 * x)); // outExpo: arrive fast, land soft
const eQuint = (x) => (x <= 0 ? 0 : x >= 1 ? 1 : 1 - Math.pow(1 - x, 5));
const pin = (x) => clamp(x);

// ---------- camera over a world layer ----------
// keys: [[t, x, y, z]] ; moves between keys over dur seconds ending at the key time, inOutQuart
function camera(world, keys, dur = 0.8) {
  // directional motion blur from the camera speed (SVG gaussian with separate x / y deviation), clears as it settles
  const NS = 'http://www.w3.org/2000/svg', sv = document.createElementNS(NS, 'svg');
  sv.setAttribute('width', 0); sv.setAttribute('height', 0); sv.style.position = 'absolute';
  sv.innerHTML = '<filter id="camblur" x="-5%" y="-5%" width="110%" height="110%"><feGaussianBlur id="camdev" stdDeviation="0 0"/></filter>';
  document.body.appendChild(sv); const dev = sv.querySelector('#camdev');
  const at = (t) => { let x = keys[0][1], y = keys[0][2], z = keys[0][3] ?? 1;
    for (let i = 1; i < keys.length; i++) { const [tk, kx, ky, kz = 1] = keys[i]; const p = eQuart(prog(t, tk - (keys[i][4] ?? dur), tk)); x = lerp(x, kx, p); y = lerp(y, ky, p); z = lerp(z, kz, p); }
    return [x, y, z]; };
  on((t) => {
    const [x, y, z] = at(t), [x0, y0, z0] = at(t - 1 / 30);
    world.style.transform = `translate(${W / 2}px,${H / 2}px) scale(${z}) translate(${-x}px,${-y}px)`;
    const vx = Math.abs(x - x0) * z, vy = Math.abs(y - y0) * z, zz = Math.abs(z - z0) * 400; // px per frame on screen
    const bx = Math.min(36, vx * 0.35), by = Math.min(36, vy * 0.35 + zz * 0.2);
    if (bx + by < 0.6) { world.style.filter = 'none'; } else { dev.setAttribute('stdDeviation', `${(bx / z).toFixed(2)} ${(by / z).toFixed(2)}`); world.style.filter = 'url(#camblur)'; }
  });
}

// ---------- paper things ----------
function sticky(parent, x, y, s, text, o = {}) {
  const e = el('div', { left: x + 'px', top: y + 'px', width: s + 'px', height: s + 'px', background: o.bg || '#FFE15A',
    display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', boxSizing: 'border-box',
    padding: (o.pad ?? 18) + 'px', font: `${o.fs || 44}px/1.02 "Marker"`, color: o.ink || '#17140F', transformOrigin: '50% 8%',
    opacity: 0 }, text, parent);
  if (o.scribble) e.appendChild(scribbles(s, o.seed || 1));
  if (text) document.fonts.ready.then(() => { // shrink the marker text until no word overflows the note
    let f = o.fs || 44; const sp = document.createElement('span'); sp.innerHTML = text; e.innerHTML = ''; e.appendChild(sp);
    sp.style.display = 'inline-block'; sp.style.maxWidth = (s - 2 * (o.pad ?? 18)) + 'px';
    while (f > 20 && (sp.scrollWidth > s - 2 * (o.pad ?? 18) || sp.offsetHeight > s - 2 * (o.pad ?? 18))) { f -= 2; e.style.fontSize = f + 'px'; }
  });
  return e;
}
function scribbles(s, seed) { // illegible marker lines (stand-in for real notes; scenes that use it carry an "illustration" label)
  const n = 3 + Math.floor(hash(seed) * 2); let d = '';
  for (let i = 0; i < n; i++) {
    const y = s * (0.26 + i * 0.17), x0 = s * 0.14, x1 = s * (0.55 + hash(seed * 7 + i) * 0.32);
    d += `M${x0} ${y} `; for (let x = x0; x < x1; x += s * 0.06) d += `Q${x + s * 0.015} ${y - s * 0.035} ${x + s * 0.03} ${y} T${x + s * 0.06} ${y} `;
  }
  const v = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  v.setAttribute('width', s); v.setAttribute('height', s); v.style.position = 'absolute'; v.style.left = 0; v.style.top = 0;
  v.innerHTML = `<path d="${d}" fill="none" stroke="#2A2620" stroke-width="${s * 0.028}" stroke-linecap="round" opacity=".8"/>`;
  return v;
}
// lands like a sticky note slapped on a wall: big + tilted -> spring to rest; shadow tightens as it lands
function slap(e, t0, rot = 0, o = {}) {
  const lift = o.lift ?? 1;
  on((t) => {
    const lt = t - t0;
    if (lt < 0) { e.style.opacity = 0; return; }
    const p = spring(lt, o.f || 2.6, o.z || 0.58), q = eExpo(prog(lt, 0, 0.35));
    const sc = lerp(o.from ?? 1.32, 1, p), r = lerp(rot + (o.spin ?? 9), rot, p), dy = lerp(o.dy ?? -36, 0, p);
    e.style.opacity = clamp(lt / 0.07);
    e.style.transform = `translate(${o.dx ? lerp(o.dx, 0, p) : 0}px,${dy}px) rotate(${r}deg) scale(${sc})`;
    const b = lerp(46, 16, q) * lift, oy = lerp(30, 9, q) * lift;
    e.style.boxShadow = `0 ${oy}px ${b}px -6px rgba(0,0,0,${0.42 * lift}), 0 1px 0 rgba(0,0,0,.08)`;
  });
}
function card(parent, x, y, w, h, html, o = {}) {
  const lines = o.lines === false ? '' : `repeating-linear-gradient(to bottom, transparent 0 ${o.lh || 52}px, rgba(70,120,200,.22) ${o.lh || 52}px ${(o.lh || 52) + 2}px)`;
  const e = el('div', { left: x + 'px', top: y + 'px', width: w + 'px', height: h + 'px', background: '#FFFDF6',
    boxSizing: 'border-box', padding: o.pad || '34px 44px', color: '#17140F', transformOrigin: '50% 50%', opacity: 0 }, '', parent);
  if (o.lines !== false) { // ruled index card: red head rule + pale blue lines (printed card, not a gradient fill)
    el('div', { left: 0, right: 0, top: (o.head || 92) + 'px', height: '3px', background: 'rgba(222,72,62,.55)' }, '', e);
    for (let yy = (o.head || 92) + (o.lh || 52); yy < h - 10; yy += o.lh || 52) el('div', { left: 0, right: 0, top: yy + 'px', height: '2px', background: 'rgba(80,130,210,.20)' }, '', e);
  }
  const inner = el('div', { position: 'relative' }, html, e); inner.style.position = 'relative';
  return e;
}
function tape(parent, x, y, w, rot) {
  return el('div', { left: x + 'px', top: y + 'px', width: w + 'px', height: '44px', background: 'rgba(240,236,222,.72)',
    transform: `rotate(${rot}deg)`, boxShadow: '0 1px 2px rgba(0,0,0,.12)', opacity: 0 }, '', parent);
}
function polaroid(parent, x, y, w, src, cap, o = {}) {
  const e = el('div', { left: x + 'px', top: y + 'px', width: w + 'px', background: '#FBFAF6', padding: `${w * 0.06}px ${w * 0.06}px 0`,
    boxSizing: 'border-box', opacity: 0, transformOrigin: '50% 0%' }, '', parent);
  const ph = el('div', { position: 'relative', width: '100%', height: (w * 0.88 * (o.ar || 1)) + 'px', overflow: 'hidden', background: '#222' }, '', e);
  ph.style.position = 'relative';
  const img = el('img', { left: 0, top: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: o.pos || '50% 30%' }, '', ph);
  img.src = src;
  const c = el('div', { position: 'relative', height: (w * 0.24) + 'px', display: 'flex', alignItems: 'center', justifyContent: 'center',
    font: `${o.fs || 40}px/1 "Hand"`, fontWeight: 600, color: '#24201A' }, cap, e); c.style.position = 'relative';
  return e;
}
// marker stroke drawn on along its path between t0 and t1
function stroke(parent, d, t0, t1, o = {}) {
  const v = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  v.setAttribute('width', o.w || W * 3); v.setAttribute('height', o.h || H * 3);
  Object.assign(v.style, { position: 'absolute', left: 0, top: 0, overflow: 'visible', pointerEvents: 'none' });
  v.innerHTML = `<path d="${d}" pathLength="1" fill="none" stroke="${o.c || '#F4F0E6'}" stroke-width="${o.sw || 9}" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="1 1"/>`;
  parent.appendChild(v); const p = v.firstChild;
  on((t) => { const k = o.ease ? o.ease(prog(t, t0, t1)) : eQuint(prog(t, t0, t1)); p.setAttribute('stroke-dashoffset', 1 - k); v.style.opacity = t < t0 ? 0 : 1; });
  return v;
}
// hand loop around a box (x,y,w,h), slightly open like a real marker circle
function loopPath(x, y, w, h, seed = 1, pad = 24) {
  const cx = x + w / 2, cy = y + h / 2, rx = w / 2 + pad, ry = h / 2 + pad * 0.85; let d = '';
  for (let i = 0; i <= 44; i++) {
    const a = -2.2 + (i / 44) * Math.PI * 2.12, wob = 1 + (hash(seed * 31 + i) - 0.5) * 0.04;
    const px = cx + Math.cos(a) * rx * wob, py = cy + Math.sin(a) * ry * wob * (1 + i / 400);
    d += (i ? 'L' : 'M') + px.toFixed(1) + ' ' + py.toFixed(1) + ' ';
  }
  return d;
}
// text written on by a marker: reveal left to right (clip), between t0 and t1
function write(e, t0, t1) { on((t) => { const k = eQuint(prog(t, t0, t1)); e.style.opacity = t < t0 ? 0 : 1; e.style.clipPath = `inset(-20% ${100 - k * 100}% -20% -5%)`; }); }
function fadeIn(e, t0, d = 0.3, dy = 14) { on((t) => { const k = eExpo(prog(t, t0, t0 + d)); e.style.opacity = k; e.style.transform = `translateY(${(1 - k) * dy}px)`; }); }
// word-by-word type-on (blur to sharp), each word a span
function words(e, t0, gap = 0.14) { // keeps inner markup (<br>, coloured spans): wraps each word of every text node
  const walk = (n) => [...n.childNodes].forEach((c) => {
    if (c.nodeType === 3) { const f = document.createDocumentFragment(); c.textContent.split(/(\s+)/).forEach((w) => { if (!w) return; if (w.trim()) { const s = document.createElement('span'); s.className = 'w'; s.style.display = 'inline-block'; s.textContent = w; f.appendChild(s); } else f.appendChild(document.createTextNode(w)); }); c.replaceWith(f); }
    else if (c.nodeType === 1 && c.tagName !== 'BR') walk(c);
  });
  walk(e); const sp = [...e.querySelectorAll('span.w')];
  on((t) => sp.forEach((s, i) => { const k = eExpo(prog(t, t0 + i * gap, t0 + i * gap + 0.22)); s.style.opacity = k; s.style.filter = k > 0.99 ? 'none' : `blur(${(1 - k) * 8}px)`; s.style.transform = `translateY(${(1 - k) * 10}px)`; }));
}
