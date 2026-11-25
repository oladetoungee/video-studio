/* Shared building blocks for slides. Load after engine.js, before slides/. */
(function () {
  const D = window.D;

  /* The Environment Profile rows. Wording is hers and fixed. */
  D.ROWS = [
    { n: '01', t: 'Connectivity',   q: 'How reliable and how expensive is the network for our users?' },
    { n: '02', t: 'Devices',        q: 'What hardware do our users actually hold?' },
    { n: '03', t: 'Money rails',    q: 'How fast and how reversible is settlement?' },
    { n: '04', t: 'Identity rails', q: 'What do users already trust to prove who they are?' },
    { n: '05', t: 'Jurisdiction',   q: 'Which laws and promises decide where data lives and how failures are handled?' },
    { n: '06', t: 'Forgiveness',    q: 'What have users here learned to tolerate, and what can’t be undone?' },
  ];

  /* Profile table.
     opts.top: px from top. opts.reveal: rows arrive one per step starting at opts.from (default 1).
     opts.hot: row indexes to light up (others dim at opts.hotAt, default 0 = immediately).
     opts.rows: subset of row indexes to draw. opts.extra: html appended after the last rule.
     opts.qsize / tsize: font sizes. */
  D.profile = (o = {}) => {
    const rows = (o.rows || [0, 1, 2, 3, 4, 5]);
    const from = o.from == null ? 1 : o.from;
    const hot = o.hot || [];
    let h = `<div class="prof" style="top:${o.top || 200}px">`;
    rows.forEach((ri, k) => {
      const r = D.ROWS[ri];
      const step = o.reveal ? from + k : 0;
      const isHot = hot.includes(ri);
      const dim = hot.length && !isHot ? `data-dim="${o.hotAt || 0}"` : '';
      h += `<div class="row ${ri === 5 ? 'forg' : ''} ${isHot ? 'hot' : ''}" data-a="${o.anim || 'wipe'}" data-s="${step}" data-d="${o.reveal ? 0 : 60 * k}" ${dim}
              style="${o.tsize ? `--ts:${o.tsize}px` : ''}">
        <span class="n">${r.n}</span><span class="t" style="${o.tsize ? `font-size:${o.tsize}px` : ''}">${r.t}</span>
        <span class="q" style="${o.qsize ? `font-size:${o.qsize}px` : ''}">${r.q}</span></div>`;
    });
    h += `<div class="end" data-a="wipe" data-s="${o.reveal ? from + rows.length - 1 : 0}" data-d="${o.reveal ? 200 : 60 * rows.length}"></div>`;
    h += (o.extra || '') + `</div>`;
    return h;
  };

  /* Registration marks in the four corners (technical drawing motif). */
  D.regs = () => `<i class="reg tl"></i><i class="reg tr"></i><i class="reg bl"></i><i class="reg br"></i>`;

  /* Split a phrase into words that rise one after another.
     D.words('Every system carries', {s:0, d:0, gap:70, cls:''}) */
  D.words = (text, o = {}) => text.split(' ').map((w, k) =>
    `<span style="display:inline-block;overflow:visible"><span class="${o.cls || ''}" style="display:inline-block" data-a="${o.a || 'rise'}" data-s="${o.s || 0}" data-d="${(o.d || 0) + k * (o.gap || 70)}">${w}</span></span>`
  ).join(' ');

  /* Map: draws countries into an <svg> with d3-geo + topojson (bundled offline).
     opts: { extent: [[lon,lat],[lon,lat]], fills: {isoNumeric: color}, pad, land, stroke } returns {proj, path}. */
  D.map = (svg, o = {}) => {
    const W = +svg.getAttribute('width'), H = +svg.getAttribute('height');
    const world = window.WORLD_50M || window.WORLD_110M;
    if (!world || !window.d3 || !window.topojson) { svg.insertAdjacentHTML('beforeend', `<text x="20" y="40" font-family="DM Mono" font-size="24" fill="currentColor">map data missing</text>`); return null; }
    const feats = topojson.feature(world, world.objects.countries).features;
    const proj = (o.projection || d3.geoNaturalEarth1()).fitExtent([[o.pad || 0, o.pad || 0], [W - (o.pad || 0), H - (o.pad || 0)]],
      { type: 'MultiPoint', coordinates: o.extent || [[-20, -36], [45, 62]] });
    const path = d3.geoPath(proj);
    const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    feats.forEach(f => {
      const p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      p.setAttribute('d', path(f) || '');
      p.setAttribute('fill', o.land || 'var(--card)');
      p.setAttribute('stroke', o.stroke || 'var(--line)');
      p.setAttribute('stroke-width', o.sw || 1.5);
      p.dataset.id = f.id;
      p.style.transition = 'fill .8s var(--ease)';
      g.appendChild(p);
    });
    svg.insertBefore(g, svg.firstChild);
    svg._countries = g;
    return { proj, path, fill: (id, color) => { const p = g.querySelector(`[data-id="${id}"]`); if (p) p.setAttribute('fill', color); } };
  };
  D.ISO = { nigeria: '566', ghana: '288', senegal: '686', southAfrica: '710', botswana: '072', estonia: '233', india: '356', brazil: '076', mexico: '484', sweden: '752' };
  D.CITY = { lagos: [3.3792, 6.5244], tallinn: [24.7536, 59.437], malmo: [13.0038, 55.605], johannesburg: [28.0473, -26.2041], gaborone: [25.9231, -24.6282] };

  /* Small source credit line. */
  D.credit = (t) => `<div class="credit">${t}</div>`;

  /* A real screenshot in a minimal browser frame. */
  D.browser = (o) => `<div class="browser" style="left:${o.x}px;top:${o.y}px;width:${o.w}px;height:${o.h}px" data-a="${o.a || 'up'}" data-s="${o.s || 0}" data-d="${o.d || 0}">
      <div class="bar"><i></i><i></i><i></i><span>${o.url}</span></div>
      <img src="${o.src}" alt="" style="${o.imgStyle || ''}" onerror="this.style.display='none'"></div>`;
})();
