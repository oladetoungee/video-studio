"""v2 cut-outs (2026-10-16): her closed-mouth, microphone-free frames from the last second of the recording
(895.75 s, 895.9 s, she leans in to stop the camera). Makes colour + black-and-white versions, each plain and with
a solid outline (alpha dilated), cropped above the microphone. Never flipped.
  python3 tools/prep_cut.py"""
from PIL import Image, ImageFilter, ImageOps, ImageEnhance
import os
D = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), 'assets/cut')
H = 1150
for key in ['895.75', '895.9']:
    im = Image.open(f'{D}/cut_{key}.png').convert('RGBA')
    w, h = im.size
    im = im.crop((0, 0, w, int(h * 0.86)))           # drop the bottom (microphone)
    s = H / im.height
    im = im.resize((round(im.width * s), H), Image.LANCZOS)
    pad = 40
    cv = Image.new('RGBA', (im.width + 2 * pad, im.height + pad), (0, 0, 0, 0)); cv.paste(im, (pad, pad))
    a = cv.split()[3]
    rgb = cv.convert('RGB')
    col = ImageEnhance.Contrast(ImageEnhance.Brightness(rgb).enhance(1.06)).enhance(1.06)
    r, g, b = col.split(); r = r.point(lambda v: min(255, v * 1.02)); col = Image.merge('RGB', (r, g, b))
    bw = ImageEnhance.Contrast(ImageOps.grayscale(rgb).convert('RGB')).enhance(1.18)
    bw = ImageEnhance.Brightness(bw).enhance(1.08)
    # hard alpha edge, slightly eroded to drop fringe
    a2 = a.filter(ImageFilter.MinFilter(3)).point(lambda v: 255 if v > 110 else 0).filter(ImageFilter.GaussianBlur(0.8))
    ol = a2.filter(ImageFilter.MaxFilter(25)).filter(ImageFilter.MaxFilter(9)).point(lambda v: 255 if v > 60 else 0).filter(ImageFilter.GaussianBlur(0.8))
    for name, src in [('col', col), ('bw', bw)]:
        out = src.convert('RGBA'); out.putalpha(a2)
        out.save(f'{D}/{key}_{name}.png')
        for oname, oc in [('red', (255, 68, 51)), ('white', (255, 255, 255))]:
            base = Image.new('RGBA', cv.size, oc + (0,)); base.putalpha(ol)
            base.alpha_composite(out); base.save(f'{D}/{key}_{name}_{oname}.png')
    print(key, cv.size)
