/**
 * ECO-EXPLORER (PHASER 3) - QUIZ SCENE (RAMAH SISWA KELAS 5 SD)
 * Data-driven dari activeMission.quiz (ECOSYSTEMS_DATA).
 * Menguji pemahaman sebab-akibat (C2) dengan stimulus visual rantai makanan.
 * Melacak firstAttemptCorrect untuk sistem 3 bintang.
 */

class QuizScene extends Phaser.Scene {
  constructor() {
    super({ key: 'QuizScene' });
  }

  create() {
    const { width, height } = this.scale;
    const simResult = this.registry.get('simResult') || {
      health: 80,
      timeLeft: 180,
      team: { name: 'TIM DETEKTIF', color: 0x10b981 },
      mission: null
    };

    // Get active mission data from registry
    this.activeMission = this.registry.get('activeMission') || null;
    this.activeEcosystemId = this.registry.get('activeEcosystem') || 'sawah';
    this.ecoConfig = (window.ECOSYSTEMS_DATA && window.ECOSYSTEMS_DATA[this.activeEcosystemId]) || null;
    this.simResult = simResult;
    this.firstAttemptCorrect = true; // Track if student answered correctly on first try

    // Determine quiz data (data-driven from ECOSYSTEMS_DATA)
    let quizData = null;
    if (this.activeMission && this.activeMission.quiz) {
      quizData = this.activeMission.quiz;
    }

    // Fallback if no quiz data found
    if (!quizData) {
      quizData = {
        question: 'Mengapa semua makhluk hidup di ekosistem saling membutuhkan?',
        options: [
          { text: 'A. Karena setiap makhluk hidup adalah bagian dari rantai makanan yang saling terhubung', correct: true },
          { text: 'B. Karena semua makhluk hidup memakan tumbuhan yang sama', correct: false },
          { text: 'C. Karena hewan besar selalu melindungi hewan kecil', correct: false }
        ],
        explanation: 'Benar! Rantai makanan menghubungkan semua makhluk hidup. Jika satu bagian terganggu, seluruh ekosistem ikut terpengaruh!'
      };
    }

    const ecoName = this.ecoConfig ? this.ecoConfig.name : 'Ekosistem';
    const ambientColor = this.ecoConfig ? this.ecoConfig.ambientColor : 0x064e3b;
    const accentColor = this.ecoConfig ? this.ecoConfig.accentColor : 0x10b981;

    // 1. Background
    const bgKey = this.ecoConfig ? this.ecoConfig.bg : 'bg_sawah';
    const bg = this.add.image(width / 2, height / 2, bgKey);
    bg.setDisplaySize(width, height);
    bg.setTint(0x334433);

    // 2. Header
    const header = this.add.rectangle(width / 2, 70, width * 0.94, 96, 0x0f172a, 0.96);
    header.setStrokeStyle(3, 0xfbbf24);

    const missionTitle = this.activeMission ? this.activeMission.title : 'Teka-Teki Ekosistem';
    this.add.text(width / 2, 48, `\uD83D\uDD0D BUKU CATATAN DETEKTIF: ${missionTitle.toUpperCase()}`, {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '30px',
      color: '#fef08a',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    this.add.text(width / 2, 88, `${ecoName} | Giliran Diskusi: ${simResult.team ? simResult.team.name : 'TIM DETEKTIF'} & Seluruh Kelas 5A`, {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '24px',
      color: '#cbd5e1',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    // 3. Kartu Pertanyaan
    const card = this.add.rectangle(width / 2, 235, width * 0.94, 210, ambientColor, 0.95);
    card.setStrokeStyle(2.5, accentColor);

    // Avatar Gita berpikir
    const gitaThinkKey = this.textures.exists('gita_think') ? 'gita_think' : 'gita_idle';
    this.gitaAvatar = this.add.image(width / 2 - width * 0.44 + 55, 235, gitaThinkKey)
      .setDisplaySize(140, 140);

    this.tweens.add({
      targets: this.gitaAvatar,
      y: 228,
      duration: 1400,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });

    const textStartX = width / 2 - width * 0.44 + 135;

    // Judul
    const typeLabel = this.activeMission ? this.activeMission.typeLabel : 'Teka-Teki';
    this.add.text(textStartX, 150, `\uD83D\uDCDC ${typeLabel}: TEKA-TEKI SEBAB AKIBAT`, {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '26px',
      color: '#fef08a',
      fontStyle: 'bold'
    });

    // Pertanyaan
    this.add.text(textStartX, 190, quizData.question, {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '24px',
      color: '#ffffff',
      fontStyle: 'bold',
      wordWrap: { width: width * 0.70 },
      lineSpacing: 6
    });

    // Tombol Suara Soal
    const btnVoiceQ = this.add.rectangle(width / 2 + width * 0.42, 225, 72, 72, accentColor).setInteractive({ useHandCursor: true });
    btnVoiceQ.setStrokeStyle(2.5, 0xfef08a);
    this.add.text(width / 2 + width * 0.42, 225, '\uD83D\uDD0A', { fontSize: '32px' }).setOrigin(0.5);

    btnVoiceQ.on('pointerdown', () => {
      btnVoiceQ.setScale(0.9);
      if (window.soundEngine) {
        window.soundEngine.playBeep();
        window.soundEngine.playVO('vo_quiz_question', quizData.question);
      }
    });
    btnVoiceQ.on('pointerup', () => btnVoiceQ.setScale(1.0));

    // 4. Pilihan Jawaban
    const optY = 415;
    const optSpacing = 118;
    this.optionButtons = [];

    quizData.options.forEach((opt, idx) => {
      const oy = optY + (idx * optSpacing);
      const btn = this.add.rectangle(width / 2, oy, width * 0.94, 104, ambientColor, 0.95)
        .setInteractive({ useHandCursor: true })
        .setStrokeStyle(2.5, accentColor);

      // Huruf Badge
      const letters = ['A', 'B', 'C'];
      const badgeX = width / 2 - width * 0.44 + 45;
      const iconCircle = this.add.circle(badgeX, oy, 34, 0x021a14).setStrokeStyle(2, 0xf59e0b);
      this.add.text(badgeX, oy, letters[idx], {
        fontFamily: 'Fredoka, sans-serif',
        fontSize: '28px',
        color: '#fef08a',
        fontStyle: 'bold'
      }).setOrigin(0.5);

      // Teks Pilihan
      this.add.text(width / 2 - width * 0.44 + 95, oy, opt.text, {
        fontFamily: 'Nunito, sans-serif',
        fontSize: '24px',
        color: '#ffffff',
        fontStyle: 'bold',
        wordWrap: { width: width * 0.80 },
        lineSpacing: 4
      }).setOrigin(0, 0.5);

      btn.on('pointerover', () => {
        btn.setScale(1.01);
        btn.setStrokeStyle(3, 0xfef08a);
      });
      btn.on('pointerout', () => {
        btn.setScale(1.0);
        btn.setStrokeStyle(2.5, accentColor);
      });

      btn.on('pointerdown', () => {
        this.handleAnswer(opt, btn, quizData);
      });

      this.optionButtons.push(btn);
    });
  }

  handleAnswer(opt, btnElement, quizData) {
    const { width, height } = this.scale;
    const accentColor = this.ecoConfig ? this.ecoConfig.accentColor : 0x10b981;

    // Disable all buttons
    this.optionButtons.forEach(b => b.disableInteractive());

    // Tampilkan Diagram Kausalitas Visual C2 (Mayer Multimedia & Spatial Contiguity)
    const mid = this.activeMission ? this.activeMission.id : 'sawah_m1';
    if (this.causalDiagram) {
      this.causalDiagram.destroy();
    }
    this.causalDiagram = this.createCausalChainDiagram(width, 745, mid);

    if (opt.correct) {
      if (window.soundEngine) {
        window.soundEngine.playSuccess();
        const explanation = quizData.explanation || 'Jawaban benar! Hebat!';
        window.soundEngine.playVO('vo_quiz_correct', explanation);
      }
      btnElement.setFillStyle(0x065f46);
      btnElement.setStrokeStyle(4, 0xfef08a);

      // Gita thumbs up
      if (this.gitaAvatar && this.textures.exists('gita_thumbsup')) {
        this.gitaAvatar.setTexture('gita_thumbsup');
        this.tweens.add({
          targets: this.gitaAvatar,
          scale: 1.15,
          duration: 300,
          yoyo: true,
          repeat: 2
        });
      }

      if (this.feedbackBox) this.feedbackBox.destroy();
      this.feedbackBox = this.add.container(width / 2, 855).setDepth(22);
      const fbBg = this.add.rectangle(0, 0, width * 0.94, 84, 0x064e3b, 0.98);
      fbBg.setStrokeStyle(3, 0xf59e0b);
      const fbTxt = this.add.text(0, 0, '✅ ' + (quizData.explanation || 'Jawaban benar!'), {
        fontFamily: 'Fredoka, sans-serif',
        fontSize: '24px',
        color: '#fef08a',
        wordWrap: { width: width * 0.9 }
      }).setOrigin(0.5);
      this.feedbackBox.add([fbBg, fbTxt]);

      // Save quiz results to registry for VictoryScene
      this.registry.set('quizPassed', true);
      this.registry.set('firstAttemptCorrect', this.firstAttemptCorrect);

      this.time.delayedCall(3800, () => {
        if (window.soundEngine) window.soundEngine.stopVoice();
        this.scene.start('VictoryScene');
      });
    } else {
      this.firstAttemptCorrect = false; // Mark that student failed on first attempt

      if (window.soundEngine) {
        window.soundEngine.playWarning();
        window.soundEngine.playVO('vo_quiz_wrong', 'Belum tepat, tapi tidak apa-apa! Perhatikan bagan di bawah, lalu coba lagi!');
      }
      btnElement.setFillStyle(0x7f1d1d);
      btnElement.setStrokeStyle(4, 0xf87171);

      this.cameras.main.shake(250, 0.01);

      if (this.feedbackBox) this.feedbackBox.destroy();
      this.feedbackBox = this.add.container(width / 2, 855).setDepth(22);
      const fbBg = this.add.rectangle(0, 0, width * 0.94, 84, 0x450a0a, 0.98);
      fbBg.setStrokeStyle(3, 0xef4444);

      const wrongFeedback = '❌ Belum tepat. Perhatikan bagan rantai makanan di bawah, lalu diskusikan kembali!';
      const fbTxt = this.add.text(0, 0, wrongFeedback, {
        fontFamily: 'Fredoka, sans-serif',
        fontSize: '24px',
        color: '#fecaca',
        wordWrap: { width: width * 0.9 }
      }).setOrigin(0.5);
      this.feedbackBox.add([fbBg, fbTxt]);

      // Re-enable other buttons after delay so student can try again
      this.time.delayedCall(2200, () => {
        this.optionButtons.forEach(b => {
          if (b !== btnElement) {
            b.setInteractive({ useHandCursor: true });
          }
        });
      });
    }
  }

  /**
   * Diagram Stimulus Rantai Makanan / Kausalitas C2 (Mayer CTML & Piaget Operasional Konkret)
   */
  createCausalChainDiagram(width, cardY, mid) {
    const chainMap = {
      sawah_m1: [
        { label: '☀️ Kemarau Panjang', color: 0xd97706 },
        { label: '🌾 Padi Mengering', color: 0xb45309 },
        { label: '🐀 Tikus Berkurang', color: 0x475569 },
        { label: '🐍 Ular & Elang Lapar ❌', color: 0xef4444 }
      ],
      sawah_m2: [
        { label: '🔫 Ular Sawah Diburu', color: 0xef4444 },
        { label: '🐀 Hama Tikus Melonjak', color: 0xb91c1c },
        { label: '🌾 Bulir Padi Habis', color: 0xd97706 },
        { label: '👨‍🌾 Gagal Panen Sawah ❌', color: 0xdc2626 }
      ],
      hutan_m1: [
        { label: '☀️ Kemarau Rimba', color: 0xd97706 },
        { label: '🌲 Dedaunan Layu', color: 0xb45309 },
        { label: '🦌 Rusa Kelaparan', color: 0x475569 },
        { label: '🐅 Harimau Turun ke Warga ❌', color: 0xef4444 }
      ],
      hutan_m2: [
        { label: '🪓 Penebangan Liar', color: 0xef4444 },
        { label: '🌲 Pohon Rusak & Longsor', color: 0xb91c1c },
        { label: '🦌 Rusa Kehilangan Rumah', color: 0xd97706 },
        { label: '🐅 Ekosistem Rimba Runtuh ❌', color: 0xdc2626 }
      ],
      sungai_m1: [
        { label: '🌿 Eceng Gondok Menutup', color: 0x059669 },
        { label: '☀️ Sinar Udara Terhalang', color: 0x0284c7 },
        { label: '🫧 Oksigen Air Turun', color: 0xd97706 },
        { label: '🐟 Ikan Mati Lemas ❌', color: 0xef4444 }
      ],
      sungai_m2: [
        { label: '🧪 Limbah Pabrik Beracun', color: 0x7e22ce },
        { label: '🐟 Ikan Kecil Beracun', color: 0x9333ea },
        { label: '🪶 Bangau Memangsa Ikan', color: 0xd97706 },
        { label: '⚠️ Bioakumulasi Bangau Sakit ❌', color: 0xef4444 }
      ],
      laut_m1: [
        { label: '🌊 Air Laut Memanas', color: 0x0284c7 },
        { label: '🪸 Karang Memutih Bleaching', color: 0xd97706 },
        { label: '🐠 Ikan Karang Hilang', color: 0x475569 },
        { label: '🦈 Rantai Hiu Terputus ❌', color: 0xef4444 }
      ],
      laut_m2: [
        { label: '💣 Bom Ikan & Racun', color: 0xef4444 },
        { label: '🪸 Terumbu Karang Hancur', color: 0xb91c1c },
        { label: '🐟 Benih Ikan Musnah', color: 0xd97706 },
        { label: '🌊 Kerusakan Laut Permanen ❌', color: 0xdc2626 }
      ]
    };

    const steps = chainMap[mid] || chainMap['sawah_m1'];
    const container = this.add.container(width / 2, cardY).setDepth(20);

    // Box Latar Belakang Diagram
    const bgBox = this.add.rectangle(0, 0, width * 0.94, 104, 0x021a14, 0.94);
    bgBox.setStrokeStyle(2, 0xf59e0b);
    container.add(bgBox);

    const titleBadge = this.add.text(-width * 0.44, -36, '🔗 SKEMA SEBAB-AKIBAT RANTAI MAKANAN (C2):', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '24px',
      color: '#fef08a',
      fontStyle: 'bold'
    });
    container.add(titleBadge);

    // Render node pill dan tanda panah
    const startX = -width * 0.42;
    const totalW = width * 0.84;
    const nodeW = Math.floor((totalW - (steps.length - 1) * 32) / steps.length);

    steps.forEach((st, i) => {
      const nx = startX + (i * (nodeW + 32)) + nodeW / 2;
      const pill = this.add.rectangle(nx, 12, nodeW, 52, st.color, 0.92);
      pill.setStrokeStyle(1.5, 0xfef08a, 0.8);

      const pTxt = this.add.text(nx, 12, st.label, {
        fontFamily: 'Fredoka, sans-serif',
        fontSize: '24px',
        color: '#ffffff',
        fontStyle: 'bold'
      }).setOrigin(0.5);

      container.add([pill, pTxt]);

      if (i < steps.length - 1) {
        const arrowX = nx + nodeW / 2 + 16;
        const arrow = this.add.text(arrowX, 12, '➔', {
          fontFamily: 'Fredoka, sans-serif',
          fontSize: '24px',
          color: '#fbbf24',
          fontStyle: 'bold'
        }).setOrigin(0.5);
        container.add(arrow);
      }
    });

    container.setAlpha(0);
    this.tweens.add({
      targets: container,
      alpha: 1,
      y: cardY - 4,
      duration: 350,
      ease: 'Back.easeOut'
    });

    return container;
  }
}

window.QuizScene = QuizScene;
