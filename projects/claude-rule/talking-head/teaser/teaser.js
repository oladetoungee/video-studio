/* claude-rule TEASER (LinkedIn and X): 14 of her lines in an order built for tension, in the film's look "The Thread"
 * (lilac #CDBFF3, ink chat bubbles, Schibsted Grotesk, IBM Plex Mono). Spec: inspiration/know-how/TEASER-PLAYBOOK.md.
 * Order (round 2, after the critic): cold open on her sharpest question ("wouldn't Anthropic itself be an offender?") with
 * the topic in big type -> the rule -> how it works -> why (Anthropic isn't sure) -> her answer (a tool, not conscious) ->
 * human attributes, the slope -> the what-if (tired at 9pm) -> the turn (not fighting for cruelty; "No, it's not.") ->
 * payoff (don't be cruel people) -> the button ("Or am I the dumb person here?") -> end card. No countdown (this recording
 * has no silent stretch). Bites: talking-head.json "teaser" (source seconds). */
'use strict';
function buildMoment() {
  const B = TZ.bites();
  const ink = CR.ink, lil = CR.lilac;
  const px = (n) => n / BASE[0];   // canvas px -> layout px (1:1 and 4:5 are the 9:16 layout scaled down)
  const FR = ['mid', 'wide', 'close', 'mid', 'wide', 'close', 'mid', 'wide', 'mid', 'wide', 'mid', 'close', 'mid', 'wide'];
  const talk = (i, from, o = {}) => TZ.talk(i, { frame: FR[i], from, ...o });
  const HOOK_END = Math.min(B[0].t1, 2.9);

  // 0 · cold open: her question, the topic big on screen
  talk(0, 0, { push: V([1.18, 1.3], [1.1, 1.22]), side: V('right', undefined) });   // 16:9: her to the right, the title on the left
  sfx('notify', 0.1, -4);
  // 1 · the rule: the film's chat types her first words, then her
  const ab = TZ.at(1, 'about');
  TZ.insert([B[1].t0, ab - 0.05], { sync: 'from the 12th', noCaps: true, id: 'i-open' });
  talk(1, ab - 0.05 - B[1].t0);
  sfx('pop', B[1].t0 + 0.04, -4);
  // 2 · how it is enforced: "This conversation has ended" (the settled screen: banner, screenshot, her words)
  const end2 = TZ.at(2, 'end the conversation');
  talk(2, 0, { to: end2 - 0.1 - B[2].t0 });
  TZ.insert([end2 - 0.1, end2 + 2.4], { scene: 'other-side', from: 0.6, enter: 'snap', noCaps: true, id: 'i-ended' });
  TZ.talk([end2 + 2.4, B[2].t1], { frame: 'close', id: 'ended-her' });
  sfx('tick', B[2].t0, -3); sfx('notify', end2 - 0.06, -5);
  // 3 · why: Anthropic isn't sure
  talk(3, 0, { punch: ['conscious'] });
  // 4 · her answer: a tool (the film spells it and holds), then her
  const notH = TZ.at(4, 'it is not');
  TZ.insert([B[4].t0, notH + 0.9], { sync: 'claude is a tool', after: 80, noCaps: true, id: 'i-tool' });
  talk(4, notH + 0.9 - B[4].t0);
  sfx('typeHit', B[4].t0 + 0.05, -2);
  // 5 · not conscious: her, then the film's "living" card
  const cb = TZ.at(5, 'consciousness belongs');
  talk(5, 0, { to: cb - 0.08 - B[5].t0 });
  TZ.insert([cb - 0.08, B[5].t1], { sync: 'consciousness belongs to living', after: 100, enter: 'snap', noCaps: true, id: 'i-living' });
  sfx('shutter', cb - 0.05, -4);
  // 6 · human attributes, very powerful, "not going to end nicely"
  const pw = TZ.at(6, 'and this tool'), sod = TZ.at(6, "so i don't see");
  TZ.insert([B[6].t0, pw - 0.06], { sync: 'we are assigning', after: 125, noCaps: true, id: 'i-attributes', film: { offset: 1.0 } });
  TZ.insert([pw - 0.06, sod - 0.06], { sync: 'and this tool', after: 125, enter: 'snap', noCaps: true, id: 'i-powerful' });
  TZ.talk([sod - 0.06, B[6].t1], { frame: 'close', id: 'nicely-her' });
  sfx('tick', B[6].t0, -4); sfx('hit', pw, -8);
  // 7 · the slope: the film's tilting plank (scaled up, centred), then her punch line
  const users = TZ.at(7, 'about how users'), slip = TZ.at(7, 'very slippery') - 0.25;
  TZ.insert([B[7].t0, users - 0.08], { sync: 'the tech company', after: 130, enter: 'snap', noCaps: true, id: 'i-slope', zoom: V(1.25, 1.1), zoomAt: V([0.46, 0.66], [0.5, 0.8]), zoomGround: lil });
  TZ.talk([users - 0.08, B[7].t1], { frame: 'close', id: 'slope-her' });
  TH.keyword({ from: slip, to: B[7].t1 - 0.45 }, 'a slippery ~slope~', { id: 'k-slope', hold: 0.3 });
  sfx('swipe', B[7].t0 + 0.05, -4);
  // 8 · the what-if (a turn: tape)
  talk(8, 0, { punch: ['tired'] });
  sfx('tape', B[8].t0 + 0.02, -6);
  // 9 · 9pm: the film's thread, then her acting it out
  const nine = TZ.at(9, 'and now'), hey = TZ.at(9, 'hey');
  talk(9, 0, { to: nine - 0.1 - B[9].t0 });
  TZ.insert([nine - 0.1, hey - 0.1], { sync: 'and now', after: 185, noCaps: true, id: 'i-ninepm' });
  TZ.talk([hey - 0.1, B[9].t1], { frame: 'close', id: 'tired-her' });
  sfx('clock', nine, -4);
  // 10 · the turn: she is not defending cruelty
  talk(10, 0); sfx('tape', B[10].t0 + 0.02, -8);
  // 11 · "No, it's not." (the film's big type)
  const no = TZ.at(11, 'no');
  talk(11, 0, { to: no - 0.08 - B[11].t0 });
  TZ.insert([no - 0.08, B[11].t1], { sync: 'no', after: 238, noCaps: true, id: 'i-no' });
  sfx('pop', no - 0.05, -4);
  // 12 · payoff
  talk(12, 0, { push: V([1.22, 1.32], [1.16, 1.26]) });
  TH.keyword({ from: TZ.at(12, "we don't want"), to: B[12].t1 - 0.2 }, 'we don’t want to be ~cruel~ people', { id: 'k-cruel', hold: 0.2 });
  // 13 · the button
  talk(13, 0); sfx('tick', B[13].t0, -5);

  /* ---------- the topic: big on the first frames (over her), then a small "new video" pill for the rest ---------- */
  TZ.layer(0, FOOT.dur, (t, r) => {
    const sc_ = SCENES[sceneIndex(t)]; if (t > HOOK_END && sc_ && sc_.layout === 'insert') return;   // the film's own screens stay clean
    const fT = (z) => `800 ${z}px "Schibsted Grotesk"`, f = (z) => `700 ${z}px "Schibsted Grotesk"`, fm = (z) => `500 ${z}px "IBM Plex Mono"`;
    const k = E.inOutQuart(prog(t, HOOK_END - 0.45, 0.45));
    // the hook title (editable): two lines, ink bubble
    const HK = PORTRAIT ? 'Anthropic’s new rule:\ndon’t be cruel to Claude' : 'Anthropic’s new rule:\ndon’t be cruel\nto Claude'; const ovH = ovr('hook'); const hk = ovH.s != null ? ovH.s : HK;
    if (k < 1 && !ovH.hide) {
      const z = PORTRAIT ? px(ASPECT === '9x16' ? 84 : 66) : 74, lines = hk.split('\n'), pad = z * 0.55;
      const bw = Math.max(...lines.map(l => tw(l, fT(z), -0.03 * z))) + pad * 2, bh = z * 0.9 + lines.length * z * 1.08 + pad;
      const bx = PORTRAIT ? r.x + (r.w - bw) / 2 : 80, by = PORTRAIT ? r.y + (ASPECT === '9x16' ? 300 : px(34)) : (r.h - bh) / 2 - 40;
      const pin = E.outQuint(prog(t, 0, 0.3));
      withA((1 - k) * pin, () => { ctx.fillStyle = ink; rr(bx, by, bw, bh, z * 0.3); ctx.fill();
        _txt('NEW VIDEO', bx + pad, by + z * 0.75, fm(z * 0.38), lil, 'left', 'alphabetic', z * 0.03);
        lines.forEach((l, i) => _txt(l, bx + pad, by + z * 0.9 + z * 1.08 * (i + 0.82), fT(z), i ? lil : '#FFFFFF', 'left', 'alphabetic', -0.03 * z)); });
      regBox(ovH, bx, by, bw, bh, { text: hk, def: HK });
    }
    if (k <= 0) return;
    // the pill (editable)
    const s0 = PORTRAIT ? px(38) : 36; const a = 'new video'; const ov = ovr('label'); const b = 'Anthropic’s new rule for Claude'; const sb = ov.s != null ? ov.s : b; if (ov.hide) return;
    const wa = tw(a, fm(s0 * 0.82), s0 * 0.04), wb = tw(sb, f(s0), -0.01 * s0), pad = s0 * 0.6, gap = s0 * 0.7, w = wa + gap + wb + pad * 2, h = s0 * 1.9;
    const x = PORTRAIT ? r.x + (r.w - w) / 2 : 64, y = PORTRAIT ? r.y + (ASPECT === '9x16' ? 170 : px(44)) : 50;
    moved(ov, () => withA(k, () => { ctx.fillStyle = ink; rr(x, y, w, h, s0 * 0.45); ctx.fill();
      _txt(a, x + pad, y + h * 0.64, fm(s0 * 0.82), lil, 'left', 'alphabetic', s0 * 0.04);
      _txt(sb, x + pad + wa + gap, y + h * 0.66, f(s0), '#FFFFFF', 'left', 'alphabetic', -0.01 * s0);
      regBox(ov, x, y, w, h, { text: sb, def: b }); }));
  });

  /* ---------- end card: the thread ends on the video, with where to watch ---------- */
  const title = (FOOT.m.endCard || {}).title || FOOT.man.videoTitle;
  TZ.endCard((t, r, lt) => {
    rect(r.x, r.y, r.w, r.h, lil);
    const port = PORTRAIT, s = port ? px(60) : 76, cw = port ? Math.min(r.w - px(110), px(940)) : 1400, cx = r.x + r.w / 2, x0 = cx - cw / 2;
    const fB = `700 ${s}px "Schibsted Grotesk"`; const lh = s * 1.22;
    // the bubble (her title types on, as in the film)
    const ov = ovr('title'); const ttl = ov.s != null ? ov.s : title;
    const words = ttl.split(/\s+/); const lines = []; let cur = '';
    for (const w of words) { const tst = cur ? cur + ' ' + w : w; if (tw(tst, fB) > cw - s * 1.2 && cur) { lines.push(cur); cur = w; } else cur = tst; } if (cur) lines.push(cur);
    const bh = lines.length * lh + s * 0.9, bw = Math.max(...lines.map(l => tw(l, fB))) + s * 1.2;
    const hs0 = port ? px(118) : 150; const blockH = bh + s * 0.5 + s * 1.7 + hs0 * 1.25 + hs0 * 0.7; const top = r.y + (r.h - blockH) / 2 + s * 0.3;
    const fm = `500 ${port ? px(36) : 34}px "IBM Plex Mono"`;
    withA(prog(lt, 0.05, 0.25), () => { _txt('New video · With Gbemi', cx, top - s * 0.6, fm, CR.mute, 'center', 'alphabetic', 0.06 * s); });
    const p1 = E.outQuint(prog(lt, 0.25, 0.45));
    if (p1 > 0) withA(p1, () => withT(0, (1 - p1) * 30, 1, 0, () => {
      ctx.fillStyle = ink; rr(cx - bw / 2, top, bw, bh, s * 0.32); ctx.fill();
      const nCh = ttl.length; let k = 0;   // (the whole title at once: a phone reader needs it all)
      lines.forEach((l, i) => { const shown = l.slice(0, Math.max(0, nCh - k)); k += l.length + 1;
        _txt(l, cx - bw / 2 + s * 0.6, top + s * 0.45 + lh * (i + 0.78), fB, 'rgba(255,255,255,0.28)', 'left');
        _txt(shown, cx - bw / 2 + s * 0.6, top + s * 0.45 + lh * (i + 0.78), fB, '#FFFFFF', 'left'); });
      regBox(ov, cx - bw / 2, top, bw, bh, { text: ttl, def: title });
    }));
    // second bubble: where to watch
    const y2 = top + bh + s * 0.5; const p2 = E.outQuint(prog(lt, 1.7, 0.4)); const ov2 = ovr('where'); const wh = ov2.s != null ? ov2.s : 'Full video on YouTube';
    const fW = `700 ${s * 0.9}px "Schibsted Grotesk"`; const w2 = tw(wh, fW) + s * 1.2, h2 = s * 1.7;
    if (p2 > 0 && !ov2.hide) withA(p2, () => withT(0, (1 - p2) * 24, 1, 0, () => { ctx.fillStyle = '#FFFFFF'; rr(cx + bw / 2 - w2, y2, w2, h2, s * 0.32); ctx.fill();
      _txt(wh, cx + bw / 2 - w2 + s * 0.6, y2 + h2 * 0.66, fW, ink, 'left'); regBox(ov2, cx + bw / 2 - w2, y2, w2, h2, { text: wh, def: 'Full video on YouTube' }); }));
    // the handle
    const p3 = E.outExpo(prog(lt, 2.4, 0.5)); const hs = hs0;
    if (p3 > 0) withA(p3, () => { const y3 = y2 + h2 + hs * 1.25; txt('@WithGbemi', cx, y3 + (1 - p3) * 20, `800 ${hs}px "Schibsted Grotesk"`, ink, 'center', 'alphabetic', -0.035 * hs, 'handle');
      txt('youtube.com/@WithGbemi', cx, y3 + hs * 0.62, fm, CR.mute, 'center', 'alphabetic', 0.04 * s, 'url'); });
  }, { ground: 'lil' });
  const T0 = FOOT.dur;
  sfx('riser', T0 - 0.02, -10); sfx('hit', T0 + 0.02, -6); sfx('notify', T0 + 0.27, -5); sfx('pop', T0 + 1.72, -5); sfx('typeHit', T0 + 2.42, -3);
}
