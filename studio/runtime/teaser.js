/* Studio runtime, part 6: teasers (moment "kind": "teaser"): a 60-120 s cold open for LinkedIn and X made of her best
 * lines from the whole video, in an order chosen for tension (hook -> tension -> payoff -> call to watch), with a label
 * that says what this is, an optional countdown, short film inserts, her captions and an end card that says where to
 * watch. Spec: inspiration/know-how/TEASER-PLAYBOOK.md. Loaded after layouts.js (moment.html, the moment editor).
 *
 * The manifest moment: { "id": "teaser", "kind": "teaser", "bites": [[in, out], ...] (source seconds, in the order they
 * play; any order of the source), "lead": [in, out] (optional silent source stretch under a countdown), "tail": 6 (end
 * card seconds), "captionStyle": "shorts", "music": [...], "script": "teaser/teaser.js" }. footedl.py plans each bite
 * like a small moment (pauses tightened) and writes their output times in edl.json "bites"; composite.mjs splices the
 * clips when they go back in the source. Frame sizes: 16:9, 1:1, 4:5, 9:16 (1:1 and 4:5 are the 9:16 layout fitted:
 * core.js ASPECTS; TZ.vis() is the part of the layout the frame shows, so everything here is placed inside it).
 *
 *   TZ.bites()                  [{i, t0, t1}] output times of each bite (the lead, if any, is bite 0 with lead: true)
 *   TZ.vis()                    {x, y, w, h}: the visible part of the layout (layout px)
 *   TZ.talk(i, o)               her framing for bite i (TH.talk options: frame, side, push, punch), from o.from (s into the bite)
 *   TZ.insert(span, o)          a film scene filling the frame (o.scene: film scene id, o.from: s into it, or o.at: film time);
 *                               her voice and the captions go on over it; o.enter: 'cut' | 'snap' (a 0.3 s settle)
 *   TZ.card(span, draw, o)      a full-frame card drawn by the project (countdown, title); draw(t, r) with r = TZ.vis()
 *   TZ.layer(t0, t1, draw)      drawn on every frame in [t0, t1) above the scenes (the "coming up" label): draw(t, r)
 *   TZ.endCard(draw, o)         the card after her last word (until the end): draw(t, r, lt) (lt = seconds into the card)
 *   TZ.at(i, q)                 the time she says q (a word or a few) in bite i
 *   TZ.gaps()                   the gap bites ({"gap": s} in the manifest: a silent beat for a title card)
 *   TZ.cut(at, {type})          a movie-trailer cut: 'flash' | 'black' | 'whip' | 'glitch' | 'card' (see below)
 *   TZ.music(t, db, d)          the music bed's level in sections; TZ.drop(t, d): the music stops for d s (beat drop)
 * Sounds: plain sfx(role, t, db) with the palette roles (SOUND-PALETTE.md); whooshes are rationed by TH.finish.
 */
'use strict';

const TZ = (() => {
  const Z = {};
  /** the visible part of the layout (layout px): the whole frame for 16:9 / 9:16, the fitted window for 1:1 / 4:5 */
  Z.vis = () => { const v = visRect(); return v ? { x: v[0], y: v[1], w: v[2], h: v[3] } : { x: 0, y: 0, w: W, h: H }; };
  // speech bites (and the lead) in play order, numbered without the gaps, so adding a title-card gap never renumbers a script
  Z.all = () => (FOOT.bites || []).map((b, i) => ({ k: i, t0: b.t0, t1: b.t1, in: b.in, out: b.out, lead: !!(FOOT.m.lead && i === 0), gap: !!b.gap }));
  Z.bites = () => Z.all().filter(b => !b.gap).map((b, i) => ({ ...b, i }));
  Z.gaps = () => Z.all().filter(b => b.gap).map((b, i) => ({ ...b, i }));
  Z.bite = (i) => { const b = Z.bites()[i]; if (!b) throw new Error('TZ: no bite ' + i); return b; };
  Z.at = (i, q) => { const b = Z.bite(i); const t = TH.timeOf(q, { t0: b.t0, t1: b.t1 }); if (t == null) throw new Error(`TZ.at: "${q}" is not said in bite ${i} (${b.t0.toFixed(2)}-${b.t1.toFixed(2)} s: ${WORDS.filter(w => w.t >= b.t0 - 0.3 && w.t < b.t1).map(w => w.w).join(' ')})`); return t; };
  /** her framing (TH.talk) for bite i (from / to: seconds into the bite) or a span [t0, t1]. In a fitted frame (1:1, 4:5) the
   *  window already shows less of her picture than 9:16 (about 1.35x closer), so the zooms are eased back (never below fit). */
  const ZP = { wide: [1.0, 1.08], mid: [1.22, 1.16], close: [1.5, 1.3], tight: [1.8, 1.45] };
  Z.zoom = (f) => { const z = typeof f === 'number' ? f : V(...(ZP[f] || ZP.wide)); return visRect() ? Math.max(1, z * 0.84) : z; };
  Z.talk = (i, o = {}) => {
    const { from, to, ...rest } = o; let sp;
    if (Array.isArray(i)) sp = i; else { const b = Z.bite(i); sp = [b.t0 + (from || 0), to != null ? b.t0 + to : b.t1]; }
    if (visRect()) { rest.frame = Z.zoom(rest.frame || 'wide'); if (rest.push) rest.push = rest.push.map(z => Math.max(1, z * 0.84)); }
    return TH.talk(sp, rest);
  };

  /** the film's time for an insert: o.at (film seconds) or o.scene (+ o.from seconds into it) */
  /** the film time of a phrase she says (the film's own word timings) */
  Z.filmTime = (q, after = 0) => {
    const fw = TH.film.words || [], qs = String(q).split(/\s+/).map(norm).filter(Boolean);
    for (let i = 0; i <= fw.length - qs.length; i++) { if (fw[i].t < after) continue; let ok = true; for (let k = 0; k < qs.length; k++) if (fw[i + k].n !== qs[k]) { ok = false; break; } if (ok) return fw[i].t; }
    throw new Error(`TZ: "${q}" is not in the film's words`);
  };
  function filmAt(o, sp) {
    if (o.sync) {   // o.sync: a phrase she says inside the insert -> the film plays in step with her (its bubbles type on with her words)
      const tm = TH.timeOf(o.sync, { t0: sp.t0 - (o.back || 0.5), t1: sp.t1 + 0.5 });   // o.back: look this far back for the phrase (an insert that starts after it) if (tm == null) throw new Error(`TZ.insert: "${o.sync}" is not said in this insert`);
      return Z.filmTime(o.sync, o.after || 0) - (tm - sp.t0);
    }
    if (o.at != null) return o.at;
    const S = TH.film.scenes || []; const s = S.find(x => x.id === o.scene); if (!s) throw new Error('TZ.insert: no film scene "' + o.scene + '"');
    return s.start + (o.from || 0);
  }
  Z.insert = (s, o = {}) => {
    const sp = TH.span(s, { lead: 0, hold: 0, ...o }); const film = { at: filmAt(o, sp), fit: 'cover', ...(visRect() ? { aspect: '9x16', focus: [0.5, 0.42] } : {}), ...(o.film || {}) }; TH.filmNeed(film);   // (1:1 / 4:5: the film's 9:16 frame cropped to the window, so its content is ~1.3x bigger than the film's own fitted 1:1)
    const enter = o.enter || 'cut';
    const sg = TH.seg('insert', sp, o, (t) => {
      const r = Z.vis();
      const paint = () => {
        if (!(o.zoom && o.zoom !== 1)) return TH.drawFilm(t, r, film, sp);
        // o.zoom: scale the film up about o.zoomAt ([0..1, 0..1] of the frame) when its content sits small in a corner;
        // o.zoomGround: the film's flat ground colour, laid first so the zoom point can sit anywhere (else it is kept where
        // the scaled film still covers the whole frame)
        const zf = o.zoom, lo = o.zoomGround ? 0 : 0.5 / zf, za = o.zoomAt || [0.5, 0.5];
        const fx = r.x + r.w * clamp(za[0], lo, 1 - lo), fy = r.y + r.h * clamp(za[1], lo, 1 - lo);
        const ax = r.x + r.w / 2, ay = r.y + r.h / 2;   // the zoom point moves to the frame's centre
        ctx.save(); ctx.beginPath(); ctx.rect(r.x, r.y, r.w, r.h); ctx.clip(); if (o.zoomGround) { ctx.fillStyle = o.zoomGround; ctx.fillRect(r.x, r.y, r.w, r.h); }
        ctx.translate(ax, ay); ctx.scale(zf, zf); ctx.translate(-fx, -fy); TH.drawFilm(t, r, film, sp); ctx.restore();
      };
      if (enter === 'snap') { const p = E.outQuint(prog(t, sp.t0, 0.3)); const sc = lerp(1.08, 1, p); const cx = r.x + r.w / 2, cy = r.y + r.h / 2;
        ctx.save(); ctx.translate(cx, cy); ctx.scale(sc, sc); ctx.translate(-cx, -cy); paint(); ctx.restore(); }
      else paint();
      if (o.over) o.over(t, r);
    }, null, { cover: true });
    if (film.sound !== false && o.filmSound) TH.filmCues(sp, film);
    if (o.noCaps) TH.capOff.push([sp.t0, sp.t1]);   // the film spells her words here: no caption on top
    return sg;
  };
  Z.card = (s, draw, o = {}) => {
    const sp = TH.span(s, { lead: 0, hold: 0, ...o });
    return TH.seg(o.kind || 'tcard', sp, o, (t) => draw(t, Z.vis(), t - sp.t0), null, { card: true, ground: o.ground || 'ink' });
  };
  Z.layer = (t0, t1, draw) => layer((t) => { if (t >= t0 && t < t1) { SCENE_ID = 'teaser'; draw(t, Z.vis()); } });
  // (a slow push over the whole card, ~3.5 % by its end, so the last seconds never sit dead still)
  Z.endCard = (draw, o = {}) => Z.card([FOOT.dur, TOTAL], (t, r, lt) => { SCENE_ID = 'endcard'; const sc = 1 + 0.035 * E.inOutCubic(clamp(lt / Math.max(1, TOTAL - FOOT.dur)));
    const cx = r.x + r.w / 2, cy = r.y + r.h / 2; ctx.save(); ctx.translate(cx, cy); ctx.scale(sc, sc); ctx.translate(-cx, -cy); draw(t, r, lt); ctx.restore(); }, { id: 'endcard', kind: 'endcard', ...o });

  /* ---------- movie-trailer cuts (her rule 2026-10-15: "they should feel like I'm moving from one point to another… like
   * a movie teaser"): the joins are SHOWN, not hidden. TZ.cut(at, o) puts a deliberate transition on a cut:
   *   at        output seconds, a bite index (its first frame) or a bite object (a gap bite: a card fills it)
   *   o.type    'flash'  2-4 frames of light over the new shot (alpha 1 / .65 / .3), o.color (default white)
   *             'black'  2-4 frames of black across the join (1 frame before it)
   *             'whip'   a fast whip: an opaque accent panel (o.color) sweeps right -> left in ~8 frames with a short
   *                      trailing smear and speed lines (o.streak); the cut happens while it covers the frame
   *             'glitch' 3-4 frames of broken picture: slices, offset colour bars, one black frame (o.colors)
   *             'card'   a title-card interstitial: one or two words (o.text) on a flat ground in the film's look, hard in,
   *                      hard out; o.span [t0, t1] or a gap bite; o.draw(t, r, lt, text) draws it the project's way
   *   o.frames  how many frames (flash / black / glitch), o.sound (a palette role, false = none), o.db
   *   o.drop    seconds of silence in the music right before the cut (the beat drop: the hit lands on the cut)
   * Sounds by default: flash -> flash (a shutter), black -> boom (an impact), whip -> swipe, glitch -> glitchHit,
   * card -> hit. Every cut sound is kept (never thinned by the cue pruning).
   * TZ.music(t, db, d)  the music bed's level from t (dB, ramped over d s): sections that build (e.g. -6 -> -3 -> 0 -> +2)
   * TZ.drop(t, d)       the music cut to silence for d s from t (a tape stop / breath before a hit) */
  const keep = (role, t, db, extra = {}) => sfx(role, t, db, { keep: true, ...extra });
  Z.music = (t, db, d = 0.4) => keep('@mgain', Math.max(0, t), db, { d });
  Z.drop = (t, d = 0.5) => keep('@mdrop', Math.max(0, t), 0, { d });
  const fr = () => 1 / FOOT.fps;
  const cover = (r, col, a = 1) => { ctx.save(); ctx.globalAlpha = a; ctx.fillStyle = col; ctx.fillRect(r.x - 4, r.y - 4, r.w + 8, r.h + 8); ctx.restore(); };
  Z.cuts = [];
  Z.cut = (at, o = {}) => {
    const b = typeof at === 'number' && Number.isInteger(at) && !o.time ? Z.bite(at) : typeof at === 'object' ? at : null;
    const t0 = b ? b.t0 : +at; const type = o.type || 'flash'; const F = fr();
    if (!(t0 >= 0)) throw new Error('TZ.cut: bad time');
    const snd = (role, t, db) => { if (o.sound !== false) keep(o.sound || role, t, (o.db ?? db)); };
    if (o.drop) Z.drop(t0 - o.drop, o.drop);
    Z.cuts.push({ t: +t0.toFixed(3), type, text: o.text || null });
    if (type === 'flash') {
      const n = o.frames || 3, col = o.color || '#FFFFFF', A = [1, 0.65, 0.3, 0.12];
      TH.over.push((t) => { const k = Math.floor((t - t0) / F + 1e-6); if (k < 0 || k >= n) return; cover(Z.vis(), col, A[Math.min(k, 3)] * (n <= 2 && k === 1 ? 0.5 : 1)); });
      snd('flash', t0, -4);
    } else if (type === 'black') {
      const n = o.frames || 3, s0 = t0 - F;
      TH.over.push((t) => { const k = Math.floor((t - s0) / F + 1e-6); if (k < 0 || k >= n) return; cover(Z.vis(), o.color || '#000000', 1); });
      snd('boom', t0, -4);
    } else if (type === 'whip') {
      // an opaque panel in the film's accent sweeps right -> left (fast in, fast out: outExpo / inExpo halves); the cut happens
      // while it covers the frame; a short trailing smear (3 steps) and dark speed lines give the direction. Critic round 1:
      // a see-through dark smear read as a murky crossfade, so nothing of her shows through the panel.
      const n = o.frames || 8, s0 = t0 - (n / 2) * F, dur = n * F, col = o.color || '#FFFFFF', st = o.streak || 'rgba(0,0,0,0.28)';
      TH.over.push((t) => {
        if (t < s0 || t >= s0 + dur) return; const r = Z.vis(); const p = (t - s0) / dur;
        const pw = r.w * 1.25;   // in: the panel's left edge goes from the right edge to the left edge; out: its right edge leaves left
        const xL = p < 0.5 ? r.x + r.w * (1 - Math.pow(p * 2, 2.2)) : r.x - pw * E.outExpo((p - 0.5) * 2);   // accelerates in, snaps out: fully covered ~1-2 frames at the cut
        const x0 = Math.max(r.x - 4, xL), x1 = Math.min(r.x + r.w + 4, xL + pw); if (x1 <= x0) return;
        cover({ x: x0, y: r.y, w: x1 - x0, h: r.h }, col, 1);
        const sw = r.w * 0.05; for (let k = 1; k <= 3; k++) { ctx.save(); ctx.globalAlpha = 0.75 - k * 0.2; ctx.fillStyle = col;
          if (p < 0.5) ctx.fillRect(x1 + (k - 1) * sw, r.y - 4, sw, r.h + 8); else ctx.fillRect(x0 - k * sw, r.y - 4, sw, r.h + 8); ctx.restore(); }
        ctx.save(); ctx.beginPath(); ctx.rect(x0, r.y, x1 - x0, r.h); ctx.clip(); ctx.fillStyle = st;
        for (let k = 0; k < 16; k++) { const yy = r.y + r.h * hash(k * 3.7 + t0); const ll = r.w * (0.3 + 0.5 * hash(k * 9.1 + t0)); const hh = Math.max(3, r.h * 0.006 * (1 + 2 * hash(k + t0)));
          ctx.fillRect(r.x + r.w * hash(k * 5.3 + p) - ll * 0.3, yy, ll, hh); }
        ctx.restore();
      });
      snd('swipe', t0, -6);
    } else if (type === 'glitch') {
      const n = o.frames || 4, s0 = t0 - F, cols = o.colors || ['#FF2D55', '#00E5FF', '#FFFFFF'];
      TH.over.push((t) => {
        const k = Math.floor((t - s0) / F + 1e-6); if (k < 0 || k >= n) return; const r = Z.vis(); const sd = t0 * 13.1 + k * 7.7;
        if (k === 1) cover(r, '#000000', 1);   // one black frame in the middle of the hit
        const m = 7 + Math.floor(5 * hash(sd));
        for (let i = 0; i < m; i++) {
          const y = r.y + r.h * hash(sd + i * 1.3), h = r.h * (0.01 + 0.07 * hash(sd + i * 2.9)), x = r.x + r.w * (hash(sd + i * 4.1) - 0.3), w = r.w * (0.25 + 0.8 * hash(sd + i * 6.7));
          ctx.save(); ctx.globalAlpha = 0.55 + 0.45 * hash(sd + i * 8.3); ctx.fillStyle = cols[i % cols.length]; ctx.fillRect(x, y, w, h); ctx.restore();
        }
        for (let i = 0; i < 18; i++) { const q = r.w * 0.02 * (1 + 2 * hash(sd + i)); ctx.save(); ctx.globalAlpha = 0.8; ctx.fillStyle = hash(sd + i * 3) > 0.5 ? '#000' : cols[(i + 1) % cols.length];
          ctx.fillRect(r.x + r.w * hash(sd + i * 5.5), r.y + r.h * hash(sd + i * 9.9), q, q * 0.5); ctx.restore(); }
      });
      snd('glitchHit', t0, -6);
    } else if (type === 'card') {
      const sp = o.span || (b && b.gap ? [b.t0, b.t1] : [t0, t0 + 0.7]);
      const draw = o.draw || ((t, r, lt, text) => {   // a plain default; projects draw theirs in the film's look
        cover(r, o.ground || '#0E0E10', 1); const z = Math.min(r.w * 0.16, r.h * 0.22) * (o.size || 1); const sc = 1 + 0.06 * (1 - E.outQuint(clamp(lt / 0.25)));
        withT(r.x + r.w / 2, r.y + r.h / 2, sc, 0, () => _txt(text || '', 0, z * 0.35, `800 ${z}px ${o.font || '"Archivo Black", sans-serif'}`, o.ink || '#FFFFFF', 'center'));
      });
      // her edits (2026-10-15: "it is uneditable"): the card's big text ("title") and small line ("sub") are editable in the
      // editor; draw(t, r, lt, text, sub) gets the edited strings (Shift+Enter in the editor = a new line)
      Z.card(sp, (t, r, lt) => {
        const ov = ovr('title'), ov2 = ovr('sub'); const text = ov.hide ? '' : ov.s != null ? ov.s : (o.text || ''); const sub = ov2.hide ? '' : ov2.s != null ? ov2.s : (o.sub || '');
        draw(t, r, lt, text, sub);
        if (lt > 0.12) { regBox(ov, r.x + r.w * 0.07, r.y + r.h * 0.34, r.w * 0.86, r.h * 0.34, { text, def: o.text || '', label: 'title card text' });
          if (o.sub != null) regBox(ov2, r.x + r.w * 0.3, r.y + r.h * 0.24, r.w * 0.4, r.h * 0.08, { text: sub, def: o.sub, label: 'title card small line' }); }
      }, { id: o.id || 'title-' + Z.cuts.length, kind: 'tcard', ground: o.cardGround || 'ink' });
      snd('hit', sp[0], -4);
      if (o.out) Z.cut(sp[1], { type: o.out, time: true, sound: o.outSound ?? 'flash', ...(o.outOpts || {}) });   // how the card leaves (e.g. a flash back into her)
    } else throw new Error('TZ.cut: unknown type ' + type);
    return t0;
  };

  /** a small helper for the projects: text that fits a width (shrinks the size, never below min) */
  Z.fit = (s, font, size, maxW, ls = 0, min = 20) => { let z = size; while (z > min && tw(s, font(z), ls * z) > maxW) z -= 2; return z; };
  return Z;
})();
