// working-full-time thumbnails: shared drawings (stamp ink filter, 24-hour dial, week calendar). Deterministic, no randomness.
//   <svg class="dial" data-dial='{"r":230,"arcs":[{"from":9,"to":17,"k":"work","label":"WORK"}]}'>  -> 24-hour dial (00 at the top)
//   <div class="week" data-week='{...}'>                                                          -> generic week grid with blocks
// Content can override both: content.json "dial" / "week" (same shape) replace the data attributes.
(function () {
  const NS = 'http://www.w3.org/2000/svg';
  // one shared SVG filter: uneven rubber-stamp ink
  const defs = document.createElementNS(NS, 'svg');
  defs.setAttribute('width', '0'); defs.setAttribute('height', '0'); defs.style.position = 'absolute';
  defs.innerHTML = `<filter id="ink" x="-5%" y="-5%" width="110%" height="110%">
    <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" result="n"/>
    <feColorMatrix in="n" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -0.75 1.5" result="m"/>
    <feComposite in="SourceGraphic" in2="m" operator="in" result="a"/>
    <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="1" seed="3" result="w"/>
    <feDisplacementMap in="a" in2="w" scale="2"/></filter>
    <pattern id="hatch" width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(35)"><rect width="16" height="16" fill="#E7D7AE"/><rect width="7" height="16" fill="#1D1A15"/></pattern>`;
  document.body.prepend(defs);

  const cs = () => getComputedStyle(document.querySelector('.t'));
  function arcPath(cx, cy, r0, r1, a0, a1) {
    const p = (r, a) => [cx + r * Math.cos(a), cy + r * Math.sin(a)];
    const large = a1 - a0 > Math.PI ? 1 : 0;
    const [x0, y0] = p(r1, a0), [x1, y1] = p(r1, a1), [x2, y2] = p(r0, a1), [x3, y3] = p(r0, a0);
    return `M${x0} ${y0} A${r1} ${r1} 0 ${large} 1 ${x1} ${y1} L${x2} ${y2} A${r0} ${r0} 0 ${large} 0 ${x3} ${y3} Z`;
  }
  function dial(svg, spec) {
    const r = spec.r || 220, th = spec.th || r * 0.24, pad = 70, S = 2 * (r + pad);
    svg.setAttribute('width', S); svg.setAttribute('height', S); svg.setAttribute('viewBox', `0 0 ${S} ${S}`);
    const cx = S / 2, cy = S / 2, ang = h => (h / 24) * 2 * Math.PI - Math.PI / 2;
    const col = cs(), acc = col.getPropertyValue('--accent').trim() || '#C8102E';
    const fg = spec.fg || col.getPropertyValue('--fg').trim() || '#E7D7AE';
    const ink = '#1D1A15';
    let h = `<circle cx="${cx}" cy="${cy}" r="${r - th / 2}" fill="none" stroke="${spec.track || 'rgba(231,215,174,.16)'}" stroke-width="${th}"/>`;
    for (const a of spec.arcs || []) {
      const fill = a.k === 'work' ? acc : a.k === 'class' ? 'url(#hatch)' : a.k === 'study' ? fg : a.k === 'sleep' ? (spec.sleep || '#4A443A') : a.k;
      h += `<path d="${arcPath(cx, cy, r - th, r, ang(a.from), ang(a.to))}" fill="${fill}" stroke="${a.k === 'class' ? ink : 'none'}" stroke-width="3"/>`;
    }
    for (let i = 0; i < 24; i++) {
      const a = ang(i), big = i % 6 === 0, r0 = r + 10, r1 = r + (big ? 34 : 20);
      h += `<line x1="${cx + r0 * Math.cos(a)}" y1="${cy + r0 * Math.sin(a)}" x2="${cx + r1 * Math.cos(a)}" y2="${cy + r1 * Math.sin(a)}" stroke="${fg}" stroke-width="${big ? 5 : 3}" opacity="${big ? 1 : .6}"/>`;
    }
    if (spec.nums !== false) for (const n of [0, 6, 12, 18]) {
      const a = ang(n), rr = r + 58;
      h += `<text x="${cx + rr * Math.cos(a)}" y="${cy + rr * Math.sin(a) + 14}" text-anchor="middle" font-size="40" fill="${fg}">${String(n).padStart(2, '0')}</text>`;
    }
    for (const a of spec.arcs || []) if (a.label) {
      const m = ang((a.from + a.to) / 2), rr = a.out ? r + (a.out === true ? 70 : a.out) : r - th / 2;
      const lc = a.out ? fg : (a.k === 'work' || a.k === 'sleep' ? '#F6EEDB' : ink);
      h += `<text x="${cx + rr * Math.cos(m)}" y="${cy + rr * Math.sin(m) + (a.fs || 40) * .36}" text-anchor="middle" font-size="${a.fs || 40}" fill="${lc}" ${a.k === 'class' && !a.out ? 'paint-order="stroke" stroke="#E7D7AE" stroke-width="10"' : ''}>${a.label}</text>`;
    }
    if (spec.center) h += `<text x="${cx}" y="${cy + (spec.cfs || 120) * .35}" text-anchor="middle" font-size="${spec.cfs || 120}" fill="${fg}">${spec.center}</text>`;
    if (spec.csub) h += `<text x="${cx}" y="${cy + (spec.cfs || 120) * .35 + 52}" text-anchor="middle" font-size="44" fill="${acc}">${spec.csub}</text>`;
    svg.innerHTML = h;
  }
  function week(el, spec) {
    const days = spec.days || ['MON', 'TUE', 'WED', 'THU', 'FRI'];
    const W = spec.w || 640, H = spec.h || 440, from = spec.from ?? 8, to = spec.to ?? 22, gut = spec.gut ?? 56, top = 52;
    const cw = (W - gut) / days.length, y = h => top + (h - from) / (to - from) * (H - top);
    let s = `<div class="g" style="width:${W}px;height:${H}px">`;
    days.forEach((d, i) => { s += `<div class="dh" style="left:${gut + i * cw}px;width:${cw}px">${d}</div><div class="col" style="left:${gut + i * cw}px;top:${top}px;height:${H - top}px"></div>`; });
    for (let h = from; h <= to; h += (spec.step || 2)) s += `<div class="hr" style="left:${gut}px;top:${y(h)}px"></div>${spec.hours === false ? '' : `<div class="hl2" style="top:${y(h) - 8}px">${String(h).padStart(2, '0')}</div>`}`;
    for (const b of spec.blocks || []) s += `<div class="b ${b.k}" style="left:${gut + b.d * cw + 6 + (b.dx || 0)}px;width:${cw - 12 - (b.dx || 0)}px;top:${y(b.s) + 3}px;height:${y(b.e) - y(b.s) - 6}px;${b.fs ? `font-size:${b.fs}px;` : ''}">${b.t || ''}</div>`;
    if (spec.ring) { const r = spec.ring, x0 = gut + r.d * cw - 22, y0 = y(r.s) - 26; s += `<div class="ring" style="left:${x0}px;top:${y0}px;width:${cw + 44}px;height:${y(r.e) - y(r.s) + 52}px;rotate:-4deg"></div>`; }
    el.innerHTML = s + '</div>';
  }
  const prev = window.__extra;
  window.__extra = async () => {
    let c = {}; try { c = await (await fetch('content.json', { cache: 'no-store' })).json(); } catch (e) { }
    document.querySelectorAll('svg.dial').forEach((s, i) => dial(s, (i === 0 && c.dial) || JSON.parse(s.dataset.dial || '{}')));
    document.querySelectorAll('.week[data-week]').forEach((w, i) => week(w, (i === 0 && c.week) || JSON.parse(w.dataset.week || '{}')));
    if (prev) await prev();
  };
})();
