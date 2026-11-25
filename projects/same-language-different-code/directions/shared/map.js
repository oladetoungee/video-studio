/* Map helper (d3-geo + topojson, offline). */
(function () {
  const D = window.D;
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

  D.esc = D.esc || (t => t);
})();
