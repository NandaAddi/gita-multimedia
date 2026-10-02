import os, re
from PIL import Image

# 1. Load all asset dimensions
asset_sizes = {}
for root, dirs, files in os.walk('WEBSITE/assets'):
    for f in files:
        if f.lower().endswith(('.png', '.jpg', '.jpeg')):
            p = os.path.join(root, f)
            try:
                im = Image.open(p)
                name = os.path.splitext(f)[0]
                asset_sizes[name] = im.size
                asset_sizes[f] = im.size
            except Exception:
                pass

print(f"Indexed {len(asset_sizes)} assets.")

# 2. Check each scene
scenes_dir = 'WEBSITE/js/phaser-game/scenes'
for sfile in sorted(os.listdir(scenes_dir)):
    if sfile.endswith('.js'):
        spath = os.path.join(scenes_dir, sfile)
        lines = open(spath, encoding='utf-8').readlines()
        for idx, line in enumerate(lines, 1):
            # Look for setDisplaySize(w, h)
            m = re.search(r'setDisplaySize\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\s*\)', line)
            if m:
                w, h = float(m.group(1)), float(m.group(2))
                # Look backwards 5 lines for image key
                context = "".join(lines[max(0, idx-6):idx])
                keys = re.findall(r'[\'"]([a-zA-Z0-9_\-]+)[\'"]', context)
                matched_key = None
                for k in reversed(keys):
                    if k in asset_sizes:
                        matched_key = k
                        break
                if matched_key:
                    aw, ah = asset_sizes[matched_key]
                    act_r = aw / ah
                    disp_r = w / h
                    diff = abs(disp_r - act_r) / act_r * 100
                    if diff > 2.0:
                        print(f"[{sfile}:{idx}] Asset '{matched_key}': actual=({aw}x{ah}, ratio={act_r:.3f}) vs display=({w:.0f}x{h:.0f}, ratio={disp_r:.3f}) -> MISMATCH: {diff:.1f}%")
