/* Studio editor: player, edit mode, versions, export queue. Runs on top of the film runtime (core/house/boot). */
'use strict';
(() => {
  const $ = (id) => document.getElementById(id);
  const SLUG = location.pathname.split('/').filter(Boolean)[1];
  const API = `/api/${SLUG}`;
  const cv = $('cv'), stage = $('stage'), overlay = $('overlay');
  const PREF_KEY = 'studio:prefs:' + SLUG;
  const prefs = (() => { try { return JSON.parse(localStorage.getItem(PREF_KEY) || '{}'); } catch { return {}; } })();
  const savePrefs = () => { try { localStorage.setItem(PREF_KEY, JSON.stringify(prefs)); } catch { } };
  const fmt = (t, d = 0) => { t = Math.max(0, t); const m = Math.floor(t / 60), s = t - m * 60; return m + ':' + (d ? s.toFixed(d).padStart(3 + d, '0') : String(Math.floor(s)).padStart(2, '0')); };
  const parseT = (s) => { const m = String(s).trim().match(/^(?:(\d+):)?(\d+(?:\.\d+)?)$/); return m ? (+(m[1] || 0)) * 60 + +m[2] : NaN; };
  const status = (m, bad) => { $('status').textContent = m; $('status').classList.toggle('warn', !!bad); };

  let T = 0, playing = false, editing = false, META = null, EDITS = { t: {}, captions: {} }, LOADED = '{}';
  let UNDO = [], REDO = [], sessionVersioned = false, lastAutoV = Date.now();
  const show = { captions: !!prefs.captions, voice: prefs.voice !== false, music: prefs.music !== false, sfx: prefs.sfx !== false };

  // edits as the editor keeps them: texts/positions, corrected captions, her sound levels ("mix", only when moved) and
  // the light / dark choice per screen ("modes": {sceneId: 'light' | 'dark'}, only screens that differ from their design)
  const cleanModes = (m) => Object.fromEntries(Object.entries(m && typeof m === 'object' ? m : {}).filter(([, v]) => v === 'light' || v === 'dark'));
  const norm = (e) => { const m = cleanModes(e.modes); return { t: e.t || {}, captions: e.captions || {}, ...(Shell.mixMoved(e.mix) ? { mix: Shell.mixOf(e.mix) } : {}), ...(Object.keys(m).length ? { modes: m } : {}) }; };

  /* ---------- boot ---------- */
  async function boot() {
    try {
      const r = await fetch(API + '/edits', { cache: 'no-store' }); EDITS = r.ok ? await r.json() : {};
      EDITS = norm(EDITS); LOADED = JSON.stringify(EDITS);
      await bootFilm({ slug: SLUG, canvas: cv, aspect: ASPECTS[prefs.aspect] ? prefs.aspect : '16x9', edits: EDITS });
    } catch (e) { $('loading').textContent = 'The film did not load: ' + e.message; console.error(e); return; }
    META = FILM.meta(); EL.rec = true; SHOW.captions = show.captions;
    document.title = (FILM.man.title || SLUG) + ' · Studio'; $('title').textContent = FILM.man.title || SLUG;
    $('loading').hidden = true;
    buildScenes(); buildLines(); buildTicks(); syncToggles(); fit(); setExportDefaults();
    const q = new URLSearchParams(location.search); seek(q.has('t') ? +q.get('t') : (prefs.t || 0));
    LV.sync(); MIX.apply(); refreshVersions(); checkAudio(); pollJobs();
    saveState(`Saving into projects/${SLUG}/film/edits.json`);
  }

  /* ---------- render ---------- */
  function draw() {
    renderFrame(T);
    $('time').textContent = `${fmt(T, 2)} / ${fmt(TOTAL)}`;
    $('fill').style.width = (T / TOTAL * 100) + '%'; $('head').style.left = `calc(${(T / TOTAL * 100)}% - 1px)`;
    $('track').setAttribute('aria-valuenow', T.toFixed(1)); $('track').setAttribute('aria-valuemax', TOTAL.toFixed(1));
    markLists(); syncMode();
    if (editing && !playing) CE.build(); else overlay.innerHTML = '';
  }
  function fit() {
    const wrap = $('stagewrap'); const ar = CW / CH;
    const mw = wrap.clientWidth, mh = Math.max(240, wrap.clientHeight);
    let w = mw, h = w / ar; if (h > mh) { h = mh; w = h * ar; }
    stage.style.width = Math.floor(w) + 'px'; stage.style.height = Math.floor(h) + 'px';
  }
  addEventListener('resize', () => { if (!META) return; fit(); draw(); });
  new ResizeObserver(() => { if (META) { fit(); if (!playing) draw(); } }).observe($('stagewrap'));   // e.g. the edit bar appearing
  const scale = () => stage.clientWidth / CW;

  /* ---------- playback (the voice track is the clock; music + SFX follow it) ---------- */
  const A = { voice: $('aVoice'), music: $('aMusic'), sfx: $('aSfx') }; let AUDIO_OK = false, clock0 = 0, t0 = 0, rafId = 0, syncN = 0;
  // on/off and her volume levels go through Web Audio gains (Shell.mixer); the voice track stays the clock even when off
  const MIX = Shell.mixer({ els: A, levels: () => EDITS.mix, on: (k) => show[k] });
  const audioMute = () => MIX.apply();
  // "Play this screen" (L): LOOP = the screen being played on repeat (-1 = off). It plays from the screen's first frame to its
  // end and jumps back (picture and the three sound tracks together); Space, Play or the button again stop it; moving to
  // another screen ([ ], the Screens list, the timeline) loops that one.
  let LOOP = -1, LOOPS = 0, loopAt = 0;
  const firstFrame = (i) => Math.ceil(META.SCENES[i].start * FPS - 1e-6) / FPS;   // the first frame inside the screen
  function restartLoop() {
    T = firstFrame(LOOP); t0 = T; clock0 = performance.now(); LOOPS++; loopAt = T;
    if (AUDIO_OK) for (const a of Object.values(A)) a.currentTime = T;
  }
  function syncLoop() {
    const on = LOOP >= 0; $('loop').setAttribute('aria-pressed', String(on));
    $('loop').title = on ? 'Stop playing this screen on repeat (L, Space)' : 'Play this screen on repeat (L)';
    $('loopState').hidden = !on; if (on) $('loopState').textContent = `Looping screen ${META.SCENES[LOOP].n}`;
  }
  function playScreen() {
    if (!META) return; if (LOOP >= 0) { pause(); return; }
    LOOP = sceneIndex(T); LOOPS = 0; syncLoop();
    if (playing) restartLoop(); else { T = firstFrame(LOOP); play(); loopAt = T; }
  }
  function play() {
    if (playing || !META) return; if (T >= TOTAL - 0.05) T = 0; playing = true; CE.close();
    $('play').textContent = '❚❚ Pause'; t0 = T; clock0 = performance.now();
    if (AUDIO_OK) { MIX.init(); audioMute(); for (const a of Object.values(A)) { a.currentTime = T; a.play().catch(() => { }); } }
    const loop = () => {
      if (!playing) return;
      if (AUDIO_OK && !A.voice.paused && A.voice.readyState >= 2) {
        T = A.voice.currentTime;
        if (++syncN % 20 === 0) for (const k of ['music', 'sfx']) if (Math.abs(A[k].currentTime - T) > 0.06) A[k].currentTime = T;
      } else T = t0 + (performance.now() - clock0) / 1000;
      if (LOOP >= 0 && (T >= META.SCENES[LOOP].end - 0.5 / FPS || T >= TOTAL - 1 / FPS)) restartLoop();
      if (T >= TOTAL) { T = TOTAL - 1 / FPS; pause(); draw(); return; }
      draw(); rafId = requestAnimationFrame(loop);
    };
    rafId = requestAnimationFrame(loop);
  }
  function pause() {
    if (LOOP >= 0) { LOOP = -1; syncLoop(); }
    if (!playing) return; playing = false; cancelAnimationFrame(rafId); $('play').textContent = '▶ Play';
    for (const a of Object.values(A)) a.pause();
    T = Math.round(T * FPS) / FPS; prefs.t = T; savePrefs(); draw();
  }
  function seek(t) {
    T = Math.min(Math.max(0, t), TOTAL - 1 / FPS); if (!playing) T = Math.round(T * FPS) / FPS;
    if (playing && LOOP >= 0) { const i = sceneIndex(T); if (i !== LOOP) { LOOP = i; LOOPS = 0; syncLoop(); } }   // another screen: loop that one
    if (playing) { t0 = T; clock0 = performance.now(); if (AUDIO_OK) for (const a of Object.values(A)) a.currentTime = T; }
    else { prefs.t = T; savePrefs(); }
    draw();
  }
  $('play').onclick = () => (playing ? pause() : play());
  $('loop').onclick = () => playScreen();
  (() => {
    const tr = $('track'); let down = false;
    const at = (e) => { const r = tr.getBoundingClientRect(); seek(clamp((e.clientX - r.left) / r.width) * TOTAL); };
    tr.addEventListener('pointerdown', (e) => { down = true; tr.setPointerCapture(e.pointerId); at(e); });
    tr.addEventListener('pointermove', (e) => { if (down) at(e); });
    tr.addEventListener('pointerup', () => { down = false; });
  })();

  /* ---------- toggles ---------- */
  function syncToggles() {
    $('tCap').setAttribute('aria-pressed', String(show.captions)); $('tVoice').setAttribute('aria-pressed', String(show.voice)); $('tMusic').setAttribute('aria-pressed', String(show.music)); $('tSfx').setAttribute('aria-pressed', String(show.sfx));
    for (const b of document.querySelectorAll('#aspectSeg button')) b.setAttribute('aria-pressed', String(b.dataset.aspect === ASPECT));
    $('moveNote').textContent = ASPECT === '4x5' ? ' (4:5 shares the 9:16 positions)' : ` (${ASPECTS[ASPECT].label})`;
    audioMute();
  }
  $('tCap').onclick = () => { show.captions = !show.captions; SHOW.captions = show.captions; prefs.captions = show.captions; savePrefs(); syncToggles(); $('xCap').checked = show.captions; updateSummary(); draw(); };
  $('tVoice').onclick = () => { show.voice = !show.voice; prefs.voice = show.voice; savePrefs(); syncToggles(); $('xVoice').checked = show.voice; updateSummary(); };
  $('tMusic').onclick = () => { show.music = !show.music; prefs.music = show.music; savePrefs(); syncToggles(); $('xMusic').checked = show.music; updateSummary(); };
  $('tSfx').onclick = () => { show.sfx = !show.sfx; prefs.sfx = show.sfx; savePrefs(); syncToggles(); $('xSfx').checked = show.sfx; updateSummary(); };
  for (const b of document.querySelectorAll('#aspectSeg button')) b.onclick = () => setFrame(b.dataset.aspect);
  function setFrame(a) { CE.close(); setAspect(a); prefs.aspect = a; savePrefs(); $('xAspect').value = a; syncToggles(); fit(); draw(); updateSummary(); }
  $('tEdit').onclick = () => toggleEdit();
  function toggleEdit(on = !editing) {
    editing = on; if (editing) pause(); CE.close();
    $('tEdit').setAttribute('aria-pressed', String(editing)); $('tEdit').textContent = editing ? 'Done' : '✎ Edit'; stage.classList.toggle('editing', editing);
    $('editbanner').hidden = !editing; $('editbar').hidden = !editing; draw();
  }

  /* ---------- lists ---------- */
  const sceneEdited = (id) => Object.keys(EDITS.t).some(k => k.startsWith(id + '/')) || !!(EDITS.modes && EDITS.modes[id]);
  const rowLabel = (s) => { const sc = SCENES[s.n - 1]; const m0 = sceneMode0(sc), m = sceneMode(sc); return `${s.label.replace(/^\/\/\s*/, '')} · ${s.ground}${m0 && m !== m0 ? ` · ${m === 'dark' ? '☾ dark' : '☀ light'} (switched)` : ''}`; };
  function buildScenes() {
    const box = $('scenes'); box.innerHTML = '';
    for (const s of META.SCENES) {
      const b = document.createElement('button'); b.type = 'button'; b.className = 'row'; b.dataset.n = s.n;
      b.innerHTML = `<span class="ts"></span><span><span class="nm"></span><span class="lb"></span></span>`;
      b.querySelector('.ts').textContent = fmt(s.start); b.querySelector('.nm').textContent = `${s.n} · ${s.id}`;
      b.querySelector('.lb').textContent = rowLabel(s);
      b.onclick = () => seek(s.start + 0.001 + (s.trans === 'whip' ? 0.27 : 0));
      box.appendChild(b);
    }
    markEdits();
  }
  function buildLines() {
    const box = $('lines'); box.innerHTML = '';
    CAPTIONS.forEach((c) => {
      const b = document.createElement('button'); b.type = 'button'; b.className = 'row'; b.dataset.i = c.i;
      b.innerHTML = '<span class="ts"></span><span class="tx"></span>'; b.querySelector('.ts').textContent = fmt(c.t0); b.querySelector('.tx').textContent = capText(c);
      b.onclick = () => seek(c.t0 + 0.001); box.appendChild(b);
    });
  }
  function buildTicks() {
    const tr = $('track'); tr.querySelectorAll('.tick').forEach(e => e.remove());
    for (const s of META.SCENES) { if (s.n === 1) continue; const d = document.createElement('div'); d.className = 'tick' + (s.ground === 'blue' ? ' blue' : '') + (sceneEdited(s.id) ? ' ed' : ''); d.style.left = (s.start / TOTAL * 100) + '%'; tr.insertBefore(d, $('fill').nextSibling); }
  }
  let lastScene = -1, lastLine = -1;
  function markLists(force) {
    const si = sceneIndex(T), li = lineIndexAt(T);
    if (si !== lastScene || force) { const rows = $('scenes').children; rows[lastScene]?.classList.remove('on'); rows[si]?.classList.add('on'); if (!$('scenes').hidden && rows[si]) rows[si].scrollIntoView({ block: 'nearest' }); lastScene = si; updateSummary(); }
    if (li !== lastLine || force) { const rows = $('lines').children; rows[lastLine]?.classList.remove('on'); rows[li]?.classList.add('on'); if (!$('lines').hidden && rows[li]) rows[li].scrollIntoView({ block: 'nearest' }); lastLine = li; updateSummary(); }
  }
  function markEdits() {
    [...$('scenes').children].forEach((r, i) => { r.classList.toggle('ed', sceneEdited(META.SCENES[i].id)); r.querySelector('.lb').textContent = rowLabel(META.SCENES[i]); });
    [...$('lines').children].forEach((r, i) => { r.classList.toggle('ed', EDITS.captions[i] != null); r.querySelector('.tx').textContent = capText(CAPTIONS[i]); });
    const n = Object.keys(EDITS.t).length + Object.keys(EDITS.captions).length + (EDITS.mix ? 1 : 0) + Object.keys(EDITS.modes || {}).length;
    $('editcount').textContent = n ? `${n} edit${n > 1 ? 's' : ''}` : 'No edits yet';
    if (META) buildTicks();
    modeSummary(); modeKey = '';
  }
  $('tabScenes').onclick = () => { $('scenes').hidden = false; $('lines').hidden = true; $('tabScenes').setAttribute('aria-selected', 'true'); $('tabLines').setAttribute('aria-selected', 'false'); markLists(true); };
  $('tabLines').onclick = () => { $('scenes').hidden = true; $('lines').hidden = false; $('tabScenes').setAttribute('aria-selected', 'false'); $('tabLines').setAttribute('aria-selected', 'true'); markLists(true); };

  /* ---------- light / dark per screen: "modes" in edits.json (undo, versions, exports like any edit) ---------- */
  const curScene = () => SCENES[sceneIndex(T)];
  const PUNCH = 'This screen is a colour punchline: no alternative';
  let modeKey = '';
  function syncMode() {
    const sc = curScene(); if (!sc) return; const m0 = sceneMode0(sc), m = sceneMode(sc); const key = sc.id + '|' + m;
    if (key === modeKey) return; modeKey = key; const b = $('tMode');
    if (!m0) { b.setAttribute('aria-disabled', 'true'); b.classList.remove('alt'); b.textContent = '◼ Colour'; b.title = PUNCH; return; }
    b.removeAttribute('aria-disabled'); b.classList.toggle('alt', m !== m0);
    b.textContent = m === 'dark' ? '☾ Dark' : '☀ Light'; const other = m === 'dark' ? 'light' : 'dark';
    b.title = `Screen ${sc.n} is ${m}${m === m0 ? ' (as designed)' : ` (designed ${m0})`}. Click for its ${other} version${other === m0 ? ' (as designed)' : ''}: this screen only (D)`;
  }
  function setModes(modes, msg) { const m = cleanModes(modes); if (Object.keys(m).length) EDITS.modes = m; else delete EDITS.modes; modeKey = ''; afterEdit(); status(msg); }
  function toggleMode() {
    if (!META) return; const sc = curScene(); const m0 = sceneMode0(sc); if (!m0) return status(PUNCH + '.');
    const next = sceneMode(sc) === 'dark' ? 'light' : 'dark'; const modes = { ...(EDITS.modes || {}) };
    if (next === m0) delete modes[sc.id]; else modes[sc.id] = next;
    snapshot(); setModes(modes, `Screen ${sc.n} is now ${next}${next === m0 ? ' (as designed)' : ''}. Only this screen changed; exports use it.`);
  }
  function allModes(mode) {
    const modes = {}; if (mode) for (const sc of SCENES) { const m0 = sceneMode0(sc); if (m0 && m0 !== mode) modes[sc.id] = mode; }
    snapshot(); setModes(modes, mode ? `Every screen that has a ${mode} version is now ${mode} (colour punchlines keep their colour). Undo brings back what you had.` : 'Every screen is back to its designed look.');
  }
  function modeSummary() {
    if (!META) return; const ms = Object.entries(EDITS.modes || {}).filter(([id]) => SCENES.some(s => s.id === id));
    const dk = ms.filter(([, m]) => m === 'dark').length, lt = ms.length - dk; const none = SCENES.filter(s => !sceneMode0(s)).length;
    $('modeState').textContent = (ms.length ? `${ms.length} screen${ms.length > 1 ? 's' : ''} switched${dk ? ` · ${dk} to dark` : ''}${lt ? ` · ${lt} to light` : ''}. ` : 'Every screen as designed. ')
      + `The ☀ Light / ☾ Dark button (top, or D) switches the screen you are on${none ? `; ${none} colour punchline${none > 1 ? 's keep their' : ' keeps its'} colour` : ''}. Exports use your choice.`;
  }
  $('tMode').onclick = () => toggleMode();
  $('allLight').onclick = () => allModes('light'); $('allDark').onclick = () => allModes('dark'); $('allDesign').onclick = () => allModes(null);

  /* ---------- edit mode: hit boxes, drag, resize, popover (shared with the moment editor: canvasedit.js) ---------- */
  const snapshot = () => { UNDO.push(JSON.stringify(EDITS)); if (UNDO.length > 200) UNDO.shift(); REDO = []; undoState(); };
  function undoState() { $('undo').disabled = !UNDO.length; $('redo').disabled = !REDO.length; }
  function undo() { if (!UNDO.length) return status('Nothing to undo.'); REDO.push(JSON.stringify(EDITS)); EDITS = JSON.parse(UNDO.pop()); afterEdit(); status('Undone.'); }
  function redo() { if (!REDO.length) return status('Nothing to redo.'); UNDO.push(JSON.stringify(EDITS)); EDITS = JSON.parse(REDO.pop()); afterEdit(); status('Redone.'); }
  $('undo').onclick = undo; $('redo').onclick = redo;
  function afterEdit() { setEdits(EDITS); undoState(); markEdits(); draw(); persist(); CE.refresh(); LV.sync(); MIX.apply(); updateSummary(); }
  // her volume sliders (next to Voice / Music / Sound effects): saved in edits.json "mix", undo + versions like any edit
  const LV = Shell.levels({
    get: () => EDITS.mix, snapshot: () => snapshot(),
    change: (L) => { if (Shell.mixMoved(L)) EDITS.mix = L; else delete EDITS.mix; MIX.apply(); undoState(); updateSummary(); persist(); },
  });
  const CE = CanvasEdit({
    stage, overlay, edits: () => EDITS, snapshot, render: () => renderFrame(T),
    changed: (msg) => { afterEdit(); status(msg); }, playing: () => playing, pause: () => pause(),
    closed: () => { if (editing && !playing) CE.build(); },
    caption: {
      text: (e) => capText(CAPTIONS[e.cue]), edited: (e) => EDITS.captions[e.cue] != null,
      set: (e, v) => { const c = CAPTIONS[e.cue]; if (v == null || v === c.text || !v.trim()) delete EDITS.captions[e.cue]; else EDITS.captions[e.cue] = v; },
    },
  });

  /* ---------- saving + versions ---------- */
  let saveTimer = 0;
  function saveState(m, bad) { $('save').textContent = m; $('save').classList.toggle('bad', !!bad); }
  function persist() {
    clearTimeout(saveTimer); saveState('Saving…'); $('save').classList.remove('ok');
    saveTimer = setTimeout(async () => {
      try {
        if (!sessionVersioned && LOADED !== JSON.stringify(EDITS)) { sessionVersioned = true; const prev = JSON.parse(LOADED); if (Object.keys(prev.t).length + Object.keys(prev.captions).length || prev.mix || prev.modes) await addVersion('Before this session’s edits', prev, true); }
        const r = await fetch(API + '/edits', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(EDITS) });
        if (!r.ok) throw new Error(r.status);
        saveState('Saved ✓ ' + new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })); $('save').classList.add('ok');
        const f = $('flash'); if (f) { f.textContent = 'Saved ✓'; clearTimeout(f._t); f._t = setTimeout(() => { f.textContent = ''; }, 4000); }
        if (Date.now() - lastAutoV > 10 * 60e3 && Object.keys(EDITS.t).length) { lastAutoV = Date.now(); await addVersion('Autosave', EDITS, true); }
      } catch (e) { saveState('Not saved: is the studio running?', true); }
    }, 500);
  }
  async function addVersion(label, edits, auto) {
    await fetch(API + '/versions', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ label, edits, auto: !!auto }) });
    refreshVersions();
  }
  async function refreshVersions() {
    let list = []; try { list = await (await fetch(API + '/versions', { cache: 'no-store' })).json(); } catch { }
    const box = $('vlist'); box.innerHTML = list.length ? '' : '<p>No versions yet.</p>';
    for (const v of list) {
      const row = document.createElement('div'); row.className = 'vrow';
      const d = new Date(v.savedAt); const when = d.toLocaleDateString([], { month: 'short', day: 'numeric' }) + ' ' + d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
      row.innerHTML = '<span><b></b><span class="k"></span></span>'; row.querySelector('b').textContent = v.label || 'Saved version';
      row.querySelector('.k').textContent = `${when} · ${v.count} edit${v.count === 1 ? '' : 's'}${v.auto ? ' · auto' : ''}`;
      const b = document.createElement('button'); b.type = 'button'; b.textContent = 'Restore';
      b.onclick = () => restoreVersion(v, b); row.appendChild(b); box.appendChild(row);
    }
  }
  const confirmClick = Shell.confirmClick;
  function restoreVersion(v, btn) {
    confirmClick(btn, 'Click to confirm', async () => {
      const full = await (await fetch(`${API}/versions/${v.id}`, { cache: 'no-store' })).json();
      await addVersion(`Before restoring “${v.label || 'saved version'}”`, EDITS, true);
      snapshot(); EDITS = norm(full.edits || {}); afterEdit();
      status(`Restored “${v.label || 'saved version'}”. What you had is saved as a version too.`);
    });
  }
  $('vSave').onclick = async () => { const n = $('vName').value.trim() || 'Saved version'; await addVersion(n, EDITS, false); $('vName').value = ''; status(`Version “${n}” saved.`); };
  $('clearAll').onclick = () => confirmClick($('clearAll'), 'Click again to clear every edit', async () => {
    await addVersion('Before clearing all edits', EDITS, true); snapshot(); EDITS = { t: {}, captions: {}, ...(EDITS.mix ? { mix: EDITS.mix } : {}), ...(EDITS.modes ? { modes: EDITS.modes } : {}) }; afterEdit(); status('All text and position edits cleared (the sound levels and light / dark choices stay). The old state is saved as a version.');
  });

  /* ---------- audio stems ---------- */
  function cuesKey() {
    const num = (v) => (v == null ? '' : String(v));
    const s = CUES.map(c => `${c.name}|${c.t.toFixed(3)}|${num(c.db)}|${num(c.n)}|${num(c.d)};`).join('');
    let h = 2166136261 >>> 0; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i) & 0xff; h = Math.imul(h, 16777619) >>> 0; }
    return h.toString(16).padStart(8, '0');
  }
  // The sound (voice + music + sound effects stems) rebuilds by itself when the scenes or sound cues changed: on opening
  // and before an export. "Re-mix the sound" (Advanced) does it by hand.
  let AUDIO_STALE = false, autoQueued = false;
  const audioBusy = (jobs) => jobs.some(j => j.spec.kind === 'audio' && (j.state === 'queued' || j.state === 'running'));
  async function checkAudio() {
    let a = {}; try { a = await (await fetch(API + '/audio', { cache: 'no-store' })).json(); } catch { }
    let jobs = []; try { jobs = (await (await fetch('/api/jobs', { cache: 'no-store' })).json()).filter(j => j.slug === SLUG); } catch { }
    if (a.ready) {
      const base = `/p/${SLUG}/film/build/stems/`; const v = '?v=' + encodeURIComponent(a.created || '');
      if (!AUDIO_OK || !A.voice.src.includes(v)) { A.voice.src = base + 'voice.m4a' + v; A.music.src = base + 'music.m4a' + v; A.sfx.src = base + 'sfx.m4a' + v; }
      AUDIO_OK = true; audioMute();
    } else AUDIO_OK = false;
    AUDIO_STALE = !a.ready || a.cuesKey !== cuesKey() || Math.abs(a.total - TOTAL) > 0.01;
    if (AUDIO_STALE && !audioBusy(jobs) && !autoQueued) { autoQueued = true; await postJob({ kind: 'audio' }); jobs.push({ spec: { kind: 'audio' }, state: 'queued' }); }
    $('audioState').innerHTML = audioBusy(jobs) || (AUDIO_STALE && autoQueued) ? '<span class="warn">Updating sound…</span> The scenes or sound cues changed, so the voice, music and sound effects are being re-mixed (about a minute). Preview and exports use the new sound when it is done.'
      : AUDIO_STALE ? '<span class="warn">The sound is out of date</span> and could not be updated by itself. Open Advanced and re-mix it.'
      : `Sound is up to date: her voice, the music and ${CUES.length} sound effects (master ${a.integrated_lufs} LUFS).`;
  }
  $('rebuild').onclick = async () => { await postJob({ kind: 'audio' }); status('Re-mixing the sound. It takes about a minute.'); checkAudio(); };

  /* ---------- export ---------- */
  function setExportDefaults() { $('xAspect').value = ASPECT; $('xCap').checked = show.captions; $('xVoice').checked = show.voice; $('xMusic').checked = show.music; $('xSfx').checked = show.sfx; updateSummary(); }
  function exportSpec() {
    const what = $('xWhat').value; const s = META.SCENES[sceneIndex(T)]; const li = lineIndexAt(T); const c = CAPTIONS[li];
    const spec = { kind: 'export', what, aspect: $('xAspect').value, captions: $('xCap').checked, voice: $('xVoice').checked, music: $('xMusic').checked, sfx: $('xSfx').checked, srt: $('xSrt').checked, mix: Shell.mixOf(EDITS.mix), modes: { ...(EDITS.modes || {}) } };
    let t0, t1, desc;
    if (what === 'scene') { spec.scene = s.n; t0 = s.start; t1 = s.end; desc = `Screen ${s.n} · ${s.id}`; }
    else if (what === 'line') { spec.line = li + 1; t0 = Math.max(0, c.t0 - 0.25); t1 = Math.min(TOTAL, c.t1 + 0.45); desc = `Line ${li + 1} · “${capText(c).replace(/\n/g, ' ').slice(0, 60)}”`; }
    else if (what === 'range') { t0 = parseT($('xIn').value); t1 = parseT($('xOut').value); spec.t0 = t0; spec.t1 = t1; desc = 'Custom range'; }
    else if (what === 'frame') { spec.t = T; t0 = t1 = T; desc = `Frame at ${fmt(T, 2)} (screen ${s.n} · ${s.id})`; }
    else { t0 = 0; t1 = TOTAL; desc = 'Whole film'; }
    const sp = +$('xSpeed').value; if (what !== 'frame' && sp >= 0.5 && sp <= 2 && sp !== 1) spec.speed = sp;   // playback speed (render.mjs --speed, 2026-11-19)
    return { spec, t0, t1, desc };
  }
  const fmtSpeedDur = (s) => (s >= 60 ? `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, '0')}` : `${s.toFixed(1)} s`);
  function updateSummary() {
    if (!META) return; const { spec, t0, t1, desc } = exportSpec();
    $('xRange').hidden = spec.what !== 'range';
    const bad = spec.what === 'range' && !(t1 > t0);
    const dir = spec.what === 'film' ? 'video' : spec.what === 'frame' ? 'frames' : 'clips';
    const lv = spec.what === 'frame' ? '' : [['voice', 'voice'], ['music', 'music'], ['sfx', 'sound effects']].filter(([k]) => spec.mix[k] && spec[k]).map(([k, n]) => ` · ${n} ${Shell.dbText(spec.mix[k])}`).join('');
    $('xSummary').textContent = bad ? 'Set an in and an out point (m:ss.ss).' :
      `${desc}${modeText(spec, t0, t1)}\n${spec.what === 'frame' ? fmt(t0, 2) : `${fmt(t0, 2)} → ${fmt(t1, 2)} (${(t1 - t0).toFixed(1)} s${spec.speed ? `, plays in ${fmtSpeedDur((t1 - t0) / spec.speed)} at ${spec.speed}×` : ''})`} · ${ASPECTS[spec.aspect].label}${spec.captions ? ' · captions' : ''}${spec.what !== 'frame' ? (spec.voice ? '' : ' · no voice') + (spec.music ? '' : ' · no music') + (spec.sfx ? '' : ' · no sound effects') : ''}${lv}`;
    $('xNote').textContent = `Renders frame by frame on this Mac, one export at a time. Saved to Downloads and to projects/${SLUG}/outputs/${dir}/ (nothing there is overwritten).`;
    $('xSummary').style.whiteSpace = 'pre-line'; $('xGo').disabled = bad;
    const mk = $('mark'); if (spec.what === 'frame') mk.hidden = true; else { mk.hidden = false; mk.style.left = (t0 / TOTAL * 100) + '%'; mk.style.width = Math.max(0.15, (t1 - t0) / TOTAL * 100) + '%'; }
    for (const id of ['xVoice', 'xMusic', 'xSfx', 'xSrt', 'xSpeed']) $(id).disabled = spec.what === 'frame';
    $('xLevels').innerHTML = levelsText(spec.mix);
    const noSound = spec.what === 'frame' || bad;
    for (const id of ['sVoice', 'sMusic', 'sSfx', 'sAll']) $(id).disabled = noSound;
    $('sNote').textContent = spec.what === 'frame' ? 'A single frame has no sound: choose a screen, a line, an in / out or the whole film above.'
      : bad ? 'Set an in and an out point first.'
      : `${desc}, ${(t1 - t0).toFixed(1)} s: each part as a WAV file (48 kHz, 24-bit) at its level in the export, lined up with the video, so the three together sound like the video. Saved to Downloads and to projects/${SLUG}/outputs/audio/.`;
  }
  // light / dark in the export summary: the screen's own mode, or how many screens in the range are switched
  function modeText(spec, t0, t1) {
    if (spec.what === 'scene' || spec.what === 'frame') { const sc = curScene(); const m0 = sceneMode0(sc), m = sceneMode(sc); return m0 && m !== m0 ? ` · ${m} (switched)` : ''; }
    const ids = new Set(META.SCENES.filter(s => s.end > t0 + 1e-6 && s.start < t1 - 1e-6).map(s => s.id)); const n = Object.keys(spec.modes || {}).filter(id => ids.has(id)).length;
    return n ? ` · ${n} screen${n > 1 ? 's' : ''} switched light / dark` : '';
  }
  // "Volume: voice 0 dB · music −6 dB · …" + the one-line explanation (the export panels of both editors say the same)
  function levelsText(mix) {
    const L = Shell.mixOf(mix); const part = (k, n) => `${n} <b>${Shell.dbText(L[k])}</b>`;
    return `Volume: ${part('voice', 'voice')} · ${part('music', 'music')} · ${part('sfx', 'sound effects')} (the sliders at the top). The overall loudness stays the same for YouTube; these change the balance.`;
  }
  for (const id of ['xWhat', 'xAspect', 'xCap', 'xVoice', 'xMusic', 'xSfx', 'xSrt', 'xSpeed', 'xIn', 'xOut']) $(id).addEventListener('input', updateSummary);
  $('xSetIn').onclick = () => { $('xIn').value = fmt(T, 2); if (!$('xOut').value) $('xOut').value = fmt(Math.min(TOTAL, T + 10), 2); updateSummary(); };
  $('xSetOut').onclick = () => { $('xOut').value = fmt(T, 2); updateSummary(); };
  $('xGo').onclick = async () => {
    const { spec, desc } = exportSpec();
    if (AUDIO_STALE && spec.what !== 'frame') { await checkAudio(); status(`Updating the sound first, then exporting: ${desc}.`); }
    await postJob(spec); if (!AUDIO_STALE || spec.what === 'frame') status(`Exporting: ${desc}. It downloads by itself when it is ready.`);
  };
  // Sound only: the export's range (not a frame), each part as a WAV; the sound is brought up to date first, like an export
  const TRACK_NAME = { voice: 'voice', music: 'music', sfx: 'sound effects' };
  for (const id of ['sVoice', 'sMusic', 'sSfx', 'sAll']) $(id).onclick = async () => {
    const { spec, desc } = exportSpec(); if (spec.what === 'frame') return;
    const tracks = $(id).dataset.tracks.split(',');
    const job = { kind: 'sound', what: spec.what, scene: spec.scene, line: spec.line, t0: spec.t0, t1: spec.t1, tracks, mix: spec.mix };
    if (AUDIO_STALE) { await checkAudio(); status(`Updating the sound first, then: ${desc}, ${tracks.map(t => TRACK_NAME[t]).join(' + ')}.`); }
    await postJob(job); if (!AUDIO_STALE) status(`Making the sound files: ${desc}, ${tracks.map(t => TRACK_NAME[t]).join(' + ')}. They download by themselves.`);
  };
  const whatName = (sp) => ({ film: 'Whole film', scene: 'Screen ' + sp.scene, line: 'Line ' + sp.line, range: 'Range', frame: 'Frame' }[sp.what]);
  const JOBS = Shell.jobs({
    slug: SLUG, filter: (sp) => ['export', 'sound', 'audio', 'stills'].includes(sp.kind), download: (sp) => sp.kind === 'export' || sp.kind === 'sound',
    name: (sp) => (sp.kind === 'audio' ? 'Updating the sound' : sp.kind === 'sound' ? `Sound only · ${whatName(sp)} · ${sp.tracks.length === 3 ? 'all three' : TRACK_NAME[sp.tracks[0]]}` : sp.kind !== 'export' ? sp.kind : `${whatName(sp)} · ${ASPECTS[sp.aspect] ? ASPECTS[sp.aspect].label : ''}`),
    onDone: (j) => { if (j.spec.kind === 'audio') checkAudio(); },
  });
  const postJob = (spec) => JOBS.start(spec);
  const pollJobs = () => JOBS.poll();

  /* ---------- keyboard ---------- */
  document.addEventListener('keydown', (e) => {
    const tg = e.target.tagName; if (tg === 'INPUT' || tg === 'TEXTAREA' || tg === 'SELECT') return;
    const mod = e.metaKey || e.ctrlKey;
    if (mod && e.key.toLowerCase() === 'z') { e.preventDefault(); e.shiftKey ? redo() : undo(); return; }
    if (mod && e.key.toLowerCase() === 'y') { e.preventDefault(); redo(); return; }
    if (mod) return;
    if (e.code === 'Space') { e.preventDefault(); playing ? pause() : play(); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); seek(T - (e.shiftKey ? 1 : 1 / FPS)); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); seek(T + (e.shiftKey ? 1 : 1 / FPS)); }
    else if (e.key === '[') { const i = sceneIndex(T); const s = META.SCENES[T - META.SCENES[i].start > 0.5 ? i : Math.max(0, i - 1)]; seek(s.start + 0.001); }
    else if (e.key === ']') { const i = sceneIndex(T); if (i + 1 < META.SCENES.length) seek(META.SCENES[i + 1].start + 0.001); }
    else if (e.key.toLowerCase() === 'e') toggleEdit();
    else if (e.key.toLowerCase() === 'l') playScreen();
    else if (e.key.toLowerCase() === 'd') toggleMode();
    else if (e.key.toLowerCase() === 'c') $('tCap').click();
    else if (e.key === 'Escape') CE.close();
  });

  // test hook (headless checks): state + actions without pointer gestures
  window.STUDIO = { get T() { return T; }, seek, edits: () => EDITS, setFrame, toggleEdit, undo, redo, elements: () => EL.list.slice(), openPop: (id) => CE.open(id), mixer: () => ({ state: MIX.state(), gains: MIX.gains(), muted: Object.fromEntries(Object.entries(A).map(([k, a]) => [k, a.muted])) }), play, pause, get playing() { return playing; }, playScreen, toggleMode, allModes, get loop() { return { scene: LOOP, loops: LOOPS, at: loopAt }; }, mode: () => { const sc = curScene(); return { id: sc.id, n: sc.n, mode: sceneMode(sc), designed: sceneMode0(sc), button: $('tMode').textContent, disabled: $('tMode').getAttribute('aria-disabled') === 'true' }; } };
  boot();
})();
