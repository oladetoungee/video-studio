import json,glob,os
from PIL import Image,ImageDraw,ImageFont
V='/Users/gbemi/Desktop/CODE/videos'; R=V+'/projects/9-things-i-do-instead-of-doomscrolling/outputs/_review'; os.chdir(R)
m=json.load(open(V+'/projects/9-things-i-do-instead-of-doomscrolling/talking-head/talking-head.json'))
F=json.load(open(V+'/inspiration/short-formats/formats.json')); it=F['items'] if isinstance(F,dict) else F
font=ImageFont.truetype('/System/Library/Fonts/Helvetica.ttc',26)
sh=[x for x in m['moments'] if x['kind']=='short']
tw,th=270,480
S=Image.new('RGB',(7*tw+40,len(sh)*(th+40)),'#1d1d1d'); d=ImageDraw.Draw(S)
for r,mo in enumerate(sh):
  fs=sorted(glob.glob('fmt/short%s-*.jpg'%mo['id'][2:]),key=lambda f: float(f.rsplit('_t',1)[1][:-4]))
  y=r*(th+40)+36
  for k,f in enumerate(fs[:4]): S.paste(Image.open(f).resize((tw,th)),(k*tw,y))
  for k,n in enumerate(mo['board']):
    fr=sorted(glob.glob(V+'/inspiration/short-formats/frames/%s-*.jpg'%it[n-1]['id']))
    if fr:
      im=Image.open(fr[min(1,len(fr)-1)]).convert('RGB'); im.thumbnail((tw,th)); S.paste(im,(40+(4+k)*tw,y))
  d.text((6,y-32),"%s  format %s  cover: %s (%s)  |  board refs Formats %s  |  fonts %s"%(mo['id'],mo['fmt'],mo['cover']['text'].replace('\n',' / '),mo['cover']['style']+(' big' if mo['cover'].get('big') else ''),mo['board'],'+'.join(mo['fonts'])),fill='#fff',font=font)
os.makedirs('fullkit',exist_ok=True); S.save('fullkit/shorts-vs-board.jpg',quality=80)
C=Image.new('RGB',(6*tw,2*(th+30)),'#1d1d1d'); dc=ImageDraw.Draw(C)
for i,mo in enumerate(sh):
  f=sorted(glob.glob('fmt/short%s-*_t000.05.jpg'%mo['id'][2:]))[0]
  C.paste(Image.open(f).resize((tw,th)),((i%6)*tw,(i//6)*(th+30)+30)); dc.text(((i%6)*tw+4,(i//6)*(th+30)+2),mo['id']+' '+mo['cover']['style'],fill='#fff',font=font)
C.save('fullkit/covers.jpg',quality=85); print('ok')
