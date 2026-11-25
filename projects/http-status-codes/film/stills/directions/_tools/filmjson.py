# writes <X>/film.json for each direction (same images for all; fonts listed so they load before drawing)
import json, os, glob
D = os.path.abspath(os.path.join(os.path.dirname(__file__), '..'))
imgs = {}
for p in sorted(glob.glob(D + '/_src/clips/*.png')): imgs['clip_' + os.path.basename(p)[:-4]] = '../_src/clips/' + os.path.basename(p)
for p in sorted(glob.glob(D + '/_src/pexels/*.jpg')): imgs['px_' + os.path.basename(p)[3:-4]] = '../_src/pexels/' + os.path.basename(p)
for p in sorted(glob.glob(D + '/_src/footage/*')): b = os.path.basename(p); imgs['f_' + b.rsplit('.', 1)[0].replace('.', '_')] = '../_src/footage/' + b
fonts = ['700 40px Kalam', '400 40px Kalam', '800 40px "Funnel Display"', '600 40px "Funnel Display"', '400 40px "Funnel Sans"', '600 40px "Funnel Sans"', '400 40px "Fragment Mono"',
         '400 40px "Reddit Sans"', '700 40px "Reddit Sans"', '900 40px "Reddit Sans"', '500 40px "Reddit Mono"', '700 40px "Reddit Mono"', '400 40px "Instrument Serif"', 'italic 400 40px "Instrument Serif"']
for X in ['A-line', 'B-odometer', 'C-serving', 'TH']:
    if not os.path.isdir(os.path.join(D, X)): continue
    json.dump({'title': 'http-status-codes direction ' + X, 'hud': '', 'intro': 0, 'outro': 1, 'voiceDuration': 528, 'words': '../_shared/words.json', 'images': imgs,
               'scripts': ['../_shared/clips.js', '../_shared/hs.js'] + (['../A-line/kit.js', '../B-odometer/kit.js', '../C-serving/kit.js'] if X == 'TH' else ['kit.js']) + ['scenes.js'],
               'cutSounds': {'cutSounds': False}, 'fonts': fonts}, open(os.path.join(D, X, 'film.json'), 'w'), indent=1)
    print(X)
