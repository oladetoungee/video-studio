// Writes instagram/content.json and linkedin/content.json (first build only; after that the studio edits content.json).
//   node shared/make-content.mjs [--force]
import fs from 'node:fs'; import path from 'node:path'; import { fileURLToPath } from 'node:url';
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const slides = (li) => [
  { layout: 'cover', ground: 'ink', title: 'Scholarships in Europe for *Nigerian and African* students (2027)', size: 112,
    rows: ['ERASMUS MUNDUS *OPEN*', 'SWEDISH INST.  *OPEN*', 'CHEVENING    CLOSED'],
    sub: 'Who each one is for, what it pays and when it closes. I checked every date on 2 November 2026.' },
  { layout: 'ways', ground: 'paper', title: 'They don’t all work the *same way*',
    ways: [{ t: 'Scholarship and master’s together', e: 'Erasmus Mundus' }, { t: 'University first, then the scholarship', e: 'NL Scholarship and Swedish Institute' }, { t: 'Scholarship and university separately', e: 'Chevening (UK)' }],
    body: 'The biggest difference is the order you apply in.' },
  { layout: 'passes', ground: 'ink', title: 'Fully funded or *partial*?',
    full: { top: 'Fully funded', k: 'Pays', v: 'Your tuition and money to live on every month' },
    part: { top: 'Partial', k: 'Pays', v: 'Some of it, like a one-time payment or a tuition discount' },
    body: 'Before you apply, write down what you need to have and which kind it is.' },
  { layout: 'story', ground: 'paper', tag: 'Erasmus Mundus', date: 'Open to anyone', title: '*€1,400* a month for up to 24 months', size: 96,
    body: 'It’s the EU scholarship for master’s programmes. It covers your tuition, travel, visa and a living allowance. Most programmes take applications between October and January.',
    link: li ? 'erasmus-plus.ec.europa.eu' : '',
    shot: { img: 'em-1400-line.png', credit: 'Erasmus+ Programme Guide', w: 920, hl: [[55, 8, 33.5, 84]] }, rot: -1 },
  { layout: 'story', ground: 'ink', tag: 'AISS, Tallinn', date: 'Erasmus Mundus', title: 'Applications open *2 December*', size: 100,
    body: 'AISS is an Erasmus Mundus programme my university is part of. I got admission and a partial scholarship for it, but I chose the programme I’m doing now. You can apply from 2 December 2026 to 2 February 2027.',
    link: li ? 'aissprogram.eu' : '',
    shot: { img: 'aiss-dates.png', credit: 'aissprogram.eu', w: 420 }, rot: 1.5 },
  { layout: 'country', ground: 'paper', city: { img: 'berlin.jpg', flap: 'GERMANY', pos: '50% 35%' },
    title: 'DAAD EPOS is for graduates with *work experience*',
    body: 'You need at least two years of work experience after your first degree, and a degree that is not more than six years old. It pays €992 a month. A lot of the 2027 course deadlines have passed, so if you want 2028, start now.',
    link: li ? 'daad.de' : '' },
  { layout: 'steps', ground: 'ink', city: { img: 'stockholm.jpg', flap: 'SWEDEN', pos: '50% 60%' },
    title: 'Swedish Institute: *two steps*',
    steps: [{ k: 'Step 1: apply to the master’s', f: 'BY *15 JAN* 2027' }, { k: 'Step 2: apply for the scholarship', f: '*8-24 FEB* 2027' }],
    body: 'It pays your tuition and a monthly allowance. It’s for people with work and leadership experience, and Nigeria is on the list.',
    link: li ? 'si.se' : '' },
  { layout: 'country', ground: 'paper', city: { img: 'amsterdam.jpg', flap: 'NETHERLANDS', pos: '50% 50%' },
    title: 'NL Scholarship: *€5,000* for your first year',
    body: 'It’s for students from outside the EEA, and that includes Nigeria. It’s partial, but it really helps. You need the university’s offer before you can apply for the money, and each university sets its own deadline.',
    link: li ? 'studyinnl.org' : '' },
  { layout: 'country', ground: 'ink', city: { img: 'budapest.jpg', flap: 'HUNGARY', pos: '50% 50%' },
    title: 'Stipendium Hungaricum: Nigeria is *on the list*',
    body: 'It covers tuition, a monthly stipend, a dorm place or rent money, and medical insurance, but not all your living costs. The 2027/28 round is not open yet. In Nigeria, the Department of Scholarship Awards (it used to be the Federal Scholarship Board) nominates you, so contact them early.',
    link: li ? 'stipendiumhungaricum.hu' : '' },
  { layout: 'duo', ground: 'paper', title: 'Estonia and the *UK*',
    cols: [{ k: 'Estonia, where I study', v: 'The state scholarship is not for Nigerians', b: 'The realistic options are the university’s own tuition discount and Erasmus Mundus programmes with an Estonian university.' },
      { k: 'UK', v: 'Chevening closed on 6 October', b: 'It opens again around August 2027, so you can prepare for the next round now.' }],
    link: li ? 'harno.ee · chevening.org' : '' },
  { layout: 'list', ground: 'ink', title: 'What I’d tell a *friend*',
    rows: ['Start preparing a year before you go.', 'Make a calendar with every deadline and the documents each one needs.', 'Ask for your official transcripts early, because they take time.', 'Write a new motivation letter for each programme.', 'Apply for more than one, and only on the official website.'] },
  { layout: 'end', ground: 'accent', title: 'Which one are you applying for?', size: 116,
    body: 'If you apply and get in, please come back and give your testimony.',
    where: 'Full video on YouTube', handle: '@WithGbemi', polaroid: { img: 'f_297.jpg', caption: 'Tallinn, Estonia', pos: '50% 30%' }, polY: 760 },
];
const decks = {
  instagram: { _help: 'Edit text here (or in the studio), then run: node shared/build.mjs instagram (from design/carousels). Markup: *word* = accent colour, _word_ = serif, \\n = line break.', deck: 'instagram', width: 1080, height: 1350, accent: '#14955A', accentOnInk: '#2FD27A', docTitle: 'Scholarships in Europe for Nigerian and African students (2027)', slides: slides(false) },
  linkedin: { _help: 'Edit text here (or in the studio), then run: node shared/build.mjs linkedin (from design/carousels). Exports PNGs + carousel.pdf.', deck: 'linkedin', width: 1080, height: 1350, accent: '#14955A', accentOnInk: '#2FD27A', docTitle: 'Scholarships in Europe for Nigerian and African students (2027)', slides: slides(true) },
};
for (const [d, c] of Object.entries(decks)) {
  const f = path.join(ROOT, d, 'content.json');
  if (fs.existsSync(f) && !process.argv.includes('--force')) { console.log('kept', f); continue; }
  for (const s of c.slides) for (const k of Object.keys(s)) if (s[k] === '') delete s[k];
  fs.writeFileSync(f, JSON.stringify(c, null, 2) + '\n'); console.log('wrote', f);
}
