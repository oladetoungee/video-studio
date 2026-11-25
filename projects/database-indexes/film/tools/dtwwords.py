import json,sys
def words(path):
    d=json.load(open(path)); W=[]
    for s in d['transcription']:
        for t in s['tokens']:
            tx=t['text']
            if tx.startswith('[_'): continue
            dt=t['t_dtw']/100 if t['t_dtw']>=0 else t['offsets']['from']/1000+0.12
            if tx.startswith(' ') or not W: W.append([tx.strip(),dt])
            else: W[-1][0]+=tx
    return W
if __name__=='__main__':
    W=words(sys.argv[1])
    for a,b in [tuple(map(float,x.split(':'))) for x in sys.argv[2:]]:
        print(a,b,' '.join('%s@%.2f'%(w,t) for w,t in W if a<=t<=b))
