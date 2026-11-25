# candidate frames of her (closed mouth / gesture), 3 per time, 1920 wide -> review/cand/
for t in 9.3 14.0 112.0 163.3 186.7 205.3 214.7 247.3 345.3 368.7 410.7 438.7 471.3 513.3 555.3 592.7; do
 for d in -0.3 0 0.3; do tt=$(python3 -c "print(round($t+$d,1))"); ffmpeg -hide_banner -loglevel error -y -ss $tt -i /Users/gbemi/Desktop/CODE/videos/projects/how-to-read-research-papers/kit/raw-video.mov -frames:v 1 -vf scale=1920:-2 -q:v 2 /Users/gbemi/Desktop/CODE/videos/projects/how-to-read-research-papers/design/thumbnails/review/cand/c_$tt.jpg; done
done
