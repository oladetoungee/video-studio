/* C · BLOWN UP. Spot the trick. The small print is the problem, so the film makes it huge: every trick's UI is shown at
 * poster scale on a flat pink ground, and a black magnifier ring finds the trick and blows it up 3x. The camera then
 * zooms THROUGH the lens into the next screen (signature transition).
 * Ground pink #FF9EC4, ink #111111, UI white #FFFFFF. ONE accent device: the marker is a solid ink block with the word
 * knocked out in pink (no yellow, no red). Type: Geist 800/900 (UI + headlines), Geist 300 (her quoted words),
 * Geist Mono 500 (labels, counter). */
'use strict';
const Cz = { pink: '#FF9EC4', ink: '#111111', white: '#FFFFFF', mid: '#5C3446', grey: '#7A7A7A', line: 'rgba(17,17,17,0.16)' };
G.pink = { bg: Cz.pink, fg: Cz.ink, mid: Cz.mid, line: Cz.line, acc: Cz.ink, card: Cz.white, panel: '#FFC4DB', grid: Cz.line, mode: 'light' };
G.pink2 = { ...G.pink };
F.disp = (s, w = 900) => `${w} ${s}px Geist`;
F.body = (s, w = 600) => `${w} ${s}px Geist`;
F.mono = (s, w = 500) => `${w} ${s}px "Geist Mono"`;
LS.disp = -0.02; LS.mono = 0.06;
/** the counter, bottom-right */
function counter(n) { _txt(String(n).padStart(2, '0') + ' / 11', W - V(70, 80), V(H - 60, 1440), F.mono(30, 500), Cz.ink, 'right', 'alphabetic', 2); }
/** a marker block: ink block behind a word, the word knocked out in pink. p 0..1 sweeps left -> right */
function block(s, x, y, font, p, base = 'alphabetic') {
  const w = tw(s, font); const fs = fontPx(font); if (p <= 0) { _txt(s, x, y, font, Cz.ink, 'left', base); return w; }
  const bx = x - fs * 0.12, by = y - fs * 0.86, bw = (w + fs * 0.24) * E.outExpo(clamp(p)), bh = fs * 1.08;
  _txt(s, x, y, font, Cz.ink, 'left', base); rect(bx, by, bw, bh, Cz.ink);
  clipRect(bx, by, bw, bh, () => _txt(s, x, y, font, Cz.pink, 'left', base)); return w;
}
/** the magnifier: a black ring at (cx, cy) radius r; inside, draw fn zoomed k x around (fx, fy) */
function magnifier(cx, cy, r, k, fx, fy, fn) {
  if (r < 2) return;
  clipCircle(cx, cy, r, () => { rect(cx - r, cy - r, 2 * r, 2 * r, Cz.white); ctx.save(); ctx.translate(cx, cy); ctx.scale(k, k); ctx.translate(-fx, -fy); fn(); ctx.restore(); });
  ctx.save(); ctx.strokeStyle = Cz.ink; ctx.lineWidth = V(20, 18); ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke();
  // the handle, bottom-right
  ctx.lineWidth = V(34, 30); ctx.lineCap = 'butt'; const a = Math.PI / 4; ctx.beginPath(); ctx.moveTo(cx + Math.cos(a) * (r + 8), cy + Math.sin(a) * (r + 8)); ctx.lineTo(cx + Math.cos(a) * (r + r * 0.55), cy + Math.sin(a) * (r + r * 0.55)); ctx.stroke(); ctx.restore();
}
/** the pop-up at poster scale; returns the link's box */
function bigPopup(t, x, y, w, o = {}) {
  const h = w * 0.78; rect(x, y, w, h, Cz.white); const cx = x + w / 2;
  withA(o.offAt == null ? 1 : ez(t, o.offAt, 0.35), () => _txt('10% OFF', cx, y + h * 0.32, F.disp(w * 0.2), Cz.ink, 'center'));
  withA(o.btnAt == null ? 1 : ez(t, o.btnAt, 0.35), () => { rect(x + w * 0.1, y + h * 0.43, w * 0.8, h * 0.2, Cz.ink); _txt('Yes please', cx, y + h * 0.565, F.body(w * 0.065, 700), Cz.white, 'center'); });
  const ln = 'No thanks, I hate saving money'; const fs = w * 0.034; const lw = tw(ln, F.body(fs, 500));
  const pl = o.linkAt == null ? 1 : clamp((t - o.linkAt) / 0.9); const n = Math.round(ln.length * pl);
  _txt(ln.slice(0, n), cx - lw / 2, y + h * 0.8, F.body(fs, 500), Cz.grey, 'left'); if (pl >= 1) rect(cx - lw / 2, y + h * 0.8 + 4, lw, 1.5, Cz.grey);
  return { lx: cx, ly: y + h * 0.8 - fs * 0.35, lw, fs, x0: cx - lw / 2, y0: y + h * 0.8 };
}
