/* Studio editor shell: the parts every editor shares (status line, save state, undo/redo, versions panel, export
 * queue panel, check warnings). Used by the design editor (design.js) and the moment editor (moment.js); the film
 * editor (editor.js) has the same panels and look written inline. Markup ids: #status #save #undo #redo #vName #vSave
 * #vlist #jobs (see design.html / moment.html). */
'use strict';
window.Shell = (() => {
  const $ = (id) => document.getElementById(id);
  const fmt = (t, d = 0) => { t = Math.max(0, t); const m = Math.floor(t / 60), s = t - m * 60; return m + ':' + (d ? s.toFixed(d).padStart(3 + d, '0') : String(Math.floor(s)).padStart(2, '0')); };
  const status = (m, bad) => { const s = $('status'); if (!s) return; s.textContent = m; s.classList.toggle('warn', !!bad); };
  const saveState = (m, bad) => { const s = $('save'); if (!s) return; s.textContent = m; s.classList.toggle('bad', !!bad); };
  const savedNow = () => saveState('Saved ' + new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }));
  const json = async (url, o) => { const r = await fetch(url, { cache: 'no-store', ...o }); if (!r.ok) { let m = r.status; try { m = (await r.json()).error || m; } catch { } throw new Error(m); } return r.json(); };
  const put = (url, body) => json(url, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  const post = (url, body) => json(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  function confirmClick(btn, label, fn) {
    if (btn.dataset.arm !== '1') { const old = btn.textContent; btn.dataset.arm = '1'; btn.textContent = label; setTimeout(() => { btn.dataset.arm = ''; btn.textContent = old; }, 3500); return; }
    btn.dataset.arm = ''; fn();
  }
  const typing = (e) => { const t = e.target; return t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT' || t.isContentEditable); };

  /** undo/redo of a JSON-able state: get() -> state, set(state) applies it. One stack per key (an item). */
  function history({ get, set }) {
    const stacks = new Map(); let key = '';
    const st = () => { if (!stacks.has(key)) stacks.set(key, { u: [], r: [] }); return stacks.get(key); };
    const sync = () => { $('undo').disabled = !st().u.length; $('redo').disabled = !st().r.length; };
    const h = {
      setKey(k) { key = k; sync(); },
      snapshot() { const s = st(); s.u.push(JSON.stringify(get())); if (s.u.length > 200) s.u.shift(); s.r = []; sync(); },
      async undo() { const s = st(); if (!s.u.length) return status('Nothing to undo.'); s.r.push(JSON.stringify(get())); await set(JSON.parse(s.u.pop())); sync(); status('Undone.'); },
      async redo() { const s = st(); if (!s.r.length) return status('Nothing to redo.'); s.u.push(JSON.stringify(get())); await set(JSON.parse(s.r.pop())); sync(); status('Redone.'); },
      sync,
    };
    $('undo').onclick = () => h.undo(); $('redo').onclick = () => h.redo();
    return h;
  }

  /** versions panel. api() -> '/api/.../versions'; payload 'edits'|'content'; get() current data; apply(data) restores it. */
  function versions({ api, payload, get, apply, unit }) {
    async function add(label, data, auto) {
      try { await post(api(), { label, [payload]: data, auto: !!auto }); } catch (e) { status('Could not save the version: ' + e.message, true); }
      refresh();
    }
    async function refresh() {
      let list = []; try { list = await json(api()); } catch { }
      const box = $('vlist'); box.innerHTML = list.length ? '' : '<p>No versions yet.</p>';
      for (const v of list) {
        const row = document.createElement('div'); row.className = 'vrow';
        const d = new Date(v.savedAt); const when = d.toLocaleDateString([], { month: 'short', day: 'numeric' }) + ' ' + d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' });
        row.innerHTML = '<span><b></b><span class="k"></span></span>'; row.querySelector('b').textContent = v.label || 'Saved version';
        row.querySelector('.k').textContent = when + (v.count != null && unit ? ` · ${v.count} ${unit}${v.count === 1 ? '' : 's'}` : '') + (v.auto ? ' · auto' : '');
        const b = document.createElement('button'); b.type = 'button'; b.textContent = 'Restore';
        b.onclick = () => confirmClick(b, 'Click to confirm', async () => {
          const full = await json(`${api()}/${v.id}`);
          await add(`Before restoring “${v.label || 'saved version'}”`, get(), true);
          await apply(full[payload] || {});
          status(`Restored “${v.label || 'saved version'}”. What you had is saved as a version too.`);
        });
        row.appendChild(b); box.appendChild(row);
      }
    }
    $('vSave').onclick = async () => { const n = $('vName').value.trim() || 'Saved version'; await add(n, get(), false); $('vName').value = ''; status(`Version “${n}” saved.`); };
    return { add, refresh };
  }

  /* check warnings (carousel build.mjs) in her words */
  function friendly(w) {
    const m = /^slide (\d+): (.*)$/.exec(w); const slide = m ? +m[1] : null; const s = m ? m[2] : w; let msg = s;
    let x;
    if ((x = /^mono ([\d.]+)px (.*)$/.exec(s))) msg = `Label below 32 px (${Math.round(+x[1])} px): ${quote(x[2])}`;
    else if ((x = /^one-word last line "(.*)" in (.*)$/.exec(s))) msg = `Single word on the last line: “${x[1]}”`;
    else if ((x = /^(.*) runs into the footer$/.exec(s))) msg = `Text runs into the page number: ${quote(x[1])}`;
    else if ((x = /^(.*) outside the margins$/.exec(s))) msg = `Text outside the margins: ${quote(x[1])}`;
    else if ((x = /^polaroid within 24 px of (.*)$/.exec(s))) msg = `Photo too close to text: ${quote(x[1])}`;
    else if ((x = /^polaroid caption clipped (.*)$/.exec(s))) msg = `Photo caption cut off: ${quote(x[1])}`;
    return { slide, msg, raw: w };
  }
  const quote = (tag) => { const q = /"(.*)"$/.exec(tag); return q ? `“${q[1].trim()}…”` : tag; };
  function warnList(box, warns, cur) {
    box.innerHTML = '';
    if (!warns.length) { box.innerHTML = '<p>No problems found.</p>'; return; }
    for (const w of warns.map(friendly)) {
      const d = document.createElement('div'); d.className = 'wrow' + (cur && w.slide === cur ? ' cur' : ''); d.title = w.raw;
      d.innerHTML = '<span class="k"></span><span></span>'; d.firstChild.textContent = w.slide ? 'Slide ' + w.slide : ''; d.lastChild.textContent = w.msg;
      box.appendChild(d);
    }
  }

  /** export queue panel: start(spec) queues a job; the list shows this editor's jobs (filter) with their files and
   *  warnings. A job started from this tab downloads its files when it finishes (download(spec) says if it should),
   *  so exports land in Downloads as well as outputs/; "Show in Finder" reveals the Downloads copy (else outputs/).
   *  linked(spec): the server already put the files in Downloads (hard links, moment exports): listed, not downloaded again.
   *  A failed job shows its reason in plain words (j.error) with the technical log folded under "Details". */
  function jobs({ slug, filter, name, onDone, download = () => true, linked = () => false }) {
    let pollT = 0; const seen = new Set(); const mine = new Set(); let first = true;
    async function poll() {
      clearTimeout(pollT); let list = [];
      try { list = (await json('/api/jobs')).filter(j => j.slug === slug && filter(j.spec)); } catch { }
      render(list.slice(0, 6));
      for (const j of list) if ((j.state === 'done' || j.state === 'failed') && !seen.has(j.id)) {
        seen.add(j.id); if (first) continue;
        if (j.state === 'done' && mine.has(j.id) && linked(j.spec)) status(`Exported: ${j.files.filter(f => !/\.srt$/.test(f)).map(f => f.split('/').pop()).join(', ')}. Saved to Downloads and to ${j.files[0] ? j.files[0].split('/').slice(0, -1).join('/') + '/' : 'outputs/'}`);
        else if (j.state === 'done' && mine.has(j.id) && download(j.spec)) fetchFiles(j);
        if (j.state === 'failed' && mine.has(j.id)) status(j.error || 'It stopped with an error (see Details in the list).', true);
        if (onDone) onDone(j);
      }
      first = false;
      if (list.some(j => j.state === 'queued' || j.state === 'running')) pollT = setTimeout(poll, 700);
      return list;
    }
    const href = (f, j) => '/p/' + f.split('/').slice(1).join('/') + '?v=' + (j.finished || '');
    function fetchFiles(j) {
      j.files.forEach((f, i) => setTimeout(() => { const a = document.createElement('a'); a.href = href(f, j); a.download = f.split('/').pop(); document.body.appendChild(a); a.click(); a.remove(); }, i * 350));
      status(`Exported: ${j.files.map(f => f.split('/').pop()).join(', ')}. Saved to Downloads and to ${j.files[0] ? j.files[0].split('/').slice(0, -1).join('/') + '/' : 'outputs/'}`);
    }
    function render(list) {
      const box = $('jobs'); box.innerHTML = '';
      for (const j of list) {
        const d = document.createElement('div'); d.className = 'job ' + j.state;
        d.innerHTML = `<div class="st"><span></span><span></span></div><div class="bar"><i></i></div>`;
        d.querySelector('.st span').textContent = name(j.spec); d.querySelector('.st span:last-child').textContent = j.state === 'running' ? `${j.stage} ${Math.round(j.progress * 100)}%` : j.state;
        d.querySelector('.bar i').style.width = Math.round((j.state === 'done' ? 1 : j.progress) * 100) + '%';
        for (const f of download(j.spec) || linked(j.spec) ? j.files : []) {   // internal files (preview footage) are not listed
          const r = document.createElement('div'); r.className = 'jf';
          const a = document.createElement('a'); a.href = href(f, j); a.target = '_blank'; a.textContent = f.split('/').pop();
          const b = document.createElement('button'); b.type = 'button'; b.textContent = 'Show in Finder';
          b.onclick = async () => { try { const x = await post('/api/reveal', { file: f }); status(x.downloads ? 'Shown in Finder (your Downloads copy).' : 'Shown in Finder (in outputs/).'); } catch (e) { status('Could not show it: ' + e.message, true); } };
          r.append(a, b); d.appendChild(r);
        }
        if (j.warnings && j.warnings.length) { const w = document.createElement('div'); w.className = 'wlist'; warnList(w, j.warnings); d.appendChild(w); }
        if (j.state === 'failed') {
          const e = document.createElement('div'); e.className = 'err'; e.textContent = j.error || 'It stopped with an error. Try again; if it fails again, ask Claude to look at the Details.'; d.appendChild(e);
          const det = document.createElement('details'); det.className = 'jdet'; det.innerHTML = '<summary>Details</summary><pre></pre>'; det.querySelector('pre').textContent = j.log.slice(-14).join('\n'); d.appendChild(det);
        }
        if (j.state === 'queued' || j.state === 'running') { const b = document.createElement('button'); b.type = 'button'; b.textContent = 'Cancel'; b.onclick = async () => { await fetch('/api/jobs/' + j.id, { method: 'DELETE' }); poll(); }; d.appendChild(b); }
        box.appendChild(d);
      }
    }
    async function start(spec) {
      try { const j = await post(`/api/${slug}/jobs`, spec); mine.add(j.id); } catch (e) { status('Could not start the job: ' + e.message, true); return; }
      poll();
    }
    return { poll, start };
  }

  /* ---------- sound levels (film + moment editors) ----------
   * Her volume sliders: voice / music / sound effects in whole dB (-24..+12, 0 = as mixed), saved in the edits as
   * "mix": {voice, music, sfx} (no key = all 0 dB), so Versions and Undo cover them and exports use them. */
  const MIX_KEYS = ['voice', 'music', 'sfx'], MIX_MIN = -24, MIX_MAX = 12;
  const mixOf = (m) => Object.fromEntries(MIX_KEYS.map(k => [k, Math.max(MIX_MIN, Math.min(MIX_MAX, Math.round(+((m || {})[k]) || 0)))]));
  const mixMoved = (m) => { const L = mixOf(m); return MIX_KEYS.some(k => L[k] !== 0); };
  const dbText = (v) => (v > 0 ? '+' : v < 0 ? '−' : '') + Math.abs(v) + ' dB';

  /** preview playback through Web Audio gains (an <audio>'s own volume cannot go above 1, so +dB needs a GainNode).
   *  els {voice, music, sfx}: the three <audio> elements; levels() -> mix; on(k) -> the on/off toggle. Off = gain 0 (the
   *  element keeps playing, so the voice track still works as the clock). The AudioContext is made on the first click or
   *  key press (browsers keep it silent until a gesture); until then the elements' own muted flags do on/off at 0 dB. */
  function mixer({ els, levels, on }) {
    let ctx = null; const g = {};
    function init() {
      if (ctx) { if (ctx.state === 'suspended') ctx.resume().catch(() => { }); return; }
      const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return;
      try {
        ctx = new AC();
        for (const k of MIX_KEYS) { g[k] = ctx.createGain(); ctx.createMediaElementSource(els[k]).connect(g[k]).connect(ctx.destination); }
      } catch (e) { console.warn('Sound levels: Web Audio is not available, the preview stays at 0 dB.', e); ctx = null; }
      apply();
    }
    function apply() {
      const L = mixOf(levels());
      for (const k of MIX_KEYS) {
        if (ctx && g[k]) { els[k].muted = false; const v = on(k) ? 10 ** (L[k] / 20) : 0; g[k].gain.cancelScheduledValues(0); g[k].gain.setValueAtTime(v, ctx.currentTime); }
        else els[k].muted = !on(k);
      }
    }
    for (const ev of ['pointerdown', 'keydown']) addEventListener(ev, init, true);
    return { apply, init, state: () => (ctx ? ctx.state : 'none'), gains: () => Object.fromEntries(MIX_KEYS.map(k => [k, g[k] ? g[k].gain.value : null])) };
  }

  /** the three sliders: #vVoice #vMusic #vSfx (input range) with #vVoiceV ... (the "−6 dB" text). get() -> current mix;
   *  change(mix) applies + saves it; snapshot() is the undo point (one per gesture: a drag, a key burst, a double-click). */
  function levels({ get, change, snapshot }) {
    const ids = { voice: 'vVoice', music: 'vMusic', sfx: 'vSfx' }; const names = { voice: 'Voice volume', music: 'Music volume', sfx: 'Sound effects volume' };
    let lastSnap = 0;
    function sync() {
      const L = mixOf(get());
      for (const k of MIX_KEYS) {
        const r = $(ids[k]); if (!r) continue; if (+r.value !== L[k]) r.value = L[k];
        const o = $(ids[k] + 'V'); if (o) { o.textContent = dbText(L[k]); o.classList.toggle('moved', L[k] !== 0); }
        r.title = `${names[k]}: ${dbText(L[k])}${L[k] ? ' (double-click: back to 0 dB)' : ' (as mixed)'}. The overall loudness stays the same for YouTube; this changes the balance.`;
      }
    }
    for (const k of MIX_KEYS) {
      const r = $(ids[k]); if (!r) continue;
      const set = (v) => {
        const L = mixOf(get()); if (L[k] === v) return sync();
        if (Date.now() - lastSnap > 800) snapshot(); lastSnap = Date.now();
        L[k] = v; change(L); sync();
      };
      r.addEventListener('input', () => set(Math.round(+r.value)));
      r.addEventListener('dblclick', () => set(0));
      const o = $(ids[k] + 'V'); if (o) { o.addEventListener('dblclick', () => set(0)); o.title = 'Double-click: back to 0 dB'; }
    }
    sync();
    return { sync };
  }

  return { $, fmt, status, saveState, savedNow, json, put, post, confirmClick, typing, history, versions, jobs, friendly, warnList, mixer, levels, mixOf, mixMoved, dbText };
})();
