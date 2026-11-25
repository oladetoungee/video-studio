/* Moment editor: /moment/<slug>/<id>/  (a talking-head moment: her footage with the graphics on top).
 * Footage: a preview proxy of the moment's cut (build/proxy/<id>.mp4, the same frames composite.mjs exports, whole
 * 16:9 frame), cropped here per frame by the moment's own virtual camera (camAt from footage.js) -> the framing is
 * the export's. Graphics: the same runtime as the export (bootMoment + renderMoment). Sound: the export's mix as
 * three tracks (voice, music, sound effects) so each can be switched off. The video is the clock.
 * Edits save into talking-head/edits/<id>.json (core.js format; "capShort" = 9:16 caption chunks, "cap16" = 16:9 caption
 * chunks, "captions16" / "captions9" = her caption size slider and height per frame size).
 * Export: the whole video, this section (layout segment), this sentence (caption line), a custom in / out or this frame (PNG), 16:9 / 9:16 / both, captions on / off, voice / music /
 * sound effects, through the queue (composite.mjs); the server hard-links each file into Downloads.
 * Her footage is only ever cropped and scaled, never flipped. */
'use strict';
(() => {
  const { $, fmt, status, saveState, json, put, confirmClick } = Shell;
  const parts = location.pathname.split('/').filter(Boolean);       // moment/<slug>/<id>
  const SLUG = parts[1], ID = parts[2];
  const API = `/api/${SLUG}/moment/${ID}`, MAN = `/p/${SLUG}/talking-head/talking-head.json`;
  const PREF_KEY = `studio:moment:${SLUG}:${ID}`;
  const prefs = (() => { try { return JSON.parse(localStorage.getItem(PREF_KEY) || '{}'); } catch { return {}; } })();
  const savePrefs = () => { try { localStorage.setItem(PREF_KEY, JSON.stringify(prefs)); } catch { } };
  const q = new URLSearchParams(location.search);
  const ASPS = ['9x16', '16x9', '1x1', '4x5'];   // (1:1 and 4:5 only for teasers; checked after boot)
  const ASP0 = ASPS.includes(q.get('aspect')) ? q.get('aspect') : ASPS.includes(prefs.aspect) ? prefs.aspect : '9x16';
  const cv = $('cv'), fv = $('fv'), fx = fv.getContext('2d'), stage = $('stage'), overlay = $('overlay');
  // two video elements: the chunk on screen and the next one, loaded ahead (long moments preview in 30 s chunks)
  const VIDS = [$('vid'), $('vid2')]; let act = 0; let vid = VIDS[0];
  const A = { voice: $('aVoice'), music: $('aMusic'), sfx: $('aSfx') };
  // captions: per frame size (16:9 defaults on for a full edit, 9:16 always; set after boot from the moment's kind)
  const show = { captions: true, voice: prefs.voice !== false, music: prefs.music !== false, sfx: prefs.sfx !== false };

  let T = 0, playing = false, editing = false, META = null, EDITS = { t: {}, captions: {}, capShort: {}, cap16: {} }, LOADED = '{}';
  let IS_SHORT = false;
  let PROXY = null, sessionVersioned = false, rafId = 0, clock0 = 0, t0 = 0, n = 0;

  // edits as the editor keeps them (+ her sound levels, "mix", only when moved)
  const norm = (e) => ({ t: e.t || {}, captions: e.captions || {}, capShort: e.capShort || {}, cap16: e.cap16 || {}, ...(Shell.mixMoved(e.mix) ? { mix: Shell.mixOf(e.mix) } : {}),
    ...(e.captions16 ? { captions16: { ...e.captions16 } } : {}), ...(e.captions9 ? { captions9: { ...e.captions9 } } : {}), ...(e.captions3 ? { captions3: { ...e.captions3 } } : {}), ...(e.frame9 ? { frame9: e.frame9 } : {}), ...(e.frame9seg && Object.keys(e.frame9seg).length ? { frame9seg: { ...e.frame9seg } } : {}), ...(e.pauses && Object.keys(e.pauses).length ? { pauses: JSON.parse(JSON.stringify(e.pauses)) } : {}) });
  const editCount = (e) => Object.keys(e.t).length + Object.keys(e.capShort).length + Object.keys(e.cap16 || {}).length + Object.keys(e.captions).length + (e.mix ? 1 : 0) + (e.captions16 ? 1 : 0) + (e.captions9 ? 1 : 0) + (e.captions3 ? 1 : 0) + (e.frame9 ? 1 : 0) + Object.keys(e.frame9seg || {}).length + Object.keys(e.pauses || {}).length;

  /* ---------- boot ---------- */
  async function boot() {
    try {
      EDITS = norm(await json(API + '/edits')); LOADED = JSON.stringify(EDITS);
      await bootMoment({ manifest: MAN, id: ID, canvas: cv, aspect: ASP0, edits: EDITS });
    } catch (e) { $('loading').textContent = 'The moment did not load: ' + e.message; console.error(e); return; }
    META = FOOT.meta(); EL.rec = true;
    IS_SHORT = FOOT.m.kind === 'short';
    const capPref = (prefs.capOn || {})[ASPECT]; show.captions = capPref != null ? capPref : (ASPECT === '9x16' || FOOT.m.kind === 'full' || FOOT.m.kind === 'teaser'); SHOW.captions = show.captions;
    if (FOOT.m.kind === 'teaser') {   // a teaser (LinkedIn / X): four frame sizes
      for (const a of ['1x1', '4x5']) document.querySelector(`#aspectSeg [data-aspect="${a}"]`).hidden = false;
      [...$('xAspect').options].forEach(o => { if (['1x1', '4x5', 'all'].includes(o.value)) o.hidden = false; });
    } else if (ASPECT === '1x1' || ASPECT === '4x5') { location.href = `/moment/${SLUG}/${ID}/?aspect=9x16`; return; }
    if (IS_SHORT) {   // a short is 9:16 only (its own layout, label, captions and end card)
      if (ASPECT !== '9x16') { location.href = `/moment/${SLUG}/${ID}/?aspect=9x16`; return; }
      document.querySelector('#aspectSeg [data-aspect="16x9"]').hidden = true; [...$('xAspect').options].forEach(o => { o.hidden = o.value !== '9x16'; }); $('xAspect').value = '9x16';
    }
    if (IS_SHORT && FOOT.th && TH.FRAMES) FRAME.setup();
    if (FOOT.m.kind !== 'teaser') PAUSES.setup();
    const kindName = (m) => (m.kind === 'short' ? 'Short' : m.kind === 'full' ? 'Talking-head' : m.kind === 'teaser' ? 'Teaser' : 'Moment');
    const numOf = (m) => FOOT.man.moments.filter(x => (x.kind || 'moment') === (m.kind || 'moment')).findIndex(x => x.id === m.id) + 1;
    const head = (m) => (m.kind === 'full' ? 'Full talking-head edit' : m.kind === 'teaser' ? 'Teaser (LinkedIn and X)' : `${kindName(m)} ${String(numOf(m)).padStart(2, '0')}`);
    document.title = `${head(FOOT.m)} · Studio`; $('title').textContent = head(FOOT.m);
    const sel = $('momentSel'); FOOT.man.moments.forEach((m) => { const o = document.createElement('option'); o.value = m.id; o.textContent = `${head(m)} · ${m.title}`; sel.appendChild(o); }); sel.value = ID;
    sel.onchange = () => { location.href = `/moment/${SLUG}/${sel.value}/?aspect=${ASPECT}`; };
    fv.width = CW / 2; fv.height = CH / 2;
    $('loading').hidden = true; buildShots(); buildLines(); buildTicks(); syncToggles(); fit(); $('xCap').checked = show.captions; updateSummary(); CAPS.sync(); CAPS.loadBg();
    const goP = prefs.goPause && FOOT.pauses.find(p => p.id === prefs.goPause); if (prefs.goPause) { delete prefs.goPause; savePrefs(); }   // (a pause was just added / changed: show it)
    seek(goP ? goP.t0 + Math.min(goP.d - 0.1, 1.6) : q.has('t') ? +q.get('t') : (prefs.t || 0));
    LV.sync(); MIX.apply(); V.refresh(); JOBS.poll(); checkProxy();
    saveState(`Saving into talking-head/edits/${ID}.json`);
  }

  /* ---------- shorts framing (her note 2026-10-26 "I look so zoomed in"): whole short + this section; saved, then the page
   * reloads (the cameras are built from it) ---------- */
  const FRAME = (() => {
    const fill = (sel, first) => { sel.innerHTML = ''; if (first) { const o = document.createElement('option'); o.value = ''; o.textContent = first; sel.appendChild(o); }
      for (const [k, v] of Object.entries(TH.FRAMES)) { const o = document.createElement('option'); o.value = k; o.textContent = v.label; sel.appendChild(o); } };
    const segId = () => (META.SCENES[sceneIndex(T)] || {}).id;
    async function save(msg) { try { await put(API + '/edits', EDITS); LOADED = JSON.stringify(EDITS); status(msg); location.reload(); } catch { status('Not saved: is the studio running?'); } }
    function sync() { if ($('framePane').hidden) return; const id = segId(); $('fSeg').value = (EDITS.frame9seg || {})[id] || ''; }
    function setup() {
      $('framePane').hidden = false; fill($('fAll')); fill($('fSeg'), 'Same as the whole short');
      $('fAll').value = EDITS.frame9 || TH.frameName(null); 
      $('fAll').onchange = () => { hist.snapshot(); EDITS.frame9 = $('fAll').value; save('Framing saved for the whole short. Reloading…'); };
      $('fSeg').onchange = () => { hist.snapshot(); const id = segId(); const m = { ...(EDITS.frame9seg || {}) }; if ($('fSeg').value) m[id] = $('fSeg').value; else delete m[id]; if (Object.keys(m).length) EDITS.frame9seg = m; else delete EDITS.frame9seg; save('Framing saved for this section. Reloading…'); };
      sync();
    }
    return { setup, sync };
  })();

  /* ---------- "pause her" (FEEDBACK 2026-11-02): correction inserts. Saved in edits "pauses" {id: {at (source s), d, look,
   * sound, off}}; the text is the canvas element pause-<id>/text (edits "t"). A pause changes the timeline (her words, the cut,
   * the sound), so adding, deleting or changing its length / look / sound saves and reloads the page; the text edits live. ---------- */
  const pauseSig = (e) => JSON.stringify(e.pauses || null); let PAUSE0 = null;
  const PAUSES = (() => {
    const TXT = (id) => 'pause-' + id + '/text';
    async function save(msg, goId) { try { if (goId) { prefs.goPause = goId; } prefs.t = T; savePrefs(); await put(API + '/edits', EDITS); LOADED = JSON.stringify(EDITS); status(msg); setTimeout(() => location.reload(), 300); } catch { status('Not saved: is the studio running?'); } }
    const ed = (id) => { EDITS.pauses = EDITS.pauses || {}; return (EDITS.pauses[id] = EDITS.pauses[id] || {}); };
    function setup() {
      $('pausePane').hidden = false;
      $('pAdd').onclick = () => {
        if (FOOT.pauses.some(p => T >= p.t0 - 0.05 && T < p.t1 + 0.05)) { status('The playhead is on a pause already: move it to where she should stop.'); return; }
        if (T >= FOOT.dur - 0.1) { status('Put the playhead inside her video (not on the ending).'); return; }
        hist.snapshot(); const at = +outToRaw(T).toFixed(3); let id = 'fix-' + Math.round(at * 10); while ((EDITS.pauses || {})[id] || FOOT.pauses.some(p => p.id === id)) id += 'b';
        Object.assign(ed(id), { at, d: 4 });
        save('Pause added: she stops after the word she is saying there. Click its text on the screen (✎ Edit) or in this panel to write the correction. Reloading…', id);
      };
      list();
    }
    function list() {
      const box = $('pList'); box.innerHTML = '';
      for (const p of FOOT.pauses) {
        const d = document.createElement('div'); d.className = 'pitem'; d.dataset.id = p.id;
        d.innerHTML = `<div class="inout"><span class="ts"></span><span class="grow"></span><button type="button" data-a="go">Go to</button><button type="button" data-a="del">Delete</button></div>
          <textarea aria-label="Correction text"></textarea>
          <div class="inout"><label>Seconds <input type="number" min="1" max="20" step="0.5" data-a="d" aria-label="How long she pauses"></label>
            <select data-a="look" aria-label="What shows"><option value="card">Plain screen</option><option value="frozen">Her picture, held</option></select></div>
          <label><input type="checkbox" data-a="sound"> Soft typing sound</label>`;
        d.querySelector('.ts').textContent = `${fmt(p.t0, 2)} · ${p.d.toFixed(1)} s` + (p.src === 'editor' ? '' : ' · from the project');
        const ta = d.querySelector('textarea'); ta.value = pauseText(p);
        ta.oninput = () => { if (!ta._snap) { hist.snapshot(); ta._snap = true; } const v = ta.value.trim(); const k = TXT(p.id); const e = { ...(EDITS.t[k] || {}) };
          if (!v || v === (p.text || '')) delete e.s; else e.s = v; if (Object.keys(e).length) EDITS.t[k] = e; else delete EDITS.t[k]; afterEdit(); };
        ta.onchange = () => { ta._snap = false; };
        const num = d.querySelector('[data-a=d]'); num.value = +p.d.toFixed(2);
        num.onchange = () => { const v = Math.max(1, Math.min(20, +num.value || 4)); hist.snapshot(); ed(p.id).d = v; if (p.src === 'editor') ed(p.id).at = p.at; save(`Pause set to ${v} s. Reloading…`, p.id); };
        const lk = d.querySelector('[data-a=look]'); lk.value = p.look === 'frozen' ? 'frozen' : 'card';
        lk.onchange = () => { hist.snapshot(); ed(p.id).look = lk.value; save('Saved. Reloading…', p.id); };
        const sd = d.querySelector('[data-a=sound]'); sd.checked = p.sound !== false;
        sd.onchange = () => { hist.snapshot(); ed(p.id).sound = sd.checked; save(sd.checked ? 'Typing sound on. Reloading…' : 'Typing sound off. Reloading…', p.id); };
        d.querySelector('[data-a=go]').onclick = () => seek(p.t0 + Math.min(p.d - 0.1, 1.6));
        d.querySelector('[data-a=del]').onclick = () => confirmClick(d.querySelector('[data-a=del]'), 'Click again to delete', () => {
          hist.snapshot(); if (p.src === 'editor') { delete EDITS.pauses[p.id]; if (!Object.keys(EDITS.pauses).length) delete EDITS.pauses; } else ed(p.id).off = true;
          delete EDITS.t[TXT(p.id)]; save('Pause deleted: her video runs on there again. Reloading…'); });
        box.appendChild(d);
      }
      const off = Object.entries(EDITS.pauses || {}).filter(([id, v]) => !v.off && !FOOT.pauses.some(p => p.id === id)).length;
      $('pNote').textContent = (FOOT.pauses.length ? 'In ✎ Edit, click the text on the screen to change it, drag its block to move it, use Size to resize it. ' : 'No pauses yet. Put the playhead right after what she got wrong, then add one. ')
        + (off ? `${off} saved pause(s) are outside this ${IS_SHORT ? 'short' : 'video'}'s cut and are not shown.` : '');
      mark();
    }
    function mark() { for (const el of $('pList').children) { const p = FOOT.pauses.find(x => x.id === el.dataset.id); el.classList.toggle('on', !!p && T >= p.t0 && T < p.t1); } }
    return { setup, list, mark };
  })();

  /* ---------- drawing: footage (cropped by the moment's camera) + graphics ---------- */
  function drawFoot() {
    fx.setTransform(1, 0, 0, 1, 0, 0);
    if (!PROXY || vid.readyState < 2) { fx.fillStyle = '#1D1E23'; fx.fillRect(0, 0, fv.width, fv.height); return; }
    const cam = camAt(T); const [sw, sh] = FOOT.src; const s = (PROXY.w || 1280) / sw;
    fx.fillStyle = '#EDE9E2'; fx.fillRect(0, 0, fv.width, fv.height);   // paper around the picture ("window" framing, a box), as in the export
    const x0 = Math.max(cam.x, 0), y0 = Math.max(cam.y, 0), x1 = Math.min(cam.x + cam.w, sw), y1 = Math.min(cam.y + cam.h, sh);
    if (x1 <= x0 || y1 <= y0) return;
    const b = cam.boxed ? [cam.box[0] * BASE[0] + BASE[4], cam.box[1] * BASE[3] + BASE[5], cam.box[2] * BASE[0], cam.box[3] * BASE[3]] : [0, 0, CW, CH]; const k = fv.width / CW;   // the box (layout px, through BASE) -> preview canvas px
    fx.drawImage(vid, x0 * s, y0 * s, (x1 - x0) * s, (y1 - y0) * s, (b[0] + (x0 - cam.x) / cam.w * b[2]) * k, (b[1] + (y0 - cam.y) / cam.h * b[3]) * k, (x1 - x0) / cam.w * b[2] * k, (y1 - y0) / cam.h * b[3] * k);
  }
  /* chunks: PROXY.chunks [{t0, t1, url, ready}] (one chunk for short moments) */
  const chunkAt = (t) => { const C = PROXY.chunks; let i = 0; for (let k = 0; k < C.length; k++) if (C[k].t0 <= t + 1e-6) i = k; return i; };
  function loadChunk(v, i) { const c = PROXY.chunks[i]; if (!c || !c.ready) return false; if (v.dataset.ci !== String(i) || v.dataset.key !== c.url) { v.src = c.url; v.dataset.ci = String(i); v.dataset.key = c.url; } return true; }
  const vt = (t) => t - PROXY.chunks[chunkAt(t)].t0;   // time inside the chunk
  // her matte (L2 words behind her, L6 cut-out) rides under the picture in the preview footage
  function matteFromVideo() { if (!PROXY || !PROXY.band || !FOOT.th || !TH.need.length) return; if (!TH.matteAt(T) || vid.readyState < 2) return; const b = PROXY.band; TH.setMatteFrom(vid, b[0], b[1], b[2], b[3]); }
  function drawGfx() {
    renderMoment(T);
    $('time').textContent = `${fmt(T, 2)} / ${fmt(TOTAL)}`;
    $('fill').style.width = (T / TOTAL * 100) + '%'; $('head').style.left = `calc(${(T / TOTAL * 100)}% - 1px)`;
    $('track').setAttribute('aria-valuenow', T.toFixed(1)); $('track').setAttribute('aria-valuemax', TOTAL.toFixed(1));
    markLists(); if (FOOT.pauses.length) PAUSES.mark();
    if (editing && !playing) CE.build(); else overlay.innerHTML = '';
  }
  // paused: graphics now, footage when the video has the frame
  function draw() {
    drawGfx();
    if (playing || !PROXY) return drawFoot();
    const ci = chunkAt(T); if (!loadChunk(vid, ci)) return drawFoot();
    const want = vt(T) + 0.3 / FOOT.fps;
    if (vid.readyState < 1) return;   // loadedmetadata seeks
    if (Math.abs(vid.currentTime - want) > 0.5 / FOOT.fps) vid.currentTime = want; else { matteFromVideo(); if (TH.matteAt && FOOT.th && TH.matteAt(T)) drawGfx(); drawFoot(); }
  }
  for (const v of VIDS) {
    v.addEventListener('seeked', () => { if (!playing && v === vid) { if (FOOT.th && TH.matteAt(T)) { matteFromVideo(); drawGfx(); } drawFoot(); } });
    v.addEventListener('loadeddata', () => { if (!playing && v === vid) draw(); });
  }
  function fit() {
    const wrap = $('stagewrap'); const ar = CW / CH; const mw = wrap.clientWidth, mh = Math.max(240, wrap.clientHeight);
    let w = mw, h = w / ar; if (h > mh) { h = mh; w = h * ar; }
    stage.style.width = Math.floor(w) + 'px'; stage.style.height = Math.floor(h) + 'px';
  }
  addEventListener('resize', () => { if (!META) return; fit(); draw(); });
  new ResizeObserver(() => { if (META) { fit(); if (!playing) draw(); } }).observe($('stagewrap'));   // e.g. the edit bar appearing

  /* ---------- playback ---------- */
  // on/off and her volume levels go through Web Audio gains (Shell.mixer)
  const MIX = Shell.mixer({ els: A, levels: () => EDITS.mix, on: (k) => show[k] });
  const audioMute = () => MIX.apply();
  const audioOn = () => !!PROXY && PROXY.stems;
  // the export Speed also plays the preview at that speed (her voice keeps its pitch: preservesPitch)
  const RATE = () => { const r = +($('xSpeed') && $('xSpeed').value) || 1; return r >= 0.5 && r <= 2 ? r : 1; };
  // defaultPlaybackRate too: loading the next footage chunk resets playbackRate to the default (that was the glitch)
  function applyRate() { const r = RATE(); for (const m of [...VIDS, ...Object.values(A)]) { m.preservesPitch = true; m.defaultPlaybackRate = r; m.playbackRate = r; } }
  function play() {
    if (playing || !META) return; if (T >= TOTAL - 0.05) T = 0; playing = true; CE.close();
    $('play').textContent = '❚❚ Pause'; t0 = T; clock0 = performance.now(); applyRate();
    if (PROXY) {
      if (loadChunk(vid, chunkAt(T))) { vid.currentTime = vt(T); vid.play().catch(() => { }); if (vid.requestVideoFrameCallback) vid.requestVideoFrameCallback(onFrame); }
      if (audioOn()) { MIX.init(); audioMute(); for (const a of Object.values(A)) { a.currentTime = T; a.play().catch(() => { }); } }
    }
    rafId = requestAnimationFrame(loop);
  }
  function onFrame(now, md) {
    if (!playing) return; const v = this || vid; if (v !== vid) return;
    const ci = +vid.dataset.ci; const c = PROXY.chunks[ci];
    T = Math.min(TOTAL - 1 / FOOT.fps, c.t0 + md.mediaTime); matteFromVideo(); drawGfx(); drawFoot();
    if (vid.playbackRate !== RATE()) applyRate();
    if (audioOn() && ++n % 15 === 0) { const tol = 0.08 * RATE() + (RATE() > 1 ? 0.07 : 0); for (const a of Object.values(A)) if (Math.abs(a.currentTime - T) > tol) a.currentTime = T; }   // looser at speed: fewer audible jumps
    const nx = PROXY.chunks[ci + 1];
    if (nx && T > c.t1 - 2) { const o = VIDS[1 - act]; if (loadChunk(o, ci + 1) && o.readyState >= 1 && o.currentTime !== 0 && !o._primed) { o.currentTime = 0; o._primed = true; } }
    if (nx && T >= c.t1 - 1.5 / FOOT.fps) {   // hand over to the next chunk (already loaded in the other element)
      const o = VIDS[1 - act]; if (loadChunk(o, ci + 1)) { vid.pause(); act = 1 - act; vid = o; o._primed = false; o.currentTime = Math.max(0, T + 1 / FOOT.fps - nx.t0); o.playbackRate = RATE(); o.play().catch(() => { }); o.requestVideoFrameCallback(onFrame.bind(o)); return; }
    }
    vid.requestVideoFrameCallback(onFrame.bind(vid));
  }
  function loop() {
    if (!playing) return;
    if (!PROXY || !vid.requestVideoFrameCallback || !PROXY.chunks[chunkAt(T)].ready) { T = t0 + RATE() * (performance.now() - clock0) / 1000; drawGfx(); drawFoot(); }
    if (T >= TOTAL - 1.5 / FOOT.fps || (PROXY && vid.ended && +vid.dataset.ci === PROXY.chunks.length - 1)) { T = TOTAL - 1 / FOOT.fps; pause(); return; }
    rafId = requestAnimationFrame(loop);
  }
  function pause() {
    if (!playing) return; playing = false; cancelAnimationFrame(rafId); $('play').textContent = '▶ Play';
    for (const v of VIDS) v.pause(); for (const a of Object.values(A)) a.pause();
    T = Math.round(T * FOOT.fps) / FOOT.fps; prefs.t = T; savePrefs(); draw();
  }
  function seek(t) {
    T = Math.min(Math.max(0, t), TOTAL - 1 / FOOT.fps); if (!playing) T = Math.round(T * FOOT.fps) / FOOT.fps;
    if (playing) { t0 = T; clock0 = performance.now(); if (PROXY) { if (loadChunk(vid, chunkAt(T))) { vid.currentTime = vt(T); vid.play().catch(() => { }); } if (audioOn()) for (const a of Object.values(A)) a.currentTime = T; } }
    else { prefs.t = T; savePrefs(); }
    draw();
  }
  $('play').onclick = () => (playing ? pause() : play());
  (() => {
    const tr = $('track'); let down = false;
    const at = (e) => { const r = tr.getBoundingClientRect(); seek(clamp((e.clientX - r.left) / r.width) * TOTAL); };
    tr.addEventListener('pointerdown', (e) => { down = true; tr.setPointerCapture(e.pointerId); at(e); });
    tr.addEventListener('pointermove', (e) => { if (down) at(e); });
    tr.addEventListener('pointerup', () => { down = false; });
  })();

  /* ---------- toggles ---------- */
  function syncToggles() {
    for (const [id, k] of [['tCap', 'captions'], ['tVoice', 'voice'], ['tMusic', 'music'], ['tSfx', 'sfx']]) $(id).setAttribute('aria-pressed', String(show[k]));
    for (const b of document.querySelectorAll('#aspectSeg button')) b.setAttribute('aria-pressed', String(b.dataset.aspect === ASPECT));
    $('tCap').title = ASPECT === '9x16' ? 'Captions on / off in the preview (C)' : 'Your 16:9 captions on / off in the preview (C)';
    $('moveNote').textContent = ` (${ASPECT.replace('x', ':')})`; audioMute();
  }
  for (const [id, k] of [['tVoice', 'voice'], ['tMusic', 'music'], ['tSfx', 'sfx']]) $(id).onclick = () => { show[k] = !show[k]; prefs[k] = show[k]; savePrefs(); syncToggles(); $('x' + id.slice(1)).checked = show[k]; updateSummary(); };
  $('tCap').onclick = () => { show.captions = !show.captions; SHOW.captions = show.captions; prefs.capOn = { ...(prefs.capOn || {}), [ASPECT]: show.captions }; savePrefs(); syncToggles(); $('xCap').checked = show.captions; updateSummary(); CAPS.sync(); draw(); };
  for (const b of document.querySelectorAll('#aspectSeg button')) b.onclick = () => {
    if (b.dataset.aspect === ASPECT) return; pause(); prefs.aspect = b.dataset.aspect; prefs.t = T; savePrefs();
    location.href = `/moment/${SLUG}/${ID}/?aspect=${b.dataset.aspect}`;   // the camera and layout are built per frame size
  };
  function toggleEdit(on = !editing) {
    editing = on; if (editing) pause(); CE.close();
    $('tEdit').setAttribute('aria-pressed', String(editing)); $('tEdit').textContent = editing ? 'Done' : '✎ Edit'; stage.classList.toggle('editing', editing);
    $('editbanner').hidden = !editing; $('editbar').hidden = !editing; draw();
  }
  $('tEdit').onclick = () => toggleEdit();

  /* ---------- lists ---------- */
  const shotEdited = (id) => Object.keys(EDITS.t).some(k => k.startsWith(id + '/'));
  function buildShots() {
    const box = $('shots'); box.innerHTML = '';
    for (const s of META.SCENES) {
      const b = document.createElement('button'); b.type = 'button'; b.className = 'row';
      b.innerHTML = `<span class="ts"></span><span><span class="nm"></span><span class="lb"></span></span>`;
      b.querySelector('.ts').textContent = fmt(s.start); b.querySelector('.nm').textContent = `${s.n} · ${s.id}`; b.querySelector('.lb').textContent = s.layout || (s.card ? 'full-frame card' : 'over her footage');
      b.onclick = () => seek(s.start + 0.4); box.appendChild(b);
    }
    markEdits();
  }
  function buildLines() {
    const box = $('lines'); box.innerHTML = '';
    META.captions.long.forEach((c) => {
      const b = document.createElement('button'); b.type = 'button'; b.className = 'row';
      b.innerHTML = '<span class="ts"></span><span class="tx"></span>'; b.querySelector('.ts').textContent = fmt(c.t0); b.querySelector('.tx').textContent = c.text;
      b.onclick = () => seek(c.t0 + 0.05); box.appendChild(b);
    });
  }
  function buildTicks() {
    const tr = $('track'); tr.querySelectorAll('.tick').forEach(e => e.remove());
    for (const t of cutTimes()) { const d = document.createElement('div'); d.className = 'tick'; d.title = 'jump cut'; d.style.left = (t / TOTAL * 100) + '%'; tr.insertBefore(d, $('fill').nextSibling); }
    for (const s of META.SCENES) { if (s.n === 1) continue; const d = document.createElement('div'); d.className = 'tick blue' + (shotEdited(s.id) ? ' ed' : ''); d.style.left = (s.start / TOTAL * 100) + '%'; tr.insertBefore(d, $('fill').nextSibling); }
    for (const p of FOOT.pauses) { const d = document.createElement('div'); d.className = 'tick pz'; d.title = 'pause: ' + pauseText(p); d.style.left = (p.t0 / TOTAL * 100) + '%'; d.style.width = Math.max(0.2, p.d / TOTAL * 100) + '%'; tr.insertBefore(d, $('fill').nextSibling); }
  }
  let lastShot = -1, lastLine = -1;
  function markLists() {
    const si = sceneIndex(T); const L = META.captions.long; let li = 0; for (let k = 0; k < L.length; k++) if (L[k].t0 <= T + 1e-6) li = k;
    if ((si !== lastShot && $('xWhat').value === 'section') || (li !== lastLine && $('xWhat').value === 'sentence')) setTimeout(updateSummary);   // the export follows the playhead
    if (si !== lastShot) FRAME.sync();
    if (si !== lastShot) { const rows = $('shots').children; rows[lastShot]?.classList.remove('on'); rows[si]?.classList.add('on'); if (!$('shots').hidden) rows[si]?.scrollIntoView({ block: 'nearest' }); lastShot = si; }
    if (li !== lastLine) { const rows = $('lines').children; rows[lastLine]?.classList.remove('on'); rows[li]?.classList.add('on'); if (!$('lines').hidden) rows[li]?.scrollIntoView({ block: 'nearest' }); lastLine = li; }
  }
  function markEdits() {
    [...$('shots').children].forEach((r, i) => r.classList.toggle('ed', shotEdited(META.SCENES[i].id)));
    const k = editCount(EDITS);
    $('editcount').textContent = k ? `${k} edit${k > 1 ? 's' : ''}` : 'No edits yet';
    buildTicks();
  }
  $('tabShots').onclick = () => { $('shots').hidden = false; $('lines').hidden = true; $('tabShots').setAttribute('aria-selected', 'true'); $('tabLines').setAttribute('aria-selected', 'false'); };
  $('tabLines').onclick = () => { $('shots').hidden = true; $('lines').hidden = false; $('tabShots').setAttribute('aria-selected', 'false'); $('tabLines').setAttribute('aria-selected', 'true'); };

  /* ---------- editing (shared edit layer) + saving ---------- */
  const hist = Shell.history({ get: () => EDITS, set: (e) => { EDITS = norm(e); afterEdit(); } });
  const frameSig = (e) => JSON.stringify([e.frame9 || null, e.frame9seg || null]); let FRAME0 = null;
  function afterEdit() { if (FRAME0 == null) FRAME0 = frameSig(JSON.parse(LOADED)); if (IS_SHORT && frameSig(EDITS) !== FRAME0) { persist(); setTimeout(() => location.reload(), 900); return; }   // undo / redo / a version changed the framing: the cameras are rebuilt on reload
    if (PAUSE0 == null) PAUSE0 = pauseSig(JSON.parse(LOADED)); if (pauseSig(EDITS) !== PAUSE0) { persist(); setTimeout(() => location.reload(), 900); return; }   // undo / redo / a version changed a pause: the timeline is rebuilt on reload
    setEdits(EDITS); if (FOOT.th && TH.recam) TH.recam(); hist.sync(); markEdits(); draw(); persist(); CE.refresh(); LV.sync(); MIX.apply(); updateSummary(); CAPS.sync(); }
  // her volume sliders (next to Voice / Music / Sound effects): saved in the moment's edits "mix", undo + versions like any edit
  const LV = Shell.levels({
    get: () => EDITS.mix, snapshot: () => hist.snapshot(),
    change: (L) => { if (Shell.mixMoved(L)) EDITS.mix = L; else delete EDITS.mix; MIX.apply(); updateSummary(); persist(); },
  });
  const CE = CanvasEdit({
    stage, overlay, edits: () => EDITS, snapshot: () => hist.snapshot(), render: () => renderMoment(T),
    changed: (msg) => { afterEdit(); status(msg); }, playing: () => playing, pause: () => pause(),
    closed: () => { if (editing && !playing) CE.build(); },
    // "Change picture…" on the ending's thumbnail / round photo (outroCard): upload into the project's photos, then use it here
    swapPicture: (e) => { const inp = document.createElement('input'); inp.type = 'file'; inp.accept = 'image/png,image/jpeg,image/heic,image/webp';
      inp.onchange = async () => { const f = inp.files && inp.files[0]; if (!f) return; status('Adding your picture…');
        try { const r = await fetch(`/api/${SLUG}/uploads?name=${encodeURIComponent(f.name.replace(/\.[^.]+$/, ''))}`, { method: 'POST', body: f }); const j = await r.json(); if (!r.ok) throw new Error(j.error || 'upload failed');
          const rel = '../' + j.file; await loadImg('oc:' + rel, FOOT.base + rel); hist.snapshot(); CE.setOv(e.id, { s: rel }); afterEdit(); status(`Picture changed (saved in projects/${SLUG}/${j.file}). Reset all on it brings the original back.`); }
        catch (err) { status('That picture could not be added: ' + err.message, true); } };
      inp.click(); },
    caption: {   // the caption chunk on screen: 9:16 chunks in "capShort", her 16:9 chunks in "cap16"
      text: (e) => { const d = capDict(e); return d[e.cue] != null ? d[e.cue] : e.def; }, edited: (e) => capDict(e)[e.cue] != null,
      set: (e, v) => { const d = capDict(e); if (v == null || !v.trim() || v === e.def) delete d[e.cue]; else d[e.cue] = e.cap16 ? v.replace(/[ \t]+/g, ' ').replace(/ *\n */g, '\n').trim() : v.replace(/\s+/g, ' ').trim(); },   // 16:9: Shift+Enter keeps her own line break
    },
  });
  let saveT = 0;
  function persist() {
    clearTimeout(saveT); saveState('Saving…'); $('save').classList.remove('ok');
    saveT = setTimeout(async () => {
      try {
        if (!sessionVersioned && LOADED !== JSON.stringify(EDITS)) { sessionVersioned = true; const prev = norm(JSON.parse(LOADED)); if (editCount(prev)) await V.add('Before this session’s edits', prev, true); }
        await put(API + '/edits', EDITS);
        saveState('Saved ✓ ' + new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })); $('save').classList.add('ok');
        const f = $('flash'); f.textContent = 'Saved ✓'; clearTimeout(f._t); f._t = setTimeout(() => { f.textContent = ''; }, 4000);
      } catch (e) { saveState('Not saved: is the studio running?', true); }
    }, 400);
  }
  const V = Shell.versions({ api: () => API + '/versions', payload: 'edits', unit: 'edit', get: () => EDITS, apply: (e) => { hist.snapshot(); EDITS = norm(e); afterEdit(); } });
  $('clearAll').onclick = () => confirmClick($('clearAll'), 'Click again to clear every edit', async () => {
    await V.add('Before clearing all edits', EDITS, true); hist.snapshot(); EDITS = { t: {}, captions: {}, capShort: {}, cap16: {}, ...(EDITS.mix ? { mix: EDITS.mix } : {}) }; afterEdit(); status('All text, caption and position edits cleared (the sound levels stay). The old state is saved as a version.');
  });

  /* ---------- preview footage (proxy) ---------- */
  const fnv = (s) => { let h = 2166136261 >>> 0; for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i) & 0xff; h = Math.imul(h, 16777619) >>> 0; } return h.toString(16).padStart(8, '0'); };
  // sound (cues, music, cut) and picture (cut, tail, matte ranges): the same keys composite.mjs writes into the proxy's info
  const proxyKey = () => fnv(JSON.stringify({ c: META.clips, q: META.CUES.map(c => [c.name, +c.t.toFixed(3), c.db ?? null, c.n ?? null, c.d ?? null]), m: FOOT.m.music || null, tail: META.tail }));
  const videoSig = () => fnv(JSON.stringify([META.clips, META.tail, META.matte || []]));
  let proxyQueued = false;
  async function checkProxy() {
    let p = { ready: false }; try { p = await json(API + '/proxy'); } catch { }
    let jobs = []; try { jobs = (await json('/api/jobs')).filter(j => j.slug === SLUG && j.spec.kind === 'proxy' && j.spec.id === ID && (j.state === 'queued' || j.state === 'running')); } catch { }
    const chunked = Array.isArray(p.chunks);
    const stale = p.ready && (chunked ? (p.akey !== proxyKey() || p.vsig !== videoSig()) : p.key !== proxyKey());
    if (p.ready) {
      const base = `/p/${SLUG}/talking-head/build/proxy/${ID}/`, v = '?v=' + (p.akey || p.created);
      const sig = JSON.stringify(chunked ? p.chunks.map(c => [c.url, c.ready]) : p.url);
      if (!PROXY || PROXY.sig !== sig) {
        const first = !PROXY; const aSig = PROXY && PROXY.aSig;
        PROXY = { ...p, stems: true, sig, aSig: v, chunks: chunked ? p.chunks : [{ t0: 0, t1: TOTAL + 1, url: p.url, ready: true }] };
        if (first || aSig !== v) { A.voice.src = base + 'voice.m4a' + v; A.music.src = base + 'music.m4a' + v; A.sfx.src = base + 'sfx.m4a' + v; audioMute(); }   // the preview tracks are at 0 dB: the levels are applied live
        for (const vv of VIDS) { delete vv.dataset.ci; delete vv.dataset.key; }
      }
    }
    if (p.ready && !p.complete && (jobs.length || proxyQueued)) setTimeout(checkProxy, 4000);   // chunks still coming: pick them up
    if ((!p.ready || stale) && !jobs.length && !proxyQueued) { proxyQueued = true; await JOBS.start({ kind: 'proxy', id: ID }); jobs = [1]; }
    $('nofoot').hidden = !!p.ready; $('nofoot').textContent = 'Preparing her footage for the preview (about half a minute)… The graphics already work: you can edit while you wait.';
    if (!p.ready && !jobs.length && proxyQueued) { $('nofoot').textContent = 'The preview footage could not be prepared (see the export list on the right). The graphics still work; exports are not affected.'; }
    $('proxyState').innerHTML = jobs.length ? '<span class="warn">Preparing the preview footage…</span> (her video, cut and framed as in the export, plus the sound.)'
      : stale ? '<span class="warn">The preview’s sound is older than the moment</span> (sound cues or the cut changed). Open Advanced and rebuild it.'
      : p.ready ? 'Her video, cut and framed exactly as the export frames it, with the export’s sound. The preview is lighter than the export (720p source): the export uses the full 4K.' : 'Not ready.';
    draw();
  }
  $('proxyGo').onclick = async () => { await JOBS.start({ kind: 'proxy', id: ID }); status('Rebuilding the preview footage (about half a minute).'); checkProxy(); };

  /* ---------- captions: her size slider + height, and the faint box measured behind the 16:9 ones ---------- */
  const capDict = (e) => (e && e.cap16 ? (EDITS.cap16 = EDITS.cap16 || {}) : EDITS.capShort);
  const CAPS = (() => {
    let lastSnap = 0, bgState = 'none', bgQueued = false;
    const info = () => capSliderInfo();
    function sync() {
      if (!META) return; const I = info(); const on = show.captions;
      $('cSize').min = I.min; $('cSize').max = I.max; $('cY').min = I.ymin; $('cY').max = I.ymax;
      $('cSize').value = I.size; $('cY').value = I.y; $('cSizeV').textContent = I.size + ' px'; $('cYV').textContent = I.y === I.def.y ? 'as designed' : (I.y < I.def.y ? '↑ ' : '↓ ') + Math.abs(I.y - I.def.y) + ' px';
      $('cSizeV').classList.toggle('moved', I.size !== I.def.size); $('cReset').disabled = !EDITS[I.key];
      const what = ASPECT === '9x16' ? (capStyleName() === 'shorts' ? 'Your shorts captions (Helvetica Neue on a 40 % black box).' : 'The 9:16 captions.') : 'Your 16:9 captions: Helvetica Neue Light, pale cream, letters a little closer, lower third. A faint black box appears only behind lines where the picture is too light to read them (measured per caption).';
      const bg = ASPECT !== '16x9' ? '' : bgState === 'busy' ? ' <span class="warn">Measuring the picture behind the captions…</span>' : bgState === 'failed' ? ' <span class="warn">The picture behind the captions could not be measured: no boxes for now (exports measure it again).</span>' : '';
      $('cNote').innerHTML = `${what} Size ${I.size} px (designed ${I.def.size} px). Click a caption in ✎ Edit to correct its words.${on ? '' : ' <b>Captions are off in the preview</b> (the Captions button at the top).'}${bg}`;
    }
    function set(k, v) {
      const I = info(); const cur = { size: I.size, y: I.y }; if (cur[k] === v) return;
      if (Date.now() - lastSnap > 800) hist.snapshot(); lastSnap = Date.now();
      cur[k] = v; const o = {}; if (cur.size !== I.def.size) o.size = cur.size; if (cur.y !== I.def.y) o.y = cur.y;
      if (Object.keys(o).length) EDITS[I.key] = o; else delete EDITS[I.key];
      afterEdit(); if (!show.captions) status('Captions are off in the preview: switch them on (top) to see the change.');
    }
    $('cSize').addEventListener('input', () => set('size', Math.round(+$('cSize').value)));
    $('cY').addEventListener('input', () => set('y', Math.round(+$('cY').value)));
    $('cSize').addEventListener('dblclick', () => set('size', info().def.size)); $('cY').addEventListener('dblclick', () => set('y', info().def.y));
    $('cReset').onclick = () => { const I = info(); if (!EDITS[I.key]) return; hist.snapshot(); delete EDITS[I.key]; afterEdit(); status('Captions back to their designed size and height.'); };
    // the footage behind the 16:9 captions: build/captions/<id>_16x9.json (composite.mjs capbg; the export makes it too)
    async function loadBg(start = true) {
      if (ASPECT !== '16x9' || !(FOOT.caps16 || []).length) return;
      try { const r = await fetch(`/p/${SLUG}/talking-head/build/captions/${ID}_16x9.json?v=${Date.now()}`, { cache: 'no-store' }); if (r.ok) setCapBg(await r.json()); } catch { }
      const need = capBgNeed(); const have = FOOT.capBg ? FOOT.capBg.s : {}; const missing = need.samples.filter(x => !have[x.key]).length;
      if (missing && start && !bgQueued) { bgQueued = true; bgState = 'busy'; await JOBS.start({ kind: 'captions', id: ID }); }
      else if (!missing) bgState = 'ready';
      sync(); draw();
    }
    return { sync, loadBg, done: (j) => { bgState = j.state === 'done' ? 'ready' : 'failed'; if (j.state === 'done') loadBg(false); else sync(); } };
  })();

  /* ---------- export (as in the film editor: whole video, custom in / out, this frame as a PNG) ---------- */
  // the export's file name (composite.mjs outName): moments and shorts are numbered apart; a full edit is talkinghead-<slug>
  const momentName = () => { const m = FOOT.m, k = m.kind || 'moment'; if (k === 'full') return `talkinghead-${m.slug}`; if (k === 'teaser') return `teaser-${m.slug}`;
    const n = FOOT.man.moments.filter(x => (x.kind || 'moment') === k).findIndex(x => x.id === ID) + 1; return `${k === 'short' ? 'short' : 'moment'}${String(n).padStart(2, '0')}-${m.slug}`; };
  const outFolder = () => (FOOT.m.outDir ? `projects/${SLUG}/talking-head/${FOOT.m.outDir}/` : FOOT.m.kind === 'short' ? `projects/${SLUG}/outputs/shorts/` : FOOT.m.kind === 'teaser' ? `projects/${SLUG}/outputs/teaser/` : `projects/${SLUG}/outputs/talking-head/`);
  const parseT = (s) => { s = String(s || '').trim(); if (!s) return NaN; const p = s.split(':').map(Number); return p.length === 2 ? p[0] * 60 + p[1] : p.length === 3 ? p[0] * 3600 + p[1] * 60 + p[2] : +s; };
  const mmss = (t) => { const m = Math.floor(t / 60), x = Math.floor(t % 60); return `${String(m).padStart(2, '0')}m${String(x).padStart(2, '0')}s`; };
  const sizeName = (a) => (a === 'both' ? '9:16 + 16:9' : a === 'all' ? '16:9 + 1:1 + 4:5 + 9:16' : a.replace('x', ':'));
  // "This section": the layout segment under the playhead (the moment script's TH.* segments = META.SCENES, start -> end)
  const LAYOUT_WORD = { L1: 'talk', L2: 'behind', L3: 'shout', L4: 'stack', L5: 'half', L6: 'sticker', L7: 'pops', L8: 'keyword', L9: 'cutaway', L10: 'card', L11: 'corner' };
  function sectionAt(t) {
    const s = META.SCENES[sceneIndex(t)]; const L = (s.layout || '').match(/^L\d+/);
    const word = L && LAYOUT_WORD[L[0]] ? LAYOUT_WORD[L[0]] : s.card ? 'card' : 'shot';
    const end = Math.min(TOTAL, s.end > s.start ? s.end : TOTAL);
    return { n: s.n, start: Math.max(0, s.start), end, name: s.layout || (s.card ? 'full-frame card' : 'over her footage'), label: `section${String(s.n).padStart(2, '0')}-${word}` };
  }
  // "This sentence": the spoken caption line under the playhead (META.captions.long, start -> end on the moment timeline)
  function sentenceAt(t) {
    const L = META.captions.long; let i = 0; for (let k = 0; k < L.length; k++) if (L[k].t0 <= t + 1e-6) i = k;
    const c = L[i] || { t0: 0, t1: TOTAL, text: '' };
    return { t0: Math.max(0, c.t0), t1: Math.min(TOTAL, c.t1 > c.t0 ? c.t1 : c.t0 + 1), text: c.text || '', label: `line${String(i + 1).padStart(2, '0')}` };
  }
  function exportSpec() {
    const what = $('xWhat').value, aspect = $('xAspect').value;
    const spec = { kind: 'moment', id: ID, what, aspect, captions: $('xCap').checked, srt: $('xSrt').checked, voice: $('xVoice').checked, music: $('xMusic').checked, sfx: $('xSfx').checked, mix: Shell.mixOf(EDITS.mix) };
    const sp = +$('xSpeed').value; if (sp >= 0.5 && sp <= 2 && sp !== 1) spec.speed = sp;   // playback speed (composite.mjs --speed)
    let t0 = 0, t1 = TOTAL, desc = 'The whole video';
    if (what === 'range') { t0 = parseT($('xIn').value); t1 = parseT($('xOut').value); spec.t0 = t0; spec.t1 = t1; desc = 'Custom in / out'; }
    else if (what === 'section') { const s = sectionAt(T); t0 = s.start; t1 = s.end; spec.t0 = t0; spec.t1 = t1; spec.label = s.label; desc = `This section (${s.n} · ${s.name})`; }
    else if (what === 'sentence') { const c = sentenceAt(T); t0 = c.t0; t1 = c.t1; spec.t0 = t0; spec.t1 = t1; spec.label = c.label; desc = `This sentence (“${c.text.length > 48 ? c.text.slice(0, 46) + '…' : c.text}”)`; }
    else if (what === 'frame') { spec.t = T; t0 = t1 = T; desc = `This frame, at ${fmt(T, 2)}`; }
    return { spec, t0, t1, desc };
  }
  function updateSummary() {
    if (!META) return; const { spec, t0, t1, desc } = exportSpec(); const as = spec.aspect === 'both' ? ['9x16', '16x9'] : spec.aspect === 'all' ? ['16x9', '1x1', '4x5', '9x16'] : [spec.aspect];
    $('xRange').hidden = spec.what !== 'range';
    const bad = spec.what === 'range' && !(t1 > t0 && t0 >= 0 && t1 <= TOTAL + 0.05);
    const frame = spec.what === 'frame';
    for (const id of ['xVoice', 'xMusic', 'xSfx', 'xSpeed']) $(id).disabled = frame;
    const off = frame ? '' : [spec.voice ? '' : 'no voice', spec.music ? '' : 'no music', spec.sfx ? '' : 'no sound effects'].filter(Boolean).join(' · ');
    const L = Shell.mixOf(EDITS.mix);
    const lv = frame ? '' : [['voice', 'voice'], ['music', 'music'], ['sfx', 'sound effects']].filter(([k]) => L[k] && spec[k]).map(([k, n]) => ` · ${n} ${Shell.dbText(L[k])}`).join('');
    $('xHint').textContent = frame ? 'One still image (a PNG picture, no sound).' : 'A video file (MP4, with sound).';
    const sx = !frame && spec.speed ? `_${spec.speed}x` : '';
    const name = (a) => (frame ? `${momentName()}_${a}_frame-${mmss(T)}${String(Math.round(T * FOOT.fps) % FOOT.fps).padStart(2, '0')}f.png`
      : (spec.label ? `${momentName()}_${spec.label}_${a}${sx}.mp4` : spec.what === 'range' ? `${momentName()}_${a}_${mmss(t0)}-${mmss(t1)}${sx}.mp4` : `${momentName()}_${a}${sx}.mp4`) + (spec.srt ? ' + .srt' : ''));
    $('xSummary').textContent = bad ? 'Set an in and an out point (m:ss.ss), the in before the out.' :
      `${desc}${frame ? '' : `: ${fmt(t0, 2)} → ${fmt(t1, 2)} (${(t1 - t0).toFixed(1)} s${spec.speed ? `, plays in ${((t1 - t0) / spec.speed).toFixed(1)} s at ${spec.speed}×` : ''})`} · ${sizeName(spec.aspect)}${spec.captions ? ' · captions burned in' : ' · no captions'}${off ? ' · ' + off : ''}${lv}\n` + as.map(name).join('\n');
    $('xSummary').style.whiteSpace = 'pre-line'; $('xGo').disabled = bad;
    const sub = frame ? 'frames/' : spec.what !== 'whole' ? 'clips/' : '';
    $('xNote').textContent = `Her footage in 4K, cropped as in the preview. Saved to Downloads and to ${outFolder()}${sub}${spec.what === 'whole' ? ' (it replaces the file with the same name there)' : ' (nothing there is overwritten)'}. `
      + (frame ? 'A few seconds.' : spec.what === 'whole' && TOTAL > 120 ? `A long edit takes a few minutes (about ${Math.max(2, Math.round(TOTAL / 40))} min per frame size).` : 'About 15-60 s per frame size.');
    $('xLevels').innerHTML = frame ? 'A frame has no sound.' : `Volume: ${['voice', 'music', 'sfx'].map((k, i) => `${['voice', 'music', 'sound effects'][i]} <b>${Shell.dbText(L[k])}</b>`).join(' · ')} (the sliders at the top). The overall loudness stays the same for YouTube; these change the balance.`;
    $('sNote').textContent = `The whole video, ${fmt(TOTAL, 1)}: each part as a WAV file (48 kHz, 24-bit) at its level in the export, lined up with the video, so the three together sound like the video. Saved to Downloads and to ${outFolder()}audio/ (replaces the files with the same name).`;
  }
  for (const id of ['xWhat', 'xAspect', 'xCap', 'xSrt', 'xVoice', 'xMusic', 'xSfx', 'xIn', 'xOut']) $(id).addEventListener('input', updateSummary);
  if (+prefs.speed >= 0.5 && +prefs.speed <= 2 && [...$('xSpeed').options].some(o => o.value === String(prefs.speed))) $('xSpeed').value = String(prefs.speed);   // remembered per moment
  $('xSpeed').addEventListener('input', () => { prefs.speed = +$('xSpeed').value; savePrefs(); updateSummary(); if (playing) { t0 = T; clock0 = performance.now(); } applyRate(); });
  $('xSetIn').onclick = () => { $('xIn').value = fmt(T, 2); if (!$('xOut').value || parseT($('xOut').value) <= T) $('xOut').value = fmt(Math.min(TOTAL, T + 10), 2); updateSummary(); };
  $('xSetOut').onclick = () => { $('xOut').value = fmt(T, 2); updateSummary(); };
  const TRACK_NAME = { voice: 'voice', music: 'music', sfx: 'sound effects' };
  const WHAT_NAME = { whole: 'Whole video', range: 'In / out', section: 'Section', sentence: 'Sentence', frame: 'Frame' };
  const JOBS = Shell.jobs({
    slug: SLUG, filter: (s) => ['moment', 'moment-sound', 'proxy', 'captions'].includes(s.kind) && s.id === ID, download: () => false, linked: (s) => s.kind === 'moment' || s.kind === 'moment-sound',
    name: (s) => (s.kind === 'proxy' ? 'Preparing the preview footage' : s.kind === 'captions' ? 'Measuring behind the captions' : s.kind === 'moment-sound' ? `Sound only · ${s.tracks.length === 3 ? 'all three' : TRACK_NAME[s.tracks[0]]}`
      : `${WHAT_NAME[s.what || 'whole']} · ${sizeName(s.aspect)}${['range', 'section', 'sentence'].includes(s.what) ? ` · ${s.label ? s.label + ' · ' : ''}${fmt(s.t0, 1)}-${fmt(s.t1, 1)}` : s.what === 'frame' ? ` · ${fmt(s.t, 2)}` : ''}${s.captions === false ? ' · no captions' : ''}`),
    onDone: (j) => { if (j.spec.kind === 'proxy') { if (j.state === 'done') proxyQueued = false; checkProxy(); } if (j.spec.kind === 'captions') CAPS.done(j); },   // a failed build is not retried by itself
  });
  $('xAspect').value = IS_SHORT ? '9x16' : ASP0;
  $('xGo').onclick = async () => {
    const { spec, desc } = exportSpec(); if (spec.what === 'frame') spec.t = Math.round(T * FOOT.fps) / FOOT.fps;
    await JOBS.start(spec);
    status(`Exporting: ${desc.toLowerCase()} (${sizeName(spec.aspect)}). It lands in Downloads by itself when it is ready.`);
  };
  for (const id of ['sVoice', 'sMusic', 'sSfx', 'sAll']) $(id).onclick = async () => {
    const tracks = $(id).dataset.tracks.split(',');
    await JOBS.start({ kind: 'moment-sound', id: ID, tracks, mix: Shell.mixOf(EDITS.mix) });
    status(`Making the sound files (${tracks.map(t => TRACK_NAME[t]).join(' + ')}). They land in Downloads by themselves in a few seconds.`);
  };

  /* ---------- keyboard ---------- */
  document.addEventListener('keydown', (e) => {
    if (Shell.typing(e)) return; const mod = e.metaKey || e.ctrlKey;
    if (mod && e.key.toLowerCase() === 'z') { e.preventDefault(); e.shiftKey ? hist.redo() : hist.undo(); return; }
    if (mod && e.key.toLowerCase() === 'y') { e.preventDefault(); hist.redo(); return; }
    if (mod) return;
    if (e.code === 'Space') { e.preventDefault(); playing ? pause() : play(); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); seek(T - (e.shiftKey ? 1 : 1 / FOOT.fps)); }
    else if (e.key === 'ArrowRight') { e.preventDefault(); seek(T + (e.shiftKey ? 1 : 1 / FOOT.fps)); }
    else if (e.key.toLowerCase() === 'e') toggleEdit();
    else if (e.key.toLowerCase() === 'c') $('tCap').click();
    else if (e.key === 'Escape') CE.close();
  });

  // test hook (headless checks)
  window.MOMENT = { caps: () => CAPS, exportSpec: () => exportSpec().spec, get T() { return T; }, get playing() { return playing; }, seek, play, pause, edits: () => EDITS, toggleEdit, elements: () => EL.list.slice(), openPop: (id) => CE.open(id), proxy: () => PROXY, videoTime: () => vid.currentTime, undo: () => hist.undo(), redo: () => hist.redo(), mixer: () => ({ state: MIX.state(), gains: MIX.gains(), muted: Object.fromEntries(Object.entries(A).map(([k, a]) => [k, a.muted])) }) };
  boot();
})();
