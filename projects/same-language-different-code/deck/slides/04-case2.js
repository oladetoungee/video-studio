/* CASE 2: JURISDICTION 18:00–25:00 (v2: Direction A look, one idea per slide) */
(function () {
  const D = window.D;
  const SEC = 'Case 2 · Jurisdiction';
  const code = (lines) => lines.map((l, i) => `<span class="ln" data-l="${i + 1}" style="display:block;min-height:1.45em;padding-left:14px">${l || ' '}</span>`).join('');

  /* 1. Case title */
  D.slide({ id: 'case2-title', sec: SEC, t: '18:00', bg: 'paper',
    notes: `So connectivity was about your users' network. The next story is about where your data is allowed to live.
Jurisdiction. Which laws and promises decide where data lives, and how failures are handled?`,
    html: `
      <div class="abs mono" style="left:140px;top:110px" data-a="fade">Case 2</div>
      <div class="abs huge" data-ts="off" style="left:136px;top:250px;font-size:190px">${D.words('Jurisdiction', { a: 'rise' })}</div>
      <div class="abs rule" style="left:140px;right:140px;top:520px;height:2px" data-a="wipe" data-d="400"></div>
      <div class="abs sub" style="left:140px;top:580px;width:1400px;font-size:56px;color:var(--ink)" data-a="up" data-d="600">Which laws and <span class="hl" data-s="0" data-d="1300">promises</span> decide where data lives and how failures are handled?</div>`
  });

  /* 2. Three words */
  D.slide({ id: 'three-words', sec: SEC, t: '18:20', bg: 'paper',
    notes: `There are three words here that are kind of different.
Data residency is simply where your data is physically stored.
Data localisation is a rule that forces data to stay inside a country.
And data sovereignty is about whose laws apply to that data, and who can force you to hand that data over.
So your data can sit in a data centre in Germany and still be reachable by a foreign government, if the company running those servers falls under that government's laws.`,
    html: `
      ${[['Residency', 'Where your data is physically stored.', 'var(--cobalt)'],
         ['Localisation', 'A rule that forces data to stay inside a country.', 'var(--tomato)'],
         ['Sovereignty', 'Whose laws apply to that data, and who can force you to hand that data over?', 'var(--ink)']].map((w, k) => `
        <div class="abs" style="left:${140 + k * 560}px;top:330px;width:520px" data-a="up" data-d="${k === 0 ? 100 : 900 + (k - 1) * 1100}">
          <div style="height:3px;background:${w[2]}"></div>
          <div class="huge" data-ts="off" style="font-size:96px;margin-top:30px;color:${w[2]}">${w[0]}</div>
          <div class="body" style="font-size:42px;margin-top:22px">${w[1]}</div></div>`).join('')}`  });

  /* 3. April 2018: RBI */
  D.slide({ id: 'rbi-2018', sec: SEC, t: '19:30', bg: 'paper',
    notes: `So the story here is India and Mastercard.
In April 2018, the Reserve Bank of India told payment companies that all their payment data had to be stored only in India.
That's data localisation, and they gave them six months to do it.
Later, the RBI said that Mastercard hadn't complied, and they stopped Mastercard from taking on new customers in India.`,
    html: `
      <div class="abs mono" style="left:140px;top:290px" data-a="fade">Reserve Bank of India</div>
      <div class="abs huge" data-ts="off" style="left:136px;top:340px;font-size:140px" data-a="rise">April 2018</div>
      <div class="abs head" style="left:140px;top:540px;width:760px;font-size:60px" data-a="up" data-d="300">All payment data stored <span class="hl" data-s="0" data-d="900">only in India.</span></div>
      ${D.browser({ x: 960, y: 200, w: 840, h: 680, url: 'rbi.org.in · Storage of Payment System Data', src: 'assets/img/src-rbi-2018.png', a: 'left', d: 200, imgStyle: 'width:150%;margin-left:-6%' })}`
  });

  /* 4. Almost a year: the bar */
  D.slide({ id: 'mastercard-bar', sec: SEC, t: '20:30', bg: 'paper',
    notes: `So basically, for almost a year, one of the biggest card networks in the world couldn't grow in one of its biggest markets, just because of where its data lived.`,
    html: `
      <div class="abs huge" data-ts="off" style="left:136px;top:200px;font-size:110px" data-a="right">July 2021</div>
      <div class="abs huge" data-ts="off" style="right:140px;top:200px;font-size:110px;text-align:right" data-a="left" data-d="200">June 2022</div>
      <div class="abs" style="left:140px;right:140px;top:380px;height:90px;border:2.5px solid var(--ink)" data-a="fade" data-d="200"></div>
      <div class="abs" style="left:148px;width:1624px;top:388px;height:74px;background:var(--tomato)" data-a="wipe" data-d="600"></div>
      ${['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((m, k) => `<div class="abs mono" style="left:${150 + k * 136}px;top:492px;font-size:24px" data-a="fade" data-d="${700 + k * 70}">${m}</div>`).join('')}
      <div class="abs head" style="left:140px;top:680px;width:1640px;font-size:76px" data-a="up" data-d="1500">Mastercard couldn't grow in India because of <span class="hl" data-s="0" data-d="2100">where its data lived.</span></div>`
  });

  /* 5. Localisation is the rule, residency is how you obey it */
  D.slide({ id: 'rule-vs-residency', sec: SEC, t: '21:00', bg: 'paper',
    notes: `So now, how do we actually build for situations like this?
Mastercard's problem was a localisation law. It said where the data had to live.
And where data lives is residency.
So residency architecture is how you obey a localisation law, and how you keep any promise you've made to a customer about where their data lives.`,
    html: `
      <div class="abs" style="left:959px;top:330px;width:2px;height:360px;background:var(--line)" data-a="fade"></div>
      <div class="abs" style="left:140px;top:400px;width:760px" data-a="up" data-d="200">
        <div class="huge red" data-ts="off" style="font-size:120px">Localisation</div>
        <div class="body" style="margin-top:20px">Where data <b>has to</b> live.</div></div>
      <div class="abs" style="left:1040px;top:400px;width:760px" data-a="up" data-d="1300">
        <div class="huge blue" data-ts="off" style="font-size:120px">Residency</div>
        <div class="body" style="margin-top:20px">Where data <b>does</b> live.</div></div>`
  });

  /* 6. The atom: source */
  D.slide({ id: 'atom-source', sec: SEC, t: '21:30', bg: 'paper',
    notes: `I watched a talk by Alex Strachan, who worked on data residency at Rippling. He gave a really good talk about this at QCon San Francisco, and I want to take two ideas from it.
The first idea is the atom.`,
    html: `
      ${D.browser({ x: 140, y: 160, w: 1000, h: 640, url: 'qconsf.com · Understanding Architectures for Multi-Region Data Residency', src: 'assets/img/src-qconsf-strachan.png', a: 'up', imgStyle: 'width:130%;margin-left:-4%' })}
      <div class="abs" style="left:1220px;top:200px;width:580px" data-a="left" data-d="300">
        <div class="head" style="font-size:56px">Alex Strachan</div>
        <div class="mono" style="margin-top:12px">Rippling · QCon SF 2023</div></div>
      <div class="abs huge blue" data-ts="off" style="left:1216px;top:560px;font-size:150px" data-a="zoom" data-d="1600">The atom</div>`
  });

  /* 7. The atom: diagram */
  D.slide({ id: 'atom-diagram', sec: SEC, t: '22:00', bg: 'paper',
    notes: `The atom is the unit of data that always lives together, in one region. For a B2B product, that's usually the company.
So everything about one company, its employees, its payroll, its documents, lives in one region. That way, no normal query ever needs data from two places. So if you have customers in India, all of their data lives in India, and the law is satisfied by design.
[click] But something still has to know which region each company lives in. So there's always a small global layer on top.
And you want your global layer to be as small as possible. Just IDs and regions, with no personal data in it.`,
    html: `
      <style>
        #s-atom-diagram .reg-box { position:absolute; border:2.5px solid var(--ink); }
        #s-atom-diagram .cell { position:absolute; height:96px; display:flex; align-items:center; justify-content:center; font-family:'GeistMono'; font-size:26px; border:2px solid var(--ink); background:var(--card); }
      </style>
      <div class="abs head" style="left:140px;top:90px;font-size:72px" data-a="rise">The atom: data that always lives together.</div>
      <div class="abs" id="atom1" style="left:320px;top:380px;width:400px;height:320px">
        <div class="mono" style="position:absolute;left:0;top:-46px;font-size:26px" data-a="fade">acme-estonia</div>
        <div class="cell" style="left:0;top:0;width:400px;background:var(--cobalt);border-color:var(--cobalt);color:#fff" data-a="drop">company</div>
        <div class="cell" style="left:0;top:112px;width:190px" data-a="drop" data-d="200">employees</div>
        <div class="cell" style="left:210px;top:112px;width:190px" data-a="drop" data-d="320">payroll</div>
        <div class="cell" style="left:0;top:224px;width:400px" data-a="drop" data-d="440">documents</div>
      </div>
      <div class="reg-box" style="left:140px;top:270px;width:760px;height:460px" data-a="fade" data-d="700"></div>
      <div class="abs mono blue" style="left:166px;top:290px;font-size:26px" data-a="fade" data-d="800">eu-north-1</div>
      <div class="reg-box" style="left:1020px;top:270px;width:760px;height:460px" data-a="fade" data-d="1400"></div>
      <div class="abs mono red" style="left:1046px;top:290px;font-size:26px" data-a="fade" data-d="1500">af-south-1</div>
      <div class="abs" style="left:1200px;top:380px;width:400px;height:320px" data-a="up" data-d="1700">
        <div class="mono" style="position:absolute;left:0;top:-46px;font-size:26px">acme-nigeria</div>
        <div class="cell" style="left:0;top:0;width:400px;background:var(--tomato);border-color:var(--tomato);color:#fff">company</div>
        <div class="cell" style="left:0;top:112px;width:190px">employees</div>
        <div class="cell" style="left:210px;top:112px;width:190px">payroll</div>
        <div class="cell" style="left:0;top:224px;width:400px">documents</div></div>
      <div class="abs" style="left:140px;top:800px;width:1640px;height:170px;border:2.5px solid var(--ink);padding:24px 36px" data-a="wipe" data-s="1">
        <div class="mono" style="font-size:26px">global layer</div>
        <div class="code" style="font-size:38px;margin-top:8px"><span data-a="type" data-s="1" data-d="500" data-cps="60">acme-estonia → eu-north-1     acme-nigeria → af-south-1</span></div></div>`
  });

  /* 9. Routing code */
  D.slide({ id: 'routing-code', sec: SEC, t: '23:20', bg: 'paper',
    notes: `The second idea is routing. Every request carries the company's ID, and the gateway sends it to whichever region holds that company.`,
    html: `
      <div class="term" style="left:140px;top:150px;width:1640px;height:840px" data-a="up">
        <div class="bar"><i></i><i></i><i></i><span style="margin-left:14px">gateway/route.js</span></div>
        <pre class="code" style="font-size:36px;padding:30px 28px"><div data-a="type" data-cps="80" data-d="400">${code([
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
      </div>`
  });

  /* 11. Volvo Cars: source */
  D.slide({ id: 'volvo-source', sec: SEC, t: '24:20', bg: 'paper',
    notes: `Interestingly, there's a talk from Øredev last year that kind of backs this up pretty well.
Christian Fredriksson and Henrik Lindström from Volvo Cars talked about deciding, dataset by dataset, which data stays regional and which stays global.`,
    html: `
      ${D.browser({ x: 1000, y: 160, w: 800, h: 560, url: 'oredev.org · 10 years of Kafka', src: 'assets/img/src-oredev-volvo.png', a: 'left', d: 200, imgStyle: 'width:150%;margin-left:-25%;margin-top:-4%' })}
      <div class="abs mono" style="left:140px;top:180px" data-a="fade">Øredev 2025 · Volvo Cars</div>
      <div class="abs head" style="left:140px;top:250px;width:780px;font-size:88px" data-a="up" data-d="400">Which data is <span class="blue">regional</span>, which is global?</div>
`
  });

  /* 12. Dataset by dataset */
  D.slide({ id: 'regional-global', sec: SEC, t: '24:40', bg: 'paper',
    notes: `Not every piece of data has to be the atom.
[click] You choose, on purpose, and you write the choice down.`,
    html: `
      <style>#s-regional-global .ds{position:absolute;left:760px;width:400px;height:80px;background:var(--card);border:2px solid var(--ink);display:flex;align-items:center;padding:0 24px;font-family:'GeistMono';font-size:28px;transition:transform .8s var(--ease), background .6s, color .6s, border-color .6s}</style>
      <div class="abs head" style="left:140px;top:90px;font-size:72px" data-a="rise">Not every piece of data has to be the atom.</div>
      <div class="abs huge blue" data-ts="off" style="left:136px;top:250px;font-size:84px" data-a="right" data-s="1">Regional</div>
      <div class="abs huge" data-ts="off" style="right:140px;top:250px;font-size:84px;text-align:right" data-a="left" data-s="1">Global</div>
      ${['payroll', 'employee records', 'documents', 'feature flags', 'currency list', 'product catalogue'].map((d, k) =>
        `<div class="ds" data-k="${k}" style="top:${380 + k * 98}px" data-a="fade" data-d="${200 + k * 90}">${d}</div>`).join('')}
`,
    on(step, el, D, animate) {
      el.querySelectorAll('.ds').forEach(n => {
        const k = +n.dataset.k, reg = k < 3;
        n.style.transitionDelay = animate ? (k * 90) + 'ms' : '0ms';
        if (!animate) n.style.transition = 'none'; else n.style.transition = '';
        n.style.transform = step >= 1 ? `translateX(${reg ? -620 : 620}px)` : 'none';
        n.style.background = step >= 1 ? (reg ? 'var(--cobalt)' : 'var(--ink)') : 'var(--card)';
        n.style.borderColor = step >= 1 ? (reg ? 'var(--cobalt)' : 'var(--ink)') : 'var(--ink)';
        n.style.color = step >= 1 ? '#fff' : 'var(--ink)';
      });
    }
  });

  /* 13. The side doors */
  D.slide({ id: 'side-doors', sec: SEC, t: '24:55', bg: 'ink',
    notes: `Another thing to consider here is data leaks.
[click] Data leaks through the side doors. Your logs, your error tracker, your analytics, your backups, the support tool where someone pastes customer details, and now, AI APIs.
If you send customer photos to an AI model, like we do for car wash quality checks at FleetFox, where that model runs belongs in the jurisdiction row too.`,
    html: `
      <style>
        #s-side-doors .door { position:absolute; left:832px; width:36px; height:64px; background:#141416; }
        #s-side-doors .rec { position:absolute; left:742px; width:40px; height:40px; background:var(--tomato); transition:transform 1s var(--ease), opacity .3s; opacity:0; }
        #s-side-doors .lab { position:absolute; left:1090px; font-family:'Geist'; font-weight:600; letter-spacing:-.03em; font-size:54px; line-height:64px; color:#F2F0EB; }
      </style>
      <div class="abs head" style="left:140px;top:90px;width:1640px;font-size:72px" data-a="rise">Another thing to consider: <span class="lime">data leaks.</span></div>
      <div class="abs" style="left:140px;top:250px;width:710px;height:740px;border:2.5px solid #8FA2FF" data-a="fade" data-d="200"></div>
      <div class="abs mono" style="left:166px;top:270px;color:#8FA2FF;font-size:26px" data-a="fade" data-d="300">EU region</div>
      <div class="abs" style="left:230px;top:480px;width:420px;height:280px;border:2px solid #F2F0EB;display:flex;flex-direction:column;justify-content:center;align-items:center;gap:12px" data-a="pop" data-d="400">
        <div class="head" style="font-size:60px">Main DB</div><div class="mono lime">locked down</div></div>
      ${['Logs', 'Error tracker', 'Analytics', 'Backups', 'Support tool', 'AI APIs'].map((w, k) => {
        const y = 300 + k * 116;
        return `<div class="door" style="top:${y}px" data-a="fade" data-s="1" data-d="${k * 380}"></div>
          <div class="rec" data-k="${k}" style="top:${y + 12}px"></div>
          <svg class="abs" width="200" height="20" style="left:868px;top:${y + 23}px" fill="none" stroke="${k === 5 ? 'var(--lime)' : 'var(--tomato)'}" stroke-width="2.5"><path d="M0 10 H190" data-a="draw" data-s="1" data-d="${k * 380 + 150}"/></svg>
          <div class="lab" style="top:${y}px;${k === 5 ? 'color:var(--lime)' : ''}" data-a="left" data-s="1" data-d="${k * 380 + 250}">${w}</div>`;
      }).join('')}`,
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
[click] When there's a localisation law or a residency promise, [click] you choose your atom, [click] you keep a tiny global layer that routes every request to its home region, [click] you decide dataset by dataset what stays regional, [click] and you check the side doors.`,
    html: `
      ${D.profile({ rows: [4], hot: [4], top: 120 })}
      <div class="abs body" style="left:140px;top:330px;font-size:40px;border-left:3px solid var(--cobalt);padding-left:26px" data-a="right" data-s="1">When there's a localisation law or a residency promise</div>
      ${['Choose your atom.', 'Keep a tiny global layer.', 'Decide, dataset by dataset, what stays regional.', 'Check the side doors.'].map((d, k) => `
        <div class="abs" style="left:140px;right:140px;top:${470 + k * 130}px;border-top:2px solid var(--line);padding-top:24px" data-a="up" data-s="${k + 2}">
          <span class="head" style="font-size:56px">${d}</span></div>`).join('')}`
  });
})();
