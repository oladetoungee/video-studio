/* working-full-time: the look's kit, shared by the motion film (film.json scripts) and the talking-head edit, shorts and teaser
 * (talking-head.json "common"). Her pick 2026-11-02: B · CLOCK IN / CLOCK OUT (a punch-clock time card) + A's 24-hour dial.
 * Grounds: wall charcoal #23201B, manila card #E7D7AE, black #0D0C0A (phrase cards). ONE accent: stamp red #C8102E (her headband).
 * Type (her set 02 Bold condensed, TYPE-SYSTEM.md 2026-11-07): Anton caps (headlines, times, stamps), Inter Tight 400/500 (sentences,
 * captions), DM Mono 500 caps (labels, credits). No thick borders, stamp frames or outlined text: space and colour separate.
 * Every helper returns draw(t, r) (r = the rect it fills), pure function of time; every text txt()/txtW() (editable), every
 * block grp() (movable, resizable). WF_CLIPS (real page crops) comes from talking-head/assets/src/clips.js. */
'use strict';
(function wfFonts() {   // Inter Tight (OFL, library/fonts) registered for this page (sync); Anton and DM Mono come from studio fonts.css
  for (const [w, file] of [['400', 'InterTightRegular.ttf'], ['500', 'InterTightMedium.ttf'], ['600', 'InterTightSemiBold.ttf'], ['700', 'InterTightBold.ttf']]) {
    const x = new XMLHttpRequest(); x.open('GET', '/library/fonts/' + file, false); x.overrideMimeType('text/plain; charset=x-user-defined'); x.send();
    if (x.status !== 200) continue;
    const s = x.responseText, u = new Uint8Array(s.length); for (let i = 0; i < s.length; i++) u[i] = s.charCodeAt(i) & 255;
    const ff = new FontFace('WFInter', u.buffer, { weight: w }); document.fonts.add(ff); ff.load();
  }
  for (const f of ['400 40px Anton', '500 40px "DM Mono"']) try { document.fonts.load(f); } catch (e) {}
})();
const WF = { wall: '#23201B', manila: '#E7D7AE', rule: '#A08A5E', ink: '#1D1A15', red: '#C8102E', paper: '#F4EBD3', mid: '#B9AD92', midInk: '#6B5D40', black: '#0D0C0A', hl: '#FFE45A' };
let FB = (s) => `400 ${Math.round(s * 0.92)}px Anton`; let FW = (s, w = 500) => `${Math.min(700, w)} ${s}px WFInter`, FC = (s) => `500 ${Math.round(s * 0.82)}px "DM Mono"`;   // (Anton runs larger than Bebas at the same px; DM Mono wider than Cutive)
G.wfWall = { bg: WF.wall, fg: WF.manila, mid: WF.mid, line: 'rgba(231,215,174,0.18)', acc: WF.red, card: WF.paper, panel: '#2E2A23', grid: 'rgba(0,0,0,0)', mode: 'dark' };
G.wfCard = { bg: WF.manila, fg: WF.ink, mid: WF.midInk, line: WF.rule, acc: WF.red, card: WF.paper, panel: '#DCCB9C', grid: 'rgba(0,0,0,0)', mode: 'light' };
G.wfBlack = { bg: WF.black, fg: WF.paper, mid: WF.mid, line: 'rgba(244,235,211,0.16)', acc: WF.red, card: WF.paper, panel: '#1A1814', grid: 'rgba(0,0,0,0)', mode: 'dark' };
F.disp = (s) => FB(s); F.body = (s, w = 600) => FW(s, Math.max(500, Math.min(800, w))); F.mono = (s) => FC(s); F.serif = (s) => FB(s);
LS.disp = 0.01; LS.mono = 0.04; LS.serif = 0.01;
if (typeof PLATE !== "undefined") { PLATE.wf = [WF.manila, WF.ink, WF.red]; PLATE.wfRed = [WF.red, WF.paper, WF.ink]; }
const wfE = (t, t0, d, e = 'outQuint') => MOTION.ease(t, t0, d, e);
WF.q = []; WF.snd = (role, t) => { if (t != null && t < 1e8 && isFinite(t)) WF.q.push([role, t]); };
WF.T0 = null; WF.lead = (at) => (WF.T0 != null && at != null && at < 1e8 ? Math.min(at, WF.T0 + 0.35) : at);
const DAYS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
WF.short = () => typeof FOOT !== 'undefined' && !!(FOOT.m && FOOT.m.kind === 'short');
/** the time she starts a word inside a phrase (first match), else the phrase start */
function WT(ph, word) {
  const n = (s) => s.toLowerCase().replace(/[’]/g, "'").replace(/[^a-z0-9']/g, '');
  const want = String(word).split(/\s+/).map(n);
  const ws = WORDS.slice(ph.i, ph.i + ph.w.length);
  for (let k = 0; k <= ws.length - want.length; k++) if (want.every((x, j) => ws[k + j].n === x)) return ph.w[k];
  return ph.t;
}
/** shorts: a graphic that reaches the top of the 9:16 frame starts below her top label (the band above stays the wall) */
WF.pad = (r, o) => { const l = PORTRAIT ? 0 : (o.padL || 0), rr_ = PORTRAIT ? 0 : (o.padR || 0); return l || rr_ ? { x: r.x + l, y: r.y, w: r.w - l - rr_, h: r.h } : r; };
WF.rr = (r) => {
  if (!PORTRAIT || !WF.short()) return r; const lb = TH.labelBottom(); if (!(lb > 0)) return r;
  const m = ctx.getTransform(), sy = m.d / BASE[3], y0 = (m.d * r.y + m.f - BASE[5]) / BASE[3];
  if (y0 >= lb + 20) return r; const d = (lb + 24 - y0) / (sy || 1);
  rect(r.x, r.y, r.w, r.h, WF.wall); return { x: r.x, y: r.y + d, w: r.w, h: r.h - d };
};

/** a stamp: lands with a short press (scale 1.25 -> 1 in 0.12 s), the ink a little uneven (deterministic); o.box: a ruled frame */
WF.stamp = (t, at, s, x, y, size, col, o = {}) => {
  if (t < at) return; const p = clamp((t - at) / 0.12); const sc = lerp(1.25, 1, E.outQuint(p)); const rot = (o.rot || 0) + (hash(Math.round(x) * 3 + Math.round(y)) - 0.5) * 0.03;
  const key = o.key || 'stamp-' + s; const ov = ovr(key); const str = ov.s != null ? ov.s : s; const f = FB(size); const ls = o.ls == null ? size * 0.03 : o.ls;
  const w = tw(str, f, ls); const bh = o.bh || size * 1.12, bw = w + size * 0.5;
  if (ov.hide) { regBox(ov, x - bw / 2, y - bh / 2, bw, bh, { text: str, def: s }); return; }
  moved(ov, () => { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(sc, sc); ctx.globalAlpha *= lerp(0.5, o.alpha || 0.94, p);
    _txt(str, 0, size * 0.36, f, col, 'center', 'alphabetic', ls); ctx.globalAlpha *= 0.5; _txt(str, 1.4, size * 0.36 + 0.6, f, col, 'center', 'alphabetic', ls); ctx.globalAlpha /= 0.5;
    if (o.box === 'frame') { ctx.strokeStyle = col; ctx.lineWidth = o.lw || Math.max(4, size * 0.05); ctx.strokeRect(-bw / 2, -bh / 2, bw, bh); }
    ctx.restore(); regBox(ov, x - bw / 2, y - bh / 2, bw, bh, { text: str, def: s }); });
};

/** a line of big type that lands word by word on her times (o.times one per word, else all at o.at), editable as one text */
WF.words = (t, s, x, y, size, col, o = {}) => {
  const key = o.key || s; const ov = ovr(key); const str = ov.s != null ? ov.s : s; const f = o.font || FB(size); const ls = o.ls == null ? size * 0.01 : o.ls;
  const ws = str.split(' '); const times = o.times || ws.map(() => o.at || 0); const sp = tw(' ', f, ls);
  const tot = tw(str, f, ls); const x0 = o.align === 'center' ? x - tot / 2 : o.align === 'right' ? x - tot : x;
  if (ov.hide) { regBox(ov, x0, y - size * 0.82, tot, size * 1.0, { text: str, def: s }); return tot; }
  moved(ov, () => { let cx = x0;
    ws.forEach((w, i) => { const p0 = wfE(t, times[Math.min(i, times.length - 1)], o.d || 0.32); const p = o.ghost ? Math.max(o.ghost, p0) : p0; const ww = tw(w, f, ls);
      const red = o.red && o.red.includes(i);
      withA(p, () => _txt(w, cx, y + (o.rise == null ? size * 0.12 : o.rise) * (1 - p), f, red ? WF.red : col, 'left', 'alphabetic', ls)); cx += ww + sp; });
    regBox(ov, x0, y - size * 0.82, tot, size * 1.0, { text: str, def: s }); });
  return tot;
};

/** THE TIME CARD. o: at (slides in), rows {MON: ['09:00','17:00','17:45','20:00']}, times {MON: [t,t,t,t]} (when each is stamped;
 *  default: all at o.at), hiRow 'FRI' (+ hiAt), strike {row, col, at}, redCell {row, col}, extra [{s, at, row, col, dy} | {s, at, x, y}],
 *  dimWork 0..1 (+ dimAt), push {at, row, k} (a push-in to that row), title, week, name, side 'right'|'center'|'left', w */
WF.card = (o) => (t, r) => { r = WF.rr(r); const r0 = r; r = WF.pad(r, o); if (r !== r0) rect(r0.x, r0.y, r0.w, r0.h, o.ground === 'card' ? WF.manila : G[o.ground || 'wfWall'] ? G[o.ground || 'wfWall'].bg : WF.wall);
  rect(r.x, r.y, r.w, r.h, o.ground === 'card' ? WF.manila : WF.wall);
  const port = r.h > r.w * 1.05, m = V(56, 44);
  const cw = o.w || V(760, 860), rh = V(88, 74), head = V(200, 172), ch = head + rh * 7 + V(90, 70);
  const kf = Math.min(1, (r.w - 2 * m) / cw, (r.h - 2 * m - (o.capRoom || 0)) / ch); const sw = cw * kf, shh = ch * kf;
  const x0 = o.side === 'left' ? r.x + m : o.side === 'center' || port ? r.x + (r.w - sw) / 2 : r.x + r.w - m - sw, y0 = r.y + Math.max(m * kf, (r.h - shh - (o.capRoom || 0)) / 2);
  const slide = 1 - wfE(t, o.at || 0, 0.6); const dx = 0, dy = slide * (r.h * 0.8);
  ctx.save(); ctx.translate(x0, y0); ctx.scale(kf, kf); const x = 0, y = 0;
  const cols = [V(116, 120), 0, 0, 0, 0]; const cell = (cw - cols[0]) / 4; for (let i = 1; i < 5; i++) cols[i] = cell; const cx = (i) => cols.slice(0, i).reduce((a, b) => a + b, 0);
  ctx.save(); ctx.translate(dx, dy);
  if (o.push) { const zp = wfE(t, o.push.at, 0.7, 'inOutQuart'); const k = 1 + (o.push.k || 0.12) * zp; const ri = DAYS.indexOf(o.push.row);
    const zx = x + cw / 2, zy = y + head + 12 + ri * rh + rh / 2; ctx.translate(zx, zy); ctx.scale(k, k); ctx.translate(-zx, -zy); }
  grp('timecard', x, y, cw, ch, () => {
    ctx.save(); ctx.translate(x + cw / 2, y + ch / 2); ctx.rotate(o.rot == null ? -0.012 : o.rot); ctx.translate(-cw / 2, -ch / 2);
    rect(0, 0, cw, ch, WF.manila);
    txt(o.title || 'TIME CARD', 32, 72, FB(64), WF.ink, 'left', 'alphabetic', 2, 'tc-title');
    txt(o.week || 'WEEK 45', cw - 32, 70, FC(34), WF.ink, 'right', 'alphabetic', 0, 'tc-week');
    txt(o.name || 'NAME  GBEMI', 32, 116, FC(32), WF.ink, 'left', 'alphabetic', 0, 'tc-name'); rect(32, 132, cw - 64, 2, WF.rule);
    _txt('WORK', cx(1) + cell, head - 28, FW(28, 700), WF.ink, 'center', 'alphabetic', 3); _txt('CLASS', cx(3) + cell, head - 28, FW(28, 700), WF.ink, 'center', 'alphabetic', 3);
    ['IN', 'OUT', 'IN', 'OUT'].forEach((s, i) => _txt(s, cx(i + 1) + cell / 2, head - 4, FC(26), WF.ink, 'center'));
    for (let rr_ = 0; rr_ <= 7; rr_++) rect(18, head + 12 + rr_ * rh - 1, cw - 36, 2, WF.rule);
    for (let c = 1; c < 5; c++) rect(cx(c) - (c === 3 ? 2 : 1), head - 52, c === 3 ? 4 : 2, head + 12 + 7 * rh - (head - 52), WF.rule);
    const hiOn = o.hiRow && t >= (o.hiAt == null ? -1 : o.hiAt);
    DAYS.forEach((d, ri) => { const ry = head + 12 + ri * rh + rh / 2;
      if (hiOn && o.hiRow === d) rect(18, ry - rh / 2 + 2, cw - 36, rh - 4, 'rgba(200,16,46,0.12)');
      _txt(d, 30, ry + 10, FW(28, 700), WF.ink, 'left', 'alphabetic', 2);
      const v = (o.rows || {})[d]; if (!v) return; const tv = (o.times || {})[d] || [];
      for (let c = 0; c < 4; c++) { if (!v[c]) continue; const at = tv[c] != null ? tv[c] : (o.at || 0) + 0.1;
        const red = o.redCell && o.redCell.row === d && o.redCell.col === c; const dim = c < 2 && o.dimWork ? 1 - 0.45 * wfE(t, o.dimAt || 0, 0.6) : 1;
        withA(dim, () => WF.stamp(t, at, v[c], cx(c + 1) + cell / 2, ry + 2, Math.min(V(44, 46), cell * 0.36), red ? WF.red : WF.ink, { box: false, ls: 1, key: 'tc-' + d + c }));
        if (o.strike && o.strike.row === d && o.strike.col === c) { const p = wfE(t, o.strike.at, 0.3, 'outExpo'); if (p > 0) rect(cx(c + 1) + 16, ry - 2, (cell - 32) * p, 8, WF.red); } }
    });
    (o.extra || []).forEach((e, i) => { let ex = e.x, ey = e.y; if (e.row) { ex = cx(e.col + 1) + cell / 2; ey = head + 12 + DAYS.indexOf(e.row) * rh + rh / 2 + (e.dy || 0); }
      WF.stamp(t, e.at, e.s, ex, ey, e.size || 54, e.col === 'ink' ? WF.ink : WF.red, { rot: e.rot == null ? -0.07 : e.rot, bh: e.bh, key: 'tc-extra' + i }); });
    ctx.restore();
  }, { label: 'time card (drag, resize)' });
  ctx.restore(); ctx.restore();
};

/** a REAL page clipping: a manila mount with the site + date (Cutive), the white crop, a marker sweep on her word (o.hl, or
 *  o.hls per highlight box), an optional big line above (o.title, landing on o.titleAt) and a stamp (o.stamp {s, at}).
 *  key = WF_CLIPS key. The source line is part of the mount: real screenshots keep a small source credit. */
WF.clip = (key, o = {}) => (t, r) => { r = WF.rr(r); const r0 = r; r = WF.pad(r, o); if (r !== r0) rect(r0.x, r0.y, r0.w, r0.h, o.ground === 'card' ? WF.manila : G[o.ground || 'wfWall'] ? G[o.ground || 'wfWall'].bg : WF.wall);
  if (WF_CLIPS[key + '-p']) key = key + '-p';   // the one-line crop of the same page, so its text reads at 44 px+ (critic 2026-11-07)
  const c = WF_CLIPS[key], im = IMG['clip_' + key]; const gr = G[o.ground || 'wfWall']; rect(r.x, r.y, r.w, r.h, gr.bg); if (!c) return;
  const m = V(64, 48); let y = r.y + m;
  if (o.title) { const z = o.titleSize || V(96, 92); const lines = [].concat(o.title);
    lines.forEach((l, i) => { WF.words(t, l, r.x + m, y + z * 0.86, z, gr.fg, { at: (o.titleAt || o.t0 || 0) + i * 0.25, key: 'clip-title' + i, red: o.titleRed && o.titleRed[i] }); y += z * 0.98; }); y += V(30, 34); }
  const a = wfE(t, o.t0 || 0, 0.45); const pad = V(26, 22), head = V(64, 64);
  const availH = r.y + r.h - m - y - (o.capRoom || 0);
  let w = Math.min(o.w || r.w - 2 * m, r.w - 2 * m); let s = (w - 2 * pad) / c.w; let ih = c.h * s; if (ih + 2 * pad + head > availH) { s = (availH - 2 * pad - head) / c.h; ih = c.h * s; w = c.w * s + 2 * pad; }
  const h = ih + 2 * pad + head; const x = o.align === 'center' ? r.x + (r.w - w) / 2 : r.x + m; const yy = o.valign === 'center' ? Math.max(y, r.y + (r.h - h) / 2) : y;
  withA(Math.min(1, a * 1.6), () => withT(0, 30 * (1 - a), 1, 0, () => grp('clip-' + key, x, yy, w, h, () => {
    rect(x, yy, w, h, WF.manila);
    const site = (c.source || '').split(',')[0].toUpperCase(); const cz = Math.min(V(26, 26), (w - 2 * pad) / 30);
    txt(site, x + pad, yy + head * 0.66, FC(cz), WF.ink, 'left', 'alphabetic', 1, 'clip-site');
    txt(c.date.toUpperCase(), x + w - pad, yy + head * 0.66, FC(cz), WF.ink, 'right', 'alphabetic', 1, 'clip-date');
    rect(x + pad, yy + head, w - 2 * pad, ih + pad, '#FFFFFF'); if (im) themeFixed(() => ctx.drawImage(im, x + pad, yy + head + pad / 2, c.w * s, ih));
    (c.hl || []).forEach((b, i) => { if (o.only && !o.only.includes(i)) return; const at = o.hls ? o.hls[i] : (o.hl == null ? null : o.hl + i * 0.3); if (at == null) return;
      const p = wfE(t, at, 0.42, 'outExpo'); if (p <= 0) return;
      ctx.save(); ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = WF.hl; ctx.fillRect(x + pad + b[0] * s, yy + head + pad / 2 + b[1] * s, b[2] * s * p, b[3] * s); ctx.restore(); });
  }, { img: true, label: 'real page (drag, resize)' })));
  if (o.credit !== false && c.source.includes('§')) withA(a, () => txt(c.source.split(', ').slice(1).join(', '), x, yy + h + V(44, 44), FC(V(36, 34)), gr.mid, 'left', 'alphabetic', 0, 'clip-law'));
  if (o.stamp) WF.stamp(t, o.stamp.at, o.stamp.s, x + w * (o.stamp.fx || 0.72), yy + h + (o.stamp.dy || V(-10, 40)), o.stamp.size || V(92, 96), o.stamp.ink ? WF.ink : WF.red, { rot: o.stamp.rot || -0.06, key: 'clip-stamp' });
};

/** big type composition on a ground: o.lines [{s, at | times, red: [word index], size, col: 'red'|'mid'}], o.stamps [{s, at, fx, fy, size, ink}],
 *  o.kicker (Cutive line on top), o.ground 'wfWall'|'wfCard'|'wfBlack', o.valign 'center'|'bottom' */
WF.type = (o) => { (o.lines || []).forEach((l) => WF.snd('typeHit', l.at != null ? l.at : (l.times || [])[0])); return WF.type_(o); };
WF.type_ = (o) => (t, r) => { r = WF.rr(r); const r0 = r; r = WF.pad(r, o); if (r !== r0) rect(r0.x, r0.y, r0.w, r0.h, o.ground === 'card' ? WF.manila : G[o.ground || 'wfWall'] ? G[o.ground || 'wfWall'].bg : WF.wall);
  const gr = G[o.ground || 'wfWall']; rect(r.x, r.y, r.w, r.h, gr.bg); const m = V(72, 56);
  const lines = o.lines || []; const fit = (l) => { let z = l.size || o.size || V(150, 132); const f = (zz) => FB(zz); while (tw(l.s, f(z), z * 0.01) > r.w - 2 * m && z > 40) z -= 4; return z; };
  const zs = lines.map(fit); const totH = zs.reduce((a, z) => a + z * 0.98, 0) + (o.kicker ? V(70, 70) : 0);
  let y = o.valign === 'top' ? r.y + m : o.valign === 'bottom' ? r.y + r.h - m - totH - (o.capRoom || 0) : r.y + (r.h - totH - (o.capRoom || 0)) / 2;
  if (o.kicker) { withA(wfE(t, o.kickerAt == null ? (lines[0] ? lines[0].at || 0 : 0) - 0.2 : o.kickerAt, 0.35), () => txt(o.kicker, r.x + m, y + V(34, 34), FC(V(44, 38)), gr.mid, 'left', 'alphabetic', 2, 'kicker')); y += V(70, 70); }
  lines.forEach((l, i) => { const z = zs[i]; y += z * 0.86; const col = l.col === 'red' ? WF.red : l.col === 'mid' ? gr.mid : gr.fg;
    WF.words(t, l.s, o.align === 'center' ? r.x + r.w / 2 : r.x + m, y, z, col, { times: l.times, at: i === 0 ? WF.lead(l.at) : l.at, red: l.red, key: l.key || 'line' + i, align: o.align, ghost: o.ghost || 0 }); y += z * 0.12; });
  (o.stamps || []).forEach((s, i) => WF.stamp(t, s.at, s.s, r.x + r.w * (s.fx || 0.7), r.y + r.h * (s.fy || 0.7), s.size || V(110, 104), s.ink ? gr.fg : WF.red, { rot: s.rot == null ? -0.06 : s.rot, key: 'st' + i }));
};

/** a big number: o.big ('30'), o.small (line under it), o.kicker (Cutive on top), o.foot (source), o.at, o.stamp {s, at} */
WF.stat = (o) => (t, r) => { r = WF.rr(r); const r0 = r; r = WF.pad(r, o); if (r !== r0) rect(r0.x, r0.y, r0.w, r0.h, o.ground === 'card' ? WF.manila : G[o.ground || 'wfWall'] ? G[o.ground || 'wfWall'].bg : WF.wall);
  const gr = G[o.ground || 'wfWall']; rect(r.x, r.y, r.w, r.h, gr.bg); const m = V(72, 52), at = o.at || 0;
  if (o.kicker) txt(o.kicker, r.x + m, r.y + m + 30, FC(V(44, 38)), gr.mid, 'left', 'alphabetic', 2, 'kicker');
  const fz = V(26, 28), footY = r.y + r.h - m - (o.capRoom || 0); let ss = o.smallSize || V(62, 60);
  const smallBottom = o.foot ? footY - fz * 2 : footY; const nSmall = o.small ? Math.min(3, Math.ceil(tw(o.small, FW(ss, 700)) * 1.2 / (r.w - 2 * m))) : 0;
  const ySmall = smallBottom - Math.max(0, nSmall - 1) * ss * 1.1; const kickB = r.y + m + (o.kicker ? V(70, 74) : 0);
  let size = o.size || Math.min(V(380, 360), r.h * 0.5); const yBig = () => (o.small ? ySmall - ss * 1.0 : smallBottom) - size * 0.24;
  while ((tw(o.big, FB(size)) > r.w - 2 * m || yBig() - size * 0.86 < kickB) && size > 40) size -= 6;
  const p = wfE(t, at, 0.5);
  withA(clamp(p * 2.2), () => withT(0, (1 - p) * 40, 1, 0, () => txt(o.big, r.x + m, yBig(), FB(size), o.col === 'fg' ? gr.fg : WF.red, 'left', 'alphabetic', size * 0.01, 'big')));
  if (o.small) withA(wfE(t, o.smallAt != null ? o.smallAt : at + 0.25, 0.4), () => txtW(o.small.toUpperCase(), r.x + m, ySmall, FB(ss * 1.2), gr.fg, r.w - 2 * m, ss * 1.1, 0, 'small'));
  if (o.foot) txt(o.foot, r.x + m, footY, FC(fz), gr.mid, 'left', 'alphabetic', 0, 'foot');
  if (o.stamp) WF.stamp(t, o.stamp.at, o.stamp.s, r.x + r.w * (o.stamp.fx || 0.66), r.y + r.h * (o.stamp.fy || 0.36), o.stamp.size || V(96, 92), o.stamp.ink ? gr.fg : WF.red, { rot: -0.07, key: 'stat-stamp' });
};

/** a numbered list (01 + bold line + hairline rule): o.items [{s, at, red}], o.kicker, o.stamp {s, at} (e.g. CANNOT MOVE) */
WF.list = (o) => { (o.items || []).forEach((it, i) => WF.snd(i ? 'tick' : 'paper', it.at)); return WF.list_(o); };
WF.list_ = (o) => (t, r) => { r = WF.rr(r); const r0 = r; r = WF.pad(r, o); if (r !== r0) rect(r0.x, r0.y, r0.w, r0.h, o.ground === 'card' ? WF.manila : G[o.ground || 'wfWall'] ? G[o.ground || 'wfWall'].bg : WF.wall);
  const gr = G[o.ground || 'wfWall']; rect(r.x, r.y, r.w, r.h, gr.bg); const m = V(72, 56); const n = o.items.length;
  const kH = o.kicker ? V(80, 84) : 0, sH = o.stamp ? V(150, 170) : 0; const rowH0 = Math.min(V(140, 150), (r.h - 2 * m - kH - sH - (o.capRoom || 0)) / n);
  let y = r.y + Math.max(m, (r.h - (o.capRoom || 0) - (kH + n * rowH0 + sH)) / 2); if (o.kicker) { txt(o.kicker, r.x + m, y + 32, FC(V(44, 38)), gr.mid, 'left', 'alphabetic', 2, 'kicker'); y += kH; }
  const avail = r.y + r.h - m - y - (o.capRoom || 0) - sH; const rowH = Math.min(V(140, 150), avail / n); const z = o.size || Math.min(V(84, 80), rowH * 0.62);
  o.items.forEach((it, i) => { const p = wfE(t, i === 0 ? WF.lead(it.at) : it.at, 0.4); const yy = y + i * rowH;
    withA(clamp(p * 2), () => withT(0, (1 - p) * 26, 1, 0, () => {
      txt(String(i + 1 + (o.from || 0)).padStart(2, '0'), r.x + m, yy + z * 0.82, FC(z * 0.5), gr.mid, 'left', 'alphabetic', 0, 'n' + i);
      let zz = z; while (tw(it.s, FB(zz)) > r.w - 2 * m - z * 1.1 && zz > 30) zz -= 2;
      txt(it.s, r.x + m + z * 1.05, yy + z * 0.86, FB(zz), it.red ? WF.red : gr.fg, 'left', 'alphabetic', zz * 0.01, 'item' + i);
      rect(r.x + m, yy + rowH - V(16, 18), (r.w - 2 * m) * p, 2, gr.line); }));
  });
  if (o.stamp) WF.stamp(t, o.stamp.at, o.stamp.s, r.x + r.w * (o.stamp.fx || 0.62), y + n * rowH + V(70, 84), o.stamp.size || V(104, 100), WF.red, { rot: -0.06, key: 'list-stamp' });
};

/** a week calendar (MON-SUN x 08:00-22:00): o.blocks [{d: 0..6, h0, h1, s, kind: 'work'|'class'|'fixed'|'study'|'clash', at}],
 *  o.kicker, o.merge {at} (two calendars slide into one: o.blocksB start on a second grid), o.clash {d, h0, h1, at} */
WF.week = (o) => { const bs = (o.blocks || []).map(b => b.at).filter(x => x != null).sort((a, b) => a - b); if (bs.length) WF.snd('paper', bs[0]); (o.blocks || []).forEach(b => { if (b.kind === 'study') WF.snd('stamp', b.at); if (b.move) WF.snd('paper', b.move.at); }); return WF.week_(o); };
WF.week_ = (o) => (t, r) => { r = WF.rr(r); const r0 = r; r = WF.pad(r, o); if (r !== r0) rect(r0.x, r0.y, r0.w, r0.h, o.ground === 'card' ? WF.manila : G[o.ground || 'wfWall'] ? G[o.ground || 'wfWall'].bg : WF.wall);
  const gr = G[o.ground || 'wfWall']; rect(r.x, r.y, r.w, r.h, gr.bg); const m = V(64, 44);
  let top = r.y + m; if (o.kicker) { txt(o.kicker, r.x + m, top + 30, FC(V(44, 38)), gr.mid, 'left', 'alphabetic', 2, 'kicker'); top += V(70, 76); }
  const hz = V(34, 32), lab = V(118, 110), x0 = r.x + m + lab, w = r.w - 2 * m - lab; let h = r.y + r.h - m - top - V(48, 52) - (o.capRoom || 0);
  const H0 = o.h0 || 8, H1 = o.h1 || 22;
  let d0 = 0, d1 = 6; if (PORTRAIT) { const ds = (o.blocks || []).flatMap(b => [b.d, b.move ? b.move.d : b.d]).concat(o.clash ? [o.clash.d] : []); d0 = Math.min(...ds, 6); d1 = Math.max(...ds, 0); while (d1 - d0 < 2) { if (d0 > 0) d0--; if (d1 - d0 < 2 && d1 < 6) d1++; } }
  const nd = d1 - d0 + 1; const cw = w / nd; const hCap = PORTRAIT ? Math.min(h, 980) : h; const yOff = (h - hCap) / 2; h = hCap; top += yOff;
  const hy = (hh) => top + V(48, 52) + (hh - H0) / (H1 - H0) * h; const dx = (d) => x0 + (d - d0) * cw;
  const grid = wfE(t, o.at || 0, 0.5);
  withA(grid, () => grp('week', r.x + m, top, r.w - 2 * m, h + V(48, 52), () => {
    rect(x0, top + V(48, 52), w, h, WF.manila);
    for (let i = d0; i <= d1; i++) _txt(DAYS[i], dx(i) + cw / 2, top + V(34, 36), FW(V(30, 36), 700), gr.fg, 'center', 'alphabetic', 2);
    for (let i = d0 + 1; i <= d1; i++) rect(dx(i) - 1, top + V(48, 52), 2, h, WF.rule);
    for (let hh = H0; hh <= H1; hh += 2) { rect(x0, hy(hh) - 1, w, 2, 'rgba(160,138,94,0.45)'); _txt(String(hh).padStart(2, '0') + ':00', x0 - 12, hy(hh) + hz * 0.35, FC(hz), gr.mid, 'right'); }
    (o.blocks || []).forEach((b, i) => { const p = wfE(t, b.at, 0.35); if (p <= 0) return; let d_ = b.d, h0_ = b.h0, h1_ = b.h1;
      if (b.move) { const q = wfE(t, b.move.at, 0.6, 'inOutQuart'); d_ = lerp(b.d, b.move.d, q); h0_ = lerp(b.h0, b.move.h0, q); h1_ = lerp(b.h1, b.move.h1, q); }
      const bx = dx(d_) + 6, by = hy(h0_) + 3, bw = cw - 12, bh = hy(h1_) - hy(h0_) - 6;
      const col = b.kind === 'study' ? WF.red : b.kind === 'class' ? WF.ink : b.kind === 'fixed' ? '#5A4E36' : '#8C7A52';
      withA(p, () => withT(0, -(1 - p) * 30, 1, 0, () => { rect(bx, by, bw, bh, col);
        if (b.kind === 'class') for (let k = -bh; k < bw; k += 16) { ctx.save(); ctx.beginPath(); ctx.rect(bx, by, bw, bh); ctx.clip(); ctx.strokeStyle = 'rgba(231,215,174,0.18)'; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(bx + k, by + bh); ctx.lineTo(bx + k + bh, by); ctx.stroke(); ctx.restore(); }
        if (b.s) { let z = o.labZ || V(32, 30); const lines = String(b.s).split('\n'); lines.forEach((l, k) => { while (tw(l, FW(z, 700)) > bw - 12 && z > 18) z -= 1; });
          lines.forEach((l, k) => txt(l, bx + 8, by + z * 1.15 + k * z * 1.12, FW(z, 700), b.kind === 'study' || b.kind === 'class' || b.kind === 'fixed' ? WF.paper : WF.ink, 'left', 'alphabetic', 0, 'blk' + i + '-' + k)); } })); });
    if (o.clash) { const c = o.clash, p = wfE(t, c.at, 0.45, 'outExpo'); if (p > 0) { ctx.strokeStyle = WF.red; ctx.lineWidth = 7; const bx = dx(c.d) + 2, by = hy(c.h0) - 2, bw = cw - 4, bh = hy(c.h1) - hy(c.h0) + 4;
      ctx.beginPath(); ctx.rect(bx, by, bw, bh); ctx.save(); ctx.setLineDash([bw * 2 + bh * 2]); ctx.lineDashOffset = (bw * 2 + bh * 2) * (1 - p); ctx.stroke(); ctx.restore(); } }
  }, { label: 'week calendar (drag, resize)' }));
  if (!PORTRAIT) (o.stamps || []).forEach((s, i) => WF.stamp(t, s.at, s.s, r.x + r.w * (s.fx || 0.7), r.y + r.h * (s.fy || 0.5), s.size || V(96, 92), WF.red, { rot: -0.06, key: 'wk-st' + i }));   // (9:16: the blocks fill the panel; the stamp would sit on them)
};

/** A's 24-hour dial (borrowed for "the same one 24 hours"), in B's palette: two dials (WORK, SCHOOL) side by side from o.at,
 *  then (o.mergeAt) they slide into ONE dial: work arc (ink), class arc (hatched red), sleep (dim); o.oneAt stamps "ONE 24 HOURS" */
WF.dial = (o) => (t, r) => { r = WF.rr(r);
  const gr = G.wfWall; rect(r.x, r.y, r.w, r.h, gr.bg); const port = r.h > r.w;
  const mg = wfE(t, o.mergeAt || 1e9, 0.7, 'inOutQuart'); const R0 = Math.min(port ? r.w * 0.3 : r.w * 0.2, r.h * 0.27), R1 = Math.min(port ? r.w * 0.38 : r.h * 0.32, R0 * 1.45);
  const cy = r.y + (r.h - (o.capRoom || 0)) * (port ? 0.52 : 0.5), cx = r.x + r.w / 2, sep = port ? 0 : Math.max(r.w * 0.22, R0 * 1.35 + 40), sepY = port ? Math.max(r.h * 0.22, R0 * 1.35 + 40) : 0;
  const arc = (x, y, R, h0, h1, col, lw, p = 1, hatch) => { if (p <= 0) return; const a0 = -Math.PI / 2 + h0 / 24 * Math.PI * 2, a1 = a0 + (h1 - h0) / 24 * Math.PI * 2 * p;   // a flat wedge (her type rules: no rings)
    ctx.save(); ctx.fillStyle = col; ctx.beginPath(); ctx.moveTo(x, y); ctx.arc(x, y, R + lw * 0.5, a0, a1); ctx.closePath(); ctx.globalAlpha *= hatch ? 0.85 : 1; ctx.fill(); ctx.restore(); };
  const face = (x, y, R, label, key, a) => withA(a, () => { const T_ = mg > 0 && key !== 'dial-one' ? _txt : txt; circle(x, y, R + R * 0.1, '#2E2A23');
    for (let h = 0; h < 24; h++) { const an = -Math.PI / 2 + h / 24 * Math.PI * 2, big = h % 6 === 0; const r1 = R + R * (big ? 0.14 : 0.08), r2 = R + R * 0.2; ctx.strokeStyle = gr.mid; ctx.lineWidth = big ? 4 : 2; ctx.beginPath(); ctx.moveTo(x + Math.cos(an) * r1, y + Math.sin(an) * r1); ctx.lineTo(x + Math.cos(an) * r2, y + Math.sin(an) * r2); ctx.stroke(); }
    [0, 6, 12, 18].forEach((h) => { const an = -Math.PI / 2 + h / 24 * Math.PI * 2; _txt(String(h).padStart(2, '0'), x + Math.cos(an) * R * 0.62, y + Math.sin(an) * R * 0.62 + R * 0.06, FC(Math.max(34, R * 0.14)), gr.mid, 'center'); });
    T_(label, x, Math.max(r.y + V(84, 96), y - R * 1.32), FB(Math.max(V(56, 52), R * 0.24)), gr.fg, 'center', 'alphabetic', 1, key); });
  const a0 = wfE(t, o.at || 0, 0.5); const lw = Math.max(18, R0 * 0.2);
  if (mg < 1) { const R = lerp(R0, R1, mg); const xa = cx - sep * (1 - mg), xb = cx + sep * (1 - mg), ya = cy - sepY * (1 - mg), yb = cy + sepY * (1 - mg);
    withA(clamp(1 - mg * 2.5), () => { face(xa, ya, R, '24 H', 'dial-a', a0); arc(xa, ya, R, 9, 17, gr.fg, lw, wfE(t, (o.at || 0) + 0.3, 0.6)); withA(a0 * (mg > 0 || Math.abs(xa - xb) < R ? 0 : 1), () => txt(o.labelA || 'WORK CALENDAR', xa, ya + R * 1.62, FC(V(40, 36)), gr.mid, 'center', 'alphabetic', 2, 'dial-la')); });
    withA(clamp(1 - mg * 2.5), () => { face(xb, yb, R, '24 H', 'dial-b', a0); arc(xb, yb, R, 17.75, 20, WF.red, lw, wfE(t, (o.at || 0) + 0.6, 0.6), true); arc(xb, yb, R, 19, 21, WF.manila, lw * 0.5, wfE(t, (o.at || 0) + 0.9, 0.6)); withA(a0 * (mg > 0 ? 0 : 1), () => txt(o.labelB || 'SCHOOL CALENDAR', xb, yb + R * 1.62, FC(V(40, 36)), gr.mid, 'center', 'alphabetic', 2, 'dial-lb')); }); }
  if (mg > 0) { const R = R1; withA(mg, () => { face(cx, cy, R, 'ONE 24 H', 'dial-one', 1); arc(cx, cy, R, 9, 17, gr.fg, lw * 1.2); arc(cx, cy, R, 17.75, 20, WF.red, lw * 1.2, 1, true); arc(cx, cy, R, 0, 7, '#4A443A', lw * 1.2);
      const cp = wfE(t, (o.mergeAt || 0) + 0.5, 0.45); if (cp > 0) { const an = -Math.PI / 2 + 17.4 / 24 * Math.PI * 2; ctx.strokeStyle = WF.red; ctx.lineWidth = 6; ctx.beginPath(); ctx.arc(cx + Math.cos(an) * R, cy + Math.sin(an) * R, lw * 1.2 * cp, 0, Math.PI * 2); ctx.stroke(); }
      if (o.oneAt == null) txt(o.legend || 'WORK  ·  CLASS  ·  SLEEP', cx, cy + R * 1.5, FC(V(40, 36)), gr.mid, 'center', 'alphabetic', 2, 'dial-legend'); }); }
  if (o.oneAt != null) WF.stamp(t, o.oneAt, o.oneText || 'THE SAME ONE 24 HOURS', cx, cy + R1 * 1.3 + V(40, 50), V(72, 64), WF.red, { rot: 0, key: 'dial-stamp' });
};

/** two bars: what you guess vs what to budget (weeks). o.guess [6, 8] at o.at, o.budget 10 at o.budgetAt, o.max 12 */
WF.weeks = (o) => (t, r) => { r = WF.rr(r);
  const gr = G[o.ground || 'wfWall']; rect(r.x, r.y, r.w, r.h, gr.bg); const m = V(72, 56); const mx = o.max || 12;
  const bw = r.w - 2 * m, unit = bw / mx, bh = V(110, 120); const y1 = r.y + r.h * (o.y1 || 0.36), y2 = y1 + bh + V(150, 170);
  txt(o.kicker || 'YOUR INTERNSHIP OR THESIS', r.x + m, r.y + m + 30, FC(V(44, 38)), gr.mid, 'left', 'alphabetic', 2, 'kicker');
  for (let w = 0; w <= mx; w += 2) { _txt(String(w), r.x + m + w * unit, y2 + bh + V(52, 56), FC(V(38, 34)), gr.mid, 'center'); rect(r.x + m + w * unit - 1, y1 - 20, 2, y2 + bh - y1 + 34, 'rgba(231,215,174,0.12)'); }
  const p1 = wfE(t, WF.lead(o.at || 0), 0.6), p1b = wfE(t, o.at2 || (o.at || 0) + 0.6, 0.5), p2 = wfE(t, o.budgetAt || 1e9, 0.7);
  txt(o.guessLabel || 'YOU GUESS', r.x + m, y1 - V(24, 26), FC(V(42, 36)), gr.fg, 'left', 'alphabetic', 2, 'g-label');
  rect(r.x + m, y1, o.guess[0] * unit * p1, bh, '#8C7A52'); withA(p1b, () => { rect(r.x + m + o.guess[0] * unit, y1, (o.guess[1] - o.guess[0]) * unit * p1b, bh, '#6E5F3F'); });
  withA(p1, () => txt(o.guessText || '6-8 WEEKS', r.x + m + 24, y1 + bh * 0.72, FB(bh * 0.66), WF.paper, 'left', 'alphabetic', 1, 'g-text'));
  withA(clamp(p2 * 3), () => txt(o.budgetLabel || 'BUDGET', r.x + m, y2 - V(24, 26), FC(V(42, 36)), gr.fg, 'left', 'alphabetic', 2, 'b-label'));
  rect(r.x + m, y2, o.budget * unit * p2, bh, WF.red); withA(p2, () => txt(o.budgetText || '10 WEEKS', r.x + m + 24, y2 + bh * 0.72, FB(bh * 0.66), WF.paper, 'left', 'alphabetic', 1, 'b-text'));
};

/** a generic course outline (a plain document, no school's branding): o.rows [{k, v, at}] typed in, o.title, o.at */
WF.outline = (o) => { (o.rows || []).forEach((rw) => WF.snd('typeHit', rw.at)); return WF.outline_(o); };
WF.outline_ = (o) => (t, r) => { r = WF.rr(r); const r0 = r; r = WF.pad(r, o); if (r !== r0) rect(r0.x, r0.y, r0.w, r0.h, o.ground === 'card' ? WF.manila : G[o.ground || 'wfWall'] ? G[o.ground || 'wfWall'].bg : WF.wall);
  rect(r.x, r.y, r.w, r.h, WF.wall); const m = V(64, 48); const pw = Math.min(r.w - 2 * m, V(900, 940)), x = r.x + (r.w - pw) / 2;
  const a = wfE(t, o.at || 0, 0.5); const rowH = V(92, 96); const ph = V(150, 160) + o.rows.length * rowH + V(40, 40); const y = r.y + Math.max(m, (r.h - ph) / 2 - (o.capRoom || 0) / 2);
  withA(a, () => withT(0, (1 - a) * 40, 1, 0, () => grp('outline', x, y, pw, ph, () => {
    rect(x, y, pw, ph, WF.paper);
    txt(o.title || 'COURSE OUTLINE', x + 44, y + 84, FB(V(70, 70)), WF.ink, 'left', 'alphabetic', 1, 'ol-title'); rect(x + 44, y + 112, pw - 88, 3, WF.ink);
    o.rows.forEach((rw, i) => { const yy = y + V(150, 160) + i * rowH; const p = wfE(t, i === 0 ? WF.lead(rw.at) : rw.at, 0.35);
      withA(p, () => { txt(rw.k, x + 44, yy + rowH * 0.55, FC(V(42, 36)), WF.midInk, 'left', 'alphabetic', 1, 'ol-k' + i);
        txt(rw.v, x + pw * 0.42, yy + rowH * 0.58, FW(V(40, 40), 700), rw.red ? WF.red : WF.ink, 'left', 'alphabetic', 0, 'ol-v' + i); });
      rect(x + 44, yy + rowH - 2, pw - 88, 2, 'rgba(160,138,94,0.5)'); });
  }, { label: 'course outline (drag, resize)' })));
  (o.stamps || []).forEach((s, i) => WF.stamp(t, s.at, s.s, x + pw * (s.fx || 0.7), y + ph * (s.fy || 0.85), s.size || V(84, 84), WF.red, { rot: -0.07, key: 'ol-st' + i }));
};

/** a photo pinned to the wall like a polaroid (a Pexels stand-in, credited in film/assets/CREDITS.md), o.img, o.cap (Cutive caption), o.at */
WF.photo = (o) => (t, r) => { r = WF.rr(r); const r0 = r; r = WF.pad(r, o); if (r !== r0) rect(r0.x, r0.y, r0.w, r0.h, o.ground === 'card' ? WF.manila : G[o.ground || 'wfWall'] ? G[o.ground || 'wfWall'].bg : WF.wall);
  rect(r.x, r.y, r.w, r.h, WF.wall); const im = IMG[o.img]; const m = V(80, 60); const a = wfE(t, WF.lead(o.at || 0), 0.5);
  const pw = Math.min(r.w - 2 * m, (r.h - 2 * m - (o.capRoom || 0)) * 1.25) , ph = pw * 0.78 + V(110, 120); const x = r.x + (r.w - pw) / 2, y = r.y + Math.max(m * 0.6, (r.h - ph - (o.capRoom || 0)) / 2);
  const k = 1.04 - 0.04 * a + 0.03 * prog(t, o.at || 0, 6);
  withA(clamp(a * 1.6), () => withT(x + pw / 2, y + ph / 2 + (1 - a) * 40, 1, 0, () => grp('photo', -pw / 2, -ph / 2, pw, ph, () => {
    const iw = pw, ih = pw * 0.78; if (im) themeFixed(() => { ctx.save(); ctx.beginPath(); ctx.rect(-pw / 2, -ph / 2, iw, ih); ctx.clip();
      const s = Math.max(iw / im.width, ih / im.height) * k; ctx.drawImage(im, -pw / 2 + (iw - im.width * s) / 2, -ph / 2 + (ih - im.height * s) / 2, im.width * s, im.height * s); ctx.restore(); });
    if (o.cap) txt(o.cap, -pw / 2, -ph / 2 + ih + V(56, 56), FC(V(44, 40)), WF.manila, 'left', 'alphabetic', 1, 'photo-cap');
  }, { img: true, label: 'photo (drag, resize)' })));
  if (o.stamp) WF.stamp(t, o.stamp.at, o.stamp.s, x + pw * (o.stamp.fx || 0.6), y + ph * (o.stamp.fy || 0.12), o.stamp.size || V(80, 80), WF.red, { rot: 0.07, key: 'photo-stamp' });
};

/** her degree in four semesters: o.sems [{s: 'SEM 1'}...], o.fills [{from, to, s, at, red}] (a stamped bar across semesters) */
WF.degree = (o) => (t, r) => { r = WF.rr(r); const r0 = r; r = WF.pad(r, o); if (r !== r0) rect(r0.x, r0.y, r0.w, r0.h, o.ground === 'card' ? WF.manila : G[o.ground || 'wfWall'] ? G[o.ground || 'wfWall'].bg : WF.wall);
  const gr = G.wfWall; rect(r.x, r.y, r.w, r.h, gr.bg); const m = V(72, 52); const n = (o.sems || [1, 2, 3, 4]).length;
  const cw = (r.w - 2 * m) / n, ch = Math.min(V(460, 560), r.h - 2 * m - V(90, 96) - (o.capRoom || 0)); const top = r.y + Math.max(m + V(90, 96), (r.h - ch - (o.capRoom || 0)) / 2 + V(40, 40));
  txt(o.kicker || 'YOUR WHOLE DEGREE', r.x + m, top - V(50, 54), FC(V(44, 38)), gr.mid, 'left', 'alphabetic', 2, 'kicker');
  for (let i = 0; i < n; i++) { const p = wfE(t, (o.at || 0) + i * 0.08, 0.4); withA(p, () => { rect(r.x + m + i * cw + 6, top, cw - 12, ch, '#2E2A23');
    txt('SEMESTER ' + (i + 1), r.x + m + i * cw + 24, top + V(50, 52), FC(V(38, 34)), gr.mid, 'left', 'alphabetic', 1, 'sem' + i); }); }
  (o.fills || []).forEach((f, i) => { const p = wfE(t, f.at, 0.55, 'inOutQuart'); if (p <= 0) return; const x = r.x + m + f.from * cw + 6, w = ((f.to - f.from + 1) * cw - 12) * p, y = top + V(90, 100) + (f.row || 0) * V(130, 150), h = V(110, 130);
    rect(x, y, w, h, f.red ? WF.red : WF.manila); withA(clamp(p * 1.5 - 0.3), () => { let z = h * 0.62; while (tw(f.s, FB(z)) > (f.to - f.from + 1) * cw - 60 && z > 24) z -= 2; txt(f.s, x + 22, y + h * 0.7, FB(z), f.red ? WF.paper : WF.ink, 'left', 'alphabetic', 1, 'fill' + i); }); });
  (o.stamps || []).forEach((s, i) => WF.stamp(t, s.at, s.s, r.x + r.w * (s.fx || 0.7), top + ch * (s.fy || 0.85), s.size || V(96, 92), WF.red, { rot: -0.06, key: 'deg-st' + i }));
};

/** the punch-clock face: manila disc, ink numerals, hands at `hours` (24 h clock read on a 12 h face) */
WF.clockFace = (cx, cy, r, hours) => {
  circle(cx, cy, r, WF.paper);
  for (let i = 0; i < 60; i++) { const a = i / 60 * Math.PI * 2; const big = i % 5 === 0; const r1 = r - (big ? r * 0.26 : r * 0.14); ctx.strokeStyle = WF.ink; ctx.lineWidth = big ? 5 : 2; ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1); ctx.lineTo(cx + Math.cos(a) * (r - 8), cy + Math.sin(a) * (r - 8)); ctx.stroke(); }
  [12, 3, 6, 9].forEach((n, i) => { const a = -Math.PI / 2 + i * Math.PI / 2; _txt(String(n), cx + Math.cos(a) * (r * 0.6), cy + Math.sin(a) * (r * 0.6) + r * 0.15, FB(r * 0.4), WF.ink, 'center'); });
  const h12 = hours % 12, mn = (hours % 1) * 60; const ah = -Math.PI / 2 + h12 / 12 * Math.PI * 2, am = -Math.PI / 2 + mn / 60 * Math.PI * 2;
  ctx.save(); ctx.lineCap = 'round'; ctx.strokeStyle = WF.ink; ctx.lineWidth = 14; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(ah) * r * 0.5, cy + Math.sin(ah) * r * 0.5); ctx.stroke();
  ctx.lineWidth = 8; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.cos(am) * r * 0.78, cy + Math.sin(am) * r * 0.78); ctx.stroke(); ctx.restore(); circle(cx, cy, 14, WF.red);
};

/** "for me, 5 p.m. is not when work ends": her line typed on her words, the card's FRI OUT 17:00 struck on "p.m.", OUT ??:??
 *  stamped on "ends", the punch clock running on from "really" (B's motion test, with the round-2 fixes). o.L = her phrase. */
WF.clockOut = (o) => (t, r) => { r = WF.rr(r);
  rect(r.x, r.y, r.w, r.h, WF.wall); const L = o.L.w; const port = r.h > r.w; const x = r.x + V(96, 64);
  const f2 = V(112, 92), l2 = f2 * 1.0, yy = r.y + V(300, 380);
  WF.words(t, 'FOR ME,', x, yy - V(120, 104), V(62, 58), WF.mid, { times: [o.me.w[0], o.me.w[1]], key: 'co-forme' });
  WF.words(t, "I DON'T THINK THAT", x, yy, f2, WF.manila, { at: L[0], key: 'co-1' });
  WF.words(t, '5 P.M. IS REALLY', x, yy + l2, f2, WF.manila, { at: L[4], key: 'co-2' });
  WF.words(t, 'WHEN WORK ENDS', x, yy + 2 * l2, f2, WF.manila, { at: L[8], red: [2], key: 'co-3' });
  WF.words(t, 'FOR ME.', x, yy + 3 * l2, f2, WF.manila, { at: L[11], key: 'co-4' });
  const rows = { MON: ['09:00', '17:00', '17:45', '20:00'], TUE: ['09:00', '17:00', '', ''], WED: ['09:00', '17:00', '17:45', '20:00'], THU: ['09:00', '17:00', '17:45', '20:00'], FRI: ['09:00', '17:00', '', ''] };
  const card = WF.card({ at: o.at, rows, times: { FRI: [-1, -1, 0, 0] }, hiRow: 'FRI', redCell: { row: 'FRI', col: 1 }, strike: { row: 'FRI', col: 1, at: L[5] }, push: { at: L[4] - 0.1, row: 'FRI', k: V(0.1, 0.08) },
    extra: [{ at: L[10], s: 'OUT ??:??', row: 'FRI', col: 2, dy: 4, size: V(46, 42) }], w: V(700, 760), side: port ? 'center' : 'right' });
  const cr = port ? { x: r.x, y: r.y + r.h * 0.42, w: r.w, h: r.h * 0.58 } : { x: r.x + r.w * 0.5, y: r.y, w: r.w * 0.5, h: r.h };
  ctx.save(); ctx.beginPath(); ctx.rect(cr.x, cr.y, cr.w, cr.h); ctx.clip(); card(t, cr); ctx.restore();
  const hrs = 17 + 4.6 * wfE(t, L[7], 2.2, 'inOutQuart');
  const ccx = r.x + V(700, 930), ccy = r.y + V(840, 250), cR = V(110, 78);
  withA(wfE(t, o.at, 0.4), () => grp('clock', ccx - cR - 14, ccy - cR - 14, 2 * cR + 28, 2 * cR + 28, () => WF.clockFace(ccx, ccy, cR, hrs)));
};

/** the correction screen (her rule 2026-11-02): a plain manila screen where the correction types on, with the real source */
WF.fix = (o) => (t, r) => {
  rect(r.x, r.y, r.w, r.h, WF.manila); const m = V(110, 72); const a = o.at || 0;
  withA(wfE(t, a, 0.3), () => { txt(o.kicker || 'QUICK CORRECTION', r.x + m, r.y + V(170, 430), FC(V(40, 42)), WF.ink, 'left', 'alphabetic', 2, 'fix-kicker'); rect(r.x + m, r.y + V(196, 456), (r.w - 2 * m) * wfE(t, a, 0.5), 3, WF.rule); });
  const lines = PORTRAIT ? o.linesP : o.lines; const z = V(118, 104);
  lines.forEach((l, i) => WF.words(t, l, r.x + m, r.y + V(330, 590) + i * z * 0.98, z, i === lines.length - 1 ? WF.red : WF.ink, { at: a + 0.25 + i * 0.45, key: 'fix-l' + i }));
  const yb = r.y + V(330, 590) + lines.length * z * 0.98 + V(10, 20);
  withA(wfE(t, a + 0.3 + lines.length * 0.45, 0.4), () => txtW(o.body, r.x + m, yb, FW(V(40, 40)), WF.ink, r.w - 2 * m, V(52, 52), 0, 'fix-body'));
  if (o.clip) WF.clipOn(t, o.clip, r.x + m, yb + V(60, 140), Math.min(V(1300, 940), r.w - 2 * m), a + 0.6 + lines.length * 0.45, o.hl);
};
/** a bare clipping (white crop + marker + credit) drawn on any ground, used by WF.fix */
WF.clipOn = (t, key, x, y, w, at, hl) => {
  if (WF_CLIPS[key + '-p']) key = key + '-p';
  const c = WF_CLIPS[key], im = IMG['clip_' + key]; if (!c) return; const pad = 22, s = (w - 2 * pad) / c.w, h = c.h * s + 2 * pad; const a = wfE(t, at, 0.4);
  withA(a, () => grp('fix-clip', x, y, w, h, () => { rect(x, y, w, h, '#FFFFFF'); if (im) themeFixed(() => ctx.drawImage(im, x + pad, y + pad, c.w * s, c.h * s));
    if (hl != null) c.hl.forEach((b) => { const p = wfE(t, hl, 0.5, 'outExpo'); ctx.save(); ctx.globalCompositeOperation = 'multiply'; ctx.fillStyle = WF.hl; ctx.fillRect(x + pad + b[0] * s, y + pad + b[1] * s, b[2] * s * p, b[3] * s); ctx.restore(); });
    txt((c.source + '  ·  ' + c.date).toUpperCase(), x, y + h + V(40, 42), FC(V(36, 34)), WF.ink, 'left', 'alphabetic', 0, 'fix-credit'); }, { img: true, label: 'real page' }));
};

/** a tip stub: TIP 03 / 10 + the tip in plain words (the running counter the kit asked for, 01-10) */
WF.tip = (o) => (t, r) => { r = WF.rr(r);
  rect(r.x, r.y, r.w, r.h, WF.wall); const m = V(80, 60); const a = o.at || 0; const port = r.h > r.w;
  const sw = Math.min(r.w - 2 * m, V(880, 900)), lines = [].concat(o.lines); const z = o.size || V(130, 124); const sh = V(150, 150) + lines.length * z * 0.98 + V(70, 70);
  const x = r.x + (r.w - sw) / 2, y = r.y + Math.max(m, (r.h - sh - (o.capRoom || 0)) / 2); const p = wfE(t, a, 0.5);
  withA(clamp(p * 2), () => withT(0, (1 - p) * 60, 1, 0, () => grp('tip', x, y, sw, sh, () => {
    rect(x, y, sw, sh, WF.manila);
    txt('TIP', x + 44, y + V(118, 118), FB(V(76, 76)), WF.ink, 'left', 'alphabetic', 1, 'tip-word');
    txt(String(o.n).padStart(2, '0') + ' / ' + String(o.of || 10).padStart(2, '0'), x + 44 + tw('TIP ', FB(V(76, 76))) + 6, y + V(116, 116), FC(V(52, 52)), WF.ink, 'left', 'alphabetic', 2, 'tip-n');
    rect(x + 44, y + V(140, 140), sw - 88, 3, WF.rule);
    lines.forEach((l, i) => WF.words(t, l, x + 44, y + V(150, 150) + (i + 0.86) * z * 0.98, Math.min(z, z * (sw - 88) / Math.max(1, tw(l, FB(z))) ), i === lines.length - 1 ? WF.red : WF.ink, { at: (o.wordsAt || a + 0.2) + i * 0.3, key: 'tip-l' + i }));
  }, { label: 'tip card (drag, resize)' })));
};


/* the red word of a caption chunk / a sentence chunk: a number, else its longest topic word (WF.topic); none when nothing fits */
WF.weak = new Set(['a', 'an', 'the', 'of', 'to', 'and', 'or', 'but', 'in', 'on', 'at', 'for', 'with', 'from', 'by', 'as', 'is', 'are', 'was', 'be', 'that', 'this', 'my', 'your', 'their', 'our', 'its', 'if', 'so', 'not', 'i', 'we', 'you', 'they', 'it', "it's", "i'm", "you're", 'there', 'what', 'how', 'about', 'than', 'very', 'just', 'like', 'have', 'has', 'can', 'will', 'also', 'know', 'right', 'okay', 'yeah', 'really', 'going', 'some', 'all', 'do', 'me', 'when', 'where', 'then', 'which', 'would', 'want', 'get', 'because', "don't", 'one']);
WF.topic = new Set(('fulltime full-time masters job work working school study studying studies calendar calendars credits credit ects hours limit semester degree thesis nonthesis internship placement weeks block blocking blocks class classes evening '
  + 'deadline deadlines vacation leave paid days sleep bedtime health food meal prep prepping clock 24 estonia abroad international students parttime permits revoked free plan week december november monday friday saturday tuesday sundays '
  + 'communicate proactive developer office commute focus ends release exam lecturer outline electives bandwidth goal easy ghetto mad migraines hospital balance').split(/\s+/));
WF.redWord = (ws) => { let best = -1, sc = -1; ws.forEach((w, i) => { const n = w.toLowerCase().replace(/[^a-z0-9'%-]/g, '').replace(/'s$/, ''); const m = n.replace(/-/g, ''); if (!n || WF.weak.has(n)) return;
  const s = /\d/.test(n) ? 100 + n.length : (WF.topic.has(n) || WF.topic.has(m)) ? 50 + n.length : -1; if (s > sc) { sc = s; best = i; } }); return ws.length >= 2 && sc > 0 ? best : -1; };
/** her sentence as kinetic type (film scenes without a diagram): the sentence in chunks of one breath (<= 3 lines), each word
 *  landing on her word time, the chunk's strongest word in stamp red; o.kicker (Cutive), o.ground, o.stamp {s, at}, o.size.
 *  ph = a phrase from P() (its words: WORDS[ph.i ...]). Chunks replace each other with a hard cut (a new card on the wall). */
WF.say = (ph, o = {}) => {
  // big type takes her words without the fillers (captions keep every word): like, right, hey, okay, yeah, you know
  const raw = WORDS.slice(ph.i, ph.i + ph.w.length).map((w, k) => ({ s: w.w.replace(/[.,!?;:]+$/, '').toUpperCase(), n: w.n, end: /[,.?!;:]$/.test(w.w), t: ph.w[k] }));
  const FILL = new Set(['right', 'hey', 'okay', 'yeah', 'um']); const ws = [];
  raw.forEach((w, k) => { if (FILL.has(w.n)) { if (ws.length && w.end) ws[ws.length - 1].end = true; return; } if (w.n === 'you' && raw[k + 1] && raw[k + 1].n === 'know') return; if (w.n === 'know' && raw[k - 1] && raw[k - 1].n === 'you') { if (ws.length && w.end) ws[ws.length - 1].end = true; return; } ws.push(w); });
  const WEAK = new Set(['and', 'but', 'so', 'to', 'the', 'is', 'i', 'a', 'an', 'of', 'that', 'or', 'in', 'on', 'for', 'at', 'with', 'my', 'your', 'you', 'it', 'be', 'going', 'need', 'around', 'can', 'will', 'are', 'was', 'have', 'this', 'what', 'when', 'if', 'as', 'by', 'from', 'we', 'they', "i'm", "it's", "don't", 'just', 'also', 'do', 'of']);
  const maxC = o.maxC || V(46, 30), cap = maxC * (o.lines || 2), chunks = []; let cur = [];
  const len = (a) => a.map(x => x.s).join(' ').length;
  ws.forEach((w) => { if (cur.length && len(cur.concat([w])) > cap) { // break at the last phrase end in the chunk, else before trailing weak words
      let cut = -1; for (let j = cur.length - 1; j >= 2; j--) if (cur[j - 1].end) { cut = j; break; }
      if (cut < 0) { cut = cur.length; while (cut > 2 && WEAK.has(cur[cut - 1].n)) cut--; }
      chunks.push(cur.slice(0, cut)); cur = cur.slice(cut); }
    cur.push(w); if (w.end && len(cur) >= cap * 0.6) { chunks.push(cur); cur = []; } });
  if (cur.length) { if (chunks.length && cur.length < 2) chunks[chunks.length - 1] = chunks[chunks.length - 1].concat(cur); else chunks.push(cur); }
  for (let i = 0; i < chunks.length - 1; i++) while (chunks[i].length > 2 && WEAK.has(chunks[i][chunks[i].length - 1].n)) chunks[i + 1].unshift(chunks[i].pop());
  if (chunks.length > 1 && WEAK.has(chunks[chunks.length - 1].slice(-1)[0].n) && chunks[chunks.length - 1].length < 2) chunks[chunks.length - 2] = chunks[chunks.length - 2].concat(chunks.pop());
  return (t, r) => {
    const gr0 = G[o.ground || 'wfWall']; rect(r.x, r.y, r.w, r.h, gr0.bg); const m = V(110, 72); const gr = o.variant === 'card' ? G.wfCard : gr0;
    let ci = 0; for (let k = 0; k < chunks.length; k++) if (t >= chunks[k][0].t - 0.15) ci = k; const ch = chunks[ci];
    const z0 = o.size || V(150, 128); const f = (z) => FB(z);
    // lines: greedy by width
    const card = o.variant === 'card', center = false; const maxW = r.w - 2 * m - (card ? V(160, 100) : 0);
    // balanced lines (never one word alone on the last line): fewest lines that fit, then the most even split
    const wOf = (a) => tw(a.map(x => x.s).join(' '), f(z0)); let lines = [ch];
    for (let nL = 1; nL <= 4; nL++) { if (nL > ch.length) break; let best = null;
      const rec = (i, left, acc) => { if (left === 1) { const l = ch.slice(i); if (!l.length) return; const all = acc.concat([l]); const mx = Math.max(...all.map(wOf)); const lone = l.length === 1 && ch.length > 2;
        const sc = mx + (lone ? 1e5 : 0); if (!best || sc < best.sc) best = { sc, all, mx }; return; }
        for (let j = i + 1; j < ch.length; j++) rec(j, left - 1, acc.concat([ch.slice(i, j)])); };
      rec(0, nL, []); if (best && best.mx <= maxW) { lines = best.all; break; } if (best) lines = best.all; }
    let z = z0; const widest = Math.max(...lines.map(l => tw(l.map(x => x.s).join(' '), f(z0)))); if (widest > maxW) z = z0 * maxW / widest;
    const red = WF.redWord(ch.map(x => x.s)); const H_ = lines.length * z * 0.98 + (o.kicker ? V(70, 70) : 0);
    let y = r.y + (r.h - H_) / 2 + (o.kicker ? V(70, 70) : 0); let idx = 0;
    if (o.variant === 'card') { const cw = Math.max(...lines.map(l => tw(l.map(x => x.s).join(' '), f(z)))) + V(160, 100), chh = H_ + V(120, 100), cx = r.x + m - V(60, 40), cy = r.y + (r.h - chh) / 2;
      withT(cx + cw / 2, cy + chh / 2, 1, -0.012, () => { rect(-cw / 2, -chh / 2, cw, chh, WF.manila); }); }
    if (o.kicker) txt(o.kicker, r.x + m, y - V(46, 46), FC(V(44, 38)), gr.mid, 'left', 'alphabetic', 2, 'say-kicker');
    lines.forEach((l, li) => { y += z * 0.86; let x = r.x + m;
      if (center) x = r.x + (r.w - tw(l.map(q => q.s).join(' '), f(z), z * 0.01)) / 2;
      l.forEach((w) => { const p = wfE(t, ch[0].t - 0.12 + idx * 0.05, 0.26); const col = idx === red ? WF.red : gr.fg;
        withA(clamp(p * 1.4), () => _txt(w.s, x, y + z * 0.1 * (1 - p), f(z), col, 'left', 'alphabetic', z * 0.01)); x += tw(w.s + ' ', f(z), z * 0.01); idx++; });
      y += z * 0.12; });
    regBox(ovr('say-' + ci), r.x + m, r.y + (r.h - H_) / 2, maxW, H_, { text: ch.map(x => x.s).join(' '), def: ch.map(x => x.s).join(' ') });
    if (o.stamp) WF.stamp(t, o.stamp.at, o.stamp.s, r.x + r.w * (o.stamp.fx || 0.72), r.y + r.h * (o.stamp.fy || 0.8), o.stamp.size || V(100, 92), WF.red, { rot: -0.06, key: 'say-stamp' });
  };
};

/** turn the queued landing sounds into cues: one sound per landing, none within 0.35 s of a cue already there (SOUND-PALETTE:
 *  a role per meaning: paper = a card / sheet lands, tick = a list row, typeHit = a line of type, stamp = a stamp) */
WF.flush = (db = -6) => { const have = CUES.map(c => c.t); for (const [role, t] of WF.q.sort((a, b) => a[1] - b[1])) { if (have.some(h => Math.abs(h - t) < 0.35)) continue; sfx(role, t, role === 'tick' ? db - 2 : db); have.push(t); } WF.q = []; };
