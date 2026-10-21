/* ============================================================
   ECO-EXPLORER — js/scenes/how.js
   Layar Penuh: Cara Bermain & Aturan Misi
   Bento Compact Layout (2-Kolom Seimbang + Inline Gita Companion)
   ============================================================ */

let howStep = 0;

function howSteps(){
  return [
    {
      badge: 'Langkah 1 &bull; 4 Kelompok',
      title: 'PILIH KELOMPOK DETEKTIF',
      desc: 'Pilih salah satu dari <b>4 Kelompok Detektif Ekosistem</b> (Sawah, Hutan, Sungai, Laut). Setiap kelompok berkolaborasi menyelidiki rantai makanan dan menjaga keharmonisan alam Nusantara!',
      extra: '<div class="bento-tips-card">'
        + '<div class="bento-tips-header"><span class="bento-tips-icon">💡</span><span class="bento-tips-title">Panduan Peran Kolaborasi</span></div>'
        + '<div class="bento-chips-row">'
        + '<span class="bento-chip chip-padi">🌾 Detektif Sawah</span>'
        + '<span class="bento-chip chip-elang">🦅 Detektif Hutan</span>'
        + '<span class="bento-chip chip-katak">🐸 Detektif Sungai</span>'
        + '<span class="bento-chip chip-jamur">🐢 Detektif Laut</span>'
        + '</div>'
        + '<div class="bento-tips-note">Setiap kelompok memegang 1 lembar LKPD &amp; 3 kartu voting musyawarah kelas.</div>'
        + '</div>',
      illus: 'teams'
    },
    {
      badge: 'Langkah 2 &bull; Keseimbangan &amp; Hari',
      title: 'PANTAU KESEIMBANGAN &amp; HARI',
      desc: 'Perhatikan <b>Bar Keseimbangan Ekosistem</b> dan <b>Target Hari</b>. Selamatkan alam sebelum target hari habis dan raih status <b>SEIMBANG (&ge; 75%)</b>!',
      extra: '<div class="bento-tips-card">'
        + '<div class="bento-tips-header"><span class="bento-tips-icon">📊</span><span class="bento-tips-title">Indikator 3 Zona Ekosistem</span></div>'
        + '<div class="bento-zones-grid">'
        + '<div class="zone-card zc-danger"><span class="zc-dot">🔴</span><b>Bahaya (&lt; 45%)</b><small>Krisis ekologis</small></div>'
        + '<div class="zone-card zc-warn"><span class="zc-dot">🟡</span><b>Waspada (45-74%)</b><small>Perlu perbaikan</small></div>'
        + '<div class="zone-card zc-healthy"><span class="zc-dot">🟢</span><b>Sehat (&ge; 75%)</b><small>Kondisi ideal</small></div>'
        + '</div>'
        + '<div class="bento-tips-note">Jika bar di bawah 45%, segera gunakan aksi darurat pemulihan produsen!</div>'
        + '</div>',
      illus: 'health'
    },
    {
      badge: 'Langkah 3 &bull; Kartu Aksi &amp; Kausalitas',
      title: 'STRATEGI KARTU AKSI',
      desc: 'Hadapi <b>4 Kasus Masalah Kausalitas</b> di tiap ekosistem (2 ulah alam, 2 ulah manusia). Gunakan <b>3 kartu aksi</b> di dock bawah layar secara terencana dan presisi.',
      extra: '<div class="bento-tips-card">'
        + '<div class="bento-tips-header"><span class="bento-tips-icon">⚡</span><span class="bento-tips-title">Prioritas Aksi Kausalitas (C2)</span></div>'
        + '<div class="bento-strategy-bar">'
        + '<span class="strat-step">1. Atasi Ancaman</span>'
        + '<span class="strat-ar">&rarr;</span>'
        + '<span class="strat-step">2. Pulihkan Produsen</span>'
        + '<span class="strat-ar">&rarr;</span>'
        + '<span class="strat-step">3. Seimbangkan Rantai</span>'
        + '</div>'
        + '<div class="bento-tips-note">Perhatikan jeda istirahat kartu (1,2 detik) agar tidak terjadi pemborosan kuota aksi.</div>'
        + '</div>',
      illus: 'actions'
    },
    {
      badge: 'Langkah 4 &bull; Prestasi &amp; Kuis C2',
      title: 'MUSYAWARAH &amp; KUIS C2',
      desc: 'Di Hari ke-30, simulasi dijeda untuk <b>voting kelas</b> kartu fisik 3 warna! Di akhir misi, selesaikan <b>kuis C2</b> untuk mengumpulkan total <b>48 Bintang Prestasi</b> (12 per kelompok).',
      extra: '<div class="bento-tips-card">'
        + '<div class="bento-tips-header"><span class="bento-tips-icon">🏆</span><span class="bento-tips-title">Kriteria Perolehan Bintang</span></div>'
        + '<div class="bento-stars-grid">'
        + '<div class="star-badge-card"><span class="sb-star">★</span><b>Keseimbangan &ge; 75%</b><small>Tercapai di akhir hari</small></div>'
        + '<div class="star-badge-card"><span class="sb-star">★★</span><b>Lulus Kuis C2</b><small>Sebab-akibat benar</small></div>'
        + '<div class="star-badge-card"><span class="sb-star">★★★</span><b>Percobaan Pertama</b><small>Menang tanpa ulang</small></div>'
        + '</div>'
        + '<div class="bento-tips-note">Bekerjasamalah antar anggota kelompok untuk meraih bintang sempurna!</div>'
        + '</div>',
      illus: 'vote'
    }
  ];
}

function howIllusHTML(kind){
  if(kind === 'teams'){
    return '<div class="mock-panel">'
      + '<div class="mock-panel-top">'
      + '<span class="mock-panel-badge">TIM DETEKTIF ALAM</span>'
      + '<span class="mock-panel-sub">Tap untuk melihat tim</span>'
      + '</div>'
      + '<div class="mock-teams-grid" id="mock-teams"></div>'
      + '<div class="mock-panel-hint">' + ic('check', 18) + ' 4 Tim siap menyelidiki bioma masing-masing</div>'
      + '</div>';
  }
  if(kind === 'health'){
    return '<div class="mock-panel mock-panel-hud">'
      + '<div class="mock-panel-top">'
      + '<span class="mock-panel-badge">STATUS SIMULASI EKOSISTEM</span>'
      + '<span class="mock-panel-sub">Indikator Real-Time</span>'
      + '</div>'
      + '<div class="mock-hud-body">'
      + '<div class="mock-day-card">'
      + '<div class="mock-day-label">WAKTU SIMULASI</div>'
      + '<div class="mock-day-val">Hari <b>12</b><span> / 40</span></div>'
      + '<span class="mock-day-tag">Simulasi Berjalan</span>'
      + '</div>'
      + '<div class="mock-hp-card">'
      + '<div class="mock-hp-header">'
      + '<span>Keseimbangan Ekosistem</span>'
      + '<span class="mock-hp-pct">82% <small>(SEHAT)</small></span>'
      + '</div>'
      + '<div class="mock-hp-track">'
      + '<div class="mock-hp-fill" style="width:82%"></div>'
      + '<div class="mock-hp-marker m45" title="Batas Bahaya (45%)"></div>'
      + '<div class="mock-hp-marker m75" title="Target Sehat (75%)"></div>'
      + '</div>'
      + '<div class="mock-hp-zones">'
      + '<span class="hz-danger">&lt; 45% Bahaya</span>'
      + '<span class="hz-warn">45 - 74% Waspada</span>'
      + '<span class="hz-healthy">&ge; 75% Sehat</span>'
      + '</div>'
      + '</div>'
      + '</div>'
      + '<div class="mock-panel-hint">' + ic('check', 18) + ' Bar hijau = Kondisi ekosistem stabil dan aman!</div>'
      + '</div>';
  }
  if(kind === 'actions'){
    return '<div class="mock-panel mock-panel-actions">'
      + '<div class="mock-panel-top">'
      + '<span class="mock-panel-badge">DOCK KARTU AKSI</span>'
      + '<span class="mock-panel-sub">Kuadran Bawah Layar</span>'
      + '</div>'
      + '<div class="mock-dock-grid">'
      + '<div class="mock-action-card ready">'
      + '<div class="mock-ac-ic">' + ic('drop', 32) + '</div>'
      + '<div class="mock-ac-name">Alirkan Air</div>'
      + '<button class="mock-ac-btn btn-act">Lakukan!</button>'
      + '<div class="mock-ac-quota">Sisa Kuota: <b>6</b></div>'
      + '</div>'
      + '<div class="mock-action-card cooling">'
      + '<div class="mock-ac-ic">' + ic('sprout', 32) + '</div>'
      + '<div class="mock-ac-name">Tanam Padi</div>'
      + '<button class="mock-ac-btn btn-cd">Istirahat…</button>'
      + '<div class="mock-ac-cdbar"><i style="width:65%"></i></div>'
      + '<div class="mock-ac-cdtxt">Jeda 1,2 detik</div>'
      + '</div>'
      + '<div class="mock-action-card ready">'
      + '<div class="mock-ac-ic">' + ic('mushroom', 32) + '</div>'
      + '<div class="mock-ac-name">Urai Jerami</div>'
      + '<button class="mock-ac-btn btn-act">Lakukan!</button>'
      + '<div class="mock-ac-quota">Sisa Kuota: <b>5</b></div>'
      + '</div>'
      + '</div>'
      + '<div class="mock-panel-hint">' + ic('check', 18) + ' Pilih kartu sesuai gejala gangguan rantai makanan</div>'
      + '</div>';
  }
  return '<div class="mock-panel mock-panel-eval">'
    + '<div class="mock-panel-top">'
    + '<span class="mock-panel-badge">MUSYAWARAH &amp; KUIS C2</span>'
    + '<span class="mock-panel-sub">Kolaborasi Kelas</span>'
    + '</div>'
    + '<div class="mock-eval-body">'
    + '<div class="mock-vote-box">'
    + '<div class="mock-vote-head"><span>🗳️ Hari ke-30: Voting Kartu Fisik</span></div>'
    + '<div class="mock-vote-cards">'
    + '<div class="mock-vcard vc-green"><span class="vc-tag">🟢 KARTU HIJAU</span><b>Aksi Aman</b></div>'
    + '<div class="mock-vcard vc-yellow"><span class="vc-tag">🟡 KARTU KUNING</span><b>Aksi Cepat</b></div>'
    + '<div class="mock-vcard vc-red"><span class="vc-tag">🔴 KARTU MERAH</span><b>Aksi Radikal</b></div>'
    + '</div>'
    + '</div>'
    + '<div class="mock-quiz-box">'
    + '<div class="mock-quiz-q">❓ <b>Kuis C2:</b> Apa akibat jika populasi ular sawah punah?</div>'
    + '<div class="mock-quiz-opts">'
    + '<div class="mock-qopt">A. Populasi elang meningkat pesat</div>'
    + '<div class="mock-qopt correct">' + ic('check', 18) + ' B. Hama tikus melonjak &amp; padi rusak</div>'
    + '<div class="mock-qopt">C. Tanaman wereng mati seketika</div>'
    + '</div>'
    + '</div>'
    + '</div>'
    + '<div class="mock-panel-hint">' + ic('check', 18) + ' Musyawarah kelas melatih penalaran kritis dan kolaborasi</div>'
    + '</div>';
}

function drawHowTeams(){
  const grid = el('#mock-teams');
  if(!grid || typeof TEAMS === 'undefined' || typeof MASC === 'undefined') return;
  grid.innerHTML = '';
  const teamBiomes = {
    sawah: '🌾 Lahan Sawah',
    hutan: '🌳 Hutan Hujan',
    sungai: '💧 Aliran Sungai',
    laut: '🌊 Terumbu Karang'
  };
  TEAMS.forEach(t => {
    const card = document.createElement('div');
    card.className = 'mock-team-card';
    card.innerHTML = '<div class="mt-canvas-wrap"><canvas width="110" height="110"></canvas></div>'
      + '<div class="mt-info">'
      + '<span class="mt-name">' + t.name.replace('Tim ', '') + '</span>'
      + '<span class="mt-biome">' + (teamBiomes[t.id] || t.role) + '</span>'
      + '</div>';
    grid.appendChild(card);
    const cv = card.querySelector('canvas');
    if(cv && MASC[t.mascot]){
      const c = cv.getContext('2d');
      c.save();
      c.translate(55, 62);
      c.scale(0.38, 0.38);
      MASC[t.mascot](c);
      c.restore();
    }
  });
}

function renderHowStep(silent){
  const steps = howSteps();
  howStep = Math.max(0, Math.min(steps.length - 1, howStep));
  const s = steps[howStep];

  // Tab aktif
  el('#scr-how').querySelectorAll('.how-step-tab').forEach((b, i) => b.classList.toggle('on', i === howStep));

  // Slide content
  const slide = el('#how-slide');
  if(slide){
    slide.innerHTML = '<div class="how-illus">' + howIllusHTML(s.illus) + '</div>'
      + '<div class="how-step-body">'
      + '<div class="bento-badge">' + s.badge + '</div>'
      + '<div class="bento-title">' + s.title + '</div>'
      + '<p class="bento-desc">' + s.desc + '</p>'
      + s.extra
      + '</div>';
  }
  if(s.illus === 'teams') drawHowTeams();

  // Navigation button states
  const prev = el('#how-prev'), next = el('#how-next');
  if(prev) prev.disabled = howStep === 0;
  if(next) next.innerHTML = howStep === steps.length - 1
    ? 'Mulai Petualangan ' + ic('arrowR', 26)
    : 'Lanjut ' + ic('arrowR', 26);

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
      <!-- Top Command Bar (Ramping & Terintegrasi) -->
      <div class="how-header-bar">
        <button class="btn btn-secondary how-back-btn" id="how-back">
          ${ic('back', 26)}
          <span>MENU UTAMA</span>
        </button>
        
        <div class="how-header-title">
          <div class="how-title-text">CARA BERMAIN &amp; ATURAN MISI</div>
          <div class="how-title-sub">4 Langkah Rahasia Menjadi Detektif Alam Tangguh</div>
        </div>

        <!-- Inline Gita Voice Assistant Pill -->
        <div class="how-gita-pill-btn" id="how-gita-trigger" role="button" tabindex="0" title="Klik untuk mendengarkan panduan suara Gita">
          <div class="how-gita-mini-avatar">
            ${gitaSVG(56, 'talk')}
          </div>
          <div class="how-gita-mini-msg">
            <span class="hg-tag">GITA &bull; Panduan Suara</span>
            <span class="hg-text">Pelajari 4 langkah rahasia di bawah ini!</span>
          </div>
          <div class="hg-listen-badge">
            ${ic('soundOn', 20)}
            <span>Dengarkan</span>
          </div>
        </div>

        <div class="how-header-actions">
          <button class="btn tb-btn fs-btn" id="how-fs" title="Layar Penuh" aria-label="Layar Penuh"></button>
          <button class="btn tb-btn snd-btn" id="how-snd"></button>
        </div>
      </div>

      <!-- Stepper Box (Lega & Compact) -->
      <div class="how-stepper">
        <div class="how-steps-bar">
          <button class="how-step-tab" data-s="0"><span class="tab-num">1</span><span class="tab-txt">Pilih Tim</span></button>
          <button class="how-step-tab" data-s="1"><span class="tab-num">2</span><span class="tab-txt">Keseimbangan</span></button>
          <button class="how-step-tab" data-s="2"><span class="tab-num">3</span><span class="tab-txt">Kartu Aksi</span></button>
          <button class="how-step-tab" data-s="3"><span class="tab-num">4</span><span class="tab-txt">Kuis C2</span></button>
        </div>
        <div class="how-step-slide" id="how-slide"></div>
        <div class="how-step-nav">
          <button class="btn btn-secondary" id="how-prev">${ic('back', 26)} Kembali</button>
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

  const fsBtn = el('#how-fs');
  if (fsBtn) {
    fsBtn.onclick = () => {
      toggleFullScreen();
    };
  }

  const gitaTrigger = el('#how-gita-trigger');
  if (gitaTrigger) {
    gitaTrigger.onclick = () => {
      sfx.click();
      if(typeof playVO === 'function') playVO('vo_how_intro');
    };
  }

  renderHowStep(true);
  if(typeof playVO === 'function') playVO('vo_how_intro');
  syncSound();
  if (typeof syncFullScreen === 'function') syncFullScreen();
}
