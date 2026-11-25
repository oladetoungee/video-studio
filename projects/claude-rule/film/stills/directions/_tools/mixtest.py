# Sound for a motion test: her real voice for [t0,t1] from the recording + Mixkit cues, mastered to -14 LUFS.
# python3 mixtest.py out.m4a t0 t1 "file:time:db[:peak|start]" ...   (time = film seconds; peak aligns loudest_s on time)
import sys, json, subprocess
ROOT = '/Users/gbemi/Desktop/CODE/videos'
idx = {x['file'][:-4]: x for x in json.load(open(ROOT + '/library/sounds/index.json'))} if isinstance(json.load(open(ROOT + '/library/sounds/index.json')), list) else {}
out, t0, t1 = sys.argv[1], float(sys.argv[2]), float(sys.argv[3])
inp = ['-ss', str(t0), '-t', str(t1 - t0), '-i', ROOT + '/projects/claude-rule/kit/anthropic rule for claude.mov']
fl = ['[0:a]aresample=48000,pan=stereo|c0=c0|c1=c0,loudnorm=I=-16:TP=-2[v]']; labs = ['[v]']
for i, c in enumerate(sys.argv[4:]):
    f, t, db, *al = c.split(':'); al = al[0] if al else 'peak'
    meta = idx.get(f, {}); off = meta.get('loudest_s', 0) if al == 'peak' else 0
    d = max(0, (float(t) - t0 - off)) * 1000
    inp += ['-i', f'{ROOT}/library/sounds/{f}.mp3']
    fl.append(f'[{i+1}:a]aresample=48000,aformat=channel_layouts=stereo,volume={db}dB,adelay={int(d)}|{int(d)}[s{i}]'); labs.append(f'[s{i}]')
fl.append(''.join(labs) + f'amix=inputs={len(labs)}:normalize=0:duration=first,loudnorm=I=-14:TP=-1.5[o]')
subprocess.check_call(['ffmpeg', '-v', 'error', '-y'] + inp + ['-filter_complex', ';'.join(fl), '-map', '[o]', '-c:a', 'aac', '-b:a', '192k', out])
print('mixed', out)
