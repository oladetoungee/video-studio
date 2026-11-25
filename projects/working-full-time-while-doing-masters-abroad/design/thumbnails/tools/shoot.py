# Her 29 Oct shoot, outfit B (white tee, red headband) -> Enhance photo -> assets/shoot/<n>.jpg (room), <n>-person.png (aligned), <n>-cut.png
import subprocess, sys, os
sys.path.insert(0, '/Users/gbemi/Desktop/CODE/videos/studio/tools')
from gmlock import render_lock
V = '/Users/gbemi/Desktop/CODE/videos'; SRC = V + '/library/her-photos/shoot-2026-10-29/B-white-tee-red-headband'
OUT = os.path.dirname(os.path.abspath(__file__)) + '/../assets/shoot'; TMP = os.environ.get('TMPD', '/tmp')
ns = sys.argv[1:] or ['1577', '1579', '1580', '1584', '1589', '1591', '1593', '1594']
with render_lock('wftd thumbnails enhance'):
    for n in ns:
        src = f'{SRC}/IMG_{n}.jpg'; small = f'{TMP}/wf{n}.png'
        subprocess.run(['sips', '-Z', '1800', '-s', 'format', 'png', src, '--out', small], check=True, capture_output=True)
        enh = f'{TMP}/wf{n}-enh.png'
        subprocess.run([V + '/studio/.cache/enhance', small, enh, '--bg', 'keep', '--long', '1800'], check=True, capture_output=True)
        subprocess.run(['sips', '-s', 'format', 'jpeg', '-s', 'formatOptions', '90', enh, '--out', f'{OUT}/{n}.jpg'], check=True, capture_output=True)
        subprocess.run(['swift', os.path.dirname(os.path.abspath(__file__)) + '/personlayer.swift', enh, f'{OUT}/{n}-person.png', 'auto'], check=True, capture_output=True)
        subprocess.run(['swift', V + '/studio/tools/cutout.swift', enh, f'{OUT}/{n}-cut.png', 'auto'], check=True, capture_output=True)
        print(n, 'ok', flush=True)
