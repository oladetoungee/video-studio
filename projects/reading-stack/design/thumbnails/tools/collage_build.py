"""Writes the 8 collage-over-the-creator directions (C1..C8) from the strategist's concepts (kit/refined-kit.md section 4).
  python3 tools/collage_build.py            -> directions/C*/index.html + content.json (content.json only when missing,
                                                unless --force: her studio edits live in content.json)
Layout numbers are on the 1280x720 frame. Shared look: lib/collage.css. Round 2 (after the critics): her photo bigger and
higher, one line in a high-contrast serif at ~60 % width, 1 label, 3-4 smaller objects with one shadow recipe."""
import json, os, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FORCE = '--force' in sys.argv
A = '../../assets/collage/'
PH = '../../assets/photo/'
IMG = {
    'p16': PH + 'gbemi16_warm.jpg',
    'pshot': PH + 'gbemishot_warm.jpg',
    'baratta': A + 'cover_baratta_clean.jpg',
    'convivial': A + 'cover_convivial_clean.jpg',
    'contents': A + 'baratta_contents_page.png',
    'stack': A + 'book_stack_old.png',
    'notebook': A + 'notebook_notes.png',
    'coffee': A + 'coffee_top.png',
    'peonies': A + 'peonies.png',
}
# her photo placements (cover 1280x720, never flipped)
PHOTO = {
    'p16': dict(px=-160, py=-162, pw=1593),    # 1180x653 source, x1.35: eyes at ~42 % height; the bottle at the right edge falls out of frame
    'pshot': dict(px=-144, py=-79, pw=1424),   # 1424x799 source, x1.0
}
TITLES = {
    'S1': 'How to Remember What You Read (the Contents Page Trick)',
    'S2': 'How to Read Non-Fiction Books Without Forgetting Them',
    'S3': 'How to Remember the Non-Fiction Books You Read',
    'S4': 'How to Retain What You Read: Start With the Contents Page',
    'S6': 'How to Read Non-Fiction and Actually Remember It',
    'S7': 'How to Study a Book Before You Read It (and Remember More)',
    'S8': 'How I Read Non-Fiction Books So I Remember Them',
    'S9': 'How to Remember What You Read: A Method From 1940',
    'C1': 'Why You Forget the Books You Read (and the Fix I Use)',
    'C3': "I Memorise a Book's Chapters Before I Read It. Here's Why",
    'C5': 'A 1940 Reading Method That Helps You Remember Books',
    'C7': "Can't Explain the Last Book You Read? Here's the Fix",
}
CIRCLE = ('<svg viewBox="0 0 854 756" preserveAspectRatio="none"><path class="ink" d="M 34 372 C 120 340, 380 336, 446 372 '
          'C 492 398, 470 470, 330 482 C 200 492, 40 482, 20 430 C 8 398, 60 362, 150 352"/></svg>')

def book(name, key, x, y, w, r=0, ry=-12):
    return (f'<div class="book" data-move="{name}" style="left:{x}px;top:{y}px;width:{w}px;--r:{r}deg;--ry:{ry}deg">'
            f'<div class="bk"><img data-img="{key}" alt=""></div></div>')

def obj(name, key, x, y, w, r=0):
    return f'<div class="obj" data-move="{name}" style="left:{x}px;top:{y}px;width:{w}px;--r:{r}deg"><img data-img="{key}" alt=""></div>'

def page(x, y, w, r=0, name='contents-page'):
    return (f'<div class="page" data-move="{name}" style="left:{x}px;top:{y}px;width:{w}px;--r:{r}deg">'
            f'<img data-img="contents" alt="">{CIRCLE}</div>')

def sq(name, key, x, y, cw, ch, iw, ix, iy, white=False):
    return (f'<div class="sq{" w" if white else ""}" data-move="{name}" style="left:{x}px;top:{y}px;--cw:{cw}px;--ch:{ch}px">'
            f'<img data-img="{key}" alt="" style="width:{iw}px;left:{ix}px;top:{iy}px"></div>')

def lab(k, x, y, extra=''):
    return f'<div class="lab" data-k="{k}" style="left:{x}px;top:{y}px{extra}"></div>'

def big(k, x, y, size, centre=True, extra=''):
    return f'<div class="big{" c" if centre else ""}" data-k="{k}" data-move="{k}" style="left:{x}px;top:{y}px;font-size:{size}px{extra}"></div>'

def kick(k, x, y, size, centre=True, extra=''):
    return f'<div class="kick{" c" if centre else ""}" data-k="{k}" data-move="{k}" style="left:{x}px;top:{y}px;font-size:{size}px{extra}"></div>'

def photo(p):
    g = PHOTO[p]
    return f'<img class="photo" data-img="photo" data-move="photo" alt="" style="--px:{g["px"]}px;--py:{g["py"]}px;--pw:{g["pw"]}px">'

C = []
C.append(dict(
    dir='C1-stop-forgetting-books', concept='T1', photo='pshot',
    sample='time-to-lock-in (one serif line across her chest, books top-left, objects top-right, small corner labels) + KYNID "STOP FORGETTING" outlier',
    direction='Her photo pointing at her head (her own pick from an earlier thumbnail, warm colour balance): "stop forgetting" shown literally. Old books top-left, Convivial Toolbox top-right, a notebook of handwritten notes on the right. Serif line "Stop forgetting books."; labels "non-fiction", "takes a few minutes". (Photo 18 from the kit was dropped: at feed size the mic at her lips read as a knife in her mouth.)',
    text={'big': 'Stop forgetting books.', 'l1': 'non-fiction'},
    titles=['S9', 'C5', 'S1'],
    imgs=['photo', 'stack', 'convivial', 'notebook'],
    body=lambda: [
        obj('book-stack', 'stack', 50, 60, 220, -4),
        book('convivial', 'convivial', 1046, 56, 150, 6),
        obj('notebook', 'notebook', 1056, 300, 190, -7),
        lab('l1', 76, 236),
        big('big', 660, 464, 80),
    ]))
C.append(dict(
    dir='C2-read-the-contents-page-first', concept='T2', photo='p16',
    sample='capsule-wardrobe (small serif kicker above the big serif line, the thing itself as a cut-out top-left) + viral sample 3 (the method shown)',
    direction='Her photo 16 (chin on hand), lit a little warmer. The real open contents page of Baratta\'s book (frame 5:40.97 of her video, un-mirrored, flattened), chapter 1 circled in red pen; the Baratta cover top-right, a coffee. Kicker "read the" + serif line "contents page first." (round 1-2 "Read this page first." failed cold: "this page" could not be read off the small page).',
    text={'kick': 'read the', 'big': 'contents page first.', 'l1': 'start here'},
    titles=['C1', 'C7', 'S3'],
    imgs=['photo', 'contents', 'baratta', 'coffee'],
    body=lambda: [
        page(50, 56, 290, -5),
        book('baratta', 'baratta', 1100, 46, 130, 7),
        obj('coffee', 'coffee', 1104, 300, 120, 8),
        lab('l1', 70, 340),
        kick('kick', 548, 432, 32, False, ';font-style:normal'),
        big('big', 660, 464, 80),
    ]))
C.append(dict(
    dir='C3-forgot-what-you-read', concept='T3', photo='p16',
    sample='viral sample 4 (the problem as a question) in the time-to-lock-in collage look',
    direction='Her photo 16 (thoughtful, chin on hand). One serif line "Forgot what you read?" (the strategist\'s "Forgot the last book you read?" needed two lines; the taste critic rejected that), old books top-left, Baratta top-right, a coffee; labels "non-fiction", "a method from 1940".',
    text={'big': 'Forgot what you read?', 'l1': 'non-fiction'},
    titles=['S6', 'S2', 'S8'],
    imgs=['photo', 'stack', 'baratta', 'coffee'],
    body=lambda: [
        obj('book-stack', 'stack', 50, 60, 220, -4),
        book('baratta', 'baratta', 1100, 46, 130, 7),
        obj('coffee', 'coffee', 1104, 300, 120, 8),
        lab('l1', 76, 236),
        big('big', 660, 464, 82),
    ]))
C.append(dict(
    dir='C4-read-like-a-researcher', concept='T4', photo='p16',
    sample='in-defense-of-being-online (photo crops of different sizes around her, offset, two with a white edge) + her channel line TECH | CAREER | RESEARCH',
    direction='Her photo 16 with flat photo crops of different sizes around her like in-defense-of-being-online: the Baratta cover, a notebook of handwritten notes, Convivial Toolbox, the real contents page. Serif line "Read like a researcher"; labels "remember more", "uni and thesis reading".',
    text={'big': 'Read like a researcher', 'l1': 'remember more'},
    titles=['S7', 'C5', 'S6'],
    imgs=['photo', 'baratta', 'notebook', 'convivial', 'contents'],
    body=lambda: [
        sq('sq-baratta', 'baratta', 48, 52, 170, 200, 186, -8, -10, True),
        sq('sq-notebook', 'notebook', 236, 252, 230, 140, 300, -36, -64),
        sq('sq-convivial', 'convivial', 1104, 70, 140, 170, 158, -9, -10),
        sq('sq-contents', 'contents', 1060, 274, 190, 150, 330, -10, -110, True),
        lab('l1', 48, 640),
        big('big', 660, 464, 80),
    ]))
C.append(dict(
    dir='C5-memorise-this-first', concept='T5', photo='p16',
    sample='thought-of-these (the thing itself, large) + viral sample 3',
    direction='Her photo 16; the real contents page top-left with chapter 1 circled, a short hand-drawn white pen stroke from "this" to the page (kept left of her). Serif line "Memorise this first." set from the left; label "non-fiction". Only with a title that explains "this" (S2, S4).',
    text={'big': 'Memorise <em>this</em> first.', 'l1': 'non-fiction'},
    titles=['S2', 'S4'],
    imgs=['photo', 'contents', 'coffee', 'baratta'],
    body=lambda: [
        page(40, 40, 300, -4),
        obj('coffee', 'coffee', 1104, 120, 120, 8),
        book('baratta', 'baratta', 1100, 290, 120, -6),
        lab('l1', 1100, 46),
        '<svg class="pen" data-move="pen-line" viewBox="0 0 1280 720"><path d="M 446 470 C 446 424, 420 386, 360 352 M 360 352 l 5 22 M 360 352 l 22 2"/></svg>',
        big('big', 60, 464, 84, False),
    ]))
C.append(dict(
    dir='C6-how-to-study-a-book', concept='T6', photo='p16',
    sample='viral sample 5 ("how to be consistent": studying among books) in the time-to-lock-in look',
    direction='Her photo 16; Baratta top-left, Convivial Toolbox top-right, an open notebook of handwritten notes on the right. Serif line "How to study a book"; labels "uni and thesis reading", "remember more". For a student-focused test; paired with S4 so the title does not repeat the thumbnail.',
    text={'big': 'How to study a book', 'l1': 'uni and thesis reading'},
    titles=['S4', 'S6'],
    imgs=['photo', 'baratta', 'convivial', 'notebook'],
    body=lambda: [
        book('baratta', 'baratta', 70, 60, 136, -6),
        book('convivial', 'convivial', 1100, 46, 136, 6),
        obj('notebook', 'notebook', 1066, 300, 186, -6),
        lab('l1', 62, 262),
        big('big', 660, 464, 86),
    ]))
C.append(dict(
    dir='C7-remember-what-you-read', concept='T7', photo='p16',
    sample='time-to-lock-in (books top-left, objects top-right, line across her, small corner labels) + viral sample 5',
    direction='Her photo 16 (thinking, chin on hand). Baratta tilted top-left, Convivial top-right, a coffee. Serif line "Remember what you read."; labels "non-fiction", "takes a few minutes". (Peonies tried in round 1-2: dropped, they read as random decoration.)',
    text={'big': 'Remember what you read.', 'l1': 'non-fiction'},
    titles=['C3', 'S7'],
    imgs=['photo', 'baratta', 'convivial', 'coffee'],
    body=lambda: [
        book('baratta', 'baratta', 70, 60, 136, -8),
        obj('coffee', 'coffee', 300, 210, 110, -6),
        book('convivial', 'convivial', 1100, 46, 136, 6),
        lab('l1', 1104, 250),
        big('big', 660, 464, 76),
    ]))
C.append(dict(
    dir='C8-why-you-forget-books', concept='T8', photo='p16',
    sample='Closed Stacks outliers (book + coffee + a few words, top-down desk) + viral sample 2; flat option',
    direction='Flat option on warm paper #EDE9E2: the real contents page (chapter 1 circled), the Baratta cover and a coffee; her photo 16 as a large polaroid on the right. Near-black serif line "Why you forget books" with "and the fix" in italic under it.',
    text={'big': 'Why you forget books', 'kick': 'and the fix'},
    titles=['S3', 'S2'],
    imgs=['photo', 'contents', 'baratta', 'coffee'],
    flat=True,
    body=lambda: [
        page(56, 40, 290, -5),
        book('baratta', 'baratta', 372, 140, 165, 7),
        obj('coffee', 'coffee', 530, 300, 120, -8),
        '<div class="pin" data-move="polaroid" style="left:690px;top:24px;--cw:500px;--ch:430px;--r:3deg">'
        '<div class="crop"><img data-img="photo" alt="" style="width:1500px;left:-562px;top:-220px"></div></div>',
        big('big', 60, 522, 96, False, ';color:var(--fg);text-shadow:none'),
        kick('kick', 66, 626, 56, False, ';color:var(--fg);text-shadow:none'),
    ]))

TPL = '''<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../../lib/collage.css"><style>
/* {concept}: {sample} */
{extra}
</style></head><body><div class="t">
{body}
</div><script src="../../lib/bind.js"></script></body></html>
'''
for c in C:
    d = os.path.join(ROOT, 'directions', c['dir']); os.makedirs(d, exist_ok=True)
    body = ([] if c.get('flat') else [photo(c['photo'])]) + c['body']()
    extra = '.t{--ground:#EDE9E2;--fg:#111114}' if c.get('flat') else ''
    open(os.path.join(d, 'index.html'), 'w').write(TPL.format(concept=c['concept'], sample=c['sample'], extra=extra, body='\n'.join(body)))
    cj = os.path.join(d, 'content.json')
    if FORCE or not os.path.exists(cj):
        imgs = {k: IMG[c['photo'] if k == 'photo' else k] for k in c['imgs']}
        out = {'direction': c['direction'], 'concept': c['concept'], 'sample': c['sample'],
               'thumbnail_text': ' '.join(v for k, v in c['text'].items() if k in ('big', 'kick')).replace('<em>', '').replace('</em>', ''),
               'title': TITLES[c['titles'][0]], 'titles': [TITLES[t] for t in c['titles']],
               'text': c['text'], 'images': imgs, 'vars': {}}
        json.dump(out, open(cj, 'w'), indent=2, ensure_ascii=False)
    print(c['dir'])
