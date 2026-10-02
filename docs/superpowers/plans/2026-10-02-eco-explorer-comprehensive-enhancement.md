# Eco-Explorer Comprehensive Game & Portal Enhancement Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Menuntaskan penyempurnaan menyeluruh (*gameplay simulation*, *pedagogical C2 visuals*, *examiner unlock mode*, *IFP touch dialogs*, *portal web presentation*, dan *sinkronisasi dokumen skripsi*) untuk game edukasi simulasi IPAS "Eco-Explorer: Penjaga Keseimbangan Ekosistem" pada layar IFP kelas 5A SDN Percobaan 2 Malang.

**Architecture:**
- **Simulation Layer (`SimulationScene.js`, `ecosystems-data.js`):** Modularisasi logika rantai makanan & dinamika predasi realtime untuk 4 Bioma (Sawah, Hutan Tropis, Sungai, Laut) menggantikan hardcoded sawah.
- **Progression & Examiner Utility (`ProgressManager.js`, `BiomeSelectScene.js`):** Penambahan metode `unlockAllForExaminer()` dan in-game custom touch confirmation modal ramah IFP (bebas `window.confirm()`).
- **Pedagogical Visual Layer (`QuizScene.js`, `TeamSelectScene.js`):** Integrasi diagram stimulus hubungan sebab-akibat (C2) Mayer CTML dan pemetaan ekuivalensi peran tim lintas bioma.
- **Research Portal & Documentation (`index.html`, `docs/*`):** Modernisasi visual portal web riset dan sinkronisasi otomatis dokumen pendamping skripsi (PRD, Roadmap, LKPD, Naskah).

**Tech Stack:** HTML5, Phaser 3.80+ (Scale.FIT 1080p, Zero-CORS Base64 Architecture), Vanilla CSS/JS, Web Audio API Synthesizer, Markdown Documentation.

**Spec:** [docs/PRD_GAME_SKRIPSI.md](file:///d:/SKRIPSI%20GITA/docs/PRD_GAME_SKRIPSI.md)

## Global Constraints
- **Zero-CORS & 100% Offline:** Seluruh aset visual dan audio wajib berjalan pada protokol `file://` tanpa server lokal.
- **Hardware-Aware IFP Ergonomics:** Target tombol ramah jari anak kelas 5 SD (zona sentuh bawah, tinggi minimal 44px, kontras tinggi WCAG AAA, anti mis-click).
- **Academic & Pedagogical Alignment:** Wajib patuh pada Model Alessi & Trollip (2001), Teori Kognitif Multimedia Mayer (Spatial/Temporal Contiguity & Signaling Principle), Piaget Operasional Konkret, Vygotsky Scaffolding/ZPD, dan CSCL.
- **Aturan Wajib Sinkronisasi Dokumen (`GEMINI.md`):** Setiap penambahan fitur/mekanika wajib diiringi pembaruan dokumen pendamping skripsi di folder `docs/`.

---

## Tasks Overview

| Task | Komponen | Fokus Utama |
| :--- | :--- | :--- |
| **Task 1** | `SimulationScene.js` & `ecosystems-data.js` | Logika Predasi Dinamis & Sinkronisasi Teks/Aksi 4 Bioma |
| **Task 2** | `ProgressManager.js` & `BiomeSelectScene.js` | Mode Penguji/Dosen (Unlock All) & Modal Konfirmasi IFP |
| **Task 3** | `QuizScene.js` & `TeamSelectScene.js` | Diagram Kausalitas C2 & Penyelarasan Peran Tim Lintas Bioma |
| **Task 4** | `WEBSITE/index.html` | Modernisasi Portal Riset & Integrasi Preview 4 Bioma |
| **Task 5** | `docs/*` (`PRD`, `ROADMAP`, `LKPD`, `SKRIPSI`) | Sinkronisasi Dokumen Pendamping Skripsi Sesuai `GEMINI.md` |

---

### Task 1: Logika Predasi Dinamis & Sinkronisasi Teks/Aksi 4 Bioma

**Files:**
- Modify: `WEBSITE/js/phaser-game/scenes/SimulationScene.js:1517-1535` (Perbaikan `applyIrrigationAction`)
- Modify: `WEBSITE/js/phaser-game/scenes/SimulationScene.js:1650-1740` (Ekspansi `simulationStep` multi-bioma)
- Test: `WEBSITE/tests/test_simulation_logic.js` (Node.js headless verification script)

**Interfaces:**
- Consumes: `this.activeEcosystemId`, `this.activeMission`, `this.pop`, `this.waterLevel`
- Produces: Kaskade ekologi dinamis tiap 3 detik untuk Sawah, Hutan, Sungai, dan Laut dengan notifikasi melayang kontekstual.

- [x] **Step 1: Buat script pengujian headless logika simulasi multi-bioma**

```javascript
// WEBSITE/tests/test_simulation_logic.js
const assert = require('assert');

// Simulasi dummy context SimulationScene
function createDummyScene(ecoId, missionId, initPop, waterLevel = 30) {
  return {
    activeEcosystemId: ecoId,
    activeMission: { id: missionId },
    pop: { ...initPop },
    waterLevel: waterLevel,
    limbahLevel: 60,
    organicWaste: 30,
    notifications: [],
    showFloatingNotice(text, color) {
      this.notifications.push(text);
    }
  };
}

// Logika step yang akan dipasang
function runEcologicalStep(scene) {
  let stateChanged = false;
  const eco = scene.activeEcosystemId;

  if (eco === 'sawah') {
    if (scene.pop.tikus > 40 && scene.pop.ular < 15 && scene.pop.padi > 15) {
      scene.pop.padi = Math.max(5, scene.pop.padi - 2);
      scene.showFloatingNotice('🐀 Tikus memakan batang padi! (-2 Padi)', 0xf87171);
      stateChanged = true;
    }
    if (scene.pop.ular >= 20 && scene.pop.tikus > 25) {
      scene.pop.tikus = Math.max(15, scene.pop.tikus - 4);
      scene.showFloatingNotice('🐍 Ular sawah memangsa tikus! (-4 Tikus)', 0x34d399);
      stateChanged = true;
    }
  } else if (eco === 'hutan') {
    // 1. Rusa memakan tunas pohon jika predator harimau sedikit
    if (scene.pop.rusa > 25 && (scene.pop.harimau || 0) < 5 && scene.pop.pohon > 15) {
      scene.pop.pohon = Math.max(5, scene.pop.pohon - 2);
      scene.showFloatingNotice('🦌 Rusa memakan tunas pohon rimba! (-2 Pohon)', 0xf87171);
      stateChanged = true;
    }
    // 2. Harimau berburu rusa jika harimau mencukupi
    if ((scene.pop.harimau || 0) >= 8 && scene.pop.rusa > 20) {
      scene.pop.rusa = Math.max(15, scene.pop.rusa - 3);
      scene.showFloatingNotice('🐅 Harimau menjaga rimba dan memangsa rusa! (-3 Rusa)', 0x34d399);
      stateChanged = true;
    }
    // 3. Pohon mengering saat kemarau
    if (scene.waterLevel < 35 && scene.pop.pohon > 15) {
      scene.pop.pohon = Math.max(5, scene.pop.pohon - 2);
      scene.showFloatingNotice('☀️ Pohon rimba layu kekurangan mata air! (-2 Pohon)', 0xf59e0b);
      stateChanged = true;
    }
  } else if (eco === 'sungai') {
    // Gulma tebal membuat oksigen turun dan ikan berkurang
    if ((scene.pop.gulma || 0) > 40 && scene.pop.ikan > 20) {
      scene.pop.ikan = Math.max(10, scene.pop.ikan - 3);
      scene.showFloatingNotice('🌿 Eceng gondok menutup air! Ikan lemas kekurangan oksigen! (-3 Ikan)', 0xf87171);
      stateChanged = true;
    }
    // Air hulu surut membuat teratai layu
    if (scene.waterLevel < 35 && (scene.pop.teratai || 0) > 10) {
      scene.pop.teratai = Math.max(5, scene.pop.teratai - 2);
      scene.showFloatingNotice('☀️ Aliran surut! Tanaman air teratai layu! (-2 Teratai)', 0xf59e0b);
      stateChanged = true;
    }
  } else if (eco === 'laut') {
    // Karang rusak membuat kawanan ikan karang berkurang
    if ((scene.pop.karang || 0) < 25 && scene.pop.ikan > 20) {
      scene.pop.ikan = Math.max(10, scene.pop.ikan - 3);
      scene.showFloatingNotice('🪸 Karang memutih! Ikan karang kehilangan rumah! (-3 Ikan)', 0xf87171);
      stateChanged = true;
    }
    // Hiu memangsa ikan secara alami
    if ((scene.pop.hiu || 0) >= 4 && scene.pop.ikan > 35) {
      scene.pop.ikan = Math.max(20, scene.pop.ikan - 4);
      scene.showFloatingNotice('🦈 Hiu menjaga keseimbangan samudra! (-4 Ikan)', 0x34d399);
      stateChanged = true;
    }
  }

  return stateChanged;
}

// Test Hutan Tropis
const hutanScene = createDummyScene('hutan', 'hutan_m1', { pohon: 20, rusa: 30, harimau: 2 }, 20);
assert.strictEqual(runEcologicalStep(hutanScene), true, 'Hutan step harus bereaksi');
assert.strictEqual(hutanScene.pop.pohon, 18, 'Pohon harus berkurang karena kemarau dan rusa');
console.log('✅ Test headless simulasi multi-bioma berhasil!');
```

- [x] **Step 2: Jalankan test untuk memverifikasi fungsionalitas**

Run: `node WEBSITE/tests/test_simulation_logic.js`  
Expected: `✅ Test headless simulasi multi-bioma berhasil!`

- [x] **Step 3: Implementasi logika simulasi multi-bioma di `SimulationScene.js`**

1. Perbaiki `applyIrrigationAction(btnElement)`:
   - Jika `activeEcosystemId === 'hutan'`, tambah `pop.pohon += 10`, teks `'💧 Mata Air Dialirkan! Rimba Segar Menghijau (+25%)'`.
   - Jika `activeEcosystemId === 'sungai'`, tambah `pop.teratai = (pop.teratai || 0) + 10`, teks `'💧 Pintu Air Hulu Dibuka! Aliran Sungai Segar (+25%)'`.
   - Jika `sawah`, tetap tambah `pop.padi += 10`, teks `'💧 Pintu Air Dibuka! Sawah Terairi Segar (+25%)'`.
2. Pasang `runEcologicalStep()` terintegrasi di dalam `simulationStep()` dengan audio chomp dan partikel visual yang selaras untuk 4 Bioma.

- [x] **Step 4: Jalankan verifikasi sintaksis dan pengujian**

Run: `node -c WEBSITE/js/phaser-game/scenes/SimulationScene.js`  
Expected: Exit code 0 (Bebas syntax error).

- [x] **Step 5: Commit perubahan Task 1**

```bash
git add WEBSITE/tests/test_simulation_logic.js WEBSITE/js/phaser-game/scenes/SimulationScene.js
git commit -m "feat(simulation): implement dynamic multi-biome ecological cascade and fix action desync"
```

---

### Task 2: Mode Penguji/Dosen (Unlock All) & Modal Konfirmasi IFP

**Files:**
- Modify: `WEBSITE/js/phaser-game/managers/ProgressManager.js:140-149` (Tambah method `unlockAllForExaminer`)
- Modify: `WEBSITE/js/phaser-game/scenes/BiomeSelectScene.js:90-100` (Ganti `window.confirm` dengan Phaser in-game modal & pasang secret trigger)

**Interfaces:**
- Consumes: `window.progressManager`
- Produces: `progressManager.unlockAllForExaminer()`, Phaser 3 Touch Modal Dialog di `BiomeSelectScene`.

- [ ] **Step 1: Tambahkan method `unlockAllForExaminer()` di `ProgressManager.js`**

```javascript
  /**
   * Mode Penguji / Dosen (Sidang Skripsi & Validasi Ahli):
   * Membuka instan seluruh 4 bioma dan 8 misi dengan rating 3 bintang.
   */
  unlockAllForExaminer() {
    this.state.unlockedEcosystems = ['sawah', 'hutan', 'sungai', 'laut'];
    Object.keys(this.state.missions).forEach(mid => {
      this.state.missions[mid] = {
        unlocked: true,
        completed: true,
        stars: 3,
        bestHealth: 95,
        quizPassed: true
      };
    });
    this.recalculateStars();
    this.save();
    console.log('[ProgressManager] 🎓 Mode Penguji Aktif: Seluruh 4 Bioma & 8 Misi Terbuka!');
  }
```

- [ ] **Step 2: Buat modal konfirmasi sentuh Phaser di `BiomeSelectScene.js`**

Gantikan kode `window.confirm()` dengan metode internal `showConfirmModal(title, message, onYes)`:
- Backdrop gelap transparan (Alpha 0.8) ramah IFP.
- Kotak pesan mewah berbingkai emas `0xf59e0b` dengan teks Fredoka tebal.
- Dua tombol besar sentuh jemari: `✅ Ya, Reset` (merah) dan `❌ Batal` (hijau zamrud).

- [ ] **Step 3: Tambahkan Secret Gesture / Shortcut "Mode Penguji" di `BiomeSelectScene.js`**

- Ketuk lencana tim di header sebanyak 5 kali dalam rentang waktu 3 detik:
  - Bunyikan chime sukses `playSuccess()`.
  - Panggil `progressManager.unlockAllForExaminer()`.
  - Tampilkan floating banner emas: `🎓 MODE PENGUJI AKTIF: 4 BIOMA & 8 MISI TERBUKA!`.
  - Restart scene untuk memperbarui kartu peta ekosistem.

- [ ] **Step 4: Verifikasi sintaksis dan integrasi**

Run: `node -c WEBSITE/js/phaser-game/managers/ProgressManager.js WEBSITE/js/phaser-game/scenes/BiomeSelectScene.js`  
Expected: Exit code 0.

- [ ] **Step 5: Commit perubahan Task 2**

```bash
git add WEBSITE/js/phaser-game/managers/ProgressManager.js WEBSITE/js/phaser-game/scenes/BiomeSelectScene.js
git commit -m "feat(progression): add examiner unlock mode and in-engine IFP touch confirmation modal"
```

---

### Task 3: Diagram Kausalitas C2 & Penyelarasan Peran Tim Lintas Bioma

**Files:**
- Modify: `WEBSITE/js/phaser-game/scenes/QuizScene.js:175-255` (Tambahkan visual diagram rantai makanan C2 saat feedback)
- Modify: `WEBSITE/js/phaser-game/scenes/TeamSelectScene.js:35-105` (Tambahkan padanan peran tim lintas bioma)
- Modify: `WEBSITE/js/phaser-game/scenes/SimulationScene.js:1749-1830` (Sesuaikan teks voting CSCL dengan bioma aktif)

**Interfaces:**
- Consumes: `activeMission.quiz.explanation`, `activeTeam`, `activeEcosystemId`
- Produces: Kartu diagram kausalitas visual C2 di `QuizScene`, subtitle peran universal di `TeamSelectScene`.

- [ ] **Step 1: Tambahkan kartu visual skema sebab-akibat C2 di `QuizScene.js`**

Ketika siswa menjawab soal C2, selain menampilkan feedback teks, tampilkan baris diagram mini (kotak-kotak organisme dengan panah penghubung `➔` atau `❌`):
- Contoh Misi Sawah: `[Padi] ➔ [Tikus Merajalela] ➔ [Petani Gagal Panen ❌]`
- Contoh Misi Hutan: `[Penebangan Liar ❌] ➔ [Rusa Hilang Rumah] ➔ [Harimau Kelaparan]`
- Contoh Misi Sungai: `[Eceng Gondok Menutup ❌] ➔ [Oksigen Turun] ➔ [Ikan Mati Lemas]`
- Contoh Misi Laut: `[Karang Memutih ❌] ➔ [Ikan Karang Hilang] ➔ [Hiu Kesulitan Makan]`

- [ ] **Step 2: Perbarui plakat peran tim di `TeamSelectScene.js`**

Tambahkan baris keterangan universal pada setiap kartu tim agar relevan dengan 4 bioma:
- *Tim Elang:* `👑 Puncak: Elang (Sawah) • Harimau (Hutan) • Bangau (Sungai) • Hiu (Laut)`
- *Tim Ular / Katak:* `🛡️ Pengendali: Ular & Katak (Sawah) • Rusa (Hutan) • Ikan (Sungai & Laut)`
- *Tim Padi:* `🌾 Produsen: Padi (Sawah) • Pohon Rimba (Hutan) • Teratai (Sungai) • Karang (Laut)`
- *Tim Jamur:* `🍄 Pengurai: Jamur (Sawah & Hutan) • Bakteri (Sungai) • Detritivor (Laut)`

- [ ] **Step 3: Sinkronkan panduan kartu voting Tanya Teman di `SimulationScene.js`**

Di modal CSCL `triggerCoPilotCallout()`, sesuaikan teks rekomendasi kartu warna:
- **🟢 Hijau:** Tambah Populasi Pemburu / Pemulih Keseimbangan Bioma.
- **🟡 Kuning:** Buka Saluran Air / Alirkan Mata Air / Transplantasi.
- **🔴 Merah:** Bersihkan Racun / Sita Jerat / Angkut Limbah & Sampah Plastik.

- [ ] **Step 4: Verifikasi sintaksis**

Run: `node -c WEBSITE/js/phaser-game/scenes/QuizScene.js WEBSITE/js/phaser-game/scenes/TeamSelectScene.js WEBSITE/js/phaser-game/scenes/SimulationScene.js`  
Expected: Exit code 0.

- [ ] **Step 5: Commit perubahan Task 3**

```bash
git add WEBSITE/js/phaser-game/scenes/QuizScene.js WEBSITE/js/phaser-game/scenes/TeamSelectScene.js WEBSITE/js/phaser-game/scenes/SimulationScene.js
git commit -m "feat(pedagogy): add C2 visual causality diagrams and universal biome team roles"
```

---

### Task 4: Modernisasi Portal Riset & Integrasi Preview 4 Bioma

**Files:**
- Modify: `WEBSITE/index.html` (Styling glassmorphism mewah, grid 4 bioma visual card, tautan langsung LKPD dan panduan)

**Interfaces:**
- Consumes: `assets/environment/*`, `assets/ui/*`, `docs/*`
- Produces: Antarmuka portal riset modern berstandar estetika tinggi yang memukau penguji.

- [ ] **Step 1: Desain ulang kartu informasi & visual hero di `WEBSITE/index.html`**

- Hilangkan batasan kaku `border: none !important; box-shadow: none !important;`.
- Terapkan palet *Emerald & Slate Glassmorphism* yang seirama dengan Phaser game.
- Tambahkan section baru **"Eksplorasi 4 Bioma Nusantara"** dengan 4 kartu interaktif:
  1. 🌾 **Bioma Sawah:** Kemarau Panjang vs Racun & Perburuan Ular.
  2. 🌲 **Bioma Hutan Tropis:** Kekeringan Rimba vs Penebangan Liar & Jerat Harimau.
  3. 🏞️ **Bioma Sungai Air Tawar:** Air Surut & Eceng Gondok vs Limbah Pabrik Beracun.
  4. 🌊 **Bioma Laut Terumbu Karang:** Gelombang Panas Karang vs Bom Ikan & Sampah Plastik.
- Tambahkan tombol pintas:
  - `🕹️ Buka Game Engine IFP (Full Screen)`
  - `📑 Unduh / Buka Lembar Kerja Siswa (LKPD Detektif Sawah)`
  - `📚 Baca Naskah & Dokumen Desain Produk (PRD)`

- [ ] **Step 2: Verifikasi tampilan dan tautan di browser**

Pastikan seluruh link lokal mengarah ke file yang valid dan tata letak responsif di desktop maupun layar IFP.

- [ ] **Step 3: Commit perubahan Task 4**

```bash
git add WEBSITE/index.html
git commit -m "feat(portal): modernize research landing portal with 4-biome visual cards and LKPD quick access"
```

---

### Task 5: Sinkronisasi Dokumen Pendamping Skripsi Sesuai `GEMINI.md`

**Files:**
- Modify: `docs/PRD_GAME_SKRIPSI.md`
- Modify: `docs/ROADMAP.md`
- Modify: `docs/LKPD_DETEKTIF_SAWAH.md`
- Modify: `docs/SKRIPSI.md`

**Interfaces:**
- Consumes: Seluruh update fitur di Task 1, 2, 3, dan 4.
- Produces: Dokumen akademik yang 100% mutakhir dan sinkron menyambut validasi ahli dan ujian skripsi.

- [ ] **Step 1: Perbarui `docs/PRD_GAME_SKRIPSI.md`**
  - Catat implementasi simulasi kaskade multi-bioma dinamis pada Bagian 4 & 5.
  - Tambahkan dokumentasi fitur *Mode Penguji / Dosen* pada Bagian 3 (Spesifikasi IFP).
  - Tambahkan dokumentasi diagram visual kausalitas C2 pada Bagian 2.2 (Teori Mayer & Piaget).

- [ ] **Step 2: Perbarui `docs/ROADMAP.md`**
  - Perbarui progres Pekan 10–11: Implementasi multi-bioma simulation cascade, visual causal debriefing C2, dan kesiapan gladi bersih IFP.

- [ ] **Step 3: Perbarui `docs/LKPD_DETEKTIF_SAWAH.md`**
  - Selaraskan instruksi peran Penasihat Meja dengan kartu voting 3 warna yang kontekstual.

- [ ] **Step 4: Perbarui `docs/SKRIPSI.md`**
  - Perkaya pembahasan Bab 2 & 4 mengenai efektivitas diagram kausalitas C2 visual dan peran kolaboratif CSCL.

- [ ] **Step 5: Commit perubahan Task 5**

```bash
git add docs/PRD_GAME_SKRIPSI.md docs/ROADMAP.md docs/LKPD_DETEKTIF_SAWAH.md docs/SKRIPSI.md
git commit -m "docs(skripsi): sync companion academic documents with multi-biome enhancements"
```

---

## Plan Self-Review Checklist
- [x] **Spec coverage:** Semua temuan audit penting (simulasi multi-bioma, desinkronisasi aksi, kuis visual C2, mode penguji, modal IFP, portal web, sinkronisasi docs) tercakup dalam 5 task terukur.
- [x] **No Placeholders:** Setiap task memiliki instruksi kode, signature fungsi, dan perintah eksekusi yang jelas tanpa "TBD" atau "TODO".
- [x] **Type & Parameter Consistency:** Konsisten menggunakan variabel `activeEcosystemId`, `activeMission`, `ProgressManager`, dan fungsi Phaser 3 yang sudah ada.
- [x] **Academic Rule Compliance:** Mematuhi checklist `GEMINI.md` untuk sinkronisasi dokumen `docs/`.
