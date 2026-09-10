import os
import base64
from pathlib import Path

# Safe terminal encoding on Windows
import sys
if hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

# Dynamic root resolution
REPO_ROOT = Path(__file__).resolve().parents[2]
MP3_DIR = REPO_ROOT / "WEBSITE" / "assets" / "voice-over-mp3"
WAV_DIR = REPO_ROOT / "WEBSITE" / "assets" / "voice-over"
OUTPUT_JS = REPO_ROOT / "WEBSITE" / "js" / "vo-data.js"

def build_vo():
    lines = [
        "// Base64 Data URIs of Voice-Over Audio - 100% Offline and CORS-free on file:// protocol",
        "window.VO_DATA = {"
    ]

    count = 0
    # Prefer high-performance compressed MP3 if available
    target_dir = MP3_DIR if (MP3_DIR.exists() and any(MP3_DIR.glob("*.mp3"))) else WAV_DIR
    ext = ".mp3" if target_dir == MP3_DIR else ".wav"
    mime = "audio/mp3" if ext == ".mp3" else "audio/wav"

    print(f"Reading voice-over assets from: {target_dir} ({ext.upper()})")

    if target_dir.exists():
        for f in sorted(os.listdir(target_dir)):
            if f.endswith(ext):
                key = os.path.splitext(f)[0]
                p = target_dir / f
                with open(p, "rb") as af:
                    b64 = base64.b64encode(af.read()).decode("utf-8")
                    lines.append(f'  "{key}": "data:{mime};base64,{b64}",')
                    count += 1
                    print(f"[{count:2}/25] Encoded {key} ({len(b64):,} chars)")
    else:
        print(f"Directory {target_dir} does not exist!")

    lines.append("};")

    OUTPUT_JS.parent.mkdir(parents=True, exist_ok=True)
    with open(OUTPUT_JS, "w", encoding="utf-8") as out:
        out.write("\n".join(lines))

    size_mb = os.path.getsize(OUTPUT_JS) / (1024 * 1024)
    print(f"\nSUCCESS: Generated {OUTPUT_JS} ({count} voice tracks, {size_mb:.2f} MB)")

if __name__ == "__main__":
    build_vo()
