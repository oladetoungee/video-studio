# Remove the chair that Vision keeps in her shoot cut-outs (outfit B): below y0 (a share of the height), scan each row from her
# centre line outwards; tee white and skin pass, the first dark chair pixel (or a gap) stops the scan; everything past it goes.
#   python3 dechair.py cut.png out.png [y0=0.5] [cx=auto]
import sys, numpy as np
from PIL import Image
im = Image.open(sys.argv[1]).convert('RGBA'); A = np.asarray(im).astype(np.int32).copy()
H, W = A.shape[:2]; y0 = int(H * float(sys.argv[3] if len(sys.argv) > 3 else 0.5))
al = A[..., 3]; rgb = A[..., :3]; lum = rgb.mean(-1); sat = rgb.max(-1) - rgb.min(-1)
cx = int(sys.argv[4]) if len(sys.argv) > 4 else int(np.average(np.arange(W), weights=(al[:H // 3] > 128).sum(0) + 1e-6))
dark = (lum < 75) & (sat < 45)
for side in (-1, 1):
    for y in range(y0, H):
        x = cx; run = 0
        while 0 <= x < W:
            if al[y, x] < 60 or dark[y, x]: break
            x += side
        # past the stop: clear
        if side < 0: A[y, :max(0, x + 1), 3] = 0
        else: A[y, x:, 3] = 0
Image.fromarray(A.astype(np.uint8)).save(sys.argv[2]); print(sys.argv[2], 'cx', cx, 'y0', y0)
