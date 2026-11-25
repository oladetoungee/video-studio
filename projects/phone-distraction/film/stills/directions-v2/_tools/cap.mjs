import fs from 'fs';
import { launch, UA, sleep, dismiss } from '/Users/gbemi/Desktop/CODE/videos/projects/phone-distraction/film/tools/sources/common.mjs';
const OUT = process.argv[2];
const PAGES = process.argv[3] ? JSON.parse(process.argv[3]) : [
  { id: 'behaviormodel', url: 'https://behaviormodel.org/' },
  { id: 'stanford-lab', url: 'https://behaviordesign.stanford.edu/' },
  { id: 'chi-acm', url: 'https://dl.acm.org/doi/10.1145/2858036.2858359' },
  { id: 'uva-news', url: 'https://news.virginia.edu/node/213646' },
  { id: 'guardian-2017', url: 'https://web.archive.org/web/2018/https://www.theguardian.com/technology/2017/oct/05/smartphone-addiction-silicon-valley-dystopia' },
  { id: 'fogg-book', url: 'https://openlibrary.org/search?q=Persuasive+Technology+Using+Computers+to+Change+What+We+Think+and+Do' },
];
const b = await launch();
for (const P of PAGES) {
  try {
    const pg = await b.newPage(); await pg.setUserAgent(UA); await pg.setViewport({ width: 1280, height: 1400, deviceScaleFactor: 2 });
    await pg.goto(P.url, { waitUntil: 'domcontentloaded', timeout: 90000 }); await sleep(2500);
    await pg.evaluate(() => { for (const e of document.querySelectorAll('button, a')) { const t = (e.textContent || '').trim().toLowerCase(); if (/^(accept all cookies|accept all|accept cookies|i accept|accept|agree|ok|got it)$/.test(t)) e.click(); } });
    await dismiss(pg); await sleep(800);
    const title = await pg.title();
    await pg.screenshot({ path: `${OUT}/${P.id}.png` });
    fs.writeFileSync(`${OUT}/${P.id}.json`, JSON.stringify({ url: P.url, title, captured: '2026-10-17' }, null, 1));
    console.log(P.id, '|', title); await pg.close();
  } catch (e) { console.log(P.id, 'FAILED', e.message); }
}
await b.close();
