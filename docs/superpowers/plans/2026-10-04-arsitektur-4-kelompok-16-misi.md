# Rencana Implementasi: Perombakan Alur 4 Kelompok Detektif Ekosistem & 16 Misi (4 Bioma × 4 Misi)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Merombak alur permainan interaktif IFP menjadi 4 Kelompok (1 Kelompok = 1 Ekosistem mandiri) dengan 4 misi tantangan per ekosistem (2 Misi Ulah Alam, 2 Misi Ulah Manusia = total 16 misi), alur navigasi direct-access (bypass layar pilih bioma), tata letak Grid Komparatif 2x2 di IFP, dan sinkronisasi penuh pada dokumen akademik skripsi (PRD, LKPD 4 Kelompok, Naskah Skripsi, Roadmap).

**Architecture:** 
1. **Data Layer (`missions.js`):** Mengganti array 5 tim organisme menjadi 4 Kelompok Detektif Ekosistem (`sawah`, `hutan`, `sungai`, `laut`) dan memperluas bank misi dari 8 menjadi 16 skenario kausalitas lengkap (2 Alam + 2 Manusia per bioma) beserta kuis C2 Bloom taxonomy.
2. **Screen Flow (`team.js`, `mission-menu.js`, `state.js`):** Layar Pemilihan Kelompok menampilkan 4 Kelompok Detektif di panggung hero showcase; tombol pilih kelompok langsung memicu transisi ke Menu 4 Misi bioma terkait.
3. **UI/UX IFP (`mission-menu.js`, `game.css`):** Menu Misi mengadopsi Grid Komparatif 2x2 (Kolom Kiri 2 Misi Alam, Kolom Kanan 2 Misi Manusia) dengan standar Chunky Solid Bevel (Zero Outline/Stroke), Zero Glow, dan tipografi $\ge 24$ px.
4. **Progression System (`state.js`):** 2 Jalur Paralel per kelompok: Misi 1 Alam & Misi 1 Manusia terbuka sejak awal; Misi 2 terbuka setelah Misi 1 masing-masing jalur diselesaikan.
5. **Academic Companion Docs (`docs/`):** Sinkronisasi menyeluruh pada PRD, LKPD 4 Kelompok Jigsaw, Naskah Skripsi, dan kompilasi ulang web docs offline bundle (`docs-data.js`).

**Tech Stack:** Vanilla JavaScript ES6+, HTML5 Canvas & Custom CSS Design System, Playwright Automated Browser Verification, Python Documentation Compiler (`build_docs_web.py`).

**Spec Reference:** Hasil wawancara interaktif `/grill-me` (Pertanyaan 1 s.d. 6 tanggal 4 Oktober 2026).

## Global Constraints
- **Zero Outline / Stroke:** Seluruh kartu menggunakan Chunky Solid Bevel (`border: none`, bayangan dalam lembut, `inset 0 1px 0 rgba(255,255,255,.08)`).
- **Zero Glow / Ring:** Tidak ada `box-shadow: 0 0 0 ...`, denyut pendar, atau lingkaran cyan fokus.
- **Hardware-Aware Typography:** Seluruh font antarmuka $\ge 24$ px.
- **Touch Target Ergonomics:** Tombol aksi $\ge 80 \times 80$ px atau baris taktil lebar $\ge 48$ px.
- **Academic Integrity:** Selaras dengan Teori Mayer CTML, Piaget Konkret, Vygotsky ZPD, dan Model Alessi & Trollip.

---

### Task 1: Rekonstruksi Data 4 Kelompok & 16 Misi Kausalitas

**Files:**
- Modify: `TES GITA BARU 1/js/data/missions.js`
- Test: `TES GITA BARU 1/tests/validate_16_missions.js`

**Interfaces:**
- Produces: `TEAMS` (array 4 kelompok: `sawah`, `hutan`, `sungai`, `laut`), `MISSIONS` (array 16 misi: 4 sawah, 4 hutan, 4 sungai, 4 laut).

- [x] **Step 1: Buat unit test Node.js untuk memvalidasi struktur 4 kelompok dan 16 misi**
  - Pastikan tepat ada 4 kelompok dengan ID: `'sawah'`, `'hutan'`, `'sungai'`, `'laut'`.
  - Pastikan tepat ada 16 misi dengan masing-masing bioma memiliki 2 misi bertipe `'alam'` dan 2 misi bertipe `'manusia'`.
  - Validasi bahwa tiap misi memiliki properti `init`, `tick`, `health`, `actions` (3 aksi per misi), `stats`, `targets` (3 target), `tips`, `quiz` (`q`, `opts`, `correct`, `explain`), dan `chain` (4 langkah rantai kausalitas).

- [x] **Step 2: Jalankan test untuk memastikan test gagal (failing test)**
  - Jalankan `node "TES GITA BARU 1/tests/validate_16_missions.js"` dan amati error karena data masih berisi 5 tim dan 8 misi lama.

- [x] **Step 3: Implementasikan data 4 Kelompok Detektif & 16 Misi di `js/data/missions.js`**
  - **4 Kelompok Detektif:**
    1. `sawah`: Detektif Sawah (Maskot: Ular Sawah & Padi Subur, Ahli Pangan & Rantai Makanan Sawah)
    2. `hutan`: Detektif Hutan (Maskot: Harimau Rimba & Pohon Raksasa, Ahli Satwa & Paru-Paru Rimba)
    3. `sungai`: Detektif Sungai (Maskot: Bangau Tongtong & Ikan Air Tawar, Ahli Oksigen & Aliran Air Bersih)
    4. `laut`: Detektif Laut (Maskot: Penyu Hijau & Terumbu Karang, Ahli Samudra & Benteng Pantai)
  - **16 Skenario Misi:**
    - `sawah-1` (Alam): Kemarau Panjang & Saluran Irigasi Kering
    - `sawah-2` (Alam): Ledakan Hama Wereng & Cuaca Lembap Ekstrem
    - `sawah-3` (Manusia): Bahaya Racun Kimia & Pestisida Berlebihan
    - `sawah-4` (Manusia): Perburuan Ular Sawah & Jerat Petani
    - `hutan-1` (Alam): Kemarau Rimba & Mata Air Mengering
    - `hutan-2` (Alam): Kebakaran Gesekan Ranting & Asap Hutan
    - `hutan-3` (Manusia): Penebangan Liar (Pembalakan Pohon Rimba)
    - `hutan-4` (Manusia): Jerat Maut Pemburu Liar & Ancaman Harimau
    - `sungai-1` (Alam): Air Surut & Ledakan Gulma Eceng Gondok
    - `sungai-2` (Alam): Sedimentasi Lumpur Hulu & Erosi Tebing
    - `sungai-3` (Manusia): Pembuangan Limbah Kimia Detergen Pabrik
    - `sungai-4` (Manusia): Penangkapan Ikan dengan Setrum Listrik & Racun Tuba
    - `laut-1` (Alam): Air Laut Memanas & Pemutihan Karang Alami
    - `laut-2` (Alam): Gelombang Badai Tropis & Karang Roboh
    - `laut-3` (Manusia): Bom Ikan Peledak Penghancur Terumbu
    - `laut-4` (Manusia): Sampah Plastik Laut & Jaring Pukat Harimau

- [x] **Step 4: Jalankan kembali unit test untuk memastikan 100% lulus (PASS)**

---

### Task 2: Pembaruan Layar Pemilihan Kelompok & Alur Transisi Direct-Access

**Files:**
- Modify: `TES GITA BARU 1/js/scenes/team.js`
- Modify: `TES GITA BARU 1/js/state.js`
- Modify: `TES GITA BARU 1/js/scenes/title.js`

**Interfaces:**
- Consumes: `TEAMS` (4 kelompok), `totStars()` (maksimal 48 bintang).
- Produces: Pemilihan tim menyimpan `G.team = id`, langsung menavigasi `NAV.biome = G.team`, lalu memanggil `go('mission'); buildMissionMenu();`.

- [x] **Step 1: Perbarui fungsi `totStars()` di `js/state.js`**
  - Pastikan total bintang kini menghitung dari 16 misi (maksimal 48 bintang).
  - Pastikan logika `loadG()` dan `saveG()` menangani 4 ID kelompok baru (`sawah`, `hutan`, `sungai`, `laut`).

- [x] **Step 2: Perbarui `TEAM_THEMES` dan render stage pahlawan di `js/scenes/team.js`**
  - Sediakan tema visual panggung untuk 4 kelompok:
    - `sawah`: Zamrud & Emas (`#10b981`, `#064e3b`, `#fef08a`)
    - `hutan`: Oranye Hutan & Cokelat Rimba (`#d97706`, `#78350f`, `#fef3c7`)
    - `sungai`: Cyan Sungai & Teal Dalam (`#0e7490`, `#134e4a`, `#ccfbf1`)
    - `laut`: Biru Laut Samudra (`#0284c7`, `#0c4a6e`, `#e0f2fe`)
  - Update dok miniatur 4 ubin kelompok di bawah panggung.

- [x] **Step 3: Hubungkan tombol `👉 PILIH DETEKTIF INI!` untuk langsung membuka menu 4 misi**
  - Mengubah handler tombol konfirmasi: set `G.team = t.id; NAV.biome = t.id; saveG(); go('mission'); buildMissionMenu();`.
  - Meniadakan perantara layar bioma (`#scr-biome`) saat memilih kelompok.

---

### Task 3: Tata Letak Menu 4 Misi (Grid Komparatif 2x2) & Sistem Progression Lock Paralel

**Files:**
- Modify: `TES GITA BARU 1/js/scenes/mission-menu.js`
- Modify: `TES GITA BARU 1/css/game.css`

**Interfaces:**
- Consumes: `G.team`, `NAV.biome`, `G.stars`, 4 misi per bioma (2 Alam, 2 Manusia).
- Produces: Grid 2 Kolom Komparatif di `#scr-mission` (Kolom Kiri 2 Misi Alam, Kolom Kanan 2 Misi Manusia).

- [x] **Step 1: Terapkan logika Progression Lock 2 Jalur Paralel di `mission-menu.js`**
  - Untuk 4 misi dalam bioma aktif:
    - Misi Alam 1: Terbuka langsung (`unlocked = true`).
    - Misi Alam 2: Terbuka jika Misi Alam 1 memiliki $\ge 1$ bintang.
    - Misi Manusia 1: Terbuka langsung (`unlocked = true`).
    - Misi Manusia 2: Terbuka jika Misi Manusia 1 memiliki $\ge 1$ bintang.

- [x] **Step 2: Bangun DOM Grid 2x2 Komparatif di `buildMissionMenu()`**
  - Header Komando: Tombol `👥 Ganti Kelompok` (kembali ke `#scr-team`), Badge Nama Detektif Kelompok Aktif, Plakat Total Bintang Kelompok (`⭐ x/12 BINTANG`), dan utilitas suara/fullscreen.
  - Sisi Kiri (Kolom Ulah Alam):
    - Plakat Kategori: `🍃 TANTANGAN ULAH ALAM (2 KASUS)`
    - Kartu Misi Alam 1 (Status: Terbuka/Selesai)
    - Kartu Misi Alam 2 (Status: Terkunci/Terbuka)
  - Sisi Kanan (Kolom Ulah Manusia):
    - Plakat Kategori: `⚠️ TANTANGAN ULAH MANUSIA (2 KASUS)`
    - Kartu Misi Manusia 1 (Status: Terbuka/Selesai)
    - Kartu Misi Manusia 2 (Status: Terkunci/Terbuka)

- [x] **Step 3: Sesuaikan CSS Grid 2x2 pada `game.css`**
  - Terapkan layout responsive 2-column flex/grid yang pas pada rasio 16:9 IFP (1920x1080) tanpa scrollbar tersembunyi.
  - Terapkan standar Zero Outline/Stroke (Chunky Solid Bevel dengan kilau atas halus).

---

### Task 4: Adaptasi Controller Simulasi & Penyelarasan Cara Bermain

**Files:**
- Modify: `TES GITA BARU 1/js/scenes/simulation.js`
- Modify: `TES GITA BARU 1/js/scenes/how.js`

- [x] **Step 1: Verifikasi kesiapan `simulation.js` untuk 16 misi**
  - Pastikan tombol aksi dan parameter status simulasi (`poison`, `trap`, `heat`, `bomb`, `gulma`, `lumpur`, `wereng`, `api`, `setrum`, `pukat`) terdefinisi dengan aman tanpa memicu *undefined variable exception*.
  - Pastikan tombol kembali di header simulasi mengarahkan kembali ke `go('mission'); buildMissionMenu();`.

- [x] **Step 2: Selaraskan layar Cara Bermain (`how.js`)**
  - Update Langkah 1: Jelaskan sistem 4 Kelompok Detektif (Detektif Sawah, Hutan, Sungai, Laut).
  - Update Langkah 3: Jelaskan pembagian 4 Misi (2 Ulah Alam vs 2 Ulah Manusia).
  - Tombol navigasi akhir tetap mengarahkan siswa ke Layar Pemilihan Kelompok (`go('team'); buildTeam();`).

---

### Task 5: Sinkronisasi Dokumen Akademik Skripsi & Web Docs

**Files:**
- Modify: `docs/PRD_GAME_SKRIPSI.md`
- Modify: `docs/LKPD_DETEKTIF_SAWAH.md` (diperbarui/diperluas menjadi instrumen 4 kelompok)
- Modify: `docs/SKRIPSI.md`
- Modify: `docs/ROADMAP.md`
- Run: `python tools/exporters/build_docs_web.py`

- [x] **Step 1: Sinkronkan `docs/PRD_GAME_SKRIPSI.md`**
  - Perbarui Ringkasan Produk: 4 Kelompok Detektif Ekosistem, 16 Misi Total.
  - Perbarui Sub-bab 4.1: Orkestrasi Kelas 25 Siswa terbagi dalam 4 Kelompok Ahli (Jigsaw Model).
  - Perbarui Bab 5: Dokumentasi lengkap matriks 16 Skenario Misi.

- [x] **Step 2: Sinkronkan `docs/LKPD_DETEKTIF_SAWAH.md`**
  - Perluas LKPD menjadi Lembar Kerja 4 Kelompok Detektif (Sawah, Hutan, Sungai, Laut), memuat panduan pengamatan untuk 4 misi per kelompok.

- [x] **Step 3: Sinkronkan `docs/SKRIPSI.md` & `docs/ROADMAP.md`**
  - Catat penyesuaian sintaks pembelajaran Jigsaw 4 Kelompok pada naskah skripsi dan milestone roadmap.

- [x] **Step 4: Rebuild Web Docs Bundle**
  - Jalankan `python tools/exporters/build_docs_web.py` dan pastikan `docs/docs-data.js` ter-update tanpa error.

---

### Task 6: Verifikasi Visual & Otomasi Pengujian Antarmuka

**Files:**
- Create: `scripts/verify_16_missions_ui.py`
- Output Artifacts: Screenshots verifikasi 4 Kelompok & 4 Menu Misi.

- [ ] **Step 1: Buat skrip verifikasi otomatis Playwright**
  - Menavigasi ke Layar Pemilihan Tim dan memverifikasi 4 Kelompok Detektif.
  - Memilih masing-masing kelompok dan memverifikasi Menu Misi Grid 2x2 (Sawah, Hutan, Sungai, Laut).
  - Membuka satu simulasi misi untuk memverifikasi game loop berjalan lancar.

- [ ] **Step 2: Jalankan skrip dan periksa screenshot artefak**
  - Konfirmasi keterbacaan teks, kepatuhan Zero-Outline, dan kebersihan layout.

- [ ] **Step 3: Update `walkthrough.md` dengan galeri hasil implementasi**
