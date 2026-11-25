"""Set 3 round-2 grade (2026-10-16, critic: "same dim green-grey room in every photo option: brighten ~+0.5 EV, pull the green out").
  python3 tools/grade3.py [times...]   reads assets/scene/g/s_<t>.jpg (+ mask3/ or mask/ cut-out), writes
  assets/scene/g2/s_<t>.jpg (room) and assets/scene/g2/cut/s_<t>.png (her, same frame, same alignment).
Colour balance and exposure only, never retouching. The room: +0.5 EV, green/teal hues pulled toward a warm neutral grey
(hue-selective desaturation), shadows lifted a little. Her: +0.3 EV, a touch warmer, so she still matches the room."""
import os, sys, glob
import numpy as np
from PIL import Image
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
G = os.path.join(R, 'assets/scene/g'); O = os.path.join(R, 'assets/scene/g2'); os.makedirs(os.path.join(O, 'cut'), exist_ok=True)

def lin(x): return np.where(x <= 0.04045, x / 12.92, ((x + 0.055) / 1.055) ** 2.4)
def srgb(x): x = np.clip(x, 0, None); return np.where(x <= 0.0031308, x * 12.92, 1.055 * x ** (1 / 2.4) - 0.055)

def room(rgb):
    l = lin(rgb) * 2 ** 0.5
    l = l / (1 + 0.18 * l) * 1.18                         # soft shoulder so the lamp does not clip
    s = srgb(l)
    r, g, b = s[..., 0], s[..., 1], s[..., 2]
    mx, mn = s.max(-1), s.min(-1)
    # greenness: how much G (and teal G+B) leads red; 0..1
    green = np.clip((g - r) * 8.0 + 0.15, 0, 1) * np.clip((mx - mn) * 14, 0, 1)
    grey = (0.30 * r + 0.59 * g + 0.11 * b)[..., None]
    warm = np.concatenate([grey * 1.03, grey * 0.995, grey * 0.96], -1)
    k = (green * 0.76)[..., None]
    s = s * (1 - k) + warm * k
    s = s * np.array([1.03, 0.99, 0.95]) * 0.97 + 0.03          # warmer overall, gentle shadow lift
    return np.clip(s, 0, 1)

def me(rgb):
    l = lin(rgb) * 2 ** 0.3 * np.array([1.03, 1.0, 0.97])
    l = l / (1 + 0.12 * l) * 1.12
    return np.clip(srgb(l), 0, 1)

ts = sys.argv[1:] or [os.path.basename(f)[2:-4] for f in glob.glob(os.path.join(G, 's_*.jpg'))]
from PIL import ImageFilter
for t in ts:
    a = np.asarray(Image.open(os.path.join(G, f's_{t}.jpg')).convert('RGB')).astype(np.float32) / 255
    mp = os.path.join(G, 'mask3', f's_{t}.png')
    if not os.path.exists(mp): mp = os.path.join(G, 'mask', f's_{t}.png')
    # round 2b: her pixels get the SAME grade as the room (critic: a pale/green glow 6-12 px wide around the cut-out
    # came from grading her differently from the room under the soft mask edge). Same pixels, same grade: no seam at all.
    rm = room(a); mm = rm
    if os.path.exists(mp):
        am = Image.open(mp).convert('RGBA').split()[3]
        # the room copy carries her own grade inside a slightly grown, soft mask, so the cut-out on top never shows a halo
        c = (mm * 255 + .5).astype(np.uint8)
        Image.fromarray(np.dstack([c, np.asarray(am)]), 'RGBA').save(os.path.join(O, 'cut', f's_{t}.png'))
    Image.fromarray((rm * 255 + .5).astype(np.uint8)).save(os.path.join(O, f's_{t}.jpg'), quality=92)
    print('graded', t)
