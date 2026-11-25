/* CASE 2: JURISDICTION 18:00–25:00 */
(function () {
  const D = window.D;
  const SEC = 'Case 2 · Jurisdiction';
  const code = (lines) => lines.map((l, i) => `<span class="ln" data-l="${i + 1}" style="display:block;min-height:1.45em;padding-left:14px">${l || ' '}</span>`).join('');

  /* 1. Case title */
  D.slide({ id: 'case2-title', sec: SEC, t: '18:00', bg: 'cobalt',
    notes: `So connectivity was about your users' network. The next case is about where your data is allowed to live.
Jurisdiction. Which laws and promises decide where data lives, and how failures are handled?`,
    html: `
      ${D.regs()}
      <div class="abs mono" style="left:120px;top:120px;color:var(--lime)" data-a="fade">Case 2 · row 05</div>
      <div class="abs huge" style="left:110px;top:200px;font-size:300px;color:var(--paper)">${D.words('Jurisdiction', { a: 'rise' })}</div>
      <div class="abs rule" style="left:120px;right:120px;top:540px;background:var(--paper)" data-a="wipe" data-d="400"></div>
      <div class="abs head" style="left:120px;top:600px;width:1500px;font-size:84px;color:var(--paper)" data-a="up" data-d="600">Which laws and <span class="hl" data-s="0" data-d="1300" style="--hlc:var(--lime);color:var(--ink)">promises</span> decide where data lives and how failures are handled?</div>`
  });

  /* 2. Three words */
  D.slide({ id: 'three-words', sec: SEC, t: '18:20', bg: 'paper',
    notes: `There are three words here that are kind of different.
[click] Data residency is simply where your data is physically stored.
[click] Data localisation is a rule that forces data to stay inside a country.
[click] And data sovereignty is about whose laws apply to that data, and who can force you to hand that data over.
[click] So your data can sit in a data centre in Germany and still be reachable by a foreign government, if the company running those servers falls under that government's laws.`,
    html: `
      <div class="abs mono muted" style="left:120px;top:100px" data-a="fade">Three words people mix up</div>
      ${[['Residency', 'Where your data is physically stored.', 'var(--cobalt)'],
         ['Localisation', 'A rule that forces data to stay inside a country.', 'var(--tomato)'],
         ['Sovereignty', 'Whose laws apply to it, and who can force you to hand it over.', 'var(--ink)']].map((w, k) => `
        <div class="abs" style="left:${120 + k * 580}px;top:180px;width:520px" data-a="up" data-s="${k + 1}" data-dim="4">
          <div class="rule" style="background:${w[2]};height:10px"></div>
          <div class="huge" style="font-size:110px;margin-top:26px;color:${w[2]}">${w[0]}</div>
          <div class="body" style="font-size:40px;margin-top:22px">${w[1]}</div></div>`).join('')}
      <div class="abs" style="left:120px;top:690px;width:1680px;height:300px;background:var(--ink);color:var(--paper)" data-a="wipeup" data-s="4"></div>
      <div class="abs tile" style="left:180px;top:770px;font-size:64px;background:var(--cobalt);color:var(--paper);padding:10px 28px" data-a="pop" data-s="4" data-d="300">Servers in Germany</div>
      <svg class="abs" width="420" height="120" style="left:780px;top:780px" fill="none" stroke="var(--tomato)" stroke-width="6">
        <path d="M410 50 H20 M50 22 L16 50 L50 78" data-a="draw" data-s="4" data-d="800"/></svg>
      <div class="abs tile" style="left:1220px;top:770px;font-size:64px;background:var(--tomato);color:var(--ink);padding:10px 28px" data-a="pop" data-s="4" data-d="550">A foreign government</div>
      <div class="abs body" style="left:180px;top:900px;color:var(--paper);font-size:36px" data-a="fade" data-s="4" data-d="1200">It can still reach the data if the company running the servers falls under its laws.</div>`
  });

  /* 3. April 2018: RBI */
  D.slide({ id: 'rbi-2018', sec: SEC, t: '19:30', bg: 'ink',
    notes: `Okay, so the case study for this is India and Mastercard.
In April 2018, the Reserve Bank of India told payment companies that all their payment data had to be stored only in India.
[click] That's data localisation, and they gave them six months to do it.
[click] Later, the RBI said that Mastercard hadn't complied, and they stopped Mastercard from taking on new customers in India.`,
    html: `
      <div class="abs mono" style="left:110px;top:110px;color:var(--sub)" data-a="fade">Reserve Bank of India · 6 April 2018</div>
      <div class="abs huge" style="left:100px;top:170px;font-size:200px;color:var(--paper)" data-a="rise">April 2018</div>
      <div class="abs head" style="left:110px;top:430px;width:780px;font-size:64px;color:var(--paper)" data-a="up" data-d="300">All payment data stored <span class="hl" data-s="0" data-d="900" style="--hlc:var(--tomato)">only in India</span>.</div>
      ${D.browser({ x: 960, y: 140, w: 880, h: 560, url: 'rbi.org.in · Storage of Payment System Data', src: 'assets/img/src-rbi-2018.png', a: 'left', d: 200, imgStyle: 'width:150%;margin-left:-6%' })}
      <div class="abs" style="left:110px;top:720px;display:flex;align-items:baseline;gap:26px" data-a="up" data-s="1">
        <span class="huge lime" style="font-size:190px" data-a="count" data-s="1" data-to="6" data-dur="900">6</span>
        <span class="head" style="font-size:60px;color:var(--paper)">months to comply</span></div>
      <div class="abs tile" style="left:820px;top:790px;font-size:64px;background:var(--tomato);color:var(--ink);padding:8px 30px;transform:rotate(-3deg)" data-a="drop" data-s="2">Mastercard: no new customers</div>
      ${D.credit('Source: Reserve Bank of India notification, 6 April 2018')}`
  });

  /* 4. Almost a year: the bar */
  D.slide({ id: 'mastercard-bar', sec: SEC, t: '20:30', bg: 'tomato',
    notes: `So basically, for almost a year, one of the biggest card networks in the world couldn't grow in one of its biggest markets, just because of where its data lived.`,
    html: `
      <div class="abs mono" style="left:120px;top:110px" data-a="fade">Mastercard in India · no new domestic customers</div>
      <div class="abs huge" style="left:110px;top:170px;font-size:170px" data-a="right">July 2021</div>
      <div class="abs huge" style="right:120px;top:170px;font-size:170px;text-align:right" data-a="left" data-d="200">June 2022</div>
      <div class="abs" style="left:120px;right:120px;top:420px;height:130px;border:5px solid var(--ink)" data-a="fade" data-d="200"></div>
      <div class="abs" style="left:130px;width:1660px;top:430px;height:110px;background:var(--ink)" data-a="wipe" data-d="600" ></div>
      ${['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((m, k) => `<div class="abs mono" style="left:${150 + k * 138}px;top:572px;font-size:26px" data-a="fade" data-d="${700 + k * 70}">${m}</div>`).join('')}
      <div class="abs head" style="left:120px;top:690px;width:1680px;font-size:76px" data-a="up" data-d="1500">One of the biggest card networks in the world couldn't grow in one of its biggest markets, because of <span class="tile" style="font-family:Archivo;font-weight:800;text-transform:none;background:var(--ink);color:var(--paper);padding:0 16px">where its data lived.</span></div>
      ${D.credit('Source: MediaNama, “RBI lifts restriction on Mastercard”, June 2022')}`
  });

  /* 5. Localisation is the rule, residency is how you obey it */
  D.slide({ id: 'rule-vs-residency', sec: SEC, t: '21:00', bg: 'paper',
    notes: `So now, how do we actually build for situations like this?
Mastercard's problem was a localisation law. It said where the data had to live.
[click] And where data lives is residency.
[click] So residency architecture is how you obey a localisation law, and how you keep any promise you've made to a customer about where their data lives.`,
    html: `
      ${D.regs()}
      <div class="abs" style="left:0;top:0;width:960px;height:1080px;background:var(--tomato)" data-a="wipe"></div>
      <div class="abs" style="left:960px;top:0;width:960px;height:1080px;background:var(--cobalt)" data-a="wipe" data-s="1"></div>
      <div class="abs" style="left:110px;top:260px;width:780px" data-a="up" data-d="300">
        <div class="mono">The rule</div>
        <div class="huge" style="font-size:150px;margin-top:20px">Localisation</div>
        <div class="body" style="margin-top:24px">Where the data <b>has to</b> live.</div></div>
      <div class="abs" style="left:1070px;top:260px;width:760px;color:var(--paper)" data-a="up" data-s="1" data-d="300">
        <div class="mono">How you obey it</div>
        <div class="huge" style="font-size:150px;margin-top:20px">Residency</div>
        <div class="body" style="margin-top:24px">Where the data <b>does</b> live.</div></div>
      <div class="abs" style="left:110px;right:110px;top:770px;height:190px;background:var(--lime);display:flex;align-items:center;padding:0 50px" data-a="wipe" data-s="2">
        <span class="head" style="font-size:60px">Residency architecture also keeps the <span class="serif" style="font-size:76px">promises</span> you made to customers about where their data lives.</span></div>`
  });

  /* 6. The atom: source */
  D.slide({ id: 'atom-source', sec: SEC, t: '21:30', bg: 'ink',
    notes: `I watched a talk by Alex Strachan, who worked on data residency at Rippling. He gave a really good talk about this at QCon San Francisco, and I want to take four ideas from it.
[click] The first idea is the atom.`,
    html: `
      ${D.browser({ x: 110, y: 130, w: 1000, h: 640, url: 'qconsf.com · Understanding Architectures for Multi-Region Data Residency', src: 'assets/img/src-qconsf-strachan.png', a: 'up', imgStyle: 'width:130%;margin-left:-4%' })}
      <div class="abs" style="left:1180px;top:150px;width:640px" data-a="left" data-d="300">
        <div class="mono lime">Alex Strachan</div>
        <div class="body" style="color:var(--paper);margin-top:12px">Rippling<br>QCon San Francisco, 4 October 2023</div>
        <div class="mono" style="color:var(--sub);margin-top:30px">Four ideas</div></div>
      <div class="abs huge" style="left:1170px;top:520px;font-size:230px;color:var(--lime)" data-a="zoom" data-s="1">The atom</div>
      ${D.credit('qconsf.com, QCon San Francisco 2023')}`
  });

  /* 7. The atom: diagram */
  D.slide({ id: 'atom-diagram', sec: SEC, t: '22:00', bg: 'paper',
    notes: `The atom is the unit of data that always lives together, in one region. For a B2B product, that's usually the company.
[click] So everything about one company, its employees, its payroll, its documents, lives in one region. That way, no normal query ever needs data from two places. So if you have customers in India, all of their data lives in India, and the law is satisfied by design.
[click] But something still has to know which region each company lives in. So there's always a small global layer on top.
[click] And you want your global layer to be as small as possible. Just IDs and regions, with no personal data in it.`,
    html: `
      <style>
        #s-atom-diagram .reg-box { position:absolute; border:5px solid var(--ink); }
        #s-atom-diagram .cell { position:absolute; width:150px; height:96px; display:flex; align-items:center; justify-content:center; font-family:'DM Mono'; font-size:26px; letter-spacing:.03em; border:4px solid var(--ink); }
      </style>
      <div class="abs head" style="left:110px;top:90px;font-size:72px" data-a="rise">The atom: data that always lives together.</div>
      <!-- the single atom, centred at step 0 -->
      <div class="abs" id="atom1" style="left:760px;top:330px;width:400px;height:320px;transition:transform .9s var(--ease)">
        <div class="mono" style="position:absolute;left:0;top:-48px" data-a="fade">acme-estonia</div>
        <div class="cell" style="left:0;top:0;width:400px;background:var(--cobalt);color:var(--paper)" data-a="drop">company</div>
        <div class="cell" style="left:0;top:112px;width:190px;background:var(--card)" data-a="drop" data-d="200">employees</div>
        <div class="cell" style="left:210px;top:112px;width:190px;background:var(--card)" data-a="drop" data-d="320">payroll</div>
        <div class="cell" style="left:0;top:224px;width:400px;background:var(--card)" data-a="drop" data-d="440">documents</div>
      </div>
      <!-- regions, step 1 -->
      <div class="reg-box" style="left:110px;top:270px;width:780px;height:470px" data-a="fade" data-s="1"></div>
      <div class="abs mono blue" style="left:140px;top:290px" data-a="fade" data-s="1">Region · eu-north-1</div>
      <div class="reg-box" style="left:1030px;top:270px;width:780px;height:470px" data-a="fade" data-s="1" data-d="150"></div>
      <div class="abs mono red" style="left:1060px;top:290px" data-a="fade" data-s="1" data-d="150">Region · af-south-1</div>
      <div class="abs" style="left:1220px;top:380px;width:400px;height:320px" data-a="up" data-s="1" data-d="400">
        <div class="mono" style="position:absolute;left:0;top:-48px">acme-nigeria</div>
        <div class="cell" style="left:0;top:0;width:400px;background:var(--tomato)">company</div>
        <div class="cell" style="left:0;top:112px;width:190px;background:var(--card)">employees</div>
        <div class="cell" style="left:210px;top:112px;width:190px;background:var(--card)">payroll</div>
        <div class="cell" style="left:0;top:224px;width:400px;background:var(--card)">documents</div></div>
      <!-- global layer, step 2 -->
      <div class="abs" style="left:110px;top:800px;width:1700px;height:200px;background:var(--ink);color:var(--paper);padding:26px 40px" data-a="wipeup" data-s="2">
        <div class="mono lime">Global layer</div>
        <div class="code" style="font-variant-ligatures:none;font-size:40px;margin-top:10px"><span data-a="type" data-s="2" data-d="500" data-cps="60">acme-estonia → eu-north-1     acme-nigeria → af-south-1</span></div></div>
      <div class="abs tile" style="left:1290px;top:752px;font-size:44px;background:var(--lime);color:var(--ink);padding:6px 24px;transform:rotate(-3deg)" data-a="pop" data-s="3">IDs + regions. No personal data.</div>`,
    on(step, el, D, animate) {
      const a = el.querySelector('#atom1');
      a.style.transition = animate ? 'transform .9s var(--ease)' : 'none';
      a.style.transform = step >= 1 ? 'translate(-460px, 50px)' : 'none';
    }
  });

  /* 8. Not GDPR: promises */
  D.slide({ id: 'not-gdpr', sec: SEC, t: '22:50', bg: 'lime',
    notes: `The second idea surprises a lot of people. Residency usually isn't a GDPR requirement.
[click] GDPR doesn't say EU data must stay in the EU. It says data can leave under certain conditions.
[click] Most residency demands come from customers and their contracts. That's why the question says "laws and promises", because promises can be negotiated in a way laws can't.`,
    html: `
      <div class="abs mono" style="left:120px;top:110px" data-a="fade">Idea 2</div>
      <div class="abs head" style="left:110px;top:170px;width:1700px;font-size:120px;line-height:.98">${D.words('Residency usually isn’t a GDPR requirement.', { gap: 60 })}</div>
      <div class="abs body" style="left:120px;top:500px;width:1400px;font-size:46px" data-a="up" data-s="1">GDPR says data can leave the EU, under certain conditions.</div>
      <div class="abs" style="left:120px;top:660px;display:flex;gap:40px;align-items:stretch">
        <div style="width:800px;background:var(--ink);color:var(--paper);padding:34px 40px" data-a="up" data-s="2">
          <div class="mono" style="color:var(--sub)">Laws</div><div class="huge" style="font-size:96px;margin-top:10px">Fixed</div></div>
        <div style="width:800px;background:var(--cobalt);color:var(--paper);padding:34px 40px" data-a="up" data-s="2" data-d="200">
          <div class="mono" style="color:var(--lime)">Promises in contracts</div><div class="huge" style="font-size:96px;margin-top:10px">Negotiable</div></div>
      </div>`
  });

  /* 9. Routing code */
  D.slide({ id: 'routing-code', sec: SEC, t: '23:20', bg: 'paper',
    notes: `The third idea is routing. Every request carries the company's ID, and the gateway sends it to whichever region holds that company.
[click] And look at the throw.
[click] The tempting thing is to fall back to a default region. It looks harmless, right? But that's exactly how data ends up in the wrong country.`,
    html: `
      <div class="term" style="left:110px;top:90px;width:1700px;height:900px" data-a="up" data-dim="2">
        <div class="bar"><i></i><i></i><i></i><span style="margin-left:14px">gateway/route.js</span></div>
        <pre class="code" style="font-variant-ligatures:none;font-variant-ligatures:none;font-size:38px;padding:34px 30px"><div data-a="type" data-cps="80" data-d="400">${code([
          `<span class="k">const</span> <span class="n">regionByCompany</span> = <span class="k">new</span> <span class="f">Map</span>([`,
          `  [<span class="s">'acme-estonia'</span>, <span class="s">'eu-north-1'</span>],`,
          `  [<span class="s">'acme-nigeria'</span>, <span class="s">'af-south-1'</span>],`,
          `]);`,
          ``,
          `<span class="k">function</span> <span class="f">routeRequest</span>(req) {`,
          `  <span class="k">const</span> region = regionByCompany.<span class="f">get</span>(req.companyId);`,
          `  <span class="k">if</span> (!region) {`,
          `    <span class="k">throw new</span> <span class="f">Error</span>(<span class="s">\`No home region for company \${req.companyId}\`</span>);`,
          `  }`,
          `  <span class="k">return</span> <span class="s">\`https://\${region}.internal.example.com\${req.path}\`</span>;`,
          `}`])}</div></pre>
      </div>
      <div class="abs tile" style="left:1330px;top:530px;font-size:52px;background:var(--lime);color:var(--ink);padding:6px 22px" data-a="pop" data-s="1" data-out="2">Fail loudly</div>
      <div class="abs" style="left:310px;top:330px;width:1300px;background:var(--tomato);color:var(--ink);padding:50px 60px" data-a="drop" data-s="2">
        <div class="mono">The tempting fallback</div>
        <div class="code" style="font-variant-ligatures:none;font-size:56px;margin-top:20px;font-weight:800"><span class="strike" data-s="2" data-d="900">return region ?? <span style="color:var(--paper)">'us-east-1'</span>;</span></div>
        <div class="head" style="font-size:56px;margin-top:30px">That's how data ends up in the wrong country.</div></div>`,
    on(step, el) {
      el.querySelectorAll('.ln').forEach(l => l.classList.toggle('lineon', step === 1 && [8, 9, 10].includes(+l.dataset.l)));
    }
  });

  /* 10. Do the same thing every time */
  D.slide({ id: 'same-every-time', sec: SEC, t: '24:00', bg: 'cobalt',
    notes: `And the fourth idea is the one I like the most. Do the same thing every time.
[click] Don't write "if this customer is multi-region, do this, otherwise do that".
[click] Code that only runs for a few customers doesn't get tested, so its bugs survive.`,
    html: `
      <div class="abs mono" style="left:120px;top:110px;color:var(--lime)" data-a="fade">Idea 4</div>
      <div class="abs huge" style="left:110px;top:170px;font-size:210px;color:var(--paper);line-height:.9">
        <div>${D.words('Do the same thing', { gap: 90 })}</div><div class="lime">${D.words('every time.', { d: 360, gap: 90 })}</div></div>
      <div class="abs code" style="left:120px;top:620px;font-size:46px;color:var(--paper);background:rgba(0,0,0,.25);padding:26px 36px" data-a="up" data-s="1">
        <span class="strike" data-s="2" data-d="200"><span style="color:#FF9C85">if</span> (customer.isMultiRegion) { … } <span style="color:#FF9C85">else</span> { … }</span></div>
      <div class="abs head" style="left:120px;top:820px;width:1600px;font-size:62px;color:var(--paper)" data-a="up" data-s="2" data-d="500">Code that only runs for a few customers doesn't get tested, so its bugs survive.</div>`
  });

  /* 11. Volvo Cars: source */
  D.slide({ id: 'volvo-source', sec: SEC, t: '24:20', bg: 'ink',
    notes: `Interestingly, there's a talk from Øredev last year that kind of backs this up pretty well.
Christian Fredriksson and Henrik Lindström from Volvo Cars talked about deciding, dataset by dataset, which data stays regional and which stays global.`,
    html: `
      ${D.browser({ x: 960, y: 150, w: 860, h: 600, url: 'oredev.org · 10 years of Kafka', src: 'assets/img/src-oredev-volvo.png', a: 'left', d: 200, imgStyle: 'width:150%;margin-left:-25%;margin-top:-4%' })}
      <div class="abs mono lime" style="left:110px;top:150px" data-a="fade">Øredev 2025 · Volvo Cars</div>
      <div class="abs body" style="left:110px;top:210px;width:780px;color:var(--paper);font-size:36px" data-a="up" data-d="100">Christian Fredriksson and Henrik Lindström, “10 years of Kafka. Tips, tricks and lessons learned from supporting 10 million connected cars”</div>
      <div class="abs head" style="left:110px;top:480px;width:800px;font-size:96px;color:var(--paper)" data-a="up" data-d="400">Which data is <span class="blue" style="background:var(--paper);padding:0 12px">regional</span>, which is global?</div>
      ${D.credit('oredev.org, Øredev 2025 programme')}`
  });

  /* 12. Dataset by dataset */
  D.slide({ id: 'regional-global', sec: SEC, t: '24:40', bg: 'paper',
    notes: `Not every piece of data has to be the atom.
[click] You choose, on purpose, [click] and you write the choice down.`,
    html: `
      <style>#s-regional-global .ds{position:absolute;left:760px;width:400px;height:86px;background:var(--card);border:4px solid var(--ink);display:flex;align-items:center;padding:0 24px;font-family:'DM Mono';font-size:30px;transition:transform .8s var(--ease), background .6s, color .6s}</style>
      <div class="abs head" style="left:110px;top:80px;font-size:72px" data-a="rise">Not every piece of data has to be the atom.</div>
      <div class="abs huge blue" style="left:110px;top:230px;font-size:110px" data-a="right" data-s="1">Regional</div>
      <div class="abs huge" style="right:110px;top:230px;font-size:110px;text-align:right" data-a="left" data-s="1">Global</div>
      ${['payroll', 'employee records', 'documents', 'feature flags', 'currency list', 'product catalogue'].map((d, k) =>
        `<div class="ds" data-k="${k}" style="top:${360 + k * 104}px" data-a="fade" data-d="${200 + k * 90}">${d}</div>`).join('')}
      <div class="abs mono muted" style="left:760px;top:1010px;width:400px;text-align:center;font-size:26px" data-a="fade" data-d="800">example datasets</div>
      <div class="abs" style="left:110px;top:760px;width:560px;background:var(--lime);padding:18px 26px" data-a="wipe" data-s="2">
        <div class="code" style="font-variant-ligatures:none;font-size:36px">data-residency.md</div><div class="body" style="font-size:34px">Write the choice down.</div></div>`,
    on(step, el, D, animate) {
      el.querySelectorAll('.ds').forEach(n => {
        const k = +n.dataset.k, reg = k < 3;
        n.style.transitionDelay = animate ? (k * 90) + 'ms' : '0ms';
        if (!animate) n.style.transition = 'none'; else n.style.transition = '';
        n.style.transform = step >= 1 ? `translateX(${reg ? -650 : 650}px)` : 'none';
        n.style.background = step >= 1 ? (reg ? 'var(--cobalt)' : 'var(--ink)') : 'var(--card)';
        n.style.color = step >= 1 ? 'var(--paper)' : 'var(--ink)';
      });
    }
  });

  /* 13. The side doors */
  D.slide({ id: 'side-doors', sec: SEC, t: '24:55', bg: 'ink',
    notes: `Now think about it. Data rarely leaks out of its region through the main database.
[click] It leaks through the side doors. Your logs, your error tracker, your analytics, your backups, the support tool where someone pastes customer details, and now, AI APIs.
[click] If you send customer photos to an AI model, like we do for car wash quality checks at FleetFox, where that model runs belongs in the jurisdiction row too.`,
    html: `
      <style>
        #s-side-doors .door { position:absolute; left:830px; width:40px; height:70px; background:var(--ink); }
        #s-side-doors .rec { position:absolute; left:740px; width:46px; height:46px; background:var(--tomato); transition:transform 1s var(--ease), opacity .3s; opacity:0; }
        #s-side-doors .lab { position:absolute; left:1080px; font-family:'Anton'; text-transform:uppercase; font-size:62px; line-height:70px; color:var(--paper); }
      </style>
      <div class="abs head" style="left:110px;top:80px;width:1700px;font-size:76px;color:var(--paper)" data-a="rise">Data rarely leaks through the main database.</div>
      <div class="abs" style="left:110px;top:250px;width:740px;height:760px;border:6px solid var(--cobalt)" data-a="fade" data-d="200"></div>
      <div class="abs mono" style="left:140px;top:270px;color:#8FA2FF" data-a="fade" data-d="300">Region · EU</div>
      <div class="abs" style="left:210px;top:480px;width:440px;height:300px;border:5px solid var(--paper);display:flex;flex-direction:column;justify-content:center;align-items:center;gap:14px" data-a="pop" data-d="400">
        <div class="huge" style="font-size:72px;color:var(--paper)">Main DB</div><div class="mono lime">locked down</div></div>
      ${['Logs', 'Error tracker', 'Analytics', 'Backups', 'Support tool', 'AI APIs'].map((w, k) => {
        const y = 300 + k * 118;
        return `<div class="door" style="top:${y}px" data-a="fade" data-s="1" data-d="${k * 380}"></div>
          <div class="rec" data-k="${k}" style="top:${y + 12}px"></div>
          <svg class="abs" width="200" height="20" style="left:860px;top:${y + 25}px" fill="none" stroke="${k === 5 ? 'var(--lime)' : 'var(--tomato)'}" stroke-width="5"><path d="M0 10 H190" data-a="draw" data-s="1" data-d="${k * 380 + 150}"/></svg>
          <div class="lab" style="top:${y}px;${k === 5 ? 'color:var(--lime)' : ''}" data-a="left" data-s="1" data-d="${k * 380 + 250}" ${k < 5 ? 'data-dim="2"' : ''}>${w}</div>`;
      }).join('')}
      <div class="abs" style="left:1500px;top:870px;width:320px;background:var(--lime);color:var(--ink);padding:16px 20px" data-a="pop" data-s="2">
        <div class="mono" style="font-size:26px">FleetFox</div><div class="body" style="font-size:34px">Car photos → an AI model. Where does it run?</div></div>`,
    on(step, el, D, animate) {
      el.querySelectorAll('.rec').forEach(r => {
        const k = +r.dataset.k;
        r.style.transition = animate ? '' : 'none';
        r.style.transitionDelay = animate && step === 1 ? (k * 380 + 100) + 'ms' : '0ms';
        r.style.opacity = step >= 1 ? 1 : 0;
        r.style.transform = step >= 1 ? 'translateX(260px)' : 'none';
      });
    }
  });

  /* 14. Jurisdiction row, filled in */
  D.slide({ id: 'jurisdiction-filled', sec: SEC, t: '25:20', bg: 'paper',
    notes: `So let's fill in the jurisdiction row.
[click] When there's a localisation law or a residency promise, [click] you choose your atom, [click] you keep a tiny global layer that fails loudly, [click] you decide dataset by dataset what stays regional, [click] and you check the side doors.`,
    html: `
      ${D.profile({ rows: [4], hot: [4], top: 110 })}
      <div class="abs" style="left:120px;top:330px;background:var(--ink);color:var(--paper);padding:20px 30px" data-a="wipe" data-s="1">
        <span class="mono lime">When</span> <span class="body" style="font-size:40px;margin-left:16px">there's a localisation law or a residency promise</span></div>
      ${['Choose your atom.', 'Keep a tiny global layer that fails loudly.', 'Decide, dataset by dataset, what stays regional.', 'Check the side doors.'].map((d, k) => `
        <div class="abs" style="left:120px;right:120px;top:${470 + k * 135}px;border-top:3px solid var(--ink);padding-top:22px;display:grid;grid-template-columns:120px 1fr;align-items:baseline" data-a="up" data-s="${k + 2}">
          <span class="num" style="font-size:34px;color:var(--tomato)">${String(k + 1).padStart(2, '0')}</span>
          <span class="head" style="font-size:64px">${d}</span></div>`).join('')}`
  });
})();
