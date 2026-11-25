#!/bin/zsh
# Review stills for the format + cover sheets: per short t 0.05 (cover), 2.5, the middle of its 2nd graphic (or 1st), end - 1.2
#   zsh tools/stills.sh [sh01 sh02 ...]   then: python3 tools/fmtsheet.py
cd /Users/gbemi/Desktop/CODE/videos
M=projects/working-full-time-while-doing-masters-abroad/talking-head/talking-head.json; O=projects/working-full-time-while-doing-masters-abroad/outputs/_review/v2; mkdir -p $O
ids=($@); [[ ${#ids} -eq 0 ]] && ids=(sh01 sh02 sh03 sh04 sh05 sh06 sh07 sh08 sh09 sh10)
for i in $ids; do
  A=$(node studio/tools/composite.mjs meta $M $i --aspect 9x16 2>/dev/null | python3 -c "
import json,sys; d=json.load(sys.stdin); sc=d['SCENES']; dur=d['dur']
g=[(s['start'],s.get('t1',s['start']+2)) for s in sc if s.get('id') and not s['id'].startswith(('fmt-','hook','talk')) and 'L1' not in str(s.get('layout'))]
g=g[1] if len(g)>1 else (g[0] if g else (dur*0.5,dur*0.5))
print('0.05,2.5,%.2f,%.2f'%(min((g[0]+g[1])/2, g[0]+2.0), dur-1.2))")
  node studio/tools/composite.mjs stills $M $i --aspect 9x16 --captions --at $A --out $O --prefix ${i}_ 2>&1 | grep -v "^\[page\]" | tail -1
done
