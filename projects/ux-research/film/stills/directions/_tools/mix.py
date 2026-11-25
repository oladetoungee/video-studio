# Mix a motion test's sound effects (+ a quiet music bed) and mux onto the silent mp4.
# python3 mix.py <silent.mp4> <out.mp4> <cues.json>
# cues.json: {"music": "library/music/x.mp3", "music_db": -22, "cues": [[t, "name", db, "peak"|"start"], ...]}
# Peak-aligned cues put the sound's loudest sample on t (SOUND-PALETTE rule). Master: loudnorm -14 LUFS, TP -1.5.
import sys, json, subprocess, numpy as np, os
ROOT = '/Users/gbemi/Desktop/CODE/videos'
SR = 48000
def load(p):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', p, '-f', 'f32le', '-ac', '2', '-ar', str(SR), '-'], capture_output=True).stdout
    return np.frombuffer(raw, dtype=np.float32).reshape(-1, 2).copy()
src, out, cf = sys.argv[1:4]
C = json.load(open(cf))
dur = float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', src], capture_output=True, text=True).stdout)
N = int(dur * SR); mix = np.zeros((N, 2), np.float32)
for t, name, db, align in C['cues']:
    a = load(f'{ROOT}/library/sounds/{name}.mp3')
    off = int(np.argmax(np.abs(a).max(1))) if align == 'peak' else int(np.argmax(np.abs(a).max(1) > 0.1 * np.abs(a).max()))
    s = int(t * SR) - off
    a = a * 10 ** (db / 20)
    if s < 0: a = a[-s:]; s = 0
    e = min(N, s + len(a)); mix[s:e] += a[:e - s]
if C.get('music'):
    m = load(f"{ROOT}/{C['music']}")[:N] * 10 ** (C.get('music_db', -22) / 20)
    fade = np.minimum(1, np.minimum(np.arange(len(m)) / (0.3 * SR), (len(m) - np.arange(len(m))) / (0.8 * SR)))[:, None]
    mix[:len(m)] += m * fade
tmp = os.path.join(os.environ.get('TMPDIR', '/tmp'), os.path.basename(out) + '.wav')
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'f32le', '-ar', str(SR), '-ac', '2', '-i', '-', tmp], input=mix.tobytes())
import re
r = subprocess.run(['ffmpeg', '-nostats', '-i', tmp, '-af', 'ebur128', '-f', 'null', '-'], capture_output=True, text=True).stderr
I = float(re.findall(r'I:\s+(-?[\d.]+) LUFS', r)[-1]); g = -14.0 - I
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', src, '-i', tmp, '-map', '0:v', '-map', '1:a', '-c:v', 'copy', '-af', f'volume={g:.2f}dB,alimiter=limit=0.70:attack=1:release=60:level=false', '-c:a', 'aac', '-b:a', '192k', '-ar', '48000', '-shortest', out])
os.remove(tmp)
print('ok', out)
