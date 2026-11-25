"""The machine-wide render lock for Python tools (same rules as studio/tools/lock.mjs).
   from gmlock import render_lock;  with render_lock('matte claude-rule'): ...
GM_LOCK_HELD=1 in the environment (set by a parent holding the lock) makes it a no-op."""
import os, sys, time, contextlib
LOCK = os.environ.get('GM_RENDER_LOCK', '/tmp/gm-render.lock')


def _alive(pid):
    try: os.kill(pid, 0); return True
    except PermissionError: return True
    except OSError: return False


@contextlib.contextmanager
def render_lock(name):
    if os.environ.get('GM_LOCK_HELD') == '1':
        yield; return
    waited = 0
    while True:
        try: os.mkdir(LOCK); break
        except FileExistsError:
            try: owner = open(LOCK + '/owner').read()
            except OSError: owner = ''
            if ' pid ' in owner:
                try:
                    pid = int(owner.split(' pid ')[1].split()[0])
                    if not _alive(pid):
                        os.remove(LOCK + '/owner'); os.rmdir(LOCK); continue
                except (ValueError, OSError): pass
            if waited % 60 == 0: print(f'waiting for the render lock ({owner.strip() or "?"})', file=sys.stderr, flush=True)
            time.sleep(2); waited += 2
    open(LOCK + '/owner', 'w').write(f'{name} pid {os.getpid()}\n')
    os.environ['GM_LOCK_HELD'] = '1'
    try: yield
    finally:
        os.environ.pop('GM_LOCK_HELD', None)
        try: os.remove(LOCK + '/owner')
        except OSError: pass
        try: os.rmdir(LOCK)
        except OSError: pass
