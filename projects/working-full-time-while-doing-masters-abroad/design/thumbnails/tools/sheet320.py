#!/usr/bin/env python3
"""Layout census sheet: every thumbnail at 320 px wide (phone size) with its layout tag -> outputs/_review/thumbnails-320.jpg"""
import json, os
from PIL import Image, ImageDraw, ImageFont
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__))); PROJ = os.path.dirname(os.path.dirname(ROOT))
F = ImageFont.truetype('/System/Library/Fonts/Helvetica.ttc', 15)
dirs = sorted(d for d in os.listdir(os.path.join(ROOT, 'directions')) if os.path.isdir(os.path.join(ROOT, 'directions', d)))
cols = 4; W, H = 320, 180
sh = Image.new('RGB', (cols * (W + 16) + 16, ((len(dirs) + cols - 1) // cols) * (H + 44) + 16), '#111')
dr = ImageDraw.Draw(sh); n = 0
for k, d in enumerate(dirs):
    c = json.load(open(os.path.join(ROOT, 'directions', d, 'content.json')))
    x = 16 + (k % cols) * (W + 16); y = 16 + (k // cols) * (H + 44)
    sh.paste(Image.open(os.path.join(PROJ, 'outputs/thumbnails', d + '.png')).convert('RGB').resize((W, H), Image.LANCZOS), (x, y))
    lay = c.get('layout', ''); n += lay == 'words left / her right'
    dr.text((x, y + H + 6), f'{d[:30]}  [{lay}]', fill='#FFD23F' if lay == 'words left / her right' else '#ddd', font=F)
dr.text((16, sh.size[1] - 2), '', fill='#fff')
out = os.path.join(PROJ, 'outputs/_review/thumbnails-320.jpg'); sh.save(out, quality=85)
print(out, 'words left / her right =', n)
