/* receipt(cap, crop[x,y,w,h] in page CSS px, displayW, hl [[x,y,w,h]...] page CSS px, opts) -> html of a cropped real page with marker highlights */
function receipt(cap, crop, dw, hl = [], o = {}) {
  const k = dw / crop[2], dh = Math.round(crop[3] * k), hc = o.hl || 'rgba(255,214,10,0.55)';
  let h = `<div class="rc" style="position:relative;width:${dw}px;height:${dh}px;overflow:hidden;background:#fff">`;
  h += `<img src="../_src/cap/${cap}.png" style="position:absolute;left:${-crop[0] * k}px;top:${-crop[1] * k}px;width:${1280 * k}px;max-width:none">`;
  hl.forEach((r, i) => { h += `<div class="hl" data-i="${i}" style="position:absolute;left:${(r[0] - crop[0]) * k - 4}px;top:${(r[1] - crop[1]) * k - 2}px;width:${r[2] * k + 8}px;height:${r[3] * k + 4}px;background:${hc};mix-blend-mode:multiply;transform-origin:left center"></div>`; });
  if (o.cover) { const c = o.cover; h += `<div style="position:absolute;left:${(c[0] - crop[0]) * k}px;top:${(c[1] - crop[1]) * k}px;width:${c[2] * k}px;height:${c[3] * k}px;background:#fff"></div>`; }
  return h + '</div>';
}
