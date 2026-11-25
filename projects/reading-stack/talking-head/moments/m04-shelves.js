/* Moment 04: why it works. "You're building the shelves before you put something on them."  ~47.8 s. V(16:9, 9:16). */
'use strict';

function buildMoment() {
  const k = PS({
    why: 'so why does this method work', some: "it's about having somewhere to put things in your mind",
    cold: 'when you start reading a book cold', every: 'every new idea from the book that arrives', nowhere: 'your brain has nowhere to file it',
    floats: 'so the idea sort of floats in your mind',
    six: 'and by the time you are in say chapter six', pile: 'you already have a pile of ideas floating around in your mind', nothing: 'and they have nothing to attach themselves',
    struct: 'but when you have started the structure first', shape: 'you already know the shape of the argument',
    shows: 'so when an idea shows up in the book', which: 'you know which part of the book it belongs to', doing: 'and what it is doing there',
    go: 'in your mind that idea has somewhere to go to', mech: "that's the whole mechanism", build: "you're building the shelves before you put something on them",
  });
  const tCold = k.cold.w[3] - 0.35, tPile = k.pile.w[3] - 0.3, tShelf = k.shows.t - 0.1;

  /* camera */
  CAM(0, { z: V(1.26, 1.14), fx: V(0.71, null) });
  CAM(k.some.t - 0.1, { z: V(1.12, 1.08), fx: V(0.71, null) });
  camSplit(tCold);
  CAM(k.floats.t - 0.1, { z: V(1.08, 1.08), fx: V(0.68, null) });
  CAM(k.floats.t, { z: V(1.18, 1.16), fx: V(0.7, null), d: 2.6, ease: 'sine' });
  camPunch(k.six.w[1] - 0.1, 1.3, 1.16, { fx: V(0.71, null) });
  camSplit(tPile);
  camPunch(k.struct.t - 0.1, 1.32, 1.16, { fx: V(0.71, null) });
  camSplit(tShelf);
  camPunch(k.mech.t - 0.1, 1.26, 1.14, { fx: V(0.71, null) });

  const bob = (t, i, a = 10) => Math.sin(t * 0.9 + i * 1.7) * a;   // deterministic float (no randomness)

  /* 1 · why does it work? */
  shot(0, (t) => {
    plates2(t, { s: 'Why does it', times: [k.why.w[1], k.why.w[2], k.why.w[4]], plate: 'paper' }, { s: '*work?*', times: [k.why.w[5]], plate: 'ink' }, { out: k.some.t - 0.12 });
  }, { id: 'why' });
  sfx('pop', k.why.w[1]); sfx('hitS', k.why.w[5]);

  /* 2 · somewhere to put things */
  shot(k.some.t - 0.12, (t) => {
    plates2(t, { s: 'Somewhere to', times: [k.some.w[3], k.some.w[4]], plate: 'paper' }, { s: '*put things.*', times: [k.some.w[5], k.some.w[6]], plate: 'ink' }, { out: tCold - 0.05 });
  }, { id: 'somewhere' });
  sfx('pop', k.some.w[3]); sfx('pop', k.some.w[5], -2);

  /* 3 · split: reading cold, a new idea arrives, nowhere to file it */
  shot(tCold, (t) => {
    split(t, tCold, 'ink', () => {
      const x = LX();
      KT(t, { lines: ['Reading a book *cold:*'], font: 'body', x, y: V(230, 1262), size: V(64, 60), times: [tCold + 0.22, tCold + 0.26, tCold + 0.3, k.cold.w[6]], col: C.paper, acc: C.blueT, id: 'cold' });
      const ip = sn(t, k.every.t, 0.45);
      if (ip > 0) ideaCard(V(440, 540), V(470, 1400) + bob(t, 0) + 60 * (1 - ip), -0.06 + bob(t, 3, 0.02), 'A NEW IDEA', clamp(ip * 2), V(1.8, 1.45));
      KT(t, { lines: V(['Nowhere', 'to ~file it.~'], ['Nowhere to ~file it.~']), x, y: V(760, 1610), size: V(104, 80), times: [k.nowhere.w[3], k.nowhere.w[4], k.nowhere.w[5], k.nowhere.w[6]], col: C.paper, acc: C.blueT, ul: false });
    });
  }, { id: 'cold' });
  sfx('whoosh', tCold + 0.04); sfx('card', k.every.t); sfx('pop', k.nowhere.w[3], -2);

  /* 4 · it floats (the card drifts up beside her) */
  shot(k.floats.t - 0.12, (t) => {
    plateText(t, { lines: ['It *floats.*'], x: LX(), y: V(800, 1340), size: V(124, 104), plate: 'paper', times: [k.floats.w[2], k.floats.w[5]] });
    const u = t - k.floats.t; if (u > 0) ideaCard(V(330, 820), V(560, 1250) - Math.min(u, 3) * V(40, 14) + bob(t, 2, 8), -0.05 + Math.sin(t * 0.7) * 0.05, 'AN IDEA', clamp(u * 3) * (1 - prog(t, k.six.t - 0.3, 0.25)), V(1.2, 0.9));
  }, { id: 'floats' });
  sfx('hitS', k.floats.w[5]);

  /* 5 · by chapter six */
  shot(k.six.w[1] - 0.12, (t) => {
    plates2(t, { s: 'By chapter', times: [k.six.w[1], k.six.w[8]], plate: 'paper' }, { s: '*six:*', times: [k.six.w[9]], plate: 'ink' });
  }, { id: 'six' });
  sfx('pop', k.six.w[8]); sfx('hitS', k.six.w[9]);

  /* 6 · split: a pile of ideas, nothing to attach to */
  shot(tPile, (t) => {
    split(t, tPile, 'ink', () => {
      const x = LX(); const n = 9;
      KT(t, { lines: ['A pile of *ideas*'], font: 'body', x, y: V(230, 1262), size: V(64, 60), times: [tPile + 0.22, tPile + 0.26, tPile + 0.3, k.pile.w[6]], col: C.paper, acc: C.blueT, id: 'pile' });
      for (let i = 0; i < n; i++) {
        const t0 = Math.min(k.pile.w[4], tPile + 0.3) + i * 0.18; const p = sn(t, t0, 0.4); if (p <= 0) continue;
        const cx = V(240 + hash(i + 3) * 440, 180 + hash(i + 7) * 720), cy = V(420 + hash(i + 11) * 260, 1360 + hash(i + 13) * 90);
        ideaCard(cx, cy + bob(t, i, 7) - 120 * (1 - p), (hash(i + 21) - 0.5) * 0.7, i % 3 === 1 ? 'IDEA · CH 1' : i % 3 === 2 ? 'IDEA · CH 6' : 'IDEA', clamp(p * 2), V(1.25, 1.05));
      }
      plateText(t, { lines: ['Nothing to *attach to.*'], x, y: V(860, 1610), size: V(76, 64), plate: 'paper', times: [k.nothing.w[3], k.nothing.w[4], k.nothing.w[5], k.nothing.w[6]] });
    });
  }, { id: 'pile' });
  sfx('whoosh', tPile + 0.04); sfx('card', k.pile.w[4]); sfx('card', k.pile.w[4] + 0.55); sfx('card', k.pile.w[4] + 1.1); sfx('hitS', k.nothing.w[3]);

  /* 7 · structure first: you know the shape */
  shot(k.struct.t - 0.12, (t) => {
    plates2(t, { s: 'Structure *first:*', times: [k.struct.w[6], k.struct.w[7]], plate: 'paper' }, { s: 'you know the ~shape.~', times: pick(k.shape, [0, 2, 3, 4]), plate: 'blue', font: 'body', size: V(96, 80) });
  }, { id: 'shape' });
  sfx('pop', k.struct.w[6]); sfx('hitS', k.shape.w[4]);

  /* 8 · split: shelves. An idea shows up and lands on its shelf; another has somewhere to go. */
  shot(tShelf, (t) => {
    split(t, tShelf, 'paper', () => {
      const x = LX(), w = V(720, W - 160);
      beat(t, tShelf, k.which.w[2] - 0.05, () => KT(t, { lines: ['When an idea *shows up:*'], font: 'body', x, y: V(220, 1262), size: V(60, 58), times: [Math.min(k.shows.w[1], tShelf + 0.3), k.shows.w[2], k.shows.w[3], k.shows.w[4], k.shows.w[5]], col: C.ink, acc: C.blue, id: 'shelf-head' }));
      beat(t, k.which.w[2] - 0.05, 1e9, () => KT(t, { lines: ['You know where it *belongs.*'], font: 'body', x, y: V(220, 1262), size: V(60, 58), times: [k.which.w[0], k.which.w[1], k.which.w[2], k.which.w[7], k.which.w[8]], col: C.ink, acc: C.blue, id: 'belongs' }));
      const ys = V([500, 720, 940], [1420, 1525, 1630]);
      const hot = (i) => (i === 1 && t >= k.which.w[8]) || (i === 0 && t >= k.go.w[8] - 0.1);
      ys.forEach((y, i) => { hline(x, y, w, E.outExpo(prog(t, tShelf + 0.2 + i * 0.1, 0.5)), hot(i) ? C.blue : C.ink, 6);
        withA(prog(t, tShelf + 0.35 + i * 0.1, 0.3), () => _txt('PART ' + (i + 1), x + w, y - V(16, 12), F.disp(V(48, 40)), hot(i) ? C.blue : C.mid, 'right', 'alphabetic', -1)); });
      if (!PORTRAIT) withA(prog(t, k.doing.w[4], 0.3), () => mono('…and what it is doing there', x, 1010, 30, C.blue, 'left', { key: 'doing', fixed: true }));
      const sc = V(1.6, 1.0), ch = 62 * sc, hx = V(x + 50 + 110 * sc, x + 120);
      const land = (t0) => { const q = prog(t, t0, 0.5); return { e: E.outQuart(q), pop: 1 + 0.1 * Math.sin(Math.PI * clamp((t - t0 - 0.45) / 0.2)) * (t > t0 + 0.45 ? 1 : 0) }; };
      // idea 1 shows up (right), lands on PART 2 on "which part"
      const a1 = sn(t, k.shows.w[4] - 0.15, 0.4);
      if (a1 > 0) { const L1 = land(k.which.w[3]); const cx = lerp(V(600, 820), hx, L1.e), cy = lerp(V(372, 1350), ys[1] - ch - 3, L1.e);
        ideaCard(cx, cy + (1 - L1.e) * bob(t, 1, 8), (1 - L1.e) * 0.08, 'AN IDEA SHOWS UP', clamp(a1 * 2), sc * L1.pop); }
      // idea 2: "that idea has somewhere to go" -> PART 1
      const a2 = sn(t, k.go.w[4] - 0.15, 0.4);
      if (a2 > 0) { const L2 = land(k.go.w[8] - 0.35); const cx = lerp(V(600, 820), V(x + 300, x + 470), L2.e), cy = lerp(V(372, 1350), ys[0] - ch - 3, L2.e);
        ideaCard(cx, cy, (1 - L2.e) * -0.07, 'SOMEWHERE TO GO', clamp(a2 * 2), sc * L2.pop); }
    });
  }, { id: 'shelves' });
  sfx('whoosh', tShelf + 0.04); sfx('card', k.shows.w[4] - 0.15); sfx('click', k.which.w[3] + 0.45); sfx('card', k.go.w[4] - 0.15); sfx('click', k.go.w[8] + 0.1);

  /* 9 · the whole mechanism */
  shot(k.mech.t - 0.12, (t) => {
    plates2(t, { s: 'The whole', times: [k.mech.w[1], k.mech.w[2]], plate: 'paper' }, { s: '*mechanism.*', times: [k.mech.w[3]], plate: 'ink' });
  }, { id: 'mechanism' });
  sfx('pop', k.mech.w[2]); sfx('hitS', k.mech.w[3]);

  /* 10 · card: you're building the shelves before you put something on them */
  card(k.build.t - 0.1, 'blue', (t) => {
    KT(t, { lines: V(['You’re building', 'the shelves'], ['You’re', 'building', 'the shelves']), x: L, y: V(380, 640), size: V(170, 150), times: pick(k.build, [0, 1, 2, 3]) });
    KT(t, { lines: V(['~before you put something on them.~'], ['~before you put~', '~something on them.~']), font: 'serif', x: L, y: V(780, 1180), size: V(84, 92), times: pick(k.build, [4, 5, 6, 7, 8, 9]), acc: C.card, ul: false });
  }, { id: 'build', grid: true });
  sfx('cut', k.build.t - 0.1); sfx('hitS', k.build.w[3]);
}
