/* cheapest-countries: the look's kit, shared by the motion film (film.json scripts) and the talking-head edit, shorts and
 * teaser (talking-head.json "common"). Her pick 2026-11-02: A · PRICE CHECK. Every country is a supermarket shelf label.
 * Grounds: shelf grey #E4E6E3 (main), black #111214 (phrase cards), label yellow #FFD60A (one full-bleed punchline).
 * Colours: label yellow #FFD60A, ink #121212, shelf rail #2A2B2E, sticker red #E4002B = ONLY "this costs more than it looks".
 * Type: Sofia Sans Extra Condensed 900 (prices, captions), Sofia Sans 800/900 (words), Martian Mono 500 (small lines, >= 32 px).
 * Motion: a label rises from behind the rail in 0.55 s (outQuint), the price settles 1.18 -> 1 in 0.45 s, the asterisk pops
 * 1.6 -> 1 in 0.25 s, a sticker slaps on 1.38 -> 1 in 0.24 s at -2 deg, a slow 3 % push under each screen.
 * Every helper returns draw(t, r) (r = the rect it fills), a pure function of time; every text is txt() (editable), every block
 * grp() (movable, resizable). PC_CLIPS (real page crops) comes from talking-head/assets/src/clips.js. */
'use strict';
(function pcFonts() {   // type set 01 Swiss poster (TYPE-SYSTEM.md, 2026-11-07): Archivo 900 condensed caps, Inter Tight, DM Mono
  const base = '/library/fonts/';
  const load = (fam, file, desc) => { try { const x = new XMLHttpRequest(); x.open('GET', base + file, false); x.overrideMimeType('text/plain; charset=x-user-defined'); x.send();
    if (x.status !== 200) return; const s = x.responseText, u = new Uint8Array(s.length); for (let i = 0; i < s.length; i++) u[i] = s.charCodeAt(i) & 255;
    const ff = new FontFace(fam, u.buffer, desc); document.fonts.add(ff); ff.load(); } catch (e) { /* the fallback face draws */ } };
  load('PCL', 'LeagueGothicRegular.ttf', { weight: '400' });
  for (const [f, w] of [['InterTightRegular.ttf', '400'], ['InterTightMedium.ttf', '500'], ['InterTightSemiBold.ttf', '600'], ['InterTightBold.ttf', '700'], ['InterTightExtraBold.ttf', '800'], ['InterTightBlack.ttf', '900']]) load('PCI', f, { weight: w });
  load('PCM', 'DMMono-Medium.ttf', { weight: '500' });
})();
/* 2026-11-07 (her second note): set 06 Ultra condensed (League Gothic caps + Inter Tight + DM Mono) and her house palette: warm paper
 * #EDE9E2 / off-black #111114 grounds, ONE accent safety orange #FF4713 only for "costs more". No label shapes: plain type on the ground. */
const PC = { wall: '#EDE9E2', wall2: '#E2DDD3', rail: '#111114', railTop: '#111114', lab: '#EDE9E2', ink: '#111114', red: '#FF4713', white: '#FFFFFF', mid: '#6B675F', black: '#111114', soft: '#A39E94' };
const FX = (s, w = 400) => `400 ${s}px PCL`, FS = (s, w = 700) => `${Math.min(900, w)} ${s}px PCI`, FM = (s, w = 500) => `500 ${s}px PCM`;
G.pcWall = { bg: PC.wall, fg: PC.ink, mid: PC.mid, line: 'rgba(18,18,18,0.18)', acc: PC.red, card: PC.white, panel: PC.wall2, grid: 'rgba(0,0,0,0)', mode: 'light' };
G.pcBlack = { bg: PC.black, fg: PC.white, mid: PC.soft, line: 'rgba(255,255,255,0.16)', acc: PC.lab, card: PC.white, panel: '#1E1F22', grid: 'rgba(0,0,0,0)', mode: 'dark' };
G.pcYellow = { bg: PC.lab, fg: PC.ink, mid: '#5A4D00', line: 'rgba(18,18,18,0.2)', acc: PC.red, card: PC.white, panel: '#F2CB00', grid: 'rgba(0,0,0,0)' };
F.disp = (s) => FX(s); F.body = (s, w = 500) => FS(s, Math.max(400, Math.min(700, w))); F.mono = (s) => FM(s); F.serif = (s) => FX(s);
LS.disp = 0; LS.mono = 0.01; LS.serif = 0;
if (typeof PLATE !== 'undefined') { PLATE.pc = [PC.lab, PC.ink, PC.red]; PLATE.pcInk = [PC.ink, PC.white, PC.lab]; }
const pcE = (t, t0, d, e = 'outQuint') => MOTION.ease(t, t0, d, e);
PC.T0 = null; PC.lead = (at) => (PC.T0 != null && at != null && at < 1e8 ? Math.min(at, PC.T0 + 0.35) : at);
PC.short = () => typeof FOOT !== 'undefined' && !!(FOOT.m && FOOT.m.kind === 'short');
/** the time she starts a word (or words) inside a phrase (first match), else the phrase start */
function WT(ph, word) {
  const want = String(word).split(/\s+/).map(norm).filter(Boolean);
  const ws = WORDS.slice(ph.i, ph.i + ph.w.length);
  for (let k = 0; k <= ws.length - want.length; k++) if (want.every((x, j) => ws[k + j].n === x)) return ph.w[k];
  return ph.t;
}
/** shorts: a graphic that reaches the top of the 9:16 frame starts below her top title (the band above stays the wall) */
PC.rr = (r) => {
  if (!PORTRAIT || !PC.short() || typeof TH === 'undefined') return r; const lb = TH.labelBottom(); if (!(lb > 0)) return r;
  const m = ctx.getTransform(), sy = m.d / BASE[3], y0 = (m.d * r.y + m.f - BASE[5]) / BASE[3];
  if (y0 >= lb + 20) return r; const d = (lb + 24 - y0) / (sy || 1);
  rect(r.x, r.y, r.w, r.h, PC.wall); return { x: r.x, y: r.y + d, w: r.w, h: r.h - d };
};

/* ---------- small parts ---------- */
const PC_FLAGS = {
  DE: [['h', '#000000', '#DD0000', '#FFCE00']], FR: [['v', '#0055A4', '#FFFFFF', '#EF4135']], IT: [['v', '#009246', '#FFFFFF', '#CE2B37']],
  AT: [['h', '#C8102E', '#FFFFFF', '#C8102E']], EE: [['h', '#0072CE', '#000000', '#FFFFFF']], PL: [['h', '#FFFFFF', '#DC143C']],
  CZ: [['h', '#FFFFFF', '#D7141A'], ['tri', '#11457E']], NO: [['cross', '#BA0C2F', '#FFFFFF', '#00205B']], FI: [['cross', '#FFFFFF', '#002F6C']],
  NG: [['v', '#008751', '#FFFFFF', '#008751']],
};
PC.flag = (c, x, y, w) => { const h = w * 2 / 3; const f = PC_FLAGS[c]; if (!f) return;
  themeFixed(() => { for (const p of f) {
    if (p[0] === 'h') { const n = p.length - 1; for (let i = 0; i < n; i++) rect(x, y + h * i / n, w, h / n + 0.5, p[i + 1]); }
    else if (p[0] === 'v') { const n = p.length - 1; for (let i = 0; i < n; i++) rect(x + w * i / n, y, w / n + 0.5, h, p[i + 1]); }
    else if (p[0] === 'tri') { ctx.fillStyle = p[1]; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x + w / 2, y + h / 2); ctx.lineTo(x, y + h); ctx.fill(); }
    else if (p[0] === 'cross') { rect(x, y, w, h, p[1]); const cx = x + w * 0.36, cy = y + h / 2; rect(cx - w * 0.1, y, w * 0.2, h, p[2]); rect(x, cy - h * 0.15, w, h * 0.3, p[2]);
      if (p[3]) { rect(cx - w * 0.05, y, w * 0.1, h, p[3]); rect(x, cy - h * 0.075, w, h * 0.15, p[3]); } } }
  });
};
/** a barcode: bars from the seed (deterministic) */
PC.barcode = (seed, x, y, w, h, col = PC.ink) => { let s = 0; for (const ch of seed) s = (s * 31 + ch.charCodeAt(0)) >>> 0; let xx = 0;
  while (xx < w) { s = (s * 1103515245 + 12345) >>> 0; const bw = Math.max(1.5, w / 200 * (1 + (s >>> 16) % 4)); s = (s * 1103515245 + 12345) >>> 0; const gap = w / 200 * (1 + (s >>> 16) % 3); if (xx + bw <= w) rect(x + xx, y, bw, h, col); xx += bw + gap; } };
/** the shelf rail: a dark band across r at y (h tall) with a lighter lip */
PC.rail = () => {};   // 2026-11-07: no shelf hairline (it crossed the bigger numbers)
/** a red (or ink) sticker that slaps on at `at`: 1.38 -> 1 in 0.24 s, slightly rotated; lines of Sofia Sans 900; editable */
PC.sticker = (t, at, lines, x, y, size, o = {}) => {
  if (t < at) return; const p = clamp((t - at) / 0.24); const sc = lerp(1.38, 1, E.outQuint(p)); const key = o.key || 'sticker-' + lines.join(' ');
  const ov = ovr(key); const str = ov.s != null ? ov.s : lines.join('\n'); const L = str.split('\n'); const f = FS(size, 800);
  const padX = 0, padY = size * 0.2, lh = size * 1.08; const bw = Math.max(...L.map(l => tw(l, f))) + padX * 2, bh = L.length * lh + padY * 2 - size * 0.08;
  const bx = o.align === 'right' ? x - bw : o.align === 'center' ? x - bw / 2 : x;
  if (ov.hide) { regBox(ov, bx, y, bw, bh, { text: str, def: lines.join('\n') }); return; }
  moved(ov, () => { ctx.save(); ctx.translate(bx + bw / 2, y + bh / 2); ctx.rotate(0); ctx.scale(sc, sc); ctx.globalAlpha *= Math.min(1, p * 3);
    L.forEach((l, i) => _txt(l, -bw / 2 + padX, -bh / 2 + padY + size * 0.8 + i * lh, f, o.ink || PC.red, 'left', 'alphabetic', 0));
    if (o.ul != null) { const u = pcE(t, o.ul, 0.4, 'inOutQuart'); if (u > 0) rect(-bw / 2 + padX, bh / 2 - padY * 0.5, (bw - padX * 2) * u, 2, PC.red); }
    ctx.restore(); regBox(ov, bx, y, bw, bh, { text: str, def: lines.join('\n') }); });
  return { w: bw, h: bh };
};

/** ONE SHELF LABEL drawn at x, y, w (h = w * o.ratio). o: name, flag, kicker ('TUITION'), price, priceAt, ast (time of the red *),
 *  line (mono small line), lineAt, red (red label = costs more), was: {s, at} (WAS €615, struck through), bar (barcode),
 *  key (edit key prefix), at (rises at), rise (px), size (price px; default from h) */
PC.CTRY = /^(germany|france|italy|austria|czech republic|poland|estonia|norway|finland|paris)\b/i;
/* 2026-11-07 (coordinator): ONE small label per tag (its name unless that is the country, which the flag already says, + kicker + line,
 * joined), the big number fills the rest. With o.was the old price is the big number until o.priceAt, then "WAS €x" struck + the new price. */
PC.tag = (t, o, x, y, w) => {
  const h = w * (o.ratio || 0.6); const at = o.at || 0; const k = pcE(t, at, 0.55); const key = o.key || o.name || 'label';
  const dy = (1 - k) * (o.rise == null ? h * 0.9 : o.rise); if (t < at - 0.01) return h;
  const red = o.redAt != null ? t >= o.redAt : !!o.red; const base = o.dark ? PC.wall : PC.ink; const fg = red ? PC.red : base;
  grp('label-' + key, x, y, w, h, () => { ctx.save(); ctx.translate(0, dy); if (k < 1) ctx.globalAlpha *= Math.min(1, k * 2.5);
    const sh = h * 0.19, px = w * 0.045;
    const parts = []; if (o.name && !PC.CTRY.test(o.name)) parts.push(o.name); if (o.kicker) parts.push(o.kicker); if (o.line) parts.push(o.line);
    const lab = parts.join(' · ').toUpperCase(); const fw = o.flag ? sh * 1.2 : 0;
    if (lab) { let nz = Math.max(36, Math.round(sh * 0.42)); const room = w - 2 * px - fw; while (nz > 28 && tw(lab, FM(nz), 1.5) > room) nz -= 2;
      withA(pcE(t, Math.min(o.lineAt == null ? at : o.lineAt, at + 0.3), 0.35), () => txt(lab, x + px, y + sh * 0.72, FM(nz), base, 'left', 'alphabetic', 1.5, key + '-name')); }
    if (o.flag) PC.flag(o.flag, lab ? x + w - px - sh * 0.95 : x + px, y + sh * 0.2, sh * 0.95);
    let yy = y + sh;
    const pw0 = o.priceAt == null ? at + 0.1 : o.priceAt; const swapped = !o.was || t >= pw0;
    if (o.was && swapped) { const wz = Math.max(60, Math.round(h * 0.1)); const f = FX(wz); const ly = yy + Math.max(h * 0.15, wz * 1.05);
      txt('WAS ' + o.was.s, x + px, ly, f, base, 'left', 'alphabetic', 0, key + '-was');
      const sw = tw('WAS ' + o.was.s, f); const st = pcE(t, Math.max(pw0, o.was.strike == null ? pw0 : o.was.strike), 0.3); if (st > 0) rect(x + px + tw('WAS ', f), ly - wz * 0.33, (sw - tw('WAS ', f)) * st, Math.max(5, h * 0.018), PC.red);
      yy += Math.max(h * 0.12, wz * 1.1); }
    const big = o.was && !swapped ? o.was.s : o.price;
    if (big != null) { const pa = o.was ? (swapped ? pw0 : at) : (o.reveal ? pw0 : Math.min(pw0, at + 0.2)); const pk = pcE(t, pa, 0.45);
      const pulse = !o.was && pw0 > pa + 0.3 ? Math.sin(Math.PI * clamp((t - pw0) / 0.35)) * 0.08 : 0;
      let z = o.size || h * (o.was && swapped ? 0.5 : 0.66); { const pw = tw(big, FX(Math.round(z))); if (pw > w * 0.92) z *= w * 0.92 / pw; }
      { const avail = (y + h - h * 0.04) - (yy + h * 0.05); if (z * 0.84 > avail) z = Math.max(24, avail / 0.84); }
      if (t >= pa) { const f = FX(Math.round(z)); const bx = x + px * 0.8, by = yy + z * 0.84 + h * 0.05; const col = o.was && !swapped ? base : fg;
        ctx.save(); ctx.translate(bx, by); ctx.scale(lerp(1.04, 1, pk) + pulse * 0.5, lerp(1.04, 1, pk) + pulse * 0.5); ctx.globalAlpha *= Math.min(1, pk * 3);
        txt(big, 0, 0, f, col, 'left', 'alphabetic', 0, key + (o.was && !swapped ? '-wasbig' : '-price'));
        if (o.ast != null && t >= o.ast) { const ow = ovr(key + '-price'); const pw = tw(ow.s != null ? ow.s : big, f); const ak = clamp((t - o.ast) / 0.25);
          ctx.save(); ctx.translate(pw + z * 0.05, -z * 0.55); ctx.scale(lerp(1.6, 1, E.outQuint(ak)), lerp(1.6, 1, E.outQuint(ak))); _txt('*', 0, z * 0.32, FS(Math.round(z * 0.75), 900), PC.red, 'left', 'alphabetic'); ctx.restore(); }
        ctx.restore(); } }
    ctx.restore(); });
  return h;
};

/* ---------- screens (draw(t, r)) ---------- */
/** one big label on the shelf. o = PC.tag options + side ('left'|'center'), stk: {lines, at, ul} (red sticker under it),
 *  clip: {name, at, hl, title} (a real page card beside it), push: {at, k} (zoom onto the sticker) */
PC.label = (o) => (t, r) => { r = PC.rr(r); rect(r.x, r.y, r.w, r.h, PC.wall);
  const port = r.h > r.w * 1.05 || PORTRAIT && r.w < 1200; const m = V(80, 60);
  const capRoom = o.capRoom || 0; const below = !!o.clip && (port || r.w < 1500); const wide = !port && !below && r.w > 1300 && o.clip;
  const small = !port && r.w < 1100;   // a window (L15 / L19): the label fills it
  const w = small ? Math.min(r.w - m, (r.h - m * 0.8 - capRoom) / (o.ratio || 0.6)) : Math.min(port ? r.w - m * 2 : below ? Math.min(r.w * 0.62, (r.h * 0.6 - capRoom) / (o.ratio || 0.6)) : (wide ? r.w * 0.5 : r.w * 0.62), o.w || 1000); const h = w * (o.ratio || 0.6);
  const stH = o.stk ? w * 0.16 : 0; const blockH = h + stH;
  const x = port || below || small || o.side === 'center' ? r.x + (r.w - w) / 2 : r.x + m; const y = port || below ? r.y + Math.max(m * 0.6, (r.h - blockH - capRoom - (o.clip ? r.h * 0.3 : 0)) * 0.42) : r.y + Math.max(m * 0.6, (r.h - blockH - capRoom) / 2);
  let z = 1, fx = x + w / 2, fy = y + h; if (o.push) { const zp = pcE(t, o.push.at, 0.7, 'inOutQuart'); z = 1 + (o.push.k || 0.15) * zp; }
  ctx.save(); if (z !== 1) { ctx.translate(fx, fy); ctx.scale(z, z); ctx.translate(-fx, -fy); }
  PC.rail(r, y + h * 0.32, h * 0.5);
  PC.tag(t, { ...o, bar: o.bar !== false }, x, y, w);
  if (o.stk) { const one = o.stk.lines.length === 1; const sz = Math.round(w * (o.stk.size || 0.052));
    PC.sticker(t, o.stk.at, o.stk.lines, one ? x + w + sz * 0.4 : (port || below ? x + w * 0.5 : x + w * 0.04), one ? (y - sz * 1.9 < r.y + 30 ? y + h * 0.24 : y - sz * 1.9) : (port || below ? y + h * 0.4 : y + h - sz * 0.15), sz, { key: (o.key || o.name) + '-stk', ul: o.stk.ul, bg: o.stk.bg, fg: o.stk.fg, align: one ? 'right' : 'left', rot: one ? 4 : -2 }); }
  ctx.restore();
  if (o.clip && (below || port) && r.y + r.h - (y + blockH + V(40, 60)) - capRoom < 260) o = { ...o, clip: null };
  if (o.clip) { const cr = port || below ? { x: r.x + m, y: y + blockH + V(40, 60), w: r.w - 2 * m, h: r.y + r.h - (y + blockH + V(40, 60)) - capRoom } : { x: x + w + m * 0.6, y: r.y + m, w: r.x + r.w - (x + w + m * 0.6) - m * 0.6, h: r.h - 2 * m - capRoom };
    PC.card(t, o.clip.name, cr, { at: o.clip.at, hl: o.clip.hl, title: o.clip.title, rot: 1.2 }); }
};
/** two labels side by side (a choice: under 24 / 24 and over, Czech / Poland, tuition / proof of funds); o.a, o.b = tag options;
 *  o.title (mono line above), o.photo (a Pexels key across the top), o.vs ('OR' | '+' | '=') */
PC.pair = (o) => (t, r) => { r = PC.rr(r); rect(r.x, r.y, r.w, r.h, PC.wall); const port = r.h > r.w * 1.05; const m = V(80, 56); const capRoom = o.capRoom || 0;
  let top = r.y + m * V(0.7, 1.4);
  if (o.photo) { const ph = port ? r.h * 0.26 : r.h * 0.4; PC.photoBand(t, o.photo, { x: r.x, y: r.y, w: r.w, h: ph }, { at: o.photoAt, credit: o.credit }); top = r.y + ph + m * 0.4; }
  if (o.title) { withA(pcE(t, o.titleAt == null ? (o.a.at || 0) : o.titleAt, 0.35), () => { let tz = V(40, 38); while (tz > 26 && tw(o.title, FM(tz, 600)) > r.w - 2 * m) tz -= 2; txt(o.title, r.x + m, top + V(44, 44), FM(tz, 600), PC.ink, 'left', 'alphabetic', 0, 'pair-title'); }); top += V(80, 80); }
  const avail = r.y + r.h - top - capRoom - m * 0.5;
  if (port) { const w = Math.min(r.w - 2 * m, avail / 2 / 0.6 - 30); const h = w * 0.6; const x = r.x + (r.w - w) / 2; const gap = Math.max(30, (avail - 2 * h) / 3);
    PC.rail(r, top + gap + h * 0.3, h * 0.45); PC.rail(r, top + gap * 2 + h * 1.3, h * 0.45);
    PC.tag(t, { ...o.a, key: o.a.key || 'a' }, x, top + gap, w); PC.tag(t, { ...o.b, key: o.b.key || 'b' }, x, top + gap * 2 + h, w); }
  else { const w = Math.min((r.w - 3 * m) / 2, avail / 0.62); const h = w * 0.6; const y = top + Math.max(0, (avail - h) / 2); const g2 = r.w - 2 * w;
    PC.rail(r, y + h * 0.32, h * 0.5);
    PC.tag(t, { ...o.a, key: o.a.key || 'a' }, r.x + g2 / 3, y, w); PC.tag(t, { ...o.b, key: o.b.key || 'b' }, r.x + g2 / 3 * 2 + w, y, w);
    if (o.vs) withA(pcE(t, o.vsAt == null ? (o.b.at || 0) : o.vsAt, 0.3), () => txt(o.vs, r.x + r.w / 2, y + h * 0.62, FX(Math.round(g2 / 3 * 0.9)), PC.ink, 'center', 'alphabetic', 0, 'pair-vs')); }
};
/** THE SHELF: several small labels, one at a time (6-8 frames apart from o.at, or each item.at). items [{name, flag, price, line, red, at}];
 *  o.title (mono line above), o.foot (mono line below), o.first: the first label 1.15x bigger, o.cols */
PC.shelf = (o) => (t, r) => { r = PC.rr(r); rect(r.x, r.y, r.w, r.h, PC.wall); const port = r.h > r.w * 1.05; const m = V(70, 50); const capRoom = o.capRoom || 0;
  const n = o.items.length; const cols = o.cols || (port ? 2 : Math.min(3, n)); const rows = Math.ceil(n / cols);
  let top = r.y + m * 0.6; if (o.title) { withA(pcE(t, o.titleAt == null ? o.at : o.titleAt, 0.35), () => txt(o.title, r.x + m, top + V(46, 44), FM(V(44, 38), 600), PC.ink, 'left', 'alphabetic', 0, 'shelf-title')); top += V(84, 80); }
  const footH = o.foot ? V(70, 70) : 0; const avail = r.y + r.h - top - footH - capRoom - m * 0.3; const gx = V(40, 30);
  const w = Math.min((r.w - 2 * m - gx * (cols - 1)) / cols, (avail / rows - V(40, 30)) / 0.6); const h = w * 0.6; const gy = rows > 1 ? Math.max(V(40, 30), (avail - rows * h) / rows) : 0;
  const x0 = r.x + (r.w - (cols * w + gx * (cols - 1))) / 2;
  for (let j = 0; j < rows; j++) PC.rail(r, top + gy / 2 + j * (h + gy) + h * 0.3, h * 0.45);
  o.items.forEach((it, i) => { const c = i % cols, rw = Math.floor(i / cols); const at = it.at != null ? it.at : o.at + i * (o.stagger || 0.24);
    PC.tag(t, { size: h * 0.42, ...it, key: it.key || 'shelf-' + (it.flag || i), at, rise: h * 0.5 }, x0 + c * (w + gx), top + gy / 2 + rw * (h + gy), w);
    });
  if (o.foot) withA(pcE(t, o.footAt == null ? o.at + n * 0.24 : o.footAt, 0.4), () => txt(o.foot, r.x + m, port ? Math.min(r.y + r.h - 80, top + rows * (h + gy) + 70) : r.y + r.h - capRoom - m * 0.5, FM(V(36, 32)), PC.mid, 'left', 'alphabetic', 0, 'shelf-foot'));
};
/** a REAL PAGE card (white, shadow, rotated a hair) in rect cr: the crop scaled to fit, yellow highlights sweep in at o.hl (one time
 *  per highlight rect, or one for all), a mono credit line under it. o.title: a heavy line above the card. */
PC.card = (t, name, cr, o = {}) => { const c = PC_CLIPS[name], im = IMG['clip_' + name]; if (!c || !im) return;
  const a = pcE(t, PC.lead(o.at || 0), 0.5); if (a <= 0) return; let y = cr.y;
  if (o.title) { const n = txtW(o.title, cr.x, y + V(64, 62), FS(V(60, 56), 700), PC.ink, cr.w, V(68, 64), 0, 'card-title-' + name); y += V(100, 96) + (n - 1) * V(68, 64); }
  const credH = V(60, 56); const pad = V(22, 18);
  // a wide crop in a narrow place: show the part of the line around the first highlight, so the words stay >= ~0.9x (cropped only)
  let sx = 0, sw = c.w; const hl0 = (c.hl || [])[0]; const sMin = o.minS || 1.0;
  if (o.hcrop && (cr.w - 2 * pad) / c.w < sMin && hl0) { sw = Math.min(c.w, (cr.w - 2 * pad) / sMin); sx = o.hleft ? 0 : clamp(hl0[0] + hl0[2] / 2 - sw * 0.35, 0, c.w - sw); }
  let sy = 0, shh = c.h; if (o.zoomHl && c.hl && c.hl.length) { const hs = c.hl.slice(0, typeof o.zoomHl === 'number' ? o.zoomHl : c.hl.length); const ys = hs.map(q => q[1]), ye = hs.map(q => q[1] + q[3]); sy = Math.max(0, Math.min(...ys) - 30); shh = Math.min(c.h - sy, Math.max(...ye) + 30 - sy); }
  const s = Math.min((cr.w - 2 * pad) / sw, (cr.y + cr.h - y - credH - 2 * pad) / shh, o.maxS || 1.6); const w = sw * s + 2 * pad, h = shh * s + 2 * pad;
  const x = o.align === 'left' ? cr.x : cr.x + (cr.w - w) / 2; const yy = y + Math.max(0, (cr.y + cr.h - y - credH - h) * (o.valign == null ? 0.4 : o.valign));
  const dy = (1 - a) * 60;
  withA(Math.min(1, a * 1.6), () => grp('page-' + name, x, yy, w, h + credH, () => { ctx.save(); ctx.translate(x + w / 2, yy + dy + h / 2); ctx.rotate((o.rot || 0) * Math.PI / 180); ctx.translate(-w / 2, -h / 2);
    rect(0, 0, w, h, '#FFFFFF');
    themeFixed(() => ctx.drawImage(im, sx * im.width / c.w, sy * im.height / c.h, sw * im.width / c.w, shh * im.height / c.h, pad, pad, sw * s, shh * s));
    ctx.save(); ctx.beginPath(); ctx.rect(pad, pad, sw * s, shh * s); ctx.clip();
    (c.hl || []).forEach((q, i) => { const ht = Array.isArray(o.hl) ? o.hl[Math.min(i, o.hl.length - 1)] : o.hl; if (ht == null || ht > 1e8) return; const p = pcE(t, ht + i * 0.12, 0.4, 'inOutQuart'); if (p <= 0) return;
      ctx.save(); ctx.globalCompositeOperation = 'multiply'; rect(pad + (q[0] - sx) * s - 4, pad + (q[1] - sy) * s - 2, (q[2] * s + 8) * p, q[3] * s + 4, 'rgba(255,214,10,0.75)'); ctx.restore(); });
    ctx.restore();
    ctx.restore();
    { const cs = c.src + ' · 2 Nov 2026'; let cz = 32; const lim = Math.min(cr.w, Math.max(w, 560)); while (cz > 26 && tw(cs, FM(cz)) > lim) cz -= 2; const cx_ = Math.max(cr.x, Math.min(x + 4, cr.x + cr.w - tw(cs, FM(cz))));
      if (tw(cs, FM(cz)) <= cr.x + cr.w - cx_) txt(cs, cx_, yy + dy + h + credH * 0.78, FM(cz), PC.mid, 'left', 'alphabetic', 0, 'credit-' + name); else txtW(cs, cr.x, yy + dy + h + credH * 0.78, FM(cz), PC.mid, cr.w, cz * 1.2, 0, 'credit-' + name); } }));
};
/** a real page as a whole screen: the card centred in r, a heavy title above, an optional red sticker over its corner */
PC.clip = (name, o = {}) => (t, r) => { r = PC.rr(r); rect(r.x, r.y, r.w, r.h, PC.wall); const m = V(90, 56);
  const cr = { x: r.x + m, y: r.y + m * 0.8, w: r.w - 2 * m, h: r.h - m * 1.4 - (o.capRoom || 0) - (o.stk ? V(110, 100) : 0) };
  PC.card(t, name, cr, { ...o, valign: o.valign == null ? 0.45 : o.valign });
  if (o.stk) PC.sticker(t, o.stk.at, o.stk.lines, o.stk.x != null ? r.x + o.stk.x : r.x + r.w - m, o.stk.y != null ? r.y + o.stk.y : r.y + r.h - (o.capRoom || 0) - m * 0.5 - V(80, 70), V(58, 54), { key: 'clip-stk-' + name, align: 'right', rot: o.stk.rot, bg: o.stk.bg, fg: o.stk.fg });
};
/** a Pexels photo band (cover-cropped, a slow drift) with its small credit */
PC.photoBand = (t, key, b, o = {}) => { const im = IMG['px_' + key]; if (!im) { rect(b.x, b.y, b.w, b.h, PC.wall2); return; }
  const a = pcE(t, o.at || 0, 0.5); const k = 1.04 + 0.04 * prog(t, o.at || 0, 9);
  withA(Math.max(0.001, a), () => grp('photo-' + key, b.x, b.y, b.w, b.h, () => { ctx.save(); ctx.beginPath(); ctx.rect(b.x, b.y, b.w, b.h); ctx.clip();
    const s = Math.max(b.w / im.width, b.h / im.height) * k; const fy = o.fy == null ? 0.55 : o.fy;
    themeFixed(() => ctx.drawImage(im, b.x + (b.w - im.width * s) / 2, b.y + (b.h - im.height * s) * fy, im.width * s, im.height * s)); ctx.restore();
    if (o.credit) { const f = FM(32); const s_ = 'Photo: ' + o.credit + ' / Pexels'; const w = tw(s_, f) + 24; rect(b.x + b.w - w - 16, b.y + 16, w, 50, 'rgba(18,18,18,0.72)'); _txt(s_, b.x + b.w - w - 4, b.y + 52, f, PC.white, 'left'); } }, { img: true }));
};
/** a city photo above the shelf with the country label on the rail (the opening of each country) */
/* 2026-11-07 (coordinator): the city photo fills the whole panel; one solid off-black block top-left holds the big thing (the price,
 * or the place's name when there is no price), the flag and ONE small label. Everything is there within 0.35 s of o.at. */
PC.city = (o) => (t, r) => { r = PC.rr(r); rect(r.x, r.y, r.w, r.h, PC.black); const port = r.h > r.w * 1.05; const m = V(70, 50);
  PC.photoBand(t, o.photo, { x: r.x, y: r.y, w: r.w, h: r.h }, { at: o.at - 0.1, credit: o.credit, fy: o.fy });
  const p = pcE(t, o.at + 0.05, 0.45); if (p <= 0) return;
  const hasPrice = o.price != null; const big = hasPrice ? o.price : (o.name || '').toUpperCase();
  const parts = []; if (hasPrice && o.name && !PC.CTRY.test(o.name)) parts.push(o.name); if (o.kicker) parts.push(o.kicker); if (o.line) parts.push(o.line);
  const lab = parts.join(' · ').toUpperCase();
  let z = Math.min(r.h * (port ? 0.16 : 0.24), V(250, 230)); const maxW = r.w * (port ? 0.8 : 0.6); { const bw = tw(big, FX(Math.round(z))); if (bw > maxW) z *= maxW / bw; }
  const lz = V(38, 36); const fz = lz * 1.15; const pad = V(36, 32);
  const bw = Math.max(tw(big, FX(Math.round(z))), lab ? tw(lab, FM(lz), 1.5) + fz * 1.6 : fz * 1.4) + 2 * pad; const bh = pad * 2 + fz * 1.3 + z * 0.86;
  const bx = r.x + m * 0.6, by = r.y + m * 0.6 - (1 - p) * 40;   // top-left: clear of her captions at the foot
  const pk = hasPrice ? pcE(t, Math.min(o.priceAt == null ? o.at : o.priceAt, o.at + 0.3), 0.4) : 1;
  withA(Math.min(1, p * 2), () => grp('city-' + (o.flag || o.name), bx, by, bw, bh, () => { rect(bx, by, bw, bh, PC.black);
    if (o.flag) PC.flag(o.flag, bx + pad, by + pad, fz * 1.2);
    if (lab) txt(lab, bx + pad + (o.flag ? fz * 1.55 : 0), by + pad + fz * 0.72, FM(lz), '#EDE9E2', 'left', 'alphabetic', 1.5, (o.key || o.flag || 'city') + '-name');
    withA(pk, () => txt(big, bx + pad, by + pad + fz * 1.3 + z * 0.84, FX(Math.round(z)), o.red && hasPrice ? PC.red : '#EDE9E2', 'left', 'alphabetic', 0, (o.key || o.flag || 'city') + (hasPrice ? '-price' : '-big'))); }));
};
/** a black PHRASE CARD: her words in Sofia Sans 900, one word at a time on her times, ~word~ on a yellow label box. lines: [{s, at | times}] */
PC.phrase = (o) => (t, r) => { r = PC.rr(r); rect(r.x, r.y, r.w, r.h, PC.black); const port = r.h > r.w * 1.05; const m = V(110, 70);
  const z0 = o.size || V(176, 140); const capRoom = o.capRoom || 0;
  const lines = o.lines.map(l => (typeof l === 'string' ? { s: l } : l)).map(l => ({ ...l, s: l.s.toUpperCase() })); let z = z0;
  for (const l of lines) { const plain = l.s.replace(/~/g, ''); const ww = tw(plain, FX(z)); if (ww > r.w - 2 * m) z = Math.min(z, z * (r.w - 2 * m) / ww); }
  const lh = z * 0.98; const tot = lines.length * lh; let y = r.y + (r.h - capRoom - tot) / 2 + z * 0.85;
  lines.forEach((l, li) => { const key = 'phrase-' + li; const ov = ovr(key); const str = ov.s != null ? ov.s : l.s; const parts = str.split(' ');
    const f = FX(Math.round(z)); const sp = tw(' ', f); const tot_ = tw(str.replace(/~/g, ''), f); const x0 = o.center || port ? r.x + (r.w - tot_) / 2 : r.x + m;
    moved(ov, () => { let x = x0; parts.forEach((p_, j) => { const hi = /~/.test(p_); const s = p_.replace(/~/g, ''); const ww = tw(s, f);
        const at = l.times ? l.times[Math.min(j, l.times.length - 1)] : (l.at != null ? l.at : 0) + j * 0.1; const a = pcE(t, at, 0.3);
        withA(a, () => _txt(s, x, y + (1 - a) * 14, f, hi ? PC.red : PC.wall, 'left'));
        x += ww + sp; });
      regBox(ov, x0, y - z * 0.82, tot_, z * 1.02, { text: str, def: l.s }); });
    y += lh; });
  if (o.foot) withA(pcE(t, o.footAt || 0, 0.4), () => txt(o.foot, port ? r.x + r.w / 2 : r.x + m, r.y + r.h - capRoom - m * 0.7, FM(V(36, 34)), PC.soft, port ? 'center' : 'left', 'alphabetic', 0, 'phrase-foot'));
};
/** THE SUM: tuition label + proof-of-funds label = the first year (a red sticker), parts land on her words.
 *  o: name, flag, tuition {price, at, line}, funds {price, at, line}, total {s, at}, title */
PC.sum = (o) => (t, r) => { r = PC.rr(r); rect(r.x, r.y, r.w, r.h, PC.wall); const port = r.h > r.w * 1.05; const m = V(80, 56); const capRoom = o.capRoom || 0;
  let top = r.y + m * V(0.7, 1.4); if (o.title) { withA(pcE(t, o.titleAt == null ? o.tuition.at - 0.3 : o.titleAt, 0.35), () => txt(o.title, r.x + m, top + 44, FM(V(42, 38), 600), PC.ink, 'left', 'alphabetic', 0, 'sum-title')); top += 80; }
  const avail = r.y + r.h - top - capRoom - m * 0.4;
  if (port) { const w = Math.min(r.w - 2 * m, (avail - 220) / 2 / 0.56); const h = w * 0.56; const x = r.x + (r.w - w) / 2;
    PC.tag(t, { ratio: 0.56, name: o.name, flag: o.flag, kicker: 'TUITION', ...o.tuition, key: 'sum-t' }, x, top, w);
    withA(pcE(t, o.funds.at - 0.2, 0.3), () => txt('+', r.x + r.w / 2, top + h + 92, FX(120), PC.ink, 'center', 'alphabetic', 0, 'sum-plus'));
    PC.tag(t, { ratio: 0.56, name: o.name, flag: o.flag, kicker: 'PROOF OF FUNDS', ...o.funds, key: 'sum-f' }, x, top + h + 120, w);
    if (o.total) PC.sticker(t, o.total.at, o.total.lines, r.x + r.w / 2, top + 2 * h + 140, 64, { key: 'sum-total', align: 'center', rot: -2 }); }
  else { const w = Math.min((r.w - 2 * m - 160) / 2, avail / 0.56 * 0.8); const h = w * 0.56; const y = top + Math.max(0, (avail - h - 150) / 2); const x1 = r.x + m, x2 = r.x + r.w - m - w;
    PC.rail(r, y + h * 0.32, h * 0.5);
    PC.tag(t, { ratio: 0.56, name: o.name, flag: o.flag, kicker: 'TUITION', ...o.tuition, key: 'sum-t' }, x1, y, w);
    withA(pcE(t, o.funds.at - 0.2, 0.3), () => txt('+', r.x + r.w / 2, y + h * 0.66, FX(170), PC.ink, 'center', 'alphabetic', 0, 'sum-plus'));
    PC.tag(t, { ratio: 0.56, name: o.name, flag: o.flag, kicker: 'PROOF OF FUNDS', ...o.funds, key: 'sum-f' }, x2, y, w);
    if (o.total) PC.sticker(t, o.total.at, o.total.lines, r.x + r.w / 2, y + h + 40, 70, { key: 'sum-total', align: 'center', rot: -2 }); }
};
/** a PRICE LIST (a shelf ticket): rows of mono label + heavy value, hairline rules; each row lands on its time. o.items [{k, v, at, red}], o.title */
PC.list = (o) => (t, r) => { r = PC.rr(r); rect(r.x, r.y, r.w, r.h, PC.wall); const m = V(70, 50); const capRoom = o.capRoom || 0;
  const stack = r.w < 1300; const w = V(stack ? 900 : 1200, 940); const pad = V(50, 40); const rowH = V(stack ? (o.rowH || 132) + 50 : (o.rowH || 132), 150); const n = o.items.length;
  const head = o.title ? V(150, 140) : 0; const h = head + n * rowH + V(50, 40);
  const kf = Math.min(1, (r.w - 2 * m) / w, (r.h - capRoom - 2 * m * 0.6) / h); const x = r.x + (r.w - w * kf) / 2, y = r.y + Math.max(m * 0.6, (r.h - capRoom - h * kf) / 2);
  const a = o.at == null ? 1 : pcE(t, o.at, 0.5);   // the card is there with its panel; its rows land on her words
  grp('pricelist', x, y, w * kf, h * kf, () => { ctx.save(); ctx.translate(x, y + (1 - a) * 80); ctx.scale(kf, kf); ctx.globalAlpha *= Math.min(1, a * 2);
    if (o.title) txt(o.title, pad, V(108, 100), FX(V(72, 64)), PC.ink, 'left', 'alphabetic', 0, 'list-title');
    o.items.forEach((it, i) => { const yy = head + i * rowH; const p = pcE(t, it.at, 0.35); rect(pad, yy, w - 2 * pad, 2, 'rgba(18,18,18,0.16)');
      withA(p, () => { const kz = V(38, 36); txt(it.k, pad, yy + (stack || PORTRAIT ? rowH * 0.34 : rowH * 0.62), FM(kz, 600), PC.mid, 'left', 'alphabetic', 0, 'list-k' + i);
        if (it.v) { const sideBy = !(stack || PORTRAIT); const room = sideBy ? w - 2 * pad - tw(it.k, FM(kz, 600)) - 40 : w - 2 * pad; let vz = V(92, 84); const vw = tw(it.v, FX(vz)); if (vw > room) vz = Math.max(44, Math.floor(vz * room / vw));
          txt(it.v, sideBy ? w - pad : pad, yy + (sideBy ? rowH * 0.72 : rowH * 0.86), FX(vz), it.red ? PC.red : PC.ink, sideBy ? 'right' : 'left', 'alphabetic', 0, 'list-v' + i); } }); });
    ctx.restore(); });
};
/** a heavy TITLE screen (chapter openers, the topic): stacked Sofia Sans Extra Condensed caps, the last line on a yellow label */
PC.title = (o) => (t, r) => { r = PC.rr(r); rect(r.x, r.y, r.w, r.h, o.ground === 'black' ? PC.black : PC.wall); const port = r.h > r.w * 1.05; const m = V(110, 70);
  const z0 = o.size || V(190, 170); let z = z0; for (const l of o.lines) { const ww = tw(l.s, FX(z)); if (ww > r.w - 2 * m - 60) z = Math.min(z, z * (r.w - 2 * m - 60) / ww); }
  const lh = z * 1.1; let y = r.y + (r.h - (o.capRoom || 0) - o.lines.length * lh) / 2 + z * 0.8;
  o.lines.forEach((l, i) => { const a = pcE(t, l.at, 0.4); const last = i === o.lines.length - 1 && o.hi !== false; const f = FX(Math.round(z)); const ww = tw(l.s, f); const x = port ? r.x + (r.w - ww) / 2 : r.x + m;
    withA(a, () => txt(l.s, x, y + (1 - a) * 20, f, o.ground === 'black' ? PC.wall : PC.ink, 'left', 'alphabetic', 0, 'title-' + i));
    y += lh; });
  if (o.kicker) withA(pcE(t, o.kickerAt == null ? o.lines[0].at : o.kickerAt, 0.35), () => txt(o.kicker, port ? r.x + r.w / 2 : r.x + m, r.y + (r.h - (o.capRoom || 0) - o.lines.length * lh) / 2 - V(30, 40), FM(V(40, 38), 600), o.ground === 'black' ? PC.soft : PC.mid, port ? 'center' : 'left', 'alphabetic', 0, 'title-kicker'));
};
/** HER WORDS as kinetic type (the film's sentences without a diagram): Sofia Sans Extra Condensed caps, word by word on her
 *  times, wrapped to the frame, the strongest word (a number first) on a yellow label; o.ground 'wall' | 'black'; o.kicker */
PC.say = (ph, o = {}) => (t, r) => { const black = o.ground === 'black'; rect(r.x, r.y, r.w, r.h, black ? PC.black : PC.wall); const port = r.h > r.w * 1.05; const m = V(120, 80);
  const ov = ovr('say'); let ws = WORDS.slice(ph.i, ph.i + ph.w.length).map((x, j) => ({ s: x.w.replace(/[…]/g, '').toUpperCase(), t: ph.w[j] })).filter(x => x.s);
  const def = ws.map(x => x.s).join(' ');
  if (ov.s != null) { const es = ov.s.split(/\s+/).filter(Boolean); ws = es.map((x, j) => ({ s: x.toUpperCase(), t: ph.t + (ph.e - ph.t) * j / Math.max(1, es.length) })); }
  const hi = PC.hiWord ? PC.hiWord(ws.map(x => x.s)) : -1; const n = ws.length; let z = o.size || V(230, 190);
  const maxW = r.w - 2 * m - 60; let lines;
  for (let pass = 0; pass < 16; pass++) { const f = FX(z), sp = tw(' ', f); lines = [[]]; let lw = 0;
    ws.forEach((x, j) => { const ww = tw(x.s, f) + 0; if (lw && lw + sp + ww > maxW) { lines.push([]); lw = 0; } lines[lines.length - 1].push(j); lw += (lw ? sp : 0) + ww; });
    if (lines.length <= V(4, 6) && lines.length * z * 0.98 < r.h * 0.7) break; z *= 0.92; }
  const f = FX(Math.round(z)), sp = tw(' ', f), lh = z * 0.98; let y = r.y + (r.h - lines.length * lh) / 2 + z * 0.78;
  if (o.kicker) withA(pcE(t, ws[0] ? ws[0].t - 0.1 : 0, 0.3), () => txt(o.kicker, r.x + m, y - z - V(30, 30), FM(V(40, 36), 600), black ? PC.soft : PC.mid, 'left', 'alphabetic', 0, 'say-kicker'));
  moved(ov, () => { for (const ln of lines) { let x = port ? r.x + (r.w - ln.reduce((a, j) => a + tw(ws[j].s, f) + 0, 0) - sp * (ln.length - 1)) / 2 : r.x + m;
    for (const j of ln) { const a = pcE(t, ws[j].t - 0.05, 0.28); const ww = tw(ws[j].s, f);
      withA(a, () => _txt(ws[j].s, x, y + (1 - a) * 16, f, black ? PC.wall : PC.ink, 'left'));
      x += ww + sp; }
    y += lh; } });
  regBox(ov, r.x + m, r.y + (r.h - lines.length * lh) / 2, maxW, lines.length * lh, { text: ws.map(x => x.s).join(' '), def });
};
