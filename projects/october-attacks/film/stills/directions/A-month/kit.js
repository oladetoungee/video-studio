/* A · THE MONTH. The October 2026 calendar is the film's spine: every attack lands on its date, the month fills up
 * "one attack after the other", and each story is told inside its day (the camera dives into the cell).
 * Grounds: October orange #F2541B (the month), night #16110D (inside a day), bone #EFE7D8 (explainers).
 * Type: Anton (numerals + headlines, caps), Manrope 700 (sentences), Spline Sans Mono 500 (labels, code).
 * One accent per scene: on orange the accent is ink; on night and bone it is the orange. */
'use strict';
const A = { orange: '#F2541B', ink: '#16110D', bone: '#EFE7D8', night: '#16110D', dim: '#8C8173', rule: 'rgba(22,17,13,0.28)', ruleN: 'rgba(239,231,216,0.16)', card: '#FBF6EC' };
G.oct = { bg: A.orange, fg: A.ink, mid: 'rgba(22,17,13,0.62)', line: A.rule, acc: A.ink, card: A.card, panel: A.card, grid: A.rule };
G.night = { bg: A.night, fg: A.bone, mid: '#9C9182', line: A.ruleN, acc: A.orange, card: A.card, panel: '#221B15', grid: A.ruleN, mode: 'dark' };
G.bone = { bg: A.bone, fg: A.ink, mid: '#6E655A', line: 'rgba(22,17,13,0.18)', acc: A.orange, card: A.card, panel: '#E3D9C6', grid: 'rgba(22,17,13,0.10)', mode: 'light' };
F.disp = (s) => `400 ${s}px Anton`;
F.body = (s, w = 700) => `${w} ${s}px Manrope`;
F.mono = (s, w = 500) => `${w} ${s}px "Spline Sans Mono"`;
LS.disp = 0.0; LS.mono = 0.06;

/* the month: Oct 1 2026 is a Thursday; weeks start on Monday (Estonia) */
const DAY0 = 3;   // column of the 1st
const cellOf = (d) => { const i = DAY0 + d - 1; return [i % 7, Math.floor(i / 7)]; };
const ATTACKS = [ // day, label, when it lands in the opening (index into the "one attack after the other" times)
  [14, 'ZEABUR'], [15, 'ZEABUR'], [17, 'EMUDHRA'], [19, 'OPENCODE'], [21, 'PHP2SHELL'], [21, 'RAILWAY'],
];
/** grid geometry for the current layout */
function monthGeo() {
  return PORTRAIT ? { x: 60, y: 830, w: 960, rowH: 106, head: 808 } : { x: 110, y: 366, w: 1700, rowH: 132, head: 342 };
}
/**
 * The calendar. o: t0 (draw-in start), fills [{d, at, label}], hide (cells to skip), numCol, dim
 * Cells flip down like a tear-off page when they fill (scaleY about the top edge, 0.3 s outQuint).
 */
function month(t, o) {
  const M = monthGeo(); const cw = M.w / 7; const lw = 2;
  const dIn = (i) => ez(t, o.t0 + i * 0.012, 0.5);
  // weekday initials
  ['M', 'T', 'W', 'T', 'F', 'S', 'S'].forEach((d, i) => withA(dIn(i), () => _mono(d, M.x + i * cw + 14, M.head, 32, g.mid, 'left', { ls: 0.1 })));
  // hairlines draw left -> right
  for (let r = 0; r <= 5; r++) hline(M.x, M.y + r * M.rowH, M.w, ez(t, o.t0 + r * 0.05, 0.6, 'outExpo'), g.line, lw);
  for (let c = 0; c <= 7; c++) { const p = ez(t, o.t0 + 0.1 + c * 0.03, 0.6, 'outExpo'); rect(M.x + c * cw - lw / 2, M.y, lw, 5 * M.rowH * p, g.line); }
  const byDay = {}; (o.fills || []).forEach(f => { (byDay[f.d] = byDay[f.d] || []).push(f); });
  const numS = PORTRAIT ? 50 : 52;
  for (let d = 1; d <= 31; d++) {
    const [c, r] = cellOf(d); const x = M.x + c * cw, y = M.y + r * M.rowH; const fs = byDay[d];
    const pf = fs ? ez(t, fs[0].at, 0.32) : 0;
    if (pf > 0) { // the flip: a dark page drops from the top edge of the cell
      ctx.save(); ctx.translate(x, y); ctx.scale(1, pf); rect(lw / 2, lw / 2, cw - lw, M.rowH - lw, A.ink); ctx.restore();
    }
    const nin = dIn(7 + d * 0.5) * (o.numFade && o.numFade[0] === d ? clamp(o.numFade[1]) : 1);
    const two = fs && fs.length > 1 && fs[0].label;   // two stories on one day: a smaller number, both names under it
    withA(nin, () => _txt(String(d), x + 14, y + (two ? 46 : numS + 8), F.disp(two ? 40 : numS), pf > 0.5 ? A.orange : g.fg, 'left'));
    if (fs) fs.forEach((f, k) => { const p = ez(t, f.at + 0.12, 0.3); if (p <= 0 || !f.label) return;
      withA(p * (o.labelA == null ? 1 : clamp(o.labelA)), () => _mono(f.label, x + 14, y + M.rowH - 16 - (fs.length - 1 - k) * 34 + 8 * (1 - p), 30, A.bone, 'left', { ls: 0.02 })); });
  }
  return M;
}
/** the screen-space rectangle of a day cell (for the dive) */
function cellRect(d) { const M = monthGeo(); const cw = M.w / 7; const [c, r] = cellOf(d); return [M.x + c * cw, M.y + r * M.rowH, cw, M.rowH]; }
/** camera dive: draw fn with a transform that grows cell d to fill the frame (p 0 -> 1) */
function dive(p, d, fn) {
  const [x, y, w, h] = cellRect(d); const s = lerp(1, Math.max(W / w, H / h) * 1.02, p);
  const cx = lerp(W / 2, x + w / 2, Math.min(1, p * 1.4)), cy = lerp(H / 2, y + h / 2, Math.min(1, p * 1.4));
  ctx.save(); ctx.translate(W / 2, H / 2); ctx.scale(s, s); ctx.translate(-cx, -cy); fn(); ctx.restore();
}
/** the running day header inside a day: big orange date + mono weekday line */
function dayHead(t, t0, d, wd, x, y, o = {}) {
  const p = ez(t, t0, 0.5); const s = o.size || V(150, 170);
  withA(p, () => { _txt(String(d), x, y + 18 * (1 - p), F.disp(s), A.orange, 'left'); const x2 = x + tw(String(d), F.disp(s)) + 26;
    if (o.name) { _mono(wd + ' ' + d + ' OCTOBER 2026', x2, y - s * 0.62, 32, g.mid, 'left', { ls: 0.08 }); txt(o.name, x2, y, F.disp(s * 0.56), o.nameCol || g.fg, 'left'); }
    else _mono(wd + ' ' + d + ' OCTOBER 2026', x2, y - 12, 32, g.mid, 'left', { ls: 0.08 }); });
}

/** every story happens INSIDE its day: the frame is the zoomed day cell (hairline border), with the neighbouring days'
 *  numbers peeking in the gutters, so the calendar never leaves the screen */
function dayFrame(t, t0, d) {
  const m = 46, p = ez(t, t0, 0.5); const col = g === G.night ? 'rgba(239,231,216,0.22)' : 'rgba(22,17,13,0.22)';
  withA(p, () => { strokeR(m, m, W - 2 * m, H - 2 * m, col, 3);
    const nb = g === G.night ? '#5A5047' : '#B9AE9C';
    _txt(String(d - 1), 8, V(110, 120), F.disp(32), nb, 'left'); _txt(String(d + 1), W - 8, V(110, 120), F.disp(32), nb, 'right');
    _txt(String(d + 7), m + 18, H - 30, F.disp(32), nb, 'left'); });
}
/** a sentence that wipes on as one block (left to right), not word by word: the second entry style of the film */
function wipeLines(t, t0, lines, x, y, font, col, lh, d = 0.5, key) {
  const p = ez(t, t0, d, 'outExpo'); if (p <= 0) return; const fs = fontPx(font);
  const w = Math.max(...lines.map(l => tw(l, font))) + 20;
  ctx.save(); ctx.beginPath(); ctx.rect(x - 10, y - fs, w * p, lines.length * lh + fs * 0.5); ctx.clip();
  lines.forEach((l, i) => txt(l, x + 24 * (1 - p), y + i * lh, font, col, 'left', 'alphabetic', 0, key ? key + i : undefined)); ctx.restore();
}
