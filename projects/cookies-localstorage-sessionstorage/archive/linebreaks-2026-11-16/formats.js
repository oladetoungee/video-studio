/* cookies-localstorage-sessionstorage: shorts FORMATS + the COVER frame (rollout 2026-11-10; ported from http-status-codes via
 * dark-patterns, SHORTS-PLAYBOOK "Format menu" and "Cover frame"). Her notes: "everything is the same format" (2026-11-08), "some look
 * so similar, it's just the colour" (2026-11-09), "the real cover should be on the video" (2026-11-10).
 * Manifest per short: "fmt": A wide · B split (title poster on concrete over her) · C cut-out (the named thing huge behind her, "poster")
 * · D captions on top (title flash) · F square + karaoke · G letterbox · H full frame + bold captions · I pop-up screenshots ·
 * J slide behind her ("poster" on the screen) · K film subtitles · M TikTok title box. "frame9" goes with it (A wide, B/C 4x5,
 * D wideLow, F 1x1top, G letterbox, H/I/K/M fill). A short with no "fmt" keeps its old ckStyle look (moments/common.js).
 * Type: this video's set 03 (Helvetica Neue 700 + 300 / 500, DM Mono labels); colours = the crash-test palette: concrete #D9DCDA,
 * ink, crash red #E5262A for "gone", green for "kept" (#087A47 on light, #7BE6A6 over her footage).
 * Editable in the moment editor: captions as before (caption/<n>), the title = 'label/label' ("|" = new line), the poster =
 * 'label/poster', K's tag = 'label/tag', the cover line = 'cover/cover' (scrub to 0:00), a card cover's cut-out = 'cover/@her'.
 * Loaded after plan.js (manifest "common"); CK_PLAN('short') calls CK.fmtInstall. */
'use strict';
CK.FMT = (FOOT.m && FOOT.m.kind === 'short' && FOOT.m.fmt) || null;
CK.gfxSpans = []; CK.popN = 0;
if (CK.FMT) {
  TH.look.ground = 'ckInk';
  TH.look.band = /[ABC]/.test(CK.FMT) ? CK.conc : '#111114';
  CK.labText = FOOT.m.label || ''; FOOT.m.label = '';   // the built-in label steps aside: each format draws its own title
  TH.labelBottom = () => 0;
  // code on a phone: the typed code is laid out on a 1000 px wide page (not the film's 1600), so its letters read in a pop-up card / panel
  { const code0 = CK.code; CK.code = (o) => code0({ ...o, lines: CK.FB && o.lines ? o.lines.map(l => ({ ...l, gap: undefined })) : o.lines, z: CK.FB ? Math.max(o.z || 0, 38) : o.z, fit: o.fit || { wide: true, dw: 1000, dh: 720 } }); }   // 2026-11-13: code letters 42 px (read on a phone)
  // I: a source line (one long line, short) sits in the middle of its pop-up card, not at the top with the card empty below
  if (CK.FMT === 'I') { const rq0 = CK.receipt; const rq = (o) => { const d = rq0(o); return (t, r) => { rect(r.x, r.y, r.w, r.h, CK.conc); d(t, { x: r.x, y: r.y + r.h * 0.3, w: r.w, h: r.h }); }; };
    CK.receipt = (o) => (o.img !== 'mdn-quotas-full' || !CK.FB ? rq(o) : (t, r) => { rect(r.x, r.y, r.w, r.h, CK.conc);   // 2026-11-13: the MDN quota line was ~14 px on a phone; the same words at phone size, credited
    const z = 54, f = `500 ${z}px FBIT`, x = r.x + 56, w = r.w - 112; const L = CK.wrap('Browsers can store up to 5 MiB of local storage, and 5 MiB of session storage per origin.', f, w); const y0 = r.y + (r.h - L.length * z * 1.3) / 2;
    const hlA = clamp((t - o.at) / 0.3); L.forEach((l, i) => { const yy = y0 + z + i * z * 1.3; _txt(l, x, yy, f, CK.ink, 'left', 'alphabetic', -0.01 * z); });
    if (hlA > 0) withA(hlA, () => { const l0 = L.findIndex(l => l.includes('5 MiB')); if (l0 >= 0) { const pre = L[l0].slice(0, L[l0].indexOf('5 MiB')); const xx = x + tw(pre, f, -0.01 * z), yy = y0 + z + l0 * z * 1.3; ctx.save(); ctx.globalCompositeOperation = 'multiply'; rect(xx - 4, yy - z * 0.9, tw('5 MiB', f, -0.01 * z) + 8, z * 1.15, '#FFD400'); ctx.restore(); } });
    _txt('Source: MDN Web Docs, Storage quotas', x, r.y + r.h - 50, F.mono(32), CK.ink, 'left', 'alphabetic', 0.04 * 32); }); }
  // 2026-11-13: in the letterbox (G) the MDN Set-Cookie warning (a 1x screenshot, ~17 px letters on a phone) is set again at phone size:
  // the same words, MDN's warning box look, the source credited (FULL-KIT critic: "the MDN quote is unreadable").
  if (CK.FMT === 'G') { const rec1 = CK.receipt; CK.receipt = (o) => (o.img !== 'mdn-warn' ? rec1(o) : (t, r) => { rect(r.x, r.y, r.w, r.h, (G[lkG()] || G.ckLab).bg);
    const p = clamp((t - (o.inAt != null ? o.inAt : o.at - 0.6)) / 0.4); if (p <= 0) return; const z = 50, x = r.x + 60, w = r.w - 120; const f = `500 ${z}px FBIT`, fb_ = `700 ${z}px FBIT`;
    const body = 'Session cookies will also be restored, as if the browser was never closed.'; const L = CK.wrap(body, f, w - 90); const bh = (L.length + 1) * z * 1.3 + 70; const y = r.y + (r.h - bh) / 2 - 20;
    withA(p, () => { rect(x, y, w, bh, '#FDE2E4'); rect(x, y, 8, bh, '#D30038'); _txt('Warning:', x + 50, y + 40 + z, fb_, '#1B1B1B', 'left', 'alphabetic', -0.01 * z);
      const hlA = clamp((t - o.at) / 0.3); L.forEach((l, i) => { const yy = y + 40 + z + (i + 1) * z * 1.3; if (hlA > 0) withA(hlA, () => rect(x + 46, yy - z * 0.95, tw(l, f, -0.01 * z) + 8, z * 1.2, 'rgba(255,212,0,0.55)')); _txt(l, x + 50, yy, f, '#1B1B1B', 'left', 'alphabetic', -0.01 * z); });
      _txt('Source: MDN Web Docs, Set-Cookie', x, y + bh + 56, F.mono(32), (G[lkG()] || G.ckLab).fg, 'left', 'alphabetic', 0.04 * 32); }); }); }
  TH.capOff.push([0, 1e9]);                              // the built-in captions step aside (they still make the .srt)
}
const lkG = () => (CK.FB && CK.FB.panel ? CK.pnl() : 'ckLab');
const HN = (z, w = 700) => `${w} ${z}px "Helvetica Neue"`;
// font-board pass 2026-11-13 (moments/fontboard.js sets CK.FB per short; null = the old set-03 look)
const CKS = (z) => (CK.FB ? CK.FB.A(z) : HN(z));                 // titles, posters, cover line
const CKM2 = (z) => (CK.FB ? CK.FB.M(z) : HN(z, 300));           // second title lines
const CKC = (z, w) => (CK.FB ? CK.FB.B(z) : HN(z, w));           // captions
const FBc = (k, def) => (CK.FB && CK.FB[k] != null ? CK.FB[k] : def);
const FBup = (s) => (CK.FB && CK.FB.up ? String(s).toUpperCase() : s);
const FBls = (z, d) => (CK.FB && CK.FB.ls != null ? CK.FB.ls * z : d * z);
CK.pnl = () => { const P = CK.FB.panel; G.fbPanel = G.fbPanel || { ...(P.dark ? G.ckInk : G.ckLab), bg: P.bg, card: P.card || (P.dark ? '#FFFFFF' : '#FFFFFF') }; return 'fbPanel'; };
CK.pg = () => { if (!(CK.FB && CK.FB.poster)) return 'ckLab'; G.fbPoster = G.fbPoster || { ...G.ckLab, bg: CK.FB.poster.bg, fg: CK.FB.poster.ink }; return 'fbPoster'; };
CK.inGfx = (t) => CK.gfxSpans.some(([a, b]) => t >= a && t < b);
CK.soft = (z) => { ctx.shadowColor = 'rgba(0,0,0,0.55)'; ctx.shadowBlur = Math.max(8, z * 0.16); ctx.shadowOffsetY = 2; };
CK.wrap = (s, f, maxW) => { const out = []; let cur = ''; for (const w of String(s).split(/\s+/).filter(Boolean)) { const nx = cur ? cur + ' ' + w : w; if (cur && tw(nx, f) > maxW) { out.push(cur); cur = w; } else cur = nx; } if (cur) out.push(cur); return out; };
CK.wrapH = (s, f, maxW) => (String(s).includes('\n') ? String(s).split('\n').map(x => x.replace(/\s+/g, ' ').trim()).filter(Boolean) : CK.wrap(s, f, maxW));   // her Shift+Enter = a real line break (only shrunk)
CK.labelParts = (s) => { const i = String(s).indexOf('|'); return i < 0 ? [String(s).trim(), ''] : [s.slice(0, i).trim(), s.slice(i + 1).trim()]; };
/** her key words (moments/common.js CK.GREEN kept / CK.RED gone): the colour over her footage, or null */
CK.keyCol = (w) => { const n = String(w).toLowerCase().replace(/[^a-z0-9'\-]/g, ''); return CK.RED.has(n) ? CK.FOOTR : CK.GREEN.has(n) ? CK.FOOTG : null; };
CK.isKey = (w) => !!CK.keyCol(w);
CK.hiWord = (ws) => CK.keyIx(ws)[0];

/* ---------- layouts per format (called from CK_PLAN('short')) ---------- */
CK.fmtInstall = (s, first) => {
  const FMT = CK.FMT; if (!FMT) return null;
  const keep = { half: TH.half, split: TH.split, ots: TH.ots, presenter: TH.presenter, room: TH.room, tile: TH.tile, talk: TH.talk };
  const half0 = keep.half, split0 = keep.split, pres0 = keep.presenter, talk0 = keep.talk;
  const mark = (sg) => { if (sg) CK.gfxSpans.push([sg.t0, sg.t1]); return sg; };
  const pass = (o) => ({ id: o.id, draw: o.draw, noCaps: o.noCaps, lead: o.lead, until: o.until, hold: o.hold });
  const lbBox = (sp_, o) => {   // G: her letterbox band slides down (her whole 16:9 frame), the graphic opens above it
    const q = TH.span(sp_, o); return TH.seg('half', q, o, (t) => { const e = MOTION.ease(t, q.t0, 0.45, 'outQuint'); if (e <= 0.001) return;
      const r = { x: 0, y: 0, w: W, h: 976 }; const g0 = g; g = G[o.ground || 'ckInk'] || g0;
      ctx.save(); ctx.beginPath(); ctx.rect(0, r.y + r.h * (1 - e), W, r.h * e); ctx.clip(); rect(r.x, r.y, r.w, r.h, g.bg); o.draw(t, r); ctx.restore(); g = g0;
      FOOT.panelRect = { x: 0, y: r.y, w: W, h: r.h }; }, () => CAM(q.t0, { box: [0, 1000, W, Math.round(W * 9 / 16)], z: 1, d: 0.45, ease: 'inOutQuart' })); };
  const POP = { x: 84, y: 84, w: 912, h: 570 };
  const popCard = (sp_, o) => { const q = TH.span(sp_, o); const k = ++CK.popN; const tilt = (k % 2 ? -1 : 1) * 0.03;
    const sg = TH.seg('pops', q, o, (t) => { const pin = MOTION.ease(t, q.t0, 0.42, 'outBack'), pout = MOTION.ease(t, q.t1 - 0.22, 0.22, 'inExpo'); if (pin <= 0.001 || pout >= 0.999) return;
      const r = POP; const cx = r.x + r.w / 2, cy = r.y + r.h / 2; const sc = (0.82 + 0.18 * pin) * (1 - 0.12 * pout);
      grp('card', r.x, r.y, r.w, r.h, () => withA(clamp(Math.min(pin * 2.5, 1 - pout)), () => {
        ctx.save(); ctx.translate(cx, cy); ctx.rotate(tilt * (1 + 0.6 * (1 - pin))); ctx.scale(sc, sc); ctx.translate(-cx, -cy);
        const g0 = g; g = G[o.ground || 'ckLab'] || g0;
        ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.38)'; ctx.shadowBlur = 46; ctx.shadowOffsetY = 18; fillRR(r.x, r.y, r.w, r.h, 26, g.bg); ctx.restore();
        ctx.save(); rr(r.x, r.y, r.w, r.h, 26); ctx.clip(); if (o.draw) o.draw(t, { x: r.x, y: r.y, w: r.w, h: r.h }); ctx.restore();
        g = g0; ctx.restore(); }), { label: 'pop-up card (drag to move, corners to resize)' });
      FOOT.panelRect = { x: r.x, y: r.y, w: r.w, h: r.h }; }, () => CAM(q.t0, { z: 1.0 }));
    CK.sfx && CK.sfx('pop', q.t0 + 0.06, -4); return sg; };
  const jSeg = (sp_, o, content) => { const q = TH.span(sp_, o); TH.needMatte(q.t0, q.t1);
    const h = Math.round(H * 0.74), w = Math.round(h * 16 / 9); const box = [Math.round(W / 2 - 0.497 * w), H - h, w, h];
    const sg = TH.seg('presenter', q, o, (t) => TH.cutout(t, { ground: CK.wall, grid: false, outline: CK.white, outlinePx: 0, under: () => CK.jRoom(t, q, content || CK.poster, o.ground) }),
      () => CAM(q.t0, { box, z: 1 }), { cover: true });
    if (content && CK.sfx) CK.sfx('photo', q.t0 + 0.05, -6); return sg; };
  const GFX = {
    A: (sp_, o) => half0(sp_, { side: 'top', size: 1050, ground: o.ground, ...pass(o), z: 1.35 }),
    B: (sp_, o) => split0(sp_, { side: 'bottom', her: 0.48, ground: o.ground, ...pass(o), enter: 0.3 }),
    C: (sp_, o) => pres0(sp_, { side: 'right', scale: 0.5, ...pass(o), ground: o.ground || 'ckLab', enter: 0.3 }),
    D: (sp_, o) => split0(sp_, { side: 'top', her: 0.44, ground: o.ground, ...pass(o), z: 1.25 }),
    F: (sp_, o) => half0(sp_, { side: 'top', size: 1000, ground: o.ground, ...pass(o), z: 1.3 }),
    G: (sp_, o) => lbBox(sp_, o),
    H: (sp_, o) => half0(sp_, { side: 'bottom', size: 900, ground: o.ground, ...pass(o), z: 1.25, fy: 0.42 }),
    I: (sp_, o) => popCard(sp_, o),
    J: (sp_, o) => jSeg(sp_, o, o.draw),
    K: (sp_, o) => half0(sp_, { side: 'top', size: 940, ...pass(o), z: 1.3, ground: 'ckInk' }),
    M: (sp_, o) => half0(sp_, { side: 'top', size: 1000, ground: o.ground, ...pass(o), z: 1.3 }),
  };
  const top = (sp_, o = {}) => mark((GFX[FMT] || GFX.A)(sp_, CK.FB && CK.FB.panel && !o.ground && FMT !== 'K' ? { ...o, ground: CK.pnl() } : o));   // 2026-11-13: each short's graphic panels on its own board ground
  // 2026-11-12 her note ("you add a zoom effect by yourselves... at least remove the zoom effect"): no automatic zooms on her in a
  // short. Every L1 talk in a short uses one framing (no mid / close / push / punch); full-screen formats H I K M (and G, her whole frame) stay at z 1
  // all through, also in the gaps between segments (the L1 default framing would be 8 % tighter).
  if (/^[GHIKM]$/.test(FMT) && TH.look && TH.look.talk && TH.look.talk.z) TH.look.talk = { ...TH.look.talk, z: [TH.look.talk.z[0], 1.0] };
  const talkF = {
    B: (sp_, o) => split0(sp_, { side: 'bottom', her: 0.48, id: o.id, draw: CK.poster, enter: 0, ground: CK.pg(), sound: false }),
    C: (sp_, o) => pres0(sp_, { side: 'right', scale: 0.64, id: o.id, draw: CK.poster, enter: 0.0001, ground: CK.pg(), gr: [40, 110, W - 80, 1000], sound: false }),
    G: (sp_, o) => talk0(sp_, { id: o.id, frame: 1 }),
    J: (sp_, o) => jSeg(sp_, o, null),
    H: (sp_, o) => talk0(sp_, { id: o.id, frame: 1.0 }), I: (sp_, o) => talk0(sp_, { id: o.id, frame: 1.0 }),
    K: (sp_, o) => talk0(sp_, { id: o.id, frame: 1.0 }), M: (sp_, o) => talk0(sp_, { id: o.id, frame: 1.0 }),
  };
  const viaTop = (orig) => (sp_, o = {}) => (o.draw ? top(sp_, o) : orig(sp_, o));
  TH.half = viaTop(half0); TH.split = viaTop(split0); TH.ots = viaTop(keep.ots); TH.presenter = viaTop(pres0); TH.room = viaTop(keep.room); TH.tile = viaTop(keep.tile);
  TH.talk = (sp_, o = {}) => (talkF[FMT] ? talkF[FMT](sp_, o) : talk0(sp_, { ...o, frame: 'wide', punch: undefined, push: undefined, alt: undefined }));
  // J: she stays in front of the screen all through (a gap between layouts would drop back to her plain framing)
  const fill = () => { if (FMT !== 'J') return; const sg = [...TH.segs].sort((a, b) => a.t0 - b.t0); let t = 0, k = 0;
    for (const x of [...sg, { t0: FOOT.dur, t1: FOOT.dur }]) { if (x.t0 - t > 0.45) jSeg([t, x.t0], { id: 'screen-' + (++k) }, null); t = Math.max(t, x.t1); } };
  // nothing of the short's own graphics runs on into the drawn ending (manifest outroCard starts at FOOT.dur)
  const clip = () => { for (const x of TH.segs) if (x.t1 > FOOT.dur) x.t1 = FOOT.dur; };
  return { restore: () => { fill(); clip(); Object.assign(TH, keep); } };
};

/* ---------- the title / poster of each format ---------- */
CK.wall = '#24272A';   // J: the wall behind her (a cool dark, lighter than the screen)
CK.JS = { x: 40, y: 110, w: 1000, h: 1000 };
CK.jRoom = (t, q, content, ground) => {
  const S = CK.JS; rect(0, 1560, W, H - 1560, '#141516'); rect(0, 1556, W, 4, '#363A3D');
  ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.55)'; ctx.shadowBlur = 50; ctx.shadowOffsetY = 22; rect(S.x - 12, S.y - 12, S.w + 24, S.h + 24, '#0A0A0C'); ctx.restore();
  const r = { x: S.x, y: S.y, w: S.w, h: Math.round(S.h * 0.46) }; const g0 = g; g = G[content === CK.poster ? CK.pg() : (ground || 'ckInk')] || g0; rect(S.x, S.y, S.w, S.h, g.bg);
  const a = q.t0 < 0.05 ? 1 : MOTION.ease(t, q.t0, 0.25, 'outQuint');
  ctx.save(); ctx.beginPath(); ctx.rect(r.x, r.y, r.w, r.h); ctx.clip();
  withA(a, () => { if (content === CK.poster) CK.bigTitle({ x: r.x + 30, y: r.y + 30, w: r.w - 60, h: r.h - 60 }, { key: 'poster', def: FOOT.m.poster || CK.labelParts(CK.labText)[0], whole: true, zMax: 220, maxL: 2, padX: 10, what: 'the words on the screen behind her' });
    else content(t, r); });
  ctx.restore(); g = g0;
  rect(S.x + S.w / 2 - 70, S.y + S.h + 12, 140, 10, '#0A0A0C');
};
/** the title set big inside r (Helvetica Neue 700, sentence case, as many lines as fit; the part after "|" in 300 under it); editable as 'label' (or o.key) */
CK.bigTitle = (r, o = {}) => {
  const sid = SCENE_ID; SCENE_ID = 'label'; const key = o.key || 'label'; EL.seen.delete('label/' + key); const ov = ovr(key); SCENE_ID = sid;
  const def = o.def != null ? o.def : CK.labText; const str = ov.s != null ? ov.s : def;
  const info = { text: str, def, kind: 'box', sk: ov.k, label: o.what || 'title (text; "|" starts the second line)' };
  const s2 = SCENE_ID; SCENE_ID = 'label';
  try {
    if (ov.hide) { regBox(ov, r.x, r.y, r.w, r.h, info); return; }
    const [a0, b] = o.whole ? [str, ''] : CK.labelParts(str); const a = FBup(a0); const maxW = r.w - (o.padX != null ? o.padX : 60) * 2; const hand = a.includes('\n'); const maxL = hand ? Math.max(o.maxL || 3, a.split('\n').filter(x => x.trim()).length) : (o.maxL || 3);
    let z = Math.round((o.zMax || 160) * FBc('zK', 1)), la = [];
    for (; z > 36; z -= 4) { la = CK.wrapH(a, CKS(z), maxW); const z2_ = Math.min(o.z2Max || 60, z * 0.5); const h = la.length * z * 1.0 + (b ? 16 + z2_ * 1.15 * 2 : 0);
      if (la.length <= maxL && h <= r.h && Math.max(...la.map(l => tw(l, CKS(z), FBls(z, -0.035)))) <= maxW) break; }
    const z2 = Math.round(Math.min(o.z2Max || 60, z * 0.5)); const lb = b ? CK.wrapH(b, CKM2(z2), maxW) : [];
    const hh = la.length * z * 1.0 + (lb.length ? 16 + lb.length * z2 * 1.15 : 0);
    const y0 = r.y + (o.valign === 'top' ? 0 : o.valign === 'bottom' ? r.h - hh : (r.h - hh) / 2); const cx = r.x + r.w / 2;
    moved(ov, () => { let y = y0 + z * 0.84;
      const pInk = CK.FB && CK.FB.poster ? CK.FB.poster.ink : CK.ink;
      la.forEach((l) => { _txt(l, cx, y, CKS(z), o.col || pInk, 'center', 'alphabetic', FBls(z, -0.035)); y += z; });
      y += 16 - z + z * 0.12 + z2; lb.forEach((l) => { _txt(l, cx, y, CKM2(z2), o.col2 || o.col || pInk, 'center', 'alphabetic', -0.02 * z2); y += z2 * 1.15; });
      regBox(ov, r.x, y0, r.w, hh, info); }, [cx, y0]);
  } finally { SCENE_ID = s2; }
};
/** B: the title poster on concrete above her while she talks; C: the named thing huge (manifest "poster") behind her cut-out */
CK.poster = (t, r) => { if (CK.FB && CK.FB.poster) rect(r.x, r.y, r.w, r.h, CK.FB.poster.bg); if (CK.FMT === 'C') CK.bigTitle({ x: r.x, y: r.y + 20, w: r.w, h: r.h - 40 }, { key: 'poster', def: FOOT.m.poster || CK.labelParts(CK.labText)[0], whole: true, zMax: 230, maxL: 3, valign: 'top', padX: 20, what: 'the big words behind her' });
  else CK.bigTitle({ x: r.x, y: r.y + 10, w: r.w, h: r.h - 20 }, { zMax: 140, maxL: 3, z2Max: 64 }); };
CK.smallText = (key, def, draw, what) => { const sid = SCENE_ID; SCENE_ID = 'label'; EL.seen.delete('label/' + key); const ov = ovr(key); const str = ov.s != null ? ov.s : def;
  try { draw(ov, str, { text: str, def, kind: 'box', sk: ov.k, label: what }); } finally { SCENE_ID = sid; } };
CK.tagK = () => CK.smallText('tag', CK.labelParts(CK.labText)[0].toUpperCase(), (ov, str, info) => { const f = CK.FB ? CK.FB.M(40) : F.mono(36); const w = tw(str, f, 36 * 0.12); const x = 64, y = 112;
  if (ov.hide) { regBox(ov, x, y - 34, w, 44, info); return; }
  moved(ov, () => { ctx.save(); if (CK.FB && CK.FB.tagBox) fillRR(x - 16, y - 40, w + 32, 56, 6, CK.FB.tagBox); else CK.soft(36); _txt(str, x, y, f, CK.FB && CK.FB.tagBox ? CK.FB.capBoxInk : '#FFFFFF', 'left', 'alphabetic', 36 * 0.12); ctx.restore(); regBox(ov, x, y - 34, w, 44, info); }, [x, y]); }, 'small label top-left');
CK.boxM = () => CK.smallText('label', CK.labText.replace(/\s*\|\s*/, ' | '), (ov, str, info) => { const z = 64; const f = CK.FB && CK.FB.box ? CK.FB.box(z) : HN(z, 700); const maxW = W - 220;
  const lines = str.split(/[|\n]/).map(x => x.trim()).filter(Boolean).flatMap(l => CK.wrap(l, f, maxW)).slice(0, 3);
  const lh = z * 1.1, pw = 40, ph = 26; const bw = Math.max(...lines.map(l => tw(l, f, -0.02 * z))) + pw * 2, bh = lines.length * lh + ph * 2 - (lh - z); const x = CX - bw / 2, y = 168;
  if (ov.hide) { regBox(ov, x, y, bw, bh, info); return; }
  moved(ov, () => { fillRR(x, y, bw, bh, 28, FBc('boxBg', '#FFFFFF')); lines.forEach((l, i) => _txt(l, CX, y + ph + z * 0.8 + i * lh, f, FBc('boxInk', '#111111'), 'center', 'alphabetic', -0.02 * z)); regBox(ov, x, y, bw, bh, info); }, [CX, y]); }, 'title box (text; "|" starts a new line)');
CK.FLASH = 1.6;
CK.titleFmt = (t) => {
  const fm = CK.FMT; if (!CK.labText) return;
  if (fm === 'D' && t < CK.FLASH + 0.35) { const p = clamp((t - CK.FLASH) / 0.35); const pe = p * p * (3 - 2 * p); const h = 384;
    withT(0, -h * pe, 1, 0, () => { rect(0, 0, W, h, CK.FB && CK.FB.poster ? CK.FB.poster.bg : CK.conc); CK.bigTitle({ x: 0, y: 40, w: W, h: h - 70 }, { zMax: 110, maxL: 2, z2Max: 52 }); }); }
  if (fm === 'F' && !CK.inGfx(t)) CK.bigTitle({ x: 0, y: 70, w: W, h: 190 }, { zMax: 78, maxL: 2, z2Max: 44, col: FBc('title', '#FFFFFF'), col2: FBc('title', 'rgba(255,255,255,0.72)') });
  if (fm === 'K' && !CK.inGfx(t)) CK.tagK();
  if (fm === 'M' && !CK.inGfx(t)) CK.boxM();
  if (fm === 'G') { const a = 1 - CK.gfxSpans.reduce((m, [x, y]) => Math.max(m, t >= x - 0.01 && t < y ? Math.min(1, (t - x) / 0.2, (y - t) / 0.2) : 0), 0);
    if (a > 0.01) withA(a, () => CK.bigTitle({ x: 0, y: 150, w: W, h: 440 }, { zMax: 120, maxL: 3, z2Max: 60, col: FBc('title', '#FFFFFF'), col2: FBc('title', 'rgba(255,255,255,0.72)'), valign: 'bottom' })); }
};

/* ---------- her captions per format ---------- */
CK.capFmt = (t) => {
  if (!PORTRAIT || t >= FOOT.dur || !SHOW.captions) return; const fm = CK.FMT;
  if (fm === 'D' && t < CK.FLASH) return;
  const c = (TH.caps || []).find(x => x.t0 <= t && t < x.t1); if (!c) return;
  if ((TH.kws || []).some(k => t >= k.sp.t0 && t < k.sp.t1)) return;
  const ce = (EDIT.data.capShort || {})[c.i]; const raw = ce != null ? ce : c.text; const cst = EDIT.data.captions9 || {};
  const gfx = CK.inGfx(t); const yN = FOOT.capYNow;
  const S = {
    A: gfx ? { cy: 1790, size: 84, w: 700 } : { cy: 1728, size: 84, w: 700, ink: true },
    B: { cy: 1700, size: 70, w: 500 },   // on her picture (the poster above is light concrete: white words would not read on it)
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
  const FB = CK.FB; const bandInk = FB && FB.bandInk && ((fm === 'D' && !gfx) || (fm === 'F' && !gfx) || (fm === 'G' && !gfx)) ? FB.bandInk : null; if (bandInk) S.ink = true;
  let size = cst.size ? clamp(Math.round(cst.size), 40, 150) : Math.round(S.size * FBc('capK', 1)); const cy = cst.y != null ? cst.y : S.cy + (gfx ? 0 : FBc('capDy', 0));
  const all = ((S.up && !(FB && FB.capRaw)) || (FB && FB.capUp) ? raw.toUpperCase() : raw).split(/\s+/).filter(Boolean); if (!all.length) return;
  const wt = (c.ws && c.ws.length === all.length) ? c.ws.map(w => w.t) : all.map((_, i) => c.t0 + (c.t1 - c.t0) * 0.9 * i / Math.max(1, all.length));
  const hi = S.hi ? CK.hiWord(all) : -1;
  let words = all, k0 = 0;
  if (S.chunk || CK.FB) { const ch = []; let cur = []; const nMax = S.chunk ? 3 : 4;   // 2026-11-13 brief: captions are short phrases (2-5 words)
    all.forEach((w, i) => { cur.push(i); if ((/[,.?!:;]$/.test(w) && (cur.length >= 2 || !CK.FB)) || cur.length === nMax) { ch.push(cur); cur = []; } });
    if (cur.length) { if (cur.length === 1 && ch.length && ch[ch.length - 1].length < 4) ch[ch.length - 1].push(...cur); else ch.push(cur); }
    if (CK.FB) { const SW = /^(with|to|the|of|a|an|and|in|on|for|your|is|that|it|by|or|but)$/i;   // never end a caption on a little word ("to the server with")
      for (let k = 0; k < ch.length - 1; k++) while (ch[k].length > 1 && SW.test(all[ch[k][ch[k].length - 1]].replace(/[^a-z']/gi, ''))) ch[k + 1].unshift(ch[k].pop()); }
    let pick = ch[0]; for (const g_ of ch) if (t >= wt[g_[0]] - 0.08) pick = g_; words = pick.map(i => all[i]); k0 = pick[0]; }
  const ls = -0.02 * size; let f = CKC(size, S.w); const maxW = W * (S.box ? 0.84 : 0.86); const join = (l) => l.join(' '); let lines = [words];
  if (tw(join(words), f, ls) > maxW) { let bi = 1, bm = 1e9; for (let k = 1; k < words.length; k++) { const m_ = Math.max(tw(join(words.slice(0, k)), f, ls), tw(join(words.slice(k)), f, ls)); if (m_ < bm) { bm = m_; bi = k; } } lines = [words.slice(0, bi), words.slice(bi)]; }
  { const wide = Math.max(...lines.map(l => tw(join(l), f, ls))); if (wide > maxW) { size = Math.round(size * Math.max(0.66, maxW / wide)); f = CKC(size, S.w); } }
  const lsz = -0.02 * size; const lh = size * (S.box ? 1.32 : S.up ? 1.02 : 1.16); const y0 = cy - (lines.length - 1) * lh / 2 + size * 0.36;
  const widths = lines.map(l => tw(join(l), f, lsz)); const sp = tw(' ', f, lsz); let bx0 = 1e9, bx1 = -1e9, kk = k0;
  ctx.save();
  lines.forEach((ln, li) => { const y = y0 + li * lh; let x = CX - widths[li] / 2; bx0 = Math.min(bx0, x); bx1 = Math.max(bx1, x + widths[li]);
    if (S.box) { const px = size * 0.32; fillRR(x - px, y - size * 0.86, widths[li] + px * 2, size * 1.2, 6, FBc('capBox', 'rgba(0,0,0,0.86)')); }
    else if (!S.ink) CK.soft(size);
    const inkC = bandInk || CK.ink; const white = S.box ? FBc('capBoxInk', '#FFFFFF') : FBc('capCol', '#FFFFFF');
    const keyC = (wd) => (FB ? (CK.isKey(wd) ? FB.key : null) : CK.keyCol(wd));
    ln.forEach((wd) => { let col = S.ink ? inkC : white; if (kk === hi && !S.ink) col = FB ? FB.key : (CK.keyCol(wd) || CK.FOOTG);
      if (kk === hi && !S.ink && FB && FB.keyBox) { const wv = tw(wd, f, lsz); ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0)'; rect(x - size * 0.08, y - size * 0.86, wv + size * 0.16, size * 1.02, FB.keyBox); ctx.restore(); }
      if (S.lit) { if (t < wt[kk] - 0.02) { ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0)'; _txt(wd, x, y, f, S.ink ? FBc('dim', 'rgba(12,12,12,0.35)') : (FBc('dim', null) || S.dim || 'rgba(255,255,255,0.4)'), 'left', 'alphabetic', lsz); ctx.restore(); }
        else _txt(wd, x, y, f, S.ink ? inkC : (keyC(wd) || '#FFFFFF'), 'left', 'alphabetic', lsz); }
      else _txt(wd, x, y, f, col, 'left', 'alphabetic', lsz);
      x += tw(wd, f, lsz) + sp; kk++; }); });
  ctx.restore();
  const bt = y0 - size * 0.95, bh = (lines.length - 1) * lh + size * 1.3; const pad = S.box ? size * 0.32 : 22;
  regBox({ id: 'caption/' + c.i, edited: ce != null, hide: false }, bx0 - pad, bt, bx1 - bx0 + pad * 2, bh, { kind: 'caption', text: raw, def: c.text, cue: c.i });
};

/* ---------- the cover frame (SHORTS-PLAYBOOK "Cover frame") ----------
 * "cover": {"on": true, "dur": 0.1, "at": <source s>, "text": "line, ~one word~ in colour", "style": "photo" | "card", "acc": "green" | "red", "ground": "#hex" (card)}. Drawn OVER the
 * first 0.1 s (no time inserted). ONE style for the series: her still full frame (tools/covers.py -> assets/covers/<id>.jpg, image
 * cover_<id>) + the line in Helvetica Neue 700 white with a soft shadow, y ~300-640, one word in green (kept) or crash red (gone). "card": a flat colour (concrete / crash yellow) with fine
 * same-hue diagonal lines, the line in ink, the word knocked out of an ink block (the video's marker), her cut-out at the foot. */
CK.coverOf = () => { const c = FOOT.m && FOOT.m.kind === 'short' && PORTRAIT ? FOOT.m.cover : null; return c && c.on !== false ? c : null; };
CK.coverOn = (t) => { const c = CK.coverOf(); return !!c && t >= 0 && t < (c.dur || 0.1); };
CK.coverDraw = (t) => {
  // 2026-11-13 font-board pass: kinds "photo" (her still, her real room), "big" (the line alone on the board item's ground), "frame" (a slide
  // of the short under the line, image cover_<id>_frame); "card" (old, her cut-out) kept for her edits. Her Shift+Enter lines are law.
  const c = CK.coverOf(); const id = FOOT.m.id; const frame = c.style === 'frame'; const big = !!c.big; const card = c.style === 'card' || frame || big;
  const FC = CK.FB && CK.FB.cover;
  const sid = SCENE_ID; SCENE_ID = 'cover'; EL.seen.clear();
  try {
    if (card) { if (FC) rect(0, 0, W, H, FC.card || FC.bg);
      else { rect(0, 0, W, H, c.ground || CK.conc); ctx.save(); ctx.strokeStyle = 'rgba(17,17,17,0.06)'; ctx.lineWidth = 3; ctx.beginPath();
        for (let x = -H; x < W + H; x += 26) { ctx.moveTo(x, 0); ctx.lineTo(x + H * 0.6, H); } ctx.stroke(); ctx.restore(); }
      if (frame) { const fi = IMG['cover_' + id + '_frame']; const dy = c.shift != null ? c.shift : 620; if (fi) { const fw = W * (c.frameW || 0.86), fh = fw / fi.width * fi.height, fx = (W - fw) / 2;
        grp('frame', fx, dy, fw, fh, () => themeFixed(() => { ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0.35)'; ctx.shadowBlur = 40; ctx.shadowOffsetY = 14; ctx.drawImage(fi, fx, dy, fw, fh); ctx.restore(); }), { img: true, label: 'the slide under the cover line' }); } }
      const im = frame || big ? null : IMG['cover_' + id + '_cut']; if (im) { const h = 980, w = im.width / im.height * h; const x = CX - w / 2, y = H - h;
        grp('her', x, y, w, h, () => themeFixed(() => ctx.drawImage(im, x, y, w, h)), { img: true, label: 'her cut-out (drag to move, corners to resize)' }); } }
    else { const im = IMG['cover_' + id]; if (im) grp('her', 0, 0, W, H, () => themeFixed(() => { ctx.drawImage(im, 0, 0, W, H); if (c.dim) { ctx.save(); ctx.globalAlpha = c.dim; ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, c.dimH || 760); ctx.restore(); } }), { img: true, label: 'her still' }); else rect(0, 0, W, H, '#111114'); }
    const ov = ovr('cover'); const str = ov.s != null ? ov.s : (c.text || FOOT.m.title || '');
    const info = { text: str, def: c.text || '', kind: 'box', sk: ov.k, label: 'cover line (text; ~word~ = the coloured word; Shift+Enter = new line)' };
    const BR = ' '; const segs = []; FBup(str).replace(/[ \t]*\n[ \t]*/g, ' ' + BR + ' ').split(/(~[^~]+~)/).filter(Boolean).forEach(p_ => { const on = /^~.*~$/.test(p_);
      p_.replace(/~/g, '').split(/[ \t]+/).filter(Boolean).forEach(w => { if (w === BR) segs.push({ br: true }); else if (/^[,.?!:;]+$/.test(w) && segs.length && !segs[segs.length - 1].br) segs[segs.length - 1].w2 = w; else segs.push({ w, on }); }); });
    const hand = segs.some(s_ => s_.br);
    const FS = (zz) => CKS(zz); const KF = (zz) => (FC && FC.keyFont ? FC.keyFont(zz) : FS(zz)); const fOf = (s_, zz) => (s_.on ? KF(zz) : FS(zz));
    const box = FC && FC.lineBox; const maxW = W - (big ? 100 : box ? 200 : 150), maxH = big ? (frame ? 460 : 1100) : frame ? 420 : card ? 520 : 400; let top = frame ? 280 : big ? 0 : card ? 330 : (c.top || 260);
    const lw = (L, zz) => L.reduce((a, s_, i) => a + tw(s_.w + (s_.w2 || ''), fOf(s_, zz), FBls(zz, -0.03)) + (i ? tw(' ', FS(zz), FBls(zz, -0.03)) : 0), 0);
    const lay0 = (zz, mw) => { const L = [[]];
      if (hand) { for (const s_ of segs) { if (s_.br) { if (L[L.length - 1].length) L.push([]); continue; } L[L.length - 1].push(s_); } return L.filter(l => l.length); }
      for (const s_ of segs) { const nx = [...L[L.length - 1], s_]; if (L[L.length - 1].length && lw(nx, zz) > mw) L.push([s_]); else L[L.length - 1] = nx; } return L; };
    const LH = box ? 1.28 : 1.06;
    const fitsW = (L, zz) => L.every(l => lw(l, zz) <= maxW);
    const ok = (L, zz) => L.length * zz * LH <= maxH && fitsW(L, zz) && (hand || L.length === 1 || (big ? L.every(l => l.length >= 2 || l[0].w.length > 3) : L[L.length - 1].length >= 2));
    const pick = (zz, maxL) => { let L = lay0(zz, maxW); if (hand) return ok(L, zz) ? L : null; if (L.length > maxL) return null; if (ok(L, zz)) return L;
      for (let k = 0.96; k > 0.5; k -= 0.03) { const L2 = lay0(zz, maxW * k); if (L2.length > L.length) break; if (ok(L2, zz)) return L2; } return null; };
    const z0 = Math.round((big && !frame ? 260 : 128) * FBc('zK', 1)); let z = z0, lines = null; for (; z >= 84 && !lines; z -= 4) lines = pick(z, big ? 4 : 3); if (lines) z += 4;
    if (!lines) for (z = z0; z > 40; z -= 4) { lines = lay0(z, maxW); if ((hand ? fitsW(lines, z) : lines.length <= 4) && lines.length * z * LH <= maxH) break; }
    const lsz = FBls(z, -0.03), sp = tw(' ', FS(z), lsz), lh = z * LH; if (big && !frame) top = (H - lines.length * lh) / 2 - z * 0.1;
    const ww_ = (s_) => tw(s_.w + (s_.w2 || ''), fOf(s_, z), lsz); const lw_ = (l) => l.reduce((a, s_, i) => a + ww_(s_) + (i ? sp : 0), 0); const bw = Math.max(...lines.map(lw_));
    if (ov.hide) { regBox(ov, CX - bw / 2, top, bw, lines.length * lh, info); return; }
    moved(ov, () => { ctx.save(); if (!card && !box) { ctx.shadowColor = 'rgba(0,0,0,0.6)'; ctx.shadowBlur = z * 0.35; ctx.shadowOffsetY = z * 0.04; }
      lines.forEach((l, i) => { let x = CX - lw_(l) / 2; const y = top + z * 0.86 + i * lh;
        if (box) { const px = z * 0.3; fillRR(x - px, y - z * 0.9, lw_(l) + px * 2, z * 1.16, 8, box); }
        for (const s_ of l) { const f = fOf(s_, z); const wv = tw(s_.w, f, lsz);
          if (FC) { if (s_.on && FC.keyBox) { ctx.save(); ctx.shadowColor = 'rgba(0,0,0,0)'; rect(x - z * 0.08, y - z * 0.84, wv + z * 0.16, z * 1.04, FC.keyBox); ctx.restore(); _txt(s_.w, x, y, f, FC.keyInk, 'left', 'alphabetic', lsz); }
            else _txt(s_.w, x, y, f, s_.on ? FC.key : FC.ink, 'left', 'alphabetic', lsz); }
          else if (card && s_.on) { rect(x - z * 0.08, y - z * 0.84, wv + z * 0.16, z * 1.04, CK.ink); _txt(s_.w, x, y, f, '#FFFFFF', 'left', 'alphabetic', lsz); }
          else _txt(s_.w, x, y, f, s_.on ? (c.acc === 'red' ? CK.FOOTR : CK.FOOTG) : card ? CK.ink : '#FFFFFF', 'left', 'alphabetic', lsz);
          if (s_.w2) _txt(s_.w2, x + wv, y, f, FC ? FC.ink : card ? CK.ink : '#FFFFFF', 'left', 'alphabetic', lsz); x += ww_(s_) + sp; } });
      ctx.restore(); regBox(ov, CX - bw / 2, top, bw, lines.length * lh, info); }, [CX, top]);
  } finally { SCENE_ID = sid; }
};
// draw order on top of everything: captions, then the format's title, and the cover over all of it for the first 0.1 s
TH.over.push((t) => {
  if (!(FOOT.m && FOOT.m.kind === 'short') || t >= FOOT.dur) return;
  if (CK.coverOn(t)) { CK.coverDraw(t); return; }
  if (!CK.FMT) return;
  const sid = SCENE_ID; SCENE_ID = 'captions'; try { CK.capFmt(t); } finally { SCENE_ID = sid; }
  CK.titleFmt(t);
});
// full-bleed formats (H I K M): her face fills the middle, so a correction pause (the typed "Update: …" box) sits lower, on her
// chest, not over her face (the box stays movable in the editor). Shifts the visible rect the engine centres it in, for that one call.
if (CK.FMT && /[HIKM]/.test(CK.FMT) && typeof drawPauses === 'function') {
  const dp0 = drawPauses; drawPauses = function (t) { const vr0 = visRect; visRect = () => { const v = vr0() || [0, 0, W, H]; return [v[0], v[1] + 440, v[2], v[3]]; }; try { dp0(t); } finally { visRect = vr0; } };
}
