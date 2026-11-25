// Run a heavy command under the machine-wide render lock: node tools/locked.mjs <name> <cmd> [args...]
import { spawn } from 'node:child_process';
import { withLock } from '../../../../studio/tools/lock.mjs';
const [name, cmd, ...args] = process.argv.slice(2);
await withLock(name, () => new Promise((res, rej) => { const p = spawn(cmd, args, { stdio: 'inherit', env: { ...process.env, GM_LOCK_HELD: '1' } }); p.on('exit', c => (c ? rej(new Error('exit ' + c)) : res())); }),
  { onWait: (o, s) => console.log(`waiting for the render lock (${o}) ${s}s`) });
