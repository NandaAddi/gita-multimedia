/**
 * ECO-EXPLORER (PHASER 3) - TUTORIAL SCENE (PANDUAN CARA BERMAIN)
 * Desain UI Premium Modern 2D Vector Setara Homescreen:
 * • Plakat kayu rim emas & dedaunan
 * • Karakter Gita berdiri melambai ramah dengan balon dialog interaktif
 * • Bento Grid 4 kartu visual dengan ikon vektor modern & lencana trofik
 * • Tombol navigasi audio vokal studio (vo_tutor_slide1-4)
 * • Quick-Jump tabs untuk akses instan ke langkah 1, 2, 3, atau 4
 */

class TutorialScene extends Phaser.Scene {
  constructor() {
    super({ key: 'TutorialScene' });
  }

  init() {
    this.currentSlide = 0;
  }

  create() {
    const { width, height } = this.scale;

    // 1. Background Sawah Modern 2D Vector & Ambient Dark Tint
    const bg = this.add.image(width / 2, height / 2, 'bg_sawah');
    bg.setDisplaySize(width, height);
    this.add.rectangle(width / 2, height / 2, width, height, 0x021a14, 0.72);

    // 2. Data Komprehensif 4 Slide Panduan (Bento Grid Visual Cards)
    this.slides = [
      {
        stepNum: 1,
        title: 'LANGKAH 1: 4 EKOSISTEM NUSANTARA',
        tag: 'PETUALANGAN KELAS 5A',
        subtitle: 'Jelajahi empat ekosistem Nusantara bersama',
        speech: 'Langkah pertama! Kita akan menjelajahi empat ekosistem Nusantara: Sawah, Hutan Tropis, Sungai, dan Laut. Tiap ekosistem punya dua misi penyelamatan. Selesaikan semua untuk jadi Maha Detektif!',
        bubbleTip: 'Yuk, jaga keseimbangan 4 ekosistem!',
        cardBorder: 0x10b981,
        cards: [
          {
            icon: '\uD83C\uDF3E',
            badgeKey: 'badge_sawah',
            tag: 'SAWAH',
            title: 'Ekosistem Sawah',
            desc: 'Lahan pangan padi tempat petani, hama tikus, dan predator alami berinteraksi.',
            accent: 0x10b981
          },
          {
            icon: '\uD83C\uDF32',
            badgeKey: 'badge_hutan',
            tag: 'HUTAN TROPIS',
            title: 'Ekosistem Hutan Tropis',
            desc: 'Rimba hujan tropis rumah bagi Harimau Sumatera, rusa, dan pohon raksasa.',
            accent: 0x16a34a
          },
          {
            icon: '\uD83C\uDF0A',
            badgeKey: 'badge_danau',
            tag: 'SUNGAI',
            title: 'Ekosistem Sungai',
            desc: 'Perairan sungai air tawar tempat ikan, bangau, teratai, dan keong hidup.',
            accent: 0x0891b2
          },
          {
            icon: '\uD83D\uDC1F',
            badgeKey: 'badge_laut',
            tag: 'LAUT',
            title: 'Ekosistem Laut',
            desc: 'Samudra tropis Nusantara dengan terumbu karang, penyu, dan ikan badut.',
            accent: 0x0284c7
          }
        ]
      },
      {
        stepNum: 2,
        title: 'LANGKAH 2: DUA JENIS KRISIS',
        tag: 'ALAM VS MANUSIA',
        subtitle: 'Setiap ekosistem punya 2 misi berbeda',
        speech: 'Langkah kedua: tiap ekosistem menghadapi dua krisis. Krisis pertama disebabkan oleh alam, seperti kemarau dan gelombang panas. Krisis kedua disebabkan ulah manusia, seperti penebangan liar dan pencemaran limbah!',
        bubbleTip: 'Kenali penyebab kerusakan ekosistem!',
        cardBorder: 0x38bdf8,
        cards: [
          {
            icon: '\u2600\uFE0F',
            badgeKey: null,
            tag: 'FAKTOR ALAM',
            title: 'Misi 1: Ulah Alam',
            desc: 'Kemarau panjang, gelombang panas samudra, dan ledakan gulma alami yang merusak ekosistem.',
            accent: 0xd97706
          },
          {
            icon: '\uD83D\uDEAB',
            badgeKey: null,
            tag: 'FAKTOR MANUSIA',
            title: 'Misi 2: Ulah Manusia',
            desc: 'Penebangan liar, perburuan, pencemaran limbah, dan pengeboman ikan yang merusak rantai makanan.',
            accent: 0xef4444
          },
          {
            icon: '\u2B50',
            badgeKey: null,
            tag: 'SISTEM BINTANG',
            title: 'Raih 3 Bintang',
            desc: 'Simulasi berhasil: 1 bintang. Kuis benar: 2 bintang. Kuis benar pertama kali: 3 bintang!',
            accent: 0xf59e0b
          },
          {
            icon: '\uD83D\uDD13',
            badgeKey: null,
            tag: 'BUKA KUNCI',
            title: 'Progresi Bertahap',
            desc: 'Selesaikan Sawah dulu baru Hutan Tropis terbuka. Lalu Sungai, terakhir Laut!',
            accent: 0xa855f7
          }
        ]
      },
      {
        stepNum: 3,
        title: 'LANGKAH 3: CARA MENYENTUH LAYAR',
        tag: 'SENTUH & TUNGGU',
        subtitle: 'Sentuh tombol, lalu lihat apa yang terjadi di ekosistem',
        speech: 'Langkah ketiga! Sentuh tombol di bawah layar. Setelah itu, tunggu sebentar dan lihat apa yang terjadi di ekosistem!',
        bubbleTip: 'Tunggu sebentar setelah menyentuh tombol, ya!',
        cardBorder: 0xf59e0b,
        cards: [
          {
            icon: '\uD83D\uDD90\uFE0F',
            badgeKey: null,
            tag: 'DI BAWAH',
            title: 'Tombol di Bawah',
            desc: 'Semua tombol ada di bagian bawah layar, mudah dijangkau.',
            accent: 0x38bdf8
          },
          {
            icon: '\uD83D\uDD18',
            badgeKey: null,
            tag: 'TOMBOL BESAR',
            title: 'Ukuran Pas & Nyaman',
            desc: 'Tombolnya besar, jadi jarimu tidak salah sentuh saat memilih aksi.',
            accent: 0x10b981
          },
          {
            icon: '\u23F3',
            badgeKey: null,
            tag: 'JEDA SEBENTAR',
            title: 'Jeda 1,2 Detik',
            desc: 'Setelah menyentuh tombol, tunggu sebentar. Perhatikan apa yang berubah di ekosistem!',
            accent: 0xf59e0b
          },
          {
            icon: '\uD83E\uDD1D',
            badgeKey: null,
            tag: 'MAIN BERDUA',
            title: 'Kolaborasi Bersama',
            desc: 'Dua temanmu boleh menyentuh layar bersamaan tanpa berebut.',
            accent: 0xa855f7
          }
        ]
      },
      {
        stepNum: 4,
        title: 'LANGKAH 4: PENASIHAT MEJA (VOTING)',
        tag: 'KERJA SAMA KELAS',
        subtitle: 'Teman di meja mengangkat kartu warna untuk memberi saran',
        speech: 'Langkah keempat! Teman di meja adalah Penasihat. Saat kami menyentuh Tanya Teman, angkat kartu warna kalian untuk memberi saran!',
        bubbleTip: 'Angkat kartu kalian tinggi-tinggi!',
        cardBorder: 0xa855f7,
        cards: [
          {
            icon: '\uD83D\uDCE2',
            badgeKey: 'btn_tanya_teman',
            tag: 'TANYA TEMAN',
            title: 'Tombol Tanya Teman',
            desc: 'Waktu berhenti sebentar. Penasihat Meja punya 15 detik untuk berdiskusi.',
            accent: 0x38bdf8
          },
          {
            icon: '\uD83D\uDFE2',
            badgeKey: 'card_voting_hijau',
            tag: 'KARTU HIJAU',
            title: 'Tambah Pemangsa / Pengurai',
            desc: 'Tambah predator atau pengurai untuk menjaga rantai makanan ekosistem.',
            accent: 0x10b981
          },
          {
            icon: '\uD83D\uDFE1',
            badgeKey: 'card_voting_kuning',
            tag: 'KARTU KUNING',
            title: 'Alirkan Air / Reboisasi',
            desc: 'Alirkan air atau tanam tumbuhan untuk memulihkan habitat.',
            accent: 0xf59e0b
          },
          {
            icon: '\uD83D\uDD34',
            badgeKey: 'card_voting_merah',
            tag: 'KARTU MERAH',
            title: 'Kurangi Hama / Bersihkan',
            desc: 'Kurangi hama atau bersihkan limbah dan sampah plastik.',
            accent: 0xef4444
          }
        ]
      }
    ];

    // 3. Render Komponen Visual Halaman
    this.createHeader(width);
    this.createMainBoard(width, height);
    this.createBottomNav(width, height);

    // 4. Render Slide Awal (Slide 1)
    this.renderSlide();
  }

  // --- TOP HEADER PLACARD (PREMIUM RETRO RPG STYLE) ---
  createHeader(width) {
    const headerY = 56;
    const headerW = 1840;
    const headerH = 86;

    // Wadah Plakat Kayu Hijau Hutan
    const headerBg = this.add.graphics();
    headerBg.fillStyle(0x052e16, 0.96);
    headerBg.fillRoundedRect(width / 2 - headerW / 2, headerY - headerH / 2, headerW, headerH, 16);
    headerBg.lineStyle(3, 0xf59e0b, 1);
    headerBg.strokeRoundedRect(width / 2 - headerW / 2, headerY - headerH / 2, headerW, headerH, 16);

    // Tombol Kembali ke Menu Utama (Kiri)
    const btnBack = this.add.rectangle(width / 2 - headerW / 2 + 135, headerY, 230, 56, 0x1e293b)
      .setInteractive({ useHandCursor: true });
    btnBack.setStrokeStyle(2, 0x94a3b8);
    const tBack = this.add.text(width / 2 - headerW / 2 + 135, headerY, '🚪 MENU UTAMA', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '24px',
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    btnBack.on('pointerover', () => {
      btnBack.setScale(1.04);
      btnBack.setStrokeStyle(2, 0xfef08a);
    });
    btnBack.on('pointerout', () => {
      btnBack.setScale(1.0);
      btnBack.setStrokeStyle(2, 0x94a3b8);
    });
    btnBack.on('pointerdown', () => {
      if (window.soundEngine) {
        window.soundEngine.playBeep();
        window.soundEngine.stopVoice();
      }
      this.scene.start('TitleScene');
    });

    // Judul Plakat Tengah
    this.add.text(width / 2, headerY - 16, '📖 BUKU PANDUAN: CARA JADI PENJAGA SAWAH', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '32px',
      color: '#fef08a',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    // Pill Sub-Header Langkah Aktif
    this.subHeaderPill = this.add.text(width / 2, headerY + 20, 'Langkah 1 dari 4 • Tantangan Kelas 5A', {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '24px',
      color: '#a7f3d0',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    // Tombol Siap Bermain (Kanan Atas)
    const btnPlay = this.add.rectangle(width / 2 + headerW / 2 - 135, headerY, 230, 56, 0x059669)
      .setInteractive({ useHandCursor: true });
    btnPlay.setStrokeStyle(2, 0xfef08a);
    const tPlay = this.add.text(width / 2 + headerW / 2 - 135, headerY, '🚀 SIAP BERMAIN!', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '24px',
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    // Animasi Denyut Halus pada Tombol Siap Bermain
    this.tweens.add({
      targets: btnPlay,
      scaleX: 1.03,
      scaleY: 1.03,
      duration: 800,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    btnPlay.on('pointerdown', () => {
      if (window.soundEngine) {
        window.soundEngine.playSuccess();
        window.soundEngine.stopVoice();
      }
      this.scene.start('TeamSelectScene');
    });
  }

  // --- MAIN QUEST BOARD CONTAINER ---
  createMainBoard(width, height) {
    const boardY = 495;
    const boardW = 1840;
    const boardH = 750;

    // Frame Luar Papan Petualangan
    const boardG = this.add.graphics();
    boardG.fillStyle(0x071914, 0.96);
    boardG.fillRoundedRect(width / 2 - boardW / 2, boardY - boardH / 2, boardW, boardH, 22);
    boardG.lineStyle(3, 0x10b981, 0.9);
    boardG.strokeRoundedRect(width / 2 - boardW / 2, boardY - boardH / 2, boardW, boardH, 22);
    this.mainBoardGraphic = boardG;

    // Garis Vertikal Pemisah Kolom Kiri (Gita) dan Kolom Kanan (Bento Grid)
    const dividerX = width / 2 - boardW / 2 + 430;
    boardG.lineStyle(2, 0x1e3a2f, 0.8);
    boardG.strokeLineShape(new Phaser.Geom.Line(dividerX, boardY - boardH / 2 + 30, dividerX, boardY + boardH / 2 - 30));

    // ==========================================
    // KOLOM KIRI: GITA MENTOR & QUICK-JUMP TABS
    // ==========================================
    const leftCenterX = width / 2 - boardW / 2 + 215;

    // 1. Quick-Jump Tabs (4 Tombol Pintas Langkah 1-4)
    this.tabButtons = [];
    const tabLabels = ['1. MISI', '2. TROFIK', '3. AKSI', '4. TIM'];
    const tabW = 98;
    const tabSpacing = 102;
    const tabStartX = leftCenterX - ((4 - 1) * tabSpacing) / 2;

    for (let i = 0; i < 4; i++) {
      const tx = tabStartX + (i * tabSpacing);
      const btn = this.add.rectangle(tx, boardY - 330, tabW, 46, 0x1e293b)
        .setInteractive({ useHandCursor: true });
      btn.setStrokeStyle(2, 0x475569);

      const tText = this.add.text(tx, boardY - 330, tabLabels[i], {
        fontFamily: 'Fredoka, sans-serif',
        fontSize: '24px',
        color: '#94a3b8',
        fontStyle: 'bold'
      }).setOrigin(0.5);

      btn.on('pointerdown', () => {
        if (this.currentSlide !== i) {
          if (window.soundEngine) window.soundEngine.playBeep();
          this.currentSlide = i;
          this.renderSlide();
        }
      });

      this.tabButtons.push({ btn, text: tText });
    }

    // 2. Balon Ucapan Gita yang Mengapung di Atas Kepala
    const bubbleX = leftCenterX;
    const bubbleY = boardY - 210;
    const bubbleW = 410;
    const bubbleH = 110;

    const bG = this.add.graphics();
    bG.fillStyle(0xfffdf5, 0.98);
    bG.fillRoundedRect(bubbleX - bubbleW / 2, bubbleY - bubbleH / 2, bubbleW, bubbleH, 16);
    bG.lineStyle(2, 0x1e293b, 1);
    bG.strokeRoundedRect(bubbleX - bubbleW / 2, bubbleY - bubbleH / 2, bubbleW, bubbleH, 16);

    // Ekor Balon Menunjuk ke Kepala Gita
    bG.fillStyle(0xfffdf5, 1);
    bG.fillTriangle(
      bubbleX - 18, bubbleY + bubbleH / 2 - 2,
      bubbleX + 2, bubbleY + bubbleH / 2 - 2,
      bubbleX - 8, bubbleY + bubbleH / 2 + 14
    );
    bG.lineStyle(2, 0x1e293b, 1);
    bG.strokeLineShape(new Phaser.Geom.Line(bubbleX - 18, bubbleY + bubbleH / 2 - 2, bubbleX - 8, bubbleY + bubbleH / 2 + 14));
    bG.strokeLineShape(new Phaser.Geom.Line(bubbleX + 2, bubbleY + bubbleH / 2 - 2, bubbleX - 8, bubbleY + bubbleH / 2 + 14));

    this.gitaBubbleText = this.add.text(bubbleX, bubbleY, 'Mari belajar menjaga sawah!', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '24px',
      color: '#0f172a',
      fontStyle: 'bold',
      align: 'center',
      wordWrap: { width: bubbleW - 30 },
      lineSpacing: 4
    }).setOrigin(0.5);

    // 3. Karakter Gita Full-Body Berdiri Ramah
    const gitaGroundY = boardY + 120;
    this.gitaSprite = this.add.image(leftCenterX, gitaGroundY, 'gita_idle');
    this.gitaSprite.setDisplaySize(230, 385);

    // Animasi Melayang Lembut (Bobbing Idle)
    this.tweens.add({
      targets: this.gitaSprite,
      y: gitaGroundY - 8,
      duration: 1800,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    // 4. Tombol Suara Vokal Studio Gita (🔊 DENGARKAN GITA)
    this.btnVoiceSlide = this.add.rectangle(leftCenterX, boardY + 310, 360, 60, 0x10b981)
      .setInteractive({ useHandCursor: true });
    this.btnVoiceSlide.setStrokeStyle(3, 0xfef08a);
    this.tVoiceSlide = this.add.text(leftCenterX, boardY + 310, '🔊 DENGARKAN GITA', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '26px',
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    this.btnVoiceSlide.on('pointerdown', () => {
      this.btnVoiceSlide.setScale(0.93);
      this.time.delayedCall(100, () => this.btnVoiceSlide.setScale(1.0));
      const slide = this.slides[this.currentSlide];

      if (this.gitaSprite && this.textures.exists('gita_talk')) {
        this.gitaSprite.setTexture('gita_talk');
      }

      const onSpeechDone = () => {
        if (this.gitaSprite && this.textures.exists('gita_idle')) {
          this.gitaSprite.setTexture(this.currentSlide === 3 ? 'gita_thumbsup' : 'gita_idle');
        }
      };

      if (this.currentSlide === 1) {
        if (window.soundEngine) {
          window.soundEngine.playBeep();
          window.soundEngine.playVO('vo_tutor_slide2a', 'Langkah kedua: siapa makan siapa di sawah? Padi adalah makanan utama. Tikus memakan padi. Ular dan katak memangsa hama.', () => {
            if (this.currentSlide === 1 && window.soundEngine) {
              window.soundEngine.playVO('vo_tutor_slide2b', 'Elang menjaga jumlah ular. Jamur mengubah jerami mati menjadi pupuk alami. Semua saling membutuhkan!', onSpeechDone);
            } else {
              onSpeechDone();
            }
          });
        }
      } else {
        const voKey = `vo_tutor_slide${this.currentSlide + 1}`;
        if (window.soundEngine) {
          window.soundEngine.playBeep();
          window.soundEngine.playVO(voKey, slide.speech, onSpeechDone);
        }
      }
    });

    // ==========================================
    // KOLOM KANAN: BENTO GRID 4 KARTU VISUAL
    // ==========================================
    const rightStartX = dividerX + 40;
    const rightW = boardW - (dividerX - (width / 2 - boardW / 2)) - 80; // ~1330 px

    // Banner Header Judul Slide
    this.bannerCard = this.add.rectangle(rightStartX + rightW / 2, boardY - 305, rightW, 80, 0x0f172a, 0.95);
    this.bannerCard.setStrokeStyle(2, 0xf59e0b);

    this.slideTitleText = this.add.text(rightStartX + 30, boardY - 320, '', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '34px',
      color: '#fef08a',
      fontStyle: 'bold'
    }).setOrigin(0, 0.5);

    this.slideSubtitleText = this.add.text(rightStartX + 30, boardY - 286, '', {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '24px',
      color: '#94a3b8',
      fontStyle: 'bold'
    }).setOrigin(0, 0.5);

    // Bento Grid 4 Kartu Interaktif (2 Kolom x 2 Baris)
    this.bentoCards = [];
    const cardColW = (rightW - 30) / 2; // ~650 px
    const cardRowH = 265;
    const col1X = rightStartX + cardColW / 2;
    const col2X = rightStartX + cardColW + 30 + cardColW / 2;
    const row1Y = boardY - 110;
    const row2Y = boardY + 180;

    const positions = [
      { x: col1X, y: row1Y },
      { x: col2X, y: row1Y },
      { x: col1X, y: row2Y },
      { x: col2X, y: row2Y }
    ];

    for (let i = 0; i < 4; i++) {
      const pos = positions[i];
      const box = this.add.rectangle(pos.x, pos.y, cardColW, cardRowH, 0x0f172a, 0.95);
      box.setStrokeStyle(2, 0x334155);

      // Badge Icon Bulat di Kiri Atas Kartu
      const iconCircle = this.add.circle(pos.x - cardColW / 2 + 52, pos.y - cardRowH / 2 + 52, 34, 0x1e293b);
      iconCircle.setStrokeStyle(2, 0x10b981);

      const iconText = this.add.text(pos.x - cardColW / 2 + 52, pos.y - cardRowH / 2 + 52, '🌱', {
        fontSize: '32px'
      }).setOrigin(0.5);

      // Gambar Sprite Khusus (Jika Ada)
      const spriteImg = this.add.image(pos.x - cardColW / 2 + 52, pos.y - cardRowH / 2 + 52, 'padi_subur');
      spriteImg.setDisplaySize(54, 54);
      spriteImg.setVisible(false);

      // Tag Kategori Kecil di Samping Icon
      const tagText = this.add.text(pos.x - cardColW / 2 + 102, pos.y - cardRowH / 2 + 30, 'KATEGORI', {
        fontFamily: 'Fredoka, sans-serif',
        fontSize: '24px',
        color: '#38bdf8',
        fontStyle: 'bold'
      });

      // Judul Kartu
      const titleText = this.add.text(pos.x - cardColW / 2 + 102, pos.y - cardRowH / 2 + 62, 'Judul Kartu', {
        fontFamily: 'Fredoka, sans-serif',
        fontSize: '28px',
        color: '#ffffff',
        fontStyle: 'bold'
      });

      // Garis Pembatas Halus di Bawah Judul
      const lineY = pos.y - cardRowH / 2 + 98;
      const lineG = this.add.graphics();
      lineG.lineStyle(1, 0x334155, 0.8);
      lineG.strokeLineShape(new Phaser.Geom.Line(pos.x - cardColW / 2 + 25, lineY, pos.x + cardColW / 2 - 25, lineY));

      // Deskripsi Paragraf
      const descText = this.add.text(pos.x - cardColW / 2 + 25, lineY + 12, 'Penjelasan lengkap...', {
        fontFamily: 'Nunito, sans-serif',
        fontSize: '24px',
        color: '#cbd5e1',
        wordWrap: { width: cardColW - 50 },
        lineSpacing: 5
      });

      // Hover Effect pada Kartu
      box.setInteractive({ useHandCursor: true });
      box.on('pointerover', () => {
        box.setScale(1.02);
        box.setStrokeStyle(3, 0xfef08a);
      });
      box.on('pointerout', () => {
        box.setScale(1.0);
        box.setStrokeStyle(2, 0x334155);
      });

      this.bentoCards.push({
        box,
        iconCircle,
        iconText,
        spriteImg,
        tagText,
        titleText,
        descText
      });
    }
  }

  // --- BOTTOM NAVIGATION & PAGINATION BAR ---
  createBottomNav(width, height) {
    const navY = height - 52;

    // Tombol Sebelumnya ◀️ (Kiri)
    this.btnPrev = this.add.rectangle(width / 2 - 290, navY, 240, 56, 0x1e293b)
      .setInteractive({ useHandCursor: true });
    this.btnPrev.setStrokeStyle(2, 0x94a3b8);
    this.btnPrevText = this.add.text(width / 2 - 290, navY, '◀️ SEBELUMNYA', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '24px',
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    this.btnPrev.on('pointerover', () => {
      this.btnPrev.setScale(1.04);
      this.btnPrev.setStrokeStyle(2, 0x38bdf8);
    });
    this.btnPrev.on('pointerout', () => {
      this.btnPrev.setScale(1.0);
      this.btnPrev.setStrokeStyle(2, 0x94a3b8);
    });
    this.btnPrev.on('pointerdown', () => {
      if (this.currentSlide > 0) {
        if (window.soundEngine) {
          window.soundEngine.playBeep();
          window.soundEngine.stopVoice();
        }
        this.currentSlide--;
        this.renderSlide();
      }
    });

    // Indikator Titik 4 Halaman Berangka ([1] [2] [3] [4])
    this.dots = [];
    const dotSpacing = 58;
    const dotStartX = width / 2 - ((4 - 1) * dotSpacing) / 2;

    for (let i = 0; i < 4; i++) {
      const dx = dotStartX + (i * dotSpacing);
      const dot = this.add.rectangle(dx, navY, 48, 48, 0x1e293b)
        .setInteractive({ useHandCursor: true });
      dot.setStrokeStyle(2, 0x475569);

      const dText = this.add.text(dx, navY, `${i + 1}`, {
        fontFamily: 'Fredoka, sans-serif',
        fontSize: '24px',
        color: '#94a3b8',
        fontStyle: 'bold'
      }).setOrigin(0.5);

      dot.on('pointerdown', () => {
        if (this.currentSlide !== i) {
          if (window.soundEngine) {
            window.soundEngine.playBeep();
            window.soundEngine.stopVoice();
          }
          this.currentSlide = i;
          this.renderSlide();
        }
      });

      this.dots.push({ dot, text: dText });
    }

    // Tombol Selanjutnya ▶️ (Kanan)
    this.btnNext = this.add.rectangle(width / 2 + 290, navY, 260, 56, 0x0284c7)
      .setInteractive({ useHandCursor: true });
    this.btnNext.setStrokeStyle(2, 0x38bdf8);
    this.btnNextText = this.add.text(width / 2 + 290, navY, 'SELANJUTNYA ▶️', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '24px',
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    this.btnNext.on('pointerover', () => {
      this.btnNext.setScale(1.04);
    });
    this.btnNext.on('pointerout', () => {
      this.btnNext.setScale(1.0);
    });

    this.btnNext.on('pointerdown', () => {
      if (this.currentSlide < this.slides.length - 1) {
        if (window.soundEngine) {
          window.soundEngine.playBeep();
          window.soundEngine.stopVoice();
        }
        this.currentSlide++;
        this.renderSlide();
      } else {
        // Jika di slide terakhir, meluncur langsung ke TeamSelectScene!
        if (window.soundEngine) {
          window.soundEngine.playSuccess();
          window.soundEngine.stopVoice();
        }
        this.scene.start('TeamSelectScene');
      }
    });
  }

  // --- RENDER PERUBAHAN ISI SLIDE ---
  renderSlide() {
    const slide = this.slides[this.currentSlide];

    // 1. Update Sub-Header Pill
    this.subHeaderPill.setText(`Langkah ${slide.stepNum} dari 4 • ${slide.tag}`);

    // 2. Update Balon Gita
    this.gitaBubbleText.setText(slide.bubbleTip);

    // 3. Update Banner Judul Kanan
    this.slideTitleText.setText(slide.title);
    this.slideSubtitleText.setText(slide.subtitle);
    this.bannerCard.setStrokeStyle(2, slide.cardBorder);

    // 4. Update Border Utama Sesuai Warna Tema Langkah
    this.mainBoardGraphic.lineStyle(3, slide.cardBorder, 0.9);

    // 5. Update Quick-Jump Tabs di Kolom Kiri
    this.tabButtons.forEach((tab, idx) => {
      if (idx === this.currentSlide) {
        tab.btn.setFillStyle(0x064e3b);
        tab.btn.setStrokeStyle(2, 0xfef08a);
        tab.text.setColor('#fef08a');
      } else {
        tab.btn.setFillStyle(0x1e293b);
        tab.btn.setStrokeStyle(2, 0x475569);
        tab.text.setColor('#94a3b8');
      }
    });

    // 6. Update 4 Bento Cards
    slide.cards.forEach((cData, idx) => {
      const cardUI = this.bentoCards[idx];
      cardUI.tagText.setText(cData.tag);
      cardUI.tagText.setColor(cData.accent === 0x10b981 ? '#34d399' : (cData.accent === 0x38bdf8 ? '#7dd3fc' : (cData.accent === 0xf59e0b ? '#fef08a' : '#c084fc')));
      cardUI.titleText.setText(cData.title);
      cardUI.descText.setText(cData.desc);
      cardUI.iconCircle.setStrokeStyle(2, cData.accent);

      if (cData.badgeKey && this.textures.exists(cData.badgeKey)) {
        cardUI.iconText.setVisible(false);
        cardUI.spriteImg.setTexture(cData.badgeKey);
        cardUI.spriteImg.setVisible(true);
      } else {
        cardUI.spriteImg.setVisible(false);
        cardUI.iconText.setText(cData.icon);
        cardUI.iconText.setVisible(true);
      }
    });

    // 7. Update Indikator Titik Angka Bawah
    this.dots.forEach((item, idx) => {
      if (idx === this.currentSlide) {
        item.dot.setFillStyle(0xf59e0b);
        item.dot.setStrokeStyle(2, 0xfef08a);
        item.dot.setScale(1.15);
        item.text.setColor('#0f172a');
      } else {
        item.dot.setFillStyle(0x1e293b);
        item.dot.setStrokeStyle(2, 0x475569);
        item.dot.setScale(1.0);
        item.text.setColor('#94a3b8');
      }
    });

    // 8. Update Tombol Prev & Next
    if (this.currentSlide === 0) {
      this.btnPrev.setAlpha(0.35);
      this.btnPrev.disableInteractive();
    } else {
      this.btnPrev.setAlpha(1.0);
      this.btnPrev.setInteractive({ useHandCursor: true });
    }

    if (this.currentSlide === this.slides.length - 1) {
      this.btnNext.setFillStyle(0x059669);
      this.btnNext.setStrokeStyle(3, 0xfef08a);
      this.btnNextText.setText('🚀 SIAP BERMAIN!');
    } else {
      this.btnNext.setFillStyle(0x0284c7);
      this.btnNext.setStrokeStyle(2, 0x38bdf8);
      this.btnNextText.setText('SELANJUTNYA ▶️');
    }
  }
}

window.TutorialScene = TutorialScene;
