/* ============================================================
   ECO-EXPLORER — js/scenes/title.js
   Layar Judul, Bubble Gita, & Modal Panduan
   ============================================================ */

/* ================= LAYAR: JUDUL ================= */
function titleBubble(){const n=totStars();
  // Image-sequence Gita di kiri bubble (tanpa fallback SVG).
  // Wadah dikunci 190x210 (layout/kartu tidak bergeser),
  // gambar 400px meluber ke bawah di belakang kartu.
  try{
    if(typeof GitaSeq !== 'undefined' && GitaSeq.play){
      GitaSeq.play('#gita-title', { size: 400, fps: 12 });
    }
  }catch(e){}
 el('#bubble-title').innerHTML=n>0
  ?'Selamat datang kembali, <b>Detektif Alam</b>! Kamu sudah mengumpulkan <b>'+n+' dari 48 bintang</b>. Siap melanjutkan menyelamatkan ekosistem Indonesia?'
  :'Hai, aku <b>Gita</b>! Ekosistem Indonesia sedang kesusahan. Jadilah <b>Detektif Alam</b>, pilih kelompokmu, dan selesaikan 16 misi penyelamatan. Siap?';
 if(el('#foot-stars')) el('#foot-stars').textContent=n;
 const voKey = n > 0 ? 'vo_title_welcome_back' : 'vo_title_welcome';
 if (typeof playVO === 'function') playVO(voKey);
 el('#bubble-title').onclick = () => {
   sfx.click();
   if (typeof playVO === 'function') playVO(voKey);
 };
}


/* ================= MODAL: CARA BERMAIN & GURU ================= */
function howHTML(){return '<h2>'+ic('book',34)+' Cara Bermain</h2>'
 +'<ul><li><b>Pilih tim</b> — setiap tim punya keahlian khusus yang memberi bonus kuota & cooldown singkat pada aksi andalannya.</li>'
 +'<li><b>Selesaikan 3 target misi</b> sebelum hari habis. Selesaikan cepat (≤ hari target) dengan kesehatan tinggi untuk 3 bintang.</li>'
 +'<li><b>Kartu aksi</b> punya kuota terbatas dan masa istirahat — atur strategi! Aksi yang tepat urutannya: atasi ancaman dulu, baru pulihkan penghuni.</li>'
 +'<li><b>Musyawarah kelas</b> — di hari tertentu, kelas memilih satu aksi gratis. Diskusikan bersama!</li>'
 +'<li><b>Kamus Alam</b> — klik istilah kondisi ekosistem atau buka kamus untuk belajar.</li>'
 +'<li><b>Kuis akhir</b> — jawab benar untuk +1 bintang. Maksimal 3 bintang per misi, 48 total.</li></ul>'
  +'<div class="mrow"><button class="btn btn-gold" data-close>Siap Bermain!</button></div>';}
function teacherHTML(){return '<h2>'+ic('users',34)+' Panduan Guru</h2>'
 +'<p><b>Tujuan pembelajaran (IPAS Fase C):</b> peserta mengidentifikasi komponen biotik-abiotik, menjelaskan peran produsen-konsumen-pengurai dalam rantai makanan, dan menganalisis dampak ulah manusia terhadap keseimbangan ekosistem.</p>'
 +'<p><b>Langkah kegiatan:</b></p><ul>'
 +'<li>Bagi kelas menjadi 5 tim sesuai maskot, atau biarkan perwakilan memilih di layar IFP.</li>'
 +'<li>Gunakan momen <b>musyawarah</b> untuk diskusi klasikal: tim mengusulkan aksi dan kelas bermusyawarah.</li>'
 +'<li>Selaikan <b>Kamus Alam</b> saat muncul istilah baru (pemutihan karang, oksigen terlarut, humus, dsb).</li>'
 +'<li>Setelah kuis, tanya: "Apa rantai sebab-akibat yang diperbaiki?" lalu bandingkan antar-misi.</li></ul>'
 +'<p><b>Bintang:</b> performa simulasi (2–3) + kuis benar (+1) = maksimal 3 per misi, total 48. Progres tersimpan otomatis di perangkat.</p>'
 +'<div class="mrow"><button class="btn btn-ruby" id="tg-reset">Reset Progres</button>'
  +'<button class="btn btn-gold" data-close>Tutup</button></div>';}

