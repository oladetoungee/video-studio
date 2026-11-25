#!/usr/bin/env python3
"""Book-cover inserts cut from her own footage (the camera recorded mirrored, so every frame is flipped
back first). Each cover is a perspective warp of the cover's four corners onto a flat rectangle, so
nothing outside the book (her face, the room) can end up in the crop.

  python3 tools/covers.py        -> assets/cover_baratta.jpg, assets/cover_convivial.jpg (+ _ht halftone variants)
"""
import os, subprocess, numpy as np
from PIL import Image, ImageEnhance, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(os.path.dirname(ROOT), 'kit', 'raw-video.mov')   # her raw recording (projects/reading-stack/kit/)

# (source time in the raw file, quad TL,TR,BR,BL in the FLIPPED 3840x2160 frame, output size, keep fraction of height)
COVERS = {
    # How to Read and Write Critically, held upright at 5:12 of the raw file
    'baratta': (312.2, [(1782, 826), (2698, 822), (2665, 1965), (1700, 1965)], (860, 1040)),
    # Convivial Toolbox, held at 11:57 of the raw file (tilted ~18 deg; the warp squares it up)
    'convivial': (705.667, [(2690, 899), (3570, 1184), (3004 - 0.07 * (3004 - 3570), 2196 - 0.07 * (2196 - 1184)),
                            (2124 - 0.07 * (2124 - 2690), 1910 - 0.07 * (1910 - 899))], (800, 930)),
}


def frame(t):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-ss', str(t), '-i', SRC, '-frames:v', '1', '-vf', 'hflip',
                          '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-'], capture_output=True, check=True).stdout
    return Image.frombytes('RGB', (3840, 2160), raw)


def coeffs(dst, src):
    # PIL PERSPECTIVE maps output (x,y) -> input; solve the 8 unknowns from 4 pairs
    A, b = [], []
    for (x, y), (u, v) in zip(dst, src):
        A.append([x, y, 1, 0, 0, 0, -u * x, -u * y]); b.append(u)
        A.append([0, 0, 0, x, y, 1, -v * x, -v * y]); b.append(v)
    return np.linalg.solve(np.array(A, float), np.array(b, float)).tolist()


def halftone(im, cell=7, ink=(17, 17, 20), paper=(255, 253, 246)):
    """Clean round-dot halftone (ink on card), like the dithered prints in the reference."""
    g = np.asarray(ImageEnhance.Contrast(im.convert('L')).enhance(1.35), np.float32) / 255.0
    H, W = g.shape
    S = 4  # supersample for smooth dots
    out = Image.new('L', (W * S, H * S), 255)
    from PIL import ImageDraw
    d = ImageDraw.Draw(out)
    for cy in range(0, H, cell):
        for cx in range(0, W, cell):
            v = g[cy:cy + cell, cx:cx + cell].mean()
            r = (1 - v) ** 0.9 * cell * 0.72
            if r < 0.35: continue
            X, Y = (cx + cell / 2) * S, (cy + cell / 2) * S
            d.ellipse([X - r * S, Y - r * S, X + r * S, Y + r * S], fill=0)
    out = out.resize((W, H), Image.LANCZOS)
    a = np.asarray(out, np.float32)[..., None] / 255.0
    rgb = a * np.array(paper, np.float32) + (1 - a) * np.array(ink, np.float32)
    return Image.fromarray(rgb.astype(np.uint8))


def main():
    os.makedirs(os.path.join(ROOT, 'assets'), exist_ok=True)
    for name, (t, quad, (w, h)) in COVERS.items():
        im = frame(t)
        c = coeffs([(0, 0), (w, 0), (w, h), (0, h)], quad)
        flat = im.transform((w, h), Image.PERSPECTIVE, c, Image.BICUBIC)
        flat = ImageEnhance.Contrast(flat).enhance(1.08)
        flat = ImageEnhance.Color(flat).enhance(0.92)
        flat = flat.filter(ImageFilter.UnsharpMask(radius=2, percent=60, threshold=2))
        flat.save(os.path.join(ROOT, 'assets', f'cover_{name}.jpg'), quality=92)
        halftone(flat).save(os.path.join(ROOT, 'assets', f'cover_{name}_ht.png'))
        print(name, flat.size)


if __name__ == '__main__':
    main()
