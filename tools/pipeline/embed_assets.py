import os
import base64
from pathlib import Path

# Dynamic root resolution (independent of machine drive or directory)
REPO_ROOT = Path(__file__).resolve().parents[2]
BASE_ASSETS = REPO_ROOT / "WEBSITE" / "assets"
OUTPUT_JS = REPO_ROOT / "WEBSITE" / "js" / "assets-data.js"

gita_idle_path = BASE_ASSETS / "characters" / "gita_idle.png"
gita_talk_path = BASE_ASSETS / "characters" / "gita_talk.png"
kiki_idle_path = BASE_ASSETS / "characters" / "kiki_idle.png"
kiki_talk_path = BASE_ASSETS / "characters" / "kiki_talk.png"

char_idle = gita_idle_path if gita_idle_path.exists() else kiki_idle_path
char_talk = gita_talk_path if gita_talk_path.exists() else (gita_idle_path if gita_idle_path.exists() else kiki_talk_path)

asset_map = {
    "gita_idle": char_idle,
    "gita_talk": char_talk,
    "kiki_idle": char_idle,
    "kiki_talk": char_talk,
    "padi_subur": BASE_ASSETS / "organisms" / "padi_subur.png",
    "padi_kering": BASE_ASSETS / "organisms" / "padi_kering.png",
    "tikus": BASE_ASSETS / "organisms" / "tikus.png",
    "katak": BASE_ASSETS / "organisms" / "katak.png",
    "ular": BASE_ASSETS / "organisms" / "ular.png",
    "elang": BASE_ASSETS / "organisms" / "elang.png",
    "jamur": BASE_ASSETS / "organisms" / "jamur.png",
    "bangkai": BASE_ASSETS / "organisms" / "bangkai.png",
    "bg_sawah": BASE_ASSETS / "environment" / "background_sawah.png",
    "dialog_box": BASE_ASSETS / "ui" / "dialog_box.png",
    "icon_kemarau": BASE_ASSETS / "ui" / "icon_kemarau.png",
    "icon_pestisida": BASE_ASSETS / "ui" / "icon_pestisida.png",
    "icon_perburuan": BASE_ASSETS / "ui" / "icon_perburuan.png",
    "icon_irigasi": BASE_ASSETS / "ui" / "icon_irigasi.png",
    "icon_jamur_spora": BASE_ASSETS / "ui" / "icon_jamur_spora.png",
    "title_billboard": BASE_ASSETS / "ui" / "title_billboard.png",
    "card_mulai_bermain": BASE_ASSETS / "ui" / "card_mulai_bermain.png",
    "card_cara_bermain": BASE_ASSETS / "ui" / "card_cara_bermain.png",
    "card_tentang_panduan": BASE_ASSETS / "ui" / "card_tentang_panduan.png",
    "badge_elang": BASE_ASSETS / "ui" / "badges" / "badge_elang.png",
    "badge_ular": BASE_ASSETS / "ui" / "badges" / "badge_ular.png",
    "badge_katak": BASE_ASSETS / "ui" / "badges" / "badge_katak.png",
    "badge_padi": BASE_ASSETS / "ui" / "badges" / "badge_padi.png",
    "badge_jamur": BASE_ASSETS / "ui" / "badges" / "badge_jamur.png"
}

def build_assets():
    js_lines = [
        "// Base64 Data URIs of pixel art assets - 100% Offline and CORS-free on file:// protocol",
        "window.ASSETS_DATA = {"
    ]

    for key, path in asset_map.items():
        if path.exists():
            with open(path, "rb") as f:
                b64 = base64.b64encode(f.read()).decode("utf-8")
                js_lines.append(f'  "{key}": "data:image/png;base64,{b64}",')
                print(f"Embedded {key} ({len(b64)} chars)")
        else:
            print(f"Warning: {path} not found!")

    js_lines.append("};")

    OUTPUT_JS.parent.mkdir(parents=True, exist_ok=True)
    with open(OUTPUT_JS, "w", encoding="utf-8") as f:
        f.write("\n".join(js_lines))

    size_mb = os.path.getsize(OUTPUT_JS) / (1024 * 1024)
    print(f"\nWrote all base64 assets to {OUTPUT_JS} ({size_mb:.2f} MB) successfully!")

if __name__ == "__main__":
    build_assets()
