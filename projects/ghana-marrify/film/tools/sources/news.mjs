// Headline screenshots of news coverage of Marrify. Popups are closed via their own buttons; page content untouched.
import fs from 'fs';
import { launch, UA, sleep, dismiss } from './common.mjs';
const OUT = '/Users/gbemi/Desktop/CODE/videos/projects/ghana-marrify/film/assets/sources/news';
fs.mkdirSync(OUT, { recursive: true });
const LIST = (process.argv[2] ? [process.argv.slice(2)] : [
  ['graphic', 'https://www.graphic.com.gh/lifestyle/life/marrify-app-launched-to-help-ghanaians-verify-prospective-partners-marital-status-before-marriage.html'],
  ['ghanaweb', 'https://www.ghanaweb.com/GhanaHomePage/NewsArchive/Marrify-What-to-know-about-Ghana-s-new-marriage-verification-platform-2050835'],
  ['ghanamma_launch', 'https://www.ghanamma.com/2026/09/04/ghana-launches-digital-platform-to-verify-marriage-divorce-records/'],
  ['ghanamma_rollout', 'https://www.ghanamma.com/2026/09/10/ghana-rolls-out-marrify-to-simplify-marital-status-checks/'],
  ['itweb', 'https://itweb.africa/article/ghana-launches-digital-marriage-records-platform/VgZeyqJlpyX7djX9'],
  ['technext', 'https://technext24.com/news/marrify-digitises-marriage-verification-ghana/'],
]);
async function consent(p) {
  // click consent / close buttons that live inside overlays (fixed/sticky or dialogs)
  const n = await p.evaluate(() => {
    let n = 0; const RX = /^(accept|accept all|i accept|agree|i agree|consent|got it|ok|okay|close|no thanks|no, thanks|not now|maybe later|later|dismiss|×|x|✕)$/i;
    const inOverlay = e => { for (let x = e; x; x = x.parentElement) { const s = getComputedStyle(x); if (s.position === 'fixed' || x.getAttribute('role') === 'dialog' || /modal|popup|consent|cookie|overlay|subscribe|newsletter|onesignal|fc-/i.test(x.className.toString() + x.id)) return true; } return false; };
    for (const e of document.querySelectorAll('button, a, [role="button"], span, div')) {
      const t = (e.innerText || e.getAttribute('aria-label') || '').trim();
      if (!RX.test(t) && !/close|dismiss/i.test(e.getAttribute('aria-label') || '')) continue;
      const r = e.getBoundingClientRect(); if (r.width < 4 || r.height < 4 || r.width > 600) continue;
      if (!inOverlay(e)) continue; e.click(); n++;
    }
    return n;
  });
  return n + await dismiss(p);
}
const b = await launch(); const meta = fs.existsSync(`${OUT}/news_meta.json`) ? JSON.parse(fs.readFileSync(`${OUT}/news_meta.json`, 'utf8')) : {};
for (const [key, url] of LIST) {
  const p = await b.newPage();
  await p.setUserAgent(UA); await p.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 2 });
  let status = null;
  try { const r = await p.goto(url, { waitUntil: 'networkidle2', timeout: 60000 }); status = r && r.status(); }
  catch (e) { console.log(key, 'goto warn', e.message); }
  await sleep(3000);
  for (let i = 0; i < 3; i++) { await consent(p); await sleep(800); }
  const info = await p.evaluate(() => {
    const h1s = [...document.querySelectorAll('h1')].filter(e => e.getBoundingClientRect().height > 0 && e.innerText.trim().length > 15);
    const h1 = h1s.find(e => /marri|marrify/i.test(e.innerText)) || h1s[0];
    const r = h1 ? h1.getBoundingClientRect() : null;
    const time = document.querySelector('time, .date, [class*="date" i], [class*="time" i]');
    const meta = n => document.querySelector(`meta[property="${n}"], meta[name="${n}"]`)?.content;
    const paras = [...document.querySelectorAll('article p, .entry-content p, .article-content p, main p, p')].map(e => e.innerText.trim()).filter(t => t.length > 60);
    return { title: document.title, h1: h1?.innerText.trim(), h1box: r && { x: r.x + scrollX, y: r.y + scrollY, w: r.width, h: r.height }, published: meta('article:published_time') || time?.getAttribute('datetime') || time?.innerText?.trim(), author: meta('author'), paras: paras.slice(0, 40), bodyLen: document.body.innerText.length };
  });
  console.log(key, status, info.title, '|', info.h1, '|', info.published);
  const captured = new Date().toISOString();
  const entry = { url, status, captured, title: info.title, headline: info.h1, published: info.published, author: info.author, headline_box_doc_css: info.h1box, paragraphs: info.paras };
  if (info.h1box) {
    const sy = Math.max(0, Math.round(info.h1box.y - 300));
    await p.evaluate(y => scrollTo(0, y), sy); await sleep(1200); await consent(p); await sleep(500);
    const vy = await p.evaluate(() => scrollY);
    await p.screenshot({ path: `${OUT}/news_${key}.png` }); entry.screenshot = `news_${key}.png`; entry.screenshot_scrollY = vy;
    const hb = await p.evaluate(() => { const h = [...document.querySelectorAll('h1')].filter(e => e.getBoundingClientRect().height > 0 && e.innerText.trim().length > 15); const e = h.find(e => /marri|marrify/i.test(e.innerText)) || h[0]; const r = e.getBoundingClientRect(); return { x: r.x, y: r.y + scrollY, w: r.width, h: r.height }; });
    const pad = 40; const c = { x: Math.max(0, hb.x - pad), y: hb.y - pad - 30, width: Math.min(1920, hb.w + pad * 2), height: hb.h + pad * 2 + 90 };
    await p.screenshot({ path: `${OUT}/news_${key}_headline_crop.png`, clip: c, captureBeyondViewport: false }); entry.crop = `news_${key}_headline_crop.png`; entry.crop_clip_doc_css = c;
  } else {
    await p.screenshot({ path: `${OUT}/news_${key}_NO_HEADLINE_FOUND.png` });
  }
  meta[key] = entry; fs.writeFileSync(`${OUT}/news_meta.json`, JSON.stringify(meta, null, 1));
  await p.close();
}
await b.close(); console.log('done');
