import json, os
D='/Users/gbemi/Desktop/CODE/videos/projects/the-edge-case-you-think-is-impossible/design/thumbnails/directions'
SH='../../assets/shoot/'
def tk(x,y,r): return f'<div class="tk" style="left:{x}px;top:{y}px;transform:rotate({r}deg)"><div class="band" data-k="tkband"></div><div class="ln"></div><div class="ln s"></div><div class="bc"></div></div>'
V=[]
# ---------- 01 photo: plate on her palms ----------
V.append(dict(slug='01-null-plate-fines',kind='photo',rec=True,
 css='.big{left:40px;top:34px;font-size:150px;line-height:.92;color:var(--red)}.big2{left:46px;top:186px;font-size:92px;color:var(--ink)}'
 '.plate{left:var(--plx,140px);top:var(--ply,474px);width:470px;height:236px;transform:rotate(-5deg)}.plate .pt{font-size:150px}.plate .ps{font-size:19px;margin-bottom:6px}'
 '.tk{width:190px}.tk .band{font-size:15px}',
 body=f'<img class="room z1" data-img="room" alt=""><div class="hd big z4" data-k="big"></div><div class="hd big2 z4" data-k="small"></div>'
      '<div class="plate z5" data-move="plate"><div class="ps" data-k="ps"></div><div class="pt" data-k="pt"></div></div>'
      f'<div class="z4" data-move="tickets" style="position:absolute;left:900px;top:500px">{tk(0,0,-10)}{tk(70,30,6)}</div>',
 text={'big':'$12,000','small':'in fines','ps':'licence plate','pt':'NULL','tkband':'PARKING FINE'},
 images={'room':SH+'room-1590.jpg'},vars={'--rw':'1640px','--rx':'-120px','--ry':'-290px'},
 direction='Her room (shoot photo 1590, palms out as if handing it over), a generic white licence plate reading NULL held on her palms, two red parking-fine slips at the side, "$12,000 in fines" big on the white wall. Kind a (real scene, the topic\'s object in her hands) + d (claim on one side). Refs: thumbnail board "48 HOURS" / "I quit my job" (person holding the topic).',
 tt='$12,000 in fines (+ a plate that says NULL)',
 titles=['Edge Cases in Software: A License Plate Called NULL','A License Plate Called NULL and 7 More Edge Cases','His License Plate Said NULL. Then the Fines Came']))
# ---------- 02 flat lime: phone rejecting Null ----------
V.append(dict(slug='05-her-name-is-null',kind='flat',
 css='.big{left:50px;top:44px;font-size:100px;line-height:.98}'
 '.ph{left:250px;top:215px;width:340px;height:697px;transform:rotate(-6deg)}'
 '.scr .in{padding:84px 22px 0;font-family:ITight;font-weight:800}.scr h4{font-family:DSerif;font-weight:400;font-size:30px;margin-bottom:22px}'
 '.scr .lab{font-family:DMono;font-size:14px;letter-spacing:.1em;text-transform:uppercase;color:#6b6b6b;margin:14px 0 6px}'
 '.scr .f{background:#F2F2F2;border-radius:10px;padding:10px 12px;font-size:30px;letter-spacing:-.02em}.scr .f.e{color:var(--red);box-shadow:inset 0 -2px 0 var(--red)}'
 '.scr .m{color:var(--red);font-family:DMono;font-size:15px;margin-top:8px}.scr .b{margin-top:26px;background:var(--ink);color:#fff;border-radius:12px;text-align:center;padding:13px;font-size:20px}'
 '.me{right:-110px;bottom:0;height:630px}',
 body='<div class="hd big z4" data-k="big"></div>'
      '<div class="phone ph z3" data-move="phone"><div class="scr"><div class="in"><h4 data-k="form"></h4><div class="lab" data-k="l1"></div><div class="f" data-k="v1"></div>'
      '<div class="lab" data-k="l2"></div><div class="f e" data-k="v2"></div><div class="m" data-k="err"></div><div class="b" data-k="btn"></div></div></div></div>'
      '<img class="cut me z2" data-img="me" data-move="her" alt="" style="position:absolute">',
 text={'big':'Her name is <span class="red">Null</span>','form':'Book a flight','l1':'First name','v1':'Jennifer','l2':'Surname','v2':'Null','err':'Surname is required.','btn':'Continue'},
 images={'me':SH+'cut-1587.png'},vars={'--ground':'#D4F04A'},cls='pat-lines',
 direction='Flat lime with a quiet same-hue line pattern (design board "Bold colour + quiet pattern"); a realistic phone booking form that rejects the surname "Null"; her cut-out (1587, sceptical, hand raised) at the right. Kind e/d. Refs: viral sample 6 (a real error), her database-indexes flat thumbnail.',
 tt='Her name is Null (+ a phone form: "Surname is required")',
 titles=['A Woman Named Null and 7 Other Bugs That Break Apps','Why Websites Reject the Surname Null','Edge Cases in Software: A License Plate Called NULL']))
# ---------- 03 photo: leap day calendar ----------
V.append(dict(slug='06-leap-day-broke-microsoft',kind='photo',
 css='.big{left:44px;top:40px;font-size:112px;line-height:.95;color:#fff;white-space:normal;width:560px}'
 '.cal{left:880px;top:150px;width:330px;transform:rotate(5deg)}.cal .mth{font-size:28px}.cal .day{font-size:230px}.cal .yr{font-size:26px}'
 '.eb{left:1170px;top:96px;width:110px;height:110px;font-size:70px;font-family:DSerif}',
 body='<img class="room z1" data-img="room" alt=""><div class="dim z2"></div><div class="hd big shd z4" data-k="big"></div>'
      '<div class="cal z4" data-move="cal"><div class="mth" data-k="mth"></div><div class="day" data-k="day"></div><div class="yr" data-k="yr"></div></div><div class="eb z5" data-move="err" data-k="bang"></div>',
 text={'big':'A leap day broke <span class="limeb">Microsoft</span>','mth':'February','day':'29','yr':'2012','bang':'!'},
 images={'room':SH+'room-1583.jpg'},vars={'--rw':'1600px','--rx':'-120px','--ry':'-230px','--dim':'rgba(12,12,12,.32)'},
 direction='Her room (1583, calm, looking at the viewer), dimmed a little; a big calendar page 29 FEBRUARY 2012 with a red error badge on the right; the claim in white serif on the left, Microsoft in lime. Kind a + d. Refs: kit TH3 (cold 7), Pinterest "text woven into the photo".',
 tt='A leap day broke Microsoft (+ 29 February 2012 calendar)',
 titles=['Famous Software Bugs Explained: NULL, Leap Day and More','The Leap Day Bug That Took Down Microsoft Azure','Edge Cases in Software: A License Plate Called NULL']))
# ---------- 04 photo: one click two orders (phone notifications) ----------
V.append(dict(slug='04-one-click-two-orders',kind='photo',
 css='.big{left:44px;top:430px;font-size:96px;line-height:1;color:#fff;white-space:normal;width:620px}'
 '.ph{left:905px;top:70px;width:300px;height:615px;transform:rotate(5deg)}'
 '.scr{background:#141414 !important;color:#fff !important}.scr .in{padding:90px 16px 0;font-family:ITight}'
 '.nt{background:rgba(255,255,255,.14);border-radius:18px;padding:12px 14px;margin-bottom:12px}.nt .a{font-family:DMono;font-size:12px;letter-spacing:.08em;color:#bbb;text-transform:uppercase}'
 '.nt .b{font-weight:800;font-size:22px;margin-top:4px}.nt .c{font-size:17px;color:#ddd;margin-top:2px}.nt.r .b{color:#FF7A66}',
 body='<img class="room z1" data-img="room" alt=""><div class="dim z2"></div><div class="hd big shd z4" data-k="big"></div>'
      '<div class="phone ph z4" data-move="phone" data-dark="1"><div class="scr"><div class="in">'
      '<div class="nt"><div class="a" data-k="app"></div><div class="b" data-k="n1"></div><div class="c" data-k="amt"></div></div>'
      '<div class="nt r"><div class="a" data-k="app"></div><div class="b" data-k="n2"></div><div class="c" data-k="amt"></div></div></div></div></div>',
 text={'big':'One click, <span class="limeb">two orders</span>','app':'Shop · now','n1':'Order confirmed','n2':'Order confirmed','amt':'You paid €39.00'},
 images={'room':SH+'room-1588.jpg'},vars={'--rw':'1600px','--rx':'-170px','--ry':'-220px','--dim':'rgba(12,12,12,.28)'},
 direction='Her room (1588, unimpressed, hand at her hair), a realistic phone at the right with two identical "Order confirmed · You paid €39.00" notifications; the line low-left in white serif. Kind a. Refs: kit TH4 (two identical receipts), board "Reel covers" phone mock-ups.',
 tt='One click, two orders (+ phone: two identical order confirmations)',
 titles=['Why Apps Charge You Twice: Edge Cases in Software','Edge Cases in Software Development (8 Real Examples)','Your Users Will Find the Bug You Said Was Impossible']))
# ---------- 05 other: the real headlines ----------
V.append(dict(slug='05-real-bugs-real-headlines',kind='other',
 css='.big{left:0;right:0;top:34px;text-align:center;font-size:96px;color:#fff}'
 '.clip{padding:14px}.c1{left:70px;top:200px;width:620px;transform:rotate(-3deg)}.c2{left:600px;top:330px;width:600px;transform:rotate(2.5deg)}.c3{left:120px;top:470px;width:520px;transform:rotate(1.5deg)}',
 body='<div class="hd big z5" data-k="big"></div>'
      '<div class="clip c1 z3" data-move="wired"><img data-img="wired"><div class="cr" data-k="cr1"></div></div>'
      '<div class="clip c2 z4" data-move="bbc"><img data-img="bbc"><div class="cr" data-k="cr2"></div></div>'
      '<div class="clip c3 z4" data-move="azure"><img data-img="azure"><div class="cr" data-k="cr3"></div></div>',
 text={'big':'Bugs that <span class="limeb">really</span> happened','cr1':'WIRED · 2019','cr2':'BBC · 2016','cr3':'Microsoft Azure blog · 2012'},
 images={'wired':'../../assets/src/wired-head.png','bbc':'../../assets/src/bbc-head.png','azure':'../../assets/src/azure.png'},vars={'--ground':'#0C0C0C'},cls='pat-lines-w',
 direction='No face: the three real pages from the video (WIRED on the NULL plate, BBC on Jennifer Null, Microsoft\'s Azure leap-day summary) as clippings with small source credits on ink; one serif line. Kind e/other: a real document. Refs: her ghana thumbnail (clipping + key words), viral 6.',
 tt='Bugs that really happened (+ the WIRED, BBC and Microsoft pages)',
 titles=['Famous Software Bugs Explained: NULL, Leap Day and More','Edge Cases in Software: A License Plate Called NULL','8 Real Software Bugs That Started as Edge Cases']))
# ---------- 06 collage: edge cases explained ----------
V.append(dict(slug='09-bugs-nobody-tests-for-collage',kind='collage',
 css='.big{left:0;right:0;top:500px;text-align:center;font-size:150px;color:#fff;font-family:DSerifI}.sub{left:0;right:0;top:648px;text-align:center;font-size:30px;color:#fff;font-family:DMono;letter-spacing:.14em;text-transform:uppercase}'
 '.plate{left:70px;top:70px;width:300px;height:150px;transform:rotate(-8deg)}.plate .pt{font-size:96px}.plate .ps{font-size:13px;margin-bottom:4px}'
 '.cal{left:960px;top:60px;width:190px;transform:rotate(7deg)}.cal .mth{font-size:17px}.cal .day{font-size:130px}.cal .yr{font-size:16px}'
 '.code2{left:70px;top:300px;font-size:24px;transform:rotate(3deg);padding:18px 24px}'
 '.tag2{left:930px;top:330px;font-size:44px;padding:10px 20px;transform:rotate(-4deg);font-family:ITight;font-weight:800;letter-spacing:-.02em;text-transform:none;background:#fff;color:var(--ink)}',
 body='<img class="room z1" data-img="room" alt=""><div class="dim z2"></div>'
      '<div class="plate z4" data-move="plate"><div class="ps" data-k="ps"></div><div class="pt" data-k="pt"></div></div>'
      '<div class="cal z4" data-move="cal"><div class="mth" data-k="mth"></div><div class="day" data-k="day"></div><div class="yr" data-k="yr"></div></div>'
      '<div class="code code2 z4" data-move="sql" data-k="sql"></div><div class="tag tag2 z4" data-move="tag" data-k="name"></div>'
      '<div class="hd big shd z5" data-k="big"></div><div class="hd sub shd z5" data-k="sub"></div>',
 text={'ps':'licence plate','pt':'NULL','mth':'February','day':'29','yr':'2012','sql':"WHERE name = 'O<span class=\"r\">'</span>Brien'",'name':'Adébáyọ̀','big':'edge cases','sub':'the bugs nobody tests for'},
 images={'room':SH+'room-1583.jpg'},vars={'--rw':'1500px','--rx':'-110px','--ry':'-190px','--dim':'rgba(12,12,12,.3)'},
 direction='Collage over her full room photo (1583, calm, arms down): four objects from the video floating around her (a NULL plate, a 29 February page, a SQL line that breaks on O\'Brien, the name Adébáyọ̀); one big italic serif line low across the frame + a small mono line. Kind b/c. Refs: viral collage samples ("Thought of these?", "my potential").',
 tt='edge cases / the bugs nobody tests for',
 titles=['What Is an Edge Case in Programming? 8 Real Examples','Edge Cases in Software Development (8 Real Examples)','Edge Cases in Software: A License Plate Called NULL']))
# ---------- 07 flat paper: O'Brien ----------
V.append(dict(slug='02-this-name-breaks-apps',kind='flat',
 css='.big{left:60px;top:56px;font-size:88px}'
 '.nm{left:56px;top:262px;font-size:196px;line-height:1;font-family:ITight;font-weight:800;letter-spacing:-.05em;color:var(--ink)}'
 '.nm .r{color:var(--red)}.err{left:72px;top:540px;font-size:30px;font-family:DMono;color:var(--red);letter-spacing:.02em}'
 '.me{right:-90px;bottom:0;height:560px}',
 body='<div class="hd big z4" data-k="big"></div><div class="hd nm z4" data-k="nm" data-move="name"></div><div class="hd err z4" data-k="err" data-move="err"></div>'
      '<img class="cut me z3" data-img="me" data-move="her" alt="" style="position:absolute">',
 text={'big':'This name breaks apps','nm':'O<span class="r">’</span>Brien','err':'Error: syntax error near "Brien"'},
 images={'me':SH+'cut-1588.png'},vars={'--ground':'#EAE6DA'},cls='pat-dots',
 direction='Warm paper with a quiet dot pattern; the name O\'Brien huge with the apostrophe in red and a real-looking database error under it; her cut-out (1588, unimpressed, hand at her hair) right. Kind d. Refs: "Reading as an Act of Resistance" (claim + one coloured mark), kit TH5 logic.',
 tt="This name breaks apps (+ O'Brien, apostrophe in red)",
 titles=["Names That Break Apps: O'Brien, Null and More Edge Cases","Why the Name O'Brien Breaks Websites","A Woman Named Null and 7 Other Bugs That Break Apps"]))
# ---------- 08 other: tech explainer, no face ----------
V.append(dict(slug='08-edge-cases-in-software',kind='other',
 css='.big{left:64px;top:60px;font-size:150px;line-height:.9;color:var(--ink)}.sub{left:70px;top:236px;font-size:34px;font-family:DMono;letter-spacing:.12em;text-transform:uppercase;color:var(--ink)}'
 '.btn{left:560px;top:420px;font-size:58px;border-radius:18px}.cur{left:930px;top:470px}'
 '.ck{position:absolute;font-family:DMono;font-weight:500;color:var(--ink);font-size:30px}',
 body='<div class="hd big z4" data-k="big"></div><div class="hd sub z4" data-k="sub"></div>'
      '<div class="btn z4" data-move="btn" data-k="btn"></div>'
      '<svg class="cur z5" data-move="cursor" viewBox="0 0 24 32"><path d="M2 2 L2 26 L8 20 L12 30 L16 28 L12 18 L20 18 Z" fill="#fff" stroke="#0C0C0C" stroke-width="1.6" stroke-linejoin="round"/></svg>'
      '<div class="z5" data-move="clicks" style="position:absolute;left:0;top:0"><div class="ck" style="left:1030px;top:420px;transform:rotate(-12deg)" data-k="c1"></div><div class="ck" style="left:1060px;top:470px" data-k="c2"></div><div class="ck" style="left:1040px;top:525px;transform:rotate(12deg)" data-k="c3"></div></div>'
      '<div class="z4" data-move="orders" style="position:absolute;left:70px;top:330px"><div class="tag" style="position:relative;margin-bottom:10px;font-size:22px" data-k="o1"></div><div class="tag" style="position:relative;margin-bottom:10px;font-size:22px" data-k="o2"></div><div class="tag" style="position:relative;margin-bottom:10px;font-size:22px;background:var(--red)" data-k="o3"></div></div>',
 text={'big':'Edge cases','sub':'what real users do to your app','btn':'Place order','c1':'click','c2':'click','c3':'click','o1':'Order #1041','o2':'Order #1042','o3':'Order #1043'},
 images={},vars={'--ground':'#D4F04A'},cls='pat-lines',
 direction='Tech explainer, no face: the topic name huge in serif on lime with a quiet line pattern, a black "Place order" button being clicked three times and three order tags piling up (the last in red). Kind e. Refs: "ALGORITHMS MADE EASY", "stop using div" (topic name + the literal thing).',
 tt='Edge cases / what real users do to your app',
 titles=['Edge Cases in Software Testing: 8 Bugs Real Users Find','Edge Cases in Software Development (8 Real Examples)','What Is an Edge Case in Programming? 8 Real Examples']))
# ---------- 09 photo: name too long ----------
V.append(dict(slug='07-name-too-long',kind='photo',
 css='.big{left:40px;top:44px;font-size:104px;line-height:.98;color:#fff;white-space:normal;width:520px}'
 '.ph{left:925px;top:80px;width:300px;height:615px;transform:rotate(-4deg)}'
 '.scr .in{padding:90px 20px 0;font-family:ITight;font-weight:800}.scr .lab{font-family:DMono;font-size:14px;letter-spacing:.1em;text-transform:uppercase;color:#6b6b6b;margin:0 0 6px}'
 '.scr .f{background:#F2F2F2;border-radius:10px;padding:10px 12px;font-size:28px;letter-spacing:-.02em;color:var(--red);box-shadow:inset 0 -2px 0 var(--red);white-space:nowrap}'
 '.scr .m{color:var(--red);font-family:DMono;font-size:15px;margin-top:8px;line-height:1.3}',
 body='<img class="room z1" data-img="room" alt=""><div class="dim z2"></div><div class="hd big shd z4" data-k="big"></div>'
      '<div class="phone ph z4" data-move="phone"><div class="scr"><div class="in"><div class="lab" data-k="lab"></div><div class="f" data-k="v"></div><div class="m" data-k="err"></div></div></div></div>',
 text={'big':'My name is <span class="limeb">“too long”</span>','lab':'Full name','v':'Adébáyọ̀ Ọláolúwa','err':'Name must be 20 characters or less.'},
 images={'room':SH+'room-1587.jpg'},vars={'--rw':'1600px','--rx':'-60px','--ry':'-230px','--dim':'rgba(12,12,12,.3)'},
 direction='Her room (1587, sceptical look), a realistic phone at the right where a sign-up form rejects the Yoruba name "Adébáyọ̀ Ọláolúwa" (17 letters) as longer than 20 characters; the line in white serif on the left. Kind a + d. Refs: "I\'D FAIL SLAVERY" (creator + bold claim), kit SH9.',
 tt='My name is "too long" (+ a form rejecting a 17-letter Yoruba name)',
 titles=['Why Apps Say Your Name Is Too Long (Unicode Bugs)','Edge Cases in Software Development (8 Real Examples)','Names That Break Apps: O\'Brien, Null and More Edge Cases']))
# ---------- 10 flat red: two buyers one item ----------
V.append(dict(slug='03-sold-the-same-item-twice',kind='flat',
 css='.big{left:56px;top:56px;font-size:104px;color:#fff;white-space:normal;width:700px;line-height:1}'
 '.prod{position:absolute;left:60px;top:330px;width:330px;background:#fff;border-radius:18px;padding:20px;box-shadow:0 18px 40px rgba(0,0,0,.22)}'
 '.prod .img{height:150px;border-radius:12px;background:#EAE6DA;display:flex;align-items:center;justify-content:center;font-size:90px}'
 '.prod .t1{font-family:ITight;font-weight:800;font-size:28px;margin-top:14px}.prod .t2{font-family:DMono;font-size:18px;color:var(--red);margin-top:6px}'
 '.ok{position:absolute;background:var(--ink);color:#fff;border-radius:14px;padding:14px 22px;font-family:ITight;font-weight:800;font-size:30px;white-space:nowrap}'
 '.ok small{display:block;font-family:DMono;font-weight:500;font-size:16px;color:var(--lime);letter-spacing:.08em;text-transform:uppercase}'
 '.me{right:-50px;bottom:0;height:600px}',
 body='<div class="hd big z4" data-k="big"></div>'
      '<div class="prod z4" data-move="product"><div class="img" data-k="emoji"></div><div class="t1" data-k="pn"></div><div class="t2" data-k="stock"></div></div>'
      '<div class="ok z4" data-move="ok1" style="left:430px;top:380px;transform:rotate(-3deg)"><small data-k="ba"></small><span data-k="conf"></span></div>'
      '<div class="ok z4" data-move="ok2" style="left:450px;top:510px;transform:rotate(2deg)"><small data-k="bb"></small><span data-k="conf"></span></div>'
      '<img class="cut me z3" data-img="me" data-move="her" alt="" style="position:absolute">',
 text={'big':'Sold the same item <span style="color:var(--ink)">twice</span>','emoji':'👟','pn':'Running shoes','stock':'Only 1 left','ba':'Buyer A','bb':'Buyer B','conf':'Order confirmed'},
 images={'me':SH+'cut-1583.png'},vars={'--ground':'#FF3B1F'},cls='pat-lines',
 direction='Flat red with a quiet line pattern: one product card "Only 1 left" and two "Order confirmed" cards for Buyer A and Buyer B; her cut-out (1583, calm) right; the claim in white serif with "twice" in ink. Kind d/e (the race condition in one picture). Refs: kit TH10, design board bold colour + pattern.',
 tt='Sold the same item twice (+ "Only 1 left", two orders confirmed)',
 titles=['Race Conditions Explained: Two Buyers, One Item Left','Edge Cases in Software Development (8 Real Examples)','Your Users Will Find the Bug You Said Was Impossible']))

# ======== round 2 after the cold test (2026-11-10) ========
B={v['slug']:v for v in V}
v=B['01-null-plate-fines']; v['body']=v['body'].replace('left:900px;top:500px','left:950px;top:540px'); v['css']+='.tk{width:160px}'
v=B['05-her-name-is-null']; v['css']=v['css'].replace(".scr .m{color:var(--red);font-family:DMono;font-size:15px;margin-top:8px}",".scr .m{color:var(--red);font-family:ITight;font-weight:800;font-size:21px;margin-top:8px}")
v=B['06-leap-day-broke-microsoft']; v['css']=v['css'].replace(".cal{left:880px",".cal{left:820px").replace(".eb{left:1170px;top:96px",".eb{left:1100px;top:104px")
v['titles']=['The Leap Day Bug That Took Down Microsoft Azure','Famous Software Bugs Explained: NULL, Leap Day and More','Edge Cases in Software: A License Plate Called NULL']
v=B['04-one-click-two-orders']; v['css']=v['css'].replace(".big{left:44px;top:430px;font-size:96px;line-height:1;color:#fff;white-space:normal;width:620px}",".big{left:40px;top:40px;font-size:100px;line-height:1;color:#fff;white-space:normal;width:420px}").replace(".nt .b{font-weight:800;font-size:22px",".nt .b{font-weight:800;font-size:27px").replace(".nt .c{font-size:17px",".nt .c{font-size:21px")
v['text']['big']='One click, <span class="limeb">two&nbsp;orders</span>'
v['vars']['--rx']='-60px'
v['css']+='.nt.r .c{color:#FF7A66;font-weight:800}'
v=B['09-bugs-nobody-tests-for-collage']
v['css']=".big{right:44px;top:420px;text-align:right;font-size:104px;line-height:1;color:#fff;font-family:DSerifI;white-space:normal;width:640px}.sub{right:60px;top:640px;text-align:right;font-size:34px;color:#fff;font-family:ITight;font-weight:800;letter-spacing:-.01em}"+\
 ".plate{left:60px;top:120px;width:380px;height:190px;transform:rotate(-8deg)}.plate .pt{font-size:124px}.plate .ps{font-size:16px;margin-bottom:4px}"+\
 ".cal{left:940px;top:50px;width:240px;transform:rotate(7deg)}.cal .mth{font-size:20px}.cal .day{font-size:160px}.cal .yr{font-size:18px}"
v['body']='<img class="room z1" data-img="room" alt=""><div class="dim z2"></div><div class="plate z4" data-move="plate"><div class="ps" data-k="ps"></div><div class="pt" data-k="pt"></div></div><div class="cal z4" data-move="cal"><div class="mth" data-k="mth"></div><div class="day" data-k="day"></div><div class="yr" data-k="yr"></div></div><div class="hd big shd z5" data-k="big"></div><div class="hd sub shd z5" data-k="sub"></div>'
v['text']={'ps':'licence plate','pt':'NULL','mth':'February','day':'29','yr':'2012','big':'bugs nobody tests&nbsp;for','sub':'edge cases, with real examples'}
v['tt']='bugs nobody tests for / edge cases, with real examples'
v['vars']={'--rw':'1640px','--rx':'-300px','--ry':'-190px','--dim':'rgba(12,12,12,.3)'}
v['direction']=v['direction'].replace('four objects from the video floating around her (a NULL plate, a 29 February page, a SQL line that breaks on O\'Brien, the name Adébáyọ̀)','two big objects from the video floating beside her (a NULL plate, a 29 February page; the cold test said four was too many)').replace('one big italic serif line low across the frame + a small mono line','one big italic serif line low right + a small bold line')
v=B['02-this-name-breaks-apps']; v['css']=v['css'].replace(".err{left:72px;top:540px;font-size:30px;font-family:DMono;color:var(--red);letter-spacing:.02em}",".err{left:60px;top:520px;font-size:32px;font-family:DMono;color:#fff;background:var(--ink);padding:14px 22px;letter-spacing:0}.err .r{color:#FF7A66}")
v['text']['err']='ERROR: syntax error near <span class="r">"Brien"</span>'
v['titles']=["Why the Name O'Brien Crashes Databases (SQL Bug)","Names That Break Apps: O'Brien, Null and More Edge Cases","Edge Cases in Software Development (8 Real Examples)"]
v=B['07-name-too-long']; v['css']=v['css'].replace(".scr .in{padding:90px 20px 0",".scr .in{padding:230px 16px 0").replace("font-size:28px;letter-spacing:-.02em;color:var(--red)","font-size:25px;letter-spacing:-.03em;color:var(--red)").replace(".scr .m{color:var(--red);font-family:DMono;font-size:15px",".scr .m{color:var(--red);font-family:ITight;font-weight:800;font-size:22px").replace(".scr .lab{font-family:DMono;font-size:14px",".scr .lab{font-family:DMono;font-size:17px")
v['titles']=['Why Apps Reject Nigerian Names (Unicode Edge Cases)','Why Apps Say Your Name Is Too Long (Unicode Bugs)','Edge Cases in Software Development (8 Real Examples)']
v=B['03-sold-the-same-item-twice']; v['css']=v['css'].replace(".ok{position:absolute;background:var(--ink);color:#fff;border-radius:14px;padding:14px 22px;font-family:ITight;font-weight:800;font-size:30px",".ok{position:absolute;background:var(--ink);color:#fff;border-radius:16px;padding:16px 26px;font-family:ITight;font-weight:800;font-size:38px").replace("font-size:16px;color:var(--lime)","font-size:20px;color:var(--lime)")
v['body']=v['body'].replace('left:430px;top:380px','left:410px;top:350px').replace('left:450px;top:510px','left:380px;top:500px')
V=[x for x in V if x['slug'] not in ('05-real-bugs-real-headlines','08-edge-cases-in-software')]
# new 05: daylight saving, two clocks, no face
V.append(dict(slug='08-clocks-change-code-breaks',kind='other',
 css='.big{left:0;right:0;top:50px;text-align:center;font-size:90px;color:#fff}'
 '.clk{position:absolute;top:250px;width:470px;height:300px;border-radius:26px;background:#1C1C1C;display:flex;flex-direction:column;align-items:center;justify-content:center}'
 '.clk .tm{font-family:ITight;font-weight:800;font-size:150px;letter-spacing:-.04em;color:#fff;line-height:1}.clk .lb{font-family:DMono;font-size:26px;letter-spacing:.12em;text-transform:uppercase;color:#B9C77A;margin-top:14px}'
 '.clk.b .tm{color:var(--red)}.arr{position:absolute;left:576px;top:330px;font-family:ITight;font-weight:800;font-size:120px;color:var(--lime)}'
 '.job{left:0;right:0;top:600px;text-align:center;font-size:40px;font-family:ITight;font-weight:800;color:var(--red)}',
 body='<div class="hd big z4" data-k="big"></div><div class="clk z3" data-move="clock1" style="left:90px"><div class="tm" data-k="t1"></div><div class="lb" data-k="l1"></div></div>'
      '<div class="arr z3" data-k="arr"></div><div class="clk b z3" data-move="clock2" style="left:720px"><div class="tm" data-k="t2"></div><div class="lb" data-k="l2"></div></div><div class="hd job z4" data-k="job"></div>',
 text={'big':'Clocks change. <span class="limeb">Code breaks.</span>','t1':'02:59','l1':'Sunday 29 March','arr':'→','t2':'04:00','l2':'one second later','job':'Your 3:30 a.m. job never runs'},
 images={},vars={'--ground':'#0C0C0C'},cls='pat-lines-w',
 direction='No face, ink ground with a quiet line pattern: a clock at 02:59 and one second later 04:00 (Tallinn, 29 March 2026: the hour that does not exist), the claim in serif with "Code breaks." in lime, one red line saying what goes wrong. Kind e/f (before / after). Refs: "ALGORITHMS MADE EASY" (topic + the literal thing), kit TH6 rewritten so it is not a riddle.',
 tt='Clocks change. Code breaks. (+ 02:59 -> 04:00)',
 titles=['Daylight Saving Time Bugs: The Hour That Never Happens','Edge Cases in Software Development (8 Real Examples)','Famous Software Bugs Explained: NULL, Leap Day and More']))
# new 08: photo, users will break this
V.append(dict(slug='10-users-will-break-this',kind='photo',
 css='.big{left:40px;top:40px;font-size:96px;line-height:.98;color:#fff;white-space:normal;width:440px}'
 '.btn{left:50px;top:520px;font-size:58px;border-radius:18px;background:#fff;color:var(--ink)}.cur{left:290px;top:590px;width:80px}'
 '.ck{position:absolute;font-family:ITight;font-weight:800;color:var(--lime);font-size:34px;text-shadow:0 2px 12px rgba(0,0,0,.5)}',
 body='<img class="room z1" data-img="room" alt=""><div class="dim z2"></div><div class="hd big shd z4" data-k="big"></div>'
      '<div class="btn z4" data-move="btn" data-k="btn"></div>'
      '<svg class="cur z5" data-move="cursor" viewBox="0 0 24 32"><path d="M2 2 L2 26 L8 20 L12 30 L16 28 L12 18 L20 18 Z" fill="#0C0C0C" stroke="#fff" stroke-width="1.6" stroke-linejoin="round"/></svg>'
      '<div class="z5" data-move="clicks" style="position:absolute;left:0;top:0"><div class="ck" style="left:400px;top:495px;transform:rotate(-12deg)" data-k="c1"></div><div class="ck" style="left:400px;top:552px" data-k="c2"></div><div class="ck" style="left:400px;top:610px;transform:rotate(12deg)" data-k="c3"></div></div>',
 text={'big':'Your users <span class="limeb">will</span> break this','btn':'Place order','c1':'click','c2':'click','c3':'click'},
 images={'room':SH+'room-1586.jpg'},vars={'--rw':'1640px','--rx':'-30px','--ry':'-240px','--dim':'rgba(12,12,12,.3)'},
 direction='Her room (1586, hand on chin, thinking), a big white "Place order" button being clicked again and again at the right; the claim in white serif top-left. Kind a + d. Refs: "JUST WAIT" (plain claim over a real scene), her own talking-head look.',
 tt='Your users will break this (+ Place order, click click click)',
 titles=['Edge Cases in Software Testing: 8 Bugs Real Users Find','Edge Cases in Software Development (8 Real Examples)','Your Users Will Find the Bug You Said Was Impossible']))
V.sort(key=lambda x:x['slug'])
for v in V:
    d=os.path.join(D,v['slug']); os.makedirs(d,exist_ok=True)
    html=('<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../../lib/field.css"><style>'+v['css']+'</style></head><body>'
          f'<div class="t">{v["body"]}</div><script src="../../lib/bind.js"></script></body></html>')
    open(os.path.join(d,'index.html'),'w').write(html)
    c=dict(direction=v['direction'],thumbnail_text=v['tt'],titles=v['titles'],title=v['titles'][0],kind=v['kind'],text=v['text'],images=v['images'],vars=v['vars'],
           **({'class':('no-lift '+v.get('cls','')).strip()} ))
    if v.get('rec'): c['recommended']=True
    p=os.path.join(d,'content.json')
    if os.path.exists(p):
        old=json.load(open(p)); 
        if 'nudge' in old: c['nudge']=old['nudge']
    json.dump(c,open(p,'w'),indent=2,ensure_ascii=False)
json.dump(sorted(v['slug'] for v in V),open(os.path.join(D,'index.json'),'w'))
print('ok',len(V))
