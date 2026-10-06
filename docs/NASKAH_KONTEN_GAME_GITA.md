# 📜 DOKUMEN MASTER INVENTARIS NASKAH & KONTEN GAME (REVISI EKOSISTEM NUSANTARA)
## "Eco-Explorer: Penjaga Keseimbangan Ekosistem"
### Versi Bahasa Ramah Siswa Kelas 5 SD — SDN Percobaan 2 Malang

* **Peneliti / Pengembang:** Gito (Teknologi Pendidikan)
* **Karakter Pemandu Utama:** Gita si Detektif Cilik (Rekan Sebaya / *Peer-Mentor* Usia 10–11 Tahun)
* **Kurikulum Acuan:** Kurikulum Merdeka — IPAS Fase C (Materi Rantai Makanan & Keseimbangan Ekosistem)
* **Sasaran Pengguna:** 25 Siswa Kelas 5A (Kolaborasi 5 Kelompok Jigsaw: Petugas Layar di Depan & Penasihat Meja)
* **Target Perangkat:** Layar Sentuh *Interactive Flat Panel* (IFP 65–86 Inch) & Kartu Voting Fisik 3 Warna
* **Cakupan Wilayah Bioma:** 4 Bioma Nusantara (🌾 Sawah, 🌲 Hutan Tropis, 🏞️ Sungai Air Tawar, 🌊 Laut Terumbu Karang)
* **Struktur Misi:** 8 Misi Investigasi (Tiap Bioma memiliki Misi 1: Faktor Ulah Alam & Misi 2: Faktor Ulah Manusia)
* **Sistem Gamifikasi:** 3 Bintang Detektif per Misi (Total 24 Bintang) & Sistem Buka Kunci Bertahap (*Progression Lock*)

---

## 0. KEPUTUSAN PENYERAGAMAN (BERLAKU DI SELURUH NASKAH)

| Hal | Keputusan Baku | Catatan Implementasi |
|---|---|---|
| **Jeda tombol (Cooldown)** | **1,2 detik** | Narasi VO: "tunggu sebentar". Mencegah ketukan berulang tanpa berpikir (*anti-spam*). |
| **Tempat siswa lain** | **meja** | Menggantikan sebutan bangku / tempat duduk agar seragam. |
| **Peran siswa di meja** | **Penasihat Meja** | Menggantikan istilah asing "Co-Pilot". Siswa berdiskusi dan mengangkat kartu voting. |
| **Peran siswa di layar** | **Petugas Layar** | Menggantikan istilah teknis "Operator". 4–5 siswa perwakilan yang menyentuh layar IFP. |
| **Buku kuis C2** | **Buku Catatan Detektif** | Menggantikan nama "Buku Rahasia Detektif" / "Lembar Kerja Kuis". |
| **Bar kesehatan** | **Ukuran Kesehatan Ekosistem** | Menggantikan istilah "Health Bar" atau "Bar Kesehatan". |
| **Dual Audio Engine** | **WAV Studio + Web Speech TTS** | 26 rekaman suara Gita untuk Sawah & Tutorial; TTS Bahasa Indonesia otomatis aktif untuk bioma Hutan, Sungai, dan Laut. |
| **Sistem Bintang** | **⭐ 1–3 Bintang per Misi** | ⭐ HP ≥ 75% • ⭐⭐ Lulus Kuis C2 • ⭐⭐⭐ Jawaban Pertama Benar (*First Attempt*). |
| **Nama tim di VO** | **Dibuat umum ("Detektif")** | Nama tim tidak dimasukkan ke dalam rekaman audio; nama tim hanya tampil dinamis pada teks layar. |
| **Aturan kalimat VO** | **Maks ±15 kata/kalimat, maks ±20 detik/audio** | Sesuai kapasitas memori kerja kognitif siswa usia 10–11 tahun (Sweller CLT & Mayer CTML). |

### Kamus Kata Ramah Siswa (Muncul sebagai ensiklopedia sains di bilah atas layar)
| Kata | Arti Sederhana untuk Siswa Kelas 5 SD |
|---|---|
| **Pematang** | Jalan tanah kecil di tepi petak sawah tempat petani berjalan |
| **Wereng** | Serangga kecil penghisap cairan batang dan pemakan daun padi |
| **Irigasi** | Saluran yang mengalirkan air dari bendungan ke petak sawah |
| **Pengurai / Dekomposer** | Makhluk hidup (seperti jamur dan cacing) yang mengubah sisa tumbuhan/hewan mati menjadi pupuk tanah |
| **Pemangsa / Predator** | Hewan yang memburu dan memakan hewan lain |
| **Hama** | Hewan yang merusak dan memakan tanaman budidaya petani dalam jumlah banyak |
| **Kanopi Hutan** | Tudung dedaunan pohon-pohon raksasa di bagian atas hutan tropis |
| **Sedimen Lumpur** | Lapisan tanah dan lumpur tebal yang hanyut terbawa banjir dan menutupi dasar air |
| **Pemutihan Karang (*Bleaching*)** | Kondisi terumbu karang memutih dan sekarat karena suhu air laut memanas ekstrem |
| **Zooplankton** | Hewan renik mikroskopis melayang di air yang menjadi makanan ikan-ikan kecil |

---

## 1. PROFIL GITA (PEER-MENTOR & VOCAL PERSONA)
* **Karakter:** Detektif cilik, sosok kakak kelas yang ramah, hangat, bersemangat, dan selalu mengajak (*"yuk"*, *"kita"*, *"teman-teman"*).
* **Prinsip Bahasa:** Satu kalimat memuat satu ide pokok. Setiap kata ilmiah konkret selalu dijelaskan dengan contoh nyata di lingkungan siswa. Bebas jargon akademis kaku.
* **Landasan Pedagogis:**
  - *Vygotsky's Digital More Knowledgeable Other (MKO):* Gita memandu proses konstruksi pemahaman melalui *scaffolding* bertingkat ZPD.
  - *Mayer's Modality & Voice Principle:* Didukung rekaman vokal manusiawi bersahabat (-16 LUFS) dan sintesis wicara natural untuk meminimalkan beban kognitif visual.

---

## 2. TITLE SCENE (MENU UTAMA / HOMESCREEN)

* **Judul Utama:** `ECO-EXPLORER: PENJAGA KESEIMBANGAN EKOSISTEM`
* **Tagline:** `Yuk, jelajahi dan selamatkan ekosistem Nusantara bersama Detektif Gita!`
* **Balon Bicara Gita:** *"Yuk, selamatkan alam Nusantara bersama-sama! ❤️ (Sentuh untuk mendengar)"*
* **Rekaman Suara Gita (`vo_title_welcome.wav`):**
  > *"Halo, teman-teman! Aku Gita, detektif cilik. Ekosistem di Nusantara sedang bermasalah. Yuk, kita selamatkan alam bersama-sama!"*
* **Kartu Aksi Utama:**
  1. `MULAI BERMAIN` ➔ Mengarahkan ke layar pemilihan kelompok (`TeamSelectScene`).
  2. `CARA BERMAIN` ➔ Mengarahkan ke tutorial 4 langkah (`TutorialScene`).
  3. `UNTUK GURU` ➔ Membuka modal informasi penelitian dan panduan kelas.

---

## 3. TUTORIAL: 4 LANGKAH PANDUAN

* **Header:** `📖 BUKU PANDUAN: CARA JADI PENJAGA ALAM` | `Langkah [X] dari 4`
* **Langkah 1 (Tantangan Kelas 5A):** Kelas dibagi 5 tim. Tiap tim maju 7 menit di layar IFP. Target: buat bar kesehatan ekosistem berwarna HIJAU (75%+).
* **Langkah 2 (Rantai Makanan Nusantara):** Produsen dimakan herbivora, herbivora dimangsa predator. Jamur/bakteri mengurai sisa makhluk hidup. Semua saling terhubung!
* **Langkah 3 (Cara Menyentuh Layar):** Sentuh tombol besar di bawah layar, lalu tunggu 1,2 detik dan amati perubahan populasi.
* **Langkah 4 (Penasihat Meja):** Saat Petugas Layar menekan "Tanya Teman", siswa di meja berdiskusi 15 detik dan mengangkat kartu warna fisik (🟢 Hijau / 🟡 Kuning / 🔴 Merah).

---

## 4. TEAM SELECT (PEMILIHAN KELOMPOK JIGSAW)

* **Judul Utama:** `🌾 ECO-EXPLORER: PENJAGA KESEIMBANGAN EKOSISTEM`
* **Sub-judul:** `🎮 Wakil kelompok, maju dan sentuh lencana timmu!`
* **Profil 5 Kelompok Jigsaw:**
  1. **TIM ELANG:** 👑 Pemangsa Puncak | "Penjaga Langit Nusantara" | Merah (`#ff4b4b`)
  2. **TIM ULAR:** 🛡️ Pemburu Hama | "Sahabat Keseimbangan Rantai Makanan" | Toska (`#00cd9c`)
  3. **TIM KATAK:** 🦗 Pemakan Serangga | "Penjaga Keseimbangan Air & Darat" | Hijau (`#58cc02`)
  4. **TIM PADI:** 🌾 Sumber Energi | "Pemberi Makanan Utama Kehidupan" | Oranye (`#ff9600`)
  5. **TIM JAMUR:** 🍄 Ahli Pengurai | "Pahlawan Daur Ulang Nutrisi Tanah" | Ungu (`#ce82ff`)

* **Aksi Selanjutnya:** Menyentuh `LANJUT KE PETA NUSANTARA` menuju `BiomeSelectScene`.

---

## 5. PETA EKOSISTEM NUSANTARA (BIOME SELECT SCENE)

* **Top Header:** `PETA EKOSISTEM NUSANTARA • GILIRAN: [NAMA TIM]`
* **Total Bintang Terkumpul:** `⭐ [X] / 24 Bintang Terkumpul`
* **Naskah Suara Panduan Gita:**
  > *"Selamat datang di Peta Nusantara! Pilih bioma yang ingin diselidiki bersama timmu!"*
* **Daftar 4 Bioma:**
  1. 🌾 **SAWAH (Lumbung Padi)**
     - *Status:* Terbuka sejak awal.
     - *Deskripsi:* Sawah subur tempat padi tumbuh. Jaga keseimbangan dari kemarau dan pestisida kimia.
     - *Misi:* 2 Kasus (M1: Kemarau Panjang • M2: Racun Kimia & Perburuan).
  2. 🌲 **HUTAN TROPIS (Jantung Paru-Paru Bumi)**
     - *Status:* Terkunci (Terbuka setelah menyelesaikan Bioma Sawah).
     - *Deskripsi:* Hutan hujan lebat rumah harimau dan rusa. Waspadai kebakaran alami dan perburuan liar.
     - *Misi:* 2 Kasus (M1: Kebakaran Kemarau • M2: Penebangan & Pemburu).
  3. 🏞️ **SUNGAI AIR TAWAR (Aliran Kehidupan)**
     - *Status:* Terkunci (Terbuka setelah menyelesaikan Bioma Hutan Tropis).
     - *Deskripsi:* Sungai jernih tempat ikan gabus dan bangau hidup. Jaga dari erosi banjir lumpur dan limbah pabrik.
     - *Misi:* 2 Kasus (M1: Banjir Lumpur • M2: Limbah Beracun).
  4. 🌊 **LAUT TERUMBU KARANG (Taman Bawah Laut)**
     - *Status:* Terkunci (Terbuka setelah menyelesaikan Bioma Sungai).
     - *Deskripsi:* Istana bawah laut dengan terumbu karang warna-warni. Selamatkan dari pemutihan karang dan bom ikan.
     - *Misi:* 2 Kasus (M1: Gelombang Panas • M2: Bom Ikan & Sampah).

---

## 6. INVENTARIS 8 MISI LENGKAP (BRIEFING, TARGET & TINDAKAN)

### 🌾 BIOMA 1: SAWAH

#### Misi 1: Kemarau Panjang (Faktor Ulah Alam)
* **Tag:** `FAKTOR ALAM • TINGKAT: SEDANG`
* **Briefing Gita:**
  > *"Musim kemarau panjang membuat saluran irigasi kering dan tanah retak! Padi layu kekeringan. Jika padi mati, tikus dan pemangsa akan kelaparan. Ayo alirkan air dan jaga rantai makanan!"*
* **Target Misi:**
  - 💧 Air Sawah minimal 60%
  - 🌾 Padi minimal 50 rumpun
  - 🐍 Ular minimal 20 ekor
  - 🏆 Ukuran Kesehatan Sawah minimal 75%
* **Tindakan Tombol IFP:**
  1. `🚿 ALIRKAN AIR (+25%)`
  2. `🌾 TANAM 10 PADI`
  3. `🐍 LEPAS 10 ULAR`
* **Bantuan Gita (Scaffolding ZPD):**
  *"Tanah sawah retak karena kering! Buka pintu air sampai minimal 60%, lalu tanam bibit padi baru!"*

#### Misi 2: Racun Kimia & Perburuan (Faktor Ulah Manusia)
* **Tag:** `FAKTOR MANUSIA • TINGKAT: MENANTANG 🔒 (Buka setelah Misi 1)`
* **Briefing Gita:**
  > *"Petani menyemprot racun pestisida berlebihan dan memburu habis ular sawah karena takut! Katak mati teracuni, tikus meledak memangsa padi. Ayo bersihkan racun dan pulihkan pemangsa alami!"*
* **Target Misi:**
  - ✨ Bersihkan seluruh residu racun pestisida
  - 🐸 Katak minimal 30 ekor
  - 🐍 Ular minimal 20 ekor
  - 🌾 Padi minimal 50 rumpun
  - 🏆 Ukuran Kesehatan Sawah minimal 75%
* **Tindakan Tombol IFP:**
  1. `✨ BERSIHKAN RACUN`
  2. `🐸 LEPAS 10 KATAK`
  3. `🐍 LEPAS 10 ULAR`
* **Bantuan Gita (Scaffolding ZPD):**
  *"Racun kimia mematikan katak! Bersihkan tanah terlebih dahulu, lalu lepaskan katak dan ular pemburu tikus!"*

---

### 🌲 BIOMA 2: HUTAN TROPIS

#### Misi 3: Kebakaran Kemarau (Faktor Ulah Alam)
* **Tag:** `FAKTOR ALAM • TINGKAT: SEDANG`
* **Briefing Gita:**
  > *"Petir saat kemarau menyulut api di dedaunan kering! Pohon-pohon hutan hangus terbakar. Rusa kehilangan makanan dan harimau kebingungan. Cepat padamkan api dan tanam kembali pohon hutan!"*
* **Target Misi:**
  - 🌲 Pohon Hutan minimal 45 batang
  - 🦌 Rusa minimal 20 ekor
  - 🐅 Harimau minimal 10 ekor
  - 🏆 Ukuran Kesehatan Hutan minimal 75%
* **Tindakan Tombol IFP:**
  1. `💧 PADAMKAN API`
  2. `🌲 REBOISASI POHON (+10)`
  3. `🦌 LEPAS 5 RUSA`
* **Bantuan Gita (Scaffolding ZPD):**
  *"Api membakar pohon sumber makanan rusa! Padamkan api dan lakukan reboisasi pohon hutan sekarang!"*

#### Misi 4: Penebangan Liar & Pemburu (Faktor Ulah Manusia)
* **Tag:** `FAKTOR MANUSIA • TINGKAT: MENANTANG 🔒 (Buka setelah Misi 3)`
* **Briefing Gita:**
  > *"Penebang liar menebang pohon raksasa demi kayu dan pemburu menangkap harimau! Rumah satwa rusak dan rantai makanan terputus. Tangkap pemburu dan kembalikan satwa ke hutan!"*
* **Target Misi:**
  - 🛡️ Patroli Hutan & Tangkap Pemburu
  - 🐅 Harimau minimal 15 ekor
  - 🌲 Pohon Hutan minimal 50 batang
  - 🏆 Ukuran Kesehatan Hutan minimal 75%
* **Tindakan Tombol IFP:**
  1. `🛡️ PATROLI HUTAN`
  2. `🌲 REBOISASI POHON (+10)`
  3. `🐅 LEPAS 5 HARIMAU`
* **Bantuan Gita (Scaffolding ZPD):**
  *"Pemburu liar membuat harimau punah! Pasang patroli hutan untuk mengamankan satwa, lalu tanam pohon baru!"*

---

### 🏞️ BIOMA 3: SUNGAI AIR TAWAR

#### Misi 5: Banjir Lumpur Hujan (Faktor Ulah Alam)
* **Tag:** `FAKTOR ALAM • TINGKAT: SEDANG`
* **Briefing Gita:**
  > *"Hujan badai lebat membawa guguran tanah tebing ke sungai! Air sungai keruh pekat oleh endapan lumpur tebal. Teratai tertimbun dan ikan kesulitan bernapas. Ayo keruk lumpur dan jernihkan sungai!"*
* **Target Misi:**
  - 🪷 Teratai Sungai minimal 40 rumpun
  - 🐟 Ikan Gabus minimal 30 ekor
  - 🪶 Burung Bangau minimal 15 ekor
  - 🏆 Ukuran Kesehatan Sungai minimal 75%
* **Tindakan Tombol IFP:**
  1. `🚜 KERUK ENDAPAN LUMPUR`
  2. `🪷 SEBAR BIBIT TERATAI`
  3. `🐟 TEBAR BENIH IKAN`
* **Bantuan Gita (Scaffolding ZPD):**
  *"Lumpur tebal menutupi teratai dan membuat air keruh! Keruk endapan lumpur agar cahaya matahari masuk ke sungai!"*

#### Misi 6: Pembuangan Limbah Pabrik (Faktor Ulah Manusia)
* **Tag:** `FAKTOR MANUSIA • TINGKAT: MENANTANG 🔒 (Buka setelah Misi 5)`
* **Briefing Gita:**
  > *"Pabrik membuang pipa limbah beracun langsung ke sungai! Air berbusa bau dan ikan-ikan mati mengambang. Burung bangau ikut sakit karena memakan ikan beracun. Cepat netralkan limbah pabrik!"*
* **Target Misi:**
  - 🧪 Netralkan seluruh racun limbah pabrik
  - 🐟 Ikan Gabus minimal 35 ekor
  - 🪶 Burung Bangau minimal 15 ekor
  - 🏆 Ukuran Kesehatan Sungai minimal 75%
* **Tindakan Tombol IFP:**
  1. `🧪 FILTER LIMBAH PABRIK`
  2. `🐟 TEBAR BENIH IKAN`
  3. `🪶 LINDUNGI BANGAU`
* **Bantuan Gita (Scaffolding ZPD):**
  *"Pipa limbah pabrik meracuni seluruh sungai! Aktifkan filter penetral racun sebelum melepas ikan baru!"*

---

### 🌊 BIOMA 4: LAUT TERUMBU KARANG

#### Misi 7: Gelombang Panas Laut (Faktor Ulah Alam)
* **Tag:** `FAKTOR ALAM • TINGKAT: SEDANG`
* **Briefing Gita:**
  > *"Suhu permukaan laut melonjak sangat panas akibat perubahan iklim! Terumbu karang mengalami pemutihan dan mulai mati. Ikan-ikan kecil kehilangan sarang perlindungan. Ayo pasang terumbu bibit karang tahan panas!"*
* **Target Misi:**
  - 🪸 Terumbu Karang minimal 50 rumpun
  - 🐠 Ikan Karang minimal 40 ekor
  - 🐢 Penyu Laut minimal 15 ekor
  - 🏆 Ukuran Kesehatan Laut minimal 75%
* **Tindakan Tombol IFP:**
  1. `🪸 TRANSPLANTASI KARANG`
  2. `🐠 LEPAS IKAN KARANG`
  3. `🐢 LINDUNGI PENYU`
* **Bantuan Gita (Scaffolding ZPD):**
  *"Karang memutih dan patah akibat air panas! Lakukan transplantasi karang bibit unggul agar ikan memiliki rumah!"*

#### Misi 8: Penangkapan Bom Ikan (Faktor Ulah Manusia)
* **Tag:** `FAKTOR MANUSIA • TINGKAT: MENANTANG 🔒 (Buka setelah Misi 7)`
* **Briefing Gita:**
  > *"Nelayan nakal meledakkan bom rakitan di terumbu karang dan membuang sampah jaring plastik! Karang hancur berkeping-keping dan penyu terjerat. Ayo bersihkan jaring dan pulihkan karang!"*
* **Target Misi:**
  - 🧹 Bersihkan sampah jaring plastik
  - 🪸 Terumbu Karang minimal 50 rumpun
  - 🦈 Hiu Karang minimal 8 ekor
  - 🏆 Ukuran Kesehatan Laut minimal 75%
* **Tindakan Tombol IFP:**
  1. `🧹 ANGKAT JARING PLASTIK`
  2. `🪸 REHABILITASI KARANG`
  3. `🦈 KONSERVASI HIU & PENYU`
* **Bantuan Gita (Scaffolding ZPD):**
  *"Ledakan bom dan jaring plastik menjebak penyu! Angkat jaring sampah terlebih dahulu, lalu rehabilitasi karang yang rusak!"*

---

## 7. BUKU CATATAN DETEKTIF: 8 KUIS PENALARAN SEBAB-AKIBAT (LEVEL C2)

Setiap kuis menguji kemampuan inferensi dan eksplanasi peserta didik terkait hukum sebab-akibat trofik, bukan sekadar hafalan definisi.

### 🌾 Kuis Sawah 1 (Faktor Alam: Kemarau Panjang)
* **Soal:** *Saat musim kemarau panjang membuat saluran air kering dan tanaman padi layu mati, mengapa ular dan elang pemangsa daging di sawah ikut terancam kelaparan?*
* **Pilihan Jawaban:**
  - A. Ular dan elang memakan butir padi secara langsung saat haus di musim kemarau.
  - **B. Padi adalah sumber energi utama; jika padi mati, tikus mangsa ular dan elang ikut musnah.** *(BENAR)*
  - C. Ular dan elang hanya bisa bertahan hidup di dalam genangan air lumpur sawah.
* **Pembahasan Edukatif:**  
  *Padi adalah produsen pembawa energi pertama di sawah. Ketika padi layu dan mati, tikus herbivora tidak punya makanan dan mati kelaparan. Ular dan elang di tingkat atas rantai makanan pun ikut kehabisan mangsa!*

### 🌾 Kuis Sawah 2 (Faktor Manusia: Racun & Perburuan)
* **Soal:** *Jika petani memburu semua ular sawah hingga punah karena takut tergigit, apa bahaya yang paling cepat terjadi pada petak sawah tersebut?*
* **Pilihan Jawaban:**
  - A. Tanaman padi tumbuh semakin lebat dan subur karena tidak terinjak oleh ular.
  - **B. Populasi tikus melonjak drastis tanpa pemangsa alami dan merusak seluruh tanaman padi.** *(BENAR)*
  - C. Burung elang akan bertelur lebih banyak untuk menggantikan tugas ular di pematang.
* **Pembahasan Edukatif:**  
  *Ular sawah bertindak sebagai pengendali alami hama tikus. Tanpa adanya ular pemangsa, jumlah tikus akan meledak tak terkendali dan memakan habis batang serta biji padi petani hingga gagal panen total!*

### 🌲 Kuis Hutan 1 (Faktor Alam: Kebakaran Kemarau)
* **Soal:** *Setelah kebakaran alami menghanguskan pohon-pohon di hutan tropis, mengapa populasi harimau loreng ikut menurun drastis padahal harimau tidak memakan dedaunan pohon?*
* **Pilihan Jawaban:**
  - A. Harimau takut pada warna abu arang sisa kebakaran di tanah hutan.
  - **B. Rusa dan kancil mati kehilangan daun pakan, sehingga harimau kehabisan hewan buruan.** *(BENAR)*
  - C. Pohon yang terbakar mengeluarkan racun yang hanya menyerang hewan karnivora.
* **Pembahasan Edukatif:**  
  *Pohon hutan adalah produsen makanan bagi rusa dan hewan pemakan tumbuhan lainnya. Saat pohon hangus, populasi rusa lenyap, sehingga harimau sebagai predator puncak ikut kehilangan sumber makanan utamanya!*

### 🌲 Kuis Hutan 2 (Faktor Manusia: Penebangan Liar & Pemburu)
* **Soal:** *Apa akibatnya bagi rantai makanan di hutan tropis jika para pemburu liar menangkap semua harimau loreng hingga habis dari hutan?*
* **Pilihan Jawaban:**
  - **A. Jumlah rusa melonjak terlalu banyak hingga memakan habis rumput dan bibit pohon muda di hutan.** *(BENAR)*
  - B. Hutan menjadi semakin lebat dan dingin karena tidak ada harimau yang berlari.
  - C. Burung-burung di atas pohon akan turun dan berubah menjadi pemangsa pemakan daging.
* **Pembahasan Edukatif:**  
  *Harimau bertindak sebagai pemangsa puncak yang membatasi jumlah populasi rusa. Jika harimau hilang, populasi rusa akan meledak tak terkontrol dan memakan habis seluruh bibit tunas pohon baru hingga hutan menjadi gundul!*

### 🏞️ Kuis Sungai 1 (Faktor Alam: Banjir Lumpur Hujan)
* **Soal:** *Mengapa endapan lumpur tebal akibat tanah longsor di sungai air tawar dapat menyebabkan ikan gabus dan bangau kesulitan bertahan hidup?*
* **Pilihan Jawaban:**
  - A. Lumpur membuat air sungai menjadi terlalu dingin untuk disentuh ikan.
  - **B. Lumpur keruh menghalangi cahaya matahari bagi teratai dan menyumbat insang pernapasan ikan.** *(BENAR)*
  - C. Ikan gabus akan melompat keluar sungai dan memilih hidup di daratan kering.
* **Pembahasan Edukatif:**  
  *Lumpur keruh menghalangi sinar matahari sehingga tanaman air seperti teratai tidak bisa berfotosintesis menghasilkan oksigen. Selain itu partikel lumpur menyumbat insang ikan, menyebabkan ikan mati dan bangau kehabisan makanan!*

### 🏞️ Kuis Sungai 2 (Faktor Manusia: Limbah Pabrik)
* **Soal:** *Pabrik membuang limbah kimia beracun ke sungai hingga plankton dan ikan-ikan kecil mati. Mengapa burung bangau pemakan ikan di tepi sungai juga ikut terancam mati?*
* **Pilihan Jawaban:**
  - **A. Racun kimia menumpuk di tubuh ikan yang tersisa dan meracuni bangau yang memakannya.** *(BENAR)*
  - B. Burung bangau meminum limbah berbusa karena mengira itu adalah susu segar.
  - C. Limbah pabrik mengubah warna bulu burung bangau menjadi hitam gelap.
* **Pembahasan Edukatif:**  
  *Racun limbah kimia terserap ke dalam tubuh ikan-ikan kecil. Ketika burung bangau memangsa banyak ikan yang terkontaminasi tersebut, racun akan menumpuk di tubuh bangau (bioakumulasi) dan menyebabkan kematian!*

### 🌊 Kuis Laut 1 (Faktor Alam: Gelombang Panas Pemutihan Karang)
* **Soal:** *Mengapa kematian terumbu karang akibat suhu air laut yang memanas ekstrem (bleaching) dapat menghancurkan seluruh kehidupan ikan di lautan?*
* **Pilihan Jawaban:**
  - A. Terumbu karang adalah es beku yang menjaga air laut tetap segar dan dingin.
  - **B. Terumbu karang adalah tempat tinggal, sarang bertelur, dan tempat berlindung ikan-ikan kecil.** *(BENAR)*
  - C. Ikan karang akan berenang ke darat untuk mencari tempat berlindung baru.
* **Pembahasan Edukatif:**  
  *Terumbu karang adalah 'istana kota' bawah laut yang menyediakan rumah, tempat bersembunyi dari pemangsa, dan tempat bertelur bagi ribuan jenis ikan laut. Saat karang mati, ekosistem laut kehilangan pondasi dasarnya!*

### 🌊 Kuis Laut 2 (Faktor Manusia: Bom Ikan & Sampah)
* **Soal:** *Nelayan menangkap ikan menggunakan ledakan bom dan meninggalkan sampah jaring di laut. Apa dampak jangka panjang bagi nelayan itu sendiri di masa depan?*
* **Pilihan Jawaban:**
  - A. Nelayan akan mendapat tangkapan ikan yang semakin melimpah setiap hari tanpa batas.
  - **B. Karang hancur membuat ikan tidak bisa berkembang biak, sehingga laut menjadi kosong dari ikan.** *(BENAR)*
  - C. Bom ikan membuat air laut menjadi lebih hangat dan mengundang ikan paus datang.
* **Pembahasan Edukatif:**  
  *Ledakan bom menghancurkan rumah karang yang membutuhkan ratusan tahun untuk tumbuh kembali. Tanpa karang tempat bertelur, ikan-ikan tidak dapat bereproduksi, menyebabkan laut kosong dan nelayan kehilangan mata pencaharian!*

---

## 8. VICTORY SCENE (SELEBRASI, BINTANG & BUKA KUNCI)

* **Top Header:** `🏆 MISI SELESAI: [NAMA TIM]!`
* **Tampilan 3 Bintang Dinamis:**
  - ⭐ **Bintang 1:** Ekosistem Sehat (HP ≥ 75%)
  - ⭐⭐ **Bintang 2:** Lulus Kuis Sebab-Akibat
  - ⭐⭐⭐ **Bintang 3:** Menjawab Benar Sekali Coba (*First Attempt*)
* **Panel Notifikasi Pembukaan (Unlock Notice):**
  - Jika Misi 1 selesai: `🔓 MISI 2 TERBUKA! Tantangan Faktor Ulah Manusia siap dimainkan!`
  - Jika Misi 2 selesai: `🎉 BIOMA [NAMA BIOMA BERIKUTNYA] TERBUKA DI PETA NUSANTARA!`
* **Tombol Navigasi:**
  - `🗺️ PETA NUSANTARA` ➔ Kembali ke pemilihan 4 bioma (`BiomeSelectScene`).
  - `📋 MENU MISI` ➔ Kembali ke pilihan misi bioma saat ini (`MissionMenuScene`).
  - `🔄 GANTI TIM` ➔ Rotasi giliran kelompok Jigsaw berikutnya (`TeamSelectScene`).

---

## 9. CATATAN TEKNOLOGI SUARA (DUAL-ENGINE AUDIO PIPELINE)
1. **Track Studio Gita (26 File .WAV):** Diprioritaskan untuk layar Judul, Tutorial, Pemilihan Tim, Misi Sawah (M1-M4 legacy), dan Selebrasi Bintang.
2. **Web Speech Synthesis Fallback:** Menggunakan bahasa vokal `id-ID` dengan konfigurasi pedagogis ramah anak (Pitch 1.1x, Rate 0.9x) yang secara otomatis aktif membacakan briefing dan petunjuk pada bioma Hutan Tropis, Sungai, dan Laut Terumbu Karang saat berkas WAV belum tersedia di memori browser.
