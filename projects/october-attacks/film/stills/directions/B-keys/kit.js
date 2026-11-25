/* B · THE KEY BOARD. Almost every October story is about keys: secret keys in .env files, admin tokens that never
 * expired, AI API keys, a certificate signing key that was the number 4. So the film is a pegboard key wall (the place
 * where you keep keys): every platform hangs its key on a hook, keys get taken, swapped, kept too long.
 * Ground: pegboard #C99A66 with its holes #B4844F (a flat dot grid, never moving); tag paper #FBF5E8; ink #1D1A16;
 * keys nickel #E6E2D8 with an ink outline; ONE accent: tag red #E2231A. A second ground, ink #1D1A16, for explainers.
 * Type: Bowlby One (headlines), Figtree 700 (sentences), Overpass Mono 600 (tags, labels, code). */
'use strict';
const B = { peg: '#C99A66', hole: '#B4844F', ink: '#1D1A16', paper: '#FBF5E8', nickel: '#E6E2D8', nickel2: '#B9B4A8', red: '#E2231A', brass: '#D9A441', inkSoft: '#3A332B' };
G.peg = { bg: B.peg, fg: B.ink, mid: 'rgba(29,26,22,0.66)', line: 'rgba(29,26,22,0.3)', acc: B.red, card: B.paper, panel: B.paper, grid: B.hole, mode: 'light' };
G.inkB = { bg: B.ink, fg: B.paper, mid: '#A89C8A', line: 'rgba(251,245,232,0.18)', acc: B.red, card: B.paper, panel: '#2A251F', grid: '#27221C', mode: 'dark' };
F.disp = (s) => `400 ${s}px "Bowlby One"`;
F.body = (s, w = 700) => `${w} ${s}px Figtree`;
F.mono = (s, w = 600) => `${w} ${s}px "Overpass Mono"`;
LS.disp = -0.01; LS.mono = 0.04;
/** the pegboard: a flat grid of holes (static) */
function pegboard(col = B.hole, step = 60) { ctx.fillStyle = col; for (let y = step / 2; y < H; y += step) for (let x = step / 2; x < W; x += step) { ctx.beginPath(); ctx.arc(x, y, 6.5, 0, Math.PI * 2); ctx.fill(); } }
/** a hook in the board at (x, y) */
function hook(x, y, col = B.ink) { rect(x - 9, y - 9, 18, 18, col); ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x, y + 26); ctx.arc(x + 12, y + 26, 12, Math.PI, 0, true); ctx.stroke(); ctx.restore(); }
/**
 * A key hanging from (x, y) (the ring's top), length len, rotated by rot (rad, swinging about the ring).
 * o: fill, bits (tooth depths 0..1), holes (n punched holes), label (engraved on the bow), labelSize, tag {text, lines, col, w}
 */
function key(x, y, len, rot, o = {}) {
  const r = len * 0.2, bw = len * 0.16, fill = o.fill || B.nickel, ink = o.ink || B.ink, lw = Math.max(3, len * 0.012);
  ctx.save(); ctx.translate(x, y); ctx.rotate(rot || 0);
  // ring
  ctx.strokeStyle = ink; ctx.lineWidth = lw * 1.4; ctx.beginPath(); ctx.arc(0, r * 0.32, r * 0.32, 0, Math.PI * 2); ctx.stroke();
  const by = r * 0.64 + r;   // bow centre
  // tag on the ring (hangs to the side)
  if (o.tag) { const tg = o.tag; const tw_ = tg.w || len * 0.62; const th = tg.h || (tg.lines ? tg.lines.length : 1) * (tg.size || 34) * 1.35 + 34;
    ctx.save(); ctx.rotate(tg.rot == null ? -0.5 : tg.rot); ctx.strokeStyle = ink; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(0, r * 0.32); ctx.lineTo(0, r * 0.32 + 40); ctx.stroke();
    const tx = -tw_ / 2, ty = r * 0.32 + 40; fillRR(tx, ty, tw_, th, 10, tg.col || B.paper); strokeRR(tx, ty, tw_, th, 10, ink, 3); circle(0, ty + 16, 7, ink === B.ink ? B.peg : ink);
    (tg.lines || [tg.text]).forEach((ln, i) => _txt(ln, 0, ty + 34 + (i + 1) * (tg.size || 34) * 1.3 - 6, F.mono(tg.size || 34, 600), tg.ink || ink, 'center'));
    ctx.restore(); }
  // bow
  ctx.beginPath(); ctx.arc(0, by, r, 0, Math.PI * 2); ctx.fillStyle = fill; ctx.fill(); ctx.lineWidth = lw; ctx.strokeStyle = ink; ctx.stroke();
  if (!o.label) { circle(0, by - r * 0.55, r * 0.17, o.bg || B.peg); ctx.beginPath(); ctx.arc(0, by - r * 0.55, r * 0.17, 0, Math.PI * 2); ctx.stroke(); }
  if (o.label) _txt(o.label, 0, by + r * 0.5, F.disp(o.labelSize || r * 0.62), o.labelCol || ink, 'center');
  // blade with bitting on the right
  const y0 = by + r * 0.92, y1 = by + r + len * 0.62, bits = o.bits || [0.5, 0.9, 0.3, 0.7, 0.4];
  ctx.beginPath(); ctx.moveTo(-bw / 2, y0); ctx.lineTo(-bw / 2, y1); ctx.lineTo(0, y1 + bw * 0.6); ctx.lineTo(bw / 2, y1 - bw * 0.2);
  const n = bits.length, step = (y1 - bw * 0.4 - (y0 + len * 0.1)) / n;
  for (let i = n - 1; i >= 0; i--) { const yy = y0 + len * 0.1 + i * step; const d = bw / 2 + bits[i] * bw * 0.75; ctx.lineTo(d, yy + step * 0.75); ctx.lineTo(d, yy + step * 0.25); ctx.lineTo(bw / 2, yy); }
  ctx.lineTo(bw / 2, y0); ctx.closePath(); ctx.fillStyle = fill; ctx.fill(); ctx.strokeStyle = ink; ctx.lineWidth = lw; ctx.lineJoin = 'round'; ctx.stroke();
  // groove
  rect(-bw * 0.12, y0 + len * 0.04, bw * 0.08, y1 - y0 - len * 0.1, ink);
  for (let i = 0; i < (o.holes || 0); i++) { const hy = y0 + len * 0.14 + i * len * 0.2; const p = o.holeP ? o.holeP[i] : 1; if (p <= 0) continue; circle(0, hy, bw * 0.34 * p, o.bg || B.peg); ctx.beginPath(); ctx.arc(0, hy, bw * 0.34 * p, 0, Math.PI * 2); ctx.lineWidth = lw; ctx.strokeStyle = ink; ctx.stroke(); }
  ctx.restore();
}
/** a hanging swing: a damped pendulum angle after being hung at t0 (amp rad) */
const swing = (t, t0, amp = 0.35, f = 1.1, zeta = 0.18) => { zeta = Math.max(zeta, 0.34); const s = t - t0; if (s < 0) return amp; return amp * Math.exp(-zeta * 2 * Math.PI * f * s) * Math.cos(2 * Math.PI * f * s * Math.sqrt(1 - zeta * zeta)); };
/** a paper sign pinned to the board (two ink pins) */
function sign(x, y, w, h, fn, col = B.paper) { fillRR(x, y, w, h, 8, col); circle(x + 26, y + 24, 8, B.ink); circle(x + w - 26, y + 24, 8, B.ink); fn(); }
/** a bulldog clip at the top centre of a clipping */
function bulldog(cx, y, w = 150) { fillRR(cx - w / 2, y - 34, w, 58, 10, B.ink); ctx.save(); ctx.strokeStyle = B.ink; ctx.lineWidth = 7; ctx.beginPath(); ctx.moveTo(cx - w * 0.3, y - 30); ctx.lineTo(cx - w * 0.18, y - 82); ctx.lineTo(cx + w * 0.18, y - 82); ctx.lineTo(cx + w * 0.3, y - 30); ctx.stroke(); ctx.restore(); }
