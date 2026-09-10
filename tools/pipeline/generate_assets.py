import os
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

REPO_ROOT = Path(__file__).resolve().parents[2]
BASE_DIR = str(REPO_ROOT / "WEBSITE" / "assets")
def ensure_dirs():
    for sub in ["characters", "organisms", "environment", "ui", "ui/badges"]:
        os.makedirs(os.path.join(BASE_DIR, sub), exist_ok=True)

def create_pixel_grid(width, height, scale=4):
    """Creates an image at low res then scales up using NEAREST to get authentic pixel art."""
    img = Image.new("RGBA", (width, height), (0, 0, 0, 0))
    return img

def save_scaled(img, path, scale=4):
    scaled = img.resize((img.width * scale, img.height * scale), resample=Image.NEAREST)
    scaled.save(path)
    print(f"Saved: {path} ({scaled.width}x{scaled.height})")

def make_kiki_idle():
    # 32x32 pixel art scaled 4x to 128x128
    img = create_pixel_grid(32, 32)
    d = ImageDraw.Draw(img)
    
    # Explorer hat (safari/detective khaki)
    d.rectangle([9, 4, 22, 6], fill=(180, 140, 80, 255))
    d.rectangle([6, 7, 25, 9], fill=(150, 110, 50, 255))
    d.rectangle([10, 7, 21, 8], fill=(50, 120, 60, 255)) # green hatband
    
    # Head / Face
    d.rectangle([10, 10, 21, 19], fill=(255, 218, 185, 255))
    # Hair (brown)
    d.rectangle([9, 9, 22, 11], fill=(90, 50, 20, 255))
    d.rectangle([8, 11, 9, 14], fill=(90, 50, 20, 255))
    d.rectangle([22, 11, 23, 14], fill=(90, 50, 20, 255))
    
    # Eyes (big anime/retro pixel eyes)
    d.rectangle([12, 13, 13, 15], fill=(30, 30, 30, 255))
    d.point((12, 13), fill=(255, 255, 255, 255)) # highlight
    d.rectangle([18, 13, 19, 15], fill=(30, 30, 30, 255))
    d.point((18, 13), fill=(255, 255, 255, 255))
    
    # Blush
    d.point((11, 16), fill=(255, 140, 140, 255))
    d.point((20, 16), fill=(255, 140, 140, 255))
    # Smile
    d.line([(14, 17), (17, 17)], fill=(160, 70, 70, 255))
    
    # Clothes (Green Scout/Detective Vest over white shirt)
    d.rectangle([11, 20, 20, 26], fill=(240, 240, 240, 255))
    d.rectangle([9, 20, 11, 26], fill=(46, 125, 50, 255))  # vest left
    d.rectangle([20, 20, 22, 26], fill=(46, 125, 50, 255)) # vest right
    d.point((15, 21), fill=(200, 100, 40, 255)) # scout necktie
    d.point((15, 22), fill=(200, 100, 40, 255))
    
    # Magnifying Glass in hand
    d.ellipse([23, 17, 29, 23], outline=(100, 100, 100, 255), fill=(200, 240, 255, 180))
    d.line([(24, 22), (22, 25)], fill=(139, 69, 19, 255), width=2)
    
    # Shorts (Khaki)
    d.rectangle([11, 26, 20, 28], fill=(139, 105, 20, 255))
    # Legs & Shoes
    d.rectangle([12, 28, 14, 30], fill=(255, 218, 185, 255))
    d.rectangle([17, 28, 19, 30], fill=(255, 218, 185, 255))
    d.rectangle([11, 30, 14, 31], fill=(60, 40, 20, 255))
    d.rectangle([17, 30, 20, 31], fill=(60, 40, 20, 255))
    
    save_scaled(img, os.path.join(BASE_DIR, "characters", "kiki_idle.png"), 4)

def make_kiki_talk():
    img = create_pixel_grid(32, 32)
    d = ImageDraw.Draw(img)
    # Similar to idle, but mouth open in excitement and waving hand
    d.rectangle([9, 4, 22, 6], fill=(180, 140, 80, 255))
    d.rectangle([6, 7, 25, 9], fill=(150, 110, 50, 255))
    d.rectangle([10, 7, 21, 8], fill=(50, 120, 60, 255))
    d.rectangle([10, 10, 21, 19], fill=(255, 218, 185, 255))
    d.rectangle([9, 9, 22, 11], fill=(90, 50, 20, 255))
    d.rectangle([8, 11, 9, 14], fill=(90, 50, 20, 255))
    d.rectangle([22, 11, 23, 14], fill=(90, 50, 20, 255))
    
    # Eyes happy curve ^ ^
    d.line([(12, 14), (13, 13), (14, 14)], fill=(30, 30, 30, 255))
    d.line([(17, 14), (18, 13), (19, 14)], fill=(30, 30, 30, 255))
    # Open happy mouth :D
    d.rectangle([14, 16, 17, 18], fill=(180, 30, 30, 255))
    d.point((15, 17), fill=(255, 120, 120, 255)) # tongue
    
    d.rectangle([11, 20, 20, 26], fill=(240, 240, 240, 255))
    d.rectangle([9, 20, 11, 26], fill=(46, 125, 50, 255))
    d.rectangle([20, 20, 22, 26], fill=(46, 125, 50, 255))
    # Waving hand
    d.rectangle([5, 15, 8, 19], fill=(255, 218, 185, 255))
    
    d.rectangle([11, 26, 20, 28], fill=(139, 105, 20, 255))
    d.rectangle([12, 28, 14, 30], fill=(255, 218, 185, 255))
    d.rectangle([17, 28, 19, 30], fill=(255, 218, 185, 255))
    d.rectangle([11, 30, 14, 31], fill=(60, 40, 20, 255))
    d.rectangle([17, 30, 20, 31], fill=(60, 40, 20, 255))
    save_scaled(img, os.path.join(BASE_DIR, "characters", "kiki_talk.png"), 4)

def make_padi_subur():
    img = create_pixel_grid(24, 24)
    d = ImageDraw.Draw(img)
    # Lush green stems curving with golden rice grains
    d.line([(12, 23), (12, 10)], fill=(34, 197, 94, 255), width=2)
    d.line([(12, 15), (7, 8)], fill=(34, 197, 94, 255), width=1)
    d.line([(12, 14), (17, 7)], fill=(34, 197, 94, 255), width=1)
    
    # Golden rice panicles (drooping grain heads)
    grains = [(6, 7), (5, 8), (4, 10), (7, 6), (16, 6), (18, 7), (19, 9), (17, 5), (11, 7), (12, 5), (13, 3)]
    for gx, gy in grains:
        d.rectangle([gx, gy, gx+1, gy+1], fill=(245, 158, 11, 255))
        d.point((gx, gy), fill=(254, 240, 138, 255))
    # Green leaves
    d.line([(12, 19), (4, 15)], fill=(22, 163, 74, 255), width=1)
    d.line([(12, 18), (20, 14)], fill=(22, 163, 74, 255), width=1)
    save_scaled(img, os.path.join(BASE_DIR, "organisms", "padi_subur.png"), 4)

def make_padi_kering():
    img = create_pixel_grid(24, 24)
    d = ImageDraw.Draw(img)
    # Bent dry brown stems
    d.line([(12, 23), (13, 16), (17, 12)], fill=(161, 98, 7, 255), width=2)
    d.line([(13, 16), (9, 13), (6, 15)], fill=(180, 120, 40, 255), width=1)
    # Withered yellowish dry tips
    grains = [(18, 12), (19, 14), (20, 16), (6, 16), (5, 17), (14, 11)]
    for gx, gy in grains:
        d.rectangle([gx, gy, gx+1, gy+1], fill=(113, 63, 18, 255))
        d.point((gx, gy), fill=(202, 138, 4, 255))
    save_scaled(img, os.path.join(BASE_DIR, "organisms", "padi_kering.png"), 4)

def make_tikus():
    img = create_pixel_grid(24, 24)
    d = ImageDraw.Draw(img)
    # Cute retro rat
    # Body
    d.ellipse([7, 10, 17, 19], fill=(120, 113, 108, 255))
    # Head & snout
    d.polygon([(15, 12), (21, 16), (15, 18)], fill=(168, 162, 158, 255))
    d.point((21, 16), fill=(244, 114, 182, 255)) # pink nose
    # Eye
    d.point((17, 14), fill=(20, 20, 20, 255))
    # Ear
    d.ellipse([12, 7, 16, 12], fill=(244, 114, 182, 255))
    # Tail
    d.line([(7, 16), (3, 14), (2, 10)], fill=(244, 114, 182, 255), width=1)
    # Feet
    d.rectangle([9, 19, 11, 21], fill=(244, 114, 182, 255))
    d.rectangle([15, 19, 17, 21], fill=(244, 114, 182, 255))
    save_scaled(img, os.path.join(BASE_DIR, "organisms", "tikus.png"), 4)

def make_katak():
    img = create_pixel_grid(24, 24)
    d = ImageDraw.Draw(img)
    # Cute green frog
    # Body
    d.ellipse([6, 10, 18, 20], fill=(34, 197, 94, 255))
    d.ellipse([8, 13, 16, 19], fill=(220, 252, 231, 255)) # yellow-green belly
    # Eyes bulging
    d.ellipse([6, 6, 10, 10], fill=(74, 222, 128, 255))
    d.ellipse([14, 6, 18, 10], fill=(74, 222, 128, 255))
    d.point((8, 8), fill=(10, 10, 10, 255))
    d.point((16, 8), fill=(10, 10, 10, 255))
    # Smile
    d.line([(10, 12), (14, 12)], fill=(22, 101, 52, 255))
    # Webbed legs
    d.rectangle([3, 15, 6, 20], fill=(22, 163, 74, 255))
    d.rectangle([18, 15, 21, 20], fill=(22, 163, 74, 255))
    save_scaled(img, os.path.join(BASE_DIR, "organisms", "katak.png"), 4)

def make_ular():
    img = create_pixel_grid(24, 24)
    d = ImageDraw.Draw(img)
    # S-curve sawah snake
    points = [(5, 18), (8, 20), (12, 18), (15, 15), (12, 11), (15, 8), (19, 8)]
    for i in range(len(points)-1):
        d.line([points[i], points[i+1]], fill=(13, 148, 136, 255), width=3)
    # Head
    d.ellipse([17, 6, 22, 11], fill=(15, 118, 110, 255))
    d.point((19, 8), fill=(254, 240, 138, 255)) # yellow eye
    d.point((20, 8), fill=(10, 10, 10, 255))
    # Forked red tongue
    d.line([(22, 9), (24, 8)], fill=(239, 68, 68, 255))
    d.line([(22, 9), (24, 10)], fill=(239, 68, 68, 255))
    # Pattern spots
    d.point((9, 19), fill=(250, 204, 21, 255))
    d.point((13, 14), fill=(250, 204, 21, 255))
    save_scaled(img, os.path.join(BASE_DIR, "organisms", "ular.png"), 4)

def make_elang():
    img = create_pixel_grid(28, 28)
    d = ImageDraw.Draw(img)
    # Majestic flying eagle with spread wings
    # Body
    d.ellipse([11, 8, 17, 20], fill=(120, 53, 15, 255))
    # White head
    d.ellipse([11, 5, 17, 11], fill=(245, 245, 245, 255))
    d.polygon([(14, 9), (18, 11), (14, 12)], fill=(245, 158, 11, 255)) # curved golden beak
    d.point((13, 7), fill=(20, 20, 20, 255))
    # Left Wing
    d.polygon([(11, 10), (1, 4), (3, 13), (11, 14)], fill=(146, 64, 14, 255))
    d.line([(1, 4), (4, 7), (7, 10)], fill=(180, 83, 9, 255))
    # Right Wing
    d.polygon([(17, 10), (27, 4), (25, 13), (17, 14)], fill=(146, 64, 14, 255))
    # Tail fan
    d.polygon([(11, 19), (14, 25), (17, 19)], fill=(245, 245, 245, 255))
    # Talons
    d.point((12, 19), fill=(245, 158, 11, 255))
    d.point((15, 19), fill=(245, 158, 11, 255))
    save_scaled(img, os.path.join(BASE_DIR, "organisms", "elang.png"), 4)

def make_jamur():
    img = create_pixel_grid(24, 24)
    d = ImageDraw.Draw(img)
    # Glowing decomposer mushroom
    # Stem
    d.rectangle([10, 12, 14, 21], fill=(243, 232, 255, 255))
    # Cap (glowing purple/red)
    d.chord([4, 4, 20, 16], start=180, end=0, fill=(168, 85, 247, 255))
    # Glowing spots
    d.point((8, 8), fill=(255, 255, 255, 255))
    d.point((15, 8), fill=(255, 255, 255, 255))
    d.point((11, 6), fill=(255, 255, 255, 255))
    # Spores floating
    d.point((3, 6), fill=(192, 132, 252, 200))
    d.point((21, 7), fill=(192, 132, 252, 200))
    d.point((6, 3), fill=(192, 132, 252, 200))
    d.point((18, 4), fill=(192, 132, 252, 200))
    save_scaled(img, os.path.join(BASE_DIR, "organisms", "jamur.png"), 4)

def make_bangkai():
    img = create_pixel_grid(24, 24)
    d = ImageDraw.Draw(img)
    # Pile of organic residue / withered straw for composting
    d.rectangle([5, 17, 19, 21], fill=(120, 80, 40, 255))
    d.line([(4, 18), (11, 14), (18, 16)], fill=(160, 110, 50, 255), width=2)
    d.line([(8, 15), (14, 12), (20, 18)], fill=(180, 140, 70, 255), width=1)
    d.point((12, 13), fill=(130, 90, 40, 255))
    save_scaled(img, os.path.join(BASE_DIR, "organisms", "bangkai.png"), 4)

def make_environment():
    # 480x270 scaled 4x = 1920x1080 native 16:9 pixel art landscape
    w, h = 480, 270
    img = Image.new("RGBA", (w, h), (0, 0, 0, 255))
    d = ImageDraw.Draw(img)
    
    # Sky gradient (Clear tropical morning in Malang)
    for y in range(0, 130):
        r = int(120 + (y / 130) * 80)
        g = int(190 + (y / 130) * 50)
        b = int(240 + (y / 130) * 15)
        d.line([(0, y), (w, y)], fill=(r, g, b, 255))
        
    # Fluffy pixel clouds
    clouds = [(40, 30, 100), (220, 20, 120), (380, 40, 80)]
    for cx, cy, clen in clouds:
        d.rectangle([cx, cy, cx + clen, cy + 14], fill=(255, 255, 255, 200))
        d.rectangle([cx + 10, cy - 6, cx + clen - 10, cy + 18], fill=(255, 255, 255, 220))
        
    # Majestic Mountain in background (Gunung Semeru / Arjuno)
    mountain_pts = [(60, 140), (160, 60), (260, 140)]
    d.polygon(mountain_pts, fill=(100, 130, 180, 255))
    # Mountain shadow & snow/mist peak
    d.polygon([(160, 60), (160, 140), (260, 140)], fill=(80, 110, 160, 255))
    d.polygon([(150, 68), (160, 60), (170, 70), (160, 75)], fill=(220, 240, 255, 200))
    
    # Second smaller ridge
    d.polygon([(220, 140), (310, 85), (400, 140)], fill=(120, 160, 160, 255))
    
    # Distant palm trees & forest line (horizon)
    d.rectangle([0, 125, w, 145], fill=(34, 85, 45, 255))
    for px in range(10, w, 25):
        d.line([(px, 140), (px, 118)], fill=(70, 45, 20, 255), width=2)
        d.polygon([(px-8, 120), (px, 112), (px+8, 120)], fill=(40, 120, 50, 255))
        
    # Rice Terraces (Terasering Sawah Hijau)
    terrace_bands = [
        (140, 165, (34, 197, 94), (22, 163, 74)),
        (165, 195, (74, 222, 128), (21, 128, 61)),
        (195, 230, (22, 163, 74), (20, 83, 45)),
    ]
    for y1, y2, c1, c2 in terrace_bands:
        d.rectangle([0, y1, w, y2], fill=c1)
        # Ridge embankment (pematang sawah)
        d.line([(0, y2), (w, y2)], fill=(120, 80, 40), width=3)
        # Small irrigation water canal
        d.line([(0, y2-2), (w, y2-2)], fill=(56, 189, 248), width=2)
        # Paddy tufts pattern
        for tx in range(5, w, 12):
            for ty in range(y1+4, y2-4, 8):
                d.line([(tx, ty+4), (tx, ty)], fill=c2, width=1)
                d.point((tx-1, ty+1), fill=c2)
                d.point((tx+1, ty+1), fill=c2)
                
    # Foreground Dark Loam Soil (Lapisan Tanah Dekomposer & Akar)
    d.rectangle([0, 230, w, h], fill=(80, 50, 25, 255))
    d.line([(0, 230), (w, 230)], fill=(130, 90, 50, 255), width=2)
    for fx in range(8, w, 15):
        d.point((fx, 242), fill=(110, 75, 40, 255))
        d.point((fx+4, 255), fill=(60, 35, 15, 255))
        
    save_scaled(img, os.path.join(BASE_DIR, "environment", "background_sawah.png"), 4)

def make_ui_elements():
    # 1. Dialog Box (512x160)
    img = Image.new("RGBA", (512, 160), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    # Dark slate background with high opacity
    d.rounded_rectangle([4, 4, 508, 156], radius=12, fill=(15, 23, 42, 235), outline=(245, 158, 11, 255), width=4)
    d.rounded_rectangle([8, 8, 504, 152], radius=8, outline=(254, 240, 138, 255), width=2)
    # Gold decorative corners
    for cx, cy in [(14, 14), (494, 14), (14, 142), (494, 142)]:
        d.rectangle([cx-4, cy-4, cx+4, cy+4], fill=(245, 158, 11, 255))
    img.save(os.path.join(BASE_DIR, "ui", "dialog_box.png"))
    print("Saved dialog_box.png")

    # 2. Icons (80x80)
    icons = [
        ("icon_kemarau.png", (245, 158, 11), "☀️"),
        ("icon_pestisida.png", (239, 68, 68), "☠️"),
        ("icon_perburuan.png", (168, 85, 247), "🎯"),
        ("icon_irigasi.png", (59, 130, 246), "💧"),
        ("icon_jamur_spora.png", (16, 185, 129), "🍄")
    ]
    for filename, border_col, symbol in icons:
        ico = Image.new("RGBA", (80, 80), (0, 0, 0, 0))
        idraw = ImageDraw.Draw(ico)
        idraw.rounded_rectangle([2, 2, 78, 78], radius=12, fill=(30, 41, 59, 240), outline=border_col, width=4)
        # Inner glow
        idraw.rounded_rectangle([6, 6, 74, 74], radius=8, outline=(255, 255, 255, 60), width=1)
        ico.save(os.path.join(BASE_DIR, "ui", filename))
        print(f"Saved {filename}")

    # 3. Badges (120x120)
    badges = [
        ("badge_elang.png", "TIM ELANG", (239, 68, 68), (254, 202, 202)),
        ("badge_ular.png", "TIM ULAR", (13, 148, 136), (204, 251, 241)),
        ("badge_katak.png", "TIM KATAK", (34, 197, 94), (220, 252, 231)),
        ("badge_padi.png", "TIM PADI", (245, 158, 11), (254, 243, 199)),
        ("badge_jamur.png", "TIM JAMUR", (168, 85, 247), (243, 232, 255))
    ]
    for bfile, btitle, col1, col2 in badges:
        bimg = Image.new("RGBA", (120, 120), (0, 0, 0, 0))
        bdraw = ImageDraw.Draw(bimg)
        # Gold medal star shield
        bdraw.regular_polygon((60, 60, 52), n_sides=6, fill=col2, outline=col1)
        bdraw.regular_polygon((60, 60, 44), n_sides=6, outline=(245, 158, 11, 255))
        bimg.save(os.path.join(BASE_DIR, "ui", "badges", bfile))
        print(f"Saved {bfile}")

if __name__ == "__main__":
    ensure_dirs()
    make_kiki_idle()
    make_kiki_talk()
    make_padi_subur()
    make_padi_kering()
    make_tikus()
    make_katak()
    make_ular()
    make_elang()
    make_jamur()
    make_bangkai()
    make_environment()
    make_ui_elements()
    print("ALL PIXEL ART ASSETS GENERATED SUCCESSFULLY!")
