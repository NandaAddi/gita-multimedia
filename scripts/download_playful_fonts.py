import urllib.request
import re
import os

url = 'https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800&family=Fredoka:wght@600;700&family=Nunito:wght@700;800;900&display=swap'
req = urllib.request.Request(
    url,
    headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'}
)

try:
    with urllib.request.urlopen(req, timeout=10) as resp:
        css = resp.read().decode('utf-8')
except Exception as e:
    print('Failed to fetch CSS:', e)
    css = ''

dst_dir = 'TES GITA BARU 1/fonts'
os.makedirs(dst_dir, exist_ok=True)

blocks = re.findall(r'@font-face\s*\{([^}]+)\}', css)
downloaded = []
for b in blocks:
    fam_m = re.search(r"font-family:\s*['\"]([^'\"]+)['\"]", b)
    w_m = re.search(r"font-weight:\s*(\d+)", b)
    src_m = re.search(r"url\((https://[^)]+)\)", b)
    if fam_m and w_m and src_m:
        fam = fam_m.group(1).lower().replace(' ', '_')
        w = w_m.group(1)
        ext = 'woff2' if '.woff2' in src_m.group(1) else 'ttf'
        fname = f"{fam}_{w}.{ext}"
        fpath = os.path.join(dst_dir, fname)
        if not os.path.exists(fpath):
            try:
                urllib.request.urlretrieve(src_m.group(1), fpath)
                downloaded.append((fname, os.path.getsize(fpath)))
            except Exception as e:
                print('Error downloading:', fname, e)
        else:
            downloaded.append((fname, 'already exists'))

print('Downloaded:', downloaded)
