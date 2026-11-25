/* Ghana / Marrify film kit: the visual system for this film and its recurring objects.
 * Loaded before scenes1-3.js. Uses the studio runtime (core.js, house.js); nothing here changes the shared engine.
 *
 * Visual system (locked for the whole film)
 *   grounds   paper #EDE9E2 · ink #111114 · card #FFFDF6 (house)  +  three full-bleed punchline grounds:
 *             blue #1B3FD8 (the system / data), green #22E08A (the "yes": it works, the minimal answer),
 *             orange #FF4713 (the human cost: privacy, stigma). Ink text on green and orange.
 *   accent    one per scene. Blue = the system and its data. Green = what works (Estonia, finally, the minimal yes).
 *             Orange = the human cost (sensitive data, consent, stigma). Set per scene with addS(..., { acc }).
 *   type      Bricolage Grotesque 800 (display, uppercase) · Archivo 700 (her sentences) · DM Mono (labels) ·
 *             Instrument Serif italic (one accent word per frame, hand underline)
 *   objects   the record card (one record), a generic search box (always labelled ILLUSTRATION), flat flags
 *             (Ghana, Estonia, Nigeria), source boxes + connectors, paper sheets, a folder, a phone, a yes/no answer,
 *             a person glyph, an eye.
 * Flat only: no gradients, glows, shadows, particles. Never Marrify's real interface or logo. */
'use strict';

/* ---------- palette additions (film-local) ---------- */
C.green = '#22E08A'; C.greenInk = '#0B7A47';   // greenInk: green readable as text on paper / card
C.ghRed = '#CE1126'; C.ghGold = '#FCD116'; C.ghGreen = '#006B3F'; C.eeBlue = '#0072CE'; C.ngGreen = '#008751';
G.green = { bg: C.green, fg: C.ink, mid: 'rgba(17,17,20,0.66)', line: 'rgba(17,17,20,0.26)', acc: C.ink, card: C.card, panel: C.panel, grid: 'rgba(17,17,20,0.14)' };
G.orange = { bg: C.orange, fg: C.ink, mid: 'rgba(17,17,20,0.7)', line: 'rgba(17,17,20,0.28)', acc: C.ink, card: C.card, panel: C.panel, grid: 'rgba(17,17,20,0.14)' };
const ACC = { blue: () => (g === G.ink ? C.blueT : C.blue), green: () => (g === G.ink ? C.green : C.greenInk), orange: () => C.orange };

/* ---------- scene wrapper: slow push + the scene's accent ---------- */
let NO_PUSH = false;
/** addS(start, ground, label, draw, o): addScene + a slow log-space push. o.push, o.anchor() -> [x, y], o.acc 'blue'|'green'|'orange' */
function addS(start, ground, label, draw, o = {}) {
  let me = null;
  const wrapped = (t, lt) => {
    const old = g.acc; if (o.acc && g !== G.blue && g !== G.green && g !== G.orange) g.acc = ACC[o.acc]();
    try {
      if (!NO_PUSH && o.push !== 0) {
        if (!me) me = SCENES.find(s => s.draw === wrapped);
        const dur = Math.max(0.5, sceneEnd(me.n - 1) - me.start);
        const amt = o.push != null ? o.push : clamp(0.004 * dur, 0.012, 0.03);
        const an = o.anchor ? o.anchor() : [L, V(H * 0.5, 900)];   // anchored on the left margin: headlines keep their x
        pushCam(lt, dur, amt, an[0], an[1]);
      }
      return draw(t, lt);
    } finally { g.acc = old; }
  };
  addScene(start, ground, label, wrapped, o);
}

/* ---------- sound vocabulary (roles in film.json audio.sfx.roles) ---------- */
const sType = (t, chars, cps = 22, db = 0) => sfxType(t, chars, cps, db);
const sPen = (t, db = 0) => sfx('pen', t, db);
const sPage = (t, db = 0) => sfx('page', t, db);
const sPop = (t, db = 0) => sfx('pop', t, db);
const sClick = (t, db = 0) => sfx('click', t, db);
const sWh = (t, db = 0) => sfx('whoosh', t, db);
const sImp = (t, db = 0) => sfx('impact', t, db);
const sRise = (t, db = 0) => sfx('riser', t - 0.02, db);
const sTick = (t, db = 0) => sfx('tick', t, db);
const sCard = (t, db = 0) => sfx('card', t, db);
const sStamp = (t, db = 0) => sfx('book', t, db);
Object.assign(SFX_PRI, { impact: 7, riser: 6, cut: 5, whoosh: 5, book: 5, type: 4, click: 4, page: 4, pen: 3, pop: 3, card: 2, tick: 1 });
Object.assign(SFX_GAP, { impact: 3.0, riser: 0, cut: 0.4, whoosh: 1.6, book: 0.35, type: 0.4, click: 0.5, page: 0.6, pen: 1.5, pop: 0.9, card: 1.2, tick: 0.3 });

/* ---------- small helpers ---------- */
const ease = (t, t0, d = 0.5, f = E.outExpo) => f(prog(t, t0, d));
/** arrive fast, land soft, from an offset; returns {x, y, r, a, p, e} */
function landAt(t, t0, x, y, o = {}) {
  const d = o.d || 0.55; const p = prog(t, t0, d); const e = E.outQuint(p);
  return { x: x + (o.dx || 0) * (1 - e), y: y + (o.dy == null ? 120 : o.dy) * (1 - e), r: (o.r || 0) * (1 - e), a: clamp(p * 3), p, e };
}
/** moving draw with motion blur while it moves */
function mb(t, t0, d, draw, n = 6) { const moving = t > t0 && t < t0 + d * 0.85; return smear(t, draw, { on: moving, n, shutter: 0.6 / FPS }); }
/** a thing that lands (blurred while it moves): draw(x, y, r, a) */
function landing(t, t0, x, y, o, draw) {
  const st = landAt(t, t0, x, y, o); if (st.p <= 0) return false;
  mb(t, t0, o.d || 0.55, (tt) => { const s = landAt(tt, t0, x, y, o); withA(s.a, () => draw(s.x, s.y, s.r, s)); });
  return true;
}
function wipe(t, tCut, col, d = 0.5) {
  const p = prog(t, tCut - d, d); if (p <= 0) return; const e = E.inOutCubic(p); const x = W * (1 - e);
  rect(x, 0, W - x + 2, H, col); if (p < 1) withA(0.35, () => rect(x - 40 * Math.sin(Math.PI * p), 0, 40 * Math.sin(Math.PI * p), H, col));
}
function fitTxt(s, x, y, font, col, maxW, align = 'left') {
  let str = s; if (tw(str, font) > maxW) { while (str.length > 3 && tw(str + '…', font) > maxW) str = str.slice(0, -1); str = str.trimEnd() + '…'; }
  _txt(str, x, y, font, col, align); return str;
}
function checkboxT(x, y, s, on, col, tick) {
  if (on <= 0) return; rect(x, y, s, s, col); ctx.save(); ctx.strokeStyle = tick; ctx.lineWidth = s * 0.14; ctx.lineCap = 'square'; ctx.beginPath();
  const p = clamp(on); ctx.moveTo(x + s * 0.24, y + s * 0.52); const mx = x + s * 0.43, my = y + s * 0.7; if (p < 0.5) ctx.lineTo(lerp(x + s * 0.24, mx, p * 2), lerp(y + s * 0.52, my, p * 2)); else { ctx.lineTo(mx, my); ctx.lineTo(lerp(mx, x + s * 0.78, (p - 0.5) * 2), lerp(my, y + s * 0.3, (p - 0.5) * 2)); } ctx.stroke(); ctx.restore();
}
/** a cross (x mark) drawn in two strokes */
function crossMark(cx, cy, s, p, col, lw = 6) {
  if (p <= 0) return; const a = clamp(p * 2), b = clamp(p * 2 - 1);
  pline(cx - s, cy - s, cx + s, cy + s, a, col, lw); if (b > 0) pline(cx + s, cy - s, cx - s, cy + s, b, col, lw);
}
/** ILLUSTRATION tag (small DM Mono), required on every mockup */
function illus(x, y, align = 'left', col) { mono('Illustration', x, y, 20, col || g.mid, align, { ls: 0.22, key: 'illustration-tag' }); }
/** a straight arrow in any direction, drawn on with p */
function arrow(x1, y1, x2, y2, p, col, lw = 4, head = 18) {
  if (p <= 0) return; const x = lerp(x1, x2, p), y = lerp(y1, y2, p); const a = Math.atan2(y2 - y1, x2 - x1);
  pline(x1, y1, x - Math.cos(a) * head * 0.6, y - Math.sin(a) * head * 0.6, 1, col, lw);
  ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(x - Math.cos(a - 0.45) * head, y - Math.sin(a - 0.45) * head); ctx.lineTo(x - Math.cos(a + 0.45) * head, y - Math.sin(a + 0.45) * head); ctx.closePath(); ctx.fillStyle = col; ctx.fill();
}
/** an orthogonal connector (right, then vertical, then right), drawn on with p */
function connector(x1, y1, x2, y2, p, col, lw = 3, mx) {
  if (p <= 0) return; const m = mx == null ? (x1 + x2) / 2 : mx;
  const segs = [[x1, y1, m, y1], [m, y1, m, y2], [m, y2, x2, y2]]; const lens = segs.map(s => Math.hypot(s[2] - s[0], s[3] - s[1])); const tot = lens.reduce((a, b) => a + b, 0) || 1;
  let left = tot * clamp(p); ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'square'; ctx.beginPath(); ctx.moveTo(x1, y1);
  for (let i = 0; i < 3; i++) { const f = lens[i] ? clamp(left / lens[i]) : 1; const s = segs[i]; ctx.lineTo(lerp(s[0], s[2], f), lerp(s[1], s[3], f)); left -= lens[i]; if (left <= 0) break; }
  ctx.stroke(); ctx.restore();
}
/** vertical connector (down, across, down) */
function connectorV(x1, y1, x2, y2, p, col, lw = 3, my) {
  if (p <= 0) return; const m = my == null ? (y1 + y2) / 2 : my;
  const segs = [[x1, y1, x1, m], [x1, m, x2, m], [x2, m, x2, y2]]; const lens = segs.map(s => Math.hypot(s[2] - s[0], s[3] - s[1])); const tot = lens.reduce((a, b) => a + b, 0) || 1;
  let left = tot * clamp(p); ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'square'; ctx.beginPath(); ctx.moveTo(x1, y1);
  for (let i = 0; i < 3; i++) { const f = lens[i] ? clamp(left / lens[i]) : 1; const s = segs[i]; ctx.lineTo(lerp(s[0], s[2], f), lerp(s[1], s[3], f)); left -= lens[i]; if (left <= 0) break; }
  ctx.stroke(); ctx.restore();
}

/* ---------- flags (flat, official colours, hairline edge) ---------- */
function star5(cx, cy, r, col) { ctx.beginPath(); for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5; const q = i % 2 ? r * 0.382 : r; ctx.lineTo(cx + Math.cos(a) * q, cy + Math.sin(a) * q); } ctx.closePath(); ctx.fillStyle = col; ctx.fill(); }
const FLAG_R = { ghana: 2 / 3, estonia: 7 / 11, nigeria: 1 / 2 };
/** flag(name, x, y, w, o) -> height. o.key: movable; o.label: mono caption below */
function flag(name, x, y, w, o = {}) {
  const h = w * FLAG_R[name];
  const draw = () => {
    if (name === 'ghana') { rect(x, y, w, h / 3 + 0.5, C.ghRed); rect(x, y + h / 3, w, h / 3 + 0.5, C.ghGold); rect(x, y + 2 * h / 3, w, h / 3, C.ghGreen); star5(x + w / 2, y + h / 2, h / 6 * 0.98, '#000000'); }
    else if (name === 'estonia') { rect(x, y, w, h / 3 + 0.5, C.eeBlue); rect(x, y + h / 3, w, h / 3 + 0.5, '#000000'); rect(x, y + 2 * h / 3, w, h / 3, '#FFFFFF'); }
    else if (name === 'nigeria') { rect(x, y, w / 3 + 0.5, h, C.ngGreen); rect(x + w / 3, y, w / 3 + 0.5, h, '#FFFFFF'); rect(x + 2 * w / 3, y, w / 3, h, C.ngGreen); }
    if (o.border !== false) strokeR(x, y, w, h, g === G.ink ? 'rgba(237,233,226,0.45)' : 'rgba(17,17,20,0.3)', 2);
    if (o.label) mono(o.label, x, y + h + (o.labDy || 44), o.labSize || 24, o.labCol || g.mid, 'left', { ls: 0.2 });
  };
  if (o.key) grp(o.key, x, y, w, h, draw); else draw();
  return h;
}
/** a flag that drops in on t0 (a little swing, motion blur) */
function flagIn(t, t0, name, x, y, w, o = {}) {
  return landing(t, t0, x, y, { dy: o.dy == null ? -140 : o.dy, dx: o.dx || 0, r: o.r == null ? -0.08 : o.r, d: 0.6 }, (X, Y, R) => withT(X + w / 2, Y + w * FLAG_R[name] / 2, 1, R, () => flag(name, -w / 2, -w * FLAG_R[name] / 2, w, { ...o, key: o.key || ('flag ' + name) })));
}

/* ---------- the record card: "one reliable record" (fields are placeholder bars, never invented data) ---------- */
/** recordCard(t, x, y, w, o) -> height.
 *  o.title (mono header), o.rows [{k, bw, tin, strike, hide, mark, val}], o.rowH, o.tag (mono top-right, e.g. ILLUSTRATION),
 *  o.bg, o.border, o.key, o.foot {s, col, tin}. A row's value is a grey bar (bw = fraction) unless val is given. */
function recordCard(t, x, y, w, o = {}) {
  const rows = o.rows || []; const rh = o.rowH || 64; const head = o.head || 92; const h = head + rows.length * rh + (o.foot ? 90 : 26);
  grp(o.key || ('record ' + (o.title || '')), x, y, w, h, () => {
    rect(x, y, w, h, o.bg || C.card); strokeR(x, y, w, h, o.border || C.ink, 4);
    mono(o.title || 'Record', x + 32, y + 56, o.titleSize || 24, C.ink, 'left', { ls: 0.2, fixed: true, key: (o.key || 'record') + ' title' });
    if (o.tag) mono(o.tag, x + w - 32, y + 56, 20, C.mid, 'right', { ls: 0.2, fixed: true, key: (o.key || 'record') + ' tag' });
    rect(x + 32, y + head - 12, w - 64, 3, C.ink);
    rows.forEach((r, i) => {
      const ry = y + head + i * rh; const p = r.tin == null ? 1 : ease(t, r.tin, 0.4); if (p <= 0) return;
      const hide = r.hide != null ? ease(t, r.hide, 0.45) : 0;
      withA(p * (1 - 0.82 * hide), () => {
        mono(r.k, x + 32, ry + rh * 0.6, o.keySize || 22, C.mid, 'left', { ls: 0.16, fixed: true, raw: true });
        const vx = x + (o.valX || w * 0.42), vw = (w - (o.valX || w * 0.42) - 32);
        if (r.val) _txt(r.val, vx, ry + rh * 0.62, F.body(o.valSize || 30, 700), r.valCol || C.ink, 'left');
        else rect(vx, ry + rh * 0.38, vw * (r.bw || 0.7) * E.outExpo(p), rh * 0.24, r.mark ? r.mark : '#D3CCBF');
        if (i < rows.length - 1) rect(x + 32, ry + rh, w - 64, 1.5, C.line);
      });
      if (r.strike != null) { const sp = prog(t, r.strike, 0.35); if (sp > 0) strikeBar(x + 30, ry + rh * 0.5, w - 60, sp, o.strikeCol || C.orange, 8); }
    });
    if (o.foot) { const fp = o.foot.tin == null ? 1 : ease(t, o.foot.tin, 0.4); if (fp > 0) withA(fp, () => { rect(x, y + h - 74, w, 74, o.foot.bg || C.ink); mono(o.foot.s, x + 32, y + h - 28, 22, o.foot.col || C.card, 'left', { ls: 0.2, fixed: true, key: (o.key || 'record') + ' foot' }); }); }
  });
  return h;
}

/* ---------- a generic search box (labelled ILLUSTRATION wherever it appears) ---------- */
/** searchBox(t, x, y, w, o): o.h, o.q (query), o.typeT0, o.cps, o.press (button press time), o.btn label, o.ph placeholder */
function searchBox(t, x, y, w, o = {}) {
  const h = o.h || 96; const bw = o.btnW || V(210, 190);
  grp(o.key || 'search box', x, y, w, h, () => {
    rect(x, y, w, h, C.card); strokeR(x, y, w, h, C.ink, 4);
    // magnifier
    const mx = x + 44, my = y + h / 2 - 4; ctx.save(); ctx.strokeStyle = C.ink; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(mx, my, 13, 0, Math.PI * 2); ctx.stroke(); ctx.beginPath(); ctx.moveTo(mx + 9, my + 9); ctx.lineTo(mx + 20, my + 20); ctx.stroke(); ctx.restore();
    const fs = o.fs || V(36, 32); const tx = x + 84;
    const typed = o.q && o.typeT0 != null && t >= o.typeT0;
    if (typed) typeText(t, o.typeT0, o.q, tx, y + h / 2 + fs * 0.35, F.body(fs, 600), C.ink, { cps: o.cps || 24, key: (o.key || 'search box') + ' query', caretTo: o.caretTo });
    else if (o.ph) _txt(o.ph, tx, y + h / 2 + fs * 0.35, F.body(fs, 500), '#9A958C', 'left');
    const pr = o.press != null ? t - o.press : -1; const down = pr >= 0 && pr < 0.18;
    const after = pr >= 0;
    rect(x + w - bw - 10, y + 10 + (down ? 3 : 0), bw, h - 20, o.btnCol || C.ink);
    _txt((o.btn || 'Search').toUpperCase(), x + w - bw / 2 - 10, y + h / 2 + 9 + (down ? 3 : 0), F.mono(V(24, 22), 500), C.card, 'center', 'alphabetic', 3);
  });
}

/* ---------- source box (one government source feeding the record) ---------- */
function sourceBox(t, x, y, w, h, n, label, tCard, tOn, o = {}) {
  // the card (solid, numbered) lands at tCard; the source's name arrives when she says it (tOn)
  const cp = ease(t, tCard, 0.45); if (cp <= 0) return; const on = tOn == null ? 0 : ease(t, tOn, 0.35);
  grp(o.key || ('source ' + label), x, y, w, h, () => withA(clamp(cp * 2.5), () => withT(x, y + 36 * (1 - E.outExpo(cp)), 1, 0, () => {
    rect(0, 0, w, h, o.fill || C.card); strokeR(0, 0, w, h, C.ink, 4);
    mono(n, 24, 40, 24, o.numCol || g.acc, 'left', { ls: 0.08, raw: true, fixed: true });
    if (on > 0) withA(on, () => txtW(label, 24, (o.ly || 92) + 12 * (1 - E.outExpo(on)), F.body(o.size || 40, 700), C.ink, w - 48, (o.size || 40) * 1.12, 0, o.key ? o.key + ' label' : undefined));
  })));
}

/* ---------- paper sheet, folder, phone, person, eye, yes/no ---------- */
function sheet(x, y, w, h, rot, o = {}) {
  withT(x + w / 2, y + h / 2, 1, rot, () => {
    rect(-w / 2, -h / 2, w, h, o.bg || C.card); strokeR(-w / 2, -h / 2, w, h, o.edge || 'rgba(17,17,20,0.35)', 2);
    const n = o.lines || 5; for (let i = 0; i < n; i++) rect(-w / 2 + w * 0.12, -h / 2 + h * 0.18 + i * h * 0.13, w * (i === 0 ? 0.5 : 0.76 - 0.1 * (i % 2)), Math.max(3, h * 0.035), o.lineCol || '#D3CCBF');
    if (o.stamp) { withT(w * 0.12, h * 0.26, 1, -0.2, () => strokeR(-w * 0.2, -h * 0.07, w * 0.4, h * 0.14, o.stampCol || C.orange, 3)); }
  });
}
/** a manila folder with a tab and a mono label */
function folder(x, y, w, h, label, o = {}) {
  const tabW = w * 0.36, tabH = h * 0.12;
  rect(x, y, tabW, tabH + 4, o.tab || '#C9B98F'); rect(x, y + tabH, w, h - tabH, o.body || '#DCCDA4');
  strokeR(x, y + tabH, w, h - tabH, 'rgba(17,17,20,0.35)', 2);
  if (label) mono(label, x + 26, y + tabH + 58, o.labSize || 24, C.ink, 'left', { ls: 0.18, fixed: true });
  for (let i = 0; i < 3; i++) rect(x + 26, y + tabH + 96 + i * 30, w * (0.6 - 0.12 * i), 8, 'rgba(17,17,20,0.22)');
}
/** person glyph (head + shoulders) */
function person(x, y, s, col) { circle(x, y - s * 0.62, s * 0.26, col); ctx.beginPath(); ctx.moveTo(x - s * 0.42, y + s * 0.42); ctx.quadraticCurveTo(x - s * 0.42, y - s * 0.22, x, y - s * 0.24); ctx.quadraticCurveTo(x + s * 0.42, y - s * 0.22, x + s * 0.42, y + s * 0.42); ctx.closePath(); ctx.fillStyle = col; ctx.fill(); }
/** an eye: almond outline + iris; open 0..1 */
function eye(x, y, s, col, open = 1, bg) {
  const o = clamp(open); if (o <= 0) { pline(x - s, y, x + s, y, 1, col, Math.max(3, s * 0.08)); return; }
  ctx.save(); ctx.beginPath(); ctx.moveTo(x - s, y); ctx.quadraticCurveTo(x, y - s * 0.95 * o, x + s, y); ctx.quadraticCurveTo(x, y + s * 0.95 * o, x - s, y); ctx.closePath();
  if (bg) { ctx.fillStyle = bg; ctx.fill(); } ctx.strokeStyle = col; ctx.lineWidth = Math.max(3, s * 0.08); ctx.stroke(); ctx.clip(); circle(x, y, s * 0.36, col); ctx.restore();
}
/** yes / no answer: two square cells, `pick` 'yes'|'no' fills at t1 */
function yesNo(t, x, y, cw, ch, t0, t1, pick = 'yes', o = {}) {
  const p0 = ease(t, t0, 0.4); if (p0 <= 0) return; const p1 = t1 == null ? 0 : ease(t, t1, 0.3);
  grp(o.key || 'yes no', x, y, cw * 2 + 24, ch, () => withA(p0, () => {
    [['Yes', 0], ['No', 1]].forEach(([s, i]) => {
      const cx = x + i * (cw + 24); const sel = (pick === 'yes') === (i === 0) && p1 > 0;
      const fillCol = o.col || g.acc;
      if (sel) { rect(cx, y + ch * (1 - E.outExpo(p1)), cw, ch * E.outExpo(p1), fillCol); }
      strokeR(cx, y, cw, ch, sel ? fillCol : g.fg, 4);
      _txt(s.toUpperCase(), cx + cw / 2, y + ch / 2 + ch * 0.17, F.disp(ch * 0.46), sel && p1 > 0.5 ? (o.selFg || C.ink) : g.fg, 'center', 'alphabetic', -2);
    });
  }));
}
/** a mono stamp (outlined box, rotated) that slams in at t0 */
function stamp(t, t0, cx, cy, s, col, o = {}) {
  const p = prog(t, t0, 0.28); if (p <= 0) return; const k = 1 + 1.3 * (1 - E.outCubic(p));
  const fs = o.size || 30; const w = monoW(s, fs, { fixed: true }) + fs * 1.6, h = fs * 2.1;
  withA(clamp(p * 3), () => withT(cx, cy, k, o.rot == null ? -0.12 : o.rot, () => { strokeR(-w / 2, -h / 2, w, h, col, Math.max(4, fs * 0.16)); mono(s, 0, fs * 0.36, fs, col, 'center', { ls: 0.18, fixed: true, key: o.key }); }));
}
/** a small calendar tile: month label, big day, foot */
function calTile(x, y, w, month, day, foot, o = {}) {
  const h = w * 1.05; grp(o.key || 'calendar', x, y, w, h, () => {
    rect(x, y, w, h, C.card); strokeR(x, y, w, h, C.ink, 4); rect(x, y, w, h * 0.22, o.band || C.ink);
    mono(month, x + w / 2, y + h * 0.145, w * 0.08, C.card, 'center', { ls: 0.2, fixed: true });
    txt(day, x + w / 2, y + h * 0.72, F.disp(w * 0.5), C.ink, 'center', 'alphabetic', -w * 0.015);
    if (foot) mono(foot, x + w / 2, y + h * 0.9, w * 0.065, C.mid, 'center', { ls: 0.2, fixed: true });
  });
  return h;
}
/** a generic article card in a browser (placeholder lines; o.hi: [[lineIndex, t]] orange marker) */
function articleCard(t, x, y, w, h, o = {}) {
  browser(x, y, w, h, { t, url: o.url, typeT0: o.typeT0, cps: 28, key: o.key || 'article', body: (bx, by, bw, bh) => {
    const sc = o.scroll || 0; by -= sc;
    rect(bx + 40, by + 44, bw * 0.3, 14, C.ink);
    for (let i = 0; i < 2; i++) rect(bx + 40, by + 90 + i * 52, bw * (i ? 0.55 : 0.82), 30, C.ink);
    const n = (o.lines || 7) + (sc ? 4 : 0); for (let i = 0; i < n; i++) {
      const ly = by + 230 + i * 42; const lw = (bw - 80) * (0.95 - 0.12 * ((i * 7) % 3) / 2);
      const hi = (o.hi || []).find(q => q[0] === i); const hp = hi ? clamp((t - hi[1]) / 0.45) : 0;
      if (hp > 0) rect(bx + 34, ly - 6, (lw + 12) * E.outCubic(hp), 26, o.hiCol || C.orange);
      rect(bx + 40, ly, lw, 13, hp > 0.6 ? 'rgba(17,17,20,0.75)' : '#D3CCBF');
    }
  } });
}

/* ---------- phase 2 objects ---------- */
/** a small chip (square card) with a mono label; o.col border colour, o.tick (0..1) a green tick, o.fill */
function chip(x, y, w, h, label, o = {}) {
  rect(x, y, w, h, o.fill || C.card); strokeR(x, y, w, h, o.col || C.ink, o.lw || 3);
  if (label) mono(label, x + (o.padX || 22), y + h / 2 + (o.size || 22) * 0.36, o.size || 22, o.fg || C.ink, 'left', { ls: 0.16, fixed: true, key: o.key });
  if (o.tick > 0) checkboxT(x + w - h + 10, y + 10, h - 20, o.tick, o.tickCol || C.greenInk, C.card);
}
/** an ID-style card (placeholder face block + bars), label in mono */
function idCard(x, y, w, label, rot = 0) {
  const h = w * 0.62; withT(x + w / 2, y + h / 2, 1, rot, () => {
    rect(-w / 2, -h / 2, w, h, C.card); strokeR(-w / 2, -h / 2, w, h, C.ink, 3);
    rect(-w / 2 + w * 0.07, -h / 2 + h * 0.28, w * 0.26, h * 0.56, '#D3CCBF');
    if (label) _txt(label.toUpperCase(), -w / 2 + w * 0.07, -h / 2 + h * 0.2, F.mono(Math.round(w * 0.075), 500), C.ink, 'left', 'alphabetic', 2);
    for (let i = 0; i < 3; i++) rect(-w / 2 + w * 0.4, -h / 2 + h * (0.36 + i * 0.17), w * (0.48 - 0.1 * (i % 2)), Math.max(4, h * 0.06), '#D3CCBF');
  });
}
/** a magnifying glass (outline ring + handle) at (x, y), radius r */
function magnifier(x, y, r, col, lw = 8) {
  ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(x + r * 0.72, y + r * 0.72); ctx.lineTo(x + r * 1.45, y + r * 1.45); ctx.lineWidth = lw * 1.6; ctx.stroke(); ctx.restore();
}
/** a crowd of small person glyphs (n), appearing from t0 with a fast stagger */
function crowd(t, t0, x, y, cols, rows, gap, s, col) {
  for (let i = 0; i < cols * rows; i++) {
    const order = (i * 7) % (cols * rows); const p = ease(t, t0 + order * 0.03, 0.35); if (p <= 0) continue;
    const cx = x + (i % cols) * gap, cy = y + Math.floor(i / cols) * gap * 1.15;
    withA(clamp(p * 2), () => person(cx, cy + 14 * (1 - E.outBack(p, 1.8)), s, col));
  }
}
/** a balance scale: post, beam rotated by ang (radians, + = right side down), pans hung from both ends.
 *  drawL / drawR(x, y) draw what sits on each pan (y = pan top). Returns nothing. */
function balanceScale(cx, cy, beamW, ang, col, drawL, drawR, o = {}) {
  const postH = o.postH || 260, hang = o.hang || 120, panW = o.panW || 300;
  rect(cx - 5, cy, 10, postH, col); rect(cx - 90, cy + postH, 180, 10, col);
  const ex = Math.cos(ang) * beamW / 2, ey = Math.sin(ang) * beamW / 2;
  pline(cx - ex, cy - ey, cx + ex, cy + ey, 1, col, 8); circle(cx, cy, 13, col);
  [[cx - ex, cy - ey, drawL], [cx + ex, cy + ey, drawR]].forEach(([px, py, dr]) => {
    pline(px, py, px - panW * 0.42, py + hang, 1, col, 2); pline(px, py, px + panW * 0.42, py + hang, 1, col, 2);
    rect(px - panW / 2, py + hang, panW, 8, col);
    if (dr) dr(px, py + hang);
  });
}
/** network node card (mono label), for the data ecosystem */
function nodeCard(x, y, w, h, label, on, o = {}) {
  rect(x - w / 2, y - h / 2, w, h, o.fill || C.inkPanel); strokeR(x - w / 2, y - h / 2, w, h, on > 0.5 ? (o.onCol || C.green) : C.inkMid, 3);
  if (label) mono(label, x - w / 2 + 18, y + 8, o.size || 20, o.fg || C.paper, 'left', { ls: 0.14, fixed: true, key: o.key });
  else { rect(x - w / 2 + 18, y - 8, w * 0.5, 7, C.inkMid); rect(x - w / 2 + 18, y + 6, w * 0.35, 7, C.inkMid); }
  if (on > 0) checkboxT(x + w / 2 - h + 14, y - h / 2 + 14, h - 28, on, o.onCol || C.green, C.ink);
}
