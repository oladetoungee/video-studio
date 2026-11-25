#!/usr/bin/env python3
"""Set up a project's talking-head folder (full edit, moments, shorts) from its kit, in one go.

  python3 studio/tools/thsetup.py <slug> [--source "kit/my video.mov"] [--force-words] [--force-faces]

Writes (never overwrites a file that exists unless asked):
  projects/<slug>/talking-head/talking-head.json   the manifest skeleton (source, words, faces, EDL, film link, sound palette,
                                                   music ducking -18 dB, outputs) with an empty "moments": [] list
  .../data/raw_words.json   her words on the SOURCE timeline [{w, t, e}]: from the film's corrected words mapped back through
                            film/data/cutlist.json "segments" when the film has them (names already fixed), else the kit's
                            whisper words (kit/transcripts/transcript.words.json, tokens merged into words)
  .../data/face_track.json  face track (studio/tools/facetrack.py, 6 fps, macOS Vision), under the render lock
Then add moments (see studio/README.md "Talking-head layouts") and run footedl.py.
"""
import glob, json, os, subprocess, sys
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from gmlock import render_lock  # noqa: E402

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
TOOLS = os.path.dirname(os.path.abspath(__file__))


def film_words_to_raw(proj):
    wp, cp = os.path.join(proj, 'film', 'data', 'words.json'), os.path.join(proj, 'film', 'data', 'cutlist.json')
    if not (os.path.exists(wp) and os.path.exists(cp)): return None
    cut = json.load(open(cp)); segs = cut.get('segments')
    if not segs: return None
    words = json.load(open(wp)); out = []
    for w in words:
        seg = None
        for s in segs:
            if s['edit_start'] - 1e-6 <= w['t'] < s['edit_start'] + (s['orig_end'] - s['orig_start']) + 1e-6: seg = s
        if seg is None: continue
        d = seg['orig_start'] - seg['edit_start']
        out.append({'w': w['w'], 't': round(w['t'] + d, 3), 'e': round(min(w['e'] + d, seg['orig_end']), 3)})
    return out


def whisper_words(proj):
    p = os.path.join(proj, 'kit', 'transcripts', 'transcript.words.json')
    if not os.path.exists(p): return None
    toks = json.load(open(p))['transcription']; out = []
    for x in toks:
        s = x['text']; t, e = x['offsets']['from'] / 1000, x['offsets']['to'] / 1000
        if not s.strip(): continue
        if s.startswith(' ') or not out: out.append({'w': s.strip(), 't': t, 'e': e})
        else: out[-1]['w'] += s.strip(); out[-1]['e'] = e
    return out


def main():
    a = sys.argv[1:]; slug = a[0]; proj = os.path.join(ROOT, 'projects', slug); th = os.path.join(proj, 'talking-head')
    os.makedirs(os.path.join(th, 'data'), exist_ok=True); os.makedirs(os.path.join(th, 'moments'), exist_ok=True)
    if '--source' in a: src = os.path.join(proj, a[a.index('--source') + 1])
    else:
        vids = sorted(f for f in glob.glob(os.path.join(proj, 'kit', '*')) if f.lower().endswith(('.mov', '.mp4', '.m4v')))
        if not vids: raise SystemExit('no video in kit/')
        src = vids[0]
    rel_src = os.path.relpath(src, th)
    wp = os.path.join(th, 'data', 'raw_words.json')
    if not os.path.exists(wp) or '--force-words' in a:
        words = film_words_to_raw(proj); how = 'film words mapped back through film/data/cutlist.json'
        if not words: words = whisper_words(proj); how = 'kit whisper words'
        if not words: raise SystemExit('no words: run whisper on the kit first')
        json.dump(words, open(wp, 'w')); print('words:', len(words), '(' + how + ')')
    fp = os.path.join(th, 'data', 'face_track.json')
    if not os.path.exists(fp) or '--force-faces' in a:
        with render_lock('face track ' + slug):
            subprocess.run([sys.executable, os.path.join(TOOLS, 'facetrack.py'), src, fp, '--fps', '6'], check=True)
    mp = os.path.join(th, 'talking-head.json')
    if not os.path.exists(mp):
        has_film = os.path.exists(os.path.join(proj, 'film', 'film.json'))
        man = {
            'title': slug + ': talking-head', 'source': rel_src, 'fps': 30,
            'words': 'data/raw_words.json', 'faces': 'data/face_track.json', 'edl': 'data/edl.json',
            **({'film': slug} if has_film else {}),
            'edit': {'silenceDb': -44, 'maxPause': 0.42, 'keepBefore': 0.14, 'keepAfter': 0.1},
            'out': '../outputs/talking-head', 'shortsOut': '../outputs/shorts', 'tail': 0.7,
            'audio': {'voiceFilter': 'highpass=f=80,afftdn=nr=8:nf=-52:tn=1,deesser=i=0.3:m=0.5:f=0.5,acompressor=threshold=0.06:ratio=3:attack=6:release=160:knee=3,equalizer=f=3200:t=q:w=1.2:g=1.5',
                      'music': {'dir': 'library:music'},
                      'levels': {'voiceLufs': -16.0, 'duckDb': -18.0, 'openDb': -10.0, 'target': -14.0, 'ceiling': 0.8},
                      'sfx': {'palette': True, 'roles': {}}},
            'moments': [],
        }
        json.dump(man, open(mp, 'w'), indent=1); print('manifest:', os.path.relpath(mp, ROOT))
    print('ok', os.path.relpath(th, ROOT))


if __name__ == '__main__':
    main()
