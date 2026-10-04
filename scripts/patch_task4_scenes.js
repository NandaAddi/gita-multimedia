const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');

// 1. Patch simulation.js
const simPath = path.join(root, 'TES GITA BARU 1', 'js', 'scenes', 'simulation.js');
let simContent = fs.readFileSync(simPath, 'utf8');

const targetSim = "if(S.water!==undefined&&S.water<35)return 'Air semakin sedikit! Alirkan air lebih dulu — semua makhluk hidup butuh air.';";
const replaceSim = `if(S.water!==undefined&&S.water<35)return 'Air semakin sedikit! Alirkan air lebih dulu — semua makhluk hidup butuh air.';
  if(S.wereng!==undefined&&S.wereng>35)return 'Wereng cokelat melonjak! Lepas katak pemangsa dan semprot ekstrak mimba.';
  if(S.api!==undefined&&S.api>35)return 'Bara api rimba menyala! Padamkan titik api dan buat sekat bakar basah.';
  if(S.lumpur!==undefined&&S.lumpur>35)return 'Lumpur erosi menimbun sungai! Keruk lumpur dan tanam rumput vetiver di tebing.';
  if(S.storm!==undefined&&S.storm>35)return 'Ombak badai mematahkan karang! Pasang rangka spider terumbu dan bersihkan lamun.';
  if(S.net!==undefined&&S.net>35)return 'Jaring pukat trawl meratakan dasar karang! Sita pukat dan selamatkan penyu.';`;

if (simContent.includes(targetSim) && !simContent.includes('wereng>35')) {
  simContent = simContent.replace(targetSim, replaceSim);
  fs.writeFileSync(simPath, simContent, 'utf8');
  console.log('[OK] simulation.js patched successfully');
} else {
  console.log('[INFO] simulation.js already patched or target not found');
}

// 2. Patch how.js
const howPath = path.join(root, 'TES GITA BARU 1', 'js', 'scenes', 'how.js');
let howContent = fs.readFileSync(howPath, 'utf8');

// Replace Step 1
howContent = howContent.replace(
  `{ badge: 'Langkah 1 &bull; 5 Maskot', title: 'PILIH TIM SPESIALIS',
      desc: 'Pilih salah satu dari <b>5 Tim Ahli</b> (Padi, Elang, Katak, Jamur, Ular). Setiap tim memiliki <b>keahlian khusus</b> yang memberikan bonus kuota aksi dan masa istirahat (cooldown) lebih singkat pada aksi andalannya!',
      extra: '<div class="bento-chips-row">'
        + '<span class="bento-chip chip-padi">Padi (Produsen)</span>'
        + '<span class="bento-chip chip-ular">Ular (Predator Hama)</span>'
        + '<span class="bento-chip chip-jamur">Jamur (Pengurai)</span>'
        + '<span class="bento-chip chip-elang">Elang (Predator Puncak)</span>'
        + '<span class="bento-chip chip-katak">Katak (Bioindikator)</span></div>',
      illus: 'teams' }`,
  `{ badge: 'Langkah 1 &bull; 4 Kelompok', title: 'PILIH KELOMPOK DETEKTIF',
      desc: 'Pilih salah satu dari <b>4 Kelompok Detektif Ekosistem</b> (Sawah, Hutan, Sungai, Laut). Setiap kelompok bertanggung jawab menyelidiki satu ekosistem Nusantara secara tuntas!',
      extra: '<div class="bento-chips-row">'
        + '<span class="bento-chip chip-padi">Detektif Sawah</span>'
        + '<span class="bento-chip chip-elang">Detektif Hutan</span>'
        + '<span class="bento-chip chip-katak">Detektif Sungai</span>'
        + '<span class="bento-chip chip-jamur">Detektif Laut</span></div>',
      illus: 'teams' }`
);

// Replace Step 3
howContent = howContent.replace(
  `desc: 'Gunakan <b>3 kartu aksi</b> di kuadran bawah layar secara cermat. Setiap aksi memiliki kuota pemakaian dan <b>jeda reaksi alam 1,2 detik</b>. Kaidah utama: atasi sumber ancaman krisis terlebih dahulu, baru pulihkan populasi!',
      extra: '<div class="bento-strategy-bar"><span class="strat-step">1. Atasi Ancaman</span>'
        + '<span class="strat-ar">&rarr;</span><span class="strat-step">2. Pulihkan Produsen</span>'
        + '<span class="strat-ar">&rarr;</span><span class="strat-step">3. Seimbangkan Rantai</span></div>',`,
  `desc: 'Setiap ekosistem memiliki <b>4 Misi Kausalitas</b>: 2 Kasus Ulah Alam (kemarau, wereng, badai, gulma) dan 2 Kasus Ulah Manusia (pestisida, jerat satwa, bom ikan, limbah pabrik)! Gunakan <b>3 kartu aksi</b> di kuadran bawah layar untuk memulihkan alam.',
      extra: '<div class="bento-strategy-bar"><span class="strat-step">1. Atasi Ancaman</span>'
        + '<span class="strat-ar">&rarr;</span><span class="strat-step">2. Pulihkan Produsen</span>'
        + '<span class="strat-ar">&rarr;</span><span class="strat-step">3. Seimbangkan Rantai</span></div>',`
);

// Replace Step 4
howContent = howContent.replace(
  `{ badge: 'Langkah 4 &bull; 24 Bintang', title: 'MUSYAWARAH &amp; KUIS C2',
      desc: 'Di hari musyawarah, simulasi dijeda untuk <b>voting kelas</b> menggunakan kartu fisik 3 warna! Manfaatkan <b>Kamus Alam</b> dan selesaikan <b>kuis sebab-akibat C2</b> di akhir misi untuk mengumpulkan total <b>24 Bintang Prestasi</b>.',`,
  `{ badge: 'Langkah 4 &bull; 48 Bintang', title: 'MUSYAWARAH &amp; KUIS C2',
      desc: 'Di hari musyawarah, simulasi dijeda untuk <b>voting kelas</b> menggunakan kartu fisik 3 warna! Manfaatkan <b>Kamus Alam</b> dan selesaikan <b>kuis sebab-akibat C2</b> di akhir misi untuk mengumpulkan total <b>48 Bintang Prestasi</b> (12 bintang per kelompok).',`
);

howContent = howContent.replace(
  `<div class="mock-hint">5 maskot &bull; tap untuk memilih</div>`,
  `<div class="mock-hint">4 detektif &bull; tap untuk memilih</div>`
);

fs.writeFileSync(howPath, howContent, 'utf8');
console.log('[OK] how.js patched successfully');
