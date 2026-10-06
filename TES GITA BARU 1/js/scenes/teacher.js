/* ============================================================
   ECO-EXPLORER — js/scenes/teacher.js
   Layar Penuh: Panduan Guru & Kurikulum IPAS (Cockpit 3 Kolom)
   ============================================================ */

function buildTeacher() {
  const root = el('#scr-teacher');
  if (!root) return;

  const curStars = typeof totStars === 'function' ? totStars() : 0;
  teacherStep = 0;

  root.innerHTML = `
    <div class="teacher-screen-wrap">
      <!-- Top Command Bar -->
      <div class="teacher-header-bar">
        <button class="btn btn-secondary teacher-back-btn" id="teacher-back">
          ${ic('back', 28)}
          <span>MENU UTAMA</span>
        </button>
        <div class="teacher-header-title">
          <div class="teacher-title-text">PANDUAN GURU &amp; KURIKULUM IPAS</div>
          <div class="teacher-title-sub">Model Pembelajaran Alessi &amp; Trollip &bull; Pendekatan Kolaboratif CSCL Kelas 5A</div>
        </div>
        <div class="teacher-header-right">
          <div class="teacher-school-badge" id="teacher-badge" title="Ketuk 5x berturut-turut untuk Mode Penguji (Buka Semua)">
            <span class="badge-dot"></span>
            <span>SDN Percobaan 2 Malang &bull; Kelas 5A</span>
          </div>
          <button class="btn tb-btn snd-btn" id="teacher-snd"></button>
        </div>
      </div>

      <!-- Stepper: 1 kolom per halaman -->
      <div class="t-stepper">
        <div class="t-steps-bar">
          <button class="t-step-tab" data-s="0"><b>1</b><span>Kurikulum</span></button>
          <button class="t-step-tab" data-s="1"><b>2</b><span>Sintaks Kelas</span></button>
          <button class="t-step-tab" data-s="2"><b>3</b><span>Evaluasi</span></button>
        </div>
        <div class="t-step-slide" id="t-slide"></div>
        <div class="t-step-nav">
          <button class="btn btn-secondary" id="t-prev">${ic('back', 24)} Kembali</button>
          <div class="t-dots"></div>
          <button class="btn btn-gold" id="t-next"></button>
        </div>
      </div>
    </div>
  `;

  // Step tabs + nav
  root.querySelectorAll('.t-step-tab').forEach(b => {
    b.onclick = () => { teacherStep = +b.dataset.s; renderTeacherStep(); };
  });
  el('#t-prev').onclick = () => { if(teacherStep > 0){ teacherStep--; renderTeacherStep(); } else sfx.click(); };
  el('#t-next').onclick = () => {
    if(teacherStep < 2){ teacherStep++; renderTeacherStep(); }
    else { sfx.click(); buildTeam(); go('team'); }
  };

  // Bind Back Button
  const backBtn = el('#teacher-back');
  if (backBtn) {
    backBtn.onclick = (e) => {
      if (e) { e.preventDefault(); e.stopPropagation(); }
      sfx.back();
      go('title');
    };
  }

  // Bind Sound Button
  const sndBtn = el('#teacher-snd');
  if (sndBtn) {
    sndBtn.onclick = () => {
      toggleSound();
      syncSound();
    };
  }

  // Bind Examiner 5-Tap Gesture on School Badge
  const badgeEl = el('#teacher-badge');
  if (badgeEl) {
    let tapCount = 0;
    let tapTimer = null;
    badgeEl.onclick = () => {
      tapCount++;
      clearTimeout(tapTimer);
      tapTimer = setTimeout(() => { tapCount = 0; }, 3000);
      if (tapCount >= 5) {
        tapCount = 0;
        if (typeof MISSIONS !== 'undefined') {
          MISSIONS.forEach(m => { G.stars[m.id] = 3; });
          saveG();
          titleBubble();
          if (typeof sfx !== 'undefined' && sfx.win) sfx.win();
          toast('Mode Penguji / Dosen Aktif: 48/48 Bintang & 16 Misi Terbuka!');
          buildTeacher();
        }
      }
    };
  }

  renderTeacherStep(true);
  syncSound();
}

let teacherStep = 0;

function teacherSlides(curStars){
  const cpText = typeof ASSESSMENT_CP !== 'undefined'
    ? ASSESSMENT_CP
    : 'Capaian pembelajaran Ilmu Pengetahuan Alam dan Sosial pada Fase C (kelas V SD) menekankan kemampuan peserta didik dalam memahami hingga menganalisis bagaimana alam semesta seperti hubungan antar komponen biotik dan abiotik, serta lingkungan sosial pengaruh terhadap ekosistem yang dapat terjadi di sekitarnya.';

  return [
    { title: '1. KURIKULUM &amp; TUJUAN', badge: 'Fase C IPAS',
      body: `
        <div class="tcard">
          <div class="tcard-h">Capaian Pembelajaran (CP) Fase C</div>
          <p class="tcard-p">
            ${cpText}
          </p>
        </div>
        <div class="tcard">
          <div class="tcard-h">4 Tujuan Pembelajaran (TP) IPAS Ekosistem</div>
          <div class="t-tp-grid">
            <div class="t-tp-item">
              <span class="t-tp-pill">TP 1</span>
              <span class="t-tp-text">Mengidentifikasi komponen biotik dan abiotik dalam berbagai jenis ekosistem.</span>
            </div>
            <div class="t-tp-item">
              <span class="t-tp-pill">TP 2</span>
              <span class="t-tp-text">Memahami hubungan rantai makanan dan jaring-jaring makanan pada ekosistem hutan tropis, laut, sawah, dan sungai.</span>
            </div>
            <div class="t-tp-item">
              <span class="t-tp-pill">TP 3</span>
              <span class="t-tp-text">Memprediksi dampak perubahan jumlah populasi komponen biotik terhadap rantai makanan dalam suatu ekosistem.</span>
            </div>
            <div class="t-tp-item">
              <span class="t-tp-pill">TP 4</span>
              <span class="t-tp-text">Menganalisis dampak perubahan populasi komponen biotik terhadap keseimbangan ekosistem, serta dampak aktivitas manusia terhadap keseimbangan ekosistem.</span>
            </div>
          </div>
        </div>
        <div class="tcard">
          <div class="tcard-h">Penguatan Penalaran Kognitif C2 &amp; Model Alessi &amp; Trollip</div>
          <p class="tcard-p">
            Mengatasi ketimpangan <b>C1 vs C2</b>: Mengalihkan siswa dari sekadar menghafal fakta definisi (C1) menuju pemahaman relasional kausalitas ekologis (Piaget &amp; Mayer) melalui siklus <b>POE (Predict - Observe - Explain)</b> pada 4 Bioma Nusantara.
          </p>
        </div>` },
    { title: '2. SINTAKS KELAS &amp; CSCL', badge: 'Model Jigsaw',
      body: `
        <div class="tcard">
          <div class="tcard-h">Diferensiasi Peran Siswa (25 Siswa Kelas 5A)</div>
          <div class="t-roles-grid">
            <div class="t-role-card">
              <div class="t-role-tag">5 Petugas Layar IFP</div>
              <p class="tcard-p">Perwakilan tim bergantian mengeksekusi kartu aksi di layar sentuh interaktif sesuai keputusan kelompok.</p>
            </div>
            <div class="t-role-card">
              <div class="t-role-tag">20 Penasihat Meja</div>
              <p class="tcard-p">Berdiskusi aktif di meja kelompok, memegang Buku Catatan Detektif (LKPD Fisik), dan mengangkat kartu voting.</p>
            </div>
          </div>
        </div>
        <div class="tcard">
          <div class="tcard-h">Musyawarah Kartu Voting 3 Warna (CSCL)</div>
          <p class="tcard-p">
            Saat hari musyawarah tiba, simulasi terjeda otomatis. Guru memandu voting kelas 15 detik: kelompok mengangkat kartu fisik
            <span class="t-vchip chip-hijau">Hijau</span>,
            <span class="t-vchip chip-kuning">Kuning</span>, atau
            <span class="t-vchip chip-merah">Merah</span>
            untuk menentukan aksi penyelamatan gratis bersama.
          </p>
        </div>
        <div class="tcard">
          <div class="tcard-h">Integrasi LKPD Detektif Sawah</div>
          <p class="tcard-p">
            Siswa mencatat kondisi awal populasi, menuliskan prediksi dampak krisis, dan menyusun diagram rantai sebab-akibat 4 organisme pada tahap debriefing pasca-simulasi.
          </p>
        </div>` },
    { title: '3. EVALUASI &amp; KONTROL', badge: curStars + '/48 Bintang',
      body: `
        <div class="tcard">
          <div class="tcard-h">Formula 3 Bintang Detektif</div>
          <div class="t-stars-list">
            <div class="t-star-item"><b>★ Bintang 1:</b> Menjaga Kesehatan Ekosistem &ge; 75% saat target misi tercapai.</div>
            <div class="t-star-item"><b>★★ Bintang 2:</b> Lulus Kuis Sebab-Akibat C2 pada tahap debriefing.</div>
            <div class="t-star-item"><b>★★★ Bintang 3:</b> Menjawab benar kuis C2 pada percobaan pertama (first attempt).</div>
          </div>
        </div>
        <div class="tcard tcard-actions">
          <div class="tcard-h">Bank Instrumen Pretest &amp; Posttest (20 Butir Soal C2)</div>
          <p class="tcard-p" style="margin-bottom:14px">
            Instrumen tes terstandar yang dipetakan ke 4 Tujuan Pembelajaran (TP) dan 4 Bioma untuk mengukur <i>Normalized Gain (N-Gain)</i> penalaran kausalitas siswa kelas 5A.
          </p>
          <button class="btn btn-gold t-exam-btn" id="t-exam-btn">
            <span>Buka Bank Soal (20 Butir Evaluasi)</span>
          </button>
        </div>
        <div class="tcard tcard-actions">
          <div class="tcard-h">Pusat Kendali Data Progres Kelas</div>
          <div class="t-reset-row">
            <div class="tcard-p" style="flex:1">
              Progres bintang kelas (<b>${curStars}/48 Bintang</b>) tersimpan otomatis di perangkat. Gunakan tombol reset saat memulai sesi penelitian atau kelas baru.
            </div>
            <button class="btn btn-secondary-danger" id="t-reset-btn">
              <span>Reset Progres</span>
            </button>
          </div>
        </div>` }
  ];
}

function renderTeacherStep(silent){
  const curStars = typeof totStars === 'function' ? totStars() : 0;
  const slides = teacherSlides(curStars);
  teacherStep = Math.max(0, Math.min(slides.length - 1, teacherStep));
  const s = slides[teacherStep];
  const root = el('#scr-teacher');
  root.querySelectorAll('.t-step-tab').forEach((b, i) => b.classList.toggle('on', i === teacherStep));
  const dots = root.querySelector('.t-dots');
  if(dots) dots.innerHTML = slides.map((_, i) => '<i class="' + (i === teacherStep ? 'on' : '') + '"></i>').join('');
  const slide = el('#t-slide');
  if(slide){
    slide.innerHTML = '<div class="tcol-header">'
      + '<span class="tcol-title">' + s.title + '</span>'
      + '<span class="tcol-badge">' + s.badge + '</span></div>'
      + '<div class="tcol-body">' + s.body + '</div>';
  }
  bindTeacherSlideActions();
  const prev = el('#t-prev'), next = el('#t-next');
  if(prev) prev.disabled = teacherStep === 0;
  if(next) next.innerHTML = teacherStep === slides.length - 1
    ? 'Mulai Pembelajaran ' + ic('arrowR', 24)
    : 'Lanjut ' + ic('arrowR', 24);
  if(!silent) sfx.click();
}

function bindTeacherSlideActions(){

  // Bind Exam Viewer Button (slide 3)
  const examBtn = el('#t-exam-btn');
  if (examBtn) {
    examBtn.onclick = () => {
      openAssessmentModal();
    };
  }

  // Bind Reset Button with IFP In-Engine Confirmation Modal (slide 3)
  const resetBtn = el('#t-reset-btn');
  if (resetBtn) {
    resetBtn.onclick = () => {
      sfx.click();
      const starsNow = typeof totStars === 'function' ? totStars() : 0;
      const modalContent = `
        <div class="t-modal-confirm">
          <div class="t-modal-h">${ic('bin', 32)} Konfirmasi Reset Progres Kelas</div>
          <p class="t-modal-p">
            Apakah Ibu/Bapak Guru yakin ingin menghapus seluruh perolehan bintang (<b>${starsNow} dari 48 bintang</b>) dan memulai sesi kelas dari awal?
          </p>
          <p class="t-modal-sub">
            Tindakan ini akan mengosongkan riwayat misi yang telah diselesaikan kelompok siswa.
          </p>
          <div class="t-modal-actions">
            <button class="btn btn-secondary" id="tm-cancel">Batal</button>
            <button class="btn btn-ruby" id="tm-confirm">Ya, Reset Progres</button>
          </div>
        </div>
      `;
      const m = modal(modalContent);
      const cancelBtn = m.querySelector('#tm-cancel');
      if (cancelBtn) {
        cancelBtn.onclick = () => {
          sfx.click();
          closeModal();
        };
      }
      const confirmBtn = m.querySelector('#tm-confirm');
      if (confirmBtn) {
        confirmBtn.onclick = () => {
          sfx.click();
          G.stars = {};
          saveG();
          titleBubble();
          closeModal();
          toast('Progres berhasil direset. Sesi baru siap dimulai!');
          buildTeacher();
        };
      }
    };
  }
}

/* ============================================================
   BANK SOAL PRETEST & POSTTEST MODAL (IFP ERGONOMICS)
   ============================================================ */
let currentAssessmentFilter = 0; // 0 = all, 1..4 = TP 1..4
let showAssessmentKeys = true;

function openAssessmentModal() {
  if (typeof PRETEST_POSTTEST_BANK === 'undefined' || !PRETEST_POSTTEST_BANK) {
    toast('Bank soal evaluasi belum dimuat!');
    return;
  }
  sfx.click();
  renderAssessmentModalContent();
}

function renderAssessmentModalContent() {
  const filter = currentAssessmentFilter;
  const items = filter === 0 
    ? PRETEST_POSTTEST_BANK 
    : PRETEST_POSTTEST_BANK.filter(q => q.tpId === filter);

  const modalHtml = `
    <div class="t-assess-modal">
      <div class="t-assess-header">
        <div>
          <div class="t-assess-title">Bank Instrumen Pretest &amp; Posttest IPAS Fase C</div>
          <div class="t-assess-sub">SDN Percobaan 2 Malang &bull; 20 Butir Soal Pilihan Ganda &bull; Level Kognitif C1–C4</div>
        </div>
        <button class="btn btn-secondary" id="tam-close" style="height:52px;font-size:24px;padding:0 24px">✕ Tutup</button>
      </div>

      <!-- Filters & Controls Bar -->
      <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px">
        <div class="t-assess-filters">
          <button class="t-assess-filter-btn ${filter === 0 ? 'active' : ''}" data-f="0">Semua (20)</button>
          <button class="t-assess-filter-btn ${filter === 1 ? 'active' : ''}" data-f="1">TP 1: Biotik/Abiotik (6)</button>
          <button class="t-assess-filter-btn ${filter === 2 ? 'active' : ''}" data-f="2">TP 2: Rantai Makanan (8)</button>
          <button class="t-assess-filter-btn ${filter === 3 ? 'active' : ''}" data-f="3">TP 3: Dinamika C2 (4)</button>
          <button class="t-assess-filter-btn ${filter === 4 ? 'active' : ''}" data-f="4">TP 4: Keseimbangan (5)</button>
        </div>
        <button class="btn btn-gold" id="tam-toggle-keys" style="height:52px;font-size:24px;padding:0 24px">
          ${showAssessmentKeys ? 'Sembunyikan Kunci' : 'Tampilkan Kunci'}
        </button>
      </div>

      <!-- Question Cards List -->
      <div class="t-qlist">
        ${items.map(item => {
          const letters = ['A', 'B', 'C', 'D'];
          const biomeLabels = { sawah: 'Bioma Sawah', hutan: 'Bioma Hutan', sungai: 'Bioma Sungai', laut: 'Bioma Laut', umum: 'Konsep Umum' };
          const biomeTag = biomeLabels[item.biome] || item.biome;
          return `
            <div class="t-qcard">
              <div class="t-qcard-top">
                <span class="t-qbadge" style="background:#0e7a5a;color:#fef08a">No. ${item.id}</span>
                <span class="t-qbadge tp${item.tpId}">TP ${item.tpId}</span>
                <span class="t-qbadge" style="background:rgba(255,255,255,.15);color:#fff">${biomeTag}</span>
                <span class="t-qbadge" style="background:rgba(254,240,138,.2);color:var(--gold)">Level ${item.level}</span>
              </div>
              <div class="t-qtext">${item.q}</div>
              <div class="t-qopts">
                ${item.opts.map((opt, oi) => {
                  const isCorrect = oi === item.correct;
                  const optClass = (showAssessmentKeys && isCorrect) ? 't-qopt correct' : 't-qopt';
                  return `
                    <div class="${optClass}">
                      <span class="t-qopt-key">${letters[oi]}</span>
                      <span>${opt}</span>
                      ${(showAssessmentKeys && isCorrect) ? '<span style="margin-left:auto;font-size:24px;font-weight:700;color:#34d399">✓ KUNCI</span>' : ''}
                    </div>
                  `;
                }).join('')}
              </div>
              ${showAssessmentKeys ? `
                <div class="t-qexplain">
                  <b>Pembahasan &amp; Konsep:</b> ${item.explain}
                </div>
              ` : ''}
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;

  const m = modal(modalHtml);
  if (!m) return;

  // Bind Close
  const closeBtn = m.querySelector('#tam-close');
  if (closeBtn) closeBtn.onclick = () => { sfx.click(); closeModal(); };

  // Bind Toggle Keys
  const toggleBtn = m.querySelector('#tam-toggle-keys');
  if (toggleBtn) {
    toggleBtn.onclick = () => {
      sfx.click();
      showAssessmentKeys = !showAssessmentKeys;
      renderAssessmentModalContent();
    };
  }

  // Bind Filters
  m.querySelectorAll('.t-assess-filter-btn').forEach(btn => {
    btn.onclick = () => {
      sfx.click();
      currentAssessmentFilter = +btn.dataset.f;
      renderAssessmentModalContent();
    };
  });
}
