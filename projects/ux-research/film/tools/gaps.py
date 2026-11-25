#!/usr/bin/env python3
"""List silent runs (10 ms RMS below -45 dBFS, >= 60 ms) in ranges of her raw voice: python3 tools/gaps.py 36-38 298-302"""
import subprocess, sys, numpy as np, os
SRC = os.path.join(os.path.dirname(os.path.abspath(__file__)), '../../kit/transcripts/voice.m4a')
for r in sys.argv[1:]:
    a, b = map(float, r.split('-'))
    x = np.frombuffer(subprocess.run(['ffmpeg', '-v', 'error', '-ss', str(a), '-t', str(b - a), '-i', SRC, '-ar', '48000', '-ac', '1', '-f', 'f32le', '-'], capture_output=True).stdout, np.float32)
    n = len(x) // 480; db = 20 * np.log10(np.sqrt((x[:n * 480].reshape(n, 480) ** 2).mean(1)) + 1e-9)
    runs = []; i = 0
    while i < n:
        if db[i] < -45:
            j = i
            while j < n and db[j] < -45: j += 1
            if j - i >= 6: runs.append(f'{a + i / 100:.2f}-{a + j / 100:.2f}')
            i = j
        else: i += 1
    print(r, ':', ' '.join(runs))
