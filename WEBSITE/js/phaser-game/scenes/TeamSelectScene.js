/**
 * ECO-EXPLORER (PHASER 3) - TEAM SELECT SCENE
 * Tampilan Pemilihan 5 Tim yang Rapi, Simetris, dan Nyaman di Layar Sentuh IFP.
 */

class TeamSelectScene extends Phaser.Scene {
  constructor() {
    super({ key: 'TeamSelectScene' });
  }

  create() {
    const { width, height } = this.scale;

    // 1. Background Sawah Pixel Art dengan Ambient Dimmer
    const bg = this.add.image(width / 2, height / 2, 'bg_sawah');
    bg.setDisplaySize(width, height);
    // Lapisan overlay gelap lembut agar UI di atasnya kontras dan nyaman dibaca
    this.add.rectangle(width / 2, height / 2, width, height, 0x021a14, 0.65);

    // 2. Banner Header Utama (Tengah Simetris)
    const headerW = 1440;
    const headerH = 100;
    const header = this.add.rectangle(width / 2, 75, headerW, headerH, 0x064e3b, 0.95);
    header.setStrokeStyle(3, 0xfbbf24);

    this.add.text(width / 2, 58, '🌾 ECO-EXPLORER: PENJAGA KESEIMBANGAN SAWAH', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '34px',
      color: '#fef08a',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    this.add.text(width / 2, 98, '🎮 Mode Layar Sentuh IFP — Silakan Perwakilan Kelompok Maju & Sentuh Lencana Tim!', {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '19px',
      color: '#a7f3d0'
    }).setOrigin(0.5);

    // Tombol Kembali ke Homescreen (TitleScene) di Kiri
    const btnHome = this.add.rectangle(120, 75, 170, 54, 0x334155).setInteractive({ useHandCursor: true });
    btnHome.setStrokeStyle(2, 0x94a3b8);
    this.add.text(120, 75, '🚪 MENU UTAMA', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '16px',
      color: '#ffffff'
    }).setOrigin(0.5);

    btnHome.on('pointerdown', () => {
      if (window.soundEngine) window.soundEngine.playBeep();
      this.scene.start('TitleScene');
    });

    // 3. Kotak Presenter Gita si Detektif Cilik (Tengah Rapi)
    const guideW = 1260;
    const guideH = 105;
    const guideY = 205;
    const guideBox = this.add.rectangle(width / 2, guideY, guideW, guideH, 0x0f172a, 0.92);
    guideBox.setStrokeStyle(3, 0x10b981);

    // Avatar Gita
    const kiki = this.add.image(width / 2 - 530, guideY, 'gita_idle').setDisplaySize(85, 85);
    this.tweens.add({
      targets: kiki,
      y: guideY - 5,
      duration: 1200,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    const greeting = 'Halo Sahabat Detektif Kelas 5A! Aku Gita, sentuh lencana tim kalian untuk memulai misi!';
    this.add.text(width / 2 - 440, guideY - 18, greeting, {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '21px',
      color: '#ffffff',
      wordWrap: { width: 680 }
    });

    // Tombol Suara Kiki (🔊 DENGARKAN)
    const btnVoice = this.add.rectangle(width / 2 + 450, guideY, 200, 52, 0x10b981)
      .setInteractive({ useHandCursor: true });
    btnVoice.setStrokeStyle(2, 0xfef08a);

    this.add.text(width / 2 + 450, guideY, '🔊 DENGARKAN', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '18px',
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    btnVoice.on('pointerdown', () => {
      btnVoice.setScale(0.92);
      if (window.soundEngine) {
        window.soundEngine.playBeep();
        window.soundEngine.playVO('vo_team_intro', greeting);
      }
    });
    btnVoice.on('pointerup', () => btnVoice.setScale(1.0));

    // 4. Data 5 Tim Satwa Model Jigsaw (Misi Spesialis per Kelompok)
    const teams = [
      { id: 'elang', name: 'TIM ELANG', role: 'Konsumen Puncak', missionId: 1, missionLabel: '🎯 Spesialis: Misi 1 (Tikus)', badge: 'badge_elang', color: 0xef4444, bgTint: 0x450a0a },
      { id: 'ular', name: 'TIM ULAR', role: 'Pengendali Hama', missionId: 1, missionLabel: '🎯 Spesialis: Misi 1 (Tikus)', badge: 'badge_ular', color: 0x0d9488, bgTint: 0x042f2e },
      { id: 'katak', name: 'TIM KATAK', role: 'Pemangsa Serangga', missionId: 2, missionLabel: '🎯 Spesialis: Misi 2 (Racun)', badge: 'badge_katak', color: 0x22c55e, bgTint: 0x052e16 },
      { id: 'padi', name: 'TIM PADI', role: 'Produsen Pangan', missionId: 3, missionLabel: '🎯 Spesialis: Misi 3 (Air)', badge: 'badge_padi', color: 0xf59e0b, bgTint: 0x451a03 },
      { id: 'jamur', name: 'TIM JAMUR', role: 'Master Pengurai', missionId: 4, missionLabel: '🎯 Spesialis: Misi 4 (Jamur)', badge: 'badge_jamur', color: 0xa855f7, bgTint: 0x3b0764 }
    ];

    // Inisialisasi Class Session Tracker jika belum ada
    let classSession = this.registry.get('classSession');
    if (!classSession) {
      classSession = { completedMissions: {} };
      this.registry.set('classSession', classSession);
    }

    // 5. Grid 5 Kartu Tim Simetris (Presisi di Tengah Layar 1920)
    const cardW = 270;
    const cardH = 470;
    const cardY = 565;
    const centers = [350, 655, 960, 1265, 1570];

    teams.forEach((t, i) => {
      const cx = centers[i];

      // Kartu Latar Belakang
      const card = this.add.rectangle(cx, cardY, cardW, cardH, 0x0f172a, 0.96)
        .setInteractive({ useHandCursor: true })
        .setStrokeStyle(4, t.color);

      // Status Jika Misi Tim Ini Sudah Selesai oleh Kelas
      if (classSession.completedMissions[t.missionId]) {
        const donePill = this.add.rectangle(cx + cardW / 2 - 50, cardY - cardH / 2 + 22, 90, 26, 0x064e3b, 0.95);
        donePill.setStrokeStyle(1, 0x22c55e);
        this.add.text(cx + cardW / 2 - 50, cardY - cardH / 2 + 22, '✅ SELESAI', {
          fontFamily: 'Fredoka, sans-serif',
          fontSize: '12px',
          color: '#fef08a',
          fontStyle: 'bold'
        }).setOrigin(0.5);
      }

      // Lingkaran pedestal lencana
      this.add.circle(cx, cardY - 115, 60, t.bgTint, 0.8)
        .setStrokeStyle(2, t.color);

      // Gambar Lencana Tim
      const badgeImg = this.add.image(cx, cardY - 115, t.badge).setDisplaySize(100, 100);

      // Nama Tim
      this.add.text(cx, cardY - 15, t.name, {
        fontFamily: 'Fredoka, sans-serif',
        fontSize: '24px',
        color: '#ffffff',
        fontStyle: 'bold'
      }).setOrigin(0.5);

      // Tag Peran Ekologis
      const roleBadge = this.add.rectangle(cx, cardY + 25, 230, 32, t.bgTint, 0.9);
      roleBadge.setStrokeStyle(1, t.color);

      this.add.text(cx, cardY + 25, t.role, {
        fontFamily: 'Nunito, sans-serif',
        fontSize: '15px',
        color: '#f8fafc',
        fontStyle: 'bold'
      }).setOrigin(0.5);

      // Tag Misi Spesialis Jigsaw
      const missionBadge = this.add.rectangle(cx, cardY + 68, 230, 32, 0x064e3b, 0.9);
      missionBadge.setStrokeStyle(1, 0xf59e0b);

      this.add.text(cx, cardY + 68, t.missionLabel, {
        fontFamily: 'Fredoka, sans-serif',
        fontSize: '14px',
        color: '#fef08a',
        fontStyle: 'bold'
      }).setOrigin(0.5);

      // Tombol Sentuh "🚀 PILIH TIM"
      const btnPlay = this.add.rectangle(cx, cardY + 155, 220, 54, t.color)
        .setInteractive({ useHandCursor: true });
      btnPlay.setStrokeStyle(2, 0xffffff);

      this.add.text(cx, cardY + 155, '🚀 PILIH TIM', {
        fontFamily: 'Fredoka, sans-serif',
        fontSize: '19px',
        color: '#ffffff',
        fontStyle: 'bold'
      }).setOrigin(0.5);

      // Interaksi Klik / Sentuh
      const onSelect = () => {
        if (window.soundEngine) {
          window.soundEngine.playSuccess();
          window.soundEngine.playVO('vo_team_selected', 'Pilihan hebat! Tim detektif sudah siap. Bersiaplah mengamati sawah dan selesaikan misi penyelamatan!');
        }
        this.registry.set('activeTeam', t);
        this.registry.set('assignedMissionId', t.missionId);

        this.tweens.add({
          targets: [card, badgeImg, btnPlay],
          scale: 1.04,
          duration: 180,
          yoyo: true,
          onComplete: () => {
            this.scene.start('MissionMenuScene');
          }
        });
      };

      card.on('pointerdown', onSelect);
      btnPlay.on('pointerdown', onSelect);

      // Efek Hover kursor
      card.on('pointerover', () => {
        card.setStrokeStyle(5, 0xfef08a);
      });
      card.on('pointerout', () => {
        card.setStrokeStyle(4, t.color);
      });
    });

    // 6. Footer Tips Guru & Dinamika Kelas (Tengah Simetris)
    const footerW = 1100;
    const footerH = 48;
    const footer = this.add.rectangle(width / 2, height - 40, footerW, footerH, 0x022c22, 0.95);
    footer.setStrokeStyle(2, 0x10b981);

    this.add.text(width / 2, height - 40, '💡 Tips Guru: Setiap kelompok bergantian maju 6–8 menit. Siswa di meja bertindak sebagai Co-Pilot!', {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '18px',
      color: '#fef08a',
      fontStyle: 'bold'
    }).setOrigin(0.5);
  }
}

window.TeamSelectScene = TeamSelectScene;
