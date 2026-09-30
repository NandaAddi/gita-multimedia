# Multi-Ecosystem Progression Architecture Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the game from a single-biome sawah simulation into a complete multi-ecosystem learning platform ("ECO-EXPLORER: Penjaga Keseimbangan Ekosistem") featuring 4 ecosystems (Sawah, Hutan Tropis, Sungai, Laut), 8 missions categorized into Nature vs Human factors, a 3-star rating system, and sequential progression locking.

**Architecture:** A unified, data-driven engine where `ecosystems-data.js` defines all 4 biomes and 8 missions, `ProgressManager.js` handles persistent progression locking and star tallies, and existing Phaser scenes (`TitleScene`, `BiomeSelectScene`, `MissionMenuScene`, `SimulationScene`, `QuizScene`, `VictoryScene`) are upgraded to dynamically adapt to the active ecosystem and mission state.

**Tech Stack:** HTML5, Phaser 3 Game Engine, Vanilla JavaScript ES6, Web Audio API / SpeechSynthesis, Python PIL (asset baking), Zero-CORS Base64 bundling.

**Spec:** [`docs/superpowers/specs/2026-10-01-multi-ecosystem-progression-design.md`](file:///d:/SKRIPSI%20GITA/docs/superpowers/specs/2026-10-01-multi-ecosystem-progression-design.md)

## Global Constraints
- Zero Em-Dash Rule: Never use em-dash (`—`) in student-facing UI copy or dialogue. Use hyphens, colons, or parentheses.
- Zero-CORS / 100% Offline: All new assets and code must function offline under `file://` protocol via Base64 bundling.
- Educational Rigor: Adhere to Piaget Concrete Operational, Mayer CTML, and Vygotsky Scaffolding standards documented in `PRD_GAME_SKRIPSI.md`.
- Target Hardware: Interactive Flat Panel (IFP) 65-86 inch touch display, 60 FPS, touch-friendly hit areas ($\ge 44 \times 44\text{ px}$).

---

### Task 1: Asset Preparation & Title Billboard Text Update

**Files:**
- Modify: `WEBSITE/assets/ui/title_billboard.png`
- Create: `tools/pipeline/update_title_billboard.py`
- Test: `tools/pipeline/update_title_billboard.py`

**Interfaces:**
- Produces: Updated `WEBSITE/assets/ui/title_billboard.png` with text "PENJAGA KESEIMBANGAN EKOSISTEM" on the bottom wooden plank.

- [ ] **Step 1: Write Python script to update the billboard wooden plank text**

```python
# tools/pipeline/update_title_billboard.py
import os
from PIL import Image, ImageDraw, ImageFont

def update_billboard():
    img_path = os.path.join("WEBSITE", "assets", "ui", "title_billboard.png")
    if not os.path.exists(img_path):
        raise FileNotFoundError(f"File not found: {img_path}")
    
    img = Image.open(img_path).convert("RGBA")
    draw = ImageDraw.Draw(img)
    w, h = img.size
    
    # Wooden plank area is roughly at bottom center: y from ~61% to ~79% of height
    # Box coordinates for the plank text area:
    plank_x1 = int(w * 0.19)
    plank_y1 = int(h * 0.62)
    plank_x2 = int(w * 0.81)
    plank_y2 = int(h * 0.79)
    
    # Fill wooden plank center with wood brown color: #78350f / #854d0e
    draw.rounded_rectangle([plank_x1, plank_y1, plank_x2, plank_y2], radius=14, fill=(120, 53, 15, 255), outline=(69, 26, 3, 255), width=3)
    
    # Inner wood texture highlight line
    draw.line([plank_x1 + 10, plank_y1 + 5, plank_x2 - 10, plank_y1 + 5], fill=(180, 83, 9, 200), width=2)
    
    text = "PENJAGA KESEIMBANGAN EKOSISTEM"
    # Find a bold sans font, fallback to default if not installed
    font = None
    for font_name in ["arialbd.ttf", "segoeuib.ttf", "tahoma.ttf", "arial.ttf"]:
        try:
            font = ImageFont.truetype(font_name, size=int(h * 0.088))
            break
        except Exception:
            continue
    if font is None:
        font = ImageFont.load_default()
    
    # Calculate text position
    bbox = draw.textbbox((0, 0), text, font=font)
    tw = bbox[2] - bbox[0]
    th = bbox[3] - bbox[1]
    tx = (w - tw) // 2
    ty = plank_y1 + (plank_y2 - plank_y1 - th) // 2 - 2
    
    # Draw drop shadow
    draw.text((tx + 3, ty + 3), text, font=font, fill=(30, 10, 2, 255))
    # Draw dark border
    for ox, oy in [(-2,0), (2,0), (0,-2), (0,2), (-2,-2), (2,2)]:
        draw.text((tx + ox, ty + oy), text, font=font, fill=(50, 18, 5, 255))
    # Draw bright white/cream text
    draw.text((tx, ty), text, font=font, fill=(255, 253, 240, 255))
    
    img.save(img_path, "PNG")
    print(f"[SUCCESS] Updated {img_path} with 'PENJAGA KESEIMBANGAN EKOSISTEM'")

if __name__ == "__main__":
    update_billboard()
```

- [ ] **Step 2: Run the billboard update script**

Run: `python tools/pipeline/update_title_billboard.py`  
Expected: `[SUCCESS] Updated WEBSITE\assets\ui\title_billboard.png with 'PENJAGA KESEIMBANGAN EKOSISTEM'`

- [ ] **Step 3: Run master asset packager to rebake Base64 bundles**

Run: `python build.py`  
Expected: `[SUCCESS] Wrote 71 assets to D:\SKRIPSI GITA\WEBSITE\js\assets-data.js`

- [ ] **Step 4: Commit asset changes**

```bash
git add WEBSITE/assets/ui/title_billboard.png WEBSITE/js/assets-data.js tools/pipeline/update_title_billboard.py
git commit -m "feat(assets): update title billboard to Penjaga Keseimbangan Ekosistem"
```

---

### Task 2: Multi-Ecosystem & Mission Data Architecture (`ecosystems-data.js`)

**Files:**
- Create: `WEBSITE/js/phaser-game/data/ecosystems-data.js`
- Modify: `WEBSITE/phaser.html:45-55` (Add script tag before game scenes)
- Test: `node -c WEBSITE/js/phaser-game/data/ecosystems-data.js`

**Interfaces:**
- Produces: `window.ECOSYSTEMS_DATA` object containing full configuration for 4 biomes, 8 missions, organisms, actions, and C2 quizzes.

- [ ] **Step 1: Write `ecosystems-data.js` defining all 4 ecosystems and 8 missions**

```javascript
// WEBSITE/js/phaser-game/data/ecosystems-data.js
/**
 * ECO-EXPLORER: MASTER ECOSYSTEMS & MISSIONS CONFIGURATION
 * 4 Bioma: Sawah, Hutan Tropis, Sungai, Laut
 * 8 Misi: Misi 1 (Faktor Ulah Alam) & Misi 2 (Faktor Ulah Manusia)
 */

window.ECOSYSTEMS_DATA = {
  sawah: {
    id: 'sawah',
    order: 1,
    name: 'Ekosistem Sawah',
    shortName: 'Sawah',
    badge: 'badge_sawah',
    bg: 'bg_sawah',
    ambientColor: 0x064e3b,
    accentColor: 0x10b981,
    desc: 'Lahan pangan padi tempat berinteraksinya petani, hama tanaman, dan predator alami.',
    missions: [
      {
        id: 'sawah_m1',
        num: 1,
        type: 'alam',
        typeLabel: 'Faktor Ulah Alam',
        typeColor: 0xd97706,
        title: 'Misi 1: Tanah Retak Kekeringan',
        headline: 'Musim Kemarau Melanda Sawah Kita!',
        speech: 'Halo Detektif! Musim kemarau panjang membuat saluran irigasi kering dan tanah retak! Segera alirkan air irigasi dan tanam tunas padi agar rantai makanan tetap hidup!',
        initPop: { padi: 15, tikus: 45, katak: 20, ular: 10, elang: 5, jamur: 15 },
        waterLevel: 20,
        waste: 20,
        pesticideClean: true,
        targets: {
          q1: { text: '💧 Alirkan Air Irigasi', key: 'waterLevel', min: 60, unit: '%' },
          q2: { text: '🌾 Tunas Padi Segar', key: 'padi', min: 45, unit: ' rumpun' },
          q3: { text: '⚖️ Kesehatan Sawah', key: 'health', min: 75, unit: '%' }
        },
        actions: ['air', 'padi', 'ular'],
        quiz: {
          question: 'Saat musim kemarau panjang membuat tanah sawah retak dan tanaman padi mati mengering, mengapa burung elang dan ular sawah ikut kelaparan?',
          options: [
            { text: 'A. Elang dan ular sangat suka memakan daun padi yang hijau', correct: false },
            { text: 'B. Tikus kehilangan makanan dan mati, sehingga ular dan elang kehabisan mangsa', correct: true },
            { text: 'C. Ular dan elang takut pada tanah sawah yang retak', correct: false }
          ],
          explanation: 'Benar sekali! Padi adalah produsen utama sumber energi. Saat padi mati, tikus herbivora kelaparan dan berkurang, sehingga predator pemangsa tikus ikut kehabisan makanan!'
        }
      },
      {
        id: 'sawah_m2',
        num: 2,
        type: 'manusia',
        typeLabel: 'Faktor Ulah Manusia',
        typeColor: 0xef4444,
        title: 'Misi 2: Bahaya Racun & Jerat Petani',
        headline: 'Racun Kimia & Perburuan Ular Sawah!',
        speech: 'Detektif, petani menyemprot racun kimia dan memburu ular sawah! Akibatnya katak mati dan tikus merajalela. Yuk kembalikan katak, lepas ular, dan bersihkan tanah!',
        initPop: { padi: 20, tikus: 80, katak: 5, ular: 0, elang: 10, jamur: 25 },
        waterLevel: 80,
        waste: 25,
        pesticideClean: false,
        targets: {
          q1: { text: '🐍 Lepas Ular Pemangsa', key: 'ular', min: 20, unit: ' ekor' },
          q2: { text: '🐸 Kembalikan Katak Sahabat', key: 'katak', min: 25, unit: ' ekor' },
          q3: { text: '🍃 Bersihkan Residu Racun', key: 'pesticideClean', target: true, unit: '' }
        },
        actions: ['ular', 'katak', 'bersih_racun'],
        quiz: {
          question: 'Jika petani memburu semua ular sawah hingga habis karena takut dipatuk, apa bahaya besar yang akan menimpa hasil panen padi petani?',
          options: [
            { text: 'A. Hama tikus melonjak sangat banyak dan memakan habis bulir padi', correct: true },
            { text: 'B. Padi akan tumbuh semakin lebat dan subur', correct: false },
            { text: 'C. Burung elang akan membantu menanam tunas padi baru', correct: false }
          ],
          explanation: 'Tepat sekali! Ular sawah adalah predator alami pengendali hama tikus. Tanpa ular, populasi tikus meledak dan menghabiskan padi petani!'
        }
      }
    ]
  },
  hutan: {
    id: 'hutan',
    order: 2,
    name: 'Ekosistem Hutan Tropis',
    shortName: 'Hutan Tropis',
    badge: 'badge_hutan',
    bg: 'bg_hutan',
    ambientColor: 0x14532d,
    accentColor: 0x16a34a,
    desc: 'Rimba hujan tropis Nusantara rumah bagi Harimau Sumatera, rusa, dan pohon raksasa.',
    missions: [
      {
        id: 'hutan_m1',
        num: 1,
        type: 'alam',
        typeLabel: 'Faktor Ulah Alam',
        typeColor: 0xd97706,
        title: 'Misi 3: Kemarau & Pohon Kering',
        headline: 'Panas Terik Membakar Dedaunan Rimba!',
        speech: 'Waspada Detektif! Hutan tropis dilanda kemarau ekstrem hingga mata air kering dan rumput hangus. Segera alirkan air mata air rimba dan tanam tunas pohon!',
        initPop: { pohon: 20, rusa: 15, harimau: 8, jamur: 10 },
        waterLevel: 25,
        targets: {
          q1: { text: '💧 Alirkan Mata Air Rimba', key: 'waterLevel', min: 60, unit: '%' },
          q2: { text: '🌲 Reboisasi Tunas Rimba', key: 'pohon', min: 45, unit: ' pohon' },
          q3: { text: '⚖️ Keseimbangan Hutan', key: 'health', min: 75, unit: '%' }
        },
        actions: ['air_rimba', 'tanam_pohon', 'urai_abu'],
        quiz: {
          question: 'Mengapa kemarau panjang yang mengeringkan tumbuhan rimba bisa memicu kawanan harimau turun ke pemukiman warga?',
          options: [
            { text: 'A. Harimau ingin mencari tempat berteduh di rumah warga', correct: false },
            { text: 'B. Tumbuhan mati membuat rusa kelaparan dan berkurang, sehingga harimau mencari mangsa di luar hutan', correct: true },
            { text: 'C. Harimau sangat suka meminum air sumur warga desa', correct: false }
          ],
          explanation: 'Tepat! Rantai makanan rimba saling terhubung. Saat produsen (pohon/rumput) layu, mangsa harimau (rusa) berkurang drastis sehingga predator puncak kelaparan!'
        }
      },
      {
        id: 'hutan_m2',
        num: 2,
        type: 'manusia',
        typeLabel: 'Faktor Ulah Manusia',
        typeColor: 0xef4444,
        title: 'Misi 4: Penebangan Liar & Jerat Pemburu',
        headline: 'Pembalakan Hutan & Jerat Liar!',
        speech: 'Gawat! Penebang liar membabat pohon rimba dan pemburu memasang jerat harimau! Singkirkan jerat pemburu, rawat harimau, dan tanam kembali pohon rimba!',
        initPop: { pohon: 15, rusa: 35, harimau: 2, jamur: 20 },
        waterLevel: 80,
        targets: {
          q1: { text: '🐯 Selamatkan Harimau Sumatera', key: 'harimau', min: 10, unit: ' ekor' },
          q2: { text: '🌲 Tanam Pohon Rimba Baru', key: 'pohon', min: 50, unit: ' pohon' },
          q3: { text: '🛑 Singkirkan Jerat Liar', key: 'trapsClean', target: true, unit: '' }
        },
        actions: ['rawat_harimau', 'tanam_pohon', 'sita_jerat'],
        quiz: {
          question: 'Apa dampak buruk yang terjadi jika pohon-pohon rimba ditebang liar terus-menerus oleh oknum perusak hutan?',
          options: [
            { text: 'A. Kawanan rusa kehilangan rumah dan makanan, serta tanah rimba longsor terkikis erosi', correct: true },
            { text: 'B. Hutan akan menjadi lebih terang dan semakin banyak buah manis', correct: false },
            { text: 'C. Harimau akan belajar memakan dedaunan kering', correct: false }
          ],
          explanation: 'Sangat tepat! Pohon rimba adalah habitat, sumber oksigen, dan makanan hewan herbivora. Penebangan liar meruntuhkan fondasi seluruh ekosistem hutan!'
        }
      }
    ]
  },
  sungai: {
    id: 'sungai',
    order: 3,
    name: 'Ekosistem Sungai Air Tawar',
    shortName: 'Sungai',
    badge: 'badge_danau',
    bg: 'bg_danau',
    ambientColor: 0x164e63,
    accentColor: 0x0891b2,
    desc: 'Perairan sungai air tawar tempat hidup ikan gabus, teratai, keong, dan burung bangau.',
    missions: [
      {
        id: 'sungai_m1',
        num: 1,
        type: 'alam',
        typeLabel: 'Faktor Ulah Alam',
        typeColor: 0xd97706,
        title: 'Misi 5: Air Surut & Gulma Menutup',
        headline: 'Sungai Surut & Ledakan Gulma Alami!',
        speech: 'Halo Detektif! Aliran sungai surut dan eceng gondok tumbuh terlalu lebat menutupi permukaan air sehingga ikan lemas! Yuk buka pintu hulu dan angkat gulma liar!',
        initPop: { teratai: 10, gulma: 70, ikan: 20, bangau: 8 },
        waterLevel: 30,
        targets: {
          q1: { text: '💧 Alirkan Air Hulu Sungai', key: 'waterLevel', min: 65, unit: '%' },
          q2: { text: '🌿 Bersihkan Tumpukan Gulma', key: 'gulma', max: 25, unit: ' rumpun' },
          q3: { text: '🐟 Ikan Tawar Bernapas Segar', key: 'ikan', min: 45, unit: ' ekor' }
        },
        actions: ['buka_hulu', 'bersih_gulma', 'tanam_teratai'],
        quiz: {
          question: 'Mengapa permukaan air sungai yang tertutup rapat oleh tumbuhan eceng gondok dapat menyebabkan ikan-ikan di dalam air mati lemas?',
          options: [
            { text: 'A. Eceng gondok meneteskan racun berbahaya ke mata ikan', correct: false },
            { text: 'B. Sinar matahari dan udara tidak bisa masuk, sehingga air kekurangan oksigen untuk napas ikan', correct: true },
            { text: 'C. Ikan menjadi terlalu kenyang memakan akar eceng gondok', correct: false }
          ],
          explanation: 'Benar sekali! Tumbuhan air yang menutup rapat menghalangi difusi oksigen dan fotosintesis bawah air, menyebabkan penurunan kadar oksigen terlarut!'
        }
      },
      {
        id: 'sungai_m2',
        num: 2,
        type: 'manusia',
        typeLabel: 'Faktor Ulah Manusia',
        typeColor: 0xef4444,
        title: 'Misi 6: Racun Limbah & Sampah Plastik',
        headline: 'Limbah Pabrik Mencemari Aliran Sungai!',
        speech: 'Perhatian! Limbah detergen cair pabrik dan sampah plastik mencemari sungai kita! Ikan kecil mati dan bangau teracuni. Ayo pasang penyaring air dan angkut sampah!',
        initPop: { teratai: 15, ikan: 10, bangau: 4, limbah: 60 },
        waterLevel: 80,
        targets: {
          q1: { text: '🧪 Saring Limbah Kimia Pabrik', key: 'limbah', max: 15, unit: '%' },
          q2: { text: '🐟 Tebar Benih Ikan Tawar', key: 'ikan', min: 40, unit: ' ekor' },
          q3: { text: '🕊️ Lindungi Burung Bangau', key: 'bangau', min: 12, unit: ' ekor' }
        },
        actions: ['saring_limbah', 'tebar_ikan', 'angkat_sampah'],
        quiz: {
          question: 'Bagaimana racun limbah detergen pabrik yang mencemari air sungai dapat menyebabkan burung bangau pemangsa ikut jatuh sakit dan mati?',
          options: [
            { text: 'A. Racun diserap ikan kecil, lalu ikan beracun tersebut dimakan oleh bangau (bioakumulasi)', correct: true },
            { text: 'B. Burung bangau mandi di sungai menggunakan sabun detergen', correct: false },
            { text: 'C. Bangau menelan plastik karena mengira plastik adalah ikan', correct: false }
          ],
          explanation: 'Hebat! Inilah prinsip aliran rantai makanan. Racun di air terserap oleh produsen dan ikan kecil, kemudian menumpuk di tubuh burung pemangsanya!'
        }
      }
    ]
  },
  laut: {
    id: 'laut',
    order: 4,
    name: 'Ekosistem Laut Terumbu Karang',
    shortName: 'Laut',
    badge: 'badge_laut',
    bg: 'bg_laut',
    ambientColor: 0x082f49,
    accentColor: 0x0284c7,
    desc: 'Samudra tropis Nusantara dengan hamparan terumbu karang warna-warni, penyu, dan ikan badut.',
    missions: [
      {
        id: 'laut_m1',
        num: 1,
        type: 'alam',
        typeLabel: 'Faktor Ulah Alam',
        typeColor: 0xd97706,
        title: 'Misi 7: Air Laut Panas & Karang Memutih',
        headline: 'Gelombang Panas Samudra & Coral Bleaching!',
        speech: 'Halo Detektif! Suhu air laut memanas alami hingga karang memutih dan rapuh! Akibatnya ikan karang kehilangan tempat berlindung. Yuk rehabilitasi karang laut!',
        initPop: { karang: 15, ikan: 25, penyu: 6, hiu: 3, pengurai: 10 },
        targets: {
          q1: { text: '🪸 Tanam Bibit Karang Sehat', key: 'karang', min: 45, unit: ' koloni' },
          q2: { text: '🐠 Pulihkan Kawanan Ikan Karang', key: 'ikan', min: 50, unit: ' ekor' },
          q3: { text: '⚖️ Keseimbangan Samudra', key: 'health', min: 75, unit: '%' }
        },
        actions: ['tanam_karang', 'bantu_pengurai', 'sebar_zooplankton'],
        quiz: {
          question: 'Mengapa saat terumbu karang memutih dan rusak, ikan hiu sebagai predator puncak samudra ikut kesulitan mendapatkan makanan?',
          options: [
            { text: 'A. Hiu memakan batu karang sebagai makanan pokoknya', correct: false },
            { text: 'B. Karang adalah rumah dan tempat mencari makan ikan-ikan kecil yang menjadi mangsa hiu', correct: true },
            { text: 'C. Suhu panas membuat gigi ikan hiu patah', correct: false }
          ],
          explanation: 'Tepat sekali! Terumbu karang adalah pusat kehidupan laut. Tanpa karang yang sehat, ikan-ikan kecil pergi atau mati, memutus rantai makanan hiu!'
        }
      },
      {
        id: 'laut_m2',
        num: 2,
        type: 'manusia',
        typeLabel: 'Faktor Ulah Manusia',
        typeColor: 0xef4444,
        title: 'Misi 8: Ledakan Bom Ikan & Sampah Laut',
        headline: 'Pengeboman Karang & Jeratan Plastik!',
        speech: 'Detektif, nelayan ilegal memakai bom ikan yang menghancurkan karang dan sampah plastik menjerat penyu! Sita bahan peledak, bersihkan plastik, dan rawat penyu!',
        initPop: { karang: 10, ikan: 15, penyu: 2, hiu: 2, sampah: 65 },
        targets: {
          q1: { text: '🐢 Selamatkan Penyu Laut', key: 'penyu', min: 8, unit: ' ekor' },
          q2: { text: '🪸 Rehabilitasi Terumbu Karang', key: 'karang', min: 50, unit: ' koloni' },
          q3: { text: '🛑 Bersihkan Sampah Plastik', key: 'sampah', max: 15, unit: '%' }
        },
        actions: ['sita_bom', 'bersih_plastik', 'rawat_penyu'],
        quiz: {
          question: 'Mengapa menangkap ikan menggunakan bahan peledak bom laut dilarang keras oleh hukum dan merugikan masa depan anak cucu nelayan?',
          options: [
            { text: 'A. Bom laut menghancurkan terumbu karang yang butuh puluhan tahun untuk tumbuh kembali', correct: true },
            { text: 'B. Suara ledakan bom membuat air laut menjadi terlalu asin', correct: false },
            { text: 'C. Ikan hasil bom laut tidak bisa dimasak dengan minyak goreng', correct: false }
          ],
          explanation: 'Luar biasa! Satu ledakan bom dapat memusnahkan terumbu karang yang membutuhkan waktu puluhan hingga ratusan tahun untuk tumbuh, memusnahkan habitat ikan selamanya!'
        }
      }
    ]
  }
};
```

- [ ] **Step 2: Add script tag in `WEBSITE/phaser.html`**

Insert `<script src="js/phaser-game/data/ecosystems-data.js?v=2.0"></script>` before the scenes.

- [ ] **Step 3: Validate syntax with `node -c`**

Run: `node -c WEBSITE/js/phaser-game/data/ecosystems-data.js`  
Expected: Exit code 0 (no syntax errors).

- [ ] **Step 4: Commit**

```bash
git add WEBSITE/js/phaser-game/data/ecosystems-data.js WEBSITE/phaser.html
git commit -m "feat(data): add master ecosystems and missions data configuration"
```

---

### Task 3: Progress & Persistence Manager (`ProgressManager.js`)

**Files:**
- Create: `WEBSITE/js/phaser-game/managers/ProgressManager.js`
- Modify: `WEBSITE/phaser.html` (Include ProgressManager script tag)
- Test: `node -c WEBSITE/js/phaser-game/managers/ProgressManager.js`

**Interfaces:**
- Produces: `window.ProgressManager` singleton with methods:
  - `load()`: returns current progress state.
  - `isEcosystemUnlocked(ecoId)`: boolean.
  - `isMissionUnlocked(missionId)`: boolean.
  - `saveMissionResult(missionId, stars, health, quizPassed)`: updates progress and unlocks next mission/ecosystem.
  - `getTotalStars()`: returns integer.
  - `getEcosystemStars(ecoId)`: returns integer.
  - `resetProgress()`: resets to fresh state (only Sawah M1 unlocked).

- [ ] **Step 1: Write `ProgressManager.js`**

```javascript
// WEBSITE/js/phaser-game/managers/ProgressManager.js
/**
 * ECO-EXPLORER: PROGRESS & UNLOCK MANAGER
 * Handles persistent state via localStorage with in-memory fallback.
 * Enforces sequential linear lock:
 * Sawah (M1 -> M2) -> Hutan (M1 -> M2) -> Sungai (M1 -> M2) -> Laut (M1 -> M2)
 */

class ProgressManager {
  constructor() {
    this.STORAGE_KEY = 'eco_explorer_save_v2';
    this.state = this.getInitialState();
    this.load();
  }

  getInitialState() {
    return {
      version: 2,
      unlockedEcosystems: ['sawah'],
      currentEcosystem: 'sawah',
      missions: {
        sawah_m1: { unlocked: true, completed: false, stars: 0, bestHealth: 0, quizPassed: false },
        sawah_m2: { unlocked: false, completed: false, stars: 0, bestHealth: 0, quizPassed: false },
        hutan_m1: { unlocked: false, completed: false, stars: 0, bestHealth: 0, quizPassed: false },
        hutan_m2: { unlocked: false, completed: false, stars: 0, bestHealth: 0, quizPassed: false },
        sungai_m1: { unlocked: false, completed: false, stars: 0, bestHealth: 0, quizPassed: false },
        sungai_m2: { unlocked: false, completed: false, stars: 0, bestHealth: 0, quizPassed: false },
        laut_m1: { unlocked: false, completed: false, stars: 0, bestHealth: 0, quizPassed: false },
        laut_m2: { unlocked: false, completed: false, stars: 0, bestHealth: 0, quizPassed: false }
      },
      totalStars: 0
    };
  }

  load() {
    try {
      const saved = localStorage.getItem(this.STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.version === 2) {
          this.state = parsed;
          return this.state;
        }
      }
    } catch (e) {
      console.warn('[ProgressManager] localStorage load failed, using memory state:', e);
    }
    this.save();
    return this.state;
  }

  save() {
    try {
      this.recalculateStars();
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.state));
    } catch (e) {
      console.warn('[ProgressManager] localStorage save failed:', e);
    }
  }

  recalculateStars() {
    let total = 0;
    Object.values(this.state.missions).forEach(m => {
      total += (m.stars || 0);
    });
    this.state.totalStars = total;
  }

  isEcosystemUnlocked(ecoId) {
    return this.state.unlockedEcosystems.includes(ecoId);
  }

  isMissionUnlocked(missionId) {
    const m = this.state.missions[missionId];
    return m ? !!m.unlocked : false;
  }

  getMissionData(missionId) {
    return this.state.missions[missionId] || null;
  }

  getEcosystemStars(ecoId) {
    const m1 = this.state.missions[`${ecoId}_m1`]?.stars || 0;
    const m2 = this.state.missions[`${ecoId}_m2`]?.stars || 0;
    return m1 + m2;
  }

  getTotalStars() {
    this.recalculateStars();
    return this.state.totalStars;
  }

  /**
   * Records a mission completion, evaluates stars, and unlocks subsequent content.
   */
  saveMissionResult(missionId, stars, health, quizPassed) {
    if (!this.state.missions[missionId]) {
      this.state.missions[missionId] = { unlocked: true, completed: false, stars: 0, bestHealth: 0, quizPassed: false };
    }

    const current = this.state.missions[missionId];
    current.completed = true;
    current.stars = Math.max(current.stars || 0, stars);
    current.bestHealth = Math.max(current.bestHealth || 0, health);
    if (quizPassed) current.quizPassed = true;

    // Progression Unlock Rules
    const [ecoId, mNum] = missionId.split('_');

    if (mNum === 'm1') {
      // Completing Misi 1 unlocks Misi 2 of the same ecosystem
      const nextMissionId = `${ecoId}_m2`;
      if (this.state.missions[nextMissionId]) {
        this.state.missions[nextMissionId].unlocked = true;
      }
    } else if (mNum === 'm2') {
      // Completing Misi 2 unlocks the NEXT ecosystem in sequence
      const sequence = ['sawah', 'hutan', 'sungai', 'laut'];
      const currentIndex = sequence.indexOf(ecoId);
      if (currentIndex !== -1 && currentIndex < sequence.length - 1) {
        const nextEcoId = sequence[currentIndex + 1];
        if (!this.state.unlockedEcosystems.includes(nextEcoId)) {
          this.state.unlockedEcosystems.push(nextEcoId);
        }
        // Unlock Misi 1 of the new ecosystem
        const nextEcoFirstMission = `${nextEcoId}_m1`;
        if (this.state.missions[nextEcoFirstMission]) {
          this.state.missions[nextEcoFirstMission].unlocked = true;
        }
      }
    }

    this.save();
    return current;
  }

  resetProgress() {
    this.state = this.getInitialState();
    this.save();
    console.log('[ProgressManager] Progress reset to initial state.');
  }
}

window.progressManager = new ProgressManager();
```

- [ ] **Step 2: Add script tag in `WEBSITE/phaser.html`**

Insert `<script src="js/phaser-game/managers/ProgressManager.js?v=2.0"></script>` right after `ecosystems-data.js`.

- [ ] **Step 3: Validate syntax**

Run: `node -c WEBSITE/js/phaser-game/managers/ProgressManager.js`  
Expected: Exit code 0.

- [ ] **Step 4: Commit**

```bash
git add WEBSITE/js/phaser-game/managers/ProgressManager.js WEBSITE/phaser.html
git commit -m "feat(progress): add ProgressManager for persistent sequential progression"
```

---

### Task 4: Upgrade `TitleScene.js` & `TutorialScene.js`

**Files:**
- Modify: `WEBSITE/js/phaser-game/scenes/TitleScene.js`
- Modify: `WEBSITE/js/phaser-game/scenes/TutorialScene.js`
- Test: `node -c WEBSITE/js/phaser-game/scenes/TitleScene.js WEBSITE/js/phaser-game/scenes/TutorialScene.js`

**Interfaces:**
- Consumes: `window.progressManager`, `window.ECOSYSTEMS_DATA`.
- Produces: Updated title subtitle, 4-ecosystem references in welcome speech, direct transition from TeamSelect to `BiomeSelectScene`.

- [ ] **Step 1: Update TitleScene welcome text and voice-over to 4 Ecosystems**

In `TitleScene.js`:
- Update welcome bubble subtitle to: "Yuk, jaga keseimbangan 4 ekosistem Nusantara bersama-sama!"
- Voice fallback updated to: `"Halo, teman-teman! Aku Gita, detektif cilik. Mari kita selamatkan keseimbangan 4 ekosistem Nusantara bersama-sama!"`
- Navigation on "Mulai Bermain" continues to `TutorialScene` or `TeamSelectScene`.

- [ ] **Step 2: Update TutorialScene slides to reflect 4 Ecosystems & 2 Mission Factors**

In `TutorialScene.js`:
- Slide 1: Introduce the 4 Ecosystems of Nusantara (Sawah, Hutan Tropis, Sungai, Laut).
- Slide 2: Introduce the two crisis factors: Faktor Ulah Alam (kemarau, cuaca ekstrem) vs Faktor Ulah Manusia (perburuan liar, penebangan liar, limbah & racun kimia).
- Slide 3: How to investigate and simulate using the bottom touch controls and observe cascading ecological effects.
- Slide 4: Table Advisors CSCL Voting cards (Green, Yellow, Red) and Kamus Sawah.
- On completion: routes to `TeamSelectScene`.

- [ ] **Step 3: Update `TeamSelectScene.js` to route to `BiomeSelectScene`**

In `TeamSelectScene.js`:
- When a team is selected, route to `BiomeSelectScene` instead of jumping directly to Sawah `MissionMenuScene`:
  ```javascript
  this.scene.start('BiomeSelectScene');
  ```

- [ ] **Step 4: Validate syntax**

Run: `node -c WEBSITE/js/phaser-game/scenes/TitleScene.js WEBSITE/js/phaser-game/scenes/TutorialScene.js WEBSITE/js/phaser-game/scenes/TeamSelectScene.js`  
Expected: Exit code 0.

- [ ] **Step 5: Commit**

```bash
git add WEBSITE/js/phaser-game/scenes/TitleScene.js WEBSITE/js/phaser-game/scenes/TutorialScene.js WEBSITE/js/phaser-game/scenes/TeamSelectScene.js
git commit -m "feat(scenes): update TitleScene, TutorialScene, and TeamSelectScene for 4-ecosystem flow"
```

---

### Task 5: Upgrade `BiomeSelectScene.js` with Progression Locks & Star Ratings

**Files:**
- Modify: `WEBSITE/js/phaser-game/scenes/BiomeSelectScene.js`
- Test: `node -c WEBSITE/js/phaser-game/scenes/BiomeSelectScene.js`

**Interfaces:**
- Consumes: `window.progressManager`, `window.ECOSYSTEMS_DATA`.
- Produces: Interactive Nusantara Map with 4 ecosystem cards showing lock overlay (`🔒 Terkunci`), stars earned (`⭐ x/6`), and click handler routing to `MissionMenuScene` with `activeEcosystem`.

- [ ] **Step 1: Read lock status and stars from `window.progressManager` in `BiomeSelectScene.js`**

For each biome card:
```javascript
const isUnlocked = window.progressManager ? window.progressManager.isEcosystemUnlocked(b.id) : (b.id === 'sawah');
const stars = window.progressManager ? window.progressManager.getEcosystemStars(b.id) : 0;
```

- [ ] **Step 2: Render locked visual overlay on locked biomes**

- When `!isUnlocked`:
  - Darkened card alpha (`0.65`).
  - Render big golden lock badge `🔒 TERKUNCI` in center of card.
  - Status label: `"Tuntaskan ekosistem sebelumnya untuk membuka 🔓"`.
  - Disable click to enter, play warning chime on touch.
- When `isUnlocked`:
  - Rich emerald glow border.
  - Star tally pill: `⭐ ${stars}/6 Bintang`.
  - Button `SELIDIKI EKOSISTEM 🔍`.
  - On click: routes to `MissionMenuScene` passing `{ activeEcosystem: b.id }`.

- [ ] **Step 3: Add Teacher Reset Button in top header**

Add `🔄 Reset Kelas` button at top-left:
```javascript
const btnReset = this.createButton3D(100, headerY, 140, 48, '🔄 Reset Kelas', 0x475569, 0x64748b, () => {
  if (confirm('Yakin ingin mereset kemajuan kelas ke awal?')) {
    window.progressManager.resetProgress();
    this.scene.restart();
  }
});
```

- [ ] **Step 4: Validate syntax**

Run: `node -c WEBSITE/js/phaser-game/scenes/BiomeSelectScene.js`  
Expected: Exit code 0.

- [ ] **Step 5: Commit**

```bash
git add WEBSITE/js/phaser-game/scenes/BiomeSelectScene.js
git commit -m "feat(biomes): upgrade BiomeSelectScene with progression locks, stars, and reset"
```

---

### Task 6: Upgrade `MissionMenuScene.js` (2 Missions: Alam vs Manusia with Locks & Stars)

**Files:**
- Modify: `WEBSITE/js/phaser-game/scenes/MissionMenuScene.js`
- Test: `node -c WEBSITE/js/phaser-game/scenes/MissionMenuScene.js`

**Interfaces:**
- Consumes: `activeEcosystem` from registry (default `'sawah'`), `window.ECOSYSTEMS_DATA`, `window.progressManager`.
- Produces: 2 Mission Cards (Misi 1: Alam, Misi 2: Manusia) with stars, lock status on Misi 2, case briefing modal, and route to `SimulationScene`.

- [ ] **Step 1: Dynamically load missions for `activeEcosystem` in `MissionMenuScene.js`**

```javascript
this.activeEcosystemId = this.registry.get('activeEcosystem') || 'sawah';
this.ecoConfig = window.ECOSYSTEMS_DATA[this.activeEcosystemId] || window.ECOSYSTEMS_DATA.sawah;
this.missions = this.ecoConfig.missions; // Exactly 2 missions
```

- [ ] **Step 2: Render 2 Large Chunky Mission Cards with Lock on Misi 2**

- Card 1: `Misi 1 (Faktor Ulah Alam)`:
  - Badge tag: `🟡 FAKTOR ULAH ALAM`
  - Title: `ecoConfig.missions[0].title`
  - Stars earned: `⭐ ${m1Data.stars || 0}/3`
  - Unlocked by default.
- Card 2: `Misi 2 (Faktor Ulah Manusia)`:
  - Badge tag: `🔴 FAKTOR ULAH MANUSIA`
  - Title: `ecoConfig.missions[1].title`
  - Stars earned: `⭐ ${m2Data.stars || 0}/3`
  - Lock status: Checked via `window.progressManager.isMissionUnlocked(ecoConfig.missions[1].id)`.
  - If locked: Greyed out, displays `🔒 Selesaikan Misi 1 Dahulu!`, clicks trigger warning sound.

- [ ] **Step 3: Update Case Briefing Modal for the active mission**

- Briefing modal displays the selected mission's headline, why the ecosystem is damaged, and success targets.
- Clicking "KAMI SUDAH PAHAM, MULAI SIMULASI!" launches `SimulationScene` with `{ activeEcosystem: this.activeEcosystemId, activeMission: selectedMission }`.

- [ ] **Step 4: Validate syntax**

Run: `node -c WEBSITE/js/phaser-game/scenes/MissionMenuScene.js`  
Expected: Exit code 0.

- [ ] **Step 5: Commit**

```bash
git add WEBSITE/js/phaser-game/scenes/MissionMenuScene.js
git commit -m "feat(missions): update MissionMenuScene to render 2 missions (Nature vs Human) with locking"
```

---

### Task 7: Adapt `SimulationScene.js` into Data-Driven Engine

**Files:**
- Modify: `WEBSITE/js/phaser-game/scenes/SimulationScene.js`
- Test: `node -c WEBSITE/js/phaser-game/scenes/SimulationScene.js`

**Interfaces:**
- Consumes: `activeEcosystem` and `activeMission` from registry.
- Produces: Multi-biome simulation with dynamic background (`bg_sawah`, `bg_hutan`, `bg_danau`, `bg_laut`), biome-specific organism pools, crisis targets, and contextual touch actions.

- [ ] **Step 1: Read active ecosystem and mission in `init()`**

```javascript
this.activeEcosystemId = this.registry.get('activeEcosystem') || 'sawah';
this.activeEcosystem = window.ECOSYSTEMS_DATA[this.activeEcosystemId] || window.ECOSYSTEMS_DATA.sawah;
this.activeMission = this.registry.get('activeMission') || this.activeEcosystem.missions[0];
```

- [ ] **Step 2: Dynamically load background and setup organism pooling by biome**

- In `create()`:
  - Set background texture to `this.activeEcosystem.bg`.
- In `initOrganismPool(width)`:
  - If `sawah`: Pool padi, tikus, katak, ular, elang, jamur.
  - If `hutan`: Pool pohon_hutan, rusa, harimau, jamur_hutan.
  - If `sungai`: Pool teratai, eceng_gondok, ikan_kecil, keong, ikan_gabus, bangau.
  - If `laut`: Pool karang, ikan_kecil, penyu, hiu, pengurai_laut.

- [ ] **Step 3: Update `getContextualActions()` to load actions from `this.activeMission.actions`**

Configure actions according to the active mission:
- Misi 1 Sawah: Air Irigasi, Tanam Padi, Pantau Ular.
- Misi 2 Sawah: Lepas Ular, Lepas Katak, Bersihkan Racun.
- Misi 3 Hutan: Air Rimba, Tanam Pohon, Urai Abu.
- Misi 4 Hutan: Selamatkan Harimau, Tanam Pohon, Sita Jerat.
- Misi 5 Sungai: Buka Hulu, Bersihkan Gulma, Tanam Teratai.
- Misi 6 Sungai: Saring Limbah, Tebar Ikan, Angkut Sampah.
- Misi 7 Laut: Tanam Karang, Bantu Pengurai, Sebar Zooplankton.
- Misi 8 Laut: Sita Bom, Bersihkan Plastik, Rawat Penyu.

- [ ] **Step 4: Update checklist HUD and check mission completion**

Check targets from `this.activeMission.targets`. When `ecoHealth >= 75%` and targets are met, proceed to `QuizScene`.

- [ ] **Step 5: Validate syntax**

Run: `node -c WEBSITE/js/phaser-game/scenes/SimulationScene.js`  
Expected: Exit code 0.

- [ ] **Step 6: Commit**

```bash
git add WEBSITE/js/phaser-game/scenes/SimulationScene.js
git commit -m "feat(sim): adapt SimulationScene into unified multi-biome data-driven engine"
```

---

### Task 8: Upgrade `QuizScene.js` & `VictoryScene.js` with C2 Quizzes, Star Ratings & Unlocks

**Files:**
- Modify: `WEBSITE/js/phaser-game/scenes/QuizScene.js`
- Modify: `WEBSITE/js/phaser-game/scenes/VictoryScene.js`
- Test: `node -c WEBSITE/js/phaser-game/scenes/QuizScene.js WEBSITE/js/phaser-game/scenes/VictoryScene.js`

**Interfaces:**
- Consumes: `activeMission.quiz`, simulation results (`health`, `timeLeft`).
- Produces: Mission-specific C2 reasoning quiz, 1-3 star calculation, `ProgressManager.saveMissionResult`, and next mission unlock routing.

- [ ] **Step 1: Render mission-specific C2 quiz in `QuizScene.js`**

Read `this.activeMission.quiz`:
- Display the question and 3 answer options.
- Track whether the student answered correctly on the first attempt (`firstAttemptCorrect = true/false`).
- On correct answer, pass `{ firstAttemptCorrect, health, activeMission, activeEcosystem }` to `VictoryScene`.

- [ ] **Step 2: Calculate stars and save progress in `VictoryScene.js`**

In `VictoryScene.js`:
- Calculate stars earned:
  - 1 Star: Health $\ge 75\%$.
  - 2 Stars: Health $\ge 75\%$ + Quiz Passed.
  - 3 Stars: Health $\ge 85\%$ + Quiz Passed on first attempt.
- Save to progress manager:
  ```javascript
  window.progressManager.saveMissionResult(this.activeMission.id, stars, this.health, true);
  ```
- Render 1 to 3 animated bouncing golden stars with sound chime.

- [ ] **Step 3: Render Next Action Buttons in `VictoryScene.js`**

- If `this.activeMission.id.endsWith('_m1')`:
  - Button 1: `LANJUT KE MISI 2 (ULAH MANUSIA) ⏩` (Starts `MissionMenuScene` or directly `SimulationScene` for M2).
  - Button 2: `PETA EKOSISTEM 🗺️` (Returns to `BiomeSelectScene`).
- If `this.activeMission.id.endsWith('_m2')`:
  - Show celebratory banner: `🎉 EKOSISTEM BARU TERBUKA!`.
  - Button: `MENUJU PETA EKOSISTEM 🗺️` (Returns to `BiomeSelectScene` showing the newly unlocked biome!).
- If Misi 8 (Laut Misi 2):
  - Special screen: `🏆 MAHA DETEKTIF PENJAGA KESEIMBANGAN NUSANTARA!`.

- [ ] **Step 4: Validate syntax**

Run: `node -c WEBSITE/js/phaser-game/scenes/QuizScene.js WEBSITE/js/phaser-game/scenes/VictoryScene.js`  
Expected: Exit code 0.

- [ ] **Step 5: Commit**

```bash
git add WEBSITE/js/phaser-game/scenes/QuizScene.js WEBSITE/js/phaser-game/scenes/VictoryScene.js
git commit -m "feat(eval): implement C2 quizzes, 3-star rating calculation, and unlock progression in VictoryScene"
```

---

### Task 9: Master Rebuild, Sync Skripsi Docs & Verification

**Files:**
- Modify: `docs/PRD_GAME_SKRIPSI.md`
- Modify: `docs/LKPD_DETEKTIF_SAWAH.md`
- Modify: `docs/ROADMAP.md`
- Rebuild: `build.py`
- Test: Browser subagent / headless verification on `file:///D:/SKRIPSI%20GITA/WEBSITE/phaser.html`

**Interfaces:**
- Produces: 100% updated companion docs and verified game build running offline.

- [ ] **Step 1: Update `docs/PRD_GAME_SKRIPSI.md`**

Document the 4 ecosystems, 8 missions (Alam vs Manusia), star formula, and sequential progression locking.

- [ ] **Step 2: Update `docs/LKPD_DETEKTIF_SAWAH.md`**

Update worksheet title to "Buku Catatan Detektif Ekosistem" and add observation sections for Hutan, Sungai, and Laut.

- [ ] **Step 3: Update `docs/ROADMAP.md`**

Record Milestone 2 development status reflecting multi-ecosystem progression.

- [ ] **Step 4: Execute `python build.py`**

Run: `python build.py`  
Expected: All 71 visual assets, 25 audio tracks, and 8 docs packed into `assets-data.js`, `vo-data.js`, and `docs-data.js`.

- [ ] **Step 5: Browser verification of the complete progression flow**

Verify:
1. Title screen displays "PENJAGA KESEIMBANGAN EKOSISTEM".
2. Biome Map displays Sawah unlocked, Hutan/Sungai/Laut locked with lock badges.
3. Sawah displays Misi 1 (Alam) unlocked and Misi 2 (Manusia) locked.
4. Completing Misi 1 unlocks Misi 2.
5. Completing Misi 2 unlocks Hutan Tropis on the Biome Map.
6. Stars are tracked and displayed correctly.

- [ ] **Step 6: Commit all documentation and build changes**

```bash
git add docs/PRD_GAME_SKRIPSI.md docs/LKPD_DETEKTIF_SAWAH.md docs/ROADMAP.md docs/docs-data.js WEBSITE/js/assets-data.js
git commit -m "docs: synchronize skripsi companion documents for multi-ecosystem architecture"
```
