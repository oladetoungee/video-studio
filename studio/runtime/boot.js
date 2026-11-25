/* Studio runtime, part 3: boot a film from projects/<slug>/film/film.json (used by the editor and the renderer).
 *
 * film.json: { title, hud, intro, outro, voiceDuration, words, captions, images: {name: path}, scripts: [paths],
 *              cutSounds: { punch: [grounds] }, audio: {...mixer settings, see studio/tools/stems.py} }
 * The film's scripts define buildFilm(), which adds scenes and cues with the runtime's functions.
 */
'use strict';
const IMG = {};
const FILM = { slug: '', man: null, base: '' };
function loadImg(name, src) { return new Promise((res, rej) => { const im = new Image(); im.onload = () => { IMG[name] = im; res(); }; im.onerror = () => rej(new Error('image ' + src)); im.src = src; }); }
function loadScript(src) { return new Promise((res, rej) => { const s = document.createElement('script'); s.src = src; s.onload = res; s.onerror = () => rej(new Error('script ' + src)); document.head.appendChild(s); }); }
async function getJSON(u) { const r = await fetch(u, { cache: 'no-store' }); if (!r.ok) throw new Error(u + ' ' + r.status); return r.json(); }
/** bootFilm({slug, canvas, aspect, edits: true|object|false}) -> FILM */
async function bootFilm(o) {
  const slug = o.slug; const base = `/p/${slug}/film/`; const bust = '?v=' + Date.now();
  const man = await getJSON(base + 'film.json' + bust);
  Object.assign(FILM, { slug, man, base });
  setCtx(o.canvas.getContext('2d')); setAspect(o.aspect || '16x9');
  INTRO = man.intro != null ? man.intro : 3; OUTRO = man.outro != null ? man.outro : 6; HUD_TITLE = man.hud || '';
  const loaded = await Promise.all(HOUSE_FONTS.map(f => document.fonts.load(f)));
  await document.fonts.ready;
  FILM.fontCheck = HOUSE_FONTS.map((f, i) => [f, loaded[i].length, document.fonts.check(f)]);
  if (loaded.some(l => !l.length)) throw new Error('font failed to load: ' + JSON.stringify(FILM.fontCheck));
  if (man.fonts) { const lf = await Promise.all(man.fonts.map(f => document.fonts.load(f))); if (lf.some(l => !l.length)) throw new Error('film font failed to load: ' + JSON.stringify(man.fonts)); }   // optional per-film faces (film.json "fonts", declared in fonts.css)
  await Promise.all(Object.entries(man.images || {}).map(([k, p]) => loadImg(k, base + p)));
  const words = await getJSON(base + man.words + bust);
  if (man.captions) { const r = await fetch(base + man.captions + bust, { cache: 'no-store' }); if (r.ok) CAPTIONS = parseSRT(await r.text()); }
  if (o.edits === true) { const r = await fetch(`/api/${slug}/edits`, { cache: 'no-store' }); setEdits(r.ok ? await r.json() : {}); }
  else if (o.edits && typeof o.edits === 'object') setEdits(o.edits);
  for (const s of man.scripts) await loadScript(base + s + bust);
  initWords(words);
  TOTAL = INTRO + man.voiceDuration + OUTRO;
  if (typeof buildFilm !== 'function') throw new Error('film scripts must define buildFilm()');
  buildFilm();
  finishScenes(man.cutSounds || {}); pruneCues();
  FILM.meta = () => ({ TOTAL, INTRO, OUTRO, FPS, CUES, SCENES: SCENES.map(s => ({ n: s.n, id: s.id, start: +s.start.toFixed(3), end: +sceneEnd(s.n - 1).toFixed(3), ground: s.ground, label: s.label, trans: s.trans })) });
  return FILM;
}
