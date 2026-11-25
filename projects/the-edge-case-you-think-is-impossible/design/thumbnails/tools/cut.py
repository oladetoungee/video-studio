"""Cut-out from an aligned person layer: crop to the person (keeping the bottom frame edge).  python3 tools/cut.py 160 [436.5 ...]"""
import sys
from PIL import Image
for t in sys.argv[1:]:
    im = Image.open(f'assets/scene/gbemi-{t}-person.png'); a = im.getchannel('A').point(lambda v: 255 if v > 40 else 0)
    x0, y0, x1, y1 = a.getbbox(); im.crop((max(0, x0 - 10), max(0, y0 - 10), min(im.width, x1 + 10), im.height)).save(f'assets/cut/gbemi-{t}-cut.png')
    print(t, (x0, y0, x1, y1))
