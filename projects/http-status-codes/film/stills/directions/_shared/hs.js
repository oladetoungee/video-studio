/* http-status-codes direction helpers (shared by A / B / C / TH; loaded after _shared/clips.js). Pure functions of time.
 * Times are seconds in her raw recording (kit/raw-video.mov = voice.m4a); film.json intro 0, so WORDS times = raw times.
 * Motion-test windows (73.9-83.3, 110.0-119.9, 359.3-368.6) contain none of the CLEANUP cuts, so raw = cleaned voice there. */
'use strict';
const ez = (t, t0, d, k = 'outQuint') => MOTION.ease(t, t0, d, k);
const io = (t, t0, d) => MOTION.ease(t, t0, d, 'inOutQuart');
const cue = (name, t, db = 0) => sfx(name, t, db, { keep: true });
/** draw image `name` to cover the box (crop, never stretch); fx/fy = focus 0..1 */
function cover(name, x, y, w, h, fx = 0.5, fy = 0.5, zoom = 1) {
  const im = IMG[name]; if (!im) throw new Error('no image ' + name);
  const s = Math.max(w / im.width, h / im.height) * zoom; const sw = w / s, sh = h / s;
  const sx = clamp((im.width - sw) * fx, 0, im.width - sw), sy = clamp((im.height - sh) * fy, 0, im.height - sh);
  themeFixed(() => ctx.drawImage(im, sx, sy, sw, sh, x, y, w, h));
}
function clipRect(x, y, w, h, fn) { ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip(); fn(); ctx.restore(); }
function clipRR(x, y, w, h, r, fn) { ctx.save(); rr(x, y, w, h, r); ctx.clip(); fn(); ctx.restore(); }
/** her real footage frame: full frame (cover) or a window; never flipped, never retouched */
function footage(name, x = 0, y = 0, w = W, h = H, fx = 0.5, fy = 0.5, zoom = 1) { cover(name, x, y, w, h, fx, fy, zoom); }
/** her cut-out (footage with the Vision person matte as alpha), drawn with the same crop as footage(...) */
const _cut = {};
function cutout(name, matte, x = 0, y = 0, w = W, h = H, fx = 0.5, fy = 0.5, zoom = 1) {
  if (!_cut[name]) { const im = IMG[name], m = IMG[matte]; const c = document.createElement('canvas'); c.width = im.width; c.height = im.height; const X = c.getContext('2d');
    X.drawImage(m, 0, 0, c.width, c.height); const md = X.getImageData(0, 0, c.width, c.height); X.clearRect(0, 0, c.width, c.height); X.drawImage(im, 0, 0);
    const d = X.getImageData(0, 0, c.width, c.height); for (let i = 0; i < d.data.length; i += 4) d.data[i + 3] = md.data[i]; X.putImageData(d, 0, 0); _cut[name] = c; }
  const im = _cut[name]; const s = Math.max(w / im.width, h / im.height) * zoom; const sw = w / s, sh = h / s;
  const sx = clamp((im.width - sw) * fx, 0, im.width - sw), sy = clamp((im.height - sh) * fy, 0, im.height - sh);
  themeFixed(() => ctx.drawImage(im, sx, sy, sw, sh, x, y, w, h));
}
/**
 * A real page clipping (a crop of the captured page, never altered) with a marker that sweeps across the words she says
 * and a small source credit. o: at, hlAt, hl (colour), pad, sheet, credit (colour), creditSize, rise, tilt, tape
 */
function clipCard(t, key, x, y, w, o = {}) {
  const c = CLIPS[key]; const im = IMG['clip_' + key]; if (!c || !im) throw new Error('clip ' + key);
  const a = o.at == null ? 1 : ez(t, o.at, 0.5); if (a <= 0.001) return { h: 0 };
  const pad = o.pad == null ? 26 : o.pad; const s = (w - 2 * pad) / c.w; const ih = c.h * s; const h = ih + 2 * pad;
  const rise = (o.rise == null ? 36 : o.rise) * (1 - a);
  grp(o.key || 'clip ' + key, x, y, w, h, () => withA(Math.min(1, a * 1.6), () => {
    ctx.save(); ctx.translate(x + w / 2, y + rise + h / 2); if (o.tilt) ctx.rotate(o.tilt); ctx.translate(-x - w / 2, -y - h / 2);
    themeFixed(() => {
      if (o.shadow) rect(x + o.shadow, y + o.shadow, w, h, 'rgba(0,0,0,0.18)');
      rect(x, y, w, h, o.sheet || '#FFFFFF');
      ctx.drawImage(im, 0, 0, c.w, c.h, x + pad, y + pad, c.w * s, ih);
      if (o.hlAt != null) clipRect(x + pad, y + pad, c.w * s, ih, () => c.hl.forEach((r, i) => {
        const p = ez(t, o.hlAt + i * 0.28, 0.5, 'outExpo'); if (p <= 0) return;
        ctx.save(); ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = o.hl || '#FFE45A';
        ctx.fillRect(x + pad + (r[0] - 6) * s, y + pad + (r[1] - 2) * s, (r[2] + 12) * s * p, (r[3] + 4) * s); ctx.restore();
      }));
      if (o.tape) { const tw0 = Math.min(180, w * 0.3); ctx.save(); ctx.translate(x + w / 2, y + 4); ctx.rotate(-0.03); rect(-tw0 / 2, -22, tw0, 44, o.tape); ctx.restore(); }
    });
    const cs = o.creditSize || 26;
    if (o.creditBelow !== false) _txt(c.source.toUpperCase(), x, y + h + cs * 1.6, o.creditFont ? o.creditFont(cs) : F.mono(cs), o.credit || g.mid, 'left', 'alphabetic', cs * 0.04);
    ctx.restore();
  }), { img: true });
  return { h };
}
/** her usual 16:9 caption (Helvetica Neue, lower third). o: size, y, col, hi {word: colour}, box, weight */
function herCaption(s, o = {}) {
  const size = o.size || 50; const y = o.y || 990; const font = `${o.weight || 500} ${size}px "Helvetica Neue"`; const ls = -size * 0.02;
  const ws = s.split(' '); const sp = tw(' ', font); const total = ws.reduce((a, w) => a + tw(w, font, ls), 0) + sp * (ws.length - 1);
  let x = (o.x || CX) - total / 2;
  if (o.box) rect(x - 22, y - size * 0.98, total + 44, size * 1.36, o.box);
  ws.forEach((w) => { if (o.stroke) { setFont(font, ls); ctx.lineJoin = 'round'; ctx.lineWidth = o.stroke; ctx.strokeStyle = '#000'; ctx.textAlign = 'left'; ctx.strokeText(w, x, y); }
    _txt(w, x, y, font, (o.hi && o.hi[w]) || o.col || '#FFFFFF', 'left', 'alphabetic', ls); x += tw(w, font, ls) + sp; });
}
/** short captions C1: heavy condensed caps (Anton-like via Funnel Display 800), white + black stroke, one coloured word */
function capCaps(words, hi, y, o = {}) {
  const fs = o.size || 92; const font = o.font || `800 ${fs}px "Funnel Display"`; const ws = words.split(' '); const sp = tw(' ', font);
  const total = ws.reduce((a, w) => a + tw(w, font), 0) + sp * (ws.length - 1); let x = CX - total / 2;
  ws.forEach((w) => { setFont(font); ctx.lineJoin = 'round'; ctx.lineWidth = o.stroke || 14; ctx.strokeStyle = '#000'; ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic'; ctx.strokeText(w, x, y);
    ctx.fillStyle = w === hi ? (o.hiCol || '#FFE125') : '#FFFFFF'; ctx.fillText(w, x, y); x += tw(w, font) + sp; });
}
/** black phrase card (her #29 favourite): pure black, the line in an accent serif, centred, short lines */
function phraseCard(t, t0, lines, col, o = {}) {
  rect(0, 0, W, H, '#000000'); const fs = o.size || V(118, 112); const lh = fs * 1.02; const y0 = H / 2 - (lines.length - 1) * lh / 2 + fs * 0.3;
  lines.forEach((ln, i) => withA(ez(t, t0 + (o.stagger || 0.12) * i, 0.3), () => txt(ln, CX, y0 + i * lh, `400 ${fs}px "Instrument Serif"`, col, 'center', 'alphabetic', 0, 'phrase ' + ln)));
}
