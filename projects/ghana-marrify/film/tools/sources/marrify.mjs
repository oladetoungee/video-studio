// Captures marrifyapp.com faithfully (homepage desktop+mobile, disclaimer banner, empty search pages, scroll recordings).
// Never types a name; record-list areas (which show real people's names) are clipped out.
import fs from 'fs';
import { launch, UA, UA_MOBILE, sleep, dismiss, withLock, ffmpegPipe, easeInOut } from './common.mjs';
const BASE = 'https://marrifyapp.com';
const OUT = '/Users/gbemi/Desktop/CODE/videos/projects/ghana-marrify/film/assets/sources/marrify';
fs.mkdirSync(OUT, { recursive: true });
const STAGE = process.argv[2] || 'all';
const meta = STAGE === 'all' || !fs.existsSync(`${OUT}/mf_meta.json`) ? { captured: {}, files: {} } : JSON.parse(fs.readFileSync(`${OUT}/mf_meta.json`, 'utf8'));
const b = await launch();
async function open(path, mobile = false, dpr = 2) {
  const p = await b.newPage();
  if (mobile) { await p.setUserAgent(UA_MOBILE); await p.setViewport({ width: 390, height: 844, deviceScaleFactor: 3, isMobile: true, hasTouch: true }); }
  else { await p.setUserAgent(UA); await p.setViewport({ width: 1920, height: 1080, deviceScaleFactor: dpr }); }
  const r = await p.goto(BASE + path, { waitUntil: 'networkidle2', timeout: 90000 });
  await p.evaluate(() => document.fonts.ready); await sleep(1500); await dismiss(p);
  console.log(path, mobile ? 'mobile' : 'desktop', r.status());
  return p;
}
// Freeze CSS animations (only the announcement marquee runs) at a chosen time so stills are reproducible.
const setAnimTime = (p, ms) => p.evaluate(ms => document.getAnimations().forEach(a => { a.pause(); a.currentTime = ms; }), ms);
async function lazyWalk(p) { const H = await p.evaluate(() => document.documentElement.scrollHeight); for (let y = 0; y < H; y += 600) { await p.evaluate(y => scrollTo(0, y), y); await sleep(250); } await p.evaluate(() => scrollTo(0, 0)); await sleep(800); }
const box = (p, fn) => p.evaluate(fn);

// ---------- desktop homepage ----------
let p;
if (STAGE === 'all') {
p = await open('/');
meta.captured.home = new Date().toISOString();
await lazyWalk(p);
const marquee = await p.evaluate(() => {
  const tr = document.querySelector('.nlh-announce-track'); const bar = tr.closest('div,section,header').parentElement;
  const a = document.getAnimations()[0];
  const r = e => { const q = e.getBoundingClientRect(); return { x: q.x, y: q.y, w: q.width, h: q.height }; };
  // find the visible bar = first ancestor at least 1900px wide
  let x = tr; while (x && x.getBoundingClientRect().width < 1800) x = x.parentElement;
  return { track: r(tr), trackScrollW: tr.scrollWidth, bar: r(x), clip: r(tr.parentElement), duration: a?.effect.getTiming().duration, keyframes: a?.effect.getKeyframes().map(k => k.transform) };
});
console.log('marquee', JSON.stringify(marquee));
meta.marquee = marquee;
// homepage top, marquee at its start position
await setAnimTime(p, 0); await sleep(300);
await p.screenshot({ path: `${OUT}/mf_01_home_desktop.png` }); meta.files.mf_01_home_desktop = { url: BASE + '/', viewport: '1920x1080 @2x', marquee_time_ms: 0 };
const geoms = await p.evaluate(() => {
  const r = e => { if (!e) return null; const q = e.getBoundingClientRect(); return { x: +(q.x + scrollX).toFixed(1), y: +(q.y + scrollY).toFixed(1), w: +q.width.toFixed(1), h: +q.height.toFixed(1) }; };
  const find = re => [...document.querySelectorAll('h1,h2,h3,p,span,div,a,button,input')].find(e => re.test((e.innerText || e.placeholder || '').trim()) && e.children.length < 4);
  return { hero_h1: r(document.querySelector('h1')), search_input: r(document.querySelector('input[type="search"], input[type="text"], input')), search_button: r([...document.querySelectorAll('button')].find(e => /Search records/i.test(e.innerText))),
    stats_1886_2026: r(find(/^1886-2026/)), source_partners_heading: r(find(/^Built around official registry/)), records_heading: r(find(/^Search, verify and connect/)) };
});
meta.home_boxes_doc_css = geoms; console.log(JSON.stringify(geoms));
// disclaimer banner: two positions so the whole sentence is readable across the pair
const shotsT = [];
for (let k = 0; k < 4; k++) {
  const t = Math.round(k * marquee.duration / 8); await setAnimTime(p, t); await sleep(250);
  const name = `mf_02_disclaimer_banner_${k + 1}`;
  await p.screenshot({ path: `${OUT}/${name}.png`, clip: { x: 0, y: 0, width: 1920, height: Math.ceil(marquee.bar.h) } });
  meta.files[name] = { url: BASE + '/', clip: `top bar 1920x${Math.ceil(marquee.bar.h)} css px @2x`, marquee_time_ms: t };
}
// full page @1x
await setAnimTime(p, 0);
await p.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 }); await sleep(800);
await p.screenshot({ path: `${OUT}/mf_00_home_fullpage.png`, fullPage: true }); meta.files.mf_00_home_fullpage = { url: BASE + '/', note: 'full page @1x' };
await p.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 2 }); await sleep(800);

// recordings (animations stepped deterministically at real speed: frame i -> t0 + i/30 s)
async function record(p, name, keys, fps = 30) {
  const T = keys[keys.length - 1][0], N = Math.round(T * fps), tl = [];
  await p.evaluate(y => scrollTo(0, y), keys[0][1]); await sleep(800);
  await withLock('sources-agent', async () => {
    const ff = ffmpegPipe(`${OUT}/${name}.mp4`, { fps });
    for (let i = 0; i < N; i++) {
      const t = i / fps; let k = 0; while (k < keys.length - 2 && t >= keys[k + 1][0]) k++;
      const [t0, y0] = keys[k], [t1, y1] = keys[k + 1];
      const y = Math.round((y0 + (y1 - y0) * easeInOut((t - t0) / (t1 - t0))) * 2) / 2;
      await p.evaluate((y, ms) => { scrollTo(0, y); document.getAnimations().forEach(a => { a.pause(); a.currentTime = ms; }); }, y, t * 1000);
      tl.push(await p.evaluate(() => scrollY));
      await ff.write(await p.screenshot({ type: 'png' }));
      if (i % 60 === 0) console.log(name, i, '/', N);
    }
    await ff.end();
  });
  meta.files[name] = { url: p.url(), fps, frames: N, duration_s: T, size: '1920x1080 (captured @2x, downscaled)', keys, scrollY_per_frame: tl };
}
// A: top of homepage held (disclaimer marquee crawls at its real speed), 10 s
await record(p, 'mf_home_marquee_hold', [[0, 0], [10, 0]]);
// B: homepage scroll from hero down to the records grid
const recY = Math.max(0, Math.round(geoms.records_heading.y - 140));
await record(p, 'mf_scroll_home', [[0, 0], [1.5, 0], [8.5, recY], [11, recY]]);
await p.close();
fs.writeFileSync(`${OUT}/mf_meta.json`, JSON.stringify(meta, null, 1));
}

// ---------- empty search pages (clip ends above the results list: no personal names) ----------
for (const [path, name] of [['/divorce-records', 'mf_03_divorce_records_search'], ['/marriage-records', 'mf_04_marriage_records_search']]) {
  p = await open(path); meta.captured[name] = new Date().toISOString();
  await setAnimTime(p, 0);
  const cut = await p.evaluate(() => {
    const cards = [...document.querySelectorAll('*')].filter(e => e.children.length === 0 && /^(REGISTRY MATCH|View record)$/i.test(e.textContent.trim()) && e.getBoundingClientRect().height > 0);
    const firstCard = Math.min(...cards.map(e => e.getBoundingClientRect().y)) - 20; // card top is above its first label
    const res = [...document.querySelectorAll('*')].find(e => e.children.length === 0 && /SEARCH RESULTS/i.test(e.textContent));
    const count = [...document.querySelectorAll('h1,h2,h3,p,div,span')].find(e => e.children.length === 0 && /^\d+ (divorce|marriage) records$/i.test(e.textContent.trim()));
    const input = [...document.querySelectorAll('input')].find(e => e.placeholder && e.getBoundingClientRect().width > 300);
    const q = e => { const r = e.getBoundingClientRect(); return { x: r.x, y: r.y + scrollY, w: r.width, h: r.height }; };
    return { firstCardY: firstCard + scrollY, resultsLabel: res && q(res), countBox: count && q(count), countText: count?.textContent.trim(), input: input && q(input), placeholder: input?.placeholder, inputValue: input?.value, h1: document.querySelector('h1')?.innerText };
  });
  console.log(name, JSON.stringify(cut));
  if (cut.inputValue) throw new Error('search box not empty');
  const H = Math.floor(Math.min(1080, (cut.countBox ? cut.countBox.y + cut.countBox.h + 14 : cut.firstCardY - 16)));
  console.log('H', H, 'firstCard', cut.firstCardY); if (H > cut.firstCardY - 4) throw new Error('clip would include a record card');
  await p.screenshot({ path: `${OUT}/${name}.png`, clip: { x: 0, y: 0, width: 1920, height: H } });
  meta.files[name] = { url: BASE + path, clip: `1920x${H} css px @2x from top; stops above the first record card (record cards list real people's names)`, boxes_css: cut };
  await p.close();
}

// ---------- mobile homepage ----------
p = await open('/', true); meta.captured.home_mobile = new Date().toISOString();
await lazyWalk(p); await setAnimTime(p, 0); await sleep(300);
await p.screenshot({ path: `${OUT}/mf_05_home_mobile.png` }); meta.files.mf_05_home_mobile = { url: BASE + '/', viewport: '390x844 @3x (iPhone UA)', marquee_time_ms: 0 };
await p.evaluate(() => scrollTo(0, 0));
await p.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true, hasTouch: true }); await sleep(800);
await p.screenshot({ path: `${OUT}/mf_06_home_mobile_fullpage.png`, fullPage: true }); meta.files.mf_06_home_mobile_fullpage = { url: BASE + '/', viewport: '390 wide @2x full page' };
await p.close();

fs.writeFileSync(`${OUT}/mf_meta.json`, JSON.stringify(meta, null, 1));
await b.close(); console.log('done');
