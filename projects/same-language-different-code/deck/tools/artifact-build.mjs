// Builds the shareable web copy of the deck into build/artifact/ (for the claude.ai Artifact her mentor reviews).
// Same slides and engine; libraries load from the CDN (jsDelivr, exact versions); only images the slides use are copied.
//   node tools/artifact-build.mjs        → prints the files map for the Artifact publish
import fs from 'node:fs'; import path from 'node:path'; import { fileURLToPath } from 'node:url';
const deck = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
// node tools/artifact-build.mjs          → build/artifact/          her iPad copy: slides + script bar, swipe (the link her mentor has)
// node tools/artifact-build.mjs present  → build/artifact-present/  the presenting copy: slides only, full-screen button (the QR code points here)
const PRESENT = process.argv[2] === 'present';
const out = path.join(deck, 'build', PRESENT ? 'artifact-present' : 'artifact');
fs.mkdirSync(path.join(out, 'slides'), { recursive: true });
fs.mkdirSync(path.join(out, 'assets', 'fonts'), { recursive: true });
fs.mkdirSync(path.join(out, 'assets', 'img'), { recursive: true });

const slideFiles = fs.readdirSync(path.join(deck, 'slides')).filter(f => f.endsWith('.js')).sort();
const copy = (rel) => fs.copyFileSync(path.join(deck, rel), path.join(out, rel));
['deck.css', 'engine.js', 'parts.js', 'config.js'].forEach(copy);
slideFiles.forEach(f => copy('slides/' + f));
['Geist.ttf', 'GeistMono.ttf', 'InstrumentSerif-Italic.ttf'].forEach(f => copy('assets/fonts/' + f));
const src = slideFiles.map(f => fs.readFileSync(path.join(deck, 'slides', f), 'utf8')).join('\n');
const imgs = [...new Set([...src.matchAll(/assets\/img\/([\w.-]+\.(?:jpg|png))/g)].map(m => m[1]))];
imgs.forEach(f => copy('assets/img/' + f));

if (!PRESENT) { // iPad copy: no clicks, finished slides, script open and sized to fit
  let cfg = fs.readFileSync(path.join(out, 'config.js'), 'utf8');
  fs.writeFileSync(path.join(out, 'config.js'), cfg.replace('window.CONFIG = {', 'window.CONFIG = {\n  glance: true,'));
}
if (PRESENT) {
  let cfg = fs.readFileSync(path.join(out, 'config.js'), 'utf8');
  cfg = cfg.replace(/practice:\s*true/, 'practice: false').replace('window.CONFIG = {', 'window.CONFIG = {\n  fullscreenButton: true,');
  fs.writeFileSync(path.join(out, 'config.js'), cfg);
}
// the old v1 font names are aliased in deck.css to files that are not shipped here; point them at Geist
let css = fs.readFileSync(path.join(out, 'deck.css'), 'utf8');
fs.writeFileSync(path.join(out, 'deck.css'), css);

const page = `<title>${PRESENT ? 'Same Language, Different Code' : 'Øredev Talk Script'}</title>
<link rel="stylesheet" href="deck.css">
<script src="https://cdn.jsdelivr.net/npm/d3-array@3.2.4/dist/d3-array.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/d3-geo@3.1.1/dist/d3-geo.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/topojson-client@3.1.0/dist/topojson-client.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/datamaps@0.5.9/dist/datamaps.world.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/qrcode-generator@1.4.4/qrcode.js"></script>
<script src="config.js"></script>
<script src="engine.js"></script>
<script src="parts.js"></script>
${slideFiles.map(f => `<script src="slides/${f}"></script>`).join('\n')}
<div id="stage"></div>
<div id="overview"></div>
<div id="blackout"></div>
<div id="progress"></div>
<script>if (document.readyState !== 'loading') window.dispatchEvent(new Event('DOMContentLoaded'));</script>
`;
fs.writeFileSync(path.join(out, 'index.html'), page);
const files = {};
const walk = (d) => fs.readdirSync(d).forEach(f => { const p = path.join(d, f); if (fs.statSync(p).isDirectory()) walk(p); else if (f !== 'index.html') files[path.relative(out, p)] = p; });
walk(out);
console.log(JSON.stringify(files, null, 1));
console.log('images:', imgs.join(', '));
