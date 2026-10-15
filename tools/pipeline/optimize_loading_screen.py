"""
tools/pipeline/optimize_loading_screen.py
Mengompresi dan melakukan smart decimation sampling pada 167 frame animasi loading Gita
dari raw-assets/loading-screen ke assets/animations/loading/ dalam format WebP hemat performa.
"""

import os
import re
import sys
from pathlib import Path
from PIL import Image

# Terminal UTF-8 safety
if hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

REPO_ROOT = Path(__file__).resolve().parents[2]
RAW_DIR = REPO_ROOT / "raw-assets" / "loading-screen"
OUT_DIR = REPO_ROOT / "assets" / "animations" / "loading"

TARGET_FRAMES = 42
TARGET_SIZE = (240, 240)
WEBP_QUALITY = 82

def get_frame_num(filename):
    m = re.search(r'\((\d+)\)', filename)
    return int(m.group(1)) if m else 0

def process_loading_screen():
    print("=" * 65)
    print(" ECO-EXPLORER: LOADING SCREEN ASSET OPTIMIZER")
    print("=" * 65)

    if not RAW_DIR.exists():
        print(f"[ERROR] Direktori input tidak ditemukan: {RAW_DIR}")
        sys.exit(1)

    OUT_DIR.mkdir(parents=True, exist_ok=True)

    # 1. Kumpulkan file dan urutkan secara numerik
    raw_files = [f for f in RAW_DIR.glob("*.png") if get_frame_num(f.name) > 0]
    raw_files.sort(key=lambda f: get_frame_num(f.name))
    total_raw = len(raw_files)
    print(f"Total raw frame ditemukan: {total_raw} file")

    if total_raw == 0:
        print("[ERROR] Tidak ada file PNG yang valid.")
        sys.exit(1)

    # 2. Hitung sampling index merata agar siklus gerakan lengkap (0 sampai total_raw - 1)
    step = (total_raw - 1) / (TARGET_FRAMES - 1)
    selected_indices = [int(round(i * step)) for i in range(TARGET_FRAMES)]
    # Pastikan index unik & terurut
    selected_indices = sorted(list(dict.fromkeys(selected_indices)))
    print(f"Jumlah frame terpilih setelah decimation: {len(selected_indices)} frame")

    total_orig_size = 0
    total_opt_size = 0

    # 3. Proses resize dan kompresi WebP
    for out_idx, raw_idx in enumerate(selected_indices):
        raw_file = raw_files[raw_idx]
        orig_bytes = os.path.getsize(raw_file)
        total_orig_size += orig_bytes

        out_name = f"gita_load_{out_idx:03d}.webp"
        out_path = OUT_DIR / out_name

        with Image.open(raw_file) as im:
            # Resize ke TARGET_SIZE jika perlu
            if im.size != TARGET_SIZE:
                im_resized = im.resize(TARGET_SIZE, Image.Resampling.LANCZOS)
            else:
                im_resized = im.copy()

            # Simpan sebagai WebP lossless/lossy optimal
            im_resized.save(out_path, "WEBP", quality=WEBP_QUALITY, method=6)

        opt_bytes = os.path.getsize(out_path)
        total_opt_size += opt_bytes

    reduction = (1 - total_opt_size / total_orig_size) * 100 if total_orig_size > 0 else 0
    print("-" * 65)
    print(f"Sampling Frame     : {len(selected_indices)} / {total_raw} frame")
    print(f"Target Dimensi     : {TARGET_SIZE[0]}x{TARGET_SIZE[1]} px")
    print(f"Total Ukuran Asli  : {total_orig_size / (1024 * 1024):.2f} MB")
    print(f"Total Ukuran WebP  : {total_opt_size / 1024:.1f} KB ({total_opt_size / (1024 * 1024):.2f} MB)")
    print(f"Efisiensi Kompresi : -{reduction:.1f}%")
    print("=" * 65)
    print(f"[BERHASIL] Output tersimpan di: {OUT_DIR}")

if __name__ == "__main__":
    process_loading_screen()
