// Captures the two European Commission press releases (TikTok 6 Feb 2026, Meta 10 Jul 2026) as credited sources.
// Nothing on the page is edited; cookie banners are only closed. Output: film/assets/sources/eu-<id>.png (+ .json phrase boxes)
import fs from 'fs';
import { launch, UA, sleep, dismiss, RECTS_FN } from './common.mjs';
const OUT = '../../assets/sources/';
const PAGES = [
  { id: 'tiktok', url: 'https://digital-strategy.ec.europa.eu/en/news/commission-preliminarily-finds-tiktoks-addictive-design-breach-digital-services-act' },
  { id: 'meta', url: 'https://digital-strategy.ec.europa.eu/en/news/commission-preliminarily-finds-addictive-design-instagram-and-facebook-breach-digital-services-act' },
];
const PHRASES = ['addictive design', 'infinite scroll', 'autoplay', 'push notifications', 'preliminarily', 'Digital Services Act', 'highly personalised'];
const b = await launch();
for (const P of PAGES) {
  const pg = await b.newPage(); await pg.setUserAgent(UA); await pg.setViewport({ width: 1280, height: 1600, deviceScaleFactor: 2 });
  await pg.goto(P.url, { waitUntil: 'networkidle2', timeout: 60000 }); await sleep(1500);
  await pg.evaluate(() => { for (const e of document.querySelectorAll('button, a')) { const t = (e.textContent || '').trim().toLowerCase(); if (/^(accept all cookies|accept only essential cookies|i accept cookies|accept)$/.test(t)) e.click(); } });
  await dismiss(pg); await sleep(800);
  const info = await pg.evaluate(`(() => { const f = ${RECTS_FN}; const root = document.querySelector('main') || document.body;
    const h1 = document.querySelector('h1'); const r = h1 ? h1.getBoundingClientRect() : null;
    const out = { title: h1 ? h1.textContent.trim() : '', h1: r ? { x: r.x + scrollX, y: r.y + scrollY, w: r.width, h: r.height } : null, phrases: {} };
    for (const p of ${JSON.stringify(PHRASES)}) out.phrases[p] = f(root, p);
    const date = [...document.querySelectorAll('time, .ecl-page-header__meta, .ecl-page-header-core__meta')].map(e => e.textContent.trim()).filter(Boolean);
    out.meta = date.slice(0, 3); out.docH = document.documentElement.scrollHeight; return out; })()`);
  info.url = P.url; info.captured = '2026-10-13';
  const top = Math.max(0, (info.h1 ? info.h1.y : 0) - 260);
  await pg.screenshot({ path: OUT + `eu-${P.id}.png`, clip: { x: 0, y: top, width: 1280, height: Math.min(2600, info.docH - top) } });
  info.clipTop = top; info.scale = 2;
  fs.writeFileSync(OUT + `eu-${P.id}.json`, JSON.stringify(info, null, 1));
  console.log(P.id, info.title, info.meta, Object.fromEntries(Object.entries(info.phrases).map(([k, v]) => [k, v && v[0]])));
  await pg.close();
}
await b.close();
