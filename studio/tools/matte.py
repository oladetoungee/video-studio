#!/usr/bin/env python3
"""Person matte of a talking-head source video (her silhouette, white = her), made once, cached, for the layouts that put
things BEHIND her (L2 words behind her head, L6 her cut-out on paper).

  python3 studio/tools/matte.py <talking-head.json> [--frames 120-450,900-1300 | --all] [--quality accurate|balanced]
                                                    [--check]

macOS Vision `VNGeneratePersonSegmentationRequest` (studio/tools/matte.swift, compiled once into studio/.cache/matte) on
the source decoded at 960x540; the largest region (her) is kept, the rest (a cushion, a chair edge Vision also lifts)
cleared. Stored at 768x432 (a fifth of 4K) as small H.264 videos of 600 source frames (20 s at 30 fps) each:
  <talking-head>/build/matte/c00007.mp4   (source frames 4200..4799)
  <talking-head>/build/matte/matte.json   {fps, w, h, chunk, quality, src: {size, mtime}, chunks: {"7": {n, created}}}
Only the chunks a moment needs are made (composite.mjs asks for the frames its layouts use); a chunk is never made twice
unless the source or the quality changes. No image sequence is written. Runs under the machine-wide render lock.
Edges: Vision's soft edge is kept; the runtime feathers it a little more when it draws (MATTE.feather).
Speed (M-series, accurate): about 24 source frames a second, so ~25 s per chunk; a whole 4:30 video ~6 min.
"""
import json, os, subprocess, sys, time
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from gmlock import render_lock  # noqa: E402

STUDIO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CHUNK = 600; MW, MH = 768, 432; IW, IH = 960, 540


def binary():
    src = os.path.join(STUDIO, 'tools', 'matte.swift'); out = os.path.join(STUDIO, '.cache', 'matte')
    if not os.path.exists(out) or os.path.getmtime(out) < os.path.getmtime(src):
        os.makedirs(os.path.dirname(out), exist_ok=True)
        subprocess.run(['swiftc', '-O', src, '-o', out], check=True)
    return out


def info_path(base): return os.path.join(base, 'build', 'matte', 'matte.json')


def load_info(base, src, quality, fps):
    st = os.stat(src); key = {'size': st.st_size, 'mtime': int(st.st_mtime)}
    p = info_path(base)
    try: info = json.load(open(p))
    except (OSError, ValueError): info = None
    if not info or info.get('src') != key or info.get('quality') != quality or info.get('w') != MW or info.get('fps') != fps:
        info = {'fps': fps, 'w': MW, 'h': MH, 'chunk': CHUNK, 'quality': quality, 'src': key, 'chunks': {}}
    return info


def make_chunk(base, src, k, fps, quality, nframes_total):
    d = os.path.join(base, 'build', 'matte'); os.makedirs(d, exist_ok=True)
    f0 = k * CHUNK; n = min(CHUNK, nframes_total - f0)
    out = os.path.join(d, 'c%05d.mp4' % k); part = os.path.join(d, '.c%05d.part.mp4' % k)
    dec = subprocess.Popen(['ffmpeg', '-v', 'error', '-hwaccel', 'videotoolbox', '-ss', '%.4f' % (f0 / fps), '-i', src, '-frames:v', str(n),
                            '-vf', 'scale=%d:%d:flags=bicubic' % (IW, IH), '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-'], stdout=subprocess.PIPE)
    mat = subprocess.Popen([binary(), str(IW), str(IH), str(MW), str(MH), quality], stdin=dec.stdout, stdout=subprocess.PIPE)
    dec.stdout.close()
    enc = subprocess.Popen(['ffmpeg', '-v', 'error', '-y', '-f', 'rawvideo', '-pix_fmt', 'gray', '-s', '%dx%d' % (MW, MH), '-r', str(fps), '-i', '-',
                            '-c:v', 'libx264', '-preset', 'fast', '-crf', '10', '-g', '30', '-pix_fmt', 'yuv420p', '-color_range', 'pc', '-f', 'mp4', part],
                           stdin=mat.stdout)
    mat.stdout.close()
    enc.wait(); mat.wait(); dec.wait()
    if enc.returncode or mat.returncode or dec.returncode: raise SystemExit('matte chunk %d failed' % k)
    os.replace(part, out)
    return n


def main():
    a = sys.argv[1:]; man_path = os.path.abspath(a[0]); base = os.path.dirname(man_path); man = json.load(open(man_path))
    src = os.path.join(base, man['source']); fps = man.get('fps', 30)
    quality = a[a.index('--quality') + 1] if '--quality' in a else man.get('matte', {}).get('quality', 'accurate')
    probe = json.loads(subprocess.run(['ffprobe', '-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=nb_frames,duration', '-of', 'json', src],
                                      capture_output=True, check=True).stdout)['streams'][0]
    total = int(probe.get('nb_frames') or round(float(probe['duration']) * fps))
    info = load_info(base, src, quality, fps)
    if '--all' in a: want = set(range((total + CHUNK - 1) // CHUNK))
    else:
        want = set()
        spec = a[a.index('--frames') + 1] if '--frames' in a else ''
        for part in filter(None, spec.split(',')):
            x, y = (int(v) for v in part.split('-'))
            for k in range(max(0, x) // CHUNK, min(total - 1, y) // CHUNK + 1): want.add(k)
    have = lambda k: str(k) in info['chunks'] and os.path.exists(os.path.join(base, 'build', 'matte', 'c%05d.mp4' % k))
    todo = sorted(k for k in want if not have(k))
    if '--check' in a:
        print(json.dumps({'need': sorted(want), 'todo': todo, 'w': MW, 'h': MH, 'chunk': CHUNK})); return
    if todo:
        with render_lock('matte %s' % os.path.basename(os.path.dirname(base))):
            for i, k in enumerate(todo):
                t0 = time.time(); n = make_chunk(base, src, k, fps, quality, total)
                info['chunks'][str(k)] = {'n': n, 'created': int(time.time())}
                json.dump(info, open(info_path(base), 'w'), indent=1)
                print('@progress ' + json.dumps({'p': (i + 1) / len(todo), 'stage': 'her matte %d/%d' % (i + 1, len(todo))}), flush=True)
                print('matte chunk %d (%d frames) %.1f s' % (k, n, time.time() - t0), file=sys.stderr, flush=True)
    json.dump(info, open(info_path(base), 'w'), indent=1)
    print(json.dumps({'chunks': sorted(int(k) for k in info['chunks']), 'made': todo, 'w': MW, 'h': MH, 'chunk': CHUNK, 'fps': fps}))


if __name__ == '__main__':
    main()
