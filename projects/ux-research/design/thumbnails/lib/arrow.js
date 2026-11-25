// Draws thick curved arrows: <svg class="draw arrow" data-a="x1 y1 cx cy x2 y2" data-w="14"> (quadratic curve, filled head).
// Colour: CSS var --accent unless data-c is set. Pure geometry, no randomness.
for (const s of document.querySelectorAll('svg.arrow')) {
  const [x1, y1, cx, cy, x2, y2] = s.dataset.a.split(/\s+/).map(Number);
  const w = +(s.dataset.w || 14), c = s.dataset.c || 'var(--accent)';
  const ang = Math.atan2(y2 - cy, x2 - cx), L = w * 3.2, W = w * 2.3;
  const bx = x2 - Math.cos(ang) * L * 0.8, by = y2 - Math.sin(ang) * L * 0.8;   // the shaft stops inside the head
  const p = (a, r) => `${(x2 - Math.cos(ang) * L + Math.cos(a) * r).toFixed(1)} ${(y2 - Math.sin(ang) * L + Math.sin(a) * r).toFixed(1)}`;
  s.setAttribute('width', 1280); s.setAttribute('height', 720);
  s.innerHTML = `<path d="M${x1} ${y1} Q${cx} ${cy} ${bx.toFixed(1)} ${by.toFixed(1)}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round"/>` +
    `<path d="M${x2} ${y2} L${p(ang + Math.PI / 2, W)} L${p(ang - Math.PI / 2, W)} Z" fill="${c}" stroke="${c}" stroke-width="${w * 0.35}" stroke-linejoin="round"/>`;
}
