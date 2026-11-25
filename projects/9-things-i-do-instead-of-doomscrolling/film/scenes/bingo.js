/* 9 things I do instead of doomscrolling: the look A · OFFLINE BINGO (her pick 2026-11-02), shared by the motion film and the
 * talking-head edit, shorts and teaser (talking-head.json "common", before moments/common.js).
 * The nine swaps are a 3x3 bingo card: the card IS the 1-9 counter (each item daubs its square, so the numbering is always
 * right, even where she says another number). Butter ground #F7D44C, card #FFFDF5, ink #161616; the dauber #FF6A1A only ever
 * means "done"; the current square is filled pale butter (no rings). Type set 06 Ultra condensed (TYPE-SYSTEM.md, her pick 2026-11-07):
 * League Gothic UPPERCASE (numerals, headlines), Inter Tight 500-700 (labels, quotes, captions), DM Mono 500 (counters, credits).
 * No thick borders, outlines or boxes around text: space and colour separate things. Item labels appear whole.
 * Every text editable (txt / BG.ml / BG.text with ovr keys: [word] = an ink block with the word knocked out in butter),
 * every block movable (grp). Each graphic BG.x(o) returns draw(t, r) (r = the rect it fills). */
'use strict';
const BG = { butter: '#F7D44C', card: '#FFFDF5', ink: '#161616', daub: '#FF6A1A', mute: '#6B6455', soft: '#FBE7A1',
  line: 'rgba(22,22,22,0.18)', lineW: 'rgba(255,253,245,0.2)' };
BG.ITEMS = [['01', 'Reading'], ['02', 'Boredom'], ['03', 'Small talk'], ['04', 'Making\nfriends'], ['05', 'Something\nnew'],
  ['06', 'Long-form'], ['07', 'Something\nphysical'], ['08', 'Prayer +\njournaling'], ['09', 'Call your\npeople']];
const BGF = (() => { const add = (fam, file, d) => { const f = new FontFace(fam, `url(/library/fonts/${file})`, d || {}); document.fonts.add(f); return f.load(); };
  return Promise.all([add('League Gothic', 'LeagueGothicRegular.ttf'), add('Inter Tight', 'InterTightMedium.ttf', { weight: '500' }), add('Inter Tight', 'InterTightSemiBold.ttf', { weight: '600' }), add('Inter Tight', 'InterTightBold.ttf', { weight: '700' }), add('Inter Tight', 'InterTightExtraBold.ttf', { weight: '800' }), add('Inter Tight', 'InterTightRegular.ttf', { weight: '400' })])
    .catch(e => console.error('bingo fonts', e)); })();
G.bgButter = { bg: BG.butter, fg: BG.ink, mid: BG.mute, line: BG.line, acc: BG.ink, card: BG.card, panel: BG.soft, grid: BG.line, mode: 'light' };
G.bgInk = { bg: BG.ink, fg: BG.card, mid: '#BDB6A2', line: BG.lineW, acc: BG.butter, card: BG.card, panel: '#242424', grid: BG.lineW, mode: 'dark' };
G.bgCard = { bg: BG.card, fg: BG.ink, mid: BG.mute, line: BG.line, acc: BG.daub, card: BG.card, panel: '#F3EFE2', grid: BG.line, mode: 'light' };
F.disp = (s) => `400 ${s}px "League Gothic"`;
F.body = (s, w = 600) => `${Math.max(400, Math.min(800, Math.round(w / 100) * 100 > 800 ? 800 : Math.round(w / 100) * 100))} ${s}px "Inter Tight"`;
F.mono = (s, w = 500) => `500 ${s}px "DM Mono"`;
F.serif = (s) => `700 ${s}px "Inter Tight"`;
LS.disp = 0.0; LS.body = -0.015; LS.mono = 0.12; LS.serif = -0.015;
BG.mute = '#7A6516';   // the quiet words of a headline on butter (the [key] words are ink)
if (typeof PLATE !== 'undefined') { PLATE.bg = [BG.card, BG.ink, BG.ink]; PLATE.bgInk = [BG.ink, BG.card, BG.butter]; }

const bgE = (t, t0, d, e = 'outQuint') => MOTION.ease(t, t0, d, e);
BG.sfx = (role, t, db = 0) => { if (t != null && t >= 0 && t < TOTAL) sfx(role, t, db); };
/** the time she starts a word inside a phrase (first match after `from` words), else the phrase start */
function WT(ph, word, nth = 0) {
  if (!ph) return 0; const n = (s) => s.toLowerCase().replace(/[’]/g, "'").replace(/[^a-z0-9']/g, '');
  const want = String(word).split(/\s+/).map(n); const ws = WORDS.slice(ph.i, ph.i + ph.w.length); let c = 0;
  for (let k = 0; k <= ws.length - want.length; k++) if (want.every((x, j) => ws[k + j].n === x)) { if (c++ === nth) return ph.w[k]; }
  return ph.t;
}
function clipR(x, y, w, h, fn) { ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip(); fn(); ctx.restore(); }
BG.short = () => !!(typeof FOOT !== 'undefined' && PORTRAIT && FOOT.m && FOOT.m.kind === 'short');
/** shorts: a graphic that reaches the top of the frame starts below the top label */
BG.rr = (r) => {
  if (!BG.short() || typeof TH === 'undefined') return r; const lb = TH.labelBottom(); if (!(lb > 0)) return r;
  const m = ctx.getTransform(), sy = m.d / BASE[3], y0 = (m.d * r.y + m.f - BASE[5]) / BASE[3];
  if (y0 >= lb + 20) return r; const d = (lb + 24 - y0) / (sy || 1); return { x: r.x, y: r.y + d, w: r.w, h: r.h - d };
};

/** editable multi-line text ('\n' = new line); one element, one box. Returns {w, h}. */
BG.ml = (key, def, x, y, font, col, o = {}) => {
  const ov = ovr(key); const str = ov.s != null ? ov.s : def; const lines = String(str).split('\n'); const fs = fontPx(font); const lh = (o.lh || 1.04) * fs; const ls = o.ls || 0;
  const W_ = Math.max(...lines.map(l => tw(l, font, ls))); const bx = o.align === 'center' ? x - W_ / 2 : o.align === 'right' ? x - W_ : x;
  const info = { text: str, def }; const H_ = (lines.length - 1) * lh + fs * 1.05;
  if (ov.hide) { regBox(ov, bx, y - fs * 0.8, W_, H_, info); return { w: W_, h: H_ }; }
  moved(ov, () => { lines.forEach((l, i) => _txt(l, x, y + i * lh, font, col, o.align || 'left', 'alphabetic', ls)); regBox(ov, bx, y - fs * 0.8, W_, H_, info); }, [bx + W_ / 2, y]);
  return { w: W_, h: H_ };
};
/** editable display text: [word] = an ink block with the word knocked out (sweeps in at o.hits), '\n' = new line; the whole
 *  text rises in at o.at (0.42 s). size shrinks to fit o.maxW. o.f font fn, o.col, o.knock, o.blockCol, o.align, o.lh. */
BG.text = (t, key, def, x, y, size, o = {}) => {
  const ov = ovr(key); const str = ov.s != null ? ov.s : def; const disp = !o.f; const ff = o.f || ((s) => F.disp(s));
  const lines = String(disp ? str.toUpperCase() : str).split('\n'); const hasB = /\[/.test(str); const plain = (l) => l.replace(/[\[\]]/g, ''); const ls = (z) => (o.ls == null ? -0.01 : o.ls) * z;
  let z = size; const wid = (zz) => Math.max(...lines.map(l => tw(plain(l), ff(zz), ls(zz))));
  if (o.maxW) while (wid(z) > o.maxW && z > 18) z -= 2;
  const font = ff(z), lh = (o.lh || (disp ? 0.86 : 1.1)) * z, W_ = wid(z), H_ = (lines.length - 1) * lh + z * 1.08;
  const bx = o.align === 'center' ? x - W_ / 2 : o.align === 'right' ? x - W_ : x;
  const a = o.at == null ? 1 : bgE(t, o.at, 0.42); const info = { text: str, def, label: 'text ([word] = ink block)' };
  if (ov.hide) { regBox(ov, bx, y - z * 0.86, W_, H_, info); return { w: W_, h: H_, size: z }; }
  if (a > 0.002) moved(ov, () => { let bi = 0;
    withA(clamp(a * 1.8), () => withT(0, (1 - a) * z * 0.3, 1, 0, () => lines.forEach((l, li) => {
      const lw = tw(plain(l), font, ls(z)); let xx = o.align === 'center' ? x - lw / 2 : o.align === 'right' ? x - lw : x; const yy = y + li * lh;
      for (const p of l.split(/(\[[^\]]+\])/).filter(Boolean)) {
        const bl = p[0] === '['; const s = bl ? p.slice(1, -1) : p; const w = tw(s, font, ls(z));
        const quiet = hasB && !bl ? (o.quiet || BG.mute) : (o.col || BG.ink);
        _txt(s, xx, yy, font, bl ? (o.col || BG.ink) : quiet, 'left', 'alphabetic', ls(z));
        if (bl) { const ht = Array.isArray(o.hits) ? o.hits[Math.min(bi, o.hits.length - 1)] : o.hits != null ? o.hits : (o.at || 0) + 0.3; bi++;
          const q = bgE(t, ht, 0.4, 'outExpo'); if (q > 0 && o.blockCol) { const pd = z * 0.04, by = yy + z * 0.06, bw = (w + 2 * pd) * q;   // the key word: a 2 px-thin colour rule under it (no box)
            rect(xx - pd, by, bw, Math.max(2, z * 0.02), o.blockCol); } }
        xx += w; } })));
    regBox(ov, bx, y - z * 0.86, W_, H_, info); }, [bx + W_ / 2, y]);
  return { w: W_, h: H_, size: z };
};
/** a mono label: Red Hat Mono, upper case, letter-spaced */
BG.mono = (key, def, x, y, z, col = BG.ink, align = 'left') => { const ov = ovr(key); const s = (ov.s != null ? ov.s : def); const f = F.mono(z); const S_ = s.toUpperCase(); const w = tw(S_, f, z * 0.12);
  const bx = align === 'center' ? x - w / 2 : align === 'right' ? x - w : x; if (ov.hide) { regBox(ov, bx, y - z * 0.8, w, z * 1.05, { text: s, def }); return w; }
  moved(ov, () => { _txt(S_, x, y, f, col, align, 'alphabetic', z * 0.12); regBox(ov, bx, y - z * 0.8, w, z * 1.05, { text: s, def }); }); return w; };

/* ---------- the dauber blot ---------- */
BG.blot = (cx, cy, r, seed, col = BG.daub, a = 0.88) => {
  ctx.save(); ctx.globalAlpha *= a; ctx.globalCompositeOperation = 'multiply'; ctx.beginPath(); const n = 44;
  for (let i = 0; i <= n; i++) { const an = i / n * Math.PI * 2; const rr_ = r * (1 + 0.035 * Math.sin(an * 3 + seed) + 0.025 * Math.sin(an * 7 + seed * 2.1) + 0.015 * (hash(seed * 31 + i % n) - 0.5));
    const X = cx + rr_ * Math.cos(an), Y = cy + rr_ * Math.sin(an); i ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); }
  ctx.closePath(); ctx.fillStyle = col; ctx.fill(); ctx.restore();
};
/** a daub slamming in at t0: 1.5x -> 1 and -14 deg -> 0 over 0.22 s (outQuint) */
BG.daubAt = (t, t0, cx, cy, r, seed) => { if (t < t0) return; const k = bgE(t, t0, 0.22); withT(cx, cy, lerp(1.5, 1, k), lerp(-0.244, 0, k), () => BG.blot(0, 0, r, seed)); };

/* ---------- the card ----------
 * BG.drawCard(t, x, y, size, o): o.done(i) -> daub time of square i (0-based; -1 = already done, Infinity = not yet),
 * o.now (0-based index ringed, or -1), o.nowAt (ring lands), o.head (header text), o.labels false (mini card),
 * o.photo {i: image key}, o.key (edit prefix). Outer width = size, height = size * 1.15. */
BG.drawCard = (t, x, y, size, o = {}) => {
  const k = size / 830, hh = Math.round(size * 0.15), cell = size / 3, bw = Math.max(2, 6 * k), key = o.key || 'card';
  ctx.save(); rr(x, y, size, size + hh, 20 * k); ctx.fillStyle = BG.card; ctx.fill(); ctx.clip();
  rect(x, y, size, hh, BG.ink);
  const head = o.head || 'MY OFFLINE CARD';
  if (o.labels === false) _txt(head, x + size / 2, y + hh * 0.74, F.mono(hh * 0.42), BG.card, 'center', 'alphabetic', hh * 0.03);
  else BG.ml(key + '-head', head, x + size / 2, y + hh * 0.76, F.disp(hh * 0.66), BG.card, { align: 'center', ls: hh * 0.01 });
  for (let i = 0; i < 9; i++) {
    const cx = x + (i % 3) * cell, cy = y + hh + Math.floor(i / 3) * cell; const [n, l] = BG.ITEMS[i];
    if (o.photo && o.photo[i] && IMG[o.photo[i]]) BG.cover(o.photo[i], cx, cy, cell, cell);
    const dt = o.done ? o.done(i) : Infinity;
    if (o.now === i && t >= (o.nowAt == null ? -1e9 : o.nowAt)) withA(bgE(t, o.nowAt == null ? -1 : o.nowAt, 0.3), () => rect(cx, cy, cell, cell, BG.soft));
    if (dt !== Infinity) BG.daubAt(t, dt, cx + cell * 0.5, cy + cell * 0.36, cell * 0.26, i * 1.7 + 2);
    if (o.labels === false) _txt(n, cx + cell * 0.5, cy + cell * 0.74, F.disp(cell * 0.62), BG.ink, 'center');
    else { _txt(n, cx + cell * 0.09, cy + cell * 0.08 + cell * 0.42 * 0.8, F.disp(cell * 0.42), BG.ink, 'left');
      const ls = l.split('\n'); const fz = cell * 0.13; BG.ml(key + '-l' + n, l, cx + cell * 0.09, cy + cell * 0.92 - (ls.length - 1) * fz * 1.08, F.body(fz, 600), BG.ink, { lh: 1.08 }); }
  }
  ctx.fillStyle = 'rgba(22,22,22,0.35)'; const hl = Math.max(1, Math.min(2, 2 * k)); for (let j = 1; j < 3; j++) { ctx.fillRect(x + j * cell - hl / 2, y + hh, hl, size); ctx.fillRect(x, y + hh + j * cell - hl / 2, size, hl); }
  ctx.restore();
};
/** a photo cropped to cover the box (never stretched) */
BG.cover = (key, x, y, w, h, fx = 0.5, fy = 0.5) => {
  const im = IMG[key]; if (!im) { rect(x, y, w, h, '#DDD'); return; }
  const s = Math.max(w / im.width, h / im.height); const sw = w / s, sh = h / s;
  themeFixed(() => ctx.drawImage(im, clamp((im.width - sw) * fx, 0, im.width - sw), clamp((im.height - sh) * fy, 0, im.height - sh), sw, sh, x, y, w, h));
};
/** the counter's state: item n (1-9) gets daubed at BG.AT[n] (moment / film time). Items before the moment = done. */
BG.AT = {}; BG.doneFn = () => (i) => { const a = BG.AT[i + 1]; return a == null ? Infinity : a; };
BG.count = (t) => { let c = 0; for (let n = 1; n <= 9; n++) if (BG.AT[n] != null && t >= BG.AT[n]) c = n; return c; };

/* ======================= graphics: draw(t, r) ======================= */
/** the whole card in the panel, daubing item n at o.at (its square ringed); a mono "0n / 09" + the item name beside / under it */
BG.cardG = (o) => {
  const n = o.n; o.side = o.side == null ? undefined : o.side; if (o.daubAt != null) { BG.sfx('dab', o.daubAt, -2); }
  return (t, r) => { r = BG.rr(r); const g0 = g; rect(r.x, r.y, r.w, r.h, BG.butter);
    const vert = r.h > r.w * 1.05; const m = V(44, 40); const cap = vert ? V(150, 170) : 0; const side = !vert && o.side !== false && (r.w - (r.h - 2 * m) / 1.15 - 2 * m) > 300;
    const size = Math.min(side ? r.w * 0.52 : r.w - 2 * m, (r.h - 2 * m - cap) / 1.15);
    const x = side ? (o.flip ? r.x + m : r.x + r.w - m - size) : r.x + (r.w - size) / 2, y = r.y + (r.h - cap - size * 1.15) / 2;
    const push = o.push ? 1 + 0.03 * E.inOutCubic(prog(t, (o.at || 0) + 2.3, 6)) : 1;
    withT((x + size / 2) * (1 - push), (y + size * 0.575) * (1 - push), push, 0, () => grp('card', x, y, size, size * 1.15, () =>
      BG.drawCard(t, x, y, size, { done: (i) => (i + 1 < n ? -1 : i + 1 === n ? (o.daubAt == null ? -1 : o.daubAt) : Infinity), now: n - 1, nowAt: o.daubAt == null ? -1 : o.daubAt + 0.3, head: o.head, photo: o.photo })));
    const lab = n ? String(n).padStart(2, '0') + ' / 09' : '9 things'; const nm = n ? BG.ITEMS[n - 1][1].replace('\n', ' ') : 'I do instead of\ndoomscrolling';
    if (side) { const lx = o.flip ? r.x + m + size + V(60, 40) : r.x + m + V(20, 0), z = V(58, 52); const a = bgE(t, (o.daubAt || o.at || 0), 0.4);
      withA(a, () => { BG.mono('count', lab, lx, r.y + r.h * 0.42, z); BG.ml('item', (o.name || nm).toUpperCase(), lx, r.y + r.h * 0.42 + z * 2.6, F.disp(V(130, 110)), BG.ink, { lh: 0.86 }); }); }
    else if (vert) { const z = V(46, 46); withA(bgE(t, (o.daubAt || o.at || 0), 0.4), () => BG.mono('count', lab + '   ' + (o.name || nm), r.x + r.w / 2, y + size * 1.15 + z * 1.9, z, BG.ink, 'center')); }
    g = g0; };
};
/** the mini card (the corner counter): no labels, head "0n / 09" */
BG.mini = (t, x, y, size, alpha = 1) => { const c = BG.count(t); withA(alpha, () => grp('mini', x, y, size, size * 1.15, () =>
  BG.drawCard(t, x, y, size, { labels: false, done: BG.doneFn(), now: c ? c - 1 : -1, nowAt: c ? BG.AT[c] + 0.3 : 0, head: String(c).padStart(2, '0') + ' / 09', key: 'mini' }))); };

/** one square fills the panel: the number, the item name, a Pexels photo die-cut inside, the daub; o.line = her line beside */
BG.square = (o) => { if (o.daubAt != null) BG.sfx('dab', o.daubAt, -3); BG.sfx('paper', o.at + 0.05, -6);
  return (t, r) => { r = BG.rr(r); rect(r.x, r.y, r.w, r.h, BG.butter); const vert = r.h > r.w * 1.05; const m = V(48, 40);
    const s = Math.min(vert ? r.w - 2 * m : r.h - 2 * m, vert ? (r.h - 2 * m) * (o.line ? 0.62 : 1) : r.w * (o.line ? 0.55 : 0.9));
    const x = vert ? r.x + (r.w - s) / 2 : r.x + m + (o.line ? 0 : (r.w - 2 * m - s) / 2), y = vert ? r.y + m : r.y + (r.h - s) / 2;
    const p = bgE(t, o.at, 0.45);
    withA(clamp(p * 2), () => withT(0, (1 - p) * 60, 1, 0, () => grp('square', x, y, s, s, () => {
      ctx.save(); rr(x, y, s, s, 20 * s / 880); ctx.fillStyle = BG.card; ctx.fill(); ctx.restore();
      const pw = s * 0.86, ph = s * 0.62, px = x + (s - pw) / 2, py = y + s * 0.3; if (o.img) { BG.cover(o.img, px, py, pw, ph, o.fx, o.fy); }
      if (o.daubAt != null) BG.daubAt(t, o.daubAt, x + s * 0.16, y + s * 0.15, s * 0.16, o.n * 1.7 + 2);
      _txt(String(o.n).padStart(2, '0'), x + s * 0.07, y + s * 0.255, F.disp(s * 0.24), BG.ink);
      BG.ml('name', (o.name || BG.ITEMS[o.n - 1][1].replace('\n', ' ')).toUpperCase(), Math.max(x + s * 0.3, x + s * 0.07 + tw(String(o.n).padStart(2, '0'), F.disp(s * 0.24)) + s * 0.04), y + s * 0.235, F.disp(s * 0.13), BG.ink); })));
    if (o.img) BG.mono('credit', 'Photo: Pexels', vert ? x : x, vert ? y + s + V(40, 40) : Math.min(r.y + r.h - 16, y + s + 40), V(32, 32), BG.mute);
    if (o.line) { const lx = vert ? r.x + m : x + s + V(70, 0), ly = vert ? y + s + V(140, 130) : r.y + r.h * 0.38; const mw = vert ? r.w - 2 * m : r.x + r.w - lx - m;
      BG.text(t, 'line', o.line, lx, ly, V(84, 76), { f: (z) => F.body(z, 600), at: o.lineAt != null ? o.lineAt : o.at + 0.4, hits: o.hits, maxW: mw, lh: 1.08, ls: -0.015 }); } };
};
/** big words on the butter ground (or ink: o.ink): o.kicker (mono), o.lines ('\n', [block]), o.at, o.hits, o.small (+ smallAt) */
BG.word = (o) => (t, r) => { r = BG.rr(r); const inkG = !!o.ink; rect(r.x, r.y, r.w, r.h, inkG ? BG.ink : BG.butter); const m = V(80, 60);
  const nL = String(o.lines).split('\n').length; const kH = o.kicker ? V(100, 96) : 0, sH = o.small ? V(120, 130) : 0;
  // League Gothic: huge, the widest line fills the panel width (BG.text shrinks it to maxW), capped by the panel height
  const size = Math.min(V(420, 340), (r.h - 2 * m - kH - sH) / (nL * 0.9));
  { const e_ = EDIT.data.t[SCENE_ID + '/lines']; const str_ = (e_ && e_.s != null ? e_.s : String(o.lines)).toUpperCase().replace(/[\[\]]/g, ''); const wid = Math.max(...str_.split('\n').map(l => tw(l, F.disp(100)))) / 100;
    if (wid > 0) var sizeF = Math.min(size, (r.w - 2 * m) / wid); }
  const size_ = sizeF || size;
  const blockH = kH + nL * size_ * 0.88 + sH; const top = r.y + Math.max(m, (r.h - blockH) / 2 - V(10, 0));   // the block sits in the middle of the panel
  if (o.kicker) BG.mono('kicker', o.kicker, r.x + m, top + 34, V(40, 40), inkG ? BG.butter : BG.ink);
  const yy = top + kH + size_ * 0.84;
  const tt = BG.text(t, 'lines', o.lines, r.x + m, yy, size_, { at: o.at, hits: o.hits, maxW: r.w - 2 * m, col: inkG ? BG.card : BG.ink, knock: inkG ? BG.ink : BG.butter, blockCol: inkG ? BG.butter : BG.ink });
  if (o.small) withA(bgE(t, o.smallAt || o.at + 0.6, 0.4), () => BG.ml('small', o.small, r.x + m, yy + tt.h + V(40, 50), F.body(V(54, 50), 700), inkG ? '#D9D2BE' : BG.ink));
  if (o.at != null && !o.silent) BG.sfx('typeHit', o.at + 0.02, -8);
};
/** a photo print with an ink border on the butter ground, a mono caption, a small Pexels credit; slow push */
BG.photo = (o) => { BG.sfx('shutter', o.at, -6);
  return (t, r) => { r = BG.rr(r); rect(r.x, r.y, r.w, r.h, BG.butter); const m = V(56, 44); const capH = o.cap && !PORTRAIT ? 90 : 0;   // 9:16: her captions carry the words, the photo gets the room
    const w = r.w - 2 * m, h = r.h - 2 * m - capH - V(30, 40); const p = bgE(t, o.at, 0.42); const py0 = r.y + m + capH; const s = 1 + 0.035 * E.inOutCubic(prog(t, o.at, 7));
    withA(clamp(p * 2), () => withT(0, (1 - p) * 70, 1, (1 - p) * 0.03, () => grp('photo', r.x + m, py0, w, h, () => {
      ctx.save(); ctx.beginPath(); ctx.rect(r.x + m, py0, w, h); ctx.clip(); withT((r.x + m + w / 2) * (1 - s), (py0 + h / 2) * (1 - s), s, 0, () => BG.cover(o.key, r.x + m, py0, w, h, o.fx, o.fy)); ctx.restore();
      }, { img: true })));
    if (o.cap && capH) withA(bgE(t, o.at + 0.25, 0.4), () => BG.ml('cap', o.cap.toUpperCase(), r.x + m, r.y + m + capH * 0.8, F.disp(V(76, 76)), BG.ink));
    withA(clamp(p * 2), () => { const z = V(32, 32), cw = tw('PHOTO: PEXELS', F.mono(z), z * 0.12) + z; rect(r.x + m + w - cw - 6, py0 + 6, cw, z * 1.6, BG.ink); BG.mono('credit', 'Photo: Pexels', r.x + m + w - 6 - z / 2, py0 + 6 + z * 1.12, z, BG.card, 'right'); }); };
};
/** a real page clipping: the NPR headline (credited), its "infinite scroll" swept with an ink block */
BG.src = (o) => { BG.sfx('paper', o.at, -5); if (o.markAt) BG.sfx('marker', o.markAt, -5);
  return (t, r) => { r = BG.rr(r); rect(r.x, r.y, r.w, r.h, BG.butter); const im = IMG[o.key]; if (!im) return; const m = V(60, 44);
    const w = r.w - 2 * m, k = w / im.width, h = Math.min(im.height * k, r.h - 2 * m - 70); const p = bgE(t, o.at, 0.45);
    withA(clamp(p * 2), () => withT(0, (1 - p) * 60, 1, 0, () => grp('clip', r.x + m, r.y + m, w, h, () => {
      ctx.save(); ctx.beginPath(); ctx.rect(r.x + m, r.y + m, w, h); ctx.clip(); themeFixed(() => ctx.drawImage(im, r.x + m, r.y + m, w, im.height * k)); ctx.restore();
      if (o.mark && o.markAt != null) { const q = bgE(t, o.markAt, 0.4, 'outExpo'); const [mx, my, mw, mh] = o.mark; if (q > 0) { ctx.save(); ctx.globalCompositeOperation = 'multiply'; rect(r.x + m + mx * k, r.y + m + my * k, mw * k * q, mh * k, BG.butter); ctx.restore(); } }
      }, { img: true })));
    const cr = o.credit || 'NPR / The Indicator, 7 April 2026'; const z = V(32, 32); const cw = tw(cr.toUpperCase(), F.mono(z), z * 0.12) + z * 1.2;
    rect(r.x + m, r.y + m + h + 18, cw, z * 1.7, BG.ink); BG.mono('credit', cr, r.x + m + z * 0.6, r.y + m + h + 18 + z * 1.18, z, BG.card); };
};
/** stopping cues: three panels side by side (16:9) / stacked (9:16): a book (THE END of a chapter), an episode (ENDS), a feed
 *  that never ends (posts keep coming). o.at, o.bookAt, o.epAt, o.feedAt, o.noAt ("no end" lands on the feed). */
BG.cues = (o) => { BG.sfx('pop', o.bookAt, -6); BG.sfx('pop', o.epAt, -6); BG.sfx('tick', o.feedAt, -6); if (o.noAt) BG.sfx('dab', o.noAt, -3);
  return (t, r) => { r = BG.rr(r); rect(r.x, r.y, r.w, r.h, BG.butter); const vert = r.h > r.w; const m = V(56, 44), gap = V(36, 30);
    const n = 3; const pw = vert ? r.w - 2 * m : (r.w - 2 * m - 2 * gap) / n, ph = vert ? (r.h - 2 * m - 2 * gap) / n : r.h - 2 * m - V(90, 0);
    const P_ = (i) => [vert ? r.x + m : r.x + m + i * (pw + gap), vert ? r.y + m + i * (ph + gap) : r.y + m];
    const at = [o.bookAt, o.epAt, o.feedAt]; const labs = ['End of a chapter', 'End of an episode', 'Your feed'];
    for (let i = 0; i < 3; i++) { const p = bgE(t, at[i], 0.42); if (p <= 0) continue; const [x, y] = P_(i);
      withA(clamp(p * 2), () => withT(0, (1 - p) * 50, 1, 0, () => grp('cue' + i, x, y, pw, ph, () => {
        ctx.save(); rr(x, y, pw, ph, 14); ctx.fillStyle = i === 2 ? BG.ink : BG.card; ctx.fill(); ctx.clip();
        const cx = x + pw / 2, cy = y + ph * 0.44, u = Math.min(pw, ph);
        if (i === 0) { // an open book, a centred "THE END"
          ctx.fillStyle = '#EFE8D3'; ctx.fillRect(cx - u * 0.36, cy - u * 0.22, u * 0.72, u * 0.44); ctx.fillStyle = BG.ink; ctx.fillRect(cx - 2, cy - u * 0.22, 4, u * 0.44);
          for (let j = 0; j < 4; j++) { rect(cx - u * 0.31, cy - u * 0.14 + j * u * 0.06, u * 0.24, 4, 'rgba(22,22,22,0.35)'); }
          _txt('THE END', cx + u * 0.18, cy + u * 0.04, F.disp(u * 0.1), BG.ink, 'center'); }
        else if (i === 1) { // a screen, a progress bar that reaches the end
          ctx.fillStyle = BG.ink; ctx.fillRect(cx - u * 0.38, cy - u * 0.24, u * 0.76, u * 0.44); const q = clamp((t - at[1]) / 1.2);
          rect(cx - u * 0.32, cy + u * 0.1, u * 0.64, 6, '#555'); rect(cx - u * 0.32, cy + u * 0.1, u * 0.64 * (0.7 + 0.3 * q), 6, BG.daub);
          _txt(q >= 1 ? 'EPISODE ENDS' : 'EPISODE 4', cx, cy - u * 0.03, F.mono(u * 0.05), BG.card, 'center'); }
        else { // the feed: generic posts scroll up for ever
          const sc = Math.max(0, t - at[2]) * u * 0.5; const ph_ = u * 0.3; for (let j = -1; j < 8; j++) { const yy = y + u * 0.08 + j * (ph_ + 16) - (sc % (ph_ + 16));
            rect(x + u * 0.1, yy, pw - u * 0.2, ph_, '#2E2E2E'); rect(x + u * 0.14, yy + 14, u * 0.12, u * 0.12, '#4A4A4A'); rect(x + u * 0.3, yy + 22, pw * 0.4, 10, '#4A4A4A'); rect(x + u * 0.3, yy + 44, pw * 0.25, 10, '#3C3C3C'); }
          if (o.noAt && t >= o.noAt) { const q = bgE(t, o.noAt, 0.3); withT(cx, cy, lerp(1.4, 1, q), lerp(-0.2, -0.06, q), () => { rect(-u * 0.3, -u * 0.08, u * 0.6, u * 0.16, BG.daub); _txt('NO END', 0, u * 0.055, F.disp(u * 0.14), BG.ink, 'center'); }); } }
        ctx.restore(); })));
      if (o.noLabs) continue; if (!vert) BG.mono('lab' + i, labs[i], x, y + ph + 56, 34, BG.ink); else BG.mono('lab' + i, labs[i], x + 24, y + ph - 24, 30, i === 2 ? BG.card : BG.ink); } };
};
/** a list of things she names, each a card chip landing on her word: o.items [{s, at, img?}], o.title (mono) */
BG.list = (o) => { o.items.forEach((it) => BG.sfx('pop', it.at, -7));
  return (t, r) => { r = BG.rr(r); rect(r.x, r.y, r.w, r.h, BG.butter); const m = V(64, 48); const n = o.items.length; const cols = o.cols || (r.w > r.h * 1.3 && n > 3 ? 2 : 1); const rows = Math.ceil(n / cols); const gap = V(24, 22);
    const tH = o.title ? V(90, 90) : 0; const ch = Math.min(V(160, 160), (r.h - 2 * m - tH - (rows - 1) * gap) / rows); let y = r.y + Math.max(m, (r.h - tH - rows * ch - (rows - 1) * gap) / 2);
    if (o.title) { BG.mono('title', o.title, r.x + m, y + 34, V(40, 40)); y += tH; }
    const cw = (r.w - 2 * m - (cols - 1) * gap) / cols;
    o.items.forEach((it, i) => { const p = bgE(t, it.at, 0.36); if (p <= 0) return; const x = r.x + m + (i % cols) * (cw + gap), yy = y + Math.floor(i / cols) * (ch + gap);
      withA(clamp(p * 2), () => withT(0, (1 - p) * 40, 1, 0, () => grp('it' + i, x, yy, cw, ch, () => {
        rect(x, yy + ch - 1, cw, 2, 'rgba(22,22,22,0.35)');   // bare lines with a hairline rule (no boxes); the last / key item in orange-free ink, the rest in ink
        let tx = x; if (it.img) { BG.cover(it.img, x + 10, yy + 10, ch - 20, ch - 20); tx = x + ch + 10; }
        BG.ml('it' + i, it.s.toUpperCase(), x, yy + ch * 0.8, F.disp(Math.min(ch * 0.8, V(120, 110))), it.ink ? BG.ink : BG.mute);
        if (it.strike && t >= it.strike) { const q = bgE(t, it.strike, 0.3); rect(tx - 6, yy + ch * 0.48, (cw - (tx - x) - 20) * q, 8, BG.daub); } }))); }); };
};
/** an effort meter: EASY ... DEMANDING, the marker slides to o.to (0..1) at o.moveAt; labels editable */
BG.meter = (o) => { BG.sfx('tick', o.moveAt, -5);
  return (t, r) => { r = BG.rr(r); rect(r.x, r.y, r.w, r.h, BG.butter); const m = V(90, 60); const y = r.y + r.h * 0.52; const x0 = r.x + m, x1 = r.x + r.w - m;
    if (o.title) BG.text(t, 'title', o.title, x0, r.y + r.h * 0.3, V(150, 130), { at: o.at, hits: o.hits, maxW: x1 - x0 });
    rect(x0, y - 8, x1 - x0, 16, BG.ink); for (let i = 0; i <= 4; i++) rect(x0 + (x1 - x0) * i / 4 - 3, y - 26, 6, 52, BG.ink);
    BG.mono('a', o.a || 'Easy', x0, y + 90, V(40, 38)); BG.mono('b', o.b || 'Too demanding', x1, y + 90, V(40, 38), BG.ink, 'right');
    const q = bgE(t, o.moveAt, 0.7, 'inOutQuart'); const px = lerp(x0 + (x1 - x0) * (o.from || 0.05), x0 + (x1 - x0) * o.to, q);
    BG.blot(px, y, V(46, 40), 7); if (o.mark && t >= o.markAt) { const k = bgE(t, o.markAt, 0.3); withA(k, () => BG.ml('mark', o.mark.toUpperCase(), px, y - 80, F.disp(V(70, 64)), BG.ink, { align: 'center' })); } };
};
/** a phone call screen (generic): a name, a timer (from o.at), the hang-up button; o.names cycle on her words */
BG.call = (o) => { BG.sfx('pop', o.at, -6);
  return (t, r) => { r = BG.rr(r); rect(r.x, r.y, r.w, r.h, BG.butter); const ph = Math.min(r.h - V(100, 80), r.w * 0.9 / 0.5), pw = ph * 0.5; const x = r.x + (r.w - pw) / 2, y = r.y + (r.h - ph) / 2;
    const p = bgE(t, o.at, 0.45); withA(clamp(p * 2), () => withT(0, (1 - p) * 60, 1, 0, () => grp('phone', x, y, pw, ph, () => {
      ctx.save(); rr(x, y, pw, ph, pw * 0.12); ctx.fillStyle = BG.ink; ctx.fill(); ctx.restore();
      let nm = o.names[0][0]; for (const [s, a] of o.names) if (t >= a) nm = s;
      const ni = o.names.findIndex(q => q[0] === nm); const na = o.names[ni][1]; const k = bgE(t, na, 0.25);
      withA(k, () => _txt(nm.toUpperCase(), x + pw / 2, y + ph * 0.32 + (1 - k) * 20, F.disp(Math.min(pw * 0.24, pw * 0.24 * pw * 0.84 / Math.max(1, tw(nm.toUpperCase(), F.disp(pw * 0.24))))), BG.card, 'center'));
      const s = Math.max(0, Math.floor(t - o.at)); _txt(`${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`, x + pw / 2, y + ph * 0.38, F.mono(Math.max(32, pw * 0.07)), '#BDB6A2', 'center');
      circle(x + pw / 2, y + ph * 0.8, pw * 0.11, BG.daub); BG.ml('callLab', 'Calling', x + pw / 2, y + ph * 0.19, F.mono(Math.max(32, pw * 0.07)), '#BDB6A2', { align: 'center' }); }))); };
};
