/**
 * ECO-EXPLORER (PHASER 3) - VICTORY SCENE
 * Layar Selebrasi Prestasi, Rating Bintang (1-3), Simpan Progres,
 * dan Navigasi ke Misi Berikutnya atau Peta Ekosistem.
 * Terintegrasi dengan ProgressManager untuk unlock progression.
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
    const quizPassed = this.registry.get('quizPassed') !== false;
    const firstAttemptCorrect = this.registry.get('firstAttemptCorrect') !== false;
    const activeMission = this.registry.get('activeMission') || null;
    const activeEcosystemId = this.registry.get('activeEcosystem') || 'sawah';
    const ecoConfig = (window.ECOSYSTEMS_DATA && window.ECOSYSTEMS_DATA[activeEcosystemId]) || null;
    const ecoName = ecoConfig ? ecoConfig.name : 'Ekosistem';
    const ambientColor = ecoConfig ? ecoConfig.ambientColor : 0x064e3b;
    const accentColor = ecoConfig ? ecoConfig.accentColor : 0x10b981;

    // Calculate stars (1-3)
    const health = simResult.health || 0;
    let stars = 0;
    if (health >= 75) stars = 1;
    if (health >= 75 && quizPassed) stars = 2;
    if (health >= 85 && quizPassed && firstAttemptCorrect) stars = 3;

    // Save to ProgressManager
    if (activeMission && window.progressManager) {
      window.progressManager.saveMissionResult(activeMission.id, stars, health, quizPassed);
    }

    // Determine mission state
    const isMission1 = activeMission && activeMission.id && activeMission.id.endsWith('_m1');
    const isMission2 = activeMission && activeMission.id && activeMission.id.endsWith('_m2');
    const isLastMission = activeMission && activeMission.id === 'laut_m2';

    // Background
    const bgKey = ecoConfig ? ecoConfig.bg : 'bg_sawah';
    const bg = this.add.image(width / 2, height / 2, bgKey);
    bg.setDisplaySize(width, height);
    bg.setTint(0x668866);

    // Main Card Modal Selebrasi
    const modal = this.add.rectangle(width / 2, height / 2, width * 0.88, height * 0.86, 0x0f172a, 0.96);
    modal.setStrokeStyle(4, 0xfbbf24);

    // Audio Fanfare
    if (window.soundEngine) window.soundEngine.playVictoryFanfare();

    // Lencana Tim
    const teamBadge = (simResult.team && simResult.team.badge) ? simResult.team.badge : 'badge_elang';
    const badge = this.add.image(width / 2, height / 2 - 260, teamBadge).setDisplaySize(140, 140);
    this.tweens.add({
      targets: badge,
      scale: 1.25,
      duration: 800,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    // Judul
    const teamName = simResult.team ? simResult.team.name : 'TIM DETEKTIF';
    const missionTitle = activeMission ? activeMission.title : 'Misi Selesai';
    this.add.text(width / 2, height / 2 - 155, `\uD83C\uDFC6 MISI SELESAI: ${teamName}!`, {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '38px',
      color: '#fef08a',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    this.add.text(width / 2, height / 2 - 105, `${missionTitle} - ${ecoName}`, {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '28px',
      color: '#38bdf8',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    // Stars Display (Animated)
    const starStr = '\u2B50'.repeat(stars) + '\u2606'.repeat(3 - stars);
    const starText = this.add.text(width / 2, height / 2 - 50, starStr, {
      fontSize: '52px'
    }).setOrigin(0.5).setAlpha(0);

    this.tweens.add({
      targets: starText,
      alpha: 1,
      scale: { from: 0.3, to: 1 },
      duration: 600,
      delay: 500,
      ease: 'Back.easeOut'
    });

    // Star Description
    let starDesc = '';
    if (stars === 3) starDesc = '\uD83C\uDF1F 3 Bintang Sempurna! Kuis benar pertama kali!';
    else if (stars === 2) starDesc = '\u2B50 2 Bintang Hebat! Kuis berhasil dijawab!';
    else if (stars === 1) starDesc = '\u2B50 1 Bintang! Ekosistem berhasil diselamatkan!';
    else starDesc = 'Terus berusaha, Detektif!';

    this.add.text(width / 2, height / 2 + 5, starDesc, {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '28px',
      color: '#fef08a',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    // Statistik
    const statBox = this.add.rectangle(width / 2, height / 2 + 75, 860, 96, 0x1e293b, 0.9);
    statBox.setStrokeStyle(1.5, 0x475569);

    const mins = Math.floor((simResult.timeLeft || 0) / 60);
    const secs = (simResult.timeLeft || 0) % 60;
    const timeFormatted = `${mins}:${secs < 10 ? '0' : ''}${secs}`;

    this.add.text(width / 2, height / 2 + 55, `🌿 Kesehatan: ${health}% | ⏱️ Sisa Waktu: ${timeFormatted}`, {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '24px',
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    this.add.text(width / 2, height / 2 + 95, `📋 Kuis: ${quizPassed ? 'Berhasil' : 'Belum Berhasil'} | Percobaan Pertama: ${firstAttemptCorrect ? 'Ya (Sempurna)' : 'Ulang'}`, {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '24px',
      color: '#34d399',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    // Total Stars Progress
    const totalStars = window.progressManager ? window.progressManager.getTotalStars() : 0;
    this.add.text(width / 2, height / 2 + 138, `⭐ Total Bintang Terkumpul: ${totalStars}/24`, {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '24px',
      color: '#a7f3d0',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    // Gita Bersorak
    const gitaKey = this.textures.exists('gita_cheer') ? 'gita_cheer' : 'gita_idle';
    const gita = this.add.image(width / 2 - 420, height / 2 + 235, gitaKey).setDisplaySize(150, 150);
    this.tweens.add({
      targets: gita,
      y: height / 2 + 220,
      duration: 350,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    // Speech Bubble
    let speechText = '';
    if (isLastMission) {
      speechText = `SELAMAT, ${teamName}! Kalian MAHA DETEKTIF PENJAGA KESEIMBANGAN NUSANTARA! Semua 4 ekosistem selamat!`;
    } else if (isMission2) {
      // Find next ecosystem name
      const sequence = ['sawah', 'hutan', 'sungai', 'laut'];
      const currentIdx = sequence.indexOf(activeEcosystemId);
      const nextEcoId = currentIdx < sequence.length - 1 ? sequence[currentIdx + 1] : null;
      const nextEcoName = nextEcoId && window.ECOSYSTEMS_DATA ? window.ECOSYSTEMS_DATA[nextEcoId].name : 'ekosistem baru';
      speechText = `Hebat, ${teamName}! ${ecoName} berhasil dipulihkan! Ekosistem baru terbuka: ${nextEcoName}!`;
    } else if (isMission1) {
      speechText = `Bagus, ${teamName}! Misi 1 tuntas! Sekarang lanjut ke Misi 2 untuk hadapi ulah manusia!`;
    } else {
      speechText = `Hebat, ${teamName}! Misi berhasil diselesaikan!`;
    }

    const bubble = this.add.rectangle(width / 2 + 20, height / 2 + 235, 740, 110, ambientColor, 0.95);
    bubble.setStrokeStyle(2.5, accentColor);

    this.add.text(width / 2 + 20, height / 2 + 235, speechText, {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '24px',
      color: '#ffffff',
      fontStyle: 'bold',
      wordWrap: { width: 680 },
      align: 'center'
    }).setOrigin(0.5);

    // Voice Button
    const btnSpeak = this.add.rectangle(width / 2 + 430, height / 2 + 235, 60, 60, accentColor).setInteractive({ useHandCursor: true });
    btnSpeak.setStrokeStyle(2.5, 0xfef08a);
    this.add.text(width / 2 + 430, height / 2 + 235, '\uD83D\uDD0A', { fontSize: '28px' }).setOrigin(0.5);

    btnSpeak.on('pointerdown', () => {
      btnSpeak.setScale(0.92);
      this.time.delayedCall(100, () => btnSpeak.setScale(1.0));
      if (window.soundEngine) {
        window.soundEngine.playVO('vo_victory_cheer', speechText);
      }
    });

    // Auto play voice
    this.time.delayedCall(1200, () => {
      if (window.soundEngine) {
        window.soundEngine.playVO('vo_victory_cheer', speechText);
      }
    });

    // Special banner for ecosystem unlock or final completion
    if (isLastMission) {
      const grandBanner = this.add.rectangle(width / 2, height / 2 + 175, 920, 56, 0xf59e0b, 0.95);
      grandBanner.setStrokeStyle(3, 0xfef08a);
      this.add.text(width / 2, height / 2 + 175, '🏆 MAHA DETEKTIF PENJAGA KESEIMBANGAN NUSANTARA! 🏆', {
        fontFamily: 'Fredoka, sans-serif',
        fontSize: '26px',
        color: '#0f172a',
        fontStyle: 'bold'
      }).setOrigin(0.5);

      this.tweens.add({
        targets: grandBanner,
        scaleX: 1.03,
        scaleY: 1.03,
        duration: 700,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });
    } else if (isMission2) {
      const unlockBanner = this.add.rectangle(width / 2, height / 2 + 175, 840, 50, 0x0284c7, 0.95);
      unlockBanner.setStrokeStyle(2, 0x38bdf8);
      this.add.text(width / 2, height / 2 + 175, '🎉 EKOSISTEM BARU TERBUKA! Kembali ke Peta untuk melihat!', {
        fontFamily: 'Fredoka, sans-serif',
        fontSize: '24px',
        color: '#ffffff',
        fontStyle: 'bold'
      }).setOrigin(0.5);
    }

    // Action Buttons
    if (isMission1) {
      // Button 1: Continue to Mission 2
      const btnNext = this.add.rectangle(width / 2 - 250, height / 2 + 355, 480, 72, 0xf59e0b)
        .setInteractive({ useHandCursor: true });
      btnNext.setStrokeStyle(3, 0xfef08a);
      this.add.text(width / 2 - 250, height / 2 + 355, '⏩ LANJUT KE MISI 2 (ULAH MANUSIA)', {
        fontFamily: 'Fredoka, sans-serif',
        fontSize: '24px',
        color: '#0f172a',
        fontStyle: 'bold'
      }).setOrigin(0.5);

      btnNext.on('pointerdown', () => {
        if (window.soundEngine) { window.soundEngine.stopVoice(); window.soundEngine.playSuccess(); }
        this.scene.start('MissionMenuScene');
      });

      // Button 2: Back to Map
      const btnMap = this.add.rectangle(width / 2 + 250, height / 2 + 355, 440, 72, 0x0284c7)
        .setInteractive({ useHandCursor: true });
      btnMap.setStrokeStyle(3, 0xbae6fd);
      this.add.text(width / 2 + 250, height / 2 + 355, '🗺️ PETA EKOSISTEM', {
        fontFamily: 'Fredoka, sans-serif',
        fontSize: '26px',
        color: '#ffffff',
        fontStyle: 'bold'
      }).setOrigin(0.5);

      btnMap.on('pointerdown', () => {
        if (window.soundEngine) { window.soundEngine.stopVoice(); window.soundEngine.playBeep(); }
        this.scene.start('BiomeSelectScene');
      });
    } else {
      // Mission 2 or Last: Main button goes to map
      const btnMap = this.add.rectangle(width / 2, height / 2 + 355, 620, 72, 0x059669)
        .setInteractive({ useHandCursor: true });
      btnMap.setStrokeStyle(3, 0xfef08a);

      const mapLabel = isLastMission ? '🏆 LIHAT PENCAPAIAN DI PETA' : '🗺️ MENUJU PETA EKOSISTEM';
      this.add.text(width / 2, height / 2 + 355, mapLabel, {
        fontFamily: 'Fredoka, sans-serif',
        fontSize: '26px',
        color: '#ffffff',
        fontStyle: 'bold'
      }).setOrigin(0.5);

      btnMap.on('pointerdown', () => {
        if (window.soundEngine) { window.soundEngine.stopVoice(); window.soundEngine.playSuccess(); }
        this.scene.start('BiomeSelectScene');
      });
    }
  }
}

window.VictoryScene = VictoryScene;
