/* OPENING 0:00–4:00 */
(function () {
  const D = window.D;
  const SEC = 'Opening';

  /* 0. Holding slide while people sit down */
  D.slide({ id: 'title', sec: SEC, t: 'before 0:00', bg: 'paper',
    notes: 'Holding slide while people sit down. Press R to replay the title motion. Press S for this presenter window, T to switch to the dark stage theme, B for a black screen.',
    html: `
      <div class="abs mono" style="left:140px;top:110px" data-a="fade" data-d="900">Øredev 2026 · Malmö</div>
      <div class="abs head" style="left:140px;top:250px;width:1640px;font-size:132px;line-height:1.02;letter-spacing:-.05em">
        <div>${D.words('How moving from', { a: 'up', gap: 110 })}</div>
        <div>${D.words('Nigeria to Estonia', { a: 'up', d: 300, gap: 110 })}</div>
        <div><span class="acc">${D.words('rewired', { a: 'up', d: 600 })}</span> ${D.words('how I build software', { a: 'up', d: 720, gap: 110 })}</div></div>
      <svg class="abs" width="1640" height="4" style="left:140px;top:740px"><path d="M0 2 H1640" stroke="var(--ink)" stroke-width="2" data-a="draw" data-d="1300" data-dur="1200"/></svg>
      <div class="abs sub" style="left:140px;top:790px" data-a="up" data-d="1600">Gbemisola Oladetoun</div>`
  });

  /* 0b. Who I am */
  D.slide({ id: 'about-me', sec: SEC, t: 'before 0:00', bg: 'paper',
    notes: `Before we start, a little about me. My name is Gbemisola Oladetoun. I'm a full-stack developer, currently based in Estonia. I work mostly with Laravel and JavaScript.
I'm currently doing my master's, and my research is in human-computer interaction at Tallinn University.
And I make coding tutorials and content on YouTube. If you want to find it, the QR code is right here.`,
    html: `
      <div class="abs" style="right:0;top:0;width:680px;height:1080px;overflow:hidden" data-a="wipe"><img class="push" src="assets/img/gbemi-photo.jpg" alt="" style="width:100%;height:100%;object-fit:cover;object-position:46% 50%"></div>
      <div class="abs head" style="left:140px;top:120px;font-size:104px;line-height:1;letter-spacing:-.05em" data-a="rise" data-d="200">Gbemisola Oladetoun</div>
      ${[['Full-stack developer', 'Estonia'], ['HCI researcher', 'Tallinn University'], ['Coding tutorials on YouTube', '']].map(([a, b], k) => `
        <div class="abs" style="left:140px;top:${330 + k * 190}px;width:960px;border-top:2px solid var(--ink);padding-top:26px;display:flex;justify-content:space-between;align-items:flex-start" data-a="up" data-d="${600 + k * 260}">
          <span class="head" style="font-size:56px;${k === 2 ? 'color:var(--cobalt)' : ''}">${a}</span><span class="sub" style="font-size:34px">${b}</span></div>`).join('')}
      <div class="abs" style="left:960px;top:690px;padding:10px;background:#fff;border:2px solid var(--ink)" data-a="pop" data-d="1700">${D.qr('https://www.youtube.com/@WithGbemi', 150)}</div>`
  });

  /* 1. Jollof photo */
  D.slide({ id: 'jollof', sec: SEC, t: '0:00', bg: 'ink',
    notes: `Does anyone know what this food is? Anybody have an idea what food this is? If you know, you can just raise your hand.
[wait] Okay, a few people. Nice.
[click] Alright, this is jollof rice.`,
    html: `
      <div class="abs push" style="inset:0"><img src="assets/img/jollof-2.jpg" style="width:100%;height:100%;object-fit:cover;object-position:50% 40%" alt=""></div>
      <div class="abs" style="left:0;right:0;bottom:0;height:260px;background:var(--paper)" data-a="wipeup" data-s="1"></div>
      <div class="abs head" style="left:140px;bottom:70px;font-size:150px;color:var(--ink)" data-a="rise" data-s="1" data-d="200">Jollof rice</div>`
  });

  /* 2. The jollof war: Ghana, Senegal, Nigeria light up */
  D.slide({ id: 'jollof-war', sec: SEC, t: '0:40', bg: 'paper',
    notes: `Jollof rice is a very popular dish across West Africa, and guys, this is a very interesting one, because there is a literal war being fought about this dish.
[click] Ghanaians will say that Ghanaian jollof rice is the best.
[click] Senegalese people will say theirs is the best, and they'll even remind the rest of us that jollof rice started with them.
[click] And of course I'm Nigerian, so obviously I'm going to tell you that Nigerian jollof is the best. [let them laugh]`,
    html: `
      <div class="abs head" style="left:140px;top:100px;font-size:96px" data-a="rise">The jollof war</div>
      <svg class="abs" id="wa-map" width="1640" height="700" style="left:140px;top:250px"></svg>
      <div class="abs" style="left:0;top:0;width:0;height:0" id="wa-labels">
        <div class="abs head" data-k="sn" style="font-size:64px" data-a="up" data-s="2">Senegal</div>
        <div class="abs head" data-k="gh" style="font-size:64px" data-a="up" data-s="1">Ghana</div>
        <div class="abs head red" data-k="ng" style="font-size:64px" data-a="up" data-s="3">Nigeria</div>
      </div>`,
    init(el) {
      const svg = el.querySelector('#wa-map');
      const m = D.map(svg, { extent: [[-18, 3.5], [15, 16.5]], land: 'var(--card)', stroke: 'rgba(20,20,22,.22)', sw: 1.5 });
      el._m = m; if (!m) return;
      const pos = { sn: [150, 860], gh: [700, 880], ng: [1470, 850] };
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
  D.slide({ id: 'ingredients', sec: SEC, t: '1:20', bg: 'paper',
    notes: `Now, the core ingredients for jollof are basically the same everywhere. We have rice, tomatoes, pepper and spices.
But when Ghanaians cook their jollof, they end up with something slightly different from Nigerian jollof. And Senegalese jollof is a little different from both.
The core ingredients are the same, but the kitchen and the country where it's prepared are different.`,
    html: `
      <div class="abs" style="left:140px;right:140px;top:120px;display:flex;justify-content:space-between">
        ${['Rice', 'Tomatoes', 'Pepper', 'Spices'].map((w, k) => `<span class="head" style="font-size:96px" data-a="drop" data-d="${k * 140}">${w}</span>`).join('')}
      </div>
      <svg class="abs" width="1640" height="260" style="left:140px;top:290px" fill="none" stroke="var(--ink)" stroke-width="2">
        <path d="M820 0 V100 H260 V230" data-a="draw" data-d="700"/><path d="M820 0 V230" data-a="draw" data-d="820"/><path d="M820 100 H1380 V230" data-a="draw" data-d="940"/>
      </svg>
      ${['Ghana', 'Senegal', 'Nigeria'].map((c, k) =>
        `<div class="abs head" style="left:${140 + [260, 820, 1380][k] - 260}px;top:560px;width:520px;text-align:center;font-size:84px;${k === 2 ? 'color:var(--tomato)' : ''}" data-a="up" data-d="${1300 + k * 160}">${c}</div>`).join('')}
      <div class="abs head" style="left:140px;top:840px;font-size:96px" data-a="rise" data-d="2000">Same ingredients. Different <span class="serif acc" style="font-size:118px">kitchen.</span></div>`
  });

  /* 4. Code does the same thing */
  D.slide({ id: 'code-same', sec: SEC, t: '1:50', bg: 'ink',
    notes: `Of course, I'm not here to talk to you about jollof. But I've been thinking about this for a while, and I think code does the same thing, and I'm going to show you.`,
    html: `
      <div class="abs head" style="left:140px;top:220px;font-size:200px;line-height:1;letter-spacing:-.05em">
        <div>${D.words('Code does', { gap: 110 })}</div>
        <div>${D.words('the same', { d: 220, gap: 110 })}</div>
        <div class="acc">${D.words('thing.', { d: 440 })}</div></div>`
  });

  /* 5. Crontab */
  D.slide({ id: 'crontab', sec: SEC, t: '2:00', bg: 'paper',
    notes: `Hands up if you've ever scheduled a job, a cron job, to run in the middle of the night. You've scheduled a cron job for 1:30 a.m., 2:30 a.m., 3:30 in the morning. Anybody? [wait for hands]
Okay, good. It's a normal thing for developers to do.
When I was in Nigeria, I was building software, and I was scheduling cron jobs. And there were situations that I never had to think about.`,
    html: `
      <div class="term" style="left:140px;top:170px;width:1640px;height:440px" data-a="up">
        <div class="bar"><i></i><i></i><i></i><span style="margin-left:14px">crontab -e</span></div>
        <pre class="code" style="font-size:84px;line-height:1.3;padding:100px 80px"><span data-a="type" data-cps="10" data-d="500"><span class="s">30 3 * * *</span>  <span class="n">run-nightly-job</span></span><span class="caret"></span></pre>
      </div>
      <svg class="abs" width="600" height="200" style="left:140px;top:612px" fill="none" stroke="var(--ink)" stroke-width="2">
        <path d="M132 0 V120" data-a="draw" data-d="2400"/><path d="M258 0 V60" data-a="draw" data-d="2550"/>
      </svg>
      <div class="abs mono" style="left:286px;top:712px;color:var(--ink)" data-a="fade" data-d="2700">minute 30</div>
      <div class="abs mono" style="left:412px;top:652px;color:var(--ink)" data-a="fade" data-d="2850">hour 3</div>`
  });

  /* 6. The clock goes back */
  D.slide({ id: 'clock-back', sec: SEC, t: '2:30', bg: 'cobalt',
    notes: `Today I live in Estonia, I work in Estonia, and I build a product that's used by people in the EU. And in Estonia, and in most of the EU, the clocks change twice a year.
In winter, Estonia is on Eastern European Time, which is UTC plus 2. And in summer, Estonia is on Eastern European Summer Time, EEST, which is UTC plus 3.
[click] So on the 25th of October, at four o'clock in the morning Tallinn time, the clock went back to three.
That means every minute between three and four on that day happened twice.`,
    html: `
      <div class="abs mono" style="left:140px;top:110px;color:#fff" data-a="fade">Tallinn · 25 October</div>
      <div class="abs head" id="clk" style="left:126px;top:200px;font-size:400px;letter-spacing:-.04em;line-height:1;color:#fff;font-variant-numeric:tabular-nums" data-a="zoom">03:59</div>
      <div class="abs" id="zone" style="left:1460px;top:270px" data-a="fade" data-d="300">
        <div class="head" style="font-size:96px" id="zname">EEST</div><div class="mono" style="font-size:30px;margin-top:8px" id="zoff">UTC+3</div></div>
      <div class="abs head" id="stamp" style="left:1460px;top:520px;font-size:64px;background:#fff;color:var(--cobalt);padding:4px 20px;opacity:0">−1 hour</div>`,
    steps: 1,
    leave(el) { clearInterval(el._t); clearTimeout(el._h); },
    on(step, el, D, animate) {
      const clk = el.querySelector('#clk'), zn = el.querySelector('#zname'), zo = el.querySelector('#zoff'), st = el.querySelector('#stamp');
      clearInterval(el._t); clearTimeout(el._h);
      const set = (t, n, o) => { clk.textContent = t; zn.textContent = n; zo.textContent = o; };
      const big = () => { clk.style.fontSize = '400px'; clk.style.top = '200px'; };
      const stamp = (on) => { st.style.transition = 'opacity .4s, transform .5s cubic-bezier(.34,1.36,.64,1)'; st.style.opacity = on ? 1 : 0; st.style.transform = on ? 'scale(1)' : 'scale(.8)'; };
      if (step === 0) { set('03:59', 'EEST', 'UTC+3'); big(); stamp(false); return; }
      if (!animate) { set('03:00', 'EET', 'UTC+2'); big(); stamp(true); return; }
      // the countdown loops until she leaves the slide: 03:59:56 … 04:00:00 → back to 03:00, hold, again
      const run = () => {
        const seq = ['03:59:56', '03:59:57', '03:59:58', '03:59:59', '04:00:00'];
        let k = 0; stamp(false); set(seq[0], 'EEST', 'UTC+3'); clk.style.fontSize = '270px'; clk.style.top = '260px';
        el._t = setInterval(() => {
          if (k < seq.length) { clk.textContent = seq[k++]; return; }
          clearInterval(el._t);
          clk.animate([{ transform: 'translateY(0)', opacity: 1 }, { transform: 'translateY(-60px)', opacity: 0 }], { duration: 220, easing: 'ease-in' }).onfinish = () => {
            if (!el.classList.contains('cur')) return;
            big(); set('03:00', 'EET', 'UTC+2'); stamp(true);
            clk.animate([{ transform: 'translateY(90px)', opacity: 0, color: 'var(--lime)' }, { transform: 'translateY(0)', opacity: 1, color: 'var(--lime)' }, { color: '#fff' }], { duration: 1100, easing: 'cubic-bezier(.16,1,.3,1)' });
            el._h = setTimeout(() => { if (el.classList.contains('cur')) run(); }, 2600);
          };
        }, 380);
      };
      run();
    }
  });

  /* 7. Two timestamps */
  D.slide({ id: 'two-timestamps', sec: SEC, t: '3:00', bg: 'paper',
    notes: `So now imagine you scheduled a cron job for 3:30 in Estonia.
Did it run once, or twice, on the 25th of October? Or did it not run at all? [let a few people answer]
Okay. It actually depends on your scheduler.`,
    html: `
      <div class="abs" style="left:140px;top:120px">
        <div class="mono" data-a="fade">Tallinn, 25 October</div>
        <div style="margin-top:10px;display:flex;align-items:baseline;gap:30px" data-a="right" data-d="200"><span class="head blue" style="font-size:190px;letter-spacing:-.05em">03:30</span><span class="head" style="font-size:56px">EEST</span></div>
        <div style="margin-top:20px;display:flex;align-items:baseline;gap:30px" data-a="right" data-d="450"><span class="head blue" style="font-size:190px;letter-spacing:-.05em">03:30</span><span class="head" style="font-size:56px">EET</span></div>
      </div>
      <div class="abs" style="left:140px;top:760px;display:flex;gap:90px">
        ${['Once?', 'Twice?', 'Never?'].map((w, k) => `<span class="head" style="font-size:110px" data-a="pop" data-d="${900 + k * 200}">${w}</span>`).join('')}
      </div>`
  });

  /* 8. Lagos never changes its clocks */
  D.slide({ id: 'lagos-clock', sec: SEC, t: '3:20', bg: 'paper',
    notes: `In Lagos, in Nigeria, while I was building products for African markets, this would never be a problem for me, because Nigeria doesn't change its clocks. I would never have to wonder what happens in this situation.
So we have the same code, the same language, but a different kitchen, a different environment.`,
    html: `
      <div class="abs mono" style="left:140px;top:110px" data-a="fade">Nigeria</div>
      <div class="abs head red" style="left:126px;top:190px;font-size:360px;line-height:1;letter-spacing:-.04em" data-a="zoom">03:30</div>
      <div class="abs" style="left:1360px;top:270px" data-a="left" data-d="200"><div class="head" style="font-size:96px">WAT</div><div class="mono" style="margin-top:8px">UTC+1, all year</div></div>`
  });

  /* 9. I've cooked in both kitchens: map Lagos → Tallinn */
  D.slide({ id: 'two-kitchens', sec: SEC, t: '3:30', bg: 'paper',
    notes: `Right. Now, I've cooked in both kitchens.
[click] For more than three years, I worked on African products. My latest, before I moved to Estonia, was LawyeredUp, a legal-tech product used mostly by people, law firms and legal institutions in Nigeria, South Africa and Botswana.
[click] Today I work at FleetFox, a company that builds fleet management software for B2B companies across the EU.
And over the past year of moving between these two continents, I've had situations that made me ask interesting questions about software architecture. And I've found certain public systems that answer them well, and I'm going to be sharing most of them with you today.`,
    html: `
      <svg class="abs" id="k-map" width="1100" height="1080" style="left:820px;top:0"></svg>
      <div class="abs head" style="left:140px;top:120px;font-size:96px;width:700px" data-a="rise">I've cooked in both kitchens</div>
      <div class="abs" style="left:140px;top:500px;width:660px" data-a="right" data-s="1">
        <div class="head red" style="font-size:80px">LawyeredUp</div>
        <div class="mono" style="margin-top:12px">Nigeria, South Africa, Botswana</div></div>
      <div class="abs" style="left:140px;top:740px;width:660px" data-a="right" data-s="2">
        <div class="head blue" style="font-size:80px">FleetFox</div>
        <div class="mono" style="margin-top:12px">Estonia, the EU</div></div>`,
    init(el) {
      const svg = el.querySelector('#k-map');
      const m = D.map(svg, { extent: [[-12, -36], [42, 62]], pad: 40, land: 'var(--card)', stroke: 'rgba(20,20,22,.2)', sw: 1.2 });
      el._m = m; if (!m) return;
      const NS = 'http://www.w3.org/2000/svg';
      const a = m.proj(D.CITY.lagos), b = m.proj(D.CITY.tallinn);
      const arc = document.createElementNS(NS, 'path');
      const mx = (a[0] + b[0]) / 2 + 260, my = (a[1] + b[1]) / 2;
      arc.setAttribute('d', `M${a[0]} ${a[1]} Q${mx} ${my} ${b[0]} ${b[1]}`);
      arc.setAttribute('fill', 'none'); arc.setAttribute('stroke', 'var(--ink)'); arc.setAttribute('stroke-width', 2.5); arc.setAttribute('stroke-dasharray', '0');
      arc.dataset.a = 'draw'; arc.dataset.s = '2'; arc.dataset.d = '300'; arc.dataset.dur = '1400';
      svg.appendChild(arc);
      [[a, 'var(--tomato)', 'Lagos', 1], [b, 'var(--cobalt)', 'Tallinn', 2]].forEach(([p, c, name, s]) => {
        const g = document.createElementNS(NS, 'g'); g.dataset.a = 'pop'; g.dataset.s = s; g.dataset.d = s === 2 ? 1500 : 200;
        g.style.transformOrigin = `${p[0]}px ${p[1]}px`; g.style.transformBox = 'view-box';
        g.innerHTML = `<circle cx="${p[0]}" cy="${p[1]}" r="13" fill="${c}" stroke="var(--paper)" stroke-width="4"/>
          <text x="${p[0] + 28}" y="${p[1] + 13}" font-family="Geist" font-weight="600" font-size="40" letter-spacing="-1" fill="var(--ink)">${name}</text>`;
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
The same code, with the same logic, quietly assumes different things depending on where it was written. Your timeout logic, your retry logic, what counts as a valid ID.
All of these choices take the shape of the place they were built in.`,
    html: `
      <div class="abs head" style="left:140px;top:300px;width:1640px;font-size:140px;line-height:1.02">
        ${D.words('Every system carries a', { gap: 60 })} <span class="hl" data-s="0" data-d="1100">${D.words('hidden model', { d: 300, gap: 60 })}</span> ${D.words('of its environment.', { d: 450, gap: 60 })}</div>`
  });

  /* 11. Not an i18n talk */
  D.slide({ id: 'not-i18n', sec: SEC, t: '4:20', bg: 'paper',
    notes: `So again, this is not an internationalisation talk. I'm not going to tell you to use UTC, or Unicode, or a translation library. You already know that.
[click] This is an architecture talk. It's about the environment your users live in, their network, their money, their identity systems, their laws, everything. And it's about how that environment should change the shape of your system.
And I'll give you a model for that. Because I don't want this talk to just be, oh yeah, if you're building a product that will cross borders, just build it well. No. I have a model, based on my own investigation of companies that have done this successfully. It's a model I've created and used reasonably well over the past year, and I'm going to share it with you. And while we're doing that, we'll go deep into real stories of software architecture that was built for users in unique and changing environments.`,
    html: `
      <div class="abs" style="left:140px;top:120px;display:flex;flex-direction:column;gap:14px">
        ${['UTC', 'Unicode', 'Translation library'].map((w, k) => `<div class="head muted" style="font-size:88px" data-a="right" data-d="${k * 120}"><span class="strike" data-s="0" data-d="${500 + k * 180}">${w}</span></div>`).join('')}
      </div>
      <div class="abs" style="left:0;right:0;top:600px;bottom:0;background:var(--ink)" data-a="wipeup" data-s="1"></div>
      <div class="abs head" style="left:140px;top:690px;font-size:120px;color:#F2F0EB" data-a="rise" data-s="1" data-d="200">This is an <span style="color:var(--lime)">architecture</span> talk.</div>`
  });
})();
