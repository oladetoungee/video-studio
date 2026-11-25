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

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const mode = process.argv[2] || 'text'; const filter = process.argv[3] || '';
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
          const deep = (root, sel, out = []) => { out.push(...root.querySelectorAll(sel)); for (const e of root.querySelectorAll('*')) if (e.shadowRoot) deep(e.shadowRoot, sel, out); return out; };
          const els = deep(document, 'button, a[role=button], [role=button], input[type=button], input[type=submit], .fc-cta-consent, #onetrust-accept-btn-handler');
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
  try { await page.keyboard.press('Escape'); await page.evaluate(() => document.activeElement && document.activeElement.blur && document.activeElement.blur()); } catch {}
  // remove leftover overlays, popups, floating players
  await page.evaluate(() => {
    const KILL = /(transcend|cookie|consent|gdpr|cmp|newsletter|subscribe-modal|modal|popup|pop-up|paywall|onetrust|sp_message|didomi|qc-cmp|tp-modal|tp-backdrop|piano|fc-ab-root|fc-consent|overlay|interstitial|sticky-video|floating-video|adhesion|ad-slot-sticky|toast|notification-prompt|push-prompt)/i;
    const deepAll = (root, out = []) => { for (const e of root.querySelectorAll('*')) { out.push(e); if (e.shadowRoot) deepAll(e.shadowRoot, out); } return out; };
    for (const el of deepAll(document.documentElement)) { if (el === document.body || el === document.head) continue;
      const cs = getComputedStyle(el);
      const idc0 = (el.id + ' ' + (el.className && el.className.baseVal !== undefined ? el.className.baseVal : el.className));
      if (/(^|[\s_-])(ad|ads|advert|advertisement|ad-unit|adunit|ad-slot|adslot|ad-container|leaderboard)([\s_-]|$)/i.test(idc0) && !el.querySelector('h1, article') && (el.innerText || '').length < 200) { el.remove(); continue; }
      if (cs.position !== 'fixed' && cs.position !== 'sticky') continue;
      const r = el.getBoundingClientRect(); const idc = (el.id + ' ' + (el.className && el.className.baseVal !== undefined ? el.className.baseVal : el.className));
      const adLike = /(^|[\s_-])(ad|ads|advert|advertisement|ad-slot|adslot|ad-unit|adunit|ad-container|leaderboard|dfp|gpt)([\s_-]|$)/i.test(idc) || /^\s*(advertisement|ad)\s*$/i.test((el.innerText || '').slice(0, 40));
      if (adLike) { el.remove(); continue; }
      const isHeader = r.top <= 5 && r.height < 160 && r.width > innerWidth * 0.8 && !KILL.test(idc);
      if (isHeader) continue;
      const big = r.width * r.height > innerWidth * innerHeight * 0.25;
      if (KILL.test(idc) || big || cs.position === 'fixed') el.remove();
    }
    document.querySelectorAll('iframe[id^=sp_message], [id^=sp_message_container], .fc-consent-root, #credential_picker_container').forEach(e => e.remove());
    for (const e of [document.documentElement, document.body]) { e.style.setProperty('overflow', e === document.body ? 'visible' : 'auto', 'important'); e.style.setProperty('position', 'static', 'important'); e.classList.remove('sp-message-open', 'modal-open', 'tp-modal-open', 'no-scroll'); }
    document.documentElement.style.setProperty('scroll-behavior', 'auto', 'important');
    if (document.documentElement.scrollHeight <= innerHeight + 50) {
      // page scrolls inside a container: unlock it so the window scrolls
      const sc = [document.body, ...document.querySelectorAll('body *')].filter(e => { const o = getComputedStyle(e).overflowY; return (o === 'auto' || o === 'scroll') && e.scrollHeight > e.clientHeight + 400; })
        .sort((a, b) => b.scrollHeight - a.scrollHeight)[0];
      if (sc) { let e = sc; while (e) { e.style.setProperty('height', 'auto', 'important'); e.style.setProperty('max-height', 'none', 'important'); e.style.setProperty('overflow', 'visible', 'important'); e = e.parentElement; } }
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
  const sc = u.zoom || 1; await page.setViewport({ width: Math.round(w / sc), height: Math.round(h / sc), deviceScaleFactor: sc });
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
        const hiddenish = rects.length && (rects[0].top + scrollY < 5 || (() => { let e = sn.parentElement; while (e) { const cs = getComputedStyle(e); if (cs.visibility === 'hidden' || cs.opacity === '0' || e.getAttribute('aria-hidden') === 'true' || cs.clipPath !== 'none' && cs.position === 'absolute') return true; e = e.parentElement; } return false; })());
        if (rects.length && !hiddenish) {
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
          const inH1 = !!sn.parentElement.closest('h1');
          // visible check: the element under the first line's centre must belong to the same subtree
          const sx0 = scrollX, sy0 = scrollY; const r0 = rects[0]; const docTop = r0.top + scrollY;
          window.scrollTo(0, Math.max(0, docTop - innerHeight / 3));
          const rr = [...r.getClientRects()].filter(x => x.width > 1 && x.height > 4)[0];
          const hit = rr && document.elementFromPoint(Math.min(innerWidth - 1, rr.left + Math.min(rr.width, 40) / 2), rr.top + rr.height / 2);
          const anc = r.commonAncestorContainer.nodeType === 1 ? r.commonAncestorContainer : r.commonAncestorContainer.parentElement;
          const visible = !!hit && (anc.contains(hit) || hit.contains(anc));
          window.scrollTo(sx0, sy0);
          const fs = (parseFloat(getComputedStyle(sn.parentElement).fontSize) || 0) + (inH1 ? 1000 : 0) + (visible ? 10000 : 0);
          const cand = { quote: q, box: { x: bx, y: by, w: bx1 - bx, h: by1 - by }, lines: ln, fs };
          if (!found || cand.fs > found.fs + 0.5) found = cand;
        }
        from = i + 1;
      }
      if (found) delete found.fs;
      out.push(found || { quote: q, box: null, lines: [], note: 'not found on page' });
    }
    return out;
  }, list);
}

const ease = t => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; // easeInOutCubic
// keyframes: [{t, y}] ; between consecutive keyframes with different y the move is eased; equal y = hold
const scrollAtK = (K, t) => {
  if (t <= K[0].t) return K[0].y;
  for (let i = 1; i < K.length; i++) if (t <= K[i].t) { const a = K[i - 1], b = K[i]; const p = (t - a.t) / (b.t - a.t); return a.y + (b.y - a.y) * ease(p); }
  return K[K.length - 1].y;
};
function planKeyframes(y0, stops) {
  // stops: sorted scroll targets (deduped). hold at start, at each stop; moves sized by distance
  const K = [{ t: 0, y: y0 }, { t: 1.0, y: y0 }]; let t = 1.0, y = y0; const holdAt = [];
  for (const sy of stops) {
    const d = Math.abs(sy - y); if (d < 120) { holdAt.push({ y: sy, t0: K[K.length - 2].t, t1: t }); continue; }
    const mv = Math.min(2.2, Math.max(0.8, 0.45 + Math.sqrt(d) / 34));
    t += mv; K.push({ t, y: sy }); const h = 1.1; holdAt.push({ y: sy, t0: t, t1: t + h }); t += h; K.push({ t, y: sy }); y = sy;
  }
  K[K.length - 1].t += 0.6; // tail hold
  return { K, holdAt, seconds: K[K.length - 1].t };
}

async function recordScroll(page, file, K) {
  const fps = 30; const total = Math.round(K[K.length - 1].t * fps);
  const ff = spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'mjpeg', '-i', '-',
    '-c:v', 'libx264', '-preset', 'medium', '-crf', '25', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', file], { stdio: ['pipe', 'inherit', 'inherit'] });
  for (let f = 0; f < total; f++) {
    const y = Math.round(scrollAtK(K, f / fps));
    await page.evaluate(y => window.scrollTo(0, y), y);
    const buf = await page.screenshot({ type: 'jpeg', quality: 88 });
    if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
  }
  ff.stdin.end(); await new Promise(r => ff.on('close', r));
  return { fps, frames: total, seconds: total / fps };
}

const launch = () => puppeteer.launch({ executablePath: findChrome(), headless: true, protocolTimeout: 90000,
  args: ['--disable-blink-features=AutomationControlled', '--force-color-profile=srgb', '--lang=en-GB', '--window-size=1920,1080', '--autoplay-policy=user-gesture-required'] });
const filters = filter.split(',').filter(Boolean);
const todo = urls.filter(u => !u.skip).filter(u => !filters.length || filters.some(f => (u.story + '/' + u.slug).includes(f)))
  .filter(u => !process.env.SKIP_DONE || !fs.existsSync(mode === 'text' ? path.join(ROOT, '_text', `${u.story}__${u.slug}.txt`) : path.join(ROOT, u.story, u.slug + '.json')));
const withTimeout = (p, ms) => Promise.race([p, new Promise((_, rej) => setTimeout(() => rej(new Error('page timeout ' + ms + 'ms')), ms).unref())]);
for (const u of todo) {
  const key = u.story + '/' + u.slug; const t0 = Date.now(); const browser = await launch();
  try { await withTimeout((async () => {
    if (mode === 'text') {
      const { page, status } = await open(browser, u, 1440, 900);
      await lazyScroll(page); const mt = await meta(page); const st = judge(status, mt);
      fs.writeFileSync(path.join(ROOT, '_text', `${u.story}__${u.slug}.txt`), `URL: ${u.url}\nSTATUS: ${st} (http ${status})\nFINAL: ${page.url()}\nTITLE: ${mt.title}\nH1: ${mt.h1}\nOG: ${mt.ogTitle} | ${mt.site}\nPUBLISHED: ${mt.published}  MODIFIED: ${mt.modified}\nDOC_H: ${mt.docH}\n\n${mt.text}`);
      console.log(`${key}\t${st}\thttp ${status}\t${mt.text.length} chars\t${((Date.now() - t0) / 1000).toFixed(1)}s`);
      await page.close();
    } else {
      const dir = path.join(ROOT, u.story); fs.mkdirSync(dir, { recursive: true });
      const base = path.join(dir, u.slug); const qs = quotes[key] || [];
      // (b) full page at 1440
      let { page, status } = await open(browser, u, 1440, 900);
      await lazyScroll(page); await dismiss(page);
      const mt = await meta(page); const st = judge(status, mt);
      const docH = await page.evaluate(() => document.documentElement.scrollHeight);
      const SC = u.zoom || 1; const VH = 1080 / SC; const S = v => Math.round(v * SC); const SB = b => b && ({ x: S(b.x), y: S(b.y), w: S(b.w), h: S(b.h) });
      const fullH = Math.min(S(docH), u.fullMax || 6000);
      const fullBoxes = await boxes(page, qs);
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.screenshot({ path: base + '_full.jpg', type: 'jpeg', quality: 82, clip: { x: 0, y: 0, width: 1440 / SC, height: fullH / SC }, captureBeyondViewport: true });
      // (a) fold + (c) scroll at 1920x1080
      if (u.reload) { await page.close(); ({ page } = await open(browser, u, 1920, 1080)); await lazyScroll(page); }
      else await page.setViewport({ width: Math.round(1920 / SC), height: Math.round(1080 / SC), deviceScaleFactor: SC });
      await sleep(1200); await page.evaluate(() => window.scrollTo(0, 0)); await dismiss(page); await sleep(600);
      if (process.env.DEBUG_TEXT) console.log('HIT', await page.evaluate((hx, hy) => { let x = document.elementFromPoint(hx, hy); const ch = []; while (x) { ch.push(x.tagName + '#' + x.id + '.' + String(x.className).slice(0, 30) + ':' + getComputedStyle(x).position + ':' + getComputedStyle(x).zIndex); x = x.parentElement; } return ch.join(' < '); }, +(process.env.HX || 960), +(process.env.HY || 300)));
      if (process.env.DEBUG_TEXT) for (const f of page.frames()) { try { const r = await f.evaluate(t => document.body && document.body.innerText.includes(t), process.env.DEBUG_TEXT); if (r) { const fe = await f.frameElement(); console.log('FRAME', f.url().slice(0, 100), fe ? await fe.evaluate(e => { const ch = []; let x = e; while (x) { ch.push(x.tagName + '#' + x.id + '.' + String(x.className).slice(0, 30) + ':' + getComputedStyle(x).position); x = x.parentElement; } return ch.join(' < '); }) : ''); } } catch (e) { console.log('ferr', e.message.slice(0, 80)); } }
      if (process.env.DEBUG_TEXT) console.log(await page.evaluate((t) => { const deepAll = (root, out = []) => { for (const e of root.querySelectorAll('*')) { out.push(e); if (e.shadowRoot) deepAll(e.shadowRoot, out); } return out; };
        for (const e of deepAll(document)) if (e.children.length === 0 && (e.textContent || '').includes(t)) { const ch = []; let x = e; while (x) { ch.push(x.tagName + '#' + x.id + '.' + String(x.className).slice(0, 40) + ':' + getComputedStyle(x).position + ':' + getComputedStyle(x).zIndex); x = x.parentElement || (x.getRootNode() && x.getRootNode().host); } return ch.join(' < '); } return 'not found'; }, process.env.DEBUG_TEXT));
      await page.screenshot({ path: base + '_fold.png' });
      const vb = await boxes(page, qs);
      const head = await page.evaluate(() => { const h = document.querySelector('h1'); return h ? Math.round(h.getBoundingClientRect().top + scrollY) : 0; });
      const docH2 = await page.evaluate(() => document.documentElement.scrollHeight);
      const maxY = Math.max(0, docH2 - VH);
      const y0 = Math.min(maxY, Math.max(0, head - 140));
      const found = vb.filter(b => b.box);
      const LIM = y0 + 5200; let capped = false;
      let stops = [...new Set(found.map(b => Math.min(maxY, Math.max(0, Math.round(b.box.y - VH * 0.38)))))].sort((p, q) => p - q);
      if (stops.some(v => v > LIM)) capped = true; stops = stops.filter(v => v <= LIM && v > y0 + 60);
      if (!stops.length) stops = [Math.min(maxY, y0 + 1400)];
      // keep video <= 14 s: drop middle stops if needed
      let plan = planKeyframes(y0, stops);
      while (plan.seconds > 14 && stops.length > 1) { stops.splice(Math.floor(stops.length / 2), 1); plan = planKeyframes(y0, stops); }
      if (plan.seconds < 8) { const K = plan.K; K[K.length - 1].t += 8 - plan.seconds; plan.seconds = 8; }
      const K = plan.K;
      const rec = await recordScroll(page, base + '_scroll.mp4', K);
      const vb2 = await boxes(page, qs); // check for layout drift
      const videoQuotes = vb.map((b, i) => {
        if (!b.box) return { quote: b.quote, inVideo: false, note: 'not found on page' };
        // best time: middle of a hold where the whole box is on screen, nearest to 38% height; else closest frame
        let best = null;
        for (let f = 0; f < rec.frames; f++) {
          const t = f / 30; const sy = scrollAtK(K, t); const top = b.box.y - sy;
          if (top < 8 / SC || top + b.box.h > VH - 6 / SC) continue;
          const still = Math.abs(scrollAtK(K, t + 0.2) - sy) < 2 && Math.abs(scrollAtK(K, t - 0.2) - sy) < 2;
          const score = (still ? 0 : 1000) + Math.abs(top - VH * 0.38);
          if (!best || score < best.score - 0.01) best = { t, score, still };
        }
        if (!best) return { quote: b.quote, inVideo: false, docBox: SB(b.box), note: 'below the part of the page the video scrolls through' };
        // centre of that hold
        let ta = best.t, tb = best.t; const sy0 = scrollAtK(K, best.t);
        while (ta > 0 && Math.abs(scrollAtK(K, ta - 1 / 30) - sy0) < 1) ta -= 1 / 30;
        while (tb < rec.seconds && Math.abs(scrollAtK(K, tb + 1 / 30) - sy0) < 1) tb += 1 / 30;
        const sy = sy0;
        const drift = vb2[i] && vb2[i].box ? Math.abs(vb2[i].box.y - b.box.y) : null;
        return { quote: b.quote, inVideo: true, still: best.still, t: +((ta + tb) / 2).toFixed(2), visibleStill: best.still ? [+ta.toFixed(2), +tb.toFixed(2)] : null, scrollY: S(sy),
          box: SB({ x: b.box.x, y: b.box.y - sy, w: b.box.w, h: b.box.h }), lines: b.lines.map(l => SB({ ...l, y: l.y - sy })), docBox: SB(b.box), layoutDriftPx: drift && S(drift) };
      });
      const rec2 = { story: u.story, outlet: u.outlet, slug: u.slug, url: u.url, finalUrl: page.url(), status: st, http: status,
        title: mt.ogTitle || mt.title, h1: mt.h1, published: mt.published,
        files: { fold: `${u.story}/${u.slug}_fold.png`, full: `${u.story}/${u.slug}_full.jpg`, scroll: `${u.story}/${u.slug}_scroll.mp4` },
        full: { width: 1440, height: fullH, pageHeight: S(docH), zoom: SC, quotes: fullBoxes.map(q => ({ ...q, box: SB(q.box), lines: (q.lines || []).map(SB) })) },
        scroll: { width: 1920, height: 1080, fps: 30, seconds: rec.seconds, keyframes: K.map(k => ({ t: +k.t.toFixed(3), y: S(k.y) })), zoom: SC, easing: 'easeInOutCubic between keyframes, holds where y is equal', capped,
          formula: 'scrollY(t): find keyframes a,b with a.t<=t<=b.t; scrollY = a.y + (b.y-a.y)*easeInOutCubic((t-a.t)/(b.t-a.t)); box on screen = docBox.y - scrollY(t)', quotes: videoQuotes } };
      fs.writeFileSync(base + '.json', JSON.stringify(rec2, null, 1));
      console.log(`${key}\t${st}\tfull ${fullH}px\tscroll ${rec.seconds.toFixed(1)}s\tquotes ${videoQuotes.filter(q => q.inVideo).length}/${qs.length} in video\t${((Date.now() - t0) / 1000).toFixed(1)}s`);
      await page.close();
    }
  })(), mode === 'text' ? 120000 : 420000); } catch (e) { console.log(`${key}\tFAIL\t${String(e.message).slice(0, 160)}`); }
  await withTimeout(browser.close(), 15000).catch(() => { try { browser.process().kill('SIGKILL'); } catch {} });
}
console.log('DONE');
