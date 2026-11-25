/* should-you-learn-to-code: shorts FORMATS + the COVER frame (rollout 2026-11-10; ported from dark-patterns/http-status-codes,
 * SHORTS-PLAYBOOK "Format menu" + "Cover frame"). Her notes: "everything is the same format" (2026-11-08), "some look so similar,
 * it's just the colour" (2026-11-09), "the real cover should be on the video" (2026-11-10).
 * Manifest per short: "fmt" A|B|C|D|F|G|H|I|J|K|M + "frame9" (A wide, B/C 4x5, D wideLow, F 1x1top, G letterbox, H/I/K/M fill,
 * J none = cut-out), "label" = the title ("|" = second line), "poster" = the words on J's screen / behind C.
 * Type: this video's set 03 (Helvetica Neue 700 + 300 / 500, DM Mono labels); colours: ink #1B1F24, grey #E9EBEE, ONE accent amber
 * #F2A900 (the key word, B's poster ground, the cover word); captions never white on amber.
 * Editable in the moment editor: captions (caption/<n>), the title 'label/label', the poster 'label/poster', K's tag 'label/tag',
 * the cover line 'cover/cover' (scrub to 0:00), a card cover's cut-out 'cover/@her'.
 * Cover: "cover" {on, dur 0.1, at, text ("~word~" = amber), style "photo"|"card", card "bg"/"hi", photo "scale"/"shift"/"top"}.
 * Loaded last in the manifest "common"; RV_PLAN('short') calls LCF.fmtInstall. */
'use strict';
const LCF = { pink: RV.amb, ink: RV.ink, white: '#FFFFFF' };   // "pink" = this video's one accent (amber), the name kept from the port
G.lcAmb = { bg: RV.amb, fg: RV.ink, mid: '#5A4300', line: 'rgba(27,31,36,0.14)', acc: RV.ink, card: RV.wh, panel: '#E39E00', grid: 'rgba(0,0,0,0)', mode: 'light' };
LCF.isKey0 = (w) => { const n = String(w).toLowerCase().replace(/[^a-z0-9%.'-]/g, '').replace(/[.]$/, ''); return !!n && (/\d/.test(n) || RV.TOPIC.has(n)); };
LCF.FMT = (FOOT.m && FOOT.m.kind === 'short' && FOOT.m.fmt) || null;
LCF.gfxSpans = []; LCF.popN = 0;
if (LCF.FMT) {
  TH.look.ground = 'rvInk';
  TH.look.band = LCF.FMT === 'A' ? LCF.pink : /[BC]/.test(LCF.FMT) ? LCF.pink : '#111114';
  LCF.labText = FOOT.m.label || ''; FOOT.m.label = '';   // the built-in label steps aside: each format draws its own title
  TH.labelBottom = () => 0;
  TH.capOff.push([0, 1e9]);                              // the built-in captions step aside (they still make the .srt)
}
const HN = (z, w = 700) => `${w} ${z}px "Helvetica Neue"`;
LCF.inGfx = (t) => LCF.gfxSpans.some(([a, b]) => t >= a && t < b);
LCF.soft = (z) => { ctx.shadowColor = 'rgba(0,0,0,0.55)'; ctx.shadowBlur = Math.max(8, z * 0.16); ctx.shadowOffsetY = 2; };
LCF.wrap = (s, f, maxW) => { const out = []; let cur = ''; for (const w of String(s).split(/\s+/).filter(Boolean)) { const nx = cur ? cur + ' ' + w : w; if (cur && tw(nx, f) > maxW) { out.push(cur); cur = w; } else cur = nx; } if (cur) out.push(cur); return out; };
LCF.labelParts = (s) => { const i = String(s).indexOf('|'); return i < 0 ? [String(s).trim(), ''] : [s.slice(0, i).trim(), s.slice(i + 1).trim()]; };
LCF.isKey = (w) => LCF.isKey0(w);
LCF.hiWord = (ws) => { const i = RV.ambWord(ws); return i >= 0 ? i : ws.findIndex(w => LCF.isKey(w)); };

/* ---------- layouts per format (called from DP_PLAN('short')) ---------- */
LCF.fmtInstall = (s, first) => {
  const FMT = LCF.FMT; if (!FMT) return null;
  const keep = { half: TH.half, split: TH.split, ots: TH.ots, presenter: TH.presenter, room: TH.room, tile: TH.tile, talk: TH.talk };
  const half0 = keep.half, split0 = keep.split, pres0 = keep.presenter, talk0 = keep.talk;
  const mark = (sg) => { if (sg) LCF.gfxSpans.push([sg.t0, sg.t1]); return sg; };
  const pass = (o) => ({ id: o.id, draw: o.draw, noCaps: o.noCaps, lead: o.lead, until: o.until, hold: o.hold });
  const lbBox = (sp_, o) => {   // G: her letterbox band slides down (her whole 16:9 frame), the graphic opens above it
    const q = TH.span(sp_, o); return TH.seg('half', q, o, (t) => { const e = MOTION.ease(t, q.t0, 0.45, 'outQuint'); if (e <= 0.001) return;
      const r = { x: 0, y: 0, w: W, h: 976 }; const g0 = g; g = G[o.ground || 'rvInk'] || g0;
      ctx.save(); ctx.beginPath(); ctx.rect(0, r.y + r.h * (1 - e), W, r.h * e); ctx.clip(); rect(r.x, r.y, r.w, r.h, g.bg); o.draw(t, r); ctx.restore(); g = g0;
      FOOT.panelRect = { x: 0, y: r.y, w: W, h: r.h }; }, () => CAM(q.t0, { box: [0, 1000, W, Math.round(W * 9 / 16)], z: 1, d: 0.45, ease: 'inOutQuart' })); };
  const POP = { x: 84, y: 64, w: 912, h: 500 };   // 2026-11-13: ends at y 564, above her head
  const popCard = (sp_, o) => { const q = TH.span(sp_, o); const k = ++LCF.popN; const tilt = (k % 2 ? -1 : 1) * 0.03;
    const sg = TH.seg('pops', q, o, (t) => { const pin = MOTION.ease(t, q.t0, 0.42, 'outBack'), pout = MOTION.ease(t, q.t1 - 0.22, 0.22, 'inExpo'); if (pin <= 0.001 || pout >= 0.999) return;
      const r = POP; const cx = r.x + r.w / 2, cy = r.y + r.h / 2; const sc = (0.82 + 0.18 * pin) * (1 - 0.12 * pout);
      grp('card', r.x, r.y, r.w, r.h, () => withA(clamp(Math.min(pin * 2.5, 1 - pout)), () => {
        ctx.save(); ctx.translate(cx, cy); ctx.rotate(tilt * (1 + 0.6 * (1 - pin))); ctx.scale(sc, sc); ctx.translate(-cx, -cy);
        const g0 = g; g = G[o.ground || 'lcAmb'] || g0;
        ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.38)'; ctx.shadowBlur = 46; ctx.shadowOffsetY = 18; fillRR(r.x, r.y, r.w, r.h, 26, g.bg); ctx.restore();
        ctx.save(); rr(r.x, r.y, r.w, r.h, 26); ctx.clip(); if (o.draw) o.draw(t, { x: r.x, y: r.y, w: r.w, h: r.h }); ctx.restore();
        g = g0; ctx.restore(); }), { label: 'pop-up card (drag to move, corners to resize)' });
      FOOT.panelRect = { x: r.x, y: r.y, w: r.w, h: r.h }; }, () => CAM(q.t0, { z: 1.0 }));
    sfx('pop', q.t0 + 0.06, -4); return sg; };
  const jSeg = (sp_, o, content) => { const q = TH.span(sp_, o); TH.needMatte(q.t0, q.t1);
    const h = Math.round(H * 0.74), w = Math.round(h * 16 / 9); const box = [Math.round(W / 2 - 0.497 * w), H - h, w, h];
    const sg = TH.seg('presenter', q, o, (t) => TH.cutout(t, { ground: LCF.wall, grid: false, outline: LCF.white, outlinePx: 0, under: () => LCF.jRoom(t, q, content || LCF.poster, o.ground) }),
      () => CAM(q.t0, { box, z: 1 }), { cover: true });
    if (content) sfx('shutter', q.t0 + 0.05, -6); return sg; };
  const GFX = {
    A: (sp_, o) => half0(sp_, { side: 'top', size: 1050, ground: o.ground, ...pass(o), z: 1.35 }),
    B: (sp_, o) => split0(sp_, { side: 'bottom', her: 0.48, ground: o.ground, ...pass(o), enter: 0.3 }),
    C: (sp_, o) => pres0(sp_, { side: 'right', scale: 0.5, ...pass(o), ground: o.ground || 'lcAmb', enter: 0.3 }),
    D: (sp_, o) => split0(sp_, { side: 'top', her: 0.44, ground: o.ground, ...pass(o), z: 1.25 }),
    F: (sp_, o) => half0(sp_, { side: 'top', size: 1000, ground: o.ground, ...pass(o), z: 1.3 }),
    G: (sp_, o) => lbBox(sp_, o),
    H: (sp_, o) => half0(sp_, { side: 'bottom', size: 900, ground: o.ground, ...pass(o), z: 1.25, fy: 0.42 }),
    I: (sp_, o) => popCard(sp_, o),
    J: (sp_, o) => jSeg(sp_, o, o.draw),
    K: (sp_, o) => half0(sp_, { side: 'top', size: 940, ...pass(o), z: 1.3, ground: 'rvInk' }),
    M: (sp_, o) => half0(sp_, { side: 'top', size: 1000, ground: o.ground, ...pass(o), z: 1.3 }),
  };
  const top = (sp_, o = {}) => mark((GFX[FMT] || GFX.A)(sp_, o));
  // 2026-11-12 her note ("you add a zoom effect by yourselves... at least remove the zoom effect"): no automatic zooms on her in a
  // short. Every L1 talk in a short uses one framing (no mid / close / push / punch); full-screen formats H I K M (and G, her whole frame) stay at z 1
  // all through, also in the gaps between segments (the L1 default framing would be 8 % tighter).
  if (/^[GHIKM]$/.test(FMT) && TH.look && TH.look.talk && TH.look.talk.z) TH.look.talk = { ...TH.look.talk, z: [TH.look.talk.z[0], 1.0] };
  const talkF = {
    B: (sp_, o) => split0(sp_, { side: 'bottom', her: 0.48, id: o.id, draw: LCF.poster, enter: 0, ground: 'lcAmb', sound: false }),
    C: (sp_, o) => pres0(sp_, { side: 'right', scale: 0.64, id: o.id, draw: LCF.poster, enter: 0.0001, ground: 'lcAmb', gr: [40, 110, W - 80, 1000], sound: false }),
    G: (sp_, o) => talk0(sp_, { id: o.id, frame: 1 }),
    J: (sp_, o) => jSeg(sp_, o, null),
    H: (sp_, o) => talk0(sp_, { id: o.id, frame: 1.0 }), I: (sp_, o) => talk0(sp_, { id: o.id, frame: 1.0 }),
    K: (sp_, o) => talk0(sp_, { id: o.id, frame: 1.0 }), M: (sp_, o) => talk0(sp_, { id: o.id, frame: 1.0 }),
  };
  const viaTop = (orig) => (sp_, o = {}) => (o.draw ? top(sp_, o) : orig(sp_, o));
  TH.half = viaTop(half0); TH.split = viaTop(split0); TH.ots = viaTop(keep.ots); TH.presenter = viaTop(pres0); TH.room = viaTop(keep.room); TH.tile = viaTop(keep.tile);
  TH.talk = (sp_, o = {}) => (talkF[FMT] ? talkF[FMT](sp_, o) : talk0(sp_, { ...o, frame: 'wide', punch: undefined, push: undefined, alt: undefined }));
  return { restore: () => Object.assign(TH, keep) };
};

/* ---------- the title / poster of each format ---------- */
LCF.wall = '#262A30';   // J: the wall behind her (a warm dark, lighter than the screen)
LCF.JS = { x: 40, y: 110, w: 1000, h: 1000 };
LCF.jRoom = (t, q, content, ground) => {
  const S = LCF.JS; rect(0, 1560, W, H - 1560, '#15181C'); rect(0, 1556, W, 4, '#353B43');
  ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.55)'; ctx.shadowBlur = 50; ctx.shadowOffsetY = 22; rect(S.x - 12, S.y - 12, S.w + 24, S.h + 24, '#0A0A0C'); ctx.restore();
  const r = { x: S.x, y: S.y, w: S.w, h: Math.round(S.h * 0.46) }; const g0 = g; g = G[content === LCF.poster ? 'lcAmb' : (ground || 'rvInk')] || g0; rect(S.x, S.y, S.w, S.h, g.bg);
  const a = q.t0 < 0.05 ? 1 : MOTION.ease(t, q.t0, 0.25, 'outQuint');
  ctx.save(); ctx.beginPath(); ctx.rect(r.x, r.y, r.w, r.h); ctx.clip();
  withA(a, () => { if (content === LCF.poster) LCF.bigTitle({ x: r.x + 30, y: r.y + 30, w: r.w - 60, h: r.h - 60 }, { key: 'poster', def: FOOT.m.poster || LCF.labelParts(LCF.labText)[0], whole: true, zMax: 220, maxL: 2, padX: 10, what: 'the words on the screen behind her' });
    else content(t, r); });
  ctx.restore(); g = g0;
  rect(S.x + S.w / 2 - 70, S.y + S.h + 12, 140, 10, '#0A0A0C');
};
/** the title set big inside r (Helvetica Neue 700, sentence case, as many lines as fit; the part after "|" in 300 under it); editable as 'label' (or o.key) */
LCF.bigTitle = (r, o = {}) => {
  const sid = SCENE_ID; SCENE_ID = 'label'; const key = o.key || 'label'; EL.seen.delete('label/' + key); const ov = ovr(key); SCENE_ID = sid;
  const def = o.def != null ? o.def : LCF.labText; const str = ov.s != null ? ov.s : def;
  const info = { text: str, def, kind: 'box', sk: ov.k, label: o.what || 'title (text; "|" starts the second line)' };
  const s2 = SCENE_ID; SCENE_ID = 'label';
  try {
    if (ov.hide) { regBox(ov, r.x, r.y, r.w, r.h, info); return; }
    const [a, b] = o.whole ? [str, ''] : LCF.labelParts(str); const maxW = r.w - (o.padX != null ? o.padX : 60) * 2; const maxL = o.maxL || 3;
    let z = o.zMax || 160, la = [];
    for (; z > 36; z -= 4) { la = LCF.wrap(a, HN(z), maxW); const z2_ = Math.min(o.z2Max || 60, z * 0.5); const h = la.length * z * 1.0 + (b ? 16 + z2_ * 1.15 * 2 : 0);
      if (la.length <= maxL && h <= r.h && Math.max(...la.map(l => tw(l, HN(z), -0.035 * z))) <= maxW) break; }
    const z2 = Math.round(Math.min(o.z2Max || 60, z * 0.5)); const lb = b ? LCF.wrap(b, HN(z2, 300), maxW) : [];
    const hh = la.length * z * 1.0 + (lb.length ? 16 + lb.length * z2 * 1.15 : 0);
    const y0 = r.y + (o.valign === 'top' ? 0 : o.valign === 'bottom' ? r.h - hh : (r.h - hh) / 2); const cx = r.x + r.w / 2;
    moved(ov, () => { let y = y0 + z * 0.84;
      la.forEach((l) => { _txt(l, cx, y, HN(z), o.col || LCF.ink, 'center', 'alphabetic', -0.035 * z); y += z; });
      y += 16 - z + z * 0.12 + z2; lb.forEach((l) => { _txt(l, cx, y, HN(z2, 300), o.col2 || o.col || LCF.ink, 'center', 'alphabetic', -0.02 * z2); y += z2 * 1.15; });
      regBox(ov, r.x, y0, r.w, hh, info); }, [cx, y0]);
  } finally { SCENE_ID = s2; }
};
/** B: the title poster on pink above her while she talks; C: the named thing huge (manifest "poster") behind her cut-out */
LCF.poster = (t, r) => { if (LCF.FMT === 'C') LCF.bigTitle({ x: r.x, y: r.y + 20, w: r.w, h: r.h - 40 }, { key: 'poster', def: FOOT.m.poster || LCF.labelParts(LCF.labText)[0], whole: true, zMax: 230, maxL: 3, valign: 'top', padX: 20, what: 'the big words behind her' });
  else LCF.bigTitle({ x: r.x, y: r.y + 10, w: r.w, h: r.h - 20 }, { zMax: 140, maxL: 3, z2Max: 64 }); };
LCF.smallText = (key, def, draw, what) => { const sid = SCENE_ID; SCENE_ID = 'label'; EL.seen.delete('label/' + key); const ov = ovr(key); const str = ov.s != null ? ov.s : def;
  try { draw(ov, str, { text: str, def, kind: 'box', sk: ov.k, label: what }); } finally { SCENE_ID = sid; } };
LCF.tagK = () => LCF.smallText('tag', LCF.labelParts(LCF.labText)[0].toUpperCase(), (ov, str, info) => { const f = F.mono(36); const TL = String(str).split('\n').map(s => s.trim()).filter(Boolean); if (!TL.length) TL.push(''); const w = Math.max(...TL.map(l => tw(l, f, 36 * 0.12))); const x = 64, y = 112; const TLH = 50, hh = 44 + (TL.length - 1) * TLH;   /* her Shift+Enter = a new line (2026-11-16) */
  if (ov.hide) { regBox(ov, x, y - 34, w, hh, info); return; }
  moved(ov, () => { ctx.save(); LCF.soft(36); TL.forEach((l, i) => _txt(l, x, y + i * TLH, f, '#FFFFFF', 'left', 'alphabetic', 36 * 0.12)); ctx.restore(); regBox(ov, x, y - 34, w, hh, info); }, [x, y]); }, 'small label top-left');
LCF.boxM = () => LCF.smallText('label', LCF.labText.replace(/\s*\|\s*/, ' | '), (ov, str, info) => { const z = 64; const f = HN(z, 700); const maxW = W - 220;
  const lines = str.split('|').map(x => x.trim()).filter(Boolean).flatMap(l => LCF.wrap(l, f, maxW)).slice(0, 3);
  const lh = z * 1.1, pw = 40, ph = 26; const bw = Math.max(...lines.map(l => tw(l, f, -0.02 * z))) + pw * 2, bh = lines.length * lh + ph * 2 - (lh - z); const x = CX - bw / 2, y = 168;
  if (ov.hide) { regBox(ov, x, y, bw, bh, info); return; }
  moved(ov, () => { fillRR(x, y, bw, bh, 28, '#FFFFFF'); lines.forEach((l, i) => _txt(l, CX, y + ph + z * 0.8 + i * lh, f, '#111111', 'center', 'alphabetic', -0.02 * z)); regBox(ov, x, y, bw, bh, info); }, [CX, y]); }, 'title box (text; "|" starts a new line)');
LCF.FLASH = 1.6;
LCF.titleFmt = (t) => {
  const fm = LCF.FMT; if (!LCF.labText) return;
  if (fm === 'D' && t < LCF.FLASH + 0.35) { const p = clamp((t - LCF.FLASH) / 0.35); const pe = p * p * (3 - 2 * p); const h = 384;
    withT(0, -h * pe, 1, 0, () => { rect(0, 0, W, h, LCF.pink); LCF.bigTitle({ x: 0, y: 40, w: W, h: h - 70 }, { zMax: 110, maxL: 2, z2Max: 52 }); }); }
  if (fm === 'F' && !LCF.inGfx(t)) LCF.bigTitle({ x: 0, y: 70, w: W, h: 190 }, { zMax: 78, maxL: 2, z2Max: 44, col: '#FFFFFF', col2: 'rgba(255,255,255,0.72)' });
  if (fm === 'K' && !LCF.inGfx(t)) LCF.tagK();
  if (fm === 'M' && !LCF.inGfx(t)) LCF.boxM();
  if (fm === 'G') { const a = 1 - LCF.gfxSpans.reduce((m, [x, y]) => Math.max(m, t >= x - 0.01 && t < y ? Math.min(1, (t - x) / 0.2, (y - t) / 0.2) : 0), 0);
    if (a > 0.01) withA(a, () => LCF.bigTitle({ x: 0, y: 150, w: W, h: 440 }, { zMax: 120, maxL: 3, z2Max: 60, col: '#FFFFFF', col2: 'rgba(255,255,255,0.72)', valign: 'bottom' })); }
};

/* ---------- her captions per format ---------- */
LCF.capFmt = (t) => {
  if (!PORTRAIT || t >= FOOT.dur || !LCF.capsOn) return; const fm = LCF.FMT;
  if (fm === 'D' && t < LCF.FLASH) return;
  const c = (TH.caps || []).find(x => x.t0 <= t && t < x.t1); if (!c) return;
  if ((RV.kws || []).some(k => t >= k.t0 && t < k.t1)) return;
  const ce = (EDIT.data.capShort || {})[c.i]; const raw = ce != null ? ce : c.text; const cst = EDIT.data.captions9 || {};
  const gfx = LCF.inGfx(t); const yN = FOOT.capYNow;
  let S = {
    A: gfx ? { cy: 1790, size: 84, w: 700 } : { cy: 1728, size: 84, w: 700, ink: true },
    B: { cy: yN != null ? yN - 25 : 1560, size: 68, w: 500 },
    C: { cy: 1650, size: 80, w: 700, hi: true },
    D: gfx ? { cy: 760, size: 70, w: 500 } : { cy: 196, size: 76, w: 500 },
    F: { cy: gfx ? 1790 : 1650, size: 88, w: 700, lit: true },
    G: { cy: gfx ? 1745 : 1440, size: 62, w: 500, lit: true, dim: '#7C7C80' },
    H: { cy: gfx ? 880 : 1500, size: 96, w: 700, chunk: true, up: true, hi: true },
    I: { cy: 1540, size: 78, w: 700, chunk: true, up: true, hi: true },
    J: { cy: 1700, size: 84, w: 700, chunk: true, up: true, hi: true },
    K: { cy: 1690, size: 58, w: 500, box: true },
    M: { cy: gfx ? 1800 : 1560, size: 60, w: 700 },
  }[fm] || { cy: 1600, size: 70, w: 700 };
  let size = cst.size ? clamp(Math.round(cst.size), 40, 150) : S.size; const cy = cst.y != null ? cst.y : S.cy;
  const all = (S.up ? raw.toUpperCase() : raw).split(/\s+/).filter(Boolean); if (!all.length) return;
  const wt = (c.ws && c.ws.length === all.length) ? c.ws.map(w => w.t) : all.map((_, i) => c.t0 + (c.t1 - c.t0) * 0.9 * i / Math.max(1, all.length));
  const hi = S.hi ? LCF.hiWord(all) : -1;
  let words = all, k0 = 0;
  if (S.chunk) { const ch = []; let cur = [];
    all.forEach((w, i) => { cur.push(i); if (/[,.?!:;]$/.test(w) || cur.length === 3) { ch.push(cur); cur = []; } });
    if (cur.length) { if (cur.length === 1 && ch.length && ch[ch.length - 1].length < 4) ch[ch.length - 1].push(...cur); else ch.push(cur); }
    let pick = ch[0]; for (const g_ of ch) if (t >= wt[g_[0]] - 0.08) pick = g_; words = pick.map(i => all[i]); k0 = pick[0]; }
  const ls = -0.02 * size; let f = HN(size, S.w); const maxW = W * (S.box ? 0.84 : 0.86); const join = (l) => l.join(' '); let lines = [words];
  if (tw(join(words), f, ls) > maxW) { let bi = 1, bm = 1e9; for (let k = 1; k < words.length; k++) { const m_ = Math.max(tw(join(words.slice(0, k)), f, ls), tw(join(words.slice(k)), f, ls)); if (m_ < bm) { bm = m_; bi = k; } } lines = [words.slice(0, bi), words.slice(bi)]; }
  { const wide = Math.max(...lines.map(l => tw(join(l), f, ls))); if (wide > maxW) { size = Math.round(size * Math.max(0.66, maxW / wide)); f = HN(size, S.w); } }
  const lsz = -0.02 * size; const lh = size * (S.box ? 1.32 : S.up ? 1.02 : 1.16); const y0 = cy - (lines.length - 1) * lh / 2 + size * 0.36;
  const widths = lines.map(l => tw(join(l), f, lsz)); const sp = tw(' ', f, lsz); let bx0 = 1e9, bx1 = -1e9, kk = k0;
  ctx.save();
  // 2026-11-10: what is really under the caption (RV.capMode, visuals.js): ink on a light graphic or the amber poster (never white on
  // amber), a solid dark band when it is half over one, white + soft shadow on her footage
  if (!S.box && !S.ink && RV.capMode) { const bw = Math.max(...widths); const cm = RV.capMode(CX - bw / 2, y0 - size * 0.86, bw, (lines.length - 1) * lh + size * 1.02);
    if (cm === 'light') S = { ...S, ink: true, lit: false, inkHi: true };
    else if (cm === 'mixed') fillRR(CX - bw / 2 - 22, y0 - size * 0.98, bw + 44, (lines.length - 1) * lh + size * 1.3, 12, '#15181C'); }
  lines.forEach((ln, li) => { const y = y0 + li * lh; let x = CX - widths[li] / 2; bx0 = Math.min(bx0, x); bx1 = Math.max(bx1, x + widths[li]);
    if (S.box) { const px = size * 0.32; fillRR(x - px, y - size * 0.86, widths[li] + px * 2, size * 1.2, 6, 'rgba(0,0,0,0.86)'); }
    else if (!S.ink) LCF.soft(size);
    ln.forEach((wd) => { let col = S.ink ? LCF.ink : '#FFFFFF'; if (kk === hi && !S.ink) col = LCF.pink; if (kk === hi && S.inkHi) col = '#8A5F00';
      if (S.lit) { if (t < wt[kk] - 0.02) { ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0)'; _txt(wd, x, y, f, S.dim || 'rgba(255,255,255,0.4)', 'left', 'alphabetic', lsz); ctx.restore(); }
        else _txt(wd, x, y, f, LCF.isKey(wd) ? LCF.pink : '#FFFFFF', 'left', 'alphabetic', lsz); }
      else _txt(wd, x, y, f, col, 'left', 'alphabetic', lsz);
      x += tw(wd, f, lsz) + sp; kk++; }); });
  ctx.restore();
  const bt = y0 - size * 0.95, bh = (lines.length - 1) * lh + size * 1.3; const pad = S.box ? size * 0.32 : 22;
  regBox({ id: 'caption/' + c.i, edited: ce != null, hide: false }, bx0 - pad, bt, bx1 - bx0 + pad * 2, bh, { kind: 'caption', text: raw, def: c.text, cue: c.i });
};

/* ---------- the cover frame (SHORTS-PLAYBOOK "Cover frame") ----------
 * "cover": {"on": true, "dur": 0.1, "at": <source s>, "text": "line, ~one word~ in pink", "style": "photo" | "card"}. Drawn OVER the
 * first 0.1 s (no time inserted). ONE style for the series: her still full frame (tools/covers.py -> assets/covers/<id>.jpg, image
 * cover_<id>) + the line in Helvetica Neue 700 white with a soft shadow, y ~280-640, one word in pink. "card": pink with fine
 * same-hue diagonal lines, the line in ink, the word knocked out of an ink block (the video's marker), her cut-out at the foot. */
LCF.coverOf = () => { const c = FOOT.m && FOOT.m.kind === 'short' && PORTRAIT ? FOOT.m.cover : null; return c && c.on !== false ? c : null; };
LCF.coverOn = (t) => { const c = LCF.coverOf(); return !!c && t >= 0 && t < (c.dur || 0.1); };
LCF.coverDraw = (t) => {
  const c = LCF.coverOf(); const id = FOOT.m.id; const card = c.style === 'card';
  const sid = SCENE_ID; SCENE_ID = 'cover'; EL.seen.clear();
  try {
    const cbg = c.bg || LCF.pink, chi = c.hi || LCF.pink;
    if (card) { rect(0, 0, W, H, cbg); ctx.save(); ctx.strokeStyle = 'rgba(17,17,17,0.06)'; ctx.lineWidth = 3; ctx.beginPath();
      for (let x = -H; x < W + H; x += 26) { ctx.moveTo(x, 0); ctx.lineTo(x + H * 0.6, H); } ctx.stroke(); ctx.restore();
      const im = IMG['cover_' + id + '_cut']; if (im) { const h = 980, w = im.width / im.height * h; const x = CX - w / 2, y = H - h;
        grp('her', x, y, w, h, () => themeFixed(() => ctx.drawImage(im, x, y, w, h)), { img: true, label: 'her cut-out (drag to move, corners to resize)' }); } }
    else { const im = IMG['cover_' + id]; const k = c.scale || 1, dy = c.shift || 0; const w = W * k, h = H * k; rect(0, 0, W, H, RV.ink);
      if (im) themeFixed(() => ctx.drawImage(im, (W - w) / 2, dy, w, h)); }
    const ov = ovr('cover'); const str = ov.s != null ? ov.s : (c.text || FOOT.m.title || '');
    const info = { text: str, def: c.text || '', kind: 'box', sk: ov.k, label: 'cover line (text; ~word~ = the pink word)' };
    const segs = []; str.split(/(~[^~]+~)/).filter(Boolean).forEach(p_ => { const on = /^~.*~$/.test(p_);
      p_.replace(/~/g, '').split(/\s+/).filter(Boolean).forEach(w => { if (/^[,.?!:;]+$/.test(w) && segs.length) segs[segs.length - 1].w2 = w; else segs.push({ w, on }); }); });
    const maxW = W - 150, top = c.top || (card ? 360 : 300), maxH = c.maxH || (card ? 520 : 330);
    const lay0 = (zz, mw) => { const f = HN(zz); const sp = tw(' ', f, -0.03 * zz); const L = [[]]; let cw = 0;
      for (const s_ of segs) { const ww = tw(s_.w + (s_.w2 || ''), f, -0.03 * zz); if (L[L.length - 1].length && cw + sp + ww > mw) { L.push([]); cw = 0; } cw += (L[L.length - 1].length ? sp : 0) + ww; L[L.length - 1].push(s_); } return L; };
    const ok = (L, zz) => L.length * zz * 1.06 <= maxH && (L.length === 1 || L[L.length - 1].length >= 2);
    const pick = (zz, maxL) => { let L = lay0(zz, maxW); if (L.length > maxL) return null; if (ok(L, zz)) return L;
      for (let k = 0.96; k > 0.5; k -= 0.03) { const L2 = lay0(zz, maxW * k); if (L2.length > L.length) break; if (ok(L2, zz)) return L2; } return null; };
    let z = 128, lines = null; for (; z >= 96 && !lines; z -= 4) lines = pick(z, 3); if (lines) z += 4;
    if (!lines) for (z = 128; z > 60; z -= 4) { lines = lay0(z, maxW); if (lines.length <= 4 && lines.length * z * 1.06 <= maxH) break; }
    const f = HN(z), lsz = -0.03 * z, sp = tw(' ', f, lsz), lh = z * 1.06; const ww_ = (s_) => tw(s_.w + (s_.w2 || ''), f, lsz);
    const lw_ = (l) => l.reduce((a, s_, i) => a + ww_(s_) + (i ? sp : 0), 0); const bw = Math.max(...lines.map(lw_));
    if (ov.hide) { regBox(ov, CX - bw / 2, top, bw, lines.length * lh, info); return; }
    moved(ov, () => { ctx.save(); if (!card) { ctx.shadowColor = 'rgba(0,0,0,0.6)'; ctx.shadowBlur = z * 0.35; ctx.shadowOffsetY = z * 0.04; }
      lines.forEach((l, i) => { let x = CX - lw_(l) / 2; const y = top + z * 0.86 + i * lh;
        for (const s_ of l) { const wv = tw(s_.w, f, lsz);
          if (card && s_.on) { rect(x - z * 0.08, y - z * 0.84, wv + z * 0.16, z * 1.04, LCF.ink); _txt(s_.w, x, y, f, chi, 'left', 'alphabetic', lsz); }
          else _txt(s_.w, x, y, f, s_.on ? LCF.pink : card ? LCF.ink : '#FFFFFF', 'left', 'alphabetic', lsz);
          if (s_.w2) _txt(s_.w2, x + wv, y, f, card ? LCF.ink : '#FFFFFF', 'left', 'alphabetic', lsz); x += ww_(s_) + sp; } });
      ctx.restore(); regBox(ov, CX - bw / 2, top, bw, lines.length * lh, info); }, [CX, top]);
  } finally { SCENE_ID = sid; }
};
// RV.post (common.js) switches SHOW.captions off while the engine's post runs (TH.over runs inside it): remember the real switch
LCF.capsOn = true;
(function lcfPost() { const p0 = TH.post; TH.post = (t) => { LCF.capsOn = !!SHOW.captions; return p0(t); }; })();
// draw order on top of everything: captions, then the format's title, and the cover over all of it for the first 0.1 s
TH.over.push((t) => {
  if (!(FOOT.m && FOOT.m.kind === 'short') || t >= FOOT.dur) return;
  if (LCF.coverOn(t)) { LCF.coverDraw(t); return; }
  if (!LCF.FMT) return;
  const sid = SCENE_ID; SCENE_ID = 'captions'; try { LCF.capFmt(t); } finally { SCENE_ID = sid; }
  LCF.titleFmt(t);
});
