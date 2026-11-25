/* CASE 3: MONEY AND IDENTITY 25:00–31:30 */
(function () {
  const D = window.D;
  const SEC = 'Case 3 · Money and identity';
  const code = (lines) => lines.map((l, i) => `<span class="ln" data-l="${i + 1}" style="display:block;min-height:1.45em;padding-left:14px">${l || ' '}</span>`).join('');

  /* 1. Case title: two rows */
  D.slide({ id: 'case3-title', sec: SEC, t: '25:00', bg: 'tomato',
    notes: `The next case is money and identity. How people pay, and how people prove who they are.
Two of our rows fall into this case, so I'm going to do money rails and identity rails together.`,
    html: `
      ${D.regs()}
      <div class="abs mono" style="left:120px;top:110px" data-a="fade">Case 3 · rows 03 and 04</div>
      <div class="abs" style="left:110px;top:180px;width:1700px">
        <div class="huge" style="font-size:210px">${D.words('Money rails', { gap: 100 })}</div>
        <div class="head" style="font-size:60px;margin-top:20px" data-a="up" data-d="400">How fast and how reversible is settlement?</div></div>
      <div class="abs rule" style="left:120px;right:120px;top:560px;background:var(--ink)" data-a="wipe" data-d="600"></div>
      <div class="abs" style="left:110px;top:600px;width:1700px">
        <div class="huge" style="font-size:210px;color:var(--paper)">${D.words('Identity rails', { d: 700, gap: 100 })}</div>
        <div class="head" style="font-size:60px;margin-top:20px" data-a="up" data-d="1100">What do users already trust to prove who they are?</div></div>`
  });

  /* 2. A card payment is a pull */
  D.slide({ id: 'card-pull', sec: SEC, t: '25:20', bg: 'paper',
    notes: `So, most payment code in Europe and North America was written with cards in mind. And we all know how a card payment works.
[click] The bank authorises the payment, which means it checks the money is there and holds it.
[click] The merchant captures it.
[click] The money settles between the banks later.
[click] And of course, the customer can dispute it with a chargeback.
[click] So a card payment is what we call a pull. The merchant uses your card details to pull money from you.`,
    html: `
      <div class="abs head" style="left:110px;top:90px;font-size:76px;width:1700px" data-a="rise">Most payment code was written with cards in mind.</div>
      ${[['Authorise', 'The bank checks the money is there and holds it.'], ['Capture', 'The merchant takes it.'], ['Settle', 'The money moves between the banks later.'], ['Dispute', 'The customer can get it back with a chargeback.']].map((c, k) => `
        <div class="abs" style="left:${110 + k * 430}px;top:300px;width:390px" data-a="up" data-s="${k + 1}" data-dim="5">
          <div class="num" style="font-size:30px;color:var(--cobalt)">0${k + 1}</div>
          <div style="height:12px;background:var(--cobalt);margin-top:14px"></div>
          <div class="huge" style="font-size:96px;margin-top:22px">${c[0]}</div>
          <div class="body" style="font-size:36px;margin-top:16px">${c[1]}</div></div>`).join('')}
      <div class="abs" style="left:0;right:0;top:720px;bottom:0;background:var(--ink)" data-a="wipeup" data-s="5"></div>
      <div class="abs huge" style="left:110px;top:760px;font-size:220px;color:var(--lime)" data-a="rise" data-s="5" data-d="200">Pull</div>
      <svg class="abs" width="600" height="100" style="left:560px;top:830px" fill="none" stroke="var(--paper)" stroke-width="6"><path d="M580 50 H20 M60 20 L18 50 L60 80" data-a="draw" data-s="5" data-d="500"/></svg>
      <div class="abs body" style="left:1200px;top:800px;width:620px;color:var(--paper)" data-a="left" data-s="5" data-d="700">The merchant uses your card details to pull the money from you.</div>`
  });

  /* 3. Three rails on a map */
  D.slide({ id: 'three-rails', sec: SEC, t: '26:00', bg: 'paper',
    notes: `Now look at the rest of the world.
[click] In Brazil, for example, there's Pix, an instant payment system that's run by the central bank. And Stripe puts it at more than 40 percent of online payments there.
[fact note: Stripe's exact wording is "used in more than 40% of online transactions" in Brazil, stripe.com/payment-method/pix]
[click] In Nigeria, people pay by instant bank transfer, by USSD, and by card.
[click] And then in Mexico, with OXXO, the customer gets a voucher, walks into a convenience store and pays in cash, sometimes days later.
So we have all kinds of payment methods, depending on the environment the user is in.`,
    html: `
      <svg class="abs" id="rails-map" width="1260" height="1000" style="left:660px;top:40px"></svg>
      <div class="abs huge" style="left:110px;top:80px;font-size:120px" data-a="rise">Rest of the world</div>
      <div class="abs" data-k="br" style="width:600px" data-a="right" data-s="1">
        <div class="huge" style="font-size:96px">Pix</div><div class="mono" style="color:var(--cobalt);font-size:26px">Brazil · instant · run by the central bank</div>
        <div class="body" style="font-size:36px;margin-top:10px">Stripe: used in more than <b>40%</b> of online transactions.</div></div>
      <div class="abs" data-k="ng" style="width:600px" data-a="right" data-s="2">
        <div class="huge red" style="font-size:96px">Push</div><div class="mono red">Nigeria</div>
        <div class="body" style="font-size:36px;margin-top:10px">Instant bank transfer, USSD, and card.</div></div>
      <div class="abs" data-k="mx" style="width:600px" data-a="right" data-s="3">
        <div class="huge" style="font-size:96px">OXXO</div><div class="mono">Mexico · cash</div>
        <div class="body" style="font-size:36px;margin-top:10px">A voucher, paid in a convenience store, sometimes days later.</div></div>
      ${D.credit('Pix share: Stripe, stripe.com/payment-method/pix')}`,
    init(el) {
      const svg = el.querySelector('#rails-map');
      const m = D.map(svg, { extent: [[-118, -36], [16, 34]], pad: 60, land: 'var(--card)', stroke: 'rgba(18,18,18,.2)', sw: 1.2 });
      el._m = m; if (!m) return;
      const pos = { br: [110, 250], ng: [110, 530], mx: [110, 800] };
      el.querySelectorAll('[data-k]').forEach(n => { n.style.left = pos[n.dataset.k][0] + 'px'; n.style.top = pos[n.dataset.k][1] + 'px'; });
    },
    on(step, el) {
      const m = el._m; if (!m) return;
      m.fill(D.ISO.brazil, step >= 1 ? 'var(--ink)' : 'var(--card)');
      m.fill(D.ISO.nigeria, step >= 2 ? 'var(--tomato)' : 'var(--card)');
      m.fill(D.ISO.mexico, step >= 3 ? 'var(--ink)' : 'var(--card)');
    }
  });

  /* 4. Push vs pull */
  D.slide({ id: 'push-pull', sec: SEC, t: '26:50', bg: 'ink',
    notes: `(Card recap on screen: the merchant pulls.)
[click] These are mostly push payments. The customer's own bank sends the money, after the customer approves it.
(In the script this line follows "In Nigeria, people pay by instant bank transfer, by USSD, and by card." This slide gives it its own picture.)`,
    html: `
      <style>#s-push-pull .bx{position:absolute;width:420px;height:150px;border:5px solid var(--paper);display:flex;align-items:center;justify-content:center;font-family:'Anton';text-transform:uppercase;font-size:56px;color:var(--paper)}</style>
      <div class="abs huge" style="left:110px;top:100px;font-size:170px;color:var(--paper)" data-a="rise">Pull</div>
      <div class="abs mono" style="left:120px;top:290px;color:var(--sub)" data-a="fade" data-d="200">Card</div>
      <div class="bx" style="left:110px;top:360px" data-a="right" data-d="200">Customer</div>
      <div class="bx" style="left:1390px;top:360px;background:var(--paper);color:var(--ink)" data-a="left" data-d="300">Merchant</div>
      <svg class="abs" width="860" height="80" style="left:530px;top:395px" fill="none" stroke="var(--paper)" stroke-width="6"><path d="M840 40 H20 M60 10 L18 40 L60 70" data-a="draw" data-d="600" transform="scale(-1,1) translate(-860,0)"/></svg>
      <div class="abs mono" style="left:700px;top:330px;color:var(--paper)" data-a="fade" data-d="800">merchant pulls with your card details</div>

      <div class="abs huge lime" style="left:110px;top:560px;font-size:170px" data-a="rise" data-s="1">Push</div>
      <div class="abs mono" style="left:120px;top:750px;color:var(--sub)" data-a="fade" data-s="1">Bank transfer · USSD · Pix</div>
      <div class="bx" style="left:110px;top:820px;border-color:var(--lime);color:var(--lime)" data-a="right" data-s="1" data-d="200">Customer's bank</div>
      <div class="bx" style="left:1390px;top:820px" data-a="left" data-s="1" data-d="300">Merchant</div>
      <svg class="abs" width="860" height="80" style="left:530px;top:855px" fill="none" stroke="var(--lime)" stroke-width="6"><path d="M20 40 H840 M800 10 L842 40 L800 70" data-a="draw" data-s="1" data-d="900"/></svg>
      <div class="abs mono lime" style="left:700px;top:790px" data-a="fade" data-s="1" data-d="500">after the customer approves it</div>`
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
        #s-state-machine .st{position:absolute;height:112px;border:5px solid var(--ink);background:var(--card);display:flex;align-items:center;justify-content:center;font-family:'JB';font-weight:800;font-size:40px}
        #s-state-machine .new{border-color:var(--cobalt);background:var(--cobalt);color:var(--paper)}
      </style>
      <div class="abs head" style="left:110px;top:70px;font-size:64px" data-a="rise" data-out="1">Card: one call, one answer.</div>
      <div class="abs head" style="left:110px;top:70px;font-size:64px" data-a="rise" data-s="1">Push: the customer might never come back.</div>
      <div class="st" style="left:110px;top:470px;width:330px" data-a="pop" data-d="200">CREATED</div>
      <div class="st" style="left:1440px;top:290px;width:370px;border-color:var(--ink);background:var(--ink);color:var(--lime)" data-a="pop" data-d="500">PAID</div>
      <div class="st" style="left:1440px;top:650px;width:370px" data-a="pop" data-d="600">FAILED</div>
      <!-- direct edges (card) -->
      <svg class="abs" width="1920" height="1080" style="left:0;top:0;pointer-events:none" fill="none" stroke-width="5">
        <g stroke="var(--ink)" data-dim="1">
          <path d="M440 510 C900 510 1000 346 1430 346" data-a="draw" data-d="400"/>
          <path d="M440 540 C900 540 1000 706 1430 706" data-a="draw" data-d="500"/></g>
        <g stroke="var(--cobalt)">
          <path d="M440 526 H600" data-a="draw" data-s="1" data-d="300"/>
          <path d="M1120 500 C1260 500 1300 346 1430 346" data-a="draw" data-s="1" data-d="500"/>
          <path d="M1120 550 C1260 550 1300 706 1430 706" data-a="draw" data-s="1" data-d="600"/>
          <path d="M860 582 V780" data-a="draw" data-s="3" data-d="300"/></g>
        <g stroke="var(--tomato)" stroke-dasharray="14 12"><path d="M1060 250 C1180 250 1240 300 1260 420" data-a="draw" data-s="2" data-d="300"/></g>
      </svg>
      <div class="st new" style="left:600px;top:470px;width:520px" data-a="drop" data-s="1">AWAITING_CUSTOMER</div>
      <div class="abs mono blue" style="left:600px;top:410px" data-a="fade" data-s="1" data-d="300">customer leaves to approve</div>
      <div class="abs" style="left:700px;top:190px;width:360px;background:var(--tomato);padding:14px 20px" data-a="pop" data-s="2">
        <div class="code" style="font-variant-ligatures:none;font-size:36px;font-weight:800">webhook</div><div class="body" style="font-size:30px">the provider calls you back, later</div></div>
      <div class="st new" style="left:600px;top:780px;width:520px" data-a="drop" data-s="3">EXPIRED</div>
      <div class="abs mono blue" style="left:600px;top:910px;width:560px;font-size:26px" data-a="fade" data-s="3" data-d="300">cash voucher pending for days</div>
      <div class="abs" style="left:1260px;top:840px;width:560px;background:var(--lime);padding:18px 24px" data-a="wipe" data-s="4">
        <div class="mono" style="font-size:26px">Refund</div><div class="body" style="font-size:36px">A brand new payment going the other way.</div></div>`
  });

  /* 6. A new design */
  D.slide({ id: 'new-design', sec: SEC, t: '28:00', bg: 'lime',
    notes: `So basically, if your system thinks a payment is one call that returns success or failure, adding these rails isn't a new integration.
[click] It's a new design.`,
    html: `
      <div class="abs head" style="left:110px;top:140px;width:1600px;font-size:76px" data-a="up">If your system thinks a payment is one call that returns success or failure,</div>
      <div class="abs huge" style="left:110px;top:430px;font-size:190px;color:rgba(18,18,18,.45)" data-a="right" data-d="300"><span class="strike" data-s="1">a new integration</span></div>
      <div class="abs huge" style="left:110px;top:680px;font-size:250px" data-a="rise" data-s="1" data-d="400">a new design.</div>`
  });

  /* 7. Estonian ID code decoded */
  D.slide({ id: 'estonia-id', sec: SEC, t: '28:20', bg: 'cobalt',
    notes: `Now identity, and environment does a lot here as well.
In Estonia, every resident has an 11-digit personal ID code.
[click] And the code isn't random at all. [click] There's a whole logic behind how it is generated. [click] [click]
[click] And because the code has a date of birth inside it, it's personal data in a way.
(The code on screen is the standard public example code, not a real person's.)`,
    html: `
      <div class="abs mono" style="left:120px;top:110px;color:var(--lime)" data-a="fade">Estonia · personal ID code · public example</div>
      <div class="abs huge" style="left:110px;top:220px;font-size:250px;color:var(--paper);letter-spacing:.04em;display:flex;gap:56px">
        <span id="p1">3</span><span id="p2">760503</span><span id="p3">029</span><span id="p4">9</span></div>
      <div class="abs" style="left:0;top:0">
        ${[['Gender + century', '3 = a man born in the 1900s', 110, 120], ['Date of birth', '1976-05-03', 360, 620], ['Serial number', 'born that day', 1065, 300], ['Checksum', 'catches typos', 1450, 340]].map((p, k) => `
          <div class="abs lab" data-k="${k}" style="left:${p[2]}px;top:540px;width:330px" data-a="up" data-s="${k + 1}">
            <div class="bar" style="height:10px;width:${p[3]}px;background:var(--lime)"></div>
            <div class="mono" style="color:var(--lime);margin-top:${k === 0 ? 170 : 20}px;font-size:28px">${p[0]}</div>
            <div class="body" style="color:var(--paper);margin-top:8px;font-size:38px">${p[1]}</div></div>`).join('')}
      </div>
      <div class="abs" style="left:110px;top:900px;width:1700px;background:var(--paper);color:var(--ink);padding:24px 36px" data-a="wipe" data-s="5">
        <span class="head" style="font-size:58px">A date of birth inside the ID means the ID is personal data.</span></div>`,
    on(step, el) {
      const box = el.querySelector('#p1').parentNode;
      el.querySelectorAll('.lab').forEach(l => { const p = el.querySelector('#p' + (+l.dataset.k + 1)); l.style.left = (box.offsetLeft + p.offsetLeft) + 'px'; l.querySelector('.bar').style.width = p.offsetWidth + 'px'; l.style.width = Math.max(p.offsetWidth, 320) + 'px'; });
      const ids = ['p1', 'p2', 'p3', 'p4'];
      ids.forEach((id, k) => { const n = el.querySelector('#' + id); n.style.transition = 'color .5s'; n.style.color = step === k + 1 ? 'var(--lime)' : (step >= 1 && step <= 4 ? 'rgba(239,232,218,.35)' : 'var(--paper)'); });
    }
  });

  /* 8. Smart-ID */
  D.slide({ id: 'smart-id', sec: SEC, t: '29:00', bg: 'paper',
    notes: `What actually proves identity in Estonia is the state's digital identity. There's the ID card, Mobile-ID and Smart-ID.
[click] With Smart-ID, the website shows you a short code, [click] your phone shows the same code, [click] and you confirm with a PIN.
[click] So a bank or a startup gets a strong answer to "who is this?", without building identity checks themselves.`,
    html: `
      <div class="abs" style="left:110px;top:90px;display:flex;gap:20px">
        ${['ID card', 'Mobile-ID', 'Smart-ID'].map((w, k) => `<span class="tile" style="font-size:80px;padding:4px 22px;background:${k === 2 ? 'var(--cobalt)' : 'var(--ink)'};color:var(--paper)" data-a="drop" data-d="${k * 140}">${w}</span>`).join('')}</div>
      <!-- generic website -->
      <div class="abs" style="left:110px;top:300px;width:860px;height:480px;border:5px solid var(--ink);background:var(--card)" data-a="up" data-s="1">
        <div style="height:54px;border-bottom:4px solid var(--ink);display:flex;align-items:center;padding:0 20px" class="mono"><span style="font-size:24px">a bank's website</span></div>
        <div class="mono" style="margin:50px 50px 0;font-size:28px">Check that your phone shows</div>
        <div class="huge" style="font-size:190px;margin:10px 50px;color:var(--cobalt)">4821</div></div>
      <!-- generic phone -->
      <div class="abs" style="left:1330px;top:250px;width:380px;height:720px;border:6px solid var(--ink);border-radius:46px;background:var(--ink);padding:26px" data-a="left" data-s="2">
        <div style="background:var(--card);height:100%;border-radius:26px;padding:40px 30px">
          <div class="mono" style="font-size:26px">Confirm login</div>
          <div class="huge" style="font-size:130px;color:var(--cobalt);margin-top:20px">4821</div>
          <div class="mono" style="font-size:26px;margin-top:40px">PIN</div>
          <div class="code" style="font-variant-ligatures:none;font-size:64px;margin-top:6px;letter-spacing:.2em"><span data-a="type" data-s="3" data-cps="6">●●●●●</span></div></div></div>
      <svg class="abs" width="380" height="80" style="left:960px;top:500px" fill="none" stroke="var(--cobalt)" stroke-width="6" stroke-dasharray="16 12"><path d="M10 40 H360" data-a="draw" data-s="2" data-d="400"/></svg>
      <div class="abs mono blue" style="left:1010px;top:450px" data-a="fade" data-s="2" data-d="600">same code</div>
      <div class="abs" style="left:110px;top:830px;width:1120px;background:var(--lime);padding:20px 30px" data-a="wipe" data-s="4">
        <span class="head" style="font-size:50px">A strong answer to “who is this?”, without building identity checks yourself.</span></div>`
  });

  /* 9. Nigeria: the phone number is the identity */
  D.slide({ id: 'nigeria-phone', sec: SEC, t: '29:30', bg: 'tomato',
    notes: `Now, in Nigeria, for most consumer products, the identity is the phone number.
[click] You sign up with your number, you get a code by SMS, and that's your account.
[click] For financial services, you add the BVN, the Bank Verification Number, which is also 11 digits.`,
    html: `
      <div class="abs mono" style="left:120px;top:110px" data-a="fade">Nigeria · most consumer products</div>
      <div class="abs head" style="left:110px;top:170px;width:1750px;font-size:96px" data-a="rise">The identity is the phone number.</div>
      <div class="abs code" style="font-variant-ligatures:none;left:120px;top:400px;font-size:80px;font-weight:800" data-a="type" data-cps="14" data-d="500">+234 80• ••• ••••</div>
      <div class="abs" style="left:1060px;top:390px;width:640px;background:var(--paper);padding:26px 34px;border:5px solid var(--ink)" data-a="pop" data-s="1">
        <div class="mono" style="font-size:26px">SMS</div><div class="body" style="margin-top:8px">Your code is <b>482 913</b></div></div>
      <div class="abs" style="left:110px;top:640px;width:1700px" data-a="up" data-s="2">
        <div class="mono">For financial services · BVN, Bank Verification Number</div>
        <div style="display:flex;gap:14px;margin-top:24px">${Array.from({ length: 11 }, (_, k) => `<div class="huge" style="width:136px;height:170px;background:var(--ink);color:var(--paper);display:flex;align-items:center;justify-content:center;font-size:110px" data-a="pop" data-s="2" data-d="${200 + k * 80}">•</div>`).join('')}</div>
        <div class="huge" style="font-size:80px;margin-top:20px" data-a="fade" data-s="2" data-d="1200">11 digits</div></div>`
  });

  /* 10. Two threats */
  D.slide({ id: 'sim-threats', sec: SEC, t: '30:00', bg: 'ink',
    notes: `And when the phone number is the identity, two threats become really important.
[click] The first one is a SIM swap. An attacker gets the victim's number moved to a new SIM card, and now every SMS code goes to the attacker.
[click] The second one is number recycling. Mobile networks give old, inactive numbers to new people, so the new owner can start receiving your user's codes.`,
    html: `
      <style>
        #s-sim-threats .ph{position:absolute;width:230px;height:380px;border:6px solid var(--paper);border-radius:34px;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;padding-bottom:24px;font-family:'DM Mono';font-size:26px;color:var(--paper)}
        #s-sim-threats .sim{position:absolute;width:90px;height:110px;background:var(--lime);clip-path:polygon(0 0,70% 0,100% 25%,100% 100%,0 100%);transition:transform 1.1s var(--ease)}
        #s-sim-threats .sms{position:absolute;background:var(--paper);color:var(--ink);font-family:'JB';font-weight:800;font-size:34px;padding:10px 16px;transition:transform 1s var(--ease), opacity .4s}
      </style>
      <div class="abs head" style="left:110px;top:80px;font-size:72px;color:var(--paper)" data-a="rise">When the phone number is the identity…</div>
      <!-- SIM swap -->
      <div class="abs huge" style="left:110px;top:220px;font-size:110px;color:var(--tomato)" data-a="right" data-s="1">SIM swap</div>
      <div class="ph" style="left:110px;top:400px" data-a="fade" data-s="1">victim</div>
      <div class="ph" style="left:560px;top:400px;border-color:var(--tomato);color:var(--tomato)" data-a="fade" data-s="1" data-d="200">attacker</div>
      <div class="sim" id="sim1" style="left:180px;top:480px" data-a="pop" data-s="1" data-d="300"></div>
      <div class="sms" id="sms1" style="left:120px;top:830px" data-a="fade" data-s="1" data-d="1800">code 482 913 →</div>
      <!-- recycling -->
      <div class="abs huge" style="left:1010px;top:220px;font-size:110px;color:var(--tomato)" data-a="right" data-s="2">Number recycling</div>
      <div class="ph" style="left:1010px;top:400px;border-color:rgba(239,232,218,.3);color:rgba(239,232,218,.4)" data-a="fade" data-s="2">old owner</div>
      <div class="ph" style="left:1460px;top:400px;border-color:var(--tomato);color:var(--tomato)" data-a="fade" data-s="2" data-d="200">new owner</div>
      <div class="abs code" id="num2" style="left:1020px;top:500px;font-size:36px;color:var(--lime);transition:transform 1.1s var(--ease)" data-a="pop" data-s="2" data-d="300">+234 80•</div>
      <div class="sms" id="sms2" style="left:1010px;top:830px" data-a="fade" data-s="2" data-d="1800">your user's code →</div>`,
    on(step, el, D, animate) {
      const mv = (id, on, x, d) => { const n = el.querySelector(id); n.style.transition = animate ? '' : 'none'; n.style.transitionDelay = animate ? d + 'ms' : '0ms'; n.style.transform = on ? `translateX(${x}px)` : 'none'; };
      mv('#sim1', step >= 1, 450, 900); mv('#sms1', step >= 1, 450, 2300);
      mv('#num2', step >= 2, 450, 900); mv('#sms2', step >= 2, 450, 2300);
    }
  });

  /* 11. Defences */
  D.slide({ id: 'sim-defences', sec: SEC, t: '30:30', bg: 'paper',
    notes: `So the defences have to be in the architecture.
[click] You bind accounts to devices.
[click] You ask for stronger proof before risky actions, like changing where payouts go.
[click] And you slow things down after a SIM change.`,
    html: `
      <div class="abs head" style="left:110px;top:100px;font-size:96px" data-a="rise">The defences live in the architecture.</div>
      ${['Bind accounts to devices.', 'Ask for stronger proof before risky actions, like changing where payouts go.', 'Slow things down after a SIM change.'].map((d, k) => `
        <div class="abs" style="left:110px;right:110px;top:${330 + k * 210}px;border-top:4px solid var(--ink);padding-top:26px;display:grid;grid-template-columns:140px 1fr;align-items:baseline" data-a="up" data-s="${k + 1}">
          <span class="num" style="font-size:40px;color:var(--tomato)">0${k + 1}</span><span class="head" style="font-size:64px">${d}</span></div>`).join('')}
      <div class="abs" style="left:250px;top:1000px;width:1560px;height:16px;border:3px solid var(--ink)" data-a="fade" data-s="3" data-d="300"></div>
      <div class="abs" style="left:253px;top:1003px;width:1554px;height:10px;background:var(--tomato);transform-origin:left;transition:transform 4s linear" id="cool"></div>`,
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
[click] The levels low, substantial and high come from eIDAS, which is the EU regulation on electronic identity.`,
    html: `
      <div class="term" style="left:110px;top:120px;width:1260px;height:620px;border-color:var(--paper)" data-a="up">
        <div class="bar"><i></i><i></i><i></i><span style="margin-left:14px">identity/provider.ts</span></div>
        <pre class="code" style="font-variant-ligatures:none;font-variant-ligatures:none;font-size:42px;padding:34px 30px"><div data-a="type" data-cps="70" data-d="400">${code([
          `<span class="k">interface</span> <span class="f">IdentityProvider</span> {`,
          `  <span class="f">verify</span>(request): <span class="f">Promise</span>&lt;{`,
          `    subjectId: <span class="k">string</span>;`,
          `    method: <span class="s">'smart-id'</span> | <span class="s">'sms-otp'</span> | …;`,
          `    assurance: <span class="s">'low'</span> | <span class="s">'substantial'</span> | <span class="s">'high'</span>;`,
          `  }&gt;;`,
          `}`])}</div></pre></div>
      <div class="abs huge" style="left:1420px;top:300px;width:460px;font-size:72px;color:var(--lime)" data-a="left" data-s="1">Who is this?</div>
      <div class="abs huge" style="left:1420px;top:470px;width:460px;font-size:72px;line-height:1;color:var(--lime)" data-a="left" data-s="2">How sure are we?</div>
      <div class="abs" style="left:110px;top:800px;display:flex;gap:20px;align-items:center" data-a="up" data-s="3">
        ${['low', 'substantial', 'high'].map((w, k) => `<span class="tile" style="font-size:72px;padding:4px 24px;background:${['#3a3a3a', '#5a6ad8', 'var(--cobalt)'][k]};color:var(--paper)">${w}</span>`).join('')}
        <span class="mono" style="color:var(--paper);margin-left:24px;font-size:28px">eIDAS · the EU regulation on electronic identity</span></div>`,
    on(step, el) {
      el.querySelectorAll('.ln').forEach(l => l.classList.toggle('lineon', (step === 1 && +l.dataset.l === 3) || (step >= 2 && +l.dataset.l === 5)));
    }
  });

  /* 13. The question the rest of the system asks */
  D.slide({ id: 'assurance-question', sec: SEC, t: '31:00', bg: 'lime',
    notes: `So the rest of your system never asks "did they use Smart-ID?".
[click] It asks "is the assurance high enough for this action?".
[click] And then adding a new country's identity method doesn't touch your payment code at all.`,
    html: `
      <div class="abs head" style="left:110px;top:150px;font-size:100px;color:rgba(18,18,18,.5)" data-a="right"><span class="strike" data-s="1">“Did they use Smart-ID?”</span></div>
      <div class="abs head" style="left:110px;top:360px;width:1700px;font-size:130px;line-height:.98" data-a="rise" data-s="1" data-d="300">“Is the assurance high enough for this action?”</div>
      <div class="abs code" style="font-variant-ligatures:none;left:110px;top:720px;font-size:40px;background:var(--ink);color:var(--paper);padding:22px 32px" data-a="wipe" data-s="2"><span class="k">if</span> (identity.assurance !== <span class="s">'high'</span>) <span class="f">askForStrongerProof</span>();</div>
      <div class="abs body" style="left:110px;top:900px;font-size:44px" data-a="up" data-s="2" data-d="400">A new country's identity method doesn't touch your payment code.</div>`
  });

  /* 14. The cost of pluggable identity */
  D.slide({ id: 'identity-cost', sec: SEC, t: '31:10', bg: 'paper',
    notes: `But that flexibility has a cost too.
[click] Every identity method brings its own sign-up flow, its own recovery flow and its own support questions.
[click] So you want to add a method when a market really needs it, and not just because it exists.`,
    html: `
      <style>#s-identity-cost .c{width:250px;height:76px;display:flex;align-items:center;padding:0 16px;font-family:'DM Mono';font-size:26px;border:3px solid var(--ink);color:var(--ink)} html[data-theme=stage] #s-identity-cost .c:nth-child(n){border-color:var(--fg)}</style>
      <div class="abs head" style="left:110px;top:90px;font-size:96px" data-a="rise">Flexibility has a cost.</div>
      <div class="abs" style="left:110px;top:270px;display:grid;grid-template-columns:repeat(4, 280px);gap:18px 30px">
        ${['Smart-ID', 'Mobile-ID', 'SMS code', 'BVN'].map((m, k) => `<div class="huge" style="font-size:64px;${k ? '' : ''}" data-a="drop" data-s="${k ? 1 : 0}" data-d="${k * 250}">${m}</div>`).join('')}
        ${['sign-up flow', 'recovery flow', 'support'].map((f, r) => ['', '', '', ''].map((_, k) =>
          `<div class="c" style="background:${r === 0 ? 'var(--card)' : r === 1 ? 'var(--lime)' : 'var(--tomato)'}" data-a="pop" data-s="${k ? 1 : 0}" data-d="${k * 250 + 120 + r * 90}">${f}</div>`).join('')).join('')}
      </div>
      <div class="abs" style="left:110px;top:780px;width:1700px;background:var(--ink);color:var(--paper);padding:30px 40px" data-a="wipe" data-s="2">
        <span class="head" style="font-size:56px">Add a method when a market really needs it, <span class="lime">not just because it exists.</span></span></div>`,
    init(el) {
      // reorder grid: names row, then each method's three cells under it
      const g = el.querySelector('[style*="grid-template-columns"]');
      const kids = [...g.children]; const names = kids.slice(0, 4), cells = kids.slice(4);
      g.innerHTML = ''; names.forEach(n => g.appendChild(n));
      for (let r = 0; r < 3; r++) for (let k = 0; k < 4; k++) g.appendChild(cells[r * 4 + k]);
    }
  });

  /* 15. Money + identity rows filled in */
  D.slide({ id: 'money-identity-filled', sec: SEC, t: '31:20', bg: 'paper',
    notes: `(Filled-in rows for money and identity. One breath: push payments need waiting states, webhooks, expiry and refunds as new payments; phone-number identity needs device binding, stronger proof and a slow-down after SIM changes; and identity sits behind one interface that answers who and how sure.)`,
    html: `
      ${D.profile({ rows: [2, 3], hot: [2, 3], top: 90 })}
      <div class="abs" style="left:120px;top:380px;width:800px">
        <div class="mono red" data-a="fade" data-s="1">Push payments, cash vouchers</div>
        ${['A state for waiting on the customer', 'Results from webhooks', 'An expiry on pending payments', 'Refunds as new payments'].map((d, k) => `
          <div style="border-top:3px solid var(--ink);padding:18px 0 14px;display:grid;grid-template-columns:80px 1fr;margin-top:${k ? 0 : 20}px" data-a="up" data-s="1" data-d="${200 + k * 140}">
            <span class="num" style="font-size:30px;color:var(--tomato)">0${k + 1}</span><span class="head" style="font-size:46px">${d}</span></div>`).join('')}</div>
      <div class="abs" style="left:1000px;top:380px;width:800px">
        <div class="mono blue" data-a="fade" data-s="2">Phone number or state ID</div>
        ${['One interface: who is this, how sure are we', 'Bind accounts to devices', 'Stronger proof before risky actions', 'Slow down after a SIM change'].map((d, k) => `
          <div style="border-top:3px solid var(--ink);padding:18px 0 14px;display:grid;grid-template-columns:80px 1fr;margin-top:${k ? 0 : 20}px" data-a="up" data-s="2" data-d="${200 + k * 140}">
            <span class="num" style="font-size:30px;color:var(--cobalt)">0${k + 1}</span><span class="head" style="font-size:46px">${d}</span></div>`).join('')}</div>`
  });
})();
