# dropped words (start outside every kept clip) + clip edges inside speech (RMS on voice16k.wav)
import sys; sys.path.insert(0, sys.argv[0].rsplit('/', 1)[0]); from tools import *
slug = sys.argv[1]; D = V + slug + '/'
w = json.load(open(D + 'talking-head/data/raw_words.json')); man = json.load(open(D + 'talking-head/talking-head.json')); edl = json.load(open(D + 'talking-head/data/edl.json'))
x = np.frombuffer(subprocess.run(['ffmpeg', '-v', 'error', '-i', D + 'kit/transcripts/voice16k.wav', '-ac', '1', '-ar', '16000', '-f', 'f32le', '-'], capture_output=True).stdout, np.float32)
def db(t, half=0.015):
    a = max(0, int((t - half) * 16000)); b = int((t + half) * 16000); s = x[a:b]
    return 20 * np.log10(np.sqrt(np.mean(s * s)) + 1e-9) if len(s) else -99
bad = 0; edges = 0
for mo in man['moments']:
    id = mo['id']; cl = edl[id]['clips']
    if mo.get('kind') == 'teaser':
        rng = [(b['in'], b['out'], b.get('cuts', [])) if isinstance(b, dict) else (b[0], b[1], []) for b in mo['bites'] if not (isinstance(b, dict) and 'gap' in b) and not (isinstance(b, dict) and 'in' not in b)]
    else:
        o = mo['out'] if isinstance(mo.get('out'), (int, float)) else 1e9; rng = [(mo.get('in') or 0, o, mo.get('cuts') or [])]
    for a, b, cuts in rng:
        for q in w:
            if not (a <= q['t'] < b) or any(c[0] <= q['t'] < c[1] for c in cuts): continue
            if not any(c[0] - 0.02 <= q['t'] < c[1] - 0.03 for c in cl):
                bad += 1; print('DROP', id, q)
    # edges: first/last clip edge of each source range + every edge that is not a tightened pause
    for i, (a, b) in enumerate(cl):
        for side, t in (('in', a), ('out', b)):
            d = max(db(t - 0.01), db(t + 0.01))
            ins = [q['w'] for q in w if q['t'] + 0.03 < t < q['e'] - 0.03]
            if d > -45 or ins:
                edges += 1; print(f'EDGE {id} clip{i} {side} {t:.3f} rms {d:.1f} dB inside-word {ins}')
print('dropped words:', bad, ' loud/inside edges:', edges)
# stray words inside teaser gaps (silent title-card beats play source [at, at+gap])
for mo in man['moments']:
    if mo.get('kind') != 'teaser': continue
    for b in mo['bites']:
        if isinstance(b, dict) and 'gap' in b and b.get('at') is not None:
            a, e = b['at'], b['at'] + b['gap']
            for q in w:
                if min(q['e'], e) - max(q['t'], a) >= 0.5 * max(0.05, q['e'] - q['t']) or a <= q['t'] < e - 0.03: print('GAPWORD', mo['id'], b, q)
