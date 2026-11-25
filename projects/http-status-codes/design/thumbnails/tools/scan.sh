#!/bin/bash
# Low-res scan of her whole recording (3 frames/s, 480 px wide) into <outdir>, to pick calm closed-mouth frames with facescore.swift.
# Holds the machine render lock (/tmp/gm-render.lock) while ffmpeg reads the 4K file.   bash tools/scan.sh <outdir>
O=$1; V=/Users/gbemi/Desktop/CODE/videos/projects/http-status-codes/kit/raw-video.mov; mkdir -p "$O"
until mkdir /tmp/gm-render.lock 2>/dev/null; do sleep 0.1; done; echo "design-http scan $$" > /tmp/gm-render.lock/owner
trap 'rm -f /tmp/gm-render.lock/owner; rmdir /tmp/gm-render.lock' EXIT
nice -n 10 ffmpeg -v error -y -hwaccel videotoolbox -i "$V" -vf "fps=3,scale=480:-2" -q:v 4 "$O/s_%05d.jpg"
ls "$O" | wc -l
