/* ============================================================
   ECO-EXPLORER — js/scenes/about.js
   Layar Penuh: Profil Pengembang & Informasi Skripsi
   (Agita Khairunnisa - S1 Teknologi Pendidikan UM)
   Desain Bersih, Elegan, Tanpa AI-Slop / Badges / Bold Berlebih
   ============================================================ */

function buildAbout() {
  const root = el('#scr-about');
  if (!root) return;

  root.innerHTML = `
    <div class="about-screen-wrap">
      <!-- Header Bar -->
      <div class="about-header-bar">
        <button class="btn btn-secondary about-back-btn" id="about-back">
          ${ic('back', 26)}
          <span>Menu Utama</span>
        </button>
        <div class="about-header-title">
          <div class="about-title-text">Tentang Pengembang</div>
        </div>
        <div class="about-header-right">
          <button class="btn tb-btn snd-btn" id="about-snd"></button>
        </div>
      </div>

      <!-- Main Clean Showcase -->
      <div class="about-showcase">
        <!-- Kolom Kiri: Foto Profil & Identitas Ringkas -->
        <div class="about-profile-card">
          <div class="about-photo-frame">
            <img src="assets/Foto pas agita.webp" alt="Agita Khairunnisa" class="about-photo-img" />
          </div>
          <div class="about-profile-info">
            <h2 class="about-dev-name">Agita Khairunnisa</h2>
            <div class="about-affil-text">
              S1 Teknologi Pendidikan<br>
              Universitas Negeri Malang
            </div>
          </div>
        </div>

        <!-- Kolom Kanan: Teks Naskah Resmi Murni -->
        <div class="about-details-card">
          <div class="about-text-header">
            <h1 class="about-game-title">ECO-EXPLORER</h1>
            <div class="about-game-subtitle">Penjaga Keseimbangan Ekosistem Nusantara</div>
          </div>

          <div class="about-body-text">
            <p class="about-p">
              Halo!
            </p>
            <p class="about-p">
              ECO-EXPLORER (Penjaga Keseimbangan Ekosistem Nusantara) dikembangkan oleh Agita Khairunnisa sebagai produk penelitian dan pengembangan (R&amp;D) skripsi. Media pembelajaran game simulasi ini dirancang untuk membantu peserta didik kelas V (Fase C) Sekolah Dasar memahami hingga menganalisis konsep harmoni dalam ekosistem dengan cara yang menarik dan mudah dipahami.
            </p>
            <p class="about-p">
              Melalui tampilan visual yang interaktif dan fitur pembelajaran seperti simulasi ekosistem, kartu aksi pemulihan ekosistem, musyawarah kelas, dan kuis interaktif, ECO-EXPLORER mendorong peserta didik untuk belajar aktif, memahami hubungan sebab-akibat hingga menganalisis dalam ekosistem, serta mengambil keputusan ekologis secara bijak.
            </p>
            <p class="about-p">
              Dengan demikian, media ini diharapkan dapat meningkatkan pemahaman hingga analisis konsep Ilmu Pengetahuan Alam dan Sosial peserta didik sekolah dasar serta menciptakan pengalaman belajar yang menyenangkan dan bermakna.
            </p>
          </div>

          <div class="about-actions-row">
            <button class="btn btn-gold about-cta-btn" id="about-btn-play">
              Mulai Petualangan
            </button>
            <button class="btn btn-secondary about-cta-btn" id="about-btn-teacher">
              Panduan Guru
            </button>
          </div>
        </div>
      </div>
    </div>
  `;

  // Bind Back Button
  const backBtn = el('#about-back');
  if (backBtn) {
    backBtn.onclick = (e) => {
      if (e) { e.preventDefault(); e.stopPropagation(); }
      sfx.back();
      go('title');
    };
  }

  // Bind Sound Button
  const sndBtn = el('#about-snd');
  if (sndBtn) {
    sndBtn.onclick = () => {
      toggleSound();
      syncSound();
    };
  }

  // Bind CTA Play Button
  const playBtn = el('#about-btn-play');
  if (playBtn) {
    playBtn.onclick = () => {
      sfx.click();
      buildTeam();
      go('team');
    };
  }

  // Bind CTA Teacher Button
  const teacherBtn = el('#about-btn-teacher');
  if (teacherBtn) {
    teacherBtn.onclick = () => {
      sfx.click();
      buildTeacher();
      go('teacher');
    };
  }

  syncSound();
}
