# Sound for a direction motion test: her voice (a range of the recording) + library sounds placed by their loudest peak.
# python3 mixtest.py spec.json   spec = {"video": "silent.mp4", "out": "final.mp4", "voice": [mov, t0, t1],
#                                         "cues": [[t_in_test_s, "library-name", db], ...]}
# Sounds: library/sounds/<name>.mp3, peak-aligned (the loudest sample lands on t). Master: loudnorm -14 LUFS, TP -1.5.
import json, subprocess, sys, os
import numpy as np
SR = 48000
LIB = '/Users/gbemi/Desktop/CODE/videos/library/sounds/'
def dec(args):
    raw = subprocess.run(['ffmpeg', '-v', 'error'] + args + ['-ac', '1', '-ar', str(SR), '-f', 'f32le', '-'], capture_output=True, check=True).stdout
    return np.frombuffer(raw, np.float32).copy()
spec = json.load(open(sys.argv[1]))
mov, t0, t1 = spec['voice']
n = int((t1 - t0) * SR)
mix = np.zeros(n, np.float32)
v = dec(['-ss', str(t0), '-t', str(t1 - t0), '-i', mov, '-vn'])[:n]
v = v / (np.sqrt(np.mean(v ** 2)) + 1e-9) * 0.08          # about -22 dBFS RMS
mix[:len(v)] += v
for t, name, db in spec['cues']:
    s = dec(['-i', LIB + name + '.mp3'])
    s = s / (np.abs(s).max() + 1e-9) * 0.5 * 10 ** (db / 20)
    pk = int(np.argmax(np.abs(s)))
    at = int(t * SR) - pk
    a, b = max(0, at), min(n, at + len(s))
    if b > a: mix[a:b] += s[a - at:b - at]
    print(f'{name:28s} t={t:6.2f}s peak offset {pk / SR:5.3f}s')
wav = os.path.splitext(spec['out'])[0] + '.wav'
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'f32le', '-ar', str(SR), '-ac', '1', '-i', '-', wav], input=mix.tobytes(), check=True)
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', spec['video'], '-i', wav, '-map', '0:v', '-map', '1:a', '-c:v', 'copy',
                '-af', 'loudnorm=I=-14:TP=-1.5:LRA=11', '-ar', '48000', '-c:a', 'aac', '-b:a', '192k', '-shortest', spec['out']], check=True)
os.replace(wav, os.path.expanduser('~/.Trash/') + os.path.basename(wav))
r = subprocess.run(['ffmpeg', '-hide_banner', '-i', spec['out'], '-af', 'ebur128=peak=true', '-f', 'null', '-'], capture_output=True, text=True).stderr
print('\n'.join(l.strip() for l in r.splitlines()[-12:] if 'I:' in l or 'Peak:' in l))
