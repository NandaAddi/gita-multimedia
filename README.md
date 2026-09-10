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

## 📁 Struktur Direktori Repositori (Senior Game Dev Standard)

```text
d:\SKRIPSI GITO\
├── .agents\                          # Konfigurasi & aturan automasi Antigravity AI Agent
│   └── rules\
│       └── sync_skripsi_docs.md      # Protokol sinkronisasi dokumen riset skripsi
│
├── docs\                             # 📚 Dokumentasi Desain Game (GDD/PRD) & Naskah Akademik
│   ├── PRD_GAME_SKRIPSI.md           # Product Requirement & Game Design Document lengkap
│   ├── SKRIPSI.md                    # Draf naskah skripsi, outline & pedoman instrumen wawancara
│   ├── ROADMAP.md                    # Rencana riset mingguan 16 pekan (Model Alessi & Trollip)
│   ├── LKPD_DETEKTIF_SAWAH.md        # Lembar Kerja Peserta Didik (Buku Catatan Co-Pilot Meja)
│   ├── PROMPT_ASSET_GEMINI.md        # Panduan spesifikasi prompt visual retro pixel art
│   ├── DOKUMEN_AUDIT_VOICE_OVER.md   # Audit transkrip 25 rekaman vokal studio pemandu Gita
│   └── PEDOMAN_SINKRONISASI_DOKUMEN.md# Pedoman protokol konsistensi dokumen pendamping
│
├── raw-assets\                       # 🎨 Master Source Art & Aset Mentah (Resolusi Asli)
│   ├── characters\                   # Master art karakter (gito character1.png)
│   ├── organisms\                    # Master art organisme (padi, tikus, katak, ular, elang, jamur)
│   ├── badges\                       # Master art lencana perisai tim 16-bit
│   └── ui\                           # Master art ikon misi & antarmuka
│
├── tools\                            # ⚙️ Build Pipelines, Asset Packers & Academic Exporters
│   ├── pipeline\
│   │   ├── embed_assets.py           # Engine packager: PNG -> Base64 (assets-data.js)
│   │   ├── embed_vo.py               # Audio packager: WAV -> Base64 (vo-data.js)
│   │   ├── process_assets.py         # Utility chroma-key magenta & auto-crop
│   │   └── generate_assets.py        # Generator prosedural aset pixel art
│   └── exporters\
│       ├── generate_docx.py          # Konverter otomatis dokumen markdown ke Microsoft Word (.docx)
│       └── generate_pdf.py           # Konverter otomatis dokumen markdown ke PDF format akademik
│
├── WEBSITE\                          # 🕹️ Game Client & Web Application (Phaser 3 Runtime)
│   ├── index.html                    # Portal riset & IFP launcher hub
│   ├── phaser.html                   # Kontainer kanvas game utama (1080p Widescreen Scale-to-Fit)
│   ├── assets\                       # Aset runtime teroptimasi game
│   │   ├── characters\               # Sprite karakter Gita (idle, talk)
│   │   ├── environment\              # Latar belakang panorama sawah 1080p
│   │   ├── organisms\                # Sprite organisme sawah
│   │   ├── ui\                       # Elemen UI, kartu menu, & lencana tim
│   │   └── voice-over\               # 25 berkas rekaman audio suara Gita (.wav)
│   ├── js\                           # Logika pemrograman game
│   │   ├── assets-data.js            # Bundle Base64 visual aset game (Offline zero-CORS)
│   │   ├── vo-data.js                # Bundle Base64 vokal audio game (Offline zero-CORS)
│   │   ├── audio.js                  # Sound engine Web Audio API & synthesizer BGM 8-bit
│   │   └── phaser-game\
│   │       ├── main.js               # Konfigurasi engine Phaser 3
│   │       └── scenes\               # 8 Scene modular terstruktur:
│   │           ├── BootScene.js      # Preloading aset & data Base64
│   │           ├── TitleScene.js     # Layar judul, menu utama & panduan guru
│   │           ├── TutorialScene.js  # Buku panduan interaktif 4-slide & aturan main
│   │           ├── TeamSelectScene.js# Pemilihan 5 kelompok spesialis (Model Jigsaw)
│   │           ├── MissionMenuScene.js# Peta 4 skenario krisis keseimbangan sawah
│   │           ├── SimulationScene.js# Arena simulasi manipulasi populasi & trofik kaskade
│   │           ├── QuizScene.js      # Tantangan teka-teki inferensi sebab-akibat C2
│   │           └── VictoryScene.js   # Layar selebrasi lencana bintang & refleksi tim
│   └── lib\
│       └── phaser.min.js             # Library mandiri Phaser 3 (100% offline)
│
├── build.py                          # 🚀 Master one-click build CLI runner
├── embed_assets.py                   # 🔄 Root compatibility wrapper (memanggil tools/pipeline/)
├── embed_vo.py                       # 🔄 Root compatibility wrapper (memanggil tools/pipeline/)
├── GEMINI.md                         # 🤖 Aturan kerja & protokol AI Assistant
├── .gitignore                        # 🛡️ Konfigurasi proteksi cache & file sementara
└── README.md                         # 📖 Dokumentasi arsitektur ini
```

---

## ⚡ Quick Start (Cara Menjalankan)

### 1. Menjalankan Game Langsung di Peramban
Cukup buka berkas berikut menggunakan peramban Google Chrome atau Microsoft Edge:
```text
file:///D:/SKRIPSI GITO/WEBSITE/phaser.html
```
*(Atau buka `WEBSITE/index.html` untuk mengakses Portal Riset & Panduan Penggunaan).*

### 2. Memperbarui Aset Game (One-Click Build)
Jika Anda menambahkan atau mengganti gambar/audio di folder `WEBSITE/assets/`:
```bash
# Memperbarui seluruh aset gambar dan audio sekaligus:
python build.py

# Atau perbarui visual saja:
python build.py --assets

# Atau gunakan shortcut lama Anda:
python embed_assets.py
```

### 3. Mengekspor Dokumen Skripsi ke Word (.docx)
Untuk menghasilkan berkas Word instrumen wawancara dan roadmap riset:
```bash
python tools/exporters/generate_docx.py
```

---

## 🧩 Fitur & Integrasi Pedagogis
1. **Model Pembelajaran Alessi & Trollip (2001):**
   * Tahap: *Present Information* $\rightarrow$ *Guide the Learner* $\rightarrow$ *Practice (Simulasi Sawah)* $\rightarrow$ *Assess Learning (Teka-Teki C2)*.
2. **Teori Kognitif Pembelajaran Multimedia (Mayer, 2021):**
   * *Modality Principle:* Arahan vokal Gita memandu siswa secara auditori bersamaan dengan animasi visual sawah.
   * *Contiguity Principle:* Indikator populasi terintegrasi langsung di atas organisme terkait.
3. **Tahap Perkembangan Kognitif Piaget (Operasional Konkret, Usia 7–11 Tahun):**
   * Kausalitas abstrak diwujudkan dalam bentuk konkrit: rantai makanan disajikan dengan interaksi visual langsung (tikus memakan padi, ular memakan tikus).
4. **Scaffolding Digital Vygotsky (Zone of Proximal Development):**
   * Tombol Bantuan 💡 memberikan petunjuk bertahap tanpa langsung memberikan jawaban mutlak.
5. **Kolaborasi Kelas CSCL (Model Kooperatif Jigsaw):**
   * Peran dibagi menjadi 5 Tim Spesialis (*Tim Elang, Ular, Katak, Padi, Jamur*).
   * Siswa di meja kelas bertindak sebagai *Co-Pilot* yang mengangkat kartu fisik voting (🟢 Hijau / 🟡 Kuning / 🔴 Merah) saat tombol **TANYA TEMAN** ditekan.

---

## 🛠️ Spesifikasi Teknologi
* **Game Engine:** Phaser 3.87+ (Canvas / WebGL Renderer)
* **Audio Synthesizer:** Web Audio API Native Synth + HTML5 Audio Voice-Over Controller
* **Asset Pipeline:** Python Pillow + Base64 Inline Encoder (Zero CORS, 100% Offline-Ready)
* **Desain Target:** Layar Sentuh IFP 65"–86" Resolusi $1920 \times 1080$ Widescreen (16:9)

---
© 2026 Gito - Teknologi Pendidikan | SDN Percobaan 2 Malang
