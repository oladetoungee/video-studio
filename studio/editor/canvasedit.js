/* Edit layer for canvas editors (film + moments): hit boxes over the canvas from EL.list (what the runtime drew this
 * frame), drag to move (per frame size), corner handles + size slider to resize boxes (photos, cards: grp), click to
 * open the popover (rewrite text, hide, reset). Writes the edits format of studio/runtime/core.js:
 *   t["<scene>/<key>"] = { s, hide, pos: { "16x9": {dx, dy, k, hide}, "9x16": {...} } }
 * o: { stage, overlay, edits() -> the live edits object, snapshot(), changed(msg), render() (redraw now, no overlay),
 *      playing() -> bool, pause(), caption: { text(e), set(e, v|null), edited(e) } } */
'use strict';
window.CanvasEdit = function (o) {
  const $ = (id) => document.getElementById(id);
  const { stage, overlay } = o;
  let SEL = null, POP = null, DRAG = null;
  const scale = () => stage.clientWidth / CW;
  const ED = () => o.edits();
  const layoutName = () => (ASPECTS[ASPECT] ? ASPECTS[ASPECT].label : LAYOUT.replace('x', ':')) + (ASPECT === '4x5' ? ' (shares 9:16)' : '');
  const posOf = (id) => { const t = ED().t[id]; return (t && t.pos && t.pos[LAYOUT]) || {}; };

  /** change one element's override. patch: {s}, {hide}, {pos: {dx, dy, k, hide} | null (resets place + size here)} */
  function setOv(id, patch) {
    const E = ED(); const v = JSON.parse(JSON.stringify(E.t[id] || {}));
    if ('s' in patch) { if (patch.s == null) delete v.s; else v.s = patch.s; }
    if ('hide' in patch) { if (patch.hide) v.hide = true; else delete v.hide; }
    if ('pos' in patch) {
      v.pos = v.pos || {}; const p = { ...(v.pos[LAYOUT] || {}) };
      if (patch.pos === null) { delete p.dx; delete p.dy; delete p.k; } else Object.assign(p, patch.pos);
      if (p.dx != null) p.dx = Math.round(p.dx * 10) / 10; if (p.dy != null) p.dy = Math.round(p.dy * 10) / 10; if (p.k != null) p.k = Math.round(p.k * 1000) / 1000;
      if (!p.dx) delete p.dx; if (!p.dy) delete p.dy; if (!p.k || Math.abs(p.k - 1) < 0.005) delete p.k; if (!p.hide) delete p.hide;
      if (Object.keys(p).length) v.pos[LAYOUT] = p; else delete v.pos[LAYOUT];
      if (!Object.keys(v.pos).length) delete v.pos;
    }
    if (v.s == null && !v.hide && !v.pos) delete E.t[id]; else E.t[id] = v;
  }

  function build() {
    overlay.innerHTML = ''; const k = scale(); const seen = new Set();
    if (ASPECT === '9x16') for (const [y, lab] of [[SAFE.top, 'platform UI above'], [SAFE.capTop, 'captions band'], [SAFE.bottom, 'platform UI below']]) {
      const d = document.createElement('div'); d.className = 'safe'; d.style.top = (y * k) + 'px'; d.style.borderTopWidth = '1px'; d.dataset.l = lab; overlay.appendChild(d);
    }
    const els = EL.list.filter(e => { if (seen.has(e.id)) return false; seen.add(e.id); return e.w > 0 && e.h > 0; }).sort((a, b) => b.w * b.h - a.w * a.h);
    for (const e of els) {
      const d = document.createElement('div');
      d.className = 'hit' + (e.edited ? ' edited' : '') + (e.hidden ? ' ghost' : '') + (e.kind === 'caption' ? ' caption' : '') + (SEL === e.id ? ' sel' : '');
      const pad = 4; d.style.left = (e.x * k - pad) + 'px'; d.style.top = (e.y * k - pad) + 'px'; d.style.width = (e.w * k + pad * 2) + 'px'; d.style.height = (e.h * k + pad * 2) + 'px';
      d.title = (e.text != null ? e.text.replace(/\n/g, ' / ') : e.img ? 'photo: ' + (e.label || '') : e.label || e.id) + (e.kind === 'caption' ? ' (caption)' : '') + (e.hidden ? ' (hidden: click to show it again)' : '');
      d.addEventListener('pointerdown', (ev) => startDrag(ev, e, d));
      overlay.appendChild(d);
      if (SEL === e.id && e.kind === 'box' && !e.hidden && !DRAG) for (const c of ['nw', 'ne', 'sw', 'se']) {
        const h = document.createElement('div'); h.className = 'hdl ' + c; h.title = 'Drag to resize';
        h.style.left = ((c[1] === 'w' ? e.x : e.x + e.w) * k - 7) + 'px'; h.style.top = ((c[0] === 'n' ? e.y : e.y + e.h) * k - 7) + 'px';
        h.addEventListener('pointerdown', (ev) => startResize(ev, e, h)); overlay.appendChild(h);
      }
    }
  }
  function startDrag(ev, e, el) {
    ev.preventDefault(); ev.stopPropagation(); if (o.playing()) o.pause();
    const k = scale(); const cur = posOf(e.id); const ek = (e.k || 1) / (e.sk || 1);   // the element's own size edit does not change how far it moves
    const prevSel = SEL; const wasSel = SEL != null && EL.list.some(x => x.id === SEL) && (() => { const r = stage.getBoundingClientRect(), k = scale(); const px = (ev.clientX - r.left) / k, py = (ev.clientY - r.top) / k; const x = EL.list.find(q => q.id === SEL); return px >= x.x - 4 / k && px <= x.x + x.w + 4 / k && py >= x.y - 4 / k && py <= x.y + x.h + 4 / k; })();
    DRAG = { e, sx: ev.clientX, sy: ev.clientY, ox: cur.dx || 0, oy: cur.dy || 0, moved: false, snap: false };
    el.setPointerCapture(ev.pointerId);
    const move = (m) => {
      const dx = (m.clientX - DRAG.sx) / k / ek, dy = (m.clientY - DRAG.sy) / k / ek;
      if (!DRAG.moved && Math.hypot(m.clientX - DRAG.sx, m.clientY - DRAG.sy) < 4) return;
      if (e.kind === 'caption' || e.hidden) return;   // captions sit in their band; a hidden box opens on click
      if (!DRAG.snap) { o.snapshot(); DRAG.snap = true; $('pop').hidden = true; POP = null; }
      DRAG.moved = true; setOv(e.id, { pos: { dx: DRAG.ox + dx, dy: DRAG.oy + dy } }); setEdits(ED()); SEL = e.id; o.render();
      el.classList.add('dragging', 'sel'); el.style.transform = `translate(${m.clientX - DRAG.sx}px, ${m.clientY - DRAG.sy}px)`;
    };
    const up = () => {
      el.removeEventListener('pointermove', move); el.removeEventListener('pointerup', up); el.removeEventListener('pointercancel', up);
      const moved = DRAG.moved; DRAG = null;
      if (moved) { el.style.transform = ''; o.changed(`Moved in ${layoutName()}. Other frame sizes keep their own position.`); }
      else {
        // overlapping elements (her note 2026-10-18: the big overlay text under a short's label could never be picked, so it
        // could not be hidden): clicking the same spot again picks the next element underneath, round and round
        const r = stage.getBoundingClientRect(), k = scale(); const px = (ev.clientX - r.left) / k, py = (ev.clientY - r.top) / k;
        const seen = new Set(); const under = EL.list.filter(x => { if (seen.has(x.id)) return false; seen.add(x.id); return x.w > 0 && x.h > 0 && px >= x.x - 4 / k && px <= x.x + x.w + 4 / k && py >= x.y - 4 / k && py <= x.y + x.h + 4 / k; }).sort((a, b) => a.w * a.h - b.w * b.h);
        let pick = e; if (under.length > 1 && wasSel) { const i = under.findIndex(x => x.id === prevSel); pick = under[(i + 1) % under.length]; }
        openPop(pick, under.length > 1);
      }
    };
    el.addEventListener('pointermove', move); el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up);
  }
  function startResize(ev, e, h) {
    ev.preventDefault(); ev.stopPropagation(); h.setPointerCapture(ev.pointerId);
    const k = scale(), r = stage.getBoundingClientRect(); const cx = r.left + (e.x + e.w / 2) * k, cy = r.top + (e.y + e.h / 2) * k;
    const d0 = Math.max(6, Math.hypot(ev.clientX - cx, ev.clientY - cy)); const k0 = posOf(e.id).k || 1; let kk = k0, snap = false;
    const move = (m) => {
      if (!snap) { o.snapshot(); snap = true; DRAG = { resize: true }; }
      kk = Math.max(0.2, Math.min(4, k0 * Math.hypot(m.clientX - cx, m.clientY - cy) / d0));
      setOv(e.id, { pos: { k: kk } }); setEdits(ED()); o.render();
      const sz = $('popSize'); if (sz && POP && POP.id === e.id) { sz.value = Math.round(kk * 100); $('popSizeV').textContent = Math.round(kk * 100) + '%'; }
    };
    const up = () => { h.removeEventListener('pointermove', move); h.removeEventListener('pointerup', up); DRAG = null; if (snap) o.changed(`Resized to ${Math.round(kk * 100)}% in ${layoutName()}.`); else build(); };
    h.addEventListener('pointermove', move); h.addEventListener('pointerup', up);
  }

  /* popover */
  function openPop(e, stacked) {
    SEL = e.id; POP = e; const p = $('pop'); p.hidden = false;
    refreshPop(true);
    { const hint = $('popStack'); if (hint) hint.hidden = !stacked; }
    const r = stage.getBoundingClientRect(), k = scale();
    let x = r.left + (e.x + e.w) * k + 12, y = r.top + e.y * k;
    if (x + 390 > innerWidth) x = Math.max(8, r.left + e.x * k - 392); if (x < 8) x = 8;
    y = Math.min(Math.max(8, y), innerHeight - p.offsetHeight - 8);
    p.style.left = x + 'px'; p.style.top = y + 'px';
    build(); if (e.text != null) { $('popText').focus(); $('popText').select(); }
  }
  function refreshPop(init) {
    const e = POP; if (!e) return; const ov = ED().t[e.id] || {}; const here = posOf(e.id);
    const isCap = e.kind === 'caption', isBox = e.kind === 'box', hasText = e.text != null;
    $('popId').textContent = (isCap ? 'caption' + (e.cue != null ? ' · ' + (e.cue + 1) : '') : e.img ? 'photo · ' + (e.label || e.id) : e.id) + (here.dx || here.dy ? `  · moved in ${LAYOUT.replace('x', ':')}` : '');
    $('popText').hidden = !hasText; $('popHint').hidden = !hasText; $('popApply').hidden = !hasText;
    $('popMarkup').hidden = !e.markup;
    if (init && hasText) $('popText').value = isCap ? o.caption.text(e) : (ov.s != null ? ov.s : e.text);
    $('popSizeRow').hidden = !isBox;
    if (isBox) { const v = Math.round((here.k || 1) * 100); $('popSize').value = v; $('popSizeV').textContent = v + '%'; }
    $('popHide').hidden = isCap || isBox; $('popHide').textContent = ov.hide ? 'Show again' : 'Hide';
    $('popHideHere').hidden = !isBox; $('popHideHere').textContent = here.hide ? `Show again in ${LAYOUT.replace('x', ':')}` : `Hide in ${LAYOUT.replace('x', ':')}`;
    if (isBox && ov.hide) { $('popHide').hidden = false; $('popHide').textContent = 'Show again (all sizes)'; }
    if ($('popSwap')) $('popSwap').hidden = !(e.swap && o.swapPicture);   // a swappable picture (the ending's thumbnail / her round photo)
    $('popResetPos').hidden = isCap || !(here.dx || here.dy || here.k);
    $('popResetPos').textContent = isBox ? 'Reset place + size' : 'Reset position';
    $('popReset').disabled = isCap ? !o.caption.edited(e) : !ED().t[e.id];
  }
  function close() { $('pop').hidden = true; POP = null; SEL = null; o.closed && o.closed(); }
  $('popClose').onclick = close;
  $('popApply').onclick = () => {
    const e = POP; if (!e) return; const v = $('popText').value.replace(/\r/g, '').replace(/\s+$/, '');
    o.snapshot();
    if (e.kind === 'caption') o.caption.set(e, v);
    else { const def = e.def != null ? e.def : e.text; setOv(e.id, { s: v === def ? null : v }); }
    o.changed('Text changed. It applies to every frame size.');
  };
  // Enter applies (what she expects); Shift+Enter is a new line
  $('popText').addEventListener('keydown', (ev) => { if (ev.key === 'Enter' && !ev.shiftKey) { ev.preventDefault(); $('popApply').click(); } if (ev.key === 'Escape') close(); });
  $('popHide').onclick = () => { const e = POP; if (!e) return; o.snapshot(); setOv(e.id, { hide: !(ED().t[e.id] && ED().t[e.id].hide) }); o.changed(ED().t[e.id] && ED().t[e.id].hide ? 'Hidden in every frame size.' : 'Shown again.'); };
  $('popHideHere').onclick = () => { const e = POP; if (!e) return; o.snapshot(); const h = !posOf(e.id).hide; setOv(e.id, { pos: { hide: h } }); o.changed(h ? `Hidden in ${layoutName()} only. Click its dashed box to show it again.` : `Shown again in ${layoutName()}.`); };
  if ($('popSwap')) $('popSwap').onclick = () => { const e = POP; if (e && o.swapPicture) o.swapPicture(e); };
  $('popResetPos').onclick = () => { const e = POP; if (!e) return; o.snapshot(); setOv(e.id, { pos: null }); o.changed('Back to its original place and size in ' + layoutName() + '.'); };
  $('popReset').onclick = () => {
    const e = POP; if (!e) return; o.snapshot();
    if (e.kind === 'caption') o.caption.set(e, null); else delete ED().t[e.id];
    o.changed('Back to the original.'); refreshPop(true);
  };
  let sizeSnap = false;
  $('popSize').addEventListener('input', () => {
    const e = POP; if (!e) return; if (!sizeSnap) { o.snapshot(); sizeSnap = true; }
    const v = +$('popSize').value; $('popSizeV').textContent = v + '%'; setOv(e.id, { pos: { k: v / 100 } }); setEdits(ED()); o.render(); build();
  });
  $('popSize').addEventListener('change', () => { sizeSnap = false; o.changed(`Resized to ${$('popSize').value}% in ${layoutName()}.`); });

  return {
    build, close, setOv,
    refresh: () => { if (POP) refreshPop(); },
    open: (id) => { const e = EL.list.find(x => x.id === id); if (e) openPop(e); return !!e; },
    get sel() { return SEL; }, get pop() { return POP; },
  };
};
