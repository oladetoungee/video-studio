#!/bin/zsh
# usage: _tools/lock.sh <command...>   (machine-wide render lock /tmp/gm-render.lock)
until mkdir /tmp/gm-render.lock 2>/dev/null; do echo "waiting for render lock: $(cat /tmp/gm-render.lock/owner 2>/dev/null)"; sleep 5; done
echo "edge-case directions $$" > /tmp/gm-render.lock/owner
trap 'rm -f /tmp/gm-render.lock/owner; rmdir /tmp/gm-render.lock' EXIT
"$@"
