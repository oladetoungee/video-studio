// Review stills of the drawn "FULL VIDEO ON YOUTUBE" ending (manifest "outroCard"): grabs frames of a moment's ending from
// the running studio (http://localhost:7700) into a folder, no video export.
//   node studio/tools/outrostills.mjs <slug> <outDir> <id>:<aspect>[,<id>:<aspect>...] [seconds into the card, comma list]
// e.g. node studio/tools/outrostills.mjs cookies-localstorage-sessionstorage projects/cookies-localstorage-sessionstorage/outputs/_review/outro sh01:9x16,teaser:16x9
import fs from 'node:fs'; import path from 'node:path'; import os from 'node:os'; import puppeteer from 'puppeteer-core';
import { withLock } from './lock.mjs';
function findChrome() {
  const base = path.join(os.homedir(), '.cache/puppeteer/chrome-headless-shell'); const c = [];
  if (fs.existsSync(base)) for (const v of fs.readdirSync(base).sort().reverse()) c.push(path.join(base, v, 'chrome-headless-shell-mac-arm64/chrome-headless-shell'));
  c.push('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'); return c.find(p => fs.existsSync(p));
}
const [slug, out, list, ts] = process.argv.slice(2);
const times = (ts || '0.1,0.3,0.6,1.2,1.92,2.4,3.12,5.5').split(',').map(Number);
fs.mkdirSync(out, { recursive: true });
await withLock('outro stills ' + slug, async () => {
  const browser = await puppeteer.launch({ executablePath: findChrome(), headless: true, args: ['--force-color-profile=srgb'] });
  try {
    for (const spec of list.split(',')) {
      const [id, aspect] = spec.split(':'); const pg = await browser.newPage();
      pg.on('console', (m) => { if (m.type() === 'error') console.error('[page]', m.text()); });
      const [cw, ch] = { '9x16': [1080, 1920], '16x9': [1920, 1080], '1x1': [1080, 1080], '4x5': [1080, 1350] }[aspect];
      await pg.setViewport({ width: cw, height: ch });
      await pg.goto(`http://localhost:7700/studio/runtime/moment.html?m=/p/${slug}/talking-head/talking-head.json&id=${id}&aspect=${aspect}&captions=1`);
      await pg.waitForFunction('window.READY === true', { timeout: 120000 });
      const err = await pg.evaluate('window.BUILD_ERROR'); if (err) throw new Error(err);
      const meta = await pg.evaluate('window.meta()');
      console.log(id, aspect, 'card from', meta.dur.toFixed(2), 'total', meta.TOTAL.toFixed(2), 'outroCard', JSON.stringify(meta.outroCard), 'cues', JSON.stringify(meta.CUES.filter(c => c.t >= meta.dur - 0.05)));
      for (const lt of times) {
        const url = await pg.evaluate((t) => window.grab(t), meta.dur + lt);
        fs.writeFileSync(path.join(out, `${id}-${aspect}-${lt.toFixed(2)}s.png`), Buffer.from(url.split(',')[1], 'base64'));
      }
      await pg.close();
    }
  } finally { await browser.close(); }
});
