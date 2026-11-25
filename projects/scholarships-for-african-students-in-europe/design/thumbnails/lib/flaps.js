// Split-flap tiles: every .flaps element's text becomes one tile per letter (spaces = empty tiles).
// <span class="acc">…</span> inside the text = green tiles; data-pad="N" pads the row to N tiles.
// Runs from bind.js (window.layout) after the text is filled, so the text stays plain and editable in the studio.
window.flapify = function (root) {
  for (const el of (root || document).querySelectorAll('.flaps')) {
    const cells = [];
    const walk = (n, acc) => {
      for (const ch of n.childNodes) {
        if (ch.nodeType === 3) for (const c of ch.nodeValue.replace(/[\t\n\r]+/g, ' ')) cells.push([c, acc]);
        else if (ch.nodeType === 1) walk(ch, acc || ch.classList.contains('acc') || ch.classList.contains('go'));
      }
    };
    walk(el, false);
    while (cells.length && cells[0][0] === ' ') cells.shift();
    while (cells.length && cells[cells.length - 1][0] === ' ') cells.pop();
    const pad = +el.dataset.pad || 0; while (cells.length < pad) cells.push([' ', false]);
    el.innerHTML = cells.map(([c, a]) => c === ' ' ? '<i class="sp"> </i>' : `<i${a ? ' class="go"' : ''}>${c.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</i>`).join('');
  }
};
window.layout = function (c) { window.flapify(); if (typeof window.layout2 === 'function') window.layout2(c); };
