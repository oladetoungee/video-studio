/* Direction B · "The Kitchen" — four test moments, drawn */
(function () {
  const D = window.D;
  const ease = 'cubic-bezier(.16,1,.3,1)';
  const C = { ink: '#1E1B18', tomato: '#E4472D', green: '#1F7A4D', tur: '#F2B230', rice: '#FFF8EC', soft: '#E8DCC8', sky: '#9DC3E6', blue: '#2C64C8' };

  /* ---------- illustration kit (each returns an <svg>) ---------- */
  const svg = (w, h, inner, vb) => `<svg width="${w}" height="${h}" viewBox="${vb || `0 0 ${w} ${h}`}" overflow="visible">${inner}</svg>`;
  const ART = {
    tomato: (s = 170) => svg(s, s, `<circle class="o" cx="100" cy="112" r="74" fill="${C.tomato}"/>
      <path class="o" fill="${C.green}" d="M100 46 l14 -18 l4 22 l22 -6 l-14 18 l18 10 l-24 4 l-20 6 l-20 -6 l-24 -4 l18 -10 l-14 -18 l22 6 l4 -22z"/>
      <path d="M62 96 q8 -22 30 -28" stroke="${C.rice}" stroke-width="8" fill="none" stroke-linecap="round" opacity=".6"/>`, '0 0 200 200'),
    pepper: (s = 170) => svg(s, s, `<path class="o" fill="${C.tomato}" d="M50 90 q-6 -30 26 -34 q24 -4 30 12 q10 -16 32 -8 q28 10 18 44 q-4 30 -26 48 q-22 18 -40 10 q-36 -12 -40 -72z"/>
      <path class="o" fill="${C.green}" d="M98 60 q2 -26 22 -34 l6 10 q-16 8 -16 26z"/>`, '0 0 200 200'),
    rice: (s = 190) => svg(s, s, `<path class="o" fill="${C.soft}" d="M46 70 q54 -30 108 0 l14 104 q-68 20 -136 0z"/>
      <path class="o" fill="none" d="M60 70 q40 18 80 0"/>
      ${[[80, 120], [100, 110], [118, 128], [92, 144], [126, 104], [70, 146], [112, 152]].map(([x, y]) => `<ellipse cx="${x}" cy="${y}" rx="7" ry="4" fill="${C.rice}" stroke="${C.ink}" stroke-width="3" transform="rotate(${(x * 7) % 60 - 30} ${x} ${y})"/>`).join('')}`, '0 0 200 200'),
    spice: (s = 170) => svg(s, s, `<rect class="o" x="62" y="36" width="76" height="28" rx="4" fill="${C.ink}"/>
      <rect class="o" x="54" y="62" width="92" height="114" rx="14" fill="${C.tur}"/>
      <rect x="68" y="96" width="64" height="40" rx="4" fill="${C.rice}" stroke="${C.ink}" stroke-width="4"/>`, '0 0 200 200'),
    pot: (w = 560) => svg(w, w * .62, `<path class="o" fill="${C.ink}" d="M60 90 h400 v120 q0 96 -96 96 h-208 q-96 0 -96 -96z"/>
      <rect class="o" x="40" y="70" width="440" height="34" rx="10" fill="#3A3530"/>
      <path class="o" fill="none" d="M40 140 h-30 q-12 0 -12 12 v10 q0 12 12 12 h30 M480 140 h30 q12 0 12 12 v10 q0 12 -12 12 h-30"/>
      <ellipse cx="260" cy="76" rx="196" ry="10" fill="${C.tomato}" opacity=".0" class="pot-fill"/>`, '0 0 520 320'),
    plate: (mound, s = 380, dodo) => svg(s, s * .62, `<ellipse class="o" cx="200" cy="150" rx="186" ry="82" fill="${C.rice}"/>
      <ellipse cx="200" cy="146" rx="132" ry="54" fill="none" stroke="${C.soft}" stroke-width="5"/>
      <path class="o" fill="${mound}" d="M92 150 q8 -84 108 -86 q100 2 108 86 q-108 34 -216 0z"/>
      ${[[150, 112], [196, 96], [240, 116], [176, 134], [222, 138], [262, 140], [130, 140]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5" fill="${C.rice}" opacity=".55"/>`).join('')}
      ${dodo ? [[282, 170, -20], [318, 158, 10], [300, 190, 30]].map(([x, y, r]) => `<ellipse class="o" cx="${x}" cy="${y}" rx="26" ry="16" fill="#E9A23B" transform="rotate(${r} ${x} ${y})"/><ellipse cx="${x}" cy="${y}" rx="14" ry="7" fill="#C9701E" transform="rotate(${r} ${x} ${y})"/>`).join('') : ''}`, '0 0 400 248'),
    flag: (stripes, vertical = true, w = 150, h = 96, star) => svg(w, h, (vertical
      ? stripes.map((c, k) => `<rect x="${k * w / stripes.length}" y="0" width="${w / stripes.length + .5}" height="${h}" fill="${c}"/>`)
      : stripes.map((c, k) => `<rect x="0" y="${k * h / stripes.length}" width="${w}" height="${h / stripes.length + .5}" fill="${c}"/>`)).join('') +
      (star ? `<polygon points="${[...Array(10)].map((_, k) => { const r = k % 2 ? 9 : 22, a = k * Math.PI / 5 - Math.PI / 2; return (w / 2 + Math.cos(a) * r) + ',' + (h / 2 + Math.sin(a) * r); }).join(' ')}" fill="${star}"/>` : '') +
      `<rect x="0" y="0" width="${w}" height="${h}" fill="none" stroke="${C.ink}" stroke-width="5"/>`),
    clock: (id, s = 420) => svg(s, s, `<circle class="o" cx="210" cy="210" r="186" fill="${C.rice}" stroke-width="10"/>
      ${[...Array(12)].map((_, k) => { const a = k / 12 * Math.PI * 2; return `<line x1="${210 + Math.sin(a) * 150}" y1="${210 - Math.cos(a) * 150}" x2="${210 + Math.sin(a) * (k % 3 ? 164 : 170)}" y2="${210 - Math.cos(a) * (k % 3 ? 164 : 170)}" stroke="${C.ink}" stroke-width="${k % 3 ? 5 : 9}" stroke-linecap="round"/>`; }).join('')}
      <g id="${id}-h"><line x1="210" y1="210" x2="210" y2="110" stroke="${C.ink}" stroke-width="16" stroke-linecap="round"/></g>
      <g id="${id}-m"><line x1="210" y1="210" x2="210" y2="70" stroke="${C.tomato}" stroke-width="9" stroke-linecap="round"/></g>
      <circle cx="210" cy="210" r="14" fill="${C.ink}"/>`, '0 0 420 420'),
    phoneOld: (s = 150) => svg(s, s, `<rect class="o" x="60" y="20" width="80" height="160" rx="16" fill="${C.ink}"/>
      <rect x="72" y="40" width="56" height="44" rx="4" fill="${C.sky}"/>${[0, 1, 2].map(r => [0, 1, 2].map(c => `<circle cx="${80 + c * 20}" cy="${108 + r * 22}" r="6" fill="${C.soft}"/>`).join('')).join('')}`, '0 0 200 200'),
    signal: (s = 150) => svg(s, s, [0, 1, 2, 3].map(k => `<rect class="o" x="${40 + k * 32}" y="${150 - k * 30 - 20}" width="22" height="${k * 30 + 20}" rx="3" fill="${k < 2 ? C.green : C.rice}"/>`).join(''), '0 0 200 200'),
    coins: (s = 150) => svg(s, s, [0, 1, 2, 3].map(k => `<ellipse class="o" cx="100" cy="${150 - k * 22}" rx="56" ry="18" fill="${C.tur}"/>`).join('') + `<path class="o" d="M100 130 v-20" />`, '0 0 200 200'),
    idcard: (s = 160) => svg(s, s, `<rect class="o" x="24" y="52" width="152" height="100" rx="10" fill="${C.rice}"/><rect class="o" x="40" y="70" width="42" height="52" rx="4" fill="${C.sky}"/>
      <line x1="96" y1="80" x2="156" y2="80" stroke="${C.ink}" stroke-width="7" stroke-linecap="round"/><line x1="96" y1="100" x2="146" y2="100" stroke="${C.soft}" stroke-width="7" stroke-linecap="round"/><line x1="40" y1="136" x2="156" y2="136" stroke="${C.soft}" stroke-width="7" stroke-linecap="round"/>`, '0 0 200 200'),
    stamp: (s = 150) => svg(s, s, `<rect class="o" x="76" y="20" width="48" height="70" rx="20" fill="${C.tomato}"/><rect class="o" x="44" y="88" width="112" height="34" rx="6" fill="${C.ink}"/><rect class="o" x="36" y="122" width="128" height="22" rx="4" fill="${C.tomato}"/>`, '0 0 200 200'),
    eraser: (s = 150) => svg(s, s, `<g transform="rotate(-24 100 100)"><rect class="o" x="30" y="70" width="140" height="60" rx="10" fill="#F39BB0"/><rect class="o" x="30" y="70" width="52" height="60" rx="10" fill="${C.sky}"/></g>`, '0 0 200 200'),
    server: (s = 220) => svg(s, s, [0, 1, 2].map(k => `<rect class="o" x="30" y="${30 + k * 52}" width="160" height="44" rx="6" fill="${C.ink}"/><circle cx="58" cy="${52 + k * 52}" r="7" fill="${C.green}"/><line x1="90" y1="${52 + k * 52}" x2="164" y2="${52 + k * 52}" stroke="#4a4540" stroke-width="6"/>`).join(''), '0 0 220 220'),
    phoneNew: (s = 220) => svg(s, s, `<rect class="o" x="62" y="14" width="96" height="190" rx="18" fill="${C.ink}"/><rect id="ph-screen" x="72" y="32" width="76" height="150" rx="6" fill="${C.sky}"/>`, '0 0 220 220'),
    parcel: (fill, s = 56) => `<svg width="${s}" height="${s}" viewBox="0 0 60 60"><rect x="4" y="10" width="52" height="46" rx="3" fill="${fill}" stroke="${C.ink}" stroke-width="4"/><rect x="24" y="10" width="12" height="46" fill="${C.ink}" opacity=".18"/></svg>`,
  };
  const at = (x, y, html, attrs = '') => `<div class="abs" style="left:${x}px;top:${y}px" ${attrs}>${html}</div>`;

  /* B1 · same ingredients, different kitchen */
  const ingr = [['tomato', 300], ['pepper', 640], ['rice', 980], ['spice', 1320]];
  D.slide({ id: 'B1-kitchen', bg: 'cream', steps: 2,
    notes: 'The core ingredients are the same everywhere: rice, tomatoes, pepper and spices. [click] … [click] But the kitchen and the country are different.',
    html: `
      ${ingr.map(([k, x], i) => at(x, 120, ART[k](190), `data-ing="1" data-a="drop" data-d="${i * 160}" data-out="2"`)).join('')}
      <div class="abs pot" style="left:700px;top:520px" data-a="up" data-d="500" data-out="2">${ART.pot(520)}</div>
      ${[[C.tomato, [C.tomato, '#FCD116', '#006B3F'], false, 160, '#000000'], ['#C1531F', ['#00853F', '#FDEF42', '#E31B23'], true, 770, '#00853F'], ['#D93A1E', ['#008751', '#FFFFFF', '#008751'], true, 1380, null]].map(([mound, fl, vert, x, star], k) => `
        ${at(x, 330, ART.plate(mound, 400, k === 2), `data-a="up" data-s="2" data-d="${k * 180}"`)}
        ${at(x + 125, 600, ART.flag(fl, vert, 150, 96, star), `data-a="pop" data-s="2" data-d="${300 + k * 180}"`)}`).join('')}
      <div class="abs t-l" style="left:160px;top:820px" data-a="up" data-s="2" data-d="800">Same ingredients. <span class="hl" data-s="2" data-d="1200">Different kitchen.</span></div>`,
    on(step, el, D, animate) {
      if (step !== 1) return;
      const pot = el.querySelector('.pot');
      const potC = [960, 600];
      el.querySelectorAll('[data-ing]').forEach((n, i) => {
        const x = parseFloat(n.style.left) + 95, y = 120 + 95;
        const dx = potC[0] - x, dy = potC[1] - y;
        if (!animate) { n.style.opacity = 0; return; }
        n.animate([{ transform: 'translate(0,0) scale(1)', opacity: 1 }, { transform: `translate(${dx * .6}px, ${dy * .3 - 80}px) scale(.8)`, opacity: 1, offset: .5 },
          { transform: `translate(${dx}px, ${dy}px) scale(.35)`, opacity: 0 }], { duration: 900, delay: i * 180, easing: 'cubic-bezier(.5,0,.6,1)', fill: 'forwards' });
      });
      if (animate) pot.animate([{ transform: 'translateY(0)' }, { transform: 'translateY(10px)', offset: .85 }, { transform: 'translateY(0)' }], { duration: 300, delay: 1250, iterations: 3 });
    }
  });

  /* B2 · two clocks */
  D.slide({ id: 'B2-clocks', bg: 'cream', steps: 1,
    notes: 'A cron job at 03:30. [click] In Tallinn on 25 October the clock goes back at 04:00, so 03:30 happens twice. Lagos never changes its clocks.',
    html: `
      <div class="label" style="left:790px;top:90px;font-size:44px;font-family:GeistMono;font-weight:600;transform:rotate(-2deg)" data-a="drop">30 3 * * *</div>
      ${at(260, 250, ART.clock('ct', 440), 'data-a="up" data-d="200"')}
      ${at(1220, 250, ART.clock('cl', 440), 'data-a="up" data-d="350"')}
      ${at(405, 730, ART.flag(['#0072CE', '#000000', '#FFFFFF'], false, 150, 96), 'data-a="pop" data-d="500"')}
      ${at(1365, 730, ART.flag(['#008751', '#FFFFFF', '#008751'], true, 150, 96), 'data-a="pop" data-d="650"')}
      <div class="abs t-m" style="left:260px;top:860px;width:440px;text-align:center" data-a="up" data-d="600">Tallinn</div>
      <div class="abs t-m" style="left:1220px;top:860px;width:440px;text-align:center" data-a="up" data-d="750">Lagos</div>
      <div class="abs" id="tallyT" style="left:730px;top:380px"></div>
      <div class="abs" id="tallyL" style="left:1690px;top:380px"></div>`,
    leave(el) { cancelAnimationFrame(el._raf); },
    on(step, el, D, animate) {
      const set = (id, mins) => { // mins since 00:00 local
        const h = el.querySelector(`#${id}-h`), m = el.querySelector(`#${id}-m`);
        h.setAttribute('transform', `rotate(${(mins / 720) * 360} 210 210)`); m.setAttribute('transform', `rotate(${(mins % 60) / 60 * 360} 210 210)`);
      };
      const tally = (box, n) => { box.innerHTML = [...Array(n)].map(() => `<span style="display:inline-block;width:14px;height:110px;background:${C.tomato};border:4px solid ${C.ink};margin-right:14px"></span>`).join(''); };
      const bump = (box) => { const s = box.lastElementChild; if (s) s.animate([{ transform: 'scaleY(0)', transformOrigin: 'bottom' }, { transform: 'scaleY(1)', transformOrigin: 'bottom' }], { duration: 450, easing: 'cubic-bezier(.34,1.4,.64,1)' }); };
      const tT = el.querySelector('#tallyT'), tL = el.querySelector('#tallyL');
      cancelAnimationFrame(el._raf);
      if (step === 0) { set('ct', 170); set('cl', 170); tally(tT, 0); tally(tL, 0); return; }
      if (!animate) { set('ct', 270); set('cl', 330); tally(tT, 2); tally(tL, 1); return; }
      // real minutes 0..160 from 02:50. Tallinn: at real 70 (04:00) jumps back to 03:00 with a fast backwards spin.
      const dur = 8000, t0 = performance.now(); let nT = 0, nL = 0, prevT = 170, prevL = 170;
      const tick = (now) => {
        const p = Math.min(1, (now - t0) / dur), real = p * 160;
        let lt;
        if (real < 70) lt = 170 + real;
        else if (real < 78) { const q = (real - 70) / 8; lt = 240 - 60 * (1 - Math.pow(1 - q, 3)); } // spin back an hour
        else lt = 180 + (real - 78) * (90 / 82);
        const ll = 170 + real;
        const back = real >= 70 && real < 78;
        if (!back && prevT < 210 && lt >= 210) { nT++; tally(tT, nT); bump(tT); }
        if (prevL < 210 && ll >= 210) { nL++; tally(tL, nL); bump(tL); }
        prevT = back ? 0 : lt; if (real >= 78 && prevT === 0) prevT = lt; prevL = ll;
        set('ct', lt); set('cl', ll);
        if (p < 1) el._raf = requestAnimationFrame(tick);
      };
      tally(tT, 0); tally(tL, 0);
      el._raf = requestAnimationFrame(tick);
    }
  });

  /* B3 · the pantry: the Environment Profile as six things on a shelf */
  const items = [['signal', 'Connectivity'], ['phoneOld', 'Devices'], ['coins', 'Money rails'], ['idcard', 'Identity rails'], ['stamp', 'Jurisdiction'], ['eraser', 'Forgiveness']];
  D.slide({ id: 'B3-pantry', bg: 'cream',
    notes: 'The Environment Profile. Six rows: [click] connectivity [click] devices [click] money rails [click] identity rails [click] jurisdiction [click] forgiveness.',
    html: `
      <div class="abs t-l" style="left:160px;top:100px" data-a="up">The Environment Profile</div>
      ${[520, 900].map((y, r) => `<div class="abs" style="left:160px;top:${y}px;width:1600px;height:26px;background:#B9813F;border:5px solid ${C.ink}" data-a="wipe" data-d="${200 + r * 150}"></div>`).join('')}
      ${items.map(([k, name], i) => { const r = i < 3 ? 0 : 1, c = i % 3; const x = 260 + c * 520, y = r ? 900 : 520;
        return at(x, y - 210, ART[k](220), `data-a="drop" data-s="${i + 1}"`) +
          `<div class="label" style="left:${x + 20}px;top:${y + 46}px;transform:rotate(${(i % 2 ? 2 : -2)}deg)" data-a="pop" data-s="${i + 1}" data-d="250">${name}</div>`; }).join('')}`
  });

  /* B4 · the conveyor: one response, one packet */
  const SLOTS = [...Array(10)].map((_, k) => 1260 - k * 70);
  D.slide({ id: 'B4-conveyor', bg: 'cream', steps: 1,
    notes: 'Every network response has to fit into one packet. [click] If it needs ten packets and one gets lost, TCP has to resend it, and everyone waits.',
    html: `
      <div class="abs t-l" style="left:160px;top:100px" data-a="up">One response. <span class="hl" data-s="0" data-d="600">One packet.</span></div>
      ${at(120, 470, ART.server(240), 'data-a="right" data-d="200"')}
      ${at(1580, 450, ART.phoneNew(260), 'data-a="left" data-d="300"')}
      <div class="abs" style="left:360px;top:640px;width:1200px;height:56px;border:5px solid ${C.ink};border-radius:28px;background:${C.soft}" data-a="wipe" data-d="300"></div>
      <div class="abs" id="rollers" style="left:380px;top:648px;width:1160px;height:40px;display:flex;justify-content:space-between" data-a="fade" data-d="400">
        ${[...Array(9)].map(() => `<svg width="40" height="40" viewBox="0 0 40 40"><circle cx="20" cy="20" r="15" fill="${C.rice}" stroke="${C.ink}" stroke-width="4"/><line x1="20" y1="8" x2="20" y2="32" stroke="${C.ink}" stroke-width="4"/></svg>`).join('')}</div>
      <div class="abs" id="cv" style="left:0;top:0;width:1920px;height:1080px"></div>
      <div class="label" id="cv-note" style="left:700px;top:820px;opacity:0;transform:rotate(-2deg)">Packet 7 fell off. Everyone waits.</div>`,
    leave(el) { (el._a || []).forEach(a => a.cancel()); clearTimeout(el._to); el.querySelectorAll('#rollers svg').forEach(r => r.getAnimations().forEach(a => a.cancel())); },
    on(step, el, D, animate) {
      const cv = el.querySelector('#cv'), note = el.querySelector('#cv-note'), rollers = [...el.querySelectorAll('#rollers svg')];
      (el._a || []).forEach(a => a.cancel()); el._a = []; clearTimeout(el._to); cv.innerHTML = ''; note.style.opacity = 0;
      const spin = (on) => rollers.forEach(r => { r.getAnimations().forEach(a => a.cancel()); if (on) el._a.push(r.animate([{ transform: 'rotate(0)' }, { transform: 'rotate(360deg)' }], { duration: 700, iterations: Infinity })); });
      const parcel = (fill, x) => { const p = document.createElement('div'); p.className = 'abs'; p.innerHTML = ART.parcel(fill, 60); p.style.left = '0'; p.style.top = '0'; p.style.transform = `translate(${x}px, 580px)`; cv.appendChild(p); return p; };
      const go = (p, k, o) => { const a = p.animate(k, Object.assign({ fill: 'forwards', easing: ease }, o)); el._a.push(a); return a; };
      if (step === 0) {
        const p = parcel(C.tur, 380);
        if (!animate) { p.style.transform = 'translate(1500px, 580px)'; return; }
        spin(true);
        go(p, [{ transform: 'translate(380px, 580px)' }, { transform: 'translate(1500px, 580px)' }], { duration: 2200, delay: 1000, easing: 'cubic-bezier(.3,0,.3,1)' }).onfinish = () => spin(false);
        return;
      }
      const ps = SLOTS.map((x, k) => parcel(k === 6 ? C.tomato : C.tur, 380));
      if (!animate) { ps.forEach((p, k) => p.style.transform = `translate(${SLOTS[k]}px, 580px)`); ps[6].style.transform = `translate(${SLOTS[6]}px, 580px)`; ps[6].innerHTML = ART.parcel(C.green, 60); note.style.opacity = 1; note.textContent = 'Packet 7 resent. Now it is complete.'; return; }
      spin(true);
      ps.forEach((p, k) => {
        if (k === 6) go(p, [{ transform: 'translate(380px, 580px)' }, { transform: 'translate(800px, 580px) rotate(0deg)', offset: .5 }, { transform: 'translate(880px, 900px) rotate(140deg)', opacity: 1 }],
          { duration: 1800, delay: k * 260, easing: 'cubic-bezier(.45,0,.7,1)' });
        else go(p, [{ transform: 'translate(380px, 580px)' }, { transform: `translate(${SLOTS[k]}px, 580px)` }], { duration: 2000, delay: k * 260, easing: 'cubic-bezier(.3,0,.3,1)' });
      });
      el._to = setTimeout(() => {
        spin(false); note.textContent = 'Packet 7 fell off. Everyone waits.';
        note.animate([{ opacity: 0, transform: 'rotate(-2deg) translateY(20px)' }, { opacity: 1, transform: 'rotate(-2deg) translateY(0)' }], { duration: 500, easing: ease, fill: 'forwards' });
        el._to = setTimeout(() => {
          spin(true); const r = parcel(C.green, 380);
          go(r, [{ transform: 'translate(380px, 580px)' }, { transform: `translate(${SLOTS[6]}px, 580px)` }], { duration: 1600, easing: 'cubic-bezier(.3,0,.3,1)' }).onfinish = () => { spin(false); note.textContent = 'Packet 7 resent. Now it is complete.'; };
        }, 1800);
      }, 4400);
    }
  });
})();
