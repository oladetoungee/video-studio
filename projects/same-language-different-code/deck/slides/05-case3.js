/* CASE 3: MONEY AND IDENTITY 25:00–31:30 */
(function () {
  const D = window.D;
  const SEC = 'Case 3 · Money and identity';
  const code = (lines) => lines.map((l, i) => `<span class="ln" data-l="${i + 1}" style="display:block;min-height:1.5em;padding-left:14px">${l || ' '}</span>`).join('');
  // display type in Geist (no .huge class, so the v1 auto-scale never touches these sizes)
  const F = (px, w = 600) => `font-family:Geist;font-weight:${w};font-size:${px}px;line-height:1.02;letter-spacing:-.045em`;

  /* 1. Case title: two rows */
  D.slide({ id: 'case3-title', sec: SEC, t: '25:00', bg: 'paper',
    notes: `The last story is about money and identity. How people pay, and how people prove who they are.
Two of our rows fall into this story, so I'm going to do money rails and identity rails together.`,
    html: `
      <div class="abs" style="left:140px;top:170px;width:1640px">
        <div style="${F(170)}">${D.words('Money rails', { gap: 100 })}</div>
        <div class="sub" style="margin-top:22px" data-a="up" data-d="400">How fast and how reversible is settlement?</div></div>
      <div class="abs rule" style="left:140px;right:140px;top:560px" data-a="wipe" data-d="600"></div>
      <div class="abs" style="left:140px;top:610px;width:1640px">
        <div style="${F(170)}" class="blue">${D.words('Identity rails', { d: 750, gap: 100 })}</div>
        <div class="sub" style="margin-top:22px" data-a="up" data-d="1100">What do users already trust to prove who they are?</div></div>`
  });

  /* 2. A card payment is a pull: four steps on one line */
  const cardSteps = ['Authorise', 'Capture', 'Settle', 'Dispute'];
  D.slide({ id: 'card-pull', sec: SEC, t: '25:20', bg: 'paper',
    notes: `So, most payment code in Europe and North America was written with cards in mind. And we all know how a card payment works.
The bank authorises the payment, which means it checks the money is there and holds it.
The merchant captures it.
The money settles between the banks later.
And of course, the customer can dispute it with a chargeback.
So a card payment is what we call a pull. The merchant uses your card details to pull money from you.`,
    html: `
      <div class="abs head" style="left:140px;top:120px;width:1500px;font-size:80px" data-a="rise">Most payment code was written with cards in mind.</div>
      <svg class="abs" width="1920" height="360" style="left:0;top:440px" fill="none" stroke="var(--ink)" stroke-width="2.5">
        ${cardSteps.map((_, k) => k ? `<path d="M${200 + (k - 1) * 470 + 30} 60 H${200 + k * 470 - 30}" data-a="draw" data-d="${900 + k * 900 - 500}"/>` : '').join('')}
        <path d="M1610 230 C1610 330 260 330 260 230" stroke="var(--tomato)" stroke-dasharray="10 10" data-a="draw" data-d="4300" data-dur="1200"/>
      </svg>
      ${cardSteps.map((w, k) => `
        <div class="abs" style="left:${200 + k * 470 - 30}px;top:470px;width:60px;height:60px;border-radius:50%;border:2.5px solid var(--ink);background:var(--paper)" data-a="pop" data-d="${900 + k * 900}"></div>
        <div class="abs" style="left:${200 + k * 470 - 220}px;top:560px;width:440px;text-align:center;${F(60)}" data-a="up" data-d="${1050 + k * 900}">${w}</div>`).join('')}`
  });

  /* 3. Three rails on a map */
  D.slide({ id: 'three-rails', sec: SEC, t: '26:00', bg: 'paper',
    notes: `Now look at the rest of the world.
[click] In Brazil, for example, there's Pix, an instant payment system that's run by the central bank. And Stripe says it's used in more than 40 percent of online transactions there.
[click] In Nigeria, people pay by instant bank transfer, by USSD, and by card.
These are mostly push payments. The customer's own bank sends the money, after the customer approves it.
[click] And then in Mexico, with OXXO, the customer gets a voucher, walks into a convenience store and pays in cash, sometimes days later.
So we have all kinds of payment methods, depending on the environment the user is in.`,
    html: `
      <svg class="abs" id="rails-map" width="1120" height="1000" style="left:800px;top:40px"></svg>
      <div class="abs" data-k="br" style="width:520px" data-a="right" data-s="1">
        <div style="${F(84)}">Pix</div><div class="mono" style="margin-top:8px">Brazil · 40%+ of online transactions</div></div>
      <div class="abs" data-k="ng" style="width:520px" data-a="right" data-s="2">
        <div style="${F(84)};white-space:nowrap" class="red">Bank transfer</div><div class="mono" style="margin-top:8px">Nigeria · and USSD</div></div>
      <div class="abs" data-k="mx" style="width:520px" data-a="right" data-s="3">
        <div style="${F(84)}">OXXO</div><div class="mono" style="margin-top:8px">Mexico · cash, days later</div></div>`,
    init(el) {
      const svg = el.querySelector('#rails-map');
      const m = D.map(svg, { extent: [[-118, -36], [16, 34]], pad: 60, land: '#FFFFFF', stroke: 'rgba(20,20,22,.18)', sw: 1.2 });
      el._m = m; if (!m) return;
      const pos = { br: [140, 200], ng: [140, 460], mx: [140, 720] };
      el.querySelectorAll('[data-k]').forEach(n => { n.style.left = pos[n.dataset.k][0] + 'px'; n.style.top = pos[n.dataset.k][1] + 'px'; });
    },
    on(step, el) {
      const m = el._m; if (!m) return;
      m.fill(D.ISO.brazil, step >= 1 ? 'var(--ink)' : '#FFFFFF');
      m.fill(D.ISO.nigeria, step >= 2 ? 'var(--tomato)' : '#FFFFFF');
      m.fill(D.ISO.mexico, step >= 3 ? 'var(--ink)' : '#FFFFFF');
    }
  });

  /* 5. The payment state machine grows */
  D.slide({ id: 'state-machine', sec: SEC, t: '27:10', bg: 'paper',
    notes: `And here's why that matters for your architecture. With a card, your server makes one call and gets an answer.
[click] With a push payment, the customer leaves your app to go and approve it, and they might never come back. So your payment needs a state like "waiting for the customer".
[click] And you find out the result later, from a webhook, which is the provider calling your server back.
[click] With a cash voucher, the order can sit as pending for days, so it needs an expiry, or you'll hold stock for someone who's never coming.
[click] And an instant transfer usually can't be pulled back like a card payment, so a refund is a brand new payment going the other way.`,
    html: `
      <style>
        #s-state-machine .st{position:absolute;height:100px;border:2.5px solid var(--ink);background:var(--card);display:flex;align-items:center;justify-content:center;font-family:GeistMono;font-weight:500;font-size:34px}
        #s-state-machine .new{border-color:var(--cobalt);background:#E6EBFF;color:var(--cobalt)}
      </style>
      <div class="abs head" style="left:140px;top:110px;font-size:72px" data-a="rise" data-out="1">Card: one call, one answer.</div>
      <div class="abs head" style="left:140px;top:110px;font-size:72px" data-a="rise" data-s="1">Push: the customer might never come back.</div>
      <div class="st" style="left:140px;top:500px;width:300px" data-a="pop" data-d="200">CREATED</div>
      <div class="st" style="left:1460px;top:320px;width:320px" data-a="pop" data-d="500">PAID</div>
      <div class="st" style="left:1460px;top:680px;width:320px" data-a="pop" data-d="600">FAILED</div>
      <svg class="abs" width="1920" height="1080" style="left:0;top:0;pointer-events:none" fill="none" stroke-width="2.5">
        <g stroke="var(--ink)" data-dim="1">
          <path d="M440 535 C900 535 1000 370 1450 370" data-a="draw" data-d="400"/>
          <path d="M440 565 C900 565 1000 730 1450 730" data-a="draw" data-d="500"/></g>
        <g stroke="var(--cobalt)">
          <path d="M440 550 H600" data-a="draw" data-s="1" data-d="300"/>
          <path d="M1120 525 C1260 525 1300 370 1450 370" data-a="draw" data-s="1" data-d="500"/>
          <path d="M1120 575 C1260 575 1300 730 1450 730" data-a="draw" data-s="1" data-d="600"/>
          <path d="M860 600 V800" data-a="draw" data-s="3" data-d="300"/></g>
        <g stroke="var(--tomato)" stroke-dasharray="10 10"><path d="M1020 300 C1200 300 1260 330 1290 440" data-a="draw" data-s="2" data-d="300"/></g>
        <path d="M1460 395 C1400 480 1400 980 760 950" stroke="var(--tomato)" data-a="draw" data-s="4" data-d="300" data-dur="1100"/>
      </svg>
      <div class="st new" style="left:600px;top:500px;width:520px" data-a="drop" data-s="1">AWAITING_CUSTOMER</div>
      <div class="st" style="left:760px;top:250px;width:260px;border-color:var(--tomato);color:var(--tomato);border-style:dashed" data-a="pop" data-s="2">webhook</div>
      <div class="st new" style="left:600px;top:800px;width:520px" data-a="drop" data-s="3">EXPIRED</div>
      <div class="abs" style="left:140px;top:910px;${F(52, 500)}" data-a="up" data-s="4" data-d="900">Refund: <span class="red">a new payment</span></div>`
  });

  /* 7. Estonian ID code decoded */
  D.slide({ id: 'estonia-id', sec: SEC, t: '28:20', bg: 'paper',
    notes: `Now identity, and environment does a lot here as well.
In Estonia, every resident has an 11-digit personal ID code. And the code isn't random at all. There's a whole logic behind how it is generated.
And inside the code is the date of birth, so it's personal data in a way.
(The code on screen is the standard public example code, not a real person's.)`,
    html: `
      <div class="abs" style="left:140px;top:220px;${F(220, 500)};letter-spacing:.01em;font-variant-numeric:tabular-nums;display:flex;gap:90px" data-a="blur">
        <span id="p1">3</span><span id="p2" class="blue">760503</span><span id="p3">029</span><span id="p4">9</span></div>
      <div class="abs" style="left:0;top:0">
        ${['Gender and century', 'Date of birth · 1976-05-03', 'Serial number', 'Checksum'].map((p, k) => `
          <div class="abs lab" data-k="${k}" style="left:0;top:520px" data-a="up" data-d="${700 + k * 250}">
            <div class="bar" style="height:4px;background:${k === 1 ? 'var(--cobalt)' : 'var(--ink)'}"></div>
            <div class="mono" style="color:${k === 1 ? 'var(--cobalt)' : 'var(--ink)'};margin-top:20px;line-height:1.25">${p}</div></div>`).join('')}
      </div>
      <div class="abs" style="left:140px;top:790px;width:1640px;${F(76)}" data-a="rise" data-d="2000">A date of birth inside it makes it <span class="blue">personal data.</span></div>`,
    on(step, el) {
      // each label sits under its digits and is never wider than its digits plus the gap, so labels can't overlap
      const box = el.querySelector('#p1').parentNode;
      el.querySelectorAll('.lab').forEach(l => {
        const p = el.querySelector('#p' + (+l.dataset.k + 1));
        l.style.left = (box.offsetLeft + p.offsetLeft) + 'px';
        l.querySelector('.bar').style.width = p.offsetWidth + 'px';
        l.style.width = (p.offsetWidth + 70) + 'px';
      });
    }
  });

  /* 8. Smart-ID */
  D.slide({ id: 'smart-id', sec: SEC, t: '29:00', bg: 'paper',
    notes: `What actually proves identity in Estonia is the state's digital identity. There's the ID card, Mobile-ID and Smart-ID.
With Smart-ID, the website shows you a short code, your phone shows the same code, and you confirm with a PIN.
So a bank or a startup gets a strong answer to "who is this?", without building identity checks themselves.`,
    html: `
      <div class="abs" style="left:140px;top:110px;display:flex;gap:56px;${F(64)}">
        ${['ID card', 'Mobile-ID', 'Smart-ID'].map((w, k) => `<span class="${k === 2 ? 'blue' : 'muted'}" data-a="up" data-d="${k * 140}">${w}</span>`).join('')}</div>
      <div class="abs" style="left:140px;top:300px;width:820px;height:440px;border:2.5px solid var(--ink);background:var(--card)" data-a="up" data-d="1000">
        <div style="height:46px;border-bottom:2px solid var(--line);display:flex;align-items:center;gap:10px;padding:0 18px">${'<i style="width:12px;height:12px;border-radius:50%;border:2px solid var(--ink);display:inline-block"></i>'.repeat(3)}</div>
        <div class="blue" style="${F(200, 500)};margin:90px 60px 0;letter-spacing:.02em">4821</div></div>
      <div class="abs" style="left:1360px;top:240px;width:340px;height:640px;border:2.5px solid var(--ink);border-radius:44px;background:var(--card);padding:70px 40px" data-a="left" data-d="2600">
        <div class="blue" style="${F(96, 500)};letter-spacing:.02em">4821</div>
        <div class="code" style="font-size:56px;margin-top:80px;letter-spacing:.15em"><span data-a="type" data-cps="6" data-d="4200">●●●●●</span></div></div>
      <svg class="abs" width="400" height="80" style="left:960px;top:480px" fill="none" stroke="var(--cobalt)" stroke-width="3" stroke-dasharray="12 10"><path d="M10 40 H390" data-a="draw" data-d="3000"/></svg>
`
  });

  /* 9. Nigeria: the phone number is the identity */
  D.slide({ id: 'nigeria-phone', sec: SEC, t: '29:30', bg: 'paper',
    notes: `Now, in Nigeria, for most consumer products, the identity is the phone number.
You sign up with your number, you get a code by SMS, and that's your account.
For financial services, you add the BVN, the Bank Verification Number, which is also 11 digits.`,
    html: `
      <div class="abs head" style="left:140px;top:130px;width:1640px;font-size:84px" data-a="rise">In Nigeria, the identity is <span class="red">the phone number.</span></div>
      <div class="abs code" style="left:140px;top:380px;font-size:76px" data-a="type" data-cps="14" data-d="500">+234 80• ••• ••••</div>
      <div class="abs" style="left:1140px;top:360px;width:560px;border:2.5px solid var(--ink);background:var(--card);padding:26px 34px" data-a="pop" data-d="2200">
        <div class="mono">SMS</div><div style="${F(64, 500)};margin-top:8px;letter-spacing:.02em">482 913</div></div>
      <div class="abs" style="left:140px;top:650px;display:flex;gap:16px">${Array.from({ length: 11 }, (_, k) => `<div style="width:118px;height:150px;border:2.5px solid var(--ink);display:flex;align-items:center;justify-content:center;${F(80, 500)}" data-a="pop" data-d="${3300 + k * 70}">•</div>`).join('')}</div>
      <div class="abs" style="left:140px;top:850px;${F(64)}" data-a="up" data-d="4300">BVN: <span class="blue">11 digits</span></div>`
  });

  /* 10. Two threats */
  D.slide({ id: 'sim-threats', sec: SEC, t: '30:00', bg: 'ink',
    notes: `And when the phone number is the identity, two threats become really important.
[click] The first one is a SIM swap. An attacker gets the victim's number moved to a new SIM card, and now every SMS code goes to the attacker.
[click] The second one is number recycling. Mobile networks give old, inactive numbers to new people, so the new owner can start receiving your user's codes.`,
    html: `
      <style>
        #s-sim-threats .ph{position:absolute;width:220px;height:370px;border:2.5px solid #F2F0EB;border-radius:34px;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;padding-bottom:24px;font-family:GeistMono;font-size:24px;color:#F2F0EB}
        #s-sim-threats .sim{position:absolute;width:84px;height:104px;background:var(--lime);clip-path:polygon(0 0,70% 0,100% 25%,100% 100%,0 100%);transition:transform 1.1s var(--ease)}
        #s-sim-threats .sms{position:absolute;border:2px solid #F2F0EB;color:#F2F0EB;font-family:GeistMono;font-weight:500;font-size:32px;padding:10px 16px;transition:transform 1s var(--ease), opacity .4s}
      </style>
      <div class="abs head" style="left:140px;top:100px;font-size:72px;color:#F2F0EB" data-a="rise">When the phone number is the identity…</div>
      <div class="abs red" style="left:140px;top:250px;${F(72)}" data-a="right" data-s="1">SIM swap</div>
      <div class="ph" style="left:140px;top:400px" data-a="fade" data-s="1">victim</div>
      <div class="ph" style="left:580px;top:400px;border-color:var(--tomato);color:var(--tomato)" data-a="fade" data-s="1" data-d="200">attacker</div>
      <div class="sim" id="sim1" style="left:208px;top:480px" data-a="pop" data-s="1" data-d="300"></div>
      <div class="sms" id="sms1" style="left:140px;top:830px" data-a="fade" data-s="1" data-d="1800">code 482 913 →</div>
      <div class="abs red" style="left:1040px;top:250px;${F(72)}" data-a="right" data-s="2">Number recycling</div>
      <div class="ph" style="left:1040px;top:400px;border-color:#55545A;color:#77736B" data-a="fade" data-s="2">old owner</div>
      <div class="ph" style="left:1480px;top:400px;border-color:var(--tomato);color:var(--tomato)" data-a="fade" data-s="2" data-d="200">new owner</div>
      <div class="abs code" id="num2" style="left:1056px;top:500px;font-size:34px;color:var(--lime);transition:transform 1.1s var(--ease)" data-a="pop" data-s="2" data-d="300">+234 80•</div>
      <div class="sms" id="sms2" style="left:1040px;top:830px" data-a="fade" data-s="2" data-d="1800">your user's code →</div>`,
    on(step, el, D, animate) {
      const mv = (id, on, x, d) => { const n = el.querySelector(id); n.style.transition = animate ? '' : 'none'; n.style.transitionDelay = animate ? d + 'ms' : '0ms'; n.style.transform = on ? `translateX(${x}px)` : 'none'; };
      mv('#sim1', step >= 1, 440, 900); mv('#sms1', step >= 1, 440, 2300);
      mv('#num2', step >= 2, 440, 900); mv('#sms2', step >= 2, 440, 2300);
    }
  });

  /* 10b. Short version: a question to think about instead of the defences */
  D.slide({ id: 'identity-question', only: 'short', sec: SEC, t: '30:30', bg: 'paper',
    notes: `So here's something to think about. If you were taking a product built in Estonia to Nigeria, where the phone number is the identity, what would you change?
You don't have to answer that now. [pause]
Let's move on.`,
    html: `
      <div class="abs head" style="left:140px;top:250px;width:1640px;font-size:120px;line-height:1.02;letter-spacing:-.05em" data-a="rise">Your app was built in Estonia. Now it launches in Nigeria.</div>
      <div class="abs head blue" style="left:140px;top:640px;width:1640px;font-size:90px" data-a="up" data-d="1400">What would you change?</div>`
  });

  /* 11. Defences */
  D.slide({ id: 'sim-defences', sec: SEC, t: '30:30', bg: 'paper',
    notes: `So the defences have to be in the architecture.
[click] You tie each account to the user's own phone, so a new phone has to prove itself first.
[click] You ask for stronger proof before risky actions, like changing where payouts go.
[click] And you slow things down after a SIM change.`,
    html: `
      <div class="abs head" style="left:140px;top:120px;font-size:84px" data-a="rise">The defences live in the architecture.</div>
      ${['Tie each account to the user’s own phone.', 'Stronger proof before risky actions.', 'Slow down after a SIM change.'].map((d, k) => `
        <div class="abs" style="left:140px;right:140px;top:${340 + k * 190}px;border-top:2px solid var(--ink);padding-top:28px" data-a="up" data-s="${k + 1}">
          <span style="${F(64)}">${d}</span></div>`).join('')}
      <div class="abs" style="left:140px;top:960px;width:1640px;height:6px;background:var(--line)" data-a="fade" data-s="3" data-d="300"></div>
      <div class="abs" style="left:140px;top:960px;width:1640px;height:6px;background:var(--tomato);transform-origin:left;transform:scaleX(0)" id="cool"></div>`,
    on(step, el, D, animate) {
      const c = el.querySelector('#cool');
      c.style.transition = animate && step === 3 ? 'transform 4s linear .6s' : 'none';
      c.style.transform = step >= 3 ? 'scaleX(1)' : 'scaleX(0)';
    }
  });

  /* 12. Pluggable identity: the interface */
  D.slide({ id: 'identity-provider', sec: SEC, t: '30:45', bg: 'ink',
    notes: `So the architectural answer is to make identity pluggable. Your core system talks to one interface, and that interface answers two questions.
[click] Who is this, [click] and how sure are we?
The levels low, substantial and high come from eIDAS, which is the EU regulation on electronic identity.
So the rest of your system never asks "did they use Smart-ID?". It asks "is the assurance high enough for this action?". And then adding a new country's identity method doesn't touch your payment code at all.`,
    html: `
      <div class="term" style="left:140px;top:140px;width:1220px;height:560px" data-a="up">
        <div class="bar"><i></i><i></i><i></i><span style="margin-left:14px">identity/provider.ts</span></div>
        <pre class="code" style="font-size:38px;padding:34px 30px"><div data-a="type" data-cps="70" data-d="400">${code([
          `<span class="k">interface</span> <span class="f">IdentityProvider</span> {`,
          `  <span class="f">verify</span>(request): <span class="f">Promise</span>&lt;{`,
          `    subjectId: <span class="k">string</span>;`,
          `    method: <span class="s">'smart-id'</span> | <span class="s">'sms-otp'</span> | …;`,
          `    assurance: <span class="s">'low'</span> | <span class="s">'substantial'</span> | <span class="s">'high'</span>;`,
          `  }&gt;;`,
          `}`])}</div></pre></div>
      <div class="abs lime" style="left:1430px;top:300px;width:420px;${F(64)}" data-a="left" data-s="1">Who is this?</div>
      <div class="abs lime" style="left:1430px;top:470px;width:420px;${F(64)}" data-a="left" data-s="2">How sure are we?</div>`,
    on(step, el) {
      el.querySelectorAll('.ln').forEach(l => l.classList.toggle('lineon', (step === 1 && +l.dataset.l === 3) || (step >= 2 && +l.dataset.l === 5)));
    }
  });

  /* 14. The cost of pluggable identity */
  D.slide({ id: 'identity-cost', sec: SEC, t: '31:10', bg: 'paper',
    notes: `But that flexibility has a cost too.
Every identity method brings its own sign-up flow, its own recovery flow and its own support questions.
So you want to add a method when a market really needs it, and not just because it exists.`,
    html: `
      <style>#s-identity-cost .c{height:66px;display:flex;align-items:center;padding:0 18px;font-family:GeistMono;font-size:24px;border:2px solid var(--ink);color:var(--ink);background:var(--card)}
        html[data-theme=stage] #s-identity-cost .c{border-color:var(--fg);color:var(--fg)}</style>
      <div class="abs head" style="left:140px;top:120px;font-size:84px" data-a="rise">Flexibility has a cost.</div>
      <div class="abs" style="left:140px;top:300px;display:grid;grid-template-columns:repeat(4, 360px);gap:16px 50px" id="ic-grid">
        ${['Smart-ID', 'Mobile-ID', 'SMS code', 'BVN'].map((m, k) => `<div style="${F(56)}" data-a="up" data-d="${400 + k * 900}">${m}</div>`).join('')}
        ${['sign-up flow', 'recovery flow', 'support questions'].map((f, r) => ['', '', '', ''].map((_, k) =>
          `<div class="c" data-a="pop" data-d="${400 + k * 900 + 250 + r * 150}">${f}</div>`).join('')).join('')}
      </div>
`,
    init(el) {
      const g = el.querySelector('#ic-grid');
      const kids = [...g.children]; const names = kids.slice(0, 4), cells = kids.slice(4);
      g.innerHTML = ''; names.forEach(n => g.appendChild(n));
      for (let r = 0; r < 3; r++) for (let k = 0; k < 4; k++) g.appendChild(cells[r * 4 + k]);
    }
  });

})();
