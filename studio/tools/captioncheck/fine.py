# fine.py <slug> t [t...]: 10 ms RMS dB over t-0.6..t+0.6, quiet runs (< -45 dB, >= 40 ms)
import sys; sys.path.insert(0, sys.argv[0].rsplit('/', 1)[0]); from tools import *
D = V + sys.argv[1] + '/'
x = np.frombuffer(subprocess.run(['ffmpeg', '-v', 'error', '-i', D + 'kit/transcripts/voice16k.wav', '-ac', '1', '-ar', '16000', '-f', 'f32le', '-'], capture_output=True).stdout, np.float32)
def db(t):
    a = max(0, int(t * 16000)); s = x[a:a + 160]
    return 20 * np.log10(np.sqrt(np.mean(s * s)) + 1e-9) if len(s) else -99
for a in sys.argv[2:]:
    t = float(a); v = [(t - 0.6 + i / 100, db(t - 0.6 + i / 100)) for i in range(121)]
    runs = []; cur = None
    for tt, d in v:
        if d < -45: cur = cur or [tt, tt]; cur[1] = tt + 0.01
        else:
            if cur and cur[1] - cur[0] >= 0.04: runs.append(cur)
            cur = None
    if cur and cur[1] - cur[0] >= 0.04: runs.append(cur)
    print(f't {t}: db@t {db(t):.0f}; quiet runs:', ', '.join(f'{r[0]:.2f}-{r[1]:.2f}' for r in runs))
