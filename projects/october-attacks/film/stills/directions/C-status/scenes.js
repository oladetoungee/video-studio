/* C · THE STATUS PAGE: scenes on her real lines (times = voice.m4a seconds, whisper word times). */
'use strict';
function buildFilm() {
  /* ---------- 1. the internet's status page for October (0:00 - 0:09) ---------- */
  const k1 = { oct: PA('October is supposed to be', 2.5), aw: P('cybersecurity awareness month'), one: P('one attack after the other') };
  const ROWS = [['PHP', [21]], ['Node.js', [21]], ['Railway', [21]], ['Zeabur', [14, 15]], ['OpenCode', [19]], ['eMudhra', [17]]];
  // the month turns red in date order across the rows, on "one attack after the other"
  const order = []; ROWS.forEach(([n, ds], r) => ds.forEach(d => order.push([d, r]))); order.sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const t0r = k1.one.w[0], t1r = k1.one.w[3] + 0.35; const redAt = {}; order.forEach(([d, r], i) => { redAt[r + ':' + d] = lerp(t0r, t1r, i / (order.length - 1)); });
  const tBad = k1.one.w[3] + 0.1;
  addScene(0, 'page', 'status', (t) => {
    const hy = V(130, 440);
    txt('Internet status', L, hy, F.disp(V(64, 72)), S_.ink, 'left');
    withA(ez(t, k1.oct.w[0], 0.4), () => txt('October 2026', V(1810, W - L), hy, F.mono(V(36, 36), 600), S_.mid, 'right', 'alphabetic', 1));
    // the banner: all good -> major outage
    const by = V(170, 460), bh = V(92, 100), bad = ez(t, tBad, 0.3);
    grp('banner', L, by, W - 2 * L, bh, () => { fillRR(L, by, W - 2 * L, bh, 12, S_.green); if (bad > 0) { ctx.save(); rr(L, by, W - 2 * L, bh, 12); ctx.clip(); rect(L, by, (W - 2 * L) * bad, bh, S_.red); ctx.restore(); }
      txt(bad > 0.5 ? 'Major outage' : 'All systems operational', L + 36, by + bh / 2 + 14, F.body(V(40, 42), 800), '#FFFFFF', 'left', 'alphabetic', 0, 'banner text'); });
    // the scheduled notice
    const pn = ez(t, k1.aw.w[0], 0.45); const ny = V(300, 600);
    if (pn > 0) withA(pn, () => { ctx.save(); ctx.translate(0, 16 * (1 - pn)); card(L, ny, W - 2 * L, V(76, 120));
      _txt('SCHEDULED', L + 30, ny + V(50, 48), F.mono(32, 600), S_.mid, 'left');
      txt('Cybersecurity Awareness Month, 1 to 31 October', V(L + 250, L + 30), ny + V(50, 96), F.body(V(36, 34), 600), S_.ink, 'left'); ctx.restore(); });
    ROWS.forEach(([name, ds], r) => {
      const y = PORTRAIT ? 740 + r * 112 : 392 + r * 100; const pin = ez(t, 0.3 + r * 0.08, 0.4); if (pin <= 0) return;
      const red = {}; ds.forEach(d => { red[d] = redAt[r + ':' + d]; }); const isBad = t >= Math.min(...ds.map(d => red[d]));
      withA(pin, () => {
        hline(L, y + V(96, 104), W - 2 * L, 1, S_.line, 2);
        txt(name, L, y + V(48, 44), F.body(V(40, 40), 700), S_.ink, 'left');
        statusWord(isBad ? 'outage' : 'operational', PORTRAIT ? W - L : L, y + V(86, 44), isBad ? S_.red : S_.green, 30, PORTRAIT ? 'right' : 'left');
        uptime(t, V(560, L), y + V(14, 58), V(1250, W - 2 * L), V(66, 34), { t0: 0.4 + r * 0.08, red });
      });
    });
    withA(ez(t, 1.2, 0.4), () => { const y = PORTRAIT ? 740 + 6 * 112 + 22 : 1030; _txt('1 OCT', V(560, L), y, F.mono(30, 500), S_.mid, 'left'); _txt('TODAY', V(560 + 1250 * 25.7 / 31, L + 920 * 25.7 / 31), y, F.mono(30, 500), S_.mid, 'center'); _txt('31', W - L, y, F.mono(30, 500), S_.mid, 'right'); });
  }, { id: 'status' });
  cue('notify', k1.aw.w[0], -8); order.forEach(([d, r], i) => { if (i % 2 === 0) cue(i % 4 ? 'tick2' : 'tick', redAt[r + ':' + d], -7); }); cue('alarm', tBad, -6);

  /* ---------- 4. before your code even runs (1:48) ---------- */
  const k4 = { thing: PA('the thing about PHP two shell', 107.5), bef: P('it happens before your code even runs'), reads: P('so PHP reads the incoming request first'), log: P('so your login your middleware your authentication'), nob: P('nobody stands a chance') };
  addScene(k4.thing.t - 0.1, 'page', 'before', (t) => {
    withA(ez(t, k4.thing.t, 0.4), () => { statusWord('identified', L, V(130, 420), S_.red, 32); txt('PHP2Shell', L + V(330, 340), V(130, 420), F.body(V(40, 40), 800), S_.ink, 'left'); });
    KT(t, { lines: ['before', 'your code', 'even *runs*'], x: L, y: V(330, 580), size: V(150, 120), times: k4.bef.w.slice(2), col: S_.ink, acc: S_.red });
    withA(ez(t, k4.log.w[1], 0.4), () => txtW('Your login, your middleware, your authentication: nobody stands a chance.', L, V(760, 1250), F.body(V(50, 46), 600), S_.mid, V(860, W - 2 * L), V(64, 60)));
    // the chain a request walks through: the hole is in the first step
    const rows = [['Request comes in', 'received'], ['PHP reads it', 'the hole'], ['Your login', 'never reached'], ['Your middleware', 'never reached'], ['Your code', 'never reached']];
    const x0 = V(1080, L), y0 = V(230, 720 - 9999), rw = V(730, W - 2 * L), rh = V(150, 0);
    if (!PORTRAIT) rows.forEach(([s, st], i) => { const at = k4.bef.w[6] + 0.15 + i * 0.12; const p = ez(t, at, 0.4); if (p <= 0) return; const y = y0 + i * rh;
      const hole = i === 1, dead = i >= 2 ? ez(t, i === 2 ? k4.log.w[1] : i === 3 ? k4.log.w[3] : k4.log.w[5], 0.35) : 0, ph = hole ? ez(t, k4.reads.w[2], 0.3) : 0;
      withA(p, () => { card(x0, y, rw, rh - 24, ph > 0.5 ? S_.pale : S_.card); 
        txt(s, x0 + 36, y + 58, F.body(42, 700), S_.ink, 'left'); if (i < 4) rect(x0 + 60, y + rh - 24, 3, 24, S_.line);
        if (i === 0 || ph > 0.5 || dead > 0.5) statusWord(st, x0 + rw - 30, y + 100, hole ? S_.red : i === 0 ? S_.green : S_.mid, 30, 'right'); }); });
  }, { id: 'before' });
  cue('thud', k4.bef.w[5], -6); cue('alarm', k4.reads.w[2], -8);

  /* ---------- 5. the fix: an update with the fixed versions (2:24) ---------- */
  const k5 = { upd: PA('you have to update your PHP', 146.4), old: P('if you\'re still on PHP 8.1 or older'), rest: P('you have to restart'), dock: P('if you use Docker you have to rebuild your images') };
  addScene(k5.upd.t - 0.15, 'page', 'fix', (t) => {
    withA(ez(t, k5.upd.t, 0.4), () => { statusWord('fix released', L, V(130, 420), S_.green, 32); txt('PHP2Shell', L + V(380, 390), V(130, 420), F.body(40, 800), S_.ink, 'left'); });
    KT(t, { lines: V(['update your PHP'], ['update', 'your PHP']), x: L, y: V(290, 580), size: V(118, 120), times: k5.upd.w.slice(3), col: S_.ink });
    const cx = L, cy = V(360, 700), cw = V(1000, W - 2 * L), chh = V(420, 340);
    grp('code', cx, cy, cw, chh, () => withA(ez(t, k5.upd.w[3], 0.4), () => { fillRR(cx, cy, cw, chh, 14, S_.code);
      _txt('# fixed versions', cx + 48, cy + 78, F.mono(34, 500), S_.codeMid, 'left');
      ['8.5.12', '8.4.27', '8.3.36', '8.2.35'].forEach((v, i) => withA(ez(t, k5.upd.w[4] + i * 0.12, 0.3), () => {
        const vx = PORTRAIT ? cx + 48 + (i % 2) * 450 : cx + 48 + i * 236, vy = PORTRAIT ? cy + 160 + Math.floor(i / 2) * 70 : cy + 190; _txt(v, vx, vy, F.mono(V(54, 56), 600), '#7FE0A8', 'left'); }));
      _txt('php -v', cx + 48, cy + V(320, 310), F.mono(40, 600), '#F1F2F4', 'left'); if (!PORTRAIT) _txt('# check what you’re running', cx + 250, cy + 320, F.mono(34, 500), S_.codeMid, 'left'); }));
    const todo = [['On 8.1 or older? Upgrade', k5.old.w[5]], ['Restart PHP-FPM or Apache', k5.rest.w[3]], ['Rebuild your Docker images', k5.dock.w[7]]];
    const tx = V(1150, L), ty = V(380, 1090), th = V(130, 110);
    todo.forEach(([s, at], i) => { const p = ez(t, at - 0.3, 0.4); if (p <= 0) return; const y = ty + i * th;
      withA(p, () => { card(tx, y, V(660, W - 2 * L), th - 20); const pk = ez(t, at, 0.3); strokeRR(tx + 26, y + 30, 50, 50, 8, S_.ink, 3); if (pk > 0) fillRR(tx + 34, y + 38, 34 * pk, 34, 5, S_.green);
        txt(s, tx + 100, y + 70, F.body(V(37, 40), 700), S_.ink, 'left'); }); });
  }, { id: 'fix' });
  cue('type', k5.upd.w[4], -10); cue('check', k5.old.w[5], -5); cue('check2', k5.rest.w[3], -5); cue('check', k5.dock.w[7], -5);

  /* ---------- 6. Railway: the incident post (3:04) — the motion test ---------- */
  const k6 = { acc: PA('so basically railway says someone may have accessed their customers\' encrypted environment variables', 184), safe: P('how important it is to keep your environment variables safe'), pause: P('so railway post deployment for a while'), me: P('this even affected me'), rev: P('asked their users to revoke and change their API keys and cloud keys') };
  const t6 = k6.acc.t - 0.9;
  addScene(t6, 'page', 'env', (t) => {
    const hy = V(150, 420);
    withA(ez(t, t6, 0.4), () => { txt('Railway', L, hy, F.disp(V(96, 96)), S_.ink, 'left'); });
    withA(ez(t, k6.acc.w[3], 0.3), () => statusWord('major incident', L, hy + V(62, 62), S_.red, 32));
    uptime(t, V(560, L), V(78, 230), V(1250, W - 2 * L), V(66, 40), { t0: t6 + 0.1, red: { 21: k6.acc.w[7] } });
    // the timeline: her three lines as updates
    const ups = [['investigating', 'Someone may have accessed encrypted environment variables', k6.acc.w[4]], ['deploys paused', 'Deployments paused for a while', k6.pause.w[2]], ['action needed', 'Revoke and change your API keys and cloud keys', k6.rev.w[4]]];
    const tx = L, ty = V(300, 540), tw0 = V(900, W - 2 * L), uh = V(240, 190);
    ups.forEach(([st, s, at], i) => { const p = ez(t, at - 0.15, 0.45); if (p <= 0) return; const y = ty + i * uh;
      withA(p, () => { ctx.save(); ctx.translate(0, 24 * (1 - p)); circle(tx + 12, y + 30, 12, i === 2 ? S_.red : S_.ink); if (i < 2) rect(tx + 10, y + 50, 4, uh - 40, S_.line);
        statusWord(st, tx + 50, y + 42, i === 2 ? S_.red : S_.ink, 32); txtW(s, tx + 50, y + 104, F.body(V(44, 42), 600), S_.ink, tw0 - 60, 54); ctx.restore(); }); });
    // the .env and the coverage
    const ex = V(1080, L), ey = V(300, 1110), ew = V(730, W - 2 * L), eh = V(300, 0);
    if (!PORTRAIT) grp('env', ex, ey, ew, eh, () => withA(ez(t, k6.acc.w[8], 0.4), () => { fillRR(ex, ey, ew, eh, 14, S_.code); _txt('# .env', ex + 40, ey + 66, F.mono(34, 500), S_.codeMid, 'left');
      [['DB_PASSWORD=', '••••••••'], ['OPENAI_API_KEY=', 'sk-•••••'], ['AWS_SECRET_KEY=', '••••••••']].forEach(([k, v], i) => { const y = ey + 140 + i * 56; withA(ez(t, k6.acc.w[9] + i * 0.2, 0.3), () => {
        _txt(k, ex + 40, y, F.mono(34, 500), '#F1F2F4', 'left'); const kx = ex + 40 + tw(k, F.mono(34, 500)); const rv = ez(t, k6.rev.w[6] + i * 0.18, 0.3);
        _txt(rv > 0.5 ? 'REVOKED' : v, kx, y, F.mono(34, 600), rv > 0.5 ? S_.red : '#7FE0A8', 'left'); }); }); }));
    const cc = clipCard(t, 'railway-head', V(1080, L), V(660, 1120), V(730, W - 2 * L), { at: k6.acc.w[12] + 0.8, hlAt: k6.rev.w[4], hl: '#FFE14D', hlMode: 'underline', credit: S_.mid, creditSize: 32 });
    if (cc.h > 0 && !PORTRAIT) withA(ez(t, k6.acc.w[12] + 0.8, 0.4), () => _txt('COVERAGE', V(1080, L), V(648, 1110), F.mono(30, 600), S_.mid, 'left'));
    withA(ez(t, k6.me.w[1], 0.3) * (1 - ez(t, k6.rev.w[0], 0.3)), () => { const x = L + 50, y = ty + uh + 165; _txt('(this one affected me too)', x, y, F.mono(34, 600), S_.ink, 'left'); });
  }, { id: 'env' });
  cue('notify', k6.acc.w[4] - 0.15, -8); cue('alarm', k6.acc.w[7], -9); cue('tick', t6 + 0.2, -10); cue('type', k6.acc.w[9], -12); cue('shutter', k6.acc.w[12] + 0.8, -6); cue('pop', k6.pause.w[2] - 0.15, -6); cue('notify2', k6.rev.w[4] - 0.15, -6); cue('glitch', k6.rev.w[6], -10);

  /* ---------- 7. Zeabur: the token table (4:00) ---------- */
  const k7 = { how: PA('so how did the attackers get in', 239.9), tok: P('their admin token had no expiry date'), since: P('since January 2024'), chg: P('when they changed their keys'), inc: P('they didn\'t include that particular set of tokens') };
  addScene(k7.how.t - 0.1, 'page', 'zeabur', (t) => {
    withA(ez(t, k7.how.t, 0.4), () => { txt('Zeabur', L, V(150, 420), F.disp(96), S_.ink, 'left'); statusWord('shutting down', L + V(400, 420), V(120, 390), S_.red, 32); });
    KT(t, { lines: V(['admin token: *no expiry*'], ['admin token:', '*no expiry*']), font: 'body', weight: 800, x: L, y: V(300, 560), size: V(84, 88), times: [k7.tok.w[1], k7.tok.w[2], k7.tok.w[4], k7.tok.w[5]], col: S_.ink, acc: S_.red });
    const cols = PORTRAIT ? [['TOKEN', 0], ['CREATED', 420], ['EXPIRES', 700]] : [['TOKEN', 0], ['CREATED', 560], ['EXPIRES', 900], ['ROTATED AFTER AUGUST', 1180]];
    const tx = L, ty = V(400, 720), tw_ = W - 2 * L, rh = V(104, 110);
    const rows = [['AWS keys', '', '', 'yes'], ['GCP key', '', '', 'yes'], ['secrets service key', '', '', 'yes'], ['admin token', 'Jan 2024', 'never', 'no']];   // only what Zeabur published (via BleepingComputer); no invented dates
    withA(ez(t, k7.how.t + 0.3, 0.4), () => { card(tx, ty, tw_, rh * 5); cols.forEach(([c, x]) => _txt(c, tx + 36 + x, ty + 64, F.mono(30, 600), S_.mid, 'left')); });
    rows.forEach((r, i) => { const admin = i === 3; const at = admin ? k7.tok.w[1] : k7.how.t + 0.5 + i * 0.15; const p = ez(t, at, 0.35); if (p <= 0) return; const y = ty + rh * (i + 1);
      const hot = admin ? ez(t, k7.inc.w[3], 0.3) : 0;
      withA(p, () => { if (hot > 0) rect(tx + 2, y + 1, (tw_ - 4) * hot, rh - 4, S_.pale); hline(tx, y, tw_, 1, S_.line, 2);
        r.forEach((v, c) => { if (c >= cols.length) return; let s = v, col = S_.ink;
          if (admin && c === 1 && t < k7.since.w[1]) s = '...'; if (admin && c === 2) { col = S_.red; if (t < k7.tok.w[4]) s = '...'; }
          if (c === 3) { col = admin ? S_.red : S_.green; if (t < (admin ? k7.inc.w[1] : k7.chg.w[2] + i * 0.12)) s = ''; }
          _txt(s, tx + 36 + cols[c][1], y + rh / 2 + 14, c === 0 ? F.body(40, admin ? 800 : 600) : F.mono(36, 600), col, 'left'); }); }); });
  }, { id: 'zeabur' });
  cue('pop', k7.tok.w[1], -6); cue('thud', k7.tok.w[4], -5); cue('type', k7.since.w[1], -9); cue('check', k7.chg.w[2], -7); cue('alarm', k7.inc.w[3], -6);

  /* ---------- 7b. Zeabur: the real coverage (4:16) ---------- */
  const k7b = { open: PA('they didn\'t change those set and that kind of opened the gates again', 256.5) };
  addScene(k7b.open.t - 0.1, 'page', 'zeabur-src', (t) => {
    withA(ez(t, k7b.open.t, 0.4), () => { _txt('COVERAGE', L, V(140, 470), F.mono(32, 600), S_.mid, 'left'); txt('Zeabur', L, V(230, 560), F.disp(V(84, 96)), S_.ink, 'left'); });
    clipCard(t, 'zeabur-head', L, V(290, 620), V(1300, W - 2 * L), { at: k7b.open.t, creditBelow: false, pad: 22 });
    clipCard(t, 'zeabur-quote', L, V(450, 780), V(1500, W - 2 * L), { at: k7b.open.w[2], crop: [140, 258], hlAt: k7b.open.w[5], hl: '#FFC2C2', credit: S_.mid, creditSize: 32 });
    KT(t, { lines: V(['that opened the gates *again*'], ['that opened', 'the gates *again*']), x: L, y: V(900, 1200), size: V(100, 110), times: k7b.open.w.slice(6), col: S_.ink, acc: S_.red });
  }, { id: 'zeabur-src' });
  cue('shutter', k7b.open.t, -6); cue('marker', k7b.open.w[5], -6);

  /* ---------- 8. eMudhra: the certificate viewer (6:17) ---------- */
  const k8 = { eight: PA('eight of the assignee keys were so weak', 378.6), num: PA('literally was the number four', 384.6) };
  addScene(k8.eight.t - 0.6, 'page', 'four', (t) => {
    grp('address bar', L, V(100, 380), V(800, W - 2 * L), 76, () => withA(ez(t, k8.eight.t - 0.5, 0.4), () => addressBar(L, V(100, 380), V(800, W - 2 * L), 76, 'any-website.com', { bar: S_.card, ink: S_.ink, line: S_.line })));
    const cx = L, cy = V(230, 520), cw = V(1000, W - 2 * L), ch = V(720, 560);
    withA(ez(t, k8.eight.t - 0.3, 0.4), () => { card(cx, cy, cw, ch); _txt('Certificate', cx + 40, cy + 84, F.body(48, 800), S_.ink, 'left');
      [['Issued by', 'eMudhra'], ['Trusted by', 'your browser'], ['Signing keys', '8 weak ones']].forEach(([a, b], i) => { const y = cy + 180 + i * 84; hline(cx + 40, y - 56, cw - 80, 1, S_.line, 2);
        _txt(a.toUpperCase(), cx + 40, y, F.mono(32, 600), S_.mid, 'left'); _txt(b, cx + V(400, 360), y, F.body(40, 600), i === 2 ? S_.red : S_.ink, 'left'); }); });
    const p4 = ez(t, k8.num.w[4] - 0.06, 0.32, 'outExpo');
    withA(ez(t, k8.num.w[0], 0.3), () => { const y = cy + V(500, 450); hline(cx + 40, y - 70, cw - 80, 1, S_.line, 2); _txt('ONE KEY', cx + 40, y, F.mono(32, 600), S_.mid, 'left'); });
    if (p4 > 0) withA(p4, () => _txt('4', V(cx + 400, cx + 360), cy + V(690, 540), F.disp(V(290, 220) * (1.25 - 0.25 * p4)), S_.red, 'left'));
    KT(t, { lines: V(['so weak', 'one was', 'literally', 'the number'], ['one key was literally the number']), x: V(1200, L), y: V(320, 1260), size: V(86, 64), times: [k8.eight.w[6], k8.eight.w[7], k8.num.w[0], k8.num.w[1], k8.num.w[2], k8.num.w[3], k8.num.w[3] + 0.1], col: S_.ink, maxW: V(null, W - 2 * L) });
  }, { id: 'four' });
  cue('pop', k8.eight.t - 0.5, -8); cue('thud', k8.num.w[4] - 0.06, -2);
}
