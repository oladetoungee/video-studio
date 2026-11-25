# Bakes a hard solid outline into a cut-out of her (no glow): keeps only the largest shape, warms the cool footage a little.
#   python3 tools/outline.py assets/cut/gbemi-22.0.png assets/cut/gbemi-22.0-butter.png F7D44C [bw]
import sys, numpy as np
from scipy import ndimage
from PIL import Image
src, dst, hexc = sys.argv[1:4]; bw = 'bw' in sys.argv[4:]; px = 9
im = np.array(Image.open(src).convert('RGBA')).astype(float)
a = im[:, :, 3] > 140
a = ndimage.binary_opening(a, iterations=3)
lab, n = ndimage.label(a)
if n > 1: a = lab == (1 + int(np.argmax(ndimage.sum(a, lab, range(1, n + 1)))))
rgb = im[:, :, :3]
if bw:
    g = rgb @ [0.299, 0.587, 0.114]; g = np.clip((g - 128) * 1.15 + 128, 0, 255) * 1.45; rgb = np.stack([g] * 3, -1)
else:
    rgb = rgb * 1.3 * np.array([1.06, 1.0, 0.9])
rgb = np.clip(rgb, 0, 255)
H, W = a.shape; P = px + 2
A = np.zeros((H + P, W + 2 * P), bool); A[P:, P:P + W] = a
D = ndimage.binary_dilation(A, iterations=px)
out = np.zeros((H + P, W + 2 * P, 4), np.uint8)
c = [int(hexc[i:i + 2], 16) for i in (0, 2, 4)]
out[D] = c + [255]
body = np.zeros_like(out); body[P:, P:P + W, :3] = rgb; body[P:, P:P + W, 3] = a * 255
out[A] = body[A]
Image.fromarray(out).save(dst)
print('ok', dst, n)
