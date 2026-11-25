/* http-status-codes: the look's kit, shared by the motion film (film.json scripts) and the talking-head edit, shorts and
 * teaser (talking-head.json "common"). Her pick 2026-11-02: B · THE FIRST DIGIT.
 * "You can already tell a lot from the first digit", so the screen IS the first digit: giant ink status codes roll like an
 * odometer from one code to the next; when the first digit rolls, its group colour floods the ground from the top.
 * Grounds (flat, full bleed, one per group): 1xx stone #D9D4C7, 2xx mint #8FE3B0, 3xx sky #8EC5FF, 4xx amber #FFA51F,
 * 5xx tomato #FF5A3C. Ink #121212, white #FFFFFF (real pages, messages), black #000000 (phrase cards only).
 * Type: Funnel Display 800 (codes, headlines), Funnel Sans 500-800 (her words), Fragment Mono (one corner mark, credits,
 * requests), Instrument Serif italic (the one accent word on phrase cards and short titles).
 * Motion: roll 0.5 s inOutQuart (+0.03 s per extra step), vertical blur up to 14 px while rolling, the flood in the same 0.5 s;
 * words land on her word times (0.34 s outExpo, 6 px blur clearing). Every helper returns draw(t, r) (r = the rect it fills),
 * a pure function of time; every text is txt()/txtW() (editable), every block grp() (movable, resizable).
 * CLIPS (real page crops) comes from talking-head/assets/src/clips.js. */
'use strict';
(function fdFonts() {   // type set 02 Bold condensed (TYPE-SYSTEM.md, her pick 2026-11-07): Anton + Inter Tight + DM Mono (OFL), from the project's font files
  const base = '/p/http-status-codes/film/assets/fonts/';
  for (const [fam, file, desc] of [['FDDisp', 'Anton-Regular.ttf', {}], ['FDSans', 'InterTightRegular.ttf', { weight: '400' }], ['FDSans', 'InterTightMedium.ttf', { weight: '500' }],
    ['FDSans', 'InterTightSemiBold.ttf', { weight: '600' }], ['FDSans', 'InterTightBold.ttf', { weight: '700' }], ['FDMono', 'DMMono-Medium.ttf', {}]]) {
    const x = new XMLHttpRequest(); x.open('GET', base + file, false); x.overrideMimeType('text/plain; charset=x-user-defined'); x.send();
    if (x.status !== 200) continue;
    const s = x.responseText, u = new Uint8Array(s.length); for (let i = 0; i < s.length; i++) u[i] = s.charCodeAt(i) & 255;
    const ff = new FontFace(fam, u.buffer, desc); document.fonts.add(ff); ff.load();
  }
})();
const FD = { ink: '#121212', g1: '#D9D4C7', g2: '#8FE3B0', g3: '#8EC5FF', g4: '#FFA51F', g5: '#FF5A3C', white: '#FFFFFF', black: '#000000', hl: '#FFE45A', mid: 'rgba(18,18,18,0.62)',
  // the code's colour on dark (captions, phrase cards): the same five, a touch lighter where needed
  c1: '#D9D4C7', c2: '#8FE3B0', c3: '#8EC5FF', c4: '#FFB547', c5: '#FF7A5E' };
const FN = (s) => `400 ${s}px FDDisp`, FS = (s, w = 500) => `${Math.min(700, Math.max(400, Math.round(w / 100) * 100))} ${s}px FDSans`, FM = (s) => `400 ${s}px FDMono`, FI = (s) => FS(s, 500);
/** set 02: headlines are Anton UPPERCASE (line height 0.9) */
const UP = (x) => String(x).toUpperCase();
for (const d of [1, 2, 3, 4, 5]) G['fd' + d] = { bg: FD['g' + d], fg: FD.ink, mid: FD.mid, line: 'rgba(18,18,18,0.2)', acc: FD.ink, card: FD.white, panel: FD.white, grid: 'rgba(0,0,0,0)', mode: 'light' };
G.fdBlack = { bg: FD.black, fg: FD.white, mid: 'rgba(255,255,255,0.6)', line: 'rgba(255,255,255,0.2)', acc: FD.c4, card: FD.white, panel: '#161616', grid: 'rgba(0,0,0,0)', mode: 'dark' };
G.fdWhite = { bg: FD.white, fg: FD.ink, mid: FD.mid, line: 'rgba(18,18,18,0.2)', acc: FD.ink, card: FD.white, panel: '#F2F2F2', grid: 'rgba(0,0,0,0)', mode: 'light' };
F.disp = (s) => FN(s); F.body = (s, w = 500) => FS(s, w); F.mono = (s) => FM(s); F.serif = (s) => FN(s);
LS.disp = 0; LS.body = -0.01; LS.mono = 0.12; LS.serif = 0;
if (typeof PLATE !== 'undefined') { PLATE.fd = [FD.white, FD.ink, FD.ink]; PLATE.fdInk = [FD.ink, FD.white, FD.c4]; }
const fdE = (t, t0, d, e = 'outExpo') => MOTION.ease(t, t0, d, e);
const fdIO = (t, t0, d) => MOTION.ease(t, t0, d, 'inOutQuart');
FD.cls = (c) => { const d = String(c).trim()[0]; return '12345'.includes(d) ? +d : 0; };
FD.col = (c) => FD['g' + (FD.cls(c) || 1)];
FD.colDark = (c) => FD['c' + (FD.cls(c) || 1)];
FD.ROLL = 0.5;
FD.q = []; FD.snd = (role, t, db) => { if (t != null && t < 1e8 && isFinite(t)) FD.q.push([role, t, db]); };
FD.flush = (db = -6) => { const have = CUES.map(c => c.t); for (const [role, t, d] of FD.q.sort((a, b) => a[1] - b[1])) { if (have.some(h => Math.abs(h - t) < 0.3)) continue; sfx(role, t, d != null ? d : db); have.push(t); } FD.q = []; };
FD.short = () => typeof FOOT !== 'undefined' && !!(FOOT.m && FOOT.m.kind === 'short');
FD.T0 = null; FD.lead = (at) => (FD.T0 != null && at != null && at < 1e8 ? Math.min(at, FD.T0 + 0.35) : at);
/** the time she starts a word inside a phrase (first match), else the phrase start */
function WT(ph, word, nth = 0) {
  const n = (s) => s.toLowerCase().replace(/[’]/g, "'").replace(/[^a-z0-9']/g, '');
  const want = String(word).split(/\s+/).map(n); const ws = WORDS.slice(ph.i, ph.i + ph.w.length); let hit = 0;
  for (let k = 0; k <= ws.length - want.length; k++) if (want.every((x, j) => ws[k + j].n === x)) { if (hit++ === nth) return ph.w[k]; }
  return ph.t;
}
/** shorts: a graphic that reaches the top of the 9:16 frame starts below the top title (the band above keeps the ground) */
FD.rr = (r, bg) => {
  if (!PORTRAIT || !FD.short() || typeof TH === 'undefined') return r; const lb = TH.labelBottom(); if (!(lb > 0)) return r;
  const m = ctx.getTransform(), sy = m.d / BASE[3], y0 = (m.d * r.y + m.f - BASE[5]) / BASE[3];
  if (y0 >= lb + 20) return r; const d = (lb + 24 - y0) / (sy || 1);
  rect(r.x, r.y, r.w, r.h, bg || FD.g1); return { x: r.x, y: r.y + d, w: r.w, h: r.h - d };
};
FD.CR = () => (typeof FOOT !== 'undefined' && !PORTRAIT ? 150 : 0);   // 16:9 edit: the bottom 150 px are her captions'
FD.m = (r) => Math.max(36, Math.min(V(96, 64), r.w * 0.07));
/** a line of type landing word by word on her times (o.times one per word, else o.at), editable as one text */
FD.words = (t, s, x, y, font, col, key, o = {}) => {
  const ov = ovr(key); const str = ov.s != null ? ov.s : s; const ws = str.split(' '); const sp = tw(' ', font);
  const times = ov.s == null && o.times && o.times.length === ws.length ? o.times : null; const at = o.at == null ? -1e9 : o.at;
  const W_ = ws.reduce((a, w) => a + tw(w, font), 0) + sp * (ws.length - 1); let x0 = o.align === 'center' ? x - W_ / 2 : o.align === 'right' ? x - W_ : x;
  const bx = x0; const size = parseFloat(font.match(/(\d+(\.\d+)?)px/)[1]);
  if (ov.hide) { regBox(ov, bx, y - size * 0.8, W_, size, { text: str, def: s }); return W_; }
  moved(ov, () => { ws.forEach((w, i) => { const ta = times ? times[i] : at + i * (o.stagger || 0); const p = fdE(t, ta, 0.34);
      if (p > 0) withA(p, () => { const bl = (1 - p) * 6; if (bl > 0.5) { ctx.save(); ctx.filter = `blur(${bl.toFixed(1)}px)`; }
        _txt(w, x0, y + (1 - p) * size * 0.12, font, (o.hi && o.hi(w, i)) || col, 'left'); if (bl > 0.5) ctx.restore(); });
      x0 += tw(w, font) + sp; });
    regBox(ov, bx, y - size * 0.8, W_, size, { text: str, def: s }); });
  return W_;
};
/** wrap words into lines no wider than maxW */
FD.wrap = (s, font, maxW) => { const ws = s.split(' '); const out = []; let cur = '';
  for (const w of ws) { const c = cur ? cur + ' ' + w : w; if (tw(c, font) > maxW && cur) { out.push(cur); cur = w; } else cur = c; } if (cur) out.push(cur); return out; };
FD.kicker = (t, s, x, y, size, col, at, key = 'kicker') => withA(at == null ? 1 : fdE(t, at - 0.15, 0.3), () => txt(s.toUpperCase(), x, y, FM(size), col || FD.mid, 'left', 'alphabetic', size * 0.04, key));

/* ---------- the odometer ---------- */
/** per-cell sequences from a code timeline [[t, '200'], [t, '4xx'], ...]: digits roll upward, 'x' fades the digit out */
FD.seqs = (codes) => { const n = Math.max(...codes.map(c => String(c[1]).length)); const cells = [];
  for (let i = 0; i < n; i++) cells.push({ d: codes.map(([t, c]) => [t, /\d/.test(String(c)[i] || '') ? +String(c)[i] : null]), x: codes.map(([t, c]) => [t, (String(c)[i] || '') === 'x']) });
  cells.forEach((c) => { let last = 0; c.d.forEach((p) => { if (p[1] == null) p[1] = last; else last = p[1]; }); });
  return cells; };
FD.digitVal = (seq, t, i0 = 0) => { let v = seq[0][1]; for (let i = 1; i < seq.length; i++) { const [ti, d] = seq[i]; if (t < ti) break;
    const steps = (d - (v % 10) + 10) % 10; const dur = FD.ROLL + 0.03 * steps + i0 * 0.06; const tt = ti + i0 * 0.06; if (t < tt) break; v = (v % 10) + steps * fdIO(t, tt, dur); if (t >= tt + dur) v = d; }
  return v; };
FD.xAlpha = (xs, t) => { let a = xs[0][1] ? 1 : 0; for (let i = 1; i < xs.length; i++) { const [ti, on] = xs[i]; if (t < ti) break; const p = fdE(t, ti, 0.4); a = on ? Math.max(a * (1 - p), p) : a * (1 - p); } return a; };
/** draw a rolling code: cells from FD.seqs, at x (left), baseline y, font size s; returns {w, adv} */
FD.odo = (t, cells, x, y, s, o = {}) => {
  const f = FN(s); const adv = tw('0', f); const gap = -s * 0.03; const col = o.col || FD.ink; let xx = x;
  cells.forEach((c, i) => { const v = FD.digitVal(c.d, t, i); const d0 = Math.floor(v) % 10, fr = v - Math.floor(v); const xa = FD.xAlpha(c.x, t);
    const sp = Math.abs(FD.digitVal(c.d, t + 1 / 60, i) - FD.digitVal(c.d, t - 1 / 60, i)) * 30; const h = s * 1.12; const top = y - s * 0.94;   // Anton's digits are tall: the window fits them whole
    ctx.save(); ctx.beginPath(); ctx.rect(xx - 6, top, adv + 12, s * 0.98); ctx.clip();
    withA(1 - xa, () => { const cxx = xx + adv / 2; const draw = () => { _txt(String(d0), cxx, y - fr * h, f, col, 'center'); if (fr > 0.001) _txt(String((d0 + 1) % 10), cxx, y + h * (1 - fr), f, col, 'center'); };
      if (sp > 2) { ctx.save(); ctx.filter = `blur(${Math.min(14, sp * 0.9).toFixed(1)}px)`; draw(); ctx.restore(); } else draw(); });
    ctx.restore();
    if (xa > 0.01) withA(xa * (o.xAlpha || 0.5), () => _txt('x', xx + adv / 2, y, FN(s * 0.86), col, 'center'));
    xx += adv + gap; });
  if (o.sound !== false && !o.silent) {}
  return { w: xx - gap - x, adv };
};
/** the ground: floods from the top in the class colour of each new code (seq [[t, code]]) */
FD.flood = (t, codes, r) => { let prev = FD.col(codes[0][1]); rect(r.x, r.y, r.w, r.h, prev);
  for (let i = 1; i < codes.length; i++) { const [ti, c] = codes[i]; if (t < ti) break; const nc = FD.col(c); if (nc === prev) continue; const e = fdIO(t, ti, FD.ROLL); rect(r.x, r.y, r.w, r.h * e, nc); prev = nc; }
  return prev; };
FD.rollSounds = (codes) => codes.slice(1).forEach(([ti, c], i) => { if (String(c) !== String(codes[i][1])) FD.snd(FD.cls(c) !== FD.cls(codes[i][1]) ? 'ratchet' : 'tick', ti + 0.02, -4); });

/**
 * THE signature: a giant code that rolls from one code to the next, the ground flooding to its group colour.
 * o.codes [{at, c: '404', name: 'Not Found', note: "nothing at that address", noteAt}], o.kicker, o.flood (default true),
 * o.ground (fixed ground when flood false), o.size, o.under (a heavy underline under the first digit) {at}
 */
FD.code = (o) => { const codes = o.codes.map(x => [x.at, x.c]); FD.rollSounds(codes); (o.codes || []).forEach(x => { if (x.name) FD.snd('type', (x.nameAt || x.at + 0.1), -8); });
  return (t, r) => { r = FD.rr(r, FD.col(o.codes[0].c));
    const g0 = o.flood === false ? (o.ground ? G[o.ground].bg : FD.col(o.codes[0].c)) : FD.flood(t, codes, r); if (o.flood === false) rect(r.x, r.y, r.w, r.h, g0);
    const m = FD.m(r); const wide = r.w > r.h * 1.25 && !o.hero; const cells = FD.seqs(codes);
    if (o.kicker) FD.kicker(t, o.kicker, r.x + m, r.y + m + V(30, 34), V(34, 34), FD.mid, o.kickerAt);
    const CR = o.capRoom != null ? o.capRoom : FD.CR(); r = { x: r.x, y: r.y, w: r.w, h: r.h - CR };
    let s = o.size || Math.min(r.h * (wide ? 0.62 : o.hero ? 0.56 : 0.42), (r.w - 2 * m) * (wide ? 0.55 : 0.92) / (cells.length * 0.5)); s = Math.max(120, s);
    const adv = tw('0', FN(s)); const cw = cells.length * adv;
    const cur = [...o.codes].reverse().find(x => t >= x.at) || o.codes[0];
    const textH = wide ? 0 : V(0, 260);
    const y = wide ? r.y + r.h / 2 + s * 0.36 : r.y + Math.max(m + s * 0.9, (r.h - s * 0.8 - textH) / 2 + s * 0.78);
    const x = wide ? r.x + m : r.x + (r.w - cw) / 2;
    grp(o.key || 'code', x, y - s * 0.8, cw, s * 0.86, () => withA(o.at == null ? 1 : fdE(t, o.at, 0.3), () => FD.odo(t, cells, x, y, s)), { label: 'the status code (drag, resize)' });
    if (o.under) { const p = fdE(t, o.under.at, 0.4); if (p > 0) rect(x, y + s * 0.06, adv * 0.92 * p, Math.max(10, s * 0.035), FD.ink); }
    // name + note of the current code
    const tx = wide ? x + cw + m * 0.7 : r.x + m, tw_ = wide ? r.x + r.w - m - tx : r.w - 2 * m; let ty = wide ? r.y + r.h / 2 - V(10, 0) : y + V(130, 140);
    o.codes.forEach((cd, k) => { if (!cd.name && !cd.note) return; const nxt = o.codes[k + 1]; const vis = t >= (cd.nameAt || cd.at) - 0.05 && (!nxt || t < nxt.at);
      if (!vis) return; let nz = cd.nameSize || V(wide ? 92 : 110, 104); while (tw(UP(cd.name || ''), FN(nz)) > tw_ && nz > 40) nz -= 4;
      let yy = ty; if (cd.name) { FD.words(t, UP(cd.name), wide ? tx : r.x + r.w / 2, yy, FN(nz), FD.ink, 'name-' + k, { at: cd.nameAt || cd.at + 0.1, stagger: 0.06, align: wide ? 'left' : 'center' }); yy += nz * 0.6 + V(54, 60); }
      if (cd.note) { const nz = cd.noteSize || V(58, 60); const nf = FS(nz, 500); const ls = FD.wrap(cd.note, nf, tw_);
        withA(fdE(t, cd.noteAt || (cd.nameAt || cd.at) + 0.3, 0.35), () => ls.forEach((l, j) => txt(l, wide ? tx : r.x + r.w / 2, yy + V(10, 10) + j * nz * 1.18, nf, FD.ink, wide ? 'left' : 'center', 'alphabetic', 0, 'note-' + k + '-' + j))); }
    });
    if (o.foot) FD.kicker(t, o.foot, r.x + m, r.y + r.h - m * 0.7 - (o.capRoom || 0), V(28, 30), FD.mid, o.footAt, 'foot');
  }; };

/* ---------- big words on a group ground ---------- */
/** o.lines [{s, at | times, size, w (weight), font: 'num'|'sans'|'serif', col}], o.kicker, o.ground (G key, default fd1), o.align */
FD.type = (o) => { (o.lines || []).forEach((l) => FD.snd('type', (l.times || [])[0] != null ? l.times[0] : l.at, -8)); return (t, r) => {
  const gr = G[o.ground || 'fd1']; r = FD.rr(r, gr.bg); rect(r.x, r.y, r.w, r.h, gr.bg); const m = FD.m(r); const center = o.align === 'center';
  const lines = o.lines || []; const fontOf = (l, z) => l.font === 'num' ? FN(z) : FS(z, l.w || 600);
  const zs = lines.map(l => { let z = l.size || o.size || V(118, 112); while (tw(l.s, fontOf(l, z)) > r.w - 2 * m && z > 36) z -= 4; return z; });
  const kick = o.kicker ? V(84, 90) : 0; let totH = zs.reduce((a, z, i) => a + z * (lines[i].font === 'num' ? 0.9 : 1.08) * (o.lh || 1), 0) + kick;
  { const room = r.h - 2 * m - (o.capRoom || 0); if (totH > room) { const k = (room - kick) / (totH - kick); zs.forEach((z, i) => { zs[i] = z * k; }); totH = room; } }
  let y = o.valign === 'top' ? r.y + m : r.y + Math.max(m, (r.h - totH - (o.capRoom || 0)) / 2);
  if (o.kicker) { FD.kicker(t, o.kicker, center ? r.x + m : r.x + m, y + V(30, 32), V(32, 34), gr.mid, o.kickerAt != null ? o.kickerAt : FD.lead(lines[0] && (lines[0].at != null ? lines[0].at : (lines[0].times || [])[0]))); y += kick; }
  const LH = o.lh || 1;
  lines.forEach((l, i) => { const z = zs[i]; y += z * (l.font === 'num' ? 0.8 : 0.86) * LH;
    FD.words(t, l.s, center ? r.x + r.w / 2 : r.x + m, y, fontOf(l, z), l.col || gr.fg, l.key || 'line' + i, { times: l.times, at: i === 0 ? FD.lead(l.at) : l.at, align: center ? 'center' : 'left', stagger: 0.05,
      hi: l.hi ? (w) => (l.hi.includes(w.replace(/[^\w']/g, '').toLowerCase()) ? (l.hiCol || FD.white) : null) : null });
    if (l.under) { const p = fdE(t, l.under, 0.4); if (p > 0) rect(center ? r.x + r.w / 2 - tw(l.s, fontOf(l, z)) / 2 : r.x + m, y + z * 0.14, tw(l.s, fontOf(l, z)) * p, Math.max(8, z * 0.06), gr.fg); }
    y += z * (l.font === 'num' ? 0.1 : 0.22) * LH; });
}; };

/* ---------- real pages (receipts) ---------- */
/** a real page crop on a group ground, its sentence marked, the source credited. o: at, hl (time of the first marker), code {c, at, name},
 *  title (her words above it, [{s, at}]), ground (G key), w (share of the width) */
FD.clip = (key, o = {}) => { FD.snd('shutter', o.at, -6); if (o.hl != null) FD.snd('marker', o.hl, -8); return (t, r) => {
  const gr = G[o.ground || 'fd' + (o.code ? FD.cls(o.code.c) : 1)]; r = FD.rr(r, gr.bg); rect(r.x, r.y, r.w, r.h, gr.bg);
  const c = CLIPS[key], im = IMG['clip_' + key]; if (!c || !im) return; const m = FD.m(r);
  const x = r.x + m, aw = r.w - 2 * m, ah = r.h - 2 * m - (o.capRoom != null ? o.capRoom : FD.CR()); const pad = V(26, 20), credH = V(60, 60), gap = V(44, 50);
  // stacked: the code (or her words) on top, the page at the full width under it (its text big enough to read on a phone)
  const cs = o.code ? Math.min(ah * 0.34, aw * 0.5 / 1.7) : 0; const titles = o.title || []; const tz = titles.map(l => l.size || V(76, 80));
  const topH = (o.code ? cs * 0.86 : 0) + tz.reduce((q, z) => q + z * 1.1, 0) + (o.code || titles.length ? gap : 0);
  let sc = Math.min(3, (aw - 2 * pad) / c.w); let ih = c.h * sc; if (topH + ih + 2 * pad + credH > ah) { sc = (ah - topH - 2 * pad - credH) / c.h; ih = c.h * sc; }
  const w = c.w * sc + 2 * pad, h = ih + 2 * pad; const tot = topH + h + credH; let y = r.y + m + Math.max(0, (ah - tot) / 2);
  if (o.code) { const cells = FD.seqs([[0, o.code.c]]); const cy = y + cs * 0.8;
    grp('clip-code', x, cy - cs * 0.8, tw('0', FN(cs)) * cells.length, cs * 0.86, () => withA(fdE(t, o.code.at == null ? o.at : o.code.at, 0.3), () => FD.odo(t, cells, x, cy, cs)));
    y += cs * 0.86; }
  titles.forEach((l, i) => { const z = tz[i]; FD.words(t, UP(l.s), x, y + z * 0.86, FN(z), gr.fg, 'clip-title' + i, { at: l.at, stagger: 0.05 }); y += z * 1.1; });
  if (o.code || titles.length) y += gap;
  const a = fdE(t, FD.lead(o.at || 0), 0.5, 'outQuint'); const xx = o.align === 'center' ? x + (aw - w) / 2 : x, yy = y;
  withA(Math.min(1, a * 1.6), () => withT(0, 30 * (1 - a), 1, 0, () => grp('clip-' + key, xx, yy, w, h, () => {
    rect(xx, yy, w, h, FD.white); themeFixed(() => ctx.drawImage(im, 0, 0, c.w, c.h, xx + pad, yy + pad, c.w * sc, ih));
    (c.hl || []).forEach((b, i) => { if (o.hl == null) return; const p = fdE(t, o.hl + i * 0.3, 0.5); if (p <= 0) return;
      ctx.save(); ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = FD.hl; ctx.fillRect(xx + pad + (b[0] - 6) * sc, yy + pad + (b[1] - 2) * sc, (b[2] + 12) * sc * p, (b[3] + 4) * sc); ctx.restore(); });
  }, { img: true, label: 'real page (drag, resize)' })));
  withA(a, () => txt(c.source.toUpperCase(), xx, yy + h + V(44, 46), FM(V(30, 32)), FD.ink, 'left', 'alphabetic', 1, 'credit-' + key));
}; };

/* ---------- a request / response, as it really looks ---------- */
/** a white message sheet with mono lines typing on: o.lines [{s, at, hi: '200 OK' (part marked in its group colour), dim}],
 *  o.kicker, o.ground (G key), o.code {c, at, name} (a big code beside it, 16:9; above it, 9:16), o.size */
FD.httpN = 0;
FD.http = (o) => { (o.lines || []).forEach((l, i) => FD.snd(l.hi ? 'tick' : 'type', l.at, l.hi ? -4 : -9)); const lay = o.layout || (o.code && FD.httpN++ % 2 ? 'stack' : 'side'); return (t, r) => {
  const gr = G[o.ground || 'fd1']; r = FD.rr(r, gr.bg); rect(r.x, r.y, r.w, r.h, gr.bg); const m = FD.m(r); const wide = r.w > r.h * 1.25; const side = wide && !PORTRAIT && lay === 'side' && o.code;
  let x = r.x + m, y = r.y + m, aw = r.w - 2 * m, ah = r.h - 2 * m - (o.capRoom != null ? o.capRoom : FD.CR());
  if (o.kicker) { FD.kicker(t, o.kicker, x, y + V(30, 32), V(34, 34), gr.mid, o.kickerAt != null ? o.kickerAt : FD.lead(o.lines[0].at)); y += V(70, 76); ah -= V(70, 76); }
  const lines = o.lines; let z = o.size || V(60, 54); const f = () => FM(z); const pad = V(40, 34);
  const cd = o.code; const codes = cd ? (cd.codes || [[cd.at, cd.c]]) : null; const cells = codes ? FD.seqs(codes) : null; const nameH = cd && (cd.name || cd.names) ? V(100, 90) : 0;
  let s = 0; if (cd) s = side ? Math.min(ah * 0.62, aw * 0.36 / 1.7) : Math.min(ah * (PORTRAIT ? 0.26 : wide ? 0.42 : 0.3), aw * 0.86 / (cells.length * 0.6));
  const textW = side ? aw - tw('0', FN(s)) * cells.length - m * 0.8 : aw; const codeH = cd && !side ? s * 0.86 + nameH + V(40, 60) : 0;
  while ((Math.max(...lines.map(l => tw(l.s, f()))) + 2 * pad > textW || lines.length * z * 1.5 + 2 * pad + codeH > ah) && z > 22) z -= 2;
  const sw = Math.min(textW, Math.max(...lines.map(l => tw(l.s, f()))) + 2 * pad + V(60, 0)), sh = lines.length * z * 1.5 + 2 * pad - z * 0.5;
  const y0 = y + Math.max(0, (ah - sh - codeH) / 2); const bx = side ? x : (lay === 'stack' ? x : x);
  if (cd) { const cw = tw('0', FN(s)) * cells.length; const cx = side ? r.x + r.w - m - cw : x; const cy = side ? y + ah / 2 + s * 0.36 : y0 + s * 0.8;
    grp('http-code', cx, cy - s * 0.8, cw, s * 0.86, () => withA(fdE(t, FD.lead(codes[0][0]), 0.3), () => FD.odo(t, cells, cx, cy, s)));
    const nm = [...(cd.names || [[cd.at, cd.name]])].reverse().find(n => n[1] && t >= n[0]); if (nm) withA(fdE(t, nm[0] + 0.05, 0.3), () => txt(UP(nm[1]), cx, cy + V(84, 88), FN(V(64, 64)), FD.ink, 'left', 'alphabetic', 0, 'http-name')); }
  const sy = side ? y + Math.max(0, (ah - sh) / 2) : y0 + codeH; const a0 = fdE(t, FD.lead(lines[0].at) - 0.2, 0.45, 'outQuint');
  withA(a0, () => withT(0, 24 * (1 - a0), 1, 0, () => grp(o.key || 'message', bx, sy, sw, sh, () => { rect(bx, sy, sw, sh, FD.white);
    lines.forEach((l, i) => { const ly = sy + pad + z * 0.78 + i * z * 1.5; const ov = ovr('msg-' + i); const s_ = ov.s != null ? ov.s : l.s; const la = i === 0 ? FD.lead(l.at) : l.at; const n = Math.round(clamp((t - la) * 38, 0, s_.length)); if (t < la) return;
      const vis = s_.slice(0, n); const col = l.dim ? FD.mid : FD.ink;
      if (l.hi && s_.includes(l.hi)) { const i0 = s_.indexOf(l.hi); const hx = bx + pad + tw(s_.slice(0, i0), f()); const p = fdE(t, l.hiAt || la + l.hi.length / 38 + 0.05, 0.4); if (p > 0) rect(hx - z * 0.18, ly - z * 0.86, (tw(l.hi, f()) + z * 0.36) * p, z * 1.16, FD.hl); }
      _txt(vis, bx + pad, ly, f(), col, 'left'); regBox(ov, bx + pad, ly - z * 0.8, tw(s_, f()), z, { text: s_, def: l.s }); });
  }, { label: 'request / response (drag, resize)' })));
}; };

/* ---------- a table of codes (redirects 2x2, the five groups, 5xx...) ---------- */
/** o.cols ['can switch to GET', 'keeps the request'], o.rows ['PERMANENT', 'TEMPORARY'], o.cells [[{c, at, name}]], o.kicker, o.ground,
 *  o.hi [{row, col, at}] (a cell turns ink with white type) */
FD.table = (o) => { (o.cells || []).flat().forEach(c => c && FD.snd('pop', c.at, -7)); (o.hi || []).forEach(h => FD.snd('tick', h.at, -4)); return (t, r) => {
  const gr = G[o.ground || 'fd1']; r = FD.rr(r, gr.bg); rect(r.x, r.y, r.w, r.h, gr.bg); const m = FD.m(r);
  let y = r.y + m; if (o.kicker) { FD.kicker(t, o.kicker, r.x + m, y + V(30, 32), V(32, 34), gr.mid, o.kickerAt); y += V(76, 80); }
  const nr = o.cells.length, nc = o.cells[0].length; const rowW = o.rows ? V(300, 0) : 0; const colH = o.cols ? V(72, 120) : 0;
  const portRows = PORTRAIT && o.rows ? V(0, 70) : 0;
  const gx = r.x + m + rowW, gw = r.w - 2 * m - rowW, gh = r.y + r.h - m - (o.capRoom != null ? o.capRoom : FD.CR()) - y - colH;
  const cw = gw / nc, ch = Math.min(gh / nr, cw * 0.9); const gy = y + colH + Math.max(0, (gh - ch * nr) / 2);
  if (o.cols) o.cols.forEach((s, j) => withA(fdE(t, (o.colsAt || [])[j] != null ? o.colsAt[j] : o.kickerAt || 0, 0.3), () => { const fz = V(34, 32); const ls = FD.wrap(s.toUpperCase(), FM(fz), cw - 30);
    ls.forEach((l, k) => txt(l, gx + j * cw + cw / 2, gy - V(24, 24) - (ls.length - 1 - k) * fz * 1.2, FM(fz), FD.ink, 'center', 'alphabetic', 1, 'col' + j + (k ? '-' + k : ''))); }));
  o.cells.forEach((row, i) => { if (o.rows) withA(fdE(t, (o.rowsAt || [])[i] != null ? o.rowsAt[i] : (row[0] || {}).at || 0, 0.3), () => {
      const fz = V(40, 34); if (PORTRAIT) txt(o.rows[i].toUpperCase(), gx + 12, gy + i * ch + fz + 8, FM(fz), FD.ink, 'left', 'alphabetic', 1, 'row' + i);
      else txt(o.rows[i].toUpperCase(), r.x + m, gy + i * ch + ch / 2 + fz * 0.35, FM(fz), FD.ink, 'left', 'alphabetic', 1, 'row' + i); });
    row.forEach((cell, j) => { if (!cell) return; const p = fdE(t, i === 0 && j === 0 ? FD.lead(cell.at) : cell.at, 0.45, 'outQuint'); if (p <= 0) return;
      const x0 = gx + j * cw + 8, y0 = gy + i * ch + 8, w0 = cw - 16, h0 = ch - 16; const hi = (o.hi || []).find(h => h.row === i && h.col === j && t >= h.at);
      const hp = hi ? fdE(t, hi.at, 0.35) : 0;
      grp('cell-' + i + '-' + j, x0, y0, w0, h0, () => withA(p, () => withT(0, (1 - p) * 30, 1, 0, () => {
        rect(x0, y0, w0, h0, cell.ground ? FD.col(cell.ground) : FD.white); if (hp > 0) rect(x0, y0, w0, h0 * hp, FD.ink);
        const fg = hp > 0.5 ? FD.white : FD.ink; let s = Math.min(h0 * (cell.name ? 0.5 : 0.62), w0 * 0.75 / (String(cell.c).length * 0.58));
        const cy = y0 + h0 * (cell.name ? 0.52 : 0.5) + s * 0.36 + (PORTRAIT && o.rows ? 22 : 0);
        txt(cell.c, x0 + w0 / 2, cy, FN(s), fg, 'center', 'alphabetic', 0, 'code-' + i + '-' + j);
        if (cell.name) { let nz = Math.min(V(46, 40), h0 * 0.14); while (tw(cell.name, FS(nz, 600)) > w0 - 24 && nz > 26) nz -= 2; txt(cell.name, x0 + w0 / 2, cy + nz * 1.6, FS(nz, 600), fg, 'center', 'alphabetic', 0, 'name-' + i + '-' + j); }
      })), { label: 'code card' }); }); });
}; };

/* ---------- a request travelling: client -> proxy -> your app ---------- */
/** o.nodes [{s, at, sub}], o.links [{at}] (link i joins node i and i+1), o.code {c, at, name} returned at the end, o.mark {node, s, at}
 *  (a word stamped on a node: 'TOO SLOW', 'CRASHED'), o.ground */
FD.flow = (o) => { o.nodes.forEach(n => FD.snd('pop', n.at, -7)); if (o.code) FD.snd('ratchet', o.code.at + 0.4, -4); if (o.mark) FD.snd('type', o.mark.at, -6); return (t, r) => {
  const gr = G[o.ground || 'fd1']; r = FD.rr(r, gr.bg); rect(r.x, r.y, r.w, r.h, gr.bg); const m = FD.m(r); const n = o.nodes.length;
  let top = r.y + m; if (o.kicker) { FD.kicker(t, o.kicker, r.x + m, top + V(30, 32), V(32, 34), gr.mid, o.kickerAt); top += V(80, 80); }
  const bottom = r.y + r.h - m - (o.capRoom != null ? o.capRoom : FD.CR()); const codeH = o.code ? Math.min(V(260, 300), (bottom - top) * 0.42) : 0;
  const vert = PORTRAIT && r.w < 1100; const bw = vert ? r.w * 0.62 : Math.min(V(470, 300), (r.w - 2 * m) / (n * 1.3)), bh = vert ? Math.min(170, (bottom - top - codeH) / (n * 1.6)) : V(230, 170);
  const pos = o.nodes.map((nd, i) => vert ? [r.x + (r.w - bw) / 2, top + i * bh * 1.6] : [r.x + m + i * ((r.w - 2 * m - bw) / Math.max(1, n - 1)), top + (bottom - top - codeH - bh) / 2]);
  (o.links || []).forEach((l, i) => { if (i >= n - 1) return; const p = fdE(t, l.at, 0.5, 'outQuint'); if (p <= 0) return; const [x0, y0] = pos[i], [x1, y1] = pos[i + 1];
    if (vert) rect(x0 + bw / 2 - 4, y0 + bh, 8, (y1 - y0 - bh) * p, FD.ink); else rect(x0 + bw, y0 + bh / 2 - 4, (x1 - x0 - bw) * p, 8, FD.ink);
    if (l.label) withA(p, () => txt(l.label, vert ? x0 + bw / 2 + 24 : (x0 + bw + x1) / 2, vert ? (y0 + bh + y1) / 2 + 12 : y0 + bh / 2 - 26, FM(V(30, 30)), FD.ink, vert ? 'left' : 'center', 'alphabetic', 0, 'link' + i)); });
  o.nodes.forEach((nd, i) => { const p = fdE(t, i === 0 ? FD.lead(nd.at) : nd.at, 0.45, 'outQuint'); if (p <= 0) return; const [x0, y0] = pos[i];
    grp('node-' + i, x0, y0, bw, bh, () => withA(p, () => withT(0, (1 - p) * 24, 1, 0, () => { rect(x0, y0, bw, bh, nd.ink ? FD.ink : FD.white);
      let z = V(68, 56); while (tw(UP(nd.s), FN(z)) > bw - 30 && z > 22) z -= 2; txt(UP(nd.s), x0 + bw / 2, y0 + bh / 2 + (nd.sub ? -4 : z * 0.35), FN(z), nd.ink ? FD.white : FD.ink, 'center', 'alphabetic', 0, 'node-s' + i);
      if (nd.sub) txt(nd.sub, x0 + bw / 2, y0 + bh / 2 + V(44, 40), FM(V(28, 28)), nd.ink ? FD.white : FD.mid, 'center', 'alphabetic', 0, 'node-sub' + i); })), { label: 'box' }); });
  if (o.mark) { const p = fdE(t, o.mark.at, 0.25); if (p > 0) { const [x0, y0] = pos[o.mark.node]; withA(p, () => { ctx.save(); ctx.translate(x0 + bw / 2, y0 - V(30, 26)); ctx.rotate(-0.05); ctx.scale(lerp(1.3, 1, p), lerp(1.3, 1, p));
    txt(UP(o.mark.s), 0, 0, FN(V(72, 64)), FD.ink, 'center', 'alphabetic', 0, 'mark'); ctx.restore(); }); } }
  if (o.code) { const cd = o.code; const codes = cd.codes || [[cd.at, cd.c]]; const cells = FD.seqs(codes); const s = codeH * 0.95; const cw = tw('0', FN(s)) * cells.length;
    const cx = r.x + m, cy = bottom - s * 0.12; grp('flow-code', cx, cy - s * 0.8, cw, s * 0.86, () => withA(fdE(t, codes[0][0], 0.3), () => FD.odo(t, cells, cx, cy, s)));
    const nm = [...(cd.names || [[cd.at, cd.name]])].reverse().find(x => x[1] && t >= x[0]); if (nm) withA(fdE(t, nm[0] + 0.1, 0.3), () => txt(UP(nm[1]), cx + cw + m * 0.5, cy - s * 0.25, FN(V(64, 56)), FD.ink, 'left', 'alphabetic', 0, 'flow-name')); }
}; };

/* ---------- a Pexels photo window with a code ---------- */
/** o: img (IMG key), at, code {c, at, name} | codes [...] (rolls), fx/fy focus, credit, ground */
FD.photo = (o) => { FD.snd('shutter', o.at, -6); return (t, r) => {
  const c0 = o.code ? (o.code.c || o.code.codes[0][1]) : '1'; const gr = G[o.ground || 'fd' + FD.cls(c0)]; r = FD.rr(r, gr.bg);
  const codes = o.code ? (o.code.codes || [[o.code.at, o.code.c]]) : null; const bg = codes ? FD.flood(t, codes, r) : gr.bg; if (!codes) rect(r.x, r.y, r.w, r.h, bg);
  const m = FD.m(r); const wide = r.w > r.h * 1.25; const a = fdE(t, FD.lead(o.at), 0.5, 'outQuint');
  const pw = wide ? (r.w - 2 * m) * 0.5 : r.w - 2 * m, ph = wide ? r.h - 2 * m - (o.capRoom || 0) : (r.h - 2 * m - (o.capRoom || 0)) * 0.55;
  const px = wide ? r.x + r.w - m - pw : r.x + m, py = wide ? r.y + m : r.y + r.h - m - ph - (o.capRoom || 0);
  withA(a, () => grp('photo-' + o.img, px, py, pw, ph, () => { ctx.save(); ctx.beginPath(); ctx.rect(px, py, pw, ph); ctx.clip();
    const k = 1.04 + 0.04 * clamp((t - o.at) / 6); const im = IMG[o.img]; if (im) { const s = Math.max(pw / im.width, ph / im.height) * k; const sw = pw / s, sh = ph / s;
      const sx = clamp((im.width - sw) * (o.fx == null ? 0.5 : o.fx), 0, im.width - sw), sy = clamp((im.height - sh) * (o.fy == null ? 0.5 : o.fy), 0, im.height - sh); themeFixed(() => ctx.drawImage(im, sx, sy, sw, sh, px, py, pw, ph)); }
    ctx.restore(); }, { img: true, label: 'photo (drag, resize)' }));
  if (o.credit) withA(a, () => txt(o.credit.toUpperCase(), px, py + ph + V(36, 38), FM(V(24, 26)), FD.ink, 'left', 'alphabetic', 1, 'photo-credit'));
  if (codes) { const cells = FD.seqs(codes); const aw = wide ? px - r.x - 2 * m : r.w - 2 * m; const s = Math.min(wide ? r.h * 0.42 : (py - r.y - m) * 0.55, aw / (cells.length * 0.6));
    const cx = r.x + m, cy = wide ? r.y + r.h / 2 + s * 0.2 : r.y + m + s * 0.8; grp('photo-code', cx, cy - s * 0.8, tw('0', FN(s)) * cells.length, s * 0.86, () => withA(fdE(t, FD.lead(codes[0][0]), 0.3), () => FD.odo(t, cells, cx, cy, s)));
    const nm = [...(o.code.names || [[o.code.at, o.code.name]])].reverse().find(x => x[1] && t >= x[0]); if (nm) { let nz = V(64, 60); while (tw(UP(nm[1]), FN(nz)) > aw && nz > 24) nz -= 2;
      withA(fdE(t, nm[0] + 0.1, 0.3), () => txt(UP(nm[1]), cx, cy + V(88, 84), FN(nz), FD.ink, 'left', 'alphabetic', 0, 'photo-name')); } }
  FD.rollSounds(codes || [[0, '1']]);
}; };

/* ---------- mistakes counter (and the "fourth one" correction) ---------- */
/** o.n (1-4), o.of (4), o.at, o.lines [{s, at}] (the mistake in her words), o.ground (G key), o.from (counter rolls from this n) */
FD.mistake = (o) => { FD.snd('ratchet', o.at + 0.4, -4); (o.lines || []).forEach(l => FD.snd('type', l.at, -9)); return (t, r) => {
  const gr = G[o.ground || 'fd5']; r = FD.rr(r, gr.bg); rect(r.x, r.y, r.w, r.h, gr.bg); const m = FD.m(r); const wide = r.w > r.h * 1.25;
  FD.kicker(t, o.kicker || 'COMMON MISTAKES', r.x + m, r.y + m + V(30, 32), V(32, 34), gr.mid, o.at);
  const s = wide ? Math.min(r.h * 0.6, r.w * 0.26) : Math.min(r.h * 0.3, r.w * 0.42); const cells = FD.seqs([[o.at, String(o.from || o.n)], [o.at + 0.15, String(o.n)]]);
  const cx = wide ? r.x + m : r.x + m, cy = wide ? r.y + r.h / 2 + s * 0.36 : r.y + m + V(0, 90) + s * 0.8; const cw = tw('0', FN(s));
  grp('count', cx, cy - s * 0.8, cw * 2.2, s * 0.86, () => { withA(fdE(t, o.at - 0.1, 0.25), () => FD.odo(t, cells, cx, cy, s));
    withA(fdE(t, o.at + 0.3, 0.3), () => txt('/ ' + (o.of || 4), cx + cw * 1.05, cy, FN(s * 0.42), FD.ink, 'left', 'alphabetic', 0, 'of'));
    const p = fdE(t, o.at + 0.35, 0.45); if (p > 0) rect(cx, cy + s * 0.07, cw * 0.9 * p, Math.max(10, s * 0.04), FD.ink); }, { label: 'mistake number' });
  const tx = wide ? cx + cw * 1.05 + tw('/ ' + (o.of || 4), FN(s * 0.42)) + m * 0.9 : r.x + m, aw = wide ? r.x + r.w - m - tx : r.w - 2 * m; let ty = wide ? r.y + r.h / 2 - ((o.lines || []).length - 1) * V(56, 0) : cy + V(120, 160);
  const zs = (o.lines || []).map((l, i) => { let z = l.size || (i === 1 ? V(124, 110) : V(72, 66)); const f = (zz) => (i === 1 ? FN(zz) : FS(zz, 500)); while (tw(i === 1 ? UP(l.s) : l.s, f(z)) > aw && z > 30) z -= 3; return z; });
  if (wide) ty = r.y + r.h / 2 - zs.reduce((a, z) => a + z * 1.12, 0) / 2 + zs[0] * 0.8;
  (o.lines || []).forEach((l, i) => { const z = zs[i]; if (i) ty += z * 0.86 + zs[i - 1] * 0.26; FD.words(t, i === 1 ? UP(l.s) : l.s, tx, ty, i === 1 ? FN(z) : FS(z, 500), FD.ink, 'm-line' + i, { at: l.at, stagger: 0.05 }); });
}; };

/* ---------- a full-frame correction screen (her rule 2026-11-02: small slips = a card or a corrected caption) ---------- */
/** big type on the ground with a mono "CORRECTION" mark; o.lines [{s, at}], o.ground */
FD.fix = (o) => FD.type({ ...o, kicker: o.kicker || 'CORRECTION' });
