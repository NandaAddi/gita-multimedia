# PRODUCT REQUIREMENTS DOCUMENT (PRD) & GAME DESIGN DOCUMENT (GDD)
## "Eco-Explorer: Penjaga Keseimbangan Ekosistem" (Multi-Biome Nusantara Edition)

* **Pengembang / Peneliti:** Gito
* **Judul Skripsi:** Pengembangan Multimedia Interaktif Berbasis Simulasi pada Materi Keseimbangan Ekosistem untuk Siswa Kelas V SDN Percobaan 2 Malang
* **Model Pengembangan:** Alessi & Trollip (2001) (*Planning, Design, Development*)
* **Kerangka Teoretis & Pedagogis:** 
  * *Cognitive Theory of Multimedia Learning (CTML)* (Richard E. Mayer) – 12 Prinsip Pembelajaran Multimedia
  * *Tahap Perkembangan Kognitif Operasional Konkret* (Jean Piaget) – Representasi konkret, reversibilitas & kausalitas nyata
  * *Scaffolding & Zone of Proximal Development (ZPD)* (Lev Vygotsky) – Agen Pedagogis Gita sebagai Digital MKO
  * *Computer-Supported Collaborative Learning (CSCL)* (Dillenbourg, 1999) – Kolaborasi Kelas Petugas Layar IFP vs Penasihat Meja
  * *Child-Computer Interaction (CCI) & IFP Ergonomics* (Hourcade, 2008 & Nielsen) – Lower-Third, Anti-Fat-Finger, Jeda Tombol 1,2 Detik
  * *Game-Based Learning (GBL) & Learning Mechanics - Game Mechanics (LM-GM)* (Arnab et al., 2015)
  * Taksonomi Bloom Revisi (Anderson & Krathwohl, 2001) – Level C2 (*Understanding, Inferring, Explaining*)
  * Capaian Pembelajaran (CP) Kurikulum Merdeka – IPAS Fase C (Kelas V)
* **Subjek Uji Coba:** 25 Siswa Kelas 5A SDN Percobaan 2 Malang (Terbagi dalam 4 Kelompok Ahli Jigsaw, 6–7 Siswa per Kelompok) & Guru Kelas
* **Target Perangkat:** Layar Sentuh *Interactive Flat Panel* (IFP 65–86 Inch, 1920 $\times$ 1080 Landscape, Multi-Touch)
* **Teknologi:** Web HTML5 Offline (Phaser 3 Game Engine v3.87+, Canvas/WebGL, Web Audio API, LocalStorage Progress)

---

## 1. LANDASAN PEDAGOGIS & TUJUAN PEMBELAJARAN

### 1.1 Permasalahan Kognitif (Problem Statement)
Berdasarkan hasil observasi dan wawancara dengan guru kelas 5A SDN Percobaan 2 Malang:
1. **Ketimpangan C1 vs C2:** Siswa memiliki daya ingat (*C1 - Remembering*) yang sangat kuat. Siswa dapat menghafal definisi rantai makanan, menyebutkan jenis produsen, konsumen primer, sekunder, tersier, dan pengurai. Namun, siswa mengalami hambatan serius ketika dihadapkan pada pemahaman relasional dan sebab-akibat (*C2 - Understanding/Inferring/Explaining*).
2. **Kelemahan Berpikir Sistemik (*Trophic Cascade*):** Siswa kesulitan membayangkan dampak berantai di masa depan jika salah satu mata rantai terputus (misalnya: mengapa pembasmian ular sawah justru menghancurkan panen padi petani dua minggu kemudian, atau bagaimana sampah plastik laut memutus rantai makanan hiu).
3. **Keterbatasan Media Konvensional:** Media PowerPoint dan video ceramah bersifat pasif (*one-way*) dan tidak memberikan ruang *trial, error, and causal discovery* yang esensial bagi tahapan perkembangan kognitif operasional konkret anak usia 10–11 tahun (Piaget).

### 1.2 Capaian Pembelajaran (CP) & 4 Tujuan Pembelajaran (TP) Kurikulum Merdeka
* **Capaian Pembelajaran (CP) Fase C (Kelas V SD):**
  > *"Capaian pembelajaran Ilmu Pengetahuan Alam dan Sosial pada Fase C (kelas V SD) menekankan kemampuan peserta didik dalam memahami hingga menganalisis bagaimana alam semesta seperti hubungan antar komponen biotik dan abiotik, serta lingkungan sosial pengaruh terhadap ekosistem yang dapat terjadi di sekitarnya."*

* **4 Tujuan Pembelajaran (TP) IPAS Ekosistem:**
  1. **TP 1:** Peserta didik mampu mengidentifikasi komponen biotik dan abiotik dalam berbagai jenis ekosistem.
  2. **TP 2:** Peserta didik mampu memahami hubungan rantai makanan dan jaring-jaring makanan pada ekosistem hutan tropis, laut, sawah, dan sungai.
  3. **TP 3:** Peserta didik mampu memprediksi dampak perubahan jumlah populasi komponen biotik terhadap rantai makanan dalam suatu ekosistem.
  4. **TP 4:** Peserta didik mampu menganalisis dampak perubahan populasi komponen biotik terhadap keseimbangan ekosistem, serta dampak aktivitas manusia terhadap keseimbangan ekosistem.

* **Indikator Ketercapaian Tujuan Pembelajaran (IKTP) Berbasis C2:**
  * **IKTP 1 (Inferring C2):** Mampu memprediksi dinamika populasi (*lonjakan hama atau penurunan mangsa*) akibat terganggunya salah satu mata rantai makanan di 4 ekosistem (sawah, hutan, sungai, laut).
  * **IKTP 2 (Explaining C2):** Mampu menjelaskan hubungan kausalitas antara peranan organisme pengurai dan produsen dengan kestabilan trofik makanan.
  * **IKTP 3 (Systemic Evaluation C2):** Mampu membedakan gangguan ekosistem akibat **Faktor Ulah Alam** (kemarau, surut air, gelombang panas) dan **Faktor Ulah Manusia** (racun pestisida, pembalakan liar, bom ikan, limbah pabrik).

### 1.3 Keselarasan 6 Komponen Simulasi Edukatif Alessi & Trollip (2001)
Sebagai produk skripsi teknologi pendidikan berjenis *Process & Situational Simulation*, game ini memenuhi 6 atribut baku Alessi & Trollip:
1. **Scenario / Situasi Awal:** Ekosistem Nusantara mengalami krisis darurat (alam & manusia). Gita si Detektif Cilik mengajak siswa menyelidiki teka-teki rantai makanan yang rusak.
2. **Underlying System Model (Model Kausalitas):** Logika matematis transfer energi trofik pada 4 bioma (Produsen $\rightarrow$ Herbivora $\rightarrow$ Predator $\rightarrow$ Dekomposer).
3. **User Interface (Hardware-Aware UI):** Antarmuka ramah jari anak kelas 5 pada layar IFP (*Lower-Third Zone*, tombol $\ge 80\times 80$ px).
4. **Learner Roles:** Siswa bertindak sebagai *"Detektif Cilik Penjaga Ekosistem"* yang menguji hipotesis melalui aksi nyata di lapangan.
5. **Feedback & Scaffolding:** Maskot Gita memberikan bimbingan audio-visual ramah anak, Bar Kesehatan Ekosistem, tombol bantuan 💡, dan peringatan emosi alam (*😱 Bahaya, 😐 Hati-hati, 😊 Sehat*).
6. **Debriefing / Transfer:** Buku Catatan Detektif untuk memecahkan teka-teki sebab-akibat pasca-simulasi dan refleksi bersama guru kelas.

### 1.4 Spesifikasi & Kisi-Kisi Instrumen Evaluasi Pretest & Posttest (20 Butir Soal C2)
Guna mengukur efektivitas media simulasi *Eco-Explorer* dalam mengatasi kesenjangan kognitif C1 vs C2 di kelas 5A SDN Percobaan 2 Malang, dikembangkan instrumen tes standar (*pretest* sebelum intervensi media dan *posttest* setelah perlakuan) yang menguji ketercapaian 4 Tujuan Pembelajaran:

| No | Indikator Butir Soal | Target Bioma | TP | Level Kognitif | Kunci |
|:---:|:---|:---|:---:|:---:|:---:|
| **1** | Mengidentifikasi komponen abiotik pada ekosistem sawah (Air) | Sawah | **TP 1** | C1 | **b** |
| **2** | Menentukan peran pengurai/dekomposer dalam ekosistem (Bakteri & jamur) | Umum / Sawah | **TP 1 / TP 2** | C1 | **b** |
| **3** | Menganalisis komponen abiotik paling berpengaruh pada fotosintesis (Cahaya matahari) | Darat / Umum | **TP 1** | C2 | **a** |
| **4** | Mengidentifikasi contoh komponen biotik pada ekosistem laut (Ikan) | Laut | **TP 1** | C1 | **c** |
| **5** | Menjelaskan peranan plankton sebagai produsen pada ekosistem laut | Laut | **TP 1 / TP 2** | C2 | **b** |
| **6** | Menyusun urutan rantai makanan sawah (Padi → tikus → ular → elang) | Sawah | **TP 2** | C2 | **d** |
| **7** | Menjelaskan fungsi utama komponen abiotik bagi kelangsungan makhluk hidup | Umum | **TP 1** | C2 | **c** |
| **8** | Menentukan kelompok tingkat trofik rusa pemakan tumbuhan (Konsumen I) | Hutan Tropis | **TP 2** | C2 | **a** |
| **9** | Menentukan peranan predator singa pemakan rusa (Konsumen II) | Hutan Tropis | **TP 2** | C2 | **b** |
| **10** | Memahami konsep pembentukan jaring-jaring makanan | Umum | **TP 2** | C2 | **a** |
| **11** | Mengonfirmasi urutan rantai makanan produsen ke karnivora di sawah | Sawah | **TP 2** | C2 | **c** |
| **12** | Menyusun urutan rantai makanan pada ekosistem perairan sungai | Sungai | **TP 2** | C2 | **b** |
| **13** | Menyusun rantai makanan hutan tropis (Tumbuhan → belalang → katak → ular) | Hutan Tropis | **TP 2** | C2 | **c** |
| **14** | Menganalisis peranan tikus sebagai penghubung dalam jaring-jaring makanan | Sawah | **TP 2 / TP 3** | C2 | **a** |
| **15** | Menentukan upaya pelestarian predator alami untuk keseimbangan sawah | Sawah (Manusia) | **TP 4** | C4 / C2 | **b** |
| **16** | Memprediksi akibat penurunan drastis populasi ular terhadap populasi tikus | Sawah (Dinamika) | **TP 3** | C2 (Inferring) | **a** |
| **17** | Menganalisis dampak penebangan hutan secara liar terhadap ekosistem | Hutan (Manusia) | **TP 4** | C2 | **d** |
| **18** | Menganalisis dampak pencemaran limbah air sungai terhadap organisme | Sungai (Manusia) | **TP 4** | C2 | **c** |
| **19** | Memprediksi dampak perburuan liar predator puncak (elang) terhadap mangsa | Sawah/Hutan | **TP 3 / TP 4** | C2 (Inferring) | **b** |
| **20** | Memprediksi dampak penangkapan berlebih predator laut terhadap ikan kecil | Laut (Manusia) | **TP 3 / TP 4** | C2 (Inferring) | **c** |

---

## 2. SPESIFIKASI UMUM PRODUK, KERANGKA LM-GM & STANDAR BAHASA ANAK

### 2.1 Ringkasan Spesifikasi Game
| Komponen | Spesifikasi Teknis | Landasan Ilmiah / Alasan Desain |
| :--- | :--- | :--- |
| **Judul Game** | *Eco-Explorer: Penjaga Keseimbangan Ekosistem* | Menumbuhkan empati lingkungan dan rasa ingin tahu sains multi-ekosistem. |
| **Genre** | *Ecological Strategy & Collaborative Edu-Sim RPG* | Menggabungkan simulasi sains hidup dengan tantangan misi penyelamatan. |
| **Kelompok Belajar** | **4 Kelompok Detektif Ekosistem (1 Kelompok = 1 Bioma):**<br>• Kelompok 1: Detektif Sawah<br>• Kelompok 2: Detektif Hutan<br>• Kelompok 3: Detektif Sungai<br>• Kelompok 4: Detektif Laut | Mendukung model pembelajaran kooperatif *Jigsaw* (Elliot Aronson), di mana setiap kelompok menjadi ahli di ekosistemnya sebelum berbagi temuan. |
| **Cakupan Ekosistem** | **4 Bioma Nusantara:** Sawah, Hutan Tropis, Sungai Air Tawar, Laut Terumbu Karang | Memenuhi CP IPAS Fase C tentang keragaman ekosistem darat dan perairan Nusantara. |
| **Struktur Misi** | **4 Misi per Bioma (Total 16 Misi):**<br>• 2 Misi Faktor Ulah Alam (Kemarau, Wereng, Badai, Lumpur Erosi)<br>• 2 Misi Faktor Ulah Manusia (Racun Kimia, Penebangan Liar, Bom Ikan, Limbah) | Memfasilitasi pemahaman komparatif mendalam antara dinamika alamiah vs ulah perusakan manusia. |
| **Sistem Penilaian** | **Sistem 3 Bintang (12 per Kelompok, Total 48 Bintang):**<br>⭐ 1: Kesehatan Ekosistem $\ge 75\%$<br>⭐⭐ 2: Lulus Kuis Kausalitas C2<br>⭐⭐⭐ 3: Menjawab Kuis Benar pada Percobaan Pertama | Memberikan gamifikasi motivasional (*reward loop*) dan instrumen debriefing Alessi & Trollip. |
| **Mekanika Unlock** | **Progression Lock 2 Jalur Paralel:** Misi 1 Alam dan Misi 1 Manusia terbuka di awal; Misi 2 masing-masing jalur terbuka setelah Misi 1 selesai ($\ge 1$ bintang) | Memberikan kebebasan eksplorasi tanpa menyebabkan beban kognitif berlebih (*cognitive overload*). |
| **Gaya Visual** | **Modern 2D Vector Cartoon Edukatif (Chunky Solid Bevels - Zero Outline)** | Kontur solid berenamel tinggi tanpa garis tepi kawat, siluet sangat tegas di layar IFP 65–86 inch, performa 60 FPS stabil. |
| **Target Platform** | Web HTML5 Standalone (Modular Architecture & Canvas) | 100% Offline-Ready, mandiri tanpa perlu instalasi aplikasi, kompatibel dengan browser IFP Android/Windows. |
| **Format Layar** | 16:9 Landscape (1920 $\times$ 1080 Native) | Resolusi baku layar IFP sekolah; otomatis *Scale to Fit*. |
| **Karakter Pemandu** | **Gita si Detektif Cilik** | Karakter anak perempuan SD berhijab hitam dan berjaket navy yang ceria, hangat, dan komunikatif (Digital MKO Vygotsky). |
| **Sistem Audio** | Chiptune 16-bit BGM + SFX + **Voice-Over (Tombol 🔊)** | Membantu siswa auditori dan siswa di baris belakang kelas (Mayer Voice Principle). Didukung sistem Hybrid Dual-Engine (MP3 Studio + Web Speech Fallback). |

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
| Whole-Class         | CSCL "Tanya Teman" Modal        | Timer jeda otomatis; 20 siswa Penasihat    |
| Collaboration       | with 15s Voting Countdown       | Meja di meja mengangkat kartu fisik         |
| (CSCL)              | & Visual Card Recommendation    | 🟢/🟡/🔴; Petugas Layar mengeksekusi saran. |
+---------------------+---------------------------------+--------------------------------------------+
| Adaptive            | Gita Digital MKO Guidance       | Tombol [💡 Bantuan Gita]; bimbingan        |
| Scaffolding (ZPD)   | & Contextual Action Cueing      | bertingkat saat kesehatan sawah < 45%      |
|                     |                                 | menyoroti tombol aksi kunci (Signaling).   |
+---------------------+---------------------------------+--------------------------------------------+
| Perturbation &      | Action Card Interventions       | Menambah pemangsa alami (Ular/Katak) atau  |
| Biological Control  | with Action Cooldown (Anti-Spam)| mengalirkan air; terdapat jeda observasi   |
| (C2)                |                                 | alam 1,2 detik.                            |
+---------------------+---------------------------------+--------------------------------------------+
| Systemic Causal     | Dynamic Trophic Cascade         | Jika Tikus naik drastis -> Padi otomatis   |
| Observation (C2)    | Real-Time Feedback (Chomp Audio)| layu dimakan; Ukuran Kesehatan Sawah turun;|
|                     |                                 | suara chomp saat predasi berlangsung.      |
+---------------------+---------------------------------+--------------------------------------------+
| Nutrient Cycling    | Active Decomposer (Mushroom)    | Tombol Jamur mengurai sisa jerami kering ->|
| Understanding (C2)  | Particle Activation             | menghasilkan pupuk alami penyubur padi.    |
+---------------------+---------------------------------+--------------------------------------------+
| Formative C2        | Detective Notebook Debriefing   | Transisi wajib ke QuizScene; siswa         |
| Debriefing & Visual | with 4-Node Causal Chain        | menjawab teka-teki kausalitas formatif     |
| Causality (Mayer    | Diagram (`[A] ➔ [B] ➔ [C] ➔ [D]`)| disertai diagram visual rantai kausalitas  |
| & Piaget C2)        |                                 | konkret yang mengonfirmasi penalaran C2.   |
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
| Debriefing C2 / Rekonstruksi Kasus | Buku Catatan Detektif: Teka-Teki Sawah                        |
| Action Cooldown (1,2 Detik)        | Tunggu Sebentar... Alam Sedang Berubah!                       |
| Urus Bangkai / Dekomposisi         | Urai Sisa Jerami Jadi Pupuk Alami ✨                          |
| Predator Alami / Trophic Level     | Pemangsa Alami / Sahabat Petani                               |
| Residu Pestisida Kimia             | Bahaya Racun Semprotan Hama                                   |
| Faktor Abiotik Irigasi             | Air Sawah / Buka Pintu Air                                    |
| Eco-Health Bar                     | Ukuran Kesehatan Sawah (😱 Bahaya, 😐 Hati-hati, 😊 Sehat)    |
| Siswa Kolaborator Meja / Layar     | Penasihat Meja (di meja) & Petugas Layar (di layar IFP)       |
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
5. **Visibilitas Jarak Jauh (Standar Tipografi Ultra-Large IFP $\ge 24$ px):**
   * **Ultra-Large IFP Typography Standard ($\ge 24$ px Absolute Minimum):** Melalui audit menyeluruh pada seluruh 9 file scene Phaser (`scripts/audit_fonts.py`), batas minimum absolut ukuran font di seluruh game dinaikkan menjadi **$\ge 24$ piksel** (0 font berukuran di bawah 24px di seluruh scene game).
     - **Label mikro, status badge, checklist, & deskripsi:** $24 - 26$ px (sebelumnya 11–16 px)
     - **Tombol aksi taktil IFP:** $24 - 32$ px (sebelumnya 15–21 px)
     - **Subheader, nama tim, dan judul kartu:** $28 - 36$ px (sebelumnya 18–24 px)
     - **Judul utama layar & hero billboard:** $38 - 52$ px (sebelumnya 28–40 px)
   * Seluruh kotak pembungkus (*containers*, kartu aksi, bilah status, modal pop-up) diperbesar secara proporsional dengan kalimat teks yang dipadatkan (2–3 baris tegas) untuk menjamin keterbacaan 100% tanpa risiko tumpang tindih (*zero overlap*) dari jarak pandang bangku belakang siswa (5–8 meter) di kelas 5A SDN Percobaan 2 Malang.
6. **Desain Visual Taktil & Sistem Desain Harmonis Seiras Homepage (Rich Emerald Enamel & Polished Gold Standard):**
   * Antarmuka mengadopsi identitas visual yang seiras penuh dengan Homepage (*TitleScene*) dan Buku Panduan (*TutorialScene*):
     - **Palet Warna:** Kanvas pemandangan alam panorama sawah 1080p yang cerah alami di siang hari, panel utama menggunakan *Dark Emerald Enamel* (`0x064e3b` / `0x022c22`), bingkai ganda emas mengkilap (*Polished Gold* `0xf59e0b` / `#fef08a`), aksen *Cyan Blue* (`0x38bdf8`), dan tipografi ramah anak kontras tinggi (*Fredoka Bold* `#fef08a` dan *Nunito Bold* `#ffffff`).
     - **Hero Character Select Slider Showcase (TeamSelectScene.js):** Menggantikan tata letak 5 kartu berjejer yang padat menjadi format *Hero Showcase Slider* panggung tunggal megah ( \times 550$ px) berbingkai enamel dan emas mengkilap:
       - **Panggung Karakter Utama (Hero Stage):** Menampilkan 1 pahlawan tim secara fokus dan besar di panggung pusat. Kolom kiri menampung maskot hewan resolusi tinggi ( \times 270$ px) di atas pedestal 3D dengan aura cahaya radial tim (*breathing idle animation*), serta lencana bintang status misi selesai. Kolom kanan menampung medali emas resmi pahlawan, tag kategori peran, nama tim ($ px), semboyan/motto tim ($ px), kotak *dossier* sains peran ekologis ($ px dengan *wordWrap* rapi anti-tumpang-tindih), label spesialisasi misi ($ px), dan tombol sentuh chunky 3D berukuran besar ( \times 74$ px, $ px, 👉 PILIH TIM INI! 🚀) lengkap dengan efek gelombang kejut cincin emas (*shockwave ring*).
       - **Bilah Komando 2-Zona Bebas Tabrakan:** Header atas setinggi 68 px khusus untuk tombol kembali ◀ MENU UTAMA ( \times 48$ px), avatar pemandu Gita bersuara (👧 GITA: Sentuh pahlawan timmu untuk mulai bertualang!), tombol audio 🔊 DENGARKAN ( \times 48$ px), serta utilitas IFP 🔊 Suara dan ⛶ Layar dengan jarak bebas lebih dari 270 px tanpa risiko tabrakan teks. Plakat judul 🏆 PILIH TIM DETEKTIF SAWAH 🌾 ($ px) ditempatkan mandiri di bawah header berlatar belakang kaca zamrud transparan ( \times 82$ px).
       - **Sistem Navigasi Hibrida Tiga Jalur:** (1) Sepasang tombol panah arkade samping bertaraf sentuh IFP ( \times 120$ px, radius 22 px, lis emas 2.5 px) di  = 175$ dan  = 1745$, (2) Dok selektor miniatur 5 tim di kuadran bawah ( = 960, Y = 825$) dengan 5 ubin berkontur membulat ( \times 82$ px) berbingkai emas bercahaya pada tim aktif untuk pemilihan instan 1-sentuhan, dan (3) Gestur usap layar (*touch swipe gesture*) dengan toleransi pergerakan 60 px.
      - **Master 2-Column Split Hero Stage Showcase (BiomeSelectScene.js):** Mengadopsi arsitektur panggung pahlawan 2-kolom terpisah ($1540 \times 580$ px) berbingkai enamel zamrud dan lis ganda emas mengkilap untuk meniadakan 100% risiko tumpang tindih teks:
         - **Kolom Kiri (Identitas Bioma & Tombol Aksi):** Menampung Medali Bioma Besar ($\\varnothing 100$ px) berlingkaran halo cahaya radial tim, lencana kapsul bintang prestasi (`⭐ 0/6 BINTANG`), nama ekosistem ($32$ px), tagline bioma ($24$ px), kotak deskripsi sains ekologis mandiri ($580 \times 126$ px, $24$ px dengan *wordWrap* rapi), serta tombol aksi sentuh chunky 3D raksasa ($580 \times 72$ px, $30$ px, `👉 SELIDIKI EKOSISTEM INI! 🚀`) lengkap dengan gelombang kejut cincin emas (*shockwave ring*).
         - **Kolom Kanan (Jaring Trofik & 2 Kartu Misi Bertumpuk):** Menampung header terpisah `🐾 RANTAI MAKANAN UTAMA:` ($24$ px) di atas deretan pil organisme *single-line sleek* (zero collision dengan nama organisme!), serta 2 kartu misi vertikal yang lega ($750 \times 135$ px per kartu) dengan judul misi, deskripsi headline, dan status kapsul (`⚡ Siap Diselidiki` / `🔒 Terkunci`) yang memiliki padding internal lega bebas dari pemotongan border bawah.
         - **Bilah Komando Atas Emas-Zamrud Terpadu ($1760 \times 74$ px):** Lencana tim aktif dengan *secret 5-tap examiner trigger*, nama tim giliran, perolehan bintang global ($0/48$), serta tombol pill seragam (`🔊 Suara`, `👥 Ganti Tim`, `⚙️ Reset Kelas`) berjarak simetris.
         - **Dok 4 Bioma di Bawah Layar ($Y = 925$):** 4 ubin rounded enamel ($340 \times 86$ px) dengan sorotan emas mengkilap 3.5px pada bioma aktif dan status terkunci/terbuka.
         - **Sistem Navigasi Hibrida:** Tombol panah arkade samping ($84 \times 120$ px, radius 22px) di $X = 105$ dan $X = 1815$, 4 dok bioma bawah, serta *touch swipe gesture*.
       - **2-Column Side-by-Side Mission Grid Showcase (MissionMenuScene.js):** Menggantikan tata letak 2 kartu bertumpuk atas-bawah menjadi kisi 2 kolom berdampingan (*side-by-side grid*) berdimensi proporsional (~ \times 560$ px per kartu) dengan pemisahan komparatif antara Misi 1 (Faktor Ulah Alam) di kolom kiri dan Misi 2 (Faktor Ulah Manusia) di kolom kanan. Memuat header kartu (ikon 100px, badge jenis misi, dan bintang), deskripsi teks sains lega anti-tumpang-tindih, tombol aksi sentuh IFP penuh 68px, pita misi spesial tim, serta plakat rekapitulasi progres bintang bioma di kuadran bawah.
       - **Streamlined Command Header & Centered Health Pod (SimulationScene.js):** Bilah komando atas (1920 $\times$ 70 px) mengadopsi tata letak simetris terdistribusi penuh dengan keseimbangan visual kiri-kanan:
        - **Sisi Kiri:** Tombol Keluar (`🚪 KELUAR`, $X = 85$, $130 \times 48$ px), Lencana Pahlawan & Nama Tim ($X = 185, 220$), dan Kapsul Timer giliran kelompok berbingkai emas (`⏱️ WAKTU: 07:00`, $X = 510$, $240 \times 48$ px).
        - **Pusat Monitor (Tepat di Sumbu $X = 960$ px):** *Health Meter Pod* dua baris vertikal ($460 \times 58$ px, *Dark Glassmorphism* berbingkai *Emerald* `0x10b981`). Baris atas memisahkan label nama ekosistem rata-kiri dengan teks emosi/persentase reaktif rata-kanan (`😱 BAHAYA / 😊 SEHAT (xx%)`). Baris bawah menampung lintasan progress bar dinamis selebar 424 px. Meniadakan 100% risiko tumpang tindih (*overlap collision*).
        - **Sisi Kanan:** Tombol kolaborasi Penasihat Meja (`📢 TANYA TEMAN`, $X = 1330$, $210 \times 48$ px), ensiklopedia (`📖 KAMUS ALAM`, $X = 1565$, $210 \times 48$ px), tombol toggle audio (`🔊 Suara`, $X = 1735$, $90 \times 48$ px), dan toggle layar penuh (`⛶ Layar`, $X = 1835$, $90 \times 48$ px). Seluruh bentang 1920px terisi seimbang tanpa ruang kosong asimetris.
      - **Horizontal Slider Action Dock (Zona Bawah IFP):** Panel aksi sentuh kuadran bawah (lebar 1600 px) diubah menjadi kisi korsel horizontal interaktif (*horizontal slider carousel*) untuk mengatasi masalah kepadatan/bertumpuknya elemen:
        - Menampilkan kartu-kartu aksi secara berjajar (lebar masing-masing 260 px, margin antar kartu 24 px) dilengkapi tombol panah arkade besar (`◀` dan `▶`) di sisi kiri dan kanan.
        - Memanfaatkan mekanisme `scroll-snap` dan navigasi gulir mulus (`smooth scrolling`), sehingga siswa tidak perlu memaksakan sentuhan pada ruang yang sempit (*anti-fat-finger*).
        - Kartu aksi (memulihkan tanaman, menambah pemangsa) memiliki tinggi proporsional dengan ikon vektor tebal dan teks berukuran lega, memudahkan interaksi layar IFP.
      - **Enclosed Mascot Speech Banner (Gita Scaffolding):** Balon dialog Gita diperluas menjadi lebar 630 px ($X = 450, Y = 160$) lengkap dengan plakat identitas `👧 GITA (PANDUAN DETEKTIF):` (24px) di bagian atas teks, serta tombol narasi suara audio (`🔊`, $X = 680$) dan tombol perancah kognitif ZPD (`💡`, $X = 735$) yang terlindungi di dalam ornamen batas panel tanpa terpotong.
      - **Terminal Quest Checklist Real-Time (Kanan Atas):** Widget checklist ($560 \times 205$ px, $X = 1615, Y = 185$) dilengkapi plakat kapsul header emas-zamrud `📋 TARGET MISI DETEKTIF` (24px) dan 3 strip baris target 24px untuk keterbacaan maksimal dari meja kelas.
       - **Chunky 3D Solid Tiles & Anti-Glare Visual Standard (Zero Outline/Stroke):** Seluruh kartu antarmuka (TeamSelectScene, MissionMenuScene, how.js, 	eacher.js, dsb.) menggunakan kontur *rounded rect* berenamel zamrud tua murni **tanpa garis tepi kawat (Zero Outline/Stroke)**. Pemisahan visual kartu mengandalkan kontras warna latar, bayangan bevel bawah 3D setebal 4–14px netral (
gba(0,0,0,.35) hingga .55), serta kilau tepi atas halus (inset 0 1px 0 rgba(255,255,255,.08 - .15)). Status aktif atau pilihan kuis benar ditandai dengan blok warna solid kontras tinggi (misal hijau zamrud penuh) dengan ikon centang tanpa garis tepi (*fully borderless*).
      - **Pemberian Peran Spesialis dengan Pita Emas Taktil:** Menu misi menampilkan banner emas solid `⭐ MISI UTAMA SPESIALIS: [NAMA TIM] ⭐` dengan bayangan gelap netral untuk memandu giliran kelompok secara eksplisit tanpa kebingungan pilihan.
     - **Isolasi Kedalaman Layer Modal Anti-Tumpuk (Z-Index Isolation):** Seluruh jendela pop-up briefing kasus dan modal voting kelas dibungkus dalam *container* khusus berkedalaman tinggi (`setDepth(201)` dan *dimmer backdrop* `setDepth(200)`), menjamin kartu menu di latar belakang tidak lagi menembus ke depan modal saat disentuh siswa.
     - **Aktivasi 100% Aset Visual Nyata:**
       - **8 Kartu Ensiklopedia & Kamus Sawah:** Pop-up interaktif berbasis Piaget Concrete Operational (`kamus_pematang`, `kamus_wereng`, `kamus_irigasi`, `kamus_pengurai`, `kamus_pemangsa`, `kamus_hama`, `kamus_gulma`, `kamus_limbah`) dengan tampilan dua tingkat (kisi 4x2 dan tampilan detail sains lengkap serta relevansi SDN Percobaan 2).
       - **3 Kartu Voting CSCL Fisik & Modal Musyawarah Kelas:** Tiga kartu voting digital mengadopsi gaya visual taktil 3D berkontur enamel solid (*Zero Outline/Stroke*) yang dipadukan dengan chip penanda kartu fisik (`🟢 KARTU HIJAU`, `🟡 KARTU KUNING`, `🔴 KARTU MERAH`), lingkaran ikon aksi timbul (`ic(a.ic, 44)`), judul tebal Playful Kids (`Fredoka`), badge gratis emas, serta animasi melesak 6px saat disentuh. Modal dilengkapi *kicker* peran CSCL (`🤝 CSCL • KOLABORASI KELAS 5A • PENASIHAT MEJA & PETUGAS LAYAR`) dan kapsul timer hitung mundur 15 detik dinamis (`.vote-timer-pill`) yang berdenyut peringatan pada 5 detik terakhir serta beralih ke plakat penanda waktu habis saat diskusi berakhir.
       - **Embodiment Maskot Gita Dinamis:** Sprite ekspresi wajah Gita berganti secara reaktif (`gita_talk` saat bersuara, `gita_think` saat bahaya/berpikir, `gita_thumbsup` saat sawah sehat, dan `gita_cheer` saat menang di layar evaluasi).
       - **Ikon Organisme Kontekstual & HUD Bar Skin:** Tombol aksi bawah menampilkan sprite visual asli (`ular`, `padi_subur`, `katak`, `jamur`, `icon_pestisida`, `icon_kemarau`, dsb.) serta frame visual `hud_cooldown_bar`.
      - **Mascot Speech Bar:** Dialog pemandu Gita si Detektif Cilik diformat sebagai bilah panel zamrud berbingkai emas dengan avatar Gita *close-up* berbingkai lingkaran, tag identitas kapsul emas hangat, teks sapaan kontras tinggi, dan tombol audio `🔊 DENGARKAN`.
      - **Harmonisasi Layar Penuh Cara Bermain & Aturan Misi (Standar IFP & Anti-Clutter):** Layar `Cara Bermain` (`#scr-how` / `how.js`) mengadopsi struktur *1-column stepper* berbingkai enamel zamrud terpadu yang seiras dengan Panduan Guru. Menghilangkan seluruh ikon dekoratif yang tidak perlu di depan judul langkah, menyelaraskan seluruh pil peran/strategi ke palet harmonis ekosistem alam (mengeliminasi warna cyan/neon biru yang *out of context*), mempertahankan mockup visual interaktif di panel kiri dengan bingkai gelap rapi, dan mengintegrasikan tombol navigasi akhir secara elegan (`Mulai Petualangan ➔` di langkah ke-4) tanpa tombol footer melayang yang menduplikasi aksi atau memotong ruang vertikal antarmuka.
      - **Umpan Balik Taktil IFP Tanpa Pendar (Zero-Glow Tactile Feedback):** Tombol dan kartu memberikan animasi melesak 4–5px (*push-down bounce*) dengan penurunan bayangan bevel 3D saat disentuh jari siswa di layar IFP kelas, tanpa efek pendar atau ring glow yang mengaburkan teks dari jarak pandang kelas.
7. **Mode Penguji / Dosen & Modal Konfirmasi Sentuh IFP (Hardware Touch Dialog & Examiner Gesture):**
   * **In-Engine Touch Modal:** Meniadakan ketergantungan pada dialog sistem peramban (`window.confirm`) yang tidak ergonomis di layar IFP (sering kali muncul kecil di pojok atas tak terjangkau tangan siswa/guru). Seluruh konfirmasi aksi penting (seperti reset progres) digantikan modal in-engine Phaser (`showConfirmModal`) berlatar gelap transparan (Alpha 0.8) dengan tombol sentuh berukuran besar ramah jemari (`✅ Ya, Reset` & `❌ Batal`).
   * **Gesture Rahasia Penguji (*Examiner Mode*):** Pada `BiomeSelectScene.js`, ketukan 5 kali berturut-turut pada lencana tim dalam durasi 3 detik memicu fungsi `progressManager.unlockAllForExaminer()`, membuka instan seluruh 4 bioma, 16 misi, dan perolehan 48/48 bintang prestasi untuk memfasilitasi kebutuhan demonstrasi simulasi saat validasi ahli materi/media, seminar proposal, maupun sidang skripsi.

---

## 4. CORE GAMEPLAY LOOP & ORKESTRASI KELAS (25 SISWA)

Model pembelajaran memanfaatkan sintaks kooperatif **Jigsaw (Elliot Aronson)** yang dipadukan dengan siklus **POE (*Predict - Observe - Explain*)** dan didampingi instrumen cetak `LKPD_DETEKTIF_SAWAH.md`:

### 4.1 Penyelesaian Masalah Kebosanan & Efek Mencontek (*The Bored Kids & Anti-Copycat Solutions*)
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

---

### 4.2 Sistem Animasi Natural Organisme Berbasis State Machine & Web Audio (CTML Mayer & Piaget C2)
Untuk memperjelas pemahaman hubungan kausalitas (C2) dan menghindari kemunculan/penghilangan objek secara mendadak (*abrupt apparition/disappearance*), antarmuka simulasi 4 bioma menerapkan **Organism Lifecycle State Machine**:
1. **Prinsip Keterpaduan Temporal & Modalitas (Mayer CTML):**
   - **Tunas Bertumbuh (*Spawning In*):** Padi, pohon rimba, gulma air, dan terumbu karang bertumbuh perlahan dari tunas kecil ke atas (~1.5–1.7 detik, `scaleY` 0.1 $\to$ 1.0) dengan warna hijau cerah segar dan diiringi efek nada arpeggio naik (`sfx.grow()`).
   - **Hewan Masuk Lincah:** Tikus, katak, rusa, harimau, bangau, dan ikan bergerak/melompat masuk dari balik pematang, semak, atau aliran air menuju titik habitatnya.
2. **Kausalitas Kontekstual Konkret (Piaget Operasional Konkret - C2):**
   - **Melayu di Tempat (*Withering Out*):** Jika populasi berkurang akibat racun pestisida, kekeringan, limbah detergen, atau pemanasan suhu (*coral bleaching*), organisme mengalami pelayuan di tempat (warna menguning/cokelat kusam, dahan rebah terkulai miring, atau karang memutih pucat) sebelum meluruh perlahan dengan efek suara nada turun (`sfx.wither()`). Memberikan konfirmasi visual konkret bahwa racun/polusi merusak tubuh organisme.
   - **Lari/Kabur Menghindar (*Fleeing Out*):** Jika populasi berkurang karena interaksi rantai makanan alami (dimangsa predator), hewan berlari/berenang lincah menjauhi area krisis ke tepi layar/semak dengan efek suara derap lincah (`sfx.flee()`).

---

## 5. SKENARIO 16 MISI PADA 4 EKOSISTEM NUSANTARA (4 BIOMA × 4 MISI)


```
+------------------------------------------------------------------------------------------------------------------------------------+
|                                    PETA 16 MISI PENYELAMATAN 4 EKOSISTEM NUSANTARA (JIGSAW EXPERT)                                 |
+----+------------+------------------------+-------------------------------------+---------------------------------+-----------------+
| NO | BIOMA      | KATEGORI PENYEBAB      | JUDUL MISI                          | MASALAH KRISIS                  | TUGAS DETEKTIF  |
+----+------------+------------------------+-------------------------------------+---------------------------------+-----------------+
| 1  | 🌾 Sawah   | 🍃 Faktor Ulah Alam    | Misi 1: Tanah Retak Kekeringan      | Saluran irigasi kering & padi   | Alirkan air,    |
|    |            | (Jalur Alam 1)         |                                     | layu karena kemarau panjang     | tanam padi!     |
+----+------------+------------------------+-------------------------------------+---------------------------------+-----------------+
| 2  | 🌾 Sawah   | 🍃 Faktor Ulah Alam    | Misi 2: Serangan Hama Wereng Batang | Cuaca lembap memicu jutaan      | Lepas katak,    |
|    |            | (Unlock: Lulus M1 Alam)| Cokelat                             | wereng hisap cairan padi        | semprot mimba!  |
+----+------------+------------------------+-------------------------------------+---------------------------------+-----------------+
| 3  | 🌾 Sawah   | ⚠️ Faktor Ulah Manusia | Misi 3: Bahaya Racun Kimia &        | Pestisida disemprot berlebih &  | Bilas racun,    |
|    |            | (Jalur Manusia 1)      | Pestisida                           | cacing mati, katak teracuni     | tebar kompos!   |
+----+------------+------------------------+-------------------------------------+---------------------------------+-----------------+
| 4  | 🌾 Sawah   | ⚠️ Faktor Ulah Manusia | Misi 4: Perburuan Ular & Jerat      | Ular diburu habis & jerat maut  | Sita jerat,     |
|    |            | (Unlock: Lulus M3 Man) | Petani                              | dipasang -> Tikus membludak!    | lepas ular!     |
+----+------------+------------------------+-------------------------------------+---------------------------------+-----------------+
| 5  | 🌲 Hutan   | 🍃 Faktor Ulah Alam    | Misi 1: Kemarau & Mata Air Rimba    | Panas terik mengeringkan mata   | Alirkan mata air|
|    |    Tropis  | (Jalur Alam 1)         | Kering                              | air & rumput pakan rusa layu    | reboisasi rimba!|
+----+------------+------------------------+-------------------------------------+---------------------------------+-----------------+
| 6  | 🌲 Hutan   | 🍃 Faktor Ulah Alam    | Misi 2: Gesekan Ranting & Asap      | Gesekan dahan bambu kering      | Padamkan bara,  |
|    |    Tropis  | (Unlock: Lulus M5 Alam)| Hutan                               | memicu titik api & asap rimba   | sekat bakar!    |
+----+------------+------------------------+-------------------------------------+---------------------------------+-----------------+
| 7  | 🌲 Hutan   | ⚠️ Faktor Ulah Manusia | Misi 3: Penebangan Liar (Pembalakan | Pembalakan liar pohon meranti   | Patroli hutan,  |
|    |    Tropis  | (Jalur Manusia 1)      | Rimba)                              | membuat bukit botak & longsor   | reboisasi!      |
+----+------------+------------------------+-------------------------------------+---------------------------------+-----------------+
| 8  | 🌲 Hutan   | ⚠️ Faktor Ulah Manusia | Misi 4: Jerat Kawat Pemburu Harimau | Pemburu memasang jerat kawat    | Sita jerat,     |
|    |    Tropis  | (Unlock: Lulus M7 Man) |                                     | maut melukai Harimau Sumatera   | rawat harimau!  |
+----+------------+------------------------+-------------------------------------+---------------------------------+-----------------+
| 9  | 🌊 Sungai  | 🍃 Faktor Ulah Alam    | Misi 1: Air Surut & Ledakan Gulma   | Aliran surut & eceng gondok     | Buka pintu air, |
|    |    Tawar   | (Jalur Alam 1)         | Eceng Gondok                        | tutup rapat permukaan sungai    | angkat gulma!   |
+----+------------+------------------------+-------------------------------------+---------------------------------+-----------------+
| 10 | 🌊 Sungai  | 🍃 Faktor Ulah Alam    | Misi 2: Erosi Tebing &              | Longsoran tanah hulu membawa    | Keruk lumpur,   |
|    |    Tawar   | (Unlock: Lulus M9 Alam)| Pendangkalan Sungai                 | endapan lumpur menyumbat insang | tanam vetiver!  |
+----+------------+------------------------+-------------------------------------+---------------------------------+-----------------+
| 11 | 🌊 Sungai  | ⚠️ Faktor Ulah Manusia | Misi 3: Limbah Kimia Detergen       | Pabrik buang limbah detergen    | Saring limbah,  |
|    |    Tawar   | (Jalur Manusia 1)      | Pabrik                              | busa racuni ikan & bangau       | angkut sampah!  |
+----+------------+------------------------+-------------------------------------+---------------------------------+-----------------+
| 12 | 🌊 Sungai  | ⚠️ Faktor Ulah Manusia | Misi 4: Penangkapan Ikan Berbahaya  | Setrum aki & racun tuba bunuh   | Sita setrum,    |
|    |    Tawar   | (Unlock: Lulus M11 Man)| (Setrum & Tuba)                     | seluruh benih & telur ikan air  | netralkan tuba! |
+----+------------+------------------------+-------------------------------------+---------------------------------+-----------------+
| 13 | 🪸 Laut    | 🍃 Faktor Ulah Alam    | Misi 1: Air Laut Panas & Karang     | Suhu samudra memanas ekstrem    | Pasang naungan, |
|    |    Karang  | (Jalur Alam 1)         | Memutih                             | terumbu karang memutih massal   | transplantasi!  |
+----+------------+------------------------+-------------------------------------+---------------------------------+-----------------+
| 14 | 🪸 Laut    | 🍃 Faktor Ulah Alam    | Misi 2: Gelombang Badai Tropis &    | Badai ombak robohkan karang     | Pasang spider,  |
|    |    Karang  | (Unlock: Lulus M13 Alm)| Karang Roboh                        | & pasir timbun padang lamun     | lepas penyu!    |
+----+------------+------------------------+-------------------------------------+---------------------------------+-----------------+
| 15 | 🪸 Laut    | ⚠️ Faktor Ulah Manusia | Misi 3: Bom Ikan Peledak Penghancur | Bom ikan ledakkan karang ratusan| Sita bom ikan,  |
|    |    Karang  | (Jalur Manusia 1)      | Karang                              | tahun menjadi serpihan batu     | tanam acropora! |
+----+------------+------------------------+-------------------------------------+---------------------------------+-----------------+
| 16 | 🪸 Laut    | ⚠️ Faktor Ulah Manusia | Misi 4: Sampah Plastik Samudra &    | Kantong plastik ditelan penyu & | Kutip plastik,  |
|    |    Karang  | (Unlock: Lulus M15 Man)| Pukat Hanyut                        | jaring trawl rusak dasar karang | sita trawl!     |
+----+------------+------------------------+-------------------------------------+---------------------------------+-----------------+
```

---

## 6. SISTEM PENILAIAN BINTANG & PROGRESI PEMBUKAAN (PROGRESSION LOCK)

### 6.1 Formula Perolehan 1–3 Bintang per Misi
Setiap misi memberikan penghargaan hingga 3 Bintang Prestasi Detektif:
* ⭐ **Bintang 1 (Stabilitas Ekosistem):** Meraih Tingkat Kesehatan Ekosistem $\ge 75\%$ dan menyelesaikan seluruh target checklist.
* ⭐⭐ **Bintang 2 (Kecakapan Kausalitas C2):** Berhasil menjawab kuis refleksi sebab-akibat di Buku Catatan Detektif.
* ⭐⭐⭐ **Bintang 3 (Penguasaan Konsep C2 Sempurna):** Menjawab kuis dengan tepat pada kesempatan/percobaan pertama (*first attempt*).
* **Total Maksimal:** 12 Bintang per Kelompok Detektif (Total 48 Bintang di seluruh 4 Ekosistem Nusantara).

### 6.2 Aturan Pembukaan Misi & Ekosistem (Progression Lock)
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

---

## 7. SISTEM KESEHATAN EKOSISTEM & EMOSI ALAM

### 7.1 Empat Kondisi Kesehatan Ekosistem
* **😱 BAHAYA (Kesehatan $< 45\%$):** Bar merah berdenyut, border *vignette* krisis berkedip, Gita memberi peringatan bahaya.
* **⚠️ KURANG SEIMBANG (Kesehatan $45\% - 59\%$):** Bar kuning, sebagian organisme mulai merespons perbaikan.
* **😊 CUKUP SEIMBANG (Kesehatan $60\% - 74\%$):** Bar kuning-hijau, populasi mendekati batas aman.
* **🌟 SANGAT SEIMBANG (Kesehatan $\ge 75\%$):** Bar hijau zamrud berkilau, Gita mengacungkan jempol (*gita_thumbsup*), tombol "CEK HASIL" berdenyut emas.

### 7.2 Semangat Belajar Positif (*Tanpa Game Over*)
Jika waktu habis, layar **tidak pernah** menampilkan tulisan *"Game Over"*. Sebaliknya, muncul layar ramah: **"Buku Catatan Detektif Gita"**:
* Gita mengajak berdiskusi: *"Tidak apa-apa! Mari kita cari tahu mengapa rantai makanan ini belum seimbang. Yuk kita diskusikan bersama teman-teman!"*.
* Tim tetap diarahkan ke sesi teka-teki formatif untuk memahami kesenjangan konsep (C2).

---

## 8. BUKU CATATAN DETEKTIF GITA: MASTER BANK TEKA-TEKI SEBAB-AKIBAT (C2)

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

---

## 9. SPESIFIKASI TEKNIS & ARSITEKTUR PERANGKAT LUNAK

* **Engine:** Phaser 3 (v3.87+ Standalone Offline, WebGL & Canvas Renderer)
* **Mode Render Visual:** *Smooth HD Cartoon Mode* (`pixelArt: false`, `antialias: true`, `antialiasGL: true`, `roundPixels: false`) dengan interpolasi bilinear GPU untuk memastikan aset ilustrasi karakter Gita dan organisme vektor beresolusi tinggi tampak halus, lembut, bebas artefak gerigi, dan nyaman dipandang siswa pada layar sentuh IFP 65–75 inci.
* **Resolusi:** $1920 \times 1080$ Widescreen (`Phaser.Scale.FIT`, `Phaser.Scale.CENTER_BOTH`)
* **Arsitektur Data Layer Terpadu:**
  * `js/phaser-game/data/ecosystems-data.js`: Master konfigurasi 4 bioma, 8 misi (alam vs manusia), target kuota, initial population, actions, dan kuis C2.
  * `js/phaser-game/managers/ProgressManager.js`: State manager kemajuan pemain, pelacak bintang (0-24), status unlock misi/bioma, serta persistensi *LocalStorage*.
* **Struktur Alur & Scene Game (9 Modul Mandiri):**
  1. `BootScene.js` – Memuat seluruh aset gambar vektor 4 bioma, organisme, audio, dan kamus lokal (Zero CORS).
  2. `TitleScene.js` – Layar Utama Homescreen (Mulai Main, Cara Bermain, Profil & Panduan Guru).
  3. `TutorialScene.js` – Panduan Interaktif 4 Slide (Rantai Makanan, Peran Tim, dan Kartu Voting CSCL).
  4. `TeamSelectScene.js` – Pemilihan 5 Kelompok Giliran Kelas 5A (Tim Elang, Ular, Katak, Padi, Jamur).
  5. `BiomeSelectScene.js` – **Panggung Peta 4 Ekosistem Nusantara (Stage Showcase Slider):** Layar pemilihan Sawah, Hutan Tropis, Sungai, dan Laut dalam format carousel slider panggung sinematik dengan crossfade background 1080p dinamis, hero plaque, navigasi panah samping, dan thumbnail dock bawah.
  6. `MissionMenuScene.js` – **Menu 2 Misi per Bioma:** Memilih Misi 1 (Faktor Ulah Alam) atau Misi 2 (Faktor Ulah Manusia - Terkunci hingga M1 tuntas).
  7. `SimulationScene.js` – **Arena Simulasi Ekosistem Dinamis:** Background dinamis sesuai bioma, sprite pool multi-bioma, contextual gated touch controls, dan quest checklist real-time.
  8. `QuizScene.js` – **Buku Catatan Detektif C2 Data-Driven:** Menguji pemahaman sebab-akibat berdasarkan stimulus krisis misi aktif dengan pelacakan *first attempt* untuk bintang ke-3.
  9. `VictoryScene.js` – **Layar Selebrasi Prestasi:** Perhitungan 1-3 bintang, penyimpanan progres via `ProgressManager`, banner pembukaan misi/bioma baru, dan navigasi estafet.
* **Alur Navigasi Permainan Lengkap:**
  `BootScene` ➡️ `TitleScene` ➡️ (`TutorialScene` atau `TeamSelectScene`) ➡️ `BiomeSelectScene` ➡️ `MissionMenuScene` ➡️ `SimulationScene` ➡️ `QuizScene` ➡️ `VictoryScene` ➡️ (`MissionMenuScene` atau `BiomeSelectScene`).
* **Headless Automated Test Suites (Regresi Logika Sains & Progresi):**
  * `WEBSITE/tests/test_simulation_logic.js`: Memvalidasi matematis transfer energi trofik, siklus predasi tiap 3 detik, konsumsi produsen, dan penambahan populasi pada 4 bioma secara mandiri tanpa browser (headless Node.js).
  * `WEBSITE/tests/test_progress_manager.js`: Memvalidasi kalkulasi bintang (0-24), serialisasi LocalStorage, pembukaan kunci gembok bertahap, dan verifikasi integritas Mode Penguji / Dosen (Unlock All).
* **Dokumen Inventaris Naskah Terintegrasi:**
  * Seluruh naskah narasi, instruksi 4 slide panduan, dialog interaktif Gita, scaffolding ZPD, panggilan voting Penasihat Meja, bank soal teka-teki C2, dan selebrasi estafet telah diekstrak dan didokumentasikan lengkap pada berkas pendamping: [`docs/NASKAH_KONTEN_GAME_GITA.md`](file:///d:/SKRIPSI%20GITA/docs/NASKAH_KONTEN_GAME_GITA.md).
* **Dokumentasi Generator Aset Visual AI Terstruktur:**
  * Seluruh prompt citra Google Gemini / Imagen 3 untuk karakter maskot Gita, organisme sawah, organisme multi-bioma (laut, hutan, danau), 8 kartu pop-up Kamus Kata konkret, kartu voting CSCL Penasihat Meja, dan antarmuka IFP didokumentasikan lengkap beserta negative prompt di [`docs/PROMPT_ASSET_GEMINI.md`](file:///d:/SKRIPSI%20GITA/docs/PROMPT_ASSET_GEMINI.md).
* **Arsitektur Rendering Prosedural Flora Tropis Realistis (`treeDraw`):**
  * Engine kanvas dilengkapi algoritma rendering flora prosedural multi-layer untuk Hutan Rimba: kanopi awan organik bertingkat 3D (*organic cloud-cluster lobes*) dengan pencahayaan gradasi pucuk muda, batang berakar banir (*buttress roots*) dengan serat guratan kulit kayu vertikal dan lumut pangkal akar, percabangan dahan alami, sulur liana tropis, animasi hembusan angin multi-frekuensi (*wind sway*), serta transisi meranggas (*wither*) saat degradasi ekosistem. Lapisan pohon juga membedakan depth of field melalui perspektif atmosferik (*aerial haze*) pada layer latar belakang.
* **Arsitektur Rendering Prosedural Tekstur Tanah Daratan (`texSoilSawah`, `texSoilHutan`, `texSoilSungai`):**
  * **Sawah (`texSoilSawah`):** Menggantikan coretan garis primitif dengan pematang lumpur bertingkat (*terraced mud bunds/galengan*), partikel endapan aluvial mineral, dan sistem rekahan tanah kemarau poligonal dinamis saat `S.water < 32` serta diskolorasi tanah kimiawi saat `S.poison > 20`.
  * **Hutan Rimba (`texSoilHutan`):** Menggantikan poligon flat satu warna dengan tanah humus gelap bergradasi organik, bantalan lumut beludru tebal (*velvety moss pads*), taburan serasah dedaunan gugur & ranting lapuk, serta bercak abu/arang dan kerlip bara api saat krisis kebakaran (`S.api > 10`).
  * **Sungai (`texSoilSungai`):** Menggantikan balok datar dengan bantalan tanah lereng bergradasi, garis lumpur basah pasang-surut (*wet mud waterline*), kelompok bebatuan kerikil bulat halus (*riverbed pebbles & granite*), dan lumut basah tepi air.
* **Sistem Reaksi Partikel & Kausalitas Biologis Semprotan (`showSprayEffect`, `sfx.spray`, `spWereng`):**
  * **Aerosol Mist Particle Emitter:** Animasi botol sprayer bertekanan yang menyemburkan kerucut 30 partikel aerosol berwarna kontekstual (hijau-emas mimba, biru padam api, cyan bilas air) disertai kilau embun (*dew sparkles*) dan lencana dampak melayang.
  * **Sintesis Audio Web Audio API (`sfx.spray()`):** Simulasi desis semprotan bertekanan menggunakan filter bandpass sweeping 2.8kHz $\rightarrow$ 1.1kHz dan attenuating tone.
  * **Visualisasi & Reaksi Kausalitas Hama Wereng (`spWereng`):** Populasi hama wereng cokelat (*Nilaparvata lugens*) tampak nyata berkerumun di rumpun padi, dan seketika berputar pusing (*tumble rotation*) lalu jatuh berguguran ke lumpur sawah saat disemprot, memperjelas kausalitas intervensi manusia terhadap dinamika hama secara konkret bagi siswa kelas 5 SD.

* **Arsitektur Audio Voice-Over (VO) Vokal Mandiri (`playVO`, `stopVO`):**
  * **Prinsip Suara Manusiawi (Mayer's Voice Principle):** Menggantikan suara sintetis TTS robotik dengan rekaman vokal manusia asli peneliti sebagai "Kakak Gita" (`assets/audio/vo/*.mp3`), mencakup 72 naskah rekaman vokal terstruktur (sistem umum, bridging krisis 16 misi, musyawarah CSCL, hingga pembacaan soal kuis C2).
  * **Lifecycle Audio Bersih & Pop-Free:** Dilengkapi fungsi `stopVO()` pada transisi antar-layar (`go(screenId)`) dan jeda dialog untuk mencegah kebocoran suara.
  * **Failsafe Non-Intrusif:** Jika berkas MP3 tertentu belum selesai direkam, pemutar audio menangani pemutaran secara hening (*silent fallback*) tanpa menampilkan pesan eror merah pada konsol peramban IFP.
  * **Dokumentasi Naskah Induk:** Naskah lengkap 72 audio vokal didokumentasikan di [`docs/DOKUMEN_AUDIT_VOICE_OVER.md`](file:///d:/SKRIPSI%20GITA/docs/DOKUMEN_AUDIT_VOICE_OVER.md).

* **Kesiapan Multi-Platform & PWA Android (Progressive Web App & Standalone APK):**
  * **Web App Manifest (`manifest.json`):** Dikonfigurasi dengan mode `standalone`, orientasi terkunci `landscape`, dan tema warna alami Nusantara (`#022c22` / `#011a14`), dilengkapi aset ikon resmi 192x192 dan 512x512 maskable.
  * **Offline Service Worker Engine (`sw.js`):** Menggunakan strategi caching canggih (*Stale-While-Revalidate*) untuk seluruh aset shell permainan, memungkinkan game dimainkan 100% tanpa jaringan internet di tablet Android maupun HP siswa.
  * **Sistem Deteksi Orientasi & Fullscreen Otomatis (`checkOrientation`, `toggleFullScreen`):** Mendeteksi orientasi layar perangkat mobile secara dinamis; memunculkan modal panduan putar layar (*Rotate Device to Landscape*) jika HP dipegang dalam mode portrait, serta tombol fullscreen satu-sentuhan yang mengunci layar horizontal.
  * **Kesiapan Distribusi Standalone APK:** Memenuhi 100% skor kelayakan PWA Google, siap dikemas menjadi file paket instalasi `.apk` mandiri via platform Google/Microsoft PWABuilder maupun WebAPK Chrome Android.

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
