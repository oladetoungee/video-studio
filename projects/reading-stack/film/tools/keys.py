#!/usr/bin/env python3
"""Build a small bank of single keystrokes (for type-on text) from Mixkit keyboard recordings.
Onsets are found on a 2 ms energy envelope; each key is cut 5 ms before its onset, 110 ms long,
with a short fade-out, and peak-normalised. -> audio/sfx/keys/k00.wav ...

  python3 tools/keys.py
"""
import os, subprocess, numpy as np

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SR = 48000
SRC = ['mk2531', 'mk2533', 'mk1389']   # Keyboard typing / Slow typing on a keyboard / Laptop keyboard typing sequence


def decode(p):
    raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', p, '-ar', str(SR), '-ac', '1', '-f', 'f32le', '-'], capture_output=True, check=True).stdout
    return np.frombuffer(raw, np.float32).copy()


def main():
    out = os.path.join(ROOT, 'audio/sfx/keys'); os.makedirs(out, exist_ok=True)
    keys = []
    for name in SRC:
        x = decode(os.path.join(ROOT, 'audio/sfx', name + '.mp3'))
        hop = int(0.002 * SR); n = len(x) // hop
        env = np.sqrt((x[:n * hop].reshape(n, hop) ** 2).mean(1) + 1e-12)
        edb = 20 * np.log10(env)
        floor = np.percentile(edb, 30)
        i, last = 1, -999
        while i < n and len(keys) < 60:
            if edb[i] > floor + 22 and edb[i] - edb[i - 1] > 8 and i - last > 40:     # sharp rise, >= 80 ms apart
                a = max(0, i * hop - int(0.005 * SR)); b = a + int(0.11 * SR)
                seg = x[a:b].copy()
                if len(seg) == b - a:
                    fo = int(0.04 * SR); seg[-fo:] *= np.linspace(1, 0, fo) ** 2
                    pk = np.abs(seg).max()
                    # reject segments with a second strong hit inside (double keys)
                    if pk > 0.02 and np.abs(seg[int(0.05 * SR):]).max() < 0.6 * pk:
                        keys.append(seg / pk * 0.9)
                last = i
            i += 1
    for k, seg in enumerate(keys):
        subprocess.run(['ffmpeg', '-v', 'error', '-y', '-f', 'f32le', '-ar', str(SR), '-ac', '1', '-i', '-', os.path.join(out, f'k{k:02d}.wav')],
                       input=seg.astype(np.float32).tobytes(), check=True)
    print(len(keys), 'keys')


if __name__ == '__main__':
    main()
