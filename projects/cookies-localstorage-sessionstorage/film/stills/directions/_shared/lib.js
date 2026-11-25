// Shared helpers for the direction pages: pure functions of time (no timers, no Math.random).
const Q = new URLSearchParams(location.search); const ASPECT = Q.get('aspect') || '16x9'; const PORT = ASPECT === '9x16';
const W = PORT ? 1080 : 1920, H = PORT ? 1920 : 1080;
const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
const lerp = (a, b, k) => a + (b - a) * k;
// arrive fast, land soft: each frame covers ~15 % of what is left, normalised to land exactly at dur
const EO = (p) => { p = clamp(p); const N = 18; return (1 - Math.pow(0.85, p * N)) / (1 - Math.pow(0.85, N)); };
const EIO = (p) => { p = clamp(p); return p < .5 ? 4 * p * p * p : 1 - Math.pow(-2 * p + 2, 3) / 2; };
const EBACK = (p) => { p = clamp(p); const c = 1.4; return 1 + (c + 1) * Math.pow(p - 1, 3) + c * Math.pow(p - 1, 2); };
const mv = (p, t0, dur = 0.5, e = EO) => e((p - t0) / dur);
// motion blur along the move: px of blur from the derivative of an eased value (clears as it settles)
const mblur = (p, t0, dur, dist, e = EO) => { const d = Math.abs(e((p - t0 + 1 / 60) / dur) - e((p - t0 - 1 / 60) / dur)) * 30 * Math.abs(dist); return Math.min(14, d * 0.06); };
// seeded PRNG
function rng(seed) { let s = seed >>> 0; return () => { s = (s * 1664525 + 1013904223) >>> 0; return s / 4294967296; }; }
// type-on: first n characters of str by progress
const typed = (str, p, t0, cps = 28) => str.slice(0, Math.max(0, Math.floor((p - t0) * cps)));
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;');
const css = (o) => Object.entries(o).filter(([, v]) => v !== undefined && v !== null && v !== false).map(([k, v]) => `${k.replace(/[A-Z]/g, m => '-' + m.toLowerCase())}:${typeof v === 'number' && !/opacity|z-index|zIndex|fontWeight|lineHeight|flex/.test(k) ? v + 'px' : v}`).join(';');
const box = (style, inner = '') => `<div style="position:absolute;${css(style)}">${inner}</div>`;
// TIMELINE: [[t0, t1, scene], ...] in raw-recording seconds; SCENES: name -> (p) => html
let SCENES = {}, TIMELINE = [];
function setup(scenes, timeline, cues) { SCENES = scenes; TIMELINE = timeline; window.CUES = cues || []; }
const stage = () => document.getElementById('stage');
function show(name, p) { stage().style.width = W + 'px'; stage().style.height = H + 'px'; stage().innerHTML = SCENES[name](p); }
function seek(t) { let seg = TIMELINE[0]; for (const s of TIMELINE) if (t >= s[0]) seg = s; show(seg[2], t - seg[0]); }
window.show = show; window.seek = seek;
