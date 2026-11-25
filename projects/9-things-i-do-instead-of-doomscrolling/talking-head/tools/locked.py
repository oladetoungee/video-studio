#!/usr/bin/env python3
"""Run a command under the machine-wide render lock:  python3 tools/locked.py <name> -- cmd args..."""
import os, subprocess, sys
sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', '..', '..', '..', 'studio', 'tools'))
from gmlock import render_lock
i = sys.argv.index('--')
with render_lock(sys.argv[1]):
    env = dict(os.environ, GM_LOCK_HELD='1')
    sys.exit(subprocess.run(sys.argv[i + 1:], env=env).returncode)
