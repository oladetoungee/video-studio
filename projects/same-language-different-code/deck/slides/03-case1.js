/* CASE 1: CONNECTIVITY AND DEVICES 11:00–18:00 (v2: Direction A look, one idea per slide) */
(function () {
  const D = window.D;
  const SEC = 'Case 1: Connectivity and devices';
  const TOP = 170; // same table position as the profile section
  const EASE = 'cubic-bezier(.16,1,.3,1)';

  /* Quiet counter for Uber's seven decisions */
  const dc = (n) => `<div class="abs" style="left:140px;top:84px;display:flex;align-items:center;gap:18px" data-a="fade">
      <span style="display:flex;gap:6px">${[1, 2, 3, 4, 5, 6, 7].map(k => `<i style="display:block;width:34px;height:5px;background:${k === n ? 'var(--cobalt)' : k < n ? 'var(--fg)' : 'var(--line)'}"></i>`).join('')}</span>
      <span style="font-family:Geist;font-weight:600;font-size:26px;letter-spacing:-.01em">Decision ${n}</span></div>`;

  /* A simple feature phone. Screen content lives in .scr */
  const phone = (x, y, a, d) => `
    <div class="abs" style="left:${x}px;top:${y}px;width:360px;height:760px;background:#232326;border:2px solid #141416;border-radius:52px 52px 74px 74px;padding:52px 36px" data-a="${a || 'up'}" data-d="${d || 0}">
      <div class="scr" style="height:300px;background:#D3DDB8;padding:20px;font-family:'GeistMono';font-size:26px;line-height:1.38;color:#1a1f0c;position:relative;overflow:hidden"></div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin-top:36px">
        ${['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map(k => `<span style="height:56px;background:#36363a;border-radius:12px;color:#cfcfcf;font-family:'GeistMono';font-size:24px;display:flex;align-items:center;justify-content:center">${k}</span>`).join('')}</div>
    </div>`;

  /* 1. Case title */
  D.slide({ id: 'case1-title', sec: SEC, t: '11:00', bg: 'paper',
    notes: `Our first one is connectivity. Remember the question. How reliable and how expensive is the network for our users?
[click] And this story actually covers two rows, because it's also about devices, what hardware our users actually hold.`,
    html: `
      <div class="abs mono" style="left:140px;top:110px" data-a="fade">Case 1</div>
      <div class="abs" style="left:140px;top:230px;width:1640px" data-a="right">
        <div class="huge" data-ts="off" style="font-size:150px">Connectivity</div>
        <div class="sub" style="margin-top:18px">How reliable and how expensive is the network for our users?</div></div>
      <div class="abs rule" style="left:140px;right:140px;top:560px;height:2px;background:var(--line)" data-a="wipe" data-s="1"></div>
      <div class="abs" style="left:140px;top:640px;width:1640px" data-a="left" data-s="1" data-d="150">
        <div class="huge blue" data-ts="off" style="font-size:150px">Devices</div>
        <div class="sub" style="margin-top:18px">What hardware do our users actually hold?</div></div>`
  });

  /* 2. Uber Lite source */
  D.slide({ id: 'uber-source', sec: SEC, t: '11:15', bg: 'paper',
    notes: `Our first story is about Uber. And it's a very interesting one. In 2019, Uber published how they built an app called Uber Lite. And they did something very interesting.`,
    html: `
      <div class="abs" style="left:140px;top:96px;width:1640px">
        <div class="mono" data-a="fade">Uber Engineering · 2019</div>
        <div class="head" style="font-size:84px;margin-top:10px" data-a="rise" data-d="150">Expanding Access: Engineering Uber Lite</div></div>
      ${D.browser({ x: 340, y: 330, w: 1240, h: 700, src: 'assets/img/src-uber-lite.png', url: 'uber.com/blog/engineering-uber-lite', a: 'up', d: 300 })}`
  });

  /* 3. Year Class */
  D.slide({ id: 'year-class', sec: SEC, t: '11:40', bg: 'ink',
    notes: `They didn't guess their way around. They graded their riders' phones using Year Class.
If you don't know what Year Class is, Year Class is Facebook's way of scoring a phone by the year it would have been a high-end phone.`,
    leave(el) { clearInterval(el._t); },
    on(step, el, D, animate) {
      if (step !== 0) return;
      const yc = el.querySelector('.yc'); clearInterval(el._t);
      if (!animate) { yc.textContent = '2015'; return; }
      let y = 2008; yc.textContent = y;
      setTimeout(() => { el._t = setInterval(() => { yc.textContent = ++y; if (y >= 2015) clearInterval(el._t); }, 170); }, 500);
    },
    html: `
      <div class="abs head" style="left:140px;top:300px;width:940px;font-size:96px" data-a="rise">They graded their riders' phones using <span class="lime">Year Class.</span></div>
      <div class="abs" style="left:1260px;top:150px;width:380px;height:780px;border:2px solid var(--fg);border-radius:46px" data-a="zoom" data-d="200">
        <div style="position:absolute;left:26px;right:26px;top:76px;bottom:100px;border:2px solid #2E2E33;display:flex;flex-direction:column;align-items:center;justify-content:center">
          <div class="mono">year class</div>
          <div class="huge lime" data-ts="off" style="font-size:130px;margin-top:8px"><span class="yc">2015</span></div></div></div>`
  });

  /* 4. Three numbers */
  D.slide({ id: 'uber-numbers', sec: SEC, t: '12:00', bg: 'paper',
    notes: `So Uber realised something very interesting when they did this. They realised that 56 percent of their riders were on phones from Year Class 2015 or older.
[click] In one of their biggest markets, 46 million riders were on phones in the 2013 class.
[click] And a third of rides were being booked on networks slower than 3G.`,
    html: `
      ${[['56', '%', 'on phones from 2015 or older', 'var(--ink)', 0], ['46', 'M', 'riders in one market on 2013-class phones', 'var(--tomato)', 1], ['33', '%', 'of rides on networks slower than 3G', 'var(--cobalt)', 2]].map((c, k) => `
        <div class="abs" style="left:${140 + k * 560}px;top:300px;width:500px;border-top:2px solid ${c[3]};padding-top:34px" data-a="up" data-s="${c[4]}">
          <div class="huge" data-ts="off" style="font-size:190px;color:${c[3]};white-space:nowrap"><span data-a="count" data-s="${c[4]}" data-to="${c[0]}" data-suf="${c[1]}" data-dur="1300">${c[0]}${c[1]}</span></div>
          <div class="body" style="font-size:38px;margin-top:26px;width:440px">${c[2]}</div></div>`).join('')}`
  });

  /* 5. The mismatch: the punchline of the Uber setup */
  D.slide({ id: 'uber-mismatch', sec: SEC, t: '12:40', bg: 'cobalt',
    notes: `So this brought Uber to a very interesting problem. The Uber app had been designed for an environment that most of its riders did not live in.`,
    html: `
      <div class="abs head" style="left:140px;top:300px;width:1640px;font-size:110px;line-height:1.04">
        ${D.words('The app had been designed for an', { gap: 55 })} <span class="hl" data-d="900" style="--hlc:#FFFFFF;color:var(--cobalt)">${D.words('environment', { d: 380 })}</span> ${D.words('most of its riders did not live in.', { d: 450, gap: 55 })}</div>`
  });

  /* 5b. Ask the room before showing what Uber did */
  D.slide({ id: 'uber-question', sec: SEC, t: '12:50', bg: 'paper',
    notes: `So before I tell you what Uber did, I'd love to hear from you.
Maybe you're a designer, maybe you're a product manager, or maybe you're an engineering lead. If this problem landed on your desk, what would you do?
[take two or three answers, then move on]
Okay. Let's see what Uber did.`,
    html: `
      <div class="abs head" style="left:140px;top:220px;width:1640px;font-size:56px;color:var(--sub)" data-a="up">You're the designer. The product manager. The engineering lead.</div>
      <div class="abs head" style="left:140px;top:420px;width:1640px;font-size:150px;line-height:1;letter-spacing:-.05em" data-a="rise" data-d="900">What would <span class="blue">you</span> do?</div>`
  });

  /* 6. Decision 01: under 5 MB */
  D.slide({ id: 'd1-5mb', sec: SEC, t: '13:00', bg: 'paper',
    notes: `So this is what Uber decided. They made some very daring decisions.
First of all, they decided that their download size would be under five megabytes. That's literally less than three selfies, and that was their own description.
Basically, they realised that for users on prepaid data, a big download costs money. And on a slow network, a lot of downloads just don't finish. So that was decision number one that Uber made, that the app has to be under five megabytes to download.`,
    html: `
      ${dc(1)}
      <div class="abs huge" data-ts="off" style="left:140px;top:250px;font-size:240px" data-a="rise">&lt; 5 MB</div>
      <div class="abs" style="left:140px;top:600px;width:1640px;height:64px;border:2px solid var(--ink)">
        <div style="position:absolute;left:0;top:0;bottom:0;width:48%;background:var(--ink)" data-a="wipe" data-d="400"></div>
        <div style="position:absolute;left:50%;top:-26px;bottom:-26px;width:3px;background:var(--tomato)" data-a="fade" data-d="600"></div></div>
      <div class="abs mono" style="left:140px;top:690px;font-size:26px" data-a="fade" data-d="400">0</div>
      <div class="abs mono red" style="left:920px;top:690px;font-size:26px" data-a="fade" data-d="600">5 MB</div>
      <div class="abs mono" style="left:1690px;top:690px;font-size:26px" data-a="fade" data-d="600">10 MB</div>
`
  });

  /* 7. Decision 02: one response, one packet (modelled on Direction A) */
  D.slide({ id: 'd2-mtu', sec: SEC, t: '13:40', bg: 'paper', steps: 1,
    notes: `The next decision they made is a very interesting one. Every network response has to fit into one packet. So it has to be under one MTU. MTU means maximum transmission unit, which is the biggest packet that a network link carries in one go. On Ethernet, that's 1,500 bytes. So basically, no response bigger than one packet.
[click] And if a response fits into one packet, it either arrives or it doesn't.
But if your response needs ten packets, for example, and one of them gets lost, TCP has to resend it and wait.
And on a weak mobile network, that's not good news. So again, decision number two was to make sure that responses fit under one MTU.`,
    html: `
      ${dc(2)}
      <div class="abs head" style="left:140px;top:160px;font-size:100px" data-a="rise">One response. <span class="blue">One packet.</span></div>
      <svg class="abs" width="1920" height="1080" style="left:0;top:0"><path d="M420 680 H1500" fill="none" stroke="var(--line)" stroke-width="2.5" data-a="draw" data-d="200"/></svg>
      <div class="abs" style="left:140px;top:600px;width:280px;height:160px;border:2.5px solid var(--ink);display:flex;align-items:center;justify-content:center;font-family:'Geist';font-weight:500;font-size:32px" data-a="right">Phone</div>
      <div class="abs" style="left:1500px;top:600px;width:280px;height:160px;border:2.5px solid var(--ink);display:flex;align-items:center;justify-content:center;font-family:'Geist';font-weight:500;font-size:32px" data-a="left">Server</div>
      <div class="abs" id="pk-area" style="left:0;top:0;width:1920px;height:1080px"></div>
      <div class="abs mono" id="pk-note" style="left:420px;top:830px;width:1080px;text-align:center"></div>`,
    leave(el) { (el._anims || []).forEach(a => a.cancel()); clearTimeout(el._to); },
    on(step, el, D, animate) {
      const area = el.querySelector('#pk-area'), note = el.querySelector('#pk-note');
      (el._anims || []).forEach(a => a.cancel()); el._anims = []; clearTimeout(el._to);
      area.innerHTML = ''; note.textContent = ''; note.style.color = '';
      const Y = 658;
      const pk = (x, color, w = 64) => { const p = document.createElement('div'); p.className = 'abs';
        Object.assign(p.style, { left: '0', top: '0', width: w + 'px', height: '44px', background: color, transform: `translate(${x}px, ${Y}px)` }); area.appendChild(p); return p; };
      const go = (p, keys, opt) => { const a = p.animate(keys, Object.assign({ fill: 'forwards', easing: EASE }, opt)); el._anims.push(a); return a; };
      if (step === 0) return;
      if (step === 1) {
        const p = pk(1420, 'var(--cobalt)');
        if (!animate) { p.style.transform = `translate(440px, ${Y}px)`; return; }
        go(p, [{ transform: `translate(1420px, ${Y}px)` }, { transform: `translate(440px, ${Y}px)` }], { duration: 1300, delay: 200 });
        return;
      }
      return;
      const slots = [...Array(10)].map((_, k) => 440 + k * 52);
      const ps = slots.map((x, k) => pk(1420, k === 6 ? 'var(--tomato)' : 'var(--ink)', 40));
      if (!animate) {
        ps.forEach((p, k) => p.style.transform = `translate(${slots[k]}px, ${Y}px)`);
        ps[6].style.background = 'var(--cobalt)'; note.textContent = 'packet 7 lost, resent, and everyone waited';
        return;
      }
      ps.forEach((p, k) => {
        if (k === 6) go(p, [{ transform: `translate(1420px, ${Y}px)` }, { transform: `translate(960px, ${Y}px)`, offset: .55 }, { transform: `translate(930px, ${Y + 190}px) rotate(25deg)`, opacity: 0 }],
          { duration: 1500, delay: 300 + k * 140, easing: 'cubic-bezier(.4,0,.6,1)' });
        else go(p, [{ transform: `translate(1420px, ${Y}px)` }, { transform: `translate(${slots[k]}px, ${Y}px)` }], { duration: 1200, delay: 300 + k * 140 });
      });
      el._to = setTimeout(() => {
        note.textContent = 'packet 7 lost · everyone waits'; note.style.color = 'var(--tomato)';
        note.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 400 });
        el._to = setTimeout(() => {
          const r = pk(1420, 'var(--cobalt)', 40);
          go(r, [{ transform: `translate(1420px, ${Y}px)` }, { transform: `translate(${slots[6]}px, ${Y}px)` }], { duration: 1400 });
          el._to = setTimeout(() => { note.textContent = 'packet 7 resent · now the response is complete'; note.style.color = ''; }, 1400);
        }, 1600);
      }, 2400);
    }
  });

  /* 8. Decision 03: one request per screen, one open connection */
  const seq = [['SYN', 'r', 'TCP'], ['SYN-ACK', 'l', 'TCP'], ['ACK', 'r', 'TCP'], ['ClientHello', 'r', 'TLS'], ['ServerHello', 'l', 'TLS'], ['GET /screen', 'r', 'data']];
  D.slide({ id: 'd3-roundtrips', sec: SEC, t: '14:30', bg: 'paper',
    notes: `Another decision they made was the one-request-per-screen decision, over one TCP connection that stays open.
So every new HTTPS connection costs round trips before any data moves. You need your TCP handshake, and you need the TLS handshake on top of that.
On 2G, or a poor 3G connection, one round trip can take hundreds of milliseconds, right?
So Uber decided the phone asks one question per screen, on a connection that's already open. That was decision number three.`,
    html: `
      ${dc(3)}
      <div class="abs mono" style="left:206px;top:180px">phone</div><div class="abs mono" style="left:1014px;top:180px">server</div>
      <div class="abs" style="left:250px;top:230px;width:2px;height:760px;background:var(--ink)"></div>
      <div class="abs" style="left:1060px;top:230px;width:2px;height:760px;background:var(--ink)"></div>
      <svg class="abs" width="900" height="760" style="left:200px;top:230px" fill="none" stroke-width="2.5">
        ${seq.map((r, k) => {
          const y0 = 40 + k * 118, y1 = y0 + 70, col = r[2] === 'data' ? 'var(--cobalt)' : 'var(--ink)';
          const [x0, x1] = r[1] === 'r' ? [52, 858] : [858, 52];
          const head = r[1] === 'r' ? `M${x1 - 26} ${y1 - 18} L${x1} ${y1} L${x1 - 30} ${y1 + 6}` : `M${x1 + 26} ${y1 - 18} L${x1} ${y1} L${x1 + 30} ${y1 + 6}`;
          return `<g data-a="draw" data-d="${200 + k * 380}" data-dur="500" ${r[2] !== 'data' ? 'data-dimauto="1"' : ''}><path stroke="${col}" stroke-width="${r[2] === 'data' ? 4 : 2.5}" d="M${x0} ${y0} L${x1} ${y1} ${head}"/></g>`;
        }).join('')}</svg>
      ${seq.map((r, k) => `<div class="abs mono" style="left:${r[1] === 'r' ? 300 : 700}px;top:${236 + k * 118}px;font-size:24px;color:${r[2] === 'data' ? 'var(--cobalt)' : 'var(--ink)'}" data-a="fade" data-d="${300 + k * 380}" ${r[2] !== 'data' ? 'data-dimauto="1"' : ''}>${r[0]}</div>`).join('')}
      <div class="abs" style="left:1200px;top:260px;width:600px" data-a="left" data-d="2600">
        <div class="huge red" data-ts="off" style="font-size:120px">100s of ms</div>
        <div class="mono" style="margin-top:14px">per round trip, on 2G or poor 3G</div></div>
      <div class="abs head" style="left:1200px;top:660px;width:600px;font-size:54px;border-left:3px solid var(--cobalt);padding-left:28px" data-a="right" data-d="4200">One question per screen, on a connection that's already open.</div>`,
    leave(el) { clearTimeout(el._dt); },
    on(step, el, D, animate) {
      // the handshakes fade back once the data request has arrived
      clearTimeout(el._dt);
      const ns = el.querySelectorAll('[data-dimauto]');
      if (!animate) { ns.forEach(n => n.classList.add('dimmed')); return; }
      ns.forEach(n => n.classList.remove('dimmed'));
      el._dt = setTimeout(() => ns.forEach(n => n.classList.add('dimmed')), 4000);
    }
  });

  /* 9. Decision 04: Backends for Frontends */
  const svc = ['rider', 'pricing', 'maps', 'payments', 'promos'];
  D.slide({ id: 'd4-bff', sec: SEC, t: '15:10', bg: 'paper',
    notes: `Decision number four is what changed the backend. Uber put a thin orchestration layer in the backend, shaped for the app. Sam Newman gave this pattern its name: Backends for Frontends.
[click] So instead of the phone calling five different services, the phone asks one question. That backend layer does the talking to all the other services, inside the data centre, where the network is fast.
So the phone pays for one round trip instead of five.`,
    html: `
      ${dc(4)}
      <div class="abs head" style="left:140px;top:150px;font-size:96px" data-a="rise">Backends for Frontends</div>
      <div class="abs" style="left:640px;top:360px;width:260px;height:620px;border:2px dashed var(--line)" data-a="fade" data-d="300"></div>
      <div class="abs mono" style="left:656px;top:374px;font-size:24px" data-a="fade" data-d="300">slow network</div>
      <div class="abs" style="left:1100px;top:360px;width:700px;height:620px;border:2px solid var(--ink)" data-a="fade" data-d="300"></div>
      <div class="abs mono" style="left:1120px;top:374px;font-size:24px" data-a="fade" data-d="300">data centre</div>
      <div class="abs" style="left:140px;top:540px;width:220px;height:300px;border:2.5px solid var(--ink);border-radius:32px;display:flex;align-items:center;justify-content:center" data-a="right"><span class="mono" style="color:var(--ink)">phone</span></div>
      ${svc.map((n, k) => `<div class="abs" style="left:1520px;top:${430 + k * 108}px;width:240px;height:80px;border:2px solid var(--ink);background:var(--card);display:flex;align-items:center;padding-left:22px" data-a="left" data-d="${200 + k * 90}"><span class="mono" style="color:var(--ink);font-size:26px">${n}</span></div>`).join('')}
      <div class="abs" style="left:1140px;top:620px;width:220px;height:120px;background:var(--cobalt);display:flex;align-items:center;justify-content:center" data-a="pop" data-s="1"><span class="head" style="font-size:56px;color:#fff">BFF</span></div>
      <svg class="abs" width="1920" height="1080" style="left:0;top:0" fill="none">
        ${svc.map((_, k) => `<path stroke="var(--tomato)" stroke-width="2.5" d="M360 690 C 900 690, 1100 ${470 + k * 108}, 1520 ${470 + k * 108}" data-a="draw" data-d="500" data-out="1"/>`).join('')}
        <path stroke="var(--cobalt)" stroke-width="5" d="M360 680 H1140" data-a="draw" data-s="1" data-d="300"/>
        ${svc.map((_, k) => `<path stroke="var(--ink)" stroke-width="2" d="M1360 680 C 1440 680, 1440 ${470 + k * 108}, 1520 ${470 + k * 108}" data-a="draw" data-s="1" data-d="${700 + k * 80}"/>`).join('')}
      </svg>`
  });

  /* 10. Decision 05: frameworks */
  D.slide({ id: 'd5-framework', sec: SEC, t: '16:00', bg: 'paper',
    notes: `Decision number five. They looked at React Native and Flutter, and they said no.
And it's not because those frameworks are bad. At the time, the framework library alone was six to eight megabytes. And remember, their whole budget was five megabytes.`,
    html: `
      ${dc(5)}
      <div class="abs" style="left:140px;top:180px;display:flex;gap:90px">
        ${['React Native', 'Flutter'].map((w, k) => `<span class="huge" data-ts="off" style="font-size:130px;position:relative" data-a="up" data-d="${k * 150}">${w}<i style="position:absolute;left:-2%;right:-2%;top:52%;height:8px;background:var(--tomato);transform-origin:left" data-a="wipe" data-d="${700 + k * 200}"></i></span>`).join('')}</div>
      <div class="abs mono" style="left:140px;top:520px;font-size:26px" data-a="fade" data-d="1300">Uber's budget</div>
      <div class="abs" style="left:140px;top:560px;width:1000px;height:110px;background:var(--ink);display:flex;align-items:center;padding-left:30px" data-a="wipe" data-d="1400"><span class="head" style="font-size:56px;color:var(--paper)">5 MB</span></div>
      <div class="abs mono red" style="left:140px;top:730px;font-size:26px" data-a="fade" data-d="1900">Framework library alone</div>
      <div class="abs" style="left:140px;top:770px;width:1600px;height:110px;display:flex" data-a="wipe" data-d="2100">
        <div style="width:1200px;background:var(--tomato);display:flex;align-items:center;padding-left:30px"><span class="head" style="font-size:56px;color:#fff">6–8 MB</span></div>
        <div style="width:400px;border:2px dashed var(--tomato);border-left:none"></div></div>
      <div class="abs" style="left:1140px;top:530px;width:3px;height:380px;background:var(--ink)" data-a="fade" data-d="2700"></div>`
  });

  /* 11. Decision 06: landmarks */
  D.slide({ id: 'd6-landmarks', sec: SEC, t: '16:30', bg: 'paper',
    notes: `Decision number six. They replaced typed addresses with points of interest, like landmarks.
In many cities, people give directions by landmark, and typing a full address on a slow phone is painful.`,
    html: `
      ${dc(6)}
      <div class="abs" style="left:140px;top:300px;width:800px">
        <div class="mono">Typed address</div>
        <div style="margin-top:16px;border:2px solid var(--ink);background:var(--card);padding:26px 28px;height:190px">
          <span class="code" style="font-size:38px;white-space:pre-wrap"><span data-a="type" data-cps="7" data-d="300">Flat 3, 14 Off Main Street, behind…</span><span class="caret"></span></span></div></div>
      <div class="abs" style="left:1060px;top:300px;width:720px" data-a="left" data-d="5600">
        <div class="mono">Points of interest</div>
        ${['The market', 'The filling station', 'The bus stop'].map((w, k) => `<div style="margin-top:12px;border-bottom:2px solid var(--line);padding:16px 4px;display:flex;align-items:center;gap:22px" data-a="up" data-d="${5800 + k * 180}">
          <svg width="34" height="44" viewBox="0 0 44 56"><path d="M22 54 C22 54 4 32 4 20 A18 18 0 0 1 40 20 C40 32 22 54 22 54Z" fill="var(--cobalt)"/><circle cx="22" cy="20" r="7" fill="#fff"/></svg>
          <span class="head" style="font-size:52px">${w}</span></div>`).join('')}</div>`
  });

  /* 12. Decision 07: size checks in CI */
  D.slide({ id: 'd7-ci', sec: SEC, t: '16:50', bg: 'ink',
    notes: `And then decision number seven, which I think is the most important one. They were building checks into CI that enforce the size limits they had set.
So the budget couldn't quietly grow, one dependency at a time.`,
    html: `
      ${dc(7)}
      <div class="abs head" style="left:140px;top:160px;font-size:100px" data-a="rise">Size checks in CI</div>
      <div class="term" style="left:140px;top:380px;width:1640px;height:420px" data-a="up" data-d="300">
        <div class="bar"><i></i><i></i><i></i><span style="margin-left:14px">ci · build #4812</span></div>
        <pre class="code" style="font-size:42px"><span data-a="type" data-cps="40" data-d="700"><span class="c">$ check-size app-release.apk</span>
<span class="n">  + added dependency: analytics-sdk</span>
<span class="k">  ✗ 5.3 MB  &gt;  budget 5.0 MB</span>
<span class="k">  build failed</span></span></pre></div>`
  });

  /* 13. Rows highlighted: what changed */
  D.slide({ id: 'c1-changed', sec: SEC, t: '17:00', bg: 'paper',
    notes: `Now look at everything that changed because of the environment of their users.
They changed their payload formats, how they use the network, the shape of their backend, their framework and their build pipeline.`,
    html: `
      ${D.profile({ top: TOP, hot: [0, 1], anim: 'fade', hotAt: 0 })}
      <div class="abs" style="left:140px;right:140px;top:890px;display:flex;gap:46px;flex-wrap:wrap">
        ${['Payload formats', 'Network use', 'Backend shape', 'Framework', 'Build pipeline'].map((w, k) => `<span class="head blue" style="font-size:44px" data-a="up" data-d="${700 + k * 140}">${w}</span>`).join('')}</div>`
  });

  /* 14. USSD: the phone, and how a session reaches your server */
  D.slide({ id: 'ussd', sec: SEC, t: '17:10', bg: 'ink',
    notes: `Now let's take connectivity to the extreme. If you're Nigerian or Kenyan, you know this one. You dial a short code, something like *123#, and a little text menu pops up on your phone. That's how I used to buy data back home.
It's called USSD. It runs over the mobile network's signalling channel, so it works on any GSM phone, even with no data plan and no smartphone.
And it's not like SMS. An SMS can arrive minutes later. A USSD session is a live conversation that's open right now.
[click] The mobile operator's gateway forwards every step to your server, usually as an HTTP request.
Each screen holds about 182 characters, and the sessions time out quickly.`,
    html: `
      ${phone(1400, 160, 'up', 0)}
      <div class="abs huge" data-ts="off" style="left:140px;top:170px;font-size:200px" data-a="rise" data-d="2600">USSD</div>
      <div class="abs body" style="left:140px;top:420px;width:1000px;font-size:44px;color:var(--sub)" data-a="up" data-d="2900">Any GSM phone. No data plan.</div>
      ${[['Phone', 'transparent', 'var(--fg)', '#4a4a50'], ['Operator gateway', 'transparent', 'var(--fg)', '#4a4a50'], ['Your server', 'var(--cobalt)', '#fff', 'var(--cobalt)']].map((c, k) => `
        <div class="abs" style="left:${140 + k * 400}px;top:700px;width:300px;height:140px;background:${c[1]};border:2px solid ${c[3]};display:flex;align-items:center;justify-content:center;text-align:center" data-a="pop" data-s="1" data-d="${k * 260}">
          <span style="font-family:Geist;font-weight:500;font-size:32px;color:${c[2]}">${c[0]}</span></div>`).join('')}
      <svg class="abs" width="1300" height="140" style="left:140px;top:700px" fill="none" stroke="var(--fg)" stroke-width="2.5">
        <path d="M304 70 H392 M370 54 L394 70 L370 86" data-a="draw" data-s="1" data-d="300"/><path d="M704 70 H792 M770 54 L794 70 L770 86" data-a="draw" data-s="1" data-d="560"/></svg>`,
    leave(el) { clearInterval(el._t); clearTimeout(el._t2); },
    on(step, el, D, animate) {
      const scr = el.querySelector('.scr');
      if (step !== 0) return;
      clearInterval(el._t); clearTimeout(el._t2);
      const menu = `<b>Menu</b><br>1. Buy data<br>2. Send money<br>3. Balance<br>4. My account`;
      if (!animate) { scr.innerHTML = menu; return; }
      scr.innerHTML = ''; const code = '*123#'; let k = 0;
      el._t = setInterval(() => {
        if (k < code.length) { scr.innerHTML = `<span style="font-size:52px">${code.slice(0, ++k)}</span>`; return; }
        clearInterval(el._t);
        el._t2 = setTimeout(() => { scr.innerHTML = `<span style="font-size:26px">USSD code running…</span>`; el._t2 = setTimeout(() => { scr.innerHTML = menu; scr.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 300 }); }, 900); }, 500);
      }, 260);
    }
  });

  /* 14b. Why USSD is still everyday life: who is online, and what data costs (ITU Facts and Figures 2025) */
  D.slide({ id: 'internet-gap', sec: SEC, t: '17:25', bg: 'paper',
    notes: `And here's why. In 2025, only 36 percent of people in Africa use the internet. In high-income countries, it's 94 percent.
And it's expensive. In lower-middle-income countries like Nigeria and Kenya, a mobile data plan takes about seven times as much of people's income as it does in a high-income country.
So USSD isn't nostalgia. For a lot of people, it's the network they can count on.`,
    html: `
      <div class="abs head" style="left:140px;top:110px;font-size:72px" data-a="rise">People using the internet, 2025</div>
      ${[['Africa', 36, 'var(--tomato)'], ['High-income countries', 94, 'var(--ink)']].map((r, k) => `
        <div class="abs" style="left:140px;top:${270 + k * 170}px;width:1100px">
          <div class="body" style="font-size:36px;margin-bottom:14px" data-a="fade" data-d="${400 + k * 500}">${r[0]}</div>
          <div style="display:flex;align-items:center;gap:28px">
            <div style="height:64px;width:${r[1] * 9}px;background:${r[2]};transform-origin:left" data-a="wipe" data-d="${600 + k * 500}"></div>
            <span class="head" data-ts="off" style="font-size:64px;color:${r[2]}"><span data-a="count" data-to="${r[1]}" data-suf="%" data-d="${600 + k * 500}" data-dur="1100">${r[1]}%</span></span></div></div>`).join('')}
      <div class="abs" style="left:140px;right:140px;top:690px;border-top:2px solid var(--ink);padding-top:30px;display:flex;align-items:baseline;gap:48px" data-a="up" data-d="2600">
        <span class="huge blue" data-ts="off" style="font-size:190px;line-height:.9">7×</span>
        <span class="head" style="font-size:52px;line-height:1.1;max-width:1100px">the share of income a mobile data plan takes in countries like Nigeria and Kenya</span></div>
      <div class="abs sub" style="left:140px;bottom:56px;font-size:26px" data-a="fade" data-d="3000">Source: ITU, Facts and Figures 2025. Lower-middle-income vs high-income countries.</div>`
  });

  /* 15. The session drops, they dial again, and the good design */
  D.slide({ id: 'ussd-session', sec: SEC, t: '17:35', bg: 'paper',
    notes: `So here's the design problem. The user confirms "send 5,000 naira", and the session drops before your server answers.
[click] They dial again. What should happen? [pause]
[click] The good design creates the transaction, with its own ID, the moment the user confirms.
Then when they dial again, the first thing your server does is look for a recent transaction from that phone number.
If it finds one, the first screen says "Your transfer of 5,000 naira is being processed".
So the user sees the truth, and nobody sends money twice.`,
    html: `
      ${phone(140, 160, 'up', 0)}
      <div class="abs head" style="left:700px;top:200px;width:1080px;font-size:80px" data-a="rise" data-d="200">The user confirms “send 5,000 naira”.</div>
      <div class="abs head red" style="left:700px;top:430px;width:1080px;font-size:80px" data-a="rise" data-d="2000">The session drops.</div>
      <div class="abs head" style="left:700px;top:640px;width:1080px;font-size:64px" data-a="up" data-s="1" data-out="2">They dial again. <span class="blue">What should happen?</span></div>
      <div class="abs head" style="left:700px;top:640px;width:1080px;font-size:64px" data-a="up" data-s="2" data-d="1400">The user sees the truth. <span class="blue">Nobody sends money twice.</span></div>`,
    leave(el) { clearTimeout(el._t); },
    on(step, el, D, animate) {
      const scr = el.querySelector('.scr'); clearTimeout(el._t);
      const confirm = `Send 5,000 NGN<br>to 0803 *** 4417?<br><br>1. Confirm<br>2. Cancel`;
      const dropped = `<span style="color:#9B1C0C;font-size:32px"><b>Connection problem<br>or invalid MMI code</b></span>`;
      const shake = () => scr.animate([{ transform: 'translateX(-12px)', filter: 'invert(1)' }, { transform: 'translateX(12px)' }, { transform: 'translateX(-6px)', filter: 'invert(0)' }, { transform: 'none' }], { duration: 420 });
      if (step === 0) {
        if (!animate) { scr.innerHTML = dropped; return; }
        scr.innerHTML = confirm;
        el._t = setTimeout(() => { scr.innerHTML = dropped; shake(); }, 2000);
      }
      if (step === 1) scr.innerHTML = `<span style="font-size:52px">*123#</span><span class="caret" style="height:46px"></span>`;
      if (step === 2) {
        const ok = `<b>Your transfer of 5,000 naira is being processed.</b><br><br>1. OK`;
        if (!animate) { scr.innerHTML = ok; return; }
        scr.innerHTML = `<span style="font-size:26px">USSD code running…</span>`;
        el._t = setTimeout(() => { scr.innerHTML = ok; scr.animate([{ background: '#C8D3FF' }, { background: '#D3DDB8' }], { duration: 900 }); }, 900);
      }
    }
  });

  /* 16. Werner Vogels' post, for anyone who wants to go further */
  D.slide({ id: 'vogels', sec: SEC, t: '17:55', bg: 'paper',
    notes: `Werner Vogels wrote about this in 2025, in a post called "What is USSD (and who cares)?".
The interface is from the 1990s, but behind it is a modern cloud system.`,
    html: `
      <div class="abs" style="left:140px;top:96px;width:1640px">
        <div class="mono" data-a="fade">Werner Vogels · 2025</div>
        <div class="head" style="font-size:84px;margin-top:10px" data-a="rise" data-d="150">What is USSD (and who cares)?</div></div>
      ${D.browser({ x: 340, y: 330, w: 1240, h: 700, src: 'assets/img/src-vogels-ussd.png', url: 'allthingsdistributed.com', a: 'up', d: 300 })}`
  });

  /* 19. The rows, filled in */
  const weak = ['A download budget', 'Responses that fit in one packet', 'One request per screen', 'A backend shaped for the app', 'Size checks in CI', 'USSD sessions built for the drop'];
  D.slide({ id: 'c1-filled', sec: SEC, t: '18:00', bg: 'paper',
    notes: `So let's fill in these two rows. When the network is weak and people pay for every megabyte, and the phones are old, you get decisions like these.
A download budget, responses that fit in one packet, one request per screen, a backend shaped for the app, size checks in CI, and on USSD, sessions designed for the moment they drop.
When your users are on fibre with new phones, most of these become optional.
So connectivity was about your users' network. The next story is about where your data is allowed to live.`,
    html: `
      ${D.profile({ top: 120, rows: [0, 1], hot: [0, 1], anim: 'fade' })}
      <div class="abs" style="left:140px;top:420px;width:1000px" data-a="right" data-d="200">
        <div class="mono red" style="border-top:2px solid var(--tomato);padding-top:16px">Weak, paid-for network, old phones</div>
        ${weak.map((w, k) => `<div style="margin-top:20px" data-a="up" data-d="${400 + k * 130}"><span class="body" style="font-size:40px">${w}</span></div>`).join('')}</div>
      <div class="abs" style="left:1240px;top:420px;width:540px" data-a="left" data-d="1600">
        <div class="mono blue" style="border-top:2px solid var(--cobalt);padding-top:16px">Fibre, new phones</div>
        <div class="head" style="font-size:60px;margin-top:22px">Most of these become <span class="serif blue" style="font-size:74px">optional.</span></div></div>`
  });
})();
