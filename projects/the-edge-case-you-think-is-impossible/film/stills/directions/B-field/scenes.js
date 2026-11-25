/* B · THE FIELD. One form, typed into at poster scale.
 * Every edge case in the video is something a real person types or clicks: the name O'Brien, the surname Null,
 * Adébáyọ̀, a date of 29 February, a double click on "Place order". So the film is ONE giant form field and ONE giant
 * button on a flat acid-lime ground, with no browser around them. The field is the stage; what goes into it changes.
 * Lime #D4F04A, ink #0C0C0C, white #FFFFFF. ONE accent: validation red #FF3B1F (errors, the character that breaks,
 * the extra orders). Type: Onest 800 (what is typed, headlines), Onest 500 (sentences), JetBrains Mono 500/800 (field
 * labels, code, counts). 6 px ink outlines, square corners. Caret is a still bar (never blinking). */
'use strict';
const B = { lime: '#D4F04A', ink: '#0C0C0C', white: '#FFFFFF', red: '#FF3B1F', mid: '#4D5A1A', pale: '#E9F7A6' };
G.lime = { bg: B.lime, fg: B.ink, mid: B.mid, line: 'rgba(12,12,12,0.18)', acc: B.red, card: B.white, panel: B.pale, grid: 'rgba(12,12,12,0.1)', mode: 'light' };
G.lime2 = { ...G.lime };
F.disp = (s) => `800 ${s}px Onest`;
F.body = (s, w = 500) => `${w === 800 ? 800 : 500} ${s}px Onest`;
F.mono = (s, w = 500) => `${w >= 700 ? 800 : 500} ${s}px "JetBrains Mono"`;
LS.disp = -0.035; LS.mono = 0.04;

/** a form field at poster scale. o: label, value, typeAt (start), cps, err (time the error shows), errText, caret, focus */
function field(t, x, y, w, h, o) {
  const errP = o.errAt == null ? 0 : ez(t, o.errAt, 0.3); const col = errP > 0.5 ? B.red : B.ink;
  const ls = V(30, 30);
  txt(o.label.toUpperCase(), x, y - ls * 0.7, F.mono(ls, 800), col, 'left', 'alphabetic', ls * 0.08, 'label ' + o.label);
  rect(x, y, w, h, B.white); strokeR(x, y, w, h, col, errP > 0.5 ? 8 : 6);
  const fs = o.size || h * 0.52; const font = F.disp(fs);
  const v = o.value || ''; const n = o.typeAt == null ? v.length : Math.round(v.length * clamp((t - o.typeAt) / Math.max(0.15, v.length / (o.cps || 14))));
  const shown = [...v].slice(0, n).join(''); const tx = x + fs * 0.4, ty = y + h / 2 + fs * 0.36;
  if (o.draw) o.draw(tx, ty, fs, shown); else txt(shown, tx, ty, font, B.ink, 'left', 'alphabetic', fs * LS.disp, 'value ' + o.label);
  if (o.caret !== false && (o.typeAt == null || t >= o.typeAt - 0.4)) rect(tx + tw(shown, font, fs * LS.disp) + fs * 0.08, y + h * 0.2, Math.max(5, fs * 0.06), h * 0.6, B.ink);
  if (errP > 0) withA(errP, () => { const es = V(36, 36); circle(x + es * 0.5, y + h + es * 1.1, es * 0.5, B.red); _txt('!', x + es * 0.5, y + h + es * 1.1 + es * 0.33, F.mono(es * 0.8, 800), B.white, 'center');
    txt(o.errText, x + es * 1.4, y + h + es * 1.42, F.body(es, 800), B.red, 'left', 'alphabetic', 0, 'error ' + o.label); });
}
/** the button: ink block, white label; press = 0..1 (squash) */
function button(x, y, w, h, label, press = 0, o = {}) {
  const k = 1 - 0.06 * press; withT(x + w / 2, y + h / 2, k, 0, () => { rect(-w / 2, -h / 2, w, h, B.ink); txt(label, 0, h * 0.17, F.disp(h * 0.42), B.white, 'center', 'alphabetic', 0, 'button ' + label);
    if (o.load > 0) rect(-w / 2, h / 2 - 12, w * clamp(o.load), 12, B.lime); });
}
/** press amount at time t for a list of press times (a 0.16 s squash each) */
const pressAt = (t, ts) => ts.reduce((m, a) => Math.max(m, t >= a && t < a + 0.16 ? 1 - (t - a) / 0.16 : 0), 0);
/** a code panel: ink block, mono lines (array of [text, col] segments per line) */
function codePanel(x, y, w, lines, size, o = {}) {
  const lh = size * 1.5, h = lines.length * lh + size * 1.6; rect(x, y, w, h, B.ink);
  lines.forEach((segs, i) => { let xx = x + size * 1.1; const yy = y + size * 1.6 + i * lh; segs.forEach(([s, c, box]) => { const f = F.mono(size, 500); const sw = tw(s, f);
    if (box) rect(xx - 4, yy - size * 0.9, sw + 8, size * 1.2, box); _txt(s, xx, yy, f, c || B.white, 'left'); xx += sw; }); });
  return h;
}
function count(n) { /* no corner counter (her no-HUD rule) */ }

function buildFilm() {
  /* ---- real users double-click (46.1-54.6): the motion test ---- */
  addScene(46.0, 'lime', 'click', (t) => {
    rect(0, 0, W, H, B.lime);
    const presses = [48.72, 51.06, 52.26, 52.5, 52.74, 52.98, 53.22, 53.46];
    const fx = V(110, 80), fw = V(820, W - 160);
    withA(ez(t, 46.9, 0.3), () => field(t, fx, V(300, 420), fw, V(140, 150), { label: 'Name', value: 'Ada Obi', typeAt: 47.55, cps: 12 }));
    const by = V(560, 680); withA(ez(t, 47.0, 0.3), () => button(fx, by, fw, V(150, 160), 'Place order', pressAt(t, presses), { load: t > 49.8 && t < 51.0 ? ez(t, 49.8, 1.1, 'inOutQuart') : 0 }));
    withA(ez(t, 49.8, 0.3) * (1 - ez(t, 51.0, 0.2)), () => txt('wait…', fx, by + V(250, 260), F.body(V(64, 64), 800), B.ink, 'left'));
    // the orders table: one row per press
    const tx = V(1060, 80), ty = V(250, 1000), tw0 = V(750, W - 160), rh = V(78, 76);
    withA(ez(t, 47.1, 0.3), () => { txt('ORDERS', tx, ty, F.mono(V(30, 30), 800), B.ink, 'left', 'alphabetic', 2); hline(tx, ty + 22, tw0, 1, B.ink, 4); });
    presses.forEach((a, k) => { const p = ez(t, a + 0.04, 0.3); if (p <= 0) return; const ry = ty + 40 + k * rh;
      withA(p, () => { const dup = k > 0; rect(tx, ry + 8 * (1 - p), tw0, rh - 10, dup ? B.white : B.pale);
        _txt(`#${1041 + k}`, tx + 22, ry + rh * 0.62, F.mono(V(32, 30), 800), dup ? B.red : B.ink, 'left');
        _txt('Ada Obi', tx + V(200, 190), ry + rh * 0.62, F.body(V(34, 32), 500), B.ink, 'left');
        _txt('€39.00', tx + tw0 - 22, ry + rh * 0.62, F.mono(V(32, 30), 500), B.ink, 'right'); }); });
    KT(t, { lines: ['one customer, *eight* orders'], x: V(fx, CX), y: V(1000, 1780), size: V(64, 60), font: 'disp', upper: false, align: V('left', 'center'), col: B.ink, acc: B.red, times: [53.6, 53.7, 53.8, 53.9], blur: 6 });
    // "Real users open different tabs": the same form again, in a second tab, slid over the first
    const tb = ez(t, 55.1, 0.55, 'inOutQuart'); if (tb > 0) withT(0, 0, 1, 0, () => { const ox = V(110, 80), oy = V(330, 460); ctx.save(); ctx.translate((1 - tb) * W, 0); rect(0, 0, W, H, B.lime); rect(0, 0, 8, H, B.ink);
      rect(ox, V(150, 260), 300, 76, B.ink); _txt('Tab 2', ox + 24, V(202, 312), F.mono(V(38, 38), 800), B.white, 'left'); txt('the same customer, the same form, again', ox, V(940, 1300), F.body(V(48, 48), 800), B.ink, 'left'); ctx.translate(ox - 40, oy);
      field(t, 40, V(120, 120), fw, V(140, 150), { label: 'Name', value: 'Ada Obi', caret: false }); button(40, V(360, 370), fw, V(150, 160), 'Place order', 0); ctx.restore(); });
    count(1);
  }, { id: 'click' });
  cue('type', 47.55, -10); cue('click', 48.72, -2); cue('load', 49.8, -12);
  [51.06, 52.26, 52.5, 52.74, 52.98, 53.22, 53.46].forEach((a, k) => cue(k % 2 ? 'click2' : 'click', a, -3)); cue('buzz', 53.6, -8); cue('pop', 55.1, -6);

  /* ---- O'Brien (205.1-218) ---- */
  addScene(205.1, 'lime2', 'obrien', (t) => {
    rect(0, 0, W, H, B.lime);
    field(t, V(110, 80), V(250, 380), V(900, W - 160), V(150, 150), { label: 'Surname', value: 'O’Brien', typeAt: 205.7, cps: 10, caret: false,
      draw: (x, y, fs, s) => { const f = F.disp(fs); _txt(s, x, y, f, B.ink, 'left', 'alphabetic', fs * LS.disp); if (s.length > 1 && t > 207.6) { const w0 = tw('O', f, fs * LS.disp); withA(ez(t, 207.6, 0.3), () => rect(x + w0 - 4, y - fs * 0.86, tw('’', f) + 8, fs * 1.0, 'rgba(255,59,31,0.28)')); } } });
    const sz = V(40, 34); const brk = ez(t, 214.3, 0.25);
    withA(ez(t, 211.6, 0.35), () => codePanel(V(110, 80), V(560, 760), V(1380, W - 160), [
      [['SELECT * FROM users', B.white]],
      [['WHERE surname = ', B.white], ["'O", B.white], ["'", brk > 0.5 ? B.white : B.white, brk > 0.5 ? B.red : null], ["Brien'", brk > 0.5 ? '#8A8A8A' : B.white]],
    ], sz));
    withA(ez(t, 216.6, 0.3), () => txt('ERROR: the query breaks', V(110, 80), V(880, 1090), F.mono(V(40, 36), 800), B.red, 'left', 'alphabetic', 1));
    withA(ez(t, 207.6, 0.4), () => txtW('The apostrophe is the same character that starts a piece of text in SQL.', V(1100, 80), V(300, 1250), F.body(V(40, 42), 500), B.ink, V(700, W - 160), V(52, 56)));
    count(3);
  }, { id: 'obrien' });
  cue('type', 205.7, -10); cue('marker', 207.6, -8); cue('key', 211.6, -10); cue('err', 214.3, -6); cue('buzz', 216.6, -8);

  /* ---- Jennifer Null (232.7-245) ---- */
  addScene(232.6, 'lime', 'null', (t) => {
    rect(0, 0, W, H, B.lime);
    withA(ez(t, 232.7, 0.4), () => KT(t, { lines: ['Book a flight'], x: V(110, 80), y: V(190, 300), size: V(84, 88), font: 'disp', upper: false, col: B.ink, times: [233.0, 233.5, 233.62], blur: 6 }));
    const fw = V(820, W - 160);
    field(t, V(110, 80), V(330, 470), fw, V(130, 140), { label: 'First name', value: 'Jennifer', typeAt: 233.0, cps: 14, caret: false });
    field(t, V(110, 80), V(580, 740), fw, V(130, 140), { label: 'Surname', value: 'Null', typeAt: 234.0, cps: 10, errAt: 237.2, errText: 'Surname is required.' });
    withA(ez(t, 242.0, 0.3), () => txt('sees “Null”, treats it as empty', V(110, 80), V(920, 1110), F.mono(V(32, 32), 800), B.ink, 'left', 'alphabetic', 1));
    const cw = V(780, W - 160); clipCard(t, 'bbc-jn', V(1030, 80), V(330, 1250), cw, { at: 235.5, hlAt: [235.6, 237.4], hl: '#FFB3A6', pad: 18, credit: B.ink, creditSize: V(26, 28), creditFont: (s) => F.mono(s, 500) });
    count(4);
  }, { id: 'null' });
  cue('type', 233.0, -10); cue('key', 234.0, -8); cue('pop', 235.5, -8); cue('buzz', 237.2, -4); cue('marker', 237.4, -10);

  /* ---- Adébáyọ̀ (388.5-400) ---- */
  addScene(388.5, 'lime2', 'unicode', (t) => {
    rect(0, 0, W, H, B.lime);
    field(t, V(110, 80), V(300, 420), V(1000, W - 160), V(170, 170), { label: 'First name', value: 'Adébáyọ', typeAt: 389.6, cps: 10, caret: false,
      draw: (x, y, fs, s) => { const f = F.disp(fs); _txt(s, x, y, f, B.ink, 'left', 'alphabetic', fs * LS.disp); if (s.length === 7) { const w0 = tw('Adébáy', f, fs * LS.disp), wo = tw('ọ', f); withT(x + w0 + wo * 0.5, y - fs * 0.6, 1, 0, () => { ctx.fillStyle = B.ink; ctx.beginPath(); ctx.moveTo(-fs * 0.1, -fs * 0.16); ctx.lineTo(-fs * 0.01, -fs * 0.18); ctx.lineTo(fs * 0.09, 0); ctx.lineTo(fs * 0.03, 0); ctx.closePath(); ctx.fill(); }); } } });  // ọ̀: the grave drawn by hand (Onest has no combining marks)
    const y = V(720, 900);
    withA(ez(t, 392.0, 0.35), () => { _txt('7', V(1180, 80), V(400, 900), F.disp(V(200, 200)), B.ink, 'left'); txt('letters you see', V(1180, 80), V(460, 960), F.mono(V(32, 30), 800), B.ink, 'left', 'alphabetic', 1); });
    withA(ez(t, 399.1, 0.35), () => { _txt('13', V(1570, 560), V(400, 900), F.disp(V(200, 200)), B.red, 'left'); txt('bytes', V(1570, 560), V(460, 960), F.mono(V(32, 30), 800), B.red, 'left', 'alphabetic', 1); });
    withA(ez(t, 395.1, 0.3), () => txt('strlen("Adébáyọ̀")  // 13', V(110, 80), V(700, 1500), F.mono(V(56, 44), 800), B.ink, 'left'));
    // the bytes, one box each: 13 boxes under 7 letters (é á ọ̀ take 2-4 bytes each)
    // the bytes: one row of 13 boxes, white = 1 byte, red = the extra bytes of a marked letter; the letter under its group
    const bs = V(64, 60), gp = V(8, 6), bx = V(110, 80), by0 = V(830, 1180); const groups = [['A', 1], ['d', 1], ['é', 2], ['b', 1], ['á', 2], ['y', 1], ['ọ̀', 5]];
    let k = 0; groups.forEach(([ch, nb], gi) => { const g0 = bx + k * (bs + gp); for (let j = 0; j < nb; j++) { const p = ez(t, 396.0 + k * 0.08, 0.25); const xx = bx + k * (bs + gp);
      if (p > 0) withA(p, () => { rect(xx, by0, bs, bs, nb > 1 ? B.red : B.white); strokeR(xx, by0, bs, bs, B.ink, 3); }); k++; }
      const gw = nb * bs + (nb - 1) * gp; withA(ez(t, 396.0 + (k - 1) * 0.08, 0.25), () => { hline(g0, by0 + bs + 14, gw, 1, B.ink, 3); _txt(ch, g0 + gw / 2, by0 + bs + 62, F.mono(V(40, 40), 800), B.ink, 'center'); }); });
    withA(ez(t, 396.0, 0.3), () => txt('1 BOX = 1 BYTE', bx + 13 * (bs + gp) + 30, by0 + bs * 0.66, F.mono(V(32, 30), 800), B.ink, 'left', 'alphabetic', 1));
    count(7);
  }, { id: 'unicode' });
  cue('type', 389.6, -10); cue('hit', 392.0, -8); cue('buzz', 399.1, -6);
  /* ---- 29 February (325.3-336): a date field ---- */
  addScene(325.3, 'lime', 'leap', (t) => {
    rect(0, 0, W, H, B.lime);
    const fw = V(820, W - 160);
    field(t, V(110, 80), V(250, 380), fw, V(140, 150), { label: 'Certificate valid from', value: '29 / 02 / 2012', typeAt: 326.0, cps: 16, caret: false });
    withA(ez(t, 327.6, 0.3), () => txt('+ 1 to the year', V(110, 80), V(510, 650), F.mono(V(48, 46), 800), B.ink, 'left', 'alphabetic', 1));
    field(t, V(110, 80), V(620, 780), fw, V(140, 150), { label: 'Valid until', value: '29 / 02 / 2013', typeAt: 330.0, cps: 16, errAt: 331.6, errText: 'That date doesn’t exist.' });
    clipCard(t, 'azure', V(1030, 80), V(250, 1250), V(780, W - 160), { at: 326.8, hlAt: [329.0, 330.4], only: [0, 1], crop: [176, 352], hl: '#FFB3A6', pad: 16, credit: B.ink, creditSize: V(26, 28), creditFont: (s) => F.mono(s, 500) });
  }, { id: 'leap' });
  cue('type', 326.0, -10); cue('key', 327.6, -8); cue('type', 330.0, -10); cue('buzz', 331.6, -4); cue('pop', 326.8, -8);

  /* ---- the correction (her rule): she says "2019" at raw 4:58; the edit pauses on her and cuts here ---- */
  addScene(301.0, 'lime2', 'fix', (t) => {
    rect(0, 0, W, H, B.lime);
    txt('CORRECTION', V(160, 80), V(300, 520), F.mono(V(36, 36), 800), B.ink, 'left', 'alphabetic', 3);
    const fs = V(130, 92); const f = F.disp(fs);
    KT(t, { lines: ['Microsoft’s leap-day outage', 'was on 29 February'], x: V(160, 80), y: V(450, 680), size: fs, font: 'disp', upper: false, col: B.ink, t0: 301.1, stagger: 0.07, blur: 6, fitW: V(1600, 920) });
    const y = V(450 + fs * 2 * 0.92 + 20, 680 + fs * 2 * 0.92 + 30); const x = V(160, 80);
    withA(ez(t, 301.8, 0.3), () => { _txt('2019', x, y, f, B.red, 'left'); const w = tw('2019', f); rect(x - 8, y - fs * 0.36, (w + 16) * ez(t, 302.1, 0.3, 'outExpo'), Math.max(8, fs * 0.09), B.red); });
    withA(ez(t, 302.5, 0.3), () => _txt('2012', x + tw('2019', f) + fs * 0.5, y, f, B.ink, 'left'));
    withA(ez(t, 302.9, 0.3), () => txt('Source: Microsoft Azure blog, “Summary of Windows Azure Service Disruption on Feb 29th, 2012”', V(160, 80), V(y + 120, y + 120), F.mono(V(30, 28), 500), B.ink, 'left'));
  }, { id: 'fix' });
  cue('type', 301.1, -10); cue('marker', 302.1, -6); cue('key', 302.5, -6);
}
