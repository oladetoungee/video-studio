// Round 2 (2026-11-02, after the cold critic): 20 directions. Closed-mouth frames (297, 396, 375), a visible one-colour
// wash of her room, fewer and bigger board rows, full names instead of abbreviations, the topic word "scholarship"
// on every option that needs it, one consistent set of dates (Swedish Institute: master's by 15 Jan, scholarship 8-24 Feb).
export default function (add, { titles, T, F, P, C, S, scene, sceneVars }) {
const wash = (w, b = '1.05') => ({ '--wash': w, '--bgb': b, '--dim': 'rgba(14,15,17,.08)' });

// ---------- PHOTO BACKGROUND ----------
add({ id: '01-1400-a-month', kind: 'photo', recommended: true,
  direction: 'Photo background (kit T1): her room washed slate blue so it goes quiet, she calm (closed mouth) in colour on the left; "€1,400 A MONTH" huge on the right; one literal picture: a scholarship letter (generic, no logo) with euro notes fanned under it. Refs: her ux-research thumbnail (one-colour wash, few big props), archisha outlier (offer letter as proof).',
  thumbnail_text: '€1,400 A MONTH + SCHOLARSHIP letter', titles: titles(1, 4, 8),
  css: `.hd{right:50px;top:36px;font-size:176px;text-align:right}
.hd .s{display:block;font-size:110px;margin-top:6px}
.eur{left:600px;top:420px;width:340px;rotate:-14deg}
.letter{left:780px;top:330px;width:450px;padding:26px 30px 22px;rotate:4deg}
.letter .h{font:800 60px/1 'BarlowC';text-transform:uppercase;margin:0 0 14px}
.letter .row{display:flex;justify-content:space-between;font:600 38px/1.2 'BarlowC';text-transform:uppercase;border-top:3px solid #E2DDD2;padding:10px 0}
.letter .row b{color:#14955A}`,
  body: `${scene()}
<div class="hd z3 shadow-t" data-k="hd"></div>
<img class="obj z4 eur" data-img="euros" data-move="euros" alt="">
<div class="card z5 letter" data-move="letter"><div class="h" data-k="lh"></div><div class="row"><span data-k="r1"></span><b data-k="r1v"></b></div><div class="row"><span data-k="r2"></span><b data-k="r2v"></b></div></div>`,
  text: { hd: '<span class="acc">€1,400</span><span class="s">a month</span>', lh: 'Scholarship', r1: 'Tuition', r1v: 'Covered', r2: 'Living', r2v: '€1,400/month' },
  images: { bg: F(297), me: P(297), euros: '../../assets/cut/euros.png' },
  vars: { ...wash('#5C7398'), ...sceneVars(-190) } });

add({ id: '02-scholarships-close-by-feb', kind: 'photo', recommended: true,
  direction: 'Photo background (kit T2): her room washed petrol, she in colour on the right (closed mouth, a little wry); "SCHOLARSHIPS CLOSE BY FEB" on the left; a two-row departures board under it with the two real February deadlines (checked 2 Nov 2026). Refs: viral 2 (one object = the outcome), her database-indexes (one mechanism, big).',
  thumbnail_text: 'SCHOLARSHIPS CLOSE BY FEB', titles: titles(7, 2),
  css: `.hd{left:50px;top:34px;font-size:118px;line-height:.9}
.hd .b{display:block;font-size:134px}
.board{left:46px;top:440px;width:690px;height:186px}
.b1{left:22px;top:22px;--cw:28px;--ch:64px;--fs:44px;--gap:4px}
.b2{left:22px;top:100px;--cw:28px;--ch:64px;--fs:44px;--gap:4px}`,
  body: `${scene()}
<div class="hd z3 shadow-t" data-k="hd"></div>
<div class="board z4" data-move="board"><div class="flaps b1" data-k="b1" data-pad="20"></div><div class="flaps b2" data-k="b2" data-pad="20"></div></div>`,
  text: { hd: 'Scholarships<span class="b">close by <span class="acc">Feb</span></span>', b1: 'SWEDISH INST <span class="acc">24 FEB</span>', b2: 'ERASMUS AISS  <span class="acc">2 FEB</span>' },
  images: { bg: F(375), me: P(375) },
  vars: { ...wash('#3F6E78'), ...sceneVars(190) } });

add({ id: '04-open-to-nigerians', kind: 'photo', recommended: true,
  direction: 'Photo background (kit T5): her room washed violet-grey, she calm in colour on the left; "OPEN TO NIGERIANS" on the right, clear of her face; a two-row board where the two big scholarships get a green tick (Nigeria is eligible for both, checked on the official pages 2 Nov 2026). Refs: ghana 10b (the key word marked), her ux-research (washed room).',
  thumbnail_text: 'OPEN TO NIGERIANS', titles: titles(3, 1),
  css: `.hd{right:50px;top:40px;font-size:112px;text-align:right;line-height:.9}
.hd .b{display:block;font-size:150px}
.board{right:46px;top:388px;width:590px;height:186px}
.b1{left:22px;top:22px;--cw:28px;--ch:64px;--fs:44px;--gap:3px}
.b2{left:22px;top:100px;--cw:28px;--ch:64px;--fs:44px;--gap:3px}`,
  body: `${scene()}
<div class="hd z3 shadow-t" data-k="hd"></div>
<div class="board z4" data-move="board"><div class="flaps b1" data-k="b1" data-pad="18"></div><div class="flaps b2" data-k="b2" data-pad="18"></div></div>`,
  text: { hd: 'Open to<span class="b acc">Nigerians</span>', b1: 'ERASMUS MUNDUS <span class="acc">✓</span>', b2: 'SWEDISH INST.  <span class="acc">✓</span>' },
  images: { bg: F(396), me: P(396) },
  vars: { ...wash('#6A6488'), ...sceneVars(-200) } });

add({ id: '05-zero-tuition-in-europe', kind: 'photo',
  direction: 'Photo background (kit T6): her room washed graphite blue, she calm in colour on the right; "€0 TUITION in Europe" on the left; one boarding pass under it with what the Erasmus Mundus scholarship pays (no tuition for scholarship holders + €1,400 a month, official Programme Guide). Refs: archisha "$0 TUITION?!" outlier, viral 1 (money as the object).',
  thumbnail_text: '€0 TUITION in Europe', titles: titles(8, 4),
  css: `.hd{left:52px;top:36px;font-size:150px}
.hd .serif{display:block;font-size:104px;color:var(--fg);margin-top:2px}
.pass{left:52px;top:400px;width:600px;height:250px}
.pass .c1{position:absolute;left:28px;top:82px}.pass .c2{position:absolute;left:250px;top:82px}
.pass .v{font-size:64px}
.pass .perf{left:480px}.pass .bars{left:505px;top:90px;width:76px;height:130px}`,
  body: `${scene()}
<div class="hd z3 shadow-t" data-k="hd"></div>
<div class="pass z4" data-move="pass" style="rotate:-3deg"><div class="top" data-k="pt"></div><div class="c1"><div class="k" data-k="k1"></div><div class="v" data-k="v1"></div></div><div class="c2"><div class="k" data-k="k2"></div><div class="v" data-k="v2"></div></div><div class="perf"></div><div class="bars"></div></div>`,
  text: { hd: '<span class="acc">€0</span> tuition<span class="serif">in Europe</span>', pt: 'Erasmus Mundus scholarship', k1: 'Tuition', v1: '€0', k2: 'Plus, a month', v2: '€1,400' },
  images: { bg: F(297), me: P(297) },
  vars: { ...wash('#4E5E7A'), ...sceneVars(200) } });

add({ id: '06-scholarships-still-open', kind: 'photo',
  direction: 'Photo background (kit T9): her room washed slate, she calm in colour on the right, lower so no text touches her; "SCHOLARSHIPS STILL OPEN" on the left; a board: two in green you can still apply to, one closed in grey (checked 2 Nov 2026). Refs: viral 5 (the scene shows it), the film\'s look B.',
  thumbnail_text: 'SCHOLARSHIPS STILL OPEN', titles: titles(2, 1),
  css: `.hd{left:50px;top:34px;font-size:118px;line-height:.9}
.hd .b{display:block;font-size:134px}
.board{left:46px;top:400px;width:680px;height:262px}
.b1{left:22px;top:22px;--cw:30px;--ch:64px;--fs:46px;--gap:4px}
.b2{left:22px;top:100px;--cw:30px;--ch:64px;--fs:46px;--gap:4px}
.b3{left:22px;top:178px;--cw:30px;--ch:64px;--fs:46px;--gap:4px}
.b3 i{color:var(--dimc)}`,
  body: `${scene()}
<div class="hd z3 shadow-t" data-k="hd"></div>
<div class="board z4" data-move="board"><div class="flaps b1" data-k="b1" data-pad="19"></div><div class="flaps b2" data-k="b2" data-pad="19"></div><div class="flaps b3" data-k="b3" data-pad="19"></div></div>`,
  text: { hd: 'Scholarships<span class="b">still <span class="acc">open</span></span>', b1: 'SWEDISH INST.  <span class="acc">OPEN</span>', b2: 'ERASMUS MUNDUS <span class="acc">OPEN</span>', b3: 'CHEVENING    CLOSED' },
  images: { bg: F(396), me: P(396) },
  vars: { ...wash('#566B86'), ...sceneVars(190, 110) } });

add({ id: '07-fully-funded-real-board', kind: 'photo',
  direction: 'Photo background (real place): a real airport split-flap departures board (Pexels, Bor Jinson) washed dark slate so the type reads, her colour cut-out on the right with a green outline; "FULLY FUNDED" huge, "study in Europe" under it. Refs: her database-indexes (cut-out with outline), Pinterest "text woven into a real scene".',
  thumbnail_text: 'FULLY FUNDED · study in Europe', titles: titles(6, 9),
  css: `.bgp{left:0;top:0;width:1280px;height:720px;filter:grayscale(1) brightness(.5) contrast(1.05)}
.tint{position:absolute;inset:0;background:#33405A;mix-blend-mode:multiply}
.hd{left:54px;top:60px;font-size:170px;line-height:.92}
.sub{left:60px;top:450px;font-size:100px;font-family:'Serif';color:var(--fg)}
.me{right:-60px;height:600px}`,
  body: `<img class="pic bgp" data-img="bg" data-move="photo" alt=""><div class="tint"></div>
<div class="hd z3 shadow-t" data-k="hd"></div>
<div class="abs sub z3 shadow-t" data-k="sub"></div>
<img class="cut ol me z4" data-img="me" data-move="her" alt="">`,
  text: { hd: 'Fully<br><span class="acc">funded</span>', sub: 'study in Europe' },
  images: { bg: S('flapboard.jpg'), me: C(297) },
  vars: { '--ol': '#F3F0E8' } });

add({ id: '08-funded-masters-terminal', kind: 'photo',
  direction: 'Photo background (real place, her pick C): an airport terminal under a wall of departure screens (Pexels, Angelyn Sanjorjo) washed graphite, her big in colour on the left like a green screen; "FUNDED MASTER\'S in Europe" on the right. Refs: SOCIAL-PLAYBOOK green-screen background, Pinterest editorial mixed fonts.',
  thumbnail_text: "FUNDED MASTER'S in Europe", titles: titles(6, 3),
  css: `.bgp{left:0;top:0;width:1280px;height:720px;filter:grayscale(1) brightness(.6) contrast(1.1)}
.tint{position:absolute;inset:0;background:#2C3A4C;mix-blend-mode:multiply}
.hd{right:46px;top:60px;font-size:160px;text-align:right}
.hd .serif{display:block;font-size:126px;color:var(--fg);margin-top:14px;text-transform:none}
.me{left:-150px;height:760px;bottom:-60px}`,
  body: `<img class="pic bgp" data-img="bg" data-move="photo" alt=""><div class="tint"></div>
<div class="hd z3 shadow-t" data-k="hd"></div>
<img class="cut me z4" data-img="me" data-move="her" alt="">`,
  text: { hd: 'Funded<br><span class="acc">master’s</span><span class="serif">in Europe</span>' },
  images: { bg: S('terminal.jpg'), me: C(396) },
  vars: {} });

add({ id: '20-study-in-europe-stockholm', kind: 'photo',
  direction: 'Photo background (city, her pick C): Stockholm (Pexels, Jakob Stöberl) toned down to dusk blue behind her cut-out, her lit to match; "STUDY IN EUROPE" huge across the sky, a big flap row "FULLY FUNDED" under it. Refs: SOCIAL-PLAYBOOK #19 (green-screen city), Yudi J outlier (places).',
  thumbnail_text: 'STUDY IN EUROPE · FULLY FUNDED', titles: titles(3, 9),
  css: `.bgp{left:0;top:0;width:1280px;height:720px;filter:brightness(.62) saturate(.85)}
.hd{left:50px;top:36px;font-size:156px;line-height:.86}
.fl{left:56px;top:340px;--cw:50px;--ch:88px;--fs:66px;--gap:5px}
.me{right:10px;height:610px;filter:brightness(1.0) contrast(1.04) saturate(.9) drop-shadow(0 0 0 transparent)}
.blue{position:absolute;inset:0;background:rgba(40,70,120,.12);mix-blend-mode:multiply;pointer-events:none}`,
  body: `<img class="pic bgp" data-img="bg" data-move="photo" alt="">
<div class="hd z3 shadow-t" data-k="hd"></div>
<div class="flaps fl z3" data-k="fl"></div>
<img class="cut me z4" data-img="me" data-move="her" alt=""><div class="blue z5"></div>`,
  text: { hd: 'Study in<br>Europe', fl: '<span class="acc">FULLY FUNDED</span>' },
  images: { bg: S('stockholm.jpg'), me: C(375) },
  vars: {} });

// ---------- COLLAGE over her full natural photo ----------
add({ id: '09-collage-cities', kind: 'collage', recommended: true,
  direction: 'Collage over her full natural photo (her 10-07 style): four city polaroids around her (Stockholm, Budapest, Tallinn, Amsterdam; Pexels) with the country under each; one big line in a dark bar, "SCHOLARSHIPS in Europe 2027". Refs: viral-samples/collage, Yudi J ring of places.',
  thumbnail_text: 'SCHOLARSHIPS in Europe 2027', titles: titles(3, 6),
  css: `.p1{left:36px;top:40px;width:250px;rotate:-6deg}.p2{left:990px;top:30px;width:250px;rotate:5deg}
.p3{left:40px;top:300px;width:220px;rotate:4deg}.p4{left:1020px;top:290px;width:220px;rotate:-4deg}
.pol img{height:160px}.pol .cap{font-size:24px}
.band{position:absolute;left:0;right:0;top:540px;height:170px;background:rgba(14,15,17,.86)}
.hd{left:0;right:0;top:562px;text-align:center;font-size:106px;line-height:1.05}
.hd .serif{font-size:112px;color:var(--fg);text-transform:none}`,
  body: `${scene('nat')}
<div class="band z2" data-move="band"></div>
<div class="hd z3" data-k="hd"></div>
<div class="pol p1 z4" data-move="city1"><img data-img="c1" alt=""><div class="cap" data-k="c1"></div></div>
<div class="pol p2 z4" data-move="city2"><img data-img="c2" alt=""><div class="cap" data-k="c2"></div></div>
<div class="pol p3 z4" data-move="city3"><img data-img="c3" alt=""><div class="cap" data-k="c3"></div></div>
<div class="pol p4 z4" data-move="city4"><img data-img="c4" alt=""><div class="cap" data-k="c4"></div></div>`,
  text: { hd: 'Scholarships <span class="serif">in Europe</span> <span class="acc">2027</span>', c1: 'Sweden', c2: 'Germany', c3: 'Estonia', c4: 'Netherlands' },
  images: { bg: F(297), me: P(297), c1: S('stockholm.jpg'), c2: S('berlin.jpg'), c3: S('tallinn.jpg'), c4: S('amsterdam.jpg') },
  vars: { '--sc': '1.12', '--sc-o': '50% 100%', '--sc-x': '0px', '--sc-y': '0px', '--bgb': '1.12' } });

add({ id: '10-collage-where-to-apply', kind: 'collage',
  direction: 'Collage over her full natural photo: two big boarding passes beside her, one per scholarship (Erasmus Mundus to anywhere in Europe, Swedish Institute to Sweden); "WHERE TO APPLY IN 2027" big on the left. Refs: viral-samples/collage, the film\'s boarding passes (b3), kit T4 words.',
  thumbnail_text: 'WHERE TO APPLY IN 2027', titles: titles(5, 9),
  css: `.hd{left:46px;top:30px;font-size:96px;line-height:.9}
.ps{width:520px;height:180px}
.ps .top{font-size:32px;padding:12px 20px}
.ps .k{position:absolute;left:20px;top:74px}.ps .v{position:absolute;left:20px;top:98px;font-size:50px;margin:0}
.ps .perf{left:410px}.ps .bars{left:428px;top:72px;width:76px;height:92px}
.q1{left:34px;top:330px;rotate:-3deg}.q2{left:730px;top:500px;rotate:4deg}`,
  body: `${scene('nat')}
<div class="hd z3 shadow-t" data-k="hd"></div>
<div class="pass ps q1 z4" data-move="pass1"><div class="top" data-k="t1"></div><div class="k" data-k="k1"></div><div class="v" data-k="v1"></div><div class="perf"></div><div class="bars"></div></div>
<div class="pass ps q2 z5" data-move="pass2"><div class="top" data-k="t2"></div><div class="k" data-k="k2"></div><div class="v" data-k="v2"></div><div class="perf"></div><div class="bars"></div></div>`,
  text: { hd: 'Where to apply<br><span class="acc">in 2027</span>', t1: 'To: anywhere in Europe', k1: 'Scholarship', v1: 'Erasmus Mundus', t2: 'To: Sweden', k2: 'Scholarship', v2: 'Swedish Institute' },
  images: { bg: F(375), me: P(375) },
  vars: { '--sc': '1.15', '--sc-o': '50% 100%', '--sc-x': '120px', '--sc-y': '0px', '--bgb': '1.12' } });

add({ id: '11-collage-paid-to-study', kind: 'collage',
  direction: 'Collage over her full natural photo: euro notes float big at her side; one big line in a dark bar, "study in Europe, FULLY FUNDED" (serif + heavy caps). Refs: viral-samples/collage, viral 1 (money as the object).',
  thumbnail_text: 'study in Europe, fully funded', titles: titles(6, 8),
  css: `.band{position:absolute;left:0;right:0;top:500px;height:190px;background:rgba(14,15,17,.86)}
.hd{left:0;right:0;top:516px;text-align:center;font-family:'Serif';font-weight:400;font-style:italic;font-size:100px;line-height:1.5;color:var(--fg);text-transform:none}
.hd .acc{font-family:'BarlowC';font-weight:800;text-transform:uppercase;font-style:normal}
.eur{left:-10px;top:40px;width:520px;rotate:-14deg}
.eur2{left:880px;top:60px;width:420px;rotate:12deg}`,
  body: `${scene('nat')}
<img class="obj z4 eur" data-img="euros" data-move="euros" alt="">
<div class="band z2" data-move="band"></div>
<div class="hd z3" data-k="hd"></div>`,
  text: { hd: 'study in Europe, <span class="acc">fully funded</span>' },
  images: { bg: F(396), me: P(396), euros: '../../assets/cut/euros.png' },
  vars: { '--sc': '1.1', '--sc-o': '50% 0%', '--sc-x': '60px', '--sc-y': '-40px', '--bgb': '1.12' } });

add({ id: '12-collage-nigeria-to-europe', kind: 'collage', recommended: true,
  direction: 'Collage over her full natural photo, the family look of her biggest video ("Dear Nigerian students"): a hand-drawn green arrow over her shoulders from a Nigerian flag to an EU flag (simple drawings), "SCHOLARSHIP" on the landing side; "NIGERIA → EUROPE" in a dark bar on top. Refs: kit T7, her outlier video.',
  thumbnail_text: 'NIGERIA → EUROPE + SCHOLARSHIP', titles: titles(9, 3),
  css: `.band{position:absolute;left:0;right:0;top:0;height:150px;background:rgba(14,15,17,.86)}
.hd{left:0;right:0;top:12px;text-align:center;font-size:140px}
.ng{left:46px;top:260px;width:220px;height:146px;rotate:-6deg;display:flex;box-shadow:0 14px 26px rgba(0,0,0,.45)}
.ng i{flex:1}.ng i:nth-child(1),.ng i:nth-child(3){background:#008751}.ng i:nth-child(2){background:#fff}
.eu{left:1010px;top:250px;width:226px;height:150px;rotate:5deg;background:#003399;box-shadow:0 14px 26px rgba(0,0,0,.45)}
.fl1{left:60px;top:430px;rotate:-6deg;font-size:34px}.fl2{left:990px;top:428px;rotate:5deg;font-size:34px}`,
  body: `${scene('nat')}
<div class="band z2" data-move="band"></div>
<div class="hd z3" data-k="hd"></div>
<div class="abs ng z4" data-move="flag-ng"><i></i><i></i><i></i></div>
<svg class="abs eu z4" data-move="flag-eu" viewBox="0 0 220 146"><rect width="220" height="146" fill="#003399"/>${Array.from({ length: 12 }, (_, i) => { const a = i / 12 * 2 * Math.PI; return `<text x="${110 + 48 * Math.sin(a)}" y="${73 - 48 * Math.cos(a) + 7}" font-size="20" fill="#FFCC00" text-anchor="middle">★</text>`; }).join('')}</svg>
<svg class="draw z4" width="1280" height="720" data-move="arrow"><path d="M280 270 C 420 140, 860 140, 995 270" stroke="#2FD27A" stroke-width="12" fill="none" stroke-linecap="round"/><path d="M995 270 l -54 -4 M995 270 l 2 -52" stroke="#2FD27A" stroke-width="12" stroke-linecap="round"/></svg>
<div class="lab fl1 z5" data-k="from"></div><div class="lab fl2 z5" data-k="to"></div>`,
  text: { hd: 'Nigeria <span class="acc">→</span> Europe', from: 'Nigeria', to: 'Scholarship' },
  images: { bg: F(297), me: P(297) },
  vars: { '--sc': '1.08', '--sc-o': '50% 100%', '--sc-x': '0px', '--sc-y': '60px', '--bgb': '1.12' } });

// ---------- FLAT, in the film's board look ----------
add({ id: '03-board-behind-her', kind: 'flat',
  direction: 'Flat ground in the film\'s look B: the departures board for the 2027 intake on the left (three big rows), her colour cut-out big in front on the right (the talking-head frame th2 she liked); "SCHOLARSHIPS 2027" as the board\'s title. Checked 2 Nov 2026. Refs: SOCIAL-PLAYBOOK #32/#33 (a screen behind her), her database-indexes (cut-out, one mechanism).',
  thumbnail_text: 'SCHOLARSHIPS 2027 (board)', titles: titles(9, 3),
  css: `.hd{left:46px;top:34px;font-size:138px}
.r{left:50px;--cw:32px;--ch:72px;--fs:52px;--gap:4px}
.r0{top:250px}.r1{top:340px}.r2{top:430px}
.r2 i{color:var(--dimc)}
.me{right:-150px;height:660px}`,
  body: `<div class="hd z3" data-k="hd"></div>
<div class="flaps r r0 z2" data-k="r0" data-pad="18"></div><div class="flaps r r1 z2" data-k="r1" data-pad="18"></div><div class="flaps r r2 z2" data-k="r2" data-pad="18"></div>
<img class="cut ol me z4" data-img="me" data-move="her" alt="">`,
  text: { hd: 'Scholarships <span class="acc">2027</span>', r0: 'ERASMUS MUNDUS <span class="acc">OPEN</span>', r1: 'SWEDISH INST. <span class="acc">OPEN</span>', r2: 'CHEVENING    CLOSED' },
  images: { me: C(297) },
  vars: { '--ground': '#1B1D21', '--ol': '#2FD27A' } });

add({ id: '13-giant-flaps-her', kind: 'flat',
  direction: 'Flat near-black ground, no rows: the topic in giant split-flap tiles, "SCHOLARSHIPS" over "EUROPE 2027" (green), her colour cut-out large on the right. The simplest board option. Refs: the film\'s b4 phrase card, her database-indexes (topic huge, dark ground).',
  thumbnail_text: 'SCHOLARSHIPS EUROPE 2027', titles: titles(9, 6),
  css: `.t1{left:40px;top:150px;--cw:68px;--ch:132px;--fs:104px;--gap:5px}
.t2{left:40px;top:300px;--cw:68px;--ch:132px;--fs:104px;--gap:5px}
.me{right:-210px;height:720px}`,
  body: `<div class="flaps t1 z2" data-k="t1"></div><div class="flaps t2 z2" data-k="t2"></div>
<img class="cut me z4" data-img="me" data-move="her" alt="">`,
  text: { t1: 'SCHOLARSHIPS', t2: '<span class="acc">EUROPE</span> 2027' },
  images: { me: C(396) },
  vars: { '--ground': '#23262B' } });

add({ id: '14-boarding-pass-her', kind: 'flat',
  direction: 'Flat graphite ground: one boarding pass on the left, FROM Nigeria TO Europe, "FULLY FUNDED" as the biggest thing on it; her colour cut-out full height on the right with a cream outline. Refs: the film\'s boarding passes, ghana 10b (one paper object on a plain ground).',
  thumbnail_text: 'FULLY FUNDED (boarding pass, Nigeria → Europe)', titles: titles(9, 3),
  css: `.pass{left:46px;top:110px;width:760px;height:500px;rotate:-3deg}
.pass .top{font-size:44px;padding:18px 30px}
.c{position:absolute}
.c1{left:34px;top:110px}.c2{left:330px;top:110px}
.c .v{font-size:84px}
.big{position:absolute;left:30px;top:250px;font:800 132px/.88 'BarlowC';text-transform:uppercase;color:#14955A}
.pass .bars{left:560px;top:250px;width:160px;height:210px}
.me{right:-110px;height:640px}`,
  body: `<div class="pass z3" data-move="pass"><div class="top" data-k="pt"></div>
<div class="c c1"><div class="k" data-k="k1"></div><div class="v" data-k="v1"></div></div>
<div class="c c2"><div class="k" data-k="k2"></div><div class="v" data-k="v2"></div></div>
<div class="big" data-k="big"></div><div class="bars"></div></div>
<img class="cut ol me z4" data-img="me" data-move="her" alt="">`,
  text: { pt: 'Scholarship · Master’s 2027', k1: 'From', v1: 'Nigeria', k2: 'To', v2: 'Europe', big: 'Fully<br>funded' },
  images: { me: C(396) },
  vars: { '--ground': '#1B1D21', '--ol': '#F3F0E8' } });

add({ id: '15-full-or-partial-scholarship', kind: 'flat',
  direction: 'Flat graphite ground (kit T3, the framework drawn): two boarding passes, FULLY FUNDED (green: tuition + money to live on) and PARTIAL (grey: some of it); "FULL OR PARTIAL SCHOLARSHIP?" big; her colour cut-out bottom right. Refs: viral 3 (framework drawn), the film\'s b3 frame.',
  thumbnail_text: 'FULL OR PARTIAL SCHOLARSHIP?', titles: titles(3, 6),
  css: `.hd{left:46px;top:30px;font-size:104px;line-height:.92}
.pa{width:560px;height:200px}
.pa .top{font-size:40px;padding:14px 24px}
.pa .c{position:absolute;left:24px;top:84px}.pa .v{font-size:52px}
.q1{left:50px;top:270px;rotate:-2deg}.q2{left:110px;top:490px;rotate:1.5deg;height:180px}
.me{right:-110px;height:600px}`,
  body: `<div class="hd z3" data-k="hd"></div>
<div class="pass pa q1 z3" data-move="full"><div class="top" data-k="t1"></div><div class="c"><div class="k" data-k="k1"></div><div class="v" data-k="v1"></div></div></div>
<div class="pass pa q2 z3" data-move="partial"><div class="top grey" data-k="t2"></div><div class="c"><div class="k" data-k="k2"></div><div class="v" data-k="v2"></div></div></div>
<img class="cut ol me z4" data-img="me" data-move="her" alt="">`,
  text: { hd: '<span class="acc">Full</span> or partial<br>scholarship?', t1: 'Fully funded', k1: 'Pays', v1: 'Tuition + money to live on', t2: 'Partial', k2: 'Pays', v2: 'Part of the cost' },
  images: { me: C(375) },
  vars: { '--ground': '#1B1D21', '--ol': '#F3F0E8' } });

add({ id: '16-deadlines-jan-feb', kind: 'flat',
  direction: 'Flat graphite: two months in flap tiles, JAN and FEB, each with the real deadlines in big type (checked 2 Nov 2026: Swedish Institute master\'s by 15 Jan, AISS closes 2 Feb, Swedish Institute scholarship 8-24 Feb); "SCHOLARSHIP DEADLINES 2027" on top; her cut-out on the right. Refs: kit 1f month strip, the film\'s board.',
  thumbnail_text: 'SCHOLARSHIP DEADLINES 2027', titles: titles(2, 7),
  css: `.hd{left:46px;top:30px;font-size:104px;line-height:.92}
.m{top:270px;--cw:76px;--ch:120px;--fs:96px;--gap:6px}
.m1{left:50px}.m2{left:430px}
.n{position:absolute;top:410px;width:350px;font:600 46px/1.1 'BarlowC';text-transform:uppercase;color:var(--fg)}
.n b{display:block;color:var(--accent);font-weight:800}
.n p{margin-bottom:16px}
.n1{left:50px}.n2{left:430px}
.me{right:-170px;height:600px}`,
  body: `<div class="hd z3" data-k="hd"></div>
<div class="flaps m m1" data-k="m1"></div><div class="flaps m m2" data-k="m2"></div>
<div class="n n1" data-k="n1"></div><div class="n n2" data-k="n2"></div>
<img class="cut me z4" data-img="me" data-move="her" alt="">`,
  text: { hd: 'Scholarship<br>deadlines <span class="acc">2027</span>', m1: 'JAN', m2: 'FEB', n1: '<b>15 Jan</b>Sweden: the master’s', n2: '<b>24 Feb</b>Sweden: the scholarship' },
  images: { me: C(375) },
  vars: { '--ground': '#1B1D21' } });

// ---------- OTHER: a real page, a split, objects ----------
add({ id: '17-real-erasmus-guide', kind: 'other',
  direction: 'Other, no face: the one real line from the official Erasmus+ Programme Guide ("The scholarship is calculated as: 1 400 Euros/month x DS"), untouched crop shown big, marked in green, with a source line; "ERASMUS MUNDUS SCHOLARSHIP" big above. Refs: ghana 10b (a real clipping as the hero), october 18.',
  thumbnail_text: 'ERASMUS MUNDUS SCHOLARSHIP (real line: 1 400 Euros/month)', titles: titles(5, 1),
  css: `.hd{left:46px;top:40px;font-size:132px;line-height:.9}
.clip{left:40px;top:370px;width:1200px;rotate:-1.5deg;padding:16px}
.mark{left:617px;top:16px;width:440px;height:76px}
.clip .cr{font-size:22px}`,
  body: `<div class="hd z3" data-k="hd"></div>
<div class="clip z3" data-move="page"><img data-img="page" alt=""><div class="mark"></div><div class="cr" data-k="cr"></div></div>`,
  text: { hd: 'Erasmus Mundus<br><span class="acc">scholarship</span>', cr: 'Erasmus+ Programme Guide · European Commission' },
  images: { page: S('em-1400-line.png') },
  vars: { '--ground': '#1B1D21' } });

add({ id: '18-which-are-still-open', kind: 'other',
  direction: 'Other, a split: left half grey (CLOSED: Chevening, most DAAD EPOS courses), right half green-black (OPEN: Swedish Institute, Erasmus Mundus). "WHICH SCHOLARSHIPS ARE STILL OPEN?" across the top. Checked 2 Nov 2026. Refs: her saved YouTube before/after splits.',
  thumbnail_text: 'WHICH SCHOLARSHIPS ARE STILL OPEN?', titles: titles(2, 3),
  css: `.l{position:absolute;left:0;top:0;width:640px;height:720px;background:#2A2C31}
.r{position:absolute;left:640px;top:0;width:640px;height:720px;background:#14231B}
.hd{left:0;right:0;top:26px;text-align:center;font-size:100px;line-height:.92}
.k1{left:50px;top:270px;--cw:60px;--ch:100px;--fs:80px;--gap:6px}
.k2{left:690px;top:270px;--cw:60px;--ch:100px;--fs:80px;--gap:6px}
.a{left:50px;--cw:36px;--ch:66px;--fs:48px;--gap:4px}.b{left:680px;--cw:36px;--ch:66px;--fs:48px;--gap:3px}
.a1,.b1{top:420px}.a2,.b2{top:500px}
.a i{color:var(--dimc)}`,
  body: `<div class="l"></div><div class="r"></div>
<div class="hd z3" data-k="hd"></div>
<div class="flaps k1 dim z2" data-k="k1"></div><div class="flaps k2 z2" data-k="k2"></div>
<div class="flaps a a1 z2" data-k="a1"></div><div class="flaps a a2 z2" data-k="a2"></div>
<div class="flaps b b1 z2" data-k="b1"></div><div class="flaps b b2 z2" data-k="b2"></div>`,
  text: { hd: 'Which scholarships are<br>still <span class="acc">open?</span>', k1: 'CLOSED', k2: '<span class="acc">OPEN</span>', a1: 'CHEVENING', a2: 'MANY DAAD', b1: 'SWEDISH INST.', b2: 'ERASMUS MUNDUS' },
  images: {},
  vars: { '--ground': '#1B1D21' } });

add({ id: '19-scholarship-documents', kind: 'other',
  direction: 'Other, objects (kit T8): on a warm paper ground, the application papers drawn flat and big: a motivation letter with a green hand note, a transcript envelope and a passport (generic, no country); "SCHOLARSHIP DOCUMENTS" in flap letters, "start a year early" by hand. No face. Refs: Pinterest "writing a book" desk scene, her decks\' paper ground.',
  thumbnail_text: 'SCHOLARSHIP DOCUMENTS · start a year early', titles: [T[6], T[12]],
  css: `.fl1{left:46px;top:40px;--cw:76px;--ch:120px;--fs:96px;--gap:6px}
.fl2{left:46px;top:172px;--cw:76px;--ch:120px;--fs:96px;--gap:6px}
.note{left:840px;top:200px;font-size:64px;color:#14955A;rotate:-6deg}
.lt{left:70px;top:350px;width:470px;height:330px;padding:30px 34px;rotate:-3deg}
.lt .h{font:800 44px/1 'BarlowC';text-transform:uppercase}
.lt .ln{height:12px;background:#E2DDD2;margin-top:22px;border-radius:3px}
.env{left:600px;top:390px;width:380px;height:250px;background:#D8C9A8;rotate:4deg;box-shadow:0 22px 40px rgba(0,0,0,.25);border-radius:6px}
.env .h{position:absolute;left:28px;top:150px;font:800 42px/1 'BarlowC';text-transform:uppercase;color:#4A3C22}
.env:before{content:"";position:absolute;left:0;right:0;top:0;height:120px;background:#CDBB95;clip-path:polygon(0 0,100% 0,50% 100%)}
.pp{left:1010px;top:340px;width:220px;height:310px;background:#5A1E2A;rotate:-6deg;border-radius:10px;box-shadow:0 22px 40px rgba(0,0,0,.3)}
.pp .h{position:absolute;left:0;right:0;top:40px;text-align:center;font:600 30px/1 'BarlowC';letter-spacing:.18em;color:#D9B66A}
.pp .o{position:absolute;left:60px;top:120px;width:100px;height:100px;border:4px solid #D9B66A;border-radius:50%}`,
  body: `<div class="flaps bare fl1 z2" data-k="fl1"></div><div class="flaps bare fl2 z2" data-k="fl2"></div>
<div class="abs hand note z3" data-k="note"></div>
<div class="card lt z3" data-move="letter"><div class="h" data-k="lh"></div><div class="ln"></div><div class="ln" style="width:80%"></div><div class="ln"></div><div class="ln" style="width:70%"></div><div class="ln"></div><div class="ln" style="width:60%"></div></div>
<div class="abs env z3" data-move="envelope"><div class="h" data-k="eh"></div></div>
<div class="abs pp z4" data-move="passport"><div class="h" data-k="ph"></div><div class="o"></div></div>`,
  text: { fl1: 'SCHOLARSHIP', fl2: '<span class="acc">DOCUMENTS</span>', note: 'start a year early', lh: 'Motivation letter', eh: 'Transcript', ph: 'PASSPORT' },
  images: {},
  vars: { '--ground': '#EAE6DA', '--fg': '#16181B' } });
}
