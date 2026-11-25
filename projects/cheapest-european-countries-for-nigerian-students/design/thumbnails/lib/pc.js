// Drawn parts for the Price Check thumbnails: plain flags (no logos) and a barcode.
//   <span class="flag" data-flag="de" style="width:90px;height:60px"></span>
//   <svg class="barcode" data-seed="3"></svg>
(function () {
  const H = (c) => `<svg viewBox="0 0 30 20" preserveAspectRatio="none">${c}</svg>`;
  const tri = (a, b, c) => H(`<rect width="30" height="6.67" y="0" fill="${a}"/><rect width="30" height="6.67" y="6.67" fill="${b}"/><rect width="30" height="6.67" y="13.33" fill="${c}"/>`);
  const ver = (a, b, c) => H(`<rect width="10" height="20" x="0" fill="${a}"/><rect width="10" height="20" x="10" fill="${b}"/><rect width="10" height="20" x="20" fill="${c}"/>`);
  const cross = (bg, fg, inner) => H(`<rect width="30" height="20" fill="${bg}"/>` + (inner
    ? `<rect x="8" width="6" height="20" fill="${fg}"/><rect y="7" width="30" height="6" fill="${fg}"/><rect x="9.5" width="3" height="20" fill="${inner}"/><rect y="8.5" width="30" height="3" fill="${inner}"/>`
    : `<rect x="8.5" width="5" height="20" fill="${fg}"/><rect y="7.5" width="30" height="5" fill="${fg}"/>`));
  const F = {
    de: tri('#000', '#DD0000', '#FFCE00'),
    at: tri('#C8102E', '#fff', '#C8102E'),
    ee: tri('#0072CE', '#000', '#fff'),
    fr: ver('#0055A4', '#fff', '#EF4135'),
    it: ver('#009246', '#fff', '#CE2B37'),
    ng: ver('#008751', '#fff', '#008751'),
    pl: H(`<rect width="30" height="10" fill="#fff"/><rect y="10" width="30" height="10" fill="#DC143C"/>`),
    cz: H(`<rect width="30" height="10" fill="#fff"/><rect y="10" width="30" height="10" fill="#D7141A"/><path d="M0 0 L15 10 L0 20 Z" fill="#11457E"/>`),
    fi: cross('#fff', '#002F6C'),
    no: cross('#BA0C2F', '#fff', '#00205B'),
  };
  for (const el of document.querySelectorAll('[data-flag]')) {
    const svg = F[el.dataset.flag]; if (svg) el.innerHTML = svg;
    el.style.boxShadow = el.dataset.flag === 'fi' || el.dataset.flag === 'pl' || el.dataset.flag === 'cz' ? 'inset 0 0 0 1px rgba(0,0,0,.18)' : '';
  }
  for (const el of document.querySelectorAll('svg.barcode')) {
    let s = +(el.dataset.seed || 1) * 9301 + 49297; const rnd = () => ((s = (s * 9301 + 49297) % 233280) / 233280);
    let x = 0, out = ''; while (x < 150) { const w = 1 + Math.floor(rnd() * 3.2); if (rnd() > .42) out += `<rect x="${x}" width="${w}" height="70" fill="currentColor"/>`; x += w + 1; }
    el.setAttribute('viewBox', '0 0 150 70'); el.setAttribute('preserveAspectRatio', 'none'); el.innerHTML = out;
  }
})();
