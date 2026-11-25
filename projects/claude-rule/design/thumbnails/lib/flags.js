// Flat flags as inline SVG: <div class="flag" data-flag="gh|ee|ng"></div>. Plain stripes, no shading.
for (const el of document.querySelectorAll('[data-flag]')) {
  const f = el.dataset.flag;
  const star = (cx, cy, r) => { let p = []; for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * 0.382 : r; p.push((cx + rr * Math.cos(a)).toFixed(2) + ',' + (cy + rr * Math.sin(a)).toFixed(2)); } return p.join(' '); };
  const svg = {
    gh: `<svg viewBox="0 0 300 200"><rect width="300" height="67" fill="#CE1126"/><rect y="66.6" width="300" height="67" fill="#FCD116"/><rect y="133.3" width="300" height="67" fill="#006B3F"/><polygon points="${star(150, 103, 36)}" fill="#000"/></svg>`,
    ee: `<svg viewBox="0 0 330 210"><rect width="330" height="70" fill="#0072CE"/><rect y="70" width="330" height="70" fill="#000"/><rect y="140" width="330" height="70" fill="#fff"/></svg>`,
    ng: `<svg viewBox="0 0 300 150"><rect width="100" height="150" fill="#008751"/><rect x="100" width="100" height="150" fill="#fff"/><rect x="200" width="100" height="150" fill="#008751"/></svg>`,
  }[f];
  if (svg) el.innerHTML = svg;
}
