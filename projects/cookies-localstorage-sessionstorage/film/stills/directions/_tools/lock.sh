#!/bin/zsh
# usage: _tools/lock.sh <command...>   (machine-wide render lock /tmp/gm-render.lock; owner file moved to Trash after)
until mkdir /tmp/gm-render.lock 2>/dev/null; do echo "waiting for render lock: $(cat /tmp/gm-render.lock/owner 2>/dev/null)"; sleep 5; done
echo "cookies directions pid $$" > /tmp/gm-render.lock/owner
trap 'mv /tmp/gm-render.lock/owner ~/.Trash/gm-lock-owner-cookies-$$ 2>/dev/null; rmdir /tmp/gm-render.lock' EXIT
"$@"
