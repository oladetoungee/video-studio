/* october-attacks direction helpers (shared by A / B / C; loaded after _shared/clips.js). Pure functions of time. */
'use strict';
/** a spoken phrase searched from about `near` seconds (the direction films pick lines from all over the video) */
function PA(q, near) { CUR = Math.max(0, WORDS.findIndex(w => w.t >= near - 0.8)); return P(q); }
const ez = (t, t0, d, k = 'outQuint') => MOTION.ease(t, t0, d, k);
const io = (t, t0, d) => MOTION.ease(t, t0, d, 'inOutQuart');
/** a sound cue that is never thinned (these tests place every sound by hand) */
const cue = (name, t, db = 0) => sfx(name, t, db, { keep: true });
/** draw an image at width w (top-left x, y); returns its height */
function imgW(name, x, y, w) { const im = IMG[name]; const h = w * im.height / im.width; ctx.drawImage(im, x, y, w, h); return h; }
/** fit text: the font size (<= size) that keeps s within maxW */
function fitSize(s, fontFn, size, maxW, ls = 0) { const w = tw(s, fontFn(size), ls * size); return w > maxW ? Math.floor(size * maxW / w) : size; }

/**
 * A real article clipping (a crop of the captured page, never altered): white sheet, the screenshot, a highlighter that
 * sweeps across the line she says (drawn on top with multiply, like a marker on paper), and a small source credit.
 * o: at (appear), hlAt (highlight sweep start), hl (highlight colour), crop [y0, y1] (clip px rows to show), pad,
 *    credit colour, rise (px), key (edit key), shadow (false), creditBelow (true), sheet colour
 * returns {h} (drawn height incl. credit)
 */
function clipCard(t, key, x, y, w, o = {}) {
  const c = CLIPS[key]; const im = IMG['clip_' + key]; if (!c || !im) throw new Error('clip ' + key);
  const a = o.at == null ? 1 : ez(t, o.at, 0.5); if (a <= 0.001) return { h: 0 };
  const pad = o.pad == null ? 28 : o.pad; const y0 = o.crop ? o.crop[0] : 0, y1 = o.crop ? o.crop[1] : c.h;
  const x0 = o.cropX ? o.cropX[0] : 0, x1 = o.cropX ? o.cropX[1] : c.w;   // a narrower crop of the same capture (a phone frame)
  const s = (w - 2 * pad) / (x1 - x0); const ih = (y1 - y0) * s; const h = ih + 2 * pad;
  const rise = (o.rise == null ? 40 : o.rise) * (1 - a);
  grp(o.key || 'clip ' + key, x, y, w, h, () => withA(Math.min(1, a * 1.6), () => {
    ctx.save(); ctx.translate(0, rise);
    themeFixed(() => {
      rect(x, y, w, h, o.sheet || '#FFFFFF');
      ctx.drawImage(im, x0, y0, x1 - x0, y1 - y0, x + pad, y + pad, (x1 - x0) * s, ih);
      if (o.hlAt != null) { ctx.save(); ctx.beginPath(); ctx.rect(x + pad, y + pad, (x1 - x0) * s, ih); ctx.clip(); c.hl.forEach((r, i) => {
        const p = ez(t, o.hlAt + i * 0.28, 0.42, 'outExpo'); if (p <= 0) return;
        if (r[1] + r[3] < y0 || r[1] > y1) return;
        const rx = x + pad + (r[0] - x0 - 6) * s, ry = y + pad + (r[1] - y0 - 2) * s, rw = (r[2] + 12) * s * p, rh = (r[3] + 4) * s;
        if (o.hlMode === 'underline') { ctx.fillStyle = o.hl || '#FFE14D'; ctx.fillRect(rx, ry + rh + 2, rw, Math.max(6, rh * 0.14)); }   // on a coloured ground a marker would vanish
        else { ctx.save(); ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = o.hl || '#FFE45A'; ctx.fillRect(rx, ry, rw, rh); ctx.restore(); }
      }); ctx.restore(); }
    });
    if (o.creditBelow !== false) { const cs = o.creditSize || 32; _mono(c.source + '  ' + c.date, x, y + h + cs * 1.45, cs, o.credit || g.mid, 'left', { ls: 0.08 }); }
    ctx.restore();
  }), { img: true });
  return { h: h + (o.creditBelow !== false ? (o.creditSize || 32) * 1.8 : 0) };
}

/** a flat browser address bar with a padlock (drawn, generic) */
function addressBar(x, y, w, h, url, o = {}) {
  const r = o.r == null ? h / 2 : o.r; fillRR(x, y, w, h, r, o.bar || '#FFFFFF'); if (o.line) strokeRR(x, y, w, h, r, o.line, 2);
  const lx = x + h * 0.55, ly = y + h / 2, s = h * 0.36, col = o.ink || '#111';
  // padlock: shackle + body
  ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = s * 0.2; ctx.beginPath(); ctx.arc(lx, ly - s * 0.18, s * 0.36, Math.PI, 0); ctx.stroke(); ctx.restore();
  rect(lx - s * 0.55, ly - s * 0.2, s * 1.1, s * 0.85, col);
  _txt(url, lx + s * 1.3, ly + 1, o.font || F.mono(h * 0.42, 500), col, 'left', 'middle');
}
