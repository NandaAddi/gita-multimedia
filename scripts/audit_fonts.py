import os
import re
import sys

# Ensure UTF-8 output on Windows console
if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

scene_dir = 'WEBSITE/js/phaser-game/scenes'
pattern = re.compile(r'fontSize\s*:\s*[\'\"](\d+)px[\'\"]')

results = {}
for fname in sorted(os.listdir(scene_dir)):
    if fname.endswith('.js'):
        fpath = os.path.join(scene_dir, fname)
        with open(fpath, 'r', encoding='utf-8') as f:
            lines = f.readlines()
        
        matches = []
        for i, line in enumerate(lines):
            for m in pattern.finditer(line):
                size = int(m.group(1))
                matches.append((i+1, size, line.strip()))
        results[fname] = matches

print("================================================================================")
print("AUDIT FONT SIZE DI SELURUH SCENE PHASER (WEBSITE/js/phaser-game/scenes)")
print("================================================================================")

total_small = 0
total_all = 0
threshold = 24

for fname, matches in results.items():
    small = [m for m in matches if m[1] < threshold]
    all_sizes = [m[1] for m in matches]
    min_s = min(all_sizes) if all_sizes else 0
    max_s = max(all_sizes) if all_sizes else 0
    total_all += len(matches)
    total_small += len(small)
    print(f"\n📂 {fname}:")
    print(f"   Total deklarasi font : {len(matches)}")
    print(f"   Rentang ukuran       : {min_s}px - {max_s}px")
    print(f"   Font KECIL (<{threshold}px)   : {len(small)} buah")
    for line_no, size, text in small:
        print(f"     • Baris {line_no:4d} [{size:2d}px]: {text[:90]}")

print("\n================================================================================")
print(f"TOTAL: {total_small} dari {total_all} font berukuran di bawah {threshold}px!")
print("================================================================================")
