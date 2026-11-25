#!/usr/bin/env python3
"""Run a heavy command under the machine-wide render lock (BRIEF.md): mkdir /tmp/gm-render.lock, owner file, release after.

  python3 tools/lockrun.py <command> [args...]
"""
import os, subprocess, sys, time

LOCK = '/tmp/gm-render.lock'
OWNER = 'film-agent (claude-rule/film)'

def main():
    waited = 0
    while True:
        try:
            os.mkdir(LOCK); break
        except FileExistsError:
            if waited % 60 == 0:
                who = open(os.path.join(LOCK, 'owner')).read().strip() if os.path.exists(os.path.join(LOCK, 'owner')) else '?'
                print(f'waiting for render lock (held by {who})', flush=True)
            time.sleep(5); waited += 5
    try:
        open(os.path.join(LOCK, 'owner'), 'w').write(OWNER + f' pid {os.getpid()}\n')
        sys.exit(subprocess.call(sys.argv[1:]))
    finally:
        try: os.remove(os.path.join(LOCK, 'owner'))
        except FileNotFoundError: pass
        os.rmdir(LOCK)

if __name__ == '__main__':
    main()
