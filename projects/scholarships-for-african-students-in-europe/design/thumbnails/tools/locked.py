"""Run one command under the machine-wide render lock (studio/tools/gmlock.py).
   python3 tools/locked.py <name> -- <command...>"""
import os, sys, subprocess
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '../../../../../studio/tools'))
from gmlock import render_lock

i = sys.argv.index('--')
with render_lock(' '.join(sys.argv[1:i]) or 'design scholarships'):
    sys.exit(subprocess.call(sys.argv[i + 1:]))
