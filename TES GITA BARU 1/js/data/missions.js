/* ============================================================
   ECO-EXPLORER — js/data/missions.js
   Data 4 Kelompok Detektif, 16 Misi Kausalitas (4 Bioma × 4 Misi),
   Peristiwa Acak, & Bridging Dialog Panduan Gita
   ============================================================ */

/* ================= DATA: 4 KELOMPOK DETEKTIF EKOSISTEM ================= */
const TEAMS = [
  {
    id: 'sawah',
    name: 'Detektif Sawah',
    mascot: 'padiBig',
    motto: 'Menjaga rantai makanan padi dan keseimbangan sawah!',
    role: 'Penyelidik Ekosistem Sawah',
    dossier: 'Ekosistem sawah adalah lahan basah penghasil pangan pokok. Hubungan padi sebagai produsen dengan tikus, wereng, katak, dan ular sawah sangat menentukan hasil panen dan kelestarian alam Nusantara.',
    spec: 'sawah-1',
    perk: { ids: ['padi', 'air', 'ular', 'katak', 'jamur', 'bersih', 'mimba', 'kompos', 'sita', 'burung'], label: 'aksi sawah lestari' }
  },
  {
    id: 'hutan',
    name: 'Detektif Hutan',
    mascot: 'harimau',
    motto: 'Melindungi paru-paru rimba dan satwa langka Nusantara!',
    role: 'Penyelidik Hutan Tropis',
    dossier: 'Hutan hujan tropis adalah benteng oksigen dan penyerap karbon dunia. Pohon raksasa menyimpan cadangan mata air, sementara Harimau Sumatera menjaga populasi rusa agar hutan tetap rindang dan lestari.',
    spec: 'hutan-1',
    perk: { ids: ['pohon', 'air', 'serasah', 'harimau', 'jerat', 'padam', 'sekat', 'satwa', 'patroli', 'reboisasi', 'edukasi'], label: 'aksi rimba lestari' }
  },
  {
    id: 'sungai',
    name: 'Detektif Sungai',
    mascot: 'bangau',
    motto: 'Mengalirkan air bersih untuk kehidupan semua makhluk!',
    role: 'Penyelidik Air Tawar & Sungai',
    dossier: 'Sungai mengalirkan air tawar dan nutrisi dari hulu pegunungan hingga muara. Oksigen terlarut, tanaman air, ikan kecil, dan bangau menjadi penanda utama apakah aliran air kita sehat atau tercemar.',
    spec: 'sungai-1',
    perk: { ids: ['pintu', 'gulma', 'tanam', 'saring', 'sampah', 'benih', 'keruk', 'vetiver', 'jernih', 'setrum', 'tawar', 'bibit'], label: 'aksi sungai bersih' }
  },
  {
    id: 'laut',
    name: 'Detektif Laut',
    mascot: 'penyu',
    motto: 'Menjaga terumbu karang dan keanekaragaman samudra biru!',
    role: 'Penyelidik Terumbu Karang & Samudra',
    dossier: 'Laut Indonesia memiliki keanekaragaman karang terkaya di dunia (Segitiga Karang). Terumbu karang adalah rumah bagi ribuan biota laut; menjaga terumbu dari pemanasan dan bom ikan adalah penyelamat masa depan samudra.',
    spec: 'laut-1',
    perk: { ids: ['naungan', 'karang', 'ikan', 'struktur', 'bersih_pasir', 'penyu', 'sita_bom', 'bibit_karang', 'ikan_hias', 'kutip_plastik', 'sita_trawl', 'rawat_penyu'], label: 'aksi samudra biru' }
  }
];

/* Helper kontrol rasio herbivora vs produsen */
const hCtrl = (S, r, d) => {
  r = r || 0.3;
  d = d || 16;
  return c01(1 - Math.max(0, (S.herb || 0) - (S.prod || 0) * r) / d);
};

/* ================= DATA: 16 MISI KAUSALITAS (4 BIOMA × 4 MISI) ================= */
const MISSIONS = [
  /* -------------------- 🌾 SAWAH (4 MISI) -------------------- */
  {
    id: 'sawah-1',
    biome: 'sawah',
    type: 'alam',
    par: 40,
    title: 'Misi 1: Tanah Retak Kekeringan',
    headline: 'Musim kemarau membuat saluran irigasi kering dan padi layu!',
    task: 'Alirkan air irigasi, tanam tunas padi, dan urai jerami!',
    story: 'Detektif! Musim kemarau panjang membuat saluran irigasi kering. Tanah sawah retak-retak dan padi mulai layu. Jika padi mati, semua penghuni sawah akan kelaparan. Cepat, kita tolong sawah ini!',
    init: { prod: 30, herb: 15, pred: 7, water: 14 },
    tick(S) {
      S.water = cl(S.water - 2.4, 0, 100);
      const g = S.water > 55 ? 3.2 : S.water > 30 ? 0.8 : -3.4;
      S.prod = cl(S.prod + g - S.herb * 0.28);
      S.herb = cl(S.herb + (S.prod > 22 ? 1.5 : -2.2) - S.pred * 0.85);
      S.pred = cl(S.pred + (S.herb > 9 ? 0.35 : -0.45));
    },
    health(S) {
      return Math.round(100 * (0.3 * c01(S.prod / 60) + 0.3 * c01(S.water / 70) + 0.2 * c01(S.pred / 8) + 0.2 * hCtrl(S)));
    },
    actions: [
      { id: 'air', label: 'Alirkan Air Irigasi', role: 'Air adalah kebutuhan hidup padi', ic: 'drop', quota: 6, fx: S => S.water = cl(S.water + 30, 0, 100) },
      { id: 'padi', label: 'Tanam Tunas Padi', role: 'Padi: produsen sumber energi', ic: 'sprout', quota: 8, fx: S => S.prod = cl(S.prod + 12) },
      { id: 'jamur', label: 'Urai Sisa Jerami', role: 'Jamur: pengurai jadi pupuk alami (+7 Padi)', ic: 'mushroom', quota: 5, fx: S => S.prod = cl(S.prod + 7) }
    ],
    stats: [
      ['water', 'Air Sawah', 'drop', 1, 'Padi butuh air untuk berfotosintesis. Tanpa air, padi layu dan tanah retak.'],
      ['prod', 'Padi', 'sprout', 1, 'Padi adalah produsen: sumber energi bagi seluruh penghuni sawah.'],
      ['herb', 'Tikus', 'paw', -1, 'Tikus memakan bulir padi. Jumlahnya harus terkendali oleh pemangsa.'],
      ['pred', 'Pemangsa', 'snake', 1, 'Ular dan katak memangsa tikus dan wereng — sahabat petani!']
    ],
    targets: [
      { l: 'Air Sawah mencapai 60', c: S => S.water >= 60 },
      { l: 'Padi tumbuh subur (55)', c: S => S.prod >= 55 },
      { l: 'Kesehatan sawah 75%', c: S => S.health >= 75 }
    ],
    tips: [
      'Lihat jumlah Air Sawah! Padi butuh air untuk membuat makanannya sendiri.',
      'Tikus memakan padi. Siapa pemangsa alami tikus di sawah?',
      'Jamur mengurai sisa jerami menjadi pupuk alami penyubur padi.'
    ],
    quiz: {
      q: 'Musim kemarau membuat padi kering. Mengapa elang dan ular ikut lapar?',
      opts: [
        'Elang dan ular pindah ke kota karena takut kepanasan.',
        'Tikus kehilangan makanan dan berkurang, sehingga mangsa pemangsa ikut habis.',
        'Padi yang kering berubah menjadi beracun bagi ular.'
      ],
      correct: 1,
      explain: 'Padi adalah produsen utama sumber energi di sawah. Jika padi mati akibat kekeringan, tikus sebagai makanan ular dan elang ikut berkurang, sehingga pemangsa menjadi kelaparan.'
    },
    chain: ['Kemarau panjang', 'Air irigasi kering', 'Padi layu & mati', 'Pemangsa kehilangan mangsa']
  },

  {
    id: 'sawah-2',
    biome: 'sawah',
    type: 'alam',
    par: 42,
    title: 'Misi 2: Serangan Hama Wereng Batang Cokelat',
    headline: 'Cuaca lembap ekstrem memicu lonjakan wereng penghisap cairan padi!',
    task: 'Lepas katak pemangsa, semprot ekstrak mimba, sulami rumpun padi!',
    story: 'Detektif! Cuaca lembap berkepanjangan membuat jutaan wereng cokelat berkembang biak cepat. Batang padi dihisap hingga layu dan mengering (hopperburn). Seimbangkan kembali dengan musuh alami!',
    init: { prod: 35, wereng: 62, pred: 3, water: 60 },
    tick(S) {
      S.wereng = cl(S.wereng + 1.5 - S.pred * 0.65, 0, 100);
      S.prod = cl(S.prod - S.wereng * 0.16 + (S.wereng < 20 ? 1.2 : -0.6));
      S.pred = cl(S.pred + (S.wereng > 15 ? 0.3 : -0.35));
    },
    health(S) {
      return Math.round(100 * (0.36 * c01(S.prod / 55) + 0.36 * c01(1 - S.wereng / 70) + 0.28 * c01(S.pred / 6)));
    },
    actions: [
      { id: 'katak', label: 'Lepas Katak & Laba-Laba', role: 'Predator musuh alami wereng', ic: 'frog', quota: 4, fx: S => { S.pred = cl(S.pred + 3); S.wereng = cl(S.wereng - 22, 0, 100); } },
      { id: 'mimba', label: 'Semprot Pestisida Mimba', role: 'Ekstrak nabati ramah lingkungan', ic: 'bottle', quota: 3, fx: S => S.wereng = cl(S.wereng - 26, 0, 100) },
      { id: 'padi', label: 'Sulami Rumpun Padi', role: 'Ganti rumpun padi yang layu', ic: 'sprout', quota: 6, fx: S => S.prod = cl(S.prod + 12) }
    ],
    stats: [
      ['wereng', 'Hama Wereng', 'paw', -1, 'Wereng menghisap cairan batang padi hingga menguning dan mati.'],
      ['prod', 'Padi Subur', 'sprout', 1, 'Padi adalah produsen utama sumber pangan dan energi sawah.'],
      ['pred', 'Katak & Pemangsa', 'frog', 1, 'Katak sawah dan laba-laba adalah musuh alami pemburu wereng.'],
      ['water', 'Air Sawah', 'drop', 1, 'Air sawah yang mengalir membantu ketahanan tanaman padi.']
    ],
    targets: [
      { l: 'Wereng turun sampai 20', c: S => S.wereng <= 20 },
      { l: 'Padi kembali subur (50)', c: S => S.prod >= 50 },
      { l: 'Kesehatan sawah 75%', c: S => S.health >= 75 }
    ],
    tips: [
      'Wereng menghisap batang padi! Lepas katak dan laba-laba untuk memangsanya.',
      'Ekstrak daun mimba mengusir wereng tanpa meninggalkan racun kimia di tanah.',
      'Sulami rumpun padi agar petak sawah kembali hijau dan panen terselamatkan.'
    ],
    quiz: {
      q: 'Mengapa membasmi wereng dengan predator alami (katak) lebih baik daripada racun kimia keras?',
      opts: [
        'Katak memangsa wereng secara alami tanpa merusak tanah dan air sawah.',
        'Katak membuat bulir beras berubah menjadi warna keemasan.',
        'Racun kimia membuat wereng berkembang biak lebih cepat di sawah.'
      ],
      correct: 0,
      explain: 'Predator alami seperti katak memangsa wereng secara hayati tanpa meninggalkan residu beracun yang dapat mematikan cacing penyubur tanah dan mencemari air.'
    },
    chain: ['Cuaca lembap ekstrem', 'Wereng melonjak banyak', 'Batang padi mengering', 'Katak menyeimbangkan sawah']
  },

  {
    id: 'sawah-3',
    biome: 'sawah',
    type: 'manusia',
    par: 40,
    title: 'Misi 3: Bahaya Racun Kimia & Pestisida',
    headline: 'Racun kimia disemprot berlebihan hingga mencemari tanah dan membunuh katak!',
    task: 'Bilas saluran sawah, kembalikan katak, tebar pupuk kompos!',
    story: 'Detektif, ini buruk! Petani menyemprot racun kimia terlalu banyak untuk membasmi hama. Akibatnya, cacing tanah mati, air beracun, dan katak sawah ikut keracunan. Netralkan sawah ini!',
    init: { prod: 45, herb: 28, pred: 2, water: 70, poison: 62 },
    tick(S) {
      S.prod = cl(S.prod - S.herb * 0.3 - 0.3);
      S.herb = cl(S.herb + 2.2 - S.pred * 0.9 - (S.prod < 14 ? 2 : 0));
      S.pred = cl(S.pred + (S.herb > 12 ? 0.4 : -0.55) - (S.poison > 12 ? S.poison * 0.02 : 0));
      S.water = cl(S.water - 0.4, 0, 100);
      if (S.poison < 20) S.prod = cl(S.prod + 1.2);
    },
    health(S) {
      return Math.round(100 * (0.3 * c01(S.prod / 60) + 0.28 * c01(1 - S.poison / 65) + 0.22 * c01(S.pred / 8) + 0.2 * hCtrl(S)));
    },
    actions: [
      { id: 'bersih', label: 'Bilas Residu Racun', role: 'Alirkan air segar buang racun', ic: 'bottle', quota: 3, fx: S => S.poison = cl(S.poison - 35, 0, 100) },
      { id: 'katak', label: 'Kembalikan Katak Sawah', role: 'Katak pemakan serangga sawah', ic: 'frog', quota: 3, fx: S => { S.pred = cl(S.pred + 3); S.poison = cl(S.poison - 6, 0, 100); } },
      { id: 'kompos', label: 'Tebar Pupuk Kompos', role: 'Pulihkan kesuburan tanah alami', ic: 'sprout', quota: 4, fx: S => S.prod = cl(S.prod + 10) }
    ],
    stats: [
      ['poison', 'Racun Kimia', 'bottle', -1, 'Pestisida membunuh katak dan mencemari biota air. Bilas lebih dulu!'],
      ['prod', 'Padi Subur', 'sprout', 1, 'Padi adalah produsen utama sumber energi di ekosistem sawah.'],
      ['herb', 'Hama Tikus', 'paw', -1, 'Tanpa musuh alami, jumlah hama meledak tak terkendali.'],
      ['pred', 'Pemangsa Alami', 'frog', 1, 'Katak dan pemangsa lain adalah penjaga keseimbangan hayati.']
    ],
    targets: [
      { l: 'Racun kimia turun sampai 20', c: S => S.poison <= 20 },
      { l: 'Pemangsa alami pulih (8)', c: S => S.pred >= 8 },
      { l: 'Kesehatan sawah 75%', c: S => S.health >= 75 }
    ],
    tips: [
      'Racun kimia mematikan musuh alami hama. Bilas residu racun terlebih dahulu!',
      'Gunakan pupuk kompos alami untuk memulihkan tanah yang mengeras.',
      'Katak yang kembali akan menjaga jumlah serangga tetap aman.'
    ],
    quiz: {
      q: 'Petani menyemprot racun kimia berlebihan ke petak sawah. Mengapa katak dan cacing ikut mati?',
      opts: [
        'Racun kimia terserap ke dalam air dan tanah yang menjadi tempat hidup mereka.',
        'Cacing tanah pergi ke kota karena tidak suka bau racun.',
        'Katak meminum racun kimia karena mengira itu adalah sari madu.'
      ],
      correct: 0,
      explain: 'Racun kimia bersifat racun umum: cairan meresap ke dalam pori-pori tanah dan air sawah, mematikan mikroorganisme tanah, cacing, dan amfibi berkulit basah seperti katak.'
    },
    chain: ['Racun kimia berlebih', 'Katak & cacing mati', 'Tanah sawah mengeras', 'Keseimbangan hayati rusak']
  },

  {
    id: 'sawah-4',
    biome: 'sawah',
    type: 'manusia',
    par: 40,
    title: 'Misi 4: Perburuan Ular & Jerat Petani',
    headline: 'Ular sawah ditangkap liar, jumlah tikus melonjak memakan bulir padi!',
    task: 'Sita kawat jerat liar, lepas ular sahabat petani, pasang sarang burung hantu!',
    story: 'Detektif, gawat! Warga memburu semua ular sawah karena takut, dan memasang kawat jerat listrik berbahaya. Sekarang tikus tidak punya musuh alami dan berpesta memakan habis bulir padi petani!',
    init: { prod: 38, herb: 65, pred: 2, trap: 58 },
    tick(S) {
      S.prod = cl(S.prod + (S.herb <= 25 ? 1.8 : -S.herb * 0.15), 0, 100);
      S.herb = cl(S.herb + 1.8 - S.pred * 0.85);
      S.pred = cl(S.pred + (S.herb > 15 ? 0.35 : -0.45) - (S.trap > 15 ? S.trap * 0.025 : 0));
      S.trap = cl(S.trap + 0.6, 0, 100);
      if (S.trap < 20) S.pred = cl(S.pred + 0.8);
    },
    health(S) {
      return Math.round(100 * (0.32 * c01(S.prod / 48) + 0.26 * c01(1 - S.trap / 65) + 0.22 * c01(S.pred / 6) + 0.2 * c01(1 - S.herb / 60)));
    },
    actions: [
      { id: 'sita', label: 'Sita Kawat Jerat Liar', role: 'Singkirkan jerat kawat berbahaya', ic: 'net', quota: 3, fx: S => S.trap = cl(S.trap - 35, 0, 100) },
      { id: 'ular', label: 'Lepas Ular Sawah', role: 'Ular pemangsa alami tikus', ic: 'snake', quota: 4, fx: S => { S.pred = cl(S.pred + 3); S.herb = cl(S.herb - 18, 0, 100); } },
      { id: 'burung', label: 'Pasang Sarang Burung Hantu', role: 'Tyto alba pemburu tikus malam (+8 Padi)', ic: 'tree', quota: 3, fx: S => { S.pred = cl(S.pred + 2); S.herb = cl(S.herb - 20, 0, 100); S.prod = cl(S.prod + 8); } }
    ],
    stats: [
      ['trap', 'Jerat Liar', 'net', -1, 'Jerat kawat melukai hewan pemangsa sahabat petani. Sita segera!'],
      ['herb', 'Hama Tikus', 'paw', -1, 'Tikus memakan bulir padi petani jika pemangsanya hilang.'],
      ['pred', 'Ular & Burung Hantu', 'snake', 1, 'Pemangsa alami menjaga jumlah tikus tetap seimbang.'],
      ['prod', 'Padi Panen', 'sprout', 1, 'Bulir padi yang selamat dari hama tikus untuk panen raya.']
    ],
    targets: [
      { l: 'Jerat liar disita sampai 15', c: S => S.trap <= 15 },
      { l: 'Hama tikus ditekan sampai 25', c: S => S.herb <= 25 },
      { l: 'Kesehatan sawah 75%', c: S => S.health >= 75 }
    ],
    tips: [
      'Jerat kawat berbahaya bagi satwa liar. Sita jerat kawatnya terlebih dahulu!',
      'Ular sawah dan burung hantu adalah sahabat sejati petani pemakan tikus.',
      'Sarang burung hantu (rubuha) mengundang pemangsa malam untuk berpatroli.'
    ],
    quiz: {
      q: 'Petani memburu semua ular sawah hingga habis karena takut. Apa yang terjadi pada tanaman padi?',
      opts: [
        'Hama tikus meledak tak terkendali dan memakan habis bulir padi.',
        'Padi berubah menjadi tanaman jagung karena tidak ada ular.',
        'Tanah sawah langsung menjadi kering kerontang.'
      ],
      correct: 0,
      explain: 'Ular sawah adalah predator alami utama tikus. Jika ular dimusnahkan, rantai makanan terputus sehingga populasi tikus melonjak tinggi dan memakan habis tanaman padi.'
    },
    chain: ['Ular sawah diburu', 'Tikus melonjak banyak', 'Padi dimakan habis', 'Petani gagal panen']
  },

  /* -------------------- 🌲 HUTAN TROPIS (4 MISI) -------------------- */
  {
    id: 'hutan-1',
    biome: 'hutan',
    type: 'alam',
    par: 42,
    title: 'Misi 1: Kemarau & Mata Air Rimba Kering',
    headline: 'Panas terik mengeringkan mata air rimba dan rumput pakan rusa!',
    task: 'Alirkan mata air, tanam pohon rimba, urai serasah humus!',
    story: 'Detektif! Kemarau panjang membuat mata air rimba mengering. Rumput pakan rusa layu dan pohon-pohon mulai gugur daunnya. Hutan hujan tropis ini butuh pertolongan kita!',
    init: { prod: 38, herb: 16, pred: 3, water: 12 },
    tick(S) {
      S.water = cl(S.water - 2.2, 0, 100);
      const g = S.water > 45 ? 1.8 : S.water > 30 ? 0.2 : -2.6;
      S.prod = cl(S.prod + g - S.herb * 0.15);
      S.herb = cl(S.herb + (S.prod > 24 ? 1.2 : -2) - S.pred * 0.65);
      S.pred = cl(S.pred + (S.herb > 11 ? 0.28 : -0.4));
    },
    health(S) {
      return Math.round(100 * (0.3 * c01(S.prod / 55) + 0.28 * c01(S.water / 70) + 0.22 * c01(S.pred / 4) + 0.2 * hCtrl(S)));
    },
    actions: [
      { id: 'air', label: 'Alirkan Mata Air', role: 'Air: kebutuhan hidup hutan', ic: 'drop', quota: 6, fx: S => S.water = cl(S.water + 30, 0, 100) },
      { id: 'pohon', label: 'Tanam Pohon Rimba', role: 'Pohon: produsen & rumah satwa', ic: 'tree', quota: 8, fx: S => S.prod = cl(S.prod + 10) },
      { id: 'serasah', label: 'Urai Serasah Jadi Humus', role: 'Pengurai: pembuat tanah subur (+4 Hutan)', ic: 'mushroom', quota: 5, fx: S => S.prod = cl(S.prod + 4) }
    ],
    stats: [
      ['water', 'Air Mata Air', 'drop', 1, 'Mata air menghidupi pohon dan rumput. Akar pohon menyimpan air hujan.'],
      ['prod', 'Pohon & Rumput', 'tree', 1, 'Pohon dan rumput adalah makanan rusa dan paru-paru bumi.'],
      ['herb', 'Rusa Rimba', 'paw', -1, 'Rusa yang terlalu banyak memakan habis tunas pohon muda.'],
      ['pred', 'Harimau Sumatera', 'paw', 1, 'Harimau Sumatera menjaga jumlah rusa tetap seimbang.']
    ],
    targets: [
      { l: 'Air mata air mencapai 60', c: S => S.water >= 60 },
      { l: 'Hutan hijau kembali (50)', c: S => S.prod >= 50 },
      { l: 'Kesehatan hutan 75%', c: S => S.health >= 75 }
    ],
    tips: [
      'Mata air kering membuat pohon dan rumput mati. Alirkan mata air dahulu!',
      'Rusa makan rumput, harimau makan rusa. Jika rumput habis, harimau turun ke desa.',
      'Serasah daun yang terurai jamur menjadi humus penyubur pohon.'
    ],
    quiz: {
      q: 'Kemarau mengeringkan rumput rimba. Mengapa harimau turun mendekati permukiman desa?',
      opts: [
        'Harimau ingin bermain dengan hewan ternak di desa.',
        'Rusa kelaparan dan berkurang, sehingga harimau kesulitan mencari mangsa di hutan.',
        'Harimau mencari buah-buahan matang yang jatuh di kebun warga.'
      ],
      correct: 1,
      explain: 'Saat produsen (rumput dan pucuk daun) layu, herbivora seperti rusa kelaparan dan berkurang. Pemangsa puncak seperti harimau kekurangan mangsa alami sehingga terpaksa menjelajah hingga ke pinggiran desa.'
    },
    chain: ['Kemarau panjang', 'Rumput rimba kering', 'Rusa berkurang', 'Harimau turun ke desa']
  },

  {
    id: 'hutan-2',
    biome: 'hutan',
    type: 'alam',
    par: 42,
    title: 'Misi 2: Gesekan Ranting & Asap Hutan',
    headline: 'Gesekan ranting kering memicu titik api alami yang mengancam sarang satwa!',
    task: 'Padamkan titik api, buat sekat bakar basah, evakuasi dan rawat satwa!',
    story: 'Detektif! Musim angin kering memicu gesekan dahan bambu dan ranting kayu hingga menyala menjadi titik api rimba. Asap tebal membuat burung dan rusa sesak napas. Segera amankan hutan!',
    init: { prod: 30, api: 64, herb: 14, pred: 3 },
    tick(S) {
      S.api = cl(S.api + 1.2, 0, 100);
      S.prod = cl(S.prod + (S.api <= 20 ? 1.2 : -S.api * 0.12), 0, 100);
      S.herb = cl(S.herb - (S.api > 20 ? 0.8 : -0.2));
      S.pred = cl(S.pred - (S.api > 30 ? 0.3 : -0.1));
    },
    health(S) {
      return Math.round(100 * (0.35 * c01(S.prod / 40) + 0.35 * c01(1 - S.api / 70) + 0.15 * c01(S.herb / 18) + 0.15 * c01(S.pred / 3.5)));
    },
    actions: [
      { id: 'padam', label: 'Padamkan Titik Api', role: 'Semprot air padamkan bara api', ic: 'drop', quota: 4, fx: S => S.api = cl(S.api - 32, 0, 100) },
      { id: 'sekat', label: 'Buat Sekat Bakar Basah', role: 'Parit basah cegah rambatan api', ic: 'tree', quota: 3, fx: S => { S.api = cl(S.api - 20, 0, 100); S.prod = cl(S.prod + 8); } },
      { id: 'satwa', label: 'Evakuasi & Rawat Satwa', role: 'Beri minum dan selamatkan rusa', ic: 'paw', quota: 4, fx: S => { S.herb = cl(S.herb + 6); S.pred = cl(S.pred + 1); } }
    ],
    stats: [
      ['api', 'Titik Api Rimba', 'sun', -1, 'Api membakar dahan kering dan memicu asap pekat. Padamkan segera!'],
      ['prod', 'Pohon Rimba', 'tree', 1, 'Pohon adalah penyerap karbon dan rumah satwa langka.'],
      ['herb', 'Rusa Rimba', 'paw', 1, 'Rusa membutuhkan udara bersih dan rumput yang tidak terbakar.'],
      ['pred', 'Harimau', 'paw', 1, 'Harimau membutuhkan wilayah jelajah hutan yang aman dari api.']
    ],
    targets: [
      { l: 'Titik api padam sampai 15', c: S => S.api <= 15 },
      { l: 'Pohon rimba pulih (35)', c: S => S.prod >= 35 },
      { l: 'Kesehatan hutan 75%', c: S => S.health >= 75 }
    ],
    tips: [
      'Api cepat merambat saat angin kencang. Padamkan titik api terlebih dahulu!',
      'Sekat bakar basah menghentikan bara api melompat ke pohon besar lainnya.',
      'Selamatkan satwa rimba agar populasi rusa dan harimau tetap terjaga.'
    ],
    quiz: {
      q: 'Ketika api membakar pohon rimba, mengapa satwa seperti burung dan monyet paling cepat menghilang?',
      opts: [
        'Pohon tempat bersarang dan mencari buah telah hangus terbakar.',
        'Burung dan monyet berubah menjadi hewan malam.',
        'Burung lebih suka tinggal di dekat asap tebal.'
      ],
      correct: 0,
      explain: 'Pohon rimba adalah habitat tajuk utama bagi burung dan monyet. Saat dahan dan sarang terbakar, sumber makanan (biji dan buah) musnah sehingga satwa terpaksa mengungsi mencari hutan lain.'
    },
    chain: ['Gesekan ranting kering', 'Titik api rimba muncul', 'Pohon sarang satwa terbakar', 'Hutan butuh sekat bakar']
  },

  {
    id: 'hutan-3',
    biome: 'hutan',
    type: 'manusia',
    par: 45,
    title: 'Misi 3: Penebangan Liar (Pembalakan Rimba)',
    headline: 'Pohon raksasa ditebangi pembalak liar hingga lereng bukit rawan longsor!',
    task: 'Patroli hutan tangkap pembalak, reboisasi pohon meranti, pasang patok lindung!',
    story: 'Detektif! Pembalak liar menebang pohon meranti dan ulin raksasa secara serakah. Hutan menjadi botak, tanah kehilangan akar penahan air, dan tanah longsor mengancam desa di bawah bukit!',
    init: { prod: 24, herb: 20, pred: 2, trap: 58 },
    tick(S) {
      S.prod = cl(S.prod - 1.4);
      S.trap = cl(S.trap + 0.7, 0, 100);
      S.herb = cl(S.herb - (S.prod < 20 ? 1.0 : 0));
      S.pred = cl(S.pred - (S.prod < 15 ? 0.3 : 0));
      if (S.trap < 20) S.prod = cl(S.prod + 1.2);
    },
    health(S) {
      return Math.round(100 * (0.34 * c01(S.prod / 55) + 0.28 * c01(1 - S.trap / 65) + 0.2 * c01(S.pred / 4) + 0.18 * hCtrl(S)));
    },
    actions: [
      { id: 'patroli', label: 'Patroli Tangkap Pembalak', role: 'Hentikan gergaji mesin liar', ic: 'net', quota: 3, fx: S => S.trap = cl(S.trap - 35, 0, 100) },
      { id: 'reboisasi', label: 'Tanam Pohon Meranti', role: 'Reboisasi pohon penahan air', ic: 'tree', quota: 8, fx: S => S.prod = cl(S.prod + 10) },
      { id: 'edukasi', label: 'Pasang Patok Hutan Lindung', role: 'Jaga wilayah konservasi rimba', ic: 'book', quota: 3, fx: S => { S.trap = cl(S.trap - 15, 0, 100); S.prod = cl(S.prod + 5); } }
    ],
    stats: [
      ['trap', 'Pembalakan Liar', 'net', -1, 'Penebangan pohon merusak akar penahan tanah dan sumber air.'],
      ['prod', 'Pohon Rimba', 'tree', 1, 'Pohon meranti menyerap karbon dan menahan air hujan di tanah.'],
      ['herb', 'Rusa & Satwa Herbivora', 'paw', 1, 'Satwa kehilangan daun dan pucuk muda bila pohon habis ditebang.'],
      ['pred', 'Harimau', 'paw', 1, 'Harimau kehilangan kanopi teduh untuk berburu mangsa.']
    ],
    targets: [
      { l: 'Pembalakan liar dihentikan (15)', c: S => S.trap <= 15 },
      { l: 'Pohon kembali rindang (50)', c: S => S.prod >= 50 },
      { l: 'Kesehatan hutan 75%', c: S => S.health >= 75 }
    ],
    tips: [
      'Pembalakan liar menggunduli bukit! Lakukan patroli untuk menghentikannya.',
      'Tanam kembali bibit pohon meranti agar akar pohon mengikat tanah lereng.',
      'Hutan lindung menjamin satwa liar tidak kehilangan tempat tinggal.'
    ],
    quiz: {
      q: 'Apa akibat buruk jangka panjang jika bukit hutan rimba ditebangi liar terus-menerus?',
      opts: [
        'Akar penahan air musnah sehingga terjadi erosi dan bencana tanah longsor.',
        'Tanah bukit berubah menjadi kolam ikan yang jernih.',
        'Pohon liar akan tumbuh sendiri dalam waktu dua hari.'
      ],
      correct: 0,
      explain: 'Akar pohon hutan berfungsi mengikat partikel tanah dan menyerap air hujan ke dalam tanah. Tanpa pohon, air hujan mengikis lapisan tanah hingga memicu banjir bandang dan tanah longsor.'
    },
    chain: ['Pohon ditebang liar', 'Tanah lereng gundul', 'Air hujan mengikis tanah', 'Bencana tanah longsor']
  },

  {
    id: 'hutan-4',
    biome: 'hutan',
    type: 'manusia',
    par: 45,
    title: 'Misi 4: Jerat Kawat Pemburu Harimau',
    headline: 'Pemburu liar memasang jerat kawat mematikan bagi Harimau Sumatera!',
    task: 'Sita jerat kawat pemburu, obati harimau terluka, pasang sensor kamera!',
    story: 'Detektif! Pemburu liar memasang jerat tali kawat baja di jalur satwa. Harimau Sumatera terluka kakinya dan populasinya terancam punah. Kita harus selamatkan sang pemangsa puncak rimba!',
    init: { prod: 35, herb: 26, pred: 2, trap: 65 },
    tick(S) {
      S.trap = cl(S.trap + 0.8, 0, 100);
      S.pred = cl(S.pred - (S.trap > 20 ? 0.35 : -0.15));
      S.herb = cl(S.herb + (S.pred < 3 ? 1.0 : -0.7));
      S.prod = cl(S.prod + (S.herb <= 24 ? 1.4 : -0.8), 0, 100);
    },
    health(S) {
      return Math.round(100 * (0.3 * c01(S.prod / 48) + 0.3 * c01(1 - S.trap / 70) + 0.24 * c01(S.pred / 4.5) + 0.16 * c01(1 - S.herb / 35)));
    },
    actions: [
      { id: 'jerat', label: 'Sita Jerat Kawat Baja', role: 'Lepaskan jerat jebakan maut', ic: 'net', quota: 3, fx: S => S.trap = cl(S.trap - 35, 0, 100) },
      { id: 'harimau', label: 'Obati & Lindungi Harimau', role: 'Perawatan medis satwa pemangsa', ic: 'paw', quota: 4, fx: S => { S.pred = cl(S.pred + 3); S.trap = cl(S.trap - 8, 0, 100); } },
      { id: 'edukasi', label: 'Pasang Kamera Trap Patroli', role: 'Pantau jalur satwa terlindungi (+6 Pohon)', ic: 'mag', quota: 3, fx: S => { S.trap = cl(S.trap - 25, 0, 100); S.prod = cl(S.prod + 6); } }
    ],
    stats: [
      ['trap', 'Jerat Pemburu', 'net', -1, 'Jerat kawat baja melukai kaki harimau dan rusa. Singkirkan!'],
      ['pred', 'Harimau Sumatera', 'paw', 1, 'Harimau adalah pemangsa puncak penjaga keseimbangan herbivora.'],
      ['herb', 'Rusa Rimba', 'paw', -1, 'Bila harimau punah, kawanan rusa membludak memakan pucuk pohon.'],
      ['prod', 'Pohon Rimba', 'tree', 1, 'Kelestarian pohon tergantung keseimbangan jumlah pemakan daun.']
    ],
    targets: [
      { l: 'Jerat pemburu disita sampai 15', c: S => S.trap <= 15 },
      { l: 'Harimau sehat terlindungi (4)', c: S => S.pred >= 4 },
      { l: 'Kesehatan hutan 75%', c: S => S.health >= 75 }
    ],
    tips: [
      'Jerat kawat mematikan bagi harimau dan rusa. Sita kawat jerat segera!',
      'Obati harimau yang terluka agar dapat kembali memburu mangsa di rimba.',
      'Kamera trap membantu penjaga hutan mengawasi pemburu liar yang menyusup.'
    ],
    quiz: {
      q: 'Jika Harimau Sumatera punah karena diburu, apa dampaknya bagi pohon-pohon di hutan?',
      opts: [
        'Rusa bertambah sangat banyak dan memakan habis tunas pohon muda.',
        'Pohon akan tumbuh dua kali lebih cepat tanpa adanya harimau.',
        'Hutan menjadi padang rumput yang berbunga setiap hari.'
      ],
      correct: 0,
      explain: 'Harimau berfungsi mengendalikan populasi herbivora seperti rusa dan babi hutan. Tanpa harimau, herbivora membludak dan memakan habis tunas muda, sehingga regenerasi pohon hutan terhenti.'
    },
    chain: ['Harimau diburu jerat', 'Pemangsa puncak hilang', 'Rusa membludak banyak', 'Tunas pohon habis dimakan']
  },

  /* -------------------- 🌊 SUNGAI (4 MISI) -------------------- */
  {
    id: 'sungai-1',
    biome: 'sungai',
    type: 'alam',
    par: 42,
    title: 'Misi 1: Air Surut & Ledakan Gulma Eceng Gondok',
    headline: 'Aliran sungai surut dan eceng gondok menutup rapat permukaan air!',
    task: 'Buka pintu air hulu, angkat gulma liar, tebar tanaman air oksigen!',
    story: 'Detektif! Aliran sungai surut dan eceng gondok tumbuh lebat menutupi seluruh permukaan air. Sinar matahari tak bisa masuk dan ikan-ikan lemas kekurangan oksigen. Buka kembali aliran sungai!',
    init: { prod: 28, herb: 22, pred: 3, water: 32, gulma: 55 },
    tick(S) {
      S.gulma = cl(S.gulma + 1.6, 0, 100);
      S.water = cl(S.water - 0.7 - S.gulma * 0.035, 0, 100);
      S.prod = cl(S.prod - S.gulma * 0.02 + (S.water > 55 ? 1 : 0));
      S.herb = cl(S.herb + (S.water > 45 ? 1.2 : -1.8) - S.pred * 0.55);
      S.pred = cl(S.pred + (S.herb > 13 ? 0.3 : -0.4));
    },
    health(S) {
      return Math.round(100 * (0.28 * c01(1 - S.gulma / 70) + 0.3 * c01(S.water / 70) + 0.22 * c01(S.herb / 32) + 0.2 * c01(S.pred / 4)));
    },
    actions: [
      { id: 'pintu', label: 'Buka Pintu Air Hulu', role: 'Alirkan kembali air sungai', ic: 'drop', quota: 6, fx: S => { S.water = cl(S.water + 25, 0, 100); S.gulma = cl(S.gulma - 6, 0, 100); } },
      { id: 'gulma', label: 'Angkat Gulma Liar', role: 'Bebaskan permukaan sungai', ic: 'net', quota: 4, fx: S => S.gulma = cl(S.gulma - 24, 0, 100) },
      { id: 'tanam', label: 'Tebar Tanaman Air', role: 'Tanaman air penghasil oksigen', ic: 'sprout', quota: 4, fx: S => { S.prod = cl(S.prod + 10); S.water = cl(S.water + 6, 0, 100); } }
    ],
    stats: [
      ['gulma', 'Eceng Gondok', 'sprout', -1, 'Eceng gondok menutup permukaan: sinar dan udara tak bisa masuk.'],
      ['water', 'Oksigen Air', 'wave', 1, 'Ikan bernapas dengan oksigen yang larut di dalam air.'],
      ['herb', 'Ikan Kecil', 'fish', 1, 'Ikan kecil penghuni utama sungai dan makanan bangau.'],
      ['pred', 'Bangau Tongtong', 'paw', 1, 'Keberadaan bangau menandakan aliran sungai yang sehat.']
    ],
    targets: [
      { l: 'Gulma diangkat sampai 18', c: S => S.gulma <= 18 },
      { l: 'Oksigen air kembali (60)', c: S => S.water >= 60 },
      { l: 'Kesehatan sungai 75%', c: S => S.health >= 75 }
    ],
    tips: [
      'Eceng gondok menutup permukaan air: sinar dan udara terhalang masuk!',
      'Ikan bernapas dengan oksigen terlarut. Angkat gulma agar air segar.',
      'Buka pintu air hulu agar endapan kotoran hanyut dan sungai mengalir.'
    ],
    quiz: {
      q: 'Permukaan air sungai tertutup rapat oleh eceng gondok. Mengapa ikan-ikan lemas dan mati?',
      opts: [
        'Sinar matahari dan udara terhalang masuk sehingga oksigen terlarut habis.',
        'Eceng gondok menggigit sirip ikan di malam hari.',
        'Ikan sungai tidak menyukai warna bunga eceng gondok.'
      ],
      correct: 0,
      explain: 'Tumbuhan gulma yang menutup rapat permukaan menghalangi pertukaran oksigen udara dan cahaya matahari. Tanaman bawah air mati dan bakteri pengurai menghabiskan oksigen terlarut.'
    },
    chain: ['Eceng gondok menutup air', 'Sinar matahari terhalang', 'Oksigen air berkurang', 'Ikan lemas & mati']
  },

  {
    id: 'sungai-2',
    biome: 'sungai',
    type: 'alam',
    par: 42,
    title: 'Misi 2: Erosi Tebing & Pendangkalan Sungai',
    headline: 'Longsoran tanah di hulu membawa lumpur pekat hingga sungai mendangkal!',
    task: 'Keruk endapan lumpur, tanam rumput vetiver penahan tebing, jernihkan air!',
    story: 'Detektif! Hujan lebat di tebing hulu mengikis lapisan tanah hingga lumpur pekat mengalir ke sungai. Dasar sungai mendangkal, insang ikan tersumbat lumpur, dan air menjadi keruh cokelat!',
    init: { prod: 25, herb: 18, pred: 3, water: 35, lumpur: 65 },
    tick(S) {
      S.lumpur = cl(S.lumpur + 1.2, 0, 100);
      S.water = cl(S.water - S.lumpur * 0.02, 0, 100);
      S.herb = cl(S.herb - (S.lumpur > 30 ? 1.0 : -0.5));
      S.pred = cl(S.pred - (S.herb < 10 ? 0.3 : 0));
    },
    health(S) {
      return Math.round(100 * (0.32 * c01(1 - S.lumpur / 70) + 0.28 * c01(S.water / 65) + 0.22 * c01(S.herb / 25) + 0.18 * c01(S.pred / 4)));
    },
    actions: [
      { id: 'keruk', label: 'Keruk Endapan Lumpur', role: 'Perdalam kembali dasar sungai', ic: 'bin', quota: 4, fx: S => S.lumpur = cl(S.lumpur - 28, 0, 100) },
      { id: 'vetiver', label: 'Tanam Rumput Vetiver', role: 'Akar kuat ikat tanah tebing', ic: 'sprout', quota: 4, fx: S => { S.lumpur = cl(S.lumpur - 15, 0, 100); S.prod = cl(S.prod + 10); } },
      { id: 'jernih', label: 'Alirkan Air Jernih Hulu', role: 'Bilas lumpur dengan air segar', ic: 'drop', quota: 4, fx: S => S.water = cl(S.water + 24, 0, 100) }
    ],
    stats: [
      ['lumpur', 'Lumpur Erosi', 'bin', -1, 'Lumpur pekat menyumbat insang ikan dan membuat air dangkal.'],
      ['water', 'Kejernihan Air', 'wave', 1, 'Air yang jernih memungkinkan tanaman air berfotosintesis.'],
      ['herb', 'Ikan Air Tawar', 'fish', 1, 'Ikan membutuhkan air bersih bebas endapan lumpur tebal.'],
      ['pred', 'Bangau Pemburu', 'paw', 1, 'Bangau dapat melihat ikan mangsanya jika air jernih.']
    ],
    targets: [
      { l: 'Lumpur berkurang sampai 20', c: S => S.lumpur <= 20 },
      { l: 'Kejernihan air mencapai 60', c: S => S.water >= 60 },
      { l: 'Kesehatan sungai 75%', c: S => S.health >= 75 }
    ],
    tips: [
      'Lumpur membuat air keruh cokelat. Keruk endapan lumpur dari dasar!',
      'Akar rumput vetiver yang panjang mencengkeram tebing agar tidak longsor.',
      'Air yang jernih memudahkan bangau mencari ikan dan tanaman air bertumbuh.'
    ],
    quiz: {
      q: 'Mengapa lumpur erosi yang mengendap di dasar sungai dapat mengancam kehidupan ikan?',
      opts: [
        'Lumpur halus menyumbat insang pernapasan ikan dan mengubur telur ikan.',
        'Ikan mengira lumpur adalah makanan sehingga menjadi terlalu kenyang.',
        'Lumpur membuat air sungai menguap ke angkasa dalam sekejap.'
      ],
      correct: 0,
      explain: 'Partikel lumpur halus yang melayang di air menempel pada lamela insang ikan sehingga ikan sulit menyerap oksigen, dan endapannya mengubur telur ikan di dasar sungai.'
    },
    chain: ['Hujan lebat di hulu', 'Erosi tanah tebing', 'Sungai keruh mendangkal', 'Insang ikan tersumbat']
  },

  {
    id: 'sungai-3',
    biome: 'sungai',
    type: 'manusia',
    par: 42,
    title: 'Misi 3: Limbah Kimia Detergen Pabrik',
    headline: 'Pabrik membuang limbah busa detergen hingga meracuni ikan dan bangau!',
    task: 'Saring limbah pabrik, angkut sampah plastik, tebar benih ikan!',
    story: 'Detektif! Saluran pipa pabrik membuang limbah detergen kimia langsung ke sungai tanpa disaring. Air berbusa putih pekat, ikan keracunan, dan bangau yang memakan ikan ikut jatuh sakit!',
    init: { prod: 30, herb: 18, pred: 2, water: 45, poison: 58, trash: 45 },
    tick(S) {
      S.poison = cl(S.poison + 1.8, 0, 100);
      S.trash = cl(S.trash + 0.7, 0, 100);
      S.water = cl(S.water - S.poison * 0.012, 0, 100);
      S.herb = cl(S.herb - S.poison * 0.028 + (S.water > 40 && S.poison < 18 ? 1.1 : 0) - S.pred * 0.5);
      S.pred = cl(S.pred + (S.herb > 13 ? 0.3 : -0.5));
      S.prod = cl(S.prod + (S.poison < 15 ? 1 : -1));
    },
    health(S) {
      return Math.round(100 * (0.26 * c01(1 - S.poison / 75) + 0.22 * c01(1 - S.trash / 65) + 0.24 * c01(S.herb / 32) + 0.18 * c01(S.pred / 4) + 0.1 * c01(S.prod / 40)));
    },
    actions: [
      { id: 'saring', label: 'Saring Limbah Pabrik', role: 'Hentikan pipa racun detergen', ic: 'bottle', quota: 3, fx: S => S.poison = cl(S.poison - 30, 0, 100) },
      { id: 'sampah', label: 'Angkut Sampah Plastik', role: 'Bersihkan sampah mengambang', ic: 'bin', quota: 3, fx: S => S.trash = cl(S.trash - 28, 0, 100) },
      { id: 'benih', label: 'Tebar Benih Ikan', role: 'Kembalikan populasi ikan tawar', ic: 'fish', quota: 4, fx: S => S.herb = cl(S.herb + 8) }
    ],
    stats: [
      ['poison', 'Limbah Kimia', 'bottle', -1, 'Detergen membuat air berbusa dan beracun bagi insang ikan.'],
      ['trash', 'Sampah Plastik', 'bin', -1, 'Plastik tidak membusuk puluhan tahun dan melukai satwa air.'],
      ['herb', 'Ikan Sungai', 'fish', 1, 'Racun terserap tubuh ikan kecil, lalu menumpuk ke tubuh bangau.'],
      ['water', 'Oksigen Alami', 'wave', 1, 'Air bersih bebas racun mengembalikan keseimbangan sungai.']
    ],
    targets: [
      { l: 'Racun kimia disaring sampai 15', c: S => S.poison <= 15 },
      { l: 'Sampah dibersihkan sampai 15', c: S => S.trash <= 15 },
      { l: 'Kesehatan sungai 75%', c: S => S.health >= 75 }
    ],
    tips: [
      'Limbah detergen terus mengalir dari pipa! Saring dan hentikan secepatnya.',
      'Racun terserap ikan kecil, lalu menumpuk di tubuh burung bangau pemangsanya.',
      'Sampah plastik tidak membusuk. Angkut sampah dari aliran sungai!'
    ],
    quiz: {
      q: 'Bagaimana racun limbah detergen pabrik bisa membuat burung bangau di puncak rantai makanan ikut mati?',
      opts: [
        'Racun terserap ikan kecil, lalu bangau memakan banyak ikan beracun tersebut.',
        'Bangau mandi di sungai lalu bulunya rontok terbawa angin.',
        'Racun detergen membuat bangau lupa cara bersarang di pohon.'
      ],
      correct: 0,
      explain: 'Inilah peristiwa biomagnifikasi: racun diserap tumbuhan dan ikan kecil. Ketika bangau memakan puluhan ikan beracun, konsentrasi racun berlipat ganda di dalam tubuh bangau hingga mematikan.'
    },
    chain: ['Limbah pabrik dibuang', 'Racun diserap ikan kecil', 'Ikan beracun dimakan bangau', 'Pemangsa puncak mati']
  },

  {
    id: 'sungai-4',
    biome: 'sungai',
    type: 'manusia',
    par: 42,
    title: 'Misi 4: Penangkapan Ikan Berbahaya (Setrum & Tuba)',
    headline: 'Alat setrum aki dan racun tuba mematikan semua benih ikan dan anak katak!',
    task: 'Sita alat setrum listrik, netralkan racun air, lepas bibit ikan gabus!',
    story: 'Detektif! Orang-orang tidak bertanggung jawab menangkap ikan memakai setrum listrik dan racun tuba. Bukan cuma ikan besar, benih ikan kecil dan anak katak mati mengambang. Hentikan perusakan ini!',
    init: { prod: 28, herb: 10, pred: 2, poison: 52, trap: 60 },
    tick(S) {
      S.trap = cl(S.trap + 0.8, 0, 100);
      S.herb = cl(S.herb - (S.trap > 20 ? 1.2 : -0.4));
      S.pred = cl(S.pred - (S.herb < 10 ? 0.3 : 0));
      S.water = cl(S.water - S.poison * 0.01, 0, 100);
    },
    health(S) {
      return Math.round(100 * (0.3 * c01(1 - S.trap / 65) + 0.28 * c01(1 - S.poison / 60) + 0.24 * c01(S.herb / 25) + 0.18 * c01(S.pred / 4)));
    },
    actions: [
      { id: 'setrum', label: 'Sita Alat Setrum Aki', role: 'Hentikan penangkapan listrik', ic: 'net', quota: 3, fx: S => S.trap = cl(S.trap - 35, 0, 100) },
      { id: 'tawar', label: 'Netralkan Racun Tuba', role: 'Bilas air tawar pulihkan pH', ic: 'bottle', quota: 3, fx: S => S.poison = cl(S.poison - 30, 0, 100) },
      { id: 'bibit', label: 'Lepas Bibit Ikan Gabus', role: 'Kembalikan predator air tawar', ic: 'fish', quota: 4, fx: S => { S.herb = cl(S.herb + 8); S.pred = cl(S.pred + 2); } }
    ],
    stats: [
      ['trap', 'Setrum Listrik', 'net', -1, 'Sengatan listrik mematikan semua telur dan benih ikan kecil.'],
      ['poison', 'Racun Tuba', 'bottle', -1, 'Getah tuba meracuni seluruh biota air tanpa pandang bulu.'],
      ['herb', 'Ikan Air Tawar', 'fish', 1, 'Benih ikan membutuhkan perlindungan agar dapat bertelur.'],
      ['pred', 'Ikan Gabus & Bangau', 'paw', 1, 'Ikan gabus menjaga keseimbangan populasi ikan di rawa dan sungai.']
    ],
    targets: [
      { l: 'Setrum listrik disita sampai 15', c: S => S.trap <= 15 },
      { l: 'Racun dinetralkan sampai 15', c: S => S.poison <= 15 },
      { l: 'Kesehatan sungai 75%', c: S => S.health >= 75 }
    ],
    tips: [
      'Alat setrum aki mematikan benih ikan sekecil apa pun! Sita alat setrumnya.',
      'Getah tuba meracuni air sungai. Netralkan air dengan aliran segar.',
      'Tebar bibit ikan asli sungai Nusantara agar generasi ikan tidak punah.'
    ],
    quiz: {
      q: 'Mengapa menangkap ikan dengan setrum listrik dilarang keras oleh hukum dan merusak ekosistem?',
      opts: [
        'Setrum listrik membunuh seluruh benih ikan kecil dan merusak telur ikan.',
        'Ikan yang tersetrum menjadi terlalu asin saat dimasak.',
        'Setrum listrik membuat air sungai berubah menjadi es batu.'
      ],
      correct: 0,
      explain: 'Alat setrum listrik membunuh secara massal tanpa pilih-pilih: induk ikan, telur, benih kecil, hingga mikroorganisme air ikut mati tersengat sehingga memutus rantai regenerasi ikan.'
    },
    chain: ['Setrum listrik dipakai', 'Benih ikan mati massal', 'Generasi ikan musnah', 'Sungai kehilangan satwa']
  },

  /* -------------------- 🪸 LAUT (4 MISI) -------------------- */
  {
    id: 'laut-1',
    biome: 'laut',
    type: 'alam',
    par: 45,
    title: 'Misi 1: Air Laut Panas & Karang Memutih',
    headline: 'Suhu samudra memanas ekstrem hingga karang memutih dan ikan mengungsi!',
    task: 'Pasang naungan terumbu, transplantasi karang tahan panas, tebar ikan karang!',
    story: 'Detektif! Suhu air laut naik drastis akibat gelombang panas laut alami. Karang mengeluarkan ganggang hidupnya dan berubah putih pucat (coral bleaching). Ribuan ikan kehilangan rumah!',
    init: { prod: 22, herb: 18, pred: 3, heat: 72 },
    tick(S) {
      S.heat = cl(S.heat + 0.55, 0, 100);
      S.prod = cl(S.prod + (S.heat < 40 ? 1.5 : S.heat > 60 ? -1.9 : 0.2));
      S.herb = cl(S.herb + (S.prod > 24 ? 0.9 : -1.5) - S.pred * 0.45);
      S.pred = cl(S.pred + (S.herb > 11 ? 0.25 : -0.35) - (S.heat > 60 ? 0.2 : 0));
    },
    health(S) {
      return Math.round(100 * (0.32 * c01(1 - S.heat / 80) + 0.3 * c01(S.prod / 50) + 0.18 * c01(S.herb / 25) + 0.2 * c01(S.pred / 5)));
    },
    actions: [
      { id: 'naungan', label: 'Pasang Naungan Terumbu', role: 'Lindungi karang dari sengatan panas', ic: 'sun', quota: 4, fx: S => S.heat = cl(S.heat - 26, 0, 100) },
      { id: 'karang', label: 'Transplantasi Karang', role: 'Tanam fragmen karang tangguh', ic: 'coral', quota: 8, fx: S => S.prod = cl(S.prod + 9) },
      { id: 'ikan', label: 'Tebar Ikan Karang', role: 'Kembalikan ikan pembersih karang', ic: 'fish', quota: 4, fx: S => S.herb = cl(S.herb + 8) }
    ],
    stats: [
      ['heat', 'Suhu Air Laut', 'sun', -1, 'Air terlalu panas memicu pemutihan karang (bleaching). Dinginkan!'],
      ['prod', 'Terumbu Karang', 'coral', 1, 'Karang adalah produsen dan rumah jutaan ikan karang laut.'],
      ['herb', 'Ikan Karang', 'fish', 1, 'Ikan karang memakan alga penutup karang dan jadi mangsa hiu.'],
      ['pred', 'Penyu & Hiu', 'paw', 1, 'Penyu dan hiu adalah penjaga kebersihan ekosistem laut.']
    ],
    targets: [
      { l: 'Suhu air turun sampai 35', c: S => S.heat <= 35 },
      { l: 'Terumbu karang pulih (45)', c: S => S.prod >= 45 },
      { l: 'Kesehatan laut 75%', c: S => S.health >= 75 }
    ],
    tips: [
      'Karang hanya dapat pulih bila suhu air sejuk. Pasang naungan peneduh!',
      'Karang yang memutih belum mati! Dinginkan air agar ganggang kembali bersimbiosis.',
      'Ikan karang membantu memakan lumut parasit yang menempel pada karang.'
    ],
    quiz: {
      q: 'Suhu air laut memanas dan karang menjadi putih pucat. Mengapa ikan karang ikut menghilang?',
      opts: [
        'Karang yang memutih mati, sehingga ikan kehilangan rumah dan tempat berlindung.',
        'Ikan karang takut melihat warna putih pada terumbu.',
        'Ikan karang pergi ke daratan untuk mencari udara dingin.'
      ],
      correct: 0,
      explain: 'Terumbu karang adalah habitat dan tempat mencari makan utama. Jika karang memutih dan mati, struktur terumbu runtuh sehingga ikan karang tidak memiliki tempat berlindung dari pemangsa.'
    },
    chain: ['Air laut memanas', 'Karang memutih', 'Ikan kehilangan rumah', 'Hiu kehabisan mangsa']
  },

  {
    id: 'laut-2',
    biome: 'laut',
    type: 'alam',
    par: 45,
    title: 'Misi 2: Gelombang Badai Tropis & Karang Roboh',
    headline: 'Badai ombak besar merobohkan karang cabang dan mengubur padang lamun!',
    task: 'Pasang struktur spider karang, bebaskan padang lamun, lepas tukik penyu!',
    story: 'Detektif! Gelombang badai tropis besar menghempas terumbu karang dangkal. Ratusan karang cabang patah berkeping-keping dan pasir menutupi padang lamun makanan penyu. Ayo selamatkan!',
    init: { prod: 20, herb: 14, pred: 3, storm: 65 },
    tick(S) {
      S.storm = cl(S.storm - 1.2, 0, 100);
      S.prod = cl(S.prod + (S.storm < 30 ? 1.4 : -0.8));
      S.herb = cl(S.herb + (S.prod > 25 ? 0.8 : -0.6));
    },
    health(S) {
      return Math.round(100 * (0.34 * c01(S.prod / 50) + 0.3 * c01(1 - S.storm / 70) + 0.18 * c01(S.herb / 22) + 0.18 * c01(S.pred / 5)));
    },
    actions: [
      { id: 'struktur', label: 'Pasang Rangka Spider Karang', role: 'Kaitkan patahan karang ke rangka besi', ic: 'coral', quota: 6, fx: S => { S.prod = cl(S.prod + 10); S.storm = cl(S.storm - 15, 0, 100); } },
      { id: 'bersih_pasir', label: 'Bebaskan Padang Lamun', role: 'Singkirkan pasir penutup rumput laut', ic: 'sprout', quota: 4, fx: S => S.storm = cl(S.storm - 25, 0, 100) },
      { id: 'penyu', label: 'Lepas Tukik Penyu Hijau', role: 'Kembalikan penyu ke padang lamun', ic: 'paw', quota: 4, fx: S => { S.pred = cl(S.pred + 2); S.herb = cl(S.herb + 6); } }
    ],
    stats: [
      ['storm', 'Dampak Badai Ombak', 'wave', -1, 'Hempasan gelombang badai mematahkan karang bercabang.'],
      ['prod', 'Terumbu Karang', 'coral', 1, 'Rangka terumbu buatan menahan dasar pasir dari abrasi ombak.'],
      ['herb', 'Padang Lamun & Ikan', 'sprout', 1, 'Padang lamun adalah sumber makanan utama penyu hijau.'],
      ['pred', 'Penyu Hijau', 'paw', 1, 'Penyu hijau memakan lamun tua agar tunas baru bertumbuh.']
    ],
    targets: [
      { l: 'Dampak badai mereda (20)', c: S => S.storm <= 20 },
      { l: 'Terumbu terpasang kokoh (45)', c: S => S.prod >= 45 },
      { l: 'Kesehatan laut 75%', c: S => S.health >= 75 }
    ],
    tips: [
      'Patahan karang masih hidup! Pasang ke rangka spider agar dapat bertumbuh kembali.',
      'Padang lamun yang tertimbun pasir harus dibebaskan untuk makanan penyu.',
      'Tukik penyu hijau akan menjaga kesehatan padang lamun laut kita.'
    ],
    quiz: {
      q: 'Terumbu karang yang sehat terbukti mampu meredam 97% energi gelombang ombak badai. Apa manfaatnya bagi pantai?',
      opts: [
        'Mencegah abrasi pantai dan melindungi desa pesisir dari terjangan gelombang tinggi.',
        'Membuat air laut berubah menjadi air tawar yang bisa langsung diminum.',
        'Menghentikan angin laut agar tidak bertiup ke daratan.'
      ],
      correct: 0,
      explain: 'Struktur keras terumbu karang bertindak sebagai pemecah gelombang alami. Tanpa terumbu karang, ombak badai langsung menghantam garis pantai, merusak rumah warga, dan mengikis pasir pantai.'
    },
    chain: ['Badai ombak besar', 'Karang patah roboh', 'Padang lamun tertimbun', 'Pesisir terancam abrasi']
  },

  {
    id: 'laut-3',
    biome: 'laut',
    type: 'manusia',
    par: 45,
    title: 'Misi 3: Bom Ikan Peledak Penghancur Karang',
    headline: 'Bom ikan meledakkan terumbu ratusan tahun menjadi serpihan puing!',
    task: 'Patroli laut sita bom ikan, tanam bibit karang acropora, kembalikan ikan badut!',
    story: 'Detektif! Pemburu liar menggunakan bom botol peledak di taman terumbu karang. Karang yang tumbuh ratusan tahun hancur berkeping-keping menjadi kuburan batu. Amankan laut dan pulihkan karang!',
    init: { prod: 18, herb: 14, pred: 2, bomb: 62 },
    tick(S) {
      S.bomb = cl(S.bomb + 0.9, 0, 100);
      S.prod = cl(S.prod - (S.bomb > 20 ? 1.5 : 0));
      S.herb = cl(S.herb - (S.bomb > 25 ? 1.2 : -0.5));
      S.pred = cl(S.pred - (S.bomb > 30 ? 0.3 : 0));
    },
    health(S) {
      return Math.round(100 * (0.32 * c01(S.prod / 50) + 0.32 * c01(1 - S.bomb / 70) + 0.18 * c01(S.herb / 22) + 0.18 * c01(S.pred / 5)));
    },
    actions: [
      { id: 'sita_bom', label: 'Patroli Laut & Sita Bom', role: 'Hentikan pemburu bom botol', ic: 'bomb', quota: 4, fx: S => S.bomb = cl(S.bomb - 35, 0, 100) },
      { id: 'bibit_karang', label: 'Tanam Karang Acropora', role: 'Transplantasi karang cabang baru', ic: 'coral', quota: 6, fx: S => S.prod = cl(S.prod + 10) },
      { id: 'ikan_hias', label: 'Kembalikan Ikan Karang', role: 'Tebar ikan badut & kerapu', ic: 'fish', quota: 4, fx: S => { S.herb = cl(S.herb + 8); S.pred = cl(S.pred + 2); } }
    ],
    stats: [
      ['bomb', 'Ancaman Bom Ikan', 'bomb', -1, 'Ledakan bom menghancurkan struktur karang ratusan tahun. Hentikan!'],
      ['prod', 'Terumbu Karang', 'coral', 1, 'Karang adalah benteng laut pelindung keanekaragaman samudra.'],
      ['herb', 'Ikan Karang', 'fish', 1, 'Ikan membutuhkan celah-celah karang untuk bertelur dan tidur.'],
      ['pred', 'Penyu & Ikan Predator', 'paw', 1, 'Ikan besar menjaga keseimbangan trofik terumbu karang.']
    ],
    targets: [
      { l: 'Bom ikan dihentikan sampai 15', c: S => S.bomb <= 15 },
      { l: 'Karang mulai tumbuh (45)', c: S => S.prod >= 45 },
      { l: 'Kesehatan laut 75%', c: S => S.health >= 75 }
    ],
    tips: [
      'Bom ikan merusak habitat hingga puluhan tahun. Lakukan patroli laut!',
      'Tanam bibit karang acropora di atas media keras agar tumbuh cepat.',
      'Ikan badut dan kerapu akan kembali jika rumah karangnya sudah dipulihkan.'
    ],
    quiz: {
      q: 'Satu ledakan bom ikan membutuhkan waktu berapa lama agar terumbu karang dapat pulih seperti semula?',
      opts: [
        'Puluhan hingga ratusan tahun karena pertumbuhan karang sangat lambat (1–2 cm per tahun).',
        'Hanya butuh waktu satu minggu setelah ombak tenang.',
        'Karang langsung tumbuh seketika saat terkena air garam.'
      ],
      correct: 0,
      explain: 'Karang batu hanya tumbuh sekitar 1 hingga 2 cm per tahun. Ledakan bom menghancurkan rangka kapur menjadi serpihan pasir mati yang membutuhkan waktu 30 hingga 100 tahun untuk pulih.'
    },
    chain: ['Bom ikan diledakkan', 'Karang hancur berkeping', 'Ikan kehilangan sarang', 'Laut menjadi kuburan batu']
  },

  {
    id: 'laut-4',
    biome: 'laut',
    type: 'manusia',
    par: 45,
    title: 'Misi 4: Sampah Plastik Samudra & Pukat Hanyut',
    headline: 'Kantong plastik mencekik penyu dan jaring pukat trawl meratakan dasar laut!',
    task: 'Kutip sampah plastik mengapung, sita jaring pukat trawl, rawat penyu hijau!',
    story: 'Detektif! Berton-ton sampah kantong plastik mencemari laut dan ditelan penyu yang mengiranya ubur-ubur. Di dasar laut, kapal besar menarik jaring pukat trawl yang meratakan karang. Selamatkan penyu dan laut!',
    init: { prod: 25, herb: 15, pred: 2, trash: 65, net: 58 },
    tick(S) {
      S.trash = cl(S.trash + 0.8, 0, 100);
      S.net = cl(S.net + 0.7, 0, 100);
      S.pred = cl(S.pred - (S.trash > 25 ? 0.35 : 0));
      S.prod = cl(S.prod - (S.net > 20 ? 1.2 : 0));
      S.herb = cl(S.herb - (S.net > 25 ? 1.0 : -0.4));
    },
    health(S) {
      return Math.round(100 * (0.28 * c01(1 - S.trash / 70) + 0.28 * c01(1 - S.net / 65) + 0.24 * c01(S.prod / 45) + 0.2 * c01(S.pred / 4)));
    },
    actions: [
      { id: 'kutip_plastik', label: 'Kutip Sampah Plastik', role: 'Angkut kantong & sedotan plastik', ic: 'bin', quota: 4, fx: S => S.trash = cl(S.trash - 32, 0, 100) },
      { id: 'sita_trawl', label: 'Sita Jaring Pukat Trawl', role: 'Hentikan pukat perusak dasar karang', ic: 'net', quota: 3, fx: S => S.net = cl(S.net - 35, 0, 100) },
      { id: 'rawat_penyu', label: 'Bebaskan & Rawat Penyu', role: 'Lepaskan penyu dari lilitan jaring', ic: 'paw', quota: 4, fx: S => { S.pred = cl(S.pred + 2); S.trash = cl(S.trash - 8, 0, 100); } }
    ],
    stats: [
      ['trash', 'Sampah Plastik', 'bin', -1, 'Plastik membunuh penyu karena dikira ubur-ubur makanan mereka.'],
      ['net', 'Jaring Pukat Trawl', 'net', -1, 'Pukat harimau mengeruk dasar laut dan merusak karang.'],
      ['prod', 'Padang Terumbu', 'coral', 1, 'Karang bebas dari jeratan jaring hanyut (ghost net).'],
      ['pred', 'Penyu Hijau', 'paw', 1, 'Penyu hijau memakan ubur-ubur dan menjaga kebersihan lamun.']
    ],
    targets: [
      { l: 'Sampah plastik dikutip sampai 15', c: S => S.trash <= 15 },
      { l: 'Pukat trawl dihentikan sampai 15', c: S => S.net <= 15 },
      { l: 'Kesehatan laut 75%', c: S => S.health >= 75 }
    ],
    tips: [
      'Penyu sering menelan kantong plastik karena mirip ubur-ubur. Kutip plastik segera!',
      'Jaring trawl mengeruk apa pun di dasar laut. Sita pukat trawl ilegal!',
      'Rawat penyu yang terlilit tali jaring dan kembalikan ke laut lepas.'
    ],
    quiz: {
      q: 'Mengapa sampah kantong plastik transparan di laut sangat mematikan bagi penyu hijau?',
      opts: [
        'Penyu mengira kantong plastik mengapung adalah ubur-ubur makanannya.',
        'Plastik membuat penyu tidak bisa menyelam ke dasar laut.',
        'Penyu mengira plastik adalah cangkang telur mereka.'
      ],
      correct: 0,
      explain: 'Bagi mata penyu laut, kantong plastik putih yang melayang di air terlihat persis seperti ubur-ubur mangsa alaminya. Plastik yang tertelan menyumbat saluran cerna penyu hingga menyebabkan kematian.'
    },
    chain: ['Sampah plastik dibuang', 'Penyu mengira ubur-ubur', 'Saluran cerna tersumbat', 'Penyu langka mati']
  }
];

/* Peristiwa acak — menyentuh variabel yang ADA di semua misi bioma itu */
const EVENTS = {
  sawah: [
    { t: 'Hujan gerimis turun! Air sawah bertambah.', fx: S => S.water = cl((S.water || 50) + 8, 0, 100) },
    { t: 'Burung hantu berpatroli malam di sawah!', fx: S => { if (S.herb) S.herb = cl(S.herb - 3, 0, 100); if (S.wereng) S.wereng = cl(S.wereng - 4, 0, 100); } },
    { t: 'Matahari cerah bersinar! Padi berfotosintesis lebih cepat.', fx: S => S.prod = cl((S.prod || 40) + 3) }
  ],
  hutan: [
    { t: 'Hujan rimba lebat menyegarkan hutan!', fx: S => S.water = cl((S.water || 50) + 8, 0, 100) },
    { t: 'Kawanan satwa liar minum di mata air terlindungi!', fx: S => S.herb = cl((S.herb || 15) + 3) },
    { t: 'Serasah daun menumpuk dan diurai menjadi humus subur.', fx: S => S.prod = cl((S.prod || 40) + 3) }
  ],
  sungai: [
    { t: 'Air pegunungan mengalir deras membawa oksigen segar!', fx: S => S.water = cl((S.water || 50) + 8, 0, 100) },
    { t: 'Warga desa melepas bibit ikan lokal ke sungai!', fx: S => S.herb = cl((S.herb || 15) + 4) },
    { t: 'Tanaman air berbunga menyerap zat hara alami.', fx: S => S.prod = cl((S.prod || 30) + 3) }
  ],
  laut: [
    { t: 'Arus samudra yang sejuk naik menyegarkan terumbu karang!', fx: S => S.prod = cl((S.prod || 30) + 3) },
    { t: 'Kawanan ikan baru datang berlindung di celah karang!', fx: S => S.herb = cl((S.herb || 15) + 4) },
    { t: 'Penyu hijau bertelur dengan aman di pasir pantai!', fx: S => S.pred = cl((S.pred || 3) + 1) }
  ]
};

const STATMAX = {
  prod: 70,
  herb: 70,
  pred: 10,
  water: 100,
  poison: 100,
  trash: 100,
  gulma: 100,
  trap: 100,
  heat: 100,
  bomb: 100,
  wereng: 100,
  api: 100,
  lumpur: 100,
  storm: 100,
  net: 100
};

/* ================= DATA: BRIDGING DIALOG 16 MISI ================= */
const BRIDGE_DATA = {
  'sawah-1': {
    step1: {
      title: 'Krisis Air: Tanah Retak & Padi Layu',
      text: 'Waduh teman-teman! Musim kemarau panjang membuat saluran irigasi kering kerontang. Tanah sawah retak-retak dan tunas padi mulai layu kehausan!',
      gitaExpr: 'worried'
    },
    step2: {
      title: 'Rencana Pemulihan Ekosistem Sawah',
      text: 'Langkah pertama kita: segera tekan kartu <b>Alirkan Air Irigasi</b> di bawah agar tanah sawah gembur kembali dan siap ditanami bibit padi baru!',
      gitaExpr: 'talk'
    }
  },
  'sawah-2': {
    step1: {
      title: 'Serangan Hama: Wereng Cokelat Menyerbu',
      text: 'Gawat sekali! Cuaca lembap membuat jutaan wereng cokelat berkembang biak dan menghisap cairan batang padi sampai menguning kering.',
      gitaExpr: 'worried'
    },
    step2: {
      title: 'Gunakan Musuh Alami Alami',
      text: 'Jangan pakai racun berbahaya! Segera tekan kartu <b>Lepas Katak & Laba-Laba</b> dan semprot ekstrak mimba nabati agar wereng terkendali.',
      gitaExpr: 'talk'
    }
  },
  'sawah-3': {
    step1: {
      title: 'Pencemaran Kimia: Racun Pestisida Berlebih',
      text: 'Petani menyemprot racun kimia terlalu banyak! Air sawah beracun, cacing tanah mati, dan katak pemakan serangga ikut keracunan.',
      gitaExpr: 'worried'
    },
    step2: {
      title: 'Bilas Racun & Tebar Kompos',
      text: 'Langkah penyelamatan: segera tekan <b>Bilas Residu Racun</b>, lalu kembalikan katak sawah dan pupuk kompos agar tanah kembali gembur!',
      gitaExpr: 'talk'
    }
  },
  'sawah-4': {
    step1: {
      title: 'Rantai Makanan Putus: Ular Diburu Jerat',
      text: 'Ada perburuan ular sawah liar dan kawat jerat dipasang di mana-mana! Akibatnya kawanan tikus membludak memakan habis padi petani.',
      gitaExpr: 'worried'
    },
    step2: {
      title: 'Sita Jerat & Lindungi Pemangsa',
      text: 'Langkah darurat: segera tekan <b>Sita Kawat Jerat Liar</b>, lalu lepas ular sawah dan pasang sarang burung hantu untuk memburu tikus malam!',
      gitaExpr: 'talk'
    }
  },

  'hutan-1': {
    step1: {
      title: 'Krisis Rimba: Mata Air Kering & Pakan Layu',
      text: 'Hutan rimba kita terancam! Kemarau panjang membuat mata air rimba mengering. Rumput pakan rusa layu dan pohon-pohon mulai meranggas!',
      gitaExpr: 'worried'
    },
    step2: {
      title: 'Alirkan Air & Hijaukan Kembali',
      text: 'Langkah pertama kita: segera tekan kartu <b>Alirkan Mata Air</b> di bawah agar tanah rimba kembali lembap dan pohon peneduh terselamatkan!',
      gitaExpr: 'talk'
    }
  },
  'hutan-2': {
    step1: {
      title: 'Bara Rimba: Gesekan Ranting & Asap Tebal',
      text: 'Angin kencang dan gesekan dahan kering memicu titik api rimba! Asap tebal membuat burung dan rusa sesak napas. Lindungi hutan kita!',
      gitaExpr: 'worried'
    },
    step2: {
      title: 'Padamkan Bara & Buat Sekat Bakar',
      text: 'Segera tekan kartu <b>Padamkan Titik Api</b> dan buat sekat bakar basah agar lidah api tidak merambat ke pohon raksasa lainnya!',
      gitaExpr: 'talk'
    }
  },
  'hutan-3': {
    step1: {
      title: 'Bencana Longsor: Pembalakan Liar Pohon',
      text: 'Pembalak liar menebang pohon meranti raksasa! Bukit menjadi botak dan bila hujan deras turun, longsor besar akan mengancam desa di bawah.',
      gitaExpr: 'worried'
    },
    step2: {
      title: 'Patroli Tegas & Tanam Pohon Meranti',
      text: 'Langkah pertama: segera tekan <b>Patroli Tangkap Pembalak</b>, lalu tanam bibit pohon meranti agar akarnya menahan tanah lereng bukit!',
      gitaExpr: 'talk'
    }
  },
  'hutan-4': {
    step1: {
      title: 'Satwa Terancam: Jerat Maut Harimau Sumatera',
      text: 'Pemburu liar memasang jerat kawat baja di jalur satwa! Harimau Sumatera terluka kakinya dan hampir tidak bisa berburu lagi.',
      gitaExpr: 'worried'
    },
    step2: {
      title: 'Sita Jerat & Obati Harimau',
      text: 'Langkah penyelamatan: segera tekan <b>Sita Jerat Kawat Baja</b>, lalu obati harimau dan pasang kamera pemantau patroli rimba!',
      gitaExpr: 'talk'
    }
  },

  'sungai-1': {
    step1: {
      title: 'Permukaan Tertutup: Eceng Gondok Liar',
      text: 'Aliran sungai surut dan eceng gondok tumbuh terlalu lebat menutupi permukaan air. Sinar matahari terhalang dan ikan lemas kehabisan oksigen!',
      gitaExpr: 'worried'
    },
    step2: {
      title: 'Buka Aliran & Bersihkan Gulma',
      text: 'Langkah pertama kita: segera tekan <b>Buka Pintu Air Hulu</b> atau <b>Angkat Gulma Liar</b> agar sinar matahari dan oksigen masuk kembali!',
      gitaExpr: 'talk'
    }
  },
  'sungai-2': {
    step1: {
      title: 'Pendangkalan: Lumpur Erosi Menimbun Sungai',
      text: 'Tebing hulu longsor terbawa hujan deras! Lumpur tebal membuat air keruh cokelat, dasar sungai mendangkal, dan insang ikan tersumbat lumpur.',
      gitaExpr: 'worried'
    },
    step2: {
      title: 'Keruk Lumpur & Tanam Rumput Tebing',
      text: 'Segera tekan kartu <b>Keruk Endapan Lumpur</b> dan tanam rumput vetiver penahan tebing agar tanah tidak runtuh kembali ke sungai!',
      gitaExpr: 'talk'
    }
  },
  'sungai-3': {
    step1: {
      title: 'Pencemaran Berat: Limbah Pabrik & Plastik',
      text: 'Pabrik membuang limbah busa detergen beracun ke sungai! Ikan-ikan keracunan dan bangau yang memakan ikan ikut menderita.',
      gitaExpr: 'worried'
    },
    step2: {
      title: 'Hentikan Sumber Racun & Bersihkan',
      text: 'Langkah penyelamatan: segera tekan kartu <b>Saring Limbah Pabrik</b> agar racun detergen berhenti mengalir, lalu angkut sampah plastik!',
      gitaExpr: 'talk'
    }
  },
  'sungai-4': {
    step1: {
      title: 'Kejahatan Air: Alat Setrum & Racun Tuba',
      text: 'Ada penangkapan ikan memakai setrum listrik aki dan racun tuba! Bukan cuma ikan besar, telur dan benih ikan kecil ikut mati mengambang.',
      gitaExpr: 'worried'
    },
    step2: {
      title: 'Sita Alat Setrum & Lepas Benih',
      text: 'Langkah tegas: segera tekan <b>Sita Alat Setrum Aki</b>, netralkan racun tuba, dan lepas bibit ikan gabus untuk memulihkan generasi sungai!',
      gitaExpr: 'talk'
    }
  },

  'laut-1': {
    step1: {
      title: 'Pemanasan Samudra: Terumbu Karang Memutih',
      text: 'Suhu air laut memanas ekstrem! Terumbu karang mengalami pemutihan (bleaching) massal dan ikan-ikan kehilangan rumah tempat berlindung.',
      gitaExpr: 'worried'
    },
    step2: {
      title: 'Pasang Naungan & Transplantasi Karang',
      text: 'Langkah pertama kita: segera pasang <b>Pasang Naungan Terumbu</b> untuk mendinginkan karang, lalu tanam fragmen karang tangguh!',
      gitaExpr: 'talk'
    }
  },
  'laut-2': {
    step1: {
      title: 'Dihantam Badai: Karang Patah & Lamun Tertimbun',
      text: 'Gelombang badai tropis besar menghempas terumbu dangkal! Karang cabang patah roboh dan padang lamun makanan penyu tertimbun pasir tebal.',
      gitaExpr: 'worried'
    },
    step2: {
      title: 'Pasang Spider Karang & Bebaskan Lamun',
      text: 'Segera tekan kartu <b>Pasang Rangka Spider Karang</b> untuk menegakkan patahan karang, dan bersihkan padang lamun agar penyu hijau kenyang!',
      gitaExpr: 'talk'
    }
  },
  'laut-3': {
    step1: {
      title: 'Ledakan Dahsyat: Bom Ikan Penghancur Karang',
      text: 'Nelayan nakal meledakkan bom ikan di taman karang! Karang ratusan tahun hancur menjadi serpihan batu mati dan dasar laut menjadi sunyi.',
      gitaExpr: 'worried'
    },
    step2: {
      title: 'Patroli Laut & Tanam Karang Acropora',
      text: 'Langkah darurat: segera tekan kartu <b>Patroli Laut & Sita Bom</b> untuk mengamankan wilayah laut, lalu tanam bibit karang acropora baru!',
      gitaExpr: 'talk'
    }
  },
  'laut-4': {
    step1: {
      title: 'Bahaya Plastik & Pukat: Penyu Hijau Terlilit',
      text: 'Berton-ton sampah kantong plastik ditelan penyu yang mengiranya ubur-ubur, dan jaring trawl meratakan dasar karang samudra kita!',
      gitaExpr: 'worried'
    },
    step2: {
      title: 'Kutip Plastik & Selamatkan Penyu',
      text: 'Langkah pertama: segera tekan kartu <b>Kutip Sampah Plastik</b>, sita pukat trawl, dan rawat penyu hijau dari lilitan jaring hanyut!',
      gitaExpr: 'talk'
    }
  }
};
