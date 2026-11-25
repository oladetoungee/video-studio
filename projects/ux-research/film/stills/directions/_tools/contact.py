# contact sheet per direction: 16:9 frames in a 2x2 grid, 9:16 frames to the right, captions under each
import sys, glob, os
from PIL import Image, ImageDraw, ImageFont
d = sys.argv[1]; title = sys.argv[2]
f = ImageFont.truetype('/System/Library/Fonts/Menlo.ttc', 22); ft = ImageFont.truetype('/System/Library/Fonts/Menlo.ttc', 30)
L = sorted(p for p in glob.glob(f'{d}/frames/*_16x9.png'))[:4]; P = sorted(glob.glob(f'{d}/frames/*_9x16.png'))[:2]
lw, lh = 960, 540; pw, ph = 304, 540; g = 16; cap = 34
Wd = 2 * lw + 3 * g + 2 * (pw + g); Hd = 70 + 2 * (lh + cap + g)
sh = Image.new('RGB', (Wd, Hd), (30, 30, 30)); dr = ImageDraw.Draw(sh); dr.text((g, 18), title, fill=(255, 255, 255), font=ft)
for i, p in enumerate(L):
    x = g + (i % 2) * (lw + g); y = 70 + (i // 2) * (lh + cap + g)
    sh.paste(Image.open(p).convert('RGB').resize((lw, lh)), (x, y)); dr.text((x, y + lh + 6), os.path.basename(p)[:-4], fill=(220, 220, 220), font=f)
for i, p in enumerate(P):
    x = 2 * lw + 3 * g + i * (pw + g); y = 70
    im = Image.open(p).convert('RGB').resize((pw, int(pw * 16 / 9)))
    sh.paste(im, (x, y)); dr.text((x, y + im.height + 6), os.path.basename(p)[:-4][:20], fill=(220, 220, 220), font=f)
sh.save(f'{d}/contact.jpg', quality=88); print(d, sh.size)
