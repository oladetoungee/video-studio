#!/usr/bin/env python3
"""Contact sheets of a review video: one frame every N s (labelled with its time). python3 vsheet.py <video> <outprefix> [every] [cols] [rows] [w]"""
import sys, subprocess, numpy as np
from PIL import Image, ImageDraw
v, pre = sys.argv[1], sys.argv[2]; ev = float(sys.argv[3]) if len(sys.argv) > 3 else 3; cols = int(sys.argv[4]) if len(sys.argv) > 4 else 5; rows = int(sys.argv[5]) if len(sys.argv) > 5 else 6; tw = int(sys.argv[6]) if len(sys.argv) > 6 else 384
pr = subprocess.run(['ffprobe', '-v', 'error', '-select_streams', 'v', '-show_entries', 'stream=width,height', '-of', 'csv=p=0', v], capture_output=True, text=True).stdout.strip().split(',')
W, H = int(pr[0]), int(pr[1]); th = round(tw * H / W)
raw = subprocess.run(['ffmpeg', '-v', 'error', '-i', v, '-vf', f'fps=1/{ev},scale={tw}:{th}', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-'], capture_output=True).stdout
fr = np.frombuffer(raw, np.uint8).reshape(-1, th, tw, 3); per = cols * rows
for k in range(0, len(fr), per):
    g = fr[k:k + per]; sh = Image.new('RGB', (cols * tw, ((len(g) + cols - 1) // cols) * (th + 18)), '#222'); d = ImageDraw.Draw(sh)
    for i, f in enumerate(g):
        x, y = (i % cols) * tw, (i // cols) * (th + 18); sh.paste(Image.fromarray(f), (x, y + 18)); t = (k + i) * ev + ev / 2 * 0; d.text((x + 3, y + 3), f'{int(t // 60)}:{t % 60:04.1f}', fill='#fff')
    sh.save(f'{pre}_{k // per + 1:02d}.jpg', quality=80)
print(len(fr), 'frames')
