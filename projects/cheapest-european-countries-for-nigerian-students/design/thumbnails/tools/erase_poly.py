# Erase a polygon from a cut-out (the chair Vision leaves in her outfit-B cut-outs). Points in the cut-out's pixels.
#   python3 erase_poly.py in.png out.png "x,y x,y ..."
import sys
from PIL import Image, ImageDraw, ImageFilter
im = Image.open(sys.argv[1]).convert('RGBA'); m = Image.new('L', im.size, 255)
pts = [tuple(map(float, p.split(','))) for p in sys.argv[3].split()]
ImageDraw.Draw(m).polygon(pts, fill=0); m = m.filter(ImageFilter.GaussianBlur(1.2))
a = im.getchannel('A'); from PIL import ImageChops; im.putalpha(ImageChops.multiply(a, m)); im.save(sys.argv[2]); print(sys.argv[2])
