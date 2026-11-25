// Re-shoots the announcement bar (full 31 px height) at 4 marquee positions so the whole disclaimer sentence is covered.
import fs from 'fs';
import { launch, UA, sleep } from './common.mjs';
const OUT = '/Users/gbemi/Desktop/CODE/videos/projects/ghana-marrify/film/assets/sources/marrify';
const meta = JSON.parse(fs.readFileSync(`${OUT}/mf_meta.json`, 'utf8'));
const b = await launch(); const p = await b.newPage();
await p.setUserAgent(UA); await p.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 2 });
await p.goto('https://marrifyapp.com/', { waitUntil: 'networkidle2', timeout: 90000 }); await p.evaluate(() => document.fonts.ready); await sleep(1500);
const barH = await p.evaluate(() => { const nav = [...document.querySelectorAll('a')].find(a => a.innerText.trim() === 'DONATE'); let x = nav; while (x && x.getBoundingClientRect().width < 1900) x = x.parentElement; return x ? x.getBoundingClientRect().height : 31; });
console.log('bar height', barH);
for (let k = 0; k < 4; k++) {
  const t = k * 3000;
  await p.evaluate(ms => document.getAnimations().forEach(a => { a.pause(); a.currentTime = ms; }), t); await sleep(250);
  const name = `mf_02_disclaimer_banner_${k + 1}`;
  await p.screenshot({ path: `${OUT}/${name}.png`, clip: { x: 0, y: 0, width: 1920, height: Math.round(barH) } });
  meta.files[name] = { url: 'https://marrifyapp.com/', clip: `top announcement bar, 1920 x ${Math.round(barH)} css px @2x`, marquee_time_ms: t, captured: new Date().toISOString() };
}
meta.home_boxes_doc_css.announcement_bar = { x: 0, y: 0, w: 1920, h: Math.round(barH) };
fs.writeFileSync(`${OUT}/mf_meta.json`, JSON.stringify(meta, null, 1));
await b.close();
