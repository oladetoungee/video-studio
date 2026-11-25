// The machine-wide render lock (projects/BUILD-BRIEF.md): one heavy job at a time (ffmpeg encodes, exports, 4K reads,
// face / matte passes), shared with every agent and tool: mkdir /tmp/gm-render.lock, an "owner" file inside, rmdir after.
//   import { withLock } from './lock.mjs';  await withLock('composite export m01', async () => { ... }, { onWait });
// The owner file says "<name> pid <pid>". A lock left by a studio process that no longer runs is taken over; a lock
// written by someone else (no pid) is always waited for. Re-entrant inside one process.
import fs from 'node:fs';
export const LOCK = process.env.GM_RENDER_LOCK || '/tmp/gm-render.lock';
let depth = 0;
const alive = (pid) => { try { process.kill(pid, 0); return true; } catch (e) { return e.code === 'EPERM'; } };
function tryTake(name) {
  try { fs.mkdirSync(LOCK); } catch (e) {
    if (e.code !== 'EEXIST') throw e;
    let owner = ''; try { owner = fs.readFileSync(LOCK + '/owner', 'utf8'); } catch { }
    const m = / pid (\d+)/.exec(owner);
    if (m && !alive(+m[1])) { try { fs.rmSync(LOCK + '/owner', { force: true }); fs.rmdirSync(LOCK); } catch { } return false; }   // stale: retry next round
    return false;
  }
  fs.writeFileSync(LOCK + '/owner', `${name} pid ${process.pid}\n`); return true;
}
export function lockOwner() { try { return fs.readFileSync(LOCK + '/owner', 'utf8').trim(); } catch { return fs.existsSync(LOCK) ? '(no owner file)' : ''; } }
export async function withLock(name, fn, o = {}) {
  if (depth > 0 || process.env.GM_LOCK_HELD === '1') { depth++; try { return await fn(); } finally { depth--; } }
  let waited = 0;
  while (!tryTake(name)) { if (o.onWait && waited % 30 === 0) o.onWait(lockOwner(), waited); await new Promise(r => setTimeout(r, 2000)); waited += 2; }
  depth = 1; const rel = () => { try { fs.rmSync(LOCK + '/owner', { force: true }); fs.rmdirSync(LOCK); } catch { } };
  const onExit = () => rel(); process.once('exit', onExit);
  try { process.env.GM_LOCK_HELD = '1'; return await fn(); } finally { depth = 0; delete process.env.GM_LOCK_HELD; process.removeListener('exit', onExit); rel(); }
}
