#!/bin/bash
# run a command under the machine-wide heavy-job lock: tools/lock.sh <cmd...>
L=/tmp/gm-render.lock
until mkdir "$L" 2>/dev/null; do sleep 4; done
echo "phone-distraction design agent: $*" > "$L/owner"
trap 'rm -f "$L/owner"; rmdir "$L"' EXIT
"$@"
