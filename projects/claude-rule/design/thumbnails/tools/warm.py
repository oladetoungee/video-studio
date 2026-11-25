"""Lightly warm the green/teal tint of her video frames (colour balance only, no retouching; her OK 2026-10-06).
  python3 tools/warm.py <in.jpg|png> <out>   (PNG alpha is kept, so a person mask gets exactly the same grade)
One fixed grade for every frame: per-channel gains in linear light (red up, green and blue down a touch) + a gentle lift of the
shadows' red, so the room reads as warm lamp light instead of teal. Skin, shape and detail are untouched."""
import sys
import numpy as np
from PIL import Image
GAIN = np.array([1.13, 0.96, 0.86])   # R, G, B in linear light (round 4 r3: a little warmer, critics still read teal)
LIFT = 0.88                            # display-gamma lift of the shadows (<1 = lighter darks, highlights barely move)
def warm(a):
    rgb = a[..., :3].astype(np.float32) / 255
    lin = np.where(rgb <= 0.04045, rgb / 12.92, ((rgb + 0.055) / 1.055) ** 2.4)
    lin = np.clip(lin * GAIN, 0, 1)
    out = np.where(lin <= 0.0031308, lin * 12.92, 1.055 * lin ** (1 / 2.4) - 0.055)
    out = np.clip(out, 0, 1) ** LIFT
    a = a.copy(); a[..., :3] = np.clip(out * 255 + .5, 0, 255).astype(np.uint8); return a
if __name__ == '__main__':
    im = Image.open(sys.argv[1]); mode = 'RGBA' if im.mode in ('RGBA', 'LA', 'P') else 'RGB'
    a = np.array(im.convert(mode)); out = Image.fromarray(warm(a), mode)
    out.save(sys.argv[2], quality=95) if sys.argv[2].endswith('.jpg') else out.save(sys.argv[2])
