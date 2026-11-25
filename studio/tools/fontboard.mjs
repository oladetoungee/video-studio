// Font board builder (her ask 2026-11-12): renders inspiration/boards/fonts/img/*.png (1600x900) + board.json.
// Every specimen uses the real font files through /studio/runtime/fonts.css (page loaded from the studio's origin),
// ONLY fonts found on her idea boards (her rule 2026-11-12), each citing its source item: Design N (/ideas/boards/design/),
// Formats N (/ideas/formats/), Thumbnails N (/ideas/boards/thumbnails/).
// Run (studio must be running on :7700):  node studio/tools/fontboard.mjs
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const OUT = path.join(ROOT, 'inspiration/boards/fonts');
const BASE = process.env.STUDIO || 'http://localhost:7700';
function findChrome() {
  const base = path.join(os.homedir(), '.cache/puppeteer/chrome-headless-shell'); const c = [];
  if (fs.existsSync(base)) for (const v of fs.readdirSync(base).sort().reverse()) c.push(path.join(base, v, 'chrome-headless-shell-mac-arm64/chrome-headless-shell'));
  c.push('/Applications/Google Chrome.app/Contents/MacOS/Google Chrome');
  return c.find(p => fs.existsSync(p));
}

// Colour pairs sampled from design-board pixels (ground, ink, accent[, accent2]).
const C = {
  1: ['#990915', '#FBF3EC', '#FCBFBA'], 20: ['#0C0C0C', '#FFFFFF', '#D92A11'], 116: ['#031150', '#FFFFFF', '#E0262B'],
  270: ['#21F587', '#010000', '#010000'], 273: ['#DAD2C6', '#C8463C', '#C8463C'], 286: ['#E12935', '#F6B6BC', '#FFFFFF'],
  350: ['#000000', '#A5A3B0', '#2A1FF3'], 351: ['#E6DFCD', '#101114', '#E5C63A', '#173DAF'], 353: ['#5D6A52', '#F1E381', '#F1E381'],
  355: ['#D9D5CB', '#2C3FB0', '#111111'], 357: ['#2F6E41', '#16201A', '#D592D4'], 359: ['#E8E4D6', '#1F2C5C', '#835D59'],
  360: ['#C64C3E', '#1A1414', '#2E4BB0'], 361: ['#DC3E2B', '#EDE6D9', '#EDE6D9'], 362: ['#C4BF3B', '#18480E', '#18480E'],
  363: ['#0D24C5', '#E8EAF4', '#E8EAF4'], 365: ['#8AF25F', '#0C150A', '#0C150A'], 367: ['#DFDBD0', '#161412', '#A83627', '#DBC17A', '#3D428C'],
  368: ['#17357B', '#D8CDBB', '#080805'], 370: ['#A0B8D7', '#EEEB98', '#2E3E58'], 371: ['#0A0A0A', '#DFB0AE', '#DDDADC'],
  373: ['#CB2D26', '#FFFFFF', '#E5B9B9'], 377: ['#E9E0CC', '#CB482E', '#CB482E'], 378: ['#F5F5F4', '#030502', '#030502'],
  384: ['#543B31', '#BA3B32', '#ECE3D5'], 389: ['#D884B5', '#281C16', '#EADDC7'], 391: ['#010101', '#B8331F', '#B8331F'],
  392: ['#2A2A2A', '#E0333B', '#CAC0C1'], 394: ['#D9F44F', '#070804', '#070804'], 395: ['#000000', '#D24B2A', '#E6CD6F', '#2B2FA8'],
  396: ['#DFD8D4', '#262824', '#262824'], 397: ['#E99A3F', '#000000', '#000000'], 399: ['#E8E7E5', '#111111', '#555555'],
  400: ['#D44B29', '#120F0E', '#120F0E'], 405: ['#E57245', '#000000', '#000000'], 406: ['#D16A3C', '#0C160C', '#F5EFDE'],
  409: ['#F2F3C4', '#2A1F6E', '#6A63B2'], 410: ['#C16CAC', '#281D69', '#432D84'],
};

const H = [ // headlines in her topics (line breaks are law: | = new line)
  'Study in Europe|for free?', 'What is a race|condition?', 'Proof of funds|for Nigerian students', 'Free tuition|in Germany',
  'Stop waiting.|Start applying.', 'Cheapest countries|to study abroad', 'Null errors|in production', 'Dark patterns|are everywhere',
  'Work full time|and do a master\'s', 'HTTP status codes|explained', 'Charged twice|for one order?', 'Is tuition free|in Austria?',
];
const SUB = [
  'Watch this before you apply to one more school', 'The bug that charges your customer twice', 'What embassies actually check, line by line',
  'A plain guide for international students', 'Three things I wish I knew before I moved', 'With Gbemi · tech, career, research',
];

// t: treatment; f: headline font (CSS family), w: weight, s: start size px, x: extra CSS for the headline; b: body font
const M = [ // 1) fonts matched to the design board
  { d: 377, f: 'Six Caps', w: 400, s: 640, h: 'CHARGED|TWICE?', x: 'line-height:.86', name: 'Six Caps', note: 'ultra-tall poster caps' },
  { d: 397, f: 'Big Shoulders Display', w: 900, s: 420, h: 'Last|chance', x: 'line-height:.8;letter-spacing:-.01em', name: 'Big Shoulders Display' },
  { d: 400, f: 'Big Shoulders Display', w: 800, s: 260, h: 'SOMEWHERE|IN BETWEEN', x: 'line-height:.84', name: 'Big Shoulders Display' },
  { d: 396, f: 'Big Shoulders Display', w: 700, s: 300, h: 'MAN|MADE BUGS', x: 'line-height:.82', name: 'Big Shoulders Display' },
  { d: 368, f: 'Anton', w: 400, s: 220, h: 'ALL WE HAVE|ARE DEADLINES', x: 'line-height:.9;letter-spacing:-.01em', name: 'Anton' },
  { d: 351, f: 'Archivo', w: 900, s: 300, h: 'MONO|ARCH', x: 'font-stretch:62%;line-height:.86;letter-spacing:-.02em', name: 'Archivo (62% width)', t: 'shapes' },
  { d: 367, f: 'Archivo', w: 800, s: 120, h: 'I AM GOOD AT|WORKING UNDER|PRESSURE', x: 'font-stretch:75%;line-height:.92', name: 'Archivo (75% width)', t: 'blob' },
  { d: 357, f: 'Archivo', w: 900, s: 190, h: 'Explorers|Club', x: 'font-stretch:125%;line-height:1', name: 'Archivo (125% width)', t: 'jump' },
  { d: 394, f: 'Inter Tight', w: 900, s: 110, h: 'WHEN YOU\'RE OBSESSED|WITH WHAT EVERYONE|ELSE IS DOING, YOU LOSE|SIGHT OF YOUR OWN', x: 'line-height:.92;letter-spacing:-.02em', name: 'Inter Tight' },
  { d: 378, f: 'Inter Tight', w: 900, s: 300, h: 'inte|gra|tion', x: 'line-height:.78;letter-spacing:-.07em', name: 'Inter Tight' },
  { d: 365, f: 'Inter Tight', w: 700, s: 190, h: 'STUDY IN|EUR*PE', x: 'line-height:.92;letter-spacing:-.04em', name: 'Inter Tight' },
  { d: 398, f: 'Inter Tight', w: 800, s: 170, h: 'Be honest|on your CV.', x: 'line-height:.95;letter-spacing:-.04em', name: 'Inter Tight', c: ['#DC3D2A', '#161010', '#161010'] },
  { d: 350, f: 'Switzer', w: 300, s: 120, h: 'Have you ever judged|a text based [solely] on|its typography?', x: 'line-height:1.02;letter-spacing:-.02em', name: 'Switzer Light', t: 'underline' },
  { d: 361, f: 'Bagel Fat One', w: 400, s: 260, h: 'BODY;|I\'M HAPPY', x: 'line-height:.86', name: 'Bagel Fat One' },
  { d: 371, f: 'Bagel Fat One', w: 400, s: 240, h: 'MILK|RUN', x: 'line-height:.86;text-align:center', name: 'Bagel Fat One', bs: 'center' },
  { d: 1, f: 'Bodoni Moda', w: 700, s: 150, h: 'You must|break the pattern|today', x: 'line-height:.98;letter-spacing:-.01em', name: 'Bodoni Moda' },
  { d: 399, f: 'Libre Baskerville', w: 700, s: 150, h: 'The version|of you that|doesn\'t exist yet', x: 'line-height:.98;letter-spacing:-.03em', name: 'Libre Baskerville Bold' },
  { d: 391, f: 'Gloock', w: 400, s: 200, h: 'Comfort|kills|potential.', x: 'line-height:.92;text-align:center;letter-spacing:-.02em', name: 'Gloock', bs: 'center' },
  { d: 362, f: 'Caveat Brush', w: 400, s: 190, h: 'Create the things|you wish existed!', x: 'line-height:1;transform:rotate(-6deg)', name: 'Caveat Brush', bs: 'center' },
  { d: 363, f: 'Permanent Marker', w: 400, s: 170, h: 'YOU DESERVE|THE APPLAUSE', x: 'line-height:1.02', name: 'Permanent Marker' },
  { d: 360, f: 'Londrina Solid', w: 900, s: 210, h: 'DON\'T BE AFRAID|TO TRY AGAIN', x: 'line-height:.9', name: 'Londrina Solid Black' },
  { d: 392, f: 'Kaushan Script', w: 400, s: 170, h: 'Time to get|serious about|the life I want', x: 'line-height:1.02;transform:rotate(-4deg)', name: 'Kaushan Script' },
  { d: 359, f: 'Shrikhand', w: 400, s: 150, h: 'One small step|can change|your whole year', x: 'line-height:.98', name: 'Shrikhand' },
  { d: 409, f: 'Bricolage Grotesque', w: 800, s: 170, h: '{You do|not own the}|audience.', x: 'line-height:.92;letter-spacing:-.04em;text-align:right', name: 'Bricolage Grotesque 300 + 800', t: 'mix', bs: 'end' },
  { d: 370, f: 'Figtree', w: 800, s: 150, h: 'The goal isn\'t|to make it look|more designed.', x: 'line-height:.9;letter-spacing:-.05em;text-align:center', name: 'Figtree ExtraBold', bs: 'center' },
  { d: 20, f: 'Inter Tight', w: 900, s: 170, h: 'THE ALGORITHM|DOES NOT [hate]|YOU.', x: 'line-height:.86;letter-spacing:-.04em', name: 'Inter Tight + Instrument Serif italic', t: 'serifword' },
  { d: 355, f: 'General Sans', w: 600, s: 170, h: 'things I\'ve been|working on!!', x: 'font-style:italic;line-height:.92;letter-spacing:-.04em', name: 'General Sans Semibold Italic' },
  { d: 273, f: 'Archivo', w: 500, s: 190, h: 'it\'s not|hard, it\'s just|new.', x: 'font-stretch:68%;line-height:.94;letter-spacing:-.02em', name: 'Archivo Medium (68% width)' },
  { d: 353, f: 'DM Mono', w: 500, s: 150, h: 'BE|A|DOER', x: 'line-height:1.1;text-align:center;letter-spacing:.08em', name: 'DM Mono Medium', bs: 'center' },
  { d: 384, f: 'Anton', w: 400, s: 170, h: 'YOU\'VE CONSUMED|ENOUGH. IT\'S|TIME TO CREATE', x: 'line-height:.9;text-align:center', name: 'Anton (sticker outline)', t: 'outline', bs: 'center' },
  { d: 406, f: 'Inter Tight', w: 800, s: 170, h: 'I can do|literally|everything', x: 'line-height:1.02;letter-spacing:-.05em', name: 'Inter Tight (words in bars)', t: 'bars' },
  { d: 405, f: 'Oswald', w: 700, s: 260, h: 'IS ALL|WE NEED', x: 'line-height:.86;letter-spacing:-.02em', name: 'Oswald Bold' },
  { d: 395, f: 'Archivo', w: 900, s: 96, h: 'I DON\'T HAVE A DEGREE|YOUTUBE WAS MY SCHOOL|MY PORTFOLIO IS UNPAID', x: 'font-stretch:70%;line-height:.92', name: 'Archivo Black (70% width) labels', t: 'labels' },
  { d: 373, f: 'Inter Tight', w: 700, s: 170, h: 'Grids|are good|for you', x: 'line-height:.92;letter-spacing:-.03em', name: 'Inter Tight Bold', t: 'grid' },
];

const SHORTS = [ // 2) fonts on the shorts formats board ("Formats N" = /ideas/formats/ item N). Colours from the frames.
  { n: 2, f: 'Montserrat', w: 800, s: 150, h: 'WHY THE [VISA]|GOT REFUSED', x: 'line-height:1;text-transform:uppercase', kw: 'color', stroke: '#000', c: ['#3B3330', '#FFFFFF', '#FFE135'], name: 'Montserrat ExtraBold caps, yellow key word', bs: 'center' },
  { n: 3, f: 'Shrikhand', w: 400, s: 170, h: 'Skip|Read|Study', x: 'line-height:1;transform:rotate(-4deg)', c: ['#3A3936', '#F7B6D2', '#9CE3D6'], kw: 'color', name: 'Shrikhand (retro script)', sub: 'BOOKS FOR NEW DEVELOPERS', body: { f: 'Oswald', w: 500, x: 'letter-spacing:.08em' } },
  { n: 6, f: 'Permanent Marker', w: 400, s: 150, h: 'WHAT IS A|[DDOS ATTACK]', x: 'line-height:1.05;transform:skewX(-6deg)', kw: 'color', c: ['#0E0E0E', '#FFFFFF', '#FF7A3D'], name: 'Permanent Marker (comic caps)', sub: '2,000 req/s', body: { f: 'DM Mono', w: 500 } },
  { n: 14, f: 'Montserrat', w: 800, s: 130, h: 'Proof of funds is|the new visa stress', x: 'line-height:1;letter-spacing:-.01em', stroke: '#111', c: ['#8C7F73', '#FFFFFF', '#FFFFFF'], name: 'Montserrat ExtraBold + bold serif captions', sub: 'ago the embassy asked for', body: { f: 'Libre Baskerville', w: 700, x: 'color:#fff;-webkit-text-stroke:3px #111;paint-order:stroke fill' } },
  { n: 24, f: 'TikTok Sans', w: 700, s: 120, h: 'race conditions are|charging you twice', x: 'line-height:1.05', t: 'tiktokbox', c: ['#6B6059', '#111111', '#FFFFFF'], name: 'TikTok Sans in a white box + bold serif captions', sub: 'so apparently the bank', body: { f: 'Libre Baskerville', w: 700, x: 'color:#fff' }, bs: 'center' },
  { n: 26, f: 'Oswald', w: 600, s: 190, h: 'HOW TO|APPLY FOR|FREE TUITION', x: 'line-height:.9;text-align:center', c: ['#5A4F4A', '#EDE2A0', '#FFFFFF'], name: 'Oswald (huge cream condensed caps)', sub: 'feature', body: { f: 'Inter Tight', w: 700, x: 'color:#fff' }, bs: 'center' },
  { n: 32, f: 'Nunito', w: 900, s: 300, h: 'boring', x: 'line-height:1;letter-spacing:-.03em', c: ['#3A3530', '#C8F25A', '#FFFFFF'], name: 'Nunito Black (rounded lime word)', sub: 'the embassy wants this', body: { f: 'Inter Tight', w: 500, x: 'color:#fff;text-transform:lowercase' }, bs: 'center' },
  { n: 36, f: 'Montserrat', w: 800, s: 150, h: 'Cheap countries|[to study in]', x: 'line-height:.95;letter-spacing:-.04em', kw: 'serif', c: ['#1F3A2C', '#FFFFFF', '#FFFFFF'], name: 'Montserrat ExtraBold + Instrument Serif italic', sub: '*that accept Nigerian students' },
  { n: 38, f: 'Young Serif', w: 400, s: 200, h: 'Break Up|The Pattern', x: 'line-height:.95;text-align:center;letter-spacing:-.02em', c: ['#3A3A33', '#F4E85C', '#F4E85C'], name: 'Young Serif (huge yellow serif)', bs: 'center' },
  { n: 48, f: 'Bodoni Moda', w: 500, s: 150, h: 'BARELY|FUNCTIONING', x: 'line-height:1;text-align:center;letter-spacing:.01em', c: ['#3C2A22', '#FFFFFF', '#FFFFFF'], name: 'Bodoni Moda caps + Instrument Serif italic', sub: 'the word of the day', body: { f: 'Instrument Serif', w: 400, x: 'font-style:italic' }, bs: 'center' },
  { n: 52, f: 'Newsreader', w: 500, s: 90, h: 'Why is it that when we|can\'t understand a form, we', x: 'line-height:1.25', t: 'blackbox', c: ['#6E6A4E', '#FFFFFF', '#111111'], name: 'Newsreader (white serif captions on black)', bs: 'center' },
  { n: 56, f: 'Archivo Black', w: 400, s: 200, h: 'HOOKS', x: 'line-height:1;color:transparent;-webkit-text-stroke:6px #2F7FD8', c: ['#D9D2C8', '#2F7FD8', '#F2D23A'], name: 'Archivo Black outline + Shrikhand script', sub: 'EXPLAINED', body: { f: 'Shrikhand', w: 400, x: 'font-size:90px;color:#F2D23A;-webkit-text-stroke:2px #2F7FD8;transform:rotate(-4deg)' }, bs: 'center' },
  { n: 62, f: 'Young Serif', w: 400, s: 150, h: 'What I\'m Most|Unsure About', x: 'line-height:.98;letter-spacing:-.02em', c: ['#5C6B5A', '#F4EBD0', '#F5D33F'], name: 'Young Serif + Caveat Brush (mixed fonts)', sub: 'why not have', body: { f: 'Caveat Brush', w: 400, x: 'color:#F5D33F;font-size:90px;transform:rotate(-6deg)' } },
  { n: 64, f: 'Caveat', w: 700, s: 130, h: 'You paid the fee|and didn\'t get a visa.|NOW WHAT??', x: 'line-height:1.05', c: ['#3B88D6', '#FFFFFF', '#FFFFFF'], name: 'Caveat Bold (handwritten slide)' },
  { n: 65, f: 'Inter Tight', w: 800, s: 150, h: '[Your school]|[& the embassy.]', x: 'line-height:1.08;letter-spacing:-.03em', kw: 'hl', hlInk: '#111', c: ['#F7F7F5', '#111111', '#FFE600'], name: 'Inter Tight on yellow highlight + mono', sub: '5 DOCUMENTS · 4 FEES · CALL ANY OF THEM', body: { f: 'DM Mono', w: 500 } },
  { n: 68, f: 'Oswald', w: 600, s: 170, h: '[G]ERMANY|DID A U-TURN', x: 'line-height:1;text-align:center', kw: 'hl', hlInk: '#fff', c: ['#8E8A85', '#FFFFFF', '#E0261B'], name: 'Oswald caps, one letter boxed red', bs: 'center' },
  { n: 20, f: 'Oswald', w: 600, s: 150, h: 'ATMOSPHERE OF|[ANTI] SCHOLARSHIP', x: 'line-height:1;text-align:center', kw: 'color', c: ['#2E2E33', '#FFFFFF', '#7FF0C0'], name: 'Oswald caps, mint key word', bs: 'center' },
  { n: 7, f: 'Silkscreen', w: 400, s: 220, h: '1990|HTML', x: 'line-height:1.05;letter-spacing:.06em', c: ['#000000', '#FFFFFF', '#F2C75C'], name: 'Silkscreen (pixel)', bs: 'center' },
  { n: 37, f: 'Anton', w: 400, s: 230, h: 'PASSPORT', x: 'line-height:1;-webkit-text-stroke:.05em #fff;paint-order:stroke fill', c: ['#4D8FC4', '#E3262B', '#FFFFFF'], name: 'Instrument Serif italic + Anton with white stroke', pre: 'I renewed my', bs: 'center' },
  { n: 57, f: 'Satoshi', w: 900, s: 230, h: 'day in', x: 'font-style:italic;line-height:1;letter-spacing:-.04em;text-shadow:0 10px 26px rgba(0,0,0,.65)', c: ['#1B2440', '#FFFFFF', '#FFFFFF'], name: 'Satoshi Black Italic (heavy italic lowercase)', bs: 'center' },
  { n: 45, f: 'Libre Baskerville', w: 400, s: 100, h: 'Free tuition in Germany|is real. I checked.', x: 'line-height:1.15;text-align:center;letter-spacing:-.02em', c: ['#4A4440', '#FFFFFF', '#FFFFFF'], name: 'Libre Baskerville (newspaper headline)', bs: 'center' },
];
const THUMBS = [ // 3) fonts on the thumbnail board ("Thumbnails N"). Colours from the thumbnails.
  { n: 10, f: 'Anton', w: 400, s: 190, h: 'THE 9-5|[COLLAPSE]', x: 'line-height:.95', kw: 'hl', hlInk: '#fff', c: ['#1A1A1A', '#FFFFFF', '#D9262B'], name: 'Anton + red box' },
  { n: 21, f: 'Inter Tight', w: 700, s: 160, h: 'Why You\'re [Stuck]', x: 'line-height:1;letter-spacing:-.03em', kw: 'hl', hlInk: '#111', c: ['#1C1C1C', '#FFFFFF', '#F7D51D'], name: 'Inter Tight Bold + yellow highlight' },
  { n: 31, f: 'Inter Tight', w: 500, s: 220, h: 'no one|cares.', x: 'line-height:.9;letter-spacing:-.05em', c: ['#E9E7E3', '#111111', '#111111'], name: 'Inter Tight Medium' },
  { n: 41, f: 'Playfair Display', w: 900, s: 130, h: 'BE YOUR OWN PROFESSOR|& BEAT BRAIN ROT', x: 'font-style:italic;line-height:1.02;letter-spacing:-.01em', c: ['#2E2A26', '#E8DCC8', '#E8DCC8'], name: 'Playfair Display Black Italic caps' },
  { n: 48, f: 'Libre Baskerville', w: 400, s: 150, h: '"Write to|Understand|[Your Life"]', x: 'line-height:1;letter-spacing:-.03em;text-align:right', kw: 'bold', c: ['#2D2B2A', '#FFFFFF', '#FFFFFF'], name: 'Libre Baskerville Regular + Bold', bs: 'end' },
  { n: 58, f: 'Montserrat', w: 900, s: 340, h: 'FAVOR', x: 'line-height:1;letter-spacing:-.02em', c: ['#2B2B2B', '#F6D23A', '#F6D23A'], name: 'Montserrat Black (huge yellow word)', bs: 'center' },
  { n: 64, f: 'Bodoni Moda', w: 600, s: 170, h: 'MOVING ABROAD', x: 'line-height:1;letter-spacing:.02em', c: ['#4F5A3E', '#E0B04A', '#F4EBD0'], name: 'Bodoni Moda caps + Instrument Serif italic', pre: 'interviewing 8 strangers about', bs: 'center' },
  { n: 65, f: 'JetBrains Mono', w: 800, s: 120, h: 'Never get|distracted|again...', x: 'line-height:1.08;letter-spacing:-.03em', c: ['#F6D83B', '#111111', '#111111'], name: 'JetBrains Mono ExtraBold (typewriter bold)' },
  { n: 68, f: 'Inter Tight', w: 700, s: 170, h: 'stop [lying]|to yourself!', x: 'line-height:1;letter-spacing:-.04em', kw: 'hl', hlInk: '#fff', c: ['#111111', '#FFFFFF', '#E2231A'], name: 'Inter Tight Bold lowercase + red box' },
  { n: 84, f: 'Poppins', w: 700, s: 160, h: 'you\'re|[wasting]|your 20s', x: 'line-height:.95;letter-spacing:-.03em', kw: 'color', c: ['#2A2522', '#FFFFFF', '#E5342B'], name: 'Poppins Bold lowercase, red key word' },
  { n: 87, f: 'Oswald', w: 700, s: 220, h: 'WEB3|EXPLAINED!', x: 'line-height:.9;letter-spacing:-.01em', c: ['#2FA8E0', '#111111', '#111111'], name: 'Oswald Bold on blue' },
  { n: 89, f: 'Archivo Black', w: 400, s: 140, h: 'WHAT IS|SPACE COMPLEXITY|OF ALGORITHMS', x: 'line-height:.98', c: ['#F7F02B', '#E2262B', '#111111'], name: 'Archivo Black red on yellow' },
  { n: 91, f: 'Archivo Black', w: 400, s: 260, h: 'TWO SUM', x: 'line-height:1;color:#fff;-webkit-text-stroke:.06em #111;paint-order:stroke fill', c: ['#C79A5E', '#FFFFFF', '#111111'], name: 'Archivo Black with black outline', bs: 'center' },
  { n: 96, f: 'Poppins', w: 700, s: 260, h: 'just|start.', x: 'line-height:.9;letter-spacing:-.04em', c: ['#3A3632', '#FFFFFF', '#FFFFFF'], name: 'Poppins Bold lowercase' },
  { n: 106, f: 'Libre Baskerville', w: 400, s: 150, h: 'Erasmus|Mundus', x: 'line-height:1.05;letter-spacing:-.03em', c: ['#CFE3DA', '#1D1D1D', '#E9B8E6'], name: 'Libre Baskerville + caps label on pink', sub: 'SCHOLARSHIPS RANKED', body: { f: 'Montserrat', w: 700, x: 'background:#E9B8E6;padding:4px 18px;letter-spacing:.04em' } },
  { n: 113, f: 'Anton', w: 400, s: 170, h: 'STOP|LEARNING CODE|[THE OLD WAY]', x: 'line-height:.95', kw: 'hl', hlInk: '#fff', c: ['#222222', '#FFFFFF', '#D7262B'], name: 'Anton + red box' },
  { n: 152, f: 'Inter Tight', w: 500, s: 170, h: 'STOP|USING AI [illegally]', x: 'line-height:1;letter-spacing:-.02em', kw: 'serif', c: ['#2B2420', '#FFFFFF', '#FFFFFF'], name: 'Inter Tight + Instrument Serif italic' },
  { n: 162, f: 'Montserrat', w: 800, s: 170, h: 'Live Coding|[Backend API]', x: 'line-height:1.05;text-align:center;-webkit-text-stroke:.03em #111;paint-order:stroke fill', kw: 'color', c: ['#3A3D3A', '#FFFFFF', '#F6C343'], name: 'Montserrat ExtraBold + yellow line', bs: 'center' },
  { n: 174, f: 'Inter Tight', w: 500, s: 150, h: 'how portfolios|get rejected|in 8 seconds', x: 'line-height:.9;letter-spacing:-.06em', c: ['#EFEDE6', '#111111', '#111111'], name: 'Inter Tight Medium, very tight', bs: 'center' },
  { n: 180, f: 'Permanent Marker', w: 400, s: 150, h: 'REASONS I|LOVE MY|PORTFOLIO', x: 'line-height:1.05;text-align:center', c: ['#C8231E', '#FFFFFF', '#FFFFFF'], name: 'Permanent Marker caps', bs: 'center' },
];
const PAIRS = [ // 3) headline font + body font, from a design-board composition
  { d: 368, f: 'Anton', w: 400, s: 200, h: 'FREE TUITION|IN GERMANY', b: 'Archivo', bw: 500, x: 'line-height:.9', name: 'Anton + Archivo' },
  { d: 351, f: 'Archivo', w: 900, s: 230, h: 'PROOF OF|FUNDS', x: 'font-stretch:62%;line-height:.86', b: 'DM Mono', bw: 500, bx: 'text-transform:uppercase;letter-spacing:.08em', name: 'Archivo 62% + DM Mono' },
  { d: 20, f: 'Inter Tight', w: 900, s: 170, h: 'NULL ERRORS|IN [production]', x: 'line-height:.88;letter-spacing:-.04em', t: 'serifword', b: 'Instrument Serif', bw: 400, bx: 'font-style:italic', name: 'Inter Tight Black + Instrument Serif' },
  { d: 377, f: 'Six Caps', w: 400, s: 520, h: 'RACE|CONDITION', x: 'line-height:.86', b: 'Inter Tight', bw: 600, name: 'Six Caps + Inter Tight' },
  { d: 399, f: 'Libre Baskerville', w: 700, s: 140, h: 'The version of you|that studies abroad', x: 'line-height:1;letter-spacing:-.03em', b: 'Newsreader', bw: 400, name: 'Libre Baskerville + Newsreader' },
  { d: 400, f: 'Big Shoulders Display', w: 900, s: 250, h: 'SOMEWHERE|IN EUROPE', x: 'line-height:.84', b: 'Archivo', bw: 700, bx: 'font-stretch:75%;text-transform:uppercase', name: 'Big Shoulders + Archivo condensed' },
  { d: 391, f: 'Gloock', w: 400, s: 180, h: 'Charged twice|for one order?', x: 'line-height:.95;letter-spacing:-.02em', b: 'Switzer', bw: 400, name: 'Gloock + Switzer' },
  { d: 362, f: 'Caveat Brush', w: 400, s: 170, h: 'Start before|you\'re ready!', x: 'line-height:1;transform:rotate(-5deg)', b: 'Inter Tight', bw: 600, name: 'Caveat Brush + Inter Tight' },
  { d: 410, f: 'Bricolage Grotesque', w: 800, s: 160, h: 'There is a|safer way.', x: 'line-height:.9;letter-spacing:-.05em', b: 'Inter Tight', bw: 600, name: 'Bricolage Grotesque + Inter Tight' },
  { src: 'Formats', n: 36, c: ['#1F3A2C', '#FFFFFF', '#FFFFFF'], f: 'Montserrat', w: 800, s: 150, h: 'Visa formats|[to try today]', kw: 'serif', x: 'line-height:.95;letter-spacing:-.04em', b: 'Instrument Serif', bw: 400, bx: 'font-style:italic', name: 'Montserrat ExtraBold + Instrument Serif italic' },
  { src: 'Formats', n: 62, c: ['#5C6B5A', '#F4EBD0', '#F5D33F'], f: 'Young Serif', w: 400, s: 150, h: 'Moving abroad|at 30', x: 'line-height:.98;letter-spacing:-.02em', b: 'Caveat Brush', bw: 400, bx: 'color:#F5D33F;font-size:64px', name: 'Young Serif + Caveat Brush' },
  { src: 'Formats', n: 14, c: ['#8C7F73', '#FFFFFF', '#FFFFFF'], f: 'Montserrat', w: 800, s: 130, h: 'AI shame is the|new recycling guilt', stroke: '#111', x: 'line-height:1', b: 'Libre Baskerville', bw: 700, name: 'Montserrat ExtraBold + Libre Baskerville Bold' },
  { src: 'Thumbnails', n: 64, c: ['#4F5A3E', '#E0B04A', '#F4EBD0'], f: 'Bodoni Moda', w: 600, s: 170, h: 'STUDY ABROAD', pre: 'interviewing 8 students about', x: 'line-height:1;letter-spacing:.02em', b: 'Archivo', bw: 500, name: 'Bodoni Moda caps + Instrument Serif italic', bs: 'center' },
  { d: 371, f: 'Bagel Fat One', w: 400, s: 200, h: 'BUG|HUNT', x: 'line-height:.86;text-align:center', b: 'Inter Tight', bw: 600, name: 'Bagel Fat One + Inter Tight', bs: 'center' },
  { d: 1, f: 'Bodoni Moda', w: 800, s: 150, h: 'Study in Europe|for [free?]', x: 'line-height:.98', t: 'italicword', b: 'Archivo', bw: 500, name: 'Bodoni Moda + italic + Archivo' },
  { d: 409, f: 'Bricolage Grotesque', w: 800, s: 160, h: '{What is a}|race condition?', x: 'line-height:.92;letter-spacing:-.04em', t: 'mix', b: 'DM Mono', bw: 400, name: 'Bricolage Grotesque + DM Mono' },
];

const COMBOS = [ // 4) colour combos: ground / ink / accent + one headline in that item's type
  [368, 'Anton', 400, 'FREE TUITION'], [394, 'Inter Tight', 900, 'STOP SCROLLING'], [361, 'Bagel Fat One', 400, 'BE HAPPY'],
  [371, 'Bagel Fat One', 400, 'BUG HUNT'], [357, 'Archivo', 900, 'Club night'], [351, 'Archivo', 900, 'PROOF'], [397, 'Big Shoulders Display', 900, 'Last call'],
  [391, 'Gloock', 400, 'Comfort kills.'], [409, 'Bricolage Grotesque', 800, 'audience.'], [370, 'Figtree', 800, 'Less design.'],
  [362, 'Caveat Brush', 400, 'Create it!'], [350, 'Switzer', 300, 'judged by type?'], [353, 'DM Mono', 500, 'BE A DOER'],
  [365, 'Inter Tight', 700, 'OUT NOW'], [1, 'Bodoni Moda', 700, 'Break the loop'], [367, 'Archivo', 800, 'UNDER PRESSURE'],
  [363, 'Permanent Marker', 400, 'APPLAUSE'], [389, 'Bagel Fat One', 400, 'off / on'], [395, 'Archivo', 900, 'NO DEGREE'],
  [406, 'Inter Tight', 800, 'everything'], [116, 'Inter Tight', 700, 'Start now!'], [270, 'Inter Tight', 900, 'the crowd'],
];

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
// headline markup: | = line, [word] = accent word, {words} = light words (mix)
function headHTML(o, col) {
  const [g, ink, acc, acc2, acc3] = col;
  const lines = o.h.split('|');
  const kw = o.kw || ({ serifword: 'serif', italicword: 'italic', underline: 'underline' })[o.t];
  const inner = l => esc(l)
    .replace(/\[(.+?)\]/g, (_, w) => kw === 'color' ? `<span style="color:${acc}">${w}</span>`
      : kw === 'bold' ? `<span style="font-weight:700">${w}</span>`
      : kw === 'hl' ? `<span style="background:${acc};color:${o.hlInk || ink};padding:0 .08em;-webkit-text-stroke:0">${w}</span>`
      : kw === 'serif' ? `<span style="font-family:'Instrument Serif';font-style:italic;font-weight:400;color:${acc};text-transform:none;letter-spacing:-.01em">${w}</span>`
      : kw === 'italic' ? `<span style="font-style:italic;color:${acc}">${w}</span>`
      : kw === 'underline' ? `<span style="text-decoration:underline;text-decoration-color:${acc};text-decoration-thickness:.07em;text-underline-offset:.12em">${w}</span>` : w)
    .replace(/\{(.+?)\}/g, (_, w) => `<span style="font-weight:300">${w}</span>`);
  if (o.t === 'mix') return o.h.replace(/\{([^}]*)\}/g, (_, w) => `<span style="font-weight:300">${esc(w)}</span>`).split('|').map(l => `<div class="ln">${l}</div>`).join('');
  if (o.t === 'jump') return lines.map(l => `<div class="ln">${[...l].map((ch, i) => { const big = i % 2 === 0; return `<span style="display:inline-block;font-size:${big ? 1 : .62}em;vertical-align:${i % 3 === 1 ? 'top' : 'baseline'};${i % 3 === 0 ? `background:${acc};padding:0 .04em;` : ''}">${esc(ch)}</span>`; }).join('')}</div>`).join('');
  if (o.t === 'bars') return lines.map((l, i) => `<div class="ln" style="margin-left:${[0, .9, .2][i % 3]}em"><span style="background:${ink};color:${acc};padding:0 .14em">${esc(l)}</span></div>`).join('');
  if (o.t === 'labels') { const cs = [ink, acc, acc2]; return lines.map((l, i) => `<div class="ln" style="margin:.12em 0 0 ${i * .55}em"><span style="display:inline-block;background:${cs[i % 3]};color:${i === 1 ? '#111' : '#F4EFE6'};padding:.12em .3em;transform:rotate(${[-5, -3, -6][i]}deg)">${esc(l)}</span></div>`).join(''); }
  if (o.t === 'tiktokbox') return `<div style="display:inline-block;background:${acc};color:${ink};padding:.12em .4em;border-radius:.25em;text-align:center">${lines.map(l => `<div class="ln">${inner(l)}</div>`).join('')}</div>`;
  if (o.t === 'blackbox') return `<div style="text-align:center">${lines.map(l => `<div class="ln"><span style="background:${acc};color:${ink};padding:0 .3em">${inner(l)}</span></div>`).join('')}</div>`;
  return (o.pre ? `<div class="ln" style="font-family:'Instrument Serif';font-style:italic;font-weight:400;font-size:.42em;letter-spacing:0;-webkit-text-stroke:0;text-transform:none;color:${acc}">${esc(o.pre)}</div>` : '')
    + lines.map(l => `<div class="ln">${inner(l)}</div>`).join('');
}

function page({ o, col, label, sub, body, swatches }) {
  const [g, ink, acc, acc2, acc3] = col;
  const just = o.bs === 'center' ? 'center' : o.bs === 'end' ? 'flex-end' : 'flex-start';
  const extraBg = o.t === 'grid' ? `background-image:linear-gradient(${acc}66 2px,transparent 2px),linear-gradient(90deg,${acc}66 2px,transparent 2px);background-size:80px 80px;background-position:-2px -2px;` : '';
  const deco = o.t === 'shapes' ? `<div style="position:absolute;right:120px;top:150px;width:520px;height:520px;border-radius:50%;background:${acc}"></div><div style="position:absolute;right:250px;top:250px;width:380px;height:470px;border:64px solid ${acc2};border-bottom:0;border-radius:190px 190px 0 0"></div>`
    : o.t === 'blob' ? `<div style="position:absolute;left:1120px;top:300px;width:380px;height:250px;background:${acc2}"></div><div style="position:absolute;left:1040px;top:250px;width:320px;height:220px;border-radius:50%;background:${acc}"></div><div style="position:absolute;left:1330px;top:430px;width:190px;height:190px;background:${acc3};clip-path:polygon(50% 0,61% 35%,98% 35%,68% 57%,79% 91%,50% 70%,21% 91%,32% 57%,2% 35%,39% 35%)"></div>` : '';
  const hx = o.t === 'outline' ? `-webkit-text-stroke:.09em ${acc};paint-order:stroke fill;` : o.stroke ? `-webkit-text-stroke:.06em ${o.stroke};paint-order:stroke fill;` : '';
  const sw = swatches ? `<div style="display:flex;gap:18px;margin-top:8px">${swatches.map(([c, n]) => `<div style="width:300px"><div style="height:210px;background:${c};outline:2px solid ${ink}33"></div><div class="lab" style="margin-top:12px;color:${ink}">${n}<br>${c}</div></div>`).join('')}</div>` : '';
  return `<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="/studio/runtime/fonts.css"><style>
  *{margin:0;box-sizing:border-box}html,body{width:1600px;height:900px;overflow:hidden}
  body{background:${g};color:${ink};${extraBg}position:relative}
  .wrap{position:absolute;inset:70px 84px 120px 84px;display:flex;flex-direction:column;justify-content:${o.t === 'labels' || swatches ? 'flex-start' : 'center'};align-items:${just};gap:30px;z-index:1}
  .h{font-family:'${o.f}';font-weight:${o.w};font-size:${o.s}px;${o.x || ''};${hx}white-space:nowrap;max-width:100%}
  .h .ln{white-space:nowrap}${o.kw === 'hl' ? '.h .ln{line-height:1.14}' : ''}${o.t === 'blob' ? '.wrap{right:560px}' : ''}
  .sub{font-family:'${body?.f || 'Archivo'}';font-weight:${body?.w || 500};font-size:34px;line-height:1.25;opacity:.92;${body?.x || ''}}
  .lab{font-family:'DM Mono';font-weight:500;font-size:26px;letter-spacing:.04em}
  .corner{position:absolute;left:84px;bottom:40px;z-index:2;color:${ink};opacity:.9}
  </style></head><body>${deco}<div class="wrap">${sw}<div class="h" id="h">${headHTML(o, col)}</div>${sub ? `<div class="sub" style="text-align:${o.bs === 'center' ? 'center' : o.bs === 'end' ? 'right' : 'left'}">${esc(sub)}</div>` : ''}</div>
  <div class="lab corner">${esc(label)}</div></body></html>`;
}

const specs = [], pad = i => String(i + 1).padStart(2, '0');
const fams = o => [o.f, ...(o.kw === 'serif' || o.t === 'serifword' || o.pre ? ['Instrument Serif'] : [])];
M.forEach((o, i) => specs.push({ id: `design-${pad(i)}`, group: 'From the design board', o, col: o.c || C[o.d], src: `Design ${o.d}`,
  label: `${o.name} · ${o.w} · from Design ${o.d}`, title: `${o.name}: the type on Design ${o.d}`, sub: i % 3 === 0 ? SUB[i % SUB.length] : '' }));
SHORTS.forEach((o, i) => specs.push({ id: `shorts-${pad(i)}`, group: 'From the shorts board', o, col: o.c, src: `Formats ${o.n}`, sub: o.sub, body: o.body,
  label: `${o.name} · ${o.w} · from Formats ${o.n}`, title: `${o.name}: the type on Formats ${o.n}` }));
THUMBS.forEach((o, i) => specs.push({ id: `thumbs-${pad(i)}`, group: 'From the thumbnail board', o, col: o.c, src: `Thumbnails ${o.n}`, sub: o.sub, body: o.body,
  label: `${o.name} · ${o.w} · from Thumbnails ${o.n}`, title: `${o.name}: the type on Thumbnails ${o.n}` }));
PAIRS.forEach((o, i) => { const src = `${o.src || 'Design'} ${o.n || o.d}`;
  specs.push({ id: `pair-${pad(i)}`, group: 'Font pairs', o, col: o.c || C[o.d], src,
  sub: SUB[(i + 1) % SUB.length], body: { f: o.b, w: o.bw, x: o.bx }, label: `${o.name} · ${o.w}/${o.bw} · from ${src}`, title: `${o.name} (pair from ${src})` }); });
COMBOS.forEach(([d, f, w, h], i) => { const col = C[d]; const names = ['ground', 'ink', 'accent', 'accent 2', 'accent 3'];
  const sw = [...new Set(col)].map(c => [c, names[col.indexOf(c)]]);
  specs.push({ id: `combo-${pad(i)}`, group: 'Colour combos', col, swatches: sw, src: `Design ${d}`,
    o: { f, w, s: 300, h, x: `line-height:.95;letter-spacing:-.02em;${f === 'Archivo' ? 'font-stretch:75%;' : ''}` },
    label: `${f} · ${w} · colours from Design ${d}: ${sw.map(s => s[0]).join(' / ')}`, title: `Colours of Design ${d}` }); });

const browser = await puppeteer.launch({ executablePath: findChrome(), headless: true, args: ['--force-color-profile=srgb'] });
const pg = await browser.newPage(); await pg.setViewport({ width: 1600, height: 900 });
await pg.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
fs.mkdirSync(path.join(OUT, 'img'), { recursive: true });
const items = [], bad = [];
const only = process.argv[2];
for (const sp of specs) {
  const file = sp.id + '.png'; items.push({ id: sp.id, img: file, group: sp.group, title: sp.title, font: sp.o.f, source: sp.src });
  if (only && !sp.id.startsWith(only)) continue;
  await pg.setContent(page(sp), { waitUntil: 'load' });
  const res = await pg.evaluate(async (fams) => {
    await document.fonts.ready;
    const h = document.getElementById('h'), wrap = document.querySelector('.wrap'); let s = parseFloat(getComputedStyle(h).fontSize);
    for (let k = 0; k < 200 && (h.scrollWidth > wrap.clientWidth + 1 || wrap.scrollHeight > wrap.clientHeight + 1); k++) { s -= 3; h.style.fontSize = s + 'px'; }
    await document.fonts.ready;
    const loaded = new Set([...document.fonts].filter(f => f.status === 'loaded').map(f => f.family.replace(/["']/g, '')));
    return { size: s, missing: fams.filter(f => !loaded.has(f)) };
  }, [...new Set([...fams(sp.o), ...(sp.sub ? [sp.body?.f || 'Archivo'] : []), 'DM Mono'])]);
  if (res.missing.length) bad.push(`${sp.id}: ${res.missing.join(', ')}`);
  await pg.screenshot({ path: path.join(OUT, 'img', file), type: 'png' });
  process.stdout.write(`${sp.id} ${res.size}px${res.missing.length ? ' MISSING ' + res.missing : ''}\n`);
}
await browser.close();
fs.writeFileSync(path.join(OUT, 'board.json'), JSON.stringify({
  title: 'Font board',
  subtitle: 'Only fonts found on your boards (design board first, then the shorts formats and thumbnail boards), each with the colours of the picture it comes from (Design N / Formats N / Thumbnails N). Tap "Not for me" on any font or colour mix you don\'t like; we never use those.',
  groups: ['From the design board', 'From the shorts board', 'From the thumbnail board', 'Font pairs', 'Colour combos'], items }, null, 2));
if (!fs.existsSync(path.join(OUT, 'picks.json'))) fs.writeFileSync(path.join(OUT, 'picks.json'), '{}\n');
console.log(`${specs.length} specimens; font check: ${bad.length ? bad.join(' | ') : 'all real fonts loaded'}`);
