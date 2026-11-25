import json, re, difflib, glob, os, sys, subprocess
import numpy as np
V = '/Users/gbemi/Desktop/CODE/videos/projects/'
S = '/private/tmp/claude-501/-Users-gbemi-Desktop-CODE-videos/ad1388fa-744f-4ad0-8d5a-5127432f42b4/scratchpad/captions-all/'
n = lambda s: re.sub(r"[^a-z0-9%']", '', s.lower().replace('’', "'").replace('.', ''))
def turbo_words(f):
    tw = []
    for x in json.load(open(f))['transcription']:
        s = x['text']
        if not s.strip(): continue
        if tw and not s.startswith(' '): tw[-1]['w'] += s.strip(); tw[-1]['e'] = x['offsets']['to'] / 1000; continue
        tw.append({'w': s.strip(), 't': x['offsets']['from'] / 1000, 'e': x['offsets']['to'] / 1000})
    return tw
def diff(cap, tw, fmt=lambda t: f"{t:7.2f}"):
    A = [(n(x['w']), i) for i, x in enumerate(cap) if n(x['w'])]; B = [(n(x['w']), i) for i, x in enumerate(tw) if n(x['w'])]
    sm = difflib.SequenceMatcher(None, [a for a, _ in A], [b for b, _ in B], autojunk=False); out = []
    for op, a0, a1, b0, b1 in sm.get_opcodes():
        if op == 'equal': continue
        if ''.join(a for a, _ in A[a0:a1]) == ''.join(b for b, _ in B[b0:b1]): continue
        ia = [i for _, i in A[a0:a1]]; ib = [i for _, i in B[b0:b1]]
        t = cap[ia[0]]['t'] if ia else (tw[ib[0]]['t'] if ib else 0)
        p0 = ia[0] if ia else (A[a0 - 1][1] + 1 if a0 else 0); p1 = ia[-1] + 1 if ia else p0
        ctx = ' '.join(x['w'] for x in cap[max(0, p0 - 5):p0]); post = ' '.join(x['w'] for x in cap[p1:p1 + 4])
        out.append((t, op, ' '.join(cap[i]['w'] for i in ia), ' '.join(tw[i]['w'] for i in ib), ctx, post))
    return sm.ratio(), out
def mmss(t): return f"{int(t // 60)}:{t % 60:05.2f}"
