/* cheapest-countries: picture-led visuals (her rule 2026-11-07 evening, "show, don't type"; the model: the edge-cases rework).
 * Pexels photos full-bleed with a slow push, a photo row with one word each, a blocked account that pays out month by month,
 * and PC.dk(): any shelf screen on the off-black ground (about half the inserts, so the video is not one paper colour).
 * No borders, no boxed cards. Loaded after common.js (talking-head.json "common"). Photos: film/assets/CREDITS.md. */
'use strict';
/** the same screen on off-black: paper ink, soft mid (the helpers read PC.* while they draw) */
PC.dk = (draw) => (t, r) => { const keep = { wall: PC.wall, wall2: PC.wall2, ink: PC.ink, mid: PC.mid };
  Object.assign(PC, { wall: PC.black, wall2: '#1E1F22', ink: (PC.cream || '#EDE9E2'), mid: PC.soft }); try { draw(t, r); } finally { Object.assign(PC, keep); } };
/** a Pexels photo (talking-head/assets/px/<key>.jpg) full-bleed in r, cover crop, slow push from o.at; o.fx/o.fy focus 0..1;
 *  o.over(t, r) draws on top (a sticker, a number) */
PC.pic = (o) => (t, r) => { r = PC.rr(r); const im = IMG['px_' + o.key]; rect(r.x, r.y, r.w, r.h, PC.black); if (!im) return;
  const a = pcE(t, o.at || 0, 0.4); const k = (o.z || 1) * (1.02 + (o.push == null ? 0.07 : o.push) * clamp((t - (o.at || 0)) / (o.dur || 8)));
  const s = Math.max(r.w / im.width, r.h / im.height) * k; const sw = r.w / s, sh = r.h / s;
  const sx = clamp((im.width - sw) * (o.fx == null ? 0.5 : o.fx), 0, im.width - sw), sy = clamp((im.height - sh) * (o.fy == null ? 0.5 : o.fy), 0, im.height - sh);
  withA(Math.max(0.001, Math.min(1, a * 1.5)), () => grp('photo-' + o.key, r.x, r.y, r.w, r.h, () => { ctx.save(); ctx.beginPath(); ctx.rect(r.x, r.y, r.w, r.h); ctx.clip();
    themeFixed(() => ctx.drawImage(im, sx, sy, sw, sh, r.x, r.y, r.w, r.h)); if (o.dim) rect(r.x, r.y, r.w, r.h, `rgba(17,17,20,${o.dim})`); ctx.restore(); }, { img: true }));
  if (o.over) o.over(t, r);
};
/** a row of photos (a column each in 9:16), each arriving on her word with ONE word under it on the off-black ground.
 *  o.items: [{key, word, at, fx, fy}] */
PC.trio = (o) => (t, r) => { r = PC.rr(r); rect(r.x, r.y, r.w, r.h, PC.black); const n = o.items.length; const port = r.h > r.w * 1.05;
  const m = V(70, 50), gap = V(28, 24), capRoom = o.capRoom || 0; const wz = V(96, 84);
  o.items.forEach((it, i) => { const p = pcE(t, it.at - 0.1, 0.55); if (p <= 0) return;
    let b; if (port) { const hh = (r.h - 2 * m - capRoom - gap * (n - 1)) / n; b = { x: r.x + m, y: r.y + m + i * (hh + gap), w: r.w * 0.58, h: hh }; }
    else { const ww = (r.w - 2 * m - gap * (n - 1)) / n; b = { x: r.x + m + i * (ww + gap), y: r.y + m, w: ww, h: r.h - 2 * m - capRoom - wz * 1.5 }; }
    const im = IMG['px_' + it.key]; const dy = (1 - p) * V(80, 60);
    withA(Math.min(1, p * 1.6), () => { grp('photo-' + it.key + '-' + i, b.x, b.y, b.w, b.h, () => { ctx.save(); ctx.beginPath(); ctx.rect(b.x, b.y + dy, b.w, b.h); ctx.clip();
        if (im) { const k = 1.04 + 0.05 * clamp((t - it.at) / 6); const s = Math.max(b.w / im.width, b.h / im.height) * k; const sw = b.w / s, sh = b.h / s;
          const sx = clamp((im.width - sw) * (it.fx == null ? 0.5 : it.fx), 0, im.width - sw), sy = clamp((im.height - sh) * (it.fy == null ? 0.5 : it.fy), 0, im.height - sh);
          themeFixed(() => ctx.drawImage(im, sx, sy, sw, sh, b.x, b.y + dy, b.w, b.h)); } else rect(b.x, b.y + dy, b.w, b.h, '#1E1F22');
        ctx.restore(); }, { img: true });
      const wp = pcE(t, it.at, 0.35); withA(wp, () => port ? txt(it.word, b.x + b.w + V(30, 34), b.y + b.h / 2 + wz * 0.35, FX(wz), it.red ? PC.red : (PC.cream || '#EDE9E2'), 'left', 'alphabetic', 0, 'trio-word-' + i)
        : txt(it.word, b.x, b.y + b.h + wz * 1.15, FX(wz), it.red ? PC.red : (PC.cream || '#EDE9E2'), 'left', 'alphabetic', 0, 'trio-word-' + i)); }); });
};
/** a padlock (drawn), the blocked account's balance, then one month at a time the bank releases a fixed amount:
 *  -€992 flies out, the balance counts down, a month mark fills. o.at, o.start (balance), o.step, o.payAt, o.every (s), o.n (months shown) */
PC.blocked = (o) => (t, r) => { r = PC.rr(r); rect(r.x, r.y, r.w, r.h, PC.black); const port = r.h > r.w * 1.05; const u = Math.min(r.w / 1920, r.h / 1080) * (port ? 1.5 : 1);
  const cx = r.x + r.w * (port ? 0.5 : 0.3), cy = r.y + r.h * (port ? 0.3 : 0.44); const L = 150 * u;
  const p = pcE(t, o.at, 0.55, 'outBack'); if (p <= 0) return;
  // the padlock: shackle arc + body; it closes (drops 30 px) at o.lockAt
  const shut = pcE(t, o.lockAt == null ? o.at + 0.5 : o.lockAt, 0.3, 'outBack');
  withT(cx, cy + (1 - p) * 80 * u, p, 0, () => { ctx.save(); ctx.strokeStyle = (PC.cream || '#EDE9E2'); ctx.lineWidth = 26 * u; ctx.lineCap = 'butt'; ctx.beginPath(); const ly = -L * 0.35 - (1 - shut) * 34 * u;
      ctx.moveTo(-L * 0.42, ly + L * 0.25); ctx.lineTo(-L * 0.42, ly); ctx.arc(0, ly, L * 0.42, Math.PI, 0); ctx.lineTo(L * 0.42, ly + L * 0.25 + (1 - shut) * 0); ctx.stroke(); ctx.restore();
    fillRR(-L * 0.75, -L * 0.1, L * 1.5, L * 1.15, 22 * u, (PC.cream || '#EDE9E2')); circle(0, L * 0.38, 16 * u, PC.black); rect(-6 * u, L * 0.38, 12 * u, 40 * u, PC.black); });
  // the balance
  const n = o.n || 12; const k = clamp(Math.floor((t - o.payAt) / o.every) + 1, 0, n); const bal = o.start - k * o.step;
  const bx = port ? r.x + r.w * 0.5 : r.x + r.w * 0.52, by = port ? r.y + r.h * 0.56 : cy + 40 * u; const bz = (port ? 210 : 230) * u;
  withA(pcE(t, o.at + 0.25, 0.4), () => txt('€' + bal.toLocaleString('en-US'), bx, by, FX(bz), (PC.cream || '#EDE9E2'), port ? 'center' : 'left', 'alphabetic', 0, 'blocked-balance'));
  // the month marks under it
  const mw = (port ? r.w * 0.7 : r.w * 0.36) / n; const mx0 = port ? bx - mw * n / 2 : bx; const my = by + 60 * u;
  for (let i = 0; i < n; i++) { const on = i < k; fillRR(mx0 + i * mw + 3 * u, my, mw - 6 * u, 18 * u, 4 * u, on ? PC.red : 'rgba(237,233,226,0.22)'); }
  // -€992 flying out on each payout
  if (k > 0 && k <= n) { const t0 = o.payAt + (k - 1) * o.every; const q = clamp((t - t0) / Math.min(0.9, o.every * 0.9));
    if (q < 1) withA(1 - q * q, () => _txt('−€' + o.step.toLocaleString('en-US'), bx + (port ? 0 : tw('€' + bal.toLocaleString('en-US'), FX(bz)) * 0.5), by - bz - 20 * u - q * 120 * u, FX(110 * u), PC.red, port ? 'center' : 'center')); }
};
/** captions (2026-11-07, coordinator): a caption never runs two sentences together ("income So, at many"). Her words are re-cut into
 *  lines: a sentence end or a pause > 0.5 s always breaks; a long stretch is split into balanced lines of <= 44 characters, never ending
 *  on a little word ("a", "the", "to"). Replaces PC.fixCaps (same TH.caps shape: {i, ws, t0, t1, text}). */
PC.fixCaps = () => { if (PC.capsFixed || !TH.caps || !TH.caps.length) return; PC.capsFixed = true;
  const MAX = 44; const WEAK = new Set(['a', 'an', 'the', 'to', 'for', 'of', 'in', 'on', 'at', 'and', 'so', 'or', 'but', 'with', 'my', 'your', 'that', 'is', 'are', 'was', 'can', 'i', 'it', 'be', 'if', 'like']);
  const nn = (s) => s.toLowerCase().replace(/[^a-z']/g, ''); const L = (ws) => ws.map(x => x.s).join(' ').length;
  const runs = []; let cur = [];
  WORDS.forEach((w, i) => { const pv = WORDS[i - 1]; if (cur.length && pv && (w.t - pv.e > 0.5 || /[.?!]$/.test(pv.w))) { runs.push(cur); cur = []; } cur.push({ s: w.w.replace(/\.+$/, ''), t: w.t, e: w.e }); });
  if (cur.length) runs.push(cur);
  const out = [];
  for (const r of runs) { let rest = r;
    while (L(rest) > MAX) { const n = Math.ceil(L(rest) / MAX); const target = L(rest) / n; let best = 1, bs = -1e9;
      for (let k = 1; k < rest.length; k++) { const a = rest.slice(0, k); const la = L(a); if (la > MAX) break; const last = a[a.length - 1].s;
        const sc = -Math.abs(la - target) / 6 + (/[,;:]$/.test(last) ? 4 : 0) - (WEAK.has(nn(last)) ? 6 : 0); if (sc > bs) { bs = sc; best = k; } }
      out.push(rest.slice(0, best)); rest = rest.slice(best); }
    out.push(rest); }
  TH.caps = out.map((ws, i) => ({ i, ws, t0: Math.max(0, ws[0].t - 0.05), t1: Math.min(i + 1 < out.length ? out[i + 1][0].t - 0.05 : FOOT.dur, ws[ws.length - 1].e + 0.35), text: ws.map(x => x.s).join(' ').replace(/[,;:]$/, '') }));
  if (typeof FOOT !== 'undefined') { FOOT.capLong = TH.caps.map(c => ({ i: c.i, t0: c.t0, t1: c.t1, text: c.text, ws: c.ws.map(x => ({ w: x.s, t: x.t, e: x.e })) })); try { CAPTIONS = FOOT.capLong.map(c => ({ i: c.i, t0: c.t0, t1: c.t1, text: c.text })); } catch (e) { /* the .srt keeps the build's lines */ } }
};
