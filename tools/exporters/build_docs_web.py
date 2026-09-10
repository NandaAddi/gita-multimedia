import os
import json
from pathlib import Path

# Safe terminal encoding on Windows
import sys
if hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

REPO_ROOT = Path(__file__).resolve().parents[2]
DOCS_DIR = REPO_ROOT / "docs"
OUTPUT_JS = DOCS_DIR / "docs-data.js"

DOC_MANIFEST = [
    {
        "id": "prd",
        "title": "Desain Produk & Game (PRD & GDD)",
        "category": "Spesifikasi Game",
        "filename": "PRD_GAME_SKRIPSI.md",
        "badge": "GDD / PRD"
    },
    {
        "id": "skripsi",
        "title": "Naskah Riset & Instrumen Skripsi",
        "category": "Naskah Akademik",
        "filename": "SKRIPSI.md",
        "badge": "Riset Skripsi"
    },
    {
        "id": "roadmap",
        "title": "Roadmap 16 Pekan Alessi & Trollip",
        "category": "Manajemen Riset",
        "filename": "ROADMAP.md",
        "badge": "Jadwal R&D"
    },
    {
        "id": "lkpd",
        "title": "Buku Catatan Co-Pilot (LKPD Siswa 5A)",
        "category": "Perangkat Belajar",
        "filename": "LKPD_DETEKTIF_SAWAH.md",
        "badge": "LKPD Kelas"
    },
    {
        "id": "prompt",
        "title": "Spesifikasi Prompt Generator Aset Visual",
        "category": "Desain Aset",
        "filename": "PROMPT_ASSET_GEMINI.md",
        "badge": "Aset Visual"
    },
    {
        "id": "voiceover",
        "title": "Dokumen Audit 25 Audio Voice-Over",
        "category": "Audio & Narasi",
        "filename": "DOKUMEN_AUDIT_VOICE_OVER.md",
        "badge": "Audio Studio"
    },
    {
        "id": "pedoman",
        "title": "Pedoman Protokol Sinkronisasi Riset",
        "category": "Standardisasi",
        "filename": "PEDOMAN_SINKRONISASI_DOKUMEN.md",
        "badge": "Protokol AI"
    }
]

def build_docs_data():
    print("=" * 60)
    print(" BUILDING DOCS WEB DATA BUNDLE (Zero-CORS Offline Reader)")
    print("=" * 60)

    docs_payload = {}
    total_bytes = 0

    for item in DOC_MANIFEST:
        file_path = DOCS_DIR / item["filename"]
        if file_path.exists():
            content = file_path.read_text(encoding="utf-8")
            docs_payload[item["id"]] = {
                "id": item["id"],
                "title": item["title"],
                "category": item["category"],
                "filename": item["filename"],
                "badge": item["badge"],
                "content": content
            }
            size_kb = len(content.encode("utf-8")) / 1024
            total_bytes += len(content.encode("utf-8"))
            print(f" Packed: {item['filename']} -> [{item['id']}] ({size_kb:.1f} KB)")
        else:
            print(f" Warning: {file_path} not found!")

    json_str = json.dumps(docs_payload, ensure_ascii=False, indent=2)
    js_content = f"// Bundled Markdown Documents - 100% Offline & Zero-CORS on file:// protocol\nwindow.DOCS_DATA = {json_str};\n"

    OUTPUT_JS.write_text(js_content, encoding="utf-8")
    size_mb = OUTPUT_JS.stat().st_size / (1024 * 1024)
    print(f"\nSUCCESS: Generated {OUTPUT_JS} ({len(docs_payload)} documents, {size_mb:.2f} MB)")
    print("=" * 60)

if __name__ == "__main__":
    build_docs_data()
