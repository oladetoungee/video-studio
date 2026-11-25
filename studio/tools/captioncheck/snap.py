# snap.py <slug> [--apply id.key=val ...]: every manifest edge (moment in/out, cut a/b, bite a/b) measured on voice16k.wav;
# a loud edge is snapped to the nearer silence boundary (quiet run < -45 dB, >= 50 ms) when that is within 0.35 s
import sys; sys.path.insert(0, sys.argv[0].rsplit('/', 1)[0]); from tools import *
slug = sys.argv[1]; D = V + slug + '/'; TH = float(os.environ.get('TH', -45))
man = json.load(open(D + 'talking-head/talking-head.json')); w = json.load(open(D + 'talking-head/data/raw_words.json'))
x = np.frombuffer(subprocess.run(['ffmpeg', '-v', 'error', '-i', D + 'kit/transcripts/voice16k.wav', '-ac', '1', '-ar', '16000', '-f', 'f32le', '-'], capture_output=True).stdout, np.float32)
def db(t):
    a = max(0, int(t * 16000)); s = x[a:a + 160]
    return 20 * np.log10(np.sqrt(np.mean(s * s)) + 1e-9) if len(s) else -99
def edge_db(t): return max(db(t - 0.02), db(t - 0.01), db(t), db(t + 0.01))
def quiet(t0, t1):
    runs = []; cur = None
    for i in range(int((t1 - t0) * 100)):
        tt = t0 + i / 100
        if db(tt) < TH: cur = cur or [tt, tt]; cur[1] = tt + 0.01
        else:
            if cur and cur[1] - cur[0] >= 0.05: runs.append(cur)
            cur = None
    if cur and cur[1] - cur[0] >= 0.05: runs.append(cur)
    return runs
edges = []
for mo in man['moments']:
    id = mo['id']
    if mo.get('kind') == 'teaser':
        for j, b in enumerate(mo['bites']):
            if isinstance(b, list): edges += [(id, f'bite{j}.in', b[0], 'in'), (id, f'bite{j}.out', b[1], 'out')]
            elif 'in' in b: edges += [(id, f'bite{j}.in', b['in'], 'in'), (id, f'bite{j}.out', b['out'], 'out')]
            if isinstance(b, dict): 
                for c in b.get('cuts', []): edges += [(id, f'bite{j}.cut.a', c[0], 'out'), (id, f'bite{j}.cut.b', c[1], 'in')]
        continue
    if isinstance(mo.get('in'), (int, float)) and mo['in'] > 0.2: edges.append((id, 'in', mo['in'], 'in'))
    if isinstance(mo.get('out'), (int, float)): edges.append((id, 'out', mo['out'], 'out'))
    for j, c in enumerate(mo.get('cuts') or []): edges += [(id, f'cut{j}.a', c[0], 'out'), (id, f'cut{j}.b', c[1], 'in')]
for id, key, v, kind in edges:
    d = edge_db(v)
    if d < TH: continue
    q = quiet(v - 0.8, v + 0.8); before = [r for r in q if r[1] <= v + 0.005]; after = [r for r in q if r[0] >= v - 0.005]
    qb = before[-1] if before else None; qa = after[0] if after else None
    cand = []
    if qb: cand.append((v - qb[1], round(qb[1] - 0.03, 2), 'start of this sound'))
    if qa: cand.append((qa[0] - v, round(qa[0] + 0.03, 2), 'end of this sound'))
    cand.sort()
    near = [f"{q['w']}@{q['t']:.2f}" for q in w if v - 1.0 < q['t'] < v + 1.0]
    best = cand[0] if cand else None
    flag = 'AUTO' if best and best[0] <= 0.35 else 'LOOK'
    print(f"{flag} {id} {key} {v} ({kind}) {d:.0f} dB -> {best[1] if best else None} ({best[2] if best else ''}, {best[0]:.2f} s away)" if best else f"LOOK {id} {key} {v} {d:.0f} dB no quiet", ' | ', ' '.join(near))
