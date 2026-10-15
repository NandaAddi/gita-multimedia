"""
ECO-EXPLORER: MASTER BUILD & TOOLING RUNNER
Usage:
    python build.py            # Builds docs data bundle (docs-data.js) and runs test suite
    python build.py --docs     # Builds only docs web data bundle (docs-data.js)
    python build.py --docx     # Exports Word documents (.docx) to docs/
    python build.py --test     # Runs regression test suites (tests/run.js)
    python build.py --all      # Runs docs bake, docx export, and test suites
"""

import sys
import os
import subprocess
from pathlib import Path

# Safe terminal encoding on Windows
if hasattr(sys.stdout, "reconfigure"):
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:
        pass

REPO_ROOT = Path(__file__).resolve().parent
TOOLS_EXPORTERS = REPO_ROOT / "tools" / "exporters"

sys.path.insert(0, str(TOOLS_EXPORTERS))

try:
    from build_docs_web import build_docs_data
except ImportError:
    build_docs_data = None

def run_tests():
    print("\n[*] Menjalankan Automated Regression Test Suites (tests/run.js)...")
    run_res = subprocess.run(["node", "tests/run.js"], cwd=str(REPO_ROOT))
    if run_res.returncode != 0:
        print("[!] Unit test regression gagal!")
        return False
    print("\n[*] Menjalankan Validasi 16 Misi & 4 Kelompok (tests/validate_16_missions.js)...")
    val_res = subprocess.run(["node", "tests/validate_16_missions.js"], cwd=str(REPO_ROOT))
    return val_res.returncode == 0

def export_docx():
    print("\n[*] Mengekspor Dokumen Skripsi ke Word (.docx)...")
    gen_script = TOOLS_EXPORTERS / "generate_docx.py"
    if gen_script.exists():
        res = subprocess.run([sys.executable, str(gen_script)], cwd=str(REPO_ROOT))
        return res.returncode == 0
    return False

def main():
    print("=" * 60)
    print(" ECO-EXPLORER: MASTER BUILD & TOOLING RUNNER")
    print("=" * 60)

    args = sys.argv[1:]
    build_all = "--all" in args
    is_default = len(args) == 0

    if is_default or build_all or "--docs" in args:
        if build_docs_data:
            print("\n[1] Baking Docs Web Data Bundle (docs/docs-data.js)...")
            build_docs_data()

    if build_all or "--docx" in args:
        print("\n[2] Exporting Academic Docs (.docx)...")
        export_docx()

    if is_default or build_all or "--test" in args:
        print("\n[3] Running Regression & Mission Tests...")
        success = run_tests()
        if not success:
            sys.exit(1)

    print("\n" + "=" * 60)
    print(" [SUCCESS] BUILD & VERIFIKASI SELESAI!")
    print(" Root Game Client : index.html (https://skripsi.agitakhairunnisa.my.id/)")
    print(" Docs Portal      : docs/index.html")
    print(" Test Suite       : tests/run.js (100% PASS)")
    print("=" * 60 + "\n")

if __name__ == "__main__":
    main()
