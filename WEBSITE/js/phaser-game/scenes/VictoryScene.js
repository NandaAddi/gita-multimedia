/**
 * ECO-EXPLORER (PHASER 3) - VICTORY SCENE
 * Layar Selebrasi Prestasi, Rating Bintang (1-3), Gelar Lencana Kelompok,
 * dan Transisi ke Giliran Tim Selanjutnya.
 */

class VictoryScene extends Phaser.Scene {
  constructor() {
    super({ key: 'VictoryScene' });
  }

  create() {
    const { width, height } = this.scale;
    const simResult = this.registry.get('simResult') || {
      health: 85,
      timeLeft: 210,
      team: { name: 'TIM ELANG', color: 0xef4444, badge: 'badge_elang' }
    };
    const quizScore = this.registry.get('quizScore') || 100;

    // Background
    const bg = this.add.image(width / 2, height / 2, 'bg_sawah');
    bg.setDisplaySize(width, height);
    bg.setTint(0x668866);

    // Main Card Modal Selebrasi
    const modal = this.add.rectangle(width / 2, height / 2, width * 0.88, height * 0.86, 0x0f172a, 0.96);
    modal.setStrokeStyle(4, 0xfbbf24);

    // Kembang Api / Fanfare Audio
    if (window.soundEngine) window.soundEngine.playVictoryFanfare();

    // Lencana Tim Terpilih
    const badge = this.add.image(width / 2, height / 2 - 250, simResult.team.badge).setDisplaySize(140, 140);
    this.tweens.add({
      targets: badge,
      scale: 1.25,
      duration: 800,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    // Judul Kelulusan Misi
    this.add.text(width / 2, height / 2 - 140, `🏆 MISI SELESAI: ${simResult.team.name}!`, {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '38px',
      color: '#fef08a',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    // Gelar Kehormatan Tim
    const titles = {
      'TIM ELANG': 'Pahlawan Penjaga Puncak Rantai Makanan!',
      'TIM ULAR': 'Pahlawan Pelindung Sawah dari Hama Tikus!',
      'TIM KATAK': 'Detektif Pemangsa Alami Serangga Cerdas!',
      'TIM PADI': 'Ahli Kesuburan & Produsen Pangan Lestari!',
      'TIM JAMUR': 'Pakar Pengurai Alami & Penyubur Tanah!'
    };
    const gelar = titles[simResult.team.name] || 'Pahlawan Penyelamat Ekosistem Sawah!';

    this.add.text(width / 2, height / 2 - 80, `🎖️ GELAR: "${gelar}"`, {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '26px',
      color: '#38bdf8',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    // Rating Bintang (⭐⭐⭐)
    let stars = '⭐⭐⭐';
    if (quizScore < 100 && simResult.health < 80) stars = '⭐';
    else if (quizScore < 100 || simResult.health < 80) stars = '⭐⭐';

    this.add.text(width / 2, height / 2 - 20, stars, {
      fontSize: '48px'
    }).setOrigin(0.5);

    // Statistik Capaian
    const statBox = this.add.rectangle(width / 2, height / 2 + 75, 600, 90, 0x1e293b, 0.9);
    statBox.setStrokeStyle(1, 0x475569);

    const mins = Math.floor(simResult.timeLeft / 60);
    const secs = simResult.timeLeft % 60;
    const timeFormatted = `${mins}:${secs < 10 ? '0' : ''}${secs}`;

    this.add.text(width / 2, height / 2 + 60, `Kondisi Sawah: ${simResult.health}% (Sehat) | Sisa Waktu: ${timeFormatted}`, {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '20px',
      color: '#ffffff'
    }).setOrigin(0.5);

    this.add.text(width / 2, height / 2 + 95, `Skor Pemahaman Sebab-Akibat: ${quizScore}/100 - Detektif Cilik Hebat!`, {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '20px',
      color: '#34d399'
    }).setOrigin(0.5);

    // Catat Misi Selesai ke Class Session Tracker
    let classSession = this.registry.get('classSession') || { completedMissions: {} };
    if (simResult && simResult.mission && simResult.team) {
      classSession.completedMissions[simResult.mission.id] = simResult.team.name;
      this.registry.set('classSession', classSession);
    }

    // Indikator Kemajuan Sesi Kelas (4 Misi Jigsaw)
    const progY = height / 2 + 130;
    const missionNames = ['Misi 1 (Tikus)', 'Misi 2 (Racun)', 'Misi 3 (Air)', 'Misi 4 (Jamur)'];
    const pStartX = width / 2 - 270;
    for (let i = 1; i <= 4; i++) {
      const px = pStartX + (i - 1) * 180;
      const isDone = Boolean(classSession.completedMissions[i]);
      const pBox = this.add.rectangle(px, progY, 165, 32, isDone ? 0x064e3b : 0x1e293b, 0.95);
      pBox.setStrokeStyle(1, isDone ? 0x22c55e : 0x475569);
      this.add.text(px, progY, isDone ? `✅ ${missionNames[i - 1]}` : `⏳ ${missionNames[i - 1]}`, {
        fontFamily: 'Fredoka, sans-serif',
        fontSize: '13px',
        color: isDone ? '#fef08a' : '#94a3b8',
        fontStyle: 'bold'
      }).setOrigin(0.5);
    }

    // Gita si Detektif Cilik Memberi Selamat & Arahan Estafet Tim
    const kiki = this.add.image(width / 2 - 380, height / 2 + 235, 'gita_idle').setDisplaySize(130, 130);

    let nextHandoverText = 'Panggil kelompok berikutnya untuk maju ke layar sentuh IFP!';
    if (simResult.mission && simResult.mission.id === 1) {
      nextHandoverText = 'Sekarang giliran TIM KATAK maju menyelidiki Misi 2 (Racun Kimia)!';
    } else if (simResult.mission && simResult.mission.id === 2) {
      nextHandoverText = 'Sekarang giliran TIM PADI maju menyelamatkan Misi 3 (Kekeringan Sawah)!';
    } else if (simResult.mission && simResult.mission.id === 3) {
      nextHandoverText = 'Sekarang giliran TIM JAMUR maju memecahkan Misi 4 (Pengurai Jerami)!';
    } else if (simResult.mission && simResult.mission.id === 4) {
      nextHandoverText = 'SELAMAT KELAS 5A! Seluruh 4 kasus krisis ekosistem berhasil diselesaikan!';
    }

    const speechText = `Hebat ${simResult.team.name}! Sawah kini selamat! ${nextHandoverText}`;
    
    const bubble = this.add.rectangle(width / 2 + 30, height / 2 + 235, 620, 80, 0x064e3b, 0.95);
    bubble.setStrokeStyle(2, 0x34d399);

    this.add.text(width / 2 + 30, height / 2 + 235, speechText, {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '17px',
      color: '#ffffff',
      wordWrap: { width: 580 },
      align: 'center'
    }).setOrigin(0.5);

    // Tombol Suara Ucapan Selamat
    const btnSpeak = this.add.rectangle(width / 2 + 380, height / 2 + 235, 50, 50, 0x10b981).setInteractive({ useHandCursor: true });
    btnSpeak.setStrokeStyle(2, 0xfef08a);
    this.add.text(width / 2 + 380, height / 2 + 235, '🔊', { fontSize: '24px' }).setOrigin(0.5);

    btnSpeak.on('pointerdown', () => {
      btnSpeak.setScale(0.92);
      this.time.delayedCall(100, () => btnSpeak.setScale(1.0));
      if (window.soundEngine) {
        window.soundEngine.playVO('vo_victory_cheer', speechText);
      }
    });

    // Otomatis perdengarkan ucapan selamat Gita setelah selebrasi awal
    this.time.delayedCall(1200, () => {
      if (window.soundEngine) {
        window.soundEngine.playVO('vo_victory_cheer', speechText);
      }
    });

    // 2 Tombol Aksi Bawah
    // Tombol 1: Ganti ke Tim Berikutnya (Turn-Based IFP Model Jigsaw)
    const btnNextTeam = this.add.rectangle(width / 2 - 200, height / 2 + 335, 360, 60, 0x059669)
      .setInteractive({ useHandCursor: true });
    btnNextTeam.setStrokeStyle(3, 0xfef08a);

    const btnNextLabel = (simResult.mission && simResult.mission.id === 4) ? '🌟 REFLEKSI KELAS 5A' : '🔄 GILIRAN TIM BERIKUTNYA';
    this.add.text(width / 2 - 200, height / 2 + 335, btnNextLabel, {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '20px',
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    btnNextTeam.on('pointerdown', () => {
      if (window.soundEngine) {
        window.soundEngine.stopVoice();
        window.soundEngine.playSuccess();
      }
      this.scene.start('TeamSelectScene');
    });

    // Tombol 2: Menu Misi
    const btnMissions = this.add.rectangle(width / 2 + 200, height / 2 + 335, 360, 60, 0x0284c7)
      .setInteractive({ useHandCursor: true });
    btnMissions.setStrokeStyle(3, 0xbae6fd);

    this.add.text(width / 2 + 200, height / 2 + 335, '🗺️ MENU MISI KRISIS', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '20px',
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    btnMissions.on('pointerdown', () => {
      if (window.soundEngine) {
        window.soundEngine.stopVoice();
        window.soundEngine.playBeep();
      }
      this.scene.start('MissionMenuScene');
    });
  }
}

window.VictoryScene = VictoryScene;
