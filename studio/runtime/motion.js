/* Studio runtime, part 1b: motion tokens + numeric-audit hooks. Loaded right after core.js. Draws nothing.
 *
 * Everything lives in ONE global, MOTION, so it can never clash with a film's own helpers (blink.js has its own
 * spring(t, f, z), reading-stack uses `expect` as a phrase key). core.js's E.* easings stay as they are; these are the
 * named numbers a brief is written in (see studio/PROMPTS.md), so a scene can say exactly what the brief said.
 *
 *   MOTION.EASE.outExpo(p)            cubic-bezier presets (p in 0..1, exact 0 and 1 at the ends):
 *                                     outExpo .16,1,.3,1 (text / logo reveals) · outQuint .22,1,.36,1 (entrances)
 *                                     inOutQuart .76,0,.24,1 (moves, camera) · inExpo .7,0,.84,0 (exits) · outBack .34,1.56,.64,1 (pop)
 *   MOTION.bezier(x1, y1, x2, y2)     any CSS cubic-bezier as a function of p
 *   MOTION.ease(t, t0, d, 'outExpo')  progress of a move that starts at t0 and lasts d seconds, eased
 *   MOTION.spring(t, zeta, f)         closed-form damped step response, 0 -> 1 (t = seconds since the start; zeta = damping
 *                                     ratio: 1 no bounce, 0.7-0.85 premium, 0.4-0.6 playful, < 0.3 cartoon; f = natural Hz)
 *                                     Position and size may bounce; opacity and colour never (clamp them, or use zeta >= 1).
 *   MOTION.dampingRatio(k, d, m)      zeta from stiffness / damping / mass (k 170, d 26 -> 1.0); MOTION.fromKD(k, d, m) -> {zeta, f}
 *   MOTION.settle(zeta, f, eps)       seconds until a spring stays within eps of its target
 *   MOTION.DUR, MOTION.STAGGER        duration and stagger ranges in seconds (from the Opus Motion Lab numbers + CLAUDE.md)
 *   MOTION.hold(words)                reading hold for a line: 0.3 s per word + 0.5 s
 *   MOTION.exit(enterDur)             exit duration: ~55 % of the entrance (ease-in)
 *   MOTION.grid(bpm, offset, perBar)  beat grid computed from time, never accumulated: .at(n) .index(t) .nearest(t) .frame(n) .bar(n)
 *   MOTION.f(sec) / MOTION.s(frames)  seconds <-> frames at the film's 30 fps
 *
 * Numeric audit (studio/tools/lab.mjs audit): a scene can state what must be true on which frame, and the tool checks
 * every frame of the film against it.
 *   MOTION.expect('label', t, { el: 'sceneId/key' | 'key' })      that element is first visible (alpha >= 0.5) at t (+- tol frames)
 *   MOTION.expect('label', t, { el, settled: true })              that element has stopped moving by t
 *   MOTION.expect('label', t, { state: 'name', value: v })        MOTION.state('name', v) is first reported at t
 *   options: tol (frames, default 2), aspect ('16x9' | '9x16': only check in that layout)
 *   MOTION.state('name', value)       call inside a draw function to report live state (e.g. MOTION.state('row 3 lit', true))
 * Register expectations inside buildFilm() (scene code), next to the visual they describe; they cost nothing at render time.
 */
'use strict';
const MOTION = (() => {
  const RATE = 30;
  /** CSS cubic-bezier(x1, y1, x2, y2) as f(p): Newton steps with a bisection fallback; exact 0 / 1 at the ends */
  function bezier(x1, y1, x2, y2) {
    const cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx;
    const cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by;
    const X = (u) => ((ax * u + bx) * u + cx) * u, Y = (u) => ((ay * u + by) * u + cy) * u, dX = (u) => (3 * ax * u + 2 * bx) * u + cx;
    return (p) => {
      if (p <= 0) return 0; if (p >= 1) return 1;
      let u = p;
      for (let i = 0; i < 8; i++) { const e = X(u) - p; if (Math.abs(e) < 1e-7) return Y(u); const d = dX(u); if (Math.abs(d) < 1e-6) break; u -= e / d; }
      let lo = 0, hi = 1; u = p;
      for (let i = 0; i < 40; i++) { const x = X(u); if (Math.abs(x - p) < 1e-7) break; if (x < p) lo = u; else hi = u; u = (lo + hi) / 2; }
      return Y(u);
    };
  }
  const EASE = {
    linear: (p) => Math.max(0, Math.min(1, p)),          // only for rotation, progress bars, loop phase
    outExpo: bezier(0.16, 1, 0.3, 1),                    // text and logo reveals
    outQuint: bezier(0.22, 1, 0.36, 1),                  // premium entrances
    inOutQuart: bezier(0.76, 0, 0.24, 1),                // moves across the screen, camera
    inExpo: bezier(0.7, 0, 0.84, 0),                     // exits
    outBack: bezier(0.34, 1.56, 0.64, 1),                // playful pop (overshoots ~10 %)
  };
  const CURVES = { outExpo: [0.16, 1, 0.3, 1], outQuint: [0.22, 1, 0.36, 1], inOutQuart: [0.76, 0, 0.24, 1], inExpo: [0.7, 0, 0.84, 0], outBack: [0.34, 1.56, 0.64, 1] };
  const ease = (t, t0, d, name = 'outExpo') => EASE[name](Math.max(0, Math.min(1, (t - t0) / d)));

  /** damped spring step response: 0 at t <= 0, settles at 1. zeta = damping ratio, f = natural frequency (Hz) */
  function spring(t, zeta = 0.8, f = 2) {
    if (t <= 0) return 0;
    const w = 2 * Math.PI * f;
    if (zeta < 1) { const wd = w * Math.sqrt(1 - zeta * zeta); return 1 - Math.exp(-zeta * w * t) * (Math.cos(wd * t) + (zeta * w / wd) * Math.sin(wd * t)); }
    if (zeta === 1) return 1 - Math.exp(-w * t) * (1 + w * t);
    const r = Math.sqrt(zeta * zeta - 1), s1 = -w * (zeta - r), s2 = -w * (zeta + r);
    return 1 - (s2 * Math.exp(s1 * t) - s1 * Math.exp(s2 * t)) / (s2 - s1);
  }
  const dampingRatio = (k, d, m = 1) => d / (2 * Math.sqrt(k * m));
  const fromKD = (k, d, m = 1) => ({ zeta: dampingRatio(k, d, m), f: Math.sqrt(k / m) / (2 * Math.PI) });
  /** seconds until the spring stays within eps of 1 (envelope bound e^(-zeta w t) <= eps) */
  const settle = (zeta, f, eps = 0.005) => -Math.log(eps) / (Math.min(zeta, 1) * 2 * Math.PI * f);
  const SPRING = { none: 1, premium: 0.8, playful: 0.5, cartoon: 0.25 };

  // seconds; ranges are [min, max]
  const DUR = { feedback: [0.1, 0.2], ui: [0.2, 0.5], hero: [0.6, 0.9], minMove: 0.3, bigMove: [0.5, 0.75], readStill: 8 / RATE, maxHold: 4 };
  const STAGGER = { letter: 1 / RATE, word: [0.06, 0.12], item: [0.04, 0.08], group: [2 / RATE, 4 / RATE], nextAt: [0.3, 0.5] };   // nextAt: next element starts when the previous is 30-50 % done
  const hold = (words) => 0.3 * words + 0.5;
  const exit = (enterDur) => enterDur * 0.55;

  /** beat grid: every beat is computed from time (never accumulated); perBar beats per bar */
  function grid(bpm, offset = 0, perBar = 4) {
    const b = 60 / bpm;
    return { bpm, beat: b, framesPerBeat: RATE * b,
      at: (n) => offset + n * b, index: (t) => Math.floor((t - offset) / b + 1e-9), nearest: (t) => offset + Math.round((t - offset) / b) * b,
      frame: (n) => Math.round((offset + n * b) * RATE), bar: (n) => offset + n * perBar * b, phase: (t) => (((t - offset) / b) % 1 + 1) % 1 };
  }

  /* ---------- numeric audit hooks ---------- */
  const EXPECTS = [];
  let STATE = {};
  function expect(label, t, spec = {}) {
    if (t == null || isNaN(t)) throw new Error('MOTION.expect: bad time for ' + label);
    EXPECTS.push({ label, t: +(+t).toFixed(4), f: Math.round(t * RATE), tol: spec.tol != null ? spec.tol : 2, el: spec.el || null, settled: !!spec.settled,
      state: spec.state || null, value: spec.value === undefined ? true : spec.value, aspect: spec.aspect || null, scene: typeof SCENE_ID === 'string' ? SCENE_ID : '' });
  }
  const state = (name, value = true) => { STATE[name] = value; };
  const _beginFrame = () => { STATE = {}; };
  const _state = () => STATE;

  return { RATE, bezier, EASE, CURVES, ease, spring, dampingRatio, fromKD, settle, SPRING, DUR, STAGGER, hold, exit, grid,
    f: (sec) => Math.round(sec * RATE), s: (frames) => frames / RATE,
    expect, state, EXPECTS, _beginFrame, _state };
})();
