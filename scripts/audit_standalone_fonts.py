import os
import re
import sys

TARGET_FILE = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "TES GITA BARU 1", "index.html"))

def audit_fonts():
    if not os.path.exists(TARGET_FILE):
        print(f"ERROR: File target tidak ditemukan di {TARGET_FILE}")
        sys.exit(2)

    with open(TARGET_FILE, "r", encoding="utf-8", errors="ignore") as f:
        content = f.read()

    patterns = [
        (r'font-size:\s*(\d+)px', 'font-size: Xpx'),
        (r'font:\s*(\d+)px', 'font: Xpx'),
        (r'fontSize\s*=\s*[\'"](\d+)px[\'"]', 'fontSize = "Xpx"'),
        (r'font:\s*[\'"]?(\d+)px\s+monospace[\'"]?', 'font: Xpx monospace')
    ]

    violations = []
    for pattern, desc in patterns:
        for match in re.finditer(pattern, content):
            size = int(match.group(1))
            if size < 24:
                start = max(0, match.start() - 30)
                end = min(len(content), match.end() + 30)
                snippet = content[start:end].replace('\n', ' ')
                violations.append((size, desc, snippet.strip()))

    print(f"=== AUDIT TIPOGRAFI STANDALONE IFP (Batas Bawah >= 24px) ===")
    print(f"File: {TARGET_FILE}")
    print(f"Jumlah pelanggaran (< 24px): {len(violations)}")
    
    if violations:
        print("\nDaftar font berukuran di bawah 24px:")
        for size, desc, snippet in violations:
            print(f"  - [{size}px] ({desc}) -> ...{snippet}...")
        print("\nSTATUS: GAGAL (Terdapat font < 24px)")
        sys.exit(1)
    else:
        print("\nSTATUS: LULUS (Semua font >= 24px)")
        sys.exit(0)

if __name__ == "__main__":
    audit_fonts()
