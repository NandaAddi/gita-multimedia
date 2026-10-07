# Spesifikasi Desain: Perombakan Visual & Dinamika Realistis Bioma Sawah (Terasering Nusantara)

**Tanggal:** 2026-10-07  
**Peneliti / Pengembang:** Gito (Teknologi Pendidikan)  
**Konteks Pembelajaran:** Ekosistem Sawah Kelas V SDN Percobaan 2 Malang (Layar IFP 65–86 Inch)  
**Dokumen Induk:** `docs/PRD_GAME_SKRIPSI.md`, `docs/LKPD_DETEKTIF_SAWAH.md`

---

## 1. Latar Belakang & Identifikasi Masalah Visual

Berdasarkan evaluasi antarmuka dan visualisasi pada Bioma Sawah saat ini:
1. **Bentuk Bidang Kaku & Artifisial:** Petak sawah saat ini berupa poligon trapesium bersudut tajam datar (`[0,1080] ke [380,420] ke [1560,420] ke [1920,1080]`) dengan tiga garis pematang mendatar kaku, menyerupai papan meja ketimbang sawah terasering alami.
2. **Kesan Gersang & Kosong pada Hari 1:** Padi hanya dirender sejumlah `Math.round(S.prod / 6)` rumpun sederhana (hanya 5 rumpun tipis untuk lebar 1680px), menyisakan ruang lumpur cokelat kosong yang dominan dan tidak menarik minat siswa.
3. **Representasi Retakan Tanah Tidak Realistis:** Efek kemarau (`S.water < 32`) saat ini dirender sebagai 11 titik dahan/ranting bercabang kaku yang melayang (*spider legs / dead twigs*), alih-alih pola lempeng rekahan tanah liat sawah yang mengering (*mud desiccation crack network*).
4. **Kurangnya Dinamika Angin ("Padi Menari"):** Ayunan padi saat ini hanya goyangan 2 pixel statis per rumpun (`Math.sin(t / 600 + ent.seed) * 2`), tanpa efek gelombang hembusan angin sawah yang menjalar melintasi terasering (*undulating wind wave*).
5. **Ketiadaan Umpan Balik Kausalitas Konkret (Mayer CTML & Piaget):** Ketika aksi "Alirkan Air Irigasi" ditekan, tidak ada animasi visual konkret air segar mengalir dari parit/tulakan ke petak sawah; serta saat hama wereng melonjak, tidak ada efek visual bercak daun menguning/terbakar (*hopperburn*).

---

## 2. Sasaran Desain & Landasan Pedagogis

Sesuai hasil diskusi interaktif **/grill-me**, desain perombakan visual sawah menetapkan 5 pilar utama:
1. **Lanskap Terasering Lereng Tropis Nusantara:** Menghadirkan atmosfer pedesaan lereng pegunungan Malang/Batu dengan siluet perbukitan berlapis berkabut atmosferik dan petak sawah bertingkat (3 teras berundak).
2. **Hamparan Padi Lebat yang "Menari" Anggun:** Menerapkan algoritma hembusan angin menjalar (*sweeping wind wave*) yang membuat rumpun padi meliuk selaras; barisan rumpun jajar legowo yang tampak hidup sejak hari pertama, bertransformasi tinggi dan keemasan seiring pertumbuhan `prod`.
3. **Jaringan Rekahan Tanah Poligonal 3D & Cermin Air:** Mengganti ranting kaku dengan rekahan poligonal tanah liat berkedalaman bayangan saat kemarau (`S.water < 32`); serta cermin pantulan langit dan genangan air basah berkilau saat air cukup (`S.water >= 32`).
4. **Parit Irigasi Batu & Pintu Air Kayu (*Tulakan*):** Saluran air batu alami di batas pematang yang menyalurkan aliran air ke petak terasering.
5. **Umpan Balik Visual Kausalitas Konkret (Piaget Operasional Konkret & Mayer Signaling):** Efek aliran air berbusa segar aktif dari pintu air saat kartu "Alirkan Air Irigasi" digunakan, serta bercak daun menguning terbakar (*hopperburn*) pada rumpun padi saat krisis hama wereng melanda.

---

## 3. Spesifikasi Arsitektur & Komponen Teknis

### 3.1. Layer Background & Lanskap (`js/renderers/backgrounds.js` - `sceneSawah`)
* **Layer Pegunungan Berlapis:**
  * Lapisan gunung jauh (*distant ridge*): warna toska kebiruan lembut (`#628a7b` / `#749b8a`), ketinggian $y \approx 180 - 360$, diberi kabut atmosferik lembut.
  * Lapisan bukit tengah (*mid terrace hills*): kontur hijau lereng pegunungan (`#5c8c56`), siluet pepohonan kelapa dan bambu pedesaan.
  * Integrasi penuh dengan sistem siang-malam `drawDynamicSky`.
* **Layer Terasering Berundak (3 Tiers):**
  * **Tingkat 1 (Atas/Jauh):** $y = 420 - 580$ px.
  * **Tingkat 2 (Tengah):** $y = 580 - 780$ px.
  * **Tingkat 3 (Bawah/Depan):** $y = 780 - 1080$ px.
  * Setiap tingkatan memiliki kurva kontur pematang organik (Bezier curves) dengan ketebalan dan kedalaman perspektif yang presisi.

### 3.2. Layer Tanah, Pematang, & Air (`js/renderers/characters.js` - `texSoilSawah`)
* **Pematang Terasering (Galengan 3D):**
  * Pematang tanah liat padat bergradasi bayangan bawah, rumput galengan merayap di atas, dan bebatuan kali penguat pematang.
  * Di sisi kiri/atas pematang: parit irigasi batu kali dengan pintu air kayu (*tulakan*).
* **Sistem Retakan Tanah Kemarau Poligonal (Drought Mud Fissures, `S.water < 32`):**
  * Pola rekahan lempeng tanah poligonal organik (desiccation polygonal cells) yang saling tersambung dengan garis rekahan berbayang dalam.
  * Butiran tanah kering dan serak jerami cokelat di sela rekahan.
  * Menghapus total representasi 11 titik cabang kaku (*spider legs*).
* **Sistem Cermin Refleksi Air Sawah (`S.water >= 32`):**
  * Refleksi gradasi langit cerah/senja pada genangan air sawah.
  * Kilau specular (*water sheen*) dan riak air sinusoidal lembut.
  * Respon krisis pencemaran: jika `S.poison > 20`, air berubah menjadi keruh kehijauan berminyak dengan lapisan buih kusam.

### 3.3. Layer Vegetasi Padi & Animasi "Menari" (`spRice` & `sceneSawah`)
* **Struktur Rumpun Padi Lebat (`spRice`):**
  * Rumpun memiliki 7–9 helai daun lentur menjuntai melengkung alami ke kiri dan kanan (*arching flexible leaves*).
  * Batang bawah lebat (*tiller bundle*) dengan mahkota malai bulir padi yang mulai menunduk saat fase berbulir (`S.prod > 45`).
  * Gradasi warna dinamis:
    * Fase Muda / Normal: Hijau pupus segar (`#63c06a` ke `#3f9a4e`).
    * Fase Panen Subur (`S.prod > 50`): Bulir menguning keemasan (`#d8ba3e` / `#e5ca55`).
    * Fase Layu Kekeringan (`S.water < 30`): Menguning kecokelatan kering (`#8c7438`).
    * Fase Serangan Wereng (*Hopperburn*, `S.wereng > 20`): Bercak daun kering kecokelatan hangus pada rumpun terdampak.
* **Mekanisme Gelombang Angin Menjalar (*Undulating Wind Wave*):**
  * Menggunakan gelombang sinusoidal majemuk:  
    `sway = Math.sin(t * 0.0022 - x * 0.0035 + ri * 0.8) * 12 + Math.cos(t * 0.004 + x * 0.007) * 4;`
  * Menghasilkan efek ombak hijau yang menyapu hamparan sawah dari satu sisi ke sisi lain secara anggun dan menawan ("menari").
* **Kepadatan Barisan Jajar Legowo:**
  * Penataan rumpun padi berbasis barisan terasering berperspektif, sehingga sejak Hari 1 sawah tetap memiliki pola barisan bibir padi yang teratur dan hidup, tidak tampak seperti lahan kosong tandus.

### 3.4. Respon Kausalitas Interaktif (Aksi Irigasi & Pintu Air)
* **Animasi Aliran Air Irigasi Aktif:**
  * State sementara `S._irrigationFlowTimer` yang dipicu saat aksi "Alirkan Air Irigasi" dimainkan.
  * Selama 2–3 detik, parit dan pintu air kayu (*tulakan*) menyemburkan aliran air jernih berbusa putih lembut yang mengalir deras menuruni terasering sawah menuju petak-petak bawah, memberikan kepuasan visual langsung bagi siswa.

---

## 4. Rencana Pengujian & Verifikasi

1. **Skrip Tes Otomatis (`tests/verify_sawah_realism.js`):**
   - Memvalidasi pemanggilan `sceneSawah(c, t, S)` dan `texSoilSawah(c, t, S)` di berbagai kondisi state ekstrem tanpa melempar runtime exception:
     - Kondisi 1: Hari 1 Kemarau (`water: 14, prod: 30, wereng: 0`) -> memverifikasi pemanggilan rekahan poligonal tanah tanpa garis laba-laba.
     - Kondisi 2: Penuh Air & Subur (`water: 80, prod: 65, wereng: 0`) -> memverifikasi cermin refleksi air dan bulir padi emas berayun.
     - Kondisi 3: Krisis Wereng (*Hopperburn*, `wereng: 75, water: 60, prod: 35`) -> memverifikasi bercak layu/hopperburn.
     - Kondisi 4: Aliran Irigasi Aktif (`_irrigationFlowTimer > 0`) -> memverifikasi aliran air pintu air.
2. **Verifikasi Visual Browser:**
   - Membuka game pada browser subagent / preview untuk memastikan 60 FPS, kelancaran gelombang angin, dan estetika visual kelas dunia.
3. **Audit Dokumen Skripsi:**
   - Memperbarui `PRD_GAME_SKRIPSI.md`, `ROADMAP.md`, dan `LKPD_DETEKTIF_SAWAH.md`.
