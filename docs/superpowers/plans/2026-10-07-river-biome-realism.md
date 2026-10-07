# River Biome Visual Realism Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Merombak tampilan ekosistem sungai (Bioma Sungai Air Tawar Nusantara) agar realistis, menghilangkan garis putus-putus aspal jalan raya, menerapkan alur tepian bergelombang organik, multi-layer water current shader dengan gradasi kedalaman & reaksi ekologis krisis, bebatuan kali granit berlumut 3D, vegetasi gelagah tepi sungai, perbukitan tropis berlapis, serta integrasi dinamis organisme air.

**Architecture:**
1. Layer Background & Lanskap (`js/renderers/backgrounds.js` - `sceneSungai`):
   - Perbukitan tropis berlapis (multi-layer hills with aerial haze & tree silhouettes).
   - Bentuk alur sungai organik dengan kurva kurvatur meander alami (atas y: 440–475px, bawah y: 785–825px).
   - Multi-layer river water shader: kedalaman air (tepian dangkal transparan ke palung dalam toska), riak arus sinusoidal caustics & specular glints, buih tepian alami (shoreline foam), serta pergeseran warna reaktif krisis (lumpur cokelat saat erosi, buih deterjen saat racun).
2. Layer Bantaran & Vegetasi (`js/renderers/characters.js` - `texSoilSungai`):
   - Kontur tepian tanah liat basah & pasir aluvial yang meliuk mengikuti kurva sungai.
   - Bebatuan kali granit 3D besar dengan lumut hijau basah (*mossy river boulders*).
   - Rumpun gelagah/ilalang air tepi sungai (*river reeds / cattails*) yang bergoyang dinamis ditiup angin.
3. Layer Organisme & Animasi Alam (`js/renderers/characters.js` - `gulmaPatch`, `spFish`, `spStork`):
   - Eceng gondok mengambang dengan dinamika terombang-ambing (*gentle water bobbing & tilt*).
   - Ikan berenang dengan kedalaman pembiasan air (*subsurface water depth*).
   - Bangau bertengger alami di atas batu kali/tepian lumpur.
4. Layer Verifikasi & Sinkronisasi Skripsi:
   - Skrip tes verifikasi otomatis (`tests/verify_river_realism.js`).
   - Dokumen PRD Game (`docs/PRD_GAME_SKRIPSI.md`) dan Roadmap R&D (`docs/ROADMAP.md`).

**Tech Stack:** HTML5 2D Canvas API, Procedural Math (trigonometry, noise, Bezier), Vanilla JavaScript ES6+.

**Spec:** Kesepakatan `/grill-me` (Alur Bergelombang Organik, Menghilangkan Efek Jalan Raya, Multi-layer Water Shader Reaktif Ekologis, Ekosistem Tepian Tropis Lengkap, dan Integrasi Organisme Hidup).

---

### Task 1: Layer Bantaran Tanah, Bebatuan Kali 3D, & Vegetasi Gelagah (`js/renderers/characters.js`)

**Files:**
- Modify: `d:\SKRIPSI GITA\TES GITA BARU 1\js\renderers\characters.js`

**Interfaces:**
- Produces: Updated `texSoilSungai(c, t, S)`, helper `drawRiverReeds(c, x, y, t, seed)`, helper `drawRiverBoulder(c, x, y, rx, ry, col, moss)`.
- Defines top and bottom organic river boundary functions so both soil and water share identical organic curves.

- [x] **Step 1: Define organic river shoreline curve equations**
Buat fungsi matematis kurva bibir sungai agar garis tepian tanah dan permukaan air menyatu sempurna tanpa celah:
```javascript
function getRiverBankTop(x, t) {
  return 460 + Math.sin(x * 0.0035 + 0.5) * 16 + Math.cos(x * 0.007) * 8;
}
function getRiverBankBottom(x, t) {
  return 805 + Math.sin(x * 0.003 + 1.2) * 18 + Math.cos(x * 0.0065 + 0.4) * 9;
}
```

- [x] **Step 2: Implement natural river boulders with 3D bevels & moss**
Implementasikan fungsi penggambaran batu kali granit bergradasi dengan bayangan jatuh dan lumut basah:
```javascript
function drawRiverBoulder(c, x, y, rx, ry, baseCol, hasMoss) { ... }
```

- [x] **Step 3: Implement swaying river reeds / cattails**
Tambahkan rumpun tanaman gelagah tepi sungai yang bergoyang alami tertiup angin:
```javascript
function drawRiverReeds(c, x, y, t, count, seed) { ... }
```

- [x] **Step 4: Refactor `texSoilSungai` to render organic riverbanks, mud silt line, boulders, and reeds**
Rombak `texSoilSungai(c, t, S)` di `characters.js`:
- Bantaran atas menggunakan path kurva Bezier mengikuti `getRiverBankTop`.
- Bantaran bawah menggunakan path kurva Bezier mengikuti `getRiverBankBottom`.
- Bibir lumpur basah bergradasi gelap di perbatasan air.
- Gugusan batu kali granit 3D di tepian atas dan bawah.
- Rumpun gelagah air di sepanjang bantaran.

---

### Task 2: Multi-layer Water Shader, Caustics, & Real-time Ecological Reactions (`js/renderers/backgrounds.js`)

**Files:**
- Modify: `d:\SKRIPSI GITA\TES GITA BARU 1\js\renderers\backgrounds.js`

**Interfaces:**
- Consumes: `getRiverBankTop`, `getRiverBankBottom`, `wdisp(S)`, `S.lumpur`, `S.poison`, `S.water`
- Produces: Realistic river water rendering in `sceneSungai(c, t, S)` without dashed lines.

- [x] **Step 1: Replace plain background hill with layered tropical hills & tree silhouettes**
Di `sceneSungai`:
- Lapisan bukit jauh (far hills) dengan kabut atmosferik lembut (`#486b4a`, opacity 0.5).
- Lapisan bukit tengah (mid hills) dengan kontur bergelombang alami (`#5a8c54`).
- Siluet mahkota pepohonan tropis di punggung bukit kejauhan.

- [x] **Step 2: Eliminate highway dashed lines and draw organic river water body**
Hapus total:
```javascript
c.strokeStyle='rgba(255,255,255,.28)';c.lineWidth=4;c.setLineDash([46,34]); ...
```
Gantikan dengan pengisian path tertutup (*closed path polygon*) antara `getRiverBankTop(x)` dan `getRiverBankBottom(x)` menggunakan gradasi kedalaman:
- Tepian dangkal: toska transparan dengan dasar pasir/kerikil tampak samar.
- Palung tengah: warna hijau toska zamrud sungai tropis pekat (`#1c5e53` ke `#2e7d70`).

- [x] **Step 3: Implement dynamic ecological water color shift**
Tambahkan reaksi warna air terhadap krisis ekologi:
- Jika `S.lumpur` tinggi: gradasi air beralih ke cokelat lumpur aluvial (`#826b48` / `#5c4a30`).
- Jika `S.poison` tinggi: warna air memudar kusam kehijauan abu-abu dengan kilau buih kimia.
- Jika `S.water` surut: palung air menyempit dan kedalaman berkurang.

- [x] **Step 4: Implement fluid sinusoidal river caustics, specular glints, & shoreline foam**
- Riak arus berlapis: 6 kurva sinusoidal mengalir dengan kecepatan horizontal diferensial (`t * 0.08`, `t * 0.12`).
- Kilau pantulan cahaya matahari (*specular glints*): partikel elips mikro berkilau lembut yang hanyut mengikuti arus.
- Garis buih alami (*shoreline foam wash*) yang berdenyut lembut di sepanjang bibir lengkungan sungai.

---

### Task 3: Organism Dynamics & Subsurface River Integration (`js/renderers/characters.js` & `backgrounds.js`)

**Files:**
- Modify: `d:\SKRIPSI GITA\TES GITA BARU 1\js\renderers\characters.js`
- Modify: `d:\SKRIPSI GITA\TES GITA BARU 1\js\renderers\backgrounds.js`

**Interfaces:**
- Produces: Enhanced `gulmaPatch` with water bobbing & tilt, fish subsurface water blending, stork perching.

- [x] **Step 1: Enhance `gulmaPatch` with wave bobbing and gentle pitch tilt**
Di `characters.js`:
Modifikasi `gulmaPatch(c, x, y, s, t)` agar tanaman eceng gondok terombang-ambing vertikal $\pm 5$ px dan memiliki rotasi sudut halus $\pm 0.05$ rad mengikuti frekuensi arus air sungai.

- [x] **Step 2: Enhance fish swimming with subsurface water tint**
Di `backgrounds.js`:
Saat menggambar `sungai_fish`, terapkan sedikit perpaduan kedalaman air (semi-transparan jika berenang di palung dalam) agar terasa berenang di dalam air, bukan melayang di atas kanvas.

- [x] **Step 3: Natural stork positioning on riverbank rocks**
Pastikan posisi bangau (`sungai_stork`) bertengger alami di atas batu kali/lumpur tepian bantaran bawah.

---

### Task 4: Automated Testing & Verification

**Files:**
- Create: `d:\SKRIPSI GITA\TES GITA BARU 1\tests\verify_river_realism.js`

**Interfaces:**
- Consumes: `js/renderers/backgrounds.js`, `js/renderers/characters.js`
- Produces: Test report verifying zero dashed highway lines, presence of organic bank functions, boulders, reeds, layered hills, and syntax validity.

- [x] **Step 1: Write test script `tests/verify_river_realism.js`**
Validasi:
1. Tidak ada lagi `setLineDash([46,34])` pada `sceneSungai`.
2. Keberadaan `getRiverBankTop` dan `getRiverBankBottom`.
3. Keberadaan `drawRiverBoulder` dan `drawRiverReeds`.
4. Keberadaan reaksi warna air krisis (`S.lumpur`, `S.poison`).
5. Sintaks seluruh file JS valid tanpa error.

- [x] **Step 2: Run test suite with Node.js and verify 100% pass**
Jalankan `node tests/verify_river_realism.js` dan pastikan semua lulus.

- [x] **Step 3: Run full regression test suite `tests/run.js`**
Pastikan 34 tes regresi tetap hijau tanpa gangguan.

---

### Task 5: Skripsi Companion Documents Synchronization

**Files:**
- Modify: `d:\SKRIPSI GITA\docs\PRD_GAME_SKRIPSI.md`
- Modify: `d:\SKRIPSI GITA\docs\ROADMAP.md`

**Interfaces:**
- Consumes: Hasil implementasi visual realism ekosistem sungai
- Produces: Dokumentasi Bagian 3 & 9 PRD dan progres R&D Roadmap.

- [x] **Step 1: Update `docs/PRD_GAME_SKRIPSI.md`**
Catat di Bagian 3 (Poin 6 - Desain Visual Taktil & Realisme Ekosistem) dan Bagian 9 (Spesifikasi Teknis):
- Arsitektur visual Sungai Nusantara (Organic Meander, Procedural Water Caustics, River Boulders, Riverine Flora).
- Penghapusan total garis putus-putus aspal dan transisi ke fluida dinamis 60 FPS.

- [x] **Step 2: Update `docs/ROADMAP.md`**
Tambahkan catatan penyempurnaan realisme ekosistem sungai tropis pada milestone Pekan 11.
