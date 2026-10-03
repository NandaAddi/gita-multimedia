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
* **Subjek Uji Coba:** 25 Siswa Kelas 5A SDN Percobaan 2 Malang (Terbagi dalam 5 Kelompok Kolaboratif) & Guru Kelas
* **Target Perangkat:** Layar Sentuh *Interactive Flat Panel* (IFP 65–86 Inch, 1920 $\times$ 1080 Landscape, Multi-Touch)
* **Teknologi:** Web HTML5 Offline (Phaser 3 Game Engine v3.87+, Canvas/WebGL, Web Audio API, LocalStorage Progress)

---

## 1. LANDASAN PEDAGOGIS & TUJUAN PEMBELAJARAN

### 1.1 Permasalahan Kognitif (Problem Statement)
Berdasarkan hasil observasi dan wawancara dengan guru kelas 5A SDN Percobaan 2 Malang:
1. **Ketimpangan C1 vs C2:** Siswa memiliki daya ingat (*C1 - Remembering*) yang sangat kuat. Siswa dapat menghafal definisi rantai makanan, menyebutkan jenis produsen, konsumen primer, sekunder, tersier, dan pengurai. Namun, siswa mengalami hambatan serius ketika dihadapkan pada pemahaman relasional dan sebab-akibat (*C2 - Understanding/Inferring/Explaining*).
2. **Kelemahan Berpikir Sistemik (*Trophic Cascade*):** Siswa kesulitan membayangkan dampak berantai di masa depan jika salah satu mata rantai terputus (misalnya: mengapa pembasmian ular sawah justru menghancurkan panen padi petani dua minggu kemudian, atau bagaimana sampah plastik laut memutus rantai makanan hiu).
3. **Keterbatasan Media Konvensional:** Media PowerPoint dan video ceramah bersifat pasif (*one-way*) dan tidak memberikan ruang *trial, error, and causal discovery* yang esensial bagi tahapan perkembangan kognitif operasional konkret anak usia 10–11 tahun (Piaget).

### 1.2 Capaian Pembelajaran (CP) & Indikator Ketercapaian (IKTP) Kurikulum Merdeka
* **Elemen Capaian Pembelajaran (Fase C - IPAS):**
  > *"Peserta didik menyelidiki bagaimana hubungan saling ketergantungan antar komponen biotik dan abiotik dapat mempengaruhi kestabilan suatu ekosistem di lingkungan sekitarnya, serta mengidentifikasi peran manusia dalam menjaga kelestarian ekosistem."*
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
5. **Feedback & Scaffolding:** Maskot Gita memberikan bimbingan audio-visual ramah anak, Bar Kesehatan Ekosistem, tombol bantuan Tips, dan status emosi alam (*Bahaya, Waspada, Sehat*).
6. **Debriefing / Transfer:** Buku Catatan Detektif untuk memecahkan teka-teki sebab-akibat pasca-simulasi dan refleksi bersama guru kelas.

---

## 2. SPESIFIKASI UMUM PRODUK, KERANGKA LM-GM & STANDAR BAHASA ANAK

### 2.1 Ringkasan Spesifikasi Game
| Komponen | Spesifikasi Teknis | Landasan Ilmiah / Alasan Desain |
| :--- | :--- | :--- |
| **Judul Game** | *Eco-Explorer: Penjaga Keseimbangan Ekosistem* | Menumbuhkan empati lingkungan dan rasa ingin tahu sains multi-ekosistem. |
| **Genre** | *Ecological Strategy & Collaborative Edu-Sim RPG* | Menggabungkan simulasi sains hidup dengan tantangan misi penyelamatan. |
| **Cakupan Ekosistem** | **4 Bioma Nusantara:** Sawah, Hutan Tropis, Sungai Air Tawar, Laut Terumbu Karang | Memenuhi CP IPAS Fase C tentang keragaman ekosistem darat dan perairan Nusantara. |
| **Struktur Misi** | **2 Misi per Bioma (Total 8 Misi):**<br>• Misi 1: Faktor Ulah Alam (Kemarau, Surut Air, dsb.)<br>• Misi 2: Faktor Ulah Manusia (Racun, Penebangan Liar, Bom Ikan, Limbah) | Memfasilitasi pemahaman komparatif siswa antara dinamika alamiah vs ulah perusakan manusia. |
| **Sistem Penilaian** | **Sistem 3 Bintang (Total 24 Bintang):**<br>★ 1: Kesehatan Ekosistem $\ge 75\%$<br>★★ 2: Lulus Kuis Kausalitas C2<br>★★★ 3: Menjawab Kuis Benar pada Percobaan Pertama | Memberikan gamifikasi motivasional (*reward loop*) dan instrumen debriefing Alessi & Trollip. |
| **Mekanika Unlock** | **Progression Lock:** Misi 2 terkunci hingga Misi 1 + Kuis tuntas; Ekosistem berikutnya terkunci hingga kedua misi ekosistem sebelumnya selesai | Mencegah kognitif berlebih (*cognitive overload*) dan memandu pemahaman bertahap. |
| **Gaya Visual** | **Modern 2D Vector Cartoon Edukatif (Vibrant & Clean Outlines)** | Garis luar tegas, warna cerah kontras tinggi (terinspirasi Duolingo & Kurzgesagt), siluet sangat jelas di layar IFP 65–86 inch, performa 60 FPS stabil. |
| **Target Platform** | Web HTML5 (Phaser 3 Game Engine) | 100% Offline-Ready, mandiri tanpa perlu instalasi aplikasi, kompatibel dengan browser IFP Android/Windows. |
| **Format Layar** | 16:9 Landscape (1920 $\times$ 1080 Native) | Resolusi baku layar IFP sekolah; otomatis *Scale to Fit*. |
| **Karakter Pemandu** | **Gita si Detektif Cilik** | Karakter anak perempuan SD berhijab hitam dan berjaket navy yang ceria, hangat, dan komunikatif (Digital MKO Vygotsky). |
| **Sistem Audio** | Chiptune 16-bit BGM + SFX + **Voice-Over (Tombol Suara)** | Membantu siswa auditori dan siswa di baris belakang kelas (Mayer Voice Principle). Didukung sistem Hybrid Dual-Engine (MP3 Studio + Web Speech Fallback). |

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
| (CSCL)              | & Visual Card Recommendation    | Hijau/Kuning/Merah; Petugas Layar mengeksekusi saran. |
+---------------------+---------------------------------+--------------------------------------------+
| Adaptive            | Gita Digital MKO Guidance       | Tombol [Tips Bantuan Gita]; bimbingan        |
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
| Causality (Mayer    | Diagram (`[A] → [B] → [C] → [D]`)| disertai diagram visual rantai kausalitas  |
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
| Urus Bangkai / Dekomposisi         | Urai Sisa Jerami Jadi Pupuk Alami                              |
| Predator Alami / Trophic Level     | Pemangsa Alami / Sahabat Petani                               |
| Residu Pestisida Kimia             | Bahaya Racun Semprotan Hama                                   |
| Faktor Abiotik Irigasi             | Air Sawah / Buka Pintu Air                                    |
| Eco-Health Bar                     | Ukuran Kesehatan Sawah (Bahaya, Waspada, Sehat)               |
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
     - **Hero Character Select Slider Showcase (TeamSelectScene.js):** Menggantikan tata letak 5 kartu berjejer yang padat menjadi format *Hero Showcase Slider* panggung tunggal megah ($1280 \times 570$ px) berbingkai enamel dan emas mengkilap:
        - **Panggung Karakter Utama (Hero Stage):** Menampilkan 1 pahlawan tim secara fokus dan besar di panggung pusat. Kolom kiri menampung maskot hewan resolusi tinggi ($270 \times 270$ px) di atas pedestal 3D dengan aura cahaya radial tim (*breathing idle animation*), serta lencana status misi selesai. Kolom kanan tersinkronisasi simetris dalam lebar grid $660$ px menampung tag kategori peran ($270 \times 40$ px), nama tim ($42$ px), semboyan/motto tim ($24$ px), Lencana Medali Emas Resmi Pahlawan yang terbingkai anggun (*framed circular plaque seal* $\varnothing 70$ px dengan lis ganda emas dan posisi kokoh di sebelah nama tim tanpa pergeseran koordinat), kotak *dossier* sains peran ekologis dengan ketinggian baku tetap ($660 \times 188$ px) yang menjamin *Zero Layout Shifting* di seluruh 5 tim sekaligus bantalan aman anti-pemotongan teks $\ge 26$ px, label spesialisasi misi ($660 \times 46$ px, $24$ px), dan tombol sentuh chunky 3D berukuran besar ($660 \times 72$ px, $30$ px, `PILIH TIM INI`) lengkap dengan efek gelombang kejut cincin emas (*shockwave ring*).
        - **Bilah Komando 2-Zona Bebas Tabrakan:** Header atas setinggi 68 px khusus untuk tombol kembali ◀ MENU UTAMA ($190 \times 48$ px), avatar pemandu Gita bersuara (`GITA: Sentuh pahlawan timmu untuk mulai bertualang!`), tombol audio `Dengarkan Gita` ($195 \times 48$ px), serta utilitas IFP `Suara`/`Bisu` dan `Layar Penuh` dengan jarak bebas lebih dari 270 px tanpa risiko tabrakan teks. Plakat judul `PILIH TIM DETEKTIF SAWAH` ($36$ px) ditempatkan mandiri di bawah header berlatar belakang kaca zamrud transparan ($1060 \times 82$ px).
        - **Sistem Navigasi Hibrida Tiga Jalur:** (1) Sepasang tombol panah arkade samping bertaraf sentuh IFP ($84 \times 120$ px, radius 22 px, lis emas 2.5 px) di $X = 175$ dan $X = 1745$, (2) Dok selektor miniatur 5 tim di kuadran bawah ($X = 960, Y = 835$) dengan 5 ubin berkontur membulat ($236 \times 80$ px) berbingkai emas bercahaya pada tim aktif untuk pemilihan instan 1-sentuhan dengan jarak sela 28 px di bawah panggung utama, dan (3) Gestur usap layar (*touch swipe gesture*) dengan toleransi pergerakan 60 px.
      - **Master 2-Column Split Hero Stage Showcase (BiomeSelectScene.js):** Mengadopsi arsitektur panggung pahlawan 2-kolom terpisah ($1540 \times 580$ px) berbingkai enamel zamrud dan lis ganda emas mengkilap untuk meniadakan 100% risiko tumpang tindih teks:
         - **Kolom Kiri (Identitas Bioma & Tombol Aksi):** Menampung Medali Bioma Besar ($\\varnothing 100$ px) berlingkaran halo cahaya radial tim, lencana kapsul bintang prestasi (`0/6 Bintang`), nama ekosistem ($32$ px), tagline bioma ($24$ px), kotak deskripsi sains ekologis mandiri ($580 \times 126$ px, $24$ px dengan *wordWrap* rapi), serta tombol aksi sentuh chunky 3D raksasa ($580 \times 72$ px, $30$ px, `SELIDIKI EKOSISTEM INI`) lengkap dengan gelombang kejut cincin emas (*shockwave ring*).
         - **Kolom Kanan (Jaring Trofik & 2 Kartu Misi Bertumpuk):** Menampung header terpisah `RANTAI MAKANAN UTAMA:` ($24$ px) di atas deretan pil organisme *single-line sleek* (zero collision dengan nama organisme!), serta 2 kartu misi vertikal yang lega ($750 \times 135$ px per kartu) dengan judul misi, deskripsi headline, dan status kapsul (`Siap Diselidiki` / `Terkunci`) yang memiliki padding internal lega bebas dari pemotongan border bawah.
         - **Bilah Komando Atas Emas-Zamrud Terpadu ($1760 \times 74$ px):** Lencana tim aktif dengan *secret 5-tap examiner trigger*, nama tim giliran, perolehan bintang global ($0/24$), serta tombol pill seragam (`Suara`, `Ganti Tim`, `Reset Progres`) berjarak simetris.
         - **Dok 4 Bioma di Bawah Layar ($Y = 925$):** 4 ubin rounded enamel ($340 \times 86$ px) dengan sorotan emas mengkilap 3.5px pada bioma aktif dan status terkunci/terbuka.
         - **Sistem Navigasi Hibrida:** Tombol panah arkade samping ($84 \times 120$ px, radius 22px) di $X = 105$ dan $X = 1815$, 4 dok bioma bawah, serta *touch swipe gesture*.
      - **Streamlined Cockpit Command Header & Centered Eco-Health Pod (SimulationScene.js):** Bilah komando atas ($1880 \times 72$ px, $Y = 44$) mengadopsi tata letak simetris terdistribusi penuh dengan keseimbangan visual kiri-kanan berketinggian tombol seragam 46 px:
        - **Sisi Kiri:** Tombol Keluar ruby rounded (`KELUAR`, $X = 85$, $120 \times 46$ px), Kapsul Identitas Tim terpadu berlis cyan (`0x38bdf8`) memadukan lencana dan nama tim ($X = 265$, $200 \times 46$ px), dan Kapsul Timer giliran kelompok berlis emas hangat (`WAKTU: 07:00`, $X = 495$, $220 \times 46$ px).
        - **Pusat Monitor (Tepat di Sumbu $X = 960$ px):** *Eco-Health Meter Pod* dua baris vertikal ($460 \times 60$ px, *Dark Obsidian Glass* berbingkai *Emerald* `0x10b981`). Baris atas ($Y = 32$) memisahkan label nama ekosistem rata-kiri (`SAWAH:`) dengan status emosi reaktif rata-kanan (`BAHAYA (25%)` / `SEHAT (85%)`). Baris bawah ($Y = 56$) menampung lintasan progress bar dinamis selebar 424 px dengan animasi *smooth ease-out tween* pada setiap pembaruan kesehatan tanpa sentakan visual (*visual snap*).
         - **Sisi Kanan:** Tombol kolaborasi CSCL Penasihat Meja (`TANYA TEMAN`, $X = 1310$, $200 \times 46$ px), ensiklopedia (`KAMUS ALAM`, $X = 1525$, $190 \times 46$ px), serta sepasang tombol utilitas IFP dengan ruang bantalan lega anti-terpotong (`Suara` / `Bisu`, $X = 1710$, $104 \times 46$ px) dan toggle layar penuh (`Layar`, $X = 1830$, $100 \times 46$ px). Margin samping simetris dengan jarak sela 18–38 px bebas dari pemotongan teks.
       - **Arsitektur Simetris Dual HUD Card Atas (Gita Scaffolding & Quest Targets, $Y = 178$):**
         - **Kartu Kiri (Mascot Scaffolding Banner - $660 \times 154$ px, $X = 450$):** Mengadopsi kartu *vector glassmorphism* berbingkai zamrud (`0x10b981`, radius 16 px). Dilengkapi Avatar Gita berlingkaran halo ($X = 75$, $96 \times 96$ px). Baris header ($Y = 125$) menaungi plakat pill `GITA - PANDUAN DETEKTIF` ($320 \times 34$ px) berdampingan rapi dengan tombol aksi `Suara` ($84 \times 34$ px) dan `Tips` ($76 \times 34$ px). Seluruh area bawah ($Y = 151$ hingga $245$, lebar 620 px) dialokasikan penuh secara bersih untuk teks panduan headline ber-origin `(0, 0)` dengan *wordWrap* 620 px tanpa risiko tabrakan dengan tombol maupun garis tepi kartu (*zero collision & zero border intersection*).
         - **Kartu Kanan (Terminal Quest Checklist Real-Time - $620 \times 154$ px, $X = 1570$):** Berpasangan simetris matematis dengan kartu Gita ($Y = 101$ hingga $255$). Dilengkapi plakat header emas-zamrud `TARGET MISI DETEKTIF` ($588 \times 34$ px, $Y = 125$) dan 3 strip baris target membulat ($588 \times 28$ px pada $Y = 154, 186, 218$). Menggunakan bullet bersih `•` (target aktif) dan `✓` (target tuntas) berfont 24px kontras tinggi untuk keterbacaan optimal dari jarak 5–8 meter. Membuka vista tengah langit sawah (selebar 480 px) bebas halangan.
      - **Balanced 4-Column Touch Action Dock (Zona Bawah IFP, $Y = 960$):** Panel sentuh kuadran bawah ($1880 \times 224$ px) membagi 3 kartu aksi dan 1 kartu verifikasi selesai ke dalam kisi 4 kolom simetris matematika:
        - Tiap kolom berdimensi seragam $436 \times 164$ px ($Y = 990$) dengan jarak sela antarkartu tepat 20 px dan margin kiri-kanan tepat 58 px ($X = 276, 732, 1188, 1644$).
        - Pita header zona sentuh berlatar belakang panel tegas di $Y = 874$ (`ZONA SENTUH IFP: PILIH TINDAKAN PENYELAMATAN KELOMPOK`), disertai bilah cooldown animasi tepat di bawahnya ($Y = 892$).
        - Kolom 1–3 menampung kartu aksi berundak 3 tingkat: baris atas menampung ikon ($46 \times 46$ px), judul aksi 24px, dan peran ekologis 24px dengan batasan *wordWrap* 340 px (menghilangkan 100% teks *bleeding* keluar border); baris tengah menampung tombol sentuh chunky $406 \times 44$ px; baris bawah menampung kapsul status kuota $406 \times 34$ px dengan jarak bebas 4 px tanpa tumpang tindih.
        - Kolom 4 menampung Kartu Selesai Misi ($X = 1644$) berbingkai emas 3px dengan tombol verifikasi `★ Cek Hasil Penyelidikan` ($406 \times 44$ px), teks tombol yang berdenyut selaras saat misi tuntas, dan lencana evaluasi C2.
      - **Chunky 3D Tiles & Dark Emerald Glassmorphism:** Seluruh kartu antarmuka (`TeamSelectScene`, `MissionMenuScene`, dsb.) menggunakan kontur *rounded rect* berenamel zamrud tua dengan bayangan bevel bawah 3D setebal 4–8px, efek aura radial emas di balik lencana medali kuningan detektif, serta tombol taktil chunky 3D *Golden Amber* (`0xf59e0b` / `0xb45309`) yang memberikan sensasi fisik nyata dapat ditekan (*tangible affordance*).
     - **Pemberian Peran Spesialis dengan Pita Emas Bernapas:** Menu misi menampilkan banner emas animasi pernapasan (*breathing animation*) `MISI UTAMA SPESIALIS: [NAMA TIM]` untuk memandu giliran kelompok secara eksplisit tanpa kebingungan pilihan.
      - **Modal Pengarahan Misi Bertahap 3 Langkah (Mayer Segmenting Principle - MissionMenuScene.js):**
        Menggantikan tata letak 3 kolom simultan yang padat menjadi sistem tutorial bertahap (*step-by-step guided briefing*) 1 per satu kartu:
        - **Tab Indikator Langkah Interaktif:** 3 pil navigasi di bilah atas modal (`1. Sebab Krisis`, `2. Cara Bertindak`, `3. Target Misi & Bintang`) yang dapat disentuh langsung oleh siswa/guru.
        - **Langkah 1 (Sebab Krisis):** Panggung visual menampung potret maskot Gita dengan balon dialog ekspresif serta narasi sains krisis ekosistem yang lapang tanpa desak-desakan.
        - **Langkah 2 (Cara Bertindak):** 3 panel bento terstruktur memandu ergonomi sentuh IFP: sentuh tombol aksi kuadran bawah, pemanfaatan jeda reaksi alam 1,2 detik, dan pemanggilan kartu voting CSCL ("Tanya Teman").
        - **Langkah 3 (Target Misi & Bintang):** Checklist target misi berpenanda centang `✓` bersih dari polusi emoji, disandingkan dengan formula 3 bintang detektif.
        - **Kontrol Navigasi Terpadu:** Tombol `◀ SEBELUMNYA`, jalan pintas `Langsung Mulai ▶`, dan tombol `SELANJUTNYA ▶` / `KAMI PAHAM, MULAI SIMULASI ▶` beranimasi transisi halus (*fade-in 220ms*).
     - **Isolasi Kedalaman Layer Modal Anti-Tumpuk (Z-Index Isolation):** Seluruh jendela pop-up briefing kasus dan modal voting kelas dibungkus dalam *container* khusus berkedalaman tinggi (`setDepth(201)` dan *dimmer backdrop* `setDepth(200)`), menjamin kartu menu di latar belakang tidak lagi menembus ke depan modal saat disentuh siswa.
     - **Aktivasi 100% Aset Visual Nyata:**
       - **8 Kartu Ensiklopedia & Kamus Sawah:** Pop-up interaktif berbasis Piaget Concrete Operational (`kamus_pematang`, `kamus_wereng`, `kamus_irigasi`, `kamus_pengurai`, `kamus_pemangsa`, `kamus_hama`, `kamus_gulma`, `kamus_limbah`) dengan tampilan dua tingkat (kisi 4x2 dan tampilan detail sains lengkap serta relevansi SDN Percobaan 2).
       - **3 Kartu Voting CSCL Fisik:** Kartu voting hijau, kuning, dan merah (`card_voting_hijau`, `card_voting_kuning`, `card_voting_merah`) dirender langsung secara konkret pada modal "Tanya Teman", menyelaraskan kartu digital dengan kartu fisik di meja siswa.
       - **Embodiment Maskot Gita Dinamis:** Sprite ekspresi wajah Gita berganti secara reaktif (`gita_talk` saat bersuara, `gita_think` saat bahaya/berpikir, `gita_thumbsup` saat sawah sehat, dan `gita_cheer` saat menang di layar evaluasi).
       - **Ikon Organisme Kontekstual & HUD Bar Skin:** Tombol aksi bawah menampilkan sprite visual asli (`ular`, `padi_subur`, `katak`, `jamur`, `icon_pestisida`, `icon_kemarau`, dsb.) serta frame visual `hud_cooldown_bar`.
     - **Mascot Speech Bar:** Dialog pemandu Gita si Detektif Cilik diformat sebagai bilah panel zamrud berbingkai emas dengan avatar Gita *close-up* berbingkai lingkaran, tag identitas kapsul emas hangat, teks sapaan kontras tinggi, dan tombol audio *Cyan Glowing* `Dengarkan Gita`.
     - **Umpan Balik Taktil IFP:** Tombol dan kartu memberikan animasi melesak 4px (*push-down bounce*) serta pembesaran *scale hover* halus saat disentuh jari siswa di layar IFP kelas.
7. **Mode Penguji / Dosen & Modal Konfirmasi Sentuh IFP (Hardware Touch Dialog & Examiner Gesture):**
   * **In-Engine Touch Modal:** Meniadakan ketergantungan pada dialog sistem peramban (`window.confirm`) yang tidak ergonomis di layar IFP (sering kali muncul kecil di pojok atas tak terjangkau tangan siswa/guru). Seluruh konfirmasi aksi penting (seperti reset progres) digantikan modal in-engine Phaser (`showConfirmModal`) berlatar gelap transparan (Alpha 0.8) dengan tombol sentuh berukuran besar ramah jemari (`Ya, Reset` & `Batal`).
   * **Gesture Rahasia Penguji (*Examiner Mode*):** Pada `BiomeSelectScene.js`, ketukan 5 kali berturut-turut pada lencana tim dalam durasi 3 detik memicu fungsi `progressManager.unlockAllForExaminer()`, membuka instan seluruh 4 bioma, 8 misi, dan perolehan 24/24 bintang prestasi untuk memfasilitasi kebutuhan demonstrasi simulasi saat validasi ahli materi/media, seminar proposal, maupun sidang skripsi.

---

 8. **Standar Tipografi Bebas Polusi Emoji (Anti-AI Slop Standards):**
    * Seluruh antarmuka grafis dilarang menggunakan karakter emoji sistem operasi (seperti api, kilau, tangan penunjuk, pintu, wajah cemas, lampu bohlam) sebagai pengganti teks atau ikon profesional. Karakter emoji peramban sering terdistorsi, tidak konsisten lintas sistem operasi IFP, dan memberi kesan amatir yang tidak profesional.
    * Digantikan sepenuhnya oleh:
      - Tipografi komersial berkontras tinggi (*Fredoka* & *Nunito*).
      - Label status eksplisit (`SEHAT`, `WASPADA`, `BAHAYA`).
      - Glif/simbol geometris tipografi universal (`✓`, `•`, `★`, `◀`, `▶`, `→`).
      - Tombol kapsul tekstual (*text pills*) yang fungsional (`Suara`, `Tips`, `Bisu`, `Layar Penuh`).

 9. **Standar Desain Modern Anti-Vibe-Coding (Borderless Tonal UI & Zero Wireframe Strokes Audit):**
    * **Anti-Pattern Vibe Coding:** Menghindari kebiasaan umum model AI (*AI coding slop*) yang membungkus setiap kontainer teks, kartu dalam, status pill, dan tombol dengan garis tepi (*stroke/outline 1.5–2.5px*), yang menyebabkan antarmuka tampak seperti kawat prototipe mentah (*wireframe look*).
    * **Pendekatan Tonal Layering:** Diterapkan arsitektur desain modern berbasis *value contrast* (kontras bidang latar belakang gelap, semi-transparan `0x000000` alpha 0.35–0.45, atau warna solid enamel) yang membedakan elemen secara organik tanpa garis pembatas kaku.
    * **Chunky 3D Bevel Murni:** Tombol interaktif mengandalkan perbedaan warna fisik antara dasar bayangan (*base bevel shadow*) dan permukaan tombol (*face color*), menghasilkan tombol taktil yang bersih dan elegan tanpa garis stroke keliling.
    * **Audit Menyeluruh Lintas 7 Scene & UI Helper:**
      - **`UIHelper.js`:** Default `strokeWidth = 0` pada `createGlassCard` dan `createStatusPill`; `createChunkyButton` dan `createMascotBanner` 100% menggunakan 2-tone solid bevel tanpa wireframe stroke.
      - **`TitleScene.js`:** Menghilangkan stroke pada balon ucapan Gita (diganti bayangan lembut *drop shadow*), bilah panduan guru (*teacher tip bar*), dan tombol pil navigasi.
      - **`TutorialScene.js`:** Menghilangkan outline pada 4 tab *quick-jump*, 4 kartu bento tutorial, balon ucapan Gita, titik paginasi, dan tombol navigasi slide.
      - **`TeamSelectScene.js`:** Menghilangkan garis tepi pada kotak *dossier* peran ekologis, tombol panah arkade samping, lencana *MISI SELESAI*, dan ubin dok selektor 5 tim (diganti *active golden bevel*).
      - **`BiomeSelectScene.js`:** Menghilangkan *inner hairline* pada plakat utama, tombol panah samping, 4 ubin dok bioma, serta *inner border* pada modal konfirmasi sentuh.
      - **`MissionMenuScene.js`:** Menghilangkan stroke pada 3 kartu misi (diganti *tonal enamel base bevel* pada hover), 3 tab indikator langkah briefing, 3 kartu bento langkah 2, dan checklist target misi.
      - **`SimulationScene.js`:** Menghilangkan garis tepi pada seluruh kapsul HUD atas, kartu panduan Gita, kisi 4 kolom kartu aksi sentuh, tombol `Lanjutkan Simulasi` Tanya Teman, serta 8 kartu kisi dan pop-up detail ensiklopedia sawah (*Kamus Modal*).
      - **`QuizScene.js`:** Menghilangkan stroke pada kartu pertanyaan, pil diagram rantai sebab-akibat, dan tombol opsi jawaban A/B/C.
      - **`VictoryScene.js`:** Menghilangkan outline pada kotak statistik nilai, balon ucapan Gita, spanduk pembuka bioma baru, dan tombol aksi peta/evaluasi.
    * **Pengecualian Terbatas:** Garis tepi (*stroke*) hanya diizinkan secara eksklusif pada bingkai makro terluar layar/jendela modal utama (misal: plakat header makro dan frame dialog modal terluar) serta umpan balik dinamis seleksi sentuh (*click feedback highlight*).

---

7. **Standarisasi Ergonomi & Tonal Glassmorphism pada Edisi Standalone HTML (TES GITA BARU 1/index.html):**
   * **Tipografi Ultra-Large IFP ($\ge 24$ px Mutlak):** Mengeliminasi seluruh 28 font kecil (< 24px), divalidasi via scripts/audit_standalone_fonts.py menghasilkan 0 pelanggaran.
   * **Anti-Vibe-Coding (Tonal Glassmorphism):** Menghapus garis tepi kawat melingkar (order: 3px solid ...) pada seluruh kartu dalam, badge status, pills, dan modal; menerapkan *tonal layering* (
gba(2, 44, 34, 0.95), 
gba(6, 78, 59, 0.85)), dan chunky 3D buttons solid bevel.
   * **Re-layout Adaptif Dock & Kamus:** Penataan bertingkat kartu aksi dock bawah setinggi 54px dan transformasi Kamus Alam menjadi grid 2-kolom lapang agar teks deskripsi 24px nyaman dibaca dari jarak meja siswa (5–8 meter).
   * **Clean Release:** Menghapus instrumentasi debug widget FPS meter dan log konsol berulang agar tampilan IFP 100% bersih untuk kegiatan belajar siswa kelas 5A.
   * **Bridging Character Dialogue Box (Pre-Instruction Scaffolding):**
     - Menerapkan dialog box RPG sinematik di kuadran bawah panggung simulasi saat misi dibuka (waktu simulasi dijeda/paused di Hari 0 agar siswa tidak panik).
     - **Duet Interaktif Gita & Maskot Tim:** Menampilkan potret Gita ekspresif di sisi kiri lengkap dengan nameplate `GITA • Detektif Alam`, serta lencana maskot tim pilihan siswa di sisi kanan untuk memperkuat identitas tim (*team agency*).
     - **Alur 2 Langkah Bertahap:** Langkah 1 memaparkan akar krisis ekosistem (*Mayer Pre-training Principle*); Langkah 2 mengarahkan kartu aksi pertama yang konkret (*Vygotsky Scaffolding*).
     - **Audio Hibrida:** Bunyi lonceng lembut (*chime*), pembacaan vokal otomatis via `speak()`, dan tombol sentuh IFP emas 3D bevel ($\ge 58$px, font 26–27px).

---

## 4. CORE GAMEPLAY LOOP & ORKESTRASI KELAS (25 SISWA)

Model pembelajaran memanfaatkan sintaks kooperatif **Jigsaw (Elliot Aronson)** yang dipadukan dengan siklus **POE (*Predict - Observe - Explain*)** dan didampingi instrumen cetak `LKPD_DETEKTIF_SAWAH.md`:

### 4.1 Penyelesaian Masalah Kebosanan & Efek Mencontek (*The 20 Bored Kids & Anti-Copycat Solutions*)
Jika semua kelompok memainkan misi yang sama berulang kali, 20 siswa di meja akan bosan dan tim berikutnya hanya akan mereplikasi jawaban tanpa berpikir kritis (C2). Untuk mengatasinya:
1. **Model Tim Ahli (*Jigsaw Expert Groups*):** Setiap kelompok ditugaskan sebagai spesialis yang menyelidiki **satu kasus krisis ekosistem yang unik dan berbeda**:
   * **Tim Elang & Tim Ular:** Misi 1 — *Serbuan Hama Tikus* (Fokus: Kaskade trofik predator ular & tikus).
   * **Tim Katak:** Misi 2 — *Bahaya Racun Kimia* (Fokus: Residu semprotan kimia & perlindungan katak).
   * **Tim Padi:** Misi 3 — *Sawah Kekeringan Retak* (Fokus: Kebutuhan abiotik air & sistem irigasi).
   * **Tim Jamur:** Misi 4 — *Rahasia Pengurai Jerami* (Fokus: Dekomposisi jerami menjadi pupuk humus).
2. **Visual Signaling Pita Emas:** Pada menu misi, kasus yang ditugaskan ke tim aktif otomatis dihiasi pita emas berdenyut: `MISI UTAMA SPESIALIS: [NAMA TIM]`.
3. **Pelacak Sesi Kelas (*Class Progress Tracker*):** Layar melacak misi mana saja yang telah diselesaikan (`Selesai oleh Tim X`), dan pada layar kemenangan otomatis memandu estafet ke tim berikutnya.
4. **Peran Penasihat Meja:** 20 Siswa di meja memegang **Buku Catatan Detektif (LKPD Fisik)** untuk mencatat data awal populasi kasus masing-masing, mengisi prediksi krisis, dan serempak mengangkat kartu voting 3 warna saat tombol "TANYA TEMAN" ditekan.

```
                        [1. PEMBAGIAN 5 KELOMPOK JIGSAW KELAS 5A]
         25 Siswa dibagi menjadi 5 Tim Ahli dengan Spesialisasi Kasus Berbeda
                                       │
                                       ▼
                       [2. ROTASI TIM & PREDIKSI AWAL (PREDICT)]
         - Tim Aktif (4-5 Siswa Petugas Layar) maju ke depan layar sentuh IFP
         - Misi Utama Tim ditandai pita emas berdenyut di menu misi
         - 20 Siswa lainnya bertindak sebagai "Penasihat Meja" memegang LKPD
         - Siswa mencatat angka awal dan menganalisis hipotesis penyebab krisis
                                       │
                                       ▼
              [3. SIMULASI & AKSI PENYELAMATAN 4 BIOMA (OBSERVE)]
         - Timer Misi Berjalan (7 Menit) | Dinamika kaskade trofik otomatis tiap 3 detik di 4 Bioma
         - Tim di IFP mengintervensi dengan menambah predator, produsen/air, atau pengurai
         - Visual Cooldown Bar 1,2 detik memberi jeda alam bereaksi dan melatih diskusi
                                       │
                                       ▼
               [4. BANTUAN TEMAN DI MEJA (KARTU VOTING KELAS CSCL)]
          - Saat bingung, Petugas Layar menekan tombol "TANYA TEMAN"
          - Timer 7 menit otomatis dijeda (*paused*) dan bel kelas (*chime*) berbunyi
          - Tampil modal hitung mundur 15 detik bagi seluruh siswa di meja untuk berdiskusi
          - 20 Siswa di meja serempak mengangkat KARTU WARNA FISIK (Kontekstual 4 Bioma):
            [HIJAU] KARTU HIJAU: Tambah Pemangsa Alami / Pengurai (Ular/Katak/Harimau/Bangau/Penyu/Jamur)
            [KUNING] KARTU KUNING: Alirkan Air / Buka Pintu Air / Alirkan Mata Air / Transplantasi Karang
            [MERAH] KARTU MERAH: Bersihkan Racun / Sita Jerat Pemburu / Saring Limbah / Angkut Sampah Plastik
          - Petugas Layar memilih opsi voting terbanyak -> timer berlanjut & tombol aksi berdenyut emas!
                                       │
                                       ▼
               [5. TEKA-TEKI SEBAB-AKIBAT DETEKTIF GITA (EXPLAIN)]
         - Misi Sukses: Ukuran Kesehatan Sawah >= 75% bertahan stabil 12 detik
         - Masuk ke Buku Catatan Detektif Gita (1 Soal Teka-Teki C2 Kontekstual)
         - Tim di depan dan siswa di meja mencatat kesimpulan sebab-akibat di LKPD
                                       │
                                       ▼
             [6. BINTANG PENGHARGAAN & ESTAFET TIM JIGSAW BERIKUTNYA]
         - Perolehan Skor Bintang (1-3) & Gelar Detektif Cilik
         - Tracker 4 Kasus Sawah tercentang otomatis (Misi Selesai)
         - Gita mengumumkan estafet kelompok: "Sekarang giliran Tim berikutnya maju memecahkan Kasus Baru!"
         - Tim 1 kembali ke meja -> Tim 2 maju memecahkan Kasus Spesialis Berikutnya
```

---

## 5. SKENARIO 8 MISI PADA 4 EKOSISTEM NUSANTARA (BAHASA RAMAH ANAK)

```
+-------------------------------------------------------------------------------------------------------------------------------+
|                                      PETA 8 MISI PENYELAMATAN 4 EKOSISTEM NUSANTARA                                           |
+----+------------+--------------------------+-----------------------+----------------------------------+-----------------------+
| NO | BIOMA      | KATEGORI PENYEBAB        | JUDUL MISI            | MASALAH KRISIS                   | TUGAS KITA (SOLUSI C2)|
+----+------------+--------------------------+-----------------------+----------------------------------+-----------------------+
| 1  | Sawah      | Faktor Alam      | Misi 1: Tanah Retak   | Musim kemarau membuat saluran    | Alirkan air irigasi,  |
|    |            |                          | Kekeringan            | irigasi kering & padi layu!      | tanam tunas padi!     |
+----+------------+--------------------------+-----------------------+----------------------------------+-----------------------+
| 2  | Sawah      | Faktor Manusia   | Misi 2: Bahaya Racun  | Racun kimia disemprot berlebih & | Kembalikan katak,     |
|    |            | (Unlock: Lulus M1+Kuis)  | & Jerat Petani        | ular diburu -> Tikus merajalela! | lepas ular, bersihkan!|
+----+------------+--------------------------+-----------------------+----------------------------------+-----------------------+
| 3  | Hutan      | Faktor Alam      | Misi 3: Kemarau &     | Panas terik mengeringkan mata air| Alirkan mata air,     |
|    | Tropis     |                          | Pohon Kering          | rimba & rumput pakan rusa!       | reboisasi pohon!      |
+----+------------+--------------------------+-----------------------+----------------------------------+-----------------------+
| 4  | Hutan      | Faktor Manusia   | Misi 4: Penebangan    | Pembalakan liar & jerat pemburu  | Sita jerat liar, rawat|
|    | Tropis     | (Unlock: Lulus M3+Kuis)  | Liar & Jerat Pemburu  | mengancam Harimau Sumatera!      | harimau, tanam pohon! |
+----+------------+--------------------------+-----------------------+----------------------------------+-----------------------+
| 5  | Sungai Air | Faktor Alam      | Misi 5: Air Surut &   | Aliran sungai surut & eceng      | Buka pintu air hulu,  |
|    | Tawar      |                          | Gulma Menutup         | gondok menutup rapat permukaan!  | angkat gulma liar!    |
+----+------------+--------------------------+-----------------------+----------------------------------+-----------------------+
| 6  | Sungai Air | Faktor Manusia   | Misi 6: Racun Limbah  | Limbah detergen cair pabrik &    | Saring limbah pabrik, |
|    | Tawar      | (Unlock: Lulus M5+Kuis)  | & Sampah Plastik      | sampah mencemari ikan & bangau!  | tebar benih ikan!     |
+----+------------+--------------------------+-----------------------+----------------------------------+-----------------------+
| 7  | Laut       | Faktor Alam      | Misi 7: Air Laut Panas| Suhu samudra memanas alami hingga| Transplantasi karang, |
|    | Karang     |                          | & Karang Memutih      | karang memutih (coral bleaching)!| sebar ikan karang!    |
+----+------------+--------------------------+-----------------------+----------------------------------+-----------------------+
| 8  | Laut       | Faktor Manusia   | Misi 8: Ledakan Bom   | Nelayan ilegal memakai bom ikan  | Sita bahan peledak,   |
|    | Karang     | (Unlock: Lulus M7+Kuis)  | Ikan & Sampah Laut    | & sampah plastik menjerat penyu! | bersihkan plastik laut!|
+----+------------+--------------------------+-----------------------+----------------------------------+-----------------------+
```

---

## 6. SISTEM PENILAIAN BINTANG & PROGRESI PEMBUKAAN (PROGRESSION LOCK)

### 6.1 Formula Perolehan 1–3 Bintang per Misi
Setiap misi memberikan penghargaan hingga 3 Bintang Prestasi Detektif:
* ★ **Bintang 1 (Stabilitas Ekosistem):** Meraih Tingkat Kesehatan Ekosistem $\ge 75\%$ dan menyelesaikan seluruh target checklist.
* ★★ **Bintang 2 (Kecakapan Kausalitas C2):** Berhasil menjawab kuis refleksi sebab-akibat di Buku Catatan Detektif.
* ★★★ **Bintang 3 (Penguasaan Konsep C2 Sempurna):** Menjawab kuis dengan tepat pada kesempatan/percobaan pertama (*first attempt*).
* **Total Maksimal:** 24 Bintang di seluruh 4 Ekosistem Nusantara.

### 6.2 Aturan Pembukaan Misi & Ekosistem (Progression Lock)
1. **Dalam Satu Bioma:**
   * Misi 1 (Faktor Ulah Alam) langsung terbuka untuk diselidiki.
   * Misi 2 (Faktor Ulah Manusia) terkunci rapat dan **hanya akan terbuka jika Misi 1 selesai + kuis C2 berhasil dijawab dengan benar**.
2. **Antar Bioma:**
   * Ekosistem Sawah terbuka sejak awal.
   * Ekosistem Hutan Tropis terbuka setelah kedua misi Sawah (Misi 1 & 2) diselesaikan.
   * Ekosistem Sungai terbuka setelah kedua misi Hutan selesai.
   * Ekosistem Laut terbuka setelah kedua misi Sungai selesai.
   * Siswa dapat mengulang (*replay*) misi mana pun yang telah terbuka untuk meningkatkan perolehan bintang menjadi 3.
3. **Penyimpanan Progres Lokal (*Persistent LocalStorage*):**
   * Seluruh status bintang dan kunci misi disimpan secara otomatis via `ProgressManager.js` di memori peramban (*LocalStorage*), sehingga data tidak hilang saat halaman di-refresh.

---

## 7. SISTEM KESEHATAN EKOSISTEM & EMOSI ALAM

### 7.1 Empat Kondisi Kesehatan Ekosistem
* **BAHAYA (Kesehatan $< 45\%$):** Bar merah berdenyut, border *vignette* krisis berkedip, Gita memberi peringatan bahaya.
* **WASPADA / KURANG SEIMBANG (Kesehatan $45\% - 59\%$):** Bar kuning, sebagian organisme mulai merespons perbaikan.
* **SEIMBANG (Kesehatan $60\% - 74\%$):** Bar kuning-hijau, populasi mendekati batas aman.
* **SANGAT SEIMBANG (Kesehatan $\ge 75\%$):** Bar hijau zamrud berkilau, Gita mengacungkan jempol (*gita_thumbsup*), tombol "CEK HASIL" berdenyut emas.

### 7.2 Semangat Belajar Positif (*Tanpa Game Over*)
Jika waktu habis, layar **tidak pernah** menampilkan tulisan *"Game Over"*. Sebaliknya, muncul layar ramah: **"Buku Catatan Detektif Gita"**:
* Gita mengajak berdiskusi: *"Tidak apa-apa! Mari kita cari tahu mengapa rantai makanan ini belum seimbang. Yuk kita diskusikan bersama teman-teman!"*.
* Tim tetap diarahkan ke sesi teka-teki formatif untuk memahami kesenjangan konsep (C2).

---

## 8. BUKU CATATAN DETEKTIF GITA: MASTER BANK TEKA-TEKI SEBAB-AKIBAT (C2)

```
+-------------------------------------------------------------------------------------------------------------------------------+
|                               BANK TEKA-TEKI SEBAB-AKIBAT 4 BIOMA (DATA-DRIVEN QUIZ SCENE)                                    |
+----+--------+-------------------------------------+-----------------------------------+---------------------------------------+
| NO | MISI   | PERTANYAAN TEKA-TEKI                | JAWABAN TEPAT                     | PENJELASAN SAINS RAMAH ANAK           |
+----+--------+-------------------------------------+-----------------------------------+---------------------------------------+
| 1  | Sawah  | Musim kemarau membuat padi kering.  | B. Tikus kehilangan makanan dan   | Padi adalah produsen utama sumber     |
|    | M1     | Mengapa elang dan ular ikut lapar?  |    mati, sehingga mangsa habis.   | energi. Jika padi mati, pemangsa lapar|
+----+--------+-------------------------------------+-----------------------------------+---------------------------------------+
| 2  | Sawah  | Petani memburu semua ular sawah.    | A. Hama tikus melonjak banyak dan | Ular adalah predator alami tikus.     |
|    | M2     | Apa bahaya bagi panen padi?         |    memakan habis bulir padi.      | Tanpa ular, tikus meledak merusak padi|
+----+--------+-------------------------------------+-----------------------------------+---------------------------------------+
| 3  | Hutan  | Kemarau mengeringkan rumput rimba.  | B. Rusa kelaparan & berkurang,    | Saat produsen layu, herbivora lapar & |
|    | M1     | Mengapa harimau turun ke desa?      |    sehingga harimau cari mangsa.  | predator puncak kesulitan cari makan. |
+----+--------+-------------------------------------+-----------------------------------+---------------------------------------+
| 4  | Hutan  | Dampak buruk jika pohon rimba       | A. Kawanan rusa kehilangan rumah  | Pohon adalah habitat, oksigen, dan    |
|    | M2     | ditebang liar terus-menerus?        |    & makanan, tanah longsor erosi.| makanan. Tebang liar merusak fondasi! |
+----+--------+-------------------------------------+-----------------------------------+---------------------------------------+
| 5  | Sungai | Permukaan air tertutup lebat eceng  | B. Sinar & udara tertutup rapat,  | Tumbuhan menutup rapat memutus difusi |
|    | M1     | gondok. Mengapa ikan lemas mati?    |    air kekurangan oksigen napas.  | oksigen dan fotosintesis bawah air!   |
+----+--------+-------------------------------------+-----------------------------------+---------------------------------------+
| 6  | Sungai | Bagaimana racun detergen pabrik     | A. Racun diserap ikan kecil, lalu | Aliran bioakumulasi: racun terserap   |
|    | M2     | membuat bangau pemangsa ikut mati?  |    ikan beracun dimakan bangau.   | produsen & menumpuk di tubuh predator!|
+----+--------+-------------------------------------+-----------------------------------+---------------------------------------+
| 7  | Laut   | Terumbu karang memutih dan rusak.   | B. Karang tempat hidup & makan    | Karang adalah pusat kehidupan laut.   |
|    | M1     | Mengapa hiu kesulitan cari mangsa?  |    ikan kecil mangsa hiu.         | Tanpa karang, rantai makanan terputus!|
+----+--------+-------------------------------------+-----------------------------------+---------------------------------------+
| 8  | Laut   | Mengapa menangkap ikan pakai bom    | A. Bom menghancurkan terumbu      | Butuh puluhan tahun bagi karang untuk |
|    | M2     | dilarang keras oleh hukum?          |    karang yang butuh puluhan tahun| tumbuh kembali. Habitat ikan musnah!  |
+----+--------+-------------------------------------+-----------------------------------+---------------------------------------+
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
  `BootScene` → `TitleScene` → (`TutorialScene` atau `TeamSelectScene`) → `BiomeSelectScene` → `MissionMenuScene` → `SimulationScene` → `QuizScene` → `VictoryScene` → (`MissionMenuScene` atau `BiomeSelectScene`).
* **Headless Automated Test Suites (Regresi Logika Sains & Progresi):**
  * `WEBSITE/tests/test_simulation_logic.js`: Memvalidasi matematis transfer energi trofik, siklus predasi tiap 3 detik, konsumsi produsen, dan penambahan populasi pada 4 bioma secara mandiri tanpa browser (headless Node.js).
  * `WEBSITE/tests/test_progress_manager.js`: Memvalidasi kalkulasi bintang (0-24), serialisasi LocalStorage, pembukaan kunci gembok bertahap, dan verifikasi integritas Mode Penguji / Dosen (Unlock All).
* **Dokumen Inventaris Naskah Terintegrasi:**
  * Seluruh naskah narasi, instruksi 4 slide panduan, dialog interaktif Gita, scaffolding ZPD, panggilan voting Penasihat Meja, bank soal teka-teki C2, dan selebrasi estafet telah diekstrak dan didokumentasikan lengkap pada berkas pendamping: [`docs/NASKAH_KONTEN_GAME_GITA.md`](file:///d:/SKRIPSI%20GITA/docs/NASKAH_KONTEN_GAME_GITA.md).
* **Dokumentasi Generator Aset Visual AI Terstruktur:**
  * Seluruh prompt citra Google Gemini / Imagen 3 untuk karakter maskot Gita, organisme sawah, organisme multi-bioma (laut, hutan, danau), 8 kartu pop-up Kamus Kata konkret, kartu voting CSCL Penasihat Meja, dan antarmuka IFP didokumentasikan lengkap beserta negative prompt di [`docs/PROMPT_ASSET_GEMINI.md`](file:///d:/SKRIPSI%20GITA/docs/PROMPT_ASSET_GEMINI.md).

### 9.2 Arsitektur Standalone Web & Canvas Modular (Clean Vanilla JS — `TES GITA BARU 1`)
Selain implementasi berbasis Phaser 3, proyek ini menyediakan versi **Standalone Web Canvas Engine (`TES GITA BARU 1`)** yang dirancang khusus untuk reliabilitas ekstrem pada layar interaktif (IFP) sekolah tanpa ketergantungan web server (100% Offline & Zero-CORS):
* **Pemisahan Modul Terstruktur (Clean Vanilla Architecture):**
  * `css/game.css`: Desain sistem panggung 1920x1080, Tonal Glassmorphism, dock kartu aksi simetris, dan modal kamus 2 kolom (100% mematuhi batas bawah tipografi IFP $\ge 24$px).
  * `js/config.js`: SVG icons generator (vector math), konstanta panggung, dan palet warna bioma.
  * `js/state.js`: State store reaktif (`G`, `NAV`), persistensi `localStorage`, serta modal/toast helpers.
  * `js/audio.js`: Web Audio API procedural sound synthesizer (klik, chime, berhasil, salah, petir, bom) dan background music generator.
  * `js/data/ecosystems.js` & `js/data/missions.js`: Master konfigurasi 4 bioma, 8 misi krisis, dan dialog bridging 2 tahap.
  * `js/renderers/characters.js` & `js/renderers/backgrounds.js`: Procedural canvas renderers untuk ekspresi Gita, 5 maskot tim, partikel cuaca, dan latar dinamis 4 ekosistem.
  * `js/scenes/`: 8 pengontrol scene terpisah (`title.js`, `tutorial.js`, `team.js`, `biome.js`, `mission-menu.js`, `simulation.js`, `quiz.js`, `victory.js`).
  * `js/main.js`: Bootstrapper panggung, responsive IFP viewport fit, 60 FPS animation loop, dan screen router.
* **Protokol Eksekusi Luring Tanpa Hambatan (Zero-CORS):**
  * Seluruh modul dimuat secara berurutan melalui tag `<script src="...">` klasik tanpa pembungkus `<script type="module">`. Hal ini menjamin media dapat dibuka langsung via klik ganda protokol `file:///` di Chromium atau sistem operasi IFP Android/Windows sekolah tanpa memicu pemblokiran keamanan CORS.
* **Tipografi Ramah Anak & Lucu (Playful & Kid-Friendly Typography Stack):**
  * Mengeliminasi 100% font formal kaku (Times New Roman / serif sistem).
  * Mengintegrasikan font Google Fonts ramah anak: **Baloo 2**, **Fredoka**, dan **Nunito** yang memiliki karakter membulat (*rounded terminals*), gemuk (*chunky*), ceria, dan sangat disukai anak-anak SD kelas 5.
  * Penyediaan **Aset Font Lokal WOFF2 Lengkap** di `fonts/` (`baloo_2_700.woff2`, `fredoka_700.woff2`, `nunito_800.woff2`, dll.) melalui `@font-face` di `css/game.css`, menjamin teks tampil lucu dan konsisten 100% baik saat terkoneksi internet maupun luring total di IFP sekolah.
  * Teks logo panggung `ECO-EXPLORER` bergaya kartun pop 3D berlapis emas dengan stroke hijau tua empuk.
* **Antarmuka Pemilihan Tim Arcade 3D Podium & Smooth Carousel (`team.js`):**
  * **Zero AI-Slop & Anti-Vibe Coding:** Meniadakan seluruh hiasan emoji acak pada teks/tombol, meniadakan border outline kawat tipis, dan menggantinya dengan *tonal layering* kaca hijau gelap serta *chunky solid bevel*.
  * **Podium Silinder 3D Beriluminasi:** Maskot tim dirender di atas podium 3D bertingkat dengan bayangan alas realistis, bevel samping bergradien, dan cincin specular reflektif di canvas procedural.
  * **Dynamic Team Aura:** Aura panggung dan aksen pencahayaan otomatis berubah warna mengikuti tim yang aktif (Padi: Hijau Zamrud, Ular: Merah Ruby, Jamur: Amber Hangat, Elang: Biru Safir, Katak: Biru Toska).
  * **Smooth Spring Slide Transition:** Animasi perpindahan tim menggunakan akselerasi kurva spring empuk (`cubic-bezier(0.2, 0.8, 0.25, 1)`) disertai efek suara audio synth *whoosh* lembut.
  * **Multi-Input Ergonomics:** Mendukung usapan jari sentuh (*swipe gesture*) di layar IFP, tombol keyboard panah kiri/kanan, tombol panah arkade emas 3D di sisi kiri/kanan panggung, serta 5 tombol dock kapsul bawah dengan indikator terpilih (*active scale pop*).
* **Antarmuka Pemilihan Bioma Stage Showcase Carousel Slider & 60 FPS Real-Time Diorama (`biome.js`):**
  * **Eliminasi 100% Masalah Pemotongan Grid (1920x1080 Native):** Menggantikan format grid 2x2 statis yang sebelumnya memotong baris kedua di resolusi 1080p menjadi format panggung carousel slider megah satu ekosistem per slide.
  * **Jendela Diorama Lanskap 60 FPS Real-Time:** Panel kiri panggung menampung canvas lanskap ($680 \times 440$ px) yang terhubung langsung ke mesin render `PREVS` di loop animasi utama (awan bergerak, riak ombak danau/laut, serta animasi hewan secara hidup tanpa lag).
  * **Dossier Sains & Rantai Makanan Horizontal Lega:** Kolom kanan panggung menampung plakat identitas bioma, lencana status eksplorasi, deskripsi sains ekologis dengan bantalan lega, rantai trofik horizontal 4 organisme (*Produsen → Konsumen I → Konsumen II → Pengurai*) yang jelas dan mudah dibaca, serta tombol aksi sentuh chunky emas 3D `Jelajahi Ekosistem ▶`.
  * **4 Capsule Dock Pods Kuadran Bawah:** Dok navigasi bawah menampilkan 4 pod ubin kapsul bernomor (`01` Sawah, `02` Hutan Tropis, `03` Sungai Air Tawar, `04` Laut Terumbu Karang) berlatar enamel tonal gelap dan aksen bevel emas menyala saat aktif.
  * **Transisi Spring Slide & Multi-Input IFP:** Animasi geser horizontal menggunakan kurva suspensi empuk (`heroSlideRight` / `heroSlideLeft`) diiringi suara desiran angin sintetis `sfx.whoosh()`, serta mendukung usapan layar sentuh (*touch swipe*), tombol panah samping arkade, keyboard panah, dan sentuhan langsung pada dock pod.
* **Layar Penuh Cara Bermain Interaktif (Visual Bento Grid 4 Panel — `how.js`):**
  * **Transformasi dari Modal Sempit ke Full-Page 1080p:** Menghapus jendela pop-up sempit lama dan menggantinya dengan panggung penuh yang lapang, ramah anak, dan bebas dari distraksi.
  * **Mascot Scaffolding Banner (Gita si Detektif Cilik):** Sapaan hangat terintegrasi dengan avatar Gita SVG resolusi tinggi yang membimbing siswa memahami 4 rahasia sukses permainan.
  * **Visual Bento Grid 4 Panel:**
    1. *Pilih Tim Spesialis:* Keunggulan 5 tim (Padi, Elang, Katak, Jamur, Ular) dengan bonus kuota dan pemangkasan jeda cooldown.
    2. *Pantau Kesehatan & Hari:* Zona status Eco-Health (*Bahaya < 45%*, *Waspada 45–74%*, *Sehat ≥ 75%*) dan batas target hari.
    3. *Strategi Kartu Aksi:* Penggunaan kuota, urutan tindakan strategis (atasi ancaman krisis dahulu baru pulihkan produsen), dan jeda reaksi alam 1,2 detik.
    4. *Musyawarah Kelas & Kuis C2:* Jeda voting kelas dengan kartu fisik 3 warna, Kamus Alam, dan kuis kausalitas C2 untuk mengumpulkan total 24 bintang.
  * **Footer Action Bar:** Tombol sentuh emas chunky 3D `MULAI PETUALANGAN SEKARANG! ▶` yang langsung membawa siswa ke panggung pemilihan tim.
* **Layar Penuh Panduan Guru & Kurikulum IPAS (Cockpit Dashboard 3 Kolom — `teacher.js`):**
  * **Desain Khusus Guru Kelas 5A & Uji Coba Lapangan:** Memberikan dashboard terpadu bagi guru mitra di SDN Percobaan 2 Malang tanpa membebani siswa saat bermain mandiri.
  * **Kolom 1 (Kurikulum & Landasan Kognitif):** Memaparkan Capaian Pembelajaran (CP) IPAS Fase C, resolusi ketimpangan kognitif C1 vs C2 (Bloom Revisi), dan keselarasan model R&D Alessi & Trollip (2001).
  * **Kolom 2 (Sintaks Kelas & CSCL):** Panduan orkestrasi 25 siswa kelas 5A (diferensiasi 5 Petugas Layar IFP vs 20 Penasihat Meja di bangku), panduan voting musyawarah kartu fisik 3 warna (Hijau, Kuning, Merah), serta sinkronisasi Buku Catatan Detektif (LKPD Fisik).
  * **Kolom 3 (Rubrik Evaluasi, Kontrol Data & Aksi):** Formula 3 Bintang detektif, tombol taktil ruby `Reset Progres Kelas` dengan modal konfirmasi sentuh IFP 2 langkah (*anti-accidental reset*), dan tombol emas `MULAI SESI KELAS ▶`.
  * **Mode Penguji Rahasia (Examiner Gesture):** 5 ketukan berturut-turut pada lencana sekolah SDN Percobaan 2 Malang membuka instan seluruh 4 bioma, 8 misi, dan 24 bintang untuk kebutuhan presentasi seminar proposal, validasi ahli, maupun sidang skripsi.
* **Verifikasi Otomatis & Zero Regression:**
  * Didukung oleh test suite otomatis (`scripts/verify_modular_game.js`) yang memverifikasi inisialisasi modul, eksekusi render panggung, siklus hidup simulasi, alur bridging dialog RPG, kuis C2, hingga selebrasi kemenangan.
  * Audit tipografi otomatis (`scripts/audit_standalone_fonts.py`) dengan skor kelulusan 100% (0 pelanggaran font < 24px).



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
