#!/usr/bin/env python3
"""Sample the ground (modal colour) and top accent colours of a video at a few times.
usage: palette.py video t1 t2 ..."""
import subprocess,sys,numpy as np
v=sys.argv[1]
for t in sys.argv[2:]:
    raw=subprocess.check_output(['ffmpeg','-v','error','-ss',t,'-i',v,'-frames:v','1','-vf','scale=320:180','-f','rawvideo','-pix_fmt','rgb24','-'])
    a=np.frombuffer(raw,np.uint8).reshape(-1,3).astype(int)
    q=(a//8)*8+4; keys,inv,c=np.unique(q,axis=0,return_inverse=True,return_counts=True)
    order=np.argsort(-c)
    ground=keys[order[0]]; out=[f'ground #{ground[0]:02X}{ground[1]:02X}{ground[2]:02X} {c[order[0]]/len(q):.0%}']
    sat=keys.max(1)-keys.min(1)
    acc=[i for i in order[1:] if sat[i]>60 and c[i]/len(q)>0.002][:3]
    out+= [f'#{keys[i][0]:02X}{keys[i][1]:02X}{keys[i][2]:02X} {c[i]/len(q):.1%}' for i in acc]
    print(f'{v.split("/")[-1]} @{t}s: '+'  '.join(out))
