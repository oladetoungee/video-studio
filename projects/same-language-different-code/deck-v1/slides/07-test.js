/* TEST IT FOR YOUR USERS 34:00–37:30 */
(function () {
  const D = window.D;
  const SEC = 'Test it for your users';

  /* 1. Title */
  D.slide({ id: 'test-title', sec: SEC, t: '34:00', bg: 'ink',
    notes: `Now a little bit of more practical tips to use the environment profile model.`,
    html: `
      <div class="abs huge" style="left:110px;top:150px;font-size:300px;line-height:.86;color:var(--paper)">
        <div>${D.words('Test it', { gap: 120 })}</div><div>${D.words('for your', { d: 250, gap: 120 })}</div>
        <div class="acc">${D.words('users.', { d: 500 })}</div></div>
      <div class="abs" style="right:120px;top:200px;display:flex;flex-direction:column;gap:26px;align-items:flex-end">
        ${['Their network', 'Their laws', 'Their phones'].map((w, k) => `<span class="tile" style="font-size:72px;background:${['var(--tomato)', 'var(--cobalt)', 'var(--paper)'][k]};color:${k === 1 ? 'var(--paper)' : 'var(--ink)'};padding:4px 20px" data-a="left" data-d="${900 + k * 150}">${w}</span>`).join('')}
      </div>`
  });

  /* 2. Toxiproxy: the proxy in the middle */
  D.slide({ id: 'toxiproxy-idea', sec: SEC, t: '34:15', bg: 'paper',
    notes: `For Connectivity: test on your users' network.
Shopify built an open-source tool called Toxiproxy. It's a proxy that sits between your service and the things it depends on, in your tests.
[click] And while the tests run, it can add latency, [click] limit bandwidth [click] and cut connections.`,
    html: `
      <style>#s-toxiproxy-idea .box{position:absolute;top:400px;height:240px;border:5px solid var(--ink);display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center}
        #s-toxiproxy-idea .box .huge{font-size:76px}</style>
      <div class="abs mono" style="left:120px;top:100px" data-a="fade">Connectivity · test on your users' network</div>
      <div class="abs head" style="left:120px;top:160px;font-size:84px" data-a="rise">Toxiproxy <span class="muted" style="font-weight:500">by Shopify</span></div>
      <div class="box" style="left:120px;width:420px;background:var(--card)" data-a="right" data-d="200"><div class="huge">Your service</div><div class="mono" style="font-size:26px">in your tests</div></div>
      <div class="box" style="left:750px;width:420px;background:var(--ink);color:var(--paper);border-color:var(--ink)" data-a="pop" data-d="600"><div class="huge" style="color:var(--lime)">Toxiproxy</div><div class="mono" style="font-size:26px;color:var(--sub)">localhost:28080</div></div>
      <div class="box" style="left:1380px;width:420px;background:var(--card)" data-a="left" data-d="400"><div class="huge">Payments API</div><div class="mono" style="font-size:26px">localhost:8080</div></div>
      <svg class="abs" width="1920" height="300" style="left:0;top:370px" fill="none" stroke="var(--ink)" stroke-width="6">
        <path d="M545 150 H745" data-a="draw" data-d="800"/><path d="M1175 150 H1375" data-a="draw" data-d="900"/>
        <path id="tp-wave" d="M1175 150 C1210 90 1235 210 1270 150 S1335 90 1375 150" stroke="var(--tomato)" data-a="draw" data-s="1" data-d="100"/>
      </svg>
      <div class="abs" style="left:120px;top:740px;display:flex;gap:30px">
        <div style="width:540px;border-top:5px solid var(--tomato);padding-top:16px" data-a="up" data-s="1"><div class="huge" style="font-size:80px">+600 ms</div><div class="mono" style="font-size:28px">latency · jitter 300</div></div>
        <div style="width:540px;border-top:5px solid var(--tomato);padding-top:16px" data-a="up" data-s="2"><div class="huge" style="font-size:80px">50 KB/s</div><div class="mono" style="font-size:28px">bandwidth limit</div></div>
        <div style="width:540px;border-top:5px solid var(--tomato);padding-top:16px" data-a="up" data-s="3"><div class="huge red" style="font-size:80px">✕ cut</div><div class="mono" style="font-size:28px">connections dropped</div></div>
      </div>
      ${D.credit('github.com/Shopify/toxiproxy')}`
  });

  /* 3. The three commands, typed */
  D.slide({ id: 'toxiproxy-cmds', sec: SEC, t: '34:45', bg: 'ink',
    notes: `[click] toxiproxy-cli create ... payments_api
[click] add latency 600, jitter 300
[click] limit bandwidth to 50
So you make a network profile that looks like your users' network, not your office Wi-Fi.`,
    html: `
      ${D.browser({ x: 1240, y: 110, w: 580, h: 340, url: 'github.com/Shopify/toxiproxy', src: 'assets/img/src-toxiproxy.png', a: 'left' })}
      <div class="abs mono" style="left:120px;top:130px;color:var(--sub)" data-a="fade">A network that looks like your users' network</div>
      <div class="term" style="left:100px;top:540px;width:1720px;height:380px" data-a="up" data-d="200">
        <div class="bar"><i></i><i></i><i></i><span style="margin-left:14px">terminal</span></div>
        <pre class="code" style="font-size:36px;padding:30px 36px;line-height:1.6"><span data-a="type" data-s="1" data-cps="60"><span class="c">$</span> <span class="f">toxiproxy-cli</span> create -l localhost:28080 -u localhost:8080 <span class="s">payments_api</span></span>
<span data-a="type" data-s="2" data-cps="60"><span class="c">$</span> <span class="f">toxiproxy-cli</span> toxic add -t <span class="k">latency</span> -a latency=600 -a jitter=300 \\
    <span class="s">payments_api</span></span>
<span data-a="type" data-s="3" data-cps="60"><span class="c">$</span> <span class="f">toxiproxy-cli</span> toxic add -t <span class="k">bandwidth</span> -a rate=50 <span class="s">payments_api</span></span></pre>
      </div>
      <div class="abs head" style="left:120px;top:250px;width:1060px;font-size:76px;color:var(--paper)" data-a="rise" data-d="300">Your users' network, <span class="serif acc" style="font-size:92px">not your office Wi-Fi.</span></div>`
  });

  /* 4. What to check */
  D.slide({ id: 'toxiproxy-checks', sec: SEC, t: '35:15', bg: 'lime',
    notes: `Then you run your key flows through it, cutting connections at random.
And you check [click] that the screens still load, [click] that nothing hangs forever, [click] and that nobody gets charged twice.`,
    html: `
      ${D.regs()}
      <div class="abs mono" style="left:120px;top:110px" data-a="fade">Run your key flows. Cut connections at random. Then check:</div>
      ${['Screens still load', 'Nothing hangs forever', 'Nobody is charged twice'].map((w, k) => `
        <div class="abs" style="left:120px;top:${220 + k * 260}px;width:1680px;border-top:5px solid var(--ink);padding-top:20px;display:flex;gap:50px;align-items:baseline" data-a="wipe" data-s="${k + 1}">
          <span class="num" style="font-size:40px">0${k + 1}</span><span class="huge" style="font-size:136px;white-space:nowrap">${w}</span>
          <span class="tile" style="margin-left:auto;font-size:80px;background:var(--ink);color:var(--lime);padding:0 20px" data-a="pop" data-s="${k + 1}" data-d="500">✓</span></div>`).join('')}`
  });

  /* 5. Jurisdiction: the CI check fails */
  D.slide({ id: 'ci-red', sec: SEC, t: '35:45', bg: 'paper',
    notes: `Jurisdiction: check where the data actually went.
For jurisdiction, you tag every storage resource in your infrastructure code as regional or global.
[click] Then a policy tool, like Open Policy Agent or Checkov, fails the build when regional data is created somewhere it isn't allowed.`,
    html: `
      <style>#s-ci-red .stage{position:absolute;top:300px;width:330px;height:150px;border:5px solid var(--ink);display:flex;align-items:center;justify-content:center;font-family:Anton;text-transform:uppercase;font-size:56px;background:var(--card);transition:background .5s,color .5s}
        #s-ci-red .stage.bad{background:var(--tomato)}</style>
      <div class="abs mono" style="left:120px;top:100px" data-a="fade">Jurisdiction · check where the data actually went</div>
      <div class="abs code" style="left:120px;top:150px;font-size:40px" data-a="type" data-cps="40">bucket "payroll-exports" { data_class = <span style="background:var(--lime)">"REGIONAL"</span> }</div>
      ${['Build', 'Test', 'Policy', 'Deploy'].map((w, k) => `<div class="stage" id="ci-${k}" style="left:${120 + k * 450}px" data-a="up" data-d="${300 + k * 120}">${w}</div>`).join('')}
      <svg class="abs" width="1920" height="40" style="left:0;top:355px" fill="none" stroke="var(--ink)" stroke-width="5">
        ${[0, 1, 2].map(k => `<path d="M${455 + k * 450} 20 H${565 + k * 450}" data-a="draw" data-d="${700 + k * 120}"/>`).join('')}</svg>
      <div class="abs" style="left:120px;top:540px;width:1680px;background:var(--ink);padding:40px 46px" data-a="wipe" data-s="1" data-d="900">
        <div class="mono" style="color:var(--tomato);font-size:30px">✕ policy check failed</div>
        <div class="code" style="font-size:40px;color:var(--paper);white-space:normal;margin-top:16px">bucket payroll-exports: data class REGIONAL, region us-east-1, not allowed for atom group EU</div></div>
      <div class="abs mono" style="left:120px;top:900px" data-a="fade" data-s="1" data-d="1400">Open Policy Agent · Checkov</div>`,
    on(step, el, D, animate) {
      const p = el.querySelector('#ci-2'), dep = el.querySelector('#ci-3');
      [0, 1].forEach(k => el.querySelector('#ci-' + k).style.background = step >= 1 ? 'var(--lime)' : '');
      p.classList.toggle('bad', step >= 1);
      p.textContent = step >= 1 ? '✕ Policy' : 'Policy';
      dep.style.opacity = step >= 1 ? .25 : '';
      if (step >= 1 && animate) p.animate([{ transform: 'translateX(0)' }, { transform: 'translateX(-14px)' }, { transform: 'translateX(12px)' }, { transform: 'translateX(-8px)' }, { transform: 'translateX(0)' }], { duration: 420, delay: 500 });
    }
  });

  /* 6. Search for the EU test company everywhere */
  D.slide({ id: 'search-stores', sec: SEC, t: '36:15', bg: 'cobalt',
    notes: `And then you create a test company that lives in the EU, write some data,
[click] and search every store outside the EU for that company's ID, including your logs, your analytics and your backups.`,
    html: `
      <div class="abs mono" style="left:120px;top:100px;color:var(--sub)" data-a="fade">A test company that lives in the EU</div>
      <div class="abs tile" style="left:120px;top:170px;font-size:110px;background:var(--paper);color:var(--cobalt);padding:6px 28px" data-a="drop">test-co-eu-0042</div>
      <div class="abs code" style="left:120px;top:380px;font-size:44px;color:var(--lime)" data-a="type" data-s="1" data-cps="35">search "test-co-eu-0042" in every store outside the EU</div>
      <div class="abs" style="left:120px;top:520px;width:1680px;display:grid;grid-template-columns:repeat(3,1fr);gap:28px">
        ${['Main database', 'Logs', 'Error tracker', 'Analytics', 'Backups', 'Support tool'].map((w, k) => `
          <div style="border:4px solid var(--paper);padding:22px 26px;height:170px" data-a="pop" data-s="1" data-d="${600 + k * 160}">
            <div class="huge" style="font-size:64px">${w}</div>
            <div class="mono" style="font-size:28px;margin-top:14px;color:${k === 0 ? 'var(--lime)' : 'var(--paper)'}">${k === 0 ? 'eu-north-1 only ✓' : 'should be 0 hits'}</div></div>`).join('')}
      </div>`
  });

  /* 7. Devices: three budgets */
  D.slide({ id: 'budgets', sec: SEC, t: '36:40', bg: 'paper',
    notes: `And for devices, this is exactly what Uber did.
[click] An app size budget, [click] a limit on requests per screen, [click] and a response size budget, which can literally be one line in a test.`,
    html: `
      ${D.regs()}
      <div class="abs mono" style="left:120px;top:110px" data-a="fade">Devices · budgets that fail the build</div>
      ${[['App size', '< 5 MB', 'var(--tomato)'], ['Requests per screen', '1', 'var(--cobalt)'], ['Response size', '< 1,200 B', 'var(--ink)']].map((b, k) => `
        <div class="abs" style="left:${120 + k * 580}px;top:220px;width:520px" data-a="up" data-s="${k + 1}">
          <div class="mono">${b[0]}</div>
          <div style="height:440px;border:5px solid var(--ink);margin-top:20px;position:relative;background:var(--card)">
            <div style="position:absolute;left:0;right:0;bottom:0;height:${[78, 40, 62][k]}%;background:${b[2]}" data-a="wipeup" data-s="${k + 1}" data-d="300"></div>
            <div style="position:absolute;left:-5px;right:-5px;top:${[18, 52, 30][k]}%;border-top:6px dashed var(--ink)"></div>
            <div class="mono" style="position:absolute;right:12px;top:calc(${[18, 52, 30][k]}% - 44px);font-size:26px">limit</div>
          </div>
          <div class="huge" style="font-size:96px;margin-top:20px">${b[1]}</div></div>`).join('')}
      ${D.credit('Budgets from Uber Engineering, “Engineering Uber Lite” (2019)')}`
  });

  /* 8. One line in a test: 1,200 not 1,500 */
  D.slide({ id: 'one-line-test', sec: SEC, t: '37:00', bg: 'ink',
    notes: `expect(body.byteLength).toBeLessThan(1200);
[click] It's 1,200 bytes and not 1,500, because the packet also has to carry the headers.`,
    html: `
      <div class="abs" style="left:120px;top:150px;width:1680px;background:#0B0B0C;border:3px solid var(--paper);padding:50px 50px" data-a="up">
        <pre class="code" style="font-size:58px"><span data-a="type" data-cps="28" data-d="300"><span class="f">expect</span>(body.byteLength).<span class="f">toBeLessThan</span>(<span class="s">1200</span>);</span><span class="caret"></span></pre></div>
      <div class="abs mono" style="left:120px;top:480px;color:var(--sub)" data-a="fade" data-s="1">One packet on Ethernet · 1,500 bytes</div>
      <div class="abs" style="left:120px;top:540px;width:1680px;height:200px;display:flex;border:4px solid var(--paper)" data-a="wipe" data-s="1" data-d="100">
        <div style="width:80%;background:var(--lime);color:var(--ink);display:flex;align-items:center;padding-left:30px" data-a="wipe" data-s="1" data-d="500"><span class="huge" style="font-size:88px">1,200 · your response</span></div>
        <div style="flex:1;background:var(--tomato);color:var(--ink);display:flex;align-items:center;justify-content:center" data-a="wipe" data-s="1" data-d="900"><span class="huge" style="font-size:60px">headers</span></div></div>
      <div class="abs" style="left:120px;top:760px;width:1680px;display:flex;justify-content:space-between" data-a="fade" data-s="1" data-d="1100">
        <span class="mono" style="color:var(--paper)">0</span><span class="mono" style="color:var(--paper);margin-left:auto;margin-right:300px">1,200</span><span class="mono" style="color:var(--paper)">1,500</span></div>
      <div class="abs head" style="left:120px;top:860px;font-size:72px;color:var(--paper)" data-a="rise" data-s="1" data-d="1300">The packet also carries the <span class="acc">headers.</span></div>`
  });
})();
