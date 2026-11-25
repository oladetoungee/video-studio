// Round 3 (2026-11-02, coordinator: push the best four to 8+): one big idea, fewer words, stronger contrast.
// Refs: her own thumbnails (topic huge, one literal mechanism, few big things) and viral sample 1 ("FINANCIAL LITERACY":
// the topic huge behind her head, the money flying). Replaces 01, 05, 12, 14 from dirs-r2.mjs by id.
export const CUT = ['03-board-behind-her', '06-scholarships-still-open', '13-giant-flaps-her', '18-which-are-still-open', '11-collage-paid-to-study', '15-full-or-partial-scholarship', '16-deadlines-jan-feb'];
export default function (add, { titles, T, F, P, C, S }) {
// two aligned layers of the same frame: the washed room behind the words, she in colour in front of them
const back = () => `<div class="scene" data-move="photo"><img class="bg" data-img="bg" alt=""><div class="wash"></div><div class="dim"></div></div>`;
const front = () => `<div class="scene z4"><img class="me-c" data-img="me" alt=""></div>`;

add({ id: '01-1400-a-month', kind: 'photo', recommended: true,
  direction: 'Photo background, viral-sample-1 build: her room washed slate blue, "€1,400" huge in green BEHIND her head (she is in front of the number, in colour, calm), euro notes flying on both sides, one line at the bottom "A MONTH TO STUDY IN EUROPE". One idea: a scholarship that pays you to study. Refs: viral 1 "FINANCIAL LITERACY", her ux-research (washed room).',
  thumbnail_text: '€1,400 A MONTH TO STUDY IN EUROPE', titles: titles(1, 4),
  css: `.num{left:0;right:0;top:-14px;text-align:center;font-size:226px;line-height:1;color:#2FD27A}
.band{position:absolute;left:0;right:0;bottom:0;height:126px;background:rgba(14,15,17,.9)}
.line{left:0;right:0;bottom:18px;text-align:center;font-size:96px;line-height:1}
.e1{left:150px;top:250px;width:420px;rotate:-28deg}.e2{left:760px;top:300px;width:340px;rotate:20deg}`,
  body: `${back()}
<div class="hd num z2 shadow-t" data-k="num"></div>
<img class="obj z3 e1" data-img="euros" data-move="euros-left" alt=""><img class="obj z3 e2" data-img="euros2" data-move="euros-right" alt="">
${front()}
<div class="band z5" data-move="band"></div><div class="hd line z6" data-k="line"></div>`,
  text: { num: '€1,400', line: 'a month to study in <span class="acc">Europe</span>' },
  images: { bg: F(297), me: P(297), euros: '../../assets/cut/euros.png', euros2: '../../assets/cut/euros.png' },
  vars: { '--wash': '#6F86AA', '--bgb': '1.3', '--dim': 'rgba(14,15,17,0)', '--sc': '1.55', '--sc-o': '50% 100%', '--sc-x': '-40px', '--sc-y': '330px' } });

add({ id: '05-zero-tuition-in-europe', kind: 'flat',
  direction: 'Flat light ground (the only bright option): warm paper, "€0 TUITION" huge in ink, one literal object: a tuition bill whose total is a green stamped "€0"; her colour cut-out on the right with an ink outline. Strong contrast, one accent. Refs: viral 2 (one object = the outcome), her database-indexes (one mechanism, few big things).',
  thumbnail_text: 'STUDY IN EUROPE, tuition-free (€0 stamp)', titles: titles(8, 4),
  css: `.hd{left:50px;top:30px;font-size:170px;color:#16181B;line-height:.9}
.hd .serif{font-size:74px;color:#14955A}
.bill{left:56px;top:230px;width:620px;height:400px;padding:30px 34px;rotate:-3deg;background:#fff}
.bill .k{font:500 26px/1 'Mono';letter-spacing:.08em;color:#6A6760;text-transform:uppercase}
.bill .h{font:800 54px/1 'BarlowC';text-transform:uppercase;margin:12px 0 18px;color:#16181B}
.bill .ln{height:12px;background:#ECE8DF;margin-top:16px;border-radius:3px}
.stamp{position:absolute;left:200px;top:96px;width:330px;height:210px;border:12px solid #14955A;border-radius:22px;color:#14955A;font:800 190px/188px 'BarlowC';text-align:center;rotate:-10deg;background:rgba(255,255,255,.6)}
.me{right:-250px;height:820px;bottom:-130px}`,
  body: `<div class="hd z3" data-k="hd"></div>
<div class="card bill z3" data-move="bill"><div class="k" data-k="bk"></div><div class="h" data-k="bh"></div><div class="ln"></div><div class="ln" style="width:70%"></div><div class="ln" style="width:85%"></div><div class="stamp" data-k="stamp"></div></div>
<img class="cut ol me z4" data-img="me" data-move="her" alt="">`,
  text: { hd: 'Study in <span class="acc">Europe</span>', bk: 'Master’s · 2027', bh: 'Tuition fee', stamp: '€0' },
  images: { me: C(396) },
  vars: { '--ground': '#ECE8DF', '--fg': '#16181B', '--accent': '#14955A', '--ol': '#16181B' } });

add({ id: '12-collage-nigeria-to-europe', kind: 'collage', recommended: true,
  direction: 'Collage over her photo with the room washed slate so it goes quiet (she in colour): a big Nigerian flag on the left, a big EU flag on the right (simple drawings), one thick green arrow over her head from one to the other, a green "SCHOLARSHIP" tile under the EU flag; "NIGERIA → EUROPE" on a dark bar at the bottom. Refs: kit T7, her biggest video ("Dear Nigerian students"), her database-indexes (one arrow, one mechanism).',
  thumbnail_text: "FULLY FUNDED MASTER'S (Nigeria flag → EU flag)", titles: titles(3, 9),
  css: `.band{position:absolute;left:0;right:0;bottom:0;height:160px;background:rgba(14,15,17,.9)}
.hd{left:0;right:0;bottom:20px;text-align:center;font-size:132px}
.ng{left:30px;top:50px;width:380px;height:254px;rotate:-6deg;display:flex;box-shadow:0 16px 30px rgba(0,0,0,.5)}
.ng i{flex:1}.ng i:nth-child(1),.ng i:nth-child(3){background:#008751}.ng i:nth-child(2){background:#fff}
.eu{left:870px;top:40px;width:380px;height:253px;rotate:5deg;box-shadow:0 16px 30px rgba(0,0,0,.5)}
.tag{left:840px;top:330px;rotate:5deg;white-space:nowrap;background:#2FD27A;color:#0E0F11;font:800 70px/1 'BarlowC';text-transform:uppercase;padding:10px 20px;box-shadow:0 10px 20px rgba(0,0,0,.4)}`,
  body: `${back()}${front()}
<div class="abs ng z5" data-move="flag-ng"><i></i><i></i><i></i></div>
<svg class="abs eu z5" data-move="flag-eu" viewBox="0 0 220 146"><rect width="220" height="146" fill="#003399"/>${Array.from({ length: 12 }, (_, i) => { const a = i / 12 * 2 * Math.PI; return `<text x="${110 + 48 * Math.sin(a)}" y="${73 - 48 * Math.cos(a) + 7}" font-size="20" fill="#FFCC00" text-anchor="middle">★</text>`; }).join('')}</svg>
<svg class="draw z5" width="1280" height="720" data-move="arrow"><path d="M400 110 C 540 -10, 740 -10, 860 100" stroke="#2FD27A" stroke-width="16" fill="none" stroke-linecap="round"/><path d="M860 100 l -62 -6 M860 100 l 4 -60" stroke="#2FD27A" stroke-width="16" stroke-linecap="round"/></svg>
<div class="abs tag z6" data-k="tag"></div>
<div class="band z5" data-move="band"></div><div class="hd z6" data-k="hd"></div>`,
  text: { hd: 'Fully funded <span class="acc">master’s</span>', tag: '' },
  images: { bg: F(297), me: P(297) },
  vars: { '--wash': '#55697F', '--bgb': '1.05', '--dim': 'rgba(14,15,17,.1)', '--sc': '1.2', '--sc-o': '50% 100%', '--sc-x': '0px', '--sc-y': '-40px' } });

add({ id: '14-boarding-pass-her', kind: 'flat',
  direction: 'Flat, full-bleed signal green (the strongest contrast in the set): one cream boarding pass, "NIGERIA → EUROPE" and "FULLY FUNDED" as the only big words, her colour cut-out full height on the right with an ink outline. One idea: a ticket from Nigeria to Europe that a scholarship pays for. Refs: the film\'s boarding passes, ghana 10b (one paper object on a plain ground), her database-indexes (cut-out with outline).',
  thumbnail_text: 'TO: EUROPE · FULLY FUNDED (boarding pass)', titles: titles(9, 3, 1),
  css: `.pass{left:30px;top:80px;width:740px;height:560px;rotate:-3deg;background:#F7F4EC}
.pass .top{background:#16181B;color:#F3F0E8;font-size:62px;padding:20px 32px}
.route{position:absolute;left:32px;top:130px;font:800 104px/1 'BarlowC';text-transform:uppercase;color:#16181B;white-space:nowrap}
.route .acc{color:#14955A}
.big{position:absolute;left:30px;top:270px;font:800 150px/.86 'BarlowC';text-transform:uppercase;color:#14955A}
.pass .bars{left:560px;top:290px;width:130px;height:210px}
.me{right:-170px;height:820px;bottom:-130px}`,
  body: `<div class="pass z3" data-move="pass"><div class="top" data-k="pt"></div>
<div class="route" data-k="route"></div>
<div class="big" data-k="big"></div><div class="bars"></div></div>
<img class="cut ol me z4" data-img="me" data-move="her" alt="">`,
  text: { pt: 'Scholarship 2027', route: 'To: <span class="acc">Europe</span>', big: 'Fully<br>funded' },
  images: { me: C(396) },
  vars: { '--ground': '#0F5B36', '--ol': '#F3F0E8' } });
}
