# Modular Vanilla JS Architecture Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refactor monolithic single-file `TES GITA BARU 1/index.html` (2.027 baris) into a clean, multi-file Vanilla JS architecture (Zero-CORS, offline IFP double-click compatible).

**Architecture:** Decompose the monolithic single file into clean modular components: `css/game.css`, `js/config.js`, `js/state.js`, `js/audio.js`, `js/data/`, `js/renderers/`, `js/scenes/`, `js/main.js`, while reducing `index.html` to a lean ~70-line bootstrap container. Preserve an exact backup `index_monolithic_backup.html`.

**Tech Stack:** Vanilla JavaScript (ES2020), HTML5 Canvas 2D, Web Audio API, Web Speech API, Vanilla CSS.

**Spec:** [`docs/superpowers/specs/2026-10-03-modular-vanilla-architecture-design.md`](file:///D:/SKRIPSI%20GITA/docs/superpowers/specs/2026-10-03-modular-vanilla-architecture-design.md)

## Global Constraints
- Standar Tipografi IFP: Seluruh deklarasi font wajib $\ge 24$px mutlak (0 pelanggaran pada `python scripts/audit_standalone_fonts.py`).
- Zero-CORS IFP Ready: Tidak menggunakan `<script type="module">` atau `import/export` yang diblokir oleh protokol `file:///` di Chrome/Edge layar sentuh IFP sekolah. Menggunakan pemuatan skrip `<script src="...">` berurutan dengan global scope terpadu.
- Zero Layout Shifting & Anti-Vibe-Coding: Mempertahankan tonal glassmorphism tanpa outline kawat kaku.
- Non-Destructive Backup: `index_monolithic_backup.html` wajib dibuat sebelum modifikasi `index.html`.

---

### Task 1: Backup Monolitik & Pembuatan Struktur Folder

**Files:**
- Create: `TES GITA BARU 1/index_monolithic_backup.html`
- Create directories: `TES GITA BARU 1/css`, `TES GITA BARU 1/js`, `TES GITA BARU 1/js/data`, `TES GITA BARU 1/js/renderers`, `TES GITA BARU 1/js/scenes`

**Interfaces:**
- Consumes: `TES GITA BARU 1/index.html`
- Produces: Exact duplicate `index_monolithic_backup.html` and empty target folders

- [ ] **Step 1: Buat salinan cadangan index_monolithic_backup.html**
Salin isi `TES GITA BARU 1/index.html` ke `TES GITA BARU 1/index_monolithic_backup.html`.

- [ ] **Step 2: Buat seluruh subdirektori modular**
Buat folder `css/`, `js/data/`, `js/renderers/`, dan `js/scenes/` di dalam `TES GITA BARU 1/`.

- [ ] **Step 3: Verifikasi keberadaan direktori dan berkas cadangan**
Pastikan berkas cadangan memiliki ukuran sama (~144 KB).

- [ ] **Step 4: Commit**
```bash
git add "TES GITA BARU 1/index_monolithic_backup.html"
git commit -m "chore(refactor): create monolithic backup and scaffolding directories"
```

---

### Task 2: Ekstraksi Gaya CSS (`css/game.css`)

**Files:**
- Create: `TES GITA BARU 1/css/game.css`

**Interfaces:**
- Consumes: Tag `<style>...</style>` dari `TES GITA BARU 1/index.html`
- Produces: `css/game.css` mandiri memuat seluruh styling IFP (reset, stage radial gradient, buttons, tonal panels, modal, hud, kamus, kuis, bridging dialog).

- [ ] **Step 1: Ekstrak blok CSS ke css/game.css**
Pindahkan seluruh isi di dalam `<style>...</style>` ke berkas `TES GITA BARU 1/css/game.css`.

- [ ] **Step 2: Jalankan audit font pada game.css**
Pastikan tidak ada font berukuran $< 24$px di dalam berkas CSS baru.

- [ ] **Step 3: Commit**
```bash
git add "TES GITA BARU 1/css/game.css"
git commit -m "style(css): extract game styles to css/game.css"
```

---

### Task 3: Ekstraksi Konfigurasi, Utilitas, & State (`js/config.js` & `js/state.js`)

**Files:**
- Create: `TES GITA BARU 1/js/config.js`
- Create: `TES GITA BARU 1/js/state.js`

**Interfaces:**
- Produces `config.js`: `el()`, `els()`, `c01()`, `cl()`, `rnd()`, `lerp()`, `frac()`, `pr()`, `pick()`, `mixc()`, `ic(name, size)`
- Produces `state.js`: `G`, `saveG()`, `loadG()`, `totStars()`, `unlocked()`, `toast()`, `modal()`, `closeModal()`, `go(id)`

- [ ] **Step 1: Tulis js/config.js**
Tuliskan fungsi pembantu DOM `el`, `els`, fungsi matematika interpolasi dan *clamping*, serta generator SVG ikon `ic()`.

- [ ] **Step 2: Tulis js/state.js**
Tuliskan pengelolaan state permainan `G`, penyimpanan LocalStorage, pembacaan bintang total, sistem modal generik, sistem toast, dan navigasi layar `go()`.

- [ ] **Step 3: Uji sintaks via Node.js**
Jalankan `node -c "TES GITA BARU 1/js/config.js"` dan `node -c "TES GITA BARU 1/js/state.js"`.

- [ ] **Step 4: Commit**
```bash
git add "TES GITA BARU 1/js/config.js" "TES GITA BARU 1/js/state.js"
git commit -m "feat(core): extract config, math helpers, and state management"
```

---

### Task 4: Ekstraksi Synthesizer Audio & TTS (`js/audio.js`)

**Files:**
- Create: `TES GITA BARU 1/js/audio.js`

**Interfaces:**
- Produces: `AC`, `ac()`, `sfx` (`click`, `pop`, `chime`, `success`, `wrong`, `breathe`, dsb), `speak(text)`, `bgmStart()`, `toggleSound()`, `syncSound()`

- [ ] **Step 1: Tulis js/audio.js**
Pindahkan logika Web Audio API, osilator suara procedural, speech synthesis bahasa Indonesia ramah anak, dan kontrol tombol suara.

- [ ] **Step 2: Uji sintaks via Node.js**
Jalankan `node -c "TES GITA BARU 1/js/audio.js"`.

- [ ] **Step 3: Commit**
```bash
git add "TES GITA BARU 1/js/audio.js"
git commit -m "feat(audio): extract Web Audio synthesizer and speech helper"
```

---

### Task 5: Ekstraksi Data Ekosistem & Misi (`js/data/ecosystems.js` & `js/data/missions.js`)

**Files:**
- Create: `TES GITA BARU 1/js/data/ecosystems.js`
- Create: `TES GITA BARU 1/js/data/missions.js`

**Interfaces:**
- Produces `ecosystems.js`: `BIOMES`, `BIOME_ORDER`, `KAMUS`
- Produces `missions.js`: `TEAMS`, `MISSIONS`, `BRIDGE_DATA`, `STATMAX`

- [ ] **Step 1: Tulis js/data/ecosystems.js**
Pindahkan metadata 4 bioma (sawah, hutan, sungai, laut) dan entri kamus istilah ilmiah.

- [ ] **Step 2: Tulis js/data/missions.js**
Pindahkan data 5 tim petualang, 8 misi lengkap (rumus trofik `tick`, `health`, target, kartu aksi, kuis C2), dan 8 naskah bridging dialog 2-langkah Gita.

- [ ] **Step 3: Uji sintaks via Node.js**
Jalankan `node -c "TES GITA BARU 1/js/data/ecosystems.js"` dan `node -c "TES GITA BARU 1/js/data/missions.js"`.

- [ ] **Step 4: Commit**
```bash
git add "TES GITA BARU 1/js/data/ecosystems.js" "TES GITA BARU 1/js/data/missions.js"
git commit -m "feat(data): extract ecosystem, team, and mission data"
```

---

### Task 6: Ekstraksi Renderer Karakter & Latar Belakang (`js/renderers/characters.js` & `js/renderers/backgrounds.js`)

**Files:**
- Create: `TES GITA BARU 1/js/renderers/characters.js`
- Create: `TES GITA BARU 1/js/renderers/backgrounds.js`

**Interfaces:**
- Produces `characters.js`: `gitaSVG(size, expr)`, `mPadi`, `mSnake`, `mMushroom`, `mEagle`, `mFrog`, `MASC`
- Produces `backgrounds.js`: `sceneSawah`, `sceneHutan`, `sceneSungai`, `sceneLaut`, `SCENE`, `CONF`, `confettiBurst`, `renderConfetti`

- [ ] **Step 1: Tulis js/renderers/characters.js**
Pindahkan fungsi generator SVG Gita dengan berbagai ekspresi emosional (`worried`, `talk`, `happy`, `cheer`) dan fungsi gambar kurva canvas untuk maskot 5 tim.

- [ ] **Step 2: Tulis js/renderers/backgrounds.js**
Pindahkan loop animasi canvas 60 FPS untuk latar belakang panggung 4 bioma dan sistem partikel konfeti selebrasi.

- [ ] **Step 3: Uji sintaks via Node.js**
Jalankan `node -c "TES GITA BARU 1/js/renderers/characters.js"` dan `node -c "TES GITA BARU 1/js/renderers/backgrounds.js"`.

- [ ] **Step 4: Commit**
```bash
git add "TES GITA BARU 1/js/renderers/characters.js" "TES GITA BARU 1/js/renderers/backgrounds.js"
git commit -m "feat(renderers): extract character vector and background canvas loops"
```

---

### Task 7: Ekstraksi Pengontrol Layar Scene (`js/scenes/*.js`)

**Files:**
- Create: `TES GITA BARU 1/js/scenes/title.js`
- Create: `TES GITA BARU 1/js/scenes/tutorial.js`
- Create: `TES GITA BARU 1/js/scenes/team.js`
- Create: `TES GITA BARU 1/js/scenes/biome.js`
- Create: `TES GITA BARU 1/js/scenes/mission-menu.js`
- Create: `TES GITA BARU 1/js/scenes/simulation.js`
- Create: `TES GITA BARU 1/js/scenes/quiz.js`
- Create: `TES GITA BARU 1/js/scenes/victory.js`

**Interfaces:**
- Produces: Modul pengendali masing-masing layar permainan.
- `simulation.js` memuat `startSim()`, `buildSimUI()`, `simTick()`, `simUpdate()`, `updateHUD()`, `showBridgeDialog()`, `closeBridgeDialog()`.

- [ ] **Step 1: Tulis title.js, tutorial.js, team.js, biome.js, dan mission-menu.js**
Pindahkan logika antarmuka dan interaksi tombol untuk 5 scene awal.

- [ ] **Step 2: Tulis simulation.js, quiz.js, dan victory.js**
Pindahkan mesin simulasi, bridging dialog in-game, kuis C2, dan layar selebrasi kemenangan.

- [ ] **Step 3: Uji sintaks seluruh berkas scenes via Node.js**
Validasi bahwa semua berkas di `js/scenes/` bebas error sintaks.

- [ ] **Step 4: Commit**
```bash
git add "TES GITA BARU 1/js/scenes/"
git commit -m "feat(scenes): extract all 8 scene controllers"
```

---

### Task 8: Perakitan Bootstrap Ramping (`index.html` & `js/main.js`) & Verifikasi Akhir

**Files:**
- Create: `TES GITA BARU 1/js/main.js`
- Modify: `TES GITA BARU 1/index.html`

**Interfaces:**
- `main.js`: Memuat `fit()`, `loop(t)`, `init()`, dan event listeners (`resize`, `visibilitychange`, `pointerdown`).
- `index.html`: Berkas HTML ramping (~70 baris) yang memuat panggung canvas dan seluruh tag `<script src="...">` terurut.

- [ ] **Step 1: Tulis js/main.js**
Satukan siklus inisialisasi, penghubung loop canvas `requestAnimationFrame`, kalkulasi rasio IFP `fit()`, dan routing parameter URL.

- [ ] **Step 2: Rampingkan TES GITA BARU 1/index.html**
Ganti isi `index.html` dengan HTML bootstrap yang bersih, menghubungkan `css/game.css` dan seluruh skrip modular secara terurut.

- [ ] **Step 3: Audit Tipografi Standalone IFP**
Jalankan `python scripts/audit_standalone_fonts.py` untuk memverifikasi kepatuhan $\ge 24$px (0 pelanggaran).

- [ ] **Step 4: Uji Headless Browser Screenshot**
Ambil screenshot layar Judul, Tutorial, Pemilihan Tim, dan Simulasi Bridging Dialog untuk memastikan tampilan visual 100% identik tanpa regresi.

- [ ] **Step 5: Sinkronisasi Dokumen Skripsi & Final Commit**
Perbarui `docs/PRD_GAME_SKRIPSI.md` dan `docs/ROADMAP.md` untuk mencatat arsitektur modular Clean Vanilla JS.
```bash
git add "TES GITA BARU 1/index.html" "TES GITA BARU 1/js/main.js" docs/PRD_GAME_SKRIPSI.md docs/ROADMAP.md
git commit -m "feat(arch): assemble clean modular bootstrap and verify zero regressions"
```
