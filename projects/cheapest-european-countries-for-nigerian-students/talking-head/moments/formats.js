/* cheapest-countries shorts: a MIX of formats (her note 2026-11-08 "everything is the same format"; SHORTS-PLAYBOOK "Format menu" A-M)
 * + a cover frame in every short (her note 2026-11-10). Ported from http-status-codes (via the scholarships port) to this video's
 * type set 06 (League Gothic headlines, Inter Tight body, DM Mono tag) and colours (off-black #111114, warm paper #EDE9E2, ONE accent
 * safety orange #FF4713 = the cue's key word / amount, as in the edit's "costs more").
 * Manifest per short: "fmt" A|B|D|F|G|H|I|K|M (+ "frame9" for the format's framing), "topLabel" = the title ("|" = second line),
 * "cover" {on, dur, at, text ("~word~" = the orange word), style "photo"|"card", card colour "bg", "scale", "shift"}.
 * plan.js PC_PLAN short calls PCF.setup() when the short has a fmt (else the old 3:4 window + top title, unchanged).
 * Every text is editable in the moment editor (title = 'label', poster, tag, cover line = 'cover/cover'). Loaded after plan.js. */
'use strict';
const PCF = { HL: '#FF4713', INK: '#111114', LET: '#EDE9E2', GROUND: '#111114', GO: '#FF4713', gfx: [], popN: 0, FLASH: 1.6 };
(function scfFonts() {   // Inter Tight 800 / 900 (H, I, M, covers) + DM Serif Display (K subtitles) + DM Mono (K tag), from library/fonts (OFL)
  for (const [fam, file, desc] of [['PCFHeavy', 'InterTightExtraBold.ttf', { weight: '800' }], ['PCFHeavy', 'InterTightBlack.ttf', { weight: '900' }], ['PCFSerif', 'DMSerifDisplay-Regular.ttf', {}], ['PCFMono', 'DMMono-Medium.ttf', {}]]) {
    try { const x = new XMLHttpRequest(); x.open('GET', '/library/fonts/' + file, false); x.overrideMimeType('text/plain; charset=x-user-defined'); x.send();
      if (x.status !== 200) continue; const s = x.responseText, u = new Uint8Array(s.length); for (let i = 0; i < s.length; i++) u[i] = s.charCodeAt(i) & 255;
      const ff = new FontFace(fam, u.buffer, desc); document.fonts.add(ff); ff.load(); } catch (e) { /* the editor falls back to Inter Tight */ } }
})();
const SFN = (z) => FX(z);                                  // League Gothic at exactly z px (pckit FX)
const SFS = (z, w = 600) => `${w} ${z}px PCI, "Inter Tight"`;
const SFH = (z, w = 900) => `${w} ${z}px PCI, PCFHeavy, "Inter Tight"`;
const SFSER = (z) => `400 ${z}px PCFSerif`;
const SFM = (z) => `400 ${z}px PCFMono`;
PCF.wrap = (s, font, maxW) => { const ws = String(s).split(/\s+/).filter(Boolean); const out = []; let cur = '';
  for (const w of ws) { const n = cur ? cur + ' ' + w : w; if (cur && tw(n, font) > maxW) { out.push(cur); cur = w; } else cur = n; } if (cur) out.push(cur); return out; };
PCF.soft = (z) => { ctx.shadowColor = 'rgba(0,0,0,0.55)'; ctx.shadowBlur = Math.max(8, z * 0.28); ctx.shadowOffsetY = Math.max(1, z * 0.03); };
PCF.fmt = () => (typeof FOOT !== 'undefined' && FOOT.m && FOOT.m.kind === 'short' && PORTRAIT ? (FOOT.m.fmt || null) : null);
PCF.inGfx = (t) => PCF.gfx.some(([a, b]) => t >= a && t < b);
PCF.lbl = () => FOOT.m.topLabel || FOOT.m.title || '';
PCF.parts = (str) => { const m = String(str).match(/^([\s\S]*?)[ \t]*\|[ \t]*([\s\S]*)$/); return m ? [m[1].replace(/\s+$/, ''), m[2].replace(/^\s+/, '')] : [String(str), '']; };   // v4: her own line breaks (Shift+Enter) survive the "|" split
PCF.NUM = /[€\d]/;
PCF.WEAK = new Set(['a', 'an', 'the', 'to', 'for', 'of', 'in', 'on', 'at', 'and', 'so', 'is', 'or', 'but', 'with', 'my', 'your', 'that', 'i', 'it', 'be', 'are', 'was', 'can', 'will', 'as', 'if', 'like', 'this', 'there', 'they', 'you', 'we', 'what', 'just', 'one', 'some', 'have', 'has', 'not', 'them', 'who', 'also', 'then', 'when', 'which', 'really', 'very', 'about', "it's", "that's", "you're", "don't", "i'm", 'going', 'think', 'would', 'their', 'these', 'those', 'from', 'because', 'does', 'even', 'more']);
/** the cue's key word: an amount / number first, else the longest word that carries meaning */
PCF.hiWord = (ws) => { const nn = (w) => w.toLowerCase().replace(/[^a-z0-9€']/g, '');
  const ni = ws.findIndex(w => PCF.NUM.test(w)); if (ni >= 0) return ni;
  let best = -1, sc = -1; ws.forEach((w, i) => { const n = nn(w); if (!n || PCF.WEAK.has(n)) return; if (n.length > sc) { sc = n.length; best = i; } }); return best; };

/* ---------- where graphics go per format (called from PC_PLAN short) ---------- */
PCF.setup = (s, first) => {
  const FMT = PCF.fmt(); if (!FMT) return false;
  PCF.gfx = []; PCF.popN = 0; TH.look.band = PCF.GROUND; TH.labelBottom = () => 0;   // graphics use the whole panel (every format hides its title over graphics)
  const half0 = TH.half, split0 = TH.split, pres0 = TH.presenter, talk0 = TH.talk;
  const mark = (sg) => { if (sg && sg.t1 - sg.t0 < 0.6) { const k = TH.segs.indexOf(sg); if (k >= 0) TH.segs.splice(k, 1); return sg; } if (sg) PCF.gfx.push([sg.t0, sg.t1]); return sg; };   // a graphic squeezed under 0.6 s by a cut is dropped
  const filmOf = (o, aspect) => (o.film ? { ...o.film, aspect, fit: aspect === '16x9' ? 'contain' : undefined } : undefined);
  const asDraw = (o, q, aspect) => { if (o.draw) return o.draw; if (!o.film) return null; const f = { ...o.film, aspect, fit: 'contain' }; TH.filmNeed(f);
    return (t, r) => { rect(r.x, r.y, r.w, r.h, PCF.GROUND); TH.drawFilm(t, r, f, q); }; };
  // G: her letterbox band slides down (still her whole 16:9 frame), the graphic opens in a 16:9-ish box above it
  const lbBox = (sp_, o) => { const q = TH.span(sp_, o); const draw = asDraw(o, q, '16x9');
    const sg = TH.seg('half', q, o, (t) => { const e = MOTION.ease(t, q.t0, 0.45, 'outQuint'); if (e <= 0.001) return;
      const r = { x: 0, y: 0, w: W, h: 976 }; ctx.save(); ctx.beginPath(); ctx.rect(0, r.y + r.h * (1 - e), W, r.h * e); ctx.clip(); rect(r.x, r.y, r.w, r.h, PCF.GROUND); if (draw) draw(t, r); ctx.restore();
      FOOT.panelRect = { x: 0, y: r.y, w: W, h: r.h }; }, () => CAM(q.t0, { box: [0, 1000, W, Math.round(W * 9 / 16)], z: 1, d: 0.45, ease: 'inOutQuart' }));
    sfx('swipe', q.t0 + 0.2, -4); return sg; };
  // I: the graphic is a card that pops up OVER her full frame (above her head, a slight tilt, a soft shadow); she never moves
  const POP = { x: 84, y: 56, w: 912, h: 500 };   // above her head (her full-bleed face sits at y ~650-1150)
  const popCard = (sp_, o) => { const q = TH.span(sp_, o); const k = ++PCF.popN; const tilt = (k % 2 ? -1 : 1) * 0.03; const draw = asDraw(o, q, '16x9');
    const sg = TH.seg('pops', q, o, (t) => { const pin = MOTION.ease(t, q.t0, 0.42, 'outBack'), pout = MOTION.ease(t, q.t1 - 0.22, 0.22, 'inExpo'); if (pin <= 0.001 || pout >= 0.999) return;
      const r = POP; const cx = r.x + r.w / 2, cy = r.y + r.h / 2; const sc = (0.82 + 0.18 * pin) * (1 - 0.12 * pout);
      grp('card', r.x, r.y, r.w, r.h, () => withA(clamp(Math.min(pin * 2.5, 1 - pout)), () => {
        ctx.save(); ctx.translate(cx, cy); ctx.rotate(tilt * (1 + 0.6 * (1 - pin))); ctx.scale(sc, sc); ctx.translate(-cx, -cy);
        ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.38)'; ctx.shadowBlur = 46; ctx.shadowOffsetY = 18; fillRR(r.x, r.y, r.w, r.h, 26, PCF.GROUND); ctx.restore();
        ctx.save(); rr(r.x, r.y, r.w, r.h, 26); ctx.clip(); if (draw) draw(t, { x: r.x, y: r.y, w: r.w, h: r.h }); ctx.restore(); ctx.restore(); }), { label: 'pop-up card (drag to move, corners to resize)' });
      FOOT.panelRect = { x: r.x, y: r.y, w: r.w, h: r.h }; }, () => CAM(q.t0, { z: 1.0 }));
    sfx('pop', q.t0 + 0.06, -4); return sg; };
  // X (board 62): a CUT to a full-screen insert, the graphic on top (y 100-1250), her in a circle under it (board 62 frame 2), captions under her (y ~1780)
  const CIR = { cx: CX, cy: 1458, d: 400 };
  const fullCut = (sp_, o) => { const q = TH.span(sp_, o); const draw = asDraw(o, q, '9x16');
    const sg = TH.seg('cutaway', q, o, (t) => { const r = { x: 30, y: 100, w: W - 60, h: 1150 }; const rad = CIR.d / 2 * clamp(MOTION.ease(t, q.t0 + 0.05, 0.3, 'outBack'), 0, 1.1);
      ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W, H); if (rad > 0.5) ctx.arc(CIR.cx, CIR.cy, rad, 0, Math.PI * 2, true); ctx.clip('evenodd'); rect(0, 0, W, H, PCF.GROUND);
      ctx.save(); ctx.beginPath(); ctx.rect(0, 0, W, r.y + r.h); ctx.clip(); if (draw) draw(t, r); ctx.restore(); ctx.restore();
      if (rad > 0.5) { ctx.save(); ctx.beginPath(); ctx.arc(CIR.cx, CIR.cy, rad, 0, Math.PI * 2); ctx.strokeStyle = PCF.LET; ctx.lineWidth = 6; ctx.stroke(); ctx.restore(); }
      FOOT.panelRect = r; }, () => CAM(q.t0, { box: [CIR.cx - CIR.d / 2, CIR.cy - CIR.d / 2, CIR.d, CIR.d], face: 0.5, fx: 0.5, fy: 0.46 }), { cover: true });
    sfx('shutter', q.t0 + 0.02, -5); return sg; };
  const top9 = (sz) => (sp_, o) => half0(sp_, { side: 'top', size: sz, id: o.id, ground: o.ground, draw: o.draw, film: filmOf(o, '9x16'), noCaps: o.noCaps, lead: o.lead, z: 1.3 });
  const GFX = {
    A: (sp_, o) => half0(sp_, { side: 'top', size: 1050, id: o.id, ground: o.ground, draw: o.draw, film: filmOf(o, '9x16'), noCaps: o.noCaps, lead: o.lead, z: 1.35 }),
    B: (sp_, o) => split0(sp_, { side: 'bottom', her: 0.48, id: o.id, ground: o.ground, draw: o.draw, film: filmOf(o, '9x16'), noCaps: o.noCaps, lead: o.lead, enter: 0.3 }),
    D: (sp_, o) => split0(sp_, { side: 'top', her: 0.44, id: o.id, ground: o.ground, draw: o.draw, film: filmOf(o, '9x16'), noCaps: o.noCaps, lead: o.lead, z: 1.25 }),
    F: top9(1000), K: top9(940), M: top9(1000),
    G: (sp_, o) => lbBox(sp_, o),
    H: (sp_, o) => half0(sp_, { side: 'bottom', size: 900, id: o.id, ground: o.ground, draw: o.draw, film: filmOf(o, '9x16'), noCaps: o.noCaps, lead: o.lead, z: 1.25, fy: 0.42 }),
    I: (sp_, o) => popCard(sp_, o),
    X: (sp_, o) => fullCut(sp_, o),
    N: (sp_, o) => half0(sp_, { side: 'bottom', size: 900, id: o.id, ground: o.ground, draw: o.draw, film: filmOf(o, '9x16'), noCaps: o.noCaps, lead: o.lead, z: 1.25, fy: 0.42 }),   // board 69: the white title box, graphics rise from the foot (her moved up)
    S: (sp_, o) => split0(sp_, { side: 'bottom', her: 0.5, id: o.id, ground: o.ground || 'pcBlack', draw: o.draw, film: filmOf(o, '9x16'), noCaps: o.noCaps, lead: o.lead, z: 1.15, enter: 0.32 }),
  };
  const gfx = (sp_, o = {}) => mark((GFX[FMT] || GFX.A)(sp_, o));
  TH.tile = gfx; TH.room = gfx; TH.ots = gfx; TH.presenter = gfx; TH.half = gfx; TH.cutaway = gfx;
  TH.split = (sp_, o = {}) => (o.draw || o.film ? gfx(sp_, o) : split0(sp_, o));
  // her talking: B = the title poster over her; G her whole frame; H I K M her frame full bleed at z 1 (face ~30 % of the height)
  const poster = (t, r) => { rect(r.x, r.y, r.w, r.h, PCF.GROUND); PCF.bigTitle({ x: r.x, y: r.y + 10, w: r.w, h: r.h - 20 }, { zMax: 230, maxL: 3, z2Max: 64, col: PCF.LET, col2: PCF.HL }); };
  // 2026-11-12 her note ("you add a zoom effect by yourselves... at least remove the zoom effect"): no automatic zooms on her in a
  // short. Every L1 talk in a short uses one framing (no mid / close / push / punch); full-screen formats H I K M (and G, her whole frame) stay at z 1
  // all through, also in the gaps between segments (the L1 default framing would be 8 % tighter).
  if (/^[GHIKMXSN]$/.test(FMT) && TH.look && TH.look.talk && TH.look.talk.z) TH.look.talk = { ...TH.look.talk, z: [TH.look.talk.z[0], 1.0] };
  const talkF = {
    B: (sp_, o) => split0(sp_, { side: 'bottom', her: 0.48, id: o.id, draw: poster, enter: 0, sound: false }),
    G: (sp_, o) => talk0(sp_, { id: o.id, frame: 1 }),
    H: (sp_, o) => talk0(sp_, { id: o.id, frame: 1.0 }), I: (sp_, o) => talk0(sp_, { id: o.id, frame: 1.0 }),
    K: (sp_, o) => talk0(sp_, { id: o.id, frame: 1.0 }), M: (sp_, o) => talk0(sp_, { id: o.id, frame: 1.0 }),
    X: (sp_, o) => talk0(sp_, { id: o.id, frame: 1.0 }), N: (sp_, o) => talk0(sp_, { id: o.id, frame: 1.0 }), S: (sp_, o) => talk0(sp_, { id: o.id, frame: 1.0 }),
  };
  // ONE quick punch-in on her key word (manifest "punch": {"id": <talk id>, "word": "..."}): in 0.25 s, back out 0.9 s later (her note 2026-11-12: a zoom once in a while is fine)
  const pu = FOOT.m.punch; if (pu && talkF[FMT]) { const tf = talkF[FMT]; talkF[FMT] = (sp_, o) => { if (o.id !== pu.id) return tf(sp_, o);
    const q = TH.span(sp_, o); const tw_ = TH.timeOf(pu.word, q); if (tw_ == null) return tf(sp_, o);
    return TH.seg('talk', q, o, null, () => { CAM(q.t0, { z: 1.0 }); CAM(tw_ - 0.04, { z: pu.z || 1.16, d: 0.25, ease: 'outQuint' }); CAM(tw_ + (pu.hold || 0.9), { z: 1.0, d: 0.35, ease: 'inOutQuart' }); }); }; }
  TH.talk = (sp_, o = {}) => (talkF[FMT] ? talkF[FMT](sp_, o) : talk0(sp_, { ...o, frame: 'wide', punch: undefined, push: undefined, alt: undefined }));
  if (first) TH.talk(s[first], { frame: 'mid', id: 'hook' });
  return true;
};
/** B / H-M: no plain-framing gaps (the format holds from the first frame to the last) */
PCF.fill = () => { const FMT = PCF.fmt(); if (!FMT || !/[BHIKMXSN]/.test(FMT)) return;
  const sg = TH.segs.slice().sort((x, y) => x.t0 - y.t0); let t = 0;
  for (const x of sg) { if (x.t0 - t > 0.45) TH.talk([t, x.t0], { id: 'fmt-' + t.toFixed(1).replace('.', '_') }); t = Math.max(t, x.t1); }
  if (TOTAL - t > 0.45) TH.talk([t, TOTAL], { id: 'fmt-end' }); };

/* ---------- titles per format ---------- */
PCF.smallText = (key, def, draw, what) => { const sid = SCENE_ID; SCENE_ID = 'label'; EL.seen.delete('label/' + key); const ov = ovr(key); const str = ov.s != null ? ov.s : def;
  try { draw(ov, str, { text: str, def, kind: 'box', sk: ov.k, label: what }); } finally { SCENE_ID = sid; } };
/** the title set big inside r (League Gothic caps, the part after "|" in Inter Tight under it); editable as 'label' (or o.key) */
PCF.bigTitle = (r, o = {}) => {
  const sid = SCENE_ID; SCENE_ID = 'label'; const key = o.key || 'label'; EL.seen.delete('label/' + key); const ov = ovr(key); SCENE_ID = sid;
  const def = o.def != null ? o.def : PCF.lbl(); const str = ov.s != null ? ov.s : def;
  const info = { text: str, def, kind: 'box', sk: ov.k, label: o.what || 'title (text; "|" starts the second line)' };
  if (ov.hide) { const s2 = SCENE_ID; SCENE_ID = 'label'; regBox(ov, r.x, r.y, r.w, r.h, info); SCENE_ID = s2; return; }
  const [a, b] = PCF.parts(str); const maxW = r.w - (o.padX != null ? o.padX : 60) * 2; const maxL = o.maxL || 3;
  let z = o.zMax || 200, la = [];
  for (; z > 40; z -= 4) { la = PCF.wrap(a.toUpperCase(), SFN(z), maxW); const z2_ = Math.min(o.z2Max || 60, z * 0.4); const h = la.length * z * 0.95 + (b ? 18 + z2_ * 1.15 * 2 : 0);
    if (la.length <= maxL && h <= r.h && Math.max(...la.map(l => tw(l, SFN(z)))) <= maxW) break; }
  const z2 = Math.round(Math.min(o.z2Max || 60, z * 0.4)); const lb = b ? PCF.wrap(b, SFS(z2, 600), maxW) : [];
  const hh = la.length * z * 0.95 + (lb.length ? 18 + lb.length * z2 * 1.15 : 0);
  const y0 = r.y + (o.valign === 'top' ? 0 : o.valign === 'bottom' ? r.h - hh : (r.h - hh) / 2); const cx = r.x + r.w / 2;
  const s2 = SCENE_ID; SCENE_ID = 'label';
  moved(ov, () => { let y = y0 + z * 0.84;
    la.forEach((l) => { _txt(l, cx, y, SFN(z), o.col || PCF.LET, 'center'); y += z * 0.95; });
    y += 18 - z * 0.95 + z * 0.12 + z2; lb.forEach((l) => { _txt(l, cx, y, SFS(z2, 600), o.col2 || o.col || PCF.LET, 'center'); y += z2 * 1.15; });
    regBox(ov, r.x, y0, r.w, hh, info); }, [cx, y0]);
  SCENE_ID = s2;
};
PCF.tagK = () => PCF.smallText('tag', PCF.parts(PCF.lbl())[0].toUpperCase(), (ov, str, info) => { const z = 36, f = SFM(z), ls = z * 0.12; const w = tw(str, f, ls); const x = 64, y = 112;
  if (ov.hide) { regBox(ov, x, y - 34, w, 44, info); return; }
  moved(ov, () => { ctx.save(); PCF.soft(z); _txt(str, x, y, f, '#FFFFFF', 'left', 'alphabetic', ls); ctx.restore(); regBox(ov, x, y - 34, w, 44, info); }, [x, y]); }, 'small label top-left');
PCF.boxM = () => { const def = PCF.lbl().replace(/\s*\|\s*/, ' | ');
  PCF.smallText('label', def, (ov, str, info) => { const z = 66; const f = SFH(z, 800); const maxW = W - 220;
    const lines = str.split('|').map(x => x.trim()).filter(Boolean).flatMap(l => PCF.wrap(l, f, maxW)).slice(0, 3);
    const lh = z * 1.08, pw = 40, ph = 24; const bw = Math.max(...lines.map(l => tw(l, f))) + pw * 2, bh = lines.length * lh + ph * 2 - (lh - z); const x = CX - bw / 2, y = 168;
    if (ov.hide) { regBox(ov, x, y, bw, bh, info); return; }
    moved(ov, () => { fillRR(x, y, bw, bh, 28, '#FFFFFF'); lines.forEach((l, i) => _txt(l, CX, y + ph + z * 0.8 + i * lh, f, '#111111', 'center')); regBox(ov, x, y, bw, bh, info); }, [CX, y]); }, 'title box (text; "|" starts a new line)'); };
PCF.titleFmt = (t) => {
  const fm = PCF.fmt(); if (!PCF.lbl()) return;
  if (fm === 'D' && t < PCF.FLASH + 0.35) { const p = MOTION.ease(t, PCF.FLASH, 0.35, 'inOutQuart'); const h = 384;
    withT(0, -h * p, 1, 0, () => { rect(0, 0, W, h, PCF.LET); PCF.bigTitle({ x: 0, y: 40, w: W, h: h - 70 }, { zMax: 150, maxL: 2, z2Max: 50, col: PCF.INK }); }); }
  if (fm === 'F' && !PCF.inGfx(t)) PCF.bigTitle({ x: 0, y: 64, w: W, h: 200 }, { zMax: 110, maxL: 2, z2Max: 44, col: '#FFFFFF', col2: 'rgba(255,255,255,0.72)' });
  if (fm === 'K' && !PCF.inGfx(t)) PCF.tagK();
  if (fm === 'M' && !PCF.inGfx(t)) PCF.boxM();
  if (fm === 'G') { const on = PCF.inGfx(t); const a = 1 - PCF.gfx.reduce((m, [x, y]) => Math.max(m, t >= x - 0.01 && t < y ? Math.min(1, (t - x) / 0.2, (y - t) / 0.2) : 0), 0);
    if (a > 0.01) withA(on ? a : 1, () => PCF.bigTitle({ x: 0, y: 150, w: W, h: 440 }, { zMax: 170, maxL: 3, z2Max: 58, col: '#FFFFFF', col2: 'rgba(255,255,255,0.72)', valign: 'bottom' })); }
};

/* ---------- captions per format ---------- */
PCF.capDraw = (t) => {
  const c = (TH.caps || []).find(x => x.t0 <= t && t < x.t1); if (!c) return;
  if (TH.capOff.some(([a, b]) => t >= a && t < b)) return;
  const sc = SCENES[sceneIndex(t)]; if (sc && sc.card && t >= sc.start) return; if (sc && sc.noCaps) return;
  const ce = (EDIT.data.capShort || {})[c.i]; const raw = ce != null ? ce : c.text; const cst = EDIT.data.captions9 || {}; const fm = PCF.fmt();
  if (/[HIKM]/.test(fm)) return PCF.capNew(t, c, raw, ce, cst, fm);
  if (fm === 'D' && t < PCF.FLASH) return;
  const gfx = PCF.inGfx(t); const yN = FOOT.capYNow;
  const S = { A: gfx ? { f: 'disp', cy: 1790 } : { f: 'disp', cy: 1728, size: 96 },
    B: { f: 'inter', cy: 1800 },
    D: gfx ? { f: 'inter', cy: 790 } : { f: 'inter', cy: 196, size: 78 },
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
  const hi = up && !S.lit ? PCF.hiWord(words) : -1;
  const widths = lines.map(l => tw(l.join(' '), f, ls)); const bw = Math.max(...widths) + 44, bt = y0 - size * 0.95, bh = (lines.length - 1) * lh + size * 1.3;
  ctx.save(); PCF.soft(size); const sp = tw(' ', f, ls); let k0 = 0;
  lines.forEach((ln, li) => { let x = CX - widths[li] / 2; const y = y0 + li * lh;
    ln.forEach((wd, j) => { const k = k0 + j; const col = k === hi ? PCF.HL : '#FFFFFF';
      if (S.lit && t < wt[k] - 0.02) { ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0)'; _txt(wd, x, y, f, fm === 'G' ? '#A3A3A8' : 'rgba(255,255,255,0.4)', 'left', 'alphabetic', ls); ctx.restore(); }
      else _txt(wd, x, y, f, col, 'left', 'alphabetic', ls);
      x += tw(wd, f, ls) + sp; });
    k0 += ln.length; });
  ctx.restore();
  regBox({ id: 'caption/' + c.i, edited: ce != null, hide: false }, CX - bw / 2, bt, bw, bh, { kind: 'caption', text: raw, def: c.text, cue: c.i });
};
/** H / I: bold white caps, 2-3 words at a time on her word times, the cue's key word yellow. K: film subtitles (DM Serif Display,
 *  white on black boxes, low). M: small bold white sentence case with a soft shadow. */
PCF.capNew = (t, c, raw, ce, cst, fm) => {
  let gfx = PCF.inGfx(t); if (gfx && fm === 'H') { const cam = camAt(t); gfx = !!(cam && cam.boxed); }   // H: only while her picture is really moved up for a panel
  const S = { H: { cy: gfx ? 850 : 1500, size: 96, chunk: true, font: (z) => SFH(z, 900), up: true },
    I: { cy: 1540, size: 80, chunk: true, font: (z) => SFH(z, 900), up: true },
    K: { cy: 1690, size: 62, font: SFSER, box: true },
    M: { cy: gfx ? 1800 : 1560, size: 62, font: (z) => SFH(z, 800) } }[fm];
  let size = cst.size ? clamp(Math.round(cst.size), 44, 150) : S.size; const cy = cst.y != null ? cst.y : S.cy;
  const all = (S.up ? raw.toUpperCase() : raw).split(/\s+/).filter(Boolean); if (!all.length) return;
  const ws = (typeof WORDS !== 'undefined' ? WORDS : []).filter(w => w.t >= c.t0 - 0.05 && w.t < c.t1 - 0.02).map(w => w.t);
  const wt = ws.length === all.length ? ws : all.map((_, i) => c.t0 + (c.t1 - c.t0) * 0.9 * i / Math.max(1, all.length));
  const hi = S.up ? PCF.hiWord(all) : -1;
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
    if (S.box) { const px = size * 0.32; fillRR(x - px, y - size * 0.86, widths[li] + px * 2, size * 1.2, 6, 'rgba(0,0,0,0.86)'); } else PCF.soft(size);
    ln.forEach((wd) => { _txt(wd, x, y, f, kk === hi ? PCF.HL : '#FFFFFF', 'left', 'alphabetic', 0); x += tw(wd, f) + sp; kk++; }); });
  ctx.restore();
  const bt = y0 - size * 0.95, bh = (lines.length - 1) * lh + size * 1.3; const pad = S.box ? size * 0.32 : 22;
  regBox({ id: 'caption/' + c.i, edited: ce != null, hide: false }, bx0 - pad, bt, bx1 - bx0 + pad * 2, bh, { kind: 'caption', text: raw, def: c.text, cue: c.i });
};

/* ---------- the cover frame (her note 2026-11-10: "the real cover should be on the video… it has nothing to do with thumbnails") ----------
 * Drawn OVER the first `dur` seconds (no time inserted: sound and captions stay in sync), so Instagram / TikTok / YouTube can
 * pick it as the cover. ONE style for the series: her still full frame 9:16 (tools/covers.py -> assets/covers/<id>.jpg, image
 * cover_<id>, drawn at 85 % and 600 px lower on the off-black ground, "scale" / "shift") + the line in heavy white Inter Tight with a soft shadow at y ~300-680 (inside the grid crop y 240-1680, above her
 * face), one word in yellow. "card": a flat colour ("bg") with fine same-hue diagonal lines, the line in ink, the word in white,
 * her cut-out (cover_<id>_cut) at the foot. Editable: the line = text 'cover/cover' (✎ Edit at t = 0), her cut-out = 'cover/@her'. */
PCF.coverOf = () => { const c = FOOT.m && FOOT.m.kind === 'short' && PORTRAIT ? FOOT.m.cover : null; return c && c.on !== false ? c : null; };
PCF.coverOn = (t) => { const c = PCF.coverOf(); return !!c && t >= 0 && t < (c.dur || 0.1); };
PCF.coverDraw = (t) => {
  // styles: "photo" her still lowered, the line above her head · "card" flat colour + her cut-out · "frame" flat colour + a real page / slide
  // under the line (image cover_<id>_frame, "frameW" < 1 = centred with a soft shadow) · "big": true = the line alone, big (2026-11-12, as edge cases)
  const c = PCF.coverOf(); const id = FOOT.m.id; const BC = (typeof PCB !== 'undefined' && PCB.COVER[PCB.B()]) || {}; const CF = BC.font || ((z_) => SFH(z_, 900));   const frame = c.style === 'frame'; const card = c.style === 'card' || frame; const big = !!c.big;   // 2026-11-12 v2: BC = the board's own type (boards.js PCB.COVER), no line pattern
  const sid = SCENE_ID; SCENE_ID = 'cover'; EL.seen.clear();
  try {
    const bgI = BC.bgImg && IMG['px_' + BC.bgImg]; const bgDraw = () => { if (!bgI) return; const s_ = Math.max(W / bgI.width, H / bgI.height); themeFixed(() => ctx.drawImage(bgI, (W - bgI.width * s_) / 2, (H - bgI.height * s_) / 2, bgI.width * s_, bgI.height * s_)); rect(0, 0, W, H, `rgba(0,0,0,${BC.dim || 0.4})`); };
    if (card) { rect(0, 0, W, H, BC.bg || c.bg || PCF.GO); bgDraw();
      if (frame) { const fi = IMG['cover_' + id + '_frame']; const dy = c.shift != null ? c.shift : 900; if (fi) { const fw = W * (c.frameW || 1), fh = fw / fi.width * fi.height, fx = (W - fw) / 2;
        grp('frame', fx, dy, fw, fh, () => themeFixed(() => { ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.35)'; ctx.shadowBlur = 40; ctx.shadowOffsetY = 14; rect(fx - 24, dy - 24, fw + 48, fh + 48, '#FFFFFF'); ctx.restore(); ctx.drawImage(fi, fx, dy, fw, fh);
          if (c.credit) { _txt(c.credit, fx - 24, dy + fh + 80, SFM(32), PCF.INK, 'left'); } }), { img: true, label: 'the real page under the cover line' }); } }
      const im = frame || big ? null : IMG['cover_' + id + '_cut']; if (im) { const h = 1120, w = im.width / im.height * h; const x = CX - w / 2, y = H - h;
        grp('her', x, y, w, h, () => themeFixed(() => ctx.drawImage(im, x, y, w, h)), { img: true, label: 'her cut-out (drag to move, corners to resize)' }); }
    } else if (!big) { const im = IMG['cover_' + id]; const k = c.scale || 0.85, dy = c.shift != null ? c.shift : 600; const w = W * k, h = H * k, x = (W - w) / 2; rect(0, 0, W, H, PCF.GROUND);
      if (im) grp('her', x, dy, w, h, () => themeFixed(() => ctx.drawImage(im, x, dy, w, h)), { img: true, label: 'her still (drag to move, corners to resize)' }); }
    else { rect(0, 0, W, H, BC.bg || c.bg || PCF.GROUND); bgDraw(); }
    const ov = ovr('cover'); const str = ov.s != null ? ov.s : (c.text || FOOT.m.title || '');
    const info = { text: str, def: c.text || '', kind: 'box', sk: ov.k, label: 'cover line (text; ~word~ = the coloured word)' };
    const segs = []; str.split(/(~[^~]+~)/).filter(Boolean).forEach(p_ => { const on = /^~.*~$/.test(p_);
      (BC.up ? p_.toUpperCase() : p_).replace(/~/g, '').split(/\s+/).filter(Boolean).forEach(w => { if (/^[,.?!:;)]+$/.test(w) && segs.length) segs[segs.length - 1].w2 = w; else segs.push({ w, on }); }); });
    const maxW = W - (big ? 140 : 150), maxH = c.maxH != null ? c.maxH : big ? (frame ? 640 : 1100) : frame ? 520 : card ? 400 : 380;
    let top = c.top != null ? c.top : frame ? (big ? 190 : 200) : big ? 0 : card ? 290 : 300;
    const lay0 = (zz, mw) => { const f = CF(zz); const sp = tw(' ', f); const L = [[]]; let cw = 0;
      for (const s_ of segs) { const ww = tw(s_.w + (s_.w2 || ''), f); if (L[L.length - 1].length && cw + sp + ww > mw) { L.push([]); cw = 0; } cw += (L[L.length - 1].length ? sp : 0) + ww; L[L.length - 1].push(s_); } return L; };
    const fitsW = (L, zz) => { const f_ = CF(zz), sp_ = tw(' ', f_); return L.every(l => l.reduce((a, s_, i) => a + tw(s_.w + (s_.w2 || ''), f_) + (i ? sp_ : 0), 0) <= maxW); };
    const ok = (L, zz) => L.length * zz * 1.06 <= maxH && fitsW(L, zz) && (L.length === 1 || (big ? L.every(l => l.length >= 2 || l[0].w.length > 3) : L[L.length - 1].length >= 2));
    const pick = (zz, maxL) => { let L = lay0(zz, maxW); if (L.length > maxL) return null; if (ok(L, zz)) return L;
      for (let k = 0.96; k > 0.5; k -= 0.03) { const L2 = lay0(zz, maxW * k); if (L2.length > L.length) break; if (ok(L2, zz)) return L2; } return null; };
    let z = big ? 250 : 132, lines = null; for (; z >= 96 && !lines; z -= 4) lines = pick(z, big ? 5 : 3); if (lines) z += 4;
    if (!lines) for (z = 132; z > 60; z -= 4) { lines = lay0(z, maxW); if (lines.length <= 5 && lines.length * z * 1.06 <= maxH) break; }
    const f = CF(z), sp = tw(' ', f), lh = z * 1.06; if (big && !frame) top = (H - lines.length * lh) / 2 - z * 0.1; const ww_ = (s_) => tw(s_.w + (s_.w2 || ''), f);
    const lw_ = (l) => l.reduce((a, s_, i) => a + ww_(s_) + (i ? sp : 0), 0); const bw = Math.max(...lines.map(lw_));
    const light = !bgI && (card || (big && (BC.bg || c.bg) && (BC.bg || c.bg) !== PCF.GROUND)); const hiCol = BC.hi || (light ? (c.hi || '#FFFFFF') : PCF.HL); const base = BC.ink || (light ? (c.ink || PCF.INK) : '#FFFFFF');
    if (ov.hide) { regBox(ov, CX - bw / 2, top, bw, lines.length * lh, info); return; }
    moved(ov, () => { ctx.save(); if (!light) { ctx.shadowColor = 'rgba(0,0,0,0.6)'; ctx.shadowBlur = z * 0.35; ctx.shadowOffsetY = z * 0.04; }
      lines.forEach((l, i) => { let x = CX - lw_(l) / 2; const y = top + z * 0.86 + i * lh;
        for (const s_ of l) { const wv = tw(s_.w, f);
          if (light && s_.on && c.block) { rect(x - z * 0.08, y - z * 0.84, wv + z * 0.16, z * 1.04, PCF.INK); _txt(s_.w, x, y, f, c.block, 'left'); }
          else _txt(s_.w, x, y, f, s_.on ? hiCol : base, 'left');
          if (s_.w2) _txt(s_.w2, x + wv, y, f, base, 'left'); x += ww_(s_) + sp; } });
      ctx.restore(); regBox(ov, CX - bw / 2, top, bw, lines.length * lh, info); }, [CX, top]);
  } finally { SCENE_ID = sid; }
};


/* ---------- board formats (her note 2026-11-12: "All the shorts should not be the same... they are there for a reason") ----------
 * Manifest "board": N = item N of inspiration/short-formats/formats.json (studio /ideas/formats/ "Formats N"). The layout comes
 * from "fmt" (H I K M G D + X = cut to a full-screen insert, S = graphic on top / her below); the caption + title LOOK copies board N:
 *  37 NasDaily: thin italic serif + giant condensed caps with a white edge as the title; plain white sans sentence captions
 *  62 mixed fonts: each caption line its own type (cream serif + italic accent / tilted heavy caps / script), cuts to inserts
 *  66 pop-up screenshots: bold caps with a black edge, key word in colour, 2-3 words at a time
 *  25 screenshot on top, her below: huge bold sentence-case captions on the join
 *  69 white rounded title box (fmt M) + small bold serif white captions
 *  17 captions as black text in white rounded boxes (TikTok text style)
 *  68 condensed caps captions at the TOP (dark band), the key word's first letter boxed in orange
 *  67 (fmt K: serif on black boxes) gets the small line icon top right; 40 (fmt G letterbox) a plain sans title
 * Every word stays editable: captions ✎ per cue, the title = 'label'. */
(function boardFonts() {
  for (const [fam, file, desc] of [['PCFItal', 'InstrumentSerif-Italic.ttf', {}], ['PCFScript', 'Caveat.ttf', { weight: '400 700' }], ['PCFNews', 'Newsreader.ttf', { weight: '200 800' }]]) {
    try { const x = new XMLHttpRequest(); x.open('GET', '/library/fonts/' + file, false); x.overrideMimeType('text/plain; charset=x-user-defined'); x.send();
      if (x.status !== 200) continue; const s = x.responseText, u = new Uint8Array(s.length); for (let i = 0; i < s.length; i++) u[i] = s.charCodeAt(i) & 255;
      const ff = new FontFace(fam, u.buffer, desc); document.fonts.add(ff); ff.load(); } catch (e) { /* falls back */ } }
})();
const SFI = (z) => `400 ${z}px PCFItal, PCFSerif`;
const SFC = (z) => `700 ${z}px PCFScript`;
const SFNW = (z) => `700 ${z}px PCFNews, PCFSerif`;
PCF.gfxNow = (t) => { if (!PCF.inGfx(t)) return false; const sc = SCENES[sceneIndex(t)]; return !!(sc && sc.layout && sc.layout !== 'L1 talk'); };   // a graphic really on screen now (not only planned)
PCF.B = () => (PCF.fmt() && FOOT.m.board) || 0;
PCF.boxedNow = (t) => { if (!PCF.inGfx(t)) return false; const cam = camAt(t); return !!(cam && cam.boxed); };
PCF.edgeTxt = (s, x, y, f, fill, edge, lw) => { setFont(f, 0); ctx.lineJoin = 'round'; ctx.miterLimit = 2; ctx.textAlign = 'left'; ctx.textBaseline = 'alphabetic';
  ctx.lineWidth = lw; ctx.strokeStyle = edge; ctx.strokeText(s, x, y); ctx.fillStyle = fill; ctx.fillText(s, x, y); };
/** split words into 1-2 balanced lines that fit maxW, shrinking down to 70 % */
PCF.lay = (words, font, size, maxW, minK = 0.7) => { const j = (l) => l.join(' '); let f = font(size); let lines = [words];
  if (tw(j(words), f) > maxW && words.length > 1) { let bi = 1, bm = 1e9; for (let k = 1; k < words.length; k++) { const m_ = Math.max(tw(j(words.slice(0, k)), f), tw(j(words.slice(k)), f)); if (m_ < bm) { bm = m_; bi = k; } } lines = [words.slice(0, bi), words.slice(bi)]; }
  const wide = Math.max(...lines.map(l => tw(j(l), f))); if (wide > maxW) { size = Math.round(size * Math.max(minK, maxW / wide)); f = font(size); }
  return { lines, size, f }; };
PCF.cueTimes = (c, n) => { const ws = (typeof WORDS !== 'undefined' ? WORDS : []).filter(w => w.t >= c.t0 - 0.05 && w.t < c.t1 - 0.02).map(w => w.t);
  return ws.length === n ? ws : Array.from({ length: n }, (_, i) => c.t0 + (c.t1 - c.t0) * 0.9 * i / Math.max(1, n)); };
PCF.chunk = (all, wt, t, n = 3) => { const ch = []; let cur = [];
  all.forEach((w, i) => { cur.push(i); if (/[,.?!:;]$/.test(w) || cur.length === n) { ch.push(cur); cur = []; } });
  if (cur.length) { if (cur.length === 1 && ch.length && ch[ch.length - 1].length < n + 1) ch[ch.length - 1].push(...cur); else ch.push(cur); }
  // never end a chunk on a small word ("EU PAY A"): it moves to the next chunk (critic 2026-11-12)
  const wk = (i) => PCF.WEAK.has(all[i].toLowerCase().replace(/[^a-z']/g, '')) && !/[,.?!:;]$/.test(all[i]);
  for (let k = 0; k < ch.length - 1; k++) while (ch[k].length > 1 && wk(ch[k][ch[k].length - 1])) ch[k + 1].unshift(ch[k].pop());
  let pick = ch[0]; for (const g_ of ch) if (t >= wt[g_[0]] - 0.08) pick = g_; return pick; };
/** draw lines of words centred on cy; st = {font, size, lh, fill, hi, hiFill, hiFont, edge, edgeW, shadow, box, boxFill, boxInk, rot, letter} */
PCF.capLines = (c, raw, ce, words, k0, st) => {
  const L = PCF.lay(words, st.font, st.size, st.maxW || W * 0.86, st.minK || 0.7); const size = L.size, f = L.f; const lh = size * (st.lh || 1.12);
  const cy = st.cy; const y0 = cy - (L.lines.length - 1) * lh / 2 + size * 0.36; const sp = tw(' ', f);
  const fw = (wd, kk) => (kk === st.hi && st.hiFont ? st.hiFont(size) : f);
  const widths = L.lines.map((l, li) => { let kk = k0 + L.lines.slice(0, li).reduce((a, x) => a + x.length, 0); return l.reduce((a, wd, j) => a + tw(wd, fw(wd, kk + j)) + (j ? sp : 0), 0); });
  let bx0 = 1e9, bx1 = -1e9, kk = k0;
  ctx.save();
  if (st.rot) { ctx.translate(CX, cy); ctx.rotate(st.rot); ctx.translate(-CX, -cy); }
  L.lines.forEach((ln, li) => { const y = y0 + li * lh; let x = CX - widths[li] / 2; bx0 = Math.min(bx0, x); bx1 = Math.max(bx1, x + widths[li]);
    if (st.box) { const px = size * 0.38; ctx.save(); fillRR(x - px, y - size * 0.92, widths[li] + px * 2, size * 1.3, size * 0.26, st.boxFill || '#FFFFFF'); ctx.restore(); }
    ln.forEach((wd) => { const ff = fw(wd, kk); const on = kk === st.hi; const col = on ? (st.hiFill || PCF.HL) : (st.fill || '#FFFFFF');
      if (st.letter && on) { const l1 = tw(wd[0], ff); rect(x - size * 0.03, y - size * 0.86, l1 + size * 0.06, size * 0.98, PCF.HL); _txt(wd[0], x, y, ff, '#FFFFFF', 'left'); _txt(wd.slice(1), x + l1, y, ff, '#FFFFFF', 'left'); }
      else if (st.edge) PCF.edgeTxt(wd, x, y, ff, col, st.edge, st.edgeW || size * 0.16);
      else { ctx.save(); if (st.shadow) { ctx.shadowColor = st.shadow; ctx.shadowBlur = size * (st.blur || 0.3); ctx.shadowOffsetY = size * (st.drop || 0.04); } _txt(wd, x, y, ff, col, 'left'); ctx.restore(); }
      x += tw(wd, ff) + sp; kk++; }); });
  ctx.restore();
  const bt = y0 - size * 0.95, bh = (L.lines.length - 1) * lh + size * 1.3, pad = st.box ? size * 0.38 : 22;
  regBox({ id: 'caption/' + c.i, edited: ce != null, hide: false }, bx0 - pad, bt, bx1 - bx0 + pad * 2, bh, { kind: 'caption', text: raw, def: c.text, cue: c.i });
};
const SOFT = 'rgba(0,0,0,0.6)';
PCF.BCAP = {
  37: (t, c, raw, ce, cst) => { const ws = raw.split(/\s+/).filter(Boolean);
    PCF.capLines(c, raw, ce, ws, 0, { font: (z) => SFH(z, 700), size: cst.size || 64, cy: cst.y != null ? cst.y : PCF.boxedNow(t) ? 860 : 1500, shadow: SOFT, hi: -1, lh: 1.16, maxW: W * 0.82 }); },
  62: (t, c, raw, ce, cst) => { const ws = raw.split(/\s+/).filter(Boolean); const cy = cst.y != null ? cst.y : PCF.gfxNow(t) ? 1775 : 1480; const kz = PCF.gfxNow(t) ? 0.78 : 1;
    const kind = ws.length <= 4 && c.i % 4 === 3 ? 'script' : ['serif', 'caps', 'serif', 'caps'][c.i % 4];
    if (kind === 'serif') return PCF.capLines(c, raw, ce, ws, 0, { font: SFSER, size: cst.size || Math.round(84 * kz), cy, fill: PCF.LET, hi: PCF.hiWord(ws), hiFont: (z) => SFI(z * 1.18), hiFill: PCF.HL, shadow: SOFT, lh: 1.1 });
    if (kind === 'caps') { const up = ws.map(w => w.toUpperCase()); return PCF.capLines(c, raw, ce, up, 0, { font: (z) => SFH(z, 900), size: cst.size || Math.round(96 * kz), cy, fill: '#FFFFFF', hi: -1, shadow: SOFT, rot: c.i % 8 === 1 ? -0.07 : 0.06, lh: 0.98 }); }
    return PCF.capLines(c, raw, ce, ws, 0, { font: SFC, size: cst.size || Math.round(124 * kz), cy, fill: PCF.HL, hi: -1, shadow: 'rgba(0,0,0,0.45)', rot: -0.05, lh: 0.95 }); },
  66: (t, c, raw, ce, cst) => { const all = raw.toUpperCase().split(/\s+/).filter(Boolean); const wt = PCF.cueTimes(c, all.length); const pick = PCF.chunk(all, wt, t, 3);
    const hi = PCF.hiWord(all); PCF.capLines(c, raw, ce, pick.map(i => all[i]), pick[0], { font: (z) => SFH(z, 900), size: cst.size || 84, cy: cst.y != null ? cst.y : 1680, fill: '#FFFFFF', hi, hiFill: PCF.HL, edge: '#000000', lh: 1.0 }); },
  25: (t, c, raw, ce, cst) => { const ws = raw.split(/\s+/).filter(Boolean);
    PCF.capLines(c, raw, ce, ws, 0, { font: (z) => SFH(z, 800), size: cst.size || 90, cy: cst.y != null ? cst.y : PCF.gfxNow(t) ? 880 : 1580, shadow: 'rgba(0,0,0,0.85)', blur: 0.22, drop: 0.07, hi: -1, lh: 1.08, maxW: W * 0.9 }); },
  69: (t, c, raw, ce, cst) => { const ws = raw.split(/\s+/).filter(Boolean);
    PCF.capLines(c, raw, ce, ws, 0, { font: SFNW, size: cst.size || 58, cy: cst.y != null ? cst.y : PCF.boxedNow(t) ? 860 : 1690, shadow: 'rgba(0,0,0,0.7)', blur: 0.25, hi: -1, lh: 1.16, maxW: W * 0.8 }); },
  17: (t, c, raw, ce, cst) => { const ws = raw.split(/\s+/).filter(Boolean);
    PCF.capLines(c, raw, ce, ws, 0, { font: (z) => SFH(z, 800), size: cst.size || 60, cy: cst.y != null ? cst.y : PCF.boxedNow(t) ? 860 : 1480, fill: '#111111', box: true, hi: -1, lh: 1.3, maxW: W * 0.78 }); },
  68: (t, c, raw, ce, cst) => { if (t < PCF.FLASH) return; const ws = raw.toUpperCase().split(/\s+/).filter(Boolean);
    PCF.capLines(c, raw, ce, ws, 0, { font: SFN, size: cst.size || 108, cy: cst.y != null ? cst.y : PCF.gfxNow(t) ? 720 : 236, fill: '#FFFFFF', hi: PCF.hiWord(ws), letter: true, lh: 0.94, maxW: W * 0.88 }); },
};
(function boardCaps() {
  const cap0 = PCF.capDraw;
  PCF.capDraw = (t) => { const fn = PCF.BCAP[PCF.B()]; if (!fn) return cap0(t);
    const c = (TH.caps || []).find(x => x.t0 <= t && t < x.t1); if (!c) return;
    if (TH.capOff.some(([a, b]) => t >= a && t < b)) return;
    const sc = SCENES[sceneIndex(t)]; if (sc && sc.card && t >= sc.start) return; if (sc && sc.noCaps) return;
    const ce = (EDIT.data.capShort || {})[c.i]; const raw = ce != null ? ce : c.text; fn(t, c, raw, ce, EDIT.data.captions9 || {}); };
})();

/* ---------- titles per board (editable as 'label'; "|" = the second part) ---------- */
PCF.bTitle = (draw, what) => PCF.smallText('label', PCF.lbl(), (ov, str, info) => { const [a, b] = PCF.parts(str);
  const bb = draw(null, a, b); if (ov.hide) { regBox(ov, bb[0], bb[1], bb[2], bb[3], info); return; }
  moved(ov, () => { draw(true, a, b); regBox(ov, bb[0], bb[1], bb[2], bb[3], info); }, [CX, bb[1]]); }, what || 'title (text; "|" starts the second part)');
const fitZ = (s, font, z, maxW, min = 30) => { while (z > min && tw(s, font(z)) > maxW) z -= 2; return z; };
PCF.BTITLE = {
  69: () => PCF.boxM(),
  37: () => PCF.bTitle((on, a, b) => { const z1 = fitZ(a, SFI, 96, W - 160), B_ = (b || '').toUpperCase(), z2 = fitZ(B_, SFN, 250, W - 110, 80);
    const y1 = 90 + z1 * 0.8, y2 = y1 + 14 + z2 * 0.86;
    if (on) { ctx.save(); ctx.shadowColor = SOFT; ctx.shadowBlur = 20; _txt(a, CX, y1, SFI(z1), '#FFFFFF', 'center'); ctx.restore();
      if (B_) PCF.edgeTxt(B_, CX - tw(B_, SFN(z2)) / 2, y2, SFN(z2), PCF.HL, '#FFFFFF', z2 * 0.06); }
    const w_ = Math.max(tw(a, SFI(z1)), B_ ? tw(B_, SFN(z2)) : 0); return [CX - w_ / 2, 90, w_, (B_ ? y2 : y1) - 90 + 24]; }),
  62: () => PCF.bTitle((on, a, b) => { const z1 = fitZ(a, SFSER, 84, W - 160), z2 = fitZ(b || '', SFI, 132, W - 140); const y1 = 110 + z1 * 0.82, y2 = y1 + z2 * 0.9;
    if (on) { ctx.save(); ctx.shadowColor = SOFT; ctx.shadowBlur = 22; _txt(a, CX, y1, SFSER(z1), PCF.LET, 'center'); if (b) _txt(b, CX, y2, SFI(z2), PCF.HL, 'center'); ctx.restore(); }
    const w_ = Math.max(tw(a, SFSER(z1)), b ? tw(b, SFI(z2)) : 0); return [CX - w_ / 2, 110, w_, (b ? y2 : y1) - 110 + 30]; }),
  66: () => PCF.bTitle((on, a, b) => { const z = 56; const ls = [a, b].filter(Boolean); const y0 = 120 + z * 0.8;
    if (on) ls.forEach((l, i) => PCF.edgeTxt(l, CX - tw(l, SFH(z, 900)) / 2, y0 + i * z * 1.1, SFH(z, 900), '#FFFFFF', '#000000', z * 0.16));
    const w_ = Math.max(...ls.map(l => tw(l, SFH(z, 900)))); return [CX - w_ / 2, 120, w_, ls.length * z * 1.1 + 10]; }),
  25: () => PCF.bTitle((on, a, b) => { const z = 60; const ls = [a, b].filter(Boolean); const y0 = 130 + z * 0.8;
    if (on) { ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.8)'; ctx.shadowBlur = 16; ctx.shadowOffsetY = 4; ls.forEach((l, i) => _txt(l, CX, y0 + i * z * 1.12, SFH(z, 800), '#FFFFFF', 'center')); ctx.restore(); }
    const w_ = Math.max(...ls.map(l => tw(l, SFH(z, 800)))); return [CX - w_ / 2, 130, w_, ls.length * z * 1.12 + 10]; }),
  17: () => PCF.bTitle((on, a, b) => { const z = 44, ls_ = z * 0.08; const s = [a, b].filter(Boolean).join(' ').toUpperCase(); const L = PCF.wrap(s, SFH(z, 800), W - 200).slice(0, 2); const y0 = 130 + z * 0.8;
    if (on) { ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.75)'; ctx.shadowBlur = 14; L.forEach((l, i) => _txt(l, CX, y0 + i * z * 1.2, SFH(z, 800), '#FFFFFF', 'center', 'alphabetic', ls_)); ctx.restore(); }
    const w_ = Math.max(...L.map(l => tw(l, SFH(z, 800), ls_))); return [CX - w_ / 2, 130, w_, L.length * z * 1.2 + 10]; }),
  68: () => PCF.bTitle((on, a, b) => { const z = 34, s = [a, b].filter(Boolean).join(' ').toUpperCase(); const w_ = tw(s, SFM(z), z * 0.1);
    if (on) _txt(s, CX - w_ / 2, 80, SFM(z), PCF.HL, 'left', 'alphabetic', z * 0.1); return [CX - w_ / 2, 46, w_, 46]; }, 'small topic line (text)'),
  40: () => PCF.bTitle((on, a, b) => { const z1 = fitZ(a, (z) => SFS(z, 700), 88, W - 140), z2 = Math.round(z1 * 0.62); const y2 = 560, y1 = b ? y2 - z2 * 1.25 : y2;
    if (on) { _txt(a, CX, y1, SFS(z1, 700), '#FFFFFF', 'center'); if (b) _txt(b, CX, y2, SFS(z2, 500), 'rgba(255,255,255,0.72)', 'center'); }
    const w_ = Math.max(tw(a, SFS(z1, 700)), b ? tw(b, SFS(z2, 500)) : 0); return [CX - w_ / 2, y1 - z1, w_, y2 - y1 + z1 + 20]; }),
};
/* 67: a small line icon top right that says what this part is about (a pin for the city, papers, coins, scales) */
PCF.ICON = { pin: /city/, doc: /isee|papers|list/, coins: /pof|funds|fee|blocked/, scale: /vs|pair|two/ };
PCF.icon = (t) => { const segs = TH.segs.filter(x => x.kind !== 'talk' && !/^fmt-|^hook/.test(x.id)).sort((p, q) => p.t0 - q.t0); if (!segs.length) return;
  let s = segs[0]; for (const x of segs) if (x.t0 <= t + 0.01) s = x; let kind = 'doc'; for (const [k, re] of Object.entries(PCF.ICON)) if (re.test(s.id)) { kind = k; break; }
  const x0 = W - 168, y0 = 96, z = 92; ctx.save(); ctx.strokeStyle = '#FFFFFF'; ctx.lineWidth = 5; ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.shadowColor = 'rgba(0,0,0,0.45)'; ctx.shadowBlur = 10; ctx.beginPath();
  const X = (u) => x0 + u * z, Y = (v) => y0 + v * z;
  if (kind === 'pin') { ctx.arc(X(0.5), Y(0.38), z * 0.3, Math.PI * 0.85, Math.PI * 2.15); ctx.lineTo(X(0.5), Y(0.98)); ctx.closePath(); ctx.moveTo(X(0.62), Y(0.38)); ctx.arc(X(0.5), Y(0.38), z * 0.12, 0, Math.PI * 2); }
  else if (kind === 'doc') { ctx.rect(X(0.18), Y(0.04), z * 0.64, z * 0.9); for (const v of [0.3, 0.48, 0.66]) { ctx.moveTo(X(0.32), Y(v)); ctx.lineTo(X(0.68), Y(v)); } }
  else if (kind === 'coins') { for (const v of [0.82, 0.6, 0.38]) { ctx.moveTo(X(0.86), Y(v)); ctx.ellipse(X(0.5), Y(v), z * 0.36, z * 0.12, 0, 0, Math.PI * 2); } ctx.moveTo(X(0.14), Y(0.38)); ctx.lineTo(X(0.14), Y(0.82)); ctx.moveTo(X(0.86), Y(0.38)); ctx.lineTo(X(0.86), Y(0.82)); }
  else { ctx.moveTo(X(0.5), Y(0.08)); ctx.lineTo(X(0.5), Y(0.92)); ctx.moveTo(X(0.3), Y(0.92)); ctx.lineTo(X(0.7), Y(0.92)); ctx.moveTo(X(0.08), Y(0.24)); ctx.lineTo(X(0.92), Y(0.24));
    ctx.moveTo(X(0.08), Y(0.24)); ctx.lineTo(X(0.0), Y(0.56)); ctx.lineTo(X(0.26), Y(0.56)); ctx.closePath(); ctx.moveTo(X(0.92), Y(0.24)); ctx.lineTo(X(0.74), Y(0.56)); ctx.lineTo(X(1.0), Y(0.56)); ctx.closePath(); }
  ctx.stroke(); ctx.restore(); };
(function boardTitles() {
  const t0 = PCF.titleFmt;
  PCF.titleFmt = (t) => { const b = PCF.B(); const fn = PCF.BTITLE[b];
    if (b === 67 && !PCF.inGfx(t)) PCF.icon(t);
    if (!fn) return t0(t); if (!PCF.lbl()) return;
    if (b === 68) { t0(t); if (t >= PCF.FLASH && !PCF.inGfx(t)) fn(); return; }   // D: the title flash first, then the small topic line over the captions
    if (b === 40) { const on = PCF.inGfx(t); const a = 1 - PCF.gfx.reduce((m, [x, y]) => Math.max(m, t >= x - 0.01 && t < y ? Math.min(1, (t - x) / 0.2, (y - t) / 0.2) : 0), 0); if (a > 0.01) withA(on ? a : 1, fn); return; }
    if (!PCF.inGfx(t)) fn(); };
})();

/* ---------- post: cover, then captions + title by format (shorts with a fmt only; everything else as before) ---------- */
(function scfPost() {
  const post0 = TH.post;
  TH.post = (t) => {
    const fm = PCF.fmt(); const hasCover = !!PCF.coverOf();
    if (!fm && !hasCover) return post0(t);
    const isShort = FOOT.m.kind === 'short'; const sc = SHOW.captions;
    if (fm) SHOW.captions = false;
    try { post0(t); } finally { SHOW.captions = sc; }
    if (isShort && t >= FOOT.dur) return;
    ctx.save(); ctx.setTransform(...BASE);
    if (PCF.coverOn(t)) { PCF.coverDraw(t); ctx.restore(); ctx.setTransform(1, 0, 0, 1, 0, 0); return; }
    if (fm) { if (sc) { SCENE_ID = 'captions'; PCF.capDraw(t); } PCF.titleFmt(t); }
    ctx.restore(); ctx.setTransform(1, 0, 0, 1, 0, 0);
  };
})();
