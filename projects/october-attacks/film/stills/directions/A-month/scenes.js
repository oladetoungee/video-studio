/* A · THE MONTH: scenes on her real lines (times = voice.m4a seconds, whisper word times).
 * Round 2 (critic): every story frame is the inside of its day cell (dayFrame), real coverage in every story, readable;
 * two entry styles (word type-on for her headline, a block wipe for supporting lines); 3 sounds for the 6 dates. */
'use strict';
function buildFilm() {
  /* ---------- 1. the month fills up (0:00 - 0:09) ---------- */
  const k1 = { oct: PA('October is supposed to be', 2.5), aw: P('cybersecurity awareness month'), iro: P('and it has ironically been'), one: P('one attack after the other') };
  const fillT = [7.26, 7.42, 7.58, 7.74, 7.9, 8.06].map((x, i) => k1.one.w[0] + (x - 7.26));
  const FILLS = ATTACKS.map(([d, label], i) => ({ d, label, at: fillT[i] }));
  addScene(0, 'oct', 'month', (t) => {
    const push = 1 + 0.04 * MOTION.ease(t, 3.0, 5.0, 'inOutQuart');   // a slow push while the month waits for its attacks
    ctx.translate(CX, H * 0.55); ctx.scale(push, push); ctx.translate(-CX, -H * 0.55);
    const yT = V(286, 640), sT = V(220, 236);
    if (!PORTRAIT) mono('this month on the internet', L, 86, 32, g.mid, 'left', {});
    KT(t, { lines: ['October'], x: L, y: yT, size: sT, times: [k1.oct.w[0]], col: A.ink, blur: 10 });
    // the printed banner of the month, wiped in on "cybersecurity awareness month", underlined on "ironically"
    const pb = ez(t, k1.aw.w[0], 0.55, 'outExpo');
    if (pb > 0) { const bx = V(1160, L), by = V(196, 664), bw = V(650, W - 2 * L), bh = V(76, 72);
      grp('awareness banner', bx, by, bw, bh, () => { ctx.save(); ctx.beginPath(); ctx.rect(bx, by, bw * pb, bh); ctx.clip(); rect(bx, by, bw, bh, A.ink);
        txt('Cybersecurity Awareness Month', bx + 26, by + bh / 2 + 2, F.mono(V(33, 32), 500), A.bone, 'left', 'middle', 1.5); ctx.restore();
        handLine(bx, by + bh + 16, bw, ez(t, k1.iro.w[3] - 0.1, 0.6), A.ink, 7, 3); }); }
    withA(ez(t, k1.oct.w[0] + 0.2, 0.4), () => txt('2026', V(1810, W - L), V(86, 430), F.mono(32, 500), g.mid, 'right', 'alphabetic', 2));
    month(t, { t0: 0.9, fills: FILLS.map(f => ({ ...f, label: PORTRAIT ? '' : f.label })) });
    if (PORTRAIT) { // portrait: cells keep only their number; the newest attack reads big under the grid
      let cur = null; FILLS.forEach(f => { if (t >= f.at) cur = f; });
      if (cur) { const p = ez(t, cur.at, 0.3); withA(p, () => _txt(cur.d + ' OCT  ' + cur.label, L, 1416 + 16 * (1 - p), F.disp(76), A.ink, 'left')); }
    }
  }, { id: 'month' });
  cue('thud', k1.oct.w[0], -4); cue('slide', 0.95, -12); cue('marker', k1.aw.w[0], -6); cue('scribble', k1.iro.w[3] - 0.1, -9);
  cue('place', fillT[0], -5); cue('tap', fillT[2], -6); cue('pop', fillT[4], -5);   // 14, 17, 21: three sounds for six dates

  /* ---------- 2. dive into the 21st: PHP (0:08.5 - 0:15) ---------- */
  const k2 = { php: P('HP, which is the language'), lang: P('meant most of the websites in the world'), two: P('has had two critical security roles') };
  const tDive = k2.php.t - 0.6;
  addScene(tDive, 'night', 'php', (t) => {
    const p = io(t, tDive, 0.6);
    if (p < 1) { rect(0, 0, W, H, A.orange); g = G.oct; dive(p, 21, () => month(99, { t0: -10, labelA: 1 - p * 2.5, numFade: [21, 1 - (p - 0.45) * 3], fills: FILLS.map(f => ({ ...f, label: PORTRAIT ? '' : f.label })) })); g = G.night; if (p < 0.98) return; }
    const t1 = tDive + 0.5;
    dayFrame(t, t1, 21);
    dayHead(t, t1 - 0.2, 21, 'WED', L, V(230, 470));
    KT(t, { lines: ['PHP'], x: L - 8, y: V(660, 830), size: V(400, 360), times: [k2.php.t], col: A.bone, blur: 12 });
    wipeLines(t, k2.lang.w[0], ['the language behind', 'most of the web'], L, V(790, 940), F.body(56, 700), G.night.mid, 70, 0.6, 'lang');
    clipCard(t, 'php-head', V(840, L), V(380, 1120), V(970, W - 2 * L), { at: k2.two.w[0], cropX: [0, 1120], creditBelow: true, pad: 24, credit: G.night.mid });
    withA(ez(t, k2.two.w[2], 0.35), () => { const y = V(660, 1370); _txt('CVE-2026-109618', V(840, L), y, F.mono(34, 500), A.orange, 'left'); _txt('CVE-2026-109619', V(1220, L + 400), y, F.mono(34, 500), A.orange, 'left'); });
    withA(ez(t, k2.two.w[3], 0.35), () => txt('two critical holes, one name: PHP2Shell', V(840, L), V(730, 1420), F.mono(34, 500), A.bone, 'left', 'alphabetic', 1));
  }, { id: 'php' });
  cue('zoom', tDive + 0.05, -8); cue('shutter', k2.two.w[0], -7); cue('punch', k2.two.w[2] - 0.05, -4);

  /* ---------- 3. same day: Railway (0:15 - 0:23) ---------- */
  const k3 = { rail: P('Railway, which is also a popular platform'), dev: P('among developers where we deploy'), tell: P('has had to literally tell their users to change their secrets keys') };
  addScene(k3.rail.t - 0.12, 'night', 'railway', (t) => {
    dayFrame(t, -1, 21);
    dayHead(t, -1, 21, 'WED', L, V(230, 470));
    KT(t, { lines: ['Railway'], x: L - 4, y: V(470, 700), size: V(210, 200), times: [k3.rail.t], col: A.bone });
    wipeLines(t, k3.dev.w[1], V(['where developers', 'deploy their apps'], ['where developers deploy their apps']), L, V(560, 790), F.body(50, 700), G.night.mid, 62, 0.6, 'dev');
    wipeLines(t, k3.tell.w[4], V(['told its users to', 'change their secret keys'], ['told users to change', 'their secret keys']), V(1000, L), V(330, 880), F.body(V(60, 54), 700), A.bone, V(76, 68), 0.6, 'tell');
    clipCard(t, 'railway-revoke', L, V(660, 960), V(1700, W - 2 * L), { at: k3.dev.w[3], crop: [40, 175], hlAt: k3.tell.w[9], hl: '#FFC59E', credit: G.night.mid, creditSize: 32 });
  }, { id: 'railway' });
  cue('slide2', k3.rail.t - 0.1, -8); cue('shutter', k3.dev.w[3], -6); cue('marker', k3.tell.w[9], -5);

  /* ---------- 4. before your code even runs (1:48): the request's day, step by step ---------- */
  const k4 = { thing: PA('the thing about PHP two shell', 107.5), bef: P('it happens before your code even runs'), reads: P('so PHP reads the incoming request first'), log: P('so your login your middleware your authentication'), nob: P('nobody stands a chance') };
  addScene(k4.thing.t - 0.1, 'night', 'before', (t) => {
    dayFrame(t, k4.thing.t - 0.1, 21);
    dayHead(t, k4.thing.t, 21, 'WED', L, V(200, 470), { size: V(110, 130), name: 'PHP2Shell' });
    KT(t, { lines: ['before', 'your code', 'even *runs*'], x: L, y: V(410, 680), size: V(150, 150), times: k4.bef.w.slice(2), col: A.bone, acc: A.orange });
    // a day view: each step of the request is an event block; the hole is the first block that matters
    const ev = [['a request comes in', k4.reads.w[3]], ['PHP reads it', k4.reads.w[2]], ['your login', k4.log.w[2]], ['your middleware', k4.log.w[4]], ['your code runs', k4.log.w[6]]];
    const x0 = V(980, L), y0 = V(140, 1020), rh = V(108, 82), rw = V(830, W - 2 * L), gut = 120;
    ev.forEach(([s, at], i) => { const p = ez(t, Math.min(at, k4.bef.w[5] + 0.1 + i * 0.09), 0.4); if (p <= 0) return; const y = y0 + i * rh;
      const hole = i === 1; const ph = hole ? ez(t, k4.reads.w[5], 0.35) : 0; const dead = i >= 2 ? ez(t, k4.nob.w[0] + (i - 2) * 0.12, 0.5) : 0;
      withA(p, () => { _txt(['FIRST', 'THEN', 'THEN', 'THEN', 'LAST'][i], x0, y + rh / 2 + 12, F.mono(32, 500), G.night.mid, 'left');
        const bx = x0 + gut, bw = rw - gut; fillRR(bx, y + 6, bw, rh - 12, 8, '#2A221B'); if (ph > 0) fillRR(bx, y + 6, bw * ph, rh - 12, 8, A.orange);
        withA(1 - dead * 0.6, () => txt(s, bx + 28, y + rh / 2 + 16, F.body(V(46, 42), 700), ph > 0.5 ? A.ink : A.bone, 'left'));
        if (dead > 0) strikeBar(bx + 28, y + rh / 2 + 1, tw(s, F.body(V(46, 42), 700)), dead, A.orange, 6);
        if (hole && ph > 0.6) _txt('THE HOLE', bx + bw - 24, y + rh / 2 + 12, F.mono(32, 600), A.ink, 'right'); }); });
    clipCard(t, 'php-quote', L, V(720, 1500), V(1700, W - 2 * L), { at: k4.reads.w[0], crop: [124, 215], hlAt: k4.reads.w[5], hl: '#FFC59E', credit: G.night.mid, creditSize: 32 });
  }, { id: 'before' });
  cue('thud', k4.bef.w[5], -6); cue('shutter', k4.reads.w[0], -8); cue('marker', k4.reads.w[5], -6);

  /* ---------- 5. the fix (2:24): the day's to-do ---------- */
  const k5 = { upd: PA('you have to update your PHP', 146.4), old: P('if you\'re still on PHP 8.1 or older'), rest: P('you have to restart'), dock: P('if you use Docker you have to rebuild your images') };
  addScene(k5.upd.t - 0.15, 'bone', 'fix', (t) => {
    dayFrame(t, k5.upd.t - 0.15, 21);
    dayHead(t, k5.upd.t - 0.15, 21, 'WED', L, V(200, 470), { size: V(110, 130), name: 'to do today' });
    KT(t, { lines: V(['Update your PHP'], ['Update', 'your PHP']), x: L, y: V(360, 680), size: V(130, 150), times: k5.upd.w.slice(3), col: A.ink });
    const cx = L, cy = V(420, 720), cw = V(1000, W - 2 * L), chh = V(400, 330);
    grp('code card', cx, cy, cw, chh, () => { withA(ez(t, k5.upd.w[3], 0.4), () => {
      fillRR(cx, cy, cw, chh, 18, A.ink);
      _txt('# fixed versions', cx + 50, cy + 80, F.mono(34, 500), '#9C9182', 'left');
      ['8.5.12', '8.4.27', '8.3.36', '8.2.35'].forEach((v, i) => { const at = k5.upd.w[4] + i * 0.12; withA(ez(t, at, 0.3), () => {
        const vx = PORTRAIT ? cx + 50 + (i % 2) * 450 : cx + 50 + i * 235, vy = PORTRAIT ? cy + 170 + Math.floor(i / 2) * 76 : cy + 190;
        _txt(v, vx, vy, F.mono(V(52, 56), 600), A.orange, 'left'); }); });
      _txt('php -v', cx + 50, cy + V(310, 306), F.mono(40, 500), A.bone, 'left');
      if (!PORTRAIT) _txt('# check what you’re running', cx + 260, cy + 310, F.mono(34, 400), '#9C9182', 'left');
    }); });
    const todo = [['On 8.1 or older? Upgrade', k5.old.w[5]], ['Restart PHP-FPM or Apache', k5.rest.w[3]], ['Rebuild your Docker images', k5.dock.w[7]]];
    const tx = V(1170, L), ty = V(470, 1100), th = V(120, 100);
    todo.forEach(([s, at], i) => { const p = ez(t, at - 0.3, 0.4); if (p <= 0) return; const y = ty + i * th;
      withA(p, () => { strokeR(tx, y, 56, 56, A.ink, 4); const pk = ez(t, at, 0.3); if (pk > 0) rect(tx + 10, y + 10, 36 * pk, 36, A.orange);
        txt(s, tx + 84, y + 42, F.body(V(40, 44), 700), A.ink, 'left'); }); });
  }, { id: 'fix' });
  cue('type', k5.upd.w[4], -10); cue('check', k5.old.w[5], -5); cue('check2', k5.rest.w[3], -5); cue('check', k5.dock.w[7], -5);

  /* ---------- 6. Railway: the .env (3:04) ---------- */
  const k6 = { acc: PA('someone may have accessed their customers\' encrypted environment variables', 185), safe: P('how important it is to keep your environment variables safe'), rev: PA('to revoke and change their API', 198) };
  addScene(k6.acc.t - 0.2, 'bone', 'env', (t) => {
    dayFrame(t, k6.acc.t - 0.2, 21);
    dayHead(t, k6.acc.t - 0.2, 21, 'WED', L, V(200, 470), { size: V(110, 130), name: 'Railway' });
    const ex = L, ey = V(260, 540), ew = V(920, W - 2 * L), eh = V(300, 300);
    grp('env card', ex, ey, ew, eh, () => withA(ez(t, k6.acc.w[0] + 0.1, 0.4), () => { fillRR(ex, ey, ew, eh, 18, A.ink);
      _txt('# .env', ex + 44, ey + 70, F.mono(34, 500), '#9C9182', 'left');
      [['DB_PASSWORD=', '••••••••'], ['OPENAI_API_KEY=', 'sk-•••••'], ['AWS_SECRET_KEY=', '••••••••']].forEach(([k, v], i) => { const at = k6.acc.w[4] + i * 0.25; const y = ey + 150 + i * 60; withA(ez(t, at, 0.3), () => {
        const fs = V(38, 34); _txt(k, ex + 44, y, F.mono(fs, 500), A.bone, 'left'); const kx = ex + 44 + tw(k, F.mono(fs, 500));
        _txt(v, kx, y, F.mono(fs, 500), A.orange, 'left');
        const ps = ez(t, k6.rev.w[3] + i * 0.15, 0.4); if (ps > 0) strikeBar(ex + 44, y - fs * 0.32, tw(k + v, F.mono(fs, 500)), ps, A.bone, 5); }); });
    }));
    KT(t, { lines: V(['revoke and', '*change*', '*their keys*'], ['revoke and *change their keys*']), x: V(1110, L), y: V(360, 900), size: V(110, 70), col: A.ink, acc: A.orange, times: TM({ t: k6.rev.w[1], w: k6.rev.w.slice(1) }, 5) });
    clipCard(t, 'railway-text', L, V(610, 1000), V(1420, W - 2 * L), { at: k6.acc.w[3], crop: [70, 250], hlAt: k6.acc.w[6], hl: '#FFC59E', creditSize: 32 });
  }, { id: 'env' });
  cue('type', k6.acc.w[4], -9); cue('shutter', k6.acc.w[3], -6); cue('marker', k6.acc.w[6], -6); cue('thud', k6.rev.w[3], -7);

  /* ---------- 7. Zeabur: a token with no expiry (4:00) ---------- */
  const k7 = { how: PA('so how did the attackers get in', 239.9), tok: P('their admin token had no expiry date'), since: P('since January 2024'), chg: P('when they changed their keys'), inc: P('they didn\'t include that particular set of tokens') };
  addScene(k7.how.t - 0.1, 'night', 'zeabur', (t) => {
    dayFrame(t, k7.how.t - 0.1, 14);
    dayHead(t, k7.how.t, 14, 'WED', L, V(200, 470), { size: V(110, 130), name: 'Zeabur' });
    KT(t, { lines: V(['admin token: *no expiry*'], ['admin token:', '*no expiry*']), x: L, y: V(350, 640), size: V(130, 130), times: [k7.tok.w[1], k7.tok.w[2], k7.tok.w[4], k7.tok.w[5]], col: A.bone, acc: A.orange });
    // 34 months as tiles, a token bar from Jan 2024 that never ends
    const cols = V(12, 6), gap = 10, x0 = L, tw_ = (V(1700, W - 2 * L) - (cols - 1) * gap) / cols, th = V(96, 86), y0 = V(470, 790), yearGap = V(26, 22);
    const MON = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
    const pos = (i) => { const yr = Math.floor(i / 12), m = i % 12; const rowsPerYear = 12 / cols; const r = yr * rowsPerYear + Math.floor(m / cols);
      return [x0 + (m % cols) * (tw_ + gap), y0 + r * (th + gap) + yr * yearGap]; };
    const pBar = ez(t, k7.since.w[1], 1.6, 'inOutQuart'); const N = 34;
    for (let i = 0; i < 36; i++) { const [x, y] = pos(i); const pin = ez(t, k7.how.t + 0.3 + i * 0.02, 0.4); if (pin <= 0) continue;
      const aug = i === 31, oct = i === 33; const pa = aug ? ez(t, k7.chg.w[2], 0.35) : 0, po = oct ? ez(t, k7.inc.w[3], 0.35) : 0;
      withA(pin * (i > 33 ? 0.35 : 1), () => { rect(x, y, tw_, th, '#2A221B'); if (pa > 0) rect(x, y, tw_, th * pa, A.bone); if (po > 0) rect(x, y, tw_, th * po, A.orange);
        _txt(MON[i % 12], x + 14, y + 40, F.mono(32, 500), pa > 0.5 || po > 0.5 ? A.ink : '#9C9182', 'left');
        if (i % 12 === 0) _txt(String(2024 + i / 12), x + 14, y + th - 14, F.mono(32, 500), A.bone, 'left'); });
      const last = i % cols === cols - 1; const f = clamp(pBar * N - i); if (i < N && f > 0) rect(x, y + th - 10, tw_ * f + (f >= 1 && !last ? gap : 0), 10, A.orange);
    }
    if (pBar >= 1) { const [x, y] = pos(33); withA(ez(t, k7.since.w[1] + 1.6, 0.4), () => _mono('and on, no end date', V(1810, W - L), y + th + 56, 32, A.orange, 'right', {})); }
  }, { id: 'zeabur' });
  cue('tick', k7.how.t + 0.3, -12); cue('thud', k7.tok.w[4], -5); cue('riser', k7.since.w[1] - 0.1, -10); cue('pop', k7.chg.w[2], -6); cue('punch', k7.inc.w[3], -4);

  /* ---------- 7b. Zeabur: the real coverage (4:16) ---------- */
  const k7b = { open: PA('they didn\'t change those set and that kind of opened the gates again', 256.5) };
  addScene(k7b.open.t - 0.1, 'bone', 'zeabur-src', (t) => {
    dayFrame(t, k7b.open.t - 0.1, 14);
    dayHead(t, k7b.open.t, 14, 'WED', L, V(200, 470), { size: V(110, 130), name: 'Zeabur' });
    if (!PORTRAIT) clipCard(t, 'zeabur-head', L, 270, 1100, { at: k7b.open.t, creditBelow: false, pad: 22 });
    clipCard(t, 'zeabur-quote', L, V(420, 600), V(1700, W - 2 * L), { at: k7b.open.w[2], crop: [140, 258], cropX: V(null, [20, 700]), hlAt: k7b.open.w[5], hl: '#FFC59E', creditSize: 32 });
    KT(t, { lines: V(['that opened the gates *again*'], ['that opened', 'the gates', '*again*']), x: L, y: V(880, 1080), size: V(120, 130), times: k7b.open.w.slice(6), col: A.ink, acc: A.orange });
  }, { id: 'zeabur-src' });
  cue('shutter', k7b.open.t, -6); cue('marker', k7b.open.w[5], -5);

  /* ---------- 8. eMudhra: the number 4 (6:17) ---------- */
  const k8 = { eight: PA('eight of the assignee keys were so weak', 378.6), weak: P('the keys were so weak'), num: PA('literally was the number four', 384.6) };
  addScene(k8.eight.t - 0.6, 'bone', 'four', (t) => {
    dayFrame(t, k8.eight.t - 0.6, 17);
    dayHead(t, k8.eight.t - 0.5, 17, 'SAT', L, V(200, 470), { size: V(110, 130), name: 'eMudhra' });
    KT(t, { lines: V(['one signing', 'key was', 'the number'], ['one signing key', 'was the number']), x: L, y: V(360, 640), size: V(118, 104), times: [k8.eight.w[0], k8.eight.w[5], k8.num.w[0], k8.num.w[1], k8.num.w[2], k8.num.w[3]], col: A.ink });
    // a day cell with a 4 in it: the whole key
    const cx = V(1240, 600), cy = V(130, 640), cw = V(560, 400), ch = V(560, 500);
    const p4 = ez(t, k8.num.w[4] - 0.06, 0.32, 'outExpo');
    grp('the 4', cx, cy, cw, ch, () => { withA(ez(t, k8.eight.t, 0.4), () => { strokeR(cx, cy, cw, ch, A.ink, 4); _mono('the key', cx + 24, cy + 56, 32, '#4A4038', 'left', {}); });
      if (p4 > 0) { rect(cx + 4, cy + 4, cw - 8, (ch - 8) * p4, A.orange); withA(p4, () => _txt('4', cx + cw / 2, cy + ch * 0.88, F.disp(V(480, 420)), A.ink, 'center')); } });
    clipCard(t, 'emudhra-quote', L, V(740, 1180), V(1700, W - 2 * L), { at: k8.weak.t, crop: [52, 88], cropX: V(null, [360, 1080]), hlAt: k8.weak.w[3], hl: '#FFC59E', creditSize: 32 });
  }, { id: 'four' });
  cue('shutter', k8.weak.t, -7); cue('marker', k8.weak.w[3], -6); cue('thud', k8.num.w[4] - 0.06, -2);
}
