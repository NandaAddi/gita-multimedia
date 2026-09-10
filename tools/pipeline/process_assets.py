import os
import math
from pathlib import Path
from PIL import Image

REPO_ROOT = Path(__file__).resolve().parents[2]
ASSETS_DIR = REPO_ROOT / "WEBSITE" / "assets"
BRAIN_DIR = Path(r"C:\Users\Nanda Addi\.gemini\antigravity-ide\brain\29600911-ed5c-4ba2-ab33-18359c6d1dea")

def key_magenta(im, dist_thresh=90, fade_range=40):
    """Smooth chroma key for magenta background with despill."""
    im = im.convert('RGBA')
    width, height = im.size
    pixels = list(im.getdata())
    new_pixels = []
    
    for r, g, b, a in pixels:
        d = math.sqrt((r - 255)**2 + (g - 0)**2 + (b - 255)**2)
        if d < dist_thresh:
            new_pixels.append((0, 0, 0, 0))
        elif d < dist_thresh + fade_range:
            alpha = int(255 * (d - dist_thresh) / fade_range)
            # Soft despill: suppress excessive red & blue fringe
            new_r = min(r, int(g * 1.5) + 30)
            new_b = min(b, int(g * 1.5) + 30)
            new_pixels.append((new_r, g, new_b, alpha))
        else:
            new_pixels.append((r, g, b, 255))
            
    out = Image.new('RGBA', (width, height))
    out.putdata(new_pixels)
    return out

def process_all():
    print("1. Processing Background Sawah...")
    bg_src = BRAIN_DIR / "sawah_pixel_bg_1788387190689.jpg"
    bg_out = ASSETS_DIR / "environment" / "background_sawah.png"
    if bg_src.exists():
        bg = Image.open(bg_src)
        bg_1080p = bg.resize((1920, 1080), Image.Resampling.LANCZOS)
        bg_1080p.save(bg_out, "PNG")
        print(f"Saved background_sawah.png ({bg_1080p.size})")

    print("\n2. Processing Title Billboard...")
    board_src = BRAIN_DIR / "title_billboard_1788387275240.jpg"
    board_out = ASSETS_DIR / "ui" / "title_billboard.png"
    if board_src.exists():
        board = Image.open(board_src)
        board_keyed = key_magenta(board, dist_thresh=90, fade_range=35)
        bbox = board_keyed.getbbox()
        if bbox:
            board_keyed = board_keyed.crop(bbox)
        board_keyed.save(board_out, "PNG")
        print(f"Saved title_billboard.png ({board_keyed.size})")

    print("\n3. Processing Gita Waving Sprite...")
    gita_src = BRAIN_DIR / "gita_waving_1788387308593.jpg"
    gita_out = ASSETS_DIR / "characters" / "gita_idle.png"
    gita_talk_out = ASSETS_DIR / "characters" / "gita_talk.png"
    if gita_src.exists():
        gita = Image.open(gita_src)
        gita_keyed = key_magenta(gita, dist_thresh=90, fade_range=35)
        gita_bbox = gita_keyed.getbbox()
        if gita_bbox:
            pad = 8
            left = max(0, gita_bbox[0] - pad)
            top = max(0, gita_bbox[1] - pad)
            right = min(gita_keyed.width, gita_bbox[2] + pad)
            bottom = min(gita_keyed.height, gita_bbox[3] + pad)
            gita_keyed = gita_keyed.crop((left, top, right, bottom))
        gita_keyed.save(gita_out, "PNG")
        gita_keyed.save(gita_talk_out, "PNG")
        print(f"Saved gita_idle.png and gita_talk.png ({gita_keyed.size})")

    print("\n4. Processing 3 Menu Cards...")
    cards_src = BRAIN_DIR / "three_menu_cards_1788387290495.jpg"
    if cards_src.exists():
        cards = Image.open(cards_src)
        cards_keyed = key_magenta(cards, dist_thresh=85, fade_range=30)
        
        card_ranges = [
            ("card_mulai_bermain.png", (56, 120, 463, 650)),
            ("card_cara_bermain.png", (485, 120, 891, 650)),
            ("card_tentang_panduan.png", (914, 120, 1320, 650)),
        ]

        for filename, box in card_ranges:
            crop_card = cards_keyed.crop(box)
            c_bbox = crop_card.getbbox()
            if c_bbox:
                crop_card = crop_card.crop(c_bbox)
            out_p = ASSETS_DIR / "ui" / filename
            crop_card.save(out_p, "PNG")
            print(f"Saved {filename} ({crop_card.size})")

    print("\nAll assets processed successfully!")

if __name__ == "__main__":
    process_all()
