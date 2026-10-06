# Spesifikasi Desain: Optimasi Ergonomi IFP & Anti-Vibe-Coding (Standalone HTML)

**Dokumen Referensi:** `docs/superpowers/specs/2026-10-03-standalone-html-ifp-optimization-design.md`  
**Target:** `D:\SKRIPSI GITA\TES GITA BARU 1\index.html`  
**Tanggal:** 3 Oktober 2026  
**Status:** Approved by User via `/grill-me`

---

## 1. Latar Belakang & Masalah
File `TES GITA BARU 1/index.html` merupakan media pembelajaran interaktif berbasis canvas HTML5 murni dan DOM UI yang ditargetkan untuk layar *Interactive Flat Panel* (IFP 65"–86" resolusi 1920×1080) di kelas 5A SDN Percobaan 2 Malang.

Berdasarkan audit codebase, ditemukan beberapa kelemahan kritis:
1. **Tipografi Terlalu Kecil untuk Jarak Pandang Kelas:** Ditemukan 26 deklarasi font berukuran di bawah $24\text{px}$ (18px, 19px, 20px, 21px, 22px, 23px) pada pill materi, deskripsi istilah, kartu aksi, dan footer, yang tidak terbaca dari meja siswa (5–8 meter).
2. **Kesan Wireframe / Vibe Coding Kaku:** Penggunaan border outline kawat melingkar (`border: 3px solid ...`, `box-shadow inset`) pada hampir seluruh kartu, badge, tombol, dan panel. Sesuai aturan skripsi, UI game wajib menggunakan *Tonal Glassmorphism* (kontras bidang gelap bertingkat tanpa stroke kaku).
3. **Ergonomi Layout Dock & Kamus:** Ruang kartu aksi dock bawah dan grid 3-kolom kamus menjadi sesak jika font diperbesar ke $\ge 24\text{px}$ tanpa penataan ulang bertingkat.
4. **Debug Widget Menempel:** Masih terdapat widget meteran FPS di pojok kiri atas dan spam `console.log('[FPS] ...')` setiap 500ms yang mengganggu layar IFP.

---

## 2. Tujuan & Kriteria Keberhasilan (Success Criteria)
1. **0 Font < 24px:** Skrip audit python `audit_standalone_fonts.py` harus menghasilkan `0 font < 24px` di seluruh file CSS/HTML/JS `index.html`.
2. **Anti-Vibe-Coding (Tonal Glassmorphism):** Seluruh kartu dalam, status pill, badge peran, dan dock bebas dari border stroke kawat. Stroke halus hanya diperbolehkan pada active state ring dan outer stage.
3. **Ergonomi Sentuh & Zero Text Bleeding:**
   - Dock kartu aksi bawah ditata bertingkat dengan tombol aksi setinggi 54px dan active press feedback.
   - Kamus Alam menggunakan grid 2-kolom lapang dengan pembungkus teks (`line-height: 1.45`).
   - Seluruh touch target $\ge 44\text{px}$.
4. **Clean Release:** Layar IFP dan konsol browser 100% bebas dari widget FPS meter dan log berulang.
5. **Sinkronisasi Dokumen Pendamping:** PRD dan ROADMAP terbarui secara proaktif.

---

## 3. Komponen Perubahan Arsitektur

### 3.1 Tipografi & Skala Font IFP
| Komponen | Ukuran Lama | Ukuran Baru | Keterangan |
| :--- | :--- | :--- | :--- |
| `.boost-badge` | 18px | 24px | Badge keahlian tim |
| `.q-strip .b` | 19px | 24px | Nomor urut target misi (lingkaran diperbesar ke 38×38px) |
| `.bio-chain .cp` | 20px | 24px | Pill rantai makanan bioma |
| `.dock-tile .sm` | 20px | 24px | Peran tim pada selector |
| `.menu-card .mc-s` | 21px | 24px | Deskripsi sub-menu judul |
| `.dc-role` | 21px | 24px | Deskripsi peran aksi dock |
| `.kcard p` | 21px | 24px | Deskripsi singkat istilah kamus |
| `.dc-quota` | 21px | 24px | Indikator kuota aksi |
| `.mtype`, `.mstatus`, `.spec-ribbon` | 22px | 24px | Badge info misi |
| `.bio-desc`, `.q-strip`, `.chain-pill` | 22px | 24px | Narasi bioma & target |
| `.title-foot`, `.hero-spec`, `.dock-tile` | 23px | 25px | Footer & selector |
| `.dc-tt`, `.dc-btn`, `.vote-card p` | 23px | 25px | Judul & tombol aksi dock |

### 3.2 Tonal Glassmorphism Styling
- Ganti `border: 3px solid #0f7a55` pada `.panel-deep`, `.dock-card`, `.kcard`, `.srow` dengan:
  - `background: rgba(2, 44, 34, 0.95);`
  - `border: none;`
  - `box-shadow: 0 12px 28px rgba(0, 0, 0, 0.45);`
- Card aktif / terpilih: `box-shadow: 0 0 0 3px #f5a30b, 0 12px 28px rgba(0, 0, 0, 0.45);`
- Chunky Button: `box-shadow: 0 6px 0 #064e3b;` (efek 3D fisik tanpa border outline).

### 3.3 Penataan Ulang Layout (Dock & Kamus)
- **Dock Kartu Aksi (`.sim-dock`):**
  - Lebar: 1480px, tinggi otomatis bertingkat.
  - Kartu aksi (`.dock-card`): Padding 14px 18px, penataan vertikal yang rapi:
    1. Header: Ikon (34px) + Judul Aksi (25px Fredoka) + Badge Keahlian (jika ada).
    2. Peran Aksi: Subteks (24px Nunito, opasitas 0.9).
    3. Tombol Aksi: Tinggi 54px, font 25px Fredoka chunky button.
    4. Footer: Kuota Aksi (24px) + Mini Progress Bar Cooldown (10px).
- **Kamus Modal (`kamusModal`):**
  - Grid: `grid-template-columns: 1fr 1fr; gap: 20px;`
  - Kartu: `<h3>` 26px Fredoka + `<p>` 24px Nunito line-height 1.45.
  - Detail atas: Font 26px Fredoka / 24px Nunito dengan background tonal yang nyaman.

### 3.4 Pembersihan Debug Meter
- Hapus deklarasi `const FPSM = ...`
- Hapus fungsi `fpsInit()` dan `fpsTick(t)`
- Hapus pemanggilan `fpsTick(t)` pada `loop(t)` dan `fpsInit()` pada `init()`
