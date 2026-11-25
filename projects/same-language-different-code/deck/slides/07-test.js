/* TEST IT FOR YOUR USERS 34:00–37:30 */
(function () {
  const D = window.D;
  const SEC = 'Test it for your users';
  const F = (px, w = 600) => `font-family:Geist;font-weight:${w};font-size:${px}px;line-height:1.02;letter-spacing:-.045em`;

  /* 1. Title */
  D.slide({ id: 'test-title', sec: SEC, t: '34:00', bg: 'ink',
    notes: `Now a little bit of more practical tips to use the environment profile model.`,
    html: `
      <div class="abs" style="left:140px;top:230px;${F(190)};color:#F2F0EB">
        <div>${D.words('Test it for', { gap: 110 })}</div>
        <div class="lime">${D.words('your users.', { d: 350, gap: 110 })}</div></div>
      <div class="abs" style="left:150px;top:720px;display:flex;gap:60px;${F(48, 500)}">
        ${[['Their network', 'var(--tomato)'], ['their laws', '#B9C6FF'], ['their phones', '#F2F0EB']].map(([w, c], k) => `<span style="color:${c}" data-a="up" data-d="${900 + k * 150}">${w}</span>`).join('')}
      </div>`
  });

  /* 2. Toxiproxy: the proxy in the middle */
  D.slide({ id: 'toxiproxy-idea', sec: SEC, t: '34:15', bg: 'paper',
    notes: `For Connectivity: test on your users' network.
Shopify built an open-source tool called Toxiproxy. It's a proxy that sits between your service and the things it depends on, in your tests.
And while the tests run, it can add latency, limit bandwidth and cut connections.`,
    html: `
      <style>#s-toxiproxy-idea .box{position:absolute;top:380px;height:200px;border:2.5px solid var(--ink);background:var(--card);display:flex;align-items:center;justify-content:center;text-align:center;font-family:Geist;font-weight:600;font-size:52px;letter-spacing:-.035em}</style>
      <div class="abs head" style="left:140px;top:130px;font-size:84px" data-a="rise">Toxiproxy <span class="muted" style="font-weight:400">by Shopify</span></div>
      <div class="box" style="left:140px;width:420px" data-a="right" data-d="200">Your service</div>
      <div class="box" style="left:750px;width:420px;border-color:var(--cobalt);color:var(--cobalt)" data-a="pop" data-d="600">Toxiproxy</div>
      <div class="box" style="left:1360px;width:420px" data-a="left" data-d="400">Payments API</div>
      <svg class="abs" width="1920" height="300" style="left:0;top:330px" fill="none" stroke="var(--ink)" stroke-width="3">
        <path d="M562 150 H748" data-a="draw" data-d="800"/>
        <path d="M1172 150 C1205 95 1235 205 1265 150 S1325 95 1358 150" stroke="var(--tomato)" data-a="draw" data-d="1000"/>
      </svg>
      ${[['+600 ms', 'latency'], ['50 KB/s', 'bandwidth'], ['Cut', 'connections']].map(([n, l], k) => `
        <div class="abs" style="left:${140 + k * 560}px;top:720px;width:500px;border-top:2px solid var(--tomato);padding-top:22px" data-a="up" data-d="${1700 + k * 700}">
          <div class="${k === 2 ? 'red' : ''}" style="${F(84)}">${n}</div><div class="mono" style="margin-top:10px">${l}</div></div>`).join('')}
      ${D.credit('github.com/Shopify/toxiproxy')}`
  });

  /* 3. The three commands, typed */
  D.slide({ id: 'toxiproxy-cmds', sec: SEC, t: '34:45', bg: 'ink',
    notes: `toxiproxy-cli create ... payments_api
add latency 600, jitter 300
limit bandwidth to 50
So you make a network profile that looks like your users' network, not your office Wi-Fi.`,
    html: `
      ${D.browser({ x: 140, y: 70, w: 1000, h: 430, url: 'github.com/Shopify/toxiproxy', src: 'assets/img/src-toxiproxy.png', a: 'up' })}
      <div class="term" style="left:140px;top:540px;width:1640px;height:380px" data-a="up" data-d="200">
        <div class="bar"><i></i><i></i><i></i><span style="margin-left:14px">terminal</span></div>
        <pre class="code" style="font-size:34px;padding:30px 36px;line-height:1.6"><span data-a="type" data-cps="60" data-d="700"><span class="c">$</span> <span class="f">toxiproxy-cli</span> create -l localhost:28080 -u localhost:8080 <span class="s">payments_api</span></span>
<span data-a="type" data-cps="60" data-d="2300"><span class="c">$</span> <span class="f">toxiproxy-cli</span> toxic add -t <span class="k">latency</span> -a latency=600 -a jitter=300 \\
    <span class="s">payments_api</span></span>
<span data-a="type" data-cps="60" data-d="4100"><span class="c">$</span> <span class="f">toxiproxy-cli</span> toxic add -t <span class="k">bandwidth</span> -a rate=50 <span class="s">payments_api</span></span></pre>
      </div>`
  });

  /* 4. What to check */
  D.slide({ id: 'toxiproxy-checks', sec: SEC, t: '35:15', bg: 'paper',
    notes: `Then you run your key flows through it, cutting connections at random.
And you check that the screens still load, that nothing hangs forever, and that nobody gets charged twice.`,
    html: `
      ${['Screens still load', 'Nothing hangs forever', 'Nobody is charged twice'].map((w, k) => `
        <div class="abs" style="left:140px;top:${190 + k * 270}px;width:1640px;border-top:2px solid var(--ink);padding-top:34px;display:flex;gap:50px;align-items:baseline" data-a="up" data-d="${k * 1400}">
          <span style="${F(110)};white-space:nowrap">${w}</span>
          <svg width="90" height="80" style="margin-left:auto;align-self:center" fill="none" stroke="var(--cobalt)" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"><path d="M10 42 L34 66 L82 14" data-a="draw" data-d="${k * 1400 + 500}"/></svg></div>`).join('')}`
  });

  /* 5. Jurisdiction: the CI check fails */
  D.slide({ id: 'ci-red', sec: SEC, t: '35:45', bg: 'paper',
    notes: `For jurisdiction, to test where your data actually goes, there are policy tools like Open Policy Agent and Checkov that fail the build when regional data is created in a place where it's not allowed.`,
    html: `
      <style>#s-ci-red .stg{position:absolute;top:400px;width:330px;height:130px;border:2.5px solid var(--ink);display:flex;align-items:center;justify-content:center;font-family:Geist;font-weight:600;font-size:48px;letter-spacing:-.03em;background:var(--card);transition:background .5s,color .5s,border-color .5s,opacity .5s}
        #s-ci-red .stg.ok{border-color:var(--cobalt);color:var(--cobalt)}
        #s-ci-red .stg.bad{background:var(--tomato);border-color:var(--tomato);color:#fff}</style>
      <div class="abs head" style="left:140px;top:70px;font-size:72px" data-a="rise"><span class="blue">Open Policy Agent</span> and <span class="blue">Checkov</span></div>
      <div class="abs code" style="left:140px;top:215px;font-size:40px" data-a="type" data-d="500" data-cps="40">bucket "payroll-exports" { data_class = <span class="blue">"REGIONAL"</span> }</div>
      ${['Build', 'Test', 'Policy', 'Deploy'].map((w, k) => `<div class="stg" id="ci-${k}" style="left:${140 + k * 437}px" data-a="up" data-d="${300 + k * 120}">${w}</div>`).join('')}
      <svg class="abs" width="1920" height="40" style="left:0;top:445px" fill="none" stroke="var(--ink)" stroke-width="2.5">
        ${[0, 1, 2].map(k => `<path d="M${470 + k * 437} 20 H${577 + k * 437}" data-a="draw" data-d="${700 + k * 120}"/>`).join('')}</svg>
      <div class="abs" style="left:140px;top:640px;width:1640px;background:var(--ink);padding:40px 46px" data-a="wipe" data-d="3300">
        <div class="code" style="font-size:36px;color:#ECEAE4;white-space:normal"><span style="color:var(--tomato)">✕</span> bucket payroll-exports: data class REGIONAL, region us-east-1, not allowed for atom group EU</div></div>
`,
    leave(el) { clearTimeout(el._t); },
    on(step, el, D, animate) {
      // plays by itself: the pipeline builds, then the policy stage fails
      const p = el.querySelector('#ci-2'), dep = el.querySelector('#ci-3');
      const set = (fail) => {
        [0, 1].forEach(k => el.querySelector('#ci-' + k).classList.toggle('ok', fail));
        p.classList.toggle('bad', fail); p.textContent = fail ? '✕ Policy' : 'Policy'; dep.style.opacity = fail ? .3 : '';
      };
      clearTimeout(el._t);
      if (!animate) return set(true);
      set(false);
      el._t = setTimeout(() => {
        if (!el.classList.contains('cur')) return;
        set(true);
        p.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(-14px)' }, { transform: 'translateX(12px)' }, { transform: 'translateX(-8px)' }, { transform: 'translateX(0)' }], { duration: 420, delay: 300 });
      }, 2600);
    }
  });

  /* 7. Devices: three budgets */
  D.slide({ id: 'budgets', sec: SEC, t: '36:40', bg: 'paper',
    notes: `And for devices, this is exactly what Uber did.
An app size budget, a limit on requests per screen, and a response size budget, which can literally be one line in a test.
expect(body.byteLength).toBeLessThan(1200);
It's 1,200 bytes and not 1,500, because the packet also has to carry the headers.`,
    html: `
      ${[['App size', '< 5 MB', 'var(--tomato)'], ['Requests per screen', '1', 'var(--cobalt)'], ['Response size', '< 1,200 B', 'var(--ink)']].map((b, k) => `
        <div class="abs" style="left:${140 + k * 570}px;top:160px;width:500px" data-a="up" data-d="${k * 1300}">
          <div class="mono">${b[0]}</div>
          <div style="height:460px;border:2px solid var(--ink);margin-top:22px;position:relative;background:var(--card)">
            <div style="position:absolute;left:0;right:0;bottom:0;height:${[78, 40, 62][k]}%;background:${b[2]}" data-a="wipeup" data-d="${k * 1300 + 300}"></div>
            <div style="position:absolute;left:-12px;right:-12px;top:${[18, 52, 30][k]}%;border-top:3px dashed var(--ink)"></div></div>
          <div style="${F(100)};margin-top:26px">${b[1]}</div></div>`).join('')}
      ${D.credit('Budgets from Uber Engineering, “Engineering Uber Lite” (2019)')}`
  });

  /* 8. What travelled, both ways (ties back to the abstract: habits kept, assumptions unlearned) */
  D.slide({ id: 'kept-unlearned', sec: SEC, t: '37:00', bg: 'paper',
    notes: `So, looking back at all of this, some of what I learned in Nigeria travelled with me to Estonia. Keep your responses small, make things safe to retry, and test on a bad network. That works everywhere.
And some things travel the other way. Estonia taught me to know exactly where my data lives, and to put identity behind one interface. Those are things I'd take back home.
And some things stay where they are. In Nigeria, the phone number is the identity and the clocks never change. In Estonia, the clocks change twice a year and the state gives you a digital ID. Those were assumptions, and I had to learn them, or unlearn them.
And honestly, it goes both ways. There are things I built for back home that I don't need to build here, because the network here is rarely the problem. And there are things I have to build here that I never had to think about back home.
The Environment Profile is how I tell the difference.`,
    html: `
      <style>
        #s-kept-unlearned .land{position:absolute;top:370px;width:440px;height:440px;border-radius:50%;border:3px solid;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:10px}
        #s-kept-unlearned .land .stay{font-family:Geist;font-weight:500;font-size:30px;letter-spacing:-.02em;color:var(--ink);line-height:1.25}
        #s-kept-unlearned .mv{position:absolute;left:660px;width:600px;text-align:center;font-family:Geist;font-weight:600;font-size:40px;letter-spacing:-.03em}
      </style>
      <div class="abs head" style="left:140px;top:70px;font-size:64px" data-a="rise">What travelled</div>
      <div class="land" style="left:200px;border-color:var(--tomato)" data-a="pop" data-d="200">
        <div style="${F(68)}" class="red">Nigeria</div>
        <div class="sub" style="font-size:24px;margin-top:6px" data-a="fade" data-d="4600">stays here</div>
        <div class="stay" data-a="up" data-d="4800">Phone number is the ID</div>
        <div class="stay" data-a="up" data-d="5000">Clocks never change</div></div>
      <div class="land" style="left:1280px;border-color:var(--cobalt)" data-a="pop" data-d="400">
        <div style="${F(68)}" class="blue">Estonia</div>
        <div class="sub" style="font-size:24px;margin-top:6px" data-a="fade" data-d="5400">stays here</div>
        <div class="stay" data-a="up" data-d="5600">Clocks change twice a year</div>
        <div class="stay" data-a="up" data-d="5800">A state digital ID</div></div>
      <svg class="abs" width="1920" height="1080" style="left:0;top:0" fill="none" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <g stroke="var(--tomato)" data-a="draw" data-d="900" data-dur="1100"><path d="M600 470 Q960 170 1320 470"/><path d="M1310.3 443.7 L1320 470 L1292.4 465.2"/></g>
        <g stroke="var(--cobalt)" data-a="draw" data-d="2800" data-dur="1100"><path d="M1320 710 Q960 1010 600 710"/><path d="M609.7 736.3 L600 710 L627.6 714.8"/></g>
      </svg>
      ${['Small responses', 'Safe retries', 'Testing on a bad network'].map((t, k) => `<div class="mv red" style="top:${392 + k * 58}px" data-a="up" data-d="${1500 + k * 250}">${t}</div>`).join('')}
      ${['Knowing where data lives', 'Identity behind one interface'].map((t, k) => `<div class="mv blue" style="top:${636 + k * 58}px" data-a="up" data-d="${3400 + k * 250}">${t}</div>`).join('')}`
  });
})();
