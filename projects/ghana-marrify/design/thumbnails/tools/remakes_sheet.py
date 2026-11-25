"""outputs/thumbnails/remakes_side_by_side.png: one row per remake, her viral sample | our remake (1280x720 each, half size)."""
import json, os, glob
from PIL import Image, ImageDraw, ImageFont
R = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
O = os.path.join(R, '../../outputs/thumbnails')
dirs = sorted(d for d in os.listdir(os.path.join(R, 'directions')) if d.startswith('R'))
W, H, G, L = 640, 360, 16, 34
sheet = Image.new('RGB', (W * 2 + G * 3, (H + L + G) * len(dirs) + G), (17, 17, 20))
f = ImageFont.truetype(os.path.join(R, 'fonts/DMMono-Medium.ttf'), 17)
d0 = ImageDraw.Draw(sheet)
for i, d in enumerate(dirs):
    c = json.load(open(os.path.join(R, 'directions', d, 'content.json')))
    y = G + i * (H + L + G)
    d0.text((G, y + 6), f"SAMPLE {c['sample']}  |  {d}  ·  {c['thumbnail_text']}", font=f, fill=(255, 71, 19))
    a = Image.open(os.path.join(R, f"assets/samples/s{c['sample']}.jpg")).convert('RGB').resize((W, H), Image.LANCZOS)
    b = Image.open(os.path.join(O, d + '.png')).convert('RGB').resize((W, H), Image.LANCZOS)
    sheet.paste(a, (G, y + L)); sheet.paste(b, (G * 2 + W, y + L))
sheet.save(os.path.join(O, 'remakes_side_by_side.png'), optimize=True)
print('ok', sheet.size)
