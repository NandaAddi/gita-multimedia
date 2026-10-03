# Arsitektur Desain: Modularisasi Clean Vanilla JS (Zero-CORS IFP Edition)

**Tanggal:** 2026-10-03  
**Status:** Validated Design  
**Branch:** `feat/optimize-standalone-html-ifp`  
**Target Direktori:** `d:\SKRIPSI GITA\TES GITA BARU 1\`

---

## 1. Latar Belakang & Tujuan

File `TES GITA BARU 1/index.html` telah mencapai **2.027 baris (144 KB)** yang memuat seluruh styling CSS, generator SVG, kalkulasi kurva Canvas 2D per frame 60 FPS, synthesizer Web Audio API, data 8 misi, sistem kuis C2, manajemen state LocalStorage, dan manipulasi DOM di dalam satu dokumen tunggal.

Hal ini menimbulkan kendala:
1. **Beban CPU & Rendering:** Seluruh fungsi kalkulasi kurva dan animasi berjalan tanpa pemisahan modul yang jelas.
2. **Keterbacaan & Pemeliharaan Kode:** Sulit melakukan penyesuaian materi (misal soal kuis atau naskah dialog Gita) tanpa menavigasi ribuan baris kode campuran.
3. **Kesiapan Sidang Skripsi:** Dosen penguji di Fakultas Ilmu Pendidikan menghargai kerapian arsitektur perangkat lunak (*Separation of Concerns* & *High Cohesion*).

### Tujuan Pengembangan
Merombak (*refactor*) file tunggal `TES GITA BARU 1/index.html` menjadi arsitektur modular **Clean Vanilla JS** yang terorganisir per folder, tetap **100% mandiri (*Zero-CORS / Zero-Server*)** sehingga dapat dibuka langsung dengan klik dua kali (`file://`) di peramban IFP sekolah tanpa hambatan keamanan CORS.

---

## 2. Struktur Arsitektur & Direktori Target

Semua berkas disusun di dalam `TES GITA BARU 1/`:

```
TES GITA BARU 1/
├── index.html                     # HTML Bootstrap (~70 baris): Canvas 1920x1080 & pemanggilan skrip
├── index_monolithic_backup.html   # Cadangan utuh berkas tunggal lama (2.027 baris)
├── css/
│   └── game.css                   # Seluruh styling IFP >= 24px, glassmorphism, & tombol 3D
└── js/
    ├── config.js                  # Resolusi 1920x1080, utilitas matematika, & kamus ikon SVG
    ├── state.js                   # State G (bintang, tim, suara), modal(), toast(), & helper DOM
    ├── audio.js                   # Synthesizer Web Audio API, SFX chime/click, & TTS speak()
    ├── data/
    │   ├── ecosystems.js          # Definisi 4 bioma, rantai makanan, & kamus alam
    │   └── missions.js            # Data 8 misi, rumus kaskade trofik, & naskah bridging Gita
    ├── renderers/
    │   ├── characters.js          # Generator SVG Gita (berbagai ekspresi) & 5 maskot tim canvas
    │   └── backgrounds.js         # Loop canvas panggung 4 bioma (60 FPS) & partikel konfeti
    ├── scenes/
    │   ├── title.js               # Pengontrol Layar Judul & tombol menu utama
    │   ├── tutorial.js            # Pengontrol Layar Panduan 4 langkah
    │   ├── team.js                # Pengontrol Panggung Pemilihan Tim Petualang
    │   ├── biome.js               # Pengontrol Layar Pilihan Ekosistem & preview canvas
    │   ├── mission-menu.js        # Pengontrol Menu 2 Misi per bioma
    │   ├── simulation.js          # Arena Simulasi, HUD, loop harian, & Bridging Dialog Box
    │   ├── quiz.js                # Pengontrol Buku Catatan Detektif Kuis C2
    │   └── victory.js             # Pengontrol Layar Selebrasi Prestasi 3 Bintang
    └── main.js                    # Inisialisasi engine, routing layar (go), & fit scale
```

---

## 3. Strategi Zero-CORS untuk IFP Sekolah (file:// Protocol)

### Masalah Teknis
Peramban Chromium (Google Chrome & Microsoft Edge) pada layar sentuh IFP secara default menerapkan kebijakan keamanan ketat yang **memblokir ES Modules (`<script type="module">` dan sintaks `import/export`)** jika dibuka langsung melalui protokol `file:///` dari penyimpanan lokal atau flashdisk USB.

### Solusi Desain
1. Menggunakan skrip standar `<script src="...">` yang dimuat secara berurutan sesuai rantai dependensi.
2. Setiap modul mendaftarkan fungsinya ke dalam *namespace global terpadu* yang bersih:
   * `window.EcoConfig`: Konfigurasi & utilitas matematika
   * `window.EcoState`: Manajemen progres & modal
   * `window.EcoAudio`: Pengendali suara & TTS
   * `window.EcoData`: Data bioma, misi, & naskah bridging
   * `window.EcoRenderers`: Fungsi visual karakter & background canvas
   * `window.EcoScenes`: Kumpulan pengendali layar permainan
3. Seluruh variabel kompatibel tetap diekspos secara aman ke *global scope* agar logika game internal yang saling memanggil dapat berjalan tanpa perubahan sintaks yang destruktif.

---

## 4. Rincian Pemisahan Modul

### 4.1 `css/game.css`
* Memuat seluruh deklarasi gaya yang telah diaudit:
  - Reset & font Nunito + Fredoka.
  - Stage background bergradien radial sinematik.
  - Sistem tombol IFP `.btn`, `.btn-gold`, `.btn-secondary`, `.btn-ruby` ($\ge 58$px, font $\ge 26$px, 3D bevel).
  - Tonal glassmorphism panel (`.panel`, `.panel-deep`, modal).
  - Bridging dialogue box (`.bridge-wrap`, `.bridge-panel`, dsb.).
* Menjaga kepatuhan aturan: **0 font di bawah 24px**.

### 4.2 `js/config.js` & `js/state.js`
* `config.js`: `el()`, `els()`, `c01()`, `cl()`, `rnd()`, `lerp()`, `frac()`, `pr()`, `pick()`, `mixc()`, serta fungsi kamus SVG ikon `ic()`.
* `state.js`: `G`, `saveG()`, `loadG()`, `totStars()`, `unlocked()`, `toast()`, `modal()`, `closeModal()`, dan `go(id)`.

### 4.3 `js/audio.js`
* Web Audio API context (`AC`), synthesizer osilator `sfx` (`click`, `pop`, `chime`, `success`, `wrong`), `speak(text)`, `bgmStart()`, `toggleSound()`, dan `syncSound()`.

### 4.4 `js/data/ecosystems.js` & `js/data/missions.js`
* `ecosystems.js`: `BIOMES`, `BIOME_ORDER`, `KAMUS`.
* `missions.js`: `TEAMS`, `MISSIONS` (8 misi lengkap dengan fungsi matematis `tick(S)`, `health(S)`, target, kuis, tips), `BRIDGE_DATA` (naskah pengantar 8 misi), dan `STATMAX`.

### 4.5 `js/renderers/characters.js` & `js/renderers/backgrounds.js`
* `characters.js`: `gitaSVG(size, expr)` dan fungsi gambar canvas maskot 5 tim (`mPadi`, `mSnake`, `mMushroom`, `mEagle`, `mFrog`, `MASC`).
* `backgrounds.js`: Animasi latar belakang canvas `sceneSawah`, `sceneHutan`, `sceneSungai`, `sceneLaut`, `SCENE`, dan konfeti kemenangan `renderConfetti`.

### 4.6 `js/scenes/*.js`
* `title.js`: Inisialisasi layar judul dan bubble sambutan Gita.
* `tutorial.js`: `buildTutorial()` dan `renderTut()`.
* `team.js`: `buildTeam()` dan `renderTeam()`.
* `biome.js`: `buildBiome()` dan `drawPreview()`.
* `mission-menu.js`: `buildMissionMenu()` dan `openMission()`.
* `simulation.js`: `startSim()`, `buildSimUI()`, `simTick()`, `simUpdate()`, `updateHUD()`, `simExpr()`, `showBridgeDialog()`, `closeBridgeDialog()`, `simFail()`, `finishSim()`, dan `leaveSim()`.
* `quiz.js`: `startQuiz()` dan `renderQuiz()`.
* `victory.js`: `startVictory()` dan `renderVictory()`.

### 4.7 `js/main.js` & `index.html`
* `main.js`: Loop utama `requestAnimationFrame(loop)`, `fit()` untuk kalkulasi rasio IFP 1920x1080, serta `init()`.
* `index.html`: Struktur HTML panggung ramping dengan tag `<section class="screen">`, elemen `<canvas>`, dan `<script src="...">` terurut.

---

## 5. Rencana Pengujian & Validasi

1. **Integritas Fungsional:**
   * Memastikan seluruh 8 alur scene berjalan tanpa error di konsol browser.
   * Uji coba alur: Judul ➔ Tutorial ➔ Pilih Tim ➔ Pilih Bioma ➔ Pilih Misi ➔ Bridging Dialog ➔ Simulasi ➔ Kuis ➔ Kemenangan.
2. **Audit Tipografi IFP:**
   * Menjalankan `python scripts/audit_standalone_fonts.py` pada seluruh file CSS dan JS modular untuk memastikan batas **$\ge 24$px** terpenuhi 100%.
3. **Verifikasi Visual:**
   * Mengambil tangkapan layar (screenshot) untuk membuktikan tampilan modular identik dan tidak mengalami regresi visual.
4. **Verifikasi Offline Zero-CORS:**
   * Menguji file `index.html` langsung melalui protokol `file:///` tanpa server lokal untuk menjamin kesiapan instalasi di IFP sekolah.
