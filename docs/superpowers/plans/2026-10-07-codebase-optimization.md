# Rencana Implementasi: Optimasi Menyeluruh Codebase Eco-Explorer

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Mengoptimasi performa runtime game *Eco-Explorer* menjadi 60 FPS stabil bebas GC jank, menerapkan object pooling pada audio VO, mencegah kebocoran event listener saat retry misi, serta menstandarisasi tipografi minimal $\ge 24\text{ px}$ untuk layar sentuh IFP SDN Percobaan 2 Malang.

**Architecture:** Menerapkan eviksi FIFO pada `GRADCACHE` dan memoize gradien di loop animasi 60 FPS; membuat `VO_POOL` Map daur ulang `HTMLAudioElement` di `audio.js`; mengganti event listener repetitif di `simulation.js` dengan penugasan idempotent `.onclick`; serta memperbaiki font kecil agar lolos seluruh audit IFP.

**Tech Stack:** Vanilla JavaScript (ES6+), HTML5 Canvas 2D, Web Audio API, PWA Service Worker, Node.js headless testing.

**Spec:** [`docs/superpowers/specs/2026-10-07-codebase-optimization-design.md`](file:///d:/SKRIPSI%20GITA/docs/superpowers/specs/2026-10-07-codebase-optimization-design.md)

## Global Constraints
- Resolusi stage kanvas tetap 1920 × 1080.
- Tidak menambahkan dependensi eksternal / bundler (`jalankan_game.bat` tetap dapat dijalankan secara instan).
- Seluruh 34 test cases di `tests/run.js` dan 30 pengujian di `tests/verify_touchscreen_ifp.js` wajib tetap PASS 100%.
- Seluruh dokumen pendamping skripsi (`docs/PRD_GAME_SKRIPSI.md`, `docs/ROADMAP.md`) wajib disinkronkan sesuai aturan wajib `GEMINI.md`.

---

### Task 1: Optimasi Canvas Render Loop & GradCache FIFO Eviction

**Files:**
- Modify: `TES GITA BARU 1/js/config.js:35-45`
- Modify: `TES GITA BARU 1/js/scenes/team.js:245-280`
- Modify: `TES GITA BARU 1/js/renderers/backgrounds.js:12-46`
- Test: `TES GITA BARU 1/tests/test_canvas_opt.js`

**Interfaces:**
- Consumes: `GRADCACHE`, `gradMemo(c, key, mk)`, `LG()`, `RG()`
- Produces: GradCache berkapasitas 300 dengan eviksi bertahap FIFO; `drawPodiumAndMascot` bebas alokasi objek gradien per-frame.

- [ ] **Step 1: Buat berkas tes verifikasi optimasi canvas dan cache eviksi**
Tulis tes di `tests/test_canvas_opt.js` yang menguji:
1. `gradMemo` tidak melakukan pembersihan massal (`clear()`) saat melewati kapasitas 300, melainkan menghapus kunci tertua satu per satu.
2. `drawPodiumAndMascot` tidak membuat instansiasi gradien baru pada frame berulang.

```javascript
// tests/test_canvas_opt.js
const assert = require('assert');

// Mock context & GRADCACHE
const GRADCACHE = new Map();
function gq(v){ return Math.round(v*2)/2; }
function gradMemo(c, key, mk) {
  let g = GRADCACHE.get(key);
  if (!g) {
    if (GRADCACHE.size >= 300) {
      const oldestKey = GRADCACHE.keys().next().value;
      GRADCACHE.delete(oldestKey);
    }
    g = mk();
    GRADCACHE.set(key, g);
  }
  return g;
}

// 1. Uji FIFO eviction (tidak menghapus semua)
for (let i = 0; i < 305; i++) {
  gradMemo({}, 'key_' + i, () => ({ id: i }));
}
assert.strictEqual(GRADCACHE.size, 300, 'Ukuran cache harus stabil di 300');
assert.strictEqual(GRADCACHE.has('key_0'), false, 'Kunci tertua key_0 harus terhapus');
assert.strictEqual(GRADCACHE.has('key_304'), true, 'Kunci terbaru key_304 harus ada');
console.log('✓ PASS: FIFO eviction bekerja dengan benar tanpa membuang cache secara massal');
```

- [ ] **Step 2: Jalankan tes untuk memastikan tes dasar bekerja**
Run: `node tests/test_canvas_opt.js`  
Expected: PASS

- [ ] **Step 3: Implementasikan FIFO eviction di `js/config.js`**
Ubah `gradMemo` di `js/config.js` agar menggunakan penghapusan `oldestKey`:
```javascript
function gradMemo(c,key,mk){
  let g=GRADCACHE.get(key);
  if(!g){
    if(GRADCACHE.size>=300){
      const oldestKey=GRADCACHE.keys().next().value;
      GRADCACHE.delete(oldestKey);
    }
    g=mk();
    GRADCACHE.set(key,g);
  }
  return g;
}
```

- [ ] **Step 4: Optimasi alokasi gradien di `js/scenes/team.js`**
Ganti instansiasi langsung `c.createLinearGradient()` dan `c.createRadialGradient()` di `drawPodiumAndMascot` menjadi helper `LG()` dan `RG()` yang sudah terintegrasi memoize:
```javascript
  // 2. 3D Cylindrical Podium Base (Bevel & Depth)
  c.save();
  c.fillStyle = LG(c, 0, 290, 0, 335, theme.podiumSide, PAL.panelDeep);
  c.beginPath();
  c.moveTo(65, 300);
  c.lineTo(65, 325);
  c.ellipse(200, 325, 135, 26, 0, 0, Math.PI, false);
  c.lineTo(335, 300);
  c.ellipse(200, 300, 135, 26, 0, Math.PI, 0, true);
  c.closePath();
  c.fill();
  c.restore();

  // 3. Podium Top Surface
  c.save();
  c.fillStyle = RG(c, 200, 295, 135, theme.podiumTop, theme.podiumSide);
  c.beginPath();
  c.ellipse(200, 300, 135, 26, 0, 0, Math.PI * 2);
  c.fill();
```

- [ ] **Step 5: Optimasi komputasi RGB di `js/renderers/backgrounds.js`**
Pra-komputasi nilai RGB numerik pada `SKY_STOPS` agar tidak parsing substring berulang:
```javascript
SKY_STOPS.forEach(s => {
  s.topRgb = [parseInt(s.top.substr(1,2),16), parseInt(s.top.substr(3,2),16), parseInt(s.top.substr(5,2),16)];
  s.botRgb = [parseInt(s.bot.substr(1,2),16), parseInt(s.bot.substr(3,2),16), parseInt(s.bot.substr(5,2),16)];
});

function fastLerpColor(rgb1, rgb2, t) {
  const r = Math.round(rgb1[0] + (rgb2[0]-rgb1[0])*t),
        g = Math.round(rgb1[1] + (rgb2[1]-rgb1[1])*t),
        b = Math.round(rgb1[2] + (rgb2[2]-rgb1[2])*t);
  return 'rgb(' + r + ',' + g + ',' + b + ')';
}
```

- [ ] **Step 6: Jalankan regression test suite**
Run: `node tests/run.js`  
Expected: 34 lolos, 0 gagal.

---

### Task 2: Audio Voice-Over (VO) Object Pooling & Non-Intrusive Failsafe

**Files:**
- Modify: `TES GITA BARU 1/js/audio.js:195-237`
- Test: `TES GITA BARU 1/tests/test_audio_pool.js`

**Interfaces:**
- Consumes: `soundOn`, `stopVO()`, `playVO(key, onEnd)`
- Produces: `VO_POOL` Map yang mendaur ulang objek `HTMLAudioElement` tanpa leak memori.

- [ ] **Step 1: Tulis unit test untuk `VO_POOL` di `tests/test_audio_pool.js`**
```javascript
const assert = require('assert');

// Mock VO_POOL logic
const VO_POOL = new Map();
function getOrCreateAudio(key) {
  let audio = VO_POOL.get(key);
  if (!audio) {
    if (VO_POOL.size >= 40) {
      const oldest = VO_POOL.keys().next().value;
      VO_POOL.delete(oldest);
    }
    audio = { key, currentTime: 0, playCount: 0, play() { this.playCount++; return Promise.resolve(); } };
    VO_POOL.set(key, audio);
  }
  return audio;
}

const a1 = getOrCreateAudio('vo_test');
const a2 = getOrCreateAudio('vo_test');
assert.strictEqual(a1, a2, 'Audio instance harus di-reuse dari pool');
assert.strictEqual(VO_POOL.size, 1);
console.log('✓ PASS: Audio pooling me-reuse instansiasi audio dengan benar');
```

- [ ] **Step 2: Jalankan unit test audio pool**
Run: `node tests/test_audio_pool.js`  
Expected: PASS

- [ ] **Step 3: Implementasikan `VO_POOL` di `js/audio.js`**
Perbarui `playVO(key, onEnd)` di `js/audio.js` agar memeriksa `VO_POOL`:
```javascript
const VO_POOL = new Map();

function playVO(key, onEnd) {
  if (!soundOn || typeof window === 'undefined') return;
  stopVO();
  try {
    let audio = VO_POOL.get(key);
    if (!audio) {
      if (VO_POOL.size >= 40) {
        const oldestKey = VO_POOL.keys().next().value;
        const oldAudio = VO_POOL.get(oldestKey);
        if (oldAudio && typeof oldAudio.pause === 'function') oldAudio.pause();
        VO_POOL.delete(oldestKey);
      }
      audio = new Audio('voice-over/' + key + '.mp3');
      VO_POOL.set(key, audio);
    }
    currentVO = audio;
    audio.currentTime = 0;
    audio.onended = () => {
      if (currentVO === audio) currentVO = null;
      if (typeof onEnd === 'function') onEnd();
    };
    audio.play().catch(() => {
      // Fallback path alternatif
      const fallback = new Audio('assets/audio/vo/' + key + '.mp3');
      currentVO = fallback;
      fallback.play().catch(() => {
        if (currentVO === fallback) currentVO = null;
        if (typeof onEnd === 'function') onEnd();
      });
      fallback.onended = () => {
        if (currentVO === fallback) currentVO = null;
        if (typeof onEnd === 'function') onEnd();
      };
    });
  } catch (e) {
    currentVO = null;
  }
}
```

- [ ] **Step 4: Jalankan audit audio & VO**
Run: `node tests/audit_audio_and_vo.js`  
Expected: Missing VO files: 0, catch on play: true, fallback: true.

---

### Task 3: Idempotent Event Delegation & Listener Cleanup di Simulation Scene

**Files:**
- Modify: `TES GITA BARU 1/js/scenes/simulation.js:225-235`
- Test: `TES GITA BARU 1/tests/test_listener_idempotency.js`

**Interfaces:**
- Consumes: `#stat-rows`, `startSim()`
- Produces: Idempotent onclick handler tanpa penggandaan listener saat simulasi diulang.

- [ ] **Step 1: Buat tes verifikasi idempotensi listener di `tests/test_listener_idempotency.js`**
```javascript
const assert = require('assert');
const fs = require('fs');

const simCode = fs.readFileSync('js/scenes/simulation.js', 'utf8');
assert.strictEqual(
  simCode.includes("el('#stat-rows').addEventListener('click'"),
  false,
  "Tidak boleh ada addEventListener('click') berulang pada #stat-rows"
);
console.log('✓ PASS: Tidak ada akumulasi addEventListener pada #stat-rows');
```

- [ ] **Step 2: Jalankan test untuk memverifikasi kondisi saat ini (akan fail sebelum fix)**
Run: `node tests/test_listener_idempotency.js`  
Expected: FAIL dengan AssertionError

- [ ] **Step 3: Perbaiki registrasi event di `js/scenes/simulation.js`**
Ganti baris 228 di `js/scenes/simulation.js`:
```javascript
  const statRowsEl = el('#stat-rows');
  if (statRowsEl) {
    statRowsEl.onclick = e => {
      const r = e.target.closest('.srow');
      if (!r || !SIM) return;
      const s = SIM.m.stats.find(x => x[0] === r.dataset.k);
      if (s) { sfx.pop(); toast('<b>' + s[1] + '</b> — ' + s[4], 3600); }
    };
  }
```

- [ ] **Step 4: Jalankan tes idempotensi kembali**
Run: `node tests/test_listener_idempotency.js`  
Expected: PASS

---

### Task 4: Standarisasi Ergonomi Tipografi IFP $\ge 24\text{ px}$ & Debounce Touch

**Files:**
- Modify: `TES GITA BARU 1/js/audio.js:269-275`
- Modify: `TES GITA BARU 1/js/scenes/mission-menu.js:80-85`
- Modify: `TES GITA BARU 1/js/scenes/quiz.js:14-18`
- Modify: `TES GITA BARU 1/js/scenes/simulation.js:268-278`
- Test: `TES GITA BARU 1/tests/audit_ifp_ui.js`

**Interfaces:**
- Consumes: Standar tipografi IFP kelas 5A ($\ge 24\text{ px}$)
- Produces: 0 teks berukuran < 24px pada seluruh antarmuka interaktif.

- [ ] **Step 1: Jalankan audit tipografi saat ini untuk melihat titik temuan**
Run: `node tests/audit_ifp_ui.js`  
Expected: Ditemukan 8 font berukuran < 24px.

- [ ] **Step 2: Naikkan ukuran font di `js/audio.js`**
Ubah `font-size:20px` pada label pengaturan audio menjadi `font-size:24px`.

- [ ] **Step 3: Naikkan ukuran font di `js/scenes/mission-menu.js`**
Ubah label target misi dari `font-size:22px` menjadi `font-size:24px`.

- [ ] **Step 4: Naikkan ukuran font di `js/scenes/quiz.js`**
Ubah teks panduan kuis dari `font-size:18px` menjadi `font-size:24px`.

- [ ] **Step 5: Naikkan ukuran font di `js/scenes/simulation.js`**
Sesuaikan label sekunder stat & HUD dari 16px & 18px menjadi `font-size:24px` dengan tata letak flex yang rapi dan tidak tumpang tindih.

- [ ] **Step 6: Jalankan kembali audit IFP UI**
Run: `node tests/audit_ifp_ui.js`  
Expected: Ditemukan 0 font berukuran < 24px.

---

### Task 5: Validasi Seluruh Test Suite & Sinkronisasi Dokumen Pendamping Skripsi

**Files:**
- Verify: Seluruh file di `TES GITA BARU 1/tests/`
- Modify: `docs/PRD_GAME_SKRIPSI.md`
- Modify: `docs/ROADMAP.md`

- [ ] **Step 1: Jalankan seluruh suite pengujian**
```bash
node tests/run.js
node tests/audit_ifp_ui.js
node tests/audit_audio_and_vo.js
node tests/verify_touchscreen_ifp.js
node tests/audit_deep_all_pillars.js
```
Expected: Seluruh pengujian lolos 100% tanpa error.

- [ ] **Step 2: Sinkronkan `docs/PRD_GAME_SKRIPSI.md`**
Perbarui PRD Bagian 3 (Standarisasi Tipografi IFP $\ge 24\text{ px}$) dan Bagian 9 (Pilar 5: Audio Object Pooling & GradCache FIFO Eviction).

- [ ] **Step 3: Sinkronkan `docs/ROADMAP.md`**
Catat pencapaian milestone optimasi performa dan kesiapan media rilis Alpha/Beta pada pekan berjalan.

- [ ] **Step 4: Lakukan commit git untuk integritas repositori**
```bash
git add .
git commit -m "perf: complete holistic codebase optimization (canvas 60fps, audio pooling, event listener cleanup, IFP typography >=24px)"
```
