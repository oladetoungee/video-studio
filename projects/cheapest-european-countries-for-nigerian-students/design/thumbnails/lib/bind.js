// Fills a thumbnail from its content.json so text and options can be edited without touching HTML.
//   [data-k="key"]      -> innerHTML = content.text[key]   (inline <em>, <span class="o|acc|serif"> allowed)
//                          keys with a dot ("chapters.3", "books.0.title") are paths into content.json; the
//                          direction's layout() fills those (the studio editor writes them back to that path)
//   [data-img="key"]    -> src = content.images[key]
//   content.vars        -> CSS custom properties on .t   (e.g. {"--face-x": "640px", "--ground": "#111114"})
//   content.class       -> extra classes on .t           (layout options)
//   content.nudge       -> moves made in the studio editor: {"<name>": {dx, dy, s, hide}}; <name> is an element's
//                          data-move, else its data-k, else "img:<data-img>". dx/dy in px, s = scale.
(async () => {
  const t = document.querySelector('.t');
  try {
    const c = await (await fetch('content.json', { cache: 'no-store' })).json();
    for (const el of document.querySelectorAll('[data-k]')) {
      if (el.dataset.k.includes('.')) continue;
      const v = (c.text || {})[el.dataset.k];
      if (v == null || v === '') el.style.display = 'none'; else el.innerHTML = v;
    }
    for (const el of document.querySelectorAll('[data-img]')) {
      const v = (c.images || {})[el.dataset.img]; if (v) el.src = v;
    }
    for (const [k, v] of Object.entries(c.vars || {})) t.style.setProperty(k, v);
    for (const cl of (c.class || '').split(/\s+/).filter(Boolean)) t.classList.add(cl);
    if (typeof window.layout === 'function') window.layout(c);
    const nameOf = (el) => el.dataset.move || el.dataset.k || (el.dataset.img ? 'img:' + el.dataset.img : '');
    for (const el of document.querySelectorAll('[data-move], [data-k], [data-img]')) {
      const n = (c.nudge || {})[nameOf(el)]; if (!n) continue;
      if (n.dx || n.dy) el.style.translate = `${n.dx || 0}px ${n.dy || 0}px`;
      if (n.s && n.s !== 1) el.style.scale = String(n.s);
      if (n.hide) el.style.visibility = 'hidden';
    }
  } catch (e) { console.error('bind', e); }
  if (location.search.includes('guides')) { t.classList.add('guides'); const b = document.createElement('div'); b.className = 'badge'; t.appendChild(b); }
  await document.fonts.ready;
  // realistic phones (library/ui/phone.js, her note 2026-11-09)
  if (document.querySelector('.phone')) { try { if (!window.upgradePhones) await new Promise((ok) => { const s = document.createElement('script'); s.src = '../../lib/phone.js'; s.onload = s.onerror = ok; document.head.appendChild(s); }); window.upgradePhones && window.upgradePhones(); } catch (e) { console.error('phone', e); } }
  if (window.__extra) { try { await window.__extra(); } catch (e) { console.error('extra', e); } }   // remakes: pixelated words etc. (lib/rm.js)
  await Promise.all([...document.images].map(i => i.complete ? 0 : new Promise(r => { i.onload = i.onerror = r; })));
  window.__ready = true;
})();
