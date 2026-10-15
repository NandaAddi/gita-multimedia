# 🔤 MASTER PROMPT AUDIT TIPOGRAFI & KETERBACAAN (READABILITY AUDIT)
## Standar Ergonomi Visual IFP & Layar Kelas V SD (Fase C) — Eco-Explorer & Posttest

Dokumen ini berisi panduan baku dan template **Master Prompt Audit Tipografi & Keterbacaan Visual** yang dirancang khusus untuk memandu AI Coding Agent (Antigravity) maupun tim pengembang dalam memastikan seluruh teks di media pembelajaran dan instrumen evaluasi dapat dibaca secara nyaman, jelas, dan kontras tinggi dari bangku belakang kelas (jarak $\ge 5$–7 meter).

---

## 📌 1. MATRIKS STANDAR TIPOGRAFI IFP & LAPTOP SISWA KELAS V

Berdasarkan ergonomi visual siswa usia 10–11 tahun pada layar Interactive Flat Panel (IFP 65–86 inch) dan layar laptop sekolah (1366×768 s/d 1920×1080):

| Hierarki Elemen | Ukuran Lama (Terlalu Kecil) | Standar Baru (IFP-Focused Readability) | Ketebalan Huruf (Weight) | Kontras Warna Baku (WCAG AAA) |
| :--- | :---: | :---: | :---: | :--- |
| **Judul Utama (`display`, `h1`)** | 26px – 36px | **34px – 48px** (`clamp`) | 900 (Black / Extra Bold) | `#1E293B` (Slate 900) / `#46A302` |
| **Teks Soal Evaluasi (`.q-text`)** | 17px – 22px | **26px – 30px** (`clamp`) | 900 (Extra Bold) | `#1E293B` (Tegas, anti-blur) |
| **Teks Opsi Jawaban (`.opt .txt`)** | 13.5px – 15.5px | **20px – 22px** (`clamp`) | 800 (Bold) | `#1E293B` / Kontras latar `#fff` |
| **Nomor Tombol Opsi (`.opt .key`)** | 24×24 px (font 12px) | **36×36 px (font 19px)** | 900 (Black) | Kontras tinggi berbingkai tebal |
| **Teks Penjelasan / Umpan Balik (`.fb-body`, `.why`)** | 11.5px – 13.5px | **16.5px – 19.5px** | 700 – 800 | `#166534` (Hijau gelap) / `#92400E` |
| **Label Kartu, Status, & Chip (`.num`, `.topic`, `.sl`)** | 9.5px – 11.5px | **14.5px – 17px** | 900 (Bold) | `#475569` (Slate 600, anti-faded) |
| **Tombol Aksi Utama (`.btn`, `.btn-main`)** | 13px – 15px (pad 10px) | **17px – 20px (min-h 54–60px)** | 800 (Bold) | Padding $\ge 16$px, touch-target IFP |
| **Balon Dialog Maskot & Aturan (`.bubble`, `.rule`)** | 12px – 14.5px | **16.5px – 20px** | 700 – 800 | `#1E293B` / `#334155` |

---

## 🤖 2. TEKS MASTER PROMPT AUDIT TIPOGRAFI (SIAP SALIN)

Salin teks dalam blok kuotasi di bawah ini untuk menginstruksikan audit tipografi pada modul apa pun:

```markdown
Tolong lakukan audit tipografi, keterbacaan (readability), dan kontras visual menyeluruh pada antarmuka [SEBUTKAN NAMA MODUL / FOLDER, misal: POST TEST / WEBSITE].

Patuhi 4 PILAR ERGONOMI TIPOGRAFI SISWA SD KELAS 5 berikut:

1. PILAR 1: ELIMINASI TEKS MIKRO (< 16px)
- Telusuri seluruh berkas CSS/JS dan temukan seluruh teks yang berukuran < 16px (seperti 9.5px, 10px, 11px, 12px, 13px, 14px).
- Naikkan seluruh label sekunder, nomor soal, chip kategori, dan badge status ke minimal 15px – 17px.
- Naikkan teks bacaan utama (paragraf, instruksi, opsi jawaban) ke minimal 18px – 22px.
- Naikkan teks pertanyaan utama ke minimal 26px – 30px.

2. PILAR 2: ERGONOMI TOUCH-TARGET IFP (MINIMAL 54px - 64px)
- Pastikan seluruh tombol klik/sentuh memiliki tinggi minimal 54px – 64px dengan padding nyaman (minimal 14px - 18px).
- Kotak nomor opsi jawaban (.key) harus minimal berukuran 36×36 px dengan angka terbaca jelas (font 18px - 20px).

3. PILAR 3: PERTAJAM KONTRAS WARNA (WCAG 2.1 AAA)
- Larang penggunaan warna abu-abu pudar (#777, #999, #AFAFAF) pada teks informatif.
- Ganti dengan warna Slate tegas (#1E293B untuk heading/body utama, #475569 untuk label sekunder, #15803D untuk status sukses).
- Pastikan teks di atas latar warna pastel (kuning, hijau muda, merah muda) memiliki kontras gelap yang kuat (misal: #14532D di atas hijau lembut, #7F1D1D di atas merah lembut).

4. PILAR 4: ARSITEKTUR HYBRID RESPONSIVE (ANTI-TEXT CUTOFF)
- Pada layar besar/IFP (1080p), seluruh antarmuka harus tampil proporsional dalam 1 pandangan.
- Pada layar laptop/tablet dengan ketinggian terbatas (< 800px), pastikan kontainer konten menggunakan overflow-y: auto dengan custom scrollbar tipis (scrollbar-width: thin) agar tidak ada teks panjang atau tombol aksi yang terpotong ke bawah layar.

Sajikan hasil audit dalam format:
1. Tabel perbandingan sebelum vs sesudah ukuran font.
2. Eksekusi perbaikan langsung pada berkas CSS terkait.
3. Verifikasi build produksi (npm run build).
```

---

## 📊 3. CATATAN IMPLEMENTASI PADA PROYEK `POST TEST/`

Audit dan perbaikan telah dieksekusi secara langsung pada seluruh stylesheet:
- **`src/styles/variables.css`**: Kontras `--ink` dinaikkan ke `#1E293B` dan `--mut` ke `#475569`.
- **`src/styles/global.css`**: Skala tombol `.btn` diperbesar ke 17–20px (min-height 54px), modal text ke 17–19px (heading 24–28px).
- **`src/styles/home.css`**: Teks balon maskot `.bubble` naik ke 16.5–20px, judul `.display` ke 34–48px, aturan kuis `.rule` ke 16–19px, tombol `.btn-slider-next` ke 17–20px. Kontainer `.home-slide` dilengkapi `overflow-y: auto`.
- **`src/styles/quiz.css`**: Teks soal `.q-text` naik ke **24px – 30px**, teks opsi `.opt .txt` naik ke **19px – 22px**, kotak nomor opsi `.opt .key` ke **36×36px (font 19px)**, umpan balik `.fb-body` ke **16.5px – 19.5px**, dan tombol `.btn-main` ke **17px – 20px (min-height 56px)**. Area soal `.q-main` menggunakan hybrid vertical scroll.
- **`src/styles/result.css`**: Judul `.r-title` naik ke 30–42px, angka cincin skor ke 34–44px, badge pill review soal ke 16px (34–42px pill), teks soal review `.rev-question-text` ke 22–27px, dan status box ke 17–20px.
- **`src/styles/dashboard.css`**: Modal identitas siswa `.id-title` naik ke 30px, input field ke 18px (label 14.5px), dan tabel rekap nilai guru ke 15.5px.
