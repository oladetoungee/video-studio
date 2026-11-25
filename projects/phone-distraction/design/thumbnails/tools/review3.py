"""Review sheets for the v3 set: every option next to her own thumbnail, at 640 wide and at 320x180 (phone size).
  python3 tools/review3.py -> review/v3_640.jpg, review/v3_320.jpg"""
import glob, os
from PIL import Image, ImageDraw
T = os.path.dirname(os.path.dirname(os.path.abspath(__file__))); P = os.path.dirname(os.path.dirname(T))
her = os.path.join(os.path.dirname(os.path.dirname(P)), 'inspiration/youtube-thumbnail/her-own/database-indexes_her-thumbnail.png')
fs = [her] + sorted(glob.glob(os.path.join(P, 'outputs/thumbnails/[0-2][0-9]-*.png')))
for w, cols, name in [(640, 3, 'v3_640.jpg'), (320, 6, 'v3_320.jpg')]:
    h = w * 9 // 16; rows = (len(fs) + cols - 1) // cols
    S = Image.new('RGB', (cols * (w + 10), rows * (h + 30)), (24, 24, 24)); d = ImageDraw.Draw(S)
    for i, f in enumerate(fs):
        x, y = (i % cols) * (w + 10), (i // cols) * (h + 30)
        S.paste(Image.open(f).convert('RGB').resize((w, h), Image.LANCZOS), (x, y))
        d.text((x + 2, y + h + 6), 'HER BAR' if f == her else os.path.basename(f)[:-4], fill=(230, 230, 230))
    S.save(os.path.join(T, 'review', name), quality=90)
print('ok')
