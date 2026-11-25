import json, glob, os, sys
from PIL import Image, ImageDraw, ImageFont
P='/Users/gbemi/Desktop/CODE/videos/projects/ghana-marrify'
OUT=sys.argv[1] if len(sys.argv)>1 else '.'
F=lambda s,b=False: ImageFont.truetype('/System/Library/Fonts/Supplemental/Arial Bold.ttf' if b else '/System/Library/Fonts/Supplemental/Arial.ttf', s)
dirs=sorted(d for d in os.listdir(P+'/design/thumbnails/directions') if os.path.isdir(P+'/design/thumbnails/directions/'+d))
def badge(im):
    d=ImageDraw.Draw(im); w,h=im.size; s=max(9,int(h*.12)); f=F(s,True); tw=d.textlength('5:12',font=f); p=max(2,s//4)
    d.rounded_rectangle([w-tw-p*4,h-s-p*3,w-p*2,h-p*2],radius=p,fill=(0,0,0)); d.text((w-tw-p*3,h-s-p*2.6),'5:12',font=f,fill='white'); return im
def wrap(d,t,f,w):
    out=[];line=''
    for word in t.split():
        if d.textlength(line+' '+word,font=f)>w and line: out.append(line); line=word
        else: line=(line+' '+word).strip()
    out.append(line); return out[:2]
# feed sheet 320x180 with title
cols=4; CW,CH=340,250
for part in range(0,len(dirs),12):
    sub=dirs[part:part+12]; rows=(len(sub)+cols-1)//cols
    s=Image.new('RGB',(cols*CW+20,rows*CH+20),(15,15,15)); d=ImageDraw.Draw(s)
    for i,n in enumerate(sub):
        c=json.load(open(f'{P}/design/thumbnails/directions/{n}/content.json'))
        im=badge(Image.open(f'{P}/outputs/thumbnails/{n}.png').convert('RGB').resize((320,180),Image.LANCZOS))
        x=10+(i%cols)*CW; y=10+(i//cols)*CH; s.paste(im,(x,y))
        for j,l in enumerate(wrap(d,c['title'],F(14,True),318)): d.text((x,y+188+j*18),l,font=F(14,True),fill='white')
        d.text((x,y+226),n[:2]+' · @WithGbemi',font=F(12),fill=(170,170,170))
    s.save(f'{OUT}/feed_{part//12}.jpg',quality=88)
# sidebar 168x94
cols=5; s=Image.new('RGB',(cols*360+10,((len(dirs)+cols-1)//cols)*110+10),(15,15,15)); d=ImageDraw.Draw(s)
for i,n in enumerate(dirs):
    c=json.load(open(f'{P}/design/thumbnails/directions/{n}/content.json'))
    im=badge(Image.open(f'{P}/outputs/thumbnails/{n}.png').convert('RGB').resize((168,94),Image.LANCZOS))
    x=10+(i%cols)*360; y=10+(i//cols)*110; s.paste(im,(x,y))
    for j,l in enumerate(wrap(d,c['title'],F(12,True),178)): d.text((x+176,y+4+j*15),l,font=F(12,True),fill='white')
    d.text((x+176,y+40),n[:2],font=F(11),fill=(170,170,170))
s.save(f'{OUT}/sidebar.jpg',quality=90)
# mixed with her references (her saved YouTube screenshots, scaled to the same 320 px thumbnail width)
refs=['Screenshot 2025-01-16 at 20.25.09.jpg','Screenshot 2025-02-14 at 15.17.01.jpg','Screenshot 2025-01-08 at 21.53.40.jpg','Screenshot 2025-07-19 at 10.53.46.jpg','Screenshot 2025-01-15 at 23.04.17.jpg','Screenshot 2026-05-07 at 08.54.04.png']
R='/Users/gbemi/Desktop/CODE/videos/inspiration/youtube-thumbnail/'
items=[('ref',r) for r in refs]+[('our',n) for n in dirs]
order=[]; ri=0; oi=0
ours=[x for x in items if x[0]=='our']; rr=[x for x in items if x[0]=='ref']
while ours or rr:
    for _ in range(3):
        if ours: order.append(ours.pop(0))
    if rr: order.append(rr.pop(0))
cols=5; CW=340; s=Image.new('RGB',(cols*CW+20,((len(order)+cols-1)//cols)*230+20),(15,15,15)); d=ImageDraw.Draw(s)
for i,(k,n) in enumerate(order):
    x=10+(i%cols)*CW; y=10+(i//cols)*230
    if k=='ref':
        im=Image.open(R+n).convert('RGB'); im.thumbnail((320,215)); s.paste(im,(x,y)); d.text((x,y+216),'HER REFERENCE',font=F(11,True),fill=(255,200,0))
    else:
        im=badge(Image.open(f'{P}/outputs/thumbnails/{n}.png').convert('RGB').resize((320,180),Image.LANCZOS)); s.paste(im,(x,y)); d.text((x,y+186),n,font=F(12,True),fill='white')
s.save(f'{OUT}/mixed_refs.jpg',quality=88)
print('ok')
