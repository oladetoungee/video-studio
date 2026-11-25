/* FORGIVENESS 31:30–34:00 */
(function () {
  const D = window.D;
  const SEC = 'Forgiveness';
  const F = (px, w = 600) => `font-family:Geist;font-weight:${w};font-size:${px}px;line-height:1.02;letter-spacing:-.045em`;

  /* 1. The question */
  D.slide({ id: 'forgiveness-q', sec: SEC, t: '31:30', bg: 'cobalt',
    notes: `What have users here learned to tolerate, and what are the things that cannot be undone?
Look at everything we've just seen through that question.`,
    html: `
      <div class="abs mono" style="left:140px;top:170px;color:#C9D3FF" data-a="fade">06</div>
      <div class="abs" style="left:140px;top:220px;${F(200)}" data-a="blur">Forgiveness</div>
      <div class="abs" style="left:140px;top:560px;width:1500px;${F(76, 500)};line-height:1.12;color:#E3E8FF">
        ${D.words('What have users here learned to tolerate,', { d: 400, gap: 50 })}<br>${D.words('and what can’t be', { d: 800, gap: 50 })} <span style="color:#fff;font-weight:600">${D.words('undone?', { d: 1050 })}</span></div>`
  });

  /* 2. Reversible vs irreversible */
  D.slide({ id: 'undo', sec: SEC, t: '31:45', bg: 'paper',
    notes: `A card payment is forgiving, because the customer can get their money back with a chargeback.
An instant transfer in Nigeria, or a Pix payment in Brazil, mostly isn't. Once the money is gone, it's gone.
And a SIM swap can't be undone either, because once an attacker has the codes, the account is theirs.
So forgiveness tells you where to spend your engineering. If a mistake is cheap and someone can fix it, you can sample and review. If it can be repeated, like a payment retried on a bad network, you make it safe to repeat. And if it can't be undone, you slow down and confirm.`,
    html: `
      <style>#s-undo .col{position:absolute;top:170px;width:500px;height:760px;border-top:2px solid var(--ink);padding-top:30px}
        #s-undo .verdict{position:absolute;left:0;bottom:0}</style>
      <div class="col" style="left:140px" data-a="up" data-d="0">
        <div class="mono">Card</div>
        <div style="${F(108)};margin-top:24px">€40</div>
        <svg width="460" height="160" style="margin-top:30px" fill="none" stroke="var(--ink)" stroke-width="3">
          <path d="M10 50 H420 M392 28 L424 50 L392 72" data-a="draw" data-d="300"/>
          <path d="M450 120 H40 M68 98 L36 120 L68 142" stroke="var(--cobalt)" data-a="draw" data-d="900"/></svg>
        <div class="verdict blue" style="${F(76)}" data-a="up" data-d="1300">Undo ✓</div></div>
      <div class="col" style="left:710px" data-a="up" data-d="2600">
        <div class="mono">Instant transfer · Pix</div>
        <div style="${F(108)};margin-top:24px">₦50,000</div>
        <svg width="460" height="160" style="margin-top:30px" fill="none" stroke="var(--ink)" stroke-width="3">
          <path d="M10 50 H420 M392 28 L424 50 L392 72" data-a="draw" data-d="2900"/>
          <path d="M450 120 H240" stroke="var(--tomato)" stroke-dasharray="10 10" data-a="fade" data-d="3500"/></svg>
        <div class="verdict red" style="${F(76)}" data-a="up" data-d="3800">No undo</div></div>
      <div class="col" style="left:1280px" data-a="up" data-d="5200">
        <div class="mono">SIM swap</div>
        <div style="${F(108)};margin-top:24px">+234…</div>
        <div class="code" style="font-size:40px;margin-top:50px;border:2px solid var(--ink);padding:14px 22px;display:inline-block" data-a="type" data-d="5600" data-cps="14">code 483 920</div>
        <div class="verdict red" style="${F(76)}" data-a="up" data-d="6400">No undo</div></div>`
  });

})();
