// Re-measures homepage boxes (no capture) and merges into mf_meta.json, with deterministic per-frame scroll for the recordings.
import fs from 'fs';
import { launch, UA, sleep, easeInOut } from './common.mjs';
const OUT = '/Users/gbemi/Desktop/CODE/videos/projects/ghana-marrify/film/assets/sources/marrify';
const meta = JSON.parse(fs.readFileSync(`${OUT}/mf_meta.json`, 'utf8'));
const b = await launch(); const p = await b.newPage();
await p.setUserAgent(UA); await p.setViewport({ width: 1920, height: 1080, deviceScaleFactor: 2 });
await p.goto('https://marrifyapp.com/', { waitUntil: 'networkidle2', timeout: 90000 }); await p.evaluate(() => document.fonts.ready); await sleep(1500);
const H = await p.evaluate(() => document.documentElement.scrollHeight); for (let y = 0; y < H; y += 600) { await p.evaluate(y => scrollTo(0, y), y); await sleep(200); } await p.evaluate(() => scrollTo(0, 0)); await sleep(800);
const g = await p.evaluate(() => {
  const r = e => { if (!e) return null; const q = e.getBoundingClientRect(); return { x: +(q.x + scrollX).toFixed(1), y: +(q.y + scrollY).toFixed(1), w: +q.width.toFixed(1), h: +q.height.toFixed(1) }; };
  const find = re => [...document.querySelectorAll('h1,h2,h3,p,span,div,a,button')].find(e => e.children.length === 0 && re.test(e.innerText.trim()));
  const tr = document.querySelector('.nlh-announce-track'); let bar = tr; while (bar && bar.getBoundingClientRect().width < 1800) bar = bar.parentElement;
  const a = document.getAnimations()[0];
  return { announcement_bar: r(bar), announcement_track_clip: r(tr.parentElement), announcement_text: tr.innerText.split('\n')[0].trim(), marquee_duration_ms: a?.effect.getTiming().duration,
    hero_h1: r(document.querySelector('h1')), hero_1886: r(find(/^1886\.$/)), hero_intro: r(find(/^Search Ghana's churches/)),
    search_input: r([...document.querySelectorAll('input')].find(e => e.placeholder && e.getBoundingClientRect().width > 300)), search_placeholder: [...document.querySelectorAll('input')].find(e => e.placeholder && e.getBoundingClientRect().width > 300)?.placeholder,
    search_hint: r(find(/^Try a church/)), stat_1886_2026: r(find(/^1886-2026$/)), records_heading: r(find(/^Search, verify and connect/)), source_partners_heading: r(find(/^Built around official registry/)) };
});
await b.close();
const mt = f => fs.statSync(`${OUT}/${f}`).mtime.toISOString();
meta.captured.home = mt('mf_01_home_desktop.png');
meta.home_boxes_doc_css = g;
meta.home_boxes_note = 'Document coordinates, CSS px, 1920 wide viewport; @2x PNG pixel = 2x. Re-measured ' + new Date().toISOString() + ' on the same live page (layout is static).';
meta.files.mf_00_home_fullpage = { url: 'https://marrifyapp.com/', note: 'full page @1x', captured: mt('mf_00_home_fullpage.png') };
meta.files.mf_01_home_desktop = { url: 'https://marrifyapp.com/', viewport: '1920x1080 @2x', marquee_time_ms: 0, captured: mt('mf_01_home_desktop.png') };
for (let k = 0; k < 4; k++) meta.files[`mf_02_disclaimer_banner_${k + 1}`] = { url: 'https://marrifyapp.com/', clip: `top announcement bar, 1920 x ${Math.ceil(g.announcement_bar.h)} css px @2x`, marquee_time_ms: Math.round(k * g.marquee_duration_ms / 8), captured: mt(`mf_02_disclaimer_banner_${k + 1}.png`) };
const tl = keys => { const fps = 30, T = keys[keys.length - 1][0], out = []; for (let i = 0; i < Math.round(T * fps); i++) { const t = i / fps; let k = 0; while (k < keys.length - 2 && t >= keys[k + 1][0]) k++; const [t0, y0] = keys[k], [t1, y1] = keys[k + 1]; out.push(Math.round((y0 + (y1 - y0) * easeInOut((t - t0) / (t1 - t0))) * 2) / 2); } return out; };
const recY = Math.max(0, Math.round(g.records_heading.y - 140));
const kA = [[0, 0], [10, 0]], kB = [[0, 0], [1.5, 0], [8.5, recY], [11, recY]];
meta.files.mf_home_marquee_hold = { url: 'https://marrifyapp.com/', fps: 30, frames: 300, duration_s: 10, size: '1920x1080 (captured @2x, downscaled)', keys: kA, note: 'page held at top; marquee stepped at real speed (frame i = i/30 s of the 24 s CSS animation)', captured: mt('mf_home_marquee_hold.mp4') };
meta.files.mf_scroll_home = { url: 'https://marrifyapp.com/', fps: 30, frames: 330, duration_s: 11, size: '1920x1080 (captured @2x, downscaled)', keys: kB, scrollY_per_frame: tl(kB), captured: mt('mf_scroll_home.mp4') };
fs.writeFileSync(`${OUT}/mf_meta.json`, JSON.stringify(meta, null, 1));
console.log(JSON.stringify(g, null, 1));
