#!/usr/bin/env python3
"""Pexels photos (free licence) for the country screens: one landscape photo per query -> ../assets/px/<name>.jpg, credits appended to film/assets/CREDITS.md"""
import json, os, sys, urllib.request, urllib.parse
HERE = os.path.dirname(os.path.abspath(__file__)); OUT = os.path.join(HERE, '../assets/px'); P = os.path.dirname(os.path.dirname(HERE))
KEY = open(os.path.expanduser('~/.config/pexels/key')).read().strip()
Q = {'berlin': 'Berlin street', 'bologna': 'Bologna Italy street', 'prague': 'Prague old town street', 'warsaw': 'Warsaw old town',
     'oslo': 'Oslo city', 'helsinki': 'Helsinki city', 'passport': 'passport visa application', 'card': 'bank card payment', 'tallinn-roofs': 'Tallinn old town rooftops'}
cred = open(os.path.join(P, 'film/assets/CREDITS.md')).read()
for name, q in Q.items():
    if len(sys.argv) > 1 and name not in sys.argv[1:]: continue
    req = urllib.request.Request('https://api.pexels.com/v1/search?' + urllib.parse.urlencode({'query': q, 'orientation': 'landscape', 'per_page': 5}), headers={'Authorization': KEY, 'User-Agent': 'Mozilla/5.0'})
    r = json.load(urllib.request.urlopen(req, timeout=30)); ph = r['photos'][0]
    data = urllib.request.urlopen(urllib.request.Request(ph['src']['large2x'], headers={'User-Agent': 'Mozilla/5.0'}), timeout=60).read()
    open(os.path.join(OUT, name + '.jpg'), 'wb').write(data)
    line = f"| talking-head/assets/px/{name}.jpg | photo | {ph['photographer']} | {ph['url']} |"
    if f'px/{name}.jpg' not in cred: cred = cred.replace('\nOfficial pages', line + '\n\nOfficial pages', 1) if '\nOfficial pages' in cred else cred + line + '\n'
    print(name, ph['photographer'], ph['url'])
open(os.path.join(P, 'film/assets/CREDITS.md'), 'w').write(cred)
