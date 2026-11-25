import json,sys,re
for f in sys.argv[1:]:
    for l in open(f):
        if not l.startswith('{'): continue
        d=json.loads(l); tc=d.get('textCollision',{})
        print(f.split('/')[-1], d['id'], d.get('aspect'), 'collisions', len(tc.get('hits',[])), 'pass' if tc.get('pass') else 'FAIL', 'zooms', len((d.get('shortZoom') or {}).get('zooms',[])) if d.get('shortZoom') else '-')
