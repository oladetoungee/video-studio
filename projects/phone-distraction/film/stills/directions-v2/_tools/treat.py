# halftone (B) and duotone (C) treatments, precomputed so the canvas engine only draws PNG/JPGs
import sys, numpy as np
from PIL import Image, ImageFilter, ImageDraw, ImageOps
def halftone(src, dst, cell=9, border=12, ink=(21,22,26), paper=(251,248,238), maxw=1100):
    im = Image.open(src).convert('RGBA'); im.thumbnail((maxw, maxw))
    a = np.array(im.split()[3]); g = ImageOps.autocontrast(im.convert('L'), cutoff=2)
    g = np.array(g).astype(float) / 255
    H, W = g.shape; out = Image.new('RGBA', (W + 2*border, H + 2*border), (0,0,0,0))
    # paper silhouette = alpha dilated by border (sticker edge)
    mask = Image.fromarray(a).point(lambda v: 255 if v > 110 else 0).filter(ImageFilter.MaxFilter(1))
    big = Image.new('L', out.size, 0); big.paste(mask, (border, border)); big = big.filter(ImageFilter.MaxFilter(2*border-1 if border%2 else 2*border+1))
    paperL = Image.new('RGBA', out.size, paper + (255,)); out.paste(paperL, (0,0), big)
    d = ImageDraw.Draw(out)
    for y in range(0, H, cell):
        for x in range(0, W, cell):
            blk = g[y:y+cell, x:x+cell]; al = a[y:y+cell, x:x+cell]
            if al.mean() < 100: continue
            r = (1 - blk.mean()) ** 0.9 * cell * 0.72
            if r < 0.6: continue
            cx, cy = x + border + cell/2, y + border + cell/2
            d.ellipse((cx-r, cy-r, cx+r, cy+r), fill=ink + (255,))
    out.save(dst)
def halftone_rect(src, dst, cell=9, maxw=1400):
    im = Image.open(src).convert('RGB'); im.thumbnail((maxw, maxw)); w, h = im.size
    tmp = im.convert('RGBA'); halftone_im = tmp
    Image.fromarray(np.dstack([np.array(im), np.full((h, w), 255, np.uint8)])).save('/tmp/_ht.png') if False else None
    rgba = im.convert('RGBA'); rgba.save(dst + '.tmp.png'); halftone(dst + '.tmp.png', dst, cell, 0, maxw=maxw)
    import os; os.remove(dst + '.tmp.png')
def duotone(src, dst, ink, light, maxw=2000, gamma=1.0, lift=0.0):
    im = Image.open(src).convert('L'); im.thumbnail((maxw, maxw))
    g = np.array(ImageOps.autocontrast(im, cutoff=1)).astype(float) / 255
    g = np.clip(lift + (1 - lift) * g ** gamma, 0, 1)[..., None]
    ink = np.array(ink, float); light = np.array(light, float)
    Image.fromarray((ink + (light - ink) * g).astype(np.uint8)).save(dst, quality=90)
if __name__ == '__main__':
    mode = sys.argv[1]
    if mode == 'ht': halftone(sys.argv[2], sys.argv[3], int(sys.argv[4]) if len(sys.argv) > 4 else 9)
    if mode == 'htr': halftone_rect(sys.argv[2], sys.argv[3], int(sys.argv[4]) if len(sys.argv) > 4 else 9)
    if mode == 'duo': duotone(sys.argv[2], sys.argv[3], tuple(int(sys.argv[4][i:i+2], 16) for i in (0, 2, 4)), tuple(int(sys.argv[5][i:i+2], 16) for i in (0, 2, 4)), gamma=float(sys.argv[6]) if len(sys.argv) > 6 else 1.0)
