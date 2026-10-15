# 🌾 Eco-Explorer: Penjaga Keseimbangan Sawah
### Game Simulasi Interaktif Sains IPAS Berbasis Layar Sentuh IFP (Interactive Flat Panel)
> **Riset & Pengembangan (R&D) Skripsi Teknologi Pendidikan**  
> **Subjek Uji Coba:** Siswa Kelas V-A SDN Percobaan 2 Malang (Model R&D Alessi & Trollip)  
> **Pengembang / Peneliti:** Gito  

---

## 🎮 Ringkasan Proyek
**Eco-Explorer** adalah game simulasi edukatif 16-bit retro RPG yang dikembangkan menggunakan **Phaser 3 Game Engine**. Media ini dirancang khusus untuk memecahkan kesenjangan pemahaman konsep sains dari level **C1 (Mengingat)** menuju **C2 (Memahami Sebab-Akibat Trofik & Jaring-Jaring Makanan)** pada materi Keseimbangan Ekosistem Sawah di layar sentuh IFP kelas.

Game ini beroperasi secara **100% Offline (Zero-CORS)** melalui enkapsulasi aset Base64 Data URIs, menjamin kelancaran eksekusi di lingkungan peramban sekolah tanpa memerlukan koneksi internet maupun konfigurasi web server lokal.

---

## 📁 Struktur Direktori Repositori (Arsitektur Bersih & Modular)

```text
d:\SKRIPSI GITA\
├── index.html                        # 🕹️ Portal Utama & Client Game (1080p Canvas Engine PWA)
├── manifest.json                     # 📱 Web App Manifest (PWA & Standalone APK Ready)
├── sw.js                             # ⚡ Service Worker Offline Caching Engine
├── jalankan_game.bat                 # 🚀 Script Peluncur Server Lokal IFP (Port 8080)
├── build.py                          # ⚙️ Master Build Runner (Docs Data, DOCX Export, Tests)
│
├── css\                              # 🎨 Gaya Antarmuka & Responsivitas
│   └── game.css                      # Master Game Stylesheet (Glassmorphism, IFP >= 24px)
│
├── js\                               # 💻 Logika Pemrograman Game Modular
│   ├── config.js                     # Konfigurasi Global, Palet Warna, & Konstanta Matematika
│   ├── state.js                      # Pengelola Status Game & ProgressManager (LocalStorage)
│   ├── audio.js                      # Web Audio API Synth Engine & Voice-Over Object Pooling
│   ├── data\                         # Data Model 4 Bioma & 16 Misi Kausalitas
│   │   ├── ecosystems.js             # Definisi 4 Ekosistem (Sawah, Hutan, Sungai, Laut)
│   │   ├── missions.js               # Metadata 16 Misi & Skenario Krisis
│   │   └── assessment.js             # Bank Soal Evaluasi C2 & Rubrik
│   ├── renderers\                    # Mesin Rendering Canvas 2D 60 FPS
│   │   ├── characters.js             # Sprite Prosedural Organisme & Maskot Detektif
│   │   ├── gita-sequence.js          # Player Sekuensial Animasi WebP Karakter Gita
│   │   └── backgrounds.js            # Latar Dinamis & Partikel 4 Bioma
│   ├── scenes\                       # 11 Pengontrol Layar/Scene Modular
│   │   ├── title.js, tutorial.js, how.js, teacher.js, about.js,
│   │   ├── team.js, biome.js, mission-menu.js, simulation.js,
│   │   └── quiz.js, victory.js
│   └── main.js                       # Lifecycle Bootstrapper, Router & PWA Service Worker
│
├── tests\                            # 🧪 Automated Regression & Unit Test Suites (100% Lolos)
│   ├── run.js                        # Master Test Runner (node tests/run.js)
│   ├── validate_16_missions.js       # Validasi Keseimbangan 16 Misi & 4 Kelompok
│   └── test_*.js / verify_*.js       # Unit Test Canvas, Audio, IFP Touchscreen, dsb.
│
├── assets\                           # 🎨 Direktori Terpadu Aset Game Web
│   ├── animations\                   # 🎬 Frame Animasi Sekuensial WebP (talking_loop, worried_loop, gita-thinking)
│   ├── audio\                        # 🔊 Berkas Audio Game
│   │   ├── backsound\                # 🎵 Musik Latar Edukasi (.mp3)
│   │   └── voice-over\               # 🎙️ Master 72 Audio Voice-Over Gita (.mp3)
│   ├── fonts\                        # 🔤 Web Fonts Lokal (Baloo 2, Fredoka, Nunito)
│   ├── icons\                        # 📱 Ikon Aplikasi PWA & Favicon
│   └── images\                       # 🖼️ Citra Statis Teroptimasi (Lambang-UM.webp, Foto pas agita.webp)
│
├── raw-assets\                       # 🎨 Master Source Art & Arsip Mentah (Resolusi Asli, .gitignore)
│   ├── ai-generated\                 # 61 Master Citra Asli dari AI Generator
│   ├── after-effects\                # Project Adobe After Effects (.aep) & Auto-Save
│   └── badges\, characters\, organisms\, ui\
│
├── archive\                          # 📦 Cadangan Monolitik & Kode Historis (.gitignore)
│
├── docs\                             # 📚 Dokumentasi Skripsi, R&D & Naskah Akademik
│   ├── PRD_GAME_SKRIPSI.md           # Product Requirement & Game Design Document (GDD)
│   ├── SKRIPSI.md                    # Draf Naskah Skripsi, Outline & Instrumen
│   ├── ROADMAP.md                    # Roadmap Riset 16 Pekan (Model Alessi & Trollip)
│   ├── LKPD_DETEKTIF_SAWAH.md        # Lembar Kerja Siswa (Buku Catatan Co-Pilot Meja)
│   ├── DOKUMEN_AUDIT_VOICE_OVER.md   # Transkrip & Master Sheet 72 Rekaman Voice-Over
│   ├── PROMPT_ASSET_GEMINI.md        # Panduan Spesifikasi Prompt Visual
│   ├── docs-data.js & index.html     # Portal Pembaca Dokumen Skripsi Offline
│   └── exports\                      # 📄 Berkas Hasil Ekspor Dokumen ke Microsoft Word (.docx)
│
└── tools\                            # ⚙️ Pipeline, Utilitas & Exporter Dokumen
    ├── audits\                       # Pemeriksa Kepatuhan Tipografi IFP & Integritas Root
    ├── exporters\                    # Generator Dokumen Web & DOCX Word
    ├── pipeline\                     # Pipeline Optimasi & Kompresi Aset
    ├── sync\                         # Sinkronisasi Otomatis Dokumen Pendamping Skripsi
    └── archive\                      # Arsip Skrip Patch & Migrasi Sebelumnya
```

---

## ⚡ Quick Start (Cara Menjalankan)

### 1. Menjalankan Game di Komputer / Layar Sentuh IFP
Klik ganda berkas peluncur:
```text
jalankan_game.bat
```
*(Atau buka peramban ke `http://localhost:8080/` setelah server lokal aktif).*

### 2. Menjalankan Test Suite Otomatis
Untuk memvalidasi integritas 11 scene, 16 misi, dan rendering canvas:
```bash
node tests/run.js
node tests/validate_16_missions.js
```
*(Atau gunakan runner serbaguna: `python build.py --test`)*

### 3. Memperbarui Portal Dokumen Skripsi
Jika memperbarui dokumen riset di folder `docs/`:
```bash
python build.py --docs
```

### 4. Mengekspor Dokumen Skripsi ke Word (.docx)
Untuk menghasilkan berkas Word ke dalam folder `docs/`:
```bash
python build.py --docx
```

---

## 🧩 Fitur & Integrasi Pedagogis
1. **Model Pembelajaran Alessi & Trollip (2001):**
   * Alur: *Present Information* $\rightarrow$ *Guide the Learner* $\rightarrow$ *Practice (Simulasi 4 Bioma)* $\rightarrow$ *Assess Learning (Teka-Teki C2)*.
2. **Teori Kognitif Pembelajaran Multimedia (Mayer, 2021):**
   * *Modality Principle:* Voice-over vokal asli Kakak Gita memandu siswa bersamaan dengan visual dinamis.
   * *Signaling Principle:* Spotlight tour 4-langkah dan kontras warna menonjolkan fokus penyelidikan.
3. **Tahap Perkembangan Kognitif Piaget (Operasional Konkret, Usia 7–11 Tahun):**
   * Kausalitas trofik disajikan nyata melalui manipulasi populasi dan reaksi visual-audio langsung.
4. **Scaffolding Digital Vygotsky (Zone of Proximal Development):**
   * Tombol Bantuan Misi 💡 memberikan petunjuk bertahap tanpa membocorkan jawaban langsung.
5. **Kolaborasi Kelas CSCL (Model Kooperatif Jigsaw):**
   * 28 Siswa terbagi dalam 4 Kelompok Detektif Spesialis (Sawah, Hutan, Sungai, Laut).
   * Siswa di meja bertindak sebagai *Penasihat Meja* yang serempak mengangkat kartu fisik 3 warna (🟢 Hijau / 🟡 Kuning / 🔴 Merah) saat tombol **TANYA TEMAN** ditekan.

---

## 🛠️ Spesifikasi Teknologi
* **Arsitektur:** Native HTML5 Canvas 2D 60 FPS Engine (Zero-CORS, 100% Offline Standalone & PWA)
* **Audio Engine:** Web Audio API Native Synth + HTML5 Audio Voice-Over Pooling
* **Standar Ergonomi:** Interactive Flat Panel (IFP) 65"–86" Layar Sentuh $1920 \times 1080$, Tipografi $\ge 24$ px
* **PWA & Android:** Service Worker Offline Cache, Web App Manifest, Dual-Mode Touch & Palm Rejection

---
© 2026 Gita / Gito - Teknologi Pendidikan | Universitas Negeri Malang | SDN Percobaan 2 Malang
