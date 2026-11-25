/* database-indexes film, part 3: chapter 04, the types (B-tree, unique, composite + the phone book, hash, bitmap, spatial,
 * full-text, covering / partial, clustered vs non-clustered). */
'use strict';

/** a phone-book page in the film's line style: guide words, listings with dot leaders, a page number.
 *  rows: [[surname, first, row]] ; o.hit(i) -> 0..1 (yellow found line), o.p draw progress, o.dimI(i) */
function pbPage(x, y, w, h, guide, rows, pageNo, o = {}) {
  const p = o.p == null ? 1 : o.p; if (p <= 0) return;
  panel(x, y, w, h, p);
  const size = o.size || V(30, 28), rh = o.rh || V(58, 46);
  withA(clamp(p * 1.5), () => {
    _txt(guide[0].toUpperCase(), x + 30, y + 52, FM(28, 600), QP.dim); _txt(guide[1].toUpperCase(), x + w - 30, y + 52, FM(28, 600), QP.dim, 'right');
    hline(x + 30, y + 72, w - 60, 1, QP.line, 2);
    _txt('page ' + pageNo, x + w - 30, y + h - 18, FM(28), QP.dim, 'right');
  });
  rows.forEach(([sn, fn, r], i) => {
    const yy = y + 120 + i * rh; const a = clamp((p - 0.2 - i * 0.05) / 0.4); if (a <= 0) return;
    const hp = o.hit ? o.hit(i) : 0; if (hp > 0) found(x + 18, yy - rh * 0.66, w - 36, rh * 0.9, hp);
    const on = hp > 0.5, dim = o.dimI && o.dimI(i);
    withA(a * (dim ? 0.45 : 1), () => {
      const f1 = FS(size, 600), f2 = FS(size, 400); const ink = on ? QP.accInk : QP.ink;
      _txt(sn + ',', x + 30, yy, f1, ink); setFont(f1); const w1 = ctx.measureText(sn + ', ').width;
      _txt(fn, x + 30 + w1, yy, f2, ink); setFont(f2); const w2 = ctx.measureText(fn).width;
      _txt(r, x + w - 30, yy, FM(24), on ? QP.accInk : QP.dim, 'right'); setFont(FM(24)); const w3 = ctx.measureText(r).width;
      for (let xx = x + 44 + w1 + w2; xx < x + w - 44 - w3; xx += 12) frect(xx, yy - 4, 3, 3, on ? QP.accInk : QP.faint);
    });
  });
}

function buildS3() {
  /* ---------------- chapter 04: types ---------------- */
  {
    const k = PS({ a: 'There are a few types of database index', b: 'B-tree, hash, bitmap', c: 'many like that', d: "I'm just only going to focus on three" });
    addQ(S(k.a, 0.12), 'ch4', (t) => {
      chapterCard(t, k.a.t, '04 / 05', 'Types of indexes', { y: 330, yp: 640, times: [k.a.t, k.a.w[5], k.a.w[6]] });
      const names = [['B-tree', k.b.w[0]], ['hash', k.b.w[1]], ['bitmap', k.b.w[2]], ['spatial', k.c.w[0] + 0.1], ['full-text', k.c.w[1]], ['covering', k.c.w[2]], ['partial', k.c.w[2] + 0.15]];
      const y = V(560, 900);
      let x = L; names.forEach(([n, tt], i) => {
        const a = eq(t, tt, 0.35) * out(t, k.d.t); setFont(FM(V(36, 34))); const w = ctx.measureText(n).width + 40;
        if (PORTRAIT && x + w > W - L) { x = L; }
        const yy = y + (PORTRAIT ? Math.floor(i / 3) * 80 : 0);
        withA(a, () => { boxD(x, yy - 44, w, 64, a, QP.line, 2); _txt(n, x + 20, yy, FM(V(36, 34)), i < 3 ? QP.ink : QP.dim); });
        x += w + 20; if (PORTRAIT && (i % 3 === 2)) x = L;
      });
      const three = [['01', 'B-tree'], ['02', 'Unique'], ['03', 'Composite']];
      three.forEach(([n, s], i) => {
        const tt = k.d.w[7] + i * 0.12; const a = eq(t, tt, 0.4); if (a <= 0) return; const yy = V(560, 900) + i * V(110, 120);
        withA(a, () => { _txt(n, L, yy, FM(32), QP.dim); _txt(s, L + 90, yy, FS(V(64, 64), 600), QP.ink); });
        hline(L, yy + 34, V(900, W - 2 * L), eo(t, tt + 0.1, 0.5), QP.line, 2);
      });
    });
    sChapter(k.a.t + 0.05); sPop(k.b.w[0], -3); sPop(k.b.w[1], -4); sPop(k.b.w[2], -4); sT(k.d.w[7]);
  }

  /* ---------------- 01 B-tree: the default ---------------- */
  {
    const k = PS({ a: 'The first one is B-tree', b: 'The B-tree is the default one', c: 'when you create an index without saying what type it is', d: 'this is the one that you get', e: "So it's very common" });
    const C1 = ['CREATE INDEX idx_email', '    ON users (email);'];
    addQ(S(k.a, 0.12), 'btree-default', (t) => {
      labA(t, k.a.t, '01', L, V(200, 470), 32, QP.dim, { key: 'type 01' });
      hd(t, { lines: ['B-tree'], x: L, y: V(330, 600), size: V(120, 124), times: [k.a.w[4]] });
      hd(t, { lines: V(['The default.'], ['The default.']), x: V(620, L), y: V(330, 740), size: V(84, 80), times: [k.b.w[3], k.b.w[4]] });
      const cy = V(560, 960);
      panel(L - 30, cy - 70, V(1200, W - 2 * L + 60), V(230, 260), eo(t, k.c.w[3], 0.4));
      code(t, k.c.w[4], C1, L, cy + 6, V(42, 36), { cps: 36 });
      // the type you did not write: USING btree slides in, dim
      const gp = eo(t, k.d.w[3], 0.5);
      if (gp > 0) { withA(gp, () => _txt('-- same as: USING btree', L, cy + 6 + V(42, 36) * 2.9, FM(V(36, 32)), QP.acc)); }
      labA(t, k.e.t, 'The default in PostgreSQL and MySQL', L, V(900, 1300), 32, QP.ink, { key: 'btree default note' });
    }, { push: 0.016 });
    sHit(k.a.w[4], -5); sCode(k.c.w[4], C1, 36); sPop(k.d.w[3]); sT(k.e.t);
  }

  /* ---------------- what a B-tree can do (exact, range, sort, starts with) ---------------- */
  {
    const k = PS({ a: 'It can find exact matches', b: 'the user with this email', c: 'It can find ranges', d: 'books priced between 10 and 15', e: 'It can sort', f: 'showing the newest order first', g: 'find values by how they start', h: 'starts with "Harry"' });
    const PAN = [
      { t: k.a.w[3], hit: k.b.w[4], q: "WHERE email = 'ada@email.com'", rows: ['aaron@email.com', 'ada@email.com', 'alice@email.com', 'bob@email.com'], hi: [1], name: 'exact match' },
      { t: k.c.w[3], hit: k.d.w[3], q: 'WHERE price BETWEEN 10 AND 15', rows: ['8.50', '10.00', '12.99', '15.00', '19.99'], hi: [1, 2, 3], name: 'range' },
      { t: k.e.w[2], hit: k.f.w[2], q: 'ORDER BY created_at DESC', rows: ['2026-10-13 09:12', '2026-10-12 18:40', '2026-10-12 08:03', '2026-10-11 21:55'], hi: [0, 1, 2, 3], name: 'sorting', arrow: true },
      { t: k.g.w[0], hit: k.h.w[2], q: "WHERE title LIKE 'Harry%'", rows: ['Hard Times', 'Harry Potter and the Chamber…', 'Harry Potter and the Goblet…', 'Hatchet'], hi: [1, 2], name: 'starts with' },
    ];
    addQ(S(k.a, 0.12), 'btree-can', (t) => {
      const pw = V(830, W - 2 * L), ph = V(410, 240), gx = V(60, 0);
      PAN.forEach((P_, i) => {
        const x = V(L + (i % 2) * (pw + gx), L), y = V(90 + Math.floor(i / 2) * (ph + 50), 380 + i * (ph + 16));
        const p = eo(t, i === 0 ? k.a.t - 0.1 : P_.t, 0.5); if (p <= 0) return;
        panel(x, y, pw, ph, p);
        withA(p, () => { _txt(P_.name, x + 28, y + 50, FM(V(28, 28)), QP.dim); _txt(P_.q, x + 28, y + V(100, 92), FM(V(30, 28), 600), QP.ink); });
        const rh = V(56, 38), size = V(28, 28);
        P_.rows.forEach((r, j) => {
          if (PORTRAIT && j > 2) return; const yy = y + V(165, 132) + j * rh; const hp = P_.hi.includes(j) ? eo(t, P_.hit + j * 0.06, 0.3) : 0;
          if (PORTRAIT && j > 3) return;
          if (hp > 0 && !P_.arrow) found(x + 18, yy - rh * 0.7, V(520, 520), rh * 0.88, hp);
          withA(clamp((p - 0.3 - j * 0.06) / 0.4), () => _txt(r, x + 28, yy, FM(size, hp > 0.5 && !P_.arrow ? 600 : 400), hp > 0.5 && !P_.arrow ? QP.accInk : QP.ink));
        });
        if (P_.arrow) { const ap = eo(t, P_.hit, 0.7); arrow([[x + V(420, 420), y + V(135, 110)], [x + V(420, 420), y + V(165, 132) + V(3, 2) * rh]], ap, QP.acc, 4); withA(ap, () => _txt('read in order', x + V(450, 450), y + V(250, 190), FM(28), QP.acc)); }
      });
      illus(t, k.a.t + 0.8, L, V(1040, 1460), 'made-up rows');
    });
    PAN.forEach(P_ => { sPop(P_.t, -3); sT(P_.hit + 0.05); });
  }

  /* ---------------- because the index is sorted: the Harry titles sit together ---------------- */
  {
    const k = PS({ a: 'And that works because the index is sorted', b: 'all the titles that start with "Harry"', c: 'sit next to each other' });
    const TT = ['Hamlet', 'Hard Times', 'Harry Potter and the Chamber of Secrets', 'Harry Potter and the Goblet of Fire', 'Harry Potter and the Order of the Phoenix', "Harry Potter and the Philosopher's Stone", 'Hatchet', 'Heart of Darkness'];
    addQ(S(k.a, 0.12), 'sorted-harry', (t) => {
      hd(t, { lines: V(['It works because the index is sorted.'], ['It works because', 'the index is sorted.']), x: L, y: V(170, 440), size: V(64, 66), times: [k.a.w[1], k.a.w[2], k.a.w[3], k.a.w[4], k.a.w[5], k.a.w[6], k.a.w[7]] });
      const x = L + V(60, 0), y0 = V(300, 620), rh = V(76, 84), size = V(36, 30);
      withA(eo(t, 0.1, 0.4), () => _txt('index on title', x, y0 - 24, FM(30), QP.dim));
      TT.forEach((s, i) => {
        const yy = y0 + 40 + i * rh; const isH = s.startsWith('Harry'); const hp = isH ? eo(t, k.b.w[5] + (i - 2) * 0.08, 0.3) : 0;
        if (hp > 0) found(x - 14, yy - rh * 0.66, V(900, W - 2 * L), rh * 0.86, hp);
        withA(eo(t, 0.05 + i * 0.04, 0.35), () => _txt(PORTRAIT ? s.replace('Harry Potter and the ', 'Harry Potter… ') : s, x, yy, FM(size, hp > 0.5 ? 600 : 400), hp > 0.5 ? QP.accInk : QP.ink));
        hline(x - 14, yy + rh * 0.3, V(900, W - 2 * L), eo(t, 0.05 + i * 0.04, 0.5), QP.line, 1.5);
      });
      // a bracket: one contiguous block
      const bp = eo(t, k.c.w[0], 0.5); const bx = x + V(940, 0) - V(0, 0), by1 = y0 + 40 + 2 * rh - rh * 0.66, by2 = y0 + 40 + 5 * rh + rh * 0.2;
      if (!PORTRAIT) { poly([[bx, by1], [bx + 30, by1], [bx + 30, by2], [bx, by2]], bp, QP.acc, 4); withA(bp, () => { _txt('one block,', bx + 60, (by1 + by2) / 2 - 10, FS(48, 600), QP.acc); _txt('next to each other', bx + 60, (by1 + by2) / 2 + 48, FS(48, 600), QP.acc); }); }
      else withA(bp, () => _txt('one block, next to each other', L, y0 + 40 + 8 * rh + 30, FS(44, 600), QP.acc));
    });
    sDraw(S(k.a, 0.12) + 0.1); sFound(k.b.w[5] - 0.03, -4); sT(k.c.w[0] - 0.13);
  }

  /* ---------------- 02 unique ---------------- */
  {
    const k = PS({ a: 'The second commonly used type of database index is the unique index', b: 'no two rows have the same value', c: 'no two user can sign up with the same email', d: 'Your primary key already has one' });
    addQ(S(k.a, 0.12), 'unique', (t) => {
      labA(t, k.a.t, '02', L, V(200, 470), 32, QP.dim, { key: 'type 02' });
      hd(t, { lines: ['Unique index'], x: L, y: V(330, 600), size: V(110, 110), times: [k.a.w[10], k.a.w[11]] });
      body(t, k.b.t, 'No two rows with the same value.', L, V(410, 690), V(40, 42), QP.dim, V(1100, W - 2 * L), { key: 'unique sub' });
      const tx = L, ty = V(560, 880), cols = [{ w: V(140, 140), h: 'id' }, { w: V(480, 480), h: 'email' }], rh = V(60, 66);
      const rows = [['1', 'aaron@email.com'], ['2', 'ada@email.com'], ['3', 'bob@email.com'], ['4', 'chidi@email.com']];
      const tp = eo(t, k.b.t + 0.2, 0.7);
      table(tx, ty, cols, 4, (i) => rows[i], { p: tp, rh, size: V(30, 32), hi: (i) => (i === 1 && t > k.c.w[8] ? 2 : 0) });
      withA(tp, () => _txt('users', tx, ty - 60, FM(32, 600), QP.ink));
      // a new sign-up with the same email slides in and is refused
      const ip = em(t, k.c.w[3], 0.6); const shake = t > k.c.w[8] ? Math.sin((t - k.c.w[8]) * 40) * 10 * Math.exp(-(t - k.c.w[8]) * 5) : 0;
      if (ip > 0) {
        const nx = lerp(V(1700, 900), tx, ip) + shake, ny = ty + 4 * rh + V(40, 40);
        withA(out(t, k.d.t - 0.2), () => {
          boxD(nx - 8, ny, cols[0].w + cols[1].w + 16, rh, 1, t > k.c.w[8] ? QP.dim : QP.ink, 2.5);
          _txt('new', nx, ny + rh * 0.68, FM(V(30, 32)), QP.dim); _txt('ada@email.com', nx + cols[0].w, ny + rh * 0.68, FM(V(30, 32)), QP.ink);
          if (t > k.c.w[8]) { seg(nx - 8, ny + rh / 2, nx + cols[0].w + cols[1].w + 8, ny + rh / 2, eo(t, k.c.w[8], 0.3), QP.ink, 3); withA(eo(t, k.c.w[8] + 0.1, 0.3), () => _txt('refused: already there', nx, ny + rh + 46, FM(30, 600), QP.ink)); }
        });
      }
      // the primary key's own unique index
      const kp = eo(t, k.d.w[1], 0.5);
      if (kp > 0) { boxD(tx - 10, ty - 50, cols[0].w, 4 * rh + 60, kp, QP.acc, 3); withA(kp, () => _txt(V('PRIMARY KEY: unique already', 'PRIMARY KEY:'), V(tx + 700, tx), V(ty + 40, ty - 110), FM(32, 600), QP.acc)); if (PORTRAIT) withA(kp, () => _txt('unique already', tx + 300, ty - 110, FM(32, 600), QP.acc)); }
      illus(t, k.b.t + 0.6, L, V(1000, 1450), 'made-up rows');
    }, { push: 0.016 });
    sHit(k.a.w[10], -6); sDraw(k.b.t + 0.2, -2); sCard(k.c.w[3] + 0.3); sErr(k.c.w[8]); sT(k.d.w[1]);
  }

  /* ---------------- 03 composite ---------------- */
  {
    const k = PS({ a: 'And the third one', b: 'this one kind of always confuses me', c: 'The third one is the composite index', d: 'an index on more than one column', e: 'So say you index last name and first name together in that order', f: 'It helps you when you search by last name', g: 'when you search by last name and first name', h: 'But when you search by only first name', i: "it usually doesn't help" });
    const CC = ['CREATE INDEX idx_name', '    ON users (last_name, first_name);'];
    const QS_ = [["WHERE last_name = 'Okafor'", 'helps', k.f.w[7], true], ["WHERE last_name = 'Okafor'\n  AND first_name = 'Ada'", 'helps', k.g.w[6], true], ["WHERE first_name = 'Ada'", 'usually no help', k.i.w[2], false]];
    addQ(S(k.a, 0.12), 'composite', (t) => {
      labA(t, k.a.t, '03', L, V(170, 440), 32, QP.dim, { key: 'type 03' });
      withA(eo(t, k.a.t, 0.4) * out(t, k.c.t), () => txtW('“This one kind of always confuses me.”', L, V(300, 600), FS(V(64, 64), 500), QP.ink, V(1500, W - 2 * L), V(76, 76), 0, 'composite quote'));
      hd(t, { lines: ['Composite index'], x: L, y: V(290, 570), size: V(100, 96), times: [k.c.w[5], k.c.w[6]] });
      body(t, k.d.t, 'An index on more than one column.', L, V(370, 650), V(40, 40), QP.dim, V(1100, W - 2 * L), { key: 'composite sub' });
      const cy = V(500, 800);
      code(t, k.e.w[3], V(CC, ['CREATE INDEX idx_name ON users', '  (last_name, first_name);']), L, cy, V(38, 32), { cps: 44, hl: [{ line: 1, from: 'last_name', at: k.e.w[4], box: true }, { line: 1, from: 'first_name', at: k.e.w[7], box: true }] });
      QS_.forEach(([q, verdict, tt, ok], i) => {
        const y = V(670 + i * 110, 1000 + i * 150) + (i === 2 ? V(40, 50) : 0); const a = eq(t, tt - 0.25, 0.4); if (a <= 0) return;
        withA(a, () => {
          q.split('\n').forEach((ln, j) => _txt(ln, L, y + j * V(44, 40), FM(V(32, 28)), QP.ink));
          _txt(verdict, V(L + 1100, L + 600), y, FM(V(32, 30), 600), ok ? QP.acc : QP.dim);
        });
        if (!ok) seg(L, y - 10, L + V(530, 470), y - 10, eo(t, tt + 0.2, 0.4), QP.dim, 3);
      });
    }, { push: 0.012 });
    sT(k.b.t); sHit(k.c.w[5] + 0.067, -6); sCode(k.e.w[3], CC, 44); QS_.forEach(([, , tt, ok]) => (ok ? sT(tt - 0.25) : sErr(tt, -4)));
  }

  /* ---------------- the phone book (C's idea, drawn in A's line style) ---------------- */
  const PG12 = [['Adebayo', 'Tola', 'row 9,214'], ['Adewale', 'Kunle', 'row 30,771'], ['Adeyemi', 'Ada', 'row 14,602'], ['Adeyemi', 'Bisi', 'row 52,330'], ['Adeyemi', 'Funmi', 'row 808'], ['Adeyemi', 'Tunde', 'row 41,177']];
  const PG418 = [['Okafor', 'Ada', 'row 48,213'], ['Okafor', 'Chidi', 'row 5,760'], ['Okafor', 'Ifeoma', 'row 77,904'], ['Okafor', 'Nkem', 'row 21,336'], ['Okeke', 'Obi', 'row 8,019'], ['Okonkwo', 'Uche', 'row 66,412']];
  const PG961 = [['Walker', 'Sam', 'row 33,190'], ['West', 'Dayo', 'row 71,045'], ['Williams', 'Ada', 'row 26,958'], ['Williams', 'Ben', 'row 4,421'], ['Williams', 'Grace', 'row 59,307']];
  {
    const k = PS({ a: 'A little bit of a reason', a2: "let's use the example with phone books", b: 'Think of a phone book sorted by surname', c: 'All the Adeyemis are together', d: 'all the Okafors are together', e: 'inside each surname, it is sorted by first name', f: 'Ada Okafor will come before Chidi Okafor', g: "So if I'm looking for Ada Okafor, it's easy", h: "I go to the O's", i: 'I find Okafor', j: 'then I find Ada' });
    const TABS = ['AB', 'CD', 'EF', 'GH', 'IJ', 'KL', 'MN', 'OP', 'QR', 'ST', 'UV', 'WX', 'YZ'];
    addQ(S(k.a, 0.12), 'phone-book', (t) => {
      hd(t, { lines: V(['A phone book, sorted by surname'], ['A phone book,', 'sorted by surname']), x: L, y: V(130, 430), size: V(60, 62), times: [k.a.t, k.a.t + 0.08, k.a.t + 0.16, k.a.t + 0.3, k.a.t + 0.38, k.a.t + 0.46] });
      const pw = V(700, 900), ph = V(560, 420), x1 = L, y1 = V(210, 520), x2 = V(L + pw + 40, L), y2 = V(210, 960);
      const okH = (i) => (i === 0 ? eo(t, k.j.w[3], 0.3) : 0);
      const okO = eo(t, k.g.w[4], 0.35);
      pbPage(x1, y1, pw, ph, ['Adebayo', 'Adeyemi'], PG12, 12, { p: eo(t, k.a.t + 0.3, 0.6) });
      pbPage(x2, y2, pw, ph, ['Okafor', 'Okonkwo'], PG418, 418, { p: eo(t, k.b.w[3], 0.6), hit: okH });
      // brackets: each surname sits together
      const rh = V(58, 46);
      const brk = (x, y, n, tt, label) => { const p = eo(t, tt, 0.5); if (p <= 0) return; const yy1 = y + 120 - rh * 0.7, yy2 = y + 120 + (n - 1) * rh + rh * 0.25; poly([[x - 14, yy1], [x - 26, yy1], [x - 26, yy2], [x - 14, yy2]], p, QP.ink, 3); withA(p, () => _txt(label, x - 36, (yy1 + yy2) / 2 + 10, FM(28, 600), QP.ink, 'right')); };
      
      const gl = (x, y, i0, n, tt) => { const p = eo(t, tt, 0.4); if (p > 0) boxD(x + 18, y + 120 + i0 * rh - rh * 0.72, pw - 36, n * rh + rh * 0.1, p, QP.ink, 2.5); };
      gl(x1, y1, 2, 4, k.c.w[2]); gl(x2, y2, 0, 4, k.d.w[2]);
      // first names in order inside the surname: a small dim arrow down the first-name column
      const fp = eo(t, k.e.w[6], 0.7); if (fp > 0) { arrow([[x2 + V(250, 250), y2 + 92], [x2 + V(250, 250), y2 + 120 + 3 * rh + 10]], fp, QP.dim, 3, 12); }
      if (!PORTRAIT) withA(eo(t, k.f.w[2], 0.4) * out(t, k.g.t), () => _txt('Ada before Chidi', x2 + pw - 30, y2 + ph + 52, FM(30, 600), QP.ink, 'right'));
      // the thumb tabs: O pulls out
      const tx = V(x2 + pw + 14, W - L + 10), ty0 = V(y2 + 10, y2), th_ = V(40, 32);
      if (!PORTRAIT) TABS.forEach((tb, i) => {
        const pull = tb === 'OP' ? em(t, k.h.w[3], 0.45) : 0; const a = eo(t, k.b.w[3] + 0.3 + i * 0.02, 0.3); if (a <= 0) return;
        const xx = tx + pull * 18, yy = ty0 + i * (th_ + 2);
        withA(a, () => { if (pull > 0.5) themeFixed(() => frect(xx, yy, V(56, 48), th_, QP.acc)); else boxD(xx, yy, V(56, 48), th_, 1, QP.line, 2); _txt(tb, xx + V(28, 24), yy + th_ * 0.68, FM(V(22, 22), 600), pull > 0.5 ? QP.accInk : QP.dim, 'center'); });
      });
      if (PORTRAIT) { const op = eq(t, k.h.w[3], 0.35); if (op > 0) withA(op, () => { themeFixed(() => frect(x2 + 24, y2 + ph - 60, 120, 46, QP.acc)); _txt("O's", x2 + 84, y2 + ph - 25, FM(32, 600), QP.accInk, 'center'); }); }
      const gp = eo(t, k.i.w[2], 0.35); if (gp > 0) boxD(x2 + 22, y2 + 22, 170, 44, gp, QP.acc, 3);
      if (okO > 0 && okH(0) < 0.5) boxD(x2 + 18, y2 + 120 - V(58, 46) * 0.66, pw - 36, V(58, 46) * 0.9, okO, QP.acc, 3);
      illus(t, k.b.w[3] + 0.8, L, V(1040, 1470), 'made-up names and row numbers');
    }, { push: 0.012 });
    sPage(k.a.t + 0.3); sPage(k.b.w[3], -3); sT(k.g.w[4]); sT(k.c.w[2]); sT(k.d.w[2]); sDraw(k.e.w[6], -3); sCard(k.h.w[3]); sT(k.i.w[2]); sFound(k.j.w[3]);
  }

  /* ---------------- everyone named Ada ---------------- */
  {
    const k = PS({ a: 'But what if I want everyone whose first name is Ada', b: 'Ada Adeyemi in the front', c: 'Ada Okafor in the middle', d: 'Ada Williams near the end', e: 'They are spread across the whole phone book', f: 'because the book is sorted by surname first', g: 'So nothing groups the Adas together', h: 'I would have to read every page to find them' });
    addQ(S(k.a, 0.12), 'every-ada', (t) => {
      hd(t, { lines: V(['Everyone whose first name is Ada?'], ['Everyone whose', 'first name is Ada?']), x: L, y: V(130, 430), size: V(60, 62), times: [k.a.t].concat(pick(k.a, [6, 7, 8, 9, 10])) });
      const pw = V(540, 900), ph = V(470, 230), gap = V(40, 20), y = V(190, 540);
      const pages = [['Adebayo', 'Adeyemi', PG12, 12, k.b.w[1], 2], ['Okafor', 'Okonkwo', PG418, 418, k.c.w[1], 0], ['Walker', 'Williams', PG961, 961, k.d.w[1], 2]];
      pages.forEach(([g1, g2, rows, no, tt, hi], i) => {
        const x = V(L + i * (pw + gap), L), yy = V(y, y + i * (ph + gap));
        const rs = PORTRAIT ? (hi === 0 ? rows.slice(0, 2) : rows.slice(hi - 1, hi + 1)) : rows.slice(0, 5); const hiI = PORTRAIT ? (hi === 0 ? 0 : 1) : hi;
        pbPage(x, yy, pw, ph, [g1, g2], rs, no, { p: eo(t, i === 0 ? k.a.t - 0.1 : tt - 0.3, 0.5), hit: (j) => (j === hiI ? eo(t, tt, 0.3) : 0), rh: V(56, 46), size: V(28, 28) });
      });
      // the whole book: 1,000 page ticks, the three Adas far apart
      const sx = L, sy = V(780, 1300), sw = W - 2 * L, sh = V(70, 40);
      const sp = eo(t, k.e.w[3], 0.6);
      if (sp > 0) {
        for (let i = 0; i <= 100; i++) seg(sx + sw * i / 100, sy, sx + sw * i / 100, sy + sh, eo(t, k.e.w[3] + i * 0.004, 0.3), i % 10 ? QP.line : QP.faint, 1.5);
        [12, 418, 961].forEach((pg, i) => themeFixed(() => withA(eo(t, k.e.w[3] + 0.3 + i * 0.12, 0.25), () => frect(sx + sw * pg / 1000 - 3, sy - 8, 6, sh + 16, QP.acc))));
        if (!PORTRAIT) withA(sp, () => { _txt('page 1', sx, sy + sh + 40, FM(28), QP.dim); _txt('page 1,000', sx + sw, sy + sh + 40, FM(28), QP.dim, 'right'); });
      }
      // read every page
      const rp = clamp((t - k.h.w[4]) / 2.6);
      if (t > k.h.w[4]) { themeFixed(() => withA(0.45, () => frect(sx, sy, sw * rp, sh, QP.acc))); }
      withA(eo(t, k.h.w[4], 0.4), () => { const n = Math.round(1000 * rp); _txt(`Pages to read: ${fmt(n)} of 1,000`, sx, V(990, 1394), FS(V(50, 40), 600), QP.ink); });
      withA(eo(t, k.f.w[5], 0.4) * out(t, k.h.w[4]), () => _txt('sorted by surname first', sx, V(990, 1394), FM(32), QP.dim));
      illus(t, k.b.w[1] + 0.6, V(W - L, W - L), V(1040, 1500), 'made-up names', { size: 30 });
    }, { push: 0.01 });
    sPage(k.b.w[1] - 0.3); sT(k.b.w[1]); sPage(k.c.w[1] - 0.3, -2); sT(k.c.w[1]); sPage(k.d.w[1] - 0.23, -3); sT(k.d.w[1]); sDraw(k.e.w[3]); sRiffle(k.h.w[4], -2); sErr(k.h.w[4] + 2.6, -6);
  }

  /* ---------------- the tip ---------------- */
  {
    const k = PS({ a: "So that's exactly what happens with the composite index", b: 'So the tip is to put the column you search by most often first' });
    addQ(S(k.a, 0.12), 'composite-tip', (t) => {
      const cy = V(260, 520);
      code(t, 0, V(['CREATE INDEX idx_name', '    ON users (last_name, first_name);'], ['CREATE INDEX idx_name ON users', '  (last_name, first_name);']), L, cy, V(42, 34), { instant: true, caret: false, hl: [{ line: 1, from: 'last_name', at: k.a.w[7] }, { line: 1, from: 'first_name', at: k.a.w[8] + 0.6, box: true, col: QP.dim }] });
      setFont(FM(V(42, 34))); const ccw = ctx.measureText('M').width;
      withA(eo(t, k.a.w[7], 0.4), () => _txt('↑ sorted by this first', L + ccw * V(14, 3), cy + V(130, 120), FM(30), QP.acc));
      withA(eo(t, k.a.w[8] + 0.6, 0.4), () => _txt('↑ then by this', L + ccw * V(25, 14), cy + V(180, 170), FM(30), QP.dim));
      labA(t, k.b.t, 'The tip', L, V(560, 900), 32, QP.dim, { key: 'tip label' });
      hd(t, { lines: V(['Put the column you search', 'by most often first.'], ['Put the column', 'you search by', 'most often first.']), x: L, y: V(680, 1020), size: V(84, 84), times: pick(k.b, [5, 6, 7, 8, 9, 10, 11, 12, 13]) });
    }, { push: 0.02 });
    sT(k.a.w[7]); sT(k.a.w[8] + 0.6, -3); sHit(k.b.w[4], -6);
  }

  /* ---------------- hash ---------------- */
  {
    const k = PS({ a: 'And for the rest, there are different kinds of searches', b: 'we have the hash index', c: 'which is for exact matches only', d: "like looking up someone's login session by its exact token", e: 'it cannot do range or sorting', f: 'So most people just use B-tree' });
    addQ(S(k.a, 0.12), 'hash', (t) => {
      labA(t, k.a.t, 'The others, for special searches', L, V(150, 420), 32, QP.dim, { key: 'others label' });
      // the special ones, named first; hash is up
      ['hash', 'bitmap', 'spatial', 'full-text'].forEach((n, i) => { const a = eq(t, k.a.w[3] + i * 0.8, 0.35) * out(t, k.b.w[3] - 0.1, 0.25); if (a <= 0) return; const x = L + i * V(300, 240), y = V(560, 820);
        withA(a, () => { boxD(x, y - 70, V(280, 230), 100, a, QP.ink, 2.5); _txt(n, x + 24, y, FM(V(44, 36), 600), QP.ink); }); });
      hd(t, { lines: ['Hash index'], x: L, y: V(270, 540), size: V(100, 100), times: [k.b.w[3], k.b.w[4]] });
      body(t, k.c.t, 'Exact matches only.', L, V(350, 620), V(42, 42), QP.ink, 900, { key: 'hash sub' });
      // token -> hash() -> bucket -> the session row
      const y = V(560, 760), xs = V([L, 640, 1060, 1440], [L, L, L, L]), ys = V([y, y, y, y], [y, y + 140, y + 280, y + 420]);
      const tt0 = k.d.w[4]; const BT = [k.c.w[3], k.d.w[0], k.d.w[4], k.d.w[9]];
      const boxes = [['token', "'9f3a…c21'"], ['hash()', '→ number'], ['bucket', '3,817'], ['sessions', 'row 2,904']];
      boxes.forEach(([a, b], i) => {
        const p = eo(t, BT[i], 0.45); if (p <= 0) return; const bw = V(360, 420), bh = 110;
        panel(xs[i], ys[i] - 55, bw, bh, p, { stroke: i === 3 ? QP.acc : QP.line });
        withA(p, () => { _txt(a, xs[i] + 24, ys[i] - 14, FM(28), QP.dim); _txt(b, xs[i] + 24, ys[i] + 32, FM(V(32, 32), 600), QP.ink); });
        if (i) arrow(V([[xs[i - 1] + 360, ys[i]], [xs[i] - 6, ys[i]]], [[xs[i] + 200, ys[i - 1] + 56], [xs[i] + 200, ys[i] - 59]]), eo(t, BT[i] - 0.1, 0.4), QP.acc, 4);
      });
      // no ranges, no sorting
      const np_ = eo(t, k.e.w[3], 0.4);
      if (np_ > 0) { const yy = V(830, 1290); withA(np_, () => { _txt("WHERE token > '9f'", L, yy, FM(32), QP.dim); _txt('ORDER BY token', L + V(520, 420), yy, FM(32), QP.dim); }); seg(L, yy - 10, L + V(360, 360), yy - 10, eo(t, k.e.w[3] + 0.15, 0.3), QP.dim, 3); seg(L + V(520, 420), yy - 10, L + V(800, 700), yy - 10, eo(t, k.e.w[5], 0.3), QP.dim, 3); withA(np_, () => _txt('no ranges, no sorting', L, yy + 54, FM(30, 600), QP.ink)); }
      labA(t, k.f.w[5], 'so most people just use a B-tree', V(L + 900, L), V(884, 1385), 32, QP.ink, { key: 'hash most' });
      illus(t, tt0 + 0.5, V(W - L, W - L), V(1040, 1500), 'made-up token', { size: 30 });
    }, { push: 0.016 });
    sT(k.a.t); sHit(k.b.w[3] + 0.1, -6); [k.c.w[3], k.d.w[0], k.d.w[4], k.d.w[9]].forEach((tt, i) => sT(tt, i === 3 ? 0 : -3)); sErr(k.e.w[3] + 0.15, -6);
  }

  /* ---------------- bitmap ---------------- */
  {
    const k = PS({ a: 'A bitmap is for columns with only a few values', b: 'like a status column', c: "that's only active or inactive or banned", d: 'You mostly see it in databases that are built for reports' });
    const ST = ['active', 'banned', 'active', 'inactive', 'active', 'active', 'banned', 'inactive', 'active', 'active'];
    addQ(S(k.a, 0.12), 'bitmap', (t) => {
      hd(t, { lines: ['Bitmap index'], x: L, y: V(170, 440), size: V(100, 100), times: [k.a.w[1], k.a.w[1] + 0.1] });
      body(t, k.a.w[4], 'For columns with only a few values.', L, V(250, 520), V(42, 42), QP.ink, 1100, { key: 'bitmap sub' });
      const x0 = L, y0 = V(370, 640), rh = V(52, 40);
      withA(eo(t, k.b.w[2], 0.4), () => _txt('status', x0, y0 - 20, FM(30), QP.dim));
      ST.forEach((s, i) => withA(eo(t, k.b.w[2] + i * 0.03, 0.3), () => _txt(s, x0, y0 + 30 + i * rh, FM(V(30, 28)), QP.ink)));
      // one row of bits per value
      const vals = [['active', k.c.w[2]], ['inactive', k.c.w[4]], ['banned', k.c.w[6]]];
      const bx = V(560, 80), by = V(400, 1110), cw = V(80, 78), bh = V(110, 66);
      vals.forEach(([v, tt], r) => {
        const a = eo(t, tt, 0.4); if (a <= 0) return; const yy = by + r * bh;
        withA(a, () => _txt(v, bx, yy + 40, FM(V(30, 28), 600), v === 'banned' ? QP.acc : QP.ink));
        ST.forEach((s, i) => { const on = s === v; const bp = eo(t, tt + i * 0.03, 0.3); const xx = bx + V(200, 150) + i * cw;
          if (on && v === 'banned') themeFixed(() => withA(bp, () => frect(xx - 8, yy + 4, cw - 18, 50, QP.acc)));
          withA(bp, () => _txt(on ? '1' : '0', xx + (cw - 34) / 2 - 4, yy + 42, FM(V(34, 32), 600), on ? (v === 'banned' ? QP.accInk : QP.ink) : QP.dim, 'center')); });
      });
      if (PORTRAIT) { /* bits under the column */ }
      labA(t, k.d.w[3], 'Mostly in databases built for reports.', V(560, L), V(820, 1370), 32, QP.ink, { key: 'bitmap reports' });
      labA(t, k.d.w[8], V('You cannot create one in PostgreSQL or MySQL.', 'Not in PostgreSQL or MySQL.'), V(560, L), V(870, 1420), 30, QP.dim, { key: 'bitmap note' });
    }, { push: 0.016 });
    sHit(k.a.w[1], -7); sDraw(k.b.w[2], -3); sT(k.c.w[2]); sT(k.c.w[4], -2); sPop(k.c.w[6]);
  }

  /* ---------------- spatial ---------------- */
  {
    const k = PS({ a: 'And then we have spatial index', b: 'mostly for location data', c: 'a coffee shop near me', d: 'when a ride app looks for drivers close to you', e: 'So it\'s groups, places that are near each other on the map', f: 'the app only checks places around you', g: 'instead of every coffee shop or every restaurant in the world' });
    // made-up places on a map, in clusters
    const CL = [[0.18, 0.25], [0.72, 0.2], [0.45, 0.55], [0.15, 0.8], [0.8, 0.75]];
    const PTS = []; CL.forEach(([cx, cy], c) => { for (let i = 0; i < 9; i++) PTS.push([cx + (hash(c * 31 + i) - 0.5) * 0.18, cy + (hash(c * 17 + i * 3 + 5) - 0.5) * 0.16, c, i % 3 === 0 ? 'car' : 'cup']); });
    addQ(S(k.a, 0.12), 'spatial', (t) => {
      hd(t, { lines: ['Spatial index'], x: L, y: V(170, 440), size: V(100, 100), times: [k.a.t, k.a.w[5]] });
      body(t, k.b.t, 'For location data: what is near me?', L, V(250, 520), V(42, 42), QP.ink, 1100, { key: 'spatial sub' });
      const mx = V(860, L), my = V(300, 600), mw = V(940, W - 2 * L), mh = V(700, 660);
      panel(mx, my, mw, mh, eo(t, k.a.t - 0.1, 0.6));
      // streets: a few hairlines
      [[0, 0.33, 1, 0.38], [0, 0.66, 1, 0.6], [0.3, 0, 0.36, 1], [0.62, 0, 0.58, 1]].forEach(([a, b, c, d], i) => seg(mx + a * mw, my + b * mh, mx + c * mw, my + d * mh, eo(t, k.b.t + 0.2 + i * 0.1, 0.6), QP.line, 6));
      const me = [0.47, 0.57];
      const near = 2;
      PTS.forEach(([px, py, c, kind], i) => {
        const tt = kind === 'cup' ? k.c.w[2] : k.d.w[6]; const a = eo(t, tt + i * 0.01, 0.3); if (a <= 0) return;
        const dimmed = t > k.f.w[3] && c !== near; const x = mx + px * mw, y = my + py * mh;
        withA(a * (dimmed ? 0.3 : 1), () => { if (kind === 'cup') circle(x, y, 9, QP.ink); else { frect(x - 9, y - 9, 18, 18, QP.dim); } });
      });
      // groups: boxes around near places
      CL.forEach(([cx, cy], c) => { const p = eo(t, k.e.w[6] + c * 0.12, 0.5); const isN = c === near && t > k.f.w[3];
        boxD(mx + (cx - 0.12) * mw, my + (cy - 0.11) * mh, 0.24 * mw, 0.22 * mh, p, isN ? QP.acc : QP.dim, isN ? 4 : 2); });
      // the search area grows from you while the app checks around you
      const ra = clamp((t - k.f.w[3]) / 5); if (ra > 0) { ctx.save(); ctx.strokeStyle = QP.acc; ctx.lineWidth = 2; ctx.setLineDash([6, 8]); ctx.beginPath(); ctx.arc(mx + me[0] * mw, my + me[1] * mh, 30 + E.outCubic(ra) * 0.16 * mw, 0, Math.PI * 2); ctx.stroke(); ctx.restore(); }
      // you
      const yp = eo(t, k.c.w[3], 0.4); if (yp > 0) { themeFixed(() => withA(yp, () => { circle(mx + me[0] * mw, my + me[1] * mh, 14, QP.acc); })); withA(yp, () => _txt('you', mx + me[0] * mw + 24, my + me[1] * mh + 10, FM(30, 600), QP.acc)); }
      // legend
      const lx = L, ly = V(520, 1440);
      if (!PORTRAIT) {
        withA(eo(t, k.c.w[2], 0.3), () => { circle(lx + 10, ly - 10, 9, QP.ink); _txt('coffee shops', lx + 34, ly, FM(30), QP.dim); });
        withA(eo(t, k.d.w[6], 0.3), () => { frect(lx + 1, ly + 41, 18, 18, QP.dim); _txt('drivers', lx + 34, ly + 60, FM(30), QP.dim); });
        withA(eo(t, k.f.w[3], 0.4), () => { _txt('checks only the box', lx, ly + 170, FS(50, 600), QP.acc); _txt('around you', lx, ly + 230, FS(50, 600), QP.acc); });
        withA(eo(t, k.g.t + 0.3, 0.4), () => _txt('not every coffee shop in the world', lx, ly + 300, FM(30), QP.dim));
      } else withA(eo(t, k.f.w[3], 0.4), () => _txt('checks only the box around you', L, my + mh + 70, FS(44, 600), QP.acc));
      illus(t, k.b.t + 0.6, V(W - L, L), V(1050, my + mh + 130), 'made-up places', { size: 30 });
    }, { push: 0.012, anchor: [V(1330, 540), V(650, 1000)] });
    sHit(k.a.w[4], -7); sDraw(k.b.t, -3); sPop(k.c.w[2]); sPop(k.d.w[6], -2); sDraw(k.e.w[6], -2); sFound(k.f.w[3], -4);
  }

  /* ---------------- full-text ---------------- */
  {
    const k = PS({ a: 'And then we have the full-text index as well', b: 'It is for searching inside text', c: 'when you search an online store for wireless headphones', d: 'it finds every product description with those words in it', e: 'it works by indexing each word in the text', f: 'instead of the whole value' });
    const PROD = [['#2', 'Wireless headphones with a long battery'], ['#7', 'Wireless charging pad for phones'], ['#9', 'Over-ear headphones, wireless, foldable'], ['#14', 'Wired headphones for the studio']];
    const INV = [['wireless', '#2  #7  #9'], ['headphones', '#2  #9  #14']];
    addQ(S(k.a, 0.12), 'full-text', (t) => {
      hd(t, { lines: ['Full-text index'], x: L, y: V(170, 440), size: V(100, 96), times: [k.a.t, k.a.w[5]] });
      body(t, k.b.t, 'For searching inside text.', L, V(250, 520), V(42, 42), QP.ink, 1100, { key: 'fulltext sub' });
      // the search box (illustration)
      const sx = L, sy = V(340, 620), sw = V(760, W - 2 * L);
      const sp = eo(t, k.c.w[3], 0.4); boxD(sx, sy, sw, 76, sp, QP.ink, 2.5);
      typeText(t, k.c.w[7], 'wireless headphones', sx + 24, sy + 50, FM(34), QP.ink, { cps: 26, key: 'ft query', caretCol: QP.acc });
      // product descriptions
      PROD.forEach(([id, d], i) => {
        const y = V(520, 800) + i * V(78, 76); const a = eo(t, k.d.w[2] + i * 0.08, 0.35); if (a <= 0) return;
        const hit = (id === '#2' || id === '#9') && t > k.e.w[8] + 0.6;
        if (hit) found(sx - 10, y - 46, sw + 20, 64, eo(t, k.e.w[8] + 0.6, 0.3));
        withA(a, () => { _txt(id, sx, y, FM(28, 600), hit ? QP.accInk : QP.dim); _txt(PORTRAIT ? d.slice(0, 34) + (d.length > 34 ? '…' : '') : d, sx + 80, y, FS(V(30, 30), 400), hit ? QP.accInk : QP.ink); });
      });
      // the inverted index: each word -> the products that contain it
      const ix = V(1000, L), iy = V(520, 1120);
      withA(eo(t, k.e.w[5], 0.4), () => _txt('index: each word → products', ix, iy - 50, FM(30), QP.dim));
      INV.forEach(([w, ids], i) => { const y = iy + i * 90; const a = eo(t, k.e.w[5] + 0.2 + i * 0.25, 0.4); if (a <= 0) return;
        withA(a, () => { _txt(w, ix, y, FM(V(34, 32), 600), QP.ink); _txt(ids, ix + V(250, 260), y, FM(V(34, 32)), QP.ink); }); hline(ix, y + 26, V(760, W - 2 * L), a, QP.line, 1.5); });
      const bp = eo(t, k.e.w[8] + 0.6, 0.4); if (bp > 0) withA(bp, () => _txt('both words: #2, #9', ix, iy + V(220, 200), FS(V(48, 44), 600), QP.acc));
      labA(t, k.f.w[2], 'each word, not the whole value', ix, iy + V(280, 256), 30, QP.dim, { key: 'ft each' });
      illus(t, k.c.w[3] + 0.5, V(W - L, W - L), V(1050, 1500), 'made-up store', { size: 30 });
    }, { push: 0.014 });
    sHit(k.a.w[4], -7); sfxType(k.c.w[7], 19, 26); sPop(k.d.w[2], -3); sT(k.e.w[5] + 0.2); sT(k.e.w[5] + 0.45, -2); sFound(k.e.w[8] + 0.6, -4);
  }

  /* ---------------- covering, partial: named ---------------- */
  {
    const k = PS({ a: "And there's also covering index and partial index" });
    addQ(S(k.a, 0.12), 'covering-partial', (t) => {
      labA(t, k.a.t, 'Also out there', L, V(380, 760), 32, QP.dim, { key: 'also label' });
      hd(t, { lines: V(['Covering index.', 'Partial index.'], ['Covering index.', 'Partial index.']), x: L, y: V(520, 900), size: V(96, 96), times: [k.a.t, k.a.w[4], k.a.w[6], k.a.w[7]] });
      labA(t, k.a.w[7] + 0.4, 'Not in this video', L, V(800, 1180), 30, QP.dim, { key: 'also not' });
    });
    sPop(k.a.w[3]); sPop(k.a.w[6], -2);
  }

  /* ---------------- clustered ---------------- */
  {
    const k = PS({ a: 'You also hear about clustered and non-clustered indexes', b: 'the difference between those is very simple', c: 'The clustered index decides the order', d: "the table's rows are actually stored", e: 'Think of this as a phone book again', f: 'the data itself is sorted by surname', g: 'once you find the name, you find everything', h: 'A table can only have one clustered index', i: 'the rows can only be stored in one order' });
    const PPL = [['Okafor', 'Ada', '+372 5…', 'Tartu'], ['Adeyemi', 'Bisi', '+234 8…', 'Lagos'], ['Williams', 'Ben', '+44 7…', 'Leeds'], ['Eze', 'Ngozi', '+234 9…', 'Enugu'], ['Kask', 'Mari', '+372 5…', 'Tallinn'], ['Bello', 'Sade', '+234 7…', 'Abuja']];
    const order = PPL.map((r, i) => [r[0], i]).sort((a, b) => a[0] < b[0] ? -1 : 1).map(x => x[1]);
    addQ(S(k.a, 0.12), 'clustered', (t) => {
      hd(t, { lines: V(['Clustered index'], ['Clustered index']), x: L, y: V(170, 440), size: V(100, 96), times: [k.c.w[1], k.c.w[2]] });
      withA(eo(t, k.a.w[4], 0.4) * out(t, k.c.w[1] - 0.2), () => txt('Clustered vs non-clustered', L, V(170, 440), FS(V(80, 64), 600), QP.ink, 'left', 'alphabetic', 0, 'clustered vs'));
      body(t, k.c.w[3], 'It decides the order the rows are stored in.', L, V(250, 520), V(42, 40), QP.ink, V(1500, W - 2 * L), { key: 'clustered sub' });
      const tx = L, ty = V(400, 700), rh = V(70, 74), cols = V([360, 300, 360, 300], [260, 200, 0, 240]);
      const tw_ = cols.reduce((a, b) => a + b, 0);
      withA(eo(t, k.b.t, 0.4), () => { _txt('table rows, as stored on disk', tx, ty - 30, FM(30), QP.dim); });
      hline(tx, ty, tw_, eo(t, k.b.t, 0.6), QP.line, 2);
      const sortP = em(t, k.d.w[3], 1.0);
      PPL.forEach((r, i) => {
        const si = order.indexOf(i); const y = ty + lerp(i, si, sortP) * rh + rh * 0.66;
        const hit = i === 0 && t > k.g.w[3];
        if (hit) found(tx - 10, y - rh * 0.68, tw_ + 20, rh * 0.86, eo(t, k.g.w[3], 0.3));
        withA(eo(t, k.b.t + i * 0.05, 0.35), () => { let x = tx; r.forEach((v, j) => { if (cols[j] > 0) _txt(v, x, y, FM(V(32, 30), j === 0 ? 600 : 400), hit ? QP.accInk : (j === 0 ? QP.ink : QP.dim)); x += cols[j]; }); });
      });
      for (let i = 1; i <= 6; i++) hline(tx, ty + i * rh, tw_, eo(t, k.b.t + i * 0.04, 0.5), QP.line, 1.5);
      withA(eo(t, k.f.w[5], 0.4), () => _txt('sorted by surname: the data itself', tx, ty + 6 * rh + 50, FM(30, 600), QP.ink));
      withA(eo(t, k.g.w[6], 0.4), () => _txt('found the name = found the whole row', tx + V(700, 0), V(ty + 6 * rh + 50, ty + 6 * rh + 100), FM(30, 600), QP.acc));
      const op = eo(t, k.h.w[4], 0.4);
      if (op > 0) withA(op, () => { _txt('1 per table', V(1480, L), V(260, 1320), FS(V(64, 52), 600), QP.ink); });
      if (!PORTRAIT) labA(t, k.i.w[7], 'one order on disk, so one clustered index', 1480, 310, 30, QP.dim, { key: 'clustered one' });
      labA(t, k.c.w[3] + 0.6, V('MySQL (InnoDB) and SQL Server. PostgreSQL keeps none.', 'MySQL, SQL Server. Not PostgreSQL.'), L, V(1000, 1380), 30, QP.dim, { key: 'clustered db note' });
      illus(t, k.b.t + 0.8, V(W - L, W - L), V(1040, 1500), 'made-up people', { size: 30 });
    }, { push: 0.012 });
    sHit(k.c.w[1] + 0.067, -7); sDraw(k.b.t, -3); sSwipe(k.d.w[3] + 0.3, -2); sPage(k.e.w[4], -3); sFound(k.g.w[3], -4); sT(k.h.w[4]);
  }

  /* ---------------- non-clustered ---------------- */
  {
    const k = PS({ a: 'A non-clustered index is a separate structure', b: 'that points back to the row', c: 'Think of that as the index at the back of the book', d: 'it tells you where to go', e: 'So a table can have lots of non-clustered indexes', f: 'So this is the difference' });
    addQ(S(k.a, 0.12), 'non-clustered', (t) => {
      hd(t, { lines: ['Non-clustered index'], x: L, y: V(170, 440), size: V(100, 84), times: [k.a.w[1], k.a.w[2]] });
      body(t, k.a.w[4], 'A separate structure that points back to the row.', L, V(250, 520), V(42, 40), QP.ink, V(1500, W - 2 * L), { key: 'nonclustered sub' });
      // the table (right), three indexes (left), each pointing back
      const tx = V(1120, 560), ty = V(380, 700), rh = V(64, 64), tw_ = V(680, 440);
      const rows = ['Adeyemi, Bisi', 'Bello, Sade', 'Eze, Ngozi', 'Kask, Mari', 'Okafor, Ada', 'Williams, Ben'];
      withA(eo(t, k.a.t, 0.4), () => _txt('table', tx, ty - 24, FM(30), QP.dim));
      rows.forEach((r, i) => { withA(eo(t, k.a.t + i * 0.04, 0.3), () => _txt(r, tx, ty + i * rh + rh * 0.66, FM(V(30, 26)), QP.ink)); hline(tx, ty + (i + 1) * rh, tw_, eo(t, k.a.t + i * 0.04, 0.4), QP.line, 1.5); });
      const IX = [['email', k.a.w[4], [0, 4, 5]], ['city', k.e.w[4], [1, 2, 3]], ['created_at', k.e.w[6], [3, 4, 5]]];
      const ENT = [['bisi@email.com', 'ada@email.com', 'ben@email.com'], ['Abuja', 'Enugu', 'Tallinn'], ['2026-01-04', '2026-02-11', '2026-03-09']];
      IX.forEach(([name, tt, ptr], j) => {
        const x = L, y = V(370 + j * 215, 700 + j * 230), w = V(420, 360), h = 180; const p = eo(t, tt, 0.5); if (p <= 0) return;
        panel(x, y, w, h, p);
        withA(p, () => _txt('index on ' + name, x + 22, y + 44, FM(V(28, 26), 600), QP.ink));
        ptr.forEach((r, m) => { const yy = y + 86 + m * 32; withA(p, () => _txt(ENT[j][m], x + 22, yy + 4, FM(28), QP.ink)); poly([[x + w, yy - 5], [tx - 16, ty + r * rh + rh / 2]], eo(t, tt + 0.3 + m * 0.08, 0.5), j === 0 && m === 1 ? QP.acc : QP.faint, j === 0 && m === 1 ? 3 : 1.5); });
      });
      labA(t, k.c.w[4], 'like the index at the back of a book', L, V(1040, 1376), 30, QP.ink, { key: 'nonclustered book' });
      labA(t, k.e.w[5], 'a table can have lots', V(1120, 470), V(800, 1130), 32, QP.ink, { key: 'nonclustered lots' });
      labA(t, k.f.t, 'clustered: 1. non-clustered: many.', V(1120, L), V(900, 1436), 30, QP.ink, { key: 'nonclustered recap' });
    }, { push: 0.012 });
    sDraw(k.a.w[4], -2); sT(k.b.w[3]); sPop(k.e.w[4]); sPop(k.e.w[6], -2);
  }
}
