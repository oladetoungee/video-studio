// Remakes helper (load BEFORE bind.js). bind.js awaits window.__extra() after the text is filled and fonts are ready.
//   <span class="pixw" data-k="w2" data-px="9"></span>  -> the word is drawn on a canvas at 1/px resolution and shown
//   blown up with hard pixels (the "hidden step" look of viral sample 3). The word stays editable in content.json.
window.__extra = async () => {
  for (const el of document.querySelectorAll('.pixw')) {
    const word = el.textContent.trim(); if (!word) continue;
    const cs = getComputedStyle(el); const font = `${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
    await document.fonts.load(font, word);
    const px = +(el.dataset.px || 9);
    const m = document.createElement('canvas').getContext('2d'); m.font = font;
    const w = Math.ceil(m.measureText(word).width) + 6, h = Math.ceil(parseFloat(cs.fontSize) * 1.15);
    const big = document.createElement('canvas'); big.width = w; big.height = h;
    const g = big.getContext('2d'); g.font = font; g.fillStyle = cs.color; g.textBaseline = 'middle'; g.lineWidth = +(el.dataset.stroke || 6); g.strokeStyle = cs.color; g.lineJoin = 'round'; g.strokeText(word, 3, h / 2); g.fillText(word, 3, h / 2);
    const sm = document.createElement('canvas'); sm.width = Math.max(1, Math.round(w / px)); sm.height = Math.max(1, Math.round(h / px));
    const s = sm.getContext('2d'); s.imageSmoothingEnabled = true; s.drawImage(big, 0, 0, sm.width, sm.height);
    sm.className = 'pix'; sm.style.width = w + 'px'; sm.style.height = h + 'px';
    el.textContent = ''; el.appendChild(sm);
  }
};
