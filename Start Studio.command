#!/bin/zsh
# Double-click to start the video studio and open it in Chrome (http://localhost:7700).
# Leave this window open while you work; close it (or press Ctrl+C) to stop the studio.
cd "$(dirname "$0")"
URL="http://localhost:7700/"
if curl -s -o /dev/null "$URL"; then
  echo "The studio is already running."
  open -a "Google Chrome" "$URL" 2>/dev/null || open "$URL"
  exit 0
fi
(sleep 1; open -a "Google Chrome" "$URL" 2>/dev/null || open "$URL") &
node studio/server.mjs
