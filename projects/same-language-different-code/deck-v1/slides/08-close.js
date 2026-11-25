/* CLOSE 37:30–40:00 */
(function () {
  const D = window.D;
  const SEC = 'Close';
  const C = window.CONFIG || {};

  function qrSvg(url, size) {
    if (!window.qrcode) return `<div class="mono">QR library missing</div>`;
    const q = qrcode(0, 'M'); q.addData(url); q.make();
    const n = q.getModuleCount(), m = 2, cell = size / (n + m * 2);
    let r = '';
    for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) if (q.isDark(y, x)) r += `<rect x="${((x + m) * cell).toFixed(2)}" y="${((y + m) * cell).toFixed(2)}" width="${(cell + .3).toFixed(2)}" height="${(cell + .3).toFixed(2)}"/>`;
    return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" style="display:block;background:#fff" fill="#111"><g>${r}</g></svg>`;
  }

  /* 1. Three takeaways */
  D.slide({ id: 'takeaways', sec: SEC, t: '37:30', bg: 'paper',
    notes: `So, I want you to take 3 things home.
[click] The first one is the Environment Profile down. Six rows, considerations and assessments for where you built your system and for where it's going, and for every row that's different, ask whether it changes a setting or a decision.
[click] And the 2nd one is to test it for your users. Their network, their clocks, their laws, and their phones.
[click] The 3rd are some further resources to research more and nerd more on this.`,
    html: `
      <div class="abs mono" style="left:120px;top:100px" data-a="fade">Take home</div>
      ${[['Write the Environment Profile down', 'Where you built it. Where it’s going. For every row that’s different: a setting, or a decision?', 'var(--tomato)'],
         ['Test it for your users', 'Their network, their clocks, their laws and their phones.', 'var(--cobalt)'],
         ['Keep going', 'The template, every source and further reading are on the next slide.', 'var(--lime)']].map((r, k) => `
        <div class="abs" style="left:120px;top:${190 + k * 280}px;width:1680px;display:grid;grid-template-columns:180px 1fr;border-top:5px solid var(--ink);padding-top:24px" data-a="wipe" data-s="${k + 1}">
          <span class="huge" style="font-size:150px;color:${r[2]};-webkit-text-stroke:${k === 2 ? '3px var(--ink)' : '0'}">${k + 1}</span>
          <div><div class="huge" style="font-size:100px">${r[0]}</div><div class="body" style="font-size:40px;margin-top:10px;color:var(--sub)">${r[1]}</div></div></div>`).join('')}`
  });

  /* 2. The profile one last time: two columns */
  D.slide({ id: 'profile-final', sec: SEC, t: '38:00', bg: 'ink',
    notes: `It's one page, and you can fill it in at your next planning meeting, and add your own rows.`,
    html: `
      <div class="abs huge" style="left:120px;top:70px;font-size:96px;color:var(--paper)" data-a="rise">The Environment Profile</div>
      ${D.profile({ top: 220, qsize: 30, tsize: 56 })}
      <div class="abs mono" style="left:120px;top:990px;color:var(--lime)" data-a="fade" data-d="900">+ your own rows</div>`
  });

  /* 3. QR */
  D.slide({ id: 'qr', sec: SEC, t: '38:15', bg: 'lime',
    notes: `The template is behind this QR code, along with every source I used today, and the full code.
It's one page, and you can fill it in at your next planning meeting, and add your own rows.`,
    html: `
      <div class="abs" style="left:120px;top:140px;padding:26px;background:#fff;border:6px solid var(--ink)" data-a="pop">${qrSvg(C.qrUrl || 'https://example.com', 720)}</div>
      <div class="abs huge" style="left:1000px;top:150px;width:820px;font-size:150px" data-a="left" data-d="300">Take the template</div>
      <div class="abs body" style="left:1000px;top:520px;width:800px;font-size:44px" data-a="up" data-d="500">${D.esc(C.qrLabel || '')}</div>
      <div class="abs mono" style="left:1000px;top:760px;width:800px;font-size:30px;word-break:break-all" data-a="fade" data-d="700">${D.esc((C.qrUrl || '').replace(/^https?:\/\//, ''))}</div>
      ${/example\.com/.test(C.qrUrl || '') ? `<div class="abs mono" style="left:1000px;top:900px;background:var(--tomato);color:var(--ink);padding:6px 14px;font-size:26px">TODO: link · set qrUrl in config.js</div>` : ''}`
  });

  /* 4. Further reading */
  D.slide({ id: 'reading', sec: SEC, t: '38:40', bg: 'paper',
    notes: `I'd advise you give it so much attention if you're looking to architect software that crosses borders. If you want to go further, start with these.
[click] "Engineering Uber Lite" on the Uber blog.
[click] Alex Strachan's QCon talk on multi-region data residency.
[click] The book Building Evolutionary Architectures.
[click] And for the big picture of how different parts of the world regulate technology, Anu Bradford's Digital Empires.`,
    html: `
      <div class="abs mono" style="left:120px;top:100px" data-a="fade">Go further</div>
      ${[['Engineering Uber Lite', 'Uber Engineering blog, 2019', 'assets/img/src-uber-lite.png', 'shot'],
         ['Multi-region data residency', 'Alex Strachan, QCon San Francisco 2023', 'assets/img/src-infoq-strachan.png', 'shot'],
         ['Building Evolutionary Architectures', 'Ford, Parsons, Kua, Sadalage · O’Reilly', 'assets/img/cover-bea.jpg', 'cover'],
         ['Digital Empires', 'Anu Bradford · Oxford University Press, 2023', 'assets/img/cover-digital-empires.jpg', 'cover']].map((r, k) => `
        <div class="abs" style="left:${120 + k * 430}px;top:200px;width:390px" data-a="${k % 2 ? 'drop' : 'up'}" data-s="${k + 1}">
          <div style="height:440px;background:var(--card);border:4px solid var(--ink);overflow:hidden;display:flex;align-items:${r[3] === 'cover' ? 'center' : 'flex-start'};justify-content:center">
            <img src="${r[2]}" alt="" style="${r[3] === 'cover' ? 'width:280px;height:auto;max-height:92%' : 'width:100%;height:100%;object-fit:cover;object-position:top left'}" onerror="this.style.display='none'"></div>
          <div class="huge" style="font-size:60px;margin-top:24px;line-height:.95">${r[0]}</div>
          <div class="mono" style="font-size:26px;margin-top:14px;color:var(--sub);text-transform:none;letter-spacing:.02em">${r[1]}</div></div>`).join('')}`
  });

  /* 5. Name + handles */
  const nameSlide = (open) => `
      <div class="abs mono" style="left:120px;top:110px;color:var(--sub)" data-a="fade">Thank you</div>
      <div class="abs huge" style="left:110px;top:190px;font-size:230px;line-height:.86;color:var(--paper)">
        <div data-a="rise">Gbemisola</div><div data-a="rise" data-d="120">Oladetoun</div></div>
      ${open ? `<div class="abs tile" style="left:120px;top:620px;font-size:110px;background:var(--lime);color:var(--ink);padding:6px 28px;transform:rotate(-2deg)" data-a="pop" data-d="500">Open to work</div>
                <div class="abs mono" style="left:120px;top:790px;font-size:38px;color:var(--paper);text-transform:none;letter-spacing:.02em" data-a="up" data-d="700">${D.esc(C.linkedin || '')}</div>` : ''}
      <div class="abs" style="left:120px;top:${open ? 880 : 640}px;display:flex;gap:60px" data-a="up" data-d="${open ? 900 : 400}">
        <span class="mono" style="font-size:40px;color:var(--paper);text-transform:none">${D.esc(C.handle || '@WithGbemi')}</span>
        ${open ? '' : `<span class="mono" style="font-size:40px;color:var(--paper);text-transform:none">${D.esc(C.linkedin || '')}</span>`}</div>
      <div class="abs" style="right:120px;top:${open ? 640 : 760}px;width:620px;border-top:5px solid var(--tomato);padding-top:20px" data-a="left" data-d="${open ? 1100 : 600}">
        <div class="huge" style="font-size:72px;color:var(--paper)">Find me at the speaker corner</div></div>`;
  D.slide({ id: 'name', sec: SEC, t: '39:20', bg: 'ink',
    notes: `(Name and handles.)`,
    html: nameSlide(false) });
  D.slide({ id: 'name-open', sec: SEC, t: '39:30', bg: 'ink',
    notes: `And before I go, one more thing. I'm currently open to work, and I'm looking for my next role in software development.
So if your team is looking for a developer who's very nitty-gritty and takes her time with architecture, someone who loves a challenge and is very big on good architectural practice, and who believes software should be diligently crafted, then I might be the person you're looking for.
If you have an opportunity, I'd really love to hear about it. Thank you so much.
I'll be at the speaker corner after this, and I'd love to hear what you think, have some discussions if you have any questions.`,
    html: nameSlide(true) });

  /* 6. Final callback: jollof + timestamps, backdrop for Q&A */
  D.slide({ id: 'final', sec: SEC, t: '40:00', bg: 'tomato',
    notes: `(Backdrop for questions. Same recipe, different kitchen.)`,
    html: `
      <div class="abs" style="left:0;top:0;width:900px;height:1080px;overflow:hidden" data-a="wipe"><img class="push" src="assets/img/jollof-2.jpg" alt="" style="width:100%;height:100%;object-fit:cover;object-position:60% 40%"></div>
      <div class="abs" style="left:990px;top:120px">
        <div class="mono">00:30 UTC</div><div class="huge" style="font-size:150px;color:var(--paper)" data-a="left" data-d="400">03:30 <span style="font-size:60px">EEST</span></div>
        <div class="mono" style="margin-top:30px">01:30 UTC</div><div class="huge" style="font-size:150px;color:var(--paper)" data-a="left" data-d="600">03:30 <span style="font-size:60px">EET</span></div></div>
      <div class="abs huge" style="left:990px;top:640px;width:880px;font-size:118px;line-height:.92;color:var(--ink)">
        <div>${D.words('Same language,', { d: 900, gap: 120 })}</div><div>${D.words('different code.', { d: 1150, gap: 120 })}</div></div>
      <div class="abs mono" style="left:990px;top:990px;color:var(--ink)" data-a="fade" data-d="1600">${D.esc(C.handle || '@WithGbemi')}</div>`
  });
})();
