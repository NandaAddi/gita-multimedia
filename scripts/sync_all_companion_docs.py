# -*- coding: utf-8 -*-
"""
scripts/sync_all_companion_docs.py
Sinkronisasi komprehensif dokumen akademik skripsi:
1. docs/PRD_GAME_SKRIPSI.md
2. docs/LKPD_DETEKTIF_SAWAH.md
3. docs/SKRIPSI.md
4. docs/ROADMAP.md
"""

import os
import re
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[1]
DOCS_DIR = REPO_ROOT / "docs"

# ============================================================
# 1. UPDATE PRD_GAME_SKRIPSI.md
# ============================================================
def update_prd():
    prd_path = DOCS_DIR / "PRD_GAME_SKRIPSI.md"
    content = prd_path.read_text(encoding="utf-8")

    # Update Section 4.1
    sec4_pattern = r'### 4\.1 Penyelesaian Masalah Kebosanan & Efek Mencontek.*?(?=---\r?\n\r?\n## 5\.)'
    new_sec4 = """### 4.1 Penyelesaian Masalah Kebosanan & Efek Mencontek (*The Bored Kids & Anti-Copycat Solutions*)
Jika semua kelompok memainkan misi yang sama berulang kali, siswa di meja akan bosan dan tim berikutnya hanya akan mereplikasi jawaban tanpa berpikir kritis (C2). Untuk mengatasinya:
1. **Model Kelompok Ahli Ekosistem (*Jigsaw Ecosystem Specialists*):** 25 Siswa dibagi ke dalam 4 Kelompok Ahli (6–7 siswa per kelompok) di mana setiap kelompok bertindak sebagai detektif spesialis satu ekosistem Nusantara:
   * 🌾 **Kelompok 1 (Detektif Sawah):** Menyelidiki 4 Misi Sawah (2 Faktor Alam: Kemarau & Hama Wereng; 2 Faktor Manusia: Racun Pestisida & Perburuan Ular).
   * 🌲 **Kelompok 2 (Detektif Hutan):** Menyelidiki 4 Misi Hutan Tropis (2 Faktor Alam: Kemarau Mata Air & Titik Api Ranting; 2 Faktor Manusia: Pembalakan Liar & Jerat Pemburu).
   * 🌊 **Kelompok 3 (Detektif Sungai):** Menyelidiki 4 Misi Sungai Tawar (2 Faktor Alam: Air Surut & Erosi Lumpur; 2 Faktor Manusia: Limbah Detergen & Setrum Listrik).
   * 🪸 **Kelompok 4 (Detektif Laut):** Menyelidiki 4 Misi Laut Karang (2 Faktor Alam: Pemanasan Karang & Gelombang Badai; 2 Faktor Manusia: Bom Ikan & Sampah Plastik).
2. **Akses Langsung Tanpa Hambatan (*Direct Biome Access*):** Memilih kelompok di panggung `#scr-team` langsung membuka Menu 4 Misi bioma tersebut (`#scr-mission`) dalam format Grid Komparatif 2x2. Tombol `👥 Ganti Kelompok` di pojok atas mempermudah rotasi kelompok di IFP.
3. **Progression Lock 2 Jalur Paralel:** Siswa bebas memilih memulai dari tantangan alam (Kolom Kiri) atau tantangan manusia (Kolom Kanan). Misi kedua di tiap jalur terbuka setelah misi pertama jalur tersebut diselesaikan ($\ge 1$ bintang).
4. **Peran Penasihat Meja & Kartu Voting CSCL:** Saat satu kelompok maju mengoperasikan layar sentuh IFP (6–7 siswa), kelompok lain di meja bertindak sebagai **Penasihat Meja** yang memegang Buku Catatan Detektif (LKPD Fisik), menganalisis prediksi hipotesis, dan serempak mengangkat kartu voting fisik 3 warna saat tombol `📢 TANYA TEMAN` ditekan.

```
                    [1. PEMBAGIAN 4 KELOMPOK JIGSAW KELAS 5A]
        25 Siswa dibagi menjadi 4 Kelompok Ahli Ekosistem (6–7 Siswa/Kelompok):
         🌾 Detektif Sawah | 🌲 Detektif Hutan | 🌊 Detektif Sungai | 🪸 Detektif Laut
                                       │
                                       ▼
                   [2. ROTASI KELOMPOK & PREDIKSI AWAL (PREDICT)]
        - Kelompok Aktif (6-7 Siswa) maju ke depan layar sentuh IFP 65–86"
        - Memilih kelompok di Layar Pahlawan -> Terbuka Menu 4 Misi Bioma Spesialis
        - Siswa di meja memegang LKPD Buku Catatan Detektif sesuai bioma aktif
        - Mencatat kondisi awal krisis dan merumuskan prediksi hipotesis (C2)
                                       │
                                       ▼
               [3. SIMULASI & AKSI PENYELAMATAN 4 BIOMA (OBSERVE)]
        - Timer Misi 7 Menit | Dinamika kaskade trofik 4 tingkat organisme
        - Memilih aksi taktil: pemulihan produsen, pengendalian predator, atau dekomposisi
        - Cooldown bar 1,2 detik memberi waktu reaksi ekosistem dan melatih diskusi tim
                                       │
                                       ▼
               [4. BANTUAN TEMAN DI MEJA (KARTU VOTING CSCL)]
        - Saat menghadapi dilema, Petugas Layar menyentuh tombol "📢 TANYA TEMAN"
        - Simulasi otomatis dijeda (paused) dan modal voting 15 detik tampil
        - Siswa di meja mengangkat KARTU WARNA FISIK (Kontekstual 4 Bioma):
          🟢 KARTU HIJAU: Tambah Pemangsa Alami / Dekomposer (Ular/Katak/Harimau/Bangau/Penyu/Jamur)
          🟡 KARTU KUNING: Pulihkan Produsen / Air (Irigasi/Mata Air/Pintu Air/Naungan Karang)
          🔴 KARTU MERAH: Atasi Kerusakan (Bersihkan Racun/Padamkan Api/Saring Limbah/Sita Bom)
        - Petugas Layar memasukkan keputusan terbanyak kelas -> timer berlanjut!
                                       │
                                       ▼
               [5. TEKA-TEKI SEBAB-AKIBAT DETEKTIF GITA (EXPLAIN)]
        - Misi Sukses: Kesehatan Ekosistem >= 75% stabil
        - Masuk ke Buku Catatan Detektif Gita (1 Soal Teka-Teki Kausalitas C2 Kontekstual)
        - Kelompok di depan dan siswa di meja mencatat analisis sebab-akibat di LKPD
                                       │
                                       ▼
             [6. BINTANG PENGHARGAAN & ROTASI KELOMPOK JIGSAW BERIKUTNYA]
        - Perolehan Skor 1–3 Bintang Prestasi (Maksimal 12 Bintang per Kelompok, Total 48 Bintang)
        - Misi kedua pada jalur terkait terbuka otomatis (Unlock)
        - Setelah 4 misi bioma tuntas, kelompok kembali ke meja
        - Kelompok berikutnya maju memecahkan 4 misi di ekosistem berikutnya
        - Tahap Akhir: Presentasi Silang Jigsaw (Berbagi temuan sebab-akibat antar-kelompok)
```

"""
    content = re.sub(sec4_pattern, lambda m: new_sec4, content, flags=re.DOTALL)

    # Update Section 6.2
    sec62_pattern = r'### 6\.2 Aturan Pembukaan Misi & Ekosistem \(Progression Lock\).*?(?=---\r?\n\r?\n## 7\.)'
    new_sec62 = """### 6.2 Aturan Pembukaan Misi & Ekosistem (Progression Lock)
1. **Akses Langsung Berbasis Kelompok (*Direct Biome Access*):**
   * Setiap Kelompok Detektif (🌾 Sawah, 🌲 Hutan, 🌊 Sungai, 🪸 Laut) memiliki akses langsung ke bioma spesialisasinya melalui Layar Pemilihan Kelompok (`team.js`).
   * Tidak ada pemblokiran antar-bioma karena arsitektur permainan mengikuti model pembelajaran kooperatif *Jigsaw*, di mana setiap kelompok berfokus mendalami satu ekosistem sebelum membagikan temuannya ke kelompok lain.
2. **Progression Lock 2 Jalur Paralel (Per Kelompok):**
   * **Misi 1 Ulah Alam** (Tantangan Alam 1) dan **Misi 3 Ulah Manusia** (Tantangan Manusia 1) langsung terbuka sejak awal bagi kelompok tersebut.
   * **Misi 2 Ulah Alam** (Tantangan Alam 2) terkunci dan **terbuka otomatis setelah Misi 1 Alam berhasil diselesaikan** ($\ge 1$ bintang).
   * **Misi 4 Ulah Manusia** (Tantangan Manusia 2) terkunci dan **terbuka otomatis setelah Misi 3 Manusia berhasil diselesaikan** ($\ge 1$ bintang).
   * Siswa dapat bebas mengulang (*replay*) misi mana pun yang telah terbuka untuk meningkatkan perolehan bintang menjadi 3.
3. **Penyimpanan Progres Lokal (*Persistent LocalStorage*):**
   * Seluruh status bintang dan kunci misi disimpan secara otomatis via `ProgressManager` di memori peramban (*LocalStorage*), sehingga data tidak hilang saat halaman di-refresh.
4. **Tombol Rotasi Kelompok Ergonomis:**
   * Disediakan tombol `👥 Ganti Kelompok` di pojok kanan atas menu misi untuk memfasilitasi estafet giliran di IFP sekolah dengan satu sentuhan.

"""
    content = re.sub(sec62_pattern, lambda m: new_sec62, content, flags=re.DOTALL)

    # Update Section 8 (16 Quiz Questions)
    sec8_pattern = r'## 8\. BUKU CATATAN DETEKTIF GITA: MASTER BANK TEKA-TEKI SEBAB-AKIBAT \(C2\).*?(?=---\r?\n\r?\n## 9\.)'
    new_sec8 = """## 8. BUKU CATATAN DETEKTIF GITA: MASTER BANK TEKA-TEKI SEBAB-AKIBAT (C2)

```
+----------------------------------------------------------------------------------------------------------------------------------------------------+
|                                      MASTER BANK TEKA-TEKI SEBAB-AKIBAT 16 MISI (DATA-DRIVEN QUIZ SCENE C2)                                        |
+----+--------+-----+---------------------------------------------+------------------------------------+---------------------------------------------+
| NO | BIOMA  | MIS | PERTANYAAN TEKA-TEKI KAUSALITAS C2          | JAWABAN TEPAT                      | PENJELASAN SAINS RAMAH ANAK                 |
+----+--------+-----+---------------------------------------------+------------------------------------+---------------------------------------------+
| 1  | Sawah  | M1  | Musim kemarau membuat padi kering.          | B. Tikus kehilangan makanan dan    | Padi adalah produsen utama sumber energi di |
|    |        |     | Mengapa elang dan ular ikut lapar?          |    berkurang, mangsa ikut habis.   | sawah. Jika padi mati, pemangsa lapar!      |
+----+--------+-----+---------------------------------------------+------------------------------------+---------------------------------------------+
| 2  | Sawah  | M2  | Mengapa basmi wereng pakai katak lebih baik | C. Katak pemangsa alami aman tanpa | Racun kimia membunuh serangga baik &        |
|    |        |     | daripada racun kimia keras?                 |    racuni tanah & air sawah.       | mencemari air. Predator alami ramah alam!   |
+----+--------+-----+---------------------------------------------+------------------------------------+---------------------------------------------+
| 3  | Sawah  | M3  | Semprot racun kimia berlebihan ke sawah.    | B. Racun meresap ke air & tanah,   | Racun kimia tidak memilah sasaran; ia       |
|    |        |     | Mengapa katak & cacing ikut mati?           |    racuni kulit katak & cacing.    | mematikan hewan penyubur & pemangsa alami!  |
+----+--------+-----+---------------------------------------------+------------------------------------+---------------------------------------------+
| 4  | Sawah  | M4  | Petani memburu semua ular sawah hingga      | A. Tikus meledak tak terkendali    | Ular adalah pengendali alami tikus. Tanpa   |
|    |        |     | habis. Apa yang terjadi pada tanaman padi?  |    memakan habis bulir padi.       | ular, tikus meledak & menggagalkan panen!   |
+----+--------+-----+---------------------------------------------+------------------------------------+---------------------------------------------+
| 5  | Hutan  | M1  | Kemarau keringkan rumput rimba. Mengapa     | B. Rusa lapar & berkurang, harimau | Produsen layu memicu herbivora berkurang,   |
|    |        |     | harimau turun mendekati permukiman?         |    sulit cari mangsa di hutan.     | memaksa predator puncak mencari makan!      |
+----+--------+-----+---------------------------------------------+------------------------------------+---------------------------------------------+
| 6  | Hutan  | M2  | Api bakar pohon rimba. Mengapa burung &     | C. Pohon tempat bersarang terbakar | Pohon menyediakan tajuk sarang, buah, dan   |
|    |        |     | monyet paling cepat menghilang?             |    dan buah pakan musnah.          | perlindungan bagi satwa arboreal rimba.     |
+----+--------+-----+---------------------------------------------+------------------------------------+---------------------------------------------+
| 7  | Hutan  | M3  | Akibat buruk jangka panjang jika bukit      | A. Akar penahan air hilang, tanah  | Akar pohon mengikat tanah dan menyerap air. |
|    |        |     | rimba ditebangi liar terus-menerus?         |    longsor & sumber air kering.    | Tanpa akar, erosi longsor melanda warga!    |
+----+--------+-----+---------------------------------------------+------------------------------------+---------------------------------------------+
| 8  | Hutan  | M4  | Jika Harimau Sumatera punah karena diburu,  | C. Rusa overpopulasi memakan habis | Predator puncak menjaga populasi herbivora  |
|    |        |     | apa dampaknya bagi pohon-pohon hutan?       |    tunas muda hingga hutan gundul. | agar tidak merusak tunas reboisasi alami!   |
+----+--------+-----+---------------------------------------------+------------------------------------+---------------------------------------------+
| 9  | Sungai | M1  | Permukaan sungai tertutup eceng gondok.     | B. Daun rapat tutupi sinar matahari| Fotosintesis bawah air terhenti dan difusi  |
|    |        |     | Mengapa ikan-ikan lemas dan mati?           |    sehingga air kekurangan oksigen.| udara terhalang, membuat kadar oksigen anjlok!|
+----+--------+-----+---------------------------------------------+------------------------------------+---------------------------------------------+
| 10 | Sungai | M2  | Mengapa lumpur erosi di dasar sungai        | A. Lumpur tutupi insang ikan napas | Lumpur keruh menyumbat insang, mematikan    |
|    |        |     | dapat mengancam kehidupan ikan?             |    dan kubur telur di dasar sungai.| fitoplankton, dan menimbun sarang telur ikan!|
+----+--------+-----+---------------------------------------------+------------------------------------+---------------------------------------------+
| 11 | Sungai | M3  | Bagaimana racun detergen pabrik membuat     | B. Racun diserap ikan kecil, lalu  | Bioakumulasi: zat berbahaya menumpuk makin  |
|    |        |     | bangau di puncak rantai makanan ikut mati?  |    ikan beracun dimakan bangau.    | pekat saat berpindah ke tingkat trofik atas!|
+----+--------+-----+---------------------------------------------+------------------------------------+---------------------------------------------+
| 12 | Sungai | M4  | Mengapa tangkap ikan pakai setrum listrik   | C. Sengatan listrik mematikan benih| Setrum membunuh massal tanpa memilih ukuran,|
|    |        |     | dilarang keras & merusak ekosistem?         |    ikan kecil & rusak rantai makan.| memusnahkan generasi penerus ikan sungai!   |
+----+--------+-----+---------------------------------------------+------------------------------------+---------------------------------------------+
| 13 | Laut   | M1  | Suhu air laut memanas & karang memutih.     | B. Karang mati tempat sembunyi &   | Karang adalah rumah, tempat memijah, dan    |
|    |        |     | Mengapa ikan karang ikut menghilang?        |    mencari makan ikan karang.      | pelindung bagi ribuan spesies ikan tropis!  |
+----+--------+-----+---------------------------------------------+------------------------------------+---------------------------------------------+
| 14 | Laut   | M2  | Terumbu karang redam 97% energi badai.      | A. Mencegah abrasi pantai dan      | Struktur kokoh karang adalah pemecah ombak  |
|    |        |     | Apa manfaatnya bagi pesisir pantai?         |    lindungi rumah warga pesisir.   | alami terkuat pelindung pemukiman nelayan!  |
+----+--------+-----+---------------------------------------------+------------------------------------+---------------------------------------------+
| 15 | Laut   | M3  | Butuh berapa lama karang pulih dari satu    | C. Puluhan tahun (20-30 tahun)     | Pertumbuhan karang sangat lambat (1-2 cm/th)|
|    |        |     | ledakan bom ikan penghancur?                |    karena tumbuh sangat lambat.    | Satu detik bom merusak warisan puluhan tahun!|
+----+--------+-----+---------------------------------------------+------------------------------------+---------------------------------------------+
| 16 | Laut   | M4  | Mengapa sampah plastik transparan di laut   | B. Plastik mirip ubur-ubur makanan | Penyu mengira plastik adalah ubur-ubur lalu |
|    |        |     | sangat mematikan bagi penyu hijau?          |    penyu, menyumbat pencernaan.    | menelannya hingga saluran pencernaan buntu! |
+----+--------+-----+---------------------------------------------+------------------------------------+---------------------------------------------+
```

"""
    content = re.sub(sec8_pattern, lambda m: new_sec8, content, flags=re.DOTALL)

    prd_path.write_text(content, encoding="utf-8")
    print("[SUCCESS] PRD_GAME_SKRIPSI.md updated.")

# ============================================================
# 2. UPDATE LKPD_DETEKTIF_SAWAH.md -> 4 KELOMPOK DETEKTIF
# ============================================================
def update_lkpd():
    lkpd_path = DOCS_DIR / "LKPD_DETEKTIF_SAWAH.md"
    lkpd_content = """# LEMBAR KERJA PESERTA DIDIK (LKPD) DIGITAL & CETAK
## "BUKU CATATAN 4 KELOMPOK DETEKTIF EKOSISTEM"
### Ekspedisi Sains Penjaga Keseimbangan Ekosistem Nusantara
**Mata Pelajaran:** Ilmu Pengetahuan Alam dan Sosial (IPAS) — Kurikulum Merdeka  
**Fase / Kelas:** Fase C / Kelas V (Lima) — Semester 1  
**Topik / Bab:** Harmoni dalam Ekosistem (Rantai Makanan & Keseimbangan Ekosistem)  
**Media Pembelajaran:** Game Simulasi *Eco-Explorer: Penjaga Keseimbangan Ekosistem* (Layar Sentuh IFP)  
**Sekolah:** SDN Percobaan 2 Malang  
**Penyusun:** Gito (Teknologi Pendidikan)

---

### 📋 IDENTITAS DETEKTIF CILIK:
* **Nama Siswa:** _____________________________________________
* **Nomor Presensi:** _______
* **Pilihan Kelompok Ahli (Beri Centang):**
  * [ ] 🌾 **Kelompok 1: Detektif Sawah** *(Spesialisasi Rantai Makanan Padi, Tikus, & Ular)*
  * [ ] 🌲 **Kelompok 2: Detektif Hutan** *(Spesialisasi Kanopi Rimba, Rusa, & Harimau)*
  * [ ] 🌊 **Kelompok 3: Detektif Sungai** *(Spesialisasi Aliran Air Tawar, Ikan, & Bangau)*
  * [ ] 🪸 **Kelompok 4: Detektif Laut** *(Spesialisasi Terumbu Karang, Penyu, & Hiu)*

---

### 🎯 TUJUAN PEMBELAJARAN (IPAS FASE C KELAS 5):
1. **TP 1:** Peserta didik mampu mengidentifikasi komponen biotik dan abiotik dalam berbagai jenis ekosistem.
2. **TP 2:** Peserta didik mampu memahami hubungan rantai makanan dan jaring-jaring makanan pada ekosistem hutan tropis, laut, sawah, dan sungai.
3. **TP 3:** Peserta didik mampu memprediksi (*inferring*) dampak perubahan jumlah populasi komponen biotik terhadap rantai makanan dalam suatu ekosistem.
4. **TP 4:** Peserta didik mampu menganalisis dampak perubahan populasi komponen biotik terhadap keseimbangan ekosistem, serta dampak aktivitas manusia terhadap keseimbangan ekosistem.

> 💡 *Catatan Guru:* LKPD ini mengadopsi model pembelajaran kooperatif **Jigsaw (Elliot Aronson)** dipadu siklus **POE (Predict - Observe - Explain)**. Setiap kelompok mendalami 4 misi pada ekosistemnya (2 Faktor Alam + 2 Faktor Manusia), lalu membagikan temuan sebab-akibat kepada kelompok lain pada sesi debriefing kelas.

---

### ⭐ SISTEM PENILAIAN BINTANG & BUKA KUNCI PARALEL:
Setiap misi memberikan hingga **3 Bintang Detektif** (Maksimal 12 Bintang per Kelompok, Total 48 Bintang Kelas):
* ⭐ **Bintang 1 (Stabilitas Ekosistem):** Mencapai Ukuran Kesehatan Ekosistem minimal **75% (Zona Hijau)** dan target checklist tercapai.
* ⭐⭐ **Bintang 2 (Penalaran Kausalitas C2):** Berhasil menuntaskan Kuis Refleksi Sebab-Akibat di Buku Catatan Detektif.
* ⭐⭐⭐ **Bintang 3 (Detektif Sejati - First Attempt):** Menjawab kuis sebab-akibat dengan **BENAR pada percobaan pertama** tanpa bantuan petunjuk ulang!

> 🔓 **Aturan Buka Kunci 2 Jalur Paralel (Progression Lock):**  
> • Jalur Alam: Misi 1 Alam terbuka awal. Misi 2 Alam terbuka setelah Misi 1 Alam tuntas (⭐ ≥ 1).  
> • Jalur Manusia: Misi 1 Manusia terbuka awal. Misi 2 Manusia terbuka setelah Misi 1 Manusia tuntas (⭐ ≥ 1).

---

### 🎮 PETUNJUK PERAN PENASIHAT MEJA & KARTU VOTING CSCL:
1. Saat kelompokmu belum mendapat giliran di depan layar IFP, kalian bertindak sebagai **"Penasihat Meja"**.
2. Amati layar IFP dengan seksama. Catat angka populasi hewan dan tanaman di tabel lembar kerja.
3. Siapkan **3 Kartu Voting Fisik** di meja kelompok kalian:
   * 🟢 **KARTU HIJAU:** Tambah pemangsa alami / pengurai penyubur (Ular / Katak / Harimau / Bangau / Penyu / Jamur).
   * 🟡 **KARTU KUNING:** Berikan aksi sumber daya / produsen (Irigasi Padi / Mata Air Rimba / Pintu Air Sungai / Naungan Karang).
   * 🔴 **KARTU MERAH:** Bersihkan pencemaran & hentikan perusakan (Bersihkan Racun / Padamkan Api / Saring Limbah / Sita Bom Ikan).
4. Ketika Petugas Layar menyentuh tombol **"📢 TANYA TEMAN"**, waktu simulasi dijeda (*paused*). Diskusikan strategi kelompok selama 15 detik lalu serempak angkat kartu warna pilihan kalian!
5. Gunakan tombol **"📖 KAMUS SAINS"** di bilah atas layar untuk menggali informasi ensiklopedia interaktif.

---

## 🌾 BAGIAN 1: INVESTIGASI KELOMPOK 1 — DETEKTIF SAWAH

### Misi 1: Kemarau Panjang di Sawah (Faktor Ulah Alam)
* **Kondisi Awal:** Air Sawah: ______ % | Rumpun Padi: ______ | Kesehatan: ______ %
* **Prediksi Kausalitas (C2):** Mengapa saat kemarau padi kering, tikus kelaparan dan ular sawah ikut terancam mati?  
  *Jawaban:* __________________________________________________________________________
* **Kartu Voting Meja:** [ ] 🟢 Hijau &nbsp;&nbsp; [ ] 🟡 Kuning &nbsp;&nbsp; [ ] 🔴 Merah | Alasan: ________________________
* **Hasil:** [ ] Seimbang (≥ 75%) | **Bintang:** [ ] ⭐1 &nbsp; [ ] ⭐⭐2 &nbsp; [ ] ⭐⭐⭐3

### Misi 2: Serbuan Hama Wereng Cokelat (Faktor Ulah Alam)
* **Kondisi Awal:** Populasi Wereng: ______ ekor (Lonjakan Hama) | Katak: ______ ekor
* **Prediksi Kausalitas (C2):** Mengapa membasmi wereng dengan predator alami (katak) lebih baik daripada racun kimia keras?  
  *Jawaban:* __________________________________________________________________________
* **Hasil:** [ ] Seimbang (≥ 75%) | **Bintang:** [ ] ⭐1 &nbsp; [ ] ⭐⭐2 &nbsp; [ ] ⭐⭐⭐3

### Misi 3: Bahaya Racun Pestisida Kimia (Faktor Ulah Manusia)
* **Kondisi Awal:** Tingkat Racun: ______ % | Populasi Cacing Tanah: ______
* **Prediksi Kausalitas (C2):** Mengapa racun kimia yang disemprot petani membuat katak dan cacing tanah ikut mati?  
  *Jawaban:* __________________________________________________________________________
* **Hasil:** [ ] Seimbang (≥ 75%) | **Bintang:** [ ] ⭐1 &nbsp; [ ] ⭐⭐2 &nbsp; [ ] ⭐⭐⭐3

### Misi 4: Perburuan Liar Ular Sawah (Faktor Ulah Manusia)
* **Kondisi Awal:** Populasi Ular: 0 ekor (Habis Diburu) | Populasi Tikus: ______ ekor
* **Prediksi Kausalitas (C2):** Petani memburu semua ular sawah hingga habis karena takut. Apa bahayanya bagi panen padi?  
  *Jawaban:* __________________________________________________________________________
* **Hasil:** [ ] Seimbang (≥ 75%) | **Bintang:** [ ] ⭐1 &nbsp; [ ] ⭐⭐2 &nbsp; [ ] ⭐⭐⭐3

---

## 🌲 BAGIAN 2: INVESTIGASI KELOMPOK 2 — DETEKTIF HUTAN

### Misi 1: Kemarau & Mata Air Rimba Kering (Faktor Ulah Alam)
* **Kondisi Awal:** Air Mata Air: ______ % | Rumput Pakan Rusa: ______ rumpun
* **Prediksi Kausalitas (C2):** Kemarau mengeringkan rumput rimba. Mengapa harimau turun mendekati permukiman desa?  
  *Jawaban:* __________________________________________________________________________
* **Hasil:** [ ] Seimbang (≥ 75%) | **Bintang:** [ ] ⭐1 &nbsp; [ ] ⭐⭐2 &nbsp; [ ] ⭐⭐⭐3

### Misi 2: Gesekan Ranting & Asap Hutan (Faktor Ulah Alam)
* **Kondisi Awal:** Titik Bara Api: ______ titik | Ketebalan Asap: ______ %
* **Prediksi Kausalitas (C2):** Ketika api membakar dahan rimba, mengapa burung dan monyet paling cepat menghilang?  
  *Jawaban:* __________________________________________________________________________
* **Hasil:** [ ] Seimbang (≥ 75%) | **Bintang:** [ ] ⭐1 &nbsp; [ ] ⭐⭐2 &nbsp; [ ] ⭐⭐⭐3

### Misi 3: Penebangan Liar Pohon Rimba (Faktor Ulah Manusia)
* **Kondisi Awal:** Pohon Ditebang: ______ batang | Tingkat Erosi Tanah: ______ %
* **Prediksi Kausalitas (C2):** Apa akibat buruk jangka panjang jika bukit rimba ditebangi liar terus-menerus?  
  *Jawaban:* __________________________________________________________________________
* **Hasil:** [ ] Seimbang (≥ 75%) | **Bintang:** [ ] ⭐1 &nbsp; [ ] ⭐⭐2 &nbsp; [ ] ⭐⭐⭐3

### Misi 4: Jerat Kawat Pemburu Harimau (Faktor Ulah Manusia)
* **Kondisi Awal:** Jerat Terpasang: ______ titik | Harimau Terluka: ______ ekor
* **Prediksi Kausalitas (C2):** Jika Harimau Sumatera punah karena diburu, apa dampaknya bagi pohon-pohon di hutan?  
  *Jawaban:* __________________________________________________________________________
* **Hasil:** [ ] Seimbang (≥ 75%) | **Bintang:** [ ] ⭐1 &nbsp; [ ] ⭐⭐2 &nbsp; [ ] ⭐⭐⭐3

---

## 🌊 BAGIAN 3: INVESTIGASI KELOMPOK 3 — DETEKTIF SUNGAI

### Misi 1: Air Surut & Ledakan Eceng Gondok (Faktor Ulah Alam)
* **Kondisi Awal:** Ketinggian Air: ______ % | Tutupan Eceng Gondok: ______ %
* **Prediksi Kausalitas (C2):** Permukaan air sungai tertutup rapat eceng gondok. Mengapa ikan lemas dan mati?  
  *Jawaban:* __________________________________________________________________________
* **Hasil:** [ ] Seimbang (≥ 75%) | **Bintang:** [ ] ⭐1 &nbsp; [ ] ⭐⭐2 &nbsp; [ ] ⭐⭐⭐3

### Misi 2: Erosi Tebing & Pendangkalan Lumpur (Faktor Ulah Alam)
* **Kondisi Awal:** Ketebalan Lumpur: ______ cm | Kekeruhan Air: ______ %
* **Prediksi Kausalitas (C2):** Mengapa lumpur erosi yang mengendap di dasar sungai dapat mengancam kehidupan ikan?  
  *Jawaban:* __________________________________________________________________________
* **Hasil:** [ ] Seimbang (≥ 75%) | **Bintang:** [ ] ⭐1 &nbsp; [ ] ⭐⭐2 &nbsp; [ ] ⭐⭐⭐3

### Misi 3: Limbah Kimia Detergen Pabrik (Faktor Ulah Manusia)
* **Kondisi Awal:** Busa Detergen: ______ % | Populasi Ikan Kecil: ______ ekor
* **Prediksi Kausalitas (C2):** Bagaimana racun detergen pabrik bisa membuat burung bangau pemangsa ikut mati?  
  *Jawaban:* __________________________________________________________________________
* **Hasil:** [ ] Seimbang (≥ 75%) | **Bintang:** [ ] ⭐1 &nbsp; [ ] ⭐⭐2 &nbsp; [ ] ⭐⭐⭐3

### Misi 4: Penangkapan Ikan Berbahaya / Setrum & Tuba (Faktor Ulah Manusia)
* **Kondisi Awal:** Ikan Mati Tersengat: ______ ekor | Benih Telur Ikan: Rusak
* **Prediksi Kausalitas (C2):** Mengapa menangkap ikan dengan setrum listrik dilarang keras dan merusak rantai makanan?  
  *Jawaban:* __________________________________________________________________________
* **Hasil:** [ ] Seimbang (≥ 75%) | **Bintang:** [ ] ⭐1 &nbsp; [ ] ⭐⭐2 &nbsp; [ ] ⭐⭐⭐3

---

## 🪸 BAGIAN 4: INVESTIGASI KELOMPOK 4 — DETEKTIF LAUT

### Misi 1: Air Laut Panas & Karang Memutih (Faktor Ulah Alam)
* **Kondisi Awal:** Suhu Air Laut: ______ °C | Karang Memutih (*Bleaching*): ______ %
* **Prediksi Kausalitas (C2):** Suhu air laut memanas dan karang memutih pucat. Mengapa ikan karang ikut menghilang?  
  *Jawaban:* __________________________________________________________________________
* **Hasil:** [ ] Seimbang (≥ 75%) | **Bintang:** [ ] ⭐1 &nbsp; [ ] ⭐⭐2 &nbsp; [ ] ⭐⭐⭐3

### Misi 2: Gelombang Badai Tropis & Karang Roboh (Faktor Ulah Alam)
* **Kondisi Awal:** Karang Patah: ______ rumpun | Padang Lamun Tertimbun Pasir: ______ %
* **Prediksi Kausalitas (C2):** Terumbu karang terbukti mampu meredam 97% energi badai. Apa manfaatnya bagi pesisir?  
  *Jawaban:* __________________________________________________________________________
* **Hasil:** [ ] Seimbang (≥ 75%) | **Bintang:** [ ] ⭐1 &nbsp; [ ] ⭐⭐2 &nbsp; [ ] ⭐⭐⭐3

### Misi 3: Bom Ikan Peledak Penghancur Karang (Faktor Ulah Manusia)
* **Kondisi Awal:** Kawah Rusak Ledakan: ______ titik | Karang Patah: Ratusan Tahun
* **Prediksi Kausalitas (C2):** Satu ledakan bom ikan membutuhkan waktu berapa lama agar karang dapat pulih seperti semula?  
  *Jawaban:* __________________________________________________________________________
* **Hasil:** [ ] Seimbang (≥ 75%) | **Bintang:** [ ] ⭐1 &nbsp; [ ] ⭐⭐2 &nbsp; [ ] ⭐⭐⭐3

### Misi 4: Sampah Plastik Samudra & Pukat Hanyut (Faktor Ulah Manusia)
* **Kondisi Awal:** Kantong Plastik Terapung: ______ lembar | Penyu Tersangkut Jaring: ______
* **Prediksi Kausalitas (C2):** Mengapa sampah kantong plastik transparan di laut sangat mematikan bagi penyu hijau?  
  *Jawaban:* __________________________________________________________________________
* **Hasil:** [ ] Seimbang (≥ 75%) | **Bintang:** [ ] ⭐1 &nbsp; [ ] ⭐⭐2 &nbsp; [ ] ⭐⭐⭐3

---

## 🧠 BAGIAN 5: PRESENTASI SILANG JIGSAW (DEBRIEFING KELAS 5A)
*Lengkapilah kesimpulan perbandingan antara Faktor Ulah Alam dan Faktor Ulah Manusia setelah mendengarkan presentasi teman:*

1. **Persamaan Dampak:** Baik faktor alam maupun manusia sama-sama dapat memutus _______________________ makanan.
2. **Perbedaan Pemulihan:** Kerusakan akibat ulah manusia (seperti bom ikan dan racun kimia) membutuhkan waktu pemulihan yang jauh lebih _______________________ dan lebih berbahaya daripada perubahan musim alami.
3. **Bagan Rantai Sebab-Akibat Detektif (Visual Causal Chain C2):**  
   ```
   [ Ulah Manusia / Gangguan Alam: _____________________________ ]
                               │
                               ▼
   [ Populasi Konsumen Pertama: ________________________________ ]
                               │
                               ▼
   [ Dampak pada Predator Puncak: ______________________________ ]
                               │
                               ▼
   [ Status Keseimbangan Ekosistem: ____________________________ ]
   ```

---

### 📊 RUBRIK PENILAIAN GURU KELAS 5A:
| Kriteria Penilaian | Skor 4 (Sangat Baik) | Skor 3 (Baik) | Skor 2 (Cukup) | Skor 1 (Perlu Bimbingan) |
| :--- | :--- | :--- | :--- | :--- |
| **Keaktifan Penasihat Meja** | Selalu mencatat data dan sigap mengangkat kartu voting warna saat Tanya Teman. | Aktif mencatat data dan ikut mengangkat kartu voting. | Kadang mencatat data, pasif saat voting. | Tidak mencatat dan tidak memperhatikan layar. |
| **Ketepatan Penalaran Sebab-Akibat (C2)** | Menjelaskan hubungan kausalitas trofik secara logis, konkret, dan tepat di 4 misi. | Menjelaskan hubungan sebab-akibat dengan benar namun singkat. | Penjelasan sebab-akibat kurang tepat/tertukar. | Belum mampu menjelaskan hubungan sebab-akibat. |
| **Pencapaian Bintang Misi** | Meraih bintang maksimal (10–12 Bintang per kelompok). | Meraih 7–9 Bintang per kelompok. | Meraih 4–6 Bintang per kelompok. | Meraih < 4 Bintang per kelompok. |
| **Kekompakan Petugas Layar di IFP** | Bekerja sama harmonis, menghargai jeda 1,2 detik, tidak spamming sentuh, saling bergantian. | Bekerja sama dengan baik di depan layar sentuh. | Sedikit berebut tombol sentuh IFP. | Rebutan layar dan tidak menghiraukan saran tim. |

**Total Bintang Kelompok:** ________ / 12 ⭐ &nbsp;&nbsp;&nbsp;&nbsp; **Nilai Akhir Siswa:** ________ / 100 &nbsp;&nbsp;&nbsp;&nbsp; **Tanda Tangan Guru:** _______________________
"""
    lkpd_path.write_text(lkpd_content, encoding="utf-8")
    print("[SUCCESS] LKPD_DETEKTIF_SAWAH.md updated to 4-group Jigsaw workbook.")

# ============================================================
# 3. UPDATE SKRIPSI.md
# ============================================================
def update_skripsi():
    skripsi_path = DOCS_DIR / "SKRIPSI.md"
    content = skripsi_path.read_text(encoding="utf-8")

    # Update D.2: 4 bioma x 4 misi = 16 misi
    old_d2 = r'### 2\. Ekspansi 4 Bioma Nusantara & Tipologi Gangguan \(Faktor Alam vs Faktor Manusia\).*?(?=### 3\. Gamifikasi Edukatif)'
    new_d2 = """### 2. Ekspansi 4 Bioma Nusantara & Tipologi 16 Misi Kausalitas (Faktor Alam vs Faktor Manusia)
Untuk mencegah miskonsepsi bahwa ekosistem hanya terbatas pada lingkungan sawah lokal, media dikembangkan mencakup **4 Bioma Representatif Nusantara** dengan total **16 Misi Kausalitas**:
1. **🌾 Sawah (Agroekosistem Terestrial):** Menyelidiki rantai makanan padi, wereng, katak, ular, elang, dan dekomposer jerami.
   * *2 Misi Ulah Alam:* M1 Kemarau Panjang & Padi Kering; M2 Ledakan Hama Wereng Cokelat.
   * *2 Misi Ulah Manusia:* M3 Racun Kimia Pestisida Mematikan; M4 Perburuan Liar Ular Sawah.
2. **🌲 Hutan Tropis (Bioma Hutan Hujan):** Menyelidiki pohon meranti, rusa, Harimau Sumatera, serangga, dan dekomposer humus.
   * *2 Misi Ulah Alam:* M1 Kemarau & Mata Air Rimba Kering; M2 Gesekan Ranting & Asap Hutan.
   * *2 Misi Ulah Manusia:* M3 Pembalakan Liar Pohon Rimba; M4 Jerat Kawat Pemburu Harimau.
3. **🏞️ Sungai Air Tawar (Ekosistem Perairan Lotik):** Menyelidiki fitoplankton, eceng gondok, ikan kecil, bangau, dan pengurai sedimen.
   * *2 Misi Ulah Alam:* M1 Air Surut & Ledakan Gulma Eceng Gondok; M2 Erosi Tebing & Pendangkalan Lumpur.
   * *2 Misi Ulah Manusia:* M3 Limbah Kimia Detergen Pabrik; M4 Penangkapan Ikan Berbahaya (Setrum & Tuba).
4. **🌊 Laut Terumbu Karang (Ekosistem Marin Tropis):** Menyelidiki karang acropora, ikan karang kecil, penyu hijau, hiu, dan detritivor samudra.
   * *2 Misi Ulah Alam:* M1 Air Laut Panas & Pemutihan Karang (*Bleaching*); M2 Gelombang Badai Tropis & Karang Roboh.
   * *2 Misi Ulah Manusia:* M3 Bom Ikan Peledak Penghancur Karang; M4 Sampah Plastik Samudra & Pukat Hanyut.

Struktur komparatif ini (2 Ulah Alam vs 2 Ulah Manusia di setiap bioma) memfasilitasi penalaran diferensial C2, di mana siswa belajar membedakan mekanisme pemulihan alami versus kerusakan antropogenik yang masif.

"""
    content = re.sub(old_d2, lambda m: new_d2, content, flags=re.DOTALL)

    # Update D.3: Gamifikasi 48 Bintang & 2-Jalur Paralel
    old_d3 = r'### 3\. Gamifikasi Edukatif: Sistem 3 Bintang & Progression Lock.*?(?=### 4\. Ergonomi & Sosiopedagogis)'
    new_d3 = """### 3. Gamifikasi Edukatif: Sistem 3 Bintang & Progression Lock 2 Jalur Paralel
Mengadopsi prinsip desain motivasional Alessi & Trollip (2001) serta teori motivasi belajar Ryan & Deci (Self-Determination Theory):
* **Bintang 1 (Kompetensi Regulasi Dinamis):** Meraih stabilitas ekosistem $\ge 75\%$ dan menyelesaikan checklist target organisme.
* **Bintang 2 (Debriefing Refleksi Kognitif):** Menyelesaikan kuis penalaran sebab-akibat di Buku Catatan Detektif.
* **Bintang 3 (Penguasaan Akurasi / *Mastery*):** Menjawab butir soal penalaran kausalitas dengan benar pada percobaan pertama (*first attempt*).
* **Total Prestasi:** 12 Bintang per Kelompok Detektif, total 48 Bintang di seluruh panggung Nusantara.
* **Progression Lock 2 Jalur Paralel:** Pada menu misi masing-masing kelompok, Misi 1 Alam dan Misi 1 Manusia terbuka sejak awal secara berdampingan (Grid 2x2). Misi 2 pada masing-masing jalur akan terbuka setelah Misi 1 jalur terkait tuntas. Mekanisme ini memberikan otonomi eksplorasi tanpa menimbulkan kebingungan navigasi (*cognitive load reduction*).

"""
    content = re.sub(old_d3, lambda m: new_d3, content, flags=re.DOTALL)

    # Update D.4: Jigsaw 4 Kelompok Ahli
    old_d4 = r'### 4\. Ergonomi & Sosiopedagogis Interaksi Kelas \(CSCL & IFP\).*?(?=### 5\. Diagram Kausalitas)'
    new_d4 = """### 4. Ergonomi & Sosiopedagogis Interaksi Kelas (CSCL & IFP)
* **Model Kolaborasi Jigsaw 4 Kelompok Ahli:** 25 Siswa kelas 5A dibagi ke dalam 4 Kelompok Detektif (🌾 Sawah, 🌲 Hutan, 🌊 Sungai, 🪸 Laut) dengan 6–7 siswa per kelompok. Setiap kelompok bergantian maju sebagai *Petugas Layar* di depan Interactive Flat Panel (IFP), sementara siswa kelompok lain di meja bertindak aktif sebagai *Penasihat Meja* menggunakan 3 Kartu Voting Warna fisik.
* **Akses Langsung Tanpa Hambatan (*Direct Biome Access*):** Setiap kelompok langsung diarahkan ke bioma spesialisasinya melalui Layar Pemilihan Kelompok, mengeliminasi tahapan navigasi redundan dan memaksimalkan waktu belajar efektif pada jam pelajaran IFP.
* **Ergonomi Layar Sentuh IFP:** Kuadran kontrol diletakkan pada lower-third (ketinggian jangkau siswa kelas 5 SD), tombol berukuran besar (80×80 px), dengan sistem *anti-spam cooldown* (1,2 detik) untuk mendorong pertimbangan reflektif sebelum bertindak.

"""
    content = re.sub(old_d4, lambda m: new_d4, content, flags=re.DOTALL)

    # Update D.6: Mode Penguji 16 misi & 48 bintang
    content = content.replace("seluruh 8 misi secara berurutan", "seluruh 16 misi secara berurutan")
    content = content.replace("seluruh 4 bioma, 8 misi, dan 24 bintang evaluasi", "seluruh 4 bioma, 16 misi, dan 48 bintang evaluasi")

    skripsi_path.write_text(content, encoding="utf-8")
    print("[SUCCESS] SKRIPSI.md updated.")

# ============================================================
# 4. UPDATE ROADMAP.md
# ============================================================
def update_roadmap():
    roadmap_path = DOCS_DIR / "ROADMAP.md"
    content = roadmap_path.read_text(encoding="utf-8")

    # Update Pekan 9-10 & Pekan 11 mentions
    content = content.replace("dengan **8 Misi** (Misi 1: Faktor Ulah Alam & Misi 2: Faktor Ulah Manusia)", "dengan **16 Misi Kausalitas** (4 Bioma × 4 Misi: 2 Faktor Ulah Alam & 2 Faktor Ulah Manusia)")
    content = content.replace("total 24 Bintang", "total 48 Bintang (12 Bintang per Kelompok Detektif)")
    content = content.replace("seluruh 4 bioma, 8 misi, dan 24 bintang", "seluruh 4 bioma, 16 misi, dan 48 bintang")
    content = content.replace("8 Misi lengkap kuis C2, sistem 3 bintang", "16 Misi lengkap kuis C2, sistem 3 bintang (48 Bintang total)")

    roadmap_path.write_text(content, encoding="utf-8")
    print("[SUCCESS] ROADMAP.md updated.")

if __name__ == "__main__":
    update_prd()
    update_lkpd()
    update_skripsi()
    update_roadmap()
    print("--- ALL COMPANION DOCS SYNCHRONIZED SUCCESSFULLY ---")
