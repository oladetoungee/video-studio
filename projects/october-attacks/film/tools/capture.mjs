// Real article clippings for the film: the paragraph (or headline) that holds a phrase, captured at 2x, plus the
// phrase's line boxes for the highlighter. Nothing on the page is altered (cookie banners / fixed bars removed only).
// node tools/capture.mjs [name ...]   -> assets/src/<name>.png + data/clips.json ; then scenes/clips.js is written
import fs from 'fs'; import path from 'path'; import os from 'os'; import { createRequire } from 'module';
const require = createRequire('/Users/gbemi/Desktop/CODE/videos/studio/package.json');
const puppeteer = require('puppeteer-core');
const ROOT = path.dirname(path.dirname(new URL(import.meta.url).pathname));
const OUT = path.join(ROOT, 'assets/src'); fs.mkdirSync(OUT, { recursive: true });
const DB = path.join(ROOT, 'data/clips.json');
function findChrome() { const base = path.join(os.homedir(), '.cache/puppeteer/chrome-headless-shell'); for (const v of fs.readdirSync(base).sort().reverse()) { const p = path.join(base, v, 'chrome-headless-shell-mac-arm64/chrome-headless-shell'); if (fs.existsSync(p)) return p; } throw new Error('no chrome'); }
const U = {
  bcphp: 'https://www.bleepingcomputer.com/news/security/php-ships-emergency-patches-for-critical-php2shell-flaws/',
  dr: 'https://www.darkreading.com/application-security/php2shell-bugs-red-alert-security-industry',
  aws: 'https://aws.amazon.com/blogs/security/amazon-threat-intelligence-identifies-php2shell-exploitation-prior-to-public-disclosure-in-madpot/',
  thn: 'https://thehackernews.com/2026/10/someone-tried-to-exploit-php2shell-4.html',
  ib: 'https://www.insurancebusinessmag.com/uk/news/cyber/uk-councils-and-met-police-among-sites-pulled-offline-after-ncsc-alert-594424.aspx',
  node: 'https://nodejs.org/en/blog/vulnerability/october-2026-security-releases',
  rlb: 'https://blog.railway.com/p/security-disclosure-wednesday-october-21st',
  zb: 'https://zeabur.com/blogs/zeabur-is-shutting-down',
  bczb: 'https://www.bleepingcomputer.com/news/security/zeabur-shutting-down-after-second-security-breach-in-two-months/',
  tcoc: 'https://techcrunch.com/2026/10/19/hackers-hit-ai-coding-tool-opencode-running-up-charges-on-users-ai-accounts/',
  bcoc: 'https://www.bleepingcomputer.com/news/security/opencode-hack-exposes-api-keys-amid-ai-distillation-attacks/',
  tnwem: 'https://thenextweb.com/news/emudhra-certificates-weak-keys-browsers-block',
  bcem: 'https://www.bleepingcomputer.com/news/security/mozilla-google-apple-block-compromised-emudhra-ca-certificates/',
  tnwai: 'https://thenextweb.com/news/ai-agents-hacker-cairn-100-sites-deere-norforge',
  sbs: 'https://news.sbs.co.kr/english/article.do?news_id=N1008805974',
  sa: 'https://www.staradvertiser.com/2026/10/19/breaking-news/how-one-hacker-used-ai-agents-to-break-into-over-100-company-websites/',
};
// name: [page, source credit, date, block phrase (or 'h1'), [highlight phrases]]
const SPEC = {
  'php-calif': ['bcphp', 'BleepingComputer', 'Oct 21, 2026', 'The two unauthenticated RCE flaws', ['discovered by Calif, OpenAI, and Wiz security researchers']],
  'php-versions': ['bcphp', 'BleepingComputer', 'Oct 21, 2026', 'Admins should install PHP 8.5.12', ['8.5.12, 8.4.27, 8.3.36, or 8.2.35']],
  'dr-92': ['dr', 'Dark Reading', 'Oct 2026', 'CVSS v4.0 score of 9.2', ['critical CVSS v4.0 score of 9.2']],
  'aws-head': ['aws', 'AWS Security Blog', 'Oct 2026', 'h1', []],
  'thn-head': ['thn', 'The Hacker News', 'Oct 2026', 'h1', []],
  'ib-head': ['ib', 'Insurance Business', 'Oct 2026', 'h1', []],
  'node-head': ['node', 'nodejs.org', 'Oct 21, 2026', 'h1', []],
  'rlb-paused': ['rlb', 'Railway blog', 'Oct 21, 2026', 'All deployments are paused', ['All deployments are paused while we investigate']],
  'rlb-ai': ['rlb', 'Railway blog', 'Oct 21, 2026', 'compromising AI inference providers', ['with the aim of compromising AI inference providers']],
  'zb-head': ['zb', 'zeabur.com', 'Oct 17, 2026', 'h1', []],
  'zb-dec': ['zb', 'zeabur.com', 'Oct 17, 2026', 'all dedicated servers and shared clusters will be shut down by December 31', ['shut down by December 31']],
  'bczb-num': ['bczb', 'BleepingComputer', 'Oct 20, 2026', '321,810 accounts', ['3.2 million environment variable records', '321,810 accounts']],
  'tcoc-head': ['tcoc', 'TechCrunch', 'Oct 19, 2026', 'h1', []],
  'tcoc-1000': ['tcoc', 'TechCrunch', 'Oct 19, 2026', 'a few described totals above', ['charges in the hundreds of dollars', 'a few described totals above $1,000']],
  'bcoc-head': ['bcoc', 'BleepingComputer', 'Oct 2026', 'h1', []],
  'tnwem-head': ['tnwem', 'The Next Web', 'Oct 2026', 'Eight eMudhra certificate keys were so weak', []],
  'bcem-head': ['bcem', 'BleepingComputer', 'Oct 2026', 'h1', []],
  'sa-head': ['sa', 'Reuters, via Star-Advertiser', 'Oct 19, 2026', 'h1', []],
  'tnwai-head': ['tnwai', 'The Next Web', 'Oct 2026', 'AI agents broke into 100+ sites', []],
  'sbs-names': ['sbs', 'Reuters, via SBS', 'Oct 2026', 'SharkNinja', ['SharkNinja', 'Cummins']],
  'sa-50': ['sa', 'Reuters, via Star-Advertiser', 'Oct 19, 2026', 'about $50 per successful hack', ['about $50 per successful hack']],
  'sa-names': ['sa', 'Reuters, via Star-Advertiser', 'Oct 19, 2026', 'SharkNinja', ['SharkNinja', 'Cummins']],
};
const only = process.argv.slice(2);
const db = fs.existsSync(DB) ? JSON.parse(fs.readFileSync(DB, 'utf8')) : {};
const byPage = {}; for (const [n, s] of Object.entries(SPEC)) if (!only.length || only.includes(n)) (byPage[s[0]] = byPage[s[0]] || []).push(n);
const browser = await puppeteer.launch({ executablePath: findChrome(), headless: true, args: ['--force-color-profile=srgb'] });
for (const [pk, names] of Object.entries(byPage)) {
  const pg = await browser.newPage();
  await pg.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0 Safari/537.36');
  await pg.setViewport({ width: 1280, height: 1400, deviceScaleFactor: 2 });
  await pg.setRequestInterception(true);
  pg.on('request', r => { const u = r.url(); if (/doubleclick|googlesyndication|adservice|taboola|outbrain|amazon-adsystem|criteo|pubmatic|rubicon|scorecardresearch|chartbeat|hotjar|facebook\.net/.test(u)) r.abort(); else r.continue(); });
  pg.on('dialog', d => d.dismiss().catch(() => {}));
  try { await pg.goto(U[pk], { waitUntil: 'networkidle2', timeout: 90000 }); } catch (e) { console.log(pk, 'goto:', e.message); }
  await new Promise(r => setTimeout(r, 2000));
  await pg.evaluate(() => { for (const b of document.querySelectorAll('button, a')) { const t = (b.textContent || '').trim().toLowerCase(); if (/^(agree|accept|accept all|i agree|got it|ok|reject all)$/.test(t)) { try { b.click(); } catch {} } } });
  await new Promise(r => setTimeout(r, 800));
  for (let y = 0; y < 5000; y += 700) { await pg.evaluate(y => scrollTo(0, y), y); await new Promise(r => setTimeout(r, 200)); }
  await pg.evaluate(() => scrollTo(0, 0)); await new Promise(r => setTimeout(r, 600));
  await pg.evaluate(() => { for (const el of document.querySelectorAll('body *')) { const s = getComputedStyle(el); if (s.position === 'fixed' || s.position === 'sticky') el.remove(); }
    for (const el of document.querySelectorAll('[id*=cookie],[class*=cookie],[id*=consent],[class*=consent],[class*=newsletter],[class*=paywall]')) el.remove(); document.body.style.overflow = 'auto'; });
  for (const name of names) {
    const [, source, date, block, hls] = SPEC[name];
    const info = await pg.evaluate((block, hls) => {
      let el = null;
      if (block === 'h1') el = document.querySelector('h1');
      else { const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); let n; while ((n = w.nextNode())) { const pe = n.parentElement; if (pe && /^(SCRIPT|STYLE|NOSCRIPT)$/.test(pe.tagName)) continue; if (n.textContent.includes(block)) { el = pe; break; } } }
      if (!el) { // phrase split over nodes: match on an element's text
        for (const e of document.querySelectorAll('p, li, h1, h2, h3, blockquote, td')) if (e.textContent.includes(block)) { el = e; break; } }
      if (!el) return null;
      while (el && !/^(P|LI|H1|H2|H3|BLOCKQUOTE|TD|FIGCAPTION)$/.test(el.tagName) && el.parentElement && el.getBoundingClientRect().width < 500) el = el.parentElement;
      el.scrollIntoView({ block: 'center' });
      const r = el.getBoundingClientRect(); const box = [r.x + scrollX, r.y + scrollY, r.width, r.height];
      const rects = [];
      for (const ph of hls) { const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT); let n; const full = el.textContent; if (!full.includes(ph)) continue;
        // walk the text nodes to map the phrase's character range onto ranges
        let pos = 0; const start = full.indexOf(ph), end = start + ph.length; const rg = document.createRange(); let set0 = false;
        while ((n = w.nextNode())) { const L = n.textContent.length; if (!set0 && start < pos + L) { rg.setStart(n, start - pos); set0 = true; } if (set0 && end <= pos + L) { rg.setEnd(n, end - pos); break; } pos += L; }
        for (const b of rg.getClientRects()) if (b.width > 2) rects.push([b.x + scrollX, b.y + scrollY, b.width, b.height]); }
      return { box, rects, text: el.textContent.trim().slice(0, 400), tag: el.tagName };
    }, block, hls);
    if (!info) { console.log(name, 'NOT FOUND'); continue; }
    const pad = 22; const [bx, by, bw, bh] = info.box;
    let clip = { x: Math.max(0, bx - pad), y: Math.max(0, by - pad), width: Math.min(1280, bw + 2 * pad), height: bh + 2 * pad };
    if (bh > 700 && info.rects.length) { const ry = info.rects[0][1]; clip = { x: clip.x, y: Math.max(0, ry - 110), width: clip.width, height: 300 }; }
    await pg.screenshot({ path: path.join(OUT, name + '.png'), clip });
    const S = 2; const hl = []; // merge rects on the same line
    for (const r of info.rects) { const q = [Math.round((r[0] - clip.x) * S), Math.round((r[1] - clip.y) * S), Math.round(r[2] * S), Math.round(r[3] * S)];
      const last = hl[hl.length - 1]; if (last && Math.abs(last[1] - q[1]) < 6 && q[0] <= last[0] + last[2] + 12) { last[2] = q[0] + q[2] - last[0]; } else hl.push(q); }
    db[name] = { file: 'assets/src/' + name + '.png', w: Math.round(clip.width * S), h: Math.round(clip.height * S), hl, source, date, url: U[pk], tag: info.tag, text: info.text, captured: new Date().toISOString() };
    console.log(name, info.tag, db[name].w + 'x' + db[name].h, 'hl', hl.length, '|', info.text.slice(0, 110));
    fs.writeFileSync(DB, JSON.stringify(db, null, 1));
  }
  await pg.close();
}
await browser.close();
