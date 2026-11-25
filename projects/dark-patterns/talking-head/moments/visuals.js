/* dark-patterns: picture-led and animated visuals ("show, don't type", her rule 2026-11-07 evening, the edge-cases model).
 * Pexels photos full-bleed with a slow push, a dot that gets in easily and can't get out, coins that leave the user,
 * flat people with question marks, a grid of 399 shops lighting up, a 67 % ring, a calendar page. Almost no words.
 * Loaded after moments/common.js (talking-head.json "common"); talking-head only (the film does not load it).
 * Photos: film/assets/CREDITS.md. */
'use strict';
DP.night = '#111114';
/* the specimen tags ("01 / 11  CONFIRMSHAMING") repeat the name she just said and count to an 11 she never announces: off here */
DP.tag = () => {};
/** a Pexels photo full-bleed in r, slow push from o.at; o.fx/o.fy focus; o.dim; o.over(t, r) draws on top */
DP.pic = (o) => { DP.sfx('shutter', (o.at || 0) + 0.04, -6);
  return (t, r) => { r = DP.rr(r); const im = IMG[o.key]; if (!im) { rect(r.x, r.y, r.w, r.h, DP.night); return; }
    const k = (o.z || 1) * (1 + (o.push == null ? 0.07 : o.push) * clamp((t - (o.at || 0)) / (o.dur || 8)));
    const s = Math.max(r.w / im.width, r.h / im.height) * k; const sw = r.w / s, sh = r.h / s;
    const sx = clamp((im.width - sw) * (o.fx == null ? 0.5 : o.fx), 0, im.width - sw), sy = clamp((im.height - sh) * (o.fy == null ? 0.5 : o.fy), 0, im.height - sh);
    clipR(r.x, r.y, r.w, r.h, () => {
      grp('photo ' + o.key, r.x, r.y, r.w, r.h, () => themeFixed(() => ctx.drawImage(im, sx, sy, sw, sh, r.x, r.y, r.w, r.h)), { img: true, label: 'photo (drag to move, resize)' });
      if (o.dim) rect(r.x, r.y, r.w, r.h, `rgba(12,12,12,${o.dim})`);
      if (o.over) o.over(t, r);
    }); };
};
const dpU = (r) => Math.min(r.w / 960, r.h / 1080) * (PORTRAIT ? 1.6 : 1.9);
/** a pink badge that pops on a photo (o.s, at o.popAt, at o.bx/o.by share of r) */
DP.badge = (t, r, at, s, bx, by) => { const q = dpE(t, at, 0.45, 'outBack'); if (q <= 0) return; const u = dpU(r); const z = 64 * u;
  withT(r.x + r.w * bx, r.y + r.h * by, q, -0.06, () => { const w = tw(s, F.disp(z)) + z * 0.9; rect(-w / 2, -z * 0.85, w, z * 1.45, DP.pink); _txt(s, 0, z * 0.3, F.disp(z), DP.ink, 'center'); }); };
/** the roach motel: a box with a wide way in; a dot slides in fast (o.inAt), then wanders inside and never finds the way out */
DP.maze = (o) => { DP.sfx('pop', o.inAt, -6);
  return (t, r) => { r = DP.rr(r); rect(r.x, r.y, r.w, r.h, DP.night); const u = dpU(r);
    const bw = Math.min(r.w * 0.62, r.h * 0.8), bh = bw * 0.72, bx = r.x + r.w * 0.5 - bw * 0.25, by = r.y + (r.h - bh) * 0.45; const lw = 5 * u, gap = bh * 0.36;
    void lw; const fl = bw * 0.16; fillRR(bx, by, bw, bh, 18 * u, '#2E2E33');
    ctx.fillStyle = DP.night; ctx.beginPath(); ctx.moveTo(bx - 2, by + (bh - gap) / 2); ctx.lineTo(bx + fl, by + bh / 2 - gap * 0.08); ctx.lineTo(bx + fl, by + bh / 2 + gap * 0.08); ctx.lineTo(bx - 2, by + (bh + gap) / 2); ctx.closePath(); ctx.fill();   // the way in: wide outside, a narrow flap inside
    const R = 22 * u; const x0 = r.x + r.w * 0.06, y0 = by + bh / 2; const pin = dpE(t, o.inAt, 0.55, 'outQuint');
    let x = x0 + (bx + fl + bw * 0.12 - x0) * pin, y = y0;
    if (t > o.inAt + 0.6) { const RN = ((s) => () => { s = (s * 1664525 + 1013904223) % 4294967296; return s / 4294967296; })(9); const pts = []; for (let i = 0; i < 40; i++) pts.push([bx + fl + bw * 0.12 + RN() * (bw * 0.8 - fl), by + bh * 0.15 + RN() * bh * 0.7]);
      const k = (t - o.inAt - 0.6) / 0.55; const i = Math.floor(k) % pts.length, f = E.inOutCubic(k % 1); const a = i ? pts[i - 1] : [x, y], b = pts[i];
      // the trail: the last few tries, fading
      ctx.save(); ctx.strokeStyle = DP.pink; ctx.lineWidth = 2; ctx.setLineDash([2, 12 * u]); ctx.lineCap = 'round';
      for (let j = Math.max(1, i - 5); j <= i; j++) { ctx.globalAlpha = 0.25 + 0.6 * (1 - (i - j) / 6); ctx.beginPath(); ctx.moveTo(...pts[j - 1]); const e = j === i ? [pts[j - 1][0] + (pts[j][0] - pts[j - 1][0]) * f, pts[j - 1][1] + (pts[j][1] - pts[j - 1][1]) * f] : pts[j]; ctx.lineTo(...e); ctx.stroke(); }
      ctx.restore(); x = a[0] + (b[0] - a[0]) * f; y = a[1] + (b[1] - a[1]) * f;
      // a bump on the wall near the way out: no way through
      if (o.bumpAt && t > o.bumpAt) { const q = clamp((t - o.bumpAt) / 0.6); if (q < 1) withA(1 - q, () => { ctx.save(); ctx.strokeStyle = DP.pink; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(bx + fl, y0, (20 + 60 * q) * u, 0, 7); ctx.stroke(); ctx.restore(); }); } }
    circle(x, y, R, DP.pink);
  };
};
/** good for the business, at the user's expense: a flat person (left) and a shop (right) on ink; coins move from one to the other */
DP.flow = (o) => { [0, 1, 2].forEach(i => DP.sfx('coin', o.coinAt + i * 0.35, -9));
  return (t, r) => { r = DP.rr(r); rect(r.x, r.y, r.w, r.h, DP.night); const u = dpU(r); const port = r.h > r.w * 1.05;
    const ax = r.x + r.w * (port ? 0.28 : 0.22), bx = r.x + r.w * (port ? 0.72 : 0.78), cy = r.y + r.h * 0.48; const hd = 80 * u;
    const pa = dpE(t, o.at, 0.45, 'outBack'), pb = dpE(t, o.at + 0.12, 0.45, 'outBack');
    withT(ax, cy, pa, 0, () => { circle(0, -hd * 1.1, hd, '#FFFFFF'); fillRR(-hd * 1.6, hd * 0.15, hd * 3.2, hd * 2.1, hd, '#FFFFFF'); });
    withT(bx, cy, pb, 0, () => { const w = hd * 3.6, h = hd * 2.6; rect(-w / 2, -h * 0.2, w, h, DP.pink); for (let i = 0; i < 4; i++) { ctx.fillStyle = i % 2 ? DP.pink : '#FFFFFF'; ctx.beginPath(); ctx.moveTo(-w / 2 + i * w / 4, -h * 0.2); ctx.lineTo(-w / 2 + (i + 1) * w / 4, -h * 0.2); ctx.lineTo(-w / 2 + (i + 1) * w / 4 - w * 0.03, -h * 0.62); ctx.lineTo(-w / 2 + i * w / 4 + w * 0.03, -h * 0.62); ctx.fill(); } rect(-hd * 0.45, h * 0.35, hd * 0.9, h * 0.45, DP.night); });
    for (let i = 0; i < 6; i++) { const a = o.coinAt + i * 0.35; const q = clamp((t - a) / 0.8); if (t < a) continue; const e = E.inOutCubic(q);
      const x = ax + hd * 1.8 + (bx - ax - hd * 3.8) * e, y = cy - hd * 0.4 - Math.sin(e * Math.PI) * 110 * u; if (q < 1) { circle(x, y, 26 * u, '#F5C542'); circle(x, y, 17 * u, '#E0A82E'); } }
    // the business side grows a little with each coin; the person shrinks a touch
    const n = clamp((t - o.coinAt) / (6 * 0.35 + 0.8)); if (n > 0) { const z = 40 * u; withA(n, () => _mono('+€', bx, cy - hd * 2.4, z, DP.pink, 'center', { w: 600 })); withA(n, () => _mono('−€', ax, cy - hd * 2.8, z, '#FF6B5A', 'center', { w: 600 })); }
  };
};
/** flat people (white on ink); at o.qAt some get a pink "?" (was anyone tricked? nobody can tell) */
DP.crowd = (o) => {
  return (t, r) => { r = DP.rr(r); rect(r.x, r.y, r.w, r.h, DP.night); const u = dpU(r); const port = r.h > r.w * 1.05; const n = o.n || 8; const cols = port ? 4 : n / 2; const rows = Math.ceil(n / cols);
    const cw = r.w / (cols + 0.5), rh = r.h / (rows + 0.6); const hd = Math.min(cw * 0.17, rh * 0.15);
    for (let i = 0; i < n; i++) { const c = i % cols, rw = Math.floor(i / cols); const cx = r.x + cw * (0.75 + c), cy = r.y + rh * (0.85 + rw);
      const p = dpE(t, o.at + i * 0.07, 0.45, 'outBack'); if (p <= 0) continue; const bob = Math.sin((t - o.at) * 2 + i * 1.7) * 3 * u;
      withT(cx, cy + bob, p, 0, () => { circle(0, -hd * 0.9, hd, '#FFFFFF'); fillRR(-hd * 1.6, hd * 0.35, hd * 3.2, hd * 2.0, hd * 1.0, '#FFFFFF');
        const q = dpE(t, o.qAt + (i * 37 % 11) * 0.06, 0.4, 'outBack'); if (q > 0 && (o.who || [1, 2, 4, 6]).includes(i)) withT(hd * 1.5, -hd * 2.1, q, 0, () => { circle(0, 0, hd * 0.62, DP.pink); _txt('?', 0, hd * 0.32, F.disp(hd * 0.95), DP.night, 'center'); }); }); }
  };
};
/** a grid of o.n dots (shops); o.lit of them light up pink from o.litAt; a big number counts up beside it */
DP.dots = (o) => { DP.sfx('tick', o.litAt, -8);
  return (t, r) => { r = DP.rr(r); rect(r.x, r.y, r.w, r.h, DP.night); const u = dpU(r); const port = r.h > r.w * 1.05; const m = 60 * u;
    const gw = port ? r.w - 2 * m : r.w * 0.56, gh = port ? r.h * 0.5 : r.h - 2 * m - 40 * u; const cols = Math.round(Math.sqrt(o.n * gw / gh)), rows = Math.ceil(o.n / cols);
    const st = Math.min(gw / cols, gh / rows), d = st * 0.36, gx = r.x + m, gy = port ? r.y + r.h - m - rows * st : r.y + (r.h - rows * st) / 2;
    const lit = Math.round(o.lit * E.outCubic(clamp((t - o.litAt) / (o.litD || 1.4))));
    const order = []; { let s = 5; for (let i = 0; i < o.n; i++) order.push(i); for (let i = o.n - 1; i > 0; i--) { s = (s * 1664525 + 1013904223) % 4294967296; const j = s % (i + 1); [order[i], order[j]] = [order[j], order[i]]; } }
    const on = new Set(order.slice(0, lit)); const a = dpE(t, o.at, 0.5);
    withA(a, () => { for (let i = 0; i < o.n; i++) { const c = i % cols, rw = Math.floor(i / cols); circle(gx + (c + 0.5) * st, gy + (rw + 0.5) * st, d, on.has(i) ? DP.pink : 'rgba(255,255,255,0.22)'); } });
    if (t >= o.litAt) { const z = Math.min(port ? 220 * u : 300 * u, port ? r.h * 0.2 : r.w * 0.17); const ov = ovr('big'); const str = ov.s != null ? ov.s : String(lit);
      const x = port ? r.x + m : r.x + r.w * 0.66, y = port ? r.y + m + z * 0.9 : r.y + r.h * 0.5 + z * 0.3; _txt(str, x, y, F.disp(z), DP.pink, 'left', 'alphabetic', -0.04 * z);
      regBox(ov, x, y - z * 0.8, tw(str, F.disp(z)), z * 0.95, { text: str, def: String(o.lit) });
      if (o.of) withA(dpE(t, o.litAt + 0.3, 0.4), () => mono(o.of, x, y + 70 * u, Math.max(32, 34 * u), 'rgba(255,255,255,0.7)', 'left', { key: 'of' })); }
  };
};
/** a ring that fills to o.pct at o.at; the number in the middle */
DP.ring = (o) => { DP.sfx('tick', o.at, -8);
  return (t, r) => { r = DP.rr(r); rect(r.x, r.y, r.w, r.h, DP.night); const u = dpU(r); const R = Math.min(r.w, r.h) * 0.3, cx = r.x + r.w / 2, cy = r.y + r.h * 0.46;
    const q = E.outCubic(clamp((t - o.at) / 1.2)); ctx.save(); ctx.lineCap = 'butt'; ctx.lineWidth = R * 0.24; ctx.strokeStyle = 'rgba(255,255,255,0.15)'; ctx.beginPath(); ctx.arc(cx, cy, R, 0, 7); ctx.stroke();
    ctx.strokeStyle = DP.pink; ctx.beginPath(); ctx.arc(cx, cy, R, -Math.PI / 2, -Math.PI / 2 + 2 * Math.PI * o.pct / 100 * q); ctx.stroke(); ctx.restore();
    const z = R * 0.62; _txt(Math.round(o.pct * q) + '%', cx, cy + z * 0.35, F.disp(z), '#FFFFFF', 'center', 'alphabetic', -0.04 * z);
  };
};
/** a calendar page (a flat object, not UI): month strip + a big day; o.at, o.mark (a pink circle drawn round the day at o.markAt) */
DP.cal = (o) => { DP.sfx('paper', o.at, -6); if (o.markAt) DP.sfx('marker', o.markAt, -6);
  return (t, r) => { r = DP.rr(r); rect(r.x, r.y, r.w, r.h, DP.night); const u = dpU(r); const w = Math.min(r.w * 0.5, r.h * 0.55), h = w * 1.05; const x = r.x + (r.w - w) / 2, y = r.y + (r.h - h) * 0.42;
    const p = dpE(t, o.at, 0.5, 'outBack'); if (p <= 0) return;
    withT(x + w / 2, y + h / 2 + (1 - p) * 80 * u, 1, -0.03 * (1 - p), () => { rect(-w / 2, -h / 2, w, h, '#FFFFFF'); rect(-w / 2, -h / 2, w, h * 0.24, DP.pink);
      txt(o.month || 'NOV 2026', 0, -h / 2 + h * 0.165, F.mono(h * 0.09), DP.night, 'center', 'alphabetic', 2, 'cal month');
      txt(o.day || '11', 0, h * 0.3, F.disp(h * 0.5), DP.night, 'center', 'alphabetic', -0.04 * h * 0.5, 'cal day');
      if (o.markAt) { const q = clamp((t - o.markAt) / 0.6); if (q > 0) { ctx.save(); ctx.strokeStyle = DP.pink; ctx.lineWidth = 2; ctx.lineCap = 'round'; ctx.beginPath(); ctx.ellipse(0, h * 0.13, w * 0.36, h * 0.27, -0.1, -1.2, -1.2 + q * 6.6); ctx.stroke(); ctx.restore(); } } });
  };
};

/* ---- 2026-11-07 coordinator review: screenshots big and readable, no thick outlines, captions heavier ---- */
/** a real page clipping shown BIG on ink: ~78 % of the frame wide (bounded by height), centred, the highlighted line swept pink at
 *  o.hlAt (time or one per box; o.only = box indexes), a slow push; a small source line under it only when o.credit is given */
DP.big = (key, o = {}) => { DP.sfx('shutter', (o.at || 0) + 0.05, -5);
  return (t, r) => { r = DP.rr(r); rect(r.x, r.y, r.w, r.h, DP.night); const c = CLIPS[key], im = IMG['clip_' + key]; if (!c || !im) return;
    const port = r.h > r.w * 1.05; const capB = 0; let maxW = r.w * (port ? 0.92 : (o.w || 0.78)); const maxH = (r.h - capB) * 0.7;
    // a dense strip (small type at this width): crop round the highlighted words so the type is ~2.2x its page size
    let cx0 = 0, cy0 = 0, cw0 = c.w, ch0 = c.h; const sel = c.hl.filter((b, i) => !o.only || o.only.includes(i));
    if (o.zoom !== false && Math.min(maxW / c.w, maxH / c.h) < 1.8 && sel.length) { const zx = Math.min(c.w, maxW / 2.2), ux0 = Math.min(...sel.map(b => b[0])), ux1 = Math.max(...sel.map(b => b[0] + b[2]));
      if (ux1 - ux0 + 60 <= zx) { cx0 = ux1 + 20 <= zx ? 0 : clamp(ux0 - 30, 0, c.w - zx); cw0 = zx; }   /* the highlighted words whole; else full width, wider */ const zy = Math.min(c.h, maxH / 2.2); const uy0 = Math.min(...sel.map(b => b[1])), uy1 = Math.max(...sel.map(b => b[1] + b[3]));
      cy0 = clamp((uy0 + uy1) / 2 - zy / 2, 0, c.h - zy); ch0 = zy; }
    if (cw0 === c.w && !port) maxW = r.w * 0.9;   // a full-width strip: as wide as the frame allows
    const s = Math.min(maxW / cw0, maxH / ch0); const w = cw0 * s, h = ch0 * s; const pad = Math.max(16, 22 * Math.min(s, 1.6));
    const x = r.x + (r.w - w) / 2, y = r.y + (r.h - capB - h) / 2 - (o.credit ? 20 : 0); const sx = im.width / c.w;
    const a = dpE(t, o.at || 0, 0.5); const k = 1 + 0.03 * E.inOutCubic(prog(t, o.at || 0, 8));
    withA(clamp(a * 1.6), () => withT((r.x + r.w / 2) * (1 - k), (y + h / 2) * (1 - k), k, 0, () => withT(0, 30 * (1 - a), 1, 0, () => {
      grp('page', x - pad, y - pad, w + 2 * pad, h + 2 * pad, () => themeFixed(() => { rect(x - pad, y - pad, w + 2 * pad, h + 2 * pad, '#FFFFFF'); ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip(); ctx.drawImage(im, cx0 * sx, cy0 * sx, cw0 * sx, ch0 * sx, x, y, w, h);
        if (o.hlAt != null) c.hl.forEach((b, i) => { if (o.only && !o.only.includes(i)) return; const ht = Array.isArray(o.hlAt) ? o.hlAt[o.only ? o.only.indexOf(i) : i] : o.hlAt + i * 0.28; if (ht == null) return;
          const p = dpE(t, ht, 0.42, 'outExpo'); if (p <= 0) return; ctx.save(); ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = DP.pink; ctx.fillRect(x + (b[0] - cx0 - 6) * s, y + (b[1] - cy0 - 2) * s, (b[2] + 12) * s * p, (b[3] + 4) * s); ctx.restore(); }); ctx.restore(); }),
        { img: true, label: 'real page (drag to move, resize)' });
      if (o.credit) mono(o.credit, x - pad, y + h + pad + V(44, 44), V(26, 28), 'rgba(255,255,255,0.55)', 'left', { key: 'credit', maxW: w });
    }))); };
};
/* her 16:9 captions: heavier and brighter (the Light 300 cream read thin on her footage) */
if (typeof CAP16 !== 'undefined') { CAP16.weight = 500; CAP16.col = '#F6F1EA'; }
