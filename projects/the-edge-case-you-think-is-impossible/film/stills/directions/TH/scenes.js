/* Talking-head + shorts style frames over her REAL footage (frames from kit/raw-video.mov, never flipped, no retouching).
 * Loaded after A-map, B-field and C-plate scenes (their helpers); this buildFilm() replaces theirs.
 * 16:9: one full-edit layout per look + one receipt layout + the in-edit correction. 9:16: short SH6 (the NULL plate) once
 * per look, in a 4:5 window of her (not zoomed in), no timers. */
'use strict';
const LOOK = {
  A: () => { F.disp = (s) => `800 ${s}px "Alegreya SC"`; F.body = (s, w = 500) => `${w >= 700 ? 800 : 500} ${s}px "Alegreya Sans"`; F.mono = (s) => `500 ${s}px "Alegreya SC"`; F.serif = (s) => `italic 400 ${s}px "IM Fell English"`; LS.mono = 0.14; },
  B: () => { F.disp = (s) => `800 ${s}px Onest`; F.body = (s, w = 500) => `${w >= 700 ? 800 : 500} ${s}px Onest`; F.mono = (s, w = 500) => `${w >= 700 ? 800 : 500} ${s}px "JetBrains Mono"`; LS.disp = -0.035; LS.mono = 0.04; },
  C: () => { F.disp = (s) => `800 ${s}px "Barlow Condensed"`; F.body = (s, w = 500) => `${w >= 700 ? 800 : 500} ${s}px ${w >= 700 ? '"Barlow Condensed"' : 'Barlow'}`; F.mono = (s) => `600 ${s}px "Overpass Mono"`; LS.mono = 0.08; },
};
/** her cut-out: footage with the Vision person matte as alpha (built once), drawn into a box (source crop sx, sy, sw, sh) */
const _cut = {};
function cutout(name, matte, dx, dy, dw, dh, sx = 0, sy = 0, sw = 1920, sh = 1080) {
  if (!_cut[name]) { const im = IMG[name], m = IMG[matte]; const c = document.createElement('canvas'); c.width = im.width; c.height = im.height; const x = c.getContext('2d');
    x.drawImage(m, 0, 0, c.width, c.height); const md = x.getImageData(0, 0, c.width, c.height); x.clearRect(0, 0, c.width, c.height); x.drawImage(im, 0, 0, c.width, c.height);
    const d = x.getImageData(0, 0, c.width, c.height); for (let i = 0; i < d.data.length; i += 4) { const m = md.data[i]; d.data[i + 3] = m < 150 ? 0 : Math.min(255, (m - 150) * 2.5); } /* hard edge: no ghost blobs or halo */ x.putImageData(d, 0, 0); _cut[name] = c; }
  const k = IMG[name].width / 1920; themeFixed(() => ctx.drawImage(_cut[name], sx * k, sy * k, sw * k, sh * k, dx, dy, dw, dh));
}
/** rounded window of her footage */
function window_(name, x, y, w, h, r, fx = 0.5, fy = 0.4, zoom = 1) { ctx.save(); rr(x, y, w, h, r); ctx.clip(); cover(name, x, y, w, h, fx, fy, zoom); ctx.restore(); }
/** short top-title T1: stacked black boxes, white sans */
function titleT1(lines, y, size = 46) { const f = `600 ${size}px "Helvetica Neue"`; lines.forEach((s, i) => { const w = tw(s, f); fillRR(CX - w / 2 - 22, y + i * size * 1.42 - size * 0.98, w + 44, size * 1.34, 10, '#0C0C0C'); _txt(s, CX, y + i * size * 1.42, f, '#FFFFFF', 'center'); }); }
/** T3 inverse box: white rounded box, black heavy sans */
function titleT3(lines, y, size = 58) { const f = `400 ${size}px Anton`; const w = Math.max(...lines.map(s => tw(s, f))) + 90; const h = lines.length * size * 1.18 + 50; fillRR(CX - w / 2, y, w, h, 26, '#FFFFFF'); lines.forEach((s, i) => _txt(s, CX, y + 34 + size * 0.95 + i * size * 1.18, f, '#0C0C0C', 'center')); }
/** stroked caption text */
function strokeTxt(s, x, y, font, fill, sw = 10, align = 'center') { setFont(font, 0); ctx.textAlign = align; ctx.lineJoin = 'round'; ctx.lineWidth = sw; ctx.strokeStyle = '#000'; ctx.strokeText(s, x, y); ctx.fillStyle = fill; ctx.fillText(s, x, y); ctx.textAlign = 'left'; }

function buildFilm() {
  addScene(0, 'chart', 'pre', (t) => rect(0, 0, W, H, '#111'), { id: 'pre' });

  /* th1 · A look: half and half. The chart on the left, her on the right (52.5: "Real users double-click") */
  addScene(50.3, 'chart', 'th-A-half', (t) => {
    LOOK.A(); rect(0, 0, W, H, A.paper);
    footage('f_raw_52_5', W * 0.48, 0, W * 0.52, H, 0.5, 0.5);
    ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W * 0.48, H); ctx.clip(); graticule();
    const y0 = 560, x0 = 170, x1 = 800; ctx.save(); ctx.strokeStyle = A.ink; ctx.lineWidth = 5; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y0); ctx.stroke(); ctx.restore();
    [['fill the form', 0.06], ['click', 0.5], ['wait', 0.94]].forEach(([s, f]) => { const x = lerp(x0, x1, f); circle(x, y0, 11, A.ink); lab(s, x, y0 + 54, 28, A.ink, 'center'); });
    KT(t, { lines: ['Real users ~double-click.~'], x: 90, y: 230, size: 78, font: 'body', weight: 800, upper: false, col: A.ink, times: [50.4, 50.7, 51.0], blur: 6 });
    route(t, [[lerp(x0, x1, 0.5), y0], [300, 860]], [51.0], { d: 0.45, lw: 6 }); xMark(t, 51.45, 300, 860, 30);
    withA(ez(t, 51.5, 0.3), () => lab('double-click', 300, 950, 32, A.red, 'center'));
    ctx.restore(); rect(W * 0.48 - 3, 0, 6, H, A.ink);
    herCaption('like ta-ta-ta-ta-ta', { x: W * 0.74, size: 54 });
  }, { id: 'th-A-half' });

  /* th2 · B look: receipt card + the form card over her full frame (237.0: "she has left the surname field blank") */
  addScene(235.3, 'lime', 'th-B-receipt', (t) => {
    LOOK.B(); footage('f_raw_237_0');
    clipCard(t, 'bbc-jn', 50, 56, 720, { at: 235.4, hlAt: [235.5, 236.4], hl: '#FFB3A6', pad: 14, credit: '#FFFFFF', creditSize: 22, creditFont: (s) => F.mono(s, 500) });
    const x = 1350, y = 340, w = 520, h = 330; rect(x, y, w, h, B.lime); strokeR(x, y, w, h, B.ink, 6);
    withT(0, 0, 1, 0, () => field(t, x + 40, y + 96, w - 80, 104, { label: 'Surname', value: 'Null', errAt: 236.2, errText: 'Surname is required.', size: 58 }));
    herCaption('most websites tell her that she has left the surname field blank', { size: 52 });
  }, { id: 'th-B-receipt' });

  /* th3 · C look: her cut-out in front of the plate, the room replaced by the steel ground (259.5: "...that said NULL") */
  addScene(258.0, 'steel', 'th-C-behind', (t) => {
    LOOK.C(); rect(0, 0, W, H, Pl.steel);
    plate(t, CX, 330, 1240, stamp('NULL', 257.0, 0.1), { top: 'PERSONALISED PLATE', key: 'plate behind' });
    [[-700, 120, -0.1], [690, 160, 0.09], [-620, 520, 0.07], [660, 560, -0.08]].forEach(([dx, y, r], k) => ticket(t, 257.5 + k * 0.1, CX + dx, y, 300, r, ['PARKING CITATION', 'PLATE: NULL', 'FINE DUE'], { fs: 22 }));
    cutout('f_raw_259_5', 'f_matte_259_5', 0, 0, W, H);
    herCaption('a personal license plate in California that said NULL', { size: 46, y: 1040 });
    credit('Joseph Tartaro (droogie)', 60, 760); credit('DEF CON 27, 2019', 60, 800);
  }, { id: 'th-C-behind' });

  /* th4 · A look: full-screen receipt, her in a rounded window (331.9: "and that date doesn't exist") */
  addScene(331.0, 'chart2', 'th-A-window', (t) => {
    LOOK.A(); rect(0, 0, W, H, A.paper); graticule(); neatline();
    placeName(t, 330.0, 'Leap Day Reef', 110, 200, 92, 'left');
    inset(t, 330.0, 'azure', 110, 300, 1060, { hlAt: [330.2, 330.6], only: [0, 1], crop: [176, 352] });
    const wx = 1260, wy = 300, ww = 560, wh = 640; window_('f_raw_331_9', wx, wy, ww, wh, 28, 0.5, 0.35, 1.0); strokeRR(wx, wy, ww, wh, 28, A.ink, 4);
    withA(1, () => txt('that date doesn’t exist', 110, 760, F.serif(84), A.red, 'left'));
    lab('microsoft’s own summary, 2012', 110, 860, 28, A.mid, 'left');
  }, { id: 'th-A-window' });

  /* the in-edit correction (her rule 2026-11-02): at raw 4:58 she says "2019"; the edit pauses on her and cuts to a plain
   * screen where the correction types on, then back to her (C look shown; same idea in A or B) */
  addScene(301.0, 'steel2', 'fix-correction', (t) => {
    LOOK.C(); rect(0, 0, W, H, Pl.steel);
    txt('CORRECTION', 160, 300, F.mono(34), Pl.ink, 'left', 'alphabetic', 4);
    const s1 = 'Microsoft’s leap-day outage was on'; const s2a = '29 February '; const s2b = '2012'; const s3 = 'not 2019, as I say here.';
    const fs = 120; const f = F.disp(fs); const n = Math.round(80 * clamp((t - 301.1) / 2.0)); let used = 0;
    const part = (s) => { const k = clamp(n - used, 0, s.length); used += s.length; return s.slice(0, k); };
    _txt(part(s1), 160, 460, f, Pl.ink, 'left'); const a = part(s2a); _txt(a, 160, 600, f, Pl.ink, 'left'); const b = part(s2b);
    if (b) { const x = 160 + tw(s2a, f); rect(x - 14, 600 - fs * 0.86, tw(s2b, f) + 28, fs * 1.0, Pl.yel); _txt(b, x, 600, f, Pl.ink, 'left'); }
    _txt(part(s3), 160, 740, F.disp(72), Pl.mid, 'left');
    credit('Source: Microsoft Azure blog, Summary of Windows Azure Service Disruption on Feb 29th, 2012', 160, 900);
  }, { id: 'fix-correction' });

  /* ---------- short SH6 "The NULL license plate that got $12,000 in fines", once per look (9:16) ---------- */
  // A: chart paper bands, T7 mixed-font stack title, C4 serif-on-black captions, her in a 4:5 window inside a neatline
  addScene(400.0, 'chart', 'sh6-A', (t) => {
    LOOK.A(); rect(0, 0, W, H, A.paper);
    _txt('The NULL licence plate', CX, 190, F.disp(84), A.ink, 'center'); _txt('that got $12,000 in fines', CX, 282, F.mono(64), A.red, 'center');
    const y = 340, h = 1420; footage('f_raw_264_5', 40, y, W - 80, h, 0.5, 0.45); strokeR(24, y - 16, W - 48, h + 32, A.ink, 3);
    const f = '400 54px Georgia'; ['Then he started getting', 'parking tickets'].forEach((s, i) => { const w = tw(s, f); rect(CX - w / 2 - 18, 1380 + i * 76 - 52, w + 36, 70, '#0C0C0C'); _txt(s, CX, 1380 + i * 76, f, '#FFFFFF', 'center'); });
    lab('a story told at def con, 2019', CX, 1862, 34, A.mid, 'center');
  }, { id: 'sh6-A' });
  // B: lime bands, T1 stacked black boxes, C2 caps with one word in a coloured box, a form card on her
  addScene(410.0, 'lime', 'sh6-B', (t) => {
    LOOK.B(); rect(0, 0, W, H, B.lime);
    titleT1(['The NULL licence plate', 'that got $12,000 in fines'], 150, 52);
    const y = 300, h = 1430; footage('f_raw_259_5', 0, y, W, h, 0.5, 0.45);
    const x = 60, fy = 1450, w = 470, hh = 250; rect(x, fy, w, hh, B.lime); strokeR(x, fy, w, hh, B.ink, 6); field(t, x + 34, fy + 80, w - 68, 100, { label: 'Plate number', value: 'NULL', size: 56, caret: false });
    const f = '400 96px Anton'; const a = 'THAT SAID ', b = 'NULL'; const wa = tw(a, f), wb = tw(b, f); const x0 = CX - (wa + wb + 30) / 2; const cy = 1860;
    _txt(a, x0, cy, f, B.ink, 'left'); rect(x0 + wa - 6, cy - 88, wb + 36, 104, B.red); _txt(b, x0 + wa + 12, cy, f, '#FFFFFF', 'left');
  }, { id: 'sh6-B' });
  // C: green-screen look: her cut-out over the plate and the tickets, T3 inverse box title, C12 pop-up keyword
  addScene(420.0, 'steel', 'sh6-C', (t) => {
    LOOK.C(); rect(0, 0, W, H, Pl.steel);
    titleT3(['the NULL licence plate', 'that got $12,000 in fines'], 90, 56);
    plate(t, CX, 560, 960, stamp('NULL', 410, 0.1), { top: 'PERSONALISED PLATE', key: 'plate sh' });
    [[-330, 870, -0.12], [330, 890, 0.1]].forEach(([dx, y, r]) => ticket(t, 410, CX + dx, y, 290, r, ['PARKING CITATION', 'PLATE: NULL', 'FINE DUE'], { fs: 22 }));
    cutout('f_raw_264_5', 'f_matte_264_5', 0, 840, 1080, 1080, 420, 0, 1080, 1080);
    const f = '800 150px "Barlow Condensed"'; strokeTxt('$12,000', CX, 1740, f, Pl.yel, 16); strokeTxt('in fines', CX, 1830, '600 64px "Barlow Condensed"', '#FFFFFF', 10);
  }, { id: 'sh6-C' });
}
