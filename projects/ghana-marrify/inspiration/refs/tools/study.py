#!/usr/bin/env python3
"""Frame study for a reference video: cuts from frame-diff spikes + annotated contact sheet.
usage: study.py video.mp4 [--n 30] [--cols 6] [--out sheets/] [--every S]
Prints cut times (s), shot lengths and a few sampled colours; writes <out>/<name>.jpg."""
import subprocess, sys, json, os, numpy as np, argparse
from PIL import Image, ImageDraw, ImageFont
ap=argparse.ArgumentParser(); ap.add_argument('v'); ap.add_argument('--n',type=int,default=30); ap.add_argument('--cols',type=int,default=6)
ap.add_argument('--out',default=None); ap.add_argument('--every',type=float,default=0); ap.add_argument('--t0',type=float,default=0); ap.add_argument('--t1',type=float,default=0)
a=ap.parse_args()
pr=json.loads(subprocess.check_output(['ffprobe','-v','error','-select_streams','v:0','-show_entries','stream=width,height,r_frame_rate:format=duration','-of','json',a.v]))
W=pr['streams'][0]['width'];H=pr['streams'][0]['height'];dur=float(pr['format']['duration'])
num,den=map(int,pr['streams'][0]['r_frame_rate'].split('/'));fps=num/den
# cut detection on small gray frames
sw=96; sh=max(2,int(round(H*sw/W/2))*2)
p=subprocess.Popen(['ffmpeg','-v','error','-i',a.v,'-vf',f'scale={sw}:{sh},format=gray','-f','rawvideo','-'],stdout=subprocess.PIPE)
prev=None;d=[]
while True:
    b=p.stdout.read(sw*sh)
    if len(b)<sw*sh: break
    f=np.frombuffer(b,np.uint8).astype(np.float32)
    d.append(0 if prev is None else np.abs(f-prev).mean()); prev=f
d=np.array(d); cuts=[]
for i in range(1,len(d)):
    lo=max(1,i-4);hi=min(len(d),i+5)
    nb=np.median(np.r_[d[lo:i],d[i+1:hi]]) if hi-lo>1 else 0
    if d[i]>18 and d[i]>3*max(nb,2): cuts.append(round(i/fps,3))
shots=np.diff([0]+cuts+[dur])
print(f'{os.path.basename(a.v)}  {W}x{H} {fps:.2f}fps {dur:.2f}s  cuts={len(cuts)}  median shot={np.median(shots):.2f}s')
print('cuts:',cuts)
print('motion (mean abs diff per s):',' '.join(f'{d[int(s*fps):int((s+1)*fps)].mean():.0f}' for s in range(int(dur))))
# contact sheet
t0=a.t0; t1=a.t1 or dur
ts=list(np.arange(t0,t1,a.every)) if a.every else list(np.linspace(t0,t1-0.05,a.n))
cw=320; ch=int(cw*H/W); cols=a.cols; rows=(len(ts)+cols-1)//cols
sheet=Image.new('RGB',(cols*cw,rows*(ch+18)),(30,30,30)); dr=ImageDraw.Draw(sheet)
try: font=ImageFont.truetype('/System/Library/Fonts/Menlo.ttc',13)
except: font=None
for k,t in enumerate(ts):
    raw=subprocess.check_output(['ffmpeg','-v','error','-ss',f'{t:.3f}','-i',a.v,'-frames:v','1','-vf',f'scale={cw}:{ch}','-f','rawvideo','-pix_fmt','rgb24','-'])
    if len(raw)<cw*ch*3: continue
    im=Image.frombytes('RGB',(cw,ch),raw[:cw*ch*3])
    x=(k%cols)*cw;y=(k//cols)*(ch+18); sheet.paste(im,(x,y+18)); dr.text((x+4,y+2),f'{t:6.2f}s',fill=(255,220,0),font=font)
out=a.out or os.path.dirname(os.path.abspath(a.v))
os.makedirs(out,exist_ok=True)
name=os.path.splitext(os.path.basename(a.v))[0]+('' if not (a.t0 or a.t1 or a.every) else f'_{t0:g}-{t1:g}')
sheet.save(os.path.join(out,name+'.jpg'),quality=85); print('sheet:',os.path.join(out,name+'.jpg'))
