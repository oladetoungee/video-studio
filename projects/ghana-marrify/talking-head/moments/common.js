/* Shared layout for the ghana-marrify talking-head clips, in the film's "Blink" look (loaded after ../film/scenes/blink.js,
 * the shared kit: BL palette, Instrument Sans / Geist Mono, critters with eyes, glyph faces, bubbles, eyelid wipes, real
 * source cards). This file only adds what footage needs; it never edits blink.js.
 *
 *   16:9  "full":  her face right of centre (fx ~0.68); bubbles on the left third (x 110..~930); characters peek in.
 *         "split": a white panel 0..880 on the left (the Blink world), her reframed to the right.
 *   9:16  "full":  z 1.16..1.28 lifts her face; bubbles under her chin (y ~1240..1640, captions step aside meanwhile).
 *         "split": a white panel from y 1060 down, her drawn smaller above it; panel content in x 80..940, y 1110..1640;
 *                  the burned captions sit on the panel line.
 *   card: the full white world (her voice continues), entered and left with the eyelid wipe.
 * Kept from the deck-style version (critic rounds 1-3): whole-phrase reveals, captions hidden under bubble pairs, 9:16 safe
 * zone x <= 940 / y <= 1640, splits cutting in at once after a split or card, no paper strip under her window (padcheck).
 */
'use strict';
// blink.js gained a global BSCALE (the film's 'scale + fill' pass); these clips size every element themselves (floors met per beat)
if (typeof BSCALE !== 'undefined') BSCALE.on = false;
const LX = () => V(110, 80);
const WX = () => V(700, 860);    // panel content width

// 9:16: never below 1.16x in "full" shots (lifts her face over the bubble band). Leaving a 9:16 split, the camera switches
// 0.04 s early so the paper strip under her window never shows for a frame (tools/padcheck.mjs).
const CAM0 = CAM;
CAM = (t, o = {}) => {
  if (PORTRAIT && !o.pad) { let prev = null; for (const k_ of FOOT.keys) if (k_.t <= t && (!prev || k_.t >= prev.t)) prev = k_; if (prev && prev.pad) t -= 0.04; }
  return CAM0(t, PORTRAIT && !o.pad ? { ...o, z: Math.max(o.z == null ? 1 : o.z, 1.16) } : o);
};
function camSplit(t, o = {}) { CAM(t + (o.now ? 0 : V(0, 0.12)), { z: V(1.3, 0.84), fx: V(0.74, null), fy: V(null, 0.33), pad: PORTRAIT, ...o }); }
function camFull(t, z16 = 1.26, z9 = 1.16, o = {}) { CAM(t, { z: V(z16, z9), fx: V(0.66, null), fy: V(null, 0.36), ...o }); }
function camPunch(t, z16 = 1.36, z9 = 1.24, o = {}) { CAM(t, { z: V(z16, z9), fx: V(0.68, null), fy: V(null, 0.34), ...o }); }
function camPush(t, d, z16 = 1.34, z9 = 1.22, o = {}) { CAM(t, { z: V(z16, z9), fx: V(0.68, null), fy: V(null, 0.35), d, ease: 'sine', ...o }); }

/* ---------- scenes: shots and cards with the eyelid wipe ---------- */
/** bscene: a shot over her footage (kind 'shot') or a full white card (kind 'card'). o.lid: this scene opens with the eyelid
 *  wipe (the scene before closes its lids over its last 0.2 s). o.id, o.push (cards: slow push, default 0.012). */
function bscene(kind, start, draw, o = {}) {
  let me = null;
  const wrapped = (t, lt) => {
    if (!me) me = SCENES.find(s => s.draw === wrapped);
    const end = sceneEnd(me.n - 1), next = SCENES[me.n];
    ctx.save();
    if (kind === 'card' && o.push !== 0) pushCam(lt, Math.max(0.5, end - me.start), o.push == null ? 0.012 : o.push, CX, V(H * 0.48, 900));
    draw(t, lt);
    ctx.restore();
    const c = lidAmount(t, me.start, end, { in: !!o.lid, out: !!(next && next.bo && next.bo.lid) });
    if (c > 0) { blinkLids(c); if (c > 0.2) FOOT.hideCap = true; }
  };
  if (kind === 'card') card(start, 'white', wrapped, { id: o.id, grid: false }); else shot(start, wrapped, { id: o.id, ground: 'white' });
  SCENES[SCENES.length - 1].bo = o;
  if (o.lid) { sfx('lid', start - 0.12, -2); sfx('blink', start + 0.1, -4); }
}
const bshot = (start, draw, o = {}) => bscene('shot', start, draw, o);
const bcard = (start, draw, o = {}) => bscene('card', start, draw, o);

/* ---------- the white panel (split) ---------- */
const SPLIT9 = { capY: 1004 };
function split(t, t0, ground, fn, o = {}) {
  let afterCard = false; for (const sc of SCENES) if (sc.start < t0 - 0.01 && (!afterCard || sc.start > afterCard.start)) afterCard = sc;
  const instant = PORTRAIT && t0 > 0.05 && (camParams(Math.max(0, t0 - 0.05)).pad || (afterCard && afterCard.card));
  if (PORTRAIT && t >= t0 - 0.002 && (o.t1 == null || t < o.t1)) FOOT.capYNow = SPLIT9.capY;
  if (PORTRAIT && !instant && t >= t0 - 0.05 && t < t0 + 0.45) FOOT.hideCap = true;   // no caption over her mouth while the window settles
  return panel(t, { t0: instant ? t0 - 0.002 : t0, t1: o.t1, side: V('left', 'bottom'), size: V(880, 860), ground: ground || 'white', dur: instant ? 0.001 : (o.dur || 0.4), grid: false }, (r) => { INPANEL.on = true; try { fn(r); } finally { INPANEL.on = false; } });
}
const wsplit = (t, t0, fn, o) => split(t, t0, 'white', fn, o);
const INPANEL = { on: false };

/* ---------- motion helpers ---------- */
const ease = (t, t0, d = 0.5, f = eOutB) => f(prog(t, t0, d));
function springIn(t, t0, x, y, o = {}) { const sp = t < t0 ? 0 : spring(t - t0, o.f || 2.0, o.z || 0.55); return { x: lerp(x + (o.dx || 0), x, sp), y: lerp(y + (o.dy == null ? 90 : o.dy), y, sp), p: sp, s: popS(t, t0, o.pf || 2.6, o.pz || 0.45) }; }
function lookAt(fx, fy, tx, ty) { const dx = tx - fx, dy = ty - fy, d = Math.hypot(dx, dy) || 1; return [dx / d, dy / d]; }
/** a searcher face with its own blink clock (the two eyes a frame apart) */
function face(t, x, y, r, seed, o = {}) {
  const fo = { wake: o.wake, squeeze: o.squeeze, wide: o.wide, base: o.base };
  glyphFace(x, y, r, { s: o.s, state: faceState(t, seed, fo), state2: faceState(t - 1 / 30, seed, fo), lx: o.lx, ly: o.ly, col: o.col, a: o.a, key: o.key });
}
/** a record character that pops in at t0 (spring, overshoot) and blinks on its own clock */
function pop(t, t0, shape, col, x, y, size, o = {}) {
  const s = popS(t, t0, o.f || 2.4, o.z || 0.45); if (s <= 0) return;
  critter(shape, col, x, y, size, { ...o, s: s * (o.s || 1), open: o.open != null ? o.open : blinkOpen(t, o.seed == null ? x * 0.01 + y * 0.003 : o.seed) });
}
/** a character peeking in from a frame edge beside her (16:9 left edge, 9:16 right edge), eyes on her */
function peek(t, t0, t1, shape, col, o = {}) {
  const inP = spring(Math.max(0, t - t0), 1.6, 0.6) * (t1 == null ? 1 : 1 - E.inCubic(prog(t, t1 - 0.25, 0.25))); if (t < t0 || inP <= 0.01) return;
  const side = o.side || V('left', 'right'), size = o.size || V(250, 250), y = o.y || V(1000, 1560);
  // 9:16: pops in place inside the safe zone (x <= 935: the right rail is under the app's buttons); 16:9: slides in from the edge
  const x = PORTRAIT ? 935 - size * 0.55 : side === 'left' ? lerp(-size * 0.6, size * 0.28, inP) : lerp(W + size * 0.6, W - size * 0.3, inP);
  critter(shape, col, x, y, size, { s: PORTRAIT ? Math.min(1.08, inP) : 1, rot: (side === 'left' ? 1 : -1) * (o.rot == null ? 12 : o.rot), open: o.open != null ? o.open : blinkOpen(t, o.seed || 5), lx: side === 'left' ? 0.9 : -0.9, ly: -0.3, key: o.key });
}

/* ---------- bubbles beside her (replace the deck "plates") ---------- */
// whole phrase on its first word; the captions step aside while the pair is up (same words twice otherwise)
const FIT = { right: null };
function bubPair(t, a, b, o = {}) {
  const x = o.x == null ? LX() : o.x, y = o.y == null ? V(250, 1236) : o.y, sa = a ? (a.size || V(62, 54)) : 0, sb = b ? (b.size || V(44, 40)) : 0;
  if (a && b && !o.seq && b.t > a.t + 0.3) b = { ...b, t: a.t + 0.3 };
  if (!o.keepCap) { const t1 = a ? a.t : b.t; if (t >= t1 - 0.1 && (o.out == null || t < o.out)) FOOT.hideCap = true; }
  const out = o.out == null ? 1 : 1 - E.inCubic(prog(t, o.out - 0.2, 0.2)); if (out <= 0) return;
  let yy = y;
  if (a) { const r = bub(t, a.t, x, yy, a.s, { size: sa, weight: 600, acc: a.acc || BL.green, key: a.id || a.s, a: out, tick: a.tick, strike: a.strike }); yy += r.h + V(18, 16); }
  if (b) bub(t, b.t, x, yy, b.s, { size: sb, weight: 500, acc: b.acc || BL.green, key: b.id || b.s, a: out, fg: b.fg, tick: b.tick, strike: b.strike, bg: b.bg });
}
/** the small mono ILLUSTRATION mark for any made-up interface */
const illus = (x, y, align = 'left') => bmono('Illustration', x, y, V(20, 22), { align, key: 'illustration', col: BL.soft });
/** a headline with whole-phrase reveal at t0 (bh), safe-zone aware */
function head(t, t0, lines, x, y, size, o = {}) {
  const lead = o.small || o.col === BL.grey || o.weight === 500;
  if (!lead) size = Math.max(size, PORTRAIT ? 72 : INPANEL.on ? 0 : 84);
  // 16:9 panel heads go up to 72 px whenever every authored line still fits the panel at that size (no new wraps)
  if (!lead && !PORTRAIT && INPANEL.on && size < 72 && Math.max(...lines.map(l => tw(l.replace(/[*_~]/g, ''), BF.h(72, o.weight || 600), -1.8))) <= 810 - x - 10) size = 72; bh(t, { lines, x, y, size, t0, stagger: o.stagger == null ? 0.012 : o.stagger, dur: o.dur || 0.45, acc: o.acc || BL.green, weight: o.weight, col: o.col, align: o.align, id: o.id, fitW: o.fitW || (o.align === 'center' ? undefined : (INPANEL.on ? V(810 - x, 940 - x) : V(undefined, 940 - x))), lh: o.lh, a: o.a, out: o.out, times: o.times, fx: o.fx }); }
/** a simple phone (illustration) */
function bPhone(x, y, w, h, body) { fillRR(x, y, w, h, w * 0.14, BL.ink); ctx.save(); rr(x + 10, y + 10, w - 20, h - 20, w * 0.11); ctx.clip(); rect(x + 10, y + 10, w - 20, h - 20, BL.card); if (body) body(x + 10, y + 10, w - 20, h - 20); ctx.restore(); fillRR(x + w / 2 - w * 0.16, y + 22, w * 0.32, 14, 7, BL.ink); }
/** a white card (soft shadow) */
function wcard(x, y, w, h, r = 20) { ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.07)'; ctx.shadowBlur = 30; ctx.shadowOffsetY = 10; fillRR(x, y, w, h, r, BL.card); ctx.restore(); }
/** end call to action */
function handle(t, t0, x, y, align = 'left') {
  const p = ease(t, t0, 0.4); if (p <= 0) return;
  withA(p, () => { bmono('Full video on YouTube', x, y - V(60, 72), V(24, 28), { align, key: 'handle', col: BL.grey }); _txt('@WithGbemi', x, y + 14 * (1 - p), BF.h(V(52, 64), 700), BL.ink, align, 'alphabetic', -1.5); });
}
const MF_CREDIT = 'marrifyapp.com, captured 1 Oct 2026';
const TC = {
  head: [0, 120, 1240, 330],
  launch: [[314.6, 1500, 785.4, 40], [48.6, 1551.2, 938.2, 36]],
  lead: [[48.6, 2381, 360.4, 38]],
  sensitive: [[417.8, 2383, 606.4, 36], [48.6, 2434.2, 302.2, 36]],
  credit: 'TechCabal Daily, 8 Sep 2026 (techcabal.com)',
};

/* ---------- burned-in captions, restyled for Blink (footage.js draws them through this name) ---------- */
// white rounded label with a soft shadow, Instrument Sans 700, the spoken word marked with the highlighter yellow
function drawMomentCaptions(t) {
  if (!PORTRAIT) return;
  const cs = FOOT.capShort; let c = null; for (const x of cs) if (x.t0 <= t && t < x.t1) c = x; if (!c) return;
  // a chunk of one short word ("it.") reads as a stray: show it with the chunk before it
  if (c.ws.length === 1 && c.ws[0].w.length <= 4 && c.i > 0 && cs[c.i - 1] && c.t0 - cs[c.i - 1].t1 < 0.6) { const pv = cs[c.i - 1]; c = { ...c, ws: [...pv.ws.slice(-3), ...c.ws], t0: c.t0, text: [...pv.ws.slice(-3), ...c.ws].map(w => w.w).join(' ') }; }
  const size = 56, font = BF.h(size, 700), padX = size * 0.36, sp = tw(' ', font);
  const ce = (EDIT.data.capShort || {})[c.i];
  const strs = ce != null ? ce.split(/\s+/) : c.ws.map(w => w.w);
  const ws = strs.map(s => tw(s, font)); const total = ws.reduce((a, b) => a + b, 0) + sp * (strs.length - 1);
  const tShow = Math.max(c.t0, c.ws[0].t - 0.14); if (t < tShow) return;   // the label appears with its first word, never empty
  const p = sn(t, tShow, 0.16); const y = (FOOT.capYNow || 1540) + 14 * (1 - p);
  const bx = CX - total / 2 - padX, by = y - size * 0.98, bw = total + padX * 2, bhh = size * 1.36;
  ctx.save(); ctx.globalAlpha *= clamp(p * 1.6);
  ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.16)'; ctx.shadowBlur = 24; ctx.shadowOffsetY = 6; fillRR(bx, by, bw, bhh, 18, BL.card); ctx.restore();
  let x = CX - total / 2;
  strs.forEach((s, k) => {
    const w = c.ws[Math.min(k, c.ws.length - 1)]; const on = t >= w.t - 0.04;
    if (on && (k === c.ws.length - 1 || t < c.ws[k + 1].t - 0.04)) fillRR(x - 7, y - size * 0.84, ws[k] + 14, size * 1.06, 8, BL.hi);
    _txt(s, x, y, font, on ? BL.ink : BL.soft);
    x += ws[k] + sp;
  });
  ctx.restore();
  regBox({ id: 'caption/' + c.i, edited: ce != null, hide: false }, bx, by, bw, bhh, { kind: 'caption', text: strs.join(' '), def: c.text, cue: c.i });
}
/* captions step aside while a bubble pair (or a lid) is up: bubPair sets FOOT.hideCap for the frame, restored after */
layer(() => {
  if (FOOT.hideCap) { if (SHOW.captions) { FOOT.capWas = true; SHOW.captions = false; } }
  else if (FOOT.capWas) { SHOW.captions = true; FOOT.capWas = false; }
  FOOT.hideCap = false;
});

/* SFX thinning for short clips; the film's sound vocabulary (pop, blink, lid, whoosh, pen, tick, crowd, impact, type) */
Object.assign(SFX_PRI, { impact: 7, lid: 7, whoosh: 5, type: 4, click: 4, pen: 3, crowd: 4, pop: 3, blink: 3, tick: 2, yes: 5, ding: 4 });
Object.assign(SFX_GAP, { impact: 2.0, lid: 0.5, whoosh: 0.8, type: 0.6, click: 0.5, pen: 0.8, crowd: 1.2, pop: 0.35, blink: 0.4, tick: 0.35, yes: 0.9, ding: 0.8 });
/** lockTable drawn at scale s (9:16 panels need bigger cells than the kit's): same API, x/y/w in layout px */
function lockTableS(t, x, y, w, o, s = V(1, 1.3)) { if (s === 1) return lockTable(t, x, y, w, o); let r; withT(x, y, s, 0, () => { r = lockTable(t, 0, 0, w / s, o); }); return r; }
