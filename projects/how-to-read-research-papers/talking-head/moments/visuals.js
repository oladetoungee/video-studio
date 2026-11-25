/* how-to-read-research-papers: picture-led visuals (her rule 2026-11-07 evening, "show, don't type"; the model: the edge-cases rework).
 * RP.pic = a Pexels photo full-bleed with a slow push; RP.trio = a row of photos (a column in 9:16) arriving on her words, no labels.
 * Graphite desk ground, no borders, no boxes. Loaded after common.js (talking-head.json "common"). Photos: film/assets/CREDITS.md. */
'use strict';
RP.pic = (o) => { RP.sfx('shutter', o.at, -6);
  return (t, r) => { r = RP.rr(r); rect(r.x, r.y, r.w, r.h, RP.desk); const im = IMG[o.key]; if (!im) return;
    const a = rpE(t, o.at, 0.4); const k = 1.02 + (o.push == null ? 0.07 : o.push) * clamp((t - o.at) / (o.dur || 8));
    const s = Math.max(r.w / im.width, r.h / im.height) * k, sw = r.w / s, sh = r.h / s;
    const sx = clamp((im.width - sw) * (o.fx == null ? 0.5 : o.fx), 0, im.width - sw), sy = clamp((im.height - sh) * (o.fy == null ? 0.5 : o.fy), 0, im.height - sh);
    withA(Math.max(0.001, Math.min(1, a * 1.5)), () => grp('photo-' + o.key, r.x, r.y, r.w, r.h, () => { ctx.save(); ctx.beginPath(); ctx.rect(r.x, r.y, r.w, r.h); ctx.clip();
      themeFixed(() => ctx.drawImage(im, sx, sy, sw, sh, r.x, r.y, r.w, r.h)); ctx.restore(); }, { img: true })); };
};
RP.trio = (o) => { o.items.forEach(it => RP.sfx('shutter', it.at, -7));
  return (t, r) => { r = RP.rr(r); rect(r.x, r.y, r.w, r.h, RP.desk); const n = o.items.length; const port = r.h > r.w * 1.05; const m = V(56, 44), gap = V(24, 20);
    o.items.forEach((it, i) => { const p = rpE(t, it.at - 0.1, 0.5); if (p <= 0) return; let b;
      if (port) { const hh = (r.h - 2 * m - gap * (n - 1)) / n; b = { x: r.x + m, y: r.y + m + i * (hh + gap), w: r.w - 2 * m, h: hh }; }
      else { const ww = (r.w - 2 * m - gap * (n - 1)) / n; b = { x: r.x + m + i * (ww + gap), y: r.y + m, w: ww, h: r.h - 2 * m }; }
      const dy = (1 - p) * V(70, 50);
      withA(Math.min(1, p * 1.6), () => grp('photo-' + it.key + '-' + i, b.x, b.y, b.w, b.h, () => { ctx.save(); ctx.beginPath(); ctx.rect(b.x, b.y + dy, b.w, b.h); ctx.clip();
        const kk = 1 + 0.05 * clamp((t - it.at) / 6); withT((b.x + b.w / 2) * (1 - kk), (b.y + dy + b.h / 2) * (1 - kk), kk, 0, () => RP.cover(it.key, b.x, b.y + dy, b.w, b.h, it.fx == null ? 0.5 : it.fx, it.fy == null ? 0.5 : it.fy)); ctx.restore(); }, { img: true })); }); };
};
