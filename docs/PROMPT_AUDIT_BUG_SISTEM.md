# 🛡️ PANDUAN & MASTER PROMPT AUDIT BUG OTOMATIS (ECO-EXPLORER)

Dokumen ini berisi template **Master Prompt Investigasi & Penemuan Bug Sistem** yang dirancang khusus untuk diinstruksikan kepada AI Coding Agent (Antigravity). Prompt ini memandu AI untuk melakukan audit menyeluruh secara otomatis pada 5 pilar utama game simulasi pembelajaran *Eco-Explorer*.

---

## 📋 CARA MENGGUNAKAN PROMPT INI

Cukup salin teks di dalam blok kuotasi **MASTER PROMPT** di bawah ini dan kirimkan langsung ke kolom obrolan AI Agent. Anda juga dapat menambahkan opsi spesifik (misalnya hanya mengaudit bioma sawah atau fokus pada audio saja).

---

## 🤖 TEKS MASTER PROMPT (SIAP SALIN)

```markdown
Tolong lakukan audit menyeluruh (deep automated bug hunting & stress testing) pada proyek game "Eco-Explorer" (folder `TES GITA BARU 1`) untuk mendeteksi potensi bug, inkonsistensi logika, dan ketidakseimbangan sistemik.

Lakukan audit berdasar 5 PILAR UTAMA berikut:

### 1. PILAR 1: KESEIMBANGAN MATEMATIS & KASKADE TROFIK 16 MISI (`js/data/missions.js`)
- Simulasikan logika matematika perputaran harian `tick(S)`, formula kesehatan `health(S)`, efek aksi intervensi `actions[i].fx`, dan kondisi target `targets` untuk seluruh 16 misi (4 Bioma: Sawah, Hutan, Sungai, Laut).
- Deteksi apakah ada misi yang **unwinnable (secara matematis mustahil mencapai target kesehatan ≥ 75% sebelum batas hari)** seperti kasus pohon rimba pada `hutan-4` sebelumnya.
- Verifikasi apakah ada parameter populasi/krisis yang mengalami *infinite bleed* (berkurang terus tanpa bisa dipulihkan) atau *stuck loop*.

### 2. PILAR 2: AUDIO & PIPELINE VOICE-OVER (`js/audio.js` & `voice-over/`)
- Periksa konsistensi 72 berkas MP3 vokal `Kakak Gita` di folder `voice-over/` terhadap seluruh pemanggilan `playVO()` di seluruh scene game.
- Pastikan mekanisme failsafe non-intrusive bekerja mulus (tidak ada error `Uncaught AudioError` atau crash jika audio belum selesai dimuat).
- Verifikasi parameter osilator synthesizer Web Audio (`sfx.*`) agar bebas dari *audio pop / clipping / double-trigger*.

### 3. PILAR 3: ERGONOMI LAYAR SENTUH IFP & UI (`js/scenes/*.js`, `index.html`)
- Audit target sentuh (touch targets) seluruh tombol interaktif: apakah memenuhi standar ramah jari anak kelas 5 pada layar sentuh IFP (minimal ≥ 80 × 80 px)?
- Verifikasi ukuran tipografi: pastikan seluruh teks penting terbaca dari bangku belakang kelas (minimal font ≥ 24 px).
- Periksa potensi bug tumpang tindih antarmuka (z-index modal, overflow teks pada layar IFP 1920×1080), serta debounce anti-double-tap (≥ 280ms).

### 4. PILAR 4: VALIDITAS KUIS C2 BLOOM & INTEGRITAS DATA (`js/data/ecosystems.js`, `js/scenes/quiz.js`)
- Validasi apakah setiap kunci jawaban kuis `quiz.ans` (atau opsi pertama) benar-benar selaras dengan konsep sains rantai makanan (Tingkat Kognitif C2 - Memahami Kausalitas).
- Periksa kelengkapan 4 simpul kausalitas rantai makanan pada sesi debriefing.
- Pastikan status penyimpanan LocalStorage (`ProgressManager`) tidak corrupt saat reset atau ganti kelompok.

### 5. PILAR 5: CODE QUALITY & PERFORMANCE (MEMORY & RENDERING)
- Audit potensi **Memory Leaks & Event Listener Accumulation**: pastikan setiap perpindahan layar (`scene.js` / IFP UI swap) melakukan *cleanup* (pembersihan) DOM event listener yang tidak terpakai (seperti `onclick`, `addEventListener`) agar tidak ganda dan menyebabkan FPS drop atau *double-trigger*.
- Verifikasi *Global Variable Pollution*: pastikan state tersentralisasi dengan baik (`G`, `SIM`) dan terbebas dari kebocoran variabel tak terduga (*undeclared variable in global scope*).
- Analisis *Canvas Rendering Bottlenecks*: pastikan siklus *requestAnimationFrame* berjalan stabil di **60 FPS** tanpa terhalang *blocking operations* saat animasi kaskade trofik berjalan.

---

### ⚠️ PROTOKOL EKSEKUSI (WORKFLOW AGENT):
1. **Buat Script Pengujian Headless:** Buat script pengujian mandiri sementara di folder `tests/` jika diperlukan untuk membuktikan anomali secara matematis.
2. **Sajikan Tabel Diagnosis Temuan:** SEBELUM melakukan perubahan pada kode, sajikan laporan temuan bug terstruktur dalam format tabel:
   | No | Pilar | Tingkat Keparahan (Critical/Major/Minor) | File & Baris | Gejala / Indikasi Bug | Akar Masalah Matematis/Teknis | Rekomendasi Solusi |
3. **Minta Konfirmasi:** Tunggu persetujuan pengguna sebelum mengeksekusi perbaikan kode.
4. **Verifikasi & Sinkronisasi Dokumen:** Setelah perbaikan disetujui, jalankan seluruh test suite (`validate_16_missions.js`, `run.js`, `verify_vo_match.js`, `audit_deep_all_pillars.js`) dan sinkronkan dokumen pendamping di folder `docs/` (`PRD_GAME_SKRIPSI.md`, `ROADMAP.md`) sesuai aturan wajib `GEMINI.md`.
```

---

## 🎯 VARIASI PROMPT SPESIFIK (OPTIONAL TRIGGER)

Jika Anda ingin mengaudit bagian tertentu saja, gunakan salah satu variasi di bawah:

### 🔹 Variasi A: Khusus Keseimbangan Misi & Matematika Simulasi
> *"Tolong buatkan script simulasi headless untuk menguji ke-16 misi di `js/data/missions.js` dari Hari 1 hingga batas hari maksimal. Cari tahu misi mana saja yang berpotensi gagal mencapai Target 3 (Kesehatan $\ge 75\%$) meskipun pemain memilih aksi terbaik. Sajikan tabel analisis keseimbangannya!"*

### 🔹 Variasi B: Khusus Ergonomi Layar Sentuh IFP & Tipografi
> *"Tolong audit seluruh file antarmuka di `js/scenes/` dan periksa apakah ada teks dengan ukuran font di bawah 24px atau tombol dengan ukuran di bawah 80×80 px yang berisiko sulit ditekan oleh siswa kelas 5A di layar sentuh IFP. Laporkan file dan baris yang perlu diperbaiki!"*

### 🔹 Variasi C: Khusus Verifikasi Jalur Audio & Voice-Over
> *"Tolong audit pemanggilan audio di `js/audio.js` dan scene-scene permainan. Pastikan seluruh 72 suara Kakak Gita terpanggil pada momen yang tepat tanpa ada delay berlebih atau tumpang tindih dengan efek suara SFX."*

### 🔹 Variasi D: Khusus Audit Performa, Memory Leak & Event Listeners
> *"Tolong jalankan deep inspection pada seluruh file `js/scenes/*.js` untuk mencari kebocoran memori (memory leak) atau penumpukan Event Listener. Analisis bagaimana fungsi `go()` melakukan transisi layar, dan pastikan tidak ada `onclick` yang menumpuk ganda setiap kali layar dirender ulang, agar game berjalan stabil di 60 FPS pada layar IFP."*

---

## 📊 KLASIFIKASI TINGKAT KEPARAHAN BUG (SEVERITY MATRIX)

| Tingkat | Kriteria | Contoh Kasus |
| :--- | :--- | :--- |
| 🔴 **CRITICAL** | Game terhenti, simulasi stuck, target misi secara matematis mustahil dicapai (*unwinnable*), atau layar hitam (*freeze/crash*). | Kasus `hutan-4` lama (kesehatan tertahan di 63% karena pohon tidak bergenerasi). |
| 🟡 **MAJOR** | Fitur berjalan tetapi perilakunya menyimpang, kunci kuis tidak sesuai konsep, audio error / tumpang tindih, atau layout bertabrakan parah di resolusi 1080p. | Kunci kuis C2 salah memetakan predator, audio VO terputus mendadak. |
| 🟢 **MINOR** | Masalah kosmetik, inkonsistensi margin/padding, teks terlalu dekat batas tepi, atau font 22px pada label sekunder. | Padding tombol selisih 4px, tooltip deskripsi sedikit terpotong. |
