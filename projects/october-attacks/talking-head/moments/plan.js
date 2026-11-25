/* october-attacks: the edit plan, shared by the FULL edit (moments/full.js) and every short (shorts/shNN.js).
 * Written 2026-10-26 by the talking-head agent. OA_SENT = her sentences (her corrected words, in order); OA_PLAN(mode)
 * finds the ones inside this moment (a short is one stretch of the video) and runs every layout call whose sentences are
 * all there. In a short: the first sentence is always her talking (no overlay at the start, her rule 2026-10-18), no L3
 * shout at all, at most one keyword. Change a layout here and the full edit and the shorts that hold it change together;
 * a short can still add or override its own calls after OA_PLAN('short') (OA.skip(id) drops one of these). */
'use strict';
const OA_SENT = {
"s0": "a lot of things have been happening on the internet this month",
"s1": "october is supposed to be cybersecurity awareness month and it has ironically been one attack after the other",
"s2": "php which is the language behind most of the websites in the world has had two critical security holes",
"s3": "railway which is also a popular platform among developers where we deploy apps has had to literally tell their users to change their secret keys",
"s4": "there is also another platform zeabur that is literally shutting down after being hacked twice like they're literally checking out",
"s5": "and there is news of another hacker that has used ai agents to break into more than a hundred companies",
"s6": "so it's been an overflow of attacks this month",
"s7": "i believe the php one is the biggest one so far",
"s8": "php runs nearly three quarters of the websites in the world",
"s9": "wordpress runs on php",
"s10": "laravel runs on php",
"s11": "i write laravel at work",
"s12": "most of the web runs on php",
"s13": "and two critical loopholes have been found in php this month",
"s14": "they're calling it the php2shell",
"s15": "and the shell part of the name is actually very important",
"s16": "getting a shell means that the attack is so bad that an attacker can type commands on your server as if they were on their own personal computer",
"s17": "php has rated this 92 out of 10",
"s18": "so it is really terrible",
"s19": "now there are two bugs reported",
"s20": "the first one is about memory",
"s21a": "so if php runs out of memory at a very specific moment while it's reading a request it leaves some unfinished data behind",
"s21b": "then it's cleanup code treats that broken data like it's real and an attacker can use it to run their own commands",
"s22": "the second bug is more about leftover information like leftover stuff on php workers from previous requests that it should have thrown away",
"s23": "now these are not just random bugs",
"s24": "these are huge loopholes that people have already tried to exploit",
"s25": "the thing about php2shell and why it's really so crazy is that it happens before your code even runs",
"s26": "so php reads the incoming request first and this loophole is in that reading part",
"s27": "so your login your middleware your authentication nobody stands a chance against this stuff",
"s28": "you can have the best login in the world and it wouldn't matter",
"s29": "even amazon has reported that someone tried to use it on one of their madpot servers which is basically a trap server set up to catch attackers just four days before it was even announced",
"s30": "and there are government websites in europe that literally went off while they patched because of all of this drama",
"s31": "so basically if you're running php anywhere you have to update your php",
"s32": "if you're still on php 81 or older you need to upgrade and updating the package is not even enough",
"s33": "you have to restart your apache and if you use docker you have to rebuild your images",
"s34a": "everyone has been patching and if you're using laravel for example your laravel version doesn't even protect you here",
"s34b": "because the loophole is in php which is underneath laravel and it's not even just php",
"s35": "nodejs also add its own security release on that same day",
"s36": "so if you run node you need to update to that too",
"s37": "now while everyone was busy patching php",
"s38": "railway happened on the same day",
"s39": "if you don't know what railway is railway is a deployment platform where you can deploy your apps",
"s40": "so basically railway says someone may have accessed their customers' encrypted environment variables and if you're a developer you know how important it is to keep your environment variables safe",
"s41a": "so railway paused deployments for a while this even affected me",
"s41b": "and they asked their users to revoke and change their api keys and cloud keys",
"s42": "there's still no full details from railway on how the attack has gotten",
"s43": "they did say however that it's part of a series of attacks on platforms like theirs with the goal of getting to ai companies",
"s44": "now zeabur the company that is shutting down because of attacks is a very interesting one",
"s45": "this is also another platform that developers use to deploy apps and they are deciding to shut down completely",
"s46": "they got breached in august and on october 14th and 15th they got breached again which leaked internal credentials",
"s47a": "the second breach covered about 321810 accounts",
"s47b": "and about 32 million environment variables records",
"s48": "so how did the attackers get in the second time after they got in the first time",
"s49": "according to zeabur their admin token had no expiry date",
"s50": "so they had not changed this token since january 2024",
"s51": "so after the first attack when they changed their keys they didn't include that particular set of tokens",
"s52": "they didn't change those set and that kind of opened the gates again and the old platform now is deciding to shut down",
"s53": "they will pause services and just shut everything down by the end of december",
"s54": "this is crazy",
"s55": "the opencode one is also very very interesting because people found out opencode had been hacked from their bills",
"s56": "opencode is an open source ai coding tool",
"s57": "it has an online platform called opencode console where people store their ai api keys",
"s58": "now opencode said attackers broke into an older system and took those keys",
"s59": "so people started getting alerts from openai and anthropic google and some of these charges were in hundreds of dollars",
"s60": "a few of them were even over a thousand dollars for ai usage that users did not run",
"s61": "like imagine getting alerts for things you didn't use",
"s62": "opencode calls it a distillation attack",
"s63": "that is when someone asks an ai model loads of questions and just uses the answer to train their own model",
"s64": "so basically in simple words someone may have been building their own ai on other people's bill",
"s65": "of course the ai companies have blocked the stolen keys and refunds are going out which is good",
"s66": "when you put the railway the zeabur and opencode's incident side by side you realize they are kind of the same pattern",
"s67": "in these situations particularly the attackers went straight for the place where developers keep their secret keys",
"s68": "so if you use any of this platform you want to change any key you're not sure about",
"s69": "you want to give your keys an expiry date whenever or wherever the service allows it",
"s70": "you want to give each keys only the access it needs",
"s71": "so if a key only needs to read one storage bucket just give it access to that one storage bucket",
"s72": "set spending limits set alerts on all your ai and cloud accounts and honestly do not store keys in tools that don't need them",
"s73": "now there's one more story from the october drama and this one actually sounds so made up",
"s74": "emudhra is one of the companies that your browsers trust to confirm that a website is who it really says it is",
"s75": "that is how important this company is",
"s76": "so it's like this little padlock that your browser depends on",
"s77": "now it turns out that eight of its signing",
"s78": "keys were so weak that one of them literally was the number four",
"s79": "just number four",
"s80": "that's how weak their keys were",
"s81": "like just number four",
"s82": "so the scripts went wrong when the keys were made in april 2025 and it made a second set of weak keys",
"s83": "and with keys like this of course someone could fake the website and your browser will still have shown the padlock",
"s84a": "so be honest in cases like this i don't think there is anything the average users can even do about these things",
"s84b": "but just to keep your stuff updated",
"s85": "and i think in the middle of all of this attack drama is where the role that ai plays on all sides",
"s86": "reuters reported that one attacker used ai agents to break into more than a hundred company websites",
"s87": "these include sites belonging to sharkninja cummins all of those",
"s88": "so in this case what the attackers did was that it gave the agent short instructions and just let them run on for hours on their own",
"s89": "and the cost estimated to about 50 in ai tokens per successful hack",
"s90": "like it's so crazy that we've gotten to the point where it's costing 50 to hack into a company",
"s91": "it's just been so interesting reading and seeing the news everywhere",
"s92": "what i find even interesting is how ai is literally on both sides",
"s93": "for example the php2shell loopholes were found with help from ai and here ai is also being used by the attackers",
"s94": "so the same tools that are helping the defenders find the bugs faster are also helping the attackers break in faster",
"s95": "so it's almost like this back and forth situation",
"s96": "i have people that are working in companies that have literally been stuck over dealing with attacks",
"s97": "it's been crazy really crazy"
};
OA.skipIds = new Set(); OA.skip = (...ids) => ids.forEach(i => OA.skipIds.add(i));
function OA_PLAN(mode) {
  const s = {}; for (const [k, q] of Object.entries(OA_SENT)) { try { s[k] = P(q); } catch (e) { /* not in this moment */ } }
  const keys = Object.keys(s); const first = keys[0]; let kws = 0;
  const on = (refs, kind, fn) => {
    if (!refs.length || refs.some(r => !s[r])) return;
    if (mode === 'short') {
      if (kind === 'shout' || kind === 'corner' || kind === 'pops' || kind === 'stack') return;   // (L4 items sit at the top of a 9:16 frame: under her label)   // no big overlay, no small circle under the label, no tags around her head
      if (refs.includes(first) && kind !== 'talk') return;
      if (kind === 'kw' && ++kws > 1) return;
    }
    const n0 = TH.segs.length; fn(); const sg = TH.segs[TH.segs.length - 1];
    if (sg && TH.segs.length > n0 && OA.skipIds.has(sg.id)) TH.segs.pop();
  };
  // shorts: her picture stays at the 3:4 window's size (CHECKS short-zoom 0.15-0.30): no close / tight framings, no punch-ins
  const tile0 = TH.tile; if (mode === 'short') TH.tile = (sp, o = {}) => TH.split(sp, { ...o, her: 0.42, side: 'bottom', at: undefined, w: undefined });   // shorts: her 3:4-size strip, never a small window over the page
  // shorts: a full-frame film scene becomes the film on a top panel that starts below her label (SHORTS-PLAYBOOK), her below
  const cut0 = TH.cutaway; if (mode === 'short') TH.cutaway = (sp, o = {}) => TH.half(sp, { film: { ...(o.film || {}) }, side: 'top', size: 1150, id: o.id, noCaps: o.noCaps, lead: o.lead });
  // shorts: a film scene in a split / presenter panel goes on the top film panel instead (it zooms onto what the film draws)
  const split0 = TH.split, pres0 = TH.presenter, filmTop = (sp, o) => TH.half(sp, { film: { ...o.film, aspect: '9x16', fit: undefined }, side: 'top', size: 1150, id: o.id, noCaps: o.noCaps, lead: o.lead });
  if (mode === 'short') { TH.split = (sp, o = {}) => (o.film ? filmTop(sp, o) : split0(sp, o)); TH.presenter = (sp, o = {}) => (o.film ? filmTop(sp, o) : pres0(sp, o)); }
  const talk0 = TH.talk; if (mode === 'short') TH.talk = (sp, o = {}) => talk0(sp, { ...o, frame: /close|tight/.test(o.frame || '') ? 'wide' : o.frame, punch: undefined, push: undefined });
  if (mode === 'short' && first) TH.talk(s[first], { frame: 'mid', id: 'hook' });
  const T0 = (ph) => ph.t - 0.12;
  const src = (key, ph, word, o = {}) => OA.src(key, { t0: T0(ph), hl: word ? WT(ph, word) : undefined, ...o });
  const F16 = { capRoom: V(250, 0) };   // full-frame pages keep her caption band free (16:9)
  const TR = { capRoom: V(250, 0), padR: V(580, 0) }, TL = { capRoom: V(250, 0), padL: V(580, 0) };   // a page beside her window tile
  const KW = (sp, w, o = {}) => { const ws = String(w).replace(/~/g, '').split(/\s+/); const c = ws.find(x => x.length > 3) || ws[0]; const tc = WT(sp, c);   // the whole phrase lands on its content word (never a lone 'a' / 'how')
    return TH.keyword(sp, w, { y: V(undefined, OA.short() ? Math.max(440, TH.labelBottom() + 170) : 290), times: o.times || ws.map(() => tc), ...o }); };   // 9:16: keywords in the band above her head

  /* ---------- 0:00 the month in one breath ---------- */
  on(["s0"], 'talk', () => TH.talk(s.s0, { frame: 'mid', push: [V(1.16, 1.12), V(1.26, 1.2)], id: 'open' }));
  on(["s1"], 'other', () => TH.split(s.s1, { her: V(0.38, 0.44), side: V('right', 'bottom'), id: 'month', film: { scene: 'month', aspect: '9x16', fit: 'safe' } }));
  on(["s2"], 'other', () => TH.tile(s.s2, { at: V('br', 'br'), w: V(520, 420), id: 'php-head', draw: src('php2shell-bleepingcomputer-head', s.s2, null, { day: 21 }) }));
  on(["s3"], 'other', () => TH.ots(s.s3, { side: 'auto', w: V(820, undefined), ar: V(4 / 3, 16 / 11), id: 'railway-head', draw: src('railway-techcrunch-head', s.s3, null, { ground: 'oaBone', m: V(36, 28) }) }));
  on(["s4"], 'other', () => TH.presenter(s.s4, { side: 'right', id: 'zeabur-head', draw: src('zeabur-bleepingcomputer-head', s.s4, null, { day: 14 }) }));
  on(["s5"], 'other', () => TH.room(s.s5, { at: 'ai agents', id: 'agents-head', draw: src('ai-agents-staradvertiser-reuters-head', s.s5, null, { t0: WT(s.s5, 'ai agents') - 0.2 }) }));
  on(["s6"], 'other', () => TH.behind(s.s6, ['OVERFLOW'], { times: [WT(s.s6, 'overflow')], id: 'overflow' }));

  /* ---------- 0:39 PHP2Shell ---------- */
  on(["s7"], 'talk', () => TH.talk(s.s7, { frame: 'close', punch: ['biggest'], id: 'biggest' }));
  on(["s8"], 'other', () => TH.ots(s.s8, { side: 'auto', id: 'three-quarters', draw: OA.stat({ big: '3/4', small: 'of the websites in the world', kicker: 'PHP runs nearly', foot: 'W3Techs, via Reuters', at: T0(s.s8) + 0.05 }) }));
  on(["s9", "s12"], 'stack', () => TH.stack({ from: s.s9, to: s.s12 }, [{ s: 'WordPress', at: 'wordpress' }, { s: 'Laravel', at: 'laravel runs' }, { s: 'I write Laravel', at: 'i write' }, { s: 'Most of the web', at: 'most of the web' }], { id: 'runs-on-php', plate: 'oa' }));
  on(["s13"], 'other', () => OA.full(s.s13, src('php2shell-php-net-q0', s.s13, 'critical', F16), { id: 'php-advisory' }));
  on(["s14", "s15"], 'shout', () => TH.shout({ from: s.s14, to: s.s15 }, ['*PHP2SHELL*'], { times: [WT(s.s14, 'php2shell')], id: 'name' }));
  on(["s15"], 'other', () => TH.highlight(WT(s.s15, 'shell'), 'shell'));
  on(["s16"], 'other', () => TH.split(s.s16, { her: V(0.36, 0.42), side: V('left', 'bottom'), id: 'shell', film: { scene: 'shell', aspect: '9x16', fit: 'safe' } }));
  on(["s17"], 'other', () => TH.cutaway(s.s17, { film: { scene: 'score' }, enter: 'push', id: 'severity', hold: 0.25 }));
  on(["s18"], 'talk', () => TH.talk(s.s18, { frame: 'close', punch: ['terrible'], id: 'terrible' }));
  on(["s19"], 'other', () => TH.card(s.s19, V(['Two bugs'], ['Two', 'bugs']), { start: WT(s.s19, 'two') - 0.18, times: [WT(s.s19, 'two') - 0.18, WT(s.s19, 'bugs')], id: 'two-bugs' }));
  on(["s20"], 'kw', () => KW(s.s20, 'about ~memory~', { id: 'memory' }));
  on(["s21a"], 'other', () => TH.presenter(s.s21a, { side: 'right', id: 'bug-memory', draw: src('php2shell-datadog-q3', s.s21a, 'unfinished data') }));
  on(["s21b"], 'corner', () => TH.corner(s.s21b, { film: { scene: 'bug1b' }, corner: 'auto', id: 'broken-data' }));
  on(["s22"], 'other', () => TH.ots(s.s22, { side: 'auto', id: 'bug-leftover', film: { scene: 'bug2', aspect: '16x9', fit: 'contain' } }));
  on(["s23"], 'talk', () => TH.talk(s.s23, { frame: 'mid', id: 'not-random' }));
  on(["s24"], 'other', () => OA.full(s.s24, src('php2shell-securityweek-q1', s.s24, 'tried to exploit', { ...F16, skipTop: 220 }), { id: 'exploited' }));
  on(["s25"], 'other', () => TH.split(s.s25, { her: V(0.36, 0.42), side: V('right', 'bottom'), id: 'before-code', draw: src('php2shell-php-net-q2', s.s25, 'before your code') }));
  on(["s26"], 'other', () => TH.page(s.s26, { kicker: 'How PHP2Shell works', title: ['PHP reads the request first'], titleAt: 'php reads', below: 'The loophole is in that reading part.', id: 'reads-first' }));
  on(["s27"], 'stack', () => TH.stack(s.s27, [{ s: 'Your login', at: 'your login' }, { s: 'Your middleware', at: 'your middleware' }, { s: 'Your authentication', at: 'your authentication' }], { id: 'no-chance', plate: 'oa' }));
  on(["s28"], 'kw', () => KW(s.s28, "it ~wouldn't matter~", { id: 'wouldnt-matter' }));
  on(["s29"], 'other', () => TH.tile(s.s29, { at: V('tl', 'br'), w: V(500, 420), id: 'madpot', draw: src('php2shell-thehackernews-q0', s.s29, 'four days', TL) }));
  on(["s30"], 'other', () => TH.half(s.s30, { side: V('right', 'top'), id: 'gov-sites', draw: src('php2shell-deseret-reuters-q0', s.s30, 'government websites', { ground: 'oaBone' }) }));

  /* ---------- 2:24 the fix ---------- */
  on(["s31"], 'other', () => TH.card(s.s31, V(['Update your PHP'], ['Update', 'your PHP']), { times: [WT(s.s31, 'update'), WT(s.s31, 'your php'), WT(s.s31, 'your php') + 0.15], id: 'update' }));
  on(["s32"], 'talk', () => TH.talk(s.s32, { frame: 'mid', punch: ['81'], id: 'php81' }));
  on(["s32"], 'kw', () => KW(s.s32, 'PHP ~8.1~ or older', { id: 'php81-kw' }));
  on(["s33"], 'other', () => (PORTRAIT ? TH.cutaway(s.s33, { film: { scene: 'fix' }, id: 'restart' }) : TH.tile(s.s33, { at: 'tr', w: 400, id: 'restart', film: { scene: 'fix' } })));
  on(["s34a", "s34b"], 'other', () => TH.presenter({ from: s.s34a, to: s.s34b }, { side: 'right', id: 'laravel', film: { scene: 'laravel', aspect: '9x16', fit: 'safe' } }));
  on(["s35", "s36"], 'other', () => TH.half({ from: s.s35, to: s.s36 }, { side: V('right', 'top'), id: 'nodejs', draw: src('nodejs-securityonline-q0', s.s35, 'security release', { ground: 'oaBone', skipTop: 150 }) }));

  /* ---------- 2:55 Railway ---------- */
  on(["s37", "s38"], 'other', () => TH.cutaway({ from: s.s37, to: s.s38 }, { film: { scene: 'busy' }, enter: 'push', id: 'same-day', noCaps: true }));
  on(["s39"], 'kw', () => KW(s.s39, 'a ~deployment platform~', { id: 'deploy' }));
  on(["s40"], 'other', () => TH.split(s.s40, { her: V(0.36, 0.42), side: V('right', 'bottom'), id: 'env-vars', lead: 0, film: { scene: 'env', aspect: '9x16', fit: 'safe' } }));
  on(["s41a"], 'other', () => TH.tile(s.s41a, { at: V('br', 'br'), w: V(500, 420), id: 'paused', draw: src('railway-railway-blog-q4', s.s41a, 'paused', TR) }));
  on(["s41b"], 'other', () => TH.ots(s.s41b, { side: 'auto', id: 'revoke-keys', draw: OA.key({ tag: 'API keys', state: 'taken', at: WT(s.s41b, 'change their') + 0.2, lines: ['Revoke and', '*change*'], times: [WT(s.s41b, 'revoke'), WT(s.s41b, 'and change'), WT(s.s41b, 'change')] }) }));
  on(["s42"], 'other', () => TH.half(s.s42, { side: V('left', 'top'), id: 'no-details', draw: src('railway-railway-prelim-report-q2', s.s42, null, { ground: 'oaBone', day: 22 }) }));
  on(["s43"], 'other', () => OA.full(s.s43, src('railway-railway-blog-q2', s.s43, 'series of attacks', F16), { id: 'series' }));

  /* ---------- 3:33 Zeabur ---------- */
  on(["s44"], 'shout', () => TH.shout(s.s44, ['ZEABUR'], { times: [WT(s.s44, 'zeabur')], id: 'zeabur-name' }));
  on(["s45"], 'other', () => TH.room(s.s45, { at: 'another platform', side: V('right', 'bottom'), id: 'zeabur-blog', draw: src('zeabur-zeabur-blog-head', s.s45, null, { ground: 'oaBone', t0: WT(s.s45, 'another platform') - 0.3 }) }));
  on(["s46"], 'other', () => TH.split(s.s46, { her: V(0.38, 0.44), side: V('left', 'bottom'), id: 'zeabur-dates', draw: OA.month({ at: T0(s.s46), head: 'Breached in August, then again', fills: [{ d: 14, at: WT(s.s46, '14th'), label: 'ZEABUR' }, { d: 15, at: WT(s.s46, '15th'), label: 'ZEABUR' }] }) }));
  on(["s47a"], 'other', () => TH.half(s.s47a, { side: V('right', 'top'), id: 'accounts', draw: OA.stat({ big: '321,810', small: 'accounts', kicker: 'Zeabur, second breach', at: T0(s.s47a) + 0.25, foot: 'Source: Zeabur' }) }));
  on(["s47b"], 'other', () => OA.full(s.s47b, src('zeabur-bleepingcomputer-q1', s.s47b, '32 million', F16), { id: 'env-records' }));
  on(["s48"], 'talk', () => TH.talk(s.s48, { frame: 'close', push: [V(1.4, 1.25), V(1.52, 1.34)], id: 'how-again' }));
  on(["s49", "s50"], 'other', () => TH.presenter({ from: s.s49, to: s.s50 }, { side: 'left', id: 'admin-token', draw: src('zeabur-bleepingcomputer-q2', s.s49, 'admin token') }));
  on(["s51"], 'other', () => TH.ots(s.s51, { side: 'auto', id: 'brass-key', draw: OA.key({ tag: 'Admin token', brass: true, at: T0(s.s51) }) }));
  on(["s52"], 'kw', () => KW(s.s52, 'opened the ~gates~', { id: 'gates' }));
  on(["s52"], 'talk', () => TH.talk({ from: s.s52, to: s.s52 }, { frame: 'close', push: [V(1.3, 1.2), V(1.42, 1.3)], id: 'gates-talk' }));
  on(["s53", "s54"], 'other', () => TH.tile({ from: s.s53, to: s.s54 }, { at: V('bl', 'br'), w: V(500, 420), id: 'december', draw: src('zeabur-zeabur-blog-q1', s.s53, 'december', TL) }));

  /* ---------- 4:28 OpenCode ---------- */
  on(["s55"], 'other', () => TH.room(s.s55, { at: 'opencode one', side: V('right', 'bottom'), id: 'opencode-head', draw: src('opencode-techcrunch-head', s.s55, null, { day: 19, t0: WT(s.s55, 'opencode one') - 0.3 }) }));
  on(["s56", "s57"], 'other', () => TH.page({ from: s.s56, to: s.s57 }, { kicker: 'OpenCode Console', title: ['Where people store', 'their AI API keys'], titleAt: 'where people', id: 'console' }));
  on(["s58"], 'other', () => TH.ots(s.s58, { side: 'auto', id: 'older-system', film: { scene: 'console', aspect: '16x9', fit: 'contain' } }));
  on(["s59"], 'pops', () => TH.pops(s.s59, [{ s: 'OpenAI', at: 'openai' }, { s: 'Anthropic', at: 'anthropic' }, { s: 'Google', at: 'google' }, { s: '$ hundreds', at: 'hundreds' }], { id: 'alerts', plate: 'oa' }));
  on(["s60"], 'other', () => OA.full(s.s60, src('opencode-techcrunch-q3', s.s60, 'thousand', F16), { id: 'thousand' }));
  on(["s61"], 'talk', () => TH.talk(s.s61, { frame: 'close', punch: ['imagine'], id: 'imagine' }));
  on(["s62", "s63"], 'kw', () => KW(s.s62, '~distillation~ attack', { id: 'distillation', until: s.s63.t - 0.15 }));
  on(["s63", "s64"], 'other', () => TH.half([WT(s.s63, 'asks an ai') - 0.1, s.s64.e + 0.4], { side: V('left', 'top'), id: 'distill-flow', film: { scene: 'distill' } }));
  on(["s65"], 'other', () => TH.ots(s.s65, { side: 'auto', id: 'refunds', draw: OA.stat({ big: 'Refunds', small: 'are going out', kicker: 'OpenCode', foot: 'Source: TechCrunch', at: T0(s.s65) + 0.25 }) }));

  /* ---------- 5:20 the same pattern: your keys ---------- */
  on(["s66"], 'other', () => TH.cutaway(s.s66, { film: { scene: 'pattern' }, id: 'pattern' }));
  on(["s67"], 'other', () => TH.split(s.s67, { her: V(0.36, 0.42), side: V('right', 'bottom'), id: 'went-for-keys', draw: src('railway-railway-prelim-report-q0', s.s67, 'secret keys', { day: 22 }) }));
  on(["s68"], 'other', () => TH.card(s.s68, V(['Change any key'], ['Change', 'any key']), { times: [WT(s.s68, 'change'), WT(s.s68, 'any key'), WT(s.s68, 'key')], id: 'change-keys' }));
  on(["s69", "s70"], 'other', () => TH.tile({ from: s.s69, to: s.s70 }, { at: V('br', 'br'), w: V(460, 400), id: 'keys-list-1', draw: OA.list({ kicker: 'Protect your keys', items: [{ s: 'Give keys an expiry date', at: T0(s.s69) + 0.3 }, { s: 'Only the access it needs', at: WT(s.s70, 'only the access') }] }) }));
  on(["s71"], 'kw', () => KW(s.s71, 'one ~storage bucket~', { id: 'bucket', until: s.s72 ? s.s72.t - 0.2 : undefined }));
  on(["s72"], 'other', () => TH.presenter(s.s72, { side: 'right', id: 'keys-list-2', draw: OA.list({ kicker: 'Protect your keys', from: 3, items: [{ s: 'Set spending limits', at: T0(s.s72) + 0.25 }, { s: 'Set alerts', at: WT(s.s72, 'set alerts') }, { s: 'No keys in unused tools', at: WT(s.s72, 'do not store') - 0.4 }] }) }));

  /* ---------- 5:57 eMudhra: the number 4 ---------- */
  on(["s73"], 'talk', () => TH.talk(s.s73, { frame: 'wide', push: [V(1.0, 1.08), V(1.12, 1.18)], id: 'made-up' }));
  on(["s73"], 'other', () => TH.glitch(WT(s.s73, 'made up'), {}));
  on(["s73"], 'kw', () => KW(s.s73, 'sounds so ~made up~', { id: 'made-up-kw' }));
  on(["s74", "s75"], 'other', () => TH.room({ from: s.s74, to: s.s75 }, { at: 'is one of', side: V('left', 'bottom'), id: 'emudhra-head', draw: src('emudhra-bleepingcomputer-head', s.s74, null, { day: 17, t0: WT(s.s74, 'is one of') - 0.3 }) }));
  on(["s76"], 'other', () => TH.half(s.s76, { side: V('right', 'top'), id: 'padlock', film: { scene: 'trust' } }));
  on(["s77", "s78"], 'other', () => TH.split({ from: s.s77, to: s.s78 }, { her: V(0.36, 0.42), side: V('right', 'bottom'), id: 'eight-keys', until: WT(s.s78, 'number') - 0.1, draw: src('emudhra-bleepingcomputer-q1', s.s77, 'so weak', { ground: 'oaBone' }) }));
  on(["s78", "s79"], 'other', () => OA.full([WT(s.s78, 'number') - 0.1, s.s79.e + 0.3], OA.key({ tag: 'eMudhra key', stamp: '4', stampAt: WT(s.s78, 'four'), at: WT(s.s78, 'number') - 0.1, lines: ['Just number *4*'], times: [WT(s.s79, 'just'), WT(s.s79, 'number'), WT(s.s79, 'four')] }), { id: 'number-four', sound: 'hit', noCaps: true }));
  on(["s80"], 'kw', () => KW(s.s80, 'how ~weak~', { id: 'how-weak' }));
  on(["s81"], 'other', () => KW(s.s81, 'just number ~4~', { id: 'just-4', times: [WT(s.s81, 'just'), WT(s.s81, 'number'), WT(s.s81, 'four')] }));
  on(["s82"], 'other', () => TH.tile(s.s82, { at: V('br', 'br'), w: V(480, 420), id: 'april-2025', draw: src('emudhra-bleepingcomputer-q2', s.s82, 'april 2025', TR) }));
  on(["s83"], 'other', () => TH.half(s.s83, { side: V('right', 'top'), id: 'fake-site', film: { scene: 'fake' } }));
  on(["s84a"], 'other', () => TH.split(s.s84a, { her: V(0.36, 0.42), side: V('left', 'bottom'), id: 'average-users', draw: src('emudhra-thenextweb-q1', s.s84a, 'blocked', { day: 17 }) }));
  on(["s84b"], 'other', () => TH.card(s.s84b, V(['Keep your stuff updated'], ['Keep your', 'stuff', 'updated']), { times: [WT(s.s84b, 'keep'), WT(s.s84b, 'your stuff'), WT(s.s84b, 'stuff'), WT(s.s84b, 'updated')], id: 'keep-updated' }));

  /* ---------- 6:53 AI on both sides ---------- */
  on(["s85"], 'other', () => TH.cutaway(s.s85, { film: { scene: 'ai-sides' }, enter: 'push', id: 'all-sides', noCaps: true }));
  on(["s86"], 'other', () => TH.presenter(s.s86, { side: 'left', id: 'agents', draw: src('ai-agents-staradvertiser-reuters-head', s.s86, null) }));
  on(["s87"], 'other', () => TH.half(s.s87, { side: V('right', 'top'), id: 'sharkninja', enter: 0.32, draw: src('ai-agents-staradvertiser-reuters-q1', s.s87, 'sharkninja', { ground: 'oaBone' }) }));
  on(["s88"], 'other', () => TH.cutaway([WT(s.s88, 'short') - 0.15, s.s88.e + 0.1], { film: { scene: 'run-hours' }, enter: 'push', id: 'agents-flow', noCaps: true, hold: 0.1 }));
  on(["s89"], 'other', () => TH.split(s.s89, { her: V(0.38, 0.44), side: V('left', 'bottom'), id: 'fifty', draw: OA.stat({ big: '$50', small: 'per successful hack', kicker: 'In AI tokens', foot: 'A researcher’s estimate, via Reuters', at: T0(s.s89) + 0.25, ground: 'oaOct' }) }));
  on(["s90"], 'other', () => TH.tile(s.s90, { at: V('br', 'br'), w: V(500, 420), id: 'fifty-src', draw: src('ai-agents-staradvertiser-reuters-q3', s.s90, '50', TR) }));
  on(["s91"], 'other', () => OA.full(s.s91, OA.heads({ at: T0(s.s91), capRoom: V(230, 0), keys: ['php2shell-bleepingcomputer-head', 'railway-techcrunch-head', 'zeabur-bleepingcomputer-head', 'opencode-techcrunch-head', 'emudhra-bleepingcomputer-head', 'ai-agents-staradvertiser-reuters-head'] }), { id: 'news-everywhere', sound: 'paper' }));
  on(["s92"], 'talk', () => TH.talk(s.s92, { frame: 'close', punch: ['both sides'], id: 'both-sides' }));
  on(["s92"], 'kw', () => KW(s.s92, 'on ~both sides~', { id: 'both-kw' }));
  on(["s93"], 'other', () => TH.room(s.s93, { at: 'found with help', side: V('right', 'bottom'), id: 'found-with-ai', draw: src('php2shell-deseret-reuters-q3', s.s93, 'help from ai', { ground: 'oaBone' }) }));
  on(["s94"], 'other', () => TH.split(s.s94, { her: V(0.36, 0.42), side: V('left', 'bottom'), id: 'faster', film: { scene: 'both', aspect: '9x16', fit: 'safe' } }));
  on(["s95"], 'kw', () => KW(s.s95, '~back and forth~', { id: 'back-forth' }));
  on(["s96"], 'other', () => TH.half(s.s96, { side: V('left', 'top'), id: 'close', draw: OA.month({ at: T0(s.s96), head: 'One attack after the other', fills: [[14, 'ZEABUR'], [15, 'ZEABUR'], [17, 'EMUDHRA'], [19, 'OPENCODE'], [21, 'PHP2SHELL'], [21, 'RAILWAY']].map(([d, label], k) => ({ d, label, at: T0(s.s96) + 0.3 + k * 0.28 })) }) }));
  on(["s97"], 'other', () => TH.behind(s.s97, ['CRAZY'], { times: [WT(s.s97, 'crazy')], id: 'crazy', hold: 1.2, size: V(250, 190), y: V(330, 600) }));

  TH.talk = talk0; TH.tile = tile0; TH.cutaway = cut0; TH.split = split0; TH.presenter = pres0;
  return s;
}
