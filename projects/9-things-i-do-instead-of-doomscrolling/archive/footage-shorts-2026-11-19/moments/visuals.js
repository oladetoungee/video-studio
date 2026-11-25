/* doomscrolling: picture-led visuals (her rule 2026-11-07 evening, "show, don't type"; the model: the edge-cases rework).
 * BG.pic = a Pexels photo full-bleed with a slow push; BG.trio = a photo row (one short word each, or none); BG.feed = a phone
 * whose feed never ends (and hearts for the influencers); BG.reps = a push-up counter 1 -> 10; BG.apps = a phone's apps going
 * away and a time limit filling. Off-black ground (BG.ink) for most of them, so the video is not all butter. No borders, no boxes.
 * Loaded after common.js (talking-head.json "common"). Photos: film/assets/CREDITS.md. */
'use strict';
const BGV = { ink: '#161616', ink2: '#242424', paper: '#FFFDF5' };
/** photo full-bleed in r: o.key (images key), o.at, o.fx/o.fy, o.push */
BG.pic = (o) => { BG.sfx('shutter', o.at, -6);
  return (t, r) => { r = BG.rr(r); rect(r.x, r.y, r.w, r.h, BGV.ink); const im = IMG[o.key]; if (!im) return;
    const a = bgE(t, o.at, 0.4); const k = 1.02 + (o.push == null ? 0.07 : o.push) * clamp((t - o.at) / (o.dur || 8));
    const s = Math.max(r.w / im.width, r.h / im.height) * k, sw = r.w / s, sh = r.h / s;
    const sx = clamp((im.width - sw) * (o.fx == null ? 0.5 : o.fx), 0, im.width - sw), sy = clamp((im.height - sh) * (o.fy == null ? 0.5 : o.fy), 0, im.height - sh);
    withA(Math.max(0.001, Math.min(1, a * 1.5)), () => grp('photo-' + o.key, r.x, r.y, r.w, r.h, () => { ctx.save(); ctx.beginPath(); ctx.rect(r.x, r.y, r.w, r.h); ctx.clip();
      themeFixed(() => ctx.drawImage(im, sx, sy, sw, sh, r.x, r.y, r.w, r.h)); ctx.restore(); }, { img: true })); };
};
/** a row of photos (a column in 9:16), each on her word; o.items [{key, word?, at, fx, fy}] on the ink ground */
BG.trio = (o) => { o.items.forEach(it => BG.sfx('shutter', it.at, -7));
  return (t, r) => { r = BG.rr(r); rect(r.x, r.y, r.w, r.h, BGV.ink); const n = o.items.length; const port = r.h > r.w * 1.05 || (PORTRAIT && r.w >= W * 0.95 && r.h > r.w * 0.6);   /* full-width panel in a short: photos as rows, no thin slivers (2026-11-13) */
    const m = V(60, 44), gap = V(26, 22); const wz = V(92, 80); const hasW = o.items.some(i => i.word);
    o.items.forEach((it, i) => { const p = bgE(t, it.at - 0.1, 0.5); if (p <= 0) return; let b;
      if (port) { const hh = (r.h - 2 * m - gap * (n - 1)) / n; b = { x: r.x + m, y: r.y + m + i * (hh + gap), w: hasW ? r.w * 0.6 : r.w - 2 * m, h: hh }; }
      else { const ww = (r.w - 2 * m - gap * (n - 1)) / n; b = { x: r.x + m + i * (ww + gap), y: r.y + m, w: ww, h: r.h - 2 * m - (hasW ? wz * 1.5 : 0) }; }
      const dy = (1 - p) * V(70, 50);
      withA(Math.min(1, p * 1.6), () => { grp('photo-' + it.key + '-' + i, b.x, b.y, b.w, b.h, () => { ctx.save(); ctx.beginPath(); ctx.rect(b.x, b.y + dy, b.w, b.h); ctx.clip();
          const kk = 1 + 0.05 * clamp((t - it.at) / 6); withT((b.x + b.w / 2) * (1 - kk), (b.y + dy + b.h / 2) * (1 - kk), kk, 0, () => BG.cover(it.key, b.x, b.y + dy, b.w, b.h, it.fx == null ? 0.5 : it.fx, it.fy == null ? 0.5 : it.fy)); ctx.restore(); }, { img: true });
        if (it.word) withA(bgE(t, it.at, 0.35), () => port ? txt(it.word.toUpperCase(), b.x + b.w + V(28, 30), b.y + b.h / 2 + wz * 0.35, F.disp(wz), BG.butter, 'left', 'alphabetic', 0, 'trio-word-' + i)
          : txt(it.word.toUpperCase(), b.x, b.y + b.h + wz * 1.12, F.disp(wz), BG.butter, 'left', 'alphabetic', 0, 'trio-word-' + i)); }); }); };
};
/** a modern phone (no frame lines: a rounded dark slab) in the middle of r; content(t, x, y, w, h) draws the screen */
BG.phone = (t, r, at, content) => { const port = r.h > r.w * 1.05; const h = Math.min(r.h * (port ? 0.8 : 0.86), (port ? r.w * 0.62 : r.w * 0.36) * 2.05); const w = h / 2.05;
  const p = bgE(t, at, 0.55); const x = r.x + (r.w - w) / 2, y = r.y + (r.h - h) / 2 + (1 - p) * h * 0.25; const R = w * 0.13;
  withA(clamp(p * 1.8), () => grp('phone', x, y, w, h, () => { devicePhone(x, y, w, h, (sx, sy, sw, sh) => content(t, sx, sy, sw, sh), { autoDark: true }); }));   // realistic phone (2026-11-09)
  return { x, y, w, h };
};
/** an endless feed: posts (a photo + two grey lines) scrolling up and up from o.at; o.keys (photos used in the posts); o.flickAt
 *  [times]: a fast flick; o.hearts: hearts rise from the posts (the influencers) from o.heartAt */
BG.feed = (o) => { BG.sfx('swipe', o.at + 0.1, -8);
  return (t, r) => { r = BG.rr(r); rect(r.x, r.y, r.w, r.h, o.ground || BGV.ink);
    BG.phone(t, r, o.at, (t, x, y, w, h) => { rect(x, y, w, h, '#F4F1E8'); const ph = w * 1.12; const keys = o.keys || ['px-thrift', 'px-coffee-talk', 'px-bike', 'px-plants', 'px-banana-bread', 'px-crochet'];
      // scroll distance: steady drift + flicks (each flick moves 1.4 posts in 0.5 s)
      let d = Math.max(0, t - o.at) * ph * 0.22; (o.flickAt || []).forEach(f => { d += ph * 1.4 * bgE(t, f, 0.5, 'outExpo'); });
      const i0 = Math.floor(d / ph); for (let i = i0 - 1; i < i0 + 3; i++) { const py = y + h * 0.08 + i * ph - d; if (py > y + h || py + ph < y) continue;
        const ii = ((i % keys.length) + keys.length) % keys.length; circle(x + w * 0.1, py + w * 0.07, w * 0.045, '#C9C2B0'); fillRR(x + w * 0.18, py + w * 0.05, w * 0.32, w * 0.035, w * 0.02, '#D8D2C2');
        BG.cover(keys[ii], x, py + w * 0.14, w, w * 0.78, 0.5, 0.5); fillRR(x + w * 0.06, py + w * 0.97, w * 0.7, w * 0.035, w * 0.02, '#D8D2C2');
        if (o.hearts && t > o.heartAt) for (let k = 0; k < 4; k++) { const hq = ((t - o.heartAt) * 0.8 + k * 0.25 + i * 0.13) % 1; withA((1 - hq) * 0.95, () => BG.heart(x + w * (0.72 + 0.06 * Math.sin(k * 2.1 + i)), py + w * 0.8 - hq * w * 0.6, w * 0.055)); } }
      rect(x, y, w, h * 0.07, '#F4F1E8'); fillRR(x + w * 0.06, y + h * 0.025, w * 0.24, h * 0.02, h * 0.01, '#C9C2B0'); });
    if (o.hearts) BG.sfx('pop', o.heartAt, -8); };
};
BG.heart = (cx, cy, s) => { ctx.save(); ctx.fillStyle = '#FF3B5C'; ctx.beginPath(); ctx.moveTo(cx, cy + s * 0.9); ctx.bezierCurveTo(cx - s * 1.6, cy - s * 0.2, cx - s * 0.6, cy - s * 1.3, cx, cy - s * 0.4);
  ctx.bezierCurveTo(cx + s * 0.6, cy - s * 1.3, cx + s * 1.6, cy - s * 0.2, cx, cy + s * 0.9); ctx.fill(); ctx.restore(); };
/** a push-up counter: the photo on one side, a huge number counting 1 -> o.n (one every o.every s from o.countAt) on ink */
BG.reps = (o) => { BG.sfx('tick', o.countAt, -6);
  return (t, r) => { r = BG.rr(r); rect(r.x, r.y, r.w, r.h, BGV.ink); const port = r.h > r.w * 1.05;
    const pb = port ? { x: r.x, y: r.y, w: r.w, h: r.h * 0.5 } : { x: r.x, y: r.y, w: r.w * 0.5, h: r.h }; BG.pic({ key: o.key, at: o.at, fx: o.fx })(t, pb);
    const n = clamp(Math.floor((t - o.countAt) / o.every) + 1, 0, o.n); if (n <= 0) return; const t0 = o.countAt + (n - 1) * o.every; const q = bgE(t, t0, 0.25);
    const cx = port ? r.x + r.w / 2 : r.x + r.w * 0.75, cy = port ? r.y + r.h * 0.8 : r.y + r.h * 0.62; const z = (port ? r.h * 0.32 : r.h * 0.6);
    withT(cx, cy, lerp(1.25, 1, q), 0, () => txt(String(n), 0, 0, F.disp(z), n >= o.n ? BG.daub : BG.butter, 'center', 'alphabetic', 0, 'reps-n')); };
};
/** a phone home screen: a grid of flat app squares; at o.delAt the top rows shrink away one by one; at o.limitAt a time-limit bar
 *  fills under the rest and turns orange when full. No words. */
BG.apps = (o) => { BG.sfx('pop', o.delAt, -7); if (o.limitAt) BG.sfx('tick', o.limitAt, -6);
  return (t, r) => { r = BG.rr(r); rect(r.x, r.y, r.w, r.h, BGV.ink);
    const cols = ['#FF6A1A', '#F7D44C', '#4C7DF7', '#3BBF7A', '#E64C8A', '#8A63E6', '#26B8C9', '#F2994A', '#6FCF97', '#EB5757', '#56CCF2', '#BB6BD9'];
    BG.phone(t, r, o.at, (t, x, y, w, h) => { rect(x, y, w, h, '#1E1E22'); const g = w * 0.18, gap = (w - 4 * g) / 5;
      for (let i = 0; i < 16; i++) { const cx = x + gap + (i % 4) * (g + gap), cy = y + h * 0.12 + Math.floor(i / 4) * (g + gap * 1.6);
        const gone = i < 8 && o.delAt != null ? bgE(t, o.delAt + i * 0.12, 0.35, 'inExpo') : 0; const sc = 1 - gone; if (sc <= 0.01) continue;
        const wob = o.delAt != null && t > o.delAt - 0.8 && t < o.delAt + 1.5 && i < 8 ? Math.sin(t * 30 + i) * 0.04 : 0;
        withT(cx + g / 2, cy + g / 2, sc, wob, () => fillRR(-g / 2, -g / 2, g, g, g * 0.24, cols[i % cols.length])); }
      if (o.limitAt != null) { const q = bgE(t, o.limitAt, 2.2, 'inOutQuart'); const bx = x + gap, by = y + h * 0.82, bw = w - 2 * gap, bh = h * 0.025;
        withA(bgE(t, o.limitAt - 0.2, 0.3), () => { fillRR(bx, by, bw, bh, bh / 2, '#3A3A40'); fillRR(bx, by, Math.max(bh, bw * q), bh, bh / 2, q >= 0.99 ? BG.daub : BG.butter);
          // an hourglass above the bar
          const hx = x + w / 2, hy = by - h * 0.07, hs = w * 0.07; ctx.save(); ctx.fillStyle = BG.butter; ctx.beginPath(); ctx.moveTo(hx - hs, hy - hs * 1.3); ctx.lineTo(hx + hs, hy - hs * 1.3); ctx.lineTo(hx, hy); ctx.lineTo(hx + hs, hy + hs * 1.3); ctx.lineTo(hx - hs, hy + hs * 1.3); ctx.lineTo(hx, hy); ctx.closePath(); ctx.fill(); ctx.restore(); }); } }); };
};
