"""
ECO-EXPLORER: MASTER BUILD PIPELINE
Senior Game Dev Standard Build System
Usage:
    python build.py            # Builds assets, voice-over, and docs data bundle
    python build.py --assets   # Builds only game visual assets (assets-data.js)
    python build.py --vo       # Builds only voice-over audio (vo-data.js)
    python build.py --docs     # Builds only docs web data bundle (docs-data.js)
"""

import sys
import os
from pathlib import Path

# Safe terminal encoding on Windows
if hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

REPO_ROOT = Path(__file__).resolve().parent
TOOLS_PIPELINE = REPO_ROOT / "tools" / "pipeline"
TOOLS_EXPORTERS = REPO_ROOT / "tools" / "exporters"

sys.path.insert(0, str(TOOLS_PIPELINE))
sys.path.insert(0, str(TOOLS_EXPORTERS))

try:
    from embed_assets import build_assets
    from embed_vo import build_vo
except ImportError as e:
    print(f"Error importing pipeline modules: {e}")
    sys.exit(1)

try:
    from build_docs_web import build_docs_data
except ImportError:
    build_docs_data = None

def main():
    print("=" * 60)
    print(" ECO-EXPLORER: MASTER GAME BUILD & ASSET PACKAGER")
    print("=" * 60)

    args = sys.argv[1:]
    build_all = len(args) == 0 or "--all" in args

    if build_all or "--assets" in args:
        print("\n[1/3] Baking Visual Assets into Base64 (assets-data.js)...")
        build_assets()

    if build_all or "--vo" in args:
        print("\n[2/3] Baking Voice-Over Audio into Base64 (vo-data.js)...")
        build_vo()

    if (build_all or "--docs" in args) and build_docs_data:
        print("\n[3/3] Baking Docs Web Data Bundle (docs-data.js)...")
        build_docs_data()

    print("\n" + "=" * 60)
    print(" [SUCCESS] BUILD COMPLETE: 100% Offline & CORS-Free!")
    print(" Game Client: WEBSITE/phaser.html")
    print(" Docs Portal: docs/index.html")
    print("=" * 60 + "\n")

if __name__ == "__main__":
    main()
