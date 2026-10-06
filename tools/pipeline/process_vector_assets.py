import os
import sys
from pathlib import Path
from PIL import Image
from collections import deque

REPO_ROOT = Path(__file__).resolve().parents[2]
ARTIFACT_DIR = Path(r"C:\Users\Nanda Addi\.gemini\antigravity-ide\brain\f151bf8f-a84e-46bd-b987-5c27eb214547")
ASSETS_DIR = REPO_ROOT / "WEBSITE" / "assets"
RAW_ASSETS_DIR = REPO_ROOT / "raw-assets"

def flood_fill_transparent(img, threshold=245):
    """
    Flood fill starting from the outer borders to convert the white background into transparent.
    This safely protects internal white pixels (like eyes, sparkles, teeth, belly) from becoming transparent!
    """
    img = img.convert("RGBA")
    width, height = img.size
    pixels = img.load()
    
    visited = [[False] * height for _ in range(width)]
    queue = deque()
    
    # Enqueue all outer border pixels that are near white
    for x in range(width):
        for y in [0, height - 1]:
            r, g, b, a = pixels[x, y]
            if r >= threshold and g >= threshold and b >= threshold:
                queue.append((x, y))
                visited[x][y] = True
                
    for y in range(height):
        for x in [0, width - 1]:
            r, g, b, a = pixels[x, y]
            if not visited[x][y] and r >= threshold and g >= threshold and b >= threshold:
                queue.append((x, y))
                visited[x][y] = True
                
    while queue:
        cx, cy = queue.popleft()
        r, g, b, a = pixels[cx, cy]
        # Smooth alpha fade near edges
        diff = max(255 - r, 255 - g, 255 - b)
        if diff < 8:
            pixels[cx, cy] = (r, g, b, 0)
        else:
            alpha = int((diff / (255 - threshold)) * 255)
            pixels[cx, cy] = (r, g, b, min(255, max(0, alpha)))
            
        for nx, ny in [(cx-1, cy), (cx+1, cy), (cx, cy-1), (cx, cy+1)]:
            if 0 <= nx < width and 0 <= ny < height and not visited[nx][ny]:
                nr, ng, nb, na = pixels[nx, ny]
                if nr >= threshold and ng >= threshold and nb >= threshold:
                    visited[nx][ny] = True
                    queue.append((nx, ny))
                    
    # Auto-crop to bounding box
    bbox = img.getbbox()
    if bbox:
        # Add 4px breathing padding
        pad = 4
        bbox = (
            max(0, bbox[0] - pad),
            max(0, bbox[1] - pad),
            min(width, bbox[2] + pad),
            min(height, bbox[3] + pad)
        )
        img = img.crop(bbox)
        
    return img

def process_all():
    print("=" * 60)
    print(" PROCESSING MODERN 2D VECTOR ASSETS FOR ECO-EXPLORER")
    print("=" * 60)
    
    # 1. Gita Character (Use high-res vector master)
    gita_vector = ASSETS_DIR / "characters" / "gita_idle_vector_backup.png"
    if gita_vector.exists():
        img_gita = Image.open(gita_vector)
        img_gita.save(ASSETS_DIR / "characters" / "gita_idle.png")
        img_gita.save(ASSETS_DIR / "characters" / "gita_talk.png")
        img_gita.save(RAW_ASSETS_DIR / "characters" / "gito character1.png")
        print(" [OK] Updated Gita Character to Modern 2D Vector (idle & talk)")

    # 2. Background Panorama (16:9 1920x1080)
    bg_file = ARTIFACT_DIR / "vector_bg_sawah_1789204513252.jpg"
    if bg_file.exists():
        bg_img = Image.open(bg_file)
        bg_img = bg_img.resize((1920, 1080), Image.Resampling.LANCZOS)
        bg_target = ASSETS_DIR / "environment" / "background_sawah.png"
        bg_img.save(bg_target, "PNG")
        print(f" [OK] Processed & saved: {bg_target} (1920x1080)")

    # 3. Organisms (1:1 Transparent PNGs)
    organisms_map = {
        "tikus.png": "vector_tikus_1789204542597.jpg",
        "katak.png": "vector_katak_1789204562208.jpg",
        "ular.png": "vector_ular_1789204583048.jpg",
        "elang.png": "vector_elang_1789204605886.jpg",
        "padi_subur.png": "vector_padi_subur_1789204771629.jpg",
        "padi_kering.png": "vector_padi_kering_1789204800960.jpg",
        "jamur.png": "vector_jamur_1789204826951.jpg",
        "bangkai.png": "vector_bangkai_1789204850714.jpg",
    }
    
    for filename, art_name in organisms_map.items():
        src_path = ARTIFACT_DIR / art_name
        if src_path.exists():
            img = Image.open(src_path)
            transparent_img = flood_fill_transparent(img, threshold=242)
            # Resize nicely for crisp web display (e.g. 512x512 max)
            transparent_img.thumbnail((512, 512), Image.Resampling.LANCZOS)
            
            target_path = ASSETS_DIR / "organisms" / filename
            transparent_img.save(target_path, "PNG")
            
            # Also save to raw-assets for permanent repo storage
            raw_path = RAW_ASSETS_DIR / "organisms" / filename
            transparent_img.save(raw_path, "PNG")
            
            print(f" [OK] Processed & saved organism: {filename} ({transparent_img.width}x{transparent_img.height})")

    # 4. Title Billboard
    billboard_file = ARTIFACT_DIR / "vector_title_billboard_1789205322951.jpg"
    if billboard_file.exists():
        bb_img = Image.open(billboard_file)
        transparent_bb = flood_fill_transparent(bb_img, threshold=240)
        # Keep crisp high-res
        transparent_bb.thumbnail((1280, 640), Image.Resampling.LANCZOS)
        bb_target = ASSETS_DIR / "ui" / "title_billboard.png"
        transparent_bb.save(bb_target, "PNG")
        print(f" [OK] Processed & saved title billboard: {bb_target} ({transparent_bb.width}x{transparent_bb.height})")

    print("\n[DONE] All modern 2D vector assets processed successfully!")

if __name__ == "__main__":
    process_all()
