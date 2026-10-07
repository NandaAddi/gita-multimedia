/* ============================================================
   ECO-EXPLORER — js/data/assessment.js
   Bank Soal Pretest & Posttest, CP, dan 4 Tujuan Pembelajaran
   IPAS Fase C Kelas V SD — Model Alessi & Trollip (2001)
   ============================================================ */

const ASSESSMENT_CP = "Capaian pembelajaran Ilmu Pengetahuan Alam dan Sosial pada Fase C (kelas V SD) menekankan kemampuan peserta didik dalam memahami hingga menganalisis bagaimana alam semesta seperti hubungan antar komponen biotik dan abiotik, serta lingkungan sosial pengaruh terhadap ekosistem yang dapat terjadi di sekitarnya.";

const ASSESSMENT_TP = [
  {
    id: 1,
    badge: "TP 1",
    title: "Komponen Biotik & Abiotik",
    desc: "Peserta didik mampu mengidentifikasi komponen biotik dan abiotik dalam berbagai jenis ekosistem.",
    color: "#10b981",
    questionCount: 6
  },
  {
    id: 2,
    badge: "TP 2",
    title: "Rantai & Jaring Makanan 4 Bioma",
    desc: "Peserta didik mampu memahami hubungan rantai makanan dan jaring-jaring makanan pada ekosistem hutan tropis, laut, sawah, dan sungai.",
    color: "#0284c7",
    questionCount: 8
  },
  {
    id: 3,
    badge: "TP 3",
    title: "Prediksi Dinamika Populasi C2",
    desc: "Peserta didik mampu memprediksi dampak perubahan jumlah populasi komponen biotik terhadap rantai makanan dalam suatu ekosistem.",
    color: "#f59e0b",
    questionCount: 4
  },
  {
    id: 4,
    badge: "TP 4",
    title: "Keseimbangan & Dampak Manusia",
    desc: "Peserta didik mampu menganalisis dampak perubahan populasi komponen biotik terhadap keseimbangan ekosistem, serta dampak aktivitas manusia terhadap keseimbangan ekosistem.",
    color: "#ef4444",
    questionCount: 5
  }
];

const PRETEST_POSTTEST_BANK = [
  {
    id: 1,
    q: "Berikut yang termasuk komponen abiotik dalam ekosistem sawah adalah. ....",
    opts: ["Padi", "Air", "Burung pipit", "Tikus"],
    correct: 1,
    tpId: 1,
    tpName: "TP 1: Biotik & Abiotik",
    biome: "sawah",
    level: "C1",
    explain: "Komponen abiotik adalah benda tak hidup penyusun ekosistem. Air, tanah, udara, dan sinar matahari adalah contoh abiotik sawah. Padi, burung pipit, dan tikus adalah komponen biotik (makhluk hidup)."
  },
  {
    id: 2,
    q: "Makhluk hidup yang berperan sebagai pengurai dalam ekosistem adalah...",
    opts: ["Tumbuhan", "Bakteri dan jamur", "Burung", "Matahari"],
    correct: 1,
    tpId: 1,
    tpName: "TP 1: Biotik & Abiotik",
    biome: "umum",
    level: "C1",
    explain: "Bakteri dan jamur adalah organisme dekomposer (pengurai) yang menguraikan sisa-sisa makhluk hidup mati menjadi zat hara penyubur tanah."
  },
  {
    id: 3,
    q: "Komponen abiotik yang paling berpengaruh terhadap proses fotosintesis tumbuhan adalah...",
    opts: ["Cahaya matahari", "Suhu", "Tanah", "Udara"],
    correct: 0,
    tpId: 1,
    tpName: "TP 1: Biotik & Abiotik",
    biome: "umum",
    level: "C2",
    explain: "Cahaya matahari merupakan sumber energi utama yang diserap klorofil daun untuk memasak makanan melalui proses fotosintesis."
  },
  {
    id: 4,
    q: "Dalam ekosistem laut, contoh komponen biotik adalah...",
    opts: ["Air laut", "Garam", "Ikan", "Suhu air"],
    correct: 2,
    tpId: 1,
    tpName: "TP 1: Biotik & Abiotik",
    biome: "laut",
    level: "C1",
    explain: "Ikan adalah makhluk hidup (komponen biotik) di laut, sedangkan air laut, garam mineral, dan suhu air adalah komponen abiotik (benda tak hidup)."
  },
  {
    id: 5,
    q: "Pada ekosistem laut, plankton berperan sebagai...",
    opts: ["Konsumen tingkat tinggi", "Produsen", "Pengurai", "Predator utama"],
    correct: 1,
    tpId: 2,
    tpName: "TP 2: Rantai Makanan",
    biome: "laut",
    level: "C2",
    explain: "Fitoplankton di laut memiliki klorofil dan mampu berfotosintesis menghasilkan energi makanan sendiri, sehingga berperan sebagai produsen utama lautan."
  },
  {
    id: 6,
    q: "Urutan rantai makanan yang tepat pada ekosistem sawah adalah...",
    opts: [
      "padi → ular → tikus → elang",
      "elang → ular → tikus → padi",
      "elang → tikus → ular → padi",
      "padi → tikus → ular → elang"
    ],
    correct: 3,
    tpId: 2,
    tpName: "TP 2: Rantai Makanan",
    biome: "sawah",
    level: "C2",
    explain: "Rantai makanan dimulai dari produsen (padi) dimakan konsumen I (tikus), lalu dimakan konsumen II (ular), dan dimakan konsumen puncak (elang)."
  },
  {
    id: 7,
    q: "Fungsi utama komponen abiotik seperti air dan udara bagi makhluk hidup adalah...",
    opts: [
      "Sebagai makanan",
      "Sebagai tempat tinggal",
      "Mendukung keberlangsungan hidup",
      "Sebagai predator"
    ],
    correct: 2,
    tpId: 1,
    tpName: "TP 1: Biotik & Abiotik",
    biome: "umum",
    level: "C2",
    explain: "Air dan udara menyediakan oksigen untuk bernapas, cairan tubuh organisme, dan mendukung seluruh proses kelangsungan hidup di bumi."
  },
  {
    id: 8,
    q: "Dalam ekosistem hutan tropis, rusa yang memakan tumbuhan termasuk dalam kelompok...",
    opts: ["Konsumen tingkat I", "Konsumen tingkat III", "Pengurai", "Produsen"],
    correct: 0,
    tpId: 2,
    tpName: "TP 2: Rantai Makanan",
    biome: "hutan",
    level: "C2",
    explain: "Hewan herbivora (pemakan tumbuhan) seperti rusa yang memakan produsen secara langsung dikelompokkan sebagai Konsumen Tingkat I."
  },
  {
    id: 9,
    q: "Singa yang memakan rusa berperan sebagai...",
    opts: ["Konsumen tingkat I", "Konsumen tingkat II", "Pengurai", "Predator utama"],
    correct: 1,
    tpId: 2,
    tpName: "TP 2: Rantai Makanan",
    biome: "hutan",
    level: "C2",
    explain: "Singa memakan konsumen tingkat I (rusa), sehingga singa menempati tingkatan trofik sebagai Konsumen Tingkat II (karnivora pemangsa)."
  },
  {
    id: 10,
    q: "Jaring-jaring makanan terbentuk karena...",
    opts: [
      "Beberapa rantai makanan saling berhubungan",
      "Hanya ada satu jenis makanan",
      "Tidak ada produsen",
      "Semua hewan adalah karnivora"
    ],
    correct: 0,
    tpId: 2,
    tpName: "TP 2: Rantai Makanan",
    biome: "umum",
    level: "C2",
    explain: "Di alam bebas, makhluk hidup memakan lebih dari satu jenis organisme, sehingga berbagai rantai makanan saling terhubung membentuk jaring-jaring makanan."
  },
  {
    id: 11,
    q: "Urutan rantai makanan yang tepat pada ekosistem sawah adalah...",
    opts: [
      "Padi → ular → tikus → elang",
      "Elang → ular → tikus → padi",
      "Padi → tikus → ular → elang",
      "Elang → tikus → ular → padi"
    ],
    correct: 2,
    tpId: 2,
    tpName: "TP 2: Rantai Makanan",
    biome: "sawah",
    level: "C2",
    explain: "Alur transfer energi yang tepat adalah dari produsen (padi) ke herbivora (tikus), ke karnivora pemangsa (ular), hingga ke burung elang."
  },
  {
    id: 12,
    q: "Contoh rantai makanan yang tepat pada ekosistem sungai adalah...",
    opts: [
      "Ikan besar → ikan kecil → fitoplankton",
      "Fitoplankton → ikan kecil → ikan besar",
      "Ikan kecil → fitoplankton → ikan besar",
      "Fitoplankton → ikan besar → ikan kecil"
    ],
    correct: 1,
    tpId: 2,
    tpName: "TP 2: Rantai Makanan",
    biome: "sungai",
    level: "C2",
    explain: "Di sungai, fitoplankton sebagai produsen dimakan oleh ikan kecil (konsumen I), kemudian ikan kecil dimakan oleh ikan besar (konsumen II)."
  },
  {
    id: 13,
    q: "Di ekosistem hutan tropis terdapat tumbuhan, belalang, katak, dan ular. Urutan rantai makanan yang tepat adalah...",
    opts: [
      "Ular → katak → belalang → tumbuhan",
      "Belalang → tumbuhan → ular → katak",
      "Tumbuhan → belalang → katak → ular",
      "Katak → belalang → tumbuhan → ular"
    ],
    correct: 2,
    tpId: 2,
    tpName: "TP 2: Rantai Makanan",
    biome: "hutan",
    level: "C2",
    explain: "Tumbuhan (produsen) dimakan belalang (konsumen I), belalang dimakan katak (konsumen II), dan katak dimakan ular (konsumen III/puncak)."
  },
  {
    id: 14,
    q: "Di ekosistem sawah, tikus memakan padi dan juga dimakan oleh ular serta burung hantu. Kondisi ini menunjukkan bahwa tikus...",
    opts: [
      "Menjadi penghubung dalam jaring-jaring makanan",
      "Hanya menjadi bagian dari satu rantai makanan",
      "Berperan sebagai produsen",
      "Tidak memiliki predator alami"
    ],
    correct: 0,
    tpId: 2,
    tpName: "TP 2: Rantai Makanan",
    biome: "sawah",
    level: "C2",
    explain: "Karena tikus dimakan oleh lebih dari satu pemangsa (ular dan burung hantu), tikus menjadi organisme penghubung cabang dalam jaring-jaring makanan."
  },
  {
    id: 15,
    q: "Upaya yang tepat untuk menjaga keseimbangan ekosistem sawah adalah…",
    opts: [
      "Membasmi semua hama tanpa terkecuali",
      "Menjaga kelestarian predator alami seperti ular dan burung",
      "Menebang pohon di sekitar sawah",
      "Membuang sampah ke sungai dekat sawah"
    ],
    correct: 1,
    tpId: 4,
    tpName: "TP 4: Keseimbangan & Manusia",
    biome: "sawah",
    level: "C4",
    explain: "Melestarikan predator alami seperti ular dan burung pemangsa mengendalikan populasi tikus sawah secara seimbang tanpa merusak lingkungan dengan racun kimia."
  },
  {
    id: 16,
    q: "Jika populasi ular di sawah berkurang drastis, kemungkinan yang terjadi adalah...",
    opts: [
      "Populasi tikus meningkat",
      "Populasi padi meningkat",
      "Elang Punah",
      "Tidak ada perubahan"
    ],
    correct: 0,
    tpId: 3,
    tpName: "TP 3: Prediksi Dinamika",
    biome: "sawah",
    level: "C2",
    explain: "Ular adalah pemangsa alami tikus. Saat ular berkurang drastis, tidak ada yang memangsa tikus sehingga populasi tikus melonjak tajam dan merusak panen padi."
  },
  {
    id: 17,
    q: "Penebangan hutan secara liar dapat menyebabkan...",
    opts: [
      "Meningkatnya jumlah produsen",
      "Populasi hewan semakin stabil",
      "Populasi hewan semakin banyak",
      "Terganggunya keseimbangan ekosistem"
    ],
    correct: 3,
    tpId: 4,
    tpName: "TP 4: Keseimbangan & Manusia",
    biome: "hutan",
    level: "C2",
    explain: "Penebangan pohon liar merusak habitat satwa, menghilangkan produsen makanan, memicu banjir, dan merusak keseimbangan seluruh ekosistem hutan."
  },
  {
    id: 18,
    q: "Jika terjadi pencemaran air sungai, dampak yang mungkin terjadi adalah...",
    opts: [
      "Ikan semakin banyak",
      "Tumbuhan air tumbuh subur",
      "Ikan dan tumbuhan air mati",
      "Tidak terjadi dampak apapun"
    ],
    correct: 2,
    tpId: 4,
    tpName: "TP 4: Keseimbangan & Manusia",
    biome: "sungai",
    level: "C2",
    explain: "Limbah kimia dan racun mencemari air sungai, menurunkan kadar oksigen air, sehingga menyebabkan kematian massal pada ikan dan tanaman perairan."
  },
  {
    id: 19,
    q: "Perburuan liar terhadap predator seperti elang dapat menyebabkan...",
    opts: [
      "Populasi mangsa (tikus) menurun",
      "Populasi mangsa (tikus) meningkat pesat",
      "Keseimbangan ekosistem semakin membaik",
      "Ekosistem tidak mengalami perubahan"
    ],
    correct: 1,
    tpId: 3,
    tpName: "TP 3: Prediksi Dinamika",
    biome: "umum",
    level: "C2",
    explain: "Burung elang adalah predator puncak pengendali hewan pengerat. Jika elang diburu habis, populasi mangsa (tikus) akan melonjak pesat dan menjadi hama."
  },
  {
    id: 20,
    q: "Di ekosistem laut, jika populasi ikan besar menurun karena penangkapan berlebihan, dampak yang paling mungkin terjadi terhadap jaring-jaring makanan adalah...",
    opts: [
      "Populasi plankton langsung menurun",
      "Populasi ikan kecil menurun",
      "Populasi ikan kecil meningkat karena predatornya berkurang",
      "Tidak ada dampak karena ekosistem laut sangat luas"
    ],
    correct: 2,
    tpId: 3,
    tpName: "TP 3: Prediksi Dinamika",
    biome: "laut",
    level: "C2",
    explain: "Ikan besar memangsa ikan kecil. Saat ikan besar ditangkap berlebihan (overfishing), tekanan pemangsaan berkurang sehingga jumlah ikan kecil meningkat."
  }
];

// Node.js export compatibility
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    ASSESSMENT_CP,
    ASSESSMENT_TP,
    PRETEST_POSTTEST_BANK
  };
}
