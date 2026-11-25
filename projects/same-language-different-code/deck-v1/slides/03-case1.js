/* CASE 1: CONNECTIVITY AND DEVICES 11:00–18:00 */
(function () {
  const D = window.D;
  const SEC = 'Case 1: Connectivity and devices';
  const TOP = 170; // same table position as the profile section

  /* Decision header: "Decision 03 / 07" + seven squares, the current one lime */
  const dh = (n, fg) => `
    <div class="abs" style="left:120px;top:84px;display:flex;align-items:center;gap:26px" data-a="fade">
      <span class="mono" style="color:${fg || 'var(--fg)'}">Uber decision ${String(n).padStart(2, '0')} / 07</span>
      <span style="display:flex;gap:8px">${Array.from({ length: 7 }, (_, k) => `<i style="display:block;width:26px;height:26px;border:3px solid ${fg || 'var(--fg)'};background:${k + 1 === n ? 'var(--lime)' : k + 1 < n ? (fg || 'var(--fg)') : 'transparent'}"></i>`).join('')}</span></div>`;

  /* A simple feature phone drawn in CSS. Screen content lives in .scr */
  const phone = (x, y, a, d) => `
    <div class="abs" style="left:${x}px;top:${y}px;width:400px;height:820px;background:#2a2a2c;border:4px solid var(--ink);border-radius:56px 56px 80px 80px;padding:56px 40px" data-a="${a || 'up'}" data-d="${d || 0}">
      <div class="scr" style="height:330px;background:#C9D6A3;border:4px solid #111;padding:22px 22px;font-family:'DM Mono';font-size:27px;line-height:1.35;color:#1a1f0c;position:relative;overflow:hidden"></div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin-top:40px">
        ${['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map(k => `<span style="height:62px;background:#3d3d40;border-radius:14px;color:#ddd;font-family:'DM Mono';font-size:28px;display:flex;align-items:center;justify-content:center">${k}</span>`).join('')}</div>
    </div>`;

  /* 1. Case title */
  D.slide({ id: 'case1-title', sec: SEC, t: '11:00', bg: 'tomato',
    notes: `Our first one is connectivity. Remember the question. How reliable and how expensive is the network for our users?
[click] And this case actually covers two rows, because it's also about devices, what hardware our users actually hold.`,
    html: `
      <div class="abs mono" style="left:120px;top:96px" data-a="fade">Case 1</div>
      <div class="abs" style="left:120px;top:200px;width:1680px" data-a="right">
        <div style="display:flex;align-items:baseline;gap:40px"><span class="mono">01</span><span class="huge" style="font-size:230px">Connectivity</span></div>
        <div class="head" style="font-size:60px;margin-left:96px;margin-top:10px">How reliable and how expensive is the network for our users?</div></div>
      <div class="abs" style="left:120px;top:620px;width:1680px" data-a="left" data-s="1">
        <div style="display:flex;align-items:baseline;gap:40px"><span class="mono">02</span><span class="huge" style="font-size:230px;color:var(--paper)">Devices</span></div>
        <div class="head" style="font-size:60px;margin-left:96px;margin-top:10px">What hardware do our users actually hold?</div></div>`
  });

  /* 2. Uber Lite source */
  D.slide({ id: 'uber-source', sec: SEC, t: '11:15', bg: 'paper',
    notes: `Our case study here is Uber. And it's a very interesting one. In 2019, Uber published how they built an app called Uber Lite. And they did something very interesting.`,
    html: `
      ${D.browser({ x: 120, y: 120, w: 1100, h: 840, src: 'assets/img/src-uber-lite.png', url: 'uber.com/blog/engineering-uber-lite', a: 'up' })}
      <div class="abs" style="left:1290px;top:150px;width:520px">
        <div class="mono muted" data-a="fade" data-d="300">Uber Engineering · January 2019</div>
        <div class="huge" style="font-size:150px;margin-top:20px" data-a="rise" data-d="400">Uber Lite</div>
        <div class="body" style="margin-top:30px;font-size:40px" data-a="up" data-d="700">An Uber app built for the phones and networks most riders actually had.</div></div>
      ${D.credit('Uber Engineering, “Expanding Access: Engineering Uber Lite”, 2019')}`
  });

  /* 3. Year Class */
  D.slide({ id: 'year-class', sec: SEC, t: '11:40', bg: 'ink',
    notes: `They didn't guess their way around. They graded their riders' phones using Year Class.
[click] If you don't know what Year Class is, Year Class is Facebook's way of scoring a phone by the year it would have been a high-end phone.`,
    leave(el) { clearInterval(el._t); },
    on(step, el, D, animate) {
      if (step !== 0) return;
      const yc = el.querySelector('.yc'); clearInterval(el._t);
      if (!animate) { yc.textContent = '2015'; return; }
      let y = 2008; yc.textContent = y;
      setTimeout(() => { el._t = setInterval(() => { yc.textContent = ++y; if (y >= 2015) clearInterval(el._t); }, 170); }, 500);
    },
    html: `
      <div class="abs mono" style="left:120px;top:96px;color:var(--sub)" data-a="fade">Year Class · Facebook</div>
      <div class="abs head" style="left:120px;top:180px;width:900px;font-size:96px;color:var(--paper)" data-a="rise">They didn't guess. They graded the phones.</div>
      <div class="abs" style="left:1240px;top:140px;width:420px;height:800px;border:5px solid var(--paper);border-radius:48px" data-a="zoom" data-d="200">
        <div style="position:absolute;left:30px;right:30px;top:80px;bottom:110px;background:#1d1d20;display:flex;flex-direction:column;align-items:center;justify-content:center">
          <div class="mono" style="color:var(--sub)">year class</div>
          <div class="huge lime" style="font-size:170px;margin-top:10px"><span class="yc">2015</span></div></div></div>
      <div class="abs body" style="left:120px;top:640px;width:980px;font-size:46px;color:var(--paper);border-top:3px solid var(--lime);padding-top:30px" data-a="up" data-s="1">The year in which this phone would have been a <span class="hl" data-s="1" data-d="500" style="--hlc:var(--lime);color:var(--ink)">high-end phone.</span></div>`
  });

  /* 4. Three numbers */
  D.slide({ id: 'uber-numbers', sec: SEC, t: '12:00', bg: 'ink',
    notes: `So Uber realised something very interesting when they did this. They realised that 56 percent of their riders were on phones from Year Class 2015 or older.
[click] In one of their biggest markets, 46 million riders were on phones in the 2013 class.
[click] And a third of rides were being booked on networks slower than 3G.
[fact note: the market with 46 million riders on 2013-class phones is India, per Uber's post.]`,
    html: `
      ${[['56', '%', 'of riders on phones from Year Class 2015 or older', 'var(--paper)', 0], ['46', ' million', 'riders in India on phones in the 2013 class', 'var(--tomato)', 1], ['33', '%', 'of rides booked on networks slower than 3G', 'var(--lime)', 2]].map((c, k) => `
        <div class="abs" style="left:${[120, 620, 1380][k]}px;top:220px;width:${[460, 700, 420][k]}px;border-top:4px solid ${c[3]};padding-top:30px" data-a="up" data-s="${c[4]}">
          <div class="huge" style="font-size:${k === 1 ? 150 : 210}px;line-height:${k === 1 ? 1.4 : .86};color:${c[3]};white-space:nowrap"><span data-a="count" data-s="${c[4]}" data-to="${c[0]}" data-suf="${c[1]}" data-dur="1300">${c[0]}${c[1]}</span></div>
          <div class="body" style="font-size:40px;color:var(--paper);margin-top:30px">${c[2]}</div></div>`).join('')}
      ${D.credit('Uber Engineering, 2019')}`
  });

  /* 5. The mismatch */
  D.slide({ id: 'uber-mismatch', sec: SEC, t: '12:40', bg: 'tomato',
    notes: `So this brought Uber to a very interesting problem. The Uber app had been designed for an environment that most of its riders did not live in.`,
    html: `
      <div class="abs head" style="left:120px;top:200px;width:1680px;font-size:126px;line-height:1.0">
        ${D.words('The app had been designed for an', { gap: 55 })} <span class="hl" data-d="900" style="--hlc:var(--ink);color:var(--paper)">${D.words('environment', { d: 380 })}</span> ${D.words('most of its riders did not live in.', { d: 450, gap: 55 })}</div>`
  });

  /* 6. Decision 01: under 5 MB */
  D.slide({ id: 'd1-5mb', sec: SEC, t: '13:00', bg: 'paper',
    notes: `So this is what Uber decided. They made some very daring decisions.
First of all, they decided that their download size would be under five megabytes. That's literally less than three selfies, and that was their own description.
[click] Basically, they realised that for users on prepaid data, a big download costs money. And on a slow network, a lot of downloads just don't finish. So that was decision number one that Uber made, that the app has to be under five megabytes to download.`,
    html: `
      ${dh(1)}
      <div class="abs" style="left:120px;top:170px;display:flex;align-items:baseline;gap:30px"><span class="huge" style="font-size:280px">&lt; 5 MB</span><span class="sub">download size</span></div>
      <div class="abs" style="left:120px;top:520px;width:1680px;height:90px;border:4px solid var(--ink)">
        <div style="position:absolute;left:0;top:0;bottom:0;width:48%;background:var(--ink)" data-a="wipe" data-d="400"></div>
        <div style="position:absolute;left:50%;top:-30px;bottom:-30px;width:5px;background:var(--tomato)"></div></div>
      <div class="abs mono" style="left:120px;top:630px" data-a="fade" data-d="400">0 MB</div>
      <div class="abs mono red" style="left:900px;top:630px" data-a="fade" data-d="600">budget 5 MB</div>
      <div class="abs mono muted" style="left:1690px;top:630px" data-a="fade" data-d="600">10 MB</div>
      <div class="abs" style="left:120px;top:730px;display:flex;align-items:center;gap:20px">
        ${[0, 1, 2].map(k => `<div style="width:150px;height:190px;background:var(--card);border:3px solid var(--ink);padding:12px;transform:rotate(${[-5, 2, -2][k]}deg)" data-a="drop" data-d="${900 + k * 150}"><div style="height:120px;background:var(--line)"></div><div class="mono" style="font-size:20px;margin-top:10px">selfie.jpg</div></div>`).join('')}
        <span class="serif" style="font-size:72px;margin-left:30px" data-a="fade" data-d="1400">“less than three selfies”</span></div>
      <div class="abs" style="left:1180px;top:190px;width:620px;background:var(--tomato);padding:26px 34px" data-a="wipe" data-s="1">
        <div class="head" style="font-size:46px">On prepaid data, every megabyte is money.</div>
        <div class="body" style="font-size:36px;margin-top:10px">On a slow network, big downloads don't finish.</div></div>`
  });

  /* 7. Decision 02: one packet */
  D.slide({ id: 'd2-mtu', sec: SEC, t: '13:40', bg: 'ink',
    notes: `The next decision they made is a very interesting one. Every network response has to fit into one packet. So it has to be under one MTU. MTU means maximum transmission unit, which is the biggest packet that a network link carries in one go. On Ethernet, that's 1,500 bytes. So basically, no response bigger than one packet.
[click] And if a response fits into one packet, it either arrives or it doesn't.
[click] But if your response needs ten packets, for example, and one of them gets lost, TCP has to resend it and wait.
And on a weak mobile network, that's not good news. So again, decision number two was to make sure that responses fit under one MTU.`,
    html: `
      ${dh(2, 'var(--paper)')}
      <div class="abs" style="left:120px;top:160px;display:flex;align-items:baseline;gap:34px;color:var(--paper)"><span class="huge" style="font-size:200px">1 response = 1 packet</span></div>
      <div class="abs mono" style="left:120px;top:370px;color:var(--sub)" data-a="fade" data-d="300">MTU · maximum transmission unit · Ethernet: 1,500 bytes</div>
      <div class="abs mono" style="left:120px;top:470px;color:var(--sub)">phone</div><div class="abs mono" style="right:120px;top:470px;color:var(--sub)">server</div>
      <div class="abs" style="left:120px;right:120px;top:600px;height:3px;background:var(--sub)"></div>
      <div class="abs" style="left:120px;right:120px;top:830px;height:3px;background:var(--sub)"></div>
      <div class="abs" id="one" style="left:1580px;top:540px;width:220px;height:120px;background:var(--lime);display:flex;align-items:center;justify-content:center" data-a="fade" data-s="1"><span class="mono" style="color:var(--ink)">≤ 1,500 B</span></div>
      <div class="abs mono lime" style="left:120px;top:520px" data-a="fade" data-s="1" data-d="900">arrives, or it doesn't</div>
      <div class="abs" id="ten" style="left:120px;top:790px;width:1680px;height:80px" data-a="fade" data-s="2">
        ${Array.from({ length: 10 }, (_, k) => `<i class="pk" data-k="${k}" style="position:absolute;top:0;left:${k * 84}px;width:70px;height:80px;background:${k === 6 ? 'var(--tomato)' : 'var(--paper)'}"></i>`).join('')}</div>
      <div class="abs mono red" style="left:120px;top:900px" data-a="fade" data-s="2" data-d="1500">packet 7 lost · TCP resends it and waits</div>`,
    leave(el) { (el._anims || []).forEach(a => a.cancel()); },
    on(step, el, D, animate) {
      const one = el.querySelector('#one'), pks = [...el.querySelectorAll('.pk')];
      if (step === 1 && animate) {
        el._anims = [one.animate([{ transform: 'translateX(-1460px)' }, { transform: 'translateX(0)' }], { duration: 1400, easing: 'cubic-bezier(.16,1,.3,1)' })];
      }
      if (step >= 2) {
        pks.forEach((p, k) => {
          const final = 'translateX(840px)';
          if (!animate) { p.style.transform = k === 6 ? 'translate(500px, 160px) rotate(40deg)' : final; p.style.opacity = k === 6 ? 0 : 1; if (k === 6) { p.style.transform = final; p.style.opacity = 1; p.style.outline = '4px dashed var(--lime)'; } return; }
          if (k !== 6) {
            p.style.transition = 'none'; p.style.transform = 'translateX(0)'; void p.offsetWidth;
            p.style.transition = `transform 1.5s cubic-bezier(.16,1,.3,1) ${k * 70}ms`; p.style.transform = final;
          } else {
            p.style.transform = final; p.style.outline = '4px dashed var(--lime)';
            p.animate([
              { transform: 'translateX(0)', opacity: 1, offset: 0 },
              { transform: 'translate(520px, 0)', opacity: 1, offset: .25 },
              { transform: 'translate(600px, 140px) rotate(40deg)', opacity: 0, offset: .4 },
              { transform: 'translateX(0)', opacity: 0, offset: .55 },
              { transform: 'translateX(0)', opacity: 1, offset: .6 },
              { transform: final, opacity: 1, offset: 1 }], { duration: 4200, delay: 420, easing: 'linear', fill: 'backwards' });
          }
        });
      }
    }
  });

  /* 8. Decision 03: one request per screen, one open connection */
  const seq = [['SYN', 'r', 'TCP'], ['SYN-ACK', 'l', 'TCP'], ['ACK', 'r', 'TCP'], ['ClientHello', 'r', 'TLS'], ['ServerHello', 'l', 'TLS'], ['GET /screen', 'r', 'data']];
  D.slide({ id: 'd3-roundtrips', sec: SEC, t: '14:30', bg: 'paper',
    notes: `Another decision they made was the one-request-per-screen decision, over one TCP connection that stays open.
So every new HTTPS connection costs round trips before any data moves. You need your TCP handshake, and you need the TLS handshake on top of that.
[click] On 2G, or a poor 3G connection, one round trip can take hundreds of milliseconds, right?
[click] So Uber decided the phone asks one question per screen, on a connection that's already open. That was decision number three.`,
    html: `
      ${dh(3)}
      <div class="abs mono" style="left:200px;top:170px">phone</div><div class="abs mono" style="left:1010px;top:170px">server</div>
      <div class="abs" style="left:250px;top:230px;width:4px;height:760px;background:var(--ink)"></div>
      <div class="abs" style="left:1060px;top:230px;width:4px;height:760px;background:var(--ink)"></div>
      <svg class="abs" width="900" height="760" style="left:200px;top:230px" fill="none" stroke-width="5">
        ${seq.map((r, k) => {
          const y0 = 40 + k * 118, y1 = y0 + 70, col = r[2] === 'data' ? 'var(--cobalt)' : 'var(--ink)';
          const [x0, x1] = r[1] === 'r' ? [52, 858] : [858, 52];
          const head = r[1] === 'r' ? `M${x1 - 30} ${y1 - 22} L${x1} ${y1} L${x1 - 34} ${y1 + 8}` : `M${x1 + 30} ${y1 - 22} L${x1} ${y1} L${x1 + 34} ${y1 + 8}`;
          return `<g data-a="draw" data-d="${200 + k * 380}" data-dur="500" ${r[2] !== 'data' ? 'data-dim="2"' : ''}><path stroke="${col}" d="M${x0} ${y0} L${x1} ${y1} ${head}"/></g>`;
        }).join('')}</svg>
      ${seq.map((r, k) => `<div class="abs mono" style="left:${r[1] === 'r' ? 300 : 680}px;top:${232 + k * 118}px;font-size:28px;color:${r[2] === 'data' ? 'var(--cobalt)' : 'var(--ink)'}" data-a="fade" data-d="${300 + k * 380}" ${r[2] !== 'data' ? 'data-dim="2"' : ''}>${r[0]}</div>`).join('')}
      <div class="abs" style="left:1180px;top:240px;width:620px" data-a="left" data-s="1">
        <div class="mono red">On 2G or poor 3G</div>
        <div class="huge" style="font-size:140px;margin-top:10px">100s of ms</div>
        <div class="body" style="font-size:38px;margin-top:10px">for one round trip</div></div>
      <div class="abs" style="left:1180px;top:640px;width:620px;background:var(--lime);padding:30px 34px" data-a="wipe" data-s="2">
        <div class="head" style="font-size:56px">One question per screen, on a connection that's already open.</div></div>`
  });

  /* 9. Decision 04: Backends for Frontends */
  const svc = ['rider', 'pricing', 'maps', 'payments', 'promos'];
  D.slide({ id: 'd4-bff', sec: SEC, t: '15:10', bg: 'cobalt',
    notes: `Decision number four is what changed the backend. Uber put a thin layer in the backend that's shaped for the app. This pattern is called Backends for Frontends.
[click] So instead of the phone calling five different services, the phone asks one question. That backend layer does the talking to all the other services, inside the data centre, where the network is fast.
[click] So the phone pays for one round trip instead of five.
[fact note: Uber's post calls it "a thin orchestration layer"; the pattern name Backends for Frontends comes from Sam Newman.]`,
    html: `
      ${dh(4, 'var(--paper)')}
      <div class="abs huge" style="left:120px;top:150px;font-size:120px;color:var(--paper)" data-a="rise">Backends for Frontends</div>
      <div class="abs mono" style="left:120px;top:285px;color:var(--sub)" data-a="fade" data-d="300">Uber: “a thin orchestration layer” · pattern name: Sam Newman</div>
      <div class="abs" style="left:640px;top:360px;width:260px;height:640px;border:3px dashed var(--sub)" data-a="fade" data-d="300"></div>
      <div class="abs mono" style="left:650px;top:370px;font-size:26px;color:var(--sub)" data-a="fade" data-d="300">slow mobile network</div>
      <div class="abs" style="left:1100px;top:360px;width:700px;height:640px;border:3px solid var(--paper)" data-a="fade" data-d="300"></div>
      <div class="abs mono" style="left:1120px;top:370px;font-size:26px;color:var(--lime)" data-a="fade" data-d="300">data centre · fast network</div>
      <div class="abs" style="left:140px;top:560px;width:220px;height:300px;border:5px solid var(--paper);border-radius:34px;display:flex;align-items:center;justify-content:center" data-a="right"><span class="mono" style="color:var(--paper)">phone</span></div>
      ${svc.map((n, k) => `<div class="abs" style="left:1520px;top:${430 + k * 112}px;width:240px;height:86px;background:var(--paper);display:flex;align-items:center;padding-left:24px" data-a="left" data-d="${200 + k * 90}"><span class="mono" style="color:var(--ink)">${n}</span></div>`).join('')}
      <div class="abs" style="left:1140px;top:600px;width:220px;height:140px;background:var(--lime);display:flex;align-items:center;justify-content:center" data-a="pop" data-s="1"><span class="huge" style="font-size:72px;color:var(--ink)">BFF</span></div>
      <svg class="abs" width="1920" height="1080" style="left:0;top:0" fill="none" stroke-width="4">
        ${svc.map((_, k) => `<path stroke="var(--tomato)" d="M360 710 C 900 710, 1100 ${473 + k * 112}, 1520 ${473 + k * 112}" data-a="draw" data-d="${500 + k * 120}" data-out="1"/>`).join('')}
        <path stroke="var(--lime)" stroke-width="8" d="M360 670 H1140" data-a="draw" data-s="1" data-d="300"/>
        ${svc.map((_, k) => `<path stroke="var(--paper)" d="M1360 670 C 1440 670, 1440 ${473 + k * 112}, 1520 ${473 + k * 112}" data-a="draw" data-s="1" data-d="${700 + k * 80}"/>`).join('')}
      </svg>
      <div class="abs tile" style="left:140px;top:910px;font-size:50px;background:var(--lime);color:var(--ink);padding:4px 20px" data-a="pop" data-s="2">1 round trip, not 5</div>
      ${D.credit('Uber Engineering, 2019 · Sam Newman, “Backends For Frontends”')}`
  });

  /* 10. Decision 05: frameworks */
  D.slide({ id: 'd5-framework', sec: SEC, t: '16:00', bg: 'paper',
    notes: `Decision number five. They looked at React Native and Flutter, and they said no.
[click] And it's not because those frameworks are bad. At the time, the runtime alone was six to eight megabytes. And remember, their whole budget was five megabytes.
[fact note: Uber's post says the framework "library" was 6–8 MB.]`,
    html: `
      ${dh(5)}
      <div class="abs" style="left:120px;top:170px;display:flex;gap:90px">
        ${['React Native', 'Flutter'].map((w, k) => `<span class="huge" style="font-size:150px;position:relative" data-a="up" data-d="${k * 150}">${w}<i style="position:absolute;left:-2%;right:-2%;top:48%;height:14px;background:var(--tomato);transform-origin:left" data-a="wipe" data-d="${700 + k * 200}"></i></span>`).join('')}</div>
      <div class="abs mono muted" style="left:120px;top:420px" data-a="fade" data-d="1100">Not because they're bad</div>
      <div class="abs mono" style="left:120px;top:560px" data-a="fade" data-s="1">The whole app budget</div>
      <div class="abs" style="left:120px;top:610px;width:${5 * 200}px;height:110px;background:var(--ink);display:flex;align-items:center;padding-left:30px" data-a="wipe" data-s="1" data-d="100"><span class="huge" style="font-size:72px;color:var(--paper)">5 MB</span></div>
      <div class="abs mono red" style="left:120px;top:780px" data-a="fade" data-s="1" data-d="500">The framework library alone</div>
      <div class="abs" style="left:120px;top:830px;width:${8 * 200}px;height:110px;display:flex" data-a="wipe" data-s="1" data-d="700">
        <div style="width:${6 * 200}px;background:var(--tomato);display:flex;align-items:center;padding-left:30px"><span class="huge" style="font-size:72px">6–8 MB</span></div>
        <div style="width:${2 * 200}px;border:4px dashed var(--tomato);border-left:none"></div></div>
      <div class="abs" style="left:1120px;top:600px;width:6px;height:360px;background:var(--ink)" data-a="fade" data-s="1" data-d="1300"></div>`
  });

  /* 11. Decision 06: landmarks */
  D.slide({ id: 'd6-landmarks', sec: SEC, t: '16:30', bg: 'lime',
    notes: `Decision number six. They replaced typed addresses with points of interest, like landmarks.
[click] In many cities, people give directions by landmark, and typing a full address on a slow phone is painful.`,
    html: `
      ${dh(6)}
      <div class="abs" style="left:120px;top:190px;width:820px">
        <div class="mono">Typed address</div>
        <div style="margin-top:16px;border:4px solid var(--ink);background:var(--card);padding:26px 28px;height:200px">
          <span class="code" style="font-size:40px;white-space:pre-wrap"><span data-a="type" data-cps="7" data-d="300">Flat 3, 14 Off Main Street, behind…</span><span class="caret"></span></span></div>
        <div class="mono" style="margin-top:16px;color:var(--sub)" data-a="fade" data-d="1500">slow phone · slow network · still typing</div></div>
      <div class="abs" style="left:1040px;top:190px;width:760px" data-a="left" data-s="1">
        <div class="mono">Points of interest</div>
        ${['The market', 'The filling station', 'The bus stop'].map((w, k) => `<div style="margin-top:16px;background:var(--ink);color:var(--paper);padding:22px 28px;display:flex;align-items:center;gap:24px" data-a="up" data-s="1" data-d="${200 + k * 150}">
          <svg width="44" height="56" viewBox="0 0 44 56"><path d="M22 54 C22 54 4 32 4 20 A18 18 0 0 1 40 20 C40 32 22 54 22 54Z" fill="var(--tomato)"/></svg>
          <span class="head" style="font-size:56px">${w}</span></div>`).join('')}</div>
      <div class="abs head" style="left:120px;top:800px;width:1680px;font-size:72px" data-a="rise" data-s="1" data-d="800">People give directions by <span class="serif" style="font-size:88px">landmark.</span></div>`
  });

  /* 12. Decision 07: size checks in CI */
  D.slide({ id: 'd7-ci', sec: SEC, t: '16:50', bg: 'ink',
    notes: `And then decision number seven, which I think is the most important one. They built checks into CI that enforce the size limits they had set.
[click] So the budget couldn't quietly grow, one dependency at a time.
[fact note: in 2019 Uber wrote that they were "enhancing our CI pipelines" with size checks, so they were being built at the time.]`,
    html: `
      ${dh(7, 'var(--paper)')}
      <div class="abs huge" style="left:120px;top:160px;font-size:170px;color:var(--paper)" data-a="rise">Size checks in CI</div>
      <div class="term" style="left:120px;top:400px;width:1680px;height:430px" data-a="up" data-d="300">
        <div class="bar"><i></i><i></i><i></i><span style="margin-left:14px">ci · build #4812</span></div>
        <pre class="code" style="font-size:44px"><span data-a="type" data-cps="40" data-d="700"><span class="c">$ check-size app-release.apk</span>
<span class="n">  + added dependency: analytics-sdk</span>
<span class="k">  ✗ 5.3 MB  &gt;  budget 5.0 MB</span>
<span class="k">  build failed</span></span></pre></div>
      <div class="abs head" style="left:120px;top:880px;width:1680px;font-size:68px;color:var(--paper)" data-a="rise" data-s="1">So the budget can't quietly grow, <span class="lime">one dependency at a time.</span></div>`
  });

  /* 13. Rows highlighted: what changed */
  D.slide({ id: 'c1-changed', sec: SEC, t: '17:00', bg: 'paper',
    notes: `Now look at everything that changed because of the environment of their users.
[click] They changed their payload formats, how they use the network, the shape of their backend, their framework and their build pipeline.`,
    html: `
      <div class="abs mono" style="left:120px;top:84px" data-a="fade">The Environment Profile</div>
      ${D.profile({ top: TOP, hot: [0, 1], anim: 'fade', hotAt: 0 })}
      <div class="abs" style="left:120px;right:120px;top:880px;display:flex;gap:16px;flex-wrap:wrap">
        ${['Payload formats', 'Network use', 'Backend shape', 'Framework', 'Build pipeline'].map((w, k) => `<span class="tile" style="font-size:66px;background:var(--lime);color:var(--ink);padding:6px 20px" data-a="drop" data-s="1" data-d="${k * 140}">${w}</span>`).join('')}</div>`
  });

  /* 14. USSD: the extreme */
  D.slide({ id: 'ussd-phone', sec: SEC, t: '17:10', bg: 'ink',
    notes: `Now let's take connectivity to the extreme. If you're Nigerian or Kenyan, you know this one. You dial a short code, something like *123#, and a little text menu pops up on your phone. That's how I used to buy data back home.
[click] It's called USSD. It runs over the mobile network's signalling channel, so it works on any GSM phone, even with no data plan and no smartphone.
[click] And it's not like SMS. An SMS can arrive minutes later. A USSD session is a live conversation that's open right now.`,
    html: `
      ${phone(1300, 130, 'up', 0)}
      <div class="abs huge" style="left:120px;top:150px;font-size:300px;color:var(--paper)" data-a="rise" data-s="1">USSD</div>
      <div class="abs body" style="left:120px;top:450px;width:1000px;font-size:46px;color:var(--paper)" data-a="up" data-s="1" data-d="200">Works on any GSM phone. No data plan. No smartphone.</div>
      <div class="abs" style="left:120px;top:690px;width:1040px;display:grid;grid-template-columns:1fr 1fr;gap:30px">
        <div style="border-top:4px solid var(--sub);padding-top:20px" data-a="up" data-s="2"><div class="mono" style="color:var(--sub)">SMS</div><div class="head" style="font-size:52px;color:var(--sub);margin-top:10px">Can arrive minutes later</div></div>
        <div style="border-top:4px solid var(--lime);padding-top:20px" data-a="up" data-s="2" data-d="200"><div class="mono lime">USSD</div><div class="head" style="font-size:52px;color:var(--paper);margin-top:10px">A live session, open right now</div></div></div>`,
    leave(el) { clearInterval(el._t); },
    on(step, el, D, animate) {
      const scr = el.querySelector('.scr');
      if (step !== 0) return;
      clearInterval(el._t);
      const menu = `<b>Menu</b><br>1. Buy data<br>2. Send money<br>3. Balance<br>4. My account`;
      if (!animate) { scr.innerHTML = menu; return; }
      scr.innerHTML = ''; const code = '*123#'; let k = 0;
      el._t = setInterval(() => {
        if (k < code.length) { scr.innerHTML = `<span style="font-size:56px">${code.slice(0, ++k)}</span>`; return; }
        clearInterval(el._t);
        setTimeout(() => { scr.innerHTML = `<span style="font-size:30px">USSD code running…</span>`; setTimeout(() => { scr.innerHTML = menu; scr.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 300 }); }, 900); }, 500);
      }, 260);
    }
  });

  /* 15. How a USSD session reaches your server */
  D.slide({ id: 'ussd-flow', sec: SEC, t: '17:30', bg: 'paper',
    notes: `The mobile operator's gateway forwards every step to your server, usually as an HTTP request.
[click] Each screen holds about 182 characters, and the sessions time out quickly.`,
    html: `
      <div class="abs huge" style="left:120px;top:110px;font-size:120px" data-a="rise">Every step goes to your server</div>
      ${[['Phone', 'var(--card)', 'var(--ink)'], ['Operator gateway', 'var(--ink)', 'var(--paper)'], ['Your server', 'var(--cobalt)', 'var(--paper)']].map((c, k) => `
        <div class="abs" style="left:${120 + k * 620}px;top:380px;width:440px;height:200px;background:${c[1]};border:4px solid var(--ink);display:flex;align-items:center;justify-content:center" data-a="pop" data-d="${200 + k * 300}">
          <span class="huge" style="font-size:56px;color:${c[2]}">${c[0]}</span></div>`).join('')}
      <svg class="abs" width="1920" height="300" style="left:0;top:380px" fill="none" stroke="var(--ink)" stroke-width="5">
        <path d="M560 100 H740 M710 75 L742 100 L710 125" data-a="draw" data-d="600"/><path d="M1180 100 H1360 M1330 75 L1362 100 L1330 125" data-a="draw" data-d="900"/></svg>
      <div class="abs mono" style="left:575px;top:330px;font-size:26px" data-a="fade" data-d="700">signalling</div>
      <div class="abs mono" style="left:1220px;top:330px;font-size:26px" data-a="fade" data-d="1000">HTTP</div>
      <div class="abs" style="left:120px;top:720px;width:1680px;display:grid;grid-template-columns:1fr 1fr;gap:60px">
        <div style="border-top:4px solid var(--ink);padding-top:24px" data-a="up" data-s="1"><div class="huge" style="font-size:150px">182</div><div class="body">characters on a screen</div></div>
        <div style="border-top:4px solid var(--tomato);padding-top:24px" data-a="up" data-s="1" data-d="200"><div class="huge red" style="font-size:150px">Short</div><div class="body">sessions time out quickly</div></div></div>
      ${D.credit('182 characters: the GSM USSD message limit')}`
  });

  /* 16. The session drops */
  D.slide({ id: 'ussd-drop', sec: SEC, t: '17:40', bg: 'paper',
    notes: `So here's the design problem. The user confirms "send 5,000 naira",
[click] and the session drops before your server answers.
[click] They dial again. What should happen? [pause]`,
    html: `
      ${phone(140, 130, 'up', 0)}
      <div class="abs mono red" style="left:700px;top:180px" data-a="fade">The design problem</div>
      <div class="abs head" style="left:700px;top:240px;width:1100px;font-size:96px" data-a="rise" data-d="200">The user confirms “send 5,000 naira”.</div>
      <div class="abs head red" style="left:700px;top:520px;width:1100px;font-size:96px" data-a="rise" data-s="1" data-d="400">The session drops before your server answers.</div>
      <div class="abs" style="left:700px;top:820px;width:1100px;background:var(--ink);color:var(--paper);padding:24px 36px" data-a="wipe" data-s="2"><span class="head" style="font-size:60px">They dial again. <span class="lime">What should happen?</span></span></div>`,
    on(step, el, D, animate) {
      const scr = el.querySelector('.scr');
      if (step === 0) scr.innerHTML = `Send 5,000 NGN<br>to 0803 *** 4417?<br><br>1. Confirm<br>2. Cancel`;
      if (step === 1) {
        scr.innerHTML = `<span style="color:#9B1C0C;font-size:36px"><b>Connection problem<br>or invalid MMI code</b></span>`;
        if (animate) scr.animate([{ transform: 'translateX(-12px)', filter: 'invert(1)' }, { transform: 'translateX(12px)' }, { transform: 'translateX(-6px)', filter: 'invert(0)' }, { transform: 'none' }], { duration: 420 });
      }
      if (step === 2) scr.innerHTML = `<span style="font-size:56px">*123#</span><span class="caret" style="height:50px"></span>`;
    }
  });

  /* 17. The good design */
  D.slide({ id: 'ussd-good', sec: SEC, t: '17:50', bg: 'cobalt',
    notes: `The good design creates the transaction, with its own ID, the moment the user confirms.
[click] Then when they dial again, the first thing your server does is look for a recent transaction from that phone number.
[click] If it finds one, the first screen says "Your transfer of 5,000 naira is being processed".
[click] So the user sees the truth, and nobody sends money twice.`,
    html: `
      ${phone(1360, 130, 'left', 0)}
      <div class="abs mono" style="left:120px;top:110px;color:var(--lime)" data-a="fade">On confirm</div>
      <div class="abs" style="left:120px;top:170px;width:1140px;background:#0B0B0C;border:3px solid var(--paper);padding:30px 36px" data-a="up">
        <div class="code" style="font-size:36px;color:#EDE6D6"><span data-a="type" data-cps="38" data-d="300"><span class="c">INSERT transfer</span>
<span class="f">id</span>      txn_7Q4K
<span class="f">phone</span>   0803 *** 4417
<span class="f">amount</span>  5,000 NGN
<span class="f">status</span>  <span class="s">PROCESSING</span></span></div></div>
      <div class="abs mono" style="left:120px;top:640px;color:var(--lime)" data-a="fade" data-s="1">On redial</div>
      <div class="abs code" style="left:120px;top:690px;font-size:38px;color:var(--paper)" data-a="wipe" data-s="1" data-d="200">find recent transfer WHERE phone = caller</div>
      <div class="abs head" style="left:120px;top:850px;width:1140px;font-size:72px;color:var(--paper)" data-a="rise" data-s="3">The user sees the truth. <span class="lime">Nobody sends money twice.</span></div>`,
    on(step, el) {
      const scr = el.querySelector('.scr');
      if (step <= 1) scr.innerHTML = step === 0 ? `1. Confirm ✓<br><br><span style="opacity:.6">sending…</span>` : `<span style="font-size:56px">*123#</span>`;
      if (step >= 2) { scr.innerHTML = `<b>Your transfer of 5,000 naira is being processed.</b><br><br>1. OK`; scr.animate([{ background: '#D4F04A' }, { background: '#C9D6A3' }], { duration: 900 }); }
    }
  });

  /* 18. Werner Vogels source */
  D.slide({ id: 'vogels', sec: SEC, t: '17:55', bg: 'paper',
    notes: `Werner Vogels wrote about this in 2025, in a post called "What is USSD (and who cares)?".
[click] The interface is from the 1990s, but behind it is a modern cloud system.`,
    html: `
      ${D.browser({ x: 120, y: 120, w: 980, h: 860, src: 'assets/img/src-vogels-ussd.png', url: 'allthingsdistributed.com', a: 'zoom', imgStyle: 'width:200%;margin-left:-58%;margin-top:-10px' })}
      <div class="abs" style="left:1180px;top:150px;width:640px">
        <div class="mono muted" data-a="fade" data-d="300">Werner Vogels · October 2025</div>
        <div class="huge" style="font-size:110px;margin-top:20px" data-a="rise" data-d="400">What is USSD (and who cares)?</div></div>
      <div class="abs" style="left:1180px;top:640px;width:640px" data-a="up" data-s="1">
        <div style="display:flex;align-items:baseline;gap:20px"><span class="huge" style="font-size:90px">1990s</span><span class="mono muted">interface</span></div>
        <div style="display:flex;align-items:baseline;gap:20px;margin-top:10px"><span class="huge blue" style="font-size:90px">Cloud</span><span class="mono muted">behind it</span></div></div>
      ${D.credit('allthingsdistributed.com, 29 October 2025')}`
  });

  /* 19. The rows, filled in */
  const weak = ['A download budget', 'Responses that fit in one packet', 'One request per screen', 'A backend shaped for the app', 'Size checks in CI', 'USSD sessions designed for the moment they drop'];
  D.slide({ id: 'c1-filled', sec: SEC, t: '18:00', bg: 'paper',
    notes: `So let's fill in these two rows. When the network is weak and people pay for every megabyte, and the phones are old, you get decisions like these.
A download budget, responses that fit in one packet, one request per screen, a backend shaped for the app, size checks in CI, and on USSD, sessions designed for the moment they drop.
[click] When your users are on fibre with new phones, most of these become optional.
[click] So connectivity was about your users' network. The next case is about where your data is allowed to live.`,
    html: `
      <div class="abs mono" style="left:120px;top:84px" data-a="fade">The Environment Profile · filled in</div>
      ${D.profile({ top: TOP, rows: [0, 1], hot: [0, 1], anim: 'fade' })}
      <div class="abs" style="left:120px;top:440px;width:1040px" data-a="right" data-d="200">
        <div class="mono red" style="border-top:4px solid var(--tomato);padding-top:16px">Weak, paid-for network · old phones</div>
        ${weak.map((w, k) => `<div style="display:flex;gap:20px;align-items:baseline;margin-top:16px" data-a="up" data-d="${400 + k * 130}"><span class="mono" style="background:var(--lime);padding:0 8px;font-size:26px">${String(k + 1).padStart(2, '0')}</span><span class="body" style="font-size:40px">${w}</span></div>`).join('')}</div>
      <div class="abs" style="left:1240px;top:440px;width:560px" data-a="left" data-s="1">
        <div class="mono blue" style="border-top:4px solid var(--cobalt);padding-top:16px">Fibre · new phones</div>
        <div class="head" style="font-size:64px;margin-top:22px">Most of these become <span class="serif blue" style="font-size:78px">optional.</span></div></div>
      <div class="abs tile" style="left:1240px;top:880px;font-size:52px;background:var(--ink);color:var(--paper);padding:6px 20px" data-a="pop" data-s="2">Next: where data may live</div>`
  });
})();
