# usage: source _tools/lock.sh; lock_take; ...; lock_rel
lock_take(){ while ! mkdir /tmp/gm-render.lock 2>/dev/null; do sleep 3; done; echo "should-you-learn-to-code directions pid $$" > /tmp/gm-render.lock/owner; }
lock_rel(){ rm -f /tmp/gm-render.lock/owner; rmdir /tmp/gm-render.lock; }
