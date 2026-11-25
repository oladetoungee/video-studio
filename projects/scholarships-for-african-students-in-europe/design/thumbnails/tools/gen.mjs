// Writes every thumbnail direction (index.html + content.json) for scholarships-for-african-students-in-europe.
//   node tools/gen.mjs            -> only directions that do not exist yet (her studio edits are never overwritten)
//   node tools/gen.mjs --force 03 -> rewrite these (prefix match), keeping nothing
// Look: B "Now Boarding" (departures board) + C city photos (her pick, 2026-11-02). Shared CSS lib/sch.css, tiles lib/flaps.js.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const force = process.argv.includes('--force');
const only = process.argv.slice(2).filter(a => !a.startsWith('--'));

const T = {
  1: 'Fully Funded Scholarships in Europe for Africans (2027)',
  2: 'Scholarships for African Students in Europe: 2027 Deadlines',
  3: 'Scholarships for Nigerian Students in Europe 2027',
  4: 'Fully Funded Masters Scholarships in Europe 2027',
  5: 'Erasmus Mundus, DAAD and More: Scholarships for 2027',
  6: 'How to Get a Scholarship to Study in Europe in 2027',
  7: 'Scholarships Nigerians Can Still Apply For in 2027',
  8: 'Study in Europe for Free? Scholarships Open to Africans',
  9: 'Studying in Europe as a Nigerian: The Scholarships',
  10: 'Which European Scholarships Are Open to Nigerians?',
  11: 'Scholarships in Europe Still Open for 2027 (Nigerians)',
  12: 'Scholarship Documents to Prepare for Europe in 2027',
};
const titles = (...n) => n.map(i => T[i]);
const F = (s) => `../../assets/frames/f_${s}.jpg`, P = (s) => `../../assets/scene/p_${s}.png`, C = (s) => `../../assets/cut/c_${s}.png`, S = (n) => `../../assets/src/${n}`;
const scene = (cls = '') => `<div class="scene${cls ? ' ' + cls : ''}" data-move="photo"><img class="bg" data-img="bg" alt=""><div class="wash"></div><div class="dim"></div><img class="me-c" data-img="me" alt=""></div>`;
const sceneVars = (x, y = 60, sc = 1.3) => ({ '--sc': String(sc), '--sc-o': '50% 100%', '--sc-x': x + 'px', '--sc-y': y + 'px' });

const D = [];
const add = (d) => { const i = D.findIndex(x => x.id === d.id); if (i >= 0) D[i] = d; else D.push(d); };

// directions live in dirs-r2.mjs (round 2, after the cold critic; round 1 is in the Bin)
const { default: defs } = await import('./dirs-r2.mjs');
defs(add, { titles, T, F, P, C, S, scene, sceneVars });
// round 3 (coordinator, push the best to 8): replaces 01, 05, 12, 14 and cuts the weakest options
const r3 = await import('./dirs-r3.mjs');
r3.default(add, { titles, T, F, P, C, S });
for (const id of r3.CUT) { const i = D.findIndex(x => x.id === id); if (i >= 0) D.splice(i, 1); }

// ---------- write ----------
const head = (css) => `<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../../lib/sch.css"><style>\n${css}\n</style></head><body><div class="t">\n`;
const foot = `\n</div><script src="../../lib/flaps.js"></script><script src="../../lib/bind.js"></script></body></html>\n`;
let n = 0;
for (const d of D) {
  if (only.length && !only.some(o => d.id.startsWith(o))) continue;
  const dir = path.join(ROOT, 'directions', d.id);
  if (fs.existsSync(path.join(dir, 'content.json')) && !force) continue;
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), head(d.css) + d.body + foot);
  const c = { direction: d.direction, thumbnail_text: d.thumbnail_text, titles: d.titles, title: d.titles[0], kind: d.kind };
  if (d.recommended) c.recommended = true;
  Object.assign(c, { text: d.text, images: d.images, vars: d.vars });
  fs.writeFileSync(path.join(dir, 'content.json'), JSON.stringify(c, null, 2) + '\n');
  n++;
}
console.log('wrote', n, 'of', D.length);
