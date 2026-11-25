/* october-attacks: the talking-head look = the film's A · THE MONTH (her pick 2026-10-26) with B's pictorial keys.
 * Grounds: night #16110D (inside a day: the main ground), bone #EFE7D8 (explainer cards and pages), October orange #F2541B
 * (the month, punch cards). One accent per screen: orange on night / bone, ink on orange.
 * Type: Anton (numbers, headlines, caps), Manrope 700 (sentences), Spline Sans Mono (labels, credits, code).
 * Her captions stay hers (Helvetica Neue, footage.js / layouts.js). Loaded before every moment script ("common").
 *
 * Project helpers (OA.*), all drawn with the house API so every text is editable and every block movable:
 *   OA.src(key, o)        a REAL page crop (talking-head/assets/src, captured 2026-10-26 by tools/hicap.mjs): the page rises
 *                         in, scrolls to the line she says (a screen recording, frame-exact), an orange highlighter sweeps
 *                         the quote on o.hl (her word), the outlet + date as a small credit. Returns draw(t, r) for o.draw.
 *   OA.stat(o)            a big Anton number / word on a card (o.big, o.small, o.kicker, o.at)
 *   OA.term(o)            a terminal card (o.lines typed on her words)
 *   OA.month(o)           the October calendar: the attack days turn black one by one (o.fills [{d, at, label}])
 *   OA.key(o)             B's pictorial key: a key on a tag (o.tag), taken / dropped / stamped on her word
 *   OA.full(span, draw, o)  a full-frame graphic (no film needed): an L9-style insert, her voice and captions go on
 * Contrast: bone on night 15.6, orange on night 5.3, ink on bone 15.6, ink on orange 5.6, orange on bone 3.1 (big type only). */
'use strict';
const OA = { orange: '#F2541B', night: '#16110D', bone: '#EFE7D8', card: '#FBF6EC', ink: '#16110D', mid: '#9C9182', dimB: '#6E655A',
  hl: 'rgba(242,84,27,0.34)', line: 'rgba(239,231,216,0.16)', lineB: 'rgba(22,17,13,0.18)', brass: '#D9A441', nickel: '#E6E2D8' };
G.oaNight = { bg: OA.night, fg: OA.bone, mid: OA.mid, line: OA.line, acc: OA.orange, card: OA.card, panel: '#221B15', grid: OA.line, mode: 'dark' };
G.oaBone = { bg: OA.bone, fg: OA.ink, mid: OA.dimB, line: OA.lineB, acc: OA.orange, card: OA.card, panel: '#E3D9C6', grid: 'rgba(22,17,13,0.10)', mode: 'light' };
G.oaOct = { bg: OA.orange, fg: OA.ink, mid: 'rgba(22,17,13,0.62)', line: 'rgba(22,17,13,0.28)', acc: OA.ink, card: OA.card, panel: OA.card, grid: 'rgba(22,17,13,0.28)' };
F.disp = (s) => `400 ${s}px Anton`;
F.body = (s, w = 700) => `${Math.max(500, Math.min(800, w))} ${s}px Manrope`;
F.mono = (s, w = 500) => `${w} ${s}px "Spline Sans Mono"`;
F.serif = (s) => `400 ${s}px Anton`;   // her ~accent~ words: Anton in the accent colour (one display face)
LS.disp = 0.0; LS.mono = 0.06; LS.serif = 0.0;
PLATE.oa = [OA.bone, OA.ink, OA.orange]; PLATE.oaOrange = [OA.orange, OA.ink, OA.ink];
Object.assign(TH.look, {
  disp: (s) => `400 ${s}px Anton`, dispLS: 0, upper: true, font: 'disp', capFit: true, kwHideCap: true, cap16: (FOOT.m && FOOT.m.kind === 'teaser') ? 'three' : undefined,
  fg: OA.bone, ink: OA.ink, acc: OA.orange, accOnDark: OA.orange,
  ground: 'oaNight', cardGround: 'oaOct', panel: 'oaBone', grid: false,
  outline: OA.bone, outlinePx: 10, ring: OA.bone, ringPx: 4, plate: 'oa', dim: 0.38,
  band: OA.night, rule: 'rgba(239,231,216,0.35)',
});


/** shorts: a graphic that reaches the top of the frame starts below her top label (the band above is the night ground) */
OA.rr = (r) => {
  if (!PORTRAIT || !(FOOT.m && FOOT.m.kind === 'short')) return r; const lb = TH.labelBottom(); if (!(lb > 0)) return r;
  // in frame (layout) coordinates: a window (L19) draws its graphic translated + scaled, so measure where r really sits
  const m = ctx.getTransform(), sy = m.d / BASE[3], y0 = (m.d * r.y + m.f - BASE[5]) / BASE[3];
  if (y0 >= lb + 20) return r; const d = (lb + 24 - y0) / (sy || 1);
  rect(r.x, r.y, r.w, r.h, OA.night); return { x: r.x, y: r.y + d, w: r.w, h: r.h - d };
};
const OAX = { n: 0 };
const oaE = (t, t0, d, e = 'outQuint') => MOTION.ease(t, t0, d, e);
/** the time she starts a word inside a phrase (first match), else the phrase start */
function WT(ph, word) {
  const n = (s) => s.toLowerCase().replace(/[’]/g, "'").replace(/[^a-z0-9']/g, '');
  const want = String(word).split(/\s+/).map(n);
  const ws = WORDS.slice(ph.i, ph.i + ph.w.length);
  for (let k = 0; k <= ws.length - want.length; k++) if (want.every((x, j) => ws[k + j].n === x)) return ph.w[k];
  return ph.t;
}
OA.SRC = {};
OA.short = () => !!(PORTRAIT && FOOT.m && FOOT.m.kind === 'short');   // shorts: dark grounds so her caption box keeps its contrast   // filled from talking-head/assets/src/index.json by OA.loadSources (images are loaded through the manifest)

/** a real page crop. key = image key (the crop's name), o.t0 (when it rises in), o.hl (when the highlighter starts),
 *  o.credit (default from the index: "OUTLET · DATE"), o.day (a big orange day number above the page, the calendar's
 *  language), o.ground (G key), o.focus (0..1: where the quote sits in the window, default 0.42), o.zoom (max scale) */
OA.src = (key, o = {}) => (t, r) => { r = OA.rr(r);
  const im = IMG[key]; const meta = OA.SRC[key] || {};
  const gr = G[OA.short() ? 'oaNight' : (o.ground || 'oaNight')]; rect(r.x, r.y, r.w, r.h, gr.bg);
  if (!im) { mono('missing source ' + key, r.x + 40, r.y + 80, 28, gr.mid, 'left', { raw: true }); return; }
  const m = o.m != null ? o.m : V(48, 36); const t0 = o.t0 != null ? o.t0 : 0;
  let top = r.y + m;
  if (o.day) {   // "21 · OCTOBER 2026": the day the story happened (as in the film's calendar)
    const s = V(118, 128), p = oaE(t, t0, 0.45);
    withA(p, () => { txt(String(o.day), r.x + m, top + s * 0.86, F.disp(s), OA.orange, 'left', 'alphabetic', 0, 'day');
      mono(o.dayLine || 'OCTOBER 2026', r.x + m + tw(String(o.day), F.disp(s)) + 22, top + s * 0.86 - 8, V(28, 30), gr.mid, 'left', { key: 'dayline' }); });
    top += s + V(26, 30);
  }
  const credit = o.credit || [meta.outlet, meta.date].filter(Boolean).join(' · ');
  const capRoom = o.capRoom != null ? o.capRoom : 0;   // room kept free under the page (16:9 full frame: her captions)
  const cz = V(28, 30), creditH = credit ? cz * 2.2 : 0;
  const winH = Math.max(120, r.y + r.h - m - creditH - capRoom - top);
  const resR = o.padR || 0, resL = o.padL || 0;   // room kept free for her window tile (the page never sits under it)
  const skip = o.skipTop || 0, imH = im.height - skip;   // o.skipTop: crop px left out at the top (an ad strip, a cut masthead)
  const k = Math.min(o.zoom || 1.0, (r.w - 2 * m - resR - resL) / im.width); const pw = im.width * k, ph = imH * k;
  const x = r.x + resL + (o.align === 'left' ? m : (r.w - resR - resL - pw) / 2);
  const lines = (meta.lines || []).map(l => [l[0] * k, (l[1] - skip) * k, l[2] * k, l[3] * k]);
  // scroll (a screen recording): the page starts at its top and glides so the quote sits at o.focus of the window
  const qy = lines.length ? (lines[0][1] + lines[lines.length - 1][1] + lines[lines.length - 1][3]) / 2 : 0;
  const maxS = Math.max(0, ph - winH); const want = lines.length ? clamp((qy - winH * (o.focus == null ? 0.42 : o.focus)) / Math.max(1, maxS)) * maxS : 0;
  const s0 = o.from != null ? Math.min(maxS, o.from * k) : Math.min(want, Math.max(0, want - V(420, 520)));
  const tS = t0 + 0.35, dS = o.scrollD || 1.1;
  // after it lands, the page keeps gliding slowly (a screen recording never sits dead still): 14 px/s while there is page left
  const drift = Math.min(Math.max(0, maxS - want), Math.max(0, t - (tS + dS)) * (o.drift == null ? 14 : o.drift));
  const sc = lerp(s0, want, E.inOutCubic(prog(t, tS, dS))) + drift;
  const rise = oaE(t, t0, 0.45); const hlT = o.hl != null ? o.hl : tS + dS + 0.1;
  grp('page', x, top, pw, winH, () => withA(clamp(rise * 2), () => withT(0, (1 - rise) * 60, 1, 0, () => {
    ctx.save(); ctx.beginPath(); ctx.rect(x, top, pw, Math.min(winH, ph)); ctx.clip();
    themeFixed(() => ctx.drawImage(im, 0, skip, im.width, imH, x, top - sc, pw, ph));
    // the highlighter: each line sweeps left -> right in turn (0.3 s per line), multiply so the text stays dark
    let tl = hlT; ctx.globalCompositeOperation = 'multiply';
    for (const l of lines) { const p = E.outCubic(prog(t, tl, 0.3)); if (p > 0) rect(x + l[0] - 6, top - sc + l[1] - 2, (l[2] + 12) * p, l[3] + 4, 'rgba(255,160,118,0.62)'); tl += 0.26; }
    ctx.globalCompositeOperation = 'source-over'; ctx.restore();
    ctx.fillStyle = 'rgba(239,231,216,0.22)'; ctx.fillRect(x - 2, top - 2, pw + 4, 2);   // a hairline edge on top
  })), { img: true, label: 'real page (drag to move, resize)' });
  if (credit) withA(clamp(rise * 2), () => mono(credit, x, top + Math.min(winH, ph) + cz * 1.55, cz, gr.mid, 'left', { key: 'credit', maxW: r.w - 2 * m }));
};
/** a big number or word on a card: o.big ('9.2'), o.small ('OUT OF 10'), o.kicker (mono line on top), o.at (time it lands) */
OA.stat = (o) => (t, r) => { r = OA.rr(r);
  const gr = G[OA.short() && (o.ground || 'oaBone') === 'oaBone' ? 'oaNight' : (o.ground || 'oaBone')]; rect(r.x, r.y, r.w, r.h, gr.bg); const g0 = g; g = gr;
  const m = V(64, 48), at = o.at || 0;
  if (o.kicker) mono(o.kicker, r.x + m, r.y + m + 30, V(30, 32), gr.mid, 'left', { key: 'kicker', maxW: r.w - 2 * m });
  // laid out from the bottom up so nothing overlaps (her 2026-10-26 screenshot: "of the websites in the world" wrapped onto
  // the source line): foot at the bottom, the small line(s) above it (as many lines as it wraps to), the big number above that
  const big = String(o.big); const f = (s) => F.disp(s); const fz = V(28, 30), footY = r.y + r.h - m, kickB = r.y + m + (o.kicker ? V(60, 64) : 0);
  let ss = o.smallSize || V(64, 64); const sf = (z) => F.body(z, 800);
  const wrapN = (str, z) => { if (!str) return 0; let n = 1, cur = ''; for (const wd of String(str).split(/\s+/)) { const nx = cur ? cur + ' ' + wd : wd; if (cur && tw(nx, sf(z), -0.01 * z) > r.w - 2 * m) { n++; cur = wd; } else cur = nx; } return n; };
  const smallStr = o.small ? (ovr('small').s != null ? ovr('small').s : o.small) : '';
  let n = wrapN(smallStr, ss); while (n > 2 && ss > 40) { ss -= 4; n = wrapN(smallStr, ss); }
  const smallBottom = o.foot ? footY - fz * 1.9 : footY; const ySmall = smallBottom - (n - 1) * ss * 1.08;
  const yOf = (z) => (o.small ? ySmall - ss * 0.9 : smallBottom) - z * 0.25;   // the big line's box (incl. its 0.25 em foot) ends above the small line
  let size = o.size || Math.min(V(360, 330), r.h * 0.46); while ((tw(big, f(size)) > r.w - 2 * m || yOf(size) - size * 0.86 < kickB) && size > 40) size -= 6;
  const yBig = yOf(size);
  const p = oaE(t, at, 0.5);
  withA(clamp(p * 2.2), () => withT(0, (1 - p) * 40, 1, 0, () => txt(big, r.x + m, yBig, f(size), o.col || gr.acc, 'left', 'alphabetic', 0, 'big')));
  if (o.small) { const q = oaE(t, at + 0.25, 0.4); withA(q, () => txtW(o.small, r.x + m, ySmall, sf(ss), gr.fg, r.w - 2 * m, ss * 1.08, -0.01 * ss, 'small')); }
  if (o.foot) mono(o.foot, r.x + m, footY, fz, gr.mid, 'left', { key: 'foot', maxW: r.w - 2 * m });
  g = g0;
};
/** a terminal card: o.lines [{s, at, col}] typed on her words (mono), o.title (window title) */
OA.term = (o) => (t, r) => { r = OA.rr(r);
  rect(r.x, r.y, r.w, r.h, OA.night); const m = V(56, 40); const z = o.size || V(46, 44); const bar = V(56, 60);
  rect(r.x + m, r.y + m, r.w - 2 * m, r.h - 2 * m, '#0B0806'); rect(r.x + m, r.y + m, r.w - 2 * m, bar, '#221B15');
  for (let i = 0; i < 3; i++) rect(r.x + m + 24 + i * 30, r.y + m + bar / 2 - 7, 14, 14, i === 0 ? OA.orange : '#5A5047');
  if (o.title) mono(o.title, r.x + m + 130, r.y + m + bar / 2 + 9, V(24, 26), OA.mid, 'left', { key: 'term-title', lower: true, fixed: true });
  let y = r.y + m + bar + z * 1.6;
  (o.lines || []).forEach((l, i) => {
    const at = l.at != null ? l.at : (o.at || 0) + i * 0.5; if (t < at) return;
    const n = Math.min(l.s.length, Math.floor((t - at) * (l.cps || 38)));
    const cur = l.s.slice(0, n); const col = l.col || (l.s.startsWith('$') ? OA.bone : OA.orange);
    _txt(cur, r.x + m + 36, y, F.mono(z, 500), col, 'left');
    if (n < l.s.length || (i === o.lines.length - 1 && Math.floor(t * 2) % 2 === 0)) rect(r.x + m + 40 + tw(cur, F.mono(z, 500)), y - z * 0.8, z * 0.55, z * 0.95, OA.orange);
    y += z * 1.55;
  });
  if (o.lines) for (const l of o.lines) void l;
};
/** the month: an October 2026 calendar (weeks start Monday; the 1st is a Thursday). o.fills [{d, at, label}] turn black on
 *  her words; o.at: when the grid draws in; o.head: a line over the grid (e.g. "CYBERSECURITY AWARENESS MONTH") */
OA.month = (o) => (t, r) => { r = OA.rr(r);
  const gr = G.oaOct; rect(r.x, r.y, r.w, r.h, gr.bg); const g0 = g; g = gr;
  const m = V(64, 44), at = o.at || 0; const headS = V(96, 96);
  const p0 = oaE(t, at, 0.5);
  withA(p0, () => { txt(o.title || 'OCTOBER 2026', r.x + m, r.y + m + headS * 0.86, F.disp(headS), OA.ink, 'left', 'alphabetic', 0, 'month');
    if (o.head) mono(o.head, r.x + m, r.y + m + headS + V(40, 44), V(28, 30), gr.mid, 'left', { key: 'head', maxW: r.w - 2 * m }); });
  const gx = r.x + m, gy = r.y + m + headS + V(80, 96), gw = r.w - 2 * m, gh = r.y + r.h - m - gy; const cw = gw / 7, rh = gh / 5;
  const lp = oaE(t, at + 0.1, 0.7, 'outExpo');
  for (let i = 0; i <= 5; i++) rect(gx, gy + i * rh - 1, gw * lp, 2, gr.line);
  for (let i = 0; i <= 7; i++) rect(gx + i * cw - 1, gy, 2, gh * lp, gr.line);
  const fills = {}; (o.fills || []).forEach(f => (fills[f.d] = fills[f.d] || []).push(f));
  for (let d = 1; d <= 31; d++) {
    const i = 3 + d - 1; const c = i % 7, rw = Math.floor(i / 7); if (rw > 4) continue; const x = gx + c * cw, y = gy + rw * rh;
    const fs = fills[d]; const pf = fs ? oaE(t, fs[0].at, 0.32) : 0;
    if (pf > 0) { ctx.save(); ctx.translate(x, y); ctx.scale(1, pf); rect(2, 2, cw - 4, rh - 4, OA.ink); ctx.restore(); }
    const ns = Math.min(V(46, 40), rh * 0.36);
    withA(oaE(t, at + 0.2 + d * 0.012, 0.4), () => _txt(String(d), x + 12, y + ns + 6, F.disp(ns), pf > 0.5 ? OA.orange : OA.ink, 'left'));
    if (fs) fs.forEach((f, k) => { const q = oaE(t, f.at + 0.1, 0.3); if (q <= 0 || !f.label) return; const ls = Math.min(V(28, 24), cw / 7.5);
      withA(q, () => _mono(f.label, x + 12, y + rh - 12 - (fs.length - 1 - k) * ls * 1.3, ls, OA.bone, 'left', { ls: 0.02 })); });
  }
  g = g0;
};
/** B's pictorial key on a tag (her pick: "seeing the key move, drop"): o.tag (label), o.state 'hang' | 'taken' | 'drop',
 *  o.at (when the state happens), o.brass (the old admin key), o.stamp ('4': a number stamped on the key) */
function oaKeyShape(x, y, s, col, rot) {
  withT(x, y, s, rot, () => { ctx.fillStyle = col; ctx.beginPath(); ctx.arc(0, 0, 60, 0, Math.PI * 2); ctx.arc(0, 0, 26, 0, Math.PI * 2, true); ctx.fill('evenodd');
    ctx.fillRect(52, -14, 190, 28); ctx.fillRect(180, 14, 22, 34); ctx.fillRect(214, 14, 18, 24); ctx.fillRect(150, 14, 14, 22); });
}
OA.key = (o) => (t, r) => { r = OA.rr(r);
  const gr = G[o.ground || 'oaNight']; rect(r.x, r.y, r.w, r.h, gr.bg); const g0 = g; g = gr; const at = o.at || 0;
  const cx = r.x + r.w * 0.5, hy = r.y + r.h * 0.2; const s = Math.min(r.w, r.h) / 720;
  // the hook
  if (o.state !== 'taken') { ctx.fillStyle = gr.mid; ctx.beginPath(); ctx.arc(cx, hy, 14 * s, 0, Math.PI * 2); ctx.fill(); }   // the peg it hangs on
  let dy = 0, rot = Math.PI / 2, al = 1;
  if (o.state === 'taken') { const p = oaE(t, at, 0.6, 'inOutQuart'); dy = -p * r.h * 0.9; al = 1 - p; }
  if (o.state === 'drop') { const p = clamp((t - at) / 0.5); dy = p * p * r.h * 0.9; rot += p * 0.6; }
  const col = o.brass ? OA.brass : OA.nickel;
  withA(al, () => { oaKeyShape(cx, hy + 90 * s + dy, s * 1.3, col, rot);
    if (o.stamp) { const q = oaE(t, o.stampAt || at, 0.25); withA(q, () => withT(cx, hy + 330 * s + dy, 1 + (1 - q) * 0.6, 0, () => _txt(o.stamp, 0, 40 * s, F.disp(150 * s), OA.orange, 'center'))); } });
  if (o.tag) { const tz = V(40, 40); const tx = cx + 120 * s, ty = hy + 60 * s + dy * 0.98; const w = tw(o.tag.toUpperCase(), F.mono(tz, 600), tz * 0.06) + tz * 1.4;
    withA(al, () => { rect(tx, ty, w, tz * 2, OA.card); _mono(o.tag, tx + tz * 0.7, ty + tz * 1.36, tz, OA.ink, 'left', { w: 600 }); }); }
  if (o.lines) KT(t, { lines: o.lines, x: r.x + V(64, 48), y: r.y + r.h - V(64, 48) - (o.lines.length - 1) * V(96, 92), size: V(96, 92), font: 'disp', times: o.times || o.lines.map((_, i) => (o.linesAt || at) + i * 0.3), col: gr.fg, acc: gr.acc, lh: 1.0, fitW: r.w - 2 * V(64, 48), id: 'key-lines' });
  g = g0;
};

/** a full-frame graphic insert (no film needed): her voice goes on, her captions show on a plate (as over a film cutaway).
 *  span as in TH (phrase, [t0, t1], {from, to}); draw(t, r) gets the whole frame. o.sound ('shutter' default, false = none) */
OA.full = (s, draw, o = {}) => {
  const lead = o.lead == null ? 0.12 : o.lead, hold = o.hold == null ? 0.5 : o.hold;
  const at = (x, end) => (typeof x === 'number' ? x : end ? x.e + hold : x.t - lead);
  let t0, t1; if (Array.isArray(s)) { t0 = s[0]; t1 = s[1]; } else if (s.from != null) { t0 = at(s.from); t1 = at(s.to || s.from, true); } else { t0 = s.t - lead; t1 = s.e + hold; }
  if (o.until != null) t1 = o.until;
  TH.used = true; const id = o.id || 'insert-' + (++OAX.n);
  const enter = o.enter == null ? 0.3 : o.enter;
  TH.segs.push({ kind: 'cutaway', t0, t1, id, cover: true, card: false, ground: 'oaNight', o,
    draw: (t) => { const p = enter ? E.outCubic(prog(t, t0, enter)) : 1; const k = 1 + 0.03 * E.inOutCubic(prog(t, t0, Math.max(0.5, t1 - t0)));   // a slow push: never dead still
      withT((1 - p) * W * 0.12 + W / 2 * (1 - k), H / 2 * (1 - k), k, 0, () => draw(t, { x: 0, y: 0, w: W, h: H })); if (p < 1) withA(1 - p, () => rect(0, 0, W, H, OA.night)); } });
  if (o.sound !== false) sfx(o.sound || 'shutter', t0 + 0.06, o.db != null ? o.db : -4);
  return { t0, t1, id };
};
/** the crops' index (lines, outlet, date): written by tools/hicap.mjs; the manifest's "data" brings it in as OA_SRC */
if (typeof OA_SRC !== 'undefined') Object.assign(OA.SRC, OA_SRC);

/** her deck's numbered list: mono 01 + bold line + hairline rule, each item lands on her word. o.items [{s, at}], o.kicker, o.from (first number) */
OA.list = (o) => (t, r) => { r = OA.rr(r);
  const gr = G[OA.short() && (o.ground || 'oaBone') === 'oaBone' ? 'oaNight' : (o.ground || 'oaBone')]; rect(r.x, r.y, r.w, r.h, gr.bg); const g0 = g; g = gr;
  const m = V(64, 48); let y = r.y + m;
  if (o.kicker) { mono(o.kicker, r.x + m, y + 30, V(32, 32), gr.mid, 'left', { key: 'kicker', maxW: r.w - 2 * m }); y += V(90, 84); }
  const n = o.items.length; const rowH = Math.min(V(200, 170), (r.y + r.h - m - y - (o.capRoom || 0)) / Math.max(1, n)); const z = Math.min(V(84, 64), rowH * 0.46);
  o.items.forEach((it, i) => {
    const p = oaE(t, it.at, 0.45); const yy = y + i * rowH;
    withA(clamp(p * 2), () => withT((1 - p) * 50, 0, 1, 0, () => {
      _mono(String((o.from || 1) + i).padStart(2, '0'), r.x + m, yy + rowH * 0.56, V(30, 32), gr.acc, 'left', { w: 600 });
      txt(it.s, r.x + m + V(86, 84), yy + rowH * 0.6, F.body(z, 800), gr.fg, 'left', 'alphabetic', -0.01 * z, 'item' + (i + 1));
    }));
    hline(r.x + m, yy + rowH - 2, r.w - 2 * m, oaE(t, it.at + 0.1, 0.6, 'outExpo'), gr.line, 2);
  });
  g = g0;
};
/** a simple flow: boxes joined by arrows, each box lands on her word. o.steps [{s, at, hot}] (hot = orange box) */
OA.flow = (o) => (t, r) => { r = OA.rr(r);
  const gr = G[o.ground || 'oaNight']; rect(r.x, r.y, r.w, r.h, gr.bg); const g0 = g; g = gr;
  const m = V(72, 48), n = o.steps.length; const vert = PORTRAIT || r.w < r.h * 1.15 || o.vertical;
  const z = o.size || V(44, 46);
  if (o.kicker) mono(o.kicker, r.x + m, r.y + m + 30, V(30, 32), gr.mid, 'left', { key: 'kicker', maxW: r.w - 2 * m });
  const top = r.y + m + (o.kicker ? V(90, 96) : 0), avH = r.y + r.h - m - top - (o.capRoom || 0);
  const gap = V(64, 56);
  const bw = vert ? Math.min(r.w - 2 * m, V(760, 900)) : (r.w - 2 * m - gap * (n - 1)) / n, bh = vert ? Math.min(V(130, 150), (avH - gap * (n - 1)) / n) : Math.min(V(260, 220), avH);
  o.steps.forEach((s, i) => {
    const x = vert ? r.x + (r.w - bw) / 2 : r.x + m + i * (bw + gap), y = vert ? top + i * (bh + gap) : top + (avH - bh) / 2;
    const p = oaE(t, s.at, 0.42);
    if (i > 0) { const q = oaE(t, s.at - 0.15, 0.35, 'outExpo'); ctx.fillStyle = gr.mid;
      if (vert) { ctx.fillRect(x + bw / 2 - 2, y - gap + 8, 4, (gap - 16) * q); }
      else { ctx.fillRect(x - gap + 8, y + bh / 2 - 2, (gap - 16) * q, 4); if (q > 0.9) { ctx.beginPath(); ctx.moveTo(x - 6, y + bh / 2); ctx.lineTo(x - 22, y + bh / 2 - 12); ctx.lineTo(x - 22, y + bh / 2 + 12); ctx.fill(); } } }
    withA(clamp(p * 2), () => withT(0, (1 - p) * 30, 1, 0, () => {
      rect(x, y, bw, bh, s.hot ? OA.orange : OA.bone);
      const lines = String(s.s).split('\n'); const zz = Math.min(z, bh / (lines.length * 1.25 + 0.3));
      let fz = zz; for (const l of lines) while (tw(l.toUpperCase(), F.disp(fz)) > bw - 40 && fz > 20) fz -= 2;
      lines.forEach((l, k) => txt(l.toUpperCase(), x + bw / 2, y + bh / 2 + (k - (lines.length - 1) / 2) * fz * 1.12 + fz * 0.36, F.disp(fz), OA.ink, 'center', 'alphabetic', 0, 'step' + (i + 1) + (k ? '-' + k : '')));
    }));
  });
  g = g0;
};
/** the padlock: a plain browser address bar with the padlock (no brand), o.at (lands), o.url (generic text) */
OA.lock = (o) => (t, r) => { r = OA.rr(r);
  const gr = G[o.ground || 'oaBone']; rect(r.x, r.y, r.w, r.h, gr.bg);
  const m = V(64, 48), bw = r.w - 2 * m, bh = V(120, 120), x = r.x + m, y = r.y + r.h * 0.42 - bh / 2; const p = oaE(t, o.at || 0, 0.5);
  withA(clamp(p * 2), () => { rect(x, y, bw, bh, OA.card); strokeR(x, y, bw, bh, OA.lineB, 3);
    const lx = x + 40, ly = y + bh / 2, s = 1 + (1 - p) * 0.6;   // the padlock
    withT(lx + 24, ly, s, 0, () => { ctx.strokeStyle = OA.ink; ctx.lineWidth = 7; ctx.beginPath(); ctx.arc(0, -10, 16, Math.PI, 0); ctx.stroke(); rect(-24, -10, 48, 38, OA.ink); });
    _txt(o.url || 'https://', lx + 76, ly + 17, F.mono(V(46, 44), 500), OA.dimB, 'left'); });
  if (o.lines) KT(t, { lines: o.lines, x: r.x + m, y: y + bh + V(150, 160), size: V(96, 92), font: 'disp', times: o.times, col: OA.ink, acc: OA.orange, lh: 1.0, fitW: r.w - 2 * m, id: 'lock-lines' });
};
/** layers: your app / Laravel / PHP, the hole lands in the bottom layer on her word (o.at, o.holeAt) */
OA.layers = (o) => (t, r) => { r = OA.rr(r);
  const gr = G[o.ground || 'oaNight']; rect(r.x, r.y, r.w, r.h, gr.bg); const m = V(72, 48);
  const L = o.layers || ['YOUR APP', 'LARAVEL', 'PHP']; const n = L.length; const gap = V(22, 22); const h = Math.min(V(170, 170), (r.h - 2 * m - gap * (n - 1) - V(120, 120)) / n);
  const y0 = r.y + r.h - m - V(120, 120) - n * h - (n - 1) * gap;
  L.forEach((s, i) => { const at = (o.at || 0) + i * 0.25; const p = oaE(t, at, 0.45); const y = y0 + i * (h + gap); const last = i === n - 1;
    withA(clamp(p * 2), () => withT(0, (1 - p) * -40, 1, 0, () => { rect(r.x + m, y, r.w - 2 * m, h, last ? OA.orange : OA.bone);
      txt(s, r.x + m + 40, y + h * 0.66, F.disp(h * 0.5), OA.ink, 'left', 'alphabetic', 0, 'layer' + (i + 1)); })); });
  if (o.holeAt != null) { const q = oaE(t, o.holeAt, 0.4); const y = y0 + (n - 1) * (h + gap);
    withA(q, () => { const hx = r.x + r.w - m - h * 1.1; ctx.fillStyle = OA.ink; ctx.beginPath(); ctx.ellipse(hx, y + h / 2, h * 0.42 * q, h * 0.3 * q, 0, 0, Math.PI * 2); ctx.fill();
      mono(o.holeText || 'the loophole is here', r.x + m, y + h + V(70, 74), V(32, 34), OA.orange, 'left', { key: 'hole' }); }); }
};
/** B's key wall: one hook per name, a key on each; keys appear on her words (o.keys [{tag, at, takenAt}]) */
OA.wall = (o) => (t, r) => { r = OA.rr(r);
  const gr = G[o.ground || 'oaNight']; rect(r.x, r.y, r.w, r.h, gr.bg); const g0 = g; g = gr;
  const n = o.keys.length; const m = V(96, 56); const cw = (r.w - 2 * m) / n; const s = Math.min(cw / 360, V(1.0, 0.8));
  o.keys.forEach((k, i) => {
    const cx = r.x + m + cw * (i + 0.5), hy = r.y + r.h * V(0.2, 0.26); const p = oaE(t, k.at, 0.45);
    rect(cx - 7, hy - 36, 14, 48, gr.mid);
    let dy = (1 - p) * -60, al = clamp(p * 2); if (k.takenAt != null) { const q = oaE(t, k.takenAt, 0.6, 'inOutQuart'); dy -= q * r.h * 0.5; al *= 1 - q; }
    withA(al, () => oaKeyShape(cx, hy + 70 * s + dy, s * 0.9, k.brass ? OA.brass : OA.nickel, Math.PI / 2));
    const tz = V(34, 30); const tag = k.tag.toUpperCase(); const w = tw(tag, F.mono(tz, 600), tz * 0.06) + tz * 1.2;
    withA(clamp(p * 2), () => { rect(cx - w / 2, hy + 330 * s, w, tz * 2, OA.card); _mono(tag, cx, hy + 330 * s + tz * 1.36, tz, OA.ink, 'center', { w: 600 }); });
  });
  if (o.lines) KT(t, { lines: o.lines, x: r.x + m, y: r.y + r.h - V(260, 330), size: V(110, 96), font: 'disp', times: o.times, col: gr.fg, acc: gr.acc, lh: 1.0, fitW: r.w - 2 * m, id: 'wall-lines' });
  g = g0;
};
/** a wall of real headlines (crops), pinned one after another (o.keys image keys, o.at start, 0.35 s apart) */
OA.heads = (o) => (t, r) => { r = OA.rr(r);
  rect(r.x, r.y, r.w, r.h, OA.orange); const n = o.keys.length; const cols = V(3, 2); const m = V(56, 40), gap = V(28, 24);
  const cw = (r.w - 2 * m - gap * (cols - 1)) / cols; const rows = Math.ceil(n / cols); const chH = (r.h - 2 * m - (o.capRoom || 0) - gap * (rows - 1)) / rows;
  o.keys.forEach((key, i) => { const im = IMG[key]; if (!im) return; const c = i % cols, rw = Math.floor(i / cols);
    const k = Math.min(cw / im.width, chH / im.height); const w = im.width * k, h = im.height * k; const x = r.x + m + c * (cw + gap) + (cw - w) / 2, y = r.y + m + rw * (chH + gap);
    const p = oaE(t, (o.at || 0) + i * 0.35, 0.4); const rot = (hash(i + 3) - 0.5) * 0.05;
    withA(clamp(p * 2), () => withT(x + w / 2, y + h / 2 + (1 - p) * 40, 1 + (1 - p) * 0.08, rot, () => themeFixed(() => { rect(-w / 2 - 8, -h / 2 - 8, w + 16, h + 16, '#FFFFFF'); ctx.drawImage(im, -w / 2, -h / 2, w, h); }))); });
};
