/* Direction C · "One World" — four test moments on one travelling map */
(function () {
  const D = window.D;
  const NS = 'http://www.w3.org/2000/svg';
  const W = 1920, H = 1080;
  const CITY = { lagos: [3.38, 6.52], tallinn: [24.75, 59.44], frankfurt: [8.68, 50.11], mumbai: [72.88, 19.08], saopaulo: [-46.63, -23.55], mexico: [-99.13, 19.43] };
  const COL = { lagos: '#0E9F6E', tallinn: '#2457F5', warn: '#F0482E', ink: '#101418', hot: '#F0482E' };
  let proj, path, feats;
  const ready = () => {
    if (proj) return true;
    if (!window.d3 || !window.WORLD_50M) return false;
    feats = topojson.feature(WORLD_50M, WORLD_50M.objects.countries).features;
    proj = d3.geoNaturalEarth1().fitExtent([[0, 0], [W, H]], { type: 'Sphere' });
    path = d3.geoPath(proj);
    return true;
  };
  // camera that fits a lon/lat box into a screen region
  const cam = (box, region = [0, 0, W, H], pad = .82) => {
    const a = proj(box[0]), b = proj(box[1]);
    const x0 = Math.min(a[0], b[0]), x1 = Math.max(a[0], b[0]), y0 = Math.min(a[1], b[1]), y1 = Math.max(a[1], b[1]);
    const rw = region[2] - region[0], rh = region[3] - region[1];
    const k = Math.min(rw / (x1 - x0), rh / (y1 - y0)) * pad;
    return { k, x: (region[0] + region[2]) / 2 - k * (x0 + x1) / 2, y: (region[1] + region[3]) / 2 - k * (y0 + y1) / 2 };
  };
  const tf = (c) => `translate(${c.x}px, ${c.y}px) scale(${c.k})`;
  const scr = (c, ll) => { const p = proj(ll); return [c.x + c.k * p[0], c.y + c.k * p[1]]; };
  let lastCam = null;

  // draw the world into a slide's <svg>; returns the camera <g>
  const world = (el) => {
    const svg = el.querySelector('svg.map'); if (!ready()) return null;
    const g = document.createElementNS(NS, 'g'); g.setAttribute('class', 'cam'); g.style.transformOrigin = '0 0';
    g.innerHTML = feats.map(f => `<path d="${path(f) || ''}" data-id="${f.id}" fill="var(--land)" stroke="var(--border)" stroke-width="1.2" style="transition:fill .7s"/>`).join('');
    svg.appendChild(g); return g;
  };
  const fill = (g, id, c) => { const p = g.querySelector(`[data-id="${id}"]`); if (p) p.setAttribute('fill', c); };
  const move = (g, to, animate, dur = 1800) => {
    if (animate && lastCam) g.animate([{ transform: tf(lastCam) }, { transform: tf(to) }], { duration: dur, easing: 'cubic-bezier(.65,0,.25,1)', fill: 'forwards' });
    else g.style.transform = tf(to);
    if (!animate) g.getAnimations().forEach(a => a.cancel());
    g.style.transform = tf(to); lastCam = to;
  };
  // night side of the earth at a UTC time on 25 October (sun declination about -12°)
  const night = (utcH) => d3.geoCircle().center([(((12 - utcH) * 15 + 180) % 360 + 540) % 360 - 180, 12]).radius(90)();
  const marker = (c, ll, color, name, delay, side = 'right') => {
    const [x, y] = scr(c, ll);
    return `<div class="dot" style="left:${x}px;top:${y}px;background:${color}" data-a="pop" data-d="${delay}"></div>
      <div class="city" style="left:${side === 'right' ? x + 28 : x - 28}px;top:${y - 26}px;${side === 'left' ? 'transform:translateX(-100%)' : ''}" data-a="fade" data-d="${delay + 150}">${name}</div>`;
  };

  /* C1 · same code, different environment: Lagos → Tallinn */
  D.slide({ id: 'C1-travel', bg: 'sea', steps: 1,
    notes: 'I built software in Lagos. Today I build it in Tallinn. [click] Same code, different environment.',
    html: `<svg class="map abs" width="${W}" height="${H}" style="left:0;top:0"></svg><div class="abs ov" style="inset:0"></div>
      <div class="abs t-l" style="left:120px;top:100px;width:640px">
        <div data-a="up" data-d="2600">Same code.</div><div data-a="up" data-s="1">Different <span class="ser" style="font-size:100px">environment.</span></div></div>`,
    enter(el, D, animate) {
      const g = el._g || (el._g = world(el)); if (!g) return;
      const near = cam([[-4, 1], [11, 12]]), both = cam([[-14, 0], [42, 64]], [700, 60, 1860, 1020]);
      fill(g, '566', '#D6F2E6'); fill(g, '233', '#DCE5FE');
      const ov = el.querySelector('.ov');
      // arc Lagos → Tallinn in map space
      let arc = g.querySelector('.arc');
      if (!arc) { arc = document.createElementNS(NS, 'path'); arc.setAttribute('class', 'arc'); arc.setAttribute('fill', 'none'); arc.setAttribute('stroke', COL.ink); arc.setAttribute('stroke-width', 2.5); arc.setAttribute('vector-effect', 'non-scaling-stroke');
        const a = proj(CITY.lagos), b = proj(CITY.tallinn); arc.setAttribute('d', `M${a[0]} ${a[1]} Q${(a[0] + b[0]) / 2 + 60} ${(a[1] + b[1]) / 2} ${b[0]} ${b[1]}`); g.appendChild(arc); }
      const L = arc.getTotalLength() * 12; arc.style.strokeDasharray = L;
      clearTimeout(el._t);
      if (!animate) { move(g, both, false); arc.style.strokeDashoffset = 0;
        ov.innerHTML = marker(both, CITY.lagos, COL.lagos, 'Lagos', 0) + marker(both, CITY.tallinn, COL.tallinn, 'Tallinn', 0) + tags(both);
        ov.querySelectorAll('[data-a]').forEach(n => n.classList.add('on')); return; }
      lastCam = cam([[-40, -30], [60, 70]]);
      move(g, near, true, 1400);
      arc.style.transition = 'none'; arc.style.strokeDashoffset = L;
      ov.innerHTML = '';
      el._t0 = setTimeout(() => { ov.innerHTML = marker(near, CITY.lagos, COL.lagos, 'Lagos', 0, 'left'); requestAnimationFrame(() => requestAnimationFrame(() => ov.querySelectorAll('[data-a]').forEach(n => n.classList.add('on')))); }, 1100);
      el._t = setTimeout(() => {
        ov.innerHTML = '';
        move(g, both, true, 2000);
        setTimeout(() => { arc.style.transition = 'stroke-dashoffset 1.3s cubic-bezier(.16,1,.3,1)'; arc.style.strokeDashoffset = 0; }, 900);
        el._t = setTimeout(() => {
          ov.innerHTML = marker(both, CITY.lagos, COL.lagos, 'Lagos', 0) + marker(both, CITY.tallinn, COL.tallinn, 'Tallinn', 300) + tags(both);
          requestAnimationFrame(() => requestAnimationFrame(() => ov.querySelectorAll('[data-a]:not([data-s])').forEach(n => n.classList.add('on'))));
        }, 1700);
      }, 2200);
      function tags(c) {
        const [lx, ly] = scr(c, CITY.lagos), [tx, ty] = scr(c, CITY.tallinn);
        const t = (x, y, txt, col, d) => `<div class="abs lab" style="left:${x}px;top:${y}px;background:var(--land);color:${col};padding:8px 14px" data-a="up" data-s="1" data-d="${d}">${txt}</div>`;
        return t(lx + 30, ly + 30, 'UTC+1 all year', COL.lagos, 200) + t(lx + 30, ly + 86, 'prepaid data', COL.lagos, 320) + t(lx + 30, ly + 142, 'phone number = ID', COL.lagos, 440)
          + t(tx + 30, ty + 40, 'UTC+2 / UTC+3', COL.tallinn, 600) + t(tx + 30, ty + 96, 'Smart-ID', COL.tallinn, 720) + t(tx + 30, ty + 152, 'GDPR', COL.tallinn, 840);
      }
    },
    on(step, el) { if (step === 1) el.querySelectorAll('.ov [data-s="1"]').forEach(n => n.classList.add('on')); else el.querySelectorAll('.ov [data-s="1"]').forEach(n => n.classList.remove('on')); },
    leave(el) { clearTimeout(el._t); clearTimeout(el._t0); }
  });

  /* C2 · night over Europe and Africa: 03:30 twice in Tallinn, once in Lagos */
  const fmt = (m) => { m = ((m % 1440) + 1440) % 1440; return String(Math.floor(m / 60)).padStart(2, '0') + ':' + String(Math.floor(m % 60)).padStart(2, '0'); };
  D.slide({ id: 'C2-night', bg: 'sea', steps: 1,
    notes: 'A cron job at 03:30. [click] Night of 25 October. Tallinn goes from summer time to winter time at 04:00, so 03:30 happens twice. Lagos doesn\'t change its clocks.',
    html: `<svg class="map abs" width="${W}" height="${H}" style="left:0;top:0"></svg><div class="abs ov" style="inset:0"></div>
      <div class="panel" style="left:120px;top:100px" data-a="up"><div class="lab">cron</div><div style="font-family:GeistMono;font-size:60px;font-weight:500;margin-top:6px">30 3 * * *</div></div>
      <div class="panel" id="pT" style="left:1240px;top:150px;width:520px" data-a="left" data-d="300"><div class="lab" style="color:${COL.tallinn}">Tallinn</div>
        <div style="display:flex;align-items:baseline;gap:20px"><span id="tT" class="t-l" style="font-size:120px;font-variant-numeric:tabular-nums">03:00</span><span id="zT" class="lab" style="font-size:30px">EEST</span></div>
        <div class="lab" id="rT" style="color:var(--ink);font-size:30px">runs: 0</div></div>
      <div class="panel" id="pL" style="left:1240px;top:640px;width:520px" data-a="left" data-d="450"><div class="lab" style="color:${COL.lagos}">Lagos</div>
        <div style="display:flex;align-items:baseline;gap:20px"><span id="tL" class="t-l" style="font-size:120px;font-variant-numeric:tabular-nums">01:00</span><span class="lab" style="font-size:30px">WAT</span></div>
        <div class="lab" id="rL" style="color:var(--ink);font-size:30px">runs: 0</div></div>
      <div class="abs lab" id="utc" style="left:120px;top:980px">00:00 UTC</div>`,
    enter(el, D, animate) {
      const g = el._g || (el._g = world(el)); if (!g) return;
      const c = cam([[-18, -2], [45, 66]], [80, 40, 1220, 1040]);
      fill(g, '566', '#D6F2E6'); fill(g, '233', '#DCE5FE');
      if (!el._night) { el._night = document.createElementNS(NS, 'path'); el._night.setAttribute('fill', 'rgba(16,24,48,.14)'); el._night.setAttribute('stroke', 'none'); g.appendChild(el._night); }
      el._night.setAttribute('d', path(night(0)));
      move(g, c, animate, 1600); el._c = c;
      const ov = el.querySelector('.ov');
      ov.innerHTML = '';
      const put = () => { ov.innerHTML = marker(c, CITY.tallinn, COL.tallinn, '', 0) + marker(c, CITY.lagos, COL.lagos, '', 150); requestAnimationFrame(() => requestAnimationFrame(() => ov.querySelectorAll('[data-a]').forEach(n => n.classList.add('on')))); };
      if (animate) setTimeout(put, 1500); else put();
    },
    leave(el) { cancelAnimationFrame(el._raf); },
    on(step, el, D, animate) {
      const $ = (s) => el.querySelector(s);
      cancelAnimationFrame(el._raf);
      const ring = (ll, color) => { const [x, y] = scr(el._c, ll); const r = document.createElement('div'); r.className = 'abs';
        Object.assign(r.style, { left: x - 60 + 'px', top: y - 60 + 'px', width: '120px', height: '120px', borderRadius: '50%', border: `4px solid ${color}` });
        el.querySelector('.ov').appendChild(r); r.animate([{ transform: 'scale(.2)', opacity: 1 }, { transform: 'scale(1.5)', opacity: 0 }], { duration: 1100, easing: 'cubic-bezier(.16,1,.3,1)' }).onfinish = () => r.remove(); };
      const show = (u) => { // u = UTC minutes since 00:00
        const tallinn = u < 60 ? u + 180 : u + 120, lagos = u + 60;
        $('#tT').textContent = fmt(tallinn); $('#zT').textContent = u < 60 ? 'EEST' : 'EET'; $('#tL').textContent = fmt(lagos);
        $('#utc').textContent = fmt(u) + ' UTC'; if (el._night) el._night.setAttribute('d', path(night(u / 60)));
      };
      if (step === 0) { show(0); $('#rT').textContent = 'runs: 0'; $('#rL').textContent = 'runs: 0'; return; }
      if (!animate) { show(180); $('#rT').textContent = 'runs: 2'; $('#rL').textContent = 'runs: 1'; return; }
      const dur = 9000, t0 = performance.now(); let rt = 0, rl = 0, prev = 0;
      const tick = (now) => {
        const p = Math.min(1, (now - t0) / dur), u = p * 180;
        // Tallinn 03:30 at UTC 00:30 and 01:30; Lagos 03:30 at UTC 02:30
        [[30, 'T'], [90, 'T'], [150, 'L']].forEach(([m, w]) => {
          if (prev < m && u >= m) {
            if (w === 'T') { rt++; $('#rT').textContent = 'runs: ' + rt; ring(CITY.tallinn, COL.tallinn); $('#pT').animate([{ transform: 'scale(1.04)' }, { transform: 'scale(1)' }], { duration: 500 }); }
            else { rl++; $('#rL').textContent = 'runs: ' + rl; ring(CITY.lagos, COL.lagos); $('#pL').animate([{ transform: 'scale(1.04)' }, { transform: 'scale(1)' }], { duration: 500 }); }
          }
        });
        if (prev < 60 && u >= 60) $('#tT').animate([{ color: COL.warn, transform: 'translateY(-14px)' }, { color: 'inherit', transform: 'none' }], { duration: 900, easing: 'cubic-bezier(.16,1,.3,1)' });
        prev = u; show(u);
        if (p < 1) el._raf = requestAnimationFrame(tick);
      };
      el._raf = requestAnimationFrame(tick);
    }
  });

  /* C3 · the Environment Profile as places on the map */
  const ROWS = [['Connectivity', ['356', '566']], ['Devices', ['356']], ['Money rails', ['076', '566', '484']], ['Identity rails', ['233', '566']], ['Jurisdiction', ['356', '233', '752']], ['Forgiveness', ['566', '076']]];
  D.slide({ id: 'C3-profile', bg: 'sea',
    notes: 'The Environment Profile. Each row is a place where it mattered. [click] connectivity … [click] forgiveness.',
    html: `<svg class="map abs" width="${W}" height="${H}" style="left:0;top:0"></svg>
      <div class="panel" style="left:100px;top:90px;bottom:90px;width:620px;padding:56px 52px" data-a="right">
        <div class="t-m" style="font-size:56px;line-height:1.05">The Environment Profile</div>
        <div style="margin-top:46px">${ROWS.map(([t], k) => `
          <div class="prow" style="display:flex;align-items:baseline;gap:22px;border-top:2px solid var(--border);padding:16px 0" data-a="up" data-s="${k + 1}" data-dim="${k + 2}" data-undim="${ROWS.length + 1}">
            <span class="lab">0${k + 1}</span><span style="font-weight:600;font-size:46px;letter-spacing:-.02em">${t}</span></div>`).join('')}</div></div>`,
    enter(el, D, animate) {
      const g = el._g || (el._g = world(el)); if (!g) return;
      move(g, cam([[-125, -50], [150, 70]], [740, 40, 1900, 1040], .98), animate, 1600);
    },
    on(step, el) {
      const g = el._g; if (!g) return;
      ROWS.forEach(([, ids]) => ids.forEach(id => fill(g, id, 'var(--land)')));
      if (step >= 1 && step <= ROWS.length) ROWS[step - 1][1].forEach(id => fill(g, id, COL.hot));
      if (step === ROWS.length + 1) ROWS.forEach(([, ids]) => ids.forEach(id => fill(g, id, '#F7B5A8')));
    },
    steps: 7
  });

  /* C4 · one response, one packet: Frankfurt → Lagos */
  D.slide({ id: 'C4-packets', bg: 'sea', steps: 1,
    notes: 'Every network response has to fit into one packet. [click] Ten packets, one is lost, TCP resends it, and everyone waits.',
    html: `<svg class="map abs" width="${W}" height="${H}" style="left:0;top:0"></svg><div class="abs ov" style="inset:0"></div>
      <div class="abs t-l" style="left:120px;top:100px" data-a="up">One response. <span class="ser" style="font-size:100px">One packet.</span></div>
      <div class="panel lab" id="pn" style="left:120px;top:900px;color:var(--ink);opacity:0">packet 7 lost · everyone waits</div>`,
    enter(el, D, animate) {
      const g = el._g || (el._g = world(el)); if (!g) return;
      const c = cam([[-12, 2], [24, 54]], [500, 120, 1880, 1040]); el._c = c;
      fill(g, '566', '#D6F2E6');
      move(g, c, animate, 1600);
      const ov = el.querySelector('.ov');
      const a = scr(c, CITY.frankfurt), b = scr(c, CITY.lagos);
      el._A = a; el._B = b;
      ov.innerHTML = `<svg class="abs" width="${W}" height="${H}" style="left:0;top:0"><path id="route" d="M${a[0]} ${a[1]} Q${(a[0] + b[0]) / 2 - 260} ${(a[1] + b[1]) / 2} ${b[0]} ${b[1]}" fill="none" stroke="${COL.ink}" stroke-width="2.5" stroke-dasharray="3 9" data-a="fade" data-d="1200"/></svg>
        <div class="dot" style="left:${a[0]}px;top:${a[1]}px;background:${COL.ink}" data-a="pop" data-d="1300"></div><div class="city" style="left:${a[0] + 28}px;top:${a[1] - 26}px" data-a="fade" data-d="1400">Server, Frankfurt</div>
        <div class="dot" style="left:${b[0]}px;top:${b[1]}px;background:${COL.lagos}" data-a="pop" data-d="1500"></div><div class="city" style="left:${b[0] + 28}px;top:${b[1] - 26}px" data-a="fade" data-d="1600">Phone, Lagos</div>`;
      requestAnimationFrame(() => requestAnimationFrame(() => ov.querySelectorAll('[data-a]').forEach(n => n.classList.add('on'))));
    },
    leave(el) { cancelAnimationFrame(el._raf); },
    on(step, el, D, animate) {
      const ov = el.querySelector('.ov'), route = ov.querySelector('#route'), pn = el.querySelector('#pn'); if (!route) return;
      cancelAnimationFrame(el._raf); ov.querySelectorAll('.pk').forEach(n => n.remove()); pn.style.opacity = 0;
      const L = route.getTotalLength();
      const pk = (col) => { const d = document.createElement('div'); d.className = 'abs pk'; Object.assign(d.style, { left: 0, top: 0, width: '22px', height: '22px', background: col, border: '3px solid #fff' }); ov.appendChild(d); return d; };
      const put = (d, t, dy = 0) => { const p = route.getPointAtLength(L * t); d.style.transform = `translate(${p.x - 11}px, ${p.y - 11 + dy}px)`; };
      const n = step === 0 ? 1 : 10;
      const ps = [...Array(n)].map((_, k) => pk(step === 1 && k === 6 ? COL.warn : COL.tallinn));
      // arrivals stack beside the phone
      const B = el._B, slot = (k) => { const d = ps[k]; d.style.transform = `translate(${B[0] - 40 - (k % 5) * 30}px, ${B[1] + 50 + Math.floor(k / 5) * 30}px)`; };
      if (!animate) { if (step === 0) put(ps[0], 1); else { ps.forEach((d, k) => slot(k)); ps[6].style.background = COL.tallinn; pn.style.opacity = 1; pn.textContent = 'packet 7 resent · complete'; } return; }
      const t0 = performance.now() + (step === 0 ? 1800 : 0);
      const tick = (now) => {
        const s = (now - t0) / 1000; let done = true;
        ps.forEach((d, k) => {
          const st = s - k * .22, t = Math.min(1, Math.max(0, st / 2.2));
          if (step === 1 && k === 6) {
            if (st < 1.1) { put(d, Math.max(0, st / 2.2)); done = false; }
            else if (st < 2.2) { put(d, .5, (st - 1.1) * 320); d.style.opacity = 1 - (st - 1.1); done = false; if (pn.style.opacity === '0') { pn.style.opacity = 1; pn.textContent = 'packet 7 lost · everyone waits'; } }
            else if (st < 3.6) { d.style.opacity = 0; done = false; }
            else { const r = Math.min(1, (st - 3.6) / 2.2); d.style.opacity = 1; d.style.background = COL.tallinn; if (r < 1) { put(d, r); done = false; } else { slot(k); pn.textContent = 'packet 7 resent · complete'; } }
          } else { if (t < 1) { put(d, t); done = false; } else if (step === 1) slot(k); else put(d, 1); }
        });
        if (!done) el._raf = requestAnimationFrame(tick);
      };
      ps.forEach(d => put(d, 0));
      el._raf = requestAnimationFrame(tick);
    }
  });
})();
