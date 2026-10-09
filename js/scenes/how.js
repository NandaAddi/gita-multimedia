/* ============================================================
   ECO-EXPLORER — js/scenes/how.js
   Layar Penuh: Cara Bermain & Aturan Misi (Stepper 4 Langkah
   berilustrasi — 1 kartu tampil per langkah + mockup tiap langkah)
   ============================================================ */

let howStep = 0;

function howSteps(){
  return [
    { badge: 'Langkah 1 &bull; 4 Kelompok', title: 'PILIH KELOMPOK DETEKTIF',
      desc: 'Pilih salah satu dari <b>4 Kelompok Detektif Ekosistem</b> (Sawah, Hutan, Sungai, Laut). Setiap kelompok bertanggung jawab menyelidiki satu ekosistem Nusantara secara tuntas!',
      extra: '<div class="bento-chips-row">'
        + '<span class="bento-chip chip-padi">Detektif Sawah</span>'
        + '<span class="bento-chip chip-elang">Detektif Hutan</span>'
        + '<span class="bento-chip chip-katak">Detektif Sungai</span>'
        + '<span class="bento-chip chip-jamur">Detektif Laut</span></div>',
      illus: 'teams' },
    { badge: 'Langkah 2 &bull; Keseimbangan', title: 'PANTAU KESEIMBANGAN &amp; HARI',
      desc: 'Perhatikan <b>Bar Keseimbangan Ekosistem</b> dan <b>Target Hari</b>. Setiap hari kondisi alam berevolusi dinamis. Selamatkan ekosistem sebelum target hari habis dan capai status <b>SEIMBANG (&ge; 75%)</b>!',
      extra: '<div class="bento-zones-row">'
        + '<span class="zone-pill zone-danger">Bahaya (&lt; 45%)</span>'
        + '<span class="zone-pill zone-warn">Waspada (45 - 74%)</span>'
        + '<span class="zone-pill zone-healthy">Sehat (&ge; 75%)</span></div>',
      illus: 'health' },
    { badge: 'Langkah 3 &bull; Jeda 1,2 Detik', title: 'STRATEGI KARTU AKSI',
      desc: 'Setiap ekosistem memiliki <b>4 Misi Kausalitas</b>: 2 Kasus Ulah Alam (kemarau, wereng, badai, gulma) dan 2 Kasus Ulah Manusia (pestisida, jerat satwa, bom ikan, limbah pabrik)! Gunakan <b>3 kartu aksi</b> di kuadran bawah layar untuk memulihkan alam.',
      extra: '<div class="bento-strategy-bar"><span class="strat-step">1. Atasi Ancaman</span>'
        + '<span class="strat-ar">&rarr;</span><span class="strat-step">2. Pulihkan Produsen</span>'
        + '<span class="strat-ar">&rarr;</span><span class="strat-step">3. Seimbangkan Rantai</span></div>',
      illus: 'actions' },
    { badge: 'Langkah 4 &bull; 48 Bintang', title: 'MUSYAWARAH &amp; KUIS C2',
      desc: 'Di hari musyawarah, simulasi dijeda untuk <b>voting kelas</b> menggunakan kartu fisik 3 warna! Manfaatkan <b>Kamus Alam</b> dan selesaikan <b>kuis sebab-akibat C2</b> di akhir misi untuk mengumpulkan total <b>48 Bintang Prestasi</b> (12 bintang per kelompok).',
      extra: '<div class="bento-stars-row"><span class="star-chip">★ Keseimbangan &ge; 75%</span>'
        + '<span class="star-chip">★★ Lulus Kuis C2</span>'
        + '<span class="star-chip">★★★ Percobaan Pertama</span></div>',
      illus: 'vote' }
  ];
}

function howIllusHTML(kind){
  if(kind === 'teams'){
    return '<div class="mock-teams"><div class="mock-title">Pilih timmu!</div><div class="mock-team-row" id="mock-teams"></div>'
      + '<div class="mock-hint">4 detektif &bull; tap untuk memilih</div></div>';
  }
  if(kind === 'health'){
    return '<div class="mock-health"><div class="mock-day">Hari <b>12</b><span>/40</span></div>'
      + '<div class="mock-hp"><div class="mock-hp-top"><span>Keseimbangan</span><b>82%</b></div>'
      + '<div class="mock-hpbar"><i style="width:82%"></i></div></div>'
      + '<div class="mock-hint">Bar hijau = aman!</div></div>';
  }
  if(kind === 'actions'){
    return '<div class="mock-dock">'
      + '<div class="mock-card"><div class="mock-ic">' + ic('drop', 30) + '</div><div class="mock-tt">Alirkan Air</div>'
      + '<div class="mock-btn">Lakukan!</div><div class="mock-quota">Sisa: 6</div></div>'
      + '<div class="mock-card cooling"><div class="mock-ic">' + ic('sprout', 30) + '</div><div class="mock-tt">Tanam Padi</div>'
      + '<div class="mock-btn">Istirahat…</div><div class="mock-cd"><i style="width:60%"></i></div></div>'
      + '<div class="mock-card"><div class="mock-ic">' + ic('mushroom', 30) + '</div><div class="mock-tt">Urai Jerami</div>'
      + '<div class="mock-btn">Lakukan!</div><div class="mock-quota">Sisa: 5</div></div></div>';
  }
  return '<div class="mock-vote"><div class="mock-title">Musyawarah kelas — pilih 1!</div>'
    + '<div class="mock-vote-row"><span class="mock-vote-chip c-hijau">Aksi Hijau</span>'
    + '<span class="mock-vote-chip c-kuning">Aksi Kuning</span>'
    + '<span class="mock-vote-chip c-merah">Aksi Merah</span></div>'
    + '<div class="mock-quiz"><div class="mock-q">Kuis: siapa pemangsa tikus?</div>'
    + '<div class="mock-opt">Katak</div><div class="mock-opt ok">Ular ✓</div><div class="mock-opt">Elang</div></div></div>';
}

function drawHowTeams(){
  const row = el('#mock-teams');
  if(!row || typeof TEAMS === 'undefined' || typeof MASC === 'undefined') return;
  row.innerHTML = '';
  TEAMS.forEach(t => {
    const d = document.createElement('div');
    d.className = 'mock-team';
    d.innerHTML = '<canvas width="110" height="110"></canvas><span>' + t.name.replace('Tim ', '') + '</span>';
    row.appendChild(d);
    const cv = d.querySelector('canvas');
    if(cv && MASC[t.mascot]){
      const c = cv.getContext('2d');
      c.save();
      c.translate(55, 62);
      c.scale(0.36, 0.36);
      MASC[t.mascot](c);
      c.restore();
    }
  });
}

function renderHowStep(silent){
  const steps = howSteps();
  howStep = Math.max(0, Math.min(steps.length - 1, howStep));
  const s = steps[howStep];
  // tab aktif
  el('#scr-how').querySelectorAll('.how-step-tab').forEach((b, i) => b.classList.toggle('on', i === howStep));
  // dots
  const dots = el('#scr-how').querySelector('.how-dots');
  if(dots) dots.innerHTML = steps.map((_, i) => '<i class="' + (i === howStep ? 'on' : '') + '"></i>').join('');
  // slide
  const slide = el('#how-slide');
  if(slide){
    slide.innerHTML = '<div class="how-illus">' + howIllusHTML(s.illus) + '</div>'
      + '<div class="how-step-body"><div class="bento-badge">' + s.badge + '</div>'
      + '<div class="bento-title">' + s.title + '</div>'
      + '<p class="bento-desc">' + s.desc + '</p>' + s.extra + '</div>';
  }
  if(s.illus === 'teams') drawHowTeams();
  // nav
  const prev = el('#how-prev'), next = el('#how-next');
  if(prev) prev.disabled = howStep === 0;
  if(next) next.innerHTML = howStep === steps.length - 1
    ? 'Mulai Petualangan ' + ic('arrowR', 24)
    : 'Lanjut ' + ic('arrowR', 24);
  if(!silent) {
    sfx.click();
    if(typeof playVO === 'function') playVO('vo_how_step' + (howStep + 1));
  }
}

function buildHow() {
  const root = el('#scr-how');
  if (!root) return;
  howStep = 0;

  root.innerHTML = `
    <div class="how-screen-wrap">
      <!-- Top Command Bar -->
      <div class="how-header-bar">
        <button class="btn btn-secondary how-back-btn" id="how-back">
          ${ic('back', 28)}
          <span>MENU UTAMA</span>
        </button>
        <div class="how-header-title">
          <div class="how-title-text">CARA BERMAIN &amp; ATURAN MISI</div>
          <div class="how-title-sub">4 Langkah Rahasia Menjadi Detektif Alam Tangguh</div>
        </div>
        <div class="how-header-actions">
          <button class="btn tb-btn snd-btn" id="how-snd"></button>
        </div>
      </div>

      <!-- Gita Mascot Scaffolding Banner -->
      <div class="how-gita-banner">
        <div class="how-gita-avatar">
          ${gitaSVG(96, 'talk')}
        </div>
        <div class="how-gita-bubble">
          <div class="how-gita-name">GITA &bull; Panduan Detektif Cilik</div>
          <div class="how-gita-msg">
            Halo <b>Detektif Alam</b>! Ekosistem Nusantara sedang dalam bahaya. Pelajari <b>4 langkah rahasia</b> di bawah ini agar kamu dan timmu sukses memulihkan keseimbangan alam!
          </div>
        </div>
      </div>

      <!-- Stepper: 1 kartu per langkah -->
      <div class="how-stepper">
        <div class="how-steps-bar">
          <button class="how-step-tab" data-s="0"><b>1</b><span>Pilih Tim</span></button>
          <button class="how-step-tab" data-s="1"><b>2</b><span>Keseimbangan</span></button>
          <button class="how-step-tab" data-s="2"><b>3</b><span>Kartu Aksi</span></button>
          <button class="how-step-tab" data-s="3"><b>4</b><span>Kuis</span></button>
        </div>
        <div class="how-step-slide" id="how-slide"></div>
        <div class="how-step-nav">
          <button class="btn btn-secondary" id="how-prev">${ic('back', 24)} Kembali</button>
          <div class="how-dots"></div>
          <button class="btn btn-gold" id="how-next"></button>
        </div>
      </div>
    </div>
  `;

  // Step tabs + nav
  root.querySelectorAll('.how-step-tab').forEach(b => {
    b.onclick = () => { howStep = +b.dataset.s; renderHowStep(); };
  });
  el('#how-prev').onclick = () => { if(howStep > 0){ howStep--; renderHowStep(); } else sfx.click(); };
  el('#how-next').onclick = () => {
    if(howStep < howSteps().length - 1){ howStep++; renderHowStep(); }
    else { sfx.click(); buildTeam(); go('team'); }
  };

  // Bind Buttons
  const backBtn = el('#how-back');
  if (backBtn) {
    backBtn.onclick = (e) => {
      if (e) { e.preventDefault(); e.stopPropagation(); }
      sfx.back();
      go('title');
    };
  }

  const sndBtn = el('#how-snd');
  if (sndBtn) {
    sndBtn.onclick = () => {
      toggleSound();
      syncSound();
    };
  }

  const gitaBanner = root.querySelector('.how-gita-banner');
  if (gitaBanner) {
    gitaBanner.onclick = () => {
      sfx.click();
      if(typeof playVO === 'function') playVO('vo_how_intro');
    };
  }

  renderHowStep(true);
  if(typeof playVO === 'function') playVO('vo_how_intro');
  syncSound();
}
