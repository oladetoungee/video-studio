/* phone-distraction · building blocks on top of kit.js: the two-column lock-screen layout, headlines, punch screens and the
 * phone-native illustrations (widgets, feed, toggles, player, reel, web page, checklists). All labelled ILLUSTRATION where
 * they draw a made-up screen. Every function draws at time t and is a pure function of it.
 */
'use strict';

/* ---------- layout ---------- */
// 16:9: a left column (headline / visual) and the banner column on the right (look A). 9:16: visual on top, banners below.
const LY = {
  get lx() { return V(120, 70); }, get lw() { return V(700, 940); }, get ly() { return V(170, SAFE.contentTop + 10); },
  get bx() { return V(880, 60); }, get bw() { return V(920, 960); }, get by() { return V(150, 960); },
  get vx() { return V(1010, 90); }, get vw() { return V(800, 900); }, get vy() { return V(150, SAFE.contentTop + 10); },
};
const HEAD = () => V(84, 74);

/** a headline (600, -0.03 em): words land on their spoken times. s may use *red* _underline_ ~muted~ */
const HSTYLES = ['words', 'drop', 'words', 'type', 'drop', 'words'];
function headline(t, s, o) {
  const mode = o.mode || HSTYLES[Math.abs([...(SCENE_ID + '|' + (o.y || 0))].reduce((a, c) => (a * 31 + c.charCodeAt(0)) | 0, 7)) % HSTYLES.length];
  return rich(t, s, { mode, x: o.x == null ? LY.lx : o.x, y: o.y == null ? LY.ly : o.y, size: o.size || HEAD(), weight: 600, lh: 1.04, maxW: o.maxW || LY.lw,
    times: o.times, ev: o.ev, at: o.at, key: o.key, col: o.col, align: o.align, red: o.red });
}
/** times for a display line from a spoken phrase (one per display word; spread evenly if the counts differ) */
function TW(ph, s) {
  // align display words to the spoken words (same word = its own time, in order); the rest are interpolated between neighbours
  const dw = parseRich(s).map(w => norm(w.s.replace(/[“”"’]/g, m => (m === '’' ? "'" : ''))));
  const sw = WORDS.slice(ph.i, ph.i + ph.w.length).map(x => x.n);
  const out = new Array(dw.length).fill(null); let j = 0;
  dw.forEach((w, i) => { for (let k = j; k < sw.length; k++) if (sw[k] === w) { out[i] = ph.w[k]; j = k + 1; break; } });
  for (let i = 0; i < out.length; i++) if (out[i] == null) {
    let a = i - 1; while (a >= 0 && out[a] == null) a--; let b = i + 1; while (b < out.length && out[b] == null) b++;
    const ta = a >= 0 ? out[a] : ph.t, tb = b < out.length ? out[b] : Math.min(ph.e, (a >= 0 ? out[a] : ph.t) + 0.6);
    out[i] = lerp(ta, tb, (i - a) / (b - a));
  }
  return out;
}
/** banner item from a phrase: B(ph, 'text with *marks*', ['word in phrase for each mark', ...], extra) */
function B(ph, s, marks = [], x = {}) { return { s, at: ph.t - 0.06, ev: marks.map(m => (typeof m === 'number' ? m : ph.at(m))), ...x }; }

/** the red punch screen: huge type, emphasis words in ink */
function punch(t, s, o) {
  const size = o.size || V(118, 104);
  rich(t, s, { x: o.x == null ? V(120, 70) : o.x, y: o.y == null ? V(300, 640) : o.y, size, weight: 700, lh: 0.98, maxW: o.maxW || V(1600, 940), times: o.times, ev: o.ev, at: o.at, col: PD.onRed, red: PD.ink, key: o.key });
  if (o.sub) credit(o.sub, o.x == null ? V(124, 74) : o.x, V(940, 1380), V(1500, 900), { col: 'rgba(255,246,242,0.86)' });
}

/* ---------- widgets (rounded cards in the lock-screen language) ---------- */
/** card(x, y, w, h, at): a card that drops in whole (0.35 s outExpo from y-40). fn(y) draws inside. Movable. */
function card(t, key, x, y, w, h, at, fn, o = {}) {
  at = onCut(at); if (t < at) return; const p = MOTION.ease(t, at, 0.35, 'outExpo'); const a = clamp((t - at) / 0.2) * (o.gone != null ? 1 - clamp((t - o.gone) / 0.25) : 1);
  const yy = y + (1 - p) * (o.from == null ? -40 : o.from);
  withA(a, () => grp(key, x, yy, w, h, () => { fillRR(x, yy, w, h, o.r || BAN.r, o.col || PD.card); fn(yy, p); }));
}
/** big-number widget: label on top, a huge value, a muted line */
function bigWidget(t, key, x, y, w, at, top, value, sub, o = {}) {
  const vs = o.vsize || V(150, 150); const h = o.h || (40 + 50 + vs * 0.92 + (sub ? 70 : 20) + 20);
  card(t, key, x, y, w, h, at, (yy) => {
    lab(top, x + 40, yy + 66, { size: 34 });
    _txt(value, x + 34, yy + 66 + 26 + vs * 0.78, FT(o.vw || 300, vs), o.vcol || PD.text, 'left', 'alphabetic', -0.04 * vs);
    if (sub) txtW(sub, x + 40, yy + 66 + 26 + vs * 0.78 + 66, FT(500, 34), PD.muted, w - 80, 44);
  });
  return h;
}
/** contact card: a round avatar with initials, a name, lines under it */
function contact(t, key, x, y, w, at, initials, name, lines, o = {}) {
  const h = o.h || 150 + lines.length * 46;
  card(t, key, x, y, w, h, at, (yy) => {
    const r = 54; circle(x + 40 + r, yy + 40 + r, r, o.av || PD.tiles[3]);
    _txt(initials, x + 40 + r, yy + 40 + r + 17, FT(600, 46), PD.text, 'center');
    txt(name, x + 40 + 2 * r + 34, yy + 40 + 46, FT(600, o.nameSize || 52), PD.text, 'left', 'alphabetic', -1);
    lines.forEach((l, i) => { const lt = o.lineAt ? o.lineAt[i] : at; if (t >= lt) withA(clamp((t - lt) / 0.25), () => txt(l, x + 40 + 2 * r + 34, yy + 40 + 46 + 52 + i * 46, FT(500, 34), i === 0 && o.lead ? PD.text : PD.muted)); });
  });
  return h;
}
/** quote card: big words (600) and a credit */
function quoteCard(t, key, x, y, w, at, s, cred, o = {}) {
  const size = o.size || V(64, 60); const Lo = richH(s, { size, maxW: w - 80 }); const ch = cred ? 46 * Math.ceil(tw(cred, FT(500, 34)) / (w - 80) + 0.01) + 30 : 0;
  const h = 46 + Lo.h + 10 + ch + 34;
  card(t, key, x, y, w, h, at, (yy) => {
    rich(t, s, { x: x + 40, y: yy + 46, size, weight: 600, lh: 1.08, maxW: w - 80, ev: o.ev, at, col: PD.text, times: o.times });
    if (cred) txtW(cred, x + 40, yy + 46 + Lo.h + 10 + 40, FT(500, 34), PD.muted, w - 80, 44);
  });
  return h;
}
/** a numbered list widget: rows land on their times; o.done: times each row gets a red tick */
function listCard(t, key, x, y, w, rows, times, o = {}) {
  const rh = o.rh || V(84, 86); const h = 40 + rows.length * rh + 24; const at = times[0] - 0.25;
  card(t, key, x, y, w, h, at, (yy) => {
    rows.forEach((r, i) => {
      const ry = yy + 40 + i * rh; const ti = onCut(times[i]); const a = clamp((t - ti) / 0.25); if (a <= 0) return;
      const cur = o.cur && t >= times[i] && (i === rows.length - 1 || t < times[i + 1]);
      withA(a, () => {
        _txt(String(i + 1).padStart(2, '0'), x + 40, ry + rh * 0.62, FT(600, 34), cur ? PD.red : PD.muted, 'left', 'alphabetic', 4);
        txt(r, x + 120, ry + rh * 0.62, FT(500, o.size || V(44, 42)), PD.text, 'left', 'alphabetic', -0.4);
        if (i < rows.length - 1) rect(x + 40, ry + rh - 1, w - 80, 2, PD.line);
      });
    });
  });
  return h;
}

/* ---------- a phone screen inside the frame ---------- */
/** phone(x, y, w, h, fn): a dark device outline with a screen clip; fn(sx, sy, sw, sh) draws the screen */
function phone(key, x, y, w, h, fn) {
  grp(key, x, y, w, h, () => {
    fillRR(x, y, w, h, w * 0.13, '#26292F');
    const b = w * 0.035; const sx = x + b, sy = y + b, sw = w - 2 * b, sh = h - 2 * b;
    fillRR(sx, sy, sw, sh, w * 0.11, PD.ink);
    ctx.save(); rr(sx, sy, sw, sh, w * 0.11); ctx.clip(); fn(sx, sy, sw, sh); ctx.restore();
  });
}
/** a feed: posts of height ph scrolled by `off` px (illustration). o.ad(i) -> true marks a post as Sponsored, o.like(i) */
function feed(sx, sy, sw, sh, off, o = {}) {
  const ph = o.ph || sw * 1.05; const pad = sw * 0.06; const i0 = Math.floor(off / ph);
  for (let i = i0; i < i0 + Math.ceil(sh / ph) + 1; i++) {
    const y = sy + i * ph - off + (o.top || 0); if (y > sy + sh) break;
    fillRR(sx + pad, y + pad, sw - 2 * pad, ph - 1.5 * pad, sw * 0.05, PD.card);
    const ix = sx + pad * 1.6, iw = sw - 3.2 * pad;
    circle(ix + sw * 0.04, y + pad * 1.6 + sw * 0.04, sw * 0.04, PD.tiles[(i + 1) % 4]);
    rect(ix + sw * 0.11, y + pad * 1.6 + sw * 0.025, iw * 0.38, Math.max(6, sw * 0.022), '#4A4D55');
    fillRR(ix, y + pad * 1.6 + sw * 0.12, iw, ph * 0.52, sw * 0.03, PD.tiles[(i * 7 + 2) % 4]);
    if (o.ad && o.ad(i)) { const fs = Math.max(20, sw * 0.055); _txt('Sponsored', ix + sw * 0.11, y + pad * 1.6 + sw * 0.11, FT(600, fs), PD.red); }
    if (o.like) o.like(i, ix, y + pad * 1.6 + sw * 0.12 + ph * 0.52 + sw * 0.07);
  }
}
/** a heart (filled or outline) centred at x, y, size s */
function heart(x, y, s, col, fill = true, lw = 4) {
  ctx.save(); ctx.translate(x, y); ctx.scale(s / 100, s / 100); ctx.beginPath();
  ctx.moveTo(0, 30); ctx.bezierCurveTo(-60, -10, -45, -60, 0, -32); ctx.bezierCurveTo(45, -60, 60, -10, 0, 30); ctx.closePath();
  if (fill) { ctx.fillStyle = col; ctx.fill(); } else { ctx.strokeStyle = col; ctx.lineWidth = lw * 100 / s; ctx.stroke(); }
  ctx.restore();
}
/** an iOS-like toggle at x, y (w 96, h 58): on in [0..1] (animated) */
function toggle(x, y, on, k = 1, onCol = '#34C759') {
  const w = 96 * k, h = 58 * k; const c = on > 0.5 ? onCol : '#3A3D45';
  fillRR(x, y, w, h, h / 2, c); circle(x + h / 2 + (w - h) * on, y + h / 2, h / 2 - 5 * k, '#F4F1EA');
}
/** a settings list: rows {label, on0, flip (time it switches), sub} */
function settings(t, key, x, y, w, rows, at, o = {}) {
  const rh = o.rh || 104; const h = rows.length * rh + 20;
  card(t, key, x, y, w, h, at, (yy) => {
    rows.forEach((r, i) => {
      const ry = yy + 10 + i * rh; const ra = r.at != null ? clamp((t - r.at) / 0.25) : 1; if (ra <= 0) return;
      withA(ra, () => {
        txt(r.label, x + 40, ry + rh / 2 + 15, FT(500, o.size || 44), PD.text, 'left', 'alphabetic', -0.4);
        const on = r.flip == null ? (r.on0 ? 1 : 0) : (r.on0 ? 1 - MOTION.ease(t, r.flip, 0.3, 'outQuint') : MOTION.ease(t, r.flip, 0.3, 'outQuint'));
        toggle(x + w - 40 - 96, ry + rh / 2 - 29, on);
        if (r.sub) _txt(r.sub, x + w - 40 - 96 - 24, ry + rh / 2 + 12, FT(500, 34), PD.muted, 'right');
        if (i < rows.length - 1) rect(x + 40, ry + rh - 1, w - 80, 2, PD.line);
      });
    });
  });
  return h;
}

/* ---------- small marks ---------- */
/** a tap ripple at x, y from t0 */
function tap(t, t0, x, y, col = PD.text) {
  const q = clamp((t - t0) / 0.5); if (q <= 0 || q >= 1) return;
  ctx.save(); ctx.globalAlpha *= (1 - q) * 0.9; ctx.strokeStyle = col; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(x, y, 18 + 50 * MOTION.EASE.outQuint(q), 0, Math.PI * 2); ctx.stroke(); ctx.restore();
  if (q < 0.35) withA(0.8 * (1 - q / 0.35), () => circle(x, y, 24, col));
}
/** a fingertip dot that follows a path: pts [[t, x, y]...] (eased between keys) */
function finger(t, pts, col = PD.text) {
  if (t < pts[0][0] || t > pts[pts.length - 1][0] + 0.3) return;
  let x = pts[0][1], y = pts[0][2];
  for (let i = 0; i < pts.length - 1; i++) { const [a, x0, y0] = pts[i], [b, x1, y1] = pts[i + 1]; if (t >= a) { const e = MOTION.EASE.inOutQuart(clamp((t - a) / (b - a))); x = lerp(x0, x1, e); y = lerp(y0, y1, e); } }
  const fade = clamp((pts[pts.length - 1][0] + 0.3 - t) / 0.3) * clamp((t - pts[0][0]) / 0.15);
  withA(0.85 * fade, () => { circle(x, y, 30, col); });
}
/** a progress bar (0..1) */
function bar(x, y, w, h, p, col = PD.red, bg = '#3A3D45') { fillRR(x, y, w, h, h / 2, bg); if (p > 0) fillRR(x, y, Math.max(h, w * clamp(p)), h, h / 2, col); }
