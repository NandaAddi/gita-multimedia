# Touchscreen & IFP Comprehensive Audit and Fix Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Mengaudit dan memperbaiki seluruh interaksi touchscreen dan Interactive Flat Panel (IFP) pada game Eco-Explorer kelas 5A, termasuk bug Drag & Drop simulasi, implementasi mode hibrida (Drag & Drop + Tap-to-Place), single active pointer lock untuk palm rejection, serta ergonomi sentuh di seluruh scene game.

**Architecture:** 
1. Layer CSS: Konfigurasi `touch-action: none` / `pan-y`, `-webkit-tap-highlight-color: transparent`, proteksi `user-select: none`, dan peningkatan target sentuh IFP (≥56px).
2. Layer Core Simulation: Arsitektur Hibrida Dual-Mode (Drag & Drop via Pointer Events dengan `setPointerCapture` + Tap-to-Select & Tap-to-Place pada canvas alam) dengan isolasi `activePointerId` untuk palm rejection.
3. Layer Navigation & Scene: Normalisasi swipe gesture dan touch feedback pada Layar Tim, Bioma, Kuis C2, Panduan Guru, dan Modal Kamus.
4. Layer Sinkronisasi R&D: Pembaruan PRD Game dan Roadmap sesuai protokol skripsi Alessi & Trollip.

**Tech Stack:** Vanilla JavaScript (ES6+), Vanilla CSS3, Pointer Events API, HTML5 Canvas, Node.js (Testing).

**Spec:** Hasil kesepakatan sesi interview `/grill-me` (Audit total seluruh layar game, Sistem Hibrida Dual-Mode, Single Active Pointer Lock, dan Peningkatan Ergonomi Penuh).

## Global Constraints

- Standar Layar: IFP 65–86 inci SDN Percobaan 2 Malang (1920x1080) & perangkat tablet/touchscreen.
- Target Sentuh Minimum: 48px–56px (Standar ergonomi WCAG AAA & anak usia 10–11 tahun).
- Pointer Lock: Mengabaikan sentuhan sekunder (palm rejection) dengan fallback safety timeout.
- Kompatibilitas Dokumen: Wajib menyinkronkan `docs/PRD_GAME_SKRIPSI.md` dan `docs/ROADMAP.md` (Aturan `GEMINI.md`).

---

### Task 1: Global Touchscreen & IFP CSS Optimizations

**Files:**
- Modify: `d:\SKRIPSI GITA\TES GITA BARU 1\css\game.css`

**Interfaces:**
- Produces: CSS classes `.dock-card.selected`, `.dock-card`, `#dock-grid`, `.drag-proxy`, touch-action rules, touch hit target sizes.

- [x] **Step 1: Edit `css/game.css` to add global touch hygiene, tap-highlight removal, and user-select protection**
Tambahkan konfigurasi di root/global `css/game.css`:
```css
/* TOUCHSCREEN & IFP ERGONOMICS OPTIMIZATIONS */
* {
  -webkit-tap-highlight-color: transparent;
}
body, button, .dock-card, .edge-tab, .opt, .ktab, .kcard {
  -webkit-user-select: none;
  user-select: none;
}
```

- [x] **Step 2: Add `touch-action: none;` and selected state styling for simulation cards**
Pada bagian `.sim-dock`, `.dock-grid`, dan `.dock-card`:
```css
.dock-grid {
  touch-action: none;
}
.dock-card {
  touch-action: none;
  -webkit-user-drag: none;
}
.dock-card.selected {
  outline: 3px solid var(--gold-hi);
  box-shadow: 0 0 25px rgba(254, 240, 138, 0.75), inset 0 0 15px rgba(254, 240, 138, 0.4);
  transform: translateY(-8px) scale(1.03);
  transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s ease;
}
.drag-proxy {
  touch-action: none;
  pointer-events: none;
  user-select: none;
}
```

- [x] **Step 3: Verify CSS syntax and changes**
Buka `css/game.css` dan periksa tidak ada kurung kurawal atau deklarasi yang rusak.

---

### Task 2: Core Simulation Drag-and-Drop & Dual-Mode Tap-to-Place

**Files:**
- Modify: `d:\SKRIPSI GITA\TES GITA BARU 1\js\scenes\simulation.js`

**Interfaces:**
- Consumes: `SIM`, `doAction(i, dropX, dropY)`, `H.dockCard`, `toast`, `sfx`
- Produces: `activePointerId`, `selectedCardIndex`, `clearCardSelection()`, pointer capture handling, tap-to-place landscape listener.

- [x] **Step 1: Refactor pointer and drag proxy state with activePointerId and selected card state**
Di `simulation.js`, inisialisasi state manajemen sentuh IFP:
```javascript
let dragProxy = null;
let activeDragIndex = -1;
let activePointerId = null;
let dragStartX = 0;
let dragStartY = 0;
let isDragging = false;
let selectedCardIndex = -1;
let pointerLockTimeout = null;
```

- [x] **Step 2: Implement robust `setPointerCapture` and drag move logic with visual offset**
Saat jari bergerak, angkat posisi visual drag proxy sebesar 35px ke atas jari agar tidak tertutup telunjuk siswa:
```javascript
function moveProxy(e) {
  if (!dragProxy) return;
  dragProxy.style.left = e.clientX + 'px';
  dragProxy.style.top = (e.clientY - 35) + 'px'; // Offset visual agar terlihat jelas di IFP
}
```

- [x] **Step 3: Implement Dual-Mode logic in `#dock-grid` pointerdown & pointerup**
Bedakan antara klik/ketuk singkat (Tap-to-Select) dan seret (Drag & Drop):
- Jika perpindahan posisi `< 12px` saat jari dilepas: masuk ke Mode **Tap-to-Select**.
  - Kartu diberi class `.selected`.
  - Muncul toast/indikator *"Kartu [Nama Aksi] dipilih! Ketuk area alam untuk meletakkan."*
- Jika perpindahan posisi `≥ 12px`: jalankan alur **Drag & Drop** seperti biasa.

- [x] **Step 4: Implement Tap-to-Place on Canvas Landscape (`#cv-sim`)**
Tambahkan listener pada `#cv-sim` atau area landscape:
- Jika `selectedCardIndex > -1` dan area alam disentuh/diketuk:
  - Eksekusi `doAction(selectedCardIndex, e.clientX, e.clientY)`.
  - Lepas seleksi kartu (`clearCardSelection()`).

- [x] **Step 5: Add Failsafe Safety Timeout for Single Active Pointer Lock**
Cegah pointer lock macet jika browser IFP kehilangan kontak sentuh tanpa menembakkan `pointerup`:
```javascript
function resetTouchLock() {
  if (pointerLockTimeout) clearTimeout(pointerLockTimeout);
  activePointerId = null;
  activeDragIndex = -1;
  isDragging = false;
  if (dragProxy) { dragProxy.remove(); dragProxy = null; }
}
```

---

### Task 3: IFP Navigation & Gesture Enhancements (Team & Biome)

**Files:**
- Modify: `d:\SKRIPSI GITA\TES GITA BARU 1\js\scenes\team.js`
- Modify: `d:\SKRIPSI GITA\TES GITA BARU 1\js\scenes\biome.js`

**Interfaces:**
- Consumes: `#team-stage`, `#biome-stage`, `navigateTeam`, `navigateBiome`
- Produces: Single active pointer gesture recognition with `touch-action: pan-y` protection.

- [x] **Step 1: Update `#team-stage` swipe gesture in `team.js`**
Gunakan `activePointerId` tracking pada `#team-stage` agar sentuhan sekunder tidak mengacaukan navigasi tim:
- Simpan `activePointerId` saat `pointerdown`.
- Verifikasi `e.pointerId === activePointerId` saat `pointerup`.
- Tambahkan CSS `touch-action: pan-y` pada elemen `#team-stage`.

- [x] **Step 2: Update `#biome-stage` swipe gesture in `biome.js`**
Terapkan pola yang sama persis pada `#biome-stage` di `biome.js` untuk navigasi 4 bioma.

---

### Task 4: Touch Polish for Quiz & Teacher Guidance

**Files:**
- Modify: `d:\SKRIPSI GITA\TES GITA BARU 1\js\scenes\quiz.js`
- Modify: `d:\SKRIPSI GITA\TES GITA BARU 1\js\scenes\teacher.js`
- Modify: `d:\SKRIPSI GITA\TES GITA BARU 1\js\scenes\mission-menu.js`

**Interfaces:**
- Consumes: `startQuiz`, `buildTeacher`, `kamusModal`
- Produces: Audio touch replay indicator, touch-scroll momentum, tolerant 5-tap examiner gesture.

- [x] **Step 1: Add audio replay badge & touch target enhancement in `quiz.js`**
Pada elemen `.qtext`, tambahkan ikon speaker sentuh:
```html
<div class="qtext-wrap"><span class="vo-listen-badge">🔊 Ketuk untuk dengar suara Gita</span> ...</div>
```
Dan pastikan tombol `.opt` memiliki touch feedback responsif saat disentuh di IFP.

- [x] **Step 2: Enhance Teacher Guidance touch scroll and 5-tap gesture in `teacher.js`**
- Pastikan container slide (`.t-step-slide`) memiliki CSS momentum scroll:
  `overflow-y: auto; -webkit-overflow-scrolling: touch; touch-action: pan-y;`
- Perbaiki gestur 5-tap pada `#teacher-badge` agar tidak ter-reset jika koordinat jari bergeser tipis saat mengetuk cepat.

- [x] **Step 3: Enhance Kamus Sains touch scrolling in `mission-menu.js`**
Pastikan `#kbody` dan `.kgrid` di `kamusModal` mendukung sentuhan jari yang mulus di IFP tanpa tersangkut.

---

### Task 5: Automated Testing & Verification

**Files:**
- Create: `d:\SKRIPSI GITA\TES GITA BARU 1\tests\verify_touchscreen_ifp.js`

**Interfaces:**
- Consumes: `css/game.css`, `js/scenes/simulation.js`, `js/scenes/team.js`, `js/scenes/biome.js`, `js/scenes/quiz.js`, `js/scenes/teacher.js`
- Produces: Test execution report verifying touch-action rules, pointer locking, dual-mode deployment, and zero syntax errors.

- [x] **Step 1: Write test script `tests/verify_touchscreen_ifp.js`**
Buat skrip pengujian berbasis Node.js yang memvalidasi:
1. Keberadaan CSS `touch-action: none` untuk kartu dan dock.
2. Keberadaan variabel `activePointerId`, `selectedCardIndex`, dan `clearCardSelection`.
3. Verifikasi pointer capture logic dan single active pointer lock.
4. Sintaks seluruh file JS valid tanpa error parsing.

- [x] **Step 2: Run test with Node.js and verify 100% pass**
Jalankan: `node tests/verify_touchscreen_ifp.js`
Pastikan output: `ALL TOUCHSCREEN / IFP TESTS PASSED`.

---

### Task 6: Skripsi Companion Documents Synchronization

**Files:**
- Modify: `d:\SKRIPSI GITA\docs\PRD_GAME_SKRIPSI.md`
- Modify: `d:\SKRIPSI GITA\docs\ROADMAP.md`

**Interfaces:**
- Consumes: Hasil implementasi audit & perbaikan touchscreen/IFP
- Produces: Dokumentasi komprehensif ergonomi IFP dan progres R&D Alessi & Trollip.

- [x] **Step 1: Update `docs/PRD_GAME_SKRIPSI.md`**
Perbarui Bagian 3 (Spesifikasi Ergonomi & Mekanika IFP) dan Bagian 4 (Core Gameplay Loop):
- Catat arsitektur Hibrida Dual-Mode (Drag & Drop + Tap-to-Place).
- Catat mekanisme Single Active Pointer Lock & Palm Rejection untuk layar 65-86 inci.
- Catat visual offset kartu sentuh (kartu terangkat di atas jari agar tidak tertutup).

- [x] **Step 2: Update `docs/ROADMAP.md`**
Catat milestone pengujian teknis touchscreen & IFP pada tahapan Development & Alpha Testing model Alessi & Trollip.
