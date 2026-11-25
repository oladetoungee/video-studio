/* B · VERSION A / VERSION B. The video's own A/B test: every screen is split. Left (top in 9:16) = A, the honest version,
 * paper #EEECE6 with ink #161616. Right (bottom) = B, the version that wins the test, ink #141414 with paper text.
 * The same generic shop sits on both sides; only B carries the trick, and ONLY B gets the accent, signal red #FF3B30.
 * The divider is the signature move: it slides in, sweeps, and at the end A takes the whole frame ("build the honest version").
 * Type: Space Grotesk 700/500 (headlines, UI), Space Mono 400/700 (labels, prices). */
'use strict';
const B = { paper: '#EEECE6', ink: '#141414', inkT: '#161616', mid: '#6B6862', midD: '#A3A09A', red: '#FF3B30', white: '#FFFFFF', line: 'rgba(22,22,22,0.14)' };
G.split = { bg: B.paper, fg: B.inkT, mid: B.mid, line: B.line, acc: B.red, card: B.white, panel: '#E2DFD7', grid: B.line, mode: 'light' };
G.split2 = { ...G.split };
F.disp = (s, w = 700) => `${w} ${s}px "Space Grotesk"`;
F.body = (s, w = 500) => `${w} ${s}px "Space Grotesk"`;
F.mono = (s, w = 400) => `${w} ${s}px "Space Mono"`;
LS.disp = -0.02; LS.mono = 0.04;
/** the split: p = how far B has come in (0 = all A, 1 = half/half). Returns the two halves as boxes {x,y,w,h,side} */
function split(p = 1) {
  if (!PORTRAIT) { const sx = lerp(W, W / 2, p); rect(0, 0, W, H, B.paper); rect(sx, 0, W - sx, H, B.ink);
    return [{ x: 0, y: 0, w: sx, h: H, side: 'A' }, { x: sx, y: 0, w: W - sx, h: H, side: 'B' }]; }
  const sy = lerp(H, 905, p); rect(0, 0, W, H, B.paper); rect(0, sy, W, H - sy, B.ink);
  return [{ x: 0, y: 0, w: W, h: sy, side: 'A' }, { x: 0, y: sy, w: W, h: H - sy, side: 'B' }];
}
const fgOf = (s) => (s === 'A' ? B.inkT : B.paper), midOf = (s) => (s === 'A' ? B.mid : B.midD);
/** the side label: a big letter + what the side is */
function sideLabel(t, t0, hb, s) {
  const p = t0 == null ? 1 : ez(t, t0, 0.4); const x = hb.x + V(80, 80), y = PORTRAIT ? (s === 'A' ? 450 : 990) : 150;
  withA(p, () => { _txt(s, x, y + 8, F.disp(V(88, 76)), s === 'A' ? B.inkT : B.red, 'left'); _txt(s === 'A' ? 'THE HONEST VERSION' : 'THE VERSION THAT WINS', x + V(80, 70), y, F.mono(V(30, 32), 400), midOf(s), 'left', 'alphabetic', 1.2); });
}
/** a shop row: optional photo, name, price */
function row(x, y, w, name, price, o = {}) {
  const h = o.h || 110; const col = o.col || B.inkT;
  if (o.photo) cover(o.photo, x, y, h, h, 0.55, 0.62); else if (o.box) { rect(x, y, h, h, '#ECE9E2'); }
  _txt(name, x + h + 28, y + h * 0.55, F.body(o.size || 40, 500), col, 'left', 'middle');
  _txt(price, x + w, y + h * 0.55, F.mono(o.size || 40, 700), col, 'right', 'middle');
}
