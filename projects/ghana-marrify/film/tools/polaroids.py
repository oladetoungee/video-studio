#!/usr/bin/env python3
"""Polaroid inserts: frames of her own footage (../kit/ghana-marrify.mov, 4K), cropped 4:5 around her, never flipped.
  python3 tools/polaroids.py   -> assets/her_*.jpg (800x1000)"""
import os, subprocess
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(os.path.dirname(ROOT), 'kit', 'ghana-marrify.mov')
# name: (original-recording time s, crop x0, crop y0, crop width) - crop is 4:5 (h = 1.25 w); no hflip, ever
SHOTS = {'her_estonia': (54.2, 1260, 120, 1500), 'her_explore': (240.5, 1260, 120, 1500), 'her_head': (299.0, 1200, 120, 1500)}
os.makedirs(os.path.join(ROOT, 'assets'), exist_ok=True)
for name, (t, x, y, w) in SHOTS.items():
    h = int(w * 1.25)
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-ss', str(t), '-i', SRC, '-frames:v', '1', '-vf', f'crop={w}:{h}:{x}:{y},scale=800:1000:flags=lanczos', '-q:v', '3',
                    os.path.join(ROOT, 'assets', name + '.jpg')], check=True)
    print(name)
