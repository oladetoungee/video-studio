import sys,subprocess,numpy as np
x=np.frombuffer(subprocess.run(['ffmpeg','-v','error','-i','../kit/transcripts/voice.m4a','-ar','48000','-ac','1','-f','f32le','-'],capture_output=True,check=True).stdout,np.float32)
n=len(x)//480; db=20*np.log10(np.sqrt((x[:n*480].reshape(n,480)**2).mean(1)+1e-12))
np.save('build/raw_env.npy',db)
for arg in sys.argv[1:]:
    a,b=map(float,arg.split(':'))
    s=''.join('_' if v<-45 else ('.' if v<-35 else '#') for v in db[int(a*100):int(b*100)])
    print(arg); 
    for k in range(0,len(s),100): print('%7.2f %s'%(a+k/100,s[k:k+100]))
