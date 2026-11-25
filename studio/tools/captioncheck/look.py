# look.py <slug> <k> [raw:T | id:T] ... : words near the raw time, RMS profile, nearest silences
import sys; sys.path.insert(0, sys.argv[0].rsplit('/', 1)[0]); from tools import *
slug, k = sys.argv[1], sys.argv[2]; D = V + slug + '/'
w = json.load(open(D + 'talking-head/data/raw_words.json')); tw = json.load(open(S + k + '/raw_turbo_words.json'))
edl = json.load(open(D + 'talking-head/data/edl.json'))
x = np.frombuffer(subprocess.run(['ffmpeg', '-v', 'error', '-i', D + 'kit/transcripts/voice16k.wav', '-ac', '1', '-ar', '16000', '-f', 'f32le', '-'], capture_output=True).stdout, np.float32)
def db(t, half=0.01):
    a = max(0, int((t - half) * 16000)); b = int((t + half) * 16000); s = x[a:b]
    return 20 * np.log10(np.sqrt(np.mean(s * s)) + 1e-9) if len(s) else -99
def e2r(id, t):
    cum = 0
    for a, b in edl[id]['clips']:
        if t < cum + (b - a): return a + (t - cum)
        cum += b - a
    return None
for arg in sys.argv[3:]:
    who, t = arg.split(':'); t = float(t)
    r = t if who == 'raw' else e2r(who, t)
    clips = [c for id in edl for c in edl[id]['clips'] if (who == 'raw' or id == who) and c[0] - 2 < r < c[1] + 2] if who != 'raw' else []
    print(f'### {arg} -> raw {r:.2f}', 'clips near:', [c for c in edl[who]['clips'] if abs(c[0]-r)<3 or abs(c[1]-r)<3] if who != 'raw' else '')
    print('  CAP:', ' '.join(f"{q['w']}@{q['t']:.2f}" for q in w if r - 2 < q['t'] < r + 2))
    print('  TUR:', ' '.join(f"{q['w']}@{q['t']:.2f}" for q in tw if r - 2 < q['t'] < r + 2))
    prof = ''.join(' ' if db(r + d / 100) < -50 else ('.' if db(r + d / 100) < -45 else ('o' if db(r + d / 100) < -30 else '#')) for d in range(-100, 101, 2))
    print(f'  rms {r-1:.2f} |{prof}| {r+1:.2f}  (20 ms steps; space < -50, . < -45, o < -30)')
