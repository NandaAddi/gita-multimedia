/**
 * ECO-EXPLORER (PHASER 3) - QUIZ SCENE (RAMAH SISWA KELAS 5 SD)
 * Menggunakan bahasa anak SD yang lugas, hangat, dan seru tanpa istilah akademis/asing.
 * Menguji pemahaman sebab-akibat (C2) dengan stimulus visual kaskade trofik yang konkret.
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
      mission: { id: 1, title: 'Misi 1: Serbuan Hama Tikus' }
    };

    const missionId = (simResult.mission && simResult.mission.id) ? simResult.mission.id : 1;

    // 1. Background Sawah Pixel Art
    const bg = this.add.image(width / 2, height / 2, 'bg_sawah');
    bg.setDisplaySize(width, height);
    bg.setTint(0x334433);

    // 2. Header Ramah Anak
    const header = this.add.rectangle(width / 2, 65, width * 0.94, 85, 0x0f172a, 0.96);
    header.setStrokeStyle(3, 0xfbbf24);

    this.add.text(width / 2, 45, '🔍 BUKU RAHASIA DETEKTIF GITA: TEKA-TEKI SAWAH', {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '26px',
      color: '#fef08a',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    this.add.text(width / 2, 80, `Giliran Diskusi: ${simResult.team.name} & Teman-Teman Kelas 5A`, {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '18px',
      color: '#cbd5e1'
    }).setOrigin(0.5);

    // 3. Bank Kasus Bahasa Ramah Anak (Mayer Multimedia & Signaling Principle)
    const caseBank = {
      1: {
        title: 'KASUS 1: MISTERI MELEDAKNYA HAMA TIKUS',
        question: 'Kasus: Petani membasmi semua ular sawah karena takut. Namun beberapa minggu kemudian, tanaman padi justru rusak dimakan tikus. Mengapa hal ini bisa terjadi?',
        chain: ['🌾 Padi', '➡️', '🐀 Tikus Meledak', '➡️', '🐍 Ular (Diburu!)', '➡️', '🦅 Elang'],
        disruptedIndex: 4, // '🐍 Ular (Diburu!)'
        options: [
          {
            key: 'A',
            icon: '🌾',
            text: 'A. Tanaman padi mati karena kekurangan aroma tubuh ular di pematang sawah.',
            isCorrect: false,
            feedback: '⚠️ Kurang tepat! Ular tidak memberi aroma pupuk, melainkan bertugas memangsa tikus.'
          },
          {
            key: 'B',
            icon: '🐍',
            text: 'B. Tikus bertambah sangat banyak karena tidak ada ular yang memangsanya, lalu memakan habis tanaman padi.',
            isCorrect: true,
            feedback: '🎉 TEPAT SEKALI! Kalau ular diburu habis, tidak ada yang memangsa tikus. Akibatnya tikus bertambah banyak dan merusak padi!'
          },
          {
            key: 'C',
            icon: '🦅',
            text: 'C. Burung elang menjadi marah lalu sengaja merusak batang-batang padi milik petani.',
            isCorrect: false,
            feedback: '⚠️ Keliru! Burung elang adalah pemakan daging, bukan pemakan tanaman padi.'
          }
        ]
      },
      2: {
        title: 'KASUS 2: BAHAYA RACUN SEMPROTAN KIMIA',
        question: 'Kasus: Petani menyemprot racun kimia berlebihan hingga katak sawah ikut mati. Seminggu kemudian, daun padi justru habis dimakan serangga hama. Mengapa?',
        chain: ['🌾 Padi Rusak', '⬅️', '🦗 Serangga Banyak', '⬅️', '🐸 Katak (Mati Racun!)'],
        disruptedIndex: 4, // '🐸 Katak (Mati Racun!)'
        options: [
          {
            key: 'A',
            icon: '🐸',
            text: 'A. Racun kimia membunuh katak yang biasa memangsa serangga, sehingga serangga bebas memakan daun padi.',
            isCorrect: true,
            feedback: '🎉 LUAR BIASA! Katak adalah sahabat petani pemangsa serangga. Tanpa katak, serangga perusak akan bebas merusak padi!'
          },
          {
            key: 'B',
            icon: '🦗',
            text: 'B. Katak yang mati teracuni berubah wujud menjadi serangga pemakan padi.',
            isCorrect: false,
            feedback: '⚠️ Keliru! Katak dan serangga berbeda; katak memangsa serangga, bukan berubah menjadi serangga.'
          },
          {
            key: 'C',
            icon: '🧪',
            text: 'C. Racun kimia berubah menjadi makanan enak yang disukai serangga.',
            isCorrect: false,
            feedback: '⚠️ Kurang tepat! Racun kimia merusak lingkungan dan membunuh katak sahabat petani.'
          }
        ]
      },
      3: {
        title: 'KASUS 3: PETAKA KEMARAU & KELAPARAN',
        question: 'Kasus: Saat saluran irigasi kering dan tanaman padi layu mati, mengapa burung elang dan ular sawah akhirnya ikut kelaparan?',
        chain: ['💧 Air Kering (Kemarau)', '➡️', '🌾 Padi Layu', '➡️', '🐀 Tikus Kelaparan', '➡️', '🦅 Pemangsa Kelaparan'],
        disruptedIndex: 0, // '💧 Air Kering (Kemarau)'
        options: [
          {
            key: 'A',
            icon: '🏊',
            text: 'A. Ular dan burung elang membutuhkan air sawah untuk berenang setiap pagi.',
            isCorrect: false,
            feedback: '⚠️ Keliru! Ular dan elang adalah hewan darat/udara yang tidak hidup di dalam air sawah.'
          },
          {
            key: 'B',
            icon: '🌾',
            text: 'B. Ular dan burung elang sebenarnya hanya suka makan biji padi.',
            isCorrect: false,
            feedback: '⚠️ Keliru! Ular dan elang adalah hewan pemakan daging mangsanya, bukan pemakan biji padi.'
          },
          {
            key: 'C',
            icon: '💧',
            text: 'C. Padi adalah sumber makanan utama; jika padi mati, hewan pemakan padi mati, dan pemangsa ikut kehabisan mangsa.',
            isCorrect: true,
            feedback: '🎉 HEBAT SEKALI! Padi adalah sumber makanan pertama. Jika padi mati, semua hewan di atasnya ikut kelaparan!'
          }
        ]
      },
      4: {
        title: 'KASUS 4: RAHASIA JAMUR PENYUBUR TANAH',
        question: 'Kasus: Mengapa sisa jerami kering yang membusuk harus diurai oleh jamur agar tanah sawah tetap subur?',
        chain: ['🍂 Jerami Menumpuk', '➡️', '🍄 Jamur Pengurai', '➡️', '✨ Pupuk Alami', '➡️', '🌾 Padi Subur'],
        disruptedIndex: 0, // '🍂 Jerami Menumpuk'
        options: [
          {
            key: 'A',
            icon: '😢',
            text: 'A. Tanaman padi merasa sedih melihat tumpukan jerami temannya yang mengering.',
            isCorrect: false,
            feedback: '⚠️ Kurang ilmiah! Tumbuhan tidak memiliki perasaan sedih atau takut seperti manusia.'
          },
          {
            key: 'B',
            icon: '🍄',
            text: 'B. Jamur mengubah jerami busuk menjadi pupuk alami tanah yang diserap akar padi agar tumbuh subur.',
            isCorrect: true,
            feedback: '🎉 SEMPURNA! Jamur adalah pahlawan pengurai yang mengubah sisa tanaman mati menjadi pupuk penyubur tanah!'
          },
          {
            key: 'C',
            icon: '🪨',
            text: 'C. Tumpukan jerami kering akan berubah menjadi batu keras jika tidak dibuang.',
            isCorrect: false,
            feedback: '⚠️ Keliru! Jerami adalah bagian tumbuhan yang bisa diurai oleh jamur menjadi pupuk humus.'
          }
        ]
      }
    };

    const currentCase = caseBank[missionId] || caseBank[1];

    // 4. Kartu Wadah Kasus (Header Kasus C2)
    const card = this.add.rectangle(width / 2, 230, width * 0.94, 210, 0x1e293b, 0.95);
    card.setStrokeStyle(2, 0x38bdf8);

    // Judul Kasus
    this.add.text(width / 2 - width * 0.44, 150, `📜 ${currentCase.title}`, {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '20px',
      color: '#38bdf8',
      fontStyle: 'bold'
    });

    // Pertanyaan Kasus
    this.add.text(width / 2 - width * 0.44, 185, currentCase.question, {
      fontFamily: 'Nunito, sans-serif',
      fontSize: '21px',
      color: '#ffffff',
      fontStyle: 'bold',
      wordWrap: { width: width * 0.78 },
      lineSpacing: 6
    });

    // Rantai Makanan Visual dengan Signaling Principle (Sorotan Rantai Terganggu)
    const chainBox = this.add.rectangle(width / 2 - width * 0.44 + 400, 290, 820, 36, 0x0f172a, 0.9);
    chainBox.setStrokeStyle(1, 0x475569);
    const chainStr = currentCase.chain.join(' ');
    const tChain = this.add.text(width / 2 - width * 0.44 + 10, 290, `🔗 ALUR SAWAH:  ${chainStr}`, {
      fontFamily: 'Fredoka, sans-serif',
      fontSize: '17px',
      color: '#fef08a'
    }).setOrigin(0, 0.5);

    // Efek Pulsing Lembut pada Banner Alur
    this.tweens.add({
      targets: chainBox,
      strokeColor: { from: 0x475569, to: 0xef4444 },
      duration: 800,
      yoyo: true,
      repeat: -1
    });

    // Tombol Suara Soal (🔊)
    const btnVoiceQ = this.add.rectangle(width / 2 + width * 0.42, 215, 64, 64, 0x10b981).setInteractive({ useHandCursor: true });
    btnVoiceQ.setStrokeStyle(2, 0xfef08a);
    this.add.text(width / 2 + width * 0.42, 215, '🔊', { fontSize: '28px' }).setOrigin(0.5);

    btnVoiceQ.on('pointerdown', () => {
      btnVoiceQ.setScale(0.9);
      if (window.soundEngine) {
        window.soundEngine.playBeep();
        window.soundEngine.playVO('vo_quiz_intro', currentCase.question);
      }
    });
    btnVoiceQ.on('pointerup', () => btnVoiceQ.setScale(1.0));

    // 5. Pilihan Jawaban Ramah Sentuh IFP dengan Ikon Multimedia (Mayer Multimedia Principle)
    const optY = 405;
    const optSpacing = 115;
    this.optionButtons = [];

    currentCase.options.forEach((opt, idx) => {
      const oy = optY + (idx * optSpacing);
      const btn = this.add.rectangle(width / 2, oy, width * 0.94, 98, 0x0f172a, 0.95)
        .setInteractive({ useHandCursor: true })
        .setStrokeStyle(3, 0x475569);

      // Badge Ikon Trofik di Kiri (Dual-Coding)
      const badgeX = width / 2 - width * 0.44 + 30;
      const iconCircle = this.add.circle(badgeX, oy, 30, 0x1e293b).setStrokeStyle(2, 0x38bdf8);
      this.add.text(badgeX, oy, opt.icon, { fontSize: '28px' }).setOrigin(0.5);

      // Teks Pilihan Jawaban
      this.add.text(width / 2 - width * 0.44 + 80, oy, opt.text, {
        fontFamily: 'Nunito, sans-serif',
        fontSize: '20px',
        color: '#f8fafc',
        wordWrap: { width: width * 0.81 },
        lineSpacing: 4
      }).setOrigin(0, 0.5);

      btn.on('pointerdown', () => {
        this.handleAnswer(opt, btn);
      });

      this.optionButtons.push(btn);
    });
  }

  handleAnswer(opt, btnElement) {
    const { width, height } = this.scale;

    // Nonaktifkan semua tombol agar tidak double klik
    this.optionButtons.forEach(b => b.disableInteractive());

    if (opt.isCorrect) {
      if (window.soundEngine) {
        window.soundEngine.playSuccess();
        window.soundEngine.playVO('vo_quiz_correct', opt.feedback);
      }
      btnElement.setFillStyle(0x059669);
      btnElement.setStrokeStyle(4, 0x34d399);

      const feedbackBox = this.add.rectangle(width / 2, height - 90, width * 0.94, 85, 0x064e3b, 0.98);
      feedbackBox.setStrokeStyle(3, 0x34d399);
      this.add.text(width / 2, height - 90, opt.feedback, {
        fontFamily: 'Fredoka, sans-serif',
        fontSize: '20px',
        color: '#fef08a',
        wordWrap: { width: width * 0.9 }
      }).setOrigin(0.5);

      this.registry.set('quizScore', 100);

      this.time.delayedCall(3000, () => {
        if (window.soundEngine) window.soundEngine.stopVoice();
        this.scene.start('VictoryScene');
      });
    } else {
      if (window.soundEngine) window.soundEngine.playWarning();
      btnElement.setFillStyle(0x991b1b);
      btnElement.setStrokeStyle(4, 0xf87171);

      this.cameras.main.shake(250, 0.01);

      const feedbackBox = this.add.rectangle(width / 2, height - 90, width * 0.94, 85, 0x450a0a, 0.98);
      feedbackBox.setStrokeStyle(3, 0xef4444);
      this.add.text(width / 2, height - 90, opt.feedback, {
        fontFamily: 'Fredoka, sans-serif',
        fontSize: '20px',
        color: '#fecaca',
        wordWrap: { width: width * 0.9 }
      }).setOrigin(0.5);

      this.registry.set('quizScore', 50);

      this.time.delayedCall(2600, () => {
        this.scene.start('VictoryScene');
      });
    }
  }
}

window.QuizScene = QuizScene;
