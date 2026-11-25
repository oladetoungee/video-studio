import json,re
W=json.load(open('data/raw_words.json'))
n=lambda s: re.sub(r"[^a-z0-9']","",s.lower().replace('’',"'"))
N=[n(w['w']) for w in W]
def ph(q, after=0):
    qs=[n(x) for x in q.split() if n(x)]
    for i in range(len(W)-len(qs)+1):
        if W[i]['t']<after: continue
        if N[i:i+len(qs)]==qs: return round(W[i]['t']-0.1,2), round(W[i+len(qs)-1]['e']+0.14,2)
    raise SystemExit('not found: '+q)
