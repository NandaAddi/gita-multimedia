/**
 * ECO-EXPLORER (PHASER 3) - TITLE SCENE (HOMESCREEN / MENU UTAMA)
 * Dirancang khusus untuk Layar Sentuh Interactive Flat Panel (IFP) SDN Percobaan 2 Malang.
 * Tampilan UI 100% selaras dengan desain acuan:
 * - Background sawah panorama 16-bit 1080p
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

    // 1. Background Sawah Pixel Art 1080p Panorama
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
      const btnW = isToggleAudio ? 124 : 148;
      const btnH = 42;

      const pill = this.add.graphics();
      pill.fillStyle(0x0a353c, 0.92);
      pill.fillRoundedRect(-btnW / 2, -btnH / 2, btnW, btnH, 21);
      pill.lineStyle(2, 0x38bdf8, 1);
      pill.strokeRoundedRect(-btnW / 2, -btnH / 2, btnW, btnH, 21);

      const container = this.add.container(x, topY, [pill]);
      container.setSize(btnW, btnH);
      container.setInteractive({ useHandCursor: true });

      const label = this.add.text(0, 0, text, {
        fontFamily: 'Fredoka, sans-serif',
        fontSize: '15px',
        color: '#ffffff',
        fontStyle: 'bold'
      }).setOrigin(0.5);
      container.add(label);

      // Interaktivitas
      container.on('pointerover', () => {
        pill.clear();
        pill.fillStyle(0x0f4b55, 0.98);
        pill.fillRoundedRect(-btnW / 2, -btnH / 2, btnW, btnH, 21);
        pill.lineStyle(2, 0xfef08a, 1);
        pill.strokeRoundedRect(-btnW / 2, -btnH / 2, btnW, btnH, 21);
        container.setScale(1.04);
      });

      container.on('pointerout', () => {
        pill.clear();
        pill.fillStyle(0x0a353c, 0.92);
        pill.fillRoundedRect(-btnW / 2, -btnH / 2, btnW, btnH, 21);
        pill.lineStyle(2, 0x38bdf8, 1);
        pill.strokeRoundedRect(-btnW / 2, -btnH / 2, btnW, btnH, 21);
        container.setScale(1.0);
      });

      container.on('pointerdown', () => {
        container.setScale(0.95);
        this.time.delayedCall(100, () => container.setScale(1.0));
      });

      return { container, label };
    };

    // A. Tombol Suara
    const audioBtn = createPillButton(width - 230, '🔊 Suara', true);
    audioBtn.container.on('pointerdown', () => {
      if (window.soundEngine) {
        const isMuted = window.soundEngine.toggleMute();
        audioBtn.label.setText(isMuted ? '🔇 Bisu' : '🔊 Suara');
        if (!isMuted) window.soundEngine.playBeep();
      }
    });

    // B. Tombol Layar Penuh
    const fullBtn = createPillButton(width - 85, '⛶ Layar Penuh', false);
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
    const boardY = 205;

    // Sprite Billboard Aset Visual Berkualitas Tinggi (Preserve Asli 1295 x 641 = 2.02 : 1 Anti-Stretch)
    const billboard = this.add.image(boardX, boardY, 'title_billboard');
    billboard.setDisplaySize(800, 396);

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

    // Sprite Karakter Gita Melambai Ramah
    this.gita = this.add.image(gitaX, gitaGroundY, 'gita_idle');
    // Proporsi asli 552x925
    this.gita.setDisplaySize(265, 444);

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
    const bubbleX = 235;
    const bubbleY = 465;
    const bubbleW = 330;
    const bubbleH = 112;

    const bgG = this.add.graphics();
    // Kotak Balon Krem Bersih
    bgG.fillStyle(0xfffdf5, 0.98);
    bgG.fillRoundedRect(bubbleX - bubbleW / 2, bubbleY - bubbleH / 2, bubbleW, bubbleH, 16);
    bgG.lineStyle(3, 0x1e293b, 1);
    bgG.strokeRoundedRect(bubbleX - bubbleW / 2, bubbleY - bubbleH / 2, bubbleW, bubbleH, 16);

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
      fontSize: '22px'
    }).setOrigin(0.5);

    // Tombol Suara Mini di Kanan Atas Balon (🔊)
    const btnVoiceGreeting = this.add.rectangle(bubbleX + bubbleW / 2 - 22, bubbleY - bubbleH / 2 + 20, 32, 32, 0x10b981)
      .setInteractive({ useHandCursor: true });
    btnVoiceGreeting.setStrokeStyle(2, 0xfef08a);
    this.add.text(bubbleX + bubbleW / 2 - 22, bubbleY - bubbleH / 2 + 20, '🔊', { fontSize: '16px' }).setOrigin(0.5);

    // Teks Sapaan Ramah Gita
    this.add.text(bubbleX - 15, bubbleY - 24, 'Halo Teman-Teman! Aku Gita!', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '17px',
      color: '#0f172a',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    this.add.text(bubbleX, bubbleY + 12, 'Yuk kita selamatkan sawah\nbersama-sama! ❤️ (Sentuh untuk dengarkan)', {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '14px',
      color: '#334155',
      fontStyle: 'bold',
      align: 'center',
      lineSpacing: 3
    }).setOrigin(0.5);

    const playWelcomeVO = () => {
      if (window.soundEngine) {
        window.soundEngine.playBeep();
        window.soundEngine.playVO('vo_title_welcome', 'Halo Teman-Teman! Aku Gita si Detektif Cilik! Sawah desa kita sedang menghadapi masalah besar. Yuk, kita bekerja sama menyelamatkan keseimbangan sawah bersama-sama!');
      }
    };

    hitBubble.on('pointerdown', playWelcomeVO);
    btnVoiceGreeting.on('pointerdown', playWelcomeVO);
    this.gita.setInteractive({ useHandCursor: true }).on('pointerdown', playWelcomeVO);
  }

  // --- 6. 3 KARTU AKSI HORIZONTAL (MULAI, CARA BERMAIN, TENTANG) ---
  createHorizontalActionCards(width) {
    const cardY = 625;
    const cardW = 295;
    const cardH = 388;

    // Posisi X Simetris dengan Kartu 2 Tepat di Tengah Layar (960)
    const centerX = width / 2; // 960
    const cardGap = 320;

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
    const barW = 1200;
    const barH = 46;

    const barG = this.add.graphics();
    barG.fillStyle(0x063328, 0.95);
    barG.fillRoundedRect(barX - barW / 2, barY - barH / 2, barW, barH, 23);
    barG.lineStyle(2, 0x10b981, 0.85);
    barG.strokeRoundedRect(barX - barW / 2, barY - barH / 2, barW, barH, 23);

    this.add.text(barX, barY, '💡 Tips Guru: Sentuh 📖 "CARA BERMAIN" bersama seluruh siswa sebelum memulai simulasi kelompok.', {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '16px',
      color: '#fef08a',
      fontStyle: 'bold'
    }).setOrigin(0.5);
  }

  // --- POPUP MODAL: TENTANG MEDIA & PANDUAN PENGGUNAAN ---
  showAboutModal() {
    const { width, height } = this.scale;
    const modalGroup = this.add.group();

    // Latar belakang gelap transparan
    const dimBg = this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.8)
      .setInteractive();
    modalGroup.add(dimBg);

    // Kotak Modal Utama
    const boxW = 1140;
    const boxH = 690;
    const modalBox = this.add.rectangle(width / 2, height / 2, boxW, boxH, 0x0f172a, 0.98);
    modalBox.setStrokeStyle(4, 0xfbbf24);
    modalGroup.add(modalBox);

    // Header Modal
    const title = this.add.text(width / 2, height / 2 - 285, '🌾 TENTANG MEDIA & PANDUAN PENGGUNAAN KELAS', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '26px',
      color: '#fef08a',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    modalGroup.add(title);

    // Konten Informasi
    const infoContent = 
      '📌 IDENTITAS PENGEMBANGAN:\n' +
      '• Judul: Pengembangan Multimedia Interaktif Berbasis Simulasi pada Materi Keseimbangan Ekosistem\n' +
      '• Peneliti / Pengembang: Gito (Teknologi Pendidikan)\n' +
      '• Sasaran Pengguna: 25 Siswa Kelas 5A SDN Percobaan 2 Malang & Guru Kelas\n' +
      '• Kurikulum: Kurikulum Merdeka — IPAS Fase C (Materi Rantai & Keseimbangan Sawah)\n' +
      '• Target Perangkat: Layar Sentuh Interactive Flat Panel (IFP 65–86 Inch, 1920x1080 Native)\n\n' +
      '📋 PANDUAN PELAKSANAAN UNTUK GURU:\n' +
      '1. Bagilah 25 siswa menjadi 5 Kelompok (Tim Elang, Tim Ular, Tim Katak, Tim Padi, Tim Jamur).\n' +
      '2. Setiap sesi tantangan berlangsung 7 Menit. Perwakilan tim aktif (4–5 siswa) maju ke depan layar IFP.\n' +
      '3. Siswa di meja bertindak sebagai "Co-Pilot" dengan memegang Kartu Voting Fisik (🟢 Hijau, 🟡 Kuning, 🔴 Merah).\n' +
      '4. Saat tim di IFP menekan tombol "📢 TANYA TEMAN", 20 siswa di meja mengangkat kartu untuk memberi saran aksi.\n' +
      '5. Pasca-simulasi, selesaikan teka-teki sebab-akibat (C2) di Buku Rahasia Detektif sebelum berganti giliran tim.';

    const bodyText = this.add.text(width / 2, height / 2 - 40, infoContent, {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '19px',
      color: '#e2e8f0',
      align: 'left',
      wordWrap: { width: boxW - 120 },
      lineSpacing: 8
    }).setOrigin(0.5);
    modalGroup.add(bodyText);

    // Tombol Suara Panduan Gita (🔊)
    const btnVoiceGuide = this.add.rectangle(width / 2 - 160, height / 2 + 275, 280, 56, 0x10b981)
      .setInteractive({ useHandCursor: true });
    btnVoiceGuide.setStrokeStyle(3, 0xfef08a);
    modalGroup.add(btnVoiceGuide);

    const btnVoiceGuideText = this.add.text(width / 2 - 160, height / 2 + 275, '🔊 DENGARKAN GITA', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '20px',
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5);
    modalGroup.add(btnVoiceGuideText);

    btnVoiceGuide.on('pointerdown', () => {
      btnVoiceGuide.setScale(0.93);
      this.time.delayedCall(120, () => btnVoiceGuide.setScale(1.0));
      if (window.soundEngine) {
        window.soundEngine.playBeep();
        window.soundEngine.playVO('vo_title_guide', 'Sentuh kartu Mulai Bermain untuk memilih kelompokmu, atau sentuh Cara Bermain untuk mempelajari aturan rantai makanan sawah!');
      }
    });

    // Tombol Tutup Modal
    const btnClose = this.add.rectangle(width / 2 + 160, height / 2 + 275, 260, 56, 0xef4444)
      .setInteractive({ useHandCursor: true });
    btnClose.setStrokeStyle(3, 0xffffff);
    modalGroup.add(btnClose);

    const btnCloseText = this.add.text(width / 2 + 160, height / 2 + 275, '❌ KEMBALI KE MENU', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '20px',
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
