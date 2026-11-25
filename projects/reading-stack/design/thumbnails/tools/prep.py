#!/usr/bin/env python3
"""Prepare photo assets for the thumbnails from 4K frames of her video.

Her footage is mirrored and her face stays mirrored (she prefers it). Only the book's printed text is
un-mirrored: each text block on the cover is a small quad (following the cover's perspective) that is
warped flat, flipped, and warped back in place. The blocks sit on plain cover colour, so the flip is seamless
and her fingers are never touched.

Cut-outs use the macOS Vision person mask (tools/segment.swift), plus the book quad (Vision drops some books),
minus leaks into the sofa or cushion.

  python3 tools/prep.py           -> assets/cut/*.png (RGBA), assets/photo/*.jpg
"""
import os, json, numpy as np
from PIL import Image, ImageDraw, ImageFilter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
A = os.path.join(ROOT, 'assets')


def coeffs(dst, src):
    M, b = [], []
    for (x, y), (u, v) in zip(dst, src):
        M.append([x, y, 1, 0, 0, 0, -u * x, -u * y]); b.append(u)
        M.append([0, 0, 0, x, y, 1, -v * x, -v * y]); b.append(v)
    return np.linalg.solve(np.array(M, float), np.array(b, float)).tolist()


def flip_block(im, quad, feather=12):
    """Mirror the content of a perspective quad (TL,TR,BR,BL) in place."""
    xs = [p[0] for p in quad]; ys = [p[1] for p in quad]
    w = int(max(xs) - min(xs)); h = int(max(ys) - min(ys))
    flat = im.transform((w, h), Image.PERSPECTIVE, coeffs([(0, 0), (w, 0), (w, h), (0, h)], quad), Image.BICUBIC)
    # match the cover's lighting: the paper's light falloff must not flip with the text.
    # Fit a smooth plane (per channel) to the paper pixels of the original and of the flipped block,
    # then re-light the flipped block with the original's plane. Planes carry no text, so no ghosts.
    def plane(arr):
        H, W, _ = arr.shape
        yy, xx = np.mgrid[0:H, 0:W]
        g = arr[..., 1]
        sel = g > np.percentile(g, 45)          # paper is the bright majority; ink is darker
        X = np.stack([np.ones(sel.sum()), xx[sel] / W, yy[sel] / H, (xx[sel] / W) ** 2, (yy[sel] / H) ** 2], 1)
        full = np.stack([np.ones(H * W), xx.ravel() / W, yy.ravel() / H, (xx.ravel() / W) ** 2, (yy.ravel() / H) ** 2], 1)
        out = np.zeros_like(arr)
        for c in range(3):
            k, *_ = np.linalg.lstsq(X, arr[..., c][sel], rcond=None)
            out[..., c] = (full @ k).reshape(H, W)
        return np.maximum(out, 1.0)
    a0 = np.asarray(flat, np.float32)
    a1 = a0[:, ::-1]
    a1 = a1 * (plane(a0) / plane(a1))
    flat = Image.fromarray(np.clip(a1, 0, 255).astype(np.uint8))
    # warp back: output (frame) -> input (flat)
    back = flat.transform(im.size, Image.PERSPECTIVE, coeffs(quad, [(0, 0), (w, 0), (w, h), (0, h)]), Image.BICUBIC)
    m = Image.new('L', im.size, 0)
    ImageDraw.Draw(m).polygon([tuple(p) for p in quad], fill=255)
    m = m.filter(ImageFilter.MinFilter(2 * feather + 1)).filter(ImageFilter.GaussianBlur(feather))
    im.paste(back, (0, 0), m)
    return im


def build(spec):
    t = spec['t']
    im = Image.open(os.path.join(A, 'frames', f'f_{t}.jpg')).convert('RGB')
    for q in spec.get('flip', []):
        flip_block(im, q)
    out = {}
    if spec.get('photo'):
        x0, y0, x1, y1 = spec['photo']
        ph = im.crop((x0, y0, x1, y1))
        ph.thumbnail((2400, 2400), Image.LANCZOS)
        p = os.path.join(A, 'photo', f"{spec['name']}.jpg"); ph.save(p, quality=90); out['photo'] = p
    if spec.get('cut'):
        m = Image.open(os.path.join(A, 'masks', f'f_{t}.png')).convert('L')
        d = ImageDraw.Draw(m)
        for poly in spec.get('add', []): d.polygon([tuple(p) for p in poly], fill=255)
        for poly in spec.get('sub', []): d.polygon([tuple(p) for p in poly], fill=0)
        # tighten slightly to kill room-colour fringe, then soften
        m = m.point(lambda v: 255 if v > 110 else 0).filter(ImageFilter.MinFilter(5)).filter(ImageFilter.GaussianBlur(2.2))
        rgba = im.copy(); rgba.putalpha(m)
        x0, y0, x1, y1 = spec['cut']
        c = rgba.crop((x0, y0, x1, y1))
        c.thumbnail((2000, 2000), Image.LANCZOS)
        p = os.path.join(A, 'cut', f"{spec['name']}.png"); c.save(p, optimize=True); out['cut'] = p
    return out


def main():
    os.makedirs(os.path.join(A, 'cut'), exist_ok=True); os.makedirs(os.path.join(A, 'photo'), exist_ok=True)
    specs = json.load(open(os.path.join(ROOT, 'tools', 'frames.json')))
    for s in specs:
        print(s['name'], build(s))


if __name__ == '__main__':
    main()
