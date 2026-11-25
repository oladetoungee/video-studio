/* Reading Motion v2: timeline core (phrase lookup, scene registry, SFX cues, renderFrame) */
'use strict';
let WORDS = [];
const norm = s => s.toLowerCase().replace(/’/g, "'").replace(/[^a-z0-9']/g, '');
function initWords(raw) { WORDS = raw.map(x => ({ w: x.w, t: x.t + INTRO, e: x.e + INTRO, n: norm(x.w) })); }
let CUR = 0;
/** Find a spoken phrase at/after the cursor (advances it). Returns {t, e, w:[word start times], ew:[word ends]} in video time. */
function P(q, o = {}) {
  const qs = q.split(/\s+/).map(norm).filter(Boolean);
  const from = o.from != null ? o.from : CUR;
  for (let i = from; i <= WORDS.length - qs.length; i++) {
    let ok = true;
    for (let k = 0; k < qs.length; k++) if (WORDS[i + k].n !== qs[k]) { ok = false; break; }
    if (ok) {
      if (!o.peek) CUR = i + qs.length;
      const ws = WORDS.slice(i, i + qs.length);
      return { t: ws[0].t, e: ws[ws.length - 1].e, w: ws.map(x => x.t), ew: ws.map(x => x.e), i };
    }
  }
  const ctxw = WORDS.slice(CUR, CUR + 14).map(x => x.w).join(' ');
  throw new Error(`phrase not found: "${q}" (cursor at ${(WORDS[CUR] || {}).t?.toFixed(2)}: ${ctxw})`);
}
/** resolve a dict of phrases in order: PS({a:'...', b:'...'}) */
function PS(d) { const k = {}; for (const [n, q] of Object.entries(d)) k[n] = P(q); return k; }

const SCENES = [], CUES = [];
let TOTAL = 0;
/** o: grid (bool), trans 'cut' | 'whip', hud (default true) */
function addScene(start, ground, label, draw, o = {}) { SCENES.push({ start, ground, label, draw, grid: !!o.grid, trans: o.trans || 'cut', hud: o.hud !== false }); }
/** SFX cue. extra: {n, d} for typing (n key clicks spread over d seconds) */
function sfx(name, t, db = 0, extra = {}) { if (t == null || isNaN(t)) throw new Error('bad sfx time ' + name); CUES.push({ name, t: +t.toFixed(3), db, ...extra }); }
function sfxType(t, chars, cps = 22, db = 0) { sfx('type', t, db, { n: Math.max(2, Math.round(chars * 0.6)), d: +(chars / cps).toFixed(3) }); }

/** Cut sounds: only where the section changes or a full-bleed blue punchline starts/ends (other cuts are silent). */
function autoCutCues() {
  for (let i = 1; i < SCENES.length; i++) { const a = SCENES[i - 1], b = SCENES[i];
    if (a.ground === b.ground) b.trans = 'whip';            // same ground: whip-slide instead of a cut to the same colour
    if (a.label !== b.label || a.ground === 'blue' || b.ground === 'blue') sfx('cut', b.start + (b.trans === 'whip' ? 0.1 : 0)); }
}
/** Thin the cue list so it never gets busy: higher-priority sounds win, lower ones need clear air around them. */
const SFX_PRI = { hit: 6, cut: 5, whoosh: 5, type: 4, click: 4, hitS: 3, card: 2, mark: 2, tick: 1 };
function pruneCues() {
  const gap = (n) => (n === 'hit' || n === 'cut' ? 0.25 : n === 'tick' ? 4.0 : n === 'mark' ? 3.0 : n === 'card' ? 1.0 : 0.7);
  const order = [...CUES].sort((a, b) => SFX_PRI[b.name] - SFX_PRI[a.name] || a.t - b.t); const kept = [];
  for (const c of order) if (kept.every(k => Math.abs(k.t - c.t) >= gap(c.name))) kept.push(c);
  CUES.length = 0; kept.sort((a, b) => a.t - b.t).forEach(c => CUES.push(c));
}
function sceneIndex(t) { let i = 0; for (let k = 0; k < SCENES.length; k++) if (SCENES[k].start <= t + 1e-9) i = k; return i; }
function paintScene(k, t) {
  const sc = SCENES[k]; g = G[sc.ground];
  if (sc.grid) grid();
  ctx.save(); sc.draw(t, t - sc.start); ctx.restore();
}
function renderFrame(t) {
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.filter = 'none';
  const i = sceneIndex(t); const sc = SCENES[i]; g = G[sc.ground];
  ctx.fillStyle = g.bg; ctx.fillRect(0, 0, W, H);
  const lt = t - sc.start;
  if (sc.trans === 'whip' && i > 0 && lt < 0.26 && SCENES[i - 1].ground === sc.ground) {
    // horizontal whip (the reference's motion-blur slide): old content leaves left, new enters from the right
    const e = E.inOutCubic(lt / 0.26);
    ctx.save(); ctx.globalAlpha = 1 - e; ctx.filter = `blur(${(22 * Math.sin(Math.PI * Math.min(1, e * 1.2))).toFixed(1)}px)`; ctx.translate(-W * 0.3 * e, 0); paintScene(i - 1, t); ctx.restore();
    ctx.save(); ctx.globalAlpha = e; ctx.filter = `blur(${(22 * (1 - e)).toFixed(1)}px)`; ctx.translate(W * 0.22 * (1 - e), 0); paintScene(i, t); ctx.restore();
  } else paintScene(i, t);
  g = G[sc.ground]; ctx.filter = 'none'; ctx.globalAlpha = 1;
  if (sc.hud) hud(t, sc.label);
}
