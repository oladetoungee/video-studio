/* THE ENVIRONMENT PROFILE 4:00–11:00 */
(function () {
  const D = window.D;
  const SEC = 'The Environment Profile';
  const TOP = 170; // the profile table always sits here, so it reads as one recurring map

  /* 1. Title */
  D.slide({ id: 'profile-title', sec: SEC, t: '4:00', bg: 'cobalt',
    notes: `So let me introduce you to the model. I call it an Environment Profile.`,
    html: `
      ${D.regs()}
      <div class="abs mono" style="left:120px;top:150px;color:var(--lime)" data-a="fade">The model</div>
      <div class="abs huge" style="left:110px;top:250px;font-size:300px;line-height:.86;color:var(--paper)">
        <div>${D.words('The', { gap: 0 })}</div>
        <div>${D.words('Environment', { d: 160 })}</div>
        <div class="lime">${D.words('Profile', { d: 340 })}</div></div>
      <svg class="abs" width="1720" height="20" style="left:110px;top:980px" fill="none" stroke="var(--paper)" stroke-width="3">
        <path d="M0 10 H1700 M0 0 V20 M1700 0 V20" data-a="draw" data-d="700" data-dur="1200"/></svg>`
  });

  /* 2. What architects already write down */
  D.slide({ id: 'three-docs', sec: SEC, t: '4:10', bg: 'paper',
    notes: `If you're a software architect, you already write down your functional requirements, which is what your system does.
You already know your quality attributes, which is how fast, how available and how secure your system is.
[click] One thing that sometimes doesn't get as much attention is the environment your system will be used in.`,
    html: `
      <div class="abs head" style="left:120px;top:110px;font-size:84px" data-a="rise">What you already write down</div>
      ${[['Functional requirements', 'What your system does'], ['Quality attributes', 'How fast, how available, how secure']].map((c, k) => `
        <div class="abs" style="left:${120 + k * 580}px;top:330px;width:540px;height:560px;background:var(--card);border:3px solid var(--ink);padding:44px 40px" data-a="drop" data-d="${200 + k * 180}">
          <div class="mono muted">0${k + 1}</div>
          <div class="huge" style="font-size:88px;margin-top:24px">${c[0]}</div>
          <div class="body" style="font-size:38px;margin-top:28px;color:var(--sub)">${c[1]}</div>
          <div style="position:absolute;left:40px;right:40px;bottom:44px;display:flex;flex-direction:column;gap:18px">${[1, .8, .9, .6].map(w => `<i style="display:block;height:6px;width:${w * 100}%;background:var(--line)"></i>`).join('')}</div>
        </div>`).join('')}
      <div class="abs" style="left:1280px;top:330px;width:540px;height:560px;border:4px dashed var(--ink);padding:44px 40px" data-a="fade" data-d="600">
        <div class="mono muted">03</div>
        <div class="huge" style="font-size:150px;margin-top:40px;color:var(--sub)" data-out="1" data-a="fade" data-d="800">?</div></div>
      <div class="abs" style="left:1280px;top:330px;width:540px;height:560px;background:var(--tomato);padding:44px 40px" data-a="wipeup" data-s="1">
        <div class="mono">03</div>
        <div class="huge" style="font-size:76px;margin-top:24px">The environment</div>
        <div class="body" style="font-size:38px;margin-top:28px">Where your system will actually be used</div></div>`
  });

  /* 3. 99.9% quietly assumes */
  D.slide({ id: 'nines', sec: SEC, t: '4:40', bg: 'ink',
    notes: `If I say that my system is 99.9 percent available,
[click] that number is quietly assuming a particular network, a particular payment system and a particular legal system.`,
    html: `
      <div class="abs mono" style="left:120px;top:130px;color:var(--sub)" data-a="fade">Availability</div>
      <div class="abs huge" style="left:100px;top:180px;font-size:420px;color:var(--paper)"><span data-a="count" data-to="99.9" data-dec="1" data-suf="%" data-dur="1600">99.9%</span></div>
      <svg class="abs" width="1720" height="140" style="left:100px;top:560px" fill="none" stroke="var(--sub)" stroke-width="3">
        <path d="M560 0 V60 H130 V140" data-a="draw" data-s="1"/><path d="M560 0 V60 H640 V140" data-a="draw" data-s="1" data-d="150"/><path d="M560 60 H1200 V140" data-a="draw" data-s="1" data-d="300"/></svg>
      ${[['a particular', 'network', 'var(--tomato)'], ['a particular', 'payment system', 'var(--lime)'], ['a particular', 'legal system', 'var(--paper)']].map((c, k) => `
        <div class="abs" style="left:${100 + [0, 440, 1080][k]}px;top:730px;width:${[420, 620, 560][k]}px" data-a="up" data-s="1" data-d="${400 + k * 200}">
          <div class="mono" style="color:var(--sub)">${c[0]}</div><div class="huge" style="font-size:80px;margin-top:8px;color:${c[2]}">${c[1]}</div></div>`).join('')}
      <div class="abs serif" style="right:120px;top:300px;font-size:84px;color:var(--sub);text-align:right" data-a="fade" data-s="1" data-d="1100">quietly<br>assuming…</div>`
  });

  /* 4. Isn't this just NFRs? */
  D.slide({ id: 'not-nfr', sec: SEC, t: '5:00', bg: 'lime',
    notes: `Now, some of you might be thinking, isn't this just non-functional requirements? I'll say yes, kind of. It's a little bit of it.
[click] Non-functional requirements tell you what the system has to achieve.
[click] The Environment Profile describes the world those targets have to survive in, and it decides whether those targets are realistic and what it takes to hit them.
[click] So it kind of sits next to your non-functional requirements.`,
    html: `
      <div class="abs head" style="left:120px;top:110px;width:1700px;font-size:120px" data-a="rise">Isn't this just non-functional requirements?</div>
      <div class="abs" style="left:120px;top:520px;width:800px;border-top:4px solid var(--ink);padding-top:26px" data-a="right" data-s="1">
        <div class="mono">Non-functional requirements</div>
        <div class="head" style="font-size:64px;margin-top:18px">What the system has to <span class="serif" style="font-size:78px">achieve.</span></div></div>
      <div class="abs" style="left:1000px;top:520px;width:800px;border-top:4px solid var(--ink);padding-top:26px" data-a="left" data-s="2">
        <div class="mono">The Environment Profile</div>
        <div class="head" style="font-size:64px;margin-top:18px">The world those targets have to <span class="serif" style="font-size:78px">survive in.</span></div></div>
      <div class="abs tile" style="left:1000px;top:880px;font-size:64px;background:var(--ink);color:var(--lime);padding:6px 24px" data-a="pop" data-s="3">It sits next to them</div>`
  });

  /* 5. The profile, revealed row by row */
  const rowNotes = [
    `The first one is connectivity. How reliable and how expensive is the network for our users? I put "expensive" in there on purpose. In a lot of the world, people buy data in prepaid bundles, so every megabyte your app downloads is money out of the user's pocket. And reliability here is about latency, packet loss and how often the connection drops, right?`,
    `Number two is devices. What hardware do our users actually hold? And we're not going to assume the hardware that we're used to, the hardware we think is the norm. Everyone has an iPhone, everyone has a smartphone. That's our norm. But we have to take our time to ask what hardware our actual users actually hold. This is a very interesting question that Uber had to ask themselves. Old phones, for example, have less RAM, slower CPUs and very little free storage. So a big JavaScript bundle, for example, costs time to download, and then more time to parse and run on a slow CPU. So the phone in your user's hand could be one with less memory, a slower processor, or storage that's already full.`,
    `The third one is money rails. How fast and how reversible is settlement? A money rail is just the system your money actually moves on. For example, cards are different from instant bank transfers, and they're different from mobile money and cash. All of these behave differently, and each of these methods is common with different users in different regions.`,
    `The fourth one is identity rails. What do users already trust to prove who they are? In some countries, it could be a government digital ID. In some other countries, it's a phone number, and a code sent by SMS. Questions like these drive decisions in your sign-up flow, for example, and in your account recovery. You know, you think about account takeover.`,
    `The fifth row is jurisdiction. Which laws and promises decide where data lives, and how failures are handled? And "promises" is intentional, yeah? Because a lot of these rules also come from contracts with your customers.`,
    `And the last one, I call it forgiveness. And this is the question it asks. What have users here learned to tolerate, and what are the things that cannot be undone? This kind of tells you how much engineering a risk deserves. If a mistake is cheap and reversible, maybe we can accept it. If a mistake is irreversible, that needs a lot more attention, and you need to ask the question specifically for the environment your users are in. Because the same bug can be minor in one environment, and completely unforgivable and serious in another place.`,
  ];
  D.slide({ id: 'profile-reveal', sec: SEC, t: '5:30', bg: 'paper',
    notes: `Now I'll go over all of the rows that make up this model very quickly, before we pick up each of them.\n` + rowNotes.map(n => '[click] ' + n).join('\n'),
    html: `
      <div class="abs mono" style="left:120px;top:84px" data-a="fade">The Environment Profile</div>
      <div class="abs mono muted" style="right:120px;top:84px" data-a="fade" data-d="200">6 rows</div>
      ${D.profile({ top: TOP, reveal: true, from: 1 })}`,
    on(step, el) {
      el.querySelectorAll('.prof .row').forEach((r, k) => {
        r.classList.toggle('hot', step >= 1 && k === step - 1);
        r.style.opacity = step >= 1 && k < step - 1 ? .42 : '';
      });
    }
  });

  /* 6. Forgiveness example: FleetFox car-wash check */
  D.slide({ id: 'carwash', sec: SEC, t: '7:30', bg: 'paper',
    notes: `For example, at my current workplace, I set up an AI model to check the quality of car washes from photos. What it does is look at a sample, one in every five orders. And that's fine. We don't have to review every order, we do one in five.
[click] But I wouldn't design payments like that, right? I can't check one payment in five. No.
[click] So again, the same mistake can be minor in one place and major in another place.`,
    html: `
      <div class="abs mono blue" style="left:120px;top:96px" data-a="fade">FleetFox · AI car-wash quality check</div>
      <div class="abs" style="left:120px;top:170px;display:flex;align-items:baseline;gap:40px">
        <span class="huge" style="font-size:220px">1 in 5</span><span class="sub" style="font-size:44px">orders checked</span></div>
      <div class="abs" style="left:120px;top:430px;display:flex;gap:18px">
        ${Array.from({ length: 10 }, (_, k) => `<div style="width:150px;height:110px;border:3px solid var(--ink);background:${k % 5 === 0 ? 'var(--cobalt)' : 'var(--card)'};position:relative" data-a="pop" data-d="${200 + k * 70}">
          <span class="mono" style="position:absolute;left:12px;top:8px;font-size:22px;color:${k % 5 === 0 ? 'var(--paper)' : 'var(--sub)'}">#${String(k + 1).padStart(2, '0')}</span>
          ${k % 5 === 0 ? '<span class="mono" style="position:absolute;left:12px;bottom:8px;font-size:22px;color:var(--lime)">checked</span>' : ''}</div>`).join('')}
      </div>
      <div class="abs" style="left:120px;top:600px;right:120px;border-top:4px solid var(--ink)" data-a="wipe" data-s="1"></div>
      <div class="abs mono red" style="left:120px;top:630px" data-a="fade" data-s="1">Payments</div>
      <div class="abs" style="left:120px;top:690px;display:flex;align-items:baseline;gap:40px" data-a="up" data-s="1" data-d="150">
        <span class="huge red" style="font-size:220px">5 in 5</span><span class="sub" style="font-size:44px">every single one</span></div>
      <div class="abs" style="left:1130px;top:700px;width:670px;height:200px;background:var(--ink);color:var(--paper);display:flex;align-items:center;padding:0 40px" data-a="wipe" data-s="2">
        <span class="head" style="font-size:52px">Same mistake. Minor here, <span class="lime">major there.</span></span></div>`
  });

  /* 7. Where the idea comes from: Bryan Cantrill */
  D.slide({ id: 'cantrill', sec: SEC, t: '8:00', bg: 'ink',
    notes: `Bryan Cantrill gave a talk called "Platform as a Reflection of Values".
[click] In that talk, he argues that every platform, meaning languages, runtimes and operating systems, embodies values like performance, safety or approachability. And when you use a platform, you feel it when your values and the platform's values don't match.`,
    html: `
      <div class="abs mono" style="left:120px;top:96px;color:var(--sub)" data-a="fade">Where the idea comes from</div>
      ${D.browser({ x: 120, y: 180, w: 1000, h: 640, src: 'assets/img/src-cantrill.png', url: 'speakerdeck.com/bcantrill', a: 'zoom', imgStyle: 'width:170%;margin-left:-35%;margin-top:-30px' })}
      <div class="abs" style="left:1200px;top:190px;width:620px" data-a="left" data-d="300">
        <div class="huge" style="font-size:96px;color:var(--paper)">Platform as a reflection of values</div>
        <div class="mono" style="margin-top:24px;color:var(--sub)">Bryan Cantrill · 2017</div></div>
      <div class="abs" style="left:1200px;top:620px;width:620px" data-a="up" data-s="1">
        <div class="body" style="font-size:38px;color:var(--paper)">Every platform embodies values:</div>
        <div style="display:flex;flex-direction:column;gap:10px;margin-top:20px">
          ${['performance', 'safety', 'approachability'].map((w, k) => `<span class="tile" style="font-size:60px;background:${['var(--tomato)', 'var(--lime)', 'var(--paper)'][k]};color:var(--ink);padding:2px 18px;align-self:flex-start" data-a="drop" data-s="1" data-d="${300 + k * 140}">${w}</span>`).join('')}</div></div>
      ${D.credit('Bryan Cantrill, Node Summit 2017')}`
  });

  /* 8. Applied to places */
  D.slide({ id: 'values-places', sec: SEC, t: '8:30', bg: 'tomato',
    notes: `I'm applying the same idea from that talk, this time to places.
[click] Your architecture embodies the values of the environment it was built in.`,
    html: `
      <div class="abs" style="left:120px;top:150px;display:flex;align-items:center;gap:40px">
        <style>#s-values-places .strike::after{background:var(--ink)}</style><span class="huge strike" data-s="0" data-d="700" style="font-size:180px;color:rgba(18,18,18,.4)">Platforms</span>
        <span class="huge" style="font-size:180px;background:var(--ink);color:var(--paper);padding:0 24px" data-a="pop" data-d="1100">Places</span></div>
      <div class="abs head" style="left:120px;top:520px;width:1680px;font-size:110px;line-height:1.02">
        ${D.words('Your architecture embodies the values of the', { s: 1, gap: 50 })} <span class="hl" data-s="1" data-d="900" style="--hlc:var(--paper)">${D.words('environment', { s: 1, d: 420 })}</span> ${D.words('it was built in.', { s: 1, d: 480, gap: 50 })}</div>`
  });

  /* 9. Setting vs decision */
  const settings = ['Currency symbol', 'Date format', 'Language on the screen'];
  const decisions = ['Your payment state machine', 'Where your data lives', 'What happens when a request times out', 'How you deal with your users’ network', 'Your identity model and account recovery', 'Sign up with email, or with a phone number?'];
  D.slide({ id: 'setting-decision', sec: SEC, t: '8:50', bg: 'paper',
    notes: `Now, moving on, I want to show you two different words. When we make architectural decisions with the environment in mind, there are some things that are just settings. They don't need us to go back and forth. Right? Some things are just settings, while some things are major decisions.
[click] A setting is something you can change in a config file or a translation file, like a currency symbol, a date format, or the language on the screen.
[click] Your architecture doesn't even notice.
[click] A decision, on the other hand, is something that's baked into the shape of your system. Your payment state machine. Where your data lives. What happens when a request times out. How you deal with the network situation of your users. What identity model you use, and what your account recovery process looks like. Do you want your users to sign up with email, or would you prefer they sign up with phone numbers?
[click] Again, the environment decides this.`,
    html: `
      <div class="abs" style="left:960px;top:70px;width:4px;height:940px;background:var(--ink);transform-origin:top" data-a="wipeup"></div>
      <div class="abs huge" style="left:120px;top:80px;font-size:170px" data-a="right">Setting</div>
      <div class="abs huge" style="left:1020px;top:80px;font-size:170px;color:var(--tomato)" data-a="left" data-d="150">Decision</div>
      <div class="abs mono muted" style="left:120px;top:250px" data-a="fade" data-d="400">a config file can change it</div>
      <div class="abs mono muted" style="left:1020px;top:250px" data-a="fade" data-d="500">baked into the shape of your system</div>
      <div class="abs" style="left:120px;top:330px;display:flex;flex-direction:column;gap:16px">
        ${settings.map((w, k) => `<div class="body" style="font-size:44px;border:3px solid var(--ink);background:var(--card);padding:16px 24px;width:720px" data-a="right" data-s="1" data-d="${k * 140}">${w}</div>`).join('')}</div>
      <div class="abs serif" style="left:120px;top:690px;font-size:76px;width:780px;line-height:1.05" data-a="up" data-s="2">Your architecture doesn't even notice.</div>
      <div class="abs" style="left:1020px;top:330px;display:flex;flex-direction:column;gap:12px">
        ${decisions.map((w, k) => `<div class="body" style="font-size:38px;background:var(--ink);color:var(--paper);padding:14px 24px;width:780px" data-a="left" data-s="3" data-d="${k * 160}">${w}</div>`).join('')}</div>
      <div class="abs tile" style="left:1020px;top:930px;font-size:60px;background:var(--lime);color:var(--ink);padding:4px 20px;transform:rotate(-2deg)" data-a="pop" data-s="4">The environment decides</div>`
  });

  /* 10. How to use it: two columns */
  D.slide({ id: 'profile-columns', sec: SEC, t: '9:50', bg: 'paper',
    notes: `So the way you use the profile is simple.
[click] You fill it in for where your system was built, [click] and for where it's going next.
[click] And for every row that's different, you ask whether it changes a setting or a decision.
[click] The decisions are what this talk is about.`,
    html: `
      <style>
        #s-profile-columns .tb { position:absolute; left:120px; right:120px; top:${TOP}px; }
        #s-profile-columns .tr { display:grid; grid-template-columns: 90px 400px 1fr 1fr 400px; border-top:3px solid var(--ink); height:100px; align-items:center; }
        #s-profile-columns .tr .t { font-family:Anton; text-transform:uppercase; font-size:56px; }
        #s-profile-columns .cell { height:64px; margin-right:24px; border-bottom:3px dashed var(--line); }
      </style>
      <div class="abs mono" style="left:120px;top:84px" data-a="fade">The Environment Profile · how to use it</div>
      <div class="tb">
        <div class="tr" style="border-top:none;height:70px">
          <span></span><span></span>
          <span class="mono red" data-a="down" data-s="1">Where we built it</span>
          <span class="mono blue" data-a="down" data-s="2">Where it's going</span>
          <span class="mono" data-a="down" data-s="3" style="background:var(--lime);padding:4px 10px;justify-self:start">Setting or decision?</span></div>
        ${D.ROWS.map((r, k) => `<div class="tr" ${k === 5 ? 'style="border-top-style:dashed"' : ''}>
          <span class="mono muted" style="font-size:30px">${r.n}</span><span class="t">${r.t}</span>
          <span class="cell" style="border-color:var(--tomato)" data-a="wipe" data-s="1" data-d="${k * 80}"></span>
          <span class="cell" style="border-color:var(--cobalt)" data-a="wipe" data-s="2" data-d="${k * 80}"></span>
          <span class="mono" style="font-size:30px" data-a="pop" data-s="3" data-d="${k * 90}">${[1, 2, 4].includes(k) ? '<b style="color:var(--tomato)">≠</b> decision?' : '='}</span></div>`).join('')}
        <div style="border-top:3px solid var(--ink)"></div>
      </div>
      <div class="abs" style="left:120px;top:880px;width:1680px;height:130px;background:var(--ink);color:var(--paper);display:flex;align-items:center;padding:0 40px" data-a="wipe" data-s="4">
        <span class="head" style="font-size:64px">The decisions are what this talk is <span class="lime">about.</span></span></div>`
  });

  /* 11. Six rows + yours */
  D.slide({ id: 'plus-yours', sec: SEC, t: '10:30', bg: 'paper',
    notes: `Now, I have six rows here. But again, this is a model that comes from my experience of building products on one continent and then moving to build products on another. These are the rows that I've observed, that I've learned, and that I've had to investigate over the past four years.
[click] But it's not a complete list. It's something you'll take home with you, add your own to, and remove what isn't going to work for you.
[click] Even as of this morning, I was thinking that perhaps I need to add accessibility to the list. But I made a decision not to edit my slides. [let them laugh]
So yeah, let's go deep.`,
    html: `
      <div class="abs mono" style="left:120px;top:84px" data-a="fade">The Environment Profile</div>
      ${D.profile({ top: TOP, anim: 'fade', extra: `
        <div style="display:grid;grid-template-columns:90px 430px 1fr;align-items:baseline;padding:18px 0 16px;border-bottom:3px dashed var(--ink)" data-a="wipe" data-s="1">
          <span class="mono" style="font-size:30px;color:var(--tomato)">+</span>
          <span class="huge" style="font-size:64px;color:var(--tomato)">Yours</span>
          <span class="serif muted" style="font-size:52px" data-a="fade" data-s="2">accessibility?</span></div>
        <div style="display:flex;justify-content:flex-end;margin-top:24px"><span class="tile" style="font-size:44px;background:var(--lime);color:var(--ink);padding:4px 16px;transform:rotate(3deg)" data-a="drop" data-s="2" data-d="500">I didn't edit my slides</span></div>` })}`
  });
})();
