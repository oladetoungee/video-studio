# usage: source lock.sh; glock; ...; gunlock
glock(){ until mkdir /tmp/gm-render.lock 2>/dev/null; do sleep 5; done; echo "design cheapest frames pid $$" > /tmp/gm-render.lock/owner; }
gunlock(){ rm -f /tmp/gm-render.lock/owner; rmdir /tmp/gm-render.lock; }
