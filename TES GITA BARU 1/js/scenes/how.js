/* ============================================================
   ECO-EXPLORER — js/scenes/how.js
   Layar Penuh: Cara Bermain & Aturan Misi (Bento Grid 4 Panel)
   ============================================================ */

function buildHow() {
  const root = el('#scr-how');
  if (!root) return;

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

      <!-- Visual Bento Grid 4 Panels -->
      <div class="how-bento-grid">
        <!-- Panel 1: Pilih Tim Spesialis -->
        <div class="how-bento-card bento-p1">
          <div class="bento-badge">Langkah 1 &bull; 5 Maskot</div>
          <div class="bento-title">
            <span class="bento-ic">${ic('users', 32)}</span>
            <span>PILIH TIM SPESIALIS</span>
          </div>
          <p class="bento-desc">
            Pilih salah satu dari <b>5 Tim Ahli</b> (Padi, Elang, Katak, Jamur, Ular). Setiap tim memiliki <b>keahlian khusus</b> yang memberikan bonus kuota aksi dan masa istirahat (cooldown) lebih singkat pada aksi andalannya!
          </p>
          <div class="bento-chips-row">
            <span class="bento-chip chip-padi">Padi (Produsen)</span>
            <span class="bento-chip chip-ular">Ular (Predator Hama)</span>
            <span class="bento-chip chip-jamur">Jamur (Pengurai)</span>
            <span class="bento-chip chip-elang">Elang (Predator Puncak)</span>
            <span class="bento-chip chip-katak">Katak (Bioindikator)</span>
          </div>
        </div>

        <!-- Panel 2: Keseimbangan & Siklus Hari -->
        <div class="how-bento-card bento-p2">
          <div class="bento-badge">Langkah 2 &bull; Eco-Health</div>
          <div class="bento-title">
            <span class="bento-ic">${ic('target', 32)}</span>
            <span>PANTAU KESEHATAN &amp; HARI</span>
          </div>
          <p class="bento-desc">
            Perhatikan <b>Bar Kesehatan Ekosistem</b> dan <b>Target Hari</b>. Setiap hari kondisi alam berevolusi dinamis. Selamatkan ekosistem sebelum target hari habis dan capai status <b>SEHAT (&ge; 75%)</b>!
          </p>
          <div class="bento-zones-row">
            <span class="zone-pill zone-danger">Bahaya (&lt; 45%)</span>
            <span class="zone-pill zone-warn">Waspada (45 - 74%)</span>
            <span class="zone-pill zone-healthy">Sehat (&ge; 75%)</span>
          </div>
        </div>

        <!-- Panel 3: Kartu Aksi & Jeda Cooldown -->
        <div class="how-bento-card bento-p3">
          <div class="bento-badge">Langkah 3 &bull; Jeda 1,2 Detik</div>
          <div class="bento-title">
            <span class="bento-ic">${ic('clock', 32)}</span>
            <span>STRATEGI KARTU AKSI</span>
          </div>
          <p class="bento-desc">
            Gunakan <b>3 kartu aksi</b> di kuadran bawah layar secara cermat. Setiap aksi memiliki kuota pemakaian dan <b>jeda reaksi alam 1,2 detik</b>. Kaidah utama: atasi sumber ancaman krisis terlebih dahulu, baru pulihkan populasi!
          </p>
          <div class="bento-strategy-bar">
            <span class="strat-step">1. Atasi Ancaman</span>
            <span class="strat-ar">&rarr;</span>
            <span class="strat-step">2. Pulihkan Produsen</span>
            <span class="strat-ar">&rarr;</span>
            <span class="strat-step">3. Seimbangkan Rantai</span>
          </div>
        </div>

        <!-- Panel 4: Musyawarah Kelas & Kuis 3 Bintang -->
        <div class="how-bento-card bento-p4">
          <div class="bento-badge">Langkah 4 &bull; 24 Bintang</div>
          <div class="bento-title">
            <span class="bento-ic">${ic('medal', 32)}</span>
            <span>MUSYAWARAH &amp; KUIS C2</span>
          </div>
          <p class="bento-desc">
            Di hari musyawarah, simulasi dijeda untuk <b>voting kelas</b> menggunakan kartu fisik 3 warna! Manfaatkan <b>Kamus Alam</b> dan selesaikan <b>kuis sebab-akibat C2</b> di akhir misi untuk mengumpulkan total <b>24 Bintang Prestasi</b>.
          </p>
          <div class="bento-stars-row">
            <span class="star-chip">★ Kesehatan &ge; 75%</span>
            <span class="star-chip">★★ Lulus Kuis C2</span>
            <span class="star-chip">★★★ Percobaan Pertama</span>
          </div>
        </div>
      </div>

      <!-- Bottom CTA Action Bar -->
      <div class="how-footer-bar">
        <button class="btn btn-gold how-cta-btn" id="how-cta-start">
          <span>MULAI PETUALANGAN SEKARANG!</span>
          <svg class="ic" width="30" height="30" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5l11 7-11 7Z"/></svg>
        </button>
      </div>
    </div>
  `;

  // Bind Buttons
  const backBtn = el('#how-back');
  if (backBtn) {
    backBtn.onclick = () => {
      sfx.click();
      go('title');
    };
  }

  const ctaBtn = el('#how-cta-start');
  if (ctaBtn) {
    ctaBtn.onclick = () => {
      sfx.click();
      buildTeam();
      go('team');
    };
  }

  const sndBtn = el('#how-snd');
  if (sndBtn) {
    sndBtn.onclick = () => {
      toggleSound();
      syncSound();
    };
  }

  syncSound();
}
