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
5. **Feedback & Scaffolding:** Maskot Gita memberikan bimbingan audio-visual ramah anak, Bar Kesehatan Ekosistem, tombol bantuan 💡, dan peringatan emosi alam (*😱 Bahaya, 😐 Hati-hati, 😊 Sehat*).
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
| **Sistem Penilaian** | **Sistem 3 Bintang (Total 24 Bintang):**<br>⭐ 1: Kesehatan Ekosistem $\ge 75\%$<br>⭐⭐ 2: Lulus Kuis Kausalitas C2<br>⭐⭐⭐ 3: Menjawab Kuis Benar pada Percobaan Pertama | Memberikan gamifikasi motivasional (*reward loop*) dan instrumen debriefing Alessi & Trollip. |
| **Mekanika Unlock** | **Progression Lock:** Misi 2 terkunci hingga Misi 1 + Kuis tuntas; Ekosistem berikutnya terkunci hingga kedua misi ekosistem sebelumnya selesai | Mencegah kognitif berlebih (*cognitive overload*) dan memandu pemahaman bertahap. |
| **Gaya Visual** | **Modern 2D Vector Cartoon Edukatif (Vibrant & Clean Outlines)** | Garis luar tegas, warna cerah kontras tinggi (terinspirasi Duolingo & Kurzgesagt), siluet sangat jelas di layar IFP 65–86 inch, performa 60 FPS stabil. |
| **Target Platform** | Web HTML5 (Phaser 3 Game Engine) | 100% Offline-Ready, mandiri tanpa perlu instalasi aplikasi, kompatibel dengan browser IFP Android/Windows. |
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
5. **Visibilitas Jarak Jauh (Tampak Jelas dari Bangku Belakang Kelas 5A):**
   * Standar Tipografi Ergonomis IFP: Seluruh teks mikro yang sebelumnya berukuran kecil (11–14px) telah diaudit dan dinaikkan skalanya menjadi huruf besar, tebal, dan kontras tinggi (*Fredoka* $\ge 22$–$32$ px, *Nunito* $\ge 17$–$18$ px, tombol aksi $\ge 23$ px) dengan rasio kontras WCAG AAA agar mudah dibaca siswa dari bangku meja kelas berjarak 3–5 meter.
6. **Desain Visual Taktil & Sistem Desain Harmonis Seiras Homepage (Rich Emerald Enamel & Polished Gold Standard):**
   * Antarmuka mengadopsi identitas visual yang seiras penuh dengan Homepage (*TitleScene*) dan Buku Panduan (*TutorialScene*):
     - **Palet Warna:** Kanvas pemandangan alam panorama sawah 1080p yang cerah alami di siang hari, panel utama menggunakan *Dark Emerald Enamel* (`0x064e3b` / `0x022c22`), bingkai ganda emas mengkilap (*Polished Gold* `0xf59e0b` / `#fef08a`), aksen *Cyan Blue* (`0x38bdf8`), dan tipografi ramah anak kontras tinggi (*Fredoka Bold* `#fef08a` dan *Nunito Bold* `#ffffff`).
     - **Hero Arcade Character Select Layout (TeamSelectScene.js):** Mengadopsi format *hero roster* pahlawan arkade dengan 5 kartu karakter vertikal gagah ( \times 740$ px), maskot ilustrasi hewan HD berukuran besar ( \times 185$ px) dengan animasi napas halus (*breathing idle tween*), lingkaran aura cahaya neon dan pedestal bayangan di bawah hewan, lencana medali kuningan resmi pahlawan di pojok atas, skema warna pahlawan kontras (Elang: *Crimson Wine*, Ular: *Forest Emerald*, Katak: *Jungle Lime*, Padi: *Warm Honey Amber*, Jamur: *Mystic Indigo*), serta tombol sentuh 3D *tactile* dengan gelombang kejut cahaya emas (*shockwave ring*).
      - **Full-Screen Stage Showcase / Hero Biome Slider (BiomeSelectScene.js):** Menggantikan kisi kartu 2x2 konvensional menjadi format *stage showcase* sinematik ala game petualangan modern:
        - **Dynamic 1080p Crossfade Background:** Latar pemandangan alam panorama 1080p dinamis dengan transisi *crossfade* halus (380ms dual-layer alpha tween) yang berganti langsung mengikuti ekosistem yang sedang aktif dipilih siswa (Sawah, Hutan Tropis, Sungai Danau, Laut Terumbu Karang).
        - **Hero Stage Plaque di Sumbu Pusat ($980 \times 440$ px):** Panel kaca zamrud gelap elegan dengan lis ganda emas mengkilap dan ornamen sudut kuningan. Menampilkan Lencana Medali Emas Bioma ($\varnothing 110$ px) dengan animasi denyut lembut (*pulse tween*), Judul & Tagline Ekosistem, Pratinjau 2 Kartu Misi Krisis (Misi 1: Faktor Alam vs Misi 2: Faktor Manusia lengkap dengan indikator bintang), Strip Organisme Kunci Rantai Makanan, Status Bintang Prestasi ($0/6$), serta Tombol Aksi Sentuh Utama berukuran besar ramah IFP ($420 \times 64$ px, `SELIDIKI EKOSISTEM 🔍`).
        - **Sistem Kontrol Navigasi Hibrida Tiga Jalur:**
          1. Sepasang Tombol Panah Arkade Samping (`◀` di $X = 390$ & `▶` di $X = 1530$, target sentuh taktil $64 \times 96$ px) untuk navigasi mudah anak di depan layar IFP.
          2. Dok Miniatur 4 Bioma di Kuadran Bawah ($X = 960, Y = 945$, 4 ubin sentuh $210 \times 72$ px dengan sorotan bingkai emas dinamis pada bioma aktif dan status terkunci/terbuka).
          3. Dukungan Gestur Geser Sentuh (*Touch Swipe Gesture* ambang 50 px) untuk pengalaman sentuh intuitif.
        - **Mode Teaser Misteri Bioma Terkunci:** Bioma yang belum terbuka disajikan dengan atmosfer panggung redup (Alpha 0.38), lencana gembok emas misterius, dan tombol status gembok yang menjelaskan syarat pembukaan ("🔒 Selesaikan Ekosistem Sebelumnya untuk Membuka!").
      - **Streamlined Command Header & Centered Health Pod (SimulationScene.js):** Bilah komando atas (1920 $\times$ 64 px) mengadopsi tata letak simetris terdistribusi penuh dengan keseimbangan visual kiri-kanan:
        - **Sisi Kiri:** Tombol Keluar (`🚪 KELUAR`, $X = 75$), Lencana Pahlawan & Nama Tim ($X = 175, 205$), dan Kapsul Timer giliran kelompok berbingkai emas (`⏱️ WAKTU: 07:00`, $X = 460$).
        - **Pusat Monitor (Tepat di Sumbu $X = 960$ px):** *Health Meter Pod* dua baris vertikal ($460 \times 54$ px, *Dark Glassmorphism* berbingkai *Emerald* `0x10b981`). Baris atas memisahkan label nama ekosistem rata-kiri dengan teks emosi/persentase reaktif rata-kanan (`😱 BAHAYA / 😊 SEHAT (xx%)`). Baris bawah menampung lintasan progress bar dinamis selebar 424 px. Meniadakan 100% risiko tumpang tindih (*overlap collision*).
        - **Sisi Kanan:** Tombol kolaborasi Penasihat Meja (`📢 TANYA TEMAN`, $X = 1380$), ensiklopedia (`📖 KAMUS ALAM`, $X = 1580$), tombol toggle audio (`🔊 Suara`, $X = 1730$), dan toggle layar penuh (`⛶ Layar`, $X = 1820$). Seluruh bentang 1920px terisi seimbang tanpa ruang kosong asimetris.
      - **Balanced 4-Column Touch Action Dock (Zona Bawah IFP):** Panel sentuh kuadran bawah (1880 $\times$ 196 px) membagi 3 kartu aksi dan 1 kartu verifikasi selesai ke dalam kisi 4 kolom simetris matematika:
        - Tiap kolom berdimensi seragam $390 \times 138$ px dengan jarak sela antarkartu tepat 70 px dan margin kiri-kanan tepat 75 px ($X = 270, 730, 1190, 1650$).
        - Kolom 1–3 menampung kartu aksi berundak 3 tingkat (ikon & judul di baris atas, tombol sentuh taktil $350 \times 38$ px di baris tengah, dan lencana status kuota di baris bawah dengan margin aman 11 px di atas bingkai kartu).
        - Kolom 4 menampung Kartu Selesai Misi ($X = 1650$) berbingkai emas 3px dengan tombol verifikasi `✅ CEK HASIL PENYELIDIKAN 🔍` ($350 \times 38$ px) dan status evaluasi C2.
      - **Enclosed Mascot Speech Banner (Gita Scaffolding):** Balon dialog Gita diperluas menjadi lebar 520 px lengkap dengan plakat identitas `👧 GITA (PANDUAN DETEKTIF):` di bagian atas teks, serta tombol narasi suara audio (`🔊`, $X = 555$) dan tombol perancah kognitif ZPD (`💡`, $X = 602$) yang terlindungi di dalam ornamen batas panel tanpa terpotong.
      - **Terminal Quest Checklist Real-Time (Kanan Atas):** Widget checklist ($510 \times 155$ px, $X = 1640, Y = 160$) dilengkapi plakat kapsul header emas-zamrud `📋 TUGAS PENYELAMATAN DETEKTIF` dan strip latar kaca gelap pada tiap butir target misi untuk keterbacaan maksimal dari meja kelas.
      - **Chunky 3D Tiles & Dark Emerald Glassmorphism:** Seluruh kartu antarmuka (`TeamSelectScene`, `MissionMenuScene`, dsb.) menggunakan kontur *rounded rect* berenamel zamrud tua dengan bayangan bevel bawah 3D setebal 4–8px, efek aura radial emas di balik lencana medali kuningan detektif, serta tombol taktil chunky 3D *Golden Amber* (`0xf59e0b` / `0xb45309`) yang memberikan sensasi fisik nyata dapat ditekan (*tangible affordance*).
     - **Pemberian Peran Spesialis dengan Pita Emas Bernapas:** Menu misi menampilkan banner emas animasi pernapasan (*breathing animation*) `⭐ MISI UTAMA SPESIALIS: [NAMA TIM] ⭐` untuk memandu giliran kelompok secara eksplisit tanpa kebingungan pilihan.
     - **Isolasi Kedalaman Layer Modal Anti-Tumpuk (Z-Index Isolation):** Seluruh jendela pop-up briefing kasus dan modal voting kelas dibungkus dalam *container* khusus berkedalaman tinggi (`setDepth(201)` dan *dimmer backdrop* `setDepth(200)`), menjamin kartu menu di latar belakang tidak lagi menembus ke depan modal saat disentuh siswa.
     - **Aktivasi 100% Aset Visual Nyata:**
       - **8 Kartu Ensiklopedia & Kamus Sawah:** Pop-up interaktif berbasis Piaget Concrete Operational (`kamus_pematang`, `kamus_wereng`, `kamus_irigasi`, `kamus_pengurai`, `kamus_pemangsa`, `kamus_hama`, `kamus_gulma`, `kamus_limbah`) dengan tampilan dua tingkat (kisi 4x2 dan tampilan detail sains lengkap serta relevansi SDN Percobaan 2).
       - **3 Kartu Voting CSCL Fisik:** Kartu voting hijau, kuning, dan merah (`card_voting_hijau`, `card_voting_kuning`, `card_voting_merah`) dirender langsung secara konkret pada modal "Tanya Teman", menyelaraskan kartu digital dengan kartu fisik di meja siswa.
       - **Embodiment Maskot Gita Dinamis:** Sprite ekspresi wajah Gita berganti secara reaktif (`gita_talk` saat bersuara, `gita_think` saat bahaya/berpikir, `gita_thumbsup` saat sawah sehat, dan `gita_cheer` saat menang di layar evaluasi).
       - **Ikon Organisme Kontekstual & HUD Bar Skin:** Tombol aksi bawah menampilkan sprite visual asli (`ular`, `padi_subur`, `katak`, `jamur`, `icon_pestisida`, `icon_kemarau`, dsb.) serta frame visual `hud_cooldown_bar`.
     - **Mascot Speech Bar:** Dialog pemandu Gita si Detektif Cilik diformat sebagai bilah panel zamrud berbingkai emas dengan avatar Gita *close-up* berbingkai lingkaran, tag identitas kapsul emas hangat, teks sapaan kontras tinggi, dan tombol audio *Cyan Glowing* `🔊 DENGARKAN`.
     - **Umpan Balik Taktil IFP:** Tombol dan kartu memberikan animasi melesak 4px (*push-down bounce*) serta pembesaran *scale hover* halus saat disentuh jari siswa di layar IFP kelas.
7. **Mode Penguji / Dosen & Modal Konfirmasi Sentuh IFP (Hardware Touch Dialog & Examiner Gesture):**
   * **In-Engine Touch Modal:** Meniadakan ketergantungan pada dialog sistem peramban (`window.confirm`) yang tidak ergonomis di layar IFP (sering kali muncul kecil di pojok atas tak terjangkau tangan siswa/guru). Seluruh konfirmasi aksi penting (seperti reset progres) digantikan modal in-engine Phaser (`showConfirmModal`) berlatar gelap transparan (Alpha 0.8) dengan tombol sentuh berukuran besar ramah jemari (`✅ Ya, Reset` & `❌ Batal`).
   * **Gesture Rahasia Penguji (*Examiner Mode*):** Pada `BiomeSelectScene.js`, ketukan 5 kali berturut-turut pada lencana tim dalam durasi 3 detik memicu fungsi `progressManager.unlockAllForExaminer()`, membuka instan seluruh 4 bioma, 8 misi, dan perolehan 24/24 bintang prestasi untuk memfasilitasi kebutuhan demonstrasi simulasi saat validasi ahli materi/media, seminar proposal, maupun sidang skripsi.

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
4. **Peran Penasihat Meja:** 20 Siswa di meja memegang **Buku Catatan Detektif (LKPD Fisik)** untuk mencatat data awal populasi kasus masing-masing, mengisi prediksi krisis, dan serempak mengangkat kartu voting 3 warna saat tombol "📢 TANYA TEMAN" ditekan.

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
          - Saat bingung, Petugas Layar menekan tombol "📢 TANYA TEMAN"
          - Timer 7 menit otomatis dijeda (*paused*) dan bel kelas (*chime*) berbunyi
          - Tampil modal hitung mundur 15 detik bagi seluruh siswa di meja untuk berdiskusi
          - 20 Siswa di meja serempak mengangkat KARTU WARNA FISIK (Kontekstual 4 Bioma):
            🟢 KARTU HIJAU: Tambah Pemangsa Alami / Pengurai (Ular/Katak/Harimau/Bangau/Penyu/Jamur)
            🟡 KARTU KUNING: Alirkan Air / Buka Pintu Air / Alirkan Mata Air / Transplantasi Karang
            🔴 KARTU MERAH: Bersihkan Racun / Sita Jerat Pemburu / Saring Limbah / Angkut Sampah Plastik
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
         - Tracker 4 Kasus Sawah tercentang otomatis (✅ Misi Selesai)
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
| 1  | Sawah      | ☀️ Faktor Ulah Alam      | Misi 1: Tanah Retak   | Musim kemarau membuat saluran    | Alirkan air irigasi,  |
|    |            |                          | Kekeringan            | irigasi kering & padi layu!      | tanam tunas padi!     |
+----+------------+--------------------------+-----------------------+----------------------------------+-----------------------+
| 2  | Sawah      | ⚠️ Faktor Ulah Manusia   | Misi 2: Bahaya Racun  | Racun kimia disemprot berlebih & | Kembalikan katak,     |
|    |            | (Unlock: Lulus M1+Kuis)  | & Jerat Petani        | ular diburu -> Tikus merajalela! | lepas ular, bersihkan!|
+----+------------+--------------------------+-----------------------+----------------------------------+-----------------------+
| 3  | Hutan      | ☀️ Faktor Ulah Alam      | Misi 3: Kemarau &     | Panas terik mengeringkan mata air| Alirkan mata air,     |
|    | Tropis     |                          | Pohon Kering          | rimba & rumput pakan rusa!       | reboisasi pohon!      |
+----+------------+--------------------------+-----------------------+----------------------------------+-----------------------+
| 4  | Hutan      | ⚠️ Faktor Ulah Manusia   | Misi 4: Penebangan    | Pembalakan liar & jerat pemburu  | Sita jerat liar, rawat|
|    | Tropis     | (Unlock: Lulus M3+Kuis)  | Liar & Jerat Pemburu  | mengancam Harimau Sumatera!      | harimau, tanam pohon! |
+----+------------+--------------------------+-----------------------+----------------------------------+-----------------------+
| 5  | Sungai Air | ☀️ Faktor Ulah Alam      | Misi 5: Air Surut &   | Aliran sungai surut & eceng      | Buka pintu air hulu,  |
|    | Tawar      |                          | Gulma Menutup         | gondok menutup rapat permukaan!  | angkat gulma liar!    |
+----+------------+--------------------------+-----------------------+----------------------------------+-----------------------+
| 6  | Sungai Air | ⚠️ Faktor Ulah Manusia   | Misi 6: Racun Limbah  | Limbah detergen cair pabrik &    | Saring limbah pabrik, |
|    | Tawar      | (Unlock: Lulus M5+Kuis)  | & Sampah Plastik      | sampah mencemari ikan & bangau!  | tebar benih ikan!     |
+----+------------+--------------------------+-----------------------+----------------------------------+-----------------------+
| 7  | Laut       | ☀️ Faktor Ulah Alam      | Misi 7: Air Laut Panas| Suhu samudra memanas alami hingga| Transplantasi karang, |
|    | Karang     |                          | & Karang Memutih      | karang memutih (coral bleaching)!| sebar ikan karang!    |
+----+------------+--------------------------+-----------------------+----------------------------------+-----------------------+
| 8  | Laut       | ⚠️ Faktor Ulah Manusia   | Misi 8: Ledakan Bom   | Nelayan ilegal memakai bom ikan  | Sita bahan peledak,   |
|    | Karang     | (Unlock: Lulus M7+Kuis)  | Ikan & Sampah Laut    | & sampah plastik menjerat penyu! | bersihkan plastik laut!|
+----+------------+--------------------------+-----------------------+----------------------------------+-----------------------+
```

---

## 6. SISTEM PENILAIAN BINTANG & PROGRESI PEMBUKAAN (PROGRESSION LOCK)

### 6.1 Formula Perolehan 1–3 Bintang per Misi
Setiap misi memberikan penghargaan hingga 3 Bintang Prestasi Detektif:
* ⭐ **Bintang 1 (Stabilitas Ekosistem):** Meraih Tingkat Kesehatan Ekosistem $\ge 75\%$ dan menyelesaikan seluruh target checklist.
* ⭐⭐ **Bintang 2 (Kecakapan Kausalitas C2):** Berhasil menjawab kuis refleksi sebab-akibat di Buku Catatan Detektif.
* ⭐⭐⭐ **Bintang 3 (Penguasaan Konsep C2 Sempurna):** Menjawab kuis dengan tepat pada kesempatan/percobaan pertama (*first attempt*).
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
  `BootScene` ➡️ `TitleScene` ➡️ (`TutorialScene` atau `TeamSelectScene`) ➡️ `BiomeSelectScene` ➡️ `MissionMenuScene` ➡️ `SimulationScene` ➡️ `QuizScene` ➡️ `VictoryScene` ➡️ (`MissionMenuScene` atau `BiomeSelectScene`).
* **Headless Automated Test Suites (Regresi Logika Sains & Progresi):**
  * `WEBSITE/tests/test_simulation_logic.js`: Memvalidasi matematis transfer energi trofik, siklus predasi tiap 3 detik, konsumsi produsen, dan penambahan populasi pada 4 bioma secara mandiri tanpa browser (headless Node.js).
  * `WEBSITE/tests/test_progress_manager.js`: Memvalidasi kalkulasi bintang (0-24), serialisasi LocalStorage, pembukaan kunci gembok bertahap, dan verifikasi integritas Mode Penguji / Dosen (Unlock All).
* **Dokumen Inventaris Naskah Terintegrasi:**
  * Seluruh naskah narasi, instruksi 4 slide panduan, dialog interaktif Gita, scaffolding ZPD, panggilan voting Penasihat Meja, bank soal teka-teki C2, dan selebrasi estafet telah diekstrak dan didokumentasikan lengkap pada berkas pendamping: [`docs/NASKAH_KONTEN_GAME_GITA.md`](file:///d:/SKRIPSI%20GITA/docs/NASKAH_KONTEN_GAME_GITA.md).
* **Dokumentasi Generator Aset Visual AI Terstruktur:**
  * Seluruh prompt citra Google Gemini / Imagen 3 untuk karakter maskot Gita, organisme sawah, organisme multi-bioma (laut, hutan, danau), 8 kartu pop-up Kamus Kata konkret, kartu voting CSCL Penasihat Meja, dan antarmuka IFP didokumentasikan lengkap beserta negative prompt di [`docs/PROMPT_ASSET_GEMINI.md`](file:///d:/SKRIPSI%20GITA/docs/PROMPT_ASSET_GEMINI.md).

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
