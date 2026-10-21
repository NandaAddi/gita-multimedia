# DESAIN SPESIFIKASI: OPTIMASI MENYELURUH 6 PILAR GAME ECO-EXPLORER (IFP 60 FPS)

* **Tanggal:** 21 Oktober 2026
* **Status:** Draft / Menunggu Review Pengguna
* **Peneliti/Pengembang:** Gita (Eco-Explorer)
* **Target Platform:** Layar Sentuh *Interactive Flat Panel* (IFP 65"/75"/86") Kelas 5A SDN Percobaan 2 Malang & PWA Offline

---

## 1. Ringkasan Eksekutif & Tujuan

Berdasarkan wawancara terstruktur perancangan (*Grill-Me Architectural Session*), optimasi sistem *Eco-Explorer* dirancang secara menyeluruh melingkupi **6 Pilar Arsitektur Sistem**. Tujuan utama proyek optimasi ini adalah memastikan game berjalan pada **60 FPS stabil tanpa micro-stutter (GC pause)**, memiliki **siklus hidup memori bebas bocor (*zero memory leak*)**, menyajikan **interaksi audio instan tanpa glitch/popping**, mengoptimalkan **ergonomi layar sentuh IFP untuk siswa SD kelas 5**, menjamin **ketersediaan 100% offline via PWA**, serta memelihara **integritas beban kognitif Mayer CTML dan keseimbangan matematis simulasi kausalitas C2**.

Eksekusi dijalankan dengan pendekatan **Pilar-per-Pilar (1 sampai 6)** di mana setiap pilar diverifikasi langsung dengan *headless automated test suite* sebelum berlanjut ke pilar berikutnya.

---

## 2. Rincian Teknis 6 Pilar Optimasi

### 2.1 PILAR 1: Rendering Canvas 2D & Stabilitas 60 FPS
* **Target File:** [`js/renderers/characters.js`](file:///d:/SKRIPSI%20GITA/js/renderers/characters.js), [`js/renderers/backgrounds.js`](file:///d:/SKRIPSI%20GITA/js/renderers/backgrounds.js), [`js/config.js`](file:///d:/SKRIPSI%20GITA/js/config.js).
* **Masalah Teridentifikasi:** Masih terdapat sedikitnya 15 titik pemanggilan gradien mentah (`c.createLinearGradient(...)`) di dalam fungsi render frame (misal: kanopi pohon rimba, lumpur sawah, kabut lembah, pantulan air) yang memicu alokasi memori berulang di loop 60 FPS.
* **Solusi & Spesifikasi:**
  1. **Full Gradient Memoization:** Gantikan seluruh pemanggilan mentah `createLinearGradient` dan `createRadialGradient` dengan helper memoized `LG()` dan `RG()` yang terhubung ke `GRADCACHE` (FIFO eviction kapasitas 300).
  2. **Zero Object Allocation:** Hindari instansiasi objek sementara (`{}`), array baru (`[]`), atau string parsing hex di dalam per-frame draw loop. Gunakan variabel koordinat terdefinisi statis dan parameter reusable.
  3. **Path Batching & Call Merging:** Satukan instruksi `beginPath()`, `fill()`, dan `stroke()` pada geometri statis (pematang terasering, siluet gunung, bebatuan sungai) untuk meminimalkan beban draw call pada GPU/CPU bawaan IFP.
* **Kriteria Keberhasilan:** DevTools zero new allocation per frame; `node tests/test_canvas_opt.js` 100% PASS; FPS $\ge 58$ FPS stabil.

---

### 2.2 PILAR 2: Siklus Hidup Memori, DOM Cleanup & Idempotensi Listener
* **Target File:** [`js/state.js`](file:///d:/SKRIPSI%20GITA/js/state.js), [`js/scenes/*.js`](file:///d:/SKRIPSI%20GITA/js/scenes/), [`js/main.js`](file:///d:/SKRIPSI%20GITA/js/main.js).
* **Masalah Teridentifikasi:** Peralihan scene melalui `go(id)` saat ini hanya menukar kelas CSS `.active` dan menghentikan sequence Gita tertentu, tanpa protokol unmount baku untuk membersihkan timer, animasi rAF lokal, atau delegasi event scene sebelumnya.
* **Solusi & Spesifikasi:**
  1. **Arsitektur `SCENE_CLEANUP` Terpusat:**
     Tambahkan objek registry `SCENE_CLEANUP = {}` pada `js/state.js`. Setiap scene dapat mendaftarkan fungsi `cleanup()` miliknya:
     ```javascript
     // Saat applyScreenSwitch(newId) dijalankan:
     if (CUR && typeof SCENE_CLEANUP[CUR] === 'function') {
       try { SCENE_CLEANUP[CUR](); } catch(e) { console.warn('[Cleanup]', e); }
     }
     ```
  2. **Pembersihan Komprehensif per Scene:**
     - `simulation.js`: Menghapus interval timer simulasi, membersihkan modal CSCL/Tips yang terbuka, mereset pointer/drag state, dan mengosongkan kontainer dinamis `#sim-ui`.
     - `team.js`, `biome.js`, `mission-menu.js`: Menghentikan rAF preview/animasi lokal dan me-reset indeks slider.
  3. **Idempotent Event Binding:** Seluruh tombol interaktif menggunakan penugasan `.onclick = ...` atau delegasi kontainer induk untuk mencegah akumulasi listener saat fungsi pembangun (`build*()`) dipanggil berkali-kali.
* **Kriteria Keberhasilan:** Uji navigasi bolak-balik 30 transisi scene tidak menunjukkan penumpukan interval timer atau kebocoran memori heap browser (`node tests/test_listener_idempotency.js` PASS).

---

### 2.3 PILAR 3: Pipeline Audio, Voice-Over Pooling & Sintesis Bebas Letupan
* **Target File:** [`js/audio.js`](file:///d:/SKRIPSI%20GITA/js/audio.js), [`js/scenes/*.js`](file:///d:/SKRIPSI%20GITA/js/scenes/).
* **Masalah Teridentifikasi:** 
  1. Fungsi fallback `_getVOFallback(key)` menduplikasi jalur file primer (`assets/audio/voice-over/`) yang menghasilkan duplikasi instans objek `Audio` di `VO_POOL` di bawah prefiks `fb_`.
  2. Terdapat 11 file VO orphan yang belum terintegrasi ke dalam game (`vo_title_welcome`, `vo_sim_danger`, `vo_sim_fail_health`, `vo_victory_cheer`, dll.).
* **Solusi & Spesifikasi:**
  1. **Koreksi Rute Fallback:**
     Perbaiki `_getVOFallback(key)` agar menunjuk ke jalur alternatif riil (`assets/audio/vo/` jika ada) atau gunakan instans primer secara cerdas tanpa menciptakan duplikasi instance identik di memori.
  2. **Integrasi File VO Orphan:**
     - Mainkan `vo_title_welcome` saat siswa pertama kali menekan tombol mulai di layar judul (atau saat transisi ke pemilihan tim).
     - Mainkan `vo_sim_danger` saat kesehatan ekosistem merosot ke zona bahaya (< 40%).
     - Mainkan `vo_sim_fail_health` / `vo_sim_fail_time` saat simulasi gagal mencapai target.
     - Mainkan `vo_victory_cheer` saat selebrasi kemenangan bintang.
  3. **Web Audio Zero-Clamping:**
     Pastikan seluruh gain node pada sintesis SFX (`tone`, `noiseHit`, `sfx.grow`, `sfx.flee`, `sfx.wither`, `sfx.spray`) diinisialisasi pada `gain.value = 0` dan di-clamp kembali ke 0 sebelum cut-off osilator untuk meniadakan suara popping/clicking.
* **Kriteria Keberhasilan:** `node tests/test_audio_pool.js` PASS; `node tests/audit_audio_and_vo.js` menunjukkan 0 duplikasi rute & aktivasi VO yang tepat; latensi sentuhan audio $< 30\text{ ms}$.

---

### 2.4 PILAR 4: Ergonomi Layar Sentuh IFP & Ketahanan Gestur
* **Target File:** [`css/game.css`](file:///d:/SKRIPSI%20GITA/css/game.css), [`js/scenes/simulation.js`](file:///d:/SKRIPSI%20GITA/js/scenes/simulation.js), [`js/main.js`](file:///d:/SKRIPSI%20GITA/js/main.js).
* **Masalah Teridentifikasi:** Tombol bilah atas (`.tb-btn`, tombol fullscreen, tombol suara) memiliki tinggi 60px yang relatif kecil untuk jari siswa SD kelas 5 pada layar IFP 75"-86", serta risiko salah sentuh telapak tangan (*palm touch*).
* **Solusi & Spesifikasi:**
  1. **Perluasan Hit-Area Hibrida:**
     Tingkatkan ukuran visual `.tb-btn` menjadi $72\text{ px}$ tinggi dengan padding proporsional, serta berikan pseudo-element ekspansi sentuh:
     ```css
     .tb-btn::after {
       content: '';
       position: absolute;
       inset: -10px; /* Memperluas area sentuh efektif menjadi >= 80x80 px */
     }
     ```
  2. **Debounce Sentuhan Seragam ($\ge 280\text{ ms}$):**
     Terapkan pembatasan waktu debounce taktil global pada seluruh klik tombol navigasi dan kartu aksi simulasi.
  3. **Single Active Pointer Lock (Palm Rejection):**
     Pastikan kanvas dan dock interaktif mengunci pointer aktif pertama (`pointerId`) dan mengabaikan pointer sekunder/tersier saat telapak tangan anak bertumpu pada layar kaca IFP.
  4. **Proteksi Gestur Browser:** Terapkan `touch-action: manipulation` pada seluruh tombol UI dan `touch-action: none` pada elemen drag/slider.
* **Kriteria Keberhasilan:** `node tests/audit_ifp_ui.js` dan `node tests/verify_touchscreen_ifp.js` 100% PASS; target sentuh efektif $\ge 80 \times 80\text{ px}$.

---

### 2.5 PILAR 5: Efisiensi Waktu Muat (Load Time), PWA & Service Worker
* **Target File:** [`sw.js`](file:///d:/SKRIPSI%20GITA/sw.js), [`manifest.json`](file:///d:/SKRIPSI%20GITA/manifest.json), [`index.html`](file:///d:/SKRIPSI%20GITA/index.html).
* **Masalah Teridentifikasi:** Versi Service Worker di `sw.js` masih tertinggal pada `v1.3.4`, belum meng-cache 42 frame WebP animasi transisi loading (`gita_load_001.webp` s/d `042.webp`), dan query string versi di `index.html` perlu diselaraskan.
* **Solusi & Spesifikasi:**
  1. **Peningkatan Versi Cache PWA:**
     Naikkan cache version ke `eco-explorer-v1.4.0` pada `sw.js`.
  2. **Precache Aset Transisi Loading:**
     Daftarkan seluruh berkas frame WebP transisi loading screen (`assets/animations/loading/gita_load_001.webp` s/d `gita_load_042.webp`) ke dalam array `PRECACHE_ASSETS` di `sw.js` agar transisi antar-scene 100% instan dan bebas lag saat offline di sekolah.
  3. **Penyelarasan Cache Buster:**
     Perbarui parameter versi skrip dan stylesheet di `index.html` menjadi `?v=1.4.0`.
* **Kriteria Keberhasilan:** Service worker aktif meng-cache 100% modul; game dapat diluncurkan secara instan dalam mode offline total (*airplane mode*).

---

### 2.6 PILAR 6: Keseimbangan Simulasi & Integritas Pedagogis (Mayer CTML & CSCL)
* **Target File:** [`js/data/missions.js`](file:///d:/SKRIPSI%20GITA/js/data/missions.js), [`js/scenes/simulation.js`](file:///d:/SKRIPSI%20GITA/js/scenes/simulation.js), [`js/scenes/quiz.js`](file:///d:/SKRIPSI%20GITA/js/scenes/quiz.js).
* **Masalah Teridentifikasi:**
  Pada pengujian headless berdurasi panjang, misi `sungai-1` menunjukkan *Infinite Bleed* (pertumbuhan gulma eceng gondok terus bertambah tanpa batas jenuh alami sehingga kesehatan anjlok ke 0 jika aksi habis pada hari-hari akhir).
* **Solusi & Spesifikasi:**
  1. **Stabilisasi Matematis `sungai-1`:**
     Sesuaikan dinamika pertumbuhan gulma dan oksigen pada `tick(S)` di `sungai-1`:
     - Tambahkan perlambatan laju pertumbuhan gulma saat mendekati batas jenuh atau saat air mulai bersih.
     - Berikan regenerasi oksigen alami moderat saat gulma terkendali ($\le 18$) sehingga ekosistem mencapai titik ekuilibrium yang stabil dan tidak mengalami *infinite bleed*.
  2. **Pacing Animasi Kausalitas C2 (Mayer CTML):**
     Pastikan durasi animasi feedback kaskade trofik (tunas tumbuh, pelayuan hama, semprotan aerosol) berkisar antara **1.2 – 2.0 detik**, memberikan waktu yang cukup bagi siswa kelas 5 untuk mengamati relasi sebab-akibat tanpa membuat simulasi terasa lamban.
  3. **Pacing Musyawarah CSCL:**
     Verifikasi timer kartu voting musyawarah 15 detik berjalan stabil dengan indikator visual ramah anak.
* **Kriteria Keberhasilan:** `node tests/audit_deep_all_pillars.js` menghasilkan **0 CRITICAL** dan **0 INFINITE BLEED** pada seluruh 16 misi Nusantara; `node tests/validate_16_missions.js` 100% PASS.

---

## 3. Rencana Pengujian Otomatis & Verifikasi

Setiap pilar akan diuji secara headless dan terisolasi:

| Pilar | Target Pengujian | Perintah Verifikasi |
| :--- | :--- | :--- |
| **Pilar 1** | Canvas memoization, gradien memoize, zero allocation | `node tests/test_canvas_opt.js` & `node tests/run.js` |
| **Pilar 2** | Lifecycle cleanup hook, zero leak memory | `node tests/test_listener_idempotency.js` |
| **Pilar 3** | Audio pool map, fallback fix, zero popping | `node tests/test_audio_pool.js` & `node tests/audit_audio_and_vo.js` |
| **Pilar 4** | IFP UI touch target $\ge 80\text{ px}$, font $\ge 24\text{ px}$, debounce | `node tests/audit_ifp_ui.js` & `node tests/verify_touchscreen_ifp.js` |
| **Pilar 5** | Service worker precache offline & version bump | `node tests/test_preloader_splash.js` |
| **Pilar 6** | Keseimbangan 16 misi (zero bleed), validasi kuis C2 | `node tests/audit_deep_all_pillars.js` & `node tests/validate_16_missions.js` |
| **Regresi Global** | Seluruh 34+ unit test inti | `node tests/run.js` |

---

## 4. Protokol Sinkronisasi Dokumen Pendamping Skripsi (Wajib `GEMINI.md`)

Sebelum sesi kerja berakhir, asisten wajib menyinkronkan dokumen pendamping berikut:
1. **`docs/PRD_GAME_SKRIPSI.md`**: Memperbarui spesifikasi teknis arsitektur 6 pilar, tabel performa sistem IFP, dan siklus hidup `SCENE_CLEANUP`.
2. **`docs/ROADMAP.md`**: Menambahkan entri implementasi Pekan 11 (Poin 33: Optimasi Menyeluruh 6 Pilar Sistem IFP) dan memperbarui status kesiapan media Beta/Final.
3. **`docs/PROMPT_OPTIMASI_GAME.md`**: Menandai pencapaian seluruh target KPI pada tabel parameter metrik keberhasilan.
