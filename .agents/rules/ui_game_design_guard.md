# ATURAN BAKU: UI GAME DESIGN & CANVAS LAYOUT GUARD (PHASER 3)

Aturan ini bersifat **WAJIB DAN MENGIKAT** bagi asisten AI (Antigravity Agent) saat merancang, memodifikasi, atau membenahi antarmuka pengguna (UI) pada seluruh file scene Phaser (`WEBSITE/js/phaser-game/scenes/*.js`).

---

### 1. ATURAN MATEMATIKA KANVAS & ZERO LAYOUT SHIFTING
1. **Dilarang Menggunakan `originY = 0.5` pada Teks Multiline Dinamis:**
   - Teks yang kalimatnya dapat berubah panjang secara dinamis (seperti ucapan Gita, petunjuk misi, atau feedback) **WAJIB MENGGUNAKAN `setOrigin(0, 0)`**.
   - Posisi vertikal $Y$ harus dikunci mati di bawah header atau plakat pembungkusnya, sehingga ketika teks membengkak dari 1 baris menjadi 2–3 baris, teks **mengalir ke bawah**, BUKAN meloncat ke atas menimpa judul (*zero layout shifting*).
2. **Wajib Memasang `wordWrap` Sesuai Lebar Kontainer (Anti-Text Bleeding):**
   - Setiap teks di dalam kartu atau tombol harus memiliki formula pembatas:
     $$\text{wordWrap.width} = \text{Lebar Kontainer} - (2 \times \text{Padding Sisi})$$
   - Dilarang keras membiarkan teks panjang tanpa `wordWrap` hingga tembus keluar batas border.
3. **Ketinggian Kontainer Berbanding Ukuran Font:**
   - Font $24\text{px}$ membutuhkan tinggi wadah kapsul minimal **$34\text{px} - 36\text{px}$**.
   - Tombol interaktif minimal **$44\text{px}$**.
   - Jarak bebas vertikal antar-elemen bertingkat minimal **$4\text{px} - 8\text{px}$** (tidak boleh berhimpitan 0px).

---

### 2. STANDAR TIPOGRAFI ULTRA-LARGE IFP ($\ge 24\text{px}$ MUTLAK)
1. **Batas Bawah Absolut 24px:**
   - Tidak boleh ada deklarasi font berukuran di bawah $24\text{px}$ di scene manapun (0 toleransi).
   - Validasi wajib dijalankan setelah setiap perubahan scene menggunakan:
     ```powershell
     python scripts/audit_fonts.py
     ```
   - Skrip harus melaporkan `0 dari N font berukuran di bawah 24px`.
2. **Kontras Warna Tinggi:**
   - Gunakan palet resmi: `#ffffff` (Putih), `#fef08a` (Emas Cerah), `#34d399` (Mint), `#38bdf8` (Cyan), `#f87171` (Coral Bahaya).
   - Hindari warna gelap redup yang tidak terbaca dari jarak meja siswa (5–8 meter).

---

### 3. ERGONOMI LAYAR SENTUH IFP (1920×1080)
1. **Margin Aman Layar:**
   - Jangan letakkan elemen kontrol menempel pada koordinat $X = 0$ atau $X = 1920$. Berikan margin tepi minimal $25\text{px} - 50\text{px}$ secara simetris matematis.
2. **Target Sentuh Jemari Siswa (Fitts's Law):**
   - Tombol utama minimal $44 \times 44\text{px}$ (ideal: lebar $100\text{px} - 400\text{px}$, tinggi $44\text{px} - 72\text{px}$).
   - Setiap tombol interaktif wajib memiliki umpan balik sentuh:
     `setScale(0.96)` saat ditekan dan audio klik `soundEngine.playBeep()`.

---

### 4. PRIORITASKAN VECTOR GLASSMORPHISM DIBANDINGKAN STRETCHED BITMAP
1. **Hindari Distorsi 9-Slice:**
   - Jangan mendistorsi sprite border raster seperti `dialog_box` menjadi rasio pipih yang merusak resolusi tepi.
   - Gunakan kartu vektor murni dengan rounded corners dan fill alpha $0.92 - 0.98$.
2. **Manfaatkan Modul `UIHelper`:**
   - Gunakan factory terpusat [UIHelper.js](file:///d:/SKRIPSI%20GITA/WEBSITE/js/phaser-game/ui/UIHelper.js) (`createGlassCard`, `createChunkyButton`, `createStatusPill`, `createMascotBanner`) untuk menjaga konsistensi antar-scene.

---

### 5. ANTI-VIBE-CODING: ZERO HARSH OUTLINES & BORDERLESS TONAL UI
1. **Dilarang Stroke/Outline Berlebihan pada Card & Pill Badges:**
   - **Anti-Pattern Vibe Coding:** Dilarang membungkus setiap kontainer teks, badge, status pill, tag peran, dan kotak deskripsi dengan garis tepi kawat (*strokeRoundedRect*, `lineStyle(1.5-2px)`, dsb.). Penumpukan border stroke di setiap kartu menciptakan ilusi visual kaku dan terkesan seperti prototype mentah buatan AI (*vibe coding slop*).
   - **Gunakan Tonal Layering (Kontras Warna Bidang):** Bedakan hirarki visual menggunakan tingkat kegelapan/warna latar belakang (*background fill tint/translucency* seperti `0x000000` alpha 0.35–0.45 atau warna enamel gelap), BUKAN garis outline kawat.
   - **Pill & Badge Borderless:** Seluruh pill tag dan badge peran harus berupa bidang membulat solid atau semi-transparan tanpa garis outline.
   - **Tombol Chunky 3D Bebas Stroke:** Efek kedalaman 3D tombol dicapai murni melalui perbedaan warna *base shadow* (bevel bawah) dan *face color* (permukaan atas), bukan garis stroke melingkar.
   - **Batas Penggunaan Stroke:** Stroke halus hanya boleh dipakai pada bingkai terluar layar (*main macro frame*) atau indikator seleksi aktif (*active state ring*), bukan pada elemen konten di dalamnya.

---

### 6. BEBAS POLUSI EMOJI (ANTI-AI SLOP STANDARDS)
1. **Dilarang Spam Emoji pada Judul, Tombol, dan Status:**
   - Jangan menempelkan emoji pada setiap baris teks (misal: dilarang `🚪 KELUAR`, `⏱️ WAKTU`, `📢 TANYA TEMAN`, `👉 SELIDIKI! 🚀`, dsb.).
   - Gunakan tipografi teks bersih, elegan, dan profesional layaknya UI game komersial berkualitas tinggi.
2. **Ikon Representatif Fungsional:**
   - Ikon visual hanya diperbolehkan jika berfungsi sebagai tombol utilitas tunggal (seperti `🔊` untuk audio mute/unmute, `💡` untuk hint), atau menggunakan aset sprite/SVG resmi game (seperti sprite hewan, lencana medali tim, dan badge bioma).

---

### 7. CHECKLIST VERIFIKASI SEBELUM MENYELESAIKAN TUGAS
- [ ] Syntax check: `node -c [nama_file_scene].js` (Exit Code 0).
- [ ] Font audit: `python scripts/audit_fonts.py` (0 font $< 24$px).
- [ ] Emoji audit: Bersih dari dekorasi emoji berlebihan (*clean professional UI*).
- [ ] Outline audit: Card dalam dan pill badges bebas stroke kawat (*borderless tonal UI*).
- [ ] Unit test logic: `node WEBSITE/tests/test_simulation_logic.js`.
- [ ] Sinkronisasi dokumen pendamping di folder `docs/` (`PRD_GAME_SKRIPSI.md`, dll.).
