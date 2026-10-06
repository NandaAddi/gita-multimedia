import re

with open('TES GITA BARU 1/index_monolithic_backup.html', 'r', encoding='utf-8') as f:
    text = f.read()

body_idx = text.find('<body>')
script_idx = text.find('<script>')
body_content = text[body_idx:script_idx].strip()

# Remove the closing </div> of stage because we want clean indentation before scripts
scripts_block = """
  <!-- CORE SCRIPTS & STATE -->
  <script src="js/config.js"></script>
  <script src="js/state.js"></script>
  <script src="js/audio.js"></script>

  <!-- DATA LAYER -->
  <script src="js/data/ecosystems.js"></script>
  <script src="js/data/missions.js"></script>

  <!-- RENDERERS -->
  <script src="js/renderers/characters.js"></script>
  <script src="js/renderers/backgrounds.js"></script>

  <!-- SCENE CONTROLLERS -->
  <script src="js/scenes/title.js"></script>
  <script src="js/scenes/tutorial.js"></script>
  <script src="js/scenes/team.js"></script>
  <script src="js/scenes/biome.js"></script>
  <script src="js/scenes/mission-menu.js"></script>
  <script src="js/scenes/simulation.js"></script>
  <script src="js/scenes/quiz.js"></script>
  <script src="js/scenes/victory.js"></script>

  <!-- ENTRY POINT -->
  <script src="js/main.js"></script>
</body>
</html>
"""

html_out = f"""<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no">
  <title>Eco-Explorer — Penjaga Keseimbangan Ekosistem</title>
  <link rel="stylesheet" href="css/game.css">
</head>
{body_content}
{scripts_block}"""

with open('TES GITA BARU 1/index.html', 'w', encoding='utf-8') as f:
    f.write(html_out)

print('Wrote streamlined index.html successfully!')
