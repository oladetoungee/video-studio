# Run a command under the machine-wide render lock (/tmp/gm-render.lock): python3 lockrun.py <cmd> [args...]
import os, sys, time, subprocess
L = '/tmp/gm-render.lock'
while True:
    try: os.mkdir(L); break
    except FileExistsError: print('waiting for render lock', flush=True); time.sleep(5)
open(L + '/owner', 'w').write('claude-rule-directions\n')
try: rc = subprocess.call(sys.argv[1:])
finally:
    try: os.remove(L + '/owner')
    except OSError: pass
    os.rmdir(L)
sys.exit(rc)
