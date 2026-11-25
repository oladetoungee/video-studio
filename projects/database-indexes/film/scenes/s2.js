/* database-indexes film, part 2: chapter 03 (how it finds one row fast: bob / dave / alice, B-tree), adding an index
 * (SQL + Laravel), checking it with EXPLAIN (PostgreSQL + MySQL). */
'use strict';

const QBOB = ["SELECT * FROM users WHERE email = 'bob@email.com';"];
const QBOBp = ['SELECT * FROM users', "WHERE email = 'bob@email.com';"];

function buildS2() {
  /* ---------------- chapter 03 + the source ---------------- */
  {
    const k = PS({ a: 'Now what mechanism does a database index use', b: 'to find things so fast', c: 'I read an article on this', d: 'I love the way the writer explained it', e: 'I will link the article in the description' });
    addQ(S(k.a, 0.15), 'ch3', (t) => {
      chapterCard(t, k.a.t, '03 / 05', 'How does it find things so fast?', { lines: ['How does it find', 'things so fast?'], y: 330, yp: 640, times: [k.a.w[1], k.a.w[3], k.a.w[6], k.b.w[1], k.b.w[2], k.b.w[4]] });
      // the source she learned it from (typeset card, not a screenshot: Medium blocked our fetch)
      const cx = L, cy = V(600, 960), cw = V(1100, W - 2 * L), ch = V(330, 400);
      const p = eo(t, k.c.w[3], 0.55); if (p <= 0) return;
      panel(cx, cy, cw, ch, p);
      withA(p, () => {
        lab('Source · Medium', cx + 36, cy + 58, 30, QP.dim, { key: 'source label' });
        txtW('How Database Indexes Work (In Simple Words)', cx + 36, cy + V(130, 140), FS(V(48, 50), 600), QP.ink, cw - 72, V(58, 62), 0, 'source title');
        txt('Sergey Egorenkov', cx + 36, cy + V(270, 330), FS(36, 400), QP.dim, 'left', 'alphabetic', 0, 'source author');
      });
      const lp = eq(t, k.e.w[3], 0.4);
      withA(lp, () => { themeFixed(() => frect(cx, cy + ch + 26, 14, 14, QP.acc)); lab('link in the description', cx + 30, cy + ch + 40, 32, QP.ink, { key: 'source link' }); });
    }, { push: 0.016 });
    sChapter(k.a.t + 0.05); sShut(k.c.w[3] - 0.03); sPop(k.e.w[3], -3);
  }

  /* ---------------- the walk: bob < dave, bob > alice, found (A2) ---------------- */
  {
    const k = PS({ a: 'Say you have an index on the email column', b: "you're looking for bob@email.com", c: 'The database opens the index in the middle', d: 'maybe sees dave@email.com', e: 'Bob comes before dave', f: 'so it moves to the left', g: 'Now it sees alice@email.com', h: 'Bob comes after Alice', i: 'so it moves to the right', j: 'until it finds bob@email.com', k: "Bob's entry in the index has a pointer", l: "to where Bob's row is in the table" });
    const T = { tree: k.a.w[5], query: k.b.w[3], chip: k.c.w[3], cmp1: k.d.w[2], read1: k.e.t, mv1: k.f.w[3], cmp2: k.g.w[3], read2: k.h.t, mv2: k.i.w[3], found: k.j.w[3], ptr: k.k.w[6], row: k.l.w[3] };
    addQ(S(k.a, 0.12), 'btree-walk', (t) => {
      code(t, T.query - 0.2, V(QBOB, QBOBp), L, V(130, 400), V(36, 32), { cps: 48 });
      const CW_ = V(190, 118), CH_ = V(78, 62), LW_ = V(150, 100), NS = V(34, 27);
      const Y0 = V(220, 560), Y1 = V(430, 740), Y2 = V(640, 920);
      const RX = V(820, 540), bx = V([350, 820, 1290], [190, 540, 890]), lx = V([220, 530, 840], [160, 405, 650]);
      const lv = (n, i) => eo(t, T.tree + [0, 0.25, 0.55][n] + i * 0.1, 0.55);
      const st = (tt, tEnd) => (t < tt ? 0 : clamp(1 - (t - tEnd) / 0.3));
      const R = bnode(RX, Y0, ['dave', 'mia'], CW_, CH_, lv(0, 0), { size: NS, kp: (i) => (i === 0 ? st(T.cmp1, T.mv1 + 0.4) : 0) });
      const B = [['alice', 'carl'], ['frank', 'jon'], ['omar', 'tom']].map((ks, i) => bnode(bx[i], Y1, ks, CW_, CH_, lv(1, i), { size: NS, kp: (j) => (i === 0 && j === 0 ? st(T.cmp2, T.mv2 + 0.4) : 0) }));
      const Lf = [['aaron', 'ada'], ['alice', 'bob'], ['carl', 'cole']].map((ks, i) => bnode(lx[i], Y2, ks, LW_, CH_, lv(2, i), { size: NS, kp: (j) => (i === 1 && j === 1 && t >= T.found ? 2 : 0) }));
      [0, 1, 2].forEach(i => seg(R.ptr(i)[0], Y0 + CH_, bx[i], Y1, eo(t, T.tree + 0.2 + i * 0.07, 0.45), QP.dim, 2));
      [0, 1, 2].forEach(i => seg(B[0].ptr(i)[0], Y1 + CH_, lx[i], Y2, eo(t, T.tree + 0.5 + i * 0.07, 0.45), QP.dim, 2));
      [1, 2].forEach(b => [0, 1, 2].forEach(i => { const [x, y] = B[b].ptr(i); seg(x, y, x + (i - 1) * 30, y + 70, eo(t, T.tree + 0.7, 0.4), QP.line, 2, [6, 7]); }));
      withA(eo(t, T.tree + 0.9, 0.4), () => _txt('… more leaves', bx[2], Y1 + V(175, 170), FM(V(30, 26)), QP.dim, 'center'));
      // yellow path
      poly([R.ptr(0), [bx[0], Y1]], eo(t, T.mv1, 0.5), QP.acc, 5);
      poly([B[0].ptr(1), [lx[1], Y2]], eo(t, T.mv2, 0.5), QP.acc, 5);
      // the query token
      const p0 = [RX, Y0 - 50], p1 = [bx[0], Y1 - 46], p2 = [Lf[1].x0 + Lf[1].w * 0.75, Y2 - 46];
      let x = p0[0], y = p0[1] - 60 * (1 - eo(t, T.chip, 0.45));
      const m1 = em(t, T.mv1, 0.55), m2 = em(t, T.mv2, 0.55);
      x = lerp(x, p1[0], m1); y = lerp(y, p1[1], m1); x = lerp(x, p2[0], m2); y = lerp(y, p2[1], m2);
      chipQ(x, y, 'bob', V(32, 26), eo(t, T.chip, 0.2) * out(t, T.found + 0.4, 0.3));
      if (t >= T.chip) MOTION.state('bob token', true);
      // pointer to Bob's row
      const rowY = V(860, 1080), rx = V(150, 80), rw = V(1000, W - 160);
      const rp = eo(t, T.ptr - 0.6, 0.5);
      panel(rx, rowY, rw, 64, rp);
      withA(rp, () => { _txt('TABLE  users', rx, rowY - 16, FM(V(28, 28)), QP.dim); _txt(V('row 48,213 │ bob@email.com │ Bob │ Tartu', 'row 48,213 │ bob@email.com │ Bob'), rx + 28, rowY + 42, FM(V(30, 28)), QP.ink); });
      const px = Lf[1].x0 + LW_ * 1.5; arrow([[px, Y2 + CH_], [px, rowY - 4]], eo(t, T.ptr, 0.55), QP.acc, 4, 14);
      boxD(rx - 2, rowY - 2, rw + 4, 68, eo(t, T.row, 0.4), QP.acc, 4);
      // her comparisons, one line each, as she says them
      const reads = [['bob < dave', 'go left', T.read1], ['bob > alice', 'right of alice', T.read2], ['bob = bob', 'found', T.found]];
      reads.forEach(([a, b, tt], i) => {
        const al = eo(t, tt, 0.35) * (PORTRAIT && i < 2 ? out(t, reads[i + 1][2] - 0.2, 0.25) : 1); if (al <= 0) return;
        const rx2 = V(1475, L), ry2 = V(520 + i * 112, 1260);
        withA(al, () => withT((1 - al) * 24, 0, 1, 0, () => { _txt(String(i + 1), rx2, ry2, FM(V(32, 34)), QP.dim); _txt(a, rx2 + 50, ry2, FM(V(32, 34)), QP.ink); _txt(b, rx2 + V(50, 300), ry2 + V(44, 0), FM(V(32, 34), 600), QP.acc); }));
      });
      const lvN = t < T.cmp1 ? 0 : t < T.cmp2 ? 1 : t < T.found ? 2 : 3;
      withA(eo(t, T.cmp1, 0.3), () => { setFont(FM(30)); const lw_ = ctx.measureText('levels read ').width; _txt('levels read', V(1475, L), V(900, 1340), FM(30), QP.ink); _txt(`${lvN} of 3`, V(1475, L) + lw_, V(900, 1340), FM(30, 600), QP.acc); });
      if (!PORTRAIT) labA(t, T.tree + 1.2, 'Real nodes hold hundreds of keys', L, V(990, 1388), 30, QP.dim, { key: 'walk illus' });
      labA(t, T.tree + 1.4, 'Example after Sergey Egorenkov, Medium', V(1075, L), V(990, 1430), 30, QP.dim, { key: 'walk credit' });
    }, { push: 0.03, anchor: [V(560, 540), V(560, 900)] });
    sDraw(T.tree); sCode(T.query - 0.2, QBOB, 48); sPop(T.chip); sT(T.cmp1); sT(T.read1, -2); sSwipe(T.mv1 + 0.12, -2); sT(T.cmp2); sT(T.read2, -2); sSwipe(T.mv2 + 0.12, -4);
    sFound(T.found); sDraw(T.ptr, -2); sT(T.row + 0.05);
    MOTION.expect('bob token appears as the database opens the index', T.chip, { state: 'bob token', tol: 3 });
  }

  /* ---------------- about 20 steps vs a million checks (A4 + halving) ---------------- */
  {
    const k = PS({ a: 'So with this strategy', b: 'even with a million rows', c: 'in about 20 steps or so', d: 'Without an index, you will do up to a million checks', e: 'worst case scenario' });
    addQ(S(k.a, 0.12), 'twenty', (t) => {
      hd(t, { lines: V(['Finding bob in a million rows'], ['Finding bob in', 'a million rows']), x: L, y: V(150, 440), size: V(72, 76), times: TM(k.b, V(6, 6)) });
      // halving: each comparison throws away half of what is left
      const hx = L, hy = V(300, 640), hw = V(1680, W - 2 * L);
      const tStart = k.b.e - 0.1, tEndH = k.c.w[2] + 0.2;
      const steps = Math.floor(clamp((t - tStart) / (tEndH - tStart)) * 20 + 1e-6);
      if (t > tStart - 0.2) {
        let left = 1e6; for (let i = 0; i < steps; i++) left = Math.ceil(left / 2);
        const frac = Math.max(left / 1e6, 0.004);
        frect(hx, hy, hw, V(40, 44), QP.ghost); themeFixed(() => frect(hx, hy, hw * frac, V(40, 44), QP.acc));
        _txt(`comparison ${steps} of about 20`, hx, hy + V(86, 92), FM(30), QP.dim);
        _txt(`${fmt(left)} ${left === 1 ? 'row' : 'rows'} left`, hx + hw, hy + V(86, 92), FM(30, 600), QP.ink, 'right');
      }
      // the two bars
      const rows = [['WITHOUT AN INDEX', 'up to 1,000,000 checks', V(1680, W - 2 * L), QP.slab, k.d.w[5]], ['WITH AN INDEX', 'about 20 comparisons', 20 * V(1680, W - 2 * L) / 1e6 + 8, QP.acc, k.d.w[5] + 1.0]];
      rows.forEach(([l, v, w, col, tt], i) => {
        const y = V(520 + i * 230, 900 + i * 270); const a = eo(t, tt, 0.3); if (a <= 0) return;
        withA(a, () => _txt(l, L, y, FM(30), QP.dim));
        const bp = eo(t, tt + 0.1, 0.75); if (col === QP.acc) themeFixed(() => frect(L, y + 26, w * bp, V(48, 52), col)); else frect(L, y + 26, w * bp, V(48, 52), col);
        withA(eo(t, tt + 0.3, 0.4), () => txt(v, L, y + V(132, 140), FS(V(56, 60), 600), i ? QP.acc : QP.ink, 'left', 'alphabetic', 0, 'twenty ' + i));
      });
      labA(t, k.d.w[5] + 1.4, '2^20 = 1,048,576. A real B-tree: a few levels, 3-4 page reads.', L, V(990, 1440), 30, QP.dim, { key: 'twenty note' });
    });
    sT(k.b.e + 0.067); sRiffle(k.b.e, -6); sT(k.c.w[2] + 0.2); sDraw(k.d.w[5] + 0.1); sPop(k.d.w[5] + 1.1); sHit(k.e.w[1], -6);
  }

  /* ---------------- B-tree: only a few levels ---------------- */
  {
    const k = PS({ a: 'Most databases store their indexes', b: 'a structure called a B-tree', c: 'a B-tree works the way that the example from the article showed', d: 'even with a table with millions of rows', e: 'you usually only need a few levels', f: 'to get to the right place' });
    addQ(S(k.a, 0.12), 'btree-levels', (t) => {
      hd(t, { lines: ['B-tree'], x: L, y: V(220, 500), size: V(150, 150), times: [k.b.w[4]] });
      body(t, k.a.t + 0.2, 'Most databases store their indexes in one.', L, V(300, 580), V(38, 38), QP.dim, V(900, W - 2 * L), { key: 'btree sub' });
      // levels fan out: a node holds hundreds of keys, so 3 levels reach hundreds of millions of entries
      const lv = [['1 page', 'root'], ['up to 500 pages', 'level 2'], ['up to 250,000 pages', 'leaves']];
      const x0 = V(980, L), y0 = V(240, 640), dy = V(230, 200), fw = V(820, W - 2 * L);
      lv.forEach(([n, name], i) => {
        const tt = [k.c.w[1] + 0.2, k.d.w[5], k.d.w[7]][i]; const p = eo(t, tt, 0.6); if (p <= 0) return;
        const y = y0 + i * dy; const count = [1, 9, 41][i]; const ww = fw * [0.12, 0.55, 1][i]; const cx = x0 + fw / 2;
        for (let j = 0; j < count; j++) { const w_ = ww / count; boxD(cx - ww / 2 + j * w_ + 2, y, w_ - 4, 50, eo(t, tt + j * 0.01, 0.5), j % 3 ? QP.line : QP.ink, 2); }
        if (i) for (let j = 0; j < 7; j++) seg(cx - [0.12, 0.55][i - 1] * fw / 2 + j * [0.12, 0.55][i - 1] * fw / 6, y - dy + 50, cx - ww / 2 + j * ww / 6, y, eo(t, tt, 0.5), QP.faint, 1.5);
        withA(p, () => { _txt(name, x0, y + 92, FM(30), QP.dim); _txt(n, x0 + fw, y + 92, FM(30, 600), QP.ink, 'right'); });
      });
      // the walk: one page per level
      const wp = em(t, k.e.w[5], 1.0);
      if (wp > 0) {
        const cx = x0 + fw / 2; const pts = [[cx, y0 + 25], [cx - fw * 0.1, y0 + dy + 25], [cx - fw * 0.22, y0 + 2 * dy + 25]];
        poly(pts, wp, QP.acc, 5); pts.forEach((p_, i) => { if (wp >= i / 2 - 0.01) themeFixed(() => frect(p_[0] - 9, p_[1] - 9, 18, 18, QP.acc)); });
      }
      hd(t, { lines: ['3 levels.', '3 page reads.'], x: L, y: V(620, 1290), size: V(72, 70), times: [k.e.w[5], k.e.w[6], k.f.w[2], k.f.w[3], k.f.w[4]] });
      illus(t, k.d.w[5] + 0.4, L, V(1000, 1450), V('about 500 keys per page: room for ~125 million rows', 'about 500 keys per page'));
    }, { push: 0.016 });
    sHit(k.b.w[4], -4); sDraw(k.c.w[1] + 0.2); sDraw(k.d.w[5], -2); sPop(k.d.w[7], -2); sT(k.e.w[5]); sT(k.f.w[3], -2);
  }

  /* ---------------- add one: a one-liner (SQL) ---------------- */
  const SQL_ADD = ['CREATE INDEX idx_books_author_id', '    ON books (author_id);'];
  {
    const k = PS({ a: 'Adding a database index will literally up your query optimisation game', b: "it's kind of a one-liner", c: 'In SQL, it looks something like this' });
    addQ(S(k.a, 0.12), 'add-sql', (t) => {
      labA(t, k.a.t, 'Add one', L, V(200, 470), 32, QP.dim, { key: 'add label' });
      hd(t, { lines: ['Add an index.'], x: L, y: V(330, 600), size: V(110, 116), times: [k.a.w[0], k.a.w[1], k.a.w[3]], out: k.b.t - 0.1 });
      hd(t, { lines: V(["It's a one-liner."], ["It's a", 'one-liner.']), x: L, y: V(330, 600), size: V(110, 116), times: [k.b.w[0], k.b.w[3], k.b.w[4]].slice(0, V(3, 3)) });
      const cy = V(560, 960);
      const pp = eo(t, k.b.w[4], 0.4); panel(L - 30, cy - 70, V(1140, W - 2 * L + 60), V(220, 230), pp);
      withA(pp, () => _txt('SQL', L, cy - 82, FM(30), QP.dim));
      code(t, k.b.w[4] + 0.2, SQL_ADD, L, cy + 6, V(42, 36), { cps: 50 });
    }, { push: 0.02 });
    sHit(k.b.w[4], -6); sCode(k.b.w[4] + 0.2, SQL_ADD, 50);
  }

  /* ---------------- Laravel ---------------- */
  const LAR = ["Schema::table('books', function (Blueprint $table) {", "    $table->index('author_id');", '});'];
  const LARp = ["Schema::table('books',", '  function (Blueprint $table) {', "    $table->index('author_id');", '});'];
  {
    const k = PS({ a: 'If you are using Laravel', b: 'you simply add it in your migration like this' });
    addQ(S(k.a, 0.1), 'add-laravel', (t) => {
      // the SQL stays, small, above
      code(t, 0, SQL_ADD, L, V(170, 420), V(30, 30), { instant: true, caret: false, col: QP.dim });
      const cy = V(460, 760);
      const pp = eo(t, k.a.w[3], 0.4); panel(L - 30, cy - 76, V(1300, W - 2 * L + 60), V(270, 330), pp);
      withA(pp, () => _txt('Laravel migration', L, cy - 90, FM(30), QP.dim));
      code(t, k.b.t, V(LAR, LARp), L, cy, V(40, 32), { cps: 44, hl: [{ line: V(1, 2), from: "index('author_id')", at: k.b.w[8] + 1.4, box: true }] });
    }, { push: 0.016 });
    sPop(k.a.w[3]); sCode(k.b.t, LAR, 44);
  }

  /* ---------------- the database goes to the index first ---------------- */
  {
    const k = PS({ a: 'Now when you search books by author', b: 'the database goes to the index first', c: 'finds author 42', d: 'goes straight to those rows' });
    addQ(S(k.a, 0.1), 'index-first', (t) => {
      code(t, 0, V(['SELECT * FROM books WHERE author_id = 42;'], ['SELECT * FROM books', 'WHERE author_id = 42;']), L, V(160, 420), V(34, 32), { instant: true, caret: false });
      const vals = [38, 39, 40, 41, 42, 42, 42, 43, 44, 45], rows = [9201, 330, 77105, 1420, 23, 46, 69, 5112, 840, 61007];
      const ix = L, iy = V(300, 600), rh = V(58, 62), iw = V(300, 300);
      const ip = eo(t, k.b.w[4], 0.6); panel(ix - 20, iy - 12, iw, vals.length * rh + 24, ip);
      withA(ip, () => _txt('index on author_id', ix - 20, iy - 30, FM(30), QP.dim));
      const tx = V(900, 470), tcols = V([{ w: 200, h: 'row' }, { w: 420, h: 'title' }, { w: 200, h: 'author_id' }], [{ w: 160, h: 'row' }, { w: 250, h: 'title' }, { w: 160, h: 'author_id' }]);
      const trows = [[23, 42], [46, 42], [69, 42]];
      const tp = eo(t, k.a.t + 0.2, 0.6);
      const ty = V(520, 840), trh = V(90, 100);
      table(tx, ty, tcols, 3, (i) => [fmt(trows[i][0]), V('book #' + String(trows[i][0]).padStart(6, '0'), 'book ' + trows[i][0]), '42'], { p: tp, rh: trh, size: V(30, 30), hi: (i) => (t > k.d.w[4] + 0.15 * i ? 2 : 0) });
      withA(tp, () => _txt('books', tx, ty - 60, FM(32, 600), QP.ink));
      // the token walks down the sorted list to the 42s
      const wp = em(t, k.c.t - 0.3, 0.8);
      vals.forEach((v, i) => {
        const y = iy + i * rh + rh * 0.68; const hot = v === 42 && t > k.c.w[2];
        if (hot) found(ix - 10, y - rh * 0.7, iw - 20, rh * 0.84, eo(t, k.c.w[2] + (i - 4) * 0.08, 0.3));
        withA(ip, () => { _txt(String(v), ix + 10, y, FM(30, hot ? 600 : 400), hot ? QP.accInk : QP.ink); _txt('→ row ' + fmt(rows[i]), ix + 80, y, FM(V(28, 26)), hot ? QP.accInk : QP.dim); });
        if (v === 42) { const pp = eo(t, k.d.w[2] + (i - 4) * 0.1, 0.5); poly([[ix + iw - 20, y - 9], [tx - 30, ty + (i - 4) * trh + trh / 2]], pp, QP.acc, 3); }
      });
      if (wp > 0 && wp < 1) chipQ(ix + iw + 40, lerp(iy, iy + 4.5 * rh, wp), '42', 26);
      illus(t, k.a.t + 0.4, V(900, 470), V(1000, 1440), 'made-up rows');
    });
    sDraw(k.b.w[4]); sT(k.c.w[2]); sFound(k.c.w[2] + 0.1, -4); sT(k.d.w[4]);
  }

  /* ---------------- check it: put EXPLAIN in front ---------------- */
  {
    const k = PS({ a: "Once you've added your database index", b: 'whether your query is actually using it', c: 'You can ask the database', d: 'Just put the word EXPLAIN in front of your query' });
    addQ(S(k.a, 0.12), 'explain-front', (t) => {
      labA(t, k.a.t, 'Check it', L, V(200, 470), 32, QP.dim, { key: 'check label' });
      hd(t, { lines: V(['Is my query using the index?'], ['Is my query using', 'the index?']), x: L, y: V(330, 600), size: V(84, 84), times: TM(k.b, V(6, 6)), out: k.d.t - 0.2 });
      hd(t, { lines: V(['Put *EXPLAIN* in front of your query.'], ['Put *EXPLAIN* in', 'front of your query.']), x: L, y: V(330, 600), size: V(84, 80), times: pick(k.d, [1, 4, 5, 6, 7, 8, 9]) });
      // the query; EXPLAIN types in front and pushes it right
      setFont(FM(V(36, 32))); const cw = ctx.measureText('M').width; const qy = V(560, 960);
      const word = 'EXPLAIN '; const n = clamp(Math.floor((t - (k.d.w[4] - 0.05)) * 26), 0, word.length);
      const shift = n * cw;
      const lines = V(QBOB, QBOBp);
      lines.forEach((s, i) => _txt(s, L + (i === 0 ? shift : 0), qy + i * V(52, 46), FM(V(36, 32)), QP.ink));
      if (n > 0) { themeFixed(() => frect(L - 6, qy - V(31, 28), (n) * cw + 4, V(42, 38), QP.acc)); _txt(word.slice(0, n), L, qy, FM(V(36, 32), 600), QP.accInk); }
      withA(eo(t, k.c.t, 0.4) * out(t, k.d.t), () => _txt('ask the database ↓', L, qy - V(70, 64), FM(30), QP.dim));
    }, { push: 0.016 });
    sT(k.c.t); sfxType(k.d.w[4] + 0.02, 7, 26); sPop(k.d.w[4] + 0.3, -3);
  }

  /* ---------------- PostgreSQL: Seq Scan vs Index Scan (A3) ---------------- */
  {
    const k = PS({ a: 'In PostgreSQL, you will see "Seq Scan"', b: 'reading every single row', c: 'if you see "Index Scan"', d: 'the database is using your index', e: '"Seq Scan", "sequential scan"' });
    addQ(S(k.a, 0.12), 'explain-pg', (t) => {
      labA(t, k.a.t, 'PostgreSQL', L, V(130, 400), 32, QP.ink, { key: 'pg label' });
      const q = ['postgres=# EXPLAIN (COSTS OFF)', '  SELECT * FROM users', "  WHERE email = 'bob@email.com';"];
      const pan = (i, title, outL, big, means, tt) => {
        const x = V(L + i * 870, L), y = V(190, 470 + i * 470), w = V(830, W - 2 * L), h = V(440, 360);
        const p = eo(t, tt, 0.5); if (p <= 0) return;
        panel(x, y, w, h, p);
        withA(p, () => {
          _txt(title, x + 28, y + 50, FM(V(26, 28)), QP.dim);
          q.forEach((s, j) => _txt(s, x + 28, y + 110 + j * V(44, 40), FM(V(30, 28)), QP.ink));
        });
        // the plan line types like a psql reply
        const o = code(t, tt + 0.35, outL, x + 28, y + 110 + 4 * V(44, 40), V(30, 28), { cps: 60, caret: false, hl: i ? [{ line: 0, at: tt + 1.0 }] : [] });
        withA(eo(t, tt + 0.6, 0.4), () => { txt(big, x, y + h + V(70, 56), FS(V(58, 46), 600), QP.ink, 'left', 'alphabetic', 0, 'pg big ' + i); lab(means, V(x, x + 330), y + h + V(116, 56), 32, QP.dim, { key: 'pg means ' + i }); });
      };
      pan(0, 'BEFORE · no index on email', ['Seq Scan on users', "  Filter: (email = 'bob@email.com'::text)"], 'Seq Scan', 'reading every row', k.a.w[5] - 0.2);
      pan(1, 'AFTER · CREATE INDEX idx_email ON users (email);', ['Index Scan using idx_email on users', "  Index Cond: (email = 'bob@email.com'::text)"], 'Index Scan', 'using your index', k.c.w[3] - 0.2);
      // Seq = sequential
      const sp = eo(t, k.e.w[2], 0.4);
      if (sp > 0) { withA(sp, () => _txt('Seq = sequential: row after row', V(L + 420, L), V(746, 1424), FM(32, 600), QP.ink)); }
      labA(t, k.c.w[3] + 1.2, V('Real PostgreSQL wording (EXPLAIN with COSTS OFF)', 'Real PostgreSQL output'), L, V(1000, 440), 30, QP.dim, { key: 'pg note' });
    });
    sPop(k.a.w[5] - 0.2); sfxType(k.a.w[5] + 0.15, 20, 60); sPop(k.c.w[3] - 0.2); sfxType(k.c.w[3] + 0.02, 20, 60); sFound(k.c.w[3] + 0.87, -4); sT(k.e.w[2]);
  }

  /* ---------------- MySQL: the type column ---------------- */
  {
    const k = PS({ a: 'In MySQL, the results will come back in a small table', b: 'two columns to look at', c: 'If it says "ALL"', d: "doing a full table scan", e: 'If it says something like "ref" or "range"', f: "then it's using an index" });
    addQ(S(k.a, 0.12), 'explain-mysql', (t) => {
      labA(t, k.a.t, 'MySQL', L, V(130, 400), 32, QP.ink, { key: 'mysql label' });
      _txt('mysql> EXPLAIN SELECT * FROM users WHERE email = \'bob@email.com\';'.slice(0, V(99, 44)) + V('', '…'), L, V(200, 470), FM(V(28, 28)), QP.dim);
      const cols = V([['id', 60], ['select_type', 200], ['table', 120], ['type', 120], ['possible_keys', 230], ['key', 180], ['Extra', 220]], [['table', 130], ['type', 120], ['possible_keys', 250], ['key', 170], ['Extra', 220]]);
      const rowsB = { id: '1', select_type: 'SIMPLE', table: 'users', type: 'ALL', possible_keys: 'NULL', key: 'NULL', Extra: 'Using where' };
      const rowsA = { id: '1', select_type: 'SIMPLE', table: 'users', type: 'ref', possible_keys: 'idx_email', key: 'idx_email', Extra: 'NULL' };
      const tw_ = cols.reduce((a, c) => a + c[1], 0);
      const drawT = (y, row, tt, label, hiT) => {
        const p = eo(t, tt, 0.5); if (p <= 0) return;
        withA(p, () => _txt(label, L, y - 60, FM(30), QP.dim));
        hline(L, y - 40, tw_, p, QP.line, 2); hline(L, y + 10, tw_, p, QP.line, 2); hline(L, y + 70, tw_, p, QP.line, 2);
        let x = L; cols.forEach(([c, w]) => {
          const isType = c === 'type', isKey = c === 'key';
          const hb = (isType || isKey) ? eo(t, k.b.w[0], 0.35) : 0;
          if (hb > 0) boxD(x - 8, y - 46, w - 4, 124, hb, isType ? QP.acc : QP.ink, isType ? 3 : 2);
          withA(p, () => { _txt(c, x, y - 8, FM(26), QP.dim); });
          const hv = isType ? eo(t, hiT, 0.3) : 0;
          if (hv > 0) found(x - 4, y + 18, w - 12, 44, hv);
          withA(p, () => _txt(row[c], x, y + 50, FM(28, hv > 0.5 ? 600 : 400), hv > 0.5 ? QP.accInk : QP.ink));
          x += w;
        });
      };
      drawT(V(380, 690), rowsB, k.a.w[7], 'no index on email', k.c.w[3]);
      drawT(V(650, 1010), rowsA, k.e.w[2] - 0.4, 'after CREATE INDEX idx_email ON users (email);', k.e.w[4]);
      labA(t, k.d.w[3], 'ALL = full table scan', V(L, L), V(860, 1220), 32, QP.ink, { key: 'mysql all' });
      labA(t, k.f.w[3], 'ref, range = using an index', V(L + 620, L), V(860, 1280), 32, QP.acc, { key: 'mysql ref' });
      labA(t, k.f.w[3] + 1.0, 'Careful: type "index" reads the whole index, also slow.', L, V(940, 1360), 30, QP.dim, { key: 'mysql index note' });
      illus(t, k.a.w[7] + 0.5, L, V(1000, 1440), 'MySQL output shape, columns trimmed');
    });
    sCard(k.a.w[7]); sT(k.b.w[0]); sErr(k.c.w[3] + 0.05, -4); sCard(k.e.w[2] - 0.4, -2); sFound(k.e.w[4] + 0.05, -3);
  }

  /* ---------------- full scan, or index? ---------------- */
  {
    const k = PS({ a: 'So if your query is slow', b: 'you first want to confirm what is going on', c: 'is this query doing a full scan', d: 'or is it using an index' });
    addQ(S(k.a, 0.12), 'scan-or-index', (t) => {
      hd(t, { lines: V(['Slow query? Ask first.'], ['Slow query?', 'Ask first.']), x: L, y: V(220, 480), size: V(84, 88), times: [k.a.t, k.a.w[5], k.b.w[1], k.b.w[4]] });
      // EXPLAIN in a box, the path forks
      const ex_ = L, ey = V(560, 900), bw = V(330, 330);
      const bp = eo(t, k.b.w[5], 0.5); panel(ex_, ey - 60, bw, 120, bp); withA(bp, () => _txt('EXPLAIN', ex_ + bw / 2, ey + 14, FM(40, 600), QP.ink, 'center'));
      const fx = ex_ + bw, tx1 = V(1000, 520), tY1 = V(420, 1140), tY2 = V(700, 1340);
      const pp1 = eo(t, k.c.w[5], 0.6), pp2 = eo(t, k.d.w[4], 0.6);
      poly(V([[fx, ey], [fx + 120, ey], [fx + 120, tY1], [tx1 - 20, tY1]], [[ex_ + 80, ey + 60], [ex_ + 80, tY1], [tx1 - 20, tY1]]), pp1, QP.dim, 3);
      poly(V([[fx, ey], [fx + 120, ey], [fx + 120, tY2], [tx1 - 20, tY2]], [[ex_ + 200, ey + 60], [ex_ + 200, tY2], [tx1 - 20, tY2]]), pp2, QP.acc, 5);
      withA(pp1, () => { _txt('full scan', tx1, tY1 - 4, FS(V(56, 48), 600), QP.ink); _txt('Seq Scan · type ALL', tx1, tY1 + 46, FM(30), QP.dim); });
      withA(pp2, () => { _txt('using an index', tx1, tY2 - 4, FS(V(56, 48), 600), QP.acc); _txt('Index Scan · type ref, range', tx1, tY2 + 46, FM(30), QP.dim); });
    }, { push: 0.016 });
    sPop(k.b.w[5]); sDraw(k.c.w[5], -2); sFound(k.d.w[4] + 0.3, -4);
  }
}
