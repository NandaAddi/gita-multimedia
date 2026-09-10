# PRODUCT REQUIREMENTS DOCUMENT (PRD) & GAME DESIGN DOCUMENT (GDD)
## "Eco-Explorer: Penjaga Keseimbangan Sawah" (16-Bit Retro RPG Edition)

* **Pengembang / Peneliti:** Gito
* **Judul Skripsi:** Pengembangan Multimedia Interaktif Berbasis Simulasi pada Materi Keseimbangan Ekosistem untuk Siswa Kelas V SDN Percobaan 2 Malang
* **Model Pengembangan:** Alessi & Trollip (2001) (*Planning, Design, Development*)
* **Kerangka Teoretis & Pedagogis:** 
  * *Cognitive Theory of Multimedia Learning (CTML)* (Richard E. Mayer) – 12 Prinsip Pembelajaran Multimedia
  * *Tahap Perkembangan Kognitif Operasional Konkret* (Jean Piaget) – Representasi konkret, reversibilitas & kausalitas nyata
  * *Scaffolding & Zone of Proximal Development (ZPD)* (Lev Vygotsky) – Agen Pedagogis Gita sebagai Digital MKO
  * *Computer-Supported Collaborative Learning (CSCL)* (Dillenbourg, 1999) – Kolaborasi Kelas Operator IFP vs Co-Pilot Bangku
  * *Child-Computer Interaction (CCI) & IFP Ergonomics* (Hourcade, 2008 & Nielsen) – Lower-Third, Anti-Fat-Finger, Cooldown Bar
  * *Game-Based Learning (GBL) & Learning Mechanics - Game Mechanics (LM-GM)* (Arnab et al., 2015)
  * Taksonomi Bloom Revisi (Anderson & Krathwohl, 2001) – Level C2 (*Understanding, Inferring, Explaining*)
  * Capaian Pembelajaran (CP) Kurikulum Merdeka – IPAS Fase C (Kelas V)
* **Subjek Uji Coba:** 25 Siswa Kelas 5A SDN Percobaan 2 Malang (Terbagi dalam 5 Kelompok Kolaboratif) & Guru Kelas
* **Target Perangkat:** Layar Sentuh *Interactive Flat Panel* (IFP 65–86 Inch, 1920 $\times$ 1080 Landscape, Multi-Touch)
* **Teknologi:** Web HTML5 Offline (Phaser 3 Game Engine v3.87+, Canvas/WebGL, Web Audio API)

---

## 1. LANDASAN PEDAGOGIS & TUJUAN PEMBELAJARAN

### 1.1 Permasalahan Kognitif (Problem Statement)
Berdasarkan hasil observasi dan wawancara dengan guru kelas 5A SDN Percobaan 2 Malang:
1. **Ketimpangan C1 vs C2:** Siswa memiliki daya ingat (*C1 - Remembering*) yang sangat kuat. Siswa dapat menghafal definisi rantai makanan, menyebutkan jenis produsen, konsumen primer, sekunder, tersier, dan pengurai. Namun, siswa mengalami hambatan serius ketika dihadapkan pada pemahaman relasional dan sebab-akibat (*C2 - Understanding/Inferring/Explaining*).
2. **Kelemahan Berpikir Sistemik (*Trophic Cascade*):** Siswa kesulitan membayangkan dampak berantai di masa depan jika salah satu mata rantai terputus (misalnya: mengapa pembasmian ular sawah justru menghancurkan panen padi petani dua minggu kemudian).
3. **Keterbatasan Media Konvensional:** Media PowerPoint dan video ceramah bersifat pasif (*one-way*) dan tidak memberikan ruang *trial, error, and causal discovery* yang esensial bagi tahapan perkembangan kognitif operasional konkret anak usia 10–11 tahun (Piaget).

### 1.2 Capaian Pembelajaran (CP) & Indikator Ketercapaian (IKTP) Kurikulum Merdeka
* **Elemen Capaian Pembelajaran (Fase C - IPAS):**
  > *"Peserta didik menyelidiki bagaimana hubungan saling ketergantungan antar komponen biotik dan abiotik dapat mempengaruhi kestabilan suatu ekosistem di lingkungan sekitarnya, serta mengidentifikasi peran manusia dalam menjaga kelestarian ekosistem."*
* **Indikator Ketercapaian Tujuan Pembelajaran (IKTP) Berbasis C2:**
  * **IKTP 1 (Inferring C2):** Mampu memprediksi dinamika populasi (*lonjakan hama atau penurunan mangsa*) akibat terganggunya salah satu mata rantai makanan di sawah.
  * **IKTP 2 (Explaining C2):** Mampu menjelaskan hubungan kausalitas antara peranan organisme pengurai (jamur/cacing) dengan kesuburan zat hara pupuk alami bagi pertumbuhan padi.
  * **IKTP 3 (Systemic Evaluation C2):** Mampu mengidentifikasi dampak negatif penggunaan racun semprotan kimia berlebih terhadap jejaring makanan dan merumuskan solusi pengendalian hayati ramah lingkungan (*predator alami*).

### 1.3 Keselarasan 6 Komponen Simulasi Edukatif Alessi & Trollip (2001)
Sebagai produk skripsi teknologi pendidikan berjenis *Process & Situational Simulation*, game ini memenuhi 6 atribut baku Alessi & Trollip:
1. **Scenario / Situasi Awal:** Sawah Desa Sukatani mengalami krisis darurat. Gita si Detektif Cilik mengajak siswa menyelidiki teka-teki rantai makanan yang rusak.
2. **Underlying System Model (Model Kausalitas):** Logika matematis transfer energi trofik (Padi $\rightarrow$ Konsumen $\rightarrow$ Predator $\rightarrow$ Dekomposer $\rightarrow$ Pupuk Hara).
3. **User Interface (Hardware-Aware UI):** Antarmuka ramah jari anak kelas 5 pada layar IFP (*Lower-Third Zone*, tombol $\ge 80\times 80$ px).
4. **Learner Roles:** Siswa bertindak sebagai *"Detektif Cilik Penjaga Sawah"* yang menguji hipotesis melalui aksi nyata di lapangan.
5. **Feedback & Scaffolding:** Maskot Gita memberikan bimbingan audio-visual ramah anak, bar kesehatan sawah, tombol bantuan 💡, dan peringatan emosi alam (*😱 Bahaya, 😐 Waspada, 😊 Sehat*).
6. **Debriefing / Transfer:** Buku rahasia detektif untuk memecahkan teka-teki sebab-akibat pasca-simulasi dan refleksi bersama guru kelas.

---

## 2. SPESIFIKASI UMUM PRODUK, KERANGKA LM-GM & STANDAR BAHASA ANAK

### 2.1 Ringkasan Spesifikasi Game
| Komponen | Spesifikasi Teknis | Landasan Ilmiah / Alasan Desain |
| :--- | :--- | :--- |
| **Judul Game** | *Eco-Explorer: Penjaga Keseimbangan Sawah* | Menumbuhkan empati lingkungan dan rasa ingin tahu sains. |
| **Genre** | *Ecological Strategy & Collaborative Edu-Sim RPG* | Menggabungkan simulasi sains hidup dengan tantangan misi penyelamatan. |
| **Gaya Visual** | **16-Bit Pixel Art Edukatif (Vibrant Retro RPG)** | Kontras warna tinggi, siluet jelas dilihat dari meja paling belakang, performa stabil 60 FPS tanpa lag di browser IFP. |
| **Target Platform** | Web HTML5 (Phaser 3 Game Engine) | 100% Offline-Ready, mandiri tanpa perlu instalasi aplikasi, kompatibel dengan browser IFP Android/Windows. |
| **Format Layar** | 16:9 Landscape (1920 $\times$ 1080 Native) | Resolusi baku layar IFP sekolah; otomatis *Scale to Fit*. |
| **Karakter Pemandu** | **Gita si Detektif Cilik** | Karakter anak perempuan SD berhijab hitam dan berjaket navy yang ceria, hangat, dan komunikatif (Digital MKO Vygotsky). |
| **Sistem Audio** | Chiptune 16-bit BGM + SFX + **Voice-Over (Tombol 🔊)** | Membantu siswa auditori dan siswa di baris belakang kelas (Mayer Voice Principle). Didukung sistem Hybrid Dual-Engine (MP3 Studio + Web Speech Fallback) mengacu pada dokumen `DOKUMEN_AUDIT_VOICE_OVER.md`. |

### 2.2 Kerangka Integrasi LM-GM (Learning Mechanics – Game Mechanics)
```
+----------------------------------------------------------------------------------------------------+
|                         MATRIKS KESELARASAN LM-GM (ECO-EXPLORER)                                   |
+---------------------+---------------------------------+--------------------------------------------+
| LEARNING MECHANICS  | GAME MECHANICS                  | SINKRONISASI PADA PHASER 3                |
+---------------------+---------------------------------+--------------------------------------------+
| Hypothesizing &     | Pre-Mission Planning &          | Siswa memprediksi masalah krisis sebelum   |
| Prediction (C2)     | Timed Mission Launch            | memulai timer 7 menit; Gita membacakan     |
|                     |                                 | cerita kasus awal.                         |
+---------------------+---------------------------------+--------------------------------------------+
| Whole-Class         | CSCL "Tanya Teman" Modal        | Timer jeda otomatis; 20 siswa Co-Pilot     |
| Collaboration       | with 15s Voting Countdown       | di meja mengangkat kartu fisik 🟢/🟡/🔴;   |
| (CSCL)              | & Visual Card Recommendation    | operator IFP mengeksekusi rekomendasi kelas.|
+---------------------+---------------------------------+--------------------------------------------+
| Adaptive            | Gita Digital MKO Guidance       | Tombol [💡 Bantuan Gita]; bimbingan        |
| Scaffolding (ZPD)   | & Contextual Action Cueing      | bertingkat saat kesehatan sawah < 45%      |
|                     |                                 | menyoroti tombol aksi kunci (Signaling).   |
+---------------------+---------------------------------+--------------------------------------------+
| Perturbation &      | Action Card Interventions       | Menambah pemangsa alami (Ular/Katak) atau  |
| Biological Control  | with Action Cooldown (Anti-Spam)| mengalirkan air; terdapat jeda observasi   |
| (C2)                |                                 | alam 1.2 detik.                            |
+---------------------+---------------------------------+--------------------------------------------+
| Systemic Causal     | Dynamic Trophic Cascade         | Jika Tikus naik drastis -> Padi otomatis   |
| Observation (C2)    | Real-Time Feedback (Chomp Audio)| layu dimakan; Bar Kesehatan Sawah turun;   |
|                     |                                 | suara chomp saat predasi berlangsung.      |
+---------------------+---------------------------------+--------------------------------------------+
| Nutrient Cycling    | Active Decomposer (Mushroom)    | Tombol Jamur mengurai sisa jerami kering ->|
| Understanding (C2)  | Particle Activation             | menghasilkan pupuk alami penyubur padi.    |
+---------------------+---------------------------------+--------------------------------------------+
| Formative C2        | Detective Notebook Debriefing   | Transisi wajib ke QuizScene; siswa         |
| Debriefing          | (Interactive Case Reflection)   | menjawab teka-teki kausalitas formatif     |
|                     |                                 | untuk menjelaskan keberhasilan misi.       |
+---------------------+---------------------------------+--------------------------------------------+
```

### 2.3 Standar Bahasa Ramah Anak Kelas 5 SD (*Child-Friendly Copywriting Standards*)
Sebagai pembeda mendasar antara dokumen akademik skripsi (untuk penguji/dosen) dan pengalaman bermain anak di kelas:
* **Teks di Layar Game:** Wajib menggunakan kalimat sederhana, kalimat aktif, hangat, konkret, serta bebas dari istilah akademis/asing yang membingungkan anak usia 10–11 tahun.

```
+----------------------------------------------------------------------------------------------------+
|                       KAMUS PERUBAHAN ISTILAH RAMAH SISWA KELAS 5 SD                               |
+------------------------------------+---------------------------------------------------------------+
| ISTILAH AKADEMIS / GAME DEV        | ISTILAH RAMAH ANAK DI LAYAR GAME (IN-GAME TEXT)              |
+------------------------------------+---------------------------------------------------------------+
| Kelola Intervensi Ekosistem        | Atur Jumlah Hewan & Tanaman di Sawah                          |
| Kaskade Trofik                     | Rantai Makanan Sawah (Siapa Makan Siapa?)                     |
| Debriefing C2 / Rekonstruksi Kasus | Buku Rahasia Detektif: Teka-Teki Sawah                        |
| Action Cooldown                    | Tunggu Sebentar... Alam Sedang Berubah!                       |
| Urus Bangkai / Dekomposisi         | Urai Sisa Jerami Jadi Pupuk Alami ✨                          |
| Predator Alami / Trophic Level     | Pemangsa Alami / Sahabat Petani                               |
| Residu Pestisida Kimia             | Bahaya Racun Semprotan Hama                                   |
| Faktor Abiotik Irigasi             | Air Sawah / Buka Pintu Air                                    |
| Eco-Health Bar                     | Kesehatan Sawah (😱 Bahaya, 😐 Waspada, 😊 Sehat)             |
+------------------------------------+---------------------------------------------------------------+
```

---

## 3. MEKANIKA INTERAKSI & ERGONOMI IFP (HARDWARE-AWARE DESIGN)

1. **Zona Jangkauan Bawah (*Lower-Third Touch Zone*):**
   * Tinggi rata-rata anak kelas 5 SD adalah 130–150 cm.
   * Seluruh tombol interaksi (pengaturan hewan, jamur, air sawah, dan tombol selesai) diletakkan di **kuadran bawah layar (Y: 780 – 1050 px)** dengan jarak maksimal 35 cm dari bingkai bawah IFP.
2. **Ukuran Tombol Ramah Jari (*Anti-Fat-Finger Standard*):**
   * Ukuran fisik tombol minimal **80 $\times$ 80 piksel** dengan jarak sela minimal 24 piksel untuk mencegah salah sentuh.
3. **Mekanika Jeda Reaksi Alam & Visual Cooldown Bar (1.2 Detik):**
   * Mencegah siswa menekan tombol secara berulang-ulang tanpa berpikir (*anti-button-mashing*).
   * Menampilkan **Progress Bar Cooldown (360x8 px)** yang menyusut halus selama 1.2 detik dan meredupkan tombol (opacity 0.45), memberi sinyal visual yang tegas kepada anak bahwa sistem sedang memproses reaksi ekosistem (bukan layar rusak/lag).
4. **Dukungan Multi-Touch Kolaboratif:**
   * Mendukung hingga 4 sentuhan simultan agar 2 siswa dapat berinteraksi bersamaan tanpa memblokir input layar.
5. **Visibilitas Jarak Jauh (Tampak Jelas dari Bangku Belakang):**
   * Huruf besar dan tebal (*Fredoka* $\ge 20$ px), kontras warna tinggi, serta ikon emosi yang mudah dikenali (**😱 Bahaya**, **😐 Waspada**, **😊 Sehat**).

---

## 4. CORE GAMEPLAY LOOP & ORKESTRASI KELAS (25 SISWA)

Model pembelajaran memanfaatkan sintaks kooperatif **Jigsaw (Elliot Aronson)** yang dipadukan dengan siklus **POE (*Predict - Observe - Explain*)** dan didampingi instrumen cetak `LKPD_DETEKTIF_SAWAH.md`:

### 4.1 Penyelesaian Masalah Kebosanan & Efek Mencontek (*The 20 Bored Kids & Anti-Copycat Solutions*)
Jika semua kelompok memainkan misi yang sama berulang kali, 20 siswa di meja akan bosan dan tim berikutnya hanya akan mereplikasi jawaban tanpa berpikir kritis (C2). Untuk mengatasinya:
1. **Model Tim Ahli (*Jigsaw Expert Groups*):** Setiap kelompok ditugaskan sebagai spesialis yang menyelidiki **satu kasus krisis ekosistem yang unik dan berbeda**:
   * 🦅 **Tim Elang & 🐍 Tim Ular:** Misi 1 — *Serbuan Hama Tikus* (Fokus: Kaskade trofik predator ular & tikus).
   * 🐸 **Tim Katak:** Misi 2 — *Bahaya Racun Kimia* (Fokus: Residu semprotan kimia & perlindungan katak).
   * 🌾 **Tim Padi:** Misi 3 — *Sawah Kekeringan Retak* (Fokus: Kebutuhan abiotik air & sistem irigasi).
   * 🍄 **Tim Jamur:** Misi 4 — *Rahasia Pengurai Jerami* (Fokus: Dekomposisi jerami menjadi pupuk humus).
2. **Visual Signaling Pita Emas:** Pada menu misi, kasus yang ditugaskan ke tim aktif otomatis dihiasi pita emas berdenyut: `⭐ MISI UTAMA SPESIALIS: [NAMA TIM]`.
3. **Pelacak Sesi Kelas (*Class Progress Tracker*):** Layar melacak misi mana saja yang telah diselesaikan (`✅ Selesai oleh Tim X`), dan pada layar kemenangan otomatis memandu estafet ke tim berikutnya.
4. **Peran Co-Pilot Aktif di Bangku:** 20 Siswa di meja memegang **Buku Catatan Co-Pilot (LKPD Fisik)** untuk mencatat data awal populasi kasus masing-masing, mengisi prediksi krisis, dan serempak mengangkat kartu voting 3 warna saat tombol "📢 TANYA TEMAN" ditekan.

```
                        [1. PEMBAGIAN 5 KELOMPOK JIGSAW KELAS 5A]
         25 Siswa dibagi menjadi 5 Tim Ahli dengan Spesialisasi Kasus Berbeda
                                       │
                                       ▼
                       [2. ROTASI TIM & PREDIKSI AWAL (PREDICT)]
         - Tim Aktif (4-5 Siswa) maju ke depan layar sentuh IFP
         - Misi Utama Tim ditandai pita emas berdenyut di menu misi
         - 20 Siswa lainnya bertindak sebagai "Co-Pilot di Meja" memegang LKPD
         - Siswa mencatat angka awal dan menganalisis hipotesis penyebab krisis
                                       │
                                       ▼
              [3. SIMULASI & AKSI PENYELAMATAN SAWAH (OBSERVE)]
         - Timer Misi Berjalan (7 Menit) | Dinamika kaskade trofik otomatis tiap 3 detik
         - Tim di IFP mengintervensi dengan menambah predator, air, atau jamur
         - Visual Cooldown Bar 1.2 detik memberi jeda alam bereaksi dan melatih diskusi
                                       │
                                       ▼
               [4. BANTUAN TEMAN DI MEJA (KARTU VOTING KELAS CSCL)]
          - Saat bingung, Tim IFP menekan tombol "📢 TANYA TEMAN"
          - Timer 7 menit otomatis dijeda (*paused*) dan bel kelas (*chime*) berbunyi
          - Tampil modal hitung mundur 15 detik bagi seluruh siswa di meja untuk berdiskusi
          - 20 Siswa di meja serempak mengangkat KARTU WARNA FISIK:
            🟢 KARTU HIJAU: Tambah Ular Pemangsa / Katak / Jamur Pengurai
            🟡 KARTU KUNING: Alirkan Air ke Sawah (+ Air Irigasi)
            🔴 KARTU MERAH: Kendalikan Hama / Bersihkan Racun Kimia
          - Operator memilih opsi voting terbanyak -> timer berlanjut & tombol aksi berdenyut emas!
                                       │
                                       ▼
               [5. TEKA-TEKI SEBAB-AKIBAT DETEKTIF GITA (EXPLAIN)]
         - Misi Sukses: Bar Kesehatan Sawah >= 75% bertahan stabil 12 detik
         - Masuk ke Buku Rahasia Detektif Gita (1 Soal Teka-Teki C2 Kontekstual)
         - Tim di depan dan siswa di meja mencatat kesimpulan sebab-akibat di LKPD
                                       │
                                       ▼
             [6. BINTANG PENGHARGAAN & ESTAFET TIM JIGSAW BERIKUTNYA]
         - Perolehan Skor Bintang (1-3) & Gelar Detektif Cilik
         - Tracker 4 Kasus Sawah tercentang otomatis (✅ Misi Selesai)
         - Gita mengumumkan estafet kelompok: "Sekarang giliran Tim berikutnya maju memecahkan Kasus Baru!"
         - Tim 1 kembali ke bangku -> Tim 2 maju memecahkan Kasus Spesialis Berikutnya
```

---

## 5. SKENARIO 4 MISI SAWAH (BAHASA RAMAH ANAK)

```
+-----------------------------------------------------------------------------------------------------+
|                              PETA 4 TANTANGAN PENYELAMATAN SAWAH                                    |
+----+-----------------------+---------------------------------------+--------------------------------+
| NO | JUDUL MISI            | MASALAH KRISIS                        | TUGAS KITA (SOLUSI C2)         |
+----+-----------------------+---------------------------------------+--------------------------------+
| 1  | "Serbuan Hama Tikus"  | Ular sawah diburu habis karena takut  | Kembalikan ular sawah pemangsa |
|    | (Tingkat: Mudah ⭐)   | digigit -> Jumlah tikus meledak banyak| tikus agar padi selamat!       |
+----+-----------------------+---------------------------------------+--------------------------------+
| 2  | "Bahaya Racun Kimia"  | Semprotan racun kimia mematikan katak | Selamatkan katak sahabat petani|
|    | (Tingkat: Sedang ⭐⭐) | sawah -> Serangga hama merajalela!    | dan bersihkan tanah sawah!     |
+----+-----------------------+---------------------------------------+--------------------------------+
| 3  | "Sawah Kekeringan"    | Saluran irigasi kering retak ->       | Alirkan air irigasi agar padi  |
|    | (Tingkat: Menantang   | Padi layu & hewan kelaparan!          | tumbuh segar kembali!          |
|    |  ⭐⭐⭐)              |                                       |                                |
+----+-----------------------+---------------------------------------+--------------------------------+
| 4  | "Sahabat Pengurai"    | Banyak sisa jerami kering menumpuk    | Ajak jamur mengurai jerami     |
|    | (Tingkat: Hebat ⭐⭐⭐)| di pematang dan belum terurai.        | menjadi pupuk alami penyubur!  |
+----+-----------------------+---------------------------------------+--------------------------------+
```

---

## 6. MEKANIKA PENGURAI (JAMUR & PUPUK ALAMI)

1. **Sisa Jerami & Daun Kering:** Muncul sebagai tumpukan jerami di lapisan tanah bawah sawah.
2. **Tombol Jamur Pengurai:** Tombol besar bertuliskan **🍄 JAMUR PENGURAI** dengan tombol aksi **✨ URAI JADI PUPUK**.
3. **Efek Partikel Bercahaya:** Jamur mengeluarkan spora bercahaya lembut dan mengurai tumpukan jerami menjadi titik-titik hijau pupuk alami.
4. **Pemberitahuan Ramah Anak:** Muncul pesan ceria: `✨ Jerami Berubah Menjadi Pupuk Alami Padi!`, membuat tanaman padi tumbuh hijau lebat.

---

## 7. SISTEM KESEHATAN SAWAH & EMOSI ALAM

### 7.1 Tiga Kondisi Kesehatan Sawah
* **😱 BAHAYA (Kesehatan $< 45\%$):** Bar merah berkedip, Gita memberi peringatan: *"Awas! Tanaman padi dan hewan dalam bahaya!"*.
* **😐 WASPADA (Kesehatan $45\% - 74\%$):** Bar kuning, sawah mulai pulih tetapi masih butuh bantuan.
* **😊 SEHAT (Kesehatan $\ge 75\%$):** Bar hijau cerah berkilau, BGM ceria: *"Hore! Sawah sudah seimbang dan subur!"*.

### 7.2 Semangat Belajar Positif (*Tanpa Game Over*)
Jika waktu habis, layar **tidak pernah** menampilkan tulisan *"Game Over"*. Sebaliknya, muncul layar ramah: **"Catatan Detektif Cilik"**:
* Gita mengajak berdiskusi: *"Tidak apa-apa! Mari kita cari tahu mengapa tikus masih banyak. Jangan lupa ajak ular pemangsa kembali ke sawah ya!"*.
* Tim tetap mendapat apresiasi Bintang 1 dan siap mencoba lagi dengan penuh semangat.

---

## 8. BUKU RAHASIA DETEKTIF GITA: TEKA-TEKI SEBAB-AKIBAT (C2)

Pasca-simulasi, siswa diajak memecahkan teka-teki sebab-akibat dengan bahasa yang akrab dan mudah dipahami:

```
+-----------------------------------------------------------------------------------------------------+
|                         BANK TEKA-TEKI DETEKTIF GITA (BAHASA KELAS 5 SD)                            |
+--------+------------------------------------+--------------------------------+----------------------+
| MISI   | PERTANYAAN TEKA-TEKI               | PILIHAN JAWABAN TEPAT          | ALASAN JAWABAN       |
+--------+------------------------------------+--------------------------------+----------------------+
| Misi 1 | Petani membasmi semua ular sawah.  | B. Tikus bertambah sangat ba-  | Kalau ular diburu,   |
| (Tikus)| Namun beberapa minggu kemudian padi|    nyak karena tidak ada ular  | tidak ada yang me-   |
|        | justru rusak dimakan tikus. Kenapa?|    pemangsanya, lalu makan padi| mangsa hama tikus!   |
+--------+------------------------------------+--------------------------------+----------------------+
| Misi 2 | Petani menyemprot racun hama hingga| A. Racun kimia membunuh katak  | Katak adalah pemangsa|
| (Racun)| katak mati. Seminggu kemudian, daun|    pemangsa serangga, sehingga | serangga. Tanpa katak|
| Kimia) | padi habis dimakan serangga. Kenapa|    serangga bebas makan padi.  | serangga merajalela! |
+--------+------------------------------------+--------------------------------+----------------------+
| Misi 3 | Saat sawah kekeringan dan padi     | C. Padi sumber makanan pertama;| Padi sumber energi.  |
| (Krisis| mati layu, mengapa ular dan elang  |    jika padi mati, tikus mati, | Kalau padi mati,     |
| Air)   | akhirnya ikut kelaparan?           |    dan pemangsa kehabisan makan| semua hewan kelaparan|
+--------+------------------------------------+--------------------------------+----------------------+
| Misi 4 | Mengapa sisa jerami kering busuk   | B. Jamur mengubah jerami busuk | Jamur mengubah materi|
| (Jamur | harus diurai jamur agar sawah tetap|    menjadi pupuk alami tanah   | mati jadi pupuk hara |
| Pengurai)| subur?                           |    yang diserap akar padi.     | penyubur tanaman.    |
+--------+------------------------------------+--------------------------------+----------------------+
```

---

## 9. SPESIFIKASI TEKNIS & ARSITEKTUR PERANGKAT LUNAK

* **Engine:** Phaser 3 (v3.87+ Standalone Offline, Canvas & WebGL Renderer)
* **Resolusi:** $1920 \times 1080$ Widescreen (`Phaser.Scale.FIT`, `Phaser.Scale.CENTER_BOTH`)
* **Pipeline Optimasi Web & Aset Mandiri (Zero CORS & High Performance):**
  * **Optimasi Visual Sprite (`optimize_assets.py`):** Resampling cerdas sprite organisme (180 px) dan kuantisasi palet warna 8-bit (*MedianCut*), menyusutkan bundle `assets-data.js` dari **17.02 MB** menjadi **3.93 MB** (-76.9%).
  * **Optimasi Audio Vokal (`compress_audio.py`):** Konversi 25 file rekaman vokal dari WAV 16-bit PCM uncompressed ke format **48 kbps Mono MP3**, memangkas bundle `vo-data.js` dari **15.71 MB** menjadi **1.98 MB** (-87.4%).
  * **Total Payload Web:** Berhasil dipangkas dari **~33 MB** menjadi **5.91 MB** (reduksi total **82%**), menjamin waktu muat awal *First Contentful Paint* (FCP) < 1.5 detik pada koneksi internet sekolah.
  * **Tuning Render Engine (`main.js`):** Menonaktifkan modul fisika tidak terpakai (`physics: false`), mengaktifkan `powerPreference: 'high-performance'`, serta memperbesar WebGL batching (`batchSize: 4096`) untuk meminimalkan beban CPU & GPU.
  * **Dukungan PWA, Offline Caching & Cloudflare Pages Edge:** Implementasi `sw.js` (*Cache-First Service Worker*) dan `manifest.json` agar web game dapat di-install dan dimainkan seketika tanpa koneksi internet. Proyek dilengkapi arsitektur cloud ready (*Git Version Control*, `_headers`, `_redirects`, dan root `index.html`) untuk hosting global instan via Cloudflare Pages CDN di samping protokol lokal offline `file://`.
  * Standarisasi rendering organisme via `setDisplaySize()` di `SimulationScene.js` (skala adaptif 68–110 px), memastikan resolusi sprite kustom pengguna tampil tajam tanpa distorsi visual.
  * Karakter maskot Gita terintegrasi utuh dengan aset pixel art kustom (`gita_idle.png` & `gita_talk.png`) berasio 1:1, berlatar belakang transparan, selaras dengan tema 16-bit retro RPG.
* **Struktur Alur & Scene Game (Standar Game Komersial):**
  * `BootScene.js` – Memuat aset pixel art & audio lokal (Instant Stage Load)
  * `TitleScene.js` – Homescreen / Layar Utama (Mulai Main, Cara Bermain, Profil & Panduan Guru)
  * `TutorialScene.js` – Buku Panduan Interaktif 4 Slide (Aturan Rantai Makanan & Kartu Voting)
  * `TeamSelectScene.js` – Pemilihan 5 Kelompok Kelas 5A
  * `MissionMenuScene.js` – Peta 4 Tantangan Sawah Ramah Anak
  * `SimulationScene.js` – Arena Bermain (Atur Hewan, Air Sawah, Jamur, & Jeda Reaksi 1.2s)
  * `QuizScene.js` – Buku Rahasia Detektif Gita (Teka-Teki Sebab-Akibat C2)
  * `VictoryScene.js` – Selebrasi Lencana Bintang & Gelar Tim
* **Alur Navigasi Lengkap:**
  `BootScene` ➡️ `TitleScene` ➡️ (`TutorialScene` atau `TeamSelectScene`) ➡️ `MissionMenuScene` ➡️ `SimulationScene` ➡️ `QuizScene` ➡️ `VictoryScene`.

---

## 10. KISI-KISI UJI VALIDASI AHLI (KESIAPAN SIDANG SKRIPSI)

### 10.1 Kisi-Kisi Ahli Materi IPAS (Kurikulum Merdeka)
* Keselarasan dengan Capaian Pembelajaran (CP) dan IKTP IPAS Fase C.
* Kebenaran konsep rantai makanan, fotosintesis produsen, pemangsa alami, dan peran pengurai.
* Ketepatan stimulasi berpikir tingkat C2 (*inferring* dan *explaining*).
* Kualitas bahasa edukatif yang sesuai dengan perkembangan bahasa siswa usia 10–11 tahun.

### 10.2 Kisi-Kisi Ahli Media Pembelajaran
* Kemudahan interaksi layar sentuh IFP (*Lower-Third Touch Zone*).
* Kualitas jeda reaksi alam (cooldown) dalam mengendalikan alur kelas.
* Keterbacaan teks dan kejernihan audio dari jarak bangku kelas belakang.
* Reliabilitas sistem (berjalan lancar 100% offline di browser IFP tanpa hambatan).
