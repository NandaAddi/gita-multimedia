# Rice Field Biome Visual Realism Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Merombak tampilan ekosistem sawah (Bioma Sawah Terasering Nusantara) agar realistis dan menawan: menghilangkan bidang trapesium datar kaku dan ranting laba-laba, menerapkan 3 tingkatan terasering berundak dengan kurva kontur pematang melengkung alami, jaringan rekahan lempeng tanah liat poligonal 3D saat kemarau (<32%), cermin pantulan genangan air saat cukup air, rumpun padi lebat dengan helai lentur yang "menari" ditiup gelombang angin menjalar (*undulating wind-wave*), parit irigasi batu dengan pintu air (*tulakan*), serta umpan balik visual kausalitas konkret (aliran air irigasi aktif & bercak hopperburn wereng).

**Architecture:**
1. Layer Tanah, Pematang, & Air (`js/renderers/characters.js` - `texSoilSawah`, `drawTerraceBunds`, `drawPolygonalMudCracks`, `drawIrrigationCanal`):
   - Kontur 3 tingkatan pematang terasering berundak (terrace bunds) dengan kurva Bezier alami, tekstur tanah liat padat, bayangan 3D, dan rumput galengan merayap.
   - Jaringan rekahan lempeng tanah liat poligonal (mud desiccation fissures) berkedalaman 3D saat kemarau (`S.water < 32`), menggantikan total dahan/ranting kaku yang ada.
   - Cermin pantulan genangan air sawah berkilau (*flooded mirror paddy*) dengan riak air sinusoidal dan respon krisis saat air cukup atau tercemar.
   - Saluran parit irigasi batu kali di batas pematang dengan pintu air kayu (*tulakan*).
2. Layer Lanskap, Padi Menari, & Reaksi Kausalitas (`js/renderers/backgrounds.js` - `sceneSawah`, `spRice`):
   - Latar belakang pegunungan berlapis tropis berkabut atmosferik (siluet Gunung Arjuno lereng Malang) dan pepohonan pedesaan di kejauhan.
   - Rumpun padi lebat (`spRice`) dengan 7–9 helai daun lentur menjuntai melengkung alami (*arching flexible leaves*) dan malai bulir padi yang menunduk saat fase berbulir (`S.prod > 45`).
   - Algoritma hembusan gelombang angin sawah menjalar (*sweeping undulating wind wave*) melintasi petak terasering sehingga rumpun padi meliuk anggun ("menari").
   - Kepadatan barisan jajar legowo yang tertata rapi sehingga tidak gersang di Hari 1, dengan transformasi tinggi & keemasan bertahap seiring pertumbuhan `prod`.
   - Efek visual bercak padi menguning terbakar (*hopperburn*) saat serangan hama wereng.
3. Layer Interaksi Kausalitas Konkret (`js/scenes/simulation.js` & `backgrounds.js`):
   - Timer animasi aliran air aktif (`S._irrigationFlowTimer`) yang dipicu saat kartu "Alirkan Air Irigasi" dimainkan, menyemburkan air berbuih putih dari pintu air menuruni terasering.
4. Layer Verifikasi & Sinkronisasi Skripsi:
   - Skrip tes verifikasi otomatis (`tests/verify_sawah_realism.js`).
   - Sinkronisasi dokumen pendamping (`docs/PRD_GAME_SKRIPSI.md`, `docs/ROADMAP.md`, `docs/LKPD_DETEKTIF_SAWAH.md`).

**Tech Stack:** HTML5 2D Canvas API, Procedural Math (trigonometry, noise, Bezier), Vanilla JavaScript ES6+.

**Spec:** `docs/superpowers/specs/2026-10-07-rice-field-biome-realism-design.md`

## Global Constraints
- Target Perangkat: Layar Sentuh Interactive Flat Panel (IFP 65–86 Inch, 1920x1080 Landscape).
- Performance: Tetap mempertahankan 60 FPS tanpa lagging menggunakan Canvas 2D procedural rendering.
- Pedagogical Alignment: Memenuhi prinsip konkret Piaget dan Mayer Signaling/Coherence.

---

### Task 1: Layer Tanah Terasering, Pematang 3D, Rekahan Poligonal Tanah, & Parit Irigasi Batu (`js/renderers/characters.js`)

**Files:**
- Modify: `d:\SKRIPSI GITA\TES GITA BARU 1\js\renderers\characters.js`

**Interfaces:**
- Produces: Updated `texSoilSawah(c, t, S)`
- Helper functions: `drawTerracePaddyBase(c, t, S)`, `drawPolygonalMudCracks(c, droughtSeverity)`, `drawIrrigationCanal(c, t, S)`

- [ ] **Step 1: Implement realistic polygonal mud desiccation fissures for drought (`drawPolygonalMudCracks`)**
Menggantikan sistem 11 titik cabang kaku (`fissureCenters`) dengan jaringan lempeng rekahan tanah liat poligonal berbayang kedalaman 3D dan serak jerami kering.

- [ ] **Step 2: Implement 3-tier terraced mud bunds with natural curves and creeping grass**
Mengimplementasikan pematang berundak 3D dengan kontur melengkung organik melintasi $y=580$, $y=780$, dan $y=980$, bayangan bawah tebal, dan rumpun rumput galengan yang bergoyang halus ditiup angin.

- [ ] **Step 3: Implement stone irrigation canal and wooden sluice gate (tulakan) on terrace edge**
Menggambar parit irigasi samping dari bebatuan kali abu-abu alami dan pintu air papan kayu vertikal di tepi terasering atas.

- [ ] **Step 4: Implement flooded mirror paddy reflection and water sheen for `S.water >= 32`**
Menghadirkan gradasi cermin pantulan langit, riak air halus sinusoidal, dan kilau specular air pada petak-petak terasering saat kondisi air mencukupi.

- [ ] **Step 5: Integrate all components inside `texSoilSawah(c, t, S)`**
Mengintegrasikan seluruh sub-sistem di atas ke dalam `texSoilSawah`, mendukung kondisi krisis kemarau, kondisi air normal/melimpah, pencemaran pupuk/pestisida kimiawi (`S.poison > 20`), dan aliran air irigasi aktif.

---

### Task 2: Background Pegunungan Berlapis, Rumpun Padi Lebat `spRice`, & Gelombang Angin Menjalar ("Menari") (`js/renderers/backgrounds.js` & `characters.js`)

**Files:**
- Modify: `d:\SKRIPSI GITA\TES GITA BARU 1\js\renderers\characters.js`
- Modify: `d:\SKRIPSI GITA\TES GITA BARU 1\js\renderers\backgrounds.js`

**Interfaces:**
- Produces: Updated `spRice(c, x, y, hgt, col, sw, tier, stage, hopperburn)`, updated `sceneSawah(c, t, S)`

- [ ] **Step 1: Refactor `spRice` with lush multi-blade tiller clumps & bending panicles**
Mengrombak `spRice` di `characters.js`: 7–9 helai daun lentur menjuntai melengkung anggun, anakan batang bawah rimbun, bulir malai menunduk saat `S.prod` tinggi, dan mendukung parameter warna krisis/hopperburn.

- [ ] **Step 2: Replace plain ridges in `sceneSawah` with layered tropical mountains & tree silhouettes**
Di `backgrounds.js` (`sceneSawah`): mengganti 3 poligon segitiga `texRidge` dengan pegunungan tropis lereng Malang/Batu berkabut lembah atmosferik dan siluet pepohonan kelapa/bambu di kejauhan.

- [ ] **Step 3: Implement sweeping undulating wind wave algorithm across terrace tiers**
Menerapkan formula gelombang angin menjalar gabungan $t$ dan $x$:
`const windWave = Math.sin(t * 0.0024 - x * 0.0035 + tier * 0.9) * (8 + r1 * 10);`
sehingga rumpun padi meliuk lentur selaras seperti ombak hijau hamparan sawah ("menari").

- [ ] **Step 4: Implement jajar legowo planting grid density across 4 rows/tiers**
Menata posisi rumpun padi agar tetap tampak teratur, tertata, dan hijau hidup sejak Hari 1, bertambah lebat, tinggi, dan menguning keemasan seiring naiknya `S.prod`.

- [ ] **Step 5: Implement hopperburn effect during wereng infestation**
Menambahkan efek bercak daun menguning/terbakar (*hopperburn*) pada rumpun padi di area yang terkena serangan wereng (`S.wereng > 20`).

---

### Task 3: Pemicu Aliran Irigasi & Kausalitas Konkret di Aksi Simulasi (`js/scenes/simulation.js`)

**Files:**
- Modify: `d:\SKRIPSI GITA\TES GITA BARU 1\js\scenes\simulation.js`
- Modify: `d:\SKRIPSI GITA\TES GITA BARU 1\js\renderers\backgrounds.js`

**Interfaces:**
- Consumes: Action trigger when player taps "Alirkan Air Irigasi"
- Produces: `S._irrigationFlowTimer = 180` (aktif selama ~3 detik) dan animasi semburan air berbuih putih dari pintu air menuruni terasering.

- [ ] **Step 1: Trigger `S._irrigationFlowTimer` when action `air` is executed in `simulation.js`**
Saat pemain mengeksekusi kartu aksi ber-id `'air'`, set `S._irrigationFlowTimer = 180` (frame countdown) atau timestamp.

- [ ] **Step 2: Render surging water flow animation in `sceneSawah` / `texSoilSawah`**
Saat `S._irrigationFlowTimer > 0`, render pancaran air jernih berbuih putih meluncur deras dari pintu air kayu (tulakan) menyusuri parit dan menyebar ke petak terasering.

---

### Task 4: Skrip Pengujian Otomatis (`tests/verify_sawah_realism.js`) & Verifikasi Tampilan Visual

**Files:**
- Create: `d:\SKRIPSI GITA\TES GITA BARU 1\tests\verify_sawah_realism.js`

**Interfaces:**
- Tests all visual scenarios without errors in Node.js canvas / mock environment.

- [ ] **Step 1: Write automated test script `tests/verify_sawah_realism.js`**
Menguji:
1. Sawah Hari 1 Kemarau (`water: 14, prod: 30, wereng: 0`) -> verifikasi rekahan tanah poligonal.
2. Sawah Air Cukup & Subur (`water: 80, prod: 65, wereng: 0`) -> verifikasi cermin air dan padi keemasan.
3. Sawah Krisis Wereng (`wereng: 75, water: 60, prod: 35`) -> verifikasi efek hopperburn.
4. Sawah Aliran Irigasi Aktif (`_irrigationFlowTimer: 120`).

- [ ] **Step 2: Execute automated test script and confirm 100% pass**
Jalankan tes via Node.js dan pastikan tidak ada exception.

- [ ] **Step 3: Capture visual screenshot / verification via browser subagent**
Verifikasi visual tampilan sawah secara langsung di layar.

---

### Task 5: Sinkronisasi Dokumen Pendamping Skripsi (`docs/PRD_GAME_SKRIPSI.md`, `ROADMAP.md`, `LKPD_DETEKTIF_SAWAH.md`)

**Files:**
- Modify: `d:\SKRIPSI GITA\docs\PRD_GAME_SKRIPSI.md`
- Modify: `d:\SKRIPSI GITA\docs\ROADMAP.md`
- Modify: `d:\SKRIPSI GITA\docs\LKPD_DETEKTIF_SAWAH.md`

- [ ] **Step 1: Update PRD_GAME_SKRIPSI.md**
Catat perombakan Bioma Sawah Terasering Nusantara, sistem rekahan tanah poligonal, gelombang angin padi menari, dan animasi kausalitas pintu air.

- [ ] **Step 2: Update ROADMAP.md**
Catat pencapaian milestone perombakan visual dan dinamika bioma sawah.

- [ ] **Step 3: Update LKPD_DETEKTIF_SAWAH.md**
Perbarui petunjuk pengamatan visual siswa Detektif Sawah terhadap kondisi air, retakan tanah, dan pintu air.
