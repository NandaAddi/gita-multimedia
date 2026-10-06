import os
import re
import sys

if sys.platform == 'win32':
    sys.stdout.reconfigure(encoding='utf-8')

scene_dir = 'WEBSITE/js/phaser-game/scenes'
pattern = re.compile(r'fontSize\s*:\s*[\'\"](\d+)px[\'\"]')

scenes = [
    'TitleScene.js',
    'TutorialScene.js',
    'TeamSelectScene.js',
    'BiomeSelectScene.js',
    'MissionMenuScene.js',
    'SimulationScene.js',
    'QuizScene.js',
    'VictoryScene.js',
    'BootScene.js'
]

print("# DETAILED FONT AUDIT REPORT\n")

for fname in scenes:
    fpath = os.path.join(scene_dir, fname)
    if not os.path.exists(fpath):
        continue
    with open(fpath, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    print(f"## {fname} ({len(lines)} lines)")
    print("| Line | Old Size | Target Scale (>=24px) | Snippet |")
    print("|---|---|---|---|")
    
    for i, line in enumerate(lines):
        m = pattern.search(line)
        if m:
            size = int(m.group(1))
            # Determine proposed new size
            if size < 20:
                new_size = "24px (Minimum)"
            elif 20 <= size <= 23:
                new_size = "26px"
            elif 24 <= size <= 29:
                new_size = "30px - 32px"
            elif 30 <= size <= 39:
                new_size = "38px - 44px"
            else:
                new_size = "48px - 56px (Title)"
            
            clean_line = line.strip().replace('|', '\\|')
            if len(clean_line) > 75:
                clean_line = clean_line[:72] + '...'
            print(f"| {i+1} | **{size}px** | {new_size} | `{clean_line}` |")
    print("\n")
