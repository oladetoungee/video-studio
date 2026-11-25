/* CLOSE 37:30–40:00 */
(function () {
  const D = window.D;
  const SEC = 'Close';
  const C = window.CONFIG || {};
  const F = (px, w = 600) => `font-family:Geist;font-weight:${w};font-size:${px}px;line-height:1.02;letter-spacing:-.045em`;

  /* 1. Three takeaways */
  D.slide({ id: 'takeaways', sec: SEC, t: '37:30', bg: 'paper',
    notes: `So, I want you to take 3 things home.
The first one is the Environment Profile down. Six rows, considerations and assessments for where you built your system and for where it's going, and for every row that's different, ask whether it changes a setting or a decision.
And the 2nd one is to test it for your users. Their network, their clocks, their laws, and their phones.
The 3rd are some further resources to research more and nerd more on this.`,
    html: `
      ${[['Write the Environment Profile down.', 'var(--ink)'], ['Test it for your users.', 'var(--cobalt)'], ['Keep researching.', 'var(--ink)']].map(([t, c], k) => `
        <div class="abs" style="left:140px;top:${200 + k * 250}px;width:1640px;border-top:2px solid var(--ink);padding-top:34px" data-a="up" data-d="${k * 1500}">
          <span style="${F(96)};color:${c}">${t}</span></div>`).join('')}`
  });

  /* 2. The profile one last time */
  D.slide({ id: 'profile-final', sec: SEC, t: '38:00', bg: 'paper',
    notes: `I didn't see the hidden model in my own code until my environment changed, the users, the infrastructure and the expectations, all at once. You don't have to move countries to see yours. You just have to write it down.
It's one page, and you can fill it in at your next planning meeting, and add your own rows.`,
    html: `
      <div class="abs head" style="left:140px;top:90px;font-size:80px" data-a="rise">The Environment Profile</div>
      ${D.profile({ top: 230 })}
      <div class="abs mono blue" style="left:140px;top:980px" data-a="fade" data-d="900">+ your own rows</div>`
  });

  /* 3. QR */
  D.slide({ id: 'qr', sec: SEC, t: '38:15', bg: 'paper',
    notes: `The slides from this talk are behind this QR code, with every source I used today.`,
    html: `
      <div class="abs" style="left:140px;top:150px;padding:24px;background:#fff;border:2px solid var(--ink)" data-a="pop">${D.qr(C.qrUrl || 'https://example.com', 700)}</div>
      <div class="abs" style="left:1000px;top:190px;width:800px;${F(120)}" data-a="left" data-d="300">The slides from <span class="blue">this talk.</span></div>
      <div class="abs sub" style="left:1004px;top:500px;width:760px" data-a="up" data-d="500">${D.esc(C.qrLabel || '')}</div>`
  });

  /* 4. Further reading */
  D.slide({ id: 'reading', sec: SEC, t: '38:40', bg: 'paper',
    notes: `I'd advise you give it so much attention if you're looking to architect software that crosses borders. If you want to go further, start with these.
"Engineering Uber Lite" on the Uber blog.
Alex Strachan's QCon talk on multi-region data residency.
The book Building Evolutionary Architectures.
And for the big picture of how different parts of the world regulate technology, Anu Bradford's Digital Empires.`,
    html: `
      <div class="abs head" style="left:140px;top:110px;font-size:72px" data-a="rise">Go further</div>
      ${[['Engineering Uber Lite', 'Uber Engineering, 2019', 'assets/img/src-uber-lite.png', 'shot'],
         ['Multi-region data residency', 'Alex Strachan, QCon SF 2023', 'assets/img/src-infoq-strachan.png', 'shot'],
         ['Building Evolutionary Architectures', 'Ford, Parsons, Kua, Sadalage', 'assets/img/cover-bea.jpg', 'cover'],
         ['Digital Empires', 'Anu Bradford, 2023', 'assets/img/cover-digital-empires.jpg', 'cover']].map((r, k) => `
        <div class="abs" style="left:${140 + k * 420}px;top:270px;width:380px" data-a="up" data-d="${200 + k * 120}">
          <div style="height:420px;background:var(--card);border:2px solid var(--line);overflow:hidden;display:flex;align-items:${r[3] === 'cover' ? 'center' : 'flex-start'};justify-content:center">
            <img src="${r[2]}" alt="" style="${r[3] === 'cover' ? 'width:260px;height:auto;max-height:90%' : 'width:100%;height:100%;object-fit:cover;object-position:top left'}" onerror="this.style.display='none'"></div>
          <div style="${F(42)};margin-top:26px;line-height:1.08">${r[0]}</div>
          <div class="mono" style="font-size:24px;margin-top:14px">${r[1]}</div></div>`).join('')}`
  });

  /* 5. Name + LinkedIn */
  const li = 'https://www.' + (C.linkedin || '').replace(/^https?:\/\/(www\.)?/, '');
  const nameSlide = (open) => open ? `
      <div class="abs lime" style="left:140px;top:230px;${F(210)}" data-a="rise"><div>Open to</div><div>work</div></div>
      <div class="abs" style="left:146px;top:720px;${F(72)};color:#F2F0EB" data-a="up" data-d="400">Gbemisola Oladetoun</div>
      <div class="abs" style="left:1180px;top:190px;padding:16px;background:#fff" data-a="pop" data-d="800">${D.qr(li, 560)}</div>
      <div class="abs" style="left:1180px;top:820px;font-family:Geist;font-weight:500;font-size:44px;color:#F2F0EB" data-a="fade" data-d="1100">LinkedIn</div>` : `
      <div class="abs" style="left:140px;top:200px;${F(170)};color:#F2F0EB">
        <div data-a="rise">Gbemisola</div><div data-a="rise" data-d="120">Oladetoun</div></div>
      <div class="abs" style="left:146px;top:580px;${F(48)};color:#F2F0EB" data-a="up" data-d="400">Find me at the speaker corner</div>
      <div class="abs" style="left:146px;top:700px;padding:12px;background:#fff" data-a="pop" data-d="600">${D.qr(li, 210)}</div>
      <div class="abs" style="left:410px;top:780px;font-family:Geist;font-weight:500;font-size:40px;color:#F2F0EB" data-a="fade" data-d="800">LinkedIn</div>`;
  D.slide({ id: 'name', sec: SEC, t: '39:20', bg: 'ink',
    notes: `(Name and LinkedIn.)`,
    html: nameSlide(false) });
  D.slide({ id: 'name-open', sec: SEC, t: '39:30', bg: 'ink',
    notes: `And before I go, one more thing. I'm currently open to work, and I'm looking for my next role in software development.
So if your team is looking for a developer who's very nitty-gritty and takes her time with architecture, someone who loves a challenge and is very big on good architectural practice, and who believes software should be diligently crafted, then I might be the person you're looking for.
If you have an opportunity, I'd really love to hear about it. Thank you so much.
I'll be at the speaker corner after this, and I'd love to hear what you think, have some discussions if you have any questions.`,
    html: nameSlide(true) });
})();
