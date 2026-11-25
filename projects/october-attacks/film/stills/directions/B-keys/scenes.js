/* B · THE KEY BOARD: scenes on her real lines (times = voice.m4a seconds, whisper word times). */
'use strict';
/** a label plate above a hook (the key cabinet's printed names) */
function plate(x, y, w, s, col = B.paper, ink = B.ink, size = 34) { fillRR(x - w / 2, y - 30, w, 60, 6, col); _txt(s, x, y + 2, F.mono(size, 600), ink, 'center', 'middle'); }
function buildFilm() {
  /* ---------- 1. the board: every platform's key, taken one after the other (0:00 - 0:09) ---------- */
  const k1 = { oct: PA('October is supposed to be', 2.5), aw: P('cybersecurity awareness month'), one: P('one attack after the other') };
  const NAMES = ['PHP', 'NODE.JS', 'RAILWAY', 'ZEABUR', 'OPENCODE', 'EMUDHRA'];
  const ORDER = [3, 5, 4, 0, 2, 1];   // by date: Zeabur 14, eMudhra 17, OpenCode 19, PHP / Railway / Node 21
  const takeT = [k1.one.w[0], k1.one.w[1], k1.one.w[2] - 0.05, k1.one.w[2] + 0.2, k1.one.w[3], k1.one.w[3] + 0.25];
  const takenAt = {}; ORDER.forEach((i, n) => { takenAt[i] = takeT[n]; });
  addScene(0, 'peg', 'board', (t) => {
    pegboard();
    KT(t, { lines: ['October'], x: L, y: V(250, 520), size: V(170, 150), times: [k1.oct.w[0]], col: B.ink, blur: 8 });
    const sx = V(1190, L), sy = V(118, 556), sw = V(620, W - 2 * L), sh = V(150, 118); const ps = ez(t, k1.aw.w[0], 0.45);
    if (ps > 0) grp('awareness sign', sx, sy, sw, sh, () => withA(Math.min(1, ps * 1.5), () => { ctx.save(); ctx.translate(sx + sw / 2, sy); ctx.rotate(0.03 * (1 - ps) + swing(t, k1.aw.w[0] + 0.2, 0.02, 1.3, 0.3)); ctx.translate(-sx - sw / 2, -sy + 30 * (1 - ps));
      sign(sx, sy, sw, sh, () => { txt('Cybersecurity', sx + sw / 2, sy + V(74, 60), F.mono(V(38, 36), 600), B.ink, 'center', 'alphabetic', 1); txt('Awareness Month', sx + sw / 2, sy + V(122, 102), F.mono(V(38, 36), 600), B.ink, 'center', 'alphabetic', 1); }); ctx.restore(); }));
    NAMES.forEach((nm, i) => {
      const hx = PORTRAIT ? 220 + (i % 3) * 320 : 240 + i * 288, hy = PORTRAIT ? 800 + Math.floor(i / 3) * 385 : 500, len = V(430, 170);
      const tk = takenAt[i]; const pt = ez(t, tk, 0.32); const gone = MOTION.ease(t, tk, 0.4, 'inExpo');
      grp('plate ' + nm, hx - 130, hy - 110, 260, 60, () => plate(hx, hy - 80, V(250, 270), nm, pt > 0.5 ? B.red : B.paper, pt > 0.5 ? B.paper : B.ink, V(34, 34)));
      hook(hx, hy);
      const hin = 0.4 + i * 0.12; if (t < hin) return;
      if (gone < 1) key(hx + 12, hy + 32 - gone * 900, len, swing(t, hin, 0.28, 1.0, 0.16) + gone * 0.8, { bits: [0.3 + 0.1 * (i % 3), 0.8, 0.2 + 0.1 * (i % 2), 0.6, 0.35] });
    });
  }, { id: 'board' });
  cue('thud', k1.oct.w[0], -5); cue('hang', 0.45, -10); cue('paper', k1.aw.w[0], -6);
  cue('zip', takeT[0], -7); cue('zip2', takeT[2], -6); cue('zip3', takeT[4], -6);   // three sounds for six keys

  /* ---------- 4. before your code even runs (1:48) ---------- */
  const k4 = { thing: PA('the thing about PHP two shell', 107.5), bef: P('it happens before your code even runs'), reads: P('so PHP reads the incoming request first'), log: P('so your login your middleware your authentication'), nob: P('nobody stands a chance') };
  addScene(k4.thing.t - 0.1, 'peg', 'before', (t) => {
    pegboard();
    KT(t, { lines: V(['before your', 'code even', '*runs*'], ['before your', 'code even *runs*']), x: L, y: V(300, 520), size: V(112, 96), times: k4.bef.w.slice(2), col: B.ink, acc: B.red });
    // the door with its locks; the request slips in underneath, before any lock is tried
    const dx = V(1060, 290), dy = V(110, 740), dw = V(520, 500), dh = V(800, 560), floor = dy + dh + 44;
    grp('door', dx, dy, dw, dh, () => { fillRR(dx, dy, dw, dh, 6, B.ink); strokeR(dx + 30, dy + 30, dw - 60, dh - 60, B.inkSoft, 4);
      const locks = [['login', k4.log.w[1]], ['middleware', k4.log.w[3]], ['authentication', k4.log.w[5]]];
      locks.forEach(([s, at], i) => { const ly = dy + V(190, 140) + i * V(170, 120), lx = dx + dw - 90; const p = ez(t, Math.min(at, k4.bef.w[6] + 0.2 + i * 0.15), 0.35);
        withA(p, () => { fillRR(lx - 38, ly - 50, 76, 100, 10, B.nickel); circle(lx, ly - 8, 12, B.ink); rect(lx - 5, ly - 4, 10, 30, B.ink);
          const dead = ez(t, k4.nob.w[0] + i * 0.1, 0.4); withA(1 - 0.55 * dead, () => plate(lx - 250, ly, 330, s, B.paper, B.ink, V(34, 32))); }); }); });
    rect(dx - 260, floor, dw + 520, 8, B.ink);
    const pa = ez(t, k4.reads.w[3] - 0.2, 0.9, 'inOutQuart'); if (pa > 0) { const ay = dy + dh + 22, x0 = dx - 240, x1 = dx + dw + 160;
      rect(x0, ay - 5, (x1 - x0) * pa, 10, B.red); const hx = x0 + (x1 - x0) * pa; ctx.beginPath(); ctx.moveTo(hx + 26, ay); ctx.lineTo(hx - 4, ay - 20); ctx.lineTo(hx - 4, ay + 20); ctx.closePath(); ctx.fillStyle = B.red; ctx.fill(); }
    withA(ez(t, k4.reads.w[5], 0.4), () => txt('PHP reads the request first', V(L, L), V(870, 1400), F.body(V(54, 48), 800), B.red, 'left'));
  }, { id: 'before' });
  cue('thud', k4.bef.w[5], -6); cue('slide', k4.reads.w[3] - 0.2, -6); cue('lock', k4.log.w[1], -8); cue('lock', k4.log.w[5], -8);

  /* ---------- 5. the fix: new keys, cut for the new versions (2:24) ---------- */
  const k5 = { upd: PA('you have to update your PHP', 146.4), old: P('if you\'re still on PHP 8.1 or older'), rest: P('you have to restart'), dock: P('if you use Docker you have to rebuild your images') };
  addScene(k5.upd.t - 0.15, 'inkB', 'fix', (t) => {
    pegboard('#2A241D');
    KT(t, { lines: V(['update your PHP'], ['update', 'your PHP']), x: L, y: V(220, 520), size: V(120, 130), times: k5.upd.w.slice(3), col: B.paper, acc: B.red });
    ['8.5.12', '8.4.27', '8.3.36', '8.2.35'].forEach((v, i) => { const at = k5.upd.w[4] + i * 0.14; if (t < at) return;
      const hx = PORTRAIT ? 190 + i * 235 : 230 + i * 230, hy = V(440, 760);
      plate(hx, hy - 80, V(210, 215), v, B.paper, B.ink, V(36, 36)); hook(hx, hy, B.paper);
      key(hx + 12, hy + 32 - 120 * (1 - ez(t, at, 0.3)), V(300, 260), swing(t, at, 0.3, 1.1, 0.18), { fill: B.paper, ink: B.ink, bg: B.ink, bits: [0.2 + i * 0.15, 0.8, 0.4, 0.6 - i * 0.1, 0.3] }); });
    withA(ez(t, k5.upd.w[5], 0.4), () => txt('php -v   # check what you’re running', L, V(970, 1260), F.mono(V(34, 32), 600), '#A89C8A', 'left'));
    const todo = [['On 8.1 or older? Upgrade', k5.old.w[5]], ['Restart PHP-FPM or Apache', k5.rest.w[3]], ['Rebuild your Docker images', k5.dock.w[7]]];
    const tx = V(1110, L), ty = V(420, 1340), th = V(140, 0);
    todo.forEach(([s, at], i) => { if (PORTRAIT && i < 2) return; const p = ez(t, at - 0.3, 0.4); if (p <= 0) return; const y = ty + (PORTRAIT ? 0 : i * th);
      withA(p, () => { fillRR(tx, y - 4, V(700, 920), 100, 10, B.paper); const pk = ez(t, at, 0.3); strokeR(tx + 22, y + 22, 52, 52, B.ink, 4); if (pk > 0) rect(tx + 31, y + 31, 34 * pk, 34, B.red);
        txt(s, tx + 96, y + 62, F.body(V(40, 42), 800), B.ink, 'left'); }); });
  }, { id: 'fix' });
  cue('hang', k5.upd.w[4], -8); cue('hang', k5.upd.w[4] + 0.42, -9); cue('check', k5.old.w[5], -5); cue('check2', k5.rest.w[3], -5); cue('check', k5.dock.w[7], -5);

  /* ---------- 6. Railway: the keyring of secrets (3:04) ---------- */
  const k6 = { acc: PA('someone may have accessed their customers\' encrypted environment variables', 185), safe: P('how important it is to keep your environment variables safe'), rev: PA('to revoke and change their API', 198) };
  addScene(k6.acc.t - 0.2, 'peg', 'env', (t) => {
    pegboard();
    // the keyring: three keys on one ring
    const hx = V(250, 220), hy = V(150, 420); hook(hx, hy);
    const pr = ez(t, k6.acc.t - 0.1, 0.4); if (pr > 0) { const rcx = hx + 12, rcy = hy + 110, rr_ = 70;
      ctx.save(); ctx.translate(rcx, hy + 32); ctx.rotate(swing(t, k6.acc.t - 0.1, 0.12, 0.9, 0.2)); ctx.translate(-rcx, -hy - 32);
      [-0.45, 0, 0.45].forEach((a, i) => { const gone = MOTION.ease(t, k6.rev.w[5] + 0.5 + i * 0.15, 0.45, 'inExpo'); if (gone >= 1) return;
        key(rcx + Math.sin(a) * rr_, rcy + Math.cos(a) * rr_ * 0.6 - gone * 700, V(250, 220), a * 0.8 + gone, { bits: [0.4, 0.7 - i * 0.2, 0.3, 0.8, 0.5] }); });
      ctx.lineWidth = 9; ctx.strokeStyle = B.ink; ctx.beginPath(); ctx.ellipse(rcx, rcy, rr_, rr_ * 0.6, 0, 0, Math.PI * 2); ctx.stroke(); ctx.restore(); }
    // the .env, on a paper tag pinned beside it
    const ex = V(500, 450), ey = V(130, 400), ew = V(560, 550), eh = V(380, 360);
    grp('env tag', ex, ey, ew, eh, () => withA(ez(t, k6.acc.w[6], 0.4), () => { sign(ex, ey, ew, eh, () => {
      _txt('.env', ex + 40, ey + 96, F.disp(54), B.ink, 'left');
      [['DB_PASSWORD=', '••••••'], ['OPENAI_API_KEY=', 'sk-•••'], ['AWS_SECRET_KEY=', '••••••']].forEach(([k, v], i) => { const y = ey + 180 + i * 64;
        withA(ez(t, k6.acc.w[7] + i * 0.25, 0.3), () => { _txt(k, ex + 40, y, F.mono(32, 600), B.ink, 'left'); _txt(v, ex + 40 + tw(k, F.mono(32, 600)), y, F.mono(32, 600), B.red, 'left');
          const ps = ez(t, k6.rev.w[3] + i * 0.15, 0.4); if (ps > 0) strikeBar(ex + 40, y - 11, tw(k + v, F.mono(32, 600)), ps, B.red, 6); }); }); }); }));
    const cx = L, cy = V(640, 950), cw = V(1400, W - 2 * L);
    const ch = clipCard(t, 'railway-text', cx, cy, cw, { at: k6.acc.w[3], crop: [70, 250], hlAt: k6.acc.w[6], hl: '#FFB0A0', credit: B.ink, creditSize: 32, rise: 60 });
    if (ch.h > 0) withA(ez(t, k6.acc.w[3], 0.4), () => bulldog(cx + cw - 180, cy + 8 - 60 * (1 - ez(t, k6.acc.w[3], 0.5))));
    KT(t, { lines: V(['revoke and', '*change*', '*their keys*'], ['revoke and', '*change their keys*']), x: V(1150, L), y: V(250, 1450 - 120), size: V(96, 80), col: B.ink, acc: B.red, times: TM({ t: k6.rev.w[1], w: k6.rev.w.slice(1) }, 5) });
  }, { id: 'env' });
  cue('jingle', k6.acc.t - 0.1, -8); cue('type', k6.acc.w[7], -10); cue('clip', k6.acc.w[3], -5); cue('zip', k6.rev.w[1], -7); cue('marker', k6.rev.w[3], -6);

  /* ---------- 7. Zeabur: the one key nobody changed (4:00) — the motion test ---------- */
  const k7 = { how: PA('so how did the attackers get in the second time after they got in the first time', 239.9), acc: P('according to'), tok: P('their admin token had no expiry date'), since: P('they had not changed this token since January 2024'), chg: P('so after the first attack when they changed their keys'), inc: P('they didn\'t include that particular set of tokens') };
  const ZN = ['AWS KEYS', 'GCP KEY', 'DATABASE', 'GITHUB APP', 'SECRETS', 'ADMIN'];   // the systems in Zeabur's own attack chart (BleepingComputer)
  addScene(k7.how.t - 0.15, 'peg', 'zeabur', (t) => {
    pegboard();
    const hp = (i) => PORTRAIT ? [220 + (i % 3) * 320, 860 + Math.floor(i / 3) * 360] : [210 + i * 228, 500];
    // camera: push towards the admin key while she names it, back out for the swap
    const [ax, ay] = hp(5); const pin = io(t, k7.tok.w[1] - 0.2, 0.7) * (1 - io(t, k7.chg.w[0] - 0.1, 0.6)); const s = 1 + V(0.32, 0.22) * pin;
    const fx = lerp(CX, ax - V(120, 160), pin), fy = lerp(H / 2, ay + V(160, 200), pin);
    ctx.save(); ctx.translate(CX, H / 2); ctx.scale(s, s); ctx.translate(-fx, -fy);
    withA(1 - pin, () => KT(t, { lines: V(['how did they get in *again?*'], ['how did they', 'get in *again?*']), x: L, y: V(220, 560), size: V(100, 96), times: [k7.how.w[1], k7.how.w[2], k7.how.w[3], k7.how.w[5], k7.how.w[6], k7.how.w[8]], col: B.ink, acc: B.red }));
    withA(ez(t, k7.acc.t, 0.4) * (1 - pin), () => txt('Zeabur says:', L, V(300, 640), F.mono(34, 600), g.mid, 'left', 'alphabetic', 1));
    const swapT = (i) => k7.chg.w[7] + i * 0.12;
    ZN.forEach((nm, i) => { const [hx, hy] = hp(i); const admin = i === 5; const hin = k7.how.t + 0.2 + i * 0.13;
      const stamp = admin ? ez(t, k7.inc.w[2], 0.3) : 0;
      plate(hx, hy - 80, V(220, 270), nm, stamp > 0.5 ? B.red : B.paper, stamp > 0.5 ? B.paper : B.ink, 32); hook(hx, hy);
      if (t < hin) return;
      if (!admin) { const out = MOTION.ease(t, swapT(i), 0.35, 'inExpo'); const inn = ez(t, swapT(i) + 0.4, 0.4);
        if (out < 1) withA(1 - out, () => key(hx + 12, hy + 32 + out * 700, V(350, 220), swing(t, hin, 0.3, 1.0, 0.17) - out * 0.5, { bits: [0.3, 0.8 - i * 0.1, 0.4, 0.6, 0.2 + i * 0.1] }));
        if (inn > 0) withA(Math.min(1, inn * 2), () => key(hx + 12, hy + 32 - (1 - inn) * 90, V(350, 220), swing(t, swapT(i) + 0.4, 0.32, 1.1, 0.17), { fill: '#3A332B', ink: B.ink, bg: B.peg, bits: [0.6, 0.3, 0.8 - i * 0.1, 0.4, 0.7] }));
      } else {
        key(hx + 12, hy + 32, V(350, 220), swing(t, hin, 0.3, 1.0, 0.17) + swing(t, k7.tok.w[1], 0.12, 1.2, 0.2) * (t >= k7.tok.w[1] ? 1 : 0), { fill: B.brass, bits: [0.5, 0.5, 0.9, 0.2, 0.6] });
        const tg = ez(t, k7.tok.w[1], 0.35); const sx = V(hx + 136, 560), sy = V(hy + 110, 600), sw = 330, sh = 290;
        if (tg > 0) grp('token sign', sx, sy, sw, sh, () => withA(tg, () => { ctx.save(); ctx.translate(0, 24 * (1 - tg)); sign(sx, sy, sw, sh, () => {
          _txt('ADMIN TOKEN', sx + sw / 2, sy + 84, F.mono(32, 700), B.ink, 'center');
          withA(ez(t, k7.since.w[7] - 0.1, 0.3), () => _txt('SINCE JAN 2024', sx + sw / 2, sy + 136, F.mono(32, 600), B.ink, 'center'));
          const pn = ez(t, k7.tok.w[4] - 0.05, 0.3); if (pn > 0) { rect(sx + 20, sy + 160, (sw - 40) * pn, 52, B.red); withA(pn, () => _txt('NO EXPIRY', sx + sw / 2, sy + 198, F.mono(32, 700), B.paper, 'center')); }
          withA(ez(t, k7.inc.w[4], 0.3), () => _txt('NEVER CHANGED', sx + sw / 2, sy + 256, F.mono(32, 700), B.red, 'center')); }); ctx.restore(); }));
        handCircle(hx + 12, hy + V(250, 170), V(105, 84), V(280, 190), ez(t, k7.inc.w[3], 0.7), B.red, 9);
      } });
    ctx.restore();
    withA(ez(t, k7.chg.w[7] + 0.6, 0.4), () => txt('dark keys: changed after the August breach', L, V(1046, 1440), F.mono(32, 600), B.ink, 'left', 'alphabetic', 0.5));
  }, { id: 'zeabur' });
  cue('hang', k7.how.t + 0.2, -10); cue('paper', k7.tok.w[1], -6); cue('stamp', k7.tok.w[4], -4); cue('type1', k7.since.w[7], -6);
  cue('zip', k7.chg.w[7], -6); cue('jingle', k7.chg.w[7] + 0.5, -6); cue('scribble', k7.inc.w[3], -7); cue('thud', k7.inc.w[4], -6);

  /* ---------- 7b. Zeabur: the real coverage, clipped to the board (4:16) ---------- */
  const k7b = { open: PA('they didn\'t change those set and that kind of opened the gates again', 256.5) };
  addScene(k7b.open.t - 0.1, 'peg', 'zeabur-src', (t) => {
    pegboard();
    const cx = V(L, L), cw = V(1300, W - 2 * L);
    clipCard(t, 'zeabur-head', cx, V(170, 520), cw, { at: k7b.open.t, creditBelow: false, pad: 22 });
    clipCard(t, 'zeabur-quote', cx, V(330, 680), cw, { at: k7b.open.w[2], crop: [140, 258], hlAt: k7b.open.w[5], hl: '#FFB0A0', credit: B.ink, creditSize: 32 });
    withA(ez(t, k7b.open.t, 0.3), () => bulldog(cx + 160, V(178, 528)));
    KT(t, { lines: V(['that opened the', 'gates *again*'], ['that opened', 'the gates', '*again*']), x: L, y: V(780, 1080), size: V(110, 112), times: k7b.open.w.slice(6), col: B.ink, acc: B.red });
  }, { id: 'zeabur-src' });
  cue('clip', k7b.open.t, -5); cue('marker', k7b.open.w[5], -6);

  /* ---------- 8. eMudhra: the key that was the number 4 (6:17) ---------- */
  const k8 = { eight: PA('eight of the assignee keys were so weak', 378.6), num: PA('literally was the number four', 384.6) };
  addScene(k8.eight.t - 0.6, 'peg', 'four', (t) => {
    pegboard();
    grp('address bar', L, V(110, 380), V(760, W - 2 * L), 76, () => withA(ez(t, k8.eight.t - 0.5, 0.4), () => addressBar(L, V(110, 380), V(760, W - 2 * L), 76, 'any-website.com', { bar: B.paper, ink: B.ink })));
    KT(t, { lines: V(['one signing', 'key was', 'the number'], ['one signing key', 'was the number']), x: L, y: V(400, 600), size: V(104, 92), times: [k8.eight.w[0], k8.eight.w[5], k8.eight.w[6], k8.num.w[0], k8.num.w[1], k8.num.w[2], k8.num.w[3]], col: B.ink });
    const hx = V(1340, 540), hy = V(130, 820); hook(hx, hy);
    const p4 = ez(t, k8.num.w[4] - 0.06, 0.3, 'outExpo');
    key(hx + 12, hy + 32, V(640, 520), swing(t, k8.eight.t - 0.4, 0.18, 0.8, 0.15), { bits: [0.1, 0.1, 0.1, 0.1, 0.1], label: p4 > 0.02 ? '4' : '', labelSize: V(170, 140) * (0.6 + 0.4 * p4), labelCol: B.red });
    withA(ez(t, k8.num.w[4] + 0.5, 0.4), () => txt('eMudhra: a company your browser trusts', L, V(980, 1440 - 40), F.mono(32, 600), g.mid, 'left', 'alphabetic', 1));
  }, { id: 'four' });
  cue('hang', k8.eight.t - 0.4, -8); cue('stamp', k8.num.w[4] - 0.06, -2);
}
