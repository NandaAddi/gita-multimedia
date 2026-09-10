/**
 * ECO-EXPLORER (PHASER 3) - TUTORIAL SCENE (PANDUAN CARA BERMAIN)
 * Desain UI Premium Retro RPG Setara Homescreen:
 * • Plakat kayu rim emas & dedaunan
 * • Karakter Gita berdiri melambai ramah dengan balon dialog interaktif
 * • Bento Grid 4 kartu visual dengan ikon pixel art & lencana trofik
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

    // 1. Background Sawah Pixel Art & Ambient Dark Tint
    const bg = this.add.image(width / 2, height / 2, 'bg_sawah');
    bg.setDisplaySize(width, height);
    this.add.rectangle(width / 2, height / 2, width, height, 0x021a14, 0.72);

    // 2. Data Komprehensif 4 Slide Panduan (Bento Grid Visual Cards)
    this.slides = [
      {
        stepNum: 1,
        title: 'LANGKAH 1: MISI PENYELAMATAN SAWAH',
        tag: 'TANTANGAN KELAS 5A',
        subtitle: '5 Kelompok Kolaboratif Menyelamatkan Keseimbangan Ekosistem',
        speech: 'Halo teman-teman detektif! Sawah kita sedang mengalami krisis darurat. Sebanyak 25 siswa di kelas akan dibagi menjadi 5 kelompok penjaga alam. Tiap kelompok akan bergantian maju ke layar sentuh selama 7 menit. Tugas kita adalah mengembalikan kesehatan sawah hingga bar berwarna hijau subur!',
        bubbleTip: 'Mari bekerja sama menyelamatkan sawah desa kita!',
        cardBorder: 0x10b981,
        cards: [
          {
            icon: '👥',
            badgeKey: 'badge_elang',
            tag: '5 KELOMPOK AKTIF',
            title: 'Pembagian Kelompok & Rotasi',
            desc: '25 Siswa dibagi menjadi 5 tim (Elang, Ular, Katak, Padi, Jamur). Setiap kelompok bergantian maju memecahkan kasus krisis di layar IFP.',
            accent: 0x10b981
          },
          {
            icon: '⏱️',
            badgeKey: null,
            tag: 'DURASI 7 MENIT',
            title: 'Waktu Misi Terukur',
            desc: 'Setiap kelompok memiliki waktu 7 menit untuk mengamati kaskade trofik, menganalisis perubahan alam, dan mengambil tindakan penyelamatan.',
            accent: 0x38bdf8
          },
          {
            icon: '🏆',
            badgeKey: null,
            tag: 'TARGET KESEHATAN >= 75%',
            title: 'Kondisi Sawah Sehat',
            desc: 'Keseimbangan tercapai jika Bar Kesehatan Sawah mencapai warna HIJAU SUBUR (75%–100%) dan mampu bertahan stabil selama 12 detik.',
            accent: 0xf59e0b
          },
          {
            icon: '🎖️',
            badgeKey: 'badge_padi',
            tag: '20 CO-PILOT DI MEJA',
            title: 'Seluruh Kelas Terlibat Aktif',
            desc: 'Teman-teman di bangku bukan penonton! Kalian bertindak sebagai Co-Pilot yang mencatat data di LKPD dan mengangkat kartu voting fisik!',
            accent: 0xa855f7
          }
        ]
      },
      {
        stepNum: 2,
        title: 'LANGKAH 2: RANTAI MAKANAN SAWAH',
        tag: 'HUBUNGAN SEBAB-AKIBAT (C2)',
        subtitle: 'Siapa Makan Siapa? Pahami Alur Ketergantungan Makhluk Hidup',
        speech: 'Perhatikan alur rantai makanan sawah! Padi adalah produsen utama sumber makanan. Tikus memakan padi. Ular dan katak adalah sahabat petani yang memangsa hama. Burung elang menjaga jumlah ular, dan jamur mengurai jerami mati menjadi pupuk alami penyubur padi.',
        bubbleTip: 'Semua makhluk hidup saling bergantung satu sama lain!',
        cardBorder: 0x38bdf8,
        cards: [
          {
            icon: '🌾',
            badgeKey: 'padi_subur',
            tag: 'PRODUSEN UTAMA',
            title: 'Tanaman Padi Subur',
            desc: 'Sumber energi makanan bagi seluruh ekosistem sawah. Jika tanaman padi layu atau habis dimakan hama, seluruh hewan pemakan padi akan kelaparan!',
            accent: 0xf59e0b
          },
          {
            icon: '🐀',
            badgeKey: 'tikus',
            tag: 'KONSUMEN PRIMER',
            title: 'Hama Tikus Sawah',
            desc: 'Memakan batang dan bulir padi. Jumlahnya akan meledak tak terkendali jika predator alaminya seperti ular sawah diburu atau dimusnahkan!',
            accent: 0xef4444
          },
          {
            icon: '🐍',
            badgeKey: 'ular',
            tag: 'PREDATOR ALAMI',
            title: 'Ular & Katak Sahabat Petani',
            desc: 'Pengendali hayati alami! Ular sawah memangsa tikus, sedangkan katak memburu serangga wereng. Jangan basmi pemangsa alami ini!',
            accent: 0x10b981
          },
          {
            icon: '🍄',
            badgeKey: 'jamur',
            tag: 'DEKOMPOSER ALAMI',
            title: 'Jamur Pengurai Jerami',
            desc: 'Mendaur ulang sisa bangkai dan tumpukan jerami kering menjadi pupuk humus organik yang mengembalikan zat hara kesuburan padi.',
            accent: 0xa855f7
          }
        ]
      },
      {
        stepNum: 3,
        title: 'LANGKAH 3: KONTROL ZONA SENTUH IFP',
        tag: 'ERGONOMI LAYAR SENTUH',
        subtitle: 'Sentuh Tombol Aksi di Bawah dan Perhatikan Jeda Reaksi Alam',
        speech: 'Gunakan tombol di zona bawah layar untuk menambah hewan pemangsa, mengalirkan air irigasi, atau mengurai sisa jerami. Setiap tombol ditekan, ada jeda reaksi alam selama 1.2 detik. Manfaatkan jeda ini untuk berdiskusi bersama tim!',
        bubbleTip: 'Tunggu sebentar setelah menekan tombol ya!',
        cardBorder: 0xf59e0b,
        cards: [
          {
            icon: '🖐️',
            badgeKey: null,
            tag: 'KUADRAN BAWAH',
            title: 'Jangkauan Ramah Siswa SD',
            desc: 'Seluruh tombol interaksi berada di kuadran bawah layar sentuh (Y: 780–1050 px) agar pas dan nyaman dijangkau oleh tinggi badan siswa kelas 5.',
            accent: 0x38bdf8
          },
          {
            icon: '🔘',
            badgeKey: null,
            tag: 'UKURAN 80x80 PIKSEL',
            title: 'Tombol Anti-Salah Sentuh',
            desc: 'Tombol dibuat ekstra besar dengan jarak sela yang lega sehingga jari tangan anak tidak mudah salah sentuh tombol saat beraksi.',
            accent: 0x10b981
          },
          {
            icon: '⏳',
            badgeKey: null,
            tag: 'PROGRESS BAR 1.2 DETIK',
            title: 'Jeda Observasi Alam',
            desc: 'Cooldown bar memberi waktu bagi alam untuk bereaksi secara matematis, mencegah siswa memencet tombol berkali-kali tanpa berpikir (*anti-spam*).',
            accent: 0xf59e0b
          },
          {
            icon: '🤝',
            badgeKey: null,
            tag: 'DUKUNGAN MULTI-TOUCH',
            title: 'Kolaborasi 2 Operator',
            desc: 'Layar IFP mendukung hingga 4 sentuhan simultan sehingga 2 siswa dapat berinteraksi bersamaan tanpa saling memblokir perintah input layar.',
            accent: 0xa855f7
          }
        ]
      },
      {
        stepNum: 4,
        title: 'LANGKAH 4: BANTUAN CO-PILOT (VOTING)',
        tag: 'CSCL KOLABORASI KELAS',
        subtitle: 'Siswa di Meja Mengangkat Kartu Voting Warna untuk Memandu Misi',
        speech: 'Jika kelompok di depan layar merasa bingung, tekan tombol TANYA TEMAN! Teman-teman di meja akan serempak mengangkat kartu warna fisik untuk memberi saran tindakan terbaik!',
        bubbleTip: 'Angkat kartu voting kalian tinggi-tinggi di meja!',
        cardBorder: 0xa855f7,
        cards: [
          {
            icon: '📢',
            badgeKey: null,
            tag: 'TOMBOL TANYA TEMAN',
            title: 'Panggilan Diskusi Kelas',
            desc: 'Tekan tombol ini di layar IFP! Timer simulasi otomatis dijeda dan bel kelas berbunyi memberi waktu 15 detik bagi seluruh siswa di meja untuk berdiskusi.',
            accent: 0x38bdf8
          },
          {
            icon: '🟢',
            badgeKey: 'badge_katak',
            tag: 'KARTU HIJAU FISIK',
            title: 'Tambah Pemangsa / Jamur',
            desc: 'Angkat kartu hijau jika tim merekomendasikan menambah Ular, Katak, atau Jamur Pengurai untuk memulihkan rantai makanan.',
            accent: 0x10b981
          },
          {
            icon: '🟡',
            badgeKey: 'icon_irigasi',
            tag: 'KARTU KUNING FISIK',
            title: 'Alirkan Air Irigasi',
            desc: 'Angkat kartu kuning jika tanah sawah tampak retak-retak kekeringan dan tanaman padi membutuhkan pasokan air segar segera.',
            accent: 0xf59e0b
          },
          {
            icon: '🔴',
            badgeKey: 'tikus',
            tag: 'KARTU MERAH FISIK',
            title: 'Kendalikan Hama / Racun',
            desc: 'Angkat kartu merah jika tim merekomendasikan membatasi lonjakan hama tikus atau membersihkan semprotan racun kimia dari tanah.',
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
    const headerH = 78;

    // Wadah Plakat Kayu Hijau Hutan
    const headerBg = this.add.graphics();
    headerBg.fillStyle(0x052e16, 0.96);
    headerBg.fillRoundedRect(width / 2 - headerW / 2, headerY - headerH / 2, headerW, headerH, 16);
    headerBg.lineStyle(3, 0xf59e0b, 1);
    headerBg.strokeRoundedRect(width / 2 - headerW / 2, headerY - headerH / 2, headerW, headerH, 16);

    // Tombol Kembali ke Menu Utama (Kiri)
    const btnBack = this.add.rectangle(width / 2 - headerW / 2 + 125, headerY, 200, 50, 0x1e293b)
      .setInteractive({ useHandCursor: true });
    btnBack.setStrokeStyle(2, 0x94a3b8);
    const tBack = this.add.text(width / 2 - headerW / 2 + 125, headerY, '🚪 MENU UTAMA', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '17px',
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
    this.add.text(width / 2, headerY - 14, '📖 BUKU PANDUAN: CARA MENJADI PENJAGA SAWAH', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '25px',
      color: '#fef08a',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    // Pill Sub-Header Langkah Aktif
    this.subHeaderPill = this.add.text(width / 2, headerY + 18, 'Langkah 1 dari 4 • Tantangan Kelas 5A', {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '15px',
      color: '#a7f3d0',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    // Tombol Siap Bermain (Kanan Atas)
    const btnPlay = this.add.rectangle(width / 2 + headerW / 2 - 125, headerY, 200, 50, 0x059669)
      .setInteractive({ useHandCursor: true });
    btnPlay.setStrokeStyle(2, 0xfef08a);
    const tPlay = this.add.text(width / 2 + headerW / 2 - 125, headerY, '🚀 SIAP BERMAIN!', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '18px',
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
    const tabLabels = ['[1] MISI', '[2] RANTAI', '[3] KONTROL', '[4] CO-PILOT'];
    const tabW = 88;
    const tabSpacing = 96;
    const tabStartX = leftCenterX - ((4 - 1) * tabSpacing) / 2;

    for (let i = 0; i < 4; i++) {
      const tx = tabStartX + (i * tabSpacing);
      const btn = this.add.rectangle(tx, boardY - 330, tabW, 36, 0x1e293b)
        .setInteractive({ useHandCursor: true });
      btn.setStrokeStyle(2, 0x475569);

      const tText = this.add.text(tx, boardY - 330, tabLabels[i], {
        fontFamily: 'Fredoka, sans-serif',
        fontSize: '13px',
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
    const bubbleW = 370;
    const bubbleH = 80;

    const bG = this.add.graphics();
    bG.fillStyle(0xfffdf5, 0.98);
    bG.fillRoundedRect(bubbleX - bubbleW / 2, bubbleY - bubbleH / 2, bubbleW, bubbleH, 14);
    bG.lineStyle(2, 0x1e293b, 1);
    bG.strokeRoundedRect(bubbleX - bubbleW / 2, bubbleY - bubbleH / 2, bubbleW, bubbleH, 14);

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
      fontSize: '16px',
      color: '#0f172a',
      fontStyle: 'bold',
      align: 'center',
      wordWrap: { width: bubbleW - 40 }
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
    this.btnVoiceSlide = this.add.rectangle(leftCenterX, boardY + 310, 340, 54, 0x10b981)
      .setInteractive({ useHandCursor: true });
    this.btnVoiceSlide.setStrokeStyle(3, 0xfef08a);
    this.tVoiceSlide = this.add.text(leftCenterX, boardY + 310, '🔊 DENGARKAN GITA', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '20px',
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    this.btnVoiceSlide.on('pointerdown', () => {
      this.btnVoiceSlide.setScale(0.93);
      this.time.delayedCall(100, () => this.btnVoiceSlide.setScale(1.0));
      const slide = this.slides[this.currentSlide];
      const voKey = `vo_tutor_slide${this.currentSlide + 1}`;
      if (window.soundEngine) {
        window.soundEngine.playBeep();
        window.soundEngine.playVO(voKey, slide.speech);
      }
    });

    // ==========================================
    // KOLOM KANAN: BENTO GRID 4 KARTU VISUAL
    // ==========================================
    const rightStartX = dividerX + 40;
    const rightW = boardW - (dividerX - (width / 2 - boardW / 2)) - 80; // ~1330 px

    // Banner Header Judul Slide
    this.bannerCard = this.add.rectangle(rightStartX + rightW / 2, boardY - 305, rightW, 72, 0x0f172a, 0.95);
    this.bannerCard.setStrokeStyle(2, 0xf59e0b);

    this.slideTitleText = this.add.text(rightStartX + 30, boardY - 317, '', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '26px',
      color: '#fef08a',
      fontStyle: 'bold'
    }).setOrigin(0, 0.5);

    this.slideSubtitleText = this.add.text(rightStartX + 30, boardY - 290, '', {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '16px',
      color: '#94a3b8'
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
      const tagText = this.add.text(pos.x - cardColW / 2 + 102, pos.y - cardRowH / 2 + 36, 'KATEGORI', {
        fontFamily: 'Fredoka, sans-serif',
        fontSize: '14px',
        color: '#38bdf8',
        fontStyle: 'bold'
      });

      // Judul Kartu
      const titleText = this.add.text(pos.x - cardColW / 2 + 102, pos.y - cardRowH / 2 + 62, 'Judul Kartu', {
        fontFamily: 'Fredoka, sans-serif',
        fontSize: '20px',
        color: '#ffffff',
        fontStyle: 'bold'
      });

      // Garis Pembatas Halus di Bawah Judul
      const lineY = pos.y - cardRowH / 2 + 94;
      const lineG = this.add.graphics();
      lineG.lineStyle(1, 0x334155, 0.8);
      lineG.strokeLineShape(new Phaser.Geom.Line(pos.x - cardColW / 2 + 25, lineY, pos.x + cardColW / 2 - 25, lineY));

      // Deskripsi Paragraf
      const descText = this.add.text(pos.x - cardColW / 2 + 25, lineY + 15, 'Penjelasan lengkap...', {
        fontFamily: 'Nunito, sans-serif',
        fontSize: '17px',
        color: '#cbd5e1',
        wordWrap: { width: cardColW - 50 },
        lineSpacing: 6
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
    this.btnPrev = this.add.rectangle(width / 2 - 280, navY, 220, 54, 0x1e293b)
      .setInteractive({ useHandCursor: true });
    this.btnPrev.setStrokeStyle(2, 0x94a3b8);
    this.btnPrevText = this.add.text(width / 2 - 280, navY, '◀️ SEBELUMNYA', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '18px',
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
    const dotSpacing = 50;
    const dotStartX = width / 2 - ((4 - 1) * dotSpacing) / 2;

    for (let i = 0; i < 4; i++) {
      const dx = dotStartX + (i * dotSpacing);
      const dot = this.add.rectangle(dx, navY, 36, 36, 0x1e293b)
        .setInteractive({ useHandCursor: true });
      dot.setStrokeStyle(2, 0x475569);

      const dText = this.add.text(dx, navY, `${i + 1}`, {
        fontFamily: 'Fredoka, sans-serif',
        fontSize: '17px',
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
    this.btnNext = this.add.rectangle(width / 2 + 280, navY, 240, 54, 0x0284c7)
      .setInteractive({ useHandCursor: true });
    this.btnNext.setStrokeStyle(2, 0x38bdf8);
    this.btnNextText = this.add.text(width / 2 + 280, navY, 'SELANJUTNYA ▶️', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '18px',
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
