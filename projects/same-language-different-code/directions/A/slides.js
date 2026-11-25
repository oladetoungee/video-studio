/* Direction A · "The Same System" — four test moments */
(function () {
  const D = window.D;
  const NS = 'http://www.w3.org/2000/svg';
  const ease = 'cubic-bezier(.16,1,.3,1)';

  /* A1 · the hidden model: the system, and the environment layers under it */
  D.slide({ id: 'A1-hidden-model', bg: 'paper',
    notes: 'Every system carries a hidden model of its environment. [click] network, devices, money, identity, laws.',
    html: `
      <div class="abs t-l" style="left:140px;top:110px;width:1500px">Every system carries a <span class="hl" data-s="1" data-d="200">hidden model</span> of its environment.</div>
      <svg class="abs" width="1920" height="1080" style="left:0;top:0">
        <path class="ln" d="M640 400 H820" data-a="draw" data-d="500"/>
        <path class="ln" d="M1100 400 H1280" data-a="draw" data-d="700"/>
        ${[['M500 470 V620', 0], ['M960 470 V700', 1], ['M960 470 V780', 2], ['M960 470 V860', 3], ['M1420 470 V940', 4]].map(([d, k]) =>
          `<path class="ln-env" stroke-dasharray="6 8" d="${d}" data-a="draw" data-s="1" data-d="${300 + k * 140}" data-dur="600"/>`).join('')}
        ${[620, 700, 780, 860, 940].map((y, k) => `<rect x="140" y="${y - 60}" width="1640" height="60" fill="var(--env)" opacity="${.05 + k * .03}" data-a="wipe" data-s="1" data-d="${k * 140}"/><path class="ln-env" d="M140 ${y} H1780" data-a="draw" data-s="1" data-d="${k * 140}" data-dur="900"/>`).join('')}
      </svg>
      <div class="box" style="left:360px;top:330px;width:280px;height:140px" data-a="up">phone</div>
      <div class="box" style="left:820px;top:330px;width:280px;height:140px" data-a="up" data-d="150">api</div>
      <div class="box" style="left:1280px;top:330px;width:280px;height:140px" data-a="up" data-d="300">database</div>
      ${['network', 'devices', 'money', 'identity', 'laws'].map((w, k) =>
        `<div class="abs lab env" style="left:164px;top:${620 + k * 80 - 46}px;color:var(--env);font-size:30px" data-a="fade" data-s="1" data-d="${200 + k * 140}">${w}</div>`).join('')}`
  });

  /* A2 · the clock: Tallinn's 03:30 happens twice, Lagos's once */
  const X0 = 300, X1 = 1700, H0 = 2, H1 = 6;
  const hx = (h) => X0 + (h - H0) / (H1 - H0) * (X1 - X0);
  D.slide({ id: 'A2-clock', bg: 'paper', steps: 1,
    notes: 'A cron job at 03:30. [click] Tallinn, 25 October: the clock goes back at 04:00, so 03:30 comes round twice. Lagos never changes its clocks.',
    html: `
      <div class="abs mono" style="left:140px;top:110px;font-size:64px;letter-spacing:-.01em" data-a="up">30 3 * * *</div>
      <svg class="abs" id="clk" width="1920" height="1080" style="left:0;top:0">
        ${[480, 830].map((y, r) => `
          <path class="ln-hair" d="M${X0} ${y} H${X1}" data-a="draw" data-d="${200 + r * 150}"/>
          ${[2, 3, 4, 5, 6].map(h => `<path class="ln-hair" d="M${hx(h)} ${y - 14} V${y + 14}" data-a="fade" data-d="${300 + r * 150}"/>`).join('')}
          <path d="M${hx(3.5)} ${y - 70} V${y + 70}" stroke="var(--fg)" stroke-width="2.5" stroke-dasharray="4 7" data-a="fade" data-d="${500 + r * 150}"/>`).join('')}
        <path id="jump" class="ln-env" d="M${hx(4)} 470 C ${hx(4)} 360, ${hx(3)} 360, ${hx(3)} 470" stroke-dasharray="0"/>
      </svg>
      ${[480, 830].map((y, r) => [2, 3, 4, 5, 6].map(h => `<div class="abs lab" style="left:${hx(h) - 40}px;top:${y + 26}px;width:80px;text-align:center" data-a="fade" data-d="${300 + r * 150}">0${h}:00</div>`).join('')).join('')}
      <div class="abs t-m" style="left:140px;top:448px" data-a="right" data-d="100">Tallinn</div>
      <div class="abs t-m" style="left:140px;top:798px" data-a="right" data-d="250">Lagos</div>
      <div class="abs lab" style="left:${hx(3.5) - 60}px;top:360px;width:120px;text-align:center" data-a="fade" data-d="600">03:30</div>
      <div class="abs" id="headT" style="left:0;top:0;width:28px;height:28px;border-radius:50%;background:var(--env);opacity:0"></div>
      <div class="abs" id="headL" style="left:0;top:0;width:28px;height:28px;border-radius:50%;background:var(--fg);opacity:0"></div>
      <div class="abs mono" id="cntT" style="left:1740px;top:446px;font-size:64px;color:var(--env)">×0</div>
      <div class="abs mono" id="cntL" style="left:1740px;top:796px;font-size:64px">×0</div>`,
    leave(el) { cancelAnimationFrame(el._raf); },
    on(step, el, D, animate) {
      const hT = el.querySelector('#headT'), hL = el.querySelector('#headL'), cT = el.querySelector('#cntT'), cL = el.querySelector('#cntL');
      const jump = el.querySelector('#jump');
      const L = jump.getTotalLength();
      cancelAnimationFrame(el._raf);
      const place = (n, h, y) => { n.style.transform = `translate(${hx(h) - 14}px, ${y - 14}px)`; };
      // Tallinn local time as a function of progress p (0..1): 02:30 → 04:00, jump to 03:00, → 04:30
      const tallinn = (p) => { const real = 2.5 + p * 3; return real < 4 ? [real, 0] : [real - 1, 1]; };
      const ring = (h, y, color) => {
        const r = document.createElement('div'); r.className = 'abs';
        Object.assign(r.style, { left: hx(h) - 40 + 'px', top: y - 40 + 'px', width: '80px', height: '80px', borderRadius: '50%', border: `3px solid ${color}` });
        el.appendChild(r);
        r.animate([{ transform: 'scale(.3)', opacity: 1 }, { transform: 'scale(1.6)', opacity: 0 }], { duration: 900, easing: ease }).onfinish = () => r.remove();
      };
      if (step === 0) {
        hT.style.opacity = hL.style.opacity = 0; cT.textContent = '×0'; cL.textContent = '×0';
        jump.style.strokeDasharray = L; jump.style.strokeDashoffset = L; return;
      }
      hT.style.opacity = hL.style.opacity = 1;
      if (!animate) { place(hT, 4.5, 480); place(hL, 5.5, 830); cT.textContent = '×2'; cL.textContent = '×1'; jump.style.strokeDashoffset = 0; return; }
      const dur = 7000, t0 = performance.now();
      let firedT = 0, firedL = 0, prevT = 2.5, prevL = 2.5, jumped = false;
      const tick = (now) => {
        const p = Math.min(1, (now - t0) / dur);
        const [hT_, seg] = tallinn(p), hL_ = 2.5 + p * 3;
        if (seg === 1 && !jumped) {
          jumped = true;
          jump.style.transition = `stroke-dashoffset 450ms ${ease}`; jump.style.strokeDashoffset = 0;
          hT.animate([{ transform: `translate(${hx(4) - 14}px, 466px) scale(1)` }, { transform: `translate(${(hx(4) + hx(3)) / 2 - 14}px, 360px) scale(1.25)` }, { transform: `translate(${hx(3) - 14}px, 466px) scale(1)` }], { duration: 450, easing: 'ease-in-out' });
          prevT = 3;
        }
        if (prevT < 3.5 && hT_ >= 3.5) { firedT++; cT.textContent = '×' + firedT; ring(3.5, 480, 'var(--env)'); cT.animate([{ transform: 'scale(1.35)' }, { transform: 'scale(1)' }], { duration: 500, easing: ease }); }
        if (prevL < 3.5 && hL_ >= 3.5) { firedL++; cL.textContent = '×' + firedL; ring(3.5, 830, 'var(--fg)'); cL.animate([{ transform: 'scale(1.35)' }, { transform: 'scale(1)' }], { duration: 500, easing: ease }); }
        prevT = hT_; prevL = hL_;
        place(hT, hT_, 480); place(hL, hL_, 830);
        if (p < 1) el._raf = requestAnimationFrame(tick);
      };
      jump.style.transition = 'none'; jump.style.strokeDasharray = L; jump.style.strokeDashoffset = L;
      el._raf = requestAnimationFrame(tick);
    }
  });

  /* A3 · the Environment Profile: six forces around one system */
  const nodes = [
    ['01', 'Connectivity', 360, 300], ['02', 'Devices', 1230, 300], ['03', 'Money rails', 1330, 560],
    ['04', 'Identity rails', 1230, 820], ['05', 'Jurisdiction', 360, 820], ['06', 'Forgiveness', 260, 560]];
  D.slide({ id: 'A3-profile', bg: 'paper',
    notes: 'The Environment Profile. [click] connectivity [click] devices [click] money rails [click] identity rails [click] jurisdiction [click] forgiveness.',
    html: `
      <div class="abs t-l" style="left:140px;top:110px" data-a="up">The Environment Profile</div>
      <svg class="abs" width="1920" height="1080" style="left:0;top:0">
        ${nodes.map(([n, t, x, y], k) => {
          const ax = x < 900 ? x + 330 : x - 40, ay = y + 30;
          return `<path class="ln-env" d="M${ax} ${ay} L${960 + (ax < 960 ? -150 : 150)} ${590 + (ay - 590) * .25}" data-a="draw" data-s="${k + 1}" data-dur="600"/>`;
        }).join('')}
      </svg>
      <div class="box" style="left:810px;top:520px;width:300px;height:140px;font-size:30px" data-a="pop" data-d="200">your system</div>
      ${nodes.map(([n, t, x, y], k) => `
        <div class="abs" style="left:${x}px;top:${y}px;width:${x < 900 ? 330 : 420}px;${x < 900 ? 'text-align:right' : ''}" data-a="up" data-s="${k + 1}" data-d="250" data-dim="${k + 2}" data-undim="${nodes.length + 1}">
          <div class="lab">${n}</div><div class="t-m" style="font-weight:600">${t}</div></div>`).join('')}`,
    init(el) { /* final step: everything un-dims */ }
  });

  /* A4 · one response = one packet */
  D.slide({ id: 'A4-packet', bg: 'paper', steps: 1,
    notes: 'Every network response has to fit into one packet. [click] If a response needs ten packets and one gets lost, TCP has to resend it, and everyone waits.',
    html: `
      <div class="abs t-l" style="left:140px;top:110px" data-a="up">One response. <span class="env">One packet.</span></div>
      <div class="abs lab" style="left:140px;top:220px" data-a="fade" data-d="300">mtu · 1,500 bytes</div>
      <svg class="abs" width="1920" height="1080" style="left:0;top:0"><path class="ln-hair" d="M420 610 H1500" data-a="draw" data-d="200"/></svg>
      <div class="box" style="left:140px;top:530px;width:280px;height:160px" data-a="right">phone</div>
      <div class="box" style="left:1500px;top:530px;width:280px;height:160px" data-a="left">server</div>
      <div class="abs" id="pk-area" style="left:0;top:0;width:1920px;height:1080px"></div>
      <div class="abs lab" id="pk-note" style="left:420px;top:760px;width:1080px;text-align:center"></div>`,
    leave(el) { (el._anims || []).forEach(a => a.cancel()); clearTimeout(el._to); },
    on(step, el, D, animate) {
      const area = el.querySelector('#pk-area'), note = el.querySelector('#pk-note');
      (el._anims || []).forEach(a => a.cancel()); el._anims = []; clearTimeout(el._to);
      area.innerHTML = ''; note.textContent = '';
      const pk = (x, color, w = 64) => { const p = document.createElement('div'); p.className = 'abs';
        Object.assign(p.style, { left: '0', top: '0', width: w + 'px', height: '44px', background: color, transform: `translate(${x}px, 588px)` }); area.appendChild(p); return p; };
      const go = (p, keys, opt) => { const a = p.animate(keys, Object.assign({ fill: 'forwards', easing: ease }, opt)); el._anims.push(a); return a; };
      if (step === 0) {
        const p = pk(1420, 'var(--env)');
        if (!animate) { p.style.transform = 'translate(440px, 588px)'; return; }
        go(p, [{ transform: 'translate(1420px, 588px)' }, { transform: 'translate(440px, 588px)' }], { duration: 1300, delay: 900 });
        return;
      }
      // step 1: ten packets, number 7 lost, everyone waits, then it's resent
      note.textContent = '';
      const slots = [...Array(10)].map((_, k) => 440 + k * 52);
      const ps = slots.map((x, k) => pk(1420, k === 6 ? 'var(--warn)' : 'var(--fg)', 40));
      if (!animate) {
        ps.forEach((p, k) => p.style.transform = `translate(${slots[k]}px, 588px)`);
        ps[6].style.background = 'var(--env)'; note.textContent = 'packet 7 lost · resent · everyone waited';
        return;
      }
      ps.forEach((p, k) => {
        const toX = slots[k];
        if (k === 6) {
          go(p, [{ transform: 'translate(1420px, 588px)' }, { transform: 'translate(960px, 588px)', offset: .55 }, { transform: 'translate(930px, 760px) rotate(25deg)', opacity: 0 }],
            { duration: 1500, delay: 300 + k * 140, easing: 'cubic-bezier(.4,0,.6,1)' });
        } else {
          go(p, [{ transform: 'translate(1420px, 588px)' }, { transform: `translate(${toX}px, 588px)` }], { duration: 1200, delay: 300 + k * 140 });
        }
      });
      el._to = setTimeout(() => {
        note.textContent = 'packet 7 lost · everyone waits';
        note.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 400 });
        el._to = setTimeout(() => {
          const r = pk(1420, 'var(--env)', 40);
          go(r, [{ transform: 'translate(1420px, 588px)' }, { transform: `translate(${slots[6]}px, 588px)` }], { duration: 1400 });
          el._to = setTimeout(() => { note.textContent = 'packet 7 resent · now the response is complete'; }, 1400);
        }, 1600);
      }, 2400);
    }
  });
})();
