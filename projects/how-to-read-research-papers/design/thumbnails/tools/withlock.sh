#!/bin/zsh
# withlock.sh <cmd...>: waits for the machine-wide render lock /tmp/gm-render.lock, runs the command, releases it
until mkdir /tmp/gm-render.lock 2>/dev/null; do sleep 0.2; done
echo "design research-papers frames pid $$" > /tmp/gm-render.lock/owner
"$@"; rc=$?
rm -f /tmp/gm-render.lock/owner; rmdir /tmp/gm-render.lock
exit $rc
