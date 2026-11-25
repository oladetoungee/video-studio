/* Design editor: thumbnails (/design/<slug>/thumbnails/) and carousels (/design/<slug>/carousels/<deck>/).
 * The preview is the real design page (the same HTML the export renders) in an iframe at true size, scaled to fit.
 * Click text to rewrite it in place, drag anything to move it, resize with the corner handles or the size slider,
 * hide, change colours and photos. Every change saves into the design's content.json, then the page reloads behind
 * the scenes (two iframes, swapped when the new one is ready) so what you see is what the export draws.
 *   thumbnails  content.text[key] (HTML), images[key], vars (--ground --fg --accent --gridc --rule), nudge[name]
 *   carousels   slides[i].<path> (markup *accent* _serif_ \n), slides[i].ground, slides[i].nudge[name], accent
 * nudge: {dx, dy, s, hide}; name = data-move, else data-k, else "img:<data-img>" (see design/thumbnails/lib/bind.js
 * and design/carousels/shared/build.mjs). */
'use strict';
(() => {
  const { $, status, saveState, json, put, confirmClick, typing } = Shell;
  const parts = location.pathname.split('/').filter(Boolean);           // design/<slug>/thumbnails | design/<slug>/carousels/<deck>
  const SLUG = parts[1], GROUP = parts[2], DECK = parts[3] || null, CAR = GROUP === 'carousels';
  const P = `/p/${SLUG}`;
  const PAL = { ink: '#111114', paper: '#EDE9E2', card: '#FFFDF6', blue: '#1B3FD8', orange: '#FF4713', green: '#22E08A', white: '#F7F5F0' };
  const NAMES = { [PAL.ink]: 'Ink', [PAL.paper]: 'Paper', [PAL.card]: 'Card', [PAL.blue]: 'Blue', [PAL.orange]: 'Orange', [PAL.green]: 'Green' };
  const ON_INK = { [PAL.blue]: '#6E8CFF', [PAL.orange]: PAL.orange, [PAL.green]: PAL.green, [PAL.ink]: PAL.paper, [PAL.paper]: PAL.paper };
  const PREF_KEY = `studio:design:${SLUG}:${GROUP}:${DECK || ''}`;
  const prefs = (() => { try { return JSON.parse(localStorage.getItem(PREF_KEY) || '{}'); } catch { return {}; } })();
  const savePrefs = () => { try { localStorage.setItem(PREF_KEY, JSON.stringify(prefs)); } catch { } };
  const sleep = (ms) => new Promise(r => setTimeout(r, ms));
  const pad2 = (n) => String(n).padStart(2, '0');

  let W = CAR ? 1080 : 1280, H = CAR ? 1350 : 720, K = 1;
  let ITEMS = [], CUR = null, CONTENT = null, LOADED = '{}', SAVED = '{}', ASSETS = [];
  let editing = true, SEL = null, HOV = null, DRAG = null, TYPING = null, RELOAD_N = 0, busy = Promise.resolve();
  let front = $('fa'), back = $('fb');
  const versioned = new Set();
  const stage = $('stage'), ov = $('overlay');

  /* ---------- paths ---------- */
  const itemKey = () => (CAR ? DECK : CUR);
  const api = () => (CAR ? `/api/${SLUG}/design/carousels/${DECK}` : `/api/${SLUG}/design/thumbnails/${CUR}`);
  const pageURL = (id, r) => (CAR ? `${P}/design/carousels/${DECK}/index.html?view=slide&n=${id}&r=${r}` : `${P}/design/thumbnails/directions/${id}/index.html?r=${r}`);
  const splitPath = (k) => k.split('.').map(x => (/^\d+$/.test(x) ? +x : x));
  const getPath = (o, p) => p.reduce((a, k) => (a == null ? a : a[k]), o);
  function setPath(o, p, v) { let a = o; for (let i = 0; i < p.length - 1; i++) { if (a[p[i]] == null) a[p[i]] = typeof p[i + 1] === 'number' ? [] : {}; a = a[p[i]]; } a[p[p.length - 1]] = v; }
  const slideObj = (c = CONTENT) => c.slides[CUR - 1];
  const textPath = (key) => (CAR ? ['slides', CUR - 1, ...splitPath(key)] : key.includes('.') ? splitPath(key) : ['text', key]);
  const imgPath = (key) => (CAR ? ['slides', CUR - 1, ...splitPath(key)] : ['images', key]);
  function rel(fromDir, to) { const a = fromDir.split('/').filter(Boolean), b = to.split('/').filter(Boolean); let i = 0; while (i < a.length && i < b.length && a[i] === b[i]) i++; return [...a.slice(i).map(() => '..'), ...b.slice(i)].join('/'); }
  function norm(p) { const out = []; for (const s of p.split('/')) { if (s === '..') out.pop(); else if (s && s !== '.') out.push(s); } return out.join('/'); }
  const designDir = () => (CAR ? `design/carousels/${DECK}` : `design/thumbnails/directions/${CUR}`);
  const imgToProject = (v) => (!v ? '' : CAR && !v.includes('/') ? `design/carousels/shared/assets/${v}` : norm(designDir() + '/' + v));
  const projectToImg = (f) => (CAR && f.startsWith('design/carousels/shared/assets/') ? f.split('/').pop() : rel(designDir(), f));

  /* ---------- the page in the iframe ---------- */
  const doc = () => front.contentDocument;
  const root = () => { const d = doc(); return d && (CAR ? d.getElementById('s' + CUR) : d.querySelector('.t')); };
  const isText = (el) => !!(el && el.hasAttribute && el.hasAttribute('data-k'));
  const isMovable = (el) => !!(el && el.matches && (el.matches('[data-move],[data-k]') || (!CAR && el.matches('[data-img]'))));
  const nameOf = (el) => el.dataset.move || el.dataset.k || ('img:' + el.dataset.img);
  function chain(target) { const r = root(); const out = []; let el = target; while (el && r && el !== r && r.contains(el)) { if (isMovable(el)) out.push(el); el = el.parentElement; } return out; }
  const findByName = (name) => { const r = root(); if (!r) return null; const q = (a, v) => r.querySelector(`[${a}="${CSS.escape(v)}"]`); return name.startsWith('img:') ? q('data-img', name.slice(4)) : q('data-move', name) || q('data-k', name); };
  const label = (el) => { if (!el) return ''; const n = nameOf(el); if (n.startsWith('img:')) return 'photo'; const t = (el.textContent || '').replace(/\s+/g, ' ').trim(); return (el.dataset.move ? n.replace(/[.]/g, ' ') + ': ' : '') + (t ? '“' + t.slice(0, 36) + (t.length > 36 ? '…' : '') + '”' : n); };
  const photoIn = (el) => (!el ? null : el.matches('[data-img]') ? el : el.querySelector('[data-img]'));
  // going inward / outward: the first visible thing one level inside a block, and the block around a thing
  const shown = (el) => { const cs = el.ownerDocument.defaultView.getComputedStyle(el); const r = el.getBoundingClientRect(); return cs.display !== 'none' && cs.visibility !== 'hidden' && (r.width > 0 || r.height > 0); };
  const insideOf = (el) => (!el ? null : [...el.querySelectorAll(CAR ? '[data-move],[data-k]' : '[data-move],[data-k],[data-img]')].find(c => chain(c.parentElement)[0] === el && shown(c)) || null);
  const outsideOf = (el) => (!el || !el.parentElement ? null : chain(el.parentElement)[0] || null);

  function loadFrame(fr, url) {
    return new Promise((res) => {
      fr.onload = async () => {
        for (let i = 0; i < 400; i++) { try { const w = fr.contentWindow, d = fr.contentDocument; if (CAR ? d.body && d.body.dataset.ready : w.__ready) break; } catch { } await sleep(25); }
        res();
      };
      fr.src = url;
    });
  }
  function fit() {
    const wrap = $('stagewrap'); const mw = wrap.clientWidth, mh = Math.max(240, wrap.clientHeight);
    K = Math.min(mw / W, mh / H); stage.style.width = Math.floor(W * K) + 'px'; stage.style.height = Math.floor(H * K) + 'px';
    for (const f of [front, back]) { f.style.width = W + 'px'; f.style.height = H + 'px'; f.style.transform = `scale(${K})`; }
    drawOverlay();
  }
  addEventListener('resize', () => fit());
  new ResizeObserver(() => fit()).observe($('stagewrap'));

  async function reload(o = {}) {
    const n = ++RELOAD_N; const selName = SEL && SEL.isConnected ? nameOf(SEL) : o.select || null;
    await loadFrame(back, pageURL(CUR, n));
    if (n !== RELOAD_N) return;
    [front, back] = [back, front]; front.classList.remove('back'); back.classList.add('back'); back.onload = null;
    attach(); fit(); $('loading').hidden = true;
    SEL = selName ? findByName(selName) : null; HOV = null; drawOverlay(); if (SEL) showTbar(); else hideTbar(); updateSummary();
    buildPanes();
    if (o.strip !== false) reloadStrip(o.strip === 'all');
  }

  /* ---------- strip of directions / slides ---------- */
  const PV = CAR ? { h: 150 } : { w: 216 };
  function buildStrip() {
    const box = $('strip'); box.innerHTML = '';
    const pw = PV.w || Math.round(PV.h * W / H), ph = PV.h || Math.round(PV.w * H / W);
    for (const it of ITEMS) {
      const id = CAR ? it.n : it.id;
      const b = document.createElement('button'); b.type = 'button'; b.className = 'srow'; b.dataset.id = id;
      b.innerHTML = '<span class="ts"></span><span><span class="pv"><iframe tabindex="-1" aria-hidden="true"></iframe></span><span class="nm"></span><span class="wn"></span></span>';
      b.querySelector('.ts').textContent = CAR ? pad2(id) : id.slice(0, 2);
      b.querySelector('.nm').textContent = CAR ? `${it.layout} · ${groundName(it)}` : (it.direction || id) + (it.variant ? ' · ' + id.replace(/^.*-(v\d+)$/, '$1') : '');
      const pv = b.querySelector('.pv'); pv.style.width = pw + 'px'; pv.style.height = ph + 'px';
      const fr = b.querySelector('iframe'); fr.style.width = W + 'px'; fr.style.height = H + 'px'; fr.style.transform = `scale(${pw / W})`;
      fr.src = pageURL(id, 's0');
      if (CAR) fr.onload = () => stripChecks(fr, id);
      b.onclick = () => go(id);
      box.appendChild(b);
    }
    markStrip();
  }
  function markStrip() { for (const b of $('strip').children) { const on = String(b.dataset.id) === String(CUR); b.classList.toggle('on', on); if (on) b.scrollIntoView({ block: 'nearest' }); } }
  function reloadStrip(all) {
    for (const b of $('strip').children) if (all || String(b.dataset.id) === String(CUR)) { const fr = b.querySelector('iframe'); fr.src = pageURL(b.dataset.id, 's' + Date.now()); }
  }
  const CHECKS = new Map();
  async function stripChecks(fr, id) {
    for (let i = 0; i < 200; i++) { try { if (fr.contentDocument.body.dataset.ready) break; } catch { } await sleep(30); }
    let list = []; try { list = (fr.contentWindow.__checks ? fr.contentWindow.__checks(32) : []).filter(x => x.startsWith(`slide ${id}:`)); } catch { }
    CHECKS.set(+id, list);
    const row = [...$('strip').children].find(b => +b.dataset.id === +id); if (row) row.querySelector('.wn').textContent = list.length ? `${list.length} check${list.length > 1 ? 's' : ''} to look at` : '';
    renderChecks();
  }
  function renderChecks() {
    if (!CAR) return; const all = []; for (const [, l] of [...CHECKS.entries()].sort((a, b) => a[0] - b[0])) all.push(...l);
    Shell.warnList($('checks'), all, CUR);
  }

  /* ---------- open an item ---------- */
  async function go(id) {
    if (TYPING) await commitText();
    if (String(id) === String(CUR)) return;
    CUR = CAR ? +id : id; SEL = null; hideTbar();
    if (CAR) prefs.s = CUR; else prefs.d = CUR; savePrefs();
    history.replaceState(null, '', location.pathname + (CAR ? `?s=${CUR}` : `?d=${encodeURIComponent(CUR)}`));
    if (!CAR) { CONTENT = await json(api() + '/content'); LOADED = SAVED = JSON.stringify(CONTENT); hist.setKey(itemKey()); V.refresh(); }
    header(); markStrip(); stripButtons(); exportOptions();
    $('loading').hidden = false; await reload({ strip: false });
  }
  function header() {
    if (CAR) {
      const nm = DECK === 'linkedin' ? 'LinkedIn carousel' : DECK === 'instagram' ? 'Instagram carousel' : DECK + ' carousel';
      $('title').textContent = nm; document.title = nm + ' · Studio';
      $('sub').textContent = `Slide ${CUR} of ${CONTENT.slides.length} · ${W}×${H}`; $('navWord').textContent = 'slide';
    } else {
      const it = ITEMS.find(x => x.id === CUR) || {};
      $('title').textContent = 'Thumbnails'; document.title = 'Thumbnails · Studio';
      $('sub').textContent = `${CUR}${CONTENT && CONTENT.title ? ' · title: ' + CONTENT.title : it.title ? ' · title: ' + it.title : ''}`; $('navWord').textContent = 'direction';
    }
  }
  function stripButtons() {
    const box = $('stripBtns'); box.innerHTML = '';
    const lab = document.createElement('span'); lab.className = 'sublbl'; lab.textContent = CAR ? `${ITEMS.length} slides` : `${ITEMS.length} directions`; lab.style.alignSelf = 'center'; box.appendChild(lab);
    if (CAR) return;
    const sp = document.createElement('span'); sp.className = 'grow'; box.appendChild(sp);
    const dup = document.createElement('button'); dup.type = 'button'; dup.textContent = 'Duplicate'; dup.title = 'Copy this direction to try a variant (the original stays as it is)';
    dup.onclick = async () => {
      if (TYPING) await commitText();
      try { const r = await Shell.post(`/api/${SLUG}/design/thumbnails/${CUR}/duplicate`, {}); await loadItems(); buildStrip(); await go(r.id); status(`Made ${r.id}: a copy to try things on. The original is unchanged.`); }
      catch (e) { status('Could not duplicate: ' + e.message, true); }
    };
    box.appendChild(dup);
    if (/-v\d+$/.test(CUR)) {
      const rm = document.createElement('button'); rm.type = 'button'; rm.textContent = 'Remove variant';
      rm.onclick = () => confirmClick(rm, 'Click to confirm', async () => {
        try { await fetch(`/api/${SLUG}/design/thumbnails/${CUR}`, { method: 'DELETE' }).then(r => { if (!r.ok) throw new Error(r.status); }); const old = CUR; await loadItems(); buildStrip(); CUR = null; await go(ITEMS.find(x => old.startsWith(x.id))?.id || ITEMS[0].id); status(`Moved ${old} to the Bin.`); }
        catch (e) { status('Could not remove it: ' + e.message, true); }
      });
      box.appendChild(rm);
    }
  }
  async function loadItems() {
    if (CAR) { const d = await json(api()); W = d.width; H = d.height; ASSETS = d.assets; CONTENT = await json(api() + '/content'); LOADED = SAVED = JSON.stringify(CONTENT); ITEMS = CONTENT.slides.map((s, i) => ({ n: i + 1, layout: s.layout, ground: s.ground, groundColor: s.groundColor })); }
    else { const d = await json(api().replace(/\/[^/]*$/, '')); ITEMS = d.items; ASSETS = d.assets; }
  }

  /* ---------- saving ---------- */
  function flash(msg) {
    const f = $('flash'); f.textContent = 'Saved ✓'; clearTimeout(flash.t); flash.t = setTimeout(() => { f.textContent = ''; }, 4000);
    saveState('Saved ✓ ' + new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })); $('save').classList.add('ok');
    if (msg) status(msg);
  }
  async function save() {
    saveState('Saving…'); $('save').classList.remove('ok');
    if (!versioned.has(itemKey())) { versioned.add(itemKey()); await V.add('Before this session’s edits', JSON.parse(LOADED), true); }
    await put(api() + '/content', CONTENT); SAVED = JSON.stringify(CONTENT);
  }
  // someone else (another tab, an agent rewriting the copy) may have changed content.json since we read it:
  // a change is then made on the file as it is now, so it never overwrites theirs
  async function fresh() {
    let f = null; try { f = await json(api() + '/content'); } catch { return false; }
    if (!f || JSON.stringify(f) === SAVED) return false;
    CONTENT = f; SAVED = JSON.stringify(f); if (CAR) ITEMS = CONTENT.slides.map((s, i) => ({ n: i + 1, layout: s.layout, ground: s.ground, groundColor: s.groundColor })); return true;
  }
  // every change: snapshot (undo), mutate, save, reload the preview
  function change(fn, msg, o = {}) {
    busy = busy.then(async () => {
      const rebased = await fresh();
      const before = JSON.stringify(CONTENT); fn(CONTENT); if (JSON.stringify(CONTENT) === before) { drawOverlay(); if (rebased) await reload({ strip: 'all' }); return; }
      const after = JSON.stringify(CONTENT); CONTENT = JSON.parse(before); hist.snapshot(); CONTENT = JSON.parse(after);
      try { await save(); } catch (e) { CONTENT = JSON.parse(before); saveState('Not saved', true); status('Not saved: ' + e.message, true); await reload({ strip: false }); return; }
      flash(msg + (rebased ? ' (The file had changed elsewhere: your change was made on the newest copy.)' : '')); if (CAR) ITEMS.forEach((it, i) => { if (CONTENT.slides[i]) { it.ground = CONTENT.slides[i].ground; it.groundColor = CONTENT.slides[i].groundColor; } });
      await reload({ strip: rebased ? 'all' : o.strip || true, select: o.select });
      if (CAR) buildStripLabels();
    }).catch(e => { console.error(e); status('Something went wrong: ' + e.message, true); });
    return busy;
  }
  const groundName = (it) => (it.groundColor ? it.groundColor : it.ground);
  function buildStripLabels() { for (const b of $('strip').children) { const it = ITEMS.find(x => String(x.n) === b.dataset.id); if (it) b.querySelector('.nm').textContent = `${it.layout} · ${groundName(it)}`; } }
  // undo/redo covers the design (content.json) and the project palette (a removed or added swatch)
  const hist = Shell.history({
    get: () => ({ c: CONTENT, p: PALETTE }),
    set: async (st) => {
      if (JSON.stringify(st.p) !== JSON.stringify(PALETTE)) { PALETTE = st.p; try { await savePalette(); } catch (e) { status('Palette not saved: ' + e.message, true); } }
      if (JSON.stringify(st.c) === JSON.stringify(CONTENT)) { colourPane(); flash(); return; }
      CONTENT = st.c; try { await save(); flash(); } catch (e) { status('Not saved: ' + e.message, true); }
      if (CAR) { ITEMS = CONTENT.slides.map((s, i) => ({ n: i + 1, layout: s.layout, ground: s.ground, groundColor: s.groundColor })); buildStripLabels(); }
      await reload({ strip: CAR ? 'all' : true });
    },
  });
  const V = Shell.versions({
    api: () => api() + '/versions', payload: 'content', get: () => CONTENT,
    apply: async (c) => { hist.snapshot(); CONTENT = c; await save(); flash(); if (CAR) { ITEMS = CONTENT.slides.map((s, i) => ({ n: i + 1, layout: s.layout, ground: s.ground, groundColor: s.groundColor })); buildStrip(); } await reload({ strip: 'all' }); header(); },
  });

  /* ---------- nudges (move / size / hide) ---------- */
  const nudges = (c = CONTENT) => (CAR ? slideObj(c).nudge : c.nudge) || {};
  const nudgeOf = (name) => nudges()[name] || {};
  function setNudge(name, patch, msg, o) {
    return change((c) => {
      const home = CAR ? (slideObj(c).nudge = slideObj(c).nudge || {}) : (c.nudge = c.nudge || {});
      const n = patch === null ? {} : { ...(home[name] || {}), ...patch };
      if (!n.dx) delete n.dx; if (!n.dy) delete n.dy; if (!n.s || Math.abs(n.s - 1) < 0.005) delete n.s; if (!n.hide) delete n.hide;
      if (Object.keys(n).length) home[name] = n; else delete home[name];
      if (!Object.keys(home).length) { if (CAR) delete slideObj(c).nudge; else delete c.nudge; }
    }, msg, o);
  }

  /* ---------- pointer: select, drag, type ---------- */
  function attach() {
    const d = doc(); if (!d || d.__studio) return; d.__studio = true;
    const st = d.createElement('style'); st.textContent = `html.studio-edit [data-k]{cursor:text} html.studio-edit [data-move], html.studio-edit [data-img]{cursor:grab} [contenteditable="true"]{outline:none;cursor:text;caret-color:#FF4713}`;
    d.head.appendChild(st); d.documentElement.classList.toggle('studio-edit', editing);
    d.addEventListener('pointerdown', onDown, true); d.addEventListener('pointermove', onMove); d.addEventListener('pointerup', onUp); d.addEventListener('pointercancel', onUp);
    d.addEventListener('mouseleave', () => { HOV = null; drawOverlay(); });
    d.addEventListener('keydown', onKey);
    attachDrop(d);
  }
  function onDown(e) {
    if (!editing || e.button !== 0) return;
    if (TYPING && TYPING.el.contains(e.target)) return;                 // caret / text selection while typing
    if (TYPING) { commitText(); }
    const ch = chain(e.target); if (!ch.length) { select(null); return; }
    e.preventDefault();
    const el = SEL && ch.includes(SEL) ? SEL : ch[0];                   // a selected block drags as a whole
    const n0 = nudgeOf(nameOf(el));
    DRAG = { el, inner: ch[0], sx: e.clientX, sy: e.clientY, ox: n0.dx || 0, oy: n0.dy || 0, moved: false };
    try { e.target.setPointerCapture(e.pointerId); } catch { }
  }
  function onMove(e) {
    if (DRAG) {
      let dx = e.clientX - DRAG.sx, dy = e.clientY - DRAG.sy;
      if (!DRAG.moved && Math.hypot(dx, dy) * K < 4) return;
      if (!DRAG.moved) { DRAG.moved = true; SEL = DRAG.el; hideTbar(); }
      if (e.shiftKey) { if (Math.abs(dx) > Math.abs(dy)) dy = 0; else dx = 0; }
      DRAG.nx = Math.round(DRAG.ox + dx); DRAG.ny = Math.round(DRAG.oy + dy);
      DRAG.el.style.translate = `${DRAG.nx}px ${DRAG.ny}px`; drawOverlay(); return;
    }
    if (!editing) return;
    const ch = chain(e.target); const h = SEL && ch.includes(SEL) ? SEL : ch[0] || null;
    if (h !== HOV) { HOV = h; drawOverlay(); }
  }
  function onUp(e) {
    const d = DRAG; DRAG = null; if (!d) return;
    if (d.moved) { setNudge(nameOf(d.el), { dx: d.nx, dy: d.ny }, 'Moved.', { select: nameOf(d.el) }); return; }
    select(d.inner);
    if (isText(d.inner)) startText(d.inner, e);
  }
  function select(el) { SEL = el; drawOverlay(); if (el) showTbar(); else hideTbar(); markPhotos(); updateSummary(); }

  /* typing in place */
  function serialize(el) {
    let out = CAR ? toMd(el) : toHTML(el);
    out = out.replace(/ /g, ' ');
    if (CAR && el.dataset.affix) { const [a, b] = el.dataset.affix.split('|'); if (a && out.startsWith(a)) out = out.slice(a.length); if (b && out.endsWith(b)) out = out.slice(0, -b.length); }
    return CAR ? out.replace(/\n+$/, '') : out.replace(/(<br>)+$/, '');
  }
  const escH = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const KEEP = ['serif', 'o', 'b', 'g', 'acc'];
  function toHTML(node) {
    let s = '';
    for (const n of node.childNodes) {
      if (n.nodeType === 3) { s += escH(n.nodeValue); continue; }
      if (n.nodeType !== 1) continue;
      const inner = toHTML(n), tag = n.tagName;
      if (tag === 'BR') s += '<br>';
      else if (tag === 'SPAN' || tag === 'EM') { const cls = [...n.classList].filter(c => KEEP.includes(c)); s += tag === 'EM' ? `<em${cls.length ? ` class="${cls.join(' ')}"` : ''}>${inner}</em>` : cls.length ? `<span class="${cls.join(' ')}">${inner}</span>` : inner; }
      else if (tag === 'DIV' || tag === 'P') s += (s ? '<br>' : '') + inner;
      else s += inner;
    }
    return s;
  }
  function toMd(node) {
    let s = '';
    for (const n of node.childNodes) {
      if (n.nodeType === 3) { s += n.nodeValue; continue; }
      if (n.nodeType !== 1) continue;
      const inner = toMd(n);
      if (n.tagName === 'BR') s += '\n';
      else if (n.classList.contains('serif')) s += `_${inner}_`;
      else if (n.tagName === 'EM' || n.classList.contains('acc')) s += `*${inner}*`;
      else if (n.tagName === 'DIV' || n.tagName === 'P') s += (s ? '\n' : '') + inner;
      else s += inner;
    }
    return s;
  }
  function startText(el, e) {
    if (TYPING) return;
    TYPING = { el, before: serialize(el), html: el.innerHTML, key: el.dataset.k };
    el.contentEditable = 'true'; el.spellcheck = false; el.focus({ preventScroll: true });
    const d = doc(); const s = d.getSelection(); s.removeAllRanges();
    const r = e && d.caretRangeFromPoint ? d.caretRangeFromPoint(e.clientX, e.clientY) : null;
    if (r && el.contains(r.startContainer)) s.addRange(r); else { const rr = d.createRange(); rr.selectNodeContents(el); s.addRange(rr); }
    el.addEventListener('keydown', onTypeKey); el.addEventListener('input', drawOverlay); el.addEventListener('paste', onPaste);
    drawOverlay(); showTbar();
  }
  function onTypeKey(e) {
    e.stopPropagation();
    if (e.key === 'Enter' && e.shiftKey) { e.preventDefault(); doc().execCommand('insertLineBreak'); return; }
    if (e.key === 'Enter') { e.preventDefault(); commitText(); return; }
    if (e.key === 'Escape') { e.preventDefault(); cancelText(); }
  }
  function onPaste(e) { e.preventDefault(); doc().execCommand('insertText', false, (e.clipboardData.getData('text/plain') || '').replace(/\r/g, '')); }
  function endText() { const { el } = TYPING; el.removeAttribute('contenteditable'); el.removeEventListener('keydown', onTypeKey); el.removeEventListener('input', drawOverlay); el.removeEventListener('paste', onPaste); TYPING = null; try { doc().getSelection().removeAllRanges(); } catch { } }
  function commitText() {
    if (!TYPING) return Promise.resolve(); const { el, before, key } = TYPING; const after = serialize(el); endText();
    if (after === before) { drawOverlay(); showTbar(); return Promise.resolve(); }
    return change((c) => setPath(c, textPath(key), after), 'Text changed.', { select: key });
  }
  function cancelText() { const { el, html } = TYPING; el.innerHTML = html; endText(); drawOverlay(); showTbar(); status('Change cancelled.'); }
  function wrapSel(kind) {
    if (!TYPING) return; const d = doc(); const s = d.getSelection(); if (!s.rangeCount || s.isCollapsed) { status('Select a word first, then press ' + (kind === 'acc' ? 'Accent' : 'Serif') + '.'); return; }
    const r = s.getRangeAt(0); if (!TYPING.el.contains(r.commonAncestorContainer)) return;
    let a = r.commonAncestorContainer.nodeType === 1 ? r.commonAncestorContainer : r.commonAncestorContainer.parentElement;
    while (a && a !== TYPING.el) { if (a.classList.contains(kind) || (kind === 'acc' && a.tagName === 'EM')) { a.replaceWith(...a.childNodes); TYPING.el.normalize(); drawOverlay(); return; } a = a.parentElement; }
    const w = d.createElement(CAR && kind === 'acc' ? 'em' : 'span'); w.className = kind; w.appendChild(r.extractContents()); r.insertNode(w);
    s.removeAllRanges(); const r2 = d.createRange(); r2.selectNodeContents(w); s.addRange(r2); drawOverlay();
  }

  /* ---------- overlay: hover, selection, resize handles, toolbar ---------- */
  function rectOf(el) { const r = el.getBoundingClientRect(); return { x: r.left * K, y: r.top * K, w: r.width * K, h: r.height * K }; }
  function box(el, cls) { const r = rectOf(el); const d = document.createElement('div'); d.className = 'ob ' + cls; const p = 4; Object.assign(d.style, { left: r.x - p + 'px', top: r.y - p + 'px', width: r.w + 2 * p + 'px', height: r.h + 2 * p + 'px' }); ov.appendChild(d); return r; }
  function drawOverlay() {
    ov.innerHTML = ''; if (stage.classList.contains('dropping') && HOV && HOV.isConnected) { box(HOV, 'hov drop'); positionTbar(); return; }
    if (!editing || !front.contentDocument) { positionTbar(); return; }
    if (HOV && HOV !== SEL && HOV.isConnected) box(HOV, 'hov');
    if (SEL && SEL.isConnected) {
      const r = box(SEL, TYPING && TYPING.el === SEL ? 'typing' : 'sel');
      if (!TYPING && !DRAG) for (const c of ['nw', 'ne', 'sw', 'se']) {
        const h = document.createElement('div'); h.className = 'hdl ' + c; h.title = 'Drag to resize';
        h.style.left = (c[1] === 'w' ? r.x - 10 : r.x + r.w - 3) + 'px'; h.style.top = (c[0] === 'n' ? r.y - 10 : r.y + r.h - 3) + 'px';
        h.addEventListener('pointerdown', (e) => startResize(e, h)); ov.appendChild(h);
      }
    }
    positionTbar();
  }
  function startResize(e, h) {
    e.preventDefault(); e.stopPropagation(); const el = SEL; if (!el) return; h.setPointerCapture(e.pointerId);
    const sr = stage.getBoundingClientRect(), r = rectOf(el); const cx = sr.left + r.x + r.w / 2, cy = sr.top + r.y + r.h / 2;
    const d0 = Math.max(8, Math.hypot(e.clientX - cx, e.clientY - cy)); const s0 = nudgeOf(nameOf(el)).s || 1; let s = s0;
    const move = (m) => { s = Math.max(0.2, Math.min(4, s0 * Math.hypot(m.clientX - cx, m.clientY - cy) / d0)); el.style.scale = String(s); hideTbar(); positionTbar(); };
    const up = () => { h.removeEventListener('pointermove', move); h.removeEventListener('pointerup', up); setNudge(nameOf(el), { s: Math.round(s * 1000) / 1000 }, `Resized to ${Math.round(s * 100)}%.`, { select: nameOf(el) }); };
    h.addEventListener('pointermove', move); h.addEventListener('pointerup', up);
  }
  const tbar = $('tbar');
  function hideTbar() { tbar.hidden = true; }
  function btn(text, fn, title) { const b = document.createElement('button'); b.type = 'button'; b.textContent = text; if (title) b.title = title; b.addEventListener('pointerdown', (e) => e.preventDefault()); b.onclick = fn; tbar.appendChild(b); return b; }
  function showTbar() {
    const el = SEL; if (!el || !editing) return hideTbar();
    tbar.innerHTML = ''; tbar.hidden = false;
    const name = nameOf(el), n = nudgeOf(name);
    const l = document.createElement('span'); l.className = 'lbl'; l.textContent = label(el); tbar.appendChild(l);
    if (TYPING) {
      if (!el.hasAttribute('data-plain')) { btn('Accent colour', () => wrapSel('acc'), 'Select a word, then press this'); btn('Serif', () => wrapSel('serif'), 'Select a word, then press this'); }
      btn('Done', () => commitText(), 'Enter'); btn('Cancel', () => cancelText(), 'Esc');
    } else {
      if (isText(el)) btn('Edit text', () => startText(el));
      const inn = insideOf(el), up = outsideOf(el);
      if (inn) btn('Select inside', () => select(inn), 'Pick one thing inside this block (Enter)');
      if (up) btn('Select whole block', () => select(up), 'Select the group this is part of, to move or download it all (Shift+Enter or Esc)');
      const lab = document.createElement('span'); lab.className = 'lbl'; lab.textContent = 'Size'; tbar.appendChild(lab);
      const rg = document.createElement('input'); rg.type = 'range'; rg.min = 20; rg.max = 300; rg.step = 1; rg.value = Math.round((n.s || 1) * 100); rg.title = rg.value + '%';
      rg.addEventListener('input', () => { el.style.scale = String(rg.value / 100); rg.title = rg.value + '%'; drawOverlay(); });
      rg.addEventListener('change', () => setNudge(name, { s: rg.value / 100 }, `Resized to ${rg.value}%.`, { select: name }));
      tbar.appendChild(rg);
      if (photoIn(el)) { btn('Change photo…', () => openPicker(photoIn(el).dataset.img)); btn('Remove background', () => cutoutInPlace(photoIn(el).dataset.img), 'Make a cut-out of this photo and use it here (the original is kept)'); }
      btn('Download this part', () => downloadPart(el), 'Save just this (and everything inside it) as a PNG with a see-through background. Size and background options: Export, on the right.');
      btn('Hide', () => { SEL = null; setNudge(name, { hide: true }, 'Hidden. Bring it back from “Moved, resized or hidden” on the right.'); });
      if (n.dx || n.dy || n.s) btn('Reset', () => setNudge(name, null, 'Back to where it was designed.', { select: name }), 'Original place and size');
    }
    positionTbar();
  }
  function positionTbar() {
    if (tbar.hidden || !SEL || !SEL.isConnected) return; const sr = stage.getBoundingClientRect(), r = rectOf(SEL);
    let x = sr.left + r.x, y = sr.top + r.y - tbar.offsetHeight - 14;
    if (y < 8) y = sr.top + r.y + r.h + 14; if (y + tbar.offsetHeight > innerHeight - 8) y = Math.max(8, innerHeight - tbar.offsetHeight - 8);
    x = Math.max(8, Math.min(x, innerWidth - tbar.offsetWidth - 8)); tbar.style.left = x + 'px'; tbar.style.top = y + 'px';
  }

  /* ---------- side panes ---------- */
  function buildPanes() { colourPane(); photoPane(); changesPane(); textPane(); renderChecks(); }
  /* ---------- colours: the project palette (projects/<slug>/palette.json, shared by every design editor) ---------- */
  let PALETTE = [], MIX = null, REMOVED = null;
  const PAL_API = `/api/${SLUG}/palette`;
  async function loadPalette() { try { PALETTE = (await json(PAL_API)).swatches; } catch (e) { status('Could not load the palette: ' + e.message, true); } }
  async function savePalette() { PALETTE = (await put(PAL_API, { swatches: PALETTE })).swatches; }
  function changePalette(fn, msg) {
    busy = busy.then(async () => {
      const before = JSON.stringify(PALETTE); const next = JSON.parse(before); fn(next); if (JSON.stringify(next) === before) return;
      hist.snapshot(); PALETTE = next;
      try { await savePalette(); flash(msg); } catch (e) { PALETTE = JSON.parse(before); status('Palette not saved: ' + e.message, true); }
      colourPane();
    }).catch(e => { console.error(e); status('Something went wrong: ' + e.message, true); });
    return busy;
  }
  function normHex(h) { h = String(h || '').trim().replace(/^#/, ''); if (/^[0-9a-f]{3}$/i.test(h)) h = h.split('').map(c => c + c).join(''); return /^[0-9a-f]{6}$/i.test(h) ? '#' + h.toUpperCase() : null; }
  const rgbOf = (h) => h.slice(1).match(/../g).map(x => parseInt(x, 16));
  const lum = (h) => rgbOf(h).map(v => v / 255).map(c => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4)).reduce((a, c, i) => a + c * [0.2126, 0.7152, 0.0722][i], 0);
  const contrast = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
  // lighter / darker: the same hue, lightness moved in HSL steps
  function shade(hex, d) {
    let [r, g, b] = rgbOf(hex).map(v => v / 255); const mx = Math.max(r, g, b), mn = Math.min(r, g, b); let h = 0, s = 0, l = (mx + mn) / 2;
    if (mx !== mn) { const k = mx - mn; s = l > 0.5 ? k / (2 - mx - mn) : k / (mx + mn); h = mx === r ? (g - b) / k + (g < b ? 6 : 0) : mx === g ? (b - r) / k + 2 : (r - g) / k + 4; h /= 6; }
    l = Math.max(0, Math.min(1, l + d));
    const f = (n) => { const k = (n + h * 12) % 12, a = s * Math.min(l, 1 - l); return l - a * Math.max(-1, Math.min(k - 3, 9 - k, 1)); };
    return '#' + [f(0), f(8), f(4)].map(v => Math.round(v * 255).toString(16).padStart(2, '0')).join('').toUpperCase();
  }
  const nameHex = (hex) => { const p = PALETTE.find(x => x.hex === hex); return p && p.name !== hex ? `${p.name} (${hex})` : hex; };
  const textOn = (hex) => (contrast(hex, PAL.white) >= contrast(hex, PAL.ink) ? PAL.white : PAL.ink);   // the headline colour that reads best
  function swatches(box, title, list, cur, onPick, o = {}) {
    const t = document.createElement('div'); t.className = 'sublbl'; t.textContent = title; box.appendChild(t);
    const row = document.createElement('div'); row.className = 'swrow'; box.appendChild(row);
    if (!list.length) { const p = document.createElement('p'); p.className = 'empty'; p.textContent = 'No colours in the palette. Add one below.'; row.appendChild(p); }
    for (const [hex, name, fixed] of list) {
      const w = document.createElement('span'); w.className = 'swc';
      const b = document.createElement('button'); b.type = 'button'; b.className = 'sw'; b.style.setProperty('--c', hex); b.title = name + (fixed ? '' : ' · right-click to remove from the palette'); b.setAttribute('aria-label', name);
      b.dataset.hex = hex; b.setAttribute('aria-pressed', String(!!cur && cur.toUpperCase() === hex.toUpperCase())); b.onclick = () => { setMix(hex); onPick(hex); };
      w.appendChild(b);
      if (!fixed && o.removable) {
        b.addEventListener('contextmenu', (e) => { e.preventDefault(); removeSwatch(hex); });
        const x = document.createElement('button'); x.type = 'button'; x.className = 'swx'; x.textContent = '×'; x.title = `Remove ${name} from the palette`; x.setAttribute('aria-label', x.title);
        x.onclick = () => removeSwatch(hex); w.appendChild(x);
      }
      row.appendChild(w);
    }
  }
  function removeSwatch(hex) {
    const i = PALETTE.findIndex(x => x.hex === hex); if (i < 0) return; const sw = PALETTE[i];
    REMOVED = { ...sw, i };
    changePalette((p) => { p.splice(i, 1); }, `Removed ${sw.name === sw.hex ? sw.hex : sw.name} from the palette (every design of this project). Undo brings it back.`);
  }
  function addSwatch(hex) {
    if (PALETTE.some(x => x.hex === hex)) { status(`${nameHex(hex)} is already in the palette.`); return; }
    REMOVED = null; changePalette((p) => { p.push({ name: hex, hex }); }, `Added ${hex} to the palette. Thumbnails and carousels of this project show it too.`);
  }
  function resolved(v) { const t = root(); if (!t) return ''; const p = doc().createElement('i'); p.style.color = v; t.appendChild(p); const c = getComputedStyle(p).color; p.remove(); const m = c.match(/[\d.]+/g); return m ? '#' + m.slice(0, 3).map(x => Math.round(+x).toString(16).padStart(2, '0')).join('').toUpperCase() : ''; }
  const hasVar = (k) => { const t = root(); return !!(t && getComputedStyle(t).getPropertyValue(k).trim()); };
  // what the design draws now: ground, text, accent words (from the page itself)
  function liveColours() {
    if (CAR) return { g: resolved('var(--bg)'), fg: resolved('var(--fg)'), a: resolved('var(--a)') };
    return { g: hasVar('--ground') ? resolved('var(--ground)') : '', fg: hasVar('--fg') ? resolved('var(--fg)') : '', a: hasVar('--accent') ? resolved('var(--accent)') : '' };
  }
  // WCAG AA for large text (headlines, accent words): 3:1
  function contrastWarnings(box) {
    const { g, fg, a } = liveColours(); if (!normHex(g)) return;
    const add = (t) => { const p = document.createElement('p'); p.className = 'warn cwarn'; p.textContent = t; box.appendChild(p); };
    if (normHex(fg)) { const r = contrast(g, fg); if (r < 3) add(`Text on this ground is hard to read: ${r.toFixed(1)}:1 contrast. Large text needs 3:1 (WCAG AA).`); }
    if (normHex(a)) { const r = contrast(g, a); if (r < 1.15) add('The accent is the same colour as the ground: accent words will disappear.'); else if (r < 3) add(`Accent words on this ground: ${r.toFixed(1)}:1 contrast. Large text needs 3:1 (WCAG AA).`); }
  }
  function slideGroundHex(s) { return s.groundColor || { paper: PAL.paper, ink: PAL.ink, card: PAL.card, accent: CONTENT.accent }[s.ground]; }
  function applyGround(hex) {
    if (CAR) {
      const named = hex === PAL.paper ? 'paper' : hex === PAL.ink ? 'ink' : hex === PAL.card ? 'card' : hex === String(CONTENT.accent).toUpperCase() ? 'accent' : null;
      return change((c) => {
        const s = slideObj(c);
        if (named) { s.ground = named; delete s.groundColor; } else { s.ground = textOn(hex) === PAL.white ? 'ink' : 'paper'; s.groundColor = hex; }
      }, named ? `Ground: ${named}.` : `Ground: ${nameHex(hex)} (this slide). Text is ${textOn(hex) === PAL.white ? 'light' : 'dark'} on it.`);
    }
    return change((c) => {
      const dark = textOn(hex) === PAL.white; c.vars = c.vars || {};
      Object.assign(c.vars, { '--ground': hex, '--fg': dark ? PAL.white : PAL.ink, '--gridc': dark ? 'rgba(255,255,255,.10)' : 'rgba(17,17,20,.08)', '--rule': dark ? 'rgba(255,255,255,.85)' : 'rgba(17,17,20,.85)' });
    }, `Ground: ${nameHex(hex)}. Headline colour follows it.`);
  }
  function applyAccent(hex) {
    if (CAR) {
      // on ink slides the accent must still read: a dark custom accent gets a lighter shade there
      let onInk = ON_INK[hex]; if (!onInk) { onInk = hex; for (let k = 0; k < 12 && contrast(onInk, PAL.ink) < 3; k++) onInk = shade(onInk, 0.06); }
      return change((c) => { c.accent = hex; c.accentOnInk = onInk; }, `Accent: ${nameHex(hex)}, on every slide.`, { strip: 'all' });
    }
    return change((c) => { c.vars = c.vars || {}; c.vars['--accent'] = hex; }, `Accent: ${nameHex(hex)}.`);
  }
  function setMix(hex) { MIX = normHex(hex) || MIX; const ci = $('mixColor'), ht = $('mixHex'); if (ci && MIX) { ci.value = MIX.toLowerCase(); ht.value = MIX; mixInfo(); } }
  function mixInfo() {
    const box = $('mixInfo'); if (!box || !MIX) return; const { a } = liveColours();
    const t = textOn(MIX), r = contrast(MIX, t); let msg = `As a ground: ${t === PAL.white ? 'light' : 'dark'} text, ${r.toFixed(1)}:1`;
    if (normHex(a) && a !== MIX) { const ra = contrast(MIX, a); msg += ` · accent words ${ra.toFixed(1)}:1${ra < 3 ? ' (under 3:1)' : ''}`; }
    box.textContent = msg; box.classList.toggle('warn', r < 3 || (normHex(a) && a !== MIX && contrast(MIX, a) < 3));
    const add = $('mixAdd'); if (add) { const inPal = PALETTE.some(x => x.hex === MIX); add.disabled = inPal; add.textContent = inPal ? 'In the palette' : 'Add to palette'; }
  }
  function mixer(box, { ground, accent }) {
    const t = document.createElement('div'); t.className = 'sublbl'; t.textContent = 'Custom colour'; box.appendChild(t);
    const w = document.createElement('div'); w.className = 'mixer'; box.appendChild(w);
    w.innerHTML = `<div class="mixrow"><input type="color" id="mixColor" aria-label="Pick any colour"><input type="text" id="mixHex" spellcheck="false" maxlength="7" aria-label="Hex colour" placeholder="#RRGGBB">
      <button type="button" id="mixLight" title="A lighter shade of this colour">Lighter</button><button type="button" id="mixDark" title="A darker shade of this colour">Darker</button></div>
      <div class="mixrow"></div><p class="hint2" id="mixInfo"></p>`;
    const acts = w.children[1];
    const mk = (txt, title, fn) => { const b = document.createElement('button'); b.type = 'button'; b.textContent = txt; b.title = title; b.onclick = fn; acts.appendChild(b); return b; };
    if (ground) mk(CAR ? 'Use as this slide’s ground' : 'Use as ground', 'Apply this colour as the ground', () => MIX && applyGround(MIX)).id = 'mixGround';
    if (accent) mk(CAR ? 'Use as accent (every slide)' : 'Use as accent', 'Apply this colour to the accent words', () => MIX && applyAccent(MIX)).id = 'mixAccent';
    mk('Add to palette', 'Save this colour as a swatch for every design of this project', () => MIX && addSwatch(MIX)).id = 'mixAdd';
    $('mixColor').addEventListener('input', () => setMix($('mixColor').value));
    $('mixHex').addEventListener('keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); $('mixHex').blur(); } });
    $('mixHex').addEventListener('change', () => { const h = normHex($('mixHex').value); if (h) setMix(h); else { $('mixHex').value = MIX || ''; status('A colour is 6 hex digits, like #1B3FD8.', true); } });
    $('mixLight').onclick = () => MIX && setMix(shade(MIX, 0.08));
    $('mixDark').onclick = () => MIX && setMix(shade(MIX, -0.08));
    setMix(MIX || ground || accent || PAL.blue);
  }
  function colourPane() {
    const box = $('colours'); box.innerHTML = ''; if (!CONTENT || !root()) return;
    const pal = PALETTE.map(x => [x.hex, x.name]);
    let gNow = null, aNow = null;
    if (CAR) {
      const s = slideObj(); aNow = String(CONTENT.accent).toUpperCase(); gNow = String(slideGroundHex(s)).toUpperCase();
      swatches(box, 'This slide’s ground', [...pal, [aNow, 'Accent (full bleed)', true]], gNow, (hex) => applyGround(hex), { removable: true });
      swatches(box, 'Accent colour (every slide)', pal, aNow, (hex) => applyAccent(hex), { removable: false });
    } else {
      const hasG = hasVar('--ground'), hasA = hasVar('--accent');
      if (hasG) { gNow = resolved('var(--ground)'); swatches(box, 'Ground', pal, gNow, (hex) => applyGround(hex), { removable: true }); }
      if (hasA) { aNow = resolved('var(--accent)'); swatches(box, 'Accent colour', pal, aNow, (hex) => applyAccent(hex), { removable: !hasG }); }
      if (!hasG && !hasA) { const p = document.createElement('p'); p.textContent = 'This design has fixed colours (a split ground).'; box.appendChild(p); return; }
    }
    if (REMOVED && !PALETTE.some(x => x.hex === REMOVED.hex)) {
      const r = document.createElement('div'); r.className = 'undorow'; r.innerHTML = '<span></span>';
      r.firstChild.textContent = `Removed ${REMOVED.name === REMOVED.hex ? REMOVED.hex : REMOVED.name} from the palette.`;
      const u = document.createElement('button'); u.type = 'button'; u.textContent = 'Undo';
      u.onclick = () => { const x = REMOVED; REMOVED = null; changePalette((p) => { p.splice(Math.min(x.i, p.length), 0, { name: x.name, hex: x.hex }); }, `${x.name === x.hex ? x.hex : x.name} is back in the palette.`); };
      r.appendChild(u); box.appendChild(r);
    }
    contrastWarnings(box);
    mixer(box, { ground: gNow, accent: aNow });
    const vars = CONTENT.vars || {};
    if (!CAR && ['--ground', '--fg', '--accent', '--gridc', '--rule'].some(k => k in vars)) {
      const b = document.createElement('button'); b.type = 'button'; b.textContent = 'Back to the design’s own colours';
      b.onclick = () => change((c) => { for (const k of ['--ground', '--fg', '--accent', '--gridc', '--rule']) delete c.vars[k]; }, 'Original colours.');
      box.appendChild(b);
    }
  }
  function photoPane() {
    const box = $('photos'); box.innerHTML = ''; const r = root(); if (!r) return;
    const top = document.createElement('div'); top.className = 'inout';
    const add = document.createElement('button'); add.type = 'button'; add.textContent = 'Add photo…'; add.title = 'JPG, PNG, HEIC or WebP from your Mac (also: drop photos on the design)';
    add.onclick = () => chooseFiles((done) => { if (done.length && imgKeys().length) openPicker(photoIn(SEL) ? photoIn(SEL).dataset.img : imgKeys()[0]); });
    const hint = document.createElement('span'); hint.className = 'hint2'; hint.textContent = 'or drop photos on the design';
    top.append(add, hint); box.appendChild(top);
    box.appendChild(progEl('photoProg'));
    const imgs = [...r.querySelectorAll('[data-img]')]; const seen = new Set();
    if (!imgs.length) { const p = document.createElement('p'); p.textContent = 'No photo in this design.'; box.appendChild(p); return; }
    for (const im of imgs) {
      const key = im.dataset.img; if (seen.has(key)) continue; seen.add(key);
      const row = document.createElement('div'); row.className = 'photo'; row.dataset.key = key;
      const v = getPath(CONTENT, imgPath(key)) || '';
      row.innerHTML = '<img alt=""><span></span>'; row.querySelector('img').src = im.currentSrc || im.src; row.querySelector('span').textContent = (imgToProject(v) || key).split('/').pop();
      const bs = document.createElement('span'); bs.className = 'pbtns';
      const b = document.createElement('button'); b.type = 'button'; b.textContent = 'Change…'; b.onclick = () => openPicker(key); bs.appendChild(b);
      const cb = document.createElement('button'); cb.type = 'button'; cb.textContent = 'Remove background'; cb.title = 'Make a cut-out of this photo and use it here (the original is kept)'; cb.onclick = () => cutoutInPlace(key); bs.appendChild(cb);
      row.appendChild(bs);
      row.querySelector('img').onclick = () => select(isMovable(im) ? im : im.closest('[data-move]'));
      box.appendChild(row);
    }
    markPhotos();
  }
  function markPhotos() { const p = photoIn(SEL); for (const r of $('photos').querySelectorAll('.photo')) r.style.outline = p && r.dataset.key === p.dataset.img ? '1px solid var(--acc)' : ''; }
  function changesPane() {
    const box = $('changes'); box.innerHTML = ''; const ns = nudges(); const names = Object.keys(ns);
    if (!names.length) { box.innerHTML = '<p class="empty">Nothing yet. Drag anything on the design to move it.</p>'; return; }
    for (const name of names) {
      const n = ns[name]; const el = findByName(name);
      const row = document.createElement('div'); row.className = 'chg';
      const what = [n.dx || n.dy ? `moved ${n.dx || 0}, ${n.dy || 0} px` : '', n.s ? `${Math.round(n.s * 100)}%` : '', n.hide ? 'hidden' : ''].filter(Boolean).join(' · ');
      row.innerHTML = '<span><b></b><span class="k"></span></span>'; row.querySelector('b').textContent = el ? label(el) : name; row.querySelector('.k').textContent = what;
      const bs = document.createElement('span'); bs.style.display = 'flex'; bs.style.gap = '6px';
      if (n.hide) { const b = document.createElement('button'); b.type = 'button'; b.textContent = 'Show'; b.onclick = () => setNudge(name, { hide: false }, 'Shown again.', { select: name }); bs.appendChild(b); }
      const b2 = document.createElement('button'); b2.type = 'button'; b2.textContent = 'Reset'; b2.onclick = () => setNudge(name, null, 'Back to the original.'); bs.appendChild(b2);
      row.appendChild(bs); box.appendChild(row);
    }
  }
  function textPane() {
    const box = $('texts'); box.innerHTML = ''; const r = root(); if (!r) return;
    $('textHint').textContent = CAR ? 'Every text on this slide. *word* = accent colour, _word_ = serif, new line = line break.' : 'Every text in this thumbnail, also empty ones (empty = not shown). New line = line break.';
    const fields = [];
    if (!CAR) fields.push({ key: '__title', label: 'YouTube title (not on the image)', path: ['title'] });
    if (!CAR && Array.isArray(CONTENT.titles)) CONTENT.titles.forEach((_, i) => { if (i) fields.push({ key: '__title' + i, label: `Other title idea ${i + 1} (not on the image)`, path: ['titles', i] }); });
    const seen = new Set();
    for (const el of r.querySelectorAll('[data-k]')) { const k = el.dataset.k; if (seen.has(k)) continue; seen.add(k); fields.push({ key: k, label: k.replace(/\./g, ' ').replace(/([a-z])([A-Z])/g, '$1 $2'), path: textPath(k) }); }
    for (const f of fields) {
      const v = getPath(CONTENT, f.path); if (v != null && typeof v !== 'string') continue;
      const show = (s) => (CAR ? s : String(s).replace(/<br\s*\/?>/g, '\n')); const back = (s) => (CAR ? s : s.replace(/\n/g, '<br>'));
      const w = document.createElement('label'); w.className = 'tfield'; w.innerHTML = '<span></span><textarea rows="1"></textarea>';
      w.querySelector('span').textContent = f.label; const ta = w.querySelector('textarea'); ta.value = show(v || ''); ta.rows = Math.min(4, ta.value.split('\n').length);
      ta.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); ta.blur(); } });
      ta.addEventListener('change', () => { const nv = back(ta.value.replace(/\r/g, '').replace(/\s+$/, '')); if (nv !== (v || '')) change((c) => setPath(c, f.path, nv), 'Text changed.'); });
      box.appendChild(w);
    }
  }

  /* ---------- photo picker ---------- */
  let PICK = null, NEW = new Set(), CUTTING = new Map();   // CUTTING: photo -> progress (0..1) while its background is removed
  const imgKeys = () => { const r = root(); return r ? [...new Set([...r.querySelectorAll('[data-img]')].map(x => x.dataset.img))] : []; };
  const isUpload = (f) => f.startsWith('assets/uploads/');
  const usePhoto = (key, f, msg) => change((c) => setPath(c, imgPath(key), projectToImg(f)), msg || 'Photo changed. Drag or resize it if it needs reframing.');
  function openPicker(key) { PICK = key; renderPicker(); $('picker').hidden = false; }
  function renderPicker() {
    const key = PICK; if (key == null) return; const cur = imgToProject(getPath(CONTENT, imgPath(key)) || '');
    $('pickFor').textContent = 'for ' + key; const g = $('pickGrid'); const sy = g.scrollTop; g.innerHTML = '';
    for (const grp of ASSETS) {
      const h = document.createElement('h3'); h.textContent = grp.label; g.appendChild(h);
      const tiles = document.createElement('div'); tiles.className = 'tiles'; g.appendChild(tiles);
      if (grp.uploads && !grp.files.length) {
        const d = document.createElement('button'); d.type = 'button'; d.className = 'tile dropzone'; d.textContent = 'Drop photos here, or click to add JPG, PNG, HEIC or WebP';
        d.onclick = () => chooseFiles(); tiles.appendChild(d);
      }
      for (const f of grp.files) {
        const t = document.createElement('div'); t.className = 'tile' + (f === cur ? ' on' : '') + (NEW.has(f) ? ' new' : ''); t.dataset.file = f;
        const b = document.createElement('button'); b.type = 'button'; b.className = 'pk'; b.title = `Use ${f.split('/').pop()}`;
        b.innerHTML = '<img loading="lazy" alt=""><span></span>'; b.querySelector('img').src = `${P}/${f}`; b.querySelector('span').textContent = f.split('/').pop();
        b.onclick = () => { closePicker(); usePhoto(key, f); };
        const acts = document.createElement('div'); acts.className = 'acts';
        const cb = document.createElement('button'); cb.type = 'button'; cb.textContent = 'Remove background'; cb.title = 'Make a cut-out PNG of this photo (in Cut-outs; the original is kept)';
        cb.onclick = () => removeBackground(f); acts.appendChild(cb);
        const pb = document.createElement('button'); pb.type = 'button'; pb.textContent = 'Person only'; pb.title = 'Cut out only the person (if the book or the background comes out wrong)';
        pb.onclick = () => removeBackground(f, 'person'); acts.appendChild(pb);
        if (isUpload(f)) { const x = document.createElement('button'); x.type = 'button'; x.className = 'rm'; x.textContent = '×'; x.title = 'Remove from your photos (moves it to the Bin)'; x.setAttribute('aria-label', x.title); x.onclick = () => removeUpload(f, x); acts.appendChild(x); }
        t.append(b, acts);
        if (CUTTING.has(f)) { const pr = document.createElement('div'); pr.className = 'tprog'; pr.innerHTML = '<span>Removing background…</span><i><b></b></i>'; pr.querySelector('b').style.width = Math.round(CUTTING.get(f) * 100) + '%'; t.appendChild(pr); }
        tiles.appendChild(t);
      }
    }
    g.scrollTop = sy;
  }
  function closePicker() { $('picker').hidden = true; PICK = null; NEW = new Set(); }
  $('pickClose').onclick = closePicker;
  $('pickAdd').onclick = () => chooseFiles();
  async function refreshAssets() { try { ASSETS = (await json(`/api/${SLUG}/assets`)).groups; } catch (e) { status('Could not list the photos: ' + e.message, true); } if (PICK != null) renderPicker(); }

  /* ---------- her own photos: add (button, drop), remove background, remove ---------- */
  const OK_TYPE = /\.(jpe?g|png|heic|heif|webp)$/i;
  const fileInput = document.createElement('input'); fileInput.type = 'file'; fileInput.multiple = true; fileInput.hidden = true; fileInput.id = 'addPhotoInput';
  fileInput.accept = '.jpg,.jpeg,.png,.heic,.heif,.webp,image/jpeg,image/png,image/heic,image/heif,image/webp'; document.body.appendChild(fileInput);
  let afterChoose = null;
  function chooseFiles(then) { afterChoose = then || null; fileInput.value = ''; fileInput.click(); }
  fileInput.addEventListener('change', async () => { const fs = [...fileInput.files]; const then = afterChoose; afterChoose = null; if (!fs.length) return; const done = await uploadFiles(fs); if (then) then(done); });
  function progEl(id) { const d = document.createElement('div'); d.className = 'prog'; d.id = id; d.hidden = true; d.innerHTML = '<span></span><i><b></b></i>'; return d; }
  function progress(text, p) {
    for (const id of ['photoProg', 'pickProg']) {
      const d = $(id); if (!d) continue; d.hidden = text == null; if (text == null) continue;
      d.querySelector('span').textContent = text; d.querySelector('b').style.width = Math.round(Math.max(0.03, Math.min(1, p || 0)) * 100) + '%';
    }
  }
  function sendPhoto(f, onProg) {
    return new Promise((resolve, reject) => {
      const x = new XMLHttpRequest(); x.open('POST', `/api/${SLUG}/uploads?name=${encodeURIComponent(f.name)}`);
      x.upload.onprogress = (e) => { if (e.lengthComputable) onProg(e.loaded / e.total); };
      x.onload = () => { let r = {}; try { r = JSON.parse(x.responseText); } catch { } if (x.status === 200) resolve(r); else reject(new Error(r.error || 'error ' + x.status)); };
      x.onerror = () => reject(new Error('the studio did not answer')); x.send(f);
    });
  }
  /** uploads photos into the project (assets/uploads/); returns the project paths that were added */
  async function uploadFiles(files) {
    const out = [], notes = [];
    for (const [i, f] of files.entries()) {
      if (!OK_TYPE.test(f.name) && !/^image\/(jpeg|png|heic|heif|webp)$/.test(f.type)) { status(`${f.name}: only JPG, PNG, HEIC or WebP photos can be added.`, true); continue; }
      if (f.size > 60e6) { status(`${f.name} is over 60 MB: too large.`, true); continue; }
      const lab = `Adding ${f.name}${files.length > 1 ? ` (${i + 1} of ${files.length})` : ''}…`;
      progress(lab, 0.02);
      try {
        const r = await sendPhoto(f, (p) => progress(p < 1 ? lab : `${lab} converting`, p * 0.9));
        out.push(r.file); notes.push(r.file.split('/').pop() + (r.converted ? ` (converted ${r.converted})` : '') + (r.scaled ? ` (scaled down from ${r.scaled})` : '') + (r.existed ? ' (already there)' : ''));
      } catch (e) { status(`Could not add ${f.name}: ${e.message}`, true); }
    }
    progress(null);
    if (out.length) { NEW = new Set(out); await refreshAssets(); status(`Added to Your photos: ${notes.join(', ')}. Saved in projects/${SLUG}/assets/uploads/.`); }
    return out;
  }
  /** "Remove background": a cut-out PNG in Cut-outs (the original stays). Returns its project path, or null. */
  async function removeBackground(f, mode = 'auto') {
    if (CUTTING.has(f)) return null;
    const nm = f.split('/').pop(); CUTTING.set(f, 0.02); renderPicker(); progress(`Removing the background of ${nm}…`, 0.02);
    let t;
    try {
      t = await Shell.post(`/api/${SLUG}/uploads/cutout`, { file: f, mode });
      while (t.state === 'running') {
        await sleep(250); t = await json(`/api/${SLUG}/uploads/cutout/${t.id}`);
        CUTTING.set(f, t.progress); progress(`Removing the background of ${nm}: ${t.stage}…`, t.progress);
        const b = document.querySelector(`#pickGrid .tile[data-file="${CSS.escape(f)}"] .tprog b`); if (b) b.style.width = Math.round(t.progress * 100) + '%';
      }
    } catch (e) { t = { state: 'failed', error: e.message }; }
    CUTTING.delete(f); progress(null);
    if (t.state !== 'done') { status(`Could not remove the background of ${nm}: ${t.error || 'it stopped'}.`, true); renderPicker(); return null; }
    NEW = new Set([t.file]); await refreshAssets();
    status(`Cut-out ready: ${t.file.split('/').pop()} in Cut-outs${USED[t.used] ? ` (${USED[t.used]})` : ''}. The original photo is kept.`);
    return t.file;
  }
  const USED = { 'person+foreground': 'the person and what she holds', objects: 'the main objects: no person found', person: 'person only', 'person+objects': 'person and objects merged' };
  async function cutoutInPlace(key) {
    const f = imgToProject(getPath(CONTENT, imgPath(key)) || ''); if (!f) return status('This photo has no file to cut out.', true);
    if (/\.png$/i.test(f) && /cut/i.test(f)) status('This photo is already a cut-out; making another one…');
    const out = await removeBackground(f); if (!out) return;
    await usePhoto(key, out, `Background removed: ${out.split('/').pop()} is used here. The original stays in the picker (Change… to go back), or Undo.`);
  }
  async function removeUpload(f, btn) {
    const nm = f.split('/').pop();
    if (btn.dataset.arm === '1') {
      btn.dataset.arm = ''; clearTimeout(btn._t);
      try {
        const r = await fetch(`/api/${SLUG}/uploads?file=${encodeURIComponent(f)}`, { method: 'DELETE' }); const j = await r.json();
        if (!r.ok) throw new Error(j.error || r.status);
        NEW.delete(f); await refreshAssets(); status(`Moved ${nm} to the Bin.${j.inVersions && j.inVersions.length ? ` Older versions of ${j.inVersions.join(', ')} used it.` : ''}`);
      } catch (e) { status(`Could not remove ${nm}: ${e.message}`, true); }
      return;
    }
    let u; try { u = await json(`/api/${SLUG}/uploads/usage?file=${encodeURIComponent(f)}`); } catch (e) { return status(`Could not check ${nm}: ${e.message}`, true); }
    if (u.usedBy.length) return status(`${nm} is used by ${u.usedBy.join(', ')}. Change that photo first, then remove it.`, true);
    btn.dataset.arm = '1'; btn.classList.add('armed'); btn.textContent = 'Move to Bin?';
    status(`Click “Move to Bin?” again to remove ${nm} from your photos${u.inVersions.length ? ` (older saved versions of ${u.inVersions.join(', ')} use it: restoring them would show a missing photo)` : ''}.`);
    btn._t = setTimeout(() => { btn.dataset.arm = ''; btn.classList.remove('armed'); btn.textContent = '×'; }, 4000);
  }
  // drop photos on the picker (added to Your photos) or on the design (a photo under the pointer is replaced)
  const hasFiles = (e) => e.dataTransfer && [...e.dataTransfer.types].includes('Files');
  document.addEventListener('dragover', (e) => { if (hasFiles(e)) e.preventDefault(); });
  document.addEventListener('drop', (e) => { if (hasFiles(e)) e.preventDefault(); });
  const pk = $('picker');
  pk.addEventListener('dragover', (e) => { if (!hasFiles(e)) return; e.preventDefault(); e.dataTransfer.dropEffect = 'copy'; pk.classList.add('drop'); });
  pk.addEventListener('dragleave', (e) => { if (!pk.contains(e.relatedTarget)) pk.classList.remove('drop'); });
  pk.addEventListener('drop', async (e) => { if (!hasFiles(e)) return; e.preventDefault(); e.stopPropagation(); pk.classList.remove('drop'); await uploadFiles([...e.dataTransfer.files]); });
  function photoAt(d, x, y) {   // the design's photo under a point of the page (topmost first)
    for (const el of d.elementsFromPoint(x, y)) { const p = el.closest && el.closest('[data-img]'); if (p && root() && root().contains(p)) return p; }
    return null;
  }
  async function dropOnDesign(files, target) {
    const done = await uploadFiles(files); if (!done.length) return;
    if (target) { await usePhoto(target.dataset.img, done[0], `Photo replaced with ${done[0].split('/').pop()}. Drag or resize it if it needs reframing.`); return; }
    const keys = imgKeys(); if (!keys.length) { status('Added to Your photos. This design has no photo to swap.'); return; }
    openPicker(photoIn(SEL) ? photoIn(SEL).dataset.img : keys[0]);
  }
  function dropTargets(d) {   // the page in the iframe (edit mode) and the stage around it
    const over = (e, x, y) => { if (!hasFiles(e)) return; e.preventDefault(); e.dataTransfer.dropEffect = 'copy'; stage.classList.add('dropping'); const t = d ? photoAt(d, x, y) : null; if (t !== HOV) { HOV = t; drawOverlay(); } };
    return { over, leave: () => { stage.classList.remove('dropping'); HOV = null; drawOverlay(); } };
  }
  function attachDrop(d) {
    const t = dropTargets(d);
    d.addEventListener('dragover', (e) => t.over(e, e.clientX, e.clientY));
    d.addEventListener('dragleave', (e) => { if (!e.relatedTarget) t.leave(); });
    d.addEventListener('drop', (e) => { if (!hasFiles(e)) return; e.preventDefault(); t.leave(); dropOnDesign([...e.dataTransfer.files], photoAt(d, e.clientX, e.clientY)); });
  }
  {
    const wrap = $('stagewrap');
    wrap.addEventListener('dragover', (e) => { if (!hasFiles(e)) return; e.preventDefault(); stage.classList.add('dropping'); const d = doc(); const sr = stage.getBoundingClientRect(); const t = d ? photoAt(d, (e.clientX - sr.left) / K, (e.clientY - sr.top) / K) : null; if (t !== HOV) { HOV = t; drawOverlay(); } });
    wrap.addEventListener('dragleave', (e) => { if (!wrap.contains(e.relatedTarget)) { stage.classList.remove('dropping'); HOV = null; drawOverlay(); } });
    wrap.addEventListener('drop', (e) => { if (!hasFiles(e)) return; e.preventDefault(); stage.classList.remove('dropping'); const d = doc(); const sr = stage.getBoundingClientRect(); const t = d ? photoAt(d, (e.clientX - sr.left) / K, (e.clientY - sr.top) / K) : null; HOV = null; drawOverlay(); dropOnDesign([...e.dataTransfer.files], t); });
  }

  /* ---------- export ---------- */
  function exportOptions() {
    const sel = $('xWhat'); const cur = sel.value; sel.innerHTML = '';
    const opts = CAR ? [['slide', 'This slide (PNG)'], ['all', DECK === 'linkedin' ? 'All slides (PNGs + PDF)' : 'All slides (PNGs)'], ...(DECK === 'linkedin' ? [['pdf', 'The PDF for LinkedIn']] : [])]
      : [['one', 'This thumbnail (PNG)'], ['all', 'All thumbnails + overview (PNGs)']];
    opts.push(['part', 'This part (PNG): what you selected']);
    for (const [v, t] of opts) { const o = document.createElement('option'); o.value = v; o.textContent = t; sel.appendChild(o); }
    if (opts.some(o => o[0] === cur)) sel.value = cur; updateSummary();
  }
  const outDir = () => `projects/${SLUG}/outputs/${CAR ? 'carousels/' + DECK : 'thumbnails'}/`;
  // the file name the part gets (as studio/tools/part.mjs names it)
  const partFile = (name) => (name.startsWith('img:') ? 'photo-' + name.slice(4) : name).replace(/[^A-Za-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60) || 'part';
  const partOpts = () => ({ scale: $('xScale').value === '2' ? 2 : 1, bg: $('xBg').value });
  function partName(el, o = partOpts()) { return `${CAR ? pad2(CUR) : CUR}_${partFile(nameOf(el))}${o.scale === 2 ? '@2x' : ''}${o.bg === 'ground' ? '-on-ground' : o.bg === 'all' ? '-crop' : ''}.png`; }
  if (prefs.xScale) $('xScale').value = prefs.xScale; if (prefs.xBg) $('xBg').value = prefs.xBg;
  for (const id of ['xScale', 'xBg']) $(id).addEventListener('input', () => { prefs[id] = $(id).value; savePrefs(); updateSummary(); });
  async function downloadPart(el) {
    if (!el || !el.isConnected) { status('Click something on the design first (a text, a photo or a whole block), then download it.', true); return; }
    if (TYPING) await commitText(); await busy;
    const name = nameOf(el), o = partOpts();
    await JOBS.start(CAR ? { kind: 'design', group: 'carousels', deck: DECK, slide: CUR, what: 'part', part: name, ...o }
      : { kind: 'design', group: 'thumbnails', item: CUR, what: 'part', part: name, ...o });
    status(`Making ${partName(el, o)}… it downloads by itself when it is ready (saved in ${outDir()}parts/ too).`);
  }
  function updateSummary() {
    if (!$('xWhat').options.length) return;
    const w = $('xWhat').value; $('xPart').hidden = w !== 'part';
    if (w === 'part') {
      const el = SEL && SEL.isConnected ? SEL : null; const o = partOpts();
      $('xSummary').textContent = el ? `${label(el)}\n${partName(el, o)} · ${o.scale === 2 ? 'double size' : 'full size'} · ${o.bg === 'none' ? 'see-through background' : o.bg === 'ground' ? 'on the ground colour' : 'with everything behind it'}`
        : 'Click something on the design first: a text, a photo, or a whole block (it downloads with everything inside it).';
      $('xSummary').style.whiteSpace = 'pre-line';
      $('xNote').textContent = `Saved to Downloads and to ${outDir()}parts/. Hidden things stay hidden; your moves, sizes, colours and photos are kept.`;
      return;
    }
    const what = CAR ? (w === 'slide' ? `${pad2(CUR)}.png` : w === 'pdf' ? 'carousel.pdf' : `01.png … ${pad2(CONTENT.slides.length)}.png${DECK === 'linkedin' ? ' + carousel.pdf' : ''} + overview.png`)
      : (w === 'one' ? `${CUR}.png (1280×720)` : `${ITEMS.length} PNGs + overview.png`);
    $('xSummary').textContent = what; $('xSummary').style.whiteSpace = 'pre-line';
    $('xNote').textContent = `Saved to Downloads and to ${outDir()} (it replaces the file with the same name there; your design source is not touched).`;
  }
  $('xWhat').addEventListener('input', updateSummary);
  const JOBS = Shell.jobs({
    slug: SLUG, filter: (s) => s.kind === 'design' && s.group === GROUP && (!CAR || s.deck === DECK),
    name: (s) => (s.what === 'part' ? `${CAR ? 'Slide ' + s.slide : s.item}: part “${String(s.part).replace(/^img:/, 'photo ')}”` : CAR ? ({ slide: `Slide ${s.slide}`, all: 'All slides', pdf: 'PDF' })[s.what] : s.what === 'all' ? 'All thumbnails' : s.item),
  });
  $('xGo').onclick = async () => {
    if (TYPING) await commitText(); await busy;
    const w = $('xWhat').value;
    if (w === 'part') return downloadPart(SEL);
    await JOBS.start(CAR ? { kind: 'design', group: 'carousels', deck: DECK, what: w, slide: CUR } : { kind: 'design', group: 'thumbnails', what: w, item: CUR });
    status('Exporting… it downloads by itself when it is ready.');
  };

  /* ---------- edit mode + keys ---------- */
  function setEditing(on) {
    editing = on; if (!on && TYPING) commitText();
    $('tEdit').setAttribute('aria-pressed', String(on)); $('tEdit').textContent = on ? 'Done' : '✎ Edit';
    stage.classList.toggle('editing', on); try { doc().documentElement.classList.toggle('studio-edit', on); } catch { }
    if (!on) { SEL = null; HOV = null; hideTbar(); } drawOverlay();
    $('hintText').textContent = on ? 'Click any text to rewrite it (Enter saves, Shift+Enter = new line). Drag anything to move it. Changes save by themselves.' : 'Preview. Press ✎ Edit to change things.';
  }
  $('tEdit').onclick = () => setEditing(!editing);
  let nudgeT = 0, kn = null;
  function onKey(e) {
    if (TYPING || typing(e) || !$('picker').hidden) { if (e.key === 'Escape' && !$('picker').hidden) closePicker(); return; }
    const mod = e.metaKey || e.ctrlKey;
    if (mod && e.key.toLowerCase() === 'z') { e.preventDefault(); e.shiftKey ? hist.redo() : hist.undo(); return; }
    if (mod && e.key.toLowerCase() === 'y') { e.preventDefault(); hist.redo(); return; }
    if (mod) return;
    const arrows = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] };
    if (arrows[e.key] && SEL && editing) {
      e.preventDefault(); const name = nameOf(SEL); const st = e.shiftKey ? 10 : 1;
      if (!kn || kn.name !== name) { const n = nudgeOf(name); kn = { name, el: SEL, dx: n.dx || 0, dy: n.dy || 0 }; }
      kn.dx += arrows[e.key][0] * st; kn.dy += arrows[e.key][1] * st; kn.el.style.translate = `${kn.dx}px ${kn.dy}px`; drawOverlay();
      clearTimeout(nudgeT); nudgeT = setTimeout(() => { const k = kn; kn = null; setNudge(k.name, { dx: k.dx, dy: k.dy }, 'Moved.', { select: k.name }); }, 450);
      return;
    }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { const ids = ITEMS.map(x => (CAR ? x.n : x.id)); const i = ids.findIndex(x => String(x) === String(CUR)); const j = i + (e.key === 'ArrowRight' ? 1 : -1); if (j >= 0 && j < ids.length) go(ids[j]); return; }
    if (e.key.toLowerCase() === 'e') setEditing(!editing);
    else if (e.key === 'Escape') select(SEL && editing ? outsideOf(SEL) : null);   // up one level, then nothing
    else if (e.key === 'Enter' && SEL && editing && !(e.target && e.target.tagName === 'BUTTON')) {
      e.preventDefault();
      if (e.shiftKey) { const up = outsideOf(SEL); if (up) select(up); return; }
      const inn = insideOf(SEL); if (inn) select(inn); else if (isText(SEL)) startText(SEL);
    }
    else if ((e.key === 'Delete' || e.key === 'Backspace') && SEL && editing) { const name = nameOf(SEL); SEL = null; setNudge(name, { hide: true }, 'Hidden. Bring it back from “Moved, resized or hidden” on the right.'); }
  }
  document.addEventListener('keydown', onKey);
  document.addEventListener('pointerdown', (e) => { if (TYPING && !tbar.contains(e.target) && !stage.contains(e.target)) commitText(); });

  /* ---------- boot ---------- */
  async function boot() {
    try {
      await Promise.all([loadItems(), loadPalette()]);
      const q = new URLSearchParams(location.search);
      if (CAR) { const s = +q.get('s') || prefs.s || 1; CUR = Math.min(Math.max(1, s), ITEMS.length); hist.setKey(itemKey()); V.refresh(); }
      else { const want = q.get('d') || prefs.d; CUR = (ITEMS.find(x => x.id === want) || ITEMS[0]).id; CONTENT = await json(api() + '/content'); LOADED = SAVED = JSON.stringify(CONTENT); hist.setKey(itemKey()); V.refresh(); }
      $('checkPane').hidden = !CAR;
      header(); fit(); buildStrip(); stripButtons(); exportOptions();
      history.replaceState(null, '', location.pathname + (CAR ? `?s=${CUR}` : `?d=${encodeURIComponent(CUR)}`));
      await reload({ strip: false });
      saveState(`Saving into ${designDir()}/content.json`.replace('directions/' + CUR + '/', 'directions/…/'));
      JOBS.poll();
    } catch (e) { $('loading').textContent = 'The design did not load: ' + e.message; console.error(e); }
  }
  // the palette and the photos are shared by every editor of the project: pick up changes made in another tab
  addEventListener('focus', async () => {
    const before = JSON.stringify(PALETTE); await loadPalette(); if (JSON.stringify(PALETTE) !== before && CONTENT) colourPane();
    if (PICK != null) refreshAssets();
  });
  // test hook (headless checks)
  window.DESIGN = { get CUR() { return CUR; }, content: () => CONTENT, palette: () => PALETTE, assets: () => ASSETS, go, select: (name) => select(findByName(name)), find: findByName, sel: () => (SEL ? nameOf(SEL) : null), downloadPart: () => downloadPart(SEL), doc, idle: () => busy, K: () => K };
  boot();
})();
