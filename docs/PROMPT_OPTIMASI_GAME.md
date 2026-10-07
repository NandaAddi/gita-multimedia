# ⚡ PANDUAN & MASTER PROMPT OPTIMASI SISTEM (ECO-EXPLORER)

Dokumen ini berisi template **Master Prompt Optimasi Game & Arsitektur Sistem** yang dirancang khusus untuk diinstruksikan kepada AI Coding Agent (Antigravity/Gemini/Claude). Prompt ini memandu AI untuk menganalisis kemacetan performa (*performance bottlenecks*), alokasi memori (*Garbage Collection pauses*), ergonomi layar sentuh IFP, dan efisiensi waktu muat pada game simulasi pembelajaran *Eco-Explorer* (folder `TES GITA BARU 1`).

---

## 📋 CARA MENGGUNAKAN PROMPT INI

1. Salin teks di dalam blok **MASTER PROMPT (SIAP SALIN)** di bawah ini.
2. Tempelkan ke jendela obrolan AI Coding Assistant (Antigravity / Gemini 2.5 Pro / Claude 3.7 Sonnet).
3. Anda dapat menjalankan optimasi menyeluruh (All-in-One) atau memilih salah satu **Variasi Prompt Spesifik** di bagian bawah jika hanya ingin fokus pada modul tertentu (misalnya rendering Canvas 60 FPS atau audio pooling).

---

## 🤖 MASTER PROMPT OPTIMASI MENYELURUH (SIAP SALIN)

```markdown
Tolong lakukan evaluasi dan optimasi performa menyeluruh (deep performance optimization, memory lifecycle audit, and IFP responsiveness tuning) pada proyek game simulasi "Eco-Explorer" (folder `TES GITA BARU 1`).

Fokuskan optimasi pada 6 PILAR UTAMA berikut agar game berjalan ultra-smooth (60 FPS stabil), bebas memori leak, dan sangat responsif saat dioperasikan di Layar Sentuh Interactive Flat Panel (IFP 65"/75"/86") di kelas 5A SDN Percobaan 2 Malang:

---

### 1. PILAR 1: OPTIMASI RENDERING CANVAS & FRAME RATE 60 FPS (`js/renderers/*.js`, `js/scenes/*.js`)
- **Zero Object Allocation di Loop `requestAnimationFrame`**: Audit fungsi render per-frame (misal: `drawTerraceBackground`, `drawRiverMeander`, siklus rantai makanan, ayunan padi semilir, partikel semprotan aerosol). Pastikan tidak ada instansiasi objek berulang (`new ...`, pembuatan array baru `[]`, pembentukan string baru) di dalam loop animasi 60 FPS untuk meniadakan jeda Garbage Collection (*GC pauses / micro-stutters*).
- **Gradien & Canvas State Memoization**: Pastikan semua pewarnaan gradien menggunakan utilitas cache ter-memoize (seperti helper `LG()`, `RG()` dan `GRADCACHE` dengan batas FIFO eviction 300) alih-alih memanggil `c.createLinearGradient()` atau `c.createRadialGradient()` mentah setiap frame.
- **Batching & Path Minimization**: Optimalkan urutan pemanggilan `c.beginPath()`, `c.fill()`, dan `c.stroke()`. Satukan penggambaran elemen statis (tanah pematang sawah, bebatuan granit sungai, gunung berkabut) agar tidak melakukan pemborosan draw calls yang membebani GPU/CPU chipset bawaan IFP.

---

### 2. PILAR 2: SIKLUS HIDUP MEMORI, DOM CLEANUP & IDEMPOTENSI LISTENER (`js/scenes/*.js`, `js/main.js`)
- **Pembersihan Transisi Antar Layar (`go(scene)`)**: Periksa transisi scene pada 10 layar utama (`title`, `how`, `teacher`, `team`, `biome`, `mission-menu`, `simulation`, `quiz`, `victory`, `tutorial`). Pastikan setiap kali berpindah scene atau memanggil `build*()`, elemen DOM lama, interval timer (`setInterval`/`setTimeout`), dan loop animasi dibersihkan secara tuntas.
- **Idempotent Event Delegation**: Pastikan seluruh tombol interaktif dan kartu aksi tidak menumpuk event listener ganda (`addEventListener`) saat fungsi render dipanggil berulang kali. Prioritaskan penugasan langsung (`.onclick = ...`) atau delegasi event pada kontainer induk untuk mencegah akumulasi memori di heap browser selama berjam-jam dipakai mengajar di kelas.
- **State Isolation**: Pastikan mutasi status tersentralisasi pada `G`, `SIM`, dan `ProgressManager` tanpa menciptakan variabel global liar (*undeclared variables*) yang mengotori window scope.

---

### 3. PILAR 3: PIPELINE AUDIO, VOICE-OVER POOLING & SINTESIS SFX (`js/audio.js`)
- **Audio Object Pooling**: Verifikasi bahwa pemutaran vokal Kakak Gita (72 file vokal di `voice-over/`) menggunakan mekanisme daur ulang instans `HTMLAudioElement` (`VO_POOL` Map kapasitas 40) secara konsisten di seluruh scene, sehingga latensi pemutaran mendekati 0ms dan tidak terjadi penumpukan buffer audio di RAM IFP.
- **Zero-Clamping ADSR Envelope**: Periksa sintesis Web Audio API (`tone()`, `sfx.*`). Pastikan parameter osilator memiliki nilai inisialisasi gain 0 murni dan clamping sebelum cut-off untuk meniadakan suara letupan (*audio popping / clicking / audio glitch*).
- **Audio-Visual Latency**: Pastikan efek suara feedback (suara klik tombol, bunyi predasi kaskade trofik, bunyi semprotan pestisida) terpicu seketika (< 30ms) saat interaksi sentuh terjadi.

---

### 4. PILAR 4: ERGONOMI LAYAR SENTUH IFP & KETAHANAN GESTUR (`css/`, `js/scenes/*.js`, `index.html`)
- **Debounce Anti-Double-Tap & Palm Rejection**: Pastikan seluruh tombol antarmuka dan kartu aksi memiliki perlindungan debounce interaksi taktil ($\ge 280\text{ ms}$) dan penanganan kontak telapak tangan (*Single Active Pointer Lock*) agar tidak terpicu ganda saat siswa menempelkan telapak tangan di layar sentuh besar.
- **Ukuran Target Sentuh & Touch-Action**: Verifikasi bahwa area interaktif memenuhi standar ramah jari siswa SD kelas 5 ($\ge 80 \times 80\text{ px}$) dengan properti CSS `touch-action: manipulation` atau `touch-action: none` pada elemen sentuh untuk mencegah zoom dan scroll browser yang tidak disengaja.
- **Standar Tipografi IFP**: Pertahankan keterbacaan teks dari bangku belakang kelas dengan ukuran font absolut $\ge 24\text{ px}$ di seluruh antarmuka permainan.

---

### 5. PILAR 5: EFISIENSI WAKTU MUAT (LOAD TIME), PWA & KOMPRESI ASET (`sw.js`, `manifest.json`, `index.html`)
- **Preloader & Paralelisasi Aset**: Periksa kesiapan preloader splash screen (`#preloader-overlay`). Pastikan pemuatan aset font, sequence WebP karakter Gita (120 frame dialog box), dan file data berjalan secara paralel tanpa menghalangi (*render-blocking*) layar judul.
- **Service Worker Offline Cache**: Verifikasi strategi caching di `sw.js` agar game dapat beroperasi 100% tanpa internet (offline-ready) di kelas 5A dengan integritas cache-buster (`?v=...`) yang tepat.
- **Asset Weight Budget**: Pastikan ukuran total file game tetap ringan, aset gambar berformat WebP dengan kompresi optimal, dan tidak ada file media raksasa yang tidak terpakai yang membebani waktu inisialisasi.

---

### 6. PILAR 6: BEBAN KOGNITIF & INTEGRITAS PEDAGOGIS (MAYER CTML & CSCL) (`js/data/`, `js/scenes/simulation.js`, `js/scenes/quiz.js`)
- **Prinsip Kontiguitas Temporal & Spasial (Mayer)**: Pastikan indikator status ekosistem (Health meter, populasi, feedback aksi) berada dalam satu kuadran pandang yang tidak memaksa mata siswa melompat-lompat (*split-attention effect*).
- **Tempo Animasi Kausalitas C2**: Pastikan transisi kaskade trofik (pertumbuhan organisme, pelayuan wereng/hama, semprotan pestisida) berdurasi ideal (1.2–2.0 detik) agar cukup jelas diamati oleh siswa untuk memahami sebab-akibat tanpa membuat simulasi terasa lambat (*sluggish*).
- **CSCL Musyawarah Pacing**: Verifikasi bahwa timer 15 detik diskusi kelompok berjalan mulus dengan animasi visual yang menenangkan dan petunjuk vokal Gita yang tidak memotong konsentrasi siswa.

---

### ⚙️ PROTOKOL KERJA AGENT:
1. **Analisis Statis & Profiling**: Identifikasi baris kode spesifik yang menjadi penyebab bottleneck atau pemborosan alokasi memori sebelum mengedit.
2. **Jalankan Baseline Test Suite**: Jalankan test suite yang ada (`node tests/run.js`) untuk memastikan semua fungsionalitas awal berstatus 100% PASS.
3. **Eksekusi Optimasi Terarah**: Lakukan refaktor atau perbaikan kode dengan tetap menjaga kestabilan logika dan estetika visual game.
4. **Validasi Ulang**: Jalankan kembali pengujian otomatis (`node tests/run.js` dan test spesifik lainnya). Pastikan 0 regresi!
5. **Sinkronisasi Dokumen Skripsi**: Perbarui dokumen pendamping di folder `docs/` (`PRD_GAME_SKRIPSI.md`, `ROADMAP.md`) sesuai aturan wajib `GEMINI.md`.
```

---

## 🎯 VARIASI PROMPT SPESIFIK (MODULAR TRIGGERS)

Gunakan variasi prompt di bawah jika Anda ingin menginstruksikan AI untuk melakukan optimasi pada bagian tertentu saja:

### 🔹 Variasi A: Khusus Optimasi Rendering Canvas & 60 FPS IFP
> *"Tolong audit dan optimasi rendering Canvas 2D di `js/renderers/backgrounds.js`, `js/renderers/characters.js`, dan `js/scenes/simulation.js`. Hilangkan seluruh alokasi objek baru per frame di `requestAnimationFrame`, pastikan gradien menggunakan memoization FIFO cache, dan satukan path rendering agar FPS stabil di 60 FPS pada layar sentuh IFP sekolah tanpa ada micro-stutter."*

### 🔹 Variasi B: Khusus Siklus Hidup Memori & Anti-Memory Leaks
> *"Tolong periksa siklus hidup transisi layar di `js/scenes/*.js` saat fungsi `go(scene)` dipanggil berulang kali. Pastikan semua event listener DOM bersifat idempoten atau menggunakan delegasi event, interval timer dibersihkan tuntas, dan tidak ada memori heap yang bocor setelah 30 menit penggunaan berturut-turut di kelas. Buatkan test otomatis di `tests/` untuk membuktikannya."*

### 🔹 Variasi C: Khusus Audio Latency & Voice-Over Pooling
> *"Tolong periksa pipeline audio di `js/audio.js`. Pastikan mekanisme `VO_POOL` mendaur ulang instans audio secara efisien untuk 72 berkas suara Kakak Gita, synthesizer SFX Web Audio bebas dari letupan pop/glitch dengan inisialisasi gain 0, dan latensi dari sentuhan tombol hingga audio terdengar berada di bawah 30 milidetik."*

### 🔹 Variasi D: Khusus Ergonomi Layar Sentuh IFP & Responsivitas Taktil
> *"Tolong optimasi ergonomi layar sentuh IFP di `css/` dan `js/scenes/`. Pastikan seluruh tombol interaktif memiliki target sentuh minimal $\ge 80 \times 80\text{ px}$, dilengkapi debounce sentuhan $\ge 280\text{ ms}$, menolak input telapak tangan (*palm rejection*), serta memiliki properti `touch-action: manipulation` agar nyaman dan akurat disentuh oleh siswa SD kelas 5."*

### 🔹 Variasi E: Khusus PWA Offline, Caching Service Worker & Fast Boot
> *"Tolong optimasi kecepatan pemuatan awal game (`index.html`, `sw.js`, `manifest.json`). Pastikan layar splash preloader lambang UM memuat aset secara paralel, service worker meng-cache seluruh dependensi game untuk penggunaan 100% offline di kelas, dan waktu transisi dari splash ke layar judul berlangsung dalam waktu kurang dari 2 detik."*

---

## 📊 TARGET KPI & METRIK KEBERHASILAN OPTIMASI

Setiap optimasi yang dijalankan harus mengacu pada standar kuantitatif berikut:

| Parameter Metrik | Nilai Sebelum Optimasi | Target Pasca-Optimasi (KPI) | Metode Verifikasi |
| :--- | :--- | :--- | :--- |
| **Frame Rate Rendering** | 45–55 FPS (fluktuatif saat partikel banyak) | **Stabil 60 FPS ($\ge 58$ FPS)** | DevTools FPS Meter & `test_canvas_opt.js` |
| **Alokasi Memori Render Loop** | Ada alokasi objek baru per frame | **0 alokasi objek baru / frame** | Chrome DevTools Memory Allocation Timeline |
| **Latensi Respon Sentuh** | 80–120 ms | **$\le 40$ ms** | Pengujian interaksi pointer IFP |
| **Touch Target Interaktif** | Beberapa tombol $\le 60$ px | **Minimal $\ge 80 \times 80$ px** | `tests/audit_ifp_ui.js` |
| **Keterbacaan Tipografi IFP** | Font bervariasi | **Minimal $\ge 24$ px absolut** | `scripts/audit_fonts.py` |
| **Latensi Putar Voice-Over** | 150–300 ms (fresh `new Audio`) | **$\le 15$ ms (Audio Object Pool)** | `tests/test_audio_pool.js` |
| **Dukungan Offline PWA** | Parsial | **100% Offline-Ready** | Chrome DevTools Network Offline Mode |
| **Status Test Automation** | Sebagian test | **100% PASS (Semua test di `tests/run.js`)** | `node tests/run.js` |
