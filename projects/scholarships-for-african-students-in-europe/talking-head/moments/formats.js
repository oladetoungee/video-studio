/* scholarships shorts: a MIX of formats (her note 2026-11-08 "everything is the same format"; SHORTS-PLAYBOOK "Format menu" A-M)
 * + a cover frame in every short (her note 2026-11-10). Ported from http-status-codes (moments/plan.js FD_PLAN short + common.js
 * FD.capFmt / capNew / titleFmt / coverDraw) to this video's type set 06 (League Gothic headlines, Inter Tight body) and colours
 * (graphite #1B1D21, letters #F3F0E8, one key word in yellow #FFD23F; green stays for "open" / money, as in the edit).
 * Manifest per short: "fmt" A|B|D|F|G|H|I|K|M (+ "frame9" for the format's framing), "topLabel" = the title ("|" = second line),
 * "cover" {on, dur, at, text ("~word~" = the yellow word), style "photo"|"card", card colour "bg"}.
 * plan.js SC_PLAN short calls SCF.setup() when the short has a fmt (else the old 3:4 window + top label, unchanged).
 * Every text is editable in the moment editor (title = 'label', poster, tag, cover line = 'cover/cover'). Loaded after plan.js. */
'use strict';
const SCF = { HL: '#FFD23F', INK: '#16181B', LET: '#F3F0E8', GROUND: '#1B1D21', GO: '#2FD27A', gfx: [], popN: 0, FLASH: 1.6 };
(function scfFonts() {   // Inter Tight 800 / 900 (H, I, M, covers) + DM Serif Display (K subtitles) + DM Mono (K tag), from library/fonts (OFL)
  for (const [fam, file, desc] of [['SCFHeavy', 'InterTightExtraBold.ttf', { weight: '800' }], ['SCFHeavy', 'InterTightBlack.ttf', { weight: '900' }], ['SCFSerif', 'DMSerifDisplay-Regular.ttf', {}], ['SCFMono', 'DMMono-Medium.ttf', {}]]) {
    try { const x = new XMLHttpRequest(); x.open('GET', '/library/fonts/' + file, false); x.overrideMimeType('text/plain; charset=x-user-defined'); x.send();
      if (x.status !== 200) continue; const s = x.responseText, u = new Uint8Array(s.length); for (let i = 0; i < s.length; i++) u[i] = s.charCodeAt(i) & 255;
      const ff = new FontFace(fam, u.buffer, desc); document.fonts.add(ff); ff.load(); } catch (e) { /* the editor falls back to Inter Tight */ } }
})();
const SFN = (z) => F.disp(z / 1.3);                        // League Gothic at exactly z px (F.disp sets everything 30 % larger)
const SFS = (z, w = 600) => `${w} ${z}px "Inter Tight"`;
const SFH = (z, w = 900) => `${w} ${z}px SCFHeavy, "Inter Tight"`;
const SFSER = (z) => `400 ${z}px SCFSerif`;
const SFM = (z) => `400 ${z}px SCFMono`;
SCF.wrap = (s, font, maxW) => { const ws = String(s).split(/\s+/).filter(Boolean); const out = []; let cur = '';
  for (const w of ws) { const n = cur ? cur + ' ' + w : w; if (cur && tw(n, font) > maxW) { out.push(cur); cur = w; } else cur = n; } if (cur) out.push(cur); return out; };
SCF.soft = (z) => { ctx.shadowColor = 'rgba(0,0,0,0.55)'; ctx.shadowBlur = Math.max(8, z * 0.28); ctx.shadowOffsetY = Math.max(1, z * 0.03); };
SCF.fmt = () => (typeof FOOT !== 'undefined' && FOOT.m && FOOT.m.kind === 'short' && PORTRAIT ? (FOOT.m.fmt || null) : null);
SCF.inGfx = (t) => SCF.gfx.some(([a, b]) => t >= a && t < b);
SCF.lbl = () => FOOT.m.topLabel || FOOT.m.title || '';
SCF.parts = (str) => { const m = String(str).match(/^(.*?)\s*\|\s*(.*)$/); return m ? [m[1], m[2]] : [String(str), '']; };
SCF.NUM = /[€\d]/;
SCF.WEAK = new Set(['a', 'an', 'the', 'to', 'for', 'of', 'in', 'on', 'at', 'and', 'so', 'is', 'or', 'but', 'with', 'my', 'your', 'that', 'i', 'it', 'be', 'are', 'was', 'can', 'will', 'as', 'if', 'like', 'this', 'there', 'they', 'you', 'we', 'what', 'just', 'one', 'some', 'have', 'has', 'not', 'them', 'who', 'also', 'then', 'when', 'which', 'really', 'very', 'about', "it's", "that's", "you're", "don't", "i'm", 'going', 'think', 'would', 'their', 'these', 'those', 'from', 'because', 'does', 'even', 'more']);
/** the cue's key word: an amount / number first, else the longest word that carries meaning */
SCF.hiWord = (ws) => { const nn = (w) => w.toLowerCase().replace(/[^a-z0-9€']/g, '');
  const ni = ws.findIndex(w => SCF.NUM.test(w)); if (ni >= 0) return ni;
  let best = -1, sc = -1; ws.forEach((w, i) => { const n = nn(w); if (!n || SCF.WEAK.has(n)) return; if (n.length > sc) { sc = n.length; best = i; } }); return best; };

/* ---------- where graphics go per format (called from SC_PLAN short) ---------- */
SCF.setup = (s, first) => {
  const FMT = SCF.fmt(); if (!FMT) return false;
  SCF.gfx = []; SCF.popN = 0; TH.look.band = SCF.GROUND; TH.labelBottom = () => (FMT === 'M' ? 420 : 0);   // M: keywords stay under the title box
  const half0 = TH.half, split0 = TH.split, pres0 = TH.presenter, talk0 = TH.talk;
  const mark = (sg) => { if (sg) SCF.gfx.push([sg.t0, sg.t1]); return sg; };
  const filmOf = (o, aspect) => (o.film ? { ...o.film, aspect, fit: aspect === '16x9' ? 'contain' : undefined } : undefined);
  const asDraw = (o, q, aspect) => { if (o.draw) return o.draw; if (!o.film) return null; const f = { ...o.film, aspect, fit: 'contain' }; TH.filmNeed(f);
    return (t, r) => { rect(r.x, r.y, r.w, r.h, SCF.GROUND); TH.drawFilm(t, r, f, q); }; };
  // G: her letterbox band slides down (still her whole 16:9 frame), the graphic opens in a 16:9-ish box above it
  const lbBox = (sp_, o) => { const q = TH.span(sp_, o); const draw = asDraw(o, q, '16x9');
    const sg = TH.seg('half', q, o, (t) => { const e = MOTION.ease(t, q.t0, 0.45, 'outQuint'); if (e <= 0.001) return;
      const r = { x: 0, y: 0, w: W, h: 976 }; ctx.save(); ctx.beginPath(); ctx.rect(0, r.y + r.h * (1 - e), W, r.h * e); ctx.clip(); rect(r.x, r.y, r.w, r.h, SCF.GROUND); if (draw) draw(t, r); ctx.restore();
      FOOT.panelRect = { x: 0, y: r.y, w: W, h: r.h }; }, () => CAM(q.t0, { box: [0, 1000, W, Math.round(W * 9 / 16)], z: 1, d: 0.45, ease: 'inOutQuart' }));
    sfx('swipe', q.t0 + 0.2, -4); return sg; };
  // I: the graphic is a card that pops up OVER her full frame (above her head, a slight tilt, a soft shadow); she never moves
  const POP = { x: 84, y: 56, w: 912, h: 500 };   // above her head (her full-bleed face sits at y ~650-1150)
  const popCard = (sp_, o) => { const q = TH.span(sp_, o); const k = ++SCF.popN; const tilt = (k % 2 ? -1 : 1) * 0.03; const draw = asDraw(o, q, '16x9');
    const sg = TH.seg('pops', q, o, (t) => { const pin = MOTION.ease(t, q.t0, 0.42, 'outBack'), pout = MOTION.ease(t, q.t1 - 0.22, 0.22, 'inExpo'); if (pin <= 0.001 || pout >= 0.999) return;
      const r = POP; const cx = r.x + r.w / 2, cy = r.y + r.h / 2; const sc = (0.82 + 0.18 * pin) * (1 - 0.12 * pout);
      grp('card', r.x, r.y, r.w, r.h, () => withA(clamp(Math.min(pin * 2.5, 1 - pout)), () => {
        ctx.save(); ctx.translate(cx, cy); ctx.rotate(tilt * (1 + 0.6 * (1 - pin))); ctx.scale(sc, sc); ctx.translate(-cx, -cy);
        ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.38)'; ctx.shadowBlur = 46; ctx.shadowOffsetY = 18; fillRR(r.x, r.y, r.w, r.h, 26, SCF.GROUND); ctx.restore();
        ctx.save(); rr(r.x, r.y, r.w, r.h, 26); ctx.clip(); if (draw) draw(t, { x: r.x, y: r.y, w: r.w, h: r.h }); ctx.restore(); ctx.restore(); }), { label: 'pop-up card (drag to move, corners to resize)' });
      FOOT.panelRect = { x: r.x, y: r.y, w: r.w, h: r.h }; }, () => CAM(q.t0, { z: 1.0 }));
    sfx('pop', q.t0 + 0.06, -4); return sg; };
  const top9 = (sz) => (sp_, o) => half0(sp_, { side: 'top', size: sz, id: o.id, draw: o.draw, film: filmOf(o, '9x16'), noCaps: o.noCaps, lead: o.lead, z: 1.3 });
  const GFX = {
    A: (sp_, o) => half0(sp_, { side: 'top', size: 1050, id: o.id, draw: o.draw, film: filmOf(o, '9x16'), noCaps: o.noCaps, lead: o.lead, z: 1.35 }),
    B: (sp_, o) => split0(sp_, { side: 'bottom', her: 0.48, id: o.id, draw: o.draw, film: filmOf(o, '9x16'), noCaps: o.noCaps, lead: o.lead, enter: 0.3 }),
    D: (sp_, o) => split0(sp_, { side: 'top', her: 0.44, id: o.id, draw: o.draw, film: filmOf(o, '9x16'), noCaps: o.noCaps, lead: o.lead, z: 1.25 }),
    F: top9(1000), K: top9(940), M: top9(1000),
    G: (sp_, o) => lbBox(sp_, o),
    H: (sp_, o) => half0(sp_, { side: 'bottom', size: 900, id: o.id, draw: o.draw, film: filmOf(o, '9x16'), noCaps: o.noCaps, lead: o.lead, z: 1.25, fy: 0.42 }),
    I: (sp_, o) => popCard(sp_, o),
  };
  const gfx = (sp_, o = {}) => mark((GFX[FMT] || GFX.A)(sp_, o));
  TH.tile = gfx; TH.room = gfx; TH.ots = gfx; TH.presenter = gfx; TH.half = gfx; TH.cutaway = gfx;
  TH.split = (sp_, o = {}) => (o.draw || o.film ? gfx(sp_, o) : split0(sp_, o));
  // her talking: B = the title poster over her; G her whole frame; H I K M her frame full bleed at z 1 (face ~30 % of the height)
  const poster = (t, r) => SCF.bigTitle({ x: r.x, y: r.y + 10, w: r.w, h: r.h - 20 }, { zMax: 230, maxL: 3, z2Max: 64, col: SCF.LET, col2: 'rgba(243,240,232,0.75)' });
  const talkF = {
    B: (sp_, o) => split0(sp_, { side: 'bottom', her: 0.48, id: o.id, draw: poster, enter: 0, sound: false }),
    G: (sp_, o) => talk0(sp_, { id: o.id, frame: 1 }),
    H: (sp_, o) => talk0(sp_, { id: o.id, frame: 1.0 }), I: (sp_, o) => talk0(sp_, { id: o.id, frame: 1.0 }),
    K: (sp_, o) => talk0(sp_, { id: o.id, frame: 1.0 }), M: (sp_, o) => talk0(sp_, { id: o.id, frame: 1.0 }),
  };
  TH.talk = (sp_, o = {}) => (talkF[FMT] ? talkF[FMT](sp_, o) : talk0(sp_, { ...o, frame: /close|tight/.test(o.frame || '') ? 'wide' : o.frame, punch: undefined, push: undefined }));
  if (first) TH.talk(s[first], { frame: 'mid', id: 'hook' });
  return true;
};
/** B / H-M: no plain-framing gaps (the format holds from the first frame to the last) */
SCF.fill = () => { const FMT = SCF.fmt(); if (!FMT || !/[BHIKM]/.test(FMT)) return;
  const sg = TH.segs.slice().sort((x, y) => x.t0 - y.t0); let t = 0;
  for (const x of sg) { if (x.t0 - t > 0.45) TH.talk([t, x.t0], { id: 'fmt-' + t.toFixed(1).replace('.', '_') }); t = Math.max(t, x.t1); }
  if (TOTAL - t > 0.45) TH.talk([t, TOTAL], { id: 'fmt-end' }); };

/* ---------- titles per format ---------- */
SCF.smallText = (key, def, draw, what) => { const sid = SCENE_ID; SCENE_ID = 'label'; EL.seen.delete('label/' + key); const ov = ovr(key); const str = ov.s != null ? ov.s : def;
  try { draw(ov, str, { text: str, def, kind: 'box', sk: ov.k, label: what }); } finally { SCENE_ID = sid; } };
/** the title set big inside r (League Gothic caps, the part after "|" in Inter Tight under it); editable as 'label' (or o.key) */
SCF.bigTitle = (r, o = {}) => {
  const sid = SCENE_ID; SCENE_ID = 'label'; const key = o.key || 'label'; EL.seen.delete('label/' + key); const ov = ovr(key); SCENE_ID = sid;
  const def = o.def != null ? o.def : SCF.lbl(); const str = ov.s != null ? ov.s : def;
  const info = { text: str, def, kind: 'box', sk: ov.k, label: o.what || 'title (text; "|" starts the second line)' };
  if (ov.hide) { const s2 = SCENE_ID; SCENE_ID = 'label'; regBox(ov, r.x, r.y, r.w, r.h, info); SCENE_ID = s2; return; }
  const [a, b] = SCF.parts(str); const maxW = r.w - (o.padX != null ? o.padX : 60) * 2; const maxL = o.maxL || 3;
  let z = o.zMax || 200, la = [];
  for (; z > 40; z -= 4) { la = SCF.wrap(a.toUpperCase(), SFN(z), maxW); const z2_ = Math.min(o.z2Max || 60, z * 0.4); const h = la.length * z * 0.95 + (b ? 18 + z2_ * 1.15 * 2 : 0);
    if (la.length <= maxL && h <= r.h && Math.max(...la.map(l => tw(l, SFN(z)))) <= maxW) break; }
  const z2 = Math.round(Math.min(o.z2Max || 60, z * 0.4)); const lb = b ? SCF.wrap(b, SFS(z2, 600), maxW) : [];
  const hh = la.length * z * 0.95 + (lb.length ? 18 + lb.length * z2 * 1.15 : 0);
  const y0 = r.y + (o.valign === 'top' ? 0 : o.valign === 'bottom' ? r.h - hh : (r.h - hh) / 2); const cx = r.x + r.w / 2;
  const s2 = SCENE_ID; SCENE_ID = 'label';
  moved(ov, () => { let y = y0 + z * 0.84;
    la.forEach((l) => { _txt(l, cx, y, SFN(z), o.col || SCF.LET, 'center'); y += z * 0.95; });
    y += 18 - z * 0.95 + z * 0.12 + z2; lb.forEach((l) => { _txt(l, cx, y, SFS(z2, 600), o.col2 || o.col || SCF.LET, 'center'); y += z2 * 1.15; });
    regBox(ov, r.x, y0, r.w, hh, info); }, [cx, y0]);
  SCENE_ID = s2;
};
SCF.tagK = () => SCF.smallText('tag', SCF.parts(SCF.lbl())[0].toUpperCase(), (ov, str, info) => { const z = 36, f = SFM(z), ls = z * 0.12; const w = tw(str, f, ls); const x = 64, y = 112;
  if (ov.hide) { regBox(ov, x, y - 34, w, 44, info); return; }
  moved(ov, () => { ctx.save(); SCF.soft(z); _txt(str, x, y, f, '#FFFFFF', 'left', 'alphabetic', ls); ctx.restore(); regBox(ov, x, y - 34, w, 44, info); }, [x, y]); }, 'small label top-left');
SCF.boxM = () => { const def = SCF.lbl().replace(/\s*\|\s*/, ' | ');
  SCF.smallText('label', def, (ov, str, info) => { const z = 66; const f = SFH(z, 800); const maxW = W - 220;
    const lines = str.split('|').map(x => x.trim()).filter(Boolean).flatMap(l => SCF.wrap(l, f, maxW)).slice(0, 3);
    const lh = z * 1.08, pw = 40, ph = 24; const bw = Math.max(...lines.map(l => tw(l, f))) + pw * 2, bh = lines.length * lh + ph * 2 - (lh - z); const x = CX - bw / 2, y = 168;
    if (ov.hide) { regBox(ov, x, y, bw, bh, info); return; }
    moved(ov, () => { fillRR(x, y, bw, bh, 28, '#FFFFFF'); lines.forEach((l, i) => _txt(l, CX, y + ph + z * 0.8 + i * lh, f, '#111111', 'center')); regBox(ov, x, y, bw, bh, info); }, [CX, y]); }, 'title box (text; "|" starts a new line)'); };
SCF.titleFmt = (t) => {
  const fm = SCF.fmt(); if (!SCF.lbl()) return;
  if (fm === 'D' && t < SCF.FLASH + 0.35) { const p = MOTION.ease(t, SCF.FLASH, 0.35, 'inOutQuart'); const h = 384;
    withT(0, -h * p, 1, 0, () => { rect(0, 0, W, h, SCF.LET); SCF.bigTitle({ x: 0, y: 40, w: W, h: h - 70 }, { zMax: 150, maxL: 2, z2Max: 50, col: SCF.INK }); }); }
  if (fm === 'F' && !SCF.inGfx(t)) SCF.bigTitle({ x: 0, y: 64, w: W, h: 200 }, { zMax: 110, maxL: 2, z2Max: 44, col: '#FFFFFF', col2: 'rgba(255,255,255,0.72)' });
  if (fm === 'K' && !SCF.inGfx(t)) SCF.tagK();
  if (fm === 'M' && !SCF.inGfx(t)) SCF.boxM();
  if (fm === 'G') { const on = SCF.inGfx(t); const a = 1 - SCF.gfx.reduce((m, [x, y]) => Math.max(m, t >= x - 0.01 && t < y ? Math.min(1, (t - x) / 0.2, (y - t) / 0.2) : 0), 0);
    if (a > 0.01) withA(on ? a : 1, () => SCF.bigTitle({ x: 0, y: 150, w: W, h: 440 }, { zMax: 170, maxL: 3, z2Max: 58, col: '#FFFFFF', col2: 'rgba(255,255,255,0.72)', valign: 'bottom' })); }
};

/* ---------- captions per format ---------- */
SCF.capDraw = (t) => {
  const c = (TH.caps || []).find(x => x.t0 <= t && t < x.t1); if (!c) return;
  if (TH.capOff.some(([a, b]) => t >= a && t < b)) return;
  const sc = SCENES[sceneIndex(t)]; if (sc && sc.card && t >= sc.start) return; if (sc && sc.noCaps) return;
  const ce = (EDIT.data.capShort || {})[c.i]; const raw = ce != null ? ce : c.text; const cst = EDIT.data.captions9 || {}; const fm = SCF.fmt();
  if (/[HIKM]/.test(fm)) return SCF.capNew(t, c, raw, ce, cst, fm);
  if (fm === 'D' && t < SCF.FLASH) return;
  const gfx = SCF.inGfx(t); const yN = FOOT.capYNow;
  const S = { A: gfx ? { f: 'disp', cy: 1790 } : { f: 'disp', cy: 1728, size: 96 },
    B: { f: 'inter', cy: 1800 },
    D: gfx ? { f: 'inter', cy: 905 } : { f: 'inter', cy: 196, size: 78 },
    F: { f: 'disp', cy: gfx ? 1790 : 1650, lit: true, size: 104 },
    G: { f: 'inter', cy: gfx ? 1745 : 1440, lit: true, size: 62 } }[fm] || { f: 'disp', cy: 1600 };
  let size = cst.size ? clamp(Math.round(cst.size), 40, 150) : (S.size || (S.f === 'disp' ? 92 : 70));
  const up = S.f === 'disp'; const text = up ? raw.toUpperCase() : raw; const ff = (z) => (up ? SFN(z) : SFS(z, 600)); let f = ff(size); const ls = up ? size * 0.01 : 0;
  const words = text.split(/\s+/).filter(Boolean); const maxW = W * 0.86; let lines = [words];
  if (tw(text, f, ls) > maxW) { let bi = 1, bm = 1e9; for (let k = 1; k < words.length; k++) { const m_ = Math.max(tw(words.slice(0, k).join(' '), f, ls), tw(words.slice(k).join(' '), f, ls)); if (m_ < bm) { bm = m_; bi = k; } } lines = [words.slice(0, bi), words.slice(bi)]; }
  { const wide = Math.max(...lines.map(l => tw(l.join(' '), f, ls))); if (wide > maxW) { size = Math.round(size * Math.max(0.66, maxW / wide)); f = ff(size); } }
  const lh = size * (up ? 0.96 : 1.18); const cy = cst.y != null ? cst.y : S.cy; const y0 = cy - (lines.length - 1) * lh / 2 + size * 0.36;
  let wt = null; if (S.lit) { const ws = (typeof WORDS !== 'undefined' ? WORDS : []).filter(w => w.t >= c.t0 - 0.05 && w.t < c.t1 - 0.02).map(w => w.t);
    wt = ws.length === words.length ? ws : words.map((_, i) => c.t0 + (c.t1 - c.t0) * 0.9 * i / Math.max(1, words.length)); }
  const hi = up && !S.lit ? SCF.hiWord(words) : -1;
  const widths = lines.map(l => tw(l.join(' '), f, ls)); const bw = Math.max(...widths) + 44, bt = y0 - size * 0.95, bh = (lines.length - 1) * lh + size * 1.3;
  ctx.save(); SCF.soft(size); const sp = tw(' ', f, ls); let k0 = 0;
  lines.forEach((ln, li) => { let x = CX - widths[li] / 2; const y = y0 + li * lh;
    ln.forEach((wd, j) => { const k = k0 + j; const col = k === hi ? SCF.HL : '#FFFFFF';
      if (S.lit && t < wt[k] - 0.02) { ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0)'; _txt(wd, x, y, f, fm === 'G' ? '#7C7C80' : 'rgba(255,255,255,0.4)', 'left', 'alphabetic', ls); ctx.restore(); }
      else _txt(wd, x, y, f, col, 'left', 'alphabetic', ls);
      x += tw(wd, f, ls) + sp; });
    k0 += ln.length; });
  ctx.restore();
  regBox({ id: 'caption/' + c.i, edited: ce != null, hide: false }, CX - bw / 2, bt, bw, bh, { kind: 'caption', text: raw, def: c.text, cue: c.i });
};
/** H / I: bold white caps, 2-3 words at a time on her word times, the cue's key word yellow. K: film subtitles (DM Serif Display,
 *  white on black boxes, low). M: small bold white sentence case with a soft shadow. */
SCF.capNew = (t, c, raw, ce, cst, fm) => {
  let gfx = SCF.inGfx(t); if (gfx && fm === 'H') { const cam = camAt(t); gfx = !!(cam && cam.boxed); }   // H: only while her picture is really moved up for a panel
  const S = { H: { cy: gfx ? 960 : 1500, size: 96, chunk: true, font: (z) => SFH(z, 900), up: true },
    I: { cy: 1540, size: 80, chunk: true, font: (z) => SFH(z, 900), up: true },
    K: { cy: 1690, size: 62, font: SFSER, box: true },
    M: { cy: gfx ? 1800 : 1560, size: 62, font: (z) => SFH(z, 800) } }[fm];
  let size = cst.size ? clamp(Math.round(cst.size), 44, 150) : S.size; const cy = cst.y != null ? cst.y : S.cy;
  const all = (S.up ? raw.toUpperCase() : raw).split(/\s+/).filter(Boolean); if (!all.length) return;
  const ws = (typeof WORDS !== 'undefined' ? WORDS : []).filter(w => w.t >= c.t0 - 0.05 && w.t < c.t1 - 0.02).map(w => w.t);
  const wt = ws.length === all.length ? ws : all.map((_, i) => c.t0 + (c.t1 - c.t0) * 0.9 * i / Math.max(1, all.length));
  const hi = S.up ? SCF.hiWord(all) : -1;
  let words = all, k0 = 0;
  if (S.chunk) { const ch = []; let cur = [];
    all.forEach((w, i) => { cur.push(i); if (/[,.?!:;]$/.test(w) || cur.length === 3) { ch.push(cur); cur = []; } });
    if (cur.length) { if (cur.length === 1 && ch.length && ch[ch.length - 1].length < 4) ch[ch.length - 1].push(...cur); else ch.push(cur); }
    let pick = ch[0]; for (const g_ of ch) if (t >= wt[g_[0]] - 0.08) pick = g_; words = pick.map(i => all[i]); k0 = pick[0]; }
  let f = S.font(size); const maxW = W * (S.box ? 0.84 : 0.86); let lines = [words]; const join = (l) => l.join(' ');
  if (tw(join(words), f) > maxW) { let bi = 1, bm = 1e9; for (let k = 1; k < words.length; k++) { const m_ = Math.max(tw(join(words.slice(0, k)), f), tw(join(words.slice(k)), f)); if (m_ < bm) { bm = m_; bi = k; } } lines = [words.slice(0, bi), words.slice(bi)]; }
  { const wide = Math.max(...lines.map(l => tw(join(l), f))); if (wide > maxW) { size = Math.round(size * Math.max(0.7, maxW / wide)); f = S.font(size); } }
  const lh = size * (S.box ? 1.32 : S.up ? 1.0 : 1.18); const y0 = cy - (lines.length - 1) * lh / 2 + size * 0.36;
  const widths = lines.map(l => tw(join(l), f)); const sp = tw(' ', f); let bx0 = 1e9, bx1 = -1e9; let kk = k0;
  ctx.save();
  lines.forEach((ln, li) => { const y = y0 + li * lh; let x = CX - widths[li] / 2; bx0 = Math.min(bx0, x); bx1 = Math.max(bx1, x + widths[li]);
    if (S.box) { const px = size * 0.32; fillRR(x - px, y - size * 0.86, widths[li] + px * 2, size * 1.2, 6, 'rgba(0,0,0,0.86)'); } else SCF.soft(size);
    ln.forEach((wd) => { _txt(wd, x, y, f, kk === hi ? SCF.HL : '#FFFFFF', 'left', 'alphabetic', 0); x += tw(wd, f) + sp; kk++; }); });
  ctx.restore();
  const bt = y0 - size * 0.95, bh = (lines.length - 1) * lh + size * 1.3; const pad = S.box ? size * 0.32 : 22;
  regBox({ id: 'caption/' + c.i, edited: ce != null, hide: false }, bx0 - pad, bt, bx1 - bx0 + pad * 2, bh, { kind: 'caption', text: raw, def: c.text, cue: c.i });
};

/* ---------- the cover frame (her note 2026-11-10: "the real cover should be on the video… it has nothing to do with thumbnails") ----------
 * Drawn OVER the first `dur` seconds (no time inserted: sound and captions stay in sync), so Instagram / TikTok / YouTube can
 * pick it as the cover. ONE style for the series: her still full frame 9:16 (tools/covers.py -> assets/covers/<id>.jpg, image
 * cover_<id>, drawn at 85 % and 490 px lower on a flat graphite ground, "scale" / "shift") + the line in heavy white Inter Tight with a soft shadow at y ~330-830 (inside the grid crop y 240-1680, above her
 * face), one word in yellow. "card": a flat colour ("bg") with fine same-hue diagonal lines, the line in ink, the word in white,
 * her cut-out (cover_<id>_cut) at the foot. Editable: the line = text 'cover/cover' (✎ Edit at t = 0), her cut-out = 'cover/@her'. */
SCF.coverOf = () => { const c = FOOT.m && FOOT.m.kind === 'short' && PORTRAIT ? FOOT.m.cover : null; return c && c.on !== false ? c : null; };
SCF.coverOn = (t) => { const c = SCF.coverOf(); return !!c && t >= 0 && t < (c.dur || 0.1); };
SCF.coverDraw = (t) => {
  const c = SCF.coverOf(); const id = FOOT.m.id; const card = c.style === 'card';
  const sid = SCENE_ID; SCENE_ID = 'cover'; EL.seen.clear();
  try {
    if (card) { rect(0, 0, W, H, c.bg || SCF.GO); ctx.save(); ctx.strokeStyle = 'rgba(18,18,18,0.07)'; ctx.lineWidth = 3; ctx.beginPath();
      for (let x = -H; x < W + H; x += 26) { ctx.moveTo(x, 0); ctx.lineTo(x + H * 0.6, H); } ctx.stroke(); ctx.restore();
      const im = IMG['cover_' + id + '_cut']; if (im) { const h = 1000, w = im.width / im.height * h; const x = CX - w / 2, y = Math.min(H, 1680 + 40) - h;
        grp('her', x, y, w, h, () => themeFixed(() => ctx.drawImage(im, x, y, w, h)), { img: true, label: 'her cut-out (drag to move, corners to resize)' }); }
    } else {   // her still at 85 % (c.scale) moved down (c.shift px, default 490: the top of her head near y 950, chin ~1470) on a flat band of the video's ground; the line goes above her head
      const im = IMG['cover_' + id]; const k = c.scale || 0.85, dy = c.shift != null ? c.shift : 490; const w = W * k, h = H * k, x = (W - w) / 2; rect(0, 0, W, H, SCF.GROUND);
      if (im) grp('her', x, dy, w, h, () => themeFixed(() => ctx.drawImage(im, x, dy, w, h)), { img: true, label: 'her still (drag to move, corners to resize)' }); }
    const ov = ovr('cover'); const str = ov.s != null ? ov.s : (c.text || FOOT.m.title || '');
    const info = { text: str, def: c.text || '', kind: 'box', sk: ov.k, label: 'cover line (text; ~word~ = the coloured word)' };
    const segs = []; str.split(/(~[^~]+~)/).filter(Boolean).forEach(p_ => { const on = /^~.*~$/.test(p_);
      p_.replace(/~/g, '').split(/\s+/).filter(Boolean).forEach(w => { if (/^[,.?!:;]+$/.test(w) && segs.length) segs[segs.length - 1].w2 = w; else segs.push({ w, on }); }); });
    const maxW = W - 150, top = card ? 290 : 330, maxH = card ? 400 : 500;   // photo: the line on her top, under her face (her face sits high in this framing, y ~300-640)
    const lay0 = (zz, mw) => { const f = SFH(zz, 900); const sp = tw(' ', f); const L = [[]]; let cw = 0;
      for (const s_ of segs) { const ww = tw(s_.w + (s_.w2 || ''), f); if (L[L.length - 1].length && cw + sp + ww > mw) { L.push([]); cw = 0; } cw += (L[L.length - 1].length ? sp : 0) + ww; L[L.length - 1].push(s_); } return L; };
    const ok = (L, zz) => L.length * zz * 1.06 <= maxH && (L.length === 1 || L[L.length - 1].length >= 2);
    const pick = (zz, maxL) => { let L = lay0(zz, maxW); if (L.length > maxL) return null; if (ok(L, zz)) return L;
      for (let k = 0.96; k > 0.5; k -= 0.03) { const L2 = lay0(zz, maxW * k); if (L2.length > L.length) break; if (ok(L2, zz)) return L2; } return null; };
    let z, lines = null; for (z = 132; z >= 96 && !lines; z -= 4) lines = pick(z, 3); if (lines) z += 4;
    if (!lines) for (z = 132; z > 60; z -= 4) { lines = lay0(z, maxW); if (lines.length <= 4 && lines.length * z * 1.06 <= maxH) break; }
    const f = SFH(z, 900), sp = tw(' ', f), lh = z * 1.06; const ww_ = (s_) => tw(s_.w + (s_.w2 || ''), f);
    const bw = Math.max(...lines.map(l => l.reduce((a, s_, i) => a + ww_(s_) + (i ? sp : 0), 0)));
    const hiCol = card ? (c.hi || '#FFFFFF') : SCF.HL; const base = card ? SCF.INK : '#FFFFFF';   // card: the word in white, or c.hi on a light card
    if (ov.hide) { regBox(ov, CX - bw / 2, top, bw, lines.length * lh, info); return; }
    moved(ov, () => { ctx.save(); if (!card) { ctx.shadowColor = 'rgba(0,0,0,0.6)'; ctx.shadowBlur = z * 0.35; ctx.shadowOffsetY = z * 0.04; }
      lines.forEach((l, i) => { const lw = l.reduce((a, s_, k) => a + ww_(s_) + (k ? sp : 0), 0); let x = CX - lw / 2; const y = top + z * 0.86 + i * lh;
        for (const s_ of l) { _txt(s_.w, x, y, f, s_.on ? hiCol : base, 'left', 'alphabetic', 0); if (s_.w2) _txt(s_.w2, x + tw(s_.w, f), y, f, base, 'left', 'alphabetic', 0); x += ww_(s_) + sp; } });
      ctx.restore(); regBox(ov, CX - bw / 2, top, bw, lines.length * lh, info); }, [CX, top]);
  } finally { SCENE_ID = sid; }
};

/* ---------- post: cover, then captions + title by format (shorts with a fmt only; everything else as before) ---------- */
(function scfPost() {
  const post0 = TH.post;
  TH.post = (t) => {
    const fm = SCF.fmt(); const hasCover = !!SCF.coverOf();
    if (!fm && !hasCover) return post0(t);
    const isShort = FOOT.m.kind === 'short'; const sc = SHOW.captions;
    if (fm) SHOW.captions = false;
    try { post0(t); } finally { SHOW.captions = sc; }
    if (isShort && t >= FOOT.dur) return;
    ctx.save(); ctx.setTransform(...BASE);
    if (SCF.coverOn(t)) { SCF.coverDraw(t); ctx.restore(); ctx.setTransform(1, 0, 0, 1, 0, 0); return; }
    if (fm) { if (sc) { SCENE_ID = 'captions'; SCF.capDraw(t); } SCF.titleFmt(t); }
    ctx.restore(); ctx.setTransform(1, 0, 0, 1, 0, 0);
  };
})();
