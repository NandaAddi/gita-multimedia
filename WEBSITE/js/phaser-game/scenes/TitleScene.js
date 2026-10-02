/**
 * ECO-EXPLORER (PHASER 3) - TITLE SCENE (HOMESCREEN / MENU UTAMA)
 * Dirancang khusus untuk Layar Sentuh Interactive Flat Panel (IFP) SDN Percobaan 2 Malang.
 * Tampilan UI Modern 2D Vector Cartoon 100% selaras dengan desain acuan:
 * - Background sawah panorama Modern 2D Vector 1080p
 * - Papan Judul Mewah Berbingkai Emas & Daun Rimbun
 * - Maskot Gita Melambai & Balon Ucapan Sapaan
 * - Tiga Kartu Aksi Interaktif (Mulai Bermain, Cara Bermain, Tentang & Panduan)
 * - Tombol Suara, Layar Penuh, dan Bar Tips Guru
 */

class TitleScene extends Phaser.Scene {
  constructor() {
    super({ key: 'TitleScene' });
  }

  create() {
    const { width, height } = this.scale;

    // 1. Background Sawah Modern 2D Vector 1080p Panorama
    const bg = this.add.image(width / 2, height / 2, 'bg_sawah');
    bg.setDisplaySize(width, height);

    // 2. Tombol Kontrol Pojok Kanan Atas (🔊 Suara & ⛶ Layar Penuh)
    this.createTopControls(width);

    // 3. Grand Title Billboard Mewah Emas & Daun
    this.createTitleBillboard(width);

    // 4. Maskot Gita Detektif Cilik & Balon Ucapan (Kiri Bawah)
    this.createGitaWelcome(width, height);

    // 6. 3 Kartu Aksi Utama Horizontal (Mulai Bermain, Cara Bermain, Tentang)
    this.createHorizontalActionCards(width);

    // 7. Kapsul Info Tips Guru (Bawah Layar)
    this.createTeacherTipBar(width, height);
  }

  // --- 2. TOMBOL KONTROL POJOK KANAN ATAS ---
  createTopControls(width) {
    const topY = 46;

    // Helper untuk membuat pill button interaktif
    const createPillButton = (x, text, isToggleAudio = false) => {
      const btnW = isToggleAudio ? 160 : 180;
      const btnH = 52;

      const pill = this.add.graphics();
      pill.fillStyle(0x0a353c, 0.92);
      pill.fillRoundedRect(-btnW / 2, -btnH / 2, btnW, btnH, 26);
      pill.lineStyle(2, 0x38bdf8, 1);
      pill.strokeRoundedRect(-btnW / 2, -btnH / 2, btnW, btnH, 26);

      const container = this.add.container(x, topY, [pill]);
      container.setSize(btnW, btnH);
      container.setInteractive({ useHandCursor: true });

      const label = this.add.text(0, 0, text, {
        fontFamily: 'Fredoka, sans-serif',
        fontSize: '24px',
        color: '#ffffff',
        fontStyle: 'bold'
      }).setOrigin(0.5);
      container.add(label);

      // Interaktivitas
      container.on('pointerover', () => {
        pill.clear();
        pill.fillStyle(0x0f4b55, 0.98);
        pill.fillRoundedRect(-btnW / 2, -btnH / 2, btnW, btnH, 26);
        pill.lineStyle(2, 0xfef08a, 1);
        pill.strokeRoundedRect(-btnW / 2, -btnH / 2, btnW, btnH, 26);
        container.setScale(1.04);
      });

      container.on('pointerout', () => {
        pill.clear();
        pill.fillStyle(0x0a353c, 0.92);
        pill.fillRoundedRect(-btnW / 2, -btnH / 2, btnW, btnH, 26);
        pill.lineStyle(2, 0x38bdf8, 1);
        pill.strokeRoundedRect(-btnW / 2, -btnH / 2, btnW, btnH, 26);
        container.setScale(1.0);
      });

      container.on('pointerdown', () => {
        container.setScale(0.95);
        this.time.delayedCall(100, () => container.setScale(1.0));
      });

      return { container, label };
    };

    // A. Tombol Suara
    const audioBtn = createPillButton(width - 290, '🔊 Suara', true);
    audioBtn.container.on('pointerdown', () => {
      if (window.soundEngine) {
        const isMuted = window.soundEngine.toggleMute();
        audioBtn.label.setText(isMuted ? '🔇 Bisu' : '🔊 Suara');
        if (!isMuted) window.soundEngine.playBeep();
      }
    });

    // B. Tombol Layar Penuh
    const fullBtn = createPillButton(width - 105, '⛶ Layar Penuh', false);
    fullBtn.container.on('pointerdown', () => {
      if (window.soundEngine) window.soundEngine.playBeep();
      if (this.scale.isFullscreen) {
        this.scale.stopFullscreen();
      } else {
        this.scale.startFullscreen();
      }
    });
  }

  // --- 3. GRAND TITLE BILLBOARD (MEWAH BERBINGKAI EMAS & DAUN) ---
  createTitleBillboard(width) {
    const boardX = width / 2;
    const boardY = 210;

    // Sprite Billboard Aset Visual Modern 2D Vector (960 x 493 = 1.947 : 1 asli bebas stretch)
    const billboard = this.add.image(boardX, boardY, 'title_billboard');
    billboard.setDisplaySize(680, 349);

    // Animasi mengambang sangat lembut (ambient floating tween)
    this.tweens.add({
      targets: billboard,
      y: boardY - 6,
      duration: 2400,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
  }

  // --- 5. MASKOT GITA DETEKTIF CILIK & BALON SAPAAN (KIRI BAWAH) ---
  createGitaWelcome(width, height) {
    const gitaX = 210;
    const gitaGroundY = 720;

    // Sprite Karakter Gita Melambai Ramah (360 x 592 = 0.608 : 1 asli bebas stretch)
    this.gita = this.add.image(gitaX, gitaGroundY, 'gita_idle');
    this.gita.setDisplaySize(270, 444);

    // Animasi Melayang Halus (Bobbing Tween)
    this.tweens.add({
      targets: this.gita,
      y: gitaGroundY - 8,
      duration: 1600,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    // Balon Ucapan Gita
    const bubbleX = 255;
    const bubbleY = 445;
    const bubbleW = 450;
    const bubbleH = 155;

    const bgG = this.add.graphics();
    // Kotak Balon Krem Bersih
    bgG.fillStyle(0xfffdf5, 0.98);
    bgG.fillRoundedRect(bubbleX - bubbleW / 2, bubbleY - bubbleH / 2, bubbleW, bubbleH, 18);
    bgG.lineStyle(3, 0x1e293b, 1);
    bgG.strokeRoundedRect(bubbleX - bubbleW / 2, bubbleY - bubbleH / 2, bubbleW, bubbleH, 18);

    // Ekor Balon Menunjuk ke Arah Kepala Gita
    bgG.fillStyle(0xfffdf5, 1);
    bgG.fillTriangle(
      bubbleX - 35, bubbleY + bubbleH / 2 - 2,
      bubbleX - 15, bubbleY + bubbleH / 2 - 2,
      bubbleX - 25, bubbleY + bubbleH / 2 + 15
    );
    bgG.lineStyle(3, 0x1e293b, 1);
    bgG.strokeLineShape(new Phaser.Geom.Line(bubbleX - 35, bubbleY + bubbleH / 2 - 2, bubbleX - 25, bubbleY + bubbleH / 2 + 15));
    bgG.strokeLineShape(new Phaser.Geom.Line(bubbleX - 15, bubbleY + bubbleH / 2 - 2, bubbleX - 25, bubbleY + bubbleH / 2 + 15));

    // Area Interaktif Balon Ucapan Gita (Klik untuk Bersuara)
    const hitBubble = this.add.rectangle(bubbleX, bubbleY, bubbleW, bubbleH, 0x000000, 0.001)
      .setInteractive({ useHandCursor: true });

    // Aksen Sparkle Emas di Kiri Atas Balon
    this.add.text(bubbleX - bubbleW / 2 - 8, bubbleY - bubbleH / 2 - 8, '✨', {
      fontSize: '28px'
    }).setOrigin(0.5);

    // Tombol Suara Mini di Kanan Atas Balon (🔊)
    const btnVoiceGreeting = this.add.rectangle(bubbleX + bubbleW / 2 - 28, bubbleY - bubbleH / 2 + 28, 42, 42, 0x10b981)
      .setInteractive({ useHandCursor: true });
    btnVoiceGreeting.setStrokeStyle(2, 0xfef08a);
    this.add.text(bubbleX + bubbleW / 2 - 28, bubbleY - bubbleH / 2 + 28, '🔊', { fontSize: '24px' }).setOrigin(0.5);

    // Teks Sapaan Ramah Gita
    this.add.text(bubbleX - 20, bubbleY - 32, 'Halo Teman-Teman! Aku Gita!', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '26px',
      color: '#0f172a',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    this.add.text(bubbleX, bubbleY + 22, 'Yuk jaga keseimbangan 4 ekosistem\nNusantara bersama! (Sentuh suara)', {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '24px',
      color: '#334155',
      fontStyle: 'bold',
      align: 'center',
      lineSpacing: 6
    }).setOrigin(0.5);

    const playWelcomeVO = () => {
      if (this.gita && this.textures.exists('gita_talk')) {
        this.gita.setTexture('gita_talk');
        this.time.delayedCall(5000, () => {
          if (this.gita && this.gita.active && this.textures.exists('gita_idle')) {
            this.gita.setTexture('gita_idle');
          }
        });
      }
      if (window.soundEngine) {
        window.soundEngine.playBeep();
        window.soundEngine.playVO('vo_title_welcome', 'Halo, teman-teman! Aku Gita, detektif cilik. Mari kita selamatkan keseimbangan 4 ekosistem Nusantara bersama-sama!');
      }
    };

    hitBubble.on('pointerdown', playWelcomeVO);
    btnVoiceGreeting.on('pointerdown', playWelcomeVO);
    this.gita.setInteractive({ useHandCursor: true }).on('pointerdown', playWelcomeVO);
  }

  // --- 6. 3 KARTU AKSI HORIZONTAL (MULAI, CARA BERMAIN, UNTUK GURU) ---
  createHorizontalActionCards(width) {
    const cardY = 625;
    const cardH = 390;
    const cardW = 270; // 360x520 -> 270x390 (rasio 0.6923 : 1 sempurna 100%, ikon lingkaran bulat presisi bebas oval)

    // Posisi X Simetris dengan Kartu 2 Tepat di Tengah Layar (960)
    const centerX = width / 2; // 960
    const cardGap = 310;

    const cardsData = [
      {
        id: 'play',
        key: 'card_mulai_bermain',
        x: centerX - cardGap, // 640
        onClick: () => {
          if (window.soundEngine) window.soundEngine.playSuccess();
          this.cameras.main.fade(300, 2, 44, 34);
          this.time.delayedCall(300, () => {
            this.scene.start('TeamSelectScene');
          });
        }
      },
      {
        id: 'tutorial',
        key: 'card_cara_bermain',
        x: centerX, // 960 (Pusat Simetri)
        onClick: () => {
          if (window.soundEngine) window.soundEngine.playBeep();
          this.cameras.main.fade(300, 2, 44, 34);
          this.time.delayedCall(300, () => {
            this.scene.start('TutorialScene');
          });
        }
      },
      {
        id: 'about',
        key: 'card_tentang_panduan',
        x: centerX + cardGap, // 1280
        onClick: () => {
          if (window.soundEngine) window.soundEngine.playBeep();
          this.showAboutModal();
        }
      }
    ];

    cardsData.forEach(c => {
      // Wadah Container untuk efek transform yang mulus
      const cardImg = this.add.image(0, 0, c.key);
      cardImg.setDisplaySize(cardW, cardH);

      const container = this.add.container(c.x, cardY, [cardImg]);
      container.setSize(cardW, cardH);
      container.setInteractive({ useHandCursor: true });

      // Efek Interaktif Ramah Jari Layar Sentuh IFP
      container.on('pointerover', () => {
        this.tweens.add({
          targets: container,
          scaleX: 1.05,
          scaleY: 1.05,
          y: cardY - 8,
          duration: 180,
          ease: 'Power2'
        });
      });

      container.on('pointerout', () => {
        this.tweens.add({
          targets: container,
          scaleX: 1.0,
          scaleY: 1.0,
          y: cardY,
          duration: 180,
          ease: 'Power2'
        });
      });

      container.on('pointerdown', () => {
        container.setScale(0.96);
        this.time.delayedCall(120, () => {
          container.setScale(1.0);
          c.onClick();
        });
      });
    });
  }

  // --- 7. KAPSUL INFO TIPS GURU (BAWAH LAYAR) ---
  createTeacherTipBar(width, height) {
    const barX = width / 2;
    const barY = height - 48;
    const barW = 1460;
    const barH = 58;

    const barG = this.add.graphics();
    barG.fillStyle(0x063328, 0.95);
    barG.fillRoundedRect(barX - barW / 2, barY - barH / 2, barW, barH, 29);
    barG.lineStyle(2, 0x10b981, 0.85);
    barG.strokeRoundedRect(barX - barW / 2, barY - barH / 2, barW, barH, 29);

    this.add.text(barX, barY, '💡 Ajak seluruh siswa membaca "Cara Bermain" sebelum mulai.', {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '24px',
      color: '#fef08a',
      fontStyle: 'bold'
    }).setOrigin(0.5);
  }

  // --- POPUP MODAL: TENTANG MEDIA & PANDUAN UNTUK GURU ---
  showAboutModal() {
    const { width, height } = this.scale;
    const modalGroup = this.add.group();

    // Latar belakang gelap transparan
    const dimBg = this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.85)
      .setInteractive();
    modalGroup.add(dimBg);

    // Kotak Modal Utama
    const boxW = 1460;
    const boxH = 920;
    const modalBox = this.add.rectangle(width / 2, height / 2, boxW, boxH, 0x0f172a, 0.98);
    modalBox.setStrokeStyle(4, 0xfbbf24);
    modalGroup.add(modalBox);

    // Header Modal
    const title = this.add.text(width / 2, height / 2 - 400, '🌾 TENTANG MEDIA & PANDUAN UNTUK GURU', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '36px',
      color: '#fef08a',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    modalGroup.add(title);

    // Konten Informasi Lengkap & Spesifikasi Teknis
    const infoContent = 
      '📌 IDENTITAS PENGEMBANGAN:\n' +
      '• Judul: Multimedia Edu-Sim Rantai Makanan & Keseimbangan 4 Ekosistem Nusantara\n' +
      '• Peneliti / Pengembang: Gito (Teknologi Pendidikan) | Sasaran: Siswa Kelas 5 SDN Percobaan 2\n' +
      '• Kurikulum: IPAS Fase C Kurikulum Merdeka | Target: Layar Sentuh IFP 65–86 Inch (1920x1080)\n\n' +
      '📋 PANDUAN PELAKSANAAN UNTUK GURU:\n' +
      '1. Bagilah 25 siswa menjadi 5 Kelompok Ahli Jigsaw (Tim Elang, Ular, Katak, Padi, Jamur).\n' +
      '2. Setiap giliran tim berdurasi 7 Menit. Perwakilan (Petugas Layar) maju ke layar IFP.\n' +
      '3. Siswa di meja bertindak sebagai Penasihat Meja dengan Kartu Voting Fisik (🟢 Hijau, 🟡 Kuning, 🔴 Merah).\n' +
      '4. Saat tombol "📢 TANYA TEMAN" ditekan, siswa di meja mengangkat kartu saran tindakan penyelamatan.\n' +
      '5. Pasca-simulasi, selesaikan teka-teki sebab-akibat (C2) di Buku Catatan Detektif Gita.\n\n' +
      '⚙️ ERGONOMI LAYAR SENTUH IFP KELAS 5:\n' +
      '• Kuadran Bawah (Y: 780–1050 px) nyaman bagi tinggi badan anak kelas 5 SD (130–150 cm).\n' +
      '• Tombol Besar anti-salah sentuh dan jeda 1,2 detik melatih diskusi bermakna tanpa tergesa-gesa.';

    const bodyText = this.add.text(width / 2, height / 2 - 40, infoContent, {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '24px',
      color: '#e2e8f0',
      align: 'left',
      wordWrap: { width: boxW - 80 },
      lineSpacing: 6
    }).setOrigin(0.5);
    modalGroup.add(bodyText);

    // Tombol Suara Panduan Gita (🔊)
    const btnVoiceGuide = this.add.rectangle(width / 2 - 180, height / 2 + 390, 340, 64, 0x10b981)
      .setInteractive({ useHandCursor: true });
    btnVoiceGuide.setStrokeStyle(3, 0xfef08a);
    modalGroup.add(btnVoiceGuide);

    const btnVoiceGuideText = this.add.text(width / 2 - 180, height / 2 + 390, '🔊 DENGARKAN GITA', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '26px',
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    modalGroup.add(btnVoiceGuideText);

    btnVoiceGuide.on('pointerdown', () => {
      btnVoiceGuide.setScale(0.93);
      this.time.delayedCall(120, () => btnVoiceGuide.setScale(1.0));
      if (window.soundEngine) {
        window.soundEngine.playBeep();
        window.soundEngine.playVO('vo_title_guide', 'Sentuh Mulai Bermain untuk memilih kelompokmu. Atau sentuh Cara Bermain untuk belajar aturannya!');
      }
    });

    // Tombol Tutup Modal
    const btnClose = this.add.rectangle(width / 2 + 180, height / 2 + 390, 320, 64, 0xef4444)
      .setInteractive({ useHandCursor: true });
    btnClose.setStrokeStyle(3, 0xffffff);
    modalGroup.add(btnClose);

    const btnCloseText = this.add.text(width / 2 + 180, height / 2 + 390, '❌ KEMBALI KE MENU', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '26px',
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    modalGroup.add(btnCloseText);

    btnClose.on('pointerdown', () => {
      if (window.soundEngine) {
        window.soundEngine.playBeep();
        window.soundEngine.stopVoice();
      }
      modalGroup.destroy(true, true);
    });
  }
}

window.TitleScene = TitleScene;
