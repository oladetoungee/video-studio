/* THE ENVIRONMENT PROFILE 4:00–11:00 */
(function () {
  const D = window.D;
  const SEC = 'The Environment Profile';
  const TOP = 170; // the profile table always sits here, so it reads as one recurring map

  /* 1. Title */
  D.slide({ id: 'profile-title', sec: SEC, t: '4:00', bg: 'cobalt',
    notes: `So let me introduce you to the model. I call it an Environment Profile.`,
    html: `
      <div class="abs head" style="left:140px;top:280px;font-size:200px;line-height:.98;letter-spacing:-.05em;color:#fff">
        <div>${D.words('The Environment', { gap: 120 })}</div>
        <div style="color:var(--lime)">${D.words('Profile', { d: 300 })}</div></div>
      <svg class="abs" width="1640" height="20" style="left:140px;top:800px" fill="none" stroke="#fff" stroke-width="2">
        <path d="M0 10 H1640 M0 0 V20 M1640 0 V20" data-a="draw" data-d="700" data-dur="1200"/></svg>`
  });

  /* 2. What architects already write down */
  D.slide({ id: 'three-docs', sec: SEC, t: '4:10', bg: 'paper',
    notes: `If you're a software architect, you already write down your functional requirements, which is what your system does.
You already know your quality attributes, which is how fast, how available and how secure your system is.
[click] One thing that sometimes doesn't get as much attention is the environment your system will be used in.`,
    html: `
      ${['Functional requirements', 'Quality attributes'].map((c, k) => `
        <div class="abs" style="left:${140 + k * 560}px;top:280px;width:520px;height:520px;background:var(--card);border:2px solid var(--ink);padding:44px 40px" data-a="drop" data-d="${200 + k * 180}">
          <div class="head" style="font-size:64px">${c}</div></div>`).join('')}
      <div class="abs" style="left:1260px;top:280px;width:520px;height:520px;border:2px dashed var(--ink);padding:44px 40px" data-a="fade" data-d="600">
        <div class="head" style="font-size:150px;color:var(--sub)" data-out="1" data-a="fade" data-d="800">?</div></div>
      <div class="abs" style="left:1260px;top:280px;width:520px;height:520px;background:var(--cobalt);color:#fff;padding:44px 40px" data-a="wipeup" data-s="1">
        <div class="head" style="font-size:64px">The environment</div></div>`
  });

  /* 3. 99.9% quietly assumes */
  D.slide({ id: 'nines', sec: SEC, t: '4:40', bg: 'ink',
    notes: `If I say that my system is 99.9 percent available,
that number is quietly assuming a particular network, a particular payment system and a particular legal system.`,
    html: `
      <div class="abs head" style="left:126px;top:150px;font-size:320px;line-height:1;letter-spacing:-.05em"><span data-a="count" data-to="99.9" data-dec="1" data-suf="%" data-dur="1600">99.9%</span></div>
      <svg class="abs" width="1640" height="160" style="left:140px;top:560px" fill="none" stroke="#5a5a60" stroke-width="2">
        <path d="M520 0 V70 H80 V160" data-a="draw" data-d="1900"/><path d="M520 0 V70 H660 V160" data-a="draw" data-d="2050"/><path d="M520 70 H1260 V160" data-a="draw" data-d="2200"/></svg>
      ${['network', 'payment system', 'legal system'].map((c, k) => `
        <div class="abs head" style="left:${140 + [0, 580, 1180][k]}px;top:760px;font-size:64px;color:${['var(--tomato)', 'var(--lime)', '#F2F0EB'][k]}" data-a="pop" data-d="${2400 + k * 220}">${c}</div>`).join('')}`
  });

  /* 4. Isn't this just NFRs? */
  D.slide({ id: 'not-nfr', sec: SEC, t: '5:00', bg: 'lime',
    notes: `Now, some of you might be thinking, isn't this just non-functional requirements? I'll say yes, kind of. It's a little bit of it.
Non-functional requirements tell you what the system has to achieve.
The Environment Profile describes the world those targets have to survive in, and it decides whether those targets are realistic and what it takes to hit them.
So it kind of sits next to your non-functional requirements.`,
    html: `
      <div class="abs head" style="left:140px;top:300px;width:1500px;font-size:140px;line-height:1.02">${D.words("Isn't this just", { gap: 70 })} <span class="blue">${D.words('non-functional requirements?', { d: 260, gap: 90 })}</span></div>`
  });

  /* 5. The profile, revealed row by row */
  const rowNotes = [
    `The first one is connectivity. How reliable and how expensive is the network for our users? I put "expensive" in there on purpose. In a lot of the world, people buy data in prepaid bundles, so every megabyte your app downloads is money out of the user's pocket. And reliability here is about latency, packet loss and how often the connection drops, right?`,
    `Number two is devices. What hardware do our users actually hold? And we're not going to assume the hardware that we're used to, the hardware we think is the norm. Everyone has an iPhone, everyone has a smartphone. That's our norm. But we have to take our time to ask what hardware our actual users actually hold. This is a very interesting question that Uber had to ask themselves. Old phones, for example, have less RAM, slower CPUs and very little free storage. So a big JavaScript bundle, for example, costs time to download, and then more time to parse and run on a slow CPU. So the phone in your user's hand could be one with less memory, a slower processor, or storage that's already full.`,
    `The third one is money rails. How fast and how reversible is settlement? A money rail is just the system your money actually moves on. For example, cards are different from instant bank transfers, and they're different from mobile money and cash. All of these behave differently, and each of these methods is common with different users in different regions.`,
    `The fourth one is identity rails. What do users already trust to prove who they are? In some countries, it could be a government digital ID. In some other countries, it's a phone number, and a code sent by SMS. Questions like these drive decisions in your sign-up flow, for example, and in your account recovery. You know, you think about account takeover.`,
    `The fifth row is jurisdiction. Which laws and promises decide where data lives, and how failures are handled? And "promises" is intentional, yeah? Because a lot of these rules also come from contracts with your customers.`,
    `And the last one, I call it forgiveness. And this is the question it asks. What have users here learned to tolerate, and what are the things that cannot be undone? This kind of tells you how much engineering a risk deserves. If a mistake is cheap and reversible, maybe we can accept it. If a mistake is irreversible, that needs a lot more attention, and you need to ask the question specifically for the environment your users are in. Because the same bug can be minor in one environment, and completely unforgivable and serious in another place. For example, at my current workplace, I set up an AI model to check the quality of car washes from photos. It looks at a sample, one in every five orders, and that's fine. But I wouldn't design payments like that, right? I can't check one payment in five. So again, the same mistake can be minor in one place and major in another place.`,
  ];
  D.slide({ id: 'profile-reveal', sec: SEC, t: '5:30', bg: 'paper',
    notes: `Now I'll go over all of the rows that make up this model very quickly, before we pick up each of them.\n` + rowNotes.map(n => '[click] ' + n).join('\n'),
    html: `
      <div class="abs head" style="left:140px;top:70px;font-size:56px" data-a="fade">The Environment Profile</div>
      ${D.profile({ top: TOP, reveal: true, from: 1 })}`,
    on(step, el) {
      el.querySelectorAll('.prof .row').forEach((r, k) => {
        r.classList.toggle('hot', step >= 1 && k === step - 1);
        r.style.opacity = step >= 1 && k < step - 1 ? .42 : '';
      });
    }
  });

  /* 6. Forgiveness example: FleetFox car-wash check */
  /* 7. Where the idea comes from: Bryan Cantrill */
  D.slide({ id: 'cantrill', sec: SEC, t: '8:00', bg: 'paper',
    notes: `Bryan Cantrill gave a talk called "Platform as a Reflection of Values".
In that talk, he argues that every platform, meaning languages, runtimes and operating systems, embodies values like performance, safety or approachability. And when you use a platform, you feel it when your values and the platform's values don't match.`,
    html: `
      ${D.browser({ x: 140, y: 170, w: 960, h: 620, src: 'assets/img/src-cantrill.png', url: 'speakerdeck.com/bcantrill', a: 'zoom', imgStyle: 'width:170%;margin-left:-35%;margin-top:-30px' })}
      <div class="abs mono" style="left:140px;top:100px;font-size:30px;color:var(--ink)" data-a="fade">Bryan Cantrill · Node Summit 2017</div>
      <div class="abs" style="left:1180px;top:170px;width:600px" data-a="left" data-d="300">
        <div class="head" style="font-size:72px">Platform as a reflection of values</div></div>
      <div class="abs" style="left:1180px;top:560px;display:flex;flex-direction:column;gap:14px">
        ${['performance', 'safety', 'approachability'].map((w, k) => `<span class="head" style="font-size:60px;border-top:2px solid var(--ink);padding-top:10px;width:600px;color:${['var(--ink)', 'var(--cobalt)', 'var(--ink)'][k]}" data-a="up" data-d="${700 + k * 160}">${w}</span>`).join('')}</div>`
  });

  /* 8. Applied to places */
  D.slide({ id: 'values-places', sec: SEC, t: '8:30', bg: 'paper',
    notes: `I'm applying the same idea from that talk, this time to places.
Your architecture embodies the values of the environment it was built in.`,
    html: `
      <div class="abs head" style="left:140px;top:300px;width:1640px;font-size:120px;line-height:1.04">
        ${D.words('Your architecture embodies the values of the', { gap: 60 })} <span class="hl" data-d="1200">${D.words('environment', { d: 500 })}</span> ${D.words('it was built in.', { d: 580, gap: 60 })}</div>`
  });

  /* 9. Setting vs decision */
  const settings = ['Currency symbol', 'Date format', 'Language on the screen'];
  const decisions = ['Your payment state machine', 'Where your data lives', 'What happens when a request times out', 'How you deal with your users’ network', 'Your identity model and account recovery', 'Sign up with email, or a phone number?'];
  D.slide({ id: 'setting-decision', sec: SEC, t: '8:50', bg: 'paper',
    notes: `Now, moving on, I want to show you two different words. When we make architectural decisions with the environment in mind, there are some things that are just settings. They don't need us to go back and forth. Right? Some things are just settings, while some things are major decisions.
[click] A setting is something you can change in a config file or a translation file, like a currency symbol, a date format, or the language on the screen.
Your architecture doesn't even notice.
[click] A decision, on the other hand, is something that's baked into the shape of your system. Your payment state machine. Where your data lives. What happens when a request times out. How you deal with the network situation of your users. What identity model you use, and what your account recovery process looks like. Do you want your users to sign up with email, or would you prefer they sign up with phone numbers?
Again, the environment decides this.`,
    html: `
      <div class="abs" style="left:940px;top:120px;width:2px;height:840px;background:var(--ink);transform-origin:top" data-a="wipeup"></div>
      <div class="abs head" style="left:140px;top:110px;font-size:120px" data-a="right">Setting</div>
      <div class="abs head blue" style="left:1000px;top:110px;font-size:120px" data-a="left" data-d="150">Decision</div>
      <div class="abs" style="left:140px;top:320px;width:720px">
        ${settings.map((w, k) => `<div class="body" style="border-top:2px solid var(--line);padding:18px 0" data-a="right" data-s="1" data-d="${k * 140}">${w}</div>`).join('')}</div>
      <div class="abs" style="left:1000px;top:320px;width:780px">
        ${decisions.map((w, k) => `<div class="body" style="font-size:38px;border-top:2px solid var(--ink);padding:14px 0" data-a="left" data-s="2" data-d="${k * 160}">${w}</div>`).join('')}</div>`
  });

  /* 10. How to use it: two columns */
  D.slide({ id: 'profile-columns', sec: SEC, t: '9:50', bg: 'paper',
    notes: `So the way you use the profile is simple.
[click] You fill it in for where your system was built, [click] and for where it's going next.
And for every row that's different, you ask whether it changes a setting or a decision.
The decisions are what this talk is about.`,
    html: `
      <style>
        #s-profile-columns .tb { position:absolute; left:140px; right:140px; top:${TOP}px; }
        #s-profile-columns .tr { display:grid; grid-template-columns: 0 440px 1fr 1fr; border-top:2px solid var(--ink); height:96px; align-items:center; }
        #s-profile-columns .tr .t { font-family:Geist; font-weight:600; letter-spacing:-.035em; font-size:48px; }
        #s-profile-columns .cell { height:56px; margin-right:28px; border-bottom:2px dashed var(--line); }
      </style>
      <div class="abs head" style="left:140px;top:70px;font-size:56px" data-a="fade">The Environment Profile</div>
      <div class="tb">
        <div class="tr" style="border-top:none;height:64px">
          <span></span><span></span>
          <span class="mono red" style="font-size:32px" data-a="down" data-s="1">Where the software is built</span>
          <span class="mono blue" style="font-size:32px" data-a="down" data-s="2">Where the software is going</span></div>
        ${D.ROWS.map((r, k) => `<div class="tr" ${k === 5 ? 'style="border-top-style:dashed"' : ''}>
          <span></span><span class="t">${r.t}</span>
          <span class="cell" style="border-color:var(--tomato)" data-a="wipe" data-s="1" data-d="${k * 80}"></span>
          <span class="cell" style="border-color:var(--cobalt)" data-a="wipe" data-s="2" data-d="${k * 80}"></span></div>`).join('')}
        <div style="border-top:2px solid var(--ink)"></div>
      </div>`
  });

  /* 11. Six rows + yours */
  D.slide({ id: 'plus-yours', sec: SEC, t: '10:30', bg: 'paper',
    notes: `Now, I have six rows here. But again, this is a model that comes from my experience of building products on one continent and then moving to build products on another. These are the rows that I've observed, that I've learned, and that I've had to investigate over the past four years.
But it's not a complete list. It's something you'll take home with you, add your own to, and remove what isn't going to work for you.
And honestly, the quickest way to fill in a row is someone on your team who has lived there. Someone who knows what the network is like, how people pay, what ID they carry. That's a big part of why teams with developers from different places build more resilient software. They bring rows you didn't know were missing.
Even as of this morning, I was thinking that perhaps I need to add accessibility to the list. But I made a decision not to edit my slides. [let them laugh]
So yeah, let's go deep.`,
    html: `
      <div class="abs head" style="left:140px;top:70px;font-size:56px" data-a="fade">The Environment Profile</div>
      ${D.profile({ top: 150, anim: 'fade', extra: `
        <div style="padding:20px 0 18px;border-bottom:2px dashed var(--ink)" data-a="wipe" data-d="1100">
          <span class="head blue" style="font-size:54px">+ Yours</span></div>` })}`
  });

  /* 12. What's coming: three stories (the rows, told through real cases) */
  D.slide({ id: 'three-stories', sec: SEC, t: '10:50', bg: 'paper',
    notes: `So instead of going through the rows one by one, I'm going to tell you three stories.
The first one is about Uber, and how they rebuilt their app for old phones and slow networks.
The second one is about Mastercard, and why they were stopped from taking new customers in India.
And the third one is about money and identity. How people pay, and how they prove who they are, in Nigeria and in Estonia.
Each story fills in some of the rows.`,
    html: `
      <div class="abs head" style="left:140px;top:110px;font-size:110px;letter-spacing:-.05em" data-a="rise">Three stories.</div>
      ${[['Uber rebuilds its app for old phones.', 'Connectivity and devices', 'var(--cobalt)'],
         ['Mastercard gets blocked in India.', 'Jurisdiction', 'var(--tomato)'],
         ['How people pay and prove who they are, Nigeria vs Estonia.', 'Money and identity', 'var(--ink)']].map((r, k) => `
        <div class="abs" style="left:140px;right:140px;top:${360 + k * 210}px;border-top:2px solid var(--ink);padding-top:26px;display:flex;justify-content:space-between;align-items:baseline;gap:40px" data-a="up" data-d="${700 + k * 900}">
          <span class="head" style="font-size:58px;max-width:1200px;line-height:1.05">${r[0]}</span>
          <span class="sub" style="font-size:34px;color:${r[2]};white-space:nowrap">${r[1]}</span></div>`).join('')}`
  });
})();
