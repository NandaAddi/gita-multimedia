# SPESIFIKASI DESAIN: OPTIMASI MENYELURUH CODEBASE ECO-EXPLORER
**Topik:** Optimasi Performa, GC Thrashing, Audio Pooling, Event Listener, & Ergonomi IFP  
**Target Platform:** Layar Sentuh Interactive Flat Panel (IFP 65–86 Inch, 1920×1080) & Tablet/PWA Offline  
**Subjek Uji Coba:** Siswa Kelas 5A SDN Percobaan 2 Malang  
**Tanggal:** 7 Oktober 2026  
**Status:** Validated Design Spec  

---

## 1. Latar Belakang & Tujuan

Berdasarkan hasil investigasi mendalam dan audit performa pada codebase *Eco-Explorer*, ditemukan beberapa titik kritis yang berpotensi menyebabkan *micro-stuttering* (frame drop), lonjakan alokasi memori (*Garbage Collection thrashing*), penumpukan elemen audio di memori, dan inkonsistensi ukuran tipografi pada layar IFP kelas.

Tujuan optimasi ini adalah:
1. Menjamin stabilitas rendering Canvas pada **60 FPS konstan** tanpa *GC jank*.
2. Mengurangi latensi pemutaran audio panduan vokal Gita mendekati **0 ms** dan mengeliminasi *memory churn* melalui mekanisme *Audio Object Pooling*.
3. Mencegah kebocoran memori (*Memory Leak*) dan penggandaan aksi (*double-trigger*) akibat akumulasi DOM event listener saat misi diulang berkali-kali.
4. Menyelaraskan seluruh tipografi antarmuka ke standar ergonomi IFP kelas 5A (**minimal $\ge 24\text{ px}$**).
5. Mempertahankan 100% kompatibilitas dengan 13 berkas suite pengujian otomatis dan arsitektur PWA offline tanpa menambahkan dependensi bundler eksternal.

---

## 2. Arsitektur & Rincian Perubahan Teknis

### 2.1 Pilar 1: Optimasi Canvas Render Loop & Pencegahan GC Thrashing
* **Target File:** [`js/config.js`](file:///d:/SKRIPSI%20GITA/TES%20GITA%20BARU%201/js/config.js), [`js/scenes/team.js`](file:///d:/SKRIPSI%20GITA/TES%20GITA%20BARU%201/js/scenes/team.js), [`js/renderers/backgrounds.js`](file:///d:/SKRIPSI%20GITA/TES%20GITA%20BARU%201/js/renderers/backgrounds.js)
* **Spesifikasi Perubahan:**
  1. **Eviksi FIFO pada `GRADCACHE` (`js/config.js`):**
     - Mengubah fungsi `gradMemo(c, key, mk)`. Jika `GRADCACHE.size >= 300`, hapus entri tertua (`GRADCACHE.delete(GRADCACHE.keys().next().value)`) alih-alih `GRADCACHE.clear()`.
     - Dampak: Cache tetap terisi (>95% hit rate) dan tidak ada lonjakan pembersihan 240+ objek gradien sekaligus.
  2. **Memoize Gradien Podium Maskot (`js/scenes/team.js`):**
     - Pada fungsi `drawPodiumAndMascot()`, gantikan pemanggilan langsung `c.createLinearGradient()` dan `c.createRadialGradient()` dengan helper `LG()` dan `RG()` yang memanfaatkan `GRADCACHE`.
     - Dampak: Menghentikan pembuatan 7.200 objek gradien baru per menit pada layar pemilihan kelompok.
  3. **Pra-Komputasi Nilai Warna Langit (`js/renderers/backgrounds.js`):**
     - Pada `SKY_STOPS`, tambahkan properti numerik RGB yang dipra-kalkulasi sekali saat *bootstrapping*:
       `topRgb: [r, g, b]`, `botRgb: [r, g, b]`.
     - Fungsi `lerpColor()` langsung menginterpolasi angka integer tanpa mengeksekusi `substr(1,2)` dan `parseInt(..., 16)` berulang kali pada siklus siang-malam 60 FPS.

---

### 2.2 Pilar 2: Audio Voice-Over (VO) Object Pooling & Buffer Management
* **Target File:** [`js/audio.js`](file:///d:/SKRIPSI%20GITA/TES%20GITA%20BARU%201/js/audio.js)
* **Spesifikasi Perubahan:**
  1. **Struktur Pool `VO_POOL` (Map):**
     - Membuat Map `const VO_POOL = new Map();` untuk menyimpan dan menggunakan kembali instans `HTMLAudioElement`.
  2. **Mekanisme Daur Ulang:**
     - Pada fungsi `playVO(key, onEnd)`:
       - Cek apakah elemen audio untuk `key` sudah ada di `VO_POOL`.
       - Jika sudah ada: reset `audio.currentTime = 0`, daftarkan callback `onended`, lalu jalankan `audio.play()`.
       - Jika belum ada: buat `new Audio('voice-over/' + key + '.mp3')`, simpan ke `VO_POOL`, lalu putar.
     - Batasi ukuran pool maksimum 40 audio instances. Jika melebihi batas, buang instance terlama dari pool.
  3. **Non-Intrusive Failsafe:**
     - Tetap pertahankan blok `.catch()` ganda (fallback ke path alternatif `assets/audio/vo/` dan hening tanpa lempar error konsol).

---

### 2.3 Pilar 3: Pencegahan Memory Leak & Event Listener Accumulation
* **Target File:** [`js/scenes/simulation.js`](file:///d:/SKRIPSI%20GITA/TES%20GITA%20BARU%201/js/scenes/simulation.js)
* **Spesifikasi Perubahan:**
  1. **Idempotent Stat Row Listener:**
     - Pada `js/scenes/simulation.js` baris 228: Ubah penambahan `el('#stat-rows').addEventListener('click', ...)` menjadi penugasan `.onclick`:
       ```javascript
       el('#stat-rows').onclick = e => {
         const r = e.target.closest('.srow');
         if (!r || !SIM) return;
         const s = SIM.m.stats.find(x => x[0] === r.dataset.k);
         if (s) { sfx.pop(); toast('<b>' + s[1] + '</b> — ' + s[4], 3600); }
       };
       ```
     - Dampak: Saat pemain mengulang misi (*Retry*), hanya ada tepat 1 handler aktif, menghilangkan bug *toast / sfx multiplication*.

---

### 2.4 Pilar 4: Standarisasi Ergonomi Tipografi IFP & Anti-Double-Tap
* **Target File:** [`js/audio.js`](file:///d:/SKRIPSI%20GITA/TES%20GITA%20BARU%201/js/audio.js), [`js/scenes/mission-menu.js`](file:///d:/SKRIPSI%20GITA/TES%20GITA%20BARU%201/js/scenes/mission-menu.js), [`js/scenes/quiz.js`](file:///d:/SKRIPSI%20GITA/TES%20GITA%20BARU%201/js/scenes/quiz.js), [`js/scenes/simulation.js`](file:///d:/SKRIPSI%20GITA/TES%20GITA%20BARU%201/js/scenes/simulation.js)
* **Spesifikasi Perubahan:**
  1. **Penyesuaian Font Minimal $\ge 24\text{ px}$:**
     - `js/audio.js`: Tingkatkan label modal audio dari 20px menjadi **24px**.
     - `js/scenes/mission-menu.js`: Tingkatkan teks target misi dari 22px menjadi **24px**.
     - `js/scenes/quiz.js`: Tingkatkan teks hint kuis dari 18px menjadi **24px**.
     - `js/scenes/simulation.js`: Tingkatkan teks penjelas HUD/Bridge dari 16–18px menjadi **24px** (dengan layout flex responsif yang rapi).
  2. **Debounce Sentuhan:**
     - Pastikan fungsi navigasi dan tombol aksi utama memiliki debounce $\ge 280\text{ ms}$ untuk mencegah sentuhan tidak sengaja (*accidental double-tap*) oleh siswa kelas 5 pada layar sentuh IFP.

---

## 3. Rencana Pengujian & Verifikasi

Sebelum menyatakan optimasi selesai, serangkaian pengujian headless otomatis harus dijalankan dan lulus 100%:
1. `node tests/run.js` (Memastikan seluruh 34 tes fungsional dasar lolos).
2. `node tests/audit_ifp_ui.js` (Memverifikasi 0 font di bawah 24px dan proteksi debounce terpenuhi).
3. `node tests/audit_audio_and_vo.js` (Memverifikasi integritas 72 berkas MP3 dan player non-intrusive).
4. `node tests/verify_touchscreen_ifp.js` (Memverifikasi seluruh 30 aturan ergonomi layar sentuh IFP lolos).
5. `node tests/audit_deep_all_pillars.js` (Memverifikasi stabilitas seluruh 16 misi ekosistem).

---

## 4. Sinkronisasi Dokumen Skripsi

Sesuai aturan wajib penelitian pada `GEMINI.md`:
1. Perbarui [`docs/PRD_GAME_SKRIPSI.md`](file:///d:/SKRIPSI%20GITA/docs/PRD_GAME_SKRIPSI.md) pada Bagian 3 (Spesifikasi Ergonomi IFP & Standar Tipografi) dan Bagian 9 (Pipeline Audio & Optimasi Memori Canvas).
2. Perbarui [`docs/ROADMAP.md`](file:///d:/SKRIPSI%20GITA/docs/ROADMAP.md) untuk mencatat penyelesaian milestone optimasi performa dan kesiapan media versi rilis Alpha/Beta IFP.
