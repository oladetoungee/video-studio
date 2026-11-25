#!/usr/bin/env python3
"""More real imagery from her own footage for the v3 content pass (book-only crops, flipped so text reads).

  python3 tools/realframes.py   -> assets/spine_marple.png, spine_baratta.png, spine_convivial.png (the three spines of
                                   her stack, each squared up to a flat strip), assets/cover_marple.jpg (perspective warp),
                                   assets/book_baratta.jpg, book_convivial.jpg (sharper crops, copied from the carousel assets)

The camera recorded mirrored, so every frame is flipped back first. Every crop holds only a book (her fingers can show
at an edge; never her face).
"""
import os, shutil, subprocess
from PIL import Image, ImageFilter, ImageOps
import numpy as np

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(os.path.dirname(ROOT), 'kit', 'raw-video.mov')
CAROUSEL = os.path.join(os.path.dirname(ROOT), 'design', 'carousels', 'shared', 'assets')
OUT = os.path.join(ROOT, 'assets')

# her stack, held under her chin at 0:15.0 of the raw file: one quad per spine (TL, TR, BR, BL) in the flipped 4K frame
STACK_T = 15.0
SPINES = {
    'marple':    ([(842, 1272), (2100, 1272), (2100, 1338), (842, 1338)], (1260, 66)),
    'baratta':   ([(712, 1349), (2232, 1349), (2232, 1428), (712, 1428)], (1520, 79)),
    'convivial': ([(706, 1440), (2226, 1440), (2226, 1626), (706, 1626)], (1520, 186)),
}
# Miss Marple's Final Cases, held up at 0:58.5 of the raw file (part of a retake that was cut from the voice;
# it is still her copy of the book)
MARPLE_T = 58.5
MARPLE_Q = [(769, 961), (1329, 760), (1557, 1650), (871, 1854)]


def frame(t):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-ss', str(t), '-i', SRC, '-frames:v', '1', '-vf', 'hflip',
                          '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-'], capture_output=True, check=True).stdout
    return Image.frombytes('RGB', (3840, 2160), raw)


def coeffs(dst, src):
    A, b = [], []
    for (x, y), (u, v) in zip(dst, src):
        A.append([x, y, 1, 0, 0, 0, -u * x, -u * y]); b.append(u)
        A.append([0, 0, 0, x, y, 1, -v * x, -v * y]); b.append(v)
    return np.linalg.solve(np.array(A, float), np.array(b, float)).tolist()


def warp(im, quad, size):
    w, h = size
    return im.transform(size, Image.PERSPECTIVE, coeffs([(0, 0), (w, 0), (w, h), (0, h)], quad), Image.BICUBIC)


def finish(im):
    """the camera focus is soft: a little contrast and an unsharp mask (no colour change)"""
    return ImageOps.autocontrast(im.convert('RGB'), cutoff=0.5).filter(ImageFilter.UnsharpMask(radius=2.2, percent=90, threshold=2))


def main():
    os.makedirs(OUT, exist_ok=True)
    st = frame(STACK_T)
    for name, (quad, size) in SPINES.items():
        finish(warp(st, quad, size)).save(os.path.join(OUT, f'spine_{name}.png'), optimize=True)
    mp = frame(MARPLE_T)
    finish(warp(mp, MARPLE_Q, (600, 925))).save(os.path.join(OUT, 'cover_marple.jpg'), quality=90)
    for f in ['book_baratta.jpg', 'book_convivial.jpg']:
        finish(Image.open(os.path.join(CAROUSEL, f))).save(os.path.join(OUT, f), quality=92)
    print('ok')


if __name__ == '__main__':
    main()
