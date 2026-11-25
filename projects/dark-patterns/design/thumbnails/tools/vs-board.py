#!/usr/bin/env python3
"""Review sheet: each thumbnail beside the board item it copies -> outputs/_review/thumbnails-vs-board.jpg"""
import json, os, re, glob
from PIL import Image, ImageDraw, ImageFont
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PROJ = os.path.dirname(os.path.dirname(ROOT))
VID = os.path.dirname(os.path.dirname(PROJ))
board = json.load(open(os.path.join(VID, 'inspiration/boards/thumbnails/board.json')))['items']
F = ImageFont.truetype('/System/Library/Fonts/Helvetica.ttc', 24)
W, H = 640, 360
dirs = sorted(d for d in os.listdir(os.path.join(ROOT, 'directions')) if os.path.isdir(os.path.join(ROOT, 'directions', d)))
sheet = Image.new('RGB', (2 * W + 60, len(dirs) * (H + 60) + 20), '#111')
dr = ImageDraw.Draw(sheet)
for k, d in enumerate(dirs):
    c = json.load(open(os.path.join(ROOT, 'directions', d, 'content.json')))
    n = int(re.search(r'Thumbnails (\d+)', c['board']).group(1))
    it = board[n - 1]
    y = 20 + k * (H + 60)
    ref = Image.open(os.path.join(VID, 'inspiration/boards/thumbnails/img', it['img'])).convert('RGB')
    ref.thumbnail((W, H)); sheet.paste(ref, (20, y + 34))
    th = Image.open(os.path.join(PROJ, 'outputs/thumbnails', d + '.png')).convert('RGB').resize((W, H), Image.LANCZOS)
    sheet.paste(th, (W + 40, y + 34))
    dr.text((20, y + 4), f'Thumbnails {n} ({it["id"]})', fill='#FFD23F', font=F)
    dr.text((W + 40, y + 4), f'{d}  ·  {c.get("fonts","")[:60]}', fill='#FFFFFF', font=F)
out = os.path.join(PROJ, 'outputs/_review/thumbnails-vs-board.jpg')
os.makedirs(os.path.dirname(out), exist_ok=True)
sheet.save(out, quality=82); print(out, sheet.size)
