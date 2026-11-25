# quick review sheet: review.py out.jpg L1 L2 L3 L4 P1 P2
import sys
from PIL import Image
o=sys.argv[1]; a=sys.argv[2:6]; p=sys.argv[6:8]
s=Image.new('RGB',(1920+640,1080),(40,40,40))
for i,f in enumerate(a): s.paste(Image.open(f).convert('RGB').resize((960,540)),((i%2)*960,(i//2)*540))
for i,f in enumerate(p): s.paste(Image.open(f).convert('RGB').resize((304,540)),(1930+i*314,0))
s.save(o)
