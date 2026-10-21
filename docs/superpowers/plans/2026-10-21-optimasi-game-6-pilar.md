# Optimasi Menyeluruh 6 Pilar Eco-Explorer Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Mengoptimasi performa game Eco-Explorer secara menyeluruh pada 6 pilar arsitektur sistem (Canvas 60 FPS, Memory Lifecycle, Audio Pipeline, Ergonomi IFP, PWA Precache, dan Keseimbangan Pedagogis Mayer/CSCL) serta menyinkronkan dokumen pendamping skripsi.

**Architecture:** Menerapkan memoization gradien `LG()`/`RG()` dan zero allocation di loop per-frame; mendaftarkan registry unmount `SCENE_CLEANUP` pada transisi scene `go()`; memperbaiki fallback audio dan mengintegrasikan berkas VO orphan; memperluas target sentuh IFP menjadi $\ge 80\times 80\text{ px}$ dengan pseudo-element dan palm rejection; memutakhirkan Service Worker ke `v1.4.0` dengan precache 42 frame loading WebP; serta menstabilkan formula dinamika kaskade trofik `sungai-1` untuk meniadakan infinite bleed.

**Tech Stack:** Vanilla JavaScript (ES6+), HTML5 Canvas 2D API, Web Audio API, Service Worker Cache API, CSS3 Glassmorphism, Node.js headless test suite.

**Spec:** [`docs/superpowers/specs/2026-10-21-optimasi-game-6-pilar-design.md`](file:///d:/SKRIPSI%20GITA/docs/superpowers/specs/2026-10-21-optimasi-game-6-pilar-design.md)

## Global Constraints
- Resolusi desain kanvas acuan: $1920 \times 1080$ piksel (skala otomatis di `#stage`).
- Tipografi UI antarmuka: minimal absolut $\ge 24\text{ px}$ (standar keterbacaan bangku belakang IFP).
- Ukuran target interaktif: minimal efektif $\ge 80 \times 80\text{ px}$ dengan proteksi debounce taktil $\ge 280\text{ ms}$.
- Ketersediaan offline: 100% offline-ready tanpa ketergantungan koneksi internet di kelas sekolah.
- Kepatuhan pengujian: 100% lulus seluruh test suite (`node tests/run.js` 34+ tests pass, 0 fail).
- Aturan wajib pendamping: Seluruh dokumen di `docs/` wajib disinkronkan sebelum tugas berakhir sesuai `GEMINI.md`.

---

### Task 1: Pilar 1 — Canvas Gradient Memoization & Zero Allocation di Render Loop

**Files:**
- Modify: [`js/renderers/characters.js:480-500`](file:///d:/SKRIPSI%20GITA/js/renderers/characters.js), [`js/renderers/characters.js:680-700`](file:///d:/SKRIPSI%20GITA/js/renderers/characters.js), [`js/renderers/characters.js:1040-1060`](file:///d:/SKRIPSI%20GITA/js/renderers/characters.js), [`js/renderers/characters.js:1100-1120`](file:///d:/SKRIPSI%20GITA/js/renderers/characters.js), [`js/renderers/characters.js:1360-1380`](file:///d:/SKRIPSI%20GITA/js/renderers/characters.js), [`js/renderers/characters.js:1470-1490`](file:///d:/SKRIPSI%20GITA/js/renderers/characters.js), [`js/renderers/characters.js:1795-1835`](file:///d:/SKRIPSI%20GITA/js/renderers/characters.js)
- Modify: [`js/renderers/backgrounds.js:410-425`](file:///d:/SKRIPSI%20GITA/js/renderers/backgrounds.js), [`js/renderers/backgrounds.js:695-710`](file:///d:/SKRIPSI%20GITA/js/renderers/backgrounds.js), [`js/renderers/backgrounds.js:930-945`](file:///d:/SKRIPSI%20GITA/js/renderers/backgrounds.js), [`js/renderers/backgrounds.js:985-1000`](file:///d:/SKRIPSI%20GITA/js/renderers/backgrounds.js), [`js/renderers/backgrounds.js:1160-1175`](file:///d:/SKRIPSI%20GITA/js/renderers/backgrounds.js)
- Test: `tests/test_canvas_opt.js`

**Interfaces:**
- Consumes: `LG(c, x0, y0, x1, y1, s0, s1)` dan `RG(c, x, y, r, s0, s1)` dari [`js/config.js`](file:///d:/SKRIPSI%20GITA/js/config.js).
- Produces: Rendering loop 60 FPS bebas alokasi `createLinearGradient` mentah.

- [ ] **Step 1: Jalankan pengujian canvas saat ini**
Run: `node tests/test_canvas_opt.js`
Expected: PASS untuk checks awal

- [ ] **Step 2: Ganti pemanggilan raw createLinearGradient di `js/renderers/characters.js`**
Konversi pemanggilan berikut ke `LG()`:
1. Line ~487 (Pohon rimba trunk grad):
   `const trunkGrad = LG(c, x - tw, splitY, x + tw, y, colBarkMid, colBarkDark);`
2. Line ~688 (Pematang sawah ridge highlight):
   `const mg = LG(c, 0, mxy - 46, 0, mxy, 'rgba(255,255,255,0.18)', 'rgba(0,0,0,0.22)');`
3. Line ~1047 (Granit batu kali sungai):
   Gantikan `c.createLinearGradient(0, py - ry, 0, py + ry)` dengan `LG(c, 0, py - ry, 0, py + ry, '#a8b2b8', '#4b5563')`.
4. Line ~1110 (Lantai hutan humus rimba):
   Gantikan `c.createLinearGradient(0, 470, 0, 1080)` dengan `LG(c, 0, 470, 0, 1080, '#2d1f14', '#150d08')`.
5. Line ~1368 (Bantaran atas sungai lumpur):
   Gantikan `c.createLinearGradient(0, 340, 0, 480)` dengan `LG(c, 0, 340, 0, 480, '#4a3525', '#2a1a10')`.
6. Line ~1476 (Bantaran bawah sungai):
   Gantikan `c.createLinearGradient(0, 800, 0, 1080)` dengan `LG(c, 0, 800, 0, 1080, '#3a2618', '#1c1008')`.
7. Line ~1800, 1807, 1828 (Sprayer partikel & tabung).

- [ ] **Step 3: Ganti pemanggilan raw createLinearGradient di `js/renderers/backgrounds.js`**
Konversi pemanggilan berikut ke `LG()`:
1. Line ~416 (Air sungai meander):
   Gantikan `c.createLinearGradient(0, 420, 0, 1080)` dengan `LG(c, 0, 420, 0, 1080, colRiverTop, colRiverBot)`.
2. Line ~699 (Kabut hujan hutan):
   Gantikan `c.createLinearGradient(0, 0, 0, 650)` dengan `LG(c, 0, 0, 0, 650, 'rgba(255,255,255,0.28)', 'rgba(255,255,255,0)')`.
3. Line ~935 (Kabut lembah sawah):
   Gantikan `c.createLinearGradient(0, 200, 0, 340)` dengan `LG(c, 0, 200, 0, 340, 'rgba(240,249,255,0.45)', 'rgba(240,249,255,0)')`.
4. Line ~989 (Kabut air terjun sungai):
   Gantikan `c.createLinearGradient(0, 450, 0, 830)` dengan `LG(c, 0, 450, 0, 830, 'rgba(255,255,255,0.3)', 'rgba(255,255,255,0)')`.
5. Line ~1166 (Dasar laut terumbu karang):
   Gantikan `c.createLinearGradient(0, 0, 0, 900)` dengan `LG(c, 0, 0, 0, 900, '#0284c7', '#082f49')`.

- [ ] **Step 4: Jalankan verifikasi test canvas & regression test**
Run: `node tests/test_canvas_opt.js`
Run: `node tests/run.js`
Expected: 100% PASS (34/34 OK, test_canvas_opt OK)

- [ ] **Step 5: Commit perubahan Pilar 1**
```bash
git add js/renderers/characters.js js/renderers/backgrounds.js
git commit -m "perf(canvas): memoize all gradients with LG/RG and eliminate GC pauses in render loop"
```

---

### Task 2: Pilar 2 — Siklus Hidup Memori, DOM Cleanup & Idempotent Registry

**Files:**
- Modify: [`js/state.js:80-120`](file:///d:/SKRIPSI%20GITA/js/state.js)
- Modify: [`js/scenes/simulation.js`](file:///d:/SKRIPSI%20GITA/js/scenes/simulation.js)
- Modify: [`js/scenes/team.js`](file:///d:/SKRIPSI%20GITA/js/scenes/team.js)
- Modify: [`js/scenes/biome.js`](file:///d:/SKRIPSI%20GITA/js/scenes/biome.js)
- Modify: [`js/scenes/mission-menu.js`](file:///d:/SKRIPSI%20GITA/js/scenes/mission-menu.js)
- Test: `tests/test_listener_idempotency.js`

**Interfaces:**
- Produces: `SCENE_CLEANUP` registry global di `state.js` yang dieksekusi setiap pergantian screen.

- [ ] **Step 1: Tambahkan `SCENE_CLEANUP` di `js/state.js`**
```javascript
const SCENE_CLEANUP = {};

function applyScreenSwitch(id) {
  // 1. Eksekusi hook pembersihan scene lama
  if (CUR && typeof SCENE_CLEANUP[CUR] === 'function') {
    try { SCENE_CLEANUP[CUR](); } catch (e) { console.warn('[Cleanup][' + CUR + ']', e); }
  }

  const currentSc = el('#scr-' + id);
  els('.screen').forEach(s => s.classList.remove('active'));
  const sc = currentSc || el('#scr-' + id);
  if (sc) sc.classList.add('active');
  CUR = id;
  try {
    if (typeof GitaSeq !== 'undefined') {
      if (id === 'title') {
        if (typeof titleBubble === 'function') titleBubble();
      } else {
        GitaSeq.stop('#gita-title');
        if (id !== 'sim') GitaSeq.stop('#bridge-gita-box');
      }
    }
  } catch (e) {}
}
```

- [ ] **Step 2: Daftarkan pembersihan spesifik pada scene simulation (`js/scenes/simulation.js`)**
Daftarkan `SCENE_CLEANUP['sim']`:
```javascript
SCENE_CLEANUP['sim'] = function() {
  if (typeof leaveSim === 'function') leaveSim();
  const simUi = el('#sim-ui');
  if (simUi) simUi.innerHTML = '';
  const bridge = el('#sim-bridge');
  if (bridge) bridge.style.display = 'none';
};
```

- [ ] **Step 3: Daftarkan pembersihan spesifik pada team, biome, dan mission-menu**
Daftarkan `SCENE_CLEANUP['team']`, `SCENE_CLEANUP['biome']`, `SCENE_CLEANUP['mission']`:
- Hentikan rAF preview lokal, bersihkan timeout debounce navigasi, dan tutup modal jika terbuka.

- [ ] **Step 4: Jalankan verifikasi test idempotensi dan transisi**
Run: `node tests/test_listener_idempotency.js`
Run: `node tests/run.js`
Expected: 100% PASS

- [ ] **Step 5: Commit perubahan Pilar 2**
```bash
git add js/state.js js/scenes/simulation.js js/scenes/team.js js/scenes/biome.js js/scenes/mission-menu.js
git commit -m "feat(lifecycle): implement centralized SCENE_CLEANUP registry and automated DOM teardown"
```

---

### Task 3: Pilar 3 — Pipeline Audio, Voice-Over Fallback & Aktivasi Rekaman Orphan

**Files:**
- Modify: [`js/audio.js:330-360`](file:///d:/SKRIPSI%20GITA/js/audio.js)
- Modify: [`js/scenes/title.js`](file:///d:/SKRIPSI%20GITA/js/scenes/title.js)
- Modify: [`js/scenes/simulation.js`](file:///d:/SKRIPSI%20GITA/js/scenes/simulation.js)
- Modify: [`js/scenes/victory.js`](file:///d:/SKRIPSI%20GITA/js/scenes/victory.js)
- Test: `tests/test_audio_pool.js`, `tests/audit_audio_and_vo.js`

**Interfaces:**
- Consumes: `VO_POOL` Map dan `playVO(key, onEnd)`
- Produces: Rute fallback audio bersih tanpa duplikasi objek dan aktivasi audio in-game yang kontekstual.

- [ ] **Step 1: Jalankan pengujian audio pool & VO**
Run: `node tests/test_audio_pool.js`
Run: `node tests/audit_audio_and_vo.js`
Expected: Catat daftar orphan dan periksa kondisi `_getVOFallback`.

- [ ] **Step 2: Koreksi fungsi fallback di `js/audio.js`**
Hapus duplikasi file yang sama di `_getVOFallback`. Pastikan jika audio primer gagal, ia mencoba direktori alternatif (`assets/audio/vo/` jika ada), atau gunakan instans `audio` yang sama dengan handling error yang anggun tanpa membuat objek duplikat di `VO_POOL`.

- [ ] **Step 3: Aktifkan berkas VO orphan ke dalam gameplay**
1. Di [`js/scenes/title.js`](file:///d:/SKRIPSI%20GITA/js/scenes/title.js):
   Panggil `playVO('vo_title_welcome')` saat pertama kali tombol Mulai Petualangan ditekan (atau saat Gita menyapa di layar judul).
2. Di [`js/scenes/simulation.js`](file:///d:/SKRIPSI%20GITA/js/scenes/simulation.js):
   Panggil `playVO('vo_sim_danger')` ketika kesehatan ekosistem pertama kali turun di bawah 40% (`S.health < 40`).
   Panggil `playVO('vo_sim_fail_health')` saat simulasi gagal akibat kesehatan drop.
3. Di [`js/scenes/victory.js`](file:///d:/SKRIPSI%20GITA/js/scenes/victory.js):
   Panggil `playVO('vo_victory_cheer')` saat merayakan kemenangan misi dengan 3 bintang.

- [ ] **Step 4: Jalankan verifikasi test audio**
Run: `node tests/test_audio_pool.js`
Run: `node tests/test_audio_engine.js`
Run: `node tests/run.js`
Expected: 100% PASS

- [ ] **Step 5: Commit perubahan Pilar 3**
```bash
git add js/audio.js js/scenes/title.js js/scenes/simulation.js js/scenes/victory.js
git commit -m "feat(audio): fix VO fallback pooling and integrate orphan voice-over tracks into gameplay"
```

---

### Task 4: Pilar 4 — Ergonomi Layar Sentuh IFP, Hit-Area Ekspansi & Palm Rejection

**Files:**
- Modify: [`css/game.css:360-380`](file:///d:/SKRIPSI%20GITA/css/game.css), [`css/game.css:1490-1510`](file:///d:/SKRIPSI%20GITA/css/game.css)
- Modify: [`js/scenes/simulation.js`](file:///d:/SKRIPSI%20GITA/js/scenes/simulation.js)
- Modify: [`js/main.js`](file:///d:/SKRIPSI%20GITA/js/main.js)
- Test: `tests/audit_ifp_ui.js`, `tests/verify_touchscreen_ifp.js`

**Interfaces:**
- Produces: Target sentuh ergonomis $\ge 80 \times 80\text{ px}$ dan penolakan sentuhan multi-jari/palm rejection.

- [ ] **Step 1: Jalankan pengujian ergonomi IFP saat ini**
Run: `node tests/audit_ifp_ui.js`
Run: `node tests/verify_touchscreen_ifp.js`
Expected: PASS

- [ ] **Step 2: Tingkatkan ukuran tombol dan tambahkan pseudo-element hit-area di `css/game.css`**
Perbarui `.tb-btn`:
```css
.tb-btn {
  height: 72px;
  min-height: 72px;
  font-size: 26px;
  padding: 0 26px;
  position: relative;
  touch-action: manipulation;
}
.tb-btn::after {
  content: '';
  position: absolute;
  inset: -10px; /* Ekspansi area sentuh efektif menjadi >= 80x80 px */
  border-radius: inherit;
}
.sim-topbar .tb-btn {
  height: 72px;
  min-height: 72px;
  font-size: 26px;
  padding: 0 20px;
  gap: 10px;
  border-radius: 20px;
  position: relative;
  touch-action: manipulation;
}
.sim-topbar .tb-btn::after {
  content: '';
  position: absolute;
  inset: -8px;
  border-radius: inherit;
}
```

- [ ] **Step 3: Pastikan proteksi Single Active Pointer Lock (Palm Rejection) di `js/scenes/simulation.js`**
Verifikasi bahwa saat drag kartu aksi atau berinteraksi di kanvas, pointer pertama (`e.pointerId`) dikunci, dan sentuhan telapak tangan tambahan diabaikan.

- [ ] **Step 4: Jalankan verifikasi test IFP**
Run: `node tests/audit_ifp_ui.js`
Run: `node tests/verify_touchscreen_ifp.js`
Run: `node tests/run.js`
Expected: 100% PASS

- [ ] **Step 5: Commit perubahan Pilar 4**
```bash
git add css/game.css js/scenes/simulation.js js/main.js
git commit -m "style(ifp): expand touch targets to 72-80px with hit-area pseudo-elements and palm rejection"
```

---

### Task 5: Pilar 5 — Service Worker PWA, Precache Aset Loading & Version Bump

**Files:**
- Modify: [`sw.js`](file:///d:/SKRIPSI%20GITA/sw.js)
- Modify: [`index.html`](file:///d:/SKRIPSI%20GITA/index.html)
- Test: `tests/test_preloader_splash.js`

**Interfaces:**
- Produces: Service Worker Cache `eco-explorer-v1.4.0` dengan precache 42 frame loading WebP.

- [ ] **Step 1: Perbarui versi cache di `sw.js`**
Ganti `CACHE_NAME = 'eco-explorer-v1.3.4'` menjadi `CACHE_NAME = 'eco-explorer-v1.4.0'`.

- [ ] **Step 2: Daftarkan 42 frame WebP loading screen ke `PRECACHE_ASSETS` di `sw.js`**
Tambahkan secara dinamis/programatik:
```javascript
const LOADING_FRAMES = [];
for (let i = 1; i <= 42; i++) {
  LOADING_FRAMES.push('./assets/animations/loading/gita_load_' + String(i).padStart(3, '0') + '.webp');
}
```
Gabungkan `LOADING_FRAMES` ke `PRECACHE_ASSETS`.

- [ ] **Step 3: Perbarui query string cache buster di `index.html`**
Ganti query `?v=1.3.x` menjadi `?v=1.4.0` pada referensi css dan js di [`index.html`](file:///d:/SKRIPSI%20GITA/index.html).

- [ ] **Step 4: Jalankan verifikasi preloader test**
Run: `node tests/test_preloader_splash.js`
Run: `node tests/run.js`
Expected: 100% PASS

- [ ] **Step 5: Commit perubahan Pilar 5**
```bash
git add sw.js index.html
git commit -m "feat(pwa): bump service worker cache to v1.4.0 and precache 42 loading screen WebP frames"
```

---

### Task 6: Pilar 6 — Keseimbangan Simulasi Sungai-1 & Pacing Pedagogis Mayer CTML

**Files:**
- Modify: [`js/data/missions.js:500-515`](file:///d:/SKRIPSI%20GITA/js/data/missions.js)
- Test: `tests/audit_deep_all_pillars.js`, `tests/validate_16_missions.js`

**Interfaces:**
- Consumes: Misi `sungai-1` formula `tick(S)` dan `health(S)`
- Produces: Zero Infinite Bleed pada seluruh 16 misi Nusantara.

- [ ] **Step 1: Jalankan audit pilar 1-4 untuk melihat status awal sungai-1**
Run: `node tests/audit_deep_all_pillars.js`
Expected: Perhatikan log `⚠ INFINITE BLEED` pada `sungai-1`.

- [ ] **Step 2: Sesuaikan formula matematis `tick(S)` di `sungai-1`**
Di [`js/data/missions.js`](file:///d:/SKRIPSI%20GITA/js/data/missions.js) pada `sungai-1`:
```javascript
    tick(S) {
      // Pertumbuhan gulma melambat saat mendekati batas atau saat air terjaga
      const gulmaGrowth = S.gulma < 60 ? 1.5 : (S.gulma < 80 ? 0.8 : 0.2);
      S.gulma = cl(S.gulma + gulmaGrowth, 0, 100);
      S.water = cl(S.water - 0.5 - S.gulma * 0.025 + (S.gulma <= 20 ? 0.6 : 0), 0, 100);
      S.prod = cl(S.prod - S.gulma * 0.02 + (S.water > 55 ? 1 : 0));
      S.herb = cl(S.herb + (S.water > 45 ? 1.2 : -1.5) - S.pred * 0.55);
      S.pred = cl(S.pred + (S.herb > 13 ? 0.3 : -0.4));
    },
```

- [ ] **Step 3: Jalankan verifikasi audit keseimbangan misi**
Run: `node tests/audit_deep_all_pillars.js`
Run: `node tests/validate_16_missions.js`
Expected: 0 CRITICAL, 0 MAJOR, **0 INFINITE BLEED**! Semua 16 misi Nusantara hijau (OK).

- [ ] **Step 4: Commit perubahan Pilar 6**
```bash
git add js/data/missions.js
git commit -m "fix(balance): stabilize sungai-1 trophic cascade dynamics and eliminate infinite bleed"
```

---

### Task 7: Sinkronisasi Dokumen Pendamping Skripsi (Aturan Wajib GEMINI.md)

**Files:**
- Modify: [`docs/PRD_GAME_SKRIPSI.md`](file:///d:/SKRIPSI%20GITA/docs/PRD_GAME_SKRIPSI.md)
- Modify: [`docs/ROADMAP.md`](file:///d:/SKRIPSI%20GITA/docs/ROADMAP.md)
- Modify: [`docs/PROMPT_OPTIMASI_GAME.md`](file:///d:/SKRIPSI%20GITA/docs/PROMPT_OPTIMASI_GAME.md)
- Test: `node tests/run.js`

**Interfaces:**
- Produces: Dokumentasi akademik tersinkronisasi 100% mencerminkan versi v1.4.0 dan optimasi 6 pilar.

- [ ] **Step 1: Perbarui `docs/PRD_GAME_SKRIPSI.md`**
Catat penambahan arsitektur `SCENE_CLEANUP`, ukuran touch target IFP 72-80px dengan pseudo-element, perbaikan VO fallback, precache frame WebP di `sw.js v1.4.0`, dan stabilisasi `sungai-1`.

- [ ] **Step 2: Perbarui `docs/ROADMAP.md`**
Tambahkan poin kegiatan Pekan 11:
`33. **Optimasi Komprehensif 6 Pilar Arsitektur Sistem (Versi 1.4.0):** ...`
Mencatat memoization gradien, lifecycle DOM cleanup, aktivasi audio VO orphan, target sentuh IFP 80px, precache loading frame PWA v1.4.0, dan eliminasi 100% infinite bleed pada 16 misi Nusantara.

- [ ] **Step 3: Perbarui tabel KPI di `docs/PROMPT_OPTIMASI_GAME.md`**
Tandai seluruh target KPI tercapai (Status: TERCAPAI 100%).

- [ ] **Step 4: Jalankan seluruh test suite final**
Run: `node tests/run.js`
Run: `node tests/audit_deep_all_pillars.js`
Run: `node tests/audit_ifp_ui.js`
Expected: 100% PASS tanpa regresi!

- [ ] **Step 5: Commit sinkronisasi dokumen pendamping**
```bash
git add docs/PRD_GAME_SKRIPSI.md docs/ROADMAP.md docs/PROMPT_OPTIMASI_GAME.md
git commit -m "docs(sync): update PRD, roadmap, and optimization KPI tables for v1.4.0 6-pillar release"
```
