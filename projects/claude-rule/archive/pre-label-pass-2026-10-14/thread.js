/* THE THREAD: the claude-rule visual system (her pick 2026-10-13: direction A "The Thread", with B's two voices inside the
 * real-source cards and C's plank as one set piece), ported to the studio canvas engine.
 * Every frame is a pure function of t (no timers, no Math.random).
 *
 * LOOK   one lilac world (#CDBFF3, her top in this recording) and one night world (#141119) for the "big type" screens.
 *        Her lines arrive as HER messages (ink bubbles, right, word by word on her voice: unspoken words wait at 16 %).
 *        Sources arrive from the other side as white cards: real Anthropic screenshots with a mono credit and a highlighter
 *        on the exact phrase as she reads it. Anthropic's / Suleyman's words in Newsreader roman (the other voice), never in
 *        her bubbles. The model never speaks: only system lines. Everything chat-shaped is a generic ILLUSTRATION (input row).
 *        Schibsted Grotesk 500 (bubbles) / 800 (breakouts, blocks), IBM Plex Mono 34 px (labels), Newsreader (quotes).
 * MOTION bubbles scale 0.94 -> 1 from the tail corner, outQuint 12 f, opacity in 3 f; the thread scrolls by the new
 *        message's height, outQuint 14 f; system lines type on in 0.3 s; breakouts outExpo 15 f from the spoken word at 60 %,
 *        the white marker wipes in 6 f after 10 f; cards unroll top-down outQuint 12 f; highlights wipe at her reading speed.
 *
 * API
 *   TH.* palette · TF.b(size, weight) Schibsted · TF.m(size, weight) Plex Mono · TF.s(size, weight, italic) Newsreader
 *   addT(start, kind 'lil'|'nite', id, draw(t, lt))   a screen (alternates two identical grounds per kind: clean cuts)
 *   her(text, o) / them(text, o) / sys(text, a) / ended(a) / card(o) / quote(o)   thread items (see each)
 *   thread(id, items) -> T          drawThread(T, t, o) -> {words: {itemKey: [rects]}}   o: dim, input ('msg'|'ended'), top
 *   breakout(t, t0, text, from, o)  giant word flying from a bubble word (from = rect) to the centre
 *   bigLines(t, lines, o)           big type lines landing on word times (night screens)
 */
'use strict';

/* fonts: Schibsted Grotesk, IBM Plex Mono, Newsreader are declared in studio/runtime/fonts.css and listed in film.json "fonts" */

const TH = {
  ground: '#CDBFF3', ink: '#15131C', her: '#15131D', herText: '#F4F1FA', card: '#FFFFFF', mute: '#3E3852', rule: '#A99BD6',
  hl: '#B9A5F5', marker: '#FFFFFE', night: '#141119', onNight: '#F4F1FA', lilac: '#CDBFF3', nightMute: '#9C92BE', dim: '#8C80B3',
  block: '#15131E', blockText: '#F4F1FB', strike: '#15131F', option: '#DDD3F7',
};
const TF = {
  b: (s, w = 500) => `${w} ${s}px "Schibsted Grotesk"`,
  m: (s, w = 400) => `${w} ${s}px "IBM Plex Mono"`,
  s: (s, w = 400, it = false) => `${it ? 'italic ' : ''}${w} ${s}px Newsreader`,
};
G.lil = { bg: TH.ground, fg: TH.ink, mid: TH.mute, line: TH.rule, acc: TH.ink, card: TH.card, panel: TH.option, grid: 'rgba(21,19,28,0.08)', mode: 'light', altKey: 'nite' };
G.lil2 = { ...G.lil };
G.nite = { bg: TH.night, fg: TH.onNight, mid: TH.nightMute, line: '#3A3450', acc: TH.lilac, card: TH.card, panel: '#221E2E', grid: 'rgba(244,241,250,0.08)', mode: 'dark', altKey: 'lil' };
G.nite2 = { ...G.nite };
/* light / dark: a lilac screen switched to dark -> night ground, her ink bubbles turn lilac with ink text, cards and them-bubbles a
 * lifted #221E2E with a hairline, mono greys lighten; screenshots never change. A night screen switched to light -> lilac ground,
 * light type turns ink, the lilac accent turns deep violet. */
themeMap('dark', 'ground', [[TH.ground, TH.night]]);
themeMap('dark', 'surface', [[TH.her, TH.lilac], [TH.card, '#221E2E'], [TH.marker, '#5B45C9'], [TH.option, '#2A2538'], [TH.block, TH.lilac], [TH.rule, '#4A4266'], [TH.ground, TH.night]]);
themeMap('dark', 'mark', [[TH.lilac, '#4B33B8'], ['#5B45C9', '#B9A5F5'], [TH.herText, TH.ink], [TH.ink, TH.onNight], [TH.mute, '#B9AEDD'], [TH.rule, '#4A4266'], [TH.dim, '#7D72A6'], [TH.blockText, TH.ink], [TH.strike, TH.onNight], [TH.her, TH.lilac], [TH.block, TH.lilac]]);
themeMap('light', 'ground', [[TH.night, TH.ground]]);
themeMap('light', 'surface', [[TH.night, TH.ground], [TH.lilac, TH.ink], [TH.marker, TH.marker]]);
themeMap('light', 'mark', [[TH.onNight, TH.ink], [TH.lilac, '#3B2A8C'], [TH.nightMute, TH.mute]]);
THEME.edges.dark = [...(THEME.edges.dark || []), { col: TH.card, line: 'rgba(244,241,250,0.18)' }];
THEME.text = [TH.onNight, TH.ink];

/* ---------- layout ---------- */
const TL = () => ({
  fs: V(66, 56), lh: V(66, 56) * 1.18, padX: V(38, 32), padT: 24, padB: 28, maxW: V(1180, 900), gap: V(28, 28), lbl: 34,
  x: V(290, 56), w: V(1340, 968), anchor: V(850, 1240), top: V(40, 380), fade: V(150, 150),
});
const F30 = (n) => n / 30;
let LAST_ANCHOR = null;   // the anchor the last drawn chat used this frame (typing dots sit on it)
const eOQ = (x) => E.outQuint(clamp(x)), eOX = (x) => E.outExpo(clamp(x));

/* ---------- scenes: two identical grounds per kind, alternated, so a join is a clean cut, never the engine's whip ---------- */
const _alt = { lil: 0, nite: 0 }; let _lastKind = null;
// full-frame screens (not chats: a chat pushes on its own clock) get a slow push (scale +2.5 % over 8 s) so nothing freezes
const PUSH_IDS = new Set(['questions', 'meter', 'lift', 'stickers', 'tool', 'calculation', 'believe', 'living', 'powerful', 'illusion',
  'interesting', 'nine-pm', 'tired-big', 'offender-big', 'selling', 'night', 'day', 'sake', 'heart', 'why', 'overall', 'i-dont-know', 'cruel', 'no', 'chat-ends', 'ended-big']);
function addT(start, kind, id, draw, o = {}) {
  if (_lastKind === kind) _alt[kind] ^= 1; _lastKind = kind;
  const ground = kind + (_alt[kind] ? '2' : '');
  const d = PUSH_IDS.has(id) ? (t, lt) => pushed(t, start, start + 8, 0.025, () => draw(t, lt)) : draw;
  addScene(start, ground, o.label || id, d, { id });
}

/* ---------- small drawing helpers ---------- */
function pathRRv(x, y, w, h, r) {   // r = [tl, tr, br, bl]
  const [a, b, c, d] = r.map(v => Math.max(0, Math.min(v, w / 2, h / 2)));
  ctx.beginPath(); ctx.moveTo(x + a, y); ctx.lineTo(x + w - b, y); ctx.quadraticCurveTo(x + w, y, x + w, y + b);
  ctx.lineTo(x + w, y + h - c); ctx.quadraticCurveTo(x + w, y + h, x + w - c, y + h); ctx.lineTo(x + d, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - d); ctx.lineTo(x, y + a); ctx.quadraticCurveTo(x, y, x + a, y); ctx.closePath();
}
function fillRRv(x, y, w, h, r, col) { pathRRv(x, y, w, h, r); ctx.fillStyle = col; if (!THEME.alt) return ctx.fill(); THEME.surface = true; THEME.box = _box(ctx, x, y, w, h); try { ctx.fill(); } finally { THEME.surface = false; THEME.box = null; } }
function strokeRRv(x, y, w, h, r, col, lw = 2) { pathRRv(x + lw / 2, y + lw / 2, w - lw, h - lw, r); ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.stroke(); }
/** wrap words into lines no wider than maxW; returns [{words:[{w, x, wd}], wd}] */
function wrapWords(words, font, ls, maxW) {
  setFont(font, ls); const sp = ctx.measureText(' ').width; const lines = []; let cur = { words: [], wd: 0 };
  for (const w of words) { const wd = ctx.measureText(w).width; const nx = cur.words.length ? cur.wd + sp + wd : wd;
    if (cur.words.length && nx > maxW) { lines.push(cur); cur = { words: [], wd: 0 }; }
    cur.words.push({ w, x: cur.words.length ? cur.wd + sp : 0, wd }); cur.wd = cur.words.length > 1 ? cur.wd + sp + wd : wd; }
  if (cur.words.length) lines.push(cur);
  // no single word alone on a last line: pull one word down when the line above can spare it
  if (lines.length > 1 && lines[lines.length - 1].words.length === 1) {
    const a = lines[lines.length - 2]; if (a.words.length > 2) { const mv = a.words.pop(); a.wd = a.words.length ? a.words[a.words.length - 1].x + a.words[a.words.length - 1].wd : 0;
      const b = lines[lines.length - 1]; const shift = mv.wd + sp; b.words.forEach(x => { x.x += shift; }); b.words.unshift({ w: mv.w, x: 0, wd: mv.wd }); b.wd += shift; } }
  return lines;
}
/** an editable text's current string + its word times (her edit keeps the timing word by word) */
function edText(def, times, key) {
  const o = ovr(key || def); const str = o.s != null ? o.s : def; const ws = str.split(/\s+/).filter(Boolean);
  const n = times ? times.length : 0;
  return { o, str, words: ws, times: ws.map((_, i) => (n ? times[Math.min(i, n - 1)] : -1)) };
}
/** spoken word reveal: 16 % until 1 f before the word, full 2 f later */
const wordA = (t, ws) => (ws < 0 ? 1 : 0.16 + 0.84 * clamp((t - ws + F30(1)) / F30(3)));

/* ---------- thread items ---------- */
// her(text, {ph, a, typing, em: [[i0, i1, t]], key, size}) her message. ph = P('...') result (word times); em: words i0..i1 turn lilac at t
function her(text, o = {}) { return { k: 'her', text, ...o, a: o.a != null ? o.a : o.ph.t - 0.06 }; }
function them(text, o = {}) { return { k: 'them', text, ...o, a: o.a != null ? o.a : o.ph.t - 0.06 }; }
function sys(text, a, o = {}) { return { k: 'sys', text, a, ...o }; }
function ended(a, o = {}) { return { k: 'end', text: 'This conversation has ended', a, ...o }; }
// card({img, crop: [x, y, w, h] in source CSS px (the image is 2x), credit, a, hl: [{lines: [{x,y,w,h}] css, t0, t1}], w})
function card(o) { return { k: 'card', ...o }; }
// quote({text, ph, credit, a, size}) the other voice: Newsreader roman in a white card, words appear as she reads them
function quote(o) { return { k: 'quote', ...o }; }
// custom({w: [16:9, 9:16], h: [..], a, side, key, draw(x, y, w, h, t)}) any drawing as a thread item (unrolls like a card)
function custom(o) { return { k: 'custom', ...o }; }
// opts({...}) any item: fade (time it dims to 45 %), gone (time it leaves), strikeAt
function thread(id, items) { return { id, items }; }

function measureItem(it, L, t) {
  if (it.k === 'her' || it.k === 'them') {
    const fs = it.size || L.fs; const font = TF.b(fs, 500); const ls = -0.012 * fs;
    const e = edText(it.text, it.ph ? it.ph.w : null, it.key); it._e = e;
    const lines = wrapWords(e.words, font, ls, (it.maxW || L.maxW) - 2 * L.padX);
    const lab = it.label ? L.lbl + 12 : 0; const lh = fs * 1.18;
    const wMax = Math.max(...lines.map(l => l.wd), it.label ? tw(it.label, TF.m(30), 0) : 0);
    it._lines = lines; it._font = font; it._ls = ls; it._lh = lh; it._lab = lab;
    it._w = wMax + 2 * L.padX; it._h = L.padT + lab + lines.length * lh + L.padB - fs * 0.08;
  } else if (it.k === 'sys') { it._h = 44; it._w = L.w; }
  else if (it.k === 'end') { it._h = V(96, 84); it._w = L.w; }
  else if (it.k === 'card') { const w = it.w ? V(it.w[0], it.w[1]) : L.w; const ch = 60; it._w = w; it._k = w / it.crop[2]; it._ih = it.crop[3] * it._k; it._h = it._ih + ch; }
  else if (it.k === 'quote') {
    const w = it.w ? V(it.w[0], it.w[1]) : L.w; const fs = it.size ? V(it.size[0], it.size[1]) : V(64, 60); const font = TF.s(fs, 400);
    const e = edText(it.text, it.ph ? it.ph.w : null, it.key); it._e = e;
    const lines = wrapWords(e.words, font, -0.01 * fs, w - 2 * V(48, 40)); it._lines = lines; it._font = font; it._ls = -0.01 * fs; it._lh = fs * 1.16; it._fs = fs;
    it._w = w; it._h = V(44, 40) + lines.length * it._lh + V(30, 28) + 60;
  } else if (it.k === 'gap') { it._h = it.h || 0; it._w = 0; }
  else if (it.k === 'custom') { it._w = V(it.w[0], it.w[1]); it._h = V(it.h[0], it.h[1]); }
  return it._h;
}

/** draw a thread at time t. o: dim (0..1, the whole thread's alpha), input ('msg' | 'ended'), endedAt (time the input locks),
 *  hideInput, ns (edit namespace, default the thread id). Returns word rects of every her/them item: rects[item.key || item.text] */
function drawThread(T, t, o = {}) {
  const L = TL(); const out = {};
  const prevId = SCENE_ID; SCENE_ID = 'thread-' + (o.ns || T.id);   // edits of a bubble apply in every screen that shows it
  const items = T.items.filter(it => it.a <= t + 1e-6 && !(it.gone != null && t >= it.gone + 0.4));
  let scroll = 0; for (const it of items) { measureItem(it, L, t); const p = eOQ((t - it.a) / F30(14)); scroll += (it._h + L.gap) * p; }
  // a short chat sits centred in the frame; once it fills the frame its newest message rests on the input row (o.anchor fixes it)
  if (!o.fixed) L.anchor = Math.min(L.anchor, V(560, 880) + scroll / 2); LAST_ANCHOR = L.anchor;
  const dim = o.dim == null ? 1 : o.dim;
  let y = L.anchor - scroll + (o.dy || 0);
  // a slow push across the whole chat (a function of t and the chat's span, so screens cut inside one chat stay seamless)
  const a0 = T.items[0].a, a1 = T.items[T.items.length - 1].a + 6;
  const push = o.push === false ? 1 : 1 + 0.035 * clamp((t - a0) / Math.max(4, a1 - a0));
  ctx.save(); ctx.translate(CX, L.anchor); ctx.scale(push, push); ctx.translate(-CX, -L.anchor);
  withA(dim, () => {
    for (const it of items) {
      const h = it._h; const top = y; y += h + L.gap;
      const fadeTop = clamp((top - L.top) / L.fade);   // older messages are gone before they reach the top margin (portrait: the UI zone)
      let a = clamp((t - it.a + F30(1)) / F30(3)) * fadeTop;
      if (it.fade != null && t > it.fade) a *= 1 - 0.55 * eOQ((t - it.fade) / F30(12));
      if (it.gone != null && t > it.gone) a *= 1 - eOQ((t - it.gone) / F30(10));
      if (a <= 0.003) continue;
      const q = eOQ((t - it.a) / F30(12));
      withA(a, () => drawItem(it, L, top, t, q, out));
    }
    drawInput(L, t, o);
  });
  ctx.restore();
  if (push !== 1) for (const k in out) out[k] = out[k].map(r => ({ ...r, x: CX + (r.x - CX) * push, y: L.anchor + (r.y - L.anchor) * push, w: r.w * push, h: r.h * push }));
  SCENE_ID = prevId;
  return out;
}

function drawItem(it, L, top, t, q, out) {
  if (it.k === 'her' || it.k === 'them') {
    const mine = it.k === 'her'; const x = mine ? L.x + L.w - it._w : L.x; const e = it._e;
    const ox = mine ? x + it._w : x, oy = top + it._h; const s = 0.94 + 0.06 * q;
    const rects = [];
    moved(e.o, () => {
      ctx.save(); ctx.translate(ox, oy + (1 - q) * 30); ctx.scale(s, s); ctx.translate(-ox, -oy);
      const r = 34 * (it._h > 120 ? 1 : 0.9);
      if (mine) fillRRv(x, top, it._w, it._h, [r, r, 10, r], TH.her);
      else { fillRRv(x, top, it._w, it._h, [r, r, r, 10], TH.card); strokeRRv(x, top, it._w, it._h, [r, r, r, 10], TH.rule, 2); }
      if (it.label) _txt(it.label, x + L.padX, top + L.padT + 26, TF.m(30), TH.mute);
      let wi = 0;
      it._lines.forEach((ln, li) => {
        const by = top + L.padT + it._lab + li * it._lh + it._lh * 0.80;
        for (const w of ln.words) {
          const ws = e.times[wi]; let col = mine ? TH.herText : TH.ink;
          if (it.em) for (const [i0, i1, te] of it.em) if (wi >= i0 && wi <= i1 && t >= (te != null ? te : ws)) col = mine ? TH.lilac : '#5B45C9';
          withA(mine || it.reveal ? wordA(t, ws) : 1, () => _txt(w.w, x + L.padX + w.x, by, it._font, col, 'left', 'alphabetic', it._ls));
          rects.push({ x: x + L.padX + w.x, y: by - (it.size || L.fs) * 0.78, w: w.wd, h: (it.size || L.fs) * 0.98, w0: w.w });
          wi++;
        }
      });
      if (it.strikeAt != null && t >= it.strikeAt) {   // a strike through the whole message
        const p = eOQ((t - it.strikeAt) / F30(8));
        it._lines.forEach((ln, li) => { const by = top + L.padT + it._lab + li * it._lh + it._lh * 0.80 - (it.size || L.fs) * 0.3;
          rect(x + L.padX - 6, by - 3, (ln.wd + 12) * clamp(p * it._lines.length - li), 6, mine ? TH.lilac : TH.strike); });
      }
      ctx.restore();
      regBox(e.o, x, top, it._w, it._h, { text: e.str, def: it.text });
    });
    out[it.key || it.text] = rects;
  } else if (it.k === 'sys') {
    const n = Math.round(it.text.length * clamp((t - it.a + F30(1)) / 0.3)); const s = it.text.slice(0, n);
    const font = TF.m(L.lbl); const cy = top + 30; const w = tw(it.text, font); const hw = V(140, 70);
    _txt(s, CX, cy, font, TH.mute, 'center');
    const lp = eOQ((t - it.a) / F30(10));
    hline(CX - w / 2 - 22 - hw * lp, cy - 11, hw * lp, 1, TH.rule, 2); hline(CX + w / 2 + 22, cy - 11, hw * lp, 1, TH.rule, 2);
    if (it.strikeAt != null && t >= it.strikeAt) rect(CX - w / 2 - 8, cy - 14, (w + 16) * eOQ((t - it.strikeAt) / F30(8)), 6, TH.strike);
  } else if (it.k === 'end') {
    const e = edText(it.text, null, it.key); const fs = V(66, 52); const font = TF.b(fs, 600); const cy = top + fs;
    const w = tw(e.str, font, -0.01 * fs); const hw = V(160, 60); const lp = eOQ((t - it.a) / F30(12));
    moved(e.o, () => {
      const n = Math.round(e.str.length * clamp((t - it.a + F30(1)) / 0.32));
      ctx.save(); ctx.textAlign = 'left'; _txt(e.str.slice(0, n), CX - w / 2, cy, font, TH.ink, 'left', 'alphabetic', -0.01 * fs); ctx.restore();
      hline(CX - w / 2 - 26 - hw * lp, cy - fs * 0.32, hw * lp, 1, TH.rule, 2); hline(CX + w / 2 + 26, cy - fs * 0.32, hw * lp, 1, TH.rule, 2);
      regBox(e.o, CX - w / 2, cy - fs * 0.8, w, fs * 1.05, { text: e.str, def: it.text });
    });
  } else if (it.k === 'card') {
    const x = it.side === 'right' ? L.x + L.w - it._w : L.x; const im = IMG[it.img]; const [cx, cy, cw, chh] = it.crop;
    grp('card ' + it.img + ' ' + cy, x, top, it._w, it._h, () => {
      ctx.save(); ctx.beginPath(); ctx.rect(x - 4, top - 4, it._w + 8, (it._h + 8) * q); ctx.clip();
      ctx.translate(0, (1 - q) * 18);
      fillRRv(x, top, it._w, it._h, [18, 18, 18, 18], TH.card);
      ctx.save(); pathRRv(x, top, it._w, it._h, [18, 18, 18, 18]); ctx.clip();
      themeFixed(() => ctx.drawImage(im, cx * 2, cy * 2, cw * 2, chh * 2, x, top, it._w, it._ih));
      // highlights: one line after another across [t0, t1], multiply so the words stay readable
      for (const h of it.hl || []) {
        const tot = h.lines.reduce((s, l) => s + l.w, 0); let acc = 0;
        for (const ln of h.lines) {
          const f0 = acc / tot, f1 = (acc + ln.w) / tot; acc += ln.w;
          const p = clamp((((t - h.t0) / Math.max(0.2, h.t1 - h.t0)) - f0) / (f1 - f0)); if (p <= 0) continue;
          ctx.save(); ctx.globalCompositeOperation = 'multiply';
          themeFixed(() => rect(x + (ln.x - cx - 3) * it._k, top + (ln.y - cy - 2) * it._k, (ln.w + 6) * it._k * E.outCubic(p), (ln.h + 4) * it._k, TH.hl));
          ctx.restore();
        }
      }
      ctx.restore();
      rect(x, top + it._ih, it._w, 2, TH.rule);
      _txt(it.credit, x + 26, top + it._ih + 41, TF.m(30), TH.mute);
      strokeRRv(x, top, it._w, it._h, [18, 18, 18, 18], TH.rule, 2);
      ctx.restore();
    }, { img: true });
  } else if (it.k === 'custom') {
    const x = it.side === 'right' ? L.x + L.w - it._w : it.side === 'center' ? CX - it._w / 2 : L.x;
    grp(it.key || 'custom ' + it.a, x, top, it._w, it._h, () => {
      ctx.save(); ctx.beginPath(); ctx.rect(x - 6, top - 6, it._w + 12, (it._h + 12) * q); ctx.clip(); ctx.translate(0, (1 - q) * 18);
      it.draw(x, top, it._w, it._h, t); ctx.restore();
    });
  } else if (it.k === 'quote') {
    const x = it.side === 'right' ? L.x + L.w - it._w : L.x; const e = it._e; const px = V(48, 40);
    moved(e.o, () => {
      ctx.save(); ctx.beginPath(); ctx.rect(x - 4, top - 4, it._w + 8, (it._h + 8) * q); ctx.clip(); ctx.translate(0, (1 - q) * 18);
      fillRRv(x, top, it._w, it._h, [18, 18, 18, 18], TH.card); strokeRRv(x, top, it._w, it._h, [18, 18, 18, 18], TH.rule, 2);
      let wi = 0;
      it._lines.forEach((ln, li) => { const by = top + V(44, 40) + li * it._lh + it._fs * 0.82;
        for (const w of ln.words) { withA(wordA(t, e.times[wi]), () => _txt(w.w, x + px + w.x, by, it._font, TH.ink, 'left', 'alphabetic', it._ls)); wi++; } });
      rect(x, top + it._h - 60, it._w, 2, TH.rule);
      _txt(it.credit, x + 26, top + it._h - 19, TF.m(30), TH.mute);
      ctx.restore();
      regBox(e.o, x, top, it._w, it._h, { text: e.str, def: it.text });
    });
  }
}

function drawInput(L, t, o) {
  if (o.hideInput) return;
  const y = L.anchor + V(84, 96); const font = TF.m(L.lbl);
  hline(L.x, y, L.w, 1, TH.rule, 2);
  const locked = o.endedAt != null && t >= o.endedAt;
  withA(locked ? 0.62 : 1, () => _txt(locked ? 'You can start a new chat' : 'Message…', L.x, y + 56, font, TH.mute));
  _txt('ILLUSTRATION', L.x + L.w, y + 56, font, TH.mute, 'right');
}

/** typing indicator (her side) between t0 and t1, sitting where her next message will land */
function typingDots(t, t0, t1) {
  if (t < t0 || t >= t1) return; const L = TL(); if (LAST_ANCHOR != null) L.anchor = LAST_ANCHOR;
  const a = clamp((t - t0) / F30(6)) * (1 - clamp((t - (t1 - F30(2))) / F30(2)));
  const x = L.x + L.w - 120, y = L.anchor - 64;
  withA(a, () => { fillRRv(x, y, 120, 64, [30, 30, 10, 30], TH.her);
    for (let i = 0; i < 3; i++) circle(x + 37 + i * 23, y + 32 - 7 * Math.max(0, Math.sin((t * 1.6 - i * 0.18) * 2 * Math.PI)), 7, TH.herText); });
}

/* ---------- breakout: one word fills the frame ---------- */
/** text flies from rect `from` (a bubble word) at 60 % to the centre, outExpo 15 f; the white marker wipes in 6 f after 10 f.
 *  o: size [16:9, 9:16], y [16:9, 9:16], key, col, marker (false = none), sub {text, t, size} a line under it */
function breakout(t, t0, text, from, o = {}) {
  if (t < t0) return;
  const e = edText(text, null, o.key || 'breakout ' + text);
  // the word fills 75 % of the width (9:16: 86 %), capped by height (o.size = the cap)
  let fs = 400; let w = tw(e.str, TF.b(fs, 800), -0.045 * fs);
  const target = W * (o.width ? V(o.width[0], o.width[1]) : V(0.75, 0.86)); fs *= target / w;
  const cap = o.size ? V(o.size[0], o.size[1]) : V(720, 520); if (fs > cap) fs = cap;
  w = tw(e.str, TF.b(fs, 800), -0.045 * fs);
  const font = TF.b(fs, 800); const lsF = -0.045 * fs;
  const cy = o.y ? V(o.y[0], o.y[1]) : V(560, 900);
  const p = eOX((t - t0) / F30(15));
  const fx = from ? from.x + from.w / 2 : CX, fy = from ? from.y + from.h / 2 : cy;
  const s0 = from ? Math.max(0.12, Math.min(0.6, (from.h * 1.3) / fs)) : 0.6;
  const s = lerp(o.s0 || s0, 1, p), x = lerp(fx, CX, p), y = lerp(fy, cy - fs * 0.32, p);
  moved(e.o, () => {
    withT(x, y, s, 0, () => {
      const mp = eOQ((t - t0 - F30(10)) / F30(6));
      if (o.marker !== false && mp > 0) rect(-w / 2 - 18, fs * 0.32 - fs * 0.36, (w + 36) * mp, fs * 0.36, TH.marker);
      _txt(e.str, -w / 2, fs * 0.32, font, o.col || TH.ink, 'left', 'alphabetic', lsF);
    });
    regBox(e.o, CX - w / 2, cy - fs * 0.8, w, fs * 0.9, { text: e.str, def: text });
  });
  if (o.sub) { const sfs = V(o.sub.size ? o.sub.size[0] : 64, o.sub.size ? o.sub.size[1] : 52); const sa = eOQ((t - o.sub.t) / F30(8));
    if (t >= o.sub.t) withA(sa, () => txt(o.sub.text, CX, cy + V(150, 120) + (1 - sa) * 16, TF.b(sfs, 600), o.col || TH.ink, 'center')); }
}

/* ---------- source zoom: a real page fills the frame, the exact phrase highlighted as she reads it ----------
 * o: img, crop [x, y, w, h] (page CSS px; image is 2x), t0 (lands), hl [{lines, t0, t1}], credit, fill (fraction of width, default .9 / .96),
 * y (centre), push (scale growth over the screen, default 0.04 around the first highlight line) */
function srcZoom(t, o) {
  const im = IMG[o.img]; const [cx, cy, cw, chh] = o.crop;
  const w = W * (o.fill ? V(o.fill[0], o.fill[1]) : V(0.9, 0.96)); const k = w / cw; const h = chh * k;
  const x = CX - w / 2, y = (o.y ? V(o.y[0], o.y[1]) : V(H / 2 - 30, 900)) - h / 2;
  const q = eOX((t - o.t0) / F30(14));
  const l0 = o.hl[0].lines[0]; const fx = x + (l0.x - cx + l0.w / 2) * k, fy = y + (l0.y - cy + l0.h / 2) * k;
  const s = (0.86 + 0.14 * q) * (1 + (o.push == null ? 0.04 : o.push) * clamp((t - o.t0) / Math.max(1, (o.t1 || o.t0 + 4) - o.t0)));
  ctx.save(); ctx.translate(fx, fy); ctx.scale(s, s); ctx.translate(-fx, -fy);
  withA(clamp((t - o.t0 + F30(1)) / F30(3)), () => grp('page ' + o.img, x, y, w, h + 64, () => {
    themeFixed(() => { ctx.drawImage(im, cx * 2, cy * 2, cw * 2, chh * 2, x, y, w, h); });
    for (const hh of o.hl) {
      const tot = hh.lines.reduce((a, l) => a + l.w, 0); let acc = 0;
      for (const ln of hh.lines) { const f0 = acc / tot, f1 = (acc + ln.w) / tot; acc += ln.w;
        const p = clamp((((t - hh.t0) / Math.max(0.2, hh.t1 - hh.t0)) - f0) / (f1 - f0)); if (p <= 0) continue;
        ctx.save(); ctx.globalCompositeOperation = 'multiply';
        themeFixed(() => rect(x + (ln.x - cx - 4) * k, y + (ln.y - cy - 3) * k, (ln.w + 8) * k * E.outCubic(p), (ln.h + 6) * k, TH.hl));
        ctx.restore(); }
    }
    strokeR(x, y, w, h, TH.rule, 2);
  }, { img: true }));
  ctx.restore();
  if (o.credit) withA(eOQ((t - o.t0 - 0.2) / F30(8)), () => tmono(o.credit, x, y + h + V(96, 100), { col: TH.mute, size: V(32, 30) }));
}

/* ---------- big type lines (night screens and statements) ---------- */
/** lines: [{text, times: [word starts] | t, size: [16:9, 9:16], col, weight, em: [i0, i1, col], y: [16:9, 9:16], strike: t, marker: [i0, i1, t]}]
 *  words rise 0.18 em and sharpen as she says them (outQuint 9 f), align left at x (default L) or centre.
 *  o.snap = the screen's start: words due within 0.25 s of the cut are already on at the cut (no empty frames after a cut) */
function bigLines(t, lines, o = {}) {
  let yc = null;   // a line without y flows under the previous one (gap: ln.gap or 1.15 x its size)
  for (const ln of lines) {
    let fs = V(ln.size[0], ln.size[1]); const serif = ln.face === 's';
    if (ln.fit) {   // one row: shrink the size until it fits the width
      const mw = W - 2 * (o.margin != null ? V(o.margin[0], o.margin[1]) : V(150, 80));
      const ed = EDIT.data.t[SCENE_ID + '/' + keyOf(ln.key || ln.text)]; const w1 = tw(ed && ed.s != null ? ed.s : ln.text, serif ? TF.s(fs, ln.weight || 340) : TF.b(fs, ln.weight || 700), (serif ? -0.015 : -0.03) * fs);
      if (w1 > mw) fs *= mw / w1 * 0.995;
    }
    const font = serif ? TF.s(fs, ln.weight || 340) : TF.b(fs, ln.weight || 700); const ls = (serif ? -0.015 : -0.03) * fs;
    const fontB = serif ? TF.s(fs, 640) : TF.b(fs, 800);
    const e = edText(ln.text, ln.times || null, ln.key);
    const maxW = W - 2 * (o.margin != null ? V(o.margin[0], o.margin[1]) : V(150, 80));
    const rows = wrapWords(e.words, font, ls, maxW); const lh = fs * (ln.lh || 1.06);
    const y0 = ln.y ? V(ln.y[0], ln.y[1]) : (yc == null ? CX : yc + (ln.gap || fs * 1.15)); yc = y0 + (rows.length - 1) * lh; const bw = Math.max(...rows.map(r => r.wd));
    const x0 = o.center ? CX - bw / 2 : (o.x != null ? V(o.x[0], o.x[1]) : V(150, 80));
    const out = ln.out != null ? 1 - eOQ((t - ln.out) / F30(8)) : 1; if (out <= 0) continue;
    moved(e.o, () => {
      let wi = 0;
      rows.forEach((r, ri) => { const by = y0 + ri * lh; const rx = o.center ? CX - r.wd / 2 : x0;
        for (const w of r.words) {
          const ws = e.times[wi] != null && e.times[wi] >= 0 ? e.times[wi] : (ln.t != null ? ln.t + wi * 0.04 : 0);
          const p = o.snap != null && ws <= o.snap + 0.25 && t >= o.snap ? 1 : eOQ((t - ws + F30(1)) / F30(9)); if (p > 0) {
            let col = ln.col || g.fg; if (ln.em) for (const [i0, i1, c] of ln.em) if (wi >= i0 && wi <= i1) col = c;
            if (ln.marker && wi >= ln.marker[0] && wi <= ln.marker[1] && t >= ln.marker[2]) { const mp = eOQ((t - ln.marker[2]) / F30(6));
              rect(rx + w.x - 8, by - fs * 0.36, (w.wd + 16) * mp, fs * 0.4, TH.marker); }
            const bold = ln.bold && wi >= ln.bold[0] && wi <= ln.bold[1];
            withA(p * out, () => _txt(w.w, rx + w.x, by + (1 - p) * fs * 0.18, bold ? fontB : font, col, 'left', 'alphabetic', ls));
          }
          wi++; }
        if (ln.strike != null && t >= ln.strike) rect(rx - 6, by - fs * 0.33, (r.wd + 12) * eOQ((t - ln.strike - ri * F30(3)) / F30(8)), Math.max(6, fs * 0.07), ln.strikeCol || TH.strike);
      });
      regBox(e.o, x0, y0 - fs * 0.8, bw, (rows.length - 1) * lh + fs, { text: e.str, def: ln.text });
    });
  }
}
/** a slow push (scale 1 -> 1 + amt over [t0, t1], around (x, y)) for screens that hold */
function pushed(t, t0, t1, amt, fn, x = CX, y = H / 2) { const s = 1 + amt * clamp((t - t0) / Math.max(0.5, t1 - t0)); ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.translate(-x, -y); try { fn(); } finally { ctx.restore(); } }
/** mono label (>= 32 px), editable */
function tmono(s, x, y, o = {}) {
  let size = o.size || 34; const font0 = TF.m(size, o.w || 400), maxW = o.maxW || (W - 2 * V(150, 80));
  if ((o.align || 'left') === 'left' && tw(s, font0) > maxW) return txtW(s, x, y, font0, o.col || g.mid, maxW, size * 1.35);
  if (o.align === 'center' && tw(s, font0) > maxW) {   // centred: two balanced lines (never past the margins)
    const ws = s.split(' '); let best = 1, bw = Infinity;
    for (let i = 1; i < ws.length; i++) { const w = Math.max(tw(ws.slice(0, i).join(' '), font0), tw(ws.slice(i).join(' '), font0)); if (w < bw) { bw = w; best = i; } }
    if (bw > maxW) size *= maxW / bw;
    const font = TF.m(size, o.w || 400);
    txt(ws.slice(0, best).join(' '), x, y, font, o.col || g.mid, 'center', 'alphabetic', 0, s + ' #1');
    txt(ws.slice(best).join(' '), x, y + size * 1.35, font, o.col || g.mid, 'center', 'alphabetic', 0, s + ' #2');
    return;
  }
  txt(s, x, y, font0, o.col || g.mid, o.align || 'left');
}

/* ---------- sound vocabulary (film.json audio.sfx.roles) ----------
 * notify   her message lands            shutter  a real screenshot card lands       pen    highlighter on the real page
 * hit      a breakout word              type     a system line types on             tape   "This conversation has ended"
 * riser    the build into the slope     fall     the pile slides off the plank      tick   options / small UI
 * strike   a line struck through        paper    a sticker / block lands            clock  a time stamp
 * ding     the answer appears           switch   day <-> night                      whoosh rationed (1 in 6 at most) */
Object.assign(SFX_PRI, { swipe: 5, hit: 7, tape: 7, riser: 7, fall: 6, shutter: 6, switch: 6, ding: 5, pen: 4, whoosh: 5, notify: 3, tick: 3, strike: 4, paper: 3, clock: 3, type: 2 });
Object.assign(SFX_GAP, { swipe: 1.0, hit: 0.3, tape: 0.5, riser: 0.2, fall: 0.3, shutter: 0.6, switch: 0.25, ding: 1.0, pen: 1.0, whoosh: 3.0, notify: 1.6, tick: 0.35, strike: 0.6, paper: 0.35, clock: 0.35, type: 1.2 });

/* sound sync: each role's first peak measured against its visual frame + 1 (soundqa.py, 2026-10-13, round 2) and moved onto it.
 * Peak-aligned files whose first transient comes before their loudest moment (hits, falls, risers) need the most. */
const SFX_SHIFT = { notify: 0.03, shutter: 0.03, hit: 0, tick: 0, paper: 0.03, fall: 0.07, swipe: 0.06, riser: 0.035, switch: 0.03, pop: 0.03, ding: 0.03, type: 0.03, clock: 0.03, tape: -0.03, strike: -0.03 };   // capped at ~1 frame so lab.mjs audit (cue on the picture change, +1 f) and soundqa (first peak at frame + 1) both hold
const _sfx0 = sfx;
sfx = function (name, t, db = 0, extra = {}) { return _sfx0(name, t + (SFX_SHIFT[name] || 0), db, extra); };
