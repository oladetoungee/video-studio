# Lay library sounds on a silent motion test. Each cue's loudest peak lands on its time (align "peak"),
# or its start ("name@t:db:start"). Typing beds take a max length: "keyboard-typing@0.15:-8:start:1.3".
#   python3 sfx.py in.mp4 out.mp4 name@t[:db[:peak|start[:maxlen]]] ...
import sys, subprocess, numpy as np, os
LIB = '/Users/gbemi/Desktop/CODE/videos/library/sounds/'
src, out, cues = sys.argv[1], sys.argv[2], sys.argv[3:]
dur = float(subprocess.check_output(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', src]).decode())
SR = 48000
mix = np.zeros(int(dur * SR) + SR, dtype=np.float64)
def load(f):
    raw = subprocess.check_output(['ffmpeg', '-v', 'error', '-i', LIB + f + '.mp3', '-ac', '1', '-ar', str(SR), '-f', 'f32le', '-'])
    return np.frombuffer(raw, dtype=np.float32).astype(np.float64)
for c in cues:
    name, rest = c.split('@'); parts = rest.split(':')
    t = float(parts[0]); db = float(parts[1]) if len(parts) > 1 else -6; align = parts[2] if len(parts) > 2 else 'peak'
    a = load(name)
    if len(parts) > 3:
        n = int(float(parts[3]) * SR); a = a[:n].copy(); f = int(0.05 * SR); a[-f:] *= np.linspace(1, 0, f)
    a = a / (np.max(np.abs(a)) + 1e-9) * 10 ** (db / 20)
    pk = int(np.argmax(np.abs(a))) if align == 'peak' else 0
    s0 = int(t * SR) - pk
    if s0 < 0: a = a[-s0:]; s0 = 0
    e = min(len(mix), s0 + len(a)); mix[s0:e] += a[:e - s0]
    print(f'{name:28s} at {t:6.2f}s  peak offset {pk / SR:5.3f}s')
mix = mix[:int(dur * SR)]
mix = mix / max(1e-9, np.max(np.abs(mix))) * 10 ** (-1.5 / 20)
wav = out + '.wav'
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'f64le', '-ar', str(SR), '-ac', '1', '-i', '-', wav], input=mix.tobytes(), check=True)
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', src, '-i', wav, '-map', '0:v', '-map', '1:a', '-c:v', 'copy', '-af', 'loudnorm=I=-16:TP=-1.5:LRA=11', '-ar', '48000', '-c:a', 'aac', '-b:a', '192k', '-shortest', out], check=True)
os.replace(wav, os.path.expanduser('~/.Trash/' + os.path.basename(wav)))
print('->', out)
