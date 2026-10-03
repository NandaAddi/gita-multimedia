# ROADMAP SKRIPSI R&D (16 PEKAN / 4 BULAN)

* **Judul:** Pengembangan Multimedia Interaktif Berbasis Simulasi pada Materi Keseimbangan Ekosistem untuk Siswa Kelas V SDN Percobaan 2 Malang  
* **Model Pengembangan:** Alessi & Trollip (2001) (*Planning, Design, Development*)  
* **Fokus Materi:** Hubungan sebab-akibat rantai makanan & keseimbangan ekosistem (*C2 - Memahami*)  
* **Subjek Penelitian:** 25 Siswa Kelas 5A SDN Percobaan 2 Malang & 1 Guru Kelas  
* **Perangkat Utama:** Layar Sentuh *Interactive Flat Panel* (IFP) di Kelas 5A  

---

## 1. Alur Utama Pengembangan (Alessi & Trollip)

Penelitian ini menggunakan model **Alessi & Trollip (2001)** yang dirancang khusus untuk membuat multimedia pembelajaran dan simulasi komputer. Alur terbagi menjadi 3 fase:

| Tahap Pengembangan | Alokasi Waktu | Fokus Utama & Luaran |
| :--- | :--- | :--- |
| **Fase 1: Planning** *(Perencanaan)* | Pekan 1 – 4 | Analisis Kebutuhan, Kajian Teori, Metodologi, dan Seminar Proposal (Sempro) |
| **Fase 2: Design** *(Perancangan)* | Pekan 5 – 7 | Analisis Materi, Skenario Simulasi, Flowchart, dan Storyboard Layar Sentuh IFP |
| **Fase 3: Development & Testing** *(Pengembangan & Pengujian)* | Pekan 8 – 16 | Pembuatan Media, Validasi Ahli (Alpha), Uji Coba 25 Siswa di IFP (Beta), Penulisan Bab 4–5, dan Sidang Skripsi |

---

## 2. Rencana Kerja Mingguan (Pekan 1 – 16)

### BULAN 1: FASE PERENCANAAN / PLANNING (PEKAN 1 – 4)

#### Pekan 1: Analisis Kebutuhan & Draf Bab 1
* **Kegiatan:** Merangkum hasil wawancara guru dan merumuskan masalah utama (siswa mudah menghafal fakta/C1, tetapi kesulitan memahami konsep sebab-akibat ekosistem/C2).
* **Target Output:** Draf Bab 1 (Latar Belakang, Rumusan Masalah, Tujuan, dan Batasan Masalah).
* **Koordinasi:** Konsultasi Bab 1 ke Dosen Pembimbing; konfirmasi jadwal IPAS dengan Guru Kelas 5A.

#### Pekan 2: Kajian Teori & Draf Bab 2
* **Kegiatan:** Menyusun landasan teori: Multimedia Pembelajaran (Mayer), Tahap Kognitif Konkret Anak SD (Piaget), dan Karakteristik Simulasi Ekosistem.
* **Target Output:** Draf Bab 2 (Kajian Pustaka dan Kerangka Berpikir).
* **Koordinasi:** Bimbingan Bab 2 bersama Dosen Pembimbing.

#### Pekan 3: Metodologi Penelitian & Kisi-Kisi Instrumen (Bab 3)
* **Kegiatan:** Menetapkan langkah pengembangan Alessi & Trollip, merancang kriteria uji kelayakan ahli, dan menyusun kisi-kisi angket siswa serta guru.
* **Target Output:** Draf Bab 3 (Metode Penelitian) dan Lampiran Kisi-Kisi Instrumen Angket.
* **Koordinasi:** Bimbingan Bab 3 dan persetujuan kisi-kisi instrumen oleh Dosen Pembimbing.

#### Pekan 4: Seminar Proposal (Sempro) - [MILESTONE 1]
* **Kegiatan:** Menyatukan naskah proposal utuh (Bab 1–3), membuat slide presentasi, dan melaksanakan ujian Seminar Proposal.
* **Target Output:** Naskah Proposal ACC, Berita Acara Sempro, dan Catatan Revisi Penguji.
* **Koordinasi:** Mengurus revisi pasca-Sempro ke Dosen Penguji; mengurus surat izin penelitian ke sekolah.

---

### BULAN 2: FASE PERANCANGAN / DESIGN (PEKAN 5 – 7)

#### Pekan 5: Perancangan Materi & Skenario Simulasi
* **Kegiatan:** Merancang alur materi ekosistem sawah/hutan dan membuat 3 skenario simulasi interaktif (contoh: krisis kekeringan, perburuan predator ular/elang, dan cara memulihkan keseimbangan ekosistem).
* **Target Output:** Dokumen GBIM (Garis Besar Isi Media) dan Naskah Skenario Simulasi Sebab-Akibat.
* **Koordinasi:** Konsultasi logika materi sains ke Dosen Pembimbing; diskusi bahasa yang mudah dipahami bersama Guru Mitra.

#### Pekan 6: Pembuatan Flowchart & Storyboard Layar Sentuh IFP
* **Kegiatan:** Menggambar tata letak tampilan layar per frame (ukuran tombol besar ramah jari anak, teks jelas terbaca dari jarak jauh, dan tombol suara petunjuk).
* **Target Output:** Diagram Alur (Flowchart) dan Dokumen Storyboard Lengkap.
* **Koordinasi:** Bimbingan evaluasi storyboard bersama Dosen Pembimbing.

#### Pekan 7: Review Desain & Persiapan Aset Media
* **Kegiatan:** Meninjau kembali storyboard agar bebas dari gangguan visual, serta mengumpulkan aset grafis flora/fauna, efek suara, dan musik latar.
* **Target Output:** Storyboard Final yang disetujui (ACC) dan folder bahan aset media siap pakai.
* **Koordinasi:** Persetujuan akhir storyboard oleh Dosen Pembimbing sebelum mulai tahap coding/pembuatan media.

---

### BULAN 3: FASE PENGEMBANGAN & UJI COBA (PEKAN 8 – 12)

#### Pekan 8: Pembuatan Media & Logika Simulasi Phaser 3
* **Kegiatan:** Merakit media interaktif Phaser 3: memprogram logika rantai makanan, simulasi kaskade trofik, integrasi prinsip Mayer, Piaget (audio predasi chomp), Vygotsky (Scaffolding digital MKO tombol 💡), dan CSCL (Modal voting Penasihat Meja 15 detik).
* **Target Output:** File proyek media simulasi yang sudah berfungsi dengan baik dan 100% offline-ready via base64 data URIs.
* **Koordinasi:** Melaporkan progres tampilan dan cara kerja simulasi ke Dosen Pembimbing.

#### Pekan 9–10: Produksi Penuh 63 Aset Visual Vektor Modern, Arsitektur 4 Bioma & Sistem 3 Bintang (Alpha Final)
* **Kegiatan:** 
  1. Mengolah dan mengoptimasi seluruh 63 aset citra hasil generator AI dari `D:\SKRIPSI GITA\ASSET-BARU` (karakter Gita, organisme sawah, organisme 4 bioma, lencana, ikon krisis, kamus kata, kartu voting CSCL).
  2. Mengembangkan arsitektur **4 Ekosistem Nusantara (Sawah, Hutan Tropis, Sungai Air Tawar, Laut Terumbu Karang)** dengan **8 Misi** (Misi 1: Faktor Ulah Alam & Misi 2: Faktor Ulah Manusia).
  3. Mengimplementasikan **Sistem Gamifikasi 3 Bintang** (1: Stabilitas $\ge 75\%$, 2: Lulus Kuis C2, 3: Menjawab Benar di Percobaan Pertama) dengan total 24 Bintang.
  4. Menerapkan **Progression Lock**: Misi 2 terkunci hingga Misi 1 + Kuis selesai; Bioma berikutnya terkunci hingga bioma sebelumnya tuntas.
  5. Menambahkan modul scene baru `BiomeSelectScene.js` berformat **Full-Screen Stage Showcase Carousel Slider** (background crossfade 1080p dinamis, hero stage plaque, arcade side arrows, thumbnail dock bawah, dan gesture swipe), peremajaan UI Arcade Hero Roster pada `TeamSelectScene.js`, dan refaktor `MissionMenuScene.js`, `SimulationScene.js`, `QuizScene.js`, serta `VictoryScene.js` menjadi data-driven dengan `ecosystems-data.js` dan `ProgressManager.js` (persistent LocalStorage).
  6. Refaktor & penataan ergonomis antarmuka `SimulationScene.js`: Arsitektur *Two-Row Centered Health Meter Pod* di $X = 960$ (meniadakan 100% tumpang tindih teks status dan bar), perataan 4 kolom simetris pada kuadran bawah ($390 \times 138$ px, sela 70 px, margin 75 px, *zero border clipping*), penambahan kontrol suara `🔊` dan layar penuh `⛶` di bilah atas, plakat header `👧 GITA`, serta widget checklist terminal.
* **Target Output:** Master Media Simulasi Alpha Final (`WEBSITE/phaser.html`) dengan 4 Ekosistem Nusantara, 8 Misi lengkap kuis C2, sistem 3 bintang, dan 100% visual vector modern bebas CORS.
* **Koordinasi:** Menyerahkan produk media simulasi Alpha siap uji coba kepada Dosen Pembimbing untuk persiapan validasi ahli materi dan media.

#### Pekan 11: Penguatan Pedagogis, Fitur Penguji, & Gladi Bersih IFP Sekolah (Versi Beta)
* **Kegiatan:** 
  1. Mengimplementasikan mesin simulasi kaskade trofik multi-bioma dinamis 3-detik untuk 4 Bioma (Sawah, Hutan, Sungai, Laut) beserta resolusi desinkronisasi aksi intervensi.
  2. Membangun fitur *Mode Penguji / Dosen* (`unlockAllForExaminer`) via 5-tap gesture rahasia pada lencana tim dan modal sentuh in-engine IFP (meniadakan 100% dialog browser `window.confirm`).
  3. Mengembangkan diagram alur kausalitas visual C2 (4-node interactive chain) pada debriefing `QuizScene.js` untuk memperkuat pemahaman relasional sesuai Teori Mayer & Piaget.
  4. Menyelaraskan padanan peran tim lintas bioma pada `TeamSelectScene.js` dan sinkronisasi rekomendasi kartu voting CSCL Penasihat Meja kontekstual.
  5. Memodernisasi antarmuka portal riset landing page `WEBSITE/index.html` dengan desain Emerald Glassmorphism dan tautan instan pembaca dokumen offline `docs/docs.js`.
  6. Mengembangkan automated headless test suites (`test_simulation_logic.js` & `test_progress_manager.js`) dan uji coba gladi bersih di layar sentuh IFP SDN Percobaan 2 Malang.
    7. **Audit & Refaktor Tipografi Ultra-Large IFP Standard ($\ge 24$ px):** Melakukan audit font komprehensif pada seluruh 9 scene Phaser (`scripts/audit_fonts.py`), mengeliminasi 100% font kecil (sebelumnya 110 font di bawah 20px), menetapkan batas minimum absolut $\ge 24$ px di seluruh game, serta memperluas container/modal agar terbaca jelas dari bangku belakang kelas 5A.
  8. **Refaktor UI Hero Character Select Slider (`TeamSelectScene.js`):** Merombak tata letak 5 kartu sempit yang saling bertabrakan menjadi format *Hero Showcase Slider* panggung karakter tunggal megah ($1280 \times 550$ px) berbingkai enamel dan emas mengkilap, maskot 270px di atas pedestal 3D dengan aura tim, dossier sains rapi tanpa overflow, header 2-zona terpisah bebas tabrakan, sistem kontrol hibrida (tombol panah arkade samping, 5 dok selektor bawah, dan swipe sentuh), serta kepatuhan standar tipografi IFP $\ge 24$ px.
* **Target Output:** Master Media Versi Beta tervalidasi 100%, standar tipografi IFP $\ge 24$ px, antarmuka pemilihan tim hero slider ramah anak, portal riset modern, dokumen akademik tersinkronisasi, dan hasil tes teknis IFP.
* **Koordinasi:** Koordinasi teknis pelaksanaan pembelajaran bersama Guru Kelas 5A dan persiapan instrumen uji coba lapangan.

  9. **Optimasi Ergonomi Layar Sentuh IFP & Tonal Glassmorphism Standalone HTML (TES GITA BARU 1/index.html):** Menerapkan standar tipografi $\ge 24$ px mutlak (0 pelanggaran pada scripts/audit_standalone_fonts.py), perombakan visual anti-vibe-coding ke Tonal Glassmorphism, re-layout bertingkat Dock kartu aksi dan Kamus Alam 2-kolom lapang, serta pembersihan instrumen FPS meter untuk kesiapan implementasi kelas 5A.
  10. **Implementasi Bridging Character Dialogue Box In-Game (Pre-Instruction Scaffolding):** Menambahkan dialog box bergaya RPG di kuadran bawah arena simulasi saat hari 0 (simulasi ter-jeda/paused) yang menampilkan duet interaktif Gita & lencana maskot tim terpilih, 2 langkah narasi krisis dan arahan aksi pertama, narasi audio hibrida otomatis (`speak()` & chime), serta tombol sentuh emas IFP $\ge 58$px.
  11. **Refaktor Arsitektur Modular Clean Vanilla JS Standalone (Zero-CORS & IFP-Optimized):** Merestrukturisasi berkas monolitik tunggal 2.027 baris menjadi arsitektur modular standar industri yang terpisah rapi (16 berkas modular dalam subdirektori `css/`, `js/config.js`, `js/state.js`, `js/audio.js`, `js/data/`, `js/renderers/`, `js/scenes/`, `js/main.js`), mempertahankan 100% kompatibilitas luring offline protokol `file:///` tanpa web server (Zero-CORS), serta validasi seluruh siklus game & audit font IFP $\ge 24$px.

#### Pekan 12: Uji Coba Lapangan dengan 25 Siswa (Beta Testing) - [MILESTONE 2]
* **Kegiatan:** Melaksanakan pembelajaran di kelas 5A menggunakan media simulasi di IFP, membagi kelompok belajar, serta membagikan angket respon bergambar ke siswa dan guru.
* **Target Output:** 25 berkas angket respon siswa, 1 berkas angket guru, dokumentasi foto/video, dan Surat Keterangan Selesai Penelitian.
* **Koordinasi:** Refleksi proses pembelajaran bersama Guru Kelas dan Kepala Sekolah.

---

### BULAN 4: FASE LAPORAN AKHIR & SIDANG SKRIPSI (PEKAN 13 – 16)

#### Pekan 13: Olah Data Angket & Draf Bab 4 (Hasil Penelitian)
* **Kegiatan:** Menghitung persentase skor kelayakan dari validator ahli dan skor kepraktisan dari siswa/guru, serta mendokumentasikan foto perbaikan media (*Before vs After*).
* **Target Output:** Tabel hasil olah data statistik deskriptif dan draf Bab 4 bagian hasil pengembangan.
* **Koordinasi:** Bimbingan Bab 4 bersama Dosen Pembimbing.

#### Pekan 14: Penulisan Bab 4 (Pembahasan) & Bab 5 (Kesimpulan)
* **Kegiatan:** Menyusun pembahasan ilmiah (membuktikan bahwa simulasi IFP berhasil membantu pemahaman konsep sebab-akibat C2 siswa) dan menarik kesimpulan serta saran.
* **Target Output:** Draf lengkap Bab 4 (Pembahasan) dan Bab 5 (Kesimpulan & Saran).
* **Koordinasi:** Bimbingan penyempurnaan naskah skripsi bersama Dosen Pembimbing.

#### Pekan 15: Cek Plagiasi (Turnitin), Layout Naskah & Pendaftaran Sidang
* **Kegiatan:** Memeriksa kemiripan naskah di Turnitin (target < 20-25%), merapikan format naskah lengkap dari cover hingga lampiran, dan mendaftar sidang skripsi.
* **Target Output:** Naskah Utuh Skripsi Lengkap, Lembar Persetujuan Sidang (ACC), dan Bukti Lolos Turnitin.
* **Koordinasi:** Memperoleh tanda tangan persetujuan sidang dari Dosen Pembimbing 1 & 2.

#### Pekan 16: Ujian Sidang Skripsi & Hibah Produk - [MILESTONE 3]
* **Kegiatan:** Mempresentasikan hasil skripsi dan mendemonstrasikan media simulasi di hadapan Dewan Penguji, serta menyerahkan produk akhir ke sekolah mitra.
* **Target Output:** Berita Acara Kelulusan Ujian Skripsi dan Piagam Penyerahan Media ke SDN Percobaan 2 Malang.
* **Koordinasi:** Pengesahan naskah skripsi final dan serah terima master media ke pihak sekolah.

---

## 3. Ringkasan Singkat Rencana 16 Pekan

| Pekan | Tahap | Fokus Utama | Luaran (Output) Utama |
| :---: | :--- | :--- | :--- |
| **1** | Planning | Analisis data wawancara & scoping C1 vs C2 | Draf Bab 1 |
| **2** | Planning | Kajian teori Mayer, Piaget & simulasi | Draf Bab 2 |
| **3** | Planning | Penentuan metode Alessi & Trollip, kisi-kisi | Draf Bab 3 & Kisi-kisi Angket |
| **4** | **Milestone 1** | **Seminar Proposal Skripsi** | **Naskah Proposal ACC & Lulus Sempro** |
| **5** | Design | Perumusan skenario krisis ekosistem C2 | GBIM & Naskah Skenario Simulasi |
| **6** | Design | Perancangan tata letak layar sentuh IFP | Flowchart & Storyboard Lengkap |
| **7** | Design | Review storyboard & pengumpulan aset | Storyboard Final ACC & Kumpulan Aset |
| **8** | Development | Pemrograman logika dan interaksi simulasi | File Master Proyek Simulasi |
| **9** | Development | Pembuatan buku panduan & tes mandiri | Prototipe Alpha & Buku Panduan |
| **10** | Testing | Uji validasi ahli materi & ahli media | Lembar Validasi Ahli Terisi |
| **11** | Development | Perbaikan media & tes coba di IFP kelas | Media Versi Beta & RPP Siap Pakai |
| **12** | **Milestone 2** | **Uji coba di kelas 5A (25 siswa + guru)** | **Data Angket Siswa/Guru & Foto Riset** |
| **13** | Reporting | Olah data persentase skor kelayakan/respon | Draf Bab 4 (Hasil Pengembangan) |
| **14** | Reporting | Analisis pembahasan ilmiah C2 & kesimpulan | Draf Bab 4 (Pembahasan) & Bab 5 |
| **15** | Reporting | Uji Turnitin & daftar ujian sidang skripsi | Naskah Utuh Skripsi ACC Sidang |
| **16** | **Milestone 3** | **Ujian Sidang Skripsi & Hibah Media** | **Lulus Sarjana & Produk Diserahkan** |

---

## 4. Tips Praktis Penggunaan IFP di Lapangan

1. **Format Media Aman:** Siapkan media dalam bentuk tautan/folder **Web HTML5** (bisa dibuka langsung lewat browser Google Chrome di IFP) dan bentuk aplikasi mandiri **(.exe)** agar tidak terkendala jenis sistem operasi IFP sekolah.
2. **Kunci Jadwal:** Pastikan hari dan jam penggunaan IFP di kelas 5A sudah dipesan dengan guru minimal 2 minggu sebelum uji coba lapangan (Pekan 12).
3. **Belajar Kolaboratif:** Agar 25 siswa tetap tertib dan tidak berebut maju ke IFP, gunakan **Lembar Kerja Siswa (LKS) per kelompok**. Siswa berdiskusi menebak jawaban di meja masing-masing terlebih dahulu, baru kemudian perwakilan maju untuk mencoba simulasi di layar sentuh IFP.
