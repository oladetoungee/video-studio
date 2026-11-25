/* edge-case direction helpers (copied from dark-patterns' dp.js) (shared by A / B / C / TH; loaded after _shared/clips.js). Pure functions of time.
 * Times are seconds in her raw recording (kit/raw-video.mov = voice.m4a); film.json intro 0, so WORDS times = raw times. */
'use strict';
const ez = (t, t0, d, k = 'outQuint') => MOTION.ease(t, t0, d, k);
const io = (t, t0, d) => MOTION.ease(t, t0, d, 'inOutQuart');
/** a sound cue never thinned (the tests place every sound by hand) */
const cue = (name, t, db = 0) => sfx(name, t, db, { keep: true });
/** draw image `name` to cover the box (crop, never stretch); fx/fy = focus 0..1 */
function cover(name, x, y, w, h, fx = 0.5, fy = 0.5, zoom = 1) {
  const im = IMG[name]; if (!im) throw new Error('no image ' + name);
  const s = Math.max(w / im.width, h / im.height) * zoom; const sw = w / s, sh = h / s;
  const sx = clamp((im.width - sw) * fx, 0, im.width - sw), sy = clamp((im.height - sh) * fy, 0, im.height - sh);
  themeFixed(() => ctx.drawImage(im, sx, sy, sw, sh, x, y, w, h));
}
/** draw image at width w (top-left x, y); returns its height */
function imgW(name, x, y, w) { const im = IMG[name]; const h = w * im.height / im.width; themeFixed(() => ctx.drawImage(im, x, y, w, h)); return h; }
function fitSize(s, fontFn, size, maxW) { const w = tw(s, fontFn(size)); return w > maxW ? Math.floor(size * maxW / w) : size; }
/** clip path helpers */
function clipRect(x, y, w, h, fn) { ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip(); fn(); ctx.restore(); }
function clipCircle(cx, cy, r, fn) { ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.clip(); fn(); ctx.restore(); }

/**
 * A real page clipping (a crop of the captured page, never altered): sheet, the screenshot, a marker that sweeps across the
 * words she says, and a small source credit. o: at, hlAt, hl (marker colour), hlMode ('marker' | 'block' | 'underline'),
 * crop [y0,y1], cropX [x0,x1], pad, credit (colour), creditSize, rise, key, sheet, creditBelow, only (indexes of hl boxes)
 */
function clipCard(t, key, x, y, w, o = {}) {
  const c = CLIPS[key]; const im = IMG['clip_' + key]; if (!c || !im) throw new Error('clip ' + key);
  const a = o.at == null ? 1 : ez(t, o.at, 0.5); if (a <= 0.001) return { h: 0 };
  const pad = o.pad == null ? 26 : o.pad; const y0 = o.crop ? o.crop[0] : 0, y1 = o.crop ? o.crop[1] : c.h;
  const x0 = o.cropX ? o.cropX[0] : 0, x1 = o.cropX ? o.cropX[1] : c.w;
  const s = (w - 2 * pad) / (x1 - x0); const ih = (y1 - y0) * s; const h = ih + 2 * pad;
  const rise = (o.rise == null ? 36 : o.rise) * (1 - a);
  grp(o.key || 'clip ' + key, x, y, w, h, () => withA(Math.min(1, a * 1.6), () => {
    ctx.save(); ctx.translate(0, rise);
    themeFixed(() => {
      rect(x, y, w, h, o.sheet || '#FFFFFF');
      ctx.drawImage(im, x0, y0, x1 - x0, y1 - y0, x + pad, y + pad, (x1 - x0) * s, ih);
      if (o.hlAt != null) clipRect(x + pad, y + pad, (x1 - x0) * s, ih, () => c.hl.forEach((r, i) => {
        if (o.only && !o.only.includes(i)) return;
        const p = ez(t, (Array.isArray(o.hlAt) ? o.hlAt[i] : o.hlAt + i * 0.28), 0.42, 'outExpo'); if (p <= 0) return;
        const rx = x + pad + (r[0] - x0 - 6) * s, ry = y + pad + (r[1] - y0 - 2) * s, rw = (r[2] + 12) * s * p, rh = (r[3] + 4) * s;
        if (o.hlMode === 'underline') { ctx.fillStyle = o.hl || '#FFE14D'; ctx.fillRect(rx, ry + rh + 2, rw, Math.max(6, rh * 0.14)); }
        else if (o.hlMode === 'ring') { if (p > 0.05) { ctx.save(); ctx.strokeStyle = o.hl; ctx.lineWidth = 5; ctx.beginPath(); ctx.ellipse(rx + (r[2] + 12) * s / 2, ry + rh / 2, (r[2] + 40) * s / 2, rh * 0.95, -0.03, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * p); ctx.stroke(); ctx.restore(); } }
        else { ctx.save(); ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = o.hl || '#FFE45A'; ctx.fillRect(rx, ry, rw, rh); ctx.restore(); }
      }));
    });
    if (o.creditBelow !== false) { const cs = o.creditSize || 30; _txt((o.creditText || (c.source + (c.date ? '  ·  ' + c.date : ''))).toUpperCase(), x, y + h + cs * 1.5, o.creditFont ? o.creditFont(cs) : F.mono(cs, 500), o.credit || g.mid, 'left', 'alphabetic', cs * 0.06); }
    ctx.restore();
  }), { img: true });
  return { h: h + (o.creditBelow !== false ? (o.creditSize || 30) * 1.9 : 0) };
}

/** a checkbox (generic UI) */
function checkbox(x, y, s, on, col, tick, lw) {
  strokeR(x, y, s, s, col, lw || Math.max(2, s * 0.09));
  if (on > 0) { ctx.save(); ctx.strokeStyle = tick || col; ctx.lineWidth = Math.max(3, s * 0.14); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.beginPath();
    const p = clamp(on); const a = [x + s * 0.2, y + s * 0.52], b = [x + s * 0.42, y + s * 0.74], c = [x + s * 0.8, y + s * 0.26];
    ctx.moveTo(...a); if (p < 0.4) ctx.lineTo(lerp(a[0], b[0], p / 0.4), lerp(a[1], b[1], p / 0.4)); else { ctx.lineTo(...b); const q = (p - 0.4) / 0.6; ctx.lineTo(lerp(b[0], c[0], q), lerp(b[1], c[1], q)); }
    ctx.stroke(); ctx.restore(); }
}
/** a hand-drawn loop around a box (marker circle), p 0..1 */
function loop(cx, cy, rx, ry, p, col, lw = 8, rot = -0.06) {
  if (p <= 0) return; ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round'; ctx.beginPath();
  const n = 60, end = Math.PI * 2.15 * p;
  for (let i = 0; i <= n; i++) { const a = -Math.PI * 0.6 + end * i / n; const w = 1 + 0.04 * Math.sin(a * 3 + 1); const X = cx + Math.cos(a + rot) * rx * w, Y = cy + Math.sin(a) * ry * w; i ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); }
  ctx.stroke(); ctx.restore();
}
/** her real footage frame: full frame (cover), or a crop window; never flipped */
function footage(name, x = 0, y = 0, w = W, h = H, fx = 0.5, fy = 0.5, zoom = 1) { cover(name, x, y, w, h, fx, fy, zoom); }
/** her usual 16:9 caption (Helvetica Neue Light, cream #E2D8CC, tight, lower third; a faint box only if asked) */
function herCaption(s, o = {}) {
  const size = o.size || 50; const y = o.y || 968; const font = `700 ${size}px "Helvetica Neue"`;   // her 16:9 captions: Helvetica Neue, cream, no box on her footage
  const w = tw(s, font, -size * 0.04);
  if (o.box) rect((o.x || CX) - w / 2 - 18, y - size * 0.95, w + 36, size * 1.3, 'rgba(0,0,0,0.55)');
  ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.55)'; ctx.shadowBlur = 8; ctx.shadowOffsetY = 2; _txt(s, o.x || CX, y, font, o.col || '#FEEDB3', 'center', 'alphabetic', -size * 0.02); ctx.restore();
}
