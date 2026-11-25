import sys,glob,os
from PIL import Image,ImageDraw
out=sys.argv[1]; pre=sys.argv[2:]
fs=[f for f in sorted(glob.glob('../../outputs/thumbnails/*.png')) if 'overview' not in f and (not pre or any(os.path.basename(f).startswith(p) for p in pre))]
W,H=640,360; cols=2; rows=(len(fs)+1)//2
sh=Image.new('RGB',(cols*(W+10),rows*(H+10)),'white')
for i,f in enumerate(fs):
  im=Image.open(f).convert('RGB').resize((W,H),Image.LANCZOS); sh.paste(im,((i%cols)*(W+10),(i//cols)*(H+10)))
sh.save(out)
