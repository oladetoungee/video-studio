/* working-full-time: photos full-bleed (coordinator 2026-11-07: "small photos floating in big empty dark panels").
 * WF.photo here fills the whole panel the layout gives (cover crop, slow push); the stamp stays; no caption. Talking-head only
 * (loaded after moments/common.js). */
'use strict';
WF.photo = (o) => (t, r) => { r = WF.rr(r); const im = IMG[o.img]; rect(r.x, r.y, r.w, r.h, WF.wall); if (!im) return;
  const a = wfE(t, WF.lead(o.at || 0), 0.5); const k = 1.02 + 0.05 * clamp((t - (o.at || 0)) / 8);
  const s = Math.max(r.w / im.width, r.h / im.height) * k; const sw = r.w / s, sh = r.h / s; const sx = (im.width - sw) * (o.fx == null ? 0.5 : o.fx), sy = (im.height - sh) * (o.fy == null ? 0.5 : o.fy);
  withA(clamp(a * 1.6), () => grp('photo', r.x, r.y, r.w, r.h, () => themeFixed(() => { ctx.save(); ctx.beginPath(); ctx.rect(r.x, r.y, r.w, r.h); ctx.clip(); ctx.drawImage(im, sx, sy, sw, sh, r.x, r.y, r.w, r.h); ctx.restore(); }), { img: true, label: 'photo (drag, resize)' }));
  if (!PORTRAIT && r.y + r.h > H - 10) rect(r.x, H - 170, r.w, 170, WF.wall);   // a solid band under her 16:9 captions (readable on any photo)
  if (o.stamp) WF.stamp(t, o.stamp.at, o.stamp.s, r.x + r.w * (o.stamp.fx || 0.5), r.y + r.h * (o.stamp.fy || 0.2), o.stamp.size || V(80, 80), WF.red, { rot: 0.07, key: 'photo-stamp' });
};
