/* ============================================================
   ECO-EXPLORER — js/scenes/teacher.js
   Layar Penuh: Panduan Guru & Kurikulum IPAS (Cockpit 3 Kolom)
   ============================================================ */

function buildTeacher() {
  const root = el('#scr-teacher');
  if (!root) return;

  const curStars = typeof totStars === 'function' ? totStars() : 0;

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

      <!-- Cockpit 3 Columns -->
      <div class="teacher-cockpit-grid">
        <!-- Kolom 1: Kurikulum & Landasan Kognitif -->
        <div class="teacher-col col-curriculum">
          <div class="tcol-header">
            <span class="tcol-ic">${ic('book', 28)}</span>
            <span class="tcol-title">1. KURIKULUM &amp; TUJUAN</span>
            <span class="tcol-badge">Fase C IPAS</span>
          </div>
          <div class="tcol-body">
            <div class="tcard">
              <div class="tcard-h">Capaian Pembelajaran (CP)</div>
              <p class="tcard-p">
                Peserta didik menyelidiki hubungan saling ketergantungan antar-komponen biotik dan abiotik yang memengaruhi kestabilan ekosistem, serta menganalisis dampak intervensi manusia vs alam di lingkungan sekitar Nusantara.
              </p>
            </div>
            <div class="tcard">
              <div class="tcard-h">Penguatan Penalaran Kognitif C2</div>
              <p class="tcard-p">
                Mengatasi ketimpangan <b>C1 vs C2</b>: Siswa kelas 5 mudah menghafal fakta definisi (C1), namun kesulitan memahami hubungan sebab-akibat. Simulasi ini melatih daya <b>inferring &amp; explaining</b> kaskade trofik secara konkret (Piaget &amp; Mayer).
              </p>
            </div>
            <div class="tcard">
              <div class="tcard-h">Model Alessi &amp; Trollip (2001)</div>
              <p class="tcard-p">
                Mengintegrasikan simulasi proses &amp; situasional dengan siklus <b>POE (Predict - Observe - Explain)</b>, umpan balik dinamis per siklus hari, dan debriefing formatif melalui kuis interaktif data-driven.
              </p>
            </div>
          </div>
        </div>

        <!-- Kolom 2: Sintaks Pembelajaran & Kolaborasi CSCL -->
        <div class="teacher-col col-syntax">
          <div class="tcol-header">
            <span class="tcol-ic">${ic('users', 28)}</span>
            <span class="tcol-title">2. SINTAKS KELAS &amp; CSCL</span>
            <span class="tcol-badge">Model Jigsaw</span>
          </div>
          <div class="tcol-body">
            <div class="tcard">
              <div class="tcard-h">Diferensiasi Peran Siswa (25 Anak)</div>
              <p class="tcard-p">
                <b>• 5 Petugas Layar IFP:</b> Perwakilan tim bergantian mengeksekusi kartu aksi di layar sentuh interaktif.<br>
                <b>• 20 Penasihat Meja:</b> Berdiskusi aktif di meja kelompok, memegang Buku Catatan Detektif (LKPD Fisik) dan kartu voting.
              </p>
            </div>
            <div class="tcard">
              <div class="tcard-h">Musyawarah Kartu Voting 3 Warna</div>
              <p class="tcard-p">
                Saat hari musyawarah tiba, simulasi terjeda otomatis. Guru memandu voting kelas 15 detik: kelompok mengangkat kartu fisik <b>Hijau</b>, <b>Kuning</b>, atau <b>Merah</b> untuk menentukan aksi penyelamatan gratis.
              </p>
            </div>
            <div class="tcard">
              <div class="tcard-h">Integrasi LKPD Detektif Sawah</div>
              <p class="tcard-p">
                Siswa mencatat kondisi awal populasi, menuliskan prediksi dampak krisis, dan menyusun diagram rantai sebab-akibat 4 organisme pada tahap debriefing pasca-simulasi.
              </p>
            </div>
          </div>
        </div>

        <!-- Kolom 3: Rubrik Evaluasi, Kontrol Data & Aksi -->
        <div class="teacher-col col-eval">
          <div class="tcol-header">
            <span class="tcol-ic">${ic('medal', 28)}</span>
            <span class="tcol-title">3. EVALUASI &amp; KONTROL</span>
            <span class="tcol-badge" id="t-star-badge">${curStars}/24 Bintang</span>
          </div>
          <div class="tcol-body">
            <div class="tcard">
              <div class="tcard-h">Formula 3 Bintang Detektif</div>
              <div class="t-stars-list">
                <div class="t-star-item"><b>★ Bintang 1:</b> Menjaga Kesehatan Ekosistem &ge; 75% saat target misi tercapai.</div>
                <div class="t-star-item"><b>★★ Bintang 2:</b> Lulus Kuis Sebab-Akibat C2 pada tahap debriefing.</div>
                <div class="t-star-item"><b>★★★ Bintang 3:</b> Menjawab benar kuis C2 pada percobaan pertama (first attempt).</div>
              </div>
            </div>

            <div class="tcard tcard-actions">
              <div class="tcard-h">Pusat Kendali Data Progres</div>
              <p class="tcard-p" style="margin-bottom:14px">
                Progres kelas tersimpan otomatis di perangkat. Gunakan tombol reset saat memulai sesi penelitian atau kelas baru.
              </p>
              <button class="btn btn-ruby t-reset-btn" id="t-reset-btn">
                ${ic('bin', 26)}
                <span>RESET PROGRES KELAS</span>
              </button>
            </div>

            <div class="tcard tcard-launch">
              <div class="tcard-h">Mulai Pembelajaran</div>
              <p class="tcard-p" style="margin-bottom:14px">
                Siapkan kelompok siswa kelas 5A dan langsung masuki panggung pemilihan tim detektif.
              </p>
              <button class="btn btn-gold t-start-btn" id="t-start-btn">
                <span>MULAI SESI KELAS ▶</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Bind Back Button
  const backBtn = el('#teacher-back');
  if (backBtn) {
    backBtn.onclick = () => {
      sfx.click();
      go('title');
    };
  }

  // Bind Start Button
  const startBtn = el('#t-start-btn');
  if (startBtn) {
    startBtn.onclick = () => {
      sfx.click();
      buildTeam();
      go('team');
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

  // Bind Reset Button with IFP In-Engine Confirmation Modal
  const resetBtn = el('#t-reset-btn');
  if (resetBtn) {
    resetBtn.onclick = () => {
      sfx.click();
      const starsNow = typeof totStars === 'function' ? totStars() : 0;
      const modalContent = `
        <div class="t-modal-confirm">
          <div class="t-modal-h">${ic('bin', 32)} Konfirmasi Reset Progres Kelas</div>
          <p class="t-modal-p">
            Apakah Ibu/Bapak Guru yakin ingin menghapus seluruh perolehan bintang (<b>${starsNow} dari 24 bintang</b>) dan memulai sesi kelas dari awal?
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
          toast('Mode Penguji / Dosen Aktif: 24/24 Bintang & 8 Misi Terbuka!');
          buildTeacher();
        }
      }
    };
  }

  syncSound();
}
