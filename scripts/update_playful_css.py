import re

with open('TES GITA BARU 1/css/game.css', 'r', encoding='utf-8') as f:
    css = f.read()

font_header = """/* ============================================================
   ECO-EXPLORER — OFFLINE FONT DECLARATIONS (ZERO-CORS)
   Font Ramah Anak (Fredoka, Baloo 2, Nunito)
   ============================================================ */

@font-face {
  font-family: 'Fredoka';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url('../fonts/fredoka-500-latin.woff2') format('woff2');
}

@font-face {
  font-family: 'Fredoka';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url('../fonts/fredoka_600.woff2') format('woff2'),
       url('../fonts/fredoka-500-latin.woff2') format('woff2');
}

@font-face {
  font-family: 'Fredoka';
  font-style: normal;
  font-weight: 700 800;
  font-display: swap;
  src: url('../fonts/fredoka_700.woff2') format('woff2'),
       url('../fonts/fredoka_600.woff2') format('woff2');
}

@font-face {
  font-family: 'Baloo 2';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url('../fonts/baloo_2_600.woff2') format('woff2');
}

@font-face {
  font-family: 'Baloo 2';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url('../fonts/baloo_2_700.woff2') format('woff2');
}

@font-face {
  font-family: 'Baloo 2';
  font-style: normal;
  font-weight: 800 900;
  font-display: swap;
  src: url('../fonts/baloo_2_800.woff2') format('woff2');
}

@font-face {
  font-family: 'Nunito';
  font-style: normal;
  font-weight: 400 600;
  font-display: swap;
  src: url('../fonts/nunito-latin.woff2') format('woff2');
}

@font-face {
  font-family: 'Nunito';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url('../fonts/nunito_700.woff2') format('woff2'),
       url('../fonts/nunito-latin.woff2') format('woff2');
}

@font-face {
  font-family: 'Nunito';
  font-style: normal;
  font-weight: 800 900;
  font-display: swap;
  src: url('../fonts/nunito_800.woff2') format('woff2'),
       url('../fonts/nunito_900.woff2') format('woff2');
}

:root {
  --font-fun: 'Fredoka', 'Baloo 2', 'Quicksand', 'Nunito', 'Segoe UI Rounded', 'Comic Sans MS', cursive, sans-serif;
  --font-heading: 'Fredoka', 'Baloo 2', 'Nunito', 'Segoe UI Rounded', cursive, sans-serif;
  --font-body: 'Nunito', 'Fredoka', 'Quicksand', 'Segoe UI Rounded', sans-serif;
}

"""

# Prepend header if not already present
if 'OFFLINE FONT DECLARATIONS' not in css:
    css = font_header + css

# Replace specific hardcoded font-family calls
css = re.sub(r"font-family\s*:\s*['\"]Fredoka['\"]\s*,\s*sans-serif", "font-family:var(--font-fun)", css)
css = re.sub(r"font-family\s*:\s*['\"]Fredoka['\"]", "font-family:var(--font-fun)", css)
css = re.sub(r"font-family\s*:\s*['\"]Nunito['\"]\s*,\s*sans-serif", "font-family:var(--font-body)", css)
css = re.sub(r"font-family\s*:\s*['\"]Nunito['\"]", "font-family:var(--font-body)", css)

# Enhance Title Screen typography styling
old_title_logo = """.title-logo{
  font-size:120px;font-weight:700;color:#fef08a;margin-top:6px;letter-spacing:4px;line-height:1;
  text-shadow:0 6px 0 #0a3d2c,0 12px 0 rgba(0,0,0,.35);-webkit-text-stroke:2px #022c22;
}"""

new_title_logo = """.title-logo{
  font-family:var(--font-fun);
  font-size:128px;
  font-weight:700;
  color:#fffb8f;
  margin-top:4px;
  letter-spacing:5px;
  line-height:1;
  text-shadow:
    0 3px 0 #ffe066,
    0 6px 0 #f59f00,
    0 9px 0 #d97706,
    0 13px 0 #074735,
    0 18px 0 #02231b,
    0 22px 30px rgba(0,0,0,.55);
  -webkit-text-stroke:3px #022c22;
  paint-order:stroke fill;
}"""

if old_title_logo in css:
    css = css.replace(old_title_logo, new_title_logo)
else:
    # Use regex replacement if whitespace differed
    css = re.sub(
        r"\.title-logo\s*\{[^}]+\}",
        new_title_logo,
        css
    )

old_title_kicker = """.title-kicker{
  margin-top:46px;background:rgba(2,44,34,.94);border:none;border-radius:999px;
  color:#fef08a;font-family:'Fredoka';font-size:25px;padding:12px 46px;letter-spacing:2px;
  box-shadow:0 8px 20px rgba(0,0,0,.35), inset 0 1px 0 rgba(254,240,138,.3);
}"""

new_title_kicker = """.title-kicker{
  margin-top:40px;
  background:rgba(2,44,34,.95);
  border:none;
  border-radius:999px;
  color:#fef08a;
  font-family:var(--font-fun);
  font-weight:600;
  font-size:25px;
  padding:12px 48px;
  letter-spacing:1.5px;
  box-shadow:0 8px 24px rgba(0,0,0,.35), inset 0 2px 0 rgba(254,240,138,.4);
}"""

if old_title_kicker in css:
    css = css.replace(old_title_kicker, new_title_kicker)
else:
    css = re.sub(
        r"\.title-kicker\s*\{[^}]+\}",
        new_title_kicker,
        css
    )

old_title_sub = """.title-sub{
  font-family:'Fredoka';font-size:36px;color:#fff;background:rgba(2,44,34,.9);border-radius:18px;
  padding:10px 36px;margin-top:12px;border:none;box-shadow:0 8px 22px rgba(0,0,0,.35);
}"""

new_title_sub = """.title-sub{
  font-family:var(--font-fun);
  font-weight:600;
  font-size:36px;
  color:#ffffff;
  background:rgba(2,44,34,.94);
  border-radius:24px;
  padding:10px 44px;
  margin-top:12px;
  border:none;
  box-shadow:0 10px 24px rgba(0,0,0,.35);
}"""

if old_title_sub in css:
    css = css.replace(old_title_sub, new_title_sub)
else:
    css = re.sub(
        r"\.title-sub\s*\{[^}]+\}",
        new_title_sub,
        css
    )

# Menu cards text styling
css = re.sub(
    r"\.menu-card\s*\.mc-t\s*\{[^}]+\}",
    ".menu-card .mc-t{display:block;font-family:var(--font-fun);font-weight:700;font-size:32px;line-height:1.2;letter-spacing:1px;text-shadow:0 2px 6px rgba(0,0,0,.35)}",
    css
)

css = re.sub(
    r"\.menu-card\s*\.mc-s\s*\{[^}]+\}",
    ".menu-card .mc-s{display:block;font-family:var(--font-body);font-weight:600;font-size:24px;line-height:1.35;opacity:.95;min-height:64px}",
    css
)

css = re.sub(
    r"\.menu-card\s*\.go\s*\{[^}]+\}",
    ".menu-card .go{font-family:var(--font-fun);font-weight:700;font-size:30px;letter-spacing:3px}",
    css
)

css = re.sub(
    r"\.title-foot\s*\{[^}]+\}",
    ".title-foot{position:absolute;bottom:24px;width:100%;text-align:center;color:rgba(255,255,255,.95);font-family:var(--font-body);font-weight:600;font-size:24px;letter-spacing:.5px;text-shadow:0 2px 6px rgba(0,0,0,.5)}",
    css
)

with open('TES GITA BARU 1/css/game.css', 'w', encoding='utf-8') as f:
    f.write(css)

print('Updated game.css with cute playful font architecture successfully!')
