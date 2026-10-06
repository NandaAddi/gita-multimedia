# [Plan] Sinkronisasi Capaian Pembelajaran, 4 Tujuan Pembelajaran, dan Instrumen Pretest-Posttest (20 Butir Soal C2)

> **Untuk Pekerja Agentik:** SUB-SKILL WAJIB: Gunakan `superpowers:subagent-driven-development` (direkomendasikan) atau `superpowers:executing-plans` untuk mengeksekusi rencana ini tugas demi tugas. Setiap langkah menggunakan sintaks checkbox (`- [ ]`) untuk pelacakan.

**Tujuan:** Menyelaraskan secara utuh Capaian Pembelajaran (CP) IPAS Fase C, 4 Tujuan Pembelajaran (TP), serta instrumen evaluasi Pretest & Posttest (20 butir soal pilihan ganda) ke dalam dokumen akademik skripsi (`docs/PRD_GAME_SKRIPSI.md`, `docs/SKRIPSI.md`, `docs/LKPD_DETEKTIF_SAWAH.md`, `docs/ROADMAP.md`) dan media interaktif `TES GITA BARU 1` (Pembaruan Slide Panduan Guru, modul data bank soal `assessment.js`, dan penampil instrumen evaluasi IFP).

**Arsitektur:** Mengintegrasikan bank data 20 butir soal evaluasi berstruktur JSON modular ke dalam game engine vanilla JS, menghubungkannya dengan Cockpit Panduan Guru di layar IFP, serta memperbarui seluruh dokumen pendamping R&D Alessi & Trollip agar 100% sinkron antara instrumen riset dan media yang dikembangkan.

**Tech Stack:** Vanilla JavaScript (ES6+), HTML5 Canvas/DOM IFP Ergonomics, Markdown Documentation, Python Web Docs Packager.

---

## 1. Analisis & Pemetaan Kisi-Kisi Instrumen (20 Soal vs 4 TP & 4 Bioma)

### 1.1 Capaian Pembelajaran (CP) Kurikulum Merdeka Fase C (Kelas V)
> *"Capaian pembelajaran Ilmu Pengetahuan Alam dan Sosial pada Fase C (kelas V SD) menekankan kemampuan peserta didik dalam memahami hingga menganalisis bagaimana alam semesta seperti hubungan antar komponen biotik dan abiotik, serta lingkungan sosial pengaruh terhadap ekosistem yang dapat terjadi di sekitarnya."*

### 1.2 Pemetaan 4 Tujuan Pembelajaran (TP)
* **TP 1:** Peserta didik mampu mengidentifikasi komponen biotik dan abiotik dalam berbagai jenis ekosistem.
* **TP 2:** Peserta didik mampu memahami hubungan rantai makanan dan jaring-jaring makanan pada ekosistem hutan tropis, laut, sawah, dan sungai.
* **TP 3:** Peserta didik mampu memprediksi dampak perubahan jumlah populasi komponen biotik terhadap rantai makanan dalam suatu ekosistem.
* **TP 4:** Peserta didik mampu menganalisis dampak perubahan populasi komponen biotik terhadap keseimbangan ekosistem, serta dampak aktivitas manusia terhadap keseimbangan ekosistem.

### 1.3 Matriks Kisi-Kisi 20 Butir Soal Pretest & Posttest
| No | Butir Indikator Soal | Bioma Terkait | Target TP | Level Bloom | Kunci |
|:---|:---|:---|:---:|:---:|:---:|
| **1** | Mengidentifikasi komponen abiotik pada ekosistem sawah (Air) | Sawah | **TP 1** | C1 | **b** |
| **2** | Menentukan peran pengurai/dekomposer (Bakteri & jamur) | Umum / Sawah | **TP 1 / TP 2** | C1 | **b** |
| **3** | Menganalisis pengaruh komponen abiotik terhadap fotosintesis (Cahaya matahari) | Darat / Umum | **TP 1** | C2 | **a** |
| **4** | Mengidentifikasi contoh komponen biotik pada ekosistem laut (Ikan) | Laut | **TP 1** | C1 | **c** |
| **5** | Menjelaskan peran plankton sebagai produsen di laut | Laut | **TP 1 / TP 2** | C2 | **b** |
| **6** | Menyusun urutan rantai makanan sawah (Padi → tikus → ular → elang) | Sawah | **TP 2** | C2 | **d** |
| **7** | Menjelaskan fungsi vital komponen abiotik bagi kelangsungan hidup | Umum | **TP 1** | C2 | **c** |
| **8** | Menentukan tingkat trofik rusa pemakan tumbuhan (Konsumen tingkat I) | Hutan Tropis | **TP 2** | C2 | **a** |
| **9** | Menentukan peran singa pemakan rusa (Konsumen tingkat II) | Hutan Tropis | **TP 2** | C2 | **b** |
| **10** | Memahami konsep terbentuknya jaring-jaring makanan | Umum | **TP 2** | C2 | **a** |
| **11** | Mengonfirmasi urutan rantai makanan produsen hingga predator puncak di sawah | Sawah | **TP 2** | C2 | **c** |
| **12** | Menyusun rantai makanan perairan sungai (Fitoplankton → ikan kecil → ikan besar) | Sungai | **TP 2** | C2 | **b** |
| **13** | Menyusun rantai makanan hutan tropis (Tumbuhan → belalang → katak → ular) | Hutan Tropis | **TP 2** | C2 | **c** |
| **14** | Menganalisis peran organisme penghubung jaring makanan (Tikus sawah) | Sawah | **TP 2 / TP 3** | C2 | **a** |
| **15** | Menentukan upaya pelestarian predator alami untuk menjaga keseimbangan sawah | Sawah (Manusia) | **TP 4** | C4 / C2 | **b** |
| **16** | Memprediksi dampak penurunan populasi ular terhadap ledakan tikus | Sawah (Dinamika) | **TP 3** | C2 (Inferring) | **a** |
| **17** | Menganalisis dampak deforestasi / penebangan liar terhadap keseimbangan ekosistem | Hutan (Manusia) | **TP 4** | C2 | **d** |
| **18** | Menganalisis dampak pencemaran air sungai terhadap organisme perairan | Sungai (Manusia) | **TP 4** | C2 | **c** |
| **19** | Memprediksi dampak perburuan predator elang terhadap populasi mangsa | Sawah/Hutan | **TP 3 / TP 4** | C2 (Inferring) | **b** |
| **20** | Memprediksi dampak penangkapan berlebih (*overfishing*) predator laut terhadap ikan kecil | Laut (Manusia) | **TP 3 / TP 4** | C2 (Inferring) | **c** |

---

## 2. Catatan Penyesuaian & Pertanyaan Terbuka untuk Pengguna

> [!IMPORTANT]
> **Catatan Redundansi Soal No. 6 dan No. 11:**
> Soal No. 6 dan No. 11 memiliki teks pertanyaan dan esensi yang sama (*"Urutan rantai makanan yang tepat pada ekosistem sawah adalah..."*), hanya urutan opsi jawabannya yang berbeda (No. 6 kunci **d**, No. 11 kunci **c**).
> * **Rekomendasi:** Kami tetap memasukkan kedua butir soal tersebut secara verbatim sesuai draf dari Anda agar instrumen pretest/posttest genap 20 nomor. Jika Anda menghendaki No. 11 dispesifikasikan (misalnya difokuskan pada dekomposer/jamur sawah), silakan berikan arahan.

---

## 3. Rencana Perubahan Komponen & File

### Komponen A: Sinkronisasi Dokumen Pendamping Skripsi (`docs/`)

#### 1. [MODIFY] `docs/PRD_GAME_SKRIPSI.md`
- **Bagian 1.2:** Perbarui rumusan Capaian Pembelajaran (CP) dan cantumkan 4 Tujuan Pembelajaran (TP) secara eksplisit.
- **Bagian 1.4 (Baru):** Tambahkan spesifikasi instrumen evaluasi Pretest & Posttest 20 butir soal, tabel kisi-kisi, dan keselarasan dengan level kognitif C2 Anderson & Krathwohl.
- **Bagian 2.2 (Matriks LM-GM):** Hubungkan setiap TP dengan mekanika simulasi pada 8 misi game.

#### 2. [MODIFY] `docs/SKRIPSI.md`
- Perbarui Bagian Outline Skripsi dan Landasan Teoretis.
- Tambahkan sub-bab baru: **Lampiran Instrumen Penelitian: Pretest dan Posttest IPAS Fase C (20 Butir Soal C2)** lengkap dengan kunci jawaban, distribusi per TP, serta rumus evaluasi uji efektivitas N-Gain (*Normalized Gain*).

#### 3. [MODIFY] `docs/LKPD_DETEKTIF_SAWAH.md`
- Perbarui bagian **Tujuan Pembelajaran** di halaman awal agar selaras dengan 4 TP baku.
- Tambahkan catatan instruksional posisi LKPD sebagai instrumen proses (*formative process investigation*) yang menjembatani Pretest (sebelum media) dan Posttest (setelah media).

#### 4. [MODIFY] `docs/ROADMAP.md`
- Pada Pekan 3 (Metodologi & Kisi-Kisi Instrumen) dan Pekan 11–12 (Uji Coba Lapangan), tambahkan kejelasan administrasi Pretest dan Posttest 20 butir soal pada 25 siswa kelas 5A SDN Percobaan 2 Malang.

---

### Komponen B: Pengembangan Media Game (`TES GITA BARU 1/`)

#### 1. [NEW] `TES GITA BARU 1/js/data/assessment.js`
- Berisi konstanta `ASSESSMENT_CP`, `ASSESSMENT_TP`, dan array objek `PRETEST_POSTTEST_BANK` (20 butir soal terstruktur lengkap dengan opsi, kunci jawaban, bioma, level kognitif, dan pembahasan).

#### 2. [MODIFY] `TES GITA BARU 1/js/scenes/teacher.js`
- **Slide 1 (Kurikulum & Tujuan):**
  - Tampilkan rumusan Capaian Pembelajaran (CP) terbaru.
  - Tambahkan kartu visual 4 Tujuan Pembelajaran (TP 1 - TP 4) dengan ikon dan penanda indikator yang jelas, tipografi $\ge 24$ px ramah IFP.
- **Slide 3 (Evaluasi & Kontrol):**
  - Tambahkan tombol aksi IFP:
    - `[📝 LIHAT BANK SOAL PRETEST & POSTTEST (20 SOAL)]`
  - Buat fungsi modal sentuh interaktif IFP untuk membuka viewer 20 soal dengan fitur:
    - Tab filter per Tujuan Pembelajaran (Semua / TP 1 / TP 2 / TP 3 / TP 4).
    - Tampilan kartu soal yang terbaca jelas dari bangku kelas (font 24–26 px).
    - Mode guru: Tombol tampilkan/sembunyikan kunci jawaban & pembahasan singkat.

#### 3. [MODIFY] `TES GITA BARU 1/index.html`
- Tambahkan pemuatan file skrip `<script src="js/data/assessment.js"></script>` di dalam blok `<!-- DATA LAYER -->`.

#### 4. [EXECUTE] `tools/exporters/build_docs_web.py`
- Jalankan skrip Python untuk memperbarui berkas `docs/docs-data.js` sehingga portal dokumentasi web menampilkan pembaruan PRD, SKRIPSI, LKPD, dan ROADMAP terkini.

---

## 4. Rencana Tugas Bertahap (Step-by-Step Task Breakdown)

### Task 1: Sinkronisasi Dokumen Naskah Skripsi (`docs/`)
- [ ] Perbarui `docs/PRD_GAME_SKRIPSI.md` dengan CP, 4 TP, dan tabel kisi-kisi 20 soal.
- [ ] Perbarui `docs/SKRIPSI.md` dengan instrumen evaluasi lengkap, kunci jawaban, dan panduan skor N-Gain.
- [ ] Perbarui `docs/LKPD_DETEKTIF_SAWAH.md` dengan 4 TP kurikulum baku.
- [ ] Perbarui `docs/ROADMAP.md` dengan milestone administrasi Pretest & Posttest.

### Task 2: Pembuatan Modul Data Evaluasi (`assessment.js`) & Integrasi `index.html`
- [ ] Buat file `TES GITA BARU 1/js/data/assessment.js` berisi CP, 4 TP, dan 20 butir soal lengkap dengan kunci dan pembahasan.
- [ ] Tambahkan tag `<script src="js/data/assessment.js"></script>` pada `TES GITA BARU 1/index.html`.

### Task 3: Pembaruan Layar Panduan Guru (`teacher.js`)
- [ ] Ubah Slide 1 `teacherSlides` agar menampilkan CP lengkap dan kartu terpisah untuk masing-masing 4 TP.
- [ ] Tambahkan tombol buka Bank Soal Pretest & Posttest di Slide 3.
- [ ] Implementasikan modal interaktif penampil 20 butir soal dengan penanda TP dan toggle kunci jawaban guru.

### Task 4: Validasi & Rebuild Dokumentasi
- [ ] Eksekusi `python tools/exporters/build_docs_web.py` untuk mengemas dokumen ke `docs/docs-data.js`.
- [ ] Verifikasi tampilan di browser melalui subagent atau pemeriksaan sintaks kode.
- [ ] Buat walkthrough laporan hasil kerja.

---

## 5. Rencana Verifikasi (Verification Plan)

### Automated Verification
- Menjalankan skrip Python builder dokumentasi:
  ```powershell
  python tools/exporters/build_docs_web.py
  ```

### Manual Verification
1. Buka `TES GITA BARU 1/index.html` di peramban.
2. Klik tombol **PANDUAN GURU**.
3. Periksa **Slide 1 (Kurikulum)**: Pastikan CP dan 4 TP tampil lengkap, rapi, dan terbaca jelas.
4. Buka **Slide 3 (Evaluasi)**: Klik tombol **Lihat Bank Soal Pretest & Posttest**.
5. Pastikan modal 20 butir soal terbuka, filter TP berfungsi, dan kunci jawaban dapat ditampilkan dengan benar.
