/* learn-to-code: the look's kit, shared by the motion film (film.json scripts) and the talking-head edit, shorts and teaser
 * (talking-head.json "common"). Her pick 2026-11-02: B · YOU ARE THE REVIEWER (AI writes the code, you review it) + A's
 * missing-rung ladder redrawn in B's colours for the 4.5% part (RV.ladder).
 * Ground cool grey #E9EBEE; white sheets with a 3 px ink #1B1F24 border, flat (no shadows, no rounded corners). Diff green
 * #1A7F37 on #DDF6E3, red #CF222E on #FFE4E1. ONE accent: amber #F2A900, only for "you, the human" (and it never looks the
 * same twice: a side note, a margin comment on one line, a selection over the lines you read, a highlight on one word, an
 * approval stamp). Type: Onest 800/700/600 (headlines, sentences) + Martian Mono (code, labels >= 32 px, code >= 46 px 16:9).
 * Motion: code types on at 40 characters a second on her words, a removed line is struck in 0.3 s (outExpo), the note drops
 * 26 px in 0.4 s (outQuint), sheets slide up 60 px in 0.45 s, every hold gets a slow 2 % push.
 * Every helper returns draw(t, r) (r = the rect it fills), a pure function of time; every text txt()/RV.words (editable),
 * every block grp() (movable, resizable). RV_CLIPS (real page crops) comes from talking-head/assets/src/clips.js. */
'use strict';
(function rvFonts() {   // the look's faces (OFL), registered from the project's own font files (sync, before boot)
  const base = '/p/should-you-learn-to-code-in-2027/film/assets/fonts/';
  for (const [fam, file, desc] of [['RVMono', 'DMMono-Regular.ttf', { weight: '400' }], ['RVMono', 'DMMono-Medium.ttf', { weight: '500 900' }]]) {
    const x = new XMLHttpRequest(); x.open('GET', base + file, false); x.overrideMimeType('text/plain; charset=x-user-defined'); x.send();
    if (x.status !== 200) continue;
    const s = x.responseText, u = new Uint8Array(s.length); for (let i = 0; i < s.length; i++) u[i] = s.charCodeAt(i) & 255;
    const ff = new FontFace(fam, u.buffer, desc); document.fonts.add(ff); ff.load();
  }
})();
const RV = { g: '#E9EBEE', ink: '#1B1F24', dim: '#5F6670', wh: '#FFFFFF', add: '#DDF6E3', addI: '#1A7F37', del: '#FFE4E1', delI: '#CF222E', amb: '#F2A900', ambL: '#FFE3A1', field: '#F4F5F7', mid: '#AEB4BC' };
/* type set 03 Heavy + light (TYPE-SYSTEM.md): Helvetica Neue Bold 700 headlines (tracking -0.045em), Light 300 for the contrast
 * words, 400 body; DM Mono 500 small labels. Helvetica Neue is the Mac's own font, drawn by name, never copied. */
const FO = (s, w = 700) => `${w >= 650 ? 700 : w >= 450 ? 500 : w >= 350 ? 400 : 300} ${Math.round(s)}px "Helvetica Neue"`, FM = (s, w = 500) => `${w >= 450 ? 500 : 400} ${Math.round(s)}px RVMono`;
/** sentence case for a headline typed in caps (AI, US, I, Indeed, Q1, CS50 kept); o.cont: a continuation line (no capital) */
RV.KEEP = { AI: 'AI', "AI'S": "AI's", US: 'US', I: 'I', "I'M": "I'm", "I'D": "I'd", "I'LL": "I'll", INDEED: 'Indeed', "INDEED'S": "Indeed's", Q1: 'Q1', CS50: 'CS50', MDN: 'MDN', 'TRY-CATCH.': 'try-catch.', 'TRY-CATCH': 'try-catch' };
RV.sc = (str, cont) => { if (!/[A-Z]/.test(str) || /[a-z]/.test(str)) return str; let first = !cont;
  return str.split(' ').map((w) => { const k = RV.KEEP[w.replace(/[.,?:!]+$/, '')]; let o = k ? k + w.slice(w.replace(/[.,?:!]+$/, '').length) : w.toLowerCase();
    if (first && !k) o = o.charAt(0).toUpperCase() + o.slice(1); if (/[a-z0-9]/i.test(w)) first = /[.?!:]$/.test(w); return o; }).join(' '); };
G.rvGrey = { bg: RV.g, fg: RV.ink, mid: RV.dim, line: 'rgba(27,31,36,0.14)', acc: RV.amb, card: RV.wh, panel: '#DDE0E4', grid: 'rgba(0,0,0,0)', mode: 'light' };
G.rvInk = { bg: RV.ink, fg: '#FFFFFF', mid: RV.mid, line: 'rgba(255,255,255,0.14)', acc: RV.amb, card: RV.wh, panel: '#262B31', grid: 'rgba(0,0,0,0)', mode: 'dark' };
G.rvWhite = { bg: RV.wh, fg: RV.ink, mid: RV.dim, line: 'rgba(27,31,36,0.14)', acc: RV.amb, card: RV.g, panel: RV.field, grid: 'rgba(0,0,0,0)', mode: 'light' };
G.rvGreyB = { ...G.rvGrey }; G.rvInkB = { ...G.rvInk };   // same colours, another key: the film cuts hard between two grey scenes (no engine whip on every cut)
F.disp = (s) => FO(s); F.body = (s, w = 700) => FO(s, Math.max(500, Math.min(800, w))); F.mono = (s) => FM(s); F.serif = (s) => FO(s, 800);
LS.disp = -0.01; LS.mono = 0; LS.serif = -0.01;
if (typeof PLATE !== 'undefined') { PLATE.rv = [RV.wh, RV.ink, RV.amb]; PLATE.rvAmb = [RV.amb, RV.ink, RV.ink]; }
const rvE = (t, t0, d, e = 'outQuint') => MOTION.ease(t, t0, d, e);
RV.q = []; RV.snd = (role, t, db) => { if (t != null && t < 1e8 && isFinite(t)) RV.q.push([role, t, db]); };
/** queued sound cues -> sfx (one per 0.3 s at most, the first wins) */
RV.flush = (db = -4) => { const have = CUES.map(c => c.t);
  for (const [role, t, d] of RV.q.sort((a, b) => a[1] - b[1])) { if (t < 0 || t > TOTAL || have.some(h => Math.abs(h - t) < 0.3)) continue; sfx(role, t, d != null ? d : db); have.push(t); } RV.q = []; };
RV.short = () => typeof FOOT !== 'undefined' && !!(FOOT.m && FOOT.m.kind === 'short');
/** the time she starts a word inside a phrase (first match after `after`), else the phrase start */
function WT(ph, word, after = 0) {
  const n = (s) => s.toLowerCase().replace(/[’]/g, "'").replace(/[^a-z0-9']/g, '');
  const want = String(word).split(/\s+/).map(n); const ws = WORDS.slice(ph.i, ph.i + ph.w.length);
  for (let k = 0; k <= ws.length - want.length; k++) if (ph.w[k] >= after && want.every((x, j) => ws[k + j].n === x)) return ph.w[k];
  return ph.t;
}
/** shorts: a graphic that reaches the top of the 9:16 frame starts below her top label */
RV.rr = (r, gk = 'rvGrey') => {
  if (!PORTRAIT || !RV.short()) return r; const lb = TH.labelBottom(); if (!(lb > 0)) return r;
  const m = ctx.getTransform(), sy = m.d / BASE[3], y0 = (m.d * r.y + m.f - BASE[5]) / BASE[3];
  if (y0 >= lb + 20) return r; const d = (lb + 28 - y0) / (sy || 1);
  rect(r.x, r.y, r.w, r.h, G[gk].bg); return { x: r.x, y: r.y + d, w: r.w, h: r.h - d };
};
const rvGround = (r, gk) => rect(r.x, r.y, r.w, r.h, (G[gk] || G.rvGrey).bg);
/** a tall 9:16 frame: the content sits in the middle band (y ~ 17-83 %), not stuck to the top */
RV.band = (r) => (PORTRAIT && r.h > 1500 ? { x: r.x, y: r.y + r.h * 0.17, w: r.w, h: r.h * 0.6 } : r);
/** the share of the rect a small graphic uses (a split strip is narrow): scale factor vs a full 16:9 frame */
/** the caption band a full-frame 16:9 graphic leaves free in the talking-head edit (the film has no captions) */
RV.capRoom = (r) => (typeof FOOT !== 'undefined' && FOOT.m && !PORTRAIT && r.h >= H - 2 ? 190 : 0);
RV.k = (r) => (PORTRAIT ? clamp(r.w / 1080, 0.72, 1) : clamp(Math.min(r.w / 1920, r.h / 1080) * 1.25, 0.72, 1));   // 9:16 panels: by width (a short's top panel is full width)

/** a line of type that lands word by word (rise 18 px, 0.3 s) on her word times; editable as one text.
 *  o.times (one per word) | o.at; o.cols {i: colour}; o.amb [i]: an amber box behind word i (you); o.strike {i: time};
 *  o.align 'left'|'center'; o.maxW: shrinks to fit. Returns the drawn width. */
RV.words = (t, s, x, y, size, col, o = {}) => {
  s = o.keepCase ? s : RV.sc(s, o.cont); const ov = ovr(o.key || s); const str = ov.s != null ? ov.s : s; const ws = str.split(/\s+/).filter(Boolean);
  let z = size; const ls = -z * ((o.w || 700) >= 650 ? 0.045 : 0.02); if (o.maxW) while (tw(str, FO(z, o.w || 800), ls) > o.maxW && z > 28) z -= 2;
  const f = FO(z, o.w || 800); const sp = tw(' ', f, ls); const total = tw(str, f, ls);
  const times = ov.s != null ? ws.map(() => (o.times ? o.times[0] : o.at || 0)) : ws.map((_, i) => (o.times ? o.times[Math.min(i, o.times.length - 1)] : o.at || 0));
  let x0 = o.align === 'center' ? x - total / 2 : o.align === 'right' ? x - total : x;
  const bx = x0;
  if (ov.hide) { regBox(ov, bx, y - z * 0.8, total, z * 1.05, { text: str, def: s }); return total; }
  moved(ov, () => {
    ws.forEach((w, i) => { const p = rvE(t, times[i], 0.3); const ww = tw(w, f, ls);
      if (p > 0) withA(Math.min(1, p * 1.4), () => { const dy = 18 * (1 - p);
        if (o.amb && o.amb.includes(i) && ov.s == null) { const q = rvE(t, times[i] + 0.08, 0.32, 'outExpo'); rect(x0 - z * 0.12, y - z * 0.82 + dy, (ww + z * 0.24) * q, z * 1.04, RV.amb); }
        _txt(w, x0, y + dy, f, (o.cols && o.cols[i]) || col, 'left', 'alphabetic', ls);
        if (o.strike && o.strike[i] != null && ov.s == null) { const q = rvE(t, o.strike[i], 0.3, 'outExpo'); rect(x0, y - z * 0.32, ww * q, Math.max(4, z * 0.07), RV.delI); } });
      x0 += ww + sp; });
    regBox(ov, bx, y - z * 0.8, total, z * 1.05, { text: str, def: s });
  });
  return total;
};
/** a stack of headline lines [{s, times|at, cols, amb, size}] from (x, y) down; returns the bottom y */
RV.head = (t, lines, x, y, size, col, o = {}) => { let yy = y;
  lines.forEach((l, i) => { const z = l.size || size; yy += i ? z * 1.04 : 0;
    RV.words(t, l.s, o.align === 'center' ? x : x, yy, z, l.col || col, { times: l.times, at: l.at, cols: l.cols, amb: l.amb, strike: l.strike, key: (o.key || 'head') + i, maxW: o.maxW, align: o.align,
      cont: i > 0 && !/[.?!:]$/.test(lines[i - 1].s), w: l.w || (i > 0 && lines.length > 1 && !(l.cols && Object.keys(l.cols).length) && !(l.amb && l.amb.length) ? 300 : 700) }); });
  return yy + size * 0.25; };

/* ---------- the review sheet: a code / text file with diff lines ----------
 * o: file, tag, at (sheet slides up), fs, lines [{s, k: ' '|'+'|'-', at, strikeAt, b (bold), c (colour)}],
 *    err {s: [..], at, goneAt} (a red error bar under the sheet), status {l, r, at, lc, rc} (a white status bar),
 *    sel {from, to, at, goneAt} (amber selection over lines from..to: you reading them),
 *    comment {line, s: [..], at} (your amber margin comment on one line), note {s: [..], at, by} (your amber side note),
 *    title [{s, times, cols, amb}] (headline above the sheet), box [fx, fy, fw] (placement inside r), ground. */
RV.sheet = (o) => { (o.lines || []).forEach((l, i) => { if (l.at != null && i) RV.snd(l.k === '+' ? 'typeHit' : 'tick', l.at, l.k === '+' ? -3 : -6); if (l.strikeAt != null) RV.snd('mark', l.strikeAt, -3); });
  if (o.err) { RV.snd('error', o.err.at, -8); if (o.err.goneAt != null) RV.snd('glitch', o.err.goneAt, -6); }
  if (o.comment) RV.snd('pop', o.comment.at, -3); if (o.note) RV.snd('notify', o.note.at, -5); if (o.status) RV.snd('tick', o.status.at, -4);
  if (o.at != null) RV.snd('paper', o.at, -4);
  return (t, r) => RV.sheet_(t, r, o); };
RV.sheet_ = (t, r, o) => {
  const gk = o.ground || 'rvGrey'; r = RV.rr(r, gk); rvGround(r, gk); r = RV.band(r); const k = RV.k(r); const m = V(80, 56) * k;
  let y = r.y + m;
  if (o.title) y = RV.head(t, o.title, r.x + m, y + V(96, 100) * k * 0.8, (o.titleSize || V(96, 100)) * k, (G[gk] || G.rvGrey).fg, { key: 'sheet-title', maxW: r.w - 2 * m }) + V(40, 44) * k;
  let lines = o.lines || []; if (o.at != null) { const fi = lines.findIndex(l => l.at != null); if (fi >= 0 && lines[fi].at > o.at + 0.35 && !lines.slice(0, fi).some(l => l.at == null)) lines = lines.map((l, i) => (i === fi ? { ...l, at: o.at + 0.35 } : l)); }   // never an empty sheet
  let fs = (o.fs || V(46, 40)) * Math.max(k, 0.8) * (!PORTRAIT && r.w >= W - 2 ? 1.22 : 1);
  const side = !PORTRAIT && (o.note || o.side) && r.w > 1300; const sideW = side ? Math.min(560, r.w * 0.28) : 0;
  let w = Math.min(o.w || 1e9, r.w - 2 * m - (side ? sideW + 50 : 0));
  const longest = lines.reduce((a, l) => (l.s.length > a.length ? l.s : a), '');
  const need = (fz) => tw(longest, FM(fz)) + fz * 1.4 + 60; while (need(fs) > w && fs > 22) fs -= 1;
  if (o.fit !== false) w = Math.min(w, Math.max(need(fs) + (o.comment ? 0 : 40), o.minW != null ? o.minW : V(820, r.w - 2 * m)));
  const extra = (o.err ? 1.35 * o.err.s.length + 1.4 : 0) + (o.status ? 2.6 : 0) + (o.note && !side ? 4 : 0) + (o.comment && !(!PORTRAIT && r.w > 1300) ? 3 : 0);
  const availH = r.y + r.h - y - m * 0.6 - RV.capRoom(r) - (o.capRoom || 0);
  while (fs > 24 && Math.max(fs * 1.8, 70) + lines.length * fs * 1.55 + fs * (0.7 + extra) > availH) fs -= 1;
  const lh = fs * 1.55, hd = Math.max(fs * 1.8, 70); const h = hd + lines.length * lh + fs * 0.7;
  const x = o.box ? r.x + r.w * o.box[0] : r.x + m; if (o.box && o.box[1] != null) y = r.y + r.h * o.box[1];
  const a = o.at == null ? 1 : rvE(t, o.at, 0.45);
  ctx.save(); ctx.translate(0, 60 * (1 - a)); ctx.globalAlpha *= Math.min(1, a * 1.6);
  grp('sheet-' + (o.id || o.file), x, y, w, h, () => {
    rect(x, y, w, h, RV.wh); rvLine(x, y, w, h); rect(x, y, w, hd, RV.ink);
    const lz = Math.max(32, Math.min(fs * 0.78, 36)); txt(o.file, x + 26, y + hd * 0.64, FM(lz, 600), RV.wh, 'left', 'alphabetic', 0, 'sheet-file');
    if (o.tag && w > tw(o.file, FM(36, 600)) + tw(o.tag, FM(36)) + 90) txt(o.tag, x + w - 26, y + hd * 0.64, FM(lz), RV.mid, 'right', 'alphabetic', 0, 'sheet-tag');
    lines.forEach((l, i) => { const ly = y + hd + fs * 0.35 + i * lh; const p = l.at == null ? 1 : rvE(t, l.at, 0.25); if (p <= 0) return;
      const selOn = o.sel && i >= o.sel.from && i <= o.sel.to ? rvE(t, o.sel.at + (i - o.sel.from) * 0.08, 0.3, 'outExpo') * (o.sel.goneAt != null ? 1 - rvE(t, o.sel.goneAt, 0.3) : 1) : 0;
      withA(p, () => {
        if (l.k === '+') rect(x + 3, ly, w - 6, lh, RV.add); else if (l.k === '-') rect(x + 3, ly, w - 6, lh, RV.del);
        if (selOn > 0) { rect(x + 3, ly, (w - 6) * selOn, lh, RV.ambL); rect(x + 3, ly, 8, lh, RV.amb); }
        if (l.k !== ' ' && l.k) _txt(l.k, x + 24, ly + lh * 0.68, FM(fs, 700), l.k === '+' ? RV.addI : RV.delI);
        const n = l.at == null || l.noType ? l.s.length : Math.floor(clamp((t - l.at) * 40, 0, l.s.length));
        const ov = ovr('line' + i + '-' + (o.id || o.file)); const full = ov.s != null ? ov.s : l.s; const s = ov.s != null ? full : full.slice(0, n);
        moved(ov, () => { _txt(s, x + 24 + fs * 1.4, ly + lh * 0.68, FM(fs, l.b ? 700 : 400), l.c || RV.ink); regBox(ov, x + 24 + fs * 1.4, ly + lh * 0.2, Math.max(40, tw(full, FM(fs))), lh * 0.62, { text: full, def: l.s }); });
        if (l.k === '-' && l.strikeAt != null) { const q = rvE(t, l.strikeAt, 0.3, 'outExpo'); rect(x + 24 + fs * 1.4, ly + lh * 0.48, tw(s, FM(fs)) * q, 4, RV.delI); }
        if (l.mark) withA(rvE(t, l.markAt == null ? l.at || 0 : l.markAt, 0.3), () => txt(l.mark, x + w - 26, ly + lh * 0.68, FM(Math.max(fs * 0.8, 32), 700), RV.delI, 'right', 'alphabetic', 0, 'mark' + i));
      }); });
  }, { label: 'review sheet (drag, resize)' });
  let yb = y + h;
  if (o.err) { const ea = rvE(t, o.err.at, 0.3) * (o.err.goneAt == null ? 1 : 1 - rvE(t, o.err.goneAt, 0.35)); const ez_ = Math.max(32, fs * 0.86); const eh = ez_ * (1.35 * o.err.s.length + 0.7);
    if (ea > 0) withA(ea, () => grp('error', x, yb + 16, w, eh, () => { rect(x, yb + 16, w, eh, RV.delI); o.err.s.forEach((l, i) => txt(l, x + 26, yb + 16 + ez_ * (1.3 + i * 1.35), FM(ez_, 600), RV.wh, 'left', 'alphabetic', 0, 'err' + i)); }));
    yb += 16 + eh; }
  if (o.status) { const sa = rvE(t, o.status.at, 0.35); const bh = Math.max(80, fs * 2); const sy = yb + 20; const sz = Math.max(32, fs * 0.8);
    if (sa > 0) withA(sa, () => grp('status', x, sy, w, bh, () => { rect(x, sy, w, bh, RV.wh); rvLine(x, sy, w, bh);
      txt(o.status.l, x + 26, sy + bh * 0.64, FM(sz, 600), o.status.lc || RV.addI, 'left', 'alphabetic', 0, 'status-l');
      if (o.status.r) txt(o.status.r, x + w - 26, sy + bh * 0.64, FM(sz, 600), o.status.rc || RV.delI, 'right', 'alphabetic', 0, 'status-r'); }));
    yb = sy + bh; }
  if (o.comment) { const c = o.comment; const p = rvE(t, c.at, 0.4); const li = c.line; const ly = y + hd + fs * 0.35 + li * lh;
    if (p > 0) { const cz = Math.max(36, fs * 0.95) * (PORTRAIT ? 1.05 : 1); const cw = Math.min(V(620, 900), Math.max(tw(c.by || 'YOU', FM(32, 700)), ...c.s.map(s => tw(s, FO(cz, 700)))) + 60); const ch = cz * 1.25 * c.s.length + cz * 1.6;
      let cx = x + w + 40, cy = ly - ch * 0.25; if (cx + cw > r.x + r.w - 30) { cx = Math.max(x, Math.min(x + w - cw, r.x + r.w - 30 - cw)); cy = yb + 20; yb = cy + ch; }
      withA(Math.min(1, p * 1.5), () => { ctx.save(); ctx.translate(0, 26 * (1 - p));
        rect(x + 3, ly, 8, lh, RV.amb); if (cx > x + w) rect(x + w, ly + lh / 2 - 2, cx - x - w, 4, RV.amb);
        grp('comment', cx, cy, cw, ch, () => { rect(cx, cy, cw, ch, RV.amb); rvLine(cx, cy, cw, ch);
          txt(c.by || 'YOU', cx + 26, cy + cz * 0.95, FM(32, 700), RV.ink, 'left', 'alphabetic', 0, 'comment-by');
          c.s.forEach((s, i) => txt(s, cx + 26, cy + cz * 1.95 + i * cz * 1.2, FO(cz, 700), RV.ink, 'left', 'alphabetic', 0, 'comment' + i)); });
        ctx.restore(); }); } }
  if (o.note) { const nz = (o.note.fs || V(56, 60)) * Math.max(k, 0.85);
    if (side) RV.note(t, o.note.at, x + w + 50, o.note.y != null ? r.y + r.h * o.note.y : y + hd, sideW, o.note.s, nz, o.note.by);
    else RV.note(t, o.note.at, x, yb + 26, w, o.note.s, nz, o.note.by); }
  ctx.restore();
};
/** your review note: an amber block, "YOU, REVIEWING" (or o.by), your words */
RV.note = (t, at, x, y, w, lines, fs, by = 'YOU, REVIEWING') => {
  const p = rvE(t, at, 0.4); if (p <= 0) return 0; const lh = fs * 1.18, h = 70 + lines.length * lh + fs * 0.4;
  withA(Math.min(1, p * 1.5), () => { ctx.save(); ctx.translate(0, 26 * (1 - p));
    grp('note', x, y, w, h, () => { rect(x, y, w, h, RV.amb); rvLine(x, y, w, h);
      txt(by, x + 28, y + 52, FM(32, 700), RV.ink, 'left', 'alphabetic', 0, 'note-by');
      lines.forEach((l, i) => txt(l, x + 28, y + 70 + fs * 0.9 + i * lh, FO(fs, 700), RV.ink, 'left', 'alphabetic', 0, 'note' + i)); });
    ctx.restore(); });
  return h;
};
/** an approval stamp: amber box, ink type, lands like a press (scale 1.15 -> 1 in 0.14 s) */
RV.stamp = (t, at, s, x, y, size, o = {}) => { if (t < at) return; const p = clamp((t - at) / 0.14); const sc = lerp(1.15, 1, E.outQuint(p));
  if (o.maxW) while (size > 24 && tw(s, FO(size, 800)) + size * 0.7 > o.maxW) size -= 2; if (o.maxW && o.left != null) x = Math.min(x, o.left + (tw(s, FO(size, 800)) + size * 0.7) / 2);
  const f = FO(size, 800); const w = tw(s, f) + size * 0.7, h = size * 1.3;
  withT(x, y, sc, o.rot || 0, () => grp('stamp-' + (o.key || s), -w / 2, -h / 2, w, h, () => { rect(-w / 2, -h / 2, w, h, o.col || RV.amb); rvLine(-w / 2, -h / 2, w, h);
    txt(s, 0, size * 0.36, f, o.col ? RV.wh : RV.ink, 'center', 'alphabetic', 0, 'stamp-' + (o.key || s)); })); };

/* ---------- a real page (Indeed Hiring Lab crops), on a white sheet with the site in the ink bar and the credit under it ----------
 * o: t0, hl (highlight time, amber: you marking it) | hls [..], title [{s, times, cols, amb}], big {s, at, sub, subAt} (a big number
 * beside / under it), w (sheet width), align 'center', valign 'center', ground. In 9:16 the '-p' crop is used when it exists. */
RV.page = (key, o = {}) => { if (o.hl != null) RV.snd('mark', o.hl, -3); if (o.t0 != null) RV.snd('paper', o.t0, -4); if (o.big) RV.snd('typeHit', o.big.at, -2); return (t, r) => RV.page_(t, r, key, o); };
RV.page_ = (t, r, key, o) => {
  const gk = o.ground || 'rvGrey'; r = RV.rr(r, gk); rvGround(r, gk); r = RV.band(r); const gr = G[gk];
  if (PORTRAIT && RV_CLIPS[key + '-p'] && o.full !== true) key = key + '-p';
  const c = RV_CLIPS[key], im = IMG['clip_' + key]; if (!c) return; const k = RV.k(r); const m = V(80, 56) * Math.max(k, 0.8);
  let y = r.y + m;
  if (o.title) y = RV.head(t, o.title, r.x + m, y + (o.titleSize || V(96, 100)) * k * 0.8, (o.titleSize || V(96, 100)) * k, gr.fg, { key: 'page-title', maxW: r.w - 2 * m }) + V(44, 48) * k;
  const bigH = o.big ? (o.bigSize || V(260, 240)) * k * 1.1 + (o.big.sub ? V(70, 70) : 0) : 0;
  const bigBeside = o.big && !PORTRAIT && r.w > 1400 && o.beside === true;
  const pad = V(24, 22), head = V(62, 62); let w = Math.min(o.w || 1e9, r.w - 2 * m - (bigBeside ? 620 : 0));
  const maxS = o.maxScale || (PORTRAIT ? 2.0 : 1.75);
  let s = Math.min(maxS, (w - 2 * pad) / c.w); let ih = c.h * s;
  const availH = r.y + r.h - m - y - (bigBeside ? 0 : bigH) - V(60, 60) - (o.capRoom || 0) - RV.capRoom(r);
  if (ih + 2 * pad + head > availH) { s = (availH - 2 * pad - head) / c.h; ih = c.h * s; }
  w = c.w * s + 2 * pad; const h = ih + 2 * pad + head;
  const x = o.align === 'center' ? r.x + (r.w - w - (bigBeside ? 620 : 0)) / 2 : r.x + m; const yy = o.valign === 'center' ? Math.max(y, r.y + (r.h - h - (bigBeside ? 0 : bigH)) / 2) : y;
  const a = rvE(t, o.t0 || 0, 0.45);
  withA(Math.min(1, a * 1.6), () => withT(0, 60 * (1 - a), 1, 0, () => grp('page-' + key, x, yy, w, h, () => {
    rect(x, yy, w, h, RV.wh); rvLine(x, yy, w, h); rect(x, yy, w, head, RV.ink);
    const site = (c.url || '').replace(/^https?:\/\//, '').split('/')[0]; txt(site, x + pad, yy + head * 0.66, FM(Math.min(32, (w - 2 * pad) / 22), 500), RV.wh, 'left', 'alphabetic', 0, 'page-site');
    if (im) themeFixed(() => ctx.drawImage(im, x + pad, yy + head + pad, c.w * s, ih));
    (c.hl || []).forEach((b, i) => { const at = o.hls ? o.hls[i] : (o.hl == null ? null : o.hl + i * 0.3); if (at == null) return;
      const p = rvE(t, at, 0.42, 'outExpo'); if (p <= 0) return;
      ctx.save(); ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = RV.amb; ctx.globalAlpha *= 0.55; ctx.fillRect(x + pad + b[0] * s - 3, yy + head + pad + b[1] * s, (b[2] * s + 6) * p, b[3] * s); ctx.restore(); });
  }, { img: true, label: 'real page (drag, resize)' })));
  withA(a, () => txt('Source: ' + c.source, x, yy + h + V(46, 46), FM(32, 500), gr.mid, 'left', 'alphabetic', 0, 'page-credit'));
  if (o.big) { const bz = (o.bigSize || V(260, 240)) * k; let bx, by;
    if (bigBeside) { bx = x + w + 70; by = yy + bz * 0.82; } else { bx = x; by = yy + h + V(60, 70) + bz * 0.9; }
    const p = rvE(t, o.big.at, 0.35); if (p > 0) withA(Math.min(1, p * 1.5), () => { RV.words(t, o.big.s, bx, by + 20 * (1 - p), bz, o.big.col || RV.delI, { at: o.big.at, key: 'page-big', maxW: bigBeside ? r.x + r.w - bx - m : r.w - 2 * m });
      if (o.big.sub) txtW(o.big.sub, bx, by + bz * 0.28 + V(62, 62), FO(V(52, 48) * Math.max(k, 0.85), 700), gr.fg, bigBeside ? r.x + r.w - bx - m : r.w - 2 * m, V(62, 58), 0, 'page-big-sub'); }); }
};

/* ---------- A's missing rung, redrawn in B's colours (the 4.5 % part) ----------
 * an ink ladder; rungs labelled by level; the bottom (entry-level) rung falls out with gravity at o.dropAt (0.6 s) and leaves
 * a dashed red outline with o.low ("ENTRY LEVEL 4.5%"); o.high on the top rung ("SENIOR 69.3%"); o.title above. */
RV.ladder = (o) => { RV.snd('paper', o.at, -4); RV.snd('error', o.dropAt, -9); RV.snd('tick', o.highAt, -4); return (t, r) => {
  const gk = o.ground || 'rvGrey'; r = RV.rr(r, gk); rvGround(r, gk); r = RV.band(r); const gr = G[gk]; const k = RV.k(r); const m = V(80, 56) * k;
  let y = r.y + m; if (o.title) y = RV.head(t, o.title, r.x + m, y + V(96, 100) * k * 0.8, V(96, 100) * k, gr.fg, { key: 'ladder-title', maxW: r.w - 2 * m }) + V(30, 40) * k;
  const a = rvE(t, o.at, 0.45); const lw = Math.min(V(380, 420), r.w * 0.36), wid = Math.max(8, 10 * k);
  const top = y + 20, bot = r.y + r.h - m - V(20, 60); const lx = r.x + (o.lx != null ? o.lx * r.w : m + 20);
  const n = o.rungs || 5; const gap = (bot - top - 40) / n;
  withA(a, () => withT(0, 60 * (1 - a), 1, 0, () => grp('ladder', lx - wid, top, lw + 2 * wid, bot - top, () => {
    rect(lx - wid, top, wid, bot - top, RV.ink); rect(lx + lw, top, wid, bot - top, RV.ink);
    for (let i = 0; i < n; i++) { const ry = top + 40 + i * gap; const last = i === n - 1;
      if (!last) { rect(lx, ry, lw, wid, RV.ink); continue; }
      const dp = o.dropAt == null ? 0 : clamp((t - o.dropAt) / 0.6); const fall = dp * dp * (r.y + r.h - ry + 60);
      if (dp < 1) withA(1 - dp * 0.3, () => withT(lx + lw / 2, ry + fall, 1, dp * 0.5, () => rect(-lw / 2, 0, lw, wid, RV.ink)));
      if (dp > 0) { ctx.save(); ctx.setLineDash([12, 10]); ctx.strokeStyle = RV.delI; ctx.lineWidth = 2; ctx.strokeRect(lx + 6, ry, lw - 12, wid); ctx.restore(); } }
  }, { label: 'ladder (drag, resize)' })));
  const lz = Math.min(Math.max(36, V(44, 44) * k), (bot - top) / 7.4); const tx = lx + lw + wid + 34;   // 2026-11-10: small panels (sh01 pop-up card) shrink the labels so high / low never touch
  if (o.high) withA(rvE(t, o.highAt, 0.35), () => { txt(o.high[0], tx, top + 40 + lz * 0.8, FM(lz, 700), gr.fg, 'left', 'alphabetic', 0, 'ladder-high');
    if (o.high[1]) txt(o.high[1], tx, top + 40 + lz * 2.6, FO(lz * 1.5, 800), gr.fg, 'left', 'alphabetic', 0, 'ladder-high2'); });
  if (o.low) withA(rvE(t, o.dropAt + 0.3, 0.35), () => { const ry0 = top + 40 + (n - 1) * gap; const ly = Math.max(ry0 - lz * 1.4, top + 40 + lz * (o.high && o.high[1] ? 4.4 : 2.4)); txt(o.low[0], tx, ly, FM(lz, 700), RV.delI, 'left', 'alphabetic', 0, 'ladder-low');   // 2026-11-10: always a clear gap under the high label
    if (o.low[1]) txt(o.low[1], tx, ly + lz * 2.0, FO(lz * 1.7, 800), RV.delI, 'left', 'alphabetic', 0, 'ladder-low2'); });
}; };

/* ---------- big type on a ground: o.lines [{s, times|at, cols, amb, strike, size}], o.kicker (mono, top), o.sub (a sentence
 * under it), o.stamp {s, at} (amber approval), o.valign 'center', o.align 'center', o.side (a small sheet beside it) ---------- */
RV.type = (o) => { (o.lines || []).forEach((l, i) => RV.snd(i ? 'tick' : 'typeHit', l.at != null ? l.at : (l.times || [])[0], i ? -6 : -3)); if (o.stamp) RV.snd('typeHit', o.stamp.at, 0); return (t, r) => {
  const gk = o.ground || 'rvGrey'; r = RV.rr(r, gk); rvGround(r, gk); const gr = G[gk]; const k = RV.k(r); const m = V(96, 64) * k;
  const z = (o.size || V(150, 132)) * k; let lines = o.lines || [];
  { const st = o.t0 != null ? o.t0 : o.kickerAt; if (st != null && lines[0] && lines[0].at != null && lines[0].at > st + 0.3) lines = [{ ...lines[0], at: st + 0.3, times: undefined }, ...lines.slice(1)]; }   // never only a kicker on screen
  if (PORTRAIT) { const mw = r.w - 2 * m; lines = lines.flatMap((l) => { const ws = l.s.split(' '); if (ws.length < 2 || tw(l.s, FO((l.size || z), 800)) <= mw) return [l];
    let bi = 1, bm = 1e9; for (let q = 1; q < ws.length; q++) { const mm = Math.max(tw(ws.slice(0, q).join(' '), FO(z, 800)), tw(ws.slice(q).join(' '), FO(z, 800))); if (mm < bm) { bm = mm; bi = q; } }
    const sub = (a, b) => { const c = {}; for (const [i, v] of Object.entries(l.cols || {})) if (+i >= a && +i < b) c[+i - a] = v; return c; };
    const am = (a, b) => (l.amb || []).filter(i => i >= a && i < b).map(i => i - a);
    return [{ ...l, s: ws.slice(0, bi).join(' '), cols: sub(0, bi), amb: am(0, bi) }, { ...l, s: ws.slice(bi).join(' '), cols: sub(bi, ws.length), amb: am(bi, ws.length), at: l.at != null ? l.at + 0.12 : l.at }]; }); }
  const totH = lines.length * z * 1.04 + (o.kicker ? 80 : 0) + (o.sub ? 120 : 0) + (o.stamp ? z * 1.4 : 0);
  let y = o.valign === 'top' ? r.y + m : r.y + Math.max(m, (r.h - totH) / 2); const cx = o.align === 'center' ? r.x + r.w / 2 : r.x + m;
  if (o.kicker) { withA(rvE(t, o.kickerAt != null ? o.kickerAt : (lines[0] || {}).at || 0, 0.3), () => txt(o.kicker, cx, y + 36, FM(Math.max(34, 38 * k), 700), o.kickerCol || gr.mid, o.align === 'center' ? 'center' : 'left', 'alphabetic', 2, 'type-kicker')); y += 80; }
  y = RV.head(t, lines, cx, y + z * 0.82, z, gr.fg, { key: 'type', maxW: r.w - 2 * m, align: o.align }) ;
  if (o.sub) { const sa = rvE(t, o.subAt || 0, 0.35); withA(sa, () => txtW(o.sub, o.align === 'center' ? r.x + m : cx, y + 70, FO(V(48, 50) * Math.max(k, 0.85), 600), gr.mid === RV.mid ? '#D5D9DE' : RV.dim, r.w - 2 * m, V(60, 62), 0, 'type-sub')); y += 120; }
  if (o.stamp) RV.stamp(t, o.stamp.at, o.stamp.s, o.align === 'center' ? r.x + r.w / 2 : cx + tw(o.stamp.s, FO(z * 0.5, 800)) / 2 + z * 0.35, y + z * 0.75, z * 0.5, { key: 'type', col: o.stamp.col, maxW: r.w - 2 * m, left: r.x + m });
}; };

/** a skill title: "SKILL 2 OF 4" + "+ Debugging" (the syllabus diff line), four boxes for progress; o.n, o.name, o.at, ground ink */
RV.skill = (o) => { RV.snd('typeHit', o.at, -1); RV.snd('tick', o.nameAt || o.at + 0.2, -5); return (t, r) => {
  const gk = o.ground || 'rvInk'; r = RV.rr(r, gk); rvGround(r, gk); const gr = G[gk]; const k = RV.k(r); const m = V(110, 70) * k;
  const cy = r.y + r.h * 0.46; const z = V(170, 140) * k;
  withA(rvE(t, o.at, 0.3), () => { txt('SKILL ' + o.n + ' OF 4', r.x + m, cy - z * 0.95, FM(Math.max(34, 40 * k), 700), gr.mid, 'left', 'alphabetic', 3, 'skill-k');
    for (let i = 0; i < 4; i++) { const bx = r.x + m + i * 46 * Math.max(k, 0.8) + tw('SKILL ' + o.n + ' OF 4', FM(Math.max(34, 40 * k), 700), 3) + 40; const bs = 30 * Math.max(k, 0.8);
      const on = i < o.n ? rvE(t, o.at + 0.15 + i * 0.07, 0.25) : 0; rvLine(bx, cy - z * 0.95 - bs, bs, bs); if (on > 0) rect(bx + 3, cy - z * 0.95 - bs + 3, (bs - 6) * on, bs - 6, i === o.n - 1 ? RV.addI : gr.mid); } });
  const nameAt = o.nameAt || o.at + 0.2;
  withA(rvE(t, nameAt, 0.3), () => _txt('+', r.x + m, cy + z * 0.3, FM(z * 0.8, 700), '#3FB950'));
  const lines = [].concat(o.name);
  lines.forEach((l, i) => RV.words(t, l, r.x + m + z * 0.75, cy + z * 0.3 + i * z * 1.02, z, gr.fg, { at: nameAt + i * 0.15, key: 'skill-name' + i, maxW: r.w - 2 * m - z * 0.75 }));
  if (o.sub) withA(rvE(t, o.subAt || nameAt + 0.4, 0.35), () => txtW(o.sub, r.x + m + z * 0.75, cy + z * 0.3 + lines.length * z * 1.02 + 10, FO(V(48, 46) * Math.max(k, 0.85), 600), gr.mid, r.w - 2 * m - z, V(60, 58), 0, 'skill-sub'));
}; };

/** a sign-up form (generic): email filled, a status line: o.msg {s, at, col}, o.btnAt (the button presses), o.title */
RV.form = (o) => { RV.snd('tick', o.btnAt, -2); if (o.msg) RV.snd(o.msg.col === RV.addI ? 'notify' : 'error', o.msg.at, -8); return (t, r) => {
  const gk = o.ground || 'rvGrey'; r = RV.rr(r, gk); rvGround(r, gk); r = RV.band(r); const k = RV.k(r); const fw = Math.min(V(900, 940), r.w - 2 * V(80, 56)) ; const fh = V(560, 620) * Math.max(k, 0.8);
  const x = r.x + (r.w - fw) / 2, y = r.y + (r.h - fh) / 2 + (o.dy || 0); const a = rvE(t, o.at || 0, 0.45); const z = V(48, 52) * Math.max(k, 0.85);
  withA(a, () => withT(0, 60 * (1 - a), 1, 0, () => grp('form', x, y, fw, fh, () => {
    rect(x, y, fw, fh, RV.wh); rvLine(x, y, fw, fh); txt('Create your account', x + 44, y + 90, FO(z * 1.2, 800), RV.ink, 'left', 'alphabetic', 0, 'form-title');
    txt('Email', x + 44, y + 170, FO(Math.max(32, z * 0.7), 600), RV.dim, 'left', 'alphabetic', 0, 'form-label');
    const err = o.msg && t >= o.msg.at && o.msg.col !== RV.addI; rect(x + 44, y + 192, fw - 88, z * 1.8, RV.field); rvLine(x + 44, y + 192, fw - 88, z * 1.8);
    txt('ada@example.com', x + 70, y + 192 + z * 1.18, FM(Math.max(32, z * 0.75)), RV.ink, 'left', 'alphabetic', 0, 'form-email');
    const press = o.btnAt != null && t >= o.btnAt && t < o.btnAt + 0.18; const by = y + 192 + z * 1.8 + 36;
    rect(x + 44, by + (press ? 4 : 0), fw - 88, z * 1.7, RV.ink); txt('Sign up', x + fw / 2, by + z * 1.12 + (press ? 4 : 0), FO(z * 0.9, 700), RV.wh, 'center', 'alphabetic', 0, 'form-btn');
    if (o.msg) withA(rvE(t, o.msg.at, 0.3), () => txt(o.msg.s, x + 44, by + z * 1.7 + 80, FO(z * 0.95, 700), o.msg.col || RV.delI, 'left', 'alphabetic', 0, 'form-msg'));
  }, { label: 'sign-up form (drag, resize)' })));
}; };

/** the payment webhook: a provider box -> your server box; the message travels at o.sendAt, again at o.againAt; the orders list
 *  under the server gets one row, then a second (red, x2); o.note {s, at}: your amber note ("Ready for it twice?") */
RV.flow = (o) => { RV.snd('swipe', o.sendAt, -4); RV.snd('notify', o.sendAt + 0.6, -6); if (o.againAt != null) { RV.snd('swipe', o.againAt, -4); RV.snd('error', o.againAt + 0.6, -8); } if (o.note) RV.snd('pop', o.note.at, -3); return (t, r) => {
  const gk = o.ground || 'rvGrey'; r = RV.rr(r, gk); rvGround(r, gk); r = RV.band(r); const k = RV.k(r); const m = V(80, 56) * Math.max(k, 0.8); const z = V(54, 46) * Math.max(k, 0.85); const VT = PORTRAIT || r.w < 1300;
  let y0 = r.y + m; if (o.title) y0 = RV.head(t, o.title, r.x + m, y0 + V(90, 96) * k * 0.8, V(90, 96) * k, RV.ink, { key: 'flow-title', maxW: r.w - 2 * m }) + 40;
  const bw = VT ? r.w - 2 * m : (r.w - 2 * m) * 0.34, bh = z * 3.2;
  const A_ = VT ? { x: r.x + m, y: y0 } : { x: r.x + m, y: y0 + 40 }; const B_ = VT ? { x: r.x + m, y: y0 + bh + z * 4.2 } : { x: r.x + r.w - m - bw, y: y0 + 40 };
  const box = (b, s1, s2, key, at) => withA(rvE(t, at, 0.4), () => grp(key, b.x, b.y, bw, bh, () => { rect(b.x, b.y, bw, bh, RV.wh); rvLine(b.x, b.y, bw, bh);
    txt(s1, b.x + 30, b.y + z * 1.35, FO(z * 1.05, 800), RV.ink, 'left', 'alphabetic', 0, key + '-1'); txt(s2, b.x + 30, b.y + z * 2.5, FM(Math.max(32, z * 0.72)), RV.dim, 'left', 'alphabetic', 0, key + '-2'); }));
  box(A_, 'Payment provider', 'the customer paid', 'provider', o.at || 0); box(B_, 'Your server', '/webhooks', 'server', (o.at || 0) + 0.15);
  const msg = (at, i) => { if (at == null || t < at) return; const p = rvE(t, at, 0.6, 'inOutQuart'); const mw = Math.min(bw, V(470, 560)), mh = z * 1.5;
    const sx = VT ? A_.x + (bw - mw) / 2 : A_.x + bw + 20, sy = VT ? A_.y + bh + 20 : A_.y + (bh - mh) / 2 + (i ? mh + 16 : 0) - mh * 0.5;
    const ex = VT ? sx : B_.x - mw - 20, ey = VT ? B_.y - mh - 20 : sy; const x = lerp(sx, ex, p), y = lerp(sy, ey, p);
    rect(x, y, mw, mh, i ? RV.del : RV.add); rvLine(x, y, mw, mh); _txt('payment.successful', x + 22, y + mh * 0.66, FM(Math.max(30, z * 0.7), 600), i ? RV.delI : RV.addI); };
  msg(o.sendAt, 0); msg(o.againAt, 1);
  const ty = B_.y + bh + V(40, 50), tx = VT ? r.x + m : B_.x; const rh = z * 1.6;
  if (t >= o.sendAt + 0.6) withA(rvE(t, o.sendAt + 0.6, 0.3), () => grp('orders', tx, ty, bw, rh * 3, () => { txt('orders', tx, ty + z * 0.6, FM(32, 600), RV.dim, 'left', 'alphabetic', 0, 'orders-h');
    const row = (i, col, bg, s) => { rect(tx, ty + z + i * (rh + 10), bw, rh, bg); rvLine(tx, ty + z + i * (rh + 10), bw, rh); _txt(s, tx + 22, ty + z + i * (rh + 10) + rh * 0.66, FM(Math.max(32, z * 0.75), 600), col); };
    row(0, RV.ink, RV.wh, '#1042  paid  ₦12,000');
    if (o.againAt != null && t >= o.againAt + 0.6) withA(rvE(t, o.againAt + 0.6, 0.25), () => { row(1, RV.delI, RV.del, '#1042  paid  ₦12,000'); _txt('x2', tx + bw - 22, ty + z + (rh + 10) + rh * 0.66, FM(Math.max(34, z * 0.8), 800), RV.delI, 'right'); });
  }));
  if (o.note) { const nw = VT ? r.w - 2 * m : bw; const ny = VT ? ty + z + 2 * (rh + 10) + 30 : A_.y + bh + V(60, 0); RV.note(t, o.note.at, VT ? r.x + m : A_.x, ny, nw, o.note.s, V(52, 54) * Math.max(k, 0.85), o.note.by || 'YOU'); }
}; };

/** the pharmacy stock: two batches of the same medicine with expiry dates; o.firstAt: an amber "SELL FIRST" tag lands on the one
 *  that expires first (your domain knowledge); o.batchAt: the batch numbers light up; o.photo: a Pexels photo beside (16:9) */
RV.shelf = (o) => { RV.snd('paper', o.at, -4); RV.snd('typeHit', o.firstAt, -1); RV.snd('tick', o.batchAt, -4); return (t, r) => {
  const gk = o.ground || 'rvGrey'; r = RV.rr(r, gk); rvGround(r, gk); r = RV.band(r); const k = RV.k(r); const m = V(80, 56) * Math.max(k, 0.8); const z = V(46, 46) * Math.max(k, 0.85);
  let y0 = r.y + m; if (o.title) y0 = RV.head(t, o.title, r.x + m, y0 + V(90, 96) * k * 0.8, V(90, 96) * k, RV.ink, { key: 'shelf-title', maxW: r.w - 2 * m }) + 50;
  const photo = o.photo && !PORTRAIT && r.w > 1400; const pw = photo ? r.w * 0.34 : 0;
  if (photo) { const px = r.x + m, py = y0, ph = r.y + r.h - m - py; withA(rvE(t, o.at, 0.4), () => grp('shelf-photo', px, py, pw, ph, () => { rvCover(IMG[o.photo], px, py, pw, ph, 0.5, 0.45); rvLine(px, py, pw, ph);
    rect(px, py + ph - 56, pw, 56, 'rgba(27,31,36,0.85)'); txt('Pexels · ' + (o.credit || ''), px + 18, py + ph - 18, FM(32, 600), RV.wh, 'left', 'alphabetic', 0, 'shelf-credit'); }, { img: true })); }
  const bx = r.x + m + (photo ? pw + 60 : 0), bw = r.x + r.w - m - bx; const bh = z * 3.6;
  [['Paracetamol 500 mg', 'BATCH A-2231', 'EXPIRES 03/2027', true], ['Paracetamol 500 mg', 'BATCH B-2410', 'EXPIRES 11/2027', false]].forEach(([nm, bt, ex, first], i) => {
    const y = y0 + i * (bh + 34); const a = rvE(t, o.at + i * 0.12, 0.4);
    withA(a, () => withT(0, 40 * (1 - a), 1, 0, () => grp('batch' + i, bx, y, bw, bh, () => { rect(bx, y, bw, bh, RV.wh); rvLine(bx, y, bw, bh);
      txt(nm, bx + 30, y + z * 1.3, FO(z * 1.05, 800), RV.ink, 'left', 'alphabetic', 0, 'b-name' + i);
      const bl = o.batchAt != null && t >= o.batchAt; txt(bt, bx + 30, y + z * 2.6, FM(Math.max(32, z * 0.72), bl ? 700 : 500), bl ? RV.ink : RV.dim, 'left', 'alphabetic', 0, 'b-batch' + i);
      txt(ex, bx + bw - 30, y + z * 2.6, FM(Math.max(32, z * 0.72), 700), first ? RV.delI : RV.dim, 'right', 'alphabetic', 0, 'b-exp' + i); })));
    if (first && o.firstAt != null) RV.stamp(t, o.firstAt, 'SELL FIRST', bx + bw - V(180, 170), y - 6, V(48, 48) * Math.max(k, 0.85), { key: 'sell', rot: -0.03, col: RV.delI });
  });
}; };

/** a Pexels photo filling the rect (o.fx, o.fy focus), ink border, credit bar; o.label: a white mono tag on it */
RV.photo = (key, o = {}) => { RV.snd('shutter', o.at, -6); return (t, r) => { r = RV.rr(r); rvGround(r, 'rvGrey'); const m = o.m != null ? o.m : V(60, 44); const x = r.x + m, y = r.y + m, w = r.w - 2 * m, h = r.h - 2 * m;
  const a = rvE(t, o.at || 0, 0.4); const kz = 1 + 0.04 * E.inOutCubic(prog(t, o.at || 0, 6));
  withA(a, () => grp('photo-' + key, x, y, w, h, () => { ctx.save(); ctx.beginPath(); ctx.rect(x, y, w, h); ctx.clip(); withT(x + w / 2, y + h / 2, kz, 0, () => rvCover(IMG[key], -w / 2, -h / 2, w, h, o.fx || 0.5, o.fy || 0.5)); ctx.restore();
    rvLine(x, y, w, h); rect(x, y + h - 56, w, 56, 'rgba(27,31,36,0.85)'); txt('Pexels · ' + (o.credit || ''), x + 18, y + h - 18, FM(32, 600), RV.wh, 'left', 'alphabetic', 0, 'photo-credit');
    if (o.label) { const lz = V(40, 42); const lw = tw(o.label, FM(lz, 700)) + 40; withA(rvE(t, o.labelAt || o.at || 0, 0.3), () => { rect(x + 30, y + 30, lw, lz * 1.7, RV.wh); rvLine(x + 30, y + 30, lw, lz * 1.7); txt(o.label, x + 50, y + 30 + lz * 1.15, FM(lz, 700), RV.ink, 'left', 'alphabetic', 0, 'photo-label'); }); }
  }, { img: true, label: 'photo (drag, resize)' }));
}; };
/** cover-fit an image into a box (focus fx, fy) */
function rvLine(x, y, w, h) { strokeR(x, y, w, h, 'rgba(27,31,36,0.16)', 1); }
function rvCover(im, x, y, w, h, fx = 0.5, fy = 0.5) { if (!im) { rect(x, y, w, h, RV.mid); return; } const s = Math.max(w / im.width, h / im.height); const iw = im.width * s, ih = im.height * s;
  themeFixed(() => ctx.drawImage(im, x + (w - iw) * fx, y + (h - ih) * fy, iw, ih)); }

/** the full-frame fallback (no film needed): an L9-style insert, her voice and captions go on; o.ground, o.enter, o.sound */
RV.n = 0;
RV.full = (s, draw, o = {}) => {
  const lead = o.lead == null ? 0.12 : o.lead, hold = o.hold == null ? 0.5 : o.hold;
  const at = (x, end) => (typeof x === 'number' ? x : end ? x.e + hold : x.t - lead);
  let t0, t1; if (Array.isArray(s)) { t0 = s[0]; t1 = s[1]; } else if (s.from != null) { t0 = at(s.from); t1 = at(s.to || s.from, true); } else { t0 = s.t - lead; t1 = s.e + hold; }
  if (o.until != null) t1 = o.until;
  TH.used = true; const id = o.id || 'insert-' + (++RV.n);
  TH.segs.push({ kind: 'cutaway', t0, t1, id, cover: true, card: false, ground: o.ground || 'rvGrey', o, noCaps: o.noCaps,
    draw: (t) => { const p = E.outCubic(prog(t, t0, 0.3)); const kz = 1 + 0.02 * E.inOutCubic(prog(t, t0, Math.max(0.5, t1 - t0)));
      withT(W / 2 * (1 - kz), (1 - p) * 60 + H / 2 * (1 - kz), kz, 0, () => draw(t, { x: 0, y: 0, w: W, h: H })); if (p < 1) withA(1 - p, () => rect(0, 0, W, H, (G[o.ground] || G.rvGrey).bg)); } });   // the entry wash in the card's own ground (2026-11-07: grey flash on the dark skill cards)
  if (o.sound !== false) sfx(o.sound || 'swipe', t0 + 0.02, o.db != null ? o.db : -6);
  return { t0, t1, id };
};

/* ---------- the running code: the sign-up example (one object that changes as she talks) ---------- */
const RV_CODE0 = [{ s: 'async function signUp(user) {', k: ' ' }, { s: '  await db.insert(user)', k: ' ' }, { s: '  return { ok: true }', k: ' ' }, { s: '}', k: ' ' }];
const RV_ERR = ['Error 1062: Duplicate entry', "'ada@example.com'", "for key 'users.email'"];
