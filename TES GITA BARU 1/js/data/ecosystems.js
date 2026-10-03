/* ============================================================
   ECO-EXPLORER — js/data/ecosystems.js
   Data 4 Bioma & Kamus Istilah Alam
   ============================================================ */

const BIOME_ORDER=['sawah','hutan','sungai','laut'];
const BIOMES={
sawah:{name:'Sawah',full:'Ekosistem Sawah',tag:'Lumbung padi para petani Nusantara',
 desc:'Sawah adalah rumah bagi padi, hewan pemakan tumbuhan, pemangsa alami, dan pengurai. Semua saling membutuhkan agar panen tetap subur!',
 chain:['Padi (Produsen)','Tikus & Wereng','Ular & Katak','Jamur Pengurai']},
hutan:{name:'Hutan Tropis',full:'Ekosistem Hutan Tropis',tag:'Paru-paru hijau pulau Sumatera',
 desc:'Hutan tropis menyimpan pohon raksasa, rusa, dan harimau Sumatera. Jika pohonnya rusak, seluruh penghuni hutan ikut menderita.',
 chain:['Pohon & Rumput','Rusa','Harimau Sumatera','Pengurai Serasah']},
sungai:{name:'Sungai Air Tawar',full:'Ekosistem Sungai Air Tawar',tag:'Urat kehidupan air tawar',
 desc:'Sungai mengalirkan air, oksigen, dan kehidupan. Ikan kecil, bangau, dan tanaman air menjaga sungai tetap sehat.',
 chain:['Tanaman Air','Ikan Kecil','Bangau','Pengurai Sungai']},
laut:{name:'Laut Terumbu Karang',full:'Ekosistem Laut Terumbu Karang',tag:'Kota bawah laut yang berwarna',
 desc:'Terumbu karang adalah rumah ribuan ikan. Jika karang memutih atau hancur, hiu hingga penyu kehilangan seluruh kehidupannya.',
 chain:['Karang & Alga','Ikan Kecil','Hiu','Bintang Laut Pengurai']}};
const BICON={sawah:'sprout',hutan:'tree',sungai:'wave',laut:'coral'};

/* ================= DATA: KAMUS ================= */
const KAMUS={
sawah:[
['Pematang','Galgeng tanah pembatas petak sawah.','Pematang adalah galeng tanah yang membatasi petak sawah. Tikus sering berlubang di pematang, sehingga ular dan pemangsa lain berburu di sekitarnya.'],
['Wereng','Serangga kecil pengisap cairan padi.','Wereng mengisap cairan batang padi hingga padi menguning dan mati. Wereng adalah hama yang harus dikendalikan secara alami.'],
['Irigasi','Saluran air menuju sawah.','Irigasi mengalirkan air dari sungai atau waduk ke petak sawah. Air adalah kebutuhan abiotik: tanpa air, padi tidak bisa fotosintesis.'],
['Pengurai','Makhluk pengubah sisa jadi zat hara.','Jamur dan bakteri pengurai mengubah sisa jerami dan bangkai menjadi pupuk alami yang menyuburkan tanah sawah.'],
['Pemangsa Alami','Sahabat petani penjaga keseimbangan.','Ular, katak, dan elang memakan tikus serta wereng. Dengan pemangsa alami, hama tidak berkembang berlebihan.'],
['Hama','Pemakan tanaman petani.','Tikus dan wereng disebut hama karena memakan padi. Hama melonjak jika pemangsa alaminya hilang.'],
['Gulma','Tumbuhan pengganggu sawah.','Gulma seperti rumput liar merebut makanan dan tempat hidup padi, sehingga padi tumbuh kurang subur.'],
['Limbah','Sisa buangan yang berbahaya.','Sisa racun semprotan kimia dan detergen dapat meracuni air sawah, ikan, katak, hingga pemangsanya.']],
hutan:[
['Harimau Sumatera','Pemangsa puncak hutan tropis.','Harimau menjaga jumlah rusa agar tidak berlebihan. Tanpa harimau, rumput dan pohon muda habis dimakan dan hutan rusak.'],
['Rusa','Herbivora pemakan rumput.','Rusa memakan rumput dan daun muda. Jumlah rusa bergantung pada banyaknya tumbuhan dan pemangsa di hutan.'],
['Reboisasi','Menanam kembali hutan.','Reboisasi menanam pohon di lahan yang gundul agar hutan pulih, satwa kembali, dan tanah tidak longsor.'],
['Jerat Pemburu','Perangkap liar yang melukai satwa.','Jerat kawat yang dipasang pemburu bisa melukai harimau dan rusa. Sita jerat berarti menyelamatkan satwa hutan.'],
['Serasah & Humus','Daun jatuh menjadi tanah subur.','Daun dan ranting yang gugur diuraikan jamur menjadi humus: tanah hitam subur tempat pohon baru tumbuh.'],
['Mata Air','Sumber air di dalam hutan.','Mata air muncul dari tanah hutan. Akar pohon menyimpan air hujan; jika pohon ditebang, mata air ikut mengering.']],
sungai:[
['Eceng Gondok','Tumbuhan air tumbuh cepat.','Eceng gondok tumbuh sangat cepat hingga menutupi permukaan sungai. Sinar matahari dan udara tertutup, oksigen air berkurang.'],
['Bangau','Pemangsa ikan bertungkai panjang.','Bangau berburu ikan di air dangkal dengan paruh panjangnya. Keberadaan bangau menandakan sungai yang sehat.'],
['Ikan Air Tawar','Penghuni utama sungai.','Ikan kecil memakan tanaman air dan menjadi makanan bangau. Ikan butuh oksigen terlarut untuk bernapas.'],
['Oksigen Terlarut','Udara di dalam air.','Ikan bernapas dengan insang mengambil oksigen yang larut di air. Jika permukaan tertutup gulma atau limbah, oksigen habis.'],
['Limbah Detergen','Busa kimia dari pabrik.','Detergen membuat air berbusa dan beracun. Racunnya terserap ikan kecil lalu menumpuk di tubuh bangau pemangsanya.'],
['Sampah Plastik','Sampah yang tak membusuk.','Plastik tidak membusuk bertahun-tahun. Ikan dan bangau bisa terjerat atau tertelan plastik.']],
laut:[
['Terumbu Karang','Hutan rumah ikan di laut.','Karang adalah hewan kecil yang membangun rumah batu berwarna. Ribuan ikan kecil lahir, berlindung, dan mencari makan di karang.'],
['Pemutihan Karang','Karang memutih saat panas.','Saat air laut terlalu panas, karang mengeluarkan ganggang hidupnya dan berubah putih. Karang putih bisa mati.'],
['Ikan Karang','Ikan kecil penghuni karang.','Ikan kecil hidup bersembunyi di celah karang. Tanpa karang, mereka mudah dimangsa dan populasinya hilang.'],
['Hiu','Pemangsa puncak samudra.','Hiu menjaga jumlah ikan agar seimbang. Hiu butuh ikan kecil yang hidup di terumbu karang.'],
['Penyu','Penjelajah laut berumur panjang.','Penyu suka memakan ubur-ubur. Sayangnya, kantong plastik di laut mirip ubar-ubur dan bisa tertelan penyu.'],
['Bom Ikan','Cara menangkap ikan yang haram.','Bom ikan membunuh semua makhluk sekitar dan menghancurkan karang. Karang butuh puluhan tahun untuk tumbuh kembali.']]};

