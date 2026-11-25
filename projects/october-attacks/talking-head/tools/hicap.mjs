// Real-source capture for october-attacks.
// node capture.mjs text  [slug-filter]   -> load each page, dismiss banners, save article text + meta to _text/
// node capture.mjs full  [slug-filter]   -> fold PNG (1920x1080), full JPG (1440 wide, <=6000 tall),
//                                           scroll MP4 (1920x1080 30fps), quote boxes -> <story>/<slug>.json
// slug-filter = "story/slug" substring; quotes come from tools/quotes.json { "story/slug": ["exact phrase", ...] }
import { createRequire } from 'node:module';
import fs from 'node:fs'; import path from 'node:path'; import os from 'node:os';
import { spawn } from 'node:child_process';
const require = createRequire('/Users/gbemi/Desktop/CODE/videos/studio/package.json');
const puppeteer = require('puppeteer-core');

const ROOT = "/Users/gbemi/Desktop/CODE/videos/projects/october-attacks/assets/sources";

const urls = JSON.parse(fs.readFileSync(path.join(ROOT, 'tools/urls.json'), 'utf8'));
const quotes = fs.existsSync(path.join(ROOT, 'tools/quotes.json')) ? JSON.parse(fs.readFileSync(path.join(ROOT, 'tools/quotes.json'), 'utf8')) : {};

function findChrome() {
  const base = path.join(os.homedir(), '.cache/puppeteer/chrome');
  for (const v of fs.readdirSync(base).sort().reverse()) {
    const p = path.join(base, v, 'chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing');
    if (fs.existsSync(p)) return p;
  }
  return '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
}
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36';
const AD_RE = /(doubleclick\.net|googlesyndication|googleadservices|adservice\.google|amazon-adsystem|taboola|outbrain|criteo|pubmatic|rubiconproject|adnxs|moatads|scorecardresearch|quantserve|quantcount|teads|sharethrough|openx\.net|casalemedia|indexww|33across|adsrvr|bidswitch|smartadserver|yieldmo|media\.net|zemanta|revcontent|mgid|adform|onetag|sovrn|lijit|gumgum|primis|connatix|jwplayer|anyclip|aniview|vidazoo|minute\.ly|ex\.co|playwire|adthrive|raptive|mediavine|ezoic|cdn\.confiant|clarity\.ms|hotjar|newrelic|nr-data|chartbeat|parsely|permutive|blueconic|bounceexchange|bxcdn|tinypass|piano\.io|cxense|optimizely|googletagservices|pagead)/i;
const sleep = ms => new Promise(r => setTimeout(r, ms));

const ACCEPT_RE = /^(accept( all)?( cookies)?|accept all & close|accept and close|accept & close|i accept|agree|i agree|agree and close|agree & proceed|allow all( cookies)?|allow cookies|got it|ok|okay|consent|yes, i agree|continue|accept & continue|close)$/i;
async function dismiss(page) {
  for (let round = 0; round < 2; round++) {
    for (const f of page.frames()) {
      try {
        await withTimeout(f.evaluate((src) => {
          const re = new RegExp(src, 'i');
          const els = [...document.querySelectorAll('button, a[role=button], [role=button], input[type=button], input[type=submit], .fc-cta-consent, #onetrust-accept-btn-handler')];
          for (const el of els) {
            const t = (el.innerText || el.value || el.getAttribute('aria-label') || '').trim().replace(/\s+/g, ' ');
            const r = el.getBoundingClientRect();
            if (r.width > 0 && r.height > 0 && (re.test(t) || el.id === 'onetrust-accept-btn-handler' || el.classList.contains('fc-cta-consent'))) { el.click(); return true; }
          }
          return false;
        }, ACCEPT_RE.source), 3000);
      } catch {}
    }
    await sleep(900);
  }
  // remove leftover overlays, popups, floating players
  await page.evaluate(() => {
    const KILL = /(cookie|consent|gdpr|cmp|newsletter|subscribe-modal|modal|popup|pop-up|paywall|onetrust|sp_message|didomi|qc-cmp|tp-modal|tp-backdrop|piano|fc-ab-root|fc-consent|overlay|interstitial|sticky-video|floating-video|adhesion|ad-slot-sticky|toast|notification-prompt|push-prompt)/i;
    for (const el of [...document.querySelectorAll('body *')]) {
      const cs = getComputedStyle(el);
      if (cs.position !== 'fixed' && cs.position !== 'sticky') continue;
      const r = el.getBoundingClientRect(); const idc = (el.id + ' ' + (el.className && el.className.baseVal !== undefined ? el.className.baseVal : el.className));
      const isHeader = r.top <= 5 && r.height < 160 && r.width > innerWidth * 0.8 && !KILL.test(idc);
      if (isHeader) continue;
      const big = r.width * r.height > innerWidth * innerHeight * 0.25;
      if (KILL.test(idc) || big || cs.position === 'fixed') el.remove();
    }
    document.querySelectorAll('iframe[id^=sp_message], [id^=sp_message_container], .fc-consent-root, #credential_picker_container').forEach(e => e.remove());
    for (const e of [document.documentElement, document.body]) { e.style.setProperty('overflow', 'auto', 'important'); e.style.setProperty('position', 'static', 'important'); e.classList.remove('sp-message-open', 'modal-open', 'tp-modal-open', 'no-scroll'); }
    document.documentElement.style.setProperty('scroll-behavior', 'auto', 'important');
    if (document.documentElement.scrollHeight <= innerHeight + 50) {
      // page scrolls inside a container: unlock it so the window scrolls
      const sc = [...document.querySelectorAll('body *')].filter(e => { const o = getComputedStyle(e).overflowY; return (o === 'auto' || o === 'scroll') && e.scrollHeight > e.clientHeight + 400; })
        .sort((a, b) => b.scrollHeight - a.scrollHeight)[0];
      if (sc) { let e = sc; while (e && e !== document.documentElement) { e.style.setProperty('height', 'auto', 'important'); e.style.setProperty('max-height', 'none', 'important'); e.style.setProperty('overflow', 'visible', 'important'); e = e.parentElement; } }
    }
    const st = document.createElement('style'); st.textContent = 'html,body{scroll-behavior:auto!important} *{animation-play-state:paused!important}'; document.head.appendChild(st);
  });
}

async function open(browser, u, w, h) {
  const page = await browser.newPage();
  page.on('dialog', d => d.dismiss().catch(() => {}));
  page.setDefaultTimeout(30000);
  await page.setRequestInterception(true);
  page.on('request', r => { try { if (AD_RE.test(r.url()) || r.resourceType() === 'media') r.abort(); else r.continue(); } catch {} });
  await page.setUserAgent(UA);
  await page.setExtraHTTPHeaders({ 'Accept-Language': 'en-GB,en;q=0.9' });
  await page.evaluateOnNewDocument(() => { Object.defineProperty(navigator, 'webdriver', { get: () => false }); });
  await page.setViewport({ width: w, height: h, deviceScaleFactor: 1 });
  let status = 0;
  try { const resp = await page.goto(u.url, { waitUntil: 'domcontentloaded', timeout: 40000 }); await page.waitForNetworkIdle({ idleTime: 800, timeout: 12000 }).catch(() => {}); status = resp ? resp.status() : 0; }
  catch (e) { try { await page.evaluate(() => 1); status = -1; } catch { } }
  await sleep(2500);
  await dismiss(page);
  return { page, status };
}

async function lazyScroll(page) {
  await page.evaluate(async () => {
    const H = () => Math.min(document.documentElement.scrollHeight, 9000);
    for (let y = 0; y < H(); y += 600) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 120)); }
    window.scrollTo(0, 0);
  });
  await sleep(800);
}

async function meta(page) {
  return page.evaluate(() => {
    const m = n => (document.querySelector(`meta[property="${n}"]`) || document.querySelector(`meta[name="${n}"]`) || {}).content || '';
    const h1 = (document.querySelector('h1') || {}).innerText || '';
    const timeEl = document.querySelector('time[datetime]');
    const cands = [...document.querySelectorAll('article, main, [role=main], .articlebody, .post-body, .entry-content, .article-body')];
    let root = cands.sort((a, b) => (b.innerText || '').length - (a.innerText || '').length)[0];
    if (!root || (root.innerText || '').length < 1500) root = document.body;
    return {
      title: document.title, h1: h1.trim(), ogTitle: m('og:title'), site: m('og:site_name'),
      published: m('article:published_time') || m('datePublished') || m('publish-date') || m('date') || (timeEl ? timeEl.getAttribute('datetime') : '') || '',
      modified: m('article:modified_time') || '',
      text: (root.innerText || '').replace(/\n{3,}/g, '\n\n'), bodyLen: (document.body.innerText || '').length,
      docH: document.documentElement.scrollHeight,
    };
  });
}

function judge(st, mt) {
  const t = (mt.title + ' ' + mt.text.slice(0, 600)).toLowerCase();
  if (/just a moment|attention required|access denied|are you a robot|verify you are human|captcha|403 forbidden|request blocked|enable javascript and cookies/.test(t)) return 'blocked';
  if (st >= 400) return 'error-' + st;
  if (mt.bodyLen < 400) return 'empty';
  return 'loaded';
}

// find quote boxes (document coordinates) at current viewport
async function boxes(page, list) {
  return page.evaluate((list) => {
    const norm = s => s.replace(/[‘’‛′]/g, "'").replace(/[“”″]/g, '"').replace(/[–—]/g, '-').replace(/ /g, ' ').toLowerCase();
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    let s = ''; const map = []; let prevSpace = true; let n; let prevBlock = null; let prevNode = null;
    const blockOf = el => { while (el && el !== document.body) { const d = getComputedStyle(el).display; if (!d.startsWith('inline') && d !== 'contents') return el; el = el.parentElement; } return document.body; };
    while ((n = walker.nextNode())) {
      const p = n.parentElement; if (!p || /^(SCRIPT|STYLE|NOSCRIPT)$/.test(p.tagName)) continue;
      const blk = blockOf(p);
      if (prevNode && blk !== prevBlock && !prevSpace) { s += ' '; map.push([prevNode, prevNode.nodeValue.length]); prevSpace = true; }
      prevBlock = blk; prevNode = n;
      const txt = norm(n.nodeValue);
      for (let i = 0; i < txt.length; i++) {
        const c = /\s/.test(txt[i]) ? ' ' : txt[i];
        if (c === ' ' && prevSpace) continue;
        s += c; map.push([n, i]); prevSpace = c === ' ';
      }
    }
    const out = [];
    for (const q of list) {
      const nq = norm(q).replace(/\s+/g, ' ').trim();
      let from = 0, found = null;
      while (true) {
        const i = s.indexOf(nq, from); if (i < 0) break;
        const [sn, so] = map[i]; const [en, eo] = map[i + nq.length - 1];
        const r = document.createRange(); r.setStart(sn, so); r.setEnd(en, Math.min(eo + 1, en.nodeValue.length));
        const rects = [...r.getClientRects()].filter(x => x.width > 1 && x.height > 4);
        if (rects.length) {
          // merge rects into lines
          const lines = [];
          for (const x of rects) {
            const L = lines.find(l => Math.abs(l.y - x.top) < x.height * 0.5);
            if (L) { L.x1 = Math.max(L.x1, x.right); L.x = Math.min(L.x, x.left); L.h = Math.max(L.h, x.height); }
            else lines.push({ x: x.left, y: x.top, x1: x.right, h: x.height });
          }
          const ln = lines.map(l => ({ x: Math.round(l.x + scrollX), y: Math.round(l.y + scrollY), w: Math.round(l.x1 - l.x), h: Math.round(l.h) }));
          const bx = Math.min(...ln.map(l => l.x)), by = Math.min(...ln.map(l => l.y));
          const bx1 = Math.max(...ln.map(l => l.x + l.w)), by1 = Math.max(...ln.map(l => l.y + l.h));
          found = { quote: q, box: { x: bx, y: by, w: bx1 - bx, h: by1 - by }, lines: ln }; break;
        }
        from = i + 1;
      }
      out.push(found || { quote: q, box: null, lines: [], note: 'not found on page' });
    }
    return out;
  }, list);
}

const ease = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; // easeInOutCubic
// keyframes: [{t, y}] ; between consecutive keyframes with different y the move is eased; equal y = hold

/* ---- hicap: sharp crops for the talking-head edit (2026-10-26, talking-head agent) ----
 * node hicap.mjs "story/slug:0,2,head" ...   -> talking-head/assets/src/<story>-<slug>-{head|qN}.jpg + index.json
 * DPR 2, viewport 1100 wide; each crop is the article column around the quote (so the text fills a panel and reads on a
 * phone), lines of the quote in crop pixels (for the highlighter). Pages only cropped, never changed. */
const OUT = '/Users/gbemi/Desktop/CODE/videos/projects/october-attacks/talking-head/assets/src';
const IDX = path.join(OUT, 'index.json'); const index = fs.existsSync(IDX) ? JSON.parse(fs.readFileSync(IDX, 'utf8')) : {};
const withTimeout = (p, ms) => Promise.race([p, new Promise((_, rej) => setTimeout(() => rej(new Error('page timeout ' + ms + 'ms')), ms).unref())]);
const launch = () => puppeteer.launch({ executablePath: findChrome(), headless: true, protocolTimeout: 90000,
  args: ['--disable-blink-features=AutomationControlled', '--force-color-profile=srgb', '--lang=en-GB', '--window-size=640,1100', '--autoplay-policy=user-gesture-required'] });
const S = 2; const VW = +process.env.VW || 640;
for (const spec of process.argv.slice(2)) {
  const [key, what] = spec.split(':'); const u = urls.find(x => x.story + '/' + x.slug === key); if (!u) { console.log('no url', key); continue; }
  const items = (what || 'head').split(','); const qs = quotes[key] || [];
  const browser = await launch(); const t0 = Date.now();
  try { await withTimeout((async () => {
    const page = await (async () => { const r = await open(browser, u, VW, 1100); return r.page; })();
    await page.setViewport({ width: VW, height: 1100, deviceScaleFactor: S }); await sleep(800);
    await lazyScroll(page); await dismiss(page); await page.evaluate(() => window.scrollTo(0, 0)); await sleep(500);
    const mt = await meta(page);
    const date = (() => { const m = (mt.published || '').match(/(\d{4})-(\d{2})-(\d{2})/); if (m) return new Date(+m[1], +m[2] - 1, +m[3]).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      const m2 = mt.text.slice(0, 3000).match(/\b(Oct(?:ober)?\.?\s+\d{1,2},?\s+2026)/); return m2 ? m2[1].replace('October', 'Oct').replace('Oct.', 'Oct') : ''; })();
    const docW = VW;
    for (const it of items) {
      let crop, lines = [], quote = '';
      if (it === 'head') {
        const r = await page.evaluate(() => { const h = document.querySelector('h1'); if (!h) return null; const b = h.getBoundingClientRect(); return { x: b.x, y: b.y + scrollY, w: b.width, h: b.height }; });
        if (!r) { console.log(key, 'no h1'); continue; }
        const x0 = Math.max(0, r.x - 28), x1 = Math.min(docW, Math.max(r.x + r.w, x0 + 560) + 28);
        crop = { x: x0, y: Math.max(0, r.y - 40), width: x1 - x0, height: r.h + 190 }; quote = mt.h1;
      } else {
        const qi = +it; const q = qs[qi]; if (!q) continue; const [b] = await boxes(page, [q]); if (!b.box) { console.log(key, it, 'not found'); continue; }
        const col = await page.evaluate((y, x) => { let el = document.elementFromPoint(x - scrollX + 2, y - scrollY + 2);
          while (el && el.parentElement && getComputedStyle(el).display.startsWith('inline')) el = el.parentElement;
          if (!el) return null; const r = el.getBoundingClientRect(); return { x: r.x + scrollX, w: r.width }; }, b.box.y + 4, b.box.x + 4);
        // elementFromPoint needs the quote on screen
        await page.evaluate((y) => window.scrollTo(0, Math.max(0, y - 400)), b.box.y); await sleep(300);
        const col2 = await page.evaluate((y, x) => { let el = document.elementFromPoint(x - scrollX + 2, y - scrollY + 2);
          while (el && el.parentElement && getComputedStyle(el).display.startsWith('inline')) el = el.parentElement;
          if (!el) return null; const r = el.getBoundingClientRect(); return { x: r.x + scrollX, w: r.width }; }, b.box.y + 4, b.box.x + 4) || col;
        let x0 = Math.max(0, Math.min(b.box.x, col2 ? col2.x : b.box.x) - 28), x1 = Math.min(docW, Math.max(b.box.x + b.box.w, col2 ? col2.x + col2.w : 0) + 28);
        if (x1 - x0 < 520) { x0 = 0; x1 = docW; }
        crop = { x: x0, y: Math.max(0, b.box.y - 300), width: x1 - x0, height: b.box.h + 300 + 170 };
        lines = b.lines.map(l => [Math.round((l.x - crop.x) * S), Math.round((l.y - crop.y) * S), Math.round(l.w * S), Math.round(l.h * S)]); quote = q;
      }
      const name = `${u.story}-${u.slug}-${it === 'head' ? 'head' : 'q' + it}.jpg`;
      await page.evaluate(() => window.scrollTo(0, 0)); await sleep(200);
      await page.screenshot({ path: path.join(OUT, name), type: 'jpeg', quality: 86, clip: crop, captureBeyondViewport: true });
      index[name.replace('.jpg', '')] = { file: 'assets/src/' + name, w: Math.round(crop.width * S), h: Math.round(crop.height * S), lines, quote, outlet: u.outlet, date, url: u.url, story: u.story };
      fs.writeFileSync(IDX, JSON.stringify(index, null, 1));
    }
    console.log(key, items.join(','), date, ((Date.now() - t0) / 1000).toFixed(1) + 's');
  })(), 240000); } catch (e) { console.log(key, 'FAIL', String(e.message).slice(0, 160)); }
  await withTimeout(browser.close(), 15000).catch(() => { try { browser.process().kill('SIGKILL'); } catch {} });
}
console.log('DONE');
