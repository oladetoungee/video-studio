/* Shared drawing bits for the cheapest-countries direction pages (pure functions, no randomness). */
const FLAGS = {
  DE: '<rect width="30" height="6.67" fill="#000"/><rect y="6.67" width="30" height="6.67" fill="#DD0000"/><rect y="13.33" width="30" height="6.67" fill="#FFCE00"/>',
  FR: '<rect width="10" height="20" fill="#0055A4"/><rect x="10" width="10" height="20" fill="#fff"/><rect x="20" width="10" height="20" fill="#EF4135"/>',
  IT: '<rect width="10" height="20" fill="#009246"/><rect x="10" width="10" height="20" fill="#fff"/><rect x="20" width="10" height="20" fill="#CE2B37"/>',
  AT: '<rect width="30" height="20" fill="#C8102E"/><rect y="6.67" width="30" height="6.67" fill="#fff"/>',
  EE: '<rect width="30" height="6.67" fill="#0072CE"/><rect y="6.67" width="30" height="6.67" fill="#000"/><rect y="13.33" width="30" height="6.67" fill="#fff"/>',
  PL: '<rect width="30" height="10" fill="#fff"/><rect y="10" width="30" height="10" fill="#DC143C"/>',
  CZ: '<rect width="30" height="10" fill="#fff"/><rect y="10" width="30" height="10" fill="#D7141A"/><path d="M0 0 L15 10 L0 20Z" fill="#11457E"/>',
  NO: '<rect width="30" height="20" fill="#BA0C2F"/><rect x="8" width="6" height="20" fill="#fff"/><rect y="7" width="30" height="6" fill="#fff"/><rect x="9.5" width="3" height="20" fill="#00205B"/><rect y="8.5" width="30" height="3" fill="#00205B"/>',
  FI: '<rect width="30" height="20" fill="#fff"/><rect x="8" width="5" height="20" fill="#002F6C"/><rect y="7.5" width="30" height="5" fill="#002F6C"/>',
};
const flag = (c, w, extra = '') => `<svg viewBox="0 0 30 20" width="${w}" height="${w * 2 / 3}" style="display:block;${extra}" preserveAspectRatio="none">${FLAGS[c]}</svg>`;
// barcode: deterministic bars from a string
function barcode(seed, w, h, color = '#111') {
  let s = 0; for (const ch of seed) s = (s * 31 + ch.charCodeAt(0)) >>> 0;
  let x = 0, out = ''; while (x < w) { s = (s * 1103515245 + 12345) >>> 0; const bw = 1 + (s >>> 16) % 4; s = (s * 1103515245 + 12345) >>> 0; const gap = 1 + (s >>> 16) % 3; out += `<rect x="${x}" y="0" width="${bw}" height="${h}" fill="${color}"/>`; x += bw + gap; }
  return `<svg width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" style="display:block">${out}</svg>`;
}
// seven-segment digit renderer (calculator LCD), returns svg for a string like "14480." or "-2,576"
const SEG = { '0': 'abcdef', '1': 'bc', '2': 'abged', '3': 'abgcd', '4': 'fgbc', '5': 'afgcd', '6': 'afgedc', '7': 'abc', '8': 'abcdefg', '9': 'abcfgd', '-': 'g', 'E': 'afged', 'r': 'eg', 'o': 'cdeg', ' ': '', 'h': 'fegc', 'P': 'abfge', 'L': 'fed', 'A': 'abcefg', 'n': 'ceg', 'C': 'afed' };
function lcd(str, h, on = '#1D2216', off = 'rgba(29,34,22,0.07)', slots = 0) {
  const w = h * 0.56, t = h * 0.105, sk = 0.1; const chars = [];
  for (let i = 0; i < str.length; i++) { const c = str[i]; if (c === '.' || c === ',') { if (chars.length) chars[chars.length - 1].dot = c; continue; } chars.push({ c, dot: null }); }
  while (chars.length < slots) chars.unshift({ c: ' ', dot: null, blank: true });
  const gap = h * 0.2, W = chars.length * (w + gap) + h * 0.2;
  const seg = (k, x, y) => { const L = w - t, V = (h - 3 * t) / 2 + t / 2;
    const hz = (sx, sy) => `<polygon points="${sx + t / 2},${sy} ${sx + L - t / 2 + t / 2},${sy} ${sx + L},${sy + t / 2} ${sx + L - t / 2},${sy + t} ${sx + t / 2 + t / 2 - t / 2},${sy + t} ${sx},${sy + t / 2}"/>`;
    const vt = (sx, sy) => `<polygon points="${sx + t / 2},${sy} ${sx + t},${sy + t / 2} ${sx + t},${sy + V - t / 2} ${sx + t / 2},${sy + V} ${sx},${sy + V - t / 2} ${sx},${sy + t / 2}"/>`;
    return { a: hz(x + t / 2, y), g: hz(x + t / 2, y + (h - t) / 2), d: hz(x + t / 2, y + h - t), f: vt(x, y + t / 2), b: vt(x + w - t, y + t / 2), e: vt(x, y + h / 2), c: vt(x + w - t, y + h / 2) }[k]; };
  let svg = '';
  chars.forEach((ch, i) => { const x = h * 0.1 + i * (w + gap); const lit = SEG[ch.c] ?? '';
    for (const k of 'abcdefg') svg += `<g fill="${lit.includes(k) ? on : off}">${seg(k, x, 0)}</g>`;
    svg += `<rect x="${x + w + gap * 0.22}" y="${h - t}" width="${t}" height="${t}" fill="${ch.dot === '.' ? on : off}"/>`;
    if (ch.dot === ',') svg += `<path d="M${x + w + gap * 0.22} ${h - t} h${t} l-${t * 0.4} ${t * 1.6} h-${t * 0.5}z" fill="${on}"/>`; });
  return `<svg width="${W}" height="${h * 1.15}" viewBox="0 0 ${W} ${h * 1.15}" style="display:block;transform:skewX(-${sk * 50}deg);transform-origin:bottom left">${svg}</svg>`;
}
const fmt = (n, d = 0) => n.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });
