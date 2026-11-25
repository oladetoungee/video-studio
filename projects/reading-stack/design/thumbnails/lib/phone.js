/* Realistic phone for designs (thumbnails, carousels). Her note 2026-11-09: our phones "don't look realistic"; reference = a
   product site's phones (thin black bezel, dark metal frame with side buttons, Dynamic-Island-style pill, real status bar,
   home indicator). Generic: no logo, no brand.
   Markup stays the old one:   <div class="phone" style="left;top;width;height"><div class="scr">…screen…</div></div>
   Optional: data-dark="1" (white status bar on a dark screen; auto-detected from the screen colour otherwise),
             data-time="9:41", data-bar="0" (no status bar), data-side="0" (no side buttons).
   The canonical copy is library/ui/phone.js; each project's design lib has a copy (bind.js loads ../../lib/phone.js). */
(function () {
  function lum(c) { const m = (c || '').match(/\d+(\.\d+)?/g); if (!m) return 1; const [r, g, b] = m.map(Number); return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255; }
  function el(tag, css, parent) { const e = document.createElement(tag); e.style.cssText = css; parent.appendChild(e); return e; }
  function icons(col, s) {
    // signal bars, wifi, battery (generic iOS-like glyphs), sized from s (status bar font size)
    const h = s * 0.78;
    const sig = `<svg width="${h * 1.35}" height="${h}" viewBox="0 0 17 12"><g fill="${col}"><rect x="0" y="8" width="3" height="4" rx=".8"/><rect x="4.6" y="5.5" width="3" height="6.5" rx=".8"/><rect x="9.2" y="3" width="3" height="9" rx=".8"/><rect x="13.8" y="0" width="3" height="12" rx=".8"/></g></svg>`;
    const wifi = `<svg width="${h * 1.3}" height="${h}" viewBox="0 0 16 12"><g fill="${col}"><path d="M8 2.2c2.5 0 4.8 1 6.5 2.6l1.2-1.3C13.7 1.6 11 .4 8 .4S2.3 1.6.3 3.5l1.2 1.3C3.2 3.2 5.5 2.2 8 2.2z"/><path d="M8 5.8c1.5 0 2.9.6 3.9 1.5l1.2-1.3C11.8 4.8 10 4 8 4S4.2 4.8 2.9 6l1.2 1.3c1-.9 2.4-1.5 3.9-1.5z"/><path d="M8 9.2c.6 0 1.1.2 1.5.6L8 11.4 6.5 9.8c.4-.4.9-.6 1.5-.6z"/></g></svg>`;
    const bat = `<svg width="${h * 2.15}" height="${h}" viewBox="0 0 27 12.5"><rect x=".5" y=".5" width="22.5" height="11.5" rx="3.4" fill="none" stroke="${col}" stroke-opacity=".4"/><rect x="2" y="2" width="19.5" height="8.5" rx="2.1" fill="${col}"/><path d="M24.5 4.3v4a2.1 2.1 0 0 0 0-4z" fill="${col}" fill-opacity=".45"/></svg>`;
    return sig + wifi + bat;
  }
  function upgrade(ph) {
    if (ph.dataset.real) return; ph.dataset.real = '1';
    const scr = ph.querySelector('.scr'); if (!scr) return;
    const w = ph.offsetWidth, h = ph.offsetHeight; if (!w || !h) return;
    const R = w * 0.165, bez = w * 0.032, fr = Math.max(2, w * 0.018);
    const scrBg = getComputedStyle(scr).backgroundColor;
    const dark = ph.dataset.dark ? ph.dataset.dark === '1' : lum(scrBg) < 0.45;
    // the black glass + bezel
    Object.assign(ph.style, { background: '#060607', borderRadius: R + 'px', padding: bez + 'px', overflow: 'visible', isolation: 'isolate',
      boxShadow: `0 ${w * 0.08}px ${w * 0.16}px rgba(0,0,0,.32), 0 ${w * 0.02}px ${w * 0.04}px rgba(0,0,0,.25)` });
    // metal frame (behind, a little larger) with a thin light edge, like brushed dark titanium
    el('div', `position:absolute;inset:${-fr}px;border-radius:${R + fr}px;z-index:-1;background:linear-gradient(145deg,#6a6a70 0%,#2a2a2e 18%,#3b3b40 50%,#1b1b1e 82%,#55555b 100%);box-shadow:inset 0 0 0 ${Math.max(1, fr * 0.35)}px rgba(255,255,255,.10)`, ph);
    if (ph.dataset.side !== '0') {
      const bw = Math.max(2, w * 0.012), col = 'linear-gradient(90deg,#1c1c1f,#45454b)';
      for (const [side, top, len] of [['l', 0.17, 0.045], ['l', 0.255, 0.085], ['l', 0.36, 0.085], ['r', 0.27, 0.13]])
        el('div', `position:absolute;${side === 'l' ? 'left' : 'right'}:${-fr - bw}px;top:${h * top}px;width:${bw + 1}px;height:${h * len}px;border-radius:${bw}px;background:${col};z-index:-2`, ph);
    }
    Object.assign(scr.style, { borderRadius: (R - bez) + 'px', position: 'relative', overflow: 'hidden', width: '100%', height: '100%' });
    // status bar + island + home indicator, above the screen content
    const s = w * 0.052, fg = dark ? '#fff' : '#000';
    if (ph.dataset.bar !== '0') {
      const bar = el('div', `position:absolute;left:0;right:0;top:0;height:${w * 0.15}px;display:flex;align-items:center;justify-content:space-between;padding:0 ${w * 0.085}px 0 ${w * 0.11}px;z-index:20;pointer-events:none;font:600 ${s}px/1 'FS','Inter Tight',system-ui,sans-serif;color:${fg};letter-spacing:-.01em`, scr);
      el('span', '', bar).textContent = ph.dataset.time || '9:41';
      const ic = el('span', `display:flex;align-items:center;gap:${s * 0.32}px`, bar); ic.innerHTML = icons(fg, s);
    }
    el('div', `position:absolute;left:50%;top:${w * 0.035}px;transform:translateX(-50%);width:${w * 0.3}px;height:${w * 0.088}px;border-radius:${w * 0.05}px;background:#000;z-index:21`, scr);
    el('div', `position:absolute;left:50%;bottom:${w * 0.022}px;transform:translateX(-50%);width:${w * 0.34}px;height:${Math.max(3, w * 0.013)}px;border-radius:9px;background:${fg};opacity:.85;z-index:21`, scr);
  }
  window.upgradePhones = () => document.querySelectorAll('.phone').forEach(upgrade);
  if (document.readyState !== 'loading') window.upgradePhones(); else document.addEventListener('DOMContentLoaded', window.upgradePhones);
})();
