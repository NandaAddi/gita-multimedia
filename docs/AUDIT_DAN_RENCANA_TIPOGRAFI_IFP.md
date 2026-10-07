# MASTER IMPLEMENTATION PLAN & PROMPT: AUDIT & PEROMBAKAN TIPOGRAFI ULTRA-BESAR (IFP READY $\ge 24$PX)

> **Proyek:** *Eco-Explorer: Penjaga Keseimbangan Ekosistem* (Skripsi R&D Alessi & Trollip)  
> **Target Perangkat:** Layar Sentuh *Interactive Flat Panel* (IFP) 65–86 Inci (1920 $\times$ 1080 Landscape)  
> **Subjek Pengguna:** 28 Siswa Kelas 5A SDN Percobaan 2 Malang (Jarak Pandang: 1–5 Meter)  
> **Keputusan Grill-Me:**  
> 1. Standar Ultra-Besar: Teks terkecil $\ge 24$px, Tombol $30 - 34$px, Judul $44 - 56$px.  
> 2. Penanganan Teks: Perbesar dimensi container & ringkas copywriting agar muat 2–3 baris rapi.  
> 3. Alur Kerja: Publikasikan Master Plan & Prompt, kemudian eksekusi bertahap scene-by-scene dengan pengujian otomatis.

---

## 1. HASIL AUDIT TIPOGRAFI LENGKAP (BASELINE CODEBASE)

Berdasarkan pemindaian otomatis menggunakan `scripts/audit_fonts.py` pada seluruh modul scene Phaser 3 (`WEBSITE/js/phaser-game/scenes/`):

| No | Modul Scene | Total Deklarasi Font | Rentang Ukuran Awal | Jumlah Font Kritis ($< 20$px) | Persentase Tidak Terbaca |
|:---:|:---|:---:|:---:|:---:|:---:|
| 1 | `TitleScene.js` | 10 | 16px – 28px | 7 buah | 70.0% |
| 2 | `TutorialScene.js` | 16 | 16px – 32px | 7 buah | 43.8% |
| 3 | `TeamSelectScene.js` | 17 | 11px – 30px | 14 buah | 82.4% |
| 4 | `BiomeSelectScene.js` | 21 | 13px – 46px | 13 buah | 61.9% |
| 5 | `MissionMenuScene.js` | 27 | 15px – 48px | 18 buah | 66.7% |
| 6 | `SimulationScene.js` | 49 | 11px – 36px | 39 buah | 79.6% |
| 7 | `QuizScene.js` | 12 | 13px – 28px | 7 buah | 58.3% |
| 8 | `VictoryScene.js` | 14 | 17px – 52px | 5 buah | 35.7% |
| 9 | `BootScene.js` | 2 | 22px – 40px | 0 buah (perlu up 22px $\rightarrow$ 26px) | 0% |
| **TOTAL** | **Seluruh Game** | **168** | **11px – 52px** | **110 BUAH** | **65.5%** |

### Temuan Kritis:
1. **Font 11px – 13px di Layar IFP:** Ditemukan teks berukuran 11px (di `TeamSelectScene.js` dan `SimulationScene.js`) serta 13px (di `BiomeSelectScene.js` dan `QuizScene.js`). Pada layar 1080p yang diproyeksikan ke IFP 75 inci, teks 11px hanya berukuran fisik $\approx 6$ mm, sama sekali mustahil dibaca oleh 20 siswa Penasihat Meja yang duduk di bangku kelas baris 2–5.
2. **Keterbatasan Kotak Kontainer:** Kotak dialog atau plakat kecil ($30 - 40$ px tinggi) sebelumnya dirancang untuk font 13–15px. Untuk menampung font $\ge 24$px, tinggi kartu/kotak dialog harus ditingkatkan secara proporsional.

---

## 2. HIERARKI TIPOGRAFI ULTRA-BESAR BARU (STANDAR IFP KELAS 5A)

```
+----------------------------------------------------------------------------------------------------+
|                      HIERARKI STANDAR TIPOGRAFI ULTRA-BESAR (1920 x 1080 IFP)                     |
+-------+--------------------------+---------------+-------------------------------------------------+
| TINGKAT| PERAN ELEMEN UI          | UKURAN LAMA   | UKURAN BARU (STANDAR ULTRA-BESAR)               |
+-------+--------------------------+---------------+-------------------------------------------------+
| LVL 0 | Teks Mikro, Tag, Lencana | 11px - 16px   | 24px - 26px Bold (Batas Bawah Minimum Mutlak!)   |
| LVL 1 | Isi Paragraf, Dialog     | 17px - 20px   | 26px - 28px Regular / Semi-Bold                 |
| LVL 2 | Tombol Aksi Sentuh (CTA) | 18px - 24px   | 30px - 34px Extra Bold (Taktil Ramah Jemari)    |
| LVL 3 | Sub-Judul, Kartu Header  | 22px - 28px   | 36px - 42px Bold                                |
| LVL 4 | Judul Layar Utama / Hero | 32px - 48px   | 48px - 56px Heavy Black / Fredoka Bold          |
+-------+--------------------------+---------------+-------------------------------------------------+
```

### Prinsip Penyesuaian Dimensi Kontainer:
1. **Tinggi Tombol Aksi:** Ditingkatkan minimal menjadi $56 - 68$ px (sebelumnya $38 - 48$ px).
2. **Balon Dialog Maskot Gita:** Diperluas menjadi $580 - 640$ px lebar dan $130 - 150$ px tinggi dengan teks 2–3 baris padat bernada ceria.
3. **Padding Teks & Line Spacing:** Menggunakan `lineSpacing: 6 - 8` px agar huruf besar tidak berimpitan vertikal.

---

## 3. MASTER PROMPT EKSEKUSI (UNTUK DIEKSEKUSI AGEN SECARA BERTAHAP)

```markdown
### MASTER PROMPT: REFAKTORISASI TIPOGRAFI ULTRA-BESAR GAME ECO-EXPLORER

Lakukan pembaruan menyeluruh pada seluruh berkas scene Phaser 3 di folder `WEBSITE/js/phaser-game/scenes/`:
1. Ubah SEMUA deklarasi `fontSize` yang berukuran < 24px menjadi MINIMAL 24px.
2. Tingkatkan tombol aksi menjadi 30px–34px dan judul menjadi 44px–56px sesuai hierarki standar IFP.
3. Sesuaikan lebar/tinggi wadah kartu (width/height), padding, origin, dan batasan `wordWrap` agar tidak ada teks yang keluar dari garis batas (zero-clipping).
4. Ringkas dan padatkan kalimat narasi panjang jika diperlukan agar muat 2–3 baris dengan indah.
5. Jalankan validasi otomatis (`node -c`, tes headless, dan script audit).
6. Selalu sinkronkan dokumen pendamping skripsi (`docs/PRD_GAME_SKRIPSI.md` dan `docs/ROADMAP.md`) per aturan GEMINI.md.
```

---

## 4. TAHAPAN EKSEKUSI BERTAHAP (ROADMAP IMPLEMENTASI)

### 🔹 Fase 1: Layar Awal & Buku Panduan (`TitleScene.js` & `TutorialScene.js`)
* **`TitleScene.js`:**
  - Plakat Sapaan Gita: Avatar, dialog box diperlebar, teks sapaan naik dari 16px $\rightarrow$ 26px.
  - 3 Tombol Menu Utama (*Mulai Main*, *Cara Bermain*, *Panduan Guru*): Teks dinaikkan menjadi 32px Bold.
  - Modal Panduan Guru / Profil Pengembang: Teks dinaikkan dari 18px–19px $\rightarrow$ 24px–26px, ukuran pop-up disesuaikan.
* **`TutorialScene.js`:**
  - Header Slide: 32px $\rightarrow$ 42px.
  - Kotak Penjelasan 4 Slide: Teks isi dinaikkan dari 16px–20px $\rightarrow$ 26px–28px, dimensi kotak dialog diperbesar.
  - Tombol Navigasi (*Lanjut*, *Kembali*, *Selesai*): 20px $\rightarrow$ 32px.

### 🔹 Fase 2: Pemilihan Tim & Peta Ekosistem (`TeamSelectScene.js` & `BiomeSelectScene.js`)
* **`TeamSelectScene.js`:**
  - Lencana Tim & Sub-label pahlawan: Naik dari 11px–14px $\rightarrow$ 24px Bold.
  - Tombol Pilihlah Tim Ini: Naik dari 17px $\rightarrow$ 30px Bold.
  - Balon Dialog Gita: Naik dari 15px $\rightarrow$ 26px.
* **`BiomeSelectScene.js`:**
  - Strip Organisme & Pratinjau 2 Misi: Naik dari 13px–16px $\rightarrow$ 24px Bold.
  - Status Gembok & Keterangan Bioma: Naik dari 14px–18px $\rightarrow$ 24px–26px.
  - Tombol Aksi Sentuh Utama `SELIDIKI EKOSISTEM 🔍`: Naik dari 22px $\rightarrow$ 32px Bold.

### 🔹 Fase 3: Pemilihan Misi & Briefing Kasus (`MissionMenuScene.js`)
* **`MissionMenuScene.js`:**
  - Kartu Misi 1 & 2: Deskripsi krisis dinaikkan dari 15px–16px $\rightarrow$ 26px, target kuota menjadi 24px Bold.
  - Modal Briefing Cerita Kasus Gita: Dialog cerita dinaikkan dari 15px–17px $\rightarrow$ 26px, tombol `MULAI PENYELAMATAN 🚀` menjadi 32px.
  - Tombol Kembali: Naik dari 17px $\rightarrow$ 28px.

### 🔹 Fase 4: Arena Simulasi Utama (`SimulationScene.js`)
* **`SimulationScene.js` (Fokus Terbesar - 39 Font Kritis):**
  - **Header Bar:** Waktu 7 Menit, Nama Tim, Lencana Pahlawan naik menjadi 26px–28px.
  - **Health Meter Pod:** Label Ekosistem & Status Emosi naik menjadi 24px–26px Bold.
  - **Touch Action Dock (Kuadran Bawah):** Judul aksi, tombol sentuh taktil naik dari 13px–17px $\rightarrow$ 28px–32px, lencana kuota menjadi 24px Bold.
  - **Balon Gita & Scaffolding:** Dialog pemandu naik dari 15px $\rightarrow$ 26px, tombol narasi `🔊` dan bantuan `💡` disesuaikan.
  - **Pop-up Kamus Kata & Modal Tanya Teman:** Seluruh teks penjelasan sains konkret naik dari 11px–16px $\rightarrow$ 24px–26px.

### 🔹 Fase 5: Debriefing Kuis & Selebrasi Kemenangan (`QuizScene.js` & `VictoryScene.js`)
* **`QuizScene.js`:**
  - Pertanyaan Kasus C2: Naik dari 21px $\rightarrow$ 28px–30px Bold.
  - 3 Pilihan Jawaban (A, B, C): Naik dari 18px $\rightarrow$ 26px Bold. Kotak tombol pilihan diperlebar.
  - Diagram Alur Kausalitas (4 Node): Teks node naik dari 13px–14px $\rightarrow$ 24px Bold.
* **`VictoryScene.js`:**
  - Gelar Prestasi & Rincian Bintang: Naik dari 17px–22px $\rightarrow$ 26px–30px.
  - Tombol Lanjut Estafet / Menu: Naik menjadi 32px Bold.

---

## 5. PROTOKOL VERIFIKASI & SINKRONISASI AKHIR
1. **Audit Skrip Otomatis:** Menjalankan `python scripts/audit_fonts.py` dan memastikan `TOTAL: 0 font berukuran di bawah 24px!`.
2. **Pemeriksaan Sintaks & Logika:** Menjalankan `node -c` pada seluruh file scene dan menjalankan suite tes headless (`test_simulation_logic.js` & `test_progress_manager.js`).
3. **Sinkronisasi Dokumen Pendamping (`GEMINI.md`):**
   - Memperbarui `docs/PRD_GAME_SKRIPSI.md` Bagian 3.5 (Standar Tipografi IFP Ultra-Besar).
   - Memperbarui `docs/ROADMAP.md` pada Pekan 11.
   - Menghasilkan bundle baru via `python tools/exporters/build_docs_web.py`.
