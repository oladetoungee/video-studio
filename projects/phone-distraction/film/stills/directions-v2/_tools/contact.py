# contact sheet: python3 contact.py out.jpg cols tileW files...
import sys
from PIL import Image
out, cols, tw = sys.argv[1], int(sys.argv[2]), int(sys.argv[3]); fs = sys.argv[4:]
ims = [Image.open(f).convert('RGB') for f in fs]
th = max(int(tw * im.height / im.width) for im in ims)
rows = (len(ims) + cols - 1) // cols
s = Image.new('RGB', (cols * tw + (cols + 1) * 12, rows * th + (rows + 1) * 12), (24, 24, 24))
for i, im in enumerate(ims):
    w = tw; h = int(tw * im.height / im.width)
    s.paste(im.resize((w, h), Image.LANCZOS), (12 + (i % cols) * (tw + 12), 12 + (i // cols) * (th + 12)))
s.save(out, quality=88)
