/* B · THE FIRST DIGIT. "You can already tell a lot from the first digit", so the whole screen IS the class colour.
 * Status codes are giant black numbers that roll like an odometer from one code to the next (signature transition);
 * when the FIRST digit rolls, the new class colour floods the screen from the top in step with the roll.
 * Grounds (flat, full bleed, one per class): 1xx stone #D9D4C7, 2xx mint #8FE3B0, 3xx sky #8EC5FF, 4xx amber #FFA51F,
 * 5xx tomato #FF5A3C. Ink #121212 only; no other colour. Type: Funnel Display 800 (numbers, headlines), Funnel Sans
 * (her words), Fragment Mono (labels, credits). */
'use strict';
const BO = { ink: '#121212', g1: '#D9D4C7', g2: '#8FE3B0', g3: '#8EC5FF', g4: '#FFA51F', g5: '#FF5A3C', paper: '#FFFFFF' };
for (const k of ['b1', 'b2', 'b3', 'b4', 'b5']) G[k] = { bg: BO.g1, fg: BO.ink, mid: 'rgba(18,18,18,0.55)', line: 'rgba(18,18,18,0.2)', acc: BO.ink, card: '#FFFFFF', panel: '#FFFFFF', grid: 'rgba(18,18,18,0.12)', mode: 'light' };
const NUM = (s, w = 800) => `${w} ${s}px "Funnel Display"`;
const SANS = (s, w = 500) => `${w} ${s}px "Funnel Sans"`;
const MONO = (s) => `400 ${s}px "Fragment Mono"`;
const bClass = (d) => BO['g' + d] || BO.g1;
const ROLL = 0.5;   // seconds per roll
/** continuous odometer value of one digit cell: seq = [[t, digit], ...]; rolls upward (9 -> 0 wraps) over ROLL s */
function digitVal(seq, t) {
  let v = seq[0][1]; for (let i = 1; i < seq.length; i++) { const [ti, d] = seq[i]; if (t < ti) break; const steps = (d - (v % 10) + 10) % 10; v = (v % 10) + steps * io(t, ti, ROLL + 0.03 * steps); if (t >= ti + ROLL + 0.03 * steps) v = d; }
  return v;
}
/** speed (digits per second) for motion blur */
const digitSpeed = (seq, t) => Math.abs(digitVal(seq, t + 1 / 60) - digitVal(seq, t - 1 / 60)) * 30;
/** one odometer cell: left x, baseline y, font size s; dim 0..1 fades the digit to 'x' feel (alpha) */
function cell(seq, t, x, y, s, o = {}) {
  const f = NUM(s); const adv = tw('0', f); const v = digitVal(seq, t); const d0 = Math.floor(v) % 10, fr = v - Math.floor(v);
  const top = y - s * 0.76, h = s * 1.0; const sp = digitSpeed(seq, t);
  clipRect(x - 4, top, adv + 8, s * 0.80, () => withA(o.alpha == null ? 1 : o.alpha, () => {
    const draw = () => { _txt(String(d0), x, y - fr * h * 1.0, f, o.col || BO.ink); _txt(String((d0 + 1) % 10), x, y + h * (1 - fr), f, o.col || BO.ink); };
    if (sp > 2) { ctx.save(); ctx.filter = `blur(${Math.min(14, sp * 0.9).toFixed(1)}px)`; draw(); ctx.restore(); } else draw();
  }));
  return adv;
}
/** a ground that floods from the top whenever the class changes: seq = [[t, colour], ...] */
function flood(seqG, t) {
  let prev = seqG[0][1]; rect(0, 0, W, H, prev);
  for (let i = 1; i < seqG.length; i++) { const [ti, c] = seqG[i]; if (t < ti) break; const e = io(t, ti, ROLL); rect(0, 0, W, H * e, c); prev = c; }
  return prev;
}
/** corner mark (her decks use these sparingly): mono, top-left */
function bMark(s, o = {}) { txt(s, V(110, 80), V(120, 150), MONO(V(34, 36)), 'rgba(18,18,18,0.7)', 'left', 'alphabetic', 2, 'mark ' + s); }
/** plain line of her words, types on per word with times */
function bWords(t, words, x, y, size, o = {}) {
  return KT(t, { lines: words.lines, times: words.times, x, y, size, font: 'body', weight: o.weight || 800, upper: false, align: o.align || 'left', col: BO.ink, blur: 6, lh: 1.02, id: o.id });
}
