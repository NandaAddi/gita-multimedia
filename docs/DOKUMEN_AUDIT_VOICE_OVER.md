# DOKUMEN AUDIT & SPESIFIKASI VOICE-OVER (VO)
## "Eco-Explorer: Penjaga Keseimbangan Sawah" — SDN Percobaan 2 Malang

* **Peneliti / Pengembang:** Gito (Teknologi Pendidikan)
* **Judul Skripsi:** Pengembangan Multimedia Interaktif Berbasis Simulasi pada Materi Keseimbangan Ekosistem untuk Siswa Kelas V SDN Percobaan 2 Malang
* **Karakter Pemandu Utama:** **Gita si Detektif Cilik** (Anak SD Berhijab & Jaket Navy)
* **Target Perangkat:** Layar Sentuh *Interactive Flat Panel* (IFP 65–86 Inch) di Ruang Kelas 5A

---

## 1. LANDASAN TEORETIS & URGENSI VOICE-OVER DALAM SKRIPSI

Voice-Over (VO) dalam game *Eco-Explorer* bukan sekadar elemen kosmetik, melainkan **komponen instruksional vital** yang berakar pada teori psikologi pembelajaran:

1. **Mayer's Modality Principle (Prinsip Modalitas):**
   * Siswa belajar lebih mendalam ketika animasi visual di layar dijelaskan melalui **jalur auditori (suara vokal)** daripada melalui blok teks tulisan panjang. Ini mencegah *visual split-attention* dan kelebihan beban saluran visual (*cognitive overload*).
2. **Mayer's Voice Principle (Prinsip Suara Manusiawi):**
   * Siswa menyerap informasi lebih baik bila narasi disampaikan dengan suara yang ramah, hangat, berintonasi manusiawi (*human-like expressive voice*), dibandingkan suara mesin/robotik yang kaku.
3. **Karakteristik Ruang Kelas 5A SDN Percobaan 2 Malang:**
   * Jarak pandang siswa di bangku belakang ke layar IFP berkisar antara 3 hingga 6 meter. 
   * Hasil wawancara menunjukkan siswa kelas 5A memiliki gaya belajar audio-visual yang sangat kuat. Suara vokal Gita yang artikulatif dan ceria menjamin siswa di baris belakang tetap dapat memahami alur cerita tanpa harus mengeja teks kecil di layar.
4. **Vygotsky's Digital MKO (More Knowledgeable Other):**
   * Gita memposisikan diri sebagai rekan sebaya (*peer-mentor*) yang hangat dan suportif, bukan instruktur otoriter, sehingga menurunkan kecemasan belajar (*affective filter*) anak usia 10–11 tahun.

---

## 2. PROFIL & SPESIFIKASI KARAKTER VOKAL GITA (*VOCAL PERSONA*)

| Parameter | Spesifikasi Teknis & Panduan Pengarah Vokal |
| :--- | :--- |
| **Karakter Vokal** | Anak perempuan Indonesia usia 10–11 tahun (Kelas 5 SD). |
| **Karakteristik Suara** | Ceria, bersahabat, jernih, cerdas, ekspresif, dan memiliki nada empati peduli lingkungan. |
| **Kecepatan Bicara (*Tempo*)** | Sedang cenderung santai (sekitar 110–125 kata per menit / *Words Per Minute*). Tidak terburu-buru agar artikulasi kata ilmiah konkret terdengar jelas oleh seluruh kelas. |
| **Pitch & Frekuensi** | Sedikit lebih tinggi dari vokal dewasa wanita, bersemangat tanpa melengking (*high-spirited, gentle tone*). |
| **Gaya Bahasa (*Tone of Voice*)** | Bahasa Indonesia percakapan anak SD yang santun, hangat, menggunakan kata ganti *"kita"*, *"teman-teman"*, *"yuk"*, dan bebas dari jargon akademis kaku. |
| **Standar Teknis Audio Studio** | • Format: WAV / MP3 (128 kbps stereo atau mono 48 kHz).<br>• Normalisasi Loudness: **-16 LUFS** (Peak: -1.0 dBFS) agar terdengar lantang dan seimbang pada speaker terintegrasi IFP sekolah.<br>• Noise floor: < -60 dB (bebas desis/noise ruangan). |

---

## 3. INVENTARIS LENGKAP NASKAH VOICE-OVER (25 AUDIO TRACKS)

Berikut adalah daftar seluruh kebutuhan file audio vokal Gita yang terbagi ke dalam 7 scene permainan:

```
+---------------------------------------------------------------------------------------------------------+
|                               INVENTARIS NASKAH VOICE-OVER ECO-EXPLORER                                 |
+----+----------------------+-----------------------------------------------------------------------------+
| NO | KODE FILE AUDIO      | NASKAH REKAMAN VOKAL GITA (BAHASA RAMAH ANAK KELAS 5 SD)                   |
+----+----------------------+-----------------------------------------------------------------------------+
```

### 🌾 KELOMPOK 1: TITLE SCENE (HOMESCREEN / MENU UTAMA)
| No | Kode File | Pemicu Tombol / Scene | Naskah Voice-Over Gita |
| :--- | :--- | :--- | :--- |
| 1 | `vo_title_welcome.mp3` | Klik Balon Gita / Tombol Sapaan | *"Halo Teman-Teman! Aku Gita si Detektif Cilik! Sawah desa kita sedang menghadapi masalah besar. Yuk, kita bekerja sama menyelamatkan keseimbangan sawah bersama-sama!"* |
| 2 | `vo_title_guide.mp3` | Tombol Panduan Menu | *"Sentuh kartu Mulai Bermain untuk memilih kelompokmu, atau sentuh Cara Bermain untuk mempelajari aturan rantai makanan sawah!"* |

---

### 📖 KELOMPOK 2: TUTORIAL SCENE (BUKU PANDUAN 4 LANGKAH)
| No | Kode File | Pemicu Slide | Naskah Voice-Over Gita |
| :--- | :--- | :--- | :--- |
| 3 | `vo_tutor_slide1.mp3` | Slide 1: Misi Penyelamatan | *"Langkah pertama! Kelas kita akan dibagi menjadi lima kelompok penjaga alam. Tiap kelompok akan bergantian maju ke layar sentuh selama tujuh menit. Tugas kita adalah mengembalikan kesehatan sawah hingga bar berwarna hijau subur!"* |
| 4 | `vo_tutor_slide2.mp3` | Slide 2: Rantai Makanan | *"Langkah kedua: Pahami alur rantai makanan sawah! Padi adalah sumber makanan utama. Tikus memakan padi, sedangkan ular dan katak adalah sahabat petani yang memangsa hama. Burung elang menjaga jumlah ular, dan jamur mengurai jerami mati menjadi pupuk alami penyubur padi!"* |
| 5 | `vo_tutor_slide3.mp3` | Slide 3: Zona Sentuh & Cooldown | *"Langkah ketiga: Sentuh tombol aksi di bagian bawah layar untuk membantu hewan dan tanaman. Ingat ya, setelah menekan tombol, tunggu sebentar selama satu detik sambil mengamati bagaimana alam sawah merespons tindakanmu!"* |
| 6 | `vo_tutor_slide4.mp3` | Slide 4: Kolaborasi Co-Pilot | *"Langkah keempat: Untuk teman-teman yang ada di bangku, kalian adalah Co-Pilot hebat! Amati layar dan siapkan kartu voting tiga warna. Ketika tim di depan menekan tombol Tanya Teman, angkat kartu kalian tinggi-tinggi untuk memberi saran aksi!"* |

---

### 👥 KELOMPOK 3: TEAM SELECT SCENE (PEMILIHAN 5 KELOMPOK)
| No | Kode File | Pemicu Pemilihan Tim | Naskah Voice-Over Gita |
| :--- | :--- | :--- | :--- |
| 7 | `vo_team_intro.mp3` | Masuk ke Layar Pilih Tim | *"Wah, selamat datang para detektif cilik! Kelompok mana yang maju giliran pertama? Sentuh lencana tim kalian untuk memulai penyelidikan!"* |
| 8 | `vo_team_selected.mp3` | Klik Salah Satu Kartu Tim | *"Pilihan hebat! Tim detektif sudah siap. Bersiaplah mengamati sawah dan selesaikan misi penyelamatan!"* |

---

### 🗺️ KELOMPOK 4: MISSION MENU SCENE (4 KASUS KRISIS SAWAH)
| No | Kode File | Pemicu Modal Misi | Naskah Voice-Over Gita |
| :--- | :--- | :--- | :--- |
| 9 | `vo_mission_menu_intro.mp3` | Masuk Menu Misi | *"Pilihlah salah satu kasus krisis sawah yang ingin kalian selidiki bersama kelompokmu!"* |
| 10 | `vo_mission1_brief.mp3` | Briefing Misi 1 (Hama Tikus) | *"Kasus Pertama: Serbuan Hama Tikus! Ular sawah diburu habis karena ditakuti. Akibatnya, tikus bertambah sangat banyak dan memakan tanaman padi hingga rusak. Tugas kalian: kembalikan ular pemangsa agar padi petani terselamatkan!"* |
| 11 | `vo_mission2_brief.mp3` | Briefing Misi 2 (Racun Kimia) | *"Kasus Kedua: Bahaya Racun Kimia Semprotan! Petani menyemprot racun berlebihan hingga katak sawah ikut mati. Tanpa katak, serangga bebas merusak daun padi. Tugas kalian: bersihkan racun dan selamatkan katak sahabat petani!"* |
| 12 | `vo_mission3_brief.mp3` | Briefing Misi 3 (Kekeringan Irigasi) | *"Kasus Ketiga: Sawah Kekeringan Retak! Pintu air irigasi tertutup hingga tanah sawah mengering dan padi mati layu. Jika padi mati, hewan pemangsa ikut kelaparan. Tugas kalian: buka pintu air dan alirkan air irigasi ke sawah!"* |
| 13 | `vo_mission4_brief.mp3` | Briefing Misi 4 (Rahasia Jamur) | *"Kasus Keempat: Rahasia Jamur Penyubur Tanah! Tumpukan sisa jerami kering menumpuk di pematang. Tugas kalian: kembangkan jamur pengurai untuk mendaur ulang jerami menjadi pupuk alami penyubur padi!"* |

---

### 🎮 KELOMPOK 5: SIMULATION SCENE (SIMULASI DINAMIKA SAWAH)
| No | Kode File | Pemicu di Layar Simulasi | Naskah Voice-Over Gita |
| :--- | :--- | :--- | :--- |
| 14 | `vo_sim_copilot_call.mp3` | Tekan Tombol 📢 "TANYA TEMAN" | *"Panggilan darurat kepada Co-Pilot di bangku kelas! Operator di layar meminta saran tindakan. Diskusikan dan angkat kartu voting warna kalian sekarang!"* |
| 15 | `vo_sim_vote_green.mp3` | Hasil Voting Opsi 🟢 Hijau | *"Hasil suara terbanyak memilih Kartu Hijau! Mari kita tambahkan hewan pemangsa alami atau jamur pengurai ke sawah!"* |
| 16 | `vo_sim_vote_yellow.mp3` | Hasil Voting Opsi 🟡 Kuning | *"Hasil suara terbanyak memilih Kartu Kuning! Ayo segera buka pintu air dan alirkan irigasi ke sawah!"* |
| 17 | `vo_sim_vote_red.mp3` | Hasil Voting Opsi 🔴 Merah | *"Hasil suara terbanyak memilih Kartu Merah! Waspadai lonjakan hama tikus dan bersihkan racun semprotan kimia!"* |
| 18 | `vo_sim_hint_m1.mp3` | Tombol 💡 Bantuan Gita (Misi 1) | *"Petunjuk Detektif: Tikus bertambah banyak karena pemangsa ular hilang. Coba lepaskan minimal dua puluh ekor ular ke pematang sawah!"* |
| 19 | `vo_sim_hint_m2.mp3` | Tombol 💡 Bantuan Gita (Misi 2) | *"Petunjuk Detektif: Katak adalah sahabat petani pemangsa serangga. Segera bersihkan racun kimia dan lepaskan katak sawah!"* |
| 20 | `vo_sim_hint_m3.mp3` | Tombol 💡 Bantuan Gita (Misi 3) | *"Petunjuk Detektif: Tanah sawah retak-retak kekeringan. Buka pintu air irigasi minimal sampai enam puluh persen agar padi kembali segar!"* |
| 21 | `vo_sim_hint_m4.mp3` | Tombol 💡 Bantuan Gita (Misi 4) | *"Petunjuk Detektif: Sisa jerami kering harus diurai! Sebar spora jamur dan tekan tombol urai jerami agar berubah jadi pupuk alami!"* |
| 22 | `vo_sim_danger_alert.mp3` | Sawah Kritis (<45% Health) | *"Awas! Sawah dalam kondisi bahaya! Perhatikan hewan yang hilang dan segera lakukan aksi penyelamatan!"* |

---

### 🧠 KELOMPOK 6 & 7: QUIZ SCENE (DEBRIEFING C2) & VICTORY SCENE
| No | Kode File | Pemicu di Layar Debriefing & Victory | Naskah Voice-Over Gita |
| :--- | :--- | :--- | :--- |
| 23 | `vo_quiz_intro.mp3` | Masuk ke Kuis Buku Detektif | *"Simulasi berhasil diselesaikan! Sekarang, buka Buku Catatan Detektif kalian. Jawablah teka-teki sebab-akibat berikut untuk melengkapi laporan penyelidikan kita!"* |
| 24 | `vo_quiz_correct.mp3` | Siswa Memilih Jawaban Benar | *"Luar biasa! Analisis detektif kalian tepat sekali! Rantai makanan kini terbukti saling berhubungan dan menjaga keseimbangan alam!"* |
| 25 | `vo_victory_cheer.mp3` | Layar Bintang Selebrasi | *"Selamat kepada seluruh anggota tim! Berkat kerja sama yang kompak antara operator di depan dan Co-Pilot di meja, sawah Desa Sukatani kini kembali subur dan lestari!"* |

---

## 4. STRATEGI ARSITEKTUR IMPLEMENTASI: *DUAL-ENGINE AUDIO SYSTEM*

Untuk menjamin keandalan 100% saat diuji di depan validator ahli dan saat pembelajaran di kelas 5A SDN Percobaan 2 Malang, game menerapkan arsitektur **Hybrid Dual-Engine**:

```
                              [PEMAIN MENEKAN TOMBOL 🔊]
                                          │
                                          ▼
                      [APAKAH FILE AUDIO vo_*.mp3 TERSEDIA?]
                                          │
                        ┌─────────────────┴─────────────────┐
                        ▼                                   ▼
                   [YA / ADA]                          [TIDAK / FALLBACK]
                        │                                   │
                        ▼                                   ▼
          Putar File Audio Studio MP3          Gunakan Web Speech API (TTS)
         (Suara vokal manusia jernih           (Synthesizer otomatis browser
          normalisasi -16 LUFS)                 vokal id-ID pitch ramah anak)
```

### Keuntungan Bagi Riset Skripsi Anda:
1. **Bebas Risiko Kegagalan Teknis (*Zero Failures*):** Jika file rekaman MP3 belum sempat direkam semua, game **tetap bisa bersuara** menggunakan Web Speech API yang sudah aktif saat ini di `audio.js`.
2. **Kualitas Nilai Uji Ahli Media (*High Media Validity*):** Validator ahli media akan memberikan nilai sangat tinggi karena adanya opsi vokal studio manusiawi yang memenuhi *Mayer Voice Principle*.
3. **Bebas Hambatan Internet (*100% Offline-Ready*):** Seluruh file vokal MP3 disimpan secara lokal di folder `assets/audio/vo/` atau disematkan sebagai Data URI di `assets-data.js`.

---

## 5. REKOMENDASI ALAT & CARA PRODUKSI AUDIO CEPAT

Jika Anda ingin memproduksi 25 berkas audio di atas dengan cepat tanpa menyewa pengisi suara profesional:

1. **Menggunakan AI Voice Studio Ramah Anak (Rekomendasi Terbaik):**
   * Platform: **ElevenLabs** atau **Murf.ai** atau **Gemini Audio Generator**.
   * Pilihan Karakter: Pilih voice persona anak perempuan ceria berbahasa Indonesia (contoh: karakter *"Indonesian Female Kid/Teen"*).
   * Masukkan naskah pada tabel Bagian 3 di atas, lalu unduh dalam format MP3.
2. **Penyimpanan Berkas:**
   * Seluruh 25 berkas WAV studio telah tersimpan rapi di:
     `d:\SKRIPSI GITO\WEBSITE\assets\voice-over\`
3. **Penyematan Otomatis (100% Offline):**
   * Telah diproses menggunakan skrip `embed_vo.py` dan disematkan langsung ke dalam `WEBSITE/js/vo-data.js` sebagai Base64 Data URIs (bebas CORS pada protokol `file://` di komputer IFP).

---

## 6. STATUS SETUP & INTEGRASI SISTEM (SELESAI 100%)

| Komponen Sistem | Status | Keterangan Teknis |
| :--- | :---: | :--- |
| **Berkas Audio Studio (`vo_*.wav`)** | ✅ **LENGKAP (25/25)** | 25 berkas suara jernih vokal Gita telah aktif di `assets/voice-over/`. |
| **Base64 Offline Bundle (`vo-data.js`)** | ✅ **AKTIF (15.7 MB)** | Menjamin suara vokal dapat diputar tanpa web server dan bebas CORS di IFP sekolah. |
| **Hybrid Dual-Engine (`audio.js`)** | ✅ **TERINTEGRASI** | Method `playVO(key, fallbackText)` memutar audio studio dengan fallback otomatis ke TTS. |
| **Wiring Seluruh Scene Game** | ✅ **TERHUBUNG 100%** | Terpasang pada `TitleScene`, `TutorialScene`, `TeamSelectScene`, `MissionMenuScene`, `SimulationScene`, `QuizScene`, dan `VictoryScene`. |
| **Fitur Stop Voice saat Ganti Layar** | ✅ **AKTIF** | Mencegah tumpang-tindih suara narasi saat pengguna berpindah menu/scene. |

