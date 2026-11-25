/* database-indexes film, part 1: the open, chapter 01 (without an index) and chapter 02 (what an index is). */
'use strict';

// made-up books rows (illustration): author ids 1..60, every 23rd row by author 42
const authorOf = (id) => { if (id % 23 === 0) return 42; const a = (Math.floor(hash(id) * 97) % 60) + 1; return a === 42 ? 41 : a; };
const bookRow = (id) => [fmt(id), 'book #' + String(id).padStart(6, '0'), String(authorOf(id))];

function buildS1() {
  /* ---------------- open: the table grows, the app slows down ---------------- */
  {
    const k = PS({ a: 'As you get more users', b: 'your database grows', c: 'your tables get bigger', d: 'Now it might take a little bit longer', e: 'for your app to load', f: 'performance issues' });
    const tEnd = P('One thing that you can always use', { peek: true }).t;
    addQ(0, 'open-grows', (t) => {
      const tx = L, ty = V(250, 400), tw = V(820, W - 2 * L), th = V(640, 440);
      // the books table frame: header row + rows that get denser as the count climbs (the table "gets bigger")
      const p0 = eo(t, 0.05, 0.55);
      withA(eo(t, 0.1, 0.4), () => _txt('books', tx, ty - 22, FM(32, 600), QP.ink));
      boxD(tx, ty, tw, th, p0, QP.line, 2);
      const g = clamp((t - k.b.t) / (k.c.e + 0.6 - k.b.t)); const n = Math.round(1000 * Math.pow(1000, E.inOutCubic(g)));
      const rows = Math.round(lerp(8, 64, E.inOutCubic(g)));
      for (let i = 1; i < rows; i++) { const y = ty + th * i / rows; hline(tx, y, tw, eo(t, 0.2 + i * 0.01, 0.4), i % 8 === 0 ? QP.faint : QP.line, 1.5); }
      // row count
      const cx = V(tx + tw + 70, tx), cy = V(ty + 130, ty + th + 130);
      withA(eo(t, k.a.t, 0.4), () => { bigNum(fmt(n), cx, cy, V(96, 104)); _txt('rows', cx + 6, cy + 54, FM(32), QP.dim); });
      MOTION.expect('row count lands on 1,000,000', k.c.e + 0.6, { state: 'rows', value: 1000000, tol: 3 });
      if (n === 1000000) MOTION.state('rows', 1000000);
      // the app: a page loading (the query running); fast at first, then it crawls
      const ax = V(tx + tw + 70, L), ay = V(ty + 300, ty + th + 220), aw = V(W - L - (tx + tw + 70), W - 2 * L), ah = V(300, 280);
      const pa = eo(t, k.d.t - 0.1, 0.55);
      if (pa > 0) {
        panel(ax, ay, aw, ah, pa);
        withA(pa, () => { lab('yourapp.com', ax + 28, ay + 52, 30, QP.dim, { key: 'open url' }); hline(ax, ay + 80, aw, pa, QP.line, 2); });
        const lp = clamp((t - k.e.t) / 0.5); const crawl = clamp((t - k.e.t - 0.5) / 6);
        const fill = lp < 1 ? 0.55 * E.outCubic(lp) : 0.55 + 0.27 * Math.sqrt(crawl);
        hline(ax, ay + 80, aw * fill, 1, QP.acc, 6);
        // placeholder blocks of a page that has not arrived yet
        withA(pa * 0.9, () => { frect(ax + 28, ay + 118, aw * 0.42, 22, QP.ghost); frect(ax + 28, ay + 160, aw * 0.7, 16, QP.ghost); frect(ax + 28, ay + 192, aw * 0.6, 16, QP.ghost); });
        labA(t, k.f.t, 'still loading…', ax + 28, ay + ah - 34, 30, QP.dim, { key: 'open loading' });
      }
      illus(t, 1.0, L, V(H - 60, 1420));
    }, { push: 0.018 });
    sDraw(0.08); sRiffle(k.b.t, -3); sDraw(k.d.t - 0.1, -2); sT(k.e.t + 0.02);
  }

  /* ---------------- one fix: a database index ---------------- */
  {
    const k = PS({ a: 'One thing that you can always use to fix this', b: 'is a database index' });
    addQ(S(k.a, 0.1), 'open-fix', (t) => {
      labA(t, k.a.t, 'for slow lookups', L, V(400, 620), 32, QP.dim, { key: 'fix label' });
      hd(t, { lines: V(['A database index.'], ['A database', 'index.']), x: L, y: V(520, 760), size: V(132, 128), times: [k.b.w[1], k.b.w[2], k.b.w[3]] });
      // a small B-tree draws itself to the right: the star of the film
      const bx = V(1380, CX), by = V(380, 1000), s = V(1, 1.05);
      withT(bx, by, s, 0, () => {
        const t0 = k.b.w[3] + 0.1;
        const r = bnode(0, 0, ['', ''], 90, 54, eo(t, t0, 0.5));
        const xs = [-230, 0, 230];
        xs.forEach((x, i) => { seg(r.ptr(i)[0], 54, x, 170, eo(t, t0 + 0.25 + i * 0.07, 0.4), QP.dim, 2); bnode(x, 170, ['', ''], 70, 46, eo(t, t0 + 0.45 + i * 0.1, 0.5)); });
        poly([[r.ptr(0)[0], 54], [xs[0], 170]], eo(t, t0 + 1.1, 0.5), QP.acc, 5);
        themeFixed(() => withA(eo(t, t0 + 1.5, 0.2), () => frect(xs[0] - 70 + 5, 175, 60, 36, QP.acc)));
      });
    }, { push: 0.02 });
    sHit(k.b.w[2]); sDraw(k.b.w[3] + 0.1); sFound(k.b.w[3] + 1.55, -3);
  }

  /* ---------------- what this video covers ---------------- */
  {
    const k = PS({ a: 'In this video', b: 'what your database does when there is no index', c: 'what an index actually is', d: 'how it helps find things so fast', e: 'the different types of indexes', f: 'the mistakes that people make' });
    const items = [['01', 'Without an index: what the database does', k.b.t], ['02', 'What an index actually is', k.c.t], ['03', 'How it finds one row so fast', k.d.t], ['04', 'The types of indexes', k.e.t], ['05', 'Mistakes that stop an index working', k.f.t]];
    addQ(S(k.a, 0.15), 'agenda', (t) => {
      const y0 = V(240, 470), rh = V(150, 180), size = V(54, 50);
      labA(t, k.a.t, 'In this video', L, y0 - 70, 32, QP.dim, { key: 'agenda label' });
      let last = -1;
      items.forEach(([n, s, ti], i) => {
        const y = y0 + i * rh; const a = eq(t, ti, 0.45); if (a <= 0) return; last = i;
        withA(a, () => { _txt(n, L, y + 40, FM(32), QP.dim); withT(0, (1 - a) * 16, 1, 0, () => txtW(s, L + V(110, 90), y + 40, FS(size, 500), QP.ink, V(1500, W - L * 2 - 100), size * 1.15)); });
        hline(L, y + rh - V(60, 40), V(1700, W - 2 * L), eo(t, ti + 0.1, 0.6), QP.line, 2);
      });
      // the yellow square (where the query is) steps to the newest item
      if (last >= 0) {
        const yy = (i) => y0 + i * rh + 40 - 22; let y = yy(0);
        for (let i = 1; i <= last; i++) y = lerp(y, yy(i), em(t, items[i][2] - 0.05, 0.45));
        themeFixed(() => frect(L - 46, y + 8, 16, 16, QP.acc));
      }
    }, { push: 0.02 });
    items.forEach(([, , ti], i) => sT(ti + 0.067, -2));
  }

  /* ---------------- chapter 01: without an index ---------------- */
  {
    const k = PS({ a: 'To understand why a database index matters', b: 'what your database does without an index' });
    addQ(S(k.a, 0.15), 'ch1', (t) => {
      chapterCard(t, k.a.t, '01 / 05', 'Without an index');
      body(t, k.b.t, 'What does the database do?', L, V(640, 1060), V(44, 44), QP.dim, V(1400, W - 2 * L), { key: 'ch1 sub' });
    });
    sChapter(k.a.t + 0.05);
  }

  /* ---------------- the bookstore table + the query ---------------- */
  const Q42 = ['SELECT * FROM books WHERE author_id = 42;'];
  const Q42p = ['SELECT * FROM books', 'WHERE author_id = 42;'];
  {
    const k = PS({ a: 'Say we have a bookstore', b: 'the books table', c: 'has a million rows', d: 'we run this query' });
    addQ(S(k.a, 0.12), 'books-table', (t) => {
      const tx = L, ty = V(380, 700), cols = V([{ w: 260, h: 'id' }, { w: 420, h: 'title' }, { w: 220, h: 'author_id' }], [{ w: 260, h: 'id' }, { w: 400, h: 'title' }, { w: 220, h: 'author_id' }]);
      withA(eo(t, k.b.t, 0.4), () => _txt('books', tx, ty - 70, FM(34, 600), QP.ink));
      table(tx, ty, cols, V(12, 8), (i) => bookRow(i + 1), { p: eo(t, k.b.t, 0.9), rh: V(46, 52), size: V(28, 30) });
      const nx = V(1240, L), ny = V(600, 1290);
      withA(eq(t, k.c.w[2], 0.45), () => { bigNum('1,000,000', nx, ny, V(108, 112)); _txt('rows', nx + 6, ny + 56, FM(32), QP.dim); });
      code(t, k.d.w[2] + 0.1, V(Q42, Q42p), L, V(190, 470), V(38, 34));
      illus(t, k.b.t + 0.6, V(L, L), V(1000, 1480), 'made-up rows');
    });
    sDraw(k.b.t); sPop(k.c.w[2]); sCode(k.d.w[2] + 0.1, V(Q42, Q42));
    MOTION.expect('the query types on "we run this query"', k.d.w[2] + 0.15, { el: 'books-table/code ' + Q42[0], aspect: '16x9', tol: 4 });
  }

  /* ---------------- no idea where author 42's books are ---------------- */
  {
    const k = PS({ a: 'Without an index, the database has no idea', b: "where author 42's books are", c: 'so it does the only thing it can do' });
    addQ(S(k.a, 0.12), 'no-idea', (t) => {
      code(t, 0, V(Q42, Q42p), L, V(190, 470), V(38, 34), { instant: true, caret: false, hl: [{ line: V(0, 1), from: 'author_id = 42', at: k.b.w[1] }] });
      // the whole table as a strip of a million rows (each hairline = 5,000 rows)
      const sx = V(L, L), sy = V(330, 680), sw = V(1100, W - 2 * L), sh = V(560, 600), n = 120;
      for (let i = 0; i < n; i++) { const x = sx + sw * i / n; seg(x, sy, x, sy + sh, eo(t, 0.05 + i * 0.004, 0.35), i % 10 === 0 ? QP.faint : QP.line, 2); }
      withA(eo(t, 0.2, 0.4), () => { _txt('row 1', sx, sy + sh + 46, FM(30), QP.dim); _txt('row 1,000,000', sx + sw, sy + sh + 46, FM(30), QP.dim, 'right'); });
      // where are they? question marks over the strip, nowhere in particular
      const qs = [0.13, 0.31, 0.52, 0.68, 0.86];
      qs.forEach((q, i) => withA(eq(t, k.b.t + i * 0.12, 0.35) * out(t, k.c.t + 0.6), () => _txt('42 ?', sx + sw * q, sy - 24, FM(34, 600), QP.dim, 'center')));
      // the only thing it can do: start at row 1
      const cp = eo(t, k.c.w[6], 0.5);
      if (cp > 0) { themeFixed(() => { frect(sx - 4, sy - 10, 8, sh + 20, QP.acc); }); withA(cp, () => _txt('start here', sx + 24, sy + sh / 2, FM(32, 600), QP.acc)); }
      const rx = V(1300, L), ry = V(560, 1420);
      body(t, k.a.w[3] + 0.1, 'No map of where the 42s are.', rx, ry, V(40, 42), QP.ink, V(500, W - 2 * L), { key: 'no map' });
    });
    sT(k.b.w[1]); sPop(k.c.w[6], -2);
  }

  /* ---------------- full table scan (A1) ---------------- */
  {
    const k = PS({ a: 'It starts at the first row', b: 'it checks every single row', c: 'all one million of them', d: 'full table scan' });
    const tEnd = k.c.e + 0.3;
    addQ(S(k.a, 0.1), 'full-scan', (t) => {
      code(t, 0, V(Q42, Q42p), L, V(190, 470), V(34, 32), { instant: true, caret: false });
      const tx = L, ty = V(330, 660), tw = V(1000, W - 2 * L), rh = V(42, 46), nr = V(14, 10);
      const cnt = Math.min(1e6, 1e6 * Math.pow(clamp((t - k.a.t) / (tEnd - k.a.t)), 1.25)); const cur = Math.max(1, Math.floor(cnt));
      _txt('id'.padEnd(12) + 'title'.padEnd(20) + 'author_id', tx, ty - 16, FM(28), QP.dim);
      hline(tx, ty, tw, 1, QP.line, 2);
      const curRow = 6;
      for (let i = 0; i < nr; i++) {
        const id = Math.max(1, cur - curRow) + i; const a = authorOf(id); const above = i < curRow;
        const isHit = a === 42 && above;
        if (id > 1e6) continue;
        _txt(`${fmt(id).padEnd(12)}${('book #' + String(id).padStart(6, '0')).padEnd(20)}${a}`, tx, ty + i * rh + rh * 0.68, FM(V(28, 28)), isHit ? QP.acc : above ? QP.dim : QP.ink);
        hline(tx, ty + (i + 1) * rh, tw, 1, QP.line, 1);
      }
      if (t >= k.a.t) boxD(tx - 8, ty + curRow * rh, tw + 16, rh, 1, QP.acc, 3);
      const nx = V(1240, L), ny = V(560, 1250);
      if (t >= k.a.t - 0.1) { bigNum(fmt(cnt), nx, ny, V(120, 112)); _txt('rows checked / 1,000,000', nx + 4, ny + 54, FM(30), QP.dim); hline(nx, ny + 92, V(540, W - 2 * L), 1, QP.line, 10); hline(nx, ny + 92, V(540, W - 2 * L) * cnt / 1e6, 1, QP.acc, 10); }
      if (cnt >= 1e6) MOTION.state('scan done', true);
      hd(t, { lines: ['Full table scan'], x: V(1240, L), y: V(330, 400), size: V(84, 84), times: [k.d.w[0], k.d.w[1], k.d.w[2]] });
      illus(t, k.a.t + 0.5, L, V(1000, 1470), 'made-up rows');
    }, { push: 0.012 });
    sRiffle(k.a.t); sDing(tEnd, -4); sHit(k.d.w[0], -3);
    MOTION.expect('counter hits 1,000,000 as she says "of them"', tEnd, { state: 'scan done', tol: 3 });
  }

  /* ---------------- 100 rows vs a million rows ---------------- */
  {
    const k = PS({ a: 'And in many cases', b: 'very problematic', c: 'When your table has maybe 10, 100 rows', d: "maybe it wouldn't be a problem", e: 'but at a million rows', f: "then it's a problem" });
    addQ(S(k.a, 0.1), 'scale', (t) => {
      hd(t, { lines: ['Very problematic.'], x: L, y: V(200, 460), size: V(80, 84), times: [k.b.w[0], k.b.w[1]], out: k.c.t });
      // a block of 100 rows (10 x 10 cells), read in a blink; then the camera pulls back: it is one cell of a million
      const fx = V(1040, 190), fy = V(150, 520), F_ = V(800, 700);
      const zoom = em(t, k.e.t, 1.1);      // 0: the 100 block fills the field; 1: it is 1/100 of the field
      const cell = lerp(F_ / 10, F_ / 1000, zoom);
      const bp = eo(t, k.c.w[6], 0.5);
      // the 100-row block
      for (let i = 0; i <= 10; i++) { const c = i * cell * 10 / 10; seg(fx + i * cell, fy, fx + i * cell, fy + cell * 10, bp, QP.line, 2); seg(fx, fy + i * cell, fx + cell * 10, fy + i * cell, bp, QP.line, 2); }
      const sweep = eo(t, k.d.t, 0.45);
      withA(0.9, () => frect(fx, fy, cell * 10 * sweep, cell * 10, QP.slab));
      // the million-row field (100 x 100 blocks of 100 rows)
      if (zoom > 0) {
        const fp = zoom;
        for (let i = 0; i <= 100; i += 1) { const x = fx + F_ * i / 100; withA(fp * (i % 10 === 0 ? 1 : 0.55), () => { frect(x - 0.75, fy, 1.5, F_, QP.line); frect(fx, fy + F_ * i / 100 - 0.75, F_, 1.5, QP.line); }); }
        boxD(fx, fy, F_, F_, fp, QP.faint, 2);
        // a slow scan begins across the million
        const s2 = clamp((t - k.f.t) / 30);
        withA(0.9, () => { const rows = Math.floor(s2 * 100); frect(fx, fy + F_ / 100, F_ * (s2 * 100 - rows), F_ / 100, QP.slab); });
      }
      const lx = L, ly = V(560, 1310);
      withA(eq(t, k.c.w[6], 0.4) * out(t, k.e.t), () => { bigNum('100 rows', lx, ly, V(92, 92)); });
      withA(eo(t, k.d.t + 0.1, 0.4) * out(t, k.e.t), () => _txt('read in a blink', lx + 4, ly + 64, FM(32), QP.dim));
      withA(eq(t, k.e.w[3], 0.45), () => { bigNum('1,000,000 rows', lx, ly, V(92, 84)); });
      labA(t, k.f.t, '10,000 times more to read', lx + 4, ly + 64, 32, QP.dim, { key: 'scale 10000' });
      illus(t, k.c.t + 0.5, L, V(1000, 1440));
    }, { push: 0 });
    sT(k.c.w[6]); sSwipe(k.e.t + 0.5); sHit(k.f.t, -4);
  }

  /* ---------------- chapter 02: what is a database index ---------------- */
  {
    const k = PS({ a: 'What is a database index', b: 'how does it solve this problem' });
    addQ(S(k.a, 0.15), 'ch2', (t) => {
      chapterCard(t, k.a.t, '02 / 05', 'What is a database index?', { lines: ['What is a', 'database index?'], times: [k.a.w[0], k.a.w[1], k.a.w[2], k.a.w[3], k.a.w[4]] });
      body(t, k.b.t, 'And how does it make finding rows fast?', L, V(780, 1120), 44, QP.dim, V(1400, W - 2 * L), { key: 'ch2 sub' });
    });
    sChapter(k.a.t + 0.05);
  }

  /* ---------------- the index at the back of a book ---------------- */
  const IDX = [['B-tree', '54, 61'], ['clustered index', '88'], ['composite index', '70'], ['EXPLAIN', '40'], ['foreign key', '102'], ['full table scan', '12'], ['hash index', '77'], ['pointer', '23, 31'], ['primary key', '66'], ['Seq Scan', '41']];
  {
    const k0 = P('The easiest way to think about it');
    const k = PS({ a: 'the index at the back of a book', b: 'find every page that mentions a particular word', c: "you don't read the whole book from the beginning", d: 'You go to the index at the back', e: 'sorted alphabetically', f: 'you find the word', g: 'it tells you the page number' });
    addQ(S(k0, 0.12), 'book-index', (t) => {
      // the book: 120 pages as a strip; reading from page 1 crawls, then is dropped
      const bx = L, by = V(260, 1180), bw = V(760, W - 2 * L), bh = V(140, 120), np = 120;
      withA(eo(t, k.b.t - 0.2, 0.4), () => _txt('the book · 120 pages', bx, by - 22, FM(30), QP.dim));
      for (let i = 0; i <= np; i += 1) seg(bx + bw * i / np, by, bx + bw * i / np, by + bh, eo(t, k.b.t - 0.2 + i * 0.003, 0.35), i % 10 === 0 ? QP.faint : QP.line, 1.5);
      const crawl = clamp((t - k.c.t) / 8) * out(t, k.d.t, 0.25);
      if (t > k.c.t) withA(out(t, k.d.t, 0.25), () => { frect(bx, by + bh + 10, bw * crawl, 6, QP.dim); _txt('reading from page 1…', bx, by + bh + 52, FM(30), QP.dim); });
      // the index page
      const ix = V(1040, L), iy = V(130, 380), iw = V(760, W - 2 * L), ih = V(860, 720), rh = V(66, 56);
      const pp = eo(t, k.a.w[1], 0.6);
      panel(ix, iy, iw, ih, pp);
      withA(pp, () => { _txt('INDEX', ix + 40, iy + 72, FM(34, 600), QP.ink); hline(ix + 40, iy + 96, iw - 80, pp, QP.ink, 2); });
      IDX.forEach(([w, n], i) => {
        const y = iy + 150 + i * rh; const a = eo(t, k.a.w[1] + 0.3 + i * 0.05, 0.35); if (a <= 0) return;
        const hit = w === 'full table scan'; const fp = hit ? eo(t, k.f.w[2], 0.3) : 0;
        if (fp > 0) found(ix + 28, y - rh * 0.62, iw - 56, rh * 0.86, fp);
        withA(a, () => {
          const col = fp > 0.5 ? QP.accInk : QP.ink; _txt(w, ix + 40, y, FS(V(32, 30), fp > 0.5 ? 600 : 400), col); _txt(n, ix + iw - 40, y, FM(V(30, 28), fp > 0.5 ? 600 : 400), col, 'right');
          setFont(FS(V(32, 30), 400)); const w1 = ctx.measureText(w).width; setFont(FM(V(30, 28))); const w2 = ctx.measureText(n).width;
          for (let x = ix + 52 + w1; x < ix + iw - 52 - w2; x += 14) frect(x, y - 4, 3, 3, fp > 0.5 ? QP.accInk : QP.faint);
        });
      });
      // sorted A -> Z rail
      withA(eo(t, k.e.t, 0.4), () => { seg(ix + iw + V(30, -20), iy + 130, ix + iw + V(30, -20), iy + 150 + 9 * rh, eo(t, k.e.t, 0.6), QP.dim, 2); _txt('A', ix + iw + V(46, -36), iy + 140, FM(30), QP.dim); _txt('Z', ix + iw + V(46, -36), iy + 150 + 9 * rh, FM(30), QP.dim); });
      // the page number points into the book: page 12 lights up
      const gp = eo(t, k.g.w[4], 0.6);
      if (gp > 0) {
        const pgx = bx + bw * 12 / np, ey = iy + 150 + 5 * rh - 10;
        arrow(V([[ix - 10, ey], [pgx, ey], [pgx, by + bh + 8]], [[pgx, iy + ih + 6], [pgx, by - 8]]), gp, QP.acc, 3);
        themeFixed(() => withA(eo(t, k.g.w[4] + 0.5, 0.25), () => frect(pgx - 3, by, 7, bh, QP.acc)));
        withA(eo(t, k.g.w[4] + 0.55, 0.3), () => _txt('page 12', pgx + 16, V(by + bh + 52, by - 30), FM(32, 600), QP.acc));
      }
      illus(t, k.a.w[1] + 0.6, V(1040, L), V(1040, 1470), 'an imagined database book');
    });
    sPage(k.a.w[1]); sRiffle(k.c.t, -4); sPage(k.d.t + 0.1, -2); sFound(k.f.w[2] + 0.04); sT(k.g.w[4] + 0.5);
  }

  /* ---------------- a database index works the same way: copy the column, sort it, keep pointers ---------------- */
  const VALS = [17, 42, 3, 25, 42, 8, 31, 42];
  {
    const k = PS({ a: 'A database index works the same way', b: "It's a separate structure", c: 'stores the values from a column', d: 'in sorted order', e: 'it keeps a pointer', f: 'to where that row actually lives' });
    addQ(S(k.a, 0.12), 'same-way', (t) => {
      hd(t, { lines: V(['A database index works the same way.'], ['A database index', 'works the same way.']), x: L, y: V(150, 440), size: V(64, 64), times: TM(k.a, 7) });
      const rh = V(64, 68), y0 = V(330, 680);
      // the table (right)
      const tx = V(820, 470), cols = V([{ w: 130, h: 'row' }, { w: 400, h: 'title' }, { w: 220, h: 'author_id' }], [{ w: 110, h: 'row' }, { w: 230, h: 'title' }, { w: 200, h: 'author_id' }]);
      const vcol = tx + cols[0].w + cols[1].w;
      table(tx, y0, cols, 8, (i) => [String(i + 1), V('book #' + String(i * 7 + 3).padStart(6, '0'), 'book ' + (i * 7 + 3)), ''], { p: eo(t, S(k.a, 0.1), 0.8), rh, size: V(30, 30) });
      // the index (left): a separate structure
      const ixx = L, iw = V(470, 300);
      const ip = eo(t, k.b.w[2], 0.6);
      panel(ixx - 20, y0 - 10, iw, 8 * rh + 20, ip);
      withA(ip, () => _txt('index on author_id', ixx - 20, y0 - 30, FM(30), QP.dim));
      const order = VALS.map((v, i) => [v, i]).sort((a, b) => a[0] - b[0] || a[1] - b[1]);
      const tc = k.c.w[3], ts = k.d.w[1];
      VALS.forEach((v, i) => {
        const si = order.findIndex(o => o[1] === i);
        const cy = y0 + i * rh + rh * 0.68;
        // value in the table
        _txt(String(v), vcol, cy, FM(30), v === 42 ? QP.ink : QP.ink);
        // copy flies to the index (in table order), then sorts
        const fly = em(t, tc, 0.6); if (fly <= 0) return;
        const sy = y0 + si * rh + rh * 0.68; const yy = lerp(cy, sy, em(t, Math.max(ts, tc + 0.7), 0.7));
        const xx = lerp(vcol, ixx + 10, fly);
        _txt(String(v), xx, yy, FM(30, 600), QP.ink);
        // pointer back to its row
        const pp = eo(t, k.e.w[3] + si * 0.08, 0.5);
        if (pp > 0) {
          const hot = v === 42 && t > k.f.t;
          withA(pp, () => _txt('→ row ' + (i + 1), ixx + V(110, 70), sy, FM(V(28, 28)), hot ? QP.acc : QP.dim));
          poly([[ixx + iw - 30, sy - 9], [tx - 16, cy - 9]], pp, hot ? QP.acc : QP.faint, hot ? 3 : 1.5);
        }
      });
      withA(eo(t, ts, 0.4), () => _txt('sorted', ixx - 20, y0 + 8 * rh + 50, FM(30, 600), QP.ink));
      illus(t, k.b.t, V(820, 470), V(1000, 1440), 'made-up rows');
    });
    sDraw(k.b.w[2]); sCard(k.c.w[3]); sSwipe(k.d.w[1]); sDraw(k.e.w[3], -2); sT(k.f.t + 0.05);
  }

  /* ---------------- smaller than the table ---------------- */
  {
    const k = PS({ a: 'it only stores the column and the pointer', b: "so it's way much more smaller than the table" });
    addQ(S(k.a, 0.6), 'smaller', (t) => {
      const y1 = V(330, 560), cols = V(['id', 'title', 'author_id', 'price', 'published', 'stock'], ['id', 'title', 'author_id', '…']), cw = V(200, 230);
      withA(eo(t, 0, 0.3), () => _txt('table: every column', L, y1 - 30, FM(30), QP.dim));
      cols.forEach((c, i) => { const p = eo(t, 0.02 + i * 0.05, 0.4); const x = L + i * cw; boxD(x, y1, cw, V(260, 260), p, i === 2 ? QP.ink : QP.line, 2); withA(p, () => _txt(c, x + 14, y1 + 44, FM(V(28, 28)), i === 2 ? QP.ink : QP.dim)); });
      const y2 = V(720, 1000);
      withA(eo(t, k.a.w[4], 0.3), () => _txt('index: the column + a pointer', L, y2 - 30, FM(30), QP.dim));
      const ip = eo(t, k.a.w[4], 0.5); boxD(L, y2, cw, V(260, 260), ip, QP.acc, 3); boxD(L + cw, y2, V(140, 120), V(260, 260), eo(t, k.a.w[7], 0.5), QP.acc, 3);
      withA(ip, () => _txt('author_id', L + 14, y2 + 44, FM(28), QP.ink)); withA(eo(t, k.a.w[7], 0.4), () => _txt('row', L + cw + 14, y2 + 44, FM(28), QP.ink));
      hd(t, { lines: V(['Usually much smaller.'], ['Usually much', 'smaller.']), x: V(1020, L), y: V(830, 1380), size: V(72, 76), times: [k.b.w[3], k.b.w[4], k.b.w[5]] });
    });
    sDraw(S(k.a, 0.6) + 0.05); sPop(k.a.w[4]); sPop(k.a.w[7], -2); sT(k.b.w[5]);
  }
}
