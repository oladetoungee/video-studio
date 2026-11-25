#!/usr/bin/env python3
"""Name the style frames and build one contact sheet per aspect.
  python3 tools/styleframes.py <dir with render.mjs stills (png)>   -> stills/style-frames/"""
import glob, os, shutil, subprocess, sys
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'stills', 'style-frames')
NAMES = {3.3: '01_hook-launched', 25.75: '02_sources-one-record', 43.85: '03_punch-finally', 71.85: '04_estonia-online',
         154.7: '05_consent-2003-vs-3s', 196.45: '06_minimal-answer', 232.7: '07_split-estonia-ghana', 258.5: '08_punch-both-ways'}
src = sys.argv[1]; os.makedirs(OUT, exist_ok=True)
for asp, cols, cw in (('16x9', 4, 960), ('9x16', 8, 540)):
    files = []
    for t, name in sorted(NAMES.items()):
        f = os.path.join(src, f'{asp}_t{t:07.2f}.png'); dst = os.path.join(OUT, f'{name}_{asp}.png'); shutil.copy(f, dst); files.append(dst)
    n = len(files); ch = cw * (9 / 16 if asp == '16x9' else 16 / 9)
    args = sum([['-i', f] for f in files], [])
    fc = ''.join(f'[{i}:v]scale={cw}:-1[v{i}];' for i in range(n)) + ''.join(f'[v{i}]' for i in range(n)) + f'xstack=inputs={n}:fill=0x555555:layout=' + '|'.join(f'{(i % cols) * (cw + 8)}_{(i // cols) * int(ch + 8)}' for i in range(n))
    subprocess.run(['ffmpeg', '-v', 'error', '-y', *args, '-filter_complex', fc, os.path.join(OUT, f'contact_{asp}.png')], check=True)
print('\n'.join(sorted(os.listdir(OUT))))
