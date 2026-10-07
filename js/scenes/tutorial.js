/* ============================================================
   ECO-EXPLORER — js/scenes/tutorial.js
   Layar Panduan Detektif 4 Langkah
   ============================================================ */

/* ================= LAYAR: TUTORIAL ================= */
const TUT=[
 {h:'Selamat Datang, Detektif Alam!',p:'Di Nusantara ada 4 ekosistem dalam bahaya: <b>sawah</b>, <b>hutan tropis</b>, <b>sungai</b>, dan <b>laut karang</b>. Tugasmu: memulihkan keseimbangannya sebelum semuanya rusak! Aku, Gita, akan menemanimu memberi petunjuk.',
  chain:BIOMES.sawah.chain},
 {h:'Keseimbangan & Hari',p:'Perhatikan <b>Keseimbangan Ekosistem</b> di atas dan <b>jumlah Hari</b>. Setiap hari kondisi ekosistem berubah sendiri: air menyusut, hama berkembang, racun menyebar. Jika keseimbangan jatuh, ekosistem hancur. Selesaikan 3 target misi sebelum waktu habis!',chain:null},
 {h:'Kartu Aksi',p:'Di bawah layar ada <b>3 kartu aksi</b>. Setiap aksi punya <b>kuota</b> (jumlah pemakaian) dan <b>masa istirahat</b> (cooldown) antar pemakaian — gunakan dengan strategis! Tim pilihanmu punya <b>keahlian khusus</b>: aksi andalannya dapat bonus kuota dan cooldown lebih singkat.',chain:null},
 {h:'Musyawarah & Kamus',p:'Di hari tertentu kita berhenti sejenak untuk <b>musyawarah kelas</b>: pilih satu aksi gratis bersama-sama! Jangan lupa buka <b>Kamus Alam</b> untuk belajar istilah baru. Jawab kuis di akhir misi untuk bintang ekstra. Selamat berjuang, Detektif!',chain:null}];
function buildTutorial(){tutIdx=0;renderTut();}
function renderTut(){const s=TUT[tutIdx];
 el('#scr-tutorial').innerHTML='<div class="ui vwrap"><div class="tut-slide">'
 +'<div class="tut-badge">Panduan Detektif &bull; Langkah '+(tutIdx+1)+' dari '+TUT.length+'</div>'
 +'<div class="tut-header"><div class="tut-avatar">'+gitaSVG(100,'talk')+'</div><h2>'+s.h+'</h2></div>'
 +'<p class="tut-desc">'+s.p+'</p>'
 +(s.chain?'<div class="chain-box"><div class="bigchain">'+s.chain.map(x=>'<span class="cp">'+x+'</span>').join('<span class="ca">&rarr;</span>')+'</div><div class="chain-sub">Contoh aliran energi rantai makanan &bull; semua saling terhubung!</div></div>':'')
 +'<div class="tdots">'+TUT.map((_,i)=>'<i class="'+(i===tutIdx?'on':'')+'"></i>').join('')+'</div>'
 +'<div class="tut-nav">'
 +(tutIdx>0?'<button class="btn btn-secondary" id="tu-prev">'+ic('back',24)+' Kembali</button>':'')
 +'<button class="btn btn-gold" id="tu-next">'+(tutIdx===TUT.length-1?ic('check',26)+' Pilih Tim!':'Lanjut '+ic('arrowR',24))+'</button>'
 +'<button class="btn btn-secondary" id="tu-skip">Lewati</button></div></div></div>';
 const p=el('#tu-prev');if(p)p.onclick=()=>{sfx.click();tutIdx--;renderTut();};
 el('#tu-next').onclick=()=>{sfx.click();if(tutIdx===TUT.length-1){buildTeam();go('team');}else{tutIdx++;renderTut();}};
 el('#tu-skip').onclick=()=>{sfx.click();buildTeam();go('team');};}


