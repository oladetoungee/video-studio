#!/usr/bin/env python3
"""Polaroid crops of her (never flipped) from her recording: assets/her_<raw seconds>.jpg (760x760, face centred).
Raw-video seconds (kit/UX research. .mov). Runs under the render lock (4K read). python3 tools/lockrun.py python3 tools/polaroids.py"""
import subprocess, os
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, '..', 'kit', 'UX research. .mov')
TIMES = [48, 75, 140, 323, 347, 440, 445, 530, 655, 666, 695, 720, 766]
for t in TIMES:
    out = os.path.join(ROOT, 'assets', f'her_{t}.jpg')
    if os.path.exists(out): continue
    # 4K frame: the face sits near x 2000, y 1000; a 1700 px square from y 140 keeps headband to chest
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', str(t), '-i', SRC, '-frames:v', '1', '-vf', 'crop=1700:1700:1150:180,scale=760:760', '-q:v', '3', out], check=True)
    print(out)
