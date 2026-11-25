#!/usr/bin/env python3
"""First version of every thumbnail direction (2026-11-03). Writes directions/<NN-name>/{index.html,content.json}.
After the first run the folders are the source (the studio edits content.json); re-running OVERWRITES them, so run it
only with --force on a fresh set, or with a direction prefix to regenerate one: python3 tools/gen-first-version.py 05 --force
"""
import json, os, sys
HERE = os.path.dirname(os.path.abspath(__file__)); ROOT = os.path.dirname(HERE); DIRS = os.path.join(ROOT, 'directions')
T = {
 1: "Edge Cases in Software: A License Plate Called NULL",
 2: "A Woman Named Null and 7 Other Bugs That Break Apps",
 3: "Famous Software Bugs Explained: NULL, Leap Day and More",
 4: "Edge Cases in Software Development (8 Real Examples)",
 5: "Edge Cases in Software Testing: 8 Bugs Real Users Find",
 6: "What Is an Edge Case in Programming? 8 Real Examples",
 7: "A License Plate Called NULL and 7 More Edge Cases",
 8: "Your Users Will Find the Bug You Said Was Impossible",
}
CUR = '<svg class="cur" data-move="{n}" style="{st}" viewBox="0 0 30 40"><path d="M2,2 L2,32 L10,25 L15,37 L21,34 L16,23 L27,23 Z" fill="#fff" stroke="#0C0C0C" stroke-width="2.6" stroke-linejoin="round"/></svg>'
def cur(n, st): return CUR.format(n=n, st=st)
def scene(img, me, cls='', wash=True):
    return (f'<div class="scene {cls} z1" data-move="room"><img class="bg" data-img="room" src="../../assets/frames/{img}" alt="">'
            + ('<div class="wash"></div>' if wash else '') + '<div class="dim"></div></div>'
            + f'<div class="scene {cls} z3" data-move="her"><img class="me-c" data-img="me" src="../../assets/scene/{me}" alt=""></div>')
def tickets(st, n=3):
    out = [f'<div class="z4" data-move="tickets" style="position:absolute;{st}">']
    rot = [-9, 4, 13, -2][:n]
    for i, r in enumerate(rot):
        out.append(f'<div class="tk" style="left:{i*58}px;top:{i*30}px;transform:rotate({r}deg)"><div class="band" data-k="tkband"></div>'
                   '<div class="amt" data-k="tkamt"></div><div class="ln"></div><div class="ln s"></div><div class="bc"></div></div>')
    out.append('</div>'); return ''.join(out)

D = []
def add(name, kind, words, titles, direction, body, css, text, images=None, vars=None, cls='', rec=False):
    D.append(dict(name=name, kind=kind, words=words, titles=[T[i] for i in titles], direction=direction, body=body, css=css,
                  text=text, images=images or {}, vars=vars or {}, cls=cls, rec=rec))

# ---------------- PHOTO BACKGROUND (7) ----------------
add('01-her-name-is-null', 'photo', 'HER NAME IS NULL', [3, 4, 2],
 "Photo background: her room washed lime (the film's ground), she in full colour, palms up ('what?'). Beside her the film's giant sign-up field: SURNAME [Null] in red with 'Surname is required.' under it. References: her ux-research thumbnail (her photo washed one colour, few huge props), kit TH5 (cold 8), viral 6 (a real error).",
 scene('f_436.5.jpg', 'gbemi-436.5-person.png') +
 '<div class="hd z4" data-k="hd"></div><div class="fl err z4" data-move="field"><div class="lab" data-k="lab"></div><div class="box"><span data-k="val"></span><span class="caret"></span></div><div class="msg"><span class="bang">!</span><span data-k="msg"></span></div></div>',
 '.hd{left:640px;top:40px;font-size:104px;color:#fff}.fl{left:640px;top:330px;--lf:30px}.fl .box{font-size:116px;width:580px}.fl .msg{font-size:36px;background:#0C0C0C;padding:8px 16px;display:inline-flex}',
 {'hd': 'Her name<br>is <span class="red">Null</span>', 'lab': 'Surname', 'val': 'Null', 'msg': 'Surname is required.'},
 {'room': '../../assets/frames/f_436.5.jpg', 'me': '../../assets/scene/gbemi-436.5-person.png'},
 {'--ground': '#0C0C0C', '--wash': '#D4F04A', '--bgb': '1.25', '--bgc': '.7', '--sc': '1.3', '--sc-x': '-190px', '--sc-y': '60px'}, rec=True)

add('02-12000-in-fines', 'photo', '$12,000 IN FINES', [1, 7, 3],
 "Photo background: her room dark (ink wash), she in full colour pointing up. Right: a big generic licence plate reading NULL (no real state design) with a fan of red-banded parking fines under it. Words: the outcome in plain numbers. References: kit TH2 (cold 8, 'works for non-developers'), viral 2 (one object = the outcome), her database-indexes sample (one big mechanism).",
 scene('f_138.75.jpg', 'gbemi-138.75-person.png') +
 '<div class="hd z5 shadow-t" data-k="hd"></div><div class="plate z4" data-move="plate"><div class="ps" data-k="ps"></div><div class="pt" data-k="pt"></div></div>' + tickets('left:330px;top:520px'),
 '.hd{left:50px;top:36px;font-size:112px;color:#fff}.plate{left:50px;top:270px;width:520px;height:250px;transform:rotate(-4deg)}.tk{width:210px}.tk .band{font-size:16px}.plate .pt{font-size:200px}.plate .ps{font-size:22px;margin-bottom:4px}',
 {'hd': '<span class="acc">$12,000</span><br>in fines', 'ps': 'licence plate', 'pt': 'NULL', 'tkband': 'PARKING FINE', 'tkamt': ''},
 {'room': '../../assets/frames/f_138.75.jpg', 'me': '../../assets/scene/gbemi-138.75-person.png'},
 {'--ground': '#0C0C0C', '--wash': '#2A2A2A', '--bgb': '1.2', '--bgc': '.8', '--sc': '1.3', '--sc-x': '190px', '--sc-y': '60px'}, rec=True)

add('03-leap-day-bug', 'photo', 'LEAP DAY BUG', [3, 5, 4],
 "Photo background: her room in natural colour (darkened), she surprised, palms up. Right: a big calendar page 'FEBRUARY 29' with a red error badge stuck on it and the small line 'Microsoft Azure, 2012'. References: kit TH3 (the calendar idea, cold 7), viral 5 (the scene shows the topic), her Pinterest 'text behind' (the words above her head).",
 scene('f_297.39.jpg', 'gbemi-297.39-person.png', 'natural', wash=False) +
 '<div class="hd z2" data-k="hd"></div><div class="cal z4" data-move="calendar"><div class="mth"><div class="rings"><i></i><i></i><i></i></div><span data-k="mth"></span></div><div class="day" data-k="day"></div><div class="yr" data-k="yr"></div></div><div class="eb z5" data-move="badge" data-k="eb"></div><div class="tag z5" data-k="tag"></div>',
 '.hd{left:0;right:0;top:14px;text-align:center;font-size:158px;color:#fff;white-space:nowrap}.cal{left:975px;top:290px;width:270px;font-size:32px;transform:rotate(5deg)}.cal .day{font-size:180px;padding-bottom:.12em}.cal .yr{display:none}.eb{left:1190px;top:255px;width:90px;height:90px;font-size:62px}.tag{left:880px;top:630px;font-size:28px;transform:rotate(5deg)}',
 {'hd': 'Leap day <span class="red">bug</span>', 'mth': 'February', 'day': '29', 'yr': '', 'eb': '', 'tag': ''},
 {'room': '../../assets/frames/f_297.39.jpg', 'me': '../../assets/scene/gbemi-297.39-person.png'},
 {'--ground': '#0C0C0C', '--dim': 'rgba(12,12,12,.18)', '--meb': '1.22', '--bgb': '.95', '--sc': '1.12', '--sc-x': '-40px', '--sc-y': '26px'}, rec=True)

add('04-one-click-two-orders', 'photo', 'ONE CLICK, TWO ORDERS', [5, 4, 8],
 "Photo background: her room washed lime, she with her hands at her head. Right: the film's giant 'Place order' button with a cursor pressing it and, under it, an orders list with the same order twice (the second row in red). References: her ux-research thumbnail (note → phone, few big props), kit TH4 (double charge) reworded so it is about software, not a complaint.",
 scene('f_251.75.jpg', 'gbemi-251.75-person.png') +
 '<div class="hd z4" data-k="hd"></div><div class="btn z4" data-move="button" data-k="btn"></div>' + cur('cursor', 'left:410px;top:340px;z-index:6') +
 '<div class="card z4" data-move="orders" style="left:50px;top:450px;width:560px;padding:20px 26px"><div class="mono" style="font-size:22px;opacity:.6;margin-bottom:10px" data-k="olab"></div>'
 '<div class="orow"><span data-k="o1"></span><span data-k="p1"></span></div><div class="orow red2"><span data-k="o2"></span><span data-k="p2"></span></div></div>',
 '.hd{left:50px;top:36px;font-size:100px}.btn{left:50px;top:270px;font-size:76px}.orow{display:flex;justify-content:space-between;font-size:38px;letter-spacing:-.02em;padding:12px 0;border-top:3px solid rgba(12,12,12,.12)}.orow span:last-child{font-family:JB}.red2{color:#FF3B1F}',
 {'hd': 'One click,<br><span class="red">two orders</span>', 'btn': 'Place order', 'olab': 'Orders', 'o1': '#1041  Shoes', 'p1': '€40', 'o2': '#1042  Shoes', 'p2': '€40'},
 {'room': '../../assets/frames/f_251.75.jpg', 'me': '../../assets/scene/gbemi-251.75-person.png'},
 {'--ground': '#0C0C0C', '--wash': '#D4F04A', '--bgb': '1.5', '--bgc': '.7', '--sc': '1.3', '--sc-x': '190px', '--sc-y': '60px'})

add('05-edge-cases-plate-and-leap-day', 'photo', 'EDGE CASES', [7, 2, 3],
 "Her database-indexes method on her own photo: the topic name huge across the top (EDGE CASES, the words people search), her room washed ink so it goes calm, she calm in full colour in the middle; two big objects only, the NULL plate on one side and the 29 FEBRUARY calendar page on the other, each with a red error mark. The titles carry the stories.",
 scene('f_498.jpg', 'gbemi-498-person.png') +
 '<div class="hd tall z4" data-k="hd"></div><div class="plate z4" data-move="plate"><div class="pt" data-k="pt"></div></div><div class="cal z4" data-move="calendar"><div class="mth"><div class="rings"><i></i><i></i><i></i></div><span data-k="mth"></span></div><div class="day" data-k="day"></div></div>'
 '',
 '.hd{left:0;right:0;top:4px;text-align:center;font-size:200px;color:#FFFFFF}.plate{left:20px;top:300px;width:500px;height:262px;transform:rotate(-6deg)}.plate .pt{font-size:196px}.cal{left:1010px;top:390px;width:200px;font-size:24px;transform:rotate(6deg)}.cal .day{font-size:120px;padding-bottom:.15em}',
 {'hd': 'Edge cases', 'pt': 'NULL', 'mth': 'February', 'day': '29'},
 {'room': '../../assets/frames/f_498.jpg', 'me': '../../assets/scene/gbemi-498-person.png'},
 {'--ground': '#0C0C0C', '--wash': '#20251a', '--bgb': '1.3', '--bgc': '.8', '--sc': '1.15', '--sc-x': '0px', '--sc-y': '32px'}, rec=True)

add('06-names-that-break-apps', 'photo', 'NAMES THAT BREAK APPS', [2, 1, 4],
 "Photo background: her room in natural colour, darkened; she counts on her fingers. Right: three name fields stacked, each a real name from the video (O'Brien, Null, Adébáyọ̀) with a red outline and a short red error. References: viral 6 (a real error screen), her Pinterest 'list beside the person', her database-indexes sample (one mechanism, big).",
 scene('f_40.75.jpg', 'gbemi-40.75-person.png', 'natural', wash=False) +
 '<div class="hd z4 shadow-t" data-k="hd"></div>' +
 ''.join(f'<div class="fl err z4" data-move="field{i}" style="left:{690 + i*16}px;top:{240 + i*156}px"><div class="box"><span data-k="n{i}"></span></div><div class="msg"><span class="bang">!</span><span data-k="e{i}"></span></div></div>' for i in range(3)),
 '.hd{left:640px;top:36px;font-size:84px;color:#fff}.fl .box{font-size:62px;width:500px;--bw:7px}.fl .msg{font-size:26px;margin-top:8px;color:#fff}.fl .msg .bang{color:#fff}',
 {'hd': 'Names that<br><span class="red">break apps</span>', 'n0': "O'Brien", 'e0': 'Something went wrong', 'n1': 'Null', 'e1': 'Surname is required', 'n2': 'Adébáy<span class="cmb">ọ̀</span>', 'e2': 'Name is too long'},
 {'room': '../../assets/frames/f_40.75.jpg', 'me': '../../assets/scene/gbemi-40.75-person.png'},
 {'--ground': '#0C0C0C', '--dim': 'rgba(12,12,12,.45)', '--bgb': '.9', '--sc': '1.3', '--sc-x': '-190px', '--sc-y': '60px'})

add('07-daylight-saving-bug', 'photo', 'DAYLIGHT SAVING BUG', [4, 5, 3],
 "Photo background: her room washed ink-blue night, she shrugs. Right: two giant clocks, 03:30 and 03:30 again, the second one in red with 'ran twice' (a scheduled job); a small 'Tallinn, 25 Oct 2026' tag. Everyone knows the clocks change; the clocks show the bug. References: kit TH6 reworded (its riddle wording scored 5), viral 2 (one object = the outcome).",
 scene('f_330.75.jpg', 'gbemi-330.75-person.png') +
 '<div class="hd z4 shadow-t" data-k="hd"></div><div class="clk z4" data-move="clock1"><span data-k="c1"></span></div><div class="clk r z4" data-move="clock2"><span data-k="c2"></span><div class="mono cl" data-k="cl"></div></div><div class="tag z5" data-k="tag"></div>',
 '.hd{left:50px;top:36px;font-size:96px;color:#fff}.clk{position:absolute;left:50px;top:300px;background:#0C0C0C;color:#fff;font-family:JB;font-weight:800;font-size:132px;padding:8px 30px 12px;letter-spacing:-.04em}.clk.r{top:480px;left:90px;background:#FF3B1F}.clk .cl{position:absolute;right:-20px;bottom:-34px;font-size:24px;background:#fff;color:#0C0C0C;padding:6px 12px;transform:rotate(-4deg)}.tag{left:50px;top:250px;font-size:22px;background:#fff;color:#0C0C0C}',
 {'hd': 'Daylight<br>saving <span class="red">bug</span>', 'c1': '03:30', 'c2': '03:30', 'cl': 'job ran twice', 'tag': 'Tallinn · 25 Oct 2026'},
 {'room': '../../assets/frames/f_330.75.jpg', 'me': '../../assets/scene/gbemi-330.75-person.png'},
 {'--ground': '#0C0C0C', '--wash': '#22304a', '--bgb': '1.4', '--bgc': '.8', '--sc': '1.3', '--sc-x': '190px', '--sc-y': '60px'})

# ---------------- COLLAGE OVER HER FULL PHOTO (3) ----------------
add('08-collage-weird-bugs', 'collage', 'weird bugs from real apps', [1, 4, 6],
 "Collage over her full natural photo (her 10-07 ask): small die-cut objects around her (the NULL plate, a parking fine, the 29 February page, a 'Surname: Null' field), one big serif line across the middle, three handwritten labels. References: viral collage samples 'Time to lock in.', 'Thought of these?', 'How to be Feminine'.",
 scene('f_355.jpg', 'gbemi-355-person.png', 'natural', wash=False) +
 '<div class="hd serif z5 shadow-t" data-k="hd"></div>'
 '<div class="plate stk z4" data-move="plate" style="left:70px;top:70px;width:250px;height:130px;transform:rotate(-8deg);border-width:8px;border-radius:16px"><div class="pt" data-k="pt" style="font-size:96px"></div></div>'
 '<div class="tk stk z4" data-move="ticket" style="left:300px;top:200px;width:150px;transform:rotate(9deg)"><div class="band" style="font-size:13px">PARKING FINE</div><div class="ln"></div><div class="ln s"></div><div class="bc" style="height:22px"></div></div>'
 '<div class="cal stk z4" data-move="calendar" style="left:1000px;top:60px;width:190px;font-size:20px;transform:rotate(7deg)"><div class="mth"><span data-k="mth"></span></div><div class="day" style="font-size:110px" data-k="day"></div></div>'
 '<div class="fl err stk z4" data-move="field" style="left:930px;top:430px;transform:rotate(-4deg)"><div class="box" style="font-size:52px;width:270px;--bw:6px"><span data-k="val"></span></div></div>'
 '<div class="hand l z5" data-k="l1" style="left:96px;top:228px"></div><div class="hand l z5" data-k="l2" style="left:1050px;top:262px"></div><div class="hand l z5" data-k="l3" style="left:950px;top:540px"></div>',
 '.hd{left:0;right:0;top:330px;text-align:center;font-size:104px;color:#fff;line-height:1}.l{position:absolute;font-size:40px;color:#fff;text-shadow:0 2px 10px rgba(0,0,0,.6)}',
 {'hd': 'weird bugs from real apps', 'pt': 'NULL', 'mth': 'Feb', 'day': '29', 'val': 'Null', 'l1': '$12,000 in fines', 'l2': 'leap day', 'l3': '"surname is required"'},
 {'room': '../../assets/frames/f_355.jpg', 'me': '../../assets/scene/gbemi-355-person.png'},
 {'--dim': 'rgba(12,12,12,.25)', '--bgb': '1.0', '--sc': '1.0'})

add('09-collage-edge-cases-explained', 'collage', 'edge cases, explained', [1, 2, 7],
 "Editorial collage: her full photo (calm, closed mouth), the topic in a big serif line ('edge cases' with 'explained' in mono under it), and a few die-cut film pieces around her: the 'Place order' button with a cursor, an O'Brien field, a 03:30 clock and the NULL plate, each with a tiny handwritten note. References: viral 'Capsule wardrobe' (serif topic line over the person), 'in defense of being online' (small cut-outs around her).",
 scene('f_288.jpg', 'gbemi-288-person.png', 'natural', wash=False) +
 '<div class="hd serif z5 shadow-t" data-k="hd"></div><div class="mono z5 sub" data-k="sub"></div>'
 '<div class="btn stk z4" data-move="button" data-k="btn" style="left:80px;top:90px;font-size:40px;transform:rotate(-5deg)"></div>' + cur('cursor', 'left:300px;top:130px;width:54px;height:72px;z-index:5') +
 '<div class="fl err stk z4" data-move="field" style="left:70px;top:470px;transform:rotate(4deg)"><div class="box" style="font-size:50px;width:250px;--bw:6px"><span data-k="val"></span></div></div>'
 '<div class="stk z4" data-move="clock" style="left:1000px;top:90px;background:#0C0C0C;color:#fff;font-family:JB;font-weight:800;font-size:64px;padding:4px 18px;transform:rotate(6deg)" data-k="clk"></div>'
 '<div class="plate stk z4" data-move="plate" style="left:960px;top:470px;width:240px;height:124px;transform:rotate(-6deg);border-width:8px;border-radius:16px"><div class="pt" data-k="pt" style="font-size:92px"></div></div>'
 '<div class="hand l z5" data-k="l1" style="left:96px;top:186px"></div><div class="hand l z5" data-k="l2" style="left:1000px;top:196px"></div><div class="hand l z5" data-k="l3" style="left:92px;top:590px"></div><div class="hand l z5" data-k="l4" style="left:990px;top:610px"></div>',
 '.hd{left:0;right:0;top:300px;text-align:center;font-size:150px;color:#fff;line-height:1}.sub{position:absolute;left:0;right:0;top:456px;text-align:center;font-size:30px;color:#D4F04A;letter-spacing:.4em}.l{position:absolute;font-size:36px;color:#fff;text-shadow:0 2px 10px rgba(0,0,0,.6)}',
 {'hd': 'edge cases', 'sub': 'explained', 'btn': 'Place order', 'val': "O'Brien", 'clk': '03:30', 'pt': 'NULL', 'l1': 'clicked twice', 'l2': 'happened twice', 'l3': 'breaks SQL', 'l4': '$12,000 in fines'},
 {'room': '../../assets/frames/f_288.jpg', 'me': '../../assets/scene/gbemi-288-person.png'},
 {'--dim': 'rgba(12,12,12,.32)', '--bgb': '1.0'})

add('10-collage-her-surname-breaks-websites', 'collage', 'her surname breaks websites', [3, 1, 4],
 "Collage of one story: her full photo, a die-cut airport kiosk photo (Pexels, logo cropped away) and a boarding-pass style card where the surname reads NULL with a red 'Surname is required', one serif line and two handwritten labels. References: viral 'Thought of these?' (one big serif line low over the photo), her ghana 10b (the key words highlighted).",
 scene('f_498.jpg', 'gbemi-498-person.png', 'natural', wash=False) +
 '<div class="hd serif z5 shadow-t" data-k="hd"></div>'
 '<div class="stk z4" data-move="kiosk" style="left:40px;top:60px;width:330px;height:250px;overflow:hidden;transform:rotate(-5deg)"><img data-img="kiosk" src="../../assets/props/px-3943950-crop.jpg" style="width:400px;margin-left:-30px;margin-top:-20px"></div>'
 '<div class="card stk z4" data-move="pass" style="left:890px;top:80px;width:350px;padding:20px 24px;transform:rotate(5deg)"><div class="mono" style="font-size:18px;opacity:.6" data-k="plab"></div><div style="font-size:30px;margin-top:6px" data-k="first"></div><div class="mono" style="font-size:18px;opacity:.6;margin-top:12px" data-k="slab"></div><div style="font-size:64px;color:#FF3B1F;border:5px solid #FF3B1F;padding:0 12px;margin-top:4px;letter-spacing:-.03em" data-k="sur"></div><div style="color:#FF3B1F;font-size:22px;margin-top:8px" data-k="err"></div></div>'
 '<div class="hand l z5" data-k="l1" style="left:70px;top:330px"></div><div class="hand l z5" data-k="l2" style="left:920px;top:420px"></div>',
 '.hd{left:0;right:0;top:470px;text-align:center;font-size:96px;color:#fff;line-height:1}.l{position:absolute;font-size:40px;color:#fff;text-shadow:0 2px 10px rgba(0,0,0,.6)}',
 {'hd': 'her surname breaks websites', 'plab': 'First name', 'first': 'Jennifer', 'slab': 'Surname', 'sur': 'Null', 'err': '! Surname is required', 'l1': 'trying to buy a plane ticket', 'l2': 'it is her real name'},
 {'room': '../../assets/frames/f_498.jpg', 'me': '../../assets/scene/gbemi-498-person.png', 'kiosk': '../../assets/props/px-3943950-crop.jpg'},
 {'--dim': 'rgba(12,12,12,.3)', '--bgb': '1.0'})

# ---------------- FLAT GRAPHIC (5) ----------------
add('11-this-name-breaks-websites', 'flat', 'THIS NAME BREAKS WEBSITES', [3, 1, 2],
 "Flat lime (the film itself): the two-field sign-up form at poster size, 'Jennifer' fine, 'Null' in red with 'Surname is required.'; her black-and-white cut-out with an ink outline at the right edge, eyebrow up. References: her database-indexes sample (flat ground, one mechanism, her small B&W cut-out with outline), kit TH5.",
 '<div class="hd z4" data-k="hd"></div><div class="fl z3" data-move="first" style="left:60px;top:290px"><div class="lab" data-k="l1"></div><div class="box"><span data-k="v1"></span></div></div>'
 '<div class="fl err z3" data-move="surname" style="left:60px;top:500px"><div class="lab" data-k="l2"></div><div class="box"><span data-k="v2"></span><span class="caret"></span></div><div class="msg"><span class="bang">!</span><span data-k="msg"></span></div></div>'
 '<img class="cut bw ol z2" data-img="me" data-move="her" src="../../assets/cut/gbemi-436.5-cut.png">',
 '.hd{left:60px;top:44px;font-size:104px}.fl .box{font-size:78px;width:620px;--bw:8px}.fl .lab{font-size:26px;margin-bottom:8px}.fl .msg{font-size:34px}.cut{right:-40px;height:560px}',
 {'hd': 'This name<br><span class="red">breaks websites</span>', 'l1': 'First name', 'v1': 'Jennifer', 'l2': 'Surname', 'v2': 'Null', 'msg': 'Surname is required.'},
 {'me': '../../assets/cut/gbemi-436.5-cut.png'}, {'--ground': '#D4F04A'}, rec=True)

add('12-invalid-date', 'flat', 'FEB 29, 2013 DOESN\'T EXIST', [3, 5, 4],
 "Flat ink: a giant date field. Top: 29 FEB 2012 (fine). Under it: '+ 1 year' and a red field 29 FEB 2013 with 'Invalid date' (Microsoft's own summary: the code added one to the year). Headline names the leap day; a small tag credits Azure 2012. Faceless. References: viral 6 (an error), her database-indexes sample (the mechanism drawn literally).",
 '<div class="on-dark" style="position:absolute;inset:0"><div class="hd z4" data-k="hd"></div>'
 '<div class="fl z3" data-move="date1" style="left:60px;top:200px"><div class="lab" data-k="l1"></div><div class="box"><span data-k="v1"></span></div></div>'
 '<div class="mono z3 plus" data-k="plus"></div>'
 '<div class="fl err z3" data-move="date2" style="left:60px;top:440px"><div class="lab" data-k="l2"></div><div class="box"><span data-k="v2"></span></div><div class="msg"><span class="bang">!</span><span data-k="msg"></span></div></div>'
 '<div class="tag z4" data-k="tag"></div></div>',
 '.hd{left:60px;top:44px;font-size:110px;color:#fff}.fl .box{font-size:92px;width:640px;--bw:8px;font-family:JB;letter-spacing:-.02em}.fl .lab{font-size:24px;margin-bottom:8px}.fl .msg{font-size:34px}.plus{position:absolute;left:66px;top:378px;font-size:34px;color:#D4F04A}.tag{left:760px;top:244px;font-size:24px;background:#D4F04A;color:#0C0C0C}',
 {'hd': 'The <span class="limeb">leap day</span> bug', 'l1': 'Valid from', 'v1': '29 FEB 2012', 'plus': '+ 1 year', 'l2': 'Valid to', 'v2': '29 FEB 2013', 'msg': 'Invalid date. That day does not exist.', 'tag': 'Microsoft Azure, 2012'},
 {}, {'--ground': '#0C0C0C', '--fg': '#FFFFFF'})

add('13-1-left-2-sold', 'flat', '1 LEFT, 2 SOLD', [5, 4, 8],
 "Flat lime: one product card 'Only 1 left' on the left; two 'Order confirmed' cards on the right, both for that same last item, the second stamped in red. Two buyers, one item: the race condition in one picture, no jargon. References: kit TH10 (cold 6, now a bigger card and plain words), viral 'before / after' splits.",
 '<div class="hd z4" data-k="hd"></div>'
 '<div class="card z3" data-move="product" style="left:60px;top:250px;width:420px;padding:26px 28px"><div class="mono" style="font-size:24px;opacity:.6" data-k="plab"></div><div style="font-size:52px;margin-top:8px;letter-spacing:-.03em;line-height:1" data-k="item"></div><div style="font-family:JB;font-size:88px;margin-top:18px" data-k="price"></div><div class="mono" style="font-size:28px;margin-top:8px;color:#FF3B1F" data-k="left"></div></div>'
 '<svg class="z3" style="position:absolute;left:500px;top:390px" width="150" height="60" viewBox="0 0 150 60"><path d="M6,30 H128 M104,8 L134,30 L104,52" fill="none" stroke="#0C0C0C" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/></svg>'
 '<div class="card z3 oc" data-move="order1" style="left:680px;top:240px"><div class="mono ok" data-k="ok1"></div><div class="who" data-k="b1"></div></div>'
 '<div class="card z3 oc r" data-move="order2" style="left:720px;top:440px"><div class="mono ok" data-k="ok2"></div><div class="who" data-k="b2"></div></div>',
 '.hd{left:60px;top:44px;font-size:132px}.ph{height:200px;background:#E6E3DA;background-image:linear-gradient(135deg,transparent 46%,rgba(12,12,12,.14) 46% 54%,transparent 54%)}.oc{width:500px;padding:22px 28px}.oc .ok{font-size:28px}.oc .who{font-size:52px;letter-spacing:-.03em;margin-top:6px}.oc.r{background:#FF3B1F;color:#fff}',
 {'hd': '1 left, <span class="red">2 sold</span>', 'plab': 'Product', 'item': 'Running shoes', 'price': '€40', 'left': 'Only 1 left', 'ok1': '✓ Order confirmed', 'b1': 'Buyer A', 'ok2': '✓ Order confirmed', 'b2': 'Buyer B'},
 {}, {'--ground': '#D4F04A'})

add('14-his-plate-said-null', 'flat', 'HIS PLATE SAID NULL', [1, 7, 3],
 "Flat white paper: the film's form field asks for a 'Licence plate' and holds NULL; under it the parking fines fan out with '$12,000 in fines' in red. Her black-and-white cut-out with an ink outline on the right, pointing up. References: her database-indexes sample (paper card, one yellow there, one red here), kit TH2 (cold 8).",
 '<div class="hd z4" data-k="hd"></div><div class="fl z3" data-move="field" style="left:60px;top:300px"><div class="lab" data-k="lab"></div><div class="box"><span data-k="val"></span></div></div>'
 + tickets('left:420px;top:500px', 3) +
 '<div class="z4 big" data-k="big"></div><img class="cut bw ol z2" data-img="me" data-move="her" src="../../assets/cut/seated-cut.png">',
 '.hd{left:60px;top:44px;font-size:110px}.fl .box{font-size:120px;width:560px;font-family:Plate;letter-spacing:.02em;--bw:10px}.fl .lab{font-size:26px;margin-bottom:8px}.tk{width:200px}.tk .band{font-size:15px}.tk .amt{display:none}.big{position:absolute;left:60px;top:540px;font-size:54px;width:360px;white-space:normal!important;line-height:1;color:#FF3B1F;letter-spacing:-.03em;white-space:nowrap}.cut{right:-60px;height:600px}',
 {'hd': 'His plate<br>said <span class="red">NULL</span>', 'lab': 'Licence plate', 'val': 'NULL', 'tkband': 'PARKING FINE', 'tkamt': '', 'big': '$12,000<br>in fines'},
 {'me': '../../assets/cut/seated-cut.png'}, {'--ground': '#F3F1EA'})

add('15-edge-cases-form', 'flat', 'EDGE CASES', [1, 2, 4],
 "Her database-indexes sample, translated: the topic name huge on lime, and ONE form with three fields where every answer is a real edge case from the video (O'Brien, Null, 29 Feb 2013), each field red with its error. Her black-and-white cut-out with a red outline bottom right. The titles carry the stories.",
 '<div class="hd z4" data-k="hd"></div>'
 '<div class="card z3" data-move="form" style="left:60px;top:270px;width:720px;padding:26px 30px 10px">' +
 ''.join(f'<div class="fl err" style="position:relative;margin-bottom:18px"><div class="row2"><span class="lab" data-k="l{i}"></span><span class="m" data-k="e{i}"></span></div><div class="box"><span data-k="v{i}"></span></div></div>' for i in range(3)) +
 '</div><img class="cut bw ol z2" data-img="me" data-move="her" src="../../assets/cut/gbemi-160-cut.png">',
 '.hd{left:56px;top:30px;font-size:200px;letter-spacing:-.05em}.fl .box{font-size:46px;--bw:6px;padding:2px 16px}.row2{display:flex;justify-content:space-between;align-items:baseline}.fl .lab{font-size:22px;margin-bottom:6px}.m{color:#FF3B1F;font-size:24px}.cut{right:-20px;height:430px;--ol:#FF3B1F}',
 {'hd': 'Edge cases', 'l0': 'Surname', 'e0': 'query failed', 'v0': "O'Brien", 'l1': 'Surname', 'e1': 'surname is required', 'v1': 'Null', 'l2': 'Date', 'e2': 'invalid date', 'v2': '29 / 02 / 2013'},
 {'me': '../../assets/cut/gbemi-160-cut.png'}, {'--ground': '#D4F04A'}, rec=True)

# ---------------- OTHER (3) ----------------
add('16-null-real-headlines', 'other', 'THE WORD THAT BREAKS APPS', [1, 3, 2],
 "Real sources, no face: two real clippings on lime, cropped but never altered, each with a small credit: WIRED's 'How a NULL License Plate Landed One Hacker in Ticket Hell' and the BBC's Jennifer Null paragraph, NULL marked in red in the big word. The headline asks what one word does. References: her ghana 10b (clipping + the key words marked), viral 6 (a real document).",
 '<div class="hd z4" data-k="hd"></div>'
 '<div class="clip z3" data-move="wired" style="left:60px;top:300px;width:800px;transform:rotate(-1.5deg)"><img data-img="wired" src="../../assets/src/wired-head.png"><div class="cr" data-k="c1"></div></div>'
 '<div class="clip z3" data-move="bbc" style="left:520px;top:500px;width:700px;transform:rotate(1.5deg)"><img data-img="bbc" src="../../assets/src/bbc-jn.png"><div class="cr" data-k="c2"></div></div>',
 '.hd{left:60px;top:40px;font-size:104px;line-height:1.02}',
 {'hd': 'The word that<br><span class="red">breaks apps</span>', 'c1': 'WIRED, Brian Barrett, 13 Aug 2019', 'c2': 'BBC Future, Chris Baraniuk, 25 Mar 2016'},
 {'wired': '../../assets/src/wired-head.png', 'bbc': '../../assets/src/bbc-jn.png'}, {'--ground': '#D4F04A'})

add('17-15-became-20', 'other', '$15 BECAME $20', [5, 3, 4],
 "Split before / after, no face: left two generic gift cards '$5' and '$5' (plus one more), an arrow 'same transfer, sent twice at once', right the two cards adding up to $20. Egor Homakov's 2015 Starbucks bug, drawn generic (no logo). References: viral before/after splits, dark-patterns 15 (€40 → €52, cold 7.5-8).",
 '<div class="hd z4" data-k="hd"></div>'
 '<div class="gc z3" data-move="before" style="left:60px;top:300px"><div class="mono" data-k="bl"></div><div class="row3"><div class="g"><span data-k="a1"></span></div><div class="g"><span data-k="a2"></span></div><div class="g"><span data-k="a3"></span></div></div><div class="tot" data-k="t1"></div></div>'
 '<div class="arrowtag z4" data-k="mid"></div>'
 '<div class="gc z3 r" data-move="after" style="left:740px;top:300px"><div class="mono" data-k="al"></div><div class="row3"><div class="g"><span data-k="b1"></span></div><div class="g"><span data-k="b2"></span></div></div><div class="tot" data-k="t2"></div></div><div class="tag z4" data-k="tag"></div>',
 '.hd{left:60px;top:44px;font-size:150px}.gc{position:absolute;background:#fff;padding:24px 28px;width:480px}.gc .mono{font-size:22px;opacity:.6}.row3{display:flex;gap:14px;margin-top:14px}.g{flex:1;height:110px;background:#0C0C0C;color:#fff;border-radius:14px;display:flex;align-items:flex-end;padding:10px 14px;font-family:JB;font-size:38px}.gc.r .g{background:#FF3B1F}.tot{font-size:64px;letter-spacing:-.03em;margin-top:14px;font-family:JB}.arrowtag{position:absolute;left:470px;top:250px;background:#0C0C0C;color:#D4F04A;font-family:JB;font-size:24px;padding:8px 14px;transform:rotate(-3deg)}.tag{left:60px;top:640px;font-size:22px}',
 {'hd': '<span class="red">$15</span> became $20', 'bl': 'Before', 'a1': '$5', 'a2': '$5', 'a3': '$5', 't1': '$15', 'mid': 'same transfer, sent twice at once →', 'al': 'After', 'b1': '$15', 'b2': '$5', 't2': '$20', 'tag': 'Starbucks gift cards, Egor Homakov, 2015'},
 {}, {'--ground': '#D4F04A'})

add('18-this-apostrophe-breaks-apps', 'other', 'THIS APOSTROPHE BREAKS APPS', [4, 2, 6],
 "One character, no face: a giant SURNAME field holding O'BRIEN with the apostrophe circled in red marker, and under it the database line it breaks (generic SQL, the cut-off part greyed). For developers and the curious. References: her database-indexes sample (one mechanism, row highlighted), viral 'TWO SUM' (code + one marked thing).",
 '<div class="hd z4" data-k="hd"></div><div class="fl z3" data-move="field" style="left:60px;top:286px"><div class="lab" data-k="lab"></div><div class="box"><span data-k="v1"></span><span class="ap" data-k="v2"></span><span data-k="v3"></span></div></div>'
  '<div class="code z3" data-move="code" style="left:60px;top:566px"><span data-k="code"></span></div>',
 ".hd{left:60px;top:40px;font-size:104px;line-height:1.02}.fl .box{font-size:150px;width:820px;--bw:10px}.fl .lab{font-size:26px;margin-bottom:8px}.ap{background:#FF3B1F;color:#fff;padding:0 .04em}.code{font-size:40px}",
 {'hd': 'This apostrophe<br><span class="red">breaks apps</span>', 'lab': 'Surname', 'v1': 'O', 'v2': "'", 'v3': 'Brien', 'code': "WHERE surname = <b>'O</b><span class=\"r\">'</span><span class=\"g\">Brien'</span>"},
 {}, {'--ground': '#F3F1EA'})


# ================= ROUND 2 (cold critic r1, 2026-11-06): a later add() with the same number replaces the earlier one =================
add('11-this-name-breaks-websites', 'flat', 'THIS NAME BREAKS WEBSITES', [2, 3, 8],
 "Flat lime (the film itself): ONE giant surname field holding 'Null' in red with 'Surname is required.' under it; her black-and-white cut-out with an ink outline at the right edge, calm. Critic r1: 7.5 alone, 8 with title 2; fixes applied (first-name row dropped, field 1.4x, message lifted). References: her database-indexes sample (flat ground, one mechanism, her small B&W cut-out with outline), kit TH5.",
 '<div class="hd z4" data-k="hd"></div>'
 '<div class="fl err z3" data-move="surname" style="left:60px;top:300px"><div class="lab" data-k="l2"></div><div class="box"><span data-k="v2"></span><span class="caret"></span></div><div class="msg"><span class="bang">!</span><span data-k="msg"></span></div></div>'
 '<img class="cut bw ol z2" data-img="me" data-move="her" src="../../assets/cut/headshot-cut.png">',
 '.hd{left:60px;top:44px;font-size:104px}.fl .box{font-size:150px;width:640px;--bw:10px}.fl .lab{font-size:30px;margin-bottom:10px}.fl .msg{font-size:44px}.cut{right:-170px;height:600px;bottom:-40px!important}',
 {'hd': 'This name<br><span class="red">breaks websites</span>', 'l2': 'Surname', 'v2': 'Null', 'msg': 'Surname is required.'},
 {'me': '../../assets/cut/headshot-cut.png'}, {'--ground': '#D4F04A'}, rec=True)

add('12-leap-day-bug-flat', 'flat', 'THE LEAP DAY BUG', [3, 5, 4],
 "Flat ink: two giant date fields only. 29 FEB 2012, then '+ 1 year', then 29 FEB 2013 in red, struck through (Microsoft's own summary: the code added one to the year, and that date does not exist). Her black-and-white cut-out with a lime outline on the right, closed mouth. Critic r1 (6.5): labels and error line cut, her face added.",
 '<div class="on-dark" style="position:absolute;inset:0"><div class="hd z4" data-k="hd"></div>'
 '<div class="fl z3" data-move="date1" style="left:60px;top:230px"><div class="box"><span data-k="v1"></span></div></div>'
 '<div class="mono z3 plus" data-k="plus"></div>'
 '<div class="fl err z3" data-move="date2" style="left:60px;top:470px"><div class="box"><span class="strike" data-k="v2"></span></div></div>'
 '<img class="cut bw ol z2" data-img="me" data-move="her" src="../../assets/cut/gbemi-251.75-cut.png"></div>',
 '.hd{left:60px;top:44px;font-size:110px;color:#fff}.fl .box{font-size:86px;display:inline-block;width:auto;--bw:10px;font-family:JB;letter-spacing:-.03em}.plus{position:absolute;left:66px;top:385px;font-size:48px;color:#D4F04A}.strike{position:relative}.strike::after{content:"";position:absolute;left:-2%;right:-2%;top:50%;height:12px;background:#FF3B1F}.cut{right:-330px;height:500px;filter:grayscale(1) brightness(1.4) contrast(1.05)!important}',
 {'hd': 'The <span class="limeb">leap day</span> bug', 'v1': '29 FEB 2012', 'plus': '+ 1 year', 'v2': '29 FEB 2013'},
 {'me': '../../assets/cut/gbemi-251.75-cut.png'}, {'--ground': '#0C0C0C', '--fg': '#FFFFFF'})

add('13-1-left-2-sold', 'flat', '1 LEFT, 2 SOLD', [8, 5, 4],
 "Flat lime: one product card 'Only 1 left'; two 'Order confirmed' cards for that same last item, the second in red. Two buyers, one item: the race condition in one picture, no jargon. Her black-and-white cut-out bottom right. Critic r1: 7 alone, 7.5 with title 8; face added, labels 30 px+.",
 '<div class="hd z4" data-k="hd"></div>'
 '<div class="card z3" data-move="product" style="left:60px;top:250px;width:380px;padding:26px 28px;border-bottom:14px solid #FF3B1F"><div style="font-size:50px;letter-spacing:-.03em;line-height:1" data-k="item"></div><div style="font-family:JB;font-size:96px;margin-top:14px" data-k="price"></div></div>'
  '<div class="card z3 oc" data-move="order1" style="left:480px;top:235px"><div class="mono ok" data-k="ok1"></div><div class="who" data-k="b1"></div></div>'
 '<div class="card z3 oc r" data-move="order2" style="left:500px;top:445px"><div class="mono ok" data-k="ok2"></div><div class="who" data-k="b2"></div></div>'
 '<img class="cut bw ol z2" data-img="me" data-move="her" src="../../assets/cut/seated-cut.png">',
 '.hd{left:60px;top:44px;font-size:132px;color:#fff}.oc{width:470px;padding:24px 32px}.oc .ok{font-size:34px}.oc .who{font-size:78px;letter-spacing:-.03em;margin-top:6px}.oc.r{background:#FF3B1F;color:#fff}.cut{right:-130px;height:520px}',
 {'hd': '1 left, <span class="red">2 sold</span>', 'item': 'Running shoes', 'price': '€40', 'left': 'Only 1 left', 'ok1': '✓ Confirmed', 'b1': 'Buyer A', 'ok2': '✓ Confirmed', 'b2': 'Buyer B'},
 {'me': '../../assets/cut/seated-cut.png'}, {'--ground': '#0C0C0C', '--fg': '#FFFFFF', '--ol': '#FFFFFF'})

add('14-his-plate-said-null', 'flat', 'HIS PLATE SAID NULL', [7, 3],
 "Flat white paper: the film's form field asks for a 'Licence plate' and holds NULL; two parking fines under it and '$12,000 in fines' in red. Her black-and-white cut-out with an ink outline on the right, finger up. Critic r1: best of the set (8 alone, 8.5 with title 7); fixes applied (no tickets over her hand, field 10% bigger). References: her database-indexes sample, kit TH2 (cold 8).",
 '<div class="hd z4" data-k="hd"></div><div class="fl z3" data-move="field" style="left:60px;top:300px"><div class="lab" data-k="lab"></div><div class="box"><span data-k="val"></span></div></div>'
 + tickets('left:400px;top:520px', 2) +
 '<div class="z4 big" data-k="big"></div><img class="cut bw ol z2" data-img="me" data-move="her" src="../../assets/cut/seated-cut.png">',
 '.hd{left:60px;top:44px;font-size:110px}.fl .box{font-size:132px;width:600px;font-family:Plate;letter-spacing:.02em;--bw:10px}.fl .lab{font-size:28px;margin-bottom:8px}.tk{width:190px}.tk .band{font-size:15px}.tk .amt{display:none}.big{position:absolute;left:60px;top:548px;font-size:66px;width:380px;line-height:1;color:#FF3B1F;letter-spacing:-.03em}.cut{right:-60px;height:600px}',
 {'hd': 'His plate<br>said <span class="red">NULL</span>', 'lab': 'Licence plate', 'val': 'NULL', 'tkband': 'PARKING FINE', 'tkamt': '', 'big': '$12,000<br>in fines'},
 {'me': '../../assets/cut/seated-cut.png'}, {'--ground': '#F3F1EA'}, rec=True)

add('15-edge-cases-form', 'flat', 'EDGE CASES', [6, 2, 3],
 "Her database-indexes sample, translated: the topic name huge on lime, and ONE form with two fields where each answer is a real edge case from the video (the surname Null, the date 29/02/2013), both red with their error. Her black-and-white cut-out with an ink outline bottom right. Critic r1 (6.5): three fields cut to two, labels 30 px+, red halo removed.",
 '<div class="hd z4" data-k="hd"></div>'
 '<div class="card z3" data-move="form" style="left:60px;top:270px;width:700px;padding:26px 30px 8px">' +
 ''.join(f'<div class="fl err" style="position:relative;margin-bottom:20px"><div class="row2"><span class="lab" data-k="l{i}"></span><span class="m" data-k="e{i}"></span></div><div class="box"><span data-k="v{i}"></span></div></div>' for i in range(2)) +
 '</div><img class="cut bw ol z2" data-img="me" data-move="her" src="../../assets/cut/gbemi-297.39-cut.png">',
 '.hd{left:56px;top:30px;font-size:200px;letter-spacing:-.05em}.fl:last-child .box{font-size:92px}.fl .box{font-size:64px;--bw:8px;padding:2px 18px}.row2{display:flex;justify-content:space-between;align-items:baseline}.fl .lab{font-size:30px;margin-bottom:6px}.m{color:#FF3B1F;font-size:30px}.cut{right:-140px;height:440px}',
 {'hd': 'Edge cases', 'l0': 'Surname', 'e0': '', 'v0': 'Null', 'l1': 'Date', 'e1': 'invalid date', 'v1': '29 / 02 / 2013'},
 {'me': '../../assets/cut/gbemi-297.39-cut.png'}, {'--ground': '#F3F1EA'})

add('16-null-breaks-apps', 'other', 'NULL BREAKS APPS', [4, 5, 8],
 "Real sources, no face: the real WIRED headline 'How a NULL License Plate Landed One Hacker in Ticket Hell' on lime (cropped, never altered, credited) and a big generic NULL plate under it. Critic r1 5.5, r2 6: the body text clips were cut to one headline and an object. References: her ghana 10b (clipping + the key words marked), viral 6 (a real document).",
 '<div class="hd z4" data-k="hd"></div>'
 '<div class="clip z3" data-move="wired" style="left:50px;top:230px;width:1180px;transform:rotate(-1deg)"><img data-img="wired" src="../../assets/src/wired-headline.png"><div class="cr" data-k="c1"></div></div>'
 '<div class="plate z4" data-move="plate" style="left:390px;top:440px;width:500px;height:250px;transform:rotate(-3deg)"><div class="pt" data-k="pt" style="font-size:190px"></div></div>',
 '.hd{left:56px;top:50px;font-size:122px;letter-spacing:-.05em;line-height:1}.clip .cr{font-size:18px}',
 {'hd': '<span class="red">NULL</span> breaks apps', 'c1': 'WIRED, Brian Barrett, 13 Aug 2019', 'pt': 'NULL'},
 {'wired': '../../assets/src/wired-headline.png'}, {'--ground': '#D4F04A'})

add('17-15-became-20', 'other', '$15 → $20', [8, 5, 3],
 "One number, no face: '$15 → $20' huge, and one line under it ('the same gift card transfer, sent twice at once'). Egor Homakov's 2015 Starbucks race condition, credited in a small tag; no logo. Critic r1 (6): the before/after maths was too slow, now one glance.",
 '<div class="hd z4" data-k="hd"></div><div class="z4 sub" data-k="sub"></div>',
 '.hd{left:0;right:0;top:120px;text-align:center;font-size:250px;letter-spacing:-.06em}.x2{position:absolute;left:1090px;top:40px;background:#FF3B1F;color:#fff;font-size:80px;padding:6px 26px 14px;transform:rotate(8deg)}.sub{position:absolute;left:0;right:0;top:450px;text-align:center;font-size:60px;letter-spacing:-.03em;font-weight:800}.tag{left:50%;transform:translateX(-50%);top:560px;font-size:24px}',
 {'hd': '$15 <span class="acc">→</span> $20', 'sub': 'the same gift card transfer,<br>sent twice at once'},
 {}, {'--ground': '#D4F04A'})

add('18-this-apostrophe-breaks-apps', 'other', 'THIS APOSTROPHE BREAKS APPS', [4, 2, 6],
 "One character: a giant SURNAME field holding O'Brien with the apostrophe circled in red marker, and under it the database line it breaks (generic SQL, the cut-off part greyed). Her black-and-white cut-out on the right. Critic r1: 7.5; O'Brien 1.3x, her face added in the empty right side.",
 '<div class="hd z4" data-k="hd"></div><div class="fl z3" data-move="field" style="left:60px;top:290px"><div class="lab" data-k="lab"></div><div class="box"><span data-k="v1"></span><span class="ap" data-k="v2"></span><span data-k="v3"></span></div></div>'
  '<div class="code z3" data-move="code" style="left:60px;top:586px"><span data-k="code"></span></div><img class="cut bw ol z2" data-img="me" data-move="her" src="../../assets/cut/headshot-cut.png">',
 ".hd{left:60px;top:40px;font-size:100px;line-height:1.07}.fl .box{font-size:190px;width:720px;--bw:10px;line-height:1.05}.fl .lab{font-size:28px;margin-bottom:8px}.ap{background:#FF3B1F;color:#fff;padding:0 .04em}.code{font-size:42px}.cut{right:-120px;height:500px}",
 {'hd': 'This apostrophe<br><span class="red">breaks apps</span>', 'lab': 'Surname', 'v1': 'O', 'v2': "'", 'v3': 'Brien', 'code': "WHERE surname = <b>'O</b><span class=\"r\">'</span><span class=\"g\">Brien'</span>"},
 {'me': '../../assets/cut/headshot-cut.png'}, {'--ground': '#F3F1EA'})


add('08-collage-weird-bugs', 'collage', 'weird bugs from real apps', [3, 6, 4],
 "Collage over her full natural photo (her 10-07 ask), cut down after critic r1 (5): two big die-cut objects only, the NULL plate and the 29 February page, one serif line above her head, two handwritten labels at 52 px, no glow. References: viral collage samples 'Time to lock in.', 'Thought of these?', 'How to be Feminine'.",
 scene('f_355.jpg', 'gbemi-355-person.png', 'natural', wash=False) +
 '<div class="hd serif z5 shadow-t" data-k="hd"></div>'
 '<div class="plate stk z4" data-move="plate" style="left:50px;top:300px;width:330px;height:172px;transform:rotate(-8deg);border-width:10px;border-radius:20px"><div class="pt" data-k="pt" style="font-size:128px"></div></div>'
 '<div class="cal stk z4" data-move="calendar" style="left:960px;top:270px;width:250px;font-size:26px;transform:rotate(7deg)"><div class="mth"><span data-k="mth"></span></div><div class="day" style="font-size:150px;padding-bottom:.1em" data-k="day"></div></div>'
 '<div class="hand l z5" data-k="l1" style="left:70px;top:500px"></div><div class="hand l z5" data-k="l2" style="left:985px;top:545px"></div>',
 '.hd{left:0;right:0;top:34px;text-align:center;font-size:96px;color:#fff;line-height:1}.l{position:absolute;font-size:52px;color:#fff;text-shadow:0 2px 10px rgba(0,0,0,.6);line-height:1}',
 {'hd': 'weird bugs from real apps', 'pt': 'NULL', 'mth': 'February', 'day': '29', 'l1': '$12,000 in fines', 'l2': 'took down part of Azure'},
 {'room': '../../assets/frames/f_355.jpg', 'me': '../../assets/scene/gbemi-355-person.png'},
 {'--ground': '#0C0C0C', '--dim': 'rgba(12,12,12,.35)', '--bgb': '1.0', '--sc': '1.06', '--sc-y': '10px'})

add('01-her-name-is-null', 'photo', 'HER NAME IS NULL', [2, 3, 4],
 "Photo background: her room in near-black (one dark wash, no olive), she in full colour, calm, mouth closed. Beside her the film's giant surname field: Null in red, 'Surname is required.' on an ink chip so it reads at phone size. Critic r1 (6.5): closed-mouth frame, flat dark room, bigger error. References: her ux-research thumbnail (her photo washed one colour, few huge props), kit TH5 (cold 8).",
 scene('f_355.jpg', 'gbemi-355-person.png') +
 '<div class="hd z4" data-k="hd"></div><div class="fl err z4" data-move="field"><div class="lab" data-k="lab"></div><div class="box"><span data-k="val"></span><span class="caret"></span></div><div class="msg"><span class="bang">!</span><span data-k="msg"></span></div></div>',
 '.hd{left:650px;top:40px;font-size:104px;color:#fff}.fl{left:650px;top:330px;--lf:30px}.fl .lab{color:#FF3B1F}.fl .box{font-size:124px;width:580px}.fl .msg{font-size:46px;background:#0C0C0C;padding:8px 18px;display:inline-flex}',
 {'hd': 'Her name<br>is <span class="red">Null</span>', 'lab': 'Surname', 'val': 'Null', 'msg': 'Surname is required.'},
 {'room': '../../assets/frames/f_355.jpg', 'me': '../../assets/scene/gbemi-355-person.png'},
 {'--ground': '#0C0C0C', '--wash': '#3a3a3a', '--bgb': '1.05', '--bgc': '.8', '--sc': '1.3', '--sc-x': '-190px', '--sc-y': '60px'}, rec=True)

add('02-12000-in-fines', 'photo', '$12,000 IN FINES', [7, 3],
 "Photo background: her room near-black, she in full colour, calm, mouth closed. Left: a big generic licence plate reading NULL (no real state design) with two red-banded parking fines under it, a clear gap from her face. Words: the outcome in plain numbers. Critic r1 (7): closed-mouth frame, plate off her chin, 2 tickets. References: kit TH2 (cold 8), viral 2 (one object = the outcome).",
 scene('f_498.jpg', 'gbemi-498-person.png') +
 '<div class="hd z5 shadow-t" data-k="hd"></div><div class="plate z4" data-move="plate"><div class="ps" data-k="ps"></div><div class="pt" data-k="pt"></div></div>' + tickets('left:150px;top:520px', 2),
 '.hd{left:50px;top:36px;font-size:112px;color:#fff}.plate{left:40px;top:270px;width:480px;height:240px;transform:rotate(-4deg)}.plate .pt{font-size:180px}.plate .ps{font-size:22px;margin-bottom:4px}.tk{width:210px}.tk .band{font-size:16px}.tk .amt{display:none}',
 {'hd': '<span class="acc">$12,000</span><br>in fines', 'ps': 'licence plate', 'pt': 'NULL', 'tkband': 'PARKING FINE', 'tkamt': ''},
 {'room': '../../assets/frames/f_498.jpg', 'me': '../../assets/scene/gbemi-498-person.png'},
 {'--ground': '#0C0C0C', '--wash': '#2A2A2A', '--bgb': '1.2', '--bgc': '.8', '--sc': '1.3', '--sc-x': '190px', '--sc-y': '60px'}, rec=True)

add('06-names-that-break-apps', 'photo', 'NAMES THAT BREAK APPS', [2, 4],
 "Photo background: her room in natural colour, darkened; she calm, mouth closed. Right: ONE name field at 2x, Adébáyọ̀ in red with 'Name is too long' on a red chip (letters with tone marks take more than one byte, so a short name can fail a length check). Critic r1 (6): three fields cut to one, closed-mouth frame.",
 scene('f_230.90.jpg', 'gbemi-230.90-person.png', 'natural', wash=False) +
 '<div class="hd z4 shadow-t" data-k="hd"></div><div class="fl err z4" data-move="field" style="left:650px;top:330px"><div class="lab" data-k="lab"></div><div class="box"><span data-k="n0"></span></div><div class="msg"><span class="chipr" data-k="e0"></span></div></div>',
 '.hd{left:650px;top:40px;font-size:88px;color:#fff}.fl .lab{color:#FF3B1F}.fl .box{font-size:112px;width:590px;--bw:9px}.chipr{background:#FF3B1F;color:#fff;font-size:40px;padding:6px 16px}',
 {'hd': 'Names that<br><span class="red">break apps</span>', 'lab': 'First name', 'n0': 'Adébáy<span class="cmb">ọ̀</span>', 'e0': 'Name is too long'},
 {'room': '../../assets/frames/f_230.90.jpg', 'me': '../../assets/scene/gbemi-230.90-person.png'},
 {'--ground': '#0C0C0C', '--dim': 'rgba(12,12,12,.45)', '--bgb': '.9', '--sc': '1.3', '--sc-x': '-190px', '--sc-y': '60px'})

add('07-daylight-saving-bug', 'photo', 'DAYLIGHT SAVING BUG', [4, 5, 3],
 "Photo background: her room washed ink-blue night, she calm, mouth closed. Left: the clock 03:30 shown twice, the second in red with a big '×2' stamp (when the clocks go back, a job set for 3:30 runs twice). Critic r1 (6.5): '×2' added, date tag cut, closed-mouth frame.",
 scene('f_200.52.jpg', 'gbemi-200.52-person.png') +
 '<div class="hd z4 shadow-t" data-k="hd"></div><div class="clk z4" data-move="clock1"><span data-k="c1"></span></div><div class="clk r z4" data-move="clock2"><span data-k="c2"></span></div><div class="x2 z5" data-move="stamp" data-k="x2"></div>',
 '.hd{left:50px;top:36px;font-size:100px;color:#fff}.clk{position:absolute;left:50px;top:290px;background:#fff;color:#0C0C0C;font-family:JB;font-weight:800;font-size:132px;padding:8px 30px 12px;letter-spacing:-.04em}.clk.r{top:480px;left:90px;background:#FF3B1F;color:#fff}.x2{position:absolute;left:520px;top:440px;background:#fff;color:#FF3B1F;font-size:88px;padding:2px 20px 10px;transform:rotate(8deg)}',
 {'hd': 'Daylight<br>saving <span class="red">bug</span>', 'c1': '03:30', 'c2': '03:30', 'x2': '×2'},
 {'room': '../../assets/frames/f_200.52.jpg', 'me': '../../assets/scene/gbemi-200.52-person.png'},
 {'--ground': '#0C0C0C', '--wash': '#22304a', '--bgb': '1.4', '--bgc': '.8', '--sc': '1.3', '--sc-x': '190px', '--sc-y': '60px'})

add('10-collage-one-click-two-orders', 'collage', 'one click, two orders', [8, 5, 4],
 "Collage over her full natural photo (calm, mouth closed): a die-cut photo of a hand on a mouse (Pexels) on one side, two die-cut order slips for the same shoes on the other (the second in red), one big serif line low across the frame, no small labels (critic r2). References: viral collage samples 'Thought of these?' (one serif line low over the photo), 'in defense of being online' (cut-outs around her).",
 scene('f_200.52.jpg', 'gbemi-200.52-person.png', 'natural', wash=False) +
 '<div class="hd serif z5 shadow-t" data-k="hd"></div>'
 '<div class="stk z4" data-move="mouse" style="left:40px;top:50px;width:330px;height:300px;overflow:hidden;transform:rotate(-5deg)"><img data-img="mouse" src="../../assets/props/px-14139165-crop.jpg" style="width:340px"></div>'
 '<div class="card z4 slip" data-move="slip1" style="left:920px;top:60px;transform:rotate(5deg)"><div class="mono" data-k="s1l"></div><div class="row"><span data-k="s1"></span><span data-k="p1"></span></div></div>'
 '<div class="card z4 slip r" data-move="slip2" style="left:900px;top:250px;transform:rotate(-3deg)"><div class="mono" data-k="s2l"></div><div class="row"><span data-k="s2"></span><span data-k="p2"></span></div></div>'
 '',
 '.hd{left:0;right:0;top:596px;text-align:center;font-size:104px;color:#fff;line-height:1}.l{position:absolute;font-size:52px;color:#fff;text-shadow:0 2px 10px rgba(0,0,0,.6);line-height:1}.slip{width:330px;padding:18px 24px}.slip .mono{font-size:26px;opacity:.6}.slip .row{display:flex;justify-content:space-between;font-size:52px;margin-top:6px}.slip.r{background:#FF3B1F;color:#fff}.slip.r .mono{opacity:.85}',
 {'hd': 'one click, two orders', 's1l': 'Order #1041', 's1': 'Shoes', 'p1': '€40', 's2l': 'Order #1042', 's2': 'Shoes', 'p2': '€40', 'l1': 'double click', 'l2': 'same order, twice'},
 {'room': '../../assets/frames/f_200.52.jpg', 'me': '../../assets/scene/gbemi-200.52-person.png', 'mouse': '../../assets/props/px-14139165-crop.jpg'},
 {'--ground': '#0C0C0C', '--dim': 'rgba(12,12,12,.32)', '--bgb': '1.0', '--sc': '1.06', '--sc-y': '10px'})

# ================= ROUND 3 (2026-11-07): type set 05 (DM Serif Display + DM Mono), no thick lines, her studio photos =================
HS = '../../assets/photo/headshot.png'; SE = '../../assets/photo/seated.jpg'
add('01-her-name-is-null', 'photo', 'HER NAME IS NULL', [2, 3, 4],
 "Her studio headshot (white shirt, calm, closed mouth) as a full-height photo panel on the right; on lime, the headline in DM Serif and the film's surname field: Null in red, 'Surname is required.' in mono. One idea, three things. References: her ux-research thumbnail (her photo + few huge props), kit TH5 (cold 8).",
 '<div class="panel z2" data-move="photo" style="left:700px;width:580px"><img data-img="photo" src="' + HS + '" style="object-position:50% 20%"></div>'
 '<div class="hd z4" data-k="hd"></div><div class="fl err z4" data-move="field" style="left:60px;top:360px"><div class="lab" data-k="lab"></div><div class="box"><span data-k="val"></span><span class="caret"></span></div><div class="msg"><span class="bang">!</span><span data-k="msg"></span></div></div>',
 '.hd{left:60px;top:50px;font-size:132px}.fl .box{font-size:120px;width:560px}.fl .msg{font-size:46px}',
 {'hd': 'Her name<br>is <span class="red">Null</span>', 'lab': 'Surname', 'val': 'Null', 'msg': 'Surname is required.'},
 {'photo': HS}, {'--ground': '#D4F04A'}, rec=True)

add('02-12000-in-fines', 'photo', '$12,000 IN FINES', [7, 3],
 "Her seated studio photo (calm, closed mouth) as a full-height panel on the left; on ink, '$12,000 in fines' in DM Serif with the number in red, a generic NULL licence plate and two parking fines. References: kit TH2 (cold 8), viral 2 (one object = the outcome).",
 '<div class="panel z2" data-move="photo" style="left:0;width:520px"><img data-img="photo" src="' + SE + '" style="object-position:45% 30%"></div>'
 '<div class="hd z4" data-k="hd"></div><div class="plate z4" data-move="plate"><div class="ps" data-k="ps"></div><div class="pt" data-k="pt"></div></div>' + tickets('left:930px;top:540px', 2),
 '.hd{left:580px;top:46px;font-size:128px;color:#fff}.plate{left:600px;top:330px;width:500px;height:250px;transform:rotate(-4deg)}.plate .pt{font-size:170px}.plate .ps{font-size:20px;margin-bottom:4px}.tk{width:200px}.tk .band{font-size:15px}.tk .amt{display:none}',
 {'hd': '<span class="red">$12,000</span><br>in fines', 'ps': 'licence plate', 'pt': 'NULL', 'tkband': 'PARKING FINE', 'tkamt': ''},
 {'photo': SE}, {'--ground': '#0C0C0C'}, rec=True)

add('05-edge-cases-plate-and-leap-day', 'photo', 'EDGE CASES', [7, 2, 3],
 "Her database-indexes method with her studio headshot: the topic name huge in DM Serif across the top of a warm paper ground, her cut-out (in colour, no outline) in the middle, and two objects only, the NULL plate (big) and the 29 February page (small). The titles carry the stories.",
 '<div class="hd z2" data-k="hd"></div><img class="cut z3" data-img="me" data-move="her" src="../../assets/cut/headshot-cut.png">'
 '<div class="plate z4" data-move="plate"><div class="pt" data-k="pt"></div></div><div class="cal z4" data-move="calendar"><div class="mth"><span data-k="mth"></span></div><div class="day" data-k="day"></div></div>',
 '.hd{left:0;right:0;top:10px;text-align:center;font-size:230px;letter-spacing:-.035em}.cut{left:50%;margin-left:-270px;height:540px}.plate{left:40px;top:380px;width:420px;height:220px;transform:rotate(-6deg)}.plate .pt{font-size:160px}.cal{left:1000px;top:400px;width:210px;font-size:22px;transform:rotate(6deg)}.cal .day{font-size:130px}',
 {'hd': 'Edge cases', 'pt': 'NULL', 'mth': 'February', 'day': '29'},
 {'me': '../../assets/cut/headshot-cut.png'}, {'--ground': '#EAE6DA'}, rec=True)

add('07-daylight-saving-bug', 'photo', 'DAYLIGHT SAVING BUG', [4, 5, 3],
 "Night-blue ground, her seated studio photo as a tight panel on the right (calm, closed mouth). Left: the clock 03:30 twice, the second in red with '×2' (when the clocks go back, a job set for 3:30 runs twice).",
 '<div class="hd z4" data-k="hd"></div><div class="clk z4" data-move="clock1"><span data-k="c1"></span></div><div class="clk r z4" data-move="clock2"><span data-k="c2"></span></div><div class="x2 z5" data-move="stamp" data-k="x2"></div>'
 '<div class="panel z2" data-move="photo" style="left:820px;width:460px"><img data-img="photo" src="' + SE + '" style="object-position:50% 18%;transform:scale(1.25);transform-origin:50% 25%"></div>',
 '.hd{left:60px;top:46px;font-size:112px;color:#fff}.clk{position:absolute;left:60px;top:320px;background:#fff;color:#0C0C0C;font-family:DMono;font-size:120px;padding:6px 28px 10px;letter-spacing:-.03em}.clk.r{top:500px;left:100px;background:#FF3B1F;color:#fff}.x2{position:absolute;left:470px;top:420px;color:#FF3B1F;font-family:DSerif;font-size:200px;line-height:1}',
 {'hd': 'Daylight saving<br><span class="red">bug</span>', 'c1': '03:30', 'c2': '03:30', 'x2': '×2'},
 {'photo': SE}, {'--ground': '#1E2A44'})

# keep the LAST definition per number; numbers in DROP are not built (their old folders go to the Bin)
DROP = {'04', '05', '06', '08', '09'}
seen = {}
for d in D: seen[d['name'][:2]] = d
D = [seen[k] for k in sorted(seen) if k not in DROP]
HTML = '''<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../../lib/field.css"><style>
{css}
</style></head><body><div class="t {cls}">
{body}
</div><script src="../../lib/bind.js"></script></body></html>
'''
only = [a for a in sys.argv[1:] if not a.startswith('--')]
force = '--force' in sys.argv
for d in D:
    if only and not any(d['name'].startswith(o) for o in only): continue
    p = os.path.join(DIRS, d['name'])
    if os.path.exists(os.path.join(p, 'content.json')) and not force: print('skip (exists)', d['name']); continue
    os.makedirs(p, exist_ok=True)
    open(os.path.join(p, 'index.html'), 'w').write(HTML.format(css=d['css'].replace('}', '}\n'), cls=d['cls'], body=d['body']))
    c = {'direction': d['direction'], 'thumbnail_text': d['words'], 'titles': d['titles'], 'title': d['titles'][0], 'kind': d['kind'],
         'text': d['text'], 'images': d['images'], 'vars': d['vars']}
    if d['rec']: c['recommended'] = True
    open(os.path.join(p, 'content.json'), 'w').write(json.dumps(c, indent=1, ensure_ascii=False) + '\n')
    print('wrote', d['name'])
json.dump(sorted(x for x in os.listdir(DIRS) if os.path.exists(os.path.join(DIRS, x, 'index.html'))), open(os.path.join(DIRS, 'index.json'), 'w'))
