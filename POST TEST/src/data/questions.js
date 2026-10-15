export const TOPICS = [
  "Komponen Ekosistem",
  "Rantai & Jaring Makanan",
  "Keseimbangan Ekosistem"
];

export const topicOf = (i) => (i < 7 ? 0 : (i < 14 ? 1 : 2));

export const QUESTIONS = [
  {
    q: "Berikut yang termasuk komponen abiotik dalam ekosistem sawah adalah ....",
    opts: ["Padi", "Air", "Burung pipit", "Tikus"],
    a: 1,
    why: "Komponen abiotik adalah benda tak hidup seperti air, tanah, udara, dan cahaya matahari. Padi, burung pipit, dan tikus adalah makhluk hidup (biotik)."
  },
  {
    q: "Makhluk hidup yang berperan sebagai pengurai dalam ekosistem adalah ....",
    opts: ["Tumbuhan", "Bakteri dan jamur", "Burung", "Matahari"],
    a: 1,
    why: "Pengurai (decomposer) seperti bakteri dan jamur menguraikan sisa makhluk hidup menjadi zat hara."
  },
  {
    q: "Komponen abiotik yang paling berpengaruh terhadap proses fotosintesis tumbuhan adalah ....",
    opts: ["Cahaya matahari", "Suhu", "Tanah", "Udara"],
    a: 0,
    why: "Fotosintesis membutuhkan cahaya matahari sebagai sumber energi untuk membuat makanan."
  },
  {
    q: "Dalam ekosistem laut, contoh komponen biotik adalah ....",
    opts: ["Air laut", "Garam", "Ikan", "Suhu air"],
    a: 2,
    why: "Ikan adalah makhluk hidup sehingga termasuk komponen biotik. Air laut, garam, dan suhu air tidak hidup (abiotik)."
  },
  {
    q: "Pada ekosistem laut, plankton berperan sebagai ....",
    opts: ["Konsumen tingkat tinggi", "Produsen", "Pengurai", "Predator utama"],
    a: 1,
    why: "Fitoplankton mampu membuat makanannya sendiri melalui fotosintesis, sehingga berperan sebagai produsen."
  },
  {
    q: "Urutan rantai makanan yang tepat pada ekosistem sawah adalah ....",
    opts: ["padi → ular → tikus → elang", "elang → ular → tikus → padi", "elang → tikus → ular → padi", "padi → tikus → ular → elang"],
    a: 3,
    why: "Rantai makanan selalu dimulai dari produsen (padi), lalu konsumen I (tikus), konsumen II (ular), dan konsumen III (elang)."
  },
  {
    q: "Fungsi utama komponen abiotik seperti air dan udara bagi makhluk hidup adalah ....",
    opts: ["Sebagai makanan", "Sebagai tempat tinggal", "Mendukung keberlangsungan hidup", "Sebagai predator"],
    a: 2,
    why: "Air dan udara adalah kebutuhan pokok semua makhluk hidup untuk bertahan hidup."
  },
  {
    q: "Dalam ekosistem hutan tropis, rusa yang memakan tumbuhan termasuk dalam kelompok ....",
    opts: ["Konsumen tingkat I", "Konsumen tingkat III", "Pengurai", "Produsen"],
    a: 0,
    why: "Rusa memakan tumbuhan (produsen), sehingga berperan sebagai konsumen tingkat I (herbivora)."
  },
  {
    q: "Singa yang memakan rusa berperan sebagai ....",
    opts: ["Konsumen tingkat I", "Konsumen tingkat II", "Pengurai", "Predator utama"],
    a: 1,
    why: "Singa memakan konsumen tingkat I (rusa), sehingga singa berperan sebagai konsumen tingkat II (karnivora)."
  },
  {
    q: "Jaring-jaring makanan terbentuk karena ....",
    opts: ["Beberapa rantai makanan saling berhubungan", "Hanya ada satu jenis makanan", "Tidak ada produsen", "Semua hewan adalah karnivora"],
    a: 0,
    why: "Jika beberapa rantai makanan bertemu dan saling berhubungan, terbentuklah jaring-jaring makanan."
  },
  {
    q: "Urutan rantai makanan yang tepat pada ekosistem sawah adalah ....",
    opts: ["Padi → ular → tikus → elang", "Elang → ular → tikus → padi", "Padi → tikus → ular → elang", "Elang → tikus → ular → padi"],
    a: 2,
    why: "Rantai makanan dimulai dari produsen (padi), lalu konsumen I (tikus), konsumen II (ular), dan konsumen III (elang)."
  },
  {
    q: "Contoh rantai makanan yang tepat pada ekosistem sungai adalah ....",
    opts: ["Ikan besar → ikan kecil → fitoplankton", "Fitoplankton → ikan kecil → ikan besar", "Ikan kecil → fitoplankton → ikan besar", "Fitoplankton → ikan besar → ikan kecil"],
    a: 1,
    why: "Rantai makanan dimulai dari produsen (fitoplankton), lalu ikan kecil, dan diakhiri ikan besar sebagai predator."
  },
  {
    q: "Di ekosistem hutan tropis terdapat tumbuhan, belalang, katak, dan ular. Urutan rantai makanan yang tepat adalah ....",
    opts: ["Ular → katak → belalang → tumbuhan", "Belalang → tumbuhan → ular → katak", "Tumbuhan → belalang → katak → ular", "Katak → belalang → tumbuhan → ular"],
    a: 2,
    why: "Tumbuhan sebagai produsen dimakan belalang, belalang dimakan katak, dan katak dimakan ular."
  },
  {
    q: "Di ekosistem sawah, tikus memakan padi dan juga dimakan oleh ular serta burung hantu. Kondisi ini menunjukkan bahwa tikus ....",
    opts: ["Menjadi penghubung dalam jaring-jaring makanan", "Hanya menjadi bagian dari satu rantai makanan", "Berperan sebagai produsen", "Tidak memiliki predator alami"],
    a: 0,
    why: "Tikus menghubungkan lebih dari satu rantai makanan, sehingga terciptalah jaring-jaring makanan."
  },
  {
    q: "Upaya yang tepat untuk menjaga keseimbangan ekosistem sawah adalah ....",
    opts: ["Membasmi semua hama tanpa terkecuali", "Menjaga kelestarian predator alami seperti ular dan burung", "Menebang pohon di sekitar sawah", "Membuang sampah ke sungai dekat sawah"],
    a: 1,
    why: "Predator alami seperti ular dan burung membantu mengendalikan populasi hama secara alami."
  },
  {
    q: "Jika populasi ular di sawah berkurang drastis, kemungkinan yang terjadi adalah ....",
    opts: ["Populasi tikus meningkat", "Populasi padi meningkat", "Elang punah", "Tidak ada perubahan"],
    a: 0,
    why: "Tanpa predator (ular), populasi tikus meningkat tidak terkendali dan padi banyak dimakan."
  },
  {
    q: "Penebangan hutan secara liar dapat menyebabkan ....",
    opts: ["Meningkatnya jumlah produsen", "Populasi hewan semakin stabil", "Populasi hewan semakin banyak", "Terganggunya keseimbangan ekosistem"],
    a: 3,
    why: "Penebangan liar menghancurkan habitat sehingga banyak populasi terganggu dan ekosistem menjadi tidak seimbang."
  },
  {
    q: "Jika terjadi pencemaran air sungai, dampak yang mungkin terjadi adalah ....",
    opts: ["Ikan semakin banyak", "Tumbuhan air tumbuh subur", "Ikan dan tumbuhan air mati", "Tidak terjadi dampak apa pun"],
    a: 2,
    why: "Air yang tercemar beracun bagi makhluk hidup di dalamnya, sehingga ikan dan tumbuhan air dapat mati."
  },
  {
    q: "Perburuan liar terhadap predator seperti elang dapat menyebabkan ....",
    opts: ["Populasi mangsa (tikus) menurun", "Populasi mangsa (tikus) meningkat pesat", "Keseimbangan ekosistem semakin membaik", "Ekosistem tidak mengalami perubahan"],
    a: 1,
    why: "Jika predator diburu habis, mangsanya kehilangan kendali alami dan populasinya meningkat pesat."
  },
  {
    q: "Di ekosistem laut, jika populasi ikan besar menurun karena penangkapan berlebihan, dampak yang paling mungkin terjadi terhadap jaring-jaring makanan adalah ....",
    opts: ["Populasi plankton langsung menurun", "Populasi ikan kecil menurun", "Populasi ikan kecil meningkat karena predatornya berkurang", "Tidak ada dampak karena ekosistem laut sangat luas"],
    a: 2,
    why: "Ikan besar adalah predator ikan kecil. Jika ikan besar berkurang, populasi ikan kecil akan meningkat."
  }
];
