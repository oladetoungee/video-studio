/* C · THE PLATE PRESS. Every edge case gets stamped into a plate.
 * The most famous story in the video is a licence plate that said NULL. So the film borrows the plate itself as its
 * typography: every edge case is pressed, letter by letter, into a generic embossed plate (no real state design):
 * NULL, O'BRIEN, 29 FEB 2013, 03:30. What goes wrong arrives as yellow parking-ticket slips stuck on the plate.
 * Steel ground #B7C5CE, plate #F6F4EE, plate ink #1B2747, ONE accent: ticket yellow #FFD21F (tickets, the broken
 * character). Type: Barlow Condensed 800 (plate letters, headlines), Barlow 500 (sentences), Overpass Mono 600 (labels,
 * ticket print). Signature move: the stamp (letter lands 1.25x -> 1x in 0.12 s, the plate kicks 6 px, a punch sound). */
'use strict';
const Pl = { steel: '#B7C5CE', plate: '#F6F4EE', ink: '#1B2747', yel: '#FFD21F', mid: '#4E5D69', dark: '#26323D' };
G.steel = { bg: Pl.steel, fg: Pl.ink, mid: Pl.mid, line: 'rgba(27,39,71,0.2)', acc: Pl.yel, card: Pl.plate, panel: '#C9D4DB', grid: 'rgba(27,39,71,0.1)', mode: 'light' };
G.steel2 = { ...G.steel };
F.disp = (s) => `800 ${s}px "Barlow Condensed"`;
F.body = (s, w = 500) => `${w >= 700 ? 800 : 500} ${s}px ${w >= 700 ? '"Barlow Condensed"' : 'Barlow'}`;
F.mono = (s) => `600 ${s}px "Overpass Mono"`;
LS.disp = 0.01; LS.mono = 0.08;

/** the kick a plate gets from each stamp */
const kick = (t, times) => times.reduce((m, a) => m + (t >= a ? Math.exp(-(t - a) * 22) * Math.sin((t - a) * 60) * 6 : 0), 0);
/** a generic embossed plate. chars: [{c, at}] stamped in; top: small mono line; w: width (h = w / 2) */
function plate(t, cx, cy, w, chars, o = {}) {
  const h = w * 0.5; const x = cx - w / 2, y = cy - h / 2 + kick(t, chars.map(c => c.at).filter(a => a != null));
  grp(o.key || 'plate', x, y, w, h, () => {
    fillRR(x + w * 0.012, y + w * 0.016, w, h, w * 0.045, 'rgba(27,39,71,0.18)');
    fillRR(x, y, w, h, w * 0.045, Pl.plate); strokeRR(x + w * 0.025, y + w * 0.025, w * 0.95, h - w * 0.05, w * 0.03, Pl.ink, Math.max(3, w * 0.006));
    [[0.12, 0.13], [0.88, 0.13], [0.12, 0.87], [0.88, 0.87]].forEach(([u, v]) => { circle(x + w * u, y + h * v, w * 0.014, '#C9CED3'); circle(x + w * u, y + h * v, w * 0.007, '#8D97A0'); });
    if (o.top) _txt(o.top, cx, y + h * 0.2, F.mono(w * 0.035), Pl.mid, 'center', 'alphabetic', w * 0.004);
    /* letters stay 10 % inside the border */ let fs = o.fs || h * 0.62; let font = F.disp(fs); let gap = fs * 0.06;
    let ws = chars.map(c => tw(c.c, font)); let total = ws.reduce((a, b) => a + b, 0) + gap * (chars.length - 1);
    if (total > w * 0.8) { fs = fs * w * 0.8 / total; font = F.disp(fs); gap = fs * 0.06; ws = chars.map(c => tw(c.c, font)); total = ws.reduce((a, b) => a + b, 0) + gap * (chars.length - 1); } let xx = cx - total / 2; const by = y + h * 0.5 + fs * 0.36 + h * (o.dy || 0);
    chars.forEach((c, k) => { const p = c.at == null ? 1 : prog(t, c.at, 0.12); if (p > 0) {
      const s = 1 + 0.25 * (1 - E.outCubic(p)); const mx = xx + ws[k] / 2;
      withT(mx, by, s, 0, () => { withA(clamp(p * 3), () => {
        if (c.box && (c.boxAt == null || t >= c.boxAt)) rect(-ws[k] / 2 - fs * 0.05, -fs * 0.8, ws[k] + fs * 0.1, fs * 0.86, Pl.yel);
        _txt(c.c, 2.5, 3, font, 'rgba(27,39,71,0.28)', 'center'); _txt(c.c, -1.5, -1.5, font, '#FFFFFF', 'center'); _txt(c.c, 0, 0, font, c.col || Pl.ink, 'center'); }); }); }
      xx += ws[k] + gap; });
  });
}
/** split text into stamped chars at t0 + k * step (spaces skipped) */
const stamp = (s, t0, step = 0.11) => { let k = 0; return [...s].map((c) => ({ c, at: c === ' ' ? null : t0 + (k++) * step })); };
/** a yellow parking-ticket slip, stuck on at `at` (drops in with a small overshoot) */
function ticket(t, at, x, y, w, rot, lines, o = {}) {
  const p = ez(t, at, 0.32, 'outBack'); if (p <= 0) return; const h = o.h || w * 0.62;
  withT(x, y - 40 * (1 - p), 0.9 + 0.1 * p, rot, () => { withA(clamp(p * 2), () => {
    rect(-w / 2 + 5, -h / 2 + 7, w, h, 'rgba(27,39,71,0.18)'); rect(-w / 2, -h / 2, w, h, Pl.yel);
    if (!o.plain) { rect(-w / 2 + w * 0.06, -h / 2 + h * 0.5, w * 0.88, h * 0.4, '#FFFDF2'); for (let k = 0; k < 14; k++) circle(-w / 2 + (k + 0.5) * w / 14, -h / 2 + 7, 3, 'rgba(27,39,71,0.35)'); }
    const fs = o.fs || w * 0.075; lines.forEach((ln, i) => _txt(ln, -w / 2 + fs * 0.9, -h / 2 + fs * 1.8 + i * fs * 1.5, i === 0 && !o.plain ? F.mono(fs * 0.8) : (o.big && i === lines.length - 1 ? F.disp(fs * 2.1) : F.mono(fs)), Pl.ink, 'left', 'alphabetic', 1));
  }); });
}
function credit(s, x, y, align = 'left') { txt(s.toUpperCase(), x, y, F.mono(V(24, 26)), Pl.mid, align, 'alphabetic', 1.5, 'credit'); }
function caseNo(n) { txt(`EDGE CASE ${String(n).padStart(2, '0')}`, V(110, 80), V(110, 130), F.mono(V(28, 30)), Pl.ink, 'left', 'alphabetic', 2, 'case'); }

function buildFilm() {
  /* ---- the NULL plate (255.2-270): the motion test ---- */
  addScene(255.1, 'steel', 'null', (t) => {
    rect(0, 0, W, H, Pl.steel);
    const push = 1 + 0.06 * io(t, 261.0, 1.4); const pcx = V(CX, CX), pcy = V(500, 760);
    const rise = ez(t, 257.0, 0.55);
    withT(pcx, pcy, push, 0, () => { ctx.translate(-pcx, -pcy);
      withA(clamp(rise * 2), () => { ctx.save(); ctx.translate(0, 120 * (1 - rise)); plate(t, pcx, pcy, V(1000, 920), stamp('NULL', 260.4, 0.13), { top: 'PERSONALISED PLATE' }); ctx.restore(); });
      const tk = [[263.8, -470, 210, -0.12], [264.05, 450, 250, 0.1], [264.3, -380, -230, 0.08], [264.55, 400, -220, -0.09], [264.8, -120, 300, 0.05], [265.05, 180, 300, -0.06], [265.3, -560, 20, 0.14], [265.55, 560, 30, -0.12]];
      tk.forEach(([a, dx, dy, r], k) => ticket(t, a, pcx + V(dx, dx * 0.66), pcy + V(dy, dy * 1.5), V(260, 230), r, ['PARKING CITATION', 'PLATE: NULL', 'FINE DUE'], { fs: V(24, 21) }));
    });
    withA(ez(t, 257.6, 0.4), () => KT(t, { lines: ['A licence plate that said NULL'], x: V(110, CX), y: V(1000, 260), size: V(64, 66), font: 'disp', upper: true, align: V('left', 'center'), col: Pl.ink, times: [257.58, 258.09, 258.84, 260.0, 260.26, 260.56], blur: 6, fitW: V(1100, 940) }));
    // the fines counter
    const sp = prog(t, 264.73, 0.12); const sk = 1 + 0.25 * (1 - E.outCubic(sp)); const ax = V(W - 410, CX), ay = V(940, 1560);
    if (sp > 0) withT(ax, ay, sk, 0, () => { ctx.translate(-ax, -ay); const s = '$12,000+'; const fs = V(150, 170);
      const x = V(W - 110, CX), y = V(1000, 1620); rect(V(x - tw('$12,000+', F.disp(fs)) - 30, CX - tw('$12,000+', F.disp(fs)) / 2 - 30), y - fs * 0.86, tw('$12,000+', F.disp(fs)) + 60, fs * 1.02, Pl.yel);
      _txt(s, V(x, CX), y, F.disp(fs), Pl.ink, V('right', 'center')); txt('IN FINES THAT WERE NOT HIS', V(x, CX), y + V(54, 70), F.mono(V(26, 30)), Pl.ink, V('right', 'center'), 'alphabetic', 2); });
    withA(ez(t, 256.0, 0.4), () => credit('Joseph Tartaro (droogie), DEF CON 27, 2019', V(110, 80), V(96, 96)));
  }, { id: 'null' });
  cue('slide', 257.0, -8); cue('punch', 260.4, -2); cue('punch2', 260.53, -4); cue('punch', 260.66, -4); cue('punch2', 260.79, -4);
  [263.8, 264.05, 264.3, 264.55, 264.8, 265.05].forEach((a, k) => cue(['card', 'card2', 'card3'][k % 3], a, -6)); cue('coins', 264.0, -10); cue('ding', 264.85, -10);

  /* ---- O'Brien (205.1-218) ---- */
  addScene(205.1, 'steel2', 'obrien', (t) => {
    rect(0, 0, W, H, Pl.steel); caseNo(3);
    const ch = stamp('O’BRIEN', 205.9, 0.09); ch[1].box = true; ch[1].boxAt = 207.6;
    plate(t, V(CX, CX), V(410, 640), V(1100, 940), ch, { top: 'SURNAME' });
    withA(ez(t, 211.6, 0.35), () => { const x = V(310, 80), y = V(760, 1120), w = V(1300, W - 160), fs = V(44, 34); rect(x, y, w, fs * 3.4, Pl.dark);
      const a = 'WHERE surname = \'O', b = '\'', c = 'Brien\''; const f = F.mono(fs); let xx = x + fs; const yy = y + fs * 2.05;
      _txt(a, xx, yy, f, Pl.plate); xx += tw(a, f); const br = ez(t, 214.3, 0.25); if (br > 0) rect(xx - 3, yy - fs * 0.9, tw(b, f) + 6, fs * 1.2, Pl.yel); _txt(b, xx, yy, f, br > 0 ? Pl.ink : Pl.plate); xx += tw(b, f); _txt(c, xx, yy, f, br > 0 ? '#7F8B95' : Pl.plate); });
    withA(ez(t, 216.6, 0.3), () => txt('…and the query breaks', V(310, 80), V(1000, 1360), F.disp(V(64, 64)), Pl.ink, 'left'));
  }, { id: 'obrien' });
  cue('punch', 205.9, -4); cue('punch2', 206.2, -6); cue('marker', 207.6, -8); cue('stamp', 214.3, -4);

  /* ---- 29 February (325.3-336) ---- */
  addScene(325.3, 'steel', 'leap', (t) => {
    rect(0, 0, W, H, Pl.steel); caseNo(5);
    const re = t >= 330.89; const ch = stamp(re ? '29 FEB 2013' : '29 FEB 2012', 326.0, 0.08);
    if (re) { ch.forEach(c => (c.at = null)); ch[10].at = 330.89; ch[10].box = true; }
    plate(t, V(CX, CX), V(420, 640), V(1180, 980), ch, { top: 'VALID UNTIL', fs: V(250, 200) });
    ticket(t, 328.9, V(CX + 420, CX + 260), V(170, 400), V(250, 230), 0.09, ['', '+ 1 YEAR'], { plain: true, big: true, fs: V(30, 28), h: V(120, 110) });
    withA(ez(t, 331.58, 0.3), () => { const fs = V(96, 104); const s = 'that date doesn’t exist'; const w = tw(s, F.disp(fs)); const x = V(620, CX), y = V(880, 1080);
      withT(x, y, 1, -0.02, () => { rect(-w / 2 - 30, -fs * 0.9, w + 60, fs * 1.1, Pl.yel); _txt(s, 0, 0, F.disp(fs), Pl.ink, 'center'); }); });
    clipCard(t, 'azure', V(1180, 80), V(770, 1300), V(640, W - 160), { at: 326.8, hlAt: [330.0, 330.6], only: [0, 1], crop: [176, 352], hl: Pl.yel, pad: 14, credit: Pl.mid, creditSize: V(26, 26), creditFont: (s) => F.mono(s) });
  }, { id: 'leap' });
  cue('punch', 326.0, -4); cue('punch2', 326.4, -6); cue('punch', 326.97, -4); cue('card', 328.9, -6); cue('punch', 330.89, -2); cue('hit', 331.6, -6);

  /* ---- 03:30 in Tallinn (357-368) ---- */
  addScene(356.9, 'steel2', 'dst', (t) => {
    rect(0, 0, W, H, Pl.steel); caseNo(6);
    const cx1 = V(530, CX), cx2 = V(1390, CX), cy1 = V(470, 560), cy2 = V(470, 1240), w = V(720, 760);
    plate(t, cx1, cy1, w, stamp('03:30', 357.1, 0.1), { top: 'TALLINN · 29 MAR 2026', key: 'plate 1' });
    ticket(t, 358.6, cx1 + w * 0.22, cy1 + w * 0.2, V(420, 400), -0.07, ['', 'never happened'], { plain: true, big: true, fs: V(26, 26), h: V(120, 120) });
    withA(ez(t, 360.3, 0.3), () => plate(t, cx2, cy2, w, stamp('03:30', 366.38, 0.1), { top: 'TALLINN · 25 OCT 2026', key: 'plate 2' }));
    ticket(t, 367.25, cx2 + w * 0.22, cy2 + w * 0.2, V(420, 400), 0.06, ['', 'happened twice'], { plain: true, big: true, fs: V(26, 26), h: V(120, 120) });
    withA(ez(t, 367.5, 0.4), () => { txt('DAILY SALES REPORT, SET FOR 03:30', CX, V(900, 1700), F.mono(V(34, 32)), Pl.ink, 'center', 'alphabetic', 2); txt('29 MARCH: never runs.   25 OCTOBER: runs twice.', CX, V(980, 1780), F.disp(V(64, 54)), Pl.ink, 'center'); });
    withA(ez(t, 355.2, 0.3), () => txt('3 A.M. → 4 A.M.', cx1, cy1 - w * 0.33, F.mono(V(30, 30)), Pl.ink, 'center', 'alphabetic', 2));
    withA(ez(t, 364.3, 0.3), () => txt('4 A.M. → 3 A.M.', cx2, cy2 - w * 0.33, F.mono(V(30, 30)), Pl.ink, 'center', 'alphabetic', 2));
  }, { id: 'dst' });
  cue('punch', 357.1, -4); cue('card', 358.6, -6); cue('punch', 366.38, -4); cue('card2', 367.25, -6);
}
