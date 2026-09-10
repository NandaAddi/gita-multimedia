"""
tools/pipeline/optimize_assets.py
Automated Web Game Asset Optimizer (Pillow Engine)
Mengompres visual assets runtime tanpa merusak master source di raw-assets/.
"""

import os
import sys
from pathlib import Path
from PIL import Image

# Safe terminal encoding on Windows
if hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

REPO_ROOT = Path(__file__).resolve().parents[2]
ASSETS_DIR = REPO_ROOT / "WEBSITE" / "assets"

# Spesifikasi resolusi optimal di layar game (Max Width x Max Height)
SPRITE_BUDGETS = {
    "organisms": (180, 180),          # Tampil di game 80-110px -> 180px super crisp di 4K IFP
    "characters": (350, 550),         # Gita tampil 265x444px
    "badges": (220, 220),             # Lencana perisai tim
    "icon_": (180, 180),              # Ikon skenario krisis
    "card_": (360, 460),              # Kartu aksi menu utama
    "title_billboard": (900, 450)     # Plakat judul
}

def optimize_png(img_path, target_max_size=None, max_colors=None):
    if not img_path.exists():
        return
    im = Image.open(img_path)
    orig_size = os.path.getsize(img_path)
    
    # 1. Resample jika melebihi budget tampilan game
    if target_max_size and (im.width > target_max_size[0] or im.height > target_max_size[1]):
        im.thumbnail(target_max_size, Image.Resampling.LANCZOS)
    
    # 2. Kuantisasi warna jika ditentukan
    if max_colors and im.mode in ('RGBA', 'LA'):
        alpha = im.split()[-1]
        rgb = im.convert('RGB').quantize(colors=max_colors, method=Image.Quantize.MEDIANCUT)
        im_opt = rgb.convert('RGBA')
        im_opt.putalpha(alpha)
    elif max_colors and im.mode == 'RGB':
        im_opt = im.quantize(colors=max_colors, method=Image.Quantize.MEDIANCUT)
    else:
        im_opt = im
        
    # 3. Simpan dengan kompresi zlib level 9 maksimal
    im_opt.save(img_path, 'PNG', optimize=True, compress_level=9)
    new_size = os.path.getsize(img_path)
    reduction = (1 - new_size / orig_size) * 100 if orig_size > 0 else 0
    print(f"  {img_path.name:30} : {orig_size/1024:6.1f} KB -> {new_size/1024:6.1f} KB (-{reduction:.1f}%)")

def run_optimization():
    print("=" * 65)
    print(" ECO-EXPLORER: WEB ASSET COMPRESSION PIPELINE")
    print("=" * 65)
    
    # 1. Organisme
    print("\n[1/5] Mengoptimasi Sprite Organisme Sawah (max 180px)...")
    org_dir = ASSETS_DIR / "organisms"
    for f in sorted(org_dir.glob("*.png")):
        optimize_png(f, SPRITE_BUDGETS["organisms"])
        
    # 2. Karakter Gita
    print("\n[2/5] Mengoptimasi Sprite Karakter Gita...")
    char_dir = ASSETS_DIR / "characters"
    for f in sorted(char_dir.glob("*.png")):
        if "backup" not in f.name:
            optimize_png(f, SPRITE_BUDGETS["characters"])
            
    # 3. Badges Lencana Tim
    print("\n[3/5] Mengoptimasi Lencana Tim (max 220px)...")
    badge_dir = ASSETS_DIR / "ui" / "badges"
    for f in sorted(badge_dir.glob("*.png")):
        optimize_png(f, SPRITE_BUDGETS["badges"])
        
    # 4. Ikon Misi & Kartu Menu UI
    print("\n[4/5] Mengoptimasi Ikon Misi & Kartu Menu...")
    ui_dir = ASSETS_DIR / "ui"
    for f in sorted(ui_dir.glob("*.png")):
        if f.name.startswith("icon_"):
            optimize_png(f, SPRITE_BUDGETS["icon_"])
        elif f.name.startswith("card_"):
            optimize_png(f, SPRITE_BUDGETS["card_"])
        elif "title_billboard" in f.name:
            optimize_png(f, SPRITE_BUDGETS["title_billboard"])
            
    # 5. Background Sawah
    print("\n[5/5] Mengoptimasi Panorama Background Sawah...")
    bg_path = ASSETS_DIR / "environment" / "background_sawah.png"
    if bg_path.exists():
        optimize_png(bg_path, target_max_size=(1920, 1080))

    print("\n" + "=" * 65)
    print(" KOMPRESI SELESAI!")
    print("=" * 65)

if __name__ == "__main__":
    run_optimization()
