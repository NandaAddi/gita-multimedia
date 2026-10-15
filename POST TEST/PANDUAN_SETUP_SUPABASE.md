# 🗄️ PANDUAN PENGGUNAAN DATABASE SUPABASE — KUIS EKOSISTEM
## Penelitian Skripsi — SDN Percobaan 2 Malang

---

## 📌 STATUS INTEGRASI: AKTIF & TERHUBUNG! 🚀

Kredensial proyek Supabase Anda sudah otomatis diterapkan ke dalam [`POST TEST/index.html`](file:///D:/SKRIPSI%20GITA/POST%20TEST/index.html):
- **Project URL:** `https://sgtssxlxuqktusianjsa.supabase.co`
- **Anon Public Key:** Terpasang (Aman dengan RLS)
- **Tabel Target:** `kuis_siswa`
- **PIN Panel Guru Default:** `1234`

---

## 🛡️ MENGAPA ANON KEY AMAN DI FRONTEND?

1. **Prinsip Resmi Supabase:** Kunci `anon public` memang dirancang khusus oleh Supabase untuk diletakkan di sisi frontend/browser.
2. **Perlindungan Row Level Security (RLS):** Melalui file [`setup.sql`](file:///D:/SKRIPSI%20GITA/POST%20TEST/supabase/setup.sql), kita mengunci hak akses tabel:
   - **Siswa (anon):** HANYA diizinkan mengirim hasil kuis (`INSERT`).
   - **Tidak Ada Izin Hapus/Ubah:** Perintah `UPDATE`, `DELETE`, atau modifikasi skema tabel DITOLAK oleh database Postgres.
   - **Kunci Rahasia (`service_role`):** Kunci rahasia/admin database **TIDAK PERNAH** dimasukkan ke kode frontend.

---

## ⚡ LANGKAH WAJIB DI SUPABASE DASHBOARD (HANYA SEKALI)

Jika belum menjalankan script SQL lengkap di dashboard Supabase:

1. Buka dashboard proyek Supabase Anda:
   👉 **https://supabase.com/dashboard/project/sgtssxlxuqktusianjsa**
2. Klik menu **SQL Editor** (ikon terminal di sidebar kiri).
3. Klik tombol **New Query**.
4. Buka dan salin seluruh isi file:
   [`POST TEST/supabase/setup.sql`](file:///D:/SKRIPSI%20GITA/POST%20TEST/supabase/setup.sql)
5. Tempelkan (paste) ke SQL Editor lalu klik tombol **Run** (atau tekan `Ctrl + Enter`).
6. Pastikan muncul pesan:
   `Setup berhasil! Tabel kuis_siswa dan kebijakan RLS siap digunakan 100%.`

---

## 🎯 CARA MENJALANKAN APLIKASI (REACT + VITE)

Aplikasi kuis evaluasi ini telah dimodernisasi menggunakan **React 18 + Vite**:
1. Buka terminal di folder `POST TEST`:
   ```bash
   cd "POST TEST"
   ```
2. Jalankan server lokal:
   ```bash
   npm run dev
   ```
   Aplikasi akan berjalan di `http://localhost:5173/`.
3. Untuk membuat bundle produksi siap rilis/hosting:
   ```bash
   npm run build
   ```
   Hasil build siap saji tersimpan di folder `POST TEST/dist/`.

---

## 🎯 CARA PENGGUNAAN DI KELAS

### 1. Alur untuk Siswa:
1. Siswa membuka aplikasi di laptop/tablet/browser kelas (`http://localhost:5173/` atau file build `dist/index.html`).
2. Muncul **Modal Identitas Siswa**:
   - Masukkan **Nama Lengkap**.
   - Pilih **Kelas** (misal `5A`).
   - Masukkan **Nomor Absen**.
   - Klik **MULAI PETUALANGAN**.
3. Di sudut kanan atas beranda kuis akan muncul tag siswa:
   `[Nama Siswa] · 5A · No. [Absen] · ⬤ terhubung`
4. Siswa mengerjakan **Checkpoint 1 (Posttest 20 Soal C2)**.
5. Saat Posttest selesai, nilai dan durasi pengerjaan otomatis terkirim ke Supabase (`⬤ tersimpan`), lalu siswa diarahkan ke tombol **Lanjut Isi Angket Respon 📝**.
6. Checkpoint 2 (**Angket Respon Peserta Didik**) akan terbuka dan langsung mengarahkan siswa ke Google Form angket respon.

---

### 2. Alur untuk Guru (Panel Rekap & Unduh Nilai):
1. Di beranda kuis, klik tombol **🔑 Panel Guru** di bawah peraturan kuis.
2. Masukkan PIN Guru:
   - **PIN Default:** `1234`
   *(Catatan: Anda dapat mengubah angka PIN ini pada variabel `TEACHER_PIN` di file `index.html`).*
3. Klik **MASUK**.
4. Panel Guru akan menampilkan:
   - **Kartu Statistik Ringkas:** Jumlah Siswa, Total Posttest, Rata-rata Skor Posttest, Nilai Tertinggi, Ketuntasan (≥75%).
   - **Tabel Data Lengkap:** Nomor, Nama, Kelas, No Absen, Jenis Kuis, Skor, Akurasi, Durasi, dan Tanggal/Jam pengerjaan.
   - **Tombol 📝 Buka Angket (Google Form):** Pintasan cepat guru membuka instrumen angket respon.
   - **Tombol ⬇ Unduh CSV:** Mengunduh seluruh rekap nilai siswa ke format file `.csv` yang langsung rapi dibuka di Microsoft Excel atau Google Sheets.
   - **Tombol 🔄 Perbarui:** Menyegarkan tabel secara langsung untuk melihat data nilai siswa terbaru.

---

## 📊 INTEGRASI GOOGLE SHEETS (OPSIONAL)

Untuk membuka spreadsheet langsung dari Panel Guru:
1. Buat Google Sheets baru di Google Drive Anda.
2. Salin URL Google Sheets tersebut.
3. Buka file [`POST TEST/index.html`](file:///D:/SKRIPSI%20GITA/POST%20TEST/index.html) pada baris ~1796:
   ```javascript
   const SHEETS_URL = "https://docs.google.com/spreadsheets/d/ID_SHEET_ANDA/edit";
   ```
4. Sekarang tombol **📊 Buka Google Sheets** di Panel Guru akan langsung membuka dokumen tersebut.
