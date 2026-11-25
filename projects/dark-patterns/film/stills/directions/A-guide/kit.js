/* A · THE FIELD GUIDE. "Every trick has a name." Each dark pattern is a specimen pinned in a museum drawer: the UI thing
 * itself (a pop-up, a cart, a countdown) on a cream specimen card, a red pin, a paper tag, its common name in a big serif,
 * and the real deceptive.design entry pinned beside it as the guide's reference plate.
 * Grounds: drawer ochre #D19B2C (felt; round 2: was teal, too close to ux-research's green wall), card cream #F5F1E6. Ink #15201F. ONE accent: pin red #E5322B (pins, the trick
 * circled, the counter) and it only ever sits on cream (on teal it would fail contrast).
 * Type: Young Serif 400 (common names, numbers), Hanken Grotesk 500-900 (sentences, UI), Martian Mono 500 (labels, tags). */
'use strict';
const A = { teal: '#D19B2C', tealD: '#B9861F', tealL: '#E0B252', txt: '#1B1608', txtMid: '#4E3B12', cream: '#F5F1E6', ink: '#15201F', mid: '#5E6B68', red: '#E5322B', redD: '#B3221C', paper: '#FFFFFF', tag: '#EDE3CC', creamMid: '#A9C4C0' };
G.drawer = { bg: A.teal, fg: A.txt, mid: A.txtMid, line: 'rgba(245,241,230,0.18)', acc: A.cream, card: A.cream, panel: A.tealD, grid: 'rgba(245,241,230,0.08)', mode: 'dark' };
G.black = { bg: '#000000', fg: A.cream, mid: '#8A8A86', line: 'rgba(255,255,255,0.2)', acc: A.red, card: A.cream, panel: '#111', grid: 'rgba(255,255,255,0.1)' };
F.disp = (s) => `400 ${s}px "Young Serif"`;
F.body = (s, w = 500) => `${w} ${s}px "Hanken Grotesk"`;
F.mono = (s, w = 500) => `${w} ${s}px "Martian Mono"`;
LS.disp = -0.01; LS.mono = 0.02;
const NAMES = ['Confirmshaming', 'Hard to cancel', 'Sneak into basket', 'Hidden costs', 'Hidden subscription', 'Trick wording', 'Disguised ads', 'Nagging', 'Pre-selection', 'Fake urgency', 'Fake scarcity'];

/** the drawer: flat teal with a darker inset rim and faint compartment hairlines */
function drawer() {
  const m = V(34, 30); rect(0, 0, W, H, A.teal); strokeR(m, m, W - 2 * m, H - 2 * m, A.tealD, 16);
  ctx.fillStyle = 'rgba(27,22,8,0.07)'; for (let x = 480; x < W - 60; x += 480) ctx.fillRect(x, 50, 2, H - 100);
}
/** a specimen card (cream, inner hairline); label top-left, foot bottom-left */
function specimen(x, y, w, h, label, foot, o = {}) {
  const a = o.a == null ? 1 : o.a; if (a <= 0) return; const rise = (o.rise || 0);
  withA(a, () => { ctx.save(); ctx.translate(0, rise);
    rect(x + 8, y + 10, w, h, 'rgba(60,40,5,0.30)');           // its shadow on the felt (flat, offset)
    rect(x, y, w, h, A.cream); strokeR(x + 16, y + 16, w - 32, h - 32, 'rgba(21,32,31,0.22)', 2);
    if (label) _txt(label, x + 40, y + 66, F.mono(28, 500), A.mid, 'left', 'alphabetic', 0.6);
    if (foot) _txt(foot, x + 40, y + h - 40, F.mono(28, 500), A.mid, 'left', 'alphabetic', 0.6);
    if (o.draw) o.draw(); ctx.restore(); });
}
/** a red pin: drops in (scale 1.7 -> 1), flat head with a darker ring */
function pin(t, t0, x, y, r = 15) {
  const p = t0 == null ? 1 : ez(t, t0, 0.28, 'outBack'); if (p <= 0) return; const s = lerp(1.7, 1, clamp(p)); const a = clamp(p * 3);
  withA(a, () => { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
    ctx.fillStyle = 'rgba(0,0,0,0.25)'; ctx.beginPath(); ctx.ellipse(5, 7, r, r * 0.8, 0, 0, Math.PI * 2); ctx.fill();
    circle(0, 0, r, A.redD); circle(-1, -1, r - 3, A.red); ctx.restore(); });
}
/** a paper tag on a string from (sx, sy): tag body at x, y; lines of mono text */
function tag(t, t0, sx, sy, x, y, lines, o = {}) {
  const p = t0 == null ? 1 : ez(t, t0, 0.45); if (p <= 0) return;
  const size = o.size || 28; const w = o.w || Math.max(...lines.map(s => tw(s, F.mono(size, 500), size * 0.02))) + 70; const h = lines.length * size * 1.45 + 34;
  withA(clamp(p * 2), () => { ctx.save(); ctx.translate(0, 18 * (1 - p)); ctx.rotate(o.rot || 0);
    ctx.strokeStyle = 'rgba(21,32,31,0.55)'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(sx, sy); ctx.quadraticCurveTo((sx + x) / 2, Math.max(sy, y) + 30, x + 18, y + h / 2); ctx.stroke();
    ctx.fillStyle = A.tag; ctx.beginPath(); ctx.moveTo(x + 22, y); ctx.lineTo(x + w, y); ctx.lineTo(x + w, y + h); ctx.lineTo(x + 22, y + h); ctx.lineTo(x, y + h - 18); ctx.lineTo(x, y + 18); ctx.closePath(); ctx.fill();
    circle(x + 18, y + h / 2, 6, A.cream); ctx.strokeStyle = 'rgba(21,32,31,0.4)'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(x + 18, y + h / 2, 6, 0, 7); ctx.stroke();
    lines.forEach((s, i) => _txt(s, x + 44, y + 17 + size * 1.05 + i * size * 1.45, F.mono(size, 500), A.ink, 'left', 'alphabetic', size * 0.02));
    ctx.restore(); });
}
/** the field notes beside a specimen: COMMON NAME label + the name in Young Serif + notes */
function fieldName(t, t0, x, y, label, name, maxW, size = 104, o = {}) {
  const pl = t0 == null ? 1 : ez(t, t0 - 0.15, 0.4); withA(pl, () => _txt(label, x, y, F.mono(30, 500), o.labelCol || A.txtMid, 'left', 'alphabetic', 0.6));
  const s = fitSize(name, F.disp, size, maxW);
  KT(t, { lines: [name], x, y: y + s * 1.02 + 6, size: s, times: o.times || [t0 == null ? -9 : t0], col: o.col || A.txt, font: 'disp', upper: false, blur: 8, id: o.id });
  return y + s * 1.02 + 6;
}
/** the generic shop pop-up (no brand) */
function popup(t, x, y, w, o = {}) {
  const h = w * 0.86; rect(x, y, w, h, A.paper); strokeR(x, y, w, h, 'rgba(21,32,31,0.14)', 2);
  const cx = x + w / 2;
  _txt('10% OFF', cx, y + h * 0.27, F.body(w * 0.19, 900), A.ink, 'center');
  _txt('your first order', cx, y + h * 0.37, F.body(w * 0.058, 500), A.mid, 'center');
  rect(x + w * 0.1, y + h * 0.47, w * 0.8, h * 0.17, A.ink); _txt('Yes please', cx, y + h * 0.585, F.body(w * 0.07, 700), A.cream, 'center');
  const ls = w * 0.05; const ln = 'No thanks, I hate saving money'; const lw = tw(ln, F.body(ls, 500));
  const pa = o.linkAt == null ? 1 : ez(t, o.linkAt, 0.4);
  withA(pa, () => { _txt(ln, cx, y + h * 0.78, F.body(ls, 500), '#6F6F6A', 'center'); rect(cx - lw / 2, y + h * 0.78 + 6, lw, 2, '#8C8C86'); });
  return { lx: cx, ly: y + h * 0.78 - ls * 0.35, lw, lh: ls * 1.6, h };
}
