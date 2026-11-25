# Sound for a direction motion test: her voice (voice.m4a, t0..t1) + a ducked Mixkit bed + the scenes' sound cues
# (meta.json, role -> library/sounds/<file>.mp3 from <X>/sounds.json), each sound's loudest peak on its cue,
# mastered to about -14 LUFS / -1 dBTP, then muxed with the silent video.
# python3 mixtest.py <X-dir> <t0> <t1> <silent.mp4> <out.mp4>   (cues + roles in <X>/sounds.json)
import json, os, subprocess, sys
import numpy as np
ROOT = '/Users/gbemi/Desktop/CODE/videos'; DIRS = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
X, t0, t1, silent, out = sys.argv[1], float(sys.argv[2]), float(sys.argv[3]), sys.argv[4], sys.argv[5]
XD = os.path.join(DIRS, X); SR = 48000; N = int(round((t1 - t0) * SR))
def dec(path, ss=None, dur=None):
    cmd = ['ffmpeg', '-v', 'error'] + (['-ss', str(ss)] if ss is not None else []) + ['-i', path] + (['-t', str(dur)] if dur else []) + ['-ac', '2', '-ar', str(SR), '-f', 'f32le', '-']
    a = np.frombuffer(subprocess.run(cmd, capture_output=True, check=True).stdout, dtype=np.float32).reshape(-1, 2); return a.copy()
db = lambda x: 10 ** (x / 20)
voice = dec(ROOT + '/projects/should-you-learn-to-code-in-2027/kit/transcripts/voice.m4a', t0, t1 - t0)[:N]
voice = np.pad(voice, ((0, N - len(voice)), (0, 0)))
# voice level envelope (for ducking): 50 ms RMS, smoothed
env = np.sqrt(np.convolve(voice.mean(1) ** 2, np.ones(2400) / 2400, mode='same'))
speak = (env > 0.01).astype(np.float32); speak = np.convolve(speak, np.ones(9600) / 9600, mode='same')   # 200 ms smoothing
cfg = json.load(open(os.path.join(XD, 'sounds.json')))
mus = dec(ROOT + '/library/music/' + cfg.get('music', '766') + '.mp3', cfg.get('musicAt', 0), t1 - t0)[:N]; mus = np.pad(mus, ((0, N - len(mus)), (0, 0)))
fade = np.minimum(1, np.minimum(np.arange(N) / (0.6 * SR), (N - np.arange(N)) / (0.9 * SR)))[:, None]
mus = mus * db(cfg.get('musicDb', -24)) * (1 - 0.72 * speak)[:, None] * fade   # ~11 dB down under her voice
sfx = np.zeros((N, 2), np.float32); cache = {}
for c in [{'t': a, 'name': b, 'db': (d[0] if d else 0)} for a, b, *d in cfg['cues']]:
    if not (t0 - 1 <= c['t'] <= t1): continue
    role = cfg['roles'].get(c['name']);
    if not role: print('no sound for role', c['name']); continue
    f, rdb = (role, 0) if isinstance(role, str) else role
    if f not in cache:
        a = dec(ROOT + '/library/sounds/' + f + '.mp3'); a = a / (np.abs(a).max() + 1e-9) * 0.5; cache[f] = (a, int(np.argmax(np.abs(a).mean(1))))
    a, pk = cache[f]; start = int(round((c['t'] - t0) * SR)) - pk
    s0 = max(0, start); s1 = min(N, start + len(a))
    if s1 > s0: sfx[s0:s1] += a[s0 - start:s1 - start] * db(c.get('db', 0) + rdb + cfg.get('sfxDb', -6))
mix = voice * db(cfg.get('voiceDb', 0)) + mus + sfx
wav = os.path.join(XD, '_mix.wav'); (mix.astype(np.float32)).tofile(wav + '.raw')
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'f32le', '-ar', str(SR), '-ac', '2', '-i', wav + '.raw', '-af', 'loudnorm=I=-14:TP=-1.5:LRA=11', '-ar', str(SR), wav], check=True)
os.remove(wav + '.raw')
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', silent, '-i', wav, '-map', '0:v', '-map', '1:a', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-shortest', '-movflags', '+faststart', out], check=True)
os.remove(wav)
r = subprocess.run(['ffmpeg', '-hide_banner', '-i', out, '-af', 'ebur128=peak=true', '-f', 'null', '-'], capture_output=True, text=True).stderr
print('\n'.join(l for l in r.splitlines()[-12:] if 'I:' in l or 'Peak:' in l))
