/* Studio runtime, part 5: talking-head layouts (full-length edits, moments, shorts). Loaded after footage.js by the moment
 * render host (moment.html) and the moment editor; never by films.
 *
 * Everything lives in one global, TH (so nothing collides with a film's or a project's own names):
 *   TH.talk(span, o)            L1  her full frame: framing presets, slow push, punch-ins, a new framing on each jump cut
 *   TH.behind(span, words, o)   L2  giant words BEHIND her head (person matte)
 *   TH.shout(span, lines, o)    L3  2-4 lines of giant type in front of her, typed on her words
 *   TH.stack(span, items, o)    L4  things she names stack beside her, each on its word
 *   TH.half(span, o)            L5  half and half: a film scene (or your drawing) on one half, her on the other
 *   TH.sticker(span, o)         L6  her cut-out with a light outline on a flat / grid ground, a document slides in behind her
 *   TH.pops(span, items, o)     L7  4-8 objects pop on a ring around her head, then collapse to the one she means
 *   TH.keyword(span, words, o)  L8  keyword caption at chest height (one word in the serif, bigger); replaces the caption
 *   TH.cutaway(span, o)         L9  a film scene full screen while her voice continues
 *   TH.card(span, lines, o)     L10 flat accent ground, one line
 *   TH.corner(span, o)          L11 a film scene full frame, her in a circle (bottom-left; o.corner 'bl'|'br'|'tl'|'tr'|'auto')
 *   TH.highlight(at, word, o)   L12 the payoff word gets an accent block behind it (any TH text or the short's caption)
 *   TH.glitch(at, o)            L13 a 1-2 frame RGB split (on a word, or on the graphics)
 *   TH.split(span, o)           L14 uneven split: her strip (o.her 30-45 %) left / right (16:9) or bottom / top (9:16), the graphic the rest
 *   TH.tile(span, o)            L15 the graphic full frame, her in a square-cornered window tile (any size / corner; slides between keys)
 *   TH.page(span, o)            L16 her picture as the lead image of a generic page (browser bar or none); the page follows her box
 *   TH.presenter(span, o)       L17 her cut-out standing at one side, bottom-anchored, IN FRONT of a full-frame graphic (matte)
 *   TH.room(span, o)            L18 make room: full-frame her slides (16:9) / shrinks (9:16) to one side while the graphic opens
 *   TH.ots(span, o)             L19 over-the-shoulder window: she stays full frame, a square window with the graphic beside her head
 *   (L14-L19: her box is draggable / resizable in the editor; graphic = o.film | o.img + o.credit | o.draw | o.card {kicker, lines, at})
 * Shorts framing (9:16 shorts only, default 'fill' = as before): TH.FRAMES 'fill' | '4x5' | '3x4' | '1x1' | '4x5band' | 'wide':
 *   her picture in a wider window of her frame, label + captions on flat bands ("frame9" in moment / manifest / edits, o.win).
 * span = a phrase from P()/PS() (start a hair before its first word, end at its last word + hold), [t0, t1] in seconds, or
 *        {from, to} (phrases or seconds). o.id sets the segment's edit id; o.sound: false = no automatic sound cues.
 * A segment lasts from its start to its end; any gap until the next segment is filled with her plain framing (L1).
 * Texts are editable in the moment editor (click), boxes movable (drag); per frame size, as everywhere.
 *
 * Shorts (moment "kind": "short"): TH.short* draws the top label (Helvetica Neue, white boxes), her caption spec (Helvetica
 * Neue Medium 76 px, tight tracking, #DFD7CB on 40 % black, centred y 1535, phrase blocks <= 2 x 30 characters) and the
 * 5-7 s "full video on YouTube" end card. Helvetica Neue is the Mac's own font: drawn by name (local only), never copied.
 *
 * Film scenes inside a moment (L5, L9, L11, shorts inserts): the project's own film (talking-head.json "film": "<slug>")
 * runs in a hidden frame with the film runtime and is drawn into the moment, frame-exact, synced to her words (the same
 * speech in both timelines is matched word by word), so the film's visuals land on the same words here.
 */
'use strict';

const TH = (() => {
  const T = { used: false, segs: [], hl: [], glitches: [], capOff: [], need: [], over: [], film: null, look: null, kind: '', layer: null, n: 0 };

  /* ---------- the look (a project overrides any of it in its common.js: Object.assign(TH.look, {...})) ---------- */
  T.look = {
    disp: (s) => F.disp(s), dispLS: LS.disp, upper: true, font: 'disp',   // giant type (L2, L3, L10)
    fg: C.paper, ink: C.ink, acc: C.blue, accOnDark: C.blueT,            // text on her footage, accent
    ground: 'paper', cardGround: 'blue', grid: true,                     // L6 ground, L10 card ground (G keys)
    outline: '#FFFDF6', outlinePx: 14,                                     // L6 cut-out outline
    ring: C.paper, ringPx: 5,                                              // L11 circle edge
    corner: 'bl',                                                          // L11 corner: 'bl'|'br'|'tl'|'tr'|'auto' (the emptiest of the four)
    plate: 'card',                                                         // L4 / L7 chips (PLATE keys)
    dim: 0.32,                                                             // L3: flat dim over her footage behind giant type (0 = none)
    talk: { z: [1.0, 1.08] },                                              // L1 default framing [16:9, 9:16]
  };
  const lk = () => T.look;

  /* ---------- spans + word lookup ---------- */
  function span(s, o = {}) {
    const lead = o.lead == null ? 0.12 : o.lead, hold = o.hold == null ? 0.5 : o.hold;
    const at = (x, end) => (x == null ? null : typeof x === 'number' ? x : end ? x.e + hold : x.t - lead);
    let t0, t1, ph = null;
    if (Array.isArray(s)) { t0 = s[0]; t1 = s[1]; }
    else if (s && s.from != null) { t0 = at(s.from, false); t1 = at(s.to != null ? s.to : s.from, true); ph = typeof s.from === 'object' ? s.from : null; }
    else if (s && s.t != null) { t0 = s.t - lead; t1 = s.e + hold; ph = s; }
    else throw new Error('TH: a span is a phrase from P(), [t0, t1] or {from, to}');
    if (o.to != null) t1 = at(o.to, true);
    if (o.until != null) t1 = o.until;
    return { t0: Math.max(0, t0), t1: Math.min(TOTAL, Math.max(t0 + 0.2, t1)), ph };
  }
  /** spoken-word times inside a span for n display words: her words in the span, spread when the counts differ */
  function wordTimes(sp, n, o = {}) {
    if (o.times) return o.times;
    const ws = WORDS.filter(w => w.t >= sp.t0 - 0.01 && w.t < sp.t1).map(w => w.t);
    if (!ws.length) return Array.from({ length: n }, (_, i) => sp.t0 + 0.15 + i * 0.12);
    if (ws.length === n) return ws;
    return TM({ t: ws[0], w: ws }, n);
  }
  /** the time she says q (a word or a few words) inside the span, else null */
  function timeOf(q, sp) {
    if (typeof q === 'number') return q; if (q && q.t != null) return q.t;
    const qs = String(q).split(/\s+/).map(norm).filter(Boolean); if (!qs.length) return null;
    for (let i = 0; i <= WORDS.length - qs.length; i++) {
      if (WORDS[i].t < sp.t0 - 0.3 || WORDS[i].t > sp.t1) continue;
      let ok = true; for (let k = 0; k < qs.length; k++) if (WORDS[i + k].n !== qs[k]) { ok = false; break; }
      if (ok) return WORDS[i].t;
    }
    return null;
  }
  const mustTime = (q, sp, what) => { const t = timeOf(q, sp); if (t == null) throw new Error(`TH.${what}: "${q}" is not said between ${sp.t0.toFixed(2)} and ${sp.t1.toFixed(2)} s`); return t; };

  /* ---------- segments ---------- */
  const LABEL = { talk: 'L1 talk', behind: 'L2 words behind her', shout: 'L3 shout over', stack: 'L4 side stack', half: 'L5 half and half', sticker: 'L6 sticker on paper', pops: 'L7 pop-around', cutaway: 'L9 cutaway (film)', card: 'L10 card', corner: 'L11 corner cam' };
  function seg(kind, sp, o, draw, cam, extra = {}) {
    T.used = true; const id = o.id || `${kind}-${++T.n}`;
    const s = { kind, t0: sp.t0, t1: sp.t1, id, draw, cam, card: !!extra.card, ground: extra.ground || 'ink', cover: !!extra.cover, o };
    T.segs.push(s); return s;
  }
  const snd = (o, role, t, db = 0, extra) => { if (o.sound !== false && t != null && t >= 0 && t < TOTAL) sfx(role, t, db, extra); };

  /* ---------- camera presets ---------- */
  const Z = { wide: [1.0, 1.08], mid: [1.22, 1.16], close: [1.5, 1.3], tight: [1.8, 1.45] };
  const zOf = (f) => (typeof f === 'number' ? f : V(...(Z[f] || Z.wide)));
  const sideFx = (s) => (typeof s === 'number' ? s : s === 'left' ? 0.36 : s === 'right' ? 0.64 : s === 'center' ? 0.5 : null);
  function baseCam(t, d = 0) { const z = lk().talk.z; CAM(t, { z: V(z[0], z[1]), d, fx: lk().talk.fx, fy: lk().talk.fy }); }

  /* ---------- L1 talk ---------- */
  /** o.frame 'wide'|'mid'|'close'|'tight'|zoom, o.side 'left'|'center'|'right'|0..1, o.push [zFrom, zTo] (slow push across
   *  the span), o.punch [times or words] (a quick punch-in on each), o.alt true (a new framing on every jump cut) */
  T.talk = (s, o = {}) => {
    const sp = span(s, o);
    return seg('talk', sp, o, null, () => {
      const fx = sideFx(o.side); const z0 = zOf(o.frame || 'wide');
      if (o.push) { CAM(sp.t0, { z: o.push[0], fx }); CAM(sp.t0 + 0.02, { z: o.push[1], fx, d: Math.max(0.5, sp.t1 - sp.t0 - 0.02), ease: 'sine' }); }
      else CAM(sp.t0, { z: z0, fx, d: o.d || 0 });
      if (o.alt) { let k = 0; for (const c of cutTimes()) if (c > sp.t0 + 0.3 && c < sp.t1 - 0.3) CAM(c, { z: ++k % 2 ? zOf(o.altFrame || 'mid') : z0, fx }); }
      for (const p of [].concat(o.punch || [])) { const t = timeOf(p, sp); if (t == null) continue; CAM(t - 0.04, { z: z0 * (o.punchZ || 1.18), fx, d: 0.3, ease: 'outQuint' }); }
    });
  };

  /* ---------- L2 words behind her ---------- */
  /** words: 'SLIPPERY' | ['TOO', 'RUDE?'] (lines). o.times (per word), o.size, o.col, o.x, o.y, o.font ('disp'|'body'|'serif'), o.mark (word index for L12) */
  T.behind = (s, words, o = {}) => {
    const sp = span(s, o); const lines = [].concat(words); const n = nW(lines); const times = wordTimes(sp, n, o);
    T.needMatte(sp.t0, sp.t1);
    const sg = seg('behind', sp, o, (t) => {
      // the words cross the top of her head (centred on her face, measured at the segment's start so they do not swim)
      const f = faceOut(Math.min(sp.t1 - 0.05, sp.t0 + 0.3)); let size = o.size || V(300, 220); let Lb = layoutKT({ lines, size, font: o.font || lk().font, lh: o.lh || 0.88 });
      if (Lb.w > W - 2 * V(96, 60)) { size *= (W - 2 * V(96, 60)) / Lb.w; Lb = layoutKT({ lines, size, font: o.font || lk().font, lh: o.lh || 0.88 }); }   // a long word shrinks to fit inside the frame (9:16 'ORGANISMS' was cut)
      const align = o.align || 'center'; const x = o.x != null ? o.x : align === 'center' ? clamp(f.cx, Lb.w / 2 + 60, W - Lb.w / 2 - 60) : V(116, 64);
      const headTop = f.top - f.h * 0.3;   // her hair line above the face box: the words' lower part goes behind it
      const y = o.y != null ? o.y : Math.max(size * 0.8 + V(40, 330), V(f.top + f.h * 0.22, headTop + size * 0.42) - (Lb.lines.length - 1) * Lb.lh);
      T.behindHer(t, () => KT(t, { lines, x, y, align, size, font: o.font || lk().font, times, col: o.col || lk().fg, acc: o.acc || lk().accOnDark, dur: 0.2, blur: size * 0.06, lh: o.lh || 0.88, fitW: V(W * 0.92, W * 0.9), id: o.key, mark: T.markFor(lines, times) }));
    }, () => CAM(sp.t0, { z: o.z || V(1.0, 1.1), fx: o.fx == null ? V(0.5, 0.5) : o.fx, fy: o.fy == null ? V(0.55, 0.64) : o.fy }));
    snd(o, 'hit', times[0], -4);
    return sg;
  };

  /* ---------- L3 shout over ---------- */
  /** lines: 2-4 lines of giant type (markup *accent* ~serif~), typed on her words. o.times, o.size, o.dim (flat dim over her) */
  T.shout = (s, lines, o = {}) => {
    const sp = span(s, o); const n = nW(lines); const times = wordTimes(sp, n, o);
    const sg = seg('shout', sp, o, (t) => {
      const dim = o.dim == null ? lk().dim : o.dim; if (dim > 0) withA(dim * E.outCubic(prog(t, sp.t0, 0.2)), () => rect(0, 0, W, H, '#000'));
      const size = o.size || V(214, 150), x = o.x == null ? V(110, 64) : o.x, y = o.y == null ? V(70 + size * 0.74, 300 + size * 0.74) : o.y;
      KT(t, { lines, x, y, size, font: o.font || lk().font, times, col: o.col || lk().fg, acc: o.acc || lk().accOnDark, lh: 0.9, dur: 0.22, fitW: W - x - V(60, 64), id: o.key, mark: T.markFor(lines, times) });
    }, () => CAM(sp.t0, { z: o.z || V(1.12, 1.1), fx: o.fx == null ? V(0.66, null) : o.fx, fy: o.fy == null ? V(null, 0.62) : o.fy }));
    let wi = 0; for (const l of lines) { snd(o, 'typeHit', times[wi], -2); wi += nW(l); }
    return sg;
  };

  /* ---------- L4 side stack ---------- */
  /** items: [{s: 'text', at: 'word she says' | time, img: 'image key'}] (max 4). Each lands on its word; all leave together. */
  T.stack = (s, items, o = {}) => {
    const sp = span(s, o); const its = items.slice(0, 4).map((it, i) => ({ ...(typeof it === 'string' ? { s: it } : it), i }));
    its.forEach((it, i) => { it.t = it.at != null ? mustTime(it.at, sp, 'stack') : sp.t0 + 0.2 + i * 0.5; });
    const sg = seg('stack', sp, o, (t) => {
      const outP = E.inCubic(prog(t, sp.t1 - 0.2, 0.2)); const n = its.length;
      const cols = PORTRAIT && n > 2 ? 2 : 1;
      const x0 = V(W * 0.6, 64), y0 = V(H * 0.3, H * 0.09), colW = V(W * 0.33, (W - 128 - 24) / cols), gap = V(22, 20);
      const rowH = o.rowH || V(Math.min(150, (H * 0.45) / n), 128);
      its.forEach((it, i) => {
        const p = MOTION.ease(t, it.t - 0.05, 0.36, 'outQuint'); if (p <= 0) return;
        const c = i % cols, r = Math.floor(i / cols);
        const x = x0 + c * (colW + gap), y = y0 + r * (rowH + gap);
        grp('item ' + (i + 1), x, y, colW, rowH, () => withA(clamp(p * 2.5) * (1 - outP), () => withT(60 * (1 - p) + 40 * outP, 0, 1, 0, () => {
          const [bg, fg] = PLATE[o.plate || lk().plate] || PLATE.card; rect(x, y, colW, rowH, bg);
          let tx = x + V(28, 24);
          if (it.img && IMG[it.img]) { const im = IMG[it.img], ih = rowH - 28, iw = Math.min(ih * 1.4, im.width / im.height * ih); themeFixed(() => ctx.drawImage(im, tx, y + 14, iw, ih)); tx += iw + 20; }
          txt(it.s, tx, y + rowH / 2, F.body(o.size || V(44, 40), 700), fg, 'left', 'middle', 0, it.key);
        })));
      });
    }, () => CAM(sp.t0, { z: o.z || V(1.1, 1.12), fx: o.fx == null ? V(0.32, null) : o.fx, fy: o.fy == null ? V(null, 0.6) : o.fy }));
    its.forEach((it) => snd(o, 'pop', it.t - 0.03, -3));
    return sg;
  };

  /* ---------- L5 half and half ---------- */
  /** o.film {scene: 'id' | at: seconds, aspect: '9x16'|'16x9', fit: 'cover'|'contain'|'safe'} or o.draw(t, r) (r = the
   *  panel rect; draw anything with the house API), o.side 'left'|'right' (16:9) / 'top'|'bottom' (9:16): where the motion
   *  goes; her picture takes the other half (cropped, never flipped). o.ground for the panel (default the look's ground). */
  T.half = (s, o = {}) => {
    const sp = span(s, o); const side = o.side || V('left', 'top'); const enter = o.enter == null ? 0.55 : o.enter;
    const R = () => { const h = side === 'left' || side === 'right'; const sz = o.size || (h ? W / 2 : H / 2);
      const mot = side === 'left' ? [0, 0, sz, H] : side === 'right' ? [W - sz, 0, sz, H] : side === 'top' ? [0, 0, W, sz] : [0, H - sz, W, sz];
      const her = side === 'left' ? [sz, 0, W - sz, H] : side === 'right' ? [0, 0, W - sz, H] : side === 'top' ? [0, sz, W, H - sz] : [0, 0, W, H - sz];
      return { mot, her }; };
    if (o.film) { o.film = { aspect: '9x16', ...o.film }; T.filmNeed(o.film); }   // the film's phone layout fits a half frame best
    // 9:16 / 1:1 / 4:5: the panel zooms onto what the film actually draws (her note 2026-10-15: "it's already a small screen,
    // maximize the space"); measured once before playback (T.resolveFills). film.fill: false keeps the old framing.
    if (o.film && PORTRAIT && o.film.fill !== false && o.film.fit !== 'cover' && !o.film.src && !o.film.srcAt) T.fills.push({ sp, film: o.film, o, side });
    const sg = seg('half', sp, o, (t) => {
      const { mot } = R(); const e = MOTION.ease(t, sp.t0, enter, 'inOutQuart');
      const r = side === 'left' ? [mot[0], 0, mot[2] * e, H] : side === 'right' ? [W - mot[2] * e, 0, mot[2] * e, H] : side === 'top' ? [0, 0, W, mot[3] * e] : [0, H - mot[3] * e, W, mot[3] * e];
      if (r[2] < 1 || r[3] < 1) return;
      const g0 = g; g = G[o.ground || lk().ground] || g0; rect(...r, g.bg);
      ctx.save(); ctx.beginPath(); ctx.rect(...r); ctx.clip();
      // the content keeps its full-size layout and is revealed by the divider (it does not squash)
      const full = { x: mot[0], y: mot[1], w: mot[2], h: mot[3] };
      if (o.film && PORTRAIT && side === 'top' && o.underLabel !== true) { const lb = T.labelBottom(); if (lb > 0) { full.y = lb + 16; full.h = mot[3] - lb - 16; } }   // shorts: the film's top line never sits under the label
      // the film in a half is a movable box (her note 2026-10-15: its title was cut off at the top and could not be dragged down)
      if (o.film) grp('film', full.x, full.y, full.w, full.h, () => T.drawFilm(t, full, o.film, sp), { label: 'film panel (drag to move, resize)' }); else if (o.draw) o.draw(t, full);
      ctx.restore(); g = g0;
      if (PORTRAIT && side === 'top' && e > 0.5) FOOT.capYNow = mot[3] + 80;   // 9:16: the caption sits on the divider, off her face
      if (!o.film) FOOT.panelRect = { x: r[0], y: r[1], w: r[2], h: r[3] };   // (composite.mjs check: a drawn panel must hold text; a film scene is its own content)
    }, () => { const { her } = R(); CAM(sp.t0, { box: her, z: o.z || V(1, 1.4), fx: o.fx == null ? 0.5 : o.fx, fy: o.fy == null ? V(0.4, 0.45) : o.fy }); });   // her half is framed at once; the motion half slides over
    snd(o, 'swipe', sp.t0 + enter * 0.5, -2);
    if (o.film && o.film.sound) T.filmCues(sp, o.film);
    return sg;
  };

  /* ---------- L6 sticker on paper ---------- */
  /** her cut-out (matte) with a light outline on a flat / grid ground; o.img (image key: a real document / screenshot) or
   *  o.film {...} or o.under(t, r) slides in behind her; o.tag ('01'), o.lines (1-3 short lines typed on her words). */
  T.sticker = (s, o = {}) => {
    const sp = span(s, o); T.needMatte(sp.t0, sp.t1); const tDoc = o.docAt != null ? mustTime(o.docAt, sp, 'sticker') : sp.t0 + 0.35;
    const lines = [].concat(o.lines || []); const times = lines.length ? wordTimes({ t0: o.linesAt != null ? mustTime(o.linesAt, sp, 'sticker') - 0.05 : sp.t0 + 0.4, t1: sp.t1 }, nW(lines), o) : [];
    if (o.film) T.filmNeed(o.film);
    const sg = seg('sticker', sp, o, (t) => {
      const ground = G[o.ground || lk().ground] || G.paper; const g0 = g; g = ground;
      T.cutout(t, {
        ground: ground.bg, grid: o.grid == null ? lk().grid : o.grid, outline: o.outline || lk().outline, outlinePx: o.outlinePx || lk().outlinePx,
        under: () => {
          const p = MOTION.ease(t, tDoc, 0.45, 'outQuint'); if (p <= 0) return;
          const r = o.docRect || V([W * 0.08, H * 0.38, W * 0.5, H * 0.56], [64, 330, W - 128, 560]);
          grp('document', r[0], r[1], r[2], r[3], () => withT(0, (1 - p) * 120, 1, (1 - p) * -0.05, () => withA(clamp(p * 3), () => {
            if (o.img && IMG[o.img]) { const im = IMG[o.img]; const s2 = Math.min(r[2] / im.width, r[3] / im.height); themeFixed(() => { rect(r[0] - 10, r[1] - 10, im.width * s2 + 20, im.height * s2 + 20, C.photo); ctx.drawImage(im, r[0], r[1], im.width * s2, im.height * s2); }); }
            else if (o.film) { rect(r[0] - 10, r[1] - 10, r[2] + 20, r[3] + 20, C.photo); T.drawFilm(t, { x: r[0], y: r[1], w: r[2], h: r[3] }, o.film, sp); }
            else if (o.under) o.under(t, { x: r[0], y: r[1], w: r[2], h: r[3] });
          })), { img: true });
        },
      });
      if (o.tag) tag(t, sp.t0 + 0.25, o.tag, V(W * 0.08, 64), V(H * 0.14, 300), { plate: 'ink', size: V(32, 36) });
      if (lines.length) KT(t, { lines, x: V(W * 0.08, 64), y: V(H * 0.26, 420), size: o.size || V(64, 64), font: 'body', times, col: g.fg, acc: g.acc, maxW: V(W * 0.44, W - 128), id: o.key });
      g = g0;
    }, () => CAM(sp.t0, PORTRAIT ? { box: o.box || [0, H * 0.46, W, H * 0.54], z: o.z || 1.05, fy: o.fy == null ? 0.42 : o.fy } : { z: o.z || 1.0, fx: o.fx == null ? 0.72 : o.fx, fy: o.fy == null ? 0.38 : o.fy, box: o.box }), { cover: true });
    snd(o, 'paper', sp.t0, -2); snd(o, 'shutter', tDoc + 0.3, -3);
    return sg;
  };

  /* ---------- L7 pop-around ---------- */
  /** items: 4-8 of [{img: 'key'} | {s: 'text'}] pop on a ring around her head (each at its word if `at`, else 2-3 frames
   *  apart from the start); o.focus (index) + o.focusAt (word / time): the others leave, that one moves beside her and grows */
  T.pops = (s, items, o = {}) => {
    const sp = span(s, o); const its = items.slice(0, 8).map((it, i) => ({ ...(typeof it === 'string' ? { s: it } : it), i }));
    its.forEach((it, i) => { it.t = it.at != null ? mustTime(it.at, sp, 'pops') : sp.t0 + 0.2 + i * 0.09; });
    const tF = o.focus != null ? (o.focusAt != null ? mustTime(o.focusAt, sp, 'pops') : sp.t0 + Math.max(1.6, (sp.t1 - sp.t0) * 0.55)) : null;
    const sg = seg('pops', sp, o, (t) => {
      const f = faceOut(t); const R = V(H * 0.42, W * 0.44), size = o.size || V(118, 150);
      const outP = E.inCubic(prog(t, sp.t1 - 0.2, 0.2)); const n = its.length;
      its.forEach((it, i) => {
        const a = Math.PI * (1.04 + 0.92 * (n === 1 ? 0.5 : i / (n - 1))) + (PORTRAIT ? 0 : 0);   // the upper arc, left to right
        let x = f.cx + Math.cos(a) * R * V(1.25, 1.0), y = f.cy + Math.sin(a) * R * V(0.95, 0.9);
        const sc0 = MOTION.spring(t - it.t, 0.5, 2.6); if (sc0 <= 0.001) return;
        let sc = sc0 * (1 - outP), al = clamp((t - it.t) * 8) * (1 - outP);
        if (tF != null && t >= tF) {
          const q = MOTION.ease(t, tF, 0.45, 'outQuint');
          if (i === o.focus) { const fx = V(Math.min(W - 260, f.x + f.w + 260), CX), fy = V(f.cy - 40, Math.max(380, f.top - 260)); x = lerp(x, fx, q); y = lerp(y, fy, q); sc *= lerp(1, 1.9, q); }
          else { sc *= 1 - q; al *= 1 - q; }
        }
        if (sc <= 0.01 || al <= 0.01) return;
        { const hw = (it.img ? size / 2 : (tw(it.s, F.body(V(38, 44), 700)) + 40) / 2) * sc, m = V(96, 48);   // the plate stays inside the frame (9:16 pops were cut at the edges)
          x = Math.max(m + hw, Math.min(W - m - hw, x)); }
        grp('pop ' + (i + 1), x - size / 2, y - size / 2, size, size, () => withA(al, () => withT(x, y, sc, 0, () => {
          if (it.img && IMG[it.img]) { const im = IMG[it.img]; const k = size / Math.max(im.width, im.height); themeFixed(() => ctx.drawImage(im, -im.width * k / 2, -im.height * k / 2, im.width * k, im.height * k)); }
          else { const [bg, fg] = PLATE[o.plate || lk().plate] || PLATE.card; const font = F.body(V(38, 44), 700); const w = tw(it.s, font) + 40; rect(-w / 2, -34, w, 68, bg); txt(it.s, 0, 0, font, fg, 'center', 'middle', 0, it.key); }
        })));
      });
    }, () => CAM(sp.t0, { z: o.z || V(1.0, 1.08), fx: 0.5, fy: o.fy == null ? V(0.55, 0.52) : o.fy }));
    snd(o, 'pop', its[0].t - 0.02, -3); if (its.length > 2) snd(o, 'pop', its[its.length - 1].t - 0.02, -5);
    if (tF != null) snd(o, 'tick', tF, -2);
    return sg;
  };

  /* ---------- L8 keyword caption (an overlay: works over any layout) ---------- */
  /** words: 1-3 words; mark one with ~tilde~ for the serif accent (drawn 2.2x). Replaces the caption while it is up. */
  T.keyword = (s, words, o = {}) => {
    T.used = true; const sp = span(s, { hold: 0.35, ...o }); const lines = [words];
    // on a long sentence the keyword shows only around the moment she says its words (her note 2026-10-17: "persuasive" stayed
    // up for a whole sentence with no caption); o.whole: true keeps the old behaviour
    if (!o.whole && o.until == null && sp.t1 - sp.t0 > 2.6) {
      const norm = (x) => String(x).toLowerCase().replace(/[^a-z0-9']/g, '');
      const want = String(words).split(/\s+/).map(norm).filter(x => x.length > 2);
      const hit = WORDS.filter(w => w.t >= sp.t0 - 0.01 && w.t < sp.t1 && want.includes(norm(w.w)));
      if (hit.length) { const a = hit[0].t - 0.12, b = Math.max(hit[hit.length - 1].e + 0.9, a + 1.4); sp.t0 = Math.max(sp.t0, a); sp.t1 = Math.min(sp.t1, b); }
    }
    const n = nW(lines); const times = wordTimes(sp, n, o);
    // never two keywords at once (her note 2026-10-15: "put EXPLAIN" sat on top of "is it used?"): an earlier one ends as this one starts
    for (const k of T.kws || []) if (k.sp.t0 < sp.t0 && k.sp.t1 > sp.t0 - 0.08) { k.sp.t1 = Math.max(k.sp.t0 + 0.2, sp.t0 - 0.08); k.off[1] = k.sp.t1; }
    const off = [sp.t0, sp.t1]; T.capOff.push(off); (T.kws = T.kws || []).push({ sp, off });
    if (lk().kw === 'stack') { keywordStack(sp, words, times, o); off[0] = sp.t0; off[1] = sp.t1; return; }   // (its own words around it may widen the span)
    layer((t) => {
      if (t < sp.t0 || t >= sp.t1) return; SCENE_ID = o.id || 'keyword-' + sp.t0.toFixed(1);
      const size = o.size || V(76, 84); const f = faceOut(t);
      // chest height, and never over her face (below her chin when the framing is close)
      const y = o.y || Math.min(H - V(70, 520), Math.max(V(H * 0.64, H * 0.6), f.bottom + size * (/~/.test(words) ? 1.9 : 1.1)));
      KT(t, { lines, x: CX, y, align: 'center', size, font: 'body', weight: 800, upper: false, serifScale: 2.2, times, col: o.col || lk().fg, acc: o.acc || lk().fg, dur: 0.18, blur: 8, ul: false, out: sp.t1, id: o.key, mark: T.markFor(lines, times) });
    });
  };

  /* ---------- L8 "stack" keyword (her font-style-placement reference, 2026-10-17; TH.look.kw = 'stack') ----------
   * Heavy pale-yellow type beside her face, the ~accent~ word huge, the words before it small above, the words after it
   * medium below and right-aligned to it ("building a / PERSONAL / brand"). Types on word by word on her words; the side
   * with more room next to her face; never over her face; shrinks to stay inside the frame. Editable text (one block). */
  function keywordStack(sp, words, times, o) {
    // a one-word keyword ("~curiosity~") gets her own words around it, as in her reference ("back in / 1971"): up to 3 words
    // she says just before it (small, above) and up to 2 just after (medium, below), never across a sentence end; o.bare: none
    const norm = (x) => String(x).toLowerCase().replace(/[^a-z0-9']/g, '');
    const m0 = String(words).match(/^(.*?)~(.+?)~(.*)$/); let ctxW = null;
    if (!o.bare && m0 && !m0[1].trim() && !m0[3].trim()) {
      const acc = m0[2].trim().split(/\s+/).map(norm); const i0 = WORDS.findIndex(w => w.t >= sp.t0 - 0.01 && w.t < sp.t1 && norm(w.w) === acc[0]);
      if (i0 >= 0) { const i1 = Math.min(WORDS.length - 1, i0 + acc.length - 1); const clean = (w) => w.w.replace(/[.,!?;:"]+$/g, '').replace(/^"/, '');
        // only a whole little phrase: back to her last pause / punctuation (if that is <= 3 words), on to her next one (<= 2)
        const brk = (a, b) => /[.?!,;:]$/.test(a.w) || b.t - a.e > 0.28;
        let pre = []; for (let k = i0 - 1; k >= 0; k--) { if (brk(WORDS[k], WORDS[k + 1])) break; pre.unshift(WORDS[k]); if (pre.length > 3) break; }
        if (pre.length > 3) pre = [];
        let post = [], closed = brk(WORDS[i1], WORDS[i1 + 1] || { t: 1e9 });
        if (!closed) { for (let k = i1 + 1; k < WORDS.length; k++) { post.push(WORDS[k]); if (brk(WORDS[k], WORDS[k + 1] || { t: 1e9 })) { closed = true; break; } if (post.length > 2) break; } if (!closed || post.length > 2) post = []; }
        const tsAll = [...pre, ...WORDS.slice(i0, i1 + 1), ...post].map(w => w.t);
        ctxW = { pre: pre.map(w => ({ s: clean(w) })), post: post.map(w => ({ s: clean(w) })), times: tsAll };
        if (pre.length) sp.t0 = Math.min(sp.t0, pre[0].t - 0.1); if (post.length) sp.t1 = Math.max(sp.t1, post[post.length - 1].e + 0.6);
      }
    }
    layer((t) => {
      if (t < sp.t0 || t >= sp.t1) return;
      { const sc = SCENES[sceneIndex(t)]; if (sc && (sc.cover || sc.card)) return; }   // on her footage only (a film scene has its own type; the captions show there)
      SCENE_ID = o.id || 'keyword-' + sp.t0.toFixed(1);
      const ov = ovr(o.key || 'keyword'); if (ov.hide) return; const str = ov.s != null ? ov.s : words;
      const m = str.match(/^(.*?)~(.+?)~(.*)$/); let pre = m ? m[1].trim() : '', acc = m ? m[2].trim() : str.trim(), post = m ? m[3].trim() : '';
      let tms = times;
      if (ctxW && ov.s == null) { pre = ctxW.pre.map(w => w.s).join(' '); post = ctxW.post.map(w => w.s).join(' '); tms = ctxW.times; }
      const lines = [[pre, 0.52], [acc, 1], [post, 0.95]].filter(x => x[0]);   // measured from her reference: small line 0.52, the one after 0.95 of the big word
      const f = faceOut(t); const room = { l: f.x - 70, r: W - (f.x + f.w) - 70 }; const right = room.r >= room.l;
      // not enough room beside her face (9:16 with her face central): the block goes centred under her chin instead,
      // never past the frame edge (it used to keep a 260 px minimum and ran off the right edge)
      const side = Math.max(room.l, room.r) - V(60, 48); const centred = side < V(360, 380);
      const avail = centred ? W - 2 * V(80, 60) : side; let big = o.size || V(120, 120);   // her reference: 120 px at 1080 (x-height 40 px of 706 -> 78 px em)
      const fontOf = (z) => `700 ${z}px "Helvetica Neue"`, lsOf = (z) => -0.025 * z;   // Helvetica Neue Bold, tight
      const wid = (z) => Math.max(...lines.map(([s_, k]) => tw(s_, fontOf(z * k), lsOf(z * k))));
      while (wid(big) > avail && big > 56) big -= 4;
      const blockW = wid(big); const x0 = centred ? (W - blockW) / 2 : right ? f.x + f.w + 70 : f.x - 70 - blockW;
      const blockH = big * (lines.length + 0.2);
      let y = centred ? Math.min(f.bottom + f.h * 0.55 + big * 0.2, H - V(260, 300) - blockH) : Math.max(V(90, 300), Math.min(f.top, H - V(420, 700)));
      if (centred && y < f.bottom - big) y = Math.max(V(90, 300), f.top - blockH - big * 0.3);   // no room under her chin: above her head
      const allW = str.replace(/~/g, '').split(/\s+/).filter(Boolean); let wi = 0;
      ctx.save(); const col = o.col || lk().kwCol || '#F7EED2';
      lines.forEach(([s_, k], li) => {
        const z = big * k, font = fontOf(z), ls = lsOf(z); y += li === 0 ? z * 0.9 : big * (lines[li - 1][1] === 1 ? 1.0 : 0.9);   // lines nearly touching, as in her reference
        const ws = s_.split(/\s+/); const lw = tw(s_, font, ls); let x = li === 2 ? x0 + Math.max(blockW, tw(lines.find(q => q[1] === 1)?.[0] || '', fontOf(big), lsOf(big))) - lw : x0;
        ws.forEach((w_, j) => { const tt = tms[Math.min(tms.length - 1, wi++)]; if (t >= tt - 0.04) { const p = clamp((t - tt + 0.04) / 0.1); ctx.globalAlpha = p; _txt(w_, x, y, font, col, 'left', 'alphabetic', ls); ctx.globalAlpha = 1; }
          x += tw(w_ + ' ', font, ls); });
      });
      ctx.restore();
      regBox(ov, x0, Math.max(0, y - big * 2.2), blockW, big * 2.4, { text: str, def: words, label: 'keyword (~word~ = the big one)' });
    });
  }

  /* ---------- L9 cutaway ---------- */
  /** o.film {scene | at, aspect, fit}, o.enter 'cut' (default) | 'push' (slides in with a directional blur, 6 frames) */
  T.cutaway = (s, o = {}) => {
    const sp = span(s, o); const film = o.film || {}; T.filmNeed(film);
    const sg = seg('cutaway', sp, o, (t) => {
      const push = o.enter === 'push' ? E.outCubic(prog(t, sp.t0, 0.2)) : 1;
      const r = { x: 0, y: 0, w: W, h: H };
      if (push >= 1) return T.drawFilm(t, r, film, sp);
      const dx = W * 0.35 * (1 - push), N = 6;   // directional blur: the frame drawn N times along its path
      for (let k = 0; k < N; k++) withA(1 / (k + 1), () => withT(dx + k * 18 * (1 - push), 0, 1, 0, () => T.drawFilm(t, r, film, sp)));
    }, null, { cover: true });
    if (o.enter === 'push') snd(o, 'swipe', sp.t0 + 0.08, -3);
    if (film.sound !== false) T.filmCues(sp, film);
    return sg;
  };

  /* ---------- L10 card ---------- */
  /** lines: one line <= 6 words (16:9) / <= 4 words per line, up to 3 lines (9:16; pass V([...], [...])). Hard cut in/out. */
  T.card = (s, lines, o = {}) => {
    const sp = span(s, { hold: 0.3, ...o }); lines = [].concat(lines); const n = nW(lines); const times = wordTimes(sp, n, o);
    if (o.start == null) sp.t0 = Math.max(sp.t0, times[0] - 0.15);   // the card cuts in on its first word (never an empty card)
    else sp.t0 = o.start;
    const sg = seg('card', sp, o, (t) => {
      const size = o.size || V(132, 150); const Lb = layoutKT({ lines, size, font: o.font || lk().font });
      const y = (H - Lb.h) / 2 + size * 0.78;
      KT(t, { lines, x: CX, align: 'center', y, size, font: o.font || lk().font, times, col: g.fg, acc: g.acc, lh: 0.92, dur: 0.18, fitW: W - 2 * V(110, 64), id: o.key, mark: T.markFor(lines, times) });
    }, null, { card: true, ground: o.ground || lk().cardGround });
    if (o.riser !== false && sp.t0 > 2.6 && !CUES.some(c => c.name === 'riser' && Math.abs(c.t - sp.t0) < 30)) snd(o, 'riser', sp.t0, -1);
    snd(o, 'hit', sp.t0, -2);
    return sg;
  };

  /* ---------- L11 corner cam ---------- */
  /** a film scene full frame (o.film), her in a circle. o.corner 'bl' (default: TH.look.corner, itself 'bl') | 'br' | 'tl' |
   *  'tr' | 'auto' (the corner whose circle covers the least film text / ink across the segment, measured once before the
   *  camera is set: it stays put for the whole segment), o.d (circle size px), o.face (how much of the circle her face fills,
   *  0..1, default 0.5) */
  const CORNERS = ['bl', 'br', 'tl', 'tr'];
  const cornerGeo = (pos, d) => {
    const x = pos[1] === 'r' ? W - 48 - d : V(48, 48);
    // 9:16 top: above the film's content band (a 9:16 film keeps y 0..330 empty), bottom: the band's foot (as before)
    const y = pos[0] === 't' ? V(48, Math.max(24, SAFE.contentTop - d - 18)) : V(H - 48 - d, SAFE.contentBottom - d);
    return { d, x, y, cx: x + d / 2, cy: y + d / 2 };
  };
  T.corners = [];   // auto corners to measure: {sp, film, d, pos, scores}
  T.fills = [];     // portrait film panels to zoom onto their content: {sp, film}
  /** for each portrait film panel: render the film across the segment (every ~0.4 s, 6-16 samples, quarter size), find the box
   *  holding everything that differs from the film's ground (its most common colour; faint grid lines stay under the
   *  threshold), pad it, and draw only that box (film.src, fitted whole into the panel). Never zooms past 2.4x the plain width. */
  T.resolveFills = async () => {
    if (!T.fills.length) return;
    for (const fi of T.fills) {
      const a = fi.film.aspect || ASPECT; const w = await FL.load(a); if (!FL.frames[a].win) FL.frames[a].win = w;
      const t0 = fi.sp.t0 + 0.1, t1 = Math.max(t0 + 0.01, fi.sp.t1 - 0.05); const n = Math.max(6, Math.min(60, Math.ceil((t1 - t0) / 0.33)));
      const smp = []; let cw = 0, ch = 0;
      for (let i = 0; i < n; i++) {
        const t = t0 + (t1 - t0) * (n === 1 ? 0.5 : i / (n - 1));
        w.FILMAPI.render(FL.time(t, fi.film, fi.sp)); const cv = w.FILMAPI.canvas; cw = cv.width; ch = cv.height;
        const k = 0.25, sw = Math.round(cw * k), sh = Math.round(ch * k);
        const oc = T._fillCv || (T._fillCv = document.createElement('canvas')); oc.width = sw; oc.height = sh; const ox = oc.getContext('2d', { willReadFrequently: true });
        ox.drawImage(cv, 0, 0, sw, sh); const img = ox.getImageData(0, 0, sw, sh).data;
        const hist = new Map(); for (let j = 0; j < img.length; j += 4 * 7) { const key = (img[j] >> 3) << 10 | (img[j + 1] >> 3) << 5 | (img[j + 2] >> 3); hist.set(key, (hist.get(key) || 0) + 1); }
        let best = 0, bk = 0; for (const [key, c] of hist) if (c > best) { best = c; bk = key; }
        const bg = [((bk >> 10) & 31) * 8 + 4, ((bk >> 5) & 31) * 8 + 4, (bk & 31) * 8 + 4];
        // per sample; a transition frame (wipe, flash: a quarter of the frame or more is ink) is skipped, it is not content
        let a0 = Infinity, b0 = Infinity, a1 = -Infinity, b1 = -Infinity, ink = 0;
        for (let y = 0; y < sh; y++) for (let x = 0; x < sw; x++) { const j = (y * sw + x) * 4;
          if (Math.max(Math.abs(img[j] - bg[0]), Math.abs(img[j + 1] - bg[1]), Math.abs(img[j + 2] - bg[2])) > 34) { ink++; if (x < a0) a0 = x; if (x > a1) a1 = x; if (y < b0) b0 = y; if (y > b1) b1 = y; } }
        smp.push({ t, b: ink && ink <= 0.25 * sw * sh ? [a0 * 4, b0 * 4, (a1 + 1) * 4, (b1 + 1) * 4] : null });
      }
      if (!smp.some(q => q.b)) continue;
      // the zoom follows what is on screen: at each sample, everything shown from 0.6 s before to 1.6 s after (so a line about to
      // appear is already inside the frame), padded; drawFilm eases between samples (a slow camera move, never a jump cut)
      const pad = 0.045 * cw, minW = cw / 2.4; let needMax = 0;
      const sideV = fi.side === 'top' || fi.side === 'bottom'; const sz0 = fi.o.size || H / 2, lb = fi.side === 'top' ? Math.max(0, T.labelBottom()) : 0, top = lb ? lb + 16 : 0;
      const keys = smp.map((q) => { let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
        for (const p of smp) if (p.b && p.t >= q.t - 0.6 && p.t <= q.t + 1.6) { x0 = Math.min(x0, p.b[0]); y0 = Math.min(y0, p.b[1]); x1 = Math.max(x1, p.b[2]); y1 = Math.max(y1, p.b[3]); }
        if (!(x1 > x0)) return null;
        x0 -= pad; x1 += pad; y0 -= pad; y1 += pad; if (x1 - x0 < minW) { const c = (x0 + x1) / 2; x0 = c - minW / 2; x1 = c + minW / 2; }
        x0 = Math.max(0, x0); y0 = Math.max(0, y0); x1 = Math.min(cw, x1); y1 = Math.min(ch, y1);
        if (sideV) needMax = Math.max(needMax, top + (y1 - y0) * Math.min(2.4, W * 0.94 / (x1 - x0)));
        return { t: q.t, src: [x0, y0, x1 - x0, y1 - y0] }; });
      // fill gaps (transition samples) from the neighbours
      for (let i = 0; i < keys.length; i++) if (!keys[i]) keys[i] = keys.slice(i).find(Boolean) || keys.slice(0, i).reverse().find(Boolean);
      // smooth: each box is the average of its neighbours (+-2 samples), so the zoom glides
      fi.film.srcAt = keys.map((q, i) => { const nb = keys.slice(Math.max(0, i - 2), i + 3); return { t: q.t, src: [0, 1, 2, 3].map(j => nb.reduce((s_, z) => s_ + z.src[j], 0) / nb.length) }; });
      // a tall graphic in a short panel stays small: the panel grows (up to 1300 of 1920, her picture keeps >= 620 px)
      if (sideV && needMax > sz0) fi.o.size = Math.round(Math.min(1300, needMax));
    }
  };
  /** the measured content box at moment time t (eased between samples) */
  const srcAtT = (f, t) => { const a = f.srcAt; if (t <= a[0].t) return a[0].src; if (t >= a[a.length - 1].t) return a[a.length - 1].src;
    let i = 1; while (a[i].t < t) i++; const p = (t - a[i - 1].t) / (a[i].t - a[i - 1].t), e = p * p * (3 - 2 * p);
    return a[i].src.map((v, j) => a[i - 1].src[j] + (v - a[i - 1].src[j]) * e); };
  T.corner = (s, o = {}) => {
    const sp = span(s, o); const film = o.film || {}; T.filmNeed(film);
    const want = o.corner || lk().corner || 'bl'; if (want !== 'auto' && !CORNERS.includes(want)) throw new Error(`TH.corner: corner "${want}" (use bl, br, tl, tr or auto)`);
    const d0 = () => o.d || V(H * 0.2, W * 0.28);
    const ac = want === 'auto' ? { sp, film, d: d0(), pos: 'bl', scores: null } : null; if (ac) T.corners.push(ac);
    const geo = () => cornerGeo(ac ? ac.pos : want, d0());
    const sg = seg('corner', sp, o, (t) => {
      const q = geo(); const r = q.d / 2 * clamp(MOTION.spring(t - sp.t0 - 0.12, 0.8, 3.2), 0, 1.2);
      ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W, H); if (r > 0.5) ctx.arc(q.cx, q.cy, r, 0, Math.PI * 2, true); ctx.clip('evenodd');
      T.drawFilm(t, { x: 0, y: 0, w: W, h: H }, film, sp); ctx.restore();
      if (r > 0.5) { ctx.save(); ctx.beginPath(); ctx.arc(q.cx, q.cy, r, 0, Math.PI * 2); ctx.strokeStyle = o.ring || lk().ring; ctx.lineWidth = lk().ringPx; ctx.stroke(); ctx.restore(); }
      regBox({ id: SCENE_ID + '/@her circle', edited: false, hide: false }, q.x, q.y, q.d, q.d, { kind: 'box', label: 'her circle (size and corner are set in the script)' });
    }, () => { const q = geo(); CAM(sp.t0, { box: [q.x, q.y, q.d, q.d], face: o.face || 0.5, fx: 0.5, fy: 0.46 }); }, { cover: true });
    if (ac) sg.auto = ac;
    snd(o, 'pop', sp.t0 + 0.15, -4);
    if (film.sound !== false) T.filmCues(sp, film);
    return sg;
  };
  /** 'auto' corners: render the film under the segment (every ~0.5 s, 6-24 samples, at half size), count the pixels in each
   *  candidate circle's box (+24 px) that differ from the film's ground (the most common colour of the frame), pick the
   *  emptiest. 'bl' stays unless another corner is emptier by more than 0.3 % of the box. Runs once, before the cameras. */
  T.resolveCorners = async () => {
    if (!T.corners.length) return;
    const k = 0.5, cw = Math.round(W * k), ch = Math.round(H * k);
    const oc = document.createElement('canvas'); oc.width = cw; oc.height = ch; const ox = oc.getContext('2d', { willReadFrequently: true });
    for (const ac of T.corners) {
      const a = ac.film.aspect || ASPECT; const w = await FL.load(a); if (!FL.frames[a].win) FL.frames[a].win = w;
      const t0 = ac.sp.t0 + 0.3, t1 = Math.max(t0 + 0.01, ac.sp.t1 - 0.1); const n = Math.max(6, Math.min(24, Math.ceil((t1 - t0) / 0.5)));
      const sum = { bl: 0, br: 0, tl: 0, tr: 0 };
      for (let i = 0; i < n; i++) {
        const t = t0 + (t1 - t0) * (n === 1 ? 0.5 : i / (n - 1));
        w.FILMAPI.render(FL.time(t, ac.film, ac.sp)); const cv = w.FILMAPI.canvas; const p = filmPlace(cv, { x: 0, y: 0, w: W, h: H }, ac.film);
        ox.setTransform(1, 0, 0, 1, 0, 0); ox.clearRect(0, 0, cw, ch); ox.setTransform(k, 0, 0, k, 0, 0);
        if (p.fit === 'contain') { const px = cv.getContext('2d').getImageData(1, 1, 1, 1).data; ox.fillStyle = `rgb(${px[0]},${px[1]},${px[2]})`; ox.fillRect(0, 0, W, H); }
        ox.drawImage(cv, p.src[0], p.src[1], p.src[2], p.src[3], p.dx, p.dy, p.dw, p.dh);
        const img = ox.getImageData(0, 0, cw, ch).data;
        const hist = new Map(); for (let j = 0; j < img.length; j += 4 * 13) { const key = (img[j] >> 3) << 10 | (img[j + 1] >> 3) << 5 | (img[j + 2] >> 3); hist.set(key, (hist.get(key) || 0) + 1); }
        let best = 0, bk = 0; for (const [key, c] of hist) if (c > best) { best = c; bk = key; }
        const bg = [((bk >> 10) & 31) * 8 + 4, ((bk >> 5) & 31) * 8 + 4, (bk & 31) * 8 + 4];
        for (const pos of CORNERS) {
          const q = cornerGeo(pos, ac.d), m = 24;
          const x0 = Math.max(0, Math.floor((q.x - m) * k)), y0 = Math.max(0, Math.floor((q.y - m) * k)), x1 = Math.min(cw, Math.ceil((q.x + q.d + m) * k)), y1 = Math.min(ch, Math.ceil((q.y + q.d + m) * k));
          let ink = 0, tot = 0;
          for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) { const j = (y * cw + x) * 4; tot++;
            if (Math.max(Math.abs(img[j] - bg[0]), Math.abs(img[j + 1] - bg[1]), Math.abs(img[j + 2] - bg[2])) > 28) ink++; }
          sum[pos] += tot ? ink / tot / n : 0;
        }
      }
      let pick = 'bl'; for (const pos of CORNERS) if (sum[pos] < sum[pick] - 0.003) pick = pos;
      if (pick !== 'bl') { let lo = pick; for (const pos of CORNERS) if (sum[pos] < sum[lo]) lo = pos; pick = lo; }
      ac.pos = pick; ac.scores = Object.fromEntries(CORNERS.map(c => [c, +sum[c].toFixed(4)]));
    }
  };
  /** the auto corners' picks (for checks: composite.mjs meta) */
  T.cornerPicks = () => T.corners.map(ac => ({ t0: +ac.sp.t0.toFixed(2), t1: +ac.sp.t1.toFixed(2), pos: ac.pos, scores: ac.scores }));

  /* ---------- L12 highlighter + L13 glitch ---------- */
  /** at (time, or a word she says inside span), word (as displayed): an accent block wipes in behind it (5-6 frames) */
  T.highlight = (at, word, o = {}) => { T.used = true; const t = typeof at === 'number' ? at : at.t; T.hl.push({ t, w: norm(word), col: o.col || lk().acc, fg: o.fg || C.onBlue }); snd(o, 'mark', t, -6); };
  T.markFor = (lines, times) => {
    if (!T.hl.length) return undefined; const words = lines.flatMap(l => parseLine(l)); const idx = [], at = [];
    words.forEach((w, i) => { if (w.style === '~') return; const h = T.hl.find(x => x.w === norm(w.s) && Math.abs(x.t - times[Math.min(i, times.length - 1)]) < 1.2); if (h) { idx.push(i); at.push(h.t); } });
    if (!idx.length) return undefined; const h0 = T.hl.find(x => x.w === norm(words[idx[0]].s));
    return { idx, at, col: h0.col, fg: h0.fg };
  };
  /** at: time (or phrase). o.text: a word shown big with the split (held o.hold s, default 0.8); without text the graphics
   *  on screen split for 2 frames. Max one a minute (her rule). */
  T.glitch = (at, o = {}) => {
    T.used = true; const t0 = typeof at === 'number' ? at : at.t; T.glitches.push({ t0, frames: o.frames || 2, text: o.text || null, hold: o.hold || 0.8, o });
    if (o.text) layer((t) => { if (t < t0 || t >= t0 + (o.hold || 0.8)) return; SCENE_ID = o.id || 'glitch-' + t0.toFixed(1);
      const size = o.size || V(220, 170); txt(o.text, CX, o.y || V(H * 0.42, H * 0.34), lk().disp(size), o.col || lk().fg, 'center', 'alphabetic', size * lk().dispLS, o.key); });
    snd(o, 'glitch', t0, -2);
  };
  function glitchPost(t) {
    const gl = T.glitches.find(x => { const f = Math.floor((t - x.t0) * FOOT.fps + 1e-6); return f >= 0 && (f < x.frames || (x.text && f >= Math.round(x.hold * FOOT.fps * 0.55) && f < Math.round(x.hold * FOOT.fps * 0.55) + 1)); });
    if (!gl) return;
    const c = ctx.canvas, w = c.width, h = c.height; const src = ctx.getImageData(0, 0, w, h); const out = ctx.createImageData(w, h); const s = src.data, d = out.data;
    const sh = Math.round(14 * w / 1920), band = Math.floor(h * (0.3 + 0.4 * hash(gl.t0 * 7))), bh = Math.round(h * 0.08);
    for (let y = 0; y < h; y++) { const off = y >= band && y < band + bh ? sh * 2 : 0; for (let x = 0; x < w; x++) { const i = (y * w + x) * 4, xr = Math.min(w - 1, x + sh + off), xb = Math.max(0, x - sh - off);
      const ir = (y * w + xr) * 4, ib = (y * w + xb) * 4; d[i] = s[ir]; d[i + 1] = s[i + 1]; d[i + 2] = s[ib + 2]; d[i + 3] = Math.max(s[ir + 3], s[i + 3], s[ib + 3]); } }
    ctx.putImageData(out, 0, 0);
  }

  /* ---------- person matte (L2, L6) ---------- */
  // MATTE: her silhouette for the current frame, white = her, covering the whole source frame. Export: composite.mjs passes
  // each needed frame (grey bytes, from talking-head/build/matte/, made by studio/tools/matte.py). Editor: the preview
  // footage carries it in a band under the picture. No matte yet (still being made): the graphics draw without the cut.
  const M = { cv: null, ok: false, feather: 1.6, tint: null, tintCol: null, need: T.need };
  T.matte = M;
  T.needMatte = (t0, t1) => { T.used = true; T.need.push([t0, t1]); };
  T.matteAt = (t) => T.need.some(([a, b]) => t >= a - 1 / 60 && t < b);
  function matteCanvas(w, h) { if (!M.cv || M.cv.width !== w || M.cv.height !== h) { M.cv = document.createElement('canvas'); M.cv.width = w; M.cv.height = h; } return M.cv; }
  /** export: grey bytes (base64 or Uint8Array), w x h */
  T.setMatteGray = (bytes, w, h) => {
    const b = typeof bytes === 'string' ? Uint8Array.from(atob(bytes), c => c.charCodeAt(0)) : bytes; const cv = matteCanvas(w, h); const c2 = cv.getContext('2d');
    const im = c2.createImageData(w, h); const d = im.data; for (let i = 0, j = 0; i < b.length; i++, j += 4) { d[j] = d[j + 1] = d[j + 2] = 255; d[j + 3] = b[i]; }
    c2.putImageData(im, 0, 0); M.ok = true; M.tintCol = null;
  };
  /** editor: the matte band of the preview video (sx, sy, sw, sh in video pixels) */
  T.setMatteFrom = (img, sx, sy, sw, sh, w = 480, h = 270) => {
    const cv = matteCanvas(w, h); const c2 = cv.getContext('2d', { willReadFrequently: true }); c2.globalCompositeOperation = 'copy'; c2.drawImage(img, sx, sy, sw, sh, 0, 0, w, h);
    const im = c2.getImageData(0, 0, w, h); const d = im.data; for (let j = 0; j < d.length; j += 4) { d[j + 3] = d[j]; d[j] = d[j + 1] = d[j + 2] = 255; }
    c2.putImageData(im, 0, 0); M.ok = true; M.tintCol = null;
  };
  T.clearMatte = () => { M.ok = false; };
  /** where the matte (the whole source frame) lands in layout px for the frame's camera, and the picture's box */
  function matteRect(t) { const cam = camAt(t); const [x0, y0] = srcToOut(cam, 0, 0), [x1, y1] = srcToOut(cam, FOOT.src[0], FOOT.src[1]); return { r: [x0, y0, x1 - x0, y1 - y0], box: cam.boxed ? cam.box : [0, 0, W, H] }; }
  function layerCtx() {
    if (!T.layer || T.layer.width !== CW || T.layer.height !== CH) { T.layer = document.createElement('canvas'); T.layer.width = CW; T.layer.height = CH; }
    const lc = T.layer.getContext('2d'); lc.setTransform(1, 0, 0, 1, 0, 0); lc.globalAlpha = 1; lc.globalCompositeOperation = 'source-over'; lc.filter = 'none'; lc.clearRect(0, 0, CW, CH); return lc;
  }
  /** draw fn on a layer, cut her out of it, lay it down: what fn draws sits BEHIND her */
  function onLayer(fn, after) {
    const main = ctx; const lc = layerCtx(); lc.setTransform(main.getTransform()); lc.globalAlpha = main.globalAlpha;
    setCtx(lc); try { fn(); } finally { setCtx(main); }
    lc.save(); lc.globalAlpha = 1; after(lc); lc.restore();
    main.save(); main.setTransform(1, 0, 0, 1, 0, 0); main.globalAlpha = 1; main.filter = 'none'; main.drawImage(T.layer, 0, 0); main.restore();
  }
  function punch(lc, t) {
    if (!M.ok || !M.cv) return; const { r, box } = matteRect(t);
    lc.setTransform(...BASE); lc.beginPath(); lc.rect(...box); lc.clip(); lc.globalCompositeOperation = 'destination-out';
    const k = r[2] / M.cv.width; lc.filter = `blur(${(M.feather * Math.max(1, k / 2.5)).toFixed(2)}px)`; lc.drawImage(M.cv, ...r); lc.filter = 'none';
  }
  T.behindHer = (t, fn) => onLayer(fn, (lc) => punch(lc, t));
  function tinted(col) {
    if (M.tintCol === col && M.tint) return M.tint; const c = M.tint && M.tint.width === M.cv.width && M.tint.height === M.cv.height ? M.tint : document.createElement('canvas'); c.width = M.cv.width; c.height = M.cv.height;
    const x = c.getContext('2d'); x.globalCompositeOperation = 'copy'; x.drawImage(M.cv, 0, 0); x.globalCompositeOperation = 'source-in'; x.fillStyle = col; x.fillRect(0, 0, c.width, c.height); M.tint = c; M.tintCol = col; return c;
  }
  /** L6: a flat ground over everything but her; o.under() draws between the ground and her; a light outline around her */
  T.cutout = (t, o) => onLayer(() => {
    rect(-10, -10, W + 20, H + 20, o.ground); if (o.grid) grid(g.grid);
    if (o.under) o.under();
    if (M.ok && M.cv && o.outlinePx > 0) { const { r, box } = matteRect(t); const tc = tinted(o.outline); ctx.save(); ctx.beginPath(); ctx.rect(...box); ctx.clip();
      const R = o.outlinePx; for (let k = 0; k < 16; k++) { const a = k / 16 * Math.PI * 2; ctx.drawImage(tc, r[0] + Math.cos(a) * R, r[1] + Math.sin(a) * R, r[2], r[3]); }
      ctx.drawImage(tc, r[0], r[1], r[2], r[3]); ctx.restore(); }
  }, (lc) => punch(lc, t));
  /** output frames that need her matte: [[frame, source frame]] (composite.mjs feeds those) */
  T.matteFrames = (f0, f1) => { const out = []; if (!T.need.length) return out; for (let f = f0; f < f1; f++) { const t = f / FOOT.fps; if (T.matteAt(t)) out.push([f, Math.round(outToRaw(Math.min(t, FOOT.dur - 1e-4)) * FOOT.fps)]); } return out; };

  /* ---------- the project's film, inside the moment ---------- */
  const FL = { slug: null, frames: {}, words: null, pairs: null, scenes: null, cues: null, man: null, need: new Set() };
  T.FL = FL;   // (read-only, for composite.mjs check insert-sync)
  T.film = FL;
  T.seg = seg; T.span = span; T.snd = snd; T.wordTimes = wordTimes; T.timeOf = timeOf;   // (for runtime/teaser.js)
  /** load the film in a hidden frame for an aspect (the film runtime, its edits, its light / dark choices) */
  FL.load = (aspect) => {
    if (FL.frames[aspect]) return FL.frames[aspect].ready;
    const fr = document.createElement('iframe'); fr.style.cssText = 'position:fixed;left:-10000px;top:0;width:200px;height:200px;border:0;visibility:hidden'; fr.setAttribute('aria-hidden', 'true');
    fr.src = `/render/${FL.slug}?aspect=${aspect}&captions=0&edits=1&blur=0`;
    const ready = new Promise((res, rej) => { const t0 = Date.now(); const poll = () => { const w = fr.contentWindow; if (w && w.READY) { if (w.BUILD_ERROR) return rej(new Error('film: ' + w.BUILD_ERROR)); return res(w); } if (Date.now() - t0 > 90000) return rej(new Error('film did not load: ' + FL.slug)); setTimeout(poll, 50); }; fr.onload = poll; });
    FL.frames[aspect] = { fr, ready }; document.body.appendChild(fr); return ready;
  };
  T.filmNeed = (f) => { T.used = true; if (!FL.slug) throw new Error('TH: this moment uses a film scene, but talking-head.json has no "film": "<slug>"'); FL.need.add(f.aspect || ASPECT); };
  /** film time for moment time t: her same words matched in both timelines (o.at: a fixed film time at the span start;
   *  o.scene: held inside that film scene) */
  FL.time = (t, f, sp) => {
    let ft;
    if (f.at != null) ft = f.at + (t - sp.t0);
    else {
      const P_ = FL.pairs || []; let lo = 0, hi = P_.length - 1, k = -1; while (lo <= hi) { const m = (lo + hi) >> 1; if (P_[m][0] <= t) { k = m; lo = m + 1; } else hi = m - 1; }
      if (k < 0) ft = P_.length ? P_[0][1] - (P_[0][0] - t) : t; else { ft = P_[k][1] + (t - P_[k][0]); if (k + 1 < P_.length) ft = Math.min(ft, P_[k + 1][1] - 1 / 60); }
    }
    if (f.scene) { const s = FL.scenes.find(x => x.id === f.scene); if (!s) throw new Error('TH: no film scene "' + f.scene + '"'); ft = clamp(ft, s.start + 0.001, s.end - 1 / 30); }
    return Math.max(0, ft + (f.offset || 0));
  };
  /** match her words in the moment (output time) and the film (film time): longest common subsequence */
  function align(mw, fw) {
    const n = mw.length, m = fw.length; if (!n || !m) return [];
    const dp = new Uint16Array((n + 1) * (m + 1)); const ix = (i, j) => i * (m + 1) + j;
    for (let i = n - 1; i >= 0; i--) for (let j = m - 1; j >= 0; j--) dp[ix(i, j)] = mw[i].n === fw[j].n && mw[i].n ? dp[ix(i + 1, j + 1)] + 1 : Math.max(dp[ix(i + 1, j)], dp[ix(i, j + 1)]);
    const out = []; let i = 0, j = 0; while (i < n && j < m) { if (mw[i].n === fw[j].n && mw[i].n) { out.push([mw[i].t, fw[j].t]); i++; j++; } else if (dp[ix(i + 1, j)] >= dp[ix(i, j + 1)]) i++; else j++; }
    return out;
  }
  FL.init = async (slug, aspect) => {
    FL.slug = slug; const w = await FL.load(aspect);
    const A = w.FILMAPI; FL.words = A.words().map(x => ({ t: x.t, n: x.n })); FL.scenes = A.meta().SCENES; FL.cues = A.cues().map(c => ({ ...c })); FL.man = A.man();
    // a moment's words are a stretch of the same speech: align against the film words around it (fast, and robust to repeats)
    FL.pairs = align(WORDS.map(x => ({ t: x.t, n: x.n })), FL.words);
  };
  /** where the film canvas cv lands in rect r (drawFilm, and the auto corner's measuring) */
  function filmPlace(cv, r, f) {
    const cw = cv.width, ch = cv.height;
    let src = [0, 0, cw, ch]; const portrait = ch > cw; let fit = f.fit || (portrait && r.w > r.h * 0.75 ? 'safe' : 'cover');
    if (f.src) { src = f.src; fit = 'contain'; }   // a measured content box (T.resolveFills): all of it, as big as the rect allows
    if (fit === 'safe' && !f.src) { src = [0, 330 * ch / 1920, cw, 1150 * ch / 1920];   // cover, unless that cuts > 4 % off the content band
      const sc = Math.max(r.w / src[2], r.h / src[3]); fit = (src[3] - r.h / sc) > 0.04 * src[3] || (src[2] - r.w / sc) > 0.04 * src[2] ? 'contain' : 'cover'; }
    const s = fit === 'contain' ? Math.min(r.w / src[2], r.h / src[3]) : Math.max(r.w / src[2], r.h / src[3]);
    const dw = src[2] * s, dh = src[3] * s; const fx = (f.focus || [0.5, 0.5])[0], fy = (f.focus || [0.5, 0.5])[1];
    const dx = r.x + (r.w - dw) * fx, dy = r.y + (r.h - dh) * fy;
    return { src, fit, dx, dy, dw, dh };
  }
  /** draw the film at moment time t into rect r {x, y, w, h}. f.fit: 'cover' (fill, crop), 'contain' (whole frame on the
   *  film's ground), 'safe' (a portrait film's content area, 9:16 y 330..1480, filling r); default: cover, or safe for a
   *  portrait film in a wide rect. f.focus [0..1, 0..1]: what stays in view when cropping (default centre). */
  T.drawFilm = (t, r, f = {}, sp) => {
    const a = f.aspect || ASPECT; const fr = FL.frames[a]; const w = fr && fr.win; if (!w) { rect(r.x, r.y, r.w, r.h, g.bg); return; }
    w.FILMAPI.render(FL.time(t, f, sp)); const cv = w.FILMAPI.canvas;
    const { src, fit, dx, dy, dw, dh } = filmPlace(cv, r, f.srcAt ? { ...f, src: srcAtT(f, t) } : f);
    if (fit === 'contain') { const px = cv.getContext('2d').getImageData(1, 1, 1, 1).data; rect(r.x, r.y, r.w, r.h, `rgb(${px[0]},${px[1]},${px[2]})`); }
    ctx.save(); ctx.beginPath(); ctx.rect(r.x, r.y, r.w, r.h); ctx.clip(); ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(cv, src[0], src[1], src[2], src[3], dx, dy, dw, dh); ctx.restore();
  };
  /** the film's own sound effects for the stretch shown (mapped back onto the moment's time; role "film:<role>") */
  T.filmCues = (sp, f) => {
    if (!FL.cues) return; const ft0 = FL.time(sp.t0 + 0.05, f, sp), ft1 = FL.time(sp.t1 - 0.05, f, sp);
    for (const c of FL.cues) if (c.t >= ft0 && c.t < ft1) { const tm = sp.t0 + 0.05 + (c.t - ft0); if (tm < sp.t1) CUES.push({ ...c, name: 'film:' + c.name, t: +tm.toFixed(3) }); }
  };

  /* ---------- face + graphic layouts L14-L19 (2026-10-26, her note: "not only the circle") ----------
   * Her picture sits in a camera box (her footage cropped + scaled, never flipped, her face never cut); the graphic takes
   * the rest. The box is a draggable / resizable element in the moment editor (edit key "<segment id>/@her", per frame size;
   * the camera follows at once through TH.recam()). Every layout works in 16:9 and 9:16. The graphic (gfx) is one of:
   *   o.film {...}  her film's scene (as L5)            o.img 'key' + o.credit 'source'  a real screenshot, top-aligned
   *   o.draw(t, r)  anything drawn with the house API    o.card {kicker, lines, at, foot}  a flat card with her own words
   * Shared options: o.ground (G key of the frame's ground, default the look's), o.panel (G key of the card, default
   * TH.look.panel || 'card'), o.sound: false. */
  Object.assign(LABEL, { split: 'L14 uneven split', tile: 'L15 window tile', page: 'L16 her inside the page', presenter: 'L17 presenter cut-out', room: 'L18 make room', ots: 'L19 over-the-shoulder window' });
  T.label = (k) => LABEL[k];
  T.FACE_GFX = ['half', 'sticker', 'corner', 'split', 'tile', 'page', 'presenter', 'room', 'ots'];   // (layout-variety check: the face + graphic layouts)
  const herKey = (id) => id + '/@her';
  function herEdit(id) { const e = EDIT.data.t[herKey(id)]; const p = e && e.pos && e.pos[LAYOUT]; return { dx: (p && p.dx) || 0, dy: (p && p.dy) || 0, k: (p && p.k) || 1, on: !!e }; }
  /** a box as she edited it (moved by dx / dy, resized by k around its centre) */
  function herBox(id, b) { const e = herEdit(id); if (!e.dx && !e.dy && e.k === 1) return b; const w = b[2] * e.k, h = b[3] * e.k; return [b[0] + b[2] / 2 - w / 2 + e.dx, b[1] + b[3] / 2 - h / 2 + e.dy, w, h]; }
  /** register her box for the editor (drag to move, corner handles / slider to resize). b = the box as drawn (edits included) */
  function regHer(id, b, label) { const e = herEdit(id); if (!EL.rec) return;
    // the editor adds its drag to the stored move: report the box WITHOUT her move (it is drawn with it: translate like moved())
    ctx.save(); ctx.translate(e.dx, e.dy); regBox({ id: herKey(id), edited: e.on, hide: false }, b[0] - e.dx, b[1] - e.dy, b[2], b[3], { kind: 'box', label: label || 'her picture (drag to move, corners to resize)', sk: e.k }); ctx.restore(); }
  const camBox = (t) => { const c = camAt(t); return c.boxed ? c.box : [0, 0, W, H]; };
  const panelG = (o) => G[o.panel || lk().panel || 'card'] || G.card;
  /** the graphic inside rect r {x, y, w, h} */
  function gfx(t, r, o, sp) {
    if (o.film) return T.drawFilm(t, r, o.film, sp);
    if (o.draw) return o.draw(t, r);
    const g0 = g; g = panelG(o); rect(r.x, r.y, r.w, r.h, g.bg);
    ctx.save(); ctx.beginPath(); ctx.rect(r.x, r.y, r.w, r.h); ctx.clip();
    if (o.img && IMG[o.img]) shotImg(t, r, o, sp); else cardTxt(t, r, o, sp);
    ctx.restore(); g = g0;
  }
  /** a real screenshot: width-fitted inside a margin, top-aligned (a page reads from its top), o.scroll px over the span; the credit on a small plate */
  function shotImg(t, r, o, sp) {
    const im = IMG[o.img], m = o.margin != null ? o.margin : V(28, 24); const w = r.w - 2 * m, k = w / im.width, h = im.height * k;
    const sc = o.scroll ? E.inOutCubic(prog(t, sp.t0 + 0.6, Math.max(0.5, sp.t1 - sp.t0 - 1.2))) * Math.min(o.scroll, Math.max(0, h - (r.h - 2 * m))) : 0;
    grp('screenshot', r.x + m, r.y + m - sc, w, h, () => themeFixed(() => ctx.drawImage(im, r.x + m, r.y + m - sc, w, h)), { img: true });
    if (o.credit) { const z = V(28, 30), cw = monoW(o.credit, z) + z * 1.2; rect(r.x + m, r.y + r.h - m - z * 1.7, cw, z * 1.7, C.ink); mono(o.credit, r.x + m + z * 0.6, r.y + r.h - m - z * 0.55, z, C.paper, 'left', { key: 'credit' }); }
  }
  /** display words land on her next spoken words from t0 (one each), so a card is complete about as fast as she says it */
  function onWords(t0, n) { const ws = WORDS.filter(w => w.t >= t0 - 0.05).slice(0, n).map(w => w.t); while (ws.length < n) ws.push((ws.length ? ws[ws.length - 1] : t0) + 0.15); return ws; }
  /** a flat card with her own words (o.card: {kicker, lines, at: word she says to start typing, foot}) */
  function cardTxt(t, r, o, sp) {
    const c = o.card || {}; const pad = Math.max(V(48, 44), Math.min(r.w, r.h) * 0.07); let y = r.y + pad;
    if (c.kicker) { const z = V(30, 32); mono(c.kicker, r.x + pad, y + z * 0.8, z, g.mid, 'left', { key: 'kicker', maxW: r.w - 2 * pad }); y += z * 2.4; }
    const lines = [].concat(c.lines || []);
    if (lines.length) {   // the lines sit at the card's foot (an editorial poster: the kicker on top, the words at the bottom left)
      const footH = c.foot ? V(64, 70) : 0, avail = r.y + r.h - pad - footH - y;
      const size = c.size || Math.round(Math.min(V(128, 112), r.w * V(0.1, 0.115), avail / (lines.length * 1.0 + 0.25)));
      const t0 = c.at != null ? (timeOf(c.at, sp) ?? sp.t0 + 0.3) - 0.05 : sp.t0 + 0.3; const times = c.times || onWords(t0, nW(lines));
      const yl = r.y + r.h - pad - footH - size * 0.18 - (lines.length - 1) * size * 1.0;
      KT(t, { lines, x: r.x + pad, y: Math.max(y + size * 0.82, yl), size, font: c.font || lk().font, times, col: g.fg, acc: g.acc, lh: 1.0, dur: 0.22, fitW: r.w - 2 * pad, id: 'lines' });
    }
    if (c.foot) { const z = V(28, 30); mono(c.foot, r.x + pad, r.y + r.h - pad, z, g.mid, 'left', { key: 'foot', maxW: r.w - 2 * pad }); }
  }
  /** content rect of a portrait panel at the top of a short: below the top label */
  const underLabel = (r) => { if (!PORTRAIT) return r; const lb = T.labelBottom(); if (lb > 0 && r.y < lb + 20) { const d = lb + 20 - r.y; return { x: r.x, y: r.y + d, w: r.w, h: r.h - d }; } return r; };
  const ease = (t, t0, d, e = 'outQuint') => MOTION.ease(t, t0, d, e);
  const ruleCol = () => lk().rule || g.line || C.line;

  /* L14 uneven split: her strip (o.her share, default 36 % in 16:9, 42 % in 9:16) on o.side ('right' | 'left' in 16:9,
   * 'bottom' | 'top' in 9:16), the graphic the rest. The graphic slides in (o.enter s); o.rule: a hairline on the join. */
  function splitGeo(o) {
    const her = o.her || V(0.36, 0.42); const side = o.side || V('right', 'bottom');
    if (side === 'left' || side === 'right') { const hw = Math.round(W * her); return side === 'right' ? { her: [W - hw, 0, hw, H], gr: [0, 0, W - hw, H], side } : { her: [0, 0, hw, H], gr: [hw, 0, W - hw, H], side }; }
    const hh = Math.round(H * her); return side === 'bottom' ? { her: [0, H - hh, W, hh], gr: [0, 0, W, H - hh], side } : { her: [0, 0, W, hh], gr: [0, hh, W, H - hh], side };
  }
  /** draw the graphic panel of a split (rect gr, opened by e 0..1 from the side away from her) and place the captions */
  function splitPanel(t, sp, o, gr, side, e) {
    if (e <= 0.001) return;
    const r = side === 'right' ? [gr[0], 0, gr[2] * e, H] : side === 'left' ? [W - gr[2] * e, 0, gr[2] * e, H] : side === 'bottom' ? [0, 0, W, gr[3] * e] : [0, H - gr[3] * e, W, gr[3] * e];
    const g0 = g; g = G[o.ground || lk().ground] || G.paper; rect(...r, g.bg);
    ctx.save(); ctx.beginPath(); ctx.rect(...r); ctx.clip();
    // the content keeps its full-size layout and is revealed by the moving edge (it does not squash)
    const m = o.inset != null ? o.inset : V(40, 36); let full = { x: gr[0] + m, y: gr[1] + m, w: gr[2] - 2 * m, h: gr[3] - 2 * m };
    if (PORTRAIT && side === 'bottom') full = underLabel(full);
    if (PORTRAIT && side === 'bottom') full.h -= V(0, 150);   // 9:16: the captions sit at the panel's foot, never over the graphic
    gfx(t, full, o, sp);
    ctx.restore(); g = g0;
    if (o.rule) { ctx.fillStyle = ruleCol(); if (side === 'right') ctx.fillRect(r[0] + r[2] - 1, 0, 2, H); else if (side === 'left') ctx.fillRect(r[0] - 1, 0, 2, H); else if (side === 'bottom') ctx.fillRect(0, r[3] - 1, W, 2); else ctx.fillRect(0, r[1] - 1, W, 2); }
    if (!o.film && e > 0.98) FOOT.panelRect = { x: r[0], y: r[1], w: r[2], h: r[3] };
    if (PORTRAIT && e > 0.5) FOOT.capYNow = side === 'bottom' ? gr[3] - 82 : gr[1] + 82;
    if (!PORTRAIT && e > 0.5) { const hb = side === 'right' ? [gr[2], W] : [0, gr[0]]; FOOT.capX = [(hb[0] + hb[1]) / 2, (hb[1] - hb[0]) * 0.9]; }
  }
  T.split = (s, o = {}) => {
    const sp = span(s, o); const enter = o.enter == null ? 0.5 : o.enter; if (o.film) { o.film = { aspect: V('16x9', '9x16'), fit: 'safe', ...o.film }; T.filmNeed(o.film); }
    const sg = seg('split', sp, o, (t) => {
      const G_ = splitGeo(o); const e = enter ? ease(t, sp.t0, enter, 'inOutQuart') : 1;
      splitPanel(t, sp, o, G_.gr, G_.side, e);
      regHer(sg.id, camBox(t));
    }, () => { const G_ = splitGeo(o); CAM(sp.t0, { box: herBox(sg.id, G_.her), z: o.z || V(1, 1.15), fx: o.fx == null ? 0.5 : o.fx, fy: o.fy == null ? V(0.42, 0.44) : o.fy }); });
    snd(o, 'swipe', sp.t0 + enter * 0.4, -3);
    if (o.film && o.film.sound) T.filmCues(sp, o.film);
    return sg;
  };

  /* L15 window tile: the graphic full frame, her in a square-cornered tile (a video-call tile / a window) with a hairline edge.
   * o.at 'br' | 'bl' | 'tr' | 'tl' | [x, y, w, h]; o.w (tile width), o.ar (width / height, default 4:3 in 16:9, 4:5 in 9:16);
   * o.keys [{at: word | seconds, to: corner | [x, y, w, h], d: 0.6, resize: 8}]: the tile slides there (same size: a smooth
   * slide; a new size starts at once, or in `resize` steps). o.edge: the hairline colour, o.edgePx (default 3). */
  function tileGeo(pos, o) {
    if (Array.isArray(pos)) return pos;
    const w = o.w || V(560, 440), h = Math.round(w / (o.ar || V(4 / 3, 4 / 5))), m = V(56, 48);
    const top = PORTRAIT ? Math.max(T.labelBottom() + 28, SAFE.contentTop) : m, bottom = PORTRAIT ? SAFE.contentBottom - 30 : H - m;
    return [pos[1] === 'l' ? m : W - m - w, pos[0] === 't' ? top : bottom - h, w, h];
  }
  T.tile = (s, o = {}) => {
    const sp = span(s, o); if (o.film) { o.film = { aspect: V('16x9', '9x16'), ...o.film }; T.filmNeed(o.film); }
    const keys = (o.keys || []).map(k => ({ t: typeof k.at === 'number' ? k.at : mustTime(k.at, sp, 'tile') - 0.1, to: k.to, d: k.d == null ? 0.6 : k.d, resize: k.resize }));
    const sg = seg('tile', sp, o, (t) => {
      const b = camBox(t), px = o.edgePx || 3;
      ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W, H); ctx.rect(b[0], b[1], b[2], b[3]); ctx.clip('evenodd');
      if (o.film || o.draw || o.img) gfx(t, { x: 0, y: 0, w: W, h: H }, o, sp);
      else {   // a text card: the words take the biggest free area beside / above her window, clear of the captions
        rect(0, 0, W, H, panelG(o).bg); const yb = V(H - 230, SAFE.capTop - 20), m = 30;
        const cands = [{ x: 0, y: 0, w: b[0] - m, h: yb }, { x: b[0] + b[2] + m, y: 0, w: W - b[0] - b[2] - m, h: yb }, { x: 0, y: 0, w: W, h: b[1] - m }, { x: 0, y: b[1] + b[3] + m, w: W, h: yb - b[1] - b[3] - m }];
        const best = cands.filter(r => r.w > 200 && r.h > 200).sort((p, q) => q.w * Math.min(q.h, q.w) - p.w * Math.min(p.h, p.w))[0] || { x: 0, y: 0, w: W, h: yb };
        gfx(t, best, o, sp); }
      ctx.restore();
      ctx.fillStyle = o.edge || lk().ring || C.paper; ctx.fillRect(b[0] - px, b[1] - px, b[2] + 2 * px, px); ctx.fillRect(b[0] - px, b[1] + b[3], b[2] + 2 * px, px); ctx.fillRect(b[0] - px, b[1], px, b[3]); ctx.fillRect(b[0] + b[2], b[1], px, b[3]);
      if (!PORTRAIT) { const l = b[0] + b[2] / 2 < W / 2; const x0 = l ? b[0] + b[2] + 40 : 48, x1 = l ? W - 48 : b[0] - 40; FOOT.capX = [(x0 + x1) / 2, (x1 - x0) * 0.94]; }
      regHer(sg.id, b, 'her window (drag to move, corners to resize)');
    }, () => {
      const b0 = herBox(sg.id, tileGeo(o.at || V('br', 'br'), o)); CAM(sp.t0, { box: b0, face: o.face || 0.42, fx: 0.5, fy: 0.44 });
      let prev = b0; for (const k of keys) { const b = herBox(sg.id, tileGeo(k.to, { ...o, w: Array.isArray(k.to) ? k.to[2] : o.w })); CAM(k.t, { box: b, face: o.face || 0.42, fx: 0.5, fy: 0.44, d: k.d, ease: 'inOutQuart', resize: k.resize }); prev = b; }
    }, { cover: true });
    snd(o, 'pop', sp.t0 + 0.04, -4); for (const k of keys) snd(o, 'swipe', k.t + 0.1, -6);
    if (o.film && o.film.sound) T.filmCues(sp, o.film);
    return sg;
  };

  /* L16 her inside the page: a generic page (o.device 'browser' (default: a plain bar + address field, no brand) | 'none')
   * on the frame's ground; her picture is the page's lead image. o.kicker (mono line), o.title (headline, typed on her
   * words from o.titleAt), o.url (the address field's text, e.g. the real source's domain), o.below (a line under her picture).
   * The page rises in (0.5 s) and scrolls up slowly (o.scroll px). Everything is placed from her box (drag her: the page follows). */
  function pageGeo(o) {
    const cw = V(Math.round(W * 0.66), W - 80), x = (W - cw) / 2, pad = V(56, 40), bar = o.device === 'none' ? 0 : V(58, 64);
    const top = PORTRAIT ? Math.max(T.labelBottom() + 28, 300) : 60; const titleH = o.title ? V(172, 240) : 0, kick = o.kicker ? V(52, 60) : 0;
    const sw = cw - 2 * pad, sh = Math.min(Math.round(sw / (o.ar || V(16 / 9, 4 / 3))), (PORTRAIT ? SAFE.contentBottom : H - 40) - (top + bar + pad + kick + titleH));
    return { card: [x, top, cw], slot: [x + pad + (sw - sh * (o.ar || V(16 / 9, 4 / 3))) / 2, top + bar + pad + kick + titleH, sh * (o.ar || V(16 / 9, 4 / 3)), sh], pad, bar, kick, titleH };
  }
  T.page = (s, o = {}) => {
    const sp = span(s, o); const rise = V(140, 160), scroll = o.scroll == null ? V(36, 40) : o.scroll; const tIn = sp.t0, dIn = 0.5;
    const tT = o.titleAt != null ? mustTime(o.titleAt, sp, 'page') - 0.05 : sp.t0 + 0.35; const tl = [].concat(o.title || []); const times = tl.length ? (o.times || onWords(tT, nW(tl))) : [];
    const sg = seg('page', sp, o, (t) => {
      const Gm = pageGeo(o); const b = camBox(t); const dy = b[1] - Gm.slot[1], dx = b[0] - Gm.slot[0];   // the page follows her picture
      const g0 = g; const cx = Gm.card[0] + dx, cy = Gm.card[1] + dy, cw = Gm.card[2];
      ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W, H); ctx.rect(b[0], b[1], b[2], b[3]); ctx.clip('evenodd');   // (her picture shows through the hole)
      g = G[o.ground || lk().ground] || G.paper; rect(0, 0, W, H, g.bg); g = panelG(o);
      rect(cx, cy, cw, H + 400, g.bg);
      if (Gm.bar) { rect(cx, cy, cw, Gm.bar, g.panel || C.panel); const q = Gm.bar * 0.22; for (let i = 0; i < 3; i++) rect(cx + 24 + i * q * 2.2, cy + Gm.bar / 2 - q / 2, q, q, g.mid);
        const ax = cx + 24 + q * 7.5, aw = cw - (ax - cx) - 24; rect(ax, cy + Gm.bar * 0.2, aw, Gm.bar * 0.6, g.bg);
        if (o.url) mono(o.url, ax + 18, cy + Gm.bar * 0.5 + V(9, 10), V(24, 26), g.mid, 'left', { key: 'url', lower: true, fixed: true }); }
      let y = cy + Gm.bar + Gm.pad;
      if (o.kicker) { mono(o.kicker, cx + Gm.pad, y + V(24, 28), V(28, 30), g.acc, 'left', { key: 'kicker', maxW: cw - 2 * Gm.pad }); y += Gm.kick; }
      if (tl.length) KT(t, { lines: tl, x: cx + Gm.pad, y: y + V(58, 70), size: V(64, 72), font: 'body', weight: 800, upper: false, times, col: g.fg, acc: g.acc, lh: 1.08, dur: 0.2, fitW: cw - 2 * Gm.pad, id: 'title' });
      // under her picture: one line (o.below) and quiet text bars (the page goes on)
      let yb = b[1] + b[3] + V(40, 44);
      if (o.below) { txt(o.below, cx + Gm.pad, yb + 20, F.body(V(30, 34), 500), g.mid, 'left', 'alphabetic', 0, 'below'); yb += V(56, 64); }
      for (let i = 0; i < 8 && yb < H; i++, yb += V(34, 40)) rect(cx + Gm.pad, yb, (cw - 2 * Gm.pad) * (i % 3 === 2 ? 0.62 : 1), V(14, 16), g.line || C.line);
      ctx.restore(); g = g0;
      if (!PORTRAIT) FOOT.capX = [W / 2, Math.min(W * 0.8, cw * 0.95)];
      regHer(sg.id, b, 'her picture in the page (drag: the page follows)');
    }, () => {
      const Gm = pageGeo(o); const b = herBox(sg.id, Gm.slot); const ar = b[2] / b[3];
      const cam = { face: o.face || V(0.36, 0.38), fx: 0.5, fy: 0.42 };
      CAM(tIn, { ...cam, box: [b[0], b[1] + rise, b[2], b[3]] }); CAM(tIn + 0.02, { ...cam, box: b, d: dIn, ease: 'outQuint' });
      if (scroll && sp.t1 - sp.t0 > 1.4) CAM(tIn + dIn + 0.1, { ...cam, box: [b[0], b[1] - scroll, b[2], b[3]], d: sp.t1 - (tIn + dIn + 0.1), ease: 'sine' });
      void ar;
    }, { cover: true });
    snd(o, 'paper', sp.t0, -3); if (tl.length) snd(o, 'typeHit', times[0], -5);
    return sg;
  };

  /* L17 presenter cut-out: a full-frame graphic, her cut-out (her matte) standing at one side IN FRONT of it, bottom-anchored
   * (her whole recorded frame scaled down, so nothing of her is cropped but the frame's own bottom). o.side 'right' (default)
   * | 'left' (16:9; 9:16: she stands in the lower half, the graphic above), o.scale (her height share, 16:9 0.84, 9:16 0.5),
   * o.outlinePx (a light outline, default 0), o.gr [x, y, w, h] (the graphic's rect; default the side away from her). */
  function presGeo(o, t) {
    const f = faceRaw(outToRaw(Math.min(TOTAL - 0.01, t)), 2.0); const frel = f.cx / FOOT.src[0];
    const side = o.side || 'right', sc = o.scale || V(0.84, 0.5); const h = Math.round(H * sc), w = Math.round(h * FOOT.src[0] / FOOT.src[1]);
    const want = V(side === 'right' ? W * 0.79 : W * 0.21, W * 0.5); let x = Math.round(want - frel * w);
    x = side === 'right' ? Math.max(W - w, x) : Math.min(0, x); if (PORTRAIT) x = Math.min(0, Math.max(W - w, x));
    const her = [x, H - h, w, h];
    const gr = o.gr || V(side === 'right' ? [80, 80, Math.round(W * 0.56), H - 380] : [W - 80 - Math.round(W * 0.56), 80, Math.round(W * 0.56), H - 380], [40, 0, W - 80, H - h - 30]);
    return { her, gr };
  }
  T.presenter = (s, o = {}) => {
    const sp = span(s, o); T.needMatte(sp.t0, sp.t1); if (o.film) { o.film = { aspect: V('16x9', '9x16'), ...o.film }; T.filmNeed(o.film); }
    const slide = o.enter == null ? 0.55 : o.enter;
    const sg = seg('presenter', sp, o, (t) => {
      const Gm = presGeo(o, sp.t0 + 0.1); const ground = G[o.ground || lk().ground] || G.paper; const g0 = g; g = ground;
      const gp = ease(t, sp.t0, 0.45); let r = { x: Gm.gr[0], y: Gm.gr[1], w: Gm.gr[2], h: Gm.gr[3] }; r = underLabel(r);
      T.cutout(t, { ground: ground.bg, grid: o.grid == null ? false : o.grid, outline: o.outline || lk().outline, outlinePx: o.outlinePx || 0,
        under: () => withA(clamp(gp * 2), () => withT(0, (1 - gp) * 60, 1, 0, () => gfx(t, r, o, sp))) });
      g = g0;
      if (!PORTRAIT) FOOT.capX = [r.x + r.w / 2, r.w * 0.94];
      regHer(sg.id, camBox(t), 'her (drag to move, corners to resize)');
    }, () => { const Gm = presGeo(o, sp.t0 + 0.1); const b = herBox(sg.id, Gm.her); const off = V((o.side || 'right') === 'right' ? W * 0.3 : -W * 0.3, 0), offY = V(0, H * 0.25);
      CAM(sp.t0, { box: [b[0] + off, b[1] + offY, b[2], b[3]], z: 1 }); CAM(sp.t0 + 0.02, { box: b, z: 1, d: slide, ease: 'outQuint' }); }, { cover: true });
    snd(o, 'swipe', sp.t0 + 0.1, -3);
    if (o.film && o.film.sound) T.filmCues(sp, o.film);
    return sg;
  };

  /* L18 make room: she starts full frame; on o.at (a word she says, default 0.4 s in) she slides to her side (16:9: her whole
   * frame slides, nothing scales: smooth; 9:16: her picture shrinks into the lower strip in o.steps size steps) while the
   * graphic opens on the other side, ending as an L14 split (o.her, o.side as there). o.back: she takes the frame back at the end. */
  T.room = (s, o = {}) => {
    const sp = span(s, o); if (o.film) { o.film = { aspect: V('16x9', '9x16'), fit: 'safe', ...o.film }; T.filmNeed(o.film); }
    const tO = o.at != null ? (typeof o.at === 'number' ? o.at : mustTime(o.at, sp, 'room') - 0.15) : sp.t0 + 0.4, d = o.d || 0.65;
    const tB = o.back ? sp.t1 - d - 0.05 : null;
    const sg = seg('room', sp, o, (t) => {
      const G_ = splitGeo(o); let e = ease(t, tO, d, 'inOutQuart'); if (tB != null) e *= 1 - ease(t, tB, d, 'inOutQuart');
      splitPanel(t, sp, o, G_.gr, G_.side, e);
      if (e > 0.98) regHer(sg.id, camBox(t));
    }, () => {
      const G_ = splitGeo(o); const z0 = V(lk().talk.z[0], lk().talk.z[1]);
      if (!PORTRAIT) {   // slide her whole frame (same size: no scaling) so her face lands in the middle of her strip
        const f = faceRaw(outToRaw(Math.min(TOTAL - 0.01, tO + d)), 2.0); const frel = f.cx / FOOT.src[0];
        const hc = G_.her[0] + G_.her[2] / 2; const dx = Math.round(hc - frel * W);
        const b1 = herBox(sg.id, [dx, 0, W, H]);
        CAM(sp.t0, { box: [0, 0, W, H], z: 1 }); CAM(tO, { box: b1, z: 1, d, ease: 'inOutQuart' });
        if (tB != null) CAM(tB, { box: [0, 0, W, H], z: 1, d, ease: 'inOutQuart' });
      } else {
        const b1 = herBox(sg.id, G_.her); const st = o.steps || 8;
        CAM(sp.t0, { box: [0, 0, W, H], z: z0 }); CAM(tO, { box: b1, z: o.z || 1.15, fx: 0.5, fy: 0.44, d, ease: 'inOutQuart', resize: st });
        if (tB != null) CAM(tB, { box: [0, 0, W, H], z: z0, d, ease: 'inOutQuart', resize: st });
      }
    });
    snd(o, 'swipe', tO + d * 0.3, -3); if (tB != null) snd(o, 'swipe', tB + d * 0.3, -6);
    if (o.film && o.film.sound) T.filmCues(sp, o.film);
    return sg;
  };

  /* L19 over-the-shoulder window: she stays full frame (16:9: framed to one side), a square-cornered window with the graphic
   * opens beside her head, like a news presenter's box. o.side: where the WINDOW goes ('left' | 'right' | 'auto': the side
   * with more room; 9:16: above her, her picture moves down into a full-width box). o.w (window width), o.ar (w / h). */
  T.ots = (s, o = {}) => {
    const sp = span(s, o); if (o.film) { o.film = { aspect: V('16x9', '9x16'), ...o.film }; T.filmNeed(o.film); }
    let side = o.side || 'auto';
    if (side === 'auto' && !PORTRAIT) { const f = faceRaw(outToRaw(Math.min(TOTAL - 0.01, sp.t0 + 0.2)), 2.0); side = f.cx / FOOT.src[0] >= 0.5 ? 'left' : 'right'; }
    const geo = () => { if (PORTRAIT) { const top = Math.max(T.labelBottom() + 28, 300), w = o.w || W - 2 * 56, h = Math.round(w / (o.ar || 16 / 10)); return { win: [(W - w) / 2, top, w, h], her: [0, top + h + 36, W, H - (top + h + 36)] }; }
      const w = o.w || 720, h = Math.round(w / (o.ar || 4 / 3)); return { win: [side === 'left' ? 96 : W - 96 - w, o.y || 120, w, h], her: null }; };
    const sg = seg('ots', sp, o, (t) => {
      const q = geo(); const b = q.win; const p = ease(t, sp.t0 + 0.08, 0.42); if (p <= 0) return;
      const ww = b[2] * (0.6 + 0.4 * p), hh = b[3] * (0.6 + 0.4 * p); const ax = PORTRAIT ? b[0] + b[2] / 2 : side === 'left' ? b[0] + b[2] : b[0];   // grows out from the side nearest her
      const x = PORTRAIT ? ax - ww / 2 : side === 'left' ? ax - ww : ax, y = b[1] + (b[3] - hh) * (PORTRAIT ? 1 : 0.5);
      if (PORTRAIT) { const g0 = g; g = G[o.ground || lk().ground] || G.paper; rect(0, 0, W, q.her[1], g.bg); g = g0; }
      grp('window', b[0], b[1], b[2], b[3], () => withA(clamp(p * 3), () => {
        const px = o.edgePx || 3; ctx.fillStyle = o.edge || lk().ring || C.paper; ctx.fillRect(x - px, y - px, ww + 2 * px, hh + 2 * px);
        ctx.save(); ctx.translate(x, y); ctx.scale(ww / b[2], hh / b[3]); gfx(t, { x: 0, y: 0, w: b[2], h: b[3] }, o, sp); ctx.restore();
      }));
      if (PORTRAIT) regHer(sg.id, camBox(t));
    }, () => { const q = geo();
      if (q.her) CAM(sp.t0, { box: herBox(sg.id, q.her), z: o.z || 1.1, fx: 0.5, fy: 0.4 });
      else CAM(sp.t0, { z: o.z || 1.12, fx: o.fx != null ? o.fx : side === 'left' ? 0.64 : 0.36, fy: o.fy == null ? 0.5 : o.fy }); });
    snd(o, 'pop', sp.t0 + 0.1, -4);
    if (o.film && o.film.sound) T.filmCues(sp, o.film);
    return sg;
  };

  /* ---------- shorts framing (her note 2026-10-26: "my head is literally filling the whole screen") ----------
   * In 9:16 her picture used to always fill the frame: a 1215x2160 slice of her 16:9 shot. A framing shows a wider window of
   * her frame instead, full width, with the top label and the captions on flat bands of the video's ground (TH.look.band,
   * else the look's ground; no blur, no gradient). Default 'fill' (as before) for every project; set per short / project with
   * "frame9" in the moment or manifest, TH.look.frame9, per segment with o.win, or in the moment editor (edits "frame9", and
   * "frame9seg": {"<segment id>": name}). Layouts with their own box (L5, L6, L11, L14-L19) keep it. */
  T.FRAMES = {
    fill: { label: 'Fill the frame (as before)' },
    '4x5': { ar: 4 / 5, label: '4:5 window, captions on her' },
    '3x4': { ar: 3 / 4, label: '3:4 window, captions on her' },
    '1x1': { ar: 1, cap: 'band', label: 'Square window, captions under her' },
    '4x5band': { ar: 4 / 5, cap: 'band', label: '4:5 window, captions in the band under her' },
    wide: { z: 0.8, label: 'Full width, wider (a band at the bottom)' },
    // (2026-11-08, shorts format menu; new names only, nothing above changes) at: 'bottom' = picture on the frame's foot, y = fixed top
    wideLow: { ar: 1080 / 1536, at: 'bottom', label: 'Full width, band on top (captions there)' },
    '1x1top': { ar: 1, y: 300, cap: 'band', label: 'Square window high, big captions under her' },
    letterbox: { ar: 16 / 9, y: 640, cap: 'band', label: 'Letterbox: her whole 16:9 frame in a band' },
  };
  T.frameOn = () => !!(PORTRAIT && FOOT.m && FOOT.m.kind === 'short' && !visRect());
  T.frameName = (segId, o) => { if (!T.frameOn()) return 'fill'; const e = EDIT.data || {};
    const v = FOOT.frame9Q || (segId && e.frame9seg && e.frame9seg[segId]) || e.frame9 || (o && o.win) || FOOT.m.frame9 || FOOT.man.frame9 || lk().frame9 || 'fill';
    return T.FRAMES[v] ? v : 'fill'; };
  T.frameBox = (name) => { const f = T.FRAMES[name]; if (!f || !f.ar) return null; const h = Math.round(W / f.ar); const lb = T.labelBottom();
    let y = lb > 0 ? lb + 28 : Math.round((H - h) / 2); if (!f.cap) y = Math.max(y, Math.round((H - h) / 2));
    else y = Math.max(0, Math.min(y, H - 300 - h));   // captions under her: the band below keeps >= 300 px (a long label may then sit on her picture's top)
    if (f.at === 'bottom') y = H - h; else if (f.y != null) y = f.y;
    return [0, Math.min(y, H - h), W, h]; };
  function applyFrame(k, name) {
    if (!name || name === 'fill' || k.box || k.pad) return; const f = T.FRAMES[name];
    if (f.ar) { k.box = T.frameBox(name); if (k.fx == null) k.fx = 0.5; if (k.fy == null) k.fy = 0.42; }
    else if (f.z) { k.z = Math.max(0.5, k.z * f.z); k.pad = true; }
    k.win = name;
  }
  const bandCol = () => lk().band || (G[lk().ground] || G.ink).bg;
  /** FOOT.under (footage.js): flat ground where her picture is not (around a framed picture); captions in the band */
  function frameUnder(t) {
    const sc = SCENES[sceneIndex(t)]; if (!sc || (sc.card && t >= sc.start)) return;
    const cam = camAt(t); const fr = footRect(t); let x0 = Math.max(0, fr.x), y0 = Math.max(0, fr.y), x1 = Math.min(W, fr.x + fr.w), y1 = Math.min(H, fr.y + fr.h);
    if (cam.boxed) { const b = cam.box; x0 = Math.max(x0, b[0]); y0 = Math.max(y0, b[1]); x1 = Math.min(x1, b[0] + b[2]); y1 = Math.min(y1, b[1] + b[3]); }
    if (x0 <= 0.5 && y0 <= 0.5 && x1 >= W - 0.5 && y1 >= H - 0.5) return;
    const c = bandCol(); rect(0, 0, W, y0, c); rect(0, y1, W, H - y1, c); rect(0, y0, x0, y1 - y0, c); rect(x1, y0, W - x1, y1 - y0, c);
    const nm = sc.win; if (nm && T.FRAMES[nm] && T.FRAMES[nm].cap === 'band' && cam.boxed && y1 <= H - 280) FOOT.capYNow = Math.round(Math.min(H - 190, y1 + 120));
  }
  T.frameUnder = frameUnder;
  /** her face height as a share of the frame height at t (CHECKS short-zoom) */
  T.faceShare = (t) => { const f = faceOut(t); return f.h / H; };

  /* ---------- shorts: label, captions, end card ---------- */
  const HN = (w, s) => `${w} ${s}px "Helvetica Neue"`;
  const SH = {
    label: { size: 82, top: 135, padX: 18, padY: 19, radius: 8, sub: 46, gap: 12 },
    cap: { size: 76, y: 1535, ls: -0.045, scaleX: 0.95, chunk: 44, col: '#DFD7CB', box: 'rgba(0,0,0,0.4)', radius: 10, padX: 14, padY: 12, lh: 0.92, max: 30 },
  };
  T.shortStyle = SH;
  /** her caption phrase blocks: one breath, <= 2 lines x 30 characters, lowercase as spoken (names and "I" kept), no full stops */
  T.buildShortCaptions = () => {
    const proper = new Set(); WORDS.forEach((w, i) => { const pv = WORDS[i - 1]; if (/^[A-Z]/.test(w.w) && pv && !/[.?!]$/.test(pv.w)) proper.add(w.n); });
    const fix = (w, i) => { const pv = WORDS[i - 1]; let s = w.w.replace(/\.+$/, '').replace(/^"|"$/g, '');
      if (/^I('|’|$)/.test(s)) return s; if (proper.has(w.n)) return s; if (!pv || /[.?!]$/.test(pv.w)) s = s.charAt(0).toLowerCase() + s.slice(1); return s; };
    const out = []; let cur = []; const len = (ws) => ws.map(x => x.s).join(' ').length;
    const flush = () => { if (cur.length) out.push(cur); cur = []; };
    WORDS.forEach((w, i) => { const pv = WORDS[i - 1]; const it = { s: fix(w, i), t: w.t, e: w.e };
      if (cur.length && ((pv && w.t - pv.e > 0.5) || len([...cur, it]) > SH.cap.chunk || (cur.length >= 4 && pv && /[.?!]$/.test(pv.w)) || capBreak(pv, w))) flush();
      cur.push(it); if (/[.?!]$/.test(w.w) && cur.length >= 3) flush(); });
    flush();
    T.caps = out.map((ws, i) => ({ i, ws, t0: Math.max(0, ws[0].t - 0.05), t1: Math.min(i + 1 < out.length ? out[i + 1][0].t - 0.05 : FOOT.dur, ws[ws.length - 1].e + 0.35), text: ws.map(x => x.s).join(' ') }));
    // the .srt (and the editor's Lines list) follow the same blocks
    FOOT.capLong = T.caps.map(c => ({ i: c.i, t0: c.t0, t1: c.t1, text: c.text, ws: c.ws.map(x => ({ w: x.s, t: x.t, e: x.e })) }));
    CAPTIONS = FOOT.capLong.map(c => ({ i: c.i, t0: c.t0, t1: c.t1, text: c.text }));
  };
  function wrap2(s, font, ls, maxW, maxC = SH.cap.max) { const words = s.split(/\s+/).filter(Boolean); if (words.length < 2) return [s];
    const one = tw(s, font, ls); if (one <= maxW && s.length <= maxC) return [s];
    let best = null; for (let k = words.length > 2 ? 1 : 1; k < words.length; k++) { if (words.length > 2 && k === words.length - 1) continue; const a = words.slice(0, k).join(' '), b = words.slice(k).join(' '); const m = Math.max(tw(a, font, ls), tw(b, font, ls)); if (!best || m < best[0]) best = [m, [a, b]]; } return best[1]; }
  function drawShortCaption(t) {
    const c = (T.caps || []).find(x => x.t0 <= t && t < x.t1); if (!c) return;
    if (T.capOff.some(([a, b]) => t >= a && t < b)) return;
    const cst = EDIT.data.captions9 || {};   // her size slider / height (absent = her measured shorts spec)
    const S_ = cst.size || cst.y != null ? { ...SH.cap, size: cst.size ? clamp(Math.round(cst.size), CAPSIZE.min9, CAPSIZE.max9) : SH.cap.size } : SH.cap; const font = HN(500, S_.size), ls = S_.size * S_.ls;
    const dy9 = cst.y != null ? clamp(cst.y, CAPSIZE.y9[0], CAPSIZE.y9[1]) - SH.cap.y : 0;
    const ce = (EDIT.data.capShort || {})[c.i]; const text = ce != null ? ce : c.text;
    const lines = wrap2(text, font, ls, (W - 120) / S_.scaleX); const lh = S_.size * S_.lh * 1.12;
    const ws = lines.map(l => tw(l, font, ls) * S_.scaleX); const bw = Math.max(...ws) + S_.padX * 2, asc = S_.size * 0.74, desc = S_.size * 0.24;
    const bh = asc + desc + (lines.length - 1) * lh + S_.padY * 2; const yTop = (FOOT.capYNow || S_.y) + dy9 - bh / 2;
    ctx.save(); ctx.fillStyle = S_.box; rr(CX - bw / 2, yTop, bw, bh, S_.radius); ctx.fill();
    lines.forEach((l, k) => { ctx.save(); ctx.translate(CX, yTop + S_.padY + asc + k * lh); ctx.scale(S_.scaleX, 1); _txt(l, 0, 0, font, S_.col, 'center', 'alphabetic', ls); ctx.restore(); });
    ctx.restore();
    regBox({ id: 'caption/' + c.i, edited: ce != null, hide: false }, CX - bw / 2, yTop, bw, bh, { kind: 'caption', text, def: c.text, cue: c.i });
  }
  /** the bottom of the shorts' top label (0 when there is none): film panels keep their content below it */
  /** the label's lines at size k (her size slider): one line when it fits, else two balanced lines (never one word alone
   *  on the second), else as many lines as it needs; a typed line break (Shift+Enter) is kept */
  function labelLines(str, k) {
    const L_ = SH.label, font = HN(400, L_.size), maxW = (W - 2 * 50 - L_.padX * 2) / (k || 1);
    if (str.includes('\n')) return str.split('\n');
    if (tw(str, font) <= maxW) return [str];
    const two = wrap2(str, font, 0, maxW, 999); if (two.every(l => tw(l, font) <= maxW)) return two;
    const out = []; let cur = ''; for (const w of str.split(/\s+/)) { const nx = cur ? cur + ' ' + w : w; if (cur && tw(nx, font) > maxW) { out.push(cur); cur = w; } else cur = nx; } if (cur) out.push(cur); return out;
  }
  T.labelBottom = () => {
    const m = FOOT.m; if (!m || !m.label || !PORTRAIT) return 0; const L_ = SH.label; const e = EDIT.data.t['label/' + keyOf('label')]; const pos = e && e.pos && e.pos[LAYOUT];
    if ((e && e.hide) || (pos && pos.hide)) return 0; const str = e && e.s != null ? e.s : m.label;   // (read without ovr: no editor side effects)
    const k = (pos && pos.k) || 1, dy = (pos && pos.dy) || 0; const n = labelLines(str, k).length;
    return L_.top + dy + k * (n * (L_.size + L_.padY * 2 + 6) + (m.sublabel ? L_.sub + L_.padY * 1.4 + L_.gap : 0));
  };
  /** the top label: white boxes (each line its own), Helvetica Neue Regular, never animated. Editable. */
  function drawLabel() {
    const m = FOOT.m; if (!m.label) return; const L_ = SH.label; SCENE_ID = 'label'; EL.seen.clear();
    const ov = ovr('label'); const str = ov.s != null ? ov.s : m.label; const info = { text: str, def: m.label, kind: 'box', sk: ov.k, label: 'top label (text, size, place)' };
    if (ov.hide) { regBox(ov, CX - 300, L_.top, 600, 100, info); return; }
    // resizable (her note 2026-10-15: "make it bigger or smaller doesn't work"): a box with a size slider, scaled around its top centre
    const font = HN(400, L_.size); const lines = labelLines(str, ov.k);
    let y = L_.top; const bh = L_.size * 1.0 + L_.padY * 2; let x0 = Infinity, x1 = -Infinity;
    moved(ov, () => {
      lines.concat(str.includes('\n') ? [] : []).forEach((l) => { const w = tw(l, font) + L_.padX * 2; x0 = Math.min(x0, CX - w / 2); x1 = Math.max(x1, CX + w / 2);
        ctx.fillStyle = '#FFFFFF'; rr(CX - w / 2, y, w, bh, L_.radius); ctx.fill(); _txt(l, CX, y + L_.padY + L_.size * 0.76, font, '#000000', 'center'); y += bh + 6; });
      regBox(ov, x0, L_.top, x1 - x0, y - L_.top - 6, info);
      if (m.sublabel) { const ov2 = ovr('sublabel'); const s2 = ov2.s != null ? ov2.s : m.sublabel; if (!ov2.hide) { const f2 = HN(400, L_.sub); const w2 = tw(s2, f2) + L_.padX * 2, y2 = y - 6 + L_.gap, h2 = L_.sub + L_.padY * 1.4;
        moved(ov2, () => { ctx.fillStyle = '#FFFFFF'; rr(CX - w2 / 2, y2, w2, h2, L_.radius); ctx.fill(); _txt(s2, CX, y2 + L_.padY * 0.7 + L_.sub * 0.76, f2, '#000000', 'center'); regBox(ov2, CX - w2 / 2, y2, w2, h2, { text: s2, def: m.sublabel }); }); } }
    }, [CX, L_.top]);
  }
  /** her outro clip in the preview: a still of it (the export lays the clip itself over these frames) */
  function drawOutro() {
    const r = typeof TZ !== 'undefined' && TZ.vis ? TZ.vis() : { x: 0, y: 0, w: W, h: H }; rect(0, 0, W, H, '#000000');
    const im = IMG.outro; if (!im) return; const k = Math.min(r.h / im.height, r.w / (0.52 * im.width));   // as the export: full height + the middle 52 % always in view, black around
    themeFixed(() => { ctx.save(); ctx.beginPath(); ctx.rect(r.x, r.y, r.w, r.h); ctx.clip(); ctx.drawImage(im, r.x + (r.w - im.width * k) / 2, r.y + (r.h - im.height * k) / 2, im.width * k, im.height * k); ctx.restore(); });
  }
  /** the end card (5-7 s after her last word): cream ground, a dark phone-style card. Texts editable; no invented numbers. */
  function drawEndCard(t) {
    if (FOOT.m.endCard === false) return;   // (opt-in 2026-10-26: no end card, e.g. while her outro clip is not there yet)
    const ec = FOOT.m.endCard || {}; const t0 = FOOT.dur; if (t < t0) return; const lt = t - t0; SCENE_ID = 'endcard'; EL.seen.clear(); const g0 = g; g = G.paper;
    rect(0, 0, W, H, ec.ground || '#EDE6D8');
    const p = MOTION.ease(t, t0 + 0.05, 0.55, 'outQuint'); const cw = 900, x = (W - cw) / 2, y = 470 + (1 - p) * 260; const ch = 1000;
    withA(clamp(p * 2), () => grp('card', x, y, cw, ch, () => {
      ctx.fillStyle = '#0F0F10'; rr(x, y, cw, ch, 44); ctx.fill();
      // camera glyph + headline
      ctx.save(); ctx.strokeStyle = '#FFFFFF'; ctx.lineWidth = 6; rr(x + 60, y + 70, 66, 48, 10); ctx.stroke(); ctx.beginPath(); ctx.moveTo(x + 126, y + 86); ctx.lineTo(x + 152, y + 74); ctx.lineTo(x + 152, y + 114); ctx.lineTo(x + 126, y + 102); ctx.closePath(); ctx.fillStyle = '#FFFFFF'; ctx.fill(); ctx.restore();
      txt(ec.headline || 'FULL VIDEO ON YOUTUBE', x + 180, y + 112, HN(700, 50), '#FFFFFF', 'left', 'alphabetic', 0, 'headline');
      const tx = x + 60, ty = y + 170, tw_ = cw - 120, th = tw_ * 9 / 16;
      if (ec.thumb && IMG[ec.thumb]) themeFixed(() => { ctx.save(); rr(tx, ty, tw_, th, 18); ctx.clip(); const im = IMG[ec.thumb]; const s = Math.max(tw_ / im.width, th / im.height); ctx.drawImage(im, tx + (tw_ - im.width * s) / 2, ty + (th - im.height * s) / 2, im.width * s, im.height * s); ctx.restore(); });
      else { ctx.fillStyle = '#26262A'; rr(tx, ty, tw_, th, 18); ctx.fill(); }
      txtW(ec.title || FOOT.man.videoTitle || FOOT.m.title || '', tx, ty + th + 64, HN(700, 44), '#FFFFFF', tw_, 54, 0, 'title');
      // channel row
      const ry = ty + th + 200; ctx.fillStyle = '#3A3A40'; ctx.beginPath(); ctx.arc(tx + 40, ry, 40, 0, Math.PI * 2); ctx.fill();
      if (ec.avatar && IMG[ec.avatar]) themeFixed(() => { ctx.save(); ctx.beginPath(); ctx.arc(tx + 40, ry, 40, 0, Math.PI * 2); ctx.clip(); const im = IMG[ec.avatar]; const s = 80 / Math.min(im.width, im.height); ctx.drawImage(im, tx + 40 - im.width * s / 2, ry - im.height * s / 2, im.width * s, im.height * s); ctx.restore(); });
      txt(ec.channel || 'with Gbemi', tx + 100, ry - 6, HN(700, 38), '#FFFFFF', 'left', 'alphabetic', 0, 'channel');
      txt(ec.handle || '@WithGbemi', tx + 100, ry + 36, HN(400, 30), '#AAAAAA', 'left', 'alphabetic', 0, 'handle');
      const tap = t0 + (ec.tapAt || 1.9); const subd = t >= tap; const bx = x + cw - 60 - 250, by = ry - 34;
      ctx.fillStyle = subd ? '#3A3A40' : '#FFFFFF'; rr(bx, by, 250, 68, 34); ctx.fill();
      _txt(subd ? 'Subscribed' : 'Subscribe', bx + 125, by + 45, HN(700, 30), subd ? '#FFFFFF' : '#0F0F10', 'center');
      // three buttons (icons drawn, no counts)
      const btn = (k, label) => { const w = (cw - 120 - 40) / 3, bx2 = tx + k * (w + 20), by2 = ry + 80; ctx.fillStyle = '#26262A'; rr(bx2, by2, w, 76, 38); ctx.fill(); _txt(label, bx2 + w / 2, by2 + 50, HN(500, 30), '#FFFFFF', 'center'); };
      btn(0, 'Like'); btn(1, 'Comment'); btn(2, 'Share');
      // the cursor taps Subscribe
      const cp = MOTION.ease(t, tap - 0.7, 0.6, 'inOutQuart'); if (lt > 0.6) { const cx = lerp(x + cw * 0.5, bx + 150, cp), cy = lerp(y + ch + 120, by + 50, cp); const down = Math.abs(t - tap) < 0.08;
        ctx.save(); ctx.translate(cx, cy); ctx.scale(down ? 0.88 : 1, down ? 0.88 : 1); ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, 52); ctx.lineTo(14, 40); ctx.lineTo(24, 62); ctx.lineTo(33, 58); ctx.lineTo(23, 37); ctx.lineTo(40, 36); ctx.closePath(); ctx.fillStyle = '#FFFFFF'; ctx.fill(); ctx.strokeStyle = '#0F0F10'; ctx.lineWidth = 3; ctx.stroke(); ctx.restore(); }
    }));
    g = g0;
  }
  T.endCardSounds = () => { if (FOOT.m.endCard === false) return; const ec = FOOT.m.endCard || {}; const t0 = FOOT.dur; sfx('notify', t0 + 0.4, -4); sfx('tick', t0 + (ec.tapAt || 1.9), -2); };

  /* ---------- "FULL VIDEO ON YOUTUBE": our own drawn ending (manifest "outroCard", 2026-11-10) ----------
   * Her clip ("outro") wins when there is one. Order as hers: watch the full video (thumbnail + title) -> subscribe (a
   * cursor clicks Subscribe, it turns Subscribed + bell) -> like / comment / share (the cursor likes). No counts, ever.
   * Recomposed per frame size: tall stack (9:16, 4:5, 1:1 fitted windows) or side by side (16:9). Every text editable,
   * thumbnail + photo swappable in the moment editor (click the picture: "Change picture"). Times: FOOT.ocard.at. */
  // (defaults for the texts / photo / length: footage.js bootMoment, FOOT.ocard)
  const OC_STYLE = { ground: '#111114', ink: '#F4F1EA', mid: '#BDBAB2', accent: '#FF4713', button: null, buttonInk: null, soft: null };   // dark by default: most thumbnails are light, so they stand off it
  const OC_AT = { sub: 1.9, like: 3.1, share: 4.5 };   // seconds into the card: the Subscribe, Like and Share presses
  T.ocardImg = (which) => { const e = EDIT.data.t['outrocard/@' + which]; const s = e && e.s; return (s && IMG['oc:' + s]) || IMG['oc:' + which] || null; };
  // the four icons (48 x 48 design box, stroked or filled)
  const OC_ICON = {
    camera: () => { rr(2, 12, 30, 24, 6); ctx.fill(); ctx.beginPath(); ctx.moveTo(34, 21); ctx.lineTo(46, 14); ctx.lineTo(46, 34); ctx.lineTo(34, 27); ctx.closePath(); ctx.fill(); },
    like: () => { rr(3, 21, 9, 23, 2); ctx.closePath(); ctx.moveTo(17, 43); ctx.lineTo(17, 22); ctx.lineTo(24, 7); ctx.bezierCurveTo(27, 4, 32, 6, 31, 11); ctx.lineTo(29, 19); ctx.lineTo(41, 19);
      ctx.bezierCurveTo(45, 19, 47, 22, 46, 26); ctx.lineTo(43, 40); ctx.bezierCurveTo(42, 42, 40, 43, 38, 43); ctx.closePath(); },
    comment: () => { ctx.beginPath(); ctx.moveTo(10, 6); ctx.lineTo(38, 6); ctx.arcTo(45, 6, 45, 13, 7); ctx.lineTo(45, 29); ctx.arcTo(45, 36, 38, 36, 7); ctx.lineTo(22, 36); ctx.lineTo(12, 44);
      ctx.lineTo(12, 36); ctx.arcTo(3, 36, 3, 29, 7); ctx.lineTo(3, 13); ctx.arcTo(3, 6, 10, 6, 7); ctx.closePath(); },
    share: () => { ctx.beginPath(); ctx.moveTo(27, 6); ctx.lineTo(45, 22); ctx.lineTo(27, 38); ctx.lineTo(27, 29); ctx.bezierCurveTo(16, 29, 9, 33, 3, 42); ctx.bezierCurveTo(5, 28, 13, 19, 27, 16); ctx.closePath(); },
    bell: () => { ctx.beginPath(); ctx.moveTo(24, 5); ctx.bezierCurveTo(15, 5, 12, 12, 12, 20); ctx.lineTo(12, 31); ctx.lineTo(7, 37); ctx.lineTo(41, 37); ctx.lineTo(36, 31); ctx.lineTo(36, 20);
      ctx.bezierCurveTo(36, 12, 33, 5, 24, 5); ctx.closePath(); ctx.moveTo(29, 41); ctx.arc(24, 41, 5, 0, Math.PI); ctx.closePath(); },
  };
  function ocIcon(name, x, y, s, col, o = {}) {   // x, y: top-left; s: size px
    ctx.save(); ctx.translate(x, y); ctx.scale(s / 48, s / 48); ctx.fillStyle = col; ctx.strokeStyle = col; ctx.lineWidth = o.lw || 3.6; ctx.lineJoin = 'round'; ctx.lineCap = 'round';
    if (name === 'camera') OC_ICON.camera(); else { ctx.beginPath(); OC_ICON[name](); if (o.fill) { ctx.fillStyle = o.fill; ctx.fill(); } ctx.stroke(); }
    ctx.restore();
  }
  // a line that rises out of a mask (no fade): its own baseline y, size z
  function ocRise(p, x, y, z, w, fn, extra = 0) { if (p <= 0) return; const e = E.outQuint(p); ctx.save(); ctx.beginPath(); ctx.rect(x - 40, y - z * 1.05, w + 80, z * 1.4 + extra); ctx.clip(); ctx.translate(0, (1 - e) * (z * 1.15 + extra)); fn(); ctx.restore(); }
  const ocPeek = (key) => { const e = EDIT.data.t['outrocard/' + keyOf(key)]; return e && e.s != null ? e.s : null; };   // an edited text, read without the editor's bookkeeping
  /** the default title with no single word alone on its last line (a line break moved up one word); her edit is used as typed */
  function ocBalance(str, font, maxW, ls = 0) {
    const lines = []; let cur = ''; for (const w of str.split(' ')) { const nx = cur ? cur + ' ' + w : w; if (cur && tw(nx, font, ls) > maxW) { lines.push(cur); cur = w; } else cur = nx; } lines.push(cur);
    const n = lines.length; if (n < 2 || lines[n - 1].includes(' ') || str.includes('\n')) return str;
    const prev = lines[n - 2].split(' '); if (prev.length < 2) return str; const moved = prev.pop();
    return [...lines.slice(0, n - 2), prev.join(' '), moved + ' ' + lines[n - 1]].join('\n');
  }
  function ocLines(str, font, maxW, ls = 0) { let n = 0, cur = ''; for (const part of str.split('\n')) { for (const w of part.split(' ')) { const nx = cur ? cur + ' ' + w : w; if (cur && tw(nx, font, ls) > maxW) { n++; cur = w; } else cur = nx; } n++; cur = ''; } return n; }
  // the mean colour of a picture's outer edge (measured once per picture): a thumbnail as light / dark as the ground gets a hairline
  function edgeRGB(im) {
    if (im._edge) return im._edge; const c = document.createElement('canvas'); c.width = 64; c.height = 36; const x = c.getContext('2d'); x.drawImage(im, 0, 0, 64, 36);
    const d = x.getImageData(0, 0, 64, 36).data; let r = 0, g_ = 0, b = 0, n = 0;
    for (let yy = 0; yy < 36; yy++) for (let xx = 0; xx < 64; xx++) { if (yy > 1 && yy < 34 && xx > 1 && xx < 62) continue; const i = (yy * 64 + xx) * 4; r += d[i]; g_ += d[i + 1]; b += d[i + 2]; n++; }
    return (im._edge = [r / n, g_ / n, b / n]);
  }
  const lum = ([r, g_, b]) => (0.2126 * r + 0.7152 * g_ + 0.0722 * b) / 255;
  const hexRGB = (h) => { const n = parseInt(h.slice(1), 16); return [n >> 16, (n >> 8) & 255, n & 255]; };
  function ocPic(im, x, y, w, h, rad, S) {
    if (!im) { ctx.fillStyle = S ? S.soft : 'rgba(0,0,0,0.12)'; rr(x, y, w, h, rad); ctx.fill(); return; }
    ctx.save(); rr(x, y, w, h, rad); ctx.clip(); const s = Math.max(w / im.width, h / im.height); ctx.drawImage(im, x + (w - im.width * s) / 2, y + (h - im.height * s) / 2, im.width * s, im.height * s); ctx.restore();
    if (S && Math.abs(lum(edgeRGB(im)) - lum(hexRGB(S.ground))) < 0.14) { ctx.save(); rr(x, y, w, h, rad); ctx.strokeStyle = hexA(S.ink, 0.35); ctx.lineWidth = 2; ctx.stroke(); ctx.restore(); }
  }
  /** the box layout for a visible rect r (layout px): 'tall' stack or 'wide' (side by side) */
  function ocLayout(r) {
    if (r.w / r.h > 0.9 && r.w / r.h <= 1.3) {   // 1:1: two columns (thumbnail left, the video's title + channel right), the actions row under both
      const m = Math.round(r.w * 0.075), Z = Math.round(r.w * 0.072), tw_ = Math.round(r.w * 0.46), th = Math.round(tw_ * 9 / 16);
      const cx = r.x + m + tw_ + Math.round(r.w * 0.04), cw = r.x + r.w - m - cx; const colH = th + 40;
      const blockH = Z * 0.74 + 60 + Math.max(th, colH) + 150; const top = r.y + (r.h - blockH) / 2; const ty = top + Z * 0.74 + 60;
      return { wide: true, square: true, Z, hx: r.x + m, hy: top + Z * 0.74, tx: r.x + m, ty, tw: tw_, th, cx, cw, ax: r.x + m, aw: r.w - 2 * m,
        titleZ: 40, avR: 46, nameZ: 38, handleZ: 30, btnH: 74, actZ: 40, iconS: 56, bottom: ty + Math.max(th, colH) + 150 };
    }
    if (r.w / r.h > 1.3) {   // 16:9
      const m = Math.round(r.w * 0.0625), Z = 92, tw_ = Math.round(r.w * 0.5), th = Math.round(tw_ * 9 / 16), gap = 64;
      const blockH = Z * 0.74 + 56 + th; const top = r.y + (r.h - blockH) / 2;
      const cx = r.x + m + tw_ + 80, cw = r.x + r.w - m - cx;
      return { wide: true, Z, hx: r.x + m, hy: top + Z * 0.74, tx: r.x + m, ty: top + Z * 0.74 + 56, tw: tw_, th, cx, cw, gap,
        titleZ: 50, avR: 54, nameZ: 42, handleZ: 32, btnH: 78, actZ: 34, iconS: 50, bottom: top + Z * 0.74 + 56 + th };
    }
    const tall = r.h / r.w > 1.45;   // 9:16 (the platforms' buttons cover the top + bottom: keep inside SAFE)
    const y0 = tall ? Math.max(r.y, SAFE.top + 30) : r.y + r.h * 0.065, y1 = tall ? Math.min(r.y + r.h, SAFE.bottom - 10) : r.y + r.h * 0.935;
    // 9:16: the platforms' like / comment / share buttons run down the right edge, so the card (and its slow push, anchored
    // at the left edge) keeps clear of x > ~920; 4:5 (no platform buttons on a teaser) is centred
    const cw = tall ? Math.min(r.w - 80 - 180, 960) : Math.min(r.w - 2 * 90, 960), Z = 124, th = Math.round(cw * 9 / 16);
    const need = Z * 1.84 + 70 + th + 44 + 167 + 116 + 150 + 16;   // headline 2 lines, thumb, title 2 lines, channel row, actions
    const k = Math.min(1, (y1 - y0) / need); const top = y0 + ((y1 - y0) - need * k) / 2; const x = tall ? r.x + 80 : r.x + (r.w - cw * k) / 2;
    return { wide: false, tall, k, top, x, cw, Z, th };
  }

  /* ---------- her own end screen (2026-11-12: "make it as close to my original design as possible"), the default look ----------
   * Copied from her clip (inspiration/outro/her-outro-http_9x16.mp4 / _16x9.mp4): cream ground, a black rounded panel, a cream
   * circle with a camera, "FULL VIDEO ON YOUTUBE" in Poppins Bold caps, the thumbnail with a thin light border, a cream card with
   * the title + a like / dislike bar (no made-up counts), a cream card with her round photo, "with Gbemi", Subscribe -> Subscribed
   * + a ringing bell, and "Like / Comment / Share" under it. style.look "modern" = the 2026-11-10 card. */
  const PF = (w, z) => `${w} ${z}px Poppins`;
  const CL = { cream: '#F1ECE2', black: '#050505', ink: '#111111', grey: '#9C9A96', greyInk: '#F1ECE2', blue: '#1F4BFF', line: '#B9B6B0', border: 'rgba(255,255,255,0.75)' };
  function clThumbDown(x, y, s, col) { ctx.save(); ctx.translate(x + s, y + s); ctx.rotate(Math.PI); ocIcon('like', 0, 0, s, col, { fill: col }); ctx.restore(); }
  function clBell(lt, x, y, s, col, at) {
    const q = clamp((lt - at.sub - 0.08) / 0.7); const wob = q > 0 && q < 1 ? Math.sin(q * Math.PI * 4) * 0.21 * (1 - q * 0.5) : 0;
    withT(x + s / 2, y + s / 2, 1, wob, () => ocIcon('bell', -s / 2, -s / 2, s, col, { fill: col }));
    ctx.save(); ctx.strokeStyle = col; ctx.lineWidth = s * 0.06; ctx.lineCap = 'round';
    for (const d of [-1, 1]) for (const k of [0, 1]) { ctx.beginPath(); ctx.arc(x + s / 2, y + s * 0.45, s * (0.62 + k * 0.16), d < 0 ? Math.PI * 0.82 : -Math.PI * 0.18, d < 0 ? Math.PI * 1.18 : Math.PI * 0.18); ctx.stroke(); }
    ctx.restore();
  }
  /** the card with the title + like / dislike bar; returns the like icon box */
  function clTitleCard(lt, x, y, w, h, title, P, at, z) {
    const p = P(0.42, 0.45); if (p <= 0) return null; const e = E.outQuint(p);
    let box = null;
    ctx.save(); ctx.globalAlpha *= clamp(p * 3); ctx.translate(0, (1 - e) * 60);
    ctx.fillStyle = CL.cream; rr(x, y, w, h, 12 * z); ctx.fill();
    const tz = 34 * z, tf = PF(700, tz), tw_ = w * 0.58; const t2 = ocBalance(title, tf, tw_, 0);
    const n = ocLines(ocPeek('title') ?? t2, tf, tw_, 0); const ty = y + h / 2 - ((n - 1) * tz * 1.08) / 2 + tz * 0.35;
    txtW(t2, x + 18 * z, ty, tf, CL.ink, tw_, tz * 1.08, 0, 'title');
    const ix = x + w * 0.655, iy = y + h / 2 - 34 * z, is = 46 * z; const liked = lt >= at.like;
    const pop = liked ? 1 + 0.3 * Math.max(0, 1 - (lt - at.like) / 0.3) * Math.sin(Math.min(1, (lt - at.like) / 0.3) * Math.PI) : 1;
    withT(ix + is / 2, iy + is / 2, pop, 0, () => ocIcon('like', -is / 2, -is / 2, is, CL.blue, { fill: CL.blue }));
    clThumbDown(ix + w * 0.17, iy + 2 * z, is * 0.92, CL.grey);
    const bx = ix, by = iy + is + 22 * z, bw = w * 0.275; ctx.fillStyle = CL.line; rr(bx, by, bw, 5 * z, 3 * z); ctx.fill();
    const fill = 0.62 + 0.14 * E.outCubic(clamp((lt - at.like) / 0.5)); ctx.fillStyle = CL.blue; rr(bx, by, bw * fill, 5 * z, 3 * z); ctx.fill();
    box = { x: ix, y: iy + (1 - e) * 60, w: is, h: is };
    ctx.restore(); return box;
  }
  /** the card with her photo, "with Gbemi", Subscribe -> Subscribed + bell; returns the button box */
  function clChannelCard(lt, x, y, w, h, P, at, z, compact) {
    const o = FOOT.ocard; const p = P(0.52, 0.45); if (p <= 0) return null; const e = E.outQuint(p);
    ctx.save(); ctx.globalAlpha *= clamp(p * 3); ctx.translate(0, (1 - e) * 60);
    if (!compact) { ctx.fillStyle = CL.cream; rr(x, y, w, h, 12 * z); ctx.fill(); }
    const avR = (compact ? 78 : 92) * z, cx = x + (compact ? 0 : 34 * z) + avR, cy = y + h / 2;
    grp('photo', cx - avR, cy - avR, 2 * avR, 2 * avR, () => { const im = T.ocardImg('photo'); ctx.save(); ctx.beginPath(); ctx.arc(cx, cy, avR, 0, Math.PI * 2); ctx.clip();
      if (im) { const s = 2 * avR / Math.min(im.width, im.height); ctx.drawImage(im, cx - im.width * s / 2, cy - im.height * s / 2, im.width * s, im.height * s); } else { ctx.fillStyle = CL.line; ctx.fill(); } ctx.restore(); },
      { img: true, swap: 'photo', label: 'your round photo' });
    txt(o.channelC || 'with Gbemi', cx + avR + 28 * z, cy - (compact ? 14 : 22) * z, PF(700, 38 * z), CL.ink, 'left', 'alphabetic', 0, 'channelC');
    const subd = lt >= at.sub; const bh = 48 * z, fz = 28 * z, fB = PF(700, fz);
    const bw = Math.max(tw(ocPeek('sub-on') ?? 'Subscribe', fB), tw(ocPeek('sub-done') ?? 'Subscribed', fB)) + 54 * z;
    const bx = x + w - (compact ? 96 : 106) * z - bw, by = cy - (compact ? 34 : 6) * z - bh / 2;
    const q0 = (lt - at.sub) / 0.2; const press = lt >= at.sub - 0.04 && lt < at.sub ? 0.94 : q0 >= 0 && q0 < 1 ? 1 + 0.08 * Math.sin(q0 * Math.PI) : 1;
    withT(bx + bw / 2, by + bh / 2, press, 0, () => { ctx.fillStyle = subd ? CL.grey : '#E3262B'; rr(-bw / 2, -bh / 2, bw, bh, bh / 2); ctx.fill();
      if (subd) txt('Subscribed', 0, fz * 0.36, fB, CL.greyInk, 'center', 'alphabetic', 0, 'sub-done'); else txt('Subscribe', 0, fz * 0.36, fB, '#FFFFFF', 'center', 'alphabetic', 0, 'sub-on'); });
    const bs = 46 * z; clBell(lt, bx + bw + 20 * z, by + bh / 2 - bs / 2, bs, subd ? CL.grey : CL.line, at);
    const box = { x: bx, y: by + (1 - e) * 60, w: bw, h: bh };
    ctx.restore(); return box;
  }
  /** "Like 👍  Comment 💬  Share ↪" centred at (cx, y); returns the like icon box */
  function clActions(lt, cx, y, z, col, P, at) {
    const f = PF(500, 32 * z), is = 40 * z, gap = 34 * z; const items = [['Like', 'like'], ['Comment', 'comment'], ['Share', 'share']];
    const ws = items.map(([s]) => tw(ocPeek('act-' + s) ?? s, f) + 10 * z + is); const total = ws.reduce((a, b) => a + b, 0) + gap * 2; let x = cx - total / 2; let likeBox = null;
    items.forEach(([s, ic], i) => { const p = P(0.62 + i * 0.07, 0.4); if (p > 0) { withA(clamp(p * 3), () => {
        txt(s, x, y, f, col, 'left', 'alphabetic', 0, 'act-' + s); const ix = x + tw(ocPeek('act-' + s) ?? s, f) + 10 * z, iy = y - is * 0.82;
        const liked = ic === 'like' && lt >= at.like; const pop = liked ? 1 + 0.28 * Math.max(0, 1 - (lt - at.like) / 0.3) * Math.sin(Math.min(1, (lt - at.like) / 0.3) * Math.PI) : 1;
        withT(ix + is / 2, iy + is / 2, pop, 0, () => ocIcon(ic, -is / 2, -is / 2, is, col, { fill: col }));
        if (ic === 'like') likeBox = { x: ix, y: iy, w: is, h: is }; if (ic === 'share') FOOT.ocShare = { x: ix, y: iy, w: is, h: is }; }); }
      x += ws[i] + gap; });
    return likeBox;
  }
  function clBadge(lt, cx, cy, R, P) { const p = P(0.12, 0.35); const s = p > 0 ? E.outBack(p, 1.5) : 0; if (s <= 0) return;
    withT(cx, cy, s, 0, () => { ctx.fillStyle = CL.cream; ctx.beginPath(); ctx.arc(0, 0, R, 0, Math.PI * 2); ctx.fill(); ocIcon('camera', -R * 0.55, -R * 0.52, R * 1.1, CL.black); }); }
  function clHead(lt, x, y, z, P, align) { const o = FOOT.ocard; const f = PF(700, 58 * z); const str = o.headlineC || 'FULL VIDEO ON YOUTUBE';
    ocRise(P(0.2, 0.4), align === 'center' ? x - 600 * z : x, y, 58 * z, 1200 * z, () => txt(str, x, y, f, '#FFFFFF', align, 'alphabetic', 0, 'headlineC')); }
  /** 9:16: the tall panel, drawn in a 1080 x 1920 box */
  function clTall(lt, P, title, at) {
    const pr = E.outQuint(P(0, 0.55)); ctx.save(); ctx.translate(0, (1 - pr) * 1400);
    ctx.fillStyle = CL.black; rr(63, 75, 954, 1770, 46); ctx.fill();
    clBadge(lt, 540, 263, 72, P); clHead(lt, 540, 410, 1, P, 'center');
    ocThumb(lt, 108, 544, 864, 486, P, null); if (P(0.12) > 0) { ctx.save(); ctx.strokeStyle = CL.border; ctx.lineWidth = 3; rr(108, 544, 864, 486, 10); ctx.stroke(); ctx.restore(); }
    const like = clTitleCard(lt, 108, 1062, 864, 220, title, P, at, 1);
    const sub = clChannelCard(lt, 108, 1300, 864, 220, P, at, 1, false);
    const like2 = clActions(lt, 540, 1690, 1, '#FFFFFF', P, at);
    ctx.restore(); return { sub, like: like || like2, share: FOOT.ocShare };
  }
  /** 16:9 / 1:1 / 4:5: black ground, the headline row, one card (thumbnail on top, cream below), drawn in a 960 x 1080 box */
  function clWide(lt, P, title, at) {
    clBadge(lt, 116, 62, 52, P); clHead(lt, 196, 84, 1, P, 'left');
    const pr = E.outQuint(P(0.05, 0.55)); ctx.save(); ctx.translate(0, (1 - pr) * 900);
    const x = 64, w = 888; ocThumb(lt, x, 128, w, 500, P, null);
    ctx.fillStyle = CL.cream; rr(x, 628, w, 436, 4); ctx.fill();
    ctx.save(); ctx.strokeStyle = CL.border; ctx.lineWidth = 2; rr(x, 128, w, 936, 6); ctx.stroke(); ctx.restore();
    const like = clTitleCard(lt, x, 650, w, 150, title, P, at, 1);
    const sub = clChannelCard(lt, x + 34, 830, w - 34, 170, P, at, 1, true);
    const like2 = clActions(lt, x + w * 0.5 + 40, 1012, 0.8, CL.ink, P, at);
    ctx.restore(); return { sub, like: like || like2, share: FOOT.ocShare };
  }
  function drawOutroClassic(t, oc, S, r, lt, P, title, at) {
    const tall = r.h / r.w > 1.45;
    rect(r.x - 4, r.y - 4, r.w + 8, r.h + 8, tall ? CL.cream : CL.black);
    const bw = tall ? 1080 : 960, bh = tall ? 1920 : 1080; const k = Math.min(r.w / bw, r.h / bh);
    ctx.save(); ctx.translate(r.x + (r.w - bw * k) / 2, r.y + (r.h - bh * k) / 2); ctx.scale(k, k);
    const B = tall ? clTall(lt, P, title, at) : clWide(lt, P, title, at);
    ocCursor(lt, B, { ink: '#111111', ground: '#FFFFFF' }, at, { x: (r.x - (r.x + (r.w - bw * k) / 2)) / k, y: (r.y - (r.y + (r.h - bh * k) / 2)) / k, w: r.w / k, h: r.h / k });
    ctx.restore();
  }
  function drawOutroCard(t) {
    const oc = FOOT.ocard; const t0 = FOOT.dur; if (!oc || t < t0) return; const lt = t - t0; const at = { ...OC_AT, ...(oc.at || {}) };
    SCENE_ID = 'outrocard'; EL.seen.clear();
    const S = { ...OC_STYLE, ...(oc.style || {}) }; S.button = S.button || S.ink; S.buttonInk = S.buttonInk || S.ground; S.soft = S.soft || hexA(S.ink, 0.1);
    const r = typeof TZ !== 'undefined' && TZ.vis ? TZ.vis() : { x: 0, y: 0, w: W, h: H };
    const P = (d, dur = 0.5) => clamp((lt - d) / dur);   // an element's entry progress (d: its delay in s)
    const title = oc.title || FOOT.man.videoTitle || '';
    if (S.look !== 'modern') { themeFixed(() => drawOutroClassic(t, oc, S, r, lt, P, title, at)); return; }
    themeFixed(() => {
      rect(r.x - 4, r.y - 4, r.w + 8, r.h + 8, S.ground);
      ctx.save();
      const Lo = ocLayout(r);
      const push = 1 + (Lo.tall ? 0.02 : 0.03) * E.inOutCubic(clamp(lt / Math.max(1, TOTAL - t0))); const pcx = Lo.tall ? Lo.x : r.x + r.w / 2, pcy = r.y + r.h / 2;   // a slow push (9:16: from the left edge, away from the platform buttons)
      ctx.translate(pcx, pcy); ctx.scale(push, push); ctx.translate(-pcx, -pcy);
 let B;   // B: boxes the cursor needs (subscribe button, like icon)
      if (Lo.wide) B = ocWide(lt, Lo, S, P, title, at); else { ctx.translate(Lo.x, Lo.top); ctx.scale(Lo.k, Lo.k); B = ocTall(lt, Lo, S, P, title, at); }
      ocCursor(lt, B, S, at, Lo.wide ? r : { x: (r.x - Lo.x) / Lo.k, y: (r.y - Lo.top) / Lo.k, w: r.w / Lo.k, h: r.h / Lo.k });
      ctx.restore();
    });
  }
  /** headline: camera mark + "Full video" (bold) + "on YouTube" (light), each line rising out of its mask */
  function ocHead(lt, x, y, Z, S, P, oneLine) {
    const o = FOOT.ocard; const f1 = HN(700, Z), f2 = HN(300, Z); const ls = -0.035 * Z; const iz = Z * 0.62;
    { const pi = P(0.0, 0.3); const si = pi > 0 ? E.outBack(pi, 1.6) : 0; if (si > 0) withT(x + iz / 2, y - Z * 0.66 + iz / 2, si, 0, () => ocIcon('camera', -iz / 2, -iz / 2, iz, S.accent)); }   // the camera mark pops
    const xs = x + iz + Z * 0.2;
    ocRise(P(0.03, 0.38), xs, y, Z, tw(o.headline, f1, ls), () => txt(o.headline, xs, y, f1, S.ink, 'left', 'alphabetic', ls, 'headline'));
    if (oneLine) { const x2 = xs + tw(ocPeek('headline') ?? o.headline, f1, ls) + Z * 0.26;
      ocRise(P(0.1, 0.38), x2, y, Z, tw(o.headline2, f2, ls), () => txt(o.headline2, x2, y, f2, S.ink, 'left', 'alphabetic', ls, 'headline2')); }
    else ocRise(P(0.1, 0.38), xs, y + Z * 1.0, Z, tw(o.headline2, f2, ls), () => txt(o.headline2, xs, y + Z * 1.0, f2, S.ink, 'left', 'alphabetic', ls, 'headline2'));
  }
  /** the thumbnail: lands from 0.94x at its centre (a quick 4-frame fade so it never pops in hard) */
  function ocThumb(lt, x, y, w, h, P, S) {
    const p0 = P(0.12, 0.5); if (p0 <= 0) return; const p = E.outQuint(p0); const im = T.ocardImg('thumb');
    grp('thumb', x, y, w, h, () => { ctx.save(); ctx.globalAlpha *= clamp(p0 * 4);
      const k = 0.94 + 0.06 * p; ctx.translate(x + w / 2, y + h / 2); ctx.scale(k, k); ctx.translate(-(x + w / 2), -(y + h / 2)); ocPic(im, x, y, w, h, Math.round(w * 0.018), S); ctx.restore(); },
      { img: true, swap: 'thumb', label: 'video thumbnail' });
  }
  /** the channel row: her round photo pops, name + handle rise, Subscribe lands; returns the button box */
  function ocChannel(lt, x, cy, avR, nameZ, handleZ, bx, by, bh, S, P, at) {
    const o = FOOT.ocard; const pa = P(0.3, 0.5); const sa = pa > 0 ? E.outBack(pa, 1.4) : 0;
    if (sa > 0) grp('photo', x, cy - avR, 2 * avR, 2 * avR, () => withT(x + avR, cy, sa, 0, () => { const im = T.ocardImg('photo');
      ctx.save(); ctx.beginPath(); ctx.arc(0, 0, avR, 0, Math.PI * 2); ctx.clip(); if (im) { const s = 2 * avR / Math.min(im.width, im.height); ctx.drawImage(im, -im.width * s / 2, -im.height * s / 2, im.width * s, im.height * s); } else { ctx.fillStyle = S.soft; ctx.fill(); } ctx.restore(); }),
      { img: true, swap: 'photo', label: 'your round photo' });
    const nx = x + 2 * avR + avR * 0.45;
    const slide = (pp, fn) => { if (pp <= 0) return; ctx.save(); ctx.globalAlpha *= clamp(pp * 3); ctx.translate(-40 * (1 - E.outQuint(pp)), 0); fn(); ctx.restore(); };   // in from the left, 40 px
    slide(P(0.34, 0.45), () => txt(o.channel, nx, cy - nameZ * 0.12, HN(700, nameZ), S.ink, 'left', 'alphabetic', -0.02 * nameZ, 'channel'));
    slide(P(0.4, 0.45), () => txt(o.handle, nx, cy + handleZ * 1.15, HN(400, handleZ), S.mid, 'left', 'alphabetic', 0, 'handle'));
    // Subscribe -> Subscribed (+ bell) on the press frame
    const subd = lt >= at.sub; const fz = Math.round(bh * 0.4); const fB = HN(700, fz);
    const bw = Math.max(tw(ocPeek('sub-on') ?? 'Subscribe', fB), tw(ocPeek('sub-done') ?? 'Subscribed', fB)) + bh * 0.9; if (bx < 0) bx = -bx - bw - bh * 0.95;   // (a negative bx: the right edge, room left for the bell)
    const pb = P(0.46, 0.45); const sb = pb > 0 ? E.outBack(pb, 1.3) : 0; const q0 = (lt - at.sub) / 0.2; const press = lt >= at.sub - 0.04 && lt < at.sub ? 0.94 : q0 >= 0 && q0 < 1 ? 1 + 0.08 * Math.sin(q0 * Math.PI) : 1; /* pressed in, then a 6-frame pop 1 -> 1.08 -> 1 */
    if (sb > 0) withT(bx + bw / 2, by + bh / 2, sb * press, 0, () => {
      ctx.fillStyle = subd ? S.soft : S.button; rr(-bw / 2, -bh / 2, bw, bh, bh / 2); ctx.fill();
      if (subd) txt('Subscribed', 0, fz * 0.36, fB, S.ink, 'center', 'alphabetic', 0, 'sub-done'); else txt('Subscribe', 0, fz * 0.36, fB, S.buttonInk, 'center', 'alphabetic', 0, 'sub-on');
    });
    if (subd) { const q = clamp((lt - at.sub - 0.08) / 0.7); const wob = q > 0 && q < 1 ? Math.sin(q * Math.PI * 4) * 0.21 * (1 - q * 0.5) : 0; /* rings twice, about ±12° */ const pi0 = clamp((lt - at.sub - 0.04) / 0.3); const pi = pi0 > 0 ? 0.35 + 0.65 * E.outBack(pi0, 1.6) : 0;
      const bs = bh * 0.62, bxx = bx + bw + bh * 0.3; if (pi > 0) withT(bxx + bs / 2, by + bh / 2 - bs * 0.38, pi, wob, () => ocIcon('bell', -bs / 2, -bs * 0.12, bs, S.ink, { fill: S.ink })); }
    return { x: bx, y: by, w: bw, h: bh };
  }
  /** Like · Comment · Share: icons pop in turn; Like fills on the press. Returns the like icon's box */
  function ocActions(lt, x, y, w, iconS, z, S, P, at) {
    const items = [['like', 'Like'], ['comment', 'Comment'], ['share', 'Share']]; const f = HN(500, z); let likeBox = null;
    const ws = items.map(([, s]) => iconS + iconS * 0.32 + tw(ocPeek('act-' + s) ?? s, f));
    const gapX = (w - ws.reduce((a, b) => a + b, 0)) / (items.length - 1); let xx = x;
    items.forEach(([ic, s], i) => {
      const p = P(0.52 + i * 0.08, 0.45); const sc = p > 0 ? E.outBack(p, 1.5) : 0; const liked = ic === 'like' && lt >= at.like;
      const sq = (lt - at.share) / 0.35; const nudge = ic === 'share' && sq >= 0 && sq < 1 ? 7 * Math.sin(sq * Math.PI) : 0;   // Share: the arrow nudges right on the press
      const pop = liked ? 1 + 0.28 * Math.max(0, 1 - (lt - at.like) / 0.3) * Math.sin(Math.min(1, (lt - at.like) / 0.3) * Math.PI) : 1;
      const ix = xx, iy = y - iconS * 0.78;
      if (sc > 0) { withT(ix + iconS / 2 + nudge, iy + iconS / 2, sc * pop, 0, () => ocIcon(ic, -iconS / 2, -iconS / 2, iconS, liked ? S.accent : S.ink, { fill: liked ? S.accent : null }));
        withA(clamp(p * 2), () => txt(s, ix + iconS * 1.32, y, f, S.ink, 'left', 'alphabetic', 0, 'act-' + s)); }
      if (ic === 'like') likeBox = { x: ix, y: iy, w: iconS, h: iconS }; if (ic === 'share') FOOT.ocShare = { x: ix, y: iy, w: iconS, h: iconS };
      xx += ws[i] + gapX;
    });
    return likeBox;
  }
  function ocTall(lt, Lo, S, P, title, at) {   // drawn in a box cw wide from (0, 0), scaled by Lo.k
    const { Z, cw, th } = Lo; let y = Z * 0.8;
    ocHead(lt, 0, y, Z, S, P, false); y += Z * 1.04 + 70;
    ocThumb(lt, 0, y, cw, th, P, S); y += th + 44;
    const tz = 46, tf = HN(700, tz); title = ocBalance(title, tf, cw, -0.01 * tz); const n = ocLines(ocPeek('title') ?? title, tf, cw, -0.01 * tz);
    ocRise(P(0.22), 0, y + tz * 0.8, tz, cw, () => txtW(title, 0, y + tz * 0.8, tf, S.ink, cw, tz * 1.16, -0.01 * tz, 'title'), (n - 1) * tz * 1.16);
    y += tz * 1.16 * 2 + 60;
    const avR = 58; const cy = y + avR; const bh = 88; const sub = ocChannel(lt, 0, cy, avR, 42, 32, -cw, cy - bh / 2, bh, S, P, at);   // Subscribe at the right edge
    y = cy + avR + 150;
    const like = ocActions(lt, 0, y, cw, 58, 38, S, P, at);
    return { sub, like, share: FOOT.ocShare };
  }
  function ocWide(lt, Lo, S, P, title, at) {
    const { Z, tx, ty, tw: w, th, cx, cw } = Lo;
    ocHead(lt, Lo.hx, Lo.hy, Z, S, P, true);
    ocThumb(lt, tx, ty, w, th, P, S);
    const tz = Lo.titleZ, tf = HN(700, tz); title = ocBalance(title, tf, cw, -0.01 * tz); const n = ocLines(ocPeek('title') ?? title, tf, cw, -0.01 * tz);
    ocRise(P(0.22), cx, ty + tz * 0.8, tz, cw, () => txtW(title, cx, ty + tz * 0.8, tf, S.ink, cw, tz * 1.16, -0.01 * tz, 'title'), (n - 1) * tz * 1.16);
    const avR = Lo.avR; const cy = ty + tz * 0.8 + (n - 1) * tz * 1.16 + 40 + avR;   // (tight to the title: 40+ px clear above the actions row)
    const sub = ocChannel(lt, cx, cy, avR, Lo.nameZ, Lo.handleZ, cx, cy + avR + 26, Lo.btnH, S, P, at);
    const like = Lo.square ? ocActions(lt, Lo.ax, Lo.bottom - 10, Lo.aw, Lo.iconS, Lo.actZ, S, P, at) : ocActions(lt, cx, Lo.bottom - 6, cw, Lo.iconS, Lo.actZ, S, P, at);
    return { sub, like, share: FOOT.ocShare };
  }
  /** the cursor: comes in (arrive fast, land soft), presses Subscribe (a ring), then Like, then leaves */
  function ocCursor(lt, B, S, at, view) {
    if (!B || !B.sub || !B.like) return;
    const sx = B.sub.x + B.sub.w * 0.62, sy = B.sub.y + B.sub.h * 0.62, lx = B.like.x + B.like.w * 0.55, ly = B.like.y + B.like.h * 0.6;
    const hx = B.share ? B.share.x + B.share.w * 0.5 : 0, hy = B.share ? B.share.y + B.share.h * 0.6 : 0;
    const ox = view.x + view.w * 0.92, oy = view.y + view.h * 1.04;   // off the bottom-right
    let x, y, a = 1;
    if (lt < at.sub - 0.85) return;
    if (lt < at.sub) { const e = E.outQuint(clamp((lt - (at.sub - 0.85)) / 0.7)); x = lerp(ox, sx, e); y = lerp(oy, sy, e); }
    else if (lt < at.like) { const e = E.outQuint(clamp((lt - (at.sub + 0.35)) / 0.6)); x = lerp(sx, lx, e); y = lerp(sy, ly, e); }
    else if (B.share && lt < at.share) { const e = E.outQuint(clamp((lt - (at.like + 0.5)) / 0.7)); x = lerp(lx, hx, e); y = lerp(ly, hy, e); }
    else { const [px, py, t1] = B.share ? [hx, hy, at.share] : [lx, ly, at.like]; const e = E.inCubic(clamp((lt - (t1 + 0.45)) / 0.5)); x = lerp(px, ox, e); y = lerp(py, oy, e); if (e >= 1) return; }
    for (const [t1, cx, cy] of [[at.sub, sx, sy], [at.like, lx, ly], ...(B.share ? [[at.share, hx, hy]] : [])]) { const q = (lt - t1) / 0.4; if (q >= 0 && q < 1) { ctx.save(); ctx.globalAlpha = 0.6 * (1 - q); ctx.strokeStyle = S.ink; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(cx, cy, 18 + 60 * E.outCubic(q), 0, Math.PI * 2); ctx.stroke(); ctx.restore(); } }
    const down = [at.sub, at.like, ...(B.share ? [at.share] : [])].some(t1 => lt >= t1 - 0.03 && lt < t1 + 0.07);
    withA(a, () => withT(x, y, down ? 0.86 : 1, 0, () => { ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, 58); ctx.lineTo(15, 45); ctx.lineTo(26, 69); ctx.lineTo(36, 64); ctx.lineTo(25, 41); ctx.lineTo(44, 40); ctx.closePath();
      ctx.fillStyle = S.ink; ctx.fill(); ctx.strokeStyle = S.ground; ctx.lineWidth = 4; ctx.lineJoin = 'round'; ctx.stroke(); }));
  }
  T.outroCardSounds = () => { const oc = FOOT.ocard; if (!oc) return; const t0 = FOOT.dur, at = { ...OC_AT, ...(oc.at || {}) }; const k = { keep: true };
    for (let i = CUES.length - 1; i >= 0; i--) if (CUES[i].t >= t0 - 0.02 && !/^@/.test(CUES[i].name)) CUES.splice(i, 1);   // the old ending's sounds go (music cues stay)
    sfx('pop', t0 + 0.04, -1, k); sfx('mouseClick', t0 + at.sub, 0, k); sfx('tick', t0 + at.like, -3, k); sfx('tick', t0 + at.share, -8, k); };   // (Share: a quieter tick)
  /** load the card's pictures (manifest thumb / photo + any picture she swapped in the editor) before the first frame */
  T.ocardPrep = async () => {
    const oc = FOOT.ocard; if (!oc) return; const url = (p) => (/^\/|^https?:/.test(p) ? p : FOOT.base + p);
    const jobs = [['oc:thumb', oc.thumb], ['oc:photo', oc.photo]];
    for (const w of ['thumb', 'photo']) { const e = EDIT.data.t['outrocard/@' + w]; if (e && e.s) jobs.push(['oc:' + e.s, e.s]); }
    await Promise.all(jobs.filter(([k, p]) => p && !IMG[k]).map(([k, p]) => loadImg(k, url(p)).catch(() => { FOOT.missingImages.push(p); console.error('missing picture (left out): ' + p); })));
  };

  /* ---------- finishing: segments -> scenes + camera; sound rules; hooks ---------- */
  // sound priorities / clear air for the palette roles (a riser never blocks the hit it lands on)
  const CORE_PRI = { ...SFX_PRI }, CORE_GAP = { ...SFX_GAP };
  const PAL_PRI = { hit: 7, riser: 1, glitch: 5, shutter: 5, swipe: 4, notify: 4, mark: 4, paper: 3, typeHit: 3, pop: 3, tick: 2 };
  const PAL_GAP = { riser: 0, hit: 0.3, glitch: 1.0, shutter: 0.6, swipe: 0.6, paper: 0.8, typeHit: 0.25, notify: 1.0, pop: 0.25, mark: 0.6, tick: 0.3 };
  T.finish = () => {
    const isShort = FOOT.m.kind === 'short';
    if (!T.used && !isShort) return;
    // (layout roles get the palette's priorities without touching what a project set)
    // (a project's own values in its common.js win; core.js's film-era defaults are replaced for layout moments)
    for (const [k, v] of Object.entries(PAL_PRI)) if (!(k in SFX_PRI) || SFX_PRI[k] === CORE_PRI[k]) SFX_PRI[k] = v;
    for (const [k, v] of Object.entries(PAL_GAP)) if (!(k in SFX_GAP) || SFX_GAP[k] === CORE_GAP[k]) SFX_GAP[k] = v;
    T.segs.sort((a, b) => a.t0 - b.t0);
    const starts = () => SCENES.map(s => s.start);
    const ids = new Set(SCENES.map(s => s.id));
    // camera plan: every segment's camera, run in order now and again by TH.recam() (her box dragged in the editor); a shorts
    // framing (T.FRAMES) is applied to the keys a segment adds without a box of its own (none for 'fill': as before)
    T.keys0 = FOOT.keys.slice(); T.camPlan = [];
    const plan = (fn, segId, o) => T.camPlan.push(() => { const before = new Set(FOOT.keys); fn(); const nm = T.frameName(segId, o); if (nm !== 'fill') for (const k of FOOT.keys) if (!before.has(k)) applyFrame(k, nm); });
    if (!SCENES.length && (!T.segs.length || T.segs[0].t0 > 0.05)) { shot(0, () => { }, { id: 'talk-start', label: LABEL.talk }); SCENES[SCENES.length - 1].win = T.frameName('talk-start'); plan(() => baseCam(0), 'talk-start'); }
    T.segs.forEach((s, i) => {
      let id = s.id; while (ids.has(id)) id += '-b'; ids.add(id); s.id = id;
      const draw = s.draw ? ((t) => { if (t < s.t1) s.draw(t); }) : () => { };
      if (s.card) card(s.t0, s.ground, draw, { id, label: LABEL[s.kind] }); else shot(s.t0, draw, { id, label: LABEL[s.kind] });
      const sc = SCENES[SCENES.length - 1]; sc.layout = LABEL[s.kind] || s.kind; if (s.cover) sc.cover = true; if (s.o && s.o.noCaps) sc.noCaps = true; sc.t1 = s.t1;
      plan(s.cam ? s.cam : s.kind === 'talk' ? () => baseCam(s.t0) : () => { }, s.id, s.o); sc.win = T.frameName(s.id, s.o);
      // a gap until the next scene: her plain framing
      const next = Math.min(...[...starts(), ...T.segs.slice(i + 1).map(x => x.t0)].filter(x => x > s.t0 + 1e-3), TOTAL);
      if (next - s.t1 <= 0.45) { s.t1 = Math.max(s.t1, next); sc.t1 = s.t1; }   // a sliver of a gap: the layout holds until the next one
      else if (s.t1 < TOTAL - 0.05) { let tid = 'talk-' + s.t1.toFixed(1).replace('.', '_'); while (ids.has(tid)) tid += 'b'; ids.add(tid);
        shot(s.t1, () => { }, { id: tid, label: LABEL.talk }); SCENES[SCENES.length - 1].layout = LABEL.talk; SCENES[SCENES.length - 1].win = T.frameName(tid); const t1_ = s.t1; plan(() => baseCam(t1_), tid); }
    });
    for (const f of T.camPlan) f();
    if (T.frameOn() && SCENES.some(sc => sc.win && sc.win !== 'fill')) FOOT.under = frameUnder;
    if (FOOT.outro) {   // her outro clip ends it: the old end card's sounds go (music cues "@..." stay), one swipe into the clip
      for (let i = CUES.length - 1; i >= 0; i--) if (CUES[i].t >= FOOT.dur - 0.02 && !/^@/.test(CUES[i].name)) CUES.splice(i, 1);
      sfx('swipe', FOOT.dur, -4);
    } else if (FOOT.ocard) T.outroCardSounds();   // our drawn "full video on YouTube" ending (manifest "outroCard")
    else if (isShort) T.endCardSounds();
    // whoosh rationing (SOUND-PALETTE rule 1): at most 1 in 6 cues, never two in a row; the rest become swipes
    const cs = [...CUES].sort((a, b) => a.t - b.t); let wn = 0, last = false;
    cs.forEach((c, i) => { if (c.name !== 'whoosh') { last = false; return; } wn++; if (last || wn > Math.ceil(cs.length / 6)) c.name = 'swipe'; last = true; });
  };
  /** after the scenes and layers: label, captions, end card, glitch (only for moments that use the layouts or are shorts) */
  T.post = (t) => {
    const isShort = FOOT.m.kind === 'short'; const style = FOOT.m.captionStyle || FOOT.man.captionStyle || (isShort ? 'shorts' : 'house');
    ctx.setTransform(...BASE); g = G.ink;
    const end = isShort && t >= FOOT.dur;
    if (isShort && !end) drawLabel();
    if (SHOW.captions && !end) {
      const sc = SCENES[sceneIndex(t)], onCard = !!(sc && sc.card && t >= sc.start);
      const off = T.capOff.some(([a, b]) => t >= a && t < b) && !(lk().kw === 'stack' && sc && sc.cover);   // a stack keyword steps aside on film scenes: the captions stay
      // 16:9: her 16:9 caption style (footage.js), also over film scenes (L9, L11: her note 2026-10-15, long stretches had no
      // caption); there on a darker plate so they read over the film's own text. A segment can opt out with noCaps: true.
      if (!PORTRAIT && !isShort) { const onFilm = !!(sc && (sc.layout === LABEL.cutaway || sc.layout === LABEL.corner || sc.layout === LABEL.tile)); if (!off && !onCard && !(sc && sc.noCaps)) drawCaptions16(t, { onFilm }); }
      else if (style === 'shorts') { if ((PORTRAIT || isShort) && !(off && lk().kwHideCap)) drawShortCaption(t); }   // kwHideCap (opt-in 2026-10-26): a keyword replaces the caption in 9:16 too else if (!off) { if (!(PORTRAIT && onCard)) drawMomentCaptions(t); }
    }
    if (FOOT.outro && t >= FOOT.dur) { drawOutro(); } else if (FOOT.ocard) drawOutroCard(t); else if (isShort) drawEndCard(t);
    ctx.setTransform(1, 0, 0, 1, 0, 0); if (T.glitches.length) glitchPost(t);
    // T.over: drawn above everything, captions included (teaser transitions: flash / black / whip / glitch frames)
    for (const fn of T.over) { ctx.save(); ctx.setTransform(...BASE); ctx.globalAlpha = 1; fn(t); ctx.restore(); }
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  };
  /** rebuild the cameras from the plan (the moment editor calls it after her box was moved / resized) */
  T.recam = () => { if (!T.camPlan) return; FOOT.keys = T.keys0.slice(); for (const f of T.camPlan) f(); };
  T.active = () => T.used || (FOOT.m && FOOT.m.kind === 'short');
  /** boot: before the moment script runs (load the film when the manifest links one) */
  T.boot = async () => { const man = FOOT.man; const slug = man.film === true ? FOOT.slug : man.film; if (slug) await FL.init(slug, ASPECT); };
  /** after the script ran: the other film frame sizes a layout asked for, the shorts' captions */
  T.ready = async () => {
    for (const a of FL.need) { const w = await FL.load(a); FL.frames[a].win = w; }
    for (const a of Object.keys(FL.frames)) FL.frames[a].win = await FL.frames[a].ready;
    const style = FOOT.m.captionStyle || FOOT.man.captionStyle || (FOOT.m.kind === 'short' ? 'shorts' : 'house');
    if (style === 'shorts') T.buildShortCaptions();
  };
  return T;
})();
