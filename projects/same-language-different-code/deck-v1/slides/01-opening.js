/* OPENING 0:00–4:00 */
(function () {
  const D = window.D;
  const SEC = 'Opening';

  /* 0. Holding slide while people sit down */
  D.slide({ id: 'title', sec: SEC, t: 'before 0:00', bg: 'ink',
    notes: 'Holding slide while people sit down. Press R to replay the title motion. Press S for this presenter window, T to switch to the dark stage theme, B for a black screen.',
    html: `
      <div class="abs mono" style="left:120px;top:110px;color:var(--sub)" data-a="fade" data-d="900">Øredev 2026 · Malmö</div>
      <div class="abs" style="left:110px;top:200px;width:1760px">
        <div class="tiles" style="gap:8px;flex-wrap:nowrap">
          ${'SAME'.split('').map((c, k) => `<span class="tile" style="font-size:200px;background:var(--tomato);color:var(--ink)" data-a="drop" data-d="${k * 70}">${c}</span>`).join('')}
          <span style="width:40px"></span>
          ${'LANGUAGE,'.split('').map((c, k) => `<span class="tile" style="font-size:200px;background:var(--paper);color:var(--ink)" data-a="drop" data-d="${300 + k * 55}">${c}</span>`).join('')}
        </div>
        <div class="tiles" style="gap:8px;margin-top:16px;flex-wrap:nowrap">
          ${'DIFFERENT'.split('').map((c, k) => `<span class="tile" style="font-size:200px;background:var(--cobalt);color:var(--paper)" data-a="drop" data-d="${800 + k * 55}">${c}</span>`).join('')}
          <span style="width:40px"></span>
          ${'CODE'.split('').map((c, k) => `<span class="tile" style="font-size:200px;background:var(--lime);color:var(--ink)" data-a="drop" data-d="${1300 + k * 70}">${c}</span>`).join('')}
        </div>
      </div>
      <div class="abs sub" style="left:120px;top:850px;width:1300px;color:var(--paper)" data-a="up" data-d="1700">How moving from Nigeria to Estonia rewired how I build software</div>
      <div class="abs mono" style="left:120px;top:960px;color:var(--sub)" data-a="fade" data-d="1900">Gbemisola Oladetoun · @WithGbemi</div>`
  });

  /* 1. Jollof photo */
  D.slide({ id: 'jollof', sec: SEC, t: '0:00', bg: 'ink',
    notes: `Does anyone know what this food is? Anybody have an idea what food this is? If you know, you can just raise your hand.
[wait] Okay, a few people. Nice.
[click] Alright, this is jollof rice.`,
    html: `
      <div class="abs push" style="inset:0"><img src="assets/img/jollof-2.jpg" style="width:100%;height:100%;object-fit:cover;object-position:50% 40%" alt=""></div>
      <div class="abs" style="left:0;right:0;bottom:0;height:300px;background:var(--ink)" data-a="wipeup" data-s="1"></div>
      <div class="abs huge" style="left:100px;bottom:70px;font-size:250px;color:var(--tomato)" data-a="rise" data-s="1" data-d="150">Jollof rice</div>
      <div class="abs mono" style="right:100px;bottom:96px;color:var(--paper);text-align:right" data-a="fade" data-s="1" data-d="500">West Africa</div>`
  });

  /* 2. The jollof war: Ghana, Senegal, Nigeria light up */
  D.slide({ id: 'jollof-war', sec: SEC, t: '0:40', bg: 'paper',
    notes: `Jollof rice is a very popular dish across West Africa, and guys, this is a very interesting one, because there is a literal war being fought about this dish.
[click] Ghanaians will say that Ghanaian jollof rice is the best.
[click] Senegalese people will say theirs is the best, and they'll even remind the rest of us that jollof rice started with them.
[click] And of course I'm Nigerian, so obviously I'm going to tell you that Nigerian jollof is the best. [let them laugh]`,
    html: `
      <div class="abs huge" style="left:100px;top:90px;font-size:150px" data-a="rise">The jollof war</div>
      <svg class="abs" id="wa-map" width="1720" height="700" style="left:100px;top:250px"></svg>
      <div class="abs" style="left:0;top:0;width:0;height:0" id="wa-labels">
        <div class="abs" data-k="sn" style="width:440px" data-a="pop" data-s="2"><div class="huge" style="font-size:84px">Senegal</div><div class="body" style="font-size:34px">“Ours is the best. And it started with us.”</div></div>
        <div class="abs" data-k="gh" style="width:420px" data-a="pop" data-s="1"><div class="huge" style="font-size:84px">Ghana</div><div class="body" style="font-size:34px">“Ours is the best.”</div></div>
        <div class="abs" data-k="ng" style="width:460px" data-a="pop" data-s="3"><div class="huge red" style="font-size:84px">Nigeria</div><div class="body" style="font-size:34px">“Obviously, <span class="hl" data-s="3" data-d="500">ours is the best</span>.”</div></div>
      </div>`,
    init(el) {
      const svg = el.querySelector('#wa-map');
      const m = D.map(svg, { extent: [[-18, 3.5], [15, 16.5]], land: 'var(--card)', stroke: 'rgba(18,18,18,.25)', sw: 2 });
      el._m = m; if (!m) return;
      const pos = { sn: [100, 820], gh: [620, 880], ng: [1380, 300] };
      el.querySelectorAll('#wa-labels [data-k]').forEach(n => { n.style.left = pos[n.dataset.k][0] + 'px'; n.style.top = pos[n.dataset.k][1] + 'px'; });
    },
    on(step, el) {
      const m = el._m; if (!m) return;
      const fills = { 1: [D.ISO.ghana, 'var(--ink)'], 2: [D.ISO.senegal, 'var(--ink)'], 3: [D.ISO.nigeria, 'var(--tomato)'] };
      if (step === 0) [D.ISO.ghana, D.ISO.senegal, D.ISO.nigeria].forEach(id => m.fill(id, 'var(--card)'));
      if (fills[step]) m.fill(fills[step][0], fills[step][1]);
    }
  });

  /* 3. Same ingredients, different kitchen */
  D.slide({ id: 'ingredients', sec: SEC, t: '1:20', bg: 'tomato',
    notes: `Now, the core ingredients for jollof are basically the same everywhere. We have rice, tomatoes, pepper and spices.
[click] But when Ghanaians cook their jollof, they end up with something slightly different from Nigerian jollof. And Senegalese jollof is a little different from both.
[click] The core ingredients are the same, but the kitchen and the country where it's prepared are different.`,
    html: `
      <div class="abs" style="left:100px;top:110px;display:flex;gap:22px">
        ${['Rice', 'Tomatoes', 'Pepper', 'Spices'].map((w, k) => `<span class="tile" style="font-size:130px;background:var(--paper);color:var(--ink);padding:8px 24px" data-a="drop" data-d="${k * 140}">${w}</span>`).join('')}
      </div>
      <svg class="abs" width="1720" height="260" style="left:100px;top:330px" fill="none" stroke="var(--ink)" stroke-width="5">
        <path d="M860 0 V90 H230 V240" data-a="draw" data-s="1"/><path d="M860 0 V240" data-a="draw" data-s="1" data-d="120"/><path d="M860 90 H1490 V240" data-a="draw" data-s="1" data-d="240"/>
      </svg>
      ${[['Ghana', 'var(--ink)', 'var(--paper)'], ['Senegal', 'var(--ink)', 'var(--paper)'], ['Nigeria', 'var(--paper)', 'var(--ink)']].map((c, k) =>
        `<div class="abs" style="left:${100 + 230 - 260 + k * 630}px;top:600px;width:520px;text-align:center" data-a="up" data-s="1" data-d="${400 + k * 120}">
           <div class="huge" style="font-size:110px;background:${c[1]};color:${c[2]};padding:16px 0">${c[0]}</div></div>`).join('')}
      <div class="abs head" style="left:100px;top:830px;font-size:110px;color:var(--ink)" data-a="rise" data-s="2">Same ingredients. Different <span class="serif" style="font-size:130px">kitchen.</span></div>`
  });

  /* 4. Code does the same thing */
  D.slide({ id: 'code-same', sec: SEC, t: '1:50', bg: 'ink',
    notes: `Of course, I'm not here to talk to you about jollof. But I've been thinking about this for a while, and I think code does the same thing, and I'm going to show you.`,
    html: `
      <div class="abs huge" style="left:100px;top:170px;font-size:270px;line-height:.9;color:var(--paper)">
        <div>${D.words('Code does', { gap: 110 })}</div>
        <div>${D.words('the same', { d: 220, gap: 110 })}</div>
        <div class="acc">${D.words('thing.', { d: 440 })}</div></div>`
  });

  /* 5. Crontab */
  D.slide({ id: 'crontab', sec: SEC, t: '2:00', bg: 'paper',
    notes: `Hands up if you've ever scheduled a job, a cron job, to run in the middle of the night. You've scheduled a cron job for 1:30 a.m., 2:30 a.m., 3:30 in the morning. Anybody? [wait for hands]
Okay, good. It's a normal thing for developers to do.
[click] When I was in Nigeria, I was building software, and I was scheduling cron jobs. And there were situations that I never had to think about.`,
    html: `
      ${D.regs()}
      <div class="term" style="left:160px;top:170px;width:1600px;height:460px" data-a="up">
        <div class="bar"><i></i><i></i><i></i><span style="margin-left:14px">crontab -e</span></div>
        <pre class="code" style="font-size:84px;line-height:1.3;padding:90px 70px"><span data-a="type" data-cps="10" data-d="500"><span class="s">30 3 * * *</span>  <span class="n">run-nightly-job</span></span><span class="caret"></span></pre>
      </div>
      <svg class="abs" width="600" height="200" style="left:160px;top:632px" fill="none" stroke="var(--ink)" stroke-width="3">
        <path d="M128 0 V70" data-a="draw" data-s="1"/><path d="M276 0 V150" data-a="draw" data-s="1" data-d="150"/>
      </svg>
      <div class="abs mono" style="left:240px;top:676px" data-a="fade" data-s="1" data-d="300">minute 30</div>
      <div class="abs mono" style="left:390px;top:756px;" data-a="fade" data-s="1" data-d="450">hour 3</div>
      <div class="abs head" style="left:160px;top:880px;width:1600px;font-size:84px" data-a="rise" data-s="1" data-d="600">03:30. Every night. <span class="acc">In whose clock?</span></div>`
  });

  /* 6. The clock goes back */
  D.slide({ id: 'clock-back', sec: SEC, t: '2:30', bg: 'cobalt',
    notes: `Today I live in Estonia, I work in Estonia, and I build a product that's used by people in the EU. And in Estonia, and in most of the EU, the clocks change twice a year.
In winter, Estonia is on Eastern European Time, which is UTC plus 2. And in summer, Estonia is on Eastern European Summer Time, EEST, which is UTC plus 3.
[click] So on the 25th of October, at four o'clock in the morning Tallinn time, the clock went back to three.
[click] That means every minute between three and four on that day happened twice.`,
    html: `
      <div class="abs mono" style="left:100px;top:96px;color:var(--sub)" data-a="fade">Tallinn · Sunday 25 October 2026</div>
      <div class="abs huge" id="clk" style="left:90px;top:170px;font-size:470px;letter-spacing:.01em;color:var(--paper)" data-a="zoom">03:59</div>
      <div class="abs" id="zone" style="left:1440px;top:250px">
        <div class="huge" style="font-size:150px" id="zname">EEST</div><div class="mono" style="font-size:40px" id="zoff">UTC+3 · summer</div></div>
      <div class="abs tile" id="stamp" style="left:1440px;top:520px;font-size:96px;background:var(--lime);color:var(--ink);padding:6px 22px;transform:rotate(-4deg)" data-a="pop" data-s="1" data-d="2300">−1 hour</div>
      <div class="abs" style="left:100px;top:760px;width:1720px;height:220px" data-a="fade" data-s="2">
        <div class="mono" style="position:absolute;left:0;top:0;color:var(--sub)">local time on the wall</div>
        <div style="position:absolute;left:0;right:0;top:120px;height:4px;background:var(--paper);opacity:.5"></div>
        ${['02:00', '03:00', '04:00 → 03:00', '04:00', '05:00'].map((t, k) => `<div class="mono" style="position:absolute;left:${[0, 330, 700, 1180, 1540][k]}px;top:150px;font-size:28px">${t}</div>`).join('')}
        <div style="position:absolute;left:330px;width:370px;top:96px;height:52px;background:var(--paper)" data-a="wipe" data-s="2" data-d="200"></div>
        <div style="position:absolute;left:710px;width:470px;top:96px;height:52px;background:var(--lime)" data-a="wipe" data-s="2" data-d="700"></div>
        <div class="mono" style="position:absolute;left:340px;top:50px;color:var(--paper)" data-a="fade" data-s="2" data-d="300">03:00–04:00 once</div>
        <div class="mono" style="position:absolute;left:720px;top:50px;color:var(--lime)" data-a="fade" data-s="2" data-d="800">03:00–04:00 again</div>
      </div>`,
    leave(el) { clearInterval(el._t); },
    on(step, el, D, animate) {
      const clk = el.querySelector('#clk'), zn = el.querySelector('#zname'), zo = el.querySelector('#zoff');
      clearInterval(el._t);
      const set = (t, n, o) => { clk.textContent = t; zn.textContent = n; zo.textContent = o; };
      if (step === 0) { set('03:59', 'EEST', 'UTC+3 · summer'); clk.style.fontSize = '470px'; clk.style.top = '170px'; }
      if (step >= 1) {
        if (!animate) { set('03:00', 'EET', 'UTC+2 · winter'); return; }
        const seq = ['03:59:56', '03:59:57', '03:59:58', '03:59:59', '04:00:00'];
        let k = 0; clk.style.fontSize = '330px'; clk.style.top = '240px';
        el._t = setInterval(() => {
          if (k < seq.length) { clk.textContent = seq[k++]; return; }
          clearInterval(el._t);
          clk.animate([{ transform: 'translateY(0)', opacity: 1 }, { transform: 'translateY(-60px)', opacity: 0 }], { duration: 220, easing: 'ease-in' }).onfinish = () => {
            clk.style.fontSize = '470px'; clk.style.top = '170px';
            set('03:00', 'EET', 'UTC+2 · winter');
            clk.animate([{ transform: 'translateY(90px)', opacity: 0, color: 'var(--lime)' }, { transform: 'translateY(0)', opacity: 1, color: 'var(--lime)' }, { color: 'var(--paper)' }], { duration: 1100, easing: 'cubic-bezier(.16,1,.3,1)' });
          };
        }, 380);
      }
    }
  });

  /* 7. Two timestamps */
  D.slide({ id: 'two-timestamps', sec: SEC, t: '3:00', bg: 'paper',
    notes: `So now imagine you scheduled a cron job for 3:30 in Estonia.
[click] Did it run once, [click] or twice, on the 25th of October? [click] Or did it not run at all? [let a few people answer]
[click] Okay. It actually depends on your scheduler.`,
    html: `
      ${D.regs()}
      <div class="abs" style="left:150px;top:150px">
        <div class="mono muted" data-a="fade">UTC</div>
        <div class="huge" style="font-size:190px;margin-top:10px" data-a="right" data-d="100">00:30</div>
        <div class="huge" style="font-size:190px;margin-top:70px" data-a="right" data-d="300">01:30</div>
      </div>
      <svg class="abs" width="420" height="500" style="left:620px;top:230px" fill="none" stroke="var(--ink)" stroke-width="5">
        <path d="M0 90 H380 M350 65 L385 90 L350 115" data-a="draw" data-d="400"/><path d="M0 345 H380 M350 320 L385 345 L350 370" data-a="draw" data-d="600"/></svg>
      <div class="abs" style="left:1060px;top:150px">
        <div class="mono muted" data-a="fade" data-d="500">Tallinn</div>
        <div style="margin-top:10px;display:flex;align-items:baseline;gap:30px" data-a="left" data-d="700"><span class="huge blue" style="font-size:190px">03:30</span><span class="mono" style="font-size:40px">EEST</span></div>
        <div style="margin-top:70px;display:flex;align-items:baseline;gap:30px" data-a="left" data-d="900"><span class="huge blue" style="font-size:190px">03:30</span><span class="mono" style="font-size:40px">EET</span></div>
      </div>
      <div class="abs" style="left:150px;top:740px;display:flex;gap:28px">
        <span class="tile" style="font-size:104px;background:var(--ink);color:var(--paper);padding:4px 28px" data-a="pop" data-s="1">Once?</span>
        <span class="tile" style="font-size:104px;background:var(--ink);color:var(--paper);padding:4px 28px" data-a="pop" data-s="2">Twice?</span>
        <span class="tile" style="font-size:104px;background:var(--ink);color:var(--paper);padding:4px 28px" data-a="pop" data-s="3">Never?</span>
      </div>
      <div class="abs" style="left:150px;top:900px;width:1620px;height:120px;background:var(--lime);display:flex;align-items:center;padding:0 36px" data-a="wipe" data-s="4">
        <span class="head" style="font-size:64px">It depends on your <span class="serif" style="font-size:80px">scheduler.</span></span></div>`
  });

  /* 8. Lagos never changes its clocks */
  D.slide({ id: 'lagos-clock', sec: SEC, t: '3:20', bg: 'tomato',
    notes: `In Lagos, in Nigeria, while I was building products for African markets, this would never be a problem for me, because Nigeria doesn't change its clocks. I would never have to wonder what happens in this situation.
[click] So we have the same code, the same language, but a different kitchen, a different environment.`,
    html: `
      <div class="abs mono" style="left:100px;top:96px" data-a="fade">Lagos · every day of the year</div>
      <div class="abs huge" style="left:90px;top:170px;font-size:430px" data-a="zoom">03:30</div>
      <div class="abs" style="left:1420px;top:250px" data-a="left" data-d="200"><div class="huge" style="font-size:150px">WAT</div><div class="mono" style="font-size:40px">UTC+1 · all year</div></div>
      <div class="abs" style="left:100px;top:740px;right:100px;border-top:4px solid var(--ink);padding-top:40px" data-a="wipe" data-s="1">
        <div class="head" style="font-size:96px">Same code. Same language. <span class="tile" style="background:var(--ink);color:var(--paper);font-family:Archivo;font-weight:800;text-transform:none;padding:0 18px">Different kitchen.</span></div></div>`
  });

  /* 9. I've cooked in both kitchens: map Lagos → Tallinn */
  D.slide({ id: 'two-kitchens', sec: SEC, t: '3:30', bg: 'paper',
    notes: `Right. Now, I've cooked in both kitchens.
[click] For more than three years, I worked on African products. My latest, before I moved to Estonia, was LawyeredUp, a legal-tech product used mostly by people in Nigeria, South Africa and Botswana.
[click] Today I work at FleetFox, which is a fleet care company building for users in the EU.
And over the past year of moving between these two continents, I've had situations that made me ask interesting questions about software architecture. And I've found certain public systems that answer them well, and I'm going to be sharing most of them with you today.`,
    html: `
      <svg class="abs" id="k-map" width="1100" height="1080" style="left:820px;top:0"></svg>
      <div class="abs huge" style="left:100px;top:100px;font-size:124px;width:760px" data-a="rise">I've cooked in both kitchens</div>
      <div class="abs" style="left:100px;top:480px;width:680px" data-a="right" data-s="1">
        <div class="mono red">3+ years · Africa</div>
        <div class="huge" style="font-size:110px;margin-top:6px">LawyeredUp</div>
        <div class="body" style="font-size:36px;margin-top:6px">Legal tech, used mostly in Nigeria, South Africa and Botswana</div></div>
      <div class="abs" style="left:100px;top:770px;width:680px" data-a="right" data-s="2">
        <div class="mono blue">Today · Estonia</div>
        <div class="huge" style="font-size:110px;margin-top:6px">FleetFox</div>
        <div class="body" style="font-size:36px;margin-top:6px">Fleet care, building for users in the EU</div></div>`,
    init(el) {
      const svg = el.querySelector('#k-map');
      const m = D.map(svg, { extent: [[-12, -36], [42, 62]], pad: 40, land: 'var(--card)', stroke: 'rgba(18,18,18,.22)', sw: 1.2 });
      el._m = m; if (!m) return;
      const NS = 'http://www.w3.org/2000/svg';
      const a = m.proj(D.CITY.lagos), b = m.proj(D.CITY.tallinn);
      const arc = document.createElementNS(NS, 'path');
      const mx = (a[0] + b[0]) / 2 + 260, my = (a[1] + b[1]) / 2;
      arc.setAttribute('d', `M${a[0]} ${a[1]} Q${mx} ${my} ${b[0]} ${b[1]}`);
      arc.setAttribute('fill', 'none'); arc.setAttribute('stroke', 'var(--ink)'); arc.setAttribute('stroke-width', 5); arc.setAttribute('stroke-dasharray', '0');
      arc.dataset.a = 'draw'; arc.dataset.s = '2'; arc.dataset.d = '300'; arc.dataset.dur = '1400';
      svg.appendChild(arc);
      [[a, 'var(--tomato)', 'Lagos', 1], [b, 'var(--cobalt)', 'Tallinn', 2]].forEach(([p, c, name, s]) => {
        const g = document.createElementNS(NS, 'g'); g.dataset.a = 'pop'; g.dataset.s = s; g.dataset.d = s === 2 ? 1500 : 200;
        g.style.transformOrigin = `${p[0]}px ${p[1]}px`; g.style.transformBox = 'view-box';
        g.innerHTML = `<rect x="${p[0] - 14}" y="${p[1] - 14}" width="28" height="28" fill="${c}" stroke="var(--ink)" stroke-width="3"/>
          <text x="${p[0] + 30}" y="${p[1] + 12}" font-family="Anton" font-size="44" fill="var(--ink)" style="text-transform:uppercase">${name.toUpperCase()}</text>`;
        svg.appendChild(g);
      });
    },
    on(step, el) {
      const m = el._m; if (!m) return;
      const af = [D.ISO.nigeria, D.ISO.southAfrica, D.ISO.botswana];
      af.forEach(id => m.fill(id, step >= 1 ? 'var(--tomato)' : 'var(--card)'));
      m.fill(D.ISO.estonia, step >= 2 ? 'var(--cobalt)' : 'var(--card)');
    }
  });

  /* 10. Thesis */
  D.slide({ id: 'thesis', sec: SEC, t: '3:50', bg: 'ink',
    notes: `So what is this talk about? This talk is not an internationalisation talk. It's about this.
Every system carries a hidden model of its environment.
[click] The same code, with the same logic, quietly assumes different things depending on where it was written. Your timeout logic, your retry logic, what counts as a valid ID.
[click] All of these choices take the shape of the place they were built in.`,
    html: `
      <div class="abs head" style="left:100px;top:150px;width:1700px;font-size:150px;line-height:.98;color:var(--paper)">
        ${D.words('Every system carries a', { gap: 60 })} <span class="hl" data-s="0" data-d="1100" style="--hlc:var(--tomato)">${D.words('hidden model', { d: 300, gap: 60 })}</span> ${D.words('of its environment.', { d: 450, gap: 60 })}</div>
      <div class="abs" style="left:100px;top:700px;display:flex;gap:40px">
        ${[['timeout = 3000', 'timeout logic'], ['retries = 3', 'retry logic'], ['/^\\d{11}$/', 'a valid ID']].map((c, k) => `
          <div data-a="up" data-s="1" data-d="${k * 160}" style="border-top:3px solid var(--paper);padding-top:22px;width:520px">
            <div class="code" style="font-size:52px;color:var(--lime)">${c[0]}</div>
            <div class="mono" style="color:var(--sub);margin-top:12px">${c[1]}</div>
            <div class="mono" style="color:var(--tomato);margin-top:12px" data-a="fade" data-s="2" data-d="${k * 160}">shaped by where it was written</div></div>`).join('')}
      </div>`
  });

  /* 11. Not an i18n talk */
  D.slide({ id: 'not-i18n', sec: SEC, t: '4:20', bg: 'paper',
    notes: `So again, this is not an internationalisation talk. I'm not going to tell you to use UTC, or Unicode, or a translation library. You already know that.
[click] This is an architecture talk. It's about the environment your users live in, their network, their money, their identity systems, their laws, everything. And it's about how that environment should change the shape of your system.
[click] And I'll give you a model for that. Because I don't want this talk to just be, oh yeah, if you're building a product that will cross borders, just build it well. No. I have a model, based on my own investigation of companies that have done this successfully. It's a model I've created and used reasonably well over the past year, and I'm going to share it with you. And while we're doing that, we'll go deep into real case studies of software architecture that was built for users in unique and changing environments.`,
    html: `
      ${D.regs()}
      <div class="abs" style="left:120px;top:130px;display:flex;flex-direction:column;gap:6px">
        ${['Use UTC', 'Use Unicode', 'Use a translation library'].map((w, k) => `<div class="huge muted" style="font-size:120px" data-a="right" data-d="${k * 120}"><span class="strike" data-s="0" data-d="${500 + k * 180}">${w}</span></div>`).join('')}
      </div>
      <div class="abs mono" style="left:1240px;top:150px;width:560px;line-height:1.4" data-a="fade" data-d="900">You already know this.</div>
      <div class="abs" style="left:0;right:0;top:600px;bottom:0;background:var(--ink)" data-a="wipeup" data-s="1"></div>
      <div class="abs head" style="left:120px;top:650px;font-size:120px;color:var(--paper)" data-a="rise" data-s="1" data-d="200">This is an <span class="acc" style="color:var(--lime)">architecture</span> talk.</div>
      <div class="abs" style="left:120px;top:830px;display:flex;gap:56px">
        ${['Their network', 'Their money', 'Their identity', 'Their laws'].map((w, k) => `<div class="mono" style="color:var(--paper);font-size:38px;border-top:3px solid var(--lime);padding-top:14px" data-a="up" data-s="1" data-d="${600 + k * 120}">${w}</div>`).join('')}
      </div>
      <div class="abs tile" style="right:120px;top:830px;font-size:64px;background:var(--lime);color:var(--ink);padding:4px 22px" data-a="pop" data-s="2">+ a model</div>`
  });
})();
