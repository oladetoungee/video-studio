# Put a cropped cut-out (studio/tools/cutout.swift output) back at its place on the full room photo:
#   python3 place_cut.py room.png cut.png out-fullframe.png   (also writes room.jpg next to room.png, quality 90)
import sys, numpy as np
from PIL import Image
room = Image.open(sys.argv[1]).convert('RGB'); cut = Image.open(sys.argv[2]).convert('RGBA')
R = np.asarray(room).astype(np.float32); C = np.asarray(cut).astype(np.float32)
a = C[..., 3] > 250
s = 8
Rs = R[::s, ::s]; Cs = C[::s, ::s, :3]; As = a[::s, ::s]
best = None
for y in range(0, Rs.shape[0] - Cs.shape[0] + 1):
    for x in range(0, Rs.shape[1] - Cs.shape[1] + 1):
        d = np.abs(Rs[y:y+Cs.shape[0], x:x+Cs.shape[1]] - Cs)[As].mean()
        if best is None or d < best[0]: best = (d, x * s, y * s)
_, bx, by = best
best = None
for y in range(max(0, by - s), min(R.shape[0] - C.shape[0], by + s) + 1):
    for x in range(max(0, bx - s), min(R.shape[1] - C.shape[1], bx + s) + 1):
        d = np.abs(R[y:y+C.shape[0]:2, x:x+C.shape[1]:2] - C[::2, ::2, :3])[a[::2, ::2]].mean()
        if best is None or d < best[0]: best = (d, x, y)
d, x, y = best
out = Image.new('RGBA', room.size, (0, 0, 0, 0)); out.paste(cut, (x, y), cut); out.save(sys.argv[3])
room.save(sys.argv[1].rsplit('.', 1)[0] + '.jpg', quality=90)
print(sys.argv[2], 'at', x, y, 'err %.2f' % d)
