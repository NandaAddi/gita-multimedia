"""
tools/pipeline/process_all_new_assets.py
Comprehensive Master Visual Asset Processor & Optimizer for Eco-Explorer.
Processes all 63 newly generated assets from D:/SKRIPSI GITA/ASSET-BARU.
- Converts solid white/magenta/black backgrounds into transparent RGBA.
- Squares & centers organism sprites to eliminate distortion on IFP touchscreens.
- Resizes panoramas to native 1080p (1920x1080).
- Splits composite sets (menu cards & biome medals).
- Places all optimized assets into WEBSITE/assets/ subdirectories.
"""

import os
import sys
import math
from pathlib import Path
from collections import deque
from PIL import Image

# Terminal encoding for Windows
if hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

REPO_ROOT = Path(__file__).resolve().parents[2]
ASSET_BARU_DIR = Path(r"D:\SKRIPSI GITA\ASSET-BARU")
ASSETS_DIR = REPO_ROOT / "WEBSITE" / "assets"

def ensure_dirs():
    for sub in ["characters", "environment", "organisms", "ui", "ui/badges", "kamus"]:
        (ASSETS_DIR / sub).mkdir(parents=True, exist_ok=True)

def flood_fill_white(img, threshold=242):
    """
    Flood fill from all 4 image borders to convert white background to transparent.
    Safely preserves internal white pixels (eyes, teeth, highlights, belly).
    """
    img = img.convert("RGBA")
    width, height = img.size
    pixels = img.load()
    visited = [[False] * height for _ in range(width)]
    queue = deque()

    # Border pixels
    for x in range(width):
        for y in [0, height - 1]:
            r, g, b, _ = pixels[x, y]
            if r >= threshold and g >= threshold and b >= threshold:
                queue.append((x, y))
                visited[x][y] = True

    for y in range(height):
        for x in [0, width - 1]:
            if not visited[x][y]:
                r, g, b, _ = pixels[x, y]
                if r >= threshold and g >= threshold and b >= threshold:
                    queue.append((x, y))
                    visited[x][y] = True

    while queue:
        cx, cy = queue.popleft()
        r, g, b, _ = pixels[cx, cy]
        diff = max(255 - r, 255 - g, 255 - b)
        if diff < 10:
            pixels[cx, cy] = (r, g, b, 0)
        else:
            alpha = int((diff / (255 - threshold)) * 255)
            pixels[cx, cy] = (r, g, b, min(255, max(0, alpha)))

        for nx, ny in [(cx - 1, cy), (cx + 1, cy), (cx, cy - 1), (cx, cy + 1)]:
            if 0 <= nx < width and 0 <= ny < height and not visited[nx][ny]:
                nr, ng, nb, _ = pixels[nx, ny]
                if nr >= threshold and ng >= threshold and nb >= threshold:
                    visited[nx][ny] = True
                    queue.append((nx, ny))

    bbox = img.getbbox()
    if bbox:
        pad = 6
        crop_box = (
            max(0, bbox[0] - pad),
            max(0, bbox[1] - pad),
            min(width, bbox[2] + pad),
            min(height, bbox[3] + pad)
        )
        img = img.crop(crop_box)
    return img

def square_and_center(img, target_size=(256, 256), padding_ratio=0.06):
    """
    Centers the transparent graphic within a square transparent canvas.
    Prevents Phaser setDisplaySize(w, h) from squashing or stretching non-square graphics!
    """
    w, h = img.size
    max_dim = max(w, h)
    pad = int(max_dim * padding_ratio)
    canvas_dim = max_dim + (pad * 2)

    square_canvas = Image.new("RGBA", (canvas_dim, canvas_dim), (0, 0, 0, 0))
    offset_x = (canvas_dim - w) // 2
    offset_y = (canvas_dim - h) // 2
    square_canvas.paste(img, (offset_x, offset_y), img)

    if target_size:
        square_canvas = square_canvas.resize(target_size, Image.Resampling.LANCZOS)
    return square_canvas

def key_magenta(im, dist_thresh=90, fade_range=35):
    """Smooth chroma key for magenta background (#FF00FF) with green despill."""
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

def key_black(im, threshold=35, fade_range=20):
    """Remove pure black background cleanly from border outward."""
    im = im.convert('RGBA')
    width, height = im.size
    pixels = im.load()
    visited = [[False] * height for _ in range(width)]
    queue = deque()

    for x in range(width):
        for y in [0, height - 1]:
            r, g, b, _ = pixels[x, y]
            if r <= threshold and g <= threshold and b <= threshold:
                queue.append((x, y))
                visited[x][y] = True

    for y in range(height):
        for x in [0, width - 1]:
            if not visited[x][y]:
                r, g, b, _ = pixels[x, y]
                if r <= threshold and g <= threshold and b <= threshold:
                    queue.append((x, y))
                    visited[x][y] = True

    while queue:
        cx, cy = queue.popleft()
        r, g, b, _ = pixels[cx, cy]
        brightness = max(r, g, b)
        if brightness < threshold - fade_range:
            pixels[cx, cy] = (0, 0, 0, 0)
        else:
            alpha = int(((brightness - (threshold - fade_range)) / fade_range) * 255)
            pixels[cx, cy] = (r, g, b, min(255, max(0, alpha)))

        for nx, ny in [(cx - 1, cy), (cx + 1, cy), (cx, cy - 1), (cx, cy + 1)]:
            if 0 <= nx < width and 0 <= ny < height and not visited[nx][ny]:
                nr, ng, nb, _ = pixels[nx, ny]
                if nr <= threshold and ng <= threshold and nb <= threshold:
                    visited[nx][ny] = True
                    queue.append((nx, ny))

    bbox = im.getbbox()
    if bbox:
        im = im.crop(bbox)
    return im

def find_file(prefix):
    for f in ASSET_BARU_DIR.iterdir():
        if f.is_file() and prefix in f.name:
            return f
    raise FileNotFoundError(f"File with prefix '{prefix}' not found in {ASSET_BARU_DIR}")

def run_pipeline():
    ensure_dirs()
    print("=" * 70)
    print("  ECO-EXPLORER: COMPREHENSIVE ASSET INGESTION & OPTIMIZATION")
    print("=" * 70)

    # -------------------------------------------------------------
    # 1. GITA CHARACTERS
    # -------------------------------------------------------------
    print("\n[1/10] Memproses Karakter Gita (Modern 2D Vector)...")
    
    # 1.1 Gita Idle (Full Body)
    f_idle = find_file("Girl_waving")
    im_idle = flood_fill_white(Image.open(f_idle))
    # Optimize height to 600px while maintaining exact aspect ratio
    h_target = 600
    w_target = int(im_idle.width * (h_target / im_idle.height))
    im_idle = im_idle.resize((w_target, h_target), Image.Resampling.LANCZOS)
    out_idle = ASSETS_DIR / "characters" / "gita_idle.png"
    im_idle.save(out_idle, "PNG", optimize=True)
    print(f"  -> gita_idle.png: {im_idle.size} ({out_idle.stat().st_size/1024:.1f} KB)")

    # 1.2 Gita Talk (Dialogue Avatar)
    f_talk = find_file("Cartoon_student_detective_avatar")
    im_talk = flood_fill_white(Image.open(f_talk))
    im_talk = square_and_center(im_talk, target_size=(320, 320))
    out_talk = ASSETS_DIR / "characters" / "gita_talk.png"
    im_talk.save(out_talk, "PNG", optimize=True)
    print(f"  -> gita_talk.png: {im_talk.size} ({out_talk.stat().st_size/1024:.1f} KB)")

    # 1.3 Gita Think
    f_think = find_file("Student_detective_thinking_of_idea")
    im_think = flood_fill_white(Image.open(f_think))
    im_think = square_and_center(im_think, target_size=(350, 350))
    out_think = ASSETS_DIR / "characters" / "gita_think.png"
    im_think.save(out_think, "PNG", optimize=True)
    print(f"  -> gita_think.png: {im_think.size}")

    # 1.4 Gita Cheer
    f_cheer = find_file("Student_detective_celebrating_vi")
    im_cheer = flood_fill_white(Image.open(f_cheer))
    im_cheer = square_and_center(im_cheer, target_size=(350, 350))
    out_cheer = ASSETS_DIR / "characters" / "gita_cheer.png"
    im_cheer.save(out_cheer, "PNG", optimize=True)
    print(f"  -> gita_cheer.png: {im_cheer.size}")

    # 1.5 Gita Thumbs Up
    f_thumbs = find_file("Student_detective_giving_thumbs_up")
    im_thumbs = flood_fill_white(Image.open(f_thumbs))
    im_thumbs = square_and_center(im_thumbs, target_size=(350, 350))
    out_thumbs = ASSETS_DIR / "characters" / "gita_thumbsup.png"
    im_thumbs.save(out_thumbs, "PNG", optimize=True)
    print(f"  -> gita_thumbsup.png: {im_thumbs.size}")

    # 1.6 Expression Sheet
    f_expr = find_file("Character_expression_sheet_stude")
    im_expr = Image.open(f_expr)
    out_expr = ASSETS_DIR / "characters" / "gita_expression_sheet.png"
    im_expr.save(out_expr, "PNG", optimize=True)
    print(f"  -> gita_expression_sheet.png: {im_expr.size}")

    # -------------------------------------------------------------
    # 2. PANORAMA BACKGROUNDS (1920x1080)
    # -------------------------------------------------------------
    print("\n[2/10] Memproses 4 Panorama Latar Belakang (1920x1080)...")
    bg_targets = [
        ("Indonesian_rice_fields_landscape", "background_sawah.png"),
        ("Indonesian_tropical_rainforest", "background_hutan.png"),
        ("Tropical_coral_reef_underwater", "background_laut.png"),
        ("Vector_illustration_of_freshwate", "background_danau.png"),
    ]
    for prefix, out_name in bg_targets:
        f_bg = find_file(prefix)
        im_bg = Image.open(f_bg).resize((1920, 1080), Image.Resampling.LANCZOS)
        out_p = ASSETS_DIR / "environment" / out_name
        im_bg.save(out_p, "PNG", optimize=True)
        print(f"  -> {out_name}: (1920, 1080) ({out_p.stat().st_size/1024:.1f} KB)")

    # -------------------------------------------------------------
    # 3. ORGANISME SAWAH (256x256 Square Centered)
    # -------------------------------------------------------------
    print("\n[3/10] Memproses 8 Organisme Sawah (256x256)...")
    sawah_organisms = [
        ("Rice_paddy_stalk_illustration", "padi_subur.png"),
        ("Withered_rice_paddy_stalk", "padi_kering.png"),
        ("Field_mouse_crouching_illustration", "tikus.png"),
        ("Green_tree_frog_crouching", "katak.png"),
        ("Green_garden_snake_crawling", "ular.png"),
        ("Hawk-eagle_gliding_in_flight", "elang.png"),
        ("Mushroom_cluster_vector_illustra", "jamur.png"),
        ("Compost_pile_illustration", "bangkai.png"),
    ]
    for prefix, out_name in sawah_organisms:
        f_org = find_file(prefix)
        im_org = flood_fill_white(Image.open(f_org))
        im_org = square_and_center(im_org, target_size=(256, 256))
        out_p = ASSETS_DIR / "organisms" / out_name
        im_org.save(out_p, "PNG", optimize=True)
        print(f"  -> {out_name}: {im_org.size} ({out_p.stat().st_size/1024:.1f} KB)")

    # -------------------------------------------------------------
    # 4. ORGANISME MULTI-BIOMA (LAUT, HUTAN, DANAU)
    # -------------------------------------------------------------
    print("\n[4/10] Memproses 14 Organisme Multi-Bioma (256x256)...")
    multi_organisms = [
        # Laut
        ("Tropical_coral_reef_illustration", "karang.png"),
        ("Damselfish_vector_sprite", "ikan_kecil.png"),
        ("Green_sea_turtle_swimming", "penyu.png"),
        ("Shark_swimming_on_white_background", "hiu.png"),
        ("Sea_cucumber_resting_on_sand", "pengurai_laut.png"),
        # Hutan
        ("Tropical_rainforest_canopy_tree", "pohon_hutan.png"),
        ("Spotted_deer_vector_cartoon", "rusa.png"),
        ("Heroic_tiger_standing_proud", "harimau.png"),
        ("Mushroom_cluster_on_mossy_log", "jamur_hutan.png"),
        # Danau
        ("Pink_lotus_water_lily_illustration", "teratai.png"),
        ("Friendly_freshwater_snail", "keong.png"),
        ("Snakehead_fish_swimming", "ikan_gabus.png"),
        ("White_heron_standing_in_water", "bangau.png"),
        ("Water_hyacinth_plant_illustration", "eceng_gondok.png"),
    ]
    for prefix, out_name in multi_organisms:
        f_org = find_file(prefix)
        im_org = flood_fill_white(Image.open(f_org))
        im_org = square_and_center(im_org, target_size=(256, 256))
        out_p = ASSETS_DIR / "organisms" / out_name
        im_org.save(out_p, "PNG", optimize=True)
        print(f"  -> {out_name}: {im_org.size}")

    # -------------------------------------------------------------
    # 5. LENCANA 5 KELOMPOK DETEKTIF SAWAH (256x256)
    # -------------------------------------------------------------
    print("\n[5/10] Memproses Lencana 5 Kelompok Detektif (256x256)...")
    team_badges = [
        ("Eagle_team_detective_medal", "badge_elang.png"),
        ("Snake_Team_detective_medal", "badge_ular.png"),
        ("Frog_team_detective_medal_badge", "badge_katak.png"),
        ("Rice_paddy_team_vector_badge", "badge_padi.png"),
        ("Detective_team_mushroom_medal", "badge_jamur.png"),
    ]
    for prefix, out_name in team_badges:
        f_badge = find_file(prefix)
        im_badge = flood_fill_white(Image.open(f_badge))
        im_badge = square_and_center(im_badge, target_size=(256, 256))
        out_p = ASSETS_DIR / "ui" / "badges" / out_name
        im_badge.save(out_p, "PNG", optimize=True)
        print(f"  -> {out_name}: {im_badge.size}")

    # -------------------------------------------------------------
    # 6. LENCANA 4 BIOMA (SPLIT DARI GRID 2x2)
    # -------------------------------------------------------------
    print("\n[6/10] Memproses Lencana 4 Bioma Nusantara...")
    f_grid = find_file("Vector_biome_game_medals_grid")
    im_grid = Image.open(f_grid)
    gw, gh = im_grid.size
    biome_quads = [
        ("badge_sawah.png", (0, 0, gw // 2, gh // 2)),
        ("badge_laut.png", (gw // 2, 0, gw, gh // 2)),
        ("badge_hutan.png", (0, gh // 2, gw // 2, gh)),
        ("badge_danau.png", (gw // 2, gh // 2, gw, gh)),
    ]
    for out_name, quad_box in biome_quads:
        crop_q = im_grid.crop(quad_box)
        crop_clean = flood_fill_white(crop_q)
        crop_clean = square_and_center(crop_clean, target_size=(256, 256))
        out_p = ASSETS_DIR / "ui" / "badges" / out_name
        crop_clean.save(out_p, "PNG", optimize=True)
        print(f"  -> {out_name}: {crop_clean.size}")

    # -------------------------------------------------------------
    # 7. IKON KRISIS SAWAH & MULTI-BIOMA (220x220)
    # -------------------------------------------------------------
    print("\n[7/10] Memproses Ikon Krisis & Bahaya Lingkungan (220x220)...")
    crisis_icons = [
        # Sawah
        ("Mouse_silhouette_alert_badge", "icon_perburuan.png"),
        ("Pesticide_danger_alert_badge", "icon_pestisida.png"),
        ("Drought_alert_badge", "icon_kemarau.png"),
        ("Mushroom_fertilizing_soil_badge", "icon_jamur_spora.png"),
        # Multi-bioma
        ("Coral_reef_blast_fishing_warning", "icon_bom_laut.png"),
        ("Ocean_plastic_pollution_badge", "icon_plastik_laut.png"),
        ("Chainsaw_cutting_fallen_tree_trunk", "icon_deforestasi.png"),
        ("Industrial_pipe_pouring_chemical", "icon_limbah_danau.png"),
        ("Pesticide_overdose_alert_badge", "icon_racun_pestisida.png"),
    ]
    for prefix, out_name in crisis_icons:
        f_ico = find_file(prefix)
        im_ico = flood_fill_white(Image.open(f_ico))
        im_ico = square_and_center(im_ico, target_size=(220, 220))
        out_p = ASSETS_DIR / "ui" / out_name
        im_ico.save(out_p, "PNG", optimize=True)
        print(f"  -> {out_name}: {im_ico.size}")

    # -------------------------------------------------------------
    # 8. ELEMEN ANTARMUKA UI (BILLBOARD, CARDS, DIALOG, COOLDOWN, TOMBOL)
    # -------------------------------------------------------------
    print("\n[8/10] Memproses Elemen Antarmuka UI...")
    
    # 8.1 Title Billboard (Magenta Key)
    f_board = find_file("Eco-Explorer_game_title_banner")
    im_board = key_magenta(Image.open(f_board), dist_thresh=90, fade_range=35)
    b_box = im_board.getbbox()
    if b_box:
        im_board = im_board.crop(b_box)
    im_board = im_board.resize((960, int(im_board.height * (960 / im_board.width))), Image.Resampling.LANCZOS)
    out_board = ASSETS_DIR / "ui" / "title_billboard.png"
    im_board.save(out_board, "PNG", optimize=True)
    print(f"  -> title_billboard.png: {im_board.size}")

    # 8.2 Three Menu Cards (Split & Magenta Key)
    f_cards = find_file("Game_menu_cards_set")
    im_cards = key_magenta(Image.open(f_cards), dist_thresh=90, fade_range=30)
    card_splits = [
        ("card_mulai_bermain.png", (71, 74, 458, 694)),
        ("card_cara_bermain.png", (494, 74, 882, 694)),
        ("card_tentang_panduan.png", (918, 74, 1305, 694)),
    ]
    for out_name, box in card_splits:
        c_crop = im_cards.crop(box)
        c_box = c_crop.getbbox()
        if c_box:
            c_crop = c_crop.crop(c_box)
        # Standardize card dimensions: 360x520
        c_crop = c_crop.resize((360, 520), Image.Resampling.LANCZOS)
        out_p = ASSETS_DIR / "ui" / out_name
        c_crop.save(out_p, "PNG", optimize=True)
        print(f"  -> {out_name}: {c_crop.size}")

    # 8.3 Dialogue Box (Black Key)
    f_dialog = find_file("Game_UI_dialogue_box_frame")
    im_dialog = key_black(Image.open(f_dialog))
    out_dialog = ASSETS_DIR / "ui" / "dialog_box.png"
    im_dialog.save(out_dialog, "PNG", optimize=True)
    print(f"  -> dialog_box.png: {im_dialog.size}")

    # 8.4 Cooldown Bar (Black Key)
    f_cool = find_file("Cooldown_timer_bar_graphic")
    im_cool = key_black(Image.open(f_cool))
    out_cool = ASSETS_DIR / "ui" / "hud_cooldown_bar.png"
    im_cool.save(out_cool, "PNG", optimize=True)
    print(f"  -> hud_cooldown_bar.png: {im_cool.size}")

    # 8.5 Loudspeaker Button (Btn Tanya Teman)
    f_btn = find_file("Loudspeaker_button_with_voting")
    im_btn = flood_fill_white(Image.open(f_btn))
    im_btn = square_and_center(im_btn, target_size=(200, 200))
    out_btn = ASSETS_DIR / "ui" / "btn_tanya_teman.png"
    im_btn.save(out_btn, "PNG", optimize=True)
    print(f"  -> btn_tanya_teman.png: {im_btn.size}")

    # -------------------------------------------------------------
    # 9. CSCL VOTING CARDS (HIJAU, KUNING, MERAH)
    # -------------------------------------------------------------
    print("\n[9/10] Memproses 3 Kartu Voting Fisik CSCL...")
    voting_cards = [
        ("Game_UI_voting_card_graphic_20260930232238", "card_voting_hijau.png"),
        ("Voting_card_graphic_depicting_water_20260930232244", "card_voting_kuning.png"),
        ("Game_UI_voting_card_graphic_20260930232306", "card_voting_merah.png"),
    ]
    for prefix, out_name in voting_cards:
        f_card = find_file(prefix)
        im_card = flood_fill_white(Image.open(f_card))
        im_card = square_and_center(im_card, target_size=(380, 380))
        out_p = ASSETS_DIR / "ui" / out_name
        im_card.save(out_p, "PNG", optimize=True)
        print(f"  -> {out_name}: {im_card.size}")

    # -------------------------------------------------------------
    # 10. KAMUS KATA POPUP EDUKATIF (8 KATA)
    # -------------------------------------------------------------
    print("\n[10/10] Memproses 8 Ilustrasi Kamus Kata Visual...")
    kamus_terms = [
        ("Butterfly_flying_over_rice_field", "kamus_pematang.png"),
        ("Brown_planthopper_on_rice_stalk", "kamus_wereng.png"),
        ("Water_flowing_through_irrigation", "kamus_irigasi.png"),
        ("Mushrooms_decomposing_straw_into", "kamus_pengurai.png"),
        ("Green_snake_watching_mouse", "kamus_pemangsa.png"),
        ("Field_mouse_nibbling_rice_grain", "kamus_hama.png"),
        ("Water_hyacinths_blanketing_pond", "kamus_gulma.png"),
        ("Industrial_pipe_polluting_creek", "kamus_limbah.png"),
    ]
    for prefix, out_name in kamus_terms:
        f_kam = find_file(prefix)
        im_kam = flood_fill_white(Image.open(f_kam))
        im_kam = square_and_center(im_kam, target_size=(450, 450))
        out_p = ASSETS_DIR / "kamus" / out_name
        im_kam.save(out_p, "PNG", optimize=True)
        print(f"  -> {out_name}: {im_kam.size}")

    print("\n" + "=" * 70)
    print("  [SUCCESS] SEMUA 63 ASET BERHASIL DIOPTIMASI & DIPASANG KE GAME!")
    print("=" * 70)

if __name__ == "__main__":
    run_pipeline()
