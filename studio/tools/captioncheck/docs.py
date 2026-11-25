# docs.py <slug> <status-block-file> <handoff-block-file> <kit-note>
import sys, re
P = '/Users/gbemi/Desktop/CODE/videos/projects/' + sys.argv[1] + '/'
st = open(P + 'STATUS.md').read(); blk = open(sys.argv[2]).read().rstrip() + '\n\n'
lines = st.split('\n')
# header: first line title; second non-empty line "Last updated ..."
i = next(k for k, l in enumerate(lines) if l.startswith('Last updated'))
lines[i] = 'Last updated 2026-11-20 by the CAPTION-ACCURACY agent (section below). Before: ' + lines[i][len('Last updated '):]
st = '\n'.join(lines); j = st.index('\n## ')
st = st[:j + 1] + blk + st[j + 1:]
open(P + 'STATUS.md', 'w').write(st)
h = P + 'talking-head/HANDOFF.md'; open(h, 'a').write('\n' + open(sys.argv[3]).read().rstrip() + '\n')
k = P + 'kit/refined-kit.md'; ks = open(k).read().split('\n')
idx = next(n for n, l in enumerate(ks[:8]) if 'THE CURRENT KIT' in l)
ks[idx] = ks[idx].replace('Last updated: ', 'Last updated: 2026-11-20 (' + sys.argv[4] + '). Before that: ', 1)
open(k, 'w').write('\n'.join(ks))
print(ks[idx][:400])
