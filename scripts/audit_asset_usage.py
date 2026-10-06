import os
import re
from pathlib import Path

scenes_dir = Path("WEBSITE/js/phaser-game/scenes")
scene_files = list(scenes_dir.glob("*.js"))

boot_content = (scenes_dir / "BootScene.js").read_text(encoding="utf-8")
m = re.search(r"const assetKeys = \[(.*?)\];", boot_content, re.DOTALL)
if m:
    raw = m.group(1)
    keys_loaded = re.findall(r"'([a-zA-Z0-9_-]+)'", raw)
else:
    keys_loaded = []

print(f"Total asset keys defined in BootScene: {len(keys_loaded)}")

usages = {k: [] for k in keys_loaded}
for sf in scene_files:
    if sf.name == "BootScene.js":
        continue
    content = sf.read_text(encoding="utf-8")
    for k in keys_loaded:
        if f"'{k}'" in content or f'"{k}"' in content:
            usages[k].append(sf.name)

used = [k for k, scs in usages.items() if len(scs) > 0]
unused = [k for k, scs in usages.items() if len(scs) == 0]

print(f"\nUSED in scenes ({len(used)}):")
for k in sorted(used):
    print(f"  [x] {k:25} -> {', '.join(usages[k])}")

print(f"\nUNUSED in scenes ({len(unused)}):")
for k in sorted(unused):
    print(f"  [ ] {k}")
