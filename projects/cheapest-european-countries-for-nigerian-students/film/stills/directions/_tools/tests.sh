cd /Users/gbemi/Desktop/CODE/videos/projects/cheapest-european-countries-for-nigerian-students/film/stills/directions/_tools
V=../../../kit/raw-video.mov
node r.mjs video A-price/index.html 1920x1080 7.0 17.15 ../A-price/_silent.mp4 her:$V:7.0:1920x1080 && python3 mix.py A-price 7.0 17.15 ../A-price/_silent.mp4 ../A-price/motion-test.mp4 && mv ../A-price/_silent.mp4 ~/.Trash/cheapest-silent/A.mp4
node r.mjs video B-math/index.html 1920x1080 279.0 289.2 ../B-math/_silent.mp4 her:$V:279.0:1920x1080 && python3 mix.py B-math 279.0 289.2 ../B-math/_silent.mp4 ../B-math/motion-test.mp4 && mv ../B-math/_silent.mp4 ~/.Trash/cheapest-silent/B.mp4
node r.mjs video C-lineup/index.html 1920x1080 435.6 444.6 ../C-lineup/_silent.mp4 && python3 mix.py C-lineup 435.6 444.6 ../C-lineup/_silent.mp4 ../C-lineup/motion-test.mp4 && mv ../C-lineup/_silent.mp4 ~/.Trash/cheapest-silent/C.mp4
echo ALLDONE
