#!/bin/sh
# run a heavy command under the machine-wide render lock (BRIEF.md):  tools/lock.sh <cmd...>
until mkdir /tmp/gm-render.lock 2>/dev/null; do echo "waiting for render lock ($(cat /tmp/gm-render.lock/owner 2>/dev/null))"; sleep 5; done
echo clips-agent > /tmp/gm-render.lock/owner
trap 'rm -f /tmp/gm-render.lock/owner; rmdir /tmp/gm-render.lock 2>/dev/null' EXIT INT TERM
"$@"
