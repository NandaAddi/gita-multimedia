# SPESIFIKASI DESAIN ARSITEKTURAL: ECO-EXPLORER PENJAGA KESEIMBANGAN EKOSISTEM
**Tanggal:** 2026-10-01  
**Status:** Disetujui (Approved)  
**Dokumen:** `docs/superpowers/specs/2026-10-01-multi-ecosystem-progression-design.md`  
**Sasaran:** Siswa Kelas V SDN Percobaan 2 Malang (IPAS Fase C - Bab 2: Harmoni dalam Ekosistem)  
**Platform:** Layar Sentuh Interactive Flat Panel (IFP) 65-86 Inch & Web Browser Offline  

---

## 1. IKHTISAR EKSEKUTIF & TUJUAN
Game mengalami transformasi menyeluruh dari fokus bioma tunggal (*Penjaga Keseimbangan Sawah*) menjadi platform petualangan sains makro: **"ECO-EXPLORER: Penjaga Keseimbangan Ekosistem"**.

### Pilar Perubahan Utama:
1. **Identitas Baru:** Judul, billboard, dialog sapaan, dan antarmuka mengusung 4 Ekosistem Nusantara.
2. **4 Tipe Ekosistem:** Sawah, Hutan Tropis, Sungai (Air Tawar), dan Laut (Terumbu Karang).
3. **Kategorisasi Misi Dualitas (Faktor Kausalitas Kurikulum Merdeka):**
   - **Faktor Ulah Alam:** Perubahan iklim, kemarau panjang, suhu panas, pendangkalan alami.
   - **Faktor Ulah Manusia:** Perburuan liar, penebangan liar (deforestasi), racun pestisida, limbah detergen, bom ikan, dan sampah plastik samudra.
   - Total: 4 Ekosistem $\times$ 2 Misi = **8 Misi Penyelidikan**.
4. **Sistem Bintang (1–3 ⭐):** Evaluasi performa berdasarkan keberhasilan simulasi ekosistem ($\ge 75\%$) dan ketepatan penalaran kuis sebab-akibat (C2). Total: 24 Bintang.
5. **Kunci Progresi Linier Penuh (*Sequential Progression Lock*):**
   - Siswa harus menyelesaikan Misi 1 (Simulasi + Kuis) untuk membuka Misi 2 pada ekosistem yang sama.
   - Siswa harus menyelesaikan seluruh misi pada ekosistem aktif untuk membuka gembok ekosistem berikutnya:  
     $$\text{Sawah} \longrightarrow \text{Hutan Tropis} \longrightarrow \text{Sungai} \longrightarrow \text{Laut}$$

---

## 2. ARSITEKTUR TEKNIS (UNIFIED DATA-DRIVEN ENGINE)

Pendekatan implementasi menggunakan **Pendekatan A: Unified Data-Driven Engine**. Logika simulasi utama tetap terpusat di [`SimulationScene.js`](file:///d:/SKRIPSI%20GITA/WEBSITE/js/phaser-game/scenes/SimulationScene.js), sedangkan parameter bioma, sprite organisme, suara latar, aksi sentuh, dan kuis dikendalikan oleh konfigurasi modular `ECOSYSTEM_CONFIG`.

### 2.1 Alur Adegan (*Scene Flow Diagram*)
```
[TitleScene] 
  Judul: "ECO-EXPLORER: Penjaga Keseimbangan Ekosistem"
    │
    ▼
[TutorialScene]
  Mengenalkan 4 Bioma, Konsep Faktor Alam vs Manusia, dan Cara Voting Meja
    │
    ▼
[TeamSelectScene]
  Pilih Tim Detektif Kelas (Elang, Ular, Katak, Padi, Jamur)
    │
    ▼
[BiomeSelectScene] (PETA 4 EKOSISTEM NUSANTARA)
  - 🌾 Sawah (Terbuka Pertama Kali)
  - 🌲 Hutan Tropis (Terkunci 🔒 sampai Sawah Misi 2 tuntas)
  - 🏞️ Sungai (Terkunci 🔒 sampai Hutan Misi 2 tuntas)
  - 🌊 Laut (Terkunci 🔒 sampai Sungai Misi 2 tuntas)
  - Tampilan Perolehan Bintang per Bioma & Tombol Reset Guru
    │
    ▼
[MissionMenuScene] (PILIH 2 MISI PER BIOMA)
  - Misi 1: Faktor Ulah Alam (Terbuka)
  - Misi 2: Faktor Ulah Manusia (Terkunci 🔒 sampai Misi 1 lulus)
  - Modal Briefing Kasus Anti-Tumpuk (Depth 201)
    │
    ▼
[SimulationScene] (MESIN SIMULASI MULTI-BIOMA DATA-DRIVEN)
  - Dinamis memuat background, sprite pool, indikator krisis, & kartu aksi
  - Waktu 7 Menit, Bar Kesehatan Ekosistem, Tanya Teman CSCL, Kamus Ensiklopedia
    │
    ▼
[QuizScene] (KUIS SEBAB-AKIBAT C2 SPESIFIK MISI)
  - Pertanyaan kausalitas interaktif berbasis LKPD
    │
    ▼
[VictoryScene] (EVALUASI BINTANG & BUKAAN GEMBOK)
  - Menghitung 1-3 Bintang (⭐)
  - Membuka kunci misi/ekosistem berikutnya di localStorage
  - Navigasi lanjut misi atau kembali ke peta ekosistem
```

---

## 3. MODEL DATA & MANAJEMEN PENYIMPANAN (*STATE PERSISTENCE*)

Progres siswa disimpan di `localStorage` dengan fallback aman ke `Phaser.Registry` menggunakan kunci `eco_explorer_save_v2`:

```javascript
const DEFAULT_SAVE_STATE = {
  version: 2,
  unlockedEcosystems: ['sawah'],
  currentEcosystem: 'sawah',
  missions: {
    // 🌾 Ekosistem Sawah
    'sawah_m1': { unlocked: true, completed: false, stars: 0, bestHealth: 0, quizPassed: false },
    'sawah_m2': { unlocked: false, completed: false, stars: 0, bestHealth: 0, quizPassed: false },
    // 🌲 Ekosistem Hutan Tropis
    'hutan_m1': { unlocked: false, completed: false, stars: 0, bestHealth: 0, quizPassed: false },
    'hutan_m2': { unlocked: false, completed: false, stars: 0, bestHealth: 0, quizPassed: false },
    // 🏞️ Ekosistem Sungai
    'sungai_m1': { unlocked: false, completed: false, stars: 0, bestHealth: 0, quizPassed: false },
    'sungai_m2': { unlocked: false, completed: false, stars: 0, bestHealth: 0, quizPassed: false },
    // 🌊 Ekosistem Laut
    'laut_m1': { unlocked: false, completed: false, stars: 0, bestHealth: 0, quizPassed: false },
    'laut_m2': { unlocked: false, completed: false, stars: 0, bestHealth: 0, quizPassed: false }
  },
  totalStars: 0
};
```

---

## 4. MATRIKS SPESIFIKASI 8 SKENARIO MISI (DATA-DRIVEN CONFIG)

### 4.1 🌾 Ekosistem Sawah (`id: 'sawah'`)
* **Latar Belakang:** `bg_sawah` | **Lencana:** `badge_sawah`
* **Organisme:** Padi (`padi_subur`, `padi_kering`), Tikus (`tikus`), Ular (`ular`), Katak (`katak`), Elang (`elang`), Jamur (`jamur`).
* **Misi 1 (Ulah Alam): *"Tanah Retak Kekeringan"***
  - *Krisis:* Musim kemarau panjang, air sawah turun drastis (< 20%), padi layu.
  - *Tindakan Kunci:* Alirkan air irigasi, tanam tunas padi tahan kering, pantau pemangsa.
  - *Soal Kuis C2:* "Mengapa saat tanah sawah kering dan tanaman padi mati, elang dan ular ikut kelaparan?"
* **Misi 2 (Ulah Manusia): *"Bahaya Racun & Jerat Petani"***
  - *Krisis:* Ular diburu petani dan semprotan racun kimia membunuh katak, tikus meledak.
  - *Tindakan Kunci:* Lepas ular sawah, kembalikan katak sahabat petani, netralkan racun kimia tanah.
  - *Soal Kuis C2:* "Jika petani memburu semua ular di sawah karena takut digigit, apa akibat buruknya bagi hasil panen padi?"

### 4.2 🌲 Ekosistem Hutan Tropis (`id: 'hutan'`)
* **Latar Belakang:** `bg_hutan` | **Lencana:** `badge_hutan`
* **Organisme:** Pohon Rimba (`pohon_hutan`), Rusa (`rusa`), Harimau (`harimau`), Jamur Hutan (`jamur_hutan`), Sisa Tebangan (`kayu_tebang`).
* **Misi 3 (Ulah Alam): *"Kemarau & Pohon Kering"***
  - *Krisis:* Suhu panas terik mengeringkan dedaunan rimba, rumput makanan rusa hangus.
  - *Tindakan Kunci:* Alirkan mata air rimba, tanam tunas pohon hutan, tebar jamur pengurai abu tanaman.
  - *Soal Kuis C2:* "Mengapa saat kemarau panjang membuat tumbuhan hutan mati, kawanan harimau terpaksa turun mencari makan ke dekat desa warga?"
* **Misi 4 (Ulah Manusia): *"Penebangan Liar & Jerat Pemburu"***
  - *Krisis:* Penebang liar menebang pohon dan pemburu memasang jerat harimau (`icon_deforestasi`).
  - *Tindakan Kunci:* Amankan jerat pemburu, selamatkan Harimau Sumatera, reboisasi bibit pohon rimba.
  - *Soal Kuis C2:* "Apa yang akan terjadi pada kawanan rusa jika pohon-pohon di hutan terus ditebang oleh orang tidak bertanggung jawab?"

### 4.3 🏞️ Ekosistem Sungai (`id: 'sungai'`)
* **Latar Belakang:** `bg_danau` | **Lencana:** `badge_danau`
* **Organisme:** Teratai (`teratai`), Eceng Gondok (`eceng_gondok`), Ikan Kecil (`ikan_kecil`), Keong Air (`keong`), Ikan Gabus (`ikan_gabus`), Bangau (`bangau`).
* **Misi 5 (Ulah Alam): *"Air Surut & Gulma Menutup"***
  - *Krisis:* Kemarau mendangkalkan sungai, gulma eceng gondok menutup air sehingga ikan lemas kehabisan oksigen.
  - *Tindakan Kunci:* Buka bendungan hulu sungai, bersihkan gulma eceng gondok, pulihkan oksigen air.
  - *Soal Kuis C2:* "Mengapa permukaan sungai yang tertutup rapat oleh tumbuhan eceng gondok bisa menyebabkan ikan-ikan di dalam air mati lemas?"
* **Misi 6 (Ulah Manusia): *"Racun Limbah & Sampah Plastik"***
  - *Krisis:* Limbah cair pabrik (`icon_limbah_danau`) dan sampah plastik meracuni ikan dan bangau.
  - *Tindakan Kunci:* Saring air dari limbah detergen kimia, angkut sampah plastik, lepas benih ikan gabus.
  - *Soal Kuis C2:* "Bagaimana racun limbah pabrik yang mencemari air sungai bisa sampai meracuni burung bangau pemakan ikan?"

### 4.4 🌊 Ekosistem Laut (`id: 'laut'`)
* **Latar Belakang:** `bg_laut` | **Lencana:** `badge_laut`
* **Organisme:** Terumbu Karang (`karang`), Ikan Karang Kecil (`ikan_kecil`), Penyu Laut (`penyu`), Hiu Samudra (`hiu`), Pengurai Laut (`pengurai_laut`).
* **Misi 7 (Ulah Alam): *"Air Laut Panas & Karang Memutih"***
  - *Krisis:* Pemanasan suhu air laut global (*coral bleaching*), karang memutih dan rapuh, ikan kecil kehilangan rumah.
  - *Tindakan Kunci:* Tanam bibit karang tahan suhu, jaga mikroba pengurai laut, seimbangkan zooplankton.
  - *Soal Kuis C2:* "Mengapa saat terumbu karang memutih dan rusak, ikan hiu sebagai pemangsa puncak samudra ikut kesulitan mencari makan?"
* **Misi 8 (Ulah Manusia): *"Ledakan Bom Ikan & Sampah Laut"***
  - *Krisis:* Nelayan memakai bom laut (`icon_bom_laut`) meremukkan karang dan plastik menjerat penyu (`icon_plastik_laut`).
  - *Tindakan Kunci:* Sita bom peledak, bersihkan sampah plastik laut, rawat penyu laut dan rehabilitasi karang.
  - *Soal Kuis C2:* "Mengapa menangkap ikan menggunakan bahan peledak bom laut dilarang keras dan justru merugikan masa depan anak cucu nelayan?"

---

## 5. SPESIFIKASI SISTEM BINTANG & EVALUASI KEMENANGAN

### 5.1 Rumus Perolehan Bintang
Pada akhir sesi setiap misi:
1. ⭐ **1 Bintang:** Kesehatan ekosistem berhasil dipulihkan hingga $\ge 75\%$ dan waktu belum habis.
2. ⭐⭐ **2 Bintang:** Memenuhi 1 Bintang + Jawaban Kuis C2 Sebab-Akibat benar.
3. ⭐⭐⭐ **3 Bintang:** Memenuhi 2 Bintang + Kesehatan ekosistem akhir $\ge 85\%$ dan kuis dijawab benar pada kesempatan pertama tanpa pengulangan.

### 5.2 Logika Pembukaan Gembok (*Unlock Progression Logic*)
* Setelah menyelesaikan Misi 1 $\rightarrow$ Save data menandai `missions[currentEcosystem + '_m1'].completed = true` dan `missions[currentEcosystem + '_m2'].unlocked = true`.
* Setelah menyelesaikan Misi 2 $\rightarrow$ Save data menandai bioma berikutnya dalam rantai (`sawah` $\rightarrow$ `hutan` $\rightarrow$ `sungai` $\rightarrow$ `laut`) sebagai `unlocked: true`.
* Pada layar kemenangan Misi 8 (Laut Misi 2), game menobatkan gelar agung: **"🏆 MAHA DETEKTIF PENJAGA KESEIMBANGAN NUSANTARA"**.

---

## 6. RENCANA PENGUJIAN & VALIDASI
1. **Verifikasi Progresi Bertahap:**
   - Masuk sebagai pemain baru: Hanya Bioma Sawah dan Misi 1 yang terbuka.
   - Selesaikan Misi 1: Verifikasi Misi 2 terbuka dengan gembok lepas.
   - Selesaikan Misi 2: Verifikasi Bioma Hutan Tropis terbuka di Peta Nusantara.
2. **Uji Reset Guru:** Tombol reset mengembalikan status ke kondisi awal (hanya Sawah M1 terbuka).
3. **Uji Bebas CORS:** Game dan dokumen pendamping tetap berjalan 100% offline via protokol `file://`.
4. **Zero Em-Dash Rule:** Seluruh naskah UI siswa terbebas dari karakter em-dash (`—`).
