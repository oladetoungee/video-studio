/* Deck engine. Plain script (works from file:// and offline).
   A slide is registered with D.slide({ id, sec, t, bg, notes, html, on, enter }).
   Inside html, any element with data-a="up|down|left|right|pop|zoom|drop|wipe|wipeup|rise|blur|fade|type|count|draw"
   arrives at its step: data-s="n" (default 0 = when the slide opens), data-d="ms" delay inside that step.
   data-out="n" leaves at step n. data-dim="n" dims at step n (data-undim="m" brings it back).
   .hl / .strike elements with data-s switch on like the others.
   on(step, el, api, animate) runs custom motion for a step (called for every step up to the current one when jumping). */
(function () {
  const D = window.D = { slides: [], i: 0, step: 0 };
  const qs = new URLSearchParams(location.search);
  const STATIC = qs.has('static');           // thumbnails / print: no motion, final state
  D.static = STATIC;

  D.slide = (s) => { D.slides.push(s); };

  /* --- helpers slides can use --- */
  D.esc = (t) => String(t).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  D.wait = (ms) => new Promise(r => setTimeout(r, ms));

  // Typewriter for an element whose innerHTML may hold spans (code highlighting).
  function typeIn(el, animate) {
    if (!el._chars) {
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      const nodes = []; let n; while ((n = walker.nextNode())) nodes.push(n);
      el._chars = [];
      nodes.forEach(node => {
        const frag = document.createDocumentFragment();
        for (const ch of node.textContent) {
          const sp = document.createElement('span'); sp.textContent = ch; sp.style.opacity = 0; frag.appendChild(sp); el._chars.push(sp);
        }
        node.parentNode.replaceChild(frag, node);
      });
    }
    clearInterval(el._timer);
    const chars = el._chars;
    if (!animate) { chars.forEach(c => c.style.opacity = 1); return; }
    chars.forEach(c => c.style.opacity = 0);
    const cps = +(el.dataset.cps || 45); // characters per second
    const start = performance.now() + (+el.dataset.d || 0);
    el._timer = setInterval(() => {
      const k = Math.floor((performance.now() - start) / 1000 * cps);
      for (let j = 0; j < chars.length && j < k; j++) chars[j].style.opacity = 1;
      if (k >= chars.length) clearInterval(el._timer);
    }, 16);
  }
  function countUp(el, animate) {
    const to = parseFloat(el.dataset.to), dec = +(el.dataset.dec || 0), pre = el.dataset.pre || '', suf = el.dataset.suf || '';
    const fmt = (v) => pre + v.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec, useGrouping: el.dataset.nogroup == null }) + suf;
    cancelAnimationFrame(el._raf);
    if (!animate) { el.textContent = fmt(to); return; }
    const dur = +(el.dataset.dur || 1400), t0 = performance.now() + (+el.dataset.d || 0);
    el.textContent = fmt(0);
    const tick = (now) => {
      const p = Math.min(1, Math.max(0, (now - t0) / dur)), e = 1 - Math.pow(1 - p, 4);
      el.textContent = fmt(to * e);
      if (p < 1) el._raf = requestAnimationFrame(tick);
    };
    el._raf = requestAnimationFrame(tick);
  }
  function drawPath(el, on, animate) {
    // el is an svg path/line/polyline (or a <g> holding them)
    const parts = el.tagName === 'g' ? [...el.querySelectorAll('path,line,polyline,circle,rect')] : [el];
    parts.forEach(p => {
      const L = p.getTotalLength ? p.getTotalLength() : 1000;
      p.style.strokeDasharray = L;
      p.style.transition = animate ? `stroke-dashoffset ${el.dataset.dur || 900}ms var(--ease) ${el.dataset.d || 0}ms` : 'none';
      p.style.strokeDashoffset = on ? 0 : L;
    });
  }
  D.typeIn = typeIn; D.countUp = countUp;

  /* --- build DOM --- */
  let stage;
  function build() {
    stage = document.getElementById('stage');
    D.slides.forEach((s, idx) => {
      const el = document.createElement('section');
      el.className = 'slide bg-' + (s.bg || 'paper');
      el.id = 's-' + (s.id || idx);
      el.innerHTML = s.html;
      stage.appendChild(el);
      s.el = el;
      let max = 0;
      el.querySelectorAll('[data-s],[data-out],[data-dim],[data-undim]').forEach(n => {
        ['s', 'out', 'dim', 'undim'].forEach(k => { if (n.dataset[k] != null) max = Math.max(max, +n.dataset[k]); });
      });
      s.steps = Math.max(max, s.steps || 0);
      if (s.init) s.init(el);
    });
  }

  function apply(s, step, animate) {
    const el = s.el;
    el.classList.toggle('instant', !animate);
    el.querySelectorAll('[data-a],.hl,.strike,[data-dim]').forEach(n => {
      const at = +(n.dataset.s || 0), out = n.dataset.out != null ? +n.dataset.out : Infinity;
      const show = step >= at && step < out;
      const fresh = animate && (step === at || (step === out));
      if (n.dataset.d) n.style.setProperty('--d', (fresh ? n.dataset.d : 0) + 'ms');
      else n.style.setProperty('--d', '0ms');
      if (n.classList.contains('hl')) n.style.setProperty('--hd', (fresh ? (n.dataset.d || 0) : 0) + 'ms');
      const was = n.classList.contains('on');
      n.classList.toggle('on', show);
      const a = n.dataset.a;
      if (a === 'type' && show && (!was || !animate)) typeIn(n, animate && step === at);
      if (a === 'count' && show && (!was || !animate)) countUp(n, animate && step === at);
      if (a === 'draw') drawPath(n, show, animate && (step === at || step === out));
      if (n.dataset.dim != null) {
        const dimAt = +n.dataset.dim, undim = n.dataset.undim != null ? +n.dataset.undim : Infinity;
        n.classList.toggle('dimmed', step >= dimAt && step < undim);
      }
    });
    if (s.on) {
      if (animate) s.on(step, el, D, true);
      else for (let k = 0; k <= step; k++) s.on(k, el, D, false);
    }
    if (!animate) { void el.offsetWidth; el.classList.remove('instant'); }
  }

  function show(i, step, animate) {
    i = Math.max(0, Math.min(D.slides.length - 1, i));
    const prev = D.slides[D.i];
    const s = D.slides[i];
    if (prev && prev !== s) { prev.el.classList.remove('cur'); if (prev.leave) prev.leave(prev.el, D); }
    const entering = prev !== s || !s.el.classList.contains('cur');
    s.el.classList.add('cur');
    D.i = i; D.step = Math.max(0, Math.min(s.steps, step));
    if (entering) {
      // restart CSS animations (slow pushes) on entry
      s.el.querySelectorAll('.push').forEach(p => { p.style.animation = 'none'; void p.offsetWidth; p.style.animation = ''; });
      // reset everything to hidden first so the entrance plays
      s.el.classList.add('instant');
      s.el.querySelectorAll('[data-a],.hl,.strike').forEach(n => { n.classList.remove('on'); if (n.dataset.a === 'draw') drawPath(n, false, false); });
      void s.el.offsetWidth; s.el.classList.remove('instant');
      if (s.enter) s.enter(s.el, D, animate);
    }
    if (animate && entering) {
      // play step 0 animated, then (if jumping) later steps instantly
      if (D.step === 0) requestAnimationFrame(() => apply(s, 0, true));
      else apply(s, D.step, false);
    } else apply(s, D.step, animate);
    if (!STATIC) history.replaceState(null, '', '#' + (i + 1) + (D.step ? '.' + D.step : ''));
    const pr = document.getElementById('progress'); if (pr) pr.style.width = ((i + 1) / D.slides.length * 100) + '%';
    broadcast();
  }
  D.go = show;
  D.next = () => { const s = D.slides[D.i]; if (D.step < s.steps) { D.step++; apply(s, D.step, true); broadcast(); if (!STATIC) history.replaceState(null, '', '#' + (D.i + 1) + '.' + D.step); } else if (D.i < D.slides.length - 1) show(D.i + 1, 0, true); };
  D.prev = () => { const s = D.slides[D.i]; if (D.step > 0) { D.step--; apply(s, D.step, false); broadcast(); } else if (D.i > 0) show(D.i - 1, D.slides[D.i - 1].steps, false); };

  /* --- scale stage to window --- */
  function fit() {
    const k = Math.min(innerWidth / 1920, innerHeight / 1080);
    stage.style.transformOrigin = '50% 50%';
    stage.style.transform = `translate(-50%, -50%) scale(${k})`;
  }

  /* --- presenter window link --- */
  let presenter = null;
  function broadcast() {
    const s = D.slides[D.i];
    const msg = { type: 'state', i: D.i, step: D.step, steps: s.steps, total: D.slides.length,
      slides: D.slides.map(x => ({ id: x.id, sec: x.sec, t: x.t, notes: x.notes || '', steps: x.steps })) };
    try { if (presenter && !presenter.closed) presenter.postMessage(msg, '*'); } catch (e) {}
    try { if (window.opener && window.opener !== window && D.isPresenterChild) window.opener.postMessage(msg, '*'); } catch (e) {}
  }
  window.addEventListener('message', (e) => {
    const m = e.data || {};
    if (m.type === 'next') D.next();
    if (m.type === 'prev') D.prev();
    if (m.type === 'goto') show(m.i, m.step || 0, false);
    if (m.type === 'hello') { presenter = e.source; broadcast(); }
  });

  /* --- overview grid (G) --- */
  function overview(open) {
    const ov = document.getElementById('overview');
    if (open === undefined) open = !ov.classList.contains('open');
    ov.classList.toggle('open', open);
    if (!open) { ov.innerHTML = ''; return; }
    D.slides.forEach((s, idx) => {
      const th = document.createElement('div'); th.className = 'th' + (idx === D.i ? ' cur' : '');
      const inner = document.createElement('div'); inner.className = 'inner';
      const clone = s.el.cloneNode(true); clone.classList.add('cur', 'instant');
      clone.querySelectorAll('[data-a],.hl,.strike').forEach(n => n.classList.add('on'));
      clone.querySelectorAll('[data-a="type"] span').forEach(n => n.style.opacity = 1);
      inner.appendChild(clone); th.appendChild(inner);
      const lab = document.createElement('div'); lab.className = 'lab'; lab.textContent = (idx + 1) + ' · ' + (s.id || ''); th.appendChild(lab);
      th.onclick = () => { overview(false); show(idx, 0, true); };
      ov.appendChild(th);
      requestAnimationFrame(() => { inner.style.transform = `scale(${th.clientWidth / 1920})`; });
    });
  }

  /* --- keys --- */
  let jump = '';
  function key(e) {
    const k = e.key;
    if (document.getElementById('overview').classList.contains('open') && k === 'Escape') return overview(false);
    if (['ArrowRight', 'ArrowDown', 'PageDown', ' ', 'Enter', 'n'].includes(k) && !(k === 'Enter' && jump)) { e.preventDefault(); D.next(); }
    else if (['ArrowLeft', 'ArrowUp', 'PageUp', 'Backspace', 'p'].includes(k) && !(k === 'p' && e.shiftKey)) { e.preventDefault(); D.prev(); }
    else if (k === 'Home') show(0, 0, true);
    else if (k === 'End') show(D.slides.length - 1, 0, true);
    else if (/^[0-9]$/.test(k)) { jump += k; return; }
    else if (k === 'Enter' && jump) { show(+jump - 1, 0, true); }
    else if (k === 'g' || k === 'G') overview();
    else if (k === 'b' || k === 'B' || k === '.') document.getElementById('blackout').classList.toggle('on');
    else if (k === 't' || k === 'T') { const h = document.documentElement; h.dataset.theme = h.dataset.theme === 'stage' ? '' : 'stage'; try { localStorage.setItem('deck.theme', h.dataset.theme); } catch (e) {} }
    else if (k === 'f' || k === 'F') { if (!document.fullscreenElement) document.documentElement.requestFullscreen(); else document.exitFullscreen(); }
    else if (k === 'P' || k === 's' || k === 'S') { presenter = window.open('presenter.html', 'presenter', 'width=1400,height=900'); setTimeout(broadcast, 800); }
    else if (k === 'r' || k === 'R') show(D.i, 0, true); // replay this slide's motion
    jump = '';
  }

  /* --- boot --- */
  window.addEventListener('DOMContentLoaded', () => {
    try { const t = localStorage.getItem('deck.theme'); if (t) document.documentElement.dataset.theme = t; } catch (e) {}
    if (qs.get('theme')) document.documentElement.dataset.theme = qs.get('theme');
    build(); fit();
    addEventListener('resize', fit);
    if (!STATIC) {
      addEventListener('keydown', key);
      let mt; addEventListener('mousemove', () => { document.body.classList.add('cursor'); clearTimeout(mt); mt = setTimeout(() => document.body.classList.remove('cursor'), 1500); });
      document.getElementById('stage').addEventListener('click', (e) => { if (e.target.closest('a')) return; D.next(); });
    }
    const h = (location.hash || '#1').slice(1).split('.');
    const startI = Math.max(0, (+h[0] || 1) - 1), startStep = +h[1] || 0;
    const go = () => STATIC ? show(startI, qs.has('first') ? 0 : D.slides[startI].steps, false) : show(startI, startStep, startStep === 0);
    (document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve()).then(go);
    window.addEventListener('hashchange', () => { if (!STATIC) return; const p = location.hash.slice(1).split('.'); show((+p[0] || 1) - 1, D.slides[(+p[0] || 1) - 1].steps, false); });
  });
})();
