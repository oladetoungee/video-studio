// Run a shell command while holding the machine-wide render lock (/tmp/gm-render.lock).
// node withlock.mjs "<owner>" "<shell command>"
import fs from 'fs'; import { spawnSync } from 'child_process';
const [owner, cmd] = process.argv.slice(2);
const L = '/tmp/gm-render.lock';
for (;;) {
  try { fs.mkdirSync(L); fs.writeFileSync(L + '/owner', owner + '\n'); break; }
  catch { console.log('waiting for render lock'); await new Promise(r => setTimeout(r, 5000)); }
}
let code = 1;
try { code = spawnSync('/bin/bash', ['-c', cmd], { stdio: 'inherit' }).status; }
finally { try { fs.unlinkSync(L + '/owner'); } catch {} try { fs.rmdirSync(L); } catch {} }
process.exit(code ?? 1);
