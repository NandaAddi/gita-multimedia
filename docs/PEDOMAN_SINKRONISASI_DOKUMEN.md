# PEDOMAN SINKRONISASI DOKUMEN PENDAMPING SKRIPSI
## "Eco-Explorer: Penjaga Keseimbangan Sawah" — SDN Percobaan 2 Malang

Dokumen ini berfungsi sebagai panduan arsitektur dokumentasi riset skripsi. Tujuannya adalah memastikan setiap kali aplikasi game mengalami pembaruan (fitur baru, prinsip pedagogis, aset visual, atau mekanika antarmuka), dokumen akademik pendukungnya **selalu terbarui secara sinkron dan konsisten**.

---

## 🗺️ PETA KETERHUBUNGAN KODE & DOKUMEN PENDAMPING

```
                          [APLIKASI GAME PHASER 3]
       (TitleScene, SimulationScene, QuizScene, TutorialScene, audio.js)
                                     │
           ┌─────────────────────────┼─────────────────────────┐
           ▼                         ▼                         ▼
  [PRD_GAME_SKRIPSI.md]   [LKPD_DETEKTIF_SAWAH.md]       [ROADMAP.md]
  • Desain Game & PRD     • Lembar Kerja Siswa 5A        • Progres 16 Pekan
  • Kerangka Teori LM-GM  • Peran Co-Pilot di Meja       • Alessi & Trollip
  • Ergonomi Layar IFP    • Kartu Voting 3 Warna         • Status Alpha/Beta
           │                         │                         │
           └─────────────────────────┼─────────────────────────┘
                                     ▼
                      [SKRIPSI.md & INSTRUMEN SKRIPSI]
                      • Latar Belakang Fenomena C1 vs C2
                      • Outline Bab 1 - Bab 5
                      • Landasan Teori (Mayer, Piaget, Vygotsky, CSCL)
```

---

## 📑 DAFTAR DOKUMEN & MATRIKS KEWAJIBAN SINKRONISASI

### 1. [`docs/PRD_GAME_SKRIPSI.md`](file:///d:/SKRIPSI%20GITO/docs/PRD_GAME_SKRIPSI.md) (Product Requirements & Game Design Document)
* **Kapan Harus Diupdate:**
  * Ada penambahan tombol, modal interaktif, atau alur scene baru.
  * Ada penerapan teori/prinsip baru (misal: penambahan Vygotsky Scaffolding, CSCL, atau Piaget Concrete Visuals).
  * Ada perubahan tata letak antarmuka (*Hardware-Aware Design IFP*).
* **Fokus Bagian:**
  * Bagian 1.3: Landasan Teori & Simulasi Alessi & Trollip.
  * Bagian 2.2: Matriks LM-GM (*Learning Mechanics – Game Mechanics*).
  * Bagian 3: Spesifikasi Ergonomi Layar Sentuh IFP.
  * Bagian 4 & 5: Mekanika Inti Permainan & Scene Flow.
  * Bagian 9: Pipeline Aset & Spesifikasi Teknis.

---

### 2. [`docs/LKPD_DETEKTIF_SAWAH.md`](file:///d:/SKRIPSI%20GITO/docs/LKPD_DETEKTIF_SAWAH.md) (Lembar Kerja Peserta Didik / Co-Pilot Logbook)
* **Kapan Harus Diupdate:**
  * Ada perubahan mekanisme kartu voting di meja kelas (kartu hijau, kuning, merah).
  * Ada penyesuaian aturan pembagian kelompok/tim (*Jigsaw Model*).
  * Ada modifikasi butir soal refleksi atau tabel pengamatan C2 siswa.
* **Fokus Bagian:**
  * Panduan peran siswa sebagai *Co-Pilot* di meja kelas.
  * Petunjuk penggunaan kartu voting saat tombol "Tanya Teman" ditekan di IFP.
  * Tabel pencatatan hasil pengamatan ekosistem sawah.

---

### 3. [`docs/ROADMAP.md`](file:///d:/SKRIPSI%20GITO/docs/ROADMAP.md) (Roadmap R&D 16 Pekan Alessi & Trollip)
* **Kapan Harus Diupdate:**
  * Setiap pekan selesai atau ada fitur/milestone penting yang tuntas dikerjakan.
  * Ada perubahan jadwal seminar proposal, validasi ahli, atau uji coba kelas.
* **Fokus Bagian:**
  * Pekan 8–12: Fase Pengembangan & Uji Coba Lapangan.
  * Tabel ringkasan 16 pekan dan milestone target skripsi.

---

### 4. [`docs/SKRIPSI.md`](file:///d:/SKRIPSI%20GITO/docs/SKRIPSI.md) (Naskah & Instrumen Skripsi)
* **Kapan Harus Diupdate:**
  * Ada penambahan teori pendukung baru yang diterapkan dalam game.
  * Ada penyesuaian instrumen observasi atau angket respon siswa/guru.
* **Fokus Bagian:**
  * Bab 1: Latar belakang kesenjangan C1 vs C2 dan urgensi simulasi IFP.
  * Bab 2: Landasan teori multimedia (Mayer) dan perkembangan kognitif anak (Piaget/Vygotsky).
  * Bab 3: Prosedur penelitian pengembangan model Alessi & Trollip.

---

### 5. [`docs/PROMPT_ASSET_GEMINI.md`](file:///d:/SKRIPSI%20GITO/docs/PROMPT_ASSET_GEMINI.md) (Dokumentasi Prompt & Desain Visual)
* **Kapan Harus Diupdate:**
  * Setiap kali ada gambar latar belakang, sprite karakter, plakat judul, kartu menu, atau lencana tim baru yang di-generate atau diproses.

### 6. [`DOKUMEN_AUDIT_VOICE_OVER.md`](file:///d:/SKRIPSI%20GITO/DOKUMEN_AUDIT_VOICE_OVER.md) (Inventaris Naskah & Spesifikasi Audio Vokal)
* **Kapan Harus Diupdate:**
  * Ada penambahan dialog karakter Gita baru atau perubahan teks soal/instruksi.
  * Ada pembaruan file rekaman suara atau konfigurasi Text-to-Speech synthesizer.

---

## 🤖 CARA KERJA SISTEM AGENT OTOMATIS

Antigravity IDE telah dilengkapi dua berkas aturan otomatis:
1. **[`GEMINI.md`](file:///d:/SKRIPSI%20GITO/GEMINI.md)** di root proyek.
2. **[`.agents/rules/sync_skripsi_docs.md`](file:///d:/SKRIPSI%20GITO/.agents/rules/sync_skripsi_docs.md)** dengan pemicu `always_on`.

### Alur Eksekusi Otomatis Agen:
```
[User Meminta Fitur Baru] ──> [Agen Mengedit Kode Game JS]
                                       │
                                       ▼ (Wajib Membaca Aturan GEMINI.md)
                             [Agen Mengidentifikasi Dokumen Terdampak]
                                       │
                                       ▼
                             [Agen Memperbarui PRD, LKPD, ROADMAP, dll.]
                                       │
                                       ▼
                             [Laporan Selesai Disajikan ke User]
```

Dengan sistem ini, Anda tidak perlu khawatir skripsi Anda tertinggal dari aplikasi gamenya. Keduanya akan selalu tumbuh secara serempak (*in-sync*)!
