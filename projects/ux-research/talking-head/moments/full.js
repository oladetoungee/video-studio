/* ux-research: the FULL talking-head edit (her whole video, tightened), in the research-wall look.
 * Layout menu L1-L13 (inspiration/know-how/MOTION-REFERENCES.md, studio/README.md "Talking-head layouts"). Rules: something
 * changes every 3-6 s, never the same layout twice in a row, >= 4 layouts a minute, her footage never flipped. Film scenes
 * come from the motion film (word-synced: `film: {}`). Gaps between segments are her plain framing (L1). */
'use strict';
function buildMoment() {
  /* ---------- 0:00 the question, UI vs UX ---------- */
  const a = PS({ app: "if you're building an app", q: 'who is this app for and what do they actually need it for', heart: 'that question is the heart of ux research',
    hci: "master's degree in human-computer interaction", start: 'in this video', ui: 'ui ux and then', home: 'all the way up to ux research',
    heard: "you've probably heard people say", crs: 'ui/ux course', two: 'but ui and ux are two different things', uis: 'ui stands for user interface', see: 'it is what you can see and touch',
    btn: 'the button the colours the layout the icons the screen', uxs: 'ux on the other hand stands for user experience', feel: 'it is how the whole product feels to use',
    q1: "can a user find what they're looking for", q4: 'did the user come back to use it', beau: 'so you can have a beautiful app', night: 'that is a nightmare to use',
    gui: 'in that case you have a great ui but terrible ux', part: 'so your ui is kind of part of your ux', big: 'the experience is just much bigger than what is on the screen' });
  TH.keyword(a.app, 'building an ~app?~', { times: [a.app.w[2], a.app.w[4]] });
  TH.shout(a.q, ['Who is this app for,', 'and what do they', '*need* it for?'], { times: pick(a.q, [0, 3, 4, 5, 6, 7, 9, 10, 11]) });              // L3
  TH.corner(a.heart, { film: {} });                                                                                                          // L11
  TH.keyword(a.hci, "my master's: ~HCI~", { times: [a.hci.w[0], a.hci.w[0] + 0.15, a.hci.w[3]] });                                          // L8
  TH.talk({ from: a.start, to: a.ui }, { frame: 'close', alt: true });
  TH.stack({ from: a.ui, to: a.home }, [{ s: 'UI', at: 'ui' }, { s: 'UX', at: 'ux' }, { s: 'UX research', at: 'research' }]);                // L4
  TH.half({ from: a.heard, to: a.crs }, { film: {} });                                                                                                            // L5
  TH.behind(a.two, ['UI ≠ UX'], { times: [a.two.w[3]] });                                                                                     // L2
  TH.half({ from: a.uis, to: a.btn }, { film: {}, side: V('left', 'top') });                                                                           // L5
  TH.talk(a.uxs, { frame: 'mid', punch: ['experience'] });
  TH.cutaway({ from: a.feel, to: a.q4 }, { film: {}, enter: 'push' });                                                                      // L9
  TH.talk(a.beau, { frame: 'close' });
  TH.pops({ from: a.night, to: a.gui }, ['great UI', 'terrible UX'], { focus: 1, focusAt: 'terrible' });                                      // L7
  TH.talk(a.part, { push: [1.0, 1.12] });
  TH.card(a.big, V(['The experience is much bigger', 'than what is on the screen.'], ['The experience', 'is much bigger', 'than the screen.']), { times: pick(a.big, [1, 2, 4, 5, 6, 7, 8, 9, 10, 11]) });   // L10

  /* ---------- 1:10 what UX is, Don Norman, the line ---------- */
  const b = PS({ what: 'now what is ux', cov: 'user experience or ux covers everything', term: 'the term was popularised by don norman when he was at apple',
    way: 'and the way he and jakob nielsen describe it', ev: "covers every part of a person's interaction with a company its services and its products",
    hcd: 'an idea called human-centred design', simple: 'the idea is simple', phrase: 'i love this phrase', q: "good design doesn't start with screens it starts with people",
    start: 'so you start from the people who use a product', needs: 'their needs their abilities their limitations their real lives', around: 'and you design around them' });
  TH.talk(b.what, { frame: 'close', alt: true });
  TH.half(b.cov, { film: {} });
  TH.cutaway({ from: b.term, to: b.ev }, { film: {}, enter: 'push' });                                                                      // the NN/g sources
  TH.keyword(b.hcd, '~human-centred~ design', { times: [b.hcd.w[3], b.hcd.w[4]] });
  TH.corner({ from: b.simple, to: b.phrase }, { film: {} });
  TH.card(b.q, V(["Good design doesn't start with screens.", 'It starts with *people*.'], ["Good design", "doesn't start", 'with screens.', 'It starts with *people*.']), { times: pick(b.q, [0, 1, 2, 3, 4, 5, 6, 7, 8]) });
  TH.talk(b.start, { frame: 'close' });
  TH.pops(b.needs, ['their needs', 'their abilities', 'their limitations', 'their real lives'], { focus: 3, focusAt: 'real' });
  TH.keyword(b.around, 'design ~around them~', { times: [b.around.w[2], b.around.w[3]] });

  /* ---------- 1:54 UX research, why, fail ---------- */
  const c = PS({ know: 'so now we know what ux is', what: 'now what is ux research', get: 'ux research is how you get to know your users', und: 'it is the work of understanding',
    need: 'what they need where they struggle what they prioritise', right: 'so that you can build the product the right way', why: 'why are we doing all this research',
    wrong: "you don't want to build the wrong thing", guess: 'guess your way through', exp: 'building is very expensive', ai: 'even with ai you still spend your time and your tokens',
    team: 'you probably still need a team', f1: 'a lot of products fail because the team built something that maybe nobody actually needs', f2: 'some other products fail',
    find: "people just couldn't find their way around it", catch: 'ux research helps to catch both problems early on', cheap: 'it is cheaper to change your idea',
    live: 'than it is to rebuild an app that is already live', dec: 'and doing ux research means that decisions about a product come from', real: 'the real people actually do',
    rand: 'otherwise they just come from a random person on the team' });
  TH.talk(c.know, { frame: 'wide' });
  TH.shout(c.what, ['What is', '*UX research?*'], { times: [c.what.w[1], c.what.w[3]] });
  TH.half({ from: c.get, to: c.need }, { film: {}, side: V('left', 'top') });
  TH.corner(c.right, { film: {} });
  TH.keyword(c.why, 'why ~research?~', { times: [c.why.w[0], c.why.w[5]] });
  TH.behind(c.wrong, ['the wrong thing'], { times: [c.wrong.w[5]] });
  TH.keyword(c.guess, 'guess your ~way~?', { times: [c.guess.w[0], c.guess.w[2]] });
  TH.stack({ from: c.exp, to: c.team }, [{ s: 'your time', at: 'time' }, { s: 'your tokens', at: 'tokens' }, { s: 'a team', at: 'team' }]);
  TH.corner({ from: c.f1, to: c.find }, { film: {} });
  TH.keyword(c.catch, 'catch it ~early~', { times: [c.catch.w[4], c.catch.w[7]] });
  TH.cutaway({ from: c.cheap, to: c.live }, { film: {}, enter: 'push' });
  TH.half(c.dec, { film: {} });
  TH.pops({ from: c.real, to: c.rand }, ['real people', 'a random person on the team'], { focus: 0, focusAt: 'real' });

  /* ---------- 2:59 the researcher ---------- */
  const d = PS({ who: 'now who is a ux researcher', does: 'a ux researcher does ux research', works: 'works closely with designers product managers engineers and the people running the business',
    bring: 'their job is to bring real users into those conversations', typ: 'a typical week for a ux researcher might look like', plan: 'planning a study',
    rec: 'recruiting people to take part', run: 'running user interviews or usability testing', sit: 'then sitting down with the notes or the recordings to find patterns',
    fin: 'and finally sharing what they found', built: 'changes what gets built', mix: 'people usually mix up who a ux researcher is',
    rj: "a ux researcher's job is to understand the users", dj: "a ux designer's job is to take that understanding", small: 'in smaller teams', both: 'ends up doing both jobs',
    pm: 'a lot of product managers that do research', need: 'what you need to dive into ux research is just genuine curiosity', study: 'taking the time to study people',
    listen: 'really good at listening', int: 'you must be interested in people' });
  TH.talk(d.who, { frame: 'mid' });
  TH.highlight(d.does.w[4], 'research');
  TH.keyword(d.does, 'does ~UX research~', { times: [d.does.w[3], d.does.w[4]] });
  TH.pops(d.works, ['designers', 'product managers', 'engineers', 'the business'], { focus: 3, focusAt: 'business' });
  TH.keyword(d.bring, 'bring in ~real users~', { times: [d.bring.w[4], d.bring.w[5]] });
  TH.half({ from: d.typ, to: d.sit }, { film: {} });
  TH.corner(d.fin, { film: {} });
  TH.card(d.built, V(['Changes what gets built'], ['Changes what', 'gets built']), { times: d.built.w });
  TH.stack(d.mix, [{ s: 'UX researcher', at: 'researcher' }]);
  TH.cutaway({ from: d.rj, to: d.dj }, { film: {}, enter: 'push' });
  TH.talk(d.small, { frame: 'close' });
  TH.keyword(d.both, 'one person, ~both jobs~', { times: [d.both.w[2], d.both.w[3]] });
  TH.talk(d.pm, { frame: 'mid', punch: ['research'] });
  TH.shout(d.need, ['Genuine', '*curiosity*'], { times: [d.need.w[10], d.need.w[11]] });
  TH.stack({ from: d.study, to: d.listen }, [{ s: 'study people', at: 'study' }, { s: 'find patterns', at: 'patterns' }, { s: 'listen', at: 'listening' }]);
  TH.behind(d.int, ['people'], { times: [d.int.w[5]] });

  /* ---------- 4:08 categories, the three pairs ---------- */
  const e = PS({ start: 'when i started reading and studying about ux research', cour: 'you go on coursera', places: 'you go to different places', list: 'you see generative and evaluative', unm: 'moderated unmoderated',
    useful: 'but the useful way to think about it', others: 'and others describe how you run the research', focus: 'i will focus on the first three big pairs', three: 'generative and evaluative qualitative and quantitative behavioural and attitudinal',
    first: 'the first big way to split ux research is generative versus evaluative', gen: 'generative ux research happens early', q: 'what is the real problem',
    get: 'how do they get by right now', gens: 'it generates ideas for what to build', thesis: "for my thesis i'm doing generative research",
    ev: 'evaluative research on the other hand happens later', q2: 'does this product actually work', exist: "so you're evaluating something that already exists",
    sum1: 'so generative ux research helps you decide what to build', sum2: 'and evaluative ux research tells you whether what you build works' });
  TH.half(e.start, { film: {} });
  TH.keyword(e.cour, '~Coursera~', { times: [e.cour.w[3]] });
  TH.cutaway({ from: e.places, to: e.others }, { film: {}, enter: 'push', corner: 'auto' });   // her circle: the emptiest corner (bottom-left sat on the "primary" note)
  TH.stack({ from: e.focus, to: e.three }, [{ s: 'generative / evaluative', at: 'generative' }, { s: 'qualitative / quantitative', at: 'qualitative' }, { s: 'behavioural / attitudinal', at: 'behavioural' }]);
  TH.card(e.first, V(['01 Generative vs evaluative'], ['01', 'Generative', 'vs evaluative']), { times: [e.first.w[1], e.first.w[8], e.first.w[9], e.first.w[10]] });
  TH.keyword(e.gen, 'happens ~early~', { times: [e.gen.w[3], e.gen.w[4]] });
  TH.pops({ from: e.q, to: e.get }, ['What is the real problem?', 'What do people need?', 'How do they get by now?'], { focus: 0, focusAt: 'problem' });
  TH.keyword(e.gens, 'ideas for what to ~build~', { times: [e.gens.w[2], e.gens.w[6]] });
  TH.sticker(e.thesis, { film: {}, tag: 'my thesis', lines: ['generative', '*research*'], linesAt: 'generative' });
  TH.half({ from: e.ev, to: e.exist }, { film: {}, side: V('left', 'top') });
  TH.cutaway(e.sum1, { film: {} });
  TH.keyword(e.sum2, 'does it ~work?~', { times: [e.sum2.w[7], e.sum2.w[10]] });

  /* ---------- 5:33 qualitative vs quantitative ---------- */
  const f = PS({ sec: 'the second way to split ux research is qualitative versus quantitative', quan: 'quantitative ux research is about numbers', many: 'how many people completed the task',
    pct: 'what percentage dropped off at checkout', long: 'how long did it take', what: 'it tells you what is happening and how much of it', qual: 'qualitative ux research is about understanding',
    why: 'why did the users drop off', conf: 'what confused them', small: "it's usually smaller and more in depth", tellwhy: 'it tells you the why', both: 'usually you want both',
    nums: 'you want the numbers to show where the problem is', conv: 'and you want the conversation to show why the problem is happening' });
  TH.card(f.sec, V(['02 Qualitative vs quantitative'], ['02', 'Qualitative', 'vs quantitative']), { times: [f.sec.w[1], f.sec.w[8], f.sec.w[9], f.sec.w[10]] });
  TH.talk(f.quan, { frame: 'mid', punch: ['numbers'] });
  TH.stack({ from: f.many, to: f.long }, [{ s: 'how many?', at: 'many' }, { s: 'what %?', at: 'percentage' }, { s: 'how long?', at: 'long' }]);
  TH.corner(f.what, { film: {} });
  TH.talk(f.qual, { frame: 'close' });
  TH.half({ from: f.why, to: f.conf }, { film: {} });
  TH.talk(f.small, { frame: 'mid', alt: true });
  TH.behind(f.tellwhy, ['WHY'], { times: [f.tellwhy.w[4]] });
  TH.talk(f.both, { frame: 'close', punch: ['both'] });
  TH.cutaway({ from: f.nums, to: f.conv }, { film: {}, enter: 'push' });

  /* ---------- 6:06 attitudinal vs behavioural, say vs do ---------- */
  const g_ = PS({ third: 'now the third big way to split ux research is behavioural versus attitudinal', att: 'attitudinal ux research is about what users say', surv: 'surveys and interviews are mostly attitudinal',
    beh: 'behavioural ux research on the other hand is about what people actually do', watch: 'so you watch them use the thing', data: 'you look at the data and what they click',
    ham: 'i want to hammer on this', ears: 'during my first semester', say: 'that what people say and what people do are often very different',
    surv2: 'what they give you in a survey', ask: 'if you ask someone how they use an app they will give you an answer', watch2: 'if you watch them use the app',
    diff: 'something completely different', bel: 'and they might genuinely believe what they told you', hum: 'we are human beings', not: 'we are just not very good at noticing our own behaviours',
    good: 'so good ux research watches as much as it asks', still: 'what people say still matters', some: 'sometimes they do exactly what they tell you',
    match: "but when what they say and what they do don't match", useful: 'is also a very useful finding' });
  TH.card(g_.third, V(['03 Attitudinal vs behavioural'], ['03', 'Attitudinal', 'vs behavioural']), { times: [g_.third.w[2], g_.third.w[10], g_.third.w[11], g_.third.w[12]] });
  TH.half(g_.att, { film: {} });
  TH.pops(g_.surv, ['surveys', 'interviews'], { focus: 1, focusAt: 'interviews' });
  TH.half({ from: g_.beh, to: g_.data }, { film: {}, side: V('left', 'top') });
  TH.keyword(g_.ham, '~hammer~ on this', { times: [g_.ham.w[3]] });
  TH.sticker(g_.ears, { film: {}, tag: 'first semester', lines: ['say', 'vs *do*'], linesAt: 'semester' });
  TH.behind(g_.say, ['say', 'do'], { times: [g_.say.w[3], g_.say.w[7]] });
  TH.corner(g_.surv2, { film: {} });
  TH.cutaway({ from: g_.ask, to: g_.diff }, { film: {}, enter: 'push' });
  TH.talk(g_.bel, { frame: 'close', punch: ['genuinely'] });
  TH.keyword(g_.hum, 'we are ~human~', { times: [g_.hum.w[0], g_.hum.w[2]] });
  TH.talk(g_.not, { frame: 'mid', alt: true });
  TH.card(g_.good, V(['Good UX research watches', 'as much as it *asks*.'], ['Good UX research', 'watches as much', 'as it *asks*.']), { times: pick(g_.good, [0, 1, 2, 3, 4, 5, 6, 7, 8]) });
  TH.talk({ from: g_.still, to: g_.some }, { frame: 'close' });
  TH.corner({ from: g_.match, to: g_.useful }, { film: {} });
  TH.highlight(g_.useful.w[4], 'useful');

  /* ---------- 7:16 more categories, methods ---------- */
  const h = PS({ few: 'there are a few more categories of ux research', pri: 'the primary research is the research you do yourself', sec: 'secondary research uses what already exists',
    rem: 'remote ux research happens over a video call', inp: 'in-person research happens in the same room', body: 'body language', mod: 'and then we have moderated research',
    unm: 'and unmoderated research where people complete tasks on their own', how: 'so how is ux research actually done', int: "there's user interview",
    usa: "there's usability testing", loud: 'usually while they think out loud', surv: 'then we have surveys', reach: 'you can reach a lot of people quickly', less: 'but surveys usually have less depth', ctx: "and then there's contextual inquiry",
    diary: 'there are also diary studies', days: 'over days or weeks', card: "there's card sorting", ab: "there's a/b testing", all: "there's all kinds of ux research methods" });
  TH.talk(h.few, { frame: 'mid' });
  TH.cutaway({ from: h.pri, to: h.sec }, { film: {}, enter: 'push' });
  TH.stack({ from: h.rem, to: h.inp }, [{ s: 'remote', at: 'remote' }, { s: 'in person', at: 'in-person' }]);
  TH.talk(h.body, { frame: 'close' });
  TH.half({ from: h.mod, to: h.unm }, { film: {} });
  TH.shout(h.how, ['How is it', '*actually* done?'], { times: [h.how.w[1], h.how.w[4], h.how.w[5]] });
  TH.pops({ from: h.int, to: h.loud }, ['user interviews', 'usability testing', 'think out loud'], { focus: 1, focusAt: 'usability' });
  TH.stack({ from: h.surv, to: h.reach }, [{ s: 'surveys', at: 'surveys' }, { s: 'reach a lot of people', at: 'reach' }]);
  TH.keyword(h.less, 'less ~depth~', { times: [h.less.w[4], h.less.w[5]] });
  TH.corner({ from: h.ctx, to: h.days }, { film: {} });
  TH.pops({ from: h.card, to: h.all }, ['card sorting', 'A/B testing', 'and more'], { focus: 0, focusAt: 'card' });

  /* ---------- 8:45 small budget, user vs market research ---------- */
  const m = PS({ big: 'only big companies with big budgets can do', small: 'but even as a small startup some research is always better than no research', lab: "you don't need a lab",
    five: 'talk to five people who would actually use your product', friends: 'maybe yourself and a few friends', three: 'watch three of your friends try your app on a video call',
    counts: 'that also counts', deeper: 'good design goes so much deeper than just a nice visual', works: "it's about whether the thing actually works for the people using it",
    q: 'is ux research the same as user research', same: 'they mean the same thing', jobs: 'even in job titles', broad: 'now user research is the broader one',
    sits: 'ux research sits under it', about: 'user research is about understanding the users themselves', feed: 'it can feed into a lot of decisions that go beyond design',
    price: 'how customers feel about your prices or your delivery time', isnt: "it isn't really about the experience of your product", focus: 'ux research is more focused',
    goal: 'they share the same goal', market: 'both of them also differ from market research', buy: 'market research is more about what people would buy',
    use: 'ux research is about how people use the product' });
  TH.stack(m.big, [{ s: 'big companies', at: 'companies' }, { s: 'big budgets', at: 'budgets' }]);
  TH.card(m.small, V(['Some research is always', 'better than *no research*.'], ['Some research', 'is always better', 'than *no research*.']), { times: pick(m.small, [6, 7, 8, 9, 10, 11, 12, 13]) });
  TH.behind(m.lab, ['no lab'], { times: [m.lab.w[4]] });
  TH.cutaway({ from: m.five, to: m.three }, { film: {}, enter: 'push' });
  TH.keyword(m.counts, 'that ~counts~', { times: [m.counts.w[0], m.counts.w[2]] });
  TH.talk(m.deeper, { frame: 'close', punch: ['deeper'] });
  TH.half(m.works, { film: {} });
  TH.shout(m.q, ['UX research =', '*user research?*'], { times: [m.q.w[1], m.q.w[5]] });
  TH.stack({ from: m.same, to: m.jobs }, [{ s: 'UX research', at: 'same' }, { s: '= user research', at: 'thing' }]);
  TH.talk(m.broad, { frame: 'close' });
  TH.cutaway({ from: m.sits, to: m.price }, { film: {}, enter: 'push' });
  TH.corner({ from: m.isnt, to: m.focus }, { film: {} });
  TH.keyword(m.goal, 'same ~goal~', { times: [m.goal.w[3], m.goal.w[4]] });
  TH.half({ from: m.market, to: m.use }, { film: {}, side: V('left', 'top') });

  /* ---------- 9:55 AI, career, getting in ---------- */
  const n = PS({ will: 'will ai replace ux research', tools: 'ai tools are already doing a lot of the slow work', trans: 'they can transcribe interviews', summ: 'they can summarise hours of notes',
    saves: 'it saves ux researchers a lot of time', thesis: 'i cannot even imagine having to do my thesis four years ago', work: 'it would be a lot of work', chang: 'so ai is changing how ux research gets done',
    well: 'if you use it well', car: "if you're thinking about a career in ux research", stud: "i'm still a student", mast: "i'm currently doing my master's",
    jobs: 'the number of jobs with the title ux researcher is actually small', roles: 'compared to other design roles', exp: 'a lot of companies expect their designers',
    fewer: 'companies have fewer people whose whole job is research', skill: "it's still a very much needed skill", entry: "it's just the entry level that might be hard to break into",
    know: "i wouldn't know yet honestly", market: "i'm not in the job market for ux research yet", way: "the way i'm getting into it is by getting a master's degree",
    diff: 'you can get into it different ways', basics: 'you can learn the basics', guides: 'there are free guides from places like', foundation: 'interaction design foundation',
    books: 'there are a lot of books as well', real: 'and also try to do real research', pick_: 'just pick an app you use', write: 'write your first case study',
    vol: 'you can also volunteer', fields: 'come from other fields', cs: 'computer science', job: 'if your job already involves talking to people', love: 'maybe this is something you might love',
    deg: 'degrees going to school', valid: 'maybe even the most common one', that: "so that's ux research", long: "it's a very long video", forget: "just don't forget this phrase",
    g1: "good design doesn't start with screens", g2: 'good design starts with people' });
  TH.glitch(n.will.w[1], { text: 'AI?' });
  TH.shout(n.will, ['Will AI replace', '*UX research?*'], { times: [n.will.w[0], n.will.w[3]] });
  TH.talk(n.tools, { frame: 'mid', punch: ['slow'] });
  TH.half({ from: n.trans, to: n.saves }, { film: {} });
  TH.behind(n.thesis, ['my thesis'], { times: [n.thesis.w[8]] });
  TH.keyword(n.work, 'a lot of ~work~', { times: [n.work.w[3], n.work.w[6]] });
  TH.talk(n.chang, { frame: 'mid' });
  TH.highlight(n.well.w[3], 'well');
  TH.keyword(n.well, 'if you use it ~well~', { times: [n.well.w[0], n.well.w[4]] });
  TH.talk(n.car, { frame: 'wide' });
  TH.sticker({ from: n.stud, to: n.mast }, { film: {}, tag: "master's in HCI", lines: ['still a', '*student*'], linesAt: 'student' });
  TH.cutaway({ from: n.jobs, to: n.roles }, { film: {}, enter: 'push' });
  TH.pops(n.exp, ['designers', 'product managers'], { focus: 0, focusAt: 'designers' });
  TH.stack({ from: n.fewer, to: n.entry }, [{ s: 'fewer research-only jobs', at: 'fewer' }, { s: 'still a needed skill', at: 'skill' }, { s: 'entry level is hard', at: 'entry' }]);
  TH.keyword({ from: n.know, to: n.market }, 'not in the ~job market~ yet', { times: [n.market.w[1], n.market.w[4], n.market.w[5]] });
  TH.corner({ from: n.way, to: n.basics }, { film: {} });
  TH.pops({ from: n.guides, to: n.books }, ['Nielsen Norman Group', 'Maze', 'Interaction Design Foundation', 'books'], { focus: 0, focusAt: 'nielsen' });
  TH.talk(n.real, { frame: 'close', punch: ['real'] });
  TH.half({ from: n.pick_, to: n.write }, { film: {} });
  TH.keyword(n.vol, '~volunteer~', { times: [n.vol.w[3]] });
  TH.pops({ from: n.fields, to: n.cs }, ['psychology', 'teaching', 'marketing', 'journalism', 'computer science'], { focus: 4, focusAt: 'computer' });
  TH.half({ from: n.job, to: n.love }, { film: {} });
  TH.keyword({ from: n.deg, to: n.valid }, 'a ~valid~ route', { times: [n.deg.w[0], n.valid.w[2]] });
  TH.corner({ from: n.that, to: n.forget }, { film: {} });
  TH.cutaway({ from: n.g1, to: n.g2 }, { film: {}, enter: 'push' });
}
