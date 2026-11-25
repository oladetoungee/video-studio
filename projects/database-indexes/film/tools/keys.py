"""Slice single key clicks out of library/sounds/keyboard-typing.mp3 (Mixkit) -> audio/sfx/keys/kNN.wav (for the KEYS typing role)."""
import subprocess, numpy as np, wave, os
SR = 48000
x = np.frombuffer(subprocess.run(['ffmpeg', '-v', 'error', '-i', '../../../library/sounds/keyboard-typing.mp3', '-ar', str(SR), '-ac', '1', '-f', 'f32le', '-'], capture_output=True, check=True).stdout, np.float32)
e = np.abs(x); w = int(0.004 * SR); sm = np.convolve(e, np.ones(w) / w, 'same')
L = int(0.09 * SR); out = []; gap = int(0.07 * SR)
cand = [i for i in range(gap, len(sm) - L) if sm[i] > 0.03 and sm[i] == sm[i - gap // 2:i + gap // 2].max()]
for i in cand[:40]:
    a = max(0, i - int(0.012 * SR)); seg = x[a:a + L].copy(); seg[:96] *= np.linspace(0, 1, 96); seg[-int(0.03 * SR):] *= np.linspace(1, 0, int(0.03 * SR)); out.append(seg)
os.makedirs('audio/sfx/keys', exist_ok=True)
for k, s in enumerate(out):
    pcm = (np.clip(s / (np.abs(s).max() + 1e-9) * 0.9, -1, 1) * 32767).astype('<i2')
    with wave.open(f'audio/sfx/keys/k{k:02d}.wav', 'wb') as f: f.setnchannels(1); f.setsampwidth(2); f.setframerate(SR); f.writeframes(pcm.tobytes())
print(len(out), 'keys')
