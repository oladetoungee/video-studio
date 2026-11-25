// Captures Anthropic's public pages as credited sources for claude-rule (screenshots @2x, element crops,
// phrase boxes, one scroll recording). Nothing on the page is edited; overlays are only closed.
// node anthropic.mjs policy|constitution [video]
import fs from 'fs';
import { launch, UA, sleep, dismiss, RECTS_FN, withLock, ffmpegPipe, easeInOut } from './common.mjs';
const which = process.argv[2] || 'policy', wantVideo = process.argv[3] === 'video';
const CFG = {
  policy: { url: 'https://www.anthropic.com/news/2026-usage-policy-update', prefix: 'ap',
    heading: /Addressing abusive behavior toward our models/,
    phrases: {
      rule: 'We’ve added a prohibition on sustained and needless abusive or cruel behavior toward our models.',
      rule_short: 'sustained and needless abusive or cruel behavior toward our models',
      extreme: 'The policy update is meant to apply only in extreme cases, where users repeatedly act cruelly toward our models, with no discernible purpose.',
      not_apply: 'It does not apply to common versions of user frustration, pushback, dark creative themes, or model testing and research.',
      end_chat: 'Claude’s ability to end these interactions will remain the primary enforcement mechanism.',
      effect: 'The updated policy takes effect on November 12.',
      address: 'and to address abusive behavior toward our models.',
    } },
  constitution: { url: 'https://www.anthropic.com/constitution', prefix: 'ac',
    heading: null,
    phrases: { moral_status: 'Claude’s moral status is deeply uncertain.', serious_q: 'We believe that the moral status of AI models is a serious question worth considering.' } },
}[which];
const OUT = '/Users/gbemi/Desktop/CODE/videos/projects/claude-rule/film/assets/sources/anthropic';
fs.mkdirSync(OUT, { recursive: true });
const cookie = pg => pg.evaluate(() => { const b = [...document.querySelectorAll('button')].find(e => /reject all cookies/i.test(e.textContent) && e.offsetWidth > 0); if (b) { b.click(); return true; } return false; });
const b = await launch(); const p = await b.newPage();
await p.setUserAgent(UA); await p.setViewport({ width: 1920, height: 1080, deviceScaleFactor: wantVideo ? 1 : 2 });
const resp = await p.goto(CFG.url, { waitUntil: 'networkidle2', timeout: 90000 });
const captured = new Date().toISOString(); console.log('status', resp.status(), captured);
await sleep(2000);
// close the cookie dialog the polite way (Reject all cookies); content untouched
const rejected = await p.evaluate(() => { const b = [...document.querySelectorAll('button')].find(e => /reject all cookies/i.test(e.textContent)); if (b) { b.click(); return true; } return false; }); console.log('cookie dialog closed:', rejected); await sleep(800);
const H = await p.evaluate(() => document.documentElement.scrollHeight);
for (let y = 0; y < H; y += 800) { await p.evaluate(y => window.scrollTo(0, y), y); await sleep(250); await dismiss(p); }
await p.evaluate(() => window.scrollTo(0, 0)); await sleep(1200); await dismiss(p);
// the cookie dialog sits in a shadow root; press its 'Reject all cookies' button like a user would
const hit = await p.evaluate(() => { const e = document.elementFromPoint(1595, 1019); let r = e; const walk = n => { if (!n) return null; if (n.shadowRoot) { const b = [...n.shadowRoot.querySelectorAll('button')].find(x => /reject all/i.test(x.textContent)); if (b) return b; } for (const c of n.children) { const f = walk(c); if (f) return f; } return null; }; const b = walk(document.body); if (b) { b.click(); return 'shadow-click'; } return e ? e.tagName + ':' + (e.textContent || '').trim().slice(0, 30) : null; }); console.log('cookie:', hit);
if (hit !== 'shadow-click') { await p.mouse.click(1595, 1019); console.log('mouse click at Reject all cookies'); } await sleep(900); console.log('cookie dialog still there:', await p.evaluate(() => [...document.querySelectorAll('button')].some(e => /reject all cookies/i.test(e.textContent) && e.offsetWidth > 0)));
const geo = await p.evaluate((fnSrc, phrases, headSrc) => {
  const rects = eval(fnSrc);
  const box = e => { const r = e.getBoundingClientRect(); return { x: +(r.x + scrollX).toFixed(1), y: +(r.y + scrollY).toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1) }; };
  const out = { scrollHeight: document.documentElement.scrollHeight, h1: document.querySelector('h1')?.innerText, h1box: box(document.querySelector('h1')), phrases: {}, paras: {} };
  const main = document.querySelector('main') || document.body;
  const ps = [...main.querySelectorAll('p, li, h2, h3')];
  for (const [k, ph] of Object.entries(phrases)) {
    const el = ps.find(e => e.textContent.includes(ph)) || ps.find(e => e.textContent.replace(/[’']/g, "'").includes(ph.replace(/[’']/g, "'")));
    out.phrases[k] = { text: ph, lines: el ? rects(el, el.textContent.includes(ph) ? ph : ph.replace(/’/g, "'")) : null, para: el ? box(el) : null };
  }
  if (headSrc) { const re = new RegExp(headSrc); const h = [...main.querySelectorAll('h2,h3,h4')].find(e => re.test(e.textContent)); if (h) { out.heading = box(h); out.headingText = h.innerText; } }
  return out;
}, RECTS_FN, CFG.phrases, CFG.heading ? CFG.heading.source : null);
geo.url = CFG.url; geo.captured = captured;
for (const [k, v] of Object.entries(geo.phrases)) console.log(k, v.lines ? 'ok' : 'NOT FOUND');
if (!wantVideo) {
  const shot = async (name, y) => { await p.evaluate(y => window.scrollTo(0, y), y); await sleep(800); await dismiss(p); await sleep(200); const sy = await p.evaluate(() => scrollY); await p.screenshot({ path: `${OUT}/${CFG.prefix}_${name}.png` }); (geo.shots ||= {})[name] = { scrollY: sy, size: '3840x2160 (@2x of 1920x1080)' }; console.log('shot', name, sy); };
  await shot('01_top', 0);
  if (geo.heading) await shot('02_section', Math.round(geo.heading.y - 260));
  const ph = Object.values(geo.phrases).find(v => v.lines); if (ph && !geo.heading) await shot('02_section', Math.round(ph.lines[0].y - 420));
  if (geo.phrases.effect?.lines) await shot('03_effect', Math.round(geo.phrases.effect.lines[0].y - 500));
  // element crop around the section (heading + two paragraphs) in document coords
  if (geo.heading) {
    const last = geo.phrases.end_chat?.para || geo.phrases.not_apply?.para;
    const c = { x: geo.heading.x - 40, y: geo.heading.y - 40, width: Math.max(geo.heading.w, last.w) + 80, height: last.y + last.h - geo.heading.y + 80 };
    await p.evaluate(y => window.scrollTo(0, y), Math.round(geo.heading.y - 200)); await sleep(600);
    await p.screenshot({ path: `${OUT}/${CFG.prefix}_crop_section.png`, clip: c, captureBeyondViewport: true }); geo.shots.crop_section = { clip_doc_css: c, scale: 2 };
  }
  for (const [k, v] of Object.entries(geo.phrases)) if (v.para && ['moral_status', 'rule'].includes(k)) {
    const c = { x: v.para.x - 32, y: v.para.y - 32, width: v.para.w + 64, height: v.para.h + 64 };
    await p.evaluate(y => window.scrollTo(0, y), Math.round(v.para.y - 300)); await sleep(500);
    await p.screenshot({ path: `${OUT}/${CFG.prefix}_crop_${k}.png`, clip: c, captureBeyondViewport: true }); (geo.shots ||= {})['crop_' + k] = { clip_doc_css: c, scale: 2 };
  }
  geo.text = await p.evaluate(() => (document.querySelector('main') || document.body).innerText.slice(0, 20000));
  fs.writeFileSync(`${OUT}/${CFG.prefix}_capture.json`, JSON.stringify(geo, null, 1));
} else {
  // 1920x1080 scroll recording: hold top 1.2 s, ease to the section over 5 s, hold 2 s. 30 fps, frames streamed.
  const target = Math.round((geo.heading || geo.phrases[Object.keys(geo.phrases)[0]].para).y - 260);
  const fps = 30, n = Math.round(8.2 * fps); const plan = [];
  for (let i = 0; i < n; i++) { const t = i / fps; plan.push(Math.round(target * easeInOut((t - 1.2) / 5))); }
  fs.writeFileSync(`${OUT}/${CFG.prefix}_scroll_plan.json`, JSON.stringify({ url: CFG.url, captured, fps, target, note: 'frame i shows document scrollY = plan[i]', plan }));
  await withLock('claude-rule-directions-source-scroll', async () => {
    const ff = ffmpegPipe(`${OUT}/${CFG.prefix}_scroll_1920x1080.mp4`);
    for (let i = 0; i < n; i++) { await p.evaluate(y => window.scrollTo(0, y), plan[i]); await sleep(40); await ff.write(await p.screenshot({ type: 'png' })); }
    await ff.end();
  });
  console.log('video done');
}
await b.close();
