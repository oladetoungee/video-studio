// Captures Mustafa Suleyman's essay (19 Aug 2025) as a credited source for claude-rule: a 2x screenshot around the
// quoted sentence + the title, and the box of each phrase (for exact highlights). Nothing on the page is edited.
// node suleyman.mjs
import fs from 'fs';
import { launch, UA, sleep, dismiss, RECTS_FN } from './common.mjs';
const URLS = ['https://mustafa-suleyman.ai/seemingly-conscious-ai-is-coming'];
const OUT = '/Users/gbemi/Desktop/CODE/videos/projects/claude-rule/film/assets/sources/suleyman';
fs.mkdirSync(OUT, { recursive: true });
const b = await launch(); const p = await b.newPage();
await p.setUserAgent(UA); await p.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 2 });
let resp = null, url = null;
for (const u of URLS) { try { resp = await p.goto(u, { waitUntil: 'networkidle2', timeout: 60000 }); url = u; if (resp && resp.status() < 400) break; } catch (e) { console.log('fail', u, e.message); } }
console.log('status', resp && resp.status(), url, await p.title());
await sleep(2500); await dismiss(p);
const H = await p.evaluate(() => document.documentElement.scrollHeight);
for (let y = 0; y < H; y += 900) { await p.evaluate(y => window.scrollTo(0, y), y); await sleep(200); }
await p.evaluate(() => window.scrollTo(0, 0)); await sleep(800); await dismiss(p);
const phrases = { quote: 'We must build AI for people; not to be a digital person', quote2: 'build AI for people; not to be a digital person', persons: 'AIs cannot be people' };
const geo = await p.evaluate((fnSrc, phrases) => { const rects = eval(fnSrc); const out = {};
  for (const [k, ph] of Object.entries(phrases)) { const r = rects(document.body, ph); if (r) out[k] = r; }
  const h1 = document.querySelector('h1'); const hb = h1 && h1.getBoundingClientRect();
  return { phrases: out, h1: h1 ? h1.textContent.trim() : null, h1box: hb ? { x: hb.x + scrollX, y: hb.y + scrollY, w: hb.width, h: hb.height } : null, text: document.body.innerText.slice(0, 4000) };
}, RECTS_FN, phrases);
console.log(JSON.stringify({ h1: geo.h1, h1box: geo.h1box, phrases: geo.phrases }, null, 1));
const q = geo.phrases.quote || geo.phrases.quote2;
if (q) {
  const y0 = Math.max(0, q[0].y - 260);
  await p.evaluate(y => window.scrollTo(0, y), y0); await sleep(800);
  const sy = await p.evaluate(() => scrollY);
  await p.screenshot({ path: OUT + '/su_quote.png' });
  geo.shots = { quote: { scrollY: sy, size: '3840x2160 (@2x of 1920x1080)' } };
}
await p.evaluate(() => window.scrollTo(0, 0)); await sleep(600);
await p.screenshot({ path: OUT + '/su_top.png' }); geo.shots = { ...(geo.shots || {}), top: { scrollY: 0 } };
fs.writeFileSync(OUT + '/su_capture.json', JSON.stringify({ url, captured: new Date().toISOString(), ...geo }, null, 1));
await b.close();
