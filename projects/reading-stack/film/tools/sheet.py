import sys,subprocess
# usage: sheet.py out.jpg f1 f2 f3 f4
out,fs=sys.argv[1],sys.argv[2:6]
args=[]
for f in fs: args+=['-i',f]
subprocess.run(['ffmpeg','-v','error','-y',*args,'-filter_complex',f'xstack=inputs={len(fs)}:layout=0_0|w0_0|0_h0|w0_h0,scale=1920:-1',out],check=True)
