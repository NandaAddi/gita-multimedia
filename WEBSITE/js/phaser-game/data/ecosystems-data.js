/**
 * ECO-EXPLORER: MASTER ECOSYSTEMS & MISSIONS CONFIGURATION
 * 4 Bioma: Sawah, Hutan Tropis, Sungai, Laut
 * 8 Misi: Misi 1 (Faktor Ulah Alam) & Misi 2 (Faktor Ulah Manusia)
 * 
 * Digunakan oleh seluruh scene Phaser untuk memuat data bioma dan misi secara dinamis.
 */

window.ECOSYSTEMS_DATA = {
  sawah: {
    id: 'sawah',
    order: 1,
    name: 'Ekosistem Sawah',
    shortName: 'Sawah',
    badge: 'badge_sawah',
    bg: 'bg_sawah',
    ambientColor: 0x064e3b,
    accentColor: 0x10b981,
    desc: 'Lahan pangan padi tempat berinteraksinya petani, hama tanaman, dan predator alami.',
    missions: [
      {
        id: 'sawah_m1',
        num: 1,
        type: 'alam',
        typeLabel: 'Faktor Ulah Alam',
        typeColor: 0xd97706,
        title: 'Misi 1: Tanah Retak Kekeringan',
        headline: 'Musim Kemarau Melanda Sawah Kita!',
        speech: 'Halo Detektif! Musim kemarau panjang membuat saluran irigasi kering dan tanah retak! Segera alirkan air irigasi dan tanam tunas padi agar rantai makanan tetap hidup!',
        initPop: { padi: 15, tikus: 45, katak: 20, ular: 10, elang: 5, jamur: 15 },
        waterLevel: 20,
        waste: 20,
        pesticideClean: true,
        targets: {
          q1: { text: 'Alirkan Air Irigasi', key: 'waterLevel', min: 60, unit: '%' },
          q2: { text: 'Tunas Padi Segar', key: 'padi', min: 45, unit: ' rumpun' },
          q3: { text: 'Kesehatan Sawah', key: 'health', min: 75, unit: '%' }
        },
        actions: ['air', 'padi', 'ular'],
        quiz: {
          question: 'Saat musim kemarau panjang membuat tanah sawah retak dan tanaman padi mati mengering, mengapa burung elang dan ular sawah ikut kelaparan?',
          options: [
            { text: 'A. Elang dan ular sangat suka memakan daun padi yang hijau', correct: false },
            { text: 'B. Tikus kehilangan makanan dan mati, sehingga ular dan elang kehabisan mangsa', correct: true },
            { text: 'C. Ular dan elang takut pada tanah sawah yang retak', correct: false }
          ],
          explanation: 'Benar sekali! Padi adalah produsen utama sumber energi. Saat padi mati, tikus herbivora kelaparan dan berkurang, sehingga predator pemangsa tikus ikut kehabisan makanan!'
        }
      },
      {
        id: 'sawah_m2',
        num: 2,
        type: 'manusia',
        typeLabel: 'Faktor Ulah Manusia',
        typeColor: 0xef4444,
        title: 'Misi 2: Bahaya Racun & Jerat Petani',
        headline: 'Racun Kimia & Perburuan Ular Sawah!',
        speech: 'Detektif, petani menyemprot racun kimia dan memburu ular sawah! Akibatnya katak mati dan tikus merajalela. Yuk kembalikan katak, lepas ular, dan bersihkan tanah!',
        initPop: { padi: 20, tikus: 80, katak: 5, ular: 0, elang: 10, jamur: 25 },
        waterLevel: 80,
        waste: 25,
        pesticideClean: false,
        targets: {
          q1: { text: 'Lepas Ular Pemangsa', key: 'ular', min: 20, unit: ' ekor' },
          q2: { text: 'Kembalikan Katak Sahabat', key: 'katak', min: 25, unit: ' ekor' },
          q3: { text: 'Bersihkan Residu Racun', key: 'pesticideClean', target: true, unit: '' }
        },
        actions: ['ular', 'katak', 'bersih_racun'],
        quiz: {
          question: 'Jika petani memburu semua ular sawah hingga habis karena takut dipatuk, apa bahaya besar yang akan menimpa hasil panen padi petani?',
          options: [
            { text: 'A. Hama tikus melonjak sangat banyak dan memakan habis bulir padi', correct: true },
            { text: 'B. Padi akan tumbuh semakin lebat dan subur', correct: false },
            { text: 'C. Burung elang akan membantu menanam tunas padi baru', correct: false }
          ],
          explanation: 'Tepat sekali! Ular sawah adalah predator alami pengendali hama tikus. Tanpa ular, populasi tikus meledak dan menghabiskan padi petani!'
        }
      }
    ]
  },
  hutan: {
    id: 'hutan',
    order: 2,
    name: 'Ekosistem Hutan Tropis',
    shortName: 'Hutan Tropis',
    badge: 'badge_hutan',
    bg: 'bg_hutan',
    ambientColor: 0x14532d,
    accentColor: 0x16a34a,
    desc: 'Rimba hujan tropis Nusantara rumah bagi Harimau Sumatera, rusa, dan pohon raksasa.',
    missions: [
      {
        id: 'hutan_m1',
        num: 1,
        type: 'alam',
        typeLabel: 'Faktor Ulah Alam',
        typeColor: 0xd97706,
        title: 'Misi 3: Kemarau & Pohon Kering',
        headline: 'Panas Terik Membakar Dedaunan Rimba!',
        speech: 'Waspada Detektif! Hutan tropis dilanda kemarau ekstrem hingga mata air kering dan rumput hangus. Segera alirkan air mata air rimba dan tanam tunas pohon!',
        initPop: { pohon: 20, rusa: 15, harimau: 8, jamur: 10 },
        waterLevel: 25,
        targets: {
          q1: { text: 'Alirkan Mata Air Rimba', key: 'waterLevel', min: 60, unit: '%' },
          q2: { text: 'Reboisasi Tunas Rimba', key: 'pohon', min: 45, unit: ' pohon' },
          q3: { text: 'Keseimbangan Hutan', key: 'health', min: 75, unit: '%' }
        },
        actions: ['air_rimba', 'tanam_pohon', 'urai_abu'],
        quiz: {
          question: 'Mengapa kemarau panjang yang mengeringkan tumbuhan rimba bisa memicu kawanan harimau turun ke pemukiman warga?',
          options: [
            { text: 'A. Harimau ingin mencari tempat berteduh di rumah warga', correct: false },
            { text: 'B. Tumbuhan mati membuat rusa kelaparan dan berkurang, sehingga harimau mencari mangsa di luar hutan', correct: true },
            { text: 'C. Harimau sangat suka meminum air sumur warga desa', correct: false }
          ],
          explanation: 'Tepat! Rantai makanan rimba saling terhubung. Saat produsen (pohon/rumput) layu, mangsa harimau (rusa) berkurang drastis sehingga predator puncak kelaparan!'
        }
      },
      {
        id: 'hutan_m2',
        num: 2,
        type: 'manusia',
        typeLabel: 'Faktor Ulah Manusia',
        typeColor: 0xef4444,
        title: 'Misi 4: Penebangan Liar & Jerat Pemburu',
        headline: 'Pembalakan Hutan & Jerat Liar!',
        speech: 'Gawat! Penebang liar membabat pohon rimba dan pemburu memasang jerat harimau! Singkirkan jerat pemburu, rawat harimau, dan tanam kembali pohon rimba!',
        initPop: { pohon: 15, rusa: 35, harimau: 2, jamur: 20 },
        waterLevel: 80,
        targets: {
          q1: { text: 'Selamatkan Harimau Sumatera', key: 'harimau', min: 10, unit: ' ekor' },
          q2: { text: 'Tanam Pohon Rimba Baru', key: 'pohon', min: 50, unit: ' pohon' },
          q3: { text: 'Singkirkan Jerat Liar', key: 'trapsClean', target: true, unit: '' }
        },
        actions: ['rawat_harimau', 'tanam_pohon', 'sita_jerat'],
        quiz: {
          question: 'Apa dampak buruk yang terjadi jika pohon-pohon rimba ditebang liar terus-menerus oleh oknum perusak hutan?',
          options: [
            { text: 'A. Kawanan rusa kehilangan rumah dan makanan, serta tanah rimba longsor terkikis erosi', correct: true },
            { text: 'B. Hutan akan menjadi lebih terang dan semakin banyak buah manis', correct: false },
            { text: 'C. Harimau akan belajar memakan dedaunan kering', correct: false }
          ],
          explanation: 'Sangat tepat! Pohon rimba adalah habitat, sumber oksigen, dan makanan hewan herbivora. Penebangan liar meruntuhkan fondasi seluruh ekosistem hutan!'
        }
      }
    ]
  },
  sungai: {
    id: 'sungai',
    order: 3,
    name: 'Ekosistem Sungai Air Tawar',
    shortName: 'Sungai',
    badge: 'badge_danau',
    bg: 'bg_danau',
    ambientColor: 0x164e63,
    accentColor: 0x0891b2,
    desc: 'Perairan sungai air tawar tempat hidup ikan gabus, teratai, keong, dan burung bangau.',
    missions: [
      {
        id: 'sungai_m1',
        num: 1,
        type: 'alam',
        typeLabel: 'Faktor Ulah Alam',
        typeColor: 0xd97706,
        title: 'Misi 5: Air Surut & Gulma Menutup',
        headline: 'Sungai Surut & Ledakan Gulma Alami!',
        speech: 'Halo Detektif! Aliran sungai surut dan eceng gondok tumbuh terlalu lebat menutupi permukaan air sehingga ikan lemas! Yuk buka pintu hulu dan angkat gulma liar!',
        initPop: { teratai: 10, gulma: 70, ikan: 20, bangau: 8 },
        waterLevel: 30,
        targets: {
          q1: { text: 'Alirkan Air Hulu Sungai', key: 'waterLevel', min: 65, unit: '%' },
          q2: { text: 'Bersihkan Tumpukan Gulma', key: 'gulma', max: 25, unit: ' rumpun' },
          q3: { text: 'Ikan Tawar Bernapas Segar', key: 'ikan', min: 45, unit: ' ekor' }
        },
        actions: ['buka_hulu', 'bersih_gulma', 'tanam_teratai'],
        quiz: {
          question: 'Mengapa permukaan air sungai yang tertutup rapat oleh tumbuhan eceng gondok dapat menyebabkan ikan-ikan di dalam air mati lemas?',
          options: [
            { text: 'A. Eceng gondok meneteskan racun berbahaya ke mata ikan', correct: false },
            { text: 'B. Sinar matahari dan udara tidak bisa masuk, sehingga air kekurangan oksigen untuk napas ikan', correct: true },
            { text: 'C. Ikan menjadi terlalu kenyang memakan akar eceng gondok', correct: false }
          ],
          explanation: 'Benar sekali! Tumbuhan air yang menutup rapat menghalangi difusi oksigen dan fotosintesis bawah air, menyebabkan penurunan kadar oksigen terlarut!'
        }
      },
      {
        id: 'sungai_m2',
        num: 2,
        type: 'manusia',
        typeLabel: 'Faktor Ulah Manusia',
        typeColor: 0xef4444,
        title: 'Misi 6: Racun Limbah & Sampah Plastik',
        headline: 'Limbah Pabrik Mencemari Aliran Sungai!',
        speech: 'Perhatian! Limbah detergen cair pabrik dan sampah plastik mencemari sungai kita! Ikan kecil mati dan bangau teracuni. Ayo pasang penyaring air dan angkut sampah!',
        initPop: { teratai: 15, ikan: 10, bangau: 4, limbah: 60 },
        waterLevel: 80,
        targets: {
          q1: { text: 'Saring Limbah Kimia Pabrik', key: 'limbah', max: 15, unit: '%' },
          q2: { text: 'Tebar Benih Ikan Tawar', key: 'ikan', min: 40, unit: ' ekor' },
          q3: { text: 'Lindungi Burung Bangau', key: 'bangau', min: 12, unit: ' ekor' }
        },
        actions: ['saring_limbah', 'tebar_ikan', 'angkat_sampah'],
        quiz: {
          question: 'Bagaimana racun limbah detergen pabrik yang mencemari air sungai dapat menyebabkan burung bangau pemangsa ikut jatuh sakit dan mati?',
          options: [
            { text: 'A. Racun diserap ikan kecil, lalu ikan beracun tersebut dimakan oleh bangau (bioakumulasi)', correct: true },
            { text: 'B. Burung bangau mandi di sungai menggunakan sabun detergen', correct: false },
            { text: 'C. Bangau menelan plastik karena mengira plastik adalah ikan', correct: false }
          ],
          explanation: 'Hebat! Inilah prinsip aliran rantai makanan. Racun di air terserap oleh produsen dan ikan kecil, kemudian menumpuk di tubuh burung pemangsanya!'
        }
      }
    ]
  },
  laut: {
    id: 'laut',
    order: 4,
    name: 'Ekosistem Laut Terumbu Karang',
    shortName: 'Laut',
    badge: 'badge_laut',
    bg: 'bg_laut',
    ambientColor: 0x082f49,
    accentColor: 0x0284c7,
    desc: 'Samudra tropis Nusantara dengan hamparan terumbu karang warna-warni, penyu, dan ikan badut.',
    missions: [
      {
        id: 'laut_m1',
        num: 1,
        type: 'alam',
        typeLabel: 'Faktor Ulah Alam',
        typeColor: 0xd97706,
        title: 'Misi 7: Air Laut Panas & Karang Memutih',
        headline: 'Gelombang Panas Samudra & Coral Bleaching!',
        speech: 'Halo Detektif! Suhu air laut memanas alami hingga karang memutih dan rapuh! Akibatnya ikan karang kehilangan tempat berlindung. Yuk rehabilitasi karang laut!',
        initPop: { karang: 15, ikan: 25, penyu: 6, hiu: 3, pengurai: 10 },
        targets: {
          q1: { text: 'Tanam Bibit Karang Sehat', key: 'karang', min: 45, unit: ' koloni' },
          q2: { text: 'Pulihkan Kawanan Ikan Karang', key: 'ikan', min: 50, unit: ' ekor' },
          q3: { text: 'Keseimbangan Samudra', key: 'health', min: 75, unit: '%' }
        },
        actions: ['tanam_karang', 'bantu_pengurai', 'sebar_zooplankton'],
        quiz: {
          question: 'Mengapa saat terumbu karang memutih dan rusak, ikan hiu sebagai predator puncak samudra ikut kesulitan mendapatkan makanan?',
          options: [
            { text: 'A. Hiu memakan batu karang sebagai makanan pokoknya', correct: false },
            { text: 'B. Karang adalah rumah dan tempat mencari makan ikan-ikan kecil yang menjadi mangsa hiu', correct: true },
            { text: 'C. Suhu panas membuat gigi ikan hiu patah', correct: false }
          ],
          explanation: 'Tepat sekali! Terumbu karang adalah pusat kehidupan laut. Tanpa karang yang sehat, ikan-ikan kecil pergi atau mati, memutus rantai makanan hiu!'
        }
      },
      {
        id: 'laut_m2',
        num: 2,
        type: 'manusia',
        typeLabel: 'Faktor Ulah Manusia',
        typeColor: 0xef4444,
        title: 'Misi 8: Ledakan Bom Ikan & Sampah Laut',
        headline: 'Pengeboman Karang & Jeratan Plastik!',
        speech: 'Detektif, nelayan ilegal memakai bom ikan yang menghancurkan karang dan sampah plastik menjerat penyu! Sita bahan peledak, bersihkan plastik, dan rawat penyu!',
        initPop: { karang: 10, ikan: 15, penyu: 2, hiu: 2, sampah: 65 },
        targets: {
          q1: { text: 'Selamatkan Penyu Laut', key: 'penyu', min: 8, unit: ' ekor' },
          q2: { text: 'Rehabilitasi Terumbu Karang', key: 'karang', min: 50, unit: ' koloni' },
          q3: { text: 'Bersihkan Sampah Plastik', key: 'sampah', max: 15, unit: '%' }
        },
        actions: ['sita_bom', 'bersih_plastik', 'rawat_penyu'],
        quiz: {
          question: 'Mengapa menangkap ikan menggunakan bahan peledak bom laut dilarang keras oleh hukum dan merugikan masa depan anak cucu nelayan?',
          options: [
            { text: 'A. Bom laut menghancurkan terumbu karang yang butuh puluhan tahun untuk tumbuh kembali', correct: true },
            { text: 'B. Suara ledakan bom membuat air laut menjadi terlalu asin', correct: false },
            { text: 'C. Ikan hasil bom laut tidak bisa dimasak dengan minyak goreng', correct: false }
          ],
          explanation: 'Luar biasa! Satu ledakan bom dapat memusnahkan terumbu karang yang membutuhkan waktu puluhan hingga ratusan tahun untuk tumbuh, memusnahkan habitat ikan selamanya!'
        }
      }
    ]
  }
};
