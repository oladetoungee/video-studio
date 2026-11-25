# Clean a Vision cut-out: keep only the part connected to her body (drops leaked plants/chair bits), harden the soft halo.
#   python3 tools/cleancut.py assets/cut/gbemi-660.png [thr]
import sys
from PIL import Image, ImageDraw, ImageFilter
import numpy as np
f = sys.argv[1]; thr = int(sys.argv[2]) if len(sys.argv) > 2 else 150
im = Image.open(f).convert('RGBA'); a = np.array(im)[:, :, 3]
m = Image.fromarray(((a > thr) * 255).astype('uint8')).copy()
w, h = m.size
mm = np.array(m); ys, xs = np.nonzero(mm[int(h * .7):, :]); i = np.argmin(abs(xs - w // 2) + abs(ys - (h * .3 - 40)) * 0)
ImageDraw.floodfill(m, (int(xs[i]), int(ys[i] + h * .7)), 128)   # her body: the masked pixel nearest the bottom middle
keep = np.array(m) == 128
keep = np.array(Image.fromarray((keep * 255).astype('uint8')).filter(ImageFilter.MaxFilter(3)).filter(ImageFilter.GaussianBlur(1.2))) / 255.0
na = (np.clip(a / 255.0 * 1.6, 0, 1) * keep * 255).astype('uint8')
arr = np.array(im); arr[:, :, 3] = na
Image.fromarray(arr).save(f.replace('.png', '-clean.png')); print('ok', f)
