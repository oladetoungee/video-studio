/* FORGIVENESS 31:30–34:00 */
(function () {
  const D = window.D;
  const SEC = 'Forgiveness';

  /* 1. The question */
  D.slide({ id: 'forgiveness-q', sec: SEC, t: '31:30', bg: 'lime',
    notes: `What have users here learned to tolerate, and what are the things that cannot be undone?
Look at everything we've just seen through that question.`,
    html: `
      ${D.regs()}
      <div class="abs mono" style="left:120px;top:120px" data-a="fade">06 · Forgiveness</div>
      <div class="abs huge" style="left:110px;top:200px;font-size:300px" data-a="zoom">Forgiveness</div>
      <div class="abs head" style="left:120px;top:560px;width:1600px;font-size:84px;line-height:1.06">
        ${D.words('What have users here learned to tolerate,', { d: 400, gap: 50 })}<br>${D.words('and what can’t be', { d: 800, gap: 50 })} <span class="hl" data-s="0" data-d="1500" style="--hlc:var(--ink);color:var(--lime)">${D.words('undone?', { d: 1050 })}</span></div>`
  });

  /* 2. Reversible vs irreversible */
  D.slide({ id: 'undo', sec: SEC, t: '31:45', bg: 'paper',
    notes: `[click] A card payment is forgiving, because the customer can get their money back with a chargeback.
[click] An instant transfer in Nigeria, or a Pix payment in Brazil, mostly isn't. Once the money is gone, it's gone.
[click] And a SIM swap can't be undone either, because once an attacker has the codes, the account is theirs.`,
    html: `
      <style>
        #s-undo .col { position:absolute; top:150px; width:520px; height:800px; border-top:6px solid var(--ink); padding-top:30px; }
        #s-undo .verdict { position:absolute; left:0; bottom:0; font-family:Anton; text-transform:uppercase; font-size:92px; padding:8px 24px; }
      </style>
      <div class="col" style="left:120px" data-a="up" data-s="1">
        <div class="mono">Card payment</div>
        <div class="huge" style="font-size:150px;margin-top:20px">€40</div>
        <svg width="460" height="160" style="margin-top:20px" fill="none" stroke="var(--ink)" stroke-width="6">
          <path d="M10 50 H420 M390 25 L425 50 L390 75" data-a="draw" data-s="1" data-d="300"/>
          <path d="M450 120 H40 M70 95 L35 120 L70 145" stroke="var(--cobalt)" data-a="draw" data-s="1" data-d="900"/></svg>
        <div class="body" style="font-size:36px;margin-top:10px">Chargeback brings it back.</div>
        <div class="verdict" style="background:var(--cobalt);color:var(--paper)" data-a="pop" data-s="1" data-d="1300">Undo ✓</div>
      </div>
      <div class="col" style="left:700px" data-a="up" data-s="2">
        <div class="mono">Instant transfer · Pix</div>
        <div class="huge" style="font-size:150px;margin-top:20px">₦50,000</div>
        <svg width="460" height="160" style="margin-top:20px" fill="none" stroke="var(--ink)" stroke-width="6">
          <path d="M10 50 H420 M390 25 L425 50 L390 75" data-a="draw" data-s="2" data-d="300"/>
          <path d="M450 120 H240" stroke="var(--tomato)" stroke-dasharray="14 12" data-a="fade" data-s="2" data-d="900"/></svg>
        <div class="body" style="font-size:36px;margin-top:10px">Once it's gone, it's gone.</div>
        <div class="verdict" style="background:var(--tomato);color:var(--ink)" data-a="drop" data-s="2" data-d="1200">No undo</div>
      </div>
      <div class="col" style="left:1280px" data-a="up" data-s="3">
        <div class="mono">SIM swap</div>
        <div class="huge" style="font-size:150px;margin-top:20px">+234…</div>
        <div class="code" style="font-size:44px;margin-top:40px;background:var(--ink);color:var(--lime);padding:16px 24px;display:inline-block" data-a="type" data-s="3" data-d="400" data-cps="14">code: 483 920</div>
        <div class="body" style="font-size:36px;margin-top:30px">The codes now go to the attacker.</div>
        <div class="verdict" style="background:var(--tomato);color:var(--ink)" data-a="drop" data-s="3" data-d="1200">No undo</div>
      </div>`
  });

  /* 3. The ladder: three levels */
  D.slide({ id: 'ladder', sec: SEC, t: '32:15', bg: 'ink',
    notes: `So forgiveness tells you where to spend your engineering, and I think about it in three levels.
[click] The first level is forgiving. A mistake is cheap and someone can fix it, so you sample and review, like my car wash check, one order in five.
[click] The second level is unforgiving, but the action gets repeated a lot, like a payment that someone retries on a bad network. Here you make it safe to repeat.
[click] And the third level is unforgiving and irreversible, like changing where someone's money gets paid out, right after their SIM changed. Here you slow down and confirm.`,
    html: `
      <style>
        #s-ladder .step { position:absolute; left:120px; width:1680px; height:220px; display:grid; grid-template-columns:110px 1fr 440px; align-items:center; padding:0 40px; }
        #s-ladder .step .lv { font-family:'DM Mono'; font-size:34px; }
        #s-ladder .step .what { font-family:Anton; text-transform:uppercase; font-size:88px; line-height:1; }
        #s-ladder .step .ex { font-family:Archivo; font-weight:500; font-size:34px; line-height:1.2; }
      </style>
      <div class="abs mono" style="left:120px;top:70px;color:var(--sub)" data-a="fade">Where to spend your engineering</div>
      <div class="step" style="top:740px;background:var(--paper);color:var(--ink)" data-a="wipeup" data-s="1">
        <span class="lv">01</span><span class="what">Sample and review</span><span class="ex">Cheap and fixable. Car wash check, 1 order in 5.</span></div>
      <div class="step" style="top:480px;background:var(--cobalt);color:var(--paper);left:220px;width:1580px" data-a="wipeup" data-s="2">
        <span class="lv">02</span><span class="what">Make it safe to repeat</span><span class="ex">Unforgiving, repeated a lot. A payment retried on a bad network.</span></div>
      <div class="step" style="top:220px;background:var(--tomato);color:var(--ink);left:320px;width:1480px" data-a="wipeup" data-s="3">
        <span class="lv">03</span><span class="what">Slow down and confirm</span><span class="ex">Unforgiving and irreversible. Payout change right after a SIM change.</span></div>`
  });

  /* 4. Level 1: sampling */
  D.slide({ id: 'level-sample', sec: SEC, t: '32:35', bg: 'paper',
    notes: `(Level one, sample and review: one order in five. A wrong score is cheap and someone can fix it.)`,
    html: `
      <div class="abs mono" style="left:120px;top:110px" data-a="fade">Level 01 · sample and review</div>
      <div class="abs" style="left:120px;top:250px;display:flex;gap:18px">
        ${Array.from({ length: 15 }, (_, k) => `<div data-a="pop" data-d="${k * 50}" style="width:96px;height:96px;border:4px solid var(--ink);background:${k % 5 === 4 ? 'var(--lime)' : 'var(--card)'};display:flex;align-items:center;justify-content:center;font-family:Anton;font-size:44px">${k % 5 === 4 ? '✓' : ''}</div>`).join('')}
      </div>
      <div class="abs huge" style="left:110px;top:460px;font-size:300px" data-a="rise" data-d="900">1 in 5</div>
      <div class="abs body" style="left:120px;top:800px;width:1200px" data-a="up" data-d="1200">Car wash photos checked by an AI model. A wrong score is cheap and someone can fix it.</div>`
  });

  /* 5. Level 2: idempotency key */
  D.slide({ id: 'level-idempotency', sec: SEC, t: '32:55', bg: 'cobalt',
    notes: `The usual tool is an idempotency key, which is a unique ID sent with the payment,
[click] so if the same payment arrives twice,
[click] the server knows it's the same one and only charges once.`,
    html: `
      <style>#s-level-idempotency .pkt{position:absolute;left:120px;width:620px;padding:22px 28px;background:var(--paper);color:var(--ink)}
        #s-level-idempotency .pkt .code{font-size:38px}</style>
      <div class="abs mono" style="left:120px;top:90px;color:var(--sub)" data-a="fade">Level 02 · make it safe to repeat</div>
      <div class="pkt" style="top:240px" data-a="right">
        <div class="code">POST /payments</div><div class="code">Idempotency-Key: <b style="background:var(--lime)">pay_7f3a</b></div><div class="code">amount: 5000</div></div>
      <div class="pkt" style="top:540px" data-a="right" data-s="1">
        <div class="mono" style="font-size:26px;color:var(--tomato)">retry · network dropped</div>
        <div class="code">POST /payments</div><div class="code">Idempotency-Key: <b style="background:var(--lime)">pay_7f3a</b></div></div>
      <svg class="abs" width="400" height="600" style="left:760px;top:240px" fill="none" stroke="var(--paper)" stroke-width="6">
        <path d="M0 90 H360 M330 65 L365 90 L330 115" data-a="draw" data-d="400"/>
        <path d="M0 400 H360 M330 375 L365 400 L330 425" data-a="draw" data-s="1" data-d="300"/></svg>
      <div class="abs" style="left:1160px;top:240px;width:640px;height:460px;border:5px solid var(--paper);padding:30px" data-a="left" data-d="300">
        <div class="mono" style="color:var(--sub)">server · key table</div>
        <div class="code" style="font-size:38px;margin-top:20px;color:var(--paper)">pay_7f3a  charged</div>
        <div class="code" style="font-size:38px;margin-top:20px;color:var(--lime)" data-a="type" data-s="2" data-cps="30">pay_7f3a  seen before</div><div class="code" style="font-size:38px;margin-top:10px;color:var(--lime)" data-a="fade" data-s="2" data-d="700">→ same reply</div>
      </div>
      <div class="abs tile" style="left:1160px;top:760px;font-size:120px;background:var(--lime);color:var(--ink);padding:6px 28px;transform:rotate(-3deg)" data-a="pop" data-s="2" data-d="900">Charged once</div>
      ${D.credit('See Stripe API reference · idempotent requests')}`
  });

  /* 6. Level 3: slow down and confirm */
  D.slide({ id: 'level-slow', sec: SEC, t: '33:20', bg: 'tomato',
    notes: `Here you slow down and confirm.
[click] You ask for stronger proof,
[click] you add a waiting period,
[click] or, like on USSD, you show the user exactly what's already happening before they do anything again.`,
    html: `
      <div class="abs mono" style="left:120px;top:90px" data-a="fade">Level 03 · slow down and confirm</div>
      <div class="abs" style="left:120px;top:190px;width:1680px;display:flex;gap:30px;align-items:center" data-a="up">
        <span class="tile" style="font-size:80px;background:var(--ink);color:var(--paper);padding:6px 22px">SIM changed</span>
        <span class="huge" style="font-size:80px">then</span>
        <span class="tile" style="font-size:80px;background:var(--paper);color:var(--ink);padding:6px 22px">Change payout account</span></div>
      ${[['Stronger proof', 'Ask for more than an SMS code.'], ['A waiting period', 'Hold the change. Tell the old device.'], ['Show what’s happening', '“Your transfer of ₦5,000 is being processed.”']].map((r, k) => `
        <div class="abs" style="left:120px;top:${430 + k * 190}px;width:1680px;border-top:4px solid var(--ink);padding-top:20px;display:grid;grid-template-columns:100px 900px 1fr;align-items:baseline" data-a="wipe" data-s="${k + 1}">
          <span class="num" style="font-size:36px">0${k + 1}</span><span class="huge" style="font-size:88px">${r[0]}</span><span class="body" style="font-size:38px">${r[1]}</span></div>`).join('')}`
  });
})();
