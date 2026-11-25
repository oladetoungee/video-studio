#!/usr/bin/env python3
"""Cut a Pinterest (or any white-page grid) screenshot into its single pins, for the inspiration boards.

  python3 -I studio/tools/boardcrop.py <out_dir> <prefix> <screenshot.png> [more.png ...] [--dark]

How: recursive XY-cut on the page background (white, or near-black with --dark for YouTube dark mode): split the picture at
every run of >= GAP empty rows / columns, alternating directions, until nothing splits. Each leaf is one pin. Leaves that are
too small (captions under pins, star icons, buttons) or mostly background are dropped.
Writes <out_dir>/<prefix>-<n>-<k>.jpg and prints one JSON line per crop: {"file", "from", "box"}.
"""
import json, os, sys
import numpy as np
from PIL import Image

GAP = 6          # px of empty background between two pins (Retina screenshots have ~16)
MIN_W, MIN_H = 150, 120
MIN_FILL = 0.55  # share of the crop that is not background


def leaves(mask, x0, y0, x1, y1, axis, depth=0):
    sub = mask[y0:y1, x0:x1]
    if sub.size == 0 or not sub.any():
        return []
    # trim empty borders
    rows = np.where(sub.any(axis=1))[0]; cols = np.where(sub.any(axis=0))[0]
    y0, y1 = y0 + rows[0], y0 + rows[-1] + 1
    x0, x1 = x0 + cols[0], x0 + cols[-1] + 1
    sub = mask[y0:y1, x0:x1]
    for ax in (axis, 1 - axis):
        prof = sub.any(axis=0) if ax == 0 else sub.any(axis=1)   # ax 0: split columns, ax 1: split rows
        cuts, run, start = [], 0, 0
        segs = []
        for i, v in enumerate(prof):
            if not v:
                run += 1
            else:
                if run >= GAP and i - run > start:
                    segs.append((start, i - run)); start = i
                elif run >= GAP:
                    start = i
                run = 0
        segs.append((start, len(prof)))
        segs = [s for s in segs if s[1] > s[0]]
        if len(segs) > 1:
            out = []
            for a, b in segs:
                if ax == 0:
                    out += leaves(mask, x0 + a, y0, x0 + b, y1, 1 - ax, depth + 1)
                else:
                    out += leaves(mask, x0, y0 + a, x1, y0 + b, 1 - ax, depth + 1)
            return out
    return [(x0, y0, x1, y1)]


def main():
    args = [a for a in sys.argv[1:] if not a.startswith('--')]
    dark = '--dark' in sys.argv
    out_dir, prefix, files = args[0], args[1], args[2:]
    os.makedirs(out_dir, exist_ok=True)
    for n, f in enumerate(files, 1):
        im = Image.open(f).convert('RGB'); a = np.asarray(im).astype(np.int16)
        mask = (a.max(axis=2) > 40) if dark else (a.min(axis=2) < 245)
        k = 0
        for (x0, y0, x1, y1) in sorted(leaves(mask, 0, 0, a.shape[1], a.shape[0], 0), key=lambda b: (b[0] // 200, b[1])):
            w, h = x1 - x0, y1 - y0
            if w < MIN_W or h < MIN_H or mask[y0:y1, x0:x1].mean() < MIN_FILL:
                continue
            k += 1
            name = f'{prefix}-{n:02d}-{k:02d}.jpg'
            im.crop((x0, y0, x1, y1)).save(os.path.join(out_dir, name), quality=90)
            print(json.dumps({'file': name, 'from': os.path.basename(f), 'box': [int(x0), int(y0), int(x1), int(y1)]}))


if __name__ == '__main__':
    main()
