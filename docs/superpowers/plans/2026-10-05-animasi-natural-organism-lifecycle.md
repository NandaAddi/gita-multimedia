# Rencana Implementasi: Animasi Natural In & Out Organisme Ekosistem (4 Bioma)

> **Untuk Pekerja Agentik:** SUB-SKILL WAJIB: Gunakan `superpowers:subagent-driven-development` (direkomendasikan) atau `superpowers:executing-plans` untuk mengeksekusi rencana ini tugas demi tugas. Setiap langkah menggunakan checkbox (`- [ ]`) untuk pelacakan progres.

**Tujuan:** Menggantikan pemunculan/penghilangan objek instan (abrupt pop) dengan sistem *Organism Lifecycle State Machine* alami (tunas bertumbuh, hewan masuk/kabur lincah, tanaman melayu terkulai saat keracunan/kekeringan) berdurasi ~1.0–1.8 detik yang didukung efek audio sintetis Web Audio pada 4 bioma (Sawah, Hutan, Sungai, Laut).

**Arsitektur:** 
1. `js/audio.js`: Menambahkan fungsi synthesizer Web Audio prosedural `sfx.grow()`, `sfx.flee()`, dan `sfx.wither()`.
2. `js/renderers/backgrounds.js`: Menyediakan modul `OrganismPool` di dalam state simulasi `S._orgPool` yang melacak siklus hidup setiap instans entitas (`spawning`, `alive`, `withering`, `fleeing`).
3. Modul perender 4 bioma mengonsumsi progress animasi entitas untuk rendering dinamis (scale tunas, droop angle, rotasi layu, tint warna cokelat, dan vektor gerak kabur).
4. `tests/run.js`: Pengujian regresi otomatis siklus hidup pool dan pembersihan memori.
5. `docs/`: Sinkronisasi PRD dan Roadmap R&D skripsi.

**Tech Stack:** HTML5 2D Canvas, Web Audio API, Vanilla JavaScript (ES6+), Node.js (test runner).

**Spec:** Hasil kesepakatan sesi wawancara mendalam `/grill-me` (2026-10-05).

## Global Constraints

- **Frame Rate & Resolusi IFP:** Tetap locked pada 60 FPS pada kanvas virtual 1920x1080 tanpa memory leak (entitas mati wajib di-prune dari pool).
- **Prinsip Pedagogis (Mayer CTML & Piaget C2):** Perubahan visual harus jelas teramati oleh seluruh siswa kelas 5 dari jarak meja kelas (durasi 1.0–1.8 detik).
- **Zero Third-Party Dependencies:** Seluruh animasi, interpolasi ease, dan audio disintesis secara native (Vanilla JS murni & Web Audio API).

---

### Task 1: Web Audio Synthesis untuk Lifecycle Organisme (`js/audio.js`)

**Files:**
- Modify: `TES GITA BARU 1/js/audio.js:80-90`
- Test: `TES GITA BARU 1/tests/run.js`

**Interfaces:**
- Produces:
  - `sfx.grow()`: Nada arpeggio naik lembut (tunas mekar / organisme baru lahir)
  - `sfx.flee()`: Nada desiran langkah lincah (hewan kabur ke semak)
  - `sfx.wither()`: Nada glissando melandai turun (tanaman layu / organisme lemas)

- [ ] **Step 1: Tulis unit test untuk verifikasi sfx baru di test harness**

Tambahkan uji eksistensi dan eksekusi fungsi `sfx.grow`, `sfx.flee`, `sfx.wither` pada `tests/run.js`.

- [ ] **Step 2: Jalankan test harness untuk memastikan test gagal**

Run: `node tests/run.js`
Expected: FAIL (fungsi belum ada di `sfx`).

- [ ] **Step 3: Implementasikan fungsi synthesizer di `js/audio.js`**

Tambahkan method di objek `sfx`:
```javascript
  grow() {
    [523, 659, 784, 1046].forEach((f, i) => tone(f, 0.28, 'sine', 0.05, i * 0.08));
  },
  flee() {
    tone(700, 0.08, 'triangle', 0.04);
    tone(850, 0.08, 'triangle', 0.04, 0.07);
    tone(1000, 0.1, 'triangle', 0.03, 0.14);
  },
  wither() {
    tone(440, 0.35, 'sawtooth', 0.03);
    tone(370, 0.4, 'sawtooth', 0.03, 0.12);
    tone(293, 0.45, 'sine', 0.04, 0.26);
  }
```

- [ ] **Step 4: Jalankan test harness untuk memastikan test lolos**

Run: `node tests/run.js`
Expected: PASS

---

### Task 2: Arsitektur Organism State Machine & Pool Lifecycle Tracker (`js/renderers/backgrounds.js`)

**Files:**
- Modify: `TES GITA BARU 1/js/renderers/backgrounds.js:45-55`
- Test: `TES GITA BARU 1/tests/run.js`

**Interfaces:**
- Produces:
  - `initOrganismPool(S)`: Inisialisasi pool penampung entitas di state `S`.
  - `syncOrganismPool(S, key, targetCount, factoryFn, options)`: Sinkronisasi jumlah target dengan entitas aktif, memicu transisi `spawning`, `withering` (jika racun/kering/panas), atau `fleeing`.
  - `updateOrganismPool(S, dt)`: Mengupdate progress (0 $\to$ 1) dan membersihkan entitas mati (`dead`).

- [ ] **Step 1: Tulis unit test logika State Machine OrganismPool**

Verifikasi bahwa saat target naik, entitas baru berstatus `'spawning'`, saat target turun dengan kondisi racun berstatus `'withering'`, dan saat target turun normal berstatus `'fleeing'`.

- [ ] **Step 2: Jalankan test untuk memverifikasi kegagalan**

Run: `node tests/run.js`
Expected: FAIL (`initOrganismPool is not defined`).

- [ ] **Step 3: Implementasikan OrganismPool di `js/renderers/backgrounds.js`**

Struktur entitas:
```javascript
{
  id: String,
  type: String,
  state: 'spawning' | 'alive' | 'withering' | 'fleeing',
  progress: 0.0, // 0 to 1
  duration: Number, // durasi transisi ms
  x: Number,
  y: Number,
  targetX: Number,
  targetY: Number,
  scale: Number,
  wither: Number, // 0 (segar) to 1 (cokelat terkulai)
  seed: Number
}
```

- [ ] **Step 4: Jalankan test untuk memverifikasi kelulusan logika pool**

Run: `node tests/run.js`
Expected: PASS

---

### Task 3: Integrasi Animasi Natural Bioma Sawah (`js/renderers/backgrounds.js`)

**Files:**
- Modify: `TES GITA BARU 1/js/renderers/backgrounds.js:55-97` (`sceneSawah`)

**Perilaku Entitas Sawah:**
1. **Padi (`spRice`):**
   - Saat bertambah: Tunas tumbuh perlahan ke atas (scaleY 0.1 $\to$ 1.0), warna bermula hijau muda cerah lalu matang.
   - Saat berkurang karena racun/kering: Menguning/kecokelatan, terkulai miring 35 derajat ke bawah secara anggun, lalu meluruh.
2. **Tikus (`spMouse`):**
   - Saat bertambah: Muncul berlari pelan dari tepi pematang sawah menuju posisinya.
   - Saat berkurang normal (dimangsa ular): Lari kencang keluar kanvas sambil memicu `sfx.flee()`.
   - Saat berkurang karena racun pestisida: Lemas di tempat, berkedip, lalu terbaring.
3. **Katak (`spFrog`) & Ular (`spSnake`):**
   - Katak melompat masuk dari pematang; saat kabur melompat ke luar layar menuju semak tepi.
   - Ular meliuk masuk dari semak; saat berkurang meliuk cepat menghilang ke rerumputan tepi.

- [ ] **Step 1: Terapkan rendering berbasis OrganismPool di `sceneSawah`**
- [ ] **Step 2: Jalankan pengujian visual di browser & tes suite**
Run: `node tests/run.js`
Expected: PASS

---

### Task 4: Integrasi Animasi Natural Bioma Hutan, Sungai, & Laut (`js/renderers/backgrounds.js`)

**Files:**
- Modify: `TES GITA BARU 1/js/renderers/backgrounds.js:98-205` (`sceneHutan`, `sceneSungai`, `sceneLaut`)

**Perilaku Entitas:**
1. **Hutan:**
   - **Pohon (`treeDraw`):** Tumbuh dari bibit pohon kecil bertahap menjadi pohon rimbun; saat deforestasi/kebakaran melayu cokelat lalu rebah.
   - **Rusa (`spDeer`):** Melangkah masuk dari rimbun pepohonan; saat perburuan/kabur berlari cepat melintasi hutan ke balik semak.
   - **Harimau (`spTiger`):** Mengendap masuk; saat berkurang berjalan mundur ke hutan lebat.
2. **Sungai:**
   - **Gulma/Eceng Gondok (`gulmaPatch`):** Muncul mengapung membesar; saat dibersihkan menyusut dan tenggelam.
   - **Ikan Sungai (`spFish`):** Berenang masuk dari hulu; saat limbah/racun berenang miring terkulai; saat normal berenang cepat ke hilir.
   - **Bangau (`spStork`):** Mendarat dari atas; saat kabur mengepakkan sayap terbang ke atas kanvas.
3. **Laut:**
   - **Karang (`spCoral`, `spFan`):** Tumbuh mekar bertahap; saat suhu naik mengalami *coral bleaching* (berubah putih pucat lalu meluruh).
   - **Ikan Karang (`spFish`):** Berenang masuk berkelompok; saat predator mendekat berenang kocar-kacir ke balik karang.
   - **Hiu & Penyu (`spShark`, `spTurtle`):** Meluncur anggun masuk dari samudra lepas; saat berkurang berenang menjauh ke kedalaman biru.

- [ ] **Step 1: Terapkan OrganismPool pada `sceneHutan`, `sceneSungai`, dan `sceneLaut`**
- [ ] **Step 2: Jalankan pengujian regresi di Node.js**
Run: `node tests/run.js`
Expected: PASS

---

### Task 5: Validasi Kinerja IFP & Automated Test Suite (`tests/run.js`)

**Files:**
- Modify: `TES GITA BARU 1/tests/run.js`

- [ ] **Step 1: Tambahkan pengujian performa 60 frame continuous simulation**
Memastikan bahwa setelah 300 frame simulasi dengan variasi aksi in/out, tidak ada memory leak di dalam pool dan seluruh entitas yang mati dibersihkan secara sempurna.
- [ ] **Step 2: Jalankan seluruh test suite**
Run: `node tests/run.js`
Expected: Semua test (19+) lolos 100%.

---

### Task 6: Sinkronisasi Dokumen Pendamping Skripsi (`docs/`)

**Files:**
- Modify: `docs/PRD_GAME_SKRIPSI.md`
- Modify: `docs/ROADMAP.md`

- [ ] **Step 1: Perbarui PRD Game Skripsi**
Tambahkan sub-bab baru di Bagian 5 (Core Gameplay Loop & Feedback Multimedia):
- *"5.4 Sistem Animasi Natural Organisme Berbasis State Machine (Prinsip Mayer CTML & Teori Piaget Operasional Konkret untuk Penguatan Hubungan Kausalitas C2)"*.
- [ ] **Step 2: Perbarui Roadmap Riset Skripsi**
Catat milestone implementasi animasi natural in/out pada Pekan 11 (Perbaikan Media & Kesiapan Uji Coba Lapangan).
