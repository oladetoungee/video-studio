/* Reading Stack film kit (v3 content pass): the scene wrapper (slow camera push), the sound vocabulary, and the film's
 * recurring objects (her real stack, the chapter map, the 1940 -> now timeline, shelves, small diagrams).
 * Loaded before scenes1-3.js. Uses the studio runtime (core.js, house.js). */
'use strict';

/* ---------- scene wrapper: every scene gets a slow push (log-space zoom), never counted as "the change" ---------- */
let NO_PUSH = false;   // the hold checker (tools/holds.mjs) turns the push off so only real changes count
/** addS(start, ground, label, draw, o): addScene + a slow push-in. o.push (amount, default by length), o.anchor [x, y] */
function addS(start, ground, label, draw, o = {}) {
  let me = null;
  const wrapped = (t, lt) => {
    if (NO_PUSH || o.push === 0) return draw(t, lt);
    if (!me) me = SCENES.find(s => s.draw === wrapped);
    const dur = Math.max(0.5, sceneEnd(me.n - 1) - me.start);
    const amt = o.push != null ? o.push : clamp(0.0035 * dur, 0.012, 0.03);
    const an = o.anchor ? o.anchor() : [CX, V(H * 0.5, 900)];
    pushCam(lt, dur, amt, an[0], an[1]);
    return draw(t, lt);
  };
  addScene(start, ground, label, wrapped, o);
}

/* ---------- sound vocabulary (roles in film.json audio.sfx.roles) ----------
 * type    keystrokes for type-on            pen     pencil / marker for strokes, underlines, strikes
 * page    page and paper for books           book    a book landing on the stack
 * pop     things landing (cards, rows, chips) click   cursor presses
 * whoosh  moves and cuts (peaks on the move)  impact  the core ideas
 * riser   a soft swell into a key statement (its peak lands on the hit)
 * tick    tiny list/count ticks               card    cards sliding in */
const sType = (t, chars, cps = 22, db = 0) => sfxType(t, chars, cps, db);
const sPen = (t, db = 0) => sfx('pen', t, db);
const sPage = (t, db = 0) => sfx('page', t, db);
const sBook = (t, db = 0) => sfx('book', t, db);
const sPop = (t, db = 0) => sfx('pop', t, db);
const sClick = (t, db = 0) => sfx('click', t, db);
const sWh = (t, db = 0) => sfx('whoosh', t, db);
const sImp = (t, db = 0) => sfx('impact', t, db);
const sRise = (t, db = 0) => sfx('riser', t - 0.02, db);
const sTick = (t, db = 0) => sfx('tick', t, db);
const sCard = (t, db = 0) => sfx('card', t, db);
// pruning: priorities + clear air per role (the core defaults were tuned for a sparse v2)
Object.assign(SFX_PRI, { impact: 7, riser: 6, cut: 5, whoosh: 5, book: 5, type: 4, click: 4, page: 4, pen: 3, pop: 3, card: 2, tick: 1 });
Object.assign(SFX_GAP, { impact: 4.0, riser: 0, cut: 0.4, whoosh: 2.6, book: 0.35, type: 0.4, click: 0.6, page: 0.6, pen: 2.2, pop: 2.6, card: 1.6, tick: 3.0 });

/* ---------- small helpers ---------- */
const ease = (t, t0, d = 0.5, f = E.outExpo) => f(prog(t, t0, d));
/** land: arrive fast, land soft, from an offset (dx, dy) with a little rotation; returns {x, y, r, a, p} */
function landAt(t, t0, x, y, o = {}) {
  const d = o.d || 0.55; const p = prog(t, t0, d); const e = E.outQuint(p);
  return { x: x + (o.dx || 0) * (1 - e), y: y + (o.dy == null ? 120 : o.dy) * (1 - e), r: (o.r || 0) * (1 - e), a: clamp(p * 3), p, e };
}
/** moving draw with motion blur while it moves (t0..t0+d), plain draw otherwise */
function mb(t, t0, d, draw, n = 6) { const moving = t > t0 && t < t0 + d * 0.85; return smear(t, draw, { on: moving, n, shutter: 0.6 / FPS }); }

/* ---------- her real stack (three spines cut from her footage, 0:15 of the raw file) ---------- */
// pixel sizes of the spine strips and their x offset in her hand (relative to the Convivial spine)
const SPINES = { convivial: { w: 1520, h: 186, dx: 0 }, baratta: { w: 1520, h: 79, dx: 6 }, marple: { w: 1260, h: 66, dx: 136 } };
const STACK_ORDER = ['convivial', 'baratta', 'marple'];   // bottom -> top
/** realStack(t, x, yBottom, w, o): the stack, bottom spine w px wide. o.drops {name: t} (each spine drops in from above),
 *  o.off(name) -> {dx, dy, r, a} extra placement, o.only [names]. Returns {top, h, rects:{name:[x,y,w,h]}} */
function realStack(t, x, yb, w, o = {}) {
  const s = w / 1520; let y = yb; const rects = {};
  for (const name of STACK_ORDER) {
    const S_ = SPINES[name]; const sw = S_.w * s, sh = S_.h * s; y -= sh; const sx = x + S_.dx * s; rects[name] = [sx, y, sw, sh];
    if (o.only && !o.only.includes(name)) continue;
    const td = o.drops ? o.drops[name] : null; const off = o.off ? o.off(name) || {} : {};
    const draw = (tt) => {
      let dy = 0, a = 1, r = 0;
      if (td != null) { const p = prog(tt, td, 0.42); if (p <= 0) return; const e = E.outQuint(p); dy = -(o.dropH || 260) * (1 - e); a = clamp(p * 4); r = (name === 'baratta' ? -0.05 : 0.04) * (1 - e); }
      withA(a * (off.a == null ? 1 : off.a), () => withT(sx + sw / 2 + (off.dx || 0), y + sh / 2 + dy + (off.dy || 0), off.s || 1, r + (off.r || 0), () => {
        ctx.drawImage(IMG['spine_' + name], -sw / 2, -sh / 2, sw, sh);
        if (o.outline) strokeR(-sw / 2, -sh / 2, sw, sh, o.outline, 2);
      }));
    };
    if (td != null && t > td && t < td + 0.36) mb(t, td, 0.42, draw); else draw(t);
  }
  return { top: y, h: yb - y, rects, s };
}

/* ---------- the 1940 -> now timeline (an old idea, then the newer versions) ---------- */
/** timeline(t, x, y, w, o): o.tin (draw-on time), o.at(t) -> marker position 0..1, o.marks [{u, s, sub, tin}] */
function timeline(t, x, y, w, o) {
  const p = ease(t, o.tin, 0.7); if (p <= 0) return;
  const col = o.col || g.fg;
  hline(x, y, w, p, col, 3);
  (o.marks || []).forEach((m) => {
    const mp = prog(t, m.tin == null ? o.tin + 0.2 : m.tin, 0.3); if (mp <= 0) return; const mx = x + w * m.u;
    withA(mp, () => { rect(mx - 2, y - 18 * E.outExpo(mp), 4, 36 * E.outExpo(mp), m.col || col); mono(m.s, mx, y + 58, o.size || 26, m.col || col, m.align || 'center', { ls: 0.14, raw: !!m.raw }); if (m.sub) mono(m.sub, mx, y + 58 + (o.size || 26) * 1.4, (o.size || 26) * 0.85, g.mid, m.align || 'center', { ls: 0.14 }); });
  });
  if (o.at) { const u = o.at(t); if (u != null) { const mx = x + w * u; ctx.beginPath(); ctx.moveTo(mx, y - 16); ctx.lineTo(mx - 16, y - 44); ctx.lineTo(mx + 16, y - 44); ctx.closePath(); ctx.fillStyle = o.markCol || g.acc; ctx.fill(); } }
}

/* ---------- the chapter map: a book's contents as blocks (Baratta: 10 chapters) ---------- */
/** chapterMap(t, x, y, cw, ch, o): blocks 01..10 in `cols` columns. o.tin[i] (block lands), o.focus(i) -> 0..1,
 *  o.merge {idx:[4,5,6], t, label} joins blocks into one, o.q (time: a "?" on every block), o.hi {i: t} accent fill */
function chapterMap(t, x, y, cw, ch, o) {
  const cols = o.cols || 2, gap = o.gap || 14, n = o.n || 10;
  const pos = (i) => [x + (i % cols) * (cw + gap), y + Math.floor(i / cols) * (ch + gap)];
  for (let i = 0; i < n; i++) {
    const ti = o.tin ? o.tin[i] : o.t0; const p = prog(t, ti, 0.4); if (p <= 0) continue;
    const [bx, by] = pos(i); const e = E.outBack(p, 1.6);
    const hiT = o.hi && o.hi[i] != null ? o.hi[i] : null; const hi = hiT != null ? prog(t, hiT, 0.25) : 0;
    const f = o.focus ? o.focus(i) : 1;
    withA(clamp(p * 3) * (0.25 + 0.75 * f), () => withT(bx + cw / 2, by + ch / 2, 0.6 + 0.4 * e, 0, () => {
      rect(-cw / 2, -ch / 2, cw, ch, hi > 0.5 ? (o.hiCol || g.acc) : (o.fill || (g === G.ink ? C.inkPanel : C.card)));
      strokeR(-cw / 2, -ch / 2, cw, ch, hi > 0.5 ? (o.hiCol || g.acc) : (g === G.ink ? C.inkMid : C.ink), 3);
      mono(String(i + 1).padStart(2, '0'), -cw / 2 + 18, ch * 0.16, Math.min(26, ch * 0.42), hi > 0.5 ? (g === G.ink ? C.ink : C.card) : g.acc, 'left', { ls: 0.06, raw: true });
      if (o.q != null) { const qp = prog(t, o.q + i * 0.05, 0.3); if (qp > 0) withA(qp, () => _txt('?', cw / 2 - 18, ch * 0.2, F.disp(ch * 0.62), g === G.ink ? C.blueT : C.blue, 'right')); }
    }));
  }
  return pos;
}

/* ---------- diagrams ---------- */
/** a shelf plank with a mono label (her hairline style, thicker) */
function shelfPlank(x, y, w, p, label, o = {}) {
  if (p <= 0) return; rect(x, y, w * E.outExpo(p), o.th || 10, o.col || g.fg);
  if (label) withA(clamp(p * 2), () => mono(label, x, y + (o.th || 10) + 34, o.size || 22, o.labCol || g.mid, 'left', { ls: 0.14, raw: !!o.raw }));
}
/** a flat book spine standing up (for shelves): w x h at (x, y top), colour, optional label rotated */
function standSpine(x, y, w, h, col, o = {}) {
  rect(x, y, w, h, col); if (o.stroke) strokeR(x, y, w, h, o.stroke, 2);
  if (o.band) rect(x, y + h * 0.12, w, h * 0.06, o.band);
  if (o.label) withT(x + w / 2, y + h / 2, 1, -Math.PI / 2, () => _txt(o.label.toUpperCase(), 0, w * 0.18, F.mono(Math.min(w * 0.42, 22), 500), o.fg || C.card, 'center', 'alphabetic', 2));
}
/** crosshair (pinpoint): ring + ticks; lock 0..1 draws it solid in the accent */
function crosshair(x, y, r, col, lock = 0) {
  ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = 4; ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.stroke();
  for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) { ctx.beginPath(); ctx.moveTo(x + dx * r * 0.55, y + dy * r * 0.55); ctx.lineTo(x + dx * r * 1.35, y + dy * r * 1.35); ctx.stroke(); }
  if (lock > 0) circle(x, y, r * 0.28 * E.outBack(clamp(lock), 2), col);
  ctx.restore();
}
/** simple person glyph (head + shoulders), flat */
function person(x, y, s, col) { circle(x, y - s * 0.62, s * 0.26, col); ctx.beginPath(); ctx.moveTo(x - s * 0.42, y + s * 0.42); ctx.quadraticCurveTo(x - s * 0.42, y - s * 0.22, x, y - s * 0.24); ctx.quadraticCurveTo(x + s * 0.42, y - s * 0.22, x + s * 0.42, y + s * 0.42); ctx.closePath(); ctx.fillStyle = col; ctx.fill(); }
/** an outlined card with placeholder text bars (illustration of a page / contents) */
function pageCard(x, y, w, h, o = {}) {
  rect(x, y, w, h, o.bg || C.card); if (o.border !== false) strokeR(x, y, w, h, o.borderCol || C.ink, o.bw || 4);
  if (o.label) { mono(o.label, x + w * 0.08, y + 64, o.labSize || 24, o.labCol || C.mid, 'left', { ls: 0.2, fixed: true }); hline(x + w * 0.08, y + 88, w * 0.84, 1, C.line, 2); }
}
/** a highlighter that follows her voice: a flat band grows behind text from t0 to t1 (stays after) */
function sweep(t, x, y, w, h, t0, t1, col = MC('rgba(27,63,216,0.26)')) { const p = clamp((t - t0) / Math.max(0.2, t1 - t0)); if (p <= 0) return; rect(x, y, w * E.outCubic(p), h, col); }
/** her marker, following her voice: a solid band grows behind a line of text from t0 to t1; the text inside it is
 *  redrawn in the card colour (drawText draws the same text again, in the given colour). */
function inkSweep(t, x, y, w, h, t0, t1, drawText, col = C.blue, fg = C.card) {
  const p = clamp((t - t0) / Math.max(0.2, t1 - t0)); if (p <= 0) return; const ww = w * E.outCubic(p);
  rect(x, y, ww, h, col); ctx.save(); ctx.beginPath(); ctx.rect(x, y, ww, h); ctx.clip(); drawText(fg); ctx.restore();
}
/** a flat colour wipe into the next (punchline) scene: a panel slides in from the right edge and covers the frame
 *  exactly at t0 + d (edge leads, slight motion blur on the edge). */
function wipe(t, tCut, col, d = 0.55) {
  const p = prog(t, tCut - d, d); if (p <= 0) return; const e = E.inOutCubic(p); const x = W * (1 - e);
  rect(x, 0, W - x + 2, H, col); if (p < 1) withA(0.35, () => rect(x - 40 * Math.sin(Math.PI * p), 0, 40 * Math.sin(Math.PI * p), H, col));
}
/** one line of text cut to a width with an ellipsis (computed, not editable) */
function fitTxt(s, x, y, font, col, maxW, align = 'left') {
  let str = s; if (tw(str, font) > maxW) { while (str.length > 3 && tw(str + '…', font) > maxW) str = str.slice(0, -1); str = str.trimEnd() + '…'; }
  _txt(str, x, y, font, col, align); return str;
}
// the real contents rows we know (Convivial Toolbox: her words, the chapter-one sub-headings she reads out, the parts)
const CONV_TOC = [['ch', 'Part 1 · Basics'], ['ch', 'Introduction'], ['s', 'Who is creative?'], ['s', 'Why are people expressing a need for creativity now?'], ['s', 'Business and design are changing'], ['ch', 'Part 2 · Cases from practice'], ['ch', 'Part 3 · Tools & techniques']];

// checkbox with a chosen tick colour (house checkbox() always ticks in card white, invisible on a white box)
function checkboxT(x, y, s, on, col, tick) {
  if (on <= 0) return; rect(x, y, s, s, col); ctx.save(); ctx.strokeStyle = tick; ctx.lineWidth = s * 0.14; ctx.lineCap = 'square'; ctx.beginPath();
  const p = clamp(on); ctx.moveTo(x + s * 0.24, y + s * 0.52); const mx = x + s * 0.43, my = y + s * 0.7; if (p < 0.5) ctx.lineTo(lerp(x + s * 0.24, mx, p * 2), lerp(y + s * 0.52, my, p * 2)); else { ctx.lineTo(mx, my); ctx.lineTo(lerp(mx, x + s * 0.78, (p - 0.5) * 2), lerp(my, y + s * 0.3, (p - 0.5) * 2)); } ctx.stroke(); ctx.restore();
}
