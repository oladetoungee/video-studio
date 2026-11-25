/* C · THE STATUS PAGE. Developers check a status page when something breaks; this film is the internet's status page
 * for October: every platform is a component with 31 daily uptime bars, the month turns red "one attack after the other",
 * and each story is an incident post (investigating, identified, action needed) with the real coverage attached.
 * Ground: page #F1F2F4, cards #FFFFFF with #D8DCE2 hairlines, ink #0E1116, muted #5B6470; uptime green #3FAE72 (data only);
 * ONE accent: incident red #E5383B. Dark code blocks #0E1116. Type: Public Sans 800/900 (headlines), 600 (rows),
 * Red Hat Mono 500/600 (labels, code, status words). */
'use strict';
const S_ = { page: '#F1F2F4', card: '#FFFFFF', line: '#D8DCE2', ink: '#0E1116', mid: '#5B6470', green: '#3FAE72', red: '#E5383B', grey: '#D5D9DF', code: '#0E1116', codeMid: '#8A93A0', pale: '#FBE3E3' };
G.page = { bg: S_.page, fg: S_.ink, mid: S_.mid, line: S_.line, acc: S_.red, card: S_.card, panel: S_.card, grid: S_.line, mode: 'light' };
G.dark = { bg: S_.ink, fg: '#F1F2F4', mid: S_.codeMid, line: '#262B33', acc: S_.red, card: '#171B21', panel: '#171B21', grid: '#1B2027', mode: 'dark' };
F.disp = (s) => `900 ${s}px "Public Sans"`;
F.body = (s, w = 700) => `${w} ${s}px "Public Sans"`;
F.mono = (s, w = 500) => `${w} ${s}px "Red Hat Mono"`;
LS.disp = -0.025; LS.body = -0.01; LS.mono = 0.03;
const card = (x, y, w, h, col = S_.card) => { fillRR(x, y, w, h, 14, col); strokeRR(x, y, w, h, 14, S_.line, 2); };
/** a status word with a small square marker (no pills) */
function statusWord(s, x, y, col, size = 32, align = 'left') {
  const w = tw(s.toUpperCase(), F.mono(size, 600), size * 0.03); const x0 = align === 'right' ? x - w - size * 0.8 : x;
  rect(x0, y - size * 0.62, size * 0.5, size * 0.5, col); _txt(s.toUpperCase(), x0 + size * 0.8, y, F.mono(size, 600), col, 'left', 'alphabetic', size * 0.03);
}
/** 31 uptime bars; red(d) -> time the day turns red (or null); today: days after it are grey */
function uptime(t, x, y, w, h, o) {
  const n = 31, step = w / n, bw = step * 0.72;
  for (let d = 1; d <= n; d++) { const p = ez(t, o.t0 + d * 0.015, 0.35); if (p <= 0) continue;
    const future = d > (o.today || 26); const rt = o.red && o.red[d]; const pr = rt != null ? ez(t, rt, 0.25) : 0;
    const bh = h * p; const bx = x + (d - 1) * step;
    fillRR(bx, y + h - bh, bw, bh, 4, future ? S_.grey : S_.green);
    if (pr > 0) { const rh = bh * pr; fillRR(bx, y + h - bh, bw, rh, 4, S_.red); }
  }
}
/** a browser-like coverage card header line ("Coverage") + a real clipping is drawn by clipCard */
