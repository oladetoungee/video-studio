# Sound for a direction motion test: her voice (voice.m4a, t0..t1, raw recording times) + a ducked Mixkit bed + cues.json
# ({"music": id, "musicDb": -24, "cues": [[t, "library-sound-name", db], ...]}), each sound's loudest peak on its cue time,
# mastered to -14 LUFS / -1.5 dBTP, muxed with the silent video.   python3 mix.py <dir> <t0> <t1> <silent.mp4> <out.mp4>
import json, os, subprocess, sys
import numpy as np
ROOT = '/Users/gbemi/Desktop/CODE/videos'; DIRS = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
X, t0, t1, silent, out = sys.argv[1], float(sys.argv[2]), float(sys.argv[3]), sys.argv[4], sys.argv[5]
XD = os.path.join(DIRS, X); SR = 48000; N = int(round((t1 - t0) * SR))
def dec(path, ss=None, dur=None):
    cmd = ['ffmpeg', '-v', 'error'] + (['-ss', str(ss)] if ss is not None else []) + ['-i', path] + (['-t', str(dur)] if dur else []) + ['-ac', '2', '-ar', str(SR), '-f', 'f32le', '-']
    return np.frombuffer(subprocess.run(cmd, capture_output=True, check=True).stdout, dtype=np.float32).reshape(-1, 2).copy()
db = lambda x: 10 ** (x / 20)
voice = dec(ROOT + '/projects/scholarships-for-african-students-in-europe/kit/transcripts/voice.m4a', t0, t1 - t0)[:N]
voice = np.pad(voice, ((0, N - len(voice)), (0, 0)))
fv = np.minimum(1, np.minimum(np.arange(N) / (0.04 * SR), (N - np.arange(N)) / (0.12 * SR)))[:, None]; voice *= fv
env = np.sqrt(np.convolve(voice.mean(1) ** 2, np.ones(2400) / 2400, mode='same'))
speak = np.convolve((env > 0.01).astype(np.float32), np.ones(9600) / 9600, mode='same')
cfg = json.load(open(os.path.join(XD, 'cues.json')))
mus = dec(ROOT + '/library/music/' + str(cfg.get('music', '766')) + '.mp3', cfg.get('musicAt', 0), t1 - t0)[:N]; mus = np.pad(mus, ((0, N - len(mus)), (0, 0)))
fade = np.minimum(1, np.minimum(np.arange(N) / (0.6 * SR), (N - np.arange(N)) / (0.9 * SR)))[:, None]
mus = mus * db(cfg.get('musicDb', -24)) * (1 - 0.72 * speak)[:, None] * fade
sfx = np.zeros((N, 2), np.float32); cache = {}
for t, f, rdb in cfg['cues']:
    if f not in cache:
        a = dec(ROOT + '/library/sounds/' + f + '.mp3'); a = a / (np.abs(a).max() + 1e-9) * 0.5; cache[f] = (a, int(np.argmax(np.abs(a).mean(1))))
    a, pk = cache[f]; start = int(round((t - t0) * SR)) - pk
    s0 = max(0, start); s1 = min(N, start + len(a))
    if s1 > s0: sfx[s0:s1] += a[s0 - start:s1 - start] * db(rdb + cfg.get('sfxDb', -4))
mix = voice + mus + sfx
raw = os.path.join(XD, '_mix.raw'); wav = os.path.join(XD, '_mix.wav'); mix.astype(np.float32).tofile(raw)
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'f32le', '-ar', str(SR), '-ac', '2', '-i', raw, '-af', 'loudnorm=I=-14:TP=-1.5:LRA=11', '-ar', str(SR), wav], check=True); os.remove(raw)
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', silent, '-i', wav, '-map', '0:v', '-map', '1:a', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', '-shortest', '-movflags', '+faststart', out], check=True); os.remove(wav)
r = subprocess.run(['ffmpeg', '-hide_banner', '-i', out, '-af', 'ebur128=peak=true', '-f', 'null', '-'], capture_output=True, text=True).stderr
print('\n'.join(l.strip() for l in r.splitlines()[-12:] if 'I:' in l or 'Peak:' in l))
