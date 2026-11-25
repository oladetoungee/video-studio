# re-master the audio of a motion test to -14 LUFS / <= -1 dBTP (gain, then a 4x-oversampled limiter), video copied
f=$1; I=$(ffmpeg -hide_banner -i $f -af ebur128 -f null - 2>&1 | grep -E "^\s+I:" | tail -1 | awk '{print $2}')
for k in 1 2; do
  g=$(python3 -c "print(-14 - ($I))")
  ffmpeg -v error -y -i $f -map 0:v -map 0:a -c:v copy -af "volume=${g}dB,aresample=192000,alimiter=limit=0.76:level=false:attack=1:release=60,aresample=48000" -c:a aac -b:a 192k -movflags +faststart ${f%.mp4}_fx.mp4 && mv ${f%.mp4}_fx.mp4 $f
  I=$(ffmpeg -hide_banner -i $f -af ebur128 -f null - 2>&1 | grep -E "^\s+I:" | tail -1 | awk '{print $2}')
done
ffmpeg -hide_banner -i $f -af ebur128=peak=true -f null - 2>&1 | grep -E "^\s+(I|Peak):" | tail -2
