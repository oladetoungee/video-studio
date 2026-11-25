"""Round-2 grade (2026-10-13, taste critic: "dim, green cast, muddy skin"): colour balance and exposure only, never retouching.
  python3 tools/grade.py <in> <out>   (PNG alpha kept, so her person mask gets exactly the same grade as the frame)
Linear-light gains: about +0.4 EV, warmer (red up, blue down) and the green tint pulled toward magenta; a soft shoulder keeps
highlights from clipping; a gentle lift of the shadows."""
import sys
import numpy as np
from PIL import Image
GAIN = np.array([1.62, 1.16, 1.10])   # R, G, B in linear light
def grade(a):
    rgb = a[..., :3].astype(np.float32) / 255
    lin = np.where(rgb <= 0.04045, rgb / 12.92, ((rgb + 0.055) / 1.055) ** 2.4) * GAIN
    lin = lin / (1 + 0.32 * lin)          # soft shoulder (Reinhard-style) so the lamp and her skin highlights don't clip
    lin = lin * 1.32
    out = np.where(lin <= 0.0031308, lin * 12.92, 1.055 * np.clip(lin, 0, None) ** (1 / 2.4) - 0.055)
    out = np.clip(out, 0, 1) ** 0.94
    a = a.copy(); a[..., :3] = np.clip(out * 255 + .5, 0, 255).astype(np.uint8); return a
if __name__ == '__main__':
    im = Image.open(sys.argv[1]); mode = 'RGBA' if im.mode in ('RGBA', 'LA', 'P') else 'RGB'
    out = Image.fromarray(grade(np.array(im.convert(mode))), mode)
    out.save(sys.argv[2], quality=93) if sys.argv[2].endswith('.jpg') else out.save(sys.argv[2])
