// Build a carousel from its content.json (phone-distraction, 2026-10-13; the studio contract and checks are copied from
// ghana-marrify's build.mjs, the layouts and look are new: the film's look A "Lock screen": ink #0C0D10, notification cards,
// ONE accent = badge red #FF4433, Inter Tight, IBM Plex Mono labels, a Newsreader italic accent word).
//   node shared/build.mjs instagram        (or linkedin, or both: node shared/build.mjs instagram linkedin)
//   add --html to only rebuild index.html; --slide N renders only slide N's PNG; --pdf only the LinkedIn PDF
// Studio design editor support: text carries data-k="<path in the slide>", movable blocks data-move="<name>",
// polaroid photos data-img="<path>"; a slide's "nudge": {"<name>": {dx, dy, s, hide}} moves, scales or hides that element;
// index.html?view=slide&n=3 shows one slide, ?view=strip all slides in a row. Optional "groundColor": "#RRGGBB" per slide
// (studio colour picker); "ground" (ink | paper | accent) sets the text colours. With STUDIO_JOB=1, checks print as "@warn".
// Checks after each render: text into the footer or margins, mono labels under 32 px, one-word last lines, photos near text.
// Every phone / app / web drawing is GENERIC (no real app or logo) and carries no disclaimer tag (her rule 2026-10-14). Real sources (the European
// Commission press releases) are screenshots, credited with the site and date.
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const HERE = path.dirname(fileURLToPath(import.meta.url));            // design/carousels/shared
const ROOT = path.resolve(HERE, '..');                                // design/carousels
const PROJECT = path.resolve(ROOT, '../..');                          // projects/<slug>
const require = createRequire(path.join(HERE, 'package.json'));
function chromePath() {
  const base = path.join(process.env.HOME, '.cache/puppeteer/chrome-headless-shell');
  for (const v of fs.readdirSync(base).sort().reverse()) {
    const p = path.join(base, v, 'chrome-headless-shell-mac-arm64', 'chrome-headless-shell');
    if (fs.existsSync(p)) return p;
  }
  throw new Error('chrome-headless-shell not found');
}
const MONO_MIN = 32;
const JOB = !!process.env.STUDIO_JOB;

/* ---------- text markup: *accent*  _serif italic_  \n line break; hyphenated words never split ---------- */
const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const md = s => esc(s)
  .replace(/([A-Za-z’']+(?:-[A-Za-z’']+)+[.,:;!?”]*)/g, '<span class="nw">$1</span>')
  .replace(/\*([^*]+)\*/g, '<em class="acc">$1</em>')
  .replace(/_([^_]+)_/g, '<span class="serif">$1</span>')
  .replace(/\n/g, '<br>');
const pad2 = n => String(n).padStart(2, '0');
const K = p => (p ? ` data-k="${p}"` : '');
const KP = p => (p ? ` data-k="${p}" data-plain` : '');
const M = p => (p ? ` data-move="${p}"` : '');
const A = img => (img.includes('/') ? img : `../shared/assets/${img}`);

/* ---------- generic glyphs ---------- */
const GL = {
  heart: '<path d="M12 21s-7.5-4.6-9.5-9.2C1 8.2 3.4 4.5 7 4.5c2.1 0 3.6 1.1 5 3 1.4-1.9 2.9-3 5-3 3.6 0 6 3.7 4.5 7.3C19.5 16.4 12 21 12 21z" fill="currentColor"/>',
  heartO: '<path d="M12 21s-7.5-4.6-9.5-9.2C1 8.2 3.4 4.5 7 4.5c2.1 0 3.6 1.1 5 3 1.4-1.9 2.9-3 5-3 3.6 0 6 3.7 4.5 7.3C19.5 16.4 12 21 12 21z" fill="none" stroke="currentColor" stroke-width="2"/>',
  chat: '<path d="M4 5h16v11H9l-5 4z" fill="currentColor"/>',
  chatO: '<path d="M4 5h16v11H9l-5 4z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>',
  share: '<path d="M4 12l16-8-6 16-3-6z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>',
  bell: '<path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z" fill="currentColor"/><circle cx="12" cy="20.5" r="2" fill="currentColor"/>',
  x: '<path d="M6 6l12 12M18 6L6 18" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/>',
};
const svg = (n, s, c = 'currentColor') => `<svg viewBox="0 0 24 24" width="${s}" height="${s}" style="color:${c};flex:none">${GL[n]}</svg>`;
const spinner = (s = 70, c = 'var(--fg)') => `<div class="spin" style="--s:${s}px;--spc:${c}">${Array.from({ length: 12 }, (_, k) => `<i style="transform:rotate(${k * 30}deg);opacity:${(0.25 + 0.75 * (k + 1) / 12).toFixed(2)}"></i>`).join('')}</div>`;
const post = (lines = 2) => `<div class="post"><div class="who"><i></i><b></b></div><div class="pic"></div>${Array.from({ length: lines }, (_, k) => `<div class="ln${k === lines - 1 ? ' s' : ''}"></div>`).join('')}<div class="acts">${svg('heartO', 30)}${svg('chatO', 30)}${svg('share', 30)}</div></div>`;
const illTag = (s = 'Illustration', k = 'tag') => (s ? `<span class="mono tag"${KP(k)}>${esc(s)}</span>` : '');
function phone(inner, { w = 360, h = 560, cls = '', move = 'phone', rot = 0 } = {}) {
  return `<div class="ph ${cls}"${M(move)} style="width:${w}px;height:${h}px;transform:rotate(${rot}deg)"><div class="scr"><div class="isl"></div>${inner}</div></div>`;
}
function pol(p, { x, y, w, h, rot = 0, pos = '50% 35%' }, base = 'polaroid') {
  return `<div class="pol"${M(base)} style="left:${x}px;top:${y}px;width:${w}px;transform:rotate(${rot}deg)">
    <img data-img="${base}.img" src="${A(p.img)}" style="height:${h}px;object-position:${pos}"><div class="cap"${KP(base + '.caption')}>${esc(p.caption || '')}</div></div>`;
}

/* ---------- visuals (the "visual" field of a slide) ---------- */
const V = {
  // a book that ends vs a feed that runs off the slide
  bookfeed: s => `
    <div class="bf"${M('visual')}>
      <div class="book"><div class="l"></div><div class="l"></div><div class="l s"></div><div class="end"${KP('end')}>${esc(s.end)}</div></div>
      <div class="feedcol">${post()}${post()}${post()}</div>
    </div>
    <style>
      .bf { position: relative; height: 430px; overflow: hidden; display: flex; gap: 60px; align-items: flex-start; }
      .book { width: 340px; height: 360px; background: #FFFDF6; border: 4px solid #0C0D10; border-radius: 6px 18px 18px 6px; box-shadow: 14px 14px 0 rgba(0,0,0,.55); padding: 48px 38px; text-align: center; color: #0C0D10; transform: rotate(-3deg); margin-top: 20px; }
      .book .l { height: 12px; border-radius: 6px; background: #E4E0D6; margin: 16px 0; } .book .l.s { width: 60%; margin: 16px auto; }
      .book .end { font-family: News; font-style: italic; font-size: 68px; margin-top: 30px; letter-spacing: -.03em; }
      .feedcol { width: 400px; height: 430px; overflow: hidden; -webkit-mask-image: none; }
      .feedcol .post { margin: 0 0 18px; }
    </style>`,
  // pull-to-refresh: a phone stuck on the spinner, a red-pen arrow showing the pull
  pull: s => `
    <div class="vrow"${M('visual')}>
      ${phone(`<div style="height:200px;display:grid;place-items:center;padding-top:50px">${spinner(80, '#F4F1EA')}</div>${post(1)}`, { w: 380, h: 520 })}
      <div class="side">
        <svg class="pen" width="90" height="300" viewBox="0 0 90 300"><path d="M45 10 Q60 150 45 280 M20 250 L45 285 L70 250"/></svg>
        <div class="mono"${KP('pullLabel')} style="font-size:34px;color:var(--mid);margin-top:10px">${esc(s.pullLabel)}</div>
      </div>
    </div>`,
  // three slot reels: something, something, nothing
  reels: s => `
    <div class="reels"${M('visual')}>
      <div class="reel">${svg('heart', 120, '#FF4433')}</div><div class="reel">${svg('chat', 120, '#0C0D10')}</div><div class="reel"><i class="empty"></i></div>
      ${(s.reelLabels || []).map((l, i) => `<div class="mono rl"${KP(`reelLabels.${i}`)}>${esc(l)}</div>`).join('')}
    </div>
    <style>.reels { display: grid; grid-template-columns: repeat(3, 1fr); gap: 22px; }
      .reel { height: 300px; border-radius: 22px; background: #FFFDF6; border: 5px solid var(--fg); display: grid; place-items: center; }
      .reel b { font-family: IT; font-weight: 800; font-size: 150px; color: #9A9996; line-height: 1; } .reel .empty { width: 110px; height: 110px; border-radius: 50%; border: 8px dashed #B9B6AE; } .rl { font-size: 34px; text-align: center; color: var(--mid); }</style>`,
  // old pagination with the Next page button, crossed out
  pager: s => `
    <div class="web"${M('visual')}>
      <div class="bar"><i></i><i></i><i></i></div>
      <div class="wl"></div><div class="wl"></div><div class="wl s"></div><div class="wl"></div>
      <div class="pg"><span class="on">1</span><span>2</span><span>3</span><b class="nx"${KP('next')}>${esc(s.next)}</b></div>
      <div class="mono gone"${KP('gone')}>${esc(s.gone || 'Gone')}</div>
    </div>
    <style>.web { position: relative; height: 430px; background: #FFFDF6; border: 4px solid #0C0D10; border-radius: 16px; color: #0C0D10; }
      .web .bar { height: 56px; border-bottom: 4px solid #0C0D10; display: flex; align-items: center; gap: 12px; padding-left: 22px; }
      .web .bar i { width: 18px; height: 18px; border-radius: 50%; border: 3px solid #0C0D10; }
      .web .wl { height: 16px; border-radius: 8px; background: #E4E0D6; margin: 24px 40px 0; } .web .wl.s { width: 50%; }
      .pg { position: absolute; left: 40px; bottom: 40px; display: flex; gap: 16px; align-items: center; font-family: IT; font-weight: 600; font-size: 36px; color: #6b6b70; }
      .pg span { width: 66px; height: 66px; border-radius: 12px; border: 3px solid #c9c4b8; display: grid; place-items: center; }
      .pg span.on { background: #0C0D10; color: #fff; border-color: #0C0D10; }
      .gone { position: absolute; left: 640px; bottom: 44px; font-size: 40px; color: #E0301F; border: 5px solid #E0301F; border-radius: 10px; padding: 6px 16px; transform: rotate(-8deg); }
      .pg .nx { opacity: .35; margin-left: 18px; background: #0C0D10; color: #fff; font-weight: 800; font-size: 46px; padding: 14px 30px; border-radius: 14px; letter-spacing: -.02em; }</style>`,
  // a generic video player counting down to the next video
  upnext: s => `
    <div class="pl"${M('visual')}><div class="nx"><div class="up"${KP('upLabel')}>${esc(s.upLabel)}</div><div class="ring"${KP('count')}>${esc(s.count)}</div></div>
      <div class="cx">${svg('x', 40, '#fff')}</div><div class="bar"><i></i></div></div>
    <style>.pl { position: relative; height: 500px; background: #1D1F25; border-radius: 26px; overflow: hidden; }
      .pl .nx { position: absolute; left: 50%; top: 50%; transform: translate(-50%, -56%); text-align: center; }
      .pl .up { font-size: 40px; font-weight: 600; color: #8B8D94; }
      .pl .ring { width: 230px; height: 230px; margin: 20px auto 0; border-radius: 50%; border: 14px solid #3a3d45; border-top-color: #FF4433; border-right-color: #FF4433; display: grid; place-items: center; font-family: IT; font-weight: 800; font-size: 130px; color: #fff; line-height: 1; }
      .pl .bar { position: absolute; left: 0; right: 0; bottom: 0; height: 12px; background: #3a3d45; } .pl .bar i { display: block; width: 96%; height: 100%; background: #FF4433; }
      .pl .cx { position: absolute; right: 28px; top: 26px; width: 76px; height: 76px; border-radius: 50%; background: rgba(255,255,255,.12); display: grid; place-items: center; }</style>`,
  // the badge: blue (barely noticed) -> red
  badge: s => `
    <div class="bdgs"${M('visual')}>
      <div class="bi"><div class="ico">${svg('bell', 110, '#fff')}<span class="b" style="background:#3B5BDB">1</span></div><div class="mono"${KP('blueLabel')} style="font-size:34px;color:var(--mid)">${esc(s.blueLabel)}</div></div>
      <svg class="pen" width="160" height="80" viewBox="0 0 160 80"><path d="M10 40 Q80 10 140 40 M115 18 L142 40 L115 62"/></svg>
      <div class="bi"><div class="ico">${svg('bell', 110, '#fff')}<span class="b">1</span></div><div class="mono"${KP('redLabel')} style="font-size:34px;color:var(--a)">${esc(s.redLabel)}</div></div>
    </div>
    <style>.bdgs { display: flex; align-items: center; justify-content: space-between; }
      .bi { display: flex; flex-direction: column; align-items: center; gap: 30px; }
      .bdgs .ico { position: relative; width: 240px; height: 240px; border-radius: 54px; background: #3A3D45; display: grid; place-items: center; }
      .bdgs .b { position: absolute; right: -26px; top: -26px; width: 96px; height: 96px; border-radius: 50%; background: #FF4433; color: #fff; font-family: IT; font-weight: 800; font-size: 56px; display: grid; place-items: center; box-shadow: 0 0 0 10px var(--bg); }</style>`,
  // a post: likes hidden
  likes: s => `
    <div class="vrow"${M('visual')}>
      ${phone(`<div style="height:70px"></div>${post(1)}<div class="lk">${svg('heart', 40, '#FF4433')}<b>${esc(s.likes)}</b><em${KP('likesWord')}>${esc(s.likesWord)}</em></div>`, { w: 400, h: 560 })}
      <div class="serif"${K('note')} style="font-size:64px;line-height:1.05;white-space:nowrap;color:var(--a);align-self:center">${md(s.note)}</div>
    </div>
    <style>.lk { margin: 8px 26px; display: flex; align-items: center; gap: 14px; font-size: 40px; font-weight: 700; } .lk b { filter: blur(10px); font-size: 46px; } .lk em { font-style: normal; color: #8B8D94; }</style>`,
  // a real source (screenshot) inside a notification card, credited
  source: s => `
    <div class="nt"${M('source')}>
      <div class="nh"><span${KP('from')}>${esc(s.from)}</span><span${KP('date')}>${esc(s.date)}</span></div>
      <img src="${A(s.img)}" style="width:100%;display:block;border-radius:14px;${s.imgH ? `height:${s.imgH}px;object-fit:cover;object-position:50% 0` : ''}">
      <div class="mono cred"${KP('credit')}>${esc(s.credit)}</div>
    </div>`,
  // stacked notification banners (one per feature)
  banners: s => `
    <div class="stack"${M('banners')}>${s.banners.map((b, i) => `
      <div class="nt small"><div class="nh"><span${KP(`banners.${i}.from`)}${b.accent ? ' style="color:var(--a)"' : ''}>${esc(b.from)}</span><span${KP(`banners.${i}.when`)}>${esc(b.when ?? 'now')}</span></div><div class="nb"${K(`banners.${i}.text`)}>${md(b.text)}</div></div>`).join('')}
      ${illTag(s.tag)}
    </div>`,
  // the Fogg Behavior Model: three cards
  model: s => `
    <div class="mdl"${M('cards')}>${s.cards.map((c, i) => `
      <div class="mc"><div class="mono"${KP(`cards.${i}.k`)} style="font-size:34px;color:var(--a)">${esc(c.k)}</div><div class="mh"${K(`cards.${i}.h`)}>${md(c.h)}</div></div>`).join('')}
    </div>
    <style>.mdl { display: grid; gap: 18px; } .mc { background: var(--card); border-radius: 26px; padding: 26px 34px 30px; }
      .mh { font-size: 46px; font-weight: 700; letter-spacing: -.02em; line-height: 1.12; margin-top: 8px; }</style>`,
  // settings switches (practical list)
  toggles: s => `
    <div class="set"${M('settings')}>${s.rows.map((r, i) => `
      <div class="sw"><div><div class="sh"${K(`rows.${i}.head`)}>${md(r.head)}</div>${r.sub ? `<div class="ss"${K(`rows.${i}.sub`)}>${md(r.sub)}</div>` : ''}</div><i class="tog${r.on ? ' on' : ''}${r.warn ? ' warn' : ''}"></i></div>`).join('')}
    </div>
    <style>.set { background: var(--card); border-radius: 30px; padding: 6px 34px; }
      .sw { display: flex; align-items: center; justify-content: space-between; gap: 30px; padding: 28px 0; border-bottom: 3px solid var(--line); }
      .sw:last-child { border-bottom: 0; }
      .sh { font-size: 46px; font-weight: 750; letter-spacing: -.02em; line-height: 1.08; } .ss { font-size: 34px; color: var(--sub); margin-top: 8px; line-height: 1.2; font-weight: 500; }
      .tog { width: 120px; height: 70px; border-radius: 35px; background: #4a4d55; position: relative; flex: none; }
      .tog::after { content: ''; position: absolute; top: 6px; left: 6px; width: 58px; height: 58px; border-radius: 50%; background: #fff; }
      .tog.on { background: #FF4433; } .tog.on::after { left: 56px; }</style>`,
  // a checklist: what to do, with where to find it
  checks: s => `
    <div class="set"${M('checklist')}>${s.rows.map((r, i) => `
      <div class="sw" style="justify-content:flex-start"><i class="ck">${'<svg viewBox="0 0 24 24" width="40" height="40"><path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round"/></svg>'}</i><div><div class="sh"${K(`rows.${i}.head`)}>${md(r.head)}</div>${r.sub ? `<div class="ss"${K(`rows.${i}.sub`)}>${md(r.sub)}</div>` : ''}</div></div>`).join('')}
    </div>
    <style>.ck { flex: none; width: 66px; height: 66px; border-radius: 50%; background: #FF4433; display: grid; place-items: center; margin-right: 6px; }</style>`,
  // a numbered list as question rows
  questions: s => `
    <div class="rows"${M('rows')}>${s.rows.map((r, i) => `
      <div class="row"><div class="n"${KP(`rows.${i}.n`)}>${esc(r.n)}</div><div class="qh"${K(`rows.${i}.head`)}>${md(r.head)}</div></div>`).join('')}
    </div>`,
};

/* ---------- layouts ---------- */
const disp = (s, size, k = 'title', extra = '') => `<div class="disp fit"${K(k)} data-max="${size}" style="font-size:${size}px;${extra}">${md(s)}</div>`;
const L = {
  hook: s => `
    <div class="main">
      ${disp(s.title, s.size || 150)}
      ${s.sub ? `<p class="body"${K('sub')} style="margin-top:34px;font-size:${s.subSize || 44}px;width:${s.subW || 880}px">${md(s.sub)}</p>` : ''}
      <div style="margin-top:${s.gap ?? 56}px">${s.visual ? V[s.visual](s) : ''}</div>
      ${s.swipe ? `<div class="mono lab push"${K('swipe')} style="color:var(--a);padding-top:40px">${md(s.swipe)}</div>` : ''}
    </div>`,
  visual: s => `
    <div class="main">
      ${disp(s.title, s.size || 104, 'title', s.lh ? `line-height:${s.lh}` : '')}
      ${s.lede ? `<p class="body"${K('lede')} style="margin-top:28px;width:${s.ledeW || 900}px">${md(s.lede)}</p>` : ''}
      <div class="vbody" style="margin:auto 0;padding-top:${s.gap ?? 50}px">
      <div>${V[s.visual](s)}</div>
      ${s.takeaway ? `<p class="take"${K('takeaway')} style="margin-top:${s.takeTop ?? 56}px;font-size:${s.takeSize || 44}px">${md(s.takeaway)}</p>` : ''}
      ${s.source ? `<div class="mono src"${K('source')}>${md(s.source)}</div>` : ''}
      </div>
    </div>`,
  punch: s => `
    <div class="main">
      ${disp(s.title, s.size || 170)}
      <div class="push">
        ${s.body ? `<p class="body"${K('body')} style="color:var(--fg);font-size:${s.bodySize || 46}px;width:${s.bodyW || 880}px">${md(s.body)}</p>` : ''}
        ${s.source ? `<div class="mono src"${K('source')} style="margin-top:28px">${md(s.source)}</div>` : ''}
      </div>
    </div>`,
  end: s => `
    <div class="main">
      ${disp(s.title, s.size || 140)}
      ${s.body ? `<p class="body"${K('body')} style="margin-top:36px;width:${s.bodyW || 880}px;font-size:${s.bodySize || 44}px">${md(s.body)}</p>` : ''}
      ${s.cta ? `<p class="take"${K('cta')} style="margin-top:30px;width:${s.bodyW || 880}px;font-size:${s.ctaSize || 46}px">${md(s.cta)}</p>` : ''}
      <div class="push"${M('push')} style="width:${s.pushW || 540}px">
        <div class="mono lab"${K('where')} style="color:var(--fg)">${md(s.where)}</div>
        <div class="bal"${KP('video')} data-affix="“|”" style="font-weight:800;font-size:${s.videoSize || 48}px;line-height:1.08;letter-spacing:-0.03em;margin-top:16px">“${esc(s.video)}”</div>
        <div style="margin-top:34px;font-weight:800;font-size:48px;letter-spacing:-.02em;color:var(--fg)"${KP('handle')}>${esc(s.handle)}</div>
      </div>
    </div>
    ${s.polaroid ? pol(s.polaroid, { x: 640, y: 760, w: 340, h: 340, rot: 4, pos: '50% 30%' }) : ''}`,
};

/* ---------- page ---------- */
function buildHTML(deck) {
  const C = JSON.parse(fs.readFileSync(path.join(ROOT, deck, 'content.json'), 'utf8'));
  const n = C.slides.length;
  const nudgeCSS = (s, i) => Object.entries(s.nudge || {}).map(([k, v]) => {
    const r = []; if (v.dx || v.dy) r.push(`translate:${+v.dx || 0}px ${+v.dy || 0}px`); if (v.s && v.s !== 1) r.push(`scale:${+v.s}`); if (v.hide) r.push('visibility:hidden');
    return r.length ? `#s${i + 1} [data-move="${k}"], #s${i + 1} [data-k="${k}"] { ${r.join('; ')} }` : '';
  }).join('\n');
  const groundStyle = (s) => {
    const own = /^#[0-9a-fA-F]{6}$/.test(s.accent || '') ? `--acc:${s.accent};` : '';
    if (!/^#[0-9a-fA-F]{6}$/.test(s.groundColor || '')) return own ? ` style="${own}"` : '';
    const t = s.ground === 'ink' ? '244,241,234' : '12,13,16';
    return ` style="${own}--bg:${s.groundColor};--mid:rgba(${t},.66);--line:rgba(${t},.22)"`;
  };
  const slides = C.slides.map((s, i) => {
    const nc = nudgeCSS(s, i);
    const meter = Array.from({ length: n }, (_, k) => `<i class="${k <= i ? 'on' : ''}"></i>`).join('');
    if (!L[s.layout]) throw new Error(`unknown layout ${s.layout}`);
    return `<section class="slide g-${s.ground} l-${s.layout}" id="s${i + 1}"${groundStyle(s)}>
  ${s.corner ? `<div class="corner"${KP('corner')}>${esc(s.corner)}</div>` : ''}
  ${L[s.layout](s)}${nc ? `\n  <style>${nc}</style>` : ''}
  <div class="foot"><span class="num"><b>${pad2(i + 1)}</b> / ${pad2(n)}</span><span class="meter">${meter}</span></div>
</section>`;
  }).join('\n');
  const html = `<!doctype html><html><head><meta charset="utf-8"><title>${esc(C.docTitle || deck + ' carousel')}</title>
<link rel="stylesheet" href="../shared/base.css">
<style>:root{--W:${C.width}px;--H:${C.height}px;--acc:${C.accent}}</style></head><body>
${slides}
<script>
function fitAll(){ document.querySelectorAll('.fit').forEach(el=>{ let s=+el.dataset.max; el.style.fontSize=s+'px';
  const box=el.parentElement.getBoundingClientRect().width; const lim=Math.min(el.clientWidth||box, box);
  while((el.scrollWidth>lim+1) && s>24){ s-=2; el.style.fontSize=s+'px'; } }); }
(function(){ var q=new URLSearchParams(location.search), v=q.get('view'); if(!v) return; document.documentElement.classList.add('v-'+v);
  if(v==='slide'){ var n=+q.get('n')||1; document.querySelectorAll('.slide').forEach(function(s,i){ if(i+1!==n) s.style.display='none'; }); } })();
window.__checks = ${checks.toString()};
document.fonts.ready.then(()=>{ fitAll(); document.body.dataset.ready=1; });
</script></body></html>`;
  const out = path.join(ROOT, deck, 'index.html');
  fs.writeFileSync(out, html);
  return { C, out, n };
}

// runs in the page: layout, label-size, widow and photo checks
function checks(MONO_MIN) {
  const res = [];
  document.querySelectorAll('.slide').forEach((sl, i) => {
    const R = sl.getBoundingClientRect(); const foot = sl.querySelector('.foot').getBoundingClientRect();
    const tag = el => `<${el.tagName.toLowerCase()} ${el.className && el.className.baseVal === undefined ? el.className : ''}> "${(el.textContent || '').trim().slice(0, 30)}"`;
    sl.querySelectorAll('.main *').forEach(el => {
      if (el.closest('.pol') || el.closest('svg') || !el.childNodes.length) return;
      const r0 = el.getBoundingClientRect(); if (!r0.width) return;
      // only what is visible: clip by ancestors that hide overflow (a feed running off its box is fine)
      const r = { left: r0.left, right: r0.right, top: r0.top, bottom: r0.bottom };
      for (let p = el.parentElement; p && p !== sl; p = p.parentElement) { if (getComputedStyle(p).overflow === 'visible') continue;
        const q = p.getBoundingClientRect(); r.left = Math.max(r.left, q.left); r.right = Math.min(r.right, q.right); r.top = Math.max(r.top, q.top); r.bottom = Math.min(r.bottom, q.bottom); }
      if (r.bottom <= r.top || r.right <= r.left) return;
      if (r.bottom > foot.top - 24) res.push(`slide ${i + 1}: ${tag(el)} runs into the footer`);
      if (r.right > R.right - 60 || r.left < R.left + 60) res.push(`slide ${i + 1}: ${tag(el)} outside the margins`);
    });
    sl.querySelectorAll('*').forEach(el => {
      const cs = getComputedStyle(el);
      if (!cs.fontFamily.includes('Plex') || el.closest('.meter')) return;
      const own = [...el.childNodes].some(c => c.nodeType === 3 && c.textContent.trim());
      if (own && parseFloat(cs.fontSize) < MONO_MIN - 0.5) res.push(`slide ${i + 1}: mono ${parseFloat(cs.fontSize)}px ${tag(el)}`);
    });
    sl.querySelectorAll('.pol').forEach(pe => {
      const a = pe.getBoundingClientRect();
      sl.querySelectorAll('.main .disp, .main p, .main .bal, .main .lab, .corner').forEach(el => {
        const rg = document.createRange(); rg.selectNodeContents(el); const rs = [...rg.getClientRects()]; const g = 24;
        if (rs.some(r => a.left < r.right + g && a.right > r.left - g && a.top < r.bottom + g && a.bottom > r.top - g))
          res.push(`slide ${i + 1}: polaroid within 24 px of ${tag(el)}`);
      });
    });
    sl.querySelectorAll('p, .body, .take, .bal, .nb, .mh, .sh, .ss, .qh, .disp').forEach(el => {
      const words = []; const tw = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      while (tw.nextNode()) { const t = tw.currentNode; const re = /\S+/g; let m;
        while ((m = re.exec(t.textContent))) { const rg = document.createRange(); rg.setStart(t, m.index); rg.setEnd(t, m.index + m[0].length);
          const rr = rg.getClientRects()[0]; if (rr) words.push({ w: m[0], top: Math.round(rr.top) }); } }
      if (words.length < 3) return;
      const lines = []; words.forEach(w => { const l = lines.find(l => Math.abs(l.top - w.top) < 8); if (l) l.n++; else lines.push({ top: w.top, n: 1 }); });
      lines.sort((a, b) => a.top - b.top);
      if (lines.length > 1 && lines[lines.length - 1].n === 1 && !el.classList.contains('disp')) res.push(`slide ${i + 1}: one-word last line "${words[words.length - 1].w}" in ${tag(el)}`);
    });
  });
  return res.slice(0, 60);
}

async function render(deck) {
  const { C, out, n } = buildHTML(deck);
  if (process.argv.includes('--html')) { console.log('html', out); return; }
  const ai = process.argv.indexOf('--slide'); const only = ai > 0 ? +process.argv[ai + 1] : 0; const pdfOnly = process.argv.includes('--pdf');
  if (only && !(only >= 1 && only <= n)) throw new Error(`no slide ${only} (the deck has ${n})`);
  const puppeteer = require('puppeteer-core');
  const dest = path.join(PROJECT, 'outputs/carousels', deck);
  fs.mkdirSync(dest, { recursive: true });
  for (const f of fs.readdirSync(dest)) if (/^\d\d\.png$/.test(f) && +f.slice(0, 2) > n) fs.renameSync(path.join(dest, f), path.join(process.env.HOME, '.Trash', `${deck}-old-${Date.now()}-${f}`));
  const browser = await puppeteer.launch({ executablePath: chromePath(), headless: true, args: ['--allow-file-access-from-files', '--font-render-hinting=none'] });
  const page = await browser.newPage();
  await page.setViewport({ width: C.width + 200, height: C.height, deviceScaleFactor: 1 });
  await page.goto('file://' + out, { waitUntil: 'load' });
  await page.waitForSelector('body[data-ready]');
  await new Promise(r => setTimeout(r, 300));
  const issues = await page.evaluate(checks, MONO_MIN);
  console.log(issues.length ? `${deck} CHECKS\n  ` + issues.join('\n  ') : `${deck}: checks clean`);
  if (JOB) issues.forEach(x => console.log('@warn ' + x));
  if (!pdfOnly) for (let i = 1; i <= n; i++) {
    if (only && i !== only) continue;
    const el = await page.$('#s' + i);
    await el.screenshot({ path: path.join(dest, pad2(i) + '.png') });
    if (JOB) console.log('@file ' + path.join(dest, pad2(i) + '.png'));
  }
  if (deck === 'linkedin' && (pdfOnly || !only)) {
    await page.emulateMediaType('print');
    await page.pdf({ path: path.join(dest, 'carousel.pdf'), width: C.width + 'px', height: C.height + 'px', printBackground: true, preferCSSPageSize: true });
    if (JOB) console.log('@file ' + path.join(dest, 'carousel.pdf'));
  }
  await browser.close();
  if (pdfOnly) { console.log(`${deck}: carousel.pdf -> ${dest}`); return; }
  execFileSync('python3', [path.join(HERE, 'overview.py'), dest, String(n)], { stdio: 'inherit' });
  console.log(`${deck}: ${n} slides -> ${dest}`);
}

const decks = process.argv.slice(2).filter((a, i, all) => !a.startsWith('--') && all[i - 1] !== '--slide');
for (const d of (decks.length ? decks : ['instagram', 'linkedin'])) await render(d);
