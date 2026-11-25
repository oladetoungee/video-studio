#!/usr/bin/env node
// Studio queue jobs that are not film exports: they run the project's own tools, so an export from an editor is the
// same file the command line makes.
//   node studio/tools/jobs.mjs job <spec.json>      (written by studio/server.mjs; one job at a time)
// spec.kind:
//   design  {group: 'thumbnails', what: 'one'|'all', item}        -> design/thumbnails/render.mjs [item]
//           {group, item | deck+slide, what: 'part', part, scale: 1|2, bg: 'none'|'ground'|'all'} -> studio/tools/part.mjs (one element as a PNG)
//           {group: 'carousels', deck, what: 'slide'|'all'|'pdf', slide} -> design/carousels/shared/build.mjs <deck> [--slide N|--pdf]
//   moment  {id, aspect: '9x16'|'16x9'|'1x1'|'4x5'|'both'|'all', voice, music, sfx, captions,   -> studio/tools/composite.mjs export
//            what: 'whole'|'range'|'section'|'sentence'|'frame', t0, t1 (range / section / sentence),
//            label (section07-half | line42: the clip's name), t (frame)}      (frame -> composite.mjs frame, a PNG)
//   captions {id}                                                 -> studio/tools/composite.mjs capbg (the picture behind her 16:9 captions)
//   proxy   {id}                                                  -> studio/tools/composite.mjs proxy
//   moment-sound {id, tracks: ['voice','music','sfx']}            -> studio/tools/composite.mjs sound (sound only, WAVs)
// moment and moment-sound take spec.mix {voice, music, sfx} (dB, her sliders); without it composite.mjs reads the moment's edits.
// Prints "@progress {p, stage}", "@file <path from videos/>", "@warn <text>" for the server; the rest is log.
import fs from 'node:fs';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const STUDIO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ROOT = path.dirname(STUDIO);
const say = (kind, o) => console.log(`@${kind} ${typeof o === 'string' ? o : JSON.stringify(o)}`);
const rel = (f) => (path.isAbsolute(f) ? path.relative(ROOT, f) : f);

// run a child; pass its @lines through (files made relative to videos/), scale its progress into [p0, p1]
function run(cmd, args, cwd, { p0 = 0, p1 = 1, onLine } = {}) {
  return new Promise((res, rej) => {
    const p = spawn(cmd, args, { cwd, stdio: ['ignore', 'pipe', 'pipe'], env: { ...process.env, STUDIO_JOB: '1' } }); let buf = '', err = '';
    const line = (l) => {
      if (!l.trim()) return;
      if (l.startsWith('@progress ')) { try { const m = JSON.parse(l.slice(10)); say('progress', { p: p0 + (p1 - p0) * m.p, stage: m.stage }); } catch { } return; }
      if (l.startsWith('@file ')) return say('file', rel(l.slice(6).trim()));
      if (l.startsWith('@warn ') || l.startsWith('@error ')) return console.log(l);
      if (onLine && onLine(l)) return;
      console.log(l);
    };
    p.stdout.on('data', d => { buf += d; let k; while ((k = buf.indexOf('\n')) >= 0) { line(buf.slice(0, k)); buf = buf.slice(k + 1); } });
    p.stderr.on('data', d => { err += d; process.stderr.write(d); });
    p.on('close', c => { if (buf) line(buf); c === 0 ? res() : rej(new Error(`${path.basename(args[0] || cmd)} exit ${c}: ${err.slice(-600)}`)); });
  });
}

async function design(spec) {
  const proj = path.join(ROOT, 'projects', spec.slug);
  if (spec.what === 'part') {   // "Download this part": one element as a PNG (studio/tools/part.mjs)
    const name = String(spec.part || '');
    if (!name || name.length > 200 || /[\0\n]/.test(name)) throw new Error('no part chosen');
    const where = spec.group === 'carousels' ? [spec.deck, String(+spec.slide)] : spec.group === 'thumbnails' ? [spec.item] : null;
    if (!where) throw new Error('unknown design group ' + spec.group);
    say('progress', { p: 0.05, stage: 'rendering' });
    await run(process.execPath, [path.join(STUDIO, 'tools', 'part.mjs'), spec.slug, spec.group, ...where, name,
      '--scale', spec.scale === 2 ? '2' : '1', '--bg', ['ground', 'all'].includes(spec.bg) ? spec.bg : 'none'], ROOT);
    return;
  }
  if (spec.group === 'thumbnails') {
    const dir = path.join(proj, 'design', 'thumbnails');
    const items = spec.what === 'all' ? [] : [spec.item];
    if (spec.what !== 'all' && !fs.existsSync(path.join(dir, 'directions', spec.item || '-', 'index.html'))) throw new Error('no direction ' + spec.item);
    say('progress', { p: 0.05, stage: 'rendering' });
    await run(process.execPath, ['render.mjs', ...items], dir, {
      onLine: (l) => { const m = /^(\S+) -> (\S+\.png)/.exec(l); if (m) { say('file', rel(path.resolve(dir, m[2]))); return true; } return false; },
    });
    return;
  }
  if (spec.group === 'carousels') {
    const dir = path.join(proj, 'design', 'carousels');
    const args = [path.join('shared', 'build.mjs'), spec.deck];
    if (spec.what === 'slide') args.push('--slide', String(spec.slide));
    else if (spec.what === 'pdf') args.push('--pdf');
    say('progress', { p: 0.05, stage: 'rendering' });
    await run(process.execPath, args, dir);
    if (spec.what === 'all') say('file', rel(path.join(proj, 'outputs', 'carousels', spec.deck, 'overview.png')));
    return;
  }
  throw new Error('unknown design group ' + spec.group);
}

async function moment(spec, mode) {
  const man = path.join(ROOT, 'projects', spec.slug, 'talking-head', 'talking-head.json');
  if (!/^[A-Za-z0-9_-]+$/.test(spec.id || '')) throw new Error('bad moment id');
  const args = [path.join(STUDIO, 'tools', 'composite.mjs'), mode, man, spec.id];
  const mix = spec.mix && typeof spec.mix === 'object' ? ['voice', 'music', 'sfx'].flatMap(k => ['--' + k + '-db', String(Math.round(+spec.mix[k] || 0))]) : [];
  if (mode === 'sound') return run(process.execPath, [...args, ...mix, ...(Array.isArray(spec.tracks) && spec.tracks.length ? ['--tracks', spec.tracks.join(',')] : [])], ROOT);
  if (mode === 'export') {
    const aspects = spec.aspect === 'both' ? ['9x16', '16x9'] : spec.aspect === 'all' ? ['16x9', '1x1', '4x5', '9x16'] : [['16x9', '1x1', '4x5'].includes(spec.aspect) ? spec.aspect : '9x16'];   // 1:1 and 4:5: teasers
    const cap = spec.captions === true ? ['--captions'] : spec.captions === false ? ['--no-captions'] : [];   // absent: composite.mjs's default (9:16 and full edits on)
    const num = (v) => (Number.isFinite(+v) && +v >= 0 ? String(+(+v).toFixed(4)) : null);
    for (const [i, a] of aspects.entries()) {
      const pp = { p0: i / aspects.length, p1: (i + 1) / aspects.length };
      if (spec.what === 'frame') {   // this frame as a PNG
        if (num(spec.t) == null) throw new Error('no frame time');
        await run(process.execPath, [path.join(STUDIO, 'tools', 'composite.mjs'), 'frame', man, spec.id, '--at', num(spec.t), '--aspect', a, ...cap], ROOT, pp); continue;
      }
      const named = spec.what === 'section' || spec.what === 'sentence';   // the section / sentence under the playhead: a range named after it
      const lab = named && /^[a-z0-9-]{1,40}$/.test(spec.label || '') ? ['--label', spec.label] : [];
      const rng = spec.what === 'range' || named ? (num(spec.t0) != null && num(spec.t1) != null && +spec.t1 > +spec.t0 ? ['--t0', num(spec.t0), '--t1', num(spec.t1)] : null) : [];
      if (!rng) throw new Error('set an in and an out point (in before out)');
      await run(process.execPath, [...args, '--aspect', a, ...cap, ...rng, ...lab, ...(spec.voice === false ? ['--no-voice'] : []), ...(spec.music === false ? ['--no-music'] : []), ...(spec.sfx === false ? ['--no-sfx'] : []), ...(+spec.speed >= 0.5 && +spec.speed <= 2 && +spec.speed !== 1 ? ['--speed', String(+spec.speed)] : []), ...mix], ROOT, pp);
    }
    return;
  }
  await run(process.execPath, args, ROOT);
}

async function main() {
  const [mode, file] = process.argv.slice(2);
  if (mode !== 'job' || !file) throw new Error('usage: node studio/tools/jobs.mjs job <spec.json>');
  const spec = JSON.parse(fs.readFileSync(file, 'utf8'));
  if (!/^[A-Za-z0-9][A-Za-z0-9._-]*$/.test(spec.slug || '')) throw new Error('bad project');
  if (spec.kind === 'design') await design(spec);
  else if (spec.kind === 'moment') await moment(spec, 'export');
  else if (spec.kind === 'proxy') await moment(spec, 'proxy');
  else if (spec.kind === 'moment-sound') await moment(spec, 'sound');
  else if (spec.kind === 'captions') await moment(spec, 'capbg');
  else throw new Error('unknown job kind ' + spec.kind);
  say('progress', { p: 1, stage: 'done' });
}
main().then(() => process.stdout.write('', () => process.exit(0)), (e) => { console.error(e.message || e); process.stdout.write('', () => process.exit(1)); });   // (stdout flushed first: @error / @file lines)
