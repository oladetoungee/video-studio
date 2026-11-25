# Builds the Receipt film's halftone prints from directions-v2/cut (and raw) into ../receipt/. Screen rects (halftone px) -> receipt/screens.json
import json, sys, os
from PIL import Image, ImageDraw
sys.path.insert(0, os.path.dirname(__file__) + '/../../stills/directions-v2/_tools')
from treat import halftone
os.chdir(os.path.dirname(os.path.abspath(__file__)))
OUT = '../receipt/'; T = 1100; B = 12; ONLY = sys.argv[1:]  # optional: build only these names
screens = json.load(open(OUT + 'screens.json')) if ONLY and os.path.exists(OUT + 'screens.json') else {}
def prep(src, crop=None, blank=None, name=None, cell=8, gamma=1.0):
    if ONLY and name not in ONLY: return
    im = Image.open(src).convert('RGBA')
    if gamma != 1.0:  # lift a dark photo before the screen (gamma < 1 brightens the mids)
        a_ = im.split()[3]; im = im.convert('RGB').point(lambda v: round(255 * (v / 255) ** gamma)).convert('RGBA'); im.putalpha(a_)
    if crop: im = im.crop(crop)
    if blank:
        d = ImageDraw.Draw(im); d.rectangle(blank, fill=(250, 250, 250, 255))
    s = T / max(im.size); im = im.resize((round(im.width * s), round(im.height * s)), Image.LANCZOS)
    tmp = '/tmp/_ht_' + name + '.png'; im.save(tmp); halftone(tmp, OUT + name + '.png', cell, B, maxw=T); os.remove(tmp)
    if blank:
        x0, y0, x1, y1 = blank; ox, oy = (crop[0], crop[1]) if crop else (0, 0)
        screens[name] = [round(B + (x0 - ox) * s), round(B + (y0 - oy) * s), round((x1 - x0) * s), round((y1 - y0) * s)]
    print(name, Image.open(OUT + name + '.png').size)
prep('cut/phonehand2.png', blank=(433, 118, 840, 838), name='ht_hand')
prep('cut/mylife.png', blank=(127, 78, 379, 528), name='ht_hand2')
prep('cut/lockscreen.png', name='ht_tilt')
prep('cut/phonehand3.png', name='ht_up')
prep('cut/phonedesk.png', crop=(0, 0, 318, 590), name='ht_desk')
prep('cut/simon.png', name='ht_simon')
prep('cut/fogg.png', name='ht_fogg')
prep('cut/millsslot.png', name='ht_slot')
prep('cut/chips-fade.png', name='ht_chips')
prep('cut/books1.png', name='ht_books')
prep('cut/tv1956.png', name='ht_tv')
prep('cut/tv.png', name='ht_tvlegs')
prep('cut/krieger.png', crop=(0, 0, 1331, 1120), name='ht_krieger')
prep('cut/harris.png', name='ht_harris')
prep('cut/coins.png', name='ht_coins')
# 2026-10-17 critic pass: more subjects so the hand-and-phone print stops repeating (rect photos get a paper edge too)
prep('cut/register.png', name='ht_register')
prep('cut/manphone.png', name='ht_manphone')
prep('cut/book.png', name='ht_book')
prep('cut/newspaper.png', name='ht_newspaper')
prep('cut/bandit.png', name='ht_bandit')
prep('cut/gadgets.png', name='ht_gadgets')
prep('raw/metro.jpg', name='ht_metro', cell=8, gamma=0.55)
prep('raw/womanphone.jpg', name='ht_woman', cell=9, gamma=0.45)
prep('raw/latenight.jpg', name='ht_late', cell=9, gamma=0.45)
prep('raw/slotfloor.jpg', name='ht_floor', cell=9, gamma=0.5)
prep('raw/reader.jpg', name='ht_reader', cell=9)
prep('raw/books4.jpg', name='ht_heap', cell=9, gamma=0.6)
prp_ = None
prep('cut/remote.png', name='ht_remote')
prep('raw/servers.jpg', name='ht_servers', cell=9, gamma=0.7)
prep('raw/gavel2.jpg', name='ht_gavel', cell=9)
prep('raw/berlaymont.jpg', crop=(150, 300, 2000, 1500), name='ht_eu', cell=8, gamma=1.8)
prep('raw/openbook.jpg', crop=(1050, 950, 3150, 1900), name='ht_openbook', cell=8, gamma=0.8)
json.dump(screens, open(OUT + 'screens.json', 'w'), indent=1); print(screens)
# ht_mountains (rect print): raw/mountains.jpg cropped to the ridges (y 38-85 %), contrast 1.5, treat.py htr cell 9
