#!/usr/bin/env python3
"""Face track of a talking-head video, for footage moments (studio/runtime/footage.js follows her face with it).

  python3 studio/tools/facetrack.py <video> <out.json> [--fps 6] [--ss 0 --t 1078]

Decodes the video with ffmpeg (VideoToolbox), 640x360 at --fps, and runs macOS Vision face detection on every frame
(studio/tools/facetrack.swift, compiled once into studio/.cache/). Nothing is written to disk but the JSON:
  {"fps": 6, "src": [3840, 2160], "t0": 0, "faces": [[x, y, w, h] | null, ...]}   normalised, origin top-left, one per frame
"""
import json, os, subprocess, sys

STUDIO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def binary():
    src = os.path.join(STUDIO, 'tools', 'facetrack.swift'); out = os.path.join(STUDIO, '.cache', 'facetrack')
    if not os.path.exists(out) or os.path.getmtime(out) < os.path.getmtime(src):
        os.makedirs(os.path.dirname(out), exist_ok=True)
        subprocess.run(['swiftc', '-O', src, '-o', out], check=True)
    return out


def main():
    a = sys.argv[1:]; video, out = a[0], a[1]
    opt = lambda k, d: float(a[a.index(k) + 1]) if k in a else d
    fps, ss, dur = opt('--fps', 6), opt('--ss', 0), opt('--t', 0)
    probe = json.loads(subprocess.run(['ffprobe', '-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height,duration', '-of', 'json', video], capture_output=True, check=True).stdout)['streams'][0]
    ff = ['ffmpeg', '-v', 'error', '-hwaccel', 'videotoolbox', '-ss', str(ss), *(['-t', str(dur)] if dur else []), '-i', video,
          '-vf', f'fps={fps},scale=640:360', '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-']
    p1 = subprocess.Popen(ff, stdout=subprocess.PIPE)
    p2 = subprocess.Popen([binary(), '640', '360'], stdin=p1.stdout, stdout=subprocess.PIPE, text=True)
    p1.stdout.close(); faces = []
    for line in p2.stdout:
        o = json.loads(line); faces.append(o['f'])
        if len(faces) % (int(fps) * 30) == 0: print(f'{ss + len(faces) / fps:.0f} s', flush=True)
    p2.wait(); p1.wait()
    json.dump({'fps': fps, 'src': [probe['width'], probe['height']], 't0': ss, 'faces': faces}, open(out, 'w'))
    print(f'{len(faces)} frames, {sum(f is None for f in faces)} without a face -> {out}')


if __name__ == '__main__':
    main()
