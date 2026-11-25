import sys, os, glob
from PIL import Image, ImageDraw
out = os.path.join(os.path.dirname(__file__), '..', 'review')
fs = sorted(glob.glob(os.path.join(os.path.dirname(__file__), '../../../outputs/thumbnails/[0-9]*.png')))
sel = sys.argv[1:] 
if sel: fs = [f for f in fs if any(os.path.basename(f).startswith(s) for s in sel)]
W, H, cols = 640, 360, 3
rows = (len(fs) + cols - 1) // cols
sh = Image.new('RGB', (cols * W, rows * (H + 24)), 'black'); d = ImageDraw.Draw(sh)
for i, f in enumerate(fs):
    im = Image.open(f).convert('RGB').resize((W, H)); x, y = (i % cols) * W, (i // cols) * (H + 24)
    sh.paste(im, (x, y)); d.text((x + 6, y + H + 4), os.path.basename(f), fill='yellow')
sh.save(os.path.join(out, 'sheet.jpg'), quality=82)
