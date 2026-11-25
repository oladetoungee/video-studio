import { createRequire } from 'module';
const require = createRequire('/Users/gbemi/Desktop/CODE/videos/studio/package.json');
export const puppeteer = require('puppeteer-core');
export const CHROME = process.env.HOME + '/.cache/puppeteer/chrome/mac_arm-148.0.7778.97/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing';
export const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36';
export const UA_MOBILE = 'Mozilla/5.0 (iPhone; CPU iPhone OS 18_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.5 Mobile/15E148 Safari/604.1';
export async function launch() {
  return puppeteer.launch({ executablePath: CHROME, headless: 'new',
    args: ['--disable-blink-features=AutomationControlled', '--no-first-run', '--lang=en-US,en', '--window-size=1920,1080'],
    defaultViewport: null });
}
export const sleep = ms => new Promise(r => setTimeout(r, ms));

// Click every visible "close" control of ads / toasts / newsletter popups. Never hides content.
export async function dismiss(page) {
  return page.evaluate(() => {
    let n = 0;
    const sel = 'button[aria-label*="lose" i], [aria-label*="dismiss" i], .top-ad-close, .bcm-auth-toast-close, .bcm-auth-popup-close, [id*="cookie" i] button, [class*="cookie" i] button';
    for (const e of document.querySelectorAll(sel)) {
      const r = e.getBoundingClientRect(); const s = getComputedStyle(e);
      if (r.width < 4 || r.height < 4 || s.visibility === 'hidden' || s.display === 'none') continue;
      if (e.closest('header') && !e.closest('[class*="ad"]')) continue; // don't toggle site menus
      const t = (e.textContent || '').trim().toLowerCase();
      if (e.closest('[id*="cookie" i],[class*="cookie" i]') && !/accept|agree|ok|got it|close|×/.test(t) && !/close/i.test(e.getAttribute('aria-label') || '')) continue;
      e.click(); n++;
    }
    return n;
  });
}

// Rects (document coords, CSS px) of each line of `phrase` inside `root` (text across inline nodes).
export const RECTS_FN = `(root, phrase) => {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const nodes = []; let full = '';
  while (walker.nextNode()) { nodes.push([walker.currentNode, full.length]); full += walker.currentNode.nodeValue; }
  const i = full.indexOf(phrase); if (i < 0) return null;
  const j = i + phrase.length; const rg = document.createRange();
  for (const [n, o] of nodes) { const L = n.nodeValue.length;
    if (i >= o && i <= o + L) rg.setStart(n, i - o);
    if (j >= o && j <= o + L) { rg.setEnd(n, j - o); break; } }
  const lines = [];
  for (const r of rg.getClientRects()) { if (r.width < 1) continue;
    const last = lines[lines.length - 1];
    if (last && Math.abs(last.y - (r.y + scrollY)) < 4) { last.w = r.x + r.width - last.x; last.h = Math.max(last.h, r.height); }
    else lines.push({ x: r.x + scrollX, y: r.y + scrollY, w: r.width, h: r.height }); }
  return lines.map(l => ({ x: +l.x.toFixed(1), y: +l.y.toFixed(1), w: +l.w.toFixed(1), h: +l.h.toFixed(1) }));
}`;

import { spawn, execSync } from 'child_process';
export async function withLock(owner, fn) {
  const L = '/tmp/gm-render.lock';
  for (;;) { try { execSync(`mkdir ${L} 2>/dev/null`); break; } catch { console.log('waiting for render lock...'); await sleep(5000); } }
  execSync(`echo ${owner} > ${L}/owner`);
  try { return await fn(); } finally { execSync(`rm -f ${L}/owner; rmdir ${L}`); }
}
export function ffmpegPipe(out, { fps = 30, w = 1920, h = 1080 } = {}) {
  const ff = spawn('ffmpeg', ['-y', '-hide_banner', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'png', '-i', '-',
    '-vf', `scale=${w}:${h}:flags=lanczos,format=yuv420p`, '-c:v', 'libx264', '-preset', 'slow', '-crf', '14', '-tune', 'stillimage', '-movflags', '+faststart', '-r', String(fps), out], { stdio: ['pipe', 'inherit', 'inherit'] });
  const done = new Promise((res, rej) => ff.on('close', c => c === 0 ? res() : rej(new Error('ffmpeg ' + c))));
  return { write: buf => new Promise(r => ff.stdin.write(buf) ? r() : ff.stdin.once('drain', r)), end: async () => { ff.stdin.end(); await done; } };
}
// ease in-out (smoothstep-like quintic) for scroll timelines
export const easeInOut = t => t < 0 ? 0 : t > 1 ? 1 : t * t * t * (t * (t * 6 - 15) + 10);
