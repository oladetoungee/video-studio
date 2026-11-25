// Captures TechCabal Daily (8 Sep 2026) Marrify section faithfully: screenshots, text, boxes, scroll recordings.
import fs from 'fs';
import { launch, UA, sleep, dismiss, RECTS_FN, withLock, ffmpegPipe, easeInOut } from './common.mjs';
const URL = 'https://techcabal.com/2026/09/08/techcabal-daily-a-451-million-divestiture/';
const OUT = '/Users/gbemi/Desktop/CODE/videos/projects/ghana-marrify/film/assets/sources/techcabal';
fs.mkdirSync(OUT, { recursive: true });
const only = process.argv[2] || 'all';
const b = await launch(); const p = await b.newPage();
await p.setUserAgent(UA); await p.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 2 });
const resp = await p.goto(URL, { waitUntil: 'networkidle2', timeout: 90000 });
const captured = new Date().toISOString();
console.log('status', resp.status(), captured);
await sleep(2500);
// walk the page once so lazy images/ads load, closing popups as they appear
const H = await p.evaluate(() => document.documentElement.scrollHeight);
for (let y = 0; y < H; y += 700) { await p.evaluate(y => window.scrollTo(0, y), y); await sleep(350); await dismiss(p); }
await sleep(2000); await dismiss(p);
await p.evaluate(() => window.scrollTo(0, 0)); await sleep(1500); await dismiss(p); await sleep(800);
console.log('remaining fixed overlays:', await p.evaluate(() => [...document.querySelectorAll('body *')].filter(e => getComputedStyle(e).position === 'fixed' && e.offsetWidth > 50 && e.offsetHeight > 30).map(e => e.className.toString().slice(0, 50) + '#' + e.id)));

const rectsFn = new Function('return ' + RECTS_FN)();
const geo = await p.evaluate((fnSrc) => {
  const rects = eval(fnSrc);
  const box = e => { const r = e.getBoundingClientRect(); return { x: +(r.x + scrollX).toFixed(1), y: +(r.y + scrollY).toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1) }; };
  const h1 = document.querySelector('h1');
  const h3 = [...document.querySelectorAll('h3')].find(e => /Ghana Launches Digital Marriage Records Platform/i.test(e.textContent));
  const story = h3.closest('[id^="Story"]') || h3.parentElement.parentElement;
  const kicker = [...story.querySelectorAll('*')].find(e => e.children.length === 0 && e.textContent.trim() === 'GOVERNMENT' || e.children.length === 0 && e.textContent.trim().toLowerCase() === 'government');
  const paras = [...story.querySelectorAll('p')].filter(e => e.textContent.trim().length > 20);
  const P = re => paras.find(e => re.test(e.textContent));
  const pDraw = P(/drawback/), pWhat = P(/^What happened\?/), pYet = P(/^Yet, Marrify/), pBig = P(/^The bigger picture/), pMore = P(/^More seriously/);
  const phrases = {
    drawback_lead: [pDraw, 'But there’s a drawback:'],
    drawback_sensitive: [pDraw, 'Marriage and divorce records are sensitive personal information.'],
    drawback_misuse: [pDraw, 'Making them easier to access can reduce fraud and bureaucracy, but it can also make stalking, harassment, unwanted disclosure, and other forms of misuse easier if the safeguards are weak.'],
    drawback_misuse_short: [pDraw, 'stalking, harassment, unwanted disclosure, and other forms of misuse'],
    launch_sentence: [pWhat, 'Ghana has launched Marrify, a digital platform that lets people search and verify registered marriage and divorce records.'],
    verify_officials: [pWhat, 'It can also verify marriage officers, licensed venues, churches, pastors, and imams'],
    data_sources: [pBig, 'Marrify says it pulls data from the Registrar-General’s Department, courts, local assemblies, and the Ghana Gazette.'],
    searchable_infrastructure: [pMore, 'Marrify turns marriage records from something people largely have to chase through offices and institutions into searchable digital infrastructure.'],
    not_truth_machine: [pYet, 'Yet, Marrify cannot be a magic marital-status truth machine.'],
  };
  const out = { scrollHeight: document.documentElement.scrollHeight, headerHeightSticky: document.querySelector('header')?.getBoundingClientRect().height,
    elements: { page_headline_h1: box(h1), section_kicker: kicker ? box(kicker) : null, section_heading_h3: box(h3), section_story: box(story),
      para_what_happened: box(pWhat), para_more_seriously: box(pMore), para_drawback: box(pDraw), para_bigger_picture: box(pBig), para_yet: box(pYet) },
    phrases: {}, text: {} };
  for (const [k, [el, ph]] of Object.entries(phrases)) out.phrases[k] = { text: ph, lines: el ? rects(el, ph) : null };
  out.text.h1 = h1.innerText.trim(); out.text.byline = (document.querySelector('.wp-block-post-author-name, [class*="author"]')?.innerText || '').trim();
  out.text.section = [kicker?.innerText, h3.innerText, ...paras.map(e => e.innerText.trim())].filter(Boolean);
  // images/captions in section
  out.text.captions = [...story.querySelectorAll('figcaption')].map(e => e.innerText.trim());
  return out;
}, RECTS_FN);
geo.url = URL; geo.captured = captured; geo.viewport = { width: 1920, height: 1080, deviceScaleFactor: 2 };
geo.note = 'All boxes are DOCUMENT coordinates in CSS px (page width 1920). Screenshot/frame pixel = (doc - scroll) for the 1920x1080 videos; x2 for the @2x PNGs. Sticky site header covers the top ' + Math.round(geo.headerHeightSticky || 0) + ' px of the viewport once scrolled.';
for (const [k, v] of Object.entries(geo.phrases)) if (!v.lines) console.log('PHRASE NOT FOUND', k);
console.log(JSON.stringify(geo.elements));

const HDR = 80; // sticky header height after scroll (approx; measured below)
const shots = {};
async function shotAt(name, scrollY) {
  await p.evaluate(y => window.scrollTo(0, y), scrollY); await sleep(900); await dismiss(p); await sleep(300);
  const sy = await p.evaluate(() => scrollY);
  await p.screenshot({ path: `${OUT}/${name}.png` }); shots[name] = { scrollY: sy, size: '3840x2160 (@2x of 1920x1080)' };
  console.log('shot', name, sy);
}
geo.screenshots = {};
if (only === 'all' || only === 'shots') {
  await shotAt('tc_01_page_headline', 0);
  const E = geo.elements;
  const kY = (E.section_kicker || E.section_heading_h3).y;
  await shotAt('tc_02_marrify_heading', Math.max(0, kY - 160));
  const d = E.para_drawback; await shotAt('tc_03_drawback_paragraph', Math.round(d.y + d.h / 2 - 1080 / 2 - 20));
  await shotAt('tc_04_launch_paragraphs', Math.round(E.para_what_happened.y - 220));
  // tight element crops of the real page (no edits), document clip
  const clip = (b, pad = 24) => ({ x: b.x - pad, y: b.y - pad, width: b.w + pad * 2, height: b.h + pad * 2 });
  await p.evaluate(() => window.scrollTo(0, 0)); await sleep(500);
  const cl = async (name, c) => { await p.screenshot({ path: `${OUT}/${name}.png`, clip: c, captureBeyondViewport: true }); shots[name] = { clip_doc_css: c, scale: 2 }; console.log('crop', name); };
  // crops: scroll the element into view first so the sticky header isn't drawn over it
  for (const [name, el] of [['tc_crop_drawback_paragraph', E.para_drawback], ['tc_crop_what_happened_paragraph', E.para_what_happened], ['tc_crop_section_heading', E.section_kicker ? { x: Math.min(E.section_kicker.x, E.section_heading_h3.x), y: E.section_kicker.y, w: Math.max(E.section_heading_h3.w, E.section_kicker.w), h: E.section_heading_h3.y + E.section_heading_h3.h - E.section_kicker.y } : E.section_heading_h3], ['tc_crop_page_headline', { x: E.page_headline_h1.x, y: E.page_headline_h1.y - 50, w: E.page_headline_h1.w, h: 170 }]]) {
    await p.evaluate(y => window.scrollTo(0, y), Math.max(0, el.y - 400)); await sleep(500); await dismiss(p);
    const vy = await p.evaluate(() => scrollY);
    const c = clip(el); await p.screenshot({ path: `${OUT}/${name}.png`, clip: c, captureBeyondViewport: false }); shots[name] = { clip_doc_css: c, scale: 2 }; console.log('crop', name);
  }
  // full page (@1x to stay under GPU texture limits)
  await p.evaluate(() => window.scrollTo(0, 0)); await sleep(800); await dismiss(p);
  await p.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 1 }); await sleep(1500); await dismiss(p);
  await p.screenshot({ path: `${OUT}/tc_00_fullpage.png`, fullPage: true }); shots.tc_00_fullpage = { scale: 1, note: 'full page @1x' };
  await p.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 2 }); await sleep(1500);
  geo.screenshots = shots;
  fs.writeFileSync(`${OUT}/tc_boxes.json`, JSON.stringify(geo, null, 1));
  fs.writeFileSync(`${OUT}/tc_text.json`, JSON.stringify({ url: URL, captured, h1: geo.text.h1, section: geo.text.section }, null, 1));
}

// ---- scroll recordings: frame-by-frame (seek), streamed to ffmpeg, no files on disk ----
async function record(name, keys, fps = 30) {
  // keys: [[t, scrollY], ...] with eased segments
  const T = keys[keys.length - 1][0]; const N = Math.round(T * fps); const timeline = [];
  await p.evaluate(y => window.scrollTo(0, y), keys[0][1]); await sleep(1200); await dismiss(p); await sleep(500);
  await withLock('sources-agent', async () => {
    const ff = ffmpegPipe(`${OUT}/${name}.mp4`, { fps });
    for (let i = 0; i < N; i++) {
      const t = i / fps; let k = 0; while (k < keys.length - 2 && t >= keys[k + 1][0]) k++;
      const [t0, y0] = keys[k], [t1, y1] = keys[k + 1];
      const y = Math.round((y0 + (y1 - y0) * easeInOut((t - t0) / (t1 - t0))) * 2) / 2;
      await p.evaluate(y => window.scrollTo(0, y), y);
      const sy = await p.evaluate(() => scrollY); timeline.push(+sy.toFixed(1));
      await ff.write(await p.screenshot({ type: 'png' }));
      if (i % 60 === 0) console.log(name, 'frame', i, '/', N);
    }
    await ff.end();
  });
  return { file: `${name}.mp4`, fps, frames: N, duration: T, size: '1920x1080 (captured @2x, downscaled)', keys, scrollY_per_frame: timeline };
}
if (only === 'all' || only === 'video') {
  const geo2 = geo;
  const E = geo2.elements; const kY = (E.section_kicker || E.section_heading_h3).y;
  const headY = Math.max(0, Math.round(kY - 160));
  const d = E.para_drawback; const drawY = Math.round(d.y + d.h / 2 - 1080 / 2 - 20);
  const rec = {};
  // A: section heading -> drawback paragraph (main)
  rec.A = await record('tc_scroll_heading_to_drawback', [[0, headY], [1.5, headY], [7.5, drawY], [10, drawY]]);
  // B: page headline (masthead) -> Marrify section -> drawback
  rec.B = await record('tc_scroll_top_to_drawback', [[0, 0], [1.5, 0], [6.5, headY], [7.5, headY], [10.5, drawY], [12, drawY]]);
  geo2.recordings = rec;
  geo2.after_recording_check = await p.evaluate(() => { const h3 = [...document.querySelectorAll('h3')].find(e => /Ghana Launches Digital Marriage/i.test(e.textContent)); const pd = [...document.querySelectorAll('p')].find(e => /^But there’s a drawback/.test(e.textContent.trim())); return { h3_y: h3.getBoundingClientRect().y + scrollY, drawback_y: pd.getBoundingClientRect().y + scrollY }; });
  console.log('layout check', JSON.stringify(geo2.after_recording_check), 'vs', E.section_heading_h3.y, E.para_drawback.y);
  fs.writeFileSync(`${OUT}/tc_boxes.json`, JSON.stringify(geo2, null, 1));
}
await b.close();
console.log('done');
