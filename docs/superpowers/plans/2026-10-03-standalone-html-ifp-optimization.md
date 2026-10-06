# Standalone HTML IFP Ergonomics & Anti-Vibe-Coding Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Mengoptimalkan game standalone `D:\SKRIPSI GITA\TES GITA BARU 1\index.html` untuk layar sentuh IFP kelas 5A dengan standardisasi font $\ge 24$px, penerapan Tonal Glassmorphism bebas border kaku (anti-vibe-coding), penataan ulang layout Dock dan Kamus 2-kolom, serta pembersihan debug FPS meter.

**Architecture:** Modifikasi langsung pada single-file `TES GITA BARU 1/index.html` yang memisahkan CSS visual ke tonal layering semi-transparan, penyesuaian markup dinamis pada generator JavaScript (Dock dan Kamus), penghapusan instrumentasi FPS sementara, dan penjaminan kualitas menggunakan skrip verifikasi Python independen.

**Tech Stack:** HTML5, Vanilla CSS3 (Tonal Glassmorphism), Vanilla JavaScript ES6 (Canvas 2D & Web Audio API), Python 3 (Audit Verification Script).

**Spec:** `docs/superpowers/specs/2026-10-03-standalone-html-ifp-optimization-design.md`

## Global Constraints
- Standar Font IFP: Seluruh deklarasi font di dalam CSS, style inline, dan template string JS wajib $\ge 24\text{px}$ mutlak (0 toleransi untuk font $< 24\text{px}$).
- Anti-Vibe-Coding: Dilarang menggunakan border outline kawat melingkar (`border: 3px solid ...`) pada kartu dalam, badge, pills, dan dock; kedalaman visual wajib dicapai menggunakan *tonal layering* (kontras warna bidang).
- Ergonomi IFP: Ukuran touch target tombol minimal $44\text{px}$ (tombol dock $54\text{px}$).
- Clean Release: Tidak ada widget FPS meter atau console logging berulang yang muncul di layar siswa.
- Zero Layout Shifting & Anti-Text Bleeding: Kontainer teks dinamis wajib memiliki padding dan `word-wrap` aman.

---

### Task 1: Buat Skrip Audit Tipografi Standalone (`scripts/audit_standalone_fonts.py`)

**Files:**
- Create: `scripts/audit_standalone_fonts.py`
- Test: `python scripts/audit_standalone_fonts.py`

**Interfaces:**
- Produces: Skrip CLI Python yang memindai `D:\SKRIPSI GITA\TES GITA BARU 1\index.html` untuk mencari semua `font-size: <N>px`, `font: ... <N>px`, dan variasi inline style, lalu mengembalikan status exit code 0 (jika 0 font < 24px) atau exit code 1 (jika ditemukan font < 24px).

- [ ] **Step 1: Tulis skrip audit `scripts/audit_standalone_fonts.py`**

```python
import os
import re
import sys

TARGET_FILE = os.path.join(os.path.dirname(__file__), "..", "TES GITA BARU 1", "index.html")

def audit_fonts():
    if not os.path.exists(TARGET_FILE):
        print(f"ERROR: File target tidak ditemukan di {TARGET_FILE}")
        sys.exit(2)

    with open(TARGET_FILE, "r", encoding="utf-8", errors="ignore") as f:
        content = f.read()

    patterns = [
        (r'font-size:\s*(\d+)px', 'font-size: Xpx'),
        (r'font:\s*(\d+)px', 'font: Xpx'),
        (r'fontSize\s*=\s*[\'"](\d+)px[\'"]', 'fontSize = "Xpx"'),
        (r'font:\s*[\'"]?(\d+)px\s+monospace[\'"]?', 'font: Xpx monospace')
    ]

    violations = []
    for pattern, desc in patterns:
        for match in re.finditer(pattern, content):
            size = int(match.group(1))
            if size < 24:
                start = max(0, match.start() - 30)
                end = min(len(content), match.end() + 30)
                snippet = content[start:end].replace('\n', ' ')
                violations.append((size, desc, snippet.strip()))

    print(f"=== AUDIT TIPOGRAFI STANDALONE IFP (Batas Bawah >= 24px) ===")
    print(f"File: {TARGET_FILE}")
    print(f"Jumlah pelanggaran (< 24px): {len(violations)}")
    
    if violations:
        print("\nDaftar font berukuran di bawah 24px:")
        for size, desc, snippet in violations:
            print(f"  - [{size}px] ({desc}) -> ...{snippet}...")
        print("\nSTATUS: GAGAL (Terdapat font < 24px)")
        sys.exit(1)
    else:
        print("\nSTATUS: LULUS (Semua font >= 24px)")
        sys.exit(0)

if __name__ == "__main__":
    audit_fonts()
```

- [ ] **Step 2: Jalankan skrip audit untuk memverifikasi baseline kegagalan**

Run: `python scripts/audit_standalone_fonts.py`  
Expected: Exit code 1 dengan daftar ~26 pelanggaran font berukuran 18px–23px.

- [ ] **Step 3: Commit skrip audit**

```bash
git add scripts/audit_standalone_fonts.py
git commit -m "test: add standalone HTML IFP font audit script"
```

---

### Task 2: Standardisasi Tipografi Ultra-Large IFP ($\ge 24$px Mutlak)

**Files:**
- Modify: `TES GITA BARU 1/index.html` (blok `<style>` dan inline style JS)
- Test: `python scripts/audit_standalone_fonts.py`

**Interfaces:**
- Consumes: Skrip `scripts/audit_standalone_fonts.py`
- Produces: Seluruh deklarasi font di `index.html` berukuran $\ge 24$px.

- [ ] **Step 1: Tingkatkan seluruh font-size kecil di blok `<style>`**
  - `.menu-card .mc-s`: ubah `font-size:21px;` $\rightarrow$ `font-size:24px;`
  - `.title-foot`: ubah `font-size:23px;` $\rightarrow$ `font-size:25px;`
  - `.hero-motto`: `25px` (sudah $\ge 24$)
  - `.hero-dossier`: ubah `font-size:24px;` $\rightarrow$ `font-size:25px;`
  - `.hero-spec`: ubah `font-size:23px;` $\rightarrow$ `font-size:25px;`
  - `.dock-tile`: ubah `font-size:23px;` $\rightarrow$ `font-size:25px;`
  - `.mhead`, `.mtask`: `24px` (sudah $\ge 24$)
  - `.mtype`: ubah `font-size:22px;` $\rightarrow$ `font-size:24px;`
  - `.mstatus`: ubah `font-size:22px;` $\rightarrow$ `font-size:24px;`
  - `.spec-ribbon`: ubah `font-size:22px;` $\rightarrow$ `font-size:24px;`
  - `.bio-tag`: ubah `font-size:23px;` $\rightarrow$ `font-size:25px;`
  - `.bio-desc`: ubah `font-size:22px;` $\rightarrow$ `font-size:24px;`
  - `.bio-chain .cp`: ubah `font-size:20px;` $\rightarrow$ `font-size:24px;`
  - `.hpod .r1`: ubah `font-size:23px;` $\rightarrow$ `font-size:25px;`
  - `.gita-plaque .tag`: ubah `font-size:22px;` $\rightarrow$ `font-size:24px;`
  - `.q-strip`: ubah `font-size:22px;` $\rightarrow$ `font-size:24px;`
  - `.q-strip .b`: ubah `font-size:19px; width:30px; height:30px;` $\rightarrow$ `font-size:24px; width:38px; height:38px;`
  - `.srow .sn b`: ubah `font-size:23px;` $\rightarrow$ `font-size:24px;`
  - `.dock-ribbon`: ubah `font-size:23px;` $\rightarrow$ `font-size:25px;`
  - `.dc-tt`: ubah `font-size:23px;` $\rightarrow$ `font-size:25px;`
  - `.dc-role`: ubah `font-size:21px;` $\rightarrow$ `font-size:24px;`
  - `.dc-btn`: ubah `font-size:23px;` $\rightarrow$ `font-size:25px;`
  - `.dc-quota`: ubah `font-size:21px;` $\rightarrow$ `font-size:24px;`
  - `.boost-badge`: ubah `font-size:18px;` $\rightarrow$ `font-size:24px;`
  - `.vote-card p`: ubah `font-size:23px;` $\rightarrow$ `font-size:25px;`
  - `.kcard p`: ubah `font-size:21px;` $\rightarrow$ `font-size:24px;`
  - `.ktab`: ubah `font-size:23px;` $\rightarrow$ `font-size:25px;`
  - `.chain-pill`: ubah `font-size:22px;` $\rightarrow$ `font-size:24px;`

- [ ] **Step 2: Tingkatkan font-size inline di dalam kode JS**
  - Pada `renderTeam()`: `el('#t-dock').innerHTML=...` ubah `<span class="sm" style="font-size:20px;opacity:.8">` $\rightarrow$ `font-size:24px;`
  - Periksa seluruh template string `style="font-size:..."` di script.

- [ ] **Step 3: Jalankan verifikasi font audit**

Run: `python scripts/audit_standalone_fonts.py`  
Expected: Output `STATUS: LULUS (Semua font >= 24px)` dengan 0 pelanggaran (kecuali monospace FPS yang akan dibersihkan di Task 5).

- [ ] **Step 4: Commit perubahan tipografi**

```bash
git add "TES GITA BARU 1/index.html"
git commit -m "feat(typography): upgrade standalone HTML to ultra-large IFP standard (>=24px)"
```

---

### Task 3: Anti-Vibe-Coding (Tonal Glassmorphism & Chunky Button Overhaul)

**Files:**
- Modify: `TES GITA BARU 1/index.html` (CSS rules)

**Interfaces:**
- Consumes: Tipografi IFP Task 2
- Produces: Gaya visual Tonal Glassmorphism bebas border kawat pada panel, HUD, dock cards, kamus, dan modal.

- [ ] **Step 1: Refaktor kelas `.panel`, `.panel-deep`, `.srow`, `.kcard`, `.dock-card`**
  - Ganti `border: 3px solid #f5a30b;` dan `border: 3px solid #0f7a55;` dengan:
    - `.panel`: `background: rgba(4, 46, 36, 0.95); border: none; box-shadow: 0 16px 36px rgba(0,0,0,.45);`
    - `.panel-deep`: `background: rgba(2, 38, 29, 0.96); border: none; box-shadow: 0 14px 32px rgba(0,0,0,.45);`
    - `.srow`: `background: rgba(4, 52, 40, 0.85); border: none; box-shadow: 0 4px 12px rgba(0,0,0,.25);`
    - `.kcard`: `background: rgba(4, 50, 38, 0.92); border: none; box-shadow: 0 6px 16px rgba(0,0,0,.3);`
    - `.dock-card`: `background: rgba(3, 44, 34, 0.96); border: none; box-shadow: 0 10px 24px rgba(0,0,0,.4);`
- [ ] **Step 2: Terapkan active state ring & chunky 3D buttons**
  - Active / selected item (misal `.dock-tile.on`, `.kcard:hover`, `.srow:hover`): gunakan `box-shadow: 0 0 0 3px #f5a30b, 0 8px 20px rgba(0,0,0,.35);` (ring halus kontras, bukan wireframe melingkar).
  - Chunky button: pastikan bevel bawah solid (`box-shadow: 0 6px 0 #064e3b, 0 12px 20px rgba(0,0,0,.35);`) dan saat `:active` translate $5\text{px}$ dengan bayangan menipis.
  - Borderless status pill: `.mtype`, `.mstatus`, `.spec-ribbon`, `.chain-pill`, `.boost-badge` gunakan warna solid/tonal tanpa `border: 2px/3px solid`.

- [ ] **Step 3: Verifikasi via skrip pemeriksaan CSS**

Run: `powershell -Command "Select-String -Path 'd:\SKRIPSI GITA\TES GITA BARU 1\index.html' -Pattern 'border:\s*[234]px\s+solid'"`  
Expected: Border 2-4px kawat hanya tersisa pada canvas/frame makro utama bila diperlukan, hilang dari seluruh card/pill.

- [ ] **Step 4: Commit perubahan visual styling**

```bash
git add "TES GITA BARU 1/index.html"
git commit -m "feat(ui): overhaul standalone HTML to borderless tonal glassmorphism"
```

---

### Task 4: Re-layout Adaptif Dock Kartu Aksi & Kamus 2-Kolom

**Files:**
- Modify: `TES GITA BARU 1/index.html` (CSS layout & JS DOM templates)

**Interfaces:**
- Consumes: Tonal Glassmorphism Task 3
- Produces: Dock kartu aksi bertingkat yang proporsional dan Kamus Alam 2-kolom lapang yang bebas dari *text bleeding*.

- [ ] **Step 1: Perbarui layout Dock Kartu Aksi (`.sim-dock`, `.dock-card`, `.dock-grid`)**
  - Perlebar `.sim-dock` menjadi `width: 1540px; bottom: 20px;`
  - Ubah struktur HTML di `buildHUD()` untuk `.dock-card`:
    - Baris 1: Header atas berisi Ikon (34px), Nama Aksi (`.dc-tt` 25px), dan Badge Keahlian Tim (`.boost-badge` 24px) dengan layout flex space-between.
    - Baris 2: Sub-deskripsi peran aksi (`.dc-role` 24px, `color: #a7f3d0; line-height: 1.3; min-height: 48px;`).
    - Baris 3: Tombol Aksi (`.dc-btn`: tinggi 54px, font 25px Fredoka, chunky button).
    - Baris 4: Footer berisi Kuota (`.dc-quota` 24px) dan Mini Progress Bar Cooldown (`height: 10px; border-radius: 999px;`).
- [ ] **Step 2: Perbarui layout Modal Kamus Alam (`kamusModal`)**
  - Ubah `.kgrid` menjadi: `display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-top: 14px;`
  - Perbarui rendering kartu kamus di `kamusModal()`:
    - Judul istilah: font-size 26px Fredoka emas `#fef08a`.
    - Deskripsi singkat: font-size 24px Nunito `#d1fae5`, `line-height: 1.45`.
    - Detail kotak atas (`#kdet`): perbesar padding dan gunakan font 26px Fredoka + 25px Nunito line-height 1.55.

- [ ] **Step 3: Uji fungsi interaktif Dock dan Kamus**
  - Pastikan tombol klik aksi dock, tombol penyelesaian misi (`.finish`), dan klik kartu kamus tetap merespons dengan event handler yang berjalan normal.

- [ ] **Step 4: Commit perubahan layout Dock dan Kamus**

```bash
git add "TES GITA BARU 1/index.html"
git commit -m "feat(layout): refactor action dock and dictionary to 2-column adaptive layout"
```

---

### Task 5: Clean Release (Pembersihan FPS Meter & Log Konsol)

**Files:**
- Modify: `TES GITA BARU 1/index.html`
- Test: `python scripts/audit_standalone_fonts.py` & syntax check

**Interfaces:**
- Produces: Kode bersih bebas FPS meter dan bebas console logging berulang.

- [ ] **Step 1: Hapus blok instrumentasi FPS sementara**
  - Hapus deklarasi objek `FPSM = { ... }` (baris ~1490–1501).
  - Hapus fungsi `fpsInit()` dan `fpsTick(t)`.
  - Hapus pemanggilan `fpsTick(t);` di dalam fungsi `loop(t)`.
  - Hapus pemanggilan `fpsInit();` di dalam fungsi `init()`.
- [ ] **Step 2: Jalankan audit font final**

Run: `python scripts/audit_standalone_fonts.py`  
Expected: `STATUS: LULUS (Semua font >= 24px)` dengan total 0 pelanggaran.

- [ ] **Step 3: Uji integritas JavaScript**

Run: `powershell -Command "node -c 'd:\SKRIPSI GITA\TES GITA BARU 1\index.html'"` (atau ekstrak script blok dan uji dengan `node -c`)  
Expected: Exit code 0, sintaks JavaScript valid tanpa error parsing.

- [ ] **Step 4: Commit pembersihan clean release**

```bash
git add "TES GITA BARU 1/index.html"
git commit -m "chore(perf): remove debug FPS meter and repetitive console logging for clean release"
```

---

### Task 6: Sinkronisasi Dokumen Pendamping Skripsi (PRD & ROADMAP)

**Files:**
- Modify: `docs/PRD_GAME_SKRIPSI.md`
- Modify: `docs/ROADMAP.md`

**Interfaces:**
- Consumes: Seluruh hasil optimasi Task 1–5
- Produces: Pembaruan dokumentasi skripsi sesuai aturan `GEMINI.md`.

- [ ] **Step 1: Perbarui `docs/PRD_GAME_SKRIPSI.md`**
  - Catat implementasi standar ergonomi IFP ($\ge 24$px), Tonal Glassmorphism, dan 2-kolom Kamus pada varian media standalone HTML.
- [ ] **Step 2: Perbarui `docs/ROADMAP.md`**
  - Tambahkan checklist milestone penyelesaian optimasi versi standalone HTML pada Pekan 8–12.
- [ ] **Step 3: Commit sinkronisasi dokumen**

```bash
git add docs/PRD_GAME_SKRIPSI.md docs/ROADMAP.md
git commit -m "docs: sync companion PRD and ROADMAP with standalone HTML IFP ergonomics milestone"
```
