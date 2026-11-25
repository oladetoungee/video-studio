/* Studio runtime, part 4: footage moments (a talking-head clip with editable motion graphics on top).
 *
 * A "moment" is a short edit of a recorded video: a list of clips of the source (jump cuts), a virtual camera that
 * crops the 4K source (punch-ins, reframing, following her face), and graphics drawn with the normal studio API
 * (addScene, KT, IDX, polaroid, meter...) on a TRANSPARENT canvas. studio/tools/composite.mjs renders the graphics as
 * alpha frames and lets ffmpeg crop the source per frame and lay the graphics over it, in one pass (no intermediates).
 *
 *   manifest   projects/<slug>/talking-head/talking-head.json: source video, word timings, face track, EDL, audio, moments
 *   time       output time t (seconds of the finished clip); outToRaw(t) / rawToOut(tr) map to the source
 *   words      P('phrase') works as in a film: WORDS are her words on the output timeline
 *   camera     CAM(t, {z, fx, fy, d, ease, pad}) adds a camera key (z = zoom over "fit", fx/fy = where her face sits
 *              in the frame, 0..1; d = move duration, 0 = cut). camAt(t) -> crop rect in source pixels.
 *   face       faceOut(t) -> her face box in layout pixels (to place things beside her, never on her)
 *   scenes     shot(start, draw, {id}) draws over the footage; card(start, ground, draw, {id}) is a full-frame card
 *   captions   social captions built from her words (short chunks, the spoken word highlighted)
 *
 * Nothing here changes how films render: it only adds functions (loaded by moment.html, not by film.html).
 */
'use strict';

const FOOT = { man: null, base: '', id: '', m: null, clips: [], cum: [], dur: 0, fps: 30, src: [3840, 2160], faces: null, smooth: {}, keys: [], layers: [], capShort: [], capLong: [] };

/* ---------- time: output <-> source ---------- */
function setClips(clips, tail = 0) {
  FOOT.clips = clips; FOOT.cum = []; let o = 0;
  for (const [a, b] of clips) { FOOT.cum.push(o); o += b - a; }
  FOOT.dur = o; FOOT.tail = tail; TOTAL = o + tail;   // tail: the last frame holds (graphics keep moving, music fades)
}
function clipAt(t) { let k = 0; for (let i = 0; i < FOOT.cum.length; i++) if (FOOT.cum[i] <= t + 1e-9) k = i; return k; }
const isPauseClip = (c) => !!(c && c.length > 2 && c[2] && c[2].pause != null);
function outToRaw(t) { const k = clipAt(t); if (isPauseClip(FOOT.clips[k])) return FOOT.clips[k][2].f / FOOT.fps;   // ("pause her": her held frame)
  return Math.min(FOOT.clips[k][1] - 1 / FOOT.fps, FOOT.clips[k][0] + (t - FOOT.cum[k])); }
function rawToOut(tr) { for (let k = 0; k < FOOT.clips.length; k++) { const [a, b] = FOOT.clips[k]; if (isPauseClip(FOOT.clips[k])) continue; if (tr >= a - 1e-6 && tr < b) return FOOT.cum[k] + tr - a; } return null; }
/** output times of the jump cuts (the joins around a "pause her" insert are not jump cuts) */
const cutTimes = () => (FOOT.pauses && FOOT.pauses.length ? FOOT.cum.filter((t, k) => k > 0 && !isPauseClip(FOOT.clips[k]) && !isPauseClip(FOOT.clips[k - 1])) : FOOT.cum.slice(1));

/* ---------- "pause her" (her rule 2026-11-02: "if it's a big deal, stop the video, put a blank screen that types whatever it is") ----------
 * A correction insert: at a point of her cleaned timeline her picture AND voice stop for d seconds, a plain screen in the
 * video's own look types the correction on, then her video goes on exactly where it stopped. Everything after it moves
 * later (her words, captions, layouts timed by P()/PS(), sound cues, chapters read from the export).
 * Where it is set (all merged by id; later wins):
 *   talking-head.json "pauses": [...]          every full edit / moment / short whose cut contains that second (not teasers)
 *   moment "pauses": [...]                     this moment only (moment "pauses": false: none of the manifest's)
 *   edits/<id>.json "pauses": {"<id>": {...}}  the moment editor (add at the playhead, text, duration, look, sound, delete = {off: true})
 * A pause: {"id": "fix-aiss", "at": 66.55, "d": 3.5, "text": "Update: ...", "look": "card" | "frozen", "sound": true,
 *           "ground": "<G key>", "exact": false}  or the short form [at, d] / [at, d, "text"].
 * at = a second of her SOURCE recording (raw); it moves to the end of the word she is saying there (exact: true keeps it)
 * and to a frame. look "card" (default): a full-frame card in TH.look's ground; "frozen": her last frame held, the text on a
 * flat plate. sound: a soft keyboard bed under the typing (role typeSoft). The text is editable on the canvas
 * (element pause-<id>/text) and its block can be moved / resized (pause-<id>/@box). The EDL is not touched: the pause is a
 * clip [at, at + d, {pause: id, f: held source frame}] added when the moment loads (composite.mjs holds the frame, footmix.py
 * makes the silence). No pause anywhere = nothing changes. */
FOOT.pauses = [];
function pauseSpecs(man, m, ed) {
  const norm1 = (p, i, src) => { const o = Array.isArray(p) ? { at: p[0], d: p[1], ...(p[2] != null ? { text: String(p[2]) } : {}) } : { ...p };
    if (!o.id) o.id = 'p' + (+o.at).toFixed(2).replace('.', '_'); o.src = src; return o; };
  const by = new Map();
  if (m.kind !== 'teaser' && m.pauses !== false && Array.isArray(man.pauses)) man.pauses.forEach((p, i) => { const o = norm1(p, i, 'manifest'); by.set(o.id, o); });
  if (Array.isArray(m.pauses)) m.pauses.forEach((p, i) => { const o = norm1(p, i, 'moment'); by.set(o.id, o); });
  for (const [id, p] of Object.entries((ed && ed.pauses) || {})) { if (!p || typeof p !== 'object') continue; const o = { ...(by.get(id) || { src: 'editor' }), ...p, id }; by.set(id, o); }
  return [...by.values()].filter(p => !p.off && Number.isFinite(+p.at) && +p.d > 0);
}
/** clips + pauses -> clips with the pause inserts; sets FOOT.pauses (output times) */
function applyPauses(clips, specs, raw) {
  const fps = FOOT.fps; let cl = clips.map(c => c.slice()); const done = [];
  const sorted = specs.map(p => ({ ...p })).sort((a, b) => a.at - b.at);
  for (const p of sorted) {
    let at = +p.at;
    if (!p.exact && raw) { const w = raw.find(x => x.t < at - 0.01 && at < x.e - 0.01); if (w) at = w.e; }   // never inside a word: after it
    const fa = Math.round(at * fps); at = fa / fps; const n = Math.max(2, Math.round(+p.d * fps));
    let k = cl.findIndex(c => !isPauseClip(c) && at >= c[0] - 1e-6 && at < c[1] - 1e-6);
    if (k < 0) { k = cl.findIndex(c => !isPauseClip(c) && c[0] > at); if (k <= 0) continue; }   // in a cut-out stretch: before the next clip (outside the moment: skipped)
    else if (Math.round(cl[k][0] * fps) < fa) { cl.splice(k, 1, [cl[k][0], at], [at, cl[k][1]]); k++; }   // inside a clip: split it there
    const prev = cl.slice(0, k).reverse().find(c => !isPauseClip(c));
    const f = prev ? Math.round(prev[1] * fps) - 1 : Math.round(cl[k][0] * fps);   // the frame she stopped on
    cl.splice(k, 0, [+(fa / fps).toFixed(4), +((fa + n) / fps).toFixed(4), { pause: p.id, f }]);
    done.push(p);
  }
  return { clips: cl, done };
}
function placePauses(done) {
  FOOT.pauses = []; FOOT.clips.forEach((c, k) => { if (!isPauseClip(c)) return; const p = done.find(x => x.id === c[2].pause); if (!p) return;
    const fps = FOOT.fps, f0 = FOOT.clips.slice(0, k).reduce((n, q) => n + Math.round(q[1] * fps) - Math.round(q[0] * fps), 0),   // (frames as composite.mjs frameMap counts them)
      t0 = f0 / fps, t1 = (f0 + Math.round((c[1] - c[0]) * fps)) / fps; FOOT.pauses.push({ ...p, t0, t1, d: t1 - t0, f: c[2].f, rawAt: c[0] }); });
  if (FOOT.pauses.length) FOOT.capBreaks = [...(FOOT.capBreaks || []), ...FOOT.pauses.map(p => p.t1)].sort((a, b) => a - b);   // a caption never spans a pause
}
/** no caption line hangs into a pause (they break there already; this ends the last one where the pause starts) */
function clampCapsToPauses() {
  if (!FOOT.pauses.length) return;
  const cl = (L) => { for (const c of L || []) for (const p of FOOT.pauses) if (c.t0 < p.t0 && c.t1 > p.t0) c.t1 = p.t0; };
  cl(FOOT.capShort); cl(FOOT.capLong); cl(FOOT.caps16); if (typeof TH !== 'undefined') cl(TH.caps);
  CAPTIONS = FOOT.capLong.map(c => ({ i: c.i, t0: c.t0, t1: c.t1, text: c.text }));
}
const PAUSE = { lead: 0.3, read: 1.4, cps: 26, caret: 0.5 };
/** typing timing of a pause: {s: typing start, td: typing duration} (the text gets at least PAUSE.read s to be read) */
function pauseTiming(p, n) { const s = p.t0 + PAUSE.lead; const td = Math.max(0.3, Math.min(n / PAUSE.cps, p.d - PAUSE.lead - PAUSE.read)); return { s, td }; }
const pauseText = (p) => { const e = EDIT.data.t['pause-' + p.id + '/text']; return e && e.s != null ? e.s : (p.text || 'Update: type the correction here'); };
/** the typing sound (role typeSoft, a soft keyboard bed, exactly as long as the typing); other sounds inside the pause go */
function pauseCues() {
  if (!FOOT.pauses.length) return;
  for (let i = CUES.length - 1; i >= 0; i--) { const c = CUES[i]; if (!/^@/.test(c.name) && FOOT.pauses.some(p => c.t > p.t0 + 0.02 && c.t < p.t1 - 0.02)) CUES.splice(i, 1); }
  for (const p of FOOT.pauses) { if (p.sound === false) continue; const { s, td } = pauseTiming(p, pauseText(p).length); sfx('typeSoft', s, p.db || 0, { len: +td.toFixed(3), d: +td.toFixed(3), keep: true }); }
}
function pauseLook(p) {
  const L = typeof TH !== 'undefined' && TH.look ? TH.look : {}; const gk = p.ground || L.ground || 'paper'; const gp = G[gk] || G.paper;
  return { bg: gp.bg, fg: p.fg || gp.fg, acc: p.acc || gp.acc, disp: L.disp || F.disp, ls: L.dispLS != null ? L.dispLS : LS.disp };
}
/** wrap s (explicit line breaks kept) into lines no wider than maxW */
function pauseWrap(s, font, ls, maxW) { const out = []; for (const part of String(s).split('\n')) { let cur = ''; for (const w of part.split(/\s+/).filter(Boolean)) { const nx = cur ? cur + ' ' + w : w; if (cur && tw(nx, font, ls) > maxW) { out.push(cur); cur = w; } else cur = nx; } out.push(cur); } return out; }
/** drawn above everything (captions, labels) while a pause is on */
function drawPauses(t) {
  if (!FOOT.pauses.length) return; const fr = Math.round(t * FOOT.fps); const p = FOOT.pauses.find(x => fr >= Math.round(x.t0 * FOOT.fps) && fr < Math.round(x.t1 * FOOT.fps)); if (!p) return;   // (by frame: exactly the held frames)
  const lk = pauseLook(p); const v = visRect() || [0, 0, W, H]; const frozen = p.look === 'frozen';
  ctx.save(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.filter = 'none';
  if (!frozen) { ctx.fillStyle = lk.bg; ctx.fillRect(0, 0, CW, CH); EL.list.length = 0; }   // (the card hides everything: only its own text and block stay clickable)
  ctx.setTransform(...BASE);
  SCENE_ID = 'pause-' + p.id; EL.seen.clear();
  const str = pauseText(p); const o = ovr('text');
  const maxW = v[2] * (PORTRAIT ? 0.84 : 0.76), maxL = PORTRAIT ? 7 : 4;
  let size = PORTRAIT ? 84 : 92, font, ls, lines;
  for (;;) { font = lk.disp(size); ls = lk.ls * size; lines = pauseWrap(str, font, ls, maxW); if ((lines.length <= maxL && Math.max(...lines.map(l => tw(l, font, ls))) <= maxW) || size <= 44) break; size -= 4; }
  const lh = size * 1.12, bw = Math.max(...lines.map(l => tw(l, font, ls)), size), bh = (lines.length - 1) * lh + size * 1.05;
  const x0 = v[0] + (v[2] - (frozen ? bw : maxW)) / 2, y0 = frozen ? v[1] + v[3] * (PORTRAIT ? 0.62 : 0.66) - bh / 2 : v[1] + (v[3] - bh) / 2;
  const pad = size * 0.5;
  // typed so far (deterministic: a pure function of t); a label before ':' (e.g. "Update:") in the accent colour
  const n = str.length; const { s, td } = pauseTiming(p, n); const shown = Math.floor(clamp((t - s) / td) * n + 1e-6);
  const lab = (str.match(/^[^:\n]{1,16}:/) || [''])[0].length;
  grp('box', x0 - pad, y0 - pad, bw + pad * 2, bh + pad * 2, () => {
    if (frozen) rect(x0 - pad, y0 - pad, bw + pad * 2, bh + pad * 2, lk.bg);
    moved(o, () => {
      let k = 0, cx = x0, cy = y0 + size * 0.8;
      lines.forEach((ln, i) => { const y = y0 + size * 0.8 + i * lh; const vis = ln.slice(0, Math.max(0, Math.min(ln.length, shown - k)));
        if (vis) { const a = Math.max(0, Math.min(vis.length, lab - k)); if (a) _txt(vis.slice(0, a), x0, y, font, lk.acc, 'left', 'alphabetic', ls);
          if (vis.length > a) _txt(vis.slice(a), x0 + (a ? tw(vis.slice(0, a), font, ls) : 0), y, font, lk.fg, 'left', 'alphabetic', ls); }
        if (i === 0 || shown > k) { cx = x0 + tw(vis, font, ls); cy = y; }
        k += ln.length; });
      if (t >= s - 1e-6 && t < s + td + PAUSE.caret) rect(cx + size * 0.06, cy - size * 0.74, Math.max(4, size * 0.09), size * 0.86, lk.acc);   // a steady caret (no blinking)
      regBox(o, x0, y0, bw, bh, { text: str, def: p.text || 'Update: type the correction here' });
    });
  }, { label: 'correction' });
  ctx.restore();
}

/** her words on the output timeline (drops words that were cut). Sets core WORDS, so P()/PS() work. */
/** a teaser's bites never share a caption (and a word repeated across two bites is not a retake): FOOT.capBreaks = the
 *  output times where a new bite starts (from edl.json "bites"; null for every other moment) */
const capBreak = (pv, w) => !!(pv && FOOT.capBreaks && FOOT.capBreaks.some(b => pv.t < b - 1e-6 && w.t >= b - 1e-6));
function initMomentWords(raw) {
  INTRO = 0; const out = [];
  // a word belongs to the clip that holds its start, or (2026-11-07) to one that holds at least half of it: whisper often
  // starts a word inside the silence the edit trimmed ("in a [year]" lost its caption); such a word starts at the clip's edge
  const used = new Set(), inClip = (w, a, b) => (w.t >= a - 0.08 && w.t < b - 0.03) || (Math.min(w.e, b) - Math.max(w.t, a) >= 0.5 * Math.max(0.05, w.e - w.t));
  FOOT.clips.forEach(([a, b, x], k) => {
    if (x && x.pause != null) return;   // ("pause her": no words in a pause)
    for (const w of raw) if (!used.has(w) && inClip(w, a, b)) { used.add(w); const t = FOOT.cum[k] + Math.max(0, w.t - a); out.push({ w: w.w, t, e: Math.min(FOOT.cum[k] + (b - a), t + Math.max(0.08, w.e - w.t)), k }); }
  });
  // a word repeated across a jump cut (her retake) keeps only its second take
  for (let i = out.length - 1; i > 0; i--) if (out[i].k !== out[i - 1].k && norm(out[i].w) === norm(out[i - 1].w) && out[i].t - out[i - 1].t < 0.35 && !capBreak(out[i - 1], out[i])) out.splice(i - 1, 1);
  initWords(out); CUR = 0; return out;
}

/* ---------- face track ---------- */
// faces: {fps, t0, src, faces: [[x,y,w,h]|null]} normalised. Missing samples are interpolated; then a Gaussian smooth.
function prepFaces(f) {
  FOOT.faces = f; FOOT.src = f.src || FOOT.src;
  const n = f.faces.length, ch = [[], [], [], []];
  let last = null;
  for (let i = 0; i < n; i++) { const v = f.faces[i]; if (v) { last = v; } for (let c = 0; c < 4; c++) ch[c].push(v ? v[c] : null); }
  for (let c = 0; c < 4; c++) { // fill gaps linearly
    const a = ch[c]; let i = 0; while (i < n && a[i] == null) i++; const first = i < n ? a[i] : [0.45, 0.3, 0.2, 0.36][c];
    for (let k = 0; k < i; k++) a[k] = first;
    for (; i < n; i++) if (a[i] == null) { let j = i; while (j < n && a[j] == null) j++; const v0 = a[i - 1], v1 = j < n ? a[j] : v0; for (let k = i; k < j; k++) a[k] = lerp(v0, v1, (k - i + 1) / (j - i + 1)); i = j; }
  }
  FOOT.faceCh = ch;
}
function smoothFaces(sigmaS) {
  const key = sigmaS.toFixed(2); if (FOOT.smooth[key]) return FOOT.smooth[key];
  const f = FOOT.faces, sig = Math.max(0.01, sigmaS * f.fps), R = Math.ceil(sig * 3), ker = [];
  for (let k = -R; k <= R; k++) ker.push(Math.exp(-0.5 * (k / sig) ** 2));
  const out = FOOT.faceCh.map(a => a.map((_, i) => { let s = 0, w = 0; for (let k = -R; k <= R; k++) { const j = i + k; if (j < 0 || j >= a.length) continue; s += a[j] * ker[k + R]; w += ker[k + R]; } return s / w; }));
  FOOT.smooth[key] = out; return out;
}
/** her face at source time tr: {x, y, w, h, cx, cy} in source pixels (smoothed with sigma seconds) */
function faceRaw(tr, sigma = 0.6) {
  const f = FOOT.faces, S = smoothFaces(sigma), u = (tr - (f.t0 || 0)) * f.fps; const i = clamp(Math.floor(u), 0, S[0].length - 1), j = Math.min(S[0].length - 1, i + 1), p = clamp(u - i);
  const v = S.map(a => lerp(a[i], a[j], p)); const [sw, sh] = FOOT.src;
  return { x: v[0] * sw, y: v[1] * sh, w: v[2] * sw, h: v[3] * sh, cx: (v[0] + v[2] / 2) * sw, cy: (v[1] + v[3] / 2) * sh };
}

/* ---------- camera ---------- */
// The output frame is always filled by a crop of the source with the frame's aspect. "fit" (z = 1) is the full source
// height: 16:9 = the whole 4K frame, 9:16 = a 1215x2160 slice. z > 1 punches in (lossless up to 2x in 16:9, ~1.12x in
// 9:16); z < 1 (with pad) shows the whole frame smaller with flat ground around it (a "window").
const CAMCFG = { sigma: { '16x9': 1.4, '9x16': 0.7 }, fy9: 0.40 };
/** add a camera key. o: z (zoom), fx, fy (face position 0..1, null = natural), d (seconds to move; 0 = cut), ease, pad,
 *  box [x, y, w, h] (layout px: where her picture sits; default the whole frame. A smaller box shows her there, the crop
 *  takes the box's shape: half-and-half, corner cam. Moves between keys interpolate it, so she can shrink into a corner),
 *  face (0..1: zoom so her face is this share of the box height, from the smoothed face track; overrides z) */
function CAM(t, o = {}) { const k = { t, z: o.z == null ? 1 : o.z, fx: o.fx, fy: o.fy, d: o.d || 0, ease: o.ease || 'inOut', pad: !!o.pad, sigma: o.sigma, box: o.box || null, face: o.face || null };
  if (o.resize) k.resize = o.resize; if (o.tag) k.tag = o.tag;   // (opt-in: a box that changes size during the move, in o.resize steps; tag: who set it)
  FOOT.keys.push(k); FOOT.keys.sort((a, b) => a.t - b.t); return k; }
const CAM_EASE = { inOut: E.inOutCubic, out: E.outQuart, outExpo: E.outExpo, lin: E.lin, sine: (x) => 0.5 - 0.5 * Math.cos(Math.PI * x), inOutQuart: E.inOutQuart, outQuint: E.outQuint };
function natural(tr) { // where her face sits at fit (z = 1), as fractions of the output frame
  const [sw, sh] = FOOT.src, f = faceRaw(tr, CAMCFG.sigma[LAYOUT] || 1);
  if (!PORTRAIT) return { fx: f.cx / sw, fy: f.cy / sh };
  return { fx: 0.5, fy: CAMCFG.fy9 };
}
const footFullBox = () => [0, 0, W, H];
/** the crop size at z = 1 for a box of this shape (the full source height; a box wider than the source: its full width) */
function footFitCrop(box) { const [sw, sh] = FOOT.src; let bw = sh * box[2] / box[3], bh = sh; if (bw > sw) { bw = sw; bh = sw * box[3] / box[2]; } return [bw, bh]; }
function camParams(t) {
  const K = FOOT.keys, tr = outToRaw(t), nat = natural(tr);
  const res = (k) => { const box = k.box || null; let z = k.z;
    if (k.face) { const f = faceRaw(tr, 2.0); const bh = footFitCrop(box || footFullBox())[1]; z = Math.max(0.2, bh * k.face / Math.max(1, f.h)); }
    return { z, fx: k.fx == null ? (box ? 0.5 : nat.fx) : k.fx, fy: k.fy == null ? (box ? 0.42 : nat.fy) : k.fy, pad: k.pad, box }; };
  if (!K.length || t < K[0].t) return { z: 1, fx: nat.fx, fy: nat.fy, pad: false, box: null };
  let i = 0; for (let k = 0; k < K.length; k++) if (K[k].t <= t + 1e-9) i = k;
  const k = K[i], to = res(k);
  if (!k.d || i === 0 || t >= k.t + k.d) return to;
  // moving: from the state at this key's start (the previous key's end state), eased
  const from = res(K[i - 1]); const p = (CAM_EASE[k.ease] || E.inOutCubic)(clamp((t - k.t) / k.d));
  // zoom interpolates in log space (a constant-feeling push); a box moves with the same ease
  // a box keeps its size through a move (the export scales each box size once); only its place slides
  const fb = from.box || footFullBox(), tb = to.box || footFullBox();
  let box = from.box || to.box ? (fb[2] === tb[2] && fb[3] === tb[3] ? fb.map((v, j) => lerp(v, tb[j], p)) : to.box) : null;
  // opt-in (k.resize = n steps): the box also changes size, in n steps (the export scales each size in its own branch, so a few
  // sizes, not one per frame); its centre glides with the ease. Without it a new size starts at once, as before.
  if (k.resize && box && !(fb[2] === tb[2] && fb[3] === tb[3])) { const n = Math.max(1, Math.round(k.resize)), q = Math.round(p * n) / n;
    const w = Math.round(lerp(fb[2], tb[2], q)), h = Math.round(lerp(fb[3], tb[3], q)); const cx = lerp(fb[0] + fb[2] / 2, tb[0] + tb[2] / 2, p), cy = lerp(fb[1] + fb[3] / 2, tb[1] + tb[3] / 2, p);
    box = q >= 1 ? tb : [cx - w / 2, cy - h / 2, w, h]; }
  return { z: Math.exp(lerp(Math.log(from.z), Math.log(to.z), p)), fx: lerp(from.fx, to.fx, p), fy: lerp(from.fy, to.fy, p), pad: from.pad || to.pad, box };
}
/** the part of the layout the canvas shows (layout px) when the frame is a fitted window of it (1:1, 4:5); null = all of it */
function visRect() { return BASE[0] === 1 && BASE[3] === 1 && BASE[4] === 0 && BASE[5] === 0 ? null : [-BASE[4] / BASE[0], -BASE[5] / BASE[3], CW / BASE[0], CH / BASE[3]]; }
/** crop rect in source pixels at output time t: {x, y, w, h, z, box} (+ face in source px). box: where it lands (layout px).
 *  A fitted frame (1:1, 4:5: visRect) crops the part of the camera's picture the window shows (vis: that window, layout px). */
function camAt(t) {
  const [sw, sh] = FOOT.src, c = camParams(t), tr = outToRaw(t);
  const f = faceRaw(tr, CAMCFG.sigma[LAYOUT] || 1);
  const box = c.box || footFullBox();
  let bh = sh, bw = sh * box[2] / box[3]; if (c.box && bw > sw) { bw = sw; bh = sw * box[3] / box[2]; }
  const cw = bw / c.z, ch = bh / c.z;
  let x = f.cx - c.fx * cw, y = f.cy - c.fy * ch;
  x = cw >= sw ? (sw - cw) / 2 : clamp(x, 0, sw - cw);
  if (!c.pad) y = ch >= sh ? (sh - ch) / 2 : clamp(y, 0, sh - ch);
  else y = Math.max(0, y);   // window framing: padding only ever below the picture (a panel covers it), never a strip on top
  const v = !c.box && visRect();
  if (v) {   // the window's share of the crop (kept inside the source sideways; vertically as above)
    const nw = cw * v[2] / W, nh = ch * v[3] / H; let nx = x + v[0] / W * cw, ny = y + v[1] / H * ch;
    nx = nw >= sw ? (sw - nw) / 2 : clamp(nx, 0, sw - nw);
    if (!c.pad) ny = nh >= sh ? (sh - nh) / 2 : clamp(ny, 0, sh - nh); else ny = Math.max(0, ny);
    return { x: nx, y: ny, w: nw, h: nh, z: c.z, face: f, box, boxed: false, vis: v };
  }
  return { x, y, w: cw, h: ch, z: c.z, face: f, box, boxed: !!c.box };
}
/** map a source-pixel point to layout pixels for the crop cam */
function srcToOut(cam, sx, sy) { const b = cam.box, v = cam.vis; return b && cam.boxed ? [b[0] + (sx - cam.x) / cam.w * b[2], b[1] + (sy - cam.y) / cam.h * b[3]] : v ? [v[0] + (sx - cam.x) / cam.w * v[2], v[1] + (sy - cam.y) / cam.h * v[3]] : [(sx - cam.x) / cam.w * W, (sy - cam.y) / cam.h * H]; }
/** her face box in layout pixels at output time t: {x, y, w, h, cx, cy, top, bottom} */
function faceOut(t) {
  const cam = camAt(t), f = cam.face; const [x0, y0] = srcToOut(cam, f.x, f.y), [x1, y1] = srcToOut(cam, f.x + f.w, f.y + f.h);
  return { x: x0, y: y0, w: x1 - x0, h: y1 - y0, cx: (x0 + x1) / 2, cy: (y0 + y1) / 2, top: y0, bottom: y1 };
}
/** where the source picture is in the frame (layout px): only differs from the frame in pad (window) mode or with a box */
function footRect(t) { const cam = camAt(t); const [x0, y0] = srcToOut(cam, 0, 0), [x1, y1] = srcToOut(cam, FOOT.src[0], FOOT.src[1]); return { x: x0, y: y0, w: x1 - x0, h: y1 - y0 }; }
/** per-frame crop rects for the renderer (canvas pixels of the source), plus the padding they need.
 *  A frame whose picture sits in a box (not the whole frame) gets 4 more numbers: the box in canvas pixels. */
function momentCams(f0, f1) {
  const out = []; let padT = 0, padB = 0; const s = CW / W, fitted = !!visRect();   // (a fitted frame: layout px -> canvas px through BASE)
  for (let f = f0; f < f1; f++) { const c = camAt(f / FOOT.fps); const r = [c.x, c.y, c.w, c.h];
    if (c.boxed) { if (fitted) r.push(c.box[0] * BASE[0] + BASE[4], c.box[1] * BASE[3] + BASE[5], c.box[2] * BASE[0], c.box[3] * BASE[3]); else r.push(c.box[0] * s, c.box[1] * s, c.box[2] * s, c.box[3] * s); } out.push(r); padT = Math.max(padT, -c.y); padB = Math.max(padB, c.y + c.h - FOOT.src[1]); }
  return { cams: out, padT: Math.ceil(padT / 2) * 2 + 2 * (padT > 0), padB: Math.ceil(padB / 2) * 2 + 2 * (padB > 0) };
}

/* ---------- scenes ---------- */
/** a shot: graphics over the footage (transparent ground). ground sets the palette g for what it draws (default ink: light text). */
function shot(start, draw, o = {}) { addScene(start, o.ground || 'ink', o.label || '', draw, { id: o.id, hud: false }); SCENES[SCENES.length - 1].over = true; }
/** a full-frame card (flat ground, her voice continues): punchlines, lists, the contents page */
function card(start, ground, draw, o = {}) { addScene(start, ground, o.label || '', draw, { id: o.id, hud: false, grid: !!o.grid }); SCENES[SCENES.length - 1].card = true; }
/** something drawn on every frame above the scenes (fn(t)) */
function layer(fn) { FOOT.layers.push(fn); }
function finishMoment() {
  SCENES.sort((a, b) => a.start - b.start);
  SCENES.forEach((s, i) => { s.n = i + 1; if (!s.id) s.id = 'shot' + (i + 1); });
  pruneCues();
}
const SHOWF = { graphics: true };
/** one frame of the graphics layer (transparent where the footage shows) */
function renderMoment(t) {
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.globalAlpha = 1; ctx.filter = 'none'; EL.list.length = 0;
  ctx.clearRect(0, 0, CW, CH); FOOT.capYNow = null; FOOT.panelRect = null; FOOT.capBoxNow = null; FOOT.capX = null;   // a draw call may move the captions for this frame (e.g. onto a panel)
  ctx.setTransform(...BASE);
  if (FOOT.under) { ctx.save(); FOOT.under(t); ctx.restore(); }   // (layouts.js: flat bands around a framed picture, e.g. shorts in a 4:5 window; unset = as before)
  if (SCENES.length && SHOWF.graphics) {
    const i = sceneIndex(t), sc = SCENES[i]; g = G[sc.ground];
    if (sc.card && t >= sc.start) { ctx.fillStyle = g.bg; ctx.fillRect(0, 0, W, H); }
    if (t >= sc.start - 1e-9) paintScene(i, t);
    g = G.ink; SCENE_ID = 'layer'; EL.seen.clear();
    for (const fn of FOOT.layers) { ctx.save(); fn(t); ctx.restore(); }
  }
  ctx.filter = 'none'; ctx.globalAlpha = 1;
  if (FOOT.th) { const r = TH.post(t); drawPauses(t); return r; }   // layouts / shorts (runtime/layouts.js): label, captions, end card (a "pause her" card above all)
  // 9:16: a full-frame card spells the phrase itself, so the captions step aside while it is up
  // (16:9 too: her 16:9 captions step aside on a full-frame card, as the 9:16 ones always did)
  if (SHOW.captions && !(SCENES.length && SCENES[sceneIndex(t)].card && t >= SCENES[sceneIndex(t)].start)) drawMomentCaptions(t);
  drawPauses(t);
}

/* ---------- captions (built from her words) ---------- */
// short: 1-3 words / <= 18 chars per chunk (social, burned in, the spoken word highlighted). long: subtitle lines (.srt).
function buildCaptions() {
  const chunk = (maxW, maxC) => {
    const out = []; let cur = [];
    const flush = () => { if (cur.length) out.push(cur); cur = []; };
    WORDS.forEach((w, i) => {
      const prev = WORDS[i - 1];
      if (cur.length && (cur.length >= maxW || (cur.map(x => x.w).join(' ') + ' ' + w.w).length > maxC || (prev && w.t - prev.e > 0.45) || capBreak(prev, w))) flush();
      cur.push(w);
      if (/[.?!,;:]$/.test(w.w) && cur.length >= Math.min(2, maxW)) flush();
    });
    flush();
    return out.map((ws, i) => ({ i, ws, t0: Math.max(0, ws[0].t - 0.06), text: ws.map(x => x.w).join(' ') }));
  };
  const fin = (cs, hold) => cs.map((c, i) => ({ ...c, t1: Math.min(i + 1 < cs.length ? cs[i + 1].t0 : TOTAL, c.ws[c.ws.length - 1].e + hold) }));
  FOOT.capShort = fin(chunk(3, 18), 0.5); FOOT.capLong = fin(chunk(9, 46), 0.8);
  CAPTIONS = FOOT.capLong.map(c => ({ i: c.i, t0: c.t0, t1: c.t1, text: c.text }));
}
const CAPSTYLE = { y: 1540, size: 60 };   // portrait band 1460..1660
function drawMomentCaptions(t) {
  if (!PORTRAIT) return drawCaptions16(t);  // landscape: her 16:9 caption style (below); the .srt is made as before
  const cs = FOOT.capShort; let c = null; for (const x of cs) if (x.t0 <= t && t < x.t1) c = x; if (!c) return;
  const cst = EDIT.data.captions9 || {};   // her size slider / position (9:16), absent = as designed
  const size = cst.size ? clamp(Math.round(cst.size), CAPSIZE.min9, CAPSIZE.max9) : CAPSTYLE.size, font = F.body(size, 800), padX = size * 0.28, sp = tw(' ', font);
  const dy9 = cst.y != null ? clamp(cst.y, CAPSIZE.y9[0], CAPSIZE.y9[1]) - CAPSTYLE.y : 0;
  // edits.json "capShort": {"<chunk index>": "text"} rewrites a burned-in chunk ("captions" is for the .srt lines)
  const ce = (EDIT.data.capShort || {})[c.i];
  const strs = ce != null ? ce.split(/\s+/) : c.ws.map(w => w.w);
  const ws = strs.map(s => tw(s, font)); const total = ws.reduce((a, b) => a + b, 0) + sp * (strs.length - 1);
  const p = sn(t, c.t0, 0.16); const y = (FOOT.capYNow || CAPSTYLE.y) + dy9 + 18 * (1 - p);
  ctx.save(); ctx.globalAlpha *= clamp(p * 1.6);
  rect(CX - total / 2 - padX, y - size * 0.95, total + padX * 2, size * 1.28, C.ink);
  let x = CX - total / 2;
  strs.forEach((s, k) => {
    const w = c.ws[Math.min(k, c.ws.length - 1)]; const on = t >= w.t - 0.04;
    if (on && (k === c.ws.length - 1 || t < c.ws[k + 1].t - 0.04)) rect(x - 8, y - size * 0.86, ws[k] + 16, size * 1.1, C.blue);
    _txt(s, x, y, font, on ? C.paper : 'rgba(237,233,226,0.78)');
    x += ws[k] + sp;
  });
  ctx.restore();
  regBox({ id: 'caption/' + c.i, edited: ce != null, hide: false }, CX - total / 2 - padX, y - size * 0.95, total + padX * 2, size * 1.28, { kind: 'caption', text: strs.join(' '), def: c.text, cue: c.i });
}

/* ---------- 16:9 captions in her style (inspiration/know-how/her-caption-style-16x9.png) ----------
 * Measured from her frame: Helvetica Neue Light (the Mac's own font, drawn by name, never copied), pale cream #E2D8CC
 * (the caption pixels' core colour), tracking -0.05 em (about -2 px at the sample's size), 92 px at 1080 (cap height 68 px,
 * 6.3 % of the frame height), centred in the lower third; one breath per chunk, one line (<= 42 characters) or two
 * balanced lines; lowercase as spoken (names and "I" kept, no full stops); hard swaps, no animation; no box.
 * Contrast: per chunk, the picture behind the words is measured (the footage from her 4K source at two moments of the
 * chunk, framed by the moment's camera: FOOT.capBg, made by composite.mjs capbg; plus whatever graphics are under the
 * caption in this frame). When the text against the 75th-percentile luminance behind it is under 3:1, a faint black rounded
 * box goes behind the words: just as dark as 3:1 needs, 25-35 % black on her footage (up to 55 % over a light film panel).
 * Edits: "captions16": {size, y} (her size slider and height, px at 1080), "cap16": {"<chunk>": "text"} (a corrected chunk).
 * Words: the moment's words file (her corrected words), never raw whisper. */
const CAP16 = { size: 92, y: 905, weight: 300, ls: -0.05, col: '#E2D8CC', chunk: 42, maxW: 0.8, lh: 1.1, asc: 0.72, desc: 0.24,
  weak: new Set(['a', 'an', 'the', 'of', 'to', 'and', 'or', 'but', 'in', 'on', 'at', 'for', 'with', 'from', 'by', 'as', 'is', 'are', 'was', 'be', 'that', 'this', 'my', 'your', 'their', 'our', 'its', 'if', 'so', 'not', 'i', 'we', 'you', 'they', 'he', 'she', 'it’s', "it's", 'i’m', "i'm", 'there', 'what', 'how', 'about', 'than', 'very', 'just']),
  need: 3, box: { min: 0.25, max: 0.55, film: 0.72, radius: 12, padX: 0.3, padY: 0.2 }, band: { y0: 540, cell: 32 }, at: [0.3, 0.7] };
const CAPSIZE = { min16: 48, max16: 140, y16: [600, 1030], min9: 40, max9: 130, y9: [1100, 1800] };
const _lin = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
const LIN8 = Array.from({ length: 256 }, (_, i) => _lin(i));
const relLum = (hex) => { const n = parseInt(hex.slice(1), 16); return 0.2126 * LIN8[n >> 16] + 0.7152 * LIN8[(n >> 8) & 255] + 0.0722 * LIN8[n & 255]; };
CAP16.lt = relLum(CAP16.col);
const capStyleName = () => (FOOT.m && (FOOT.m.captionStyle || FOOT.man.captionStyle)) || (FOOT.m && FOOT.m.kind === 'short' ? 'shorts' : 'house');
/** the caption size / height her sliders work on, for this frame size: {key, size, y, def: {size, y}, min, max, ymin, ymax} */
function capSliderInfo() {
  if (!PORTRAIT && typeof TH !== 'undefined' && TH.look && TH.look.cap16 === 'three') { const e = EDIT.data.captions3 || {}; return { key: 'captions3', size: e.size || CAP3.size, y: e.y != null ? e.y : CAP3.base, def: { size: CAP3.size, y: CAP3.base }, min: 30, max: CAPSIZE.max16, ymin: CAPSIZE.y16[0], ymax: 1040 }; }   // the three-part style keeps its own size / height (her old 16:9 caption edits stay for the old style)
  if (!PORTRAIT) { const e = EDIT.data.captions16 || {}; return { key: 'captions16', size: e.size || CAP16.size, y: e.y != null ? e.y : CAP16.y, def: { size: CAP16.size, y: CAP16.y }, min: CAPSIZE.min16, max: CAPSIZE.max16, ymin: CAPSIZE.y16[0], ymax: CAPSIZE.y16[1] }; }
  const sh = capStyleName() === 'shorts' && typeof TH !== 'undefined' ? TH.shortStyle.cap : null; const def = sh ? { size: sh.size, y: sh.y } : { size: CAPSTYLE.size, y: CAPSTYLE.y };
  const e = EDIT.data.captions9 || {}; return { key: 'captions9', size: e.size || def.size, y: e.y != null ? e.y : def.y, def, min: CAPSIZE.min9, max: CAPSIZE.max9, ymin: CAPSIZE.y9[0], ymax: CAPSIZE.y9[1] };
}
function buildCaptions16() {
  const proper = new Set(); WORDS.forEach((w, i) => { const pv = WORDS[i - 1]; if (/^[A-Z]/.test(w.w) && pv && !/[.?!]$/.test(pv.w)) proper.add(w.n); });
  const fix = (w, i) => { const pv = WORDS[i - 1]; let s = w.w.replace(/\.+$/, '').replace(/^"|"$/g, '');
    if (/^I('|’|$)/.test(s) || proper.has(w.n)) return s; if (!pv || /[.?!]$/.test(pv.w)) s = s.charAt(0).toLowerCase() + s.slice(1); return s; };
  // breaks: a pause (> 0.5 s), a sentence end, a comma once the line has some length; a full line breaks at its best point
  // (after punctuation, never after a little word like "a", "the", "to": those go on with the next words)
  const out = []; let cur = []; const len = (ws) => ws.map(x => x.s).join(' ').length; const flush = () => { if (cur.length) out.push(cur); cur = []; };
  const weak = (s) => CAP16.weak.has(s.toLowerCase().replace(/[^a-z’']/g, ''));
  const split = () => { let best = cur.length, bs = -1;
    for (let k = 1; k < cur.length; k++) { const a = cur.slice(0, k); if (len(a) < CAP16.chunk * 0.4) continue; const last = a[a.length - 1].s;
      const sc = (/[,;:]$/.test(last) ? 3 : 0) + (weak(last) ? -2 : 1) + k / 100; if (sc > bs) { bs = sc; best = k; } }
    out.push(cur.slice(0, best)); cur = cur.slice(best); };
  WORDS.forEach((w, i) => { const pv = WORDS[i - 1]; const it = { s: fix(w, i), t: w.t, e: w.e };
    if (cur.length && ((pv && w.t - pv.e > 0.5) || (pv && /[.?!]$/.test(pv.w)) || capBreak(pv, w))) flush();   // a sentence end always breaks (2026-11-07: "income So, at many")
    if (cur.length && len([...cur, it]) > CAP16.chunk) split();
    cur.push(it); if (/[.?!]$/.test(w.w) || (/[,;:]$/.test(w.w) && len(cur) >= 22)) flush(); });
  flush();
  // a 1-2 word sentence ending ("income.") joins the line before it when that line is the same sentence and it fits
  for (let k = out.length - 1; k > 0; k--) { const a = out[k - 1], b = out[k], la = a[a.length - 1];
    if (b.length <= 2 && /[.?!]$/.test(WORDS.find(x => x.t === b[b.length - 1].t)?.w || '') && !/[.?!]$/.test(WORDS.find(x => x.t === la.t)?.w || '') && b[0].t - la.e < 0.5 && len([...a, ...b]) <= CAP16.chunk + 10) { out.splice(k - 1, 2, [...a, ...b]); } }
  FOOT.caps16 = out.map((ws, i) => ({ i, ws, t0: Math.max(0, ws[0].t - 0.05), t1: Math.min(i + 1 < out.length ? out[i + 1][0].t - 0.05 : FOOT.dur, ws[ws.length - 1].e + 0.35), text: ws.map(x => x.s).join(' ').replace(/[,;:]$/, '') }));   // (no comma left hanging at the end, as in her frame)
}
function capLines2(s, font, ls, maxW) {
  const words = s.split(/\s+/).filter(Boolean); if (words.length < 2 || tw(s, font, ls) <= maxW) return [s];
  let best = null; for (let k = 1; k < words.length; k++) { if (words.length > 2 && k === words.length - 1) continue; const a = words.slice(0, k).join(' '), b = words.slice(k).join(' '); const m = Math.max(tw(a, font, ls), tw(b, font, ls)); if (!best || m < best[0]) best = [m, [a, b]]; }
  return best[1];
}
/* the footage behind the captions: {cell, y0, cols, rows, s: {"<raw frame>:<crop>[:<box>]": base64 bytes of linear luminance x 255}} */
FOOT.capBg = null; FOOT.capBgV = 0;
function setCapBg(d) { FOOT.capBg = d && d.s ? { ...d, dec: {} } : null; FOOT.capBgV++; }
function capBgKey(t) {
  const tr = outToRaw(Math.min(t, FOOT.dur - 1 / FOOT.fps)), cam = camAt(t), r = Math.round;
  return { key: `${Math.round(tr * FOOT.fps)}:${r(cam.x)},${r(cam.y)},${r(cam.w)},${r(cam.h)}` + (cam.boxed ? ':' + cam.box.map(r).join(',') : ''), raw: Math.round(tr * FOOT.fps), cam: [cam.x, cam.y, cam.w, cam.h], box: cam.boxed ? cam.box.slice() : null };
}
const capSamples = (c) => c._smp || (c._smp = CAP16.at.map(f => capBgKey(c.t0 + (c.t1 - c.t0) * f)));
/** what composite.mjs capbg has to measure: one sample per (raw frame, framing) at 30 % and 70 % of every chunk */
function capBgNeed() {
  const seen = new Map(); for (const c of FOOT.caps16 || []) for (const s of capSamples(c)) seen.set(s.key, s);
  const b = CAP16.band; return { aspect: ASPECT, W, H, cell: b.cell, y0: b.y0, cols: Math.ceil(W / b.cell), rows: Math.ceil((H - b.y0) / b.cell), samples: [...seen.values()] };
}
function capFoot(c) {   // the chunk's footage luminance per cell (mean of its samples), null when not measured yet
  const bg = FOOT.capBg; if (!bg) return null; if (c._fv === FOOT.capBgV) return c._foot;
  const arrs = capSamples(c).map(s => { if (!bg.s[s.key]) return null; if (!bg.dec[s.key]) bg.dec[s.key] = Uint8Array.from(atob(bg.s[s.key]), ch => ch.charCodeAt(0)); return bg.dec[s.key]; }).filter(Boolean);
  let f = null; if (arrs.length) { f = new Float32Array(arrs[0].length); for (const a of arrs) for (let k = 0; k < a.length; k++) f[k] += a[k] / 255 / arrs.length; }
  c._fv = FOOT.capBgV; c._foot = f; return f;
}
/** how dark the box behind this chunk must be in this frame (0 = no box): r = [x, y, w, h] layout px */
function capBoxAlpha(c, r) {
  const foot = capFoot(c), bg = FOOT.capBg, s = CW / W, step = 4;
  const x0 = Math.max(0, Math.floor(r[0] * s)), y0 = Math.max(0, Math.floor(r[1] * s)), x1 = Math.min(CW, Math.ceil((r[0] + r[2]) * s)), y1 = Math.min(CH, Math.ceil((r[1] + r[3]) * s));
  if (x1 - x0 < 2 || y1 - y0 < 2) return 0;
  const d = ctx.getImageData(x0, y0, x1 - x0, y1 - y0).data, ww = x1 - x0; const v = [];
  for (let py = 0; py < y1 - y0; py += step) for (let px = 0; px < ww; px += step) {
    const i = (py * ww + px) * 4, a = d[i + 3] / 255; let lf = 0, known = false;
    if (foot) { const col = Math.min(bg.cols - 1, Math.floor((x0 + px) / s / bg.cell)), row = clamp(Math.floor(((y0 + py) / s - bg.y0) / bg.cell), 0, bg.rows - 1); lf = foot[row * bg.cols + col]; known = true; }
    if (!known && a < 0.02) continue;
    const lg = a > 0 ? 0.2126 * LIN8[d[i]] + 0.7152 * LIN8[d[i + 1]] + 0.0722 * LIN8[d[i + 2]] : 0;
    v.push(a * lg + (1 - a) * lf);
  }
  if (!v.length) return 0; v.sort((p, q) => p - q); const lb = v[Math.min(v.length - 1, Math.floor(v.length * 0.75))];
  if ((CAP16.lt + 0.05) / (lb + 0.05) >= CAP16.need) return 0;
  return clamp(1 - ((CAP16.lt + 0.05) / CAP16.need - 0.05) / lb, CAP16.box.min, CAP16.box.max);
}
/* ---------- "three-part" 16:9 captions (her font-style-placement reference, 2026-10-17; TH.look.cap16 = 'three') ----------
 * The breath's words split into up to three short phrases that appear one after another as she says them: bottom-left
 * (left-aligned), bottom-centre, bottom-right (right-aligned), small, light, pale yellow, no box unless the picture behind
 * is too bright for 3:1. Where her picture sits in a box (half and half) the three places span her half. Edits as usual
 * ("cap16" text, "captions16" size / height). */
// measured from her reference (2026-10-17, 1284x706 frames scaled to 1080): Helvetica Neue Regular, x-height 15 px -> 44 px,
// solid colour #FEEDB3, baseline at 0.909 of the height (982 at 1080), left edge 0.083 of the width, right edge 0.071
const CAP3 = { size: 44, weight: 400, ls: -0.01, col: '#FAF4E4', marginL: 0.083, marginR: 0.071, base: 982 };
function capSplit3(words) {   // contiguous groups, balanced by length, never ending on a little word when avoidable
  const n = words.length; if (n <= 2) return [words];
  const L = (a) => a.map(w => w.s).join(' ').length; const weak = (w) => CAP16.weak.has(w.s.toLowerCase().replace(/[^a-z’']/g, ''));
  const k = L(words) < 16 ? 2 : 3; let best = null;
  if (k === 2) { for (let i = 1; i < n; i++) { const a = words.slice(0, i), b = words.slice(i); const sc = Math.abs(L(a) - L(b)) + (weak(a[a.length - 1]) ? 8 : 0); if (!best || sc < best[0]) best = [sc, [a, b]]; } return best[1]; }
  for (let i = 1; i < n - 1; i++) for (let j = i + 1; j < n; j++) { const g = [words.slice(0, i), words.slice(i, j), words.slice(j)]; const ls = g.map(L);
    const sc = Math.max(...ls) - Math.min(...ls) + (weak(g[0][g[0].length - 1]) ? 8 : 0) + (weak(g[1][g[1].length - 1]) ? 8 : 0); if (!best || sc < best[0]) best = [sc, g]; }
  return best[1];
}
function drawCaptions3(t, c, opt = {}) {
  const st = capSliderInfo();   // key "captions3": y = the baseline (her sliders; "As designed" = the measured style)
  const size = clamp(Math.round(st.size), 30, CAPSIZE.max16), yb = clamp(st.y, CAPSIZE.y16[0], 1040);
  const font = `${CAP3.weight} ${size}px "Helvetica Neue"`, ls = size * CAP3.ls;
  const ce = (EDIT.data.cap16 || {})[c.i]; const text = ce != null ? ce.replace(/\n/g, ' ') : c.text;
  let words = c.ws.map(w => ({ s: w.s, t: w.t }));
  if (ce != null) { const parts = text.split(/\s+/).filter(Boolean); words = parts.map((s_, i) => ({ s: s_, t: c.ws[Math.min(c.ws.length - 1, Math.floor(i * c.ws.length / parts.length))].t })); }
  const groups = capSplit3(words);
  const cam = camAt(t); let x0 = W * CAP3.marginL, x1 = W * (1 - CAP3.marginR);
  if (cam.boxed) { const b = cam.box; if (b[2] >= W * 0.4 && b[3] >= H * 0.5) { x0 = b[0] + b[2] * 0.07; x1 = b[0] + b[2] * 0.93; } }
  // never overlapping (her half of a half-and-half is narrow): measure the three, shrink to fit with a 40 px gap, then place
  // left at x0, right at x1, the middle centred but pushed clear of both
  const strs = groups.map(g => g.map(w => w.s).join(' ')); let z = size, f_ = font, l_ = ls; const gap = 40;
  const widths = () => strs.map(s_ => tw(s_, f_, l_));
  while (z > 34 && widths().reduce((a, b) => a + b, 0) + gap * (strs.length - 1) > x1 - x0) { z -= 2; f_ = `${CAP3.weight} ${z}px "Helvetica Neue"`; l_ = z * CAP3.ls; }
  const ww = widths(); const lefts = strs.length === 3 ? [x0, clamp((x0 + x1) / 2 - ww[1] / 2, x0 + ww[0] + gap, x1 - ww[2] - gap - ww[1]), x1 - ww[2]] : strs.length === 2 ? [x0, x1 - ww[1]] : [x0];
  const base = yb; let bx0 = Infinity, bx1 = -Infinity;
  ctx.save(); ctx.setTransform(...BASE); ctx.globalAlpha = 1; ctx.filter = 'none';
  groups.forEach((g, i) => {
    if (t < g[0].t - 0.06) return; const s_ = strs[i]; const w = ww[i]; const lx = lefts[i]; bx0 = Math.min(bx0, lx); bx1 = Math.max(bx1, lx + w);
    const a = opt.onFilm ? CAP16.box.film : 0;   // as her reference: no box on her footage (only over a film screen, where it sits on the film's own text)
    if (a > 0) { ctx.fillStyle = `rgba(0,0,0,${a.toFixed(3)})`; rr(lx - z * 0.3, base - z * 0.95, w + z * 0.6, z * 1.3, CAP16.box.radius); ctx.fill(); }
    const p = clamp((t - g[0].t + 0.06) / 0.12);   // a quick fade on its first word (no slide: it lands where it reads)
    ctx.globalAlpha = p; _txt(s_, lx, base, f_, CAP3.col, 'left', 'alphabetic', l_); ctx.globalAlpha = 1;
  });
  ctx.restore();
  if (bx1 > bx0) regBox({ id: 'caption/' + c.i, edited: ce != null, hide: false }, bx0, base - z, bx1 - bx0, z * 1.3, { kind: 'caption', text, def: c.text, cue: c.i, cap16: true });
}
/** the 16:9 caption chunk at t (her style); returns its box for the editor */
function drawCaptions16(t, opt = {}) {
  const cs = FOOT.caps16 || []; let c = null; for (const x of cs) if (x.t0 <= t && t < x.t1) c = x; if (!c) return;
  if (typeof TH !== 'undefined' && TH.look && TH.look.cap16 === 'three') return drawCaptions3(t, c, opt);
  const st = capSliderInfo(); let size = clamp(Math.round(st.size), CAPSIZE.min16, CAPSIZE.max16); const yc = clamp(st.y, CAPSIZE.y16[0], CAPSIZE.y16[1]);
  let font = `${CAP16.weight} ${size}px "Helvetica Neue"`, ls = size * CAP16.ls;
  const ce = (EDIT.data.cap16 || {})[c.i]; const text = ce != null ? ce : c.text;
  // her picture in a box (half and half): the caption sits under HER half, not across the film; a small box (corner cam): none
  const cam = camAt(t); let cx = CX, maxW = W * CAP16.maxW;
  if (FOOT.capX) { cx = FOOT.capX[0]; maxW = Math.min(maxW, FOOT.capX[1]); }   // (a layout placed them this frame: L14-L19)
  else if (cam.boxed) { const b = cam.box;
    if (b[2] < W * 0.4 || b[3] < H * 0.5) {   // a small box (her corner circle): over a film scene the caption stays, beside the circle
      if (!opt.onFilm) return;
      const cy0 = yc - size, cy1 = yc + size;
      if (b[1] < cy1 && b[1] + b[3] > cy0) { const l = b[0] + b[2] / 2 < W / 2; const x0 = l ? b[0] + b[2] + 40 : 48, x1 = l ? W - 48 : b[0] - 40; cx = (x0 + x1) / 2; maxW = Math.min(maxW, (x1 - x0) * 0.94); }
    } else { cx = b[0] + b[2] / 2; maxW = Math.min(maxW, b[2] * 0.88); } }
  let lines = text.includes('\n') ? text.split('\n') : capLines2(text, font, ls, maxW);
  // opt-in (TH.look.capFit, 2026-10-26 october-attacks): a caption in a narrow strip (her side of an L14 / L18 split) shrinks
  // until its lines fit the strip, never below 64 % of her size, instead of running off the frame edge
  if (typeof TH !== 'undefined' && TH.look && TH.look.capFit) { const s0 = size;
    while (size > s0 * 0.64 && Math.max(...lines.map(l => tw(l, font, ls))) > maxW) { size = Math.round(size * 0.93); font = `${CAP16.weight} ${size}px "Helvetica Neue"`; ls = size * CAP16.ls; lines = text.includes('\n') ? text.split('\n') : capLines2(text, font, ls, maxW); } }
  const lh = size * CAP16.lh, asc = size * CAP16.asc, desc = size * CAP16.desc, B = CAP16.box;
  const ws = lines.map(l => tw(l, font, ls)); const bw = Math.max(...ws) + size * B.padX * 2, bh = asc + desc + (lines.length - 1) * lh + size * B.padY * 2;
  const bx = cx - bw / 2, by = yc - bh / 2;
  ctx.save(); ctx.setTransform(...BASE); ctx.globalAlpha = 1; ctx.filter = 'none';
  let a = capBoxAlpha(c, [bx, by, bw, bh]); if (opt.onFilm) a = Math.max(a, CAP16.box.film); FOOT.capBoxNow = a;   // over the film's own text: always a plate
  if (a > 0) { ctx.fillStyle = `rgba(0,0,0,${a.toFixed(3)})`; rr(bx, by, bw, bh, B.radius); ctx.fill(); }
  lines.forEach((l, k) => _txt(l, cx - ls / 2, by + size * B.padY + asc + k * lh, font, CAP16.col, 'center', 'alphabetic', ls));
  ctx.restore();
  regBox({ id: 'caption/' + c.i, edited: ce != null, hide: false }, bx, by, bw, bh, { kind: 'caption', text, def: c.text, cue: c.i, cap16: true, box: a });
}

/* ---------- components for footage (her house style, made to read over video) ---------- */
const PLATE = { paper: [C.paper, C.ink, C.blue], card: [C.card, C.ink, C.blue], ink: [C.ink, C.paper, C.blueT], blue: [C.blue, C.onBlue, C.card], orange: [C.orange, C.ink, C.card] };
/** plateText: kinetic words on flat plates (one plate per line), the plate wipes in just before its first word.
 * o: lines[], x, y (first baseline), size, plate 'paper'|'ink'|'blue'|'card'|'orange', times[] (per word) | t0+stagger,
 *    align, font 'disp'|'body'|'serif', lh, padX, out (time to wipe off), id */
function plateText(t, o) {
  const def = o.lines.join('\n'); const ov = ovr(o.id || def.replace(/\n/g, ' '));
  if (ov.s != null) o = { ...o, lines: ov.s.split('\n') };
  if (PORTRAIT || ov.s != null || o.fitW) { const Lf = layoutKT(o); const av = o.fitW || availW(o.x, o.align || 'left', 70); if (Lf.w > av) o = { ...o, size: Math.floor(o.size * av / Lf.w) }; }
  const [bg, fg, acc] = PLATE[o.plate || 'paper']; const Lo = layoutKT(o); const size = o.size, align = o.align || 'left';
  const padX = o.padX == null ? size * 0.22 : o.padX, lh = Lo.lh, kind = o.font || 'disp';
  const capH = kind === 'disp' ? 0.74 : 0.72, padY = size * (kind === 'disp' ? 0.2 : 0.22);
  const times = o.times || Lo.words.map((_, i) => (o.t0 || 0) + i * (o.stagger == null ? 0.07 : o.stagger));
  const box = [0, 0, 0, 0]; let vis = false;
  const draw = () => {
    let wi = 0;
    Lo.lines.forEach((ln, li) => {
      const lx = align === 'center' ? o.x - ln.w / 2 : align === 'right' ? o.x - ln.w : o.x; const by = o.y + li * lh;
      const tl = times[Math.min(wi, times.length - 1)] - 0.07; wi += ln.ws.length;
      const p = prog(t, tl, 0.26); if (p <= 0) return; vis = true;
      const outP = o.out == null ? 0 : E.inCubic(prog(t, o.out - 0.05 * li, 0.22)); if (outP >= 1) return;
      const x0 = lx - padX, w0 = ln.w + padX * 2, y0 = by - size * capH - padY, h0 = size * capH + padY * 2 + (kind === 'disp' ? 0 : size * 0.18);
      // the plate grows word by word: its right edge follows the last word that has landed
      const lt = times.slice(wi - ln.ws.length, wi); let right = 0;
      let first = 0;
      ln.ws.forEach((w, j) => { const ej = E.outCubic(prog(t, lt[Math.min(j, lt.length - 1)], 0.18)); if (j === 0) first = ej; if (ej > 0) right = lerp(right, w.dx + w.w, ej); });
      if (first <= 0) return;                                   // no plate before its first word
      const pw = Math.min(w0, right + padX * 2 * Math.min(1, first * 2));
      ctx.save();
      ctx.beginPath(); ctx.rect(x0 + w0 * outP, y0 - 4, w0 * (1 - outP), h0 + 8); ctx.clip();
      rect(align === 'left' ? x0 : align === 'right' ? x0 + w0 - pw : x0 + (w0 - pw) / 2, y0, pw, h0, bg);
      KT_(t, { ...o, text: undefined, out: undefined, lines: [o.lines[li]], y: by, x: o.x, col: fg, acc, times: times.slice(wi - ln.ws.length, wi), blur: o.blur == null ? 4 : o.blur, dur: 0.22, ul: o.ul });
      ctx.restore();
      if (!box[2]) { box[0] = x0; box[1] = y0; box[2] = w0; box[3] = h0; } else { const r = Math.max(box[0] + box[2], x0 + w0), b = Math.max(box[1] + box[3], y0 + h0); box[0] = Math.min(box[0], x0); box[1] = Math.min(box[1], y0); box[2] = r - box[0]; box[3] = b - box[1]; }
    });
  };
  if (ov.hide) { regBox(ov, o.x, o.y - size, 200, size, { text: def, def, markup: true }); return Lo; }
  moved(ov, () => { draw(); if (vis) regBox(ov, ...box, { text: o.lines.join('\n'), def, markup: true }); });
  return Lo;
}

/** panel: a flat ground block covering one side of the frame, sliding in from that edge (her split layouts).
 * o: t0, t1 (leave), side 'left'|'right'|'top'|'bottom', size (px across), ground, at (offset from the edge, px), dur
 * fn(r) draws the content with g = that ground; r = {x, y, w, h} of the panel (content moves with it). */
function panel(t, o, fn) {
  const dur = o.dur || 0.42; const pin = prog(t, o.t0, dur); if (pin <= 0) return null;
  const pout = o.t1 == null ? 0 : prog(t, o.t1, 0.3); if (pout >= 1) return null;
  const side = o.side || 'left', size = o.size || (side === 'left' || side === 'right' ? W * 0.48 : H * 0.45), at = o.at || 0;
  const r = side === 'left' ? { x: at, y: 0, w: size, h: H } : side === 'right' ? { x: W - size - at, y: 0, w: size, h: H } : side === 'top' ? { x: 0, y: at, w: W, h: size } : { x: 0, y: H - size - at, w: W, h: size };
  if (o.rect) Object.assign(r, o.rect);
  const e = E.outQuart(pin) * (1 - E.inCubic(pout)); const dist = (side === 'left' || side === 'right' ? r.w + at : r.h + at) * (1 - e);
  const dx = side === 'left' ? -dist : side === 'right' ? dist : 0, dy = side === 'top' ? -dist : side === 'bottom' ? dist : 0;
  const speed = Math.abs((pin < 1 ? 1 - E.outQuart(pin) : 0) + (pout > 0 ? E.inCubic(pout) : 0));
  const g0 = g; g = G[o.ground || 'paper'];
  if (pin >= 1 && pout <= 0) FOOT.panelRect = { ...r };
  ctx.save(); ctx.translate(dx, dy);
  rect(r.x, r.y, r.w, r.h, g.bg);
  if (o.grid) { ctx.save(); ctx.beginPath(); ctx.rect(r.x, r.y, r.w, r.h); ctx.clip(); grid(); ctx.restore(); }
  ctx.beginPath(); ctx.rect(r.x, r.y, r.w, r.h); ctx.clip();
  const b = 16 * speed; if (b > 0.5) ctx.filter = `blur(${b.toFixed(1)}px)`;
  fn(r);
  ctx.restore(); g = g0;
  return r;
}

/** a huge word/number that lands (scale 1.18 -> 1, blur -> sharp, fast in / soft settle). Editable. */
function slam(t, t0, s, x, y, size, o = {}) {
  const ov = ovr(o.key || s); const str = ov.s != null ? ov.s : s; const p = prog(t, t0, o.dur || 0.32); if (p <= 0) return;
  const kind = o.font || 'disp'; const up = kind === 'disp' ? str.toUpperCase() : str;
  const font = kind === 'disp' ? F.disp(size) : kind === 'serif' ? F.serif(size) : F.body(size, 800); const ls = size * (kind === 'disp' ? LS.disp : kind === 'serif' ? LS.serif : LS.body);
  const wd = tw(up, font, ls); const align = o.align || 'left'; const bx = align === 'center' ? x - wd / 2 : align === 'right' ? x - wd : x;
  const e = E.outExpo(p); const sc = lerp(o.from || 1.18, 1, e); const outA = o.out == null ? 1 : 1 - prog(t, o.out, 0.16);
  if (ov.hide) { regBox(ov, bx, y - size * 0.8, wd, size); return; }
  moved(ov, () => {
    ctx.save(); ctx.globalAlpha *= clamp(p * 3) * outA; const cx = bx + wd / 2, cy = y - size * 0.36;
    ctx.translate(cx, cy); ctx.scale(sc, sc); ctx.translate(-cx, -cy);
    const b = 14 * (1 - E.outCubic(p)); if (b > 0.4) ctx.filter = `blur(${b.toFixed(1)}px)`;
    _txt(up, x, y, font, o.col || g.fg, align, 'alphabetic', ls); ctx.restore();
    regBox(ov, bx, y - size * 0.8, wd, size);
  });
}

/** small DM Mono tag on a flat plate (corner labels, sources: "HOW TO READ A BOOK · 1940") */
function tag(t, t0, s, x, y, o = {}) {
  const size = o.size || 26, [bg, fg] = PLATE[o.plate || 'ink']; const p = prog(t, t0, 0.26); if (p <= 0) return;
  const outA = o.out == null ? 1 : 1 - prog(t, o.out, 0.16); if (outA <= 0) return;
  const wd = monoW(s, size, { fixed: true }); const align = o.align || 'left'; const bx = align === 'right' ? x - wd : align === 'center' ? x - wd / 2 : x;
  const pad = size * 0.55; const e = E.outExpo(p);
  ctx.save(); ctx.globalAlpha *= outA;
  ctx.beginPath(); ctx.rect(bx - pad, y - size * 1.25, (wd + pad * 2) * e, size * 1.75); ctx.clip();
  rect(bx - pad, y - size * 1.25, wd + pad * 2, size * 1.75, bg);
  mono(s, bx, y, size, fg, 'left', { fixed: true, ls: o.ls == null ? 0.14 : o.ls, key: o.key });
  ctx.restore();
}

/** counting number (raw text: not editable) */
function countUp(t, t0, d, from, to, x, y, font, col, align = 'left', suffix = '') {
  if (t < t0) return; const v = Math.round(lerp(from, to, E.outCubic(prog(t, t0, d)))); _txt(String(v) + suffix, x, y, font, col, align);
}

/* ---------- boot ---------- */
/** bootMoment({manifest: '/p/<slug>/talking-head/talking-head.json', id, canvas, aspect, edits: true|object|false}) */
async function bootMoment(o) {
  const bust = '?v=' + Date.now(); const man = await getJSON(o.manifest + bust); const base = o.manifest.slice(0, o.manifest.lastIndexOf('/') + 1);
  const m = man.moments.find(x => x.id === o.id); if (!m) throw new Error('no moment ' + o.id);
  Object.assign(FOOT, { man, base, id: m.id, m, fps: man.fps || 30, slug: o.manifest.split('/').filter(Boolean)[1] });
  setCtx(o.canvas.getContext('2d')); setAspect(o.aspect || '16x9'); HUD_TITLE = man.hud || '';
  const loaded = await Promise.all(HOUSE_FONTS.map(f => document.fonts.load(f))); await document.fonts.ready;
  if (loaded.some(l => !l.length)) throw new Error('font failed to load');
  await document.fonts.load(`${CAP16.weight} ${CAP16.size}px "Helvetica Neue"`).catch(() => null);   // her 16:9 captions (a system font: by name)
  if (man.fonts) { const lf = await Promise.all(man.fonts.map(f => document.fonts.load(f))); if (lf.some(l => !l.length)) throw new Error('moment font failed to load: ' + JSON.stringify(man.fonts)); }   // optional faces (manifest "fonts")
  // a missing picture (e.g. a thumbnail moved to an archive) never stops the moment from loading: it is reported and left out
  FOOT.missingImages = [];
  await Promise.all(Object.entries(man.images || {}).map(([k, p]) => loadImg(k, base + p).catch(() => { FOOT.missingImages.push(p); console.error('missing picture (left out): ' + p); })));
  const [words, faces, edl] = await Promise.all([getJSON(base + man.words + bust), getJSON(base + man.faces + bust), getJSON(base + man.edl + bust)]);
  if (!edl[m.id]) throw new Error('no EDL for ' + m.id + ': run python3 studio/tools/footedl.py ' + o.manifest);
  FOOT.bites = edl[m.id].bites || null; FOOT.capBreaks = FOOT.bites ? FOOT.bites.slice(1).map(b => b.t0) : null;   // teasers
  // her outro clip ("FULL VIDEO ON YOUTUBE", manifest "outro"): ends every short and teaser; the ending lasts as long as the clip
  // (the export lays the clip over it; the preview shows a still of it). 1:1 / 4:5 use the 16:9 clip's centre.
  FOOT.outro = null;
  if (man.outro && m.outro !== false && (m.kind === 'short' || m.kind === 'teaser')) { const key = ASPECT === '9x16' ? '9x16' : '16x9'; const oc = man.outro[key];
    if (oc && oc.src) { FOOT.outro = { ...oc, key }; if (oc.poster) await loadImg('outro', base + oc.poster).catch(() => null); } }
  // our own drawn ending (manifest "outroCard", layouts.js drawOutroCard) when her clip is not there: the manifest's
  // "outroCard" (shared by every short + the teaser) merged with the moment's own ("outroCard": {...} | false)
  FOOT.ocard = null;
  if (!FOOT.outro && typeof TH !== 'undefined' && (m.kind === 'short' || m.kind === 'teaser') && m.outroCard !== false) {
    const g0 = man.outroCard || {}, m0 = m.outroCard && typeof m.outroCard === 'object' ? m.outroCard : {};
    if ((man.outroCard || m.outroCard) && (m0.on ?? g0.on) !== false) FOOT.ocard = { dur: 6.5, photo: '/library/her-photos/avatar.png', headline: 'Full video', headline2: 'on YouTube', channel: 'With Gbemi', handle: '@WithGbemi',
      ...g0, ...m0, style: { ...(g0.style || {}), ...(m0.style || {}) }, at: { ...(g0.at || {}), ...(m0.at || {}) } };
  }
  // edits first when they hold "pause her" inserts (they change the timeline); applied as before further down
  let ed0 = null; if (o.edits === true) { const r = await fetch(base + 'edits/' + m.id + '.json' + bust, { cache: 'no-store' }); ed0 = r.ok ? await r.json() : {}; } else if (o.edits && typeof o.edits === 'object') ed0 = o.edits;
  const ps = pauseSpecs(man, m, ed0); let clips0 = edl[m.id].clips, pdone = [];
  if (ps.length) { const r = applyPauses(clips0, ps, words); clips0 = r.clips; pdone = r.done; }
  setClips(clips0, FOOT.outro ? FOOT.outro.dur : FOOT.ocard ? FOOT.ocard.dur : m.tail != null ? m.tail : m.kind === 'short' ? ((m.endCard || {}).seconds || 6) : (man.tail || 0)); placePauses(pdone); prepFaces(faces); initMomentWords(words); buildCaptions(); buildCaptions16(); clampCapsToPauses();
  const LAY = typeof TH !== 'undefined';   // runtime/layouts.js loaded (moment.html, the moment editor)
  if (LAY) await TH.boot();
  if (ed0) setEdits(ed0);
  if (FOOT.ocard) { await Promise.all(['500 40px Poppins', '700 40px Poppins'].map(x => document.fonts.load(x))); await TH.ocardPrep(); }   // (after her edits: a picture she swapped in is loaded too)
  for (const sc of [...(man.common ? [].concat(man.common) : []), m.script]) await loadScript(base + sc + bust);
  if (typeof buildMoment !== 'function') throw new Error(m.script + ' must define buildMoment()');
  buildMoment(); if (LAY) { await TH.resolveCorners(); await TH.resolveFills(); TH.finish(); } pauseCues(); finishMoment();   // (auto corners: measured on the film before the cameras)
  if (LAY && TH.active()) { FOOT.th = true; await TH.ready(); }
  clampCapsToPauses();
  FOOT.meta = () => ({ id: m.id, slug: m.slug, title: m.title, TOTAL, FPS: FOOT.fps, clips: FOOT.clips, dur: FOOT.dur, tail: FOOT.tail, outro: FOOT.outro ? { key: FOOT.outro.key, dur: FOOT.outro.dur } : null, outroCard: FOOT.ocard ? { dur: FOOT.ocard.dur } : null, cuts: cutTimes(), CUES,
    SCENES: SCENES.map(s => ({ n: s.n, id: s.id, start: +s.start.toFixed(3), end: +sceneEnd(s.n - 1).toFixed(3), ground: s.ground, card: !!s.card, ...(s.layout ? { layout: s.layout } : {}) })),
    ...(FOOT.th ? { kind: m.kind || 'moment', matte: TH.need.map(([a, b]) => [+a.toFixed(3), +b.toFixed(3)]), film: TH.film.slug || null, ...(TH.corners.length ? { corners: TH.cornerPicks() } : {}) } : {}),
    ...(FOOT.pauses.length ? { pauses: FOOT.pauses.map(p => ({ id: p.id, t0: +p.t0.toFixed(3), t1: +p.t1.toFixed(3), at: p.rawAt, look: p.look || 'card', sound: p.sound !== false, text: pauseText(p), src: p.src })) } : {}),
    captions16: FOOT.caps16.map(c => ({ i: c.i, t0: c.t0, t1: c.t1, text: c.text })),
    captions: { short: FOOT.capShort.map(c => ({ i: c.i, t0: c.t0, t1: c.t1, text: c.text })), long: FOOT.capLong.map(c => ({ i: c.i, t0: c.t0, t1: c.t1, text: capText(c) })) } });
  return FOOT;
}
