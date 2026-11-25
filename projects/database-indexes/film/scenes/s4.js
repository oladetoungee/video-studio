/* database-indexes film, part 4: the cost, chapter 05 (two mistakes + the foreign key gotcha), when to add one, the end. */
'use strict';

function buildS4() {
  /* ---------------- why not index every column? ---------------- */
  const COLS = ['id', 'user_id', 'status', 'total', 'note', 'coupon', 'created_at'];
  {
    const k = PS({ a: 'So now that begs the question', b: 'if database indexes makes queries so fast', c: "why don't we just index every column", d: 'and be done with it' });
    addQ(S(k.a, 0.12), 'why-not', (t) => {
      hd(t, { lines: V(['Why not index every column?'], ['Why not index', 'every column?']), x: L, y: V(260, 520), size: V(96, 96), times: pick(k.c, [0, 1, 4, 5, 6]) });
      const y = V(520, 860), cw = V(240, 300);
      withA(eo(t, k.a.t, 0.4), () => _txt('orders', L, y - 40, FM(32, 600), QP.ink));
      COLS.forEach((c, i) => {
        const x = V(L + i * cw, L + (i % 3) * cw), yy = V(y, y + Math.floor(i / 3) * 170);
        const p = eo(t, k.a.t + i * 0.05, 0.4); boxD(x, yy, cw - 16, 110, p, QP.line, 2); withA(p, () => _txt(c, x + 18, yy + 66, FM(V(30, 30)), QP.ink));
        const tp = eq(t, k.c.w[6] + i * 0.09, 0.3); if (tp > 0) withA(tp, () => { boxD(x + 18, yy + 120, 100, 40, tp, QP.ink, 2); _txt('index', x + 30, yy + 148, FM(24, 600), QP.ink); });
      });
      labA(t, k.d.t, 'and be done with it?', L, V(860, 1420), 32, QP.dim, { key: 'whynot done' });
    });
    COLS.forEach((c, i) => i % 2 === 0 && sPop(k.c.w[6] + i * 0.09, -4));
  }

  /* ---------------- we cannot: every index has a cost ---------------- */
  {
    const k = PS({ a: 'We cannot', b: 'because every index has a cost', c: 'Every time you insert, update and delete a row', d: 'the database also has to update every index on that table' });
    addQ(S(k.a, 0.06), 'cannot', (t) => {
      hd(t, { lines: ['We cannot.'], x: L, y: V(300, 600), size: V(150, 150), times: [k.a.w[0], k.a.w[1]] });
      hd(t, { lines: ['Every index has a cost.'], x: L, y: V(420, 740), size: V(64, 60), times: pick(k.b, [1, 2, 3, 4, 5]), col: QP.dim });
      const verbs = [['INSERT', k.c.w[3]], ['UPDATE', k.c.w[4]], ['DELETE', k.c.w[6]]];
      verbs.forEach(([v, tt], i) => { const a = eq(t, tt, 0.35); if (a <= 0) return; const x = V(L + i * 300, L), y = V(620, 900 + i * 90); withA(a, () => _txt(v, x, y, FM(V(44, 44), 600), QP.ink)); });
      // every index on the table updates
      const ip = eo(t, k.d.w[6], 0.4);
      if (ip > 0) {
        const x0 = V(L, L), y0 = V(760, 1220);
        for (let i = 0; i < 6; i++) { const x = x0 + i * V(150, 150); const p = eo(t, k.d.w[6] + i * 0.08, 0.4); boxD(x, y0, 120, 90, p, QP.line, 2); withA(p, () => _txt('idx ' + (i + 1), x + 16, y0 + 56, FM(26), QP.dim)); themeFixed(() => withA(eo(t, k.d.w[7] + i * 0.08, 0.25), () => frect(x + 16, y0 + 66, 88, 8, QP.acc))); }
        withA(ip, () => _txt('every index on the table changes too', x0, y0 + 150, FM(30), QP.dim));
      }
    }, { push: 0.016 });
    sTape(k.a.w[0] + 0.1); sT(k.c.w[3]); sT(k.c.w[4], -2); sT(k.c.w[6], -2); sDraw(k.d.w[6], -3);
  }

  /* ---------------- 1 new order = 7 writes (B's idea, drawn flat) ---------------- */
  {
    const k = PS({ a: 'So if your orders table has six indexes', b: 'every new order means updating the whole table', c: 'and all six indexes' });
    addQ(S(k.a, 0.12), 'seven-writes', (t) => {
      // orders table (left), six indexes (right)
      const tx = L, ty = V(250, 520), tw_ = V(760, W - 2 * L), th = V(560, 340);
      panel(tx, ty, tw_, th, eo(t, k.a.w[3], 0.5));
      withA(eo(t, k.a.w[3], 0.4), () => _txt('orders', tx, ty - 24, FM(32, 600), QP.ink));
      for (let i = 1; i < 8; i++) hline(tx, ty + th * i / 8, tw_, eo(t, k.a.w[3] + i * 0.03, 0.4), QP.line, 1.5);
      // the new row drops in
      const np = em(t, k.b.w[2] - 0.2, 0.55);
      if (np > 0) { const yy = lerp(ty - 120, ty + th - th / 8, np); themeFixed(() => frect(tx + 6, yy + 4, tw_ - 12, th / 8 - 8, QP.acc)); withA(1, () => _txt('new order #10,482', tx + 24, yy + th / 16 + 10, FM(V(28, 26), 600), QP.accInk)); }
      const ix0 = V(1000, L), iy0 = V(250, 900), iw = V(260, 290), ih = V(250, 150);
      for (let i = 0; i < 6; i++) {
        const x = ix0 + (i % 3) * (iw + 20), y = iy0 + Math.floor(i / 3) * (ih + V(60, 40)); const p = eo(t, k.a.w[5] + i * 0.06, 0.45); if (p <= 0) continue;
        panel(x, y, iw, ih, p); withA(p, () => _txt('index ' + (i + 1), x + 18, y + 40, FM(26), QP.dim));
        for (let r = 0; r < 4; r++) withA(p, () => frect(x + 18, y + 70 + r * V(36, 22), iw * 0.6, 6, QP.ghost));
        const wp = eo(t, k.b.w[4] + 0.3 + i * 0.2, 0.25);
        if (wp > 0) withA(wp, () => frect(x + 18, y + 70 + 2.5 * V(36, 22), iw - 36, 12, QP.ink));
      }
      // the count
      const n = (t > k.b.w[5] ? 1 : 0) + [0, 1, 2, 3, 4, 5].filter(i => t > k.b.w[4] + 0.3 + i * 0.2 + 0.1).length;
      if (t > k.b.w[5]) { const cx = V(1000, L), cy = V(940, 1390); bigNum(String(n), cx, cy, V(120, 110), QP.ink); _txt(n === 1 ? 'write' : 'writes for 1 new order', cx + V(90, 90), cy, FM(32), QP.dim); }
      if (n === 7) MOTION.state('seven', true);
    });
    sDraw(k.a.w[3], -3); sCard(k.b.w[2]); for (let i = 0; i < 6; i++) sT(k.b.w[4] + 0.3 + i * 0.2, -4 - i * 0.3); sDing(k.b.w[4] + 0.3 + 5 * 0.2 + 0.12);
    MOTION.expect('the count reaches 7 on "all six indexes"', k.b.w[4] + 0.3 + 5 * 0.2 + 0.12, { state: 'seven', tol: 2 });
  }

  /* ---------------- slower writes, more storage ---------------- */
  {
    const k = PS({ a: 'So the more database indexes you have', b: 'the slower your writes get', c: 'indexes also take up storage space' });
    addQ(S(k.a, 0.12), 'slower', (t) => {
      hd(t, { lines: V(['More indexes, slower writes.'], ['More indexes,', 'slower writes.']), x: L, y: V(200, 460), size: V(84, 84), times: [k.a.t, k.a.w[4], k.b.w[1], k.b.w[3]] });
      // writes per new row = 1 + number of indexes
      const bx = L, by = V(780, 1000), bw = V(100, 100);
      for (let n = 0; n <= 6; n++) { const tt = k.a.w[4] + n * 0.12; const p = eo(t, tt, 0.5); if (p <= 0) continue; const h = (n + 1) * V(56, 52) * p; const x = bx + n * (bw + 24);
        frect(x, by - h, bw, h, n === 6 ? QP.ink : QP.slab);
        withA(p, () => { _txt(String(n), x + bw / 2, by + 40, FM(28), QP.dim, 'center'); _txt(String(n + 1), x + bw / 2, by - h - 14, FM(28, 600), QP.ink, 'center'); }); }
      withA(eo(t, k.a.w[4], 0.4), () => { _txt('indexes on the table', bx, by + 84, FM(30), QP.dim); _txt('writes per new row', bx, V(by - 470, by - 400), FM(30), QP.dim); });
      // storage: the table plus its indexes
      const sx = V(1080, L), sy = V(780, 1390);
      const sp = eo(t, k.c.w[3], 0.5);
      if (sp > 0) { const sh_ = V(300, 200); frect(sx, sy - sh_ * sp, 160, sh_ * sp, QP.slab); if (!PORTRAIT) withA(sp, () => _txt('table', sx, sy + 40, FM(28), QP.dim));
        for (let i = 0; i < 6; i++) { const p = eo(t, k.c.w[3] + 0.2 + i * 0.1, 0.4); frect(sx + 190, sy - (i + 1) * V(46, 32) * p, 120, V(40, 28) * p, QP.faint); }
        withA(eo(t, k.c.w[4], 0.4), () => _txt('+ storage for every index', sx + 340, sy - V(120, 90), FM(32, 600), QP.ink)); }
      illus(t, k.c.w[3] + 0.4, V(1080, L), V(1000, 1450), 'sizes not to scale');
    });
    for (let n = 0; n <= 6; n += 2) sT(k.a.w[4] + n * 0.12, -4); sCard(k.c.w[3]);
  }

  /* ---------------- a small table: the database skips the index ---------------- */
  {
    const k = PS({ a: 'And for a small table', b: 'the database will often skip your index', c: 'just scan the table anyway', d: "because that's faster for a small table", e: 'you have just like 10 rows', f: "it's faster to read them than to go through an index first" });
    addQ(S(k.a, 0.12), 'small-table', (t) => {
      hd(t, { lines: V(['Small table? It skips your index.'], ['Small table?', 'It skips your index.']), x: L, y: V(200, 460), size: V(78, 80), times: [k.a.w[3], k.a.w[4], k.b.w[1], k.b.w[4], k.b.w[5], k.b.w[6]] });
      const tx = L, ty = V(360, 640), rh = V(54, 56), tw_ = V(700, W - 2 * L);
      withA(eo(t, k.a.t, 0.4), () => _txt('users · 10 rows', tx, ty - 22, FM(30), QP.dim));
      for (let i = 0; i < 10; i++) { hline(tx, ty + (i + 1) * rh, tw_, eo(t, k.a.t + i * 0.03, 0.4), QP.line, 1.5); withA(eo(t, k.a.t + i * 0.03, 0.3), () => _txt(`${i + 1}`.padEnd(5) + ['ada', 'bob', 'chidi', 'dave', 'efe', 'femi', 'grace', 'hana', 'ike', 'jon'][i] + '@email.com', tx, ty + i * rh + rh * 0.7, FM(V(28, 28)), QP.ink)); }
      // the scan: all ten in a blink
      const sp = clamp((t - k.c.w[1]) / 0.6); if (t > k.c.w[1]) { const y = ty + Math.min(9, Math.floor(sp * 10)) * rh; boxD(tx - 8, y, tw_ + 16, rh, 1, QP.acc, 3); }
      // the plan the database picks
      const px = V(960, L), py = V(400, 1260), pw = V(840, W - 2 * L);
      const pp = eo(t, k.d.w[3], 0.45); panel(px, py, pw, V(230, 170), pp);
      withA(pp, () => { _txt('EXPLAIN · index exists', px + 28, py + 50, FM(26), QP.dim); _txt('Seq Scan on users', px + 28, py + 110, FM(V(34, 32), 600), QP.ink); });
      labA(t, k.f.t, 'reading 10 rows is faster than the index', V(px, L), V(py + 300, py + 220), 30, QP.ink, { key: 'small faster' });
    }, { push: 0.014 });
    sT(k.a.t); sRiffle(k.c.w[1] + 0.12, -6); sPop(k.d.w[3], -3);
  }

  /* ---------------- only index what you search, filter, join, sort by ---------------- */
  {
    const k = PS({ a: 'So what you do is that you only index the columns', b: 'that you actually search on', c: 'or filter on', d: 'or join', e: 'or sort by', f: "you don't index everything", g: 'it can also get costly too' });
    const Q = ['SELECT * FROM orders', '  JOIN users ON users.id = orders.user_id', "  WHERE orders.status = 'paid'", '  ORDER BY orders.created_at DESC;'];
    const Qp = ['SELECT * FROM orders', '  JOIN users', '    ON users.id = orders.user_id', "  WHERE orders.status = 'paid'", '  ORDER BY orders.created_at DESC;'];
    addQ(S(k.a, 0.12), 'only-these', (t) => {
      hd(t, { lines: V(['Index what you search by.'], ['Index what you', 'search by.']), x: L, y: V(180, 440), size: V(80, 80), times: [k.a.w[8], k.a.w[10], k.b.w[1], k.b.w[3], k.b.w[4]] });
      const cy = V(310, 580);
      code(t, k.a.w[7], V(Q, Qp), L, cy, V(34, 30), { instant: true, caret: false, hl: V([{ line: 2, from: 'status', at: k.c.w[1] }, { line: 1, from: 'user_id', at: k.d.w[1] }, { line: 3, from: 'created_at', at: k.e.w[1] }], [{ line: 3, from: 'status', at: k.c.w[1] }, { line: 2, from: 'user_id', at: k.d.w[1] }, { line: 4, from: 'created_at', at: k.e.w[1] }]) });
      const y = V(640, 1000), cw = V(240, 300);
      COLS.forEach((c, i) => {
        const x = V(L + i * cw, L + (i % 3) * cw), yy = V(y, y + Math.floor(i / 3) * 140);
        const use = { user_id: k.d.w[1], status: k.c.w[1], created_at: k.e.w[1] }[c];
        const p = eo(t, k.a.w[7] + i * 0.04, 0.4); boxD(x, yy, cw - 16, 90, p, use && t > use ? QP.acc : QP.line, use && t > use ? 3 : 2);
        withA(p * (use || t < k.f.t ? 1 : 0.45), () => _txt(c, x + 18, yy + 56, FM(V(30, 30)), QP.ink));
        if (use) { const tp = eq(t, use + 0.1, 0.3); if (tp > 0) withA(tp, () => _txt({ user_id: 'join', status: 'filter', created_at: 'sort' }[c] + ' → index', x + 18, yy + 130, FM(28, 600), QP.ink)); }
      });
      labA(t, k.g.w[4], 'good, but not free', L, V(960, 1440), 32, QP.dim, { key: 'only costly' });
    });
    sT(k.c.w[1]); sT(k.d.w[1], -2); sT(k.e.w[1], -2); sErr(k.f.w[2], -10);
  }

  /* ---------------- chapter 05: mistakes ---------------- */
  {
    const k = PS({ a: 'And there are several mistakes you can make', b: 'that can stop your database index from working', c: "You can have a database index and the database still won't use it", d: 'And these are the common mistakes' });
    addQ(S(k.a, 0.12), 'ch5', (t) => {
      chapterCard(t, k.a.t, '05 / 05', 'Mistakes that stop an index working', { lines: ['Mistakes that stop', 'an index working'], linesP: ['Mistakes that', 'stop an index', 'working'], y: 320, yp: 620, times: [k.a.w[4]].concat(pick(k.b, [0, 2, 4, 5, 7])) });
      body(t, k.c.t, "You have the index. The database still won't use it.", L, V(560, 1040), V(42, 40), QP.ink, V(1500, W - 2 * L), { key: 'ch5 sub' });
      [['01', 'A function on the column'], ['02', 'A wildcard at the start of LIKE']].forEach(([n, s], i) => {
        const tt = k.d.w[4] + i * 0.25; const a = eq(t, tt, 0.4); if (a <= 0) return; const y = V(720 + i * 100, 1220 + i * 110);
        withA(a, () => { _txt(n, L, y, FM(32), QP.dim); _txt(s, L + 90, y, FS(V(52, 46), 500), QP.ink); }); hline(L, y + 30, V(1200, W - 2 * L), eo(t, tt + 0.1, 0.5), QP.line, 2);
      });
    });
    sChapter(k.a.t + 0.05); sT(k.d.w[4]); sT(k.d.w[4] + 0.25, -2);
  }

  /* ---------------- mistake 1: LOWER(email) ---------------- */
  {
    const k = PS({ a: 'The first one is wrapping your column in a function', b: 'For example, in this case', c: 'a normal index on email is sorted by the emails exactly as they were stored', d: 'The lowercase versions are not in that index', e: "So the database can't use it here", f: 'unless you create an index on the same expression' });
    const QL = ["SELECT * FROM users", "  WHERE LOWER(email) = 'ada@email.com';"];
    const FIX = ['CREATE INDEX idx_email_lower', '    ON users (LOWER(email));'];
    addQ(S(k.a, 0.12), 'mistake-lower', (t) => {
      labA(t, k.a.t, '01', L, V(130, 400), 32, QP.dim, { key: 'mistake 01' });
      hd(t, { lines: V(['A function on the column'], ['A function on', 'the column']), x: L, y: V(220, 490), size: V(76, 76), times: [k.a.t].concat(pick(k.a, [5, 6, 8, 9])) });
      code(t, k.b.w[3], QL, L, V(340, 640), V(34, 30), { cps: 48, hl: [{ line: 1, from: 'LOWER(email)', at: k.c.w[1], box: true }] });
      // the index holds emails as they were stored
      const ix = L, iy = V(520, 800), rh = V(56, 56), iw = V(560, 560);
      const EM = ['Aaron@Email.com', 'Ada@Email.com', 'BOB@email.com', 'chidi@Email.com', 'Dave@email.com'];
      const ip = eo(t, k.c.w[3], 0.5); panel(ix - 20, iy - 10, iw, EM.length * rh + 20, ip);
      withA(ip, () => _txt('index on email, as stored', ix - 20, iy - 30, FM(30), QP.dim));
      EM.forEach((e, i) => withA(eo(t, k.c.w[3] + i * 0.05, 0.3), () => _txt(e, ix, iy + i * rh + rh * 0.68, FM(V(30, 30)), QP.ink)));
      // the lowercase value looks for itself and is not there
      const lp = eo(t, k.d.w[1], 0.4);
      if (lp > 0) { const x = V(ix + iw + 80, ix - 10), y = V(iy + rh * 1.5, iy + EM.length * rh + 60); chipQ(x + V(170, 170), y, 'ada@email.com', 28, lp); if (t > k.d.w[5]) withA(eo(t, k.d.w[5], 0.3), () => _txt('not in this index', x + V(380, 380), y + 10, FM(30, 600), QP.ink)); }
      withA(eo(t, k.e.w[4], 0.4), () => _txt("→ can't use it: Seq Scan", V(ix + iw + 80, L), V(iy + rh * 3.6, iy + EM.length * rh + 130), FM(V(34, 32), 600), QP.ink));
      // the fix: an index on the same expression
      const fy = V(940, 1320);
      if (t > k.f.w[3] - 0.3) { labA(t, k.f.w[3] - 0.3, 'unless:', L, fy - V(60, 56), 30, QP.dim, { key: 'lower unless' }); code(t, k.f.w[4], FIX, L, fy, V(34, 30), { cps: 44, hl: [{ line: 1, from: 'LOWER(email)', at: k.f.w[7] + 0.4 }] }); }
      labA(t, k.f.w[7] + 1.0, 'PostgreSQL syntax', V(1300, W - L), V(fy + 52, 1432), 30, QP.dim, { key: 'lower pg', align: V('left', 'right') });
    }, { push: 0.01 });
    sHit(k.a.w[5], -7); sCode(k.b.w[3], QL, 48); sDraw(k.c.w[3], -3); sPop(k.d.w[1]); sErr(k.d.w[5]); sCode(k.f.w[4], FIX, 44);
  }

  /* ---------------- mistake 2: a wildcard at the start of LIKE ---------------- */
  {
    const k = PS({ a: 'The second is you can also be adding a wildcard at the start of a LIKE', b: 'The index is sorted by how each value starts', c: "if you don't know how it starts", d: 'the index cannot help you find it' });
    const TI = ['Fahrenheit 451', 'Fall of Giants', 'Fallen', 'Falling Upward', 'Far from the Madding Crowd', 'Free Fall', 'Nightfall', 'The Fall of Rome'];
    addQ(S(k.a, 0.12), 'mistake-like', (t) => {
      labA(t, k.a.t, '02', L, V(130, 400), 32, QP.dim, { key: 'mistake 02' });
      hd(t, { lines: V(['A wildcard at the start'], ['A wildcard', 'at the start']), x: L, y: V(220, 490), size: V(76, 76), times: pick(k.a, [8, 9, 10, 11, 12]) });
      const q1 = "WHERE title LIKE 'Fall%'", q2 = "WHERE title LIKE '%Fall%'";
      const qy = V(340, 680);
      withA(eo(t, k.a.w[13] - 0.6, 0.4), () => { _txt(q1, L, qy, FM(V(34, 30)), QP.ink); _txt('can use the index', L + V(620, 560), qy, FM(V(30, 28), 600), QP.acc); });
      withA(eo(t, k.c.w[2], 0.4), () => { _txt(q2, L, qy + V(60, 56), FM(V(34, 30)), QP.ink); _txt("can't", L + V(620, 560), qy + V(60, 56), FM(V(30, 28), 600), QP.dim); });
      const x = L, y0 = V(520, 880), rh = V(56, 60);
      withA(eo(t, k.b.w[1], 0.4), () => _txt('index on title (sorted by how values start)', x, y0 - 24, FM(30), QP.dim));
      TI.forEach((s, i) => {
        const yy = y0 + 30 + i * rh; const a = eo(t, k.b.w[1] + i * 0.04, 0.3); if (a <= 0) return;
        const pre = s.startsWith('Fall');
        if (pre) found(x - 10, yy - rh * 0.66, V(700, 700), rh * 0.84, eo(t, k.b.w[6] + (i - 1) * 0.08, 0.3));
        withA(a, () => { _txt(s, x, yy, FM(V(30, 30), pre && t > k.b.w[6] ? 600 : 400), pre && t > k.b.w[6] ? QP.accInk : QP.ink); });
        // '%fall%': every row must be read
        if (t > k.c.w[2]) { const rp = eo(t, k.c.w[2] + i * 0.12, 0.25); if (rp > 0) withA(rp, () => _txt('read', x + V(740, 740), yy, FM(30), QP.ink)); }
      });
      withA(eo(t, k.d.w[3], 0.4), () => _txt(V("'%Fall%': it could be anywhere, every row is read", "'%Fall%': every row is read"), L, V(1010, 1440), FM(30, 600), QP.ink));
    }, { push: 0.01 });
    sHit(k.a.w[9], -7); sFound(k.b.w[6], -5); sRiffle(k.c.w[2], -6); sErr(k.d.w[3], -4);
  }

  /* ---------------- the foreign key gotcha ---------------- */
  {
    const k = PS({ a: 'Another database index gotcha', b: 'in MySQL, when you add a foreign key', c: 'creates an index on that column for you automatically', d: 'But in PostgreSQL, it doesn\'t', e: "So if you're on Postgres", f: "or you've moved from MySQL to Postgres", g: 'check and confirm that your foreign key columns actually have indexes', h: "it's one of the common reasons why joins suddenly get slow" });
    const FK = ["$table->foreignId('author_id')->constrained();"];
    addQ(S(k.a, 0.12), 'foreign-key', (t) => {
      hd(t, { lines: V(['Foreign keys: MySQL vs PostgreSQL'], ['Foreign keys:', 'MySQL vs PostgreSQL']), x: L, y: V(170, 440), size: V(72, 72), times: [k.a.w[3], k.b.w[6], k.b.w[7], k.d.w[2], k.d.w[2] + 0.1].slice(0, 5) });
      code(t, k.b.w[5], V(FK, ["$table->foreignId('author_id')", '      ->constrained();']), L, V(290, 570), V(34, 28), { cps: 50 });
      const colX = V([L, 990], [L, L]), colY = V([420, 420], [720, 1030]), cw = V(820, W - 2 * L), ch = V(360, 270);
      [['MySQL (InnoDB)', 'index on author_id: created for you', k.b.w[1], k.c.w[7], true], ['PostgreSQL', 'index on author_id: none', k.d.w[2], k.d.w[4], false]].forEach(([db, s, tt, t2, ok], i) => {
        const p = eo(t, tt, 0.5); if (p <= 0) return; const x = colX[i], y = colY[i];
        panel(x, y, cw, ch, p, { stroke: ok ? QP.line : QP.line });
        withA(p, () => _txt(db, x + 28, y + 56, FS(V(44, 40), 600), QP.ink));
        withA(eo(t, t2, 0.4), () => _txt(s, x + 28, y + 120, FM(V(30, 28), 600), QP.ink));
        if (!ok) { const fp = eo(t, k.g.w[4], 0.4); if (fp > 0) { withA(fp, () => _txt('add it yourself:', x + 28, y + 190, FM(28), QP.dim)); code(t, k.g.w[4] + 0.2, ["$table->index('author_id');"], x + 28, y + V(250, 236), V(32, 28), { cps: 44 }); } }
      });
      // joins get slow: books.author_id -> authors.id, read row by row
      const jp = eo(t, k.h.t, 0.5);
      if (jp > 0) { const y = V(900, 1380); withA(jp, () => { _txt('books.author_id', L, y, FM(30, 600), QP.ink); _txt('authors.id', L + V(560, 520), y, FM(30, 600), QP.ink); _txt('join: slow without the index', L + V(860, 0), y + V(0, 50), FM(30), QP.dim); }); seg(L + V(300, 300), y - 10, L + V(540, 500), y - 10, jp, QP.dim, 3, [8, 8]); }
    }, { push: 0.01 });
    sCode(k.b.w[5], FK, 50); sPop(k.b.w[1], -3); sFound(k.c.w[7], -5); sPop(k.d.w[2], -3); sErr(k.d.w[4] + 0.1, -5); sCode(k.g.w[4] + 0.33, ["$table->index('author_id');"], 44); sT(k.h.t);
  }

  /* ---------------- when to add one ---------------- */
  {
    const k = PS({ a: 'So again, to reiterate when to actually use a database index', b: 'use it when a column keeps showing up in your WHERE clauses', c: 'your joins', d: 'or your ORDER BY' });
    addQ(S(k.a, 0.12), 'when', (t) => {
      labA(t, k.a.t, 'Recap', L, V(200, 470), 32, QP.dim, { key: 'recap label' });
      hd(t, { lines: V(['When to add an index'], ['When to add', 'an index']), x: L, y: V(320, 590), size: V(96, 96), times: pick(k.a, [4, 5, 7, 8, 10]) });
      const items = [['WHERE', 'a column you filter by', k.b.w[4]], ['JOIN', 'a column you join on', k.c.t], ['ORDER BY', 'a column you sort by', k.d.t]];
      items.forEach(([kw, s, tt], i) => { const a = eq(t, tt, 0.4); if (a <= 0) return; const y = V(520 + i * 130, 830 + i * 170);
        withA(a, () => { _txt(kw, L, y, FM(V(48, 44), 600), QP.acc); _txt(s, L + V(330, 0), y + V(0, 56), FS(V(44, 40), 400), QP.ink); }); hline(L, y + V(40, 90), V(1300, W - 2 * L), eo(t, tt + 0.1, 0.5), QP.line, 2); });
      labA(t, k.b.w[5], 'keeps showing up in your queries', L, V(400, 740), 30, QP.dim, { key: 'when keeps' });
    });
    sHit(k.a.w[4], -8); sT(k.b.w[4]); sT(k.c.t, -2); sT(k.d.t, -2);
  }

  /* ---------------- ORDER BY + LIMIT ---------------- */
  {
    const k = PS({ a: 'So say you are sorting a million orders by date', b: 'and you only show the first 10', c: "If there's no index", d: 'look at a million rows and sort them', e: 'before it can give you those 10', f: 'But with an index', g: 'it reads them in order', h: 'stops after the first 10' });
    const QO = ['SELECT * FROM orders', '  ORDER BY created_at DESC', '  LIMIT 10;'];
    addQ(S(k.a, 0.12), 'order-limit', (t) => {
      code(t, k.a.w[4], QO, L, V(160, 420), V(36, 32), { cps: 46, hl: [{ line: 2, from: 'LIMIT 10', at: k.b.w[5], box: true }] });
      // without: a million rows, sorted, then 10 taken
      const lx = L, ly = V(450, 640), lw = V(780, W - 2 * L), lh = V(380, 220);
      const lp = eo(t, k.c.w[2], 0.4);
      if (lp > 0) {
        withA(lp, () => _txt('no index', lx, ly - 24, FM(30, 600), QP.ink));
        const sp = clamp((t - k.d.w[6]) / 2.2); const N = 60;
        for (let i = 0; i < N; i++) { const hRand = 0.15 + 0.85 * hash(i * 7 + 3); const hSort = 1 - i / N * 0.85; const h = lerp(hRand, hSort, E.inOutCubic(sp)) * (lh - 20); frect(lx + i * lw / N, ly + lh - h, lw / N - 3, h * lp, i < 10 && sp >= 1 ? QP.acc : QP.slab); }
        withA(eo(t, k.d.w[2], 0.3), () => _txt(`rows looked at: ${fmt(Math.min(1e6, 1e6 * clamp((t - k.d.w[2]) / 1.2)))}`, lx, ly + lh + 46, FM(30), QP.dim));
        withA(eo(t, k.d.w[6], 0.3), () => _txt(sp < 1 ? 'sorting…' : 'sorted, then 10 taken', lx + V(500, 520), ly + lh + 46, FM(30, 600), QP.ink));
      }
      // with an index: read in order, stop at 10
      const rx = V(1000, L), ry = V(450, 1000), rw = V(800, W - 2 * L);
      const rp = eo(t, k.f.w[3], 0.4);
      if (rp > 0) {
        withA(rp, () => _txt('with an index on created_at', rx, ry - 24, FM(30, 600), QP.acc));
        const n = Math.min(10, Math.floor(clamp((t - k.g.w[3]) / 1.4) * 10 + (t > k.g.w[3] ? 1 : 0)));
        for (let i = 0; i < 14; i++) { const y = ry + i * V(26, 18); const on = i < n; frect(rx, y, rw * (0.9 - i * 0.02), V(18, 12), on ? QP.acc : QP.ghost); }
        if (n >= 10) { const y = ry + 10 * V(26, 18) - 4; seg(rx - 10, y, rx + rw, y, eo(t, k.h.w[1], 0.3), QP.ink, 3); withA(eo(t, k.h.w[1], 0.3), () => _txt('stop', rx + rw - V(60, 60), y + 40, FM(30, 600), QP.ink)); MOTION.state('stop', true); }
        withA(eo(t, k.g.w[3], 0.3), () => _txt(`rows read: ${n}`, rx, ry + V(400, 300), FM(32, 600), QP.ink));
      }
      illus(t, k.c.w[2] + 0.5, V(W - L, W - L), V(1040, 1500), 'not to scale', { size: 30 });
    });
    sCode(k.a.w[4], QO, 46); sT(k.b.w[5]); sRiffle(k.d.w[2], -6); sDraw(k.d.w[6], -4); sPop(k.f.w[3], -3); sFound(k.h.w[1] - 0.15, -4);
  }

  /* ---------------- EXPLAIN says full scan on a slow query ---------------- */
  {
    const k = PS({ a: 'Also, when you use EXPLAIN', b: 'a query is doing a full table scan', c: 'and it is slow', d: 'then maybe you need an index there', e: 'So if your query is slow', f: 'you probably should consider adding an index there', g: "And if it's doing a full scan" });
    addQ(S(k.a, 0.12), 'explain-slow', (t) => {
      const px = L, py = V(200, 470), pw = V(960, W - 2 * L), ph = V(300, 300);
      panel(px, py, pw, ph, eo(t, k.a.w[3], 0.45));
      withA(eo(t, k.a.w[3], 0.4), () => { _txt('postgres=# EXPLAIN (COSTS OFF)', px + 28, py + 56, FM(V(30, 28)), QP.dim); if (!PORTRAIT) _txt('  SELECT * FROM orders WHERE user_id = 7;', px + 28, py + 100, FM(30), QP.dim); else { _txt('  SELECT * FROM orders', px + 28, py + 96, FM(28), QP.dim); _txt('  WHERE user_id = 7;', px + 28, py + 134, FM(28), QP.dim); } });
      code(t, k.b.w[5] - 0.3, ['Seq Scan on orders', '  Filter: (user_id = 7)'], px + 28, py + V(180, 200), V(34, 30), { cps: 60, caret: false, hl: [{ line: 0, from: 'Seq Scan', at: k.b.w[5] + 0.2, box: true }] });
      const sb = clamp((t - k.b.w[5]) / 6); if (sb > 0) { frect(px, py + ph - 8, pw, 8, QP.ghost); frect(px, py + ph - 8, pw * sb, 8, QP.dim); }
      withA(eo(t, k.c.w[3], 0.4), () => _txt('+ the query is slow', px, py + ph + 70, FS(V(48, 44), 600), QP.ink));
      const ap = eo(t, k.d.w[3], 0.6);
      arrow(V([[px + pw + 30, py + ph / 2], [px + pw + 180, py + ph / 2]], [[px + 40, py + ph + 110], [px + 40, py + ph + 240]]), ap, QP.acc, 4);
      const cx = V(px + pw + 210, px), cy = V(py + ph / 2 + 12, py + ph + 330);
      withA(ap, () => { _txt('add an index', cx, cy, FS(V(52, 52), 600), QP.acc); });
      if (t > k.f.w[3]) code(t, k.f.w[3], V(['CREATE INDEX idx_orders_user_id', '    ON orders (user_id);'], ['CREATE INDEX idx_orders_user_id', '    ON orders (user_id);']), V(px, px), V(py + ph + 230, cy + 120), V(32, 28), { cps: 48 });
      illus(t, k.b.w[5], V(W - L, W - L), V(1040, 1500), 'example query', { size: 30 });
    });
    sPop(k.a.w[3], -3); sfxType(k.b.w[5] - 0.3, 18, 60); sErr(k.c.w[3], -8); sDraw(k.d.w[3], -3); sCode(k.f.w[3], ['CREATE INDEX idx_orders_user_id', '    ON orders (user_id);'], 48);
  }

  /* ---------------- read a lot more than written ---------------- */
  {
    const k = PS({ a: 'Also, when a table gets more read', b: 'you read it a lot more than you write it', c: "that's also a good situation for a database index" });
    addQ(S(k.a, 0.12), 'read-heavy', (t) => {
      hd(t, { lines: V(['Read a lot, written a little?'], ['Read a lot,', 'written a little?']), x: L, y: V(220, 480), size: V(84, 84), times: [k.a.w[6], k.b.w[3], k.b.w[4], k.b.w[8], k.b.w[8] + 0.1, k.b.w[8] + 0.2] });
      const y = V(440, 760), n = 40, cw = V(42, 22);
      for (let i = 0; i < n; i++) { const isW = i % 8 === 5; const tt = k.b.w[1] + i * 0.05; const p = eq(t, tt, 0.25); if (p <= 0) continue;
        const x = L + i * cw; if (isW) frect(x, y + 120 - 60 * p, cw - 8, 60 * p, QP.slab); else frect(x, y + 120 - 110 * p, cw - 8, 110 * p, QP.ink); }
      withA(eo(t, k.b.w[1], 0.3), () => { _txt('reads', L, y + 170, FM(30, 600), QP.ink); _txt('writes', L + 140, y + 170, FM(30, 600), QP.dim); });
      hd(t, { lines: ['A good fit for an index.'], x: L, y: V(800, 1240), size: V(64, 60), times: pick(k.c, [2, 3, 4, 5, 6, 8]) });
    });
    sT(k.b.w[1]); sRiffle(k.b.w[1], -10); sFound(k.c.w[4], -5);
  }

  /* ---------------- when not to ---------------- */
  {
    const k = PS({ a: "But you shouldn't do that when the table is small", b: 'Or when the table is constantly written to and rarely searched', c: "then you probably don't need a database index" });
    addQ(S(k.a, 0.12), 'skip-when', (t) => {
      labA(t, k.a.t, 'Skip it when', L, V(220, 480), 32, QP.dim, { key: 'skip label' });
      const items = [['the table is small', k.a.w[9]], ['it is written constantly, rarely searched', k.b.w[6]]];
      items.forEach(([s, tt], i) => { const a = eq(t, tt, 0.4); if (a <= 0) return; const y = V(380 + i * 150, 640 + i * 220);
        withA(a, () => { _txt('0' + (i + 1), L, y, FM(32), QP.dim); txtW(s, L + 90, y, FS(V(60, 56), 500), QP.ink, V(1500, W - 2 * L - 90), V(68, 64)); }); hline(L, y + V(46, 110), V(1500, W - 2 * L), eo(t, tt + 0.1, 0.5), QP.line, 2); });
      hd(t, { lines: V(['You probably don\'t need one.'], ['You probably', "don't need one."]), x: L, y: V(800, 1200), size: V(76, 76), times: pick(k.c, [1, 2, 3, 4, 7]) });
    });
    sT(k.a.w[9]); sT(k.b.w[6], -2); sHit(k.c.w[2], -8);
  }

  /* ---------------- the end ---------------- */
  {
    const k = PS({ a: "So that's it with database indexes", b: 'Bye' });
    addQ(S(k.a, 0.12), 'end', (t) => {
      hd(t, { lines: V(['Database indexes'], ['Database', 'indexes']), x: L, y: V(420, 760), size: V(130, 130), times: [k.a.t, k.a.w[5]] });
      // the tree draws one last time, the path runs to the leaf
      const bx = V(1380, CX), by = V(520, 1180);
      withT(bx, by, 1, 0, () => {
        const t0 = k.a.w[4] + 0.2; const r = bnode(0, 0, ['', ''], 90, 54, eo(t, t0, 0.5)); const xs = [-230, 0, 230];
        xs.forEach((x, i) => { seg(r.ptr(i)[0], 54, x, 170, eo(t, t0 + 0.25 + i * 0.07, 0.4), QP.dim, 2); bnode(x, 170, ['', ''], 70, 46, eo(t, t0 + 0.45 + i * 0.1, 0.5)); });
        poly([[r.ptr(1)[0], 54], [xs[1], 170]], eo(t, t0 + 1.0, 0.5), QP.acc, 5);
        themeFixed(() => withA(eo(t, t0 + 1.4, 0.2), () => frect(xs[1] + 5, 175, 60, 36, QP.acc)));
      });
      const hp = eo(t, k.b.t, 0.5);
      withA(hp, () => txt('@WithGbemi', L, V(560, 980), FM(V(48, 48), 600), QP.acc, 'left', 'alphabetic', 0, 'end handle'));
      labA(t, k.b.t + 0.4, 'Tech · Career · Research', L, V(620, 1040), 30, QP.dim, { key: 'end tagline' });
    }, { push: 0.02 });
    sHit(k.a.w[4], -6); sDraw(k.a.w[4] + 0.2, -3); sFound(k.a.w[4] + 1.6, -6); sPop(k.b.t, -3);
  }
}
